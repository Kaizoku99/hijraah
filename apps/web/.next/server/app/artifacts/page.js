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
    (e._sentryDebugIds[t] = "77db337e-1b1c-4548-a2ca-b1a63acedffa"),
    (e._sentryDebugIdIdentifier =
      "sentry-dbid-77db337e-1b1c-4548-a2ca-b1a63acedffa"));
} catch (e) {}
(() => {
  var e = {};
  (e.id = 6486),
    (e.ids = [6486]),
    (e.modules = {
      1278: (e, t, r) => {
        "use strict";
        r.d(t, { Qg: () => i, bL: () => l });
        var s = r(84205),
          a = r(56558),
          n = r(61268),
          i = Object.freeze({
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
            (0, n.jsx)(a.sG.span, {
              ...e,
              ref: t,
              style: { ...i, ...e.style },
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
            useHasRole: () => f,
            useIsAuthenticated: () => p,
            useSession: () => h,
            useUser: () => c,
          });
        var s = r(61268),
          a = r(84205),
          n = r(32367),
          i = r(61460);
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
            [i, d] = (0, a.useState)(null),
            [u, c] = (0, a.useState)(!0),
            p = (0, n.UU)(),
            f = (0, a.useCallback)(async () => {
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
            h = (0, a.useCallback)(async () => {
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
            b = (0, a.useCallback)(
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
              session: i,
              isLoading: u,
              isAuthenticated: !!i,
              signIn: m,
              signOut: h,
              refreshSession: f,
              signUp: x,
              resetPassword: g,
              updatePassword: b,
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
        function f(e) {
          let t = c();
          return t?.role === e;
        }
        function m(e) {
          let t = c();
          return (0, i._m)(t, e);
        }
        function h() {
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
      7839: (e, t, r) => {
        "use strict";
        r.d(t, { jH: () => n });
        var s = r(84205);
        r(61268);
        var a = s.createContext(void 0);
        function n(e) {
          let t = s.useContext(a);
          return e || t || "ltr";
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
      11316: (e, t, r) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          Object.defineProperty(t, "notFound", {
            enumerable: !0,
            get: function () {
              return a;
            },
          });
        let s = "" + r(17581).HTTP_ERROR_FALLBACK_ERROR_CODE + ";404";
        function a() {
          let e = Object.defineProperty(Error(s), "__NEXT_ERROR_CODE", {
            value: "E394",
            enumerable: !1,
            configurable: !0,
          });
          throw ((e.digest = s), e);
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
        function s() {
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
              return s;
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
      15014: (e, t, r) => {
        "use strict";
        r.d(t, { A: () => s });
        let s = (0, r(95255).A)("Trash2", [
          ["path", { d: "M3 6h18", key: "d0wm0j" }],
          [
            "path",
            { d: "M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6", key: "4alrt4" },
          ],
          ["path", { d: "M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2", key: "v07s0e" }],
          ["line", { x1: "10", x2: "10", y1: "11", y2: "17", key: "1uufr5" }],
          ["line", { x1: "14", x2: "14", y1: "11", y2: "17", key: "xtxkd" }],
        ]);
      },
      15127: (e, t, r) => {
        "use strict";
        r.d(t, { A: () => s });
        let s = (0, r(95255).A)("Plus", [
          ["path", { d: "M5 12h14", key: "1ays0h" }],
          ["path", { d: "M12 5v14", key: "s699le" }],
        ]);
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
                  (0, i.isNextRouterError)(t) ||
                  (0, n.isBailoutToCSRError)(t) ||
                  (0, l.isDynamicServerError)(t) ||
                  (0, o.isDynamicPostpone)(t) ||
                  (0, a.isPostpone)(t) ||
                  (0, s.isHangingPromiseRejectionError)(t)
                )
                  throw t;
                t instanceof Error && "cause" in t && e(t.cause);
              };
            },
          });
        let s = r(6223),
          a = r(96124),
          n = r(58937),
          i = r(91613),
          o = r(62938),
          l = r(98800);
        ("function" == typeof t.default ||
          ("object" == typeof t.default && null !== t.default)) &&
          void 0 === t.default.__esModule &&
          (Object.defineProperty(t.default, "__esModule", { value: !0 }),
          Object.assign(t.default, t),
          (e.exports = t.default));
      },
      27896: (e, t, r) => {
        "use strict";
        r.d(t, { A: () => s });
        let s = (0, r(95255).A)("Lock", [
          [
            "rect",
            {
              width: "18",
              height: "11",
              x: "3",
              y: "11",
              rx: "2",
              ry: "2",
              key: "1w4ew1",
            },
          ],
          ["path", { d: "M7 11V7a5 5 0 0 1 10 0v4", key: "fwvmzm" }],
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
      28366: (e, t, r) => {
        "use strict";
        r.d(t, { B8: () => P, UC: () => k, bL: () => C, l9: () => O });
        var s = r(84205),
          a = r(28777),
          n = r(18047),
          i = r(59150),
          o = r(94653),
          l = r(78593),
          d = r(7839),
          u = r(48705),
          c = r(42414),
          p = r(61268),
          f = "Tabs",
          [m, h] = (0, n.A)(f, [i.RG]),
          x = (0, i.RG)(),
          [g, b] = m(f),
          v = s.forwardRef((e, t) => {
            let {
                __scopeTabs: r,
                value: s,
                onValueChange: a,
                defaultValue: n,
                orientation: i = "horizontal",
                dir: o,
                activationMode: m = "automatic",
                ...h
              } = e,
              x = (0, d.jH)(o),
              [b, v] = (0, u.i)({
                prop: s,
                onChange: a,
                defaultProp: n ?? "",
                caller: f,
              });
            return (0, p.jsx)(g, {
              scope: r,
              baseId: (0, c.B)(),
              value: b,
              onValueChange: v,
              orientation: i,
              dir: x,
              activationMode: m,
              children: (0, p.jsx)(l.sG.div, {
                dir: x,
                "data-orientation": i,
                ...h,
                ref: t,
              }),
            });
          });
        v.displayName = f;
        var y = "TabsList",
          w = s.forwardRef((e, t) => {
            let { __scopeTabs: r, loop: s = !0, ...a } = e,
              n = b(y, r),
              o = x(r);
            return (0, p.jsx)(i.bL, {
              asChild: !0,
              ...o,
              orientation: n.orientation,
              dir: n.dir,
              loop: s,
              children: (0, p.jsx)(l.sG.div, {
                role: "tablist",
                "aria-orientation": n.orientation,
                ...a,
                ref: t,
              }),
            });
          });
        w.displayName = y;
        var j = "TabsTrigger",
          _ = s.forwardRef((e, t) => {
            let { __scopeTabs: r, value: s, disabled: n = !1, ...o } = e,
              d = b(j, r),
              u = x(r),
              c = E(d.baseId, s),
              f = A(d.baseId, s),
              m = s === d.value;
            return (0, p.jsx)(i.q7, {
              asChild: !0,
              ...u,
              focusable: !n,
              active: m,
              children: (0, p.jsx)(l.sG.button, {
                type: "button",
                role: "tab",
                "aria-selected": m,
                "aria-controls": f,
                "data-state": m ? "active" : "inactive",
                "data-disabled": n ? "" : void 0,
                disabled: n,
                id: c,
                ...o,
                ref: t,
                onMouseDown: (0, a.m)(e.onMouseDown, (e) => {
                  n || 0 !== e.button || !1 !== e.ctrlKey
                    ? e.preventDefault()
                    : d.onValueChange(s);
                }),
                onKeyDown: (0, a.m)(e.onKeyDown, (e) => {
                  [" ", "Enter"].includes(e.key) && d.onValueChange(s);
                }),
                onFocus: (0, a.m)(e.onFocus, () => {
                  let e = "manual" !== d.activationMode;
                  m || n || !e || d.onValueChange(s);
                }),
              }),
            });
          });
        _.displayName = j;
        var R = "TabsContent",
          N = s.forwardRef((e, t) => {
            let {
                __scopeTabs: r,
                value: a,
                forceMount: n,
                children: i,
                ...d
              } = e,
              u = b(R, r),
              c = E(u.baseId, a),
              f = A(u.baseId, a),
              m = a === u.value,
              h = s.useRef(m);
            return (
              s.useEffect(() => {
                let e = requestAnimationFrame(() => (h.current = !1));
                return () => cancelAnimationFrame(e);
              }, []),
              (0, p.jsx)(o.C, {
                present: n || m,
                children: ({ present: r }) =>
                  (0, p.jsx)(l.sG.div, {
                    "data-state": m ? "active" : "inactive",
                    "data-orientation": u.orientation,
                    role: "tabpanel",
                    "aria-labelledby": c,
                    hidden: !r,
                    id: f,
                    tabIndex: 0,
                    ...d,
                    ref: t,
                    style: {
                      ...e.style,
                      animationDuration: h.current ? "0s" : void 0,
                    },
                    children: r && i,
                  }),
              })
            );
          });
        function E(e, t) {
          return `${e}-trigger-${t}`;
        }
        function A(e, t) {
          return `${e}-content-${t}`;
        }
        N.displayName = R;
        var C = v,
          P = w,
          O = _,
          k = N;
      },
      29021: (e) => {
        "use strict";
        e.exports = require("fs");
      },
      29073: (e, t, r) => {
        "use strict";
        var s = r(90645);
        r.o(s, "notFound") &&
          r.d(t, {
            notFound: function () {
              return s.notFound;
            },
          }),
          r.o(s, "permanentRedirect") &&
            r.d(t, {
              permanentRedirect: function () {
                return s.permanentRedirect;
              },
            }),
          r.o(s, "redirect") &&
            r.d(t, {
              redirect: function () {
                return s.redirect;
              },
            });
      },
      29294: (e) => {
        "use strict";
        e.exports = require("next/dist/server/app-render/work-async-storage.external.js");
      },
      30205: (e, t, r) => {
        "use strict";
        r.a(e, async (e, s) => {
          try {
            r.d(t, {
              Cf: () => m,
              Es: () => x,
              L3: () => g,
              c7: () => h,
              lG: () => u,
              rr: () => b,
              zM: () => c,
            });
            var a = r(61268),
              n = r(33459),
              i = r(90495),
              o = r(84205),
              l = r(15942),
              d = e([l]);
            l = (d.then ? (await d)() : d)[0];
            let u = n.bL,
              c = n.l9,
              p = n.ZL;
            n.bm;
            let f = o.forwardRef(({ className: e, ...t }, r) =>
              (0, a.jsx)(n.hJ, {
                ref: r,
                className: (0, l.cn)(
                  "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
                  e,
                ),
                ...t,
              }),
            );
            f.displayName = n.hJ.displayName;
            let m = o.forwardRef(({ className: e, children: t, ...r }, s) =>
              (0, a.jsxs)(p, {
                children: [
                  (0, a.jsx)(f, {}),
                  (0, a.jsxs)(n.UC, {
                    ref: s,
                    className: (0, l.cn)(
                      "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
                      e,
                    ),
                    ...r,
                    children: [
                      t,
                      (0, a.jsxs)(n.bm, {
                        className:
                          "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground",
                        children: [
                          (0, a.jsx)(i.A, { className: "h-4 w-4" }),
                          (0, a.jsx)("span", {
                            className: "sr-only",
                            children: "Close",
                          }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
            );
            m.displayName = n.UC.displayName;
            let h = ({ className: e, ...t }) =>
              (0, a.jsx)("div", {
                className: (0, l.cn)(
                  "flex flex-col space-y-1.5 text-center sm:text-left",
                  e,
                ),
                ...t,
              });
            h.displayName = "DialogHeader";
            let x = ({ className: e, ...t }) =>
              (0, a.jsx)("div", {
                className: (0, l.cn)(
                  "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
                  e,
                ),
                ...t,
              });
            x.displayName = "DialogFooter";
            let g = o.forwardRef(({ className: e, ...t }, r) =>
              (0, a.jsx)(n.hE, {
                ref: r,
                className: (0, l.cn)(
                  "text-lg font-semibold leading-none tracking-tight",
                  e,
                ),
                ...t,
              }),
            );
            g.displayName = n.hE.displayName;
            let b = o.forwardRef(({ className: e, ...t }, r) =>
              (0, a.jsx)(n.VY, {
                ref: r,
                className: (0, l.cn)("text-sm text-muted-foreground", e),
                ...t,
              }),
            );
            (b.displayName = n.VY.displayName), s();
          } catch (e) {
            s(e);
          }
        });
      },
      31421: (e) => {
        "use strict";
        e.exports = require("node:child_process");
      },
      32367: (e, t, r) => {
        "use strict";
        let s;
        r.d(t, { AG: () => g, Iw: () => h, UU: () => x });
        var a = r(97713),
          n = r(15149),
          i = r.n(n),
          o = r(84205);
        let { fetch: l } = i()(),
          d = "http://localhost:54321",
          u =
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0",
          c = process.env.SUPABASE_SERVICE_ROLE_KEY,
          p = u ? { apikey: u } : void 0;
        function f() {
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
          return (f(), s)
            ? s
            : (s = (0, a.createBrowserClient)(d, u, {
                global: { headers: p },
              }));
        }
        function h() {
          return (0, o.useMemo)(m, []);
        }
        function x() {
          return (
            f(), (0, a.createBrowserClient)(d, u, { global: { headers: p } })
          );
        }
        let g = m;
        m();
      },
      33873: (e) => {
        "use strict";
        e.exports = require("path");
      },
      34464: (e, t, r) => {
        "use strict";
        r.r(t),
          r.d(t, {
            GlobalError: () => n.default,
            __next_app__: () => u,
            pages: () => d,
            routeModule: () => c,
            tree: () => l,
          });
        var s = r(11610),
          a = r(51293),
          n = r(59059),
          i = r(17770),
          o = {};
        for (let e in i)
          0 >
            [
              "default",
              "tree",
              "pages",
              "GlobalError",
              "__next_app__",
              "routeModule",
            ].indexOf(e) && (o[e] = () => i[e]);
        r.d(t, o);
        let l = {
            children: [
              "",
              {
                children: [
                  "artifacts",
                  {
                    children: [
                      "__PAGE__",
                      {},
                      {
                        page: [
                          () => Promise.resolve().then(r.bind(r, 34469)),
                          "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\artifacts\\page.tsx",
                        ],
                      },
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
          d = [
            "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\artifacts\\page.tsx",
          ],
          u = { require: r, loadChunk: () => Promise.resolve() },
          c = new s.AppPageRouteModule({
            definition: {
              kind: a.RouteKind.APP_PAGE,
              page: "/artifacts/page",
              pathname: "/artifacts",
              bundlePath: "",
              filename: "",
              appPaths: [],
            },
            userland: { loaderTree: l },
          });
      },
      34469: (e, t, r) => {
        "use strict";
        let s;
        r.r(t),
          r.d(t, {
            default: () => x,
            generateImageMetadata: () => m,
            generateMetadata: () => f,
            generateViewport: () => h,
          });
        var a = r(63033),
          n = r(35242),
          i = r(29073);
        r(84147);
        var o = r(67268),
          l = r(14795),
          d = r(60442);
        async function u() {
          let e = await (0, l.j2)();
          return (
            e?.user || (0, i.redirect)("/login?callbackUrl=/artifacts"),
            (0, n.jsx)("div", {
              className: "min-h-screen",
              children: (0, n.jsx)(o.ArtifactGallery, {}),
            })
          );
        }
        let c = { ...a },
          p =
            "workUnitAsyncStorage" in c
              ? c.workUnitAsyncStorage
              : "requestAsyncStorage" in c
                ? c.requestAsyncStorage
                : void 0;
        s = new Proxy(u, {
          apply: (e, t, r) => {
            let s, a, n;
            try {
              let e = p?.getStore();
              (s = e?.headers.get("sentry-trace") ?? void 0),
                (a = e?.headers.get("baggage") ?? void 0),
                (n = e?.headers);
            } catch (e) {}
            return d
              .wrapServerComponentWithSentry(e, {
                componentRoute: "/artifacts",
                componentType: "Page",
                sentryTraceHeader: s,
                baggageHeader: a,
                headers: n,
              })
              .apply(t, r);
          },
        });
        let f = void 0,
          m = void 0,
          h = void 0,
          x = s;
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
      42414: (e, t, r) => {
        "use strict";
        r.d(t, { B: () => l });
        var s,
          a = r(84205),
          n = r(66130),
          i =
            (s || (s = r.t(a, 2)))[" useId ".trim().toString()] ||
            (() => void 0),
          o = 0;
        function l(e) {
          let [t, r] = a.useState(i());
          return (
            (0, n.N)(() => {
              e || r((e) => e ?? String(o++));
            }, [e]),
            e || (t ? `radix-${t}` : "")
          );
        }
      },
      42600: (e, t, r) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          Object.defineProperty(t, "unstable_rethrow", {
            enumerable: !0,
            get: function () {
              return s;
            },
          });
        let s = r(23399).unstable_rethrow;
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
      44803: (e, t, r) => {
        "use strict";
        r.d(t, { A: () => s });
        let s = (0, r(95255).A)("Search", [
          ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }],
          ["path", { d: "m21 21-4.3-4.3", key: "1qie3q" }],
        ]);
      },
      48161: (e) => {
        "use strict";
        e.exports = require("node:os");
      },
      52480: (e, t, r) => {
        "use strict";
        function s() {
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
              return s;
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
        r.d(t, { RG: () => w, bL: () => O, q7: () => k });
        var s = r(84205),
          a = r(28777),
          n = r(28029),
          i = r(71604),
          o = r(18047),
          l = r(42414),
          d = r(78593),
          u = r(10308),
          c = r(48705),
          p = r(7839),
          f = r(61268),
          m = "rovingFocusGroup.onEntryFocus",
          h = { bubbles: !1, cancelable: !0 },
          x = "RovingFocusGroup",
          [g, b, v] = (0, n.N)(x),
          [y, w] = (0, o.A)(x, [v]),
          [j, _] = y(x),
          R = s.forwardRef((e, t) =>
            (0, f.jsx)(g.Provider, {
              scope: e.__scopeRovingFocusGroup,
              children: (0, f.jsx)(g.Slot, {
                scope: e.__scopeRovingFocusGroup,
                children: (0, f.jsx)(N, { ...e, ref: t }),
              }),
            }),
          );
        R.displayName = x;
        var N = s.forwardRef((e, t) => {
            let {
                __scopeRovingFocusGroup: r,
                orientation: n,
                loop: o = !1,
                dir: l,
                currentTabStopId: g,
                defaultCurrentTabStopId: v,
                onCurrentTabStopIdChange: y,
                onEntryFocus: w,
                preventScrollOnEntryFocus: _ = !1,
                ...R
              } = e,
              N = s.useRef(null),
              E = (0, i.s)(t, N),
              A = (0, p.jH)(l),
              [C, O] = (0, c.i)({
                prop: g,
                defaultProp: v ?? null,
                onChange: y,
                caller: x,
              }),
              [k, S] = s.useState(!1),
              q = (0, u.c)(w),
              T = b(r),
              M = s.useRef(!1),
              [I, U] = s.useState(0);
            return (
              s.useEffect(() => {
                let e = N.current;
                if (e)
                  return (
                    e.addEventListener(m, q), () => e.removeEventListener(m, q)
                  );
              }, [q]),
              (0, f.jsx)(j, {
                scope: r,
                orientation: n,
                dir: A,
                loop: o,
                currentTabStopId: C,
                onItemFocus: s.useCallback((e) => O(e), [O]),
                onItemShiftTab: s.useCallback(() => S(!0), []),
                onFocusableItemAdd: s.useCallback(() => U((e) => e + 1), []),
                onFocusableItemRemove: s.useCallback(() => U((e) => e - 1), []),
                children: (0, f.jsx)(d.sG.div, {
                  tabIndex: k || 0 === I ? -1 : 0,
                  "data-orientation": n,
                  ...R,
                  ref: E,
                  style: { outline: "none", ...e.style },
                  onMouseDown: (0, a.m)(e.onMouseDown, () => {
                    M.current = !0;
                  }),
                  onFocus: (0, a.m)(e.onFocus, (e) => {
                    let t = !M.current;
                    if (e.target === e.currentTarget && t && !k) {
                      let t = new CustomEvent(m, h);
                      if (
                        (e.currentTarget.dispatchEvent(t), !t.defaultPrevented)
                      ) {
                        let e = T().filter((e) => e.focusable);
                        P(
                          [
                            e.find((e) => e.active),
                            e.find((e) => e.id === C),
                            ...e,
                          ]
                            .filter(Boolean)
                            .map((e) => e.ref.current),
                          _,
                        );
                      }
                    }
                    M.current = !1;
                  }),
                  onBlur: (0, a.m)(e.onBlur, () => S(!1)),
                }),
              })
            );
          }),
          E = "RovingFocusGroupItem",
          A = s.forwardRef((e, t) => {
            let {
                __scopeRovingFocusGroup: r,
                focusable: n = !0,
                active: i = !1,
                tabStopId: o,
                children: u,
                ...c
              } = e,
              p = (0, l.B)(),
              m = o || p,
              h = _(E, r),
              x = h.currentTabStopId === m,
              v = b(r),
              {
                onFocusableItemAdd: y,
                onFocusableItemRemove: w,
                currentTabStopId: j,
              } = h;
            return (
              s.useEffect(() => {
                if (n) return y(), () => w();
              }, [n, y, w]),
              (0, f.jsx)(g.ItemSlot, {
                scope: r,
                id: m,
                focusable: n,
                active: i,
                children: (0, f.jsx)(d.sG.span, {
                  tabIndex: x ? 0 : -1,
                  "data-orientation": h.orientation,
                  ...c,
                  ref: t,
                  onMouseDown: (0, a.m)(e.onMouseDown, (e) => {
                    n ? h.onItemFocus(m) : e.preventDefault();
                  }),
                  onFocus: (0, a.m)(e.onFocus, () => h.onItemFocus(m)),
                  onKeyDown: (0, a.m)(e.onKeyDown, (e) => {
                    if ("Tab" === e.key && e.shiftKey)
                      return void h.onItemShiftTab();
                    if (e.target !== e.currentTarget) return;
                    let t = (function (e, t, r) {
                      var s;
                      let a =
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
                          ["ArrowLeft", "ArrowRight"].includes(a)
                        ) &&
                        !(
                          "horizontal" === t &&
                          ["ArrowUp", "ArrowDown"].includes(a)
                        )
                      )
                        return C[a];
                    })(e, h.orientation, h.dir);
                    if (void 0 !== t) {
                      if (e.metaKey || e.ctrlKey || e.altKey || e.shiftKey)
                        return;
                      e.preventDefault();
                      let r = v()
                        .filter((e) => e.focusable)
                        .map((e) => e.ref.current);
                      if ("last" === t) r.reverse();
                      else if ("prev" === t || "next" === t) {
                        "prev" === t && r.reverse();
                        let s = r.indexOf(e.currentTarget);
                        r = h.loop
                          ? (function (e, t) {
                              return e.map((r, s) => e[(t + s) % e.length]);
                            })(r, s + 1)
                          : r.slice(s + 1);
                      }
                      setTimeout(() => P(r));
                    }
                  }),
                  children:
                    "function" == typeof u
                      ? u({ isCurrentTabStop: x, hasTabStop: null != j })
                      : u,
                }),
              })
            );
          });
        A.displayName = E;
        var C = {
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
        var O = R,
          k = A;
      },
      59570: () => {},
      59766: (e, t, r) => {
        "use strict";
        r.a(e, async (e, s) => {
          try {
            r.d(t, { ArtifactGallery: () => N });
            var a = r(61268),
              n = r(99793),
              i = r(63942),
              o = r(14478),
              l = r(63806),
              d = r(14711),
              u = r(96465),
              c = r(27896),
              p = r(15127),
              f = r(44803),
              m = r(15014),
              h = r(89882),
              x = r(84205),
              g = r(52827),
              b = r(28909),
              v = r(5451),
              y = r(30205),
              w = r(78337),
              j = r(95957),
              _ = r(87826),
              R = e([g, b, v, y, w, j, _]);
            function N() {
              let {
                  artifacts: e,
                  deleteArtifact: t,
                  updateArtifactVisibility: r,
                  isLoading: s,
                } = (0, _.S)(),
                [R, N] = (0, x.useState)(""),
                [E, A] = (0, x.useState)("all"),
                [C, P] = (0, x.useState)("all"),
                [O, k] = (0, x.useState)(null),
                S = (0, h.useRouter)(),
                q = e.filter((e) => {
                  let t = e.title.toLowerCase().includes(R.toLowerCase()),
                    r = "all" === E || e.type === E,
                    s = "all" === C || e.visibility === C;
                  return t && r && s;
                }),
                T = async (e, r) => {
                  r.preventDefault(),
                    r.stopPropagation(),
                    window.confirm(
                      "Are you sure you want to delete this artifact?",
                    ) && (await t(e));
                },
                M = async (e, t, s) => {
                  s.preventDefault(), s.stopPropagation(), await r(e, t);
                },
                I = (e) => {
                  k(e);
                },
                U = () => {
                  k(null);
                },
                F = (e) => {
                  switch (e) {
                    case "document":
                    default:
                      return (0, a.jsx)(n.A, { className: "h-4 w-4" });
                    case "code":
                      return (0, a.jsx)(i.A, { className: "h-4 w-4" });
                    case "spreadsheet":
                      return (0, a.jsx)(o.A, { className: "h-4 w-4" });
                    case "image":
                      return (0, a.jsx)(l.A, { className: "h-4 w-4" });
                  }
                },
                D = (e) => {
                  switch (e) {
                    case "public":
                      return (0, a.jsx)(d.A, { className: "h-4 w-4" });
                    case "team":
                      return (0, a.jsx)(u.A, { className: "h-4 w-4" });
                    default:
                      return (0, a.jsx)(c.A, { className: "h-4 w-4" });
                  }
                };
              return (0, a.jsxs)("div", {
                className: "container mx-auto py-6",
                children: [
                  (0, a.jsxs)("div", {
                    className: "flex justify-between items-center mb-6",
                    children: [
                      (0, a.jsx)("h1", {
                        className: "text-2xl font-bold",
                        children: "Your Artifacts",
                      }),
                      (0, a.jsxs)(b.$, {
                        onClick: () => S.push("/create-artifact"),
                        children: [
                          (0, a.jsx)(p.A, { className: "h-4 w-4 mr-2" }),
                          "Create New",
                        ],
                      }),
                    ],
                  }),
                  (0, a.jsxs)("div", {
                    className: "flex flex-col md:flex-row gap-4 mb-6",
                    children: [
                      (0, a.jsxs)("div", {
                        className: "relative flex-grow",
                        children: [
                          (0, a.jsx)(f.A, {
                            className:
                              "absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground",
                          }),
                          (0, a.jsx)(w.p, {
                            placeholder: "Search artifacts...",
                            className: "pl-8",
                            value: R,
                            onChange: (e) => N(e.target.value),
                          }),
                        ],
                      }),
                      (0, a.jsxs)(j.l6, {
                        value: E,
                        onValueChange: A,
                        children: [
                          (0, a.jsx)(j.bq, {
                            className: "w-[180px]",
                            children: (0, a.jsx)(j.yv, {
                              placeholder: "Filter by type",
                            }),
                          }),
                          (0, a.jsxs)(j.gC, {
                            children: [
                              (0, a.jsx)(j.eb, {
                                value: "all",
                                children: "All Types",
                              }),
                              (0, a.jsx)(j.eb, {
                                value: "document",
                                children: "Documents",
                              }),
                              (0, a.jsx)(j.eb, {
                                value: "code",
                                children: "Code",
                              }),
                              (0, a.jsx)(j.eb, {
                                value: "spreadsheet",
                                children: "Spreadsheets",
                              }),
                              (0, a.jsx)(j.eb, {
                                value: "image",
                                children: "Images",
                              }),
                              (0, a.jsx)(j.eb, {
                                value: "mindmap",
                                children: "Mind Maps",
                              }),
                            ],
                          }),
                        ],
                      }),
                      (0, a.jsxs)(j.l6, {
                        value: C,
                        onValueChange: P,
                        children: [
                          (0, a.jsx)(j.bq, {
                            className: "w-[180px]",
                            children: (0, a.jsx)(j.yv, {
                              placeholder: "Filter by visibility",
                            }),
                          }),
                          (0, a.jsxs)(j.gC, {
                            children: [
                              (0, a.jsx)(j.eb, {
                                value: "all",
                                children: "All Visibility",
                              }),
                              (0, a.jsx)(j.eb, {
                                value: "private",
                                children: "Private",
                              }),
                              (0, a.jsx)(j.eb, {
                                value: "team",
                                children: "Team",
                              }),
                              (0, a.jsx)(j.eb, {
                                value: "public",
                                children: "Public",
                              }),
                            ],
                          }),
                        ],
                      }),
                    ],
                  }),
                  s
                    ? (0, a.jsx)("div", {
                        className:
                          "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4",
                        children: [...Array(6)].map((e, t) =>
                          (0, a.jsx)(
                            v.Zp,
                            {
                              className: "w-full h-48 animate-pulse",
                              children: (0, a.jsx)(v.Wu, {
                                className:
                                  "p-6 flex items-center justify-center",
                                children: (0, a.jsx)("div", {
                                  className:
                                    "h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4",
                                }),
                              }),
                            },
                            t,
                          ),
                        ),
                      })
                    : 0 === q.length
                      ? (0, a.jsxs)("div", {
                          className:
                            "flex flex-col items-center justify-center py-12",
                          children: [
                            (0, a.jsx)("p", {
                              className: "text-muted-foreground mb-4",
                              children: "No artifacts found",
                            }),
                            (0, a.jsx)(b.$, {
                              variant: "outline",
                              onClick: () => S.push("/create-artifact"),
                              children: "Create your first artifact",
                            }),
                          ],
                        })
                      : (0, a.jsx)("div", {
                          className:
                            "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4",
                          children: q.map((e) =>
                            (0, a.jsxs)(
                              v.Zp,
                              {
                                className:
                                  "cursor-pointer hover:border-primary/50 transition-colors",
                                onClick: () => I(e.id),
                                children: [
                                  (0, a.jsx)(v.aR, {
                                    className: "p-4 pb-2",
                                    children: (0, a.jsxs)("div", {
                                      className:
                                        "flex justify-between items-center",
                                      children: [
                                        (0, a.jsxs)("div", {
                                          className:
                                            "flex items-center space-x-2",
                                          children: [
                                            F(e.type),
                                            (0, a.jsx)("span", {
                                              className: "font-medium truncate",
                                              children: e.title,
                                            }),
                                          ],
                                        }),
                                        (0, a.jsxs)("div", {
                                          className: "flex space-x-1",
                                          children: [
                                            (0, a.jsx)(b.$, {
                                              variant: "ghost",
                                              size: "icon",
                                              className: "h-7 w-7",
                                              onClick: (t) => {
                                                let r =
                                                  "private" === e.visibility
                                                    ? "team"
                                                    : "team" === e.visibility
                                                      ? "public"
                                                      : "private";
                                                M(e.id, r, t);
                                              },
                                              children: D(e.visibility),
                                            }),
                                            (0, a.jsx)(b.$, {
                                              variant: "ghost",
                                              size: "icon",
                                              className:
                                                "h-7 w-7 text-destructive hover:text-destructive",
                                              onClick: (t) => T(e.id, t),
                                              children: (0, a.jsx)(m.A, {
                                                className: "h-4 w-4",
                                              }),
                                            }),
                                          ],
                                        }),
                                      ],
                                    }),
                                  }),
                                  (0, a.jsx)(v.Wu, {
                                    className: "p-4 pt-2",
                                    children: (0, a.jsxs)("div", {
                                      className:
                                        "h-24 overflow-hidden text-sm text-muted-foreground",
                                      children: [
                                        "document" === e.type &&
                                          (0, a.jsx)("p", {
                                            className: "line-clamp-4",
                                            children: e.content?.text || "",
                                          }),
                                        "code" === e.type &&
                                          (0, a.jsx)("pre", {
                                            className:
                                              "line-clamp-4 text-xs bg-gray-100 dark:bg-gray-800 p-2 rounded",
                                            children: (0, a.jsx)("code", {
                                              children: e.content?.code || "",
                                            }),
                                          }),
                                      ],
                                    }),
                                  }),
                                  (0, a.jsx)(v.wL, {
                                    className:
                                      "p-4 pt-2 text-xs text-muted-foreground",
                                    children: (0, a.jsxs)("div", {
                                      className: "flex justify-between w-full",
                                      children: [
                                        (0, a.jsxs)("span", {
                                          children: [
                                            "Created:",
                                            " ",
                                            new Date(
                                              e.created_at,
                                            ).toLocaleDateString(),
                                          ],
                                        }),
                                        (0, a.jsx)(b.$, {
                                          variant: "ghost",
                                          size: "sm",
                                          className: "h-6 px-2",
                                          onClick: (t) => {
                                            t.stopPropagation(),
                                              S.push(`/artifacts/${e.id}`);
                                          },
                                          children: "View Full",
                                        }),
                                      ],
                                    }),
                                  }),
                                ],
                              },
                              e.id,
                            ),
                          ),
                        }),
                  (0, a.jsx)(y.lG, {
                    open: !!O,
                    onOpenChange: (e) => !e && U(),
                    children: (0, a.jsx)(y.Cf, {
                      className: "sm:max-w-[900px] h-[80vh] p-0",
                      children:
                        O &&
                        (0, a.jsx)(g.Artifact, {
                          id: O,
                          onClose: U,
                          className: "border-0 shadow-none",
                        }),
                    }),
                  }),
                ],
              });
            }
            ([g, b, v, y, w, j, _] = R.then ? (await R)() : R), s();
          } catch (e) {
            s(e);
          }
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
        class n extends s {
          constructor(e = "Insufficient permissions", t) {
            super(e, "auth/forbidden", t, 403), (this.name = "ForbiddenError");
          }
        }
        class i extends s {
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
        function p(e, t) {
          var r;
          return (c || (c = new u(void 0)), c).hasPermission(e, t);
        }
      },
      63033: (e) => {
        "use strict";
        e.exports = require("next/dist/server/app-render/work-unit-async-storage.external.js");
      },
      63942: (e, t, r) => {
        "use strict";
        r.d(t, { A: () => s });
        let s = (0, r(95255).A)("Code", [
          ["polyline", { points: "16 18 22 12 16 6", key: "z7tu5w" }],
          ["polyline", { points: "8 6 2 12 8 18", key: "1eg1df" }],
        ]);
      },
      65278: (e, t, r) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          !(function (e, t) {
            for (var r in t)
              Object.defineProperty(e, r, { enumerable: !0, get: t[r] });
          })(t, {
            getRedirectError: function () {
              return i;
            },
            getRedirectStatusCodeFromError: function () {
              return c;
            },
            getRedirectTypeFromError: function () {
              return u;
            },
            getURLFromRedirectError: function () {
              return d;
            },
            permanentRedirect: function () {
              return l;
            },
            redirect: function () {
              return o;
            },
          });
        let s = r(20835),
          a = r(21293),
          n = r(19121).actionAsyncStorage;
        function i(e, t, r) {
          void 0 === r && (r = s.RedirectStatusCode.TemporaryRedirect);
          let n = Object.defineProperty(
            Error(a.REDIRECT_ERROR_CODE),
            "__NEXT_ERROR_CODE",
            { value: "E394", enumerable: !1, configurable: !0 },
          );
          return (
            (n.digest =
              a.REDIRECT_ERROR_CODE + ";" + t + ";" + e + ";" + r + ";"),
            n
          );
        }
        function o(e, t) {
          var r;
          throw (
            (null != t ||
              (t = (
                null == n || null == (r = n.getStore()) ? void 0 : r.isAction
              )
                ? a.RedirectType.push
                : a.RedirectType.replace),
            i(e, t, s.RedirectStatusCode.TemporaryRedirect))
          );
        }
        function l(e, t) {
          throw (
            (void 0 === t && (t = a.RedirectType.replace),
            i(e, t, s.RedirectStatusCode.PermanentRedirect))
          );
        }
        function d(e) {
          return (0, a.isRedirectError)(e)
            ? e.digest.split(";").slice(2, -2).join(";")
            : null;
        }
        function u(e) {
          if (!(0, a.isRedirectError)(e))
            throw Object.defineProperty(
              Error("Not a redirect error"),
              "__NEXT_ERROR_CODE",
              { value: "E260", enumerable: !1, configurable: !0 },
            );
          return e.digest.split(";", 2)[1];
        }
        function c(e) {
          if (!(0, a.isRedirectError)(e))
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
      67268: (e, t, r) => {
        "use strict";
        r.d(t, { ArtifactGallery: () => s });
        let s = (0, r(26394).registerClientReference)(
          function () {
            throw Error(
              "Attempted to call ArtifactGallery() from the server but ArtifactGallery is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\apps\\web\\src\\components\\ui\\artifact-gallery.tsx",
          "ArtifactGallery",
        );
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
            var n = r(15942),
              i = e([n]);
            function o({ className: e, type: t, ...r }) {
              return (0, a.jsx)("input", {
                type: t,
                "data-slot": "input",
                className: (0, n.cn)(
                  "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
                  "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
                  "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
                  e,
                ),
                ...r,
              });
            }
            (n = (i.then ? (await i)() : i)[0]), s();
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
      81088: (e, t, r) => {
        Promise.resolve().then(r.bind(r, 59766)),
          Promise.resolve().then(r.bind(r, 3519));
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
      90645: (e, t, r) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          !(function (e, t) {
            for (var r in t)
              Object.defineProperty(e, r, { enumerable: !0, get: t[r] });
          })(t, {
            ReadonlyURLSearchParams: function () {
              return u;
            },
            RedirectType: function () {
              return a.RedirectType;
            },
            forbidden: function () {
              return i.forbidden;
            },
            notFound: function () {
              return n.notFound;
            },
            permanentRedirect: function () {
              return s.permanentRedirect;
            },
            redirect: function () {
              return s.redirect;
            },
            unauthorized: function () {
              return o.unauthorized;
            },
            unstable_rethrow: function () {
              return l.unstable_rethrow;
            },
          });
        let s = r(65278),
          a = r(21293),
          n = r(11316),
          i = r(14749),
          o = r(52480),
          l = r(42600);
        class d extends Error {
          constructor() {
            super(
              "Method unavailable on `ReadonlyURLSearchParams`. Read more: https://nextjs.org/docs/app/api-reference/functions/use-search-params#updating-searchparams",
            );
          }
        }
        class u extends URLSearchParams {
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
      93336: (e, t, r) => {
        "use strict";
        r.a(e, async (e, s) => {
          try {
            r.d(t, {
              Hr: () => m,
              Ht: () => h,
              I: () => p,
              SQ: () => c,
              _2: () => f,
              lp: () => x,
              mB: () => g,
              rI: () => d,
              ty: () => u,
            });
            var a = r(61268),
              n = r(57833),
              i = r(83659);
            r(84205);
            var o = r(15942),
              l = e([o]);
            function d({ ...e }) {
              return (0, a.jsx)(n.bL, { "data-slot": "dropdown-menu", ...e });
            }
            function u({ ...e }) {
              return (0, a.jsx)(n.l9, {
                "data-slot": "dropdown-menu-trigger",
                ...e,
              });
            }
            function c({ className: e, sideOffset: t = 4, ...r }) {
              return (0, a.jsx)(n.ZL, {
                children: (0, a.jsx)(n.UC, {
                  "data-slot": "dropdown-menu-content",
                  sideOffset: t,
                  className: (0, o.cn)(
                    "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 min-w-[8rem] overflow-hidden rounded-md border p-1 shadow-md",
                    e,
                  ),
                  ...r,
                }),
              });
            }
            function p({ ...e }) {
              return (0, a.jsx)(n.YJ, {
                "data-slot": "dropdown-menu-group",
                ...e,
              });
            }
            function f({
              className: e,
              inset: t,
              variant: r = "default",
              ...s
            }) {
              return (0, a.jsx)(n.q7, {
                "data-slot": "dropdown-menu-item",
                "data-inset": t,
                "data-variant": r,
                className: (0, o.cn)(
                  "focus:bg-accent focus:text-accent-foreground data-[variant=destructive]:text-destructive-foreground data-[variant=destructive]:focus:bg-destructive/10 dark:data-[variant=destructive]:focus:bg-destructive/40 data-[variant=destructive]:focus:text-destructive-foreground data-[variant=destructive]:*:[svg]:!text-destructive-foreground [&_svg:not([class*='text-'])]:text-muted-foreground relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
                  e,
                ),
                ...s,
              });
            }
            function m({ ...e }) {
              return (0, a.jsx)(n.z6, {
                "data-slot": "dropdown-menu-radio-group",
                ...e,
              });
            }
            function h({ className: e, children: t, ...r }) {
              return (0, a.jsxs)(n.hN, {
                "data-slot": "dropdown-menu-radio-item",
                className: (0, o.cn)(
                  "focus:bg-accent focus:text-accent-foreground relative flex cursor-default items-center gap-2 rounded-sm py-1.5 pr-2 pl-8 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
                  e,
                ),
                ...r,
                children: [
                  (0, a.jsx)("span", {
                    className:
                      "pointer-events-none absolute left-2 flex size-3.5 items-center justify-center",
                    children: (0, a.jsx)(n.VF, {
                      children: (0, a.jsx)(i.A, {
                        className: "size-2 fill-current",
                      }),
                    }),
                  }),
                  t,
                ],
              });
            }
            function x({ className: e, inset: t, ...r }) {
              return (0, a.jsx)(n.JU, {
                "data-slot": "dropdown-menu-label",
                "data-inset": t,
                className: (0, o.cn)(
                  "px-2 py-1.5 text-sm font-medium data-[inset]:pl-8",
                  e,
                ),
                ...r,
              });
            }
            function g({ className: e, ...t }) {
              return (0, a.jsx)(n.wv, {
                "data-slot": "dropdown-menu-separator",
                className: (0, o.cn)("bg-border -mx-1 my-1 h-px", e),
                ...t,
              });
            }
            (o = (l.then ? (await l)() : l)[0]), s();
          } catch (e) {
            s(e);
          }
        });
      },
      94240: (e, t, r) => {
        Promise.resolve().then(r.bind(r, 67268)),
          Promise.resolve().then(r.bind(r, 29244));
      },
      94735: (e) => {
        "use strict";
        e.exports = require("events");
      },
      95957: (e, t, r) => {
        "use strict";
        r.a(e, async (e, s) => {
          try {
            r.d(t, {
              bq: () => f,
              eb: () => h,
              gC: () => m,
              l6: () => c,
              yv: () => p,
            });
            var a = r(61268),
              n = r(81242),
              i = r(70753),
              o = r(415),
              l = r(84205),
              d = r(15942),
              u = e([d]);
            d = (u.then ? (await u)() : u)[0];
            let c = n.bL;
            n.YJ;
            let p = n.WT,
              f = l.forwardRef(({ className: e, children: t, ...r }, s) =>
                (0, a.jsxs)(n.l9, {
                  ref: s,
                  className: (0, d.cn)(
                    "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                    e,
                  ),
                  ...r,
                  children: [
                    t,
                    (0, a.jsx)(n.In, {
                      asChild: !0,
                      children: (0, a.jsx)(i.A, {
                        className: "h-4 w-4 opacity-50",
                      }),
                    }),
                  ],
                }),
              );
            f.displayName = n.l9.displayName;
            let m = l.forwardRef(
              (
                { className: e, children: t, position: r = "popper", ...s },
                i,
              ) =>
                (0, a.jsx)(n.ZL, {
                  children: (0, a.jsx)(n.UC, {
                    ref: i,
                    className: (0, d.cn)(
                      "relative z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
                      "popper" === r &&
                        "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
                      e,
                    ),
                    position: r,
                    ...s,
                    children: (0, a.jsx)(n.LM, {
                      className: (0, d.cn)(
                        "p-1",
                        "popper" === r &&
                          "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]",
                      ),
                      children: t,
                    }),
                  }),
                }),
            );
            (m.displayName = n.UC.displayName),
              (l.forwardRef(({ className: e, ...t }, r) =>
                (0, a.jsx)(n.JU, {
                  ref: r,
                  className: (0, d.cn)(
                    "py-1.5 pl-8 pr-2 text-sm font-semibold",
                    e,
                  ),
                  ...t,
                }),
              ).displayName = n.JU.displayName);
            let h = l.forwardRef(({ className: e, children: t, ...r }, s) =>
              (0, a.jsxs)(n.q7, {
                ref: s,
                className: (0, d.cn)(
                  "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
                  e,
                ),
                ...r,
                children: [
                  (0, a.jsx)("span", {
                    className:
                      "absolute left-2 flex h-3.5 w-3.5 items-center justify-center",
                    children: (0, a.jsx)(n.VF, {
                      children: (0, a.jsx)(o.A, { className: "h-4 w-4" }),
                    }),
                  }),
                  (0, a.jsx)(n.p4, { children: t }),
                ],
              }),
            );
            (h.displayName = n.q7.displayName),
              (l.forwardRef(({ className: e, ...t }, r) =>
                (0, a.jsx)(n.wv, {
                  ref: r,
                  className: (0, d.cn)("-mx-1 my-1 h-px bg-muted", e),
                  ...t,
                }),
              ).displayName = n.wv.displayName),
              s();
          } catch (e) {
            s(e);
          }
        });
      },
      96465: (e, t, r) => {
        "use strict";
        r.d(t, { A: () => s });
        let s = (0, r(95255).A)("BadgeCheck", [
          [
            "path",
            {
              d: "M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z",
              key: "3c2336",
            },
          ],
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
  var t = require("../../webpack-runtime.js");
  t.C(e);
  var r = (e) => t((t.s = e)),
    s = t.X(
      0,
      [
        827, 6518, 2033, 4027, 2872, 7713, 5149, 8859, 8029, 5728, 9729, 3390,
        7719, 6188, 7911, 7393, 8119, 5058, 131, 2028, 6867, 4630, 4232, 8945,
      ],
      () => r(34464),
    );
  module.exports = s;
})();
//# sourceMappingURL=page.js.map
