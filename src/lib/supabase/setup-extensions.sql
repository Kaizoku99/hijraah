-- Enable the pg_cron extension for scheduled tasks
CREATE EXTENSION IF NOT EXISTS pg_cron;

-- Grant usage to postgres user (already granted by default in Supabase)
GRANT USAGE ON SCHEMA cron TO postgres;

-- Enable access to the pg_net extension (needed for HTTP requests)
CREATE EXTENSION IF NOT EXISTS pg_net; 