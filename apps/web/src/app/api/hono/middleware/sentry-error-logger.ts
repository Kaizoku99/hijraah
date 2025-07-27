import * as Sentry from "@sentry/nextjs"; // New import for the main Sentry SDK
import { Context, Next } from "hono";
// import * as SentryLib from '../lib/sentry'; // Old import removed

// Define a common error structure
export interface ErrorLogData {
  message: string;
  path: string;
  method: string;
  timestamp: string;
  userId?: string;
  statusCode: number;
  stack?: string;
  details?: any;
  requestId?: string;
  component?: string;
  tags?: Record<string, string>;
}

// Configure error logging based on environment
const IS_PRODUCTION = process.env.NODE_ENV === "production";

// Error log storage for development (in-memory for local dev only)
const ERROR_LOGS: ErrorLogData[] = [];

// Helper function (recreated from the deleted SentryLib)
function getRequestData(c: Context): Record<string, any> {
  const headers: Record<string, string> = {};
  c.req.raw.headers.forEach((value, key) => {
    headers[key] = value;
  });

  return {
    url: c.req.url,
    method: c.req.method,
    path: c.req.path,
    headers,
    query_params: c.req.query(),
    // Avoid logging large request bodies by default for performance and privacy
    // body: c.req.header('content-type')?.includes('application/json') ? await c.req.json().catch(() => ({})) : undefined,
  };
}

/**
 * Initialize Sentry client - REMOVED (handled by global Sentry setup)
 * Call this at app startup
 */
// export function initializeErrorLogging(): void { // Entire function removed
//   SentryLib.initSentry();
// }

/**
 * Middleware to handle errors and log them centrally with Sentry
 */
export function sentryErrorLoggerMiddleware(
  options: { component?: string } = {},
) {
  return async (c: Context, next: Next) => {
    try {
      // Add request breadcrumb
      Sentry.addBreadcrumb({
        // Changed from SentryLib.addBreadcrumb
        type: "http",
        category: "http",
        data: {
          url: c.req.url,
          method: c.req.method,
          path: c.req.path,
        },
        level: "info",
      });

      // Generate a unique request ID for tracking
      const requestId = c.get("requestId") || generateRequestId();
      c.set("requestId" as any, requestId);

      // Set user context if available
      const user = c.get("user");
      if (user) {
        Sentry.setUser({
          // Changed from SentryLib.setUser
          id: user.id,
          email: user.email,
          ip_address:
            c.req.header("x-forwarded-for") ||
            c.req.header("x-real-ip") ||
            "unknown",
        });
      } else {
        // Set anonymous context
        Sentry.setUser({
          // Changed from SentryLib.setUser
          id: "anonymous",
          ip_address:
            c.req.header("x-forwarded-for") ||
            c.req.header("x-real-ip") ||
            "unknown",
        });
      }

      // Add request data to Sentry context
      Sentry.setContext("request", getRequestData(c)); // Changed from SentryLib.setContext and SentryLib.getRequestData

      await next();
    } catch (err: any) {
      // Create structured error log
      const errorLog: ErrorLogData = {
        message: err.message || "Unknown error",
        path: c.req.path,
        method: c.req.method,
        timestamp: new Date().toISOString(),
        statusCode: err.status || 500,
        userId: c.get("user")?.id,
        details: err.details,
        requestId: c.get("requestId" as any),
        component: options.component || "api",
      };

      // In development, include stack trace
      if (!IS_PRODUCTION) {
        errorLog.stack = err.stack;
      }

      // Log error
      logError(errorLog);

      // Return appropriate response to client
      const responseBody = {
        success: false,
        error: IS_PRODUCTION
          ? "Internal Server Error"
          : err.message || "Unknown error",
        ...(IS_PRODUCTION ? {} : { stack: err.stack }),
        requestId: errorLog.requestId, // Always include the request ID for support reference
      };

      // If headers aren't sent yet, add a request ID header
      c.header("X-Request-ID", errorLog.requestId || "unknown");

      // Convert numeric status code to Hono compatible status
      const status = errorLog.statusCode as 400 | 401 | 403 | 404 | 500;
      return c.json(responseBody, status);
    }
  };
}

/**
 * Function to log errors to Sentry and local systems
 */
export function logError(errorLog: ErrorLogData): void {
  if (IS_PRODUCTION) {
    // In production, send to Sentry
    const sentryContext = {
      ...errorLog,
      timestamp: errorLog.timestamp,
      userAgent: errorLog.details?.userAgent,
    };

    // Create a proper Error object for Sentry
    const error = new Error(errorLog.message);
    if (errorLog.stack) {
      error.stack = errorLog.stack;
    }

    // Set specific error metadata
    if (errorLog.component) {
      // SentryLib.setContext('component', { name: errorLog.component }); // Old way
      Sentry.setTag("component", errorLog.component); // New, more direct way for tags
    }

    if (errorLog.tags) {
      Object.entries(errorLog.tags).forEach(([key, value]) => {
        // SentryLib.setContext(key, { value }); // Old way
        Sentry.setTag(key, value); // New, more direct way for tags
      });
    }

    // Send to Sentry
    // SentryLib.captureException(error, sentryContext); // Old way
    Sentry.captureException(error, {
      // New way, pass context as second arg options
      extra: sentryContext,
    });

    // Also log to console for server logs
    console.error("🔴 API Error:", JSON.stringify(errorLog));
  } else {
    // In development, pretty print error and store locally
    console.error("🔴 API Error:");
    console.error(errorLog);

    // Store in memory for development debugging
    ERROR_LOGS.unshift(errorLog);

    // Keep only the last 100 errors in memory
    if (ERROR_LOGS.length > 100) {
      ERROR_LOGS.pop();
    }
  }
}

/**
 * Utility to manually log errors from anywhere in the code
 */
export function captureError(
  error: Error | string,
  details?: any,
  userId?: string,
  component?: string,
): void {
  const errorLog: ErrorLogData = {
    message: error instanceof Error ? error.message : error,
    path: "manual-capture",
    method: "NONE",
    timestamp: new Date().toISOString(),
    statusCode: 500,
    userId,
    details,
    stack: error instanceof Error ? error.stack : undefined,
    requestId: generateRequestId(),
    component: component || "unknown",
  };

  logError(errorLog);
}

/**
 * Get recent error logs (development only)
 */
export function getRecentErrors(limit: number = 20): ErrorLogData[] {
  if (IS_PRODUCTION) {
    return [];
  }

  return ERROR_LOGS.slice(0, limit);
}

/**
 * Generate a unique request ID
 */
function generateRequestId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substring(2, 12);
}

/**
 * Debugging endpoint that returns recent errors (development only)
 */
export function errorDebugHandler(c: Context) {
  if (IS_PRODUCTION) {
    return c.json(
      {
        success: false,
        error: "This endpoint is only available in development mode",
      },
      403,
    );
  }

  const limit = Number(c.req.query("limit") || "20");
  return c.json({
    success: true,
    errors: getRecentErrors(limit),
    count: ERROR_LOGS.length,
  });
}
