import { useState, useEffect, useRef } from 'react';
import { DATA_SOURCE_CONFIG } from '../config/dataSource';

/**
 * Custom hook for managing real-time sync status for admin components
 * @param {string} dataUrl - The URL to check for updates (relative path like /data/team.json)
 * @param {string} lastUpdated - The last updated timestamp from local data
 * @param {number} checkInterval - How often to check for updates (ms)
 * @returns {object} Sync status and control functions
 */
export const useSyncStatus = (dataUrl, lastUpdated, checkInterval = 2000) => {
  const [status, setStatus] = useState('up-to-date');
  const [lastCheck, setLastCheck] = useState(Date.now());
  const [serverLastUpdated, setServerLastUpdated] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [errorDetails, setErrorDetails] = useState(null);
  const intervalRef = useRef(null);
  const checkTimeoutRef = useRef(null);

  // Check for changes on the server
  const checkForChanges = async () => {
    try {
      // Don't set status to 'checking' - keep the current status to avoid UI flashing
      
      // Fetch the current data from server to check lastUpdated with aggressive cache busting
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000);
      
      let fetchUrl;
      const headers = {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      };

      // Use GitHub raw URL if configured - this gives fast updates for public repos
      if (DATA_SOURCE_CONFIG.useGitHubRaw) {
        // Convert relative path like /data/team.json to the raw URL
        const filePath = dataUrl.startsWith('/') ? dataUrl.substring(1) : dataUrl;
        const cacheBuster = `?_t=${Date.now()}&_cb=${Math.random()}`;
        fetchUrl = `https://raw.githubusercontent.com/${DATA_SOURCE_CONFIG.owner}/${DATA_SOURCE_CONFIG.repo}/${DATA_SOURCE_CONFIG.branch}/${DATA_SOURCE_CONFIG.dataPath}/${filePath}${cacheBuster}`;
        console.log(`🔄 Polling GitHub Raw: ${fetchUrl}`);
      } else if (DATA_SOURCE_CONFIG.useGitHubApi) {
        // Use GitHub API - requires authentication for private repos
        const filePath = dataUrl.startsWith('/') ? dataUrl.substring(1) : dataUrl;
        fetchUrl = `https://api.github.com/repos/${DATA_SOURCE_CONFIG.owner}/${DATA_SOURCE_CONFIG.repo}/contents/${DATA_SOURCE_CONFIG.dataPath}/${filePath}?ref=${DATA_SOURCE_CONFIG.branch}&_t=${Date.now()}`;
        headers['Accept'] = 'application/vnd.github.v3.raw';
        
        // Add GitHub token if available for authentication
        const token = localStorage.getItem('github_token');
        if (token) {
          headers['Authorization'] = `Bearer ${token}`;
        }
        
        console.log(`🔄 Polling GitHub API: ${fetchUrl}`);
      } else {
        // Fall back to relative/Pages URL with cache busting
        const cacheBuster = `?_t=${Date.now()}&_cb=${Math.random()}&_check=1`;
        fetchUrl = dataUrl + cacheBuster;
        console.log(`🔄 Polling URL: ${fetchUrl}`);
      }
      
      const response = await fetch(fetchUrl, {
        cache: 'no-store',
        signal: controller.signal,
        headers
      });
      
      clearTimeout(timeoutId);
      
      // 304 Not Modified is actually OK - it means data hasn't changed
      if (!response.ok && response.status !== 304) {
        throw new Error(`HTTP error! status: ${response.status} - ${response.statusText}`);
      }
      
      // If 304, the data hasn't changed on the server, so we're up to date
      if (response.status === 304) {
        console.log('Server returned 304 - data unchanged');
        setLastCheck(Date.now());
        setErrorDetails(null);
        setStatus('up-to-date');
        return;
      }
      
      // Parse response - all sources return JSON
      const data = await response.json();
      
      const currentServerTime = data.lastUpdated;
      
      console.log('Sync check successful:', {
        source: DATA_SOURCE_CONFIG.useGitHubRaw ? 'GitHub Raw' : DATA_SOURCE_CONFIG.useGitHubApi ? 'GitHub API' : 'Pages',
        fullPath: fetchUrl,
        currentServerTime,
        lastUpdated,
        serverLastUpdated,
        timestamp: new Date().toISOString()
      });
      
      setLastCheck(Date.now());
      setErrorDetails(null); // Clear any previous errors
      
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
      
      // Store detailed error information
      const errorDetail = {
        message: error.message,
        name: error.name,
        timestamp: new Date().toISOString(),
        url: dataUrl,
        type: error.name === 'AbortError' ? 'timeout' : 
              error.message.includes('Failed to fetch') ? 'network' :
              error.message.includes('HTTP error') ? 'http' : 'unknown'
      };
      
      if (error.name === 'AbortError') {
        console.log('Request timed out');
        errorDetail.userMessage = 'Request timed out after 10 seconds';
        errorDetail.suggestion = 'Check your network connection or try again later';
      } else if (error.message.includes('Failed to fetch')) {
        errorDetail.userMessage = 'Network connection failed';
        errorDetail.suggestion = 'Check your internet connection and firewall settings';
      } else if (error.message.includes('HTTP error')) {
        // Parse the status code for better messages
        const statusMatch = error.message.match(/status: (\d+)/);
        const statusCode = statusMatch ? parseInt(statusMatch[1]) : null;
        
        if (statusCode === 404) {
          errorDetail.userMessage = 'Data file not found (404)';
          errorDetail.suggestion = 'The team.json file may not exist yet. Try adding team members in the admin panel first.';
        } else if (statusCode === 403) {
          errorDetail.userMessage = 'Access denied (403)';
          errorDetail.suggestion = 'You may not have permission to access this file. Check your GitHub token permissions.';
        } else if (statusCode === 500 || statusCode >= 500) {
          errorDetail.userMessage = `Server error (${statusCode})`;
          errorDetail.suggestion = 'The server is experiencing issues. Please try again later.';
        } else {
          errorDetail.userMessage = error.message;
          errorDetail.suggestion = 'An unexpected HTTP error occurred. Check the browser console for more details.';
        }
      } else {
        errorDetail.userMessage = error.message;
        errorDetail.suggestion = 'An unexpected error occurred. Check the browser console for more details.';
      }
      
      setErrorDetails(errorDetail);
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
    errorDetails,
    startSaving,
    stopSaving,
    refresh,
    checkForChanges
  };
};

export default useSyncStatus;