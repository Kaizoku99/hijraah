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
    (e._sentryDebugIds[s] = "2fa4a1eb-b556-4bfb-ab3b-79825d3d8fc4"),
    (e._sentryDebugIdIdentifier =
      "sentry-dbid-2fa4a1eb-b556-4bfb-ab3b-79825d3d8fc4"));
} catch (e) {}
(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [4621],
  {
    25623: (e, s, t) => {
      Promise.resolve().then(t.bind(t, 36339));
    },
    36339: (e, s, t) => {
      "use strict";
      t.r(s), t.d(s, { default: () => f });
      var a = t(30602),
        l = t(41960),
        r = t(85218),
        n = t(3070),
        i = t(5271),
        d = t(77413),
        o = t(86697);
      let c = [
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
      function u(e) {
        let { currentPlan: s, onSelectPlan: t } = e,
          [l, u] = (0, r.useState)("monthly");
        return (0, a.jsxs)("div", {
          className: "space-y-6",
          children: [
            (0, a.jsx)("div", {
              className: "mx-auto flex w-fit flex-col items-center space-y-4",
              children: (0, a.jsx)(o.Tabs, {
                defaultValue: "monthly",
                onValueChange: (e) => u(e),
                children: (0, a.jsxs)(o.TabsList, {
                  children: [
                    (0, a.jsx)(o.TabsTrigger, {
                      value: "monthly",
                      children: "Monthly Billing",
                    }),
                    (0, a.jsx)(o.TabsTrigger, {
                      value: "yearly",
                      children: "Yearly Billing (Save 20%)",
                    }),
                  ],
                }),
              }),
            }),
            (0, a.jsx)("div", {
              className: "grid gap-6 md:grid-cols-3",
              children: c.map((e) =>
                (0, a.jsxs)(
                  d.Zp,
                  {
                    className: "flex flex-col ".concat(
                      e.isPopular ? "border-blue-500 shadow-lg" : "",
                      " relative",
                    ),
                    children: [
                      e.isPopular &&
                        (0, a.jsx)("div", {
                          className:
                            "absolute -top-4 left-0 right-0 mx-auto w-fit rounded-full bg-blue-500 px-3 py-1 text-xs font-medium text-white",
                          children: "Most Popular",
                        }),
                      (0, a.jsxs)(d.aR, {
                        children: [
                          (0, a.jsx)(d.ZB, { children: e.name }),
                          (0, a.jsx)(d.BT, { children: e.description }),
                          (0, a.jsxs)("div", {
                            className: "mt-2",
                            children: [
                              (0, a.jsxs)("span", {
                                className: "text-3xl font-bold",
                                children: [
                                  "$",
                                  "monthly" === l
                                    ? e.price.monthly
                                    : Math.round(e.price.yearly / 12),
                                ],
                              }),
                              (0, a.jsx)("span", {
                                className: "text-muted-foreground",
                                children: "/month",
                              }),
                              "yearly" === l &&
                                (0, a.jsxs)("div", {
                                  className:
                                    "mt-1 text-sm text-muted-foreground",
                                  children: [
                                    "Billed yearly ($",
                                    e.price.yearly,
                                    ")",
                                  ],
                                }),
                            ],
                          }),
                        ],
                      }),
                      (0, a.jsx)(d.Wu, {
                        className: "flex-1",
                        children: (0, a.jsx)("ul", {
                          className: "space-y-2",
                          children: e.features.map((e, s) =>
                            (0, a.jsxs)(
                              "li",
                              {
                                className: "flex items-center",
                                children: [
                                  (0, a.jsx)(n.A, {
                                    className: "mr-2 h-4 w-4 text-green-500",
                                  }),
                                  (0, a.jsx)("span", { children: e }),
                                ],
                              },
                              s,
                            ),
                          ),
                        }),
                      }),
                      (0, a.jsx)(d.wL, {
                        children: (0, a.jsx)(i.$, {
                          variant: s === e.id ? "outline" : "default",
                          className: "w-full "
                            .concat(
                              s === e.id
                                ? "border-green-500 text-green-600"
                                : "",
                              " ",
                            )
                            .concat(
                              e.isPopular && s !== e.id
                                ? "bg-blue-500 hover:bg-blue-600"
                                : "",
                            ),
                          onClick: () => t(e.id),
                          disabled: s === e.id,
                          children: s === e.id ? "Current Plan" : "Select Plan",
                        }),
                      }),
                    ],
                  },
                  e.id,
                ),
              ),
            }),
          ],
        });
      }
      var x = t(47482),
        m = t(84418),
        h = t(14985);
      function f() {
        let e = (0, l.useRouter)(),
          { user: s } = (0, m.useAuth)(),
          t = (0, h.Iw)(),
          { toast: n } = (0, x.d)(),
          [o, c] = (0, r.useState)(null),
          [f, p] = (0, r.useState)(!0);
        (0, r.useEffect)(() => {
          (async () => {
            if (null == s ? void 0 : s.id)
              try {
                p(!0);
                let { data: e, error: a } = await t
                  .from("subscriptions")
                  .select("*")
                  .eq("user_id", s.id)
                  .single();
                if (a && "PGRST116" !== a.code) throw a;
                c((null == e ? void 0 : e.plan_id) || null);
              } catch (e) {
                console.error("Error fetching subscription:", e),
                  n({
                    variant: "destructive",
                    title: "Error",
                    description: "Failed to fetch subscription information",
                  });
              } finally {
                p(!1);
              }
          })();
        }, [s, t, n]);
        let y = async (t) => {
          if (!s) return void e.push("/auth/login");
          e.push("/settings/billing?plan=".concat(t));
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
              f
                ? (0, a.jsx)("div", {
                    className: "flex justify-center py-10",
                    children: (0, a.jsx)("div", {
                      className:
                        "h-6 w-6 animate-spin rounded-full border-b-2 border-gray-900",
                    }),
                  })
                : (0, a.jsx)(u, { currentPlan: o, onSelectPlan: y }),
              (0, a.jsx)("div", {
                className: "mx-auto max-w-2xl text-center",
                children: (0, a.jsxs)(d.Zp, {
                  children: [
                    (0, a.jsxs)(d.aR, {
                      children: [
                        (0, a.jsx)(d.ZB, {
                          className: "text-lg",
                          children: "Need a custom plan?",
                        }),
                        (0, a.jsx)(d.BT, {
                          children:
                            "Contact our sales team for enterprise options and custom solutions",
                        }),
                      ],
                    }),
                    (0, a.jsx)(d.wL, {
                      className: "flex justify-center",
                      children: (0, a.jsx)(i.$, {
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
    },
  },
  (e) => {
    var s = (s) => e((e.s = s));
    e.O(0, [6593, 4223, 3209, 7358], () => s(25623)), (_N_E = e.O());
  },
]);
