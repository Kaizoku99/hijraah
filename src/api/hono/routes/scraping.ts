import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { z } from 'zod';
import { createClient } from '@supabase/supabase-js';
import { load } from 'cheerio';
import TurndownService from 'turndown';
import { requireAuth } from '../middleware/supabase';

// Initialize Supabase client
const getSupabaseClient = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
  return createClient(supabaseUrl, supabaseKey);
};

// Initialize Turndown service for HTML to Markdown conversion
const turndownService = new TurndownService({
  headingStyle: 'atx',
  codeBlockStyle: 'fenced',
});

// Create a Hono app for scraping routes
export const scrapingRoutes = new Hono();

// Schema for scraping validation
const scrapeUrlSchema = z.object({
  url: z.string().url("Invalid URL"),
  selector: z.string().optional(),
  saveToStorage: z.boolean().optional().default(false),
});

// Schema for bulk scraping validation
const bulkScrapeSchema = z.object({
  urls: z.array(z.string().url("Invalid URL")),
  selector: z.string().optional(),
  saveToStorage: z.boolean().optional().default(false),
});

// Single URL scraping endpoint - Protected route
scrapingRoutes.post(
  '/scrape',
  requireAuth,
  zValidator('json', scrapeUrlSchema),
  async (c) => {
    try {
      const { url, selector, saveToStorage } = c.req.valid('json');
      const user = c.get('user');
      const supabase = c.get('supabase');
      
      // Call the Firecrawl scraping function
      const { content, metadata } = await scrapeUrl(url, selector);
      
      // Save to Supabase storage if requested
      let storageUrl = null;
      if (saveToStorage) {
        storageUrl = await saveToSupabaseStorage(supabase, content, metadata, user.id);
      }
      
      return c.json({
        success: true,
        url,
        content,
        metadata,
        storageUrl,
      });
    } catch (error: any) {
      console.error('Scraping error:', error);
      return c.json({
        success: false,
        error: error.message || 'An unknown error occurred',
      }, 500);
    }
  }
);

// Bulk URL scraping endpoint - Protected route
scrapingRoutes.post(
  '/bulk-scrape',
  requireAuth,
  zValidator('json', bulkScrapeSchema),
  async (c) => {
    try {
      const { urls, selector, saveToStorage } = c.req.valid('json');
      const user = c.get('user');
      const supabase = c.get('supabase');
      
      // Process each URL
      const results = await Promise.all(
        urls.map(async (url) => {
          try {
            const { content, metadata } = await scrapeUrl(url, selector);
            
            // Save to storage if requested
            let storageUrl = null;
            if (saveToStorage) {
              storageUrl = await saveToSupabaseStorage(supabase, content, metadata, user.id);
            }
            
            return {
              success: true,
              url,
              content: content.substring(0, 500) + '...', // Truncate for response
              metadata,
              storageUrl,
            };
          } catch (error: any) {
            return {
              success: false,
              url,
              error: error.message || 'Scraping failed',
            };
          }
        })
      );
      
      return c.json({
        success: true,
        results,
      });
    } catch (error: any) {
      console.error('Bulk scraping error:', error);
      return c.json({
        success: false,
        error: error.message || 'An unknown error occurred',
      }, 500);
    }
  }
);

// Get scraping history - Protected route
scrapingRoutes.get(
  '/history',
  requireAuth,
  async (c) => {
    try {
      const user = c.get('user');
      const supabase = c.get('supabase');
      
      // Get user's scraping history
      const { data, error } = await supabase
        .from('scrape_history')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
      
      if (error) throw new Error(error.message);
      
      return c.json({
        success: true,
        history: data,
      });
    } catch (error: any) {
      console.error('Get scraping history error:', error);
      return c.json({
        success: false,
        error: error.message || 'An unknown error occurred',
      }, 500);
    }
  }
);

// Delete scraping history entry - Protected route
scrapingRoutes.delete(
  '/history/:id',
  requireAuth,
  async (c) => {
    try {
      const id = c.req.param('id');
      const user = c.get('user');
      const supabase = c.get('supabase');
      
      // First, get the history entry to find the storage path
      const { data: historyEntry, error: getError } = await supabase
        .from('scrape_history')
        .select('storage_path')
        .eq('id', id)
        .eq('user_id', user.id)
        .single();
      
      if (getError) throw new Error(getError.message);
      
      // Delete from storage if it exists
      if (historyEntry?.storage_path) {
        const { error: storageError } = await supabase
          .storage
          .from('content-scrapes')
          .remove([historyEntry.storage_path]);
          
        if (storageError) console.error('Storage delete error:', storageError);
      }
      
      // Delete from the history table
      const { error } = await supabase
        .from('scrape_history')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id);
      
      if (error) throw new Error(error.message);
      
      return c.json({
        success: true,
        message: 'Scrape history entry deleted',
      });
    } catch (error: any) {
      console.error('Delete scraping history error:', error);
      return c.json({
        success: false,
        error: error.message || 'An unknown error occurred',
      }, 500);
    }
  }
);

/**
 * Firecrawl integration - Scrape URL and extract content
 */
async function scrapeUrl(url: string, selector?: string): Promise<{ content: string; metadata: any }> {
  try {
    // Make request to the URL
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
      },
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch URL: ${response.status} ${response.statusText}`);
    }
    
    const html = await response.text();
    
    // Load HTML into Cheerio
    const $ = load(html);
    
    // Extract metadata
    const metadata = {
      title: $('title').text().trim() || url,
      description: $('meta[name="description"]').attr('content') || '',
      ogTitle: $('meta[property="og:title"]').attr('content') || '',
      ogDescription: $('meta[property="og:description"]').attr('content') || '',
      ogImage: $('meta[property="og:image"]').attr('content') || '',
      url: url,
      scrapedAt: new Date().toISOString(),
    };
    
    // Extract content based on selector or default to body
    let contentHtml: string;
    if (selector && $(selector).length > 0) {
      contentHtml = $(selector).html() || '';
    } else {
      // Default content extraction strategy
      // Remove unwanted elements
      $('script, style, nav, footer, header, aside, .advertisement, .ads, .banner').remove();
      
      // Get the main content
      const mainContent = $('main, article, #content, .content, .main, .article, .post');
      if (mainContent.length > 0) {
        contentHtml = mainContent.html() || '';
      } else {
        contentHtml = $('body').html() || '';
      }
    }
    
    // Convert HTML to Markdown
    const markdown = turndownService.turndown(contentHtml);
    
    return {
      content: markdown,
      metadata,
    };
  } catch (error: any) {
    console.error(`Error scraping URL (${url}):`, error);
    throw new Error(`Failed to scrape content: ${error.message}`);
  }
}

/**
 * Save scraped content to Supabase Storage
 */
async function saveToSupabaseStorage(
  supabase: any,
  content: string, 
  metadata: any, 
  userId: string
): Promise<string | null> {
  try {
    const timestamp = Date.now();
    const filename = `scrapes/${userId}/${timestamp}_${encodeURIComponent(metadata.title || 'untitled')}.md`;
    
    // Upload content to storage
    const { data, error } = await supabase
      .storage
      .from('content-scrapes')
      .upload(filename, new Blob([content], { type: 'text/markdown' }), {
        contentType: 'text/markdown',
        upsert: true,
      });
    
    if (error) throw error;
    
    // Get public URL for the file
    const { data: urlData } = supabase
      .storage
      .from('content-scrapes')
      .getPublicUrl(filename);
    
    // Log scrape in database
    await supabase
      .from('scrape_history')
      .insert({
        user_id: userId,
        url: metadata.url,
        title: metadata.title,
        storage_path: filename,
        public_url: urlData.publicUrl,
        metadata,
        created_at: new Date().toISOString(),
      });
    
    return urlData.publicUrl;
  } catch (error: any) {
    console.error('Error saving to storage:', error);
    return null;
  }
} 