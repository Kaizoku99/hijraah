-- Schedule the scraping job to run every hour
-- This will check for any sources that are due for scraping based on their scrape_frequency
SELECT cron.schedule(
    'scrape-websites-hourly', -- job name
    '0 * * * *',             -- cron schedule (every hour at minute 0)
    $$SELECT trigger_scraping()$$  -- SQL command to run
);

-- Schedule a job to run every 10 minutes for higher-frequency sources
SELECT cron.schedule(
    'scrape-websites-frequent', -- job name
    '*/10 * * * *',            -- cron schedule (every 10 minutes)
    $$
    -- Only trigger if we have sources configured to be scraped frequently
    DO $$
    DECLARE
        frequent_sources_count INTEGER;
    BEGIN
        SELECT COUNT(*) INTO frequent_sources_count 
        FROM scraping_sources 
        WHERE is_active = true 
        AND scrape_frequency <= '1 hour'::interval;
        
        IF frequent_sources_count > 0 THEN
            PERFORM trigger_scraping();
        END IF;
    END
    $$;
    $$
);

-- Schedule cleanup of old log entries (keep 30 days of logs)
SELECT cron.schedule(
    'cleanup-scraping-logs', -- job name
    '0 0 * * *',            -- cron schedule (daily at midnight)
    $$DELETE FROM scraping_logs WHERE triggered_at < NOW() - INTERVAL '30 days'$$
); 