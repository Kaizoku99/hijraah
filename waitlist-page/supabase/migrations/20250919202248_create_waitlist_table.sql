-- Create the waitlist table
CREATE TABLE IF NOT EXISTS waitlist (
    id BIGSERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    source VARCHAR(100) DEFAULT 'landing_page',
    metadata JSONB,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create an index on email for faster lookups
CREATE INDEX IF NOT EXISTS idx_waitlist_email ON waitlist(email);

-- Create an index on created_at for analytics
CREATE INDEX IF NOT EXISTS idx_waitlist_created_at ON waitlist(created_at);

-- Enable Row Level Security (RLS)
ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;

-- Create policy for inserting (anyone can add to waitlist)
CREATE POLICY "Anyone can insert waitlist entries" ON waitlist
    FOR INSERT WITH CHECK (true);

-- Create policy for reading (only service role can read all entries)
CREATE POLICY "Service role can read waitlist" ON waitlist
    FOR SELECT USING (auth.role() = 'service_role');

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_waitlist_updated_at BEFORE UPDATE ON waitlist
    FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

-- Create a view for analytics (optional)
CREATE OR REPLACE VIEW waitlist_analytics AS
SELECT 
    DATE(created_at) as signup_date,
    COUNT(*) as signups_count,
    COUNT(*) OVER (ORDER BY DATE(created_at)) as cumulative_signups
FROM waitlist 
GROUP BY DATE(created_at)
ORDER BY signup_date;