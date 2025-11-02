# Supabase Setup Guide for SolarPack Web

## Overview
This guide will help you set up Supabase as your real-time database, replacing the GitHub Pages JSON file storage system.

## Why Supabase?
- **Instant Updates**: No more 30-60 second deployment waits
- **Real-time**: Changes appear immediately for all users
- **Free Tier**: 500MB database storage, 50,000 monthly active users
- **Built-in Auth**: Can replace custom authentication system
- **REST API**: Automatic API generation from your database schema
- **Row Level Security**: Fine-grained access control

## Step 1: Create a Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Sign up for a free account (or sign in)
3. Click "New Project"
4. Fill in:
   - **Name**: `solarpack-web` (or your preferred name)
   - **Database Password**: Generate a strong password (save it!)
   - **Region**: Choose closest to your users (e.g., `East US`)
   - **Pricing Plan**: Select **Free** tier

5. Wait 2-3 minutes for your project to be created

## Step 2: Get Your API Credentials

1. In your Supabase dashboard, go to **Settings** → **API**
2. Copy these two values:
   - **Project URL** (looks like: `https://xxxxx.supabase.co`)
   - **anon public key** (a long JWT token)

## Step 3: Configure Environment Variables

Create a `.env` file in your project root (if it doesn't exist):

```bash
# .env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

**Important**: Add `.env` to your `.gitignore` to keep credentials private!

## Step 4: Create Database Tables

In Supabase dashboard, go to **SQL Editor** and run these commands:

### Team Members Table
```sql
CREATE TABLE team_members (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  image TEXT,
  bio TEXT,
  email TEXT,
  linkedin TEXT,
  "order" INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Allow public read access" ON team_members
  FOR SELECT USING (true);

-- Allow authenticated users to insert/update/delete
CREATE POLICY "Allow authenticated users to modify" ON team_members
  FOR ALL USING (auth.role() = 'authenticated');
```

### Alumni Table
```sql
CREATE TABLE alumni (
  id BIGSERIAL PRIMARY KEY,
  semester TEXT NOT NULL,
  leadership JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE alumni ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Allow public read access" ON alumni
  FOR SELECT USING (true);

CREATE POLICY "Allow authenticated users to modify" ON alumni
  FOR ALL USING (auth.role() = 'authenticated');
```

### Sponsors Table
```sql
CREATE TABLE sponsors (
  id BIGSERIAL PRIMARY KEY,
  tier TEXT NOT NULL,
  sponsors JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE sponsors ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Allow public read access" ON sponsors
  FOR SELECT USING (true);

CREATE POLICY "Allow authenticated users to modify" ON sponsors
  FOR ALL USING (auth.role() = 'authenticated');
```

### Schedules Table
```sql
CREATE TABLE schedules (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  date DATE NOT NULL,
  time TEXT,
  location TEXT,
  description TEXT,
  team TEXT,
  type TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE schedules ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Allow public read access" ON schedules
  FOR SELECT USING (true);

CREATE POLICY "Allow authenticated users to modify" ON schedules
  FOR ALL USING (auth.role() = 'authenticated');
```

### Orders Table
```sql
CREATE TABLE orders (
  id BIGSERIAL PRIMARY KEY,
  item TEXT NOT NULL,
  quantity INTEGER DEFAULT 1,
  priority TEXT,
  status TEXT DEFAULT 'pending',
  requested_by TEXT,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Allow public read access" ON orders
  FOR SELECT USING (true);

CREATE POLICY "Allow authenticated users to modify" ON orders
  FOR ALL USING (auth.role() = 'authenticated');
```

## Step 5: Migrate Existing Data

You can use the Supabase dashboard **Table Editor** to manually import your existing JSON data, or run this script:

### Option A: Manual Import
1. Go to **Table Editor** in Supabase dashboard
2. Select each table
3. Click **Insert** → **Import data from CSV/JSON**
4. Upload your existing JSON files

### Option B: Script Import (Recommended)
Create a migration script `scripts/migrate-to-supabase.js`:

```javascript
import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

const supabase = createClient(
  'YOUR_SUPABASE_URL',
  'YOUR_SUPABASE_SERVICE_ROLE_KEY' // Use service role key for migration
);

async function migrateData() {
  // Migrate team members
  const teamData = JSON.parse(fs.readFileSync('./public/data/team.json'));
  const { error: teamError } = await supabase
    .from('team_members')
    .insert(teamData.teamMembers);
  
  if (teamError) console.error('Team migration error:', teamError);
  else console.log('✓ Team members migrated');

  // Migrate alumni
  const alumniData = JSON.parse(fs.readFileSync('./public/data/alumni.json'));
  const { error: alumniError } = await supabase
    .from('alumni')
    .insert(alumniData.alumniData);
  
  if (alumniError) console.error('Alumni migration error:', alumniError);
  else console.log('✓ Alumni migrated');

  // Continue for other tables...
}

migrateData();
```

## Step 6: Update Your Application

The following files have already been updated to support Supabase:

- ✅ `src/utils/supabase.js` - Supabase service utility
- ✅ `src/config/dataSource.js` - Configuration
- ✅ Admin components - Ready for Supabase integration

### Update Admin Components

In each admin component (e.g., `TeamManager.jsx`), replace the `saveData` function:

```javascript
import { supabaseService } from '../../utils/supabase';

const saveData = async (data) => {
  setIsSaving(true);
  try {
    // Save to Supabase
    await supabaseService.saveTeamMember(data);
    
    // Refresh data from Supabase
    const freshData = await supabaseService.getTeamMembers();
    setTeamData(freshData);
    
    alert('✓ Data saved successfully!');
  } catch (error) {
    console.error('Error saving data:', error);
    alert('Failed to save: ' + error.message);
  } finally {
    setIsSaving(false);
  }
};
```

### Update Front-End Pages

In your public-facing pages (e.g., `Team.jsx`), fetch from Supabase:

```javascript
import { supabaseService } from '../utils/supabase';

useEffect(() => {
  async function loadData() {
    try {
      const data = await supabaseService.getTeamMembers();
      setTeamData(data);
    } catch (error) {
      console.error('Error loading team data:', error);
    }
  }
  loadData();
}, []);
```

## Step 7: Enable Real-Time Updates (Optional)

For live updates across all connected clients:

```javascript
useEffect(() => {
  const subscription = supabaseService.subscribeToTable('team_members', (payload) => {
    console.log('Change received!', payload);
    // Refresh data
    loadData();
  });

  return () => {
    supabaseService.unsubscribe(subscription);
  };
}, []);
```

## Step 8: Test Your Setup

1. Start your development server: `npm run dev`
2. Check browser console for Supabase connection
3. Test CRUD operations in admin dashboard
4. Verify changes appear instantly

## Troubleshooting

### "Supabase not configured" error
- Check that `.env` file exists and has correct values
- Restart dev server after adding environment variables
- Verify environment variable names start with `VITE_`

### "Row Level Security policy violation"
- Check RLS policies in Supabase dashboard
- Ensure policies allow public read and authenticated write
- For testing, you can temporarily disable RLS (not recommended for production)

### Data not appearing
- Check browser console for errors
- Verify table names match exactly (case-sensitive)
- Check that data was successfully migrated

## Security Best Practices

1. **Never commit `.env` file** - Add to `.gitignore`
2. **Use Row Level Security** - Protect your data
3. **Use anon key for client** - Never use service role key in frontend
4. **Implement proper authentication** - Consider using Supabase Auth
5. **Validate user permissions** - Check roles before allowing modifications

## Cost Monitoring

The free tier includes:
- 500 MB database space
- 1 GB file storage
- 50,000 monthly active users
- 2 GB bandwidth

Monitor usage in Supabase dashboard under **Settings** → **Usage**.

## Next Steps

1. ✅ Complete database setup
2. ✅ Migrate existing data
3. ✅ Update all admin components
4. ✅ Update front-end pages
5. ⬜ Test thoroughly
6. ⬜ Consider implementing Supabase Auth
7. ⬜ Set up real-time subscriptions
8. ⬜ Deploy updated application

## Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase JavaScript Client](https://supabase.com/docs/reference/javascript/introduction)
- [Row Level Security Guide](https://supabase.com/docs/guides/auth/row-level-security)
- [Supabase Auth](https://supabase.com/docs/guides/auth)

## Support

If you encounter issues:
- Check Supabase Discord community
- Review Supabase documentation
- Check browser console for detailed error messages
