import { useState, useEffect } from 'react';
import { authService } from '../../utils/auth';
import { supabaseService } from '../../utils/supabase';
import { useSupabaseSyncStatus } from '../../hooks/useSupabaseSyncStatus';
import SyncStatusBadge from '../SyncStatusBadge';
import { useAlert } from '../../contexts/AlertContext';
import { Plus, Edit2, Trash2, Save, X, GripVertical } from 'lucide-react';

const AlumniManager = () => {
  const [alumniData, setAlumniData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingSemester, setEditingSemester] = useState(null);
  const [newSemester, setNewSemester] = useState({ semester: '', leadership: [] });
  const [showAddSemester, setShowAddSemester] = useState(false);
  const [draggedIndex, setDraggedIndex] = useState(null);
  const [dragOverIndex, setDragOverIndex] = useState(null);

  // Custom alert hook from context
  const { showError, showConfirm } = useAlert();

  // Real-time sync status
  const { status, lastSync, startSaving, finishSaving, acknowledgeNewData, setDisplayedData } = useSupabaseSyncStatus(
    () => supabaseService.getAlumni(),
    2000 // Check every 2 seconds
  );

  useEffect(() => {
    loadAlumniData();
  }, []);

  // Auto-refresh alumni data if new data is detected by sync status
  useEffect(() => {
    // Only auto-refresh if you want instant updates, otherwise rely on manual refresh
    // if (status === 'new-data') {
    //   handleRefreshData();
    // }
  }, [status]);

  // Manual refresh handler for SyncStatusBadge
  const handleRefreshData = async () => {
    await loadAlumniData();
    acknowledgeNewData(); // Reset status to 'synced'
  };

  const loadAlumniData = async () => {
    console.log('Loading alumni data from Supabase...');
    setLoading(true);
    try {
      const data = await supabaseService.getAlumni();
      console.log('Loaded alumni data:', data);
      
      if (!data || !data.alumniData) {
        console.error('Invalid data structure received:', data);
        throw new Error('Invalid alumni data structure');
      }
      
      console.log(`✓ Successfully loaded ${data.alumniData.length} alumni semesters from Supabase`);
      setAlumniData(data.alumniData);
      setDisplayedData(data); // Ensure sync status hook is updated
    } catch (error) {
      console.error('Error loading alumni data:', error);
      await showError(`Failed to load alumni data: ${error.message}`, 'Load Error');
      setAlumniData([]);
    } finally {
      setLoading(false);
    }
  };

  const handleEditSemester = (semester, index) => {
    setEditingSemester({ ...semester });
    setEditingIndex(index);
  };

  const handleSaveSemester = async () => {
    if (!editingSemester.semester.trim()) {
      await showError('Please enter a semester name.', 'Missing Required Field');
      return;
    }

    setEditingIndex(null);
    const semesterToSave = { ...editingSemester };
    setEditingSemester(null);
    
    startSaving(); // Update status to 'saving'

    try {
      // Save to Supabase
      await supabaseService.saveAlumniSemester(semesterToSave);
      // Reload data from Supabase
      await loadAlumniData();
      setDisplayedData({ alumniData }); // Update sync status after save
      console.log('✓ Alumni semester saved successfully');
    } catch (error) {
      console.error('Error saving alumni semester:', error);
      await showError(`Failed to save: ${error.message}`, 'Save Error');
    } finally {
      finishSaving(); // Update status back to 'synced'
    }
  };

  // ===== Drag & Drop for semesters =====
  const handleDragStart = (index) => (e) => {
    if (editingIndex !== null) return; // disable while editing
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragEnter = (index) => (e) => {
    if (editingIndex !== null || draggedIndex === null) return;
    setDragOverIndex(index);
  };

  const handleDragOver = (e) => {
    if (editingIndex !== null || draggedIndex === null) return;
    e.preventDefault();
  };

  const handleDrop = async (e) => {
    if (editingIndex !== null || draggedIndex === null || dragOverIndex === null) return;
    e.preventDefault();

    const reordered = [...alumniData];
    const [moved] = reordered.splice(draggedIndex, 1);
    reordered.splice(dragOverIndex, 0, moved);

    // Re-compute order values so TOP has the LARGEST number
    const total = reordered.length;
    const withOrder = reordered.map((item, idx) => ({ ...item, order: total - idx }));
    setAlumniData(withOrder);

    setDraggedIndex(null);
    setDragOverIndex(null);

    // Persist order to Supabase
    try {
      startSaving();
      const toSave = withOrder.map((s) => ({ id: s.id, order: s.order })).filter(item => typeof item.id === 'number' && !Number.isNaN(item.id));
      await supabaseService.saveAlumniOrder(toSave);
      setDisplayedData({ alumniData: withOrder }); // Update sync status after reorder
    } catch (error) {
      console.error('Failed to save new alumni order:', error);
      await showError(`Failed to save new order: ${error.message}`, 'Save Order Error');
    } finally {
      finishSaving();
    }
  };

  const handleCancelEdit = () => {
    setEditingIndex(null);
    setEditingSemester(null);
  };

  const handleAddSemester = async () => {
    if (!newSemester.semester.trim()) {
      await showError('Please enter a semester name.', 'Missing Required Field');
      return;
    }

    setShowAddSemester(false);
    // Assign order to put new semester at the bottom
    const currentMax = alumniData.length > 0 ? Math.max(...alumniData.map(s => typeof s.order === 'number' ? s.order : 0)) : 0;
    const semesterToSave = { ...newSemester, leadership: newSemester.leadership || [], order: currentMax + 1 };
    setNewSemester({ semester: '', leadership: [] });
    
    startSaving(); // Update status to 'saving'

    try {
      // Save to Supabase
      await supabaseService.saveAlumniSemester(semesterToSave);
      // Reload data from Supabase
      await loadAlumniData();
      setDisplayedData({ alumniData }); // Update sync status after add
      console.log('✓ Alumni semester added successfully');
    } catch (error) {
      console.error('Error adding alumni semester:', error);
      await showError(`Failed to add semester: ${error.message}`, 'Save Error');
    } finally {
      finishSaving(); // Update status back to 'synced'
    }
  };

  const handleDeleteSemester = async (semesterId, semesterName) => {
    const confirmed = await showConfirm(
      `This action cannot be undone. The semester "${semesterName}" and all its leadership data will be permanently deleted.`,
      'Delete Alumni Semester?',
      'Delete',
      'Cancel'
    );
    
    if (!confirmed) {
      return;
    }

    startSaving(); // Update status to 'saving'

    try {
      // Prefer delete by id; fallback by semester name if id is missing
      const idOrString = typeof semesterId === 'number' ? semesterId : (semesterId ?? null);
      await supabaseService.deleteAlumniSemesterSafe({ id: idOrString, semester: semesterName });
      const updated = alumniData.filter(s => s.id !== semesterId);
      setAlumniData(updated);
      await loadAlumniData();
      setDisplayedData({ alumniData: updated }); // Update sync status after delete
      console.log('✓ Alumni semester deleted successfully');
    } catch (error) {
      console.error('Error deleting alumni semester:', error);
      await showError(`Failed to delete: ${error.message}`, 'Delete Error');
    } finally {
      finishSaving(); // Update status back to 'synced'
    }
  };

  const updateEditingSemester = (field, value) => {
    setEditingSemester({ ...editingSemester, [field]: value });
  };

  const addLeadershipToEditing = () => {
    const updatedLeadership = [...(editingSemester.leadership || []), { role: '', name: '' }];
    setEditingSemester({ ...editingSemester, leadership: updatedLeadership });
  };

  const updateLeadershipInEditing = (leadershipIndex, field, value) => {
    const updatedLeadership = [...editingSemester.leadership];
    updatedLeadership[leadershipIndex][field] = value;
    setEditingSemester({ ...editingSemester, leadership: updatedLeadership });
  };

  const deleteLeadershipFromEditing = (leadershipIndex) => {
    const updatedLeadership = editingSemester.leadership.filter((_, i) => i !== leadershipIndex);
    setEditingSemester({ ...editingSemester, leadership: updatedLeadership });
  };

  const addLeadershipToNew = () => {
    const updatedLeadership = [...(newSemester.leadership || []), { role: '', name: '' }];
    setNewSemester({ ...newSemester, leadership: updatedLeadership });
  };

  const updateLeadershipInNew = (leadershipIndex, field, value) => {
    const updatedLeadership = [...newSemester.leadership];
    updatedLeadership[leadershipIndex][field] = value;
    setNewSemester({ ...newSemester, leadership: updatedLeadership });
  };

  const deleteLeadershipFromNew = (leadershipIndex) => {
    const updatedLeadership = newSemester.leadership.filter((_, i) => i !== leadershipIndex);
    setNewSemester({ ...newSemester, leadership: updatedLeadership });
  };

  const canEdit = authService.hasPermission('edit_alumni');

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading alumni data...</p>
      </div>
    );
  }

  return (
    <div className="alumni-manager">
      <style>{`
        .alumni-manager {
          max-width: 1100px;
          margin: 0 auto;
          padding: 0 1rem;
        }

        .alumni-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
        }

        .alumni-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 2rem;
          color: var(--accent);
          margin: 0;
        }

        .action-buttons {
          display: flex;
          gap: 1rem;
        }

        .btn {
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
          transition: all 0.3s ease;
        }

        .btn:hover {
          background: #c71821;
          transform: translateY(-1px);
        }

        .btn:disabled {
          background: #666;
          cursor: not-allowed;
          transform: none;
        }

        .btn-secondary {
          background: #666;
        }

        .btn-secondary:hover {
          background: #777;
        }

        .semester-card {
          background: var(--surface);
          padding: 1.5rem;
          border-radius: var(--radius);
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
          transition: box-shadow .2s ease, transform .1s ease, border-color .2s ease;
        }

        .semester-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
          gap: 0.75rem;
        }

        .semester-title-row {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          min-width: 0; /* allows children to shrink for ellipsis */
          flex: 1;
        }

        .semester-title {
          font-size: 1.5rem;
          font-weight: bold;
          color: var(--text);
          margin: 0;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .semester-actions {
          display: flex;
          gap: 0.5rem;
          padding-left: 0.5rem; /* breathing room between title/input and actions */
        }

        .btn-small {
          padding: 0.5rem;
          font-size: 0.8rem;
          min-width: auto;
        }

        .form-group {
          margin-bottom: 1rem;
        }

        .form-label {
          display: block;
          margin-bottom: 0.5rem;
          color: var(--text);
          font-weight: 500;
        }

        .form-input {
          width: 100%;
          padding: 0.75rem;
          border: 1px solid #333;
          border-radius: 6px;
          background: var(--bg);
          color: var(--text);
          font-size: 0.9rem;
        }

        .form-input:focus {
          outline: none;
          border-color: var(--accent);
          box-shadow: 0 0 0 2px rgba(220, 53, 69, 0.2);
        }

        .leadership-list {
          margin-top: 1rem;
        }

        .leadership-item {
          display: grid;
          grid-template-columns: 1fr 1fr auto;
          gap: 1rem;
          align-items: center;
          padding: 0.75rem;
          background: var(--bg);
          border-radius: 6px;
          margin-bottom: 0.5rem;
        }

        .leadership-item input {
          margin-bottom: 0;
        }

        .leadership-item-readonly {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.75rem;
          background: var(--bg);
          border-radius: 6px;
          margin-bottom: 0.5rem;
        }

        .leadership-role-name {
          color: var(--text);
          font-size: 0.95rem;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        /* Grid layout for semesters */
        .semesters-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 1rem;
          align-items: start;
        }

        /* Drag visual */
        .semester-card.drag-over {
          outline: 2px dashed var(--accent);
          outline-offset: -6px;
          transform: scale(0.995);
        }

        .leadership-role-name .role {
          font-weight: bold;
          color: var(--accent);
        }

        .add-semester-form {
          background: var(--surface);
          padding: 1.5rem;
          border-radius: var(--radius);
          margin-bottom: 1.5rem;
          border: 2px dashed #333;
        }

        .loading-container {
          text-align: center;
          padding: 2rem;
          color: var(--text);
        }

        .loading-spinner {
          width: 40px;
          height: 40px;
          border: 3px solid #333;
          border-top: 3px solid var(--accent);
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin: 0 auto 1rem;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .empty-state {
          text-align: center;
          padding: 3rem;
          color: var(--subtxt);
        }

        .empty-state-icon {
          font-size: 4rem;
          margin-bottom: 1rem;
          opacity: 0.5;
        }

        @media (max-width: 768px) {
          .alumni-header {
            flex-direction: column;
            gap: 1rem;
            align-items: stretch;
          }

          .action-buttons {
            justify-content: center;
          }

          .leadership-item {
            grid-template-columns: 1fr;
          }

          .leadership-item-readonly {
            flex-direction: column;
            align-items: flex-start;
          }
        }
      `}</style>

      <div className="alumni-header">
        <h2 className="alumni-title">Alumni Management</h2>
        <div className="action-buttons" style={{ alignItems: 'center' }}>
          <SyncStatusBadge 
            status={status} 
            lastSync={lastSync}
            onRefresh={handleRefreshData}
          />
          {canEdit && (
            <button 
              className="btn" 
              onClick={() => setShowAddSemester(!showAddSemester)}
            >
              <Plus size={18} />
              Add Semester
            </button>
          )}
        </div>
      </div>

      {showAddSemester && (
        <div className="add-semester-form">
          <div className="form-group">
            <label className="form-label">Semester</label>
            <input
              type="text"
              className="form-input"
              value={newSemester.semester}
              onChange={(e) => setNewSemester({ ...newSemester, semester: e.target.value })}
              placeholder="e.g., Fall 2025"
            />
          </div>
          
          <div className="leadership-list">
            <h4 style={{ color: 'var(--text)', marginBottom: '1rem' }}>Leadership</h4>
            {newSemester.leadership?.map((leader, leaderIndex) => (
              <div key={leaderIndex} className="leadership-item">
                <input
                  type="text"
                  className="form-input"
                  value={leader.role}
                  onChange={(e) => updateLeadershipInNew(leaderIndex, 'role', e.target.value)}
                  placeholder="Role (e.g., Project Director)"
                />
                <input
                  type="text"
                  className="form-input"
                  value={leader.name}
                  onChange={(e) => updateLeadershipInNew(leaderIndex, 'name', e.target.value)}
                  placeholder="Name"
                />
                <button 
                  className="btn btn-small btn-secondary"
                  onClick={() => deleteLeadershipFromNew(leaderIndex)}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
            <button 
              className="btn btn-small"
              onClick={addLeadershipToNew}
              style={{ marginTop: '0.5rem' }}
            >
              <Plus size={16} />
              Add Leadership Role
            </button>
          </div>

          <div className="action-buttons" style={{ marginTop: '1rem' }}>
            <button className="btn" onClick={handleAddSemester}>
              <Save size={18} />
              Save Semester
            </button>
            <button 
              className="btn btn-secondary" 
              onClick={() => {
                setShowAddSemester(false);
                setNewSemester({ semester: '', leadership: [] });
              }}
            >
              <X size={18} />
              Cancel
            </button>
          </div>
        </div>
      )}

      {alumniData.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">👥</div>
          <h3>No Alumni Data</h3>
          <p>Start by adding your first semester of alumni data.</p>
        </div>
      ) : (
        <div className="semesters-grid" onDragOver={handleDragOver} onDrop={handleDrop}>
        {alumniData.map((semester, semesterIndex) => (
          <div
            key={semester.id || semesterIndex}
            className={`semester-card${dragOverIndex === semesterIndex ? ' drag-over' : ''}`}
            draggable={canEdit && editingIndex === null}
            onDragStart={handleDragStart(semesterIndex)}
            onDragEnter={handleDragEnter(semesterIndex)}
          >
            <div className="semester-header">
              {editingIndex === semesterIndex ? (
                <input
                  type="text"
                  className="form-input"
                  value={editingSemester.semester}
                  onChange={(e) => updateEditingSemester('semester', e.target.value)}
                  style={{ maxWidth: '420px' }}
                />
              ) : (
                <div className="semester-title-row">
                  {canEdit && (
                    <span title="Drag to reorder" style={{ cursor: 'grab', color: 'var(--subtxt)' }}>
                      <GripVertical size={18} />
                    </span>
                  )}
                  <h3 className="semester-title">{semester.semester}</h3>
                </div>
              )}
              <div className="semester-actions">
                {editingIndex === semesterIndex ? (
                  <>
                    <button 
                      className="btn btn-small"
                      onClick={handleSaveSemester}
                    >
                      <Save size={16} />
                    </button>
                    <button 
                      className="btn btn-small btn-secondary"
                      onClick={handleCancelEdit}
                    >
                      <X size={16} />
                    </button>
                  </>
                ) : (
                  <>
                    {canEdit && (
                      <>
                        <button 
                          className="btn btn-small"
                          onClick={() => handleEditSemester(semester, semesterIndex)}
                        >
                          <Edit2 size={16} />
                        </button>
                        <button 
                          className="btn btn-small btn-secondary"
                          onClick={() => handleDeleteSemester(semester.id, semester.semester)}
                        >
                          <Trash2 size={16} />
                        </button>
                      </>
                    )}
                  </>
                )}
              </div>
            </div>

            <div className="leadership-list">
              <h4 style={{ color: 'var(--text)', marginBottom: '1rem' }}>Leadership</h4>
              {editingIndex === semesterIndex ? (
                // Edit mode - show editable inputs
                <>
                  {editingSemester.leadership?.map((leader, leaderIndex) => (
                    <div key={leaderIndex} className="leadership-item">
                      <input
                        type="text"
                        className="form-input"
                        value={leader.role}
                        onChange={(e) => updateLeadershipInEditing(leaderIndex, 'role', e.target.value)}
                        placeholder="Role (e.g., Project Director)"
                      />
                      <input
                        type="text"
                        className="form-input"
                        value={leader.name}
                        onChange={(e) => updateLeadershipInEditing(leaderIndex, 'name', e.target.value)}
                        placeholder="Name"
                      />
                      <button 
                        className="btn btn-small btn-secondary"
                        onClick={() => deleteLeadershipFromEditing(leaderIndex)}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                  <button 
                    className="btn btn-small"
                    onClick={addLeadershipToEditing}
                  >
                    <Plus size={16} />
                    Add Leadership Role
                  </button>
                </>
              ) : (
                // Read-only mode - show static content
                semester.leadership?.map((leader, leaderIndex) => (
                  <div key={leaderIndex} className="leadership-item-readonly">
                    <div className="leadership-role-name">
                      <span className="role">{leader.role}:</span> {leader.name}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        ))}
        </div>
      )}
    </div>
  );
};

export default AlumniManager;