// Real-time sync status hook for Supabase
import { useState, useEffect, useRef } from 'react';

/**
 * Hook to track sync status with Supabase
 * Polls database for changes and provides status updates
 * 
 * @param {Function} fetchDataFn - Function that fetches current data from Supabase
 * @param {number} pollInterval - How often to check for updates (ms)
 * @returns {Object} - { status, lastSync, startSaving, finishSaving }
 */
export const useSupabaseSyncStatus = (fetchDataFn, pollInterval = 2000) => {
  const [status, setStatus] = useState('synced'); // 'synced', 'checking', 'saving', 'new-data'
  const [lastSync, setLastSync] = useState(null);
  const lastKnownHashRef = useRef(null);
  const currentDisplayedHashRef = useRef(null); // Hash of what's currently displayed to user
  const intervalRef = useRef(null);
  const isSavingRef = useRef(false);
  const isInitialLoadRef = useRef(true); // Prevent checking until initial load completes

  // Hash function to detect actual data changes (ignores lastUpdated timestamp)
  const hashData = (data) => {
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
  };

  // Check for updates
  const checkForUpdates = async () => {
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
      // Don't show error, just keep current status
      if (status !== 'saving' && status !== 'new-data') {
        setStatus('synced');
      }
    }
  };

  // Start polling
  useEffect(() => {
    // Initial check
    checkForUpdates();

    // Set up interval
    intervalRef.current = setInterval(checkForUpdates, pollInterval);

    // Cleanup
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [pollInterval]);

  // Methods to control status
  const startSaving = () => {
    isSavingRef.current = true;
    setStatus('saving');
  };

  const finishSaving = async () => {
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
    } catch (error) {
      console.error('Error after save:', error);
      setStatus('synced');
    }
  };

  const acknowledgeNewData = async () => {
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
    } catch (error) {
      console.error('Error acknowledging new data:', error);
    }
  };

  const setDisplayedData = (data) => {
    // Component tells us what data it's actually displaying
    const hash = hashData(data);
    console.log('📺 Component displaying data with hash:', hash);
    currentDisplayedHashRef.current = hash;
    lastKnownHashRef.current = hash;
    // Mark initial load as complete so polling can begin
    isInitialLoadRef.current = false;
  };

  return {
    status,
    lastSync,
    startSaving,
    finishSaving,
    acknowledgeNewData,
    setDisplayedData
  };
};

export default useSupabaseSyncStatus;
