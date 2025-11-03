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
  "order" INTEGER DEFAULT 0,
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

-- Ensure 'order' column exists for drag-and-drop sorting
ALTER TABLE alumni ADD COLUMN IF NOT EXISTS "order" INTEGER DEFAULT 0;

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
  
  -- Submission Details
  submission_timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  subteam TEXT,
  submitter_name TEXT,
  submitter_email TEXT,
  created_by TEXT,
  
  -- Material Details
  material_name TEXT NOT NULL,
  specifications TEXT,
  material_link TEXT,
  supplier TEXT,
  supplier_contact TEXT,
  
  -- Cost Breakdown
  unit_price DECIMAL(10, 2),
  quantity INTEGER DEFAULT 1,
  subtotal DECIMAL(10, 2),
  shipping_cost DECIMAL(10, 2) DEFAULT 0,
  taxes DECIMAL(10, 2) DEFAULT 0,
  fees DECIMAL(10, 2) DEFAULT 0,
  total_cost DECIMAL(10, 2),
  
  -- Project Details
  purpose TEXT,
  priority TEXT DEFAULT 'medium',
  urgency TEXT DEFAULT 'flexible',
  needed_by_date TIMESTAMP WITH TIME ZONE,
  
  -- Approval Workflow - Technical Director
  tech_approval_status TEXT DEFAULT 'pending',
  tech_approved_by TEXT,
  tech_approval_date TIMESTAMP WITH TIME ZONE,
  tech_comments TEXT,
  tech_denial_reason TEXT,
  
  -- Approval Workflow - Project Director
  project_approval_status TEXT DEFAULT 'pending',
  project_approved_by TEXT,
  project_approval_date TIMESTAMP WITH TIME ZONE,
  project_comments TEXT,
  project_denial_reason TEXT,
  
  -- Sponsorship Info
  can_be_sponsored BOOLEAN DEFAULT false,
  sponsor_contact_name TEXT,
  sponsor_contact_email TEXT,
  sponsor_company TEXT,
  sponsorship_requested BOOLEAN DEFAULT false,
  sponsorship_request_date TIMESTAMP WITH TIME ZONE,
  sponsorship_successful BOOLEAN DEFAULT false,
  sponsorship_response TEXT,
  sponsorship_response_date TIMESTAMP WITH TIME ZONE,
  
  -- Purchase Status
  purchased BOOLEAN DEFAULT false,
  purchase_date TIMESTAMP WITH TIME ZONE,
  purchase_order_number TEXT,
  actual_cost DECIMAL(10, 2),
  purchased_by TEXT,
  
  -- Delivery Info
  expected_arrival_date TIMESTAMP WITH TIME ZONE,
  actual_arrival_date TIMESTAMP WITH TIME ZONE,
  delivered_to_subteam BOOLEAN DEFAULT false,
  delivery_confirmed_by TEXT,
  delivery_notes TEXT,
  tracking_number TEXT,
  
  -- Documentation
  receipt_uploaded BOOLEAN DEFAULT false,
  receipt_file_name TEXT,
  receipt_upload_date TIMESTAMP WITH TIME ZONE,
  receipt_uploaded_by TEXT,
  additional_documents JSONB DEFAULT '[]'::jsonb,
  
  -- Return Info
  returned BOOLEAN DEFAULT false,
  return_date TIMESTAMP WITH TIME ZONE,
  return_reason TEXT,
  return_authorized_by TEXT,
  refund_amount DECIMAL(10, 2),
  refund_processed BOOLEAN DEFAULT false,
  
  -- Status and Metadata
  status TEXT DEFAULT 'pending_technical_approval',
  last_updated TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
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
