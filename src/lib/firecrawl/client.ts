/**
 * Firecrawl API Client
 * 
 * Utility functions for interacting with the Firecrawl web scraping API
 */

const FIRECRAWL_API_URL = 'https://api.firecrawl.dev';
const FIRECRAWL_API_KEY = process.env.FIRECRAWL_API_KEY;

/**
 * Available scraping options
 */
export interface ScrapingOptions {
  /** Wait for specific selectors to be present before scraping */
  waitForSelectors?: string[];
  
  /** Custom CSS selectors to extract specific content */
  extractSelectors?: {
    [key: string]: string;
  };
  
  /** Emulate a mobile device */
  mobile?: boolean;
  
  /** Maximum time to wait for page load in ms */
  timeout?: number;
  
  /** Extract all links from the page */
  extractLinks?: boolean;
  
  /** Extract all images from the page */
  extractImages?: boolean;
  
  /** Wait for network to be idle */
  waitForNetworkIdle?: boolean;
}

/**
 * Scraped content result
 */
export interface ScrapedContent {
  /** The title of the page */
  title: string;
  
  /** The main content of the page */
  content: string;
  
  /** Structured data extracted using selectors */
  structuredData?: Record<string, any>;
  
  /** Metadata about the page */
  metadata: {
    url: string;
    timestamp: string;
    statusCode: number;
  };
  
  /** Extracted links if requested */
  links?: string[];
  
  /** Extracted images if requested */
  images?: string[];
}

/**
 * Scrape a single URL
 */
export async function scrapeUrl(
  url: string,
  options: ScrapingOptions = {}
): Promise<ScrapedContent> {
  if (!FIRECRAWL_API_KEY) {
    throw new Error('FIRECRAWL_API_KEY is not defined');
  }

  try {
    const response = await fetch(`${FIRECRAWL_API_URL}/scrape`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${FIRECRAWL_API_KEY}`,
      },
      body: JSON.stringify({
        url,
        ...options,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to scrape URL');
    }

    const data = await response.json();
    return data;
  } catch (error: any) {
    console.error('Error scraping URL:', error);
    throw new Error(error.message || 'Failed to scrape URL');
  }
}

/**
 * Extract structured data from a URL using AI
 */
export async function extractStructuredData(
  url: string,
  schema: Record<string, string>
): Promise<Record<string, any>> {
  if (!FIRECRAWL_API_KEY) {
    throw new Error('FIRECRAWL_API_KEY is not defined');
  }

  try {
    const response = await fetch(`${FIRECRAWL_API_URL}/extract`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${FIRECRAWL_API_KEY}`,
      },
      body: JSON.stringify({
        url,
        schema,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to extract structured data');
    }

    const data = await response.json();
    return data.result;
  } catch (error: any) {
    console.error('Error extracting structured data:', error);
    throw new Error(error.message || 'Failed to extract structured data');
  }
}

/**
 * Batch scrape multiple URLs
 */
export async function batchScrape(
  urls: string[],
  options: ScrapingOptions = {}
): Promise<ScrapedContent[]> {
  if (!FIRECRAWL_API_KEY) {
    throw new Error('FIRECRAWL_API_KEY is not defined');
  }

  try {
    const response = await fetch(`${FIRECRAWL_API_URL}/batch`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${FIRECRAWL_API_KEY}`,
      },
      body: JSON.stringify({
        urls,
        ...options,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to batch scrape URLs');
    }

    const data = await response.json();
    return data.results;
  } catch (error: any) {
    console.error('Error batch scraping URLs:', error);
    throw new Error(error.message || 'Failed to batch scrape URLs');
  }
} 