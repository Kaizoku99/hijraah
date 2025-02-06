DO $$
BEGIN
    -- Check if vector extension is available and installed
    IF EXISTS (
        SELECT 1 
        FROM pg_available_extensions 
        WHERE name = 'vector' 
        AND installed_version IS NOT NULL
    ) THEN
        -- Add vector embedding column to chat_messages
        ALTER TABLE chat_messages
        ADD COLUMN IF NOT EXISTS embedding vector(1536);

        -- Create index on embedding column for similarity search
        -- Uncomment if you need similarity search
        -- CREATE INDEX IF NOT EXISTS chat_messages_embedding_idx 
        -- ON chat_messages USING ivfflat (embedding vector_cosine_ops);
    END IF;
END
$$;