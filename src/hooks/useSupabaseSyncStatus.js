// Real-time sync status hook for Supabase
import { useState, useEffect, useRef, useCallback } from 'react';
import { supabaseService } from '../utils/supabase';

/**
 * Hook to track sync status with Supabase
 * Polls database for changes and provides status updates
 * Handles tab visibility changes to maintain connection
 * 
 * @param {Function} fetchDataFn - Function that fetches current data from Supabase
 * @param {number} pollInterval - How often to check for updates (ms)
 * @returns {Object} - { status, lastSync, startSaving, finishSaving }
 */
export const useSupabaseSyncStatus = (fetchDataFn, pollInterval = 2000) => {
  const [status, setStatus] = useState('synced'); // 'synced', 'checking', 'saving', 'new-data', 'reconnecting', 'error'
  const [lastSync, setLastSync] = useState(null);
  const [connectionError, setConnectionError] = useState(null);
  const lastKnownHashRef = useRef(null);
  const currentDisplayedHashRef = useRef(null); // Hash of what's currently displayed to user
  const intervalRef = useRef(null);
  const isSavingRef = useRef(false);
  const isInitialLoadRef = useRef(true); // Prevent checking until initial load completes
  const retryCountRef = useRef(0);
  const maxRetries = 3;

  // Hash function to detect actual data changes (ignores lastUpdated timestamp)
  const hashData = useCallback((data) => {
    if (!data) return null;
    
    // Only hash the actual data array (teamMembers, alumni, etc.), not metadata
    // This ensures we're comparing the actual content, not timestamps
    const dataArray = data.teamMembers || data.alumni || data.sponsors || data.schedules || data.orders || [];
    
    // Stringify the data array for consistent hashing
    const str = JSON.stringify(dataArray);
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32bit integer
    }
    
    console.log('🔍 Hash calculated:', hash, 'for', dataArray.length, 'items');
    return hash;
  }, []);

  // Check for updates with retry logic
  const checkForUpdates = useCallback(async (isRetry = false) => {
    if (isSavingRef.current) {
      // Don't check while saving
      return;
    }

    if (isInitialLoadRef.current) {
      // Don't check until the component has finished its initial load
      return;
    }

    try {
      // Check in background without showing "checking" status
      const data = await fetchDataFn();
      const currentHash = hashData(data);
      
      // Success - reset retry count and clear any errors
      retryCountRef.current = 0;
      setConnectionError(null);
      
      // Store what Supabase has right now
      lastKnownHashRef.current = currentHash;

      if (currentDisplayedHashRef.current === null) {
        // First load - assume what we fetch is what's displayed
        console.log('📍 Initial load - displayed hash set:', currentHash);
        currentDisplayedHashRef.current = currentHash;
        setStatus('synced');
        setLastSync(new Date());
      } else if (currentHash !== currentDisplayedHashRef.current) {
        // Supabase has different data than what user is currently seeing
        console.log('🔄 Data mismatch! Displayed:', currentDisplayedHashRef.current, 'Supabase:', currentHash);
        if (status !== 'new-data') {
          console.log('📊 New data detected from Supabase - notifying user');
          setStatus('new-data');
        }
        setLastSync(new Date());
        // Keep the displayed hash unchanged until user refreshes
      } else {
        // Data matches what's displayed
        if (status !== 'saving' && status !== 'new-data') {
          setStatus('synced');
        }
        setLastSync(new Date());
      }
    } catch (error) {
      console.error('Error checking for updates:', error);
      
      // Increment retry count
      retryCountRef.current++;
      
      if (retryCountRef.current >= maxRetries) {
        // Too many failures - connection may be lost
        console.warn('⚠️ Multiple sync failures - connection may be lost');
        setConnectionError(error.message);
        setStatus('error');
        
        // Try to refresh the connection
        try {
          const reconnected = await supabaseService.refreshConnection();
          if (reconnected) {
            console.log('✅ Connection restored after sync failures');
            retryCountRef.current = 0;
            setConnectionError(null);
            setStatus('synced');
            // Retry the data fetch
            setTimeout(() => checkForUpdates(true), 1000);
          }
        } catch (reconnectError) {
          console.error('Failed to reconnect:', reconnectError);
        }
      } else if (!isRetry) {
        // Retry with a short delay
        setTimeout(() => checkForUpdates(true), 1000);
      }
    }
  }, [fetchDataFn, hashData, status]);

  // Handle visibility change - refresh data when tab becomes visible
  useEffect(() => {
    const handleVisibilityChange = async () => {
      if (!document.hidden) {
        console.log('📱 Tab visible - checking Supabase sync status');
        
        // Small delay to let auth session refresh (handled by supabase.js)
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Reset retry count and check for updates
        retryCountRef.current = 0;
        setConnectionError(null);
        
        // Always check for updates when tab becomes visible
        checkForUpdates();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [checkForUpdates]);

  // Subscribe to global connection state changes
  useEffect(() => {
    const unsubscribe = supabaseService.onConnectionChange((event, isConnected) => {
      console.log('🔌 Connection state changed:', event, isConnected);
      
      if (event === 'visibility_restored' || event === 'focus_restored') {
        // Tab became visible again - silently verify data is current
        // DON'T reset connection error or force a visible reload
        // Just check in background - if data changed, show "new-data" badge
        retryCountRef.current = 0;
        // Silent check - no status change, no UI disruption
        checkForUpdates();
      } else if (event === 'online') {
        // Network came back online - clear errors and check
        retryCountRef.current = 0;
        setConnectionError(null);
        checkForUpdates();
      } else if (event === 'offline') {
        setStatus('error');
        setConnectionError('Network connection lost');
      }
    });

    return unsubscribe;
  }, [checkForUpdates]);

  // Start polling
  useEffect(() => {
    // Initial check
    checkForUpdates();

    // Set up interval - only poll when tab is visible
    const startPolling = () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      
      intervalRef.current = setInterval(() => {
        // Only poll if tab is visible to avoid wasted requests when throttled
        if (!document.hidden) {
          checkForUpdates();
        }
      }, pollInterval);
    };
    
    startPolling();

    // Cleanup
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [pollInterval, checkForUpdates]);

  // Methods to control status
  const startSaving = useCallback(() => {
    isSavingRef.current = true;
    setStatus('saving');
  }, []);

  const finishSaving = useCallback(async () => {
    isSavingRef.current = false;
    // Immediately check for the new data
    try {
      const data = await fetchDataFn();
      const currentHash = hashData(data);
      // Update both: what Supabase has AND what user is seeing
      lastKnownHashRef.current = currentHash;
      currentDisplayedHashRef.current = currentHash;
      console.log('💾 Save complete - hashes updated to:', currentHash);
      setStatus('synced');
      setLastSync(new Date());
      retryCountRef.current = 0;
      setConnectionError(null);
    } catch (error) {
      console.error('Error after save:', error);
      
      // The save might have worked but connection dropped - try to reconnect
      console.log('🔄 Refreshing connection after save error...');
      const reconnected = await supabaseService.refreshConnection();
      if (reconnected) {
        // Retry fetching
        try {
          const data = await fetchDataFn();
          const currentHash = hashData(data);
          lastKnownHashRef.current = currentHash;
          currentDisplayedHashRef.current = currentHash;
          setStatus('synced');
          setLastSync(new Date());
        } catch (retryError) {
          console.error('Retry also failed:', retryError);
          setStatus('error');
          setConnectionError('Failed to verify save - please refresh the page');
        }
      } else {
        setStatus('error');
        setConnectionError('Connection lost - please refresh the page');
      }
    }
  }, [fetchDataFn, hashData]);

  const acknowledgeNewData = useCallback(async () => {
    // User clicked to refresh - update what they're seeing
    try {
      const data = await fetchDataFn();
      const currentHash = hashData(data);
      // Sync the displayed hash to match what's in Supabase
      currentDisplayedHashRef.current = currentHash;
      lastKnownHashRef.current = currentHash;
      console.log('✅ User refreshed - displayed hash updated to:', currentHash);
      setStatus('synced');
      setLastSync(new Date());
      // Ensure initial load flag is cleared
      isInitialLoadRef.current = false;
      retryCountRef.current = 0;
      setConnectionError(null);
    } catch (error) {
      console.error('Error acknowledging new data:', error);
      
      // Try to reconnect
      const reconnected = await supabaseService.refreshConnection();
      if (reconnected) {
        // Retry
        try {
          const data = await fetchDataFn();
          const currentHash = hashData(data);
          currentDisplayedHashRef.current = currentHash;
          lastKnownHashRef.current = currentHash;
          setStatus('synced');
          setLastSync(new Date());
          isInitialLoadRef.current = false;
        } catch (retryError) {
          setStatus('error');
          setConnectionError('Failed to load data - please refresh the page');
        }
      }
    }
  }, [fetchDataFn, hashData]);

  const setDisplayedData = useCallback((data) => {
    // Component tells us what data it's actually displaying
    const hash = hashData(data);
    console.log('📺 Component displaying data with hash:', hash);
    currentDisplayedHashRef.current = hash;
    lastKnownHashRef.current = hash;
    // Mark initial load as complete so polling can begin
    isInitialLoadRef.current = false;
  }, [hashData]);

  // Manual refresh function to force reconnection
  const forceReconnect = useCallback(async () => {
    setStatus('reconnecting');
    const reconnected = await supabaseService.refreshConnection();
    if (reconnected) {
      retryCountRef.current = 0;
      setConnectionError(null);
      checkForUpdates();
    } else {
      setStatus('error');
      setConnectionError('Failed to reconnect - please refresh the page');
    }
  }, [checkForUpdates]);

  return {
    status,
    lastSync,
    connectionError,
    startSaving,
    finishSaving,
    acknowledgeNewData,
    setDisplayedData,
    forceReconnect
  };
};

export default useSupabaseSyncStatus;
