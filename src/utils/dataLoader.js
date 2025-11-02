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
  // Always use relative paths - works on deployed site
  console.log('Using relative paths for data fetching');
  return '';
};

export const loadDataWithCacheBust = async (url, bustCache = false) => {
  try {
    // Always add cache busting parameter to ensure fresh data
    const cacheBuster = `?_t=${Date.now()}&_cb=${Math.random()}`;
    const fullUrl = `${url}${cacheBuster}`;
    
    console.log(`Fetching data: ${fullUrl}`);
    
    const response = await fetch(fullUrl, {
      cache: 'no-store',
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
        'If-None-Match': '*'
      }
    });
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    const data = await response.json();
    console.log(`Data loaded successfully from ${fullUrl}`);
    return data;
    
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