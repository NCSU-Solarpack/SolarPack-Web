-- Clipboard tables and RPC functions
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
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_clipboard_items_access_hash_updated
    ON clipboard_items(access_hash, updated_at DESC);

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

CREATE OR REPLACE FUNCTION get_clipboard_items(p_access_hash TEXT)
RETURNS TABLE (
    id UUID,
    title TEXT,
    content_html TEXT,
    content_text TEXT,
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
        ci.created_at,
        ci.updated_at
    FROM clipboard_items ci
    WHERE ci.access_hash = p_access_hash
    ORDER BY ci.updated_at DESC;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

CREATE OR REPLACE FUNCTION save_clipboard_item(
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
    created_at TIMESTAMP WITH TIME ZONE,
    updated_at TIMESTAMP WITH TIME ZONE
) AS $$
DECLARE
    saved_id UUID;
BEGIN
    IF p_access_hash IS NULL OR char_length(p_access_hash) < 32 THEN
        RAISE EXCEPTION 'Invalid clipboard code';
    END IF;

    INSERT INTO clipboard_spaces (access_hash)
    VALUES (p_access_hash)
    ON CONFLICT (access_hash) DO UPDATE SET updated_at = NOW();

    IF p_id IS NULL THEN
        INSERT INTO clipboard_items (access_hash, title, content_html, content_text)
        VALUES (
            p_access_hash,
            COALESCE(NULLIF(trim(p_title), ''), 'Untitled'),
            COALESCE(p_content_html, ''),
            COALESCE(p_content_text, '')
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
        RETURNING clipboard_items.id INTO saved_id;

        IF saved_id IS NULL THEN
            RAISE EXCEPTION 'Clipboard item not found';
        END IF;
    END IF;

    RETURN QUERY
    SELECT
        ci.id,
        ci.title,
        ci.content_html,
        ci.content_text,
        ci.created_at,
        ci.updated_at
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
GRANT EXECUTE ON FUNCTION delete_clipboard_item(TEXT, UUID) TO anon, authenticated;
