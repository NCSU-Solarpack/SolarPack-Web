import { useState, useEffect } from 'react';
import { authService } from '../../utils/auth';
import { githubService } from '../../utils/github';

const ScheduleManager = () => {
  const [scheduleData, setScheduleData] = useState({ teams: [], projects: [], events: [], lastUpdated: '' });
  const [activeView, setActiveView] = useState('projects');
  const [isEditing, setIsEditing] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTeam, setSelectedTeam] = useState('all');

  useEffect(() => {
    loadScheduleData();
  }, []);

  const loadScheduleData = async () => {
    try {
      const cacheBuster = `?_t=${Date.now()}&_cb=${Math.random()}`;
      const url = `/data/schedules.json${cacheBuster}`;
      
      const response = await fetch(url, {
        cache: 'no-store',
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0'
        }
      });
      
      if (response.status === 304) {
        const cached = sessionStorage.getItem('json:/data/schedules.json');
        if (cached) {
          setScheduleData(JSON.parse(cached));
          return;
        }
        throw new Error('HTTP 304 with no cached copy');
      }
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      sessionStorage.setItem('json:/data/schedules.json', JSON.stringify(data));
      setScheduleData(data);
    } catch (error) {
      console.error('Error loading schedule data:', error);
      const cached = sessionStorage.getItem('json:/data/schedules.json');
      if (cached) {
        setScheduleData(JSON.parse(cached));
      }
    } finally {
      setIsLoading(false);
    }
  };

  const getTeamName = (teamId) => {
    const team = scheduleData.teams.find(t => t.id === teamId);
    return team ? team.name : teamId;
  };

  const getTeamColor = (teamId) => {
    const team = scheduleData.teams.find(t => t.id === teamId);
    return team ? team.color : '#6c757d';
  };

  const isOverdue = (dueDate, status) => {
    if (status === 'completed') return false;
    const today = new Date();
    const due = new Date(dueDate);
    return due < today;
  };

  const getStatusColor = (status, dueDate) => {
    if (isOverdue(dueDate, status)) return '#dc3545'; // Red for overdue
    switch (status) {
      case 'completed': return '#28a745';
      case 'in-progress': return '#007bff';
      case 'pending': return '#ffc107';
      case 'planning': return '#6c757d';
      case 'critical': return '#dc3545';
      default: return '#6c757d';
    }
  };

  const handleAddProject = () => {
    setEditingItem({
      type: 'project',
      id: Date.now(),
      title: '',
      description: '',
      team: 'director',
      priority: 'medium',
      status: 'planning',
      startDate: '',
      dueDate: '',
      estimatedHours: 0,
      actualHours: 0,
      progress: 0,
      assignedTo: '',
      tasks: []
    });
    setIsEditing(true);
  };

  const handleEditProject = (project) => {
    setEditingItem({ ...project, type: 'project' });
    setIsEditing(true);
  };

  const handleEditTask = (project, task) => {
    setEditingItem({
      ...project,
      type: 'project',
      editingTaskId: task.id
    });
    setIsEditing(true);
  };

  const handleDeleteTask = (projectId, taskId) => {
    if (!window.confirm('Are you sure you want to delete this task?')) return;
    
    const updatedData = { ...scheduleData };
    const projectIndex = updatedData.projects.findIndex(p => p.id === projectId);
    
    if (projectIndex >= 0) {
      updatedData.projects[projectIndex].tasks = updatedData.projects[projectIndex].tasks.filter(t => t.id !== taskId);
      updatedData.lastUpdated = new Date().toISOString();
      setScheduleData(updatedData);
      saveToGitHub(updatedData);
    }
  };

  const handleAddTask = (projectId) => {
    const project = scheduleData.projects.find(p => p.id === projectId);
    const newTask = {
      id: Date.now(),
      title: '',
      description: '',
      startDate: '',
      dueDate: '',
      estimatedHours: 0,
      actualHours: 0,
      status: 'pending',
      priority: 'medium',
      assignedTo: '',
      progress: 0
    };
    
    setEditingItem({
      ...project,
      type: 'project',
      tasks: [...project.tasks, newTask]
    });
    setIsEditing(true);
  };

  const handleAddEvent = () => {
    setEditingItem({
      type: 'event',
      id: Date.now(),
      title: '',
      description: '',
      team: 'director',
      date: '',
      startTime: '',
      endTime: '',
      eventType: 'meeting',
      priority: 'medium',
      attendees: [],
      location: ''
    });
    setIsEditing(true);
  };

  const handleEditEvent = (event) => {
    const editData = { ...event };
    // Convert the event type to eventType for editing to avoid conflicts
    editData.eventType = event.type;
    editData.type = 'event'; // This is the editing type
    setEditingItem(editData);
    setIsEditing(true);
  };

  const handleSaveItem = async () => {
    try {
      const updatedData = { ...scheduleData };
      
      if (editingItem.type === 'project') {
        const existingIndex = updatedData.projects.findIndex(p => p.id === editingItem.id);
        const projectData = { ...editingItem };
        delete projectData.type;
        
        if (existingIndex >= 0) {
          updatedData.projects[existingIndex] = projectData;
        } else {
          updatedData.projects.push(projectData);
        }
      } else if (editingItem.type === 'event') {
        const existingIndex = updatedData.events.findIndex(e => e.id === editingItem.id);
        const eventData = { ...editingItem };
        delete eventData.type;
        // Rename eventType back to type for storage
        if (eventData.eventType) {
          eventData.type = eventData.eventType;
          delete eventData.eventType;
        }
        
        if (existingIndex >= 0) {
          updatedData.events[existingIndex] = eventData;
        } else {
          updatedData.events.push(eventData);
        }
      }
      
      updatedData.lastUpdated = new Date().toISOString();
      setScheduleData(updatedData);
      await saveToGitHub(updatedData);
      setIsEditing(false);
      setEditingItem(null);
    } catch (error) {
      console.error('Error saving item:', error);
      alert('Failed to save changes. Please try again.');
    }
  };

  const handleDeleteItem = async (itemType, itemId) => {
    if (!window.confirm('Are you sure you want to delete this item?')) return;
    
    try {
      const updatedData = { ...scheduleData };
      
      if (itemType === 'project') {
        updatedData.projects = updatedData.projects.filter(p => p.id !== itemId);
      } else if (itemType === 'event') {
        updatedData.events = updatedData.events.filter(e => e.id !== itemId);
      }
      
      updatedData.lastUpdated = new Date().toISOString();
      setScheduleData(updatedData);
      await saveToGitHub(updatedData);
    } catch (error) {
      console.error('Error deleting item:', error);
      alert('Failed to delete item. Please try again.');
    }
  };

  const saveToGitHub = async (data) => {
    try {
      const content = JSON.stringify(data, null, 2);
      await githubService.updateFile(
        'public/data/schedules.json',
        content,
        `Update schedules data - ${new Date().toISOString()}`
      );
      await githubService.triggerRebuild();
    } catch (error) {
      console.error('Error saving to GitHub:', error);
      throw error;
    }
  };

  const filterItemsByTeam = (items, teamKey = 'team') => {
    if (selectedTeam === 'all') return items;
    return items.filter(item => item[teamKey] === selectedTeam);
  };

  const canEdit = authService.hasPermission('edit_schedules');

  if (isLoading) {
    return <div className="loading">Loading schedule data...</div>;
  }

  return (
    <div className="schedule-manager">
      <style>{`
        .schedule-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
        }

        .schedule-title {
          font-family: "Bebas Neue", sans-serif;
          font-size: 2rem;
          color: var(--text);
          margin: 0;
        }

        .view-tabs {
          display: flex;
          gap: 0.5rem;
          margin-bottom: 2rem;
        }

        .view-tab {
          padding: 0.5rem 1rem;
          background: var(--card-bg);
          border: 2px solid var(--card-border);
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.3s ease;
          color: var(--text);
        }

        .view-tab.active {
          background: var(--primary);
          color: white;
          border-color: var(--primary);
        }

        .filters {
          display: flex;
          gap: 1rem;
          margin-bottom: 2rem;
          align-items: center;
        }

        .team-filter {
          padding: 0.5rem;
          border: 2px solid var(--card-border);
          border-radius: 8px;
          background: var(--card-bg);
          color: var(--text);
        }

        .add-button {
          padding: 0.75rem 1.5rem;
          background: var(--primary);
          color: white;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          font-weight: 600;
          transition: all 0.3s ease;
        }

        .add-button:hover {
          background: var(--primary-dark);
          transform: translateY(-2px);
        }

        .projects-grid {
          display: grid;
          gap: 2rem;
          margin-bottom: 2rem;
        }

        .project-card {
          background: var(--card-bg);
          border: 2px solid var(--card-border);
          border-radius: 12px;
          padding: 1.5rem;
          transition: all 0.3s ease;
        }

        .project-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 25px rgba(0,0,0,0.1);
        }

        .project-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 1rem;
        }

        .project-title {
          font-size: 1.4rem;
          font-weight: 700;
          color: var(--text);
          margin: 0 0 0.5rem 0;
        }

        .project-team {
          padding: 0.25rem 0.75rem;
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: 600;
          color: white;
        }

        .project-status {
          padding: 0.25rem 0.75rem;
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: 600;
          color: white;
          margin-bottom: 0.5rem;
        }

        .project-progress {
          margin: 1rem 0;
        }

        .progress-bar {
          width: 100%;
          height: 8px;
          background: #e9ecef;
          border-radius: 4px;
          overflow: hidden;
        }

        .progress-fill {
          height: 100%;
          transition: width 0.3s ease;
        }

        .project-meta {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          gap: 1rem;
          margin: 1rem 0;
          font-size: 0.9rem;
          color: var(--text-secondary);
        }

        .tasks-section {
          margin-top: 1.5rem;
          padding-top: 1.5rem;
          border-top: 1px solid var(--card-border);
        }

        .tasks-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
        }

        .task-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.75rem;
          background: var(--bg);
          border-radius: 8px;
          margin-bottom: 0.5rem;
        }

        .task-actions {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .task-buttons {
          display: flex;
          gap: 0.25rem;
        }

        .tasks-management-section {
          margin-top: 2rem;
          padding-top: 2rem;
          border-top: 2px solid var(--card-border);
        }

        .tasks-management-section h3 {
          color: var(--text);
          margin-bottom: 1.5rem;
          font-size: 1.2rem;
        }

        .task-edit-item {
          background: var(--bg);
          border: 2px solid var(--card-border);
          border-radius: 8px;
          padding: 1.5rem;
          margin-bottom: 1.5rem;
        }

        .task-edit-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
          padding-bottom: 0.5rem;
          border-bottom: 1px solid var(--card-border);
        }

        .task-edit-header h4 {
          color: var(--text);
          margin: 0;
          font-size: 1rem;
        }

        .task-info {
          flex: 1;
        }

        .task-title {
          font-weight: 600;
          color: var(--text);
          margin-bottom: 0.25rem;
        }

        .task-meta {
          font-size: 0.8rem;
          color: var(--text-secondary);
        }

        .events-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
          gap: 1.5rem;
        }

        .event-card {
          background: var(--card-bg);
          border: 2px solid var(--card-border);
          border-radius: 12px;
          padding: 1.5rem;
          transition: all 0.3s ease;
        }

        .event-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 15px rgba(0,0,0,0.1);
        }

        .event-date {
          font-size: 1.1rem;
          font-weight: 700;
          color: var(--primary);
          margin-bottom: 0.5rem;
        }

        .event-time {
          font-size: 0.9rem;
          color: var(--text-secondary);
          margin-bottom: 1rem;
        }

        .action-buttons {
          display: flex;
          gap: 0.5rem;
        }

        .edit-btn, .delete-btn {
          padding: 0.5rem 1rem;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          font-size: 0.8rem;
          font-weight: 600;
          transition: all 0.3s ease;
        }

        .edit-btn {
          background: var(--primary);
          color: white;
        }

        .delete-btn {
          background: #dc3545;
          color: white;
        }

        .edit-btn:hover {
          background: var(--primary-dark);
        }

        .delete-btn:hover {
          background: #c82333;
        }

        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0,0,0,0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
        }

        .modal {
          background: var(--card-bg);
          border-radius: 12px;
          padding: 2rem;
          width: 90%;
          max-width: 600px;
          max-height: 80vh;
          overflow-y: auto;
        }

        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
        }

        .modal-title {
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--text);
          margin: 0;
        }

        .close-btn {
          background: none;
          border: none;
          font-size: 1.5rem;
          cursor: pointer;
          color: var(--text-secondary);
        }

        .form-group {
          margin-bottom: 1.5rem;
        }

        .form-label {
          display: block;
          margin-bottom: 0.5rem;
          font-weight: 600;
          color: var(--text);
        }

        .form-input, .form-select, .form-textarea {
          width: 100%;
          padding: 0.75rem;
          border: 2px solid var(--card-border);
          border-radius: 8px;
          background: var(--bg);
          color: var(--text);
          font-size: 1rem;
        }

        .form-textarea {
          resize: vertical;
          min-height: 100px;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }

        .modal-actions {
          display: flex;
          gap: 1rem;
          justify-content: flex-end;
          margin-top: 2rem;
          padding-top: 2rem;
          border-top: 1px solid var(--card-border);
        }

        .save-btn, .cancel-btn {
          padding: 0.75rem 1.5rem;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          font-weight: 600;
          transition: all 0.3s ease;
        }

        .save-btn {
          background: var(--primary);
          color: white;
        }

        .cancel-btn {
          background: var(--card-border);
          color: var(--text);
        }

        .overdue {
          border-left: 4px solid #dc3545;
        }

        .loading {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 200px;
          font-size: 1.2rem;
          color: var(--text-secondary);
        }
      `}</style>

      <div className="schedule-header">
        <h1 className="schedule-title">Schedule Manager</h1>
        {canEdit && (
          <button 
            className="add-button" 
            onClick={activeView === 'projects' ? handleAddProject : handleAddEvent}
          >
            + Add {activeView === 'projects' ? 'Project' : 'Event'}
          </button>
        )}
      </div>

      <div className="view-tabs">
        <button 
          className={`view-tab ${activeView === 'projects' ? 'active' : ''}`}
          onClick={() => setActiveView('projects')}
        >
          Projects
        </button>
        <button 
          className={`view-tab ${activeView === 'events' ? 'active' : ''}`}
          onClick={() => setActiveView('events')}
        >
          Events
        </button>
      </div>

      <div className="filters">
        <label htmlFor="team-filter">Filter by Team:</label>
        <select 
          id="team-filter"
          className="team-filter"
          value={selectedTeam}
          onChange={(e) => setSelectedTeam(e.target.value)}
        >
          <option value="all">All Teams</option>
          {scheduleData.teams.map(team => (
            <option key={team.id} value={team.id}>{team.name}</option>
          ))}
        </select>
      </div>

      {activeView === 'projects' && (
        <div className="projects-grid">
          {filterItemsByTeam(scheduleData.projects).map(project => (
            <div 
              key={project.id} 
              className={`project-card ${isOverdue(project.dueDate, project.status) ? 'overdue' : ''}`}
            >
              <div className="project-header">
                <div>
                  <h3 className="project-title">{project.title}</h3>
                  <div 
                    className="project-team"
                    style={{ backgroundColor: getTeamColor(project.team) }}
                  >
                    {getTeamName(project.team)}
                  </div>
                </div>
                <div
                  className="project-status"
                  style={{ backgroundColor: getStatusColor(project.status, project.dueDate) }}
                >
                  {isOverdue(project.dueDate, project.status) ? 'OVERDUE' : project.status.toUpperCase()}
                </div>
              </div>

              <p>{project.description}</p>

              <div className="project-progress">
                <div className="progress-bar">
                  <div 
                    className="progress-fill"
                    style={{ 
                      width: `${project.progress}%`,
                      backgroundColor: getTeamColor(project.team)
                    }}
                  />
                </div>
                <div style={{ marginTop: '0.5rem', fontSize: '0.9rem' }}>
                  Progress: {project.progress}%
                </div>
              </div>

              <div className="project-meta">
                <div><strong>Assigned:</strong> {project.assignedTo}</div>
                <div><strong>Due:</strong> {new Date(project.dueDate).toLocaleDateString()}</div>
                <div><strong>Priority:</strong> {project.priority}</div>
                <div><strong>Hours:</strong> {project.actualHours}/{project.estimatedHours}</div>
              </div>

              {project.tasks.length > 0 && (
                <div className="tasks-section">
                  <div className="tasks-header">
                    <h4>Tasks ({project.tasks.length})</h4>
                    {canEdit && (
                      <button 
                        className="add-button" 
                        style={{ fontSize: '0.8rem', padding: '0.5rem 1rem' }}
                        onClick={() => handleAddTask(project.id)}
                      >
                        + Task
                      </button>
                    )}
                  </div>
                  {project.tasks.map(task => (
                    <div key={task.id} className="task-item">
                      <div className="task-info">
                        <div className="task-title">{task.title}</div>
                        <div className="task-meta">
                          Due: {new Date(task.dueDate).toLocaleDateString()} | 
                          Status: {task.status} | 
                          Progress: {task.progress}%
                        </div>
                      </div>
                      <div className="task-actions">
                        <div
                          className="project-status"
                          style={{ 
                            backgroundColor: getStatusColor(task.status, task.dueDate),
                            fontSize: '0.7rem',
                            padding: '0.25rem 0.5rem'
                          }}
                        >
                          {isOverdue(task.dueDate, task.status) ? 'OVERDUE' : task.status.toUpperCase()}
                        </div>
                        {canEdit && (
                          <div className="task-buttons">
                            <button 
                              className="edit-btn"
                              style={{ fontSize: '0.7rem', padding: '0.25rem 0.5rem' }}
                              onClick={(e) => {
                                e.stopPropagation();
                                handleEditTask(project, task);
                              }}
                            >
                              Edit
                            </button>
                            <button 
                              className="delete-btn"
                              style={{ fontSize: '0.7rem', padding: '0.25rem 0.5rem' }}
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteTask(project.id, task.id);
                              }}
                            >
                              Del
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {canEdit && (
                <div className="action-buttons" style={{ marginTop: '1rem' }}>
                  <button className="edit-btn" onClick={() => handleEditProject(project)}>
                    Edit
                  </button>
                  <button 
                    className="delete-btn" 
                    onClick={() => handleDeleteItem('project', project.id)}
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {activeView === 'events' && (
        <div className="events-grid">
          {filterItemsByTeam(scheduleData.events).map(event => (
            <div key={event.id} className="event-card">
              <div className="event-date">
                {new Date(event.date).toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </div>
              <div className="event-time">
                {event.startTime} - {event.endTime}
              </div>
              
              <h3 className="project-title">{event.title}</h3>
              <p>{event.description}</p>
              
              <div className="project-meta">
                <div><strong>Team:</strong> {getTeamName(event.team)}</div>
                <div><strong>Type:</strong> {event.type}</div>
                <div><strong>Location:</strong> {event.location}</div>
                <div><strong>Priority:</strong> {event.priority}</div>
              </div>

              {canEdit && (
                <div className="action-buttons" style={{ marginTop: '1rem' }}>
                  <button className="edit-btn" onClick={() => handleEditEvent(event)}>
                    Edit
                  </button>
                  <button 
                    className="delete-btn" 
                    onClick={() => handleDeleteItem('event', event.id)}
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {isEditing && editingItem && (
        <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && setIsEditing(false)}>
          <div className="modal">
            <div className="modal-header">
              <h2 className="modal-title">
                {editingItem.type === 'project' ? 
                  (scheduleData.projects.find(p => p.id === editingItem.id) ? 'Edit Project' : 'Add Project') :
                  (scheduleData.events.find(e => e.id === editingItem.id) ? 'Edit Event' : 'Add Event')
                }
              </h2>
              <button className="close-btn" onClick={() => setIsEditing(false)}>×</button>
            </div>

            {editingItem.type === 'project' ? (
              <div>
                <div className="form-group">
                  <label className="form-label">Title</label>
                  <input
                    type="text"
                    className="form-input"
                    value={editingItem.title}
                    onChange={(e) => setEditingItem({...editingItem, title: e.target.value})}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Description</label>
                  <textarea
                    className="form-textarea"
                    value={editingItem.description}
                    onChange={(e) => setEditingItem({...editingItem, description: e.target.value})}
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Team</label>
                    <select
                      className="form-select"
                      value={editingItem.team}
                      onChange={(e) => setEditingItem({...editingItem, team: e.target.value})}
                    >
                      {scheduleData.teams.map(team => (
                        <option key={team.id} value={team.id}>{team.name}</option>
                      ))}
                    </select>
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
                      <option value="critical">Critical</option>
                    </select>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Status</label>
                    <select
                      className="form-select"
                      value={editingItem.status}
                      onChange={(e) => setEditingItem({...editingItem, status: e.target.value})}
                    >
                      <option value="planning">Planning</option>
                      <option value="pending">Pending</option>
                      <option value="in-progress">In Progress</option>
                      <option value="completed">Completed</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Assigned To</label>
                    <input
                      type="text"
                      className="form-input"
                      value={editingItem.assignedTo}
                      onChange={(e) => setEditingItem({...editingItem, assignedTo: e.target.value})}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Start Date</label>
                    <input
                      type="date"
                      className="form-input"
                      value={editingItem.startDate}
                      onChange={(e) => setEditingItem({...editingItem, startDate: e.target.value})}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Due Date</label>
                    <input
                      type="date"
                      className="form-input"
                      value={editingItem.dueDate}
                      onChange={(e) => setEditingItem({...editingItem, dueDate: e.target.value})}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Estimated Hours</label>
                    <input
                      type="number"
                      className="form-input"
                      value={editingItem.estimatedHours}
                      onChange={(e) => setEditingItem({...editingItem, estimatedHours: parseInt(e.target.value) || 0})}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Progress (%)</label>
                    <input
                      type="number"
                      className="form-input"
                      min="0"
                      max="100"
                      value={editingItem.progress}
                      onChange={(e) => setEditingItem({...editingItem, progress: parseInt(e.target.value) || 0})}
                    />
                  </div>
                </div>

                {/* Tasks Management */}
                <div className="tasks-management-section">
                  <h3>Tasks Management</h3>
                  <div className="tasks-list">
                    {editingItem.tasks.map((task, index) => (
                      <div key={task.id || index} className="task-edit-item">
                        <div className="task-edit-header">
                          <h4>Task {index + 1}</h4>
                          <button
                            type="button"
                            className="delete-btn"
                            onClick={() => {
                              const newTasks = editingItem.tasks.filter((_, i) => i !== index);
                              setEditingItem({...editingItem, tasks: newTasks});
                            }}
                          >
                            Remove
                          </button>
                        </div>
                        
                        <div className="form-group">
                          <label className="form-label">Task Title</label>
                          <input
                            type="text"
                            className="form-input"
                            value={task.title}
                            onChange={(e) => {
                              const newTasks = [...editingItem.tasks];
                              newTasks[index] = {...task, title: e.target.value};
                              setEditingItem({...editingItem, tasks: newTasks});
                            }}
                          />
                        </div>

                        <div className="form-group">
                          <label className="form-label">Task Description</label>
                          <textarea
                            className="form-textarea"
                            style={{ minHeight: '60px' }}
                            value={task.description}
                            onChange={(e) => {
                              const newTasks = [...editingItem.tasks];
                              newTasks[index] = {...task, description: e.target.value};
                              setEditingItem({...editingItem, tasks: newTasks});
                            }}
                          />
                        </div>

                        <div className="form-row">
                          <div className="form-group">
                            <label className="form-label">Start Date</label>
                            <input
                              type="date"
                              className="form-input"
                              value={task.startDate}
                              onChange={(e) => {
                                const newTasks = [...editingItem.tasks];
                                newTasks[index] = {...task, startDate: e.target.value};
                                setEditingItem({...editingItem, tasks: newTasks});
                              }}
                            />
                          </div>

                          <div className="form-group">
                            <label className="form-label">Due Date</label>
                            <input
                              type="date"
                              className="form-input"
                              value={task.dueDate}
                              onChange={(e) => {
                                const newTasks = [...editingItem.tasks];
                                newTasks[index] = {...task, dueDate: e.target.value};
                                setEditingItem({...editingItem, tasks: newTasks});
                              }}
                            />
                          </div>
                        </div>

                        <div className="form-row">
                          <div className="form-group">
                            <label className="form-label">Status</label>
                            <select
                              className="form-select"
                              value={task.status}
                              onChange={(e) => {
                                const newTasks = [...editingItem.tasks];
                                newTasks[index] = {...task, status: e.target.value};
                                setEditingItem({...editingItem, tasks: newTasks});
                              }}
                            >
                              <option value="pending">Pending</option>
                              <option value="in-progress">In Progress</option>
                              <option value="completed">Completed</option>
                            </select>
                          </div>

                          <div className="form-group">
                            <label className="form-label">Priority</label>
                            <select
                              className="form-select"
                              value={task.priority}
                              onChange={(e) => {
                                const newTasks = [...editingItem.tasks];
                                newTasks[index] = {...task, priority: e.target.value};
                                setEditingItem({...editingItem, tasks: newTasks});
                              }}
                            >
                              <option value="low">Low</option>
                              <option value="medium">Medium</option>
                              <option value="high">High</option>
                              <option value="critical">Critical</option>
                            </select>
                          </div>
                        </div>

                        <div className="form-row">
                          <div className="form-group">
                            <label className="form-label">Assigned To</label>
                            <input
                              type="text"
                              className="form-input"
                              value={task.assignedTo}
                              onChange={(e) => {
                                const newTasks = [...editingItem.tasks];
                                newTasks[index] = {...task, assignedTo: e.target.value};
                                setEditingItem({...editingItem, tasks: newTasks});
                              }}
                            />
                          </div>

                          <div className="form-group">
                            <label className="form-label">Progress (%)</label>
                            <input
                              type="number"
                              className="form-input"
                              min="0"
                              max="100"
                              value={task.progress}
                              onChange={(e) => {
                                const newTasks = [...editingItem.tasks];
                                newTasks[index] = {...task, progress: parseInt(e.target.value) || 0};
                                setEditingItem({...editingItem, tasks: newTasks});
                              }}
                            />
                          </div>
                        </div>

                        <div className="form-row">
                          <div className="form-group">
                            <label className="form-label">Estimated Hours</label>
                            <input
                              type="number"
                              className="form-input"
                              value={task.estimatedHours}
                              onChange={(e) => {
                                const newTasks = [...editingItem.tasks];
                                newTasks[index] = {...task, estimatedHours: parseInt(e.target.value) || 0};
                                setEditingItem({...editingItem, tasks: newTasks});
                              }}
                            />
                          </div>

                          <div className="form-group">
                            <label className="form-label">Actual Hours</label>
                            <input
                              type="number"
                              className="form-input"
                              value={task.actualHours}
                              onChange={(e) => {
                                const newTasks = [...editingItem.tasks];
                                newTasks[index] = {...task, actualHours: parseInt(e.target.value) || 0};
                                setEditingItem({...editingItem, tasks: newTasks});
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <button
                    type="button"
                    className="add-button"
                    onClick={() => {
                      const newTask = {
                        id: Date.now(),
                        title: '',
                        description: '',
                        startDate: '',
                        dueDate: '',
                        estimatedHours: 0,
                        actualHours: 0,
                        status: 'pending',
                        priority: 'medium',
                        assignedTo: '',
                        progress: 0
                      };
                      setEditingItem({...editingItem, tasks: [...editingItem.tasks, newTask]});
                    }}
                  >
                    + Add Task
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <div className="form-group">
                  <label className="form-label">Title</label>
                  <input
                    type="text"
                    className="form-input"
                    value={editingItem.title}
                    onChange={(e) => setEditingItem({...editingItem, title: e.target.value})}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Description</label>
                  <textarea
                    className="form-textarea"
                    value={editingItem.description}
                    onChange={(e) => setEditingItem({...editingItem, description: e.target.value})}
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Team</label>
                    <select
                      className="form-select"
                      value={editingItem.team}
                      onChange={(e) => setEditingItem({...editingItem, team: e.target.value})}
                    >
                      {scheduleData.teams.map(team => (
                        <option key={team.id} value={team.id}>{team.name}</option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Type</label>
                    <select
                      className="form-select"
                      value={editingItem.eventType}
                      onChange={(e) => setEditingItem({...editingItem, eventType: e.target.value})}
                    >
                      <option value="meeting">Meeting</option>
                      <option value="testing">Testing</option>
                      <option value="presentation">Presentation</option>
                      <option value="deadline">Deadline</option>
                      <option value="milestone">Milestone</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Date</label>
                  <input
                    type="date"
                    className="form-input"
                    value={editingItem.date}
                    onChange={(e) => setEditingItem({...editingItem, date: e.target.value})}
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Start Time</label>
                    <input
                      type="time"
                      className="form-input"
                      value={editingItem.startTime}
                      onChange={(e) => setEditingItem({...editingItem, startTime: e.target.value})}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">End Time</label>
                    <input
                      type="time"
                      className="form-input"
                      value={editingItem.endTime}
                      onChange={(e) => setEditingItem({...editingItem, endTime: e.target.value})}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Location</label>
                    <input
                      type="text"
                      className="form-input"
                      value={editingItem.location}
                      onChange={(e) => setEditingItem({...editingItem, location: e.target.value})}
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
                      <option value="critical">Critical</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            <div className="modal-actions">
              <button className="cancel-btn" onClick={() => setIsEditing(false)}>
                Cancel
              </button>
              <button className="save-btn" onClick={handleSaveItem}>
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ScheduleManager;