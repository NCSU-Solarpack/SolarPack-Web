import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { authService } from '../utils/auth';
import TeamManager from './admin/TeamManager';
import ScheduleManager from './admin/ScheduleManager';
import AlumniManager from './admin/AlumniManager';
import SponsorsManager from './admin/SponsorsManager';
import OrderManager from './admin/OrderManager';
// import GitHubSettings from './admin/GitHubSettings'; // Removed - no longer using GitHub for data storage
import { BarChart3, Users, Calendar, Package, GraduationCap, Award } from 'lucide-react';

const AdminDashboard = ({ onLogout }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState(searchParams.get('tab') || 'overview');
  const [userLevel, setUserLevel] = useState(authService.getLevel());

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
    { id: 'team', label: 'Team', icon: Users, permission: 'view_team' },
    { id: 'alumni', label: 'Alumni', icon: GraduationCap, permission: 'view_alumni' },
    { id: 'sponsors', label: 'Sponsors', icon: Award, permission: 'view_sponsors' }
    // Settings tab removed - GitHub integration no longer needed for data storage
  ];

  const availableTabs = tabs.filter(tab => authService.hasPermission(tab.permission));

  const renderTabContent = () => {
    switch (activeTab) {
      case 'team':
        return <TeamManager />;
      case 'schedules':
        return <ScheduleManager />;
      case 'orders':
        return <OrderManager />;
      case 'alumni':
        return <AlumniManager />;
      case 'sponsors':
        return <SponsorsManager />;
      // Settings case removed - no longer needed
      default:
        return <DashboardOverview />;
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

          .dashboard-nav {
            padding: 0 1rem;
          }

          .dashboard-content {
            padding: 1rem;
          }
        }
      `}</style>

      <header className="dashboard-header">
        <h1 className="dashboard-title">Dashboard</h1>
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

const DashboardOverview = () => {
  const [stats, setStats] = useState({
    teamMembers: 0,
    activeSchedules: 0,
    pendingOrders: 0,
    totalAlumni: 0
  });

  useEffect(() => {
    // Load overview statistics
    const loadStats = async () => {
      try {
        const [teamRes, scheduleRes, alumniRes] = await Promise.all([
          fetch('/data/team.json'),
          fetch('/data/schedules.json'),
          fetch('/data/alumni.json')
        ]);

        const [teamData, scheduleData, alumniData] = await Promise.all([
          teamRes.json(),
          scheduleRes.json(),
          alumniRes.ok ? alumniRes.json() : { alumniData: [] }
        ]);

        // Count total alumni across all semesters
        const totalAlumni = alumniData.alumniData?.reduce((total, semester) => 
          total + (semester.leadership?.length || 0), 0) || 0;

        setStats({
          teamMembers: teamData.teamMembers?.length || 0,
          activeSchedules: scheduleData.schedules?.filter(s => s.status === 'active' || s.status === 'upcoming').length || 0,
          pendingOrders: scheduleData.orders?.filter(o => o.status === 'pending_approval').length || 0,
          totalAlumni: totalAlumni
        });
      } catch (error) {
        console.error('Error loading stats:', error);
      }
    };

    loadStats();
  }, []);

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

        .quick-actions {
          background: var(--surface);
          padding: 1.5rem;
          border-radius: var(--radius);
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        }

        .quick-actions h3 {
          color: var(--text);
          margin-bottom: 1rem;
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
          transition: background 0.3s ease;
        }

        .action-button:hover {
          background: #0056b3;
        }
      `}</style>

      <div className="overview-grid">
        <div className="stat-card">
          <div className="stat-number">{stats.teamMembers}</div>
          <div className="stat-label">Team Members</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{stats.activeSchedules}</div>
          <div className="stat-label">Active Schedules</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{stats.pendingOrders}</div>
          <div className="stat-label">Pending Orders</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{stats.totalAlumni}</div>
          <div className="stat-label">Total Alumni</div>
        </div>
      </div>

      <div className="quick-actions">
        <h3>Quick Actions</h3>
        <div className="action-buttons">
          {authService.hasPermission('edit_team') && (
            <button className="action-button">Add Team Member</button>
          )}
          {authService.hasPermission('edit_schedules') && (
            <button className="action-button">Create Schedule</button>
          )}
          {authService.hasPermission('submit_orders') && (
            <button className="action-button">Submit Order</button>
          )}
          {authService.hasPermission('edit_announcements') && (
            <button className="action-button">Manage Alumni</button>
          )}
          {authService.hasPermission('edit_announcements') && (
            <button className="action-button">Manage Sponsors</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;