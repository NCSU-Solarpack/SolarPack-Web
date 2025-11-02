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
    
    // First, get the member to find their image URL
    const { data: member } = await this.client
      .from('team_members')
      .select('image')
      .eq('id', id)
      .single();
    
    // Delete the image from storage if it exists and is a Supabase URL
    if (member?.image && member.image.includes('supabase')) {
      try {
        await this.deleteTeamMemberImage(member.image);
      } catch (error) {
        console.warn('Failed to delete image from storage:', error);
      }
    }
    
    const { error } = await this.client
      .from('team_members')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  }

  /**
   * Upload a team member image to Supabase Storage
   * @param {File} file - The image file to upload
   * @param {string} memberId - The team member's ID (used for unique filename)
   * @returns {Promise<string>} - The public URL of the uploaded image
   */
  async uploadTeamMemberImage(file, memberId) {
    if (!this.client) throw new Error('Supabase not configured');
    
    // Validate file type
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
    if (!validTypes.includes(file.type)) {
      throw new Error('Invalid file type. Please upload a JPEG, PNG, WebP, or GIF image.');
    }
    
    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      throw new Error('File size too large. Maximum size is 5MB.');
    }
    
    // Create a unique filename with timestamp to avoid caching issues
    const fileExt = file.name.split('.').pop();
    const timestamp = Date.now();
    const fileName = `${memberId}-${timestamp}.${fileExt}`;
    const filePath = `team-headshots/${fileName}`;
    
    // Upload the file
    const { data, error } = await this.client.storage
      .from('team-images')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      });
    
    if (error) throw error;
    
    // Get the public URL
    const { data: { publicUrl } } = this.client.storage
      .from('team-images')
      .getPublicUrl(filePath);
    
    return publicUrl;
  }

  /**
   * Delete a team member image from Supabase Storage
   * @param {string} imageUrl - The public URL of the image to delete
   */
  async deleteTeamMemberImage(imageUrl) {
    if (!this.client) throw new Error('Supabase not configured');
    
    // Extract the file path from the URL
    // URL format: https://[project].supabase.co/storage/v1/object/public/team-images/team-headshots/filename.jpg
    const urlParts = imageUrl.split('/team-images/');
    if (urlParts.length < 2) {
      console.warn('Invalid image URL format:', imageUrl);
      return;
    }
    
    const filePath = urlParts[1];
    
    const { error } = await this.client.storage
      .from('team-images')
      .remove([filePath]);
    
    if (error) throw error;
  }

  // ===== ALUMNI DATA =====
  
  async getAlumni() {
    if (!this.client) throw new Error('Supabase not configured');
    
    const { data, error } = await this.client
      .from('alumni')
      .select('*')
      .order('order', { ascending: false });
    
    if (error) throw error;
    return {
      alumniData: Array.isArray(data) ? data : [],
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
    const numericId = typeof id === 'string' ? parseInt(id, 10) : id;
    if (!Number.isFinite(numericId)) throw new Error('Invalid id for deletion');
    const { error } = await this.client
      .from('alumni')
      .delete()
      .eq('id', numericId);
    if (error) throw error;
  }

  /**
   * Safely delete an alumni semester by id, or by semester name if id is missing.
   * @param {{id?: number, semester?: string}} target
   */
  async deleteAlumniSemesterSafe(target) {
    if (!this.client) throw new Error('Supabase not configured');
    if (!target || ((typeof target.id !== 'number' && typeof target.id !== 'string') && !target.semester)) {
      throw new Error('Invalid delete target');
    }

    let idToDelete = target.id;
    if (typeof idToDelete === 'string') {
      const n = parseInt(idToDelete, 10);
      if (Number.isFinite(n)) idToDelete = n;
    }

    if (typeof idToDelete !== 'number') {
      // Fallback: resolve by semester name (assumed unique like "Fall 2025")
      const { data, error } = await this.client
        .from('alumni')
        .select('id')
        .eq('semester', target.semester)
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle();

      if (error) throw error;
      if (!data?.id) throw new Error('Semester not found');
      idToDelete = data.id;
    }

    const { error: delError } = await this.client
      .from('alumni')
      .delete()
      .eq('id', idToDelete);

    if (delError) throw delError;
  }

  /**
   * Batch update order of alumni semesters
   * @param {Array<{id:number, order:number}>} orderedItems
   */
  async saveAlumniOrder(orderedItems) {
    if (!this.client) throw new Error('Supabase not configured');
    if (!Array.isArray(orderedItems) || orderedItems.length === 0) return;

    // Only update rows that have a valid id
    const valid = orderedItems.filter(it => typeof it.id === 'number' && !Number.isNaN(it.id));
    if (valid.length === 0) return;

    // Perform updates individually to avoid inserting rows missing NOT NULL fields
    const updates = valid.map(({ id, order }) =>
      this.client
        .from('alumni')
        .update({ order })
        .eq('id', id)
    );

    const results = await Promise.all(updates);
    const firstError = results.find(r => r.error)?.error;
    if (firstError) throw firstError;
  }

  // ===== SPONSOR DATA =====
  
  async getSponsors() {
    if (!this.client) throw new Error('Supabase not configured');
    
    const { data, error } = await this.client
      .from('sponsors')
      .select('*')
      .order('order', { ascending: true });
    
    if (error) throw error;
    
    // Group sponsors by tier for the UI
    const tierMap = {};
    (data || []).forEach(sponsor => {
      if (!tierMap[sponsor.tier]) {
        tierMap[sponsor.tier] = [];
      }
      tierMap[sponsor.tier].push({
        id: sponsor.id,
        name: sponsor.name,
        logo: sponsor.logo,
        website: sponsor.website,
        order: sponsor.order
      });
    });
    
    // Convert to array format expected by UI
    const sponsorTiers = Object.keys(tierMap).map(tier => ({
      tier,
      sponsors: tierMap[tier]
    }));
    
    return {
      sponsorTiers,
      lastUpdated: new Date().toISOString()
    };
  }

  async saveSponsor(sponsor) {
    if (!this.client) throw new Error('Supabase not configured');
    
    // If sponsor has an id, update; otherwise insert
    if (sponsor.id) {
      const { data, error } = await this.client
        .from('sponsors')
        .upsert(sponsor)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    } else {
      const { data, error } = await this.client
        .from('sponsors')
        .insert(sponsor)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    }
  }

  async deleteSponsor(id) {
    if (!this.client) throw new Error('Supabase not configured');
    
    // First, get the sponsor to find their logo URL
    const { data: sponsor } = await this.client
      .from('sponsors')
      .select('logo')
      .eq('id', id)
      .single();
    
    // Delete the logo from storage if it exists and is a Supabase URL
    if (sponsor?.logo && sponsor.logo.includes('supabase')) {
      try {
        await this.deleteSponsorLogo(sponsor.logo);
      } catch (error) {
        console.warn('Failed to delete logo from storage:', error);
      }
    }
    
    const { error } = await this.client
      .from('sponsors')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  }

  /**
   * Upload a sponsor logo to Supabase Storage
   * @param {File} file - The logo image file to upload
   * @param {string} sponsorId - The sponsor's ID (used for unique filename)
   * @returns {Promise<string>} - The public URL of the uploaded logo
   */
  async uploadSponsorLogo(file, sponsorId) {
    if (!this.client) throw new Error('Supabase not configured');
    
    // Validate file type
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml'];
    if (!validTypes.includes(file.type)) {
      throw new Error('Invalid file type. Please upload a JPEG, PNG, WebP, SVG, or GIF image.');
    }
    
    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      throw new Error('File size too large. Maximum size is 5MB.');
    }
    
    // Create a unique filename with timestamp to avoid caching issues
    const fileExt = file.name.split('.').pop();
    const timestamp = Date.now();
    const fileName = `${sponsorId}-${timestamp}.${fileExt}`;
    const filePath = `sponsor-logos/${fileName}`;
    
    // Upload the file
    const { data, error } = await this.client.storage
      .from('sponsor-logos')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      });
    
    if (error) throw error;
    
    // Get the public URL
    const { data: { publicUrl } } = this.client.storage
      .from('sponsor-logos')
      .getPublicUrl(filePath);
    
    return publicUrl;
  }

  /**
   * Delete a sponsor logo from Supabase Storage
   * @param {string} logoUrl - The public URL of the logo to delete
   */
  async deleteSponsorLogo(logoUrl) {
    if (!this.client) throw new Error('Supabase not configured');
    
    // Extract the file path from the URL
    // URL format: https://[project].supabase.co/storage/v1/object/public/sponsor-logos/sponsor-logos/filename.jpg
    const urlParts = logoUrl.split('/sponsor-logos/');
    if (urlParts.length < 2) {
      console.warn('Invalid logo URL format:', logoUrl);
      return;
    }
    
    const filePath = urlParts[1];
    
    const { error } = await this.client.storage
      .from('sponsor-logos')
      .remove([filePath]);
    
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
