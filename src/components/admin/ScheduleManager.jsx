import { useState, useEffect, useMemo, forwardRef, useImperativeHandle } from 'react';
import { authService, AUTH_LEVELS } from '../../utils/auth';
import { supabaseService } from '../../utils/supabase';
import { useAlert } from '../../contexts/AlertContext';
import StatusDropdown from '../StatusDropdown';
import InlineNotesEditor from '../InlineNotesEditor';
import './ScheduleManager.css';

const ScheduleManager = forwardRef((props, ref) => {
  const { showAlert, showConfirm } = useAlert();
  const [scheduleData, setScheduleData] = useState({ teams: [], projects: [], lastUpdated: '' });
  const [activeView, setActiveView] = useState('overview');
  const [isEditing, setIsEditing] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTeam, setSelectedTeam] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [sortOption, setSortOption] = useState('priority');
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedDateInfo, setSelectedDateInfo] = useState(null); // { date: Date, items: [] }
  const [calendarView, setCalendarView] = useState('month'); // month, week
  const [currentDate, setCurrentDate] = useState(new Date());
  const [expandedTasks, setExpandedTasks] = useState({}); // Track which projects have tasks expanded

  // Role-based permissions
  const userLevel = authService.getLevel();
  const isMember = userLevel === AUTH_LEVELS.MEMBER;
  const isLeader = userLevel === AUTH_LEVELS.LEADER;
  const isDirector = userLevel === AUTH_LEVELS.DIRECTOR;
  const canEdit = authService.hasPermission('edit_schedules'); // Leaders and Directors can edit
  const canEditDates = isDirector; // Only Directors can edit dates

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
    const team = (normalizedTeams || []).find(t => t.id === teamId);
    return team ? team.name : teamId;
  };

  const getTeamColor = (teamId) => {
    const team = (normalizedTeams || []).find(t => t.id === teamId);
    return team ? team.color : '#6c757d';
  };

  // Normalize team ids so that any "technical-director" or "project-director"
  // map to a single `director` team. This allows the UI to treat both as
  // one Director role and display a single "Director" option.
  const normalizeTeamId = (teamId) => {
    if (!teamId) return teamId;
    const id = String(teamId).toLowerCase();
    if (id === 'technical-director' || id === 'project-director' || /technical director|project director/i.test(String(teamId))) return 'director';
    return teamId;
  };

  const normalizedTeams = useMemo(() => {
    const map = {};
    (scheduleData.teams || []).forEach(t => {
      const nid = normalizeTeamId(t.id);
      if (!map[nid]) {
        map[nid] = {
          id: nid,
          name: nid === 'director' ? 'Director' : t.name,
          color: t.color || '#6c757d'
        };
      } else {
        // prefer an assigned color if not present
        if (!map[nid].color && t.color) map[nid].color = t.color;
      }
    });

    // Ensure there's at least a Director option if projects reference it
    const hasDirectorFromProjects = (scheduleData.projects || []).some(p => normalizeTeamId(p.team) === 'director');
    if (hasDirectorFromProjects && !map['director']) {
      map['director'] = { id: 'director', name: 'Director', color: '#6c757d' };
    }

    return Object.values(map);
  }, [scheduleData.teams, scheduleData.projects]);

  // Helper function to format dates without timezone issues
  // When we store "2024-12-03", we want to display "12/3/2024" regardless of timezone
  const formatDateLocal = (dateString) => {
    if (!dateString) return '';
    const [year, month, day] = dateString.split('-');
    const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
    return date.toLocaleDateString();
  };

  // Helper function to format dates with custom options
  const formatDateLocalWithOptions = (dateString, options) => {
    if (!dateString) return '';
    const [year, month, day] = dateString.split('-');
    const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
    return date.toLocaleDateString('en-US', options);
  };

  // Helper function to parse date strings to Date objects in local timezone
  const parseDateLocal = (dateString) => {
    if (!dateString) return null;
    const [year, month, day] = dateString.split('-');
    return new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
  };

  const isOverdue = (dueDate, status) => {
    // Treat cancelled items like completed: they should never be marked overdue
    if (status === 'completed' || status === 'cancelled') return false;
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset time to midnight for accurate date comparison
    const due = parseDateLocal(dueDate);
    return due < today;
  };

  const getStatusColor = (status, dueDate) => {
    if (isOverdue(dueDate, status)) return '#dc3545'; // Red for overdue
    switch (status) {
      case 'completed': return '#28a745'; // Green for completed
      case 'in-progress': return '#6c757d'; // Gray for in-progress
      case 'pending': return '#ffc107'; // Yellow for pending
      case 'planning': return '#6c757d'; // Gray for planning
      case 'on-hold': return '#6c757d'; // Gray for on-hold
      case 'cancelled': return '#6c757d'; // Gray for cancelled
      case 'critical': return '#dc3545'; // Red for critical
      default: return '#6c757d'; // Gray default
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'planning': return 'Planning';
      case 'pending': return 'Pending';
      case 'in-progress': return 'In Progress';
      case 'completed': return 'Completed';
      case 'on-hold': return 'On Hold';
      case 'cancelled': return 'Canceled';
      default: return String(status || '').toString();
    }
  };

  const PROJECT_STATUSES = ['planning', 'in-progress', 'completed', 'on-hold', 'cancelled'];
  const TASK_STATUSES = ['in-progress', 'completed', 'blocked', 'cancelled'];

  // Sort option constants and comparator
  const SORT_OPTIONS = [
    { value: 'priority', label: 'Priority' },
    { value: 'due-asc', label: 'Due Date ↑' },
    { value: 'due-desc', label: 'Due Date ↓' },
    { value: 'title-asc', label: 'Title A→Z' },
    { value: 'title-desc', label: 'Title Z→A' },
    { value: 'status', label: 'Status' }
  ];

  const sortProjects = (a, b, option = sortOption) => {
    // Helper for safe date parsing; null/empty dates go to far future
    const safeDate = (d) => {
      if (!d) return new Date(8640000000000000);
      return parseDateLocal(d);
    };

    // Overdue check
    const aOver = isOverdue(a.dueDate, a.status);
    const bOver = isOverdue(b.dueDate, b.status);

    switch (option) {
      case 'priority':
        // Overdue items always come first
        if (aOver !== bOver) return aOver ? -1 : 1;

        // For sorting we need safe due dates for both
        const aDue = safeDate(a.dueDate);
        const bDue = safeDate(b.dueDate);

        // Completed / cancelled should be grouped at the bottom,
        // but within that group we want the most-future due dates first
        const lowStatus = (s) => (s === 'completed' || s === 'cancelled');
        const aLow = lowStatus(a.status);
        const bLow = lowStatus(b.status);
        if (aLow && bLow) {
          // Both completed/cancelled: newest (furthest in future) first
          return bDue - aDue;
        }
        if (aLow !== bLow) return aLow ? 1 : -1; // put low status items after active ones

        // Remaining (active) items: show closest due date first
        if (aDue - bDue !== 0) return aDue - bDue;

        // Then by priority (critical, high, medium, low)
        const pr = { critical: 3, high: 2, medium: 1, low: 0 };
        const pa = pr[a.priority] || 0;
        const pb = pr[b.priority] || 0;
        if (pa !== pb) return pb - pa; // higher priority first

        return a.title.localeCompare(b.title);

      case 'due-asc':
        return safeDate(a.dueDate) - safeDate(b.dueDate);
      case 'due-desc':
        return safeDate(b.dueDate) - safeDate(a.dueDate);
      case 'title-asc':
        return a.title.localeCompare(b.title);
      case 'title-desc':
        return b.title.localeCompare(a.title);
      case 'status':
        // Use PROJECT_STATUSES order
        const idx = (s) => PROJECT_STATUSES.indexOf(s) === -1 ? PROJECT_STATUSES.length : PROJECT_STATUSES.indexOf(s);
        return idx(a.status) - idx(b.status) || a.title.localeCompare(b.title);
      default:
        return 0;
    }
  };

  const handleProjectStatusChange = async (project, newStatus) => {
    if (!canEdit) {
      showAlert('You do not have permission to change project status. Only team leaders and directors can edit schedules.', 'error');
      return;
    }
    
    try {
      // Optimistic UI update
      const newProgress = newStatus === 'completed' 
        ? 100 
        : calculateProgress(project.startDate, project.dueDate, newStatus);

      setScheduleData(prev => ({
        ...prev,
        projects: prev.projects.map(p => p.id === project.id ? { ...p, status: newStatus, progress: newProgress } : p)
      }));

      await supabaseService.updateProjectFields(project.id, { status: newStatus, progress: newProgress });
    } catch (error) {
      console.error('Failed to update project status:', error);
      showAlert(`Failed to update status: ${error.message}`, 'error');
      // Reload to revert optimistic update
      await loadScheduleData();
    }
  };

  const handleTaskStatusChange = async (projectId, task, newStatus) => {
    if (!canEdit) {
      showAlert('You do not have permission to change task status. Only team leaders and directors can edit schedules.', 'error');
      return;
    }
    
    try {
      const newProgress = newStatus === 'completed' 
        ? 100 
        : calculateProgress(task.startDate, task.dueDate, newStatus);

      // Optimistic UI update
      setScheduleData(prev => ({
        ...prev,
        projects: prev.projects.map(p => p.id === projectId 
          ? { ...p, tasks: (p.tasks || []).map(t => t.id === task.id ? { ...t, status: newStatus, progress: newProgress } : t) } 
          : p)
      }));

      await supabaseService.updateTaskFields(task.id, { status: newStatus, progress: newProgress });
    } catch (error) {
      console.error('Failed to update task status:', error);
      showAlert(`Failed to update task status: ${error.message}`, 'error');
      await loadScheduleData();
    }
  };
  const handleWeeklyNotesSave = async (project, newNotes) => {
    if (!canEdit) {
      showAlert('You do not have permission to edit weekly notes. Only team leaders and directors can edit schedules.', 'error');
      return;
    }
    
    try {
      setScheduleData(prev => ({
        ...prev,
        projects: prev.projects.map(p => p.id === project.id ? { ...p, weeklyNotes: newNotes } : p)
      }));
      await supabaseService.updateProjectFields(project.id, { weekly_notes: newNotes });
      showAlert('Weekly notes saved', 'success');
    } catch (error) {
      console.error('Failed to save weekly notes:', error);
      showAlert(`Failed to save weekly notes: ${error.message}`, 'error');
      await loadScheduleData();
    }
  };

  const calculateProgress = (startDate, dueDate, status) => {
    // Consider cancelled projects/tasks as finished for progress calculations
    if (status === 'completed' || status === 'cancelled') return 100;
    if (!startDate || !dueDate) return 0;
    
    const start = parseDateLocal(startDate);
    const due = parseDateLocal(dueDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
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
    if (!canEdit) {
      showAlert('You do not have permission to add projects. Only team leaders and directors can edit schedules.', 'error');
      return;
    }
    
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
    if (!canEdit) {
      showAlert('You do not have permission to edit projects. Only team leaders and directors can edit schedules.', 'error');
      return;
    }
    
    setEditingItem({ ...project, type: 'project' });
    setIsEditing(true);
  };

  const handleEditTask = (project, task) => {
    if (!canEdit) {
      showAlert('You do not have permission to edit tasks. Only team leaders and directors can edit schedules.', 'error');
      return;
    }
    
    setEditingItem({
      ...project,
      type: 'project',
      editingTaskId: task.id
    });
    setIsEditing(true);
  };

  const handleDeleteTask = async (projectId, taskId) => {
    if (!canEdit) {
      showAlert('You do not have permission to delete tasks. Only team leaders and directors can edit schedules.', 'error');
      return;
    }
    
    const confirmed = await showConfirm(
      'Are you sure you want to delete this task? This action cannot be undone.',
      'Delete Task',
      'Delete',
      'Cancel'
    );
    if (!confirmed) return;
    
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
    if (!canEdit) {
      showAlert('You do not have permission to add tasks. Only team leaders and directors can edit schedules.', 'error');
      return;
    }
    
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
      
      if (!canEdit) {
        showAlert('You do not have permission to save changes. Only team leaders and directors can edit schedules.', 'error');
        return;
      }
      
      if (editingItem.type === 'project') {
        // Validate required fields for project
        if (!editingItem.title || editingItem.title.trim() === '') {
          showAlert('Project title is required', 'error');
          return;
        }
        if (!editingItem.priority || editingItem.priority.trim() === '') {
          showAlert('Project priority is required', 'error');
          return;
        }
        if (!editingItem.status || editingItem.status.trim() === '') {
          showAlert('Project status is required', 'error');
          return;
        }
        if (!editingItem.assignedTo || editingItem.assignedTo.trim() === '') {
          showAlert('Project assigned to is required', 'error');
          return;
        }
        if (!editingItem.startDate || editingItem.startDate.trim() === '') {
          showAlert('Project start date is required', 'error');
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
        
        // No validation blocking team leaders from creating projects - they can set dates when creating
        
        // Validate required fields for each task
        if (editingItem.tasks && editingItem.tasks.length > 0) {
          for (const [i, task] of editingItem.tasks.entries()) {
            if (!task.title || task.title.trim() === '') {
              showAlert(`Task ${i + 1}: Title is required`, 'error');
              return;
            }
            if (!task.priority || task.priority.trim() === '') {
              showAlert(`Task ${i + 1}: Priority is required`, 'error');
              return;
            }
            if (!task.status || task.status.trim() === '') {
              showAlert(`Task ${i + 1}: Status is required`, 'error');
              return;
            }
            if (!task.assignedTo || task.assignedTo.trim() === '') {
              showAlert(`Task ${i + 1}: Assigned to is required`, 'error');
              return;
            }
            if (!task.startDate || task.startDate.trim() === '') {
              showAlert(`Task ${i + 1}: Start date is required`, 'error');
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
    if (!canEdit) {
      showAlert('You do not have permission to delete items. Only team leaders and directors can edit schedules.', 'error');
      return;
    }
    
    const itemTypeName = itemType === 'project' ? 'project' : 'item';
    const deleteMessage = itemType === 'project' 
      ? (
          <div className="alert-message-section">
            <div className="alert-message-main">
              Are you sure you want to delete this project?
            </div>
            <div className="alert-message-details">
              This action cannot be undone and will delete all associated tasks.
            </div>
            <div className="alert-message-note">
              <svg className="alert-message-note-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="16" x2="12" y2="12"></line>
                <line x1="12" y1="8" x2="12.01" y2="8"></line>
              </svg>
              <div className="alert-message-note-content">
                <div className="alert-message-note-title">Note:</div>
                <div className="alert-message-note-text">
                  We prefer not to delete projects as it's valuable to keep a record of past work for tracking and reference purposes. Consider marking the project as "Completed" or "Cancelled" instead, unless deletion is absolutely necessary.
                </div>
              </div>
            </div>
          </div>
        )
      : `Are you sure you want to delete this ${itemTypeName}? This action cannot be undone.`;
    
    const confirmed = await showConfirm(
      deleteMessage,
      `Delete ${itemTypeName.charAt(0).toUpperCase() + itemTypeName.slice(1)}`,
      'Delete',
      'Cancel'
    );
    if (!confirmed) return;
    
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
    return items.filter(item => normalizeTeamId(item[teamKey]) === selectedTeam);
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

  const openDateModal = (date) => {
    const items = getItemsForDate(date);
    setSelectedDateInfo({ date, items });
  };

  const getUpcomingDeadlines = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const nextWeek = new Date(today);
    nextWeek.setDate(nextWeek.getDate() + 7);
    
    return scheduleData.projects
      .filter(p => {
        const dueDate = parseDateLocal(p.dueDate);
        return dueDate >= today && dueDate <= nextWeek && p.status !== 'completed';
      })
      .sort((a, b) => parseDateLocal(a.dueDate) - parseDateLocal(b.dueDate));
  };

  // Calculate team statistics
  const teamStats = useMemo(() => {
    return (normalizedTeams || []).map(team => {
      const teamProjects = scheduleData.projects.filter(p => normalizeTeamId(p.team) === team.id);
      const completed = teamProjects.filter(p => p.status === 'completed').length;
      // Count both 'in-progress' and 'planning' as active
      const active = teamProjects.filter(p => p.status === 'in-progress' || p.status === 'planning').length;
      const overdue = teamProjects.filter(p => isOverdue(p.dueDate, p.status)).length;
      const avgProgress = teamProjects.length > 0 
        ? Math.round(teamProjects.reduce((sum, p) => sum + calculateProgress(p.startDate, p.dueDate, p.status), 0) / teamProjects.length)
        : 0;
      
      return {
        ...team,
        totalProjects: teamProjects.length,
        completed,
        active,
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

  if (isLoading) {
    return <div className="loading">Loading schedule data...</div>;
  }

  return (
    <div className="schedule-manager">

      <div className="schedule-header">
        <h1 className="schedule-title">Schedule Manager</h1>
      </div>

      <div className="view-tabs">
        <div className="view-tabs-left">
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
        {canEdit && (
          <button className="add-button" onClick={handleAddProject}>
            <i className="fas fa-plus"></i> New Project
          </button>
        )}
      </div>

      {/* Overview Dashboard */}
      {activeView === 'overview' && (
        <div className="overview-dashboard">
          {/* Overall Statistics */}
          <div className="stats-grid">
            <div 
              className="stat-card"
              onClick={() => {
                setActiveView('projects');
                setSelectedTeam('all');
                setSelectedStatus('all');
              }}
              style={{cursor: 'pointer'}}
              title="Click to view all projects"
            >
              <div className="stat-label">Total Projects</div>
              <div className="stat-value">{overallStats.totalProjects}</div>
            </div>
            <div 
              className="stat-card"
              onClick={() => {
                setActiveView('projects');
                setSelectedTeam('all');
                setSelectedStatus('completed');
              }}
              style={{cursor: 'pointer'}}
              title="Click to view completed projects"
            >
                <div className="stat-label">Completed</div>
                <div
                  className="stat-value"
                  style={{
                    color: 'var(--subtxt)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem'
                  }}
                >
                  {overallStats.completed}
                  <span style={{fontSize: '0.9rem', color: 'var(--muted)'}}>
                    {overallStats.totalProjects > 0 ? Math.round(overallStats.completed / overallStats.totalProjects * 100) : 0}%
                  </span>
                </div>
            </div>
            <div 
              className="stat-card"
              onClick={() => {
                setActiveView('projects');
                setSelectedTeam('all');
                setSelectedStatus('in-progress');
              }}
              style={{cursor: 'pointer'}}
              title="Click to view in-progress projects"
            >
              <div className="stat-label">In Progress</div>
              <div className="stat-value" style={{color: 'var(--text)'}}>{overallStats.inProgress}</div>
            </div>
            <div 
              className="stat-card" 
              onClick={() => {
                setActiveView('projects');
                setSelectedTeam('all');
                setSelectedStatus('overdue');
              }}
              style={{cursor: 'pointer'}}
              title="Click to view overdue projects"
            >
              <div className="stat-label">Overdue</div>
              <div className="stat-value" style={{color: 'var(--accent)'}}>{overallStats.overdue}</div>
            </div>
            <div 
              className="stat-card"
              onClick={() => {
                setActiveView('projects');
                setSelectedTeam('all');
                setSelectedStatus('all');
              }}
              style={{cursor: 'pointer'}}
              title="Click to view all projects"
            >
              <div className="stat-label" style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                Avg Progress
                <span
                  title="Average progress is calculated by averaging the percent completion of all projects, based on their start and due dates, and current status. Completed projects are 100%. Projects in progress or planning are calculated by how far along the timeline they are."
                  style={{ cursor: 'help', color: 'var(--accent)', fontSize: '1.1rem' }}
                >
                  <i className="fas fa-info-circle"></i>
                </span>
              </div>
              <div className="stat-value">{overallStats.avgProgress}%</div>
            </div>
          </div>

          {/* Team Overview Cards */}
          <h2 className="section-title">Teams Overview</h2>
          <div className="teams-overview">
            {teamStats.map(team => (
              <div 
                key={team.id} 
                className="team-card"
                style={{'--team-color': team.color}}
                onClick={() => {
                  setSelectedTeam(team.id);
                  setSelectedStatus('all');
                  setActiveView('projects');
                }}
              >
                <div className="team-header">
                  <h3 className="team-name">{team.name}</h3>
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
                    <div className="team-stat-value" style={{color: 'var(--text)'}}>{team.active}</div>
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

          {/* Upcoming Deadlines */}
          <div className="upcoming-deadlines">
            <h2 className="section-title">Upcoming Deadlines</h2>
            {(() => {
              // Get the 4 closest upcoming projects (not completed, due date in the future), sorted by due date
              const upcoming = scheduleData.projects
                .filter(p => p.status !== 'completed' && p.dueDate)
                .sort((a, b) => parseDateLocal(a.dueDate) - parseDateLocal(b.dueDate))
                .slice(0, 4);
              if (upcoming.length === 0) {
                return (
                  <p style={{color: 'var(--subtxt)', textAlign: 'center', padding: '2rem'}}>
                    No upcoming deadlines
                  </p>
                );
              }
              return upcoming.map(project => (
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
                    {formatDateLocalWithOptions(project.dueDate, { month: 'short', day: 'numeric' })}
                  </div>
                </div>
              ));
            })()}
          </div>
        </div>
      )}

      {/* Calendar View */}
      {activeView === 'calendar' && (
        <div className="calendar-view">
          <div className="calendar-header">
            <div className="calendar-nav">
              <button
                className="calendar-arrow-btn"
                aria-label="Previous month"
                onClick={() => {
                  const newDate = new Date(currentDate);
                  newDate.setMonth(newDate.getMonth() - 1);
                  setCurrentDate(newDate);
                }}
              >
                <i className="fas fa-chevron-left" aria-hidden="true"></i>
              </button>
              <div className="calendar-month">
                {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              </div>
              <button
                className="calendar-arrow-btn"
                aria-label="Next month"
                onClick={() => {
                  const newDate = new Date(currentDate);
                  newDate.setMonth(newDate.getMonth() + 1);
                  setCurrentDate(newDate);
                }}
              >
                <i className="fas fa-chevron-right" aria-hidden="true"></i>
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
                <div 
                  key={date.toISOString()} 
                  className={`calendar-day ${isToday ? 'today' : ''}`}
                  onClick={() => openDateModal(date)}
                >
                  <div className="calendar-date">{date.getDate()}</div>
                  <div className="calendar-items">
                    {items.slice(0, 2).map(item => (
                      <div 
                        key={`${item.itemType}-${item.id}`}
                        className="calendar-item"
                        style={{
                          backgroundColor: getTeamColor(item.team)
                        }}
                        onClick={(e) => {
                          e.stopPropagation();
                          if (item.itemType === 'project') {
                            setSelectedProject(item);
                          }
                        }}
                        title={item.title}
                      >
                        {item.title}
                      </div>
                    ))}
                    {items.length > 2 && (
                      <div 
                        className="calendar-more"
                        onClick={(e) => { e.stopPropagation(); openDateModal(date); }}
                        title={`${items.length} items on this day`}
                      >
                        +{items.length - 2} more
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
                {(normalizedTeams || []).map(team => (
                  <option key={team.id} value={team.id}>{team.name}</option>
                ))}
              </select>

              <label htmlFor="status-filter" style={{fontWeight: 600, color: 'var(--text)'}}>
                Status:
              </label>
              <select 
                id="status-filter"
                className="team-filter"
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
              >
                <option value="all">All Statuses</option>
                {PROJECT_STATUSES.map(st => (
                  <option key={st} value={st}>{getStatusLabel(st)}</option>
                ))}
                <option value="overdue">Overdue</option>
              </select>
              
              <label htmlFor="sort-select" style={{fontWeight: 600, color: 'var(--text)'}}>
                Sort:
              </label>
              <select
                id="sort-select"
                className="team-filter"
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
              >
                {SORT_OPTIONS.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="projects-grid">
            {filterItemsByTeam(scheduleData.projects)
              .filter(p => {
                if (selectedStatus === 'all') return true;
                if (selectedStatus === 'overdue') return isOverdue(p.dueDate, p.status);
                return p.status === selectedStatus;
              })
              .sort((a, b) => sortProjects(a, b, sortOption))
              .map(project => (
              <div 
                key={project.id} 
                className={`project-card ${isOverdue(project.dueDate, project.status) ? 'overdue' : ''}`}
                style={{'--team-color': getTeamColor(project.team)}}
                onClick={() => setSelectedProject(project)}
              >
              <div className="project-header" style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                <div className="project-header-left" style={{ flex: 1, minWidth: 0 }}>
                  <h3 className="project-title" style={{ margin: 0, wordBreak: 'break-word', whiteSpace: 'normal' }}>{project.title}</h3>
                  <div 
                    className="project-team"
                    style={{ backgroundColor: 'var(--muted)' }}
                  >
                    {getTeamName(project.team)}
                  </div>
                </div>

                <div className="project-status-wrapper" style={{ flex: '0 0 auto', whiteSpace: 'nowrap', alignSelf: 'center' }}>
                  {canEdit ? (
                    <StatusDropdown
                      value={project.status}
                      options={PROJECT_STATUSES}
                      color={getStatusColor(project.status, project.dueDate)}
                      onChange={(status) => handleProjectStatusChange(project, status)}
                      className="status-dropdown"
                    />
                  ) : (
                    <div
                      className="project-status"
                      style={{ backgroundColor: getStatusColor(project.status, project.dueDate), whiteSpace: 'nowrap' }}
                    >
                      {isOverdue(project.dueDate, project.status) ? 'OVERDUE' : project.status.toUpperCase()}
                    </div>
                  )}
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

              <div className="project-meta" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', margin: '1rem 0', fontSize: '0.9rem', color: 'var(--subtxt)' }}>
                <div style={{ gridColumn: '1 / 2' }}><strong>Assigned:</strong> {project.assignedTo}</div>
                <div style={{ gridColumn: '2 / 3' }}>
                  <strong>Due:</strong> <span className={isOverdue(project.dueDate, project.status) ? 'due-date-overdue' : ''}>{formatDateLocal(project.dueDate)}</span>
                </div>
                <div style={{ gridColumn: '1 / 2', gridRow: '2 / 3' }}><strong>Priority:</strong> {project.priority}</div>
                <div style={{ gridColumn: '2 / 3', gridRow: '2 / 3' }}><strong>Hours:</strong> {project.actualHours}/{project.estimatedHours}</div>
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
                              Due: {formatDateLocal(task.dueDate)} | 
                              Progress: {calculateProgress(task.startDate, task.dueDate, task.status)}%
                            </div>
                          </div>
                          <div className="task-actions">
                            {canEdit ? (
                              <StatusDropdown
                                value={task.status}
                                options={TASK_STATUSES}
                                color={getStatusColor(task.status, task.dueDate)}
                                onChange={(status) => handleTaskStatusChange(project.id, task, status)}
                                className="task-status"
                              />
                            ) : (
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
                            )}
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

              <div className="weekly-notes-section" onClick={(e) => e.stopPropagation()} style={{ 
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
                <InlineNotesEditor
                  value={project.weeklyNotes}
                  onSave={(val) => handleWeeklyNotesSave(project, val)}
                  disabled={!canEdit}
                  rows={4}
                  placeholder="Add weekly notes..."
                />
              </div>

              {canEdit && (
                <div className="action-buttons" style={{ marginTop: '1rem' }}>
                  <button className="icon-btn edit" title="Edit project" onClick={(e) => { e.stopPropagation(); handleEditProject(project); }}>
                    <i className="fas fa-edit"></i>
                  </button>
                  <button 
                    className="icon-btn delete"
                    title="Delete project"
                    onClick={(e) => { e.stopPropagation(); handleDeleteItem('project', project.id); }}
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
      {/* Day Details Modal */}
      {selectedDateInfo && !isEditing && !selectedProject && (
        <div className="modal-overlay" onClick={(e) => { if (e.target === e.currentTarget) setSelectedDateInfo(null); }}>
          <div className="modal">
            <div className="modal-header">
              <h2 className="modal-title">
                {selectedDateInfo.date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
              </h2>
              <button className="close-btn" onClick={() => setSelectedDateInfo(null)}>×</button>
            </div>
            {selectedDateInfo.items.length === 0 ? (
              <p style={{ color: 'var(--subtxt)', textAlign: 'center', padding: '1rem' }}>No projects due on this day.</p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {selectedDateInfo.items.map((project) => (
                  <div 
                    key={project.id}
                    className="deadline-item"
                    style={{ '--team-color': getTeamColor(project.team) }}
                    onClick={() => { setSelectedProject(project); setSelectedDateInfo(null); }}
                  >
                    <div className="deadline-info">
                      <div className="deadline-title">{project.title}</div>
                      <div className="deadline-meta">
                        {getTeamName(project.team)} • {project.assignedTo} • {calculateProgress(project.startDate, project.dueDate, project.status)}% complete
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <div
                        className="project-status"
                        style={{ backgroundColor: getStatusColor(project.status, project.dueDate) }}
                      >
                        {isOverdue(project.dueDate, project.status) ? 'OVERDUE' : project.status.toUpperCase()}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            <div className="modal-actions">
              <button className="cancel-btn" onClick={() => setSelectedDateInfo(null)}>Close</button>
            </div>
          </div>
        </div>
      )}
      
      {/* Project Detail Modal */}
      {selectedProject && !isEditing && (
        <div className="modal-overlay" onClick={(e) => {
          if (e.target === e.currentTarget) setSelectedProject(null);
        }}>
          <div className="modal project-detail-modal">
            <div className="modal-project-header" style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', justifyContent: 'space-between' }}>
                  <div className="modal-project-info" style={{ flex: 1, minWidth: 0 }}>
                    <h2 style={{ margin: 0, wordBreak: 'break-word', whiteSpace: 'normal' }}>{selectedProject.title}</h2>
                    <div className="modal-badges">
                  <div 
                    className="project-team"
                    style={{ backgroundColor: 'var(--muted)' }}
                  >
                    {getTeamName(selectedProject.team)}
                  </div>
                  {canEdit ? (
                    <StatusDropdown
                      value={selectedProject.status}
                      options={PROJECT_STATUSES}
                      color={getStatusColor(selectedProject.status, selectedProject.dueDate)}
                      onChange={(status) => handleProjectStatusChange(selectedProject, status)}
                    />
                  ) : (
                    <div
                      className="project-status"
                      style={{ backgroundColor: getStatusColor(selectedProject.status, selectedProject.dueDate) }}
                    >
                      {isOverdue(selectedProject.dueDate, selectedProject.status) ? 'OVERDUE' : selectedProject.status.toUpperCase()}
                    </div>
                  )}
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
                <div className="meta-value">{formatDateLocal(selectedProject.startDate)}</div>
              </div>
              <div className="meta-item">
                <div className="meta-label">Due Date</div>
                <div className="meta-value">{formatDateLocal(selectedProject.dueDate)}</div>
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
                        {canEdit ? (
                          <StatusDropdown
                            value={task.status}
                            options={TASK_STATUSES}
                            color={getStatusColor(task.status, task.dueDate)}
                            onChange={(status) => handleTaskStatusChange(selectedProject.id, task, status)}
                            className="task-status"
                          />
                        ) : (
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
                        )}
                      </div>
                      
                      <div style={{display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem', fontSize: '0.85rem', color: 'var(--subtxt)', marginTop: '0.75rem'}}>
                        <div><strong>Assigned:</strong> {task.assignedTo}</div>
                        <div><strong>Due:</strong> {formatDateLocal(task.dueDate)}</div>
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

            <div className="modal-weekly-notes-section" onClick={(e) => e.stopPropagation()} style={{ 
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
              <InlineNotesEditor
                value={selectedProject.weeklyNotes}
                onSave={(val) => handleWeeklyNotesSave(selectedProject, val)}
                disabled={!canEdit}
                rows={6}
                placeholder="Add weekly notes..."
              />
            </div>

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
                      {(normalizedTeams || []).map(team => (
                        <option key={team.id} value={team.id}>{team.name}</option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      Priority <span style={{color: 'var(--accent)'}}>*</span>
                    </label>
                    <select
                      className="form-select"
                      value={editingItem.priority}
                      onChange={(e) => setEditingItem({...editingItem, priority: e.target.value})}
                      required
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
                    <label className="form-label">
                      Status <span style={{color: 'var(--accent)'}}>*</span>
                    </label>
                    <select
                      className="form-select"
                      value={editingItem.status}
                      onChange={(e) => setEditingItem({...editingItem, status: e.target.value})}
                      required
                    >
                      <option value="planning">Planning</option>
                      <option value="in-progress">In Progress</option>
                      <option value="completed">Completed</option>
                      <option value="on-hold">On Hold</option>
                      <option value="cancelled">Canceled</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      Assigned To <span style={{color: 'var(--accent)'}}>*</span>
                    </label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="Team Lead / Owner Name"
                      value={editingItem.assignedTo}
                      onChange={(e) => setEditingItem({...editingItem, assignedTo: e.target.value})}
                      required
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">
                      Start Date <span style={{color: 'var(--accent)'}}>*</span>
                    </label>
                    <input
                      type="date"
                      className="form-input"
                      value={editingItem.startDate}
                      onChange={(e) => setEditingItem({...editingItem, startDate: e.target.value})}
                      required
                      disabled={editingItem.id && !canEditDates}
                      style={editingItem.id && !canEditDates ? { 
                        backgroundColor: 'var(--card)',
                        cursor: 'not-allowed',
                        opacity: 0.7 
                      } : {}}
                    />
                    {editingItem.id && !canEditDates && (
                      <div style={{ 
                        fontSize: '0.75rem', 
                        color: 'var(--accent)', 
                        marginTop: '0.25rem',
                        fontStyle: 'italic'
                      }}>
                        <i className="fas fa-lock" style={{ marginRight: '0.25rem' }}></i>
                        Only directors can edit dates after project creation
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
                      disabled={editingItem.id && !canEditDates}
                      style={editingItem.id && !canEditDates ? { 
                        backgroundColor: 'var(--card)',
                        cursor: 'not-allowed',
                        opacity: 0.7 
                      } : {}}
                    />
                    {editingItem.id && !canEditDates && (
                      <div style={{ 
                        fontSize: '0.75rem', 
                        color: 'var(--accent)', 
                        marginTop: '0.25rem',
                        fontStyle: 'italic'
                      }}>
                        <i className="fas fa-lock" style={{ marginRight: '0.25rem' }}></i>
                        Only directors can edit dates after project creation
                      </div>
                    )}
                  </div>
                </div>
                
                {!editingItem.id && (
                  <div style={{ 
                    fontSize: '0.85rem', 
                    color: 'var(--subtxt)', 
                    marginBottom: '1rem',
                    padding: '0.5rem',
                    background: 'var(--card)',
                    borderRadius: '4px',
                    border: '1px solid var(--muted)'
                  }}>
                    <i className="fas fa-info-circle" style={{ marginRight: '0.5rem' }}></i>
                    {canEditDates 
                      ? 'As a director, you can edit project dates even after creation.'
                      : 'As a team leader, you can set dates when creating this project. Once created, only directors can edit project dates. Please be thorough and careful when setting these dates.'}
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
                            color: 'var(--subtxt)', 
                            marginBottom: '0.75rem',
                            padding: '0.5rem',
                            background: 'var(--card)',
                            borderRadius: '4px',
                            border: '1px solid var(--muted)'
                          }}>
                            <i className="fas fa-info-circle" style={{ marginRight: '0.5rem' }}></i>
                            {canEditDates ? 'As a director, you can edit task dates at any time.' : 'As a team leader, you can set dates when creating this task. Once created, only directors can edit task dates. Please be thorough and careful when setting these dates.'}
                          </div>
                        )}

                        <div className="form-row">
                          <div className="form-group">
                            <label className="form-label">
                              Start Date <span style={{color: 'var(--accent)'}}>*</span>
                            </label>
                            <input
                              type="date"
                              className="form-input"
                              value={task.startDate}
                              onChange={(e) => {
                                const newTasks = [...editingItem.tasks];
                                newTasks[index] = {...task, startDate: e.target.value};
                                setEditingItem({...editingItem, tasks: newTasks});
                              }}
                              required
                              disabled={(task.id && typeof task.id === 'number') && !canEditDates}
                              style={(task.id && typeof task.id === 'number') && !canEditDates ? { 
                                backgroundColor: 'var(--card)',
                                cursor: 'not-allowed',
                                opacity: 0.7 
                              } : {}}
                            />
                            {(task.id && typeof task.id === 'number') && !canEditDates && (
                              <div style={{ 
                                fontSize: '0.75rem', 
                                color: 'var(--accent)', 
                                marginTop: '0.25rem',
                                fontStyle: 'italic'
                              }}>
                                <i className="fas fa-lock" style={{ marginRight: '0.25rem' }}></i>
                                Only directors can edit dates after task creation
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
                              disabled={(task.id && typeof task.id === 'number') && !canEditDates}
                              style={(task.id && typeof task.id === 'number') && !canEditDates ? { 
                                backgroundColor: 'var(--card)',
                                cursor: 'not-allowed',
                                opacity: 0.7 
                              } : {}}
                            />
                            {(task.id && typeof task.id === 'number') && !canEditDates && (
                              <div style={{ 
                                fontSize: '0.75rem', 
                                color: 'var(--accent)', 
                                marginTop: '0.25rem',
                                fontStyle: 'italic'
                              }}>
                                <i className="fas fa-lock" style={{ marginRight: '0.25rem' }}></i>
                                Only directors can edit dates after task creation
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="form-row">
                          <div className="form-group">
                            <label className="form-label">
                              Status <span style={{color: 'var(--accent)'}}>*</span>
                            </label>
                            <select
                              className="form-select"
                              value={task.status}
                              onChange={(e) => {
                                const newTasks = [...editingItem.tasks];
                                newTasks[index] = {...task, status: e.target.value};
                                setEditingItem({...editingItem, tasks: newTasks});
                              }}
                              required
                            >
                              <option value="in-progress">In Progress</option>
                              <option value="completed">Completed</option>
                            </select>
                          </div>

                          <div className="form-group">
                            <label className="form-label">
                              Priority <span style={{color: 'var(--accent)'}}>*</span>
                            </label>
                            <select
                              className="form-select"
                              value={task.priority}
                              onChange={(e) => {
                                const newTasks = [...editingItem.tasks];
                                newTasks[index] = {...task, priority: e.target.value};
                                setEditingItem({...editingItem, tasks: newTasks});
                              }}
                              required
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
                            <label className="form-label">
                              Assigned To <span style={{color: 'var(--accent)'}}>*</span>
                            </label>
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
                              required
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
                        id: 'temp-' + Date.now(), // Use string ID for new tasks being created
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
