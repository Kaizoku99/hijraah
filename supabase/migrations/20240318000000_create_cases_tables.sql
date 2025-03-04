-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create cases table
CREATE TABLE IF NOT EXISTS cases (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    type TEXT NOT NULL CHECK (type IN ('visa', 'residence', 'citizenship', 'asylum', 'other')),
    description TEXT NOT NULL,
    priority TEXT NOT NULL CHECK (priority IN ('low', 'medium', 'high')),
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'completed', 'rejected')),
    metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create case_events table
CREATE TABLE IF NOT EXISTS case_events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    case_id UUID NOT NULL REFERENCES cases(id) ON DELETE CASCADE,
    status TEXT NOT NULL CHECK (status IN ('pending', 'in_progress', 'completed', 'rejected')),
    message TEXT NOT NULL,
    metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create documents table
CREATE TABLE IF NOT EXISTS documents (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    case_id UUID NOT NULL REFERENCES cases(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    type TEXT NOT NULL,
    size BIGINT NOT NULL,
    url TEXT NOT NULL,
    path TEXT NOT NULL,
    metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Add updated_at triggers
CREATE TRIGGER update_cases_updated_at
    BEFORE UPDATE ON cases
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_case_events_updated_at
    BEFORE UPDATE ON case_events
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_documents_updated_at
    BEFORE UPDATE ON documents
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Add indexes
CREATE INDEX idx_cases_user_id ON cases(user_id);
CREATE INDEX idx_cases_status ON cases(status);
CREATE INDEX idx_case_events_case_id ON case_events(case_id);
CREATE INDEX idx_documents_case_id ON documents(case_id);

-- Add RLS policies
ALTER TABLE cases ENABLE ROW LEVEL SECURITY;
ALTER TABLE case_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;

-- Cases policies
CREATE POLICY "Users can view their own cases"
    ON cases FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own cases"
    ON cases FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own cases"
    ON cases FOR UPDATE
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own cases"
    ON cases FOR DELETE
    USING (auth.uid() = user_id);

-- Case events policies
CREATE POLICY "Users can view events for their cases"
    ON case_events FOR SELECT
    USING (EXISTS (
        SELECT 1 FROM cases
        WHERE cases.id = case_events.case_id
        AND cases.user_id = auth.uid()
    ));

CREATE POLICY "Users can create events for their cases"
    ON case_events FOR INSERT
    WITH CHECK (EXISTS (
        SELECT 1 FROM cases
        WHERE cases.id = case_events.case_id
        AND cases.user_id = auth.uid()
    ));

-- Documents policies
CREATE POLICY "Users can view documents for their cases"
    ON documents FOR SELECT
    USING (EXISTS (
        SELECT 1 FROM cases
        WHERE cases.id = documents.case_id
        AND cases.user_id = auth.uid()
    ));

CREATE POLICY "Users can create documents for their cases"
    ON documents FOR INSERT
    WITH CHECK (EXISTS (
        SELECT 1 FROM cases
        WHERE cases.id = documents.case_id
        AND cases.user_id = auth.uid()
    ));

CREATE POLICY "Users can delete their own documents"
    ON documents FOR DELETE
    USING (EXISTS (
        SELECT 1 FROM cases
        WHERE cases.id = documents.case_id
        AND cases.user_id = auth.uid()
    )); 