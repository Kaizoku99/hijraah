(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push([
  "chunks/[root-of-the-server]__2b4d01ae._.js",
  {
    "[externals]/node:buffer [external] (node:buffer, cjs)": function (
      __turbopack_context__,
    ) {
      var {
        g: global,
        __dirname,
        m: module,
        e: exports,
      } = __turbopack_context__;
      {
        const mod = __turbopack_context__.x("node:buffer", () =>
          require("node:buffer"),
        );

        module.exports = mod;
      }
    },
    "[project]/sentry.edge.config.ts [instrumentation] (ecmascript)": (
      __turbopack_context__,
    ) => {
      "use strict";

      var { g: global, __dirname } = __turbopack_context__;
      {
        // This file configures the initialization of Sentry for edge features (middleware, edge routes, and so on).
        // The config you add here will be used whenever one of the edge features is loaded.
        // Note that this config is unrelated to the Vercel Edge Runtime and is also required when running locally.
        // https://docs.sentry.io/platforms/javascript/guides/nextjs/
        __turbopack_context__.s({});
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$nextjs$40$9$2e$30$2e$0_$40$open_9120321d361c9aa9100da32b64ecc80e$2f$node_modules$2f40$sentry$2f$nextjs$2f$build$2f$esm$2f$edge$2f$index$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__$3c$locals$3e$__ =
          __turbopack_context__.i(
            "[project]/node_modules/.pnpm/@sentry+nextjs@9.30.0_@open_9120321d361c9aa9100da32b64ecc80e/node_modules/@sentry/nextjs/build/esm/edge/index.js [instrumentation] (ecmascript) <locals>",
          );
        (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$nextjs$40$9$2e$30$2e$0_$40$open_9120321d361c9aa9100da32b64ecc80e$2f$node_modules$2f40$sentry$2f$nextjs$2f$build$2f$esm$2f$edge$2f$index$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__$3c$locals$3e$__[
          "init"
        ])({
          dsn: process.env.SENTRY_DSN,
          // Define how likely traces are sampled. Adjust this value in production, or use tracesSampler for greater control.
          tracesSampleRate: 1,
          // Setting this option to true will print useful information to the console while you're setting up Sentry.
          debug: false,
        });
      }
    },
    "[project]/apps/web/src/instrumentation.ts [instrumentation] (ecmascript)":
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
            if (("TURBOPACK compile-time falsy", 0)) {
              ("TURBOPACK unreachable");
            }
            if (("TURBOPACK compile-time truthy", 1)) {
              // Dynamically import edge config to avoid bundling it in nodejs runtime
              await Promise.resolve().then(() =>
                __turbopack_context__.i(
                  "[project]/sentry.edge.config.ts [instrumentation] (ecmascript)",
                ),
              ); // Path to root directory
            }
          } // The Sentry wizard also suggested this for capturing errors during Next.js request handling
          // This might be useful if you have custom error handling in `NextResponse` or similar.
          // However, global-error.tsx and Sentry's general error capturing should catch most things.
          // You can uncomment if you find it necessary or if Sentry support recommends it for specific scenarios.
          // export const onRequestError = Sentry.captureRequestError;
        }
      },
    '[project]/apps/web/edge-wrapper.js { MODULE => "[project]/apps/web/src/instrumentation.ts [instrumentation] (ecmascript)" } [instrumentation] (ecmascript)':
      function (__turbopack_context__) {
        var {
          g: global,
          __dirname,
          m: module,
          e: exports,
        } = __turbopack_context__;
        {
          self._ENTRIES ||= {};
          const modProm = Promise.resolve().then(() =>
            __turbopack_context__.i(
              "[project]/apps/web/src/instrumentation.ts [instrumentation] (ecmascript)",
            ),
          );
          modProm.catch(() => {});
          self._ENTRIES["middleware_instrumentation"] = new Proxy(modProm, {
            get(modProm, name) {
              if (name === "then") {
                return (res, rej) => modProm.then(res, rej);
              }
              let result = (...args) =>
                modProm.then((mod) => (0, mod[name])(...args));
              result.then = (res, rej) =>
                modProm.then((mod) => mod[name]).then(res, rej);
              return result;
            },
          });
        }
      },
  },
]);

//# sourceMappingURL=%5Broot-of-the-server%5D__2b4d01ae._.js.map
