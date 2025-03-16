/**
 * Firecrawl Utility Functions
 * 
 * This file contains utilities for using Firecrawl to extract content from websites
 * and perform semantic search operations.
 */

/**
 * Extracts content from a web page using Firecrawl
 * 
 * @param url URL of the web page to extract content from
 * @returns Extracted content as HTML or plain text
 */
export async function extractWebContent(url: string): Promise<string> {
    try {
        const response = await fetch('/api/scraper/extract', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ url }),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Failed to extract web content');
        }

        const data = await response.json();
        return data.content || '';
    } catch (error: any) {
        console.error('Error extracting web content:', error);
        throw error;
    }
}

/**
 * Performs a web search using Firecrawl
 * 
 * @param query Search query
 * @param options Search options
 * @returns Search results with relevance scores
 */
export async function searchWeb(query: string, options?: SearchOptions): Promise<SearchResult[]> {
    try {
        const response = await fetch('/api/scraper/search', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                query,
                limit: options?.limit || 5,
                filter: options?.filter,
            }),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Failed to search web');
        }

        const data = await response.json();
        return data.results || [];
    } catch (error: any) {
        console.error('Error searching web:', error);
        throw error;
    }
}

/**
 * Extracts structured data from HTML content using Firecrawl
 * 
 * @param html HTML content to extract data from
 * @param schema Schema to extract (e.g., 'article', 'product', etc.)
 * @returns Extracted structured data
 */
export async function extractStructuredData(html: string, schema: string): Promise<any> {
    try {
        const response = await fetch('/api/scraper/extract-structured', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ html, schema }),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Failed to extract structured data');
        }

        const data = await response.json();
        return data.data || null;
    } catch (error: any) {
        console.error('Error extracting structured data:', error);
        throw error;
    }
}

/**
 * Search options for web search
 */
export interface SearchOptions {
    limit?: number;
    filter?: {
        domain?: string[];
        dateRange?: {
            start?: string;
            end?: string;
        };
        contentType?: string[];
    };
}

/**
 * Search result interface
 */
export interface SearchResult {
    url: string;
    title: string;
    snippet?: string;
    relevance: number;
    metadata?: Record<string, any>;
} 