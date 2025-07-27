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
    r = new e.Error().stack;
  r &&
    ((e._sentryDebugIds = e._sentryDebugIds || {}),
    (e._sentryDebugIds[r] = "5d020d87-b1bc-4302-9d97-2e5985b60209"),
    (e._sentryDebugIdIdentifier =
      "sentry-dbid-5d020d87-b1bc-4302-9d97-2e5985b60209"));
} catch (e) {}
(() => {
  var e = {};
  (e.id = 7721),
    (e.ids = [7721]),
    (e.modules = {
      6934: () => {},
      8086: (e) => {
        "use strict";
        e.exports = require("module");
      },
      8963: (e) => {
        function r(e) {
          var r = Error("Cannot find module '" + e + "'");
          throw ((r.code = "MODULE_NOT_FOUND"), r);
        }
        (r.keys = () => []), (r.resolve = r), (r.id = 8963), (e.exports = r);
      },
      10846: (e) => {
        "use strict";
        e.exports = require("next/dist/compiled/next-server/app-page.runtime.prod.js");
      },
      11997: (e) => {
        "use strict";
        e.exports = require("punycode");
      },
      12412: (e) => {
        "use strict";
        e.exports = require("assert");
      },
      19771: (e) => {
        "use strict";
        e.exports = require("process");
      },
      21820: (e) => {
        "use strict";
        e.exports = require("os");
      },
      27910: (e) => {
        "use strict";
        e.exports = require("stream");
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
      29741: (e, r, s) => {
        "use strict";
        s.d(r, { W: () => t });
        var t = (e) => {
          let r = {
              origin: "*",
              allowMethods: ["GET", "HEAD", "PUT", "POST", "DELETE", "PATCH"],
              allowHeaders: [],
              exposeHeaders: [],
              ...e,
            },
            s = ((e) => {
              if ("string" == typeof e)
                if ("*" === e) return () => e;
                else return (r) => (e === r ? r : null);
              return "function" == typeof e
                ? e
                : (r) => (e.includes(r) ? r : null);
            })(r.origin),
            t = ((e) =>
              "function" == typeof e
                ? e
                : Array.isArray(e)
                  ? () => e
                  : () => [])(r.allowMethods);
          return async function (e, o) {
            function i(r, s) {
              e.res.headers.set(r, s);
            }
            let a = s(e.req.header("origin") || "", e);
            if ((a && i("Access-Control-Allow-Origin", a), "*" !== r.origin)) {
              let r = e.req.header("Vary");
              i("Vary", r || "Origin");
            }
            if (
              (r.credentials && i("Access-Control-Allow-Credentials", "true"),
              r.exposeHeaders?.length &&
                i("Access-Control-Expose-Headers", r.exposeHeaders.join(",")),
              "OPTIONS" === e.req.method)
            ) {
              null != r.maxAge &&
                i("Access-Control-Max-Age", r.maxAge.toString());
              let s = t(e.req.header("origin") || "", e);
              s.length && i("Access-Control-Allow-Methods", s.join(","));
              let o = r.allowHeaders;
              if (!o?.length) {
                let r = e.req.header("Access-Control-Request-Headers");
                r && (o = r.split(/\s*,\s*/));
              }
              return (
                o?.length &&
                  (i("Access-Control-Allow-Headers", o.join(",")),
                  e.res.headers.append(
                    "Vary",
                    "Access-Control-Request-Headers",
                  )),
                e.res.headers.delete("Content-Length"),
                e.res.headers.delete("Content-Type"),
                new Response(null, {
                  headers: e.res.headers,
                  status: 204,
                  statusText: "No Content",
                })
              );
            }
            await o();
          };
        };
      },
      29952: (e, r, s) => {
        "use strict";
        s.d(r, { p: () => t });
        var t = (e) => (r) => e.fetch(r);
      },
      31421: (e) => {
        "use strict";
        e.exports = require("node:child_process");
      },
      33873: (e) => {
        "use strict";
        e.exports = require("path");
      },
      34631: (e) => {
        "use strict";
        e.exports = require("tls");
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
      55591: (e) => {
        "use strict";
        e.exports = require("https");
      },
      57075: (e) => {
        "use strict";
        e.exports = require("node:stream");
      },
      57975: (e) => {
        "use strict";
        e.exports = require("node:util");
      },
      59570: () => {},
      62802: (e, r, s) => {
        "use strict";
        s.r(r),
          s.d(r, {
            patchFetch: () => L,
            routeModule: () => U,
            serverHooks: () => $,
            workAsyncStorage: () => F,
            workUnitAsyncStorage: () => N,
          });
        var t = {};
        s.r(t),
          s.d(t, {
            DELETE: () => D,
            GET: () => S,
            HEAD: () => Y,
            OPTIONS: () => H,
            PATCH: () => R,
            POST: () => k,
            PUT: () => C,
          });
        var o = s(94168),
          i = s(51293),
          a = s(64588),
          n = s(63033),
          c = s(77719),
          u = s(43774),
          d = s(29741),
          l = s(29952),
          p = s(58342),
          h = s(79273);
        let f = new (s(90866).default)({
            apiKey: process.env.FIRECRAWL_API_KEY || "",
          }),
          g = {
            mapSources: (e) =>
              e.map((e) => ({
                url: e.url,
                title: e.title,
                description: e.description || "",
                relevance: e.relevance,
              })),
            mapActivities: (e) =>
              e.map((e) => ({
                type:
                  {
                    search: "search",
                    extract: "extract",
                    analyze: "analyze",
                    reasoning: "reasoning",
                    synthesis: "synthesis",
                    thought: "thought",
                    error: "error",
                  }[e.type] || "analyze",
                status:
                  {
                    processing: "pending",
                    completed: "complete",
                    in_progress: "pending",
                    error: "error",
                  }[e.status] || "pending",
                message: e.message,
                timestamp: e.timestamp,
                depth: e.depth,
              })),
          },
          x = {
            async performResearch(e, r = 3) {
              try {
                let s = await f.deep_research(e, {
                  maxDepth: r,
                  timeLimit: 180,
                  maxUrls: 15,
                });
                if (s.success)
                  return {
                    sources: g.mapSources(s.data.sources || []),
                    activities: g.mapActivities(s.data.activities || []),
                    currentDepth: s.currentDepth || 1,
                    maxDepth: s.maxDepth || r,
                    completedSteps: s.data.activities?.length || 0,
                    totalExpectedSteps: 5 * (s.maxDepth || r),
                    finalAnalysis: s.data.finalAnalysis,
                    success: !0,
                  };
                throw Error("Firecrawl research failed");
              } catch (s) {
                return (
                  console.error(
                    "Firecrawl error, falling back to local implementation:",
                    s,
                  ),
                  await m(e, r)
                );
              }
            },
          };
        async function m(e, r) {
          let s = await fetch("/api/deep-research", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ query: e, maxDepth: r }),
          });
          return await s.json();
        }
        var y = s(60442);
        let q = (0, c.createClient)(
            "http://localhost:54321",
            process.env.SUPABASE_SERVICE_ROLE_KEY || "",
          ),
          w = new u.$();
        w.use("*", (0, d.W)());
        let A = p.Ik({
            query: p.Yj().min(1, "Query cannot be empty"),
            userId: p.Yj().optional(),
            maxDepth: p.ai().min(1).max(5).default(3).optional(),
          }),
          E = p.Ik({
            id: p.Yj().uuid(),
            session_id: p.Yj().uuid(),
            url: p.Yj().url().nullable(),
            title: p.Yj().nullable(),
            relevance: p.ai().nullable(),
            metadata: p.bz().nullable(),
            created_at: p.Yj(),
          }),
          _ = p.Ik({
            id: p.Yj().uuid(),
            session_id: p.Yj().uuid(),
            type: p.Yj(),
            content: p.Yj(),
            depth: p.ai(),
            metadata: p.bz().nullable(),
            created_at: p.Yj(),
          });
        async function v(e, r, s) {
          let { data: t, error: o } = await q
            .from("research_sessions")
            .insert({
              query: e,
              user_id: s,
              status: "in_progress",
              metadata: { max_depth: r, current_depth: 0, progress: 0 },
            })
            .select()
            .single();
          if (o)
            throw (
              (console.error("Error creating research session in DB:", o),
              Error(`Failed to create research session: ${o.message}`))
            );
          return t;
        }
        async function j(e) {
          let { data: r, error: s } = await q
            .from("research_sessions")
            .select("*")
            .eq("id", e)
            .single();
          if (s || !r) {
            if (
              (console.error(`[Research API] Error fetching session ${e}:`, s),
              s?.code === "PGRST116")
            )
              throw Error(`Research session not found: ${e}`);
            throw Error(
              `Failed to fetch research session ${e}: ${s?.message || "Unknown error"}`,
            );
          }
          let { data: t, error: o } = await q
            .from("research_sources")
            .select("*")
            .eq("session_id", e);
          o &&
            console.warn(
              `[Research API] Error fetching sources for session ${e}:`,
              o,
            );
          let { data: i, error: a } = await q
            .from("research_findings")
            .select("*")
            .eq("session_id", e)
            .order("created_at", { ascending: !0 });
          return (
            a &&
              console.warn(
                `[Research API] Error fetching findings for session ${e}:`,
                a,
              ),
            { ...r, sources: t || [], findings: i || [] }
          );
        }
        p
          .Ik({
            id: p.Yj().uuid(),
            query: p.Yj(),
            status: p.k5(["in_progress", "completed", "failed"]),
            metadata: p.bz().nullable(),
            created_at: p.Yj(),
            updated_at: p.Yj(),
            user_id: p.Yj().uuid().nullable(),
          })
          .extend({ sources: p.YO(E), findings: p.YO(_) }),
          w.post("/", async (e) => {
            try {
              let r = await e.req.json(),
                s = A.safeParse(r);
              if (!s.success)
                return e.json(
                  { error: "Invalid input", details: s.error.errors },
                  400,
                );
              let { query: t, userId: o, maxDepth: i = 3 } = s.data,
                a = await v(t, i, o);
              return (
                (async () => {
                  try {
                    await x.performResearch(t, i, a.id);
                  } catch (e) {
                    console.error(
                      `[Research API] Background research process failed for session ${a.id}:`,
                      e,
                    );
                  }
                })(),
                e.json(
                  {
                    sessionId: a.id,
                    message:
                      "Research session started. Check status using GET /api/research/:sessionId",
                  },
                  202,
                )
              );
            } catch (r) {
              if (
                (console.error("[Research API] Error starting research:", r),
                r instanceof h.G)
              )
                return e.json(
                  { error: "Invalid request body format", details: r.errors },
                  400,
                );
              return e.json(
                {
                  error:
                    r instanceof Error
                      ? r.message
                      : "Internal server error starting research",
                },
                500,
              );
            }
          }),
          w.get("/:sessionId", async (e) => {
            try {
              let r = e.req.param("sessionId");
              if (
                !/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(
                  r,
                )
              )
                return e.json(
                  { error: "Invalid Session ID format" },
                  { status: 400 },
                );
              let s = await j(r);
              return e.json(s);
            } catch (r) {
              if (
                (console.error(
                  `[Research API] Error fetching research session ${e.req.param("sessionId")}:`,
                  r,
                ),
                r instanceof Error &&
                  r.message.startsWith("Research session not found"))
              )
                return e.json({ error: r.message }, { status: 404 });
              return e.json(
                {
                  error:
                    r instanceof Error
                      ? r.message
                      : "Internal server error fetching research status",
                },
                { status: 500 },
              );
            }
          });
        let b = (0, l.p)(w),
          I = (0, l.p)(w),
          T = { ...n },
          P =
            "workUnitAsyncStorage" in T
              ? T.workUnitAsyncStorage
              : "requestAsyncStorage" in T
                ? T.requestAsyncStorage
                : void 0;
        function O(e, r) {
          return "phase-production-build" === process.env.NEXT_PHASE ||
            "function" != typeof e
            ? e
            : new Proxy(e, {
                apply: (e, s, t) => {
                  let o;
                  try {
                    let e = P?.getStore();
                    o = e?.headers;
                  } catch (e) {}
                  return y
                    .wrapRouteHandlerWithSentry(e, {
                      method: r,
                      parameterizedRoute: "/api/research",
                      headers: o,
                    })
                    .apply(s, t);
                },
              });
        }
        let S = O(b, "GET"),
          k = O(I, "POST"),
          C = O(void 0, "PUT"),
          R = O(void 0, "PATCH"),
          D = O(void 0, "DELETE"),
          Y = O(void 0, "HEAD"),
          H = O(void 0, "OPTIONS"),
          U = new o.AppRouteRouteModule({
            definition: {
              kind: i.RouteKind.APP_ROUTE,
              page: "/api/research/route",
              pathname: "/api/research",
              filename: "route",
              bundlePath: "app/api/research/route",
            },
            resolvedPagePath:
              "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\api\\research\\route.ts",
            nextConfigOutput: "",
            userland: t,
          }),
          { workAsyncStorage: F, workUnitAsyncStorage: N, serverHooks: $ } = U;
        function L() {
          return (0, a.patchFetch)({
            workAsyncStorage: F,
            workUnitAsyncStorage: N,
          });
        }
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
      74075: (e) => {
        "use strict";
        e.exports = require("zlib");
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
      79428: (e) => {
        "use strict";
        e.exports = require("buffer");
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
      81630: (e) => {
        "use strict";
        e.exports = require("http");
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
      91645: (e) => {
        "use strict";
        e.exports = require("net");
      },
      94168: (e, r, s) => {
        "use strict";
        e.exports = s(44870);
      },
      94735: (e) => {
        "use strict";
        e.exports = require("events");
      },
      96708: (e) => {
        function r(e) {
          var r = Error("Cannot find module '" + e + "'");
          throw ((r.code = "MODULE_NOT_FOUND"), r);
        }
        (r.keys = () => []), (r.resolve = r), (r.id = 96708), (e.exports = r);
      },
      97108: (e) => {
        function r(e) {
          var r = Error("Cannot find module '" + e + "'");
          throw ((r.code = "MODULE_NOT_FOUND"), r);
        }
        (r.keys = () => []), (r.resolve = r), (r.id = 97108), (e.exports = r);
      },
    });
  var r = require("../../../webpack-runtime.js");
  r.C(e);
  var s = (e) => r((r.s = e)),
    t = r.X(0, [827, 7719, 8342, 3774, 5431, 866], () => s(62802));
  module.exports = t;
})();
//# sourceMappingURL=route.js.map
