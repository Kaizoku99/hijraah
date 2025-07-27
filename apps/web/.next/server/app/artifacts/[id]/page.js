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
    (e._sentryDebugIds[t] = "ec0da01f-5dd4-4ba4-8d52-8a93da611653"),
    (e._sentryDebugIdIdentifier =
      "sentry-dbid-ec0da01f-5dd4-4ba4-8d52-8a93da611653"));
} catch (e) {}
(() => {
  var e = {};
  (e.id = 6540),
    (e.ids = [6540]),
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
            useAuth: () => l,
            useHasPermission: () => m,
            useHasRole: () => p,
            useIsAuthenticated: () => f,
            useSession: () => h,
            useUser: () => c,
          });
        var n = r(61268),
          s = r(84205),
          i = r(32367),
          o = r(61460);
        function a(e) {
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
              return a({
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
        let u = (0, s.createContext)(void 0);
        function d({ children: e }) {
          let [t, r] = (0, s.useState)(null),
            [o, d] = (0, s.useState)(null),
            [l, c] = (0, s.useState)(!0),
            f = (0, i.UU)(),
            p = (0, s.useCallback)(async () => {
              try {
                c(!0);
                let {
                  data: { session: e },
                  error: t,
                } = await f.auth.getSession();
                if (t) throw t;
                if (e) {
                  let {
                    data: { user: t },
                    error: n,
                  } = await f.auth.getUser();
                  if (n) throw n;
                  d(e), r(a(t));
                } else d(null), r(null);
              } catch (e) {
                console.error("Error refreshing session:", e), d(null), r(null);
              } finally {
                c(!1);
              }
            }, [f]),
            m = (0, s.useCallback)(
              async (e, t) => {
                c(!0);
                try {
                  if ("email" === e) {
                    if (!t?.email || !t?.password)
                      throw Error(
                        "Email and password required for email sign in",
                      );
                    let { data: e, error: n } = await f.auth.signInWithPassword(
                      { email: t.email, password: t.password },
                    );
                    if (n) throw n;
                    e?.session && (d(e.session), r(a(e.session.user)));
                  } else {
                    let { error: r } = await f.auth.signInWithOAuth({
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
              [f],
            ),
            h = (0, s.useCallback)(async () => {
              c(!0);
              try {
                let { error: e } = await f.auth.signOut();
                if (e) throw e;
                d(null), r(null);
              } catch (e) {
                console.error("Error signing out:", e);
              } finally {
                c(!1);
              }
            }, [f]),
            g = (0, s.useCallback)(
              async (e) => {
                c(!0);
                try {
                  if (!e.email || !e.password)
                    throw Error("Email and password required for sign up");
                  let { data: t, error: r } = await f.auth.signUp({
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
              [f],
            ),
            v = (0, s.useCallback)(
              async (e, t) => {
                c(!0);
                try {
                  let { error: r } = await f.auth.resetPasswordForEmail(e, {
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
              [f],
            ),
            b = (0, s.useCallback)(
              async (e) => {
                c(!0);
                try {
                  let { error: t } = await f.auth.updateUser({ password: e });
                  if (t) throw t;
                  return !0;
                } catch (e) {
                  throw (console.error("Error updating password:", e), e);
                } finally {
                  c(!1);
                }
              },
              [f],
            );
          return (0, n.jsx)(u.Provider, {
            value: {
              user: t,
              session: o,
              isLoading: l,
              isAuthenticated: !!o,
              signIn: m,
              signOut: h,
              refreshSession: p,
              signUp: g,
              resetPassword: v,
              updatePassword: b,
              error: null,
            },
            children: e,
          });
        }
        function l() {
          let e = (0, s.useContext)(u);
          if (void 0 === e)
            throw Error("useAuth must be used within an AuthProvider");
          return e;
        }
        function c() {
          let { user: e } = l();
          return e;
        }
        function f() {
          let { isAuthenticated: e } = l();
          return e;
        }
        function p(e) {
          let t = c();
          return t?.role === e;
        }
        function m(e) {
          let t = c();
          return (0, o._m)(t, e);
        }
        function h() {
          let e = (0, s.useContext)(u);
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
      4652: (e, t, r) => {
        "use strict";
        r.r(t),
          r.d(t, {
            GlobalError: () => i.default,
            __next_app__: () => l,
            pages: () => d,
            routeModule: () => c,
            tree: () => u,
          });
        var n = r(11610),
          s = r(51293),
          i = r(59059),
          o = r(17770),
          a = {};
        for (let e in o)
          0 >
            [
              "default",
              "tree",
              "pages",
              "GlobalError",
              "__next_app__",
              "routeModule",
            ].indexOf(e) && (a[e] = () => o[e]);
        r.d(t, a);
        let u = {
            children: [
              "",
              {
                children: [
                  "artifacts",
                  {
                    children: [
                      "[id]",
                      {
                        children: [
                          "__PAGE__",
                          {},
                          {
                            page: [
                              () => Promise.resolve().then(r.bind(r, 57047)),
                              "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\artifacts\\[id]\\page.tsx",
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
          d = [
            "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\artifacts\\[id]\\page.tsx",
          ],
          l = { require: r, loadChunk: () => Promise.resolve() },
          c = new n.AppPageRouteModule({
            definition: {
              kind: s.RouteKind.APP_PAGE,
              page: "/artifacts/[id]/page",
              pathname: "/artifacts/[id]",
              bundlePath: "",
              filename: "",
              appPaths: [],
            },
            userland: { loaderTree: u },
          });
      },
      5279: (e, t, r) => {
        Promise.resolve().then(r.bind(r, 52827)),
          Promise.resolve().then(r.bind(r, 3519));
      },
      7839: (e, t, r) => {
        "use strict";
        r.d(t, { jH: () => i });
        var n = r(84205);
        r(61268);
        var s = n.createContext(void 0);
        function i(e) {
          let t = n.useContext(s);
          return e || t || "ltr";
        }
      },
      8086: (e) => {
        "use strict";
        e.exports = require("module");
      },
      10308: (e, t, r) => {
        "use strict";
        r.d(t, { c: () => s });
        var n = r(84205);
        function s(e) {
          let t = n.useRef(e);
          return (
            n.useEffect(() => {
              t.current = e;
            }),
            n.useMemo(
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
      11316: (e, t, r) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          Object.defineProperty(t, "notFound", {
            enumerable: !0,
            get: function () {
              return s;
            },
          });
        let n = "" + r(17581).HTTP_ERROR_FALLBACK_ERROR_CODE + ";404";
        function s() {
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
      15014: (e, t, r) => {
        "use strict";
        r.d(t, { A: () => n });
        let n = (0, r(95255).A)("Trash2", [
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
                  (0, o.isNextRouterError)(t) ||
                  (0, i.isBailoutToCSRError)(t) ||
                  (0, u.isDynamicServerError)(t) ||
                  (0, a.isDynamicPostpone)(t) ||
                  (0, s.isPostpone)(t) ||
                  (0, n.isHangingPromiseRejectionError)(t)
                )
                  throw t;
                t instanceof Error && "cause" in t && e(t.cause);
              };
            },
          });
        let n = r(6223),
          s = r(96124),
          i = r(58937),
          o = r(91613),
          a = r(62938),
          u = r(98800);
        ("function" == typeof t.default ||
          ("object" == typeof t.default && null !== t.default)) &&
          void 0 === t.default.__esModule &&
          (Object.defineProperty(t.default, "__esModule", { value: !0 }),
          Object.assign(t.default, t),
          (e.exports = t.default));
      },
      27896: (e, t, r) => {
        "use strict";
        r.d(t, { A: () => n });
        let n = (0, r(95255).A)("Lock", [
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
        r.d(t, { B8: () => C, UC: () => T, bL: () => O, l9: () => N });
        var n = r(84205),
          s = r(28777),
          i = r(18047),
          o = r(59150),
          a = r(94653),
          u = r(78593),
          d = r(7839),
          l = r(48705),
          c = r(42414),
          f = r(61268),
          p = "Tabs",
          [m, h] = (0, i.A)(p, [o.RG]),
          g = (0, o.RG)(),
          [v, b] = m(p),
          y = n.forwardRef((e, t) => {
            let {
                __scopeTabs: r,
                value: n,
                onValueChange: s,
                defaultValue: i,
                orientation: o = "horizontal",
                dir: a,
                activationMode: m = "automatic",
                ...h
              } = e,
              g = (0, d.jH)(a),
              [b, y] = (0, l.i)({
                prop: n,
                onChange: s,
                defaultProp: i ?? "",
                caller: p,
              });
            return (0, f.jsx)(v, {
              scope: r,
              baseId: (0, c.B)(),
              value: b,
              onValueChange: y,
              orientation: o,
              dir: g,
              activationMode: m,
              children: (0, f.jsx)(u.sG.div, {
                dir: g,
                "data-orientation": o,
                ...h,
                ref: t,
              }),
            });
          });
        y.displayName = p;
        var w = "TabsList",
          _ = n.forwardRef((e, t) => {
            let { __scopeTabs: r, loop: n = !0, ...s } = e,
              i = b(w, r),
              a = g(r);
            return (0, f.jsx)(o.bL, {
              asChild: !0,
              ...a,
              orientation: i.orientation,
              dir: i.dir,
              loop: n,
              children: (0, f.jsx)(u.sG.div, {
                role: "tablist",
                "aria-orientation": i.orientation,
                ...s,
                ref: t,
              }),
            });
          });
        _.displayName = w;
        var x = "TabsTrigger",
          R = n.forwardRef((e, t) => {
            let { __scopeTabs: r, value: n, disabled: i = !1, ...a } = e,
              d = b(x, r),
              l = g(r),
              c = A(d.baseId, n),
              p = P(d.baseId, n),
              m = n === d.value;
            return (0, f.jsx)(o.q7, {
              asChild: !0,
              ...l,
              focusable: !i,
              active: m,
              children: (0, f.jsx)(u.sG.button, {
                type: "button",
                role: "tab",
                "aria-selected": m,
                "aria-controls": p,
                "data-state": m ? "active" : "inactive",
                "data-disabled": i ? "" : void 0,
                disabled: i,
                id: c,
                ...a,
                ref: t,
                onMouseDown: (0, s.m)(e.onMouseDown, (e) => {
                  i || 0 !== e.button || !1 !== e.ctrlKey
                    ? e.preventDefault()
                    : d.onValueChange(n);
                }),
                onKeyDown: (0, s.m)(e.onKeyDown, (e) => {
                  [" ", "Enter"].includes(e.key) && d.onValueChange(n);
                }),
                onFocus: (0, s.m)(e.onFocus, () => {
                  let e = "manual" !== d.activationMode;
                  m || i || !e || d.onValueChange(n);
                }),
              }),
            });
          });
        R.displayName = x;
        var E = "TabsContent",
          j = n.forwardRef((e, t) => {
            let {
                __scopeTabs: r,
                value: s,
                forceMount: i,
                children: o,
                ...d
              } = e,
              l = b(E, r),
              c = A(l.baseId, s),
              p = P(l.baseId, s),
              m = s === l.value,
              h = n.useRef(m);
            return (
              n.useEffect(() => {
                let e = requestAnimationFrame(() => (h.current = !1));
                return () => cancelAnimationFrame(e);
              }, []),
              (0, f.jsx)(a.C, {
                present: i || m,
                children: ({ present: r }) =>
                  (0, f.jsx)(u.sG.div, {
                    "data-state": m ? "active" : "inactive",
                    "data-orientation": l.orientation,
                    role: "tabpanel",
                    "aria-labelledby": c,
                    hidden: !r,
                    id: p,
                    tabIndex: 0,
                    ...d,
                    ref: t,
                    style: {
                      ...e.style,
                      animationDuration: h.current ? "0s" : void 0,
                    },
                    children: r && o,
                  }),
              })
            );
          });
        function A(e, t) {
          return `${e}-trigger-${t}`;
        }
        function P(e, t) {
          return `${e}-content-${t}`;
        }
        j.displayName = E;
        var O = y,
          C = _,
          N = R,
          T = j;
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
        r.d(t, { AG: () => v, Iw: () => h, UU: () => g });
        var s = r(97713),
          i = r(15149),
          o = r.n(i),
          a = r(84205);
        let { fetch: u } = o()(),
          d = "http://localhost:54321",
          l =
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0",
          c = process.env.SUPABASE_SERVICE_ROLE_KEY,
          f = l ? { apikey: l } : void 0;
        function p() {
          if (!d || !l)
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
        function m() {
          return (p(), n)
            ? n
            : (n = (0, s.createBrowserClient)(d, l, {
                global: { headers: f },
              }));
        }
        function h() {
          return (0, a.useMemo)(m, []);
        }
        function g() {
          return (
            p(), (0, s.createBrowserClient)(d, l, { global: { headers: f } })
          );
        }
        let v = m;
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
      35549: (e, t, r) => {
        "use strict";
        r.d(t, { C: () => o });
        var n = r(84205),
          s = r(79744),
          i = r(37155),
          o = (e) => {
            let { present: t, children: r } = e,
              o = (function (e) {
                var t, r;
                let [s, o] = n.useState(),
                  u = n.useRef(null),
                  d = n.useRef(e),
                  l = n.useRef("none"),
                  [c, f] =
                    ((t = e ? "mounted" : "unmounted"),
                    (r = {
                      mounted: {
                        UNMOUNT: "unmounted",
                        ANIMATION_OUT: "unmountSuspended",
                      },
                      unmountSuspended: {
                        MOUNT: "mounted",
                        ANIMATION_END: "unmounted",
                      },
                      unmounted: { MOUNT: "mounted" },
                    }),
                    n.useReducer((e, t) => r[e][t] ?? e, t));
                return (
                  n.useEffect(() => {
                    let e = a(u.current);
                    l.current = "mounted" === c ? e : "none";
                  }, [c]),
                  (0, i.N)(() => {
                    let t = u.current,
                      r = d.current;
                    if (r !== e) {
                      let n = l.current,
                        s = a(t);
                      e
                        ? f("MOUNT")
                        : "none" === s || t?.display === "none"
                          ? f("UNMOUNT")
                          : r && n !== s
                            ? f("ANIMATION_OUT")
                            : f("UNMOUNT"),
                        (d.current = e);
                    }
                  }, [e, f]),
                  (0, i.N)(() => {
                    if (s) {
                      let e,
                        t = s.ownerDocument.defaultView ?? window,
                        r = (r) => {
                          let n = a(u.current).includes(r.animationName);
                          if (
                            r.target === s &&
                            n &&
                            (f("ANIMATION_END"), !d.current)
                          ) {
                            let r = s.style.animationFillMode;
                            (s.style.animationFillMode = "forwards"),
                              (e = t.setTimeout(() => {
                                "forwards" === s.style.animationFillMode &&
                                  (s.style.animationFillMode = r);
                              }));
                          }
                        },
                        n = (e) => {
                          e.target === s && (l.current = a(u.current));
                        };
                      return (
                        s.addEventListener("animationstart", n),
                        s.addEventListener("animationcancel", r),
                        s.addEventListener("animationend", r),
                        () => {
                          t.clearTimeout(e),
                            s.removeEventListener("animationstart", n),
                            s.removeEventListener("animationcancel", r),
                            s.removeEventListener("animationend", r);
                        }
                      );
                    }
                    f("ANIMATION_END");
                  }, [s, f]),
                  {
                    isPresent: ["mounted", "unmountSuspended"].includes(c),
                    ref: n.useCallback((e) => {
                      (u.current = e ? getComputedStyle(e) : null), o(e);
                    }, []),
                  }
                );
              })(t),
              u =
                "function" == typeof r
                  ? r({ present: o.isPresent })
                  : n.Children.only(r),
              d = (0, s.s)(
                o.ref,
                (function (e) {
                  let t = Object.getOwnPropertyDescriptor(e.props, "ref")?.get,
                    r = t && "isReactWarning" in t && t.isReactWarning;
                  return r
                    ? e.ref
                    : (r =
                          (t = Object.getOwnPropertyDescriptor(
                            e,
                            "ref",
                          )?.get) &&
                          "isReactWarning" in t &&
                          t.isReactWarning)
                      ? e.props.ref
                      : e.props.ref || e.ref;
                })(u),
              );
            return "function" == typeof r || o.isPresent
              ? n.cloneElement(u, { ref: d })
              : null;
          };
        function a(e) {
          return e?.animationName || "none";
        }
        o.displayName = "Presence";
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
        r.d(t, { B: () => u });
        var n,
          s = r(84205),
          i = r(66130),
          o =
            (n || (n = r.t(s, 2)))[" useId ".trim().toString()] ||
            (() => void 0),
          a = 0;
        function u(e) {
          let [t, r] = s.useState(o());
          return (
            (0, i.N)(() => {
              e || r((e) => e ?? String(a++));
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
      55511: (e) => {
        "use strict";
        e.exports = require("crypto");
      },
      55591: (e) => {
        "use strict";
        e.exports = require("https");
      },
      57047: (e, t, r) => {
        "use strict";
        let n;
        r.r(t),
          r.d(t, {
            default: () => w,
            generateImageMetadata: () => b,
            generateMetadata: () => v,
            generateViewport: () => y,
          });
        var s = r(63033),
          i = r(35242),
          o = r(29073);
        r(84147);
        var a = r(85233),
          u = r(14795),
          d = r(77719);
        let l = process.env.SUPABASE_SERVICE_ROLE_KEY,
          c = (0, d.createClient)("http://localhost:54321", l);
        async function f(e) {
          let t = await (0, u.j2)();
          if (!t?.user?.id) throw (0, o.notFound)();
          let { data: r, error: n } = await c
            .from("artifacts")
            .select("*")
            .eq("id", e)
            .eq("user_id", t.user.id)
            .single();
          if (n || !r)
            throw (
              (console.error("Error fetching artifact:", n), (0, o.notFound)())
            );
          return {
            id: r.id,
            name: r.name,
            description: r.description,
            type: r.type,
            url: r.url,
            metadata: r.metadata,
            status: r.status,
            userId: r.user_id,
            createdAt: new Date(r.created_at),
            updatedAt: new Date(r.updated_at),
          };
        }
        var p = r(60442);
        async function m({ params: e }) {
          let t = await (0, u.j2)(),
            r = t?.user;
          return r
            ? ((await f(e.id, r.id)) || (0, o.notFound)(),
              (0, i.jsx)("div", {
                className: "container mx-auto py-6",
                children: (0, i.jsx)(a.Artifact, { id: e.id }),
              }))
            : (0, i.jsx)("div", {
                className: "flex items-center justify-center h-[80vh]",
                children: (0, i.jsx)("p", {
                  className: "text-muted-foreground",
                  children: "Please sign in to view artifacts",
                }),
              });
        }
        let h = { ...s },
          g =
            "workUnitAsyncStorage" in h
              ? h.workUnitAsyncStorage
              : "requestAsyncStorage" in h
                ? h.requestAsyncStorage
                : void 0;
        n = new Proxy(m, {
          apply: (e, t, r) => {
            let n, s, i;
            try {
              let e = g?.getStore();
              (n = e?.headers.get("sentry-trace") ?? void 0),
                (s = e?.headers.get("baggage") ?? void 0),
                (i = e?.headers);
            } catch (e) {}
            return p
              .wrapServerComponentWithSentry(e, {
                componentRoute: "/artifacts/[id]",
                componentType: "Page",
                sentryTraceHeader: n,
                baggageHeader: s,
                headers: i,
              })
              .apply(t, r);
          },
        });
        let v = void 0,
          b = void 0,
          y = void 0,
          w = n;
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
        r.d(t, { RG: () => _, bL: () => N, q7: () => T });
        var n = r(84205),
          s = r(28777),
          i = r(28029),
          o = r(71604),
          a = r(18047),
          u = r(42414),
          d = r(78593),
          l = r(10308),
          c = r(48705),
          f = r(7839),
          p = r(61268),
          m = "rovingFocusGroup.onEntryFocus",
          h = { bubbles: !1, cancelable: !0 },
          g = "RovingFocusGroup",
          [v, b, y] = (0, i.N)(g),
          [w, _] = (0, a.A)(g, [y]),
          [x, R] = w(g),
          E = n.forwardRef((e, t) =>
            (0, p.jsx)(v.Provider, {
              scope: e.__scopeRovingFocusGroup,
              children: (0, p.jsx)(v.Slot, {
                scope: e.__scopeRovingFocusGroup,
                children: (0, p.jsx)(j, { ...e, ref: t }),
              }),
            }),
          );
        E.displayName = g;
        var j = n.forwardRef((e, t) => {
            let {
                __scopeRovingFocusGroup: r,
                orientation: i,
                loop: a = !1,
                dir: u,
                currentTabStopId: v,
                defaultCurrentTabStopId: y,
                onCurrentTabStopIdChange: w,
                onEntryFocus: _,
                preventScrollOnEntryFocus: R = !1,
                ...E
              } = e,
              j = n.useRef(null),
              A = (0, o.s)(t, j),
              P = (0, f.jH)(u),
              [O, N] = (0, c.i)({
                prop: v,
                defaultProp: y ?? null,
                onChange: w,
                caller: g,
              }),
              [T, M] = n.useState(!1),
              S = (0, l.c)(_),
              I = b(r),
              q = n.useRef(!1),
              [k, U] = n.useState(0);
            return (
              n.useEffect(() => {
                let e = j.current;
                if (e)
                  return (
                    e.addEventListener(m, S), () => e.removeEventListener(m, S)
                  );
              }, [S]),
              (0, p.jsx)(x, {
                scope: r,
                orientation: i,
                dir: P,
                loop: a,
                currentTabStopId: O,
                onItemFocus: n.useCallback((e) => N(e), [N]),
                onItemShiftTab: n.useCallback(() => M(!0), []),
                onFocusableItemAdd: n.useCallback(() => U((e) => e + 1), []),
                onFocusableItemRemove: n.useCallback(() => U((e) => e - 1), []),
                children: (0, p.jsx)(d.sG.div, {
                  tabIndex: T || 0 === k ? -1 : 0,
                  "data-orientation": i,
                  ...E,
                  ref: A,
                  style: { outline: "none", ...e.style },
                  onMouseDown: (0, s.m)(e.onMouseDown, () => {
                    q.current = !0;
                  }),
                  onFocus: (0, s.m)(e.onFocus, (e) => {
                    let t = !q.current;
                    if (e.target === e.currentTarget && t && !T) {
                      let t = new CustomEvent(m, h);
                      if (
                        (e.currentTarget.dispatchEvent(t), !t.defaultPrevented)
                      ) {
                        let e = I().filter((e) => e.focusable);
                        C(
                          [
                            e.find((e) => e.active),
                            e.find((e) => e.id === O),
                            ...e,
                          ]
                            .filter(Boolean)
                            .map((e) => e.ref.current),
                          R,
                        );
                      }
                    }
                    q.current = !1;
                  }),
                  onBlur: (0, s.m)(e.onBlur, () => M(!1)),
                }),
              })
            );
          }),
          A = "RovingFocusGroupItem",
          P = n.forwardRef((e, t) => {
            let {
                __scopeRovingFocusGroup: r,
                focusable: i = !0,
                active: o = !1,
                tabStopId: a,
                children: l,
                ...c
              } = e,
              f = (0, u.B)(),
              m = a || f,
              h = R(A, r),
              g = h.currentTabStopId === m,
              y = b(r),
              {
                onFocusableItemAdd: w,
                onFocusableItemRemove: _,
                currentTabStopId: x,
              } = h;
            return (
              n.useEffect(() => {
                if (i) return w(), () => _();
              }, [i, w, _]),
              (0, p.jsx)(v.ItemSlot, {
                scope: r,
                id: m,
                focusable: i,
                active: o,
                children: (0, p.jsx)(d.sG.span, {
                  tabIndex: g ? 0 : -1,
                  "data-orientation": h.orientation,
                  ...c,
                  ref: t,
                  onMouseDown: (0, s.m)(e.onMouseDown, (e) => {
                    i ? h.onItemFocus(m) : e.preventDefault();
                  }),
                  onFocus: (0, s.m)(e.onFocus, () => h.onItemFocus(m)),
                  onKeyDown: (0, s.m)(e.onKeyDown, (e) => {
                    if ("Tab" === e.key && e.shiftKey)
                      return void h.onItemShiftTab();
                    if (e.target !== e.currentTarget) return;
                    let t = (function (e, t, r) {
                      var n;
                      let s =
                        ((n = e.key),
                        "rtl" !== r
                          ? n
                          : "ArrowLeft" === n
                            ? "ArrowRight"
                            : "ArrowRight" === n
                              ? "ArrowLeft"
                              : n);
                      if (
                        !(
                          "vertical" === t &&
                          ["ArrowLeft", "ArrowRight"].includes(s)
                        ) &&
                        !(
                          "horizontal" === t &&
                          ["ArrowUp", "ArrowDown"].includes(s)
                        )
                      )
                        return O[s];
                    })(e, h.orientation, h.dir);
                    if (void 0 !== t) {
                      if (e.metaKey || e.ctrlKey || e.altKey || e.shiftKey)
                        return;
                      e.preventDefault();
                      let r = y()
                        .filter((e) => e.focusable)
                        .map((e) => e.ref.current);
                      if ("last" === t) r.reverse();
                      else if ("prev" === t || "next" === t) {
                        "prev" === t && r.reverse();
                        let n = r.indexOf(e.currentTarget);
                        r = h.loop
                          ? (function (e, t) {
                              return e.map((r, n) => e[(t + n) % e.length]);
                            })(r, n + 1)
                          : r.slice(n + 1);
                      }
                      setTimeout(() => C(r));
                    }
                  }),
                  children:
                    "function" == typeof l
                      ? l({ isCurrentTabStop: g, hasTabStop: null != x })
                      : l,
                }),
              })
            );
          });
        P.displayName = A;
        var O = {
          ArrowLeft: "prev",
          ArrowUp: "prev",
          ArrowRight: "next",
          ArrowDown: "next",
          PageUp: "first",
          Home: "first",
          PageDown: "last",
          End: "last",
        };
        function C(e, t = !1) {
          let r = document.activeElement;
          for (let n of e)
            if (
              n === r ||
              (n.focus({ preventScroll: t }), document.activeElement !== r)
            )
              return;
        }
        var N = E,
          T = P;
      },
      59570: () => {},
      61460: (e, t, r) => {
        "use strict";
        r.d(t, { _m: () => f });
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
        class s extends n {
          constructor(e = "Authentication required", t) {
            super(e, "auth/unauthorized", t, 401),
              (this.name = "UnauthorizedError");
          }
        }
        class i extends n {
          constructor(e = "Insufficient permissions", t) {
            super(e, "auth/forbidden", t, 403), (this.name = "ForbiddenError");
          }
        }
        class o extends n {
          constructor(e = "Session error", t) {
            super(e, "auth/session-error", t, 400),
              (this.name = "SessionError");
          }
        }
        class a extends n {
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
        let d = { roles: {}, superAdminRole: "admin", enableCache: !0 };
        class l {
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
        function f(e, t) {
          var r;
          return (c || (c = new l(void 0)), c).hasPermission(e, t);
        }
      },
      63033: (e) => {
        "use strict";
        e.exports = require("next/dist/server/app-render/work-unit-async-storage.external.js");
      },
      63942: (e, t, r) => {
        "use strict";
        r.d(t, { A: () => n });
        let n = (0, r(95255).A)("Code", [
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
              return o;
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
              return u;
            },
            redirect: function () {
              return a;
            },
          });
        let n = r(20835),
          s = r(21293),
          i = r(19121).actionAsyncStorage;
        function o(e, t, r) {
          void 0 === r && (r = n.RedirectStatusCode.TemporaryRedirect);
          let i = Object.defineProperty(
            Error(s.REDIRECT_ERROR_CODE),
            "__NEXT_ERROR_CODE",
            { value: "E394", enumerable: !1, configurable: !0 },
          );
          return (
            (i.digest =
              s.REDIRECT_ERROR_CODE + ";" + t + ";" + e + ";" + r + ";"),
            i
          );
        }
        function a(e, t) {
          var r;
          throw (
            (null != t ||
              (t = (
                null == i || null == (r = i.getStore()) ? void 0 : r.isAction
              )
                ? s.RedirectType.push
                : s.RedirectType.replace),
            o(e, t, n.RedirectStatusCode.TemporaryRedirect))
          );
        }
        function u(e, t) {
          throw (
            (void 0 === t && (t = s.RedirectType.replace),
            o(e, t, n.RedirectStatusCode.PermanentRedirect))
          );
        }
        function d(e) {
          return (0, s.isRedirectError)(e)
            ? e.digest.split(";").slice(2, -2).join(";")
            : null;
        }
        function l(e) {
          if (!(0, s.isRedirectError)(e))
            throw Object.defineProperty(
              Error("Not a redirect error"),
              "__NEXT_ERROR_CODE",
              { value: "E260", enumerable: !1, configurable: !0 },
            );
          return e.digest.split(";", 2)[1];
        }
        function c(e) {
          if (!(0, s.isRedirectError)(e))
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
      75015: (e, t, r) => {
        Promise.resolve().then(r.bind(r, 85233)),
          Promise.resolve().then(r.bind(r, 29244));
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
        r.a(e, async (e, n) => {
          try {
            r.d(t, { p: () => a });
            var s = r(61268);
            r(84205);
            var i = r(15942),
              o = e([i]);
            function a({ className: e, type: t, ...r }) {
              return (0, s.jsx)("input", {
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
            (i = (o.then ? (await o)() : o)[0]), n();
          } catch (e) {
            n(e);
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
      84297: (e) => {
        "use strict";
        e.exports = require("async_hooks");
      },
      85233: (e, t, r) => {
        "use strict";
        r.d(t, { Artifact: () => n });
        let n = (0, r(26394).registerClientReference)(
          function () {
            throw Error(
              "Attempted to call Artifact() from the server but Artifact is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\apps\\web\\src\\components\\ui\\artifact.tsx",
          "Artifact",
        );
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
        r.d(t, { A: () => n });
        let n = (0, r(95255).A)("X", [
          ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
          ["path", { d: "m6 6 12 12", key: "d8bk6v" }],
        ]);
      },
      90645: (e, t, r) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          !(function (e, t) {
            for (var r in t)
              Object.defineProperty(e, r, { enumerable: !0, get: t[r] });
          })(t, {
            ReadonlyURLSearchParams: function () {
              return l;
            },
            RedirectType: function () {
              return s.RedirectType;
            },
            forbidden: function () {
              return o.forbidden;
            },
            notFound: function () {
              return i.notFound;
            },
            permanentRedirect: function () {
              return n.permanentRedirect;
            },
            redirect: function () {
              return n.redirect;
            },
            unauthorized: function () {
              return a.unauthorized;
            },
            unstable_rethrow: function () {
              return u.unstable_rethrow;
            },
          });
        let n = r(65278),
          s = r(21293),
          i = r(11316),
          o = r(14749),
          a = r(52480),
          u = r(42600);
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
        r.a(e, async (e, n) => {
          try {
            r.d(t, {
              Hr: () => m,
              Ht: () => h,
              I: () => f,
              SQ: () => c,
              _2: () => p,
              lp: () => g,
              mB: () => v,
              rI: () => d,
              ty: () => l,
            });
            var s = r(61268),
              i = r(57833),
              o = r(83659);
            r(84205);
            var a = r(15942),
              u = e([a]);
            function d({ ...e }) {
              return (0, s.jsx)(i.bL, { "data-slot": "dropdown-menu", ...e });
            }
            function l({ ...e }) {
              return (0, s.jsx)(i.l9, {
                "data-slot": "dropdown-menu-trigger",
                ...e,
              });
            }
            function c({ className: e, sideOffset: t = 4, ...r }) {
              return (0, s.jsx)(i.ZL, {
                children: (0, s.jsx)(i.UC, {
                  "data-slot": "dropdown-menu-content",
                  sideOffset: t,
                  className: (0, a.cn)(
                    "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 min-w-[8rem] overflow-hidden rounded-md border p-1 shadow-md",
                    e,
                  ),
                  ...r,
                }),
              });
            }
            function f({ ...e }) {
              return (0, s.jsx)(i.YJ, {
                "data-slot": "dropdown-menu-group",
                ...e,
              });
            }
            function p({
              className: e,
              inset: t,
              variant: r = "default",
              ...n
            }) {
              return (0, s.jsx)(i.q7, {
                "data-slot": "dropdown-menu-item",
                "data-inset": t,
                "data-variant": r,
                className: (0, a.cn)(
                  "focus:bg-accent focus:text-accent-foreground data-[variant=destructive]:text-destructive-foreground data-[variant=destructive]:focus:bg-destructive/10 dark:data-[variant=destructive]:focus:bg-destructive/40 data-[variant=destructive]:focus:text-destructive-foreground data-[variant=destructive]:*:[svg]:!text-destructive-foreground [&_svg:not([class*='text-'])]:text-muted-foreground relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
                  e,
                ),
                ...n,
              });
            }
            function m({ ...e }) {
              return (0, s.jsx)(i.z6, {
                "data-slot": "dropdown-menu-radio-group",
                ...e,
              });
            }
            function h({ className: e, children: t, ...r }) {
              return (0, s.jsxs)(i.hN, {
                "data-slot": "dropdown-menu-radio-item",
                className: (0, a.cn)(
                  "focus:bg-accent focus:text-accent-foreground relative flex cursor-default items-center gap-2 rounded-sm py-1.5 pr-2 pl-8 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
                  e,
                ),
                ...r,
                children: [
                  (0, s.jsx)("span", {
                    className:
                      "pointer-events-none absolute left-2 flex size-3.5 items-center justify-center",
                    children: (0, s.jsx)(i.VF, {
                      children: (0, s.jsx)(o.A, {
                        className: "size-2 fill-current",
                      }),
                    }),
                  }),
                  t,
                ],
              });
            }
            function g({ className: e, inset: t, ...r }) {
              return (0, s.jsx)(i.JU, {
                "data-slot": "dropdown-menu-label",
                "data-inset": t,
                className: (0, a.cn)(
                  "px-2 py-1.5 text-sm font-medium data-[inset]:pl-8",
                  e,
                ),
                ...r,
              });
            }
            function v({ className: e, ...t }) {
              return (0, s.jsx)(i.wv, {
                "data-slot": "dropdown-menu-separator",
                className: (0, a.cn)("bg-border -mx-1 my-1 h-px", e),
                ...t,
              });
            }
            (a = (u.then ? (await u)() : u)[0]), n();
          } catch (e) {
            n(e);
          }
        });
      },
      94735: (e) => {
        "use strict";
        e.exports = require("events");
      },
      96465: (e, t, r) => {
        "use strict";
        r.d(t, { A: () => n });
        let n = (0, r(95255).A)("BadgeCheck", [
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
        r.d(t, { A: () => n });
        let n = (0, r(95255).A)("FileText", [
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
  var t = require("../../../webpack-runtime.js");
  t.C(e);
  var r = (e) => t((t.s = e)),
    n = t.X(
      0,
      [
        827, 6518, 2033, 4027, 2872, 7713, 5149, 8859, 8029, 5728, 9729, 3390,
        7719, 7911, 7393, 8119, 5058, 131, 2028, 4630, 4232, 8945,
      ],
      () => r(4652),
    );
  module.exports = n;
})();
//# sourceMappingURL=page.js.map
