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
    (e._sentryDebugIds[t] = "c6e20be6-eba3-41ee-8e9c-831200cb23e5"),
    (e._sentryDebugIdIdentifier =
      "sentry-dbid-c6e20be6-eba3-41ee-8e9c-831200cb23e5"));
} catch (e) {}
("use strict");
(exports.id = 1190),
  (exports.ids = [1190]),
  (exports.modules = {
    13772: (e, t, s) => {
      s.d(t, {
        Ln: () => u,
        Pu: () => f,
        Vq: () => c,
        p_: () => h,
        wo: () => g,
        ws: () => d,
      }),
        s(68119);
      var r = s(77719),
        a = (s(15058), s(67761)),
        n = s(69959),
        i = (s(42476), s(11040));
      let o = /^guest_[a-f0-9]{16}@guest\.local$/;
      function u(e) {
        return o.test(e);
      }
      async function l() {
        try {
          let e = (function () {
              let e = Date.now().toString(16),
                t = Math.random().toString(16).substring(2, 10);
              return `guest_${e}${t}@guest.local`;
            })(),
            t = process.env.DATABASE_URL;
          if (!t) throw new a.lR("Database connection not configured");
          let s = postgres.default(t),
            r = (0, i.f)(s),
            [o] = await r
              .insert(n.aiChatbotUser)
              .values({ email: e, password: null })
              .returning({
                id: n.aiChatbotUser.id,
                email: n.aiChatbotUser.email,
              });
          if ((await s.end(), !o))
            throw new a.lR("Failed to create guest user");
          return { id: o.id, email: o.email };
        } catch (e) {
          throw (
            (console.error("Failed to create guest user:", e),
            new a.lR("Failed to create guest user"))
          );
        }
      }
      async function c(e) {
        try {
          let t = await l(),
            s = `guest_session_${Date.now()}_${Math.random().toString(36).substring(7)}`;
          return {
            id: t.id,
            email: t.email,
            fullName: "Guest User",
            avatarUrl: "",
            role: "client",
            userType: "guest",
            isGuest: !0,
            guestSessionId: s,
            user_metadata: {
              full_name: "Guest User",
              role: "client",
              is_guest: !0,
              session_id: s,
              ...e,
            },
            app_metadata: { provider: "guest", providers: ["guest"] },
            aud: "authenticated",
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          };
        } catch (e) {
          throw (
            (console.error("Failed to create guest session:", e),
            new a.lR("Failed to create guest session"))
          );
        }
      }
      function d(e, t, s = 86400) {
        try {
          let r = {
            httpOnly: !0,
            secure: !0,
            sameSite: "lax",
            maxAge: s,
            path: "/",
          };
          t.set("guest_user_id", e.id, r),
            t.set("guest_session_id", e.guestSessionId || "", r),
            t.set("is_guest_user", "true", { ...r, httpOnly: !1 });
          let a = {
            id: e.id,
            email: e.email,
            fullName: e.fullName,
            isGuest: !0,
            sessionId: e.guestSessionId,
          };
          t.set("guest_data", JSON.stringify(a), { ...r, httpOnly: !1 });
        } catch (e) {
          console.error("Failed to set guest session cookies:", e);
        }
      }
      function g(e) {
        try {
          let t = e.get("is_guest_user")?.value === "true",
            s = e.get("guest_user_id")?.value,
            r = e.get("guest_session_id")?.value,
            a = e.get("guest_data")?.value;
          if (!t || !s || !a) return null;
          let n = JSON.parse(a);
          return {
            id: s,
            email: n.email,
            fullName: n.fullName || "Guest User",
            avatarUrl: "",
            role: "client",
            userType: "guest",
            isGuest: !0,
            guestSessionId: r,
            user_metadata: {
              full_name: n.fullName || "Guest User",
              role: "client",
              is_guest: !0,
              session_id: r,
            },
            app_metadata: { provider: "guest", providers: ["guest"] },
            aud: "authenticated",
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          };
        } catch (e) {
          return (
            console.error("Failed to get guest session from cookies:", e), null
          );
        }
      }
      function h(e) {
        try {
          let t = { path: "/", maxAge: 0 };
          e.set("guest_user_id", "", t),
            e.set("guest_session_id", "", t),
            e.set("is_guest_user", "", t),
            e.set("guest_data", "", t);
        } catch (e) {
          console.error("Failed to clear guest session cookies:", e);
        }
      }
      async function f(e, t, s, n) {
        try {
          let i = (0, r.createClient)(
              "http://localhost:54321",
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0",
              { auth: { persistSession: !1, autoRefreshToken: !1 } },
            ),
            { data: o, error: u } = await i.auth.signUp({
              email: t,
              password: s,
              options: {
                data: {
                  full_name: n || "User",
                  converted_from_guest: !0,
                  original_guest_id: e,
                },
              },
            });
          if (u)
            throw new a.lR(
              `Failed to convert guest to regular user: ${u.message}`,
            );
          if (!o.user) throw new a.lR("No user data returned after conversion");
          return {
            ...o.user,
            fullName: n || o.user.user_metadata?.full_name || "User",
            avatarUrl: o.user.user_metadata?.avatar_url || "",
            role: o.user.user_metadata?.role || "client",
            userType: "regular",
            isGuest: !1,
          };
        } catch (e) {
          throw (
            (console.error("Failed to convert guest to regular user:", e),
            e instanceof a.lR ? e : new a.lR("Conversion failed"))
          );
        }
      }
    },
    61190: (e, t, s) => {
      s.d(t, { db: () => u, fl: () => o, nH: () => l, vD: () => g });
      var r = s(68119),
        a = s(77719),
        n = s(15058),
        i = s(13772);
      let o = {
        supabaseUrl: "http://localhost:54321",
        supabaseAnonKey:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0",
        supabaseServiceKey: process.env.SUPABASE_SERVICE_ROLE_KEY,
        redirectUrl:
          process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
        guestSessionEnabled:
          "true" === process.env.NEXT_PUBLIC_GUEST_AUTH_ENABLED,
        sessionTimeout: parseInt(process.env.SESSION_TIMEOUT || "3600", 10),
      };
      function u(e) {
        return (0, r.createServerClient)(o.supabaseUrl, o.supabaseAnonKey, {
          cookies: e
            ? {
                get: (t) => e.get(t)?.value,
                set(t, s, r) {
                  e.set(t, s, r);
                },
                remove(t, s) {
                  e.set(t, "", { ...s, maxAge: 0 });
                },
              }
            : {
                get: (e) => (0, n.UL)().get(e)?.value,
                set(e, t, s) {
                  (0, n.UL)().set(e, t, s);
                },
                remove(e, t) {
                  (0, n.UL)().set(e, "", { ...t, maxAge: 0 });
                },
              },
          auth: { persistSession: !0, autoRefreshToken: !0 },
        });
      }
      function l() {
        if (!o.supabaseServiceKey)
          throw Error("Supabase service key not configured");
        return (0, a.createClient)(o.supabaseUrl, o.supabaseServiceKey, {
          auth: { persistSession: !1, autoRefreshToken: !1 },
        });
      }
      let c = {
        client: [
          "chat:create",
          "chat:read",
          "chat:update:own",
          "chat:delete:own",
          "artifacts:create",
          "artifacts:read",
          "artifacts:update:own",
          "artifacts:delete:own",
          "profile:read:own",
          "profile:update:own",
        ],
        guest: [
          "chat:create",
          "chat:read:own",
          "artifacts:create",
          "artifacts:read:own",
          "session:temporary",
        ],
        moderator: [
          "chat:read:all",
          "chat:moderate",
          "artifacts:read:all",
          "artifacts:moderate",
          "users:read",
          "reports:create",
          "reports:read",
        ],
        admin: [
          "chat:read:all",
          "chat:update:all",
          "chat:delete:all",
          "artifacts:read:all",
          "artifacts:update:all",
          "artifacts:delete:all",
          "users:read:all",
          "users:update:all",
          "users:delete:all",
          "system:admin",
          "reports:read:all",
          "reports:resolve",
        ],
      };
      function d(e) {
        if (!e) return [];
        if ("isGuest" in e && e.isGuest) return [...c.guest];
        let t = e.role;
        return t && c[t] ? [...c[t]] : [];
      }
      async function g(e) {
        try {
          let t = e
            ? { get: (t) => e.cookies.get(t), set: () => {} }
            : (0, n.UL)();
          if (o.guestSessionEnabled) {
            let e = (0, i.wo)(t);
            if (e)
              return {
                user: e,
                session: null,
                isAuthenticated: !0,
                isGuest: !0,
                permissions: d(e),
              };
          }
          let s = u(t),
            {
              data: { user: r },
              error: a,
            } = await s.auth.getUser();
          if (!a && r) {
            let e = {
                ...r,
                fullName:
                  r.user_metadata?.full_name ||
                  r.email?.split("@")[0] ||
                  "User",
                avatarUrl: r.user_metadata?.avatar_url || "",
                role: r.user_metadata?.role || "client",
                userType: "regular",
                isGuest: !1,
              },
              {
                data: { session: t },
              } = await s.auth.getSession();
            return {
              user: e,
              session: t,
              isAuthenticated: !0,
              isGuest: !1,
              permissions: d(e),
            };
          }
          return {
            user: null,
            session: null,
            isAuthenticated: !1,
            isGuest: !1,
            permissions: [],
          };
        } catch (e) {
          return (
            console.error("Authentication check failed:", e),
            {
              user: null,
              session: null,
              isAuthenticated: !1,
              isGuest: !1,
              permissions: [],
            }
          );
        }
      }
    },
    67761: (e, t, s) => {
      s.d(t, {
        D_: () => a,
        Pc: () => i,
        j1: () => l,
        lR: () => r,
        nl: () => c,
        qQ: () => n,
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
      class a extends r {
        constructor(e = "Authentication required", t) {
          super(e, "auth/unauthorized", t, 401),
            (this.name = "UnauthorizedError");
        }
      }
      class n extends r {
        constructor(e = "Insufficient permissions", t) {
          super(e, "auth/forbidden", t, 403), (this.name = "ForbiddenError");
        }
      }
      class i extends r {
        constructor(e = "Session error", t) {
          super(e, "auth/session-error", t, 400), (this.name = "SessionError");
        }
      }
      class o extends r {
        constructor(e = "Invalid credentials", t) {
          super(e, "auth/invalid-credentials", t, 401),
            (this.name = "InvalidCredentialsError");
        }
      }
      class u extends r {
        constructor(e = "User operation failed", t) {
          super(e, "auth/user-operation-failed", t, 400),
            (this.name = "UserOperationError");
        }
      }
      class l extends r {
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
              return new a(e.message, e);
            case 403:
              return new n(e.message, e);
            case 400:
              if (e.message.includes("credentials")) return new o(e.message, e);
              if (e.message.includes("session")) return new i(e.message, e);
              return new u(e.message, e);
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
  });
//# sourceMappingURL=1190.js.map
