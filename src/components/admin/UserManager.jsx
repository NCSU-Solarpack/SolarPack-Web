import { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import { authService } from '../../utils/auth';
import { supabaseService } from '../../utils/supabase';
import { useAlert } from '../../contexts/AlertContext';
import './UserManager.css';

const UserManager = forwardRef((props, ref) => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  // Password column removed
  const [currentUserLevel, setCurrentUserLevel] = useState(null);
  const { showError, showConfirm, showSuccess } = useAlert();

  // Expose methods to parent component
  useImperativeHandle(ref, () => ({
    // No add user function - users are created via signup
  }));

  useEffect(() => {
    const user = authService.getUser();
    if (user) {
      setCurrentUserLevel(user.level);
    }
    loadUsers();
  }, []);

  const loadUsers = async () => {
    setIsLoading(true);
    try {
      const allUsers = await supabaseService.getAllUserRoles();
      console.log('✓ Loaded users:', allUsers);
      setUsers(allUsers);
    } catch (error) {
      console.error('Error loading users:', error);
      await showError(`Failed to load users: ${error.message}`, 'Load Error');
      setUsers([]);
    } finally {
      setIsLoading(false);
    }
  };

  const canManageUser = (targetLevel) => {
    if (currentUserLevel === 'director') return true;
    if (currentUserLevel === 'leader' && (targetLevel === 'member' || targetLevel === 'leader')) return true;
    return false;
  };

  const handlePromote = async (userId, currentLevel, email) => {
    let newLevel;
    if (currentLevel === 'member') newLevel = 'leader';
    else if (currentLevel === 'leader') newLevel = 'director';
    else return; // Can't promote directors

    const confirmed = await showConfirm(
      `Promote ${email} from ${currentLevel} to ${newLevel}?`,
      'Confirm Promotion'
    );

    if (!confirmed) return;

    try {
      await supabaseService.updateUserRole(userId, newLevel);
      await showSuccess(`Successfully promoted ${email} to ${newLevel}`);
      await loadUsers();
    } catch (error) {
      console.error('Error promoting user:', error);
      await showError(`Failed to promote user: ${error.message}`, 'Promotion Error');
    }
  };

  const handleDemote = async (userId, currentLevel, email) => {
    let newLevel;
    if (currentLevel === 'director') newLevel = 'leader';
    else if (currentLevel === 'leader') newLevel = 'member';
    else return; // Can't demote members

    const confirmed = await showConfirm(
      `Demote ${email} from ${currentLevel} to ${newLevel}?`,
      'Confirm Demotion'
    );

    if (!confirmed) return;

    try {
      await supabaseService.updateUserRole(userId, newLevel);
      await showSuccess(`Successfully demoted ${email} to ${newLevel}`);
      await loadUsers();
    } catch (error) {
      console.error('Error demoting user:', error);
      await showError(`Failed to demote user: ${error.message}`, 'Demotion Error');
    }
  };

  // Password column removed

  const getRoleBadgeClass = (level) => {
    switch (level) {
      case 'director': return 'role-badge-director';
      case 'leader': return 'role-badge-leader';
      case 'member': return 'role-badge-member';
      default: return 'role-badge-member';
    }
  };

  if (isLoading) {
    return (
      <div className="user-manager-loading">
        Loading users...
      </div>
    );
  }

  return (
    <div className="user-manager">
      <div className="user-list">
        <table className="user-table">
          <thead>
            <tr>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan={3} style={{ textAlign: 'center', padding: '2rem' }}>
                  No users found
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr key={user.id}>
                  <td className="user-email">{user.email}</td>
                  <td>
                    <span className={`role-badge ${getRoleBadgeClass(user.level)}`}>
                      {user.level}
                    </span>
                  </td>
                  <td className="actions-cell">
                    {canManageUser(user.level) ? (
                      <div className="action-buttons">
                        {user.level !== 'director' && (
                          <button
                            className="action-btn promote-btn"
                            onClick={() => handlePromote(user.user_id, user.level, user.email)}
                            disabled={!canManageUser(user.level)}
                          >
                            ↑ Promote
                          </button>
                        )}
                        {user.level !== 'member' && (
                          <button
                            className="action-btn demote-btn"
                            onClick={() => handleDemote(user.user_id, user.level, user.email)}
                            disabled={!canManageUser(user.level)}
                          >
                            ↓ Demote
                          </button>
                        )}
                      </div>
                    ) : (
                      <span className="no-permissions">No permissions</span>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="user-manager-info">
        <h4>Permission Levels:</h4>
        <ul>
          <li><strong>Directors</strong> can manage all users (promote/demote anyone)</li>
          <li><strong>Leaders</strong> can manage members and other leaders</li>
          <li><strong>Members</strong> can only view the user list</li>
        </ul>
      </div>
    </div>
  );
});

UserManager.displayName = 'UserManager';

export default UserManager;
