-- Function to trigger scraping of sources due for scraping
CREATE OR REPLACE FUNCTION trigger_scraping()
RETURNS INTEGER
LANGUAGE plpgsql
SECURITY DEFINER -- Run with elevated privileges
AS $$
DECLARE
    api_response INTEGER;
    api_url TEXT;
    api_key TEXT;
    headers jsonb;
    response_status INTEGER;
BEGIN
    -- Get the API URL and key from environment variables or set directly
    -- In production, you should store these securely, e.g., in Vault or environment variables
    api_url := current_setting('app.settings.api_url', true) || '/api/scheduled-scraping';
    api_key := current_setting('app.settings.api_key', true);
    
    -- If settings not found, use default values (replace with your actual values)
    IF api_url IS NULL THEN
        api_url := 'https://your-app-url.com/api/scheduled-scraping';
    END IF;
    
    IF api_key IS NULL THEN
        api_key := 'your-secure-api-key';
    END IF;
    
    -- Set headers with API key for authentication
    headers := jsonb_build_object(
        'Content-Type', 'application/json',
        'Authorization', 'Bearer ' || api_key
    );
    
    -- Make HTTP GET request to the API
    SELECT status INTO response_status 
    FROM net.http_get(
        url := api_url,
        headers := headers
    );
    
    -- Log the result
    INSERT INTO scraping_logs (
        triggered_at,
        status_code,
        message
    ) VALUES (
        NOW(),
        response_status,
        CASE 
            WHEN response_status BETWEEN 200 AND 299 THEN 'Successful'
            ELSE 'Failed with status ' || response_status
        END
    );
    
    RETURN response_status;
END;
$$;

-- Create a logs table to track scraping job executions
CREATE TABLE IF NOT EXISTS scraping_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    triggered_at TIMESTAMPTZ NOT NULL,
    status_code INTEGER,
    message TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create index on triggered_at for efficient querying
CREATE INDEX IF NOT EXISTS idx_scraping_logs_triggered_at ON scraping_logs(triggered_at); 