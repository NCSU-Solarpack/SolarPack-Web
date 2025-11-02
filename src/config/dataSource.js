// Simplified data source configuration for Supabase transition
// GitHub Pages and GitHub Raw content fetching will be replaced with Supabase

export const DATA_SOURCE_CONFIG = {
  // Legacy GitHub fetching - will be replaced with Supabase
  useSupabase: false, // TODO: Set to true once Supabase is configured
  
  // Supabase configuration (to be filled in)
  supabase: {
    url: process.env.REACT_APP_SUPABASE_URL || '',
    anonKey: process.env.REACT_APP_SUPABASE_ANON_KEY || ''
  }
};

// Get the base URL for data fetching (temporary - will use Supabase)
export const getDataSourceUrl = () => {
  // For now, just use relative paths to public/data
  return '';
};

// Simplified timing - no more deployment waiting
export const getTimingConfig = () => {
  return {
    refreshDelay: 500, // Supabase is instant
    polling: {
      maxAttempts: 1, // No polling needed
      delayMs: 0
    }
  };
};
