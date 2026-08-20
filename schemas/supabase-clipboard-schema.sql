-- Clipboard tables, RPC functions, and temporary file storage.
-- Run this in the Supabase SQL editor before using /clipboard.

CREATE TABLE IF NOT EXISTS clipboard_spaces (
    access_hash TEXT PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    CHECK (char_length(access_hash) >= 32)
);

CREATE TABLE IF NOT EXISTS clipboard_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    access_hash TEXT NOT NULL REFERENCES clipboard_spaces(access_hash) ON DELETE CASCADE,
    title TEXT NOT NULL DEFAULT '',
    content_html TEXT NOT NULL DEFAULT '',
    content_text TEXT NOT NULL DEFAULT '',
    item_type TEXT NOT NULL DEFAULT 'text',
    file_name TEXT,
    file_path TEXT,
    file_size BIGINT,
    file_type TEXT,
    expires_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Upgrade an existing text-only clipboard installation in place.
ALTER TABLE clipboard_items ADD COLUMN IF NOT EXISTS item_type TEXT NOT NULL DEFAULT 'text';
ALTER TABLE clipboard_items ADD COLUMN IF NOT EXISTS file_name TEXT;
ALTER TABLE clipboard_items ADD COLUMN IF NOT EXISTS file_path TEXT;
ALTER TABLE clipboard_items ADD COLUMN IF NOT EXISTS file_size BIGINT;
ALTER TABLE clipboard_items ADD COLUMN IF NOT EXISTS file_type TEXT;
ALTER TABLE clipboard_items ADD COLUMN IF NOT EXISTS expires_at TIMESTAMP WITH TIME ZONE;

ALTER TABLE clipboard_items DROP CONSTRAINT IF EXISTS clipboard_items_item_type_check;
ALTER TABLE clipboard_items ADD CONSTRAINT clipboard_items_item_type_check
    CHECK (item_type IN ('text', 'file'));

ALTER TABLE clipboard_items DROP CONSTRAINT IF EXISTS clipboard_items_file_shape_check;
ALTER TABLE clipboard_items ADD CONSTRAINT clipboard_items_file_shape_check CHECK (
    (item_type = 'text' AND file_name IS NULL AND file_path IS NULL AND file_size IS NULL
        AND file_type IS NULL AND expires_at IS NULL)
    OR
    (item_type = 'file' AND content_html = '' AND content_text = ''
        AND file_name IS NOT NULL AND file_path IS NOT NULL
        AND file_size IS NOT NULL AND file_size >= 0
        AND file_type IS NOT NULL AND expires_at IS NOT NULL)
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_clipboard_items_file_path
    ON clipboard_items(file_path) WHERE file_path IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_clipboard_items_access_hash_updated
    ON clipboard_items(access_hash, updated_at DESC);

CREATE INDEX IF NOT EXISTS idx_clipboard_items_expiry
    ON clipboard_items(expires_at) WHERE expires_at IS NOT NULL;

ALTER TABLE clipboard_spaces ENABLE ROW LEVEL SECURITY;
ALTER TABLE clipboard_items ENABLE ROW LEVEL SECURITY;

REVOKE ALL ON clipboard_spaces FROM anon, authenticated;
REVOKE ALL ON clipboard_items FROM anon, authenticated;

CREATE OR REPLACE FUNCTION update_clipboard_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_update_clipboard_spaces_updated_at ON clipboard_spaces;
CREATE TRIGGER trigger_update_clipboard_spaces_updated_at
    BEFORE UPDATE ON clipboard_spaces
    FOR EACH ROW
    EXECUTE FUNCTION update_clipboard_updated_at();

DROP TRIGGER IF EXISTS trigger_update_clipboard_items_updated_at ON clipboard_items;
CREATE TRIGGER trigger_update_clipboard_items_updated_at
    BEFORE UPDATE ON clipboard_items
    FOR EACH ROW
    EXECUTE FUNCTION update_clipboard_updated_at();

-- Return active text clips and unexpired file clips. Expired file rows stay hidden
-- until the scheduled cleanup function removes both their Storage objects and rows.
DROP FUNCTION IF EXISTS get_clipboard_items(TEXT);
CREATE FUNCTION get_clipboard_items(p_access_hash TEXT)
RETURNS TABLE (
    id UUID,
    title TEXT,
    content_html TEXT,
    content_text TEXT,
    item_type TEXT,
    file_name TEXT,
    file_path TEXT,
    file_size BIGINT,
    file_type TEXT,
    expires_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE,
    updated_at TIMESTAMP WITH TIME ZONE
) AS $$
BEGIN
    IF p_access_hash IS NULL OR char_length(p_access_hash) < 32 THEN
        RAISE EXCEPTION 'Invalid clipboard code';
    END IF;

    RETURN QUERY
    SELECT
        ci.id,
        ci.title,
        ci.content_html,
        ci.content_text,
        ci.item_type,
        ci.file_name,
        ci.file_path,
        ci.file_size,
        ci.file_type,
        ci.expires_at,
        ci.created_at,
        ci.updated_at
    FROM clipboard_items ci
    WHERE ci.access_hash = p_access_hash
      AND (ci.item_type = 'text' OR ci.expires_at > NOW())
    ORDER BY ci.updated_at DESC;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

DROP FUNCTION IF EXISTS save_clipboard_item(TEXT, UUID, TEXT, TEXT, TEXT);
CREATE FUNCTION save_clipboard_item(
    p_access_hash TEXT,
    p_id UUID,
    p_title TEXT,
    p_content_html TEXT,
    p_content_text TEXT
)
RETURNS TABLE (
    id UUID,
    title TEXT,
    content_html TEXT,
    content_text TEXT,
    item_type TEXT,
    file_name TEXT,
    file_path TEXT,
    file_size BIGINT,
    file_type TEXT,
    expires_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE,
    updated_at TIMESTAMP WITH TIME ZONE
) AS $$
DECLARE
    saved_id UUID;
BEGIN
    IF p_access_hash IS NULL OR char_length(p_access_hash) < 32 THEN
        RAISE EXCEPTION 'Invalid clipboard code';
    END IF;

    IF COALESCE(trim(p_content_text), '') = '' THEN
        RAISE EXCEPTION 'Text clips cannot be empty';
    END IF;

    INSERT INTO clipboard_spaces (access_hash)
    VALUES (p_access_hash)
    ON CONFLICT (access_hash) DO UPDATE SET updated_at = NOW();

    IF p_id IS NULL THEN
        INSERT INTO clipboard_items (access_hash, title, content_html, content_text, item_type)
        VALUES (
            p_access_hash,
            COALESCE(NULLIF(trim(p_title), ''), 'Untitled'),
            COALESCE(p_content_html, ''),
            COALESCE(p_content_text, ''),
            'text'
        )
        RETURNING clipboard_items.id INTO saved_id;
    ELSE
        UPDATE clipboard_items
        SET
            title = COALESCE(NULLIF(trim(p_title), ''), 'Untitled'),
            content_html = COALESCE(p_content_html, ''),
            content_text = COALESCE(p_content_text, ''),
            updated_at = NOW()
        WHERE clipboard_items.id = p_id
          AND clipboard_items.access_hash = p_access_hash
          AND clipboard_items.item_type = 'text'
        RETURNING clipboard_items.id INTO saved_id;

        IF saved_id IS NULL THEN
            RAISE EXCEPTION 'Text clipboard item not found';
        END IF;
    END IF;

    RETURN QUERY
    SELECT
        ci.id, ci.title, ci.content_html, ci.content_text, ci.item_type,
        ci.file_name, ci.file_path, ci.file_size, ci.file_type, ci.expires_at,
        ci.created_at, ci.updated_at
    FROM clipboard_items ci
    WHERE ci.id = saved_id
      AND ci.access_hash = p_access_hash;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

CREATE OR REPLACE FUNCTION save_clipboard_file(
    p_access_hash TEXT,
    p_file_name TEXT,
    p_file_path TEXT,
    p_file_size BIGINT,
    p_file_type TEXT
)
RETURNS TABLE (
    id UUID,
    title TEXT,
    content_html TEXT,
    content_text TEXT,
    item_type TEXT,
    file_name TEXT,
    file_path TEXT,
    file_size BIGINT,
    file_type TEXT,
    expires_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE,
    updated_at TIMESTAMP WITH TIME ZONE
) AS $$
DECLARE
    saved_id UUID;
BEGIN
    IF p_access_hash IS NULL OR p_access_hash !~ '^[0-9a-fA-F]{64}$' THEN
        RAISE EXCEPTION 'Invalid clipboard code';
    END IF;

    IF COALESCE(trim(p_file_name), '') = ''
       OR p_file_path IS NULL
       OR p_file_path NOT LIKE ('clipboard/' || p_access_hash || '/%')
       OR p_file_size IS NULL OR p_file_size < 0 OR p_file_size > 104857600 THEN
        RAISE EXCEPTION 'Invalid clipboard file';
    END IF;

    INSERT INTO clipboard_spaces (access_hash)
    VALUES (p_access_hash)
    ON CONFLICT (access_hash) DO UPDATE SET updated_at = NOW();

    INSERT INTO clipboard_items (
        access_hash, title, content_html, content_text, item_type,
        file_name, file_path, file_size, file_type, expires_at
    ) VALUES (
        p_access_hash,
        left(p_file_name, 512),
        '',
        '',
        'file',
        left(p_file_name, 512),
        p_file_path,
        p_file_size,
        COALESCE(NULLIF(p_file_type, ''), 'application/octet-stream'),
        NOW() + INTERVAL '24 hours'
    )
    RETURNING clipboard_items.id INTO saved_id;

    RETURN QUERY
    SELECT
        ci.id, ci.title, ci.content_html, ci.content_text, ci.item_type,
        ci.file_name, ci.file_path, ci.file_size, ci.file_type, ci.expires_at,
        ci.created_at, ci.updated_at
    FROM clipboard_items ci
    WHERE ci.id = saved_id
      AND ci.access_hash = p_access_hash;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

CREATE OR REPLACE FUNCTION delete_clipboard_item(p_access_hash TEXT, p_id UUID)
RETURNS BOOLEAN AS $$
DECLARE
    deleted_count INTEGER;
BEGIN
    IF p_access_hash IS NULL OR char_length(p_access_hash) < 32 THEN
        RAISE EXCEPTION 'Invalid clipboard code';
    END IF;

    DELETE FROM clipboard_items
    WHERE clipboard_items.id = p_id
      AND clipboard_items.access_hash = p_access_hash;

    GET DIAGNOSTICS deleted_count = ROW_COUNT;
    RETURN deleted_count > 0;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

GRANT EXECUTE ON FUNCTION get_clipboard_items(TEXT) TO anon, authenticated;
GRANT EXECUTE ON FUNCTION save_clipboard_item(TEXT, UUID, TEXT, TEXT, TEXT) TO anon, authenticated;
GRANT EXECUTE ON FUNCTION save_clipboard_file(TEXT, TEXT, TEXT, BIGINT, TEXT) TO anon, authenticated;
GRANT EXECUTE ON FUNCTION delete_clipboard_item(TEXT, UUID) TO anon, authenticated;

-- Public objects use random paths and are only discoverable through the hash-scoped
-- clipboard RPC. The bucket accepts every MIME type but caps individual files at 100 MB.
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES ('clipboard-files', 'clipboard-files', true, 104857600, NULL)
ON CONFLICT (id) DO UPDATE SET
    public = EXCLUDED.public,
    file_size_limit = EXCLUDED.file_size_limit,
    allowed_mime_types = EXCLUDED.allowed_mime_types;

DROP POLICY IF EXISTS "Clipboard code paths can upload" ON storage.objects;
CREATE POLICY "Clipboard code paths can upload"
ON storage.objects FOR INSERT TO anon, authenticated
WITH CHECK (
    bucket_id = 'clipboard-files'
    AND (storage.foldername(name))[1] = 'clipboard'
    AND (storage.foldername(name))[2] ~ '^[0-9a-fA-F]{64}$'
    AND (storage.foldername(name))[3] ~ '^[0-9a-fA-F-]{36}$'
);

DROP POLICY IF EXISTS "Clipboard code paths can delete" ON storage.objects;
CREATE POLICY "Clipboard code paths can delete"
ON storage.objects FOR DELETE TO anon, authenticated
USING (
    bucket_id = 'clipboard-files'
    AND (storage.foldername(name))[1] = 'clipboard'
    AND (storage.foldername(name))[2] ~ '^[0-9a-fA-F]{64}$'
    AND (storage.foldername(name))[3] ~ '^[0-9a-fA-F-]{36}$'
);

NOTIFY pgrst, 'reload schema';
