-- Added by syntax fixer script
BEGIN;
BEGIN;
BEGIN;
BEGIN;
BEGIN;
BEGIN;
-- Migration: 20240901_1.0.0_core_system_setup.sql
-- Description: Consolidated core system setup for Hijraah immigration platform
-- Includes migration versioning, rollback system, and basic infrastructure

-- First, create migration_meta schema if it doesn't exist
CREATE SCHEMA IF NOT EXISTS migration_meta;

-- Create migration versioning tables
CREATE TABLE IF NOT EXISTS migration_meta.versions (
    id SERIAL PRIMARY KEY,
    major INTEGER NOT NULL,
    minor INTEGER NOT NULL,
    patch INTEGER NOT NULL,
    description TEXT NOT NULL,
    filename TEXT NOT NULL,
    applied_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE (major, minor, patch)
);

COMMENT ON TABLE migration_meta.versions IS 'Tracks all migrations applied to the database';

-- Create migration history table
CREATE TABLE IF NOT EXISTS migration_meta.history (
    id SERIAL PRIMARY KEY,
    version_id INTEGER REFERENCES migration_meta.versions(id),
    filename TEXT NOT NULL,
    applied_at TIMESTAMPTZ DEFAULT NOW(),
    operation TEXT NOT NULL, -- 'apply', 'rollback', 'consolidated'
    status TEXT NOT NULL, -- 'success', 'failed'
    details TEXT
);

COMMENT ON TABLE migration_meta.history IS 'Tracks detailed history of migration operations';

-- Create rollback scripts table
CREATE TABLE IF NOT EXISTS migration_meta.rollback_scripts (
    id SERIAL PRIMARY KEY,
    version_id INTEGER REFERENCES migration_meta.versions(id),
    down_sql TEXT NOT NULL,
    dependencies TEXT[] DEFAULT '{}'::TEXT[]
);

COMMENT ON TABLE migration_meta.rollback_scripts IS 'Stores SQL to rollback migrations';

-- Create function to register a migration
CREATE OR REPLACE FUNCTION migration_meta.register_migration(
    p_major INTEGER,
    p_minor INTEGER,
    p_patch INTEGER,
    p_description TEXT,
    p_filename TEXT
) RETURNS INTEGER AS $$
DECLARE
    v_id INTEGER;
BEGIN
    -- Check if migration already exists
    SELECT id INTO v_id
    FROM migration_meta.versions
    WHERE major = p_major AND minor = p_minor AND patch = p_patch;
    
    IF v_id IS NULL THEN
        -- Insert new migration version
        INSERT INTO migration_meta.versions (major, minor, patch, description, filename)
        VALUES (p_major, p_minor, p_patch, p_description, p_filename)
        RETURNING id INTO v_id;
        
        -- Record in history
        INSERT INTO migration_meta.history (version_id, filename, operation, status)
        VALUES (v_id, p_filename, 'apply', 'success');
    END IF;
    
    RETURN v_id;
END;
$$ LANGUAGE plpgsql;

-- Create function to register a rollback script
CREATE OR REPLACE FUNCTION migration_meta.register_rollback_script(
    p_major INTEGER,
    p_minor INTEGER,
    p_patch INTEGER,
    p_down_sql TEXT,
    p_dependencies TEXT[] DEFAULT '{}'::TEXT[]
) RETURNS VOID AS $$
DECLARE
    v_version_id INTEGER;
BEGIN
    -- Get the version ID
    SELECT id INTO v_version_id
    FROM migration_meta.versions
    WHERE major = p_major AND minor = p_minor AND patch = p_patch;
    
    IF v_version_id IS NULL THEN
        RAISE EXCEPTION 'Migration version %.%.% not found', p_major, p_minor, p_patch;
    END IF;
    
    -- Delete existing rollback script if it exists
    DELETE FROM migration_meta.rollback_scripts
    WHERE version_id = v_version_id;
    
    -- Insert new rollback script
    INSERT INTO migration_meta.rollback_scripts (version_id, down_sql, dependencies)
    VALUES (v_version_id, p_down_sql, p_dependencies);
END;
$$ LANGUAGE plpgsql;

-- Create function to rollback a migration
CREATE OR REPLACE FUNCTION migration_meta.rollback_migration(
    p_major INTEGER,
    p_minor INTEGER,
    p_patch INTEGER
) RETURNS BOOLEAN AS $$
DECLARE
    v_version_id INTEGER;
    v_down_sql TEXT;
    v_filename TEXT;
    v_dependencies TEXT[];
    v_dep TEXT;
BEGIN
    -- Get the version ID and rollback script
    SELECT v.id, r.down_sql, v.filename, r.dependencies
    INTO v_version_id, v_down_sql, v_filename, v_dependencies
    FROM migration_meta.versions v
    JOIN migration_meta.rollback_scripts r ON v.id = r.version_id
    WHERE v.major = p_major AND v.minor = p_minor AND v.patch = p_patch;
    
    IF v_version_id IS NULL THEN
        RAISE EXCEPTION 'Migration version %.%.% not found or has no rollback script', p_major, p_minor, p_patch;
        RETURN FALSE;
    END IF;
    
    -- Check dependencies
    IF v_dependencies IS NOT NULL AND array_length(v_dependencies, 1) > 0 THEN
        FOREACH v_dep IN ARRAY v_dependencies
        LOOP
            IF EXISTS (
                SELECT 1 FROM migration_meta.versions
                WHERE filename = v_dep
                AND NOT EXISTS (
                    SELECT 1 FROM migration_meta.history
                    WHERE filename = v_dep AND operation = 'rollback' AND status = 'success'
                )
            ) THEN
                RAISE WARNING 'Dependency % must be rolled back first', v_dep;
                RETURN FALSE;
            END IF;
        END LOOP;
    END IF;
    
    BEGIN
        -- Execute rollback SQL
        EXECUTE v_down_sql;
        
        -- Record rollback in history
        INSERT INTO migration_meta.history (version_id, filename, operation, status)
        VALUES (v_version_id, v_filename, 'rollback', 'success');
        
        RETURN TRUE;
    EXCEPTION WHEN OTHERS THEN
        -- Record failed rollback
        INSERT INTO migration_meta.history (version_id, filename, operation, status, details)
        VALUES (v_version_id, v_filename, 'rollback', 'failed', SQLERRM);
        
        RAISE;
        RETURN FALSE;
    END;
END;
$$ LANGUAGE plpgsql;

COMMENT ON FUNCTION migration_meta.register_migration IS 'Registers a new migration in the versioning system';
COMMENT ON FUNCTION migration_meta.register_rollback_script IS 'Registers a rollback script for a specific migration';
COMMENT ON FUNCTION migration_meta.rollback_migration IS 'Rolls back a specific migration using its registered down SQL';

-- Register this migration
SELECT migration_meta.register_migration(
    1, 0, 0, 
    'Core system setup with migration versioning and rollback capabilities',
    '20240901_1.0.0_core_system_setup.sql'
);

-- Common function for tracking updated_at timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

COMMENT ON FUNCTION update_updated_at_column IS 'Automatically updates the updated_at timestamp column on record updates'; 
