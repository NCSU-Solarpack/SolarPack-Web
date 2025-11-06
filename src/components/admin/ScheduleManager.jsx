import { useState, useEffect, useMemo, forwardRef, useImperativeHandle } from 'react';
import { authService } from '../../utils/auth';
import { supabaseService } from '../../utils/supabase';
import { useAlert } from '../../contexts/AlertContext';

const ScheduleManager = forwardRef((props, ref) => {
  const { showAlert } = useAlert();
  const [scheduleData, setScheduleData] = useState({ teams: [], projects: [], lastUpdated: '' });
  const [activeView, setActiveView] = useState('overview');
  const [isEditing, setIsEditing] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTeam, setSelectedTeam] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);
  const [calendarView, setCalendarView] = useState('month'); // month, week
  const [currentDate, setCurrentDate] = useState(new Date());
  const [expandedTasks, setExpandedTasks] = useState({}); // Track which projects have tasks expanded

  // Expose methods to parent component
  useImperativeHandle(ref, () => ({
    handleAddProject: () => {
      setEditingItem({
        type: 'project',
        title: '',
        description: '',
        team: selectedTeam !== 'all' ? selectedTeam : 'director',
        priority: 'medium',
        status: 'planning',
        startDate: new Date().toISOString().split('T')[0],
        dueDate: '',
        estimatedHours: 0,
        actualHours: 0,
        progress: 0,
        assignedTo: '',
        weeklyNotes: '',
        tasks: []
      });
      setIsEditing(true);
    }
  }));

  useEffect(() => {
    loadScheduleData();
    
    // Set up real-time subscriptions
    const projectsSubscription = supabaseService.subscribeToTable('schedule_projects', handleDataChange);
    const tasksSubscription = supabaseService.subscribeToTable('schedule_tasks', handleDataChange);
    
    return () => {
      supabaseService.unsubscribe(projectsSubscription);
      supabaseService.unsubscribe(tasksSubscription);
    };
  }, []);
  
  const handleDataChange = () => {
    // Reload data when changes occur
    loadScheduleData();
  };

  const loadScheduleData = async () => {
    try {
      setIsLoading(true);
      
      if (!supabaseService.isConfigured()) {
        showAlert('Supabase is not configured. Please set up your environment variables.', 'error');
        setIsLoading(false);
        return;
      }
      
      const data = await supabaseService.getScheduleData();
      setScheduleData(data);
    } catch (error) {
      console.error('Error loading schedule data:', error);
      showAlert(`Failed to load schedule data: ${error.message}`, 'error');
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
      case 'completed': return '#28a745'; // Green for completed
      case 'in-progress': return '#6c757d'; // Gray for in-progress
      case 'pending': return '#ffc107'; // Yellow for pending
      case 'planning': return '#6c757d'; // Gray for planning
      case 'critical': return '#dc3545'; // Red for critical
      default: return '#6c757d'; // Gray default
    }
  };

  const calculateProgress = (startDate, dueDate, status) => {
    if (status === 'completed') return 100;
    if (!startDate || !dueDate) return 0;
    
    const start = new Date(startDate);
    const due = new Date(dueDate);
    const today = new Date();
    
    // If project hasn't started yet
    if (today < start) return 0;
    
    // If project is overdue
    if (today > due) return 100;
    
    // Calculate percentage based on time elapsed
    const totalDuration = due - start;
    const elapsed = today - start;
    const progress = Math.round((elapsed / totalDuration) * 100);
    
    return Math.max(0, Math.min(100, progress));
  };

  const handleAddProject = () => {
    setEditingItem({
      type: 'project',
      // Don't set id - let Supabase auto-generate it
      title: '',
      description: '',
      team: selectedTeam !== 'all' ? selectedTeam : 'director',
      priority: 'medium',
      status: 'planning',
      startDate: new Date().toISOString().split('T')[0], // Default to today
      dueDate: '',
      estimatedHours: 0,
      actualHours: 0,
      progress: 0,
      assignedTo: '',
      weeklyNotes: '',
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

  const handleDeleteTask = async (projectId, taskId) => {
    if (!window.confirm('Are you sure you want to delete this task?')) return;
    
    try {
      await supabaseService.deleteTask(taskId);
      showAlert('Task deleted successfully!', 'success');
      await loadScheduleData(); // Reload all data
    } catch (error) {
      console.error('Error deleting task:', error);
      showAlert(`Failed to delete task: ${error.message}`, 'error');
    }
  };

  const toggleTasksExpanded = (projectId, e) => {
    e.stopPropagation(); // Prevent project card click
    setExpandedTasks(prev => ({
      ...prev,
      [projectId]: !prev[projectId]
    }));
  };

  const handleAddTask = (projectId) => {
    const project = scheduleData.projects.find(p => p.id === projectId);
    const newTask = {
      // Don't set id - let Supabase auto-generate it
      projectId: projectId,
      title: '',
      description: '',
      startDate: new Date().toISOString().split('T')[0], // Default to today
      dueDate: '',
      estimatedHours: 0,
      status: 'pending',
      priority: 'medium',
      assignedTo: ''
    };
    
    setEditingItem({
      ...project,
      type: 'project',
      tasks: [...(project.tasks || []), newTask]
    });
    setIsEditing(true);
  };

  const handleSaveItem = async () => {
    try {
      if (!editingItem) return;
      
      if (editingItem.type === 'project') {
        // Validate required fields for project
        if (!editingItem.title || editingItem.title.trim() === '') {
          showAlert('Project title is required', 'error');
          return;
        }
        if (!editingItem.dueDate || editingItem.dueDate.trim() === '') {
          showAlert('Project due date is required', 'error');
          return;
        }
        if (!editingItem.team || editingItem.team.trim() === '') {
          showAlert('Project team is required', 'error');
          return;
        }
        
        // Validate required fields for each task
        if (editingItem.tasks && editingItem.tasks.length > 0) {
          for (const [i, task] of editingItem.tasks.entries()) {
            if (!task.title || task.title.trim() === '') {
              showAlert(`Task ${i + 1}: Title is required`, 'error');
              return;
            }
            if (!task.dueDate || task.dueDate.trim() === '') {
              showAlert(`Task ${i + 1}: Due date is required`, 'error');
              return;
            }
          }
        }
        
        const projectData = { ...editingItem };
        delete projectData.type;
        
        // Calculate progress based on dates
        projectData.progress = calculateProgress(projectData.startDate, projectData.dueDate, projectData.status);
        
        // Save project to Supabase
        const savedProject = await supabaseService.saveProject(projectData);
        
        // Save all tasks for this project
        if (projectData.tasks && projectData.tasks.length > 0) {
          for (const task of projectData.tasks) {
            const taskData = { ...task, projectId: savedProject.id };
            // Calculate progress for task based on dates
            taskData.progress = calculateProgress(taskData.startDate, taskData.dueDate, taskData.status);
            await supabaseService.saveTask(taskData);
          }
        }
        
        showAlert('Project saved successfully!', 'success');
      }
      
      setIsEditing(false);
      setEditingItem(null);
      await loadScheduleData(); // Reload all data
    } catch (error) {
      console.error('Error saving item:', error);
      showAlert(`Failed to save: ${error.message}`, 'error');
    }
  };

  const handleDeleteItem = async (itemType, itemId) => {
    if (!window.confirm('Are you sure you want to delete this item?')) return;
    
    try {
      if (itemType === 'project') {
        await supabaseService.deleteProject(itemId);
        showAlert('Project deleted successfully!', 'success');
      }
      
      await loadScheduleData(); // Reload all data
    } catch (error) {
      console.error('Error deleting item:', error);
      showAlert(`Failed to delete: ${error.message}`, 'error');
    }
  };

  const filterItemsByTeam = (items, teamKey = 'team') => {
    if (selectedTeam === 'all') return items;
    return items.filter(item => item[teamKey] === selectedTeam);
  };

  // Calendar utility functions
  const getMonthCalendar = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    const days = [];
    // Add empty cells for days before month starts
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    // Add days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }
    return days;
  };

  const getItemsForDate = (date) => {
    const dateStr = date.toISOString().split('T')[0];
    const projectsDue = scheduleData.projects.filter(p => p.dueDate === dateStr);
    return projectsDue.map(p => ({...p, itemType: 'project'}));
  };

  const getUpcomingDeadlines = () => {
    const today = new Date();
    const nextWeek = new Date(today);
    nextWeek.setDate(nextWeek.getDate() + 7);
    
    return scheduleData.projects
      .filter(p => {
        const dueDate = new Date(p.dueDate);
        return dueDate >= today && dueDate <= nextWeek && p.status !== 'completed';
      })
      .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
  };

  // Calculate team statistics
  const teamStats = useMemo(() => {
    return scheduleData.teams.map(team => {
      const teamProjects = scheduleData.projects.filter(p => p.team === team.id);
      const completed = teamProjects.filter(p => p.status === 'completed').length;
      const inProgress = teamProjects.filter(p => p.status === 'in-progress').length;
      const overdue = teamProjects.filter(p => isOverdue(p.dueDate, p.status)).length;
      const avgProgress = teamProjects.length > 0 
        ? Math.round(teamProjects.reduce((sum, p) => sum + calculateProgress(p.startDate, p.dueDate, p.status), 0) / teamProjects.length)
        : 0;
      
      return {
        ...team,
        totalProjects: teamProjects.length,
        completed,
        inProgress,
        overdue,
        avgProgress
      };
    });
  }, [scheduleData]);

  const overallStats = useMemo(() => {
    const totalProjects = scheduleData.projects.length;
    const completed = scheduleData.projects.filter(p => p.status === 'completed').length;
    const inProgress = scheduleData.projects.filter(p => p.status === 'in-progress').length;
    const overdue = scheduleData.projects.filter(p => isOverdue(p.dueDate, p.status)).length;
    const avgProgress = totalProjects > 0
      ? Math.round(scheduleData.projects.reduce((sum, p) => sum + calculateProgress(p.startDate, p.dueDate, p.status), 0) / totalProjects)
      : 0;
    
    return { totalProjects, completed, inProgress, overdue, avgProgress };
  }, [scheduleData]);

  const canEdit = authService.hasPermission('edit_schedules');

  if (isLoading) {
    return <div className="loading">Loading schedule data...</div>;
  }

  return (
    <div className="schedule-manager">
      <style>{`
        .schedule-manager {
          padding: 1rem;
          max-width: 1600px;
          margin: 0 auto;
        }

        .schedule-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
          padding-bottom: 1rem;
          border-bottom: 3px solid var(--accent);
        }

        .schedule-title {
          font-family: "Bebas Neue", sans-serif;
          font-size: 2.5rem;
          color: var(--text);
          margin: 0;
          letter-spacing: 1px;
        }

        .header-actions {
          display: flex;
          gap: 1rem;
          align-items: center;
        }

        .view-tabs {
          display: flex;
          gap: 0.5rem;
          margin-bottom: 2rem;
          background: var(--card);
          padding: 0.5rem;
          border-radius: 12px;
          border: none;
          box-shadow: 0 4px 24px #0006;
        }

        .view-tab {
          padding: 0.75rem 1.5rem;
          background: transparent;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.3s ease;
          color: var(--text);
          font-weight: 600;
          font-size: 0.95rem;
        }

        .view-tab:hover {
          background: rgba(227, 27, 35, 0.1);
          color: var(--accent);
        }

        .view-tab.active {
          background: var(--accent);
          color: white;
          box-shadow: 0 2px 8px rgba(227, 27, 35, 0.3);
        }

        /* Overview Dashboard Styles */
        .overview-dashboard {
          display: grid;
          gap: 2rem;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1.5rem;
          margin-bottom: 2rem;
        }

        .stat-card {
          background: var(--card);
          border: none;
          border-radius: 12px;
          padding: 1.5rem;
          transition: all 0.3s ease;
          box-shadow: 0 4px 24px #0006;
        }

        .stat-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 32px #0008;
        }

        .stat-label {
          font-size: 0.85rem;
          color: var(--subtxt);
          margin-bottom: 0.5rem;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          font-weight: 600;
        }

        .stat-value {
          font-size: 2.5rem;
          font-weight: 700;
          color: var(--text);
          line-height: 1;
        }

        .stat-sublabel {
          font-size: 0.9rem;
          color: var(--subtxt);
          margin-top: 0.5rem;
        }

        .teams-overview {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 1.5rem;
          margin-bottom: 2rem;
        }

        .team-card {
          background: var(--card);
          border: none;
          border-radius: 12px;
          padding: 1.5rem;
          cursor: pointer;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
          box-shadow: 0 4px 24px #0006;
        }

        .team-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(90deg, var(--team-color) 0%, transparent 100%);
        }

        .team-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 32px #0008;
        }

        .team-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
        }

        .team-name {
          font-size: 1.2rem;
          font-weight: 700;
          color: var(--text);
          margin: 0;
        }

        .team-badge {
          padding: 0.25rem 0.75rem;
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: 600;
          color: white;
        }

        .team-progress {
          margin: 1rem 0;
        }

        .team-stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 0.75rem;
          margin-top: 1rem;
        }

        .team-stat {
          text-align: center;
          padding: 0.75rem;
          background: var(--bg);
          border-radius: 8px;
        }

        .team-stat-value {
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--text);
        }

        .team-stat-label {
          font-size: 0.75rem;
          color: var(--subtxt);
          text-transform: uppercase;
          margin-top: 0.25rem;
        }

        .upcoming-deadlines {
          background: var(--card);
          border: none;
          border-radius: 12px;
          padding: 1.5rem;
          box-shadow: 0 4px 24px #0006;
        }

        .section-title {
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--text);
          margin: 0 0 1.5rem 0;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .deadline-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem;
          background: var(--bg);
          border-left: 4px solid var(--team-color);
          border-radius: 8px;
          margin-bottom: 0.75rem;
          transition: all 0.3s ease;
        }

        .deadline-item:hover {
          transform: translateX(4px);
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }

        .deadline-info {
          flex: 1;
        }

        .deadline-title {
          font-weight: 600;
          color: var(--text);
          margin-bottom: 0.25rem;
        }

        .deadline-meta {
          font-size: 0.85rem;
          color: var(--subtxt);
        }

        .deadline-date {
          font-weight: 600;
          color: var(--accent);
          white-space: nowrap;
        }

        /* Calendar Styles */
        .calendar-view {
          background: var(--card);
          border: none;
          border-radius: 12px;
          padding: 1.5rem;
          box-shadow: 0 4px 24px #0006;
        }

        .calendar-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
        }

        .calendar-nav {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .calendar-nav-btn {
          padding: 0.5rem 1rem;
          background: var(--accent);
          color: white;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          font-weight: 600;
          transition: all 0.3s ease;
        }

        .calendar-nav-btn:hover {
          background: var(--surface);
          transform: translateY(-2px);
        }

        .calendar-month {
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--text);
        }

        .calendar-grid {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          gap: 0.5rem;
        }

        .calendar-day-header {
          text-align: center;
          font-weight: 600;
          color: var(--subtxt);
          padding: 0.75rem;
          font-size: 0.9rem;
        }

        .calendar-day {
          min-height: 100px;
          border: 1px solid #333;
          border-radius: 8px;
          padding: 0.5rem;
          background: var(--surface);
          transition: all 0.3s ease;
        }

        .calendar-day:hover {
          border-color: var(--accent);
          background: var(--card);
        }

        .calendar-day.empty {
          background: transparent;
          border: none;
        }

        .calendar-day.today {
          border-color: var(--accent);
          background: var(--card);
        }

        .calendar-date {
          font-weight: 700;
          color: var(--text);
          margin-bottom: 0.5rem;
        }

        .calendar-items {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .calendar-item {
          font-size: 0.75rem;
          padding: 0.25rem 0.5rem;
          border-radius: 4px;
          color: white;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .calendar-item:hover {
          transform: scale(1.05);
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
        }

        /* Projects View Styles */
        .projects-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
        }

        .filters {
          display: flex;
          gap: 1rem;
          align-items: center;
          flex-wrap: wrap;
        }

        .team-filter {
          padding: 0.75rem 1rem;
          border: none;
          border-radius: 8px;
          background: var(--card);
          color: var(--text);
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 24px #0006;
        }

        .team-filter:hover {
          box-shadow: 0 6px 28px #0008;
        }

        .team-filter:focus {
          outline: 2px solid var(--accent);
          outline-offset: 2px;
        }

        .add-button {
          padding: 0.75rem 1.5rem;
          background: var(--accent);
          color: white;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          font-weight: 600;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .add-button:hover {
          opacity: 0.9;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(227, 27, 35, 0.4);
        }

        .projects-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(500px, 1fr));
          gap: 1.5rem;
          margin-bottom: 2rem;
        }

        .project-card {
          background: var(--card);
          border: none;
          border-radius: 12px;
          padding: 1.5rem;
          transition: all 0.3s ease;
          cursor: pointer;
          position: relative;
          overflow: hidden;
          box-shadow: 0 4px 24px #0006;
        }

        .project-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: var(--team-color);
        }

        .project-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 32px #0008;
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
          background: #222;
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
          color: var(--subtxt);
        }

        .tasks-section {
          margin-top: 1.5rem;
          padding-top: 1.5rem;
          border-top: 1px solid #333;
        }

        .tasks-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.75rem;
          padding: 0.5rem;
          border-radius: 8px;
          transition: background 0.2s ease;
        }

        .tasks-header:hover {
          background: rgba(255, 255, 255, 0.05);
        }

        .tasks-header h4 {
          margin: 0;
          color: var(--text);
          font-size: 1rem;
        }

        .tasks-header i.fa-chevron-right,
        .tasks-header i.fa-chevron-down {
          font-size: 0.8rem;
          color: var(--subtxt);
          transition: transform 0.2s ease;
        }

        .tasks-list {
          animation: slideDown 0.2s ease-out;
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .task-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.75rem;
          background: var(--surface);
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
          border-top: 2px solid #333;
        }

        .tasks-management-section h3 {
          color: var(--text);
          margin-bottom: 1.5rem;
          font-size: 1.2rem;
        }

        .task-edit-item {
          background: var(--surface);
          border: 1px solid #333;
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
          border-bottom: 1px solid #333;
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
          color: var(--subtxt);
        }

        .events-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
          gap: 1.5rem;
        }

        .event-card {
          background: var(--card);
          border: none;
          border-radius: 12px;
          padding: 1.5rem;
          transition: all 0.3s ease;
          box-shadow: 0 4px 24px #0006;
        }

        .event-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 32px #0008;
        }

        .event-date {
          font-size: 1.1rem;
          font-weight: 700;
          color: var(--accent);
          margin-bottom: 0.5rem;
        }

        .event-time {
          font-size: 0.9rem;
          color: var(--subtxt);
          margin-bottom: 1rem;
        }

        .action-buttons {
          display: flex;
          gap: 0.5rem;
        }

        .edit-btn, .delete-btn {
          padding: 0.5rem 0.75rem;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          font-size: 0.9rem;
          font-weight: 600;
          transition: all 0.3s ease;
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }

        .edit-btn {
          background: var(--accent);
          color: white;
        }

        .delete-btn {
          background: var(--muted);
          color: white;
        }

        .edit-btn:hover {
          opacity: 0.9;
          transform: translateY(-1px);
        }

        .delete-btn:hover {
          opacity: 0.8;
          transform: translateY(-1px);
        }

        .icon-btn {
          width: 32px;
          height: 32px;
          padding: 0;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          font-size: 0.9rem;
          transition: all 0.3s ease;
        }

        .icon-btn.edit {
          background: var(--accent);
          color: white;
        }

        .icon-btn.delete {
          background: var(--muted);
          color: white;
        }

        .icon-btn.edit:hover {
          opacity: 0.9;
          transform: translateY(-1px);
        }

        .icon-btn.delete:hover {
          opacity: 0.8;
          transform: translateY(-1px);
        }

        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0,0,0,0.6);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          backdrop-filter: blur(4px);
          animation: fadeIn 0.3s ease;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .modal {
          background: var(--card);
          border-radius: 16px;
          padding: 2rem;
          width: 90%;
          max-width: 800px;
          max-height: 85vh;
          overflow-y: auto;
          border: none;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
          animation: slideUp 0.3s ease;
        }

        @keyframes slideUp {
          from {
            transform: translateY(50px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        .modal::-webkit-scrollbar {
          width: 8px;
        }

        .modal::-webkit-scrollbar-track {
          background: var(--surface);
          border-radius: 4px;
        }

        .modal::-webkit-scrollbar-thumb {
          background: var(--accent);
          border-radius: 4px;
        }

        .project-detail-modal {
          max-width: 900px;
        }

        .modal-project-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 1.5rem;
          padding-bottom: 1.5rem;
          border-bottom: 2px solid #333;
        }

        .modal-project-info h2 {
          margin: 0 0 0.5rem 0;
          font-size: 2rem;
          color: var(--text);
        }

        .modal-badges {
          display: flex;
          gap: 0.5rem;
          flex-wrap: wrap;
          margin-top: 0.5rem;
        }

        .modal-project-meta {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1.5rem;
          margin: 1.5rem 0;
          padding: 1.5rem;
          background: var(--surface);
          border-radius: 12px;
        }

        .meta-item {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .meta-label {
          font-size: 0.85rem;
          color: var(--subtxt);
          text-transform: uppercase;
          letter-spacing: 0.5px;
          font-weight: 600;
        }

        .meta-value {
          font-size: 1.1rem;
          font-weight: 700;
          color: var(--text);
        }

        .modal-tasks-section {
          margin-top: 2rem;
        }

        .modal-tasks-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
        }

        .task-list {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .task-card {
          background: var(--surface);
          border: 1px solid #333;
          border-radius: 8px;
          padding: 1rem;
          transition: all 0.3s ease;
        }

        .task-card:hover {
          border-color: var(--accent);
          transform: translateX(4px);
        }

        .task-header {
          display: flex;
          justify-content: space-between;
          align-items: start;
          margin-bottom: 0.5rem;
        }

        .task-title-group h4 {
          margin: 0 0 0.25rem 0;
          color: var(--text);
          font-size: 1.1rem;
        }

        .task-description {
          color: var(--subtxt);
          font-size: 0.9rem;
          margin: 0.5rem 0;
        }

        .task-progress-section {
          margin-top: 0.75rem;
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
          color: var(--subtxt);
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
          border: 1px solid #333;
          border-radius: 8px;
          background: var(--surface);
          color: var(--text);
          font-size: 1rem;
        }

        .form-input:focus, .form-select:focus, .form-textarea:focus {
          outline: 2px solid var(--accent);
          outline-offset: 2px;
          border-color: var(--accent);
        }

        /* Make date picker icons white */
        .form-input[type="date"]::-webkit-calendar-picker-indicator {
          filter: invert(1);
          cursor: pointer;
        }

        /* Placeholder text styling */
        .form-input::placeholder {
          color: var(--subtxt);
          opacity: 0.6;
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
          border-top: 1px solid #333;
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
          background: var(--accent);
          color: white;
        }

        .save-btn:hover {
          opacity: 0.9;
          transform: translateY(-1px);
        }

        .cancel-btn {
          background: var(--surface);
          color: var(--text);
          border: 1px solid #333;
        }

        .cancel-btn:hover {
          background: var(--card);
        }

        .overdue {
          border-left: 4px solid var(--accent);
        }

        .loading {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 200px;
          font-size: 1.2rem;
          color: var(--subtxt);
        }
      `}</style>

      <div className="schedule-header">
        <h1 className="schedule-title">Schedule Manager</h1>
      </div>

      <div className="view-tabs">
        <button 
          className={`view-tab ${activeView === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveView('overview')}
        >
          Overview
        </button>
        <button 
          className={`view-tab ${activeView === 'calendar' ? 'active' : ''}`}
          onClick={() => setActiveView('calendar')}
        >
          Calendar
        </button>
        <button 
          className={`view-tab ${activeView === 'projects' ? 'active' : ''}`}
          onClick={() => setActiveView('projects')}
        >
          Projects
        </button>
      </div>

      {/* Overview Dashboard */}
      {activeView === 'overview' && (
        <div className="overview-dashboard">
          {/* Overall Statistics */}
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-label">Total Projects</div>
              <div className="stat-value">{overallStats.totalProjects}</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">Completed</div>
              <div className="stat-value" style={{color: 'var(--subtxt)'}}>{overallStats.completed}</div>
              <div className="stat-sublabel">{overallStats.totalProjects > 0 ? Math.round(overallStats.completed / overallStats.totalProjects * 100) : 0}%</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">In Progress</div>
              <div className="stat-value" style={{color: 'var(--text)'}}>{overallStats.inProgress}</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">Overdue</div>
              <div className="stat-value" style={{color: 'var(--accent)'}}>{overallStats.overdue}</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">Avg Progress</div>
              <div className="stat-value">{overallStats.avgProgress}%</div>
              <div className="progress-bar" style={{marginTop: '0.75rem'}}>
                <div 
                  className="progress-fill"
                  style={{ 
                    width: `${overallStats.avgProgress}%`,
                    backgroundColor: 'var(--accent)'
                  }}
                />
              </div>
            </div>
          </div>

          {/* Team Overview Cards */}
          <div>
            <h2 className="section-title">Teams Overview</h2>
            <div className="teams-overview">
              {teamStats.map(team => (
                <div 
                  key={team.id} 
                  className="team-card"
                  style={{'--team-color': team.color}}
                  onClick={() => {
                    setSelectedTeam(team.id);
                    setActiveView('projects');
                  }}
                >
                  <div className="team-header">
                    <h3 className="team-name">{team.name}</h3>
                    <div className="team-badge" style={{backgroundColor: 'var(--accent)'}}>
                      {team.totalProjects}
                    </div>
                  </div>
                  
                  <div className="team-progress">
                    <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.9rem'}}>
                      <span>Progress</span>
                      <span style={{fontWeight: 'bold'}}>{team.avgProgress}%</span>
                    </div>
                    <div className="progress-bar">
                      <div 
                        className="progress-fill"
                        style={{ 
                          width: `${team.avgProgress}%`,
                          backgroundColor: 'var(--accent)'
                        }}
                      />
                    </div>
                  </div>

                  <div className="team-stats">
                    <div className="team-stat">
                      <div className="team-stat-value" style={{color: 'var(--subtxt)'}}>{team.completed}</div>
                      <div className="team-stat-label">Done</div>
                    </div>
                    <div className="team-stat">
                      <div className="team-stat-value" style={{color: 'var(--text)'}}>{team.inProgress}</div>
                      <div className="team-stat-label">Active</div>
                    </div>
                    <div className="team-stat">
                      <div className="team-stat-value" style={{color: 'var(--accent)'}}>{team.overdue}</div>
                      <div className="team-stat-label">Overdue</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Deadlines */}
          <div className="upcoming-deadlines">
            <h2 className="section-title">Upcoming Deadlines (Next 7 Days)</h2>
            {getUpcomingDeadlines().length === 0 ? (
              <p style={{color: 'var(--subtxt)', textAlign: 'center', padding: '2rem'}}>
                No upcoming deadlines in the next week
              </p>
            ) : (
              getUpcomingDeadlines().map(project => (
                <div 
                  key={project.id} 
                  className="deadline-item"
                  style={{'--team-color': getTeamColor(project.team)}}
                  onClick={() => setSelectedProject(project)}
                >
                  <div className="deadline-info">
                    <div className="deadline-title">{project.title}</div>
                    <div className="deadline-meta">
                      {getTeamName(project.team)} • {project.assignedTo} • {calculateProgress(project.startDate, project.dueDate, project.status)}% complete
                    </div>
                  </div>
                  <div className="deadline-date">
                    {new Date(project.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* Calendar View */}
      {activeView === 'calendar' && (
        <div className="calendar-view">
          <div className="calendar-header">
            <div className="calendar-nav">
              <button 
                className="calendar-nav-btn"
                onClick={() => {
                  const newDate = new Date(currentDate);
                  newDate.setMonth(newDate.getMonth() - 1);
                  setCurrentDate(newDate);
                }}
              >
                ← Previous
              </button>
              <div className="calendar-month">
                {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              </div>
              <button 
                className="calendar-nav-btn"
                onClick={() => {
                  const newDate = new Date(currentDate);
                  newDate.setMonth(newDate.getMonth() + 1);
                  setCurrentDate(newDate);
                }}
              >
                Next →
              </button>
            </div>
            <button 
              className="calendar-nav-btn"
              onClick={() => setCurrentDate(new Date())}
            >
              Today
            </button>
          </div>

          <div className="calendar-grid">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="calendar-day-header">{day}</div>
            ))}
            {getMonthCalendar(currentDate).map((date, index) => {
              if (!date) {
                return <div key={`empty-${index}`} className="calendar-day empty"></div>;
              }
              
              const items = getItemsForDate(date);
              const isToday = date.toDateString() === new Date().toDateString();
              
              return (
                <div key={date.toISOString()} className={`calendar-day ${isToday ? 'today' : ''}`}>
                  <div className="calendar-date">{date.getDate()}</div>
                  <div className="calendar-items">
                    {items.slice(0, 3).map(item => (
                      <div 
                        key={`${item.itemType}-${item.id}`}
                        className="calendar-item"
                        style={{
                          backgroundColor: 'var(--accent)'
                        }}
                        onClick={() => {
                          if (item.itemType === 'project') {
                            setSelectedProject(item);
                          }
                        }}
                        title={item.title}
                      >
                        {item.title}
                      </div>
                    ))}
                    {items.length > 3 && (
                      <div style={{fontSize: '0.7rem', color: 'var(--subtxt)', marginTop: '0.25rem'}}>
                        +{items.length - 3} more
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Projects View */}
      {activeView === 'projects' && (
        <div>
          <div className="projects-header">
            <div className="filters">
              <label htmlFor="team-filter" style={{fontWeight: 600, color: 'var(--text)'}}>
                Filter by Team:
              </label>
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
            {canEdit && (
              <button className="add-button" onClick={handleAddProject}>
                <i className="fas fa-plus"></i> Add Project
              </button>
            )}
          </div>

          <div className="projects-grid">
            {filterItemsByTeam(scheduleData.projects).map(project => (
              <div 
                key={project.id} 
                className={`project-card ${isOverdue(project.dueDate, project.status) ? 'overdue' : ''}`}
                style={{'--team-color': getTeamColor(project.team)}}
                onClick={() => setSelectedProject(project)}
              >
              <div className="project-header">
                <div>
                  <h3 className="project-title">{project.title}</h3>
                  <div 
                    className="project-team"
                    style={{ backgroundColor: 'var(--muted)' }}
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
                      width: `${calculateProgress(project.startDate, project.dueDate, project.status)}%`,
                      backgroundColor: 'var(--accent)'
                    }}
                  />
                </div>
                <div style={{ marginTop: '0.5rem', fontSize: '0.9rem' }}>
                  Progress: {calculateProgress(project.startDate, project.dueDate, project.status)}%
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
                  <div 
                    className="tasks-header" 
                    onClick={(e) => toggleTasksExpanded(project.id, e)}
                    style={{ cursor: 'pointer', userSelect: 'none' }}
                  >
                    <h4 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <i className={`fas fa-chevron-${expandedTasks[project.id] ? 'down' : 'right'}`}></i>
                      Tasks ({project.tasks.length})
                    </h4>
                    {canEdit && expandedTasks[project.id] && (
                      <button 
                        className="add-button" 
                        style={{ fontSize: '0.8rem', padding: '0.5rem 1rem' }}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAddTask(project.id);
                        }}
                      >
                        + Task
                      </button>
                    )}
                  </div>
                  {expandedTasks[project.id] && (
                    <div className="tasks-list">
                      {project.tasks.map(task => (
                        <div key={task.id} className="task-item">
                          <div className="task-info">
                            <div className="task-title">{task.title}</div>
                            <div className="task-meta">
                              Due: {new Date(task.dueDate).toLocaleDateString()} | 
                              Status: {task.status} | 
                              Progress: {calculateProgress(task.startDate, task.dueDate, task.status)}%
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
                                  className="icon-btn edit"
                                  title="Edit task"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleEditTask(project, task);
                                  }}
                                >
                                  <i className="fas fa-edit"></i>
                                </button>
                                <button 
                                  className="icon-btn delete"
                                  title="Delete task"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleDeleteTask(project.id, task.id);
                                  }}
                                >
                                  <i className="fas fa-trash"></i>
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {project.weeklyNotes && (
                <div className="weekly-notes-section" style={{ 
                  marginTop: '1rem',
                  padding: '0.75rem',
                  background: 'var(--card)',
                  borderRadius: '8px',
                  border: '1px solid var(--muted)'
                }}>
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '0.5rem',
                    marginBottom: '0.5rem',
                    fontWeight: 600,
                    fontSize: '0.9rem',
                    color: 'var(--text)'
                  }}>
                    <i className="fas fa-clipboard-list" style={{ color: 'var(--accent)' }}></i>
                    Weekly Notes
                  </div>
                  <div style={{ 
                    fontSize: '0.85rem',
                    color: 'var(--subtxt)',
                    whiteSpace: 'pre-wrap',
                    maxHeight: '4em',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical'
                  }}>
                    {project.weeklyNotes}
                  </div>
                </div>
              )}

              {canEdit && (
                <div className="action-buttons" style={{ marginTop: '1rem' }}>
                  <button className="icon-btn edit" title="Edit project" onClick={() => handleEditProject(project)}>
                    <i className="fas fa-edit"></i>
                  </button>
                  <button 
                    className="icon-btn delete"
                    title="Delete project"
                    onClick={() => handleDeleteItem('project', project.id)}
                  >
                    <i className="fas fa-trash"></i>
                  </button>
                </div>
              )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Project Detail Modal */}
      {selectedProject && !isEditing && (
        <div className="modal-overlay" onClick={(e) => {
          if (e.target === e.currentTarget) setSelectedProject(null);
        }}>
          <div className="modal project-detail-modal">
            <div className="modal-project-header">
              <div className="modal-project-info">
                <h2>{selectedProject.title}</h2>
                <div className="modal-badges">
                  <div 
                    className="project-team"
                    style={{ backgroundColor: 'var(--muted)' }}
                  >
                    {getTeamName(selectedProject.team)}
                  </div>
                  <div
                    className="project-status"
                    style={{ backgroundColor: getStatusColor(selectedProject.status, selectedProject.dueDate) }}
                  >
                    {isOverdue(selectedProject.dueDate, selectedProject.status) ? 'OVERDUE' : selectedProject.status.toUpperCase()}
                  </div>
                  <div
                    className="project-status"
                    style={{ backgroundColor: selectedProject.priority === 'critical' ? 'var(--accent)' : 'var(--muted)' }}
                  >
                    {selectedProject.priority.toUpperCase()}
                  </div>
                </div>
              </div>
              <button className="close-btn" onClick={() => setSelectedProject(null)}>×</button>
            </div>

            <p style={{color: 'var(--subtxt)', marginBottom: '1.5rem'}}>{selectedProject.description}</p>

            <div className="modal-project-meta">
              <div className="meta-item">
                <div className="meta-label">Assigned To</div>
                <div className="meta-value">{selectedProject.assignedTo}</div>
              </div>
              <div className="meta-item">
                <div className="meta-label">Start Date</div>
                <div className="meta-value">{new Date(selectedProject.startDate).toLocaleDateString()}</div>
              </div>
              <div className="meta-item">
                <div className="meta-label">Due Date</div>
                <div className="meta-value">{new Date(selectedProject.dueDate).toLocaleDateString()}</div>
              </div>
              <div className="meta-item">
                <div className="meta-label">Progress</div>
                <div className="meta-value">{calculateProgress(selectedProject.startDate, selectedProject.dueDate, selectedProject.status)}%</div>
              </div>
              <div className="meta-item">
                <div className="meta-label">Hours</div>
                <div className="meta-value">{selectedProject.actualHours} / {selectedProject.estimatedHours}</div>
              </div>
            </div>

            <div className="project-progress">
              <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem'}}>
                <span style={{fontWeight: 600, color: 'var(--text)'}}>Overall Progress</span>
                <span style={{fontWeight: 700, color: 'var(--accent)'}}>{calculateProgress(selectedProject.startDate, selectedProject.dueDate, selectedProject.status)}%</span>
              </div>
              <div className="progress-bar" style={{height: '12px'}}>
                <div 
                  className="progress-fill"
                  style={{ 
                    width: `${calculateProgress(selectedProject.startDate, selectedProject.dueDate, selectedProject.status)}%`,
                    backgroundColor: 'var(--accent)'
                  }}
                />
              </div>
            </div>

            {selectedProject.tasks && selectedProject.tasks.length > 0 && (
              <div className="modal-tasks-section">
                <div className="modal-tasks-header">
                  <h3 className="section-title">Tasks ({selectedProject.tasks.length})</h3>
                </div>
                <div className="task-list">
                  {selectedProject.tasks.map(task => (
                    <div key={task.id} className="task-card">
                      <div className="task-header">
                        <div className="task-title-group">
                          <h4>{task.title}</h4>
                          <div className="task-description">{task.description}</div>
                        </div>
                        <div
                          className="project-status"
                          style={{ 
                            backgroundColor: getStatusColor(task.status, task.dueDate),
                            fontSize: '0.75rem',
                            padding: '0.4rem 0.75rem',
                            marginLeft: '1rem'
                          }}
                        >
                          {isOverdue(task.dueDate, task.status) ? 'OVERDUE' : task.status.toUpperCase()}
                        </div>
                      </div>
                      
                      <div style={{display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem', fontSize: '0.85rem', color: 'var(--subtxt)', marginTop: '0.75rem'}}>
                        <div><strong>Assigned:</strong> {task.assignedTo}</div>
                        <div><strong>Due:</strong> {new Date(task.dueDate).toLocaleDateString()}</div>
                        <div><strong>Priority:</strong> {task.priority}</div>
                        <div><strong>Est. Hours:</strong> {task.estimatedHours}</div>
                      </div>

                      <div className="task-progress-section">
                        <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.9rem'}}>
                          <span>Progress</span>
                          <span style={{fontWeight: 'bold'}}>{calculateProgress(task.startDate, task.dueDate, task.status)}%</span>
                        </div>
                        <div className="progress-bar">
                          <div 
                            className="progress-fill"
                            style={{ 
                              width: `${calculateProgress(task.startDate, task.dueDate, task.status)}%`,
                              backgroundColor: 'var(--accent)'
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {selectedProject.weeklyNotes && (
              <div className="modal-weekly-notes-section" style={{ 
                marginTop: '1.5rem',
                padding: '1rem',
                background: 'var(--card)',
                borderRadius: '8px',
                border: '1px solid var(--muted)'
              }}>
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '0.5rem',
                  marginBottom: '0.75rem',
                  fontWeight: 600,
                  fontSize: '1rem',
                  color: 'var(--text)'
                }}>
                  <i className="fas fa-clipboard-list" style={{ color: 'var(--accent)' }}></i>
                  Weekly Notes
                </div>
                <div style={{ 
                  fontSize: '0.9rem',
                  color: 'var(--subtxt)',
                  whiteSpace: 'pre-wrap',
                  lineHeight: '1.6'
                }}>
                  {selectedProject.weeklyNotes}
                </div>
              </div>
            )}

            <div className="modal-actions">
              {canEdit && (
                <>
                  <button 
                    className="edit-btn" 
                    style={{padding: '0.75rem 1.5rem'}}
                    onClick={() => {
                      handleEditProject(selectedProject);
                      setSelectedProject(null);
                    }}
                  >
                    <i className="fas fa-edit"></i> Edit Project
                  </button>
                  <button 
                    className="delete-btn" 
                    style={{padding: '0.75rem 1.5rem'}}
                    onClick={() => {
                      handleDeleteItem('project', selectedProject.id);
                      setSelectedProject(null);
                    }}
                  >
                    <i className="fas fa-trash"></i> Delete Project
                  </button>
                </>
              )}
              <button 
                className="cancel-btn" 
                style={{padding: '0.75rem 1.5rem'}}
                onClick={() => setSelectedProject(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {isEditing && editingItem && (
        <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && setIsEditing(false)}>
          <div className="modal">
            <div className="modal-header">
              <h2 className="modal-title">
                {scheduleData.projects.find(p => p.id === editingItem.id) ? 'Edit Project' : 'Add Project'}
              </h2>
              <button className="close-btn" onClick={() => setIsEditing(false)}>×</button>
            </div>

            <div>
              <div className="form-group">
                  <label className="form-label">
                    Title <span style={{color: 'var(--accent)'}}>*</span>
                  </label>
                  <input
                    type="text"
                    className="form-input"
                    value={editingItem.title}
                    onChange={(e) => setEditingItem({...editingItem, title: e.target.value})}
                    placeholder="Enter project title"
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Description</label>
                  <textarea
                    className="form-textarea"
                    value={editingItem.description}
                    onChange={(e) => setEditingItem({...editingItem, description: e.target.value})}
                    placeholder="Enter project description"
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">
                      Team <span style={{color: 'var(--accent)'}}>*</span>
                    </label>
                    <select
                      className="form-select"
                      value={editingItem.team}
                      onChange={(e) => setEditingItem({...editingItem, team: e.target.value})}
                      required
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
                      placeholder="Team Lead / Owner Name"
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
                      disabled={!!editingItem.id}
                      style={editingItem.id ? { 
                        backgroundColor: 'var(--card)',
                        cursor: 'not-allowed',
                        opacity: 0.7 
                      } : {}}
                    />
                    {editingItem.id && (
                      <div style={{ 
                        fontSize: '0.75rem', 
                        color: 'var(--subtxt)', 
                        marginTop: '0.25rem',
                        fontStyle: 'italic'
                      }}>
                        <i className="fas fa-lock" style={{ marginRight: '0.25rem' }}></i>
                        Dates cannot be changed after project creation
                      </div>
                    )}
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      Due Date <span style={{color: 'var(--accent)'}}>*</span>
                    </label>
                    <input
                      type="date"
                      className="form-input"
                      value={editingItem.dueDate}
                      onChange={(e) => setEditingItem({...editingItem, dueDate: e.target.value})}
                      required
                      disabled={!!editingItem.id}
                      style={editingItem.id ? { 
                        backgroundColor: 'var(--card)',
                        cursor: 'not-allowed',
                        opacity: 0.7 
                      } : {}}
                    />
                    {editingItem.id && (
                      <div style={{ 
                        fontSize: '0.75rem', 
                        color: 'var(--subtxt)', 
                        marginTop: '0.25rem',
                        fontStyle: 'italic'
                      }}>
                        <i className="fas fa-lock" style={{ marginRight: '0.25rem' }}></i>
                        Dates cannot be changed after project creation
                      </div>
                    )}
                  </div>
                </div>
                
                {!editingItem.id && (
                  <div style={{ 
                    fontSize: '0.85rem', 
                    color: 'var(--accent)', 
                    marginBottom: '1rem',
                    padding: '0.5rem',
                    background: 'rgba(239, 68, 68, 0.1)',
                    borderRadius: '4px',
                    border: '1px solid var(--accent)'
                  }}>
                    <i className="fas fa-exclamation-triangle" style={{ marginRight: '0.5rem' }}></i>
                    <strong>Important:</strong> Once this project is created, the start and due dates cannot be changed. Choose them carefully.
                  </div>
                )}

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
                </div>

                {/* Progress is auto-calculated based on start date, due date, and current date */}
                {editingItem.startDate && editingItem.dueDate && (
                  <div className="form-group">
                    <label className="form-label">Calculated Progress</label>
                    <div style={{
                      padding: '0.75rem',
                      background: 'var(--card)',
                      borderRadius: '8px',
                      color: 'var(--text)'
                    }}>
                      {calculateProgress(editingItem.startDate, editingItem.dueDate, editingItem.status)}% 
                      <span style={{ color: 'var(--subtxt)', fontSize: '0.9rem', marginLeft: '0.5rem' }}>
                        (Auto-calculated based on timeline)
                      </span>
                    </div>
                  </div>
                )}

                {/* Weekly Notes Section */}
                <div className="form-group">
                  <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    Weekly Notes
                    <span 
                      title="These notes are meant to be updated each week. When you save, the new notes will replace the previous version. Use this to track weekly progress and updates."
                      style={{ 
                        cursor: 'help',
                        color: 'var(--accent)',
                        fontSize: '1rem'
                      }}
                    >
                      <i className="fas fa-info-circle"></i>
                    </span>
                  </label>
                  <div style={{ 
                    fontSize: '0.85rem', 
                    color: 'var(--subtxt)', 
                    marginBottom: '0.5rem',
                    padding: '0.5rem',
                    background: 'var(--card)',
                    borderRadius: '4px',
                    border: '1px solid var(--muted)'
                  }}>
                    <i className="fas fa-lightbulb" style={{ marginRight: '0.5rem', color: 'var(--accent)' }}></i>
                    These notes are designed to be updated weekly. Each save overwrites the previous notes, so keep this as a "current status" field.
                  </div>
                  <textarea
                    className="form-textarea"
                    value={editingItem.weeklyNotes || ''}
                    onChange={(e) => setEditingItem({...editingItem, weeklyNotes: e.target.value})}
                    placeholder="Add weekly notes about project progress, blockers, or updates..."
                    style={{ minHeight: '120px' }}
                  />
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
                          <label className="form-label">
                            Task Title <span style={{color: 'var(--accent)'}}>*</span>
                          </label>
                          <input
                            type="text"
                            className="form-input"
                            value={task.title}
                            onChange={(e) => {
                              const newTasks = [...editingItem.tasks];
                              newTasks[index] = {...task, title: e.target.value};
                              setEditingItem({...editingItem, tasks: newTasks});
                            }}
                            placeholder="Enter task title"
                            required
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
                            placeholder="Enter task description"
                          />
                        </div>

                        {(!task.id || typeof task.id !== 'number') && (
                          <div style={{ 
                            fontSize: '0.8rem', 
                            color: 'var(--accent)', 
                            marginBottom: '0.75rem',
                            padding: '0.5rem',
                            background: 'rgba(239, 68, 68, 0.1)',
                            borderRadius: '4px',
                            border: '1px solid var(--accent)'
                          }}>
                            <i className="fas fa-exclamation-triangle" style={{ marginRight: '0.5rem' }}></i>
                            Task dates cannot be changed after creation. Choose carefully.
                          </div>
                        )}

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
                              disabled={!!task.id && typeof task.id === 'number'}
                              style={task.id && typeof task.id === 'number' ? { 
                                backgroundColor: 'var(--card)',
                                cursor: 'not-allowed',
                                opacity: 0.7 
                              } : {}}
                            />
                            {task.id && typeof task.id === 'number' && (
                              <div style={{ 
                                fontSize: '0.75rem', 
                                color: 'var(--subtxt)', 
                                marginTop: '0.25rem',
                                fontStyle: 'italic'
                              }}>
                                <i className="fas fa-lock" style={{ marginRight: '0.25rem' }}></i>
                                Dates locked after creation
                              </div>
                            )}
                          </div>

                          <div className="form-group">
                            <label className="form-label">
                              Due Date <span style={{color: 'var(--accent)'}}>*</span>
                            </label>
                            <input
                              type="date"
                              className="form-input"
                              value={task.dueDate}
                              onChange={(e) => {
                                const newTasks = [...editingItem.tasks];
                                newTasks[index] = {...task, dueDate: e.target.value};
                                setEditingItem({...editingItem, tasks: newTasks});
                              }}
                              required
                              disabled={!!task.id && typeof task.id === 'number'}
                              style={task.id && typeof task.id === 'number' ? { 
                                backgroundColor: 'var(--card)',
                                cursor: 'not-allowed',
                                opacity: 0.7 
                              } : {}}
                            />
                            {task.id && typeof task.id === 'number' && (
                              <div style={{ 
                                fontSize: '0.75rem', 
                                color: 'var(--subtxt)', 
                                marginTop: '0.25rem',
                                fontStyle: 'italic'
                              }}>
                                <i className="fas fa-lock" style={{ marginRight: '0.25rem' }}></i>
                                Dates locked after creation
                              </div>
                            )}
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
                              placeholder="Team Lead / Owner Name"
                              value={task.assignedTo}
                              onChange={(e) => {
                                const newTasks = [...editingItem.tasks];
                                newTasks[index] = {...task, assignedTo: e.target.value};
                                setEditingItem({...editingItem, tasks: newTasks});
                              }}
                            />
                          </div>

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
                        </div>

                        {/* Progress is auto-calculated based on start date, due date, and current date */}
                        {task.startDate && task.dueDate && (
                          <div className="form-group">
                            <label className="form-label">Calculated Progress</label>
                            <div style={{
                              padding: '0.75rem',
                              background: 'var(--card)',
                              borderRadius: '8px',
                              color: 'var(--text)'
                            }}>
                              {calculateProgress(task.startDate, task.dueDate, task.status)}% 
                              <span style={{ color: 'var(--subtxt)', fontSize: '0.9rem', marginLeft: '0.5rem' }}>
                                (Auto-calculated based on timeline)
                              </span>
                            </div>
                          </div>
                        )}
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
                        startDate: new Date().toISOString().split('T')[0],
                        dueDate: '',
                        estimatedHours: 0,
                        status: 'pending',
                        priority: 'medium',
                        assignedTo: ''
                      };
                      setEditingItem({...editingItem, tasks: [...editingItem.tasks, newTask]});
                    }}
                  >
                    + Add Task
                  </button>
                </div>
              </div>

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
});

ScheduleManager.displayName = 'ScheduleManager';

export default ScheduleManager;
