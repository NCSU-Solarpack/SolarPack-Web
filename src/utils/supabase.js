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
  
  // Get all schedule data (teams, projects, tasks)
  async getScheduleData() {
    if (!this.client) throw new Error('Supabase not configured');
    
    try {
      // Fetch all data in parallel
      const [teamsResult, projectsResult] = await Promise.all([
        this.client.from('schedule_teams').select('*').order('name', { ascending: true }),
        this.client.from('schedule_projects').select('*').order('due_date', { ascending: true })
      ]);
      
      if (teamsResult.error) throw teamsResult.error;
      if (projectsResult.error) throw projectsResult.error;
      
      // Fetch tasks for all projects
      const projectIds = (projectsResult.data || []).map(p => p.id);
      let tasksData = [];
      
      if (projectIds.length > 0) {
        const { data: tasks, error: tasksError } = await this.client
          .from('schedule_tasks')
          .select('*')
          .in('project_id', projectIds)
          .order('due_date', { ascending: true });
        
        if (tasksError) throw tasksError;
        tasksData = tasks || [];
      }
      
      // Transform projects to include their tasks
      const projects = (projectsResult.data || []).map(project => ({
        ...this.transformProjectFromDB(project),
        tasks: tasksData
          .filter(task => task.project_id === project.id)
          .map(task => this.transformTaskFromDB(task))
      }));
      
      return {
        teams: (teamsResult.data || []).map(team => ({
          id: team.id,
          name: team.name,
          color: team.color,
          description: team.description
        })),
        projects,
        lastUpdated: new Date().toISOString()
      };
    } catch (error) {
      console.error('Error fetching schedule data:', error);
      throw error;
    }
  }
  
  // ===== TEAMS =====
  
  async getTeams() {
    if (!this.client) throw new Error('Supabase not configured');
    
    const { data, error } = await this.client
      .from('schedule_teams')
      .select('*')
      .order('name', { ascending: true });
    
    if (error) throw error;
    return data || [];
  }
  
  async saveTeam(team) {
    if (!this.client) throw new Error('Supabase not configured');
    
    const { data, error } = await this.client
      .from('schedule_teams')
      .upsert(team)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }
  
  async deleteTeam(id) {
    if (!this.client) throw new Error('Supabase not configured');
    
    const { error } = await this.client
      .from('schedule_teams')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  }
  
  // ===== PROJECTS =====
  
  async getProjects() {
    if (!this.client) throw new Error('Supabase not configured');
    
    const { data, error } = await this.client
      .from('schedule_projects')
      .select('*')
      .order('due_date', { ascending: true });
    
    if (error) throw error;
    return (data || []).map(p => this.transformProjectFromDB(p));
  }
  
  async saveProject(project) {
    if (!this.client) throw new Error('Supabase not configured');
    
    const dbProject = this.transformProjectToDB(project);
    
    const { data, error } = await this.client
      .from('schedule_projects')
      .upsert(dbProject)
      .select()
      .single();
    
    if (error) throw error;
    return this.transformProjectFromDB(data);
  }
  
  async deleteProject(id) {
    if (!this.client) throw new Error('Supabase not configured');
    
    // Tasks will be cascade deleted automatically
    const { error } = await this.client
      .from('schedule_projects')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  }
  
  // ===== TASKS =====
  
  async getTasks(projectId = null) {
    if (!this.client) throw new Error('Supabase not configured');
    
    let query = this.client
      .from('schedule_tasks')
      .select('*')
      .order('due_date', { ascending: true });
    
    if (projectId) {
      query = query.eq('project_id', projectId);
    }
    
    const { data, error } = await query;
    
    if (error) throw error;
    return (data || []).map(t => this.transformTaskFromDB(t));
  }
  
  async saveTask(task) {
    if (!this.client) throw new Error('Supabase not configured');
    
    const dbTask = this.transformTaskToDB(task);
    
    const { data, error } = await this.client
      .from('schedule_tasks')
      .upsert(dbTask)
      .select()
      .single();
    
    if (error) throw error;
    return this.transformTaskFromDB(data);
  }
  
  async deleteTask(id) {
    if (!this.client) throw new Error('Supabase not configured');
    
    const { error } = await this.client
      .from('schedule_tasks')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  }
  

  
  // ===== TRANSFORMATION HELPERS =====
  
  // Transform project from database format to application format
  transformProjectFromDB(dbProject) {
    if (!dbProject) return null;
    
    return {
      id: dbProject.id,
      title: dbProject.title,
      description: dbProject.description,
      team: dbProject.team,
      priority: dbProject.priority,
      status: dbProject.status,
      startDate: dbProject.start_date,
      dueDate: dbProject.due_date,
      estimatedHours: dbProject.estimated_hours || 0,
      actualHours: dbProject.actual_hours || 0,
      progress: dbProject.progress || 0,
      assignedTo: dbProject.assigned_to,
      notes: dbProject.notes,
      tasks: [] // Tasks will be populated separately
    };
  }
  
  // Transform project from application format to database format
  transformProjectToDB(project) {
    const dbProject = {
      title: project.title,
      description: project.description,
      team: project.team,
      priority: project.priority || 'medium',
      status: project.status || 'planning',
      start_date: project.startDate,
      due_date: project.dueDate,
      estimated_hours: project.estimatedHours || 0,
      actual_hours: project.actualHours || 0,
      progress: project.progress || 0,
      assigned_to: project.assignedTo,
      notes: project.notes
    };
    
    // Only include id if it exists (for updates)
    if (project.id) {
      dbProject.id = project.id;
    }
    
    return dbProject;
  }
  
  // Transform task from database format to application format
  transformTaskFromDB(dbTask) {
    if (!dbTask) return null;
    
    return {
      id: dbTask.id,
      projectId: dbTask.project_id,
      title: dbTask.title,
      description: dbTask.description,
      startDate: dbTask.start_date,
      dueDate: dbTask.due_date,
      estimatedHours: dbTask.estimated_hours || 0,
      actualHours: dbTask.actual_hours || 0,
      status: dbTask.status,
      priority: dbTask.priority,
      assignedTo: dbTask.assigned_to,
      progress: dbTask.progress || 0,
      notes: dbTask.notes
    };
  }
  
  // Transform task from application format to database format
  transformTaskToDB(task) {
    const dbTask = {
      project_id: task.projectId,
      title: task.title,
      description: task.description,
      start_date: task.startDate,
      due_date: task.dueDate,
      estimated_hours: task.estimatedHours || 0,
      actual_hours: task.actualHours || 0,
      status: task.status || 'pending',
      priority: task.priority || 'medium',
      assigned_to: task.assignedTo,
      progress: task.progress || 0,
      notes: task.notes
    };
    
    // Only include id if it exists (for updates)
    if (task.id) {
      dbTask.id = task.id;
    }
    
    return dbTask;
  }
  


  // ===== ORDERS DATA =====
  
  async getOrders() {
    if (!this.client) throw new Error('Supabase not configured');
    
    const { data, error } = await this.client
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    
    // Transform database format to application format
    const transformedOrders = (data || []).map(order => this.transformOrderFromDB(order));
    
    return {
      orders: transformedOrders,
      lastUpdated: new Date().toISOString()
    };
  }

  async createOrder(orderData) {
    if (!this.client) throw new Error('Supabase not configured');
    
    // Transform application format to database format
    const dbOrder = this.transformOrderToDB(orderData);
    
    const { data, error } = await this.client
      .from('orders')
      .insert(dbOrder)
      .select()
      .single();
    
    if (error) throw error;
    return this.transformOrderFromDB(data);
  }

  async updateOrder(id, orderData) {
    if (!this.client) throw new Error('Supabase not configured');
    
    // Transform application format to database format
    const dbOrder = this.transformOrderToDB(orderData);
    dbOrder.updated_at = new Date().toISOString();
    dbOrder.last_updated = new Date().toISOString();
    
    const { data, error } = await this.client
      .from('orders')
      .update(dbOrder)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return this.transformOrderFromDB(data);
  }

  async deleteOrder(id) {
    if (!this.client) throw new Error('Supabase not configured');
    
    const { error } = await this.client
      .from('orders')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  }

  // Transform order from database format to application format (nested objects)
  transformOrderFromDB(dbOrder) {
    if (!dbOrder) return null;
    
    return {
      id: dbOrder.id,
      submissionTimestamp: dbOrder.submission_timestamp,
      submissionDetails: {
        subteam: dbOrder.subteam,
        submitterName: dbOrder.submitter_name,
        submitterEmail: dbOrder.submitter_email
      },
      materialDetails: {
        materialName: dbOrder.material_name,
        specifications: dbOrder.specifications,
        materialLink: dbOrder.material_link,
        supplier: dbOrder.supplier,
        supplierContact: dbOrder.supplier_contact
      },
      costBreakdown: {
        unitPrice: parseFloat(dbOrder.unit_price || 0),
        quantity: dbOrder.quantity || 1,
        subtotal: parseFloat(dbOrder.subtotal || 0),
        shippingCost: parseFloat(dbOrder.shipping_cost || 0),
        taxes: parseFloat(dbOrder.taxes || 0),
        fees: parseFloat(dbOrder.fees || 0),
        totalCost: parseFloat(dbOrder.total_cost || 0)
      },
      projectDetails: {
        purpose: dbOrder.purpose,
        priority: dbOrder.priority || 'medium',
        urgency: dbOrder.urgency || 'flexible',
        neededByDate: dbOrder.needed_by_date
      },
      approvalWorkflow: {
        technicalDirectorApproval: {
          status: dbOrder.tech_approval_status || 'pending',
          approvedBy: dbOrder.tech_approved_by,
          approvalDate: dbOrder.tech_approval_date,
          comments: dbOrder.tech_comments || '',
          denialReason: dbOrder.tech_denial_reason || ''
        },
        projectDirectorPurchaseApproval: {
          status: dbOrder.project_approval_status || 'pending',
          approvedBy: dbOrder.project_approved_by,
          approvalDate: dbOrder.project_approval_date,
          comments: dbOrder.project_comments || '',
          denialReason: dbOrder.project_denial_reason || ''
        }
      },
      sponsorshipInfo: {
        canBeSponsored: dbOrder.can_be_sponsored || false,
        sponsorContactName: dbOrder.sponsor_contact_name,
        sponsorContactEmail: dbOrder.sponsor_contact_email,
        sponsorCompany: dbOrder.sponsor_company,
        sponsorshipRequested: dbOrder.sponsorship_requested || false,
        sponsorshipRequestDate: dbOrder.sponsorship_request_date,
        sponsorshipSuccessful: dbOrder.sponsorship_successful || false,
        sponsorshipResponse: dbOrder.sponsorship_response || '',
        sponsorshipResponseDate: dbOrder.sponsorship_response_date
      },
      purchaseStatus: {
        purchased: dbOrder.purchased || false,
        purchaseDate: dbOrder.purchase_date,
        purchaseOrderNumber: dbOrder.purchase_order_number || '',
        actualCost: dbOrder.actual_cost ? parseFloat(dbOrder.actual_cost) : null,
        purchasedBy: dbOrder.purchased_by || ''
      },
      deliveryInfo: {
        expectedArrivalDate: dbOrder.expected_arrival_date,
        actualArrivalDate: dbOrder.actual_arrival_date,
        deliveredToSubteam: dbOrder.delivered_to_subteam || false,
        deliveryConfirmedBy: dbOrder.delivery_confirmed_by || '',
        deliveryNotes: dbOrder.delivery_notes || '',
        trackingNumber: dbOrder.tracking_number || ''
      },
      documentation: {
        receiptInvoice: {
          uploaded: dbOrder.receipt_uploaded || false,
          fileName: dbOrder.receipt_file_name || '',
          uploadDate: dbOrder.receipt_upload_date,
          uploadedBy: dbOrder.receipt_uploaded_by || ''
        },
        additionalDocuments: dbOrder.additional_documents || []
      },
      returnInfo: {
        returned: dbOrder.returned || false,
        returnDate: dbOrder.return_date,
        returnReason: dbOrder.return_reason || '',
        returnAuthorizedBy: dbOrder.return_authorized_by || '',
        refundAmount: dbOrder.refund_amount ? parseFloat(dbOrder.refund_amount) : null,
        refundProcessed: dbOrder.refund_processed || false
      },
      status: dbOrder.status || 'pending_technical_approval',
      lastUpdated: dbOrder.last_updated || dbOrder.updated_at,
      createdBy: dbOrder.created_by
    };
  }

  // Transform order from application format (nested objects) to database format (flat)
  transformOrderToDB(order) {
    const dbOrder = {
      // Submission Details
      submission_timestamp: order.submissionTimestamp || new Date().toISOString(),
      subteam: order.submissionDetails?.subteam,
      submitter_name: order.submissionDetails?.submitterName,
      submitter_email: order.submissionDetails?.submitterEmail,
      created_by: order.createdBy || order.submissionDetails?.submitterEmail,
      
      // Material Details
      material_name: order.materialDetails?.materialName,
      specifications: order.materialDetails?.specifications,
      material_link: order.materialDetails?.materialLink,
      supplier: order.materialDetails?.supplier,
      supplier_contact: order.materialDetails?.supplierContact,
      
      // Cost Breakdown
      unit_price: order.costBreakdown?.unitPrice,
      quantity: order.costBreakdown?.quantity || 1,
      subtotal: order.costBreakdown?.subtotal,
      shipping_cost: order.costBreakdown?.shippingCost || 0,
      taxes: order.costBreakdown?.taxes || 0,
      fees: order.costBreakdown?.fees || 0,
      total_cost: order.costBreakdown?.totalCost,
      
      // Project Details
      purpose: order.projectDetails?.purpose,
      priority: order.projectDetails?.priority || 'medium',
      urgency: order.projectDetails?.urgency || 'flexible',
      needed_by_date: order.projectDetails?.neededByDate,
      
      // Approval Workflow - Technical Director
      tech_approval_status: order.approvalWorkflow?.technicalDirectorApproval?.status || 'pending',
      tech_approved_by: order.approvalWorkflow?.technicalDirectorApproval?.approvedBy,
      tech_approval_date: order.approvalWorkflow?.technicalDirectorApproval?.approvalDate,
      tech_comments: order.approvalWorkflow?.technicalDirectorApproval?.comments || '',
      tech_denial_reason: order.approvalWorkflow?.technicalDirectorApproval?.denialReason || '',
      
      // Approval Workflow - Project Director
      project_approval_status: order.approvalWorkflow?.projectDirectorPurchaseApproval?.status || 'pending',
      project_approved_by: order.approvalWorkflow?.projectDirectorPurchaseApproval?.approvedBy,
      project_approval_date: order.approvalWorkflow?.projectDirectorPurchaseApproval?.approvalDate,
      project_comments: order.approvalWorkflow?.projectDirectorPurchaseApproval?.comments || '',
      project_denial_reason: order.approvalWorkflow?.projectDirectorPurchaseApproval?.denialReason || '',
      
      // Sponsorship Info
      can_be_sponsored: order.sponsorshipInfo?.canBeSponsored || false,
      sponsor_contact_name: order.sponsorshipInfo?.sponsorContactName,
      sponsor_contact_email: order.sponsorshipInfo?.sponsorContactEmail,
      sponsor_company: order.sponsorshipInfo?.sponsorCompany,
      sponsorship_requested: order.sponsorshipInfo?.sponsorshipRequested || false,
      sponsorship_request_date: order.sponsorshipInfo?.sponsorshipRequestDate,
      sponsorship_successful: order.sponsorshipInfo?.sponsorshipSuccessful || false,
      sponsorship_response: order.sponsorshipInfo?.sponsorshipResponse || '',
      sponsorship_response_date: order.sponsorshipInfo?.sponsorshipResponseDate,
      
      // Purchase Status
      purchased: order.purchaseStatus?.purchased || false,
      purchase_date: order.purchaseStatus?.purchaseDate,
      purchase_order_number: order.purchaseStatus?.purchaseOrderNumber || '',
      actual_cost: order.purchaseStatus?.actualCost,
      purchased_by: order.purchaseStatus?.purchasedBy || '',
      
      // Delivery Info
      expected_arrival_date: order.deliveryInfo?.expectedArrivalDate,
      actual_arrival_date: order.deliveryInfo?.actualArrivalDate,
      delivered_to_subteam: order.deliveryInfo?.deliveredToSubteam || false,
      delivery_confirmed_by: order.deliveryInfo?.deliveryConfirmedBy || '',
      delivery_notes: order.deliveryInfo?.deliveryNotes || '',
      tracking_number: order.deliveryInfo?.trackingNumber || '',
      
      // Documentation
      receipt_uploaded: order.documentation?.receiptInvoice?.uploaded || false,
      receipt_file_name: order.documentation?.receiptInvoice?.fileName || '',
      receipt_upload_date: order.documentation?.receiptInvoice?.uploadDate,
      receipt_uploaded_by: order.documentation?.receiptInvoice?.uploadedBy || '',
      additional_documents: order.documentation?.additionalDocuments || [],
      
      // Return Info
      returned: order.returnInfo?.returned || false,
      return_date: order.returnInfo?.returnDate,
      return_reason: order.returnInfo?.returnReason || '',
      return_authorized_by: order.returnInfo?.returnAuthorizedBy || '',
      refund_amount: order.returnInfo?.refundAmount,
      refund_processed: order.returnInfo?.refundProcessed || false,
      
      // Status and Metadata
      status: order.status || 'pending_technical_approval',
      last_updated: order.lastUpdated || new Date().toISOString()
    };
    
    // Only include id if it exists (for updates)
    if (order.id) {
      dbOrder.id = order.id;
    }
    
    return dbOrder;
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

  // ===== BLOGS DATA =====
  
  async getBlogs() {
    if (!this.client) throw new Error('Supabase not configured');
    
    const { data, error } = await this.client
      .from('blogs')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data || [];
  }

  async getBlog(id) {
    if (!this.client) throw new Error('Supabase not configured');
    
    const { data, error } = await this.client
      .from('blogs')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data;
  }

  async getPublishedBlogs() {
    if (!this.client) throw new Error('Supabase not configured');
    
    const { data, error } = await this.client
      .from('blogs')
      .select('*')
      .eq('published', true)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data || [];
  }

  async createBlog(blogData) {
    if (!this.client) throw new Error('Supabase not configured');
    
    const { data, error } = await this.client
      .from('blogs')
      .insert({
        title: blogData.title,
        author: blogData.author,
        body: blogData.body,
        image_url: blogData.image_url || null,
        link_url: blogData.link_url || null,
        link_text: blogData.link_text || null,
        published: blogData.published || false
      })
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }

  async updateBlog(id, blogData) {
    if (!this.client) throw new Error('Supabase not configured');
    
    const { data, error } = await this.client
      .from('blogs')
      .update({
        title: blogData.title,
        author: blogData.author,
        body: blogData.body,
        image_url: blogData.image_url || null,
        link_url: blogData.link_url || null,
        link_text: blogData.link_text || null,
        published: blogData.published
      })
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }

  async deleteBlog(id) {
    if (!this.client) throw new Error('Supabase not configured');
    
    // First, get the blog to find its image URL
    const { data: blog } = await this.client
      .from('blogs')
      .select('image_url')
      .eq('id', id)
      .single();
    
    // Delete the image from storage if it exists and is a Supabase URL
    if (blog?.image_url && blog.image_url.includes('supabase')) {
      try {
        await this.deleteBlogImage(blog.image_url);
      } catch (error) {
        console.warn('Failed to delete image from storage:', error);
      }
    }
    
    const { error } = await this.client
      .from('blogs')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  }

  /**
   * Upload a blog image to Supabase Storage
   * @param {File} file - The image file to upload
   * @param {string} blogId - The blog's ID (used for unique filename)
   * @returns {Promise<string>} - The public URL of the uploaded image
   */
  async uploadBlogImage(file, blogId) {
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
    const fileName = `${blogId}-${timestamp}.${fileExt}`;
    const filePath = `blog-headers/${fileName}`;
    
    // Upload the file
    const { data, error } = await this.client.storage
      .from('blog-images')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      });
    
    if (error) throw error;
    
    // Get the public URL
    const { data: { publicUrl } } = this.client.storage
      .from('blog-images')
      .getPublicUrl(filePath);
    
    return publicUrl;
  }

  /**
   * Delete a blog image from Supabase Storage
   * @param {string} imageUrl - The public URL of the image to delete
   */
  async deleteBlogImage(imageUrl) {
    if (!this.client) throw new Error('Supabase not configured');
    
    // Extract the file path from the URL
    // URL format: https://[project].supabase.co/storage/v1/object/public/blog-images/blog-headers/filename.jpg
    const urlParts = imageUrl.split('/blog-images/');
    if (urlParts.length < 2) {
      console.warn('Invalid image URL format:', imageUrl);
      return;
    }
    
    const filePath = urlParts[1];
    
    const { error } = await this.client.storage
      .from('blog-images')
      .remove([filePath]);
    
    if (error) throw error;
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
