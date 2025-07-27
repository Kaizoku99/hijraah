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
    (e._sentryDebugIds[s] = "5e3f9c08-d2aa-4fbc-a8e5-76d31c70f351"),
    (e._sentryDebugIdIdentifier =
      "sentry-dbid-5e3f9c08-d2aa-4fbc-a8e5-76d31c70f351"));
} catch (e) {}
(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [5592],
  {
    18541: (e, s, a) => {
      Promise.resolve().then(a.bind(a, 88164));
    },
    88164: (e, s, a) => {
      "use strict";
      a.r(s), a.d(s, { default: () => v });
      var r = a(30602),
        t = a(60653),
        l = a(30230),
        i = a(23836),
        d = a(62839),
        c = a(83944),
        n = a(58261),
        o = a(21301),
        u = a(72170),
        h = a(87758),
        m = a(97687),
        x = a.n(m),
        p = a(41960),
        j = a(85218),
        g = a(26600),
        f = a(5271),
        b = a(77413),
        y = a(4401),
        w = a(33511),
        N = a(47482);
      function v() {
        let [e, s] = (0, j.useState)([]),
          [a, m] = (0, j.useState)(!0),
          [v, _] = (0, j.useState)(null),
          [C, I] = (0, j.useState)(""),
          [k, E] = (0, j.useState)(null),
          { toast: A } = (0, N.d)(),
          R = (0, p.useRouter)(),
          L = (0, t.UU)(
            "http://localhost:54321",
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0",
          );
        (0, j.useEffect)(() => {
          (async () => {
            let { data: e, error: s } = await L.auth.getUser();
            if (s || !(null == e ? void 0 : e.user)) return R.push("/login");
            E(e.user);
          })();
        }, [L, R]),
          (0, j.useEffect)(() => {
            (async () => {
              if (k)
                try {
                  m(!0);
                  let { data: e, error: a } = await L.from("roadmaps")
                    .select("*, cases:case_id(title, case_number)")
                    .eq("user_id", k.id)
                    .order("last_updated", { ascending: !1 });
                  if (a) return void _("Failed to fetch roadmaps");
                  let r = e.map((e) => {
                    var s;
                    let a = "not_started";
                    if (100 === e.completion_percentage) a = "completed";
                    else if (Array.isArray(e.phases)) {
                      let s = e.phases.some((e) => "blocked" === e.status),
                        r = e.phases.some((e) => "overdue" === e.status),
                        t = e.phases.some((e) => "in_progress" === e.status);
                      s
                        ? (a = "blocked")
                        : r
                          ? (a = "overdue")
                          : t && (a = "in_progress");
                    }
                    return {
                      ...e,
                      status: a,
                      title:
                        e.title ||
                        "Roadmap for ".concat(
                          (null == (s = e.cases) ? void 0 : s.title) ||
                            e.case_id,
                        ),
                    };
                  });
                  s(r);
                } catch (e) {
                  _("An error occurred while fetching roadmaps"),
                    console.error(e);
                } finally {
                  m(!1);
                }
            })();
          }, [k, L]);
        let B = (e) => {
            switch (e) {
              case "completed":
                return (0, r.jsx)(d.A, { className: "h-5 w-5 text-green-500" });
              case "in_progress":
                return (0, r.jsx)(c.A, { className: "h-5 w-5 text-blue-500" });
              case "blocked":
                return (0, r.jsx)(n.A, { className: "h-5 w-5 text-red-500" });
              case "overdue":
                return (0, r.jsx)(o.A, {
                  className: "h-5 w-5 text-yellow-500",
                });
              default:
                return (0, r.jsx)(c.A, { className: "h-5 w-5 text-gray-500" });
            }
          },
          Z = (e) => {
            switch (e) {
              case "completed":
                return (0, r.jsx)(g.E, {
                  variant: "outline",
                  className: "bg-green-100 text-green-800 border-green-300",
                  children: "Completed",
                });
              case "in_progress":
                return (0, r.jsx)(g.E, {
                  variant: "outline",
                  className: "bg-blue-100 text-blue-800 border-blue-300",
                  children: "In Progress",
                });
              case "blocked":
                return (0, r.jsx)(g.E, {
                  variant: "outline",
                  className: "bg-red-100 text-red-800 border-red-300",
                  children: "Blocked",
                });
              case "overdue":
                return (0, r.jsx)(g.E, {
                  variant: "outline",
                  className: "bg-yellow-100 text-yellow-800 border-yellow-300",
                  children: "Overdue",
                });
              default:
                return (0, r.jsx)(g.E, {
                  variant: "outline",
                  className: "bg-gray-100 text-gray-800 border-gray-300",
                  children: "Not Started",
                });
            }
          },
          O = e.filter((e) => {
            var s, a, r;
            return (
              (null == (s = e.title)
                ? void 0
                : s.toLowerCase().includes(C.toLowerCase())) ||
              (null == (a = e.description)
                ? void 0
                : a.toLowerCase().includes(C.toLowerCase())) ||
              (null == (r = e.case_type)
                ? void 0
                : r.toLowerCase().includes(C.toLowerCase()))
            );
          });
        return (0, r.jsxs)("div", {
          className: "container",
          children: [
            (0, r.jsxs)("div", {
              className: "mb-8",
              children: [
                (0, r.jsx)("h1", {
                  className: "text-3xl font-bold",
                  children: "Immigration Roadmaps",
                }),
                (0, r.jsx)("p", {
                  className: "text-gray-500 mt-1",
                  children:
                    "View and manage your personalized immigration roadmaps",
                }),
              ],
            }),
            (0, r.jsxs)("div", {
              className: "flex flex-col sm:flex-row justify-between gap-4 mb-6",
              children: [
                (0, r.jsxs)("div", {
                  className: "relative w-full sm:max-w-xs",
                  children: [
                    (0, r.jsx)(u.A, {
                      className:
                        "absolute left-2.5 top-2.5 h-4 w-4 text-gray-500",
                    }),
                    (0, r.jsx)(y.p, {
                      type: "text",
                      placeholder: "Search roadmaps...",
                      className: "pl-8 w-full",
                      value: C,
                      onChange: (e) => I(e.target.value),
                    }),
                  ],
                }),
                (0, r.jsx)("div", {
                  className: "flex gap-2",
                  children: (0, r.jsx)(x(), {
                    href: "/dashboard/cases",
                    legacyBehavior: !0,
                    children: (0, r.jsx)(f.$, {
                      variant: "outline",
                      children: "View Cases",
                    }),
                  }),
                }),
              ],
            }),
            a
              ? (0, r.jsx)("div", {
                  className: "flex justify-center items-center h-64",
                  children: (0, r.jsx)("div", {
                    className:
                      "animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900",
                  }),
                })
              : v
                ? (0, r.jsxs)(b.Zp, {
                    children: [
                      (0, r.jsx)(b.aR, {
                        children: (0, r.jsx)(b.ZB, {
                          className: "text-red-600",
                          children: "Error",
                        }),
                      }),
                      (0, r.jsx)(b.Wu, {
                        children: (0, r.jsx)("p", { children: v }),
                      }),
                      (0, r.jsx)(b.wL, {
                        children: (0, r.jsx)(f.$, {
                          onClick: () => window.location.reload(),
                          children: "Retry",
                        }),
                      }),
                    ],
                  })
                : 0 === O.length
                  ? (0, r.jsxs)(b.Zp, {
                      children: [
                        (0, r.jsxs)(b.aR, {
                          children: [
                            (0, r.jsx)(b.ZB, { children: "No Roadmaps Found" }),
                            (0, r.jsx)(b.BT, {
                              children: C
                                ? "No roadmaps match your search criteria."
                                : "You have no roadmaps yet.",
                            }),
                          ],
                        }),
                        (0, r.jsx)(b.Wu, {
                          children: (0, r.jsx)("p", {
                            className: "text-gray-500",
                            children:
                              "Roadmaps are created from immigration cases. Visit your cases to create a roadmap.",
                          }),
                        }),
                        (0, r.jsx)(b.wL, {
                          children: (0, r.jsx)(x(), {
                            href: "/dashboard/cases",
                            legacyBehavior: !0,
                            children: (0, r.jsx)(f.$, {
                              children: "View My Cases",
                            }),
                          }),
                        }),
                      ],
                    })
                  : (0, r.jsx)("div", {
                      className:
                        "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",
                      children: O.map((e) => {
                        var s;
                        return (0, r.jsx)(
                          x(),
                          {
                            href: "/dashboard/roadmaps/".concat(e.id),
                            legacyBehavior: !0,
                            children: (0, r.jsxs)(b.Zp, {
                              className:
                                "h-full hover:shadow-md transition-shadow duration-200 cursor-pointer",
                              children: [
                                (0, r.jsxs)(b.aR, {
                                  className: "pb-2",
                                  children: [
                                    (0, r.jsxs)("div", {
                                      className:
                                        "flex justify-between items-start",
                                      children: [
                                        (0, r.jsxs)("div", {
                                          className: "flex items-center",
                                          children: [
                                            B(e.status),
                                            (0, r.jsx)(b.ZB, {
                                              className: "ml-2 text-lg",
                                              children: e.title,
                                            }),
                                          ],
                                        }),
                                        (0, r.jsx)("div", {
                                          children: Z(e.status),
                                        }),
                                      ],
                                    }),
                                    (0, r.jsx)(b.BT, {
                                      className: "mt-2",
                                      children:
                                        (null == (s = e.description)
                                          ? void 0
                                          : s.length) > 100
                                          ? "".concat(
                                              e.description.substring(0, 100),
                                              "...",
                                            )
                                          : e.description,
                                    }),
                                  ],
                                }),
                                (0, r.jsxs)(b.Wu, {
                                  children: [
                                    (0, r.jsxs)("div", {
                                      className:
                                        "flex justify-between items-center mb-2",
                                      children: [
                                        (0, r.jsx)("span", {
                                          className: "text-sm font-medium",
                                          children: "Progress",
                                        }),
                                        (0, r.jsxs)("span", {
                                          className: "text-sm",
                                          children: [
                                            e.completion_percentage,
                                            "%",
                                          ],
                                        }),
                                      ],
                                    }),
                                    (0, r.jsx)(w.k, {
                                      value: e.completion_percentage,
                                      className: "h-2 mb-4",
                                    }),
                                    (0, r.jsxs)("div", {
                                      className:
                                        "grid grid-cols-2 gap-2 text-sm",
                                      children: [
                                        (0, r.jsxs)("div", {
                                          children: [
                                            (0, r.jsx)("p", {
                                              className: "text-gray-500",
                                              children: "Case Type:",
                                            }),
                                            (0, r.jsx)("p", {
                                              className: "font-medium",
                                              children: e.case_type.replace(
                                                /_/g,
                                                " ",
                                              ),
                                            }),
                                          ],
                                        }),
                                        (0, r.jsxs)("div", {
                                          children: [
                                            (0, r.jsx)("p", {
                                              className: "text-gray-500",
                                              children: "Last Updated:",
                                            }),
                                            (0, r.jsx)("p", {
                                              className: "font-medium",
                                              children: (0, l.GP)(
                                                (0, i.H)(e.last_updated),
                                                "MMM d, yyyy",
                                              ),
                                            }),
                                          ],
                                        }),
                                      ],
                                    }),
                                  ],
                                }),
                                (0, r.jsx)(b.wL, {
                                  className: "pt-0 pb-3",
                                  children: (0, r.jsxs)(f.$, {
                                    variant: "ghost",
                                    className: "w-full justify-between",
                                    children: [
                                      "View Details ",
                                      (0, r.jsx)(h.A, { className: "h-4 w-4" }),
                                    ],
                                  }),
                                }),
                              ],
                            }),
                          },
                          e.id,
                        );
                      }),
                    }),
          ],
        });
      }
    },
  },
  (e) => {
    var s = (s) => e((e.s = s));
    e.O(0, [6593, 4223, 3209, 7358], () => s(18541)), (_N_E = e.O());
  },
]);
