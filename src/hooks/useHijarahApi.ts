import { useState, useCallback } from 'react';
import { createClient } from '@supabase/supabase-js';

/**
 * Custom hook for communicating with the Hijraah API
 * This provides a unified interface for making API calls to our Hono backend
 */
export function useHijraahApi() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const supabase = createClient();

  /**
   * Make an API request to our Hono backend
   */
  const apiRequest = useCallback(async <T = any>(
    endpoint: string,
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET',
    body?: any,
    customHeaders?: Record<string, string>
  ): Promise<{ data: T | null; error: string | null }> => {
    // Set loading state
    setLoading(true);
    setError(null);

    try {
      // Get the current session
      const { data: sessionData } = await supabase.auth.getSession();
      const accessToken = sessionData?.session?.access_token;

      // Prepare headers
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        ...customHeaders,
      };

      // Add authorization header if user is logged in
      if (accessToken) {
        headers['Authorization'] = `Bearer ${accessToken}`;
      }

      // Prepare request options
      const requestOptions: RequestInit = {
        method,
        headers,
        credentials: 'include',
      };

      // Add body for non-GET requests
      if (body && method !== 'GET') {
        requestOptions.body = JSON.stringify(body);
      }

      // Make the request
      const apiBase = '/api'; // Next.js API route that proxies to Hono
      const response = await fetch(`${apiBase}/${endpoint}`, requestOptions);
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'An unknown error occurred');
      }

      return { data: result as T, error: null };
    } catch (err: any) {
      const errorMessage = err.message || 'An unknown error occurred';
      setError(errorMessage);
      return { data: null, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, [supabase]);

  // Research session methods
  const research = {
    // Start a new research session
    start: async (query: string, maxDepth: number = 3) => {
      return apiRequest<{ sessionId: string; message: string }>('research/start', 'POST', { query, maxDepth });
    },

    // Get a research session by ID
    getSession: async (sessionId: string) => {
      return apiRequest<{
        session: any;
        sources: any[];
        findings: any[];
      }>(`research/${sessionId}`);
    },

    // Get all research sessions for the current user
    getUserSessions: async () => {
      return apiRequest<{ sessions: any[] }>('research/user/sessions');
    },

    // Cancel a research session
    cancel: async (sessionId: string) => {
      return apiRequest<{ message: string }>(`research/${sessionId}/cancel`, 'POST');
    },
  };

  // Vector search methods
  const vectorSearch = {
    // Create an embedding
    createEmbedding: async (text: string, metadata?: any, collectionId?: string) => {
      return apiRequest<{ embeddingId: string; message: string }>('vector-search/embed', 'POST', { text, metadata, collectionId });
    },

    // Search for similar content
    search: async (query: string, limit: number = 10, threshold: number = 0.7, collectionId?: string) => {
      return apiRequest<{ results: any[] }>('vector-search/search', 'POST', { query, limit, threshold, collectionId });
    },

    // Bulk embed content
    bulkEmbed: async (texts: { text: string; metadata?: any }[], collectionId?: string) => {
      return apiRequest<{
        processedCount: number;
        failedCount: number;
        results: any[];
      }>('vector-search/bulk-embed', 'POST', { texts, collectionId });
    },

    // Delete an embedding
    deleteEmbedding: async (id: string) => {
      return apiRequest<{ message: string }>(`vector-search/embeddings/${id}`, 'DELETE');
    },
  };

  // Web scraping methods
  const scraping = {
    // Scrape a single URL
    scrapeUrl: async (url: string, selector?: string, saveToStorage: boolean = true) => {
      return apiRequest<{ content: string; metadata: any; storageUrl?: string }>('scraping/scrape', 'POST', { url, selector, saveToStorage });
    },

    // Bulk scrape multiple URLs
    bulkScrape: async (urls: string[], selector?: string, saveToStorage: boolean = true) => {
      return apiRequest<{ results: any[] }>('scraping/bulk-scrape', 'POST', { urls, selector, saveToStorage });
    },

    // Get user's scraping history
    getHistory: async () => {
      return apiRequest<{ history: any[] }>('scraping/history');
    },

    // Delete a scraping history entry
    deleteHistoryEntry: async (id: string) => {
      return apiRequest<{ message: string }>(`scraping/history/${id}`, 'DELETE');
    },
  };

  // Authentication methods
  const auth = {
    // Get user profile
    getProfile: async () => {
      return apiRequest<{ user: any; profile: any }>('auth/profile');
    },

    // Update user profile
    updateProfile: async (profileData: { firstName: string; lastName: string; avatarUrl?: string }) => {
      return apiRequest<{ profile: any; message: string }>('auth/profile', {
        method: 'PUT',
        body: profileData,
      });
    },
  };

  // Add admin methods
  const admin = {
    // Cache management
    getCacheStats: async () => {
      return apiRequest('/admin/cache');
    },
    
    clearCache: async () => {
      return apiRequest('/admin/cache/clear', {
        method: 'POST'
      });
    },
    
    invalidateCache: async (pattern: string) => {
      return apiRequest('/admin/cache/invalidate', {
        method: 'POST',
        body: { pattern },
      });
    },
    
    // Rate limiting
    getRateLimitStatus: async (key: string) => {
      return apiRequest(`/admin/rate-limits?key=${encodeURIComponent(key)}`);
    },
    
    // Performance metrics
    getPerformanceMetrics: async () => {
      return apiRequest('/admin/performance');
    },
    
    resetPerformanceMetrics: async () => {
      return apiRequest('/admin/performance/reset', {
        method: 'POST'
      });
    },
    
    // System status
    getSystemStatus: async () => {
      return apiRequest('/admin/status');
    },
    
    // Error logs
    getErrorLogs: async (limit?: number) => {
      return apiRequest(`/admin/errors${limit ? `?limit=${limit}` : ''}`);
    }
  };

  // Return the API object
  return {
    loading,
    error,
    research,
    vectorSearch,
    scraping,
    auth,
    admin,
    apiRequest,
  };
} 