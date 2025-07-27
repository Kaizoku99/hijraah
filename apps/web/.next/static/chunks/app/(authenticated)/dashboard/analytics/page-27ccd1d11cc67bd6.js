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
    (e._sentryDebugIds[s] = "a9f834a6-5447-4db8-9331-f74c1538f8e5"),
    (e._sentryDebugIdIdentifier =
      "sentry-dbid-a9f834a6-5447-4db8-9331-f74c1538f8e5"));
} catch (e) {}
(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [9095],
  {
    40418: (e, s, l) => {
      Promise.resolve().then(l.bind(l, 72747));
    },
    72747: (e, s, l) => {
      "use strict";
      l.r(s), l.d(s, { default: () => T });
      var a = l(30602),
        t = l(85218),
        d = l(36755),
        c = l(51144),
        r = l(96267),
        n = l(95704),
        i = l(45549),
        o = l(89104),
        x = l(43252),
        h = l(2212),
        m = l(20966),
        u = l(81165),
        j = l(11558),
        f = l(84418),
        g = l(8053),
        b = l(68886),
        v = l(15140),
        N = l(5271),
        p = l(77413),
        y = l(61159),
        w = l(88542),
        C = l(86697),
        E = l(47482);
      let D = [
        "#0088FE",
        "#00C49F",
        "#FFBB28",
        "#FF8042",
        "#8884D8",
        "#D88884",
      ];
      function T() {
        let [e, s] = (0, t.useState)([]),
          [l, T] = (0, t.useState)([]),
          [F, _] = (0, t.useState)(!0),
          [k, A] = (0, t.useState)("last30days"),
          { user: R } = (0, f.useAuth)(),
          { toast: S } = (0, E.d)(),
          K = (0, t.useCallback)(async () => {
            if (R)
              try {
                _(!0);
                let [e, l] = await Promise.all([
                    g.pC.getCases(),
                    b.wP.getDocuments(),
                  ]),
                  a = e.filter((e) => e.user_id === R.id),
                  t = l.filter((e) => e.user_id === R.id);
                s(a), T(t);
              } catch (e) {
                S({
                  variant: "destructive",
                  title: "Error",
                  description: "Failed to load analytics data",
                });
              } finally {
                _(!1);
              }
          }, [R, S]);
        (0, t.useEffect)(() => {
          K();
        }, [K, k]);
        let L = () => {
            let s = {};
            return (
              e.forEach((e) => {
                let l = e.case_type || "other";
                s[l] = (s[l] || 0) + 1;
              }),
              Object.entries(s).map((e) => {
                let [s, l] = e;
                return { name: s, value: l };
              })
            );
          },
          O = () => {
            let s = {};
            return (
              e.forEach((e) => {
                let l = e.status || "unknown";
                s[l] = (s[l] || 0) + 1;
              }),
              Object.entries(s).map((e) => {
                let [s, l] = e;
                return { name: s, value: l };
              })
            );
          },
          Z = () => {
            let e = {};
            return (
              l.forEach((s) => {
                let l = s.status || "unknown";
                e[l] = (e[l] || 0) + 1;
              }),
              Object.entries(e).map((e) => {
                let [s, l] = e;
                return { name: s, value: l };
              })
            );
          };
        return F
          ? (0, a.jsxs)("div", {
              className: "flex flex-col h-screen",
              children: [
                (0, a.jsx)("div", {
                  className:
                    "flex items-center justify-between px-4 py-2 border-b",
                  children: (0, a.jsx)(w.E, { className: "h-6 w-48" }),
                }),
                (0, a.jsxs)("div", {
                  className: "flex flex-1 overflow-hidden",
                  children: [
                    (0, a.jsx)("div", {
                      className: "w-64 h-screen border-r",
                      children: (0, a.jsx)(w.E, {
                        className: "h-screen w-full",
                      }),
                    }),
                    (0, a.jsx)("div", {
                      className: "flex-1 overflow-auto",
                      children: (0, a.jsxs)("div", {
                        className: "container mx-auto p-6",
                        children: [
                          (0, a.jsxs)("div", {
                            className:
                              "grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6",
                            children: [
                              (0, a.jsx)(w.E, {
                                className: "h-24 w-full rounded-lg",
                              }),
                              (0, a.jsx)(w.E, {
                                className: "h-24 w-full rounded-lg",
                              }),
                              (0, a.jsx)(w.E, {
                                className: "h-24 w-full rounded-lg",
                              }),
                              (0, a.jsx)(w.E, {
                                className: "h-24 w-full rounded-lg",
                              }),
                            ],
                          }),
                          (0, a.jsx)(w.E, {
                            className: "h-80 w-full rounded-lg mb-6",
                          }),
                          (0, a.jsxs)("div", {
                            className: "grid gap-4 md:grid-cols-2",
                            children: [
                              (0, a.jsx)(w.E, {
                                className: "h-60 w-full rounded-lg",
                              }),
                              (0, a.jsx)(w.E, {
                                className: "h-60 w-full rounded-lg",
                              }),
                            ],
                          }),
                        ],
                      }),
                    }),
                  ],
                }),
              ],
            })
          : (0, a.jsxs)("div", {
              className: "flex flex-col h-screen",
              children: [
                (0, a.jsx)("div", {
                  className:
                    "flex items-center justify-between px-4 py-2 border-b",
                  children: (0, a.jsx)(v.Qp, {
                    children: (0, a.jsxs)(v.AB, {
                      children: [
                        (0, a.jsx)(v.J5, {
                          children: (0, a.jsx)(v.w1, {
                            href: "/",
                            children: "Home",
                          }),
                        }),
                        (0, a.jsx)(v.tH, {}),
                        (0, a.jsx)(v.J5, {
                          children: (0, a.jsx)(v.w1, {
                            href: "/dashboard",
                            children: "Dashboard",
                          }),
                        }),
                        (0, a.jsx)(v.tH, {}),
                        (0, a.jsx)(v.J5, {
                          children: (0, a.jsx)(v.tJ, { children: "Analytics" }),
                        }),
                      ],
                    }),
                  }),
                }),
                (0, a.jsxs)("div", {
                  className: "flex flex-1 overflow-hidden",
                  children: [
                    (0, a.jsx)(j.AppSidebar, { className: "h-screen" }),
                    (0, a.jsx)("div", {
                      className: "flex-1 overflow-auto",
                      children: (0, a.jsxs)("div", {
                        className: "container mx-auto p-6",
                        children: [
                          (0, a.jsxs)("div", {
                            className: "flex justify-between items-center mb-6",
                            children: [
                              (0, a.jsx)("h1", {
                                className: "text-2xl font-bold",
                                children: "Analytics Dashboard",
                              }),
                              (0, a.jsxs)("div", {
                                className: "flex gap-4",
                                children: [
                                  (0, a.jsxs)(y.l6, {
                                    value: k,
                                    onValueChange: A,
                                    children: [
                                      (0, a.jsx)(y.bq, {
                                        className: "w-[180px]",
                                        children: (0, a.jsx)(y.yv, {
                                          placeholder: "Select time range",
                                        }),
                                      }),
                                      (0, a.jsxs)(y.gC, {
                                        children: [
                                          (0, a.jsx)(y.eb, {
                                            value: "last7days",
                                            children: "Last 7 days",
                                          }),
                                          (0, a.jsx)(y.eb, {
                                            value: "last30days",
                                            children: "Last 30 days",
                                          }),
                                          (0, a.jsx)(y.eb, {
                                            value: "last90days",
                                            children: "Last 90 days",
                                          }),
                                          (0, a.jsx)(y.eb, {
                                            value: "lastYear",
                                            children: "Last year",
                                          }),
                                          (0, a.jsx)(y.eb, {
                                            value: "allTime",
                                            children: "All time",
                                          }),
                                        ],
                                      }),
                                    ],
                                  }),
                                  (0, a.jsx)(N.$, {
                                    onClick: () => {
                                      S({
                                        title: "Report Downloaded",
                                        description:
                                          "Your analytics report has been downloaded.",
                                      });
                                    },
                                    children: "Download Report",
                                  }),
                                ],
                              }),
                            ],
                          }),
                          (0, a.jsxs)("div", {
                            className:
                              "grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6",
                            children: [
                              (0, a.jsxs)(p.Zp, {
                                children: [
                                  (0, a.jsx)(p.aR, {
                                    className: "pb-2",
                                    children: (0, a.jsx)(p.ZB, {
                                      className: "text-sm font-medium",
                                      children: "Total Cases",
                                    }),
                                  }),
                                  (0, a.jsxs)(p.Wu, {
                                    children: [
                                      (0, a.jsx)("div", {
                                        className: "text-2xl font-bold",
                                        children: e.length,
                                      }),
                                      (0, a.jsx)("p", {
                                        className:
                                          "text-xs text-muted-foreground",
                                        children:
                                          e.length > 0
                                            ? "+".concat(
                                                Math.floor(0.1 * e.length),
                                                " from last month",
                                              )
                                            : "No cases yet",
                                      }),
                                    ],
                                  }),
                                ],
                              }),
                              (0, a.jsxs)(p.Zp, {
                                children: [
                                  (0, a.jsx)(p.aR, {
                                    className: "pb-2",
                                    children: (0, a.jsx)(p.ZB, {
                                      className: "text-sm font-medium",
                                      children: "Active Cases",
                                    }),
                                  }),
                                  (0, a.jsxs)(p.Wu, {
                                    children: [
                                      (0, a.jsx)("div", {
                                        className: "text-2xl font-bold",
                                        children: e.filter(
                                          (e) => "active" === e.status,
                                        ).length,
                                      }),
                                      (0, a.jsx)("p", {
                                        className:
                                          "text-xs text-muted-foreground",
                                        children:
                                          e.filter((e) => "active" === e.status)
                                            .length > 0
                                            ? "".concat(
                                                Math.floor(
                                                  (e.filter(
                                                    (e) =>
                                                      "active" === e.status,
                                                  ).length /
                                                    e.length) *
                                                    100,
                                                ),
                                                "% of total",
                                              )
                                            : "No active cases",
                                      }),
                                    ],
                                  }),
                                ],
                              }),
                              (0, a.jsxs)(p.Zp, {
                                children: [
                                  (0, a.jsx)(p.aR, {
                                    className: "pb-2",
                                    children: (0, a.jsx)(p.ZB, {
                                      className: "text-sm font-medium",
                                      children: "Completed Cases",
                                    }),
                                  }),
                                  (0, a.jsxs)(p.Wu, {
                                    children: [
                                      (0, a.jsx)("div", {
                                        className: "text-2xl font-bold",
                                        children: e.filter(
                                          (e) => "completed" === e.status,
                                        ).length,
                                      }),
                                      (0, a.jsx)("p", {
                                        className:
                                          "text-xs text-muted-foreground",
                                        children:
                                          e.filter(
                                            (e) => "completed" === e.status,
                                          ).length > 0
                                            ? "".concat(
                                                Math.floor(
                                                  (e.filter(
                                                    (e) =>
                                                      "completed" === e.status,
                                                  ).length /
                                                    e.length) *
                                                    100,
                                                ),
                                                "% of total",
                                              )
                                            : "No completed cases",
                                      }),
                                    ],
                                  }),
                                ],
                              }),
                              (0, a.jsxs)(p.Zp, {
                                children: [
                                  (0, a.jsx)(p.aR, {
                                    className: "pb-2",
                                    children: (0, a.jsx)(p.ZB, {
                                      className: "text-sm font-medium",
                                      children: "Documents",
                                    }),
                                  }),
                                  (0, a.jsxs)(p.Wu, {
                                    children: [
                                      (0, a.jsx)("div", {
                                        className: "text-2xl font-bold",
                                        children: l.length,
                                      }),
                                      (0, a.jsx)("p", {
                                        className:
                                          "text-xs text-muted-foreground",
                                        children:
                                          l.length > 0
                                            ? "".concat(
                                                Math.floor(
                                                  l.length / (e.length || 1),
                                                ),
                                                " per case avg.",
                                              )
                                            : "No documents",
                                      }),
                                    ],
                                  }),
                                ],
                              }),
                            ],
                          }),
                          (0, a.jsxs)(C.Tabs, {
                            defaultValue: "overview",
                            className: "mb-6",
                            children: [
                              (0, a.jsxs)(C.TabsList, {
                                children: [
                                  (0, a.jsx)(C.TabsTrigger, {
                                    value: "overview",
                                    children: "Overview",
                                  }),
                                  (0, a.jsx)(C.TabsTrigger, {
                                    value: "cases",
                                    children: "Cases",
                                  }),
                                  (0, a.jsx)(C.TabsTrigger, {
                                    value: "documents",
                                    children: "Documents",
                                  }),
                                ],
                              }),
                              (0, a.jsxs)(C.TabsContent, {
                                value: "overview",
                                className: "p-4 border rounded-md",
                                children: [
                                  (0, a.jsx)("h2", {
                                    className: "text-lg font-medium mb-4",
                                    children: "Case Creation Over Time",
                                  }),
                                  (0, a.jsx)("div", {
                                    className: "w-full",
                                    style: { height: "300px" },
                                    children: (0, a.jsxs)(d.E, {
                                      width: 800,
                                      height: 300,
                                      data: (() => {
                                        let s = [
                                            "Jan",
                                            "Feb",
                                            "Mar",
                                            "Apr",
                                            "May",
                                            "Jun",
                                            "Jul",
                                            "Aug",
                                            "Sep",
                                            "Oct",
                                            "Nov",
                                            "Dec",
                                          ],
                                          l = Array(12)
                                            .fill(0)
                                            .map((e, l) => ({
                                              name: s[l],
                                              count: 0,
                                            }));
                                        return (
                                          e.forEach((e) => {
                                            let s = new Date(
                                              e.created_at,
                                            ).getMonth();
                                            l[s].count += 1;
                                          }),
                                          l
                                        );
                                      })(),
                                      margin: {
                                        top: 5,
                                        right: 30,
                                        left: 20,
                                        bottom: 5,
                                      },
                                      children: [
                                        (0, a.jsx)(c.d, {
                                          strokeDasharray: "3 3",
                                        }),
                                        (0, a.jsx)(r.W, { dataKey: "name" }),
                                        (0, a.jsx)(n.h, {}),
                                        (0, a.jsx)(i.m, {}),
                                        (0, a.jsx)(o.s, {}),
                                        (0, a.jsx)(x.y, {
                                          dataKey: "count",
                                          fill: "#8884d8",
                                          name: "Cases Created",
                                        }),
                                      ],
                                    }),
                                  }),
                                ],
                              }),
                              (0, a.jsx)(C.TabsContent, {
                                value: "cases",
                                className: "p-4 border rounded-md",
                                children: (0, a.jsxs)("div", {
                                  className:
                                    "grid grid-cols-1 md:grid-cols-2 gap-6",
                                  children: [
                                    (0, a.jsxs)("div", {
                                      children: [
                                        (0, a.jsx)("h2", {
                                          className: "text-lg font-medium mb-4",
                                          children: "Cases by Type",
                                        }),
                                        (0, a.jsx)("div", {
                                          className: "flex justify-center",
                                          children: (0, a.jsxs)(h.r, {
                                            width: 300,
                                            height: 300,
                                            children: [
                                              (0, a.jsx)(m.F, {
                                                data: L(),
                                                cx: "50%",
                                                cy: "50%",
                                                labelLine: !0,
                                                outerRadius: 100,
                                                fill: "#8884d8",
                                                dataKey: "value",
                                                nameKey: "name",
                                                label: (e) => {
                                                  let { name: s, percent: l } =
                                                    e;
                                                  return ""
                                                    .concat(s, ": ")
                                                    .concat(
                                                      (100 * l).toFixed(0),
                                                      "%",
                                                    );
                                                },
                                                children: L().map((e, s) =>
                                                  (0, a.jsx)(
                                                    u.f,
                                                    { fill: D[s % D.length] },
                                                    "cell-".concat(s),
                                                  ),
                                                ),
                                              }),
                                              (0, a.jsx)(i.m, {}),
                                            ],
                                          }),
                                        }),
                                      ],
                                    }),
                                    (0, a.jsxs)("div", {
                                      children: [
                                        (0, a.jsx)("h2", {
                                          className: "text-lg font-medium mb-4",
                                          children: "Cases by Status",
                                        }),
                                        (0, a.jsx)("div", {
                                          className: "flex justify-center",
                                          children: (0, a.jsxs)(h.r, {
                                            width: 300,
                                            height: 300,
                                            children: [
                                              (0, a.jsx)(m.F, {
                                                data: O(),
                                                cx: "50%",
                                                cy: "50%",
                                                labelLine: !0,
                                                outerRadius: 100,
                                                fill: "#8884d8",
                                                dataKey: "value",
                                                nameKey: "name",
                                                label: (e) => {
                                                  let { name: s, percent: l } =
                                                    e;
                                                  return ""
                                                    .concat(s, ": ")
                                                    .concat(
                                                      (100 * l).toFixed(0),
                                                      "%",
                                                    );
                                                },
                                                children: O().map((e, s) =>
                                                  (0, a.jsx)(
                                                    u.f,
                                                    { fill: D[s % D.length] },
                                                    "cell-".concat(s),
                                                  ),
                                                ),
                                              }),
                                              (0, a.jsx)(i.m, {}),
                                            ],
                                          }),
                                        }),
                                      ],
                                    }),
                                  ],
                                }),
                              }),
                              (0, a.jsxs)(C.TabsContent, {
                                value: "documents",
                                className: "p-4 border rounded-md",
                                children: [
                                  (0, a.jsx)("h2", {
                                    className: "text-lg font-medium mb-4",
                                    children: "Documents by Status",
                                  }),
                                  (0, a.jsx)("div", {
                                    className: "flex justify-center",
                                    children: (0, a.jsxs)(h.r, {
                                      width: 400,
                                      height: 300,
                                      children: [
                                        (0, a.jsx)(m.F, {
                                          data: Z(),
                                          cx: "50%",
                                          cy: "50%",
                                          labelLine: !0,
                                          outerRadius: 100,
                                          fill: "#8884d8",
                                          dataKey: "value",
                                          nameKey: "name",
                                          label: (e) => {
                                            let { name: s, percent: l } = e;
                                            return ""
                                              .concat(s, ": ")
                                              .concat(
                                                (100 * l).toFixed(0),
                                                "%",
                                              );
                                          },
                                          children: Z().map((e, s) =>
                                            (0, a.jsx)(
                                              u.f,
                                              { fill: D[s % D.length] },
                                              "cell-".concat(s),
                                            ),
                                          ),
                                        }),
                                        (0, a.jsx)(i.m, {}),
                                      ],
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
                }),
              ],
            });
      }
    },
  },
  (e) => {
    var s = (s) => e((e.s = s));
    e.O(0, [6593, 4223, 3209, 7358], () => s(40418)), (_N_E = e.O());
  },
]);
