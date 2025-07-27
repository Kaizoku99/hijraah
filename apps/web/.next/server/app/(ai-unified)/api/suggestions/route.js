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
    (e._sentryDebugIds[r] = "f717b133-f736-40cc-8370-e1d2960413c5"),
    (e._sentryDebugIdIdentifier =
      "sentry-dbid-f717b133-f736-40cc-8370-e1d2960413c5"));
} catch (e) {}
("use strict");
(() => {
  var e = {};
  (e.id = 4970),
    (e.ids = [4970]),
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
      13440: (e, r, t) => {
        t.a(e, async (e, s) => {
          try {
            t.r(r),
              t.d(r, {
                patchFetch: () => a,
                routeModule: () => d,
                serverHooks: () => l,
                workAsyncStorage: () => x,
                workUnitAsyncStorage: () => c,
              });
            var o = t(94168),
              i = t(51293),
              n = t(64588),
              u = t(92856),
              p = e([u]);
            u = (p.then ? (await p)() : p)[0];
            let d = new o.AppRouteRouteModule({
                definition: {
                  kind: i.RouteKind.APP_ROUTE,
                  page: "/(ai-unified)/api/suggestions/route",
                  pathname: "/api/suggestions",
                  filename: "route",
                  bundlePath: "app/(ai-unified)/api/suggestions/route",
                },
                resolvedPagePath:
                  "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\(ai-unified)\\api\\suggestions\\route.ts",
                nextConfigOutput: "",
                userland: u,
              }),
              {
                workAsyncStorage: x,
                workUnitAsyncStorage: c,
                serverHooks: l,
              } = d;
            function a() {
              return (0, n.patchFetch)({
                workAsyncStorage: x,
                workUnitAsyncStorage: c,
              });
            }
            s();
          } catch (e) {
            s(e);
          }
        });
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
      92856: (e, r, t) => {
        t.a(e, async (e, s) => {
          try {
            t.r(r),
              t.d(r, {
                DELETE: () => f,
                GET: () => l,
                HEAD: () => h,
                OPTIONS: () => w,
                PATCH: () => y,
                POST: () => q,
                PUT: () => g,
              });
            var o = t(63033),
              i = t(14795),
              n = t(16034),
              u = t(60442),
              p = e([n]);
            async function a(e) {
              let { searchParams: r } = new URL(e.url),
                t = r.get("documentId");
              if (!t) return new Response("Not Found", { status: 404 });
              let s = await (0, i.j2)();
              if (!s || !s.user)
                return new Response("Unauthorized", { status: 401 });
              let o = await (0, n.tw)({ documentId: t }),
                [u] = o;
              return u
                ? u.userId !== s.user.id
                  ? new Response("Unauthorized", { status: 401 })
                  : Response.json(o, { status: 200 })
                : Response.json([], { status: 200 });
            }
            n = (p.then ? (await p)() : p)[0];
            let x = { ...o },
              c =
                "workUnitAsyncStorage" in x
                  ? x.workUnitAsyncStorage
                  : "requestAsyncStorage" in x
                    ? x.requestAsyncStorage
                    : void 0;
            function d(e, r) {
              return "phase-production-build" === process.env.NEXT_PHASE ||
                "function" != typeof e
                ? e
                : new Proxy(e, {
                    apply: (e, t, s) => {
                      let o;
                      try {
                        let e = c?.getStore();
                        o = e?.headers;
                      } catch (e) {}
                      return u
                        .wrapRouteHandlerWithSentry(e, {
                          method: r,
                          parameterizedRoute: "/(ai-unified)/api/suggestions",
                          headers: o,
                        })
                        .apply(t, s);
                    },
                  });
            }
            let l = d(a, "GET"),
              q = d(void 0, "POST"),
              g = d(void 0, "PUT"),
              y = d(void 0, "PATCH"),
              f = d(void 0, "DELETE"),
              h = d(void 0, "HEAD"),
              w = d(void 0, "OPTIONS");
            s();
          } catch (e) {
            s(e);
          }
        });
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
      () => t(13440),
    );
  module.exports = s;
})();
//# sourceMappingURL=route.js.map
