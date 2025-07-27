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
    (e._sentryDebugIds[r] = "f4204242-31a0-406e-a4df-8b4eaad5adec"),
    (e._sentryDebugIdIdentifier =
      "sentry-dbid-f4204242-31a0-406e-a4df-8b4eaad5adec"));
} catch (e) {}
(() => {
  var e = {};
  (e.id = 7396),
    (e.ids = [7396]),
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
      26457: (e, r, t) => {
        "use strict";
        let s;
        t.d(r, {
          AG: () => v,
          ND: () => m,
          UU: () => b,
          db: () => g,
          ln: () => _,
          nH: () => x,
          r: () => E,
        });
        var o = t(68119),
          n = t(77719),
          i = t(60131),
          a = t.n(i);
        t(84147);
        let { fetch: u } = a()(),
          c = "http://localhost:54321",
          d =
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0",
          l = process.env.SUPABASE_SERVICE_ROLE_KEY,
          p = d ? { apikey: d } : void 0,
          f = l ? { apikey: l } : void 0;
        function h() {
          if (!c || !d)
            throw (
              (console.error(
                "Missing environment variables NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY",
              ),
              Error("Supabase URL or Anon Key is missing."))
            );
        }
        {
          let e = globalThis;
          e.__USING_PONYFETCH__ ||
            ((e.fetch = u), (e.__USING_PONYFETCH__ = !0));
        }
        function y() {
          return (h(), s)
            ? s
            : (s = (0, o.createBrowserClient)(c, d, {
                global: { headers: p },
              }));
        }
        function b() {
          return (
            h(), (0, o.createBrowserClient)(c, d, { global: { headers: p } })
          );
        }
        function g(e) {
          return (
            h(),
            (0, o.createServerClient)(c, d, {
              cookies: {
                get: (r) => e.get(r)?.value,
                set(r, t, s) {
                  try {
                    e.set(r, t, s);
                  } catch (e) {
                    console.warn(`Failed to set cookie '${r}':`, e);
                  }
                },
                remove(r, t) {
                  try {
                    e.set(r, "", t);
                  } catch (e) {
                    console.warn(`Failed to remove cookie '${r}':`, e);
                  }
                },
              },
              global: { fetch: u, headers: p },
            })
          );
        }
        function x() {
          if (!c || !l)
            throw (
              (console.error("Supabase URL or Service Role Key is missing"),
              Error("Supabase service client configuration is incomplete."))
            );
          return (0, n.createClient)(c, l, {
            auth: { autoRefreshToken: !1, persistSession: !1 },
            global: { fetch: u, headers: f },
          });
        }
        let _ = (e) => {
            h();
            let r = e.headers.get("cookie") ?? "";
            return (0, o.createServerClient)(c, d, {
              cookies: {
                get(e) {
                  let t = r.match(RegExp(`(^|;)s*${e}=([^;]+)`));
                  return t?.[2];
                },
                set(e, r, t) {
                  console.warn(
                    `Attempted to set cookie '${e}' in createEdgeClient. This must be handled by the caller via Response headers.`,
                  );
                },
                remove(e, r) {
                  console.warn(
                    `Attempted to remove cookie '${e}' in createEdgeClient. This must be handled by the caller via Response headers.`,
                  );
                },
              },
              global: { fetch: u, headers: p },
            });
          },
          v = y,
          E = x,
          m = y();
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
      46122: (e, r, t) => {
        "use strict";
        t.r(r),
          t.d(r, {
            patchFetch: () => P,
            routeModule: () => m,
            serverHooks: () => q,
            workAsyncStorage: () => w,
            workUnitAsyncStorage: () => O,
          });
        var s = {};
        t.r(s),
          t.d(s, {
            DELETE: () => _,
            GET: () => y,
            HEAD: () => v,
            OPTIONS: () => E,
            PATCH: () => x,
            POST: () => b,
            PUT: () => g,
          });
        var o = t(94168),
          n = t(51293),
          i = t(64588),
          a = t(63033),
          u = t(68593),
          c = t(48149),
          d = t(60442);
        async function l(e) {
          let r = new URL(e.url),
            t = r.searchParams.get("code");
          if (t) {
            let e = await (0, c.UU)();
            await e.auth.exchangeCodeForSession(t);
          }
          return u.NextResponse.redirect(r.origin);
        }
        let p = { ...a },
          f =
            "workUnitAsyncStorage" in p
              ? p.workUnitAsyncStorage
              : "requestAsyncStorage" in p
                ? p.requestAsyncStorage
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
                  return d
                    .wrapRouteHandlerWithSentry(e, {
                      method: r,
                      parameterizedRoute: "/auth/callback",
                      headers: o,
                    })
                    .apply(t, s);
                },
              });
        }
        let y = h(l, "GET"),
          b = h(void 0, "POST"),
          g = h(void 0, "PUT"),
          x = h(void 0, "PATCH"),
          _ = h(void 0, "DELETE"),
          v = h(void 0, "HEAD"),
          E = h(void 0, "OPTIONS"),
          m = new o.AppRouteRouteModule({
            definition: {
              kind: n.RouteKind.APP_ROUTE,
              page: "/auth/callback/route",
              pathname: "/auth/callback",
              filename: "route",
              bundlePath: "app/auth/callback/route",
            },
            resolvedPagePath:
              "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\auth\\callback\\route.ts",
            nextConfigOutput: "",
            userland: s,
          }),
          { workAsyncStorage: w, workUnitAsyncStorage: O, serverHooks: q } = m;
        function P() {
          return (0, i.patchFetch)({
            workAsyncStorage: w,
            workUnitAsyncStorage: O,
          });
        }
      },
      48149: (e, r, t) => {
        "use strict";
        t.d(r, { UU: () => n, nH: () => o.nH });
        var s = t(15058),
          o = t(26457);
        let n = async function () {
          let e = await (0, s.UL)();
          return (0, o.db)(e);
        };
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
                return u;
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
            n = Object.defineProperty && Object.getOwnPropertyDescriptor;
          for (var i in e)
            if ("default" !== i && Object.prototype.hasOwnProperty.call(e, i)) {
              var a = n ? Object.getOwnPropertyDescriptor(e, i) : null;
              a && (a.get || a.set)
                ? Object.defineProperty(s, i, a)
                : (s[i] = e[i]);
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
        let n = { current: null },
          i = "function" == typeof s.cache ? s.cache : (e) => e,
          a = console.warn;
        function u(e) {
          return function (...r) {
            a(e(...r));
          };
        }
        i((e) => {
          try {
            a(n.current);
          } finally {
            n.current = null;
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
      90020: (e, r, t) => {
        "use strict";
        Object.defineProperty(r, "__esModule", { value: !0 }),
          !(function (e, r) {
            for (var t in r)
              Object.defineProperty(e, t, { enumerable: !0, get: r[t] });
          })(r, {
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
        let s = t(57154),
          o = t(3295);
        function n(e, r) {
          throw Object.defineProperty(
            new s.StaticGenBailoutError(
              `Route ${e} couldn't be rendered statically because it used ${r}. See more info here: https://nextjs.org/docs/app/building-your-application/rendering/static-and-dynamic#dynamic-rendering`,
            ),
            "__NEXT_ERROR_CODE",
            { value: "E576", enumerable: !1, configurable: !0 },
          );
        }
        function i(e, r) {
          throw Object.defineProperty(
            new s.StaticGenBailoutError(
              `Route ${e} with \`dynamic = "error"\` couldn't be rendered statically because it used ${r}. See more info here: https://nextjs.org/docs/app/building-your-application/rendering/static-and-dynamic#dynamic-rendering`,
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
  var r = require("../../../webpack-runtime.js");
  r.C(e);
  var t = (e) => r((r.s = e)),
    s = r.X(0, [827, 7719, 8119, 5058, 5400, 131], () => t(46122));
  module.exports = s;
})();
//# sourceMappingURL=route.js.map
