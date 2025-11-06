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
import { BarChart3, Users, Calendar, Package, GraduationCap, Award, BookOpen } from 'lucide-react';

const AdminDashboard = ({ onLogout }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState(searchParams.get('tab') || 'overview');
  const [userLevel, setUserLevel] = useState(authService.getLevel());
  
  // Refs to access child component methods
  const teamManagerRef = useRef(null);
  const scheduleManagerRef = useRef(null);
  const orderManagerRef = useRef(null);

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
    { id: 'sponsors', label: 'Sponsors', icon: Award, permission: 'view_sponsors' },
    { id: 'blogs', label: 'Blogs', icon: BookOpen, permission: 'edit_announcements' }
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
        return <AlumniManager />;
      case 'sponsors':
        return <SponsorsManager />;
      case 'blogs':
        return <BlogManager />;
      // Settings case removed - no longer needed
      default:
        return <DashboardOverview 
          onNavigate={handleTabChange}
          teamManagerRef={teamManagerRef}
          scheduleManagerRef={scheduleManagerRef}
          orderManagerRef={orderManagerRef}
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

// Helper function for pie chart coordinates
const getCoordinatesForPercent = (percent) => {
  const x = 100 + 100 * Math.cos(2 * Math.PI * percent - Math.PI / 2);
  const y = 100 + 100 * Math.sin(2 * Math.PI * percent - Math.PI / 2);
  return [x, y];
};

const DashboardOverview = ({ onNavigate, teamManagerRef, scheduleManagerRef, orderManagerRef }) => {
  const [stats, setStats] = useState({
    teamMembers: 0,
    activeSchedules: 0,
    pendingOrders: 0,
    totalAlumni: 0
  });
  const [detailedData, setDetailedData] = useState({
    upcomingDeadlinesByTeam: [],
    allUpcomingDeadlines: [],
    orderStatusPieData: [],
    sponsorCount: 0
  });
  const [scheduleData, setScheduleData] = useState({ teams: [], projects: [] });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadStats();
    
    // Refresh stats every 5 seconds
    const interval = setInterval(() => {
      loadStats();
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

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

      // Get upcoming deadlines (next 7 days) grouped by team
      const today = new Date();
      const nextWeek = new Date(today);
      nextWeek.setDate(nextWeek.getDate() + 7);
      
      const upcomingDeadlinesByTeam = scheduleData.teams?.map(team => {
        const teamDeadlines = scheduleData.projects
          ?.filter(p => {
            if (!p.dueDate || p.status === 'completed') return false;
            if (p.team !== team.id) return false;
            const dueDate = new Date(p.dueDate);
            return dueDate >= today && dueDate <= nextWeek;
          })
          .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate)) || [];
        
        return {
          name: team.name,
          color: team.color,
          id: team.id,
          deadlines: teamDeadlines
        };
      }).filter(team => team.deadlines.length > 0) || [];

      // Get ALL upcoming deadlines (not grouped by team) for separate display
      const allUpcomingDeadlines = scheduleData.projects
        ?.filter(p => {
          if (!p.dueDate || p.status === 'completed') return false;
          const dueDate = new Date(p.dueDate);
          return dueDate >= today && dueDate <= nextWeek;
        })
        .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
        .slice(0, 10) || [];

      // Order status breakdown with counts and percentages - INCLUDE ALL STATUSES
      // Define all possible statuses so they always appear in the legend
      const allStatuses = [
        'pending_technical_approval',
        'pending_project_approval',
        'approved',
        'purchased',
        'shipped',
        'delivered',
        'denied'
      ];
      
      const orderStatusBreakdown = ordersArray.reduce((acc, order) => {
        acc[order.status] = (acc[order.status] || 0) + 1;
        return acc;
      }, {});
      
      const totalOrders = ordersArray.length;
      
      // Create pie data for all statuses, even if count is 0
      const orderStatusPieData = allStatuses.map(status => ({
        status,
        count: orderStatusBreakdown[status] || 0,
        percentage: totalOrders > 0 ? ((orderStatusBreakdown[status] || 0) / totalOrders) * 100 : 0
      }));

      // Count total sponsors
      const sponsorCount = sponsorsData.sponsorTiers?.reduce((total, tier) => {
        return total + (tier.sponsors?.length || 0);
      }, 0) || 0;

      setDetailedData({
        upcomingDeadlinesByTeam,
        allUpcomingDeadlines,
        orderStatusPieData,
        sponsorCount
      });

      setScheduleData({
        teams: scheduleData.teams || [],
        projects: scheduleData.projects || []
      });

      console.log('Updated stats:', {
        teamMembers: teamData.teamMembers?.length || 0,
        activeSchedules: scheduleData.projects?.length || 0,
        pendingOrders: pendingOrdersCount,
        totalAlumni: totalAlumni
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
          transition: all 0.3s ease;
        }

        .action-button:hover {
          background: #c71821;
          transform: translateY(-1px);
        }

        /* Detailed Information Sections */
        .overview-details {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 1.5rem;
          margin-top: 2rem;
        }

        .detail-card {
          background: var(--surface);
          padding: 1.5rem;
          border-radius: var(--radius);
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        }

        .detail-card-wide {
          grid-column: 1 / -1;
        }

        .detail-header {
          color: var(--text);
          margin: 0 0 1rem 0;
          font-size: 1.1rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 2px solid #333;
          padding-bottom: 0.5rem;
        }

        .view-all {
          font-size: 0.85rem;
          color: var(--accent);
          cursor: pointer;
          font-weight: normal;
          transition: opacity 0.2s;
        }

        .view-all:hover {
          opacity: 0.8;
        }

        /* Pie Chart Styles */
        .pie-chart-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.5rem;
          padding: 1rem;
        }

        .pie-chart {
          width: 200px;
          height: 200px;
          transform: rotate(-90deg);
        }

        .pie-legend {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          width: 100%;
        }

        .legend-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .legend-color {
          width: 20px;
          height: 20px;
          border-radius: 4px;
          flex-shrink: 0;
        }

        .legend-color.status-pending_technical_approval {
          background: #ffc107;
        }

        .legend-color.status-pending_project_approval {
          background: #fd7e14;
        }

        .legend-color.status-approved {
          background: #20c997;
        }

        .legend-color.status-purchased {
          background: #6c757d;
        }

        .legend-color.status-shipped {
          background: #007bff;
        }

        .legend-color.status-delivered {
          background: #28a745;
        }

        .legend-color.status-denied {
          background: #dc3545;
        }

        .legend-label {
          color: var(--text);
          font-size: 0.9rem;
          text-transform: capitalize;
          flex: 1;
        }

        .legend-count {
          color: var(--subtxt);
          font-weight: 600;
          margin-left: 0.5rem;
        }

        /* Team Deadlines Styles */
        .team-deadlines-container {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .team-deadline-section {
          background: rgba(255,255,255,0.02);
          border-radius: 8px;
          padding: 1rem;
        }

        .team-deadline-header {
          color: var(--text);
          font-weight: 600;
          font-size: 1.1rem;
          margin-bottom: 0.75rem;
          padding-left: 0.75rem;
          border-left: 4px solid;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .deadline-count {
          font-size: 0.85rem;
          color: var(--subtxt);
          font-weight: normal;
        }

        .deadline-list {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .deadline-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.75rem;
          background: rgba(255,255,255,0.03);
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.2s;
          border-left: 3px solid #ffc107;
        }

        .deadline-item:hover {
          background: rgba(255,255,255,0.06);
          transform: translateX(4px);
        }

        .deadline-info {
          flex: 1;
        }

        .deadline-title {
          color: var(--text);
          font-weight: 500;
          margin-bottom: 0.25rem;
        }

        .deadline-meta {
          color: var(--subtxt);
          font-size: 0.85rem;
        }

        .deadline-date {
          padding: 0.35rem 0.75rem;
          border-radius: 4px;
          font-size: 0.9rem;
          font-weight: 600;
          background: rgba(255, 193, 7, 0.2);
          color: #ffc107;
        }



        /* Sponsor Summary Styles */
        .sponsor-summary {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 1.5rem;
        }

        .sponsor-count-large {
          font-size: 3rem;
          font-weight: 700;
          color: var(--accent);
          line-height: 1;
        }

        .sponsor-label {
          color: var(--subtxt);
          font-size: 0.9rem;
          margin-top: 0.5rem;
        }

        @media (max-width: 768px) {
          .overview-details {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <div className="overview-grid">
        <div className="stat-card" onClick={() => onNavigate('team')} title="View team members">
          <div className="stat-number">{isLoading ? '...' : stats.teamMembers}</div>
          <div className="stat-label">Team Leads</div>
        </div>
        <div className="stat-card" onClick={() => onNavigate('schedules')} title="View projects">
          <div className="stat-number">{isLoading ? '...' : stats.activeSchedules}</div>
          <div className="stat-label">Active Projects</div>
        </div>
        <div className="stat-card" onClick={() => onNavigate('orders')} title="View pending orders">
          <div className="stat-number">{isLoading ? '...' : stats.pendingOrders}</div>
          <div className="stat-label">Pending Orders</div>
        </div>
        <div className="stat-card" onClick={() => onNavigate('alumni')} title="View alumni">
          <div className="stat-number">{isLoading ? '...' : stats.totalAlumni}</div>
          <div className="stat-label">Total Alumni</div>
        </div>
      </div>

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
              Create Schedule
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
              Submit Team Order
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
              Add Team Member
            </button>
          )}
          {authService.hasPermission('edit_announcements') && (
            <button className="action-button" onClick={() => onNavigate('alumni')}>
              Manage Alumni
            </button>
          )}
          {authService.hasPermission('edit_announcements') && (
            <button className="action-button" onClick={() => onNavigate('sponsors')}>
              Manage Sponsors
            </button>
          )}
        </div>
      </div>

      {/* Detailed Information Sections */}
      <div className="overview-details">
        {/* Upcoming Deadlines from Schedule */}
        {authService.hasPermission('view_schedules') && (
          <div className="detail-card">
            <h3 className="detail-header">
              ⏰ Upcoming Deadlines (Next 7 Days)
              <span className="view-all" onClick={() => onNavigate('schedules')}>View All →</span>
            </h3>
            {detailedData.allUpcomingDeadlines.length > 0 ? (
              <div className="deadline-list">
                {detailedData.allUpcomingDeadlines.map((project, idx) => {
                  const teamInfo = scheduleData.teams?.find(t => t.id === project.team);
                  return (
                    <div key={idx} className="deadline-item" onClick={() => onNavigate('schedules')}>
                      <div className="deadline-info">
                        <div className="deadline-title">{project.title}</div>
                        <div className="deadline-meta">
                          {teamInfo?.name && <span style={{ color: teamInfo.color }}>● {teamInfo.name}</span>}
                          {project.assignedTo && ` • ${project.assignedTo}`}
                        </div>
                      </div>
                      <div className="deadline-date">
                        {new Date(project.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--subtxt)' }}>
                No upcoming deadlines in the next 7 days
              </div>
            )}
          </div>
        )}

        {/* Order Status Pie Chart - ALL STATUSES */}
        {authService.hasPermission('view_orders') && detailedData.orderStatusPieData.length > 0 && (
          <div className="detail-card">
            <h3 className="detail-header">
              📊 Order Status Breakdown
              <span className="view-all" onClick={() => onNavigate('orders')}>View All →</span>
            </h3>
            <div className="pie-chart-container">
              <svg viewBox="0 0 200 200" className="pie-chart">
                {(() => {
                  let cumulativePercent = 0;
                  const statusColors = {
                    pending_technical_approval: '#ffc107',
                    pending_project_approval: '#fd7e14',
                    approved: '#20c997',
                    purchased: '#6c757d',
                    shipped: '#007bff',
                    delivered: '#28a745',
                    denied: '#dc3545'
                  };
                  
                  return detailedData.orderStatusPieData.filter(item => item.percentage > 0).map((item, idx) => {
                    const [startX, startY] = getCoordinatesForPercent(cumulativePercent);
                    cumulativePercent += item.percentage / 100;
                    const [endX, endY] = getCoordinatesForPercent(cumulativePercent);
                    const largeArcFlag = item.percentage > 50 ? 1 : 0;
                    
                    const pathData = [
                      `M 100 100`,
                      `L ${startX} ${startY}`,
                      `A 100 100 0 ${largeArcFlag} 1 ${endX} ${endY}`,
                      `Z`
                    ].join(' ');
                    
                    return (
                      <path
                        key={idx}
                        d={pathData}
                        fill={statusColors[item.status] || '#6c757d'}
                        stroke="var(--surface)"
                        strokeWidth="2"
                      />
                    );
                  });
                })()}
              </svg>
              <div className="pie-legend">
                {detailedData.orderStatusPieData.map((item, idx) => (
                  <div key={idx} className="legend-item">
                    <div className={`legend-color status-${item.status}`} />
                    <div className="legend-label">
                      {item.status.replace(/_/g, ' ')}
                      <span className="legend-count">({item.count})</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Upcoming Deadlines by Team */}
        {authService.hasPermission('view_schedules') && detailedData.upcomingDeadlinesByTeam.length > 0 && (
          <div className="detail-card detail-card-wide">
            <h3 className="detail-header">
              ⏰ Upcoming Deadlines (Next 7 Days)
              <span className="view-all" onClick={() => onNavigate('schedules')}>View All →</span>
            </h3>
            <div className="team-deadlines-container">
              {detailedData.upcomingDeadlinesByTeam.map((team, idx) => (
                <div key={idx} className="team-deadline-section">
                  <div className="team-deadline-header" style={{ borderLeftColor: team.color }}>
                    {team.name}
                    <span className="deadline-count">{team.deadlines.length} deadline{team.deadlines.length !== 1 ? 's' : ''}</span>
                  </div>
                  <div className="deadline-list">
                    {team.deadlines.map((project, pIdx) => (
                      <div key={pIdx} className="deadline-item" onClick={() => onNavigate('schedules')}>
                        <div className="deadline-info">
                          <div className="deadline-title">{project.title}</div>
                          <div className="deadline-meta">
                            {project.assignedTo && `Assigned to: ${project.assignedTo}`}
                          </div>
                        </div>
                        <div className="deadline-date">
                          {new Date(project.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Sponsor Summary */}
        {authService.hasPermission('view_sponsors') && detailedData.sponsorCount > 0 && (
          <div className="detail-card">
            <h3 className="detail-header">
              🏆 Sponsors
              <span className="view-all" onClick={() => onNavigate('sponsors')}>Manage →</span>
            </h3>
            <div className="sponsor-summary">
              <div className="sponsor-count-large">{detailedData.sponsorCount}</div>
              <div className="sponsor-label">Active Sponsors</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;