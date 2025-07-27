try {
  let e =
      "undefined" != typeof window
        ? window
        : "undefined" != typeof global
          ? global
          : "undefined" != typeof globalThis
            ? globalThis
            : "undefined" != typeof self
              ? self
              : {},
    t = new e.Error().stack;
  t &&
    ((e._sentryDebugIds = e._sentryDebugIds || {}),
    (e._sentryDebugIds[t] = "e2a9f72c-c324-4e27-b614-8fc432e304d9"),
    (e._sentryDebugIdIdentifier =
      "sentry-dbid-e2a9f72c-c324-4e27-b614-8fc432e304d9"));
} catch (e) {}
(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [2],
  {
    6934: () => {},
    25356: (e) => {
      "use strict";
      e.exports = require("node:buffer");
    },
    43886: () => {},
    65521: (e) => {
      "use strict";
      e.exports = require("node:async_hooks");
    },
    84248: (e, t, r) => {
      "use strict";
      r.r(t), r.d(t, { ComponentMod: () => Y, default: () => $ });
      var i,
        a = {};
      r.r(a),
        r.d(a, {
          DELETE: () => O,
          GET: () => R,
          HEAD: () => M,
          OPTIONS: () => j,
          PATCH: () => D,
          POST: () => q,
          PUT: () => C,
          runtime: () => _,
        });
      var o = {};
      r.r(o),
        r.d(o, {
          patchFetch: () => N,
          routeModule: () => F,
          serverHooks: () => H,
          workAsyncStorage: () => z,
          workUnitAsyncStorage: () => B,
        });
      var s = r(12375),
        n = r(74236),
        c = r(25980),
        l = r(41233),
        d = r(29902),
        p = r(79767),
        u = r(72283),
        m = r(80456),
        f = r(85030),
        g = r(49070),
        h = r(97754),
        y = r(37225),
        v = r(20032);
      let b = new (r(1231).Ay)({ apiKey: process.env.OPENAI_API_KEY });
      var w = r(35655);
      let x = (0, f.UU)(
          "http://localhost:54321",
          process.env.SUPABASE_SERVICE_ROLE_KEY,
        ),
        S = {
          "cover-letter": {
            system: "You are a professional immigration document writer...",
          },
          "personal-statement": {
            system: "You are a professional immigration document writer...",
          },
          "legal-brief": {
            system: "You are a professional immigration legal expert...",
          },
          affidavit: {
            system: "You are a professional immigration document writer...",
          },
        },
        E = v.Ik({
          prompt: v.Yj().min(1, "Prompt is required"),
          template: v.k5(Object.keys(S)),
          additionalContext: v.Yj().optional(),
          userId: v.Yj().uuid().optional(),
        }),
        k = new g.$();
      k.use("*", (0, h.W)()),
        k.post("/", (0, m.l)("json", E), async (e) => {
          let {
              prompt: t,
              template: r,
              additionalContext: i,
              userId: a,
            } = e.req.valid("json"),
            o = a || "placeholder-user-from-auth",
            s = [
              { role: "system", content: S[r].system },
              {
                role: "user",
                content: `Generate a ${r} with the following details:

${t}${
                  i
                    ? `

Additional context: ${i}`
                    : ""
                }`,
              },
            ];
          try {
            let i = await b.chat.completions.create({
                model: "gpt-4",
                messages: s,
                temperature: 0.7,
              }),
              a = i.choices[0]?.message?.content;
            if (!a)
              return (
                console.error("[Generate Doc API] OpenAI returned no content."),
                e.json({ error: "Failed to generate document content" }, 502)
              );
            let n = !1;
            if ("placeholder-user-from-auth" !== o)
              try {
                let { error: e } = await x
                  .from("artifacts")
                  .insert({
                    user_id: o,
                    title: `AI-Generated ${r.replace("-", " ").replace(/\b\w/g, (e) => e.toUpperCase())}`,
                    description:
                      t.substring(0, 100) + (t.length > 100 ? "..." : ""),
                    content: { text: a, format: "markdown" },
                    type: "document",
                    visibility: "private",
                    needs_embedding: !0,
                    metadata: {
                      template: r,
                      generated_at: new Date().toISOString(),
                      prompt: t,
                    },
                  });
                if (e) throw e;
                n = !0;
              } catch (e) {
                console.error("[Generate Doc API] Error saving artifact:", e);
              }
            return e.json({ text: a, saved: n });
          } catch (r) {
            console.error("[Generate Doc API] Error:", r);
            let t =
              r instanceof Error
                ? r.message
                : "Unknown error generating document";
            return e.json({ error: t }, { status: 500 });
          }
        });
      let P = (0, y.p)(k),
        _ = "edge",
        T = { ...u },
        A =
          "workUnitAsyncStorage" in T
            ? T.workUnitAsyncStorage
            : "requestAsyncStorage" in T
              ? T.requestAsyncStorage
              : void 0;
      function I(e, t) {
        return "phase-production-build" === process.env.NEXT_PHASE ||
          "function" != typeof e
          ? e
          : new Proxy(e, {
              apply: (e, r, i) => {
                let a;
                try {
                  let e = A?.getStore();
                  a = e?.headers;
                } catch (e) {}
                return w
                  .f(e, {
                    method: t,
                    parameterizedRoute: "/api/documents/generate",
                    headers: a,
                  })
                  .apply(r, i);
              },
            });
      }
      let R = I(void 0, "GET"),
        q = I(P, "POST"),
        C = I(void 0, "PUT"),
        D = I(void 0, "PATCH"),
        O = I(void 0, "DELETE"),
        M = I(void 0, "HEAD"),
        j = I(void 0, "OPTIONS"),
        F = new l.AppRouteRouteModule({
          definition: {
            kind: d.A.APP_ROUTE,
            page: "/api/documents/generate/route",
            pathname: "/api/documents/generate",
            filename: "route",
            bundlePath: "app/api/documents/generate/route",
          },
          resolvedPagePath:
            "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\api\\documents\\generate\\route.ts",
          nextConfigOutput: "",
          userland: a,
        }),
        { workAsyncStorage: z, workUnitAsyncStorage: B, serverHooks: H } = F;
      function N() {
        return (0, p.V5)({ workAsyncStorage: z, workUnitAsyncStorage: B });
      }
      let U = {
          env: {
            _sentryRewriteFramesDistDir: ".next",
            _sentryRewriteFramesAssetPrefixPath: "",
            _sentryRewritesTunnelPath: "/monitoring",
            _sentryRelease: "d92a5e8d8d7c20e1f785b33fde2c15257fdb31d2",
          },
          eslint: {
            ignoreDuringBuilds: !1,
            dirs: ["src", "app", "config", "scripts", "__tests__"],
          },
          typescript: { ignoreBuildErrors: !0, tsconfigPath: "tsconfig.json" },
          distDir: ".next",
          cleanDistDir: !0,
          assetPrefix: "",
          cacheMaxMemorySize: 0x3200000,
          configOrigin: "next.config.mjs",
          useFileSystemPublicRoutes: !0,
          generateEtags: !0,
          pageExtensions: ["tsx", "ts", "jsx", "js"],
          poweredByHeader: !1,
          compress: !0,
          images: {
            deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
            imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
            path: "/_next/image",
            loader: "default",
            loaderFile: "",
            domains: ["images.unsplash.com", "cdn.sanity.io"],
            disableStaticImages: !1,
            minimumCacheTTL: 60,
            formats: ["image/webp"],
            dangerouslyAllowSVG: !1,
            contentSecurityPolicy:
              "script-src 'none'; frame-src 'none'; sandbox;",
            contentDispositionType: "attachment",
            remotePatterns: [{ protocol: "https", hostname: "**" }],
            unoptimized: !1,
          },
          devIndicators: { position: "bottom-left" },
          onDemandEntries: { maxInactiveAge: 6e4, pagesBufferLength: 5 },
          amp: { canonicalBase: "" },
          basePath: "",
          sassOptions: {},
          trailingSlash: !1,
          i18n: null,
          productionBrowserSourceMaps: !1,
          excludeDefaultMomentLocales: !0,
          serverRuntimeConfig: {},
          publicRuntimeConfig: {},
          reactProductionProfiling: !1,
          reactStrictMode: !0,
          reactMaxHeadersLength: 6e3,
          httpAgentOptions: { keepAlive: !0 },
          logging: { fetches: { fullUrl: !0 } },
          expireTime: 31536e3,
          staticPageGenerationTimeout: 60,
          modularizeImports: {
            "@mui/icons-material": {
              transform: "@mui/icons-material/{{member}}",
            },
            lodash: { transform: "lodash/{{member}}" },
          },
          outputFileTracingRoot: "E:\\downloads\\Hijraah",
          experimental: {
            nodeMiddleware: !1,
            cacheLife: {
              default: { stale: 300, revalidate: 900, expire: 0xfffffffe },
              seconds: { stale: 0, revalidate: 1, expire: 60 },
              minutes: { stale: 300, revalidate: 60, expire: 3600 },
              hours: { stale: 300, revalidate: 3600, expire: 86400 },
              days: { stale: 300, revalidate: 86400, expire: 604800 },
              weeks: { stale: 300, revalidate: 604800, expire: 2592e3 },
              max: { stale: 300, revalidate: 2592e3, expire: 0xfffffffe },
            },
            cacheHandlers: {},
            cssChunking: !0,
            multiZoneDraftMode: !1,
            appNavFailHandling: !1,
            prerenderEarlyExit: !0,
            serverMinification: !0,
            serverSourceMaps: !1,
            linkNoTouchStart: !1,
            caseSensitiveRoutes: !1,
            clientSegmentCache: !1,
            preloadEntriesOnStart: !0,
            clientRouterFilter: !0,
            clientRouterFilterRedirects: !1,
            fetchCacheKeyPrefix: "",
            middlewarePrefetch: "flexible",
            optimisticClientCache: !0,
            manualClientBasePath: !1,
            cpus: 11,
            memoryBasedWorkersCount: !1,
            imgOptConcurrency: null,
            imgOptTimeoutInSeconds: 7,
            imgOptMaxInputPixels: 0xfff8001,
            imgOptSequentialRead: null,
            isrFlushToDisk: !0,
            workerThreads: !1,
            optimizeCss: !0,
            nextScriptWorkers: !1,
            scrollRestoration: !1,
            externalDir: !1,
            disableOptimizedLoading: !1,
            gzipSize: !0,
            craCompat: !1,
            esmExternals: !0,
            fullySpecified: !1,
            swcTraceProfiling: !1,
            forceSwcTransforms: !1,
            largePageDataBytes: 128e3,
            turbo: { root: "E:\\downloads\\Hijraah" },
            typedRoutes: !1,
            typedEnv: !1,
            clientTraceMetadata: ["baggage", "sentry-trace"],
            parallelServerCompiles: !1,
            parallelServerBuildTraces: !1,
            ppr: !1,
            authInterrupts: !1,
            webpackMemoryOptimizations: !1,
            optimizeServerReact: !0,
            useEarlyImport: !1,
            viewTransition: !1,
            staleTimes: { dynamic: 0, static: 300 },
            serverComponentsHmrCache: !0,
            staticGenerationMaxConcurrency: 8,
            staticGenerationMinPagesPerWorker: 25,
            dynamicIO: !1,
            inlineCss: !1,
            useCache: !1,
            serverActions: {
              bodySizeLimit: "2mb",
              allowedOrigins: ["localhost:3000"],
            },
            optimizePackageImports: [
              "lucide-react",
              "@radix-ui/react-icons",
              "date-fns",
              "lodash",
              "lodash-es",
              "ramda",
              "antd",
              "react-bootstrap",
              "ahooks",
              "@ant-design/icons",
              "@headlessui/react",
              "@headlessui-float/react",
              "@heroicons/react/20/solid",
              "@heroicons/react/24/solid",
              "@heroicons/react/24/outline",
              "@visx/visx",
              "@tremor/react",
              "rxjs",
              "@mui/material",
              "@mui/icons-material",
              "recharts",
              "react-use",
              "effect",
              "@effect/schema",
              "@effect/platform",
              "@effect/platform-node",
              "@effect/platform-browser",
              "@effect/platform-bun",
              "@effect/sql",
              "@effect/sql-mssql",
              "@effect/sql-mysql2",
              "@effect/sql-pg",
              "@effect/sql-squlite-node",
              "@effect/sql-squlite-bun",
              "@effect/sql-squlite-wasm",
              "@effect/sql-squlite-react-native",
              "@effect/rpc",
              "@effect/rpc-http",
              "@effect/typeclass",
              "@effect/experimental",
              "@effect/opentelemetry",
              "@material-ui/core",
              "@material-ui/icons",
              "@tabler/icons-react",
              "mui-core",
              "react-icons/ai",
              "react-icons/bi",
              "react-icons/bs",
              "react-icons/cg",
              "react-icons/ci",
              "react-icons/di",
              "react-icons/fa",
              "react-icons/fa6",
              "react-icons/fc",
              "react-icons/fi",
              "react-icons/gi",
              "react-icons/go",
              "react-icons/gr",
              "react-icons/hi",
              "react-icons/hi2",
              "react-icons/im",
              "react-icons/io",
              "react-icons/io5",
              "react-icons/lia",
              "react-icons/lib",
              "react-icons/lu",
              "react-icons/md",
              "react-icons/pi",
              "react-icons/ri",
              "react-icons/rx",
              "react-icons/si",
              "react-icons/sl",
              "react-icons/tb",
              "react-icons/tfi",
              "react-icons/ti",
              "react-icons/vsc",
              "react-icons/wi",
            ],
          },
          htmlLimitedBots:
            "Mediapartners-Google|Slurp|DuckDuckBot|baiduspider|yandex|sogou|bitlybot|tumblr|vkShare|quora link preview|redditbot|ia_archiver|Bingbot|BingPreview|applebot|facebookexternalhit|facebookcatalog|Twitterbot|LinkedInBot|Slackbot|Discordbot|WhatsApp|SkypeUriPreview|Yeti",
          bundlePagesRouterDependencies: !1,
          configFile: "E:\\downloads\\Hijraah\\apps\\web\\next.config.mjs",
          configFileName: "next.config.mjs",
          serverExternalPackages: [
            "pdf-parse",
            "ai",
            "amqplib",
            "connect",
            "dataloader",
            "express",
            "generic-pool",
            "graphql",
            "@hapi/hapi",
            "ioredis",
            "kafkajs",
            "koa",
            "lru-memoizer",
            "mongodb",
            "mongoose",
            "mysql",
            "mysql2",
            "knex",
            "pg",
            "pg-pool",
            "@node-redis/client",
            "@redis/client",
            "redis",
            "tedious",
          ],
          compiler: { removeConsole: { exclude: ["error", "warn"] } },
          _originalRewrites: {
            beforeFiles: [],
            afterFiles: [
              {
                source: "/monitoring(/?)",
                has: [
                  { type: "query", key: "o", value: "(?<orgid>\\d*)" },
                  { type: "query", key: "p", value: "(?<projectid>\\d*)" },
                  { type: "query", key: "r", value: "(?<region>[a-z]{2})" },
                ],
                destination:
                  "https://o:orgid.ingest.:region.sentry.io/api/:projectid/envelope/?hsts=0",
              },
              {
                source: "/monitoring(/?)",
                has: [
                  { type: "query", key: "o", value: "(?<orgid>\\d*)" },
                  { type: "query", key: "p", value: "(?<projectid>\\d*)" },
                ],
                destination:
                  "https://o:orgid.ingest.sentry.io/api/:projectid/envelope/?hsts=0",
              },
            ],
            fallback: [],
          },
          _originalRedirects: [
            { source: "/login", destination: "/auth/login", permanent: !0 },
            { source: "/signup", destination: "/auth/signup", permanent: !0 },
          ],
        },
        G =
          null == (i = self.__RSC_MANIFEST)
            ? void 0
            : i["/api/documents/generate/route"],
        L = ((e) => (e ? JSON.parse(e) : void 0))(self.__RSC_SERVER_MANIFEST);
      G &&
        L &&
        (0, n.fQ)({
          page: "/api/documents/generate/route",
          clientReferenceManifest: G,
          serverActionsManifest: L,
          serverModuleMap: (0, s.e)({ serverActionsManifest: L }),
        });
      let Y = o,
        $ = c.s.wrap(F, { nextConfig: U });
    },
  },
  (e) => {
    var t = (t) => e((e.s = t));
    e.O(0, [275, 121, 984], () => t(84248));
    var r = e.O();
    (_ENTRIES = "undefined" == typeof _ENTRIES ? {} : _ENTRIES)[
      "middleware_app/api/documents/generate/route"
    ] = r;
  },
]);
//# sourceMappingURL=route.js.map
