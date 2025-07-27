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
    (e._sentryDebugIds[r] = "159b9d1c-9bb8-4651-ab88-eb14aaa01110"),
    (e._sentryDebugIdIdentifier =
      "sentry-dbid-159b9d1c-9bb8-4651-ab88-eb14aaa01110"));
} catch (e) {}
(() => {
  var e = {};
  (e.id = 5057),
    (e.ids = [5057]),
    (e.modules = {
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
      39750: (e, r, t) => {
        "use strict";
        t.d(r, { MU: () => p, wc: () => h });
        var s = t(73346),
          i = t(56838);
        void 0 === globalThis.caches &&
          (globalThis.caches = {
            open: () =>
              Promise.resolve({
                match: () => Promise.resolve(null),
                put: () => Promise.resolve(),
                delete: () => Promise.resolve(!1),
              }),
            has: () => Promise.resolve(!1),
            delete: () => Promise.resolve(!1),
          });
        let a = process.env.UPSTASH_REDIS_REST_URL,
          n = process.env.UPSTASH_REDIS_REST_TOKEN,
          o = {
            HITS: "cache:stats:hits",
            MISSES: "cache:stats:misses",
            KEYS: "cache:stats:keys",
          },
          c = null,
          l = !1;
        function u() {
          return (
            l ||
              ((c = (function () {
                if (!a || !n)
                  return (
                    console.warn(
                      "[Redis Client] Missing Redis URL or Token in environment variables. Redis client will not be initialized.",
                    ),
                    null
                  );
                try {
                  return new s.Q({
                    url: a,
                    token: n,
                    retry: {
                      retries: 3,
                      backoff: (e) => Math.min(50 * e, 1e3),
                    },
                  });
                } catch (e) {
                  return (
                    console.error(
                      "[Redis Client] Error during Redis client instantiation:",
                      e,
                    ),
                    null
                  );
                }
              })()) ||
                console.warn(
                  "Upstash Redis client could not be initialized. Features requiring Redis may not work.",
                ),
              (l = !0)),
            c
          );
        }
        let d = u(),
          h = {
            async get(e) {
              if (!d)
                return (
                  console.warn(
                    "[translationCache.get] Redis client not available.",
                  ),
                  null
                );
              try {
                let r = await d.get(`i18n:${e}`);
                return r ? JSON.parse(r) : null;
              } catch (e) {
                return console.error("Translation cache get error:", e), null;
              }
            },
            async set(e, r, t = 3600) {
              if (!d)
                return void console.warn(
                  "[translationCache.set] Redis client not available.",
                );
              try {
                await d.setex(`i18n:${e}`, t, JSON.stringify(r));
              } catch (e) {
                console.error("Translation cache set error:", e);
              }
            },
            async invalidate(e) {
              if (!d)
                return void console.warn(
                  "[translationCache.invalidate] Redis client not available.",
                );
              try {
                await d.del(`i18n:${e}`);
              } catch (e) {
                console.error("Translation cache invalidate error:", e);
              }
            },
            async invalidateAll() {
              if (!d)
                return void console.warn(
                  "[translationCache.invalidateAll] Redis client not available.",
                );
              try {
                let e = await d.keys("i18n:*");
                e.length > 0 && (await d.del(...e));
              } catch (e) {
                console.error("Translation cache invalidate all error:", e);
              }
            },
          };
        function p(e = {}) {
          return async (r, t) => {
            if (!d)
              return (
                console.warn(
                  "[redisApiCacheMiddleware] Redis client not available. Skipping cache.",
                ),
                t()
              );
            if ("GET" !== r.req.method) return t();
            r.req.header("Cache-Control");
            let s = (
              e.key ||
              function (e) {
                let r = new URL(e.req.url),
                  t = e.get("user"),
                  s = t?.id || "anonymous",
                  i = r.pathname + r.search;
                return `cache:${s}:${i}`;
              }
            )(r);
            try {
              let t = await d.get(s);
              if (t) {
                await d.incr(o.HITS),
                  r.header("X-Cache", "HIT"),
                  r.header("X-Cache-Key", s);
                let i = e.ttl ? e.ttl.toString() : "300";
                return (
                  r.header("Cache-Control", `public, max-age=${i}`),
                  r.json(JSON.parse(t))
                );
              }
              await d.incr(o.MISSES);
            } catch (e) {
              console.error("Redis cache read error:", e);
            }
            if (
              (r.header("X-Cache", "MISS"),
              r.header("X-Cache-Key", s),
              await t(),
              r.res && r.res.status >= 200 && r.res.status < 300)
            )
              try {
                let t = await r.res.clone().json(),
                  i = e.ttl || 300;
                await d.set(s, JSON.stringify(t), { ex: i }),
                  await d.sadd(o.KEYS, s),
                  r.header("Cache-Control", `public, max-age=${i}`);
              } catch (e) {
                console.error("Redis cache write error:", e);
              }
          };
        }
        class y {
          constructor(e = {}) {
            (this.redisClientInternal = null),
              (this.redisClientInternal = u()),
              this.redisClientInternal ||
                console.warn(
                  "[CacheManager] Redis client is not available. CacheManager will operate in LRU-only mode.",
                ),
              (this.redisKeyPrefix = e.redisKeyPrefix || "cacheManager:"),
              (this.lruCache = new i.q({
                max: e.maxSize || 500,
                ttl: e.ttl || 36e5,
              }));
          }
          getPrefixedKey(e) {
            return `${this.redisKeyPrefix}${e}`;
          }
          async get(e) {
            if (this.redisClientInternal) {
              let r = this.getPrefixedKey(e);
              try {
                let e = await this.redisClientInternal.get(r);
                if (null != e) return e;
              } catch (e) {
                console.error(`CacheManager: Redis get error for key ${r}:`, e);
              }
            }
            return this.lruCache.get(e) || null;
          }
          async set(e, r, t) {
            if (this.redisClientInternal) {
              let s = this.getPrefixedKey(e);
              try {
                await this.redisClientInternal.set(s, r, { ex: t || 3600 });
              } catch (e) {
                console.error(`CacheManager: Redis set error for key ${s}:`, e);
              }
            }
            this.lruCache.set(e, r, { ttl: t ? 1e3 * t : void 0 });
          }
          async delete(e) {
            if (this.redisClientInternal) {
              let r = this.getPrefixedKey(e);
              try {
                await this.redisClientInternal.del(r);
              } catch (e) {
                console.error(
                  `CacheManager: Redis delete error for key ${r}:`,
                  e,
                );
              }
            }
            this.lruCache.delete(e);
          }
          async clear() {
            if (this.redisClientInternal) {
              let e = 0;
              try {
                do {
                  let r = await this.redisClientInternal.scan(e, {
                      match: `${this.redisKeyPrefix}*`,
                      count: 100,
                    }),
                    t = Number(r[0]),
                    s = r[1];
                  s.length > 0 && (await this.redisClientInternal.del(...s)),
                    (e = t);
                } while (0 !== e);
              } catch (e) {
                console.error(
                  `CacheManager: Error clearing Redis keys with prefix "${this.redisKeyPrefix}":`,
                  e,
                );
              }
            }
            this.lruCache.clear();
          }
        }
        new y();
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
      77598: (e) => {
        "use strict";
        e.exports = require("node:crypto");
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
      94168: (e, r, t) => {
        "use strict";
        e.exports = t(44870);
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
      98785: (e, r, t) => {
        "use strict";
        t.r(r),
          t.d(r, {
            patchFetch: () => T,
            routeModule: () => m,
            serverHooks: () => b,
            workAsyncStorage: () => R,
            workUnitAsyncStorage: () => S,
          });
        var s = {};
        t.r(s),
          t.d(s, {
            DELETE: () => v,
            GET: () => g,
            HEAD: () => C,
            OPTIONS: () => q,
            PATCH: () => f,
            POST: () => w,
            PUT: () => x,
          });
        var i = t(94168),
          a = t(51293),
          n = t(64588),
          o = t(63033),
          c = t(39750),
          l = t(60442);
        async function u(e) {
          try {
            let { searchParams: r } = new URL(e.url),
              t = r.get("locale");
            if (t)
              return (
                await c.wc.invalidate(t),
                Response.json({
                  success: !0,
                  message: `Cache invalidated for locale: ${t}`,
                })
              );
            return (
              await c.wc.invalidateAll(),
              Response.json({
                success: !0,
                message: "All translation caches invalidated",
              })
            );
          } catch (e) {
            return (
              console.error("Cache invalidation error:", e),
              Response.json(
                { success: !1, message: "Failed to invalidate cache" },
                { status: 500 },
              )
            );
          }
        }
        async function d(e) {
          try {
            let { searchParams: r } = new URL(e.url),
              t = r.get("locale");
            if (!t)
              return Response.json(
                { success: !1, message: "Locale parameter is required" },
                { status: 400 },
              );
            let s = await c.wc.get(t);
            return Response.json({
              success: !0,
              locale: t,
              hasCache: !!s,
              translations: s,
            });
          } catch (e) {
            return (
              console.error("Cache check error:", e),
              Response.json(
                { success: !1, message: "Failed to check cache" },
                { status: 500 },
              )
            );
          }
        }
        let h = { ...o },
          p =
            "workUnitAsyncStorage" in h
              ? h.workUnitAsyncStorage
              : "requestAsyncStorage" in h
                ? h.requestAsyncStorage
                : void 0;
        function y(e, r) {
          return "phase-production-build" === process.env.NEXT_PHASE ||
            "function" != typeof e
            ? e
            : new Proxy(e, {
                apply: (e, t, s) => {
                  let i;
                  try {
                    let e = p?.getStore();
                    i = e?.headers;
                  } catch (e) {}
                  return l
                    .wrapRouteHandlerWithSentry(e, {
                      method: r,
                      parameterizedRoute: "/api/translations/cache",
                      headers: i,
                    })
                    .apply(t, s);
                },
              });
        }
        let g = y(d, "GET"),
          w = y(void 0, "POST"),
          x = y(void 0, "PUT"),
          f = y(void 0, "PATCH"),
          v = y(u, "DELETE"),
          C = y(void 0, "HEAD"),
          q = y(void 0, "OPTIONS"),
          m = new i.AppRouteRouteModule({
            definition: {
              kind: a.RouteKind.APP_ROUTE,
              page: "/api/translations/cache/route",
              pathname: "/api/translations/cache",
              filename: "route",
              bundlePath: "app/api/translations/cache/route",
            },
            resolvedPagePath:
              "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\api\\translations\\cache\\route.ts",
            nextConfigOutput: "",
            userland: s,
          }),
          { workAsyncStorage: R, workUnitAsyncStorage: S, serverHooks: b } = m;
        function T() {
          return (0, n.patchFetch)({
            workAsyncStorage: R,
            workUnitAsyncStorage: S,
          });
        }
      },
    });
  var r = require("../../../../webpack-runtime.js");
  r.C(e);
  var t = (e) => r((r.s = e)),
    s = r.X(0, [827, 3346, 6838], () => t(98785));
  module.exports = s;
})();
//# sourceMappingURL=route.js.map
