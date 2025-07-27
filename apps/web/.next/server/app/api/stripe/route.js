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
    (e._sentryDebugIds[r] = "1e3d4f0e-588c-4be9-8275-64ac01f17495"),
    (e._sentryDebugIdIdentifier =
      "sentry-dbid-1e3d4f0e-588c-4be9-8275-64ac01f17495"));
} catch (e) {}
(() => {
  var e = {};
  (e.id = 6653),
    (e.ids = [6653]),
    (e.modules = {
      477: (e, r, t) => {
        "use strict";
        t.r(r),
          t.d(r, {
            patchFetch: () => O,
            routeModule: () => S,
            serverHooks: () => L,
            workAsyncStorage: () => b,
            workUnitAsyncStorage: () => I,
          });
        var s = {};
        t.r(s),
          t.d(s, {
            DELETE: () => _,
            GET: () => y,
            HEAD: () => T,
            OPTIONS: () => w,
            PATCH: () => q,
            POST: () => v,
            PUT: () => m,
          });
        var i = t(94168),
          o = t(51293),
          n = t(64588),
          u = t(63033),
          a = t(68119),
          c = t(15058),
          p = t(68593),
          d = t(59714),
          l = t(33850),
          f = t(60442);
        async function h(e) {
          if (
            (l.v.info("Initializing Stripe within POST handler..."),
            l.v.info(
              `STRIPE_SECRET_KEY availability: ${!!process.env.STRIPE_SECRET_KEY}`,
            ),
            !process.env.STRIPE_SECRET_KEY)
          )
            return (
              l.v.error("STRIPE_SECRET_KEY is missing!"),
              p.NextResponse.json(
                { error: "Stripe configuration error" },
                { status: 500 },
              )
            );
          let r = new d.A(process.env.STRIPE_SECRET_KEY, {
            apiVersion: "2024-11-20.acacia",
          });
          l.v.info("Stripe initialized successfully within POST handler.");
          try {
            let { priceId: t, userId: s } = await e.json(),
              i = (0, c.UL)(),
              o = (0, a.createServerClient)(
                "http://localhost:54321",
                "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0",
                {
                  cookies: {
                    getAll: () => i.getAll(),
                    setAll(e) {
                      e.forEach(({ name: e, value: r, options: t }) => {
                        i.set(e, r, t);
                      });
                    },
                  },
                },
              ),
              {
                data: { user: n },
                error: u,
              } = await o.auth.getUser(s);
            if (u || !n?.email) throw u || Error("User email not found");
            let d = await r.checkout.sessions.create({
              payment_method_types: ["card"],
              line_items: [{ price: t, quantity: 1 }],
              mode: "subscription",
              success_url: `${process.env.NEXT_PUBLIC_APP_URL}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
              cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/payment/cancel`,
              customer_email: n.email,
              metadata: { userId: s },
            });
            return p.NextResponse.json({ sessionId: d.id });
          } catch (e) {
            return (
              l.v.error("Error creating Stripe session:", {
                error: e instanceof Error ? e.message : "Unknown error",
              }),
              p.NextResponse.json(
                { error: "Error creating checkout session" },
                { status: 500 },
              )
            );
          }
        }
        let x = { ...u },
          g =
            "workUnitAsyncStorage" in x
              ? x.workUnitAsyncStorage
              : "requestAsyncStorage" in x
                ? x.requestAsyncStorage
                : void 0;
        function E(e, r) {
          return "phase-production-build" === process.env.NEXT_PHASE ||
            "function" != typeof e
            ? e
            : new Proxy(e, {
                apply: (e, t, s) => {
                  let i;
                  try {
                    let e = g?.getStore();
                    i = e?.headers;
                  } catch (e) {}
                  return f
                    .wrapRouteHandlerWithSentry(e, {
                      method: r,
                      parameterizedRoute: "/api/stripe",
                      headers: i,
                    })
                    .apply(t, s);
                },
              });
        }
        let y = E(void 0, "GET"),
          v = E(h, "POST"),
          m = E(void 0, "PUT"),
          q = E(void 0, "PATCH"),
          _ = E(void 0, "DELETE"),
          T = E(void 0, "HEAD"),
          w = E(void 0, "OPTIONS"),
          S = new i.AppRouteRouteModule({
            definition: {
              kind: o.RouteKind.APP_ROUTE,
              page: "/api/stripe/route",
              pathname: "/api/stripe",
              filename: "route",
              bundlePath: "app/api/stripe/route",
            },
            resolvedPagePath:
              "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\api\\stripe\\route.ts",
            nextConfigOutput: "",
            userland: s,
          }),
          { workAsyncStorage: b, workUnitAsyncStorage: I, serverHooks: L } = S;
        function O() {
          return (0, n.patchFetch)({
            workAsyncStorage: b,
            workUnitAsyncStorage: I,
          });
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
      33850: (e, r, t) => {
        "use strict";
        t.d(r, { v: () => i });
        class s {
          constructor() {
            (this.logLevel = "info"),
              (this.buffer = []),
              (this.maxBufferSize = 1e3);
            let e = process.env.LOG_LEVEL;
            e &&
              ["debug", "info", "warn", "error"].includes(e) &&
              (this.logLevel = e);
          }
          static getInstance() {
            return s.instance || (s.instance = new s()), s.instance;
          }
          shouldLog(e) {
            let r = { debug: 0, info: 1, warn: 2, error: 3 };
            return r[e] >= r[this.logLevel];
          }
          formatMessage(e) {
            let r = e.context ? ` ${JSON.stringify(e.context)}` : "";
            return `[${e.timestamp}] ${e.level.toUpperCase()}: ${e.message}${r}`;
          }
          addToBuffer(e) {
            this.buffer.push(e),
              this.buffer.length > this.maxBufferSize && this.buffer.shift();
          }
          createLogEntry(e, r, t) {
            return {
              level: e,
              message: r,
              timestamp: new Date().toISOString(),
              context: t,
            };
          }
          debug(e, r) {
            if (this.shouldLog("debug")) {
              let t = this.createLogEntry("debug", e, r);
              this.addToBuffer(t);
            }
          }
          info(e, r) {
            if (this.shouldLog("info")) {
              let t = this.createLogEntry("info", e, r);
              this.addToBuffer(t);
            }
          }
          warn(e, r) {
            if (this.shouldLog("warn")) {
              let t = this.createLogEntry("warn", e, r);
              this.addToBuffer(t), console.warn(this.formatMessage(t));
            }
          }
          error(e, r, t) {
            if (this.shouldLog("error")) {
              let s = r
                  ? {
                      ...t,
                      error: {
                        name: r.name,
                        message: r.message,
                        stack: r.stack,
                      },
                    }
                  : t,
                i = this.createLogEntry("error", e, s);
              this.addToBuffer(i), console.error(this.formatMessage(i));
            }
          }
          getBuffer() {
            return [...this.buffer];
          }
          clearBuffer() {
            this.buffer = [];
          }
          setLogLevel(e) {
            this.logLevel = e;
          }
        }
        let i = s.getInstance();
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
    s = r.X(0, [827, 7719, 8119, 5058, 5400, 5431, 3848], () => t(477));
  module.exports = s;
})();
//# sourceMappingURL=route.js.map
