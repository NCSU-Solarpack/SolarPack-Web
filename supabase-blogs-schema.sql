-- Blog Posts Table
CREATE TABLE IF NOT EXISTS blogs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    author TEXT NOT NULL,
    body TEXT NOT NULL,
    image_url TEXT,
    link_url TEXT,
    link_text TEXT,
    published BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create an index on created_at for sorting
CREATE INDEX IF NOT EXISTS idx_blogs_created_at ON blogs(created_at DESC);

-- Create an index on published for filtering
CREATE INDEX IF NOT EXISTS idx_blogs_published ON blogs(published);

-- Enable Row Level Security
ALTER TABLE blogs ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can read published blog posts
CREATE POLICY "Public can view published blogs" ON blogs
    FOR SELECT
    USING (published = true);

-- Policy: Authenticated users can read all blogs (for admin)
CREATE POLICY "Authenticated users can view all blogs" ON blogs
    FOR SELECT
    TO authenticated
    USING (true);

-- Policy: Authenticated users can insert blogs
CREATE POLICY "Authenticated users can insert blogs" ON blogs
    FOR INSERT
    TO authenticated
    WITH CHECK (true);

-- Policy: Authenticated users can update blogs
CREATE POLICY "Authenticated users can update blogs" ON blogs
    FOR UPDATE
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- Policy: Authenticated users can delete blogs
CREATE POLICY "Authenticated users can delete blogs" ON blogs
    FOR DELETE
    TO authenticated
    USING (true);

-- Function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_blogs_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to call the function before update
CREATE TRIGGER trigger_update_blogs_updated_at
    BEFORE UPDATE ON blogs
    FOR EACH ROW
    EXECUTE FUNCTION update_blogs_updated_at();

-- =====================================================
-- STORAGE BUCKET SETUP (Run this in Supabase Dashboard)
-- =====================================================
-- NOTE: This creates a storage bucket for blog images.
-- Go to Storage in Supabase Dashboard and create a bucket named 'blog-images'
-- with the following settings:
--   - Public bucket: Yes
--   - File size limit: 5MB
--   - Allowed MIME types: image/jpeg, image/jpg, image/png, image/webp, image/gif
--
-- Then run these policies:

-- Storage Policies for blog-images bucket
-- Allow public to read blog images
INSERT INTO storage.buckets (id, name, public)
VALUES ('blog-images', 'blog-images', true)
ON CONFLICT (id) DO NOTHING;

-- Allow authenticated users to upload blog images
CREATE POLICY "Authenticated users can upload blog images"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'blog-images');

-- Allow authenticated users to update their blog images
CREATE POLICY "Authenticated users can update blog images"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'blog-images');

-- Allow authenticated users to delete blog images
CREATE POLICY "Authenticated users can delete blog images"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'blog-images');

-- Allow public to read blog images
CREATE POLICY "Public can read blog images"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'blog-images');
