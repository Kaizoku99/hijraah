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
    (e._sentryDebugIds[t] = "2f881722-0ab8-4428-aa63-a46a5a24d723"),
    (e._sentryDebugIdIdentifier =
      "sentry-dbid-2f881722-0ab8-4428-aa63-a46a5a24d723"));
} catch (e) {}
(() => {
  var e = {};
  (e.id = 4748),
    (e.ids = [4748]),
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
            useHasRole: () => p,
            useIsAuthenticated: () => h,
            useSession: () => f,
            useUser: () => c,
          });
        var s = r(61268),
          i = r(84205),
          n = r(32367),
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
              let s = { ...r, ...t };
              return o({
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
            h = (0, n.UU)(),
            p = (0, i.useCallback)(async () => {
              try {
                c(!0);
                let {
                  data: { session: e },
                  error: t,
                } = await h.auth.getSession();
                if (t) throw t;
                if (e) {
                  let {
                    data: { user: t },
                    error: s,
                  } = await h.auth.getUser();
                  if (s) throw s;
                  u(e), r(o(t));
                } else u(null), r(null);
              } catch (e) {
                console.error("Error refreshing session:", e), u(null), r(null);
              } finally {
                c(!1);
              }
            }, [h]),
            m = (0, i.useCallback)(
              async (e, t) => {
                c(!0);
                try {
                  if ("email" === e) {
                    if (!t?.email || !t?.password)
                      throw Error(
                        "Email and password required for email sign in",
                      );
                    let { data: e, error: s } = await h.auth.signInWithPassword(
                      { email: t.email, password: t.password },
                    );
                    if (s) throw s;
                    e?.session && (u(e.session), r(o(e.session.user)));
                  } else {
                    let { error: r } = await h.auth.signInWithOAuth({
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
              [h],
            ),
            f = (0, i.useCallback)(async () => {
              c(!0);
              try {
                let { error: e } = await h.auth.signOut();
                if (e) throw e;
                u(null), r(null);
              } catch (e) {
                console.error("Error signing out:", e);
              } finally {
                c(!1);
              }
            }, [h]),
            x = (0, i.useCallback)(
              async (e) => {
                c(!0);
                try {
                  if (!e.email || !e.password)
                    throw Error("Email and password required for sign up");
                  let { data: t, error: r } = await h.auth.signUp({
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
              [h],
            ),
            g = (0, i.useCallback)(
              async (e, t) => {
                c(!0);
                try {
                  let { error: r } = await h.auth.resetPasswordForEmail(e, {
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
              [h],
            ),
            v = (0, i.useCallback)(
              async (e) => {
                c(!0);
                try {
                  let { error: t } = await h.auth.updateUser({ password: e });
                  if (t) throw t;
                  return !0;
                } catch (e) {
                  throw (console.error("Error updating password:", e), e);
                } finally {
                  c(!1);
                }
              },
              [h],
            );
          return (0, s.jsx)(l.Provider, {
            value: {
              user: t,
              session: a,
              isLoading: d,
              isAuthenticated: !!a,
              signIn: m,
              signOut: f,
              refreshSession: p,
              signUp: x,
              resetPassword: g,
              updatePassword: v,
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
        function h() {
          let { isAuthenticated: e } = d();
          return e;
        }
        function p(e) {
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
      5451: (e, t, r) => {
        "use strict";
        r.a(e, async (e, s) => {
          try {
            r.d(t, {
              BT: () => h,
              Wu: () => p,
              ZB: () => c,
              Zp: () => u,
              aR: () => d,
              wL: () => m,
            });
            var i = r(61268),
              n = r(55728),
              a = r(84205),
              o = r(15942),
              l = e([o]);
            o = (l.then ? (await l)() : l)[0];
            let u = a.forwardRef(({ className: e, ...t }, r) =>
              (0, i.jsx)(n.P.div, {
                ref: r,
                className: (0, o.cn)(
                  "rounded-lg border bg-card text-card-foreground shadow-sm",
                  e,
                ),
                whileHover: {
                  scale: 1.03,
                  boxShadow:
                    "0px 7px 25px rgba(0,0,0,0.08), 0px 3px 10px rgba(0,0,0,0.04)",
                },
                transition: { type: "spring", stiffness: 300, damping: 20 },
                ...t,
              }),
            );
            u.displayName = "Card";
            let d = a.forwardRef(({ className: e, ...t }, r) =>
              (0, i.jsx)("div", {
                ref: r,
                className: (0, o.cn)("flex flex-col space-y-1.5 p-6", e),
                ...t,
              }),
            );
            d.displayName = "CardHeader";
            let c = a.forwardRef(({ className: e, ...t }, r) =>
              (0, i.jsx)("h3", {
                ref: r,
                className: (0, o.cn)(
                  "text-2xl font-semibold leading-none tracking-tight",
                  e,
                ),
                ...t,
              }),
            );
            c.displayName = "CardTitle";
            let h = a.forwardRef(({ className: e, ...t }, r) =>
              (0, i.jsx)("p", {
                ref: r,
                className: (0, o.cn)("text-sm text-muted-foreground", e),
                ...t,
              }),
            );
            h.displayName = "CardDescription";
            let p = a.forwardRef(({ className: e, ...t }, r) =>
              (0, i.jsx)("div", {
                ref: r,
                className: (0, o.cn)("p-6 pt-0", e),
                ...t,
              }),
            );
            p.displayName = "CardContent";
            let m = a.forwardRef(({ className: e, ...t }, r) =>
              (0, i.jsx)("div", {
                ref: r,
                className: (0, o.cn)("flex items-center p-6 pt-0", e),
                ...t,
              }),
            );
            (m.displayName = "CardFooter"), s();
          } catch (e) {
            s(e);
          }
        });
      },
      7839: (e, t, r) => {
        "use strict";
        r.d(t, { jH: () => n });
        var s = r(84205);
        r(61268);
        var i = s.createContext(void 0);
        function n(e) {
          let t = s.useContext(i);
          return e || t || "ltr";
        }
      },
      8086: (e) => {
        "use strict";
        e.exports = require("module");
      },
      10308: (e, t, r) => {
        "use strict";
        r.d(t, { c: () => i });
        var s = r(84205);
        function i(e) {
          let t = s.useRef(e);
          return (
            s.useEffect(() => {
              t.current = e;
            }),
            s.useMemo(
              () =>
                (...e) =>
                  t.current?.(...e),
              [],
            )
          );
        }
      },
      10846: (e) => {
        "use strict";
        e.exports = require("next/dist/compiled/next-server/app-page.runtime.prod.js");
      },
      11767: (e, t, r) => {
        "use strict";
        let s;
        r.r(t),
          r.d(t, {
            default: () => p,
            generateImageMetadata: () => c,
            generateMetadata: () => d,
            generateViewport: () => h,
          });
        var i = r(63033),
          n = r(26394),
          a = r(60442),
          o = (0, n.registerClientReference)(
            function () {
              throw Error(
                "Attempted to call the default export of \"E:\\\\downloads\\\\Hijraah\\\\apps\\\\web\\\\src\\\\app\\\\(auth)\\\\auth-test\\\\page.tsx\" from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
              );
            },
            "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\(auth)\\auth-test\\page.tsx",
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
          "function" == typeof o
            ? new Proxy(o, {
                apply: (e, t, r) => {
                  let s, i, n;
                  try {
                    let e = u?.getStore();
                    (s = e?.headers.get("sentry-trace") ?? void 0),
                      (i = e?.headers.get("baggage") ?? void 0),
                      (n = e?.headers);
                  } catch (e) {}
                  return a
                    .wrapServerComponentWithSentry(e, {
                      componentRoute: "/(auth)/auth-test",
                      componentType: "Page",
                      sentryTraceHeader: s,
                      baggageHeader: i,
                      headers: n,
                    })
                    .apply(t, r);
                },
              })
            : o;
        let d = void 0,
          c = void 0,
          h = void 0,
          p = s;
      },
      11997: (e) => {
        "use strict";
        e.exports = require("punycode");
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
      27910: (e) => {
        "use strict";
        e.exports = require("stream");
      },
      28354: (e) => {
        "use strict";
        e.exports = require("util");
      },
      28366: (e, t, r) => {
        "use strict";
        r.d(t, { B8: () => P, UC: () => T, bL: () => E, l9: () => S });
        var s = r(84205),
          i = r(28777),
          n = r(18047),
          a = r(59150),
          o = r(94653),
          l = r(78593),
          u = r(7839),
          d = r(48705),
          c = r(42414),
          h = r(61268),
          p = "Tabs",
          [m, f] = (0, n.A)(p, [a.RG]),
          x = (0, a.RG)(),
          [g, v] = m(p),
          b = s.forwardRef((e, t) => {
            let {
                __scopeTabs: r,
                value: s,
                onValueChange: i,
                defaultValue: n,
                orientation: a = "horizontal",
                dir: o,
                activationMode: m = "automatic",
                ...f
              } = e,
              x = (0, u.jH)(o),
              [v, b] = (0, d.i)({
                prop: s,
                onChange: i,
                defaultProp: n ?? "",
                caller: p,
              });
            return (0, h.jsx)(g, {
              scope: r,
              baseId: (0, c.B)(),
              value: v,
              onValueChange: b,
              orientation: a,
              dir: x,
              activationMode: m,
              children: (0, h.jsx)(l.sG.div, {
                dir: x,
                "data-orientation": a,
                ...f,
                ref: t,
              }),
            });
          });
        b.displayName = p;
        var w = "TabsList",
          y = s.forwardRef((e, t) => {
            let { __scopeTabs: r, loop: s = !0, ...i } = e,
              n = v(w, r),
              o = x(r);
            return (0, h.jsx)(a.bL, {
              asChild: !0,
              ...o,
              orientation: n.orientation,
              dir: n.dir,
              loop: s,
              children: (0, h.jsx)(l.sG.div, {
                role: "tablist",
                "aria-orientation": n.orientation,
                ...i,
                ref: t,
              }),
            });
          });
        y.displayName = w;
        var j = "TabsTrigger",
          _ = s.forwardRef((e, t) => {
            let { __scopeTabs: r, value: s, disabled: n = !1, ...o } = e,
              u = v(j, r),
              d = x(r),
              c = A(u.baseId, s),
              p = R(u.baseId, s),
              m = s === u.value;
            return (0, h.jsx)(a.q7, {
              asChild: !0,
              ...d,
              focusable: !n,
              active: m,
              children: (0, h.jsx)(l.sG.button, {
                type: "button",
                role: "tab",
                "aria-selected": m,
                "aria-controls": p,
                "data-state": m ? "active" : "inactive",
                "data-disabled": n ? "" : void 0,
                disabled: n,
                id: c,
                ...o,
                ref: t,
                onMouseDown: (0, i.m)(e.onMouseDown, (e) => {
                  n || 0 !== e.button || !1 !== e.ctrlKey
                    ? e.preventDefault()
                    : u.onValueChange(s);
                }),
                onKeyDown: (0, i.m)(e.onKeyDown, (e) => {
                  [" ", "Enter"].includes(e.key) && u.onValueChange(s);
                }),
                onFocus: (0, i.m)(e.onFocus, () => {
                  let e = "manual" !== u.activationMode;
                  m || n || !e || u.onValueChange(s);
                }),
              }),
            });
          });
        _.displayName = j;
        var C = "TabsContent",
          N = s.forwardRef((e, t) => {
            let {
                __scopeTabs: r,
                value: i,
                forceMount: n,
                children: a,
                ...u
              } = e,
              d = v(C, r),
              c = A(d.baseId, i),
              p = R(d.baseId, i),
              m = i === d.value,
              f = s.useRef(m);
            return (
              s.useEffect(() => {
                let e = requestAnimationFrame(() => (f.current = !1));
                return () => cancelAnimationFrame(e);
              }, []),
              (0, h.jsx)(o.C, {
                present: n || m,
                children: ({ present: r }) =>
                  (0, h.jsx)(l.sG.div, {
                    "data-state": m ? "active" : "inactive",
                    "data-orientation": d.orientation,
                    role: "tabpanel",
                    "aria-labelledby": c,
                    hidden: !r,
                    id: p,
                    tabIndex: 0,
                    ...u,
                    ref: t,
                    style: {
                      ...e.style,
                      animationDuration: f.current ? "0s" : void 0,
                    },
                    children: r && a,
                  }),
              })
            );
          });
        function A(e, t) {
          return `${e}-trigger-${t}`;
        }
        function R(e, t) {
          return `${e}-content-${t}`;
        }
        N.displayName = C;
        var E = b,
          P = y,
          S = _,
          T = N;
      },
      29021: (e) => {
        "use strict";
        e.exports = require("fs");
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
        let s;
        r.d(t, { AG: () => g, Iw: () => f, UU: () => x });
        var i = r(97713),
          n = r(15149),
          a = r.n(n),
          o = r(84205);
        let { fetch: l } = a()(),
          u = "http://localhost:54321",
          d =
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0",
          c = process.env.SUPABASE_SERVICE_ROLE_KEY,
          h = d ? { apikey: d } : void 0;
        function p() {
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
          return (p(), s)
            ? s
            : (s = (0, i.createBrowserClient)(u, d, {
                global: { headers: h },
              }));
        }
        function f() {
          return (0, o.useMemo)(m, []);
        }
        function x() {
          return (
            p(), (0, i.createBrowserClient)(u, d, { global: { headers: h } })
          );
        }
        let g = m;
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
      37067: (e) => {
        "use strict";
        e.exports = require("node:http");
      },
      38240: (e, t, r) => {
        Promise.resolve().then(r.bind(r, 44073));
      },
      38522: (e) => {
        "use strict";
        e.exports = require("node:zlib");
      },
      41692: (e) => {
        "use strict";
        e.exports = require("node:tls");
      },
      42414: (e, t, r) => {
        "use strict";
        r.d(t, { B: () => l });
        var s,
          i = r(84205),
          n = r(66130),
          a =
            (s || (s = r.t(i, 2)))[" useId ".trim().toString()] ||
            (() => void 0),
          o = 0;
        function l(e) {
          let [t, r] = i.useState(a());
          return (
            (0, n.N)(() => {
              e || r((e) => e ?? String(o++));
            }, [e]),
            e || (t ? `radix-${t}` : "")
          );
        }
      },
      44073: (e, t, r) => {
        "use strict";
        r.a(e, async (e, s) => {
          try {
            r.r(t), r.d(t, { default: () => h });
            var i = r(61268),
              n = r(84205),
              a = r(3519),
              o = r(61460),
              l = r(28909),
              u = r(5451),
              d = r(77001),
              c = e([l, u, d]);
            function h() {
              let e = (0, a.useAuth)(),
                t = (0, a.useUser)(),
                r = (0, a.useIsAuthenticated)(),
                s = (0, a.useHasRole)("admin"),
                [c, h] = (0, n.useState)(""),
                [p, m] = (0, n.useState)(""),
                [f, x] = (0, n.useState)(null),
                [g, v] = (0, n.useState)(""),
                b = !!t && (0, o._m)(t, "users:view"),
                w = async () => {
                  try {
                    let t = await e.signIn({ email: c, password: p });
                    x({ success: !0, data: t });
                  } catch (e) {
                    x({ success: !1, error: e });
                  }
                },
                y = async () => {
                  try {
                    await e.signOut(),
                      x({ success: !0, message: "Signed out successfully" });
                  } catch (e) {
                    x({ success: !1, error: e });
                  }
                };
              return (0, i.jsxs)("div", {
                className: "container mx-auto py-10",
                children: [
                  (0, i.jsx)("h1", {
                    className: "text-3xl font-bold mb-8 text-center",
                    children: "Auth System Test Page",
                  }),
                  (0, i.jsxs)(d.Tabs, {
                    defaultValue: "status",
                    children: [
                      (0, i.jsxs)(d.TabsList, {
                        className: "grid w-full grid-cols-4",
                        children: [
                          (0, i.jsx)(d.TabsTrigger, {
                            value: "status",
                            children: "Auth Status",
                          }),
                          (0, i.jsx)(d.TabsTrigger, {
                            value: "signin",
                            children: "Sign In",
                          }),
                          (0, i.jsx)(d.TabsTrigger, {
                            value: "permissions",
                            children: "Permissions",
                          }),
                          (0, i.jsx)(d.TabsTrigger, {
                            value: "debug",
                            children: "Debug",
                          }),
                        ],
                      }),
                      (0, i.jsx)(d.TabsContent, {
                        value: "status",
                        children: (0, i.jsxs)(u.Zp, {
                          children: [
                            (0, i.jsxs)(u.aR, {
                              children: [
                                (0, i.jsx)(u.ZB, {
                                  children: "Authentication Status",
                                }),
                                (0, i.jsx)(u.BT, {
                                  children:
                                    "Current user authentication information",
                                }),
                              ],
                            }),
                            (0, i.jsx)(u.Wu, {
                              children: (0, i.jsxs)("div", {
                                className: "space-y-4",
                                children: [
                                  (0, i.jsxs)("div", {
                                    children: [
                                      (0, i.jsx)("strong", {
                                        children: "Authenticated:",
                                      }),
                                      " ",
                                      r ? "✅ Yes" : "❌ No",
                                    ],
                                  }),
                                  t &&
                                    (0, i.jsxs)(i.Fragment, {
                                      children: [
                                        (0, i.jsxs)("div", {
                                          children: [
                                            (0, i.jsx)("strong", {
                                              children: "User ID:",
                                            }),
                                            " ",
                                            t.id,
                                          ],
                                        }),
                                        (0, i.jsxs)("div", {
                                          children: [
                                            (0, i.jsx)("strong", {
                                              children: "Email:",
                                            }),
                                            " ",
                                            t.email,
                                          ],
                                        }),
                                        (0, i.jsxs)("div", {
                                          children: [
                                            (0, i.jsx)("strong", {
                                              children: "Name:",
                                            }),
                                            " ",
                                            t.user_metadata?.full_name ||
                                              "Not set",
                                          ],
                                        }),
                                        (0, i.jsxs)("div", {
                                          children: [
                                            (0, i.jsx)("strong", {
                                              children: "Role:",
                                            }),
                                            " ",
                                            t.user_metadata?.role || "Not set",
                                          ],
                                        }),
                                        (0, i.jsxs)("div", {
                                          children: [
                                            (0, i.jsx)("strong", {
                                              children: "Is Admin:",
                                            }),
                                            " ",
                                            s ? "✅ Yes" : "❌ No",
                                          ],
                                        }),
                                        (0, i.jsxs)("div", {
                                          children: [
                                            (0, i.jsx)("strong", {
                                              children: "Can Access Users:",
                                            }),
                                            " ",
                                            b ? "✅ Yes" : "❌ No",
                                          ],
                                        }),
                                      ],
                                    }),
                                ],
                              }),
                            }),
                            (0, i.jsx)(u.wL, {
                              children: r
                                ? (0, i.jsx)(l.$, {
                                    onClick: y,
                                    variant: "destructive",
                                    children: "Sign Out",
                                  })
                                : (0, i.jsx)(l.$, {
                                    disabled: !0,
                                    children: "Not Signed In",
                                  }),
                            }),
                          ],
                        }),
                      }),
                      (0, i.jsx)(d.TabsContent, {
                        value: "signin",
                        children: (0, i.jsxs)(u.Zp, {
                          children: [
                            (0, i.jsxs)(u.aR, {
                              children: [
                                (0, i.jsx)(u.ZB, { children: "Sign In" }),
                                (0, i.jsx)(u.BT, {
                                  children: "Test signing in with credentials",
                                }),
                              ],
                            }),
                            (0, i.jsx)(u.Wu, {
                              children: (0, i.jsxs)("div", {
                                className: "space-y-4",
                                children: [
                                  (0, i.jsxs)("div", {
                                    className: "space-y-2",
                                    children: [
                                      (0, i.jsx)("label", {
                                        className: "text-sm font-medium",
                                        children: "Email",
                                      }),
                                      (0, i.jsx)("input", {
                                        type: "email",
                                        value: c,
                                        onChange: (e) => h(e.target.value),
                                        className:
                                          "w-full p-2 border rounded-md",
                                        placeholder: "email@example.com",
                                      }),
                                    ],
                                  }),
                                  (0, i.jsxs)("div", {
                                    className: "space-y-2",
                                    children: [
                                      (0, i.jsx)("label", {
                                        className: "text-sm font-medium",
                                        children: "Password",
                                      }),
                                      (0, i.jsx)("input", {
                                        type: "password",
                                        value: p,
                                        onChange: (e) => m(e.target.value),
                                        className:
                                          "w-full p-2 border rounded-md",
                                      }),
                                    ],
                                  }),
                                ],
                              }),
                            }),
                            (0, i.jsx)(u.wL, {
                              children: (0, i.jsx)(l.$, {
                                onClick: w,
                                children: "Sign In",
                              }),
                            }),
                          ],
                        }),
                      }),
                      (0, i.jsx)(d.TabsContent, {
                        value: "permissions",
                        children: (0, i.jsxs)(u.Zp, {
                          children: [
                            (0, i.jsxs)(u.aR, {
                              children: [
                                (0, i.jsx)(u.ZB, {
                                  children: "Test Permissions",
                                }),
                                (0, i.jsx)(u.BT, {
                                  children:
                                    "Check if the current user has specific permissions",
                                }),
                              ],
                            }),
                            (0, i.jsx)(u.Wu, {
                              children: (0, i.jsxs)("div", {
                                className: "space-y-4",
                                children: [
                                  (0, i.jsxs)("div", {
                                    className: "space-y-2",
                                    children: [
                                      (0, i.jsx)("label", {
                                        className: "text-sm font-medium",
                                        children: "Permission",
                                      }),
                                      (0, i.jsx)("input", {
                                        type: "text",
                                        value: g,
                                        onChange: (e) => v(e.target.value),
                                        className:
                                          "w-full p-2 border rounded-md",
                                        placeholder: "e.g. users:view",
                                      }),
                                    ],
                                  }),
                                  (0, i.jsx)("div", {
                                    children: (0, i.jsx)("p", {
                                      className: "text-sm text-gray-500",
                                      children:
                                        "Examples: users:view, applications:manage, system:settings",
                                    }),
                                  }),
                                ],
                              }),
                            }),
                            (0, i.jsx)(u.wL, {
                              children: (0, i.jsx)(l.$, {
                                onClick: () => {
                                  try {
                                    let e = !!t && (0, o._m)(t, g);
                                    x({
                                      success: !0,
                                      message: `Permission check: ${g}`,
                                      hasAccess: e,
                                    });
                                  } catch (e) {
                                    x({ success: !1, error: e });
                                  }
                                },
                                disabled: !r,
                                children: "Test Permission",
                              }),
                            }),
                          ],
                        }),
                      }),
                      (0, i.jsx)(d.TabsContent, {
                        value: "debug",
                        children: (0, i.jsxs)(u.Zp, {
                          children: [
                            (0, i.jsxs)(u.aR, {
                              children: [
                                (0, i.jsx)(u.ZB, {
                                  children: "Debug Information",
                                }),
                                (0, i.jsx)(u.BT, {
                                  children: "Raw data and operation results",
                                }),
                              ],
                            }),
                            (0, i.jsx)(u.Wu, {
                              children: (0, i.jsxs)("div", {
                                className: "space-y-4",
                                children: [
                                  (0, i.jsxs)("div", {
                                    children: [
                                      (0, i.jsx)("strong", {
                                        children: "Last Operation Result:",
                                      }),
                                      (0, i.jsx)("pre", {
                                        className:
                                          "mt-2 p-4 bg-gray-100 rounded-md overflow-auto max-h-60",
                                        children: f
                                          ? JSON.stringify(f, null, 2)
                                          : "No operations performed yet",
                                      }),
                                    ],
                                  }),
                                  (0, i.jsxs)("div", {
                                    children: [
                                      (0, i.jsx)("strong", {
                                        children: "User Object:",
                                      }),
                                      (0, i.jsx)("pre", {
                                        className:
                                          "mt-2 p-4 bg-gray-100 rounded-md overflow-auto max-h-60",
                                        children: t
                                          ? JSON.stringify(t, null, 2)
                                          : "No user data",
                                      }),
                                    ],
                                  }),
                                ],
                              }),
                            }),
                          ],
                        }),
                      }),
                    ],
                  }),
                ],
              });
            }
            ([l, u, d] = c.then ? (await c)() : c), s();
          } catch (e) {
            s(e);
          }
        });
      },
      44708: (e) => {
        "use strict";
        e.exports = require("node:https");
      },
      48161: (e) => {
        "use strict";
        e.exports = require("node:os");
      },
      51392: (e, t, r) => {
        Promise.resolve().then(r.bind(r, 11767));
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
      57075: (e) => {
        "use strict";
        e.exports = require("node:stream");
      },
      57975: (e) => {
        "use strict";
        e.exports = require("node:util");
      },
      59150: (e, t, r) => {
        "use strict";
        r.d(t, { RG: () => y, bL: () => S, q7: () => T });
        var s = r(84205),
          i = r(28777),
          n = r(28029),
          a = r(71604),
          o = r(18047),
          l = r(42414),
          u = r(78593),
          d = r(10308),
          c = r(48705),
          h = r(7839),
          p = r(61268),
          m = "rovingFocusGroup.onEntryFocus",
          f = { bubbles: !1, cancelable: !0 },
          x = "RovingFocusGroup",
          [g, v, b] = (0, n.N)(x),
          [w, y] = (0, o.A)(x, [b]),
          [j, _] = w(x),
          C = s.forwardRef((e, t) =>
            (0, p.jsx)(g.Provider, {
              scope: e.__scopeRovingFocusGroup,
              children: (0, p.jsx)(g.Slot, {
                scope: e.__scopeRovingFocusGroup,
                children: (0, p.jsx)(N, { ...e, ref: t }),
              }),
            }),
          );
        C.displayName = x;
        var N = s.forwardRef((e, t) => {
            let {
                __scopeRovingFocusGroup: r,
                orientation: n,
                loop: o = !1,
                dir: l,
                currentTabStopId: g,
                defaultCurrentTabStopId: b,
                onCurrentTabStopIdChange: w,
                onEntryFocus: y,
                preventScrollOnEntryFocus: _ = !1,
                ...C
              } = e,
              N = s.useRef(null),
              A = (0, a.s)(t, N),
              R = (0, h.jH)(l),
              [E, S] = (0, c.i)({
                prop: g,
                defaultProp: b ?? null,
                onChange: w,
                caller: x,
              }),
              [T, I] = s.useState(!1),
              q = (0, d.c)(y),
              k = v(r),
              U = s.useRef(!1),
              [F, D] = s.useState(0);
            return (
              s.useEffect(() => {
                let e = N.current;
                if (e)
                  return (
                    e.addEventListener(m, q), () => e.removeEventListener(m, q)
                  );
              }, [q]),
              (0, p.jsx)(j, {
                scope: r,
                orientation: n,
                dir: R,
                loop: o,
                currentTabStopId: E,
                onItemFocus: s.useCallback((e) => S(e), [S]),
                onItemShiftTab: s.useCallback(() => I(!0), []),
                onFocusableItemAdd: s.useCallback(() => D((e) => e + 1), []),
                onFocusableItemRemove: s.useCallback(() => D((e) => e - 1), []),
                children: (0, p.jsx)(u.sG.div, {
                  tabIndex: T || 0 === F ? -1 : 0,
                  "data-orientation": n,
                  ...C,
                  ref: A,
                  style: { outline: "none", ...e.style },
                  onMouseDown: (0, i.m)(e.onMouseDown, () => {
                    U.current = !0;
                  }),
                  onFocus: (0, i.m)(e.onFocus, (e) => {
                    let t = !U.current;
                    if (e.target === e.currentTarget && t && !T) {
                      let t = new CustomEvent(m, f);
                      if (
                        (e.currentTarget.dispatchEvent(t), !t.defaultPrevented)
                      ) {
                        let e = k().filter((e) => e.focusable);
                        P(
                          [
                            e.find((e) => e.active),
                            e.find((e) => e.id === E),
                            ...e,
                          ]
                            .filter(Boolean)
                            .map((e) => e.ref.current),
                          _,
                        );
                      }
                    }
                    U.current = !1;
                  }),
                  onBlur: (0, i.m)(e.onBlur, () => I(!1)),
                }),
              })
            );
          }),
          A = "RovingFocusGroupItem",
          R = s.forwardRef((e, t) => {
            let {
                __scopeRovingFocusGroup: r,
                focusable: n = !0,
                active: a = !1,
                tabStopId: o,
                children: d,
                ...c
              } = e,
              h = (0, l.B)(),
              m = o || h,
              f = _(A, r),
              x = f.currentTabStopId === m,
              b = v(r),
              {
                onFocusableItemAdd: w,
                onFocusableItemRemove: y,
                currentTabStopId: j,
              } = f;
            return (
              s.useEffect(() => {
                if (n) return w(), () => y();
              }, [n, w, y]),
              (0, p.jsx)(g.ItemSlot, {
                scope: r,
                id: m,
                focusable: n,
                active: a,
                children: (0, p.jsx)(u.sG.span, {
                  tabIndex: x ? 0 : -1,
                  "data-orientation": f.orientation,
                  ...c,
                  ref: t,
                  onMouseDown: (0, i.m)(e.onMouseDown, (e) => {
                    n ? f.onItemFocus(m) : e.preventDefault();
                  }),
                  onFocus: (0, i.m)(e.onFocus, () => f.onItemFocus(m)),
                  onKeyDown: (0, i.m)(e.onKeyDown, (e) => {
                    if ("Tab" === e.key && e.shiftKey)
                      return void f.onItemShiftTab();
                    if (e.target !== e.currentTarget) return;
                    let t = (function (e, t, r) {
                      var s;
                      let i =
                        ((s = e.key),
                        "rtl" !== r
                          ? s
                          : "ArrowLeft" === s
                            ? "ArrowRight"
                            : "ArrowRight" === s
                              ? "ArrowLeft"
                              : s);
                      if (
                        !(
                          "vertical" === t &&
                          ["ArrowLeft", "ArrowRight"].includes(i)
                        ) &&
                        !(
                          "horizontal" === t &&
                          ["ArrowUp", "ArrowDown"].includes(i)
                        )
                      )
                        return E[i];
                    })(e, f.orientation, f.dir);
                    if (void 0 !== t) {
                      if (e.metaKey || e.ctrlKey || e.altKey || e.shiftKey)
                        return;
                      e.preventDefault();
                      let r = b()
                        .filter((e) => e.focusable)
                        .map((e) => e.ref.current);
                      if ("last" === t) r.reverse();
                      else if ("prev" === t || "next" === t) {
                        "prev" === t && r.reverse();
                        let s = r.indexOf(e.currentTarget);
                        r = f.loop
                          ? (function (e, t) {
                              return e.map((r, s) => e[(t + s) % e.length]);
                            })(r, s + 1)
                          : r.slice(s + 1);
                      }
                      setTimeout(() => P(r));
                    }
                  }),
                  children:
                    "function" == typeof d
                      ? d({ isCurrentTabStop: x, hasTabStop: null != j })
                      : d,
                }),
              })
            );
          });
        R.displayName = A;
        var E = {
          ArrowLeft: "prev",
          ArrowUp: "prev",
          ArrowRight: "next",
          ArrowDown: "next",
          PageUp: "first",
          Home: "first",
          PageDown: "last",
          End: "last",
        };
        function P(e, t = !1) {
          let r = document.activeElement;
          for (let s of e)
            if (
              s === r ||
              (s.focus({ preventScroll: t }), document.activeElement !== r)
            )
              return;
        }
        var S = C,
          T = R;
      },
      59570: () => {},
      61460: (e, t, r) => {
        "use strict";
        r.d(t, { _m: () => h });
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
        class n extends s {
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
        class o extends s {
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
              throw new n(`Missing required permission: ${t}`);
          }
          enforceAnyPermission(e, t) {
            if (!this.hasAnyPermission(e, t))
              throw new n(
                `Missing at least one of the required permissions: ${t.join(", ")}`,
              );
          }
          enforceAllPermissions(e, t) {
            if (!this.hasAllPermissions(e, t))
              throw new n(
                `Missing some of the required permissions: ${t.join(", ")}`,
              );
          }
          createPermission(e, t) {
            return `${e}:${t}`;
          }
        }
        let c = null;
        function h(e, t) {
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
      77001: (e, t, r) => {
        "use strict";
        r.a(e, async (e, s) => {
          try {
            r.d(t, {
              Tabs: () => l,
              TabsContent: () => c,
              TabsList: () => u,
              TabsTrigger: () => d,
            });
            var i = r(61268),
              n = r(28366);
            r(84205);
            var a = r(15942),
              o = e([a]);
            function l({ className: e, ...t }) {
              return (0, i.jsx)(n.bL, {
                "data-slot": "tabs",
                className: (0, a.cn)("flex flex-col gap-2", e),
                ...t,
              });
            }
            function u({ className: e, ...t }) {
              return (0, i.jsx)(n.B8, {
                "data-slot": "tabs-list",
                className: (0, a.cn)(
                  "bg-muted text-muted-foreground inline-flex h-9 w-fit items-center justify-center rounded-lg p-[3px]",
                  e,
                ),
                ...t,
              });
            }
            function d({ className: e, ...t }) {
              return (0, i.jsx)(n.l9, {
                "data-slot": "tabs-trigger",
                className: (0, a.cn)(
                  "data-[state=active]:bg-background dark:data-[state=active]:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:outline-ring dark:data-[state=active]:border-input dark:data-[state=active]:bg-input/30 text-foreground dark:text-muted-foreground inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-md border border-transparent px-2 py-1 text-sm font-medium whitespace-nowrap transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:shadow-sm [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
                  e,
                ),
                ...t,
              });
            }
            function c({ className: e, ...t }) {
              return (0, i.jsx)(n.UC, {
                "data-slot": "tabs-content",
                className: (0, a.cn)("flex-1 outline-none", e),
                ...t,
              });
            }
            (a = (o.then ? (await o)() : o)[0]), s();
          } catch (e) {
            s(e);
          }
        });
      },
      77030: (e) => {
        "use strict";
        e.exports = require("node:net");
      },
      77598: (e) => {
        "use strict";
        e.exports = require("node:crypto");
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
      95220: (e, t, r) => {
        "use strict";
        r.r(t),
          r.d(t, {
            GlobalError: () => n.default,
            __next_app__: () => d,
            pages: () => u,
            routeModule: () => c,
            tree: () => l,
          });
        var s = r(11610),
          i = r(51293),
          n = r(59059),
          a = r(17770),
          o = {};
        for (let e in a)
          0 >
            [
              "default",
              "tree",
              "pages",
              "GlobalError",
              "__next_app__",
              "routeModule",
            ].indexOf(e) && (o[e] = () => a[e]);
        r.d(t, o);
        let l = {
            children: [
              "",
              {
                children: [
                  "(auth)",
                  {
                    children: [
                      "auth-test",
                      {
                        children: [
                          "__PAGE__",
                          {},
                          {
                            page: [
                              () => Promise.resolve().then(r.bind(r, 11767)),
                              "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\(auth)\\auth-test\\page.tsx",
                            ],
                          },
                        ],
                      },
                      {},
                    ],
                  },
                  {
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
            "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\(auth)\\auth-test\\page.tsx",
          ],
          d = { require: r, loadChunk: () => Promise.resolve() },
          c = new s.AppPageRouteModule({
            definition: {
              kind: i.RouteKind.APP_PAGE,
              page: "/(auth)/auth-test/page",
              pathname: "/auth-test",
              bundlePath: "",
              filename: "",
              appPaths: [],
            },
            userland: { loaderTree: l },
          });
      },
    });
  var t = require("../../../webpack-runtime.js");
  t.C(e);
  var r = (e) => t((t.s = e)),
    s = t.X(
      0,
      [827, 6518, 2033, 4027, 2872, 7713, 5149, 8859, 8029, 5728, 4630],
      () => r(95220),
    );
  module.exports = s;
})();
//# sourceMappingURL=page.js.map
