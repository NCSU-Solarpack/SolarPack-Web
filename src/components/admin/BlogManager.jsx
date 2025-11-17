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
    // sections: array of { id, type: 'text'|'image', content, file, preview }
    sections: [ { id: 's-1', type: 'text', content: '' } ],
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
      // Parse existing body HTML into sections (text / image blocks)
      const parseBodyToSections = (html) => {
        try {
          const parser = new DOMParser();
          const doc = parser.parseFromString(`<div>${html || ''}</div>`, 'text/html');
          const container = doc.body.firstChild;
          const out = [];
          if (!container) return [{ id: `s-${Date.now()}`, type: 'text', content: html || '' }];
          // Group adjacent non-image nodes into a single text section so
          // headings, lists, and other blocks remain together when editing.
          let acc = '';
          container.childNodes.forEach((node) => {
            if (node.nodeType === Node.ELEMENT_NODE) {
              const el = node;
              const imgs = el.getElementsByTagName && el.getElementsByTagName('img');
              if (imgs && imgs.length === 1 && el.childNodes.length === 1) {
                // Flush accumulated text before adding an image section
                if (acc && acc.trim()) {
                  out.push({ id: `s-${Date.now()}-${out.length}`, type: 'text', content: acc });
                  acc = '';
                }
                const img = imgs[0];
                out.push({ id: `s-${Date.now()}-${out.length}`, type: 'image', content: img.src || '' });
                return;
              }

              // Append this element's full markup to the text accumulator
              acc += el.outerHTML || el.innerHTML || '';
            } else if (node.nodeType === Node.TEXT_NODE) {
              const txt = node.textContent || '';
              if (txt.trim()) acc += txt;
            }
          });

          if (acc && acc.trim()) {
            out.push({ id: `s-${Date.now()}-${out.length}`, type: 'text', content: acc });
          }
          if (out.length === 0) return [{ id: `s-${Date.now()}`, type: 'text', content: html || '' }];
          return out;
        } catch (err) {
          return [{ id: `s-${Date.now()}`, type: 'text', content: html || '' }];
        }
      };

      setBlogFormData({
        title: blog.title,
        author: blog.author,
        sections: parseBodyToSections(blog.body),
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
        sections: [ { id: 's-1', type: 'text', content: '' } ],
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
      sections: [ { id: 's-1', type: 'text', content: '' } ],
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
    // Try to run formatting command on current selection.
    try {
      if (document.execCommand) {
        document.execCommand(command, false, value);
      }
    } catch (err) {
      console.warn('execCommand not available', err);
    }
  };

  // Run a command targeted at a specific editable section
  const execCommandOnSection = (sectionId, command, value = null) => {
    try {
      const el = sectionRefs.current && sectionRefs.current[sectionId];
      if (el && typeof el.focus === 'function') {
        el.focus();
      }
      if (document.execCommand) {
        document.execCommand(command, false, value);
      }
    } catch (err) {
      console.warn('execCommandOnSection failed', err);
    }
  };

  // Section helpers
  const updateSectionContent = (sectionId, htmlContent) => {
    setBlogFormData(prev => ({
      ...prev,
      sections: prev.sections.map(s => s.id === sectionId ? { ...s, content: htmlContent } : s)
    }));
  };

  // Refs for editable section elements to avoid stomping caret by re-rendering
  const sectionRefs = useRef({});

  const addSection = (type = 'text') => {
    const id = `sec-${Date.now()}`;
    const newSection = type === 'text'
      ? { id, type: 'text', content: '' }
      : { id, type: 'image', file: null, preview: null };
    setBlogFormData(prev => ({ ...prev, sections: [...prev.sections, newSection] }));
  };

  const removeSection = async (sectionId) => {
    // If the section contains an uploaded inline image URL, attempt to delete it from storage
    const section = blogFormData.sections.find(s => s.id === sectionId);
    if (!section) return;

    if (section.type === 'image') {
      const maybeUrl = section.content || section.preview || '';
      try {
        if (typeof maybeUrl === 'string' && maybeUrl.includes('/blog-images/') && maybeUrl.includes('blog-inline/')) {
          await supabaseService.deleteBlogInlineImage(maybeUrl);
        }
      } catch (err) {
        console.error('Failed to delete inline image from storage:', err);
        // Non-fatal: continue to remove section locally, but inform user
        await showError(`Failed to remove image from storage: ${err.message}`, 'Delete Error');
      }
    }

    setBlogFormData(prev => ({ ...prev, sections: prev.sections.filter(s => s.id !== sectionId) }));
  };

  const moveSection = (sectionId, direction) => {
    setBlogFormData(prev => {
      const arr = [...prev.sections];
      const idx = arr.findIndex(s => s.id === sectionId);
      if (idx === -1) return prev;
      const newIdx = direction === 'up' ? idx - 1 : idx + 1;
      if (newIdx < 0 || newIdx >= arr.length) return prev;
      const tmp = arr[newIdx];
      arr[newIdx] = arr[idx];
      arr[idx] = tmp;
      return { ...prev, sections: arr };
    });
  };

  const handleSectionImageSelect = (sectionId, file) => {
    if (!file) return;
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
    if (!validTypes.includes(file.type)) {
      showError('Please upload a JPEG, PNG, WebP, or GIF image.', 'Invalid File Type');
      return;
    }
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      showError('Maximum file size is 5MB. Please choose a smaller image.', 'File Too Large');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setBlogFormData(prev => ({
        ...prev,
        sections: prev.sections.map(s => s.id === sectionId ? { ...s, file, preview: reader.result } : s)
      }));
    };
    reader.readAsDataURL(file);
  };

  const saveBlog = async () => {
    // Sync contentEditable DOM into a local sections copy so we don't lose typed characters
    const localSections = Array.isArray(blogFormData.sections) ? blogFormData.sections.map(s => {
      if (s.type === 'text') {
        const el = sectionRefs.current[s.id];
        const content = el ? el.innerHTML : (s.content || '');
        return { ...s, content };
      }
      return s;
    }) : [];

    // Validate required fields (title, author, body sections)
    const hasContent = Array.isArray(localSections) && localSections.some(s => {
      if (s.type === 'text') return s.content && s.content.trim() !== '';
      if (s.type === 'image') return !!s.file || !!s.preview || !!s.content;
      return false;
    });

    if (!blogFormData.title.trim() || !blogFormData.author.trim() || !hasContent) {
      await showError('Please fill in all required fields (title, author, body sections)', 'Required Fields');
      return;
    }

    startSaving();

    try {
      // Use localSections (synced from DOM) as the source of truth for this save operation
      let blogDataToSave = { ...blogFormData, sections: localSections };

      // Assemble body HTML from sections (we will replace image sections with uploaded URLs below)
      const assembleBodyHtml = (sections, imageUrlMap = {}) => {
        return sections.map(s => {
          if (s.type === 'text') return s.content || '';
          if (s.type === 'image') {
            const url = imageUrlMap[s.id] || s.content || s.preview || '';
            if (!url) return '';
            return `<p><img src="${url}"/></p>`;
          }
          return '';
        }).join('');
      };

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

        // Upload any inline images present in sections
        const imageUrlMap = {};
        for (const s of blogDataToSave.sections) {
          if (s.type === 'image' && s.file) {
            try {
              const url = await supabaseService.uploadBlogInlineImage(s.file, editingBlog.id);
              imageUrlMap[s.id] = url;
            } catch (err) {
              console.error('Error uploading inline image:', err);
              await showError(`Failed to upload inline image: ${err.message}`, 'Upload Error');
              throw err;
            }
          }
        }

        // Final body HTML
        blogDataToSave.body = assembleBodyHtml(blogDataToSave.sections, imageUrlMap);

        const updatedBlog = await supabaseService.updateBlog(editingBlog.id, blogDataToSave);
        const updatedBlogs = blogs.map(b => b.id === editingBlog.id ? updatedBlog : b);
        setBlogs(updatedBlogs);
        setDisplayedData(updatedBlogs);
        await showSuccess('Blog updated successfully');
      } else {
        // Create the blog first with empty body to get an id
        const newBlog = await supabaseService.createBlog({
          title: blogDataToSave.title,
          author: blogDataToSave.author,
          body: '',
          image_url: blogDataToSave.image_url || null,
          link_url: blogDataToSave.link_url || null,
          link_text: blogDataToSave.link_text || null,
          published: blogDataToSave.published || false
        });

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

        // Upload inline images and assemble body
        const imageUrlMap = {};
        for (const s of blogFormData.sections) {
          if (s.type === 'image' && s.file) {
            try {
              const url = await supabaseService.uploadBlogInlineImage(s.file, newBlog.id);
              imageUrlMap[s.id] = url;
            } catch (err) {
              console.error('Error uploading inline image for new blog:', err);
              await showError(`Failed to upload inline image: ${err.message}`, 'Upload Error');
              throw err;
            }
          }
        }

        const bodyHtml = assembleBodyHtml(blogFormData.sections, imageUrlMap);

        const finalUpdates = { ...updates, body: bodyHtml };

        let finalBlog = newBlog;
        if (Object.keys(finalUpdates).length > 0) {
          finalBlog = await supabaseService.updateBlog(newBlog.id, finalUpdates);
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
        // Also attempt to delete any inline images referenced in the body (blog-inline/)
        try {
          if (blogToDelete && blogToDelete.body) {
            const parser = new DOMParser();
            const doc = parser.parseFromString(`<div>${blogToDelete.body}</div>`, 'text/html');
            const imgs = doc.getElementsByTagName('img');
            for (let i = 0; i < imgs.length; i++) {
              const src = imgs[i].getAttribute('src') || '';
              if (src.includes('/blog-images/') && src.includes('blog-inline/')) {
                try {
                  await supabaseService.deleteBlogInlineImage(src);
                  console.log('Deleted inline image from storage:', src);
                } catch (err) {
                  console.warn('Failed to delete inline image:', src, err);
                }
              }
            }
          }
        } catch (err) {
          console.warn('Error while attempting to parse/delete inline images:', err);
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
                  <div className="sections-list">
                    {Array.isArray(blogFormData.sections) && blogFormData.sections.map((s, idx) => (
                      <div key={s.id} className="section-item">
                          <div className="section-controls">
                          <strong>Section {idx + 1}</strong>
                          <div style={{display: 'flex', gap: '0.5rem', alignItems: 'center'}}>
                            <button type="button" className="btn-small" onClick={() => moveSection(s.id, 'up')} title="Move up" aria-label={`Move section ${idx+1} up`}>
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="18 15 12 9 6 15"></polyline>
                              </svg>
                            </button>
                            <button type="button" className="btn-small" onClick={() => moveSection(s.id, 'down')} title="Move down" aria-label={`Move section ${idx+1} down`}>
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="6 9 12 15 18 9"></polyline>
                              </svg>
                            </button>
                            <button type="button" className="btn-small btn-delete" onClick={() => removeSection(s.id)} title="Remove section" aria-label={`Remove section ${idx+1}`}>
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="3 6 5 6 21 6"></polyline>
                                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                                <line x1="10" y1="11" x2="10" y2="17"></line>
                                <line x1="14" y1="11" x2="14" y2="17"></line>
                              </svg>
                            </button>
                          </div>
                        </div>

                        {s.type === 'text' ? (
                          <div className="section-editor">
                            <div className="editor-toolbar" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem'}}>
                              <div className="toolbar-group">
                                <select 
                                  className="font-select" 
                                  onChange={(e) => execCommandOnSection(s.id, 'fontName', e.target.value)}
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
                                  onChange={(e) => execCommandOnSection(s.id, 'fontSize', e.target.value)}
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
                                  onClick={() => execCommandOnSection(s.id, 'bold')}
                                  title="Bold"
                                >
                                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M6 4h8a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"></path>
                                    <path d="M6 12h9a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"></path>
                                  </svg>
                                </button>
                                <button 
                                  className="toolbar-btn" 
                                  onClick={() => execCommandOnSection(s.id, 'italic')}
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
                                  onClick={() => execCommandOnSection(s.id, 'underline')}
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
                                  onClick={() => execCommandOnSection(s.id, 'justifyLeft')}
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
                                  onClick={() => execCommandOnSection(s.id, 'justifyCenter')}
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
                                  onClick={() => execCommandOnSection(s.id, 'justifyRight')}
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
                                  onClick={() => execCommandOnSection(s.id, 'insertUnorderedList')}
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
                                  onClick={() => execCommandOnSection(s.id, 'insertOrderedList')}
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
                                  onClick={() => {
                                    const url = prompt('Enter URL:');
                                    if (url) execCommandOnSection(s.id, 'createLink', url);
                                  }}
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
                              ref={el => {
                                sectionRefs.current[s.id] = el;
                                try {
                                  if (el && s.content != null && el.innerHTML !== s.content && document.activeElement !== el) {
                                    el.innerHTML = s.content;
                                  }
                                } catch (err) {
                                  // ignore
                                }
                              }}
                              className="editor-content section-text"
                              contentEditable
                              suppressContentEditableWarning
                              onBlur={e => updateSectionContent(s.id, e.currentTarget.innerHTML)}
                            />
                          </div>
                        ) : (
                          <div
                            className={`image-upload-area ${(s.preview || s.content) ? 'has-image' : ''}`}
                            onDrop={(e) => { e.preventDefault(); e.stopPropagation(); const f = e.dataTransfer.files[0]; if (f) handleSectionImageSelect(s.id, f); }}
                            onDragOver={(e) => e.preventDefault()}
                            onClick={() => document.getElementById(`sec-img-${s.id}`).click()}
                          >
                            {(s.preview || s.content) ? (
                              <div className="image-preview-container">
                                <img src={s.preview || s.content} alt="Preview" className="image-preview" />
                                <div style={{display: 'flex', gap: '0.5rem', marginTop: '0.5rem'}}>
                                  <button
                                    className="remove-image-btn"
                                    onClick={(e) => {
                                      (async () => {
                                        e.stopPropagation();
                                        // If this section references an already-uploaded inline image, try to delete it from storage
                                        try {
                                          const maybeUrl = s.content || '';
                                          if (typeof maybeUrl === 'string' && maybeUrl.includes('/blog-images/') && maybeUrl.includes('blog-inline/')) {
                                            await supabaseService.deleteBlogInlineImage(maybeUrl);
                                          }
                                        } catch (err) {
                                          console.error('Failed to delete inline image from storage:', err);
                                          try {
                                            await showError(`Failed to remove image from storage: ${err.message}`, 'Delete Error');
                                          } catch (e) {
                                            // ignore showError failure
                                          }
                                        } finally {
                                          // Clear file/preview/content for this section locally regardless
                                          setBlogFormData(prev => ({ ...prev, sections: prev.sections.map(x => x.id === s.id ? { ...x, file: null, preview: null, content: '' } : x) }));
                                        }
                                      })();
                                    }}
                                    title="Remove image"
                                    aria-label="Remove image"
                                  >
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                      <line x1="18" y1="6" x2="6" y2="18"></line>
                                      <line x1="6" y1="6" x2="18" y2="18"></line>
                                    </svg>
                                  </button>
                                  {/* Alt text removed - simplified UI */}
                                </div>
                              </div>
                            ) : (
                              <div className="upload-placeholder">
                                <p>Drop image here or click to upload</p>
                                <p className="upload-hint">JPG, PNG, WebP, or GIF • Max 5MB</p>
                              </div>
                            )}
                            <input
                              id={`sec-img-${s.id}`}
                              type="file"
                              accept="image/jpeg,image/jpg,image/png,image/webp,image/gif"
                              onChange={(e) => handleSectionImageSelect(s.id, e.target.files[0])}
                              style={{ display: 'none' }}
                            />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="sections-actions">
                    <button type="button" className="btn-secondary" onClick={() => addSection('text')}>+ Text Section</button>
                    <button type="button" className="btn-secondary" onClick={() => addSection('image')}>+ Image Section</button>
                  </div>

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
              <button className="btn-secondary" onClick={closeBlogForm} disabled={status === 'saving'}>
                Cancel
              </button>
              <button
                className="btn-primary"
                onClick={saveBlog}
                disabled={status === 'saving'}
                aria-busy={status === 'saving'}
              >
                {status === 'saving' ? (
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                    <div
                      className="loading-spinner"
                      style={{ width: 16, height: 16, border: '2px solid #333', borderTopColor: 'var(--accent)', borderRadius: '50%' }}
                    ></div>
                    <span>{editingBlog ? 'Saving...' : 'Creating...'}</span>
                  </span>
                ) : (
                  <>{editingBlog ? 'Update' : 'Create'} Blog Post</>
                )}
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