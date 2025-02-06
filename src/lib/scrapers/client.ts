import { CountryConfigType, ScrapedData, ScrapedDataType } from './config';

export class FirecrawlClient {
  private apiKey: string;
  private baseUrl: string;

  constructor(apiKey: string, baseUrl = 'https://api.firecrawl.dev') {
    this.apiKey = apiKey;
    this.baseUrl = baseUrl;
  }

  async scrapeUrl(url: string, config: CountryConfigType): Promise<ScrapedDataType> {
    const response = await fetch(`${this.baseUrl}/v1/scrape`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify({
        url,
        formats: ['markdown'],
        selectors: config.selectors,
      }),
    });

    if (!response.ok) {
      throw new Error(`Failed to scrape ${url}: ${response.statusText}`);
    }

    const data = await response.json();
    
    const scrapedData = {
      url,
      title: data.data.metadata.title || '',
      content: data.data.markdown || '',
      category: data.data.metadata.category || 'uncategorized',
      country: config.baseUrl.includes('canada.ca') ? 'canada' : 
              config.baseUrl.includes('homeaffairs.gov.au') ? 'australia' : 'unknown',
      language: config.language,
      lastUpdated: data.data.metadata.lastUpdated ? new Date(data.data.metadata.lastUpdated) : undefined,
      metadata: data.data.metadata || {},
    };

    return ScrapedData.parse(scrapedData);
  }

  async batchScrapeUrls(urls: string[], config: CountryConfigType): Promise<ScrapedDataType[]> {
    const response = await fetch(`${this.baseUrl}/v1/batch/scrape`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify({
        urls,
        formats: ['markdown'],
        selectors: config.selectors,
      }),
    });

    if (!response.ok) {
      throw new Error(`Failed to batch scrape: ${response.statusText}`);
    }

    const data = await response.json();
    
    return data.data.map((item: any) => {
      const scrapedData = {
        url: item.url,
        title: item.metadata.title || '',
        content: item.markdown || '',
        category: item.metadata.category || 'uncategorized',
        country: config.baseUrl.includes('canada.ca') ? 'canada' : 
                config.baseUrl.includes('homeaffairs.gov.au') ? 'australia' : 'unknown',
        language: config.language,
        lastUpdated: item.metadata.lastUpdated ? new Date(item.metadata.lastUpdated) : undefined,
        metadata: item.metadata || {},
      };
      return ScrapedData.parse(scrapedData);
    });
  }
} 