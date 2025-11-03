// Simple client-side authentication system
// Passwords are hashed with a salt for basic security

const AUTH_LEVELS = {
  MEMBER: 'member',
  LEADER: 'leader', 
  DIRECTOR: 'director'
};

const PERMISSIONS = {
  [AUTH_LEVELS.MEMBER]: ['view_schedules', 'view_team', 'view_announcements', 'view_sponsors', 'view_alumni', 'view_orders'],
  [AUTH_LEVELS.LEADER]: ['view_schedules', 'view_team', 'view_announcements', 'view_sponsors', 'view_alumni', 'view_orders', 'edit_schedules', 'edit_team', 'edit_sponsors', 'edit_alumni', 'submit_orders'],
  [AUTH_LEVELS.DIRECTOR]: ['view_schedules', 'view_team', 'view_announcements', 'view_sponsors', 'view_alumni', 'view_orders', 'edit_schedules', 'edit_team', 'edit_sponsors', 'edit_alumni', 'edit_orders', 'edit_announcements', 'approve_orders', 'manage_users', 'submit_orders']
};

// Simple hash function for password verification
// In production, you'd want something more secure
const hashPassword = (password, salt = 'solarpack2024') => {
  return btoa(password + salt).replace(/[^a-zA-Z0-9]/g, '');
};

// Predefined password hashes (you'll want to change these)
const PASSWORD_HASHES = {
  // Default passwords - CHANGE THESE!
  [hashPassword('director@2025')]: AUTH_LEVELS.DIRECTOR,
  [hashPassword('teamlead2025!')]: AUTH_LEVELS.LEADER,
  [hashPassword('solarpack2025')]: AUTH_LEVELS.MEMBER
};

class AuthService {
  constructor() {
    this.currentUser = this.loadFromStorage();
  }

  authenticate(password) {
    const hash = hashPassword(password);
    const level = PASSWORD_HASHES[hash];
    
    if (level) {
      this.currentUser = {
        level,
        permissions: PERMISSIONS[level],
        loginTime: Date.now(),
        expiresAt: Date.now() + (24 * 60 * 60 * 1000) // 24 hours
      };
      this.saveToStorage();
      return true;
    }
    return false;
  }

  logout() {
    this.currentUser = null;
    localStorage.removeItem('solarpack_auth');
  }

  isAuthenticated() {
    if (!this.currentUser) return false;
    if (Date.now() > this.currentUser.expiresAt) {
      this.logout();
      return false;
    }
    return true;
  }

  hasPermission(permission) {
    if (!this.isAuthenticated()) return false;
    return this.currentUser.permissions.includes(permission);
  }

  getLevel() {
    return this.isAuthenticated() ? this.currentUser.level : null;
  }

  saveToStorage() {
    localStorage.setItem('solarpack_auth', JSON.stringify(this.currentUser));
  }

  loadFromStorage() {
    try {
      const stored = localStorage.getItem('solarpack_auth');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  }

  // Extend session by 24 hours
  extendSession() {
    if (this.isAuthenticated()) {
      this.currentUser.expiresAt = Date.now() + (24 * 60 * 60 * 1000);
      this.saveToStorage();
    }
  }
}

export const authService = new AuthService();
export { AUTH_LEVELS, PERMISSIONS };