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
    (e._sentryDebugIds[t] = "8de6adf8-eb93-4f17-b1e4-bc69ea42fb8a"),
    (e._sentryDebugIdIdentifier =
      "sentry-dbid-8de6adf8-eb93-4f17-b1e4-bc69ea42fb8a"));
} catch (e) {}
(() => {
  var e = {};
  (e.id = 2371),
    (e.ids = [2371]),
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
      78044: (e, t, r) => {
        "use strict";
        r.r(t),
          r.d(t, {
            patchFetch: () => R,
            routeModule: () => E,
            serverHooks: () => v,
            workAsyncStorage: () => P,
            workUnitAsyncStorage: () => _,
          });
        var s = {};
        r.r(s),
          r.d(s, {
            DELETE: () => m,
            GET: () => y,
            HEAD: () => q,
            OPTIONS: () => w,
            PATCH: () => g,
            POST: () => x,
            PUT: () => b,
          });
        var o = r(94168),
          n = r(51293),
          i = r(64588),
          a = r(63033),
          u = r(68593),
          c = r(60442);
        async function d(e) {
          let t = new URL("/api/documents", e.url);
          e.nextUrl.searchParams.forEach((e, r) => {
            t.searchParams.set(r, e);
          });
          try {
            let r = await fetch(t.toString(), {
              method: "GET",
              headers: e.headers,
            });
            return new Response(await r.text(), {
              status: r.status,
              headers: {
                "Content-Type":
                  r.headers.get("Content-Type") || "application/json",
              },
            });
          } catch (e) {
            return (
              console.error("Error forwarding request to API:", e),
              u.NextResponse.json(
                { error: "Failed to process request" },
                { status: 500 },
              )
            );
          }
        }
        async function p(e) {
          let t = e.clone(),
            r = new URL("/api/documents", e.url);
          try {
            let s = await fetch(r.toString(), {
              method: "POST",
              headers: e.headers,
              body: await t.arrayBuffer(),
            });
            return new Response(await s.text(), {
              status: s.status,
              headers: {
                "Content-Type":
                  s.headers.get("Content-Type") || "application/json",
              },
            });
          } catch (e) {
            return (
              console.error("Error forwarding request to API:", e),
              u.NextResponse.json(
                { error: "Failed to process request" },
                { status: 500 },
              )
            );
          }
        }
        let l = { ...a },
          h =
            "workUnitAsyncStorage" in l
              ? l.workUnitAsyncStorage
              : "requestAsyncStorage" in l
                ? l.requestAsyncStorage
                : void 0;
        function f(e, t) {
          return "phase-production-build" === process.env.NEXT_PHASE ||
            "function" != typeof e
            ? e
            : new Proxy(e, {
                apply: (e, r, s) => {
                  let o;
                  try {
                    let e = h?.getStore();
                    o = e?.headers;
                  } catch (e) {}
                  return c
                    .wrapRouteHandlerWithSentry(e, {
                      method: t,
                      parameterizedRoute:
                        "/(authenticated)/dashboard/documents",
                      headers: o,
                    })
                    .apply(r, s);
                },
              });
        }
        let y = f(d, "GET"),
          x = f(p, "POST"),
          b = f(void 0, "PUT"),
          g = f(void 0, "PATCH"),
          m = f(void 0, "DELETE"),
          q = f(void 0, "HEAD"),
          w = f(void 0, "OPTIONS"),
          E = new o.AppRouteRouteModule({
            definition: {
              kind: n.RouteKind.APP_ROUTE,
              page: "/(authenticated)/dashboard/documents/route",
              pathname: "/dashboard/documents",
              filename: "route",
              bundlePath: "app/(authenticated)/dashboard/documents/route",
            },
            resolvedPagePath:
              "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\(authenticated)\\dashboard\\documents\\route.ts",
            nextConfigOutput: "",
            userland: s,
          }),
          { workAsyncStorage: P, workUnitAsyncStorage: _, serverHooks: v } = E;
        function R() {
          return (0, i.patchFetch)({
            workAsyncStorage: P,
            workUnitAsyncStorage: _,
          });
        }
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
              return a;
            },
            throwWithStaticGenerationBailoutError: function () {
              return n;
            },
            throwWithStaticGenerationBailoutErrorWithDynamicError: function () {
              return i;
            },
          });
        let s = r(57154),
          o = r(3295);
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
        function a(e) {
          throw Object.defineProperty(
            Error(
              `Route ${e} used "searchParams" inside "use cache". Accessing Dynamic data sources inside a cache scope is not supported. If you need this data inside a cached function use "searchParams" outside of the cached function and pass the required dynamic data in as an argument. See more info here: https://nextjs.org/docs/messages/next-request-in-use-cache`,
            ),
            "__NEXT_ERROR_CODE",
            { value: "E634", enumerable: !1, configurable: !0 },
          );
        }
        function u() {
          let e = o.afterTaskAsyncStorage.getStore();
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
    });
  var t = require("../../../../webpack-runtime.js");
  t.C(e);
  var r = (e) => t((t.s = e)),
    s = t.X(0, [827, 5400], () => r(78044));
  module.exports = s;
})();
//# sourceMappingURL=route.js.map
