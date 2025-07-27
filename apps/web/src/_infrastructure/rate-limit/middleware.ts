/**
 * Rate Limiting Middleware
 *
 * Centralized middleware for rate limiting across different frameworks
 * Based on Context7 best practices for Upstash Redis rate limiting
 */

import {
  RateLimitService,
  type RateLimitResult,
} from "@/services/rate-limit-service";
import { type RateLimitAction, type UserTier } from "./config";

export interface RateLimitMiddlewareOptions {
  action: RateLimitAction;
  getUserTier?: (context: any) => UserTier | Promise<UserTier>;
  getIdentifier?: (context: any) => string | Promise<string>;
  onRateLimitExceeded?: (
    result: RateLimitResult,
    context: any
  ) => Response | Promise<Response>;
  skipSuccessfulRequests?: boolean;
}

/**
 * Create Hono middleware for rate limiting
 * Following Context7 patterns for edge environments
 */
export function createHonoRateLimitMiddleware(
  options: RateLimitMiddlewareOptions
) {
  const {
    action,
    getUserTier = () => "standard",
    getIdentifier = (c) =>
      c.req.header("x-forwarded-for") ??
      c.req.header("x-real-ip") ??
      "anonymous",
    onRateLimitExceeded,
    skipSuccessfulRequests = false,
  } = options;

  return async (c: any, next: () => Promise<void>) => {
    try {
      // Get user tier and identifier
      const tier = await getUserTier(c);
      const identifier = await getIdentifier(c);

      // Check rate limit
      const result = await RateLimitService.isAllowed(identifier, action, tier);

      // Set rate limit headers (Context7 standard)
      const headers = RateLimitService.getRateLimitHeaders(result);
      Object.entries(headers).forEach(([key, value]) => {
        c.header(key, value);
      });

      if (!result.success) {
        // Use custom handler or default response
        if (onRateLimitExceeded) {
          return onRateLimitExceeded(result, c);
        }

        return c.json(
          {
            success: false,
            error: "Rate limit exceeded",
            limit: result.limit,
            remaining: result.remaining,
            reset: result.reset.toISOString(),
            retryAfter: Math.ceil((result.reset.getTime() - Date.now()) / 1000),
          },
          429
        );
      }

      // Continue to the next middleware or route handler
      await next();

      // Wait for analytics to be submitted (Context7 recommendation)
      if (result.pending && !skipSuccessfulRequests) {
        // Use context.waitUntil if available (Cloudflare/Vercel)
        if ("waitUntil" in c && typeof c.waitUntil === "function") {
          c.waitUntil(result.pending);
        } else {
          // Fallback for other environments
          result.pending.catch((error) => {
            console.warn("Rate limit analytics submission failed:", error);
          });
        }
      }
    } catch (error) {
      console.error("Rate limiting middleware error:", error);

      // Fail open - continue execution if rate limiting fails
      await next();
    }
  };
}

/**
 * Create Next.js middleware for rate limiting
 * Compatible with Next.js 13+ App Router
 */
export function createNextRateLimitMiddleware(
  options: RateLimitMiddlewareOptions
) {
  const {
    action,
    getUserTier = () => "standard",
    getIdentifier = (req) =>
      req.ip ??
      req.headers.get("x-forwarded-for") ??
      req.headers.get("x-real-ip") ??
      "anonymous",
    onRateLimitExceeded,
  } = options;

  return async (request: Request, context?: any) => {
    try {
      // Get user tier and identifier
      const tier = await getUserTier({ request, context });
      const identifier = await getIdentifier(request);

      // Check rate limit
      const result = await RateLimitService.isAllowed(identifier, action, tier);

      // Prepare headers
      const headers = new Headers(RateLimitService.getRateLimitHeaders(result));

      if (!result.success) {
        if (onRateLimitExceeded) {
          return onRateLimitExceeded(result, { request, context });
        }

        headers.set("Content-Type", "application/json");
        return new Response(
          JSON.stringify({
            success: false,
            error: "Rate limit exceeded",
            limit: result.limit,
            remaining: result.remaining,
            reset: result.reset.toISOString(),
            retryAfter: Math.ceil((result.reset.getTime() - Date.now()) / 1000),
          }),
          {
            status: 429,
            headers,
          }
        );
      }

      // Handle analytics submission
      if (result.pending && context?.waitUntil) {
        context.waitUntil(result.pending);
      }

      return new Response(null, { headers });
    } catch (error) {
      console.error("Next.js rate limiting middleware error:", error);
      // Fail open
      return new Response(null);
    }
  };
}

/**
 * Rate limiting utility for API routes
 * Can be used directly in API handlers
 */
export async function withRateLimit<T>(
  identifier: string,
  action: RateLimitAction,
  tier: UserTier,
  handler: () => Promise<T>
): Promise<{ success: boolean; data?: T; rateLimitResult: RateLimitResult }> {
  const rateLimitResult = await RateLimitService.isAllowed(
    identifier,
    action,
    tier
  );

  if (!rateLimitResult.success) {
    return {
      success: false,
      rateLimitResult,
    };
  }

  try {
    const data = await handler();
    return {
      success: true,
      data,
      rateLimitResult,
    };
  } finally {
    // Ensure analytics are submitted
    if (rateLimitResult.pending) {
      rateLimitResult.pending.catch((error) => {
        console.warn("Rate limit analytics submission failed:", error);
      });
    }
  }
}

/**
 * Helper to get user identifier from various request types
 * Following Context7 recommendations for identifier resolution
 */
export function getClientIdentifier(request: Request | any): string {
  // Try multiple headers in order of preference
  const identifiers = [
    request.headers?.get?.("cf-connecting-ip"), // Cloudflare
    request.headers?.get?.("x-forwarded-for")?.split(",")[0]?.trim(), // Proxy
    request.headers?.get?.("x-real-ip"), // Nginx
    request.headers?.get?.("x-client-ip"), // Apache
    request.ip, // Direct property
    "anonymous", // Fallback
  ];

  return (
    identifiers.find((id) => id && typeof id === "string" && id !== "") ??
    "anonymous"
  );
}
