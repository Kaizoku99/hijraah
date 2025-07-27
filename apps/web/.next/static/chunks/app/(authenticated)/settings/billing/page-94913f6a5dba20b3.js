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
    s = new e.Error().stack;
  s &&
    ((e._sentryDebugIds = e._sentryDebugIds || {}),
    (e._sentryDebugIds[s] = "41e8c523-1d58-4366-8727-db442157b2b6"),
    (e._sentryDebugIdIdentifier =
      "sentry-dbid-41e8c523-1d58-4366-8727-db442157b2b6"));
} catch (e) {}
(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [6605],
  {
    7037: (e, s, t) => {
      "use strict";
      t.r(s), t.d(s, { default: () => N });
      var n = t(30602),
        a = t(92352),
        i = t(83944),
        l = t(58261),
        r = t(27922),
        d = t(33208),
        c = t(88738),
        o = t(87758),
        m = t(41960),
        h = t(85218),
        u = t(47482),
        x = t(84418),
        p = t(14985),
        j = t(20435),
        f = t(5271),
        y = t(77413),
        b = t(43213);
      let v = {
        plan: "Pro",
        status: "active",
        currentPeriodEnd: new Date(Date.now() + 2592e6).toISOString(),
        paymentMethod: {
          brand: "visa",
          last4: "4242",
          expiryMonth: 12,
          expiryYear: 2025,
        },
        invoices: [
          {
            id: "inv_123456",
            date: new Date(Date.now() - 2592e6).toISOString(),
            amount: 15,
            status: "paid",
            url: "#",
          },
          {
            id: "inv_123455",
            date: new Date(Date.now() - 5184e6).toISOString(),
            amount: 15,
            status: "paid",
            url: "#",
          },
        ],
      };
      function N() {
        let { user: e } = (0, x.useAuth)(),
          s = (0, p.Iw)(),
          { toast: t } = (0, u.d)(),
          N = (0, m.useSearchParams)().get("plan"),
          [g, w] = (0, h.useState)(null),
          [A, C] = (0, h.useState)(!0),
          [S, P] = (0, h.useState)(!1);
        (0, h.useEffect)(() => {
          (async () => {
            if (null == e ? void 0 : e.id)
              try {
                C(!0),
                  w(v),
                  N &&
                    t({
                      title: "Plan Selected",
                      description: "You've selected the ".concat(
                        N.charAt(0).toUpperCase() + N.slice(1),
                        " plan. Complete your payment details to upgrade.",
                      ),
                      variant: "default",
                    });
              } catch (e) {
                console.error("Error fetching billing information:", e),
                  t({
                    variant: "destructive",
                    title: "Error",
                    description: "Failed to fetch billing information",
                  });
              } finally {
                C(!1);
              }
          })();
        }, [e, s, t, N]);
        let D = () => {
            t({
              title: "Payment Method",
              description:
                "In a real implementation, this would open a payment form.",
            });
          },
          E = async () => {
            if (N)
              try {
                P(!0),
                  await new Promise((e) => setTimeout(e, 1500)),
                  t({
                    title: "Subscription Updated",
                    description: "You've successfully upgraded to the ".concat(
                      N.charAt(0).toUpperCase() + N.slice(1),
                      " plan.",
                    ),
                    variant: "default",
                  }),
                  g &&
                    w({ ...g, plan: N.charAt(0).toUpperCase() + N.slice(1) });
              } catch (e) {
                console.error("Error upgrading plan:", e),
                  t({
                    variant: "destructive",
                    title: "Error",
                    description: "Failed to upgrade plan",
                  });
              } finally {
                P(!1);
              }
          },
          M = (e) =>
            new Date(e).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            }),
          I = (e) => {
            switch (e) {
              case "paid":
                return (0, n.jsx)(a.A, { className: "h-4 w-4 text-green-500" });
              case "open":
                return (0, n.jsx)(i.A, {
                  className: "h-4 w-4 text-yellow-500",
                });
              default:
                return (0, n.jsx)(l.A, { className: "h-4 w-4 text-red-500" });
            }
          };
        return (0, n.jsxs)("div", {
          className: "container max-w-4xl py-8",
          children: [
            (0, n.jsxs)("div", {
              className: "flex items-center justify-between",
              children: [
                (0, n.jsx)("h1", {
                  className: "text-2xl font-bold",
                  children: "Billing & Subscription",
                }),
                (0, n.jsx)(f.$, {
                  variant: "outline",
                  onClick: () => (window.location.href = "/subscription/plans"),
                  children: "View Plans",
                }),
              ],
            }),
            (0, n.jsx)("div", {
              className: "mt-8 space-y-8",
              children: A
                ? (0, n.jsx)("div", {
                    className: "flex justify-center py-10",
                    children: (0, n.jsx)("div", {
                      className:
                        "h-6 w-6 animate-spin rounded-full border-b-2 border-gray-900",
                    }),
                  })
                : (0, n.jsxs)(n.Fragment, {
                    children: [
                      N &&
                        !(null == g ? void 0 : g.paymentMethod) &&
                        (0, n.jsxs)(j.Fc, {
                          className: "mb-8",
                          children: [
                            (0, n.jsx)(l.A, { className: "h-4 w-4" }),
                            (0, n.jsx)(j.XL, {
                              children: "Complete your subscription",
                            }),
                            (0, n.jsxs)(j.TN, {
                              children: [
                                "Add a payment method to activate your",
                                " ",
                                N.charAt(0).toUpperCase() + N.slice(1),
                                " ",
                                "subscription.",
                              ],
                            }),
                          ],
                        }),
                      (0, n.jsxs)(y.Zp, {
                        children: [
                          (0, n.jsx)(y.aR, {
                            children: (0, n.jsxs)(y.ZB, {
                              className: "flex items-center",
                              children: [
                                (0, n.jsx)(r.A, {
                                  className: "mr-2 h-5 w-5 text-blue-500",
                                }),
                                "Current Plan",
                              ],
                            }),
                          }),
                          (0, n.jsx)(y.Wu, {
                            children: (0, n.jsx)("div", {
                              className: "space-y-4",
                              children: (0, n.jsxs)("div", {
                                className: "flex items-center justify-between",
                                children: [
                                  (0, n.jsxs)("div", {
                                    children: [
                                      (0, n.jsxs)("h3", {
                                        className: "text-lg font-medium",
                                        children: [
                                          (null == g ? void 0 : g.plan) ||
                                            "Free",
                                          " Plan",
                                        ],
                                      }),
                                      (0, n.jsx)("p", {
                                        className:
                                          "text-sm text-muted-foreground",
                                        children:
                                          (null == g ? void 0 : g.status) ===
                                          "active"
                                            ? "Renews on ".concat(
                                                M(g.currentPeriodEnd),
                                              )
                                            : "No active subscription",
                                      }),
                                    ],
                                  }),
                                  (null == g ? void 0 : g.status) ===
                                    "active" &&
                                    (0, n.jsx)("span", {
                                      className:
                                        "rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-800",
                                      children: "Active",
                                    }),
                                ],
                              }),
                            }),
                          }),
                          (0, n.jsx)(y.wL, {
                            children: (0, n.jsx)(f.$, {
                              onClick: () =>
                                (window.location.href = "/subscription/plans"),
                              variant: "outline",
                              className: "w-full",
                              children:
                                (null == g ? void 0 : g.plan) === "Free"
                                  ? "Upgrade Plan"
                                  : "Change Plan",
                            }),
                          }),
                        ],
                      }),
                      (0, n.jsxs)(y.Zp, {
                        children: [
                          (0, n.jsx)(y.aR, {
                            children: (0, n.jsxs)(y.ZB, {
                              className: "flex items-center",
                              children: [
                                (0, n.jsx)(d.A, {
                                  className: "mr-2 h-5 w-5 text-blue-500",
                                }),
                                "Payment Method",
                              ],
                            }),
                          }),
                          (0, n.jsx)(y.Wu, {
                            children: (null == g ? void 0 : g.paymentMethod)
                              ? (0, n.jsx)("div", {
                                  className: "space-y-4",
                                  children: (0, n.jsx)("div", {
                                    className:
                                      "rounded-lg border border-border p-4",
                                    children: (0, n.jsxs)("div", {
                                      className:
                                        "flex items-center justify-between",
                                      children: [
                                        (0, n.jsxs)("div", {
                                          children: [
                                            (0, n.jsxs)("p", {
                                              className:
                                                "font-medium capitalize",
                                              children: [
                                                g.paymentMethod.brand,
                                                " ••••",
                                                " ",
                                                g.paymentMethod.last4,
                                              ],
                                            }),
                                            (0, n.jsxs)("p", {
                                              className:
                                                "text-sm text-muted-foreground",
                                              children: [
                                                "Expires ",
                                                g.paymentMethod.expiryMonth,
                                                "/",
                                                g.paymentMethod.expiryYear,
                                              ],
                                            }),
                                          ],
                                        }),
                                        (0, n.jsx)(f.$, {
                                          variant: "ghost",
                                          size: "sm",
                                          children: "Edit",
                                        }),
                                      ],
                                    }),
                                  }),
                                })
                              : (0, n.jsxs)("div", {
                                  className:
                                    "rounded-lg border border-dashed border-border p-6 text-center",
                                  children: [
                                    (0, n.jsx)("div", {
                                      className:
                                        "mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-muted",
                                      children: (0, n.jsx)(d.A, {
                                        className: "h-6 w-6",
                                      }),
                                    }),
                                    (0, n.jsx)("h3", {
                                      className: "mb-1 text-lg font-medium",
                                      children: "No payment method",
                                    }),
                                    (0, n.jsx)("p", {
                                      className:
                                        "mb-4 text-sm text-muted-foreground",
                                      children:
                                        "Add a payment method to subscribe to a paid plan",
                                    }),
                                    N
                                      ? (0, n.jsx)(f.$, {
                                          onClick: D,
                                          className: "mx-auto",
                                          children: "Add payment method",
                                        })
                                      : (0, n.jsx)(f.$, {
                                          onClick: D,
                                          variant: "outline",
                                          className: "mx-auto",
                                          children: "Add payment method",
                                        }),
                                  ],
                                }),
                          }),
                        ],
                      }),
                      N &&
                        !(null == g ? void 0 : g.paymentMethod) &&
                        (0, n.jsx)("div", {
                          className: "mt-6 flex justify-end",
                          children: (0, n.jsx)(f.$, {
                            onClick: E,
                            disabled:
                              S || !(null == g ? void 0 : g.paymentMethod),
                            className: "px-8",
                            children: S ? "Processing..." : "Complete Upgrade",
                          }),
                        }),
                      (0, n.jsxs)(y.Zp, {
                        children: [
                          (0, n.jsx)(y.aR, {
                            children: (0, n.jsxs)(y.ZB, {
                              className: "flex items-center",
                              children: [
                                (0, n.jsx)(c.A, {
                                  className: "mr-2 h-5 w-5 text-blue-500",
                                }),
                                "Billing History",
                              ],
                            }),
                          }),
                          (0, n.jsx)(y.Wu, {
                            children:
                              (null == g ? void 0 : g.invoices) &&
                              g.invoices.length > 0
                                ? (0, n.jsxs)(b.XI, {
                                    children: [
                                      (0, n.jsx)(b.A0, {
                                        children: (0, n.jsxs)(b.Hj, {
                                          children: [
                                            (0, n.jsx)(b.nd, {
                                              children: "Date",
                                            }),
                                            (0, n.jsx)(b.nd, {
                                              children: "Invoice",
                                            }),
                                            (0, n.jsx)(b.nd, {
                                              children: "Amount",
                                            }),
                                            (0, n.jsx)(b.nd, {
                                              children: "Status",
                                            }),
                                            (0, n.jsx)(b.nd, {
                                              className: "w-10",
                                            }),
                                          ],
                                        }),
                                      }),
                                      (0, n.jsx)(b.BF, {
                                        children: g.invoices.map((e) =>
                                          (0, n.jsxs)(
                                            b.Hj,
                                            {
                                              children: [
                                                (0, n.jsx)(b.nA, {
                                                  children: M(e.date),
                                                }),
                                                (0, n.jsx)(b.nA, {
                                                  children: e.id,
                                                }),
                                                (0, n.jsxs)(b.nA, {
                                                  children: [
                                                    "$",
                                                    e.amount.toFixed(2),
                                                  ],
                                                }),
                                                (0, n.jsxs)(b.nA, {
                                                  className:
                                                    "flex items-center gap-1",
                                                  children: [
                                                    I(e.status),
                                                    (0, n.jsx)("span", {
                                                      className: "capitalize",
                                                      children: e.status,
                                                    }),
                                                  ],
                                                }),
                                                (0, n.jsx)(b.nA, {
                                                  children:
                                                    e.url &&
                                                    (0, n.jsx)(f.$, {
                                                      variant: "ghost",
                                                      size: "sm",
                                                      className: "h-8 w-8 p-0",
                                                      children: (0, n.jsx)(
                                                        o.A,
                                                        {
                                                          className: "h-4 w-4",
                                                        },
                                                      ),
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
                                : (0, n.jsx)("p", {
                                    className:
                                      "text-center text-muted-foreground py-8",
                                    children: "No billing history available",
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
    },
    43012: (e, s, t) => {
      Promise.resolve().then(t.bind(t, 7037));
    },
  },
  (e) => {
    var s = (s) => e((e.s = s));
    e.O(0, [6593, 4223, 3209, 7358], () => s(43012)), (_N_E = e.O());
  },
]);
