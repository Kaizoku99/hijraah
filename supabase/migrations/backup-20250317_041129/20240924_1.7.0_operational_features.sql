-- Added by syntax fixer script
BEGIN;
BEGIN;
BEGIN;
BEGIN;
BEGIN;
BEGIN;
BEGIN;
BEGIN;
BEGIN;
-- Migration: 20240924_1.7.0_operational_features.sql
-- Description: Implements data retention and sharding infrastructure

-- Register this migration with versioning system
DO $$ 
BEGIN
  -- Only run if the migration_meta schema exists
  IF EXISTS (SELECT 1 FROM pg_namespace WHERE nspname = 'migration_meta') THEN
    PERFORM migration_meta.register_migration(
      1, 7, 0,
      'Operational features including data retention and sharding',
      '20240924_1.7.0_operational_features.sql'
    );
  END IF;
END $$;

-- Part 1: Data Retention System

-- Create schema for retention policy management
CREATE SCHEMA IF NOT EXISTS retention;

-- Create table to store retention policy definitions
CREATE TABLE IF NOT EXISTS retention.policies (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL UNIQUE,
    schema_name TEXT NOT NULL,
    table_name TEXT NOT NULL,
    retention_period INTERVAL NOT NULL,
    timestamp_column TEXT NOT NULL DEFAULT 'created_at',
    enabled BOOLEAN NOT NULL DEFAULT TRUE,
    archive_schema TEXT,
    archive_table TEXT,
    archive_before_delete BOOLEAN NOT NULL DEFAULT FALSE,
    delete_batch_size INTEGER NOT NULL DEFAULT 10000,
    last_run TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    created_by TEXT NOT NULL DEFAULT CURRENT_USER,
    CONSTRAINT unique_schema_table UNIQUE (schema_name, table_name)
);

-- Add comments for documentation
COMMENT ON TABLE retention.policies IS 'Retention policies for data cleanup';
COMMENT ON COLUMN retention.policies.id IS 'Primary key for the retention policy';
COMMENT ON COLUMN retention.policies.name IS 'Name of the retention policy';
COMMENT ON COLUMN retention.policies.schema_name IS 'Schema of the table to apply retention to';
COMMENT ON COLUMN retention.policies.table_name IS 'Table to apply retention to';
COMMENT ON COLUMN retention.policies.retention_period IS 'How long to keep data before deletion';
COMMENT ON COLUMN retention.policies.timestamp_column IS 'Column to use for determining data age';
COMMENT ON COLUMN retention.policies.enabled IS 'Whether the policy is enabled';
COMMENT ON COLUMN retention.policies.archive_schema IS 'Schema to archive data to before deletion (optional)';
COMMENT ON COLUMN retention.policies.archive_table IS 'Table to archive data to before deletion (optional)';
COMMENT ON COLUMN retention.policies.archive_before_delete IS 'Whether to archive data before deletion';
COMMENT ON COLUMN retention.policies.delete_batch_size IS 'How many rows to delete in one batch';
COMMENT ON COLUMN retention.policies.last_run IS 'When the policy was last executed';
COMMENT ON COLUMN retention.policies.created_at IS 'When the policy was created';
COMMENT ON COLUMN retention.policies.created_by IS 'Who created the policy';

-- Create indices for faster lookups
CREATE INDEX IF NOT EXISTS idx_retention_policies_enabled ON retention.policies (enabled);
CREATE INDEX IF NOT EXISTS idx_retention_policies_last_run ON retention.policies (last_run);

-- Create table to store retention job history
CREATE TABLE IF NOT EXISTS retention.job_history (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    policy_id UUID NOT NULL REFERENCES retention.policies(id) ON DELETE CASCADE,
    start_time TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    end_time TIMESTAMPTZ,
    rows_processed INTEGER NOT NULL DEFAULT 0,
    rows_deleted INTEGER NOT NULL DEFAULT 0,
    rows_archived INTEGER NOT NULL DEFAULT 0,
    status TEXT NOT NULL DEFAULT 'running' CHECK (status IN ('running', 'completed', 'failed')),
    error TEXT,
    metadata JSONB
);

-- Add comments for documentation
COMMENT ON TABLE retention.job_history IS 'History of executed retention jobs';
COMMENT ON COLUMN retention.job_history.id IS 'Primary key for the job history entry';
COMMENT ON COLUMN retention.job_history.policy_id IS 'ID of the retention policy that was executed';
COMMENT ON COLUMN retention.job_history.start_time IS 'When the job started';
COMMENT ON COLUMN retention.job_history.end_time IS 'When the job ended';
COMMENT ON COLUMN retention.job_history.rows_processed IS 'How many rows were processed';
COMMENT ON COLUMN retention.job_history.rows_deleted IS 'How many rows were deleted';
COMMENT ON COLUMN retention.job_history.rows_archived IS 'How many rows were archived';
COMMENT ON COLUMN retention.job_history.status IS 'Status of the job';
COMMENT ON COLUMN retention.job_history.error IS 'Error message if the job failed';
COMMENT ON COLUMN retention.job_history.metadata IS 'Additional metadata about the job';

-- Create indices for faster lookups
CREATE INDEX IF NOT EXISTS idx_job_history_policy_id ON retention.job_history (policy_id);
CREATE INDEX IF NOT EXISTS idx_job_history_start_time ON retention.job_history (start_time);
CREATE INDEX IF NOT EXISTS idx_job_history_status ON retention.job_history (status);

-- Function to apply a retention policy
CREATE OR REPLACE FUNCTION retention.apply_policy(
    p_policy_id UUID
)
RETURNS UUID AS $$
DECLARE
    v_policy RECORD;
    v_cutoff_timestamp TIMESTAMPTZ;
    v_query TEXT;
    v_archive_query TEXT;
    v_job_id UUID;
    v_rows_processed INTEGER := 0;
    v_rows_deleted INTEGER := 0;
    v_rows_archived INTEGER := 0;
    v_start_time TIMESTAMPTZ;
    v_end_time TIMESTAMPTZ;
    v_error TEXT;
BEGIN
    -- Get the policy details
    SELECT * INTO v_policy
    FROM retention.policies
    WHERE id = p_policy_id AND enabled = TRUE;
    
    IF NOT FOUND THEN
        RAISE EXCEPTION 'Policy not found or not enabled: %', p_policy_id;
    END IF;
    
    -- Calculate the cutoff timestamp
    v_cutoff_timestamp := NOW() - v_policy.retention_period;
    
    -- Create a job history record
    v_start_time := NOW();
    INSERT INTO retention.job_history (policy_id, start_time)
    VALUES (p_policy_id, v_start_time)
    RETURNING id INTO v_job_id;
    
    BEGIN
        -- Archive records if configured
        IF v_policy.archive_before_delete AND 
           v_policy.archive_schema IS NOT NULL AND 
           v_policy.archive_table IS NOT NULL THEN
            
            -- Build archive query
            v_archive_query := format(
                'INSERT INTO %I.%I 
                SELECT * FROM %I.%I 
                WHERE %I < $1 
                LIMIT $2',
                v_policy.archive_schema,
                v_policy.archive_table,
                v_policy.schema_name,
                v_policy.table_name,
                v_policy.timestamp_column
            );
            
            -- Execute archive
            EXECUTE v_archive_query 
            USING v_cutoff_timestamp, v_policy.delete_batch_size;
            
            -- Get rows archived
            GET DIAGNOSTICS v_rows_archived = ROW_COUNT;
            v_rows_processed := v_rows_processed + v_rows_archived;
        END IF;
        
        -- Build delete query
        v_query := format(
            'DELETE FROM %I.%I 
            WHERE %I < $1 
            LIMIT $2',
            v_policy.schema_name,
            v_policy.table_name,
            v_policy.timestamp_column
        );
        
        -- Execute delete
        EXECUTE v_query 
        USING v_cutoff_timestamp, v_policy.delete_batch_size;
        
        -- Get rows deleted
        GET DIAGNOSTICS v_rows_deleted = ROW_COUNT;
        v_rows_processed := v_rows_processed + v_rows_deleted;
        
        -- Update policy last_run
        UPDATE retention.policies
        SET last_run = NOW()
        WHERE id = p_policy_id;
        
        -- Update job history to completed
        v_end_time := NOW();
        UPDATE retention.job_history
        SET 
            end_time = v_end_time,
            rows_processed = v_rows_processed,
            rows_deleted = v_rows_deleted,
            rows_archived = v_rows_archived,
            status = 'completed'
        WHERE id = v_job_id;
        
    EXCEPTION WHEN OTHERS THEN
        -- Handle error
        v_error := SQLERRM;
        
        -- Update job history with error
        v_end_time := NOW();
        UPDATE retention.job_history
        SET 
            end_time = v_end_time,
            rows_processed = v_rows_processed,
            rows_deleted = v_rows_deleted,
            rows_archived = v_rows_archived,
            status = 'failed',
            error = v_error
        WHERE id = v_job_id;
        
        -- Re-raise the exception
        RAISE;
    END;
    
    RETURN v_job_id;
END;
$$ LANGUAGE plpgsql;

COMMENT ON FUNCTION retention.apply_policy IS 'Applies a data retention policy and returns the job ID';

-- Function to run all due retention policies
CREATE OR REPLACE FUNCTION retention.run_all_policies()
RETURNS SETOF UUID AS $$
DECLARE
    v_policy_id UUID;
    v_job_id UUID;
BEGIN
    -- Loop through all policies that are enabled and due to run
    FOR v_policy_id IN
        SELECT id FROM retention.policies
        WHERE enabled = TRUE
        AND (last_run IS NULL OR last_run < (NOW() - INTERVAL '1 day'))
        ORDER BY last_run NULLS FIRST
    LOOP
        -- Run policy and return job ID
        v_job_id := retention.apply_policy(v_policy_id);
        RETURN NEXT v_job_id;
    END LOOP;
    
    RETURN;
END;
$$ LANGUAGE plpgsql;

COMMENT ON FUNCTION retention.run_all_policies IS 'Runs all due retention policies and returns the job IDs';

-- Add RLS policies
ALTER TABLE retention.policies ENABLE ROW LEVEL SECURITY;
ALTER TABLE retention.job_history ENABLE ROW LEVEL SECURITY;

-- Service role can do everything with retention policies
CREATE POLICY "Service role can manage retention policies" ON retention.policies
FOR ALL USING (true);

-- Service role can do everything with job history
CREATE POLICY "Service role can manage job history" ON retention.job_history
FOR ALL USING (true);

-- Part 2: Database Sharding Infrastructure

-- Create schema for sharding management
CREATE SCHEMA IF NOT EXISTS sharding;

-- Create table to store shard configuration
CREATE TABLE IF NOT EXISTS sharding.config (
    id SERIAL PRIMARY KEY,
    shard_count INTEGER NOT NULL DEFAULT 4,
    shard_method TEXT NOT NULL DEFAULT 'hash_mod',
    enabled BOOLEAN NOT NULL DEFAULT FALSE,
    config_version INTEGER NOT NULL DEFAULT 1,
    last_updated TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_by TEXT NOT NULL DEFAULT CURRENT_USER
);

-- Add comments for documentation
COMMENT ON TABLE sharding.config IS 'Global configuration for database sharding';
COMMENT ON COLUMN sharding.config.id IS 'Primary key for the shard configuration';
COMMENT ON COLUMN sharding.config.shard_count IS 'Number of active shards';
COMMENT ON COLUMN sharding.config.shard_method IS 'Method used for sharding (hash_mod, range, etc.)';
COMMENT ON COLUMN sharding.config.enabled IS 'Whether sharding is enabled globally';
COMMENT ON COLUMN sharding.config.config_version IS 'Version of the shard configuration for tracking changes';
COMMENT ON COLUMN sharding.config.last_updated IS 'When the configuration was last updated';
COMMENT ON COLUMN sharding.config.updated_by IS 'Who last updated the configuration';

-- Create table to store shard definitions
CREATE TABLE IF NOT EXISTS sharding.shards (
    id SERIAL PRIMARY KEY,
    shard_key TEXT NOT NULL,
    connection_string TEXT NOT NULL,
    is_primary BOOLEAN NOT NULL DEFAULT FALSE,
    is_replica BOOLEAN NOT NULL DEFAULT FALSE,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    weight INTEGER NOT NULL DEFAULT 100,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    created_by TEXT NOT NULL DEFAULT CURRENT_USER,
    last_health_check TIMESTAMPTZ,
    health_status TEXT,
    CONSTRAINT unique_shard_key UNIQUE (shard_key)
);

-- Add comments for documentation
COMMENT ON TABLE sharding.shards IS 'Definition of database shards';
COMMENT ON COLUMN sharding.shards.id IS 'Primary key for the shard';
COMMENT ON COLUMN sharding.shards.shard_key IS 'Unique identifier for the shard';
COMMENT ON COLUMN sharding.shards.connection_string IS 'Connection string for the shard (encrypted)';
COMMENT ON COLUMN sharding.shards.is_primary IS 'Whether this is a primary/write shard';
COMMENT ON COLUMN sharding.shards.is_replica IS 'Whether this is a replica/read-only shard';
COMMENT ON COLUMN sharding.shards.is_active IS 'Whether the shard is active';
COMMENT ON COLUMN sharding.shards.weight IS 'Relative weight for distributing reads (higher = more traffic)';
COMMENT ON COLUMN sharding.shards.created_at IS 'When the shard was added';
COMMENT ON COLUMN sharding.shards.created_by IS 'Who added the shard';
COMMENT ON COLUMN sharding.shards.last_health_check IS 'When the shard was last health-checked';
COMMENT ON COLUMN sharding.shards.health_status IS 'Current health status of the shard';

-- Create table to store shard mapping for entities
CREATE TABLE IF NOT EXISTS sharding.entity_types (
    id SERIAL PRIMARY KEY,
    entity_type TEXT NOT NULL UNIQUE,
    table_name TEXT NOT NULL,
    id_column TEXT NOT NULL DEFAULT 'id',
    shard_key_column TEXT,
    shard_method TEXT NOT NULL DEFAULT 'hash_mod',
    is_sharded BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    created_by TEXT NOT NULL DEFAULT CURRENT_USER
);

-- Add comments for documentation
COMMENT ON TABLE sharding.entity_types IS 'Entity types that can be sharded';
COMMENT ON COLUMN sharding.entity_types.id IS 'Primary key for the entity type';
COMMENT ON COLUMN sharding.entity_types.entity_type IS 'Type of entity (e.g., user, document)';
COMMENT ON COLUMN sharding.entity_types.table_name IS 'Name of the table for this entity type';
COMMENT ON COLUMN sharding.entity_types.id_column IS 'Column name for the primary key';
COMMENT ON COLUMN sharding.entity_types.shard_key_column IS 'Column to use as the shard key (NULL for entity_id)';
COMMENT ON COLUMN sharding.entity_types.shard_method IS 'Method used for sharding this entity type';
COMMENT ON COLUMN sharding.entity_types.is_sharded IS 'Whether this entity type is sharded';
COMMENT ON COLUMN sharding.entity_types.created_at IS 'When the entity type was added';
COMMENT ON COLUMN sharding.entity_types.created_by IS 'Who added the entity type';

-- Create table to store entity-to-shard mappings
CREATE TABLE IF NOT EXISTS sharding.mappings (
    id SERIAL PRIMARY KEY,
    entity_type TEXT NOT NULL,
    entity_id TEXT NOT NULL,
    shard_key TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    CONSTRAINT fk_entity_type FOREIGN KEY (entity_type) REFERENCES sharding.entity_types(entity_type),
    CONSTRAINT fk_shard_key FOREIGN KEY (shard_key) REFERENCES sharding.shards(shard_key),
    CONSTRAINT unique_entity UNIQUE (entity_type, entity_id)
);

-- Add comments for documentation
COMMENT ON TABLE sharding.mappings IS 'Mapping of entities to shards';
COMMENT ON COLUMN sharding.mappings.id IS 'Primary key for the mapping';
COMMENT ON COLUMN sharding.mappings.entity_type IS 'Type of entity (e.g., user, document)';
COMMENT ON COLUMN sharding.mappings.entity_id IS 'ID of the entity';
COMMENT ON COLUMN sharding.mappings.shard_key IS 'Key of the shard containing this entity';
COMMENT ON COLUMN sharding.mappings.created_at IS 'When the mapping was created';

-- Create indices for faster lookups
CREATE INDEX IF NOT EXISTS idx_mappings_entity_type_id ON sharding.mappings (entity_type, entity_id);
CREATE INDEX IF NOT EXISTS idx_mappings_shard_key ON sharding.mappings (shard_key);
CREATE INDEX IF NOT EXISTS idx_shards_is_active ON sharding.shards (is_active);
CREATE INDEX IF NOT EXISTS idx_entity_types_is_sharded ON sharding.entity_types (is_sharded);

-- Function to determine shard for a new entity
CREATE OR REPLACE FUNCTION sharding.get_shard_for_entity(
    p_entity_type TEXT,
    p_entity_id TEXT
)
RETURNS TEXT AS $$
DECLARE
    v_shard_key TEXT;
    v_shard_method TEXT;
    v_shard_count INTEGER;
    v_sharding_enabled BOOLEAN;
    v_entity_is_sharded BOOLEAN;
    v_hash INTEGER;
    v_shard_index INTEGER;
BEGIN
    -- First check if the entity already has a mapping
    SELECT shard_key INTO v_shard_key
    FROM sharding.mappings
    WHERE entity_type = p_entity_type AND entity_id = p_entity_id;
    
    -- If mapping exists, return it
    IF v_shard_key IS NOT NULL THEN
        RETURN v_shard_key;
    END IF;
    
    -- Check if sharding is enabled globally
    SELECT enabled INTO v_sharding_enabled
    FROM sharding.config
    LIMIT 1;
    
    IF NOT v_sharding_enabled THEN
        -- If sharding is disabled, return the default shard
        SELECT shard_key INTO v_shard_key
        FROM sharding.shards
        WHERE is_primary = TRUE AND is_active = TRUE
        ORDER BY id
        LIMIT 1;
        
        RETURN v_shard_key;
    END IF;
    
    -- Check if this entity type is sharded
    SELECT is_sharded, shard_method INTO v_entity_is_sharded, v_shard_method
    FROM sharding.entity_types
    WHERE entity_type = p_entity_type;
    
    IF NOT v_entity_is_sharded THEN
        -- If entity type is not sharded, return the default shard
        SELECT shard_key INTO v_shard_key
        FROM sharding.shards
        WHERE is_primary = TRUE AND is_active = TRUE
        ORDER BY id
        LIMIT 1;
        
        RETURN v_shard_key;
    END IF;
    
    -- Get the shard count
    SELECT shard_count INTO v_shard_count
    FROM sharding.config
    LIMIT 1;
    
    -- Calculate shard based on method
    IF v_shard_method = 'hash_mod' THEN
        -- Calculate hash of entity ID
        v_hash := abs(('x' || md5(p_entity_id))::bit(32)::int);
        
        -- Calculate shard index
        v_shard_index := v_hash % v_shard_count;
        
        -- Get the shard key for this index
        SELECT shard_key INTO v_shard_key
        FROM sharding.shards
        WHERE is_primary = TRUE AND is_active = TRUE
        ORDER BY id
        LIMIT 1 OFFSET v_shard_index;
        
    ELSIF v_shard_method = 'range' THEN
        -- Range-based sharding would be implemented here
        -- For now, return the default shard
        SELECT shard_key INTO v_shard_key
        FROM sharding.shards
        WHERE is_primary = TRUE AND is_active = TRUE
        ORDER BY id
        LIMIT 1;
    ELSE
        -- Unknown method, return default shard
        SELECT shard_key INTO v_shard_key
        FROM sharding.shards
        WHERE is_primary = TRUE AND is_active = TRUE
        ORDER BY id
        LIMIT 1;
    END IF;
    
    -- Create mapping for future lookups
    INSERT INTO sharding.mappings (entity_type, entity_id, shard_key)
    VALUES (p_entity_type, p_entity_id, v_shard_key);
    
    RETURN v_shard_key;
END;
$$ LANGUAGE plpgsql;

COMMENT ON FUNCTION sharding.get_shard_for_entity IS 'Determines the shard for a given entity, creating a mapping if needed';

-- Function to get the connection string for an entity
CREATE OR REPLACE FUNCTION sharding.get_connection_for_entity(
    p_entity_type TEXT,
    p_entity_id TEXT,
    p_for_write BOOLEAN DEFAULT TRUE
)
RETURNS TEXT AS $$
DECLARE
    v_shard_key TEXT;
    v_connection_string TEXT;
BEGIN
    -- Get the shard key for this entity
    v_shard_key := sharding.get_shard_for_entity(p_entity_type, p_entity_id);
    
    -- Get the connection string
    IF p_for_write THEN
        -- For writes, always use the primary
        SELECT connection_string INTO v_connection_string
        FROM sharding.shards
        WHERE shard_key = v_shard_key
          AND is_primary = TRUE
          AND is_active = TRUE;
    ELSE
        -- For reads, can use replica if available
        SELECT connection_string INTO v_connection_string
        FROM sharding.shards
        WHERE shard_key = v_shard_key
          AND is_active = TRUE
          AND (is_replica = TRUE OR is_primary = TRUE)
        ORDER BY weight DESC, is_primary DESC
        LIMIT 1;
    END IF;
    
    RETURN v_connection_string;
END;
$$ LANGUAGE plpgsql;

COMMENT ON FUNCTION sharding.get_connection_for_entity IS 'Gets the connection string for a given entity based on its shard';

-- Add RLS policies to sharding tables
ALTER TABLE sharding.config ENABLE ROW LEVEL SECURITY;
ALTER TABLE sharding.shards ENABLE ROW LEVEL SECURITY;
ALTER TABLE sharding.entity_types ENABLE ROW LEVEL SECURITY;
ALTER TABLE sharding.mappings ENABLE ROW LEVEL SECURITY;

-- Service role can do everything with sharding tables
CREATE POLICY "Service role can manage sharding config" ON sharding.config FOR ALL USING (true);
CREATE POLICY "Service role can manage shards" ON sharding.shards FOR ALL USING (true);
CREATE POLICY "Service role can manage entity types" ON sharding.entity_types FOR ALL USING (true);
CREATE POLICY "Service role can manage mappings" ON sharding.mappings FOR ALL USING (true); 
