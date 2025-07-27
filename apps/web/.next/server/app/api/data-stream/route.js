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
    (e._sentryDebugIds[t] = "5a1c97ff-cbb2-448c-9ede-524368f15dce"),
    (e._sentryDebugIdIdentifier =
      "sentry-dbid-5a1c97ff-cbb2-448c-9ede-524368f15dce"));
} catch (e) {}
(() => {
  var e = {};
  (e.id = 7315),
    (e.ids = [7315]),
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
      26457: (e, t, r) => {
        "use strict";
        let s;
        r.d(t, {
          AG: () => _,
          ND: () => v,
          UU: () => m,
          db: () => g,
          ln: () => x,
          nH: () => b,
          r: () => E,
        });
        var o = r(68119),
          n = r(77719),
          i = r(60131),
          a = r.n(i);
        r(84147);
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
        function y() {
          return (f(), s)
            ? s
            : (s = (0, o.createBrowserClient)(u, d, {
                global: { headers: p },
              }));
        }
        function m() {
          return (
            f(), (0, o.createBrowserClient)(u, d, { global: { headers: p } })
          );
        }
        function g(e) {
          return (
            f(),
            (0, o.createServerClient)(u, d, {
              cookies: {
                get: (t) => e.get(t)?.value,
                set(t, r, s) {
                  try {
                    e.set(t, r, s);
                  } catch (e) {
                    console.warn(`Failed to set cookie '${t}':`, e);
                  }
                },
                remove(t, r) {
                  try {
                    e.set(t, "", r);
                  } catch (e) {
                    console.warn(`Failed to remove cookie '${t}':`, e);
                  }
                },
              },
              global: { fetch: c, headers: p },
            })
          );
        }
        function b() {
          if (!u || !l)
            throw (
              (console.error("Supabase URL or Service Role Key is missing"),
              Error("Supabase service client configuration is incomplete."))
            );
          return (0, n.createClient)(u, l, {
            auth: { autoRefreshToken: !1, persistSession: !1 },
            global: { fetch: c, headers: h },
          });
        }
        let x = (e) => {
            f();
            let t = e.headers.get("cookie") ?? "";
            return (0, o.createServerClient)(u, d, {
              cookies: {
                get(e) {
                  let r = t.match(RegExp(`(^|;)s*${e}=([^;]+)`));
                  return r?.[2];
                },
                set(e, t, r) {
                  console.warn(
                    `Attempted to set cookie '${e}' in createEdgeClient. This must be handled by the caller via Response headers.`,
                  );
                },
                remove(e, t) {
                  console.warn(
                    `Attempted to remove cookie '${e}' in createEdgeClient. This must be handled by the caller via Response headers.`,
                  );
                },
              },
              global: { fetch: c, headers: p },
            });
          },
          _ = y,
          E = b,
          v = y();
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
      53478: (e, t, r) => {
        "use strict";
        r.r(t),
          r.d(t, {
            patchFetch: () => R,
            routeModule: () => q,
            serverHooks: () => O,
            workAsyncStorage: () => w,
            workUnitAsyncStorage: () => S,
          });
        var s = {};
        r.r(s),
          r.d(s, {
            DELETE: () => _,
            GET: () => m,
            HEAD: () => E,
            OPTIONS: () => v,
            PATCH: () => x,
            POST: () => g,
            PUT: () => b,
            dynamic: () => l,
          });
        var o = r(94168),
          n = r(51293),
          i = r(64588),
          a = r(63033),
          c = r(68593),
          u = r(26457),
          d = r(60442);
        let l = "force-dynamic";
        async function p(e) {
          let { searchParams: t } = new URL(e.url),
            r = t.get("id");
          return r
            ? new Response(
                new ReadableStream({
                  start: async (t) => {
                    function s(e) {
                      let r = `data: ${JSON.stringify(e)}

`;
                      t.enqueue(new TextEncoder().encode(r));
                    }
                    s({
                      type: "connected",
                      content: {
                        chatId: r,
                        timestamp: new Date().toISOString(),
                      },
                    });
                    try {
                      let o = (0, u.AG)()
                          .channel(`stream_data:${r}`)
                          .on(
                            "postgres_changes",
                            {
                              event: "INSERT",
                              schema: "public",
                              table: "chat_stream_data",
                              filter: `chat_id=eq.${r}`,
                            },
                            (e) => {
                              let r = e.new;
                              s({
                                type: r.type,
                                content: r.content,
                                timestamp: r.created_at,
                              }),
                                "finish" === r.type && t.close();
                            },
                          )
                          .subscribe(),
                        n = setInterval(() => {
                          s({
                            type: "heartbeat",
                            content: { timestamp: new Date().toISOString() },
                          });
                        }, 3e4);
                      e.signal.addEventListener("abort", () => {
                        o.unsubscribe(), clearInterval(n), t.close();
                      });
                    } catch (e) {
                      console.error("Error setting up data stream:", e),
                        s({
                          type: "error",
                          content: {
                            error: "Failed to set up data stream",
                            details:
                              e instanceof Error ? e.message : "Unknown error",
                          },
                        }),
                        t.close();
                    }
                  },
                }),
                {
                  headers: {
                    "Content-Type": "text/event-stream",
                    "Cache-Control": "no-cache, no-transform",
                    Connection: "keep-alive",
                  },
                },
              )
            : c.NextResponse.json(
                { error: "Missing ID parameter" },
                { status: 400 },
              );
        }
        let h = { ...a },
          f =
            "workUnitAsyncStorage" in h
              ? h.workUnitAsyncStorage
              : "requestAsyncStorage" in h
                ? h.requestAsyncStorage
                : void 0;
        function y(e, t) {
          return "phase-production-build" === process.env.NEXT_PHASE ||
            "function" != typeof e
            ? e
            : new Proxy(e, {
                apply: (e, r, s) => {
                  let o;
                  try {
                    let e = f?.getStore();
                    o = e?.headers;
                  } catch (e) {}
                  return d
                    .wrapRouteHandlerWithSentry(e, {
                      method: t,
                      parameterizedRoute: "/api/data-stream",
                      headers: o,
                    })
                    .apply(r, s);
                },
              });
        }
        let m = y(p, "GET"),
          g = y(void 0, "POST"),
          b = y(void 0, "PUT"),
          x = y(void 0, "PATCH"),
          _ = y(void 0, "DELETE"),
          E = y(void 0, "HEAD"),
          v = y(void 0, "OPTIONS"),
          q = new o.AppRouteRouteModule({
            definition: {
              kind: n.RouteKind.APP_ROUTE,
              page: "/api/data-stream/route",
              pathname: "/api/data-stream",
              filename: "route",
              bundlePath: "app/api/data-stream/route",
            },
            resolvedPagePath:
              "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\api\\data-stream\\route.ts",
            nextConfigOutput: "",
            userland: s,
          }),
          { workAsyncStorage: w, workUnitAsyncStorage: S, serverHooks: O } = q;
        function R() {
          return (0, i.patchFetch)({
            workAsyncStorage: w,
            workUnitAsyncStorage: S,
          });
        }
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
      90020: (e, t, r) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          !(function (e, t) {
            for (var r in t)
              Object.defineProperty(e, r, { enumerable: !0, get: t[r] });
          })(t, {
            isRequestAPICallableInsideAfter: function () {
              return c;
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
        function t(e) {
          var t = Error("Cannot find module '" + e + "'");
          throw ((t.code = "MODULE_NOT_FOUND"), t);
        }
        (t.keys = () => []), (t.resolve = t), (t.id = 96708), (e.exports = t);
      },
      97108: (e) => {
        function t(e) {
          var t = Error("Cannot find module '" + e + "'");
          throw ((t.code = "MODULE_NOT_FOUND"), t);
        }
        (t.keys = () => []), (t.resolve = t), (t.id = 97108), (e.exports = t);
      },
    });
  var t = require("../../../webpack-runtime.js");
  t.C(e);
  var r = (e) => t((t.s = e)),
    s = t.X(0, [827, 7719, 8119, 5400, 131], () => r(53478));
  module.exports = s;
})();
//# sourceMappingURL=route.js.map
