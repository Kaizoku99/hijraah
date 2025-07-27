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
    t = new e.Error().stack;
  t &&
    ((e._sentryDebugIds = e._sentryDebugIds || {}),
    (e._sentryDebugIds[t] = "5e903df9-7ca5-4bee-ae5d-758785284f4c"),
    (e._sentryDebugIdIdentifier =
      "sentry-dbid-5e903df9-7ca5-4bee-ae5d-758785284f4c"));
} catch (e) {}
(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [758],
  {
    8782: (e, t, s) => {
      Promise.resolve().then(s.bind(s, 69230));
    },
    69230: (e, t, s) => {
      "use strict";
      s.r(t), s.d(t, { default: () => y });
      var a = s(30602),
        i = s(5768),
        n = s(73974),
        d = s(85218),
        r = s(5271),
        c = s(77413),
        l = s(17703),
        o = s(30245),
        u = s(21565),
        m = s(10493),
        p = s(39896),
        _ = s(13868),
        f = s(34970),
        h = s(30311);
      let g = async () => (
          await new Promise((e) => setTimeout(e, 1500)),
          {
            cases: [
              {
                id: "1",
                user_id: "mock-user-1",
                title: "Case Alpha",
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
                title: "Case Beta",
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
                id: "3",
                user_id: "mock-user-1",
                title: "Case Gamma",
                status: "completed",
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
                case_type: "student_visa",
                destination_country: "UK",
                description: "Completed case.",
                current_stage: "completed",
                requirements: void 0,
                notes: void 0,
                metadata: null,
              },
            ],
            documents: [
              {
                id: "doc1",
                name: "Passport Scan",
                status: "ready",
                created_at: new Date().toISOString(),
                file_type: "pdf",
                file_size: 512e3,
                description: "Scan.",
                user_id: "mock-user-1",
                case_id: "1",
                file_path: "/mock/passport.pdf",
                updated_at: new Date().toISOString(),
                category_id: "cat-id-1",
                session_id: null,
                metadata: null,
              },
              {
                id: "doc2",
                name: "Application Form",
                status: "processing",
                created_at: new Date().toISOString(),
                file_type: "pdf",
                file_size: 1228800,
                description: "Form.",
                user_id: "mock-user-1",
                case_id: "1",
                file_path: "/mock/app_form.pdf",
                updated_at: new Date().toISOString(),
                category_id: "cat-id-2",
                session_id: null,
                metadata: null,
              },
              {
                id: "doc3",
                name: "Proof of Funds",
                status: "error",
                created_at: new Date().toISOString(),
                file_type: "jpg",
                file_size: 819200,
                description: "Statement.",
                user_id: "mock-user-2",
                case_id: "2",
                file_path: "/mock/funds.jpg",
                metadata: { error_message: "Invalid file format" },
                updated_at: new Date().toISOString(),
                category_id: "cat-id-3",
                session_id: null,
              },
            ],
          }
        ),
        x = async (e) => {
          await new Promise((e) => setTimeout(e, 500));
        },
        w = async (e) => {
          await new Promise((e) => setTimeout(e, 500));
        };
      function y() {
        let e = (0, n.useTranslations)("dashboard"),
          t = (0, p.p)(),
          s = (0, _.V8)(t),
          [y, S] = (0, d.useState)(!0),
          [j, b] = (0, d.useState)({ cases: [], documents: [] }),
          [v, I] = (0, d.useState)("cases");
        (0, d.useEffect)(() => {
          (async () => {
            S(!0);
            try {
              let e = await g();
              b(e);
            } catch (e) {
              console.error("Failed to fetch dashboard data:", e);
            } finally {
              S(!1);
            }
          })();
        }, []);
        let D = async () => {
          S(!0);
          try {
            let e = await g();
            b(e);
          } catch (e) {
            console.error("Failed to refresh data:", e);
          } finally {
            S(!1);
          }
        };
        if (y) return (0, a.jsx)(u.O, {});
        let N = j.cases.slice(0, 5);
        return (0, a.jsxs)("div", {
          className: (0, h.cn)(
            "p-4 md:p-6 lg:p-8 space-y-6",
            s ? "rtl" : "ltr",
          ),
          dir: s ? "rtl" : "ltr",
          children: [
            (0, a.jsxs)("div", {
              className:
                "flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4",
              children: [
                (0, a.jsxs)("div", {
                  children: [
                    (0, a.jsx)("h1", {
                      className: "text-2xl md:text-3xl font-bold",
                      children: e("title"),
                    }),
                    (0, a.jsx)("p", {
                      className: "text-muted-foreground",
                      children: e("welcomeMessage"),
                    }),
                  ],
                }),
                (0, a.jsx)(o.c, {
                  activeTab: v,
                  cases: j.cases,
                  onCreateCase: x,
                  onUploadDocument: w,
                }),
              ],
            }),
            (0, a.jsx)(m.G, {
              cases: j.cases,
              documents: j.documents,
              activeTab: v,
            }),
            (0, a.jsxs)("div", {
              className: "grid gap-6 lg:grid-cols-3",
              children: [
                (0, a.jsxs)(c.Zp, {
                  className: "lg:col-span-2",
                  children: [
                    (0, a.jsxs)(c.aR, {
                      className: "flex flex-row items-center justify-between",
                      children: [
                        (0, a.jsx)(c.ZB, { children: e("casesSectionTitle") }),
                        (0, a.jsx)(r.$, {
                          variant: "outline",
                          size: "sm",
                          asChild: !0,
                          children: (0, a.jsx)(f.N_, {
                            href: "/dashboard/cases",
                            children: e("viewAllCases"),
                          }),
                        }),
                      ],
                    }),
                    (0, a.jsx)(c.Wu, {
                      children: (0, a.jsx)(l.G, { cases: N, onCaseUpdated: D }),
                    }),
                  ],
                }),
                (0, a.jsxs)(c.Zp, {
                  children: [
                    (0, a.jsx)(c.aR, {
                      children: (0, a.jsx)(c.ZB, {
                        children: e("quickActionsSectionTitle"),
                      }),
                    }),
                    (0, a.jsxs)(c.Wu, {
                      className: "flex flex-col gap-3",
                      children: [
                        (0, a.jsx)(r.$, {
                          asChild: !0,
                          children: (0, a.jsx)(f.N_, {
                            href: "/dashboard/cases/new",
                            children: e("createNewCase"),
                          }),
                        }),
                        (0, a.jsx)(r.$, {
                          variant: "secondary",
                          asChild: !0,
                          children: (0, a.jsx)(f.N_, {
                            href: "/documents/upload",
                            children: e("uploadDocument"),
                          }),
                        }),
                        (0, a.jsx)(r.$, {
                          variant: "secondary",
                          asChild: !0,
                          children: (0, a.jsxs)(f.N_, {
                            href: "/roadmap",
                            children: [
                              (0, a.jsx)(i.A, {
                                className: (0, h.cn)(
                                  "h-4 w-4",
                                  s ? "ml-2" : "mr-2",
                                ),
                              }),
                              e("viewRoadmaps"),
                            ],
                          }),
                        }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
          ],
        });
      }
    },
  },
  (e) => {
    var t = (t) => e((e.s = t));
    e.O(0, [6593, 4223, 3209, 7358], () => t(8782)), (_N_E = e.O());
  },
]);
