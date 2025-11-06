import { useState, useEffect, useRef } from 'react';
import { supabaseService } from '../../utils/supabase';
import { useSupabaseSyncStatus } from '../../hooks/useSupabaseSyncStatus';
import SyncStatusBadge from '../SyncStatusBadge';
import { useAlert } from '../../contexts/AlertContext';

const BlogManager = () => {
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showBlogForm, setShowBlogForm] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [blogFormData, setBlogFormData] = useState({
    title: '',
    author: '',
    body: '',
    image_url: '',
    link_url: '',
    link_text: '',
    published: false
  });

  const { showError, showConfirm, showSuccess } = useAlert();

  // Real-time sync status
  const { status, lastSync, startSaving, finishSaving, acknowledgeNewData, setDisplayedData } = useSupabaseSyncStatus(
    () => supabaseService.getBlogs(),
    3000 // 3 seconds refresh interval
  );

  useEffect(() => {
    loadBlogs();
  }, []);

  const loadBlogs = async () => {
    setIsLoading(true);
    try {
      const data = await supabaseService.getBlogs();
      setBlogs(data || []);
      setDisplayedData(data);
      acknowledgeNewData();
    } catch (error) {
      console.error('Error loading blogs:', error);
      await showError(`Failed to load blogs: ${error.message}`, 'Load Error');
      setBlogs([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRefreshData = async () => {
    await loadBlogs();
    acknowledgeNewData();
  };

  const openBlogForm = (blog = null) => {
    if (blog) {
      setEditingBlog(blog);
      setBlogFormData({
        title: blog.title,
        author: blog.author,
        body: blog.body,
        image_url: blog.image_url || '',
        link_url: blog.link_url || '',
        link_text: blog.link_text || '',
        published: blog.published
      });
      setImageFile(null);
      setImagePreview(blog.image_url || null);
    } else {
      setEditingBlog(null);
      setBlogFormData({
        title: '',
        author: '',
        body: '',
        image_url: '',
        link_url: '',
        link_text: '',
        published: false
      });
      setImageFile(null);
      setImagePreview(null);
    }
    setShowBlogForm(true);
  };

  const closeBlogForm = () => {
    setShowBlogForm(false);
    setEditingBlog(null);
    setImageFile(null);
    setImagePreview(null);
    setBlogFormData({
      title: '',
      author: '',
      body: '',
      image_url: '',
      link_url: '',
      link_text: '',
      published: false
    });
  };

  const handleImageSelect = async (file) => {
    if (!file) return;
    
    // Validate file type
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
    if (!validTypes.includes(file.type)) {
      await showError('Please upload a JPEG, PNG, WebP, or GIF image.', 'Invalid File Type');
      return;
    }
    
    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      await showError('Maximum file size is 5MB. Please choose a smaller image.', 'File Too Large');
      return;
    }
    
    setImageFile(file);
    
    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleImageDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    const file = e.dataTransfer.files[0];
    if (file) {
      handleImageSelect(file);
    }
  };

  const handleImageDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    setImagePreview(null);
    setBlogFormData({...blogFormData, image_url: ''});
  };

  const saveBlog = async () => {
    if (!blogFormData.title.trim() || !blogFormData.author.trim() || !blogFormData.body.trim()) {
      await showError('Please fill in all required fields (title, author, body)', 'Required Fields');
      return;
    }

    startSaving();

    try {
      const blogDataToSave = { ...blogFormData };
      
      // Upload image if a new file was selected
      if (imageFile) {
        setIsUploadingImage(true);
        try {
          // Generate a temporary ID for new blogs
          const blogId = editingBlog?.id || `temp-${Date.now()}`;
          const imageUrl = await supabaseService.uploadBlogImage(imageFile, blogId);
          blogDataToSave.image_url = imageUrl;
          console.log('✓ Image uploaded successfully:', imageUrl);
        } catch (error) {
          console.error('Error uploading image:', error);
          await showError(`Failed to upload image: ${error.message}`, 'Upload Error');
          throw error;
        } finally {
          setIsUploadingImage(false);
        }
      }

      if (editingBlog) {
        // Update existing blog
        const updatedBlog = await supabaseService.updateBlog(editingBlog.id, blogDataToSave);
        const updatedBlogs = blogs.map(b => b.id === editingBlog.id ? updatedBlog : b);
        setBlogs(updatedBlogs);
        setDisplayedData(updatedBlogs);
        await showSuccess('Blog updated successfully');
      } else {
        // Create new blog
        const newBlog = await supabaseService.createBlog(blogDataToSave);
        const updatedBlogs = [newBlog, ...blogs];
        setBlogs(updatedBlogs);
        setDisplayedData(updatedBlogs);
        await showSuccess('Blog created successfully');
      }
      
      // Reset image states
      setImageFile(null);
      setImagePreview(null);
      
      closeBlogForm();
      finishSaving();
    } catch (error) {
      console.error('Error saving blog:', error);
      finishSaving();
      await showError(`Failed to save blog: ${error.message}`, 'Save Error');
    }
  };

  const deleteBlog = async (blogId) => {
    const confirmed = await showConfirm(
      'Are you sure you want to delete this blog post? This action cannot be undone.',
      'Delete Blog'
    );

    if (!confirmed) return;

    startSaving();

    try {
      await supabaseService.deleteBlog(blogId);
      const updatedBlogs = blogs.filter(b => b.id !== blogId);
      setBlogs(updatedBlogs);
      setDisplayedData(updatedBlogs);
      finishSaving();
      await showSuccess('Blog deleted successfully');
    } catch (error) {
      console.error('Error deleting blog:', error);
      finishSaving();
      await showError(`Failed to delete blog: ${error.message}`, 'Delete Error');
    }
  };

  const togglePublished = async (blog) => {
    startSaving();

    try {
      const updatedBlog = { ...blog, published: !blog.published };
      await supabaseService.updateBlog(blog.id, updatedBlog);
      const updatedBlogs = blogs.map(b => b.id === blog.id ? updatedBlog : b);
      setBlogs(updatedBlogs);
      setDisplayedData(updatedBlogs);
      finishSaving();
      await showSuccess(`Blog ${updatedBlog.published ? 'published' : 'unpublished'} successfully`);
    } catch (error) {
      console.error('Error toggling publish status:', error);
      finishSaving();
      await showError(`Failed to update publish status: ${error.message}`, 'Update Error');
    }
  };

  if (isLoading) {
    return <div className="loading">Loading blogs...</div>;
  }

  return (
    <div className="blog-manager">
      <style>{`
        .blog-manager {
          max-width: 1400px;
          margin: 0 auto;
        }

        .blog-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
        }

        .blog-title {
          font-family: "Bebas Neue", sans-serif;
          font-size: 2rem;
          color: var(--text);
          margin: 0;
        }

        .header-actions {
          display: flex;
          gap: 1rem;
          align-items: center;
        }

        .btn-primary {
          background: var(--accent);
          color: white;
          border: none;
          padding: 0.75rem 1.5rem;
          border-radius: 6px;
          cursor: pointer;
          font-weight: 500;
          transition: all 0.3s ease;
        }

        .btn-primary:hover {
          background: #c71821;
          transform: translateY(-1px);
        }

        .blog-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
          gap: 1.5rem;
        }

        .blog-card {
          background: var(--surface);
          border-radius: var(--radius);
          padding: 1.5rem;
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
          transition: transform 0.3s ease;
          display: flex;
          flex-direction: column;
        }

        .blog-card:hover {
          transform: translateY(-2px);
        }

        .blog-card-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 1rem;
        }

        .blog-status {
          padding: 0.25rem 0.75rem;
          border-radius: 4px;
          font-size: 0.85rem;
          font-weight: 600;
        }

        .blog-status.published {
          background: rgba(40, 167, 69, 0.2);
          color: #28a745;
        }

        .blog-status.draft {
          background: rgba(108, 117, 125, 0.2);
          color: #6c757d;
        }

        .blog-card-image {
          width: 100%;
          height: 150px;
          object-fit: cover;
          border-radius: 6px;
          margin-bottom: 1rem;
          background: rgba(255, 255, 255, 0.05);
        }

        .blog-card-title {
          font-size: 1.3rem;
          font-weight: 600;
          color: var(--text);
          margin-bottom: 0.5rem;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .blog-card-author {
          font-size: 0.9rem;
          color: var(--subtxt);
          margin-bottom: 0.75rem;
        }

        .blog-card-body {
          color: var(--text);
          margin-bottom: 1rem;
          flex: 1;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
          line-height: 1.6;
        }

        .blog-card-meta {
          font-size: 0.85rem;
          color: var(--subtxt);
          padding-top: 0.75rem;
          border-top: 1px solid #333;
          margin-bottom: 1rem;
        }

        .blog-card-actions {
          display: flex;
          gap: 0.5rem;
          flex-wrap: wrap;
        }

        .btn-edit {
          background: #007bff;
          color: white;
          border: none;
          padding: 0.5rem 1rem;
          border-radius: 4px;
          cursor: pointer;
          font-size: 0.9rem;
          transition: background 0.3s ease;
        }

        .btn-edit:hover {
          background: #0056b3;
        }

        .btn-toggle {
          background: #28a745;
          color: white;
          border: none;
          padding: 0.5rem 1rem;
          border-radius: 4px;
          cursor: pointer;
          font-size: 0.9rem;
          transition: background 0.3s ease;
        }

        .btn-toggle:hover {
          background: #1e7e34;
        }

        .btn-toggle.unpublish {
          background: #6c757d;
        }

        .btn-toggle.unpublish:hover {
          background: #545b62;
        }

        .btn-delete {
          background: #dc3545;
          color: white;
          border: none;
          padding: 0.5rem 1rem;
          border-radius: 4px;
          cursor: pointer;
          font-size: 0.9rem;
          transition: background 0.3s ease;
        }

        .btn-delete:hover {
          background: #c82333;
        }

        /* Modal Styles */
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.7);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 1rem;
        }

        .modal-content {
          background: var(--surface);
          border-radius: var(--radius);
          max-width: 800px;
          width: 100%;
          max-height: 90vh;
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }

        .modal-header {
          padding: 1.5rem;
          border-bottom: 1px solid #333;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .modal-header h3 {
          margin: 0;
          color: var(--text);
          font-size: 1.5rem;
        }

        .modal-close {
          background: none;
          border: none;
          font-size: 2rem;
          color: var(--subtxt);
          cursor: pointer;
          line-height: 1;
          padding: 0;
          width: 2rem;
          height: 2rem;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: color 0.3s ease;
        }

        .modal-close:hover {
          color: var(--text);
        }

        .modal-body {
          padding: 1.5rem;
          overflow-y: auto;
        }

        .form-group {
          margin-bottom: 1.5rem;
        }

        .form-group label {
          display: block;
          color: var(--text);
          font-weight: 500;
          margin-bottom: 0.5rem;
        }

        .form-group input,
        .form-group textarea {
          width: 100%;
          padding: 0.75rem;
          border: 2px solid #333;
          border-radius: 6px;
          background: var(--bg);
          color: var(--text);
          font-size: 1rem;
          font-family: inherit;
        }

        .form-group input:focus,
        .form-group textarea:focus {
          outline: none;
          border-color: var(--accent);
        }

        .form-group textarea {
          resize: vertical;
          min-height: 200px;
          font-family: inherit;
        }

        .form-check {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .form-check input[type="checkbox"] {
          width: auto;
          cursor: pointer;
        }

        .image-upload-area {
          width: 100%;
          min-height: 200px;
          border: 2px dashed #333;
          border-radius: 8px;
          background: #1a1a1a;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
        }

        .image-upload-area:hover {
          border-color: var(--accent);
          background: #222;
        }

        .image-upload-area.has-image {
          min-height: 250px;
          border-style: solid;
        }

        .upload-placeholder {
          text-align: center;
          padding: 2rem;
          color: var(--subtxt);
        }

        .upload-placeholder svg {
          width: 48px;
          height: 48px;
          margin: 0 auto 1rem;
          opacity: 0.6;
        }

        .upload-placeholder p {
          margin: 0.5rem 0;
        }

        .upload-hint {
          font-size: 0.75rem;
          opacity: 0.7;
        }

        .image-preview-container {
          width: 100%;
          height: 100%;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1rem;
        }

        .image-preview {
          max-width: 100%;
          max-height: 300px;
          border-radius: 6px;
          object-fit: contain;
        }

        .remove-image-btn {
          position: absolute;
          top: 1rem;
          right: 1rem;
          background: rgba(220, 38, 38, 0.9);
          color: white;
          border: none;
          border-radius: 50%;
          width: 32px;
          height: 32px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
          z-index: 10;
        }

        .remove-image-btn:hover {
          background: #dc2626;
          transform: scale(1.1);
        }

        .remove-image-btn svg {
          width: 16px;
          height: 16px;
        }

        .upload-status {
          color: var(--accent);
          font-size: 0.85rem;
          margin-top: 0.5rem;
          text-align: center;
        }

        .form-actions {
          display: flex;
          gap: 1rem;
          justify-content: flex-end;
          padding: 1.5rem;
          border-top: 1px solid #333;
        }

        .btn-secondary {
          background: #6c757d;
          color: white;
          border: none;
          padding: 0.75rem 1.5rem;
          border-radius: 6px;
          cursor: pointer;
          font-weight: 500;
          transition: background 0.3s ease;
        }

        .btn-secondary:hover {
          background: #545b62;
        }

        .loading {
          text-align: center;
          padding: 3rem;
          color: var(--subtxt);
          font-size: 1.2rem;
        }

        .empty-state {
          text-align: center;
          padding: 3rem;
          color: var(--subtxt);
        }

        .empty-state h3 {
          color: var(--text);
          margin-bottom: 1rem;
        }

        @media (max-width: 768px) {
          .blog-grid {
            grid-template-columns: 1fr;
          }

          .modal-content {
            max-width: 100%;
            max-height: 100vh;
            border-radius: 0;
          }
        }
      `}</style>

      <div className="blog-header">
        <h2 className="blog-title">Blog Manager</h2>
        <div className="header-actions">
          <SyncStatusBadge 
            status={status} 
            lastSync={lastSync}
            onRefresh={handleRefreshData}
          />
          <button className="btn-primary" onClick={() => openBlogForm()}>
            + New Blog Post
          </button>
        </div>
      </div>

      {blogs.length === 0 ? (
        <div className="empty-state">
          <h3>No blog posts yet</h3>
          <p>Create your first blog post to get started!</p>
        </div>
      ) : (
        <div className="blog-grid">
          {blogs.map(blog => (
            <div key={blog.id} className="blog-card">
              <div className="blog-card-header">
                <span className={`blog-status ${blog.published ? 'published' : 'draft'}`}>
                  {blog.published ? '✓ Published' : '○ Draft'}
                </span>
              </div>
              
              {blog.image_url && (
                <img src={blog.image_url} alt={blog.title} className="blog-card-image" />
              )}
              
              <h3 className="blog-card-title">{blog.title}</h3>
              <p className="blog-card-author">By {blog.author}</p>
              <div className="blog-card-body">{blog.body}</div>
              
              <div className="blog-card-meta">
                Last edited: {new Date(blog.updated_at).toLocaleString()}
              </div>
              
              <div className="blog-card-actions">
                <button className="btn-edit" onClick={() => openBlogForm(blog)}>
                  Edit
                </button>
                <button 
                  className={`btn-toggle ${blog.published ? 'unpublish' : ''}`}
                  onClick={() => togglePublished(blog)}
                >
                  {blog.published ? 'Unpublish' : 'Publish'}
                </button>
                <button className="btn-delete" onClick={() => deleteBlog(blog.id)}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {showBlogForm && (
        <div className="modal-overlay" onClick={closeBlogForm}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{editingBlog ? 'Edit Blog Post' : 'New Blog Post'}</h3>
              <button className="modal-close" onClick={closeBlogForm}>×</button>
            </div>
            
            <div className="modal-body">
              <div className="form-group">
                <label>Title *</label>
                <input
                  type="text"
                  value={blogFormData.title}
                  onChange={e => setBlogFormData({ ...blogFormData, title: e.target.value })}
                  placeholder="Enter blog title"
                />
              </div>

              <div className="form-group">
                <label>Author *</label>
                <input
                  type="text"
                  value={blogFormData.author}
                  onChange={e => setBlogFormData({ ...blogFormData, author: e.target.value })}
                  placeholder="Enter author name"
                />
              </div>

              <div className="form-group">
                <label>Header Image (optional)</label>
                <div 
                  className={`image-upload-area ${imagePreview ? 'has-image' : ''}`}
                  onDrop={handleImageDrop}
                  onDragOver={handleImageDragOver}
                  onClick={() => document.getElementById('blog-image-input').click()}
                >
                  {imagePreview ? (
                    <div className="image-preview-container">
                      <img src={imagePreview} alt="Preview" className="image-preview" />
                      <button 
                        className="remove-image-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemoveImage();
                        }}
                        title="Remove image"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="18" y1="6" x2="6" y2="18"></line>
                          <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                      </button>
                    </div>
                  ) : (
                    <div className="upload-placeholder">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                        <polyline points="17 8 12 3 7 8"></polyline>
                        <line x1="12" y1="3" x2="12" y2="15"></line>
                      </svg>
                      <p>Drop image here or click to upload</p>
                      <p className="upload-hint">JPG, PNG, WebP, or GIF • Max 5MB</p>
                    </div>
                  )}
                  <input
                    id="blog-image-input"
                    type="file"
                    accept="image/jpeg,image/jpg,image/png,image/webp,image/gif"
                    onChange={(e) => handleImageSelect(e.target.files[0])}
                    style={{ display: 'none' }}
                  />
                </div>
                {isUploadingImage && (
                  <p className="upload-status">Uploading image...</p>
                )}
              </div>

              <div className="form-group">
                <label>Link URL (optional)</label>
                <input
                  type="url"
                  value={blogFormData.link_url}
                  onChange={e => setBlogFormData({ ...blogFormData, link_url: e.target.value })}
                  placeholder="https://example.com/article"
                />
                <small style={{ color: 'var(--subtxt)', fontSize: '0.85rem', marginTop: '0.25rem', display: 'block' }}>
                  Optional link button displayed at the top of the article
                </small>
              </div>

              <div className="form-group">
                <label>Link Button Text (optional)</label>
                <input
                  type="text"
                  value={blogFormData.link_text}
                  onChange={e => setBlogFormData({ ...blogFormData, link_text: e.target.value })}
                  placeholder="Read Full Article"
                />
                <small style={{ color: 'var(--subtxt)', fontSize: '0.85rem', marginTop: '0.25rem', display: 'block' }}>
                  Text for the link button (defaults to "Read More" if not provided)
                </small>
              </div>

              <div className="form-group">
                <label>Body *</label>
                <textarea
                  value={blogFormData.body}
                  onChange={e => setBlogFormData({ ...blogFormData, body: e.target.value })}
                  placeholder="Write your blog content here..."
                />
              </div>

              <div className="form-group">
                <div className="form-check">
                  <input
                    type="checkbox"
                    id="published"
                    checked={blogFormData.published}
                    onChange={e => setBlogFormData({ ...blogFormData, published: e.target.checked })}
                  />
                  <label htmlFor="published">Publish immediately</label>
                </div>
              </div>
            </div>

            <div className="form-actions">
              <button className="btn-secondary" onClick={closeBlogForm}>
                Cancel
              </button>
              <button className="btn-primary" onClick={saveBlog}>
                {editingBlog ? 'Update' : 'Create'} Blog Post
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogManager;
