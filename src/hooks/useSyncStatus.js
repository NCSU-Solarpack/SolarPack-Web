import { useState, useEffect, useRef } from 'react';

// Get the base URL for data fetching
const getDataBaseUrl = () => {
  const useGitHub = import.meta.env.VITE_USE_GITHUB_DATA === 'true';
  const githubUrl = import.meta.env.VITE_GITHUB_PAGES_URL;
  
  if (useGitHub && githubUrl) {
    return githubUrl;
  }
  
  return '';
};

/**
 * Custom hook for managing real-time sync status for admin components
 * @param {string} dataUrl - The URL to check for updates
 * @param {string} lastUpdated - The last updated timestamp from local data
 * @param {number} checkInterval - How often to check for updates (ms)
 * @returns {object} Sync status and control functions
 */
export const useSyncStatus = (dataUrl, lastUpdated, checkInterval = 1000) => {
  const [status, setStatus] = useState('up-to-date');
  const [lastCheck, setLastCheck] = useState(Date.now());
  const [serverLastUpdated, setServerLastUpdated] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const intervalRef = useRef(null);
  const checkTimeoutRef = useRef(null);

  // Check for changes on the server
  const checkForChanges = async () => {
    try {
      // Don't set status to 'checking' - keep the current status to avoid UI flashing
      
      // Get the full URL with base
      const baseUrl = getDataBaseUrl();
      const fullPath = `${baseUrl}${dataUrl}`;
      const isProd = import.meta.env.PROD;
      
      // Fetch the current data from server to check lastUpdated with aggressive cache busting
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // Increased timeout to 10 seconds
      
      const cacheBuster = `?_t=${Date.now()}&_cb=${Math.random()}&_check=1`;
      
      let response;
      
      // In production, we can directly fetch from same domain (no CORS issues)
      if (isProd || baseUrl === '') {
        try {
          response = await fetch(fullPath + cacheBuster, {
            cache: 'no-store',
            signal: controller.signal,
            headers: {
              'Cache-Control': 'no-cache, no-store, must-revalidate',
              'Pragma': 'no-cache',
              'Expires': '0',
              'If-None-Match': '*'
            }
          });
        } catch (fetchError) {
          clearTimeout(timeoutId);
          throw fetchError;
        }
      } else {
        // In development with external GitHub URL, might need CORS handling
        try {
          response = await fetch(fullPath + cacheBuster, {
            cache: 'no-store',
            signal: controller.signal,
            mode: 'cors',
            headers: {
              'Cache-Control': 'no-cache, no-store, must-revalidate',
              'Pragma': 'no-cache',
              'Expires': '0',
              'If-None-Match': '*'
            }
          });
        } catch (fetchError) {
          clearTimeout(timeoutId);
          throw fetchError;
        }
      }
      
      clearTimeout(timeoutId);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status} - ${response.statusText}`);
      }
      
      const data = await response.json();
      const currentServerTime = data.lastUpdated;
      
      console.log('Sync check successful:', {
        fullPath: fullPath + cacheBuster,
        currentServerTime,
        lastUpdated,
        serverLastUpdated,
        timestamp: new Date().toISOString()
      });
      
      setLastCheck(Date.now());
      
      // Compare with what we have locally
      if (serverLastUpdated === null) {
        setServerLastUpdated(currentServerTime);
        console.log('First sync check - storing server time:', currentServerTime);
        setStatus('up-to-date');
      } else if (currentServerTime !== lastUpdated) {
        // Any difference between server and local should trigger a refresh
        console.log('Data mismatch detected!', { 
          currentServerTime, 
          lastUpdated, 
          serverLastUpdated,
          shouldRefresh: true 
        });
        setStatus('changes-detected');
        setServerLastUpdated(currentServerTime);
      } else {
        setStatus('up-to-date');
      }
      
    } catch (error) {
      console.error('Error checking for changes:', error);
      if (error.name === 'AbortError') {
        console.log('Request timed out');
      }
      setStatus('error');
    }
  };

  // Start/stop sync monitoring
  useEffect(() => {
    if (!dataUrl) return;
    
    // Initial check
    checkForChanges();
    
    // Set up interval for periodic checks
    intervalRef.current = setInterval(checkForChanges, checkInterval);
    
    // Also check when page becomes visible again
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        console.log('Page became visible - checking for updates');
        checkForChanges();
      }
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      if (checkTimeoutRef.current) {
        clearTimeout(checkTimeoutRef.current);
      }
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [dataUrl, checkInterval, lastUpdated]);

  // Handle saving state changes
  const startSaving = () => setIsSaving(true);
  const stopSaving = () => {
    setIsSaving(false);
    // After saving, wait a moment then check for updates
    checkTimeoutRef.current = setTimeout(() => {
      checkForChanges();
    }, 1000);
  };

  // Manual refresh function
  const refresh = () => {
    setStatus('checking');
    setServerLastUpdated(null);
    checkForChanges();
  };

  return {
    status: isSaving ? 'saving' : status,
    lastCheck,
    isSaving,
    startSaving,
    stopSaving,
    refresh,
    checkForChanges
  };
};

export default useSyncStatus;