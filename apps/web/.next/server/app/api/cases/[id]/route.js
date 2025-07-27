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
    (e._sentryDebugIds[r] = "6218a3b5-3258-480c-885d-b14261009a6d"),
    (e._sentryDebugIdIdentifier =
      "sentry-dbid-6218a3b5-3258-480c-885d-b14261009a6d"));
} catch (e) {}
("use strict");
(() => {
  var e = {};
  (e.id = 4361),
    (e.ids = [4361]),
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
                  (0, s.isBailoutToCSRError)(r) ||
                  (0, i.isDynamicServerError)(r) ||
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
          s = t(58937),
          u = t(91613),
          a = t(62938),
          i = t(98800);
        ("function" == typeof r.default ||
          ("object" == typeof r.default && null !== r.default)) &&
          void 0 === r.default.__esModule &&
          (Object.defineProperty(r.default, "__esModule", { value: !0 }),
          Object.assign(r.default, r),
          (e.exports = r.default));
      },
      24203: (e, r, t) => {
        t.d(r, { pC: () => n });
        var o = t(26457);
        let n = {
          async getCases() {
            let e = (0, o.UU)(),
              { data: r, error: t } = await e
                .from("cases")
                .select("*")
                .order("created_at", { ascending: !1 });
            if (t) throw t;
            return r;
          },
          async getCaseById(e) {
            let r = (0, o.UU)(),
              { data: t, error: n } = await r
                .from("cases")
                .select("*")
                .eq("id", e)
                .single();
            if (n) throw n;
            return t;
          },
          async createCase(e) {
            let r = (0, o.UU)(),
              { data: t, error: n } = await r
                .from("cases")
                .insert(e)
                .select()
                .single();
            if (n) throw n;
            return t;
          },
          async updateCase(e, r) {
            let t = (0, o.UU)(),
              { data: n, error: s } = await t
                .from("cases")
                .update(r)
                .eq("id", e)
                .select()
                .single();
            if (s) throw s;
            return n;
          },
          async deleteCase(e) {
            let r = (0, o.UU)(),
              { error: t } = await r.from("cases").delete().eq("id", e);
            if (t) throw t;
          },
          async getCaseAnalytics() {
            let e = (0, o.UU)(),
              { data: r, error: t } = await e
                .from("cases")
                .select("status, type");
            if (t) throw t;
            return {
              total: r.length,
              byStatus: r.reduce(
                (e, r) => ((e[r.status] = (e[r.status] || 0) + 1), e),
                {},
              ),
              byType: r.reduce(
                (e, r) => ((e[r.type] = (e[r.type] || 0) + 1), e),
                {},
              ),
            };
          },
        };
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
              return i;
            },
            redirect: function () {
              return a;
            },
          });
        let o = t(20835),
          n = t(21293),
          s = t(19121).actionAsyncStorage;
        function u(e, r, t) {
          void 0 === t && (t = o.RedirectStatusCode.TemporaryRedirect);
          let s = Object.defineProperty(
            Error(n.REDIRECT_ERROR_CODE),
            "__NEXT_ERROR_CODE",
            { value: "E394", enumerable: !1, configurable: !0 },
          );
          return (
            (s.digest =
              n.REDIRECT_ERROR_CODE + ";" + r + ";" + e + ";" + t + ";"),
            s
          );
        }
        function a(e, r) {
          var t;
          throw (
            (null != r ||
              (r = (
                null == s || null == (t = s.getStore()) ? void 0 : t.isAction
              )
                ? n.RedirectType.push
                : n.RedirectType.replace),
            u(e, r, o.RedirectStatusCode.TemporaryRedirect))
          );
        }
        function i(e, r) {
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
      90198: (e, r, t) => {
        t.r(r),
          t.d(r, {
            patchFetch: () => C,
            routeModule: () => m,
            serverHooks: () => P,
            workAsyncStorage: () => v,
            workUnitAsyncStorage: () => q,
          });
        var o = {};
        t.r(o),
          t.d(o, {
            DELETE: () => j,
            GET: () => x,
            HEAD: () => O,
            OPTIONS: () => w,
            PATCH: () => g,
            POST: () => h,
            PUT: () => E,
          });
        var n = t(94168),
          s = t(51293),
          u = t(64588),
          a = t(63033),
          i = t(68593),
          d = t(14795),
          l = t(24203),
          c = t(60442);
        async function p(e, { params: r }) {
          try {
            let e = await (0, d.j2)();
            if (!e?.user)
              return i.NextResponse.json(
                { error: "Authentication required" },
                { status: 401 },
              );
            let t = await l.pC.getCaseById(r.id);
            if (!t)
              return i.NextResponse.json(
                { error: "Case not found" },
                { status: 404 },
              );
            if (t.user_id !== e.user.id)
              return i.NextResponse.json(
                { error: "Unauthorized" },
                { status: 403 },
              );
            return i.NextResponse.json(t);
          } catch (e) {
            return (
              console.error("Error fetching case:", e),
              i.NextResponse.json(
                { error: "Failed to fetch case" },
                { status: 500 },
              )
            );
          }
        }
        async function f(e, { params: r }) {
          try {
            let t = await e.json(),
              o = await (0, d.j2)();
            if (!o?.user)
              return i.NextResponse.json(
                { error: "Authentication required" },
                { status: 401 },
              );
            let n = await l.pC.getCaseById(r.id);
            if (!n)
              return i.NextResponse.json(
                { error: "Case not found" },
                { status: 404 },
              );
            if (n.user_id !== o.user.id)
              return i.NextResponse.json(
                { error: "Unauthorized" },
                { status: 403 },
              );
            let s = await l.pC.updateCase(r.id, t);
            return i.NextResponse.json(s);
          } catch (e) {
            return (
              console.error("Error updating case:", e),
              i.NextResponse.json(
                { error: "Failed to update case" },
                { status: 500 },
              )
            );
          }
        }
        async function y(e, { params: r }) {
          try {
            let e = await (0, d.j2)();
            if (!e?.user)
              return i.NextResponse.json(
                { error: "Authentication required" },
                { status: 401 },
              );
            let t = await l.pC.getCaseById(r.id);
            if (!t)
              return i.NextResponse.json(
                { error: "Case not found" },
                { status: 404 },
              );
            if (t.user_id !== e.user.id)
              return i.NextResponse.json(
                { error: "Unauthorized" },
                { status: 403 },
              );
            return (
              await l.pC.deleteCase(r.id),
              i.NextResponse.json({ success: !0 }, { status: 200 })
            );
          } catch (e) {
            return (
              console.error("Error deleting case:", e),
              i.NextResponse.json(
                { error: "Failed to delete case" },
                { status: 500 },
              )
            );
          }
        }
        let _ = { ...a },
          R =
            "workUnitAsyncStorage" in _
              ? _.workUnitAsyncStorage
              : "requestAsyncStorage" in _
                ? _.requestAsyncStorage
                : void 0;
        function b(e, r) {
          return "phase-production-build" === process.env.NEXT_PHASE ||
            "function" != typeof e
            ? e
            : new Proxy(e, {
                apply: (e, t, o) => {
                  let n;
                  try {
                    let e = R?.getStore();
                    n = e?.headers;
                  } catch (e) {}
                  return c
                    .wrapRouteHandlerWithSentry(e, {
                      method: r,
                      parameterizedRoute: "/api/cases/[id]",
                      headers: n,
                    })
                    .apply(t, o);
                },
              });
        }
        let x = b(p, "GET"),
          h = b(void 0, "POST"),
          E = b(f, "PUT"),
          g = b(void 0, "PATCH"),
          j = b(y, "DELETE"),
          O = b(void 0, "HEAD"),
          w = b(void 0, "OPTIONS"),
          m = new n.AppRouteRouteModule({
            definition: {
              kind: s.RouteKind.APP_ROUTE,
              page: "/api/cases/[id]/route",
              pathname: "/api/cases/[id]",
              filename: "route",
              bundlePath: "app/api/cases/[id]/route",
            },
            resolvedPagePath:
              "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\api\\cases\\[id]\\route.ts",
            nextConfigOutput: "",
            userland: o,
          }),
          { workAsyncStorage: v, workUnitAsyncStorage: q, serverHooks: P } = m;
        function C() {
          return (0, u.patchFetch)({
            workAsyncStorage: v,
            workUnitAsyncStorage: q,
          });
        }
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
              return s.notFound;
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
              return i.unstable_rethrow;
            },
          });
        let o = t(65278),
          n = t(21293),
          s = t(11316),
          u = t(14749),
          a = t(52480),
          i = t(42600);
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
        827, 6518, 2872, 7713, 5149, 7719, 8119, 5058, 5400, 131, 2028, 4232,
        9632,
      ],
      () => t(90198),
    );
  module.exports = o;
})();
//# sourceMappingURL=route.js.map
