/**
 * Intelligent Onboarding Migration
 * 
 * This migration adds support for intelligent onboarding by analyzing user's company domain
 * during the registration process. It includes:
 * 
 * - company_analyses: Stores Firecrawl scraping results and LLM analysis of company domains
 * - personalized_onboarding: Stores generated keywords, configurations, and demo settings
 * - onboarding_jobs: Tracks async processing jobs during email confirmation
 */

-- Enum for analysis status
CREATE TYPE analysis_status AS ENUM ('pending', 'processing', 'completed', 'failed');
CREATE TYPE onboarding_job_status AS ENUM ('pending', 'processing', 'completed', 'failed');

-- Company Analyses Table
-- Stores scraped company data and LLM analysis results
CREATE TABLE company_analyses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    domain TEXT NOT NULL UNIQUE,
    company_name TEXT,
    industry TEXT,
    company_size TEXT,
    description TEXT,
    country TEXT,
    website_content JSONB, -- Raw Firecrawl scraped content
    firecrawl_metadata JSONB, -- Firecrawl response metadata
    analysis_result JSONB, -- LLM analysis results
    status analysis_status NOT NULL DEFAULT 'pending',
    error_message TEXT,
    processed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Personalized Onboarding Table
-- Stores AI-generated personalized onboarding configuration for each user
CREATE TABLE personalized_onboarding (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL,
    company_analysis_id UUID REFERENCES company_analyses(id) ON DELETE SET NULL,
    
    -- AI-generated personalized content
    keywords JSONB DEFAULT '[]'::jsonb, -- Array of relevant keywords
    demo_settings JSONB DEFAULT '{}'::jsonb, -- Demo project configuration
    configuration JSONB DEFAULT '{}'::jsonb, -- Service configuration
    
    -- Immigration-specific recommendations
    recommended_visa_types JSONB DEFAULT '[]'::jsonb,
    priority_countries JSONB DEFAULT '[]'::jsonb,
    suggested_documents JSONB DEFAULT '[]'::jsonb,
    industry_insights JSONB DEFAULT '{}'::jsonb,
    
    -- AI analysis metadata
    confidence_score DECIMAL(3,2) DEFAULT 0.0,
    generation_model TEXT DEFAULT 'gpt-4',
    prompt_version TEXT DEFAULT 'v1.0',
    
    status analysis_status NOT NULL DEFAULT 'pending',
    generated_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    
    UNIQUE(user_id)
);

-- Onboarding Jobs Table
-- Tracks async processing during email confirmation
CREATE TABLE onboarding_jobs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL,
    email TEXT NOT NULL,
    email_domain TEXT NOT NULL,
    
    job_type TEXT NOT NULL DEFAULT 'intelligent_onboarding',
    status onboarding_job_status NOT NULL DEFAULT 'pending',
    
    -- Processing steps tracking
    steps_completed JSONB DEFAULT '[]'::jsonb,
    current_step TEXT,
    total_steps INTEGER DEFAULT 4,
    
    -- Results and metadata
    company_analysis_id UUID REFERENCES company_analyses(id) ON DELETE SET NULL,
    personalized_onboarding_id UUID REFERENCES personalized_onboarding(id) ON DELETE SET NULL,
    
    error_message TEXT,
    started_at TIMESTAMPTZ,
    completed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Add email domain to profiles table for quick lookup
ALTER TABLE profiles 
ADD COLUMN IF NOT EXISTS email_domain TEXT,
ADD COLUMN IF NOT EXISTS company_analysis_id UUID REFERENCES company_analyses(id) ON DELETE SET NULL,
ADD COLUMN IF NOT EXISTS onboarding_completed_at TIMESTAMPTZ;

-- Create indexes for performance
CREATE INDEX idx_company_analyses_domain ON company_analyses(domain);
CREATE INDEX idx_company_analyses_status ON company_analyses(status);
CREATE INDEX idx_company_analyses_created_at ON company_analyses(created_at DESC);

CREATE INDEX idx_personalized_onboarding_user_id ON personalized_onboarding(user_id);
CREATE INDEX idx_personalized_onboarding_status ON personalized_onboarding(status);
CREATE INDEX idx_personalized_onboarding_company_analysis ON personalized_onboarding(company_analysis_id);

CREATE INDEX idx_onboarding_jobs_user_id ON onboarding_jobs(user_id);
CREATE INDEX idx_onboarding_jobs_email_domain ON onboarding_jobs(email_domain);
CREATE INDEX idx_onboarding_jobs_status ON onboarding_jobs(status);
CREATE INDEX idx_onboarding_jobs_created_at ON onboarding_jobs(created_at DESC);

CREATE INDEX idx_profiles_email_domain ON profiles(email_domain);
CREATE INDEX idx_profiles_company_analysis ON profiles(company_analysis_id);

-- Create update timestamp triggers
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_company_analyses_updated_at 
    BEFORE UPDATE ON company_analyses
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_personalized_onboarding_updated_at 
    BEFORE UPDATE ON personalized_onboarding
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_onboarding_jobs_updated_at 
    BEFORE UPDATE ON onboarding_jobs
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Row Level Security (RLS) policies
ALTER TABLE company_analyses ENABLE ROW LEVEL SECURITY;
ALTER TABLE personalized_onboarding ENABLE ROW LEVEL SECURITY;
ALTER TABLE onboarding_jobs ENABLE ROW LEVEL SECURITY;

-- Policies for company_analyses (admin and system access only)
CREATE POLICY "Allow read access to company analyses for authenticated users" 
ON company_analyses FOR SELECT 
TO authenticated 
USING (true);

CREATE POLICY "Allow service role full access to company analyses" 
ON company_analyses FOR ALL 
TO service_role 
USING (true);

-- Policies for personalized_onboarding (users can only access their own)
CREATE POLICY "Users can view their own personalized onboarding" 
ON personalized_onboarding FOR SELECT 
TO authenticated 
USING (auth.uid() = user_id);

CREATE POLICY "Allow service role full access to personalized onboarding" 
ON personalized_onboarding FOR ALL 
TO service_role 
USING (true);

-- Policies for onboarding_jobs (users can only access their own)
CREATE POLICY "Users can view their own onboarding jobs" 
ON onboarding_jobs FOR SELECT 
TO authenticated 
USING (auth.uid() = user_id);

CREATE POLICY "Allow service role full access to onboarding jobs" 
ON onboarding_jobs FOR ALL 
TO service_role 
USING (true);

-- Comments for documentation
COMMENT ON TABLE company_analyses IS 'Stores Firecrawl scraping results and LLM analysis of company domains for intelligent onboarding';
COMMENT ON TABLE personalized_onboarding IS 'Stores AI-generated personalized keywords, configuration, and demo settings for each user';
COMMENT ON TABLE onboarding_jobs IS 'Tracks async processing jobs that run during email confirmation for intelligent onboarding';

COMMENT ON COLUMN company_analyses.website_content IS 'Raw content scraped by Firecrawl including markdown, metadata, and structured data';
COMMENT ON COLUMN company_analyses.analysis_result IS 'LLM analysis results including industry classification, company insights, and immigration relevance';
COMMENT ON COLUMN personalized_onboarding.keywords IS 'Array of AI-generated keywords relevant to users company/industry for search and content personalization';
COMMENT ON COLUMN personalized_onboarding.demo_settings IS 'Customized demo project configuration based on company analysis';
COMMENT ON COLUMN personalized_onboarding.configuration IS 'Personalized service configuration settings (notifications, preferences, etc.)';
COMMENT ON COLUMN personalized_onboarding.recommended_visa_types IS 'AI-suggested visa types based on company industry and size';
COMMENT ON COLUMN onboarding_jobs.steps_completed IS 'Array tracking completed processing steps: domain_extraction, company_scraping, llm_analysis, settings_generation';
