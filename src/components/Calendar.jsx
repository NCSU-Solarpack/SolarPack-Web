import { useState, useEffect } from 'react';
import './Calendar.css';

const Calendar = ({ projects = [], events = [], onItemClick, selectedTeam = 'all', teams = [] }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [calendarData, setCalendarData] = useState([]);

  useEffect(() => {
    generateCalendarData();
  }, [currentDate, projects, events, selectedTeam]);

  const generateCalendarData = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    
    // Get first day of month and how many days
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    // Generate calendar grid
    const calendar = [];
    let date = 1;
    
    // Generate 6 weeks (42 days) to ensure full calendar
    for (let week = 0; week < 6; week++) {
      const weekData = [];
      
      for (let day = 0; day < 7; day++) {
        const dayIndex = week * 7 + day;
        
        if (dayIndex < startingDayOfWeek || date > daysInMonth) {
          // Empty cell or previous/next month
          weekData.push(null);
        } else {
          const currentDay = new Date(year, month, date);
          const dayData = {
            date: date,
            fullDate: currentDay,
            isToday: isToday(currentDay),
            events: getEventsForDate(currentDay),
            projects: getProjectsForDate(currentDay),
            isWeekend: day === 0 || day === 6
          };
          weekData.push(dayData);
          date++;
        }
      }
      
      calendar.push(weekData);
      
      // If we've placed all days, break
      if (date > daysInMonth) break;
    }
    
    setCalendarData(calendar);
  };

  const isToday = (date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const getEventsForDate = (date) => {
    return events.filter(event => {
      const eventDate = new Date(event.date);
      const matchesDate = eventDate.toDateString() === date.toDateString();
      const matchesTeam = selectedTeam === 'all' || event.team === selectedTeam;
      return matchesDate && matchesTeam;
    });
  };

  const getProjectsForDate = (date) => {
    const items = [];
    
    projects.forEach(project => {
      const matchesTeam = selectedTeam === 'all' || project.team === selectedTeam;
      if (!matchesTeam) return;
      
      const projectStart = new Date(project.startDate);
      const projectDue = new Date(project.dueDate);
      
      // Check if project starts on this date
      if (projectStart.toDateString() === date.toDateString()) {
        items.push({
          ...project,
          type: 'project-start',
          displayType: 'start'
        });
      }
      
      // Check if project is due on this date
      if (projectDue.toDateString() === date.toDateString()) {
        items.push({
          ...project,
          type: 'project-due',
          displayType: 'due'
        });
      }
      
      // Check for task deadlines
      project.tasks.forEach(task => {
        const taskDue = new Date(task.dueDate);
        if (taskDue.toDateString() === date.toDateString()) {
          items.push({
            ...task,
            type: 'task-due',
            displayType: 'task',
            projectTitle: project.title,
            projectTeam: project.team
          });
        }
      });
    });
    
    return items;
  };

  const getTeamColor = (teamId) => {
    const team = teams.find(t => t.id === teamId);
    return team ? team.color : '#6c757d';
  };

  const isOverdue = (dueDate, status) => {
    if (status === 'completed') return false;
    const today = new Date();
    const due = new Date(dueDate);
    return due < today;
  };

  const navigateMonth = (direction) => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + direction);
      return newDate;
    });
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <div className="calendar-nav">
          <button onClick={() => navigateMonth(-1)} className="nav-btn">
            ← Previous
          </button>
          <button onClick={goToToday} className="today-btn">
            Today
          </button>
          <button onClick={() => navigateMonth(1)} className="nav-btn">
            Next →
          </button>
        </div>
        
        <h2 className="calendar-title">
          {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
        </h2>
      </div>

      <div className="calendar-grid">
        {/* Day headers */}
        <div className="calendar-header-row">
          {dayNames.map(day => (
            <div key={day} className="day-header">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar days */}
        {calendarData.map((week, weekIndex) => (
          <div key={weekIndex} className="calendar-week">
            {week.map((day, dayIndex) => (
              <div
                key={dayIndex}
                className={`calendar-day ${!day ? 'empty' : ''} ${
                  day?.isToday ? 'today' : ''
                } ${day?.isWeekend ? 'weekend' : ''}`}
              >
                {day && (
                  <>
                    <div className="day-number">{day.date}</div>
                    
                    <div className="day-items">
                      {/* Events */}
                      {day.events.map(event => (
                        <div
                          key={`event-${event.id}`}
                          className="calendar-item event-item"
                          style={{ backgroundColor: getTeamColor(event.team) }}
                          onClick={() => onItemClick(event, 'event')}
                          title={`${event.title} - ${event.startTime}`}
                        >
                          <span className="item-indicator">📅</span>
                          <span className="item-title">{event.title}</span>
                        </div>
                      ))}
                      
                      {/* Project items */}
                      {day.projects.map((item, index) => (
                        <div
                          key={`project-${item.id}-${index}`}
                          className={`calendar-item project-item ${
                            item.displayType === 'due' ? 'due-item' : ''
                          } ${
                            isOverdue(item.dueDate, item.status) ? 'overdue-item' : ''
                          }`}
                          style={{ 
                            backgroundColor: item.displayType === 'task' 
                              ? getTeamColor(item.projectTeam) 
                              : getTeamColor(item.team),
                            opacity: item.displayType === 'start' ? 0.7 : 1
                          }}
                          onClick={() => onItemClick(item, item.type)}
                          title={
                            item.displayType === 'start' 
                              ? `${item.title} - Starts`
                              : item.displayType === 'due'
                              ? `${item.title} - Due`
                              : `${item.title} - Task Due`
                          }
                        >
                          <span className="item-indicator">
                            {item.displayType === 'start' ? '🚀' : 
                             item.displayType === 'due' ? '🎯' : '✅'}
                          </span>
                          <span className="item-title">
                            {item.displayType === 'task' 
                              ? item.title 
                              : item.title}
                          </span>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="calendar-legend">
        <h3>Legend</h3>
        <div className="legend-items">
          <div className="legend-item">
            <span className="legend-indicator">📅</span>
            <span>Events</span>
          </div>
          <div className="legend-item">
            <span className="legend-indicator">🚀</span>
            <span>Project Start</span>
          </div>
          <div className="legend-item">
            <span className="legend-indicator">🎯</span>
            <span>Project Due</span>
          </div>
          <div className="legend-item">
            <span className="legend-indicator">✅</span>
            <span>Task Due</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendar;