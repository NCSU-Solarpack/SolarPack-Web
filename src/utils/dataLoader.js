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
    // Add cache busting parameter to get fresh data
    const cacheBuster = `?_t=${Date.now()}&_cb=${Math.random()}`;
    const fullUrl = `${url}${cacheBuster}`;
    
    console.log(`Fetching data: ${fullUrl}`);
    
    // Use default caching - let the browser handle 304 properly
    const response = await fetch(fullUrl);
    
    console.log(`Response status: ${response.status} ${response.statusText}`);
    
    // With proper caching, the browser handles 304 internally and gives us the cached data
    // So response.ok should be true even if the server returned 304
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    const data = await response.json();
    console.log(`Data loaded successfully from ${fullUrl}`, data);
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