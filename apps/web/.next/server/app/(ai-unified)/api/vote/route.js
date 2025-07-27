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
    (e._sentryDebugIds[r] = "ac87f3d1-23c6-4cfd-9a99-5e42d62a96b7"),
    (e._sentryDebugIdIdentifier =
      "sentry-dbid-ac87f3d1-23c6-4cfd-9a99-5e42d62a96b7"));
} catch (e) {}
("use strict");
(() => {
  var e = {};
  (e.id = 1683),
    (e.ids = [1683]),
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
      48161: (e) => {
        e.exports = require("node:os");
      },
      50197: (e, r, t) => {
        t.a(e, async (e, s) => {
          try {
            t.r(r),
              t.d(r, {
                DELETE: () => y,
                GET: () => q,
                HEAD: () => g,
                OPTIONS: () => v,
                PATCH: () => w,
                POST: () => h,
                PUT: () => f,
              });
            var o = t(63033),
              n = t(14795),
              i = t(16034),
              a = t(60442),
              u = e([i]);
            async function p(e) {
              let { searchParams: r } = new URL(e.url),
                t = r.get("chatId");
              if (!t)
                return new Response("sessionId is required", { status: 400 });
              let s = await (0, n.j2)();
              if (!s || !s.user || !s.user.id)
                return new Response("Unauthorized", { status: 401 });
              let o = await (0, i.XO)({ id: t });
              if (!o)
                return new Response("Chat session not found", { status: 404 });
              if (o.userId !== s.user.id)
                return new Response(
                  "Unauthorized: You do not own this chat session",
                  { status: 401 },
                );
              let a = await (0, i.sl)({ sessionId: t });
              return Response.json(a, { status: 200 });
            }
            async function d(e) {
              let { messageId: r, type: t, chatId: s } = await e.json();
              if (!r || !t)
                return new Response(
                  "messageId and type (up/down) are required",
                  { status: 400 },
                );
              let o = await (0, n.j2)(),
                a = o?.user;
              if (!a || !a.id)
                return new Response("Unauthorized", { status: 401 });
              let u = await (0, i.kA)({ id: r });
              if (!u) return new Response("Message not found", { status: 404 });
              let p = await (0, i.XO)({ id: u.sessionId });
              return p
                ? p.userId !== a.id
                  ? new Response(
                      "Unauthorized: You do not own the chat this message belongs to",
                      { status: 401 },
                    )
                  : (await (0, i.Ci)({
                      messageId: r,
                      userId: a.id,
                      isUpvoted: "up" === t,
                    }),
                    new Response("Message vote updated", { status: 200 }))
                : new Response("Chat session not found for the message", {
                    status: 404,
                  });
            }
            i = (u.then ? (await u)() : u)[0];
            let x = { ...o },
              l =
                "workUnitAsyncStorage" in x
                  ? x.workUnitAsyncStorage
                  : "requestAsyncStorage" in x
                    ? x.requestAsyncStorage
                    : void 0;
            function c(e, r) {
              return "phase-production-build" === process.env.NEXT_PHASE ||
                "function" != typeof e
                ? e
                : new Proxy(e, {
                    apply: (e, t, s) => {
                      let o;
                      try {
                        let e = l?.getStore();
                        o = e?.headers;
                      } catch (e) {}
                      return a
                        .wrapRouteHandlerWithSentry(e, {
                          method: r,
                          parameterizedRoute: "/(ai-unified)/api/vote",
                          headers: o,
                        })
                        .apply(t, s);
                    },
                  });
            }
            let q = c(p, "GET"),
              h = c(void 0, "POST"),
              f = c(void 0, "PUT"),
              w = c(d, "PATCH"),
              y = c(void 0, "DELETE"),
              g = c(void 0, "HEAD"),
              v = c(void 0, "OPTIONS");
            s();
          } catch (e) {
            s(e);
          }
        });
      },
      52654: (e, r, t) => {
        t.a(e, async (e, s) => {
          try {
            t.r(r),
              t.d(r, {
                patchFetch: () => p,
                routeModule: () => d,
                serverHooks: () => l,
                workAsyncStorage: () => c,
                workUnitAsyncStorage: () => x,
              });
            var o = t(94168),
              n = t(51293),
              i = t(64588),
              a = t(50197),
              u = e([a]);
            a = (u.then ? (await u)() : u)[0];
            let d = new o.AppRouteRouteModule({
                definition: {
                  kind: n.RouteKind.APP_ROUTE,
                  page: "/(ai-unified)/api/vote/route",
                  pathname: "/api/vote",
                  filename: "route",
                  bundlePath: "app/(ai-unified)/api/vote/route",
                },
                resolvedPagePath:
                  "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\(ai-unified)\\api\\vote\\route.ts",
                nextConfigOutput: "",
                userland: a,
              }),
              {
                workAsyncStorage: c,
                workUnitAsyncStorage: x,
                serverHooks: l,
              } = d;
            function p() {
              return (0, i.patchFetch)({
                workAsyncStorage: c,
                workUnitAsyncStorage: x,
              });
            }
            s();
          } catch (e) {
            s(e);
          }
        });
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
      () => t(52654),
    );
  module.exports = s;
})();
//# sourceMappingURL=route.js.map
