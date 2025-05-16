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
BEGIN;
BEGIN;
BEGIN;
-- Migration: 20240903_1.2.0_extensions_and_features.sql
-- Description: Extensions and advanced features for Hijraah immigration platform
-- Includes pgvector setup, vector search, OCR support, and scheduled jobs

-- Register this migration
DO $$ 
BEGIN
  -- Only run if the migration_meta schema exists
  IF EXISTS (SELECT 1 FROM pg_namespace WHERE nspname = 'migration_meta') THEN
    PERFORM migration_meta.register_migration(
      1, 2, 0,
      'Extensions and advanced features',
      '20240903_1.2.0_extensions_and_features.sql'
    );
  END IF;
END $$;

-- Setup pgvector extension for vector search
CREATE EXTENSION IF NOT EXISTS vector;

-- Create schema for vector operations
CREATE SCHEMA IF NOT EXISTS vector_ops;

-- Create embeddings table for vector search
CREATE TABLE IF NOT EXISTS vector_ops.embeddings (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    content_id UUID NOT NULL,
    content_type TEXT NOT NULL,
    embedding vector(1536),
    metadata JSONB DEFAULT '{}'::JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    indexed_at TIMESTAMPTZ
);

-- Indexing for vector search
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_indexes 
        WHERE tablename = 'embeddings' AND indexname = 'embeddings_content_id_idx'
    ) THEN
        CREATE INDEX embeddings_content_id_idx ON vector_ops.embeddings(content_id);
    END IF;
    
    IF NOT EXISTS (
        SELECT 1 FROM pg_indexes 
        WHERE tablename = 'embeddings' AND indexname = 'embeddings_content_type_idx'
    ) THEN
        CREATE INDEX embeddings_content_type_idx ON vector_ops.embeddings(content_type);
    END IF;
    
    IF NOT EXISTS (
        SELECT 1 FROM pg_indexes 
        WHERE tablename = 'embeddings' AND schemaname = 'vector_ops' AND indexname = 'embeddings_vector_idx'
    ) THEN
        CREATE INDEX embeddings_vector_idx ON vector_ops.embeddings USING ivfflat (embedding vector_cosine_ops)
        WITH (lists = 100);
    END IF;
END $$;

-- Function to perform vector search
CREATE OR REPLACE FUNCTION vector_ops.search_similar(
    query_embedding vector(1536),
    content_type TEXT,
    match_threshold FLOAT DEFAULT 0.8,
    match_count INT DEFAULT 10
) RETURNS TABLE (
    content_id UUID,
    content_type TEXT,
    similarity FLOAT,
    metadata JSONB
) LANGUAGE SQL STABLE AS $$
    SELECT 
        e.content_id,
        e.content_type,
        1 - (e.embedding <=> query_embedding) AS similarity,
        e.metadata
    FROM 
        vector_ops.embeddings e
    WHERE 
        e.content_type = search_similar.content_type
        AND 1 - (e.embedding <=> query_embedding) > match_threshold
    ORDER BY 
        e.embedding <=> query_embedding
    LIMIT 
        match_count;
$$;

COMMENT ON FUNCTION vector_ops.search_similar IS 'Performs semantic search using vector embeddings';

-- Create schema for OCR operations
CREATE SCHEMA IF NOT EXISTS ocr;

-- Create OCR results table
CREATE TABLE IF NOT EXISTS ocr.results (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    document_id UUID NOT NULL REFERENCES documents(id) ON DELETE CASCADE,
    text_content TEXT,
    confidence FLOAT,
    bbox JSONB, -- Bounding box information
    metadata JSONB DEFAULT '{}'::JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create OCR entities table for extracted entities
CREATE TABLE IF NOT EXISTS ocr.entities (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    result_id UUID NOT NULL REFERENCES ocr.results(id) ON DELETE CASCADE,
    entity_type TEXT NOT NULL,
    entity_value TEXT NOT NULL,
    confidence FLOAT,
    bbox JSONB, -- Bounding box information
    metadata JSONB DEFAULT '{}'::JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexing for OCR tables
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_indexes 
        WHERE tablename = 'results' AND schemaname = 'ocr' AND indexname = 'ocr_results_document_id_idx'
    ) THEN
        CREATE INDEX ocr_results_document_id_idx ON ocr.results(document_id);
    END IF;
    
    IF NOT EXISTS (
        SELECT 1 FROM pg_indexes 
        WHERE tablename = 'entities' AND schemaname = 'ocr' AND indexname = 'ocr_entities_result_id_idx'
    ) THEN
        CREATE INDEX ocr_entities_result_id_idx ON ocr.entities(result_id);
    END IF;
    
    IF NOT EXISTS (
        SELECT 1 FROM pg_indexes 
        WHERE tablename = 'entities' AND schemaname = 'ocr' AND indexname = 'ocr_entities_entity_type_idx'
    ) THEN
        CREATE INDEX ocr_entities_entity_type_idx ON ocr.entities(entity_type);
    END IF;
END $$;

-- Create schema for the subscription system
CREATE SCHEMA IF NOT EXISTS subscription;

-- Create subscription plans table
CREATE TABLE IF NOT EXISTS subscription.plans (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    currency TEXT DEFAULT 'USD',
    billing_interval TEXT DEFAULT 'month',
    features JSONB DEFAULT '{}'::JSONB,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create subscriptions table
CREATE TABLE IF NOT EXISTS subscription.subscriptions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    plan_id UUID NOT NULL REFERENCES subscription.plans(id),
    status TEXT NOT NULL CHECK (status IN ('active', 'canceled', 'past_due', 'trialing', 'expired')),
    current_period_start TIMESTAMPTZ NOT NULL,
    current_period_end TIMESTAMPTZ NOT NULL,
    cancel_at_period_end BOOLEAN DEFAULT FALSE,
    payment_provider TEXT,
    payment_provider_id TEXT,
    metadata JSONB DEFAULT '{}'::JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create invoices table
CREATE TABLE IF NOT EXISTS subscription.invoices (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    subscription_id UUID NOT NULL REFERENCES subscription.subscriptions(id) ON DELETE CASCADE,
    amount DECIMAL(10, 2) NOT NULL,
    currency TEXT DEFAULT 'USD',
    status TEXT NOT NULL CHECK (status IN ('draft', 'open', 'paid', 'uncollectible', 'void')),
    invoice_pdf TEXT,
    payment_provider_id TEXT,
    metadata JSONB DEFAULT '{}'::JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexing for subscription tables
DO $$
BEGIN
    -- Plans indexes
    IF NOT EXISTS (
        SELECT 1 FROM pg_indexes 
        WHERE tablename = 'plans' AND schemaname = 'subscription' AND indexname = 'subscription_plans_is_active_idx'
    ) THEN
        CREATE INDEX subscription_plans_is_active_idx ON subscription.plans(is_active);
    END IF;
    
    -- Subscriptions indexes
    IF NOT EXISTS (
        SELECT 1 FROM pg_indexes 
        WHERE tablename = 'subscriptions' AND schemaname = 'subscription' AND indexname = 'subscription_subscriptions_user_id_idx'
    ) THEN
        CREATE INDEX subscription_subscriptions_user_id_idx ON subscription.subscriptions(user_id);
    END IF;
    
    IF NOT EXISTS (
        SELECT 1 FROM pg_indexes 
        WHERE tablename = 'subscriptions' AND schemaname = 'subscription' AND indexname = 'subscription_subscriptions_status_idx'
    ) THEN
        CREATE INDEX subscription_subscriptions_status_idx ON subscription.subscriptions(status);
    END IF;
    
    -- Invoices indexes
    IF NOT EXISTS (
        SELECT 1 FROM pg_indexes 
        WHERE tablename = 'invoices' AND schemaname = 'subscription' AND indexname = 'subscription_invoices_subscription_id_idx'
    ) THEN
        CREATE INDEX subscription_invoices_subscription_id_idx ON subscription.invoices(subscription_id);
    END IF;
    
    IF NOT EXISTS (
        SELECT 1 FROM pg_indexes 
        WHERE tablename = 'invoices' AND schemaname = 'subscription' AND indexname = 'subscription_invoices_status_idx'
    ) THEN
        CREATE INDEX subscription_invoices_status_idx ON subscription.invoices(status);
    END IF;
END $$;

-- Create schema for scheduled jobs
CREATE SCHEMA IF NOT EXISTS jobs;

-- Create scheduled jobs table
CREATE TABLE IF NOT EXISTS jobs.scheduled_jobs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    job_name TEXT NOT NULL,
    job_schedule TEXT NOT NULL, -- cron expression
    job_function TEXT NOT NULL, -- function to execute
    is_active BOOLEAN DEFAULT TRUE,
    last_run_at TIMESTAMPTZ,
    next_run_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create job runs table to track execution history
CREATE TABLE IF NOT EXISTS jobs.job_runs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    job_id UUID NOT NULL REFERENCES jobs.scheduled_jobs(id) ON DELETE CASCADE,
    status TEXT NOT NULL CHECK (status IN ('pending', 'running', 'completed', 'failed')),
    start_time TIMESTAMPTZ DEFAULT NOW(),
    end_time TIMESTAMPTZ,
    duration INTERVAL,
    error_message TEXT,
    result JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Function to update scheduled job next_run_at
CREATE OR REPLACE FUNCTION jobs.update_next_run_at(
    p_job_id UUID
) RETURNS TIMESTAMPTZ AS $$
DECLARE
    v_next_run TIMESTAMPTZ;
    v_schedule TEXT;
BEGIN
    -- Get the job schedule
    SELECT job_schedule INTO v_schedule
    FROM jobs.scheduled_jobs
    WHERE id = p_job_id;
    
    -- Calculate next run time based on cron expression
    -- This is a simplified placeholder
    -- In a real implementation, you'd use a proper cron parser
    v_next_run := NOW() + INTERVAL '1 day';
    
    -- Update the job's next_run_at
    UPDATE jobs.scheduled_jobs
    SET next_run_at = v_next_run, last_run_at = NOW(), updated_at = NOW()
    WHERE id = p_job_id;
    
    RETURN v_next_run;
END;
$$ LANGUAGE plpgsql;

COMMENT ON FUNCTION jobs.update_next_run_at IS 'Updates the next scheduled run time for a job based on its cron expression';

-- Create function to run a scheduled job
CREATE OR REPLACE FUNCTION jobs.run_job(
    p_job_id UUID
) RETURNS UUID AS $$
DECLARE
    v_job_run_id UUID;
    v_job_function TEXT;
    v_result JSONB;
    v_start_time TIMESTAMPTZ;
    v_end_time TIMESTAMPTZ;
BEGIN
    -- Get the job function
    SELECT job_function INTO v_job_function
    FROM jobs.scheduled_jobs
    WHERE id = p_job_id;
    
    -- Create a job run record
    INSERT INTO jobs.job_runs (job_id, status)
    VALUES (p_job_id, 'running')
    RETURNING id INTO v_job_run_id;
    
    -- Record start time
    v_start_time := NOW();
    
    BEGIN
        -- Execute the job function
        EXECUTE v_job_function INTO v_result;
        
        -- Record end time
        v_end_time := NOW();
        
        -- Update job run record with success
        UPDATE jobs.job_runs
        SET status = 'completed',
            end_time = v_end_time,
            duration = v_end_time - v_start_time,
            result = v_result
        WHERE id = v_job_run_id;
        
        -- Update next run time
        PERFORM jobs.update_next_run_at(p_job_id);
        
        RETURN v_job_run_id;
    EXCEPTION WHEN OTHERS THEN
        -- Record end time
        v_end_time := NOW();
        
        -- Update job run record with failure
        UPDATE jobs.job_runs
        SET status = 'failed',
            end_time = v_end_time,
            duration = v_end_time - v_start_time,
            error_message = SQLERRM
        WHERE id = v_job_run_id;
        
        -- Still update next run time
        PERFORM jobs.update_next_run_at(p_job_id);
        
        RETURN v_job_run_id;
    END;
END;
$$ LANGUAGE plpgsql;

COMMENT ON FUNCTION jobs.run_job IS 'Executes a scheduled job and records the run results';

-- Create admin schema and tables
CREATE SCHEMA IF NOT EXISTS admin;

-- Create admin users table
CREATE TABLE IF NOT EXISTS admin.users (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    role TEXT NOT NULL CHECK (role IN ('admin', 'super_admin')),
    is_active BOOLEAN DEFAULT TRUE,
    permissions JSONB DEFAULT '{}'::JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create admin audit logs table
CREATE TABLE IF NOT EXISTS admin.audit_logs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    admin_id UUID REFERENCES admin.users(id) ON DELETE SET NULL,
    action TEXT NOT NULL,
    entity_type TEXT NOT NULL,
    entity_id UUID,
    details JSONB,
    ip_address TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Admin RLS policies
ALTER TABLE admin.users ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Only admins can view admin users" ON admin.users;
CREATE POLICY "Only admins can view admin users" 
    ON admin.users FOR SELECT 
    USING (EXISTS (
        SELECT 1 FROM admin.users
        WHERE id = auth.uid()
    ));

-- Audit logs RLS
ALTER TABLE admin.audit_logs ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Only admins can view audit logs" ON admin.audit_logs;
CREATE POLICY "Only admins can view audit logs" 
    ON admin.audit_logs FOR SELECT 
    USING (EXISTS (
        SELECT 1 FROM admin.users
        WHERE id = auth.uid()
    ));

-- Function to create admin audit log
CREATE OR REPLACE FUNCTION admin.create_audit_log(
    p_action TEXT,
    p_entity_type TEXT,
    p_entity_id UUID,
    p_details JSONB DEFAULT NULL
) RETURNS UUID AS $$
DECLARE
    v_log_id UUID;
    v_ip_address TEXT;
BEGIN
    -- Get the client IP address
    v_ip_address := COALESCE(current_setting('request.headers', true)::json->>'x-forwarded-for', 'unknown');
    
    -- Create the audit log
    INSERT INTO admin.audit_logs (admin_id, action, entity_type, entity_id, details, ip_address)
    VALUES (auth.uid(), p_action, p_entity_type, p_entity_id, p_details, v_ip_address)
    RETURNING id INTO v_log_id;
    
    RETURN v_log_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

COMMENT ON FUNCTION admin.create_audit_log IS 'Creates an audit log entry for admin actions'; 
