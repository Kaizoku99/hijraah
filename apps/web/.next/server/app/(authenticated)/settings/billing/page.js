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
    (e._sentryDebugIds[t] = "6e6769e3-1b76-4edc-8fb9-43a446336714"),
    (e._sentryDebugIdIdentifier =
      "sentry-dbid-6e6769e3-1b76-4edc-8fb9-43a446336714"));
} catch (e) {}
(() => {
  var e = {};
  (e.id = 6605),
    (e.ids = [6605]),
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
            useAuth: () => c,
            useHasPermission: () => m,
            useHasRole: () => p,
            useIsAuthenticated: () => h,
            useSession: () => x,
            useUser: () => u,
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
            [c, u] = (0, a.useState)(!0),
            h = (0, i.UU)(),
            p = (0, a.useCallback)(async () => {
              try {
                u(!0);
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
                u(!1);
              }
            }, [h]),
            m = (0, a.useCallback)(
              async (e, t) => {
                u(!0);
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
                  u(!1);
                }
              },
              [h],
            ),
            x = (0, a.useCallback)(async () => {
              u(!0);
              try {
                let { error: e } = await h.auth.signOut();
                if (e) throw e;
                d(null), r(null);
              } catch (e) {
                console.error("Error signing out:", e);
              } finally {
                u(!1);
              }
            }, [h]),
            f = (0, a.useCallback)(
              async (e) => {
                u(!0);
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
                  u(!1);
                }
              },
              [h],
            ),
            g = (0, a.useCallback)(
              async (e, t) => {
                u(!0);
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
                  u(!1);
                }
              },
              [h],
            ),
            w = (0, a.useCallback)(
              async (e) => {
                u(!0);
                try {
                  let { error: t } = await h.auth.updateUser({ password: e });
                  if (t) throw t;
                  return !0;
                } catch (e) {
                  throw (console.error("Error updating password:", e), e);
                } finally {
                  u(!1);
                }
              },
              [h],
            );
          return (0, s.jsx)(l.Provider, {
            value: {
              user: t,
              session: n,
              isLoading: c,
              isAuthenticated: !!n,
              signIn: m,
              signOut: x,
              refreshSession: p,
              signUp: f,
              resetPassword: g,
              updatePassword: w,
              error: null,
            },
            children: e,
          });
        }
        function c() {
          let e = (0, a.useContext)(l);
          if (void 0 === e)
            throw Error("useAuth must be used within an AuthProvider");
          return e;
        }
        function u() {
          let { user: e } = c();
          return e;
        }
        function h() {
          let { isAuthenticated: e } = c();
          return e;
        }
        function p(e) {
          let t = u();
          return t?.role === e;
        }
        function m(e) {
          let t = u();
          return (0, n._m)(t, e);
        }
        function x() {
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
              BT: () => h,
              Wu: () => p,
              ZB: () => u,
              Zp: () => d,
              aR: () => c,
              wL: () => m,
            });
            var a = r(61268),
              i = r(55728),
              n = r(84205),
              o = r(15942),
              l = e([o]);
            o = (l.then ? (await l)() : l)[0];
            let d = n.forwardRef(({ className: e, ...t }, r) =>
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
            d.displayName = "Card";
            let c = n.forwardRef(({ className: e, ...t }, r) =>
              (0, a.jsx)("div", {
                ref: r,
                className: (0, o.cn)("flex flex-col space-y-1.5 p-6", e),
                ...t,
              }),
            );
            c.displayName = "CardHeader";
            let u = n.forwardRef(({ className: e, ...t }, r) =>
              (0, a.jsx)("h3", {
                ref: r,
                className: (0, o.cn)(
                  "text-2xl font-semibold leading-none tracking-tight",
                  e,
                ),
                ...t,
              }),
            );
            u.displayName = "CardTitle";
            let h = n.forwardRef(({ className: e, ...t }, r) =>
              (0, a.jsx)("p", {
                ref: r,
                className: (0, o.cn)("text-sm text-muted-foreground", e),
                ...t,
              }),
            );
            h.displayName = "CardDescription";
            let p = n.forwardRef(({ className: e, ...t }, r) =>
              (0, a.jsx)("div", {
                ref: r,
                className: (0, o.cn)("p-6 pt-0", e),
                ...t,
              }),
            );
            p.displayName = "CardContent";
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
      8086: (e) => {
        "use strict";
        e.exports = require("module");
      },
      9672: (e, t, r) => {
        "use strict";
        r.a(e, async (e, s) => {
          try {
            r.r(t), r.d(t, { default: () => j });
            var a = r(61268),
              i = r(38568),
              n = r(36789),
              o = r(61950),
              l = r(12795),
              d = r(66341),
              c = r(49835),
              u = r(12335),
              h = r(89882),
              p = r(84205),
              m = r(15090),
              x = r(3519),
              f = r(32367),
              g = r(44619),
              w = r(28909),
              y = r(5451),
              b = r(66321),
              v = e([g, w, y, b]);
            function j() {
              let { user: e } = (0, x.useAuth)();
              (0, f.Iw)();
              let { toast: t } = (0, m.d)(),
                r = (0, h.useSearchParams)().get("plan"),
                [s, v] = (0, p.useState)(null),
                [j, A] = (0, p.useState)(!0),
                [N, _] = (0, p.useState)(!1),
                S = () => {
                  t({
                    title: "Payment Method",
                    description:
                      "In a real implementation, this would open a payment form.",
                  });
                },
                C = async () => {
                  if (r)
                    try {
                      _(!0),
                        await new Promise((e) => setTimeout(e, 1500)),
                        t({
                          title: "Subscription Updated",
                          description: `You've successfully upgraded to the ${r.charAt(0).toUpperCase() + r.slice(1)} plan.`,
                          variant: "default",
                        }),
                        s &&
                          v({
                            ...s,
                            plan: r.charAt(0).toUpperCase() + r.slice(1),
                          });
                    } catch (e) {
                      console.error("Error upgrading plan:", e),
                        t({
                          variant: "destructive",
                          title: "Error",
                          description: "Failed to upgrade plan",
                        });
                    } finally {
                      _(!1);
                    }
                },
                E = (e) =>
                  new Date(e).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  }),
                T = (e) => {
                  switch (e) {
                    case "paid":
                      return (0, a.jsx)(i.A, {
                        className: "h-4 w-4 text-green-500",
                      });
                    case "open":
                      return (0, a.jsx)(n.A, {
                        className: "h-4 w-4 text-yellow-500",
                      });
                    default:
                      return (0, a.jsx)(o.A, {
                        className: "h-4 w-4 text-red-500",
                      });
                  }
                };
              return (0, a.jsxs)("div", {
                className: "container max-w-4xl py-8",
                children: [
                  (0, a.jsxs)("div", {
                    className: "flex items-center justify-between",
                    children: [
                      (0, a.jsx)("h1", {
                        className: "text-2xl font-bold",
                        children: "Billing & Subscription",
                      }),
                      (0, a.jsx)(w.$, {
                        variant: "outline",
                        onClick: () =>
                          (window.location.href = "/subscription/plans"),
                        children: "View Plans",
                      }),
                    ],
                  }),
                  (0, a.jsx)("div", {
                    className: "mt-8 space-y-8",
                    children: j
                      ? (0, a.jsx)("div", {
                          className: "flex justify-center py-10",
                          children: (0, a.jsx)("div", {
                            className:
                              "h-6 w-6 animate-spin rounded-full border-b-2 border-gray-900",
                          }),
                        })
                      : (0, a.jsxs)(a.Fragment, {
                          children: [
                            r &&
                              !s?.paymentMethod &&
                              (0, a.jsxs)(g.Fc, {
                                className: "mb-8",
                                children: [
                                  (0, a.jsx)(o.A, { className: "h-4 w-4" }),
                                  (0, a.jsx)(g.XL, {
                                    children: "Complete your subscription",
                                  }),
                                  (0, a.jsxs)(g.TN, {
                                    children: [
                                      "Add a payment method to activate your",
                                      " ",
                                      r.charAt(0).toUpperCase() + r.slice(1),
                                      " ",
                                      "subscription.",
                                    ],
                                  }),
                                ],
                              }),
                            (0, a.jsxs)(y.Zp, {
                              children: [
                                (0, a.jsx)(y.aR, {
                                  children: (0, a.jsxs)(y.ZB, {
                                    className: "flex items-center",
                                    children: [
                                      (0, a.jsx)(l.A, {
                                        className: "mr-2 h-5 w-5 text-blue-500",
                                      }),
                                      "Current Plan",
                                    ],
                                  }),
                                }),
                                (0, a.jsx)(y.Wu, {
                                  children: (0, a.jsx)("div", {
                                    className: "space-y-4",
                                    children: (0, a.jsxs)("div", {
                                      className:
                                        "flex items-center justify-between",
                                      children: [
                                        (0, a.jsxs)("div", {
                                          children: [
                                            (0, a.jsxs)("h3", {
                                              className: "text-lg font-medium",
                                              children: [
                                                s?.plan || "Free",
                                                " Plan",
                                              ],
                                            }),
                                            (0, a.jsx)("p", {
                                              className:
                                                "text-sm text-muted-foreground",
                                              children:
                                                s?.status === "active"
                                                  ? `Renews on ${E(s.currentPeriodEnd)}`
                                                  : "No active subscription",
                                            }),
                                          ],
                                        }),
                                        s?.status === "active" &&
                                          (0, a.jsx)("span", {
                                            className:
                                              "rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-800",
                                            children: "Active",
                                          }),
                                      ],
                                    }),
                                  }),
                                }),
                                (0, a.jsx)(y.wL, {
                                  children: (0, a.jsx)(w.$, {
                                    onClick: () =>
                                      (window.location.href =
                                        "/subscription/plans"),
                                    variant: "outline",
                                    className: "w-full",
                                    children:
                                      s?.plan === "Free"
                                        ? "Upgrade Plan"
                                        : "Change Plan",
                                  }),
                                }),
                              ],
                            }),
                            (0, a.jsxs)(y.Zp, {
                              children: [
                                (0, a.jsx)(y.aR, {
                                  children: (0, a.jsxs)(y.ZB, {
                                    className: "flex items-center",
                                    children: [
                                      (0, a.jsx)(d.A, {
                                        className: "mr-2 h-5 w-5 text-blue-500",
                                      }),
                                      "Payment Method",
                                    ],
                                  }),
                                }),
                                (0, a.jsx)(y.Wu, {
                                  children: s?.paymentMethod
                                    ? (0, a.jsx)("div", {
                                        className: "space-y-4",
                                        children: (0, a.jsx)("div", {
                                          className:
                                            "rounded-lg border border-border p-4",
                                          children: (0, a.jsxs)("div", {
                                            className:
                                              "flex items-center justify-between",
                                            children: [
                                              (0, a.jsxs)("div", {
                                                children: [
                                                  (0, a.jsxs)("p", {
                                                    className:
                                                      "font-medium capitalize",
                                                    children: [
                                                      s.paymentMethod.brand,
                                                      " ••••",
                                                      " ",
                                                      s.paymentMethod.last4,
                                                    ],
                                                  }),
                                                  (0, a.jsxs)("p", {
                                                    className:
                                                      "text-sm text-muted-foreground",
                                                    children: [
                                                      "Expires ",
                                                      s.paymentMethod
                                                        .expiryMonth,
                                                      "/",
                                                      s.paymentMethod
                                                        .expiryYear,
                                                    ],
                                                  }),
                                                ],
                                              }),
                                              (0, a.jsx)(w.$, {
                                                variant: "ghost",
                                                size: "sm",
                                                children: "Edit",
                                              }),
                                            ],
                                          }),
                                        }),
                                      })
                                    : (0, a.jsxs)("div", {
                                        className:
                                          "rounded-lg border border-dashed border-border p-6 text-center",
                                        children: [
                                          (0, a.jsx)("div", {
                                            className:
                                              "mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-muted",
                                            children: (0, a.jsx)(d.A, {
                                              className: "h-6 w-6",
                                            }),
                                          }),
                                          (0, a.jsx)("h3", {
                                            className:
                                              "mb-1 text-lg font-medium",
                                            children: "No payment method",
                                          }),
                                          (0, a.jsx)("p", {
                                            className:
                                              "mb-4 text-sm text-muted-foreground",
                                            children:
                                              "Add a payment method to subscribe to a paid plan",
                                          }),
                                          r
                                            ? (0, a.jsx)(w.$, {
                                                onClick: S,
                                                className: "mx-auto",
                                                children: "Add payment method",
                                              })
                                            : (0, a.jsx)(w.$, {
                                                onClick: S,
                                                variant: "outline",
                                                className: "mx-auto",
                                                children: "Add payment method",
                                              }),
                                        ],
                                      }),
                                }),
                              ],
                            }),
                            r &&
                              !s?.paymentMethod &&
                              (0, a.jsx)("div", {
                                className: "mt-6 flex justify-end",
                                children: (0, a.jsx)(w.$, {
                                  onClick: C,
                                  disabled: N || !s?.paymentMethod,
                                  className: "px-8",
                                  children: N
                                    ? "Processing..."
                                    : "Complete Upgrade",
                                }),
                              }),
                            (0, a.jsxs)(y.Zp, {
                              children: [
                                (0, a.jsx)(y.aR, {
                                  children: (0, a.jsxs)(y.ZB, {
                                    className: "flex items-center",
                                    children: [
                                      (0, a.jsx)(c.A, {
                                        className: "mr-2 h-5 w-5 text-blue-500",
                                      }),
                                      "Billing History",
                                    ],
                                  }),
                                }),
                                (0, a.jsx)(y.Wu, {
                                  children:
                                    s?.invoices && s.invoices.length > 0
                                      ? (0, a.jsxs)(b.XI, {
                                          children: [
                                            (0, a.jsx)(b.A0, {
                                              children: (0, a.jsxs)(b.Hj, {
                                                children: [
                                                  (0, a.jsx)(b.nd, {
                                                    children: "Date",
                                                  }),
                                                  (0, a.jsx)(b.nd, {
                                                    children: "Invoice",
                                                  }),
                                                  (0, a.jsx)(b.nd, {
                                                    children: "Amount",
                                                  }),
                                                  (0, a.jsx)(b.nd, {
                                                    children: "Status",
                                                  }),
                                                  (0, a.jsx)(b.nd, {
                                                    className: "w-10",
                                                  }),
                                                ],
                                              }),
                                            }),
                                            (0, a.jsx)(b.BF, {
                                              children: s.invoices.map((e) =>
                                                (0, a.jsxs)(
                                                  b.Hj,
                                                  {
                                                    children: [
                                                      (0, a.jsx)(b.nA, {
                                                        children: E(e.date),
                                                      }),
                                                      (0, a.jsx)(b.nA, {
                                                        children: e.id,
                                                      }),
                                                      (0, a.jsxs)(b.nA, {
                                                        children: [
                                                          "$",
                                                          e.amount.toFixed(2),
                                                        ],
                                                      }),
                                                      (0, a.jsxs)(b.nA, {
                                                        className:
                                                          "flex items-center gap-1",
                                                        children: [
                                                          T(e.status),
                                                          (0, a.jsx)("span", {
                                                            className:
                                                              "capitalize",
                                                            children: e.status,
                                                          }),
                                                        ],
                                                      }),
                                                      (0, a.jsx)(b.nA, {
                                                        children:
                                                          e.url &&
                                                          (0, a.jsx)(w.$, {
                                                            variant: "ghost",
                                                            size: "sm",
                                                            className:
                                                              "h-8 w-8 p-0",
                                                            children: (0,
                                                            a.jsx)(u.A, {
                                                              className:
                                                                "h-4 w-4",
                                                            }),
                                                          }),
                                                      }),
                                                    ],
                                                  },
                                                  e.id,
                                                ),
                                              ),
                                            }),
                                          ],
                                        })
                                      : (0, a.jsx)("p", {
                                          className:
                                            "text-center text-muted-foreground py-8",
                                          children:
                                            "No billing history available",
                                        }),
                                }),
                              ],
                            }),
                          ],
                        }),
                  }),
                ],
              });
            }
            ([g, w, y, b] = v.then ? (await v)() : v),
              new Date(Date.now() + 2592e6).toISOString(),
              new Date(Date.now() - 2592e6).toISOString(),
              new Date(Date.now() - 5184e6).toISOString(),
              s();
          } catch (e) {
            s(e);
          }
        });
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
      12795: (e, t, r) => {
        "use strict";
        r.d(t, { A: () => s });
        let s = (0, r(95255).A)("ShieldCheck", [
          [
            "path",
            {
              d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
              key: "oel41y",
            },
          ],
          ["path", { d: "m9 12 2 2 4-4", key: "dzmm74" }],
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
        function c(e) {
          (d = o(d, e)),
            l.forEach((e) => {
              e(d);
            });
        }
        function u({ ...e }) {
          let t = (i = (i + 1) % Number.MAX_VALUE).toString(),
            r = () => c({ type: a.DISMISS_TOAST, toastId: t });
          return (
            c({
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
                c({ type: a.UPDATE_TOAST, toast: { ...e, id: t } }),
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
              toast: u,
              dismiss: (e) => c({ type: a.DISMISS_TOAST, toastId: e }),
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
      20012: (e, t, r) => {
        Promise.resolve().then(r.bind(r, 9672));
      },
      21820: (e) => {
        "use strict";
        e.exports = require("os");
      },
      24940: (e, t, r) => {
        "use strict";
        r.r(t),
          r.d(t, {
            GlobalError: () => i.default,
            __next_app__: () => c,
            pages: () => d,
            routeModule: () => u,
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
                      "settings",
                      {
                        children: [
                          "billing",
                          {
                            children: [
                              "__PAGE__",
                              {},
                              {
                                page: [
                                  () =>
                                    Promise.resolve().then(r.bind(r, 47530)),
                                  "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\(authenticated)\\settings\\billing\\page.tsx",
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
          d = [
            "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\(authenticated)\\settings\\billing\\page.tsx",
          ],
          c = { require: r, loadChunk: () => Promise.resolve() },
          u = new s.AppPageRouteModule({
            definition: {
              kind: a.RouteKind.APP_PAGE,
              page: "/(authenticated)/settings/billing/page",
              pathname: "/settings/billing",
              bundlePath: "",
              filename: "",
              appPaths: [],
            },
            userland: { loaderTree: l },
          });
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
        r.d(t, { AG: () => g, Iw: () => x, UU: () => f });
        var a = r(97713),
          i = r(15149),
          n = r.n(i),
          o = r(84205);
        let { fetch: l } = n()(),
          d = "http://localhost:54321",
          c =
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0",
          u = process.env.SUPABASE_SERVICE_ROLE_KEY,
          h = c ? { apikey: c } : void 0;
        function p() {
          if (!d || !c)
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
            : (s = (0, a.createBrowserClient)(d, c, {
                global: { headers: h },
              }));
        }
        function x() {
          return (0, o.useMemo)(m, []);
        }
        function f() {
          return (
            p(), (0, a.createBrowserClient)(d, c, { global: { headers: h } })
          );
        }
        let g = m;
        m();
      },
      33164: (e, t, r) => {
        Promise.resolve().then(r.bind(r, 47530));
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
      37067: (e) => {
        "use strict";
        e.exports = require("node:http");
      },
      38522: (e) => {
        "use strict";
        e.exports = require("node:zlib");
      },
      38568: (e, t, r) => {
        "use strict";
        r.d(t, { A: () => s });
        let s = (0, r(95255).A)("CheckCircle", [
          ["path", { d: "M22 11.08V12a10 10 0 1 1-5.93-9.14", key: "g774vq" }],
          ["path", { d: "m9 11 3 3L22 4", key: "1pflzl" }],
        ]);
      },
      41692: (e) => {
        "use strict";
        e.exports = require("node:tls");
      },
      43886: () => {},
      44619: (e, t, r) => {
        "use strict";
        r.a(e, async (e, s) => {
          try {
            r.d(t, { Fc: () => l, TN: () => c, XL: () => d });
            var a = r(61268),
              i = r(91635);
            r(84205);
            var n = r(15942),
              o = e([n]);
            n = (o.then ? (await o)() : o)[0];
            let u = (0, i.F)(
              "relative w-full rounded-lg border px-4 py-3 text-sm grid has-[>svg]:grid-cols-[calc(var(--spacing)*4)_1fr] grid-cols-[0_1fr] has-[>svg]:gap-x-3 gap-y-0.5 items-start [&>svg]:size-4 [&>svg]:translate-y-0.5 [&>svg]:text-current",
              {
                variants: {
                  variant: {
                    default: "bg-background text-foreground",
                    destructive:
                      "text-destructive-foreground [&>svg]:text-current *:data-[slot=alert-description]:text-destructive-foreground/80",
                  },
                },
                defaultVariants: { variant: "default" },
              },
            );
            function l({ className: e, variant: t, ...r }) {
              return (0, a.jsx)("div", {
                "data-slot": "alert",
                role: "alert",
                className: (0, n.cn)(u({ variant: t }), e),
                ...r,
              });
            }
            function d({ className: e, ...t }) {
              return (0, a.jsx)("div", {
                "data-slot": "alert-title",
                className: (0, n.cn)(
                  "col-start-2 line-clamp-1 min-h-4 font-medium tracking-tight",
                  e,
                ),
                ...t,
              });
            }
            function c({ className: e, ...t }) {
              return (0, a.jsx)("div", {
                "data-slot": "alert-description",
                className: (0, n.cn)(
                  "text-muted-foreground col-start-2 grid justify-items-start gap-1 text-sm [&_p]:leading-relaxed",
                  e,
                ),
                ...t,
              });
            }
            s();
          } catch (e) {
            s(e);
          }
        });
      },
      44708: (e) => {
        "use strict";
        e.exports = require("node:https");
      },
      47530: (e, t, r) => {
        "use strict";
        let s;
        r.r(t),
          r.d(t, {
            default: () => p,
            generateImageMetadata: () => u,
            generateMetadata: () => c,
            generateViewport: () => h,
          });
        var a = r(63033),
          i = r(26394),
          n = r(60442),
          o = (0, i.registerClientReference)(
            function () {
              throw Error(
                "Attempted to call the default export of \"E:\\\\downloads\\\\Hijraah\\\\apps\\\\web\\\\src\\\\app\\\\(authenticated)\\\\settings\\\\billing\\\\page.tsx\" from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
              );
            },
            "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\(authenticated)\\settings\\billing\\page.tsx",
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
                      componentRoute: "/(authenticated)/settings/billing",
                      componentType: "Page",
                      sentryTraceHeader: s,
                      baggageHeader: a,
                      headers: i,
                    })
                    .apply(t, r);
                },
              })
            : o;
        let c = void 0,
          u = void 0,
          h = void 0,
          p = s;
      },
      48161: (e) => {
        "use strict";
        e.exports = require("node:os");
      },
      49835: (e, t, r) => {
        "use strict";
        r.d(t, { A: () => s });
        let s = (0, r(95255).A)("Receipt", [
          [
            "path",
            {
              d: "M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z",
              key: "q3az6g",
            },
          ],
          [
            "path",
            { d: "M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8", key: "1h4pet" },
          ],
          ["path", { d: "M12 17.5v-11", key: "1jc1ny" }],
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
      57975: (e) => {
        "use strict";
        e.exports = require("node:util");
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
        class c {
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
        let u = null;
        function h(e, t) {
          var r;
          return (u || (u = new c(void 0)), u).hasPermission(e, t);
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
      66321: (e, t, r) => {
        "use strict";
        r.a(e, async (e, s) => {
          try {
            r.d(t, {
              A0: () => d,
              BF: () => c,
              Hj: () => u,
              XI: () => l,
              nA: () => p,
              nd: () => h,
              r6: () => m,
            });
            var a = r(61268),
              i = r(84205),
              n = r(15942),
              o = e([n]);
            n = (o.then ? (await o)() : o)[0];
            let l = i.forwardRef(({ className: e, ...t }, r) =>
              (0, a.jsx)("div", {
                className: "relative w-full overflow-auto",
                children: (0, a.jsx)("table", {
                  ref: r,
                  className: (0, n.cn)("w-full caption-bottom text-sm", e),
                  ...t,
                }),
              }),
            );
            l.displayName = "Table";
            let d = i.forwardRef(({ className: e, ...t }, r) =>
              (0, a.jsx)("thead", {
                ref: r,
                className: (0, n.cn)("[&_tr]:border-b", e),
                ...t,
              }),
            );
            d.displayName = "TableHeader";
            let c = i.forwardRef(({ className: e, ...t }, r) =>
              (0, a.jsx)("tbody", {
                ref: r,
                className: (0, n.cn)("[&_tr:last-child]:border-0", e),
                ...t,
              }),
            );
            (c.displayName = "TableBody"),
              (i.forwardRef(({ className: e, ...t }, r) =>
                (0, a.jsx)("tfoot", {
                  ref: r,
                  className: (0, n.cn)(
                    "border-t bg-muted/50 font-medium [&>tr]:last:border-b-0",
                    e,
                  ),
                  ...t,
                }),
              ).displayName = "TableFooter");
            let u = i.forwardRef(({ className: e, ...t }, r) =>
              (0, a.jsx)("tr", {
                ref: r,
                className: (0, n.cn)(
                  "border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted",
                  e,
                ),
                ...t,
              }),
            );
            u.displayName = "TableRow";
            let h = i.forwardRef(({ className: e, ...t }, r) =>
              (0, a.jsx)("th", {
                ref: r,
                className: (0, n.cn)(
                  "h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0",
                  e,
                ),
                ...t,
              }),
            );
            h.displayName = "TableHead";
            let p = i.forwardRef(({ className: e, ...t }, r) =>
              (0, a.jsx)("td", {
                ref: r,
                className: (0, n.cn)(
                  "p-4 align-middle [&:has([role=checkbox])]:pr-0",
                  e,
                ),
                ...t,
              }),
            );
            p.displayName = "TableCell";
            let m = i.forwardRef(({ className: e, ...t }, r) =>
              (0, a.jsx)("caption", {
                ref: r,
                className: (0, n.cn)("mt-4 text-sm text-muted-foreground", e),
                ...t,
              }),
            );
            (m.displayName = "TableCaption"), s();
          } catch (e) {
            s(e);
          }
        });
      },
      66341: (e, t, r) => {
        "use strict";
        r.d(t, { A: () => s });
        let s = (0, r(95255).A)("CreditCard", [
          [
            "rect",
            {
              width: "20",
              height: "14",
              x: "2",
              y: "5",
              rx: "2",
              key: "ynyp8z",
            },
          ],
          ["line", { x1: "2", x2: "22", y1: "10", y2: "10", key: "1b3vmo" }],
        ]);
      },
      72967: (e, t, r) => {
        "use strict";
        let s;
        r.r(t),
          r.d(t, {
            default: () => h,
            generateImageMetadata: () => c,
            generateMetadata: () => d,
            generateViewport: () => u,
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
        let d = void 0,
          c = void 0,
          u = void 0,
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
                  children: c,
                  ...u
                },
                h,
              ) =>
                (0, s.createElement)(
                  "svg",
                  {
                    ref: h,
                    ...a,
                    width: n,
                    height: n,
                    stroke: r,
                    strokeWidth: l ? (24 * Number(o)) / Number(n) : o,
                    className: ["lucide", `lucide-${i(e)}`, d].join(" "),
                    ...u,
                  },
                  [
                    ...t.map(([e, t]) => (0, s.createElement)(e, t)),
                    ...(Array.isArray(c) ? c : [c]),
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
    s = t.X(0, [827, 6518, 2033, 4027, 2872, 7713, 5149, 5728, 4630], () =>
      r(24940),
    );
  module.exports = s;
})();
//# sourceMappingURL=page.js.map
