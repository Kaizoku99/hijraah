module.exports = {
  "[project]/apps/web/src/instrumentation.ts [instrumentation-edge] (ecmascript)":
    (__turbopack_context__) => {
      "use strict";

      var { g: global, __dirname } = __turbopack_context__;
      {
        /**
         * Root instrumentation re-export
         */ __turbopack_context__.s({
          register: () => register,
        });
        // Your existing instrumentation logic (or parts of it)
        function registerLegacyInstrumentation() {
          // This was originally in src/_infrastructure/monitoring/instrumentation.ts
          console.log("Legacy Instrumentation registered");
          // Add any other critical logic from your original register function here if needed
        }
        async function register() {
          // Call your legacy instrumentation
          registerLegacyInstrumentation();
          // Sentry wizard's registration logic
          if (("TURBOPACK compile-time truthy", 1)) {
            // Dynamically import server config to avoid bundling it in edge runtime
            await __turbopack_context__.r(
              "[project]/sentry.server.config.ts [instrumentation-edge] (ecmascript, async loader)",
            )(__turbopack_context__.i); // Path to root directory
          }
          if (("TURBOPACK compile-time falsy", 0)) {
            ("TURBOPACK unreachable");
          }
        } // The Sentry wizard also suggested this for capturing errors during Next.js request handling
        // This might be useful if you have custom error handling in `NextResponse` or similar.
        // However, global-error.tsx and Sentry's general error capturing should catch most things.
        // You can uncomment if you find it necessary or if Sentry support recommends it for specific scenarios.
        // export const onRequestError = Sentry.captureRequestError;
      }
    },
};

//# sourceMappingURL=apps_web_src_instrumentation_ts_ca0e7495._.js.map
