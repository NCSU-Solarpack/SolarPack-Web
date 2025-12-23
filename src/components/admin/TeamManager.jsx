import { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import { authService } from '../../utils/auth';
import { supabaseService } from '../../utils/supabase';
import { useSupabaseSyncStatus } from '../../hooks/useSupabaseSyncStatus';
import SyncStatusBadge from '../SyncStatusBadge';
import { useAlert } from '../../contexts/AlertContext';

const TeamManager = forwardRef((props, ref) => {
  const [teamData, setTeamData] = useState({ teamMembers: [], lastUpdated: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [editingMember, setEditingMember] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [draggedItem, setDraggedItem] = useState(null);
  const [dragOverItem, setDragOverItem] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [availableUsers, setAvailableUsers] = useState([]);

  // Role options for team leads
  const ROLE_OPTIONS = [
    'Project Director',
    'Technical Director',
    'Aerodynamics',
    'High Voltage',
    'System Architecture',
    'Structures',
    'Vehicle Dynamics',
    'Low Voltage',
    'Business'
  ];

  // Custom alert hook from context
  const { showError, showConfirm } = useAlert();

  // Real-time sync status
  const { status, lastSync, connectionError, startSaving, finishSaving, acknowledgeNewData, setDisplayedData, forceReconnect } = useSupabaseSyncStatus(
    () => supabaseService.getTeamMembers(),
    2000 // Check every 2 seconds
  );

  // Handle refresh data - including force reconnect on error
  const handleRefreshData = async () => {
    if (status === 'error') {
      await forceReconnect();
    }
    await acknowledgeNewData();
    await loadTeamData();
  };

  // Expose methods to parent component
  useImperativeHandle(ref, () => ({
    handleAddMember: () => {
      setEditingMember({
        id: Date.now(),
        name: '',
        role: '',
        image: '',
        bio: '',
        email: '',
        linkedin: '',
        order: teamData.teamMembers.length + 1
      });
      setImageFile(null);
      setImagePreview(null);
      setIsEditing(true);
    }
  }));

  useEffect(() => {
    loadTeamData();
    loadAvailableUsers();
  }, []);

  // Handle visibility change to refresh data when tab becomes visible
  useEffect(() => {
    const handleVisibilityChange = async () => {
      if (!document.hidden && !isLoading) {
        console.log('📱 Tab visible - refreshing team data');
        await new Promise(resolve => setTimeout(resolve, 300));
        loadTeamData();
      }
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [isLoading]);

  const loadTeamData = async () => {
    console.log('Loading team data from Supabase...');
    setIsLoading(true);
    try {
      const data = await supabaseService.getTeamMembers();
      console.log('Loaded team data:', data);
      
      if (!data || !data.teamMembers) {
        console.error('Invalid data structure received:', data);
        throw new Error('Invalid team data structure');
      }
      
      console.log(`✓ Successfully loaded ${data.teamMembers.length} team members from Supabase`);
      setTeamData(data);
      // Tell the sync hook what data we're displaying
      setDisplayedData(data);
    } catch (error) {
      console.error('Error loading team data:', error);
      await showError(`Failed to load team data: ${error.message}`, 'Load Error');
      setTeamData({ teamMembers: [], lastUpdated: '' });
    } finally {
      setIsLoading(false);
    }
  };

  const loadAvailableUsers = async () => {
    try {
      const users = await supabaseService.getUsersForTeamAssignment();
      setAvailableUsers(users);
      console.log(`✓ Loaded ${users.length} users for team assignment`);
    } catch (error) {
      console.error('Error loading users:', error);
      await showError(`Failed to load users: ${error.message}`, 'Load Error');
    }
  };

  const handleEditMember = (member) => {
    setEditingMember({ ...member });
    setImageFile(null);
    setImagePreview(member.image || null);
    setIsEditing(true);
  };

  const handleAddMember = () => {
    setEditingMember({
      id: Date.now(),
      name: '',
      role: '',
      image: '',
      bio: '',
      email: '',
      linkedin: '',
      order: teamData.teamMembers.length + 1
    });
    setImageFile(null);
    setImagePreview(null);
    setIsEditing(true);
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
    setEditingMember({...editingMember, image: ''});
  };

  const handleSaveMember = async () => {
    // Validate required fields
    if (!editingMember.name || !editingMember.role) {
      await showError('Please fill in the Name and Role fields.', 'Missing Required Fields');
      return;
    }

    if (!editingMember.bio || editingMember.bio.trim() === '') {
      await showError('Please add a bio for this team member.', 'Bio Required');
      return;
    }

    // Check if image is provided (either existing or newly uploaded)
    if (!imagePreview && !editingMember.image) {
      await showError('Please upload a profile image for this team member.', 'Image Required');
      return;
    }

    setIsEditing(false);
    const memberToSave = { ...editingMember };
    setEditingMember(null);
    
    startSaving(); // Update status to 'saving'

    try {
      // Upload image if a new file was selected
      if (imageFile) {
        setIsUploadingImage(true);
        try {
          const imageUrl = await supabaseService.uploadTeamMemberImage(imageFile, memberToSave.id);
          memberToSave.image = imageUrl;
          console.log('✓ Image uploaded successfully:', imageUrl);
        } catch (error) {
          console.error('Error uploading image:', error);
          await showError(`Failed to upload image: ${error.message}`, 'Upload Error');
          throw error; // Stop the save process if image upload fails
        } finally {
          setIsUploadingImage(false);
        }
      }
      
      // If this team member is assigned to a user, ensure we update that user's specific_role
      if (memberToSave.user_id) {
        try {
          await supabaseService.updateUserSpecificRole(memberToSave.user_id, memberToSave.role || null);
          console.log('✓ Updated assigned user specific_role');
        } catch (err) {
          console.error('Error updating user specific_role:', err);
          await showError(`Failed to update assigned user's role: ${err.message}`, 'User Role Update Error');
          // continue to save the team member even if user role update failed
        }
      }

      // Save to Supabase
      await supabaseService.saveTeamMember(memberToSave);
      
      // Reload data from Supabase
      await loadTeamData();
      
      // Reset image states
      setImageFile(null);
      setImagePreview(null);
      
      console.log('✓ Team member saved successfully');
    } catch (error) {
      console.error('Error saving team member:', error);
      await showError(`Failed to save: ${error.message}`, 'Save Error');
    } finally {
      finishSaving(); // Update status back to 'synced'
    }
  };

  const handleDeleteMember = async (memberId) => {
    const confirmed = await showConfirm(
      'This action cannot be undone. The team member and their associated image will be permanently deleted.',
      'Delete Team Member?',
      'Delete',
      'Cancel'
    );
    
    if (!confirmed) {
      return;
    }

    startSaving(); // Update status to 'saving'
    
    try {
      // Delete from Supabase
      await supabaseService.deleteTeamMember(memberId);
      
      // Reload data from Supabase
      await loadTeamData();
      
      console.log('✓ Team member deleted successfully');
    } catch (error) {
      console.error('Error deleting team member:', error);
      await showError(`Failed to delete: ${error.message}`, 'Delete Error');
    } finally {
      finishSaving(); // Update status back to 'synced'
    }
  };

  // Drag and drop handlers
  const handleDragStart = (e, member) => {
    setDraggedItem(member);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e, member) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    
    if (draggedItem && member.id !== draggedItem.id) {
      setDragOverItem(member);
    }
  };

  const handleDragLeave = (e) => {
    // Only clear if we're leaving the card entirely
    if (e.currentTarget === e.target) {
      setDragOverItem(null);
    }
  };

  const handleDrop = async (e, targetMember) => {
    e.preventDefault();
    
    if (!draggedItem || draggedItem.id === targetMember.id) {
      setDraggedItem(null);
      setDragOverItem(null);
      return;
    }

    startSaving();

    try {
      // Create a new array with updated order
      const members = [...teamData.teamMembers];
      const draggedIndex = members.findIndex(m => m.id === draggedItem.id);
      const targetIndex = members.findIndex(m => m.id === targetMember.id);

      // Remove dragged item and insert at target position
      const [removed] = members.splice(draggedIndex, 1);
      members.splice(targetIndex, 0, removed);

      // Update order values for all members
      const updatedMembers = members.map((member, index) => ({
        ...member,
        order: index + 1
      }));

      // Save all updated members
      for (const member of updatedMembers) {
        await supabaseService.saveTeamMember(member);
      }

      // Reload data
      await loadTeamData();
      
      console.log('✓ Team order updated successfully');
    } catch (error) {
      console.error('Error updating team order:', error);
      await showError(`Failed to update order: ${error.message}`, 'Reorder Error');
    } finally {
      setDraggedItem(null);
      setDragOverItem(null);
      finishSaving();
    }
  };

  const handleDragEnd = () => {
    setDraggedItem(null);
    setDragOverItem(null);
  };

  const canEdit = authService.hasPermission('edit_team');

  if (isLoading) {
    return <div className="loading">Loading team data...</div>;
  }

  return (
    <div className="team-manager">
      <style>{`
        .team-manager-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
        }

        .team-manager-title {
          font-family: "Bebas Neue", sans-serif;
          font-size: 2rem;
          color: var(--text);
          margin: 0;
        }

        .header-buttons {
          display: flex;
          gap: 1rem;
          align-items: center;
        }

        .add-member-btn {
          background: var(--accent);
          color: white;
          border: none;
          padding: 0.75rem 1.5rem;
          border-radius: 6px;
          cursor: pointer;
          font-size: 0.9rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          transition: background 0.3s ease;
        }

        .add-member-btn:hover {
          background: #c71821;
          transform: translateY(-1px);
        }

        .no-data-message {
          text-align: center;
          padding: 4rem 2rem;
          background: var(--surface);
          border-radius: var(--radius);
          border: 2px dashed rgba(255, 255, 255, 0.2);
          color: var(--text);
        }

        .team-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 1.5rem;
          margin-bottom: 2rem;
        }

        .member-card {
          background: linear-gradient(180deg, rgba(0,0,0,0.1), var(--surface));
          border: 1px solid rgba(255,255,255,0.03);
          border-radius: var(--radius);
          padding: 1.5rem;
          box-shadow: 0 6px 18px rgba(0,0,0,0.45);
          transition: transform 0.3s ease, opacity 0.3s ease;
          position: relative;
          display: flex;
          flex-direction: column;
          min-height: 250px;
        }

        .member-card:hover {
          transform: translateY(-2px);
        }

        .member-card.dragging {
          opacity: 0.5;
          transform: scale(0.95);
        }

        .member-card.drag-over {
          border: 2px solid var(--accent);
          transform: translateY(-2px);
        }

        .drag-handle {
          position: absolute;
          top: 0.75rem;
          right: 0.75rem;
          cursor: grab;
          padding: 0.25rem;
          color: var(--subtxt);
          transition: color 0.3s ease;
          width: 24px;
          height: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .drag-handle:hover {
          color: var(--accent);
        }

        .drag-handle:active {
          cursor: grabbing;
        }

        .drag-handle svg {
          width: 20px;
          height: 20px;
        }

        .member-header {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1rem;
        }

        .member-avatar {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: #333;
          object-fit: cover;
        }

        .member-info h3 {
          color: var(--accent);
          margin: 0 0 0.25rem 0;
          font-size: 1.1rem;
        }

        .member-role {
          color: var(--subtxt);
          font-size: 0.9rem;
          margin: 0;
        }

        .member-bio {
          color: var(--text);
          font-size: 0.9rem;
          line-height: 1.4;
          margin-bottom: 1rem;
          flex-grow: 1;
        }

        .member-actions {
          display: flex;
          gap: 0.5rem;
          justify-content: flex-end;
          margin-top: auto;
        }

        .action-btn {
          padding: 0.5rem;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
        }

        .action-btn svg {
          width: 18px;
          height: 18px;
        }

        .edit-btn {
          background: var(--accent);
          color: white;
        }

        .edit-btn:hover {
          background: #c71821;
          transform: translateY(-2px);
        }

        .delete-btn {
          background: #dc2626;
          color: white;
        }

        .delete-btn:hover {
          background: #b91c1c;
          transform: translateY(-2px);
        }

        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.8);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
        }

        .modal-content {
          background: var(--surface);
          padding: 2rem;
          border-radius: var(--radius);
          max-width: 500px;
          width: 90%;
          max-height: 80vh;
          overflow-y: auto;
        }

        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
        }

        .modal-title {
          font-family: "Bebas Neue", sans-serif;
          font-size: 1.5rem;
          color: var(--text);
          margin: 0;
        }

        .close-btn {
          background: none;
          border: none;
          color: var(--subtxt);
          cursor: pointer;
          font-size: 1.5rem;
        }

        .form-group {
          margin-bottom: 1rem;
        }

        .form-label {
          display: block;
          color: var(--text);
          margin-bottom: 0.5rem;
          font-weight: 500;
        }

        .form-input, .form-textarea {
          width: 100%;
          padding: 0.75rem;
          border: 2px solid #333;
          border-radius: 6px;
          background: #1a1a1a;
          color: var(--text);
          font-size: 0.9rem;
          font-family: inherit;
          resize: vertical;
        }

        .form-input:focus, .form-textarea:focus {
          outline: none;
          border-color: var(--accent);
        }

        .form-textarea {
          min-height: 100px;
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

        .modal-actions {
          display: flex;
          gap: 1rem;
          justify-content: flex-end;
          margin-top: 2rem;
        }

        .save-btn {
          background: var(--accent);
          color: white;
          border: none;
          padding: 0.75rem 1.5rem;
          border-radius: 6px;
          cursor: pointer;
          font-size: 0.9rem;
          font-weight: 500;
          transition: all 0.3s ease;
        }

        .save-btn:hover {
          background: #c71821;
          transform: translateY(-1px);
        }

        .cancel-btn {
          background: transparent;
          color: var(--text);
          border: 1px solid var(--subtxt);
          padding: 0.75rem 1.5rem;
          border-radius: 6px;
          cursor: pointer;
          font-size: 0.9rem;
          font-weight: 500;
          transition: all 0.3s ease;
        }

        .cancel-btn:hover {
          background: var(--surface);
          border-color: var(--text);
        }

        .loading {
          text-align: center;
          color: var(--subtxt);
          padding: 2rem;
        }

        .no-permission {
          text-align: center;
          color: var(--subtxt);
          padding: 2rem;
        }
      `}</style>

      <div className="team-manager-header">
        <h2 className="team-manager-title">Team Management</h2>
        <div className="header-buttons">
          <SyncStatusBadge 
            status={status} 
            lastSync={lastSync}
            onRefresh={handleRefreshData}
            connectionError={connectionError}
          />
          {canEdit && (
            <button className="add-member-btn" onClick={handleAddMember}>
              <span>+</span>
              Add Member
            </button>
          )}
        </div>
      </div>

      {teamData.teamMembers.length === 0 ? (
        <div className="no-data-message">
          <p style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>No team members found</p>
          <p style={{ color: 'var(--subtxt)', marginBottom: '1rem' }}>
            The team data file is empty or couldn't be loaded.
          </p>
          {canEdit && (
            <button onClick={handleAddMember} className="add-member-btn">
              Add Your First Team Member
            </button>
          )}
        </div>
      ) : (
        <div className="team-grid">
          {teamData.teamMembers
            .sort((a, b) => (a.order || 0) - (b.order || 0))
            .map(member => (
            <div 
              key={member.id} 
              className={`member-card ${draggedItem?.id === member.id ? 'dragging' : ''} ${dragOverItem?.id === member.id ? 'drag-over' : ''}`}
              draggable={canEdit}
              onDragStart={(e) => handleDragStart(e, member)}
              onDragOver={(e) => handleDragOver(e, member)}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, member)}
              onDragEnd={handleDragEnd}
            >
              {canEdit && (
                <div className="drag-handle" title="Drag to reorder">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="3" y1="12" x2="21" y2="12"></line>
                    <line x1="3" y1="6" x2="21" y2="6"></line>
                    <line x1="3" y1="18" x2="21" y2="18"></line>
                  </svg>
                </div>
              )}
              <div className="member-header">
                <img 
                  src={member.image || '/images/headshots/default.jpg'} 
                  alt={member.name}
                  className="member-avatar"
                  onError={(e) => e.target.src = '/images/headshots/default.jpg'}
                />
                <div className="member-info">
                  <h3>{member.name}</h3>
                  <p className="member-role">{member.role}</p>
                </div>
              </div>
              <p className="member-bio">
                {member.bio && member.bio.length > 150 ? member.bio.substring(0, 150) + '...' : member.bio}
              </p>
              {canEdit && (
                <div className="member-actions">
                  <button className="action-btn edit-btn" onClick={() => handleEditMember(member)} title="Edit member">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                    </svg>
                  </button>
                  <button className="action-btn delete-btn" onClick={() => handleDeleteMember(member.id)} title="Delete member">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="3 6 5 6 21 6"></polyline>
                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                      <line x1="10" y1="11" x2="10" y2="17"></line>
                      <line x1="14" y1="11" x2="14" y2="17"></line>
                    </svg>
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {isEditing && editingMember && (
        <div className="modal-overlay" onClick={() => setIsEditing(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">
                {editingMember.id && teamData.teamMembers.find(m => m.id === editingMember.id) ? 'Edit' : 'Add'} Team Member
              </h3>
              <button className="close-btn" onClick={() => setIsEditing(false)}>×</button>
            </div>

            <div className="form-group">
              <label className="form-label">Name *</label>
              <input
                type="text"
                className="form-input"
                value={editingMember.name}
                onChange={(e) => setEditingMember({...editingMember, name: e.target.value})}
                placeholder="Full name"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Role *</label>
              <select
                className="form-input"
                value={editingMember.role || ''}
                onChange={(e) => setEditingMember({...editingMember, role: e.target.value})}
              >
                <option value="">-- Select Role --</option>
                {ROLE_OPTIONS.map(role => (
                  <option key={role} value={role}>{role}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Profile Image *</label>
              <div 
                className={`image-upload-area ${imagePreview ? 'has-image' : ''}`}
                onDrop={handleImageDrop}
                onDragOver={handleImageDragOver}
                onClick={() => document.getElementById('image-file-input').click()}
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
                  id="image-file-input"
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
              <label className="form-label">Bio *</label>
              <textarea
                className="form-textarea"
                value={editingMember.bio}
                onChange={(e) => setEditingMember({...editingMember, bio: e.target.value})}
                placeholder="Brief description of role and background..."
              />
            </div>

            <div className="form-group">
              <label className="form-label">Assign to User Account (Optional)</label>
              <select
                className="form-input"
                value={editingMember.user_id || ''}
                onChange={(e) => {
                  const userId = e.target.value || null;
                  const selectedUser = availableUsers.find(u => u.user_id === userId);
                  setEditingMember({
                    ...editingMember,
                    user_id: userId || null,
                    role: selectedUser?.specific_role || editingMember.role
                  });
                }}
              >
                <option value="">-- None (No user assigned) --</option>
                {availableUsers.map(user => (
                  <option key={user.user_id} value={user.user_id}>
                    {user.email} - {user.level.toUpperCase()}{user.specific_role ? ` (${user.specific_role})` : ''}
                  </option>
                ))}
              </select>
              <p style={{ color: 'var(--subtxt)', fontSize: '0.8rem', marginTop: '0.5rem' }}>
                Link this team member to a user account with Director or Leader permissions
              </p>
            </div>

            <div className="modal-actions">
              <button className="cancel-btn" onClick={() => setIsEditing(false)}>
                Cancel
              </button>
              <button className="save-btn" onClick={handleSaveMember}>
                Save Member
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
});

TeamManager.displayName = 'TeamManager';

export default TeamManager;
