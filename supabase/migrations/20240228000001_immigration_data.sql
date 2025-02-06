-- Enable the vector extension if not already enabled
CREATE EXTENSION IF NOT EXISTS vector;

-- Create immigration_data table
CREATE TABLE immigration_data (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    url TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    category VARCHAR(100) NOT NULL,
    country VARCHAR(100) NOT NULL,
    language VARCHAR(10) NOT NULL,
    last_updated TIMESTAMP WITH TIME ZONE,
    metadata JSONB DEFAULT '{}'::jsonb,
    embedding vector(1536),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create immigration_updates table for tracking changes
CREATE TABLE immigration_updates (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    data_id TEXT REFERENCES immigration_data(url),
    change_type VARCHAR(50) NOT NULL,
    previous_content TEXT,
    new_content TEXT NOT NULL,
    detected_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_immigration_data
        FOREIGN KEY(data_id) 
        REFERENCES immigration_data(url)
        ON DELETE CASCADE
);

-- Create indexes for better query performance
CREATE INDEX idx_immigration_data_country ON immigration_data(country);
CREATE INDEX idx_immigration_data_language ON immigration_data(language);
CREATE INDEX idx_immigration_data_category ON immigration_data(category);
CREATE INDEX idx_immigration_data_last_updated ON immigration_data(last_updated);
CREATE INDEX idx_immigration_updates_data_id ON immigration_updates(data_id);
CREATE INDEX idx_immigration_updates_detected_at ON immigration_updates(detected_at);

-- Add vector similarity search index
CREATE INDEX immigration_data_embedding_idx ON immigration_data 
USING ivfflat (embedding vector_cosine_ops)
WITH (lists = 100);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for immigration_data
CREATE TRIGGER update_immigration_data_updated_at
    BEFORE UPDATE ON immigration_data
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security
ALTER TABLE immigration_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE immigration_updates ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Enable read access for authenticated users" ON immigration_data
    FOR SELECT
    TO authenticated
    USING (true);

CREATE POLICY "Enable write access for service role only" ON immigration_data
    FOR ALL
    TO service_role
    USING (true)
    WITH CHECK (true);

CREATE POLICY "Enable read access for authenticated users" ON immigration_updates
    FOR SELECT
    TO authenticated
    USING (true);

CREATE POLICY "Enable write access for service role only" ON immigration_updates
    FOR ALL
    TO service_role
    USING (true)
    WITH CHECK (true); 