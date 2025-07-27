import { serve } from "@hono/node-server";
import { serveStatic } from "@hono/node-server/serve-static";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { Hono, Context } from "hono";
import { cors } from "hono/cors";
import { HTTPException } from "hono/http-exception";
import { languageDetector } from "hono/language";
import { prettyJSON } from "hono/pretty-json";
import { secureHeaders } from "hono/secure-headers";

import { authRoutes } from "@/api/routes/auth"; // Corrected path
import { locales, defaultLocale } from "@/i18n";
import { logger } from "@/lib/logger";

import { shutdownAutoScaling } from "./lib/auto-scaling";
import { isRedisHealthy } from "./lib/redis";

import api from "./index";

import type { Socket } from "net";

// Import routes
// import { userRoutes } from './routes/user.route'; // Commented out: file not found
// import { chatRoutes } from './routes/chat.route'; // Commented out: file not found
// import { immigrationRoutes } from './routes/immigration.route'; // Commented out: file not found
// import { documentRoutes } from './routes/document.route'; // Commented out: file not found
// import { countryRoutes } from './routes/country.route'; // Commented out: file not found

// Import health checking utilities

// Initialize Redis client for rate limiting
const redis = Redis.fromEnv();

// Create a basic global rate limiter
const globalRateLimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(500, "60 s"), // 500 requests per 60 seconds per identifier
  prefix: "ratelimit:global",
  analytics: true,
});

// For graceful shutdown
let server: ReturnType<typeof serve> | null = null;
const connections = new Set<Socket>();

// Create the Hono app
const app = new Hono();

// Global middleware
app.use("*", prettyJSON());
app.use("*", secureHeaders());
app.use(
  "*",
  cors({
    origin: (origin) => {
      const allowedOrigins = [
        "http://localhost:3000",
        "https://hijraah.com",
        "https://www.hijraah.com",
      ];
      const allowedPattern = /^https:\/\/.*\.hijraah\.com$/;

      if (
        origin &&
        (allowedOrigins.includes(origin) || allowedPattern.test(origin))
      ) {
        return origin;
      }
      return null;
    },
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowHeaders: ["Content-Type", "Authorization", "Accept-Language"],
    exposeHeaders: ["Content-Length", "Content-Language"],
    credentials: true,
    maxAge: 86400,
  }),
);

// Add language detection middleware
app.use(
  "*",
  languageDetector({
    supportedLanguages: Array.from(locales),
    fallbackLanguage: defaultLocale,
    order: ["path", "querystring", "cookie", "header"],
    lookupCookie: "NEXT_LOCALE",
    lookupQueryString: "locale",
    caches: ["cookie"],
    debug: process.env.NODE_ENV === "development",
  }),
);

// Rate limiting middleware using the basic global limiter
app.use("*", async (c, next) => {
  const ip = c.req.header("x-forwarded-for") || "unknown";
  // Use a consistent identifier, e.g., IP address
  const identifier = `global_${ip}`;
  try {
    const { success, limit, remaining, reset } =
      await globalRateLimiter.limit(identifier);

    // Set rate limit headers
    c.header("X-RateLimit-Limit", String(limit));
    c.header("X-RateLimit-Remaining", String(remaining));
    c.header("X-RateLimit-Reset", String(new Date(reset).getTime()));

    if (!success) {
      logger.warn("Global rate limit exceeded", {
        ip,
        path: c.req.path,
        method: c.req.method,
      });
      return c.json(
        {
          error: "Too Many Requests",
          message: "Rate limit exceeded. Please try again later.",
        },
        429,
      );
    }
    await next();
  } catch (error) {
    // Ensure error is an Error instance for the logger
    const errorToLog =
      error instanceof Error ? error : new Error(String(error));
    logger.error("Error during global rate limiting", errorToLog, {
      ip,
      path: c.req.path,
      method: c.req.method,
    });
    // Allow request to proceed if rate limiter fails, but log the error
    await next();
  }
});

// Routes
app.route("/auth", authRoutes);
// app.route('/user', userRoutes); // Commented out
// app.route('/chat', chatRoutes); // Commented out
// app.route('/immigration', immigrationRoutes); // Commented out
// app.route('/documents', documentRoutes); // Commented out
// app.route('/countries', countryRoutes); // Commented out
app.route("/api", api);

// Static files
app.use("/static/*", serveStatic({ root: "./public" }));

// Basic route
app.get("/", (c) => {
  const language = c.get("language") || defaultLocale;
  const greeting =
    language === "ar"
      ? "مرحبًا بك في واجهة برمجة تطبيقات هجرة!"
      : language === "fr"
        ? "Bienvenue à l'API Hijraah !"
        : language === "es"
          ? "¡Bienvenido a la API de Hijraah!"
          : "Welcome to the Hijraah API!";

  return c.json({
    status: "ok",
    message: greeting,
    version: "v1.0.0",
    language,
  });
});

// 404 handler - Use Hono's default notFound
// app.notFound(routeNotFound); // Commented out

// Add global error handler as a final fallback
app.onError((err: Error | HTTPException, c: Context) => {
  const requestId = c.req.header("x-request-id") || "unknown";
  // Check if it's an HTTPException to get the status, otherwise default to 500
  const status = err instanceof HTTPException ? err.status : 500;

  // Ensure error is an Error instance for the logger
  const errorToLog = err instanceof Error ? err : new Error(String(err));

  logger.error(`Unhandled error in API request ${requestId}`, errorToLog, {
    path: c.req.path,
    method: c.req.method,
    requestId,
    status,
  });

  if (process.env.NODE_ENV === "production") {
    return c.json(
      {
        success: false,
        error:
          status === 500 ? "An unexpected error occurred" : errorToLog.message,
        requestId,
      },
      status,
    );
  } else {
    return c.json(
      {
        success: false,
        error: errorToLog.message,
        stack: errorToLog.stack,
        requestId,
      },
      status,
    );
  }
});

// Define the port
const PORT = process.env.API_PORT || 3001;

// Set up health check function for readiness probes
async function healthCheck() {
  try {
    // Check all dependencies
    const redisStatus = await isRedisHealthy();

    if (!redisStatus) {
      logger.warn("Health check failed: Redis connection issue");
      return false;
    }

    return true;
  } catch (error: any) {
    logger.error("Health check error", error);
    return false;
  }
}

// Set up graceful shutdown
function setupGracefulShutdown(serverInstance: ReturnType<typeof serve>) {
  // Track connections
  serverInstance.on("connection", (conn: Socket) => {
    connections.add(conn);
    conn.on("close", () => {
      connections.delete(conn);
    });
  });

  async function shutDown() {
    logger.info("Shutting down API server...");
    serverInstance.close((err) => {
      if (err) {
        logger.error("Error closing HTTP server", err);
      }
      logger.info("HTTP server closed");
    });

    // Close all open connections gracefully
    connections.forEach((conn) => conn.end());
    setTimeout(() => {
      connections.forEach((conn) => conn.destroy());
      connections.clear();
    }, 5000);

    // Shut down other resources
    try {
      await shutdownAutoScaling();
      logger.info("Auto-scaling shut down");

      setTimeout(() => process.exit(0), 1000);
    } catch (error: any) {
      logger.error("Error during graceful shutdown", error);
      process.exit(1);
    }
  }

  // Set up signal handlers
  process.on("SIGTERM", shutDown);
  process.on("SIGINT", shutDown);

  // Handle uncaught exceptions
  process.on("uncaughtException", (error) => {
    logger.error("Uncaught exception", error);
    shutDown();
  });

  // Handle unhandled promise rejections
  process.on("unhandledRejection", (reason, promise) => {
    logger.error("Unhandled promise rejection", undefined, { reason, promise });
    shutDown();
  });
}

// Start the server with health check
async function startServer() {
  try {
    // Check health before starting
    const isHealthy = await healthCheck();

    if (!isHealthy) {
      logger.error(
        "Health check failed during startup, unable to start server",
      );
      process.exit(1);
    }

    // Start the server
    server = serve({
      fetch: app.fetch,
      port: Number(PORT),
    });

    // Set up connection tracking and graceful shutdown
    setupGracefulShutdown(server);

    logger.info(`API Server is running on port ${PORT}`);

    // Perform periodic health checks
    const healthCheckInterval = setInterval(async () => {
      if (!(await healthCheck())) {
        logger.warn("Health check failed during runtime");
      }
    }, 60000);

    // Clear interval on shutdown
    const cleanShutdown = () => clearInterval(healthCheckInterval);
    process.on("SIGTERM", cleanShutdown);
    process.on("SIGINT", cleanShutdown);

    return server;
  } catch (error: any) {
    logger.error("Failed to start API server", error);
    process.exit(1);
  }
}

// Export the start function and server for testing
export { app, startServer };

// Start the server if this file is run directly
if (require.main === module) {
  startServer();
}
