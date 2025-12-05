-- Supabase File Storage Bucket Schema
-- Creates a 'file-storage' bucket for general file management
-- Accessible by members, leaders, and directors
-- 
-- Run this in your Supabase SQL Editor to create the storage bucket and policies

-- =====================================================
-- CREATE THE FILE STORAGE BUCKET
-- =====================================================

-- Insert the bucket into storage.buckets if it doesn't exist
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'file-storage',
  'file-storage',
  true, -- Public bucket so files can be viewed/downloaded
  52428800, -- 50MB max file size
  ARRAY[
    'image/jpeg',
    'image/png', 
    'image/gif',
    'image/webp',
    'image/svg+xml',
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'application/vnd.ms-powerpoint',
    'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    'text/plain',
    'text/csv',
    'application/zip',
    'application/x-zip-compressed',
    'video/mp4',
    'video/webm',
    'audio/mpeg',
    'audio/wav'
  ]
)
ON CONFLICT (id) DO UPDATE SET
  public = EXCLUDED.public,
  file_size_limit = EXCLUDED.file_size_limit,
  allowed_mime_types = EXCLUDED.allowed_mime_types;

-- =====================================================
-- ROW LEVEL SECURITY POLICIES FOR FILE-STORAGE BUCKET
-- =====================================================

-- Enable RLS on storage.objects (if not already enabled)
DO $$
BEGIN
  ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;
EXCEPTION WHEN others THEN
  RAISE NOTICE 'Skipping ALTER TABLE storage.objects: %', SQLERRM;
END
$$;

DO $$
BEGIN
  DROP POLICY IF EXISTS "Members can view file-storage files" ON storage.objects;
  DROP POLICY IF EXISTS "Members can upload to file-storage" ON storage.objects;
  DROP POLICY IF EXISTS "Members can update file-storage files" ON storage.objects;
  DROP POLICY IF EXISTS "Members can delete from file-storage" ON storage.objects;
  DROP POLICY IF EXISTS "Public can view file-storage files" ON storage.objects;
EXCEPTION WHEN others THEN
  RAISE NOTICE 'Skipping DROP POLICY on storage.objects: %', SQLERRM;
END
$$;

DO $$
BEGIN
  CREATE POLICY "Public can view file-storage files"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'file-storage');
EXCEPTION WHEN others THEN
  RAISE NOTICE 'Skipping CREATE POLICY Public can view file-storage files: %', SQLERRM;
END
$$;

-- Policy 2: Authenticated users with member/leader/director role can upload
-- Users must be logged in and have a valid role in user_roles table
DO $$
BEGIN
  CREATE POLICY "Members can upload to file-storage"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'file-storage'
    AND auth.role() = 'authenticated'
    AND EXISTS (
      SELECT 1 FROM public.user_roles 
      WHERE user_id = auth.uid() 
      AND status IN ('member', 'leader', 'director')
    )
    -- Protect website-data folder - no uploads allowed there
    AND NOT (name LIKE 'website-data/%')
  );
EXCEPTION WHEN others THEN
  RAISE NOTICE 'Skipping CREATE POLICY Members can upload to file-storage: %', SQLERRM;
END
$$;

-- Policy 3: Authenticated users with member/leader/director role can update their own files
DO $$
BEGIN
  CREATE POLICY "Members can update file-storage files"
  ON storage.objects FOR UPDATE
  USING (
    bucket_id = 'file-storage'
    AND auth.role() = 'authenticated'
    AND EXISTS (
      SELECT 1 FROM public.user_roles 
      WHERE user_id = auth.uid() 
      AND status IN ('member', 'leader', 'director')
    )
    -- Protect website-data folder - no updates allowed there
    AND NOT (name LIKE 'website-data/%')
  );
EXCEPTION WHEN others THEN
  RAISE NOTICE 'Skipping CREATE POLICY Members can update file-storage files: %', SQLERRM;
END
$$;

-- Policy 4: Authenticated users with member/leader/director role can delete files
DO $$
BEGIN
  CREATE POLICY "Members can delete from file-storage"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'file-storage'
    AND auth.role() = 'authenticated'
    AND EXISTS (
      SELECT 1 FROM public.user_roles 
      WHERE user_id = auth.uid() 
      AND status IN ('member', 'leader', 'director')
    )
    -- Protect website-data folder - no deletions allowed there
    AND NOT (name LIKE 'website-data/%')
  );
EXCEPTION WHEN others THEN
  RAISE NOTICE 'Skipping CREATE POLICY Members can delete from file-storage: %', SQLERRM;
END
$$;

-- =====================================================
-- NOTES ON USAGE
-- =====================================================
-- 
-- The 'file-storage' bucket structure:
-- 
-- file-storage/
-- ├── website-data/           (READ-ONLY - managed by other admin pages)
-- │   ├── order-receipts/     (Links to order-receipts bucket)
-- │   ├── blog-images/        (Links to blog-images bucket)
-- │   ├── sponsor-logos/      (Links to sponsor-logos bucket)
-- │   └── team-images/        (Links to team-images bucket)
-- │
-- └── [user folders]/         (Full access for members, leaders, directors)
--     ├── documents/
--     ├── images/
--     └── ... any other folders users create
--
-- The website-data folder is protected by RLS policies above.
-- Users can view files in website-data but cannot upload, modify, or delete them.
-- The actual files in website-data are references to the original buckets.
--
-- For the File Manager UI, the application will:
-- 1. Show the main file-storage bucket root with full CRUD operations
-- 2. Show a "Website Data" virtual folder that displays files from:
--    - order-receipts bucket
--    - blog-images bucket  
--    - sponsor-logos bucket
--    - team-images bucket
-- 3. When in "Website Data", operations are disabled with a warning message
