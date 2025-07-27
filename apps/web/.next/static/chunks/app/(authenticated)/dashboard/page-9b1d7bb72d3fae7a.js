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
    (e._sentryDebugIds[s] = "c318d4bf-54c1-4d29-b8f6-db56a37e0c03"),
    (e._sentryDebugIdIdentifier =
      "sentry-dbid-c318d4bf-54c1-4d29-b8f6-db56a37e0c03"));
} catch (e) {}
(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [4172],
  {
    8220: (e, s, t) => {
      "use strict";
      t.r(s), t.d(s, { default: () => x });
      var a = t(30602),
        r = t(41960),
        i = t(85218),
        c = t(11558),
        n = t(17703),
        o = t(30245),
        d = t(21565),
        l = t(10493),
        u = t(98266),
        h = t(20731),
        f = t(47482),
        p = t(84418),
        m = t(15140),
        b = t(86697);
      function x() {
        let [e, s] = (0, i.useState)([]),
          [t, x] = (0, i.useState)([]),
          [j, y] = (0, i.useState)(!0),
          [w, g] = (0, i.useState)("cases"),
          { user: v } = (0, p.useAuth)(),
          { toast: E } = (0, f.d)();
        (0, r.useRouter)();
        let { onboarding: T, resetOnboarding: N } = (0, h.z)(),
          C = (0, i.useCallback)(async () => {
            if (v)
              try {
                y(!0);
                let [e, t] = await Promise.all([
                  fetch("/api/cases?user_id=".concat(v.id)),
                  fetch("/api/documents?user_id=".concat(v.id)),
                ]);
                if (!e.ok)
                  throw Error("Failed to fetch cases: ".concat(e.status));
                if (!t.ok)
                  throw Error("Failed to fetch documents: ".concat(t.status));
                let a = await e.json(),
                  r = await t.json();
                s(a), x(r);
              } catch (e) {
                console.error("Error loading data:", e),
                  E({
                    variant: "destructive",
                    title: "Error",
                    description: "Failed to load data",
                  });
              } finally {
                y(!1);
              }
          }, [v, E]);
        (0, i.useEffect)(() => {
          v && C();
        }, [v, C]),
          (0, i.useEffect)(() => {
            (async () => {
              try {
                let e = await fetch("/api/onboarding/steps"),
                  s = await e.json();
                (!s.initialized || s.shouldStartOnboarding) &&
                  (await fetch("/api/onboarding/init", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                  }),
                  T.isActive || N());
              } catch (e) {
                console.error("Error checking onboarding status:", e),
                  E({
                    variant: "destructive",
                    title: "Error",
                    description:
                      "Failed to initialize onboarding. Please try refreshing the page.",
                  });
              }
            })();
          }, [T.isActive, N, E]);
        let _ = async (e) => {
            try {
              if (!e.title) throw Error("Title is required");
              let s = await fetch("/api/cases", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...e, user_id: v.id }),
              });
              if (!s.ok) {
                let e = await s.json();
                throw Error(
                  e.error || "Failed to create case: ".concat(s.status),
                );
              }
              await C(),
                E({
                  title: "Success",
                  description: "Case created successfully",
                });
            } catch (e) {
              console.error("Error creating case:", e),
                E({
                  variant: "destructive",
                  title: "Error",
                  description:
                    e instanceof Error ? e.message : "Failed to create case",
                });
            }
          },
          k = async (e) => {
            try {
              if (!e.name || !e.file) throw Error("Name and file are required");
              let s = new FormData();
              s.append("file", e.file),
                s.append("name", e.name),
                s.append("case_id", e.case_id || "default"),
                s.append("user_id", v.id),
                e.description && s.append("description", e.description);
              let t = await fetch("/api/documents", {
                method: "POST",
                body: s,
              });
              if (!t.ok) {
                let e = await t.json();
                throw Error(
                  e.error || "Failed to upload document: ".concat(t.status),
                );
              }
              await C(),
                E({
                  title: "Success",
                  description: "Document uploaded successfully",
                });
            } catch (e) {
              console.error("Error uploading document:", e),
                E({
                  variant: "destructive",
                  title: "Error",
                  description:
                    e instanceof Error
                      ? e.message
                      : "Failed to upload document",
                });
            }
          };
        return v
          ? j
            ? (0, a.jsx)(d.O, {})
            : (0, a.jsxs)("div", {
                className: "flex flex-col h-screen",
                children: [
                  (0, a.jsx)("div", {
                    className:
                      "flex items-center justify-between px-4 py-2 border-b",
                    children: (0, a.jsx)(m.Qp, {
                      children: (0, a.jsxs)(m.AB, {
                        children: [
                          (0, a.jsx)(m.J5, {
                            children: (0, a.jsx)(m.w1, {
                              href: "/",
                              children: "Home",
                            }),
                          }),
                          (0, a.jsx)(m.tH, {}),
                          (0, a.jsx)(m.J5, {
                            children: (0, a.jsx)(m.tJ, {
                              children: "Dashboard",
                            }),
                          }),
                        ],
                      }),
                    }),
                  }),
                  (0, a.jsxs)("div", {
                    className: "flex flex-1 overflow-hidden",
                    children: [
                      (0, a.jsx)(c.AppSidebar, { className: "h-screen" }),
                      (0, a.jsx)("div", {
                        className: "flex-1 overflow-auto",
                        children: (0, a.jsx)("div", {
                          className: "container mx-auto p-6",
                          children: (0, a.jsxs)(b.Tabs, {
                            defaultValue: w,
                            "data-tour": "dashboard",
                            children: [
                              (0, a.jsxs)("div", {
                                className:
                                  "mb-6 flex items-center justify-between",
                                children: [
                                  (0, a.jsxs)(b.TabsList, {
                                    children: [
                                      (0, a.jsx)(b.TabsTrigger, {
                                        value: "cases",
                                        onClick: () => g("cases"),
                                        children: "Cases",
                                      }),
                                      (0, a.jsx)(b.TabsTrigger, {
                                        value: "documents",
                                        onClick: () => g("documents"),
                                        children: "Documents",
                                      }),
                                      (0, a.jsx)(b.TabsTrigger, {
                                        value: "analytics",
                                        onClick: () => g("analytics"),
                                        children: "Analytics",
                                      }),
                                    ],
                                  }),
                                  (0, a.jsx)(o.c, {
                                    activeTab: w,
                                    cases: e,
                                    onCreateCase: _,
                                    onUploadDocument: k,
                                  }),
                                ],
                              }),
                              (0, a.jsx)(l.G, {
                                cases: e,
                                documents: t,
                                activeTab: w,
                              }),
                              (0, a.jsx)(b.TabsContent, {
                                value: "cases",
                                className: "space-y-4",
                                "data-tour": "applications",
                                children: (0, a.jsx)(n.G, {
                                  cases: e,
                                  onCaseUpdated: C,
                                }),
                              }),
                              (0, a.jsx)(b.TabsContent, {
                                value: "documents",
                                className: "space-y-4",
                                "data-tour": "documents",
                                children: (0, a.jsx)(u.P, {
                                  documents: t,
                                  onDocumentUpdated: C,
                                }),
                              }),
                              (0, a.jsx)(b.TabsContent, {
                                value: "analytics",
                                className: "space-y-4",
                                children: (0, a.jsx)("div", {
                                  className:
                                    "h-[400px] w-full rounded-md border border-dashed flex items-center justify-center",
                                  children: (0, a.jsx)("p", {
                                    className:
                                      "text-center text-muted-foreground",
                                    children: "Analytics view coming soon",
                                  }),
                                }),
                              }),
                            ],
                          }),
                        }),
                      }),
                    ],
                  }),
                ],
              })
          : (0, a.jsx)("div", {
              className: "flex min-h-screen items-center justify-center",
              children: (0, a.jsx)("p", {
                className: "text-lg",
                children: "Please sign in to access the dashboard",
              }),
            });
      }
    },
    95558: (e, s, t) => {
      Promise.resolve().then(t.bind(t, 8220));
    },
  },
  (e) => {
    var s = (s) => e((e.s = s));
    e.O(0, [6593, 4223, 3209, 7358], () => s(95558)), (_N_E = e.O());
  },
]);
