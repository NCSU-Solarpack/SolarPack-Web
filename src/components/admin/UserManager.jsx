import { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import { authService } from '../../utils/auth';
import { supabaseService } from '../../utils/supabase';
import { useAlert } from '../../contexts/AlertContext';
import './UserManager.css';

// Helper to capitalize first letter
const capitalize = (str) => str ? str.charAt(0).toUpperCase() + str.slice(1) : '';

// Helper to format date as "Month Year"
const formatJoinedDate = (dateString) => {
  if (!dateString) return '—';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
};

// Small helper component: a permission-aware role select dropdown
function RoleSelect({ currentUserLevel, targetLevel, userId, userEmail, onUpdated, canEdit }) {
  const { showConfirm, showSuccess, showError } = useAlert();
  const [value, setValue] = useState(targetLevel);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    setValue(targetLevel);
  }, [targetLevel]);

  const getOptions = () => {
    if (currentUserLevel === 'director') return ['member', 'leader', 'director'];
    if (currentUserLevel === 'leader') return ['member', 'leader'];
    return [targetLevel];
  };

  const handleChange = async (e) => {
    const newLevel = e.target.value;
    if (newLevel === value) return;

    const confirmed = await showConfirm(
      `Change role for ${userEmail} from ${capitalize(value)} to ${capitalize(newLevel)}?`,
      'Confirm Role Change'
    );
    if (!confirmed) {
      setValue(targetLevel);
      return;
    }

    try {
      setIsUpdating(true);
      await supabaseService.updateUserRole(userId, newLevel);
      await showSuccess(`Updated ${userEmail} to ${capitalize(newLevel)}`);
      if (onUpdated) await onUpdated();
    } catch (err) {
      console.error('Error updating role:', err);
      await showError(`Failed to update role: ${err.message}`, 'Update Error');
      setValue(targetLevel);
    } finally {
      setIsUpdating(false);
    }
  };

  const options = getOptions();
  const hasMultipleOptions = options.length > 1 && canEdit;

  return (
    <div className={`role-dropdown-wrapper ${hasMultipleOptions ? 'clickable' : ''}`}>
      <select
        className="role-select-styled"
        value={value}
        onChange={handleChange}
        disabled={isUpdating || !hasMultipleOptions}
        aria-label={`Change role for ${userEmail}`}
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {capitalize(opt)}
          </option>
        ))}
      </select>
      {hasMultipleOptions && (
        <span className="chevron" aria-hidden>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      )}
    </div>
  );
}

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
    (async () => {
      // Wait for auth initialization so we get an accurate current user
      if (authService.waitForInit) {
        try {
          await authService.waitForInit();
        } catch (e) {
          console.warn('Auth waitForInit failed:', e);
        }
      }

      const user = authService.getUser();
      if (user) {
        setCurrentUserLevel(user.level);
      }
      await loadUsers();
    })();
  }, []);

  const loadUsers = async () => {
    setIsLoading(true);
    try {
      const allUsers = await supabaseService.getAllUserRoles();
      // Sort users: directors first, then leaders, then members
      const priority = { director: 3, leader: 2, member: 1 };
      const sorted = (allUsers || []).slice().sort((a, b) => {
        const pa = priority[a.level] || 0;
        const pb = priority[b.level] || 0;
        if (pb !== pa) return pb - pa;
        const aKey = (a.full_name || a.name || a.email || '').toLowerCase();
        const bKey = (b.full_name || b.name || b.email || '').toLowerCase();
        return aKey.localeCompare(bKey);
      });
      console.log('✓ Loaded users:', sorted);
      setUsers(sorted);
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
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Joined</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan={4} style={{ textAlign: 'center', padding: '2rem' }}>
                  No users found
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr key={user.id}>
                  <td className="user-email">
                    {((user.first_name || user.last_name) ? `${(user.first_name||'').trim()} ${(user.last_name||'').trim()}`.trim() : (user.full_name || user.name || user.email))}
                  </td>

                  <td className="user-email">
                    {user.email}
                  </td>

                  <td className="role-cell">
                    <RoleSelect
                      currentUserLevel={currentUserLevel}
                      targetLevel={user.level}
                      userId={user.user_id}
                      userEmail={user.email}
                      onUpdated={loadUsers}
                      canEdit={canManageUser(user.level)}
                    />
                  </td>

                  <td className="joined-cell">
                    {formatJoinedDate(user.created_at)}
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
