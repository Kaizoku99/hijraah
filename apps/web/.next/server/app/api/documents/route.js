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
    (e._sentryDebugIds[r] = "10ead117-2ee9-4f51-9fb3-f570de954c0a"),
    (e._sentryDebugIdIdentifier =
      "sentry-dbid-10ead117-2ee9-4f51-9fb3-f570de954c0a"));
} catch (e) {}
("use strict");
(() => {
  var e = {};
  (e.id = 9220),
    (e.ids = [9220]),
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
                  (0, i.isNextRouterError)(r) ||
                  (0, u.isBailoutToCSRError)(r) ||
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
          u = t(58937),
          i = t(91613),
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
      47724: (e, r, t) => {
        t.d(r, { wP: () => n });
        var o = t(26457);
        let n = {
          async getDocuments(e) {
            let r = (0, o.UU)()
              .from("documents")
              .select("*")
              .order("created_at", { ascending: !1 });
            e && r.eq("case_id", e);
            let { data: t, error: n } = await r;
            if (n) throw n;
            return t;
          },
          async getDocumentById(e) {
            let r = (0, o.UU)(),
              { data: t, error: n } = await r
                .from("documents")
                .select("*")
                .eq("id", e)
                .single();
            if (n) throw n;
            return t;
          },
          async uploadDocument(e, r) {
            let t = (0, o.UU)(),
              n = e.name.split(".").pop(),
              u = `${r}/${Date.now()}.${n}`,
              { data: i, error: a } = await t.storage
                .from("documents")
                .upload(u, e);
            if (a) throw a;
            let {
                data: { publicUrl: s },
              } = t.storage.from("documents").getPublicUrl(u),
              { data: d, error: l } = await t
                .from("documents")
                .insert({
                  case_id: r,
                  name: e.name,
                  type: e.type,
                  size: e.size,
                  url: s,
                  path: u,
                })
                .select()
                .single();
            if (l) throw l;
            return d;
          },
          async deleteDocument(e) {
            let r = (0, o.UU)(),
              { data: t, error: n } = await r
                .from("documents")
                .select("path")
                .eq("id", e)
                .single();
            if (n) throw n;
            if (t?.path) {
              let { error: e } = await r.storage
                .from("documents")
                .remove([t.path]);
              if (e) throw e;
            }
            let { error: u } = await r.from("documents").delete().eq("id", e);
            if (u) throw u;
          },
        };
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
              return i;
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
          u = t(19121).actionAsyncStorage;
        function i(e, r, t) {
          void 0 === t && (t = o.RedirectStatusCode.TemporaryRedirect);
          let u = Object.defineProperty(
            Error(n.REDIRECT_ERROR_CODE),
            "__NEXT_ERROR_CODE",
            { value: "E394", enumerable: !1, configurable: !0 },
          );
          return (
            (u.digest =
              n.REDIRECT_ERROR_CODE + ";" + r + ";" + e + ";" + t + ";"),
            u
          );
        }
        function a(e, r) {
          var t;
          throw (
            (null != r ||
              (r = (
                null == u || null == (t = u.getStore()) ? void 0 : t.isAction
              )
                ? n.RedirectType.push
                : n.RedirectType.replace),
            i(e, r, o.RedirectStatusCode.TemporaryRedirect))
          );
        }
        function s(e, r) {
          throw (
            (void 0 === r && (r = n.RedirectType.replace),
            i(e, r, o.RedirectStatusCode.PermanentRedirect))
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
      88595: (e, r, t) => {
        t.r(r),
          t.d(r, {
            patchFetch: () => q,
            routeModule: () => O,
            serverHooks: () => P,
            workAsyncStorage: () => j,
            workUnitAsyncStorage: () => v,
          });
        var o = {};
        t.r(o),
          t.d(o, {
            DELETE: () => h,
            GET: () => R,
            HEAD: () => E,
            OPTIONS: () => w,
            PATCH: () => g,
            POST: () => m,
            PUT: () => x,
          });
        var n = t(94168),
          u = t(51293),
          i = t(64588),
          a = t(63033),
          s = t(68593),
          d = t(14795),
          l = t(47724),
          c = t(60442);
        async function p(e) {
          try {
            let { searchParams: r } = new URL(e.url),
              t = r.get("user_id"),
              o = r.get("case_id"),
              n = await (0, d.j2)();
            if (!n?.user)
              return s.NextResponse.json(
                { error: "Authentication required" },
                { status: 401 },
              );
            let u = await l.wP.getDocuments(o || void 0),
              i = t ? u.filter((e) => e.user_id === t) : u;
            return s.NextResponse.json(i);
          } catch (e) {
            return (
              console.error("Error fetching documents:", e),
              s.NextResponse.json(
                { error: "Failed to fetch documents" },
                { status: 500 },
              )
            );
          }
        }
        async function f(e) {
          try {
            let r = await e.formData(),
              t = r.get("file"),
              o = r.get("case_id");
            if ((r.get("name"), r.get("description"), !t || !o))
              return s.NextResponse.json(
                { error: "File and case_id are required" },
                { status: 400 },
              );
            let n = await (0, d.j2)();
            if (!n?.user)
              return s.NextResponse.json(
                { error: "Authentication required" },
                { status: 401 },
              );
            let u = await l.wP.uploadDocument(t, o);
            return s.NextResponse.json(u, { status: 201 });
          } catch (e) {
            return (
              console.error("Error uploading document:", e),
              s.NextResponse.json(
                { error: "Failed to upload document" },
                { status: 500 },
              )
            );
          }
        }
        let _ = { ...a },
          y =
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
                    let e = y?.getStore();
                    n = e?.headers;
                  } catch (e) {}
                  return c
                    .wrapRouteHandlerWithSentry(e, {
                      method: r,
                      parameterizedRoute: "/api/documents",
                      headers: n,
                    })
                    .apply(t, o);
                },
              });
        }
        let R = b(p, "GET"),
          m = b(f, "POST"),
          x = b(void 0, "PUT"),
          g = b(void 0, "PATCH"),
          h = b(void 0, "DELETE"),
          E = b(void 0, "HEAD"),
          w = b(void 0, "OPTIONS"),
          O = new n.AppRouteRouteModule({
            definition: {
              kind: u.RouteKind.APP_ROUTE,
              page: "/api/documents/route",
              pathname: "/api/documents",
              filename: "route",
              bundlePath: "app/api/documents/route",
            },
            resolvedPagePath:
              "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\api\\documents\\route.ts",
            nextConfigOutput: "",
            userland: o,
          }),
          { workAsyncStorage: j, workUnitAsyncStorage: v, serverHooks: P } = O;
        function q() {
          return (0, i.patchFetch)({
            workAsyncStorage: j,
            workUnitAsyncStorage: v,
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
              return i.forbidden;
            },
            notFound: function () {
              return u.notFound;
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
          u = t(11316),
          i = t(14749),
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
  var r = require("../../../webpack-runtime.js");
  r.C(e);
  var t = (e) => r((r.s = e)),
    o = r.X(
      0,
      [
        827, 6518, 2872, 7713, 5149, 7719, 8119, 5058, 5400, 131, 2028, 4232,
        9632,
      ],
      () => t(88595),
    );
  module.exports = o;
})();
//# sourceMappingURL=route.js.map
