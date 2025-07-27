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
    (e._sentryDebugIds[t] = "ceb64fb9-5f06-481c-aee2-9f405f38b1bf"),
    (e._sentryDebugIdIdentifier =
      "sentry-dbid-ceb64fb9-5f06-481c-aee2-9f405f38b1bf"));
} catch (e) {}
(() => {
  var e = {};
  (e.id = 8873),
    (e.ids = [8873]),
    (e.modules = {
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
      56998: (e, t, r) => {
        "use strict";
        r.r(t),
          r.d(t, {
            patchFetch: () => O,
            routeModule: () => _,
            serverHooks: () => T,
            workAsyncStorage: () => k,
            workUnitAsyncStorage: () => A,
          });
        var s = {};
        r.r(s),
          r.d(s, {
            DELETE: () => N,
            GET: () => m,
            HEAD: () => b,
            OPTIONS: () => E,
            PATCH: () => v,
            POST: () => w,
            PUT: () => y,
          });
        var o = r(94168),
          i = r(51293),
          u = r(64588),
          n = r(63033),
          a = r(68593),
          c = r(61190),
          d = r(13772),
          l = r(60442);
        async function p(e) {
          try {
            let t = e.headers.get("user-agent") || "",
              r = e.headers.get("x-forwarded-for") || "",
              s = e.headers.get("x-real-ip") || "",
              o = r.split(",")[0] || s || "unknown";
            if (!c.fl.guestSessionEnabled)
              return a.NextResponse.json(
                { error: "Guest authentication is disabled" },
                { status: 403 },
              );
            let i = await e.json(),
              u = (function (e) {
                let {
                  action: t,
                  email: r,
                  password: s,
                  fullName: o,
                  guestUserId: i,
                } = e;
                if (!t || !["create", "convert", "clear"].includes(t))
                  throw Error(
                    "Invalid action. Must be 'create', 'convert', or 'clear'",
                  );
                if ("convert" === t) {
                  if (!r || !s || !i)
                    throw Error(
                      "Email, password, and guestUserId required for conversion",
                    );
                  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(r))
                    throw Error("Invalid email format");
                  if (s.length < 6)
                    throw Error("Password must be at least 6 characters");
                }
                return {
                  action: t,
                  email: r,
                  password: s,
                  fullName: o,
                  guestUserId: i,
                };
              })(i);
            switch (u.action) {
              case "create": {
                let e = await (0, d.Vq)({ userAgent: t, ipAddress: o }),
                  r = a.NextResponse.json({
                    success: !0,
                    user: {
                      id: e.id,
                      email: e.email,
                      fullName: e.fullName,
                      isGuest: !0,
                      sessionId: e.guestSessionId,
                    },
                  });
                return (
                  (0, d.ws)(e, {
                    set: (e, t, s) => {
                      r.cookies.set(e, t, s);
                    },
                  }),
                  r
                );
              }
              case "convert": {
                if (!u.email || !u.password || !u.guestUserId)
                  return a.NextResponse.json(
                    { error: "Missing required fields for conversion" },
                    { status: 400 },
                  );
                let e = await (0, d.Pu)(
                    u.guestUserId,
                    u.email,
                    u.password,
                    u.fullName,
                  ),
                  t = a.NextResponse.json({
                    success: !0,
                    user: {
                      id: e.id,
                      email: e.email,
                      fullName: e.fullName,
                      isGuest: !1,
                    },
                    message: "Successfully converted to regular account",
                  });
                return (
                  (0, d.p_)({
                    set: (e, r, s) => {
                      t.cookies.set(e, r, s);
                    },
                  }),
                  t
                );
              }
              case "clear": {
                let e = a.NextResponse.json({
                  success: !0,
                  message: "Guest session cleared",
                });
                return (
                  (0, d.p_)({
                    set: (t, r, s) => {
                      e.cookies.set(t, r, s);
                    },
                  }),
                  e
                );
              }
              default:
                return a.NextResponse.json(
                  { error: "Invalid action" },
                  { status: 400 },
                );
            }
          } catch (e) {
            return (
              console.error("Guest auth error:", e),
              a.NextResponse.json(
                {
                  error:
                    e instanceof Error
                      ? e.message
                      : "Guest authentication failed",
                },
                { status: 500 },
              )
            );
          }
        }
        async function f(e) {
          try {
            if (!c.fl.guestSessionEnabled)
              return a.NextResponse.json(
                { isGuest: !1, isAuthenticated: !1 },
                { status: 200 },
              );
            let t = { get: (t) => e.cookies.get(t) },
              r = t.get("is_guest_user")?.value === "true",
              s = t.get("guest_data")?.value;
            if (r && s)
              try {
                let e = JSON.parse(s);
                return a.NextResponse.json({
                  isGuest: !0,
                  isAuthenticated: !0,
                  user: {
                    id: e.id,
                    email: e.email,
                    fullName: e.fullName,
                    sessionId: e.sessionId,
                  },
                });
              } catch (e) {
                console.error("Failed to parse guest data:", e);
              }
            let o = (0, c.db)(t),
              {
                data: { user: i },
                error: u,
              } = await o.auth.getUser();
            if (!u && i)
              return a.NextResponse.json({
                isGuest: !1,
                isAuthenticated: !0,
                user: {
                  id: i.id,
                  email: i.email,
                  fullName: i.user_metadata?.full_name || "User",
                },
              });
            return a.NextResponse.json({ isGuest: !1, isAuthenticated: !1 });
          } catch (e) {
            return (
              console.error("Guest auth status check error:", e),
              a.NextResponse.json(
                {
                  error: "Failed to check authentication status",
                  isGuest: !1,
                  isAuthenticated: !1,
                },
                { status: 500 },
              )
            );
          }
        }
        async function x() {
          return new a.NextResponse(null, {
            status: 200,
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
              "Access-Control-Allow-Headers": "Content-Type, Authorization",
            },
          });
        }
        let h = { ...n },
          g =
            "workUnitAsyncStorage" in h
              ? h.workUnitAsyncStorage
              : "requestAsyncStorage" in h
                ? h.requestAsyncStorage
                : void 0;
        function q(e, t) {
          return "phase-production-build" === process.env.NEXT_PHASE ||
            "function" != typeof e
            ? e
            : new Proxy(e, {
                apply: (e, r, s) => {
                  let o;
                  try {
                    let e = g?.getStore();
                    o = e?.headers;
                  } catch (e) {}
                  return l
                    .wrapRouteHandlerWithSentry(e, {
                      method: t,
                      parameterizedRoute: "/api/auth/guest",
                      headers: o,
                    })
                    .apply(r, s);
                },
              });
        }
        let m = q(f, "GET"),
          w = q(p, "POST"),
          y = q(void 0, "PUT"),
          v = q(void 0, "PATCH"),
          N = q(void 0, "DELETE"),
          b = q(void 0, "HEAD"),
          E = q(x, "OPTIONS"),
          _ = new o.AppRouteRouteModule({
            definition: {
              kind: i.RouteKind.APP_ROUTE,
              page: "/api/auth/guest/route",
              pathname: "/api/auth/guest",
              filename: "route",
              bundlePath: "app/api/auth/guest/route",
            },
            resolvedPagePath:
              "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\api\\auth\\guest\\route.ts",
            nextConfigOutput: "",
            userland: s,
          }),
          { workAsyncStorage: k, workUnitAsyncStorage: A, serverHooks: T } = _;
        function O() {
          return (0, u.patchFetch)({
            workAsyncStorage: k,
            workUnitAsyncStorage: A,
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
  var t = require("../../../../webpack-runtime.js");
  t.C(e);
  var r = (e) => t((t.s = e)),
    s = t.X(0, [827, 7719, 8119, 5058, 5400, 8342, 978, 7490, 9959, 1190], () =>
      r(56998),
    );
  module.exports = s;
})();
//# sourceMappingURL=route.js.map
