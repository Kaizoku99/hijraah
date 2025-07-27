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
    (e._sentryDebugIds[r] = "7299f3b1-f2ef-4a16-a7c8-38b4874f1a27"),
    (e._sentryDebugIdIdentifier =
      "sentry-dbid-7299f3b1-f2ef-4a16-a7c8-38b4874f1a27"));
} catch (e) {}
("use strict");
(() => {
  var e = {};
  (e.id = 7181),
    (e.ids = [7181]),
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
      23145: (e, r, t) => {
        t.a(e, async (e, o) => {
          try {
            t.r(r),
              t.d(r, {
                DELETE: () => f,
                GET: () => l,
                HEAD: () => g,
                OPTIONS: () => w,
                PATCH: () => y,
                POST: () => q,
                PUT: () => h,
              });
            var s = t(63033),
              i = t(14795),
              n = t(15422),
              a = t(60442),
              p = e([n]);
            async function u(e) {
              try {
                let e = await (0, i.j2)();
                if (!e?.user?.id)
                  return Response.json(
                    { error: "Unauthorized" },
                    { status: 401 },
                  );
                let r = await (0, n.VN)(e.user.id);
                return Response.json({ chats: r });
              } catch (e) {
                return (
                  console.error("Failed to get chat history:", e),
                  Response.json(
                    { error: "Failed to load chat history" },
                    { status: 500 },
                  )
                );
              }
            }
            n = (p.then ? (await p)() : p)[0];
            let x = { ...s },
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
                    apply: (e, t, o) => {
                      let s;
                      try {
                        let e = c?.getStore();
                        s = e?.headers;
                      } catch (e) {}
                      return a
                        .wrapRouteHandlerWithSentry(e, {
                          method: r,
                          parameterizedRoute: "/(ai-unified)/api/history",
                          headers: s,
                        })
                        .apply(t, o);
                    },
                  });
            }
            let l = d(u, "GET"),
              q = d(void 0, "POST"),
              h = d(void 0, "PUT"),
              y = d(void 0, "PATCH"),
              f = d(void 0, "DELETE"),
              g = d(void 0, "HEAD"),
              w = d(void 0, "OPTIONS");
            o();
          } catch (e) {
            o(e);
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
      67798: (e, r, t) => {
        t.a(e, async (e, o) => {
          try {
            t.r(r),
              t.d(r, {
                patchFetch: () => u,
                routeModule: () => d,
                serverHooks: () => l,
                workAsyncStorage: () => x,
                workUnitAsyncStorage: () => c,
              });
            var s = t(94168),
              i = t(51293),
              n = t(64588),
              a = t(23145),
              p = e([a]);
            a = (p.then ? (await p)() : p)[0];
            let d = new s.AppRouteRouteModule({
                definition: {
                  kind: i.RouteKind.APP_ROUTE,
                  page: "/(ai-unified)/api/history/route",
                  pathname: "/api/history",
                  filename: "route",
                  bundlePath: "app/(ai-unified)/api/history/route",
                },
                resolvedPagePath:
                  "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\(ai-unified)\\api\\history\\route.ts",
                nextConfigOutput: "",
                userland: a,
              }),
              {
                workAsyncStorage: x,
                workUnitAsyncStorage: c,
                serverHooks: l,
              } = d;
            function u() {
              return (0, n.patchFetch)({
                workAsyncStorage: x,
                workUnitAsyncStorage: c,
              });
            }
            o();
          } catch (e) {
            o(e);
          }
        });
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
      85488: (e) => {
        e.exports = import("ai");
      },
      86592: (e) => {
        e.exports = require("node:inspector");
      },
      91645: (e) => {
        e.exports = require("net");
      },
      94168: (e, r, t) => {
        e.exports = t(44870);
      },
      94735: (e) => {
        e.exports = require("events");
      },
    });
  var r = require("../../../../webpack-runtime.js");
  r.C(e);
  var t = (e) => r((r.s = e)),
    o = r.X(
      0,
      [
        827, 6518, 2872, 7713, 5149, 7719, 8119, 5058, 131, 8342, 2028, 4256,
        4170, 4232, 9632, 4508,
      ],
      () => t(67798),
    );
  module.exports = o;
})();
//# sourceMappingURL=route.js.map
