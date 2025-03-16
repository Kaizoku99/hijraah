-- ROLLBACK TEMPLATE
-- Use this template to create a migration with proper rollback support

-- MIGRATION UP SECTION
-- ==============================================================================
-- Migration: [YYYY-MM-DD]_[VERSION]_[NAME].sql
-- Description: [BRIEF DESCRIPTION]
-- ==============================================================================

BEGIN;

-- Run your migration code here
CREATE SCHEMA IF NOT EXISTS example_schema;

CREATE TABLE IF NOT EXISTS example_schema.example_table (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Register the migration
SELECT migration_meta.register_migration(
    '[VERSION]',  -- e.g., '1.11.0'
    '[NAME]',     -- e.g., 'create_example_table'
    '[BRIEF DESCRIPTION]'
);

-- MIGRATION DOWN SECTION (ROLLBACK)
-- ==============================================================================
-- Register a rollback script that will undo this migration
SELECT migration_meta.register_rollback(
    '[VERSION]',  -- Must match the version above
    '[NAME]',     -- Must match the name above
    $ROLLBACK$
    -- SQL statements to undo the migration
    DROP TABLE IF EXISTS example_schema.example_table;
    DROP SCHEMA IF EXISTS example_schema CASCADE;
    $ROLLBACK$
);

COMMIT;

-- USAGE INSTRUCTIONS
-- ==============================================================================
-- To roll back this specific migration:
-- SELECT migration_meta.rollback_migration('[VERSION]', '[NAME]');
-- 
-- To roll back to a previous version (will roll back all migrations after that version):
-- SELECT * FROM migration_meta.rollback_to_version('[PREVIOUS_VERSION]');
-- 
-- Example: 
-- SELECT * FROM migration_meta.rollback_to_version('1.7.0');
--
-- IMPORTANT NOTES
-- ==============================================================================
-- 1. Make sure your rollback scripts are thoroughly tested
-- 2. Consider data loss implications of rollbacks
-- 3. Some changes cannot be perfectly rolled back (e.g., data deletions)
-- 4. Structure your migrations to be small and focused for easier rollbacks 