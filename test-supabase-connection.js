// Test Supabase Connection
// Run this in your browser console after restarting dev server

import { supabaseService } from './src/utils/supabase.js';

console.log('Testing Supabase connection...');
console.log('Is configured?', supabaseService.isConfigured());

// Try to fetch team members (will be empty at first)
supabaseService.getTeamMembers()
  .then(data => {
    console.log('✓ Connection successful!');
    console.log('Team members:', data);
  })
  .catch(error => {
    console.error('✗ Connection failed:', error);
  });
