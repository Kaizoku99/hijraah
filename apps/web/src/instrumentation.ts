/**
 * Root instrumentation re-export
 */

// Import polyfills first to ensure they're loaded before any other code
import "@/lib/polyfills";

import * as Sentry from "@sentry/nextjs";

// Your existing instrumentation logic (or parts of it)
function registerLegacyInstrumentation() {
  // This was originally in src/_infrastructure/monitoring/instrumentation.ts
  console.log("Legacy Instrumentation registered");
  
  // Add global unhandled promise rejection handler (Node.js runtime only)
  if (typeof process !== 'undefined' && process.on && process.env.NEXT_RUNTIME !== 'edge') {
    process.on('unhandledRejection', (reason: any, promise: Promise<any>) => {
      console.error('🚨 Unhandled Promise Rejection at:', promise);
      console.error('🚨 Reason:', reason);
      
      // Handle specific error types gracefully
      if (reason && typeof reason === 'object') {
        if (reason.code === 'ECONNRESET') {
          console.warn('⚠️  Connection reset error handled:', reason.message || reason);
          return; // Don't crash the process for connection resets
        }
        
        if (reason.message && reason.message.includes('aborted')) {
          console.warn('⚠️  Request aborted error handled:', reason.message);
          return; // Don't crash the process for aborted requests
        }

        if (reason.message && reason.message.includes('Gateway request failed')) {
          console.warn('⚠️  AI Gateway error handled:', reason.message);
          return; // Don't crash the process for gateway errors
        }
      }
      
      // For other errors, log them but don't crash in development
      if (process.env.NODE_ENV !== 'production') {
        console.error('💥 Unhandled rejection in development mode');
      } else {
        // In production, we might want to report this to Sentry
        if (typeof Sentry !== 'undefined' && Sentry.captureException) {
          Sentry.captureException(reason);
        }
      }
    });

    process.on('uncaughtException', (error: Error) => {
      console.error('🚨 Uncaught Exception:', error);
      
      // Handle specific error types
      if (error.message && error.message.includes('ECONNRESET')) {
        console.warn('⚠️  Connection reset exception handled:', error.message);
        return;
      }
      
      // In production, log and potentially exit gracefully
      if (process.env.NODE_ENV === 'production') {
        if (typeof Sentry !== 'undefined' && Sentry.captureException) {
          Sentry.captureException(error);
        }
        console.error('💥 Process will exit due to uncaught exception');
        if (typeof process !== 'undefined' && process.exit && process.env.NEXT_RUNTIME !== 'edge') {
          process.exit(1);
        }
      }
    });
  }
  
  // Add any other critical logic from your original register function here if needed
}

export async function register() {
  // Call your legacy instrumentation
  registerLegacyInstrumentation();

  // Sentry wizard's registration logic
  if (process.env.NEXT_RUNTIME === "nodejs") {
    // Dynamically import server config to avoid bundling it in edge runtime
    await import("../../../sentry.server.config"); // Path to root directory
  }

  if (process.env.NEXT_RUNTIME === "edge") {
    // Dynamically import edge config to avoid bundling it in nodejs runtime
    await import("../../../sentry.edge.config"); // Path to root directory
  }
}

// The Sentry wizard also suggested this for capturing errors during Next.js request handling
// This might be useful if you have custom error handling in `NextResponse` or similar.
// However, global-error.tsx and Sentry's general error capturing should catch most things.
// You can uncomment if you find it necessary or if Sentry support recommends it for specific scenarios.
// export const onRequestError = Sentry.captureRequestError;
