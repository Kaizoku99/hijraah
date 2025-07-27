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
    (e._sentryDebugIds[s] = "69f3a0ce-bc05-45c8-8197-8b3733e7f9bf"),
    (e._sentryDebugIdIdentifier =
      "sentry-dbid-69f3a0ce-bc05-45c8-8197-8b3733e7f9bf"));
} catch (e) {}
(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [2242],
  {
    48314: (e, s, a) => {
      "use strict";
      a.r(s), a.d(s, { default: () => f });
      var t = a(30602),
        i = a(5768),
        d = a(73974),
        l = a(85218),
        n = a(5271),
        r = a(77413),
        c = a(88542),
        o = a(39896),
        m = a(13868),
        p = a(34970),
        h = a(84418),
        x = a(30311);
      let u = async (e) => (
        await new Promise((e) => setTimeout(e, 1e3)),
        [
          {
            id: "roadmap-123",
            title: "My Canadian Work Permit Plan",
            description: "Steps for applying for the work permit.",
            case_id: "case-abc",
            created_at: new Date(Date.now() - 432e6).toISOString(),
          },
          {
            id: "roadmap-456",
            title: "UK Student Visa Process",
            description: null,
            case_id: "case-def",
            created_at: new Date(Date.now() - 864e6).toISOString(),
          },
          {
            id: "roadmap-789",
            title: "Express Entry Profile Setup",
            description: "Initial setup guide.",
            case_id: null,
            created_at: new Date().toISOString(),
          },
        ]
      );
      function f() {
        let e = (0, d.useTranslations)("roadmapList"),
          s = (0, o.p)(),
          a = (0, m.V8)(s),
          { user: f, isLoading: j } = (0, h.useAuth)(),
          [w, b] = (0, l.useState)([]),
          [g, y] = (0, l.useState)(!0);
        return ((0, l.useEffect)(() => {
          f &&
            (async () => {
              y(!0);
              try {
                let e = await u(f.id);
                b(e);
              } catch (e) {
                console.error("Failed to fetch roadmaps:", e);
              } finally {
                y(!1);
              }
            })();
        }, [f]),
        j || (f && g))
          ? (0, t.jsxs)("div", {
              className: "p-8 space-y-6",
              children: [
                (0, t.jsx)(c.E, { className: "h-8 w-1/3 mb-2" }),
                (0, t.jsx)(c.E, { className: "h-4 w-2/3" }),
                (0, t.jsxs)("div", {
                  className: "space-y-4 mt-6",
                  children: [
                    (0, t.jsx)(c.E, { className: "h-24 w-full" }),
                    (0, t.jsx)(c.E, { className: "h-24 w-full" }),
                    (0, t.jsx)(c.E, { className: "h-24 w-full" }),
                  ],
                }),
              ],
            })
          : f
            ? (0, t.jsxs)("div", {
                className: (0, x.cn)("p-4 md:p-6 lg:p-8", a ? "rtl" : "ltr"),
                dir: a ? "rtl" : "ltr",
                children: [
                  (0, t.jsxs)("div", {
                    className: "mb-6",
                    children: [
                      (0, t.jsxs)("h1", {
                        className:
                          "text-2xl md:text-3xl font-bold flex items-center",
                        children: [
                          (0, t.jsx)(i.A, { className: "mr-2 h-7 w-7" }),
                          " ",
                          e("pageTitle"),
                        ],
                      }),
                      (0, t.jsx)("p", {
                        className: "text-muted-foreground mt-1",
                        children: e("description"),
                      }),
                    ],
                  }),
                  0 === w.length
                    ? (0, t.jsxs)(r.Zp, {
                        className: "text-center py-12",
                        children: [
                          (0, t.jsxs)(r.aR, {
                            children: [
                              (0, t.jsx)(i.A, {
                                className:
                                  "mx-auto h-12 w-12 text-muted-foreground mb-4",
                              }),
                              (0, t.jsx)(r.ZB, { children: e("noRoadmaps") }),
                            ],
                          }),
                          (0, t.jsx)(r.Wu, {}),
                        ],
                      })
                    : (0, t.jsx)("div", {
                        className: "space-y-4",
                        children: w.map((a) =>
                          (0, t.jsxs)(
                            r.Zp,
                            {
                              children: [
                                (0, t.jsxs)(r.aR, {
                                  children: [
                                    (0, t.jsx)(r.ZB, { children: a.title }),
                                    a.description &&
                                      (0, t.jsx)(r.BT, {
                                        children: a.description,
                                      }),
                                  ],
                                }),
                                (0, t.jsxs)(r.Wu, {
                                  className: "text-sm text-muted-foreground",
                                  children: [
                                    (0, t.jsxs)("p", {
                                      children: [
                                        "Created:",
                                        " ",
                                        new Date(
                                          a.created_at,
                                        ).toLocaleDateString(s),
                                      ],
                                    }),
                                    a.case_id &&
                                      (0, t.jsxs)("p", {
                                        children: ["Related Case: ", a.case_id],
                                      }),
                                  ],
                                }),
                                (0, t.jsx)(r.wL, {
                                  className: "flex justify-end",
                                  children: (0, t.jsx)(n.$, {
                                    asChild: !0,
                                    size: "sm",
                                    children: (0, t.jsx)(p.N_, {
                                      href: "/roadmap/".concat(a.id),
                                      children: e("viewRoadmap"),
                                    }),
                                  }),
                                }),
                              ],
                            },
                            a.id,
                          ),
                        ),
                      }),
                ],
              })
            : (0, t.jsx)("div", {
                className: "p-8",
                children: "Access Denied: Please log in.",
              });
      }
    },
    54430: (e, s, a) => {
      Promise.resolve().then(a.bind(a, 48314));
    },
  },
  (e) => {
    var s = (s) => e((e.s = s));
    e.O(0, [6593, 4223, 3209, 7358], () => s(54430)), (_N_E = e.O());
  },
]);
