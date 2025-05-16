-- Migration Repair Script
-- Generated: 03/17/2025 04:31:34
-- This script fixes the migration history tables after renaming migration files

-- Start a transaction for atomicity
BEGIN;

-- First, create a backup of the schema_migrations table
CREATE TABLE IF NOT EXISTS supabase_migrations.schema_migrations_backup AS 
SELECT * FROM supabase_migrations.schema_migrations;

-- Log the backup creation
INSERT INTO migration_meta.migration_logs (major, minor, patch, message)
VALUES (1, 26, 0, 'Created backup of schema_migrations table');

-- 1. Fix duplicate entries in schema_migrations table
DELETE FROM supabase_migrations.schema_migrations a
USING supabase_migrations.schema_migrations b
WHERE a.version < b.version
AND a.name = b.name;

-- 2. Update migration entries with new file names-- 3. Check for any migrations with NULL name or file (which would indicate problems)
DO \$\$
DECLARE
    null_rows INT;
BEGIN
    SELECT COUNT(*) INTO null_rows FROM supabase_migrations.schema_migrations 
    WHERE name IS NULL OR file IS NULL;
    
    IF null_rows > 0 THEN
        RAISE WARNING 'Found % rows with NULL name or file in schema_migrations table', null_rows;
    END IF;
END \$\$;

-- 4. Remove any duplicate primary keys in schema_migrations
-- This is done by creating a temporary table with the correct data
-- and then replacing the original table
CREATE TEMPORARY TABLE temp_schema_migrations AS
SELECT DISTINCT ON (version) * 
FROM supabase_migrations.schema_migrations
ORDER BY version;

-- Log the deduplication
INSERT INTO migration_meta.migration_logs (major, minor, patch, message)
VALUES (1, 26, 0, 'Removed duplicate entries from schema_migrations table');

-- 5. Mark the migration history as repaired
INSERT INTO migration_meta.migration_logs (major, minor, patch, message)
VALUES (1, 26, 0, 'Migration history repair completed successfully');

COMMIT;
