-- SolarPack Web - Supabase Database Setup
-- 
-- STATUS: Already executed in production Supabase instance
-- This file is kept for reference and disaster recovery
--
-- To run (if setting up a new Supabase project):
-- Dashboard → SQL Editor → New Query → Paste & Run

-- ==========================================
-- TEAM MEMBERS TABLE
-- ==========================================
CREATE TABLE IF NOT EXISTS team_members (
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

-- Enable RLS
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;

-- Policies
DROP POLICY IF EXISTS "Allow public read access" ON team_members;
CREATE POLICY "Allow public read access" ON team_members
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow all modifications" ON team_members;
CREATE POLICY "Allow all modifications" ON team_members
  FOR ALL USING (true);

-- ==========================================
-- ALUMNI TABLE
-- ==========================================
CREATE TABLE IF NOT EXISTS alumni (
  id BIGSERIAL PRIMARY KEY,
  semester TEXT NOT NULL,
  leadership JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE alumni ENABLE ROW LEVEL SECURITY;

-- Policies
DROP POLICY IF EXISTS "Allow public read access" ON alumni;
CREATE POLICY "Allow public read access" ON alumni
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow all modifications" ON alumni;
CREATE POLICY "Allow all modifications" ON alumni
  FOR ALL USING (true);

-- ==========================================
-- SPONSORS TABLE
-- ==========================================
CREATE TABLE IF NOT EXISTS sponsors (
  id BIGSERIAL PRIMARY KEY,
  tier TEXT NOT NULL,
  name TEXT NOT NULL,
  logo TEXT,
  website TEXT,
  "order" INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE sponsors ENABLE ROW LEVEL SECURITY;

-- Policies
DROP POLICY IF EXISTS "Allow public read access" ON sponsors;
CREATE POLICY "Allow public read access" ON sponsors
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow all modifications" ON sponsors;
CREATE POLICY "Allow all modifications" ON sponsors
  FOR ALL USING (true);

-- ==========================================
-- SCHEDULES TABLE
-- ==========================================
CREATE TABLE IF NOT EXISTS schedules (
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
DROP POLICY IF EXISTS "Allow public read access" ON schedules;
CREATE POLICY "Allow public read access" ON schedules
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow all modifications" ON schedules;
CREATE POLICY "Allow all modifications" ON schedules
  FOR ALL USING (true);

-- ==========================================
-- ORDERS TABLE
-- ==========================================
CREATE TABLE IF NOT EXISTS orders (
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
DROP POLICY IF EXISTS "Allow public read access" ON orders;
CREATE POLICY "Allow public read access" ON orders
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow all modifications" ON orders;
CREATE POLICY "Allow all modifications" ON orders
  FOR ALL USING (true);

-- ==========================================
-- SUCCESS MESSAGE
-- ==========================================
DO $$ 
BEGIN 
  RAISE NOTICE '✓ All tables created successfully!';
  RAISE NOTICE '✓ Row Level Security enabled';
  RAISE NOTICE '✓ Policies configured';
  RAISE NOTICE '';
  RAISE NOTICE 'Next steps:';
  RAISE NOTICE '1. Check Table Editor to see your new tables';
  RAISE NOTICE '2. Import your JSON data or test with sample data';
  RAISE NOTICE '3. Update your .env file with Supabase credentials';
  RAISE NOTICE '4. Restart your dev server: npm run dev';
END $$;
