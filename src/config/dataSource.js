// Data source configuration
// Toggle between GitHub raw content (fast updates) and GitHub Pages (slower but cached)

export const DATA_SOURCE_CONFIG = {
  // Set to true for instant updates (reads from GitHub raw content)
  // Set to false for traditional deployment (reads from GitHub Pages after build)
  useGitHubRaw: true,
  
  // GitHub repository details
  owner: 'NCSU-Solarpack',
  repo: 'SolarPack-Web',
  branch: 'main',
  dataPath: 'public',
  
  // Timing configuration
  timing: {
    // How long to wait before refreshing data after save
    refreshDelay: {
      development: 500,      // Local dev (instant)
      githubRaw: 1500,       // GitHub raw content (1-3 seconds typical)
      githubPages: 3000      // GitHub Pages deployment (30-60 seconds typical)
    },
    
    // Polling configuration for verifying updates
    polling: {
      githubRaw: {
        maxAttempts: 10,     // Try 10 times
        delayMs: 500         // Wait 500ms between attempts (total ~5 seconds)
      },
      githubPages: {
        maxAttempts: 30,     // Try 30 times
        delayMs: 2000        // Wait 2s between attempts (total ~60 seconds)
      }
    }
  }
};

// Get the base URL for data fetching
export const getDataSourceUrl = () => {
  if (DATA_SOURCE_CONFIG.useGitHubRaw) {
    return `https://raw.githubusercontent.com/${DATA_SOURCE_CONFIG.owner}/${DATA_SOURCE_CONFIG.repo}/${DATA_SOURCE_CONFIG.branch}/${DATA_SOURCE_CONFIG.dataPath}`;
  }
  return ''; // Relative path for GitHub Pages
};

// Get timing configuration
export const getTimingConfig = () => {
  const isDev = import.meta.env.DEV;
  
  if (isDev) {
    return {
      refreshDelay: DATA_SOURCE_CONFIG.timing.refreshDelay.development,
      polling: DATA_SOURCE_CONFIG.timing.polling.githubRaw
    };
  }
  
  if (DATA_SOURCE_CONFIG.useGitHubRaw) {
    return {
      refreshDelay: DATA_SOURCE_CONFIG.timing.refreshDelay.githubRaw,
      polling: DATA_SOURCE_CONFIG.timing.polling.githubRaw
    };
  }
  
  return {
    refreshDelay: DATA_SOURCE_CONFIG.timing.refreshDelay.githubPages,
    polling: DATA_SOURCE_CONFIG.timing.polling.githubPages
  };
};

export default DATA_SOURCE_CONFIG;
