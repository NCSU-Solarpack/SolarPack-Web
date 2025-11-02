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

// Configuration for data sources
const DATA_CONFIG = {
  // Use GitHub raw content for instant updates (no build/deploy wait)
  // Falls back to local path if GitHub is unavailable
  useGitHubRaw: true,
  githubRawBase: 'https://raw.githubusercontent.com/NCSU-Solarpack/SolarPack-Web/main/public',
  localBase: ''
};

// Get the base URL for data fetching
const getDataBaseUrl = () => {
  // In production, use GitHub raw content for instant updates
  // In development, use local files
  const isDev = import.meta.env.DEV;
  
  if (isDev || !DATA_CONFIG.useGitHubRaw) {
    console.log('Using local paths for data fetching');
    return DATA_CONFIG.localBase;
  }
  
  console.log('Using GitHub raw content for instant updates');
  return DATA_CONFIG.githubRawBase;
};

export const loadDataWithCacheBust = async (url, bustCache = false) => {
  const baseUrl = getDataBaseUrl();
  const originalUrl = url; // Keep original for sessionStorage key
  
  try {
    // Use a unique URL to avoid matching any stored HTTP cache entry
    const cacheBuster = bustCache ? `?_t=${Date.now()}&_cb=${Math.random()}` : '';
    const fullUrl = `${baseUrl}${url}${cacheBuster}`;

    console.log(`Fetching data from: ${fullUrl}`);

    // Always request fresh network bytes (no conditionals, no cache storage)
    const response = await fetch(fullUrl, {
      cache: 'no-store',
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    });

    // If server replied 304, use last good data we saved
    if (response.status === 304) {
      const cached = sessionStorage.getItem(`json:${originalUrl}`);
      if (cached) return JSON.parse(cached);
      throw new Error('HTTP 304 with no previously cached copy available');
    }

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    // Remember last good version for 304 fallbacks
    sessionStorage.setItem(`json:${originalUrl}`, JSON.stringify(data));
    return data;
  } catch (error) {
    console.warn('Primary fetch failed, trying fallback...', error);
    
    // Try fallback to local path if GitHub raw fails
    if (baseUrl === DATA_CONFIG.githubRawBase) {
      try {
        const cacheBuster = bustCache ? `?_t=${Date.now()}&_cb=${Math.random()}` : '';
        const fallbackUrl = `${DATA_CONFIG.localBase}${url}${cacheBuster}`;
        console.log(`Trying fallback: ${fallbackUrl}`);
        
        const response = await fetch(fallbackUrl, {
          cache: 'no-store',
          headers: {
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache',
            'Expires': '0'
          }
        });
        
        if (response.ok) {
          const data = await response.json();
          sessionStorage.setItem(`json:${originalUrl}`, JSON.stringify(data));
          return data;
        }
      } catch (fallbackError) {
        console.warn('Fallback also failed:', fallbackError);
      }
    }
    
    // Last-chance fallback: if network fails, try our last saved copy
    const cached = sessionStorage.getItem(`json:${originalUrl}`);
    if (cached) {
      console.log('Using cached data as final fallback');
      return JSON.parse(cached);
    }
    throw new Error(`Failed to load data: ${error.message}`);
  }
};

// Generic function to refresh data after GitHub save
export const refreshDataAfterSave = (loadFunction, delay = null) => {
  // When using GitHub raw content, updates are near-instant (1-2 seconds)
  // In development, refresh immediately since we're serving local files
  const isDev = import.meta.env.DEV;
  
  // Much shorter delay when using GitHub raw content
  const defaultDelay = isDev ? 500 : (DATA_CONFIG.useGitHubRaw ? 1500 : 3000);
  const refreshDelay = delay !== null ? delay : defaultDelay;
  
  console.log(`Scheduling data refresh in ${refreshDelay}ms (${isDev ? 'dev' : DATA_CONFIG.useGitHubRaw ? 'GitHub raw' : 'Pages'} mode)...`);
  setTimeout(() => {
    console.log('Refreshing data from server...');
    loadFunction(true); // Force cache bust
  }, refreshDelay);
};