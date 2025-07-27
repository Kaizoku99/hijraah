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
    (e._sentryDebugIds[t] = "ab4f3621-40b9-44fc-84bd-4023cdcaffeb"),
    (e._sentryDebugIdIdentifier =
      "sentry-dbid-ab4f3621-40b9-44fc-84bd-4023cdcaffeb"));
} catch (e) {}
(() => {
  var e = {};
  (e.id = 3918),
    (e.ids = [3918]),
    (e.modules = {
      252: (e, t) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          Object.defineProperty(t, "ReflectAdapter", {
            enumerable: !0,
            get: function () {
              return r;
            },
          });
        class r {
          static get(e, t, r) {
            let s = Reflect.get(e, t, r);
            return "function" == typeof s ? s.bind(e) : s;
          }
          static set(e, t, r, s) {
            return Reflect.set(e, t, r, s);
          }
          static has(e, t) {
            return Reflect.has(e, t);
          }
          static deleteProperty(e, t) {
            return Reflect.deleteProperty(e, t);
          }
        }
      },
      3295: (e) => {
        "use strict";
        e.exports = require("next/dist/server/app-render/after-task-async-storage.external.js");
      },
      6934: () => {},
      8086: (e) => {
        "use strict";
        e.exports = require("module");
      },
      8963: (e) => {
        function t(e) {
          var t = Error("Cannot find module '" + e + "'");
          throw ((t.code = "MODULE_NOT_FOUND"), t);
        }
        (t.keys = () => []), (t.resolve = t), (t.id = 8963), (e.exports = t);
      },
      10846: (e) => {
        "use strict";
        e.exports = require("next/dist/compiled/next-server/app-page.runtime.prod.js");
      },
      19771: (e) => {
        "use strict";
        e.exports = require("process");
      },
      21820: (e) => {
        "use strict";
        e.exports = require("os");
      },
      28354: (e) => {
        "use strict";
        e.exports = require("util");
      },
      29021: (e) => {
        "use strict";
        e.exports = require("fs");
      },
      29294: (e) => {
        "use strict";
        e.exports = require("next/dist/server/app-render/work-async-storage.external.js");
      },
      31421: (e) => {
        "use strict";
        e.exports = require("node:child_process");
      },
      33873: (e) => {
        "use strict";
        e.exports = require("path");
      },
      36686: (e) => {
        "use strict";
        e.exports = require("diagnostics_channel");
      },
      37067: (e) => {
        "use strict";
        e.exports = require("node:http");
      },
      38522: (e) => {
        "use strict";
        e.exports = require("node:zlib");
      },
      41692: (e) => {
        "use strict";
        e.exports = require("node:tls");
      },
      43886: () => {},
      44708: (e) => {
        "use strict";
        e.exports = require("node:https");
      },
      44870: (e) => {
        "use strict";
        e.exports = require("next/dist/compiled/next-server/app-route.runtime.prod.js");
      },
      48161: (e) => {
        "use strict";
        e.exports = require("node:os");
      },
      53053: (e) => {
        "use strict";
        e.exports = require("node:diagnostics_channel");
      },
      55511: (e) => {
        "use strict";
        e.exports = require("crypto");
      },
      57075: (e) => {
        "use strict";
        e.exports = require("node:stream");
      },
      57975: (e) => {
        "use strict";
        e.exports = require("node:util");
      },
      63033: (e) => {
        "use strict";
        e.exports = require("next/dist/server/app-render/work-unit-async-storage.external.js");
      },
      73024: (e) => {
        "use strict";
        e.exports = require("node:fs");
      },
      73566: (e) => {
        "use strict";
        e.exports = require("worker_threads");
      },
      74998: (e) => {
        "use strict";
        e.exports = require("perf_hooks");
      },
      75919: (e) => {
        "use strict";
        e.exports = require("node:worker_threads");
      },
      76760: (e) => {
        "use strict";
        e.exports = require("node:path");
      },
      77030: (e) => {
        "use strict";
        e.exports = require("node:net");
      },
      79551: (e) => {
        "use strict";
        e.exports = require("url");
      },
      79646: (e) => {
        "use strict";
        e.exports = require("child_process");
      },
      80481: (e) => {
        "use strict";
        e.exports = require("node:readline");
      },
      83997: (e) => {
        "use strict";
        e.exports = require("tty");
      },
      84297: (e) => {
        "use strict";
        e.exports = require("async_hooks");
      },
      86592: (e) => {
        "use strict";
        e.exports = require("node:inspector");
      },
      90020: (e, t, r) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          !(function (e, t) {
            for (var r in t)
              Object.defineProperty(e, r, { enumerable: !0, get: t[r] });
          })(t, {
            isRequestAPICallableInsideAfter: function () {
              return u;
            },
            throwForSearchParamsAccessInUseCache: function () {
              return o;
            },
            throwWithStaticGenerationBailoutError: function () {
              return n;
            },
            throwWithStaticGenerationBailoutErrorWithDynamicError: function () {
              return i;
            },
          });
        let s = r(57154),
          a = r(3295);
        function n(e, t) {
          throw Object.defineProperty(
            new s.StaticGenBailoutError(
              `Route ${e} couldn't be rendered statically because it used ${t}. See more info here: https://nextjs.org/docs/app/building-your-application/rendering/static-and-dynamic#dynamic-rendering`,
            ),
            "__NEXT_ERROR_CODE",
            { value: "E576", enumerable: !1, configurable: !0 },
          );
        }
        function i(e, t) {
          throw Object.defineProperty(
            new s.StaticGenBailoutError(
              `Route ${e} with \`dynamic = "error"\` couldn't be rendered statically because it used ${t}. See more info here: https://nextjs.org/docs/app/building-your-application/rendering/static-and-dynamic#dynamic-rendering`,
            ),
            "__NEXT_ERROR_CODE",
            { value: "E543", enumerable: !1, configurable: !0 },
          );
        }
        function o(e) {
          throw Object.defineProperty(
            Error(
              `Route ${e} used "searchParams" inside "use cache". Accessing Dynamic data sources inside a cache scope is not supported. If you need this data inside a cached function use "searchParams" outside of the cached function and pass the required dynamic data in as an argument. See more info here: https://nextjs.org/docs/messages/next-request-in-use-cache`,
            ),
            "__NEXT_ERROR_CODE",
            { value: "E634", enumerable: !1, configurable: !0 },
          );
        }
        function u() {
          let e = a.afterTaskAsyncStorage.getStore();
          return (null == e ? void 0 : e.rootTaskSpawnPhase) === "action";
        }
      },
      94735: (e) => {
        "use strict";
        e.exports = require("events");
      },
      96708: (e) => {
        function t(e) {
          var t = Error("Cannot find module '" + e + "'");
          throw ((t.code = "MODULE_NOT_FOUND"), t);
        }
        (t.keys = () => []), (t.resolve = t), (t.id = 96708), (e.exports = t);
      },
      99916: (e, t, r) => {
        "use strict";
        r.r(t),
          r.d(t, {
            patchFetch: () => E,
            routeModule: () => A,
            serverHooks: () => O,
            workAsyncStorage: () => v,
            workUnitAsyncStorage: () => q,
          });
        var s = {};
        r.r(s),
          r.d(s, {
            DELETE: () => D,
            GET: () => w,
            HEAD: () => R,
            OPTIONS: () => k,
            PATCH: () => b,
            POST: () => x,
            PUT: () => S,
          });
        var a = r(94168),
          n = r(51293),
          i = r(64588),
          o = r(63033),
          u = r(68593),
          c = r(58342),
          d = r(79273),
          p = r(60442);
        let l = c.Ik({
          category: c
            .k5(["ai", "processing", "maintenance", "communication"])
            .optional(),
          status: c
            .k5([
              "pending",
              "running",
              "completed",
              "failed",
              "cancelled",
              "retrying",
            ])
            .optional(),
          limit: c.au.number().min(1).max(100).default(50),
          offset: c.au.number().min(0).default(0),
        });
        async function g(e) {
          try {
            let { searchParams: t } = new URL(e.url),
              r = l.parse({
                category: t.get("category"),
                status: t.get("status"),
                limit: t.get("limit"),
                offset: t.get("offset"),
              }),
              s = [
                {
                  id: "document-processing",
                  name: "Document Processing",
                  description:
                    "Process uploaded documents with AI analysis using @hijraah/documents",
                  enabled: !0,
                  category: "processing",
                  totalRuns: 145,
                  successRate: 94.5,
                  avgDuration: 12e3,
                  lastRun: {
                    id: "run-doc-1",
                    taskId: "document-processing",
                    status: "completed",
                    createdAt: new Date(Date.now() - 3e5).toISOString(),
                    startedAt: new Date(Date.now() - 28e4).toISOString(),
                    completedAt: new Date(Date.now() - 26e4).toISOString(),
                    duration: 2e4,
                    attempts: 1,
                    maxAttempts: 3,
                    progress: 100,
                    output: {
                      documentsProcessed: 5,
                      entitiesExtracted: 23,
                      aiProvider: "openai",
                      hijraahPackages: ["@hijraah/documents", "@hijraah/ai"],
                    },
                  },
                },
                {
                  id: "ai-analysis",
                  name: "AI Analysis",
                  description:
                    "Multi-provider AI analysis using @hijraah/ai multiplexer",
                  enabled: !0,
                  category: "ai",
                  totalRuns: 89,
                  successRate: 98.9,
                  avgDuration: 8500,
                  lastRun: {
                    id: "run-ai-1",
                    taskId: "ai-analysis",
                    status: "running",
                    createdAt: new Date(Date.now() - 12e4).toISOString(),
                    startedAt: new Date(Date.now() - 1e5).toISOString(),
                    attempts: 1,
                    maxAttempts: 2,
                    progress: 65,
                    metadata: {
                      currentProvider: "anthropic",
                      fallbackReady: !0,
                      hijraahMultiplexer: "@hijraah/ai",
                    },
                  },
                },
                {
                  id: "web-scraping",
                  name: "Web Scraping",
                  description:
                    "Extract immigration content using Firecrawl integration",
                  enabled: !0,
                  category: "processing",
                  totalRuns: 67,
                  successRate: 91,
                  avgDuration: 15e3,
                  lastRun: {
                    id: "run-scrape-1",
                    taskId: "web-scraping",
                    status: "failed",
                    createdAt: new Date(Date.now() - 6e5).toISOString(),
                    startedAt: new Date(Date.now() - 58e4).toISOString(),
                    completedAt: new Date(Date.now() - 56e4).toISOString(),
                    duration: 2e4,
                    attempts: 3,
                    maxAttempts: 3,
                    error:
                      "Circuit breaker open: Immigration.gov rate limit exceeded",
                  },
                },
                {
                  id: "email-notification",
                  name: "Email Notifications",
                  description:
                    "Send user notifications using @hijraah/workflows",
                  enabled: !0,
                  category: "communication",
                  totalRuns: 234,
                  successRate: 99.1,
                  avgDuration: 2500,
                  lastRun: {
                    id: "run-email-1",
                    taskId: "email-notification",
                    status: "completed",
                    createdAt: new Date(Date.now() - 9e5).toISOString(),
                    startedAt: new Date(Date.now() - 895e3).toISOString(),
                    completedAt: new Date(Date.now() - 892500).toISOString(),
                    duration: 2500,
                    attempts: 1,
                    maxAttempts: 3,
                    progress: 100,
                    output: {
                      emailsSent: 12,
                      workflowPackage: "@hijraah/workflows",
                    },
                  },
                },
                {
                  id: "daily-reports",
                  name: "Daily Reports",
                  description:
                    "Generate analytics using @hijraah/workflows scheduled tasks",
                  enabled: !0,
                  category: "communication",
                  totalRuns: 30,
                  successRate: 100,
                  avgDuration: 5e3,
                  isScheduled: !0,
                  schedule: "0 8 * * *",
                  lastRun: {
                    id: "run-report-1",
                    taskId: "daily-reports",
                    status: "completed",
                    createdAt: new Date(Date.now() - 144e5).toISOString(),
                    startedAt: new Date(Date.now() - 1439e4).toISOString(),
                    completedAt: new Date(Date.now() - 14385e3).toISOString(),
                    duration: 5e3,
                    attempts: 1,
                    maxAttempts: 5,
                    progress: 100,
                    output: {
                      reportsSent: 3,
                      metricsGenerated: 15,
                      hijraahWorkflows: "@hijraah/workflows",
                    },
                  },
                },
                {
                  id: "index-maintenance",
                  name: "Search Index Maintenance",
                  description: "Maintain search indexes using @hijraah/rag",
                  enabled: !0,
                  category: "maintenance",
                  totalRuns: 56,
                  successRate: 96.4,
                  avgDuration: 18e3,
                  isScheduled: !0,
                  schedule: "0 2 * * *",
                  lastRun: {
                    id: "run-index-1",
                    taskId: "index-maintenance",
                    status: "pending",
                    createdAt: new Date(Date.now() - 6e4).toISOString(),
                    attempts: 1,
                    maxAttempts: 3,
                    progress: 0,
                    metadata: {
                      ragPackage: "@hijraah/rag",
                      scheduledFor: "02:00 UTC",
                    },
                  },
                },
              ];
            r.category && (s = s.filter((e) => e.category === r.category)),
              r.status && (s = s.filter((e) => e.lastRun?.status === r.status));
            let a = s.length,
              n = {
                tasks: s.slice(r.offset, r.offset + r.limit),
                total: a,
                limit: r.limit,
                offset: r.offset,
                hasMore: r.offset + r.limit < a,
              };
            return u.NextResponse.json(n);
          } catch (e) {
            if ((console.error("Failed to fetch tasks:", e), e instanceof d.G))
              return u.NextResponse.json(
                { error: "Invalid query parameters", details: e.errors },
                { status: 400 },
              );
            return u.NextResponse.json(
              { error: "Internal server error" },
              { status: 500 },
            );
          }
        }
        async function m() {
          return new Response(null, { status: 200 });
        }
        let f = { ...o },
          h =
            "workUnitAsyncStorage" in f
              ? f.workUnitAsyncStorage
              : "requestAsyncStorage" in f
                ? f.requestAsyncStorage
                : void 0;
        function y(e, t) {
          return "phase-production-build" === process.env.NEXT_PHASE ||
            "function" != typeof e
            ? e
            : new Proxy(e, {
                apply: (e, r, s) => {
                  let a;
                  try {
                    let e = h?.getStore();
                    a = e?.headers;
                  } catch (e) {}
                  return p
                    .wrapRouteHandlerWithSentry(e, {
                      method: t,
                      parameterizedRoute: "/api/triggers/tasks",
                      headers: a,
                    })
                    .apply(r, s);
                },
              });
        }
        let w = y(g, "GET"),
          x = y(void 0, "POST"),
          S = y(void 0, "PUT"),
          b = y(void 0, "PATCH"),
          D = y(void 0, "DELETE"),
          R = y(m, "HEAD"),
          k = y(void 0, "OPTIONS"),
          A = new a.AppRouteRouteModule({
            definition: {
              kind: n.RouteKind.APP_ROUTE,
              page: "/api/triggers/tasks/route",
              pathname: "/api/triggers/tasks",
              filename: "route",
              bundlePath: "app/api/triggers/tasks/route",
            },
            resolvedPagePath:
              "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\api\\triggers\\tasks\\route.ts",
            nextConfigOutput: "",
            userland: s,
          }),
          { workAsyncStorage: v, workUnitAsyncStorage: q, serverHooks: O } = A;
        function E() {
          return (0, i.patchFetch)({
            workAsyncStorage: v,
            workUnitAsyncStorage: q,
          });
        }
      },
    });
  var t = require("../../../../webpack-runtime.js");
  t.C(e);
  var r = (e) => t((t.s = e)),
    s = t.X(0, [827, 5400, 8342], () => r(99916));
  module.exports = s;
})();
//# sourceMappingURL=route.js.map
