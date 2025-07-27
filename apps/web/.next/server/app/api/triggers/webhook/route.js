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
    (e._sentryDebugIds[r] = "9249b8fe-b391-41af-94ab-d24afab16932"),
    (e._sentryDebugIdIdentifier =
      "sentry-dbid-9249b8fe-b391-41af-94ab-d24afab16932"));
} catch (e) {}
(() => {
  var e = {};
  (e.id = 1411),
    (e.ids = [1411]),
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
      55537: (e, r, t) => {
        "use strict";
        t.r(r),
          t.d(r, {
            patchFetch: () => _,
            routeModule: () => v,
            serverHooks: () => T,
            workAsyncStorage: () => m,
            workUnitAsyncStorage: () => E,
          });
        var s = {};
        t.r(s),
          t.d(s, {
            DELETE: () => y,
            GET: () => h,
            HEAD: () => w,
            OPTIONS: () => k,
            PATCH: () => b,
            POST: () => q,
            PUT: () => f,
          });
        var o = t(94168),
          i = t(51293),
          n = t(64588),
          u = t(63033),
          a = t(68593),
          c = t(29734),
          p = t(60442);
        async function d(e) {
          try {
            let r,
              { taskType: t, ...s } = await e.json();
            switch (t) {
              case "hello-world":
                r = await c.vB.trigger("hello-world", s);
                break;
              case "immigration-document-analysis":
                r = await c.vB.trigger("immigration-document-analysis", s);
                break;
              case "batch-document-processing":
                r = await c.vB.trigger("batch-document-processing", s);
                break;
              default:
                return a.NextResponse.json(
                  { error: `Unknown task type: ${t}` },
                  { status: 400 },
                );
            }
            return a.NextResponse.json({
              success: !0,
              taskId: r.id,
              publicAccessToken: r.publicAccessToken,
              taskType: t,
            });
          } catch (e) {
            return (
              console.error("Webhook trigger error:", e),
              a.NextResponse.json(
                {
                  error: "Failed to trigger task",
                  details: e instanceof Error ? e.message : String(e),
                },
                { status: 500 },
              )
            );
          }
        }
        let l = { ...u },
          x =
            "workUnitAsyncStorage" in l
              ? l.workUnitAsyncStorage
              : "requestAsyncStorage" in l
                ? l.requestAsyncStorage
                : void 0;
        function g(e, r) {
          return "phase-production-build" === process.env.NEXT_PHASE ||
            "function" != typeof e
            ? e
            : new Proxy(e, {
                apply: (e, t, s) => {
                  let o;
                  try {
                    let e = x?.getStore();
                    o = e?.headers;
                  } catch (e) {}
                  return p
                    .wrapRouteHandlerWithSentry(e, {
                      method: r,
                      parameterizedRoute: "/api/triggers/webhook",
                      headers: o,
                    })
                    .apply(t, s);
                },
              });
        }
        let h = g(void 0, "GET"),
          q = g(d, "POST"),
          f = g(void 0, "PUT"),
          b = g(void 0, "PATCH"),
          y = g(void 0, "DELETE"),
          w = g(void 0, "HEAD"),
          k = g(void 0, "OPTIONS"),
          v = new o.AppRouteRouteModule({
            definition: {
              kind: i.RouteKind.APP_ROUTE,
              page: "/api/triggers/webhook/route",
              pathname: "/api/triggers/webhook",
              filename: "route",
              bundlePath: "app/api/triggers/webhook/route",
            },
            resolvedPagePath:
              "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\api\\triggers\\webhook\\route.ts",
            nextConfigOutput: "",
            userland: s,
          }),
          { workAsyncStorage: m, workUnitAsyncStorage: E, serverHooks: T } = v;
        function _() {
          return (0, n.patchFetch)({
            workAsyncStorage: m,
            workUnitAsyncStorage: E,
          });
        }
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
      77598: (e) => {
        "use strict";
        e.exports = require("node:crypto");
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
    });
  var r = require("../../../../webpack-runtime.js");
  r.C(e);
  var t = (e) => r((r.s = e)),
    s = r.X(0, [827, 5400, 3626], () => t(55537));
  module.exports = s;
})();
//# sourceMappingURL=route.js.map
