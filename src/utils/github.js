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
    // 1. Environment variable (most secure for production)
    // 2. Hardcoded token (for quick setup)
    // 3. localStorage (user input)
    this.token = import.meta.env.VITE_GITHUB_TOKEN || null;
    this.baseUrl = 'https://api.github.com';
    
    // Load token on initialization (will use env var if available)
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
      return this.token;
    }
    
    // Fall back to localStorage
    if (!this.token) {
      this.token = localStorage.getItem('github_token');
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
          'Authorization': `token ${this.token}`,
          'Accept': 'application/vnd.github.v3+json'
        }
      });

      if (!response.ok) {
        throw new Error(`GitHub API error: ${response.status}`);
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
      // First, get the current file SHA
      const sha = await this.getFileSHA(path);
      
      // Encode content as base64
      const encodedContent = btoa(JSON.stringify(content, null, 2));
      
      const url = `${this.baseUrl}/repos/${GITHUB_CONFIG.owner}/${GITHUB_CONFIG.repo}/contents/${path}`;
      
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Authorization': `token ${this.token}`,
          'Accept': 'application/vnd.github.v3+json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: message || `Update ${path}`,
          content: encodedContent,
          sha: sha,
          branch: GITHUB_CONFIG.branch
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`GitHub API error: ${response.status} - ${errorData.message}`);
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

  // Trigger a rebuild by creating an empty commit (optional)
  async triggerRebuild() {
    if (!this.token) throw new Error('No GitHub token available');

    try {
      const url = `${this.baseUrl}/repos/${GITHUB_CONFIG.owner}/${GITHUB_CONFIG.repo}/dispatches`;
      
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Authorization': `token ${this.token}`,
          'Accept': 'application/vnd.github.v3+json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          event_type: 'rebuild'
        })
      });

      if (!response.ok) {
        console.warn('Could not trigger rebuild, but file was updated');
      }
    } catch (error) {
      console.warn('Could not trigger rebuild:', error);
    }
  }

  // Test the connection
  async testConnection() {
    if (!this.token) throw new Error('No GitHub token available');

    try {
      const url = `${this.baseUrl}/repos/${GITHUB_CONFIG.owner}/${GITHUB_CONFIG.repo}`;
      
      const response = await fetch(url, {
        headers: {
          'Authorization': `token ${this.token}`,
          'Accept': 'application/vnd.github.v3+json'
        }
      });

      if (!response.ok) {
        throw new Error(`GitHub API error: ${response.status}`);
      }

      const repo = await response.json();
      return {
        success: true,
        repo: repo.name,
        owner: repo.owner.login,
        permissions: {
          push: repo.permissions?.push || false,
          admin: repo.permissions?.admin || false
        }
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }
}

export const githubService = new GitHubService();
export { GITHUB_CONFIG };