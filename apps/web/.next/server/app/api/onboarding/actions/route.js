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
    (e._sentryDebugIds[r] = "bdab3627-4141-4ec1-9bb2-13817fc31962"),
    (e._sentryDebugIdIdentifier =
      "sentry-dbid-bdab3627-4141-4ec1-9bb2-13817fc31962"));
} catch (e) {}
("use strict");
(() => {
  var e = {};
  (e.id = 1541),
    (e.ids = [1541]),
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
      11316: (e, r, t) => {
        Object.defineProperty(r, "__esModule", { value: !0 }),
          Object.defineProperty(r, "notFound", {
            enumerable: !0,
            get: function () {
              return n;
            },
          });
        let o = "" + t(17581).HTTP_ERROR_FALLBACK_ERROR_CODE + ";404";
        function n() {
          let e = Object.defineProperty(Error(o), "__NEXT_ERROR_CODE", {
            value: "E394",
            enumerable: !1,
            configurable: !0,
          });
          throw ((e.digest = o), e);
        }
        ("function" == typeof r.default ||
          ("object" == typeof r.default && null !== r.default)) &&
          void 0 === r.default.__esModule &&
          (Object.defineProperty(r.default, "__esModule", { value: !0 }),
          Object.assign(r.default, r),
          (e.exports = r.default));
      },
      11997: (e) => {
        e.exports = require("punycode");
      },
      14749: (e, r, t) => {
        function o() {
          throw Object.defineProperty(
            Error(
              "`forbidden()` is experimental and only allowed to be enabled when `experimental.authInterrupts` is enabled.",
            ),
            "__NEXT_ERROR_CODE",
            { value: "E488", enumerable: !1, configurable: !0 },
          );
        }
        Object.defineProperty(r, "__esModule", { value: !0 }),
          Object.defineProperty(r, "forbidden", {
            enumerable: !0,
            get: function () {
              return o;
            },
          }),
          t(17581).HTTP_ERROR_FALLBACK_ERROR_CODE,
          ("function" == typeof r.default ||
            ("object" == typeof r.default && null !== r.default)) &&
            void 0 === r.default.__esModule &&
            (Object.defineProperty(r.default, "__esModule", { value: !0 }),
            Object.assign(r.default, r),
            (e.exports = r.default));
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
      23399: (e, r, t) => {
        Object.defineProperty(r, "__esModule", { value: !0 }),
          Object.defineProperty(r, "unstable_rethrow", {
            enumerable: !0,
            get: function () {
              return function e(r) {
                if (
                  (0, u.isNextRouterError)(r) ||
                  (0, i.isBailoutToCSRError)(r) ||
                  (0, s.isDynamicServerError)(r) ||
                  (0, a.isDynamicPostpone)(r) ||
                  (0, n.isPostpone)(r) ||
                  (0, o.isHangingPromiseRejectionError)(r)
                )
                  throw r;
                r instanceof Error && "cause" in r && e(r.cause);
              };
            },
          });
        let o = t(6223),
          n = t(96124),
          i = t(58937),
          u = t(91613),
          a = t(62938),
          s = t(98800);
        ("function" == typeof r.default ||
          ("object" == typeof r.default && null !== r.default)) &&
          void 0 === r.default.__esModule &&
          (Object.defineProperty(r.default, "__esModule", { value: !0 }),
          Object.assign(r.default, r),
          (e.exports = r.default));
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
      29073: (e, r, t) => {
        var o = t(90645);
        t.o(o, "notFound") &&
          t.d(r, {
            notFound: function () {
              return o.notFound;
            },
          }),
          t.o(o, "permanentRedirect") &&
            t.d(r, {
              permanentRedirect: function () {
                return o.permanentRedirect;
              },
            }),
          t.o(o, "redirect") &&
            t.d(r, {
              redirect: function () {
                return o.redirect;
              },
            });
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
      42228: (e, r, t) => {
        t.r(r),
          t.d(r, {
            patchFetch: () => C,
            routeModule: () => P,
            serverHooks: () => T,
            workAsyncStorage: () => w,
            workUnitAsyncStorage: () => q,
          });
        var o = {};
        t.r(o),
          t.d(o, {
            DELETE: () => O,
            GET: () => E,
            HEAD: () => j,
            OPTIONS: () => v,
            PATCH: () => m,
            POST: () => g,
            PUT: () => h,
          });
        var n = t(94168),
          i = t(51293),
          u = t(64588),
          a = t(63033),
          s = t(68593),
          d = t(58342),
          l = t(14795),
          c = t(48149),
          p = t(60442);
        let f = d.Ik({
          actionKey: d.Yj().min(1),
          isCompleted: d.zM().default(!0),
        });
        async function _(e) {
          try {
            let r = await (0, l.j2)();
            if (!r?.user)
              return s.NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 },
              );
            let t = r.user.id,
              o = await e.json(),
              n = f.safeParse(o);
            if (!n.success)
              return s.NextResponse.json(
                { error: "Invalid request data", details: n.error },
                { status: 400 },
              );
            let { actionKey: i, isCompleted: u } = n.data,
              a = await (0, c.UU)(),
              { data: d, error: p } = await a
                .from("onboarding_actions")
                .select("*")
                .eq("user_id", t)
                .eq("action_key", i)
                .single();
            if (p && "PGRST116" !== p.code)
              return s.NextResponse.json(
                { error: "Failed to check existing action", details: p },
                { status: 500 },
              );
            let { error: _ } = await a
              .from("onboarding_actions")
              .upsert({
                id: d?.id,
                user_id: t,
                action_key: i,
                is_completed: u,
                completed_at: u ? new Date().toISOString() : d?.completed_at,
              });
            if (_)
              return s.NextResponse.json(
                { error: "Failed to update action", details: _ },
                { status: 500 },
              );
            return s.NextResponse.json({ success: !0 });
          } catch (e) {
            return (
              console.error("Error marking onboarding action:", e),
              s.NextResponse.json(
                { error: "Internal server error" },
                { status: 500 },
              )
            );
          }
        }
        async function b(e) {
          try {
            let e = await (0, l.j2)();
            if (!e?.user)
              return s.NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 },
              );
            let r = e.user.id,
              t = await (0, c.UU)(),
              { data: o, error: n } = await t
                .from("onboarding_actions")
                .select("action_key, is_completed, completed_at")
                .eq("user_id", r)
                .eq("is_completed", !0);
            if (n)
              return s.NextResponse.json(
                { error: "Failed to fetch actions", details: n },
                { status: 500 },
              );
            let i = o.map((e) => ({
              actionKey: e.action_key,
              isCompleted: e.is_completed,
              completedAt: e.completed_at,
            }));
            return s.NextResponse.json(i);
          } catch (e) {
            return (
              console.error("Error fetching onboarding actions:", e),
              s.NextResponse.json(
                { error: "Internal server error" },
                { status: 500 },
              )
            );
          }
        }
        let R = { ...a },
          y =
            "workUnitAsyncStorage" in R
              ? R.workUnitAsyncStorage
              : "requestAsyncStorage" in R
                ? R.requestAsyncStorage
                : void 0;
        function x(e, r) {
          return "phase-production-build" === process.env.NEXT_PHASE ||
            "function" != typeof e
            ? e
            : new Proxy(e, {
                apply: (e, t, o) => {
                  let n;
                  try {
                    let e = y?.getStore();
                    n = e?.headers;
                  } catch (e) {}
                  return p
                    .wrapRouteHandlerWithSentry(e, {
                      method: r,
                      parameterizedRoute: "/api/onboarding/actions",
                      headers: n,
                    })
                    .apply(t, o);
                },
              });
        }
        let E = x(b, "GET"),
          g = x(_, "POST"),
          h = x(void 0, "PUT"),
          m = x(void 0, "PATCH"),
          O = x(void 0, "DELETE"),
          j = x(void 0, "HEAD"),
          v = x(void 0, "OPTIONS"),
          P = new n.AppRouteRouteModule({
            definition: {
              kind: i.RouteKind.APP_ROUTE,
              page: "/api/onboarding/actions/route",
              pathname: "/api/onboarding/actions",
              filename: "route",
              bundlePath: "app/api/onboarding/actions/route",
            },
            resolvedPagePath:
              "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\api\\onboarding\\actions\\route.ts",
            nextConfigOutput: "",
            userland: o,
          }),
          { workAsyncStorage: w, workUnitAsyncStorage: q, serverHooks: T } = P;
        function C() {
          return (0, u.patchFetch)({
            workAsyncStorage: w,
            workUnitAsyncStorage: q,
          });
        }
      },
      42600: (e, r, t) => {
        Object.defineProperty(r, "__esModule", { value: !0 }),
          Object.defineProperty(r, "unstable_rethrow", {
            enumerable: !0,
            get: function () {
              return o;
            },
          });
        let o = t(23399).unstable_rethrow;
        ("function" == typeof r.default ||
          ("object" == typeof r.default && null !== r.default)) &&
          void 0 === r.default.__esModule &&
          (Object.defineProperty(r.default, "__esModule", { value: !0 }),
          Object.assign(r.default, r),
          (e.exports = r.default));
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
      52480: (e, r, t) => {
        function o() {
          throw Object.defineProperty(
            Error(
              "`unauthorized()` is experimental and only allowed to be used when `experimental.authInterrupts` is enabled.",
            ),
            "__NEXT_ERROR_CODE",
            { value: "E411", enumerable: !1, configurable: !0 },
          );
        }
        Object.defineProperty(r, "__esModule", { value: !0 }),
          Object.defineProperty(r, "unauthorized", {
            enumerable: !0,
            get: function () {
              return o;
            },
          }),
          t(17581).HTTP_ERROR_FALLBACK_ERROR_CODE,
          ("function" == typeof r.default ||
            ("object" == typeof r.default && null !== r.default)) &&
            void 0 === r.default.__esModule &&
            (Object.defineProperty(r.default, "__esModule", { value: !0 }),
            Object.assign(r.default, r),
            (e.exports = r.default));
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
      65278: (e, r, t) => {
        Object.defineProperty(r, "__esModule", { value: !0 }),
          !(function (e, r) {
            for (var t in r)
              Object.defineProperty(e, t, { enumerable: !0, get: r[t] });
          })(r, {
            getRedirectError: function () {
              return u;
            },
            getRedirectStatusCodeFromError: function () {
              return c;
            },
            getRedirectTypeFromError: function () {
              return l;
            },
            getURLFromRedirectError: function () {
              return d;
            },
            permanentRedirect: function () {
              return s;
            },
            redirect: function () {
              return a;
            },
          });
        let o = t(20835),
          n = t(21293),
          i = t(19121).actionAsyncStorage;
        function u(e, r, t) {
          void 0 === t && (t = o.RedirectStatusCode.TemporaryRedirect);
          let i = Object.defineProperty(
            Error(n.REDIRECT_ERROR_CODE),
            "__NEXT_ERROR_CODE",
            { value: "E394", enumerable: !1, configurable: !0 },
          );
          return (
            (i.digest =
              n.REDIRECT_ERROR_CODE + ";" + r + ";" + e + ";" + t + ";"),
            i
          );
        }
        function a(e, r) {
          var t;
          throw (
            (null != r ||
              (r = (
                null == i || null == (t = i.getStore()) ? void 0 : t.isAction
              )
                ? n.RedirectType.push
                : n.RedirectType.replace),
            u(e, r, o.RedirectStatusCode.TemporaryRedirect))
          );
        }
        function s(e, r) {
          throw (
            (void 0 === r && (r = n.RedirectType.replace),
            u(e, r, o.RedirectStatusCode.PermanentRedirect))
          );
        }
        function d(e) {
          return (0, n.isRedirectError)(e)
            ? e.digest.split(";").slice(2, -2).join(";")
            : null;
        }
        function l(e) {
          if (!(0, n.isRedirectError)(e))
            throw Object.defineProperty(
              Error("Not a redirect error"),
              "__NEXT_ERROR_CODE",
              { value: "E260", enumerable: !1, configurable: !0 },
            );
          return e.digest.split(";", 2)[1];
        }
        function c(e) {
          if (!(0, n.isRedirectError)(e))
            throw Object.defineProperty(
              Error("Not a redirect error"),
              "__NEXT_ERROR_CODE",
              { value: "E260", enumerable: !1, configurable: !0 },
            );
          return Number(e.digest.split(";").at(-2));
        }
        ("function" == typeof r.default ||
          ("object" == typeof r.default && null !== r.default)) &&
          void 0 === r.default.__esModule &&
          (Object.defineProperty(r.default, "__esModule", { value: !0 }),
          Object.assign(r.default, r),
          (e.exports = r.default));
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
      90645: (e, r, t) => {
        Object.defineProperty(r, "__esModule", { value: !0 }),
          !(function (e, r) {
            for (var t in r)
              Object.defineProperty(e, t, { enumerable: !0, get: r[t] });
          })(r, {
            ReadonlyURLSearchParams: function () {
              return l;
            },
            RedirectType: function () {
              return n.RedirectType;
            },
            forbidden: function () {
              return u.forbidden;
            },
            notFound: function () {
              return i.notFound;
            },
            permanentRedirect: function () {
              return o.permanentRedirect;
            },
            redirect: function () {
              return o.redirect;
            },
            unauthorized: function () {
              return a.unauthorized;
            },
            unstable_rethrow: function () {
              return s.unstable_rethrow;
            },
          });
        let o = t(65278),
          n = t(21293),
          i = t(11316),
          u = t(14749),
          a = t(52480),
          s = t(42600);
        class d extends Error {
          constructor() {
            super(
              "Method unavailable on `ReadonlyURLSearchParams`. Read more: https://nextjs.org/docs/app/api-reference/functions/use-search-params#updating-searchparams",
            );
          }
        }
        class l extends URLSearchParams {
          append() {
            throw new d();
          }
          delete() {
            throw new d();
          }
          set() {
            throw new d();
          }
          sort() {
            throw new d();
          }
        }
        ("function" == typeof r.default ||
          ("object" == typeof r.default && null !== r.default)) &&
          void 0 === r.default.__esModule &&
          (Object.defineProperty(r.default, "__esModule", { value: !0 }),
          Object.assign(r.default, r),
          (e.exports = r.default));
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
    o = r.X(
      0,
      [
        827, 6518, 2872, 7713, 5149, 7719, 8119, 5058, 5400, 131, 8342, 2028,
        4232, 9632,
      ],
      () => t(42228),
    );
  module.exports = o;
})();
//# sourceMappingURL=route.js.map
