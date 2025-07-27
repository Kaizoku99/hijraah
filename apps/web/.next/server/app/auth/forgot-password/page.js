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
    (e._sentryDebugIds[t] = "cc0b2b43-459b-4cd5-8ca6-20e31620d025"),
    (e._sentryDebugIdIdentifier =
      "sentry-dbid-cc0b2b43-459b-4cd5-8ca6-20e31620d025"));
} catch (e) {}
(() => {
  var e = {};
  (e.id = 9413),
    (e.ids = [9413]),
    (e.modules = {
      3295: (e) => {
        "use strict";
        e.exports = require("next/dist/server/app-render/after-task-async-storage.external.js");
      },
      3519: (e, t, r) => {
        "use strict";
        r.r(t),
          r.d(t, {
            AuthProvider: () => u,
            useAuth: () => d,
            useHasPermission: () => m,
            useHasRole: () => h,
            useIsAuthenticated: () => p,
            useSession: () => f,
            useUser: () => c,
          });
        var s = r(61268),
          i = r(84205),
          o = r(32367),
          a = r(61460);
        function n(e) {
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
              let s = { ...r, ...t };
              return n({
                ...e,
                user_metadata: {
                  ...e.user_metadata,
                  settings_theme: s.theme,
                  settings_language: s.language,
                  settings_emailNotifications: s.emailNotifications,
                  settings_documentReminders: s.documentReminders,
                  settings_applicationUpdates: s.applicationUpdates,
                  settings_twoFactorAuth: s.twoFactorAuth,
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
        let l = (0, i.createContext)(void 0);
        function u({ children: e }) {
          let [t, r] = (0, i.useState)(null),
            [a, u] = (0, i.useState)(null),
            [d, c] = (0, i.useState)(!0),
            p = (0, o.UU)(),
            h = (0, i.useCallback)(async () => {
              try {
                c(!0);
                let {
                  data: { session: e },
                  error: t,
                } = await p.auth.getSession();
                if (t) throw t;
                if (e) {
                  let {
                    data: { user: t },
                    error: s,
                  } = await p.auth.getUser();
                  if (s) throw s;
                  u(e), r(n(t));
                } else u(null), r(null);
              } catch (e) {
                console.error("Error refreshing session:", e), u(null), r(null);
              } finally {
                c(!1);
              }
            }, [p]),
            m = (0, i.useCallback)(
              async (e, t) => {
                c(!0);
                try {
                  if ("email" === e) {
                    if (!t?.email || !t?.password)
                      throw Error(
                        "Email and password required for email sign in",
                      );
                    let { data: e, error: s } = await p.auth.signInWithPassword(
                      { email: t.email, password: t.password },
                    );
                    if (s) throw s;
                    e?.session && (u(e.session), r(n(e.session.user)));
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
                  c(!1);
                }
              },
              [p],
            ),
            f = (0, i.useCallback)(async () => {
              c(!0);
              try {
                let { error: e } = await p.auth.signOut();
                if (e) throw e;
                u(null), r(null);
              } catch (e) {
                console.error("Error signing out:", e);
              } finally {
                c(!1);
              }
            }, [p]),
            g = (0, i.useCallback)(
              async (e) => {
                c(!0);
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
                  c(!1);
                }
              },
              [p],
            ),
            w = (0, i.useCallback)(
              async (e, t) => {
                c(!0);
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
                  c(!1);
                }
              },
              [p],
            ),
            x = (0, i.useCallback)(
              async (e) => {
                c(!0);
                try {
                  let { error: t } = await p.auth.updateUser({ password: e });
                  if (t) throw t;
                  return !0;
                } catch (e) {
                  throw (console.error("Error updating password:", e), e);
                } finally {
                  c(!1);
                }
              },
              [p],
            );
          return (0, s.jsx)(l.Provider, {
            value: {
              user: t,
              session: a,
              isLoading: d,
              isAuthenticated: !!a,
              signIn: m,
              signOut: f,
              refreshSession: h,
              signUp: g,
              resetPassword: w,
              updatePassword: x,
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
        function c() {
          let { user: e } = d();
          return e;
        }
        function p() {
          let { isAuthenticated: e } = d();
          return e;
        }
        function h(e) {
          let t = c();
          return t?.role === e;
        }
        function m(e) {
          let t = c();
          return (0, a._m)(t, e);
        }
        function f() {
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
      8086: (e) => {
        "use strict";
        e.exports = require("module");
      },
      10846: (e) => {
        "use strict";
        e.exports = require("next/dist/compiled/next-server/app-page.runtime.prod.js");
      },
      11997: (e) => {
        "use strict";
        e.exports = require("punycode");
      },
      15090: (e, t, r) => {
        "use strict";
        r.d(t, { d: () => p });
        var s = r(84205);
        let i = {
            ADD_TOAST: "ADD_TOAST",
            UPDATE_TOAST: "UPDATE_TOAST",
            DISMISS_TOAST: "DISMISS_TOAST",
            REMOVE_TOAST: "REMOVE_TOAST",
          },
          o = 0,
          a = new Map(),
          n = (e, t) => {
            switch (t.type) {
              case i.ADD_TOAST:
                return { ...e, toasts: [t.toast, ...e.toasts].slice(0, 5) };
              case i.UPDATE_TOAST:
                return {
                  ...e,
                  toasts: e.toasts.map((e) =>
                    e.id === t.toast.id ? { ...e, ...t.toast } : e,
                  ),
                };
              case i.DISMISS_TOAST: {
                let { toastId: r } = t;
                if (r) a.has(r) && (clearTimeout(a.get(r)), a.delete(r));
                else
                  for (let [e, t] of a.entries()) clearTimeout(t), a.delete(e);
                return {
                  ...e,
                  toasts: e.toasts.map((e) =>
                    e.id === r || void 0 === r ? { ...e, open: !1 } : e,
                  ),
                };
              }
              case i.REMOVE_TOAST:
                if (void 0 === t.toastId) return { ...e, toasts: [] };
                return {
                  ...e,
                  toasts: e.toasts.filter((e) => e.id !== t.toastId),
                };
            }
          },
          l = [],
          u = { toasts: [] };
        function d(e) {
          (u = n(u, e)),
            l.forEach((e) => {
              e(u);
            });
        }
        function c({ ...e }) {
          let t = (o = (o + 1) % Number.MAX_VALUE).toString(),
            r = () => d({ type: i.DISMISS_TOAST, toastId: t });
          return (
            d({
              type: i.ADD_TOAST,
              toast: {
                ...e,
                id: t,
                open: !0,
                onOpenChange: (e) => {
                  e || r();
                },
              },
            }),
            {
              id: t,
              dismiss: r,
              update: (e) =>
                d({ type: i.UPDATE_TOAST, toast: { ...e, id: t } }),
            }
          );
        }
        function p() {
          let [e, t] = s.useState(u);
          return (
            s.useEffect(
              () => (
                l.push(t),
                () => {
                  let e = l.indexOf(t);
                  e > -1 && l.splice(e, 1);
                }
              ),
              [e],
            ),
            {
              ...e,
              toast: c,
              dismiss: (e) => d({ type: i.DISMISS_TOAST, toastId: e }),
            }
          );
        }
      },
      15668: (e) => {
        function t(e) {
          var t = Error("Cannot find module '" + e + "'");
          throw ((t.code = "MODULE_NOT_FOUND"), t);
        }
        (t.keys = () => []), (t.resolve = t), (t.id = 15668), (e.exports = t);
      },
      16979: (e, t, r) => {
        "use strict";
        r.a(e, async (e, s) => {
          try {
            r.d(t, { J: () => l });
            var i = r(61268),
              o = r(30595);
            r(84205);
            var a = r(15942),
              n = e([a]);
            function l({ className: e, ...t }) {
              return (0, i.jsx)(o.b, {
                "data-slot": "label",
                className: (0, a.cn)(
                  "flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
                  e,
                ),
                ...t,
              });
            }
            (a = (n.then ? (await n)() : n)[0]), s();
          } catch (e) {
            s(e);
          }
        });
      },
      19121: (e) => {
        "use strict";
        e.exports = require("next/dist/server/app-render/action-async-storage.external.js");
      },
      19771: (e) => {
        "use strict";
        e.exports = require("process");
      },
      20448: (e, t, r) => {
        "use strict";
        r.a(e, async (e, s) => {
          try {
            r.r(t), r.d(t, { default: () => m });
            var i = r(61268),
              o = r(31655),
              a = r.n(o),
              n = r(84205),
              l = r(16979),
              u = r(15090),
              d = r(3519),
              c = r(28909),
              p = r(78337),
              h = e([l, c, p]);
            function m() {
              let [e, t] = (0, n.useState)(""),
                [r, s] = (0, n.useState)(!1),
                { resetPassword: o } = (0, d.useAuth)(),
                { toast: h } = (0, u.d)(),
                m = async (t) => {
                  t.preventDefault(), s(!0);
                  try {
                    await o(e),
                      h({
                        title: "Check your email",
                        description: "We have sent you a password reset link",
                      });
                  } catch (e) {
                    h({
                      variant: "destructive",
                      title: "Error",
                      description: "Failed to send reset email",
                    });
                  } finally {
                    s(!1);
                  }
                };
              return (0, i.jsx)("div", {
                className:
                  "container flex h-screen w-screen flex-col items-center justify-center",
                children: (0, i.jsxs)("div", {
                  className:
                    "mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]",
                  children: [
                    (0, i.jsxs)("div", {
                      className: "flex flex-col space-y-2 text-center",
                      children: [
                        (0, i.jsx)("h1", {
                          className: "text-2xl font-semibold tracking-tight",
                          children: "Reset your password",
                        }),
                        (0, i.jsx)("p", {
                          className: "text-sm text-muted-foreground",
                          children:
                            "Enter your email address and we will send you a reset link",
                        }),
                      ],
                    }),
                    (0, i.jsxs)("form", {
                      onSubmit: m,
                      className: "space-y-4",
                      children: [
                        (0, i.jsxs)("div", {
                          className: "space-y-2",
                          children: [
                            (0, i.jsx)(l.J, {
                              htmlFor: "email",
                              children: "Email",
                            }),
                            (0, i.jsx)(p.p, {
                              id: "email",
                              type: "email",
                              placeholder: "m@example.com",
                              value: e,
                              onChange: (e) => t(e.target.value),
                              required: !0,
                            }),
                          ],
                        }),
                        (0, i.jsx)(c.$, {
                          type: "submit",
                          className: "w-full",
                          disabled: r,
                          children: r
                            ? "Sending reset link..."
                            : "Send Reset Link",
                        }),
                      ],
                    }),
                    (0, i.jsx)("div", {
                      className: "text-center text-sm",
                      children: (0, i.jsx)(a(), {
                        href: "/auth/login",
                        className: "text-muted-foreground hover:text-primary",
                        children: "Back to login",
                      }),
                    }),
                  ],
                }),
              });
            }
            ([l, c, p] = h.then ? (await h)() : h), s();
          } catch (e) {
            s(e);
          }
        });
      },
      21820: (e) => {
        "use strict";
        e.exports = require("os");
      },
      23473: (e, t, r) => {
        Promise.resolve().then(r.bind(r, 36938));
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
      29294: (e) => {
        "use strict";
        e.exports = require("next/dist/server/app-render/work-async-storage.external.js");
      },
      30595: (e, t, r) => {
        "use strict";
        r.d(t, { b: () => n });
        var s = r(84205),
          i = r(56558),
          o = r(61268),
          a = s.forwardRef((e, t) =>
            (0, o.jsx)(i.sG.label, {
              ...e,
              ref: t,
              onMouseDown: (t) => {
                t.target.closest("button, input, select, textarea") ||
                  (e.onMouseDown?.(t),
                  !t.defaultPrevented && t.detail > 1 && t.preventDefault());
              },
            }),
          );
        a.displayName = "Label";
        var n = a;
      },
      31421: (e) => {
        "use strict";
        e.exports = require("node:child_process");
      },
      32367: (e, t, r) => {
        "use strict";
        let s;
        r.d(t, { AG: () => w, Iw: () => f, UU: () => g });
        var i = r(97713),
          o = r(15149),
          a = r.n(o),
          n = r(84205);
        let { fetch: l } = a()(),
          u = "http://localhost:54321",
          d =
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0",
          c = process.env.SUPABASE_SERVICE_ROLE_KEY,
          p = d ? { apikey: d } : void 0;
        function h() {
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
          e.__USING_PONYFETCH__ ||
            ((e.fetch = l), (e.__USING_PONYFETCH__ = !0));
        }
        function m() {
          return (h(), s)
            ? s
            : (s = (0, i.createBrowserClient)(u, d, {
                global: { headers: p },
              }));
        }
        function f() {
          return (0, n.useMemo)(m, []);
        }
        function g() {
          return (
            h(), (0, i.createBrowserClient)(u, d, { global: { headers: p } })
          );
        }
        let w = m;
        m();
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
      36938: (e, t, r) => {
        "use strict";
        let s;
        r.r(t),
          r.d(t, {
            default: () => h,
            generateImageMetadata: () => c,
            generateMetadata: () => d,
            generateViewport: () => p,
          });
        var i = r(63033),
          o = r(26394),
          a = r(60442),
          n = (0, o.registerClientReference)(
            function () {
              throw Error(
                "Attempted to call the default export of \"E:\\\\downloads\\\\Hijraah\\\\apps\\\\web\\\\src\\\\app\\\\auth\\\\forgot-password\\\\page.tsx\" from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
              );
            },
            "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\auth\\forgot-password\\page.tsx",
            "default",
          );
        let l = { ...i },
          u =
            "workUnitAsyncStorage" in l
              ? l.workUnitAsyncStorage
              : "requestAsyncStorage" in l
                ? l.requestAsyncStorage
                : void 0;
        s =
          "function" == typeof n
            ? new Proxy(n, {
                apply: (e, t, r) => {
                  let s, i, o;
                  try {
                    let e = u?.getStore();
                    (s = e?.headers.get("sentry-trace") ?? void 0),
                      (i = e?.headers.get("baggage") ?? void 0),
                      (o = e?.headers);
                  } catch (e) {}
                  return a
                    .wrapServerComponentWithSentry(e, {
                      componentRoute: "/auth/forgot-password",
                      componentType: "Page",
                      sentryTraceHeader: s,
                      baggageHeader: i,
                      headers: o,
                    })
                    .apply(t, r);
                },
              })
            : n;
        let d = void 0,
          c = void 0,
          p = void 0,
          h = s;
      },
      37067: (e) => {
        "use strict";
        e.exports = require("node:http");
      },
      38522: (e) => {
        "use strict";
        e.exports = require("node:zlib");
      },
      39153: (e, t, r) => {
        Promise.resolve().then(r.bind(r, 20448));
      },
      41692: (e) => {
        "use strict";
        e.exports = require("node:tls");
      },
      44708: (e) => {
        "use strict";
        e.exports = require("node:https");
      },
      48161: (e) => {
        "use strict";
        e.exports = require("node:os");
      },
      53053: (e) => {
        "use strict";
        e.exports = require("node:diagnostics_channel");
      },
      55511: (e) => {
        "use strict";
        e.exports = require("crypto");
      },
      55591: (e) => {
        "use strict";
        e.exports = require("https");
      },
      56558: (e, t, r) => {
        "use strict";
        r.d(t, { hO: () => l, sG: () => n });
        var s = r(84205),
          i = r(90304),
          o = r(86415),
          a = r(61268),
          n = [
            "a",
            "button",
            "div",
            "form",
            "h2",
            "h3",
            "img",
            "input",
            "label",
            "li",
            "nav",
            "ol",
            "p",
            "select",
            "span",
            "svg",
            "ul",
          ].reduce((e, t) => {
            let r = (0, o.TL)(`Primitive.${t}`),
              i = s.forwardRef((e, s) => {
                let { asChild: i, ...o } = e;
                return (
                  "undefined" != typeof window &&
                    (window[Symbol.for("radix-ui")] = !0),
                  (0, a.jsx)(i ? r : t, { ...o, ref: s })
                );
              });
            return (i.displayName = `Primitive.${t}`), { ...e, [t]: i };
          }, {});
        function l(e, t) {
          e && i.flushSync(() => e.dispatchEvent(t));
        }
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
        class s extends Error {
          constructor(e, t, r, s) {
            super(e),
              (this.name = "AuthError"),
              (this.code = t),
              (this.status = s),
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
        class i extends s {
          constructor(e = "Authentication required", t) {
            super(e, "auth/unauthorized", t, 401),
              (this.name = "UnauthorizedError");
          }
        }
        class o extends s {
          constructor(e = "Insufficient permissions", t) {
            super(e, "auth/forbidden", t, 403), (this.name = "ForbiddenError");
          }
        }
        class a extends s {
          constructor(e = "Session error", t) {
            super(e, "auth/session-error", t, 400),
              (this.name = "SessionError");
          }
        }
        class n extends s {
          constructor(e = "Invalid credentials", t) {
            super(e, "auth/invalid-credentials", t, 401),
              (this.name = "InvalidCredentialsError");
          }
        }
        class l extends s {
          constructor(e = "User operation failed", t) {
            super(e, "auth/user-operation-failed", t, 400),
              (this.name = "UserOperationError");
          }
        }
        let u = { roles: {}, superAdminRole: "admin", enableCache: !0 };
        class d {
          constructor(e = {}) {
            this.permissionCache = new Map();
            let t = { ...u, ...e };
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
            let s = new Set(r.permissions);
            if (r.inherits && r.inherits.length > 0)
              for (let e of r.inherits)
                this.getRolePermissions(e, t).forEach((e) => s.add(e));
            return s;
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
            let s = t.split(":");
            for (let e = 1; e <= s.length; e++) {
              let t = [...s.slice(0, e), "*"].join(":");
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
              throw new o(`Missing required permission: ${t}`);
          }
          enforceAnyPermission(e, t) {
            if (!this.hasAnyPermission(e, t))
              throw new o(
                `Missing at least one of the required permissions: ${t.join(", ")}`,
              );
          }
          enforceAllPermissions(e, t) {
            if (!this.hasAllPermissions(e, t))
              throw new o(
                `Missing some of the required permissions: ${t.join(", ")}`,
              );
          }
          createPermission(e, t) {
            return `${e}:${t}`;
          }
        }
        let c = null;
        function p(e, t) {
          var r;
          return (c || (c = new d(void 0)), c).hasPermission(e, t);
        }
      },
      63033: (e) => {
        "use strict";
        e.exports = require("next/dist/server/app-render/work-unit-async-storage.external.js");
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
      77598: (e) => {
        "use strict";
        e.exports = require("node:crypto");
      },
      78337: (e, t, r) => {
        "use strict";
        r.a(e, async (e, s) => {
          try {
            r.d(t, { p: () => n });
            var i = r(61268);
            r(84205);
            var o = r(15942),
              a = e([o]);
            function n({ className: e, type: t, ...r }) {
              return (0, i.jsx)("input", {
                type: t,
                "data-slot": "input",
                className: (0, o.cn)(
                  "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
                  "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
                  "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
                  e,
                ),
                ...r,
              });
            }
            (o = (a.then ? (await a)() : a)[0]), s();
          } catch (e) {
            s(e);
          }
        });
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
      83997: (e) => {
        "use strict";
        e.exports = require("tty");
      },
      84004: (e, t, r) => {
        "use strict";
        r.r(t),
          r.d(t, {
            GlobalError: () => o.default,
            __next_app__: () => d,
            pages: () => u,
            routeModule: () => c,
            tree: () => l,
          });
        var s = r(11610),
          i = r(51293),
          o = r(59059),
          a = r(17770),
          n = {};
        for (let e in a)
          0 >
            [
              "default",
              "tree",
              "pages",
              "GlobalError",
              "__next_app__",
              "routeModule",
            ].indexOf(e) && (n[e] = () => a[e]);
        r.d(t, n);
        let l = {
            children: [
              "",
              {
                children: [
                  "auth",
                  {
                    children: [
                      "forgot-password",
                      {
                        children: [
                          "__PAGE__",
                          {},
                          {
                            page: [
                              () => Promise.resolve().then(r.bind(r, 36938)),
                              "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\auth\\forgot-password\\page.tsx",
                            ],
                          },
                        ],
                      },
                      {},
                    ],
                  },
                  {},
                ],
              },
              {
                layout: [
                  () => Promise.resolve().then(r.bind(r, 22630)),
                  "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\layout.tsx",
                ],
                error: [
                  () => Promise.resolve().then(r.bind(r, 94745)),
                  "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\error.tsx",
                ],
                "global-error": [
                  () => Promise.resolve().then(r.bind(r, 59059)),
                  "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\global-error.tsx",
                ],
                "not-found": [
                  () => Promise.resolve().then(r.bind(r, 53974)),
                  "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\not-found.tsx",
                ],
                forbidden: [
                  () => Promise.resolve().then(r.t.bind(r, 57382, 23)),
                  "next/dist/client/components/forbidden-error",
                ],
                unauthorized: [
                  () => Promise.resolve().then(r.t.bind(r, 87039, 23)),
                  "next/dist/client/components/unauthorized-error",
                ],
              },
            ],
          }.children,
          u = [
            "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\auth\\forgot-password\\page.tsx",
          ],
          d = { require: r, loadChunk: () => Promise.resolve() },
          c = new s.AppPageRouteModule({
            definition: {
              kind: i.RouteKind.APP_PAGE,
              page: "/auth/forgot-password/page",
              pathname: "/auth/forgot-password",
              bundlePath: "",
              filename: "",
              appPaths: [],
            },
            userland: { loaderTree: l },
          });
      },
      84297: (e) => {
        "use strict";
        e.exports = require("async_hooks");
      },
      85488: (e) => {
        "use strict";
        e.exports = import("ai");
      },
      86592: (e) => {
        "use strict";
        e.exports = require("node:inspector");
      },
      91645: (e) => {
        "use strict";
        e.exports = require("net");
      },
      94735: (e) => {
        "use strict";
        e.exports = require("events");
      },
    });
  var t = require("../../../webpack-runtime.js");
  t.C(e);
  var r = (e) => t((t.s = e)),
    s = t.X(0, [827, 6518, 2033, 4027, 2872, 7713, 5149, 1655, 4630], () =>
      r(84004),
    );
  module.exports = s;
})();
//# sourceMappingURL=page.js.map
