import { useState, useEffect, useRef, forwardRef, useImperativeHandle, useCallback } from 'react';
import { supabaseService } from '../../utils/supabase';
import { useSupabaseSyncStatus } from '../../hooks/useSupabaseSyncStatus';
import SyncStatusBadge from '../SyncStatusBadge';
import { useAlert } from '../../contexts/AlertContext';

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
  const [resizingImage, setResizingImage] = useState(null);
  const [resizeStartPos, setResizeStartPos] = useState({ x: 0, y: 0 });
  const [resizeStartSize, setResizeStartSize] = useState({ width: 0, height: 0 });

  const bodyEditorRef = useRef(null);
  const fileInputRef = useRef(null);
  const lastImageSrcsRef = useRef(new Set());
  const deletedImagesRef = useRef(new Set());

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

  // Delete an image from Supabase storage by its full URL (no DOM element required)
  const deleteImageFromStorageBySrc = async (imageUrl) => {
    if (!imageUrl) return;
    if (!imageUrl.includes('supabase')) return; // only handle storage images

    try {
      startSaving();
      const urlParts = imageUrl.split('/blog-images/');
      if (urlParts.length >= 2) {
        const filePath = urlParts[1];
        await supabaseService.client.storage.from('blog-images').remove([filePath]);
        console.log('Deleted image from storage:', filePath);
      }
    } catch (err) {
      console.error('Error deleting image from storage (observer):', err);
    } finally {
      finishSaving();
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

  // Image resize handlers
  const handleImageMouseDown = useCallback((e, imgElement) => {
    e.preventDefault();
    e.stopPropagation();
    
    const rect = imgElement.getBoundingClientRect();
    setResizingImage(imgElement);
    setResizeStartPos({ x: e.clientX, y: e.clientY });
    setResizeStartSize({ width: rect.width, height: rect.height });
  }, []);

  const handleMouseMove = useCallback((e) => {
    if (!resizingImage) return;
    
    e.preventDefault();
    
    // Add resizing cursor to body
    document.body.classList.add('resizing');
    
    const deltaX = e.clientX - resizeStartPos.x;
    const newWidth = Math.max(100, resizeStartSize.width + deltaX);
    
    // Maintain aspect ratio
    const aspectRatio = resizeStartSize.height / resizeStartSize.width;
    const newHeight = newWidth * aspectRatio;
    
    resizingImage.style.width = `${newWidth}px`;
    resizingImage.style.height = `${newHeight}px`;
  }, [resizingImage, resizeStartPos, resizeStartSize]);

  const handleMouseUp = useCallback(() => {
    if (resizingImage) {
      // Remove resizing cursor
      document.body.classList.remove('resizing');

      // Update the state with the new image size
      const editor = bodyEditorRef.current;
      if (editor) {
        setBlogFormData(prev => ({
          ...prev,
          body: editor.innerHTML
        }));
      }

      // Ensure controls are re-attached to the (possibly re-created) image
      // Run on next tick so DOM updates have settled
      const resizedImg = resizingImage;
      setTimeout(() => {
        try {
          if (resizedImg) {
            // If the image node was replaced, try to find by src inside editor
            const editorNode = bodyEditorRef.current;
            if (editorNode) {
              const found = editorNode.querySelector(`img[src="${resizedImg.src}"]`);
              const targetImg = found || resizedImg;
              addImageControls(targetImg);

              // Make controls visible immediately so user can interact
              const container = targetImg.parentElement;
              if (container && container.classList.contains('image-controls-container')) {
                const btn = container.querySelector('.image-delete-btn');
                const handle = container.querySelector('.resize-handle');
                if (btn) btn.style.opacity = '1';
                if (handle) handle.style.opacity = '1';
              }
            }
          }
        } catch (err) {
          // ignore
        }
      }, 0);
    }
    setResizingImage(null);
  }, [resizingImage]);

  // Add global mouse event listeners
  useEffect(() => {
    if (resizingImage) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [resizingImage, handleMouseMove, handleMouseUp]);

  // Add this useEffect to handle existing images when the form opens
  useEffect(() => {
    if (showBlogForm && bodyEditorRef.current) {
      // Small delay to ensure the editor content is rendered
      setTimeout(() => {
        const editor = bodyEditorRef.current;
        const images = editor.querySelectorAll('img:not(.image-preview)');
        images.forEach(img => {
          addImageControls(img);
        });
      }, 100);
    }
  }, [showBlogForm, blogFormData.body]);

  // Keep editor DOM in sync with `blogFormData.body` when the form opens
  // or when body changes programmatically — but avoid overwriting while user types.
  useEffect(() => {
    const editor = bodyEditorRef.current;
    if (!showBlogForm || !editor) return;

    // If editor is focused (user is typing), don't overwrite DOM — avoids caret jumps
    if (document.activeElement === editor) return;

    const desired = blogFormData.body || '';
    if (editor.innerHTML !== desired) {
      editor.innerHTML = desired;
    }
  }, [showBlogForm, editingBlog, blogFormData.body]);

  // Observe editor DOM changes so we can detect images removed via keyboard
  useEffect(() => {
    if (!showBlogForm) return;
    const editor = bodyEditorRef.current;
    if (!editor) return;

    const getSrcs = () => new Set(Array.from(editor.querySelectorAll('img')).map(i => i.src));

    // Initialize previous set
    lastImageSrcsRef.current = getSrcs();

    const observer = new MutationObserver((mutations) => {
      const current = getSrcs();
      const prev = lastImageSrcsRef.current || new Set();

      // Images removed from DOM
      prev.forEach(src => {
        if (!current.has(src) && !deletedImagesRef.current.has(src)) {
          // Deleted via keyboard or other means; remove from storage
          deleteImageFromStorageBySrc(src).catch(err => console.error(err));
          deletedImagesRef.current.add(src);
        }
      });

      lastImageSrcsRef.current = current;

      // Sync state to reflect DOM changes
      setTimeout(() => {
        const node = bodyEditorRef.current;
        if (node) {
          setBlogFormData(prev => ({ ...prev, body: node.innerHTML }));
        }
      }, 0);
    });

    observer.observe(editor, { childList: true, subtree: true, attributes: false, characterData: false });

    return () => observer.disconnect();
  }, [showBlogForm]);

  const handleInlineImageUpload = async (file) => {
    if (!file) return;

    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
    if (!validTypes.includes(file.type)) {
      await showError('Please upload a JPEG, PNG, WebP, or GIF image.', 'Invalid File Type');
      return;
    }

    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      await showError('Maximum file size is 5MB. Please choose a smaller image.', 'File Too Large');
      return;
    }

    try {
      startSaving();

      const blogId = editingBlog?.id || `temp-${Date.now()}`;
      const imageUrl = await supabaseService.uploadBlogImage(file, blogId);

      // Insert image with controls wrapper
      const altText = file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ');
      const imgHtml = `
        <div class="image-controls-container" style="position: relative; display: inline-block; margin: 1rem 0; max-width: 100%;">
          <img src="${imageUrl}" alt="${altText}" style="display: block; max-width: 100%; height: auto; border-radius: 8px; cursor: default;" />
        </div>
      `;
      
      insertHtmlAtCursor(imgHtml);

      // Add controls to the newly inserted image
      setTimeout(() => {
        const editor = bodyEditorRef.current;
        if (editor) {
          const images = editor.querySelectorAll('.image-controls-container img');
          images.forEach(img => {
            if (!img.parentElement.querySelector('.image-delete-btn')) {
              addImageControls(img);
            }
          });
        }
      }, 100);

      await showSuccess('Image uploaded and inserted into body');
    } catch (error) {
      console.error('Error uploading inline image:', error);
      await showError(`Failed to upload inline image: ${error.message}`, 'Upload Error');
    } finally {
      finishSaving();
    }
  };

  const insertHtmlAtCursor = (html) => {
    const editor = bodyEditorRef.current;
    if (!editor) return;

    editor.focus();
    
    // Check if browser supports execCommand (fallback for older browsers)
    if (document.execCommand && document.execCommand('insertHTML', false, html)) {
      return;
    }

    // Modern approach using Selection API
    const selection = window.getSelection();
    if (selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      range.deleteContents();
      
      const div = document.createElement('div');
      div.innerHTML = html;
      const fragment = document.createDocumentFragment();
      
      while (div.firstChild) {
        fragment.appendChild(div.firstChild);
      }
      
      range.insertNode(fragment);
      
      // Add resize handles to the newly inserted image
      const images = fragment.querySelectorAll('img');
      images.forEach(img => {
        addImageControls(img);
      });
      
      range.setStartAfter(fragment.lastChild);
      range.setEndAfter(fragment.lastChild);
      selection.removeAllRanges();
      selection.addRange(range);
      // Sync state with editor content after DOM insertion (use timeout to avoid interfering with selection)
      setTimeout(() => {
        setBlogFormData(prev => ({
          ...prev,
          body: editor.innerHTML
        }));
      }, 0);
    } else {
      // Fallback: append to end
      setBlogFormData(prev => ({
        ...prev,
        body: prev.body + html
      }));
    }
  };

  // Function to add resize handle to an image
  const addImageControls = (imgElement) => {
    // If the image is already wrapped in a container we created earlier,
    // reuse that container; otherwise create and wrap it.
    const parent = imgElement.parentNode;
    let controlsContainer = parent?.classList && parent.classList.contains('image-controls-container') ? parent : null;

    if (!controlsContainer) {
      controlsContainer = document.createElement('div');
      controlsContainer.className = 'image-controls-container';
      controlsContainer.style.position = 'relative';
      controlsContainer.style.display = 'inline-block';
      controlsContainer.style.margin = '1rem 0';
      controlsContainer.style.maxWidth = '100%';

      // Wrap the image
      parent.insertBefore(controlsContainer, imgElement);
      controlsContainer.appendChild(imgElement);
    }

    // If buttons already added, nothing to do
    if (controlsContainer.querySelector('.image-delete-btn')) {
      return;
    }

    // Create delete button
    const deleteButton = document.createElement('button');
    deleteButton.className = 'image-delete-btn';
    deleteButton.innerHTML = '×';
    deleteButton.title = 'Delete image';
    deleteButton.style.position = 'absolute';
    deleteButton.style.top = '8px';
    deleteButton.style.right = '8px';
    deleteButton.style.width = '24px';
    deleteButton.style.height = '24px';
    deleteButton.style.background = 'rgba(220, 38, 38, 0.9)';
    deleteButton.style.color = 'white';
    deleteButton.style.border = 'none';
    deleteButton.style.borderRadius = '50%';
    deleteButton.style.cursor = 'pointer';
    deleteButton.style.display = 'flex';
    deleteButton.style.alignItems = 'center';
    deleteButton.style.justifyContent = 'center';
    deleteButton.style.fontSize = '16px';
    deleteButton.style.fontWeight = 'bold';
    deleteButton.style.zIndex = '20';
    deleteButton.style.opacity = '0';
    deleteButton.style.transition = 'opacity 0.2s ease';
    deleteButton.style.pointerEvents = 'auto';

    // Create resize handle
    const resizeHandle = document.createElement('div');
    resizeHandle.className = 'resize-handle';
    resizeHandle.innerHTML = '↘';
    resizeHandle.style.position = 'absolute';
    resizeHandle.style.bottom = '2px';
    resizeHandle.style.right = '2px';
    resizeHandle.style.width = '16px';
    resizeHandle.style.height = '16px';
    resizeHandle.style.background = 'var(--accent)';
    resizeHandle.style.border = '1px solid white';
    resizeHandle.style.borderRadius = '2px';
    resizeHandle.style.cursor = 'nwse-resize';
    resizeHandle.style.display = 'flex';
    resizeHandle.style.alignItems = 'center';
    resizeHandle.style.justifyContent = 'center';
    resizeHandle.style.fontSize = '10px';
    resizeHandle.style.color = 'white';
    resizeHandle.style.zIndex = '15';
    resizeHandle.style.opacity = '0';
    resizeHandle.style.transition = 'opacity 0.2s ease';
    resizeHandle.style.pointerEvents = 'auto';

    // Add event listeners
    // Use 'click' for delete to avoid conflicts with resize mousedown/mouseup
    deleteButton.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      handleDeleteImage(imgElement);
    });

    resizeHandle.addEventListener('mousedown', (e) => {
      e.preventDefault();
      e.stopPropagation();
      handleImageMouseDown(e, imgElement);
    });

    // Show controls on hover
    controlsContainer.addEventListener('mouseenter', () => {
      deleteButton.style.opacity = '1';
      resizeHandle.style.opacity = '1';
    });

    controlsContainer.addEventListener('mouseleave', () => {
      // Defer hiding slightly and also check if the mouse is actually outside
      setTimeout(() => {
        if (!resizingImage && !controlsContainer.matches(':hover')) {
          deleteButton.style.opacity = '0';
          resizeHandle.style.opacity = '0';
        }
      }, 50);
    });

    controlsContainer.appendChild(deleteButton);
    controlsContainer.appendChild(resizeHandle);

    // Ensure image has proper styling
    imgElement.style.display = 'block';
    imgElement.style.maxWidth = '100%';
    imgElement.style.height = 'auto';
    imgElement.style.borderRadius = '8px';
    imgElement.style.cursor = 'default';
  };

  // Function to handle image deletion
  const handleDeleteImage = async (imgElement) => {
    const imageUrl = imgElement.src;
    
    // Check if this is a Supabase storage image
    if (imageUrl.includes('supabase')) {
      const confirmed = await showConfirm(
        'Are you sure you want to delete this image? This will remove it from storage permanently.',
        'Delete Image'
      );

      if (!confirmed) return;

      try {
        startSaving();
        
        // Extract the file path from the URL and delete from storage
        const urlParts = imageUrl.split('/blog-images/');
        if (urlParts.length >= 2) {
          const filePath = urlParts[1];
          await supabaseService.client.storage
            .from('blog-images')
            .remove([filePath]);
        }
        
        // Remove the image from the DOM
        const container = imgElement.parentElement;
        if (container && container.classList.contains('image-controls-container')) {
          container.remove();
        } else {
          imgElement.remove();
        }

        // Update the body content
        const editor = bodyEditorRef.current;
        if (editor) {
          setBlogFormData(prev => ({
            ...prev,
            body: editor.innerHTML
          }));
        }

        // Mark as deleted so MutationObserver doesn't try to double-delete
        try { deletedImagesRef.current.add(imageUrl); } catch (err) { }

        await showSuccess('Image deleted successfully');
      } catch (error) {
        console.error('Error deleting image:', error);
        await showError(`Failed to delete image: ${error.message}`, 'Delete Error');
      } finally {
        finishSaving();
      }
    } else {
      // For external images, just remove from DOM
      const container = imgElement.parentElement;
      if (container && container.classList.contains('image-controls-container')) {
        container.remove();
      } else {
        imgElement.remove();
      }

      // Update the body content
      const editor = bodyEditorRef.current;
      if (editor) {
        setBlogFormData(prev => ({
          ...prev,
          body: editor.innerHTML
        }));
      }
      try { deletedImagesRef.current.add(imageUrl); } catch (err) { }
    }
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

  const handleBodyDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    e.currentTarget.classList.add('drag-over');
  };

  const handleBodyDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    e.currentTarget.classList.remove('drag-over');
  };

  const handleBodyDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    e.currentTarget.classList.remove('drag-over');

    const files = e.dataTransfer?.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    if (file && file.type && file.type.startsWith('image/')) {
      handleInlineImageUpload(file);
    }
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
    
    if (command === 'insertImage') {
      fileInputRef.current?.click();
      return;
    }

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
    
    // Add resize handles to images in the editor
    setTimeout(() => {
      const editor = bodyEditorRef.current;
      if (editor) {
        const images = editor.querySelectorAll('img:not(.image-preview)');
        images.forEach(img => {
          if (!img.parentElement?.classList.contains('image-controls-container')) {
            addImageControls(img);
          }
        });
      }
    }, 0);
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
        const updatedBlog = await supabaseService.updateBlog(editingBlog.id, blogDataToSave);
        const updatedBlogs = blogs.map(b => b.id === editingBlog.id ? updatedBlog : b);
        setBlogs(updatedBlogs);
        setDisplayedData(updatedBlogs);
        await showSuccess('Blog updated successfully');
      } else {
        const newBlog = await supabaseService.createBlog(blogDataToSave);
        const updatedBlogs = [newBlog, ...blogs];
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
          max-width: 900px;
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

        /* Custom styled checkbox to match site look */
        .form-check {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .form-check input[type="checkbox"] {
          /* visually hide native checkbox but keep it accessible */
          position: absolute;
          opacity: 0;
          width: 0;
          height: 0;
        }

        .form-check label {
          position: relative;
          padding-left: 40px;
          cursor: pointer;
          user-select: none;
          color: var(--text);
          font-weight: 500;
        }

        .form-check label::before {
          content: '';
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
          width: 28px;
          height: 18px;
          border-radius: 999px;
          background: #232323;
          border: 1px solid #2f2f2f;
          box-shadow: inset 0 -2px 0 rgba(0,0,0,0.2);
          transition: background 0.15s ease, border-color 0.15s ease;
        }

        .form-check label::after {
          content: '';
          position: absolute;
          left: 4px;
          top: 50%;
          transform: translateY(-50%);
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: #fff;
          transition: left 0.15s ease, background 0.15s ease;
          box-shadow: 0 1px 2px rgba(0,0,0,0.3);
        }

        .form-check input[type="checkbox"]:checked + label::before {
          background: var(--accent);
          border-color: var(--accent);
        }

        .form-check input[type="checkbox"]:checked + label::after {
          left: 14px;
          background: white;
        }

        .form-check input[type="checkbox"]:focus + label::before {
          box-shadow: 0 0 0 3px rgba(199, 24, 33, 0.12);
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

        /* Rich Text Editor Styles */
        .rich-text-editor {
          border: 2px solid #333;
          border-radius: 6px;
          background: var(--bg);
          overflow: hidden;
        }

        .editor-toolbar {
          display: flex;
          flex-wrap: wrap;
          gap: 0.25rem;
          padding: 0.75rem;
          border-bottom: 1px solid #333;
          background: #1a1a1a;
          align-items: center;
        }

        .toolbar-group {
          display: flex;
          gap: 0.25rem;
          align-items: center;
          padding-right: 0.75rem;
          border-right: 1px solid #333;
          margin-right: 0.75rem;
        }

        .toolbar-group:last-child {
          border-right: none;
          margin-right: 0;
        }

        .toolbar-btn {
          background: transparent;
          border: 1px solid transparent;
          border-radius: 4px;
          color: var(--text);
          padding: 0.5rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
          font-size: 0.9rem;
        }

        .toolbar-btn:hover {
          background: #333;
          border-color: #555;
        }

        .toolbar-btn.active {
          background: var(--accent);
          border-color: var(--accent);
          color: white;
        }

        .toolbar-btn svg {
          width: 16px;
          height: 16px;
        }

        .font-select, .size-select {
          background: var(--bg);
          border: 1px solid #333;
          border-radius: 4px;
          color: var(--text);
          padding: 0.4rem;
          font-size: 0.9rem;
          cursor: pointer;
        }

        .font-select:focus, .size-select:focus {
          outline: none;
          border-color: var(--accent);
        }

        .editor-content {
          min-height: 500px;
          max-height: 800px;
          overflow-y: auto;
          padding: 1rem;
          color: var(--text);
          line-height: 1.6;
        }

        .editor-content:focus {
          outline: none;
        }

        .editor-content.drag-over {
          background: rgba(220, 53, 69, 0.1);
          border: 2px dashed var(--accent);
        }

        .editor-content img {
          max-width: 100%;
          height: auto;
          border-radius: 8px;
          margin: 1rem 0;
        }

        .editor-content h1, .editor-content h2, .editor-content h3 {
          margin: 1.5rem 0 1rem 0;
          color: var(--text);
        }

        .editor-content p {
          margin-bottom: 1rem;
        }

        .editor-content ul, .editor-content ol {
          margin: 1rem 0;
          padding-left: 2rem;
        }

        .editor-content blockquote {
          border-left: 4px solid var(--accent);
          padding-left: 1rem;
          margin: 1rem 0;
          color: var(--subtxt);
          font-style: italic;
        }

        .editor-content code {
          background: #2d2d2d;
          padding: 0.2rem 0.4rem;
          border-radius: 4px;
          font-family: 'Courier New', monospace;
          font-size: 0.9em;
        }

        .editor-content pre {
          background: #2d2d2d;
          padding: 1rem;
          border-radius: 6px;
          overflow-x: auto;
          margin: 1rem 0;
        }

        .editor-content pre code {
          background: none;
          padding: 0;
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

          .editor-toolbar {
            gap: 0.5rem;
          }

          .toolbar-group {
            padding-right: 0.5rem;
            margin-right: 0.5rem;
          }
        }
        /* Image Resize Styles */
        .resize-handle-container {
          position: relative;
          display: inline-block;
          margin: 1rem 0;
          border: 2px dashed transparent;
          transition: border-color 0.2s ease;
          max-width: 100%;
        }

        .resize-handle-container:hover {
          border-color: var(--accent);
        }

        .resize-handle {
          position: absolute;
          bottom: 2px;
          right: 2px;
          width: 12px;
          height: 12px;
          background: var(--accent);
          border: 1px solid white;
          border-radius: 2px;
          cursor: nwse-resize;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 8px;
          color: white;
          z-index: 10;
          user-select: none;
          opacity: 0;
          transition: opacity 0.2s ease;
        }

        .resize-handle-container:hover .resize-handle {
          opacity: 1;
        }

        .resize-handle:active {
          background: #c71821;
        }

        /* Ensure images in resize containers maintain proper styling */
        .resize-handle-container img {
          max-width: 100% !important;
          height: auto !important;
          border-radius: 8px;
          display: block;
        }

        /* Image Controls Styles */
        .image-controls-container {
          position: relative;
          display: inline-block;
          margin: 1rem 0;
          max-width: 100%;
          border: 2px dashed transparent;
          transition: border-color 0.2s ease;
        }

        .image-controls-container:hover {
          border-color: var(--accent);
        }

        .image-controls-container img {
          display: block;
          max-width: 100%;
          height: auto;
          border-radius: 8px;
          cursor: default;
        }

        .image-delete-btn {
          position: absolute;
          top: 8px;
          right: 8px;
          width: 24px;
          height: 24px;
          background: rgba(220, 38, 38, 0.9);
          color: white;
          border: none;
          border-radius: 50%;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 16px;
          font-weight: bold;
          z-index: 20;
          opacity: 0;
          transition: opacity 0.2s ease;
          pointer-events: auto;
        }

        .image-delete-btn:hover {
          background: #dc2626;
          transform: scale(1.1);
        }

        .resize-handle {
          position: absolute;
          bottom: 2px;
          right: 2px;
          width: 16px;
          height: 16px;
          background: var(--accent);
          border: 1px solid white;
          border-radius: 2px;
          cursor: nwse-resize;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 10px;
          color: white;
          z-index: 15;
          opacity: 0;
          transition: opacity 0.2s ease;
          pointer-events: auto;
        }

        .image-controls-container:hover .image-delete-btn,
        .image-controls-container:hover .resize-handle {
          opacity: 1;
        }

        .resize-handle:active {
          background: #c71821;
        }

        /* Cursor style during resize */
        body.resizing {
          cursor: nwse-resize !important;
          user-select: none;
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
                        onClick={() => execCommand('insertImage')}
                        title="Insert Image"
                      >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                          <circle cx="8.5" cy="8.5" r="1.5"></circle>
                          <polyline points="21 15 16 10 5 21"></polyline>
                        </svg>
                      </button>
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
                    onDragOver={handleBodyDragOver}
                    onDragLeave={handleBodyDragLeave}
                    onDrop={handleBodyDrop}
                    placeholder="Write your blog content here... You can drag and drop images directly into the editor!"
                  />
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/jpg,image/png,image/webp,image/gif"
                  style={{ display: 'none' }}
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      handleInlineImageUpload(file);
                      e.target.value = '';
                    }
                  }}
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
});

BlogManager.displayName = 'BlogManager';

export default BlogManager;