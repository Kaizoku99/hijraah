-- ENVIRONMENT-SPECIFIC CONFIGURATION TEMPLATE
-- Use this template to implement environment-aware code in your migrations

-- ENVIRONMENT DETECTION
-- ==============================================================================
DO $$
DECLARE
    current_env TEXT;
BEGIN
    -- Get the current environment
    current_env := env_config.get_environment();
    
    -- Example: Log the current environment
    RAISE NOTICE 'Current environment: %', current_env;
    
    -- Example: Environment-specific execution path
    CASE current_env
        WHEN 'development' THEN
            -- Development-specific code here
            RAISE NOTICE 'Running development-specific migration logic';
            
            -- Example: More verbose indices in development
            CREATE INDEX IF NOT EXISTS idx_example_dev_only ON some_table(some_column);
            
        WHEN 'testing' THEN
            -- Testing-specific code here
            RAISE NOTICE 'Running testing-specific migration logic';
            
            -- Example: Add test data only in testing environment
            INSERT INTO example_table (name, description)
            VALUES ('Test Item 1', 'For testing only');
            
        WHEN 'staging' THEN
            -- Staging-specific code here
            RAISE NOTICE 'Running staging-specific migration logic';
            
        WHEN 'production' THEN
            -- Production-specific code here
            RAISE NOTICE 'Running production-specific migration logic';
            
            -- Example: Add extra validation in production
            ALTER TABLE example_table ADD CONSTRAINT check_production_only CHECK (name != '');
            
        ELSE
            RAISE NOTICE 'Unknown environment: %', current_env;
    END CASE;
END $$;

-- FEATURE FLAGS
-- ==============================================================================
DO $$
DECLARE
    feature_flags JSONB;
BEGIN
    -- Get feature flags for current environment
    feature_flags := env_config.get_setting('feature_flags');
    
    -- Example: Apply feature flag-dependent changes
    IF feature_flags->>'beta_features' = 'true' THEN
        RAISE NOTICE 'Enabling beta features';
        
        -- Example: Create a beta feature table
        CREATE TABLE IF NOT EXISTS beta_features (
            id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            name TEXT NOT NULL,
            enabled BOOLEAN DEFAULT TRUE
        );
    END IF;
    
    -- Example: Debug mode specific operations
    IF feature_flags->>'debug_mode' = 'true' THEN
        RAISE NOTICE 'Debug mode is enabled - adding extended logging';
        
        -- Example: Create debug logging trigger
        CREATE OR REPLACE FUNCTION log_all_changes()
        RETURNS TRIGGER AS $$
        BEGIN
            INSERT INTO debug_logs (table_name, operation, record_id, data, performed_at)
            VALUES (TG_TABLE_NAME, TG_OP, NEW.id, to_jsonb(NEW), now());
            RETURN NEW;
        END;
        $$ LANGUAGE plpgsql;
    END IF;
END $$;

-- ENVIRONMENT-SPECIFIC SETTINGS
-- ==============================================================================
DO $$
DECLARE
    performance_settings JSONB;
    security_settings JSONB;
BEGIN
    -- Get environment-specific settings
    performance_settings := env_config.get_setting('performance_tuning');
    security_settings := env_config.get_setting('security_settings');
    
    -- Example: Apply performance settings if available
    IF performance_settings IS NOT NULL THEN
        RAISE NOTICE 'Applying performance settings';
        
        -- Apply connection limits or other settings that vary by environment
        -- This would typically be done via set_config() or similar
    END IF;
    
    -- Example: Apply security settings if available
    IF security_settings IS NOT NULL AND security_settings->>'require_ssl' = 'true' THEN
        RAISE NOTICE 'Applying strict security settings';
        
        -- Example: Add security policies for sensitive tables
        ALTER TABLE sensitive_data ENABLE ROW LEVEL SECURITY;
        
        DROP POLICY IF EXISTS sensitive_data_policy ON sensitive_data;
        CREATE POLICY sensitive_data_policy ON sensitive_data
            USING (auth.uid() IS NOT NULL);
    END IF;
END $$;

-- CONFIGURATION MANAGEMENT
-- ==============================================================================
-- Example: Setting a new configuration value
SELECT env_config.set_setting(
    'my_app_setting',  -- Setting key
    jsonb_build_object(
        'enabled', true,
        'max_items', 100,
        'retention_days', 30
    ),  -- Setting value as JSONB
    'My application settings',  -- Description
    NULL  -- Use current environment
);

-- Example: Getting a configuration value with default
DO $$
DECLARE
    app_settings JSONB;
BEGIN
    app_settings := env_config.get_setting(
        'my_app_setting',  -- Setting key
        jsonb_build_object('enabled', false, 'max_items', 10)  -- Default if not found
    );
    
    RAISE NOTICE 'App settings: %', app_settings;
END $$;

-- USAGE NOTES
-- ==============================================================================
-- 1. Always wrap environment-specific code in conditional blocks
-- 2. Use feature flags for gradual rollout of features
-- 3. Provide sensible defaults for all environment-specific settings
-- 4. Document all environment-specific behavior
-- 5. Test migrations in all relevant environments before deployment 