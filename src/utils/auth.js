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
    this.isInitialized = false;
    this.initPromise = null;
    this.authStateListeners = new Set();
    this.initializeAuth();
  }

  /**
   * Initialize authentication state from Supabase
   */
  async initializeAuth() {
    // Store the promise so we can await it later
    this.initPromise = this._doInitialize();
    return this.initPromise;
  }

  async _doInitialize() {
    try {
      // Check if Supabase is configured
      if (!supabaseService.isConfigured()) {
        console.warn('Supabase not configured. Authentication disabled.');
        this.isInitialized = true;
        return;
      }

      // Get current session - this restores the session from localStorage
      const session = await supabaseService.getSession();
      console.log('Initial session check:', session ? 'Session found' : 'No session');
      
      if (session) {
        await this.loadUserData();
      }

      // Listen for auth state changes
      this.authSubscription = supabaseService.onAuthStateChange(async (event, session) => {
        console.log('Auth state changed:', event, session ? 'with session' : 'no session');
        
        if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED' || event === 'INITIAL_SESSION') {
          if (session) {
            await this.loadUserData();
          }
        } else if (event === 'SIGNED_OUT') {
          this.currentUser = null;
        }
        
        // Notify all listeners of auth state change
        this._notifyListeners();
      });

      this.isInitialized = true;
      console.log('Auth initialization complete, user:', this.currentUser?.email || 'none');
    } catch (error) {
      console.error('Error initializing auth:', error);
      this.isInitialized = true;
    }
  }

  /**
   * Wait for auth to be fully initialized
   * @returns {Promise<void>}
   */
  async waitForInit() {
    if (this.initPromise) {
      await this.initPromise;
    }
  }

  /**
   * Subscribe to auth state changes
   * @param {Function} callback - Called whenever auth state changes
   * @returns {Function} - Unsubscribe function
   */
  onAuthStateChange(callback) {
    this.authStateListeners.add(callback);
    return () => {
      this.authStateListeners.delete(callback);
    };
  }

  /**
   * Notify all listeners of auth state change
   */
  _notifyListeners() {
    const isAuth = this.isAuthenticated();
    this.authStateListeners.forEach(callback => {
      try {
        callback(isAuth, this.currentUser);
      } catch (e) {
        console.error('Auth state listener error:', e);
      }
    });
  }

  /**
   * Load user data including role from Supabase
   */
  async loadUserData() {
    try {
      // Get combined profile: auth user + user_roles row
      const profile = await supabaseService.getUserProfile();
      if (!profile || !profile.user) {
        this.currentUser = null;
        return;
      }

      const { user, role } = profile;

      // If the auth user's metadata contains first/last name but the
      // `user_roles` row is missing those fields, upsert them so the
      // user_roles table shows the names (runs only when authenticated).
      try {
        const metadata = user?.user_metadata || {};
        const needUpsert = (metadata.first_name || metadata.last_name) && (!role || !role.first_name || !role.last_name);
        if (needUpsert) {
          // updateUserProfile will upsert the row using the authenticated user
          await supabaseService.updateUserProfile({
            ...(metadata.first_name ? { first_name: metadata.first_name } : {}),
            ...(metadata.last_name ? { last_name: metadata.last_name } : {})
          });

          // Re-fetch profile to pick up the updated row
          const refreshed = await supabaseService.getUserProfile();
          if (refreshed && refreshed.role) {
            // prefer refreshed role
            Object.assign(profile, { role: refreshed.role });
          }
        }
      } catch (e) {
        // Non-fatal: if upsert fails due to RLS or lack of session, continue
        console.warn('Could not upsert profile metadata to user_roles:', e.message || e);
      }

      this.currentUser = {
        id: user.id,
        email: user.email,
        level: role?.level || AUTH_LEVELS.MEMBER,
        permissions: PERMISSIONS[role?.level || AUTH_LEVELS.MEMBER],
        emailConfirmed: user.email_confirmed_at !== null,
        first_name: role?.first_name || user?.user_metadata?.first_name || null,
        last_name: role?.last_name || user?.user_metadata?.last_name || null,
        phone_number: role?.phone_number || null,
        specific_role: role?.specific_role || null,
        joined_at: user.created_at || null
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
  async signUp(email, password, firstName, lastName) {
    try {
      const metadata = {};
      if (firstName) metadata.first_name = firstName;
      if (lastName) metadata.last_name = lastName;

      const data = await supabaseService.signUp(email, password, Object.keys(metadata).length ? metadata : undefined);
      
      // Check if email confirmation is required
      let needsEmailConfirmation = !data.session;

      // If signup did not return a session (common when email confirmation is enabled),
      // try to sign the user in immediately with the provided credentials so the app
      // doesn't require a separate confirm-email step.
      if (!data.session) {
        try {
          const signInResult = await this.signIn(email, password);
          // signIn will call loadUserData() on success
          needsEmailConfirmation = false;
          return {
            ...signInResult,
            needsEmailConfirmation
          };
        } catch (signinError) {
          // If immediate sign-in fails, fall back to original response and indicate
          // that email confirmation is required (keeps behavior predictable).
          console.warn('Auto sign-in after signup failed:', signinError);
        }
      } else {
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
      this._notifyListeners(); // Notify listeners of successful sign in
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
      this._notifyListeners(); // Notify listeners of sign out
    } catch (error) {
      console.error('Sign out error:', error);
      throw error;
    }
  }

  /**
   * Backwards-compatible alias for signOut used by older components
   */
  async logout() {
    return this.signOut();
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
   * Attempt to extend/refresh the current session by touching the session
   * This is a lightweight keep-alive used on user activity.
   */
  async extendSession() {
    try {
      const session = await supabaseService.getSession();
      if (session) {
        // Reload user data to ensure tokens/user info are up-to-date
        await this.loadUserData();
        this._notifyListeners();
      }
      return session;
    } catch (error) {
      console.warn('extendSession failed:', error);
      return null;
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
    // Email confirmation is no longer required for authentication.
    return this.currentUser !== null;
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