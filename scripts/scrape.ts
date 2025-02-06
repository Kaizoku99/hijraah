import { ScraperService } from '../src/lib/scrapers/service';
import dotenv from 'dotenv';
import path from 'path';

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

async function main() {
  if (!process.env.FIRECRAWL_API_KEY) {
    throw new Error('FIRECRAWL_API_KEY is required');
  }
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
    throw new Error('NEXT_PUBLIC_SUPABASE_URL is required');
  }
  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
    throw new Error('SUPABASE_SERVICE_ROLE_KEY is required');
  }

  const scraperService = new ScraperService(
    process.env.FIRECRAWL_API_KEY,
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );

  console.log('Starting scraping job...');
  
  try {
    const results = await scraperService.scrapeAllCountries();
    console.log('Scraping completed successfully');
    console.log('Results:', JSON.stringify(results, null, 2));
  } catch (error) {
    console.error('Scraping failed:', error);
    process.exit(1);
  }
}

main(); 