// Utility for loading data with cache busting capabilities
// This ensures fresh data is loaded after GitHub updates

export const loadDataWithCacheBust = async (url, bustCache = false) => {
  try {
    // Add cache busting parameter to force fresh data
    const cacheBuster = bustCache ? `?_t=${Date.now()}` : '';
    const fullUrl = `${url}${cacheBuster}`;
    
    const response = await fetch(fullUrl, {
      cache: 'no-cache',
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log(`Data loaded from ${url}:`, bustCache ? 'with cache bust' : 'normally');
    return data;
  } catch (error) {
    console.error(`Error loading data from ${url}:`, error);
    throw error;
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