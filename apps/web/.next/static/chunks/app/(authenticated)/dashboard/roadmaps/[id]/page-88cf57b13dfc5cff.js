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
    (e._sentryDebugIds[s] = "fd4c5f23-5db5-437e-b10d-3148708e81d7"),
    (e._sentryDebugIdIdentifier =
      "sentry-dbid-fd4c5f23-5db5-437e-b10d-3148708e81d7"));
} catch (e) {}
(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [7314],
  {
    30294: (e, s, a) => {
      Promise.resolve().then(a.bind(a, 68802));
    },
    68802: (e, s, a) => {
      "use strict";
      a.r(s), a.d(s, { default: () => p });
      var r = a(30602),
        d = a(84418),
        i = a(13575),
        t = a(97687),
        n = a.n(t),
        c = a(41960),
        l = a(85218),
        o = a(22897),
        h = a(47482),
        m = a(5271),
        u = a(77413),
        f = a(14985);
      function p() {
        let e = (0, c.useParams)().id,
          { user: s } = (0, d.useAuth)(),
          [a, t] = (0, l.useState)(!0),
          [p, x] = (0, l.useState)(null),
          [j, v] = (0, l.useState)(null),
          { toast: b } = (0, h.d)(),
          y = (0, f.UU)();
        (0, l.useEffect)(() => {
          (async () => {
            if (s)
              try {
                var a;
                t(!0);
                let { data: r, error: d } = await y
                  .from("roadmaps")
                  .select("*, cases:case_id(*)")
                  .eq("id", e)
                  .single();
                if (d) return void x("Failed to load roadmap data");
                if (
                  r.user_id !== s.id &&
                  (!(null == (a = r.cases) ? void 0 : a.assignments) ||
                    !r.cases.assignments.some((e) => e.userId === s.id))
                )
                  return void x("You do not have access to this roadmap");
                v(r);
              } catch (e) {
                console.error(e),
                  x("An error occurred while loading the roadmap");
              } finally {
                t(!1);
              }
          })();
        }, [e, s, y]);
        let g = async () => {
          if (
            confirm(
              "Are you sure you want to delete this roadmap? This action cannot be undone.",
            )
          )
            try {
              let { error: s } = await y.from("roadmaps").delete().eq("id", e);
              if (s)
                return void b({
                  title: "Error",
                  description: "Failed to delete roadmap",
                  variant: "destructive",
                });
              b({
                title: "Success",
                description: "Roadmap deleted successfully",
              }),
                (window.location.href = "/dashboard/roadmaps");
            } catch (e) {
              console.error(e),
                b({
                  title: "Error",
                  description: "An error occurred while deleting the roadmap",
                  variant: "destructive",
                });
            }
        };
        return a
          ? (0, r.jsx)("div", {
              className: "container py-8",
              children: (0, r.jsx)("div", {
                className: "flex justify-center items-center h-64",
                children: (0, r.jsx)("div", {
                  className:
                    "animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900",
                }),
              }),
            })
          : p
            ? (0, r.jsx)("div", {
                className: "container py-8",
                children: (0, r.jsxs)(u.Zp, {
                  children: [
                    (0, r.jsx)(u.aR, {
                      children: (0, r.jsx)(u.ZB, {
                        className: "text-lg text-red-600",
                        children: "Error",
                      }),
                    }),
                    (0, r.jsxs)(u.Wu, {
                      children: [
                        (0, r.jsx)("p", { children: p }),
                        (0, r.jsx)("div", {
                          className: "mt-4",
                          children: (0, r.jsx)(n(), {
                            href: "/dashboard/roadmaps",
                            legacyBehavior: !0,
                            children: (0, r.jsxs)(m.$, {
                              children: [
                                (0, r.jsx)(i.A, { className: "mr-2 h-4 w-4" }),
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
            : (0, r.jsxs)("div", {
                className: "container py-8",
                children: [
                  (0, r.jsxs)("div", {
                    className: "flex justify-between items-center mb-6",
                    children: [
                      (0, r.jsx)(n(), {
                        href: "/dashboard/roadmaps",
                        legacyBehavior: !0,
                        children: (0, r.jsxs)(m.$, {
                          variant: "outline",
                          children: [
                            (0, r.jsx)(i.A, { className: "mr-2 h-4 w-4" }),
                            "Back to Roadmaps",
                          ],
                        }),
                      }),
                      s &&
                        j &&
                        j.user_id === s.id &&
                        (0, r.jsx)(m.$, {
                          variant: "destructive",
                          onClick: g,
                          children: "Delete Roadmap",
                        }),
                    ],
                  }),
                  j && s && (0, r.jsx)(o.A, { roadmapId: e, userId: s.id }),
                  j &&
                    j.cases &&
                    (0, r.jsx)("div", {
                      className: "mt-8",
                      children: (0, r.jsxs)(u.Zp, {
                        children: [
                          (0, r.jsx)(u.aR, {
                            children: (0, r.jsx)(u.ZB, {
                              className: "text-lg",
                              children: "Related Case",
                            }),
                          }),
                          (0, r.jsxs)(u.Wu, {
                            children: [
                              (0, r.jsxs)("p", {
                                children: [
                                  (0, r.jsx)("span", {
                                    className: "font-medium",
                                    children: "Case Title:",
                                  }),
                                  " ",
                                  j.cases.title,
                                ],
                              }),
                              (0, r.jsxs)("p", {
                                children: [
                                  (0, r.jsx)("span", {
                                    className: "font-medium",
                                    children: "Case Number:",
                                  }),
                                  " ",
                                  j.cases.case_number,
                                ],
                              }),
                              (0, r.jsxs)("p", {
                                children: [
                                  (0, r.jsx)("span", {
                                    className: "font-medium",
                                    children: "Status:",
                                  }),
                                  " ",
                                  j.cases.status,
                                ],
                              }),
                              (0, r.jsxs)("div", {
                                className: "mt-4",
                                children: [
                                  (0, r.jsx)(n(), {
                                    href: "/dashboard/cases/".concat(j.case_id),
                                    legacyBehavior: !0,
                                    children: (0, r.jsx)(m.$, {
                                      variant: "outline",
                                      children: "View Case",
                                    }),
                                  }),
                                  (0, r.jsx)(n(), {
                                    href: "/dashboard/cases/".concat(
                                      j.case_id,
                                      "/roadmap",
                                    ),
                                    className: "ml-2",
                                    legacyBehavior: !0,
                                    children: (0, r.jsx)(m.$, {
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
    },
  },
  (e) => {
    var s = (s) => e((e.s = s));
    e.O(0, [6593, 4223, 3209, 7358], () => s(30294)), (_N_E = e.O());
  },
]);
