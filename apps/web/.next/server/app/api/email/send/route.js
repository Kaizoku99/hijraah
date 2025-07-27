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
    (e._sentryDebugIds[r] = "8d19d271-324d-49b1-9351-e1178f8fe8d0"),
    (e._sentryDebugIdIdentifier =
      "sentry-dbid-8d19d271-324d-49b1-9351-e1178f8fe8d0"));
} catch (e) {}
(() => {
  var e = {};
  (e.id = 9091),
    (e.ids = [9091]),
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
      31638: (e, r, t) => {
        "use strict";
        t.r(r),
          t.d(r, {
            patchFetch: () => S,
            routeModule: () => R,
            serverHooks: () => T,
            workAsyncStorage: () => O,
            workUnitAsyncStorage: () => P,
          });
        var s = {};
        t.r(s),
          t.d(s, {
            DELETE: () => b,
            GET: () => g,
            HEAD: () => v,
            OPTIONS: () => _,
            PATCH: () => w,
            POST: () => E,
            PUT: () => q,
          });
        var o = t(94168),
          i = t(51293),
          n = t(64588),
          a = t(63033),
          u = t(68593),
          c = t(77719);
        async function d(e, r, t = {}) {
          let s = "http://localhost:54321",
            o = process.env.SUPABASE_SERVICE_ROLE_KEY;
          if (!s || !o)
            throw Error("Supabase URL or service role key is not defined");
          let i = (0, c.createClient)(s, o, {
              auth: { autoRefreshToken: !1, persistSession: !1 },
            }),
            n = r.locale || "en";
          try {
            switch (e) {
              case "recovery":
                let { email: s, redirectTo: o } = r;
                return await i.auth.resetPasswordForEmail(s, {
                  redirectTo: o,
                  captchaToken: t.captchaToken,
                });
              case "signup":
                throw Error(
                  "Signup email sending should be handled during user creation",
                );
              case "magiclink":
                return await i.auth.signInWithOtp({
                  email: r.email,
                  options: {
                    emailRedirectTo: r.redirectTo,
                    captchaToken: t.captchaToken,
                    data: { preferred_locale: n },
                  },
                });
              case "email_change":
                throw Error(
                  "Email change should be handled through user update",
                );
              case "invite":
                throw Error(
                  "User invitations should be handled through custom API",
                );
              default:
                throw Error(`Unsupported email type: ${e}`);
            }
          } catch (r) {
            throw (console.error(`Failed to send ${e} email:`, r), r);
          }
        }
        async function p(e, r) {
          return d("recovery", e, { captchaToken: r });
        }
        async function l(e, r) {
          return d("magiclink", e, { captchaToken: r });
        }
        var h = t(60442);
        async function f(e) {
          try {
            let {
              type: r,
              email: t,
              redirectTo: s,
              locale: o,
              captchaToken: i,
            } = await e.json();
            if (!r || !t)
              return u.NextResponse.json(
                { error: "Missing required parameters: type or email" },
                { status: 400 },
              );
            let n = ["en", "es", "fr", "ar"].includes(o) ? o : "en";
            switch (r) {
              case "passwordReset": {
                let e = await p({ email: t, redirectTo: s, locale: n }, i);
                return u.NextResponse.json({ success: !0, result: e });
              }
              case "magicLink": {
                let e = await l({ email: t, redirectTo: s, locale: n }, i);
                return u.NextResponse.json({ success: !0, result: e });
              }
              default:
                return u.NextResponse.json(
                  { error: `Unsupported email type: ${r}` },
                  { status: 400 },
                );
            }
          } catch (e) {
            return (
              console.error("Error sending email:", e),
              u.NextResponse.json(
                { error: "Failed to send email" },
                { status: 500 },
              )
            );
          }
        }
        let x = { ...a },
          y =
            "workUnitAsyncStorage" in x
              ? x.workUnitAsyncStorage
              : "requestAsyncStorage" in x
                ? x.requestAsyncStorage
                : void 0;
        function m(e, r) {
          return "phase-production-build" === process.env.NEXT_PHASE ||
            "function" != typeof e
            ? e
            : new Proxy(e, {
                apply: (e, t, s) => {
                  let o;
                  try {
                    let e = y?.getStore();
                    o = e?.headers;
                  } catch (e) {}
                  return h
                    .wrapRouteHandlerWithSentry(e, {
                      method: r,
                      parameterizedRoute: "/api/email/send",
                      headers: o,
                    })
                    .apply(t, s);
                },
              });
        }
        let g = m(void 0, "GET"),
          E = m(f, "POST"),
          q = m(void 0, "PUT"),
          w = m(void 0, "PATCH"),
          b = m(void 0, "DELETE"),
          v = m(void 0, "HEAD"),
          _ = m(void 0, "OPTIONS"),
          R = new o.AppRouteRouteModule({
            definition: {
              kind: i.RouteKind.APP_ROUTE,
              page: "/api/email/send/route",
              pathname: "/api/email/send",
              filename: "route",
              bundlePath: "app/api/email/send/route",
            },
            resolvedPagePath:
              "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\api\\email\\send\\route.ts",
            nextConfigOutput: "",
            userland: s,
          }),
          { workAsyncStorage: O, workUnitAsyncStorage: P, serverHooks: T } = R;
        function S() {
          return (0, n.patchFetch)({
            workAsyncStorage: O,
            workUnitAsyncStorage: P,
          });
        }
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
              return u;
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
  var r = require("../../../../webpack-runtime.js");
  r.C(e);
  var t = (e) => r((r.s = e)),
    s = r.X(0, [827, 7719, 5400], () => t(31638));
  module.exports = s;
})();
//# sourceMappingURL=route.js.map
