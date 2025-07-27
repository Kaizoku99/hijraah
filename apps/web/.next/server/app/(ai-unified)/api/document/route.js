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
    (e._sentryDebugIds[r] = "a48a94c8-8f22-490a-82ac-d47b00bff666"),
    (e._sentryDebugIdIdentifier =
      "sentry-dbid-a48a94c8-8f22-490a-82ac-d47b00bff666"));
} catch (e) {}
("use strict");
(() => {
  var e = {};
  (e.id = 9672),
    (e.ids = [9672]),
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
      24480: (e, r, t) => {
        t.a(e, async (e, s) => {
          try {
            t.r(r),
              t.d(r, {
                patchFetch: () => p,
                routeModule: () => d,
                serverHooks: () => x,
                workAsyncStorage: () => c,
                workUnitAsyncStorage: () => l,
              });
            var n = t(94168),
              i = t(51293),
              o = t(64588),
              u = t(34744),
              a = e([u]);
            u = (a.then ? (await a)() : a)[0];
            let d = new n.AppRouteRouteModule({
                definition: {
                  kind: i.RouteKind.APP_ROUTE,
                  page: "/(ai-unified)/api/document/route",
                  pathname: "/api/document",
                  filename: "route",
                  bundlePath: "app/(ai-unified)/api/document/route",
                },
                resolvedPagePath:
                  "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\(ai-unified)\\api\\document\\route.ts",
                nextConfigOutput: "",
                userland: u,
              }),
              {
                workAsyncStorage: c,
                workUnitAsyncStorage: l,
                serverHooks: x,
              } = d;
            function p() {
              return (0, o.patchFetch)({
                workAsyncStorage: c,
                workUnitAsyncStorage: l,
              });
            }
            s();
          } catch (e) {
            s(e);
          }
        });
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
      34744: (e, r, t) => {
        t.a(e, async (e, s) => {
          try {
            t.r(r),
              t.d(r, {
                DELETE: () => g,
                GET: () => q,
                HEAD: () => m,
                OPTIONS: () => b,
                PATCH: () => y,
                POST: () => w,
                PUT: () => h,
              });
            var n = t(63033),
              i = t(14795),
              o = t(16034),
              u = t(60442),
              a = e([o]);
            async function p(e) {
              let { searchParams: r } = new URL(e.url),
                t = r.get("id");
              if (!t) return new Response("Missing id", { status: 400 });
              let s = await (0, i.j2)();
              if (!s?.user?.id)
                return new Response("Unauthorized", { status: 401 });
              let n = await (0, o.xt)({ id: t }),
                [u] = n;
              return u
                ? u.userId !== s.user.id
                  ? new Response("Forbidden", { status: 403 })
                  : Response.json(n, { status: 200 })
                : new Response("Not found", { status: 404 });
            }
            async function d(e) {
              let { searchParams: r } = new URL(e.url),
                t = r.get("id");
              if (!t) return new Response("Missing id", { status: 400 });
              let s = await (0, i.j2)();
              if (!s?.user?.id)
                return new Response("Unauthorized", { status: 401 });
              let { content: n, title: u, kind: a } = await e.json(),
                p = await (0, o.xt)({ id: t });
              if (p.length > 0) {
                let [e] = p;
                if (e.userId !== s.user.id)
                  return new Response("Forbidden", { status: 403 });
              }
              let d = await (0, o.bd)({
                id: t,
                content: n,
                title: u,
                kind: a,
                userId: s.user.id,
              });
              return Response.json(d, { status: 200 });
            }
            async function c(e) {
              let { searchParams: r } = new URL(e.url),
                t = r.get("id"),
                s = r.get("timestamp");
              if (!t) return new Response("Missing id", { status: 400 });
              if (!s) return new Response("Missing timestamp", { status: 400 });
              let n = await (0, i.j2)();
              if (!n?.user?.id)
                return new Response("Unauthorized", { status: 401 });
              let [u] = await (0, o.xt)({ id: t });
              if (u.userId !== n.user.id)
                return new Response("Unauthorized", { status: 401 });
              let a = await (0, o.iB)({ id: t, timestamp: new Date(s) });
              return Response.json(a, { status: 200 });
            }
            o = (a.then ? (await a)() : a)[0];
            let x = { ...n },
              f =
                "workUnitAsyncStorage" in x
                  ? x.workUnitAsyncStorage
                  : "requestAsyncStorage" in x
                    ? x.requestAsyncStorage
                    : void 0;
            function l(e, r) {
              return "phase-production-build" === process.env.NEXT_PHASE ||
                "function" != typeof e
                ? e
                : new Proxy(e, {
                    apply: (e, t, s) => {
                      let n;
                      try {
                        let e = f?.getStore();
                        n = e?.headers;
                      } catch (e) {}
                      return u
                        .wrapRouteHandlerWithSentry(e, {
                          method: r,
                          parameterizedRoute: "/(ai-unified)/api/document",
                          headers: n,
                        })
                        .apply(t, s);
                    },
                  });
            }
            let q = l(p, "GET"),
              w = l(d, "POST"),
              h = l(void 0, "PUT"),
              y = l(void 0, "PATCH"),
              g = l(c, "DELETE"),
              m = l(void 0, "HEAD"),
              b = l(void 0, "OPTIONS");
            s();
          } catch (e) {
            s(e);
          }
        });
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
      77598: (e) => {
        e.exports = require("node:crypto");
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
      85488: (e) => {
        e.exports = import("ai");
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
  var r = require("../../../../webpack-runtime.js");
  r.C(e);
  var t = (e) => r((r.s = e)),
    s = r.X(
      0,
      [
        827, 6518, 2872, 7713, 5149, 4990, 7719, 8119, 5058, 131, 2028, 2256,
        1070, 5483, 4232, 9632, 6034,
      ],
      () => t(24480),
    );
  module.exports = s;
})();
//# sourceMappingURL=route.js.map
