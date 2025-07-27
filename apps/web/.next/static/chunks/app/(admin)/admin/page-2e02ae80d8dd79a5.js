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
    (e._sentryDebugIds[s] = "beac8523-8780-42db-9c2a-3ad3e045d1d9"),
    (e._sentryDebugIdIdentifier =
      "sentry-dbid-beac8523-8780-42db-9c2a-3ad3e045d1d9"));
} catch (e) {}
(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [5867],
  {
    2415: (e, s, t) => {
      "use strict";
      t.r(s), t.d(s, { default: () => j });
      var r = t(30602),
        a = t(74583),
        n = t(83944),
        c = t(91479),
        d = t(33814),
        i = t(71857),
        o = t(45783),
        l = t(49911),
        x = t(58261),
        m = t(78155),
        u = t(97687),
        h = t.n(u),
        g = t(41960),
        f = t(85218),
        p = t(77413),
        b = t(47482);
      function j() {
        let { toast: e } = (0, b.d)();
        (0, g.useRouter)();
        let [s, t] = (0, f.useState)({
          documentCount: 0,
          userCount: 0,
          activeSources: 0,
          scrapeCount: 0,
          recentSuccessRate: 0,
          averageTrustScore: 0,
        });
        (0, f.useEffect)(() => {
          (async () => {
            try {
              t({
                documentCount: 158,
                userCount: 42,
                activeSources: 12,
                scrapeCount: 347,
                recentSuccessRate: 94.5,
                averageTrustScore: 78.2,
              });
            } catch (s) {
              console.error("Error fetching admin stats:", s),
                e({
                  title: "Error",
                  description: "Failed to load admin dashboard data",
                  variant: "destructive",
                });
            }
          })();
        }, [e]);
        let u = [
          {
            title: "Scraping Sources",
            description:
              "Manage web scraping sources for automated content collection",
            icon: (0, r.jsx)(a.A, { className: "h-6 w-6" }),
            href: "/admin/scraping-sources",
            color: "bg-blue-100 dark:bg-blue-900",
            textColor: "text-blue-700 dark:text-blue-300",
          },
          {
            title: "Scraping Logs",
            description:
              "Monitor scheduled scraping jobs and view scraping history",
            icon: (0, r.jsx)(n.A, { className: "h-6 w-6" }),
            href: "/admin/scraping-logs",
            color: "bg-indigo-100 dark:bg-indigo-900",
            textColor: "text-indigo-700 dark:text-indigo-300",
          },
          {
            title: "System Settings",
            description:
              "Configure global application settings and preferences",
            icon: (0, r.jsx)(c.A, { className: "h-6 w-6" }),
            href: "/admin/settings",
            color: "bg-purple-100 dark:bg-purple-900",
            textColor: "text-purple-700 dark:text-purple-300",
          },
          {
            title: "User Management",
            description: "Add, edit, and manage user accounts and permissions",
            icon: (0, r.jsx)(d.A, { className: "h-6 w-6" }),
            href: "/admin/users",
            color: "bg-green-100 dark:bg-green-900",
            textColor: "text-green-700 dark:text-green-300",
          },
          {
            title: "Document Verification",
            description: "Review and verify user-submitted documents and forms",
            icon: (0, r.jsx)(i.A, { className: "h-6 w-6" }),
            href: "/admin/verification",
            color: "bg-amber-100 dark:bg-amber-900",
            textColor: "text-amber-700 dark:text-amber-300",
          },
          {
            title: "Database Management",
            description: "Oversee database operations and content moderation",
            icon: (0, r.jsx)(o.A, { className: "h-6 w-6" }),
            href: "/admin/database",
            color: "bg-red-100 dark:bg-red-900",
            textColor: "text-red-700 dark:text-red-300",
          },
          {
            title: "System Logs",
            description:
              "Monitor system activity, errors, and performance metrics",
            icon: (0, r.jsx)(l.A, { className: "h-6 w-6" }),
            href: "/admin/logs",
            color: "bg-cyan-100 dark:bg-cyan-900",
            textColor: "text-cyan-700 dark:text-cyan-300",
          },
        ];
        return (0, r.jsxs)("div", {
          className: "container mx-auto py-8",
          children: [
            (0, r.jsxs)("div", {
              className: "mb-8",
              children: [
                (0, r.jsx)("h1", {
                  className: "text-3xl font-bold mb-2",
                  children: "Admin Dashboard",
                }),
                (0, r.jsx)("p", {
                  className: "text-muted-foreground",
                  children:
                    "Manage and monitor the Hijraah immigration platform.",
                }),
              ],
            }),
            (0, r.jsxs)("div", {
              className:
                "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8",
              children: [
                (0, r.jsxs)(p.Zp, {
                  children: [
                    (0, r.jsxs)(p.aR, {
                      className:
                        "flex flex-row items-center justify-between pb-2",
                      children: [
                        (0, r.jsx)(p.ZB, {
                          className: "text-sm font-medium",
                          children: "Total Documents",
                        }),
                        (0, r.jsx)(i.A, {
                          className: "h-4 w-4 text-muted-foreground",
                        }),
                      ],
                    }),
                    (0, r.jsxs)(p.Wu, {
                      children: [
                        (0, r.jsx)("div", {
                          className: "text-2xl font-bold",
                          children: s.documentCount,
                        }),
                        (0, r.jsx)("p", {
                          className: "text-xs text-muted-foreground",
                          children: "Immigration documents processed",
                        }),
                      ],
                    }),
                  ],
                }),
                (0, r.jsxs)(p.Zp, {
                  children: [
                    (0, r.jsxs)(p.aR, {
                      className:
                        "flex flex-row items-center justify-between pb-2",
                      children: [
                        (0, r.jsx)(p.ZB, {
                          className: "text-sm font-medium",
                          children: "Active Users",
                        }),
                        (0, r.jsx)(d.A, {
                          className: "h-4 w-4 text-muted-foreground",
                        }),
                      ],
                    }),
                    (0, r.jsxs)(p.Wu, {
                      children: [
                        (0, r.jsx)("div", {
                          className: "text-2xl font-bold",
                          children: s.userCount,
                        }),
                        (0, r.jsx)("p", {
                          className: "text-xs text-muted-foreground",
                          children: "Users registered on the platform",
                        }),
                      ],
                    }),
                  ],
                }),
                (0, r.jsxs)(p.Zp, {
                  children: [
                    (0, r.jsxs)(p.aR, {
                      className:
                        "flex flex-row items-center justify-between pb-2",
                      children: [
                        (0, r.jsx)(p.ZB, {
                          className: "text-sm font-medium",
                          children: "Scraping Sources",
                        }),
                        (0, r.jsx)(a.A, {
                          className: "h-4 w-4 text-muted-foreground",
                        }),
                      ],
                    }),
                    (0, r.jsxs)(p.Wu, {
                      children: [
                        (0, r.jsx)("div", {
                          className: "text-2xl font-bold",
                          children: s.activeSources,
                        }),
                        (0, r.jsx)("p", {
                          className: "text-xs text-muted-foreground",
                          children: "Active web scraping sources",
                        }),
                      ],
                    }),
                  ],
                }),
                (0, r.jsxs)(p.Zp, {
                  children: [
                    (0, r.jsxs)(p.aR, {
                      className:
                        "flex flex-row items-center justify-between pb-2",
                      children: [
                        (0, r.jsx)(p.ZB, {
                          className: "text-sm font-medium",
                          children: "Total Scrapes",
                        }),
                        (0, r.jsx)(n.A, {
                          className: "h-4 w-4 text-muted-foreground",
                        }),
                      ],
                    }),
                    (0, r.jsxs)(p.Wu, {
                      children: [
                        (0, r.jsx)("div", {
                          className: "text-2xl font-bold",
                          children: s.scrapeCount,
                        }),
                        (0, r.jsx)("p", {
                          className: "text-xs text-muted-foreground",
                          children: "Web scraping operations performed",
                        }),
                      ],
                    }),
                  ],
                }),
                (0, r.jsxs)(p.Zp, {
                  children: [
                    (0, r.jsxs)(p.aR, {
                      className:
                        "flex flex-row items-center justify-between pb-2",
                      children: [
                        (0, r.jsx)(p.ZB, {
                          className: "text-sm font-medium",
                          children: "Scrape Success Rate",
                        }),
                        (0, r.jsx)(x.A, {
                          className: "h-4 w-4 text-muted-foreground",
                        }),
                      ],
                    }),
                    (0, r.jsxs)(p.Wu, {
                      children: [
                        (0, r.jsxs)("div", {
                          className: "text-2xl font-bold",
                          children: [s.recentSuccessRate, "%"],
                        }),
                        (0, r.jsx)("p", {
                          className: "text-xs text-muted-foreground",
                          children: "Last 30 days success rate",
                        }),
                      ],
                    }),
                  ],
                }),
                (0, r.jsxs)(p.Zp, {
                  children: [
                    (0, r.jsxs)(p.aR, {
                      className:
                        "flex flex-row items-center justify-between pb-2",
                      children: [
                        (0, r.jsx)(p.ZB, {
                          className: "text-sm font-medium",
                          children: "Average Trust Score",
                        }),
                        (0, r.jsx)(m.A, {
                          className: "h-4 w-4 text-muted-foreground",
                        }),
                      ],
                    }),
                    (0, r.jsxs)(p.Wu, {
                      children: [
                        (0, r.jsx)("div", {
                          className: "text-2xl font-bold",
                          children: s.averageTrustScore,
                        }),
                        (0, r.jsx)("p", {
                          className: "text-xs text-muted-foreground",
                          children: "Average source trust rating",
                        }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
            (0, r.jsx)("h2", {
              className: "text-2xl font-bold mb-4",
              children: "Admin Features",
            }),
            (0, r.jsx)("div", {
              className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4",
              children: u.map((e) =>
                (0, r.jsx)(
                  h(),
                  {
                    href: e.href,
                    legacyBehavior: !0,
                    children: (0, r.jsx)(p.Zp, {
                      className:
                        "h-full hover:bg-muted/50 transition-colors cursor-pointer",
                      children: (0, r.jsxs)(p.aR, {
                        children: [
                          (0, r.jsx)("div", {
                            className: "rounded-full p-2 w-fit ".concat(
                              e.color,
                            ),
                            children: (0, r.jsx)("div", {
                              className: e.textColor,
                              children: e.icon,
                            }),
                          }),
                          (0, r.jsx)(p.ZB, {
                            className: "mt-4",
                            children: e.title,
                          }),
                          (0, r.jsx)(p.BT, { children: e.description }),
                        ],
                      }),
                    }),
                  },
                  e.title,
                ),
              ),
            }),
          ],
        });
      }
    },
    99745: (e, s, t) => {
      Promise.resolve().then(t.bind(t, 2415));
    },
  },
  (e) => {
    var s = (s) => e((e.s = s));
    e.O(0, [6593, 4223, 3209, 7358], () => s(99745)), (_N_E = e.O());
  },
]);
