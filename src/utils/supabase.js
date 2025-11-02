// Supabase service for real-time database operations
// Replaces GitHub-based JSON file storage with instant database updates

import { createClient } from '@supabase/supabase-js';

// Supabase configuration from environment variables
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || '';
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Initialize Supabase client
let supabase = null;

const initializeSupabase = () => {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    console.warn('Supabase credentials not configured. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in .env file.');
    return null;
  }

  if (!supabase) {
    supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    console.log('Supabase client initialized');
  }

  return supabase;
};

class SupabaseService {
  constructor() {
    this.client = initializeSupabase();
  }

  // Check if Supabase is configured
  isConfigured() {
    return this.client !== null;
  }

  // ===== TEAM DATA =====
  
  async getTeamMembers() {
    if (!this.client) throw new Error('Supabase not configured');
    
    const { data, error } = await this.client
      .from('team_members')
      .select('*')
      .order('order', { ascending: true });
    
    if (error) throw error;
    return {
      teamMembers: data || [],
      lastUpdated: new Date().toISOString()
    };
  }

  async saveTeamMember(member) {
    if (!this.client) throw new Error('Supabase not configured');
    
    // If member has an id, update; otherwise insert
    if (member.id) {
      const { data, error } = await this.client
        .from('team_members')
        .upsert(member)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    } else {
      const { data, error } = await this.client
        .from('team_members')
        .insert(member)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    }
  }

  async deleteTeamMember(id) {
    if (!this.client) throw new Error('Supabase not configured');
    
    const { error } = await this.client
      .from('team_members')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  }

  // ===== ALUMNI DATA =====
  
  async getAlumni() {
    if (!this.client) throw new Error('Supabase not configured');
    
    const { data, error } = await this.client
      .from('alumni')
      .select('*')
      .order('semester', { ascending: false });
    
    if (error) throw error;
    return {
      alumniData: data || [],
      lastUpdated: new Date().toISOString()
    };
  }

  async saveAlumniSemester(semester) {
    if (!this.client) throw new Error('Supabase not configured');
    
    const { data, error } = await this.client
      .from('alumni')
      .upsert(semester)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }

  async deleteAlumniSemester(id) {
    if (!this.client) throw new Error('Supabase not configured');
    
    const { error } = await this.client
      .from('alumni')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  }

  // ===== SPONSOR DATA =====
  
  async getSponsors() {
    if (!this.client) throw new Error('Supabase not configured');
    
    const { data, error } = await this.client
      .from('sponsors')
      .select('*')
      .order('tier', { ascending: true });
    
    if (error) throw error;
    return {
      sponsorTiers: data || [],
      lastUpdated: new Date().toISOString()
    };
  }

  async saveSponsor(sponsor) {
    if (!this.client) throw new Error('Supabase not configured');
    
    const { data, error } = await this.client
      .from('sponsors')
      .upsert(sponsor)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }

  async deleteSponsor(id) {
    if (!this.client) throw new Error('Supabase not configured');
    
    const { error } = await this.client
      .from('sponsors')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  }

  // ===== SCHEDULE DATA =====
  
  async getSchedules() {
    if (!this.client) throw new Error('Supabase not configured');
    
    const { data, error } = await this.client
      .from('schedules')
      .select('*')
      .order('date', { ascending: false });
    
    if (error) throw error;
    return {
      schedules: data || [],
      lastUpdated: new Date().toISOString()
    };
  }

  async saveSchedule(schedule) {
    if (!this.client) throw new Error('Supabase not configured');
    
    const { data, error } = await this.client
      .from('schedules')
      .upsert(schedule)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }

  async deleteSchedule(id) {
    if (!this.client) throw new Error('Supabase not configured');
    
    const { error } = await this.client
      .from('schedules')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  }

  // ===== ORDERS DATA =====
  
  async getOrders() {
    if (!this.client) throw new Error('Supabase not configured');
    
    const { data, error } = await this.client
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return {
      orders: data || [],
      lastUpdated: new Date().toISOString()
    };
  }

  async saveOrder(order) {
    if (!this.client) throw new Error('Supabase not configured');
    
    const { data, error } = await this.client
      .from('orders')
      .upsert(order)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }

  async deleteOrder(id) {
    if (!this.client) throw new Error('Supabase not configured');
    
    const { error } = await this.client
      .from('orders')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  }

  // ===== REAL-TIME SUBSCRIPTIONS =====
  
  // Subscribe to changes in a table
  subscribeToTable(tableName, callback) {
    if (!this.client) throw new Error('Supabase not configured');
    
    const subscription = this.client
      .channel(`public:${tableName}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: tableName
        },
        callback
      )
      .subscribe();
    
    return subscription;
  }

  // Unsubscribe from changes
  unsubscribe(subscription) {
    if (subscription) {
      subscription.unsubscribe();
    }
  }

  // ===== AUTHENTICATION (Optional) =====
  // You can use Supabase Auth to replace your custom auth system
  
  async signIn(email, password) {
    if (!this.client) throw new Error('Supabase not configured');
    
    const { data, error } = await this.client.auth.signInWithPassword({
      email,
      password
    });
    
    if (error) throw error;
    return data;
  }

  async signOut() {
    if (!this.client) throw new Error('Supabase not configured');
    
    const { error } = await this.client.auth.signOut();
    if (error) throw error;
  }

  async getUser() {
    if (!this.client) throw new Error('Supabase not configured');
    
    const { data: { user } } = await this.client.auth.getUser();
    return user;
  }
}

// Export singleton instance
export const supabaseService = new SupabaseService();
export default supabaseService;
