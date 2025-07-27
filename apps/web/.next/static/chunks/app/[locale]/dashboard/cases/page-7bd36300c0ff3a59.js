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
    (e._sentryDebugIds[s] = "f4c65d61-205c-432c-ad1d-8de4326cbb2b"),
    (e._sentryDebugIdIdentifier =
      "sentry-dbid-f4c65d61-205c-432c-ad1d-8de4326cbb2b"));
} catch (e) {}
(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [6980],
  {
    3051: (e, s, t) => {
      Promise.resolve().then(t.bind(t, 27236));
    },
    27236: (e, s, t) => {
      "use strict";
      t.r(s), t.d(s, { default: () => _ });
      var a = t(30602),
        n = t(94021),
        l = t(72170),
        r = t(73974),
        i = t(85218),
        d = t(5271),
        c = t(77413),
        o = t(17703),
        u = t(21565),
        h = t(4401),
        m = t(86697),
        p = t(39896),
        x = t(13868),
        g = t(34970),
        f = t(30311);
      let b = async (e) => {
        await new Promise((e) => setTimeout(e, 1e3));
        let s = [
          {
            id: "1",
            user_id: "mock-user-1",
            title: "Case Alpha - All",
            status: "active",
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            case_type: "work_visa",
            destination_country: "Canada",
            description: "First case example",
            current_stage: "document_collection",
            requirements: { passport: !0 },
            notes: "Initial notes.",
            metadata: null,
          },
          {
            id: "2",
            user_id: "mock-user-2",
            title: "Case Beta - All",
            status: "pending_review",
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            case_type: "permanent_residence",
            destination_country: "USA",
            description: null,
            current_stage: "submission",
            requirements: void 0,
            notes: void 0,
            metadata: null,
          },
          {
            id: "4",
            user_id: "current-user-id",
            title: "Case Delta - Assigned",
            status: "in_progress",
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            case_type: "family_visa",
            destination_country: "Australia",
            description: "Family sponsorship case",
            current_stage: "review",
            requirements: void 0,
            notes: void 0,
            metadata: null,
          },
        ];
        return "assigned" === e
          ? s.filter((e) => "current-user-id" === e.user_id)
          : s;
      };
      function _() {
        let e = (0, r.useTranslations)("cases"),
          s = (0, p.p)(),
          t = (0, x.V8)(s),
          [_, w] = (0, i.useState)(!0),
          [j, y] = (0, i.useState)([]),
          [v, C] = (0, i.useState)("all"),
          [T, S] = (0, i.useState)("");
        (0, i.useEffect)(() => {
          (async () => {
            w(!0);
            try {
              let e = await b(v),
                s = T
                  ? e.filter((e) => {
                      var s, t;
                      return (
                        (null == (s = e.title)
                          ? void 0
                          : s.toLowerCase().includes(T.toLowerCase())) ||
                        (null == (t = e.description)
                          ? void 0
                          : t.toLowerCase().includes(T.toLowerCase()))
                      );
                    })
                  : e;
              y(s);
            } catch (e) {
              console.error("Failed to fetch cases:", e);
            } finally {
              w(!1);
            }
          })();
        }, [v, T]);
        let N = async () => {
          w(!0);
          try {
            let e = await b(v);
            y(e);
          } catch (e) {
            console.error("Failed to refresh cases:", e);
          } finally {
            w(!1);
          }
        };
        return (0, a.jsxs)("div", {
          className: (0, f.cn)("p-4 md:p-6 lg:p-8", t ? "rtl" : "ltr"),
          dir: t ? "rtl" : "ltr",
          children: [
            (0, a.jsxs)("div", {
              className: "flex items-center justify-between mb-6",
              children: [
                (0, a.jsxs)("div", {
                  children: [
                    (0, a.jsx)("h1", {
                      className: "text-2xl md:text-3xl font-bold",
                      children: e("pageTitle"),
                    }),
                    (0, a.jsx)("p", {
                      className: "text-muted-foreground",
                      children: e("description"),
                    }),
                  ],
                }),
                (0, a.jsx)(d.$, {
                  asChild: !0,
                  children: (0, a.jsxs)(g.N_, {
                    href: "/dashboard/cases/new",
                    children: [
                      (0, a.jsx)(n.A, {
                        className: (0, f.cn)("h-4 w-4", t ? "ml-2" : "mr-2"),
                      }),
                      e("newCaseButton"),
                    ],
                  }),
                }),
              ],
            }),
            (0, a.jsxs)(m.Tabs, {
              defaultValue: v,
              onValueChange: (e) => C(e),
              className: "w-full",
              children: [
                (0, a.jsxs)("div", {
                  className: "flex items-center justify-between mb-4",
                  children: [
                    (0, a.jsxs)(m.TabsList, {
                      children: [
                        (0, a.jsx)(m.TabsTrigger, {
                          value: "all",
                          children: e("allCasesTab"),
                        }),
                        (0, a.jsx)(m.TabsTrigger, {
                          value: "assigned",
                          children: e("myCasesTab"),
                        }),
                      ],
                    }),
                    (0, a.jsxs)("div", {
                      className: "relative w-full max-w-sm",
                      children: [
                        (0, a.jsx)(l.A, {
                          className: (0, f.cn)(
                            "absolute h-4 w-4 text-muted-foreground top-1/2 -translate-y-1/2",
                            t ? "right-3" : "left-3",
                          ),
                        }),
                        (0, a.jsx)(h.p, {
                          placeholder: e("searchPlaceholder"),
                          className: (0, f.cn)(t ? "pr-8" : "pl-8"),
                          value: T,
                          onChange: (e) => S(e.target.value),
                        }),
                      ],
                    }),
                  ],
                }),
                (0, a.jsx)(m.TabsContent, {
                  value: "all",
                  children: (0, a.jsxs)(c.Zp, {
                    children: [
                      (0, a.jsxs)(c.aR, {
                        children: [
                          (0, a.jsx)(c.ZB, { children: e("allCasesTab") }),
                          (0, a.jsx)(c.BT, {
                            children:
                              "View and manage all immigration cases in the system.",
                          }),
                        ],
                      }),
                      (0, a.jsx)(c.Wu, {
                        children: _
                          ? (0, a.jsx)(u.O, {})
                          : (0, a.jsx)(o.G, { cases: j, onCaseUpdated: N }),
                      }),
                    ],
                  }),
                }),
                (0, a.jsx)(m.TabsContent, {
                  value: "assigned",
                  children: (0, a.jsxs)(c.Zp, {
                    children: [
                      (0, a.jsxs)(c.aR, {
                        children: [
                          (0, a.jsx)(c.ZB, { children: e("myCasesTab") }),
                          (0, a.jsx)(c.BT, {
                            children:
                              "View and manage cases assigned directly to you.",
                          }),
                        ],
                      }),
                      (0, a.jsx)(c.Wu, {
                        children: _
                          ? (0, a.jsx)(u.O, {})
                          : (0, a.jsx)(o.G, { cases: j, onCaseUpdated: N }),
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
    e.O(0, [6593, 4223, 3209, 7358], () => s(3051)), (_N_E = e.O());
  },
]);
