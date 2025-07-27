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
    (e._sentryDebugIds[t] = "5e4124a8-3e99-485f-a355-6ef89ca6561a"),
    (e._sentryDebugIdIdentifier =
      "sentry-dbid-5e4124a8-3e99-485f-a355-6ef89ca6561a"));
} catch (e) {}
(exports.id = 4232),
  (exports.ids = [4232]),
  (exports.modules = {
    20051: (e, t, s) => {
      "use strict";
      s.r(t),
        s.d(t, {
          "004ef00139100f75a458518eb8e47b539bb6abdf0f": () => n.HW,
          "00b42241dee711bdf5ba266ee343062f1b6983d0f5": () => n.wR,
          "00ba7857acea32aa72b1bc0fcd21663ce535451a40": () => r.wz,
          "00d88f9d9e78688ae1c02b6ee9e04f9be99f078b7d": () => r.wR,
          "00e53ec7946e77fe6a32c567fa2272469d994b35ed": () => n.Ht,
          "4037929defdfc8cd110be3ad6d4131f782cbb0e097": () => n.hf,
          "4098cf28dca31a4ad4b65f8aa126dcbcdb87114a4d": () => n.zO,
          "40c302fbd5fafb1c6eef85e9f4a8a8fe9c8dbc353f": () => r.wV,
          "40c7a2d27bf018512e5c3508bc1bd517236d447c19": () => n.CI,
          "40c9e439fa61b8f42ac4617276bda6e1e55d7329ed": () => r.Vw,
          "40cff310ab1de5540125be6da54450afb3af63b9b6": () => n.yQ,
          "600e5b9fa4cf6080a9733400e3ad096f770d003bfb": () => n.sh,
          "604b6146e8aea40ce223d08163115beec1a7d008af": () => n.mJ,
          "60802c70b902d4219853bc5bb5a2109b535fbd1a62": () => r.zl,
          "60e8d90a7773bf2ce25719d36403e1499dbe405f78": () => n.v_,
          "700548bb8cec088265b3d348b1b94036288494845b": () => n.kg,
        });
      var r = s(82857),
        n = s(57011);
    },
    26457: (e, t, s) => {
      "use strict";
      let r;
      s.d(t, {
        AG: () => S,
        ND: () => A,
        UU: () => p,
        db: () => g,
        ln: () => y,
        nH: () => w,
        r: () => v,
      });
      var n = s(68119),
        a = s(77719),
        o = s(60131),
        i = s.n(o);
      s(84147);
      let { fetch: l } = i()(),
        u = "http://localhost:54321",
        c =
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0",
        h = process.env.SUPABASE_SERVICE_ROLE_KEY,
        d = c ? { apikey: c } : void 0,
        f = h ? { apikey: h } : void 0;
      function m() {
        if (!u || !c)
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
      function b() {
        return (m(), r)
          ? r
          : (r = (0, n.createBrowserClient)(u, c, { global: { headers: d } }));
      }
      function p() {
        return (
          m(), (0, n.createBrowserClient)(u, c, { global: { headers: d } })
        );
      }
      function g(e) {
        return (
          m(),
          (0, n.createServerClient)(u, c, {
            cookies: {
              get: (t) => e.get(t)?.value,
              set(t, s, r) {
                try {
                  e.set(t, s, r);
                } catch (e) {
                  console.warn(`Failed to set cookie '${t}':`, e);
                }
              },
              remove(t, s) {
                try {
                  e.set(t, "", s);
                } catch (e) {
                  console.warn(`Failed to remove cookie '${t}':`, e);
                }
              },
            },
            global: { fetch: l, headers: d },
          })
        );
      }
      function w() {
        if (!u || !h)
          throw (
            (console.error("Supabase URL or Service Role Key is missing"),
            Error("Supabase service client configuration is incomplete."))
          );
        return (0, a.createClient)(u, h, {
          auth: { autoRefreshToken: !1, persistSession: !1 },
          global: { fetch: l, headers: f },
        });
      }
      let y = (e) => {
          m();
          let t = e.headers.get("cookie") ?? "";
          return (0, n.createServerClient)(u, c, {
            cookies: {
              get(e) {
                let s = t.match(RegExp(`(^|;)s*${e}=([^;]+)`));
                return s?.[2];
              },
              set(e, t, s) {
                console.warn(
                  `Attempted to set cookie '${e}' in createEdgeClient. This must be handled by the caller via Response headers.`,
                );
              },
              remove(e, t) {
                console.warn(
                  `Attempted to remove cookie '${e}' in createEdgeClient. This must be handled by the caller via Response headers.`,
                );
              },
            },
            global: { fetch: l, headers: d },
          });
        },
        S = b,
        v = w,
        A = b();
    },
    29244: (e, t, s) => {
      "use strict";
      s.r(t),
        s.d(t, {
          AuthProvider: () => n,
          useAuth: () => a,
          useHasPermission: () => u,
          useHasRole: () => l,
          useIsAuthenticated: () => i,
          useSession: () => c,
          useUser: () => o,
        });
      var r = s(26394);
      let n = (0, r.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call AuthProvider() from the server but AuthProvider is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\apps\\web\\src\\lib\\auth\\hooks.tsx",
          "AuthProvider",
        ),
        a = (0, r.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call useAuth() from the server but useAuth is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\apps\\web\\src\\lib\\auth\\hooks.tsx",
          "useAuth",
        ),
        o = (0, r.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call useUser() from the server but useUser is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\apps\\web\\src\\lib\\auth\\hooks.tsx",
          "useUser",
        ),
        i = (0, r.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call useIsAuthenticated() from the server but useIsAuthenticated is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\apps\\web\\src\\lib\\auth\\hooks.tsx",
          "useIsAuthenticated",
        ),
        l = (0, r.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call useHasRole() from the server but useHasRole is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\apps\\web\\src\\lib\\auth\\hooks.tsx",
          "useHasRole",
        ),
        u = (0, r.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call useHasPermission() from the server but useHasPermission is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\apps\\web\\src\\lib\\auth\\hooks.tsx",
          "useHasPermission",
        ),
        c = (0, r.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call useSession() from the server but useSession is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\apps\\web\\src\\lib\\auth\\hooks.tsx",
          "useSession",
        );
    },
    41241: (e, t, s) => {
      "use strict";
      s.d(t, {
        J: () =>
          function e(t) {
            if (!t) return null;
            let s = t.user_metadata?.role || "client",
              r = {
                theme: t.user_metadata?.settings_theme || "system",
                language: t.user_metadata?.settings_language || "en",
                emailNotifications:
                  t.user_metadata?.settings_emailNotifications || !1,
                documentReminders:
                  t.user_metadata?.settings_documentReminders || !1,
                applicationUpdates:
                  t.user_metadata?.settings_applicationUpdates || !1,
                twoFactorAuth: t.user_metadata?.settings_twoFactorAuth || !1,
              };
            return {
              ...t,
              fullName:
                t.user_metadata?.full_name || t.email?.split("@")[0] || "User",
              avatarUrl: t.user_metadata?.avatar_url || "",
              role: s,
              isAdmin: "admin" === s,
              settings: r,
              hasTwoFactorAuth: () => r.twoFactorAuth,
              updateSettings: (s) => {
                let n = { ...r, ...s };
                return e({
                  ...t,
                  user_metadata: {
                    ...t.user_metadata,
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
                id: t.id,
                email: t.email,
                fullName:
                  t.user_metadata?.full_name ||
                  t.email?.split("@")[0] ||
                  "User",
                avatarUrl: t.user_metadata?.avatar_url || "",
                role: s,
                settings: r,
              }),
            };
          },
      });
    },
    48149: (e, t, s) => {
      "use strict";
      s.d(t, { UU: () => a, nH: () => n.nH });
      var r = s(15058),
        n = s(26457);
      let a = async function () {
        let e = await (0, r.UL)();
        return (0, n.db)(e);
      };
    },
    57011: (e, t, s) => {
      "use strict";
      s.d(t, {
        CI: () => f,
        HW: () => c,
        Ht: () => u,
        hf: () => d,
        kg: () => m,
        mJ: () => p,
        sh: () => w,
        v_: () => b,
        wR: () => h,
        yQ: () => g,
        zO: () => y,
      });
      var r = s(28839);
      s(23897);
      var n = s(71500),
        a = s(29073),
        o = s(26457),
        i = s(48149),
        l = s(41241);
      async function u() {
        let e = await (0, i.UU)(),
          {
            data: { user: t },
            error: s,
          } = await e.auth.getUser();
        if (s || !t) return null;
        let {
          data: { session: r },
          error: n,
        } = await e.auth.getSession();
        return n ? (console.error("Error getting session:", n), null) : r;
      }
      async function c() {
        let e = await (0, i.UU)(),
          {
            data: { user: t },
            error: s,
          } = await e.auth.getUser();
        return s || !t ? null : (0, l.J)(t);
      }
      async function h() {
        return !!(await u());
      }
      async function d(e) {
        let t = await c();
        return t?.role === e;
      }
      async function f(e = "/login") {
        let t = await (0, i.UU)();
        await t.auth.signOut(),
          (0, n.revalidatePath)("/", "layout"),
          e && (0, a.redirect)(e);
      }
      async function m(e, t, s) {
        let r = (0, o.nH)(),
          n = {
            full_name: s?.fullName,
            role: s?.role || "user",
            avatar_url: s?.avatarUrl,
          };
        s?.settings &&
          Object.entries(s.settings).forEach(([e, t]) => {
            n[`settings_${e}`] = t;
          });
        let { data: a, error: i } = await r.auth.admin.createUser({
          email: e,
          password: t,
          email_confirm: !0,
          user_metadata: n,
        });
        return i
          ? (console.error("Error creating user:", i), null)
          : (0, l.J)(a.user);
      }
      async function b(e, t) {
        let s = (0, o.nH)(),
          { error: r } = await s.auth.admin.updateUserById(e, {
            user_metadata: { role: t },
          });
        return !r || (console.error("Error updating user role:", r), !1);
      }
      async function p(e, t) {
        let s = (0, o.nH)(),
          r = {};
        Object.entries(t).forEach(([e, t]) => {
          r[`settings_${e}`] = t;
        });
        let { error: n } = await s.auth.admin.updateUserById(e, {
          user_metadata: r,
        });
        return !n || (console.error("Error updating user settings:", n), !1);
      }
      async function g(e = "/login") {
        (await u()) || (0, a.redirect)(e);
      }
      async function w(e, t = "/unauthorized") {
        await g(), (await d(e)) || (0, a.redirect)(t);
      }
      async function y(e = "/unauthorized") {
        let t = await c();
        (t && t.isAdmin) || (0, a.redirect)(e);
      }
      (0, s(73557).D)([u, c, h, d, f, m, b, p, g, w, y]),
        (0, r.A)(u, "00e53ec7946e77fe6a32c567fa2272469d994b35ed", null),
        (0, r.A)(c, "004ef00139100f75a458518eb8e47b539bb6abdf0f", null),
        (0, r.A)(h, "00b42241dee711bdf5ba266ee343062f1b6983d0f5", null),
        (0, r.A)(d, "4037929defdfc8cd110be3ad6d4131f782cbb0e097", null),
        (0, r.A)(f, "40c7a2d27bf018512e5c3508bc1bd517236d447c19", null),
        (0, r.A)(m, "700548bb8cec088265b3d348b1b94036288494845b", null),
        (0, r.A)(b, "60e8d90a7773bf2ce25719d36403e1499dbe405f78", null),
        (0, r.A)(p, "604b6146e8aea40ce223d08163115beec1a7d008af", null),
        (0, r.A)(g, "40cff310ab1de5540125be6da54450afb3af63b9b6", null),
        (0, r.A)(w, "600e5b9fa4cf6080a9733400e3ad096f770d003bfb", null),
        (0, r.A)(y, "4098cf28dca31a4ad4b65f8aa126dcbcdb87114a4d", null);
    },
    67761: (e, t, s) => {
      "use strict";
      s.d(t, {
        D_: () => n,
        Pc: () => o,
        j1: () => u,
        lR: () => r,
        nl: () => c,
        qQ: () => a,
      });
      class r extends Error {
        constructor(e, t, s, r) {
          super(e),
            (this.name = "AuthError"),
            (this.code = t),
            (this.status = r),
            (this.originalError = s);
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
      class n extends r {
        constructor(e = "Authentication required", t) {
          super(e, "auth/unauthorized", t, 401),
            (this.name = "UnauthorizedError");
        }
      }
      class a extends r {
        constructor(e = "Insufficient permissions", t) {
          super(e, "auth/forbidden", t, 403), (this.name = "ForbiddenError");
        }
      }
      class o extends r {
        constructor(e = "Session error", t) {
          super(e, "auth/session-error", t, 400), (this.name = "SessionError");
        }
      }
      class i extends r {
        constructor(e = "Invalid credentials", t) {
          super(e, "auth/invalid-credentials", t, 401),
            (this.name = "InvalidCredentialsError");
        }
      }
      class l extends r {
        constructor(e = "User operation failed", t) {
          super(e, "auth/user-operation-failed", t, 400),
            (this.name = "UserOperationError");
        }
      }
      class u extends r {
        constructor(e = "Authentication configuration error", t) {
          super(e, "auth/configuration-error", t, 500),
            (this.name = "ConfigurationError");
        }
      }
      function c(e) {
        if (!e) return new r("Unknown error", "auth/unknown");
        if (e.status)
          switch (e.status) {
            case 401:
              return new n(e.message, e);
            case 403:
              return new a(e.message, e);
            case 400:
              if (e.message.includes("credentials")) return new i(e.message, e);
              if (e.message.includes("session")) return new o(e.message, e);
              return new l(e.message, e);
            default:
              return new r(
                e.message,
                `auth/error-${e.status || "unknown"}`,
                e,
                e.status,
              );
          }
        return new r(e.message || "Unknown error", "auth/unknown-error", e);
      }
    },
    82857: (e, t, s) => {
      "use strict";
      s.d(t, {
        Vw: () => u,
        wR: () => l,
        wV: () => h,
        wz: () => i,
        zl: () => c,
      });
      var r = s(28839);
      s(23897);
      var n = s(29073),
        a = s(48149),
        o = s(41241);
      async function i() {
        let e = await (0, a.UU)();
        try {
          let {
            data: { user: t },
            error: s,
          } = await e.auth.getUser();
          if (s || !t) return null;
          return (0, o.J)(t);
        } catch (e) {
          return (
            console.error("Error getting user in server component:", e), null
          );
        }
      }
      async function l() {
        return !!(await i());
      }
      async function u(e = "/login") {
        let t = await i();
        return t || (0, n.redirect)(e), t;
      }
      async function c(e, t = "/unauthorized") {
        let s = await u();
        return s.role !== e && "admin" !== s.role && (0, n.redirect)(t), s;
      }
      async function h(e = "/unauthorized") {
        let t = await u();
        return t.isAdmin || (0, n.redirect)(e), t;
      }
      (0, s(73557).D)([i, l, u, c, h]),
        (0, r.A)(i, "00ba7857acea32aa72b1bc0fcd21663ce535451a40", null),
        (0, r.A)(l, "00d88f9d9e78688ae1c02b6ee9e04f9be99f078b7d", null),
        (0, r.A)(u, "40c9e439fa61b8f42ac4617276bda6e1e55d7329ed", null),
        (0, r.A)(c, "60802c70b902d4219853bc5bb5a2109b535fbd1a62", null),
        (0, r.A)(h, "40c302fbd5fafb1c6eef85e9f4a8a8fe9c8dbc353f", null);
    },
    84001: (e, t, s) => {
      "use strict";
      s.d(t, { WV: () => A });
      var r = s(77719),
        n = s(15058),
        a = s(84147),
        o = s(67761);
      let i = { roles: {}, superAdminRole: "admin", enableCache: !0 };
      class l {
        constructor(e = {}) {
          this.permissionCache = new Map();
          let t = { ...i, ...e };
          (this.roles = t.roles || {}),
            (this.superAdminRole = t.superAdminRole || "admin"),
            (this.enableCache = t.enableCache ?? !0),
            (this.extractRoles = t.extractRoles || ((e) => [e.role || "user"]));
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
          let s = this.roles[e];
          if (!s) return new Set();
          let r = new Set(s.permissions);
          if (s.inherits && s.inherits.length > 0)
            for (let e of s.inherits)
              this.getRolePermissions(e, t).forEach((e) => r.add(e));
          return r;
        }
        getUserPermissions(e) {
          if (!e) return new Set();
          let t = this.extractRoles(e);
          if (t.includes(this.superAdminRole)) return new Set(["*"]);
          if (this.enableCache) {
            let e = t.sort().join(","),
              s = this.permissionCache.get(e);
            if (s) return s;
          }
          let s = new Set();
          for (let e of t) this.getRolePermissions(e).forEach((e) => s.add(e));
          if (this.enableCache && t.length > 0) {
            let e = t.sort().join(",");
            this.permissionCache.set(e, s);
          }
          return s;
        }
        hasRole(e, t) {
          if (!e) return !1;
          let s = this.extractRoles(e);
          return s.includes(t) || s.includes(this.superAdminRole);
        }
        hasPermission(e, t) {
          if (!e) return !1;
          let s = this.getUserPermissions(e);
          if (s.has("*") || s.has(t)) return !0;
          let r = t.split(":");
          for (let e = 1; e <= r.length; e++) {
            let t = [...r.slice(0, e), "*"].join(":");
            if (s.has(t)) return !0;
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
            throw new o.qQ(`Missing required permission: ${t}`);
        }
        enforceAnyPermission(e, t) {
          if (!this.hasAnyPermission(e, t))
            throw new o.qQ(
              `Missing at least one of the required permissions: ${t.join(", ")}`,
            );
        }
        enforceAllPermissions(e, t) {
          if (!this.hasAllPermissions(e, t))
            throw new o.qQ(
              `Missing some of the required permissions: ${t.join(", ")}`,
            );
        }
        createPermission(e, t) {
          return `${e}:${t}`;
        }
      }
      let u = null;
      class c {
        getItem(e) {
          return this.storage.get(e) || null;
        }
        setItem(e, t) {
          this.storage.set(e, t);
        }
        removeItem(e) {
          this.storage.delete(e);
        }
        constructor() {
          this.storage = new Map();
        }
      }
      class h {
        getItem(e) {
          return "undefined" == typeof localStorage
            ? null
            : localStorage.getItem(e);
        }
        setItem(e, t) {
          "undefined" != typeof localStorage && localStorage.setItem(e, t);
        }
        removeItem(e) {
          "undefined" != typeof localStorage && localStorage.removeItem(e);
        }
      }
      class d {
        getItem(e) {
          return "undefined" == typeof sessionStorage
            ? null
            : sessionStorage.getItem(e);
        }
        setItem(e, t) {
          "undefined" != typeof sessionStorage && sessionStorage.setItem(e, t);
        }
        removeItem(e) {
          "undefined" != typeof sessionStorage && sessionStorage.removeItem(e);
        }
      }
      class f {
        constructor(e = {}) {
          this.options = { path: "/", maxAge: 2592e3, ...e };
        }
        getItem(e) {
          if ("undefined" == typeof document) return null;
          for (let t of document.cookie.split(";")) {
            let [s, r] = t.trim().split("=");
            if (s === e) return decodeURIComponent(r);
          }
          return null;
        }
        setItem(e, t) {
          if ("undefined" == typeof document) return;
          let {
              domain: s,
              path: r,
              secure: n,
              sameSite: a,
              maxAge: o,
            } = this.options,
            i = `${e}=${encodeURIComponent(t)}`;
          s && (i += `; Domain=${s}`),
            r && (i += `; Path=${r}`),
            n && (i += "; Secure"),
            a && (i += `; SameSite=${a}`),
            o && (i += `; Max-Age=${o}`),
            (document.cookie = i);
        }
        removeItem(e) {
          if ("undefined" == typeof document) return;
          let { domain: t, path: s } = this.options,
            r = `${e}=; Max-Age=0`;
          t && (r += `; Domain=${t}`),
            s && (r += `; Path=${s}`),
            (document.cookie = r);
        }
      }
      let m = {
        SESSION: "supabase.auth.session",
        USER: "supabase.auth.user",
        IS_AUTHENTICATED: "supabase.auth.isAuthenticated",
        REFRESH_TOKEN: "supabase.auth.refreshToken",
      };
      class b {
        constructor(e, t = {}) {
          (this.provider = e), (this.keyPrefix = t.keyPrefix || "");
        }
        getFullKey(e) {
          return this.keyPrefix ? `${this.keyPrefix}:${e}` : e;
        }
        get(e, t) {
          let s = this.provider.getItem(this.getFullKey(e));
          if (!s) return t || null;
          try {
            return JSON.parse(s);
          } catch (s) {
            return (
              console.error(`Failed to parse value for key ${e}:`, s), t || null
            );
          }
        }
        set(e, t) {
          try {
            let s = JSON.stringify(t);
            this.provider.setItem(this.getFullKey(e), s);
          } catch (t) {
            console.error(`Failed to set value for key ${e}:`, t);
          }
        }
        remove(e) {
          this.provider.removeItem(this.getFullKey(e));
        }
        setSession(e) {
          this.set(m.SESSION, e);
        }
        getSession() {
          return this.get(m.SESSION);
        }
        setUser(e) {
          this.set(m.USER, e);
        }
        getUser() {
          return this.get(m.USER);
        }
        setAuthState(e) {
          this.setUser(e.user),
            this.setSession(e.session),
            this.set(m.IS_AUTHENTICATED, e.isAuthenticated);
        }
        getAuthState() {
          return {
            user: this.getUser(),
            session: this.getSession(),
            isAuthenticated: this.get(m.IS_AUTHENTICATED) || !1,
          };
        }
        clearAuth() {
          this.remove(m.USER),
            this.remove(m.SESSION),
            this.remove(m.IS_AUTHENTICATED),
            this.remove(m.REFRESH_TOKEN);
        }
      }
      class p {
        constructor(e) {
          (this.refreshTimeout = null),
            (this.refreshing = !1),
            (this.supabase = e.supabase),
            (this.autoRefresh = e.autoRefresh ?? !0),
            (this.refreshThreshold = e.refreshThreshold ?? 300),
            (this.onRefreshSuccess = e.onRefreshSuccess),
            (this.onRefreshError = e.onRefreshError),
            this.autoRefresh && this.startRefreshScheduler();
        }
        async startRefreshScheduler() {
          this.stopRefreshScheduler();
          try {
            let { data: e, error: t } = await this.supabase.auth.getSession();
            if (t) throw t;
            e.session && this.scheduleNextRefresh(e.session);
          } catch (e) {
            console.error("Failed to start refresh scheduler:", e),
              this.onRefreshError && this.onRefreshError(e);
          }
        }
        stopRefreshScheduler() {
          this.refreshTimeout &&
            (clearTimeout(this.refreshTimeout), (this.refreshTimeout = null));
        }
        calculateNextRefreshTime(e) {
          if (!e?.expires_at) return 0;
          let t = 1e3 * e.expires_at;
          return Math.max(0, t - Date.now() - 1e3 * this.refreshThreshold);
        }
        scheduleNextRefresh(e) {
          if (!e) return;
          let t = this.calculateNextRefreshTime(e);
          if (t <= 0) return void this.refreshSession();
          this.refreshTimeout = setTimeout(() => {
            this.refreshSession();
          }, t);
        }
        async refreshSession() {
          if (this.refreshing) return null;
          this.refreshing = !0;
          try {
            let { data: e, error: t } =
              await this.supabase.auth.refreshSession();
            if (t) throw t;
            if (e.session)
              return (
                this.onRefreshSuccess && this.onRefreshSuccess(e.session),
                this.autoRefresh && this.scheduleNextRefresh(e.session),
                e.session
              );
            return null;
          } catch (e) {
            return (
              console.error("Session refresh failed:", e),
              this.onRefreshError && this.onRefreshError(e),
              null
            );
          } finally {
            this.refreshing = !1;
          }
        }
        async getSession() {
          try {
            let { data: e, error: t } = await this.supabase.auth.getSession();
            if (t) throw t;
            let s = e.session;
            if (!s) return null;
            let r = 1e3 * (s.expires_at || 0),
              n = Date.now();
            if (r - n < 1e3 * this.refreshThreshold)
              return this.refreshSession();
            return s;
          } catch (e) {
            return console.error("Failed to get session:", e), null;
          }
        }
        destroy() {
          this.stopRefreshScheduler();
        }
      }
      var g = s(29073);
      let w = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
      s(29244), s(82857), s(57011);
      let y = {
          ...{
            supabaseUrl: "http://localhost:54321",
            supabaseKey:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0",
            callbackUrl: `${w}/auth/callback`,
            logoutRedirectUrl: "/login",
            loginRedirectUrl: "/dashboard",
            storageType: "local",
          },
        },
        S = null;
      async function v() {
        try {
          let e = (function () {
              try {
                let e = (0, n.UL)(),
                  t = {
                    auth: { persistSession: !0 },
                    global: {
                      headers: { "X-Client-Info": "hijraah-auth-helper" },
                    },
                  };
                return (
                  (t.cookies = {
                    get(t) {
                      try {
                        return e.get(t)?.value;
                      } catch (e) {
                        console.warn(
                          "Error accessing cookie synchronously:",
                          e,
                        );
                        return;
                      }
                    },
                    set(t, s, r) {
                      try {
                        e.set(t, s, r);
                      } catch (e) {
                        console.warn("Error setting cookie synchronously:", e);
                      }
                    },
                    remove(t, s) {
                      try {
                        e.set(t, "", { ...s, maxAge: 0 });
                      } catch (e) {
                        console.warn("Error removing cookie synchronously:", e);
                      }
                    },
                  }),
                  (0, r.createClient)(y.supabaseUrl, y.supabaseKey, t)
                );
              } catch (e) {
                throw (
                  (console.error("Failed to create Supabase server client:", e),
                  new o.j1("Failed to create Supabase server client"))
                );
              }
            })(),
            {
              data: { user: t },
              error: s,
            } = await e.auth.getUser();
          if (s)
            throw (
              (console.error("Error fetching user in checkAuth:", s),
              (0, o.nl)(s))
            );
          if (!t) throw new o.D_("User not authenticated");
          let {
            data: { session: a },
            error: i,
          } = await e.auth.getSession();
          if (i)
            throw (
              (console.error("Error fetching session in checkAuth:", i),
              new o.Pc(
                "Failed to retrieve session data after user verification",
              ))
            );
          if (!a)
            throw new o.D_("No active session found despite verified user");
          return { session: a, user: t };
        } catch (e) {
          if (
            (console.error("Authentication check failed:", e),
            e instanceof o.lR)
          )
            throw e;
          throw new o.D_("Failed to authenticate user");
        }
      }
      let A = (0, a.cache)(async () => {
        try {
          let { session: e, user: t } = await v();
          if (!t) throw new o.D_("No user found in session");
          let s = {
            ...t,
            fullName:
              t.user_metadata?.full_name || t.email?.split("@")[0] || "User",
            avatarUrl: t.user_metadata?.avatar_url || "",
            role: t.user_metadata?.role || "user",
          };
          return { session: e, user: s, isAuthenticated: !0 };
        } catch (e) {
          return (
            console.error("Failed to get authenticated user:", e),
            { session: null, user: null, isAuthenticated: !1 }
          );
        }
      });
    },
    97108: (e) => {
      function t(e) {
        var t = Error("Cannot find module '" + e + "'");
        throw ((t.code = "MODULE_NOT_FOUND"), t);
      }
      (t.keys = () => []), (t.resolve = t), (t.id = 97108), (e.exports = t);
    },
  });
//# sourceMappingURL=4232.js.map
