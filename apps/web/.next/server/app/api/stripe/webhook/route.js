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
    (e._sentryDebugIds[r] = "3031e2ee-6ba8-408a-b985-6d7e056fcd23"),
    (e._sentryDebugIdIdentifier =
      "sentry-dbid-3031e2ee-6ba8-408a-b985-6d7e056fcd23"));
} catch (e) {}
(() => {
  var e = {};
  (e.id = 3287),
    (e.ids = [3287]),
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
        t.d(r, { v: () => o });
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
                o = this.createLogEntry("error", e, s);
              this.addToBuffer(o), console.error(this.formatMessage(o));
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
        let o = s.getInstance();
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
      92471: (e, r, t) => {
        "use strict";
        t.r(r),
          t.d(r, {
            patchFetch: () => P,
            routeModule: () => T,
            serverHooks: () => R,
            workAsyncStorage: () => k,
            workUnitAsyncStorage: () => O,
          });
        var s = {};
        t.r(s),
          t.d(s, {
            DELETE: () => q,
            GET: () => b,
            HEAD: () => y,
            OPTIONS: () => S,
            PATCH: () => m,
            POST: () => w,
            PUT: () => _,
          });
        var o = t(94168),
          i = t(51293),
          n = t(64588),
          u = t(63033),
          a = t(77719),
          c = t(15058),
          p = t(68593),
          d = t(59714),
          l = t(33850),
          f = t(60442);
        let h = (0, a.createClient)(
          "http://localhost:54321",
          process.env.SUPABASE_SERVICE_ROLE_KEY,
        );
        async function E(e) {
          if (
            (l.v.info("Initializing Stripe within webhook POST handler..."),
            l.v.info(
              `STRIPE_SECRET_KEY availability: ${!!process.env.STRIPE_SECRET_KEY}`,
            ),
            !process.env.STRIPE_SECRET_KEY ||
              !process.env.STRIPE_WEBHOOK_SECRET)
          )
            return (
              l.v.error(
                "Stripe environment variables (STRIPE_SECRET_KEY or STRIPE_WEBHOOK_SECRET) are missing!",
              ),
              p.NextResponse.json(
                { error: "Stripe configuration error" },
                { status: 500 },
              )
            );
          let r = new d.A(process.env.STRIPE_SECRET_KEY, {
              apiVersion: "2024-11-20.acacia",
            }),
            t = process.env.STRIPE_WEBHOOK_SECRET;
          l.v.info(
            "Stripe initialized successfully within webhook POST handler.",
          );
          try {
            let s = await e.text(),
              o = (await (0, c.b3)()).get("stripe-signature");
            if (!o)
              return p.NextResponse.json(
                { error: "No signature found" },
                { status: 400 },
              );
            let i = r.webhooks.constructEvent(s, o, t);
            switch (i.type) {
              case "checkout.session.completed": {
                let e = i.data.object,
                  r = e.metadata?.userId;
                if (r) {
                  let { error: t } = await h.auth.admin.updateUserById(r, {
                    user_metadata: {
                      subscription_status: "active",
                      stripe_customer_id: e.customer,
                      subscription_plan: e.metadata?.plan,
                    },
                  });
                  if (t) throw t;
                }
                break;
              }
              case "customer.subscription.deleted": {
                let e = i.data.object.customer,
                  {
                    data: { users: r },
                    error: t,
                  } = await h.auth.admin.listUsers(),
                  s = r.find((r) => r.user_metadata?.stripe_customer_id === e);
                if (s && !t) {
                  let { error: e } = await h.auth.admin.updateUserById(s.id, {
                    user_metadata: {
                      subscription_status: "inactive",
                      subscription_plan: null,
                    },
                  });
                  if (e) throw e;
                }
              }
            }
            return p.NextResponse.json({ received: !0 });
          } catch (e) {
            return (
              l.v.error("Error handling Stripe webhook:", {
                error: e instanceof Error ? e.message : "Unknown error",
              }),
              p.NextResponse.json(
                { error: "Error handling webhook" },
                { status: 400 },
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
        function v(e, r) {
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
                  return f
                    .wrapRouteHandlerWithSentry(e, {
                      method: r,
                      parameterizedRoute: "/api/stripe/webhook",
                      headers: o,
                    })
                    .apply(t, s);
                },
              });
        }
        let b = v(void 0, "GET"),
          w = v(E, "POST"),
          _ = v(void 0, "PUT"),
          m = v(void 0, "PATCH"),
          q = v(void 0, "DELETE"),
          y = v(void 0, "HEAD"),
          S = v(void 0, "OPTIONS"),
          T = new o.AppRouteRouteModule({
            definition: {
              kind: i.RouteKind.APP_ROUTE,
              page: "/api/stripe/webhook/route",
              pathname: "/api/stripe/webhook",
              filename: "route",
              bundlePath: "app/api/stripe/webhook/route",
            },
            resolvedPagePath:
              "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\api\\stripe\\webhook\\route.ts",
            nextConfigOutput: "",
            userland: s,
          }),
          { workAsyncStorage: k, workUnitAsyncStorage: O, serverHooks: R } = T;
        function P() {
          return (0, n.patchFetch)({
            workAsyncStorage: k,
            workUnitAsyncStorage: O,
          });
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
    s = r.X(0, [827, 7719, 5058, 5400, 5431, 3848], () => t(92471));
  module.exports = s;
})();
//# sourceMappingURL=route.js.map
