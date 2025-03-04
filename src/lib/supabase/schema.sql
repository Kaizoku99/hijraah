-- Enable Row Level Security
ALTER TABLE chat_conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;

-- Create chat conversations table
CREATE TABLE IF NOT EXISTS chat_conversations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  filters JSONB DEFAULT '{}'::jsonb,
  metadata JSONB DEFAULT '{}'::jsonb,
  is_archived BOOLEAN DEFAULT false
);

-- Create chat messages table
CREATE TABLE IF NOT EXISTS chat_messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  conversation_id UUID NOT NULL REFERENCES chat_conversations(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('user', 'assistant')),
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  metadata JSONB DEFAULT '{}'::jsonb
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_chat_conversations_user_id ON chat_conversations(user_id);
CREATE INDEX IF NOT EXISTS idx_chat_conversations_created_at ON chat_conversations(created_at);
CREATE INDEX IF NOT EXISTS idx_chat_messages_conversation_id ON chat_messages(conversation_id);
CREATE INDEX IF NOT EXISTS idx_chat_messages_created_at ON chat_messages(created_at);

-- Create RLS policies for chat_conversations
CREATE POLICY "Users can view their own conversations"
  ON chat_conversations
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own conversations"
  ON chat_conversations
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own conversations"
  ON chat_conversations
  FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own conversations"
  ON chat_conversations
  FOR DELETE
  USING (auth.uid() = user_id);

-- Create RLS policies for chat_messages
CREATE POLICY "Users can view messages in their conversations"
  ON chat_messages
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1
      FROM chat_conversations
      WHERE id = chat_messages.conversation_id
      AND user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create messages in their conversations"
  ON chat_messages
  FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1
      FROM chat_conversations
      WHERE id = chat_messages.conversation_id
      AND user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update messages in their conversations"
  ON chat_messages
  FOR UPDATE
  USING (
    EXISTS (
      SELECT 1
      FROM chat_conversations
      WHERE id = chat_messages.conversation_id
      AND user_id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1
      FROM chat_conversations
      WHERE id = chat_messages.conversation_id
      AND user_id = auth.uid()
    )
  );

CREATE POLICY "Users can delete messages in their conversations"
  ON chat_messages
  FOR DELETE
  USING (
    EXISTS (
      SELECT 1
      FROM chat_conversations
      WHERE id = chat_messages.conversation_id
      AND user_id = auth.uid()
    )
  );

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_chat_conversations_updated_at
  BEFORE UPDATE ON chat_conversations
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Add artifacts table if it doesn't exist
CREATE TABLE IF NOT EXISTS artifacts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  content JSONB,
  type TEXT NOT NULL, -- 'document', 'spreadsheet', 'code', etc.
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  chat_id UUID REFERENCES chats(id) ON DELETE CASCADE,
  visibility TEXT DEFAULT 'private'
);

-- Add artifact_messages for messages related to artifacts
CREATE TABLE IF NOT EXISTS artifact_messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  artifact_id UUID REFERENCES artifacts(id) ON DELETE CASCADE,
  message TEXT NOT NULL,
  role TEXT NOT NULL, -- 'user', 'assistant', 'system'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add RLS policies for artifacts
ALTER TABLE artifacts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own artifacts"
  ON artifacts
  FOR SELECT
  USING (user_id = auth.uid() OR visibility = 'public');

CREATE POLICY "Users can insert their own artifacts"
  ON artifacts
  FOR INSERT
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update their own artifacts"
  ON artifacts
  FOR UPDATE
  USING (user_id = auth.uid());

CREATE POLICY "Users can delete their own artifacts"
  ON artifacts
  FOR DELETE
  USING (user_id = auth.uid());

-- Add RLS policies for artifact messages
ALTER TABLE artifact_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view messages for their artifacts"
  ON artifact_messages
  FOR SELECT
  USING (artifact_id IN (SELECT id FROM artifacts WHERE user_id = auth.uid() OR visibility = 'public'));

CREATE POLICY "Users can insert messages for their artifacts"
  ON artifact_messages
  FOR INSERT
  WITH CHECK (artifact_id IN (SELECT id FROM artifacts WHERE user_id = auth.uid())); 