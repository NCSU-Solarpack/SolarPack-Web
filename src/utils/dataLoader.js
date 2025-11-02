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

import { DATA_SOURCE_CONFIG, getDataSourceUrl, getTimingConfig } from '../config/dataSource';

// Get the base URL for data fetching
const getDataBaseUrl = () => {
  const url = getDataSourceUrl();
  console.log(`Data base URL: ${url || '(relative / Pages)'}`);
  return url;
};

export const loadDataWithCacheBust = async (url, bustCache = false) => {
  const baseUrl = getDataBaseUrl();
  const originalUrl = url; // Keep original for sessionStorage key

  // If configured to use GitHub API, fetch via Contents API for instant updates
  if (DATA_SOURCE_CONFIG.useGitHubRaw === false && DATA_SOURCE_CONFIG.useGitHubApi) {
    try {
      const apiUrl = `https://api.github.com/repos/${DATA_SOURCE_CONFIG.owner}/${DATA_SOURCE_CONFIG.repo}/contents${DATA_SOURCE_CONFIG.dataPath}${url}?ref=${DATA_SOURCE_CONFIG.branch}`;
      const etagKey = `etag:${originalUrl}`;
      const cachedEtag = sessionStorage.getItem(etagKey);

      const headers = {
        'Accept': 'application/vnd.github.v3.raw',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      };
      if (cachedEtag) headers['If-None-Match'] = cachedEtag;

      const response = await fetch(apiUrl, { cache: 'no-store', headers });

      if (response.status === 304) {
        const cached = sessionStorage.getItem(`json:${originalUrl}`);
        if (cached) return JSON.parse(cached);
        throw new Error('HTTP 304 with no previously cached copy available');
      }

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      // Accept: raw returns the file body as text
      const text = await response.text();
      const data = JSON.parse(text);
      sessionStorage.setItem(`json:${originalUrl}`, JSON.stringify(data));
      const etag = response.headers.get('etag');
      if (etag) sessionStorage.setItem(etagKey, etag);
      return data;
    } catch (apiError) {
      console.warn('GitHub API fetch failed, falling back...', apiError);
      // continue to fallback logic below
    }
  }

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
    if (baseUrl && baseUrl.startsWith('https://raw.githubusercontent.com')) {
      try {
        const cacheBuster = bustCache ? `?_t=${Date.now()}&_cb=${Math.random()}` : '';
        const fallbackUrl = `${''}${url}${cacheBuster}`;
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
  const isDev = import.meta.env.DEV;
  const timing = getTimingConfig();
  const defaultDelay = timing.refreshDelay;
  const refreshDelay = delay !== null ? delay : defaultDelay;
  
  console.log(`Scheduling data refresh in ${refreshDelay}ms (${isDev ? 'dev' : DATA_SOURCE_CONFIG.useGitHubRaw ? 'GitHub raw' : DATA_SOURCE_CONFIG.useGitHubApi ? 'GitHub API' : 'Pages'} mode)...`);
  setTimeout(() => {
    console.log('Refreshing data from server...');
    loadFunction(true); // Force cache bust
  }, refreshDelay);
};