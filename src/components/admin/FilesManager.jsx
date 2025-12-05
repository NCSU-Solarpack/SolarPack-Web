import { useState, useEffect, useRef, useCallback } from 'react';
import { supabaseService } from '../../utils/supabase';
import { authService, AUTH_LEVELS } from '../../utils/auth';
import { useAlert } from '../../contexts/AlertContext';
import './FilesManager.css';

// Main bucket for user file storage
const MAIN_BUCKET = 'file-storage';

// Protected website data buckets - displayed in a virtual "Website Data" folder
const WEBSITE_DATA_BUCKETS = [
  { id: 'order-receipts', label: 'Order Receipts', icon: 'fa-receipt' },
  { id: 'blog-images', label: 'Blog Images', icon: 'fa-newspaper' },
  { id: 'sponsor-logos', label: 'Sponsor Logos', icon: 'fa-handshake' },
  { id: 'team-images', label: 'Team Images', icon: 'fa-users' }
];

// File type mappings for icons and colors
const FILE_TYPES = {
  image: { extensions: ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg', 'bmp'], icon: 'fa-file-image', class: 'image' },
  pdf: { extensions: ['pdf'], icon: 'fa-file-pdf', class: 'pdf' },
  document: { extensions: ['doc', 'docx', 'txt', 'rtf', 'odt'], icon: 'fa-file-word', class: 'document' },
  spreadsheet: { extensions: ['xls', 'xlsx', 'csv', 'ods'], icon: 'fa-file-excel', class: 'spreadsheet' },
  presentation: { extensions: ['ppt', 'pptx', 'odp'], icon: 'fa-file-powerpoint', class: 'document' },
  video: { extensions: ['mp4', 'webm', 'avi', 'mov', 'mkv'], icon: 'fa-file-video', class: 'video' },
  audio: { extensions: ['mp3', 'wav', 'ogg', 'flac', 'aac'], icon: 'fa-file-audio', class: 'audio' },
  archive: { extensions: ['zip', 'rar', '7z', 'tar', 'gz'], icon: 'fa-file-zipper', class: 'archive' },
  code: { extensions: ['js', 'jsx', 'ts', 'tsx', 'html', 'css', 'json', 'py'], icon: 'fa-file-code', class: 'document' },
  default: { icon: 'fa-file', class: '' }
};

const FilesManager = () => {
  // State
  const [currentPath, setCurrentPath] = useState([]); // Array of folder names for breadcrumb
  const [items, setItems] = useState([]); // Files and folders in current view
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState([]);
  const [selectedItems, setSelectedItems] = useState(new Set());
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [searchQuery, setSearchQuery] = useState('');
  const [contextMenu, setContextMenu] = useState(null); // { x, y, item }
  const [modal, setModal] = useState(null); // { type: 'newFolder'|'rename'|'upload'|'preview'|'delete', data: any }
  const [newFolderName, setNewFolderName] = useState('');
  const [renameValue, setRenameValue] = useState('');
  const [isInWebsiteData, setIsInWebsiteData] = useState(false);
  const [websiteDataBucket, setWebsiteDataBucket] = useState(null);
  
  const fileInputRef = useRef(null);
  const dropZoneRef = useRef(null);
  const { showConfirm, showError, showSuccess } = useAlert();

  // Auth checks
  const userLevel = authService.getLevel();
  const canManageFiles = [AUTH_LEVELS.MEMBER, AUTH_LEVELS.LEADER, AUTH_LEVELS.DIRECTOR].includes(userLevel);

  // Get current bucket and path string for Supabase operations
  const getCurrentBucket = useCallback(() => {
    if (isInWebsiteData && websiteDataBucket) {
      return websiteDataBucket;
    }
    return MAIN_BUCKET;
  }, [isInWebsiteData, websiteDataBucket]);

  const getCurrentPathString = useCallback(() => {
    if (isInWebsiteData) {
      // When in website data, the path is relative to that bucket's root
      const pathWithoutWebsiteData = currentPath.slice(1); // Remove "Website Data" prefix
      if (websiteDataBucket) {
        // Remove the bucket folder from path too
        return pathWithoutWebsiteData.slice(1).join('/');
      }
      return '';
    }
    return currentPath.join('/');
  }, [currentPath, isInWebsiteData, websiteDataBucket]);

  // Load files and folders
  const loadItems = useCallback(async () => {
    setLoading(true);
    try {
      if (!supabaseService || !supabaseService.client) {
        throw new Error('Supabase not configured');
      }

      // Check if we're viewing the root with Website Data virtual folder
      if (currentPath.length === 0) {
        // Load root of main bucket
        const { data, error } = await supabaseService.client.storage
          .from(MAIN_BUCKET)
          .list('', { limit: 500, sortBy: { column: 'name', order: 'asc' } });
        
        if (error) throw error;
        
        // Add "Website Data" virtual folder at the beginning
        const virtualFolder = {
          id: 'website-data',
          name: 'Website Data',
          isFolder: true,
          isVirtual: true,
          isProtected: true,
          // Ensure the virtual "Website Data" entry displays a folder icon
          icon: 'fa-folder',
          iconClass: ''
        };
        
        const processed = processItems(data || []);
        setItems([virtualFolder, ...processed]);
        setIsInWebsiteData(false);
        setWebsiteDataBucket(null);
      } 
      // Check if we're in "Website Data" folder showing buckets
      else if (currentPath.length === 1 && currentPath[0] === 'Website Data') {
        // Show the website data buckets as folders
        const bucketFolders = WEBSITE_DATA_BUCKETS.map(b => ({
          id: b.id,
          name: b.label,
          isFolder: true,
          isProtected: true,
          bucketId: b.id,
          customIcon: b.icon
        }));
        setItems(bucketFolders);
        setIsInWebsiteData(true);
        setWebsiteDataBucket(null);
      }
      // Check if we're inside a specific website data bucket
      else if (currentPath[0] === 'Website Data' && currentPath.length >= 2) {
        // Find which bucket we're in
        const bucketLabel = currentPath[1];
        const bucket = WEBSITE_DATA_BUCKETS.find(b => b.label === bucketLabel);
        
        if (bucket) {
          setIsInWebsiteData(true);
          setWebsiteDataBucket(bucket.id);
          
          // Get path within the bucket
          const pathInBucket = currentPath.slice(2).join('/');
          
          const { data, error } = await supabaseService.client.storage
            .from(bucket.id)
            .list(pathInBucket, { limit: 500, sortBy: { column: 'name', order: 'asc' } });
          
          if (error) throw error;
          
          const processed = processItems(data || [], true);
          setItems(processed);
        }
      }
      // Normal navigation in main bucket
      else {
        const pathString = currentPath.join('/');
        const { data, error } = await supabaseService.client.storage
          .from(MAIN_BUCKET)
          .list(pathString, { limit: 500, sortBy: { column: 'name', order: 'asc' } });
        
        if (error) throw error;
        
        const processed = processItems(data || []);
        setItems(processed);
        setIsInWebsiteData(false);
        setWebsiteDataBucket(null);
      }
    } catch (err) {
      console.error('Failed to load files:', err);
      await showError(`Failed to load files: ${err.message}`, 'Load Error');
      setItems([]);
    } finally {
      setLoading(false);
    }
  }, [currentPath, showError]);

  // Process raw Supabase items into our format
  const processItems = (data, isProtected = false) => {
    return data.map(item => {
      // Supabase folders have id = null and no metadata
      const isFolder = item.id === null;
      
      return {
        id: item.id || item.name,
        name: item.name,
        isFolder,
        isProtected,
        size: item.metadata?.size || 0,
        mimeType: item.metadata?.mimetype || '',
        lastModified: item.updated_at || item.created_at || '',
        ...getFileTypeInfo(item.name, isFolder)
      };
    });
  };

  // Get file type info based on extension
  const getFileTypeInfo = (filename, isFolder) => {
    if (isFolder) {
      return { icon: 'fa-folder', iconClass: '' };
    }
    
    const ext = filename.split('.').pop()?.toLowerCase() || '';
    
    for (const [type, config] of Object.entries(FILE_TYPES)) {
      if (type !== 'default' && config.extensions?.includes(ext)) {
        return { icon: config.icon, iconClass: config.class, fileType: type };
      }
    }
    
    return { icon: FILE_TYPES.default.icon, iconClass: '', fileType: 'unknown' };
  };

  // Format file size
  const formatFileSize = (bytes) => {
    if (!bytes || bytes === 0) return '-';
    const units = ['B', 'KB', 'MB', 'GB'];
    let size = bytes;
    let unitIndex = 0;
    while (size >= 1024 && unitIndex < units.length - 1) {
      size /= 1024;
      unitIndex++;
    }
    return `${size.toFixed(1)} ${units[unitIndex]}`;
  };

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  // Get public URL for a file
  const getPublicUrl = (item) => {
    const bucket = getCurrentBucket();
    const pathStr = getCurrentPathString();
    const fullPath = pathStr ? `${pathStr}/${item.name}` : item.name;
    
    try {
      const { data } = supabaseService.client.storage.from(bucket).getPublicUrl(fullPath);
      return data?.publicUrl || '';
    } catch (err) {
      console.warn('getPublicUrl failed', err);
      return '';
    }
  };

  // Load items when path changes
  useEffect(() => {
    loadItems();
  }, [loadItems]);

  // Close context menu on click outside
  useEffect(() => {
    const handleClick = () => setContextMenu(null);
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  // Navigation handlers
  const navigateToFolder = (folderName) => {
    setCurrentPath([...currentPath, folderName]);
    setSelectedItems(new Set());
    setSearchQuery('');
  };

  const navigateToPath = (index) => {
    if (index === -1) {
      setCurrentPath([]);
    } else {
      setCurrentPath(currentPath.slice(0, index + 1));
    }
    setSelectedItems(new Set());
    setSearchQuery('');
  };

  const navigateUp = () => {
    if (currentPath.length > 0) {
      setCurrentPath(currentPath.slice(0, -1));
      setSelectedItems(new Set());
    }
  };

  // Item click handlers
  const handleItemClick = (item, event) => {
    if (event.ctrlKey || event.metaKey) {
      // Multi-select with Ctrl/Cmd
      const newSelected = new Set(selectedItems);
      if (newSelected.has(item.id)) {
        newSelected.delete(item.id);
      } else {
        newSelected.add(item.id);
      }
      setSelectedItems(newSelected);
    } else {
      setSelectedItems(new Set([item.id]));
    }
  };

  const handleItemDoubleClick = (item) => {
    if (item.isFolder || item.isVirtual) {
      if (item.isVirtual && item.id === 'website-data') {
        navigateToFolder('Website Data');
      } else if (item.bucketId) {
        navigateToFolder(item.name);
      } else {
        navigateToFolder(item.name);
      }
    } else {
      // Open file preview or download
      handlePreviewFile(item);
    }
  };

  const handleContextMenu = (event, item) => {
    event.preventDefault();
    setContextMenu({
      x: event.clientX,
      y: event.clientY,
      item
    });
    if (!selectedItems.has(item.id)) {
      setSelectedItems(new Set([item.id]));
    }
  };

  // File operations
  const handleCreateFolder = async () => {
    if (!newFolderName.trim()) return;
    
    try {
      setLoading(true);
      const bucket = getCurrentBucket();
      const pathStr = getCurrentPathString();
      // If creating at the root of the main bucket, many RLS setups
      // require inserts to be scoped to the authenticated user's folder
      // (e.g. 'USER_UUID/...'). Prefer creating the folder under the
      // user's UID when possible to satisfy those policies. Wait for
      // the authService to initialize, then fall back to Supabase client
      // if the auth service hasn't populated the user yet.
      try {
        if (authService.waitForInit) await authService.waitForInit();
      } catch (e) {
        // ignore
      }

      let user = authService.getUser ? authService.getUser() : null;
      // If authService doesn't have the user yet, ask supabaseService directly
      if (!user) {
        try {
          const supUser = await supabaseService.getUser();
          if (supUser) user = { id: supUser.id, email: supUser.email };
        } catch (e) {
          // ignore
        }
      }

      const userId = user?.id || null;

      let folderPath;
      if (
        bucket === MAIN_BUCKET &&
        !isInWebsiteData &&
        (!pathStr || pathStr.trim() === '') &&
        userId
      ) {
        folderPath = `${userId}/${newFolderName.trim()}/.keep`;
      } else {
        folderPath = pathStr ? `${pathStr}/${newFolderName.trim()}/.keep` : `${newFolderName.trim()}/.keep`;
      }
      
      // Supabase requires uploading a file to create a folder
      const { error } = await supabaseService.client.storage
        .from(bucket)
        .upload(folderPath, new Blob([''], { type: 'text/plain' }), { upsert: true });
      
      if (error) throw error;
      
      await showSuccess(`Folder "${newFolderName.trim()}" created`);
      setModal(null);
      setNewFolderName('');
      await loadItems();
    } catch (err) {
      console.error('Failed to create folder:', err);

      // Provide clearer guidance when the failure is due to RLS
      const message = err?.message || String(err);
      if (/row[- ]level security|new row violates/i.test(message)) {
        await showError(
          `Failed to create folder: ${message}. This usually means database row-level security blocked the INSERT. Possible fixes:\n- Ensure the user has a row in \`public.user_roles\` (user_id = your uid) with an allowed status.\n- Or ask the DB owner to adjust the INSERT policy on \`storage.objects\` (or add a user-scoped policy).\nAs a workaround this UI creates folders under your user id (if available).`,
          'Create Error'
        );
      } else {
        await showError(`Failed to create folder: ${message}`, 'Create Error');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleUploadFiles = async (files) => {
    if (!files || files.length === 0) return;
    
    setUploading(true);
    setUploadProgress(files.map(f => ({ name: f.name, progress: 0, status: 'uploading' })));
    
    const bucket = getCurrentBucket();
    const pathStr = getCurrentPathString();
    
    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const filePath = pathStr ? `${pathStr}/${file.name}` : file.name;
        
        const { error } = await supabaseService.client.storage
          .from(bucket)
          .upload(filePath, file, { cacheControl: '3600', upsert: true });
        
        setUploadProgress(prev => prev.map((p, idx) => 
          idx === i ? { ...p, progress: 100, status: error ? 'error' : 'success' } : p
        ));
        
        if (error) {
          console.error(`Failed to upload ${file.name}:`, error);
        }
      }
      
      await showSuccess('Upload completed');
      setModal(null);
      await loadItems();
    } catch (err) {
      console.error('Upload failed:', err);
      await showError(`Upload failed: ${err.message}`, 'Upload Error');
    } finally {
      setUploading(false);
      setUploadProgress([]);
    }
  };

  const handleRenameItem = async () => {
    if (!renameValue.trim() || !modal?.data) return;
    
    try {
      setLoading(true);
      const bucket = getCurrentBucket();
      const pathStr = getCurrentPathString();
      const oldPath = pathStr ? `${pathStr}/${modal.data.name}` : modal.data.name;
      const newPath = pathStr ? `${pathStr}/${renameValue.trim()}` : renameValue.trim();
      
      // Supabase doesn't have a rename function, so we copy and delete
      const { data, error: downloadError } = await supabaseService.client.storage
        .from(bucket)
        .download(oldPath);
      
      if (downloadError) throw downloadError;
      
      const { error: uploadError } = await supabaseService.client.storage
        .from(bucket)
        .upload(newPath, data, { upsert: true });
      
      if (uploadError) throw uploadError;
      
      const { error: deleteError } = await supabaseService.client.storage
        .from(bucket)
        .remove([oldPath]);
      
      if (deleteError) throw deleteError;
      
      await showSuccess(`Renamed to "${renameValue.trim()}"`);
      setModal(null);
      setRenameValue('');
      await loadItems();
    } catch (err) {
      console.error('Failed to rename:', err);
      await showError(`Failed to rename: ${err.message}`, 'Rename Error');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteItems = async (itemsToDelete) => {
    if (!itemsToDelete || itemsToDelete.length === 0) return;

    const names = itemsToDelete.map(i => i.name).join(', ');
    const confirmed = await showConfirm(
      `Are you sure you want to delete ${itemsToDelete.length > 1 ? `these ${itemsToDelete.length} items` : names}?`,
      'Delete Items'
    );

    if (!confirmed) return;

    try {
      setLoading(true);
      const bucket = getCurrentBucket();
      const pathStr = getCurrentPathString();

      // Helper to recursively collect all file paths under a folder
      const collectAllFilePaths = async (folderPath) => {
        let allPaths = [];
        // List all items in this folder
        const { data, error } = await supabaseService.client.storage
          .from(bucket)
          .list(folderPath, { limit: 500 });
        if (error) throw error;
        for (const item of data || []) {
          if (item.id === null) {
            // It's a folder, recurse
            const subfolder = folderPath ? `${folderPath}/${item.name}` : item.name;
            const subPaths = await collectAllFilePaths(subfolder);
            allPaths = allPaths.concat(subPaths);
          } else {
            // It's a file
            allPaths.push(folderPath ? `${folderPath}/${item.name}` : item.name);
          }
        }
        return allPaths;
      };

      // Build list of all file paths to delete
      let filePaths = [];
      for (const item of itemsToDelete) {
        const itemPath = pathStr ? `${pathStr}/${item.name}` : item.name;
        if (item.isFolder) {
          // Recursively collect all files in the folder
          const allFiles = await collectAllFilePaths(itemPath);
          filePaths = filePaths.concat(allFiles);
          // Optionally, also try to delete the .keep file if present
          filePaths.push(`${itemPath}/.keep`);
        } else {
          filePaths.push(itemPath);
        }
      }

      // Remove duplicates and filter out empty strings
      filePaths = Array.from(new Set(filePaths)).filter(Boolean);

      if (filePaths.length === 0) {
        await showSuccess('Nothing to delete.');
        setSelectedItems(new Set());
        await loadItems();
        return;
      }

      const { error } = await supabaseService.client.storage
        .from(bucket)
        .remove(filePaths);

      if (error) throw error;

      await showSuccess(`Deleted ${itemsToDelete.length} item(s)`);
      setSelectedItems(new Set());
      await loadItems();
    } catch (err) {
      console.error('Failed to delete:', err);
      await showError(`Failed to delete: ${err.message}`, 'Delete Error');
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadFile = (item) => {
    const url = getPublicUrl(item);
    if (url) {
      window.open(url, '_blank');
    }
  };

  const handlePreviewFile = (item) => {
    const url = getPublicUrl(item);
    setModal({
      type: 'preview',
      data: { ...item, url }
    });
  };

  // Drag and drop handlers
  const handleDragOver = (event) => {
    event.preventDefault();
    event.currentTarget.classList.add('drag-over');
  };

  const handleDragLeave = (event) => {
    event.currentTarget.classList.remove('drag-over');
  };

  const handleDrop = (event) => {
    event.preventDefault();
    event.currentTarget.classList.remove('drag-over');
    
    if (isInWebsiteData) {
      showError('Cannot upload files to Website Data folder. This folder is read-only.', 'Protected Folder');
      return;
    }
    
    const files = Array.from(event.dataTransfer.files);
    if (files.length > 0) {
      handleUploadFiles(files);
    }
  };

  // Filter items: hide .keep and hidden files, then by search
  const filteredItems = items
    .filter(item => {
      // Hide files named .keep or starting with a dot (but not folders)
      if (!item.isFolder && (item.name === '.keep' || item.name.startsWith('.'))) return false;
      return true;
    })
    .filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()));

  // Get selected items array
  const getSelectedItemsArray = () => {
    return items.filter(item => selectedItems.has(item.id));
  };

  // Check if operations are allowed
  const isProtectedZone = isInWebsiteData;

  // Render breadcrumb
  const renderBreadcrumb = () => (
    <nav className="breadcrumb-nav">
      <div 
        className={`breadcrumb-item ${currentPath.length === 0 ? 'current' : ''}`}
        onClick={() => navigateToPath(-1)}
      >
        <i className="fa-solid fa-hard-drive breadcrumb-icon"></i>
        <span>File Storage</span>
      </div>
      {currentPath.map((folder, index) => (
        <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
          <span className="breadcrumb-separator">
            <i className="fa-solid fa-chevron-right"></i>
          </span>
          <div 
            className={`breadcrumb-item ${index === currentPath.length - 1 ? 'current' : ''}`}
            onClick={() => navigateToPath(index)}
          >
            <i className={`fa-solid ${folder === 'Website Data' ? 'fa-shield-halved' : 'fa-folder'} breadcrumb-icon`}></i>
            <span>{folder}</span>
          </div>
        </div>
      ))}
    </nav>
  );

  // Render toolbar
  const renderToolbar = () => (
    <div className="files-toolbar">
      <div className="toolbar-left">
        <button 
          className="toolbar-btn" 
          onClick={navigateUp}
          disabled={currentPath.length === 0}
        >
          <i className="fa-solid fa-arrow-up"></i>
          Up
        </button>
        
        <button 
          className="toolbar-btn" 
          onClick={loadItems}
          disabled={loading}
        >
          <i className="fa-solid fa-refresh"></i>
          Refresh
        </button>
        
        <div className="toolbar-divider"></div>
        
        {!isProtectedZone && canManageFiles && (
          <>
            <button 
              className="toolbar-btn primary" 
              onClick={() => setModal({ type: 'upload' })}
              disabled={uploading}
            >
              <i className="fa-solid fa-upload"></i>
              Upload
            </button>
            
            <button 
              className="toolbar-btn" 
              onClick={() => setModal({ type: 'newFolder' })}
            >
              <i className="fa-solid fa-folder-plus"></i>
              New Folder
            </button>
            
            <div className="toolbar-divider"></div>
          </>
        )}
        
        {selectedItems.size > 0 && !isProtectedZone && canManageFiles && (
          (() => {
            const selected = getSelectedItemsArray();
            // Prevent delete if Website Data virtual folder is selected
            const hasWebsiteData = selected.some(item => item.id === 'website-data');
            return (
              <>
                {selected.length === 1 && !selected[0]?.isFolder && (
                  <button 
                    className="toolbar-btn" 
                    onClick={() => {
                      const item = selected[0];
                      setRenameValue(item.name);
                      setModal({ type: 'rename', data: item });
                    }}
                  >
                    <i className="fa-solid fa-pen"></i>
                    Rename
                  </button>
                )}
                <button 
                  className="toolbar-btn" 
                  onClick={() => handleDeleteItems(selected)}
                  disabled={hasWebsiteData}
                  title={hasWebsiteData ? 'Cannot delete Website Data folder' : undefined}
                >
                  <i className="fa-solid fa-trash"></i>
                  Delete ({selected.length})
                </button>
              </>
            );
          })()
        )}
      </div>
      
      <div className="toolbar-right">
        <div className="search-wrapper">
          <i className="fa-solid fa-search"></i>
          <input
            type="text"
            className="search-input"
            placeholder="Search files..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="view-toggle">
          <button 
            className={`view-toggle-btn ${viewMode === 'grid' ? 'active' : ''}`}
            onClick={() => setViewMode('grid')}
            title="Grid view"
          >
            <i className="fa-solid fa-th-large"></i>
          </button>
          <button 
            className={`view-toggle-btn ${viewMode === 'list' ? 'active' : ''}`}
            onClick={() => setViewMode('list')}
          >
            <i className="fa-solid fa-list"></i>
          </button>
        </div>
      </div>
    </div>
  );

  // Render protected zone alert
  const renderProtectedAlert = () => {
    if (!isProtectedZone) return null;
    
    return (
      <div className="protected-zone-alert">
        <i className="fa-solid fa-triangle-exclamation"></i>
        <div className="alert-content">
          <h4>Read-Only Folder</h4>
          <p>
            This folder contains website data that should only be modified through their respective admin pages 
            (Orders, Blogs, Sponsors, Team). You can view and download files, but uploading, editing, 
            or deleting is disabled here.
          </p>
        </div>
      </div>
    );
  };

  // Render grid view
  const renderGridView = () => (
    <div className="files-grid">
      {filteredItems.map(item => (
        <div
          key={item.id}
          className={`file-item ${item.isFolder ? 'folder' : ''} ${item.isProtected ? 'protected' : ''} ${selectedItems.has(item.id) ? 'selected' : ''}`}
          onClick={(e) => handleItemClick(item, e)}
          onDoubleClick={() => handleItemDoubleClick(item)}
          onContextMenu={(e) => handleContextMenu(e, item)}
        >
          <input
            type="checkbox"
            className="file-checkbox"
            checked={selectedItems.has(item.id)}
            title={`Select ${item.name}`}
            onChange={(e) => {
              e.stopPropagation();
              setSelectedItems(prev => {
                const next = new Set(prev);
                if (next.has(item.id)) next.delete(item.id);
                else next.add(item.id);
                return next;
              });
            }}
            onClick={(e) => e.stopPropagation()}
          />
          <i className={`fa-solid ${item.customIcon || item.icon} file-icon ${item.iconClass || ''}`}></i>
          <span className="file-name">{item.name}</span>
          {!item.isFolder && <span className="file-meta">{formatFileSize(item.size)}</span>}
        </div>
      ))}
    </div>
  );

  // Render list view
  const renderListView = () => (
    <div className="files-list">
      <div className="files-list-header">
        <span></span>
        <span>Name</span>
        <span>Size</span>
        <span>Modified</span>
        <span>Type</span>
      </div>
      {filteredItems.map(item => (
        <div
          key={item.id}
          className={`files-list-item ${selectedItems.has(item.id) ? 'selected' : ''}`}
          onClick={(e) => handleItemClick(item, e)}
          onDoubleClick={() => handleItemDoubleClick(item)}
          onContextMenu={(e) => handleContextMenu(e, item)}
        >
          <input
            type="checkbox"
            className="file-checkbox"
            checked={selectedItems.has(item.id)}
            title={`Select ${item.name}`}
            onChange={(e) => {
              e.stopPropagation();
              setSelectedItems(prev => {
                const next = new Set(prev);
                if (next.has(item.id)) next.delete(item.id);
                else next.add(item.id);
                return next;
              });
            }}
            onClick={(e) => e.stopPropagation()}
          />
          <i className={`fa-solid ${item.customIcon || item.icon} file-icon ${item.iconClass || ''}`}></i>
          <span className="file-name">{item.name}</span>
          <span className="file-size">{item.isFolder ? '-' : formatFileSize(item.size)}</span>
          <span className="file-date">{formatDate(item.lastModified)}</span>
          <span className="file-type">{item.isFolder ? 'Folder' : (item.fileType || 'File')}</span>
        </div>
      ))}
    </div>
  );

  // Render empty state
  const renderEmptyState = () => (
    <div className="empty-folder">
      <i className="fa-solid fa-folder-open"></i>
      <h3>This folder is empty</h3>
      <p>
        {isProtectedZone 
          ? 'No files have been added through the respective admin pages yet.'
          : 'Upload files or create folders to get started.'
        }
      </p>
    </div>
  );

  // Render context menu
  const renderContextMenu = () => {
    if (!contextMenu) return null;
    
    const { x, y, item } = contextMenu;
    
    return (
      <div 
        className="context-menu" 
        style={{ left: x, top: y }}
        onClick={(e) => e.stopPropagation()}
      >
        {item.isFolder ? (
          <div 
            className="context-menu-item"
            onClick={() => { handleItemDoubleClick(item); setContextMenu(null); }}
          >
            <i className="fa-solid fa-folder-open"></i>
            Open
          </div>
        ) : (
          <>
            <div 
              className="context-menu-item"
              onClick={() => { handlePreviewFile(item); setContextMenu(null); }}
            >
              <i className="fa-solid fa-eye"></i>
              Preview
            </div>
            <div 
              className="context-menu-item"
              onClick={() => { handleDownloadFile(item); setContextMenu(null); }}
            >
              <i className="fa-solid fa-download"></i>
              Download
            </div>
          </>
        )}
        
        {!isProtectedZone && canManageFiles && !item.isFolder && item.id !== 'website-data' && (
          <>
            <div className="context-menu-divider"></div>
            <div 
              className="context-menu-item"
              onClick={() => {
                setRenameValue(item.name);
                setModal({ type: 'rename', data: item });
                setContextMenu(null);
              }}
            >
              <i className="fa-solid fa-pen"></i>
              Rename
            </div>
            <div 
              className="context-menu-item danger"
              onClick={() => { handleDeleteItems([item]); setContextMenu(null); }}
            >
              <i className="fa-solid fa-trash"></i>
              Delete
            </div>
          </>
        )}
        {/* Prevent delete for Website Data virtual folder */}
        {!isProtectedZone && canManageFiles && item.id === 'website-data' && (
          <>
            <div className="context-menu-divider"></div>
            <div className="context-menu-item disabled">
              <i className="fa-solid fa-lock"></i>
              Cannot delete Website Data
            </div>
          </>
        )}
        
        {isProtectedZone && (
          <>
            <div className="context-menu-divider"></div>
            <div className="context-menu-item disabled">
              <i className="fa-solid fa-lock"></i>
              Protected (Read-Only)
            </div>
          </>
        )}
      </div>
    );
  };

  // Render modals
  const renderModals = () => {
    if (!modal) return null;
    
    switch (modal.type) {
      case 'newFolder':
        return (
          <div className="files-modal-overlay" onClick={() => setModal(null)}>
            <div className="files-modal" onClick={(e) => e.stopPropagation()}>
              <div className="files-modal-header">
                <h3 className="files-modal-title">Create New Folder</h3>
                <button className="files-modal-close" onClick={() => setModal(null)}>
                  <i className="fa-solid fa-xmark"></i>
                </button>
              </div>
              <div className="files-modal-body">
                <div className="form-group">
                  <label className="form-label">Folder Name</label>
                  <input
                    type="text"
                    className="form-input"
                    value={newFolderName}
                    onChange={(e) => setNewFolderName(e.target.value)}
                    placeholder="Enter folder name"
                    autoFocus
                    onKeyDown={(e) => e.key === 'Enter' && handleCreateFolder()}
                  />
                </div>
              </div>
              <div className="files-modal-actions">
                <button className="btn btn-secondary" onClick={() => setModal(null)}>
                  Cancel
                </button>
                <button 
                  className="btn btn-primary" 
                  onClick={handleCreateFolder}
                  disabled={!newFolderName.trim()}
                >
                  Create Folder
                </button>
              </div>
            </div>
          </div>
        );
      
      case 'rename':
        return (
          <div className="files-modal-overlay" onClick={() => setModal(null)}>
            <div className="files-modal" onClick={(e) => e.stopPropagation()}>
              <div className="files-modal-header">
                <h3 className="files-modal-title">Rename File</h3>
                <button className="files-modal-close" onClick={() => setModal(null)}>
                  <i className="fa-solid fa-xmark"></i>
                </button>
              </div>
              <div className="files-modal-body">
                <div className="form-group">
                  <label className="form-label">New Name</label>
                  <input
                    type="text"
                    className="form-input"
                    value={renameValue}
                    onChange={(e) => setRenameValue(e.target.value)}
                    placeholder="Enter new name"
                    autoFocus
                    onKeyDown={(e) => e.key === 'Enter' && handleRenameItem()}
                  />
                </div>
              </div>
              <div className="files-modal-actions">
                <button className="btn btn-secondary" onClick={() => setModal(null)}>
                  Cancel
                </button>
                <button 
                  className="btn btn-primary" 
                  onClick={handleRenameItem}
                  disabled={!renameValue.trim()}
                >
                  Rename
                </button>
              </div>
            </div>
          </div>
        );
      
      case 'upload':
        return (
          <div className="files-modal-overlay" onClick={() => !uploading && setModal(null)}>
            <div className="files-modal" onClick={(e) => e.stopPropagation()}>
              <div className="files-modal-header">
                <h3 className="files-modal-title">Upload Files</h3>
                <button 
                  className="files-modal-close" 
                  onClick={() => setModal(null)}
                  disabled={uploading}
                >
                  <i className="fa-solid fa-xmark"></i>
                </button>
              </div>
              <div className="files-modal-body">
                <div 
                  className="upload-area"
                  ref={dropZoneRef}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={(e) => {
                    e.preventDefault();
                    e.currentTarget.classList.remove('drag-over');
                    const files = Array.from(e.dataTransfer.files);
                    handleUploadFiles(files);
                  }}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <i className="fa-solid fa-cloud-arrow-up"></i>
                  <h4>Drag & drop files here</h4>
                  <p>or click to browse</p>
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    style={{ display: 'none' }}
                    onChange={(e) => {
                      const files = Array.from(e.target.files || []);
                      handleUploadFiles(files);
                      e.target.value = '';
                    }}
                  />
                </div>
                
                {uploadProgress.length > 0 && (
                  <div className="upload-progress">
                    {uploadProgress.map((item, index) => (
                      <div key={index} className="upload-progress-item">
                        <i className="fa-solid fa-file"></i>
                        <span className="file-name">{item.name}</span>
                        <div className="upload-progress-bar">
                          <div 
                            className="upload-progress-fill" 
                            style={{ width: `${item.progress}%` }}
                          ></div>
                        </div>
                        <span className={`upload-status ${item.status}`}>
                          {item.status === 'uploading' ? 'Uploading...' : 
                           item.status === 'success' ? '✓' : '✗'}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              {!uploading && (
                <div className="files-modal-actions">
                  <button className="btn btn-secondary" onClick={() => setModal(null)}>
                    Close
                  </button>
                </div>
              )}
            </div>
          </div>
        );
      
      case 'preview':
        const previewData = modal.data;
        const isImage = previewData.fileType === 'image';
        const isVideo = previewData.fileType === 'video';
        const isAudio = previewData.fileType === 'audio';
        const isPdf = previewData.fileType === 'pdf';
        
        return (
          <div className="files-modal-overlay" onClick={() => setModal(null)}>
            <div className="files-modal preview-modal" onClick={(e) => e.stopPropagation()}>
              <div className="files-modal-header">
                <h3 className="files-modal-title">{previewData.name}</h3>
                <button className="files-modal-close" onClick={() => setModal(null)}>
                  <i className="fa-solid fa-xmark"></i>
                </button>
              </div>
              <div className="files-modal-body">
                <div className="preview-content">
                  {isImage && <img src={previewData.url} alt={previewData.name} />}
                  {isVideo && <video src={previewData.url} controls />}
                  {isAudio && <audio src={previewData.url} controls />}
                  {isPdf && (
                    <iframe 
                      src={previewData.url} 
                      title={previewData.name}
                      style={{ width: '100%', height: '60vh', border: 'none' }}
                    />
                  )}
                  {!isImage && !isVideo && !isAudio && !isPdf && (
                    <div style={{ textAlign: 'center', padding: '2rem' }}>
                      <i className={`fa-solid ${previewData.icon}`} style={{ fontSize: '4rem', marginBottom: '1rem' }}></i>
                      <p>Preview not available for this file type</p>
                    </div>
                  )}
                </div>
                <div className="preview-info">
                  <div className="preview-info-row">
                    <span className="preview-info-label">Size</span>
                    <span className="preview-info-value">{formatFileSize(previewData.size)}</span>
                  </div>
                  <div className="preview-info-row">
                    <span className="preview-info-label">Type</span>
                    <span className="preview-info-value">{previewData.mimeType || 'Unknown'}</span>
                  </div>
                  <div className="preview-info-row">
                    <span className="preview-info-label">Modified</span>
                    <span className="preview-info-value">{formatDate(previewData.lastModified)}</span>
                  </div>
                </div>
              </div>
              <div className="files-modal-actions">
                <button className="btn btn-secondary" onClick={() => setModal(null)}>
                  Close
                </button>
                <button 
                  className="btn btn-primary" 
                  onClick={() => handleDownloadFile(previewData)}
                >
                  <i className="fa-solid fa-download"></i>
                  Download
                </button>
              </div>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="files-manager">
      <div className="files-header">
        <h1 className="files-title">File Manager</h1>
      </div>
      
      {renderBreadcrumb()}
      {renderToolbar()}
      
      <div 
        className="files-content"
        onDragOver={!isProtectedZone ? handleDragOver : undefined}
        onDragLeave={!isProtectedZone ? handleDragLeave : undefined}
        onDrop={!isProtectedZone ? handleDrop : undefined}
      >
        {renderProtectedAlert()}
        
        {loading ? (
          <div className="loading-state">
            <div className="loading-spinner"></div>
            <span>Loading files...</span>
          </div>
        ) : filteredItems.length === 0 ? (
          renderEmptyState()
        ) : viewMode === 'grid' ? (
          renderGridView()
        ) : (
          renderListView()
        )}
      </div>
      
      {renderContextMenu()}
      {renderModals()}
    </div>
  );
};

export default FilesManager;
