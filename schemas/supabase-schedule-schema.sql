-- ============================================
-- SolarPack Schedule Management System Schema
-- ============================================
-- This schema supports a comprehensive project and task management system
-- with teams, projects, tasks, and events tracking.

-- ============================================
-- 1. TEAMS TABLE
-- ============================================
-- Stores team information including colors for UI display
CREATE TABLE IF NOT EXISTS schedule_teams (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  color TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ============================================
-- 2. PROJECTS TABLE
-- ============================================
-- Main projects table with comprehensive tracking
CREATE TABLE IF NOT EXISTS schedule_projects (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  team TEXT NOT NULL REFERENCES schedule_teams(id) ON DELETE CASCADE,
  priority TEXT NOT NULL DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'critical')),
  status TEXT NOT NULL DEFAULT 'planning' CHECK (status IN ('planning', 'pending', 'in-progress', 'completed', 'on-hold', 'cancelled')),
  start_date DATE NOT NULL,
  due_date DATE NOT NULL,
  estimated_hours INTEGER DEFAULT 0,
  actual_hours INTEGER DEFAULT 0,
  progress INTEGER DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
  assigned_to TEXT NOT NULL,
  notes TEXT,
  weekly_notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  created_by TEXT,
  CONSTRAINT valid_dates CHECK (start_date <= due_date)
);

-- ============================================
-- 3. TASKS TABLE
-- ============================================
-- Individual tasks associated with projects
CREATE TABLE IF NOT EXISTS schedule_tasks (
  id BIGSERIAL PRIMARY KEY,
  project_id BIGINT NOT NULL REFERENCES schedule_projects(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  start_date DATE NOT NULL,
  due_date DATE NOT NULL,
  estimated_hours INTEGER DEFAULT 0,
  actual_hours INTEGER DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'in-progress', 'completed', 'blocked', 'cancelled')),
  priority TEXT NOT NULL DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'critical')),
  assigned_to TEXT NOT NULL,
  progress INTEGER DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  CONSTRAINT valid_dates CHECK (start_date <= due_date)
);

-- ============================================
-- 4. EVENTS TABLE - REMOVED (Not needed for this implementation)
-- ============================================
-- If you need calendar events in the future, uncomment and run this section
/*
CREATE TABLE IF NOT EXISTS schedule_events (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  team TEXT NOT NULL REFERENCES schedule_teams(id) ON DELETE CASCADE,
  event_date DATE NOT NULL,
  start_time TIME,
  end_time TIME,
  event_type TEXT DEFAULT 'meeting' CHECK (event_type IN ('meeting', 'testing', 'presentation', 'deadline', 'milestone', 'other')),
  priority TEXT NOT NULL DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'critical')),
  location TEXT,
  attendees TEXT[], -- Array of attendee names/emails
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  created_by TEXT,
  CONSTRAINT valid_times CHECK (start_time IS NULL OR end_time IS NULL OR start_time < end_time)
);
*/

-- ============================================
-- INDEXES FOR PERFORMANCE
-- ============================================
-- Improve query performance on commonly filtered columns
CREATE INDEX IF NOT EXISTS idx_projects_team ON schedule_projects(team);
CREATE INDEX IF NOT EXISTS idx_projects_status ON schedule_projects(status);
CREATE INDEX IF NOT EXISTS idx_projects_due_date ON schedule_projects(due_date);
CREATE INDEX IF NOT EXISTS idx_projects_assigned_to ON schedule_projects(assigned_to);

CREATE INDEX IF NOT EXISTS idx_tasks_project_id ON schedule_tasks(project_id);
CREATE INDEX IF NOT EXISTS idx_tasks_status ON schedule_tasks(status);
CREATE INDEX IF NOT EXISTS idx_tasks_due_date ON schedule_tasks(due_date);
CREATE INDEX IF NOT EXISTS idx_tasks_assigned_to ON schedule_tasks(assigned_to);

-- Event indexes (removed - events table not used)
-- CREATE INDEX IF NOT EXISTS idx_events_team ON schedule_events(team);
-- CREATE INDEX IF NOT EXISTS idx_events_date ON schedule_events(event_date);
-- CREATE INDEX IF NOT EXISTS idx_events_type ON schedule_events(event_type);

-- ============================================
-- TRIGGERS FOR UPDATED_AT TIMESTAMPS
-- ============================================
-- Automatically update the updated_at timestamp when records are modified

-- Function to update timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = timezone('utc'::text, now());
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply trigger to projects table
DROP TRIGGER IF EXISTS update_schedule_projects_updated_at ON schedule_projects;
CREATE TRIGGER update_schedule_projects_updated_at
  BEFORE UPDATE ON schedule_projects
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Apply trigger to tasks table
DROP TRIGGER IF EXISTS update_schedule_tasks_updated_at ON schedule_tasks;
CREATE TRIGGER update_schedule_tasks_updated_at
  BEFORE UPDATE ON schedule_tasks
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Apply trigger to teams table
DROP TRIGGER IF EXISTS update_schedule_teams_updated_at ON schedule_teams;
CREATE TRIGGER update_schedule_teams_updated_at
  BEFORE UPDATE ON schedule_teams
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Apply trigger to events table (removed - events table not used)
-- DROP TRIGGER IF EXISTS update_schedule_events_updated_at ON schedule_events;
-- CREATE TRIGGER update_schedule_events_updated_at
--   BEFORE UPDATE ON schedule_events
--   FOR EACH ROW
--   EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================
-- Enable RLS for all tables (you can customize policies based on your auth needs)

ALTER TABLE schedule_teams ENABLE ROW LEVEL SECURITY;
ALTER TABLE schedule_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE schedule_tasks ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE schedule_events ENABLE ROW LEVEL SECURITY; -- Events table not used

-- Public read access (anyone can view)
-- Modify these policies based on your authentication requirements

CREATE POLICY "Allow public read access on teams" ON schedule_teams
  FOR SELECT USING (true);

CREATE POLICY "Allow public read access on projects" ON schedule_projects
  FOR SELECT USING (true);

CREATE POLICY "Allow public read access on tasks" ON schedule_tasks
  FOR SELECT USING (true);

-- CREATE POLICY "Allow public read access on events" ON schedule_events
--   FOR SELECT USING (true); -- Events table not used

-- Authenticated users can insert/update/delete
-- You can customize these based on your auth system

CREATE POLICY "Allow authenticated insert on teams" ON schedule_teams
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow authenticated update on teams" ON schedule_teams
  FOR UPDATE USING (true);

CREATE POLICY "Allow authenticated delete on teams" ON schedule_teams
  FOR DELETE USING (true);

CREATE POLICY "Allow authenticated insert on projects" ON schedule_projects
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow authenticated update on projects" ON schedule_projects
  FOR UPDATE USING (true);

CREATE POLICY "Allow authenticated delete on projects" ON schedule_projects
  FOR DELETE USING (true);

CREATE POLICY "Allow authenticated insert on tasks" ON schedule_tasks
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow authenticated update on tasks" ON schedule_tasks
  FOR UPDATE USING (true);

CREATE POLICY "Allow authenticated delete on tasks" ON schedule_tasks
  FOR DELETE USING (true);

-- Events table policies (removed - events table not used)
-- CREATE POLICY "Allow authenticated insert on events" ON schedule_events
--   FOR INSERT WITH CHECK (true);
-- CREATE POLICY "Allow authenticated update on events" ON schedule_events
--   FOR UPDATE USING (true);
-- CREATE POLICY "Allow authenticated delete on events" ON schedule_events
--   FOR DELETE USING (true);

-- ============================================
-- INITIAL TEAM DATA
-- ============================================
-- Insert the standard SolarPack teams

INSERT INTO schedule_teams (id, name, color, description) VALUES
  ('director', 'Project Director', '#6366f1', 'Overall project leadership and coordination'),
  ('technical-director', 'Technical Director', '#8b5cf6', 'Technical oversight and engineering leadership'),
  ('aerodynamics', 'Aerodynamics', '#06b6d4', 'Aeroshell design and wind tunnel testing'),
  ('high-voltage', 'High Voltage', '#ef4444', 'Battery and high-voltage electrical systems'),
  ('low-voltage', 'Low Voltage', '#f59e0b', 'Electronics and control systems'),
  ('systems-architecture', 'Systems Architecture', '#10b981', 'System integration and architecture design'),
  ('structures', 'Structures', '#14b8a6', 'Vehicle frame and structural design'),
  ('vehicle-dynamics', 'Vehicle Dynamics', '#f97316', 'Suspension, steering, and handling'),
  ('business', 'Business', '#84cc16', 'Sponsorship, marketing, and operations')
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  color = EXCLUDED.color,
  description = EXCLUDED.description;

-- ============================================
-- HELPFUL VIEWS
-- ============================================

-- View to get projects with their task counts and completion status
CREATE OR REPLACE VIEW schedule_projects_summary AS
SELECT 
  p.*,
  COUNT(t.id) as task_count,
  COUNT(CASE WHEN t.status = 'completed' THEN 1 END) as completed_tasks,
  ROUND(AVG(t.progress)::numeric, 0) as avg_task_progress
FROM schedule_projects p
LEFT JOIN schedule_tasks t ON p.id = t.project_id
GROUP BY p.id;

-- View to get overdue projects
CREATE OR REPLACE VIEW schedule_overdue_projects AS
SELECT *
FROM schedule_projects
WHERE due_date < CURRENT_DATE
  AND status NOT IN ('completed', 'cancelled');

-- View to get overdue tasks
CREATE OR REPLACE VIEW schedule_overdue_tasks AS
SELECT 
  t.*,
  p.title as project_title,
  p.team as project_team
FROM schedule_tasks t
JOIN schedule_projects p ON t.project_id = p.id
WHERE t.due_date < CURRENT_DATE
  AND t.status NOT IN ('completed', 'cancelled');

-- View to get upcoming events (removed - events table not used)
-- CREATE OR REPLACE VIEW schedule_upcoming_events AS
-- SELECT *
-- FROM schedule_events
-- WHERE event_date BETWEEN CURRENT_DATE AND CURRENT_DATE + INTERVAL '30 days'
-- ORDER BY event_date, start_time;

-- ============================================
-- COMMENTS
-- ============================================
COMMENT ON TABLE schedule_teams IS 'Team/subteam information for the SolarPack project';
COMMENT ON TABLE schedule_projects IS 'Major projects and initiatives tracked across teams';
COMMENT ON TABLE schedule_tasks IS 'Individual tasks that belong to projects';
-- COMMENT ON TABLE schedule_events IS 'Calendar events including meetings, tests, and milestones'; -- Events table not used
