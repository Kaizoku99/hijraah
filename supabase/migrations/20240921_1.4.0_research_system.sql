-- Migration: 20240921_1.4.0_research_system.sql
-- Description: Implements research functionality and tables

-- Register this migration with versioning system
DO $$ 
BEGIN
  -- Only run if the migration_meta schema exists
  IF EXISTS (SELECT 1 FROM pg_namespace WHERE nspname = 'migration_meta') THEN
    PERFORM migration_meta.register_migration(
      1, 4, 0,
      'Research system tables and functionality',
      '20240921_1.4.0_research_system.sql'
    );
  END IF;
END $$;

-- Create research_sessions table to store user research sessions
CREATE TABLE IF NOT EXISTS research_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    query TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'completed', 'archived', 'error')),
    metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add comments for documentation
COMMENT ON TABLE research_sessions IS 'Stores user research sessions';
COMMENT ON COLUMN research_sessions.id IS 'Primary key for the research session';
COMMENT ON COLUMN research_sessions.user_id IS 'Foreign key to the user who created the session';
COMMENT ON COLUMN research_sessions.query IS 'The main research query';
COMMENT ON COLUMN research_sessions.status IS 'Status of the research session';
COMMENT ON COLUMN research_sessions.metadata IS 'Additional metadata about the session';
COMMENT ON COLUMN research_sessions.created_at IS 'When the session was created';
COMMENT ON COLUMN research_sessions.updated_at IS 'When the session was last updated';

-- Create research_reports table to store final research reports
CREATE TABLE IF NOT EXISTS research_reports (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id UUID NOT NULL REFERENCES research_sessions(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    summary TEXT,
    content TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    metadata JSONB DEFAULT '{}'::jsonb
);

-- Add comments for documentation
COMMENT ON TABLE research_reports IS 'Stores research reports generated from sessions';
COMMENT ON COLUMN research_reports.id IS 'Primary key for the research report';
COMMENT ON COLUMN research_reports.session_id IS 'Foreign key to the related research session';
COMMENT ON COLUMN research_reports.user_id IS 'Foreign key to the user who owns the report';
COMMENT ON COLUMN research_reports.title IS 'Title of the research report';
COMMENT ON COLUMN research_reports.summary IS 'Executive summary of the report';
COMMENT ON COLUMN research_reports.content IS 'Full content of the report';
COMMENT ON COLUMN research_reports.created_at IS 'When the report was created';
COMMENT ON COLUMN research_reports.updated_at IS 'When the report was last updated';
COMMENT ON COLUMN research_reports.metadata IS 'Additional metadata about the report';

-- Create research_sources table to store sources of information
CREATE TABLE IF NOT EXISTS research_sources (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id UUID NOT NULL REFERENCES research_sessions(id) ON DELETE CASCADE,
    url TEXT NOT NULL,
    title TEXT,
    description TEXT,
    content TEXT,
    relevance DOUBLE PRECISION,
    credibility_score DOUBLE PRECISION,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    metadata JSONB DEFAULT '{}'::jsonb
);

-- Add comments for documentation
COMMENT ON TABLE research_sources IS 'Stores sources used in research';
COMMENT ON COLUMN research_sources.id IS 'Primary key for the source';
COMMENT ON COLUMN research_sources.session_id IS 'Foreign key to the research session';
COMMENT ON COLUMN research_sources.url IS 'URL of the source';
COMMENT ON COLUMN research_sources.title IS 'Title of the source';
COMMENT ON COLUMN research_sources.description IS 'Description or summary of the source';
COMMENT ON COLUMN research_sources.content IS 'Extracted content from the source';
COMMENT ON COLUMN research_sources.relevance IS 'Relevance score (0-1) for the source';
COMMENT ON COLUMN research_sources.credibility_score IS 'Credibility score (0-1) for the source';
COMMENT ON COLUMN research_sources.created_at IS 'When the source was added';
COMMENT ON COLUMN research_sources.metadata IS 'Additional metadata about the source';

-- Create research_findings table to store individual findings
CREATE TABLE IF NOT EXISTS research_findings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id UUID NOT NULL REFERENCES research_sessions(id) ON DELETE CASCADE,
    source_id UUID REFERENCES research_sources(id) ON DELETE SET NULL,
    content TEXT NOT NULL,
    category TEXT,
    confidence DOUBLE PRECISION,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    metadata JSONB DEFAULT '{}'::jsonb
);

-- Add comments for documentation
COMMENT ON TABLE research_findings IS 'Stores individual findings from research sources';
COMMENT ON COLUMN research_findings.id IS 'Primary key for the finding';
COMMENT ON COLUMN research_findings.session_id IS 'Foreign key to the research session';
COMMENT ON COLUMN research_findings.source_id IS 'Foreign key to the source (optional)';
COMMENT ON COLUMN research_findings.content IS 'Content of the finding';
COMMENT ON COLUMN research_findings.category IS 'Category or type of finding';
COMMENT ON COLUMN research_findings.confidence IS 'Confidence score (0-1) for the finding';
COMMENT ON COLUMN research_findings.created_at IS 'When the finding was added';
COMMENT ON COLUMN research_findings.metadata IS 'Additional metadata about the finding';

-- Create research_topics table to store research topics
CREATE TABLE IF NOT EXISTS research_topics (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id UUID NOT NULL REFERENCES research_sessions(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    relevance DOUBLE PRECISION,
    findings JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    metadata JSONB DEFAULT '{}'::jsonb
);

-- Add comments for documentation
COMMENT ON TABLE research_topics IS 'Stores research topics identified during research';
COMMENT ON COLUMN research_topics.id IS 'Primary key for the topic';
COMMENT ON COLUMN research_topics.session_id IS 'Foreign key to the research session';
COMMENT ON COLUMN research_topics.name IS 'Name of the topic';
COMMENT ON COLUMN research_topics.relevance IS 'Relevance score (0-1) for the topic';
COMMENT ON COLUMN research_topics.findings IS 'Array of finding IDs related to this topic';
COMMENT ON COLUMN research_topics.created_at IS 'When the topic was added';
COMMENT ON COLUMN research_topics.metadata IS 'Additional metadata about the topic';

-- Create research_analysis table to store overall analysis
CREATE TABLE IF NOT EXISTS research_analysis (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id UUID NOT NULL REFERENCES research_sessions(id) ON DELETE CASCADE,
    summary TEXT NOT NULL,
    key_findings JSONB DEFAULT '[]'::jsonb,
    gaps JSONB DEFAULT '[]'::jsonb,
    next_steps JSONB DEFAULT '[]'::jsonb,
    metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add comments for documentation
COMMENT ON TABLE research_analysis IS 'Stores overall analysis of research sessions';
COMMENT ON COLUMN research_analysis.id IS 'Primary key for the analysis';
COMMENT ON COLUMN research_analysis.session_id IS 'Foreign key to the research session';
COMMENT ON COLUMN research_analysis.summary IS 'Overall summary of the research';
COMMENT ON COLUMN research_analysis.key_findings IS 'Array of key findings';
COMMENT ON COLUMN research_analysis.gaps IS 'Array of identified research gaps';
COMMENT ON COLUMN research_analysis.next_steps IS 'Array of recommended next steps';
COMMENT ON COLUMN research_analysis.metadata IS 'Additional metadata about the analysis';
COMMENT ON COLUMN research_analysis.created_at IS 'When the analysis was created';

-- Create indices for better performance
CREATE INDEX IF NOT EXISTS idx_research_sessions_user_id ON research_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_research_sessions_status ON research_sessions(status);
CREATE INDEX IF NOT EXISTS idx_research_reports_user_id ON research_reports(user_id);
CREATE INDEX IF NOT EXISTS idx_research_reports_session_id ON research_reports(session_id);
CREATE INDEX IF NOT EXISTS idx_research_sources_session_id ON research_sources(session_id);
CREATE INDEX IF NOT EXISTS idx_research_findings_session_id ON research_findings(session_id);
CREATE INDEX IF NOT EXISTS idx_research_findings_source_id ON research_findings(source_id);
CREATE INDEX IF NOT EXISTS idx_research_topics_session_id ON research_topics(session_id);
CREATE INDEX IF NOT EXISTS idx_research_analysis_session_id ON research_analysis(session_id);

-- Add triggers for updated_at timestamp
CREATE TRIGGER update_research_sessions_updated_at
BEFORE UPDATE ON research_sessions
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_research_reports_updated_at
BEFORE UPDATE ON research_reports
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- Add RLS policies
ALTER TABLE research_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE research_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE research_sources ENABLE ROW LEVEL SECURITY;
ALTER TABLE research_findings ENABLE ROW LEVEL SECURITY;
ALTER TABLE research_topics ENABLE ROW LEVEL SECURITY;
ALTER TABLE research_analysis ENABLE ROW LEVEL SECURITY;

-- Research Sessions RLS
CREATE POLICY "Users can view their own research sessions"
ON research_sessions
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own research sessions"
ON research_sessions
FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own research sessions"
ON research_sessions
FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own research sessions"
ON research_sessions
FOR DELETE
USING (auth.uid() = user_id);

-- Research Reports RLS
CREATE POLICY "Users can view their own research reports"
ON research_reports
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own research reports"
ON research_reports
FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own research reports"
ON research_reports
FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own research reports"
ON research_reports
FOR DELETE
USING (auth.uid() = user_id);

-- Research Sources RLS
CREATE POLICY "Users can view sources for their research sessions"
ON research_sources
FOR SELECT
USING (session_id IN (
  SELECT id FROM research_sessions
  WHERE user_id = auth.uid()
));

CREATE POLICY "Users can insert sources for their research sessions"
ON research_sources
FOR INSERT
WITH CHECK (session_id IN (
  SELECT id FROM research_sessions
  WHERE user_id = auth.uid()
));

-- Research Findings RLS
CREATE POLICY "Users can view findings for their research sessions"
ON research_findings
FOR SELECT
USING (session_id IN (
  SELECT id FROM research_sessions
  WHERE user_id = auth.uid()
));

CREATE POLICY "Users can insert findings for their research sessions"
ON research_findings
FOR INSERT
WITH CHECK (session_id IN (
  SELECT id FROM research_sessions
  WHERE user_id = auth.uid()
));

-- Function to complete a research session
CREATE OR REPLACE FUNCTION complete_research_session(
    p_session_id UUID,
    p_summary TEXT DEFAULT NULL,
    p_key_findings JSONB DEFAULT NULL,
    p_gaps JSONB DEFAULT NULL,
    p_next_steps JSONB DEFAULT NULL
) RETURNS VOID AS $$
BEGIN
    -- Update the session status
    UPDATE research_sessions
    SET 
        status = 'completed',
        updated_at = NOW()
    WHERE 
        id = p_session_id AND
        user_id = auth.uid() AND
        status = 'active';
    
    -- Create or update the analysis record
    INSERT INTO research_analysis (
        session_id,
        summary,
        key_findings,
        gaps,
        next_steps
    )
    VALUES (
        p_session_id,
        COALESCE(p_summary, 'Research completed'),
        COALESCE(p_key_findings, '[]'::jsonb),
        COALESCE(p_gaps, '[]'::jsonb),
        COALESCE(p_next_steps, '[]'::jsonb)
    )
    ON CONFLICT (session_id)
    DO UPDATE SET
        summary = COALESCE(p_summary, research_analysis.summary),
        key_findings = COALESCE(p_key_findings, research_analysis.key_findings),
        gaps = COALESCE(p_gaps, research_analysis.gaps),
        next_steps = COALESCE(p_next_steps, research_analysis.next_steps);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

COMMENT ON FUNCTION complete_research_session IS 'Marks a research session as completed and stores analysis';

-- Function to fail a research session
CREATE OR REPLACE FUNCTION fail_research_session(
    p_session_id UUID,
    p_error_message TEXT
) RETURNS VOID AS $$
BEGIN
    -- Update the session status
    UPDATE research_sessions
    SET 
        status = 'error',
        metadata = jsonb_set(
            COALESCE(metadata, '{}'::jsonb),
            '{error}',
            to_jsonb(p_error_message)
        ),
        updated_at = NOW()
    WHERE 
        id = p_session_id AND
        user_id = auth.uid() AND
        status = 'active';
    
    -- Create an error finding
    INSERT INTO research_findings (
        session_id,
        content,
        category,
        confidence,
        metadata
    )
    VALUES (
        p_session_id,
        'Research encountered an error: ' || p_error_message,
        'error',
        0,
        jsonb_build_object('error', p_error_message)
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

COMMENT ON FUNCTION fail_research_session IS 'Marks a research session as failed with error details'; 