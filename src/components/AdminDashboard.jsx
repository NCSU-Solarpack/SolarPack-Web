import { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { authService } from '../utils/auth';
import TeamManager from './admin/TeamManager';
import ScheduleManager from './admin/ScheduleManager';
import AlumniManager from './admin/AlumniManager';
import SponsorsManager from './admin/SponsorsManager';
import OrderManager from './admin/OrderManager';
import BlogManager from './admin/BlogManager';
// import GitHubSettings from './admin/GitHubSettings'; // Removed - no longer using GitHub for data storage
import { BarChart3, Users, Calendar, Package, GraduationCap, Award, BookOpen, Plus, ShoppingCart, Newspaper, UserPlus } from 'lucide-react';

const AdminDashboard = ({ onLogout }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState(searchParams.get('tab') || 'overview');
  const [userLevel, setUserLevel] = useState(authService.getLevel());
  
  // Refs to access child component methods
  const teamManagerRef = useRef(null);
  const scheduleManagerRef = useRef(null);
  const orderManagerRef = useRef(null);
  const alumniManagerRef = useRef(null);
  const sponsorsManagerRef = useRef(null);
  const blogManagerRef = useRef(null);

  // Sync activeTab with URL parameter
  useEffect(() => {
    const tabFromUrl = searchParams.get('tab');
    if (tabFromUrl && tabFromUrl !== activeTab) {
      setActiveTab(tabFromUrl);
    }
  }, [searchParams]);

  // Update URL when tab changes
  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    setSearchParams({ tab: tabId });
  };

  useEffect(() => {
    // Remove the global padding when admin dashboard is mounted
    document.body.style.paddingTop = '0';
    
    // Restore padding when component unmounts
    return () => {
      document.body.style.paddingTop = '64px';
    };
  }, []);

  useEffect(() => {
    // Extend session on activity
    const handleActivity = () => authService.extendSession();
    
    window.addEventListener('click', handleActivity);
    window.addEventListener('keypress', handleActivity);
    
    return () => {
      window.removeEventListener('click', handleActivity);
      window.removeEventListener('keypress', handleActivity);
    };
  }, []);

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3, permission: 'view_schedules' },
    { id: 'schedules', label: 'Schedules', icon: Calendar, permission: 'view_schedules' },
    { id: 'orders', label: 'Orders', icon: Package, permission: 'view_orders' },
    { id: 'blogs', label: 'Blogs', icon: BookOpen, permission: 'view_announcements' },
    { id: 'sponsors', label: 'Sponsors', icon: Award, permission: 'view_sponsors' },
    { id: 'team', label: 'Team', icon: Users, permission: 'view_team' },
    { id: 'alumni', label: 'Alumni', icon: GraduationCap, permission: 'view_alumni' }
    // Settings tab removed - GitHub integration no longer needed for data storage
  ];

  const availableTabs = tabs.filter(tab => authService.hasPermission(tab.permission));

  const renderTabContent = () => {
    switch (activeTab) {
      case 'team':
        return <TeamManager ref={teamManagerRef} />;
      case 'schedules':
        return <ScheduleManager ref={scheduleManagerRef} />;
      case 'orders':
        return <OrderManager ref={orderManagerRef} />;
      case 'alumni':
        return <AlumniManager ref={alumniManagerRef} />;
      case 'sponsors':
        return <SponsorsManager ref={sponsorsManagerRef} />;
      case 'blogs':
        return <BlogManager ref={blogManagerRef} />;
      // Settings case removed - no longer needed
      default:
        return <DashboardOverview 
          onNavigate={handleTabChange}
          teamManagerRef={teamManagerRef}
          scheduleManagerRef={scheduleManagerRef}
          orderManagerRef={orderManagerRef}
          alumniManagerRef={alumniManagerRef}
          sponsorsManagerRef={sponsorsManagerRef}
          blogManagerRef={blogManagerRef}
        />;
    }
  };

  return (
    <div className="admin-dashboard">
      <style>{`
        .admin-dashboard {
          min-height: 100vh;
          background: var(--bg);
          margin-top: px;
          padding-top: 0;
        }
        
        body:has(.admin-dashboard) {
          padding-top: 0;
        }

        .dashboard-header {
          background: var(--surface);
          border-bottom: 1px solid #333;
          padding: 1rem 2rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .header-left {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .dashboard-logo {
          display: flex;
          align-items: center;
          transition: opacity 0.3s ease;
        }

        .dashboard-logo:hover {
          opacity: 0.8;
        }

        .dashboard-logo img {
          height: 40px;
          width: auto;
        }

        .dashboard-title {
          font-family: "Bebas Neue", sans-serif;
          font-size: 1.8rem;
          color: var(--accent);
          margin: 0;
        }

        .user-info {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .user-level {
          color: var(--text);
          padding: 0.25rem 0.5rem;
          font-size: 0.9rem;
          font-weight: 500;
          text-transform: capitalize;
          border: 1px solid var(--subtxt);
          border-radius: 6px;
          background: transparent;
        }

        .logout-button {
          background: var(--accent);
          color: white;
          border: none;
          padding: 0.5rem 1rem;
          border-radius: 6px;
          cursor: pointer;
          font-size: 0.9rem;
          font-weight: 500;
          transition: all 0.3s ease;
        }

        .logout-button:hover {
          background: #c71821;
          transform: translateY(-1px);
        }

        .dashboard-nav {
          background: var(--surface);
          padding: 0 2rem;
          overflow-x: auto;
        }

        .nav-tabs {
          display: flex;
          gap: 0.5rem;
          min-width: max-content;
        }

        .nav-tab {
          background: transparent;
          border: none;
          padding: 1rem 1.5rem;
          color: var(--subtxt);
          cursor: pointer;
          border-bottom: 3px solid transparent;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.95rem;
          white-space: nowrap;
        }

        .nav-tab:hover {
          color: var(--text);
          background: rgba(0, 123, 255, 0.1);
        }

        .nav-tab.active {
          color: var(--accent);
          border-bottom-color: var(--accent);
        }

        .dashboard-content {
          padding: 2rem;
          max-width: 1400px;
          margin: 0 auto;
        }

        @media (max-width: 768px) {
          .dashboard-header {
            padding: 1rem;
            flex-direction: column;
            gap: 1rem;
          }

          .header-left {
            width: 100%;
            justify-content: center;
          }

          .dashboard-logo img {
            height: 32px;
          }

          .dashboard-title {
            font-size: 1.5rem;
          }

          .dashboard-nav {
            padding: 0 1rem;
          }

          .dashboard-content {
            padding: 1rem;
          }
        }
      `}</style>

      <header className="dashboard-header">
        <div className="header-left">
          <a href="https://solarpacknc.com" className="dashboard-logo">
            <img src="/images/solarpack_logo.png" alt="SolarPack Logo" />
          </a>
          <h1 className="dashboard-title">Dashboard</h1>
        </div>
        <div className="user-info">
          <span className="user-level">{userLevel}</span>
          <button className="logout-button" onClick={onLogout}>
            Logout
          </button>
        </div>
      </header>

      <nav className="dashboard-nav">
        <div className="nav-tabs">
          {availableTabs.map(tab => {
            const IconComponent = tab.icon;
            return (
              <button
                key={tab.id}
                className={`nav-tab ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => handleTabChange(tab.id)}
              >
                <IconComponent size={18} />
                {tab.label}
              </button>
            );
          })}
        </div>
      </nav>

      <main className="dashboard-content">
        {renderTabContent()}
      </main>
    </div>
  );
};

const DashboardOverview = ({ onNavigate, teamManagerRef, scheduleManagerRef, orderManagerRef, alumniManagerRef, sponsorsManagerRef, blogManagerRef }) => {
  const [stats, setStats] = useState({
    teamMembers: 0,
    activeSchedules: 0,
    pendingOrders: 0,
    totalAlumni: 0
  });
  const [upcomingDeadlines, setUpcomingDeadlines] = useState([]);
  const [recentOrders, setRecentOrders] = useState([]);
  const [topSponsors, setTopSponsors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadStats();
    
    // Refresh stats every 5 seconds
    const interval = setInterval(() => {
      loadStats();
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  const parseDateLocal = (dateString) => {
    if (!dateString) return null;
    const [year, month, day] = dateString.split('-').map(Number);
    return new Date(year, month - 1, day);
  };

  const formatDateLocalWithOptions = (dateString, options) => {
    const date = parseDateLocal(dateString);
    if (!date) return '';
    return date.toLocaleDateString('en-US', options);
  };

  const getTeamName = (scheduleData, teamId) => {
    const team = scheduleData.teams?.find(t => t.id === teamId);
    return team ? team.name : teamId;
  };

  const getTeamColor = (scheduleData, teamId) => {
    const team = scheduleData.teams?.find(t => t.id === teamId);
    return team ? team.color : '#6c757d';
  };

  const calculateProgress = (startDateStr, dueDateStr, status) => {
    if (status === 'completed') return 100;
    if (status === 'planning' || !startDateStr || !dueDateStr) return 0;

    const start = parseDateLocal(startDateStr);
    const due = parseDateLocal(dueDateStr);
    const now = new Date();
    now.setHours(0, 0, 0, 0);

    if (now < start) return 0;
    if (now > due) return 100;

    const totalDuration = due - start;
    const elapsed = now - start;
    return Math.round((elapsed / totalDuration) * 100);
  };

  const getStatusColor = (status) => {
    const statusColors = {
      'pending_technical_approval': '#ffc107',
      'pending_project_approval': '#ffc107', 
      'approved': '#28a745',
      'denied': '#dc3545',
      'shipped': '#007bff',
      'delivered': '#28a745'
    };
    return statusColors[status] || '#6c757d';
  };

  const getStatusLabel = (status) => {
    const labels = {
      'pending_technical_approval': 'Pending Tech Approval',
      'pending_project_approval': 'Pending Project Approval',
      'approved': 'Approved',
      'denied': 'Denied',
      'shipped': 'Shipped',
      'delivered': 'Delivered'
    };
    return labels[status] || status;
  };

  const loadStats = async () => {
    try {
      // Import supabase service
      const { supabaseService } = await import('../utils/supabase');
      
      const [teamData, scheduleData, ordersData, alumniData, sponsorsData] = await Promise.all([
        supabaseService.getTeamMembers(),
        supabaseService.getScheduleData(),
        supabaseService.getOrders(),
        supabaseService.getAlumni(),
        supabaseService.getSponsors()
      ]);

      console.log('Dashboard Stats Data:', {
        teamData,
        scheduleData,
        ordersData,
        alumniData,
        sponsorsData
      });

      // Count total alumni across all semesters
      // Alumni data structure: array of semester objects, each with a leadership array
      const totalAlumni = alumniData.alumniData?.reduce((total, semester) => {
        if (Array.isArray(semester.leadership)) {
          return total + semester.leadership.length;
        }
        return total;
      }, 0) || 0;

      // Count orders that are in-transit, ready to purchase, or pending approval
      // ordersData returns { orders: [], lastUpdated: '' }
      const ordersArray = ordersData?.orders || [];
      const pendingOrdersCount = ordersArray.filter(o => 
        o.status === 'pending_technical_approval' || 
        o.status === 'approved' || 
        o.status === 'shipped'
      ).length;

      setStats({
        teamMembers: teamData.teamMembers?.length || 0,
        activeSchedules: scheduleData.projects?.length || 0, // All projects
        pendingOrders: pendingOrdersCount,
        totalAlumni: totalAlumni
      });

      // Get 4 upcoming deadlines (not completed, sorted by due date)
      const upcoming = (scheduleData.projects || [])
        .filter(p => p.status !== 'completed' && p.dueDate)
        .sort((a, b) => parseDateLocal(a.dueDate) - parseDateLocal(b.dueDate))
        .slice(0, 4)
        .map(project => ({
          ...project,
          teamName: getTeamName(scheduleData, project.team),
          teamColor: getTeamColor(scheduleData, project.team),
          progress: calculateProgress(project.startDate, project.dueDate, project.status)
        }));
      setUpcomingDeadlines(upcoming);

      // Get 4 most recently updated orders
      const recent = [...ordersArray]
        .sort((a, b) => new Date(b.lastUpdated || b.submissionDetails?.submissionDate) - new Date(a.lastUpdated || a.submissionDetails?.submissionDate))
        .slice(0, 4);
      setRecentOrders(recent);

      // Get top 4 sponsors across all tiers (Platinum -> Gold -> Silver -> Bronze)
      const sponsorTiers = sponsorsData?.sponsorTiers || [];
      console.log('Sponsors Data Structure:', {
        fullData: sponsorsData,
        sponsorTiers: sponsorTiers,
        tierNames: sponsorTiers.map(t => t.tier)
      });
      
      const tierOrder = ['platinum', 'gold', 'silver', 'bronze'];
      const topSponsorsList = [];
      
      for (const tierName of tierOrder) {
        if (topSponsorsList.length >= 4) break;
        
        const tier = sponsorTiers.find(t => t.tier?.toLowerCase().includes(tierName));
        console.log(`Looking for tier "${tierName}":`, tier);
        
        if (tier?.sponsors) {
          const remaining = 4 - topSponsorsList.length;
          topSponsorsList.push(...tier.sponsors.slice(0, remaining));
        }
      }
      
      console.log('Final topSponsorsList:', topSponsorsList);
      setTopSponsors(topSponsorsList);

      console.log('Updated stats:', {
        teamMembers: teamData.teamMembers?.length || 0,
        activeSchedules: scheduleData.projects?.length || 0,
        pendingOrders: pendingOrdersCount,
        totalAlumni: totalAlumni,
        upcomingDeadlines: upcoming.length,
        recentOrders: recent.length,
        topSponsors: topSponsorsList.length
      });
    } catch (error) {
      console.error('Error loading stats:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="overview">
      <style>{`
        .overview-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1.5rem;
          margin-bottom: 2rem;
        }

        .stat-card {
          background: var(--surface);
          padding: 1.5rem;
          border-radius: var(--radius);
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
          cursor: pointer;
          transition: all 0.3s ease;
          border: 2px solid transparent;
        }

        .stat-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 16px rgba(0,0,0,0.2);
          border-color: var(--accent);
        }

        .stat-number {
          font-size: 2.5rem;
          font-weight: bold;
          color: var(--accent);
          margin-bottom: 0.5rem;
        }

        .stat-label {
          color: var(--subtxt);
          font-size: 0.9rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .dashboard-section {
          background: var(--surface);
          padding: 1.5rem;
          border-radius: var(--radius);
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
          margin-bottom: 2rem;
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
          cursor: pointer;
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

        .order-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem;
          background: var(--bg);
          border-left: 4px solid var(--status-color);
          border-radius: 8px;
          margin-bottom: 0.75rem;
          transition: all 0.3s ease;
          cursor: pointer;
        }

        .order-item:hover {
          transform: translateX(4px);
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }

        .order-info {
          flex: 1;
        }

        .order-title {
          font-weight: 600;
          color: var(--text);
          margin-bottom: 0.25rem;
        }

        .order-meta {
          font-size: 0.85rem;
          color: var(--subtxt);
        }

        .order-status {
          font-weight: 600;
          font-size: 0.85rem;
          padding: 0.25rem 0.75rem;
          border-radius: 4px;
          background: var(--status-color);
          color: white;
          white-space: nowrap;
        }

        .sponsors-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          gap: 1.5rem;
        }

        .sponsor-card {
          background: var(--bg);
          padding: 1rem;
          border-radius: 8px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
          cursor: pointer;
          min-height: 120px;
        }

        .sponsor-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        }

        .sponsor-logo {
          max-width: 100%;
          max-height: 80px;
          object-fit: contain;
          margin-bottom: 0.5rem;
        }

        .sponsor-name {
          font-size: 0.9rem;
          color: var(--text);
          text-align: center;
          font-weight: 500;
        }

        .empty-message {
          color: var(--subtxt);
          text-align: center;
          padding: 2rem;
          font-style: italic;
        }

        .quick-actions {
          background: var(--surface);
          padding: 1.5rem;
          border-radius: var(--radius);
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
          margin-bottom: 2rem;
        }

        .quick-actions h3 {
          color: var(--text);
          margin-bottom: 1rem;
          font-size: 1.5rem;
          font-weight: 700;
        }

        .action-buttons {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
        }

        .action-button {
          background: var(--accent);
          color: white;
          border: none;
          padding: 0.75rem 1.5rem;
          border-radius: 6px;
          cursor: pointer;
          font-size: 0.9rem;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .action-button:hover {
          background: #c71821;
          transform: translateY(-1px);
        }
      `}</style>

      <div className="overview-grid">
        <div className="stat-card" onClick={() => onNavigate('schedules')} title="View projects">
          <div className="stat-number">{isLoading ? '...' : stats.activeSchedules}</div>
          <div className="stat-label">Active Projects</div>
        </div>
        <div className="stat-card" onClick={() => onNavigate('orders')} title="View pending orders">
          <div className="stat-number">{isLoading ? '...' : stats.pendingOrders}</div>
          <div className="stat-label">Pending Orders</div>
        </div>
        <div className="stat-card" onClick={() => onNavigate('team')} title="View team members">
          <div className="stat-number">{isLoading ? '...' : stats.teamMembers}</div>
          <div className="stat-label">Team Leads</div>
        </div>
        <div className="stat-card" onClick={() => onNavigate('alumni')} title="View alumni">
          <div className="stat-number">{isLoading ? '...' : stats.totalAlumni}</div>
          <div className="stat-label">Total Alumni</div>
        </div>
      </div>

      {/* Quick Actions Section */}
      <div className="quick-actions">
        <h3>Quick Actions</h3>
        <div className="action-buttons">
          {authService.hasPermission('edit_schedules') && (
            <button className="action-button" onClick={() => {
              onNavigate('schedules');
              // Trigger add project after navigation
              setTimeout(() => {
                scheduleManagerRef.current?.handleAddProject?.();
              }, 100);
            }}>
              <Plus size={18} />
              New Project
            </button>
          )}
          {authService.hasPermission('submit_orders') && (
            <button className="action-button" onClick={() => {
              onNavigate('orders');
              // Trigger submit order after navigation
              setTimeout(() => {
                orderManagerRef.current?.handleSubmitOrder?.();
              }, 100);
            }}>
              <ShoppingCart size={18} />
              New Order
            </button>
          )}
          {authService.hasPermission('edit_team') && (
            <button className="action-button" onClick={() => {
              onNavigate('team');
              // Trigger add member after navigation
              setTimeout(() => {
                teamManagerRef.current?.handleAddMember?.();
              }, 100);
            }}>
              <UserPlus size={18} />
              Add Team Member
            </button>
          )}
          {authService.hasPermission('edit_sponsors') && (
            <button className="action-button" onClick={() => {
              onNavigate('sponsors');
              // Trigger add sponsor after navigation
              setTimeout(() => {
                sponsorsManagerRef.current?.handleAddSponsor?.();
              }, 100);
            }}>
              <Award size={18} />
              Add Sponsor
            </button>
          )}
          {authService.hasPermission('edit_schedules') && (
            <button className="action-button" onClick={() => {
              onNavigate('schedules');
              // Trigger change teams functionality after navigation
              setTimeout(() => {
                scheduleManagerRef.current?.handleManageTeams?.();
              }, 100);
            }}>
              <Users size={18} />
              Manage Teams
            </button>
          )}
          {(authService.hasPermission('edit_announcements') || authService.getLevel() === 'leader') && (
            <button className="action-button" onClick={() => {
              onNavigate('blogs');
              // Trigger add blog after navigation
              setTimeout(() => {
                blogManagerRef.current?.handleAddBlog?.();
              }, 100);
            }}>
              <Newspaper size={18} />
              New Blog Post
            </button>
          )}
          {authService.hasPermission('edit_alumni') && (
            <button className="action-button" onClick={() => {
              onNavigate('alumni');
              // Trigger add alumni after navigation
              setTimeout(() => {
                alumniManagerRef.current?.handleAddAlumni?.();
              }, 100);
            }}>
              <GraduationCap size={18} />
              Add Alumni
            </button>
          )}
        </div>
      </div>

      {/* Upcoming Deadlines Section */}
      <div className="dashboard-section">
        <h3 className="section-title">Upcoming Deadlines</h3>
        {upcomingDeadlines.length === 0 ? (
          <div className="empty-message">No upcoming deadlines</div>
        ) : (
          upcomingDeadlines.map(project => (
            <div 
              key={project.id} 
              className="deadline-item"
              style={{'--team-color': project.teamColor}}
              onClick={() => onNavigate('schedules')}
            >
              <div className="deadline-info">
                <div className="deadline-title">{project.title}</div>
                <div className="deadline-meta">
                  {project.teamName} • {project.assignedTo} • {project.progress}% complete
                </div>
              </div>
              <div className="deadline-date">
                {formatDateLocalWithOptions(project.dueDate, { month: 'short', day: 'numeric' })}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Recent Orders Section */}
      <div className="dashboard-section">
        <h3 className="section-title">Recent Orders</h3>
        {recentOrders.length === 0 ? (
          <div className="empty-message">No recent orders</div>
        ) : (
          recentOrders.map(order => (
            <div 
              key={order.id} 
              className="order-item"
              style={{'--status-color': getStatusColor(order.status)}}
              onClick={() => onNavigate('orders')}
            >
              <div className="order-info">
                <div className="order-title">{order.materialDetails?.materialName || 'Unnamed Order'}</div>
                <div className="order-meta">
                  {order.submissionDetails?.subteam} • ${order.costBreakdown?.totalCost || 0}
                </div>
              </div>
              <div className="order-status" style={{background: getStatusColor(order.status)}}>
                {getStatusLabel(order.status)}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Top Sponsors Section */}
      <div className="dashboard-section">
        <h3 className="section-title">Top Sponsors</h3>
        {topSponsors.length === 0 ? (
          <div className="empty-message">No sponsors to display</div>
        ) : (
          <div className="sponsors-grid">
            {topSponsors.map(sponsor => (
              <div 
                key={sponsor.id} 
                className="sponsor-card"
                onClick={() => onNavigate('sponsors')}
              >
                {sponsor.logo && (
                  <img 
                    src={sponsor.logo} 
                    alt={sponsor.name} 
                    className="sponsor-logo"
                  />
                )}
                <div className="sponsor-name">{sponsor.name}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;