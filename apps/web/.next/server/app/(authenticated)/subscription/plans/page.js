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
    (e._sentryDebugIds[t] = "8e6c9676-0aa0-4b59-892f-1705f08ec7cd"),
    (e._sentryDebugIdIdentifier =
      "sentry-dbid-8e6c9676-0aa0-4b59-892f-1705f08ec7cd"));
} catch (e) {}
(() => {
  var e = {};
  (e.id = 4621),
    (e.ids = [4621]),
    (e.modules = {
      415: (e, t, r) => {
        "use strict";
        r.d(t, { A: () => s });
        let s = (0, r(95255).A)("Check", [
          ["path", { d: "M20 6 9 17l-5-5", key: "1gmf2c" }],
        ]);
      },
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
        function u({ children: e }) {
          let [t, r] = (0, a.useState)(null),
            [n, u] = (0, a.useState)(null),
            [d, c] = (0, a.useState)(!0),
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
                  u(e), r(o(t));
                } else u(null), r(null);
              } catch (e) {
                console.error("Error refreshing session:", e), u(null), r(null);
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
                    e?.session && (u(e.session), r(o(e.session.user)));
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
                u(null), r(null);
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
            w = (0, a.useCallback)(
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
              isLoading: d,
              isAuthenticated: !!n,
              signIn: m,
              signOut: f,
              refreshSession: h,
              signUp: x,
              resetPassword: g,
              updatePassword: w,
              error: null,
            },
            children: e,
          });
        }
        function d() {
          let e = (0, a.useContext)(l);
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
      5451: (e, t, r) => {
        "use strict";
        r.a(e, async (e, s) => {
          try {
            r.d(t, {
              BT: () => p,
              Wu: () => h,
              ZB: () => c,
              Zp: () => u,
              aR: () => d,
              wL: () => m,
            });
            var a = r(61268),
              i = r(55728),
              n = r(84205),
              o = r(15942),
              l = e([o]);
            o = (l.then ? (await l)() : l)[0];
            let u = n.forwardRef(({ className: e, ...t }, r) =>
              (0, a.jsx)(i.P.div, {
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
            let d = n.forwardRef(({ className: e, ...t }, r) =>
              (0, a.jsx)("div", {
                ref: r,
                className: (0, o.cn)("flex flex-col space-y-1.5 p-6", e),
                ...t,
              }),
            );
            d.displayName = "CardHeader";
            let c = n.forwardRef(({ className: e, ...t }, r) =>
              (0, a.jsx)("h3", {
                ref: r,
                className: (0, o.cn)(
                  "text-2xl font-semibold leading-none tracking-tight",
                  e,
                ),
                ...t,
              }),
            );
            c.displayName = "CardTitle";
            let p = n.forwardRef(({ className: e, ...t }, r) =>
              (0, a.jsx)("p", {
                ref: r,
                className: (0, o.cn)("text-sm text-muted-foreground", e),
                ...t,
              }),
            );
            p.displayName = "CardDescription";
            let h = n.forwardRef(({ className: e, ...t }, r) =>
              (0, a.jsx)("div", {
                ref: r,
                className: (0, o.cn)("p-6 pt-0", e),
                ...t,
              }),
            );
            h.displayName = "CardContent";
            let m = n.forwardRef(({ className: e, ...t }, r) =>
              (0, a.jsx)("div", {
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
      6934: () => {},
      7839: (e, t, r) => {
        "use strict";
        r.d(t, { jH: () => i });
        var s = r(84205);
        r(61268);
        var a = s.createContext(void 0);
        function i(e) {
          let t = s.useContext(a);
          return e || t || "ltr";
        }
      },
      8086: (e) => {
        "use strict";
        e.exports = require("module");
      },
      10308: (e, t, r) => {
        "use strict";
        r.d(t, { c: () => a });
        var s = r(84205);
        function a(e) {
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
      11997: (e) => {
        "use strict";
        e.exports = require("punycode");
      },
      12005: (e, t, r) => {
        "use strict";
        r.a(e, async (e, s) => {
          try {
            r.d(t, { g: () => c });
            var a = r(61268),
              i = r(415),
              n = r(84205),
              o = r(28909),
              l = r(5451),
              u = r(77001),
              d = e([o, l, u]);
            [o, l, u] = d.then ? (await d)() : d;
            let p = [
              {
                id: "free",
                name: "Free",
                description: "Basic features for individuals getting started",
                price: { monthly: 0, yearly: 0 },
                features: [
                  "Up to 5 documents",
                  "Basic research tools",
                  "Limited document storage",
                  "Standard support",
                ],
              },
              {
                id: "pro",
                name: "Pro",
                description: "Advanced features for professionals",
                price: { monthly: 15, yearly: 144 },
                features: [
                  "Unlimited documents",
                  "Advanced research tools",
                  "10GB document storage",
                  "Priority support",
                  "No watermark",
                  "Collaboration tools",
                ],
                isPopular: !0,
              },
              {
                id: "business",
                name: "Business",
                description: "Enterprise-grade features for teams",
                price: { monthly: 49, yearly: 468 },
                features: [
                  "Everything in Pro",
                  "50GB document storage",
                  "Admin controls",
                  "API access",
                  "Team collaboration tools",
                  "Premium support",
                  "Custom integrations",
                ],
              },
            ];
            function c({ currentPlan: e, onSelectPlan: t }) {
              let [r, s] = (0, n.useState)("monthly");
              return (0, a.jsxs)("div", {
                className: "space-y-6",
                children: [
                  (0, a.jsx)("div", {
                    className:
                      "mx-auto flex w-fit flex-col items-center space-y-4",
                    children: (0, a.jsx)(u.Tabs, {
                      defaultValue: "monthly",
                      onValueChange: (e) => s(e),
                      children: (0, a.jsxs)(u.TabsList, {
                        children: [
                          (0, a.jsx)(u.TabsTrigger, {
                            value: "monthly",
                            children: "Monthly Billing",
                          }),
                          (0, a.jsx)(u.TabsTrigger, {
                            value: "yearly",
                            children: "Yearly Billing (Save 20%)",
                          }),
                        ],
                      }),
                    }),
                  }),
                  (0, a.jsx)("div", {
                    className: "grid gap-6 md:grid-cols-3",
                    children: p.map((s) =>
                      (0, a.jsxs)(
                        l.Zp,
                        {
                          className: `flex flex-col ${s.isPopular ? "border-blue-500 shadow-lg" : ""} relative`,
                          children: [
                            s.isPopular &&
                              (0, a.jsx)("div", {
                                className:
                                  "absolute -top-4 left-0 right-0 mx-auto w-fit rounded-full bg-blue-500 px-3 py-1 text-xs font-medium text-white",
                                children: "Most Popular",
                              }),
                            (0, a.jsxs)(l.aR, {
                              children: [
                                (0, a.jsx)(l.ZB, { children: s.name }),
                                (0, a.jsx)(l.BT, { children: s.description }),
                                (0, a.jsxs)("div", {
                                  className: "mt-2",
                                  children: [
                                    (0, a.jsxs)("span", {
                                      className: "text-3xl font-bold",
                                      children: [
                                        "$",
                                        "monthly" === r
                                          ? s.price.monthly
                                          : Math.round(s.price.yearly / 12),
                                      ],
                                    }),
                                    (0, a.jsx)("span", {
                                      className: "text-muted-foreground",
                                      children: "/month",
                                    }),
                                    "yearly" === r &&
                                      (0, a.jsxs)("div", {
                                        className:
                                          "mt-1 text-sm text-muted-foreground",
                                        children: [
                                          "Billed yearly ($",
                                          s.price.yearly,
                                          ")",
                                        ],
                                      }),
                                  ],
                                }),
                              ],
                            }),
                            (0, a.jsx)(l.Wu, {
                              className: "flex-1",
                              children: (0, a.jsx)("ul", {
                                className: "space-y-2",
                                children: s.features.map((e, t) =>
                                  (0, a.jsxs)(
                                    "li",
                                    {
                                      className: "flex items-center",
                                      children: [
                                        (0, a.jsx)(i.A, {
                                          className:
                                            "mr-2 h-4 w-4 text-green-500",
                                        }),
                                        (0, a.jsx)("span", { children: e }),
                                      ],
                                    },
                                    t,
                                  ),
                                ),
                              }),
                            }),
                            (0, a.jsx)(l.wL, {
                              children: (0, a.jsx)(o.$, {
                                variant: e === s.id ? "outline" : "default",
                                className: `w-full ${e === s.id ? "border-green-500 text-green-600" : ""} ${s.isPopular && e !== s.id ? "bg-blue-500 hover:bg-blue-600" : ""}`,
                                onClick: () => t(s.id),
                                disabled: e === s.id,
                                children:
                                  e === s.id ? "Current Plan" : "Select Plan",
                              }),
                            }),
                          ],
                        },
                        s.id,
                      ),
                    ),
                  }),
                ],
              });
            }
            s();
          } catch (e) {
            s(e);
          }
        });
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
          u = { toasts: [] };
        function d(e) {
          (u = o(u, e)),
            l.forEach((e) => {
              e(u);
            });
        }
        function c({ ...e }) {
          let t = (i = (i + 1) % Number.MAX_VALUE).toString(),
            r = () => d({ type: a.DISMISS_TOAST, toastId: t });
          return (
            d({
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
                d({ type: a.UPDATE_TOAST, toast: { ...e, id: t } }),
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
              dismiss: (e) => d({ type: a.DISMISS_TOAST, toastId: e }),
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
      21166: (e, t, r) => {
        "use strict";
        let s;
        r.r(t),
          r.d(t, {
            default: () => h,
            generateImageMetadata: () => c,
            generateMetadata: () => d,
            generateViewport: () => p,
          });
        var a = r(63033),
          i = r(26394),
          n = r(60442),
          o = (0, i.registerClientReference)(
            function () {
              throw Error(
                "Attempted to call the default export of \"E:\\\\downloads\\\\Hijraah\\\\apps\\\\web\\\\src\\\\app\\\\(authenticated)\\\\subscription\\\\plans\\\\page.tsx\" from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
              );
            },
            "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\(authenticated)\\subscription\\plans\\page.tsx",
            "default",
          );
        let l = { ...a },
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
                  let s, a, i;
                  try {
                    let e = u?.getStore();
                    (s = e?.headers.get("sentry-trace") ?? void 0),
                      (a = e?.headers.get("baggage") ?? void 0),
                      (i = e?.headers);
                  } catch (e) {}
                  return n
                    .wrapServerComponentWithSentry(e, {
                      componentRoute: "/(authenticated)/subscription/plans",
                      componentType: "Page",
                      sentryTraceHeader: s,
                      baggageHeader: a,
                      headers: i,
                    })
                    .apply(t, r);
                },
              })
            : o;
        let d = void 0,
          c = void 0,
          p = void 0,
          h = s;
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
        r.d(t, { B8: () => P, UC: () => R, bL: () => E, l9: () => N });
        var s = r(84205),
          a = r(28777),
          i = r(18047),
          n = r(59150),
          o = r(94653),
          l = r(78593),
          u = r(7839),
          d = r(48705),
          c = r(42414),
          p = r(61268),
          h = "Tabs",
          [m, f] = (0, i.A)(h, [n.RG]),
          x = (0, n.RG)(),
          [g, w] = m(h),
          b = s.forwardRef((e, t) => {
            let {
                __scopeTabs: r,
                value: s,
                onValueChange: a,
                defaultValue: i,
                orientation: n = "horizontal",
                dir: o,
                activationMode: m = "automatic",
                ...f
              } = e,
              x = (0, u.jH)(o),
              [w, b] = (0, d.i)({
                prop: s,
                onChange: a,
                defaultProp: i ?? "",
                caller: h,
              });
            return (0, p.jsx)(g, {
              scope: r,
              baseId: (0, c.B)(),
              value: w,
              onValueChange: b,
              orientation: n,
              dir: x,
              activationMode: m,
              children: (0, p.jsx)(l.sG.div, {
                dir: x,
                "data-orientation": n,
                ...f,
                ref: t,
              }),
            });
          });
        b.displayName = h;
        var v = "TabsList",
          y = s.forwardRef((e, t) => {
            let { __scopeTabs: r, loop: s = !0, ...a } = e,
              i = w(v, r),
              o = x(r);
            return (0, p.jsx)(n.bL, {
              asChild: !0,
              ...o,
              orientation: i.orientation,
              dir: i.dir,
              loop: s,
              children: (0, p.jsx)(l.sG.div, {
                role: "tablist",
                "aria-orientation": i.orientation,
                ...a,
                ref: t,
              }),
            });
          });
        y.displayName = v;
        var A = "TabsTrigger",
          _ = s.forwardRef((e, t) => {
            let { __scopeTabs: r, value: s, disabled: i = !1, ...o } = e,
              u = w(A, r),
              d = x(r),
              c = T(u.baseId, s),
              h = C(u.baseId, s),
              m = s === u.value;
            return (0, p.jsx)(n.q7, {
              asChild: !0,
              ...d,
              focusable: !i,
              active: m,
              children: (0, p.jsx)(l.sG.button, {
                type: "button",
                role: "tab",
                "aria-selected": m,
                "aria-controls": h,
                "data-state": m ? "active" : "inactive",
                "data-disabled": i ? "" : void 0,
                disabled: i,
                id: c,
                ...o,
                ref: t,
                onMouseDown: (0, a.m)(e.onMouseDown, (e) => {
                  i || 0 !== e.button || !1 !== e.ctrlKey
                    ? e.preventDefault()
                    : u.onValueChange(s);
                }),
                onKeyDown: (0, a.m)(e.onKeyDown, (e) => {
                  [" ", "Enter"].includes(e.key) && u.onValueChange(s);
                }),
                onFocus: (0, a.m)(e.onFocus, () => {
                  let e = "manual" !== u.activationMode;
                  m || i || !e || u.onValueChange(s);
                }),
              }),
            });
          });
        _.displayName = A;
        var S = "TabsContent",
          j = s.forwardRef((e, t) => {
            let {
                __scopeTabs: r,
                value: a,
                forceMount: i,
                children: n,
                ...u
              } = e,
              d = w(S, r),
              c = T(d.baseId, a),
              h = C(d.baseId, a),
              m = a === d.value,
              f = s.useRef(m);
            return (
              s.useEffect(() => {
                let e = requestAnimationFrame(() => (f.current = !1));
                return () => cancelAnimationFrame(e);
              }, []),
              (0, p.jsx)(o.C, {
                present: i || m,
                children: ({ present: r }) =>
                  (0, p.jsx)(l.sG.div, {
                    "data-state": m ? "active" : "inactive",
                    "data-orientation": d.orientation,
                    role: "tabpanel",
                    "aria-labelledby": c,
                    hidden: !r,
                    id: h,
                    tabIndex: 0,
                    ...u,
                    ref: t,
                    style: {
                      ...e.style,
                      animationDuration: f.current ? "0s" : void 0,
                    },
                    children: r && n,
                  }),
              })
            );
          });
        function T(e, t) {
          return `${e}-trigger-${t}`;
        }
        function C(e, t) {
          return `${e}-content-${t}`;
        }
        j.displayName = S;
        var E = b,
          P = y,
          N = _,
          R = j;
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
            : (s = (0, a.createBrowserClient)(u, d, {
                global: { headers: p },
              }));
        }
        function f() {
          return (0, o.useMemo)(m, []);
        }
        function x() {
          return (
            h(), (0, a.createBrowserClient)(u, d, { global: { headers: p } })
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
      43886: () => {},
      44708: (e) => {
        "use strict";
        e.exports = require("node:https");
      },
      48161: (e) => {
        "use strict";
        e.exports = require("node:os");
      },
      52214: (e, t, r) => {
        Promise.resolve().then(r.bind(r, 88391));
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
      56788: (e, t, r) => {
        "use strict";
        r.r(t),
          r.d(t, {
            GlobalError: () => i.default,
            __next_app__: () => d,
            pages: () => u,
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
                      "subscription",
                      {
                        children: [
                          "plans",
                          {
                            children: [
                              "__PAGE__",
                              {},
                              {
                                page: [
                                  () =>
                                    Promise.resolve().then(r.bind(r, 21166)),
                                  "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\(authenticated)\\subscription\\plans\\page.tsx",
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
          u = [
            "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\(authenticated)\\subscription\\plans\\page.tsx",
          ],
          d = { require: r, loadChunk: () => Promise.resolve() },
          c = new s.AppPageRouteModule({
            definition: {
              kind: a.RouteKind.APP_PAGE,
              page: "/(authenticated)/subscription/plans/page",
              pathname: "/subscription/plans",
              bundlePath: "",
              filename: "",
              appPaths: [],
            },
            userland: { loaderTree: l },
          });
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
        r.d(t, { RG: () => y, bL: () => N, q7: () => R });
        var s = r(84205),
          a = r(28777),
          i = r(28029),
          n = r(71604),
          o = r(18047),
          l = r(42414),
          u = r(78593),
          d = r(10308),
          c = r(48705),
          p = r(7839),
          h = r(61268),
          m = "rovingFocusGroup.onEntryFocus",
          f = { bubbles: !1, cancelable: !0 },
          x = "RovingFocusGroup",
          [g, w, b] = (0, i.N)(x),
          [v, y] = (0, o.A)(x, [b]),
          [A, _] = v(x),
          S = s.forwardRef((e, t) =>
            (0, h.jsx)(g.Provider, {
              scope: e.__scopeRovingFocusGroup,
              children: (0, h.jsx)(g.Slot, {
                scope: e.__scopeRovingFocusGroup,
                children: (0, h.jsx)(j, { ...e, ref: t }),
              }),
            }),
          );
        S.displayName = x;
        var j = s.forwardRef((e, t) => {
            let {
                __scopeRovingFocusGroup: r,
                orientation: i,
                loop: o = !1,
                dir: l,
                currentTabStopId: g,
                defaultCurrentTabStopId: b,
                onCurrentTabStopIdChange: v,
                onEntryFocus: y,
                preventScrollOnEntryFocus: _ = !1,
                ...S
              } = e,
              j = s.useRef(null),
              T = (0, n.s)(t, j),
              C = (0, p.jH)(l),
              [E, N] = (0, c.i)({
                prop: g,
                defaultProp: b ?? null,
                onChange: v,
                caller: x,
              }),
              [R, I] = s.useState(!1),
              q = (0, d.c)(y),
              k = w(r),
              U = s.useRef(!1),
              [D, O] = s.useState(0);
            return (
              s.useEffect(() => {
                let e = j.current;
                if (e)
                  return (
                    e.addEventListener(m, q), () => e.removeEventListener(m, q)
                  );
              }, [q]),
              (0, h.jsx)(A, {
                scope: r,
                orientation: i,
                dir: C,
                loop: o,
                currentTabStopId: E,
                onItemFocus: s.useCallback((e) => N(e), [N]),
                onItemShiftTab: s.useCallback(() => I(!0), []),
                onFocusableItemAdd: s.useCallback(() => O((e) => e + 1), []),
                onFocusableItemRemove: s.useCallback(() => O((e) => e - 1), []),
                children: (0, h.jsx)(u.sG.div, {
                  tabIndex: R || 0 === D ? -1 : 0,
                  "data-orientation": i,
                  ...S,
                  ref: T,
                  style: { outline: "none", ...e.style },
                  onMouseDown: (0, a.m)(e.onMouseDown, () => {
                    U.current = !0;
                  }),
                  onFocus: (0, a.m)(e.onFocus, (e) => {
                    let t = !U.current;
                    if (e.target === e.currentTarget && t && !R) {
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
                  onBlur: (0, a.m)(e.onBlur, () => I(!1)),
                }),
              })
            );
          }),
          T = "RovingFocusGroupItem",
          C = s.forwardRef((e, t) => {
            let {
                __scopeRovingFocusGroup: r,
                focusable: i = !0,
                active: n = !1,
                tabStopId: o,
                children: d,
                ...c
              } = e,
              p = (0, l.B)(),
              m = o || p,
              f = _(T, r),
              x = f.currentTabStopId === m,
              b = w(r),
              {
                onFocusableItemAdd: v,
                onFocusableItemRemove: y,
                currentTabStopId: A,
              } = f;
            return (
              s.useEffect(() => {
                if (i) return v(), () => y();
              }, [i, v, y]),
              (0, h.jsx)(g.ItemSlot, {
                scope: r,
                id: m,
                focusable: i,
                active: n,
                children: (0, h.jsx)(u.sG.span, {
                  tabIndex: x ? 0 : -1,
                  "data-orientation": f.orientation,
                  ...c,
                  ref: t,
                  onMouseDown: (0, a.m)(e.onMouseDown, (e) => {
                    i ? f.onItemFocus(m) : e.preventDefault();
                  }),
                  onFocus: (0, a.m)(e.onFocus, () => f.onItemFocus(m)),
                  onKeyDown: (0, a.m)(e.onKeyDown, (e) => {
                    if ("Tab" === e.key && e.shiftKey)
                      return void f.onItemShiftTab();
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
                        return E[a];
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
                      ? d({ isCurrentTabStop: x, hasTabStop: null != A })
                      : d,
                }),
              })
            );
          });
        C.displayName = T;
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
        var N = S,
          R = C;
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
          return (c || (c = new d(void 0)), c).hasPermission(e, t);
        }
      },
      63033: (e) => {
        "use strict";
        e.exports = require("next/dist/server/app-render/work-unit-async-storage.external.js");
      },
      72967: (e, t, r) => {
        "use strict";
        let s;
        r.r(t),
          r.d(t, {
            default: () => p,
            generateImageMetadata: () => d,
            generateMetadata: () => u,
            generateViewport: () => c,
          });
        var a = r(63033),
          i = r(35242),
          n = r(60442);
        let o = { ...a },
          l =
            "workUnitAsyncStorage" in o
              ? o.workUnitAsyncStorage
              : "requestAsyncStorage" in o
                ? o.requestAsyncStorage
                : void 0;
        s = new Proxy(
          function ({ children: e }) {
            return (0, i.jsx)(i.Fragment, { children: e });
          },
          {
            apply: (e, t, r) => {
              let s, a, i;
              try {
                let e = l?.getStore();
                (s = e?.headers.get("sentry-trace") ?? void 0),
                  (a = e?.headers.get("baggage") ?? void 0),
                  (i = e?.headers);
              } catch (e) {}
              return n
                .wrapServerComponentWithSentry(e, {
                  componentRoute: "/(authenticated)",
                  componentType: "Layout",
                  sentryTraceHeader: s,
                  baggageHeader: a,
                  headers: i,
                })
                .apply(t, r);
            },
          },
        );
        let u = void 0,
          d = void 0,
          c = void 0,
          p = s;
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
            var a = r(61268),
              i = r(28366);
            r(84205);
            var n = r(15942),
              o = e([n]);
            function l({ className: e, ...t }) {
              return (0, a.jsx)(i.bL, {
                "data-slot": "tabs",
                className: (0, n.cn)("flex flex-col gap-2", e),
                ...t,
              });
            }
            function u({ className: e, ...t }) {
              return (0, a.jsx)(i.B8, {
                "data-slot": "tabs-list",
                className: (0, n.cn)(
                  "bg-muted text-muted-foreground inline-flex h-9 w-fit items-center justify-center rounded-lg p-[3px]",
                  e,
                ),
                ...t,
              });
            }
            function d({ className: e, ...t }) {
              return (0, a.jsx)(i.l9, {
                "data-slot": "tabs-trigger",
                className: (0, n.cn)(
                  "data-[state=active]:bg-background dark:data-[state=active]:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:outline-ring dark:data-[state=active]:border-input dark:data-[state=active]:bg-input/30 text-foreground dark:text-muted-foreground inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-md border border-transparent px-2 py-1 text-sm font-medium whitespace-nowrap transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:shadow-sm [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
                  e,
                ),
                ...t,
              });
            }
            function c({ className: e, ...t }) {
              return (0, a.jsx)(i.UC, {
                "data-slot": "tabs-content",
                className: (0, n.cn)("flex-1 outline-none", e),
                ...t,
              });
            }
            (n = (o.then ? (await o)() : o)[0]), s();
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
      87977: (e, t, r) => {
        Promise.resolve().then(r.bind(r, 21166));
      },
      88391: (e, t, r) => {
        "use strict";
        r.a(e, async (e, s) => {
          try {
            r.r(t), r.d(t, { default: () => m });
            var a = r(61268),
              i = r(89882),
              n = r(84205),
              o = r(12005),
              l = r(15090),
              u = r(3519),
              d = r(32367),
              c = r(28909),
              p = r(5451),
              h = e([o, c, p]);
            function m() {
              let e = (0, i.useRouter)(),
                { user: t } = (0, u.useAuth)();
              (0, d.Iw)();
              let { toast: r } = (0, l.d)(),
                [s, h] = (0, n.useState)(null),
                [m, f] = (0, n.useState)(!0),
                x = async (r) => {
                  if (!t) return void e.push("/auth/login");
                  e.push(`/settings/billing?plan=${r}`);
                };
              return (0, a.jsx)("div", {
                className: "container max-w-6xl py-10",
                children: (0, a.jsxs)("div", {
                  className: "space-y-6",
                  children: [
                    (0, a.jsxs)("div", {
                      className: "space-y-2 text-center",
                      children: [
                        (0, a.jsx)("h1", {
                          className:
                            "text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl",
                          children: "Choose Your Plan",
                        }),
                        (0, a.jsx)("p", {
                          className:
                            "mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400",
                          children:
                            "Select the plan that best fits your needs. Upgrade anytime or cancel whenever you want.",
                        }),
                      ],
                    }),
                    m
                      ? (0, a.jsx)("div", {
                          className: "flex justify-center py-10",
                          children: (0, a.jsx)("div", {
                            className:
                              "h-6 w-6 animate-spin rounded-full border-b-2 border-gray-900",
                          }),
                        })
                      : (0, a.jsx)(o.g, { currentPlan: s, onSelectPlan: x }),
                    (0, a.jsx)("div", {
                      className: "mx-auto max-w-2xl text-center",
                      children: (0, a.jsxs)(p.Zp, {
                        children: [
                          (0, a.jsxs)(p.aR, {
                            children: [
                              (0, a.jsx)(p.ZB, {
                                className: "text-lg",
                                children: "Need a custom plan?",
                              }),
                              (0, a.jsx)(p.BT, {
                                children:
                                  "Contact our sales team for enterprise options and custom solutions",
                              }),
                            ],
                          }),
                          (0, a.jsx)(p.wL, {
                            className: "flex justify-center",
                            children: (0, a.jsx)(c.$, {
                              variant: "outline",
                              onClick: () => e.push("/contact"),
                              children: "Contact Sales",
                            }),
                          }),
                        ],
                      }),
                    }),
                  ],
                }),
              });
            }
            ([o, c, p] = h.then ? (await h)() : h), s();
          } catch (e) {
            s(e);
          }
        });
      },
      91645: (e) => {
        "use strict";
        e.exports = require("net");
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
                  className: u = "",
                  children: d,
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
                    className: ["lucide", `lucide-${i(e)}`, u].join(" "),
                    ...c,
                  },
                  [
                    ...t.map(([e, t]) => (0, s.createElement)(e, t)),
                    ...(Array.isArray(d) ? d : [d]),
                  ],
                ),
            );
            return (r.displayName = `${e}`), r;
          };
      },
    });
  var t = require("../../../../webpack-runtime.js");
  t.C(e);
  var r = (e) => t((t.s = e)),
    s = t.X(
      0,
      [827, 6518, 2033, 4027, 2872, 7713, 5149, 8859, 8029, 5728, 4630],
      () => r(56788),
    );
  module.exports = s;
})();
//# sourceMappingURL=page.js.map
