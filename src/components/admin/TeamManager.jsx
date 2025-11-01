import { useState, useEffect } from 'react';
import { authService } from '../../utils/auth';
import { githubService } from '../../utils/github';
import { loadDataWithCacheBust, refreshDataAfterSave } from '../../utils/dataLoader';

const TeamManager = () => {
  const [teamData, setTeamData] = useState({ teamMembers: [], lastUpdated: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [editingMember, setEditingMember] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadTeamData();
  }, []);

  const loadTeamData = async (bustCache = false) => {
    try {
      const data = await loadDataWithCacheBust('/data/team.json', bustCache);
      setTeamData(data);
    } catch (error) {
      console.error('Error loading team data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditMember = (member) => {
    setEditingMember({ ...member });
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
    setIsEditing(true);
  };

  const handleSaveMember = () => {
    if (!editingMember.name || !editingMember.role) {
      alert('Please fill in required fields (Name and Role)');
      return;
    }

    const updatedMembers = [...teamData.teamMembers];
    const existingIndex = updatedMembers.findIndex(m => m.id === editingMember.id);
    
    if (existingIndex >= 0) {
      updatedMembers[existingIndex] = editingMember;
    } else {
      updatedMembers.push(editingMember);
    }

    // Sort by order
    updatedMembers.sort((a, b) => a.order - b.order);

    const updatedData = {
      ...teamData,
      teamMembers: updatedMembers,
      lastUpdated: new Date().toISOString()
    };

    setTeamData(updatedData);
    setIsEditing(false);
    setEditingMember(null);

    // Here you would save to GitHub API (we'll implement this next)
    saveToGitHub(updatedData);
  };

  const handleDeleteMember = (memberId) => {
    if (confirm('Are you sure you want to delete this team member?')) {
      const updatedMembers = teamData.teamMembers.filter(m => m.id !== memberId);
      const updatedData = {
        ...teamData,
        teamMembers: updatedMembers,
        lastUpdated: new Date().toISOString()
      };

      setTeamData(updatedData);
      saveToGitHub(updatedData);
    }
  };

  const saveToGitHub = async (data) => {
    if (!githubService.hasToken()) {
      console.warn('No GitHub token available. Changes saved locally only.');
      alert('No GitHub token available. Changes are saved locally but not synced to GitHub. Please configure your GitHub token in Settings.');
      return;
    }

    try {
      console.log('Attempting to save team data to GitHub...');
      await githubService.saveTeamData(data);
      console.log('Team data saved to GitHub successfully');
      
      // Optional: trigger a rebuild
      await githubService.triggerRebuild();
      
      // Show success message
      alert('Team data saved to GitHub successfully!');
      
      // Automatically refresh the data from the server to get the latest version
      refreshDataAfterSave(loadTeamData);
      
    } catch (error) {
      console.error('Error saving to GitHub:', error);
      
      // More specific error message based on the error
      let errorMessage = 'Failed to save changes to GitHub. ';
      if (error.message.includes('401')) {
        errorMessage += 'Authentication failed - please check your GitHub token permissions.';
      } else if (error.message.includes('403')) {
        errorMessage += 'Permission denied - your token may not have write access to this repository.';
      } else if (error.message.includes('404')) {
        errorMessage += 'Repository or file not found - please check your repository configuration.';
      } else if (error.message.includes('422')) {
        errorMessage += 'Invalid request - the file may have been modified by someone else. Please refresh and try again.';
      } else {
        errorMessage += `Error: ${error.message}`;
      }
      
      alert(errorMessage);
    }
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
        }

        .add-member-btn, .refresh-btn {
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

        .refresh-btn {
          background: #007acc;
        }

        .refresh-btn:hover {
          background: #005fa3;
          transform: translateY(-1px);
        }

        .add-member-btn:hover {
          background: #c71821;
          transform: translateY(-1px);
        }

        .team-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 1.5rem;
          margin-bottom: 2rem;
        }

        .member-card {
          background: var(--surface);
          border-radius: var(--radius);
          padding: 1.5rem;
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
          transition: transform 0.3s ease;
        }

        .member-card:hover {
          transform: translateY(-2px);
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
        }

        .member-actions {
          display: flex;
          gap: 0.5rem;
        }

        .action-btn {
          padding: 0.5rem 1rem;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-size: 0.8rem;
          transition: all 0.3s ease;
        }

        .edit-btn {
          background: var(--accent);
          color: white;
        }

        .edit-btn:hover {
          background: #c71821;
          transform: translateY(-1px);
        }

        .delete-btn {
          background: #dc2626;
          color: white;
        }

        .delete-btn:hover {
          background: #b91c1c;
          transform: translateY(-1px);
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
          <button className="refresh-btn" onClick={() => loadTeamData(true)} title="Refresh data from server">
            🔄 Refresh
          </button>
          {canEdit && (
            <button className="add-member-btn" onClick={handleAddMember}>
              <span>+</span>
              Add Member
            </button>
          )}
        </div>
      </div>

      {!canEdit && (
        <div className="no-permission">
          You don't have permission to edit team members. Contact a director for access.
        </div>
      )}

      <div className="team-grid">
        {teamData.teamMembers.map(member => (
          <div key={member.id} className="member-card">
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
              {member.bio.length > 150 ? member.bio.substring(0, 150) + '...' : member.bio}
            </p>
            {canEdit && (
              <div className="member-actions">
                <button className="action-btn edit-btn" onClick={() => handleEditMember(member)}>
                  Edit
                </button>
                <button className="action-btn delete-btn" onClick={() => handleDeleteMember(member.id)}>
                  Delete
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

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
              <input
                type="text"
                className="form-input"
                value={editingMember.role}
                onChange={(e) => setEditingMember({...editingMember, role: e.target.value})}
                placeholder="e.g., Technical Director"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Image URL</label>
              <input
                type="text"
                className="form-input"
                value={editingMember.image}
                onChange={(e) => setEditingMember({...editingMember, image: e.target.value})}
                placeholder="/images/headshots/name.jpg"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Bio</label>
              <textarea
                className="form-textarea"
                value={editingMember.bio}
                onChange={(e) => setEditingMember({...editingMember, bio: e.target.value})}
                placeholder="Brief description of role and background..."
              />
            </div>

            <div className="form-group">
              <label className="form-label">Display Order</label>
              <input
                type="number"
                className="form-input"
                value={editingMember.order}
                onChange={(e) => setEditingMember({...editingMember, order: parseInt(e.target.value) || 1})}
                min="1"
              />
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
};

export default TeamManager;