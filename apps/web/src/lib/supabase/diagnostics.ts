/**
 * Supabase Connection Diagnostics and Error Recovery
 * 
 * This utility helps diagnose and handle Supabase connectivity issues,
 * particularly DNS resolution failures and token refresh errors.
 */

import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/types/database.types';

interface ConnectionDiagnostics {
  dnsResolution: boolean;
  httpConnectivity: boolean;
  supabaseAuth: boolean;
  error?: string;
  suggestion?: string;
}

interface RetryConfig {
  maxRetries: number;
  retryDelay: number;
  backoffMultiplier: number;
}

const DEFAULT_RETRY_CONFIG: RetryConfig = {
  maxRetries: 3,
  retryDelay: 1000, // 1 second
  backoffMultiplier: 2,
};

/**
 * Diagnose Supabase connectivity issues
 */
export async function diagnoseSupabaseConnection(): Promise<ConnectionDiagnostics> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return {
      dnsResolution: false,
      httpConnectivity: false,
      supabaseAuth: false,
      error: 'Missing Supabase environment variables',
      suggestion: 'Check .env.local file for NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY',
    };
  }

  try {
    // Test 1: DNS Resolution via fetch
    const dnsTest = await fetch(supabaseUrl, { 
      method: 'HEAD',
      signal: AbortSignal.timeout(5000) // 5 second timeout
    }).catch(() => null);

    if (!dnsTest) {
      return {
        dnsResolution: false,
        httpConnectivity: false,
        supabaseAuth: false,
        error: 'DNS resolution failed or network connectivity issue',
        suggestion: 'Run fix-dns.ps1 or fix-hosts.ps1 scripts to resolve DNS issues',
      };
    }

    // Test 2: HTTP Connectivity
    if (dnsTest.status >= 400) {
      return {
        dnsResolution: true,
        httpConnectivity: false,
        supabaseAuth: false,
        error: `HTTP error: ${dnsTest.status}`,
        suggestion: 'Supabase service may be down or project may be paused',
      };
    }

    // Test 3: Supabase Auth
    const supabase = createClient<Database>(supabaseUrl, supabaseKey);
    const { error: authError } = await supabase.auth.getSession();

    if (authError?.message?.includes('ENOTFOUND')) {
      return {
        dnsResolution: false,
        httpConnectivity: false,
        supabaseAuth: false,
        error: 'DNS resolution failed in Supabase client',
        suggestion: 'DNS issue detected. Run fix-dns.ps1 or fix-hosts.ps1 scripts',
      };
    }

    return {
      dnsResolution: true,
      httpConnectivity: true,
      supabaseAuth: !authError,
      error: authError?.message,
      suggestion: authError ? 'Check Supabase configuration and authentication' : undefined,
    };

  } catch (error: any) {
    if (error.message?.includes('ENOTFOUND')) {
      return {
        dnsResolution: false,
        httpConnectivity: false,
        supabaseAuth: false,
        error: 'DNS resolution failed',
        suggestion: 'Run fix-dns.ps1 or fix-hosts.ps1 scripts to resolve DNS issues',
      };
    }

    return {
      dnsResolution: false,
      httpConnectivity: false,
      supabaseAuth: false,
      error: error.message || 'Unknown connection error',
      suggestion: 'Check network connectivity and Supabase configuration',
    };
  }
}

/**
 * Enhanced Supabase client with retry logic for network failures
 */
export function createResilientSupabaseClient(retryConfig: Partial<RetryConfig> = {}) {
  const config = { ...DEFAULT_RETRY_CONFIG, ...retryConfig };
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

  const supabase = createClient<Database>(supabaseUrl, supabaseKey, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
    },
    global: {
      fetch: createRetryFetch(config),
    },
  });

  return supabase;
}

/**
 * Create a fetch function with retry logic for network failures
 */
function createRetryFetch(config: RetryConfig) {
  return async (url: RequestInfo | URL, options?: RequestInit): Promise<Response> => {
    let lastError: Error | null = null;
    
    for (let attempt = 0; attempt <= config.maxRetries; attempt++) {
      try {
        // Add timeout to prevent hanging requests
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
        
        const response = await fetch(url, {
          ...options,
          signal: controller.signal,
        });
        
        clearTimeout(timeoutId);
        
        // If successful or client error (4xx), return immediately
        if (response.ok || (response.status >= 400 && response.status < 500)) {
          return response;
        }
        
        // For server errors (5xx), retry
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        
      } catch (error: any) {
        lastError = error;
        
        // Don't retry on DNS errors or abort errors
        if (error.name === 'AbortError' || error.message?.includes('ENOTFOUND')) {
          throw error;
        }
        
        // Don't retry on last attempt
        if (attempt === config.maxRetries) {
          break;
        }
        
        // Wait before retrying
        const delay = config.retryDelay * Math.pow(config.backoffMultiplier, attempt);
        console.log(`Retrying request in ${delay}ms (attempt ${attempt + 1}/${config.maxRetries})`);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
    
    throw lastError || new Error('Max retries exceeded');
  };
}

/**
 * Middleware helper to handle authentication errors gracefully
 */
export async function safeGetUser(supabase: any): Promise<{ user: any; error: any }> {
  try {
    const { data: { user }, error } = await supabase.auth.getUser();
    return { user, error };
  } catch (error: any) {
    // Handle DNS/network errors
    if (error.message?.includes('ENOTFOUND')) {
      console.error('DNS resolution failed for Supabase:', {
        error: error.message,
        suggestion: 'Run fix-dns.ps1 or fix-hosts.ps1 to resolve DNS issues',
        timestamp: new Date().toISOString(),
      });
      
      return { 
        user: null, 
        error: { 
          message: 'DNS resolution failed', 
          code: 'DNS_ERROR',
          suggestion: 'Run fix-dns.ps1 or fix-hosts.ps1 scripts'
        } 
      };
    }
    
    // Handle other network errors
    return { user: null, error };
  }
}

/**
 * Check if error is related to DNS/network issues
 */
export function isDnsError(error: any): boolean {
  return error?.message?.includes('ENOTFOUND') ||
         error?.code === 'ENOTFOUND' ||
         error?.errno === 'ENOTFOUND';
}

/**
 * Get helpful error message for DNS issues
 */
export function getDnsErrorHelp(): string {
  return `
DNS Resolution Failed for Supabase

Quick Fixes:
1. Run: fix-dns.ps1 (changes DNS to Google Public DNS)
2. Run: fix-hosts.ps1 (adds entry to hosts file)
3. Use mobile hotspot temporarily
4. Contact network administrator if on corporate network

The Supabase project is healthy, this is a local DNS issue.
  `.trim();
}

export type { ConnectionDiagnostics, RetryConfig };
