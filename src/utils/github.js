// GitHub API integration for updating content files
// This allows the admin interface to directly update JSON files in the repository

const GITHUB_CONFIG = {
  owner: 'NCSU-Solarpack', // Your GitHub username/organization
  repo: 'SolarPack-Web',   // Your repository name
  branch: 'main'           // Target branch
};

class GitHubService {
  constructor() {
    // Priority order for token:
    // 1. Environment variable (secure, local development)
    // 2. localStorage (user input)
    this.token = import.meta.env.VITE_GITHUB_TOKEN || null;
    this.baseUrl = 'https://api.github.com';
    
    console.log('GitHub Service initialized');
    console.log('Environment token available:', import.meta.env.VITE_GITHUB_TOKEN ? 'Yes' : 'No');
    
    // Load token on initialization
    this.loadToken();
  }

  // Set the GitHub token (you'll need to provide this in the admin interface)
  setToken(token) {
    this.token = token;
    localStorage.setItem('github_token', token);
  }

  // Load token with priority: env var > localStorage
  loadToken() {
    // Use environment variable if available
    if (import.meta.env.VITE_GITHUB_TOKEN) {
      this.token = import.meta.env.VITE_GITHUB_TOKEN;
      console.log('Using environment token');
      return this.token;
    }
    
    // Fall back to localStorage
    if (!this.token) {
      this.token = localStorage.getItem('github_token');
      console.log('Using localStorage token:', this.token ? 'Found' : 'Not found');
    }
    return this.token;
  }

  // Remove token
  clearToken() {
    this.token = null;
    localStorage.removeItem('github_token');
  }

  // Check if we have a valid token
  hasToken() {
    return this.loadToken() !== null;
  }

  // Get the SHA of a file (required for updates)
  async getFileSHA(path) {
    if (!this.token) throw new Error('No GitHub token available');

    const url = `${this.baseUrl}/repos/${GITHUB_CONFIG.owner}/${GITHUB_CONFIG.repo}/contents/${path}`;
    
    try {
      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${this.token}`,
          'Accept': 'application/vnd.github.v3+json',
          'X-GitHub-Api-Version': '2022-11-28'
        }
      });

      if (!response.ok) {
        const errorData = await response.text();
        console.error('GitHub API error getting SHA:', response.status, errorData);
        throw new Error(`GitHub API error: ${response.status} - ${errorData}`);
      }

      const data = await response.json();
      return data.sha;
    } catch (error) {
      console.error('Error getting file SHA:', error);
      throw error;
    }
  }

  // Update a file in the repository
  async updateFile(path, content, message) {
    if (!this.token) throw new Error('No GitHub token available');

    try {
      console.log('Updating file:', path);
      console.log('Using token:', this.token ? `${this.token.substring(0, 8)}...` : 'No token');
      
      // First, get the current file SHA
      const sha = await this.getFileSHA(path);
      console.log('Got SHA:', sha);
      
      // Encode content as base64 (Unicode-safe)
      const jsonString = JSON.stringify(content, null, 2);
      
      // Use TextEncoder for proper Unicode handling
      const encoder = new TextEncoder();
      const uint8Array = encoder.encode(jsonString);
      
      // Convert Uint8Array to base64
      let binaryString = '';
      uint8Array.forEach(byte => {
        binaryString += String.fromCharCode(byte);
      });
      const encodedContent = btoa(binaryString);
      
      const url = `${this.baseUrl}/repos/${GITHUB_CONFIG.owner}/${GITHUB_CONFIG.repo}/contents/${path}`;
      
      const requestBody = {
        message: message || `Update ${path}`,
        content: encodedContent,
        sha: sha,
        branch: GITHUB_CONFIG.branch
      };
      
      console.log('Request body:', requestBody);
      
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${this.token}`,
          'Accept': 'application/vnd.github.v3+json',
          'Content-Type': 'application/json',
          'X-GitHub-Api-Version': '2022-11-28'
        },
        body: JSON.stringify(requestBody)
      });

      console.log('Update response status:', response.status);

      if (!response.ok) {
        const errorData = await response.text();
        console.error('GitHub API error updating file:', response.status, errorData);
        throw new Error(`GitHub API error: ${response.status} - ${errorData}`);
      }

      const result = await response.json();
      console.log('File updated successfully:', result);
      return result;
    } catch (error) {
      console.error('Error updating file:', error);
      throw error;
    }
  }

  // Save team data
  async saveTeamData(teamData) {
    return this.updateFile('public/data/team.json', teamData, 'Update team data via admin interface');
  }

  // Save schedule data
  async saveScheduleData(scheduleData) {
    return this.updateFile('public/data/schedules.json', scheduleData, 'Update schedules and orders via admin interface');
  }

  // Save content data (announcements, events)
  async saveContentData(contentData) {
    return this.updateFile('public/data/content.json', contentData, 'Update announcements and events via admin interface');
  }

  // Trigger a rebuild (DEPRECATED - no longer needed with GitHub raw content)
  // Data files are now served directly from GitHub, so no build is required
  async triggerRebuild() {
    // Skip triggering rebuild for data-only changes
    // The workflow now ignores public/data/** changes
    console.log('Skipping rebuild - data is served from GitHub raw content');
    return Promise.resolve();
  }

  // Test the connection
  async testConnection() {
    if (!this.token) throw new Error('No GitHub token available');

    try {
      const url = `${this.baseUrl}/repos/${GITHUB_CONFIG.owner}/${GITHUB_CONFIG.repo}`;
      
      console.log('Testing connection to:', url);
      console.log('Using token:', this.token ? `${this.token.substring(0, 8)}...` : 'No token');
      
      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${this.token}`,
          'Accept': 'application/vnd.github.v3+json',
          'X-GitHub-Api-Version': '2022-11-28'
        }
      });

      console.log('Response status:', response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('GitHub API error:', errorText);
        throw new Error(`GitHub API error: ${response.status} - ${errorText}`);
      }

      const repo = await response.json();
      return {
        success: true,
        repo: repo.name,
        owner: repo.owner.login,
        branch: repo.default_branch,
        permissions: {
          push: repo.permissions?.push || false,
          admin: repo.permissions?.admin || false
        }
      };
    } catch (error) {
      console.error('Connection test failed:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }
}

export const githubService = new GitHubService();
export { GITHUB_CONFIG };