import { ScraperService } from '@/lib/scrapers/service';
import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';
import { z } from 'zod';

const requestSchema = z.object({
  countries: z.array(z.string()).optional(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { countries } = requestSchema.parse(body);

    const scraperService = new ScraperService(
      process.env.FIRECRAWL_API_KEY!,
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    if (countries && countries.length > 0) {
      const results: Record<string, any> = {};
      for (const country of countries) {
        results[country] = await scraperService.scrapeCountry(country);
      }
      return NextResponse.json({ success: true, data: results });
    } else {
      const results = await scraperService.scrapeAllCountries();
      return NextResponse.json({ success: true, data: results });
    }
  } catch (error) {
    console.error('Scraping error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to scrape data' },
      { status: 500 }
    );
  }
}

// Rate limit the API to prevent abuse
export const config = {
  api: {
    bodyParser: {
      sizeLimit: '1mb',
    },
  },
  runtime: 'edge',
}; 