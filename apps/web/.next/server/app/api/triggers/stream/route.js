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
    (e._sentryDebugIds[t] = "61eeee59-af32-4b13-941f-3dab11205c61"),
    (e._sentryDebugIdIdentifier =
      "sentry-dbid-61eeee59-af32-4b13-941f-3dab11205c61"));
} catch (e) {}
(() => {
  var e = {};
  (e.id = 9636),
    (e.ids = [9636]),
    (e.modules = {
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
      53594: (e, t, r) => {
        "use strict";
        r.r(t),
          r.d(t, {
            patchFetch: () => T,
            routeModule: () => q,
            serverHooks: () => k,
            workAsyncStorage: () => S,
            workUnitAsyncStorage: () => E,
          });
        var s = {};
        r.r(s),
          r.d(s, {
            DELETE: () => v,
            GET: () => g,
            HEAD: () => f,
            OPTIONS: () => m,
            PATCH: () => w,
            POST: () => b,
            PUT: () => x,
          });
        var i = r(94168),
          o = r(51293),
          n = r(64588),
          a = r(63033),
          c = r(60442);
        class u {
          static getInstance() {
            return u.instance || (u.instance = new u()), u.instance;
          }
          async publishEvent(e) {
            this.eventHistory.unshift(e),
              this.eventHistory.length > this.maxHistorySize &&
                (this.eventHistory = this.eventHistory.slice(
                  0,
                  this.maxHistorySize,
                )),
              this.events.has(e.taskId) || this.events.set(e.taskId, []);
            let t = this.events.get(e.taskId);
            t.unshift(e),
              t.length > this.maxEventsPerTask &&
                t.splice(this.maxEventsPerTask);
            let r = this.subscribers.get("*") || new Set(),
              s = this.subscribers.get(e.taskId) || new Set(),
              i = new Set([...Array.from(r), ...Array.from(s)]),
              o = `data: ${JSON.stringify(e)}

`;
            for (let e of Array.from(i))
              try {
                await e.write(new TextEncoder().encode(o));
              } catch (t) {
                console.error("Failed to write to subscriber:", t),
                  r.delete(e),
                  s.delete(e);
              }
          }
          subscribe(e, t) {
            return (
              this.subscribers.has(e) || this.subscribers.set(e, new Set()),
              this.subscribers.get(e).add(t),
              ("*" === e
                ? this.eventHistory.slice(0, 10)
                : this.events.get(e)?.slice(0, 10) || []
              )
                .reverse()
                .forEach(async (e) => {
                  try {
                    await t.write(
                      new TextEncoder().encode(`data: ${JSON.stringify(e)}

`),
                    );
                  } catch (e) {
                    console.error("Failed to send history:", e);
                  }
                }),
              () => {
                this.subscribers.get(e)?.delete(t),
                  this.subscribers.get(e)?.size === 0 &&
                    this.subscribers.delete(e);
              }
            );
          }
          getSubscriberCount(e) {
            return e
              ? this.subscribers.get(e)?.size || 0
              : Array.from(this.subscribers.values()).reduce(
                  (e, t) => e + t.size,
                  0,
                );
          }
          constructor() {
            (this.events = new Map()),
              (this.subscribers = new Map()),
              (this.eventHistory = []),
              (this.maxHistorySize = 1e3),
              (this.maxEventsPerTask = 50);
          }
        }
        async function d(e) {
          let { searchParams: t } = new URL(e.url),
            r = t.get("taskId") || "*",
            s = t.get("chatId"),
            i = u.getInstance();
          return new Response(
            new ReadableStream({
              start(t) {
                let o = {
                  id: `connect-${Date.now()}`,
                  type: "connection.established",
                  taskId: "system",
                  timestamp: new Date().toISOString(),
                  data: {
                    subscriberCount: i.getSubscriberCount(),
                    chatId: s,
                    taskId: r,
                  },
                };
                t.enqueue(
                  new TextEncoder().encode(`data: ${JSON.stringify(o)}

`),
                );
                let n = i.subscribe(r, t),
                  a = setInterval(() => {
                    try {
                      t.enqueue(
                        new TextEncoder()
                          .encode(`data: {"type":"heartbeat","timestamp":"${new Date().toISOString()}"}

`),
                      );
                    } catch (e) {
                      console.error("Heartbeat failed:", e), clearInterval(a);
                    }
                  }, 3e4),
                  c = () => {
                    clearInterval(a), n();
                  };
                return e.signal.addEventListener("abort", c), c;
              },
            }),
            {
              headers: {
                "Content-Type": "text/event-stream",
                "Cache-Control": "no-cache",
                Connection: "keep-alive",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET",
                "Access-Control-Allow-Headers": "Cache-Control",
              },
            },
          );
        }
        async function p(e) {
          try {
            let t = u.getInstance(),
              r = await e.json(),
              s = {
                id: r.id || `event-${Date.now()}`,
                type: r.type,
                taskId: r.taskId,
                timestamp: r.timestamp || new Date().toISOString(),
                data: r.data || {},
              };
            return (
              await t.publishEvent(s),
              new Response(JSON.stringify({ success: !0 }), {
                headers: { "Content-Type": "application/json" },
              })
            );
          } catch (e) {
            return (
              console.error("Failed to process webhook:", e),
              new Response(
                JSON.stringify({
                  error: "Failed to process webhook",
                  details: e instanceof Error ? e.message : String(e),
                }),
                {
                  status: 500,
                  headers: { "Content-Type": "application/json" },
                },
              )
            );
          }
        }
        let l = { ...a },
          h =
            "workUnitAsyncStorage" in l
              ? l.workUnitAsyncStorage
              : "requestAsyncStorage" in l
                ? l.requestAsyncStorage
                : void 0;
        function y(e, t) {
          return "phase-production-build" === process.env.NEXT_PHASE ||
            "function" != typeof e
            ? e
            : new Proxy(e, {
                apply: (e, r, s) => {
                  let i;
                  try {
                    let e = h?.getStore();
                    i = e?.headers;
                  } catch (e) {}
                  return c
                    .wrapRouteHandlerWithSentry(e, {
                      method: t,
                      parameterizedRoute: "/api/triggers/stream",
                      headers: i,
                    })
                    .apply(r, s);
                },
              });
        }
        let g = y(d, "GET"),
          b = y(p, "POST"),
          x = y(void 0, "PUT"),
          w = y(void 0, "PATCH"),
          v = y(void 0, "DELETE"),
          f = y(void 0, "HEAD"),
          m = y(void 0, "OPTIONS"),
          q = new i.AppRouteRouteModule({
            definition: {
              kind: o.RouteKind.APP_ROUTE,
              page: "/api/triggers/stream/route",
              pathname: "/api/triggers/stream",
              filename: "route",
              bundlePath: "app/api/triggers/stream/route",
            },
            resolvedPagePath:
              "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\api\\triggers\\stream\\route.ts",
            nextConfigOutput: "",
            userland: s,
          }),
          { workAsyncStorage: S, workUnitAsyncStorage: E, serverHooks: k } = q;
        function T() {
          return (0, n.patchFetch)({
            workAsyncStorage: S,
            workUnitAsyncStorage: E,
          });
        }
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
      94168: (e, t, r) => {
        "use strict";
        e.exports = r(44870);
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
    });
  var t = require("../../../../webpack-runtime.js");
  t.C(e);
  var r = (e) => t((t.s = e)),
    s = t.X(0, [827], () => r(53594));
  module.exports = s;
})();
//# sourceMappingURL=route.js.map
