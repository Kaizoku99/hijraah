import { Context, Next } from "hono";

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

// Error log storage for development
const ERROR_LOGS: ErrorLogData[] = [];

/**
 * Middleware to handle errors and log them centrally
 */
export function errorLoggerMiddleware(options: { component?: string } = {}) {
  return async (c: Context, next: Next) => {
    // Generate a unique request ID for tracking
    const requestId = generateRequestId();
    c.set("requestId", requestId);

    try {
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
        requestId,
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
        requestId, // Always include the request ID for support reference
      };

      // If headers aren't sent yet, add a request ID header
      c.header("X-Request-ID", requestId);

      // Convert numeric status code to Hono compatible status
      const status = errorLog.statusCode as 400 | 401 | 403 | 404 | 500;
      return c.json(responseBody, status);
    }
  };
}

/**
 * Function to log errors to the appropriate service
 * This can be expanded to send errors to external services
 */
export function logError(errorLog: ErrorLogData): void {
  if (IS_PRODUCTION) {
    // In production, this would send to a logging service
    // For example: Sentry, LogRocket, Datadog, etc.
    console.error(JSON.stringify(errorLog));

    // Example integration (commented out)
    /*
    import * as Sentry from '@sentry/node';
    
    Sentry.captureException(new Error(errorLog.message), {
      extra: errorLog,
      tags: {
        path: errorLog.path,
        userId: errorLog.userId,
      },
    });
    */
  } else {
    // In development, pretty print error
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
