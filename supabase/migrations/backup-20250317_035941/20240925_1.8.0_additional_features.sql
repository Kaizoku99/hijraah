-- 20240925_1.8.0_additional_features.sql
-- Migration file to add missing features from the original migrations
-- This includes: Agents System, Fine-tuning System, Security Enhancements,
-- Rate Limiting, Observability, and Personalization

-- Begin transaction for atomicity
BEGIN;

-- =============================================
-- 0. UTILITY FUNCTIONS - Define functions first before use
-- =============================================

-- Create function to check if a user is an admin (must be defined BEFORE it's used in policies)
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
DECLARE
    is_admin_user BOOLEAN;
BEGIN
    -- Check if the current user has admin privileges
    SELECT p.is_admin INTO is_admin_user
    FROM public.profiles p
    WHERE p.id = auth.uid();
    
    -- Return false if no profile found or not admin
    RETURN COALESCE(is_admin_user, false);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

COMMENT ON FUNCTION public.is_admin() IS 'Checks if the current user has admin privileges';

-- Ensure the profiles table has an is_admin column
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM pg_tables WHERE schemaname = 'public' AND tablename = 'profiles') THEN
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                       WHERE table_schema = 'public' 
                       AND table_name = 'profiles' 
                       AND column_name = 'is_admin') THEN
            ALTER TABLE public.profiles ADD COLUMN is_admin BOOLEAN DEFAULT FALSE;
        END IF;
    END IF;
END $$;

-- =============================================
-- 1. AGENTS SYSTEM
-- =============================================

-- Create tables for the agents system
CREATE TABLE IF NOT EXISTS public.agents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    description TEXT,
    capabilities JSONB DEFAULT '{}',
    configuration JSONB DEFAULT '{}',
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.agent_executions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    agent_id UUID NOT NULL REFERENCES public.agents(id) ON DELETE CASCADE,
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    status TEXT NOT NULL CHECK (status IN ('queued', 'running', 'completed', 'failed')),
    input JSONB NOT NULL,
    output JSONB,
    metadata JSONB DEFAULT '{}',
    started_at TIMESTAMPTZ,
    completed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT now(),
    error TEXT
);

CREATE TABLE IF NOT EXISTS public.agent_memory (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    agent_id UUID NOT NULL REFERENCES public.agents(id) ON DELETE CASCADE,
    execution_id UUID REFERENCES public.agent_executions(id) ON DELETE CASCADE,
    key TEXT NOT NULL,
    value JSONB NOT NULL,
    ttl TIMESTAMPTZ, -- Time to live (NULL means never expires)
    created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.agent_feedback (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    execution_id UUID NOT NULL REFERENCES public.agent_executions(id) ON DELETE CASCADE,
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    feedback TEXT,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Create indexes for the agents system
CREATE INDEX IF NOT EXISTS idx_agent_executions_agent_id ON public.agent_executions(agent_id);
CREATE INDEX IF NOT EXISTS idx_agent_executions_user_id ON public.agent_executions(user_id);
CREATE INDEX IF NOT EXISTS idx_agent_executions_status ON public.agent_executions(status);
CREATE INDEX IF NOT EXISTS idx_agent_memory_agent_id ON public.agent_memory(agent_id);
CREATE INDEX IF NOT EXISTS idx_agent_memory_execution_id ON public.agent_memory(execution_id);
CREATE INDEX IF NOT EXISTS idx_agent_memory_key ON public.agent_memory(key);
CREATE INDEX IF NOT EXISTS idx_agent_feedback_execution_id ON public.agent_feedback(execution_id);

-- RLS policies for the agents system
ALTER TABLE public.agents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.agent_executions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.agent_memory ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.agent_feedback ENABLE ROW LEVEL SECURITY;

-- Agents can be viewed by any authenticated user
DROP POLICY IF EXISTS "Agents are viewable by authenticated users" ON public.agents;
CREATE POLICY "Agents are viewable by authenticated users" 
ON public.agents FOR SELECT 
TO authenticated 
USING (true);

-- Agent executions can only be viewed by the user who created them or admins
DROP POLICY IF EXISTS "Users can view their own agent executions" ON public.agent_executions;
CREATE POLICY "Users can view their own agent executions" 
ON public.agent_executions FOR SELECT 
TO authenticated 
USING (user_id = auth.uid() OR public.is_admin());

-- Agent memory can only be accessed by the user who created the execution or admins
DROP POLICY IF EXISTS "Users can access their own agent memory" ON public.agent_memory;
CREATE POLICY "Users can access their own agent memory" 
ON public.agent_memory FOR SELECT 
TO authenticated 
USING (
    EXISTS (
        SELECT 1 FROM public.agent_executions 
        WHERE agent_executions.id = agent_memory.execution_id 
        AND (agent_executions.user_id = auth.uid() OR public.is_admin())
    )
);

-- Agent feedback can be viewed by the user who provided it or admins
DROP POLICY IF EXISTS "Users can view their own feedback" ON public.agent_feedback;
CREATE POLICY "Users can view their own feedback" 
ON public.agent_feedback FOR SELECT 
TO authenticated 
USING (user_id = auth.uid() OR public.is_admin());

-- Users can create agent executions
DROP POLICY IF EXISTS "Users can create agent executions" ON public.agent_executions;
CREATE POLICY "Users can create agent executions" 
ON public.agent_executions FOR INSERT 
TO authenticated 
WITH CHECK (user_id = auth.uid());

-- Users can provide feedback on their own executions
DROP POLICY IF EXISTS "Users can provide feedback on their executions" ON public.agent_feedback;
CREATE POLICY "Users can provide feedback on their executions" 
ON public.agent_feedback FOR INSERT 
TO authenticated 
WITH CHECK (
    EXISTS (
        SELECT 1 FROM public.agent_executions 
        WHERE agent_executions.id = agent_feedback.execution_id 
        AND agent_executions.user_id = auth.uid()
    )
);

-- =============================================
-- 2. FINE-TUNING SYSTEM
-- =============================================

-- Create tables for AI fine-tuning
CREATE TABLE IF NOT EXISTS public.ai_feedback (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    prompt TEXT NOT NULL,
    completion TEXT NOT NULL,
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    improvement_suggestion TEXT,
    category TEXT,
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.fine_tuning_jobs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    base_model TEXT NOT NULL,
    model_name TEXT NOT NULL,
    training_file_id TEXT,
    validation_file_id TEXT,
    hyper_parameters JSONB DEFAULT '{}',
    status TEXT NOT NULL CHECK (status IN ('pending', 'running', 'succeeded', 'failed', 'cancelled')),
    result JSONB,
    error_message TEXT,
    created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now(),
    finished_at TIMESTAMPTZ
);

-- Create indexes for AI fine-tuning
CREATE INDEX IF NOT EXISTS idx_ai_feedback_user_id ON public.ai_feedback(user_id);
CREATE INDEX IF NOT EXISTS idx_ai_feedback_rating ON public.ai_feedback(rating);
CREATE INDEX IF NOT EXISTS idx_ai_feedback_category ON public.ai_feedback(category);
CREATE INDEX IF NOT EXISTS idx_fine_tuning_jobs_status ON public.fine_tuning_jobs(status);
CREATE INDEX IF NOT EXISTS idx_fine_tuning_jobs_created_by ON public.fine_tuning_jobs(created_by);

-- RLS policies for AI fine-tuning
ALTER TABLE public.ai_feedback ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.fine_tuning_jobs ENABLE ROW LEVEL SECURITY;

-- AI feedback can be viewed by admins
CREATE POLICY "AI feedback viewable by admins" 
ON public.ai_feedback FOR SELECT 
TO authenticated 
USING (
    EXISTS (
        SELECT 1 FROM public.profiles 
        WHERE id = auth.uid() AND is_admin = true
    )
);

-- Users can create AI feedback
CREATE POLICY "Users can create AI feedback" 
ON public.ai_feedback FOR INSERT 
TO authenticated 
WITH CHECK (user_id = auth.uid());

-- Users can view their own AI feedback
CREATE POLICY "Users can view their own AI feedback" 
ON public.ai_feedback FOR SELECT 
TO authenticated 
USING (user_id = auth.uid());

-- Fine-tuning jobs can be viewed by admins
CREATE POLICY "Fine-tuning jobs viewable by admins" 
ON public.fine_tuning_jobs FOR SELECT 
TO authenticated 
USING (
    EXISTS (
        SELECT 1 FROM public.profiles 
        WHERE id = auth.uid() AND is_admin = true
    )
);

-- Fine-tuning jobs can be created by admins
CREATE POLICY "Fine-tuning jobs can be created by admins" 
ON public.fine_tuning_jobs FOR INSERT 
TO authenticated 
WITH CHECK (
    EXISTS (
        SELECT 1 FROM public.profiles 
        WHERE id = auth.uid() AND is_admin = true
    )
);

-- =============================================
-- 3. SECURITY ENHANCEMENTS
-- =============================================

-- Create security schema
CREATE SCHEMA IF NOT EXISTS security;

-- Authentication and authorization functions
CREATE OR REPLACE FUNCTION security.is_authenticated()
RETURNS BOOLEAN AS $$
BEGIN
    RETURN auth.uid() IS NOT NULL;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION security.can_access_document(document_id UUID)
RETURNS BOOLEAN AS $$
DECLARE
    document_owner UUID;
    is_shared BOOLEAN;
BEGIN
    -- Get the document owner
    SELECT user_id, shared_publicly INTO document_owner, is_shared
    FROM public.documents
    WHERE id = document_id;
    
    -- Allow access if user is the owner, document is shared, or user is an admin
    RETURN 
        document_owner = auth.uid() 
        OR is_shared = true 
        OR EXISTS (
            SELECT 1 FROM public.profiles 
            WHERE id = auth.uid() AND is_admin = true
        );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION security.can_access_case(case_id UUID)
RETURNS BOOLEAN AS $$
DECLARE
    case_owner UUID;
    assigned_to UUID[];
BEGIN
    -- Get the case details
    SELECT 
        created_by,
        ARRAY(
            SELECT assignee_id 
            FROM public.case_assignments 
            WHERE case_id = $1
        )
    INTO case_owner, assigned_to
    FROM public.cases
    WHERE id = case_id;
    
    -- Allow access if user is the owner, is assigned to the case, or is an admin
    RETURN 
        case_owner = auth.uid() 
        OR auth.uid() = ANY(assigned_to)
        OR EXISTS (
            SELECT 1 FROM public.profiles 
            WHERE id = auth.uid() AND is_admin = true
        );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Security audit log
CREATE TABLE IF NOT EXISTS security.audit_log (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID,
    action TEXT NOT NULL,
    resource_type TEXT NOT NULL,
    resource_id TEXT,
    details JSONB,
    ip_address TEXT,
    user_agent TEXT,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Create index for audit log
CREATE INDEX IF NOT EXISTS idx_audit_log_user_id ON security.audit_log(user_id);
CREATE INDEX IF NOT EXISTS idx_audit_log_action ON security.audit_log(action);
CREATE INDEX IF NOT EXISTS idx_audit_log_resource_type ON security.audit_log(resource_type);
CREATE INDEX IF NOT EXISTS idx_audit_log_created_at ON security.audit_log(created_at);

-- Security audit trigger function
CREATE OR REPLACE FUNCTION security.audit_log_changes()
RETURNS TRIGGER AS $$
DECLARE
    audit_data JSONB;
    resource_type TEXT;
BEGIN
    resource_type := TG_TABLE_SCHEMA || '.' || TG_TABLE_NAME;
    
    IF (TG_OP = 'DELETE') THEN
        audit_data := to_jsonb(OLD);
        INSERT INTO security.audit_log (user_id, action, resource_type, resource_id, details)
        VALUES (auth.uid(), 'DELETE', resource_type, OLD.id::TEXT, audit_data);
        RETURN OLD;
    ELSIF (TG_OP = 'UPDATE') THEN
        audit_data := jsonb_build_object(
            'old', to_jsonb(OLD),
            'new', to_jsonb(NEW),
            'changed', (SELECT jsonb_object_agg(key, value) FROM jsonb_each(to_jsonb(NEW)) 
                      WHERE to_jsonb(NEW) -> key <> to_jsonb(OLD) -> key)
        );
        INSERT INTO security.audit_log (user_id, action, resource_type, resource_id, details)
        VALUES (auth.uid(), 'UPDATE', resource_type, NEW.id::TEXT, audit_data);
        RETURN NEW;
    ELSIF (TG_OP = 'INSERT') THEN
        audit_data := to_jsonb(NEW);
        INSERT INTO security.audit_log (user_id, action, resource_type, resource_id, details)
        VALUES (auth.uid(), 'INSERT', resource_type, NEW.id::TEXT, audit_data);
        RETURN NEW;
    END IF;
    RETURN NULL;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =============================================
-- 4. RATE LIMITING
-- =============================================

-- Create rate limiting schema
CREATE SCHEMA IF NOT EXISTS rate_limiting;

-- Rate limit configuration
CREATE TABLE IF NOT EXISTS rate_limiting.rate_limits (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    resource TEXT NOT NULL, -- API endpoint or resource being limited
    limit_per_minute INTEGER NOT NULL, -- Number of requests allowed per minute
    limit_per_hour INTEGER NOT NULL, -- Number of requests allowed per hour
    limit_per_day INTEGER NOT NULL, -- Number of requests allowed per day
    scope TEXT NOT NULL CHECK (scope IN ('global', 'ip', 'user')), -- What level the rate limit applies to
    bypass_roles TEXT[] DEFAULT '{}', -- Roles that can bypass this rate limit
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now(),
    UNIQUE(resource, scope)
);

-- Request tracking
CREATE TABLE IF NOT EXISTS rate_limiting.requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID, -- NULL for unauthenticated requests
    ip_address TEXT,
    resource TEXT NOT NULL,
    timestamp TIMESTAMPTZ DEFAULT now()
);

-- Create indexes for rate limiting
CREATE INDEX IF NOT EXISTS idx_rate_limiting_requests_user_id ON rate_limiting.requests(user_id);
CREATE INDEX IF NOT EXISTS idx_rate_limiting_requests_ip_address ON rate_limiting.requests(ip_address);
CREATE INDEX IF NOT EXISTS idx_rate_limiting_requests_resource ON rate_limiting.requests(resource);
CREATE INDEX IF NOT EXISTS idx_rate_limiting_requests_timestamp ON rate_limiting.requests(timestamp);
CREATE INDEX IF NOT EXISTS idx_rate_limits_resource ON rate_limiting.rate_limits(resource);

-- Rate limiting functions
CREATE OR REPLACE FUNCTION rate_limiting.check_rate_limit(
    p_resource TEXT,
    p_user_id UUID DEFAULT NULL,
    p_ip_address TEXT DEFAULT NULL
) RETURNS BOOLEAN AS $$
DECLARE
    v_limit_per_minute INTEGER;
    v_limit_per_hour INTEGER;
    v_limit_per_day INTEGER;
    v_scope TEXT;
    v_bypass_roles TEXT[];
    v_count_minute INTEGER;
    v_count_hour INTEGER;
    v_count_day INTEGER;
    v_user_role TEXT;
BEGIN
    -- Get rate limit configuration for this resource
    SELECT 
        limit_per_minute, 
        limit_per_hour, 
        limit_per_day, 
        scope,
        bypass_roles
    INTO 
        v_limit_per_minute, 
        v_limit_per_hour, 
        v_limit_per_day, 
        v_scope,
        v_bypass_roles
    FROM rate_limiting.rate_limits
    WHERE resource = p_resource
    LIMIT 1;
    
    -- If no rate limit is configured, allow the request
    IF v_limit_per_minute IS NULL THEN
        RETURN TRUE;
    END IF;
    
    -- Check for role bypass
    IF p_user_id IS NOT NULL THEN
        SELECT role INTO v_user_role FROM auth.users WHERE id = p_user_id;
        IF v_user_role = ANY(v_bypass_roles) THEN
            RETURN TRUE;
        END IF;
    END IF;
    
    -- Check appropriate rate limits based on scope
    CASE v_scope
        WHEN 'user' THEN
            IF p_user_id IS NULL THEN
                RETURN TRUE; -- No user ID provided, so can't apply user-scoped limit
            END IF;
            
            -- Count requests in the last minute
            SELECT COUNT(*) INTO v_count_minute
            FROM rate_limiting.requests
            WHERE 
                resource = p_resource AND
                user_id = p_user_id AND
                timestamp > NOW() - INTERVAL '1 minute';
                
            IF v_count_minute >= v_limit_per_minute THEN
                RETURN FALSE;
            END IF;
            
            -- Count requests in the last hour
            SELECT COUNT(*) INTO v_count_hour
            FROM rate_limiting.requests
            WHERE 
                resource = p_resource AND
                user_id = p_user_id AND
                timestamp > NOW() - INTERVAL '1 hour';
                
            IF v_count_hour >= v_limit_per_hour THEN
                RETURN FALSE;
            END IF;
            
            -- Count requests in the last day
            SELECT COUNT(*) INTO v_count_day
            FROM rate_limiting.requests
            WHERE 
                resource = p_resource AND
                user_id = p_user_id AND
                timestamp > NOW() - INTERVAL '1 day';
                
            IF v_count_day >= v_limit_per_day THEN
                RETURN FALSE;
            END IF;
            
        WHEN 'ip' THEN
            IF p_ip_address IS NULL THEN
                RETURN TRUE; -- No IP address provided, so can't apply IP-scoped limit
            END IF;
            
            -- Count requests in the last minute
            SELECT COUNT(*) INTO v_count_minute
            FROM rate_limiting.requests
            WHERE 
                resource = p_resource AND
                ip_address = p_ip_address AND
                timestamp > NOW() - INTERVAL '1 minute';
                
            IF v_count_minute >= v_limit_per_minute THEN
                RETURN FALSE;
            END IF;
            
            -- Count requests in the last hour
            SELECT COUNT(*) INTO v_count_hour
            FROM rate_limiting.requests
            WHERE 
                resource = p_resource AND
                ip_address = p_ip_address AND
                timestamp > NOW() - INTERVAL '1 hour';
                
            IF v_count_hour >= v_limit_per_hour THEN
                RETURN FALSE;
            END IF;
            
            -- Count requests in the last day
            SELECT COUNT(*) INTO v_count_day
            FROM rate_limiting.requests
            WHERE 
                resource = p_resource AND
                ip_address = p_ip_address AND
                timestamp > NOW() - INTERVAL '1 day';
                
            IF v_count_day >= v_limit_per_day THEN
                RETURN FALSE;
            END IF;
            
        WHEN 'global' THEN
            -- Count requests in the last minute
            SELECT COUNT(*) INTO v_count_minute
            FROM rate_limiting.requests
            WHERE 
                resource = p_resource AND
                timestamp > NOW() - INTERVAL '1 minute';
                
            IF v_count_minute >= v_limit_per_minute THEN
                RETURN FALSE;
            END IF;
            
            -- Count requests in the last hour
            SELECT COUNT(*) INTO v_count_hour
            FROM rate_limiting.requests
            WHERE 
                resource = p_resource AND
                timestamp > NOW() - INTERVAL '1 hour';
                
            IF v_count_hour >= v_limit_per_hour THEN
                RETURN FALSE;
            END IF;
            
            -- Count requests in the last day
            SELECT COUNT(*) INTO v_count_day
            FROM rate_limiting.requests
            WHERE 
                resource = p_resource AND
                timestamp > NOW() - INTERVAL '1 day';
                
            IF v_count_day >= v_limit_per_day THEN
                RETURN FALSE;
            END IF;
    END CASE;
    
    -- If we got here, the request is within rate limits
    RETURN TRUE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Record a request for rate limiting purposes
CREATE OR REPLACE FUNCTION rate_limiting.record_request(
    p_resource TEXT,
    p_user_id UUID DEFAULT NULL,
    p_ip_address TEXT DEFAULT NULL
) RETURNS UUID AS $$
DECLARE
    v_request_id UUID;
BEGIN
    INSERT INTO rate_limiting.requests (user_id, ip_address, resource)
    VALUES (p_user_id, p_ip_address, p_resource)
    RETURNING id INTO v_request_id;
    
    -- Clean up old records (older than 1 day)
    DELETE FROM rate_limiting.requests
    WHERE timestamp < NOW() - INTERVAL '1 day';
    
    RETURN v_request_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =============================================
-- 5. OBSERVABILITY
-- =============================================

-- Create observability schema
CREATE SCHEMA IF NOT EXISTS observability;

-- Logging table
CREATE TABLE IF NOT EXISTS observability.logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    level TEXT NOT NULL CHECK (level IN ('debug', 'info', 'warning', 'error', 'critical')),
    message TEXT NOT NULL,
    context JSONB DEFAULT '{}', -- Additional structured data about the log
    component TEXT, -- Which system component generated the log
    trace_id TEXT, -- For distributed tracing
    user_id UUID, -- Which user was active, if applicable
    session_id TEXT, -- Which session was active, if applicable
    request_id TEXT, -- Which request this log is associated with, if applicable
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Create indexes for logs table
CREATE INDEX IF NOT EXISTS idx_logs_level ON observability.logs(level);
CREATE INDEX IF NOT EXISTS idx_logs_component ON observability.logs(component);
CREATE INDEX IF NOT EXISTS idx_logs_user_id ON observability.logs(user_id);
CREATE INDEX IF NOT EXISTS idx_logs_created_at ON observability.logs(created_at);
CREATE INDEX IF NOT EXISTS idx_logs_trace_id ON observability.logs(trace_id);

-- Metrics table - for storing aggregated performance data
CREATE TABLE IF NOT EXISTS observability.metrics (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    value NUMERIC NOT NULL,
    unit TEXT,
    tags JSONB DEFAULT '{}', -- For adding dimensions to metrics
    timestamp TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_metrics_name ON observability.metrics(name);
CREATE INDEX IF NOT EXISTS idx_metrics_timestamp ON observability.metrics(timestamp);
CREATE INDEX IF NOT EXISTS idx_metrics_tags ON observability.metrics USING GIN (tags);

-- Performance events - for tracking individual events like page loads, API calls, etc.
CREATE TABLE IF NOT EXISTS observability.performance_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    event_type TEXT NOT NULL,
    duration_ms INTEGER NOT NULL,
    user_id UUID,
    session_id TEXT,
    resource TEXT, -- What resource was being accessed (URL, API endpoint, etc.)
    details JSONB DEFAULT '{}',
    timestamp TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_performance_events_event_type ON observability.performance_events(event_type);
CREATE INDEX IF NOT EXISTS idx_performance_events_user_id ON observability.performance_events(user_id);
CREATE INDEX IF NOT EXISTS idx_performance_events_timestamp ON observability.performance_events(timestamp);
CREATE INDEX IF NOT EXISTS idx_performance_events_resource ON observability.performance_events(resource);

-- Logging function
CREATE OR REPLACE FUNCTION observability.log(
    p_level TEXT,
    p_message TEXT,
    p_context JSONB DEFAULT '{}',
    p_component TEXT DEFAULT NULL,
    p_trace_id TEXT DEFAULT NULL,
    p_user_id UUID DEFAULT NULL,
    p_session_id TEXT DEFAULT NULL,
    p_request_id TEXT DEFAULT NULL
) RETURNS UUID AS $$
DECLARE
    log_id UUID;
BEGIN
    INSERT INTO observability.logs (
        level,
        message,
        context,
        component,
        trace_id,
        user_id,
        session_id,
        request_id
    ) VALUES (
        p_level,
        p_message,
        p_context,
        p_component,
        p_trace_id,
        p_user_id,
        p_session_id,
        p_request_id
    ) RETURNING id INTO log_id;
    
    RETURN log_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Record metric function
CREATE OR REPLACE FUNCTION observability.record_metric(
    p_name TEXT,
    p_value NUMERIC,
    p_unit TEXT DEFAULT NULL,
    p_tags JSONB DEFAULT '{}'
) RETURNS UUID AS $$
DECLARE
    metric_id UUID;
BEGIN
    INSERT INTO observability.metrics (
        name,
        value,
        unit,
        tags
    ) VALUES (
        p_name,
        p_value,
        p_unit,
        p_tags
    ) RETURNING id INTO metric_id;
    
    RETURN metric_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Record performance event function
CREATE OR REPLACE FUNCTION observability.record_performance(
    p_event_type TEXT,
    p_duration_ms INTEGER,
    p_user_id UUID DEFAULT NULL,
    p_session_id TEXT DEFAULT NULL,
    p_resource TEXT DEFAULT NULL,
    p_details JSONB DEFAULT '{}'
) RETURNS UUID AS $$
DECLARE
    event_id UUID;
BEGIN
    INSERT INTO observability.performance_events (
        event_type,
        duration_ms,
        user_id,
        session_id,
        resource,
        details
    ) VALUES (
        p_event_type,
        p_duration_ms,
        p_user_id,
        p_session_id,
        p_resource,
        p_details
    ) RETURNING id INTO event_id;
    
    RETURN event_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =============================================
-- 6. PERSONALIZATION
-- =============================================

-- User personalization table
CREATE TABLE IF NOT EXISTS public.user_personalization (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    interests TEXT[],
    recent_queries TEXT[],
    preferences JSONB DEFAULT '{}',
    last_interacted TIMESTAMPTZ DEFAULT now(),
    created_at TIMESTAMPTZ DEFAULT now(),
    UNIQUE(user_id)
);

-- User interactions table
CREATE TABLE IF NOT EXISTS public.user_interactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    interaction_type TEXT NOT NULL, -- e.g., 'click', 'view', 'search', 'favorite'
    content_type TEXT, -- e.g., 'document', 'case', 'article'
    content_id UUID, -- Reference to the content being interacted with
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Create indexes for personalization
CREATE INDEX IF NOT EXISTS idx_user_personalization_user_id ON public.user_personalization(user_id);
CREATE INDEX IF NOT EXISTS idx_user_interactions_user_id ON public.user_interactions(user_id);
CREATE INDEX IF NOT EXISTS idx_user_interactions_interaction_type ON public.user_interactions(interaction_type);
CREATE INDEX IF NOT EXISTS idx_user_interactions_content_type ON public.user_interactions(content_type);
CREATE INDEX IF NOT EXISTS idx_user_interactions_content_id ON public.user_interactions(content_id);
CREATE INDEX IF NOT EXISTS idx_user_interactions_created_at ON public.user_interactions(created_at);

-- RLS policies for personalization
ALTER TABLE public.user_personalization ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_interactions ENABLE ROW LEVEL SECURITY;

-- Users can view their own personalization data
CREATE POLICY "Users can view their own personalization data" 
ON public.user_personalization FOR SELECT 
TO authenticated 
USING (user_id = auth.uid());

-- Users can update their own personalization data
CREATE POLICY "Users can update their own personalization data" 
ON public.user_personalization FOR UPDATE 
TO authenticated 
USING (user_id = auth.uid());

-- Admins can view all personalization data
CREATE POLICY "Admins can view all personalization data" 
ON public.user_personalization FOR SELECT 
TO authenticated 
USING (
    EXISTS (
        SELECT 1 FROM public.profiles 
        WHERE id = auth.uid() AND is_admin = true
    )
);

-- Users can view their own interactions
CREATE POLICY "Users can view their own interactions" 
ON public.user_interactions FOR SELECT 
TO authenticated 
USING (user_id = auth.uid());

-- Admins can view all interactions
CREATE POLICY "Admins can view all interactions" 
ON public.user_interactions FOR SELECT 
TO authenticated 
USING (
    EXISTS (
        SELECT 1 FROM public.profiles 
        WHERE id = auth.uid() AND is_admin = true
    )
);

-- Function to update user personalization
CREATE OR REPLACE FUNCTION public.update_user_personalization(
    p_interests TEXT[] DEFAULT NULL,
    p_preferences JSONB DEFAULT NULL
) RETURNS VOID AS $$
DECLARE
    v_user_id UUID;
BEGIN
    v_user_id := auth.uid();
    
    -- Insert or update user personalization
    INSERT INTO public.user_personalization (user_id, interests, preferences, last_interacted)
    VALUES (v_user_id, p_interests, p_preferences, now())
    ON CONFLICT (user_id) 
    DO UPDATE SET 
        interests = COALESCE(p_interests, public.user_personalization.interests),
        preferences = COALESCE(p_preferences, public.user_personalization.preferences),
        last_interacted = now();
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to track user interaction
CREATE OR REPLACE FUNCTION public.track_user_interaction(
    p_interaction_type TEXT,
    p_content_type TEXT DEFAULT NULL,
    p_content_id UUID DEFAULT NULL,
    p_metadata JSONB DEFAULT '{}'
) RETURNS UUID AS $$
DECLARE
    v_user_id UUID;
    v_interaction_id UUID;
BEGIN
    v_user_id := auth.uid();
    
    INSERT INTO public.user_interactions (
        user_id, 
        interaction_type,
        content_type,
        content_id,
        metadata
    ) VALUES (
        v_user_id,
        p_interaction_type,
        p_content_type,
        p_content_id,
        p_metadata
    ) RETURNING id INTO v_interaction_id;
    
    -- Also update the last_interacted timestamp in user_personalization
    INSERT INTO public.user_personalization (user_id, last_interacted)
    VALUES (v_user_id, now())
    ON CONFLICT (user_id) 
    DO UPDATE SET last_interacted = now();
    
    RETURN v_interaction_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to add a recent query to user personalization
CREATE OR REPLACE FUNCTION public.add_recent_query(
    p_query TEXT
) RETURNS VOID AS $$
DECLARE
    v_user_id UUID;
    v_recent_queries TEXT[];
BEGIN
    v_user_id := auth.uid();
    
    -- Get existing recent queries
    SELECT recent_queries INTO v_recent_queries
    FROM public.user_personalization
    WHERE user_id = v_user_id;
    
    -- Add new query to the beginning of the array and limit to 10 items
    IF v_recent_queries IS NULL THEN
        v_recent_queries := ARRAY[p_query];
    ELSE
        -- Remove the query if it already exists to avoid duplicates
        v_recent_queries := array_remove(v_recent_queries, p_query);
        -- Add the query to the beginning
        v_recent_queries := array_prepend(p_query, v_recent_queries);
        -- Limit to 10 items
        IF array_length(v_recent_queries, 1) > 10 THEN
            v_recent_queries := v_recent_queries[1:10];
        END IF;
    END IF;
    
    -- Update user personalization
    INSERT INTO public.user_personalization (user_id, recent_queries, last_interacted)
    VALUES (v_user_id, v_recent_queries, now())
    ON CONFLICT (user_id) 
    DO UPDATE SET 
        recent_queries = v_recent_queries,
        last_interacted = now();
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Add comment about migration
COMMENT ON DATABASE postgres IS 'Added missing features from original migrations (agents, fine-tuning, security, rate limiting, observability, personalization)';

COMMIT; 