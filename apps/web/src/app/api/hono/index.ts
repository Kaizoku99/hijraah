import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { prettyJSON } from "hono/pretty-json";

// Import core libraries
import { authRoutes } from "@/api/routes/auth";

import {
  initializeAutoScaling,
  getScalingState,
  shutdownAutoScaling,
} from "./lib/auto-scaling";
import { getRedisClient, isRedisHealthy } from "@/lib/redis";
import { initSentry, isSentryEnabled } from "@/lib/sentry";

// Import types

// Import middleware
import { requireAuth, requireAdmin, AuthUser } from "./middleware/auth";
import { languageDetectionMiddleware } from "./middleware/language";
import {
  performanceMiddleware,
  getPerformanceMetrics,
  resetPerformanceMetrics,
} from "./middleware/performance";
import {
  rateLimitMiddleware,
  endpointRateLimiter,
  RATE_LIMITS,
  ipRateLimiter,
  getRateLimitStatus,
} from "./middleware/rate-limit";
import {
  redisCacheMiddleware,
  redisApiCacheMiddleware,
  getRedisStats,
  clearRedisCache,
  invalidateRedisCache,
} from "@/lib/redis";
import {
  sentryErrorLoggerMiddleware,
  errorDebugHandler,
  initializeErrorLogging,
} from "./middleware/sentry-error-logger";
import {
  subscriptionRateLimit,
  getUserRateLimits,
  getUserRateUsage,
} from "./middleware/subscription-rate-limit";
import { supabaseMiddleware } from "./middleware/supabase";

// Import route handlers

import ocrRoutes from "./routes/ocr";
import { researchRoutes } from "./routes/research";
import { scrapingRoutes } from "./routes/scraping";
import { subscriptionRoutes } from "./routes/subscription";
import { vectorSearchRoutes } from "./routes/vector-search";
import {
  SubscriptionTier,
  ResourceType,
  RateLimit,
  SubscriptionLimits,
  SubscriptionRateLimits,
  SUBSCRIPTION_RATE_LIMITS,
} from "./types";

// Initialize external services
initSentry();
initializeErrorLogging();

// Configure auto-scaling based on environment
if (process.env.AUTO_SCALING_ENABLED === "true") {
  initializeAutoScaling();
}

// Create Hono app
const app = new Hono();

// Global middleware (order matters)
app.use("*", logger());
app.use("*", prettyJSON());
app.use("*", performanceMiddleware()); // Add performance tracking
app.use(
  "*",
  cors({
    origin: ["http://localhost:3000", process.env.NEXT_PUBLIC_SITE_URL || ""],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowHeaders: ["Content-Type", "Authorization", "X-Request-Id"],
    maxAge: 86400,
    credentials: true,
  })
);
app.use("*", prettyJSON());

// Language detection middleware (should be early in the chain)
app.use("*", async (c, next) => {
  await languageDetectionMiddleware({
    cookieName: "NEXT_LOCALE",
    cookieMaxAge: 365 * 24 * 60 * 60, // 1 year
  })(c, next);
});

// Error logging middleware (should be at the top to catch all errors)
app.use("*", sentryErrorLoggerMiddleware({ component: "hono-api" }));

// Supabase middleware
app.use("*", supabaseMiddleware);

// Global rate limiting (100 requests per minute)
app.use(
  "*",
  rateLimitMiddleware({
    ...RATE_LIMITS.DEFAULT,
    errorMessage: "Too many requests. Please try again later.",
  })
);

// Health check endpoint - no caching
app.get("/", async (c) => {
  const redisStatus = await isRedisHealthy();
  const sentryStatus = isSentryEnabled();

  return c.json({
    status: "ok",
    message: "Hijraah API is running",
    version: "1.0.0",
    timestamp: new Date().toISOString(),
    requestId: c.get("requestId" as any) || "none",
    services: {
      redis: redisStatus ? "healthy" : "unhealthy",
      sentry: sentryStatus ? "enabled" : "disabled",
      scaling:
        process.env.AUTO_SCALING_ENABLED === "true" ? "enabled" : "disabled",
    },
    docs: "/api-docs",
  });
});

// API documentation - use caching for this endpoint
app.get(
  "/api-docs",
  redisApiCacheMiddleware({
    ttl: 3600,
  }),
  (c) =>
    c.json({
      api: "Hijraah Immigration Platform API",
      version: "1.0.0",
      endpoints: {
        "/api/auth": "Authentication endpoints",
        "/api/research": "Research session management",
        "/api/scraping": "Web scraping with Firecrawl",
        "/api/vector-search": "Vector search and embedding",
        "/api/subscription": "Subscription management",
        "/admin": "API monitoring and administration (protected)",
      },
    })
);

// Admin/monitoring endpoints (protected with admin-level access)
const monitoringRoutes = new Hono()
  // Middleware to require admin authentication for all admin routes
  .use("*", requireAuth)
  .use("*", requireAdmin)

  // Cache statistics and management
  .get("/cache", async (c) =>
    c.json({
      success: true,
      stats: await getRedisStats(),
    })
  )
  .post("/cache/clear", async (c) => {
    const clearedKeys = await clearRedisCache();
    return c.json({
      success: true,
      message: `Cache cleared successfully (${clearedKeys} keys removed)`,
    });
  })
  .post("/cache/invalidate", async (c) => {
    const { pattern } = await c.req.json();
    if (!pattern) {
      return c.json(
        {
          success: false,
          error: "Pattern is required",
        },
        400
      );
    }

    const invalidatedKeys = await invalidateRedisCache(pattern);
    return c.json({
      success: true,
      message: `${invalidatedKeys} cache entries matching "${pattern}" invalidated`,
    });
  })

  // Rate limiting information
  .get("/rate-limits", async (c) => {
    const { key } = c.req.query();
    if (!key) {
      return c.json(
        {
          success: false,
          error: "Key parameter is required",
        },
        400
      );
    }

    return c.json({
      success: true,
      status: getRateLimitStatus(key),
    });
  })

  // Subscription rate limits
  .get("/subscription-limits", async (c) => {
    return c.json({
      success: true,
      limits: SUBSCRIPTION_RATE_LIMITS,
    });
  })

  // Get specific user's rate usage
  .get("/user-usage/:userId", async (c) => {
    const userId = c.req.param("userId");
    if (!userId) {
      return c.json(
        {
          success: false,
          error: "User ID is required",
        },
        400
      );
    }

    // Get usage for all resource types
    const apiUsage = await getUserRateUsage(userId, ResourceType.API);
    const scrapingUsage = await getUserRateUsage(userId, ResourceType.SCRAPING);
    const vectorUsage = await getUserRateUsage(userId, ResourceType.VECTOR);
    const researchUsage = await getUserRateUsage(userId, ResourceType.RESEARCH);

    return c.json({
      success: true,
      userId,
      usage: {
        api: apiUsage,
        scraping: scrapingUsage,
        vector: vectorUsage,
        research: researchUsage,
      },
    });
  })

  // Error logs
  .get("/errors", errorDebugHandler)

  // Performance metrics
  .get("/performance", (c) =>
    c.json({
      success: true,
      metrics: getPerformanceMetrics(),
    })
  )
  .post("/performance/reset", (c) => {
    resetPerformanceMetrics();
    return c.json({
      success: true,
      message: "Performance metrics reset successfully",
    });
  })

  // Auto-scaling status
  .get("/scaling", (c) =>
    c.json({
      success: true,
      enabled: process.env.AUTO_SCALING_ENABLED === "true",
      state: getScalingState(),
    })
  )

  // System status
  .get("/status", (c) => {
    const memoryUsage = process.memoryUsage();
    const uptime = process.uptime();

    return c.json({
      success: true,
      status: {
        uptime: uptime,
        memory: {
          rss: Math.round(memoryUsage.rss / 1024 / 1024) + "MB",
          heapTotal: Math.round(memoryUsage.heapTotal / 1024 / 1024) + "MB",
          heapUsed: Math.round(memoryUsage.heapUsed / 1024 / 1024) + "MB",
        },
        redis: {
          healthy: isRedisHealthy(),
          stats: getRedisStats(),
        },
        environment: process.env.NODE_ENV || "development",
      },
    });
  });

// Register monitoring routes
app.route("/admin", monitoringRoutes);

// Register subscription routes
app.route("/api/subscription", subscriptionRoutes);

// Add subscription-based rate limiting to API routes
app.use("/api/*", async (c, next) => {
  const user = c.get("user");

  // Skip if already passed through a rate limiter
  if (c.get("rateLimited" as any)) {
    return next();
  }

  // Mark as rate limited so we don't double-apply limits
  c.set("rateLimited" as any, true);

  // Get the request path to determine the resource type
  const path = c.req.path.toLowerCase();

  // Determine resource type based on path
  let resourceType = ResourceType.API;
  if (path.includes("/scraping")) {
    resourceType = ResourceType.SCRAPING;
  } else if (path.includes("/vector")) {
    resourceType = ResourceType.VECTOR;
  } else if (path.includes("/research")) {
    resourceType = ResourceType.RESEARCH;
  }

  // Apply subscription-based rate limit
  const subscriptionLimiter = subscriptionRateLimit({
    resourceType,
    errorMessage: `Rate limit exceeded for your subscription. Please upgrade your plan for higher ${resourceType} limits.`,
  });

  return subscriptionLimiter(c, next);
});

// Additional rate limits for resource-intensive endpoints
// These rate limits are in addition to the global rate limit
const scrapingLimiter = rateLimitMiddleware({
  ...RATE_LIMITS.SCRAPING,
  keyGenerator: endpointRateLimiter("scraping"),
  errorMessage: "Scraping rate limit exceeded. Please try again in a minute.",
});

const vectorSearchLimiter = rateLimitMiddleware({
  ...RATE_LIMITS.VECTOR_SEARCH,
  keyGenerator: endpointRateLimiter("vector-search"),
  errorMessage:
    "Vector search rate limit exceeded. Please try again in a minute.",
});

const researchLimiter = rateLimitMiddleware({
  ...RATE_LIMITS.RESEARCH,
  keyGenerator: endpointRateLimiter("research"),
  errorMessage:
    "Research session rate limit exceeded. Please try again in a minute.",
});

// Register route handlers with specific middleware
const researchApp = new Hono();
researchApp.use("*", researchLimiter);
researchApp.use(
  "*",
  redisApiCacheMiddleware({
    ttl: 60,
  })
); // Short cache for research endpoints
researchApp.route("/", researchRoutes);
app.route("/api/research", researchApp);

app.route("/api/auth", authRoutes);

// Create scoped apps for additional middleware
const scrapingApp = new Hono();
scrapingApp.use("*", scrapingLimiter);
scrapingApp.use(
  "*",
  redisApiCacheMiddleware({
    ttl: 300,
  })
);
scrapingApp.route("/", scrapingRoutes);
app.route("/api/scraping", scrapingApp);

// Vector search with rate limiting
const vectorSearchApp = new Hono();
vectorSearchApp.use("*", vectorSearchLimiter);
vectorSearchApp.use(
  "*",
  redisApiCacheMiddleware({
    ttl: 120,
  })
); // 2 minute cache for vector search
vectorSearchApp.route("/", vectorSearchRoutes);
app.route("/api/vector-search", vectorSearchApp);

// OCR routes
app.route("/ocr", ocrRoutes);

// Error handling
app.onError((err, c) => {
  // Log the error to Sentry if enabled
  if (isSentryEnabled()) {
    // This will be captured by the sentryErrorLoggerMiddleware
    console.error("API error:", err);
  }

  return c.json(
    {
      success: false,
      error: err.message || "An unknown error occurred",
      requestId: c.get("requestId" as any) || "unknown",
    },
    500
  );
});

// Handle graceful shutdown
process.on("SIGTERM", async () => {
  console.log("SIGTERM received, shutting down gracefully");

  // Cleanup resources
  shutdownAutoScaling();

  // Wait for pending requests to complete (not implemented)

  process.exit(0);
});

// Export the Hono app for serverless environments
export default app;

// Start the server if running directly
if (process.env.NODE_ENV !== "production") {
  const port = process.env.API_PORT || 8000;
  console.log(`🚀 Server is running on port ${port}`);
  serve({
    fetch: app.fetch,
    port: Number(port),
  });
}
