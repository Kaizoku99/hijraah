module.exports = {
  "[project]/sentry.server.config.ts [instrumentation-edge] (ecmascript, async loader)":
    (__turbopack_context__) => {
      var { g: global, __dirname } = __turbopack_context__;
      {
        __turbopack_context__.v((parentImport) => {
          return Promise.all(
            [
              "server/chunks/[externals]_node:inspector_ae1e773b._.js",
              "server/chunks/1e02b_@sentry_core_build_cjs_ad62ea4a._.js",
              "server/chunks/195ad_@sentry_node_build_cjs_a98763eb._.js",
              "server/chunks/d486d_@opentelemetry_core_build_esm_99e83d3e._.js",
              "server/chunks/ffc21_@opentelemetry_semantic-conventions_build_esm_aa8c0bf5._.js",
              "server/chunks/44e58_@opentelemetry_semantic-conventions_build_esm_2da6112e._.js",
              "server/chunks/8b446_@opentelemetry_sdk-trace-base_build_esm_24cd3f5b._.js",
              "server/chunks/46f7a_@opentelemetry_resources_build_esm_42fa1932._.js",
              "server/chunks/479e8_@sentry_nextjs_build_cjs_a6c0f82e._.js",
              "server/chunks/node_modules__pnpm_4d1549dc._.js",
              "server/chunks/[root-of-the-server]__518150cc._.js",
            ].map((chunk) => __turbopack_context__.l(chunk)),
          ).then(() => {
            return parentImport(
              "[project]/sentry.server.config.ts [instrumentation-edge] (ecmascript)",
            );
          });
        });
      }
    },
};
