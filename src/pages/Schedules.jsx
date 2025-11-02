import { useState, useEffect } from 'react';
import Calendar from '../components/Calendar';
import './Schedules.css';

const Schedules = () => {
  const [scheduleData, setScheduleData] = useState({ teams: [], projects: [], events: [], lastUpdated: '' });
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTeam, setSelectedTeam] = useState('all');
  const [currentView, setCurrentView] = useState('projects');
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);

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
    if (isOverdue(dueDate, status)) return '#dc3545';
    switch (status) {
      case 'completed': return '#28a745';
      case 'in-progress': return '#007bff';
      case 'pending': return '#ffc107';
      case 'planning': return '#6c757d';
      case 'critical': return '#dc3545';
      default: return '#6c757d';
    }
  };

  const filterItemsByTeam = (items, teamKey = 'team') => {
    if (selectedTeam === 'all') return items;
    return items.filter(item => item[teamKey] === selectedTeam);
  };

  const getUpcomingEvents = () => {
    const today = new Date();
    const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
    
    return scheduleData.events.filter(event => {
      const eventDate = new Date(event.date);
      return eventDate >= today && eventDate <= nextWeek;
    }).sort((a, b) => new Date(a.date) - new Date(b.date));
  };

  const handleCalendarItemClick = (item, type) => {
    if (type === 'event') {
      setSelectedEvent(item);
    } else if (type.includes('project')) {
      const project = scheduleData.projects.find(p => p.id === item.id);
      if (project) {
        setSelectedProject(project);
      }
    } else if (type === 'task-due') {
      const project = scheduleData.projects.find(p => 
        p.tasks.some(t => t.id === item.id)
      );
      if (project) {
        setSelectedProject(project);
      }
    }
  };

  const getOverdueItems = () => {
    const overdue = [];
    
    scheduleData.projects.forEach(project => {
      if (isOverdue(project.dueDate, project.status)) {
        overdue.push({ ...project, type: 'project' });
      }
      
      project.tasks.forEach(task => {
        if (isOverdue(task.dueDate, task.status)) {
          overdue.push({ ...task, type: 'task', projectTitle: project.title });
        }
      });
    });
    
    return overdue.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
  };

  if (isLoading) {
    return (
      <div className="schedules-page">
        <div className="loading">
          <div className="loading-spinner"></div>
          <p>Loading schedules...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="schedules-page">
      <div className="schedules-header">
        <h1>Project Schedules</h1>
        <p>Track progress across all teams and projects</p>
      </div>

      {/* Quick Stats */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">📊</div>
          <div className="stat-content">
            <h3>{scheduleData.projects.length}</h3>
            <p>Active Projects</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">⏰</div>
          <div className="stat-content">
            <h3>{getUpcomingEvents().length}</h3>
            <p>Upcoming Events</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">⚠️</div>
          <div className="stat-content">
            <h3>{getOverdueItems().length}</h3>
            <p>Overdue Items</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">👥</div>
          <div className="stat-content">
            <h3>{scheduleData.teams.length}</h3>
            <p>Teams</p>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="schedule-tabs">
        <button 
          className={`tab ${currentView === 'projects' ? 'active' : ''}`}
          onClick={() => setCurrentView('projects')}
        >
          Projects
        </button>
        <button 
          className={`tab ${currentView === 'calendar' ? 'active' : ''}`}
          onClick={() => setCurrentView('calendar')}
        >
          Calendar
        </button>
        <button 
          className={`tab ${currentView === 'overdue' ? 'active' : ''}`}
          onClick={() => setCurrentView('overdue')}
        >
          Overdue ({getOverdueItems().length})
        </button>
      </div>

      {/* Team Filter */}
      <div className="filters">
        <label htmlFor="team-select">Filter by Team:</label>
        <select 
          id="team-select"
          value={selectedTeam}
          onChange={(e) => setSelectedTeam(e.target.value)}
        >
          <option value="all">All Teams</option>
          {scheduleData.teams.map(team => (
            <option key={team.id} value={team.id}>{team.name}</option>
          ))}
        </select>
      </div>

      {/* Projects View */}
      {currentView === 'projects' && (
        <div className="projects-section">
          <div className="projects-grid">
            {filterItemsByTeam(scheduleData.projects).map(project => (
              <div 
                key={project.id} 
                className={`project-card ${isOverdue(project.dueDate, project.status) ? 'overdue' : ''}`}
                onClick={() => setSelectedProject(project)}
              >
                <div className="project-header">
                  <div>
                    <h3>{project.title}</h3>
                    <div 
                      className="team-badge"
                      style={{ backgroundColor: getTeamColor(project.team) }}
                    >
                      {getTeamName(project.team)}
                    </div>
                  </div>
                  <div
                    className="status-badge"
                    style={{ backgroundColor: getStatusColor(project.status, project.dueDate) }}
                  >
                    {isOverdue(project.dueDate, project.status) ? 'OVERDUE' : project.status.toUpperCase()}
                  </div>
                </div>

                <p className="project-description">{project.description}</p>

                <div className="progress-section">
                  <div className="progress-header">
                    <span>Progress: {project.progress}%</span>
                    <span className="hours">{project.actualHours}/{project.estimatedHours}h</span>
                  </div>
                  <div className="progress-bar">
                    <div 
                      className="progress-fill"
                      style={{ 
                        width: `${project.progress}%`,
                        backgroundColor: getTeamColor(project.team)
                      }}
                    />
                  </div>
                </div>

                <div className="project-meta">
                  <div className="meta-item">
                    <strong>Assigned:</strong> {project.assignedTo}
                  </div>
                  <div className="meta-item">
                    <strong>Due:</strong> {new Date(project.dueDate).toLocaleDateString()}
                  </div>
                  <div className="meta-item">
                    <strong>Priority:</strong> 
                    <span className={`priority ${project.priority}`}>{project.priority}</span>
                  </div>
                </div>

                {project.tasks.length > 0 && (
                  <div className="tasks-preview">
                    <h4>Tasks ({project.tasks.length})</h4>
                    <div className="task-status-overview">
                      {project.tasks.slice(0, 3).map(task => (
                        <div 
                          key={task.id}
                          className="mini-task"
                          style={{ borderLeft: `3px solid ${getStatusColor(task.status, task.dueDate)}` }}
                        >
                          <span className="task-name">{task.title}</span>
                          <span className="task-progress">{task.progress}%</span>
                        </div>
                      ))}
                      {project.tasks.length > 3 && (
                        <div className="more-tasks">+{project.tasks.length - 3} more</div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Calendar View */}
      {currentView === 'calendar' && (
        <div className="calendar-section">
          <Calendar 
            projects={filterItemsByTeam(scheduleData.projects)}
            events={filterItemsByTeam(scheduleData.events)}
            teams={scheduleData.teams}
            selectedTeam={selectedTeam}
            onItemClick={handleCalendarItemClick}
          />
          
          <div className="upcoming-events">
            <h2>Upcoming Events (Next 7 Days)</h2>
            <div className="events-list">
              {getUpcomingEvents().map(event => (
                <div 
                  key={event.id} 
                  className="event-card"
                  onClick={() => setSelectedEvent(event)}
                  style={{ borderLeft: `4px solid ${getTeamColor(event.team)}` }}
                >
                  <div className="event-date">
                    {new Date(event.date).toLocaleDateString('en-US', { 
                      weekday: 'short', 
                      month: 'short', 
                      day: 'numeric' 
                    })}
                  </div>
                  <div className="event-content">
                    <h3>{event.title}</h3>
                    <p>{event.description}</p>
                    <div className="event-meta">
                      <span className="time">{event.startTime} - {event.endTime}</span>
                      <span className="team">{getTeamName(event.team)}</span>
                      <span className="location">{event.location}</span>
                    </div>
                  </div>
                </div>
              ))}
              {getUpcomingEvents().length === 0 && (
                <div className="no-events">
                  <p>No upcoming events in the next 7 days</p>
                </div>
              )}
            </div>
          </div>

          <div className="all-events">
            <h2>All Events</h2>
            <div className="events-grid">
              {filterItemsByTeam(scheduleData.events).map(event => (
                <div 
                  key={event.id} 
                  className="event-card-small"
                  onClick={() => setSelectedEvent(event)}
                >
                  <div className="event-header">
                    <div className="event-date-small">
                      {new Date(event.date).toLocaleDateString()}
                    </div>
                    <div 
                      className="event-type"
                      style={{ backgroundColor: getTeamColor(event.team) }}
                    >
                      {event.type}
                    </div>
                  </div>
                  <h3>{event.title}</h3>
                  <p>{event.description}</p>
                  <div className="event-meta-small">
                    <span>{getTeamName(event.team)}</span>
                    <span>{event.startTime} - {event.endTime}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Overdue View */}
      {currentView === 'overdue' && (
        <div className="overdue-section">
          <h2>Overdue Items</h2>
          {getOverdueItems().length === 0 ? (
            <div className="no-overdue">
              <div className="celebration-icon">🎉</div>
              <h3>All caught up!</h3>
              <p>No overdue items at the moment. Great work!</p>
            </div>
          ) : (
            <div className="overdue-list">
              {getOverdueItems().map((item, index) => (
                <div key={`${item.type}-${item.id}`} className="overdue-item">
                  <div className="overdue-priority">
                    <div className="overdue-icon">⚠️</div>
                    <div className="days-overdue">
                      {Math.floor((new Date() - new Date(item.dueDate)) / (1000 * 60 * 60 * 24))} days overdue
                    </div>
                  </div>
                  <div className="overdue-content">
                    <h3>{item.title}</h3>
                    {item.type === 'task' && (
                      <p className="parent-project">Part of: {item.projectTitle}</p>
                    )}
                    <p>{item.description}</p>
                    <div className="overdue-meta">
                      <span><strong>Due:</strong> {new Date(item.dueDate).toLocaleDateString()}</span>
                      <span><strong>Assigned:</strong> {item.assignedTo}</span>
                      <span><strong>Priority:</strong> {item.priority}</span>
                    </div>
                  </div>
                  <div className="overdue-status">
                    <div 
                      className="status-badge overdue-badge"
                      style={{ backgroundColor: '#dc3545' }}
                    >
                      OVERDUE
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Project Detail Modal */}
      {selectedProject && (
        <div className="modal-overlay" onClick={() => setSelectedProject(null)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{selectedProject.title}</h2>
              <button className="close-btn" onClick={() => setSelectedProject(null)}>×</button>
            </div>
            <div className="modal-content">
              <div className="project-detail">
                <div className="detail-section">
                  <h3>Project Overview</h3>
                  <p>{selectedProject.description}</p>
                  
                  <div className="detail-grid">
                    <div><strong>Team:</strong> {getTeamName(selectedProject.team)}</div>
                    <div><strong>Status:</strong> {selectedProject.status}</div>
                    <div><strong>Priority:</strong> {selectedProject.priority}</div>
                    <div><strong>Assigned To:</strong> {selectedProject.assignedTo}</div>
                    <div><strong>Start Date:</strong> {new Date(selectedProject.startDate).toLocaleDateString()}</div>
                    <div><strong>Due Date:</strong> {new Date(selectedProject.dueDate).toLocaleDateString()}</div>
                    <div><strong>Progress:</strong> {selectedProject.progress}%</div>
                    <div><strong>Hours:</strong> {selectedProject.actualHours}/{selectedProject.estimatedHours}</div>
                  </div>
                </div>

                {selectedProject.tasks.length > 0 && (
                  <div className="detail-section">
                    <h3>Tasks ({selectedProject.tasks.length})</h3>
                    <div className="tasks-detail">
                      {selectedProject.tasks.map(task => (
                        <div key={task.id} className="task-detail">
                          <div className="task-header">
                            <h4>{task.title}</h4>
                            <div
                              className="status-badge"
                              style={{ backgroundColor: getStatusColor(task.status, task.dueDate) }}
                            >
                              {isOverdue(task.dueDate, task.status) ? 'OVERDUE' : task.status.toUpperCase()}
                            </div>
                          </div>
                          <p>{task.description}</p>
                          <div className="task-meta-detail">
                            <span><strong>Due:</strong> {new Date(task.dueDate).toLocaleDateString()}</span>
                            <span><strong>Assigned:</strong> {task.assignedTo}</span>
                            <span><strong>Progress:</strong> {task.progress}%</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Event Detail Modal */}
      {selectedEvent && (
        <div className="modal-overlay" onClick={() => setSelectedEvent(null)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{selectedEvent.title}</h2>
              <button className="close-btn" onClick={() => setSelectedEvent(null)}>×</button>
            </div>
            <div className="modal-content">
              <div className="event-detail">
                <div className="detail-section">
                  <h3>Event Details</h3>
                  <p>{selectedEvent.description}</p>
                  
                  <div className="detail-grid">
                    <div><strong>Date:</strong> {new Date(selectedEvent.date).toLocaleDateString()}</div>
                    <div><strong>Time:</strong> {selectedEvent.startTime} - {selectedEvent.endTime}</div>
                    <div><strong>Team:</strong> {getTeamName(selectedEvent.team)}</div>
                    <div><strong>Type:</strong> {selectedEvent.type}</div>
                    <div><strong>Location:</strong> {selectedEvent.location}</div>
                    <div><strong>Priority:</strong> {selectedEvent.priority}</div>
                  </div>

                  {selectedEvent.attendees && selectedEvent.attendees.length > 0 && (
                    <div className="attendees-section">
                      <h4>Attendees</h4>
                      <ul>
                        {selectedEvent.attendees.map((attendee, index) => (
                          <li key={index}>{attendee}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Schedules;