-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "vector";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Create updated_at function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Core tables
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) NOT NULL UNIQUE,
    full_name VARCHAR(255),
    avatar_url TEXT,
    password_hash TEXT,
    email_verified BOOLEAN DEFAULT FALSE,
    phone_number VARCHAR(20),
    date_of_birth DATE,
    country_of_residence VARCHAR(100),
    preferred_language VARCHAR(50) DEFAULT 'en',
    notification_preferences JSONB DEFAULT '{"email": true, "push": true}'::jsonb,
    last_sign_in_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    metadata JSONB DEFAULT '{}'::jsonb
);

CREATE TABLE IF NOT EXISTS immigration_cases (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    status VARCHAR(50) NOT NULL,
    case_type VARCHAR(50) NOT NULL,
    current_stage VARCHAR(50) NOT NULL DEFAULT 'Document Collection',
    requirements JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    metadata JSONB DEFAULT '{}'::jsonb,
    CONSTRAINT fk_user 
        FOREIGN KEY(user_id) 
        REFERENCES users(id) 
        ON DELETE CASCADE,
    CONSTRAINT valid_status
        CHECK (status IN ('pending', 'active', 'approved', 'rejected', 'completed', 'archived')),
    CONSTRAINT valid_case_type
        CHECK (case_type IN (
            'Visitor Visa',
            'Student Visa',
            'Work Permit',
            'Permanent Residence',
            'Citizenship',
            'Family Sponsorship',
            'Business Immigration',
            'Refugee Claim',
            'Appeal'
        )),
    CONSTRAINT valid_stages
        CHECK (current_stage IN (
            'Initial Assessment',
            'Document Collection',
            'Application Preparation',
            'Application Submitted',
            'Under Review',
            'Additional Documents Requested',
            'Interview Scheduled',
            'Decision Pending',
            'Approved',
            'Rejected',
            'Completed',
            'On Hold'
        ))
);

-- Chat System Tables
CREATE TABLE IF NOT EXISTS conversations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id),
    case_id UUID REFERENCES immigration_cases(id),
    title TEXT NOT NULL,
    status VARCHAR(20) DEFAULT 'active',
    started_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    ended_at TIMESTAMP WITH TIME ZONE,
    context JSONB DEFAULT '{}'::jsonb,
    metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_user 
        FOREIGN KEY(user_id) 
        REFERENCES users(id) 
        ON DELETE CASCADE,
    CONSTRAINT fk_case 
        FOREIGN KEY(case_id) 
        REFERENCES immigration_cases(id) 
        ON DELETE CASCADE,
    CONSTRAINT valid_status
        CHECK (status IN ('active', 'archived', 'deleted'))
);

CREATE TABLE IF NOT EXISTS participants (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    conversation_id UUID NOT NULL REFERENCES conversations(id) ON DELETE CASCADE,
    role TEXT NOT NULL CHECK (role IN ('owner', 'member')),
    joined_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    last_read_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (user_id, conversation_id)
);

CREATE TABLE IF NOT EXISTS messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    content TEXT NOT NULL,
    role TEXT NOT NULL CHECK (role IN ('user', 'assistant', 'system')),
    conversation_id UUID NOT NULL REFERENCES conversations(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    embedding vector(1536),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    metadata JSONB DEFAULT '{}'::jsonb
);

-- Document System Tables (Merged from research and base schema)
CREATE TABLE IF NOT EXISTS document_categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL UNIQUE,
    description TEXT,
    metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS documents (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    case_id UUID REFERENCES immigration_cases(id),
    user_id UUID REFERENCES users(id),
    conversation_id UUID REFERENCES conversations(id),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    url TEXT NOT NULL,
    file_type VARCHAR(50),
    status VARCHAR(50) DEFAULT 'pending',
    content TEXT,
    content_vector vector(384),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    metadata JSONB DEFAULT '{}'::jsonb,
    CONSTRAINT fk_case 
        FOREIGN KEY(case_id) 
        REFERENCES immigration_cases(id) 
        ON DELETE CASCADE,
    CONSTRAINT fk_user 
        FOREIGN KEY(user_id) 
        REFERENCES users(id) 
        ON DELETE CASCADE,
    CONSTRAINT fk_conversation 
        FOREIGN KEY(conversation_id) 
        REFERENCES conversations(id) 
        ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS attachments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    type TEXT NOT NULL,
    url TEXT NOT NULL,
    size INTEGER NOT NULL,
    message_id UUID NOT NULL REFERENCES messages(id) ON DELETE CASCADE,
    metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Research System Tables
CREATE TABLE IF NOT EXISTS research_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    query TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'active',
    metadata JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS research_reports (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES users(id),
    title TEXT NOT NULL,
    query TEXT NOT NULL,
    summary TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    metadata JSONB DEFAULT '{}'::jsonb
);

CREATE TABLE IF NOT EXISTS research_sources (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    report_id UUID REFERENCES research_reports(id) ON DELETE CASCADE,
    url TEXT NOT NULL,
    title TEXT,
    description TEXT,
    content TEXT,
    relevance DOUBLE PRECISION,
    credibility_score DOUBLE PRECISION,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    metadata JSONB DEFAULT '{}'::jsonb
);

CREATE TABLE IF NOT EXISTS research_findings (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    report_id UUID REFERENCES research_reports(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    category TEXT,
    confidence DOUBLE PRECISION,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    metadata JSONB DEFAULT '{}'::jsonb
);

CREATE TABLE IF NOT EXISTS research_topics (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    report_id UUID REFERENCES research_reports(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    relevance DOUBLE PRECISION,
    findings JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    metadata JSONB DEFAULT '{}'::jsonb
);

CREATE TABLE IF NOT EXISTS research_analysis (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id UUID REFERENCES research_sessions(id) ON DELETE CASCADE,
    summary TEXT NOT NULL,
    key_findings JSONB,
    gaps JSONB,
    next_steps JSONB,
    metadata JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_cases_user ON immigration_cases(user_id);
CREATE INDEX idx_cases_status ON immigration_cases(status);
CREATE INDEX idx_cases_current_stage ON immigration_cases(current_stage);
CREATE INDEX idx_conversations_user ON conversations(user_id);
CREATE INDEX idx_conversations_case ON conversations(case_id);
CREATE INDEX idx_conversations_status ON conversations(status);
CREATE INDEX idx_messages_conversation ON messages(conversation_id);
CREATE INDEX idx_messages_user ON messages(user_id);
CREATE INDEX idx_messages_created ON messages(created_at);
CREATE INDEX idx_messages_role ON messages(role);
CREATE INDEX idx_participants_conversation ON participants(conversation_id);
CREATE INDEX idx_participants_user ON participants(user_id);
CREATE INDEX idx_attachments_message ON attachments(message_id);
CREATE INDEX idx_documents_case ON documents(case_id);
CREATE INDEX idx_documents_user ON documents(user_id);
CREATE INDEX idx_documents_status ON documents(status);
CREATE INDEX idx_documents_conversation ON documents(conversation_id);

-- Create vector similarity search index
CREATE INDEX messages_embedding_idx ON messages 
USING ivfflat (embedding vector_cosine_ops)
WITH (lists = 100);

-- Document content vector function and trigger
CREATE OR REPLACE FUNCTION update_content_vector()
RETURNS TRIGGER AS $$
BEGIN
    NEW.content_vector = (
        SELECT embedding
        FROM openai.embeddings(NEW.content)
        LIMIT 1
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER documents_vector_update
    BEFORE INSERT OR UPDATE ON documents
    FOR EACH ROW
    WHEN (NEW.content IS NOT NULL AND (
        TG_OP = 'INSERT' OR
        NEW.content <> OLD.content OR
        OLD.content_vector IS NULL
    ))
    EXECUTE FUNCTION update_content_vector();

-- Document matching function
CREATE OR REPLACE FUNCTION match_documents(
    query_text TEXT,
    match_count INT DEFAULT 10,
    filter JSONB DEFAULT '{}'::jsonb
)
RETURNS TABLE (
    id UUID,
    url TEXT,
    file_type VARCHAR(50),
    content TEXT,
    metadata JSONB,
    similarity FLOAT
)
LANGUAGE plpgsql
AS $$
DECLARE
    query_vector VECTOR(384);
BEGIN
    -- Get the embedding for the query
    SELECT embedding INTO query_vector
    FROM openai.embeddings(query_text)
    LIMIT 1;

    -- Return matches
    RETURN QUERY
    SELECT
        d.id,
        d.url,
        d.file_type,
        d.content,
        d.metadata,
        1 - (d.content_vector <=> query_vector) AS similarity
    FROM documents d
    WHERE
        CASE
            WHEN filter->>'type' IS NOT NULL THEN d.file_type = filter->>'type'
            ELSE TRUE
        END
    ORDER BY d.content_vector <=> query_vector
    LIMIT match_count;
END;
$$;

-- Add triggers for updated_at columns
CREATE TRIGGER update_cases_updated_at
    BEFORE UPDATE ON immigration_cases
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_documents_updated_at
    BEFORE UPDATE ON documents
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_conversations_updated_at
    BEFORE UPDATE ON conversations
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_messages_updated_at
    BEFORE UPDATE ON messages
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_research_reports_updated_at
    BEFORE UPDATE ON research_reports
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE immigration_cases ENABLE ROW LEVEL SECURITY;
ALTER TABLE document_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE participants ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE attachments ENABLE ROW LEVEL SECURITY;
ALTER TABLE research_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE research_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE research_sources ENABLE ROW LEVEL SECURITY;
ALTER TABLE research_findings ENABLE ROW LEVEL SECURITY;
ALTER TABLE research_topics ENABLE ROW LEVEL SECURITY;
ALTER TABLE research_analysis ENABLE ROW LEVEL SECURITY;

-- Create policies
-- Users
CREATE POLICY "Users can view their own profile"
    ON users FOR SELECT
    TO authenticated
    USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
    ON users FOR UPDATE
    TO authenticated
    USING (auth.uid() = id)
    WITH CHECK (auth.uid() = id);

-- Immigration Cases
CREATE POLICY "Users can view their own cases"
    ON immigration_cases FOR SELECT
    TO authenticated
    USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their own cases"
    ON immigration_cases FOR ALL
    TO authenticated
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

-- Documents
CREATE POLICY "Users can view document categories"
    ON document_categories FOR SELECT
    TO authenticated
    USING (true);

CREATE POLICY "Users can view their own documents"
    ON documents FOR SELECT
    TO authenticated
    USING (
        auth.uid() = user_id 
        OR (
            conversation_id IS NOT NULL 
            AND EXISTS (
                SELECT 1 FROM participants 
                WHERE conversation_id = documents.conversation_id 
                AND user_id = auth.uid()
            )
        )
    );

CREATE POLICY "Users can manage their own documents"
    ON documents FOR ALL
    TO authenticated
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

-- Conversations
CREATE POLICY "Users can view conversations they are part of"
    ON conversations FOR SELECT
    USING (EXISTS (
        SELECT 1 FROM participants
        WHERE conversation_id = conversations.id
        AND user_id = auth.uid()
    ));

CREATE POLICY "Users can create conversations"
    ON conversations FOR INSERT
    WITH CHECK (auth.uid() = user_id);

-- Participants
CREATE POLICY "Users can view participants of their conversations"
    ON participants FOR SELECT
    USING (EXISTS (
        SELECT 1 FROM participants AS p
        WHERE p.conversation_id = participants.conversation_id
        AND p.user_id = auth.uid()
    ));

CREATE POLICY "Users can join conversations they are invited to"
    ON participants FOR INSERT
    WITH CHECK (user_id = auth.uid());

-- Messages
CREATE POLICY "Users can view messages from their conversations"
    ON messages FOR SELECT
    USING (EXISTS (
        SELECT 1 FROM participants
        WHERE conversation_id = messages.conversation_id
        AND user_id = auth.uid()
    ));

CREATE POLICY "Users can send messages to their conversations"
    ON messages FOR INSERT
    WITH CHECK (EXISTS (
        SELECT 1 FROM participants
        WHERE conversation_id = messages.conversation_id
        AND user_id = auth.uid()
    ) AND user_id = auth.uid());

-- Attachments
CREATE POLICY "Users can view attachments from their conversations"
    ON attachments FOR SELECT
    USING (EXISTS (
        SELECT 1 FROM messages m
        JOIN participants p ON p.conversation_id = m.conversation_id
        WHERE m.id = attachments.message_id
        AND p.user_id = auth.uid()
    ));

CREATE POLICY "Users can add attachments to their messages"
    ON attachments FOR INSERT
    WITH CHECK (EXISTS (
        SELECT 1 FROM messages m
        JOIN participants p ON p.conversation_id = m.conversation_id
        WHERE m.id = attachments.message_id
        AND p.user_id = auth.uid()
    ));

-- Research
CREATE POLICY "Research sessions are viewable by the owner"
    ON research_sessions FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Only authenticated users can create research sessions"
    ON research_sessions FOR INSERT
    WITH CHECK (auth.role() = 'authenticated' AND auth.uid() = user_id);

CREATE POLICY "Users can view their own research reports"
    ON research_reports FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own research reports"
    ON research_reports FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view sources from their reports"
    ON research_sources FOR SELECT
    USING (EXISTS (
        SELECT 1 FROM research_reports
        WHERE id = research_sources.report_id
        AND user_id = auth.uid()
    ));

CREATE POLICY "Research findings are viewable by the session owner"
    ON research_findings FOR SELECT
    USING (EXISTS (
        SELECT 1 FROM research_reports
        WHERE id = research_findings.report_id
        AND user_id = auth.uid()
    ));

CREATE POLICY "Research analysis is viewable by the session owner"
    ON research_analysis FOR SELECT
    USING (EXISTS (
        SELECT 1 FROM research_sessions s
        WHERE s.id = research_analysis.session_id
        AND s.user_id = auth.uid()
    ));