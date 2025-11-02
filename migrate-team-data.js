// Migration Script: Import Team Data to Supabase
// Run this once to import your existing team.json data

import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Supabase credentials
const SUPABASE_URL = 'https://dlbqvrsmvgjrynytmlsk.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRsYnF2cnNtdmdqcnlueXRtbHNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIwOTk1ODAsImV4cCI6MjA3NzY3NTU4MH0.0crmxxtamB9eF16rro75UTVEqNzaRoNEjD85RpO3dGc';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function migrateTeamData() {
  try {
    console.log('🚀 Starting team data migration...\n');

    // Read the team.json file
    const teamDataPath = path.join(__dirname, 'public', 'data', 'team.json');
    const teamDataRaw = fs.readFileSync(teamDataPath, 'utf8');
    const teamData = JSON.parse(teamDataRaw);

    console.log(`📋 Found ${teamData.teamMembers.length} team members to migrate\n`);

    // First, clear existing data (optional - remove this if you want to keep test data)
    console.log('🧹 Cleaning existing team members...');
    const { error: deleteError } = await supabase
      .from('team_members')
      .delete()
      .neq('id', 0); // Delete all

    if (deleteError) {
      console.warn('⚠️  Warning during cleanup:', deleteError.message);
    } else {
      console.log('✓ Cleaned existing data\n');
    }

    // Insert all team members
    console.log('📤 Uploading team members to Supabase...\n');
    
    let successCount = 0;
    let errorCount = 0;

    for (const member of teamData.teamMembers) {
      const { data, error } = await supabase
        .from('team_members')
        .insert({
          name: member.name,
          role: member.role,
          image: member.image,
          bio: member.bio,
          email: member.email || null,
          linkedin: member.linkedin || null,
          order: member.order
        })
        .select()
        .single();

      if (error) {
        console.error(`❌ Error inserting ${member.name}:`, error.message);
        errorCount++;
      } else {
        console.log(`✓ Migrated: ${member.name} (${member.role})`);
        successCount++;
      }
    }

    console.log('\n' + '='.repeat(50));
    console.log('📊 Migration Summary:');
    console.log(`✓ Successfully migrated: ${successCount}`);
    console.log(`❌ Errors: ${errorCount}`);
    console.log('='.repeat(50));

    // Verify the data
    console.log('\n🔍 Verifying migration...');
    const { data: verifyData, error: verifyError } = await supabase
      .from('team_members')
      .select('*')
      .order('order', { ascending: true });

    if (verifyError) {
      console.error('❌ Verification error:', verifyError);
    } else {
      console.log(`✓ Verified: ${verifyData.length} team members in database`);
      console.log('\nMigrated team members:');
      verifyData.forEach((member, index) => {
        console.log(`  ${index + 1}. ${member.name} - ${member.role}`);
      });
    }

    console.log('\n✅ Migration complete!\n');

  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  }
}

// Run the migration
migrateTeamData();
