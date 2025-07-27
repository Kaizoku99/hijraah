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
    (e._sentryDebugIds[r] = "169d1c77-f1e0-4e38-b792-9291f97b6d8c"),
    (e._sentryDebugIdIdentifier =
      "sentry-dbid-169d1c77-f1e0-4e38-b792-9291f97b6d8c"));
} catch (e) {}
("use strict");
(() => {
  var e = {};
  (e.id = 3275),
    (e.ids = [3275]),
    (e.modules = {
      3295: (e) => {
        e.exports = require("next/dist/server/app-render/after-task-async-storage.external.js");
      },
      8086: (e) => {
        e.exports = require("module");
      },
      10846: (e) => {
        e.exports = require("next/dist/compiled/next-server/app-page.runtime.prod.js");
      },
      11997: (e) => {
        e.exports = require("punycode");
      },
      19121: (e) => {
        e.exports = require("next/dist/server/app-render/action-async-storage.external.js");
      },
      19771: (e) => {
        e.exports = require("process");
      },
      21820: (e) => {
        e.exports = require("os");
      },
      27910: (e) => {
        e.exports = require("stream");
      },
      28354: (e) => {
        e.exports = require("util");
      },
      29021: (e) => {
        e.exports = require("fs");
      },
      29294: (e) => {
        e.exports = require("next/dist/server/app-render/work-async-storage.external.js");
      },
      31421: (e) => {
        e.exports = require("node:child_process");
      },
      33873: (e) => {
        e.exports = require("path");
      },
      34631: (e) => {
        e.exports = require("tls");
      },
      36686: (e) => {
        e.exports = require("diagnostics_channel");
      },
      37067: (e) => {
        e.exports = require("node:http");
      },
      38522: (e) => {
        e.exports = require("node:zlib");
      },
      41692: (e) => {
        e.exports = require("node:tls");
      },
      44708: (e) => {
        e.exports = require("node:https");
      },
      44870: (e) => {
        e.exports = require("next/dist/compiled/next-server/app-route.runtime.prod.js");
      },
      46689: (e, r, t) => {
        t.r(r),
          t.d(r, {
            patchFetch: () => S,
            routeModule: () => _,
            serverHooks: () => C,
            workAsyncStorage: () => k,
            workUnitAsyncStorage: () => D,
          });
        var s = {};
        t.r(s),
          t.d(s, {
            DELETE: () => E,
            GET: () => R,
            HEAD: () => U,
            OPTIONS: () => T,
            PATCH: () => N,
            POST: () => v,
            PUT: () => P,
          });
        var n = t(94168),
          i = t(51293),
          o = t(64588),
          a = t(63033),
          d = t(68593),
          u = t(14795),
          p = t(69959),
          l = t(62799),
          x = t(42476),
          c = t(58342),
          w = t(79273),
          b = t(60442);
        let f = c.Ik({
            url: c.Yj().url("Invalid URL format"),
            namespace: c.Yj().min(1, "Namespace is required").max(255),
            title: c.Yj().optional(),
            description: c.Yj().optional(),
            isPublic: c.zM().default(!1),
            crawlConfig: c
              .Ik({
                maxPages: c.ai().min(1).max(1e3).default(100),
                includePatterns: c.YO(c.Yj()).default([]),
                excludePatterns: c.YO(c.Yj()).default([]),
                respectRobotsTxt: c.zM().default(!0),
                delay: c.ai().min(0).max(1e4).default(1e3),
              })
              .optional(),
          }),
          q = f.partial();
        async function I(e) {
          try {
            let r = await (0, u.j2)();
            if (!r?.user?.id)
              return d.NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 },
              );
            let { searchParams: t } = new URL(e.url),
              s = "true" === t.get("includePublic"),
              n = l.db
                .select({
                  id: p.webIndexes.id,
                  url: p.webIndexes.url,
                  namespace: p.webIndexes.namespace,
                  title: p.webIndexes.title,
                  description: p.webIndexes.description,
                  pagesCrawled: p.webIndexes.pagesCrawled,
                  totalPages: p.webIndexes.totalPages,
                  isActive: p.webIndexes.isActive,
                  isPublic: p.webIndexes.isPublic,
                  createdAt: p.webIndexes.createdAt,
                  updatedAt: p.webIndexes.updatedAt,
                  lastCrawledAt: p.webIndexes.lastCrawledAt,
                  lastCrawlDuration: p.webIndexes.lastCrawlDuration,
                })
                .from(p.webIndexes);
            n = s
              ? n.where((0, x.eq)(p.webIndexes.userId, r.user.id))
              : n.where(
                  (0, x.Uo)(
                    (0, x.eq)(p.webIndexes.userId, r.user.id),
                    (0, x.eq)(p.webIndexes.isActive, !0),
                  ),
                );
            let i = await n.orderBy(p.webIndexes.createdAt);
            return d.NextResponse.json({ indexes: i });
          } catch (e) {
            return (
              console.error("Error fetching web indexes:", e),
              d.NextResponse.json(
                { error: "Failed to fetch web indexes" },
                { status: 500 },
              )
            );
          }
        }
        async function g(e) {
          try {
            let r = await (0, u.j2)();
            if (!r?.user?.id)
              return d.NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 },
              );
            let t = await e.json(),
              s = f.parse(t);
            if (
              (
                await l.db
                  .select({ id: p.webIndexes.id })
                  .from(p.webIndexes)
                  .where(
                    (0, x.Uo)(
                      (0, x.eq)(p.webIndexes.userId, r.user.id),
                      (0, x.eq)(p.webIndexes.namespace, s.namespace),
                    ),
                  )
                  .limit(1)
              ).length > 0
            )
              return d.NextResponse.json(
                { error: "Namespace already exists" },
                { status: 409 },
              );
            let [n] = await l.db
              .insert(p.webIndexes)
              .values({
                userId: r.user.id,
                url: s.url,
                namespace: s.namespace,
                title: s.title,
                description: s.description,
                isPublic: s.isPublic,
                crawlConfig: s.crawlConfig || {},
              })
              .returning();
            return (
              await l.db
                .insert(p.crawlJobs)
                .values({
                  webIndexId: n.id,
                  status: "pending",
                  metadata: {
                    initialCrawl: !0,
                    maxPages: s.crawlConfig?.maxPages || 100,
                  },
                }),
              d.NextResponse.json({ index: n }, { status: 201 })
            );
          } catch (e) {
            if (e instanceof w.G)
              return d.NextResponse.json(
                { error: "Validation failed", details: e.errors },
                { status: 400 },
              );
            return (
              console.error("Error creating web index:", e),
              d.NextResponse.json(
                { error: "Failed to create web index" },
                { status: 500 },
              )
            );
          }
        }
        async function h(e) {
          try {
            let r = await (0, u.j2)();
            if (!r?.user?.id)
              return d.NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 },
              );
            let { searchParams: t } = new URL(e.url),
              s = t.get("id");
            if (!s)
              return d.NextResponse.json(
                { error: "Index ID is required" },
                { status: 400 },
              );
            let n = await e.json(),
              i = q.parse(n),
              o = await l.db
                .select({ id: p.webIndexes.id })
                .from(p.webIndexes)
                .where(
                  (0, x.Uo)(
                    (0, x.eq)(p.webIndexes.id, s),
                    (0, x.eq)(p.webIndexes.userId, r.user.id),
                  ),
                )
                .limit(1);
            if (0 === o.length)
              return d.NextResponse.json(
                { error: "Web index not found" },
                { status: 404 },
              );
            let [a] = await l.db
              .update(p.webIndexes)
              .set({ ...i, updatedAt: new Date() })
              .where((0, x.eq)(p.webIndexes.id, s))
              .returning();
            return d.NextResponse.json({ index: a });
          } catch (e) {
            if (e instanceof w.G)
              return d.NextResponse.json(
                { error: "Validation failed", details: e.errors },
                { status: 400 },
              );
            return (
              console.error("Error updating web index:", e),
              d.NextResponse.json(
                { error: "Failed to update web index" },
                { status: 500 },
              )
            );
          }
        }
        async function m(e) {
          try {
            let r = await (0, u.j2)();
            if (!r?.user?.id)
              return d.NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 },
              );
            let { searchParams: t } = new URL(e.url),
              s = t.get("id");
            if (!s)
              return d.NextResponse.json(
                { error: "Index ID is required" },
                { status: 400 },
              );
            let n = await l.db
              .select({ id: p.webIndexes.id })
              .from(p.webIndexes)
              .where(
                (0, x.Uo)(
                  (0, x.eq)(p.webIndexes.id, s),
                  (0, x.eq)(p.webIndexes.userId, r.user.id),
                ),
              )
              .limit(1);
            if (0 === n.length)
              return d.NextResponse.json(
                { error: "Web index not found" },
                { status: 404 },
              );
            return (
              await l.db
                .update(p.webIndexes)
                .set({ isActive: !1, updatedAt: new Date() })
                .where((0, x.eq)(p.webIndexes.id, s)),
              d.NextResponse.json({ success: !0 })
            );
          } catch (e) {
            return (
              console.error("Error deleting web index:", e),
              d.NextResponse.json(
                { error: "Failed to delete web index" },
                { status: 500 },
              )
            );
          }
        }
        let y = { ...a },
          j =
            "workUnitAsyncStorage" in y
              ? y.workUnitAsyncStorage
              : "requestAsyncStorage" in y
                ? y.requestAsyncStorage
                : void 0;
        function A(e, r) {
          return "phase-production-build" === process.env.NEXT_PHASE ||
            "function" != typeof e
            ? e
            : new Proxy(e, {
                apply: (e, t, s) => {
                  let n;
                  try {
                    let e = j?.getStore();
                    n = e?.headers;
                  } catch (e) {}
                  return b
                    .wrapRouteHandlerWithSentry(e, {
                      method: r,
                      parameterizedRoute: "/api/web-indexes",
                      headers: n,
                    })
                    .apply(t, s);
                },
              });
        }
        let R = A(I, "GET"),
          v = A(g, "POST"),
          P = A(h, "PUT"),
          N = A(void 0, "PATCH"),
          E = A(m, "DELETE"),
          U = A(void 0, "HEAD"),
          T = A(void 0, "OPTIONS"),
          _ = new n.AppRouteRouteModule({
            definition: {
              kind: i.RouteKind.APP_ROUTE,
              page: "/api/web-indexes/route",
              pathname: "/api/web-indexes",
              filename: "route",
              bundlePath: "app/api/web-indexes/route",
            },
            resolvedPagePath:
              "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\api\\web-indexes\\route.ts",
            nextConfigOutput: "",
            userland: s,
          }),
          { workAsyncStorage: k, workUnitAsyncStorage: D, serverHooks: C } = _;
        function S() {
          return (0, o.patchFetch)({
            workAsyncStorage: k,
            workUnitAsyncStorage: D,
          });
        }
      },
      48161: (e) => {
        e.exports = require("node:os");
      },
      53053: (e) => {
        e.exports = require("node:diagnostics_channel");
      },
      55511: (e) => {
        e.exports = require("crypto");
      },
      55591: (e) => {
        e.exports = require("https");
      },
      57075: (e) => {
        e.exports = require("node:stream");
      },
      57975: (e) => {
        e.exports = require("node:util");
      },
      62799: (e, r, t) => {
        t.d(r, { db: () => d });
        var s = t(61371),
          n = t(78814),
          i = t(69959);
        let o = process.env.DATABASE_URL;
        if (!o) throw Error("DATABASE_URL environment variable is required");
        let a = (0, n.A)(o, { max: 10, idle_timeout: 20, connect_timeout: 10 }),
          d = (0, s.f)(a, { schema: i, logger: !1 });
      },
      63033: (e) => {
        e.exports = require("next/dist/server/app-render/work-unit-async-storage.external.js");
      },
      73024: (e) => {
        e.exports = require("node:fs");
      },
      73566: (e) => {
        e.exports = require("worker_threads");
      },
      74075: (e) => {
        e.exports = require("zlib");
      },
      74998: (e) => {
        e.exports = require("perf_hooks");
      },
      75919: (e) => {
        e.exports = require("node:worker_threads");
      },
      76760: (e) => {
        e.exports = require("node:path");
      },
      77030: (e) => {
        e.exports = require("node:net");
      },
      79428: (e) => {
        e.exports = require("buffer");
      },
      79551: (e) => {
        e.exports = require("url");
      },
      79646: (e) => {
        e.exports = require("child_process");
      },
      80481: (e) => {
        e.exports = require("node:readline");
      },
      81630: (e) => {
        e.exports = require("http");
      },
      83997: (e) => {
        e.exports = require("tty");
      },
      84297: (e) => {
        e.exports = require("async_hooks");
      },
      86592: (e) => {
        e.exports = require("node:inspector");
      },
      91645: (e) => {
        e.exports = require("net");
      },
      94735: (e) => {
        e.exports = require("events");
      },
    });
  var r = require("../../../webpack-runtime.js");
  r.C(e);
  var t = (e) => r((r.s = e)),
    s = r.X(
      0,
      [
        827, 6518, 2872, 7713, 5149, 7719, 8119, 5058, 5400, 131, 8342, 2028,
        1070, 978, 1371, 4232, 9632, 9959,
      ],
      () => t(46689),
    );
  module.exports = s;
})();
//# sourceMappingURL=route.js.map
