// Simplified data loader for Supabase transition
// Removes GitHub-specific fetching logic

export const loadDataWithCacheBust = async (url, bustCache = false) => {
  try {
    // Simple fetch from public directory
    // TODO: Replace with Supabase queries
    const cacheBuster = bustCache ? `?_t=${Date.now()}` : '';
    const response = await fetch(url + cacheBuster, {
      cache: bustCache ? 'no-store' : 'default'
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error loading data:', error);
    throw error;
  }
};

// Removed: clearAllCaches, refreshDataAfterSave - no longer needed
// Supabase will provide instant updates without cache management
