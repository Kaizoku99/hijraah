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
    (e._sentryDebugIds[r] = "5a59f5f0-746d-4006-a6ad-bdc1fc0035c1"),
    (e._sentryDebugIdIdentifier =
      "sentry-dbid-5a59f5f0-746d-4006-a6ad-bdc1fc0035c1"));
} catch (e) {}
(() => {
  var e = {};
  (e.id = 4198),
    (e.ids = [4198]),
    (e.modules = {
      3295: (e) => {
        "use strict";
        e.exports = require("next/dist/server/app-render/after-task-async-storage.external.js");
      },
      4573: (e) => {
        "use strict";
        e.exports = require("node:buffer");
      },
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
      75288: (e, r, t) => {
        "use strict";
        t.r(r),
          t.d(r, {
            patchFetch: () => D,
            routeModule: () => T,
            serverHooks: () => I,
            workAsyncStorage: () => E,
            workUnitAsyncStorage: () => P,
          });
        var s = {};
        t.r(s),
          t.d(s, {
            DELETE: () => _,
            GET: () => m,
            HEAD: () => k,
            OPTIONS: () => j,
            PATCH: () => O,
            POST: () => b,
            PUT: () => w,
          });
        var o = t(94168),
          i = t(51293),
          n = t(64588),
          u = t(63033),
          c = t(68119),
          a = t(29734),
          p = t(15058),
          d = t(68593),
          l = t(58342),
          f = t(79273),
          x = t(60442);
        let y = l.Ik({
          documentId: l.Yj().uuid(),
          filePath: l.Yj(),
          fileType: l.Yj(),
        });
        async function h(e) {
          let r,
            t = await (0, p.UL)(),
            s = (0, c.createServerClient)(
              "http://localhost:54321",
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0",
              {
                cookies: {
                  get: (e) => t.get(e)?.value,
                  set(e, r, s) {
                    try {
                      t.set(e, r, s);
                    } catch (e) {}
                  },
                  remove(e, r) {
                    try {
                      t.set(e, "", r);
                    } catch (e) {}
                  },
                },
              },
            ),
            {
              data: { user: o },
              error: i,
            } = await s.auth.getUser();
          if (i || !o)
            return (
              console.error("Auth error in /api/documents/process:", i),
              d.NextResponse.json({ error: "Unauthorized" }, { status: 401 })
            );
          try {
            let t = await e.json();
            r = y.parse(t);
          } catch (e) {
            return (
              console.error("Invalid request body:", e),
              d.NextResponse.json(
                {
                  error: "Invalid request body",
                  details: e instanceof f.G ? e.errors : null,
                },
                { status: 400 },
              )
            );
          }
          let { documentId: n, filePath: u, fileType: l } = r,
            { data: x, error: h } = await s
              .from("documents")
              .select("id, filename, file_path, file_type")
              .eq("id", n)
              .eq("user_id", o.id)
              .maybeSingle();
          if (h || !x)
            return (
              console.error(
                `Document verification failed for user ${o.id} and document ${n}:`,
                h,
              ),
              d.NextResponse.json(
                { error: "Document not found or access denied" },
                { status: 404 },
              )
            );
          try {
            let e = await a.vB.trigger("rag-pipeline-orchestrator", {
              id: n,
              storagePath: u,
              fileType: l,
              sourceUrl: `file://${x.file_path || u}`,
            });
            return d.NextResponse.json({
              success: !0,
              message: "RAG pipeline task triggered successfully.",
              runId: e.id,
              publicAccessToken: e.publicAccessToken,
            });
          } catch (r) {
            console.error(
              `Error triggering RAG pipeline task for document ${n}:`,
              r,
            );
            let e = "Failed to initiate document processing.";
            return (
              r instanceof Error &&
                (e = `Failed to initiate document processing: ${r.message}`),
              d.NextResponse.json({ error: e }, { status: 500 })
            );
          }
        }
        let q = { ...u },
          g =
            "workUnitAsyncStorage" in q
              ? q.workUnitAsyncStorage
              : "requestAsyncStorage" in q
                ? q.requestAsyncStorage
                : void 0;
        function v(e, r) {
          return "phase-production-build" === process.env.NEXT_PHASE ||
            "function" != typeof e
            ? e
            : new Proxy(e, {
                apply: (e, t, s) => {
                  let o;
                  try {
                    let e = g?.getStore();
                    o = e?.headers;
                  } catch (e) {}
                  return x
                    .wrapRouteHandlerWithSentry(e, {
                      method: r,
                      parameterizedRoute: "/api/documents/process",
                      headers: o,
                    })
                    .apply(t, s);
                },
              });
        }
        let m = v(void 0, "GET"),
          b = v(h, "POST"),
          w = v(void 0, "PUT"),
          O = v(void 0, "PATCH"),
          _ = v(void 0, "DELETE"),
          k = v(void 0, "HEAD"),
          j = v(void 0, "OPTIONS"),
          T = new o.AppRouteRouteModule({
            definition: {
              kind: i.RouteKind.APP_ROUTE,
              page: "/api/documents/process/route",
              pathname: "/api/documents/process",
              filename: "route",
              bundlePath: "app/api/documents/process/route",
            },
            resolvedPagePath:
              "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\api\\documents\\process\\route.ts",
            nextConfigOutput: "",
            userland: s,
          }),
          { workAsyncStorage: E, workUnitAsyncStorage: P, serverHooks: I } = T;
        function D() {
          return (0, n.patchFetch)({
            workAsyncStorage: E,
            workUnitAsyncStorage: P,
          });
        }
      },
      75919: (e) => {
        "use strict";
        e.exports = require("node:worker_threads");
      },
      76387: (e, r, t) => {
        "use strict";
        Object.defineProperty(r, "__esModule", { value: !0 }),
          Object.defineProperty(
            r,
            "createDedupedByCallsiteServerErrorLoggerDev",
            {
              enumerable: !0,
              get: function () {
                return c;
              },
            },
          );
        let s = (function (e, r) {
          if (e && e.__esModule) return e;
          if (null === e || ("object" != typeof e && "function" != typeof e))
            return { default: e };
          var t = o(r);
          if (t && t.has(e)) return t.get(e);
          var s = { __proto__: null },
            i = Object.defineProperty && Object.getOwnPropertyDescriptor;
          for (var n in e)
            if ("default" !== n && Object.prototype.hasOwnProperty.call(e, n)) {
              var u = i ? Object.getOwnPropertyDescriptor(e, n) : null;
              u && (u.get || u.set)
                ? Object.defineProperty(s, n, u)
                : (s[n] = e[n]);
            }
          return (s.default = e), t && t.set(e, s), s;
        })(t(84147));
        function o(e) {
          if ("function" != typeof WeakMap) return null;
          var r = new WeakMap(),
            t = new WeakMap();
          return (o = function (e) {
            return e ? t : r;
          })(e);
        }
        let i = { current: null },
          n = "function" == typeof s.cache ? s.cache : (e) => e,
          u = console.warn;
        function c(e) {
          return function (...r) {
            u(e(...r));
          };
        }
        n((e) => {
          try {
            u(i.current);
          } finally {
            i.current = null;
          }
        });
      },
      76760: (e) => {
        "use strict";
        e.exports = require("node:path");
      },
      77030: (e) => {
        "use strict";
        e.exports = require("node:net");
      },
      77598: (e) => {
        "use strict";
        e.exports = require("node:crypto");
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
  var r = require("../../../../webpack-runtime.js");
  r.C(e);
  var t = (e) => r((r.s = e)),
    s = r.X(0, [827, 7719, 8119, 5058, 5400, 8342, 3626], () => t(75288));
  module.exports = s;
})();
//# sourceMappingURL=route.js.map
