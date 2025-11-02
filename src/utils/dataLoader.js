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
    // Use a unique URL to avoid matching any stored HTTP cache entry
    const cacheBuster = bustCache ? `?_t=${Date.now()}&_cb=${Math.random()}` : '';
    const fullUrl = `${url}${cacheBuster}`;

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
      const cached = sessionStorage.getItem(`json:${url}`);
      if (cached) return JSON.parse(cached);
      throw new Error('HTTP 304 with no previously cached copy available');
    }

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    // Remember last good version for 304 fallbacks
    sessionStorage.setItem(`json:${url}`, JSON.stringify(data));
    return data;
  } catch (error) {
    // Last-chance fallback: if network fails, try our last saved copy
    const cached = sessionStorage.getItem(`json:${url}`);
    if (cached) return JSON.parse(cached);
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