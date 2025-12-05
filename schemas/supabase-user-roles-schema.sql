create table public.user_roles (
  id uuid not null default gen_random_uuid (),
  user_id uuid not null,
  email text not null,
  level text not null default 'member'::text,
  created_at timestamp with time zone null default now(),
  updated_at timestamp with time zone null default now(),
  specific_role text null,
  first_name text null,
  last_name text null,
  phone_number text null,
  approval_status text not null default 'pending'::text,
  approved_by uuid null,
  approved_at timestamp with time zone null,
  constraint user_roles_pkey primary key (id),
  constraint user_roles_user_id_key unique (user_id),
  constraint user_roles_email_key unique (email),
  constraint user_roles_user_id_fkey foreign KEY (user_id) references auth.users (id) on delete CASCADE,
  constraint user_roles_approved_by_fkey foreign KEY (approved_by) references auth.users (id) on delete set null,
  constraint user_roles_level_check check (
    (
      level = any (
        array['member'::text, 'leader'::text, 'director'::text]
      )
    )
  ),
  constraint user_roles_approval_status_check check (
    (
      approval_status = any (
        array[
          'pending'::text,
          'approved'::text,
          'rejected'::text
        ]
      )
    )
  )
) TABLESPACE pg_default;

create index IF not exists idx_user_roles_user_id on public.user_roles using btree (user_id) TABLESPACE pg_default;

create index IF not exists idx_user_roles_email on public.user_roles using btree (email) TABLESPACE pg_default;

create trigger update_user_roles_updated_at BEFORE
update on user_roles for EACH row
execute FUNCTION update_user_role_timestamp ();

-- ROW LEVEL SECURITY (RLS)
ALTER TABLE user_roles ENABLE ROW LEVEL SECURITY;

-- Policy 1: Users can always read their own row
CREATE POLICY "Users can read own row" ON user_roles
  FOR SELECT
  USING (auth.uid() = user_id);

-- Policy 2: Users can insert their own row (for signup)
CREATE POLICY "Users can insert own row" ON user_roles
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Policy 3: Users can update their own row (limited fields)
CREATE POLICY "Users can update own row" ON user_roles
  FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Helper function to check if current user is an approved admin
-- Using SECURITY DEFINER to avoid RLS recursion
CREATE OR REPLACE FUNCTION public.is_approved_admin()
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  user_level TEXT;
  user_status TEXT;
BEGIN
  SELECT level, approval_status INTO user_level, user_status
  FROM public.user_roles
  WHERE user_id = auth.uid()
  LIMIT 1;
  
  RETURN (user_status = 'approved' AND user_level IN ('leader', 'director'));
END;
$$;

-- Helper function to check if current user is an approved director
CREATE OR REPLACE FUNCTION public.is_approved_director()
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  user_level TEXT;
  user_status TEXT;
BEGIN
  SELECT level, approval_status INTO user_level, user_status
  FROM public.user_roles
  WHERE user_id = auth.uid()
  LIMIT 1;
  
  RETURN (user_status = 'approved' AND user_level = 'director');
END;
$$;

-- Policy 4: Approved admins (leaders/directors) can read all rows
CREATE POLICY "Admins can read all rows" ON user_roles
  FOR SELECT
  USING (is_approved_admin());

-- Policy 5: Approved admins can update all rows
CREATE POLICY "Admins can update all rows" ON user_roles
  FOR UPDATE
  USING (is_approved_admin());

-- Policy 6: Approved directors can delete rows
CREATE POLICY "Directors can delete rows" ON user_roles
  FOR DELETE
  USING (is_approved_director());