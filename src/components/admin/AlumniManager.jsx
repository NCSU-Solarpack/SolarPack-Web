import { useState, useEffect } from 'react';
import { authService } from '../../utils/auth';
import { githubService } from '../../utils/github';
import { Plus, Edit2, Trash2, Save, X, User } from 'lucide-react';

const AlumniManager = () => {
  const [alumniData, setAlumniData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingLeadershipIndex, setEditingLeadershipIndex] = useState(null);
  const [newSemester, setNewSemester] = useState({ semester: '', leadership: [] });
  const [showAddSemester, setShowAddSemester] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    loadAlumniData();
  }, []);

  const loadAlumniData = async () => {
    try {
      setLoading(true);
      // Try to load from existing file first
      try {
        const cacheBuster = `?_t=${Date.now()}&_cb=${Math.random()}`;
        const url = `/data/alumni.json${cacheBuster}`;
        
        const response = await fetch(url, {
          cache: 'no-store',
          headers: {
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache',
            'Expires': '0'
          }
        });
        
        if (response.status === 304) {
          const cached = sessionStorage.getItem('json:/data/alumni.json');
          if (cached) {
            const data = JSON.parse(cached);
            setAlumniData(data.alumniData || []);
            return;
          }
          throw new Error('HTTP 304 with no cached copy');
        }
        
        if (response.ok) {
          const data = await response.json();
          sessionStorage.setItem('json:/data/alumni.json', JSON.stringify(data));
          setAlumniData(data.alumniData || []);
        } else {
          // If file doesn't exist, use default structure
          setAlumniData([]);
        }
      } catch (error) {
        // If file doesn't exist, start with empty array
        const cached = sessionStorage.getItem('json:/data/alumni.json');
        if (cached) {
          const data = JSON.parse(cached);
          setAlumniData(data.alumniData || []);
        } else {
          setAlumniData([]);
        }
      }
    } catch (error) {
      console.error('Error loading alumni data:', error);
      setAlumniData([]);
    } finally {
      setLoading(false);
    }
  };

  const saveAlumniData = async () => {
    if (!authService.hasPermission('edit_content')) {
      alert('You do not have permission to edit alumni data');
      return;
    }

    try {
      setIsSubmitting(true);
      const dataToSave = { alumniData };
  // Save to public/data/alumni.json in the repo
  await githubService.updateFile('public/data/alumni.json', dataToSave, 'Update alumni data via admin interface');
      alert('Alumni data saved successfully!');
    } catch (error) {
      console.error('Error saving alumni data:', error);
      alert('Error saving alumni data: ' + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const addSemester = () => {
    if (!newSemester.semester.trim()) {
      alert('Please enter a semester name');
      return;
    }

    const updatedData = [...alumniData, { ...newSemester, leadership: newSemester.leadership || [] }];
    setAlumniData(updatedData);
    setNewSemester({ semester: '', leadership: [] });
    setShowAddSemester(false);
  };

  const deleteSemester = (index) => {
    if (confirm('Are you sure you want to delete this semester?')) {
      const updatedData = alumniData.filter((_, i) => i !== index);
      setAlumniData(updatedData);
    }
  };

  const updateSemester = (index, field, value) => {
    const updatedData = [...alumniData];
    updatedData[index][field] = value;
    setAlumniData(updatedData);
  };

  const addLeadership = (semesterIndex) => {
    const updatedData = [...alumniData];
    updatedData[semesterIndex].leadership.push({ role: '', name: '' });
    setAlumniData(updatedData);
  };

  const updateLeadership = (semesterIndex, leadershipIndex, field, value) => {
    const updatedData = [...alumniData];
    updatedData[semesterIndex].leadership[leadershipIndex][field] = value;
    setAlumniData(updatedData);
  };

  const deleteLeadership = (semesterIndex, leadershipIndex) => {
    const updatedData = [...alumniData];
    updatedData[semesterIndex].leadership.splice(leadershipIndex, 1);
    setAlumniData(updatedData);
  };

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
          max-width: 1200px;
          margin: 0 auto;
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
          margin-bottom: 1.5rem;
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        }

        .semester-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
        }

        .semester-title {
          font-size: 1.5rem;
          font-weight: bold;
          color: var(--text);
          margin: 0;
        }

        .semester-actions {
          display: flex;
          gap: 0.5rem;
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
        <div className="action-buttons">
          <button 
            className="btn" 
            onClick={() => setShowAddSemester(!showAddSemester)}
          >
            <Plus size={18} />
            Add Semester
          </button>
          <button 
            className="btn" 
            onClick={saveAlumniData}
            disabled={isSubmitting}
          >
            <Save size={18} />
            {isSubmitting ? 'Saving...' : 'Save Changes'}
          </button>
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
          <div className="action-buttons">
            <button className="btn" onClick={addSemester}>
              <Plus size={18} />
              Add Semester
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
        alumniData.map((semester, semesterIndex) => (
          <div key={semesterIndex} className="semester-card">
            <div className="semester-header">
              {editingIndex === semesterIndex ? (
                <input
                  type="text"
                  className="form-input"
                  value={semester.semester}
                  onChange={(e) => updateSemester(semesterIndex, 'semester', e.target.value)}
                  style={{ maxWidth: '300px' }}
                />
              ) : (
                <h3 className="semester-title">{semester.semester}</h3>
              )}
              <div className="semester-actions">
                {editingIndex === semesterIndex ? (
                  <button 
                    className="btn btn-small"
                    onClick={() => setEditingIndex(null)}
                  >
                    <Save size={16} />
                  </button>
                ) : (
                  <button 
                    className="btn btn-small"
                    onClick={() => setEditingIndex(semesterIndex)}
                  >
                    <Edit2 size={16} />
                  </button>
                )}
                <button 
                  className="btn btn-small btn-secondary"
                  onClick={() => deleteSemester(semesterIndex)}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>

            <div className="leadership-list">
              <h4 style={{ color: 'var(--text)', marginBottom: '1rem' }}>Leadership</h4>
              {editingIndex === semesterIndex ? (
                // Edit mode - show editable inputs
                <>
                  {semester.leadership?.map((leader, leaderIndex) => (
                    <div key={leaderIndex} className="leadership-item">
                      <input
                        type="text"
                        className="form-input"
                        value={leader.role}
                        onChange={(e) => updateLeadership(semesterIndex, leaderIndex, 'role', e.target.value)}
                        placeholder="Role (e.g., Project Director)"
                      />
                      <input
                        type="text"
                        className="form-input"
                        value={leader.name}
                        onChange={(e) => updateLeadership(semesterIndex, leaderIndex, 'name', e.target.value)}
                        placeholder="Name"
                      />
                      <button 
                        className="btn btn-small btn-secondary"
                        onClick={() => deleteLeadership(semesterIndex, leaderIndex)}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                  <button 
                    className="btn btn-small"
                    onClick={() => addLeadership(semesterIndex)}
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
        ))
      )}
    </div>
  );
};

export default AlumniManager;