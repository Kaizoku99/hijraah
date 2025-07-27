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
    (e._sentryDebugIds[t] = "2dfe07d9-7fa2-4dfe-a0d8-f15f5a3553a6"),
    (e._sentryDebugIdIdentifier =
      "sentry-dbid-2dfe07d9-7fa2-4dfe-a0d8-f15f5a3553a6"));
} catch (e) {}
(() => {
  var e = {};
  (e.id = 5592),
    (e.ids = [5592]),
    (e.modules = {
      3295: (e) => {
        "use strict";
        e.exports = require("next/dist/server/app-render/after-task-async-storage.external.js");
      },
      3519: (e, t, r) => {
        "use strict";
        r.r(t),
          r.d(t, {
            AuthProvider: () => d,
            useAuth: () => u,
            useHasPermission: () => m,
            useHasRole: () => h,
            useIsAuthenticated: () => p,
            useSession: () => f,
            useUser: () => c,
          });
        var s = r(61268),
          a = r(84205),
          i = r(32367),
          n = r(61460);
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
        let l = (0, a.createContext)(void 0);
        function d({ children: e }) {
          let [t, r] = (0, a.useState)(null),
            [n, d] = (0, a.useState)(null),
            [u, c] = (0, a.useState)(!0),
            p = (0, i.UU)(),
            h = (0, a.useCallback)(async () => {
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
                  d(e), r(o(t));
                } else d(null), r(null);
              } catch (e) {
                console.error("Error refreshing session:", e), d(null), r(null);
              } finally {
                c(!1);
              }
            }, [p]),
            m = (0, a.useCallback)(
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
                    e?.session && (d(e.session), r(o(e.session.user)));
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
            f = (0, a.useCallback)(async () => {
              c(!0);
              try {
                let { error: e } = await p.auth.signOut();
                if (e) throw e;
                d(null), r(null);
              } catch (e) {
                console.error("Error signing out:", e);
              } finally {
                c(!1);
              }
            }, [p]),
            x = (0, a.useCallback)(
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
            g = (0, a.useCallback)(
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
            y = (0, a.useCallback)(
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
              session: n,
              isLoading: u,
              isAuthenticated: !!n,
              signIn: m,
              signOut: f,
              refreshSession: h,
              signUp: x,
              resetPassword: g,
              updatePassword: y,
              error: null,
            },
            children: e,
          });
        }
        function u() {
          let e = (0, a.useContext)(l);
          if (void 0 === e)
            throw Error("useAuth must be used within an AuthProvider");
          return e;
        }
        function c() {
          let { user: e } = u();
          return e;
        }
        function p() {
          let { isAuthenticated: e } = u();
          return e;
        }
        function h(e) {
          let t = c();
          return t?.role === e;
        }
        function m(e) {
          let t = c();
          return (0, n._m)(t, e);
        }
        function f() {
          let e = (0, a.useContext)(l);
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
      6163: (e, t, r) => {
        Promise.resolve().then(r.bind(r, 47241));
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
      12335: (e, t, r) => {
        "use strict";
        r.d(t, { A: () => s });
        let s = (0, r(95255).A)("ChevronRight", [
          ["path", { d: "m9 18 6-6-6-6", key: "mthhwq" }],
        ]);
      },
      15090: (e, t, r) => {
        "use strict";
        r.d(t, { d: () => p });
        var s = r(84205);
        let a = {
            ADD_TOAST: "ADD_TOAST",
            UPDATE_TOAST: "UPDATE_TOAST",
            DISMISS_TOAST: "DISMISS_TOAST",
            REMOVE_TOAST: "REMOVE_TOAST",
          },
          i = 0,
          n = new Map(),
          o = (e, t) => {
            switch (t.type) {
              case a.ADD_TOAST:
                return { ...e, toasts: [t.toast, ...e.toasts].slice(0, 5) };
              case a.UPDATE_TOAST:
                return {
                  ...e,
                  toasts: e.toasts.map((e) =>
                    e.id === t.toast.id ? { ...e, ...t.toast } : e,
                  ),
                };
              case a.DISMISS_TOAST: {
                let { toastId: r } = t;
                if (r) n.has(r) && (clearTimeout(n.get(r)), n.delete(r));
                else
                  for (let [e, t] of n.entries()) clearTimeout(t), n.delete(e);
                return {
                  ...e,
                  toasts: e.toasts.map((e) =>
                    e.id === r || void 0 === r ? { ...e, open: !1 } : e,
                  ),
                };
              }
              case a.REMOVE_TOAST:
                if (void 0 === t.toastId) return { ...e, toasts: [] };
                return {
                  ...e,
                  toasts: e.toasts.filter((e) => e.id !== t.toastId),
                };
            }
          },
          l = [],
          d = { toasts: [] };
        function u(e) {
          (d = o(d, e)),
            l.forEach((e) => {
              e(d);
            });
        }
        function c({ ...e }) {
          let t = (i = (i + 1) % Number.MAX_VALUE).toString(),
            r = () => u({ type: a.DISMISS_TOAST, toastId: t });
          return (
            u({
              type: a.ADD_TOAST,
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
                u({ type: a.UPDATE_TOAST, toast: { ...e, id: t } }),
            }
          );
        }
        function p() {
          let [e, t] = s.useState(d);
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
              dismiss: (e) => u({ type: a.DISMISS_TOAST, toastId: e }),
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
      18047: (e, t, r) => {
        "use strict";
        r.d(t, { A: () => n, q: () => i });
        var s = r(84205),
          a = r(61268);
        function i(e, t) {
          let r = s.createContext(t),
            i = (e) => {
              let { children: t, ...i } = e,
                n = s.useMemo(() => i, Object.values(i));
              return (0, a.jsx)(r.Provider, { value: n, children: t });
            };
          return (
            (i.displayName = e + "Provider"),
            [
              i,
              function (a) {
                let i = s.useContext(r);
                if (i) return i;
                if (void 0 !== t) return t;
                throw Error(`\`${a}\` must be used within \`${e}\``);
              },
            ]
          );
        }
        function n(e, t = []) {
          let r = [],
            i = () => {
              let t = r.map((e) => s.createContext(e));
              return function (r) {
                let a = r?.[e] || t;
                return s.useMemo(
                  () => ({ [`__scope${e}`]: { ...r, [e]: a } }),
                  [r, a],
                );
              };
            };
          return (
            (i.scopeName = e),
            [
              function (t, i) {
                let n = s.createContext(i),
                  o = r.length;
                r = [...r, i];
                let l = (t) => {
                  let { scope: r, children: i, ...l } = t,
                    d = r?.[e]?.[o] || n,
                    u = s.useMemo(() => l, Object.values(l));
                  return (0, a.jsx)(d.Provider, { value: u, children: i });
                };
                return (
                  (l.displayName = t + "Provider"),
                  [
                    l,
                    function (r, a) {
                      let l = a?.[e]?.[o] || n,
                        d = s.useContext(l);
                      if (d) return d;
                      if (void 0 !== i) return i;
                      throw Error(`\`${r}\` must be used within \`${t}\``);
                    },
                  ]
                );
              },
              (function (...e) {
                let t = e[0];
                if (1 === e.length) return t;
                let r = () => {
                  let r = e.map((e) => ({
                    useScope: e(),
                    scopeName: e.scopeName,
                  }));
                  return function (e) {
                    let a = r.reduce((t, { useScope: r, scopeName: s }) => {
                      let a = r(e)[`__scope${s}`];
                      return { ...t, ...a };
                    }, {});
                    return s.useMemo(
                      () => ({ [`__scope${t.scopeName}`]: a }),
                      [a],
                    );
                  };
                };
                return (r.scopeName = t.scopeName), r;
              })(i, ...t),
            ]
          );
        }
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
      26216: (e, t, r) => {
        "use strict";
        r.d(t, { A: () => s });
        let s = (0, r(95255).A)("Menu", [
          ["line", { x1: "4", x2: "20", y1: "12", y2: "12", key: "1e0a9i" }],
          ["line", { x1: "4", x2: "20", y1: "6", y2: "6", key: "1owob3" }],
          ["line", { x1: "4", x2: "20", y1: "18", y2: "18", key: "yk5zj1" }],
        ]);
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
      31421: (e) => {
        "use strict";
        e.exports = require("node:child_process");
      },
      32367: (e, t, r) => {
        "use strict";
        let s;
        r.d(t, { AG: () => g, Iw: () => f, UU: () => x });
        var a = r(97713),
          i = r(15149),
          n = r.n(i),
          o = r(84205);
        let { fetch: l } = n()(),
          d = "http://localhost:54321",
          u =
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0",
          c = process.env.SUPABASE_SERVICE_ROLE_KEY,
          p = u ? { apikey: u } : void 0;
        function h() {
          if (!d || !u)
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
            : (s = (0, a.createBrowserClient)(d, u, {
                global: { headers: p },
              }));
        }
        function f() {
          return (0, o.useMemo)(m, []);
        }
        function x() {
          return (
            h(), (0, a.createBrowserClient)(d, u, { global: { headers: p } })
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
      36789: (e, t, r) => {
        "use strict";
        r.d(t, { A: () => s });
        let s = (0, r(95255).A)("Clock", [
          ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
          ["polyline", { points: "12 6 12 12 16 14", key: "68esgv" }],
        ]);
      },
      36798: (e, t, r) => {
        "use strict";
        r.d(t, { A: () => s });
        let s = (0, r(95255).A)("Settings", [
          [
            "path",
            {
              d: "M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z",
              key: "1qme2f",
            },
          ],
          ["circle", { cx: "12", cy: "12", r: "3", key: "1v7zrd" }],
        ]);
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
      43202: (e, t, r) => {
        "use strict";
        r.d(t, { A: () => s });
        let s = (0, r(95255).A)("Map", [
          [
            "polygon",
            {
              points: "3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21",
              key: "ok2ie8",
            },
          ],
          ["line", { x1: "9", x2: "9", y1: "3", y2: "18", key: "w34qz5" }],
          ["line", { x1: "15", x2: "15", y1: "6", y2: "21", key: "volv9a" }],
        ]);
      },
      44708: (e) => {
        "use strict";
        e.exports = require("node:https");
      },
      44803: (e, t, r) => {
        "use strict";
        r.d(t, { A: () => s });
        let s = (0, r(95255).A)("Search", [
          ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }],
          ["path", { d: "m21 21-4.3-4.3", key: "1qie3q" }],
        ]);
      },
      46075: (e, t, r) => {
        Promise.resolve().then(r.bind(r, 72752));
      },
      46299: (e, t, r) => {
        "use strict";
        r.d(t, { A: () => s });
        let s = (0, r(95255).A)("Briefcase", [
          [
            "rect",
            {
              width: "20",
              height: "14",
              x: "2",
              y: "7",
              rx: "2",
              ry: "2",
              key: "eto64e",
            },
          ],
          [
            "path",
            { d: "M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16", key: "zwj3tp" },
          ],
        ]);
      },
      46532: (e, t, r) => {
        "use strict";
        r.a(e, async (e, s) => {
          try {
            r.d(t, { E: () => d });
            var a = r(61268),
              i = r(86415),
              n = r(91635);
            r(84205);
            var o = r(15942),
              l = e([o]);
            o = (l.then ? (await l)() : l)[0];
            let u = (0, n.F)(
              "inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden",
              {
                variants: {
                  variant: {
                    default:
                      "border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90",
                    secondary:
                      "border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90",
                    destructive:
                      "border-transparent bg-destructive text-white [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
                    outline:
                      "text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground",
                  },
                },
                defaultVariants: { variant: "default" },
              },
            );
            function d({ className: e, variant: t, asChild: r = !1, ...s }) {
              let n = r ? i.DX : "span";
              return (0, a.jsx)(n, {
                "data-slot": "badge",
                className: (0, o.cn)(u({ variant: t }), e),
                ...s,
              });
            }
            s();
          } catch (e) {
            s(e);
          }
        });
      },
      47241: (e, t, r) => {
        "use strict";
        r.a(e, async (e, s) => {
          try {
            r.r(t), r.d(t, { default: () => _ });
            var a = r(61268),
              i = r(12872),
              n = r(81578),
              o = r(73940),
              l = r(98683),
              d = r(36789),
              u = r(61950),
              c = r(48322),
              p = r(44803),
              h = r(12335),
              m = r(31655),
              f = r.n(m),
              x = r(89882),
              g = r(84205),
              y = r(46532),
              v = r(28909),
              w = r(5451),
              b = r(78337),
              A = r(92256),
              N = r(15090),
              j = e([y, v, w, b, A]);
            function _() {
              let [e, t] = (0, g.useState)([]),
                [r, s] = (0, g.useState)(!0),
                [m, j] = (0, g.useState)(null),
                [_, k] = (0, g.useState)(""),
                [C, S] = (0, g.useState)(null),
                { toast: E } = (0, N.d)();
              (0, x.useRouter)(),
                (0, i.createClient)(
                  "http://localhost:54321",
                  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0",
                );
              let T = (e) => {
                  switch (e) {
                    case "completed":
                      return (0, a.jsx)(l.A, {
                        className: "h-5 w-5 text-green-500",
                      });
                    case "in_progress":
                      return (0, a.jsx)(d.A, {
                        className: "h-5 w-5 text-blue-500",
                      });
                    case "blocked":
                      return (0, a.jsx)(u.A, {
                        className: "h-5 w-5 text-red-500",
                      });
                    case "overdue":
                      return (0, a.jsx)(c.A, {
                        className: "h-5 w-5 text-yellow-500",
                      });
                    default:
                      return (0, a.jsx)(d.A, {
                        className: "h-5 w-5 text-gray-500",
                      });
                  }
                },
                P = (e) => {
                  switch (e) {
                    case "completed":
                      return (0, a.jsx)(y.E, {
                        variant: "outline",
                        className:
                          "bg-green-100 text-green-800 border-green-300",
                        children: "Completed",
                      });
                    case "in_progress":
                      return (0, a.jsx)(y.E, {
                        variant: "outline",
                        className: "bg-blue-100 text-blue-800 border-blue-300",
                        children: "In Progress",
                      });
                    case "blocked":
                      return (0, a.jsx)(y.E, {
                        variant: "outline",
                        className: "bg-red-100 text-red-800 border-red-300",
                        children: "Blocked",
                      });
                    case "overdue":
                      return (0, a.jsx)(y.E, {
                        variant: "outline",
                        className:
                          "bg-yellow-100 text-yellow-800 border-yellow-300",
                        children: "Overdue",
                      });
                    default:
                      return (0, a.jsx)(y.E, {
                        variant: "outline",
                        className: "bg-gray-100 text-gray-800 border-gray-300",
                        children: "Not Started",
                      });
                  }
                },
                I = e.filter(
                  (e) =>
                    e.title?.toLowerCase().includes(_.toLowerCase()) ||
                    e.description?.toLowerCase().includes(_.toLowerCase()) ||
                    e.case_type?.toLowerCase().includes(_.toLowerCase()),
                );
              return (0, a.jsxs)("div", {
                className: "container",
                children: [
                  (0, a.jsxs)("div", {
                    className: "mb-8",
                    children: [
                      (0, a.jsx)("h1", {
                        className: "text-3xl font-bold",
                        children: "Immigration Roadmaps",
                      }),
                      (0, a.jsx)("p", {
                        className: "text-gray-500 mt-1",
                        children:
                          "View and manage your personalized immigration roadmaps",
                      }),
                    ],
                  }),
                  (0, a.jsxs)("div", {
                    className:
                      "flex flex-col sm:flex-row justify-between gap-4 mb-6",
                    children: [
                      (0, a.jsxs)("div", {
                        className: "relative w-full sm:max-w-xs",
                        children: [
                          (0, a.jsx)(p.A, {
                            className:
                              "absolute left-2.5 top-2.5 h-4 w-4 text-gray-500",
                          }),
                          (0, a.jsx)(b.p, {
                            type: "text",
                            placeholder: "Search roadmaps...",
                            className: "pl-8 w-full",
                            value: _,
                            onChange: (e) => k(e.target.value),
                          }),
                        ],
                      }),
                      (0, a.jsx)("div", {
                        className: "flex gap-2",
                        children: (0, a.jsx)(f(), {
                          href: "/dashboard/cases",
                          legacyBehavior: !0,
                          children: (0, a.jsx)(v.$, {
                            variant: "outline",
                            children: "View Cases",
                          }),
                        }),
                      }),
                    ],
                  }),
                  r
                    ? (0, a.jsx)("div", {
                        className: "flex justify-center items-center h-64",
                        children: (0, a.jsx)("div", {
                          className:
                            "animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900",
                        }),
                      })
                    : m
                      ? (0, a.jsxs)(w.Zp, {
                          children: [
                            (0, a.jsx)(w.aR, {
                              children: (0, a.jsx)(w.ZB, {
                                className: "text-red-600",
                                children: "Error",
                              }),
                            }),
                            (0, a.jsx)(w.Wu, {
                              children: (0, a.jsx)("p", { children: m }),
                            }),
                            (0, a.jsx)(w.wL, {
                              children: (0, a.jsx)(v.$, {
                                onClick: () => window.location.reload(),
                                children: "Retry",
                              }),
                            }),
                          ],
                        })
                      : 0 === I.length
                        ? (0, a.jsxs)(w.Zp, {
                            children: [
                              (0, a.jsxs)(w.aR, {
                                children: [
                                  (0, a.jsx)(w.ZB, {
                                    children: "No Roadmaps Found",
                                  }),
                                  (0, a.jsx)(w.BT, {
                                    children: _
                                      ? "No roadmaps match your search criteria."
                                      : "You have no roadmaps yet.",
                                  }),
                                ],
                              }),
                              (0, a.jsx)(w.Wu, {
                                children: (0, a.jsx)("p", {
                                  className: "text-gray-500",
                                  children:
                                    "Roadmaps are created from immigration cases. Visit your cases to create a roadmap.",
                                }),
                              }),
                              (0, a.jsx)(w.wL, {
                                children: (0, a.jsx)(f(), {
                                  href: "/dashboard/cases",
                                  legacyBehavior: !0,
                                  children: (0, a.jsx)(v.$, {
                                    children: "View My Cases",
                                  }),
                                }),
                              }),
                            ],
                          })
                        : (0, a.jsx)("div", {
                            className:
                              "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",
                            children: I.map((e) =>
                              (0, a.jsx)(
                                f(),
                                {
                                  href: `/dashboard/roadmaps/${e.id}`,
                                  legacyBehavior: !0,
                                  children: (0, a.jsxs)(w.Zp, {
                                    className:
                                      "h-full hover:shadow-md transition-shadow duration-200 cursor-pointer",
                                    children: [
                                      (0, a.jsxs)(w.aR, {
                                        className: "pb-2",
                                        children: [
                                          (0, a.jsxs)("div", {
                                            className:
                                              "flex justify-between items-start",
                                            children: [
                                              (0, a.jsxs)("div", {
                                                className: "flex items-center",
                                                children: [
                                                  T(e.status),
                                                  (0, a.jsx)(w.ZB, {
                                                    className: "ml-2 text-lg",
                                                    children: e.title,
                                                  }),
                                                ],
                                              }),
                                              (0, a.jsx)("div", {
                                                children: P(e.status),
                                              }),
                                            ],
                                          }),
                                          (0, a.jsx)(w.BT, {
                                            className: "mt-2",
                                            children:
                                              e.description?.length > 100
                                                ? `${e.description.substring(0, 100)}...`
                                                : e.description,
                                          }),
                                        ],
                                      }),
                                      (0, a.jsxs)(w.Wu, {
                                        children: [
                                          (0, a.jsxs)("div", {
                                            className:
                                              "flex justify-between items-center mb-2",
                                            children: [
                                              (0, a.jsx)("span", {
                                                className:
                                                  "text-sm font-medium",
                                                children: "Progress",
                                              }),
                                              (0, a.jsxs)("span", {
                                                className: "text-sm",
                                                children: [
                                                  e.completion_percentage,
                                                  "%",
                                                ],
                                              }),
                                            ],
                                          }),
                                          (0, a.jsx)(A.k, {
                                            value: e.completion_percentage,
                                            className: "h-2 mb-4",
                                          }),
                                          (0, a.jsxs)("div", {
                                            className:
                                              "grid grid-cols-2 gap-2 text-sm",
                                            children: [
                                              (0, a.jsxs)("div", {
                                                children: [
                                                  (0, a.jsx)("p", {
                                                    className: "text-gray-500",
                                                    children: "Case Type:",
                                                  }),
                                                  (0, a.jsx)("p", {
                                                    className: "font-medium",
                                                    children:
                                                      e.case_type.replace(
                                                        /_/g,
                                                        " ",
                                                      ),
                                                  }),
                                                ],
                                              }),
                                              (0, a.jsxs)("div", {
                                                children: [
                                                  (0, a.jsx)("p", {
                                                    className: "text-gray-500",
                                                    children: "Last Updated:",
                                                  }),
                                                  (0, a.jsx)("p", {
                                                    className: "font-medium",
                                                    children: (0, n.GP)(
                                                      (0, o.H)(e.last_updated),
                                                      "MMM d, yyyy",
                                                    ),
                                                  }),
                                                ],
                                              }),
                                            ],
                                          }),
                                        ],
                                      }),
                                      (0, a.jsx)(w.wL, {
                                        className: "pt-0 pb-3",
                                        children: (0, a.jsxs)(v.$, {
                                          variant: "ghost",
                                          className: "w-full justify-between",
                                          children: [
                                            "View Details ",
                                            (0, a.jsx)(h.A, {
                                              className: "h-4 w-4",
                                            }),
                                          ],
                                        }),
                                      }),
                                    ],
                                  }),
                                },
                                e.id,
                              ),
                            ),
                          }),
                ],
              });
            }
            ([y, v, w, b, A] = j.then ? (await j)() : j), s();
          } catch (e) {
            s(e);
          }
        });
      },
      48161: (e) => {
        "use strict";
        e.exports = require("node:os");
      },
      48322: (e, t, r) => {
        "use strict";
        r.d(t, { A: () => s });
        let s = (0, r(95255).A)("AlertTriangle", [
          [
            "path",
            {
              d: "m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z",
              key: "c3ski4",
            },
          ],
          ["path", { d: "M12 9v4", key: "juzpu7" }],
          ["path", { d: "M12 17h.01", key: "p32p05" }],
        ]);
      },
      49917: (e, t, r) => {
        "use strict";
        r.d(t, { C1: () => b, bL: () => w });
        var s = r(84205),
          a = r(18047),
          i = r(78593),
          n = r(61268),
          o = "Progress",
          [l, d] = (0, a.A)(o),
          [u, c] = l(o),
          p = s.forwardRef((e, t) => {
            var r, s;
            let {
              __scopeProgress: a,
              value: o = null,
              max: l,
              getValueLabel: d = f,
              ...c
            } = e;
            (l || 0 === l) &&
              !y(l) &&
              console.error(
                ((r = `${l}`),
                `Invalid prop \`max\` of value \`${r}\` supplied to \`Progress\`. Only numbers greater than 0 are valid max values. Defaulting to \`100\`.`),
              );
            let p = y(l) ? l : 100;
            null === o ||
              v(o, p) ||
              console.error(
                ((s = `${o}`),
                `Invalid prop \`value\` of value \`${s}\` supplied to \`Progress\`. The \`value\` prop must be:
  - a positive number
  - less than the value passed to \`max\` (or 100 if no \`max\` prop is set)
  - \`null\` or \`undefined\` if the progress is indeterminate.

Defaulting to \`null\`.`),
              );
            let h = v(o, p) ? o : null,
              m = g(h) ? d(h, p) : void 0;
            return (0, n.jsx)(u, {
              scope: a,
              value: h,
              max: p,
              children: (0, n.jsx)(i.sG.div, {
                "aria-valuemax": p,
                "aria-valuemin": 0,
                "aria-valuenow": g(h) ? h : void 0,
                "aria-valuetext": m,
                role: "progressbar",
                "data-state": x(h, p),
                "data-value": h ?? void 0,
                "data-max": p,
                ...c,
                ref: t,
              }),
            });
          });
        p.displayName = o;
        var h = "ProgressIndicator",
          m = s.forwardRef((e, t) => {
            let { __scopeProgress: r, ...s } = e,
              a = c(h, r);
            return (0, n.jsx)(i.sG.div, {
              "data-state": x(a.value, a.max),
              "data-value": a.value ?? void 0,
              "data-max": a.max,
              ...s,
              ref: t,
            });
          });
        function f(e, t) {
          return `${Math.round((e / t) * 100)}%`;
        }
        function x(e, t) {
          return null == e ? "indeterminate" : e === t ? "complete" : "loading";
        }
        function g(e) {
          return "number" == typeof e;
        }
        function y(e) {
          return g(e) && !isNaN(e) && e > 0;
        }
        function v(e, t) {
          return g(e) && !isNaN(e) && e <= t && e >= 0;
        }
        m.displayName = h;
        var w = p,
          b = m;
      },
      52327: (e, t, r) => {
        "use strict";
        r.d(t, { A: () => s });
        let s = (0, r(95255).A)("Users", [
          [
            "path",
            { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2", key: "1yyitq" },
          ],
          ["circle", { cx: "9", cy: "7", r: "4", key: "nufk8" }],
          ["path", { d: "M22 21v-2a4 4 0 0 0-3-3.87", key: "kshegd" }],
          ["path", { d: "M16 3.13a4 4 0 0 1 0 7.75", key: "1da9ce" }],
        ]);
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
      57896: (e, t, r) => {
        "use strict";
        r.d(t, { A: () => s });
        let s = (0, r(95255).A)("Home", [
          [
            "path",
            {
              d: "m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",
              key: "y5dka4",
            },
          ],
          ["polyline", { points: "9 22 9 12 15 12 15 22", key: "e2us08" }],
        ]);
      },
      57975: (e) => {
        "use strict";
        e.exports = require("node:util");
      },
      59570: () => {},
      60212: (e, t, r) => {
        "use strict";
        r.r(t),
          r.d(t, {
            GlobalError: () => i.default,
            __next_app__: () => u,
            pages: () => d,
            routeModule: () => c,
            tree: () => l,
          });
        var s = r(11610),
          a = r(51293),
          i = r(59059),
          n = r(17770),
          o = {};
        for (let e in n)
          0 >
            [
              "default",
              "tree",
              "pages",
              "GlobalError",
              "__next_app__",
              "routeModule",
            ].indexOf(e) && (o[e] = () => n[e]);
        r.d(t, o);
        let l = {
            children: [
              "",
              {
                children: [
                  "(authenticated)",
                  {
                    children: [
                      "dashboard",
                      {
                        children: [
                          "roadmaps",
                          {
                            children: [
                              "__PAGE__",
                              {},
                              {
                                page: [
                                  () =>
                                    Promise.resolve().then(r.bind(r, 72752)),
                                  "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\(authenticated)\\dashboard\\roadmaps\\page.tsx",
                                ],
                              },
                            ],
                          },
                          {},
                        ],
                      },
                      {
                        layout: [
                          () => Promise.resolve().then(r.bind(r, 73856)),
                          "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\(authenticated)\\dashboard\\layout.tsx",
                        ],
                        loading: [
                          () => Promise.resolve().then(r.bind(r, 97020)),
                          "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\(authenticated)\\dashboard\\loading.tsx",
                        ],
                      },
                    ],
                  },
                  {
                    layout: [
                      () => Promise.resolve().then(r.bind(r, 72967)),
                      "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\(authenticated)\\layout.tsx",
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
          d = [
            "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\(authenticated)\\dashboard\\roadmaps\\page.tsx",
          ],
          u = { require: r, loadChunk: () => Promise.resolve() },
          c = new s.AppPageRouteModule({
            definition: {
              kind: a.RouteKind.APP_PAGE,
              page: "/(authenticated)/dashboard/roadmaps/page",
              pathname: "/dashboard/roadmaps",
              bundlePath: "",
              filename: "",
              appPaths: [],
            },
            userland: { loaderTree: l },
          });
      },
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
        class a extends s {
          constructor(e = "Authentication required", t) {
            super(e, "auth/unauthorized", t, 401),
              (this.name = "UnauthorizedError");
          }
        }
        class i extends s {
          constructor(e = "Insufficient permissions", t) {
            super(e, "auth/forbidden", t, 403), (this.name = "ForbiddenError");
          }
        }
        class n extends s {
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
        let d = { roles: {}, superAdminRole: "admin", enableCache: !0 };
        class u {
          constructor(e = {}) {
            this.permissionCache = new Map();
            let t = { ...d, ...e };
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
              throw new i(`Missing required permission: ${t}`);
          }
          enforceAnyPermission(e, t) {
            if (!this.hasAnyPermission(e, t))
              throw new i(
                `Missing at least one of the required permissions: ${t.join(", ")}`,
              );
          }
          enforceAllPermissions(e, t) {
            if (!this.hasAllPermissions(e, t))
              throw new i(
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
          return (c || (c = new u(void 0)), c).hasPermission(e, t);
        }
      },
      61950: (e, t, r) => {
        "use strict";
        r.d(t, { A: () => s });
        let s = (0, r(95255).A)("AlertCircle", [
          ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
          ["line", { x1: "12", x2: "12", y1: "8", y2: "12", key: "1pkeuh" }],
          [
            "line",
            { x1: "12", x2: "12.01", y1: "16", y2: "16", key: "4dfq90" },
          ],
        ]);
      },
      63033: (e) => {
        "use strict";
        e.exports = require("next/dist/server/app-render/work-unit-async-storage.external.js");
      },
      63961: (e, t, r) => {
        "use strict";
        r.d(t, { TL: () => n });
        var s = r(84205),
          a = r(71604),
          i = r(61268);
        function n(e) {
          let t = (function (e) {
              let t = s.forwardRef((e, t) => {
                let { children: r, ...i } = e;
                if (s.isValidElement(r)) {
                  var n;
                  let e,
                    o,
                    l =
                      ((n = r),
                      (o =
                        (e = Object.getOwnPropertyDescriptor(
                          n.props,
                          "ref",
                        )?.get) &&
                        "isReactWarning" in e &&
                        e.isReactWarning)
                        ? n.ref
                        : (o =
                              (e = Object.getOwnPropertyDescriptor(
                                n,
                                "ref",
                              )?.get) &&
                              "isReactWarning" in e &&
                              e.isReactWarning)
                          ? n.props.ref
                          : n.props.ref || n.ref),
                    d = (function (e, t) {
                      let r = { ...t };
                      for (let s in t) {
                        let a = e[s],
                          i = t[s];
                        /^on[A-Z]/.test(s)
                          ? a && i
                            ? (r[s] = (...e) => {
                                let t = i(...e);
                                return a(...e), t;
                              })
                            : a && (r[s] = a)
                          : "style" === s
                            ? (r[s] = { ...a, ...i })
                            : "className" === s &&
                              (r[s] = [a, i].filter(Boolean).join(" "));
                      }
                      return { ...e, ...r };
                    })(i, r.props);
                  return (
                    r.type !== s.Fragment && (d.ref = t ? (0, a.t)(t, l) : l),
                    s.cloneElement(r, d)
                  );
                }
                return s.Children.count(r) > 1 ? s.Children.only(null) : null;
              });
              return (t.displayName = `${e}.SlotClone`), t;
            })(e),
            r = s.forwardRef((e, r) => {
              let { children: a, ...n } = e,
                o = s.Children.toArray(a),
                d = o.find(l);
              if (d) {
                let e = d.props.children,
                  a = o.map((t) =>
                    t !== d
                      ? t
                      : s.Children.count(e) > 1
                        ? s.Children.only(null)
                        : s.isValidElement(e)
                          ? e.props.children
                          : null,
                  );
                return (0, i.jsx)(t, {
                  ...n,
                  ref: r,
                  children: s.isValidElement(e)
                    ? s.cloneElement(e, void 0, a)
                    : null,
                });
              }
              return (0, i.jsx)(t, { ...n, ref: r, children: a });
            });
          return (r.displayName = `${e}.Slot`), r;
        }
        var o = Symbol("radix.slottable");
        function l(e) {
          return (
            s.isValidElement(e) &&
            "function" == typeof e.type &&
            "__radixId" in e.type &&
            e.type.__radixId === o
          );
        }
      },
      71604: (e, t, r) => {
        "use strict";
        r.d(t, { s: () => n, t: () => i });
        var s = r(84205);
        function a(e, t) {
          if ("function" == typeof e) return e(t);
          null != e && (e.current = t);
        }
        function i(...e) {
          return (t) => {
            let r = !1,
              s = e.map((e) => {
                let s = a(e, t);
                return r || "function" != typeof s || (r = !0), s;
              });
            if (r)
              return () => {
                for (let t = 0; t < s.length; t++) {
                  let r = s[t];
                  "function" == typeof r ? r() : a(e[t], null);
                }
              };
          };
        }
        function n(...e) {
          return s.useCallback(i(...e), e);
        }
      },
      72752: (e, t, r) => {
        "use strict";
        let s;
        r.r(t),
          r.d(t, {
            default: () => h,
            generateImageMetadata: () => c,
            generateMetadata: () => u,
            generateViewport: () => p,
          });
        var a = r(63033),
          i = r(26394),
          n = r(60442),
          o = (0, i.registerClientReference)(
            function () {
              throw Error(
                "Attempted to call the default export of \"E:\\\\downloads\\\\Hijraah\\\\apps\\\\web\\\\src\\\\app\\\\(authenticated)\\\\dashboard\\\\roadmaps\\\\page.tsx\" from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
              );
            },
            "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\(authenticated)\\dashboard\\roadmaps\\page.tsx",
            "default",
          );
        let l = { ...a },
          d =
            "workUnitAsyncStorage" in l
              ? l.workUnitAsyncStorage
              : "requestAsyncStorage" in l
                ? l.requestAsyncStorage
                : void 0;
        s =
          "function" == typeof o
            ? new Proxy(o, {
                apply: (e, t, r) => {
                  let s, a, i;
                  try {
                    let e = d?.getStore();
                    (s = e?.headers.get("sentry-trace") ?? void 0),
                      (a = e?.headers.get("baggage") ?? void 0),
                      (i = e?.headers);
                  } catch (e) {}
                  return n
                    .wrapServerComponentWithSentry(e, {
                      componentRoute: "/(authenticated)/dashboard/roadmaps",
                      componentType: "Page",
                      sentryTraceHeader: s,
                      baggageHeader: a,
                      headers: i,
                    })
                    .apply(t, r);
                },
              })
            : o;
        let u = void 0,
          c = void 0,
          p = void 0,
          h = s;
      },
      73024: (e) => {
        "use strict";
        e.exports = require("node:fs");
      },
      73566: (e) => {
        "use strict";
        e.exports = require("worker_threads");
      },
      73940: (e, t, r) => {
        "use strict";
        r.d(t, { H: () => n });
        var s = r(65223),
          a = r(23047),
          i = r(46837);
        function n(e, t) {
          let r,
            n,
            f = () => (0, a.w)(t?.in, NaN),
            x = t?.additionalDigits ?? 2,
            g = (function (e) {
              let t,
                r = {},
                s = e.split(o.dateTimeDelimiter);
              if (s.length > 2) return r;
              if (
                (/:/.test(s[0])
                  ? (t = s[0])
                  : ((r.date = s[0]),
                    (t = s[1]),
                    o.timeZoneDelimiter.test(r.date) &&
                      ((r.date = e.split(o.timeZoneDelimiter)[0]),
                      (t = e.substr(r.date.length, e.length)))),
                t)
              ) {
                let e = o.timezone.exec(t);
                e
                  ? ((r.time = t.replace(e[1], "")), (r.timezone = e[1]))
                  : (r.time = t);
              }
              return r;
            })(e);
          if (g.date) {
            let e = (function (e, t) {
              let r = RegExp(
                  "^(?:(\\d{4}|[+-]\\d{" +
                    (4 + t) +
                    "})|(\\d{2}|[+-]\\d{" +
                    (2 + t) +
                    "})$)",
                ),
                s = e.match(r);
              if (!s) return { year: NaN, restDateString: "" };
              let a = s[1] ? parseInt(s[1]) : null,
                i = s[2] ? parseInt(s[2]) : null;
              return {
                year: null === i ? a : 100 * i,
                restDateString: e.slice((s[1] || s[2]).length),
              };
            })(g.date, x);
            r = (function (e, t) {
              var r, s, a, i, n, o, d, u;
              if (null === t) return new Date(NaN);
              let p = e.match(l);
              if (!p) return new Date(NaN);
              let f = !!p[4],
                x = c(p[1]),
                g = c(p[2]) - 1,
                y = c(p[3]),
                v = c(p[4]),
                w = c(p[5]) - 1;
              if (f) {
                return ((r = 0),
                (s = v),
                (a = w),
                s >= 1 && s <= 53 && a >= 0 && a <= 6)
                  ? (function (e, t, r) {
                      let s = new Date(0);
                      s.setUTCFullYear(e, 0, 4);
                      let a = s.getUTCDay() || 7;
                      return (
                        s.setUTCDate(
                          s.getUTCDate() + ((t - 1) * 7 + r + 1 - a),
                        ),
                        s
                      );
                    })(t, v, w)
                  : new Date(NaN);
              }
              {
                let e = new Date(0);
                return ((i = t),
                (n = g),
                (o = y),
                n >= 0 &&
                  n <= 11 &&
                  o >= 1 &&
                  o <= (h[n] || (m(i) ? 29 : 28)) &&
                  ((d = t), (u = x) >= 1 && u <= (m(d) ? 366 : 365)))
                  ? (e.setUTCFullYear(t, g, Math.max(x, y)), e)
                  : new Date(NaN);
              }
            })(e.restDateString, e.year);
          }
          if (!r || isNaN(+r)) return f();
          let y = +r,
            v = 0;
          if (
            g.time &&
            isNaN(
              (v = (function (e) {
                var t, r, a;
                let i = e.match(d);
                if (!i) return NaN;
                let n = p(i[1]),
                  o = p(i[2]),
                  l = p(i[3]);
                return ((t = n),
                (r = o),
                (a = l),
                24 === t
                  ? 0 === r && 0 === a
                  : a >= 0 && a < 60 && r >= 0 && r < 60 && t >= 0 && t < 25)
                  ? n * s.s0 + o * s.Cg + 1e3 * l
                  : NaN;
              })(g.time)),
            )
          )
            return f();
          if (g.timezone) {
            if (
              isNaN(
                (n = (function (e) {
                  var t, r;
                  if ("Z" === e) return 0;
                  let a = e.match(u);
                  if (!a) return 0;
                  let i = "+" === a[1] ? -1 : 1,
                    n = parseInt(a[2]),
                    o = (a[3] && parseInt(a[3])) || 0;
                  return ((t = 0), (r = o) >= 0 && r <= 59)
                    ? i * (n * s.s0 + o * s.Cg)
                    : NaN;
                })(g.timezone)),
              )
            )
              return f();
          } else {
            let e = new Date(y + v),
              r = (0, i.a)(0, t?.in);
            return (
              r.setFullYear(
                e.getUTCFullYear(),
                e.getUTCMonth(),
                e.getUTCDate(),
              ),
              r.setHours(
                e.getUTCHours(),
                e.getUTCMinutes(),
                e.getUTCSeconds(),
                e.getUTCMilliseconds(),
              ),
              r
            );
          }
          return (0, i.a)(y + v + n, t?.in);
        }
        let o = {
            dateTimeDelimiter: /[T ]/,
            timeZoneDelimiter: /[Z ]/i,
            timezone: /([Z+-].*)$/,
          },
          l = /^-?(?:(\d{3})|(\d{2})(?:-?(\d{2}))?|W(\d{2})(?:-?(\d{1}))?|)$/,
          d =
            /^(\d{2}(?:[.,]\d*)?)(?::?(\d{2}(?:[.,]\d*)?))?(?::?(\d{2}(?:[.,]\d*)?))?$/,
          u = /^([+-])(\d{2})(?::?(\d{2}))?$/;
        function c(e) {
          return e ? parseInt(e) : 1;
        }
        function p(e) {
          return (e && parseFloat(e.replace(",", "."))) || 0;
        }
        let h = [31, null, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        function m(e) {
          return e % 400 == 0 || (e % 4 == 0 && e % 100 != 0);
        }
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
            r.d(t, { p: () => o });
            var a = r(61268);
            r(84205);
            var i = r(15942),
              n = e([i]);
            function o({ className: e, type: t, ...r }) {
              return (0, a.jsx)("input", {
                type: t,
                "data-slot": "input",
                className: (0, i.cn)(
                  "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
                  "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
                  "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
                  e,
                ),
                ...r,
              });
            }
            (i = (n.then ? (await n)() : n)[0]), s();
          } catch (e) {
            s(e);
          }
        });
      },
      78593: (e, t, r) => {
        "use strict";
        r.d(t, { hO: () => l, sG: () => o });
        var s = r(84205),
          a = r(90304),
          i = r(63961),
          n = r(61268),
          o = [
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
            let r = (0, i.TL)(`Primitive.${t}`),
              a = s.forwardRef((e, s) => {
                let { asChild: a, ...i } = e;
                return (
                  "undefined" != typeof window &&
                    (window[Symbol.for("radix-ui")] = !0),
                  (0, n.jsx)(a ? r : t, { ...i, ref: s })
                );
              });
            return (a.displayName = `Primitive.${t}`), { ...e, [t]: a };
          }, {});
        function l(e, t) {
          e && a.flushSync(() => e.dispatchEvent(t));
        }
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
      80305: (e, t, r) => {
        "use strict";
        r.d(t, { A: () => s });
        let s = (0, r(95255).A)("Flag", [
          [
            "path",
            {
              d: "M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z",
              key: "i9b6wo",
            },
          ],
          ["line", { x1: "4", x2: "4", y1: "22", y2: "15", key: "1cm3nv" }],
        ]);
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
      90495: (e, t, r) => {
        "use strict";
        r.d(t, { A: () => s });
        let s = (0, r(95255).A)("X", [
          ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
          ["path", { d: "m6 6 12 12", key: "d8bk6v" }],
        ]);
      },
      91645: (e) => {
        "use strict";
        e.exports = require("net");
      },
      92256: (e, t, r) => {
        "use strict";
        r.a(e, async (e, s) => {
          try {
            r.d(t, { k: () => d });
            var a = r(61268),
              i = r(49917),
              n = r(84205),
              o = r(15942),
              l = e([o]);
            o = (l.then ? (await l)() : l)[0];
            let d = n.forwardRef(({ className: e, value: t, ...r }, s) =>
              (0, a.jsx)(i.bL, {
                ref: s,
                className: (0, o.cn)(
                  "relative h-2 w-full overflow-hidden rounded-full bg-secondary",
                  e,
                ),
                ...r,
                children: (0, a.jsx)(i.C1, {
                  className: "h-full w-full flex-1 bg-primary transition-all",
                  style: { transform: `translateX(-${100 - (t || 0)}%)` },
                }),
              }),
            );
            (d.displayName = i.bL.displayName), s();
          } catch (e) {
            s(e);
          }
        });
      },
      94735: (e) => {
        "use strict";
        e.exports = require("events");
      },
      95255: (e, t, r) => {
        "use strict";
        r.d(t, { A: () => n });
        var s = r(84205),
          a = {
            xmlns: "http://www.w3.org/2000/svg",
            width: 24,
            height: 24,
            viewBox: "0 0 24 24",
            fill: "none",
            stroke: "currentColor",
            strokeWidth: 2,
            strokeLinecap: "round",
            strokeLinejoin: "round",
          };
        let i = (e) =>
            e
              .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
              .toLowerCase()
              .trim(),
          n = (e, t) => {
            let r = (0, s.forwardRef)(
              (
                {
                  color: r = "currentColor",
                  size: n = 24,
                  strokeWidth: o = 2,
                  absoluteStrokeWidth: l,
                  className: d = "",
                  children: u,
                  ...c
                },
                p,
              ) =>
                (0, s.createElement)(
                  "svg",
                  {
                    ref: p,
                    ...a,
                    width: n,
                    height: n,
                    stroke: r,
                    strokeWidth: l ? (24 * Number(o)) / Number(n) : o,
                    className: ["lucide", `lucide-${i(e)}`, d].join(" "),
                    ...c,
                  },
                  [
                    ...t.map(([e, t]) => (0, s.createElement)(e, t)),
                    ...(Array.isArray(u) ? u : [u]),
                  ],
                ),
            );
            return (r.displayName = `${e}`), r;
          };
      },
      96648: (e, t, r) => {
        "use strict";
        r.d(t, { A: () => s });
        let s = (0, r(95255).A)("LogOut", [
          [
            "path",
            { d: "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4", key: "1uf3rs" },
          ],
          ["polyline", { points: "16 17 21 12 16 7", key: "1gabdz" }],
          ["line", { x1: "21", x2: "9", y1: "12", y2: "12", key: "1uyos4" }],
        ]);
      },
      98683: (e, t, r) => {
        "use strict";
        r.d(t, { A: () => s });
        let s = (0, r(95255).A)("CheckCircle2", [
          ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
          ["path", { d: "m9 12 2 2 4-4", key: "dzmm74" }],
        ]);
      },
      99793: (e, t, r) => {
        "use strict";
        r.d(t, { A: () => s });
        let s = (0, r(95255).A)("FileText", [
          [
            "path",
            {
              d: "M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z",
              key: "1rqfz7",
            },
          ],
          ["path", { d: "M14 2v4a2 2 0 0 0 2 2h4", key: "tnqrlb" }],
          ["path", { d: "M10 9H8", key: "b1mrlr" }],
          ["path", { d: "M16 13H8", key: "t4e002" }],
          ["path", { d: "M16 17H8", key: "z1uh3a" }],
        ]);
      },
    });
  var t = require("../../../../webpack-runtime.js");
  t.C(e);
  var r = (e) => t((t.s = e)),
    s = t.X(
      0,
      [
        827, 6518, 2033, 4027, 2872, 7713, 5149, 1655, 5728, 4990, 7272, 1578,
        4630, 6536,
      ],
      () => r(60212),
    );
  module.exports = s;
})();
//# sourceMappingURL=page.js.map
