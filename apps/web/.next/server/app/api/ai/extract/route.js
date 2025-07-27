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
    (e._sentryDebugIds[r] = "907a3b9d-7639-4a14-a53e-6e05c167496f"),
    (e._sentryDebugIdIdentifier =
      "sentry-dbid-907a3b9d-7639-4a14-a53e-6e05c167496f"));
} catch (e) {}
(() => {
  var e = {};
  (e.id = 5446),
    (e.ids = [5446]),
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
      26457: (e, r, t) => {
        "use strict";
        let s;
        t.d(r, {
          AG: () => b,
          ND: () => v,
          UU: () => y,
          db: () => g,
          ln: () => E,
          nH: () => m,
          r: () => _,
        });
        var o = t(68119),
          i = t(77719),
          n = t(60131),
          a = t.n(n);
        t(84147);
        let { fetch: c } = a()(),
          u = "http://localhost:54321",
          d =
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0",
          l = process.env.SUPABASE_SERVICE_ROLE_KEY,
          p = d ? { apikey: d } : void 0,
          h = l ? { apikey: l } : void 0;
        function f() {
          if (!u || !d)
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
            ((e.fetch = c), (e.__USING_PONYFETCH__ = !0));
        }
        function x() {
          return (f(), s)
            ? s
            : (s = (0, o.createBrowserClient)(u, d, {
                global: { headers: p },
              }));
        }
        function y() {
          return (
            f(), (0, o.createBrowserClient)(u, d, { global: { headers: p } })
          );
        }
        function g(e) {
          return (
            f(),
            (0, o.createServerClient)(u, d, {
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
              global: { fetch: c, headers: p },
            })
          );
        }
        function m() {
          if (!u || !l)
            throw (
              (console.error("Supabase URL or Service Role Key is missing"),
              Error("Supabase service client configuration is incomplete."))
            );
          return (0, i.createClient)(u, l, {
            auth: { autoRefreshToken: !1, persistSession: !1 },
            global: { fetch: c, headers: h },
          });
        }
        let E = (e) => {
            f();
            let r = e.headers.get("cookie") ?? "";
            return (0, o.createServerClient)(u, d, {
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
              global: { fetch: c, headers: p },
            });
          },
          b = x,
          _ = m,
          v = x();
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
      45979: (e, r, t) => {
        "use strict";
        t.r(r),
          t.d(r, {
            patchFetch: () => T,
            routeModule: () => O,
            serverHooks: () => k,
            workAsyncStorage: () => P,
            workUnitAsyncStorage: () => A,
          });
        var s = {};
        t.r(s),
          t.d(s, {
            DELETE: () => q,
            GET: () => b,
            HEAD: () => R,
            OPTIONS: () => S,
            PATCH: () => w,
            POST: () => _,
            PUT: () => v,
            dynamic: () => h,
            maxDuration: () => f,
          });
        var o = t(94168),
          i = t(51293),
          n = t(64588),
          a = t(63033),
          c = t(68593),
          u = t(58342),
          d = t(79273),
          l = t(26457),
          p = t(60442);
        let h = "force-dynamic",
          f = 60,
          x = u.Ik({
            urls: u.YO(u.Yj().url()),
            prompt: u.Yj().min(1, "Prompt cannot be empty"),
          });
        async function y(e) {
          try {
            let r = await e.json(),
              { urls: s, prompt: o } = x.parse(r);
            if (!process.env.FIRECRAWL_API_KEY)
              return c.NextResponse.json({
                success: !0,
                data: {
                  extracted: `This is a fallback response because the extraction service is not configured. You wanted to extract information about "${o}" from ${s.length} URLs.`,
                },
              });
            try {
              let e;
              try {
                let r = new (
                  await Promise.all([t.e(5431), t.e(866)]).then(
                    t.bind(t, 90866),
                  )
                ).default({ apiKey: process.env.FIRECRAWL_API_KEY });
                e = await r.extract(s, { prompt: o });
              } catch (e) {
                throw (
                  (console.error("Firecrawl not available:", e),
                  Error("Extraction service not available"))
                );
              }
              if (!e.success) throw Error(e.error || "Extraction failed");
              try {
                let e = (0, l.AG)();
                await e
                  .from("extraction_queries")
                  .insert({
                    urls: s.join(","),
                    prompt: o,
                    timestamp: new Date().toISOString(),
                  });
              } catch (e) {
                console.error("Failed to log extraction:", e);
              }
              return c.NextResponse.json({ success: !0, data: e.data });
            } catch (e) {
              throw (console.error("Firecrawl extraction error:", e), e);
            }
          } catch (e) {
            return (
              console.error("Extraction API error:", e),
              c.NextResponse.json(
                {
                  success: !1,
                  error:
                    e instanceof Error
                      ? e.message
                      : "An unknown error occurred",
                },
                { status: e instanceof d.G ? 400 : 500 },
              )
            );
          }
        }
        let g = { ...a },
          m =
            "workUnitAsyncStorage" in g
              ? g.workUnitAsyncStorage
              : "requestAsyncStorage" in g
                ? g.requestAsyncStorage
                : void 0;
        function E(e, r) {
          return "phase-production-build" === process.env.NEXT_PHASE ||
            "function" != typeof e
            ? e
            : new Proxy(e, {
                apply: (e, t, s) => {
                  let o;
                  try {
                    let e = m?.getStore();
                    o = e?.headers;
                  } catch (e) {}
                  return p
                    .wrapRouteHandlerWithSentry(e, {
                      method: r,
                      parameterizedRoute: "/api/ai/extract",
                      headers: o,
                    })
                    .apply(t, s);
                },
              });
        }
        let b = E(void 0, "GET"),
          _ = E(y, "POST"),
          v = E(void 0, "PUT"),
          w = E(void 0, "PATCH"),
          q = E(void 0, "DELETE"),
          R = E(void 0, "HEAD"),
          S = E(void 0, "OPTIONS"),
          O = new o.AppRouteRouteModule({
            definition: {
              kind: i.RouteKind.APP_ROUTE,
              page: "/api/ai/extract/route",
              pathname: "/api/ai/extract",
              filename: "route",
              bundlePath: "app/api/ai/extract/route",
            },
            resolvedPagePath:
              "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\api\\ai\\extract\\route.ts",
            nextConfigOutput: "",
            userland: s,
          }),
          { workAsyncStorage: P, workUnitAsyncStorage: A, serverHooks: k } = O;
        function T() {
          return (0, n.patchFetch)({
            workAsyncStorage: P,
            workUnitAsyncStorage: A,
          });
        }
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
              return c;
            },
            throwForSearchParamsAccessInUseCache: function () {
              return a;
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
        function a(e) {
          throw Object.defineProperty(
            Error(
              `Route ${e} used "searchParams" inside "use cache". Accessing Dynamic data sources inside a cache scope is not supported. If you need this data inside a cached function use "searchParams" outside of the cached function and pass the required dynamic data in as an argument. See more info here: https://nextjs.org/docs/messages/next-request-in-use-cache`,
            ),
            "__NEXT_ERROR_CODE",
            { value: "E634", enumerable: !1, configurable: !0 },
          );
        }
        function c() {
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
  var r = require("../../../../webpack-runtime.js");
  r.C(e);
  var t = (e) => r((r.s = e)),
    s = r.X(0, [827, 7719, 8119, 5400, 131, 8342], () => t(45979));
  module.exports = s;
})();
//# sourceMappingURL=route.js.map
