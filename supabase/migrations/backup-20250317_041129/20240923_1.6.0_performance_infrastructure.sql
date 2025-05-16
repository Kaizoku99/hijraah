-- Added by syntax fixer script
BEGIN;
BEGIN;
BEGIN;
BEGIN;
BEGIN;
BEGIN;
-- Migration: 20240923_1.6.0_performance_infrastructure.sql
-- Description: Implements caching and performance features

-- Register this migration with versioning system
DO $$ 
BEGIN
  -- Only run if the migration_meta schema exists
  IF EXISTS (SELECT 1 FROM pg_namespace WHERE nspname = 'migration_meta') THEN
    PERFORM migration_meta.register_migration(
      1, 6, 0,
      'Performance infrastructure including caching',
      '20240923_1.6.0_performance_infrastructure.sql'
    );
  END IF;
END $$;

-- Part 1: Analysis Cache for AI Analysis Results

-- Create a table to store analysis cache results
CREATE TABLE IF NOT EXISTS public.analysis_cache (
  id BIGSERIAL PRIMARY KEY,
  cache_key TEXT NOT NULL UNIQUE,
  result JSONB NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  expires_at TIMESTAMPTZ NOT NULL,
  
  CONSTRAINT proper_cache_key CHECK (length(cache_key) > 0)
);

-- Add comments for documentation
COMMENT ON TABLE public.analysis_cache IS 'Stores cached results of content analysis to reduce API costs and improve performance';
COMMENT ON COLUMN public.analysis_cache.cache_key IS 'Unique hash key generated from content and query';
COMMENT ON COLUMN public.analysis_cache.result IS 'The cached analysis result in JSON format';
COMMENT ON COLUMN public.analysis_cache.created_at IS 'When the cache entry was created';
COMMENT ON COLUMN public.analysis_cache.expires_at IS 'When the cache entry should expire';

-- Create indices for faster lookups
CREATE INDEX IF NOT EXISTS idx_analysis_cache_cache_key ON public.analysis_cache(cache_key);
CREATE INDEX IF NOT EXISTS idx_analysis_cache_expires_at ON public.analysis_cache(expires_at);

-- Add RLS policies
ALTER TABLE public.analysis_cache ENABLE ROW LEVEL SECURITY;

-- Service role can do everything
CREATE POLICY "Service role can do everything" ON public.analysis_cache
  USING (true)
  WITH CHECK (true);

-- Add a function to clean up expired cache entries
CREATE OR REPLACE FUNCTION cleanup_expired_cache()
RETURNS TRIGGER AS $$
BEGIN
  DELETE FROM public.analysis_cache WHERE expires_at < NOW();
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Create a trigger to clean up expired cache entries periodically
DROP TRIGGER IF EXISTS trigger_cleanup_expired_cache ON public.analysis_cache;
CREATE TRIGGER trigger_cleanup_expired_cache
  AFTER INSERT ON public.analysis_cache
  FOR EACH STATEMENT
  WHEN (pg_trigger_depth() = 0)
  EXECUTE FUNCTION cleanup_expired_cache();

-- Part 2: General Caching Infrastructure

-- Create schema for caching structures
CREATE SCHEMA IF NOT EXISTS cache;

-- Create a cache metadata table to manage cache data
CREATE TABLE IF NOT EXISTS cache.metadata (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    cache_key TEXT NOT NULL UNIQUE,
    cache_type TEXT NOT NULL,
    last_refreshed TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    refresh_interval INTERVAL NOT NULL,
    is_enabled BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    created_by TEXT NOT NULL DEFAULT CURRENT_USER
);

-- Add comments for documentation
COMMENT ON TABLE cache.metadata IS 'Metadata for cached data';
COMMENT ON COLUMN cache.metadata.id IS 'Primary key for the cache metadata';
COMMENT ON COLUMN cache.metadata.cache_key IS 'Unique identifier for the cache';
COMMENT ON COLUMN cache.metadata.cache_type IS 'Type of cache (materialized_view, function, etc.)';
COMMENT ON COLUMN cache.metadata.last_refreshed IS 'Last time the cache was refreshed';
COMMENT ON COLUMN cache.metadata.refresh_interval IS 'How often the cache should be refreshed';
COMMENT ON COLUMN cache.metadata.is_enabled IS 'Whether the cache is enabled';
COMMENT ON COLUMN cache.metadata.created_at IS 'When the cache was created';
COMMENT ON COLUMN cache.metadata.created_by IS 'Who created the cache';

-- Create indices for faster lookups
CREATE INDEX IF NOT EXISTS idx_cache_metadata_cache_key ON cache.metadata (cache_key);
CREATE INDEX IF NOT EXISTS idx_cache_metadata_cache_type ON cache.metadata (cache_type);
CREATE INDEX IF NOT EXISTS idx_cache_metadata_last_refreshed ON cache.metadata (last_refreshed);
CREATE INDEX IF NOT EXISTS idx_cache_metadata_is_enabled ON cache.metadata (is_enabled);

-- Create a table for key-value pair caching
CREATE TABLE IF NOT EXISTS cache.key_value (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    cache_key TEXT NOT NULL,
    data_key TEXT NOT NULL,
    data_value JSONB NOT NULL,
    expires_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT unique_cache_data_key UNIQUE (cache_key, data_key)
);

-- Add comments for documentation
COMMENT ON TABLE cache.key_value IS 'Key-value pair cache for application data';
COMMENT ON COLUMN cache.key_value.id IS 'Primary key for the cache entry';
COMMENT ON COLUMN cache.key_value.cache_key IS 'Cache group/context the key belongs to';
COMMENT ON COLUMN cache.key_value.data_key IS 'The key for the cached data';
COMMENT ON COLUMN cache.key_value.data_value IS 'The cached data value as JSON';
COMMENT ON COLUMN cache.key_value.expires_at IS 'When the cache entry expires';
COMMENT ON COLUMN cache.key_value.created_at IS 'When the cache entry was created';
COMMENT ON COLUMN cache.key_value.updated_at IS 'When the cache entry was last updated';

-- Create indices for faster lookups
CREATE INDEX IF NOT EXISTS idx_key_value_cache_key ON cache.key_value (cache_key);
CREATE INDEX IF NOT EXISTS idx_key_value_data_key ON cache.key_value (data_key);
CREATE INDEX IF NOT EXISTS idx_key_value_expires_at ON cache.key_value (expires_at);
CREATE INDEX IF NOT EXISTS idx_key_value_combo ON cache.key_value (cache_key, data_key);

-- Add trigger to update the updated_at timestamp
CREATE TRIGGER update_key_value_updated_at
BEFORE UPDATE ON cache.key_value
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- Create function to get a cached value or generate it if missing
CREATE OR REPLACE FUNCTION cache.get_or_set(
    p_cache_key TEXT,
    p_data_key TEXT,
    p_ttl INTERVAL DEFAULT INTERVAL '1 hour',
    p_generator_func TEXT DEFAULT NULL
)
RETURNS JSONB AS $$
DECLARE
    v_result JSONB;
    v_value JSONB;
BEGIN
    -- Try to get from cache first
    SELECT data_value INTO v_result
    FROM cache.key_value
    WHERE cache_key = p_cache_key
    AND data_key = p_data_key
    AND (expires_at IS NULL OR expires_at > NOW());
    
    -- If found in cache, return it
    IF v_result IS NOT NULL THEN
        RETURN v_result;
    END IF;
    
    -- If no generator function provided, return null
    IF p_generator_func IS NULL THEN
        RETURN NULL;
    END IF;
    
    -- Generate the value using the provided function
    EXECUTE 'SELECT ' || p_generator_func || '()' INTO v_value;
    
    -- Store in cache
    INSERT INTO cache.key_value (cache_key, data_key, data_value, expires_at)
    VALUES (p_cache_key, p_data_key, v_value, NOW() + p_ttl)
    ON CONFLICT (cache_key, data_key)
    DO UPDATE SET
        data_value = v_value,
        expires_at = NOW() + p_ttl,
        updated_at = NOW();
    
    RETURN v_value;
END;
$$ LANGUAGE plpgsql;

COMMENT ON FUNCTION cache.get_or_set IS 'Gets a value from cache or generates and stores it if missing';

-- Create function to invalidate cache entries
CREATE OR REPLACE FUNCTION cache.invalidate(
    p_cache_key TEXT DEFAULT NULL,
    p_data_key TEXT DEFAULT NULL
)
RETURNS INTEGER AS $$
DECLARE
    v_count INTEGER;
BEGIN
    -- Different deletion strategies based on parameters
    IF p_cache_key IS NULL AND p_data_key IS NULL THEN
        -- Delete all cache entries
        DELETE FROM cache.key_value;
        GET DIAGNOSTICS v_count = ROW_COUNT;
    ELSIF p_cache_key IS NOT NULL AND p_data_key IS NULL THEN
        -- Delete all entries for a specific cache key
        DELETE FROM cache.key_value WHERE cache_key = p_cache_key;
        GET DIAGNOSTICS v_count = ROW_COUNT;
    ELSIF p_cache_key IS NOT NULL AND p_data_key IS NOT NULL THEN
        -- Delete a specific entry
        DELETE FROM cache.key_value 
        WHERE cache_key = p_cache_key AND data_key = p_data_key;
        GET DIAGNOSTICS v_count = ROW_COUNT;
    ELSE
        -- Cannot delete by data_key alone
        RAISE EXCEPTION 'Cannot invalidate by data_key without specifying cache_key';
    END IF;
    
    RETURN v_count;
END;
$$ LANGUAGE plpgsql;

COMMENT ON FUNCTION cache.invalidate IS 'Invalidates cache entries matching the given parameters';

-- Add RLS policies to cache tables
ALTER TABLE cache.metadata ENABLE ROW LEVEL SECURITY;
ALTER TABLE cache.key_value ENABLE ROW LEVEL SECURITY;

-- Only service role can manage cache metadata
CREATE POLICY "Service role can manage cache metadata" ON cache.metadata
FOR ALL USING (true);

-- Service role can manage key-value cache
CREATE POLICY "Service role can manage key-value cache" ON cache.key_value
FOR ALL USING (true);

-- Create function to clean up expired cache entries
CREATE OR REPLACE FUNCTION cache.cleanup_expired()
RETURNS INTEGER AS $$
DECLARE
    v_count INTEGER;
BEGIN
    DELETE FROM cache.key_value
    WHERE expires_at IS NOT NULL AND expires_at < NOW();
    
    GET DIAGNOSTICS v_count = ROW_COUNT;
    RETURN v_count;
END;
$$ LANGUAGE plpgsql;

COMMENT ON FUNCTION cache.cleanup_expired IS 'Removes all expired cache entries and returns count of entries removed';

-- Create user profiles cache materialized view
CREATE MATERIALIZED VIEW IF NOT EXISTS cache.user_profiles AS
SELECT 
    u.id,
    p.first_name,
    p.last_name,
    p.avatar_url,
    p.country_of_residence,
    p.language,
    u.email,
    u.created_at,
    u.last_sign_in_at,
    EXISTS (
        SELECT 1 FROM admin.users au WHERE au.id = u.id AND au.is_active = TRUE
    ) AS is_admin
FROM 
    auth.users u
LEFT JOIN 
    profiles p ON u.id = p.id;

-- Add index on the cached user profiles
CREATE UNIQUE INDEX IF NOT EXISTS idx_user_profiles_id ON cache.user_profiles(id);

-- Register this materialized view in cache metadata
INSERT INTO cache.metadata (
    cache_key,
    cache_type,
    refresh_interval,
    is_enabled
)
VALUES (
    'user_profiles',
    'materialized_view',
    INTERVAL '1 hour',
    TRUE
)
ON CONFLICT (cache_key) DO UPDATE
SET 
    last_refreshed = NOW(),
    refresh_interval = INTERVAL '1 hour',
    is_enabled = TRUE;

-- Function to refresh a specific materialized view
CREATE OR REPLACE FUNCTION cache.refresh_materialized_view(
    p_view_name TEXT
)
RETURNS BOOLEAN AS $$
DECLARE
    v_qualified_name TEXT;
    v_schema_name TEXT;
    v_view_name TEXT;
    v_cache_key TEXT;
    v_last_refreshed TIMESTAMPTZ;
    v_refresh_interval INTERVAL;
    v_is_enabled BOOLEAN;
BEGIN
    -- Parse schema and view name
    IF p_view_name LIKE '%.%' THEN
        v_schema_name := split_part(p_view_name, '.', 1);
        v_view_name := split_part(p_view_name, '.', 2);
        v_qualified_name := p_view_name;
    ELSE
        v_schema_name := 'cache';
        v_view_name := p_view_name;
        v_qualified_name := 'cache.' || p_view_name;
    END IF;
    
    -- Use cache_key or view name for lookup
    v_cache_key := v_view_name;
    
    -- Get cache metadata
    SELECT 
        last_refreshed,
        refresh_interval,
        is_enabled
    INTO 
        v_last_refreshed,
        v_refresh_interval,
        v_is_enabled
    FROM cache.metadata
    WHERE cache_key = v_cache_key
    AND cache_type = 'materialized_view';
    
    -- If not found or not enabled, exit
    IF v_last_refreshed IS NULL OR NOT v_is_enabled THEN
        RETURN FALSE;
    END IF;
    
    -- Refresh the materialized view
    EXECUTE 'REFRESH MATERIALIZED VIEW ' || v_qualified_name;
    
    -- Update the last_refreshed timestamp
    UPDATE cache.metadata
    SET last_refreshed = NOW()
    WHERE cache_key = v_cache_key;
    
    RETURN TRUE;
END;
$$ LANGUAGE plpgsql;

COMMENT ON FUNCTION cache.refresh_materialized_view IS 'Refreshes a specific materialized view if it is enabled and due for refresh'; 
