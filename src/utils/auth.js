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
    this.connectionUnsubscribe = null;
    this.isLoadingUserData = false; // Prevent concurrent loads
    this.lastNotifiedAuthState = null; // Track last notified state to prevent redundant updates
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

      // Listen for auth state changes - SINGLE listener, never duplicated
      // IMPORTANT: According to Supabase docs, only call onAuthStateChange once
      // and it must be registered early in the app lifecycle
      if (!this.authSubscription) {
        this.authSubscription = supabaseService.onAuthStateChange(async (event, session) => {
          console.log('Auth state changed:', event, session ? 'with session' : 'no session');
          
          // Track if we should notify listeners (only on real auth state changes)
          let shouldNotify = false;
          
          // Handle various auth events
          if (event === 'SIGNED_IN' || event === 'INITIAL_SESSION') {
            if (session) {
              await this.loadUserData();
              shouldNotify = true; // Actual sign-in - notify UI
            }
          } else if (event === 'TOKEN_REFRESHED') {
            // Token was refreshed silently - DON'T reload or notify
            // This is just a background token refresh, not a state change
            // The user is still authenticated with the same identity
            console.log('Token refreshed silently (not reloading UI)');
            
            // Only load user data if we somehow don't have it yet
            if (session && !this.currentUser) {
              await this.loadUserData();
              shouldNotify = true;
            }
            // If we already have currentUser, do nothing - stay silent
          } else if (event === 'SIGNED_OUT') {
            this.currentUser = null;
            shouldNotify = true; // User signed out - notify UI
          }
          
          // Only notify listeners if auth state actually changed
          if (shouldNotify) {
            this._notifyListeners();
          }
        });
      }

      // Also listen for connection restoration (tab visibility, network)
      // Triggers user data reload in background - NON-BLOCKING
      if (!this.connectionUnsubscribe) {
        this.connectionUnsubscribe = supabaseService.onConnectionChange((event, isConnected) => {
          console.log('Connection event:', event, 'connected:', isConnected);
          
          // When visibility is restored or network comes back online,
          // reload user data in background (fire and forget)
          if ((event === 'visibility_restored' || event === 'focus_restored' || event === 'online') && isConnected) {
            if (this.currentUser) {
              // Fire and forget - don't block on this
              this._refreshUserDataInBackground();
            }
          }
        });
      }

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
   * Only notifies if the auth state actually changed since last notification
   */
  _notifyListeners() {
    const isAuth = this.isAuthenticated();
    const userId = this.currentUser?.id;
    
    // Create a state signature to detect actual changes
    const currentState = `${isAuth}:${userId || 'none'}`;
    
    // Only notify if state actually changed
    if (this.lastNotifiedAuthState === currentState) {
      console.log('Auth state unchanged, skipping notification');
      return;
    }
    
    console.log('Auth state changed from', this.lastNotifiedAuthState, 'to', currentState);
    this.lastNotifiedAuthState = currentState;
    
    this.authStateListeners.forEach(callback => {
      try {
        callback(isAuth, this.currentUser);
      } catch (e) {
        console.error('Auth state listener error:', e);
      }
    });
  }

  /**
   * Refresh user data in background after connection restore
   * Fire-and-forget, with timeout protection - NEVER blocks UI
   * Only notifies listeners if auth state actually changed
   */
  _refreshUserDataInBackground() {
    (async () => {
      try {
        console.log('Verifying session in background...');
        
        // Quick timeout - if this takes too long, just skip it
        const timeoutPromise = new Promise((_, reject) => 
          setTimeout(() => reject(new Error('timeout')), 5000)
        );
        
        const session = await Promise.race([
          supabaseService.getSession(),
          timeoutPromise
        ]);
        
        if (session) {
          // Session still valid - silently verify user data is current
          // Don't notify listeners - nothing changed from user's perspective
          const hadUser = !!this.currentUser;
          
          await Promise.race([
            this.loadUserData(),
            timeoutPromise
          ]);
          
          // Only notify if we went from no user to having user (edge case)
          if (!hadUser && this.currentUser) {
            console.log('User data loaded after restore');
            this._notifyListeners();
          } else {
            console.log('Session verified silently');
          }
        } else {
          // Session gone - clear user and notify (this is a real state change)
          console.log('Session no longer valid');
          this.currentUser = null;
          this._notifyListeners();
        }
      } catch (e) {
        // Timeout or error - don't crash, just log
        console.warn('Background session verification skipped:', e.message);
      }
    })();
  }

  /**
   * Load user data including role from Supabase
   * Protected against concurrent calls to prevent race conditions
   */
  async loadUserData() {
    // Prevent concurrent loads (can happen during rapid auth state changes)
    if (this.isLoadingUserData) {
      console.log('loadUserData already in progress, skipping...');
      return;
    }
    
    this.isLoadingUserData = true;
    
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
        joined_at: user.created_at || null,
        approval_status: role?.approval_status || 'pending',
        approved_at: role?.approved_at || null,
        approved_by: role?.approved_by || null
      };
    } catch (error) {
      console.error('Error loading user data:', error);
      this.currentUser = null;
    } finally {
      this.isLoadingUserData = false;
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

      // Best-effort: if signUp returned a user object, try to persist first/last
      // name into the `user_roles` table immediately using the service method.
      // This helps in setups where email confirmation prevents immediate session
      // but we still want the names available in the admin UI.
      try {
        if (data && data.user && (firstName || lastName)) {
          await supabaseService.upsertUserRoleForUserId(data.user.id, {
            first_name: firstName || undefined,
            last_name: lastName || undefined,
            email
          });
        }
      } catch (e) {
        // Non-fatal: ignore failures (likely RLS restrictions). We'll still
        // attempt to upsert when the user signs in (loadUserData flow).
        console.warn('Signup: could not upsert names into user_roles:', e?.message || e);
      }
      
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
          // Try best-effort upsert of the user_roles row using the returned user id
          // if Supabase returned a user object (some setups return user even without a session).
          try {
            if (data.user && (metadata.first_name || metadata.last_name)) {
              await supabaseService.upsertUserRoleForUserId(data.user.id, {
                first_name: metadata.first_name,
                last_name: metadata.last_name,
                email
              });
            }
          } catch (e) {
            // Non-fatal: RLS or permission may prevent anon upsert. Ignore.
            console.warn('Could not upsert user_roles after signup (likely RLS):', e?.message || e);
          }
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
    // User must be logged in AND approved to be authenticated
    return this.currentUser !== null && this.currentUser.approval_status === 'approved';
  }

  /**
   * Check if user is approved
   */
  isApproved() {
    return this.currentUser !== null && this.currentUser.approval_status === 'approved';
  }

  /**
   * Check if user is pending approval
   */
  isPending() {
    return this.currentUser !== null && this.currentUser.approval_status === 'pending';
  }

  /**
   * Check if user is rejected
   */
  isRejected() {
    return this.currentUser !== null && this.currentUser.approval_status === 'rejected';
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
   * Call this when the app is unmounting or during cleanup
   */
  cleanup() {
    if (this.authSubscription) {
      try {
        // Supabase returns { data: { subscription } } from onAuthStateChange
        this.authSubscription.data?.subscription?.unsubscribe?.();
      } catch (e) {
        console.warn('Error unsubscribing from auth:', e);
      }
      this.authSubscription = null;
    }
    
    if (this.connectionUnsubscribe) {
      try {
        this.connectionUnsubscribe();
      } catch (e) {
        console.warn('Error unsubscribing from connection:', e);
      }
      this.connectionUnsubscribe = null;
    }
    
    // Clear listeners
    this.authStateListeners.clear();
  }
}

export const authService = new AuthService();
export { AUTH_LEVELS, PERMISSIONS };