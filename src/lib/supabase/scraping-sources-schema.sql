-- Create enum type for source categories
CREATE TYPE source_category AS ENUM (
  'government',
  'legal',
  'news',
  'blog',
  'forum',
  'other'
);

-- Create table for scraping sources
CREATE TABLE IF NOT EXISTS scraping_sources (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  url TEXT NOT NULL UNIQUE,
  category source_category NOT NULL DEFAULT 'other',
  description TEXT,
  trust_score INTEGER NOT NULL DEFAULT 50,
  last_scraped TIMESTAMPTZ,
  scrape_frequency INTERVAL DEFAULT '1 day'::INTERVAL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL
);

-- Add index on URL for faster lookups
CREATE INDEX IF NOT EXISTS idx_scraping_sources_url ON scraping_sources(url);

-- Create table for source validation history
CREATE TABLE IF NOT EXISTS source_validations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  source_id UUID NOT NULL REFERENCES scraping_sources(id) ON DELETE CASCADE,
  validator_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  score INTEGER NOT NULL,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Create table for scraped content history
CREATE TABLE IF NOT EXISTS scrape_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  source_id UUID NOT NULL REFERENCES scraping_sources(id) ON DELETE CASCADE,
  artifact_id UUID REFERENCES artifacts(id) ON DELETE SET NULL,
  status TEXT NOT NULL,
  error_message TEXT,
  content_hash TEXT,
  has_changes BOOLEAN DEFAULT false,
  change_summary TEXT,
  scraped_at TIMESTAMPTZ DEFAULT now()
);

-- Create function to update trust score based on validations
CREATE OR REPLACE FUNCTION update_source_trust_score() 
RETURNS TRIGGER AS $$
BEGIN
  UPDATE scraping_sources
  SET trust_score = (
    SELECT GREATEST(10, LEAST(100, AVG(score)::INTEGER))
    FROM source_validations
    WHERE source_id = NEW.source_id
  ),
  updated_at = now()
  WHERE id = NEW.source_id;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to update trust score when new validation is added
CREATE TRIGGER update_trust_score_on_validation
AFTER INSERT OR UPDATE ON source_validations
FOR EACH ROW
EXECUTE FUNCTION update_source_trust_score();

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION update_timestamp() 
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to update timestamps on scraping_sources
CREATE TRIGGER update_scraping_sources_timestamp
BEFORE UPDATE ON scraping_sources
FOR EACH ROW
EXECUTE FUNCTION update_timestamp(); 