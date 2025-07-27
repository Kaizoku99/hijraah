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
    (e._sentryDebugIds[t] = "b310b1f3-fa0e-4f5d-af0e-01d37d487bbb"),
    (e._sentryDebugIdIdentifier =
      "sentry-dbid-b310b1f3-fa0e-4f5d-af0e-01d37d487bbb"));
} catch (e) {}
(() => {
  var e = {};
  (e.id = 4117),
    (e.ids = [4117]),
    (e.modules = {
      3295: (e) => {
        "use strict";
        e.exports = require("next/dist/server/app-render/after-task-async-storage.external.js");
      },
      3519: (e, t, r) => {
        "use strict";
        r.r(t),
          r.d(t, {
            AuthProvider: () => l,
            useAuth: () => c,
            useHasPermission: () => f,
            useHasRole: () => h,
            useIsAuthenticated: () => p,
            useSession: () => m,
            useUser: () => d,
          });
        var n = r(61268),
          i = r(84205),
          s = r(32367),
          a = r(61460);
        function o(e) {
          if (!e) return null;
          let t = e.user_metadata?.role || "client",
            r = {
              theme: e.user_metadata?.settings_theme || "system",
              language: e.user_metadata?.settings_language || "en",
              emailNotifications:
                e.user_metadata?.settings_emailNotifications || !1,
              documentReminders:
                e.user_metadata?.settings_documentReminders || !1,
              applicationUpdates:
                e.user_metadata?.settings_applicationUpdates || !1,
              twoFactorAuth: e.user_metadata?.settings_twoFactorAuth || !1,
            };
          return {
            ...e,
            fullName:
              e.user_metadata?.full_name || e.email?.split("@")[0] || "User",
            avatarUrl: e.user_metadata?.avatar_url || "",
            role: t,
            isAdmin: "admin" === t,
            settings: r,
            hasTwoFactorAuth: () => r.twoFactorAuth,
            updateSettings: (t) => {
              let n = { ...r, ...t };
              return o({
                ...e,
                user_metadata: {
                  ...e.user_metadata,
                  settings_theme: n.theme,
                  settings_language: n.language,
                  settings_emailNotifications: n.emailNotifications,
                  settings_documentReminders: n.documentReminders,
                  settings_applicationUpdates: n.applicationUpdates,
                  settings_twoFactorAuth: n.twoFactorAuth,
                },
              });
            },
            toObject: () => ({
              id: e.id,
              email: e.email,
              fullName:
                e.user_metadata?.full_name || e.email?.split("@")[0] || "User",
              avatarUrl: e.user_metadata?.avatar_url || "",
              role: t,
              settings: r,
            }),
          };
        }
        let u = (0, i.createContext)(void 0);
        function l({ children: e }) {
          let [t, r] = (0, i.useState)(null),
            [a, l] = (0, i.useState)(null),
            [c, d] = (0, i.useState)(!0),
            p = (0, s.UU)(),
            h = (0, i.useCallback)(async () => {
              try {
                d(!0);
                let {
                  data: { session: e },
                  error: t,
                } = await p.auth.getSession();
                if (t) throw t;
                if (e) {
                  let {
                    data: { user: t },
                    error: n,
                  } = await p.auth.getUser();
                  if (n) throw n;
                  l(e), r(o(t));
                } else l(null), r(null);
              } catch (e) {
                console.error("Error refreshing session:", e), l(null), r(null);
              } finally {
                d(!1);
              }
            }, [p]),
            f = (0, i.useCallback)(
              async (e, t) => {
                d(!0);
                try {
                  if ("email" === e) {
                    if (!t?.email || !t?.password)
                      throw Error(
                        "Email and password required for email sign in",
                      );
                    let { data: e, error: n } = await p.auth.signInWithPassword(
                      { email: t.email, password: t.password },
                    );
                    if (n) throw n;
                    e?.session && (l(e.session), r(o(e.session.user)));
                  } else {
                    let { error: r } = await p.auth.signInWithOAuth({
                      provider: e,
                      options: t?.redirectTo
                        ? { redirectTo: t.redirectTo }
                        : void 0,
                    });
                    if (r) throw r;
                  }
                } catch (e) {
                  throw (console.error("Error signing in:", e), e);
                } finally {
                  d(!1);
                }
              },
              [p],
            ),
            m = (0, i.useCallback)(async () => {
              d(!0);
              try {
                let { error: e } = await p.auth.signOut();
                if (e) throw e;
                l(null), r(null);
              } catch (e) {
                console.error("Error signing out:", e);
              } finally {
                d(!1);
              }
            }, [p]),
            g = (0, i.useCallback)(
              async (e) => {
                d(!0);
                try {
                  if (!e.email || !e.password)
                    throw Error("Email and password required for sign up");
                  let { data: t, error: r } = await p.auth.signUp({
                    email: e.email,
                    password: e.password,
                    options: {
                      data: { full_name: e.fullName || "" },
                      emailRedirectTo:
                        e.redirectTo ||
                        `${window.location.origin}/auth/callback`,
                    },
                  });
                  if (r) throw r;
                  return t;
                } catch (e) {
                  throw (console.error("Error signing up:", e), e);
                } finally {
                  d(!1);
                }
              },
              [p],
            ),
            b = (0, i.useCallback)(
              async (e, t) => {
                d(!0);
                try {
                  let { error: r } = await p.auth.resetPasswordForEmail(e, {
                    redirectTo:
                      t || `${window.location.origin}/auth/reset-password`,
                  });
                  if (r) throw r;
                  return !0;
                } catch (e) {
                  throw (console.error("Error resetting password:", e), e);
                } finally {
                  d(!1);
                }
              },
              [p],
            ),
            y = (0, i.useCallback)(
              async (e) => {
                d(!0);
                try {
                  let { error: t } = await p.auth.updateUser({ password: e });
                  if (t) throw t;
                  return !0;
                } catch (e) {
                  throw (console.error("Error updating password:", e), e);
                } finally {
                  d(!1);
                }
              },
              [p],
            );
          return (0, n.jsx)(u.Provider, {
            value: {
              user: t,
              session: a,
              isLoading: c,
              isAuthenticated: !!a,
              signIn: f,
              signOut: m,
              refreshSession: h,
              signUp: g,
              resetPassword: b,
              updatePassword: y,
              error: null,
            },
            children: e,
          });
        }
        function c() {
          let e = (0, i.useContext)(u);
          if (void 0 === e)
            throw Error("useAuth must be used within an AuthProvider");
          return e;
        }
        function d() {
          let { user: e } = c();
          return e;
        }
        function p() {
          let { isAuthenticated: e } = c();
          return e;
        }
        function h(e) {
          let t = d();
          return t?.role === e;
        }
        function f(e) {
          let t = d();
          return (0, a._m)(t, e);
        }
        function m() {
          let e = (0, i.useContext)(u);
          if (void 0 === e)
            throw Error("useSession must be used within an AuthProvider");
          return {
            session: e.session,
            user: e.user,
            isLoading: e.isLoading,
            error: null,
            refreshSession: e.refreshSession,
          };
        }
      },
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
      11316: (e, t, r) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          Object.defineProperty(t, "notFound", {
            enumerable: !0,
            get: function () {
              return i;
            },
          });
        let n = "" + r(17581).HTTP_ERROR_FALLBACK_ERROR_CODE + ";404";
        function i() {
          let e = Object.defineProperty(Error(n), "__NEXT_ERROR_CODE", {
            value: "E394",
            enumerable: !1,
            configurable: !0,
          });
          throw ((e.digest = n), e);
        }
        ("function" == typeof t.default ||
          ("object" == typeof t.default && null !== t.default)) &&
          void 0 === t.default.__esModule &&
          (Object.defineProperty(t.default, "__esModule", { value: !0 }),
          Object.assign(t.default, t),
          (e.exports = t.default));
      },
      11997: (e) => {
        "use strict";
        e.exports = require("punycode");
      },
      14749: (e, t, r) => {
        "use strict";
        function n() {
          throw Object.defineProperty(
            Error(
              "`forbidden()` is experimental and only allowed to be enabled when `experimental.authInterrupts` is enabled.",
            ),
            "__NEXT_ERROR_CODE",
            { value: "E488", enumerable: !1, configurable: !0 },
          );
        }
        Object.defineProperty(t, "__esModule", { value: !0 }),
          Object.defineProperty(t, "forbidden", {
            enumerable: !0,
            get: function () {
              return n;
            },
          }),
          r(17581).HTTP_ERROR_FALLBACK_ERROR_CODE,
          ("function" == typeof t.default ||
            ("object" == typeof t.default && null !== t.default)) &&
            void 0 === t.default.__esModule &&
            (Object.defineProperty(t.default, "__esModule", { value: !0 }),
            Object.assign(t.default, t),
            (e.exports = t.default));
      },
      15668: (e) => {
        function t(e) {
          var t = Error("Cannot find module '" + e + "'");
          throw ((t.code = "MODULE_NOT_FOUND"), t);
        }
        (t.keys = () => []), (t.resolve = t), (t.id = 15668), (e.exports = t);
      },
      19121: (e) => {
        "use strict";
        e.exports = require("next/dist/server/app-render/action-async-storage.external.js");
      },
      19771: (e) => {
        "use strict";
        e.exports = require("process");
      },
      21820: (e) => {
        "use strict";
        e.exports = require("os");
      },
      23399: (e, t, r) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          Object.defineProperty(t, "unstable_rethrow", {
            enumerable: !0,
            get: function () {
              return function e(t) {
                if (
                  (0, a.isNextRouterError)(t) ||
                  (0, s.isBailoutToCSRError)(t) ||
                  (0, u.isDynamicServerError)(t) ||
                  (0, o.isDynamicPostpone)(t) ||
                  (0, i.isPostpone)(t) ||
                  (0, n.isHangingPromiseRejectionError)(t)
                )
                  throw t;
                t instanceof Error && "cause" in t && e(t.cause);
              };
            },
          });
        let n = r(6223),
          i = r(96124),
          s = r(58937),
          a = r(91613),
          o = r(62938),
          u = r(98800);
        ("function" == typeof t.default ||
          ("object" == typeof t.default && null !== t.default)) &&
          void 0 === t.default.__esModule &&
          (Object.defineProperty(t.default, "__esModule", { value: !0 }),
          Object.assign(t.default, t),
          (e.exports = t.default));
      },
      24277: (e, t, r) => {
        "use strict";
        r.d(t, { N: () => l });
        var n = r(62745),
          i = r(54016),
          s = (e, t) =>
            new Response(e, { headers: { "Content-Type": t } }).formData(),
          a = /^application\/([a-z-\.]+\+)?json(;\s*[a-zA-Z0-9\-]+\=([^;]+))*$/,
          o =
            /^multipart\/form-data(;\s?boundary=[a-zA-Z0-9'"()+_,\-./:=?]+)?$/,
          u =
            /^application\/x-www-form-urlencoded(;\s*[a-zA-Z0-9\-]+\=([^;]+))*$/,
          l = (e, t) => async (r, l) => {
            let c = {},
              d = r.req.header("Content-Type");
            switch (e) {
              case "json":
                if (!d || !a.test(d)) break;
                try {
                  c = await r.req.json();
                } catch {
                  throw new i.y(400, {
                    message: "Malformed JSON in request body",
                  });
                }
                break;
              case "form": {
                let e;
                if (!d || !(o.test(d) || u.test(d))) break;
                if (r.req.bodyCache.formData)
                  e = await r.req.bodyCache.formData;
                else
                  try {
                    let t = await r.req.arrayBuffer();
                    (e = await s(t, d)), (r.req.bodyCache.formData = e);
                  } catch (t) {
                    let e = "Malformed FormData request.";
                    throw (
                      ((e +=
                        t instanceof Error ? ` ${t.message}` : ` ${String(t)}`),
                      new i.y(400, { message: e }))
                    );
                  }
                let t = {};
                e.forEach((e, r) => {
                  r.endsWith("[]")
                    ? (t[r] ??= []).push(e)
                    : Array.isArray(t[r])
                      ? t[r].push(e)
                      : r in t
                        ? (t[r] = [t[r], e])
                        : (t[r] = e);
                }),
                  (c = t);
                break;
              }
              case "query":
                c = Object.fromEntries(
                  Object.entries(r.req.queries()).map(([e, t]) =>
                    1 === t.length ? [e, t[0]] : [e, t],
                  ),
                );
                break;
              case "param":
                c = r.req.param();
                break;
              case "header":
                c = r.req.header();
                break;
              case "cookie":
                c = (0, n.Ri)(r);
            }
            let p = await t(c, r);
            if (p instanceof Response) return p;
            r.req.addValidatedData(e, p), await l();
          };
      },
      27910: (e) => {
        "use strict";
        e.exports = require("stream");
      },
      28354: (e) => {
        "use strict";
        e.exports = require("util");
      },
      29021: (e) => {
        "use strict";
        e.exports = require("fs");
      },
      29073: (e, t, r) => {
        "use strict";
        var n = r(90645);
        r.o(n, "notFound") &&
          r.d(t, {
            notFound: function () {
              return n.notFound;
            },
          }),
          r.o(n, "permanentRedirect") &&
            r.d(t, {
              permanentRedirect: function () {
                return n.permanentRedirect;
              },
            }),
          r.o(n, "redirect") &&
            r.d(t, {
              redirect: function () {
                return n.redirect;
              },
            });
      },
      29294: (e) => {
        "use strict";
        e.exports = require("next/dist/server/app-render/work-async-storage.external.js");
      },
      31421: (e) => {
        "use strict";
        e.exports = require("node:child_process");
      },
      32367: (e, t, r) => {
        "use strict";
        let n;
        r.d(t, { AG: () => b, Iw: () => m, UU: () => g });
        var i = r(97713),
          s = r(15149),
          a = r.n(s),
          o = r(84205);
        let { fetch: u } = a()(),
          l = "http://localhost:54321",
          c =
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0",
          d = process.env.SUPABASE_SERVICE_ROLE_KEY,
          p = c ? { apikey: c } : void 0;
        function h() {
          if (!l || !c)
            throw (
              (console.error(
                "Missing environment variables NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY",
              ),
              Error("Supabase URL or Anon Key is missing."))
            );
        }
        {
          let e = globalThis;
          e.__USING_PONYFETCH__ ||
            ((e.fetch = u), (e.__USING_PONYFETCH__ = !0));
        }
        function f() {
          return (h(), n)
            ? n
            : (n = (0, i.createBrowserClient)(l, c, {
                global: { headers: p },
              }));
        }
        function m() {
          return (0, o.useMemo)(f, []);
        }
        function g() {
          return (
            h(), (0, i.createBrowserClient)(l, c, { global: { headers: p } })
          );
        }
        let b = f;
        f();
      },
      33873: (e) => {
        "use strict";
        e.exports = require("path");
      },
      34631: (e) => {
        "use strict";
        e.exports = require("tls");
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
      42600: (e, t, r) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          Object.defineProperty(t, "unstable_rethrow", {
            enumerable: !0,
            get: function () {
              return n;
            },
          });
        let n = r(23399).unstable_rethrow;
        ("function" == typeof t.default ||
          ("object" == typeof t.default && null !== t.default)) &&
          void 0 === t.default.__esModule &&
          (Object.defineProperty(t.default, "__esModule", { value: !0 }),
          Object.assign(t.default, t),
          (e.exports = t.default));
      },
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
      52480: (e, t, r) => {
        "use strict";
        function n() {
          throw Object.defineProperty(
            Error(
              "`unauthorized()` is experimental and only allowed to be used when `experimental.authInterrupts` is enabled.",
            ),
            "__NEXT_ERROR_CODE",
            { value: "E411", enumerable: !1, configurable: !0 },
          );
        }
        Object.defineProperty(t, "__esModule", { value: !0 }),
          Object.defineProperty(t, "unauthorized", {
            enumerable: !0,
            get: function () {
              return n;
            },
          }),
          r(17581).HTTP_ERROR_FALLBACK_ERROR_CODE,
          ("function" == typeof t.default ||
            ("object" == typeof t.default && null !== t.default)) &&
            void 0 === t.default.__esModule &&
            (Object.defineProperty(t.default, "__esModule", { value: !0 }),
            Object.assign(t.default, t),
            (e.exports = t.default));
      },
      53053: (e) => {
        "use strict";
        e.exports = require("node:diagnostics_channel");
      },
      54016: (e, t, r) => {
        "use strict";
        r.d(t, { y: () => n });
        var n = class extends Error {
          res;
          status;
          constructor(e = 500, t) {
            super(t?.message, { cause: t?.cause }),
              (this.res = t?.res),
              (this.status = e);
          }
          getResponse() {
            return this.res
              ? new Response(this.res.body, {
                  status: this.status,
                  headers: this.res.headers,
                })
              : new Response(this.message, { status: this.status });
          }
        };
      },
      55511: (e) => {
        "use strict";
        e.exports = require("crypto");
      },
      55591: (e) => {
        "use strict";
        e.exports = require("https");
      },
      57075: (e) => {
        "use strict";
        e.exports = require("node:stream");
      },
      57975: (e) => {
        "use strict";
        e.exports = require("node:util");
      },
      59570: () => {},
      61460: (e, t, r) => {
        "use strict";
        r.d(t, { _m: () => p });
        class n extends Error {
          constructor(e, t, r, n) {
            super(e),
              (this.name = "AuthError"),
              (this.code = t),
              (this.status = n),
              (this.originalError = r);
          }
          toJSON() {
            return {
              name: this.name,
              message: this.message,
              code: this.code,
              status: this.status,
            };
          }
          toResponse() {
            return new Response(
              JSON.stringify({
                error: { message: this.message, code: this.code },
              }),
              {
                status: this.status || 500,
                headers: { "Content-Type": "application/json" },
              },
            );
          }
        }
        class i extends n {
          constructor(e = "Authentication required", t) {
            super(e, "auth/unauthorized", t, 401),
              (this.name = "UnauthorizedError");
          }
        }
        class s extends n {
          constructor(e = "Insufficient permissions", t) {
            super(e, "auth/forbidden", t, 403), (this.name = "ForbiddenError");
          }
        }
        class a extends n {
          constructor(e = "Session error", t) {
            super(e, "auth/session-error", t, 400),
              (this.name = "SessionError");
          }
        }
        class o extends n {
          constructor(e = "Invalid credentials", t) {
            super(e, "auth/invalid-credentials", t, 401),
              (this.name = "InvalidCredentialsError");
          }
        }
        class u extends n {
          constructor(e = "User operation failed", t) {
            super(e, "auth/user-operation-failed", t, 400),
              (this.name = "UserOperationError");
          }
        }
        let l = { roles: {}, superAdminRole: "admin", enableCache: !0 };
        class c {
          constructor(e = {}) {
            this.permissionCache = new Map();
            let t = { ...l, ...e };
            (this.roles = t.roles || {}),
              (this.superAdminRole = t.superAdminRole || "admin"),
              (this.enableCache = t.enableCache ?? !0),
              (this.extractRoles =
                t.extractRoles || ((e) => [e.role || "user"]));
          }
          defineRole(e) {
            (this.roles[e.name] = e),
              this.enableCache && this.permissionCache.clear();
          }
          defineRoles(e) {
            (this.roles = { ...this.roles, ...e }),
              this.enableCache && this.permissionCache.clear();
          }
          getRolePermissions(e, t = new Set()) {
            if (t.has(e)) return new Set();
            t.add(e);
            let r = this.roles[e];
            if (!r) return new Set();
            let n = new Set(r.permissions);
            if (r.inherits && r.inherits.length > 0)
              for (let e of r.inherits)
                this.getRolePermissions(e, t).forEach((e) => n.add(e));
            return n;
          }
          getUserPermissions(e) {
            if (!e) return new Set();
            let t = this.extractRoles(e);
            if (t.includes(this.superAdminRole)) return new Set(["*"]);
            if (this.enableCache) {
              let e = t.sort().join(","),
                r = this.permissionCache.get(e);
              if (r) return r;
            }
            let r = new Set();
            for (let e of t)
              this.getRolePermissions(e).forEach((e) => r.add(e));
            if (this.enableCache && t.length > 0) {
              let e = t.sort().join(",");
              this.permissionCache.set(e, r);
            }
            return r;
          }
          hasRole(e, t) {
            if (!e) return !1;
            let r = this.extractRoles(e);
            return r.includes(t) || r.includes(this.superAdminRole);
          }
          hasPermission(e, t) {
            if (!e) return !1;
            let r = this.getUserPermissions(e);
            if (r.has("*") || r.has(t)) return !0;
            let n = t.split(":");
            for (let e = 1; e <= n.length; e++) {
              let t = [...n.slice(0, e), "*"].join(":");
              if (r.has(t)) return !0;
            }
            return !1;
          }
          hasAnyPermission(e, t) {
            return t.some((t) => this.hasPermission(e, t));
          }
          hasAllPermissions(e, t) {
            return t.every((t) => this.hasPermission(e, t));
          }
          enforcePermission(e, t) {
            if (!this.hasPermission(e, t))
              throw new s(`Missing required permission: ${t}`);
          }
          enforceAnyPermission(e, t) {
            if (!this.hasAnyPermission(e, t))
              throw new s(
                `Missing at least one of the required permissions: ${t.join(", ")}`,
              );
          }
          enforceAllPermissions(e, t) {
            if (!this.hasAllPermissions(e, t))
              throw new s(
                `Missing some of the required permissions: ${t.join(", ")}`,
              );
          }
          createPermission(e, t) {
            return `${e}:${t}`;
          }
        }
        let d = null;
        function p(e, t) {
          var r;
          return (d || (d = new c(void 0)), d).hasPermission(e, t);
        }
      },
      62745: (e, t, r) => {
        "use strict";
        r.d(t, { Yj: () => h, Ri: () => d, TV: () => p });
        var n = r(79533),
          i = { name: "HMAC", hash: "SHA-256" },
          s = async (e) => {
            let t = "string" == typeof e ? new TextEncoder().encode(e) : e;
            return await crypto.subtle.importKey("raw", t, i, !1, [
              "sign",
              "verify",
            ]);
          },
          a = /^[\w!#$%&'*.^`|~+-]+$/,
          o = /^[ !#-:<-[\]-~]*$/,
          u = (e, t) => {
            if (t && -1 === e.indexOf(t)) return {};
            let r = e.trim().split(";"),
              i = {};
            for (let e of r) {
              let r = (e = e.trim()).indexOf("=");
              if (-1 === r) continue;
              let s = e.substring(0, r).trim();
              if ((t && t !== s) || !a.test(s)) continue;
              let u = e.substring(r + 1).trim();
              if (
                (u.startsWith('"') && u.endsWith('"') && (u = u.slice(1, -1)),
                o.test(u) && ((i[s] = (0, n.Rp)(u)), t))
              )
                break;
            }
            return i;
          },
          l = (e, t, r = {}) => {
            let n = `${e}=${t}`;
            if (e.startsWith("__Secure-") && !r.secure)
              throw Error("__Secure- Cookie must have Secure attributes");
            if (e.startsWith("__Host-")) {
              if (!r.secure)
                throw Error("__Host- Cookie must have Secure attributes");
              if ("/" !== r.path)
                throw Error(
                  '__Host- Cookie must have Path attributes with "/"',
                );
              if (r.domain)
                throw Error("__Host- Cookie must not have Domain attributes");
            }
            if (r && "number" == typeof r.maxAge && r.maxAge >= 0) {
              if (r.maxAge > 3456e4)
                throw Error(
                  "Cookies Max-Age SHOULD NOT be greater than 400 days (34560000 seconds) in duration.",
                );
              n += `; Max-Age=${0 | r.maxAge}`;
            }
            if (
              (r.domain && "host" !== r.prefix && (n += `; Domain=${r.domain}`),
              r.path && (n += `; Path=${r.path}`),
              r.expires)
            ) {
              if (r.expires.getTime() - Date.now() > 3456e7)
                throw Error(
                  "Cookies Expires SHOULD NOT be greater than 400 days (34560000 seconds) in the future.",
                );
              n += `; Expires=${r.expires.toUTCString()}`;
            }
            if (
              (r.httpOnly && (n += "; HttpOnly"),
              r.secure && (n += "; Secure"),
              r.sameSite &&
                (n += `; SameSite=${r.sameSite.charAt(0).toUpperCase() + r.sameSite.slice(1)}`),
              r.priority && (n += `; Priority=${r.priority}`),
              r.partitioned)
            ) {
              if (!r.secure)
                throw Error("Partitioned Cookie must have Secure attributes");
              n += "; Partitioned";
            }
            return n;
          },
          c = (e, t, r) => l(e, (t = encodeURIComponent(t)), r),
          d = (e, t, r) => {
            let n = e.req.raw.headers.get("Cookie");
            if ("string" == typeof t) {
              if (!n) return;
              let e = t;
              return (
                "secure" === r
                  ? (e = "__Secure-" + t)
                  : "host" === r && (e = "__Host-" + t),
                u(n, e)[e]
              );
            }
            return n ? u(n) : {};
          },
          p = (e, t, r, n) => {
            let i;
            (i =
              n?.prefix === "secure"
                ? c("__Secure-" + t, r, { path: "/", ...n, secure: !0 })
                : n?.prefix === "host"
                  ? c("__Host-" + t, r, {
                      ...n,
                      path: "/",
                      secure: !0,
                      domain: void 0,
                    })
                  : c(t, r, { path: "/", ...n })),
              e.header("Set-Cookie", i, { append: !0 });
          },
          h = (e, t, r) => {
            let n = d(e, t, r?.prefix);
            return p(e, t, "", { ...r, maxAge: 0 }), n;
          };
      },
      63033: (e) => {
        "use strict";
        e.exports = require("next/dist/server/app-render/work-unit-async-storage.external.js");
      },
      65278: (e, t, r) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          !(function (e, t) {
            for (var r in t)
              Object.defineProperty(e, r, { enumerable: !0, get: t[r] });
          })(t, {
            getRedirectError: function () {
              return a;
            },
            getRedirectStatusCodeFromError: function () {
              return d;
            },
            getRedirectTypeFromError: function () {
              return c;
            },
            getURLFromRedirectError: function () {
              return l;
            },
            permanentRedirect: function () {
              return u;
            },
            redirect: function () {
              return o;
            },
          });
        let n = r(20835),
          i = r(21293),
          s = r(19121).actionAsyncStorage;
        function a(e, t, r) {
          void 0 === r && (r = n.RedirectStatusCode.TemporaryRedirect);
          let s = Object.defineProperty(
            Error(i.REDIRECT_ERROR_CODE),
            "__NEXT_ERROR_CODE",
            { value: "E394", enumerable: !1, configurable: !0 },
          );
          return (
            (s.digest =
              i.REDIRECT_ERROR_CODE + ";" + t + ";" + e + ";" + r + ";"),
            s
          );
        }
        function o(e, t) {
          var r;
          throw (
            (null != t ||
              (t = (
                null == s || null == (r = s.getStore()) ? void 0 : r.isAction
              )
                ? i.RedirectType.push
                : i.RedirectType.replace),
            a(e, t, n.RedirectStatusCode.TemporaryRedirect))
          );
        }
        function u(e, t) {
          throw (
            (void 0 === t && (t = i.RedirectType.replace),
            a(e, t, n.RedirectStatusCode.PermanentRedirect))
          );
        }
        function l(e) {
          return (0, i.isRedirectError)(e)
            ? e.digest.split(";").slice(2, -2).join(";")
            : null;
        }
        function c(e) {
          if (!(0, i.isRedirectError)(e))
            throw Object.defineProperty(
              Error("Not a redirect error"),
              "__NEXT_ERROR_CODE",
              { value: "E260", enumerable: !1, configurable: !0 },
            );
          return e.digest.split(";", 2)[1];
        }
        function d(e) {
          if (!(0, i.isRedirectError)(e))
            throw Object.defineProperty(
              Error("Not a redirect error"),
              "__NEXT_ERROR_CODE",
              { value: "E260", enumerable: !1, configurable: !0 },
            );
          return Number(e.digest.split(";").at(-2));
        }
        ("function" == typeof t.default ||
          ("object" == typeof t.default && null !== t.default)) &&
          void 0 === t.default.__esModule &&
          (Object.defineProperty(t.default, "__esModule", { value: !0 }),
          Object.assign(t.default, t),
          (e.exports = t.default));
      },
      73024: (e) => {
        "use strict";
        e.exports = require("node:fs");
      },
      73566: (e) => {
        "use strict";
        e.exports = require("worker_threads");
      },
      74075: (e) => {
        "use strict";
        e.exports = require("zlib");
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
      79428: (e) => {
        "use strict";
        e.exports = require("buffer");
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
      81630: (e) => {
        "use strict";
        e.exports = require("http");
      },
      82723: (e, t, r) => {
        Promise.resolve().then(r.bind(r, 3519));
      },
      83997: (e) => {
        "use strict";
        e.exports = require("tty");
      },
      84297: (e) => {
        "use strict";
        e.exports = require("async_hooks");
      },
      86202: (e, t, r) => {
        "use strict";
        r.r(t),
          r.d(t, {
            patchFetch: () => eS,
            routeModule: () => ew,
            serverHooks: () => eP,
            workAsyncStorage: () => ej,
            workUnitAsyncStorage: () => eR,
          });
        var n = {};
        r.r(n),
          r.d(n, {
            DELETE: () => ev,
            GET: () => em,
            HEAD: () => eO,
            OPTIONS: () => e_,
            PATCH: () => ey,
            POST: () => eg,
            PUT: () => eb,
          });
        var i = r(94168),
          s = r(51293),
          a = r(64588),
          o = r(63033);
        function u(e, t) {
          var r = {};
          for (var n in e)
            Object.prototype.hasOwnProperty.call(e, n) &&
              0 > t.indexOf(n) &&
              (r[n] = e[n]);
          if (null != e && "function" == typeof Object.getOwnPropertySymbols)
            for (
              var i = 0, n = Object.getOwnPropertySymbols(e);
              i < n.length;
              i++
            )
              0 > t.indexOf(n[i]) &&
                Object.prototype.propertyIsEnumerable.call(e, n[i]) &&
                (r[n[i]] = e[n[i]]);
          return r;
        }
        function l(e, t) {
          var r;
          return (
            (null == (r = null == e ? void 0 : e._def)
              ? void 0
              : r.typeName) === t
          );
        }
        function c(e, t) {
          let r = e.ZodType.prototype[t];
          e.ZodType.prototype[t] = function (...e) {
            let t = r.apply(this, e);
            return (t._def.openapi = this._def.openapi), t;
          };
        }
        function d(e, t) {
          if (null == e || null == t) return e === t;
          if (e === t || e.valueOf() === t.valueOf()) return !0;
          if (
            (Array.isArray(e) &&
              (!Array.isArray(t) || e.length !== t.length)) ||
            !(e instanceof Object) ||
            !(t instanceof Object)
          )
            return !1;
          let r = Object.keys(e);
          return (
            Object.keys(t).every((e) => -1 !== r.indexOf(e)) &&
            r.every((r) => d(e[r], t[r]))
          );
        }
        "function" == typeof SuppressedError && SuppressedError;
        class p {
          constructor() {
            this.buckets = new Map();
          }
          put(e) {
            let t = this.hashCodeOf(e),
              r = this.buckets.get(t);
            if (!r) return void this.buckets.set(t, [e]);
            r.some((t) => d(t, e)) || r.push(e);
          }
          contains(e) {
            let t = this.hashCodeOf(e),
              r = this.buckets.get(t);
            return !!r && r.some((t) => d(t, e));
          }
          values() {
            return [...this.buckets.values()].flat();
          }
          stats() {
            let e = 0,
              t = 0,
              r = 0;
            for (let n of this.buckets.values())
              (e += 1), (t += n.length), n.length > 1 && (r += 1);
            let n = e / t;
            return {
              totalBuckets: e,
              collisions: r,
              totalValues: t,
              hashEffectiveness: n,
            };
          }
          hashCodeOf(e) {
            let t = 0;
            if (Array.isArray(e)) {
              for (let r = 0; r < e.length; r++) t ^= this.hashCodeOf(e[r]) * r;
              return t;
            }
            if ("string" == typeof e) {
              for (let r = 0; r < e.length; r++) t ^= e.charCodeAt(r) * r;
              return t;
            }
            if ("number" == typeof e) return e;
            if ("object" == typeof e)
              for (let [r, n] of Object.entries(e))
                t ^= this.hashCodeOf(r) + this.hashCodeOf(null != n ? n : "");
            return t;
          }
        }
        function h(e) {
          return void 0 === e;
        }
        function f(e, t) {
          let r = {};
          return (
            Object.entries(e).forEach(([e, n]) => {
              r[e] = t(n);
            }),
            r
          );
        }
        function m(e, t) {
          let r = {};
          return (
            Object.entries(e).forEach(([e, n]) => {
              t(n, e) || (r[e] = n);
            }),
            r
          );
        }
        function g(e) {
          return e.filter((e) => !h(e));
        }
        function b(e) {
          return "string" == typeof e;
        }
        class y {
          constructor(e) {
            (this.parents = e), (this._definitions = []);
          }
          get definitions() {
            var e, t;
            return [
              ...(null !=
              (t =
                null == (e = this.parents)
                  ? void 0
                  : e.flatMap((e) => e.definitions))
                ? t
                : []),
              ...this._definitions,
            ];
          }
          register(e, t) {
            let r = this.schemaWithRefId(e, t);
            return this._definitions.push({ type: "schema", schema: r }), r;
          }
          registerParameter(e, t) {
            var r, n, i;
            let s = this.schemaWithRefId(e, t),
              a = null == (r = s._def.openapi) ? void 0 : r.metadata,
              o = s.openapi(
                Object.assign(Object.assign({}, a), {
                  param: Object.assign(
                    Object.assign({}, null == a ? void 0 : a.param),
                    {
                      name:
                        null !=
                        (i =
                          null == (n = null == a ? void 0 : a.param)
                            ? void 0
                            : n.name)
                          ? i
                          : e,
                    },
                  ),
                }),
              );
            return this._definitions.push({ type: "parameter", schema: o }), o;
          }
          registerPath(e) {
            this._definitions.push({ type: "route", route: e });
          }
          registerWebhook(e) {
            this._definitions.push({ type: "webhook", webhook: e });
          }
          registerComponent(e, t, r) {
            return (
              this._definitions.push({
                type: "component",
                componentType: e,
                name: t,
                component: r,
              }),
              { name: t, ref: { $ref: `#/components/${e}/${t}` } }
            );
          }
          schemaWithRefId(e, t) {
            return t.openapi(e);
          }
        }
        class v {
          constructor(e) {
            this.message = e;
          }
        }
        class O extends v {
          constructor(e, t) {
            super(e), (this.data = t);
          }
        }
        class _ extends v {
          constructor(e) {
            super(
              `Missing parameter data, please specify \`${e.missingField}\` and other OpenAPI parameter props using the \`param\` field of \`ZodSchema.openapi\``,
            ),
              (this.data = e);
          }
        }
        function w(e, t) {
          try {
            return e();
          } catch (e) {
            if (e instanceof _)
              throw new _(Object.assign(Object.assign({}, e.data), t));
            throw e;
          }
        }
        class j extends v {
          constructor(e) {
            super(
              "Unknown zod object type, please specify `type` and other OpenAPI props using `ZodSchema.openapi`.",
            ),
              (this.data = e);
          }
        }
        class R {
          static getMetadata(e) {
            var t;
            let r = this.unwrapChained(e),
              n = e._def.openapi ? e._def.openapi : r._def.openapi,
              i = null != (t = e.description) ? t : r.description;
            return {
              _internal: null == n ? void 0 : n._internal,
              metadata: Object.assign(
                { description: i },
                null == n ? void 0 : n.metadata,
              ),
            };
          }
          static getInternalMetadata(e) {
            let t = this.unwrapChained(e),
              r = e._def.openapi ? e._def.openapi : t._def.openapi;
            return null == r ? void 0 : r._internal;
          }
          static getParamMetadata(e) {
            var t, r;
            let n = this.unwrapChained(e),
              i = e._def.openapi ? e._def.openapi : n._def.openapi,
              s = null != (t = e.description) ? t : n.description;
            return {
              _internal: null == i ? void 0 : i._internal,
              metadata: Object.assign(
                Object.assign({}, null == i ? void 0 : i.metadata),
                {
                  param: Object.assign(
                    { description: s },
                    null == (r = null == i ? void 0 : i.metadata)
                      ? void 0
                      : r.param,
                  ),
                },
              ),
            };
          }
          static buildSchemaMetadata(e) {
            return m(
              (function (e, t) {
                let r = {};
                return (
                  Object.entries(e).forEach(([e, n]) => {
                    t.some((t) => t === e) || (r[e] = n);
                  }),
                  r
                );
              })(e, ["param"]),
              h,
            );
          }
          static buildParameterMetadata(e) {
            return m(e, h);
          }
          static applySchemaMetadata(e, t) {
            return m(
              Object.assign(Object.assign({}, e), this.buildSchemaMetadata(t)),
              h,
            );
          }
          static getRefId(e) {
            var t;
            return null == (t = this.getInternalMetadata(e)) ? void 0 : t.refId;
          }
          static unwrapChained(e) {
            return this.unwrapUntil(e);
          }
          static getDefaultValue(e) {
            let t = this.unwrapUntil(e, "ZodDefault");
            return null == t ? void 0 : t._def.defaultValue();
          }
          static unwrapUntil(e, t) {
            return t && l(e, t)
              ? e
              : l(e, "ZodOptional") || l(e, "ZodNullable") || l(e, "ZodBranded")
                ? this.unwrapUntil(e.unwrap(), t)
                : l(e, "ZodDefault") || l(e, "ZodReadonly")
                  ? this.unwrapUntil(e._def.innerType, t)
                  : l(e, "ZodEffects")
                    ? this.unwrapUntil(e._def.schema, t)
                    : l(e, "ZodPipeline")
                      ? this.unwrapUntil(e._def.in, t)
                      : t
                        ? void 0
                        : e;
          }
          static isOptionalSchema(e) {
            return e.isOptional();
          }
        }
        class P {
          transform(e, t, r) {
            var n, i;
            let s = e._def.type;
            return Object.assign(Object.assign({}, t("array")), {
              items: r(s),
              minItems: null == (n = e._def.minLength) ? void 0 : n.value,
              maxItems: null == (i = e._def.maxLength) ? void 0 : i.value,
            });
          }
        }
        class S {
          transform(e) {
            return Object.assign(Object.assign({}, e("string")), {
              pattern: "^d+$",
            });
          }
        }
        class I {
          transform(e, t, r, n, i) {
            let s = [...e.options.values()],
              a = s.map(n);
            return t
              ? { oneOf: r(a, t) }
              : {
                  oneOf: a,
                  discriminator: this.mapDiscriminator(s, e.discriminator, i),
                };
          }
          mapDiscriminator(e, t, r) {
            if (e.some((e) => void 0 === R.getRefId(e))) return;
            let n = {};
            return (
              e.forEach((e) => {
                var i;
                let s = R.getRefId(e),
                  a = null == (i = e.shape) ? void 0 : i[t];
                if (l(a, "ZodEnum") || l(a, "ZodNativeEnum"))
                  return void Object.values(a.enum)
                    .filter(b)
                    .forEach((e) => {
                      n[e] = r(s);
                    });
                let o = null == a ? void 0 : a._def.value;
                if ("string" != typeof o)
                  throw Error(
                    `Discriminator ${t} could not be found in one of the values of a discriminated union`,
                  );
                n[o] = r(s);
              }),
              { propertyName: t, mapping: n }
            );
          }
        }
        class E {
          transform(e, t) {
            return Object.assign(Object.assign({}, t("string")), {
              enum: e._def.values,
            });
          }
        }
        class x {
          transform(e, t, r, n) {
            let i = { allOf: this.flattenIntersectionTypes(e).map(n) };
            return t ? { anyOf: r([i], t) } : i;
          }
          flattenIntersectionTypes(e) {
            return l(e, "ZodIntersection")
              ? [
                  ...this.flattenIntersectionTypes(e._def.left),
                  ...this.flattenIntersectionTypes(e._def.right),
                ]
              : [e];
          }
        }
        class C {
          transform(e, t) {
            return Object.assign(Object.assign({}, t(typeof e._def.value)), {
              enum: [e._def.value],
            });
          }
        }
        class T {
          transform(e, t) {
            let { type: r, values: n } = (function (e) {
              let t = Object.keys(e)
                  .filter((t) => "number" != typeof e[e[t]])
                  .map((t) => e[t]),
                r = t.filter((e) => "number" == typeof e).length,
                n = 0 === r ? "string" : r === t.length ? "numeric" : "mixed";
              return { values: t, type: n };
            })(e._def.values);
            if ("mixed" === r)
              throw new v(
                "Enum has mixed string and number values, please specify the OpenAPI type manually",
              );
            return Object.assign(
              Object.assign({}, t("numeric" === r ? "integer" : "string")),
              { enum: n },
            );
          }
        }
        class A {
          transform(e, t, r) {
            return Object.assign(
              Object.assign({}, t(e.isInt ? "integer" : "number")),
              r(e._def.checks),
            );
          }
        }
        class k {
          transform(e, t, r, n) {
            var i;
            let s =
                null == (i = R.getInternalMetadata(e))
                  ? void 0
                  : i.extendedFrom,
              a = this.requiredKeysOf(e),
              o = f(e._def.shape(), n);
            if (!s)
              return Object.assign(
                Object.assign(
                  Object.assign(Object.assign({}, r("object")), {
                    properties: o,
                    default: t,
                  }),
                  a.length > 0 ? { required: a } : {},
                ),
                this.generateAdditionalProperties(e, n),
              );
            let u = s.schema;
            n(u);
            let l = this.requiredKeysOf(u),
              c = f(null == u ? void 0 : u._def.shape(), n),
              p = Object.fromEntries(
                Object.entries(o).filter(([e, t]) => !d(c[e], t)),
              ),
              h = a.filter((e) => !l.includes(e)),
              m = Object.assign(
                Object.assign(
                  Object.assign(Object.assign({}, r("object")), {
                    default: t,
                    properties: p,
                  }),
                  h.length > 0 ? { required: h } : {},
                ),
                this.generateAdditionalProperties(e, n),
              );
            return { allOf: [{ $ref: `#/components/schemas/${s.refId}` }, m] };
          }
          generateAdditionalProperties(e, t) {
            let r = e._def.unknownKeys,
              n = e._def.catchall;
            return l(n, "ZodNever")
              ? "strict" === r
                ? { additionalProperties: !1 }
                : {}
              : { additionalProperties: t(n) };
          }
          requiredKeysOf(e) {
            return Object.entries(e._def.shape())
              .filter(([e, t]) => !R.isOptionalSchema(t))
              .map(([e, t]) => e);
          }
        }
        class N {
          transform(e, t, r) {
            let n = e._def.valueType,
              i = e._def.keyType,
              s = r(n);
            if (l(i, "ZodEnum") || l(i, "ZodNativeEnum")) {
              let e = Object.values(i.enum)
                .filter(b)
                .reduce(
                  (e, t) => Object.assign(Object.assign({}, e), { [t]: s }),
                  {},
                );
              return Object.assign(Object.assign({}, t("object")), {
                properties: e,
              });
            }
            return Object.assign(Object.assign({}, t("object")), {
              additionalProperties: s,
            });
          }
        }
        class q {
          transform(e, t) {
            var r, n, i;
            let s = this.getZodStringCheck(e, "regex"),
              a =
                null == (r = this.getZodStringCheck(e, "length"))
                  ? void 0
                  : r.value,
              o =
                Number.isFinite(e.minLength) && null != (n = e.minLength)
                  ? n
                  : void 0,
              u =
                Number.isFinite(e.maxLength) && null != (i = e.maxLength)
                  ? i
                  : void 0;
            return Object.assign(Object.assign({}, t("string")), {
              minLength: null != a ? a : o,
              maxLength: null != a ? a : u,
              format: this.mapStringFormat(e),
              pattern: null == s ? void 0 : s.regex.source,
            });
          }
          mapStringFormat(e) {
            return e.isUUID
              ? "uuid"
              : e.isEmail
                ? "email"
                : e.isURL
                  ? "uri"
                  : e.isDate
                    ? "date"
                    : e.isDatetime
                      ? "date-time"
                      : e.isCUID
                        ? "cuid"
                        : e.isCUID2
                          ? "cuid2"
                          : e.isULID
                            ? "ulid"
                            : e.isIP
                              ? "ip"
                              : e.isEmoji
                                ? "emoji"
                                : void 0;
          }
          getZodStringCheck(e, t) {
            return e._def.checks.find((e) => e.kind === t);
          }
        }
        class M {
          constructor(e) {
            this.versionSpecifics = e;
          }
          transform(e, t, r) {
            let { items: n } = e._def,
              i = n.map(r);
            return Object.assign(
              Object.assign({}, t("array")),
              this.versionSpecifics.mapTupleItems(i),
            );
          }
        }
        class D {
          transform(e, t, r) {
            return {
              anyOf: t(
                this.flattenUnionTypes(e).map((e) => r(this.unwrapNullable(e))),
              ),
            };
          }
          flattenUnionTypes(e) {
            return l(e, "ZodUnion")
              ? e._def.options.flatMap((e) => this.flattenUnionTypes(e))
              : [e];
          }
          unwrapNullable(e) {
            return l(e, "ZodNullable") ? this.unwrapNullable(e.unwrap()) : e;
          }
        }
        class U {
          constructor(e) {
            (this.versionSpecifics = e),
              (this.objectTransformer = new k()),
              (this.stringTransformer = new q()),
              (this.numberTransformer = new A()),
              (this.bigIntTransformer = new S()),
              (this.literalTransformer = new C()),
              (this.enumTransformer = new E()),
              (this.nativeEnumTransformer = new T()),
              (this.arrayTransformer = new P()),
              (this.unionTransformer = new D()),
              (this.discriminatedUnionTransformer = new I()),
              (this.intersectionTransformer = new x()),
              (this.recordTransformer = new N()),
              (this.tupleTransformer = new M(e));
          }
          transform(e, t, r, n, i) {
            return l(e, "ZodNull")
              ? this.versionSpecifics.nullType
              : l(e, "ZodUnknown") || l(e, "ZodAny")
                ? this.versionSpecifics.mapNullableType(void 0, t)
                : l(e, "ZodObject")
                  ? this.objectTransformer.transform(
                      e,
                      i,
                      (e) => this.versionSpecifics.mapNullableType(e, t),
                      r,
                    )
                  : Object.assign(
                      Object.assign(
                        {},
                        this.transformSchemaWithoutDefault(e, t, r, n),
                      ),
                      { default: i },
                    );
          }
          transformSchemaWithoutDefault(e, t, r, n) {
            if (l(e, "ZodUnknown") || l(e, "ZodAny"))
              return this.versionSpecifics.mapNullableType(void 0, t);
            if (l(e, "ZodString"))
              return this.stringTransformer.transform(e, (e) =>
                this.versionSpecifics.mapNullableType(e, t),
              );
            if (l(e, "ZodNumber"))
              return this.numberTransformer.transform(
                e,
                (e) => this.versionSpecifics.mapNullableType(e, t),
                (e) => this.versionSpecifics.getNumberChecks(e),
              );
            if (l(e, "ZodBigInt"))
              return this.bigIntTransformer.transform((e) =>
                this.versionSpecifics.mapNullableType(e, t),
              );
            if (l(e, "ZodBoolean"))
              return this.versionSpecifics.mapNullableType("boolean", t);
            if (l(e, "ZodLiteral"))
              return this.literalTransformer.transform(e, (e) =>
                this.versionSpecifics.mapNullableType(e, t),
              );
            if (l(e, "ZodEnum"))
              return this.enumTransformer.transform(e, (e) =>
                this.versionSpecifics.mapNullableType(e, t),
              );
            if (l(e, "ZodNativeEnum"))
              return this.nativeEnumTransformer.transform(e, (e) =>
                this.versionSpecifics.mapNullableType(e, t),
              );
            if (l(e, "ZodArray"))
              return this.arrayTransformer.transform(
                e,
                (e) => this.versionSpecifics.mapNullableType(e, t),
                r,
              );
            if (l(e, "ZodTuple"))
              return this.tupleTransformer.transform(
                e,
                (e) => this.versionSpecifics.mapNullableType(e, t),
                r,
              );
            if (l(e, "ZodUnion"))
              return this.unionTransformer.transform(
                e,
                (e) => this.versionSpecifics.mapNullableOfArray(e, t),
                r,
              );
            if (l(e, "ZodDiscriminatedUnion"))
              return this.discriminatedUnionTransformer.transform(
                e,
                t,
                (e) => this.versionSpecifics.mapNullableOfArray(e, t),
                r,
                n,
              );
            if (l(e, "ZodIntersection"))
              return this.intersectionTransformer.transform(
                e,
                t,
                (e) => this.versionSpecifics.mapNullableOfArray(e, t),
                r,
              );
            if (l(e, "ZodRecord"))
              return this.recordTransformer.transform(
                e,
                (e) => this.versionSpecifics.mapNullableType(e, t),
                r,
              );
            if (l(e, "ZodDate"))
              return this.versionSpecifics.mapNullableType("string", t);
            let i = R.getRefId(e);
            throw new j({ currentSchema: e._def, schemaName: i });
          }
        }
        class Z {
          constructor(e, t) {
            (this.definitions = e),
              (this.versionSpecifics = t),
              (this.schemaRefs = {}),
              (this.paramRefs = {}),
              (this.pathRefs = {}),
              (this.rawComponents = []),
              (this.openApiTransformer = new U(t)),
              this.sortDefinitions();
          }
          generateDocumentData() {
            return (
              this.definitions.forEach((e) => this.generateSingle(e)),
              { components: this.buildComponents(), paths: this.pathRefs }
            );
          }
          generateComponents() {
            return (
              this.definitions.forEach((e) => this.generateSingle(e)),
              { components: this.buildComponents() }
            );
          }
          buildComponents() {
            var e, t;
            let r = {};
            return (
              this.rawComponents.forEach(
                ({ componentType: e, name: t, component: n }) => {
                  var i;
                  null != r[e] || (r[e] = {}), (r[e][t] = n);
                },
              ),
              Object.assign(Object.assign({}, r), {
                schemas: Object.assign(
                  Object.assign({}, null != (e = r.schemas) ? e : {}),
                  this.schemaRefs,
                ),
                parameters: Object.assign(
                  Object.assign({}, null != (t = r.parameters) ? t : {}),
                  this.paramRefs,
                ),
              })
            );
          }
          sortDefinitions() {
            let e = ["schema", "parameter", "component", "route"];
            this.definitions.sort((t, r) =>
              "type" in t
                ? "type" in r
                  ? e.findIndex((e) => e === t.type) -
                    e.findIndex((e) => e === r.type)
                  : 1
                : "type" in r
                  ? -1
                  : 0,
            );
          }
          generateSingle(e) {
            if (!("type" in e)) return void this.generateSchemaWithRef(e);
            switch (e.type) {
              case "parameter":
                this.generateParameterDefinition(e.schema);
                return;
              case "schema":
                this.generateSchemaWithRef(e.schema);
                return;
              case "route":
                this.generateSingleRoute(e.route);
                return;
              case "component":
                this.rawComponents.push(e);
                return;
            }
          }
          generateParameterDefinition(e) {
            let t = R.getRefId(e),
              r = this.generateParameter(e);
            return t && (this.paramRefs[t] = r), r;
          }
          getParameterRef(e, t) {
            var r, n, i, s, a;
            let o =
                null == (r = null == e ? void 0 : e.metadata)
                  ? void 0
                  : r.param,
              u = (
                null == (n = null == e ? void 0 : e._internal)
                  ? void 0
                  : n.refId
              )
                ? this.paramRefs[null == (i = e._internal) ? void 0 : i.refId]
                : void 0;
            if (
              (null == (s = null == e ? void 0 : e._internal)
                ? void 0
                : s.refId) &&
              u
            ) {
              if (
                (o && u.in !== o.in) ||
                ((null == t ? void 0 : t.in) && u.in !== t.in)
              )
                throw new O(`Conflicting location for parameter ${u.name}`, {
                  key: "in",
                  values: g([
                    u.in,
                    null == t ? void 0 : t.in,
                    null == o ? void 0 : o.in,
                  ]),
                });
              if (
                (o && u.name !== o.name) ||
                ((null == t ? void 0 : t.name) &&
                  u.name !== (null == t ? void 0 : t.name))
              )
                throw new O("Conflicting names for parameter", {
                  key: "name",
                  values: g([
                    u.name,
                    null == t ? void 0 : t.name,
                    null == o ? void 0 : o.name,
                  ]),
                });
              return {
                $ref: `#/components/parameters/${null == (a = e._internal) ? void 0 : a.refId}`,
              };
            }
          }
          generateInlineParameters(e, t) {
            var r;
            let n = R.getMetadata(e),
              i =
                null == (r = null == n ? void 0 : n.metadata)
                  ? void 0
                  : r.param,
              s = this.getParameterRef(n, { in: t });
            if (s) return [s];
            if (l(e, "ZodObject"))
              return Object.entries(e._def.shape()).map(([e, r]) => {
                var n, i;
                let s = R.getMetadata(r),
                  a = this.getParameterRef(s, { in: t, name: e });
                if (a) return a;
                let o =
                  null == (n = null == s ? void 0 : s.metadata)
                    ? void 0
                    : n.param;
                if ((null == o ? void 0 : o.name) && o.name !== e)
                  throw new O("Conflicting names for parameter", {
                    key: "name",
                    values: [e, o.name],
                  });
                if ((null == o ? void 0 : o.in) && o.in !== t)
                  throw new O(
                    `Conflicting location for parameter ${null != (i = o.name) ? i : e}`,
                    { key: "in", values: [t, o.in] },
                  );
                return this.generateParameter(
                  r.openapi({ param: { name: e, in: t } }),
                );
              });
            if ((null == i ? void 0 : i.in) && i.in !== t)
              throw new O(`Conflicting location for parameter ${i.name}`, {
                key: "in",
                values: [t, i.in],
              });
            return [this.generateParameter(e.openapi({ param: { in: t } }))];
          }
          generateSimpleParameter(e) {
            var t;
            let r = R.getParamMetadata(e),
              n =
                null == (t = null == r ? void 0 : r.metadata)
                  ? void 0
                  : t.param,
              i = !R.isOptionalSchema(e) && !e.isNullable();
            return Object.assign(
              { schema: this.generateSchemaWithRef(e), required: i },
              n ? R.buildParameterMetadata(n) : {},
            );
          }
          generateParameter(e) {
            var t;
            let r = R.getMetadata(e),
              n =
                null == (t = null == r ? void 0 : r.metadata)
                  ? void 0
                  : t.param,
              i = null == n ? void 0 : n.name,
              s = null == n ? void 0 : n.in;
            if (!i) throw new _({ missingField: "name" });
            if (!s) throw new _({ missingField: "in", paramName: i });
            return Object.assign(
              Object.assign({}, this.generateSimpleParameter(e)),
              { in: s, name: i },
            );
          }
          generateSchemaWithMetadata(e) {
            var t;
            let r = R.unwrapChained(e),
              n = R.getMetadata(e),
              i = R.getDefaultValue(e),
              s = (
                null == (t = null == n ? void 0 : n.metadata) ? void 0 : t.type
              )
                ? { type: null == n ? void 0 : n.metadata.type }
                : this.toOpenAPISchema(r, e.isNullable(), i);
            return (null == n ? void 0 : n.metadata)
              ? R.applySchemaMetadata(s, n.metadata)
              : m(s, h);
          }
          constructReferencedOpenAPISchema(e) {
            var t;
            let r = R.getMetadata(e),
              n = R.unwrapChained(e),
              i = R.getDefaultValue(e),
              s = e.isNullable();
            return (
              null == (t = null == r ? void 0 : r.metadata) ? void 0 : t.type
            )
              ? this.versionSpecifics.mapNullableType(r.metadata.type, s)
              : this.toOpenAPISchema(n, s, i);
          }
          generateSimpleSchema(e) {
            var t;
            let r = R.getMetadata(e),
              n = R.getRefId(e);
            if (!n || !this.schemaRefs[n])
              return this.generateSchemaWithMetadata(e);
            let i = this.schemaRefs[n],
              s = { $ref: this.generateSchemaRef(n) },
              a = m(
                R.buildSchemaMetadata(
                  null != (t = null == r ? void 0 : r.metadata) ? t : {},
                ),
                (e, t) => void 0 === e || d(e, i[t]),
              );
            if (a.type) return { allOf: [s, a] };
            let o = m(
                this.constructReferencedOpenAPISchema(e),
                (e, t) => void 0 === e || d(e, i[t]),
              ),
              u = R.applySchemaMetadata(o, a);
            return Object.keys(u).length > 0 ? { allOf: [s, u] } : s;
          }
          generateSchemaWithRef(e) {
            let t = R.getRefId(e),
              r = this.generateSimpleSchema(e);
            return t && void 0 === this.schemaRefs[t]
              ? ((this.schemaRefs[t] = r), { $ref: this.generateSchemaRef(t) })
              : r;
          }
          generateSchemaRef(e) {
            return `#/components/schemas/${e}`;
          }
          getRequestBody(e) {
            if (!e) return;
            let { content: t } = e,
              r = u(e, ["content"]),
              n = this.getBodyContent(t);
            return Object.assign(Object.assign({}, r), { content: n });
          }
          getParameters(e) {
            if (!e) return [];
            let { headers: t } = e,
              r = this.cleanParameter(e.query),
              n = this.cleanParameter(e.params),
              i = this.cleanParameter(e.cookies),
              s = w(
                () => (r ? this.generateInlineParameters(r, "query") : []),
                { location: "query" },
              ),
              a = w(() => (n ? this.generateInlineParameters(n, "path") : []), {
                location: "path",
              }),
              o = w(
                () => (i ? this.generateInlineParameters(i, "cookie") : []),
                { location: "cookie" },
              );
            return [
              ...a,
              ...s,
              ...w(
                () => {
                  if (Array.isArray(t))
                    return t.flatMap((e) =>
                      this.generateInlineParameters(e, "header"),
                    );
                  let e = this.cleanParameter(t);
                  return e ? this.generateInlineParameters(e, "header") : [];
                },
                { location: "header" },
              ),
              ...o,
            ];
          }
          cleanParameter(e) {
            if (e)
              return l(e, "ZodEffects")
                ? this.cleanParameter(e._def.schema)
                : e;
          }
          generatePath(e) {
            let { method: t, path: r, request: n, responses: i } = e,
              s = u(e, ["method", "path", "request", "responses"]),
              a = f(i, (e) => this.getResponse(e)),
              o = w(() => this.getParameters(n), { route: `${t} ${r}` }),
              l = this.getRequestBody(null == n ? void 0 : n.body);
            return {
              [t]: Object.assign(
                Object.assign(
                  Object.assign(
                    Object.assign({}, s),
                    o.length > 0
                      ? { parameters: [...(s.parameters || []), ...o] }
                      : {},
                  ),
                  l ? { requestBody: l } : {},
                ),
                { responses: a },
              ),
            };
          }
          generateSingleRoute(e) {
            let t = this.generatePath(e);
            return (
              (this.pathRefs[e.path] = Object.assign(
                Object.assign({}, this.pathRefs[e.path]),
                t,
              )),
              t
            );
          }
          getResponse(e) {
            if (this.isReferenceObject(e)) return e;
            let { content: t, headers: r } = e,
              n = u(e, ["content", "headers"]),
              i = t ? { content: this.getBodyContent(t) } : {};
            if (!r) return Object.assign(Object.assign({}, n), i);
            let s = l(r, "ZodObject") ? this.getResponseHeaders(r) : r;
            return Object.assign(
              Object.assign(Object.assign({}, n), { headers: s }),
              i,
            );
          }
          isReferenceObject(e) {
            return "$ref" in e;
          }
          getResponseHeaders(e) {
            return f(e._def.shape(), (e) => this.generateSimpleParameter(e));
          }
          getBodyContent(e) {
            return f(e, (e) => {
              if (!e || !("_def" in e.schema)) return e;
              let { schema: t } = e,
                r = u(e, ["schema"]);
              return Object.assign(
                { schema: this.generateSchemaWithRef(t) },
                r,
              );
            });
          }
          toOpenAPISchema(e, t, r) {
            return this.openApiTransformer.transform(
              e,
              t,
              (e) => this.generateSchemaWithRef(e),
              (e) => this.generateSchemaRef(e),
              r,
            );
          }
        }
        class z {
          get nullType() {
            return { nullable: !0 };
          }
          mapNullableOfArray(e, t) {
            return t ? [...e, this.nullType] : e;
          }
          mapNullableType(e, t) {
            return Object.assign(
              Object.assign({}, e ? { type: e } : void 0),
              t ? this.nullType : void 0,
            );
          }
          mapTupleItems(e) {
            let t = (function (e) {
              let t = new p();
              return e.forEach((e) => t.put(e)), [...t.values()];
            })(e);
            return {
              items: 1 === t.length ? t[0] : { anyOf: t },
              minItems: e.length,
              maxItems: e.length,
            };
          }
          getNumberChecks(e) {
            return Object.assign(
              {},
              ...e.map((e) => {
                switch (e.kind) {
                  case "min":
                    return e.inclusive
                      ? { minimum: Number(e.value) }
                      : { minimum: Number(e.value), exclusiveMinimum: !0 };
                  case "max":
                    return e.inclusive
                      ? { maximum: Number(e.value) }
                      : { maximum: Number(e.value), exclusiveMaximum: !0 };
                  default:
                    return {};
                }
              }),
            );
          }
        }
        class F {
          constructor(e) {
            let t = new z();
            this.generator = new Z(e, t);
          }
          generateDocument(e) {
            let t = this.generator.generateDocumentData();
            return Object.assign(Object.assign({}, e), t);
          }
          generateComponents() {
            return this.generator.generateComponents();
          }
        }
        class $ {
          get nullType() {
            return { type: "null" };
          }
          mapNullableOfArray(e, t) {
            return t ? [...e, this.nullType] : e;
          }
          mapNullableType(e, t) {
            return e
              ? t
                ? { type: Array.isArray(e) ? [...e, "null"] : [e, "null"] }
                : { type: e }
              : {};
          }
          mapTupleItems(e) {
            return { prefixItems: e };
          }
          getNumberChecks(e) {
            return Object.assign(
              {},
              ...e.map((e) => {
                switch (e.kind) {
                  case "min":
                    return e.inclusive
                      ? { minimum: Number(e.value) }
                      : { exclusiveMinimum: Number(e.value) };
                  case "max":
                    return e.inclusive
                      ? { maximum: Number(e.value) }
                      : { exclusiveMaximum: Number(e.value) };
                  default:
                    return {};
                }
              }),
            );
          }
        }
        function W(e) {
          return "type" in e && "webhook" === e.type;
        }
        class J {
          constructor(e) {
            (this.definitions = e), (this.webhookRefs = {});
            let t = new $();
            this.generator = new Z(this.definitions, t);
          }
          generateDocument(e) {
            let t = this.generator.generateDocumentData();
            return (
              this.definitions
                .filter(W)
                .forEach((e) => this.generateSingleWebhook(e.webhook)),
              Object.assign(Object.assign(Object.assign({}, e), t), {
                webhooks: this.webhookRefs,
              })
            );
          }
          generateComponents() {
            return this.generator.generateComponents();
          }
          generateSingleWebhook(e) {
            let t = this.generator.generatePath(e);
            return (
              (this.webhookRefs[e.path] = Object.assign(
                Object.assign({}, this.webhookRefs[e.path]),
                t,
              )),
              t
            );
          }
        }
        var L = r(24277),
          H = (e, t, r, n) =>
            (0, L.N)(e, async (i, s) => {
              let a = i;
              if (
                ("header" === e && "_def" in t) ||
                ("header" === e && "_zod" in t)
              ) {
                let e = Object.fromEntries(
                  Object.keys(t.shape).map((e) => [e.toLowerCase(), e]),
                );
                a = Object.fromEntries(
                  Object.entries(i).map(([t, r]) => [e[t] || t, r]),
                );
              }
              let o =
                n && n.validationFunction
                  ? await n.validationFunction(t, a)
                  : await t.safeParseAsync(a);
              if (r) {
                let t = await r({ data: a, ...o, target: e }, s);
                if (t) {
                  if (t instanceof Response) return t;
                  if ("response" in t) return t.response;
                }
              }
              return o.success ? o.data : s.json(o, 400);
            }),
          X = r(43774),
          B = r(79533),
          Y = r(14567),
          V = class e extends X.$ {
            openAPIRegistry;
            defaultHook;
            constructor(e) {
              super(e),
                (this.openAPIRegistry = new y()),
                (this.defaultHook = e?.defaultHook);
            }
            openapi = (
              { middleware: e, hide: t, ...r },
              n,
              i = this.defaultHook,
            ) => {
              t || this.openAPIRegistry.registerPath(r);
              let s = [];
              if (r.request?.query) {
                let e = H("query", r.request.query, i);
                s.push(e);
              }
              if (r.request?.params) {
                let e = H("param", r.request.params, i);
                s.push(e);
              }
              if (r.request?.headers) {
                let e = H("header", r.request.headers, i);
                s.push(e);
              }
              if (r.request?.cookies) {
                let e = H("cookie", r.request.cookies, i);
                s.push(e);
              }
              let a = r.request?.body?.content;
              if (a)
                for (let e of Object.keys(a)) {
                  if (!a[e]) continue;
                  let t = a[e].schema;
                  if (t instanceof Y.aR) {
                    if (Q(e)) {
                      let e = H("json", t, i);
                      if (r.request?.body?.required) s.push(e);
                      else {
                        let t = async (t, r) => {
                          if (
                            t.req.header("content-type") &&
                            Q(t.req.header("content-type"))
                          )
                            return await e(t, r);
                          t.req.addValidatedData("json", {}), await r();
                        };
                        s.push(t);
                      }
                    }
                    if (ee(e)) {
                      let e = H("form", t, i);
                      if (r.request?.body?.required) s.push(e);
                      else {
                        let t = async (t, r) => {
                          if (
                            t.req.header("content-type") &&
                            ee(t.req.header("content-type"))
                          )
                            return await e(t, r);
                          t.req.addValidatedData("form", {}), await r();
                        };
                        s.push(t);
                      }
                    }
                  }
                }
              let o = e ? (Array.isArray(e) ? e : [e]) : [];
              return (
                this.on(
                  [r.method],
                  r.path.replaceAll(/\/{(.+?)}/g, "/:$1"),
                  ...o,
                  ...s,
                  n,
                ),
                this
              );
            };
            getOpenAPIDocument = (e) => {
              let t = new F(this.openAPIRegistry.definitions).generateDocument(
                e,
              );
              return this._basePath ? G(t, this._basePath) : t;
            };
            getOpenAPI31Document = (e) => {
              let t = new J(this.openAPIRegistry.definitions).generateDocument(
                e,
              );
              return this._basePath ? G(t, this._basePath) : t;
            };
            doc = (e, t) =>
              this.get(e, (e) => {
                let r = "function" == typeof t ? t(e) : t;
                try {
                  let t = this.getOpenAPIDocument(r);
                  return e.json(t);
                } catch (t) {
                  return e.json(t, 500);
                }
              });
            doc31 = (e, t) =>
              this.get(e, (e) => {
                let r = "function" == typeof t ? t(e) : t;
                try {
                  let t = this.getOpenAPI31Document(r);
                  return e.json(t);
                } catch (t) {
                  return e.json(t, 500);
                }
              });
            route(t, r) {
              let n = t.replaceAll(/:([^\/]+)/g, "{$1}");
              return (
                super.route(t, r),
                r instanceof e &&
                  r.openAPIRegistry.definitions.forEach((e) => {
                    switch (e.type) {
                      case "component":
                        return this.openAPIRegistry.registerComponent(
                          e.componentType,
                          e.name,
                          e.component,
                        );
                      case "route":
                        return this.openAPIRegistry.registerPath({
                          ...e.route,
                          path: (0, B.uc)(
                            n,
                            r._basePath.replaceAll(/:([^\/]+)/g, "{$1}"),
                            e.route.path,
                          ),
                        });
                      case "webhook":
                        return this.openAPIRegistry.registerWebhook({
                          ...e.webhook,
                          path: (0, B.uc)(
                            n,
                            r._basePath.replaceAll(/:([^\/]+)/g, "{$1}"),
                            e.webhook.path,
                          ),
                        });
                      case "schema":
                        return this.openAPIRegistry.register(
                          e.schema._def.openapi._internal.refId,
                          e.schema,
                        );
                      case "parameter":
                        return this.openAPIRegistry.registerParameter(
                          e.schema._def.openapi._internal.refId,
                          e.schema,
                        );
                      default:
                        throw Error(`Unknown registry type: ${e}`);
                    }
                  }),
                this
              );
            }
            basePath(t) {
              return new e({
                ...super.basePath(t),
                defaultHook: this.defaultHook,
              });
            }
          },
          K = (e) =>
            Object.defineProperty(
              {
                ...e,
                getRoutingPath: () => e.path.replaceAll(/\/{(.+?)}/g, "/:$1"),
              },
              "getRoutingPath",
              { enumerable: !1 },
            );
        function G(e, t) {
          let r = {};
          return (
            Object.keys(e.paths).forEach((n) => {
              r[(0, B.uc)(t.replaceAll(/:([^\/]+)/g, "{$1}"), n)] = e.paths[n];
            }),
            { ...e, paths: r }
          );
        }
        function Q(e) {
          return /^application\/([a-z-\.]+\+)?json/.test(e);
        }
        function ee(e) {
          return (
            e.startsWith("multipart/form-data") ||
            e.startsWith("application/x-www-form-urlencoded")
          );
        }
        !(function (e) {
          if (void 0 !== e.ZodType.prototype.openapi) return;
          (e.ZodType.prototype.openapi = function (e, t) {
            var r, n, i, s, a, o;
            let c = "string" == typeof e ? t : e,
              d = null != c ? c : {},
              { param: p } = d,
              h = u(d, ["param"]),
              f = Object.assign(
                Object.assign(
                  {},
                  null == (r = this._def.openapi) ? void 0 : r._internal,
                ),
                "string" == typeof e ? { refId: e } : void 0,
              ),
              m = Object.assign(
                Object.assign(
                  Object.assign(
                    {},
                    null == (n = this._def.openapi) ? void 0 : n.metadata,
                  ),
                  h,
                ),
                (null ==
                (s = null == (i = this._def.openapi) ? void 0 : i.metadata)
                  ? void 0
                  : s.param) || p
                  ? {
                      param: Object.assign(
                        Object.assign(
                          {},
                          null ==
                            (o =
                              null == (a = this._def.openapi)
                                ? void 0
                                : a.metadata)
                            ? void 0
                            : o.param,
                        ),
                        p,
                      ),
                    }
                  : void 0,
              ),
              g = new this.constructor(
                Object.assign(Object.assign({}, this._def), {
                  openapi: Object.assign(
                    Object.assign(
                      {},
                      Object.keys(f).length > 0 ? { _internal: f } : void 0,
                    ),
                    Object.keys(m).length > 0 ? { metadata: m } : void 0,
                  ),
                }),
              );
            if (l(this, "ZodObject")) {
              let e = this.extend;
              g.extend = function (...t) {
                var r, n, i, s, a, o, u;
                let l = e.apply(this, t);
                return (
                  (l._def.openapi = {
                    _internal: {
                      extendedFrom: (
                        null ==
                        (n =
                          null == (r = this._def.openapi)
                            ? void 0
                            : r._internal)
                          ? void 0
                          : n.refId
                      )
                        ? {
                            refId:
                              null ==
                              (s =
                                null == (i = this._def.openapi)
                                  ? void 0
                                  : i._internal)
                                ? void 0
                                : s.refId,
                            schema: this,
                          }
                        : null ==
                            (o =
                              null == (a = this._def.openapi)
                                ? void 0
                                : a._internal)
                          ? void 0
                          : o.extendedFrom,
                    },
                    metadata:
                      null == (u = l._def.openapi) ? void 0 : u.metadata,
                  }),
                  l
                );
              };
            }
            return g;
          }),
            c(e, "optional"),
            c(e, "nullable"),
            c(e, "default"),
            c(e, "transform"),
            c(e, "refine");
          let t = e.ZodObject.prototype.deepPartial;
          e.ZodObject.prototype.deepPartial = function () {
            let e = this._def.shape(),
              r = t.apply(this);
            return (
              Object.entries(r._def.shape()).forEach(([t, r]) => {
                var n, i;
                r._def.openapi =
                  null == (i = null == (n = e[t]) ? void 0 : n._def)
                    ? void 0
                    : i.openapi;
              }),
              (r._def.openapi = void 0),
              r
            );
          };
          let r = e.ZodObject.prototype.pick;
          e.ZodObject.prototype.pick = function (...e) {
            let t = r.apply(this, e);
            return (t._def.openapi = void 0), t;
          };
          let n = e.ZodObject.prototype.omit;
          e.ZodObject.prototype.omit = function (...e) {
            let t = n.apply(this, e);
            return (t._def.openapi = void 0), t;
          };
        })(Y.z);
        var et = r(68119),
          er = r(62745);
        r(16789);
        var en = r(84001),
          ei = r(60442);
        let es = Y.z.object({
            currentStep: Y.z.enum([
              "welcome",
              "profile-setup",
              "feature-tour",
              "first-task",
              "resources",
              "completed",
            ]),
            progress: Y.z.number().min(0).max(100),
            isCompleted: Y.z.boolean(),
          }),
          ea = Y.z.object({
            actionKey: Y.z.string().min(1),
            isCompleted: Y.z.boolean(),
          }),
          eo = async (e, t) => {
            let { user: r } = await (0, en.WV)();
            if (!r) return e.json({ error: "Unauthorized" }, 401);
            e.set("user", r), await t();
          },
          eu = new V();
        eu.use("*", eo),
          eu.openapi(
            K({
              method: "get",
              path: "/",
              tags: ["Onboarding"],
              summary: "Get user onboarding state",
              description:
                "Retrieves the current onboarding state for the authenticated user",
              responses: {
                200: {
                  description: "User onboarding state",
                  content: { "application/json": { schema: es } },
                },
                401: { description: "Unauthorized" },
              },
            }),
            async (e) => {
              let t = e.get("user"),
                r = (0, et.createServerClient)(
                  "http://localhost:54321",
                  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0",
                  {
                    cookies: {
                      get: (t) => (0, er.Ri)(e, t),
                      set: (t, r, n) => {
                        (0, er.TV)(e, t, r, n);
                      },
                      remove: (t, r) => {
                        (0, er.Yj)(e, t, r);
                      },
                    },
                  },
                ),
                { data: n, error: i } = await r
                  .from("user_onboarding")
                  .select("*")
                  .eq("user_id", t.id)
                  .single();
              if (i || !n) {
                let n = {
                  currentStep: "welcome",
                  progress: 0,
                  isCompleted: !1,
                };
                return (
                  await r
                    .from("user_onboarding")
                    .insert({
                      user_id: t.id,
                      current_step: n.currentStep,
                      progress: n.progress,
                      is_completed: n.isCompleted,
                    }),
                  e.json(n)
                );
              }
              return e.json({
                currentStep: n.current_step,
                progress: n.progress,
                isCompleted: n.is_completed,
              });
            },
          ),
          eu.openapi(
            K({
              method: "patch",
              path: "/",
              tags: ["Onboarding"],
              summary: "Update onboarding state",
              description:
                "Updates the onboarding state for the authenticated user",
              request: {
                body: {
                  content: { "application/json": { schema: es.partial() } },
                },
              },
              responses: {
                200: {
                  description: "Onboarding state updated",
                  content: { "application/json": { schema: es } },
                },
                401: { description: "Unauthorized" },
              },
            }),
            async (e) => {
              let t = e.get("user"),
                r = (0, et.createServerClient)(
                  "http://localhost:54321",
                  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0",
                  {
                    cookies: {
                      get: (t) => (0, er.Ri)(e, t),
                      set: (t, r, n) => {
                        (0, er.TV)(e, t, r, n);
                      },
                      remove: (t, r) => {
                        (0, er.Yj)(e, t, r);
                      },
                    },
                  },
                ),
                n = await e.req.json(),
                i = es.partial().parse(n),
                s = {};
              void 0 !== i.currentStep && (s.current_step = i.currentStep),
                void 0 !== i.progress && (s.progress = i.progress),
                void 0 !== i.isCompleted && (s.is_completed = i.isCompleted),
                (s.updated_at = new Date().toISOString());
              let { data: a, error: o } = await r
                .from("user_onboarding")
                .upsert({ user_id: t.id, ...s })
                .select()
                .single();
              return o
                ? e.json({ error: o.message }, 500)
                : e.json({
                    currentStep: a.current_step,
                    progress: a.progress,
                    isCompleted: a.is_completed,
                  });
            },
          ),
          eu.openapi(
            K({
              method: "post",
              path: "/actions",
              tags: ["Onboarding"],
              summary: "Mark onboarding action",
              description: "Marks a specific onboarding action as completed",
              request: {
                body: { content: { "application/json": { schema: ea } } },
              },
              responses: {
                200: {
                  description: "Action marked",
                  content: {
                    "application/json": {
                      schema: Y.z.object({ success: Y.z.boolean() }),
                    },
                  },
                },
                401: { description: "Unauthorized" },
              },
            }),
            async (e) => {
              e.get("user");
              let t = (0, et.createServerClient)(
                  "http://localhost:54321",
                  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0",
                  {
                    cookies: {
                      get: (t) => (0, er.Ri)(e, t),
                      set: (t, r, n) => {
                        (0, er.TV)(e, t, r, n);
                      },
                      remove: (t, r) => {
                        (0, er.Yj)(e, t, r);
                      },
                    },
                  },
                ),
                r = await e.req.json(),
                n = ea.parse(r),
                { error: i } = await t.rpc("mark_onboarding_action_completed", {
                  action_key: n.actionKey,
                });
              return i
                ? e.json({ success: !1, error: i.message }, 500)
                : e.json({ success: !0 });
            },
          ),
          eu.openapi(
            K({
              method: "get",
              path: "/actions",
              tags: ["Onboarding"],
              summary: "Get completed actions",
              description: "Get all completed onboarding actions for the user",
              responses: {
                200: {
                  description: "List of completed actions",
                  content: { "application/json": { schema: Y.z.array(ea) } },
                },
                401: { description: "Unauthorized" },
              },
            }),
            async (e) => {
              let t = e.get("user"),
                r = (0, et.createServerClient)(
                  "http://localhost:54321",
                  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0",
                  {
                    cookies: {
                      get: (t) => (0, er.Ri)(e, t),
                      set: (t, r, n) => {
                        (0, er.TV)(e, t, r, n);
                      },
                      remove: (t, r) => {
                        (0, er.Yj)(e, t, r);
                      },
                    },
                  },
                ),
                { data: n, error: i } = await r
                  .from("onboarding_actions")
                  .select("action_key, is_completed")
                  .eq("user_id", t.id)
                  .eq("is_completed", !0);
              return i
                ? e.json({ error: i.message }, 500)
                : e.json(
                    n.map((e) => ({
                      actionKey: e.action_key,
                      isCompleted: e.is_completed,
                    })),
                  );
            },
          ),
          eu.openapi(
            K({
              method: "post",
              path: "/reset",
              tags: ["Onboarding"],
              summary: "Reset onboarding",
              description: "Resets the onboarding process for the user",
              responses: {
                200: {
                  description: "Onboarding reset",
                  content: {
                    "application/json": {
                      schema: Y.z.object({ success: Y.z.boolean() }),
                    },
                  },
                },
                401: { description: "Unauthorized" },
              },
            }),
            async (e) => {
              let t = e.get("user"),
                r = (0, et.createServerClient)(
                  "http://localhost:54321",
                  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0",
                  {
                    cookies: {
                      get: (t) => (0, er.Ri)(e, t),
                      set: (t, r, n) => {
                        (0, er.TV)(e, t, r, n);
                      },
                      remove: (t, r) => {
                        (0, er.Yj)(e, t, r);
                      },
                    },
                  },
                ),
                { error: n } = await r
                  .from("user_onboarding")
                  .upsert({
                    user_id: t.id,
                    current_step: "welcome",
                    progress: 0,
                    is_completed: !1,
                    updated_at: new Date().toISOString(),
                  });
              if (n) return e.json({ success: !1, error: n.message }, 500);
              let { error: i } = await r
                .from("onboarding_actions")
                .delete()
                .eq("user_id", t.id);
              return i
                ? e.json({ success: !1, error: i.message }, 500)
                : e.json({ success: !0 });
            },
          );
        let el = eu.fetch,
          ec = eu.fetch,
          ed = eu.fetch,
          ep = { ...o },
          eh =
            "workUnitAsyncStorage" in ep
              ? ep.workUnitAsyncStorage
              : "requestAsyncStorage" in ep
                ? ep.requestAsyncStorage
                : void 0;
        function ef(e, t) {
          return "phase-production-build" === process.env.NEXT_PHASE ||
            "function" != typeof e
            ? e
            : new Proxy(e, {
                apply: (e, r, n) => {
                  let i;
                  try {
                    let e = eh?.getStore();
                    i = e?.headers;
                  } catch (e) {}
                  return ei
                    .wrapRouteHandlerWithSentry(e, {
                      method: t,
                      parameterizedRoute: "/api/onboarding",
                      headers: i,
                    })
                    .apply(r, n);
                },
              });
        }
        let em = ef(el, "GET"),
          eg = ef(ed, "POST"),
          eb = ef(void 0, "PUT"),
          ey = ef(ec, "PATCH"),
          ev = ef(void 0, "DELETE"),
          eO = ef(void 0, "HEAD"),
          e_ = ef(void 0, "OPTIONS"),
          ew = new i.AppRouteRouteModule({
            definition: {
              kind: s.RouteKind.APP_ROUTE,
              page: "/api/onboarding/route",
              pathname: "/api/onboarding",
              filename: "route",
              bundlePath: "app/api/onboarding/route",
            },
            resolvedPagePath:
              "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\api\\onboarding\\route.ts",
            nextConfigOutput: "",
            userland: n,
          }),
          {
            workAsyncStorage: ej,
            workUnitAsyncStorage: eR,
            serverHooks: eP,
          } = ew;
        function eS() {
          return (0, a.patchFetch)({
            workAsyncStorage: ej,
            workUnitAsyncStorage: eR,
          });
        }
      },
      86592: (e) => {
        "use strict";
        e.exports = require("node:inspector");
      },
      90645: (e, t, r) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          !(function (e, t) {
            for (var r in t)
              Object.defineProperty(e, r, { enumerable: !0, get: t[r] });
          })(t, {
            ReadonlyURLSearchParams: function () {
              return c;
            },
            RedirectType: function () {
              return i.RedirectType;
            },
            forbidden: function () {
              return a.forbidden;
            },
            notFound: function () {
              return s.notFound;
            },
            permanentRedirect: function () {
              return n.permanentRedirect;
            },
            redirect: function () {
              return n.redirect;
            },
            unauthorized: function () {
              return o.unauthorized;
            },
            unstable_rethrow: function () {
              return u.unstable_rethrow;
            },
          });
        let n = r(65278),
          i = r(21293),
          s = r(11316),
          a = r(14749),
          o = r(52480),
          u = r(42600);
        class l extends Error {
          constructor() {
            super(
              "Method unavailable on `ReadonlyURLSearchParams`. Read more: https://nextjs.org/docs/app/api-reference/functions/use-search-params#updating-searchparams",
            );
          }
        }
        class c extends URLSearchParams {
          append() {
            throw new l();
          }
          delete() {
            throw new l();
          }
          set() {
            throw new l();
          }
          sort() {
            throw new l();
          }
        }
        ("function" == typeof t.default ||
          ("object" == typeof t.default && null !== t.default)) &&
          void 0 === t.default.__esModule &&
          (Object.defineProperty(t.default, "__esModule", { value: !0 }),
          Object.assign(t.default, t),
          (e.exports = t.default));
      },
      91645: (e) => {
        "use strict";
        e.exports = require("net");
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
      99755: (e, t, r) => {
        Promise.resolve().then(r.bind(r, 29244));
      },
    });
  var t = require("../../../webpack-runtime.js");
  t.C(e);
  var r = (e) => t((t.s = e)),
    n = t.X(
      0,
      [
        827, 6518, 2872, 7713, 5149, 7719, 8119, 5058, 131, 2028, 2256, 3774,
        4232,
      ],
      () => r(86202),
    );
  module.exports = n;
})();
//# sourceMappingURL=route.js.map
