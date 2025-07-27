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
    (e._sentryDebugIds[t] = "2b4234dc-25ad-4522-810b-e02952949e44"),
    (e._sentryDebugIdIdentifier =
      "sentry-dbid-2b4234dc-25ad-4522-810b-e02952949e44"));
} catch (e) {}
(() => {
  var e = {};
  (e.id = 7314),
    (e.ids = [7314]),
    (e.modules = {
      1278: (e, t, r) => {
        "use strict";
        r.d(t, { Qg: () => n, bL: () => l });
        var s = r(84205),
          a = r(56558),
          i = r(61268),
          n = Object.freeze({
            position: "absolute",
            border: 0,
            width: 1,
            height: 1,
            padding: 0,
            margin: -1,
            overflow: "hidden",
            clip: "rect(0, 0, 0, 0)",
            whiteSpace: "nowrap",
            wordWrap: "normal",
          }),
          o = s.forwardRef((e, t) =>
            (0, i.jsx)(a.sG.span, {
              ...e,
              ref: t,
              style: { ...n, ...e.style },
            }),
          );
        o.displayName = "VisuallyHidden";
        var l = o;
      },
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
            useHasRole: () => p,
            useIsAuthenticated: () => h,
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
            h = (0, i.UU)(),
            p = (0, a.useCallback)(async () => {
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
                  d(e), r(o(t));
                } else d(null), r(null);
              } catch (e) {
                console.error("Error refreshing session:", e), d(null), r(null);
              } finally {
                c(!1);
              }
            }, [h]),
            m = (0, a.useCallback)(
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
                    e?.session && (d(e.session), r(o(e.session.user)));
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
            f = (0, a.useCallback)(async () => {
              c(!0);
              try {
                let { error: e } = await h.auth.signOut();
                if (e) throw e;
                d(null), r(null);
              } catch (e) {
                console.error("Error signing out:", e);
              } finally {
                c(!1);
              }
            }, [h]),
            x = (0, a.useCallback)(
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
            y = (0, a.useCallback)(
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
            v = (0, a.useCallback)(
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
              session: n,
              isLoading: u,
              isAuthenticated: !!n,
              signIn: m,
              signOut: f,
              refreshSession: p,
              signUp: x,
              resetPassword: y,
              updatePassword: v,
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
        function h() {
          let { isAuthenticated: e } = u();
          return e;
        }
        function p(e) {
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
      14677: (e, t, r) => {
        "use strict";
        r.d(t, { A: () => s });
        let s = (0, r(95255).A)("Calendar", [
          ["path", { d: "M8 2v4", key: "1cmpym" }],
          ["path", { d: "M16 2v4", key: "4m81vk" }],
          [
            "rect",
            {
              width: "18",
              height: "18",
              x: "3",
              y: "4",
              rx: "2",
              key: "1hopcy",
            },
          ],
          ["path", { d: "M3 10h18", key: "8toen8" }],
        ]);
      },
      15090: (e, t, r) => {
        "use strict";
        r.d(t, { d: () => h });
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
        function h() {
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
        r.d(t, { AG: () => y, Iw: () => f, UU: () => x });
        var a = r(97713),
          i = r(15149),
          n = r.n(i),
          o = r(84205);
        let { fetch: l } = n()(),
          d = "http://localhost:54321",
          u =
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0",
          c = process.env.SUPABASE_SERVICE_ROLE_KEY,
          h = u ? { apikey: u } : void 0;
        function p() {
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
          return (p(), s)
            ? s
            : (s = (0, a.createBrowserClient)(d, u, {
                global: { headers: h },
              }));
        }
        function f() {
          return (0, o.useMemo)(m, []);
        }
        function x() {
          return (
            p(), (0, a.createBrowserClient)(d, u, { global: { headers: h } })
          );
        }
        let y = m;
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
      42414: (e, t, r) => {
        "use strict";
        r.d(t, { B: () => l });
        var s,
          a = r(84205),
          i = r(66130),
          n =
            (s || (s = r.t(a, 2)))[" useId ".trim().toString()] ||
            (() => void 0),
          o = 0;
        function l(e) {
          let [t, r] = a.useState(n());
          return (
            (0, i.N)(() => {
              e || r((e) => e ?? String(o++));
            }, [e]),
            e || (t ? `radix-${t}` : "")
          );
        }
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
      48161: (e) => {
        "use strict";
        e.exports = require("node:os");
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
          h = s.forwardRef((e, t) => {
            var r, s;
            let {
              __scopeProgress: a,
              value: o = null,
              max: l,
              getValueLabel: d = f,
              ...c
            } = e;
            (l || 0 === l) &&
              !v(l) &&
              console.error(
                ((r = `${l}`),
                `Invalid prop \`max\` of value \`${r}\` supplied to \`Progress\`. Only numbers greater than 0 are valid max values. Defaulting to \`100\`.`),
              );
            let h = v(l) ? l : 100;
            null === o ||
              g(o, h) ||
              console.error(
                ((s = `${o}`),
                `Invalid prop \`value\` of value \`${s}\` supplied to \`Progress\`. The \`value\` prop must be:
  - a positive number
  - less than the value passed to \`max\` (or 100 if no \`max\` prop is set)
  - \`null\` or \`undefined\` if the progress is indeterminate.

Defaulting to \`null\`.`),
              );
            let p = g(o, h) ? o : null,
              m = y(p) ? d(p, h) : void 0;
            return (0, n.jsx)(u, {
              scope: a,
              value: p,
              max: h,
              children: (0, n.jsx)(i.sG.div, {
                "aria-valuemax": h,
                "aria-valuemin": 0,
                "aria-valuenow": y(p) ? p : void 0,
                "aria-valuetext": m,
                role: "progressbar",
                "data-state": x(p, h),
                "data-value": p ?? void 0,
                "data-max": h,
                ...c,
                ref: t,
              }),
            });
          });
        h.displayName = o;
        var p = "ProgressIndicator",
          m = s.forwardRef((e, t) => {
            let { __scopeProgress: r, ...s } = e,
              a = c(p, r);
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
        function y(e) {
          return "number" == typeof e;
        }
        function v(e) {
          return y(e) && !isNaN(e) && e > 0;
        }
        function g(e, t) {
          return y(e) && !isNaN(e) && e <= t && e >= 0;
        }
        m.displayName = p;
        var w = h,
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
      58209: (e, t, r) => {
        "use strict";
        r.a(e, async (e, s) => {
          try {
            r.r(t), r.d(t, { default: () => y });
            var a = r(61268),
              i = r(3519),
              n = r(90286),
              o = r(31655),
              l = r.n(o),
              d = r(89882),
              u = r(84205),
              c = r(18476),
              h = r(15090),
              p = r(28909),
              m = r(5451),
              f = r(32367),
              x = e([c, p, m]);
            function y() {
              let e = (0, d.useParams)().id,
                { user: t } = (0, i.useAuth)(),
                [r, s] = (0, u.useState)(!0),
                [o, x] = (0, u.useState)(null),
                [y, v] = (0, u.useState)(null),
                { toast: g } = (0, h.d)(),
                w = (0, f.UU)(),
                b = async () => {
                  if (
                    confirm(
                      "Are you sure you want to delete this roadmap? This action cannot be undone.",
                    )
                  )
                    try {
                      let { error: t } = await w
                        .from("roadmaps")
                        .delete()
                        .eq("id", e);
                      if (t)
                        return void g({
                          title: "Error",
                          description: "Failed to delete roadmap",
                          variant: "destructive",
                        });
                      g({
                        title: "Success",
                        description: "Roadmap deleted successfully",
                      }),
                        (window.location.href = "/dashboard/roadmaps");
                    } catch (e) {
                      console.error(e),
                        g({
                          title: "Error",
                          description:
                            "An error occurred while deleting the roadmap",
                          variant: "destructive",
                        });
                    }
                };
              return r
                ? (0, a.jsx)("div", {
                    className: "container py-8",
                    children: (0, a.jsx)("div", {
                      className: "flex justify-center items-center h-64",
                      children: (0, a.jsx)("div", {
                        className:
                          "animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900",
                      }),
                    }),
                  })
                : o
                  ? (0, a.jsx)("div", {
                      className: "container py-8",
                      children: (0, a.jsxs)(m.Zp, {
                        children: [
                          (0, a.jsx)(m.aR, {
                            children: (0, a.jsx)(m.ZB, {
                              className: "text-lg text-red-600",
                              children: "Error",
                            }),
                          }),
                          (0, a.jsxs)(m.Wu, {
                            children: [
                              (0, a.jsx)("p", { children: o }),
                              (0, a.jsx)("div", {
                                className: "mt-4",
                                children: (0, a.jsx)(l(), {
                                  href: "/dashboard/roadmaps",
                                  legacyBehavior: !0,
                                  children: (0, a.jsxs)(p.$, {
                                    children: [
                                      (0, a.jsx)(n.A, {
                                        className: "mr-2 h-4 w-4",
                                      }),
                                      "Back to Roadmaps",
                                    ],
                                  }),
                                }),
                              }),
                            ],
                          }),
                        ],
                      }),
                    })
                  : (0, a.jsxs)("div", {
                      className: "container py-8",
                      children: [
                        (0, a.jsxs)("div", {
                          className: "flex justify-between items-center mb-6",
                          children: [
                            (0, a.jsx)(l(), {
                              href: "/dashboard/roadmaps",
                              legacyBehavior: !0,
                              children: (0, a.jsxs)(p.$, {
                                variant: "outline",
                                children: [
                                  (0, a.jsx)(n.A, {
                                    className: "mr-2 h-4 w-4",
                                  }),
                                  "Back to Roadmaps",
                                ],
                              }),
                            }),
                            t &&
                              y &&
                              y.user_id === t.id &&
                              (0, a.jsx)(p.$, {
                                variant: "destructive",
                                onClick: b,
                                children: "Delete Roadmap",
                              }),
                          ],
                        }),
                        y &&
                          t &&
                          (0, a.jsx)(c.A, { roadmapId: e, userId: t.id }),
                        y &&
                          y.cases &&
                          (0, a.jsx)("div", {
                            className: "mt-8",
                            children: (0, a.jsxs)(m.Zp, {
                              children: [
                                (0, a.jsx)(m.aR, {
                                  children: (0, a.jsx)(m.ZB, {
                                    className: "text-lg",
                                    children: "Related Case",
                                  }),
                                }),
                                (0, a.jsxs)(m.Wu, {
                                  children: [
                                    (0, a.jsxs)("p", {
                                      children: [
                                        (0, a.jsx)("span", {
                                          className: "font-medium",
                                          children: "Case Title:",
                                        }),
                                        " ",
                                        y.cases.title,
                                      ],
                                    }),
                                    (0, a.jsxs)("p", {
                                      children: [
                                        (0, a.jsx)("span", {
                                          className: "font-medium",
                                          children: "Case Number:",
                                        }),
                                        " ",
                                        y.cases.case_number,
                                      ],
                                    }),
                                    (0, a.jsxs)("p", {
                                      children: [
                                        (0, a.jsx)("span", {
                                          className: "font-medium",
                                          children: "Status:",
                                        }),
                                        " ",
                                        y.cases.status,
                                      ],
                                    }),
                                    (0, a.jsxs)("div", {
                                      className: "mt-4",
                                      children: [
                                        (0, a.jsx)(l(), {
                                          href: `/dashboard/cases/${y.case_id}`,
                                          legacyBehavior: !0,
                                          children: (0, a.jsx)(p.$, {
                                            variant: "outline",
                                            children: "View Case",
                                          }),
                                        }),
                                        (0, a.jsx)(l(), {
                                          href: `/dashboard/cases/${y.case_id}/roadmap`,
                                          className: "ml-2",
                                          legacyBehavior: !0,
                                          children: (0, a.jsx)(p.$, {
                                            variant: "outline",
                                            children: "Manage Roadmaps",
                                          }),
                                        }),
                                      ],
                                    }),
                                  ],
                                }),
                              ],
                            }),
                          }),
                      ],
                    });
            }
            ([c, p, m] = x.then ? (await x)() : x), s();
          } catch (e) {
            s(e);
          }
        });
      },
      59570: () => {},
      60784: (e, t, r) => {
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
                              "[id]",
                              {
                                children: [
                                  "__PAGE__",
                                  {},
                                  {
                                    page: [
                                      () =>
                                        Promise.resolve().then(
                                          r.bind(r, 80681),
                                        ),
                                      "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\(authenticated)\\dashboard\\roadmaps\\[id]\\page.tsx",
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
            "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\(authenticated)\\dashboard\\roadmaps\\[id]\\page.tsx",
          ],
          u = { require: r, loadChunk: () => Promise.resolve() },
          c = new s.AppPageRouteModule({
            definition: {
              kind: a.RouteKind.APP_PAGE,
              page: "/(authenticated)/dashboard/roadmaps/[id]/page",
              pathname: "/dashboard/roadmaps/[id]",
              bundlePath: "",
              filename: "",
              appPaths: [],
            },
            userland: { loaderTree: l },
          });
      },
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
        function h(e, t) {
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
      70753: (e, t, r) => {
        "use strict";
        r.d(t, { A: () => s });
        let s = (0, r(95255).A)("ChevronDown", [
          ["path", { d: "m6 9 6 6 6-6", key: "qrunsl" }],
        ]);
      },
      73024: (e) => {
        "use strict";
        e.exports = require("node:fs");
      },
      73566: (e) => {
        "use strict";
        e.exports = require("worker_threads");
      },
      73597: (e, t, r) => {
        Promise.resolve().then(r.bind(r, 58209));
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
      77826: (e, t, r) => {
        Promise.resolve().then(r.bind(r, 80681));
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
      80681: (e, t, r) => {
        "use strict";
        let s;
        r.r(t),
          r.d(t, {
            default: () => p,
            generateImageMetadata: () => c,
            generateMetadata: () => u,
            generateViewport: () => h,
          });
        var a = r(63033),
          i = r(26394),
          n = r(60442),
          o = (0, i.registerClientReference)(
            function () {
              throw Error(
                "Attempted to call the default export of \"E:\\\\downloads\\\\Hijraah\\\\apps\\\\web\\\\src\\\\app\\\\(authenticated)\\\\dashboard\\\\roadmaps\\\\[id]\\\\page.tsx\" from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
              );
            },
            "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\(authenticated)\\dashboard\\roadmaps\\[id]\\page.tsx",
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
                      componentRoute:
                        "/(authenticated)/dashboard/roadmaps/[id]",
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
          h = void 0,
          p = s;
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
      90286: (e, t, r) => {
        "use strict";
        r.d(t, { A: () => s });
        let s = (0, r(95255).A)("ArrowLeft", [
          ["path", { d: "m12 19-7-7 7-7", key: "1l729n" }],
          ["path", { d: "M19 12H5", key: "x3x0zl" }],
        ]);
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
  var t = require("../../../../../webpack-runtime.js");
  t.C(e);
  var r = (e) => t((t.s = e)),
    s = t.X(
      0,
      [
        827, 6518, 2033, 4027, 2872, 7713, 5149, 8859, 1655, 8029, 5728, 9729,
        3390, 4990, 7272, 6867, 1578, 4630, 6536, 1603, 8476,
      ],
      () => r(60784),
    );
  module.exports = s;
})();
//# sourceMappingURL=page.js.map
