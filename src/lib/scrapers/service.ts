import { FirecrawlClient } from './client';
import { countryConfigs, CountryConfigType, ScrapedDataType } from './config';
import { createClient } from '@supabase/supabase-js';
import { Database } from '@/types/supabase';

export class ScraperService {
  private firecrawl: FirecrawlClient;
  private supabase: ReturnType<typeof createClient<Database>>;
  private configs: Record<string, CountryConfigType>;

  constructor(
    firecrawlApiKey: string,
    supabaseUrl: string,
    supabaseKey: string,
    configs = countryConfigs
  ) {
    this.firecrawl = new FirecrawlClient(firecrawlApiKey);
    this.supabase = createClient<Database>(supabaseUrl, supabaseKey);
    this.configs = configs;
  }

  private async saveToDatabase(data: ScrapedDataType) {
    const { error } = await this.supabase
      .from('immigration_data')
      .upsert({
        url: data.url,
        title: data.title,
        content: data.content,
        category: data.category,
        country: data.country,
        language: data.language,
        last_updated: data.lastUpdated,
        metadata: data.metadata,
      }, {
        onConflict: 'url'
      });

    if (error) {
      throw new Error(`Failed to save to database: ${error.message}`);
    }
  }

  private async detectChanges(newData: ScrapedDataType) {
    const { data: existingData } = await this.supabase
      .from('immigration_data')
      .select('content, title')
      .eq('url', newData.url)
      .single();

    if (!existingData) return;

    if (existingData.content !== newData.content || existingData.title !== newData.title) {
      await this.supabase
        .from('immigration_updates')
        .insert({
          data_id: newData.url,
          change_type: 'content_update',
          previous_content: existingData.content,
          new_content: newData.content,
        });
    }
  }

  async scrapeCountry(country: string) {
    const config = this.configs[country];
    if (!config) {
      throw new Error(`No configuration found for country: ${country}`);
    }

    const urls = config.paths.map(path => `${config.baseUrl}${path}`);
    
    try {
      const scrapedData = await this.firecrawl.batchScrapeUrls(urls, config);
      
      for (const data of scrapedData) {
        await this.detectChanges(data);
        await this.saveToDatabase(data);
      }

      return scrapedData;
    } catch (error) {
      console.error(`Failed to scrape ${country}:`, error);
      throw error;
    }
  }

  async scrapeAllCountries() {
    const results: Record<string, ScrapedDataType[]> = {};
    
    for (const country of Object.keys(this.configs)) {
      try {
        results[country] = await this.scrapeCountry(country);
      } catch (error) {
        console.error(`Failed to scrape ${country}:`, error);
        results[country] = [];
      }
    }

    return results;
  }
} 