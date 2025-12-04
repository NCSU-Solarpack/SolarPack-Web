-- =============================================
-- Supabase User Roles Schema
-- =============================================
-- This schema creates a user_roles table to store user permission levels
-- New users default to 'member' level
-- Only directors can promote users to leader or director

-- Create user_roles table
CREATE TABLE IF NOT EXISTS user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  level TEXT NOT NULL DEFAULT 'member' CHECK (level IN ('member', 'leader', 'director')),
  specific_role TEXT NULL,  -- More detailed role (e.g., 'Electrical Lead', 'Mechanical Director')
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id),
  UNIQUE(email)
);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_user_roles_user_id ON user_roles(user_id);
CREATE INDEX IF NOT EXISTS idx_user_roles_email ON user_roles(email);

-- Enable Row Level Security
ALTER TABLE user_roles ENABLE ROW LEVEL SECURITY;

-- Policy: Users can read their own role
CREATE POLICY "Users can read their own role"
  ON user_roles
  FOR SELECT
  USING (auth.uid() = user_id);

-- Policy: Only directors can update user roles
CREATE POLICY "Only directors can update roles"
  ON user_roles
  FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_id = auth.uid() AND level = 'director'
    )
  );

-- Policy: Allow the trigger function to insert new user roles (for automatic signup)
-- AND allow directors to insert roles manually
CREATE POLICY "Allow signup trigger and director inserts"
  ON user_roles
  FOR INSERT
  WITH CHECK (
    -- Allow if this is being called by the trigger (auth.uid() will be the new user)
    auth.uid() = user_id
    OR
    -- Allow if a director is manually inserting
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_id = auth.uid() AND level = 'director'
    )
  );

-- Function to automatically create a user_role entry when a new user signs up
-- SECURITY DEFINER allows this function to bypass RLS policies
CREATE OR REPLACE FUNCTION create_user_role_on_signup()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO user_roles (user_id, email, level)
  VALUES (NEW.id, NEW.email, 'member')
  ON CONFLICT (user_id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create user role on signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION create_user_role_on_signup();

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_user_role_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to update timestamp
DROP TRIGGER IF EXISTS update_user_roles_updated_at ON user_roles;
CREATE TRIGGER update_user_roles_updated_at
  BEFORE UPDATE ON user_roles
  FOR EACH ROW
  EXECUTE FUNCTION update_user_role_timestamp();

-- Insert a default director account (you can change this email to your own)
-- NOTE: The user must first sign up through the app, then run this to promote them
-- INSERT INTO user_roles (user_id, email, level)
-- VALUES (
--   (SELECT id FROM auth.users WHERE email = 'your-director-email@example.com'),
--   'your-director-email@example.com',
--   'director'
-- )
-- ON CONFLICT (user_id) 
-- DO UPDATE SET level = 'director';
