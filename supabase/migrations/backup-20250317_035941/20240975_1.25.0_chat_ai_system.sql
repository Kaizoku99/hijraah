-- Create the chats table
CREATE TABLE IF NOT EXISTS public.chats (
    id UUID PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    model TEXT NOT NULL,
    visibility TEXT NOT NULL DEFAULT 'private',
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Create the chat_messages table
CREATE TABLE IF NOT EXISTS public.chat_messages (
    id UUID PRIMARY KEY,
    chat_id UUID REFERENCES public.chats(id) ON DELETE CASCADE,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    role TEXT NOT NULL CHECK (role IN ('system', 'user', 'assistant', 'function')),
    content TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Create the chat_attachments table
CREATE TABLE IF NOT EXISTS public.chat_attachments (
    id UUID PRIMARY KEY,
    chat_id UUID REFERENCES public.chats(id) ON DELETE CASCADE,
    message_id UUID REFERENCES public.chat_messages(id) ON DELETE CASCADE,
    file_name TEXT NOT NULL,
    file_type TEXT NOT NULL,
    file_size INTEGER NOT NULL,
    file_path TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Add indexes for improved query performance
CREATE INDEX IF NOT EXISTS idx_chats_user_id ON public.chats(user_id);
CREATE INDEX IF NOT EXISTS idx_chat_messages_chat_id ON public.chat_messages(chat_id);
CREATE INDEX IF NOT EXISTS idx_chat_messages_user_id ON public.chat_messages(user_id);
CREATE INDEX IF NOT EXISTS idx_chat_attachments_chat_id ON public.chat_attachments(chat_id);
CREATE INDEX IF NOT EXISTS idx_chat_attachments_message_id ON public.chat_attachments(message_id);

-- Add a trigger to update the updated_at timestamp on chats
CREATE OR REPLACE FUNCTION public.update_chats_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_chats_updated_at
BEFORE UPDATE ON public.chats
FOR EACH ROW
EXECUTE FUNCTION public.update_chats_updated_at();

-- RLS Policies for the chats table
ALTER TABLE public.chats ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can create their own chats"
ON public.chats FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view their own chats"
ON public.chats FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users can view public chats"
ON public.chats FOR SELECT
TO authenticated
USING (visibility = 'public');

CREATE POLICY "Users can view team chats"
ON public.chats FOR SELECT
TO authenticated
USING (visibility = 'team');

CREATE POLICY "Users can update their own chats"
ON public.chats FOR UPDATE
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own chats"
ON public.chats FOR DELETE
TO authenticated
USING (auth.uid() = user_id);

-- RLS Policies for the chat_messages table
ALTER TABLE public.chat_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can insert messages to their own chats"
ON public.chat_messages FOR INSERT
TO authenticated
WITH CHECK (
    EXISTS (
        SELECT 1 FROM public.chats
        WHERE id = chat_id AND user_id = auth.uid()
    )
);

CREATE POLICY "Users can view messages from their own chats"
ON public.chat_messages FOR SELECT
TO authenticated
USING (
    EXISTS (
        SELECT 1 FROM public.chats
        WHERE id = chat_id AND user_id = auth.uid()
    )
);

CREATE POLICY "Users can view messages from public chats"
ON public.chat_messages FOR SELECT
TO authenticated
USING (
    EXISTS (
        SELECT 1 FROM public.chats
        WHERE id = chat_id AND visibility = 'public'
    )
);

CREATE POLICY "Users can view messages from team chats"
ON public.chat_messages FOR SELECT
TO authenticated
USING (
    EXISTS (
        SELECT 1 FROM public.chats
        WHERE id = chat_id AND visibility = 'team'
    )
);

-- RLS Policies for the chat_attachments table
ALTER TABLE public.chat_attachments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can insert attachments to their own chats"
ON public.chat_attachments FOR INSERT
TO authenticated
WITH CHECK (
    EXISTS (
        SELECT 1 FROM public.chats
        WHERE id = chat_id AND user_id = auth.uid()
    )
);

CREATE POLICY "Users can view attachments from their own chats"
ON public.chat_attachments FOR SELECT
TO authenticated
USING (
    EXISTS (
        SELECT 1 FROM public.chats
        WHERE id = chat_id AND user_id = auth.uid()
    )
);

CREATE POLICY "Users can view attachments from public chats"
ON public.chat_attachments FOR SELECT
TO authenticated
USING (
    EXISTS (
        SELECT 1 FROM public.chats
        WHERE id = chat_id AND visibility = 'public'
    )
);

CREATE POLICY "Users can view attachments from team chats"
ON public.chat_attachments FOR SELECT
TO authenticated
USING (
    EXISTS (
        SELECT 1 FROM public.chats
        WHERE id = chat_id AND visibility = 'team'
    )
);

-- Grant necessary permissions
GRANT SELECT, INSERT, UPDATE, DELETE ON public.chats TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.chat_messages TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.chat_attachments TO authenticated; 