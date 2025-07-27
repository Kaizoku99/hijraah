/// <reference lib="deno.ns" />

import { randomUUID } from "node:crypto";

import { crypto } from "https://deno.land/std@0.177.0/crypto/mod.ts";
import { encode } from "https://deno.land/std@0.177.0/encoding/base64.ts";
import { createClient } from "npm:@supabase/supabase-js@2.38.4";
import { OpenAI } from "npm:openai@4.20.1";
import { z } from "npm:zod@3.22.4";

// Declare EdgeRuntime for background processing
declare const EdgeRuntime:
  | {
      waitUntil: (promise: Promise<unknown>) => void;
    }
  | undefined;

// Constants
const CACHE_TTL_SECONDS = 3600; // 1 hour cache
const RATE_LIMIT_MAX = 10; // 10 requests per time window
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute window
const MAX_CONTENT_LENGTH = 100000; // Maximum content length

// ==================== Type Definitions ====================
interface AnalyzeRequest {
  content: string;
  query: string;
  depth?: number;
  cacheKey?: string;
  skipCache?: boolean;
}

interface AnalyzeResponse {
  success: boolean;
  summary: string;
  findings: string[];
  relevance?: number;
  credibility?: number;
  error?: string;
  cached?: boolean;
  requestId?: string;
  processingTimeMs?: number;
}

interface MetricsData {
  requestCount: number;
  errorCount: number;
  cacheHits: number;
  cacheMisses: number;
  rateLimitHits: number;
  totalLatencyMs: number;
  openaiTokensUsed: number;
}

interface RateLimitBucket {
  ip: string;
  count: number;
  resetAt: number;
}

// Zod schema for input validation
const analyzeRequestSchema = z.object({
  content: z.string().min(1).max(MAX_CONTENT_LENGTH),
  query: z.string().min(3).max(500),
  depth: z.number().min(1).max(5).optional().default(1),
  skipCache: z.boolean().optional().default(false),
  cacheKey: z.string().optional(),
});

// ==================== Initialize Clients ====================
// Initialize OpenAI client with env variable
const openai = new OpenAI({
  apiKey: Deno.env.get("OPENAI_API_KEY"),
});

// Initialize Supabase client for cache storage
const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";
const supabase = createClient(supabaseUrl, supabaseKey);

// ==================== In-Memory Storage ====================
// Simple in-memory metrics collector
const metrics: MetricsData = {
  requestCount: 0,
  errorCount: 0,
  cacheHits: 0,
  cacheMisses: 0,
  rateLimitHits: 0,
  totalLatencyMs: 0,
  openaiTokensUsed: 0,
};

// In-memory rate limiter (resets on function restart)
const rateLimitBuckets: RateLimitBucket[] = [];

// ==================== Helper Functions ====================
// CORS headers for all responses
const corsHeaders = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-IP",
};

/**
 * Create a standardized response with proper headers
 */
function createResponse(data: AnalyzeResponse, status: number): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: corsHeaders,
  });
}

/**
 * Create an error response
 */
function createErrorResponse(
  message: string,
  status: number,
  requestId: string,
): Response {
  metrics.errorCount++;

  return createResponse(
    {
      success: false,
      summary: "",
      findings: [],
      error: message,
      requestId,
    },
    status,
  );
}

/**
 * Generate a cache key based on content and query
 */
async function generateCacheKey(
  content: string,
  query: string,
): Promise<string> {
  // Create a hash of the content and query for cache key
  const encoder = new TextEncoder();
  const data = encoder.encode(`${query}:${content.substring(0, 1000)}`);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

/**
 * Get client IP from the request
 */
function getClientIP(req: Request): string {
  // Try to get IP from headers (assuming proper forwarding)
  const forwardedFor = req.headers.get("x-forwarded-for");
  if (forwardedFor) {
    const ips = forwardedFor.split(",").map((ip) => ip.trim());
    if (ips.length > 0) return ips[0];
  }

  // Fallback to a custom header
  const clientIP = req.headers.get("x-client-ip");
  if (clientIP) return clientIP;

  // Use a default if we can't determine the IP
  return "unknown-ip";
}

/**
 * Check if the request is rate limited
 */
function checkRateLimit(ip: string): boolean {
  const now = Date.now();

  // Clean up expired rate limit entries
  while (rateLimitBuckets.length > 0 && rateLimitBuckets[0].resetAt < now) {
    rateLimitBuckets.shift();
  }

  // Find the bucket for this IP
  let bucket = rateLimitBuckets.find((b) => b.ip === ip);

  if (!bucket) {
    // Create a new bucket if none exists
    bucket = {
      ip,
      count: 0,
      resetAt: now + RATE_LIMIT_WINDOW_MS,
    };
    rateLimitBuckets.push(bucket);
  }

  // Check if over limit
  if (bucket.count >= RATE_LIMIT_MAX) {
    metrics.rateLimitHits++;
    return true;
  }

  // Increment count
  bucket.count++;
  return false;
}

/**
 * Check the cache for a previous analysis result
 */
async function checkCache(cacheKey: string): Promise<AnalyzeResponse | null> {
  try {
    const { data, error } = await supabase
      .from("analysis_cache")
      .select("*")
      .eq("cache_key", cacheKey)
      .gt("expires_at", new Date().toISOString())
      .single();

    if (error || !data) {
      metrics.cacheMisses++;
      return null;
    }

    metrics.cacheHits++;
    return JSON.parse(data.result) as AnalyzeResponse;
  } catch (error) {
    console.error(
      `Cache lookup error: ${error instanceof Error ? error.message : String(error)}`,
    );
    metrics.cacheMisses++;
    return null;
  }
}

/**
 * Save analysis result to cache
 */
async function saveToCache(
  cacheKey: string,
  result: AnalyzeResponse,
): Promise<void> {
  try {
    const expiresAt = new Date();
    expiresAt.setSeconds(expiresAt.getSeconds() + CACHE_TTL_SECONDS);

    const { error } = await supabase.from("analysis_cache").upsert(
      {
        cache_key: cacheKey,
        result: JSON.stringify(result),
        created_at: new Date().toISOString(),
        expires_at: expiresAt.toISOString(),
      },
      { onConflict: "cache_key" },
    );

    if (error) {
      console.error(`Cache save error: ${error.message}`);
    }
  } catch (error) {
    console.error(
      `Cache save error: ${error instanceof Error ? error.message : String(error)}`,
    );
  }
}

/**
 * Perform content analysis using OpenAI
 */
async function analyzeContent(
  content: string,
  query: string,
  depth: number,
  requestId: string,
): Promise<AnalyzeResponse> {
  const startTime = performance.now();

  try {
    // Sanitize inputs
    const sanitizedContent = content
      .replace(/[^\w\s.,?!;:'"()\[\]{}<>-]/g, "")
      .substring(0, 15000);

    const sanitizedQuery = query
      .replace(/[^\w\s.,?!;:'"()-]/g, "")
      .substring(0, 500);

    // Generate analysis prompt
    const prompt = `
You are a research analyst expert in analyzing and extracting information from content.
You will be given content from a web page and a research query.
Your task is to analyze the content and extract the most relevant information related to the query.

RESEARCH QUERY: "${sanitizedQuery}"

CONTENT:
${sanitizedContent}

Depth level: ${depth} (Higher means more detailed analysis)

Please provide:

1. A concise summary of the content as it relates to the research query (100-200 words)
2. A list of key findings or facts extracted from the content (up to 8 items)
3. Determine the relevance and credibility of this content to the research query (scale 0-10)

FORMAT YOUR RESPONSE IN JSON:
{
  "summary": "Concise summary here",
  "findings": ["Finding 1", "Finding 2", "Finding 3", ...],
  "relevance": 7,
  "credibility": 8
}
`;

    // Process the OpenAI API call
    const response = await openai.chat.completions.create({
      model: "gpt-4-turbo",
      messages: [
        {
          role: "system",
          content:
            "You are a research analyst that extracts information from content and provides structured analysis.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.2,
      max_tokens: 1500,
      response_format: { type: "json_object" },
    });

    // Track token usage for metrics
    const tokensUsed = response.usage?.total_tokens || 0;
    metrics.openaiTokensUsed += tokensUsed;

    // Parse the response
    const analysisText = response.choices[0]?.message?.content || "{}";
    let analysis;

    try {
      analysis = JSON.parse(analysisText);
    } catch (parseError) {
      console.error(
        `[${requestId}] Failed to parse OpenAI response:`,
        parseError,
      );

      // Attempt to extract JSON from the response if it's not properly formatted
      const jsonMatch = analysisText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        try {
          analysis = JSON.parse(jsonMatch[0]);
        } catch (extractError) {
          console.error(
            `[${requestId}] Failed to extract JSON from response:`,
            extractError,
          );
          analysis = {
            summary: "Failed to parse analysis",
            findings: ["Error processing content"],
            relevance: 0,
            credibility: 0,
          };
        }
      } else {
        analysis = {
          summary: "Failed to parse analysis",
          findings: ["Error processing content"],
          relevance: 0,
          credibility: 0,
        };
      }
    }

    const processingTimeMs = Math.round(performance.now() - startTime);
    metrics.totalLatencyMs += processingTimeMs;

    // Return the analysis
    return {
      success: true,
      summary: analysis.summary || "No summary available",
      findings: analysis.findings || [],
      relevance: analysis.relevance || 0,
      credibility: analysis.credibility || 0,
      requestId,
      processingTimeMs,
    };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    console.error(`[${requestId}] Error in analyze function:`, errorMessage);
    metrics.errorCount++;

    return {
      success: false,
      summary: "Analysis failed",
      findings: [],
      error: errorMessage,
      requestId,
    };
  }
}

// ==================== Metrics Endpoint Handler ====================
/**
 * Handle metrics requests
 */
async function handleMetricsRequest(
  req: Request,
  requestId: string,
): Promise<Response> {
  // Require an admin token for metrics
  const authHeader = req.headers.get("authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return createErrorResponse("Authorization required", 401, requestId);
  }

  const token = authHeader.split(" ")[1];
  const adminToken = Deno.env.get("ADMIN_API_TOKEN");

  if (!adminToken || token !== adminToken) {
    return createErrorResponse("Invalid token", 403, requestId);
  }

  // Return current metrics
  return createResponse(
    {
      success: true,
      summary: "Metrics data",
      findings: [
        `Total requests: ${metrics.requestCount}`,
        `Error count: ${metrics.errorCount}`,
        `Cache hits: ${metrics.cacheHits}`,
        `Cache misses: ${metrics.cacheMisses}`,
        `Rate limit hits: ${metrics.rateLimitHits}`,
        `Avg latency: ${metrics.requestCount ? Math.round(metrics.totalLatencyMs / metrics.requestCount) : 0}ms`,
        `OpenAI tokens used: ${metrics.openaiTokensUsed}`,
      ],
      requestId,
    },
    200,
  );
}

// ==================== Main Handler ====================
console.info("Analyze function starting...");

// Main handler using Deno.serve
Deno.serve(async (req: Request) => {
  const requestId = randomUUID();
  const startTime = performance.now();
  metrics.requestCount++;

  console.info(
    `[${requestId}] Request received: ${req.method} ${new URL(req.url).pathname}`,
  );

  // Handle CORS preflight request
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: corsHeaders,
    });
  }

  try {
    // Only allow POST requests
    if (req.method !== "POST") {
      return createErrorResponse("Method not allowed", 405, requestId);
    }

    // Check the path
    const url = new URL(req.url);
    const pathname = url.pathname;

    // Handle metrics endpoint
    if (pathname === "/analyze/metrics") {
      return handleMetricsRequest(req, requestId);
    }

    // Check if the path is /analyze
    if (pathname !== "/analyze") {
      return createErrorResponse("Endpoint not found", 404, requestId);
    }

    // Check rate limits
    const clientIP = getClientIP(req);
    if (checkRateLimit(clientIP)) {
      return createErrorResponse(
        "Rate limit exceeded. Please try again later.",
        429,
        requestId,
      );
    }

    // Parse and validate request body
    let requestBody: AnalyzeRequest;
    try {
      const rawBody = await req.json();
      const validatedBody = analyzeRequestSchema.safeParse(rawBody);

      if (!validatedBody.success) {
        return createErrorResponse(
          `Invalid request: ${validatedBody.error.message}`,
          400,
          requestId,
        );
      }

      requestBody = validatedBody.data;
    } catch (error) {
      return createErrorResponse("Invalid JSON body", 400, requestId);
    }

    // Destructure validated request
    const {
      content,
      query,
      depth = 1,
      skipCache = false,
      cacheKey: providedCacheKey,
    } = requestBody;

    // Generate a cache key if not provided
    const cacheKey =
      providedCacheKey || (await generateCacheKey(content, query));
    console.info(`[${requestId}] Cache key: ${cacheKey.substring(0, 10)}...`);

    // Check cache unless skipCache is true
    let result: AnalyzeResponse | null = null;
    if (!skipCache) {
      result = await checkCache(cacheKey);
      if (result) {
        console.info(`[${requestId}] Cache hit`);
        // Add metadata to cached result
        result.cached = true;
        result.requestId = requestId;

        const processingTimeMs = Math.round(performance.now() - startTime);
        metrics.totalLatencyMs += processingTimeMs;

        return createResponse(
          {
            ...result,
            processingTimeMs,
          },
          200,
        );
      }
    }

    console.info(
      `[${requestId}] Analyzing content with query: "${query.substring(0, 50)}..." (depth: ${depth})`,
    );

    // Process analysis request using OpenAI
    const analysisResult = await analyzeContent(
      content,
      query,
      depth,
      requestId,
    );

    // Store result in cache if successful
    if (analysisResult.success && !skipCache) {
      // Use EdgeRuntime.waitUntil for caching if available
      const cachePromise = saveToCache(cacheKey, analysisResult);

      if (typeof EdgeRuntime !== "undefined") {
        EdgeRuntime.waitUntil(
          cachePromise.catch((err) => {
            console.error(`[${requestId}] Cache save error:`, err);
          }),
        );
      } else {
        await cachePromise;
      }
    }

    // Return the analysis
    return createResponse(analysisResult, 200);
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    console.error(`[${requestId}] Error in request handling:`, errorMessage);

    return createErrorResponse(errorMessage, 500, requestId);
  }
});
