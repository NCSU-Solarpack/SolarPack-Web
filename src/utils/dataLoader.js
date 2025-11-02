// Utility for loading data with cache busting capabilities
// This ensures fresh data is loaded after GitHub updates

// Clear all caches aggressively
export const clearAllCaches = async () => {
  try {
    // Clear service worker cache if available
    if ('caches' in window) {
      const cacheNames = await caches.keys();
      await Promise.all(
        cacheNames.map(cacheName => caches.delete(cacheName))
      );
      console.log('Cleared all browser caches');
    }
    
    // Clear sessionStorage and localStorage related to data
    Object.keys(sessionStorage).forEach(key => {
      if (key.includes('team') || key.includes('data')) {
        sessionStorage.removeItem(key);
      }
    });
    
    Object.keys(localStorage).forEach(key => {
      if (key.includes('team') || key.includes('data')) {
        localStorage.removeItem(key);
      }
    });
    
  } catch (error) {
    console.warn('Could not clear all caches:', error);
  }
};

// Get the base URL for data fetching
const getDataBaseUrl = () => {
  // In production (deployed to GitHub Pages), always use relative paths
  // This way it fetches from the same domain where it's deployed
  const isProd = import.meta.env.PROD;
  
  if (isProd) {
    console.log('Production mode: Using relative paths (same domain)');
    return ''; // Empty string means relative path from current domain
  }
  
  // In development, check if we should use GitHub Pages or local files
  const useGitHub = import.meta.env.VITE_USE_GITHUB_DATA === 'true';
  const githubUrl = import.meta.env.VITE_GITHUB_PAGES_URL;
  
  if (useGitHub && githubUrl) {
    console.log('Development mode: Using GitHub Pages for data:', githubUrl);
    return githubUrl;
  }
  
  console.log('Development mode: Using local data files');
  return '';
};

export const loadDataWithCacheBust = async (url, bustCache = false) => {
  try {
    const baseUrl = getDataBaseUrl();
    const fullPath = `${baseUrl}${url}`;
    const isProd = import.meta.env.PROD;
    
    // Always add cache busting parameter for admin components to ensure fresh data
    const cacheBuster = `?_t=${Date.now()}&_cb=${Math.random()}`;
    
    let response;
    let finalUrl;
    
    const directUrl = `${fullPath}${cacheBuster}`;
    
    console.log(`Fetching data: ${directUrl}`, { isProd, baseUrl });
    
    // In production (on GitHub Pages), we can fetch directly from same domain
    if (isProd || baseUrl === '') {
      try {
        response = await fetch(directUrl, {
          cache: 'no-store',
          headers: {
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache',
            'Expires': '0',
            'If-None-Match': '*'
          }
        });
        
        if (response.ok) {
          const data = await response.json();
          console.log(`Data loaded successfully from ${directUrl}`);
          return data;
        } else {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
      } catch (error) {
        console.error('Direct fetch failed:', error);
        throw error;
      }
    } 
    // In development when using external GitHub URL, need CORS proxy
    else {
      const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(fullPath)}`;
      
      console.log('Using CORS proxy for cross-origin request...');
      
      try {
        // Try direct first
        response = await fetch(directUrl, {
          cache: 'no-store',
          mode: 'cors',
          headers: {
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache',
            'Expires': '0',
            'If-None-Match': '*'
          }
        });
        
        if (response.ok) {
          const data = await response.json();
          console.log(`Data loaded successfully (direct)`);
          return data;
        } else {
          throw new Error('Direct fetch failed');
        }
      } catch (directError) {
        console.log('Direct fetch failed, trying CORS proxy...');
        
        response = await fetch(proxyUrl, {
          cache: 'no-store'
        });
        
        if (response.ok) {
          const proxyData = await response.json();
          const data = JSON.parse(proxyData.contents);
          console.log(`Data loaded via CORS proxy`);
          return data;
        } else {
          throw new Error(`CORS proxy also failed: HTTP ${response.status}`);
        }
      }
    }
    
  } catch (error) {
    console.error(`Error loading data from ${url}:`, error);
    throw new Error(`Failed to load data: ${error.message}`);
  }
};

// Generic function to refresh data after GitHub save
export const refreshDataAfterSave = (loadFunction, delay = null) => {
  // In development, refresh immediately since we're serving local files
  // In production, wait a bit for deployment to complete
  const isDev = import.meta.env.DEV;
  const refreshDelay = delay !== null ? delay : (isDev ? 500 : 3000);
  
  console.log(`Scheduling data refresh in ${refreshDelay}ms (${isDev ? 'dev' : 'prod'} mode)...`);
  setTimeout(() => {
    console.log('Refreshing data from server...');
    loadFunction(true); // Force cache bust
  }, refreshDelay);
};