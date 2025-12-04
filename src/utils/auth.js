// Supabase-based authentication system
// Integrates with Supabase Auth and user_roles table
// Maintains the same permission levels: member, leader, director

import { supabaseService } from './supabase.js';

const AUTH_LEVELS = {
  MEMBER: 'member',
  LEADER: 'leader', 
  DIRECTOR: 'director'
};

const PERMISSIONS = {
  [AUTH_LEVELS.MEMBER]: ['view_schedules', 'view_team', 'view_announcements', 'view_sponsors', 'view_alumni', 'view_orders'],
  [AUTH_LEVELS.LEADER]: ['view_schedules', 'view_team', 'view_announcements', 'view_sponsors', 'view_alumni', 'view_orders', 'edit_schedules', 'edit_team', 'edit_sponsors', 'edit_alumni', 'submit_orders', 'edit_announcements'],
  [AUTH_LEVELS.DIRECTOR]: ['view_schedules', 'view_team', 'view_announcements', 'view_sponsors', 'view_alumni', 'view_orders', 'edit_schedules', 'edit_team', 'edit_sponsors', 'edit_alumni', 'edit_orders', 'edit_announcements', 'approve_orders', 'manage_users', 'submit_orders']
};

class AuthService {
  constructor() {
    this.currentUser = null;
    this.authSubscription = null;
    this.initializeAuth();
  }

  /**
   * Initialize authentication state from Supabase
   */
  async initializeAuth() {
    try {
      // Check if Supabase is configured
      if (!supabaseService.isConfigured()) {
        console.warn('Supabase not configured. Authentication disabled.');
        return;
      }

      // Get current session
      const session = await supabaseService.getSession();
      if (session) {
        await this.loadUserData();
      }

      // Listen for auth state changes
      this.authSubscription = supabaseService.onAuthStateChange(async (event, session) => {
        console.log('Auth state changed:', event);
        
        if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
          await this.loadUserData();
        } else if (event === 'SIGNED_OUT') {
          this.currentUser = null;
        }
      });
    } catch (error) {
      console.error('Error initializing auth:', error);
    }
  }

  /**
   * Load user data including role from Supabase
   */
  async loadUserData() {
    try {
      const user = await supabaseService.getUser();
      if (!user) {
        this.currentUser = null;
        return;
      }

      // Get user role from user_roles table
      const userRole = await supabaseService.getUserRole();
      
      this.currentUser = {
        id: user.id,
        email: user.email,
        level: userRole?.level || AUTH_LEVELS.MEMBER,
        permissions: PERMISSIONS[userRole?.level || AUTH_LEVELS.MEMBER],
        emailConfirmed: user.email_confirmed_at !== null
      };
    } catch (error) {
      console.error('Error loading user data:', error);
      this.currentUser = null;
    }
  }

  /**
   * Sign up a new user
   * @param {string} email 
   * @param {string} password 
   * @returns {Promise<{user, session, needsEmailConfirmation}>}
   */
  async signUp(email, password) {
    try {
      const data = await supabaseService.signUp(email, password);
      
      // Check if email confirmation is required
      const needsEmailConfirmation = !data.session;
      
      if (data.session) {
        // User is signed in immediately (email confirmation disabled)
        await this.loadUserData();
      }

      return {
        ...data,
        needsEmailConfirmation
      };
    } catch (error) {
      console.error('Sign up error:', error);
      throw error;
    }
  }

  /**
   * Sign in with email and password
   * @param {string} email 
   * @param {string} password 
   * @returns {Promise<{user, session}>}
   */
  async signIn(email, password) {
    try {
      const data = await supabaseService.signIn(email, password);
      await this.loadUserData();
      return data;
    } catch (error) {
      console.error('Sign in error:', error);
      throw error;
    }
  }

  /**
   * Sign out the current user
   */
  async signOut() {
    try {
      await supabaseService.signOut();
      this.currentUser = null;
    } catch (error) {
      console.error('Sign out error:', error);
      throw error;
    }
  }

  /**
   * Request password reset email
   * @param {string} email 
   */
  async requestPasswordReset(email) {
    try {
      await supabaseService.resetPassword(email);
    } catch (error) {
      console.error('Password reset error:', error);
      throw error;
    }
  }

  /**
   * Update password (when user has reset token)
   * @param {string} newPassword 
   */
  async updatePassword(newPassword) {
    try {
      await supabaseService.updatePassword(newPassword);
    } catch (error) {
      console.error('Update password error:', error);
      throw error;
    }
  }

  /**
   * Verify email with OTP code
   * @param {string} email 
   * @param {string} code 
   */
  async verifyEmail(email, code) {
    try {
      const data = await supabaseService.verifyOTP(email, code);
      await this.loadUserData();
      return data;
    } catch (error) {
      console.error('Email verification error:', error);
      throw error;
    }
  }

  /**
   * Resend confirmation email
   * @param {string} email 
   */
  async resendConfirmation(email) {
    try {
      await supabaseService.resendConfirmationEmail(email);
    } catch (error) {
      console.error('Resend confirmation error:', error);
      throw error;
    }
  }

  /**
   * Check if user is authenticated
   */
  isAuthenticated() {
    return this.currentUser !== null && this.currentUser.emailConfirmed;
  }

  /**
   * Check if user has a specific permission
   * @param {string} permission 
   */
  hasPermission(permission) {
    if (!this.isAuthenticated()) return false;
    return this.currentUser.permissions.includes(permission);
  }

  /**
   * Get current user's auth level
   */
  getLevel() {
    return this.isAuthenticated() ? this.currentUser.level : null;
  }

  /**
   * Get current user data
   */
  getUser() {
    return this.currentUser;
  }

  /**
   * Update a user's role (directors only)
   * @param {string} userId 
   * @param {string} newLevel 
   */
  async updateUserRole(userId, newLevel) {
    if (!this.hasPermission('manage_users')) {
      throw new Error('Permission denied: Only directors can update user roles');
    }

    try {
      await supabaseService.updateUserRole(userId, newLevel);
    } catch (error) {
      console.error('Update user role error:', error);
      throw error;
    }
  }

  /**
   * Get all users and their roles (directors only)
   */
  async getAllUsers() {
    if (!this.hasPermission('manage_users')) {
      throw new Error('Permission denied: Only directors can view all users');
    }

    try {
      return await supabaseService.getAllUserRoles();
    } catch (error) {
      console.error('Get all users error:', error);
      throw error;
    }
  }

  /**
   * Clean up subscriptions
   */
  cleanup() {
    if (this.authSubscription) {
      this.authSubscription.data.subscription.unsubscribe();
    }
  }
}

export const authService = new AuthService();
export { AUTH_LEVELS, PERMISSIONS };