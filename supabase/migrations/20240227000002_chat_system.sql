-- Create chat_sessions table with enhanced metadata
CREATE TABLE IF NOT EXISTS chat_sessions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id),
    case_id UUID REFERENCES immigration_cases(id),
    title VARCHAR(255),
    status VARCHAR(20) DEFAULT 'active',
    started_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    ended_at TIMESTAMP WITH TIME ZONE,
    context JSONB DEFAULT '{}'::jsonb,
    metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_user 
        FOREIGN KEY(user_id) 
        REFERENCES auth.users(id) 
        ON DELETE CASCADE,
    CONSTRAINT fk_case 
        FOREIGN KEY(case_id) 
        REFERENCES immigration_cases(id) 
        ON DELETE CASCADE,
    CONSTRAINT valid_status
        CHECK (status IN ('active', 'archived', 'deleted'))
);

-- Create chat_messages table with enhanced features
CREATE TABLE IF NOT EXISTS chat_messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    session_id UUID REFERENCES chat_sessions(id),
    user_id UUID REFERENCES auth.users(id),
    role VARCHAR(20) NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    metadata JSONB DEFAULT '{}'::jsonb,
    CONSTRAINT fk_session 
        FOREIGN KEY(session_id) 
        REFERENCES chat_sessions(id) 
        ON DELETE CASCADE,
    CONSTRAINT fk_user 
        FOREIGN KEY(user_id) 
        REFERENCES auth.users(id) 
        ON DELETE CASCADE,
    CONSTRAINT valid_role 
        CHECK (role IN ('user', 'assistant', 'system'))
);

-- Create indexes for chat system
CREATE INDEX IF NOT EXISTS idx_chat_sessions_user ON chat_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_chat_sessions_case ON chat_sessions(case_id);
CREATE INDEX IF NOT EXISTS idx_chat_sessions_status ON chat_sessions(status);
CREATE INDEX IF NOT EXISTS idx_chat_messages_session ON chat_messages(session_id);
CREATE INDEX IF NOT EXISTS idx_chat_messages_user ON chat_messages(user_id);
CREATE INDEX IF NOT EXISTS idx_chat_messages_created ON chat_messages(created_at);
CREATE INDEX IF NOT EXISTS idx_chat_messages_role ON chat_messages(role);

-- Add RLS policies
ALTER TABLE chat_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;

-- Policies for chat_sessions
CREATE POLICY "Users can view their own chat sessions"
    ON chat_sessions FOR SELECT
    TO authenticated
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own chat sessions"
    ON chat_sessions FOR INSERT
    TO authenticated
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own chat sessions"
    ON chat_sessions FOR UPDATE
    TO authenticated
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

-- Policies for chat_messages
CREATE POLICY "Users can view messages in their sessions"
    ON chat_messages FOR SELECT
    TO authenticated
    USING (EXISTS (
        SELECT 1 FROM chat_sessions
        WHERE chat_sessions.id = chat_messages.session_id
        AND chat_sessions.user_id = auth.uid()
    ));

CREATE POLICY "Users can insert messages in their sessions"
    ON chat_messages FOR INSERT
    TO authenticated
    WITH CHECK (EXISTS (
        SELECT 1 FROM chat_sessions
        WHERE chat_sessions.id = chat_messages.session_id
        AND chat_sessions.user_id = auth.uid()
    ));

-- Add session_id to documents table
ALTER TABLE documents 
ADD COLUMN IF NOT EXISTS session_id UUID REFERENCES chat_sessions(id),
ADD CONSTRAINT fk_session 
    FOREIGN KEY(session_id) 
    REFERENCES chat_sessions(id) 
    ON DELETE SET NULL;

CREATE INDEX IF NOT EXISTS idx_documents_session ON documents(session_id);

-- Add RLS policy for documents with sessions
CREATE POLICY "Users can view documents in their sessions"
    ON documents FOR SELECT
    TO authenticated
    USING (
        auth.uid() = user_id 
        OR (
            session_id IS NOT NULL 
            AND EXISTS (
                SELECT 1 FROM chat_sessions 
                WHERE chat_sessions.id = documents.session_id 
                AND chat_sessions.user_id = auth.uid()
            )
        )
    );