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
    (e._sentryDebugIds[r] = "54909304-118c-4b41-8936-f5af0423ebe7"),
    (e._sentryDebugIdIdentifier =
      "sentry-dbid-54909304-118c-4b41-8936-f5af0423ebe7"));
} catch (e) {}
(() => {
  var e = {};
  (e.id = 2072),
    (e.ids = [2072]),
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
      38090: (e, r, t) => {
        "use strict";
        t.r(r),
          t.d(r, {
            patchFetch: () => R,
            routeModule: () => w,
            serverHooks: () => O,
            workAsyncStorage: () => E,
            workUnitAsyncStorage: () => v,
          });
        var s = {};
        t.r(s),
          t.d(s, {
            DELETE: () => m,
            GET: () => x,
            HEAD: () => _,
            OPTIONS: () => q,
            PATCH: () => b,
            POST: () => g,
            PUT: () => y,
          });
        var i = t(94168),
          o = t(51293),
          n = t(64588),
          u = t(63033),
          a = t(77719),
          c = t(68593),
          d = t(60442);
        async function p(e) {
          let r = e.headers.get("Authorization"),
            t = (0, a.createClient)(
              "http://localhost:54321",
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0",
            );
          if (r && r.startsWith("Bearer ")) {
            let e = r.split(" ")[1];
            await t.auth.setSession({ access_token: e, refresh_token: "" });
          }
          let {
            data: { user: s },
            error: i,
          } = await t.auth.getUser();
          if (i || !s)
            return (
              i &&
                console.error(
                  "Error fetching user in /onboarding/confirm-user:",
                  i.message,
                ),
              c.NextResponse.json({ error: "Unauthorized" }, { status: 401 })
            );
          let o = s.id;
          if (!o)
            return c.NextResponse.json(
              { error: "Unable to identify user" },
              { status: 401 },
            );
          let { data: n, error: u } = await t
            .from("user_onboarding")
            .select("*")
            .eq("user_id", o)
            .single();
          if (u || !n) {
            let { error: e } = await t
              .from("user_onboarding")
              .insert({
                user_id: o,
                current_step: "welcome",
                progress: 0,
                is_completed: !1,
                is_active: !0,
              });
            return e
              ? (console.error(
                  "Error creating onboarding record for confirmed user:",
                  e,
                ),
                c.NextResponse.json({ error: e.message }, { status: 500 }))
              : c.NextResponse.json({ initialized: !0, isNew: !0 });
          }
          if (n.is_completed || !n.is_active) {
            let { error: e } = await t
              .from("user_onboarding")
              .update({
                current_step: "welcome",
                progress: 0,
                is_completed: !1,
                is_active: !0,
                updated_at: new Date().toISOString(),
              })
              .eq("user_id", o);
            return e
              ? (console.error("Error resetting onboarding:", e),
                c.NextResponse.json({ error: e.message }, { status: 500 }))
              : c.NextResponse.json({ initialized: !0, reset: !0 });
          }
          return c.NextResponse.json({ initialized: !0, isNew: !1, data: n });
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
                  let i;
                  try {
                    let e = f?.getStore();
                    i = e?.headers;
                  } catch (e) {}
                  return d
                    .wrapRouteHandlerWithSentry(e, {
                      method: r,
                      parameterizedRoute: "/api/onboarding/confirm-user",
                      headers: i,
                    })
                    .apply(t, s);
                },
              });
        }
        let x = h(void 0, "GET"),
          g = h(p, "POST"),
          y = h(void 0, "PUT"),
          b = h(void 0, "PATCH"),
          m = h(void 0, "DELETE"),
          _ = h(void 0, "HEAD"),
          q = h(void 0, "OPTIONS"),
          w = new i.AppRouteRouteModule({
            definition: {
              kind: o.RouteKind.APP_ROUTE,
              page: "/api/onboarding/confirm-user/route",
              pathname: "/api/onboarding/confirm-user",
              filename: "route",
              bundlePath: "app/api/onboarding/confirm-user/route",
            },
            resolvedPagePath:
              "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\api\\onboarding\\confirm-user\\route.ts",
            nextConfigOutput: "",
            userland: s,
          }),
          { workAsyncStorage: E, workUnitAsyncStorage: v, serverHooks: O } = w;
        function R() {
          return (0, n.patchFetch)({
            workAsyncStorage: E,
            workUnitAsyncStorage: v,
          });
        }
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
              return a;
            },
            throwForSearchParamsAccessInUseCache: function () {
              return u;
            },
            throwWithStaticGenerationBailoutError: function () {
              return o;
            },
            throwWithStaticGenerationBailoutErrorWithDynamicError: function () {
              return n;
            },
          });
        let s = t(57154),
          i = t(3295);
        function o(e, r) {
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
          let e = i.afterTaskAsyncStorage.getStore();
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
    s = r.X(0, [827, 7719, 5400], () => t(38090));
  module.exports = s;
})();
//# sourceMappingURL=route.js.map
