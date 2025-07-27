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
    (e._sentryDebugIds[s] = "aca0d231-23ce-4980-b29e-3ca0da781ee2"),
    (e._sentryDebugIdIdentifier =
      "sentry-dbid-aca0d231-23ce-4980-b29e-3ca0da781ee2"));
} catch (e) {}
(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [7002],
  {
    23537: (e, s, a) => {
      "use strict";
      a.d(s, { CasesDashboard: () => g });
      var t = a(30602),
        c = a(65266),
        l = a(40972),
        n = a(78811),
        r = a(41960),
        i = a(85218),
        d = a(17703),
        o = a(30245),
        u = a(10493),
        m = a(8053),
        h = a(68886),
        x = a(5271),
        b = a(88542),
        f = a(86697),
        p = a(47482);
      function g() {
        let { toast: e } = (0, p.d)(),
          s = (0, r.useRouter)(),
          [a, g] = (0, i.useState)(!0),
          [j, y] = (0, i.useState)([]),
          [w, N] = (0, i.useState)([]),
          [v, C] = (0, i.useState)("cases"),
          E = (0, i.useCallback)(async () => {
            g(!0);
            try {
              let [e, s] = await Promise.all([
                m.pC.getCases(),
                h.wP.getDocuments(),
              ]);
              y(e), N(s);
            } catch (s) {
              console.error("Error fetching dashboard data:", s),
                e({
                  title: "Error",
                  description:
                    "Failed to load dashboard data. Please try again.",
                  variant: "destructive",
                });
            } finally {
              g(!1);
            }
          }, [e]);
        (0, i.useEffect)(() => {
          E();
        }, [E]);
        let T = async (s) => {
            try {
              await m.pC.createCase(s),
                e({
                  title: "Success",
                  description: "Case created successfully.",
                }),
                E();
            } catch (s) {
              console.error("Error creating case:", s),
                e({
                  title: "Error",
                  description: "Failed to create case. Please try again.",
                  variant: "destructive",
                });
            }
          },
          D = async (s) => {
            try {
              await h.wP.uploadDocument(s),
                e({
                  title: "Success",
                  description: "Document uploaded successfully.",
                }),
                E();
            } catch (s) {
              console.error("Error uploading document:", s),
                e({
                  title: "Error",
                  description: "Failed to upload document. Please try again.",
                  variant: "destructive",
                });
            }
          };
        return a
          ? (0, t.jsxs)("div", {
              className: "container px-4 py-8 mx-auto",
              children: [
                (0, t.jsx)(b.E, { className: "h-12 w-48 mb-8" }),
                (0, t.jsxs)("div", {
                  className: "grid gap-6 md:grid-cols-3 mb-8",
                  children: [
                    (0, t.jsx)(b.E, { className: "h-32 w-full" }),
                    (0, t.jsx)(b.E, { className: "h-32 w-full" }),
                    (0, t.jsx)(b.E, { className: "h-32 w-full" }),
                  ],
                }),
                (0, t.jsx)(b.E, { className: "h-96 w-full" }),
              ],
            })
          : (0, t.jsxs)("div", {
              className: "container px-4 py-8 mx-auto",
              children: [
                (0, t.jsxs)("div", {
                  className: "flex justify-between items-center mb-8",
                  children: [
                    (0, t.jsx)("h1", {
                      className: "text-3xl font-bold",
                      children: "Cases Dashboard",
                    }),
                    (0, t.jsx)(x.$, {
                      onClick: () => s.push("/dashboard/cases/new"),
                      children: "New Case",
                    }),
                  ],
                }),
                (0, t.jsxs)(f.Tabs, {
                  defaultValue: "cases",
                  className: "mb-8",
                  onValueChange: C,
                  children: [
                    (0, t.jsxs)(f.TabsList, {
                      className: "grid w-full md:w-auto grid-cols-3 mb-8",
                      children: [
                        (0, t.jsxs)(f.TabsTrigger, {
                          value: "cases",
                          className: "flex items-center gap-2",
                          children: [
                            (0, t.jsx)(c.A, { className: "h-4 w-4" }),
                            (0, t.jsx)("span", {
                              className: "hidden md:inline",
                              children: "Cases",
                            }),
                          ],
                        }),
                        (0, t.jsxs)(f.TabsTrigger, {
                          value: "documents",
                          className: "flex items-center gap-2",
                          children: [
                            (0, t.jsx)(l.A, { className: "h-4 w-4" }),
                            (0, t.jsx)("span", {
                              className: "hidden md:inline",
                              children: "Documents",
                            }),
                          ],
                        }),
                        (0, t.jsxs)(f.TabsTrigger, {
                          value: "analytics",
                          className: "flex items-center gap-2",
                          children: [
                            (0, t.jsx)(n.A, { className: "h-4 w-4" }),
                            (0, t.jsx)("span", {
                              className: "hidden md:inline",
                              children: "Analytics",
                            }),
                          ],
                        }),
                      ],
                    }),
                    (0, t.jsx)(u.G, { cases: j, documents: w, activeTab: v }),
                    (0, t.jsx)(f.TabsContent, {
                      value: "cases",
                      children: (0, t.jsx)(d.G, { cases: j, onCaseUpdated: E }),
                    }),
                    (0, t.jsx)(f.TabsContent, { value: "documents" }),
                    (0, t.jsx)(f.TabsContent, { value: "analytics" }),
                  ],
                }),
                (0, t.jsx)(o.c, {
                  activeTab: v,
                  cases: j,
                  onCreateCase: T,
                  onUploadDocument: D,
                }),
              ],
            });
      }
    },
    61026: (e, s, a) => {
      Promise.resolve().then(a.bind(a, 23537));
    },
  },
  (e) => {
    var s = (s) => e((e.s = s));
    e.O(0, [6593, 4223, 3209, 7358], () => s(61026)), (_N_E = e.O());
  },
]);
