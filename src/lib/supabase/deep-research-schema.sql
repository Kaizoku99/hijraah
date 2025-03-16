-- Deep Research Schema
-- This schema defines the tables for storing deep research sessions, sources, and findings

-- Create a table for research sessions
CREATE TABLE IF NOT EXISTS research_sessions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    query TEXT NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'completed', 'failed')),
    metadata JSONB DEFAULT '{}'::JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create a table for research sources
CREATE TABLE IF NOT EXISTS research_sources (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    session_id UUID REFERENCES research_sessions(id) ON DELETE CASCADE NOT NULL,
    url TEXT NOT NULL,
    title TEXT NOT NULL,
    relevance REAL DEFAULT 0.0,
    metadata JSONB DEFAULT '{}'::JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create an index on session_id for faster lookup
CREATE INDEX IF NOT EXISTS idx_research_sources_session_id ON research_sources(session_id);

-- Create a table for research findings
CREATE TABLE IF NOT EXISTS research_findings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    session_id UUID REFERENCES research_sessions(id) ON DELETE CASCADE NOT NULL,
    type VARCHAR(50) NOT NULL,
    content TEXT NOT NULL,
    depth INTEGER DEFAULT 1,
    metadata JSONB DEFAULT '{}'::JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create an index on session_id for faster lookup
CREATE INDEX IF NOT EXISTS idx_research_findings_session_id ON research_findings(session_id);

-- Create a function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create a trigger to automatically update the updated_at column on research_sessions
CREATE TRIGGER update_research_sessions_updated_at
BEFORE UPDATE ON research_sessions
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- Create a view for recent research sessions with their source and finding counts
CREATE OR REPLACE VIEW recent_research_sessions AS
SELECT 
    rs.id,
    rs.user_id,
    rs.query,
    rs.status,
    rs.created_at,
    rs.updated_at,
    (SELECT COUNT(*) FROM research_sources WHERE session_id = rs.id) AS source_count,
    (SELECT COUNT(*) FROM research_findings WHERE session_id = rs.id) AS finding_count
FROM 
    research_sessions rs
ORDER BY 
    rs.updated_at DESC;

-- Create a function to mark a session as completed with results
CREATE OR REPLACE FUNCTION complete_research_session(
    p_session_id UUID,
    p_final_answer TEXT
)
RETURNS VOID AS $$
BEGIN
    -- Update the session status
    UPDATE research_sessions
    SET 
        status = 'completed',
        metadata = jsonb_set(
            metadata, 
            '{progress}', 
            '100'::jsonb
        )
    WHERE id = p_session_id;
    
    -- Add the final answer as a finding
    INSERT INTO research_findings (
        session_id,
        type,
        content,
        depth,
        metadata
    ) VALUES (
        p_session_id,
        'final_answer',
        p_final_answer,
        (SELECT COALESCE((metadata->>'max_depth')::INTEGER, 1) FROM research_sessions WHERE id = p_session_id),
        '{}'::jsonb
    );
END;
$$ LANGUAGE plpgsql;

-- Create a function to mark a session as failed
CREATE OR REPLACE FUNCTION fail_research_session(
    p_session_id UUID,
    p_error_message TEXT
)
RETURNS VOID AS $$
BEGIN
    -- Update the session status
    UPDATE research_sessions
    SET status = 'failed'
    WHERE id = p_session_id;
    
    -- Add the error as a finding
    INSERT INTO research_findings (
        session_id,
        type,
        content,
        depth,
        metadata
    ) VALUES (
        p_session_id,
        'error',
        p_error_message,
        1,
        '{}'::jsonb
    );
END;
$$ LANGUAGE plpgsql;

-- Enable Row Level Security
ALTER TABLE research_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE research_sources ENABLE ROW LEVEL SECURITY;
ALTER TABLE research_findings ENABLE ROW LEVEL SECURITY;

-- Create policies for research_sessions
CREATE POLICY "Users can view their own research sessions"
ON research_sessions
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own research sessions"
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

-- Create policies for research_sources
CREATE POLICY "Users can view sources for their research sessions"
ON research_sources
FOR SELECT
USING (
    EXISTS (
        SELECT 1 FROM research_sessions
        WHERE id = research_sources.session_id
        AND user_id = auth.uid()
    )
);

-- Create policies for research_findings
CREATE POLICY "Users can view findings for their research sessions"
ON research_findings
FOR SELECT
USING (
    EXISTS (
        SELECT 1 FROM research_sessions
        WHERE id = research_findings.session_id
        AND user_id = auth.uid()
    )
); 