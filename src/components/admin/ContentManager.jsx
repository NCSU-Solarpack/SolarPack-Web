import { useState, useEffect } from 'react';
import { authService } from '../../utils/auth';
// import { githubService } from '../../utils/github'; // Removed - transitioning to Supabase

const ContentManager = () => {
  const [contentData, setContentData] = useState({ announcements: [], events: [], lastUpdated: '' });
  const [activeView, setActiveView] = useState('announcements');
  const [isEditing, setIsEditing] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadContentData();
  }, []);

  const loadContentData = async () => {
    try {
      const response = await fetch('/data/content.json');
      const data = await response.json();
      setContentData(data);
    } catch (error) {
      console.error('Error loading content data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (item, type) => {
    setEditingItem({ ...item, type });
    setIsEditing(true);
  };

  const handleAdd = (type) => {
    if (type === 'announcement') {
      setEditingItem({
        type: 'announcement',
        id: Date.now(),
        title: '',
        content: '',
        author: '',
        date: new Date().toISOString().split('T')[0],
        priority: 'medium',
        teams: ['all'],
        expiryDate: ''
      });
    } else {
      setEditingItem({
        type: 'event',
        id: Date.now(),
        title: '',
        description: '',
        date: '',
        time: '',
        location: '',
        eventType: 'public',
        contact: ''
      });
    }
    setIsEditing(true);
  };

  const handleSave = () => {
    if (!validateItem(editingItem)) return;

    const updatedData = { ...contentData };
    
    if (editingItem.type === 'announcement') {
      const existingIndex = updatedData.announcements.findIndex(a => a.id === editingItem.id);
      const itemData = { ...editingItem };
      delete itemData.type;
      
      if (existingIndex >= 0) {
        updatedData.announcements[existingIndex] = itemData;
      } else {
        updatedData.announcements.push(itemData);
      }
    } else {
      const existingIndex = updatedData.events.findIndex(e => e.id === editingItem.id);
      const itemData = { ...editingItem };
      delete itemData.type;
      
      if (existingIndex >= 0) {
        updatedData.events[existingIndex] = itemData;
      } else {
        updatedData.events.push(itemData);
      }
    }

    updatedData.lastUpdated = new Date().toISOString();
    setContentData(updatedData);
    setIsEditing(false);
    setEditingItem(null);
    
    saveData(updatedData);
  };

  const handleDelete = (id, type) => {
    if (!confirm(`Are you sure you want to delete this ${type}?`)) return;

    const updatedData = { ...contentData };
    
    if (type === 'announcement') {
      updatedData.announcements = updatedData.announcements.filter(a => a.id !== id);
    } else {
      updatedData.events = updatedData.events.filter(e => e.id !== id);
    }

    updatedData.lastUpdated = new Date().toISOString();
    setContentData(updatedData);
    saveData(updatedData);
  };

  const validateItem = (item) => {
    if (item.type === 'announcement') {
      if (!item.title || !item.content || !item.author) {
        alert('Please fill in title, content, and author');
        return false;
      }
    } else {
      if (!item.title || !item.date || !item.location) {
        alert('Please fill in title, date, and location');
        return false;
      }
    }
    return true;
  };

  const saveData = async (data) => {
    try {
      // TODO: Save to Supabase database
      console.log('Saving content data:', data);
      alert('✓ Content data saved locally! (Supabase integration pending)');
    } catch (error) {
      console.error('Error saving content data:', error);
      alert('Failed to save changes: ' + error.message);
    }
  };

  const canEdit = authService.hasPermission('edit_announcements');

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return '#dc3545';
      case 'medium': return '#ffc107';
      case 'low': return '#28a745';
      default: return '#6c757d';
    }
  };

  if (isLoading) {
    return <div className="loading">Loading content data...</div>;
  }

  return (
    <div className="content-manager">
      <style>{`
        .content-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
        }

        .content-title {
          font-family: "Bebas Neue", sans-serif;
          font-size: 2rem;
          color: var(--text);
          margin: 0;
        }

        .view-tabs {
          display: flex;
          gap: 0.5rem;
          margin-bottom: 2rem;
          border-bottom: 1px solid #333;
        }

        .view-tab {
          background: transparent;
          border: none;
          padding: 0.75rem 1.5rem;
          color: var(--subtxt);
          cursor: pointer;
          border-bottom: 2px solid transparent;
          transition: all 0.3s ease;
        }

        .view-tab.active {
          color: var(--accent);
          border-bottom-color: var(--accent);
        }

        .view-tab:hover {
          color: var(--text);
        }

        .add-button {
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
        }

        .add-button:hover {
          background: #c71821;
          transform: translateY(-1px);
        }

        .items-grid {
          display: grid;
          gap: 1.5rem;
        }

        .announcement-card, .event-card {
          background: var(--surface);
          border-radius: var(--radius);
          padding: 1.5rem;
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        }

        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 1rem;
        }

        .card-title {
          color: var(--accent);
          font-size: 1.2rem;
          font-weight: 600;
          margin: 0 0 0.5rem 0;
        }

        .card-meta {
          color: var(--subtxt);
          font-size: 0.9rem;
          margin-bottom: 1rem;
        }

        .priority-badge {
          padding: 0.25rem 0.75rem;
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: 600;
          text-transform: uppercase;
          color: white;
          margin-left: 0.5rem;
        }

        .teams-list {
          display: flex;
          gap: 0.5rem;
          flex-wrap: wrap;
          margin: 0.5rem 0;
        }

        .team-tag {
          background: var(--accent);
          color: white;
          padding: 0.2rem 0.5rem;
          border-radius: 12px;
          font-size: 0.7rem;
          font-weight: 500;
        }

        .event-details {
          background: rgba(0, 123, 255, 0.1);
          padding: 1rem;
          border-radius: 6px;
          margin: 1rem 0;
        }

        .event-detail {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 0.5rem;
          font-size: 0.9rem;
        }

        .event-detail:last-child {
          margin-bottom: 0;
        }

        .card-actions {
          display: flex;
          gap: 0.5rem;
          margin-top: 1rem;
        }

        .action-btn {
          padding: 0.5rem 1rem;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-size: 0.8rem;
          transition: all 0.3s ease;
        }

        .edit-btn { background: var(--accent); color: white; }
        .edit-btn:hover { background: #c71821; transform: translateY(-1px); }
        .delete-btn { background: #dc2626; color: white; }
        .delete-btn:hover { background: #b91c1c; transform: translateY(-1px); }

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
          overflow-y: auto;
        }

        .modal-content {
          background: var(--surface);
          padding: 2rem;
          border-radius: var(--radius);
          max-width: 600px;
          width: 90%;
          max-height: 90vh;
          overflow-y: auto;
          margin: 2rem;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
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

        .form-input, .form-select, .form-textarea {
          width: 100%;
          padding: 0.75rem;
          border: 2px solid #333;
          border-radius: 6px;
          background: #1a1a1a;
          color: var(--text);
          font-size: 0.9rem;
        }

        .form-input:focus, .form-select:focus, .form-textarea:focus {
          outline: none;
          border-color: var(--accent);
        }

        .form-textarea {
          min-height: 120px;
          resize: vertical;
        }

        .checkbox-group {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
          gap: 0.5rem;
          margin-top: 0.5rem;
        }

        .checkbox-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .checkbox-item input[type="checkbox"] {
          width: auto;
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

        .expired-item {
          opacity: 0.6;
          border-left: 4px solid #dc3545;
        }
      `}</style>

      <div className="content-header">
        <h2 className="content-title">Content Management</h2>
      </div>

      <div className="view-tabs">
        <button 
          className={`view-tab ${activeView === 'announcements' ? 'active' : ''}`}
          onClick={() => setActiveView('announcements')}
        >
          📢 Announcements
        </button>
        <button 
          className={`view-tab ${activeView === 'events' ? 'active' : ''}`}
          onClick={() => setActiveView('events')}
        >
          📅 Events
        </button>
      </div>

      {!canEdit && (
        <div className="no-permission">
          You don't have permission to edit content. Contact a director for access.
        </div>
      )}

      {activeView === 'announcements' && (
        <div>
          {canEdit && (
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1rem' }}>
              <button className="add-button" onClick={() => handleAdd('announcement')}>
                <span>+</span>
                Add Announcement
              </button>
            </div>
          )}

          <div className="items-grid">
            {contentData.announcements.map(announcement => {
              const isExpired = announcement.expiryDate && new Date(announcement.expiryDate) < new Date();
              
              return (
                <div key={announcement.id} className={`announcement-card ${isExpired ? 'expired-item' : ''}`}>
                  <div className="card-header">
                    <div>
                      <h3 className="card-title">{announcement.title}</h3>
                      <div className="card-meta">
                        By <strong>{announcement.author}</strong> • {new Date(announcement.date).toLocaleDateString()}
                        <span 
                          className="priority-badge" 
                          style={{ backgroundColor: getPriorityColor(announcement.priority) }}
                        >
                          {announcement.priority}
                        </span>
                        {isExpired && <span style={{ color: '#dc3545', marginLeft: '0.5rem' }}>EXPIRED</span>}
                      </div>
                    </div>
                  </div>

                  <p>{announcement.content}</p>

                  <div className="teams-list">
                    {announcement.teams.map(team => (
                      <span key={team} className="team-tag">{team}</span>
                    ))}
                  </div>

                  {announcement.expiryDate && (
                    <div className="card-meta" style={{ marginTop: '1rem' }}>
                      📅 Expires: {new Date(announcement.expiryDate).toLocaleDateString()}
                    </div>
                  )}

                  {canEdit && (
                    <div className="card-actions">
                      <button className="action-btn edit-btn" onClick={() => handleEdit(announcement, 'announcement')}>
                        Edit
                      </button>
                      <button className="action-btn delete-btn" onClick={() => handleDelete(announcement.id, 'announcement')}>
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {activeView === 'events' && (
        <div>
          {canEdit && (
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1rem' }}>
              <button className="add-button" onClick={() => handleAdd('event')}>
                <span>+</span>
                Add Event
              </button>
            </div>
          )}

          <div className="items-grid">
            {contentData.events.map(event => (
              <div key={event.id} className="event-card">
                <div className="card-header">
                  <div>
                    <h3 className="card-title">{event.title}</h3>
                    <div className="card-meta">
                      {event.eventType} event • Contact: {event.contact}
                    </div>
                  </div>
                </div>

                <p>{event.description}</p>

                <div className="event-details">
                  <div className="event-detail">
                    <span>📅</span>
                    <strong>{new Date(event.date).toLocaleDateString()}</strong>
                  </div>
                  {event.time && (
                    <div className="event-detail">
                      <span>🕐</span>
                      {event.time}
                    </div>
                  )}
                  <div className="event-detail">
                    <span>📍</span>
                    {event.location}
                  </div>
                </div>

                {canEdit && (
                  <div className="card-actions">
                    <button className="action-btn edit-btn" onClick={() => handleEdit(event, 'event')}>
                      Edit
                    </button>
                    <button className="action-btn delete-btn" onClick={() => handleDelete(event.id, 'event')}>
                      Delete
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {isEditing && editingItem && (
        <div className="modal-overlay" onClick={() => setIsEditing(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">
                {editingItem.type === 'announcement' ? 'Announcement' : 'Event'} Details
              </h3>
              <button className="close-btn" onClick={() => setIsEditing(false)}>×</button>
            </div>

            <div className="form-group">
              <label className="form-label">Title *</label>
              <input
                type="text"
                className="form-input"
                value={editingItem.title}
                onChange={(e) => setEditingItem({...editingItem, title: e.target.value})}
              />
            </div>

            {editingItem.type === 'announcement' ? (
              <>
                <div className="form-group">
                  <label className="form-label">Content *</label>
                  <textarea
                    className="form-textarea"
                    value={editingItem.content}
                    onChange={(e) => setEditingItem({...editingItem, content: e.target.value})}
                    placeholder="Announcement content..."
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Author *</label>
                    <input
                      type="text"
                      className="form-input"
                      value={editingItem.author}
                      onChange={(e) => setEditingItem({...editingItem, author: e.target.value})}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Priority</label>
                    <select
                      className="form-select"
                      value={editingItem.priority}
                      onChange={(e) => setEditingItem({...editingItem, priority: e.target.value})}
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Date</label>
                    <input
                      type="date"
                      className="form-input"
                      value={editingItem.date}
                      onChange={(e) => setEditingItem({...editingItem, date: e.target.value})}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Expiry Date</label>
                    <input
                      type="date"
                      className="form-input"
                      value={editingItem.expiryDate}
                      onChange={(e) => setEditingItem({...editingItem, expiryDate: e.target.value})}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Target Teams</label>
                  <div className="checkbox-group">
                    {['all', 'leadership', 'business', 'aerodynamics', 'structures', 'high-voltage', 'low-voltage', 'systems'].map(team => (
                      <div key={team} className="checkbox-item">
                        <input
                          type="checkbox"
                          checked={editingItem.teams.includes(team)}
                          onChange={(e) => {
                            const teams = [...editingItem.teams];
                            if (e.target.checked) {
                              teams.push(team);
                            } else {
                              const index = teams.indexOf(team);
                              if (index > -1) teams.splice(index, 1);
                            }
                            setEditingItem({...editingItem, teams});
                          }}
                        />
                        <label>{team}</label>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="form-group">
                  <label className="form-label">Description</label>
                  <textarea
                    className="form-textarea"
                    value={editingItem.description}
                    onChange={(e) => setEditingItem({...editingItem, description: e.target.value})}
                    placeholder="Event description..."
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Date *</label>
                    <input
                      type="date"
                      className="form-input"
                      value={editingItem.date}
                      onChange={(e) => setEditingItem({...editingItem, date: e.target.value})}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Time</label>
                    <input
                      type="text"
                      className="form-input"
                      value={editingItem.time}
                      onChange={(e) => setEditingItem({...editingItem, time: e.target.value})}
                      placeholder="e.g., 10:00 AM - 4:00 PM"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Location *</label>
                  <input
                    type="text"
                    className="form-input"
                    value={editingItem.location}
                    onChange={(e) => setEditingItem({...editingItem, location: e.target.value})}
                    placeholder="Event location"
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Event Type</label>
                    <select
                      className="form-select"
                      value={editingItem.eventType}
                      onChange={(e) => setEditingItem({...editingItem, eventType: e.target.value})}
                    >
                      <option value="public">Public</option>
                      <option value="members">Members Only</option>
                      <option value="leadership">Leadership</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Contact</label>
                    <input
                      type="text"
                      className="form-input"
                      value={editingItem.contact}
                      onChange={(e) => setEditingItem({...editingItem, contact: e.target.value})}
                      placeholder="Contact person"
                    />
                  </div>
                </div>
              </>
            )}

            <div className="modal-actions">
              <button className="cancel-btn" onClick={() => setIsEditing(false)}>
                Cancel
              </button>
              <button className="save-btn" onClick={handleSave}>
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContentManager;
