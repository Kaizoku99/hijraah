import { CountryConfigType } from './config';

// Define a simpler return type for the client
interface ScrapeResult {
  url: string;
  markdown?: string; // Prefer markdown if available
  html?: string;
  metadata: Record<string, any>; // Keep original metadata
  success: boolean;
  error?: string;
  changeTracking?: { // Added changeTracking property
    previousScrapeAt: string | null;
    changeStatus: 'new' | 'same' | 'changed' | 'removed';
    visibility: 'visible' | 'hidden';
    diff?: {
      text?: string;
      json?: Record<string, any>;
    };
    json?: Record<string, {
      previous: any;
      current: any;
    }>;
  };
}

export class FirecrawlClient {
  private apiKey: string;
  private baseUrl: string;

  constructor(apiKey: string, baseUrl = 'https://api.firecrawl.dev') {
    this.apiKey = apiKey;
    // Ensure API key is provided
    if (!this.apiKey) {
      throw new Error('Firecrawl API key is required.');
    }
    this.baseUrl = baseUrl;
  }

  async scrapeUrl(url: string, config: Partial<CountryConfigType>): Promise<ScrapeResult> {
    try {
      const response = await fetch(`${this.baseUrl}/v0/scrape`, { // Use v0 endpoint
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify({
          url,
          pageOptions: { // Use pageOptions for markdown/html
            formats: ['markdown', 'html', 'changeTracking'], // Added changeTracking format
            // Pass relevant selectors from config if needed, 
            // but AutoRAG might handle extraction better. Let's keep it simple for now.
            // includeHtml: true, // Example option
            changeTrackingOptions: {
              modes: ["git-diff"], // Enable git-diff mode by default
            }
          }
          // Pass other options based on Firecrawl API v0 if necessary
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: response.statusText }));
        return { 
          url, 
          success: false, 
          error: `Failed to scrape ${url}: ${response.status} ${errorData?.message || 'Unknown error'}`,
          metadata: {}
        };
      }

      const data = await response.json();
      
      // Return raw data structure from Firecrawl v0 scrape
      return { 
        url,
        success: data.success,
        markdown: data.data?.markdown,
        html: data.data?.html,
        metadata: data.data?.metadata || {},
        changeTracking: data.data?.changeTracking, // Added changeTracking to the response
        error: data.success ? undefined : data.error
      };

    } catch (error: any) {
        console.error(`Error in Firecrawl scrapeUrl for ${url}:`, error);
        return { 
          url, 
          success: false, 
          error: error.message || 'Client-side fetch error',
          metadata: {}
        };
    }
  }

  // Batch scraping might not be needed if running sequentially in Edge Function
  // Or could be adapted similarly to scrapeUrl
  /*
  async batchScrapeUrls(urls: string[], config: Partial<CountryConfigType>): Promise<ScrapeResult[]> {
    // ... implementation similar to scrapeUrl using /v0/scrape/bulk endpoint ...
    // Note: Check Firecrawl documentation for the exact batch endpoint and payload structure for v0
    // This implementation is less critical if the Edge Function processes URLs sequentially or in parallel batches itself.
    return []; // Placeholder
  }
  */
} 