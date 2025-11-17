import { useState, useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import { supabaseService } from '../../utils/supabase';
import { useSupabaseSyncStatus } from '../../hooks/useSupabaseSyncStatus';
import SyncStatusBadge from '../SyncStatusBadge';
import { useAlert } from '../../contexts/AlertContext';
import './BlogManager.css';

const BlogManager = forwardRef((props, ref) => {
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

  const bodyEditorRef = useRef(null);
  const fileInputRef = useRef(null);

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

  // Expose methods to parent component via ref
  useImperativeHandle(ref, () => ({
    handleAddBlog: () => {
      openBlogForm();
    }
  }));

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

  // Rich text editor commands
  const execCommand = (command, value = null) => {
    const editor = bodyEditorRef.current;
    if (!editor) return;

    editor.focus();
    
    // Use modern approach for formatting commands
    if (document.execCommand) {
      document.execCommand(command, false, value);
    } else {
      // Fallback for browsers that don't support execCommand
      console.warn('execCommand not supported');
    }
  };

  const handleBodyChange = (e) => {
    setBlogFormData({
      ...blogFormData,
      body: e.target.innerHTML
    });
  };

  const saveBlog = async () => {
    if (!blogFormData.title.trim() || !blogFormData.author.trim() || !blogFormData.body.trim()) {
      await showError('Please fill in all required fields (title, author, body)', 'Required Fields');
      return;
    }

    startSaving();

    try {
      let blogDataToSave = { ...blogFormData };

      if (editingBlog) {
        // Upload header image if selected
        if (imageFile) {
          setIsUploadingImage(true);
          try {
            const imageUrl = await supabaseService.uploadBlogImage(imageFile, editingBlog.id);
            blogDataToSave.image_url = imageUrl;
            console.log('✓ Header image uploaded successfully:', imageUrl);
          } catch (error) {
            console.error('Error uploading header image:', error);
            await showError(`Failed to upload image: ${error.message}`, 'Upload Error');
            throw error;
          } finally {
            setIsUploadingImage(false);
          }
        }

        const updatedBlog = await supabaseService.updateBlog(editingBlog.id, blogDataToSave);
        const updatedBlogs = blogs.map(b => b.id === editingBlog.id ? updatedBlog : b);
        setBlogs(updatedBlogs);
        setDisplayedData(updatedBlogs);
        await showSuccess('Blog updated successfully');
      } else {
        // Create the blog first
        const newBlog = await supabaseService.createBlog(blogDataToSave);

        const updates = {};

        // Upload header image if selected
        if (imageFile) {
          setIsUploadingImage(true);
          try {
            updates.image_url = await supabaseService.uploadBlogImage(imageFile, newBlog.id);
            console.log('✓ Header image uploaded for new blog:', updates.image_url);
          } catch (error) {
            console.error('Error uploading header image for new blog:', error);
            await showError(`Failed to upload image: ${error.message}`, 'Upload Error');
            throw error;
          } finally {
            setIsUploadingImage(false);
          }
        }

        let finalBlog = newBlog;
        if (Object.keys(updates).length > 0) {
          finalBlog = await supabaseService.updateBlog(newBlog.id, updates);
        }

        const updatedBlogs = [finalBlog, ...blogs];
        setBlogs(updatedBlogs);
        setDisplayedData(updatedBlogs);
        await showSuccess('Blog created successfully');
      }

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
      // Before deleting the blog record, remove the header image from storage
      try {
        const blogToDelete = blogs.find(b => b.id === blogId);
        if (blogToDelete && blogToDelete.image_url && blogToDelete.image_url.includes('/blog-images/')) {
          const parts = blogToDelete.image_url.split('/blog-images/');
          if (parts.length >= 2) {
            const filePath = decodeURIComponent(parts[1].split('?')[0]);
            await supabaseService.client.storage.from('blog-images').remove([filePath]);
            console.log('Deleted blog header image from storage:', filePath);
          }
        }
      } catch (err) {
        console.error('Error while attempting to remove blog image before delete:', err);
      }

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
              <div 
                className="blog-card-body"
                dangerouslySetInnerHTML={{ __html: blog.body }}
              />
              
              <div className="blog-card-meta">
                Last edited: {new Date(blog.updated_at).toLocaleString()}
              </div>
              
              <div className="blog-card-actions">
                <button className="btn-edit" onClick={() => openBlogForm(blog)} title="Edit">
                  <span style={{display: 'inline-flex', alignItems: 'center', gap: '0.4em'}}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{verticalAlign: 'middle'}}>
                      <path d="M12 20h9"/>
                      <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z"/>
                    </svg>
                    Edit
                  </span>
                </button>
                <button 
                  className={`btn-toggle ${blog.published ? 'unpublish' : ''}`}
                  onClick={() => togglePublished(blog)}
                  title={blog.published ? 'Unpublish' : 'Publish'}
                >
                  <span style={{display: 'inline-flex', alignItems: 'center', gap: '0.4em'}}>
                    {blog.published ? (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{verticalAlign: 'middle'}}>
                        <path d="M4 4v16h16V4H4zm8 8v4m0-4V8m0 4h4m-4 0H8"/>
                      </svg>
                    ) : (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{verticalAlign: 'middle'}}>
                        <path d="M5 12h14M12 5v14"/>
                      </svg>
                    )}
                    {blog.published ? 'Unpublish' : 'Publish'}
                  </span>
                </button>
                <button className="btn-delete" onClick={() => deleteBlog(blog.id)} title="Delete">
                  <span style={{display: 'inline-flex', alignItems: 'center', gap: '0.4em'}}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{verticalAlign: 'middle'}}>
                      <polyline points="3 6 5 6 21 6"/>
                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2"/>
                      <line x1="10" y1="11" x2="10" y2="17"/>
                      <line x1="14" y1="11" x2="14" y2="17"/>
                    </svg>
                    Delete
                  </span>
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
                <div className="rich-text-editor">
                  <div className="editor-toolbar">
                    <div className="toolbar-group">
                      <select 
                        className="font-select" 
                        onChange={(e) => execCommand('fontName', e.target.value)}
                        defaultValue="Arial"
                      >
                        <option value="Arial">Arial</option>
                        <option value="Georgia">Georgia</option>
                        <option value="Times New Roman">Times New Roman</option>
                        <option value="Verdana">Verdana</option>
                        <option value="Courier New">Courier New</option>
                      </select>
                      <select 
                        className="size-select" 
                        onChange={(e) => execCommand('fontSize', e.target.value)}
                        defaultValue="3"
                      >
                        <option value="1">Small</option>
                        <option value="2">Normal</option>
                        <option value="3">Large</option>
                        <option value="4">X-Large</option>
                        <option value="5">XX-Large</option>
                      </select>
                    </div>
                    
                    <div className="toolbar-group">
                      <button 
                        className="toolbar-btn" 
                        onClick={() => execCommand('bold')}
                        title="Bold"
                      >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M6 4h8a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"></path>
                          <path d="M6 12h9a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"></path>
                        </svg>
                      </button>
                      <button 
                        className="toolbar-btn" 
                        onClick={() => execCommand('italic')}
                        title="Italic"
                      >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <line x1="19" y1="4" x2="10" y2="4"></line>
                          <line x1="14" y1="20" x2="5" y2="20"></line>
                          <line x1="15" y1="4" x2="9" y2="20"></line>
                        </svg>
                      </button>
                      <button 
                        className="toolbar-btn" 
                        onClick={() => execCommand('underline')}
                        title="Underline"
                      >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M6 3v7a6 6 0 0 0 6 6 6 6 0 0 0 6-6V3"></path>
                          <line x1="4" y1="21" x2="20" y2="21"></line>
                        </svg>
                      </button>
                    </div>

                    <div className="toolbar-group">
                      <button 
                        className="toolbar-btn" 
                        onClick={() => execCommand('justifyLeft')}
                        title="Align Left"
                      >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <line x1="21" y1="10" x2="3" y2="10"></line>
                          <line x1="21" y1="6" x2="3" y2="6"></line>
                          <line x1="21" y1="14" x2="3" y2="14"></line>
                          <line x1="21" y1="18" x2="3" y2="18"></line>
                        </svg>
                      </button>
                      <button 
                        className="toolbar-btn" 
                        onClick={() => execCommand('justifyCenter')}
                        title="Align Center"
                      >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <line x1="17" y1="10" x2="7" y2="10"></line>
                          <line x1="21" y1="6" x2="3" y2="6"></line>
                          <line x1="21" y1="14" x2="3" y2="14"></line>
                          <line x1="17" y1="18" x2="7" y2="18"></line>
                        </svg>
                      </button>
                      <button 
                        className="toolbar-btn" 
                        onClick={() => execCommand('justifyRight')}
                        title="Align Right"
                      >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <line x1="21" y1="10" x2="3" y2="10"></line>
                          <line x1="21" y1="6" x2="3" y2="6"></line>
                          <line x1="21" y1="14" x2="3" y2="14"></line>
                          <line x1="21" y1="18" x2="3" y2="18"></line>
                        </svg>
                      </button>
                    </div>

                    <div className="toolbar-group">
                      <button 
                        className="toolbar-btn" 
                        onClick={() => execCommand('insertUnorderedList')}
                        title="Bullet List"
                      >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <line x1="8" y1="6" x2="21" y2="6"></line>
                          <line x1="8" y1="12" x2="21" y2="12"></line>
                          <line x1="8" y1="18" x2="21" y2="18"></line>
                          <line x1="3" y1="6" x2="3.01" y2="6"></line>
                          <line x1="3" y1="12" x2="3.01" y2="12"></line>
                          <line x1="3" y1="18" x2="3.01" y2="18"></line>
                        </svg>
                      </button>
                      <button 
                        className="toolbar-btn" 
                        onClick={() => execCommand('insertOrderedList')}
                        title="Numbered List"
                      >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <line x1="10" y1="6" x2="21" y2="6"></line>
                          <line x1="10" y1="12" x2="21" y2="12"></line>
                          <line x1="10" y1="18" x2="21" y2="18"></line>
                          <path d="M4 6h1v4H4V6zm2.5 12H6V6.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5V18a1 1 0 0 1-1 1h-.5a1 1 0 0 1-1-1v-4zm0-6h-1V8h1v4z"></path>
                        </svg>
                      </button>
                    </div>

                    <div className="toolbar-group">
                      <button 
                        className="toolbar-btn" 
                        onClick={() => execCommand('createLink', prompt('Enter URL:'))}
                        title="Insert Link"
                      >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
                          <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
                        </svg>
                      </button>
                    </div>
                  </div>

                  <div
                    ref={bodyEditorRef}
                    className="editor-content"
                    contentEditable
                    onInput={handleBodyChange}
                    placeholder="Write your blog content here..."
                  />
                </div>
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
});

BlogManager.displayName = 'BlogManager';

export default BlogManager;