/**
 * Root instrumentation re-export
 */

import * as Sentry from "@sentry/nextjs";

// Your existing instrumentation logic (or parts of it)
function registerLegacyInstrumentation() {
  // This was originally in src/_infrastructure/monitoring/instrumentation.ts
  console.log("Legacy Instrumentation registered");
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
