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
    (e._sentryDebugIds[r] = "a29fdcad-5402-4161-ab19-590811e09291"),
    (e._sentryDebugIdIdentifier =
      "sentry-dbid-a29fdcad-5402-4161-ab19-590811e09291"));
} catch (e) {}
(() => {
  var e = {};
  (e.id = 5904),
    (e.ids = [5904]),
    (e.modules = {
      252: (e, r) => {
        "use strict";
        Object.defineProperty(r, "__esModule", { value: !0 }),
          Object.defineProperty(r, "ReflectAdapter", {
            enumerable: !0,
            get: function () {
              return t;
            },
          });
        class t {
          static get(e, r, t) {
            let s = Reflect.get(e, r, t);
            return "function" == typeof s ? s.bind(e) : s;
          }
          static set(e, r, t, s) {
            return Reflect.set(e, r, t, s);
          }
          static has(e, r) {
            return Reflect.has(e, r);
          }
          static deleteProperty(e, r) {
            return Reflect.deleteProperty(e, r);
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
      71647: (e, r, t) => {
        "use strict";
        t.r(r),
          t.d(r, {
            patchFetch: () => R,
            routeModule: () => _,
            serverHooks: () => P,
            workAsyncStorage: () => w,
            workUnitAsyncStorage: () => v,
          });
        var s = {};
        t.r(s),
          t.d(s, {
            DELETE: () => b,
            GET: () => x,
            HEAD: () => E,
            OPTIONS: () => m,
            PATCH: () => q,
            POST: () => y,
            PUT: () => g,
          });
        var o = t(94168),
          i = t(51293),
          n = t(64588),
          u = t(63033),
          a = t(68593),
          c = t(60442);
        async function d(e) {
          return a.NextResponse.redirect(new URL("/auth/login", e.url));
        }
        async function p(e) {
          return a.NextResponse.redirect(new URL("/auth/login", e.url));
        }
        let l = { ...u },
          f =
            "workUnitAsyncStorage" in l
              ? l.workUnitAsyncStorage
              : "requestAsyncStorage" in l
                ? l.requestAsyncStorage
                : void 0;
        function h(e, r) {
          return "phase-production-build" === process.env.NEXT_PHASE ||
            "function" != typeof e
            ? e
            : new Proxy(e, {
                apply: (e, t, s) => {
                  let o;
                  try {
                    let e = f?.getStore();
                    o = e?.headers;
                  } catch (e) {}
                  return c
                    .wrapRouteHandlerWithSentry(e, {
                      method: r,
                      parameterizedRoute: "/login",
                      headers: o,
                    })
                    .apply(t, s);
                },
              });
        }
        let x = h(d, "GET"),
          y = h(p, "POST"),
          g = h(void 0, "PUT"),
          q = h(void 0, "PATCH"),
          b = h(void 0, "DELETE"),
          E = h(void 0, "HEAD"),
          m = h(void 0, "OPTIONS"),
          _ = new o.AppRouteRouteModule({
            definition: {
              kind: i.RouteKind.APP_ROUTE,
              page: "/login/route",
              pathname: "/login",
              filename: "route",
              bundlePath: "app/login/route",
            },
            resolvedPagePath:
              "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\login\\route.ts",
            nextConfigOutput: "",
            userland: s,
          }),
          { workAsyncStorage: w, workUnitAsyncStorage: v, serverHooks: P } = _;
        function R() {
          return (0, n.patchFetch)({
            workAsyncStorage: w,
            workUnitAsyncStorage: v,
          });
        }
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
      90020: (e, r, t) => {
        "use strict";
        Object.defineProperty(r, "__esModule", { value: !0 }),
          !(function (e, r) {
            for (var t in r)
              Object.defineProperty(e, t, { enumerable: !0, get: r[t] });
          })(r, {
            isRequestAPICallableInsideAfter: function () {
              return a;
            },
            throwForSearchParamsAccessInUseCache: function () {
              return u;
            },
            throwWithStaticGenerationBailoutError: function () {
              return i;
            },
            throwWithStaticGenerationBailoutErrorWithDynamicError: function () {
              return n;
            },
          });
        let s = t(57154),
          o = t(3295);
        function i(e, r) {
          throw Object.defineProperty(
            new s.StaticGenBailoutError(
              `Route ${e} couldn't be rendered statically because it used ${r}. See more info here: https://nextjs.org/docs/app/building-your-application/rendering/static-and-dynamic#dynamic-rendering`,
            ),
            "__NEXT_ERROR_CODE",
            { value: "E576", enumerable: !1, configurable: !0 },
          );
        }
        function n(e, r) {
          throw Object.defineProperty(
            new s.StaticGenBailoutError(
              `Route ${e} with \`dynamic = "error"\` couldn't be rendered statically because it used ${r}. See more info here: https://nextjs.org/docs/app/building-your-application/rendering/static-and-dynamic#dynamic-rendering`,
            ),
            "__NEXT_ERROR_CODE",
            { value: "E543", enumerable: !1, configurable: !0 },
          );
        }
        function u(e) {
          throw Object.defineProperty(
            Error(
              `Route ${e} used "searchParams" inside "use cache". Accessing Dynamic data sources inside a cache scope is not supported. If you need this data inside a cached function use "searchParams" outside of the cached function and pass the required dynamic data in as an argument. See more info here: https://nextjs.org/docs/messages/next-request-in-use-cache`,
            ),
            "__NEXT_ERROR_CODE",
            { value: "E634", enumerable: !1, configurable: !0 },
          );
        }
        function a() {
          let e = o.afterTaskAsyncStorage.getStore();
          return (null == e ? void 0 : e.rootTaskSpawnPhase) === "action";
        }
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
  var r = require("../../webpack-runtime.js");
  r.C(e);
  var t = (e) => r((r.s = e)),
    s = r.X(0, [827, 5400], () => t(71647));
  module.exports = s;
})();
//# sourceMappingURL=route.js.map
