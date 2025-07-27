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
    (e._sentryDebugIds[r] = "83d82188-02a9-42a5-b018-e1f53830ddcd"),
    (e._sentryDebugIdIdentifier =
      "sentry-dbid-83d82188-02a9-42a5-b018-e1f53830ddcd"));
} catch (e) {}
(() => {
  var e = {};
  (e.id = 2695),
    (e.ids = [2695]),
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
      37830: (e) => {
        "use strict";
        e.exports = require("node:stream/web");
      },
      38522: (e) => {
        "use strict";
        e.exports = require("node:zlib");
      },
      41692: (e) => {
        "use strict";
        e.exports = require("node:tls");
      },
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
      55298: (e, r, t) => {
        "use strict";
        t.a(e, async (e, s) => {
          try {
            t.r(r),
              t.d(r, {
                patchFetch: () => c,
                routeModule: () => d,
                serverHooks: () => h,
                workAsyncStorage: () => p,
                workUnitAsyncStorage: () => l,
              });
            var o = t(94168),
              i = t(51293),
              n = t(64588),
              u = t(99843),
              a = e([u]);
            u = (a.then ? (await a)() : a)[0];
            let d = new o.AppRouteRouteModule({
                definition: {
                  kind: i.RouteKind.APP_ROUTE,
                  page: "/api/rag/search/route",
                  pathname: "/api/rag/search",
                  filename: "route",
                  bundlePath: "app/api/rag/search/route",
                },
                resolvedPagePath:
                  "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\api\\rag\\search\\route.ts",
                nextConfigOutput: "",
                userland: u,
              }),
              {
                workAsyncStorage: p,
                workUnitAsyncStorage: l,
                serverHooks: h,
              } = d;
            function c() {
              return (0, n.patchFetch)({
                workAsyncStorage: p,
                workUnitAsyncStorage: l,
              });
            }
            s();
          } catch (e) {
            s(e);
          }
        });
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
      85488: (e) => {
        "use strict";
        e.exports = import("ai");
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
      99843: (e, r, t) => {
        "use strict";
        t.a(e, async (e, s) => {
          try {
            t.r(r),
              t.d(r, {
                DELETE: () => m,
                GET: () => E,
                HEAD: () => v,
                OPTIONS: () => P,
                PATCH: () => w,
                POST: () => b,
                PUT: () => _,
              });
            var o = t(63033),
              i = t(68593),
              n = t(58342),
              u = t(79273),
              a = t(16573),
              c = t(99660),
              d = t(77719),
              p = t(57826),
              l = t(60442),
              h = e([c]);
            c = (h.then ? (await h)() : h)[0];
            let y = n.Ik({ query: n.Yj(), userId: n.Yj().optional() });
            async function f(e) {
              try {
                let r = await e.json(),
                  { query: t, userId: s } = y.parse(r),
                  o = (0, d.createClient)(
                    "http://localhost:54321",
                    process.env.SUPABASE_SERVICE_ROLE_KEY,
                  ),
                  i = new p.Ay({ apiKey: process.env.OPENAI_API_KEY }),
                  n = new a.r(o, i),
                  u = new c.J(),
                  l = await n.search(t, { userId: s });
                return u.generate(t, l, l.userContext);
              } catch (e) {
                if (
                  (console.error("Error in RAG search API:", e),
                  e instanceof u.G)
                )
                  return i.NextResponse.json(
                    { error: e.issues },
                    { status: 400 },
                  );
                return i.NextResponse.json(
                  { error: "An internal error occurred." },
                  { status: 500 },
                );
              }
            }
            let q = { ...o },
              g =
                "workUnitAsyncStorage" in q
                  ? q.workUnitAsyncStorage
                  : "requestAsyncStorage" in q
                    ? q.requestAsyncStorage
                    : void 0;
            function x(e, r) {
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
                      return l
                        .wrapRouteHandlerWithSentry(e, {
                          method: r,
                          parameterizedRoute: "/api/rag/search",
                          headers: o,
                        })
                        .apply(t, s);
                    },
                  });
            }
            let E = x(void 0, "GET"),
              b = x(f, "POST"),
              _ = x(void 0, "PUT"),
              w = x(void 0, "PATCH"),
              m = x(void 0, "DELETE"),
              v = x(void 0, "HEAD"),
              P = x(void 0, "OPTIONS");
            s();
          } catch (e) {
            s(e);
          }
        });
      },
    });
  var r = require("../../../../webpack-runtime.js");
  r.C(e);
  var t = (e) => r((r.s = e)),
    s = r.X(0, [827, 7719, 5400, 8342, 7826, 4256, 3346, 4170, 8305, 662], () =>
      t(55298),
    );
  module.exports = s;
})();
//# sourceMappingURL=route.js.map
