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
    s = new e.Error().stack;
  s &&
    ((e._sentryDebugIds = e._sentryDebugIds || {}),
    (e._sentryDebugIds[s] = "37cbbff3-bf5d-4794-87d8-a55262aea558"),
    (e._sentryDebugIdIdentifier =
      "sentry-dbid-37cbbff3-bf5d-4794-87d8-a55262aea558"));
} catch (e) {}
(exports.id = 9632),
  (exports.ids = [9632]),
  (exports.modules = {
    3519: (e, s, t) => {
      "use strict";
      t.r(s),
        t.d(s, {
          AuthProvider: () => u,
          useAuth: () => d,
          useHasPermission: () => f,
          useHasRole: () => m,
          useIsAuthenticated: () => c,
          useSession: () => p,
          useUser: () => h,
        });
      var r = t(61268),
        i = t(84205),
        n = t(32367),
        o = t(61460);
      function a(e) {
        if (!e) return null;
        let s = e.user_metadata?.role || "client",
          t = {
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
          role: s,
          isAdmin: "admin" === s,
          settings: t,
          hasTwoFactorAuth: () => t.twoFactorAuth,
          updateSettings: (s) => {
            let r = { ...t, ...s };
            return a({
              ...e,
              user_metadata: {
                ...e.user_metadata,
                settings_theme: r.theme,
                settings_language: r.language,
                settings_emailNotifications: r.emailNotifications,
                settings_documentReminders: r.documentReminders,
                settings_applicationUpdates: r.applicationUpdates,
                settings_twoFactorAuth: r.twoFactorAuth,
              },
            });
          },
          toObject: () => ({
            id: e.id,
            email: e.email,
            fullName:
              e.user_metadata?.full_name || e.email?.split("@")[0] || "User",
            avatarUrl: e.user_metadata?.avatar_url || "",
            role: s,
            settings: t,
          }),
        };
      }
      let l = (0, i.createContext)(void 0);
      function u({ children: e }) {
        let [s, t] = (0, i.useState)(null),
          [o, u] = (0, i.useState)(null),
          [d, h] = (0, i.useState)(!0),
          c = (0, n.UU)(),
          m = (0, i.useCallback)(async () => {
            try {
              h(!0);
              let {
                data: { session: e },
                error: s,
              } = await c.auth.getSession();
              if (s) throw s;
              if (e) {
                let {
                  data: { user: s },
                  error: r,
                } = await c.auth.getUser();
                if (r) throw r;
                u(e), t(a(s));
              } else u(null), t(null);
            } catch (e) {
              console.error("Error refreshing session:", e), u(null), t(null);
            } finally {
              h(!1);
            }
          }, [c]),
          f = (0, i.useCallback)(
            async (e, s) => {
              h(!0);
              try {
                if ("email" === e) {
                  if (!s?.email || !s?.password)
                    throw Error(
                      "Email and password required for email sign in",
                    );
                  let { data: e, error: r } = await c.auth.signInWithPassword({
                    email: s.email,
                    password: s.password,
                  });
                  if (r) throw r;
                  e?.session && (u(e.session), t(a(e.session.user)));
                } else {
                  let { error: t } = await c.auth.signInWithOAuth({
                    provider: e,
                    options: s?.redirectTo
                      ? { redirectTo: s.redirectTo }
                      : void 0,
                  });
                  if (t) throw t;
                }
              } catch (e) {
                throw (console.error("Error signing in:", e), e);
              } finally {
                h(!1);
              }
            },
            [c],
          ),
          p = (0, i.useCallback)(async () => {
            h(!0);
            try {
              let { error: e } = await c.auth.signOut();
              if (e) throw e;
              u(null), t(null);
            } catch (e) {
              console.error("Error signing out:", e);
            } finally {
              h(!1);
            }
          }, [c]),
          w = (0, i.useCallback)(
            async (e) => {
              h(!0);
              try {
                if (!e.email || !e.password)
                  throw Error("Email and password required for sign up");
                let { data: s, error: t } = await c.auth.signUp({
                  email: e.email,
                  password: e.password,
                  options: {
                    data: { full_name: e.fullName || "" },
                    emailRedirectTo:
                      e.redirectTo || `${window.location.origin}/auth/callback`,
                  },
                });
                if (t) throw t;
                return s;
              } catch (e) {
                throw (console.error("Error signing up:", e), e);
              } finally {
                h(!1);
              }
            },
            [c],
          ),
          g = (0, i.useCallback)(
            async (e, s) => {
              h(!0);
              try {
                let { error: t } = await c.auth.resetPasswordForEmail(e, {
                  redirectTo:
                    s || `${window.location.origin}/auth/reset-password`,
                });
                if (t) throw t;
                return !0;
              } catch (e) {
                throw (console.error("Error resetting password:", e), e);
              } finally {
                h(!1);
              }
            },
            [c],
          ),
          _ = (0, i.useCallback)(
            async (e) => {
              h(!0);
              try {
                let { error: s } = await c.auth.updateUser({ password: e });
                if (s) throw s;
                return !0;
              } catch (e) {
                throw (console.error("Error updating password:", e), e);
              } finally {
                h(!1);
              }
            },
            [c],
          );
        return (0, r.jsx)(l.Provider, {
          value: {
            user: s,
            session: o,
            isLoading: d,
            isAuthenticated: !!o,
            signIn: f,
            signOut: p,
            refreshSession: m,
            signUp: w,
            resetPassword: g,
            updatePassword: _,
            error: null,
          },
          children: e,
        });
      }
      function d() {
        let e = (0, i.useContext)(l);
        if (void 0 === e)
          throw Error("useAuth must be used within an AuthProvider");
        return e;
      }
      function h() {
        let { user: e } = d();
        return e;
      }
      function c() {
        let { isAuthenticated: e } = d();
        return e;
      }
      function m(e) {
        let s = h();
        return s?.role === e;
      }
      function f(e) {
        let s = h();
        return (0, o._m)(s, e);
      }
      function p() {
        let e = (0, i.useContext)(l);
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
    8963: (e) => {
      function s(e) {
        var s = Error("Cannot find module '" + e + "'");
        throw ((s.code = "MODULE_NOT_FOUND"), s);
      }
      (s.keys = () => []), (s.resolve = s), (s.id = 8963), (e.exports = s);
    },
    14795: (e, s, t) => {
      "use strict";
      t.d(s, { j2: () => i });
      var r = t(84001);
      async function i() {
        return (await (0, r.WV)()).session;
      }
      t(57011), t(67761), t(29244);
    },
    15668: (e) => {
      function s(e) {
        var s = Error("Cannot find module '" + e + "'");
        throw ((s.code = "MODULE_NOT_FOUND"), s);
      }
      (s.keys = () => []), (s.resolve = s), (s.id = 15668), (e.exports = s);
    },
    20207: (e, s, t) => {
      Promise.resolve().then(t.bind(t, 29244));
    },
    32367: (e, s, t) => {
      "use strict";
      let r;
      t.d(s, { AG: () => g, Iw: () => p, UU: () => w });
      var i = t(97713),
        n = t(15149),
        o = t.n(n),
        a = t(84205);
      let { fetch: l } = o()(),
        u = "http://localhost:54321",
        d =
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0",
        h = process.env.SUPABASE_SERVICE_ROLE_KEY,
        c = d ? { apikey: d } : void 0;
      function m() {
        if (!u || !d)
          throw (
            (console.error(
              "Missing environment variables NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY",
            ),
            Error("Supabase URL or Anon Key is missing."))
          );
      }
      {
        let e = globalThis;
        e.__USING_PONYFETCH__ || ((e.fetch = l), (e.__USING_PONYFETCH__ = !0));
      }
      function f() {
        return (m(), r)
          ? r
          : (r = (0, i.createBrowserClient)(u, d, { global: { headers: c } }));
      }
      function p() {
        return (0, a.useMemo)(f, []);
      }
      function w() {
        return (
          m(), (0, i.createBrowserClient)(u, d, { global: { headers: c } })
        );
      }
      let g = f;
      f();
    },
    59570: () => {},
    61460: (e, s, t) => {
      "use strict";
      t.d(s, { _m: () => c });
      class r extends Error {
        constructor(e, s, t, r) {
          super(e),
            (this.name = "AuthError"),
            (this.code = s),
            (this.status = r),
            (this.originalError = t);
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
      class i extends r {
        constructor(e = "Authentication required", s) {
          super(e, "auth/unauthorized", s, 401),
            (this.name = "UnauthorizedError");
        }
      }
      class n extends r {
        constructor(e = "Insufficient permissions", s) {
          super(e, "auth/forbidden", s, 403), (this.name = "ForbiddenError");
        }
      }
      class o extends r {
        constructor(e = "Session error", s) {
          super(e, "auth/session-error", s, 400), (this.name = "SessionError");
        }
      }
      class a extends r {
        constructor(e = "Invalid credentials", s) {
          super(e, "auth/invalid-credentials", s, 401),
            (this.name = "InvalidCredentialsError");
        }
      }
      class l extends r {
        constructor(e = "User operation failed", s) {
          super(e, "auth/user-operation-failed", s, 400),
            (this.name = "UserOperationError");
        }
      }
      let u = { roles: {}, superAdminRole: "admin", enableCache: !0 };
      class d {
        constructor(e = {}) {
          this.permissionCache = new Map();
          let s = { ...u, ...e };
          (this.roles = s.roles || {}),
            (this.superAdminRole = s.superAdminRole || "admin"),
            (this.enableCache = s.enableCache ?? !0),
            (this.extractRoles = s.extractRoles || ((e) => [e.role || "user"]));
        }
        defineRole(e) {
          (this.roles[e.name] = e),
            this.enableCache && this.permissionCache.clear();
        }
        defineRoles(e) {
          (this.roles = { ...this.roles, ...e }),
            this.enableCache && this.permissionCache.clear();
        }
        getRolePermissions(e, s = new Set()) {
          if (s.has(e)) return new Set();
          s.add(e);
          let t = this.roles[e];
          if (!t) return new Set();
          let r = new Set(t.permissions);
          if (t.inherits && t.inherits.length > 0)
            for (let e of t.inherits)
              this.getRolePermissions(e, s).forEach((e) => r.add(e));
          return r;
        }
        getUserPermissions(e) {
          if (!e) return new Set();
          let s = this.extractRoles(e);
          if (s.includes(this.superAdminRole)) return new Set(["*"]);
          if (this.enableCache) {
            let e = s.sort().join(","),
              t = this.permissionCache.get(e);
            if (t) return t;
          }
          let t = new Set();
          for (let e of s) this.getRolePermissions(e).forEach((e) => t.add(e));
          if (this.enableCache && s.length > 0) {
            let e = s.sort().join(",");
            this.permissionCache.set(e, t);
          }
          return t;
        }
        hasRole(e, s) {
          if (!e) return !1;
          let t = this.extractRoles(e);
          return t.includes(s) || t.includes(this.superAdminRole);
        }
        hasPermission(e, s) {
          if (!e) return !1;
          let t = this.getUserPermissions(e);
          if (t.has("*") || t.has(s)) return !0;
          let r = s.split(":");
          for (let e = 1; e <= r.length; e++) {
            let s = [...r.slice(0, e), "*"].join(":");
            if (t.has(s)) return !0;
          }
          return !1;
        }
        hasAnyPermission(e, s) {
          return s.some((s) => this.hasPermission(e, s));
        }
        hasAllPermissions(e, s) {
          return s.every((s) => this.hasPermission(e, s));
        }
        enforcePermission(e, s) {
          if (!this.hasPermission(e, s))
            throw new n(`Missing required permission: ${s}`);
        }
        enforceAnyPermission(e, s) {
          if (!this.hasAnyPermission(e, s))
            throw new n(
              `Missing at least one of the required permissions: ${s.join(", ")}`,
            );
        }
        enforceAllPermissions(e, s) {
          if (!this.hasAllPermissions(e, s))
            throw new n(
              `Missing some of the required permissions: ${s.join(", ")}`,
            );
        }
        createPermission(e, s) {
          return `${e}:${s}`;
        }
      }
      let h = null;
      function c(e, s) {
        var t;
        return (h || (h = new d(void 0)), h).hasPermission(e, s);
      }
    },
    96391: (e, s, t) => {
      Promise.resolve().then(t.bind(t, 3519));
    },
    96708: (e) => {
      function s(e) {
        var s = Error("Cannot find module '" + e + "'");
        throw ((s.code = "MODULE_NOT_FOUND"), s);
      }
      (s.keys = () => []), (s.resolve = s), (s.id = 96708), (e.exports = s);
    },
  });
//# sourceMappingURL=9632.js.map
