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
    (e._sentryDebugIds[t] = "07bf4d65-f9c2-4610-b7c4-f817cbf1d607"),
    (e._sentryDebugIdIdentifier =
      "sentry-dbid-07bf4d65-f9c2-4610-b7c4-f817cbf1d607"));
} catch (e) {}
(() => {
  var e = {};
  (e.id = 758),
    (e.ids = [758, 4630]),
    (e.modules = {
      3295: (e) => {
        "use strict";
        e.exports = require("next/dist/server/app-render/after-task-async-storage.external.js");
      },
      5451: (e, t, r) => {
        "use strict";
        r.a(e, async (e, s) => {
          try {
            r.d(t, {
              BT: () => p,
              Wu: () => h,
              ZB: () => u,
              Zp: () => d,
              aR: () => c,
              wL: () => m,
            });
            var a = r(61268),
              n = r(55728),
              o = r(84205),
              i = r(15942),
              l = e([i]);
            i = (l.then ? (await l)() : l)[0];
            let d = o.forwardRef(({ className: e, ...t }, r) =>
              (0, a.jsx)(n.P.div, {
                ref: r,
                className: (0, i.cn)(
                  "rounded-lg border bg-card text-card-foreground shadow-sm",
                  e,
                ),
                whileHover: {
                  scale: 1.03,
                  boxShadow:
                    "0px 7px 25px rgba(0,0,0,0.08), 0px 3px 10px rgba(0,0,0,0.04)",
                },
                transition: { type: "spring", stiffness: 300, damping: 20 },
                ...t,
              }),
            );
            d.displayName = "Card";
            let c = o.forwardRef(({ className: e, ...t }, r) =>
              (0, a.jsx)("div", {
                ref: r,
                className: (0, i.cn)("flex flex-col space-y-1.5 p-6", e),
                ...t,
              }),
            );
            c.displayName = "CardHeader";
            let u = o.forwardRef(({ className: e, ...t }, r) =>
              (0, a.jsx)("h3", {
                ref: r,
                className: (0, i.cn)(
                  "text-2xl font-semibold leading-none tracking-tight",
                  e,
                ),
                ...t,
              }),
            );
            u.displayName = "CardTitle";
            let p = o.forwardRef(({ className: e, ...t }, r) =>
              (0, a.jsx)("p", {
                ref: r,
                className: (0, i.cn)("text-sm text-muted-foreground", e),
                ...t,
              }),
            );
            p.displayName = "CardDescription";
            let h = o.forwardRef(({ className: e, ...t }, r) =>
              (0, a.jsx)("div", {
                ref: r,
                className: (0, i.cn)("p-6 pt-0", e),
                ...t,
              }),
            );
            h.displayName = "CardContent";
            let m = o.forwardRef(({ className: e, ...t }, r) =>
              (0, a.jsx)("div", {
                ref: r,
                className: (0, i.cn)("flex items-center p-6 pt-0", e),
                ...t,
              }),
            );
            (m.displayName = "CardFooter"), s();
          } catch (e) {
            s(e);
          }
        });
      },
      5503: (e, t, r) => {
        "use strict";
        r.a(e, async (e, s) => {
          try {
            r.r(t), r.d(t, { default: () => b });
            var a = r(61268),
              n = r(43202),
              o = r(95124),
              i = r(84205),
              l = r(28909),
              d = r(5451),
              c = r(94507),
              u = r(28539),
              p = r(20149),
              h = r(8435),
              m = r(79366),
              x = r(58702),
              f = r(3452),
              g = r(15942),
              v = e([l, d, c, u, p, h, g]);
            [l, d, c, u, p, h, g] = v.then ? (await v)() : v;
            let w = async () => {
                await new Promise((e) => setTimeout(e, 1500));
                let e = [
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
                  t = [
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
                  ];
                return { cases: e, documents: t };
              },
              y = async (e) => {
                await new Promise((e) => setTimeout(e, 500));
              },
              j = async (e) => {
                await new Promise((e) => setTimeout(e, 500));
              };
            function b() {
              let e = (0, o.useTranslations)("dashboard"),
                t = (0, m.p)(),
                r = (0, x.V8)(t),
                [s, v] = (0, i.useState)(!0),
                [b, N] = (0, i.useState)({ cases: [], documents: [] }),
                [_, C] = (0, i.useState)("cases"),
                S = async () => {
                  v(!0);
                  try {
                    let e = await w();
                    N(e);
                  } catch (e) {
                    console.error("Failed to refresh data:", e);
                  } finally {
                    v(!1);
                  }
                };
              if (s) return (0, a.jsx)(p.O, {});
              let E = b.cases.slice(0, 5);
              return (0, a.jsxs)("div", {
                className: (0, g.cn)(
                  "p-4 md:p-6 lg:p-8 space-y-6",
                  r ? "rtl" : "ltr",
                ),
                dir: r ? "rtl" : "ltr",
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
                      (0, a.jsx)(u.c, {
                        activeTab: _,
                        cases: b.cases,
                        onCreateCase: y,
                        onUploadDocument: j,
                      }),
                    ],
                  }),
                  (0, a.jsx)(h.G, {
                    cases: b.cases,
                    documents: b.documents,
                    activeTab: _,
                  }),
                  (0, a.jsxs)("div", {
                    className: "grid gap-6 lg:grid-cols-3",
                    children: [
                      (0, a.jsxs)(d.Zp, {
                        className: "lg:col-span-2",
                        children: [
                          (0, a.jsxs)(d.aR, {
                            className:
                              "flex flex-row items-center justify-between",
                            children: [
                              (0, a.jsx)(d.ZB, {
                                children: e("casesSectionTitle"),
                              }),
                              (0, a.jsx)(l.$, {
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
                          (0, a.jsx)(d.Wu, {
                            children: (0, a.jsx)(c.G, {
                              cases: E,
                              onCaseUpdated: S,
                            }),
                          }),
                        ],
                      }),
                      (0, a.jsxs)(d.Zp, {
                        children: [
                          (0, a.jsx)(d.aR, {
                            children: (0, a.jsx)(d.ZB, {
                              children: e("quickActionsSectionTitle"),
                            }),
                          }),
                          (0, a.jsxs)(d.Wu, {
                            className: "flex flex-col gap-3",
                            children: [
                              (0, a.jsx)(l.$, {
                                asChild: !0,
                                children: (0, a.jsx)(f.N_, {
                                  href: "/dashboard/cases/new",
                                  children: e("createNewCase"),
                                }),
                              }),
                              (0, a.jsx)(l.$, {
                                variant: "secondary",
                                asChild: !0,
                                children: (0, a.jsx)(f.N_, {
                                  href: "/documents/upload",
                                  children: e("uploadDocument"),
                                }),
                              }),
                              (0, a.jsx)(l.$, {
                                variant: "secondary",
                                asChild: !0,
                                children: (0, a.jsxs)(f.N_, {
                                  href: "/roadmap",
                                  children: [
                                    (0, a.jsx)(n.A, {
                                      className: (0, g.cn)(
                                        "h-4 w-4",
                                        r ? "ml-2" : "mr-2",
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
            s();
          } catch (e) {
            s(e);
          }
        });
      },
      7839: (e, t, r) => {
        "use strict";
        r.d(t, { jH: () => n });
        var s = r(84205);
        r(61268);
        var a = s.createContext(void 0);
        function n(e) {
          let t = s.useContext(a);
          return e || t || "ltr";
        }
      },
      8086: (e) => {
        "use strict";
        e.exports = require("module");
      },
      8963: (e) => {
        function t(e) {
          var t = Error("Cannot find module '" + e + "'");
          throw ((t.code = "MODULE_NOT_FOUND"), t);
        }
        (t.keys = () => []), (t.resolve = t), (t.id = 8963), (e.exports = t);
      },
      10846: (e) => {
        "use strict";
        e.exports = require("next/dist/compiled/next-server/app-page.runtime.prod.js");
      },
      11997: (e) => {
        "use strict";
        e.exports = require("punycode");
      },
      15942: (e, t, r) => {
        "use strict";
        r.a(e, async (e, s) => {
          try {
            r.d(t, {
              Cq: () => c,
              GO: () => p,
              cn: () => l,
              lk: () => d,
              y8: () => u,
            });
            var a = r(85488);
            r(3477);
            var n = r(79029),
              o = r(58360),
              i = e([a]);
            function l(...e) {
              return (0, o.QP)((0, n.$)(e));
            }
            function d() {
              return "undefined" != typeof crypto && crypto.randomUUID
                ? crypto.randomUUID()
                : "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
                    /[xy]/g,
                    function (e) {
                      let t = (16 * Math.random()) | 0;
                      return ("x" === e ? t : (3 & t) | 8).toString(16);
                    },
                  );
            }
            function c(e) {
              if (0 === e) return "0 Bytes";
              let t = Math.floor(Math.log(e) / Math.log(1024));
              return (
                parseFloat((e / Math.pow(1024, t)).toFixed(2)) +
                " " +
                ["Bytes", "KB", "MB", "GB", "TB"][t]
              );
            }
            a = (i.then ? (await i)() : i)[0];
            let p = async (e) => {
              let t = await fetch(e);
              if (!t.ok) {
                let e = Error("An error occurred while fetching the data.");
                try {
                  e.info = await t.json();
                } catch (r) {
                  e.info = t.statusText;
                }
                throw ((e.status = t.status), e);
              }
              return t.json();
            };
            function u(e) {
              return e.map((e) => {
                var t;
                return {
                  ...e,
                  content:
                    ((t = e.content),
                    "string" != typeof t
                      ? ""
                      : t.replace(/<has_function_call>/g, "")),
                };
              });
            }
            s();
          } catch (e) {
            s(e);
          }
        });
      },
      19121: (e) => {
        "use strict";
        e.exports = require("next/dist/server/app-render/action-async-storage.external.js");
      },
      19771: (e) => {
        "use strict";
        e.exports = require("process");
      },
      20149: (e, t, r) => {
        "use strict";
        r.a(e, async (e, s) => {
          try {
            r.d(t, { O: () => u });
            var a = r(61268),
              n = r(43851),
              o = r(17362),
              i = r(5451),
              l = r(94812),
              d = r(77001),
              c = e([n, o, i, l, d]);
            function u() {
              return (0, a.jsxs)("div", {
                className: "flex flex-col h-screen",
                children: [
                  (0, a.jsx)("div", {
                    className:
                      "flex items-center justify-between px-4 py-2 border-b",
                    children: (0, a.jsx)(o.Qp, {
                      children: (0, a.jsxs)(o.AB, {
                        children: [
                          (0, a.jsx)(o.J5, {
                            children: (0, a.jsx)(o.w1, {
                              href: "/",
                              children: "Home",
                            }),
                          }),
                          (0, a.jsx)(o.tH, {}),
                          (0, a.jsx)(o.J5, {
                            children: (0, a.jsx)(o.tJ, {
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
                      (0, a.jsx)(n.AppSidebar, { className: "h-screen" }),
                      (0, a.jsx)("div", {
                        className: "flex-1 overflow-auto",
                        children: (0, a.jsx)("div", {
                          className: "container mx-auto p-6",
                          children: (0, a.jsxs)(d.Tabs, {
                            defaultValue: "cases",
                            children: [
                              (0, a.jsxs)("div", {
                                className:
                                  "mb-6 flex items-center justify-between",
                                children: [
                                  (0, a.jsxs)(d.TabsList, {
                                    children: [
                                      (0, a.jsx)(d.TabsTrigger, {
                                        value: "cases",
                                        children: "Cases",
                                      }),
                                      (0, a.jsx)(d.TabsTrigger, {
                                        value: "documents",
                                        children: "Documents",
                                      }),
                                      (0, a.jsx)(d.TabsTrigger, {
                                        value: "analytics",
                                        children: "Analytics",
                                      }),
                                    ],
                                  }),
                                  (0, a.jsx)(l.E, { className: "h-10 w-32" }),
                                ],
                              }),
                              (0, a.jsx)("div", {
                                className: "grid gap-4 md:grid-cols-3 mb-6",
                                children: [1, 2, 3].map((e) =>
                                  (0, a.jsxs)(
                                    i.Zp,
                                    {
                                      children: [
                                        (0, a.jsxs)(i.aR, {
                                          className:
                                            "flex flex-row items-center justify-between space-y-0 pb-2",
                                          children: [
                                            (0, a.jsx)(l.E, {
                                              className: "h-5 w-24",
                                            }),
                                            (0, a.jsx)(l.E, {
                                              className: "h-4 w-4 rounded-full",
                                            }),
                                          ],
                                        }),
                                        (0, a.jsxs)(i.Wu, {
                                          children: [
                                            (0, a.jsx)(l.E, {
                                              className: "h-8 w-12 mb-1",
                                            }),
                                            (0, a.jsx)(l.E, {
                                              className: "h-3 w-32",
                                            }),
                                          ],
                                        }),
                                      ],
                                    },
                                    e,
                                  ),
                                ),
                              }),
                              (0, a.jsx)(d.TabsContent, {
                                value: "cases",
                                className: "space-y-4",
                                children: [1, 2, 3].map((e) =>
                                  (0, a.jsxs)(
                                    i.Zp,
                                    {
                                      children: [
                                        (0, a.jsx)(i.aR, {
                                          className: "p-4",
                                          children: (0, a.jsxs)("div", {
                                            className:
                                              "flex justify-between items-start",
                                            children: [
                                              (0, a.jsxs)("div", {
                                                children: [
                                                  (0, a.jsx)(l.E, {
                                                    className: "h-6 w-48 mb-2",
                                                  }),
                                                  (0, a.jsx)(l.E, {
                                                    className: "h-4 w-64",
                                                  }),
                                                ],
                                              }),
                                              (0, a.jsxs)("div", {
                                                className:
                                                  "flex items-center space-x-2",
                                                children: [
                                                  (0, a.jsx)(l.E, {
                                                    className:
                                                      "h-6 w-24 rounded-full",
                                                  }),
                                                  (0, a.jsx)(l.E, {
                                                    className:
                                                      "h-8 w-8 rounded-full",
                                                  }),
                                                ],
                                              }),
                                            ],
                                          }),
                                        }),
                                        (0, a.jsx)(i.Wu, {
                                          className: "p-4 pt-0",
                                          children: (0, a.jsxs)("div", {
                                            className: "flex flex-wrap gap-2",
                                            children: [
                                              (0, a.jsx)(l.E, {
                                                className: "h-4 w-32",
                                              }),
                                              (0, a.jsx)(l.E, {
                                                className: "h-4 w-40",
                                              }),
                                            ],
                                          }),
                                        }),
                                        (0, a.jsxs)(i.wL, {
                                          className:
                                            "p-4 pt-0 flex justify-between",
                                          children: [
                                            (0, a.jsx)(l.E, {
                                              className: "h-8 w-24",
                                            }),
                                            (0, a.jsx)(l.E, {
                                              className: "h-8 w-32",
                                            }),
                                          ],
                                        }),
                                      ],
                                    },
                                    e,
                                  ),
                                ),
                              }),
                              (0, a.jsx)(d.TabsContent, {
                                value: "documents",
                                className: "space-y-4",
                                children: [1, 2, 3].map((e) =>
                                  (0, a.jsxs)(
                                    i.Zp,
                                    {
                                      children: [
                                        (0, a.jsx)(i.aR, {
                                          className: "p-4",
                                          children: (0, a.jsxs)("div", {
                                            className:
                                              "flex justify-between items-start",
                                            children: [
                                              (0, a.jsxs)("div", {
                                                className:
                                                  "flex items-start space-x-3",
                                                children: [
                                                  (0, a.jsx)(l.E, {
                                                    className:
                                                      "h-10 w-10 rounded-md",
                                                  }),
                                                  (0, a.jsxs)("div", {
                                                    children: [
                                                      (0, a.jsx)(l.E, {
                                                        className:
                                                          "h-6 w-48 mb-2",
                                                      }),
                                                      (0, a.jsx)(l.E, {
                                                        className: "h-4 w-32",
                                                      }),
                                                    ],
                                                  }),
                                                ],
                                              }),
                                              (0, a.jsxs)("div", {
                                                className:
                                                  "flex items-center space-x-2",
                                                children: [
                                                  (0, a.jsx)(l.E, {
                                                    className:
                                                      "h-6 w-24 rounded-full",
                                                  }),
                                                  (0, a.jsx)(l.E, {
                                                    className:
                                                      "h-8 w-8 rounded-full",
                                                  }),
                                                ],
                                              }),
                                            ],
                                          }),
                                        }),
                                        (0, a.jsxs)(i.Wu, {
                                          className: "p-4 pt-0",
                                          children: [
                                            (0, a.jsx)(l.E, {
                                              className: "h-4 w-full mb-2",
                                            }),
                                            (0, a.jsxs)("div", {
                                              className: "flex flex-wrap gap-2",
                                              children: [
                                                (0, a.jsx)(l.E, {
                                                  className: "h-4 w-32",
                                                }),
                                                (0, a.jsx)(l.E, {
                                                  className: "h-4 w-24",
                                                }),
                                              ],
                                            }),
                                          ],
                                        }),
                                        (0, a.jsx)(i.wL, {
                                          className:
                                            "p-4 pt-0 flex justify-end",
                                          children: (0, a.jsx)(l.E, {
                                            className: "h-8 w-32",
                                          }),
                                        }),
                                      ],
                                    },
                                    e,
                                  ),
                                ),
                              }),
                              (0, a.jsx)(d.TabsContent, {
                                value: "analytics",
                                className: "space-y-4",
                                children: (0, a.jsx)("div", {
                                  className:
                                    "h-[400px] w-full rounded-md border border-dashed flex items-center justify-center",
                                  children: (0, a.jsx)(l.E, {
                                    className: "h-8 w-64",
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
              });
            }
            ([n, o, i, l, d] = c.then ? (await c)() : c), s();
          } catch (e) {
            s(e);
          }
        });
      },
      21820: (e) => {
        "use strict";
        e.exports = require("os");
      },
      22630: (e, t, r) => {
        "use strict";
        let s;
        r.r(t),
          r.d(t, {
            default: () => b,
            dynamic: () => p,
            generateImageMetadata: () => g,
            generateMetadata: () => f,
            generateViewport: () => v,
            maxDuration: () => h,
            metadata: () => c,
            viewport: () => u,
          });
        var a = r(63033),
          n = r(35242);
        r(93206);
        var o = r(51433),
          i = r(59107),
          l = r(39862),
          d = r(60442);
        let c = {
            title: {
              default: "Hijraah - Navigate Your Immigration Journey",
              template: "%s | Hijraah",
            },
            metadataBase: new URL("https://hijraah.vercel.app"),
            description:
              "Navigate your immigration journey with AI guidance - Compare immigration policies across countries with intelligent insights",
            keywords: [
              "immigration",
              "visa",
              "comparison",
              "countries",
              "policies",
              "AI guidance",
              "immigration journey",
            ],
            authors: [{ name: "Hijraah Team" }],
            creator: "Hijraah",
            icons: { icon: "/Hijraah_logo.png", apple: "/Hijraah_logo.png" },
            openGraph: {
              type: "website",
              locale: "en_US",
              url: "https://hijraah.vercel.app",
              title: "Hijraah - Immigration Comparison",
              description:
                "Compare immigration policies across countries with AI-powered insights",
              siteName: "Hijraah",
              images: [
                {
                  url: "/Hijraah_logo.png",
                  width: 800,
                  height: 800,
                  alt: "Hijraah Logo",
                },
              ],
            },
            twitter: {
              card: "summary_large_image",
              title: "Hijraah - Immigration Comparison",
              description:
                "Compare immigration policies across countries with AI-powered insights",
              creator: "@hijraah",
              images: ["/Hijraah_logo.png"],
            },
            robots: { index: !0, follow: !0 },
          },
          u = {
            themeColor: [
              { media: "(prefers-color-scheme: light)", color: "white" },
              { media: "(prefers-color-scheme: dark)", color: "#18181b" },
            ],
            width: "device-width",
            initialScale: 1,
          },
          p = "force-dynamic",
          h = 60,
          m = { ...a },
          x =
            "workUnitAsyncStorage" in m
              ? m.workUnitAsyncStorage
              : "requestAsyncStorage" in m
                ? m.requestAsyncStorage
                : void 0;
        s = new Proxy(
          function ({ children: e }) {
            let t = { plugins: [] };
            return (0, n.jsxs)(n.Fragment, {
              children: [
                e,
                (0, n.jsx)(i.Analytics, {}),
                (0, n.jsx)(l.SpeedInsights, {}),
                t && (0, n.jsx)(o.StagewiseToolbar, { config: t }),
              ],
            });
          },
          {
            apply: (e, t, r) => {
              let s, a, n;
              try {
                let e = x?.getStore();
                (s = e?.headers.get("sentry-trace") ?? void 0),
                  (a = e?.headers.get("baggage") ?? void 0),
                  (n = e?.headers);
              } catch (e) {}
              return d
                .wrapServerComponentWithSentry(e, {
                  componentRoute: "/",
                  componentType: "Layout",
                  sentryTraceHeader: s,
                  baggageHeader: a,
                  headers: n,
                })
                .apply(t, r);
            },
          },
        );
        let f = void 0,
          g = void 0,
          v = void 0,
          b = s;
      },
      25149: (e, t, r) => {
        Promise.resolve().then(r.bind(r, 45117));
      },
      26564: (e) => {
        function t(e) {
          var t = Error("Cannot find module '" + e + "'");
          throw ((t.code = "MODULE_NOT_FOUND"), t);
        }
        (t.keys = () => []), (t.resolve = t), (t.id = 26564), (e.exports = t);
      },
      27910: (e) => {
        "use strict";
        e.exports = require("stream");
      },
      28169: (e, t, r) => {
        Promise.resolve().then(r.bind(r, 87113));
      },
      28191: (e, t, r) => {
        Promise.resolve().then(r.bind(r, 84792)),
          Promise.resolve().then(r.bind(r, 66561)),
          Promise.resolve().then(r.bind(r, 25052));
      },
      28354: (e) => {
        "use strict";
        e.exports = require("util");
      },
      28366: (e, t, r) => {
        "use strict";
        r.d(t, { B8: () => P, UC: () => A, bL: () => k, l9: () => q });
        var s = r(84205),
          a = r(28777),
          n = r(18047),
          o = r(59150),
          i = r(94653),
          l = r(78593),
          d = r(7839),
          c = r(48705),
          u = r(42414),
          p = r(61268),
          h = "Tabs",
          [m, x] = (0, n.A)(h, [o.RG]),
          f = (0, o.RG)(),
          [g, v] = m(h),
          b = s.forwardRef((e, t) => {
            let {
                __scopeTabs: r,
                value: s,
                onValueChange: a,
                defaultValue: n,
                orientation: o = "horizontal",
                dir: i,
                activationMode: m = "automatic",
                ...x
              } = e,
              f = (0, d.jH)(i),
              [v, b] = (0, c.i)({
                prop: s,
                onChange: a,
                defaultProp: n ?? "",
                caller: h,
              });
            return (0, p.jsx)(g, {
              scope: r,
              baseId: (0, u.B)(),
              value: v,
              onValueChange: b,
              orientation: o,
              dir: f,
              activationMode: m,
              children: (0, p.jsx)(l.sG.div, {
                dir: f,
                "data-orientation": o,
                ...x,
                ref: t,
              }),
            });
          });
        b.displayName = h;
        var w = "TabsList",
          y = s.forwardRef((e, t) => {
            let { __scopeTabs: r, loop: s = !0, ...a } = e,
              n = v(w, r),
              i = f(r);
            return (0, p.jsx)(o.bL, {
              asChild: !0,
              ...i,
              orientation: n.orientation,
              dir: n.dir,
              loop: s,
              children: (0, p.jsx)(l.sG.div, {
                role: "tablist",
                "aria-orientation": n.orientation,
                ...a,
                ref: t,
              }),
            });
          });
        y.displayName = w;
        var j = "TabsTrigger",
          N = s.forwardRef((e, t) => {
            let { __scopeTabs: r, value: s, disabled: n = !1, ...i } = e,
              d = v(j, r),
              c = f(r),
              u = S(d.baseId, s),
              h = E(d.baseId, s),
              m = s === d.value;
            return (0, p.jsx)(o.q7, {
              asChild: !0,
              ...c,
              focusable: !n,
              active: m,
              children: (0, p.jsx)(l.sG.button, {
                type: "button",
                role: "tab",
                "aria-selected": m,
                "aria-controls": h,
                "data-state": m ? "active" : "inactive",
                "data-disabled": n ? "" : void 0,
                disabled: n,
                id: u,
                ...i,
                ref: t,
                onMouseDown: (0, a.m)(e.onMouseDown, (e) => {
                  n || 0 !== e.button || !1 !== e.ctrlKey
                    ? e.preventDefault()
                    : d.onValueChange(s);
                }),
                onKeyDown: (0, a.m)(e.onKeyDown, (e) => {
                  [" ", "Enter"].includes(e.key) && d.onValueChange(s);
                }),
                onFocus: (0, a.m)(e.onFocus, () => {
                  let e = "manual" !== d.activationMode;
                  m || n || !e || d.onValueChange(s);
                }),
              }),
            });
          });
        N.displayName = j;
        var _ = "TabsContent",
          C = s.forwardRef((e, t) => {
            let {
                __scopeTabs: r,
                value: a,
                forceMount: n,
                children: o,
                ...d
              } = e,
              c = v(_, r),
              u = S(c.baseId, a),
              h = E(c.baseId, a),
              m = a === c.value,
              x = s.useRef(m);
            return (
              s.useEffect(() => {
                let e = requestAnimationFrame(() => (x.current = !1));
                return () => cancelAnimationFrame(e);
              }, []),
              (0, p.jsx)(i.C, {
                present: n || m,
                children: ({ present: r }) =>
                  (0, p.jsx)(l.sG.div, {
                    "data-state": m ? "active" : "inactive",
                    "data-orientation": c.orientation,
                    role: "tabpanel",
                    "aria-labelledby": u,
                    hidden: !r,
                    id: h,
                    tabIndex: 0,
                    ...d,
                    ref: t,
                    style: {
                      ...e.style,
                      animationDuration: x.current ? "0s" : void 0,
                    },
                    children: r && o,
                  }),
              })
            );
          });
        function S(e, t) {
          return `${e}-trigger-${t}`;
        }
        function E(e, t) {
          return `${e}-content-${t}`;
        }
        C.displayName = _;
        var k = b,
          P = y,
          q = N,
          A = C;
      },
      28909: (e, t, r) => {
        "use strict";
        r.a(e, async (e, s) => {
          try {
            r.d(t, { $: () => d, r: () => c });
            var a = r(61268),
              n = r(86415),
              o = r(91635);
            r(84205);
            var i = r(15942),
              l = e([i]);
            i = (l.then ? (await l)() : l)[0];
            let c = (0, o.F)(
              "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
              {
                variants: {
                  variant: {
                    default:
                      "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",
                    destructive:
                      "bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
                    outline:
                      "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
                    secondary:
                      "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
                    ghost:
                      "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
                    link: "text-primary underline-offset-4 hover:underline",
                  },
                  size: {
                    default: "h-9 px-4 py-2 has-[>svg]:px-3",
                    sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
                    lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
                    icon: "size-9",
                  },
                },
                defaultVariants: { variant: "default", size: "default" },
              },
            );
            function d({
              className: e,
              variant: t,
              size: r,
              asChild: s = !1,
              ...o
            }) {
              let l = s ? n.DX : "button";
              return (0, a.jsx)(l, {
                "data-slot": "button",
                className: (0, i.cn)(c({ variant: t, size: r, className: e })),
                ...o,
              });
            }
            s();
          } catch (e) {
            s(e);
          }
        });
      },
      29021: (e) => {
        "use strict";
        e.exports = require("fs");
      },
      29294: (e) => {
        "use strict";
        e.exports = require("next/dist/server/app-render/work-async-storage.external.js");
      },
      31421: (e) => {
        "use strict";
        e.exports = require("node:child_process");
      },
      33873: (e) => {
        "use strict";
        e.exports = require("path");
      },
      34196: (e, t, r) => {
        "use strict";
        r.r(t),
          r.d(t, {
            GlobalError: () => n.default,
            __next_app__: () => c,
            pages: () => d,
            routeModule: () => u,
            tree: () => l,
          });
        var s = r(11610),
          a = r(51293),
          n = r(59059),
          o = r(17770),
          i = {};
        for (let e in o)
          0 >
            [
              "default",
              "tree",
              "pages",
              "GlobalError",
              "__next_app__",
              "routeModule",
            ].indexOf(e) && (i[e] = () => o[e]);
        r.d(t, i);
        let l = {
            children: [
              "",
              {
                children: [
                  "[locale]",
                  {
                    children: [
                      "dashboard",
                      {
                        children: [
                          "__PAGE__",
                          {},
                          {
                            page: [
                              () => Promise.resolve().then(r.bind(r, 45117)),
                              "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\[locale]\\dashboard\\page.tsx",
                            ],
                          },
                        ],
                      },
                      {},
                    ],
                  },
                  {
                    layout: [
                      () => Promise.resolve().then(r.bind(r, 63249)),
                      "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\[locale]\\layout.tsx",
                    ],
                    "not-found": [
                      () => Promise.resolve().then(r.bind(r, 47995)),
                      "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\[locale]\\not-found.tsx",
                    ],
                  },
                ],
              },
              {
                layout: [
                  () => Promise.resolve().then(r.bind(r, 22630)),
                  "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\layout.tsx",
                ],
                error: [
                  () => Promise.resolve().then(r.bind(r, 94745)),
                  "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\error.tsx",
                ],
                "global-error": [
                  () => Promise.resolve().then(r.bind(r, 59059)),
                  "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\global-error.tsx",
                ],
                "not-found": [
                  () => Promise.resolve().then(r.bind(r, 53974)),
                  "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\not-found.tsx",
                ],
                forbidden: [
                  () => Promise.resolve().then(r.t.bind(r, 57382, 23)),
                  "next/dist/client/components/forbidden-error",
                ],
                unauthorized: [
                  () => Promise.resolve().then(r.t.bind(r, 87039, 23)),
                  "next/dist/client/components/unauthorized-error",
                ],
              },
            ],
          }.children,
          d = [
            "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\[locale]\\dashboard\\page.tsx",
          ],
          c = { require: r, loadChunk: () => Promise.resolve() },
          u = new s.AppPageRouteModule({
            definition: {
              kind: a.RouteKind.APP_PAGE,
              page: "/[locale]/dashboard/page",
              pathname: "/[locale]/dashboard",
              bundlePath: "",
              filename: "",
              appPaths: [],
            },
            userland: { loaderTree: l },
          });
      },
      34631: (e) => {
        "use strict";
        e.exports = require("tls");
      },
      36686: (e) => {
        "use strict";
        e.exports = require("diagnostics_channel");
      },
      37067: (e) => {
        "use strict";
        e.exports = require("node:http");
      },
      38522: (e) => {
        "use strict";
        e.exports = require("node:zlib");
      },
      41692: (e) => {
        "use strict";
        e.exports = require("node:tls");
      },
      43202: (e, t, r) => {
        "use strict";
        r.d(t, { A: () => s });
        let s = (0, r(95255).A)("Map", [
          [
            "polygon",
            {
              points: "3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21",
              key: "ok2ie8",
            },
          ],
          ["line", { x1: "9", x2: "9", y1: "3", y2: "18", key: "w34qz5" }],
          ["line", { x1: "15", x2: "15", y1: "6", y2: "21", key: "volv9a" }],
        ]);
      },
      44708: (e) => {
        "use strict";
        e.exports = require("node:https");
      },
      45117: (e, t, r) => {
        "use strict";
        let s;
        r.r(t),
          r.d(t, {
            default: () => h,
            generateImageMetadata: () => u,
            generateMetadata: () => c,
            generateViewport: () => p,
          });
        var a = r(63033),
          n = r(26394),
          o = r(60442),
          i = (0, n.registerClientReference)(
            function () {
              throw Error(
                "Attempted to call the default export of \"E:\\\\downloads\\\\Hijraah\\\\apps\\\\web\\\\src\\\\app\\\\[locale]\\\\dashboard\\\\page.tsx\" from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
              );
            },
            "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\[locale]\\dashboard\\page.tsx",
            "default",
          );
        let l = { ...a },
          d =
            "workUnitAsyncStorage" in l
              ? l.workUnitAsyncStorage
              : "requestAsyncStorage" in l
                ? l.requestAsyncStorage
                : void 0;
        s =
          "function" == typeof i
            ? new Proxy(i, {
                apply: (e, t, r) => {
                  let s, a, n;
                  try {
                    let e = d?.getStore();
                    (s = e?.headers.get("sentry-trace") ?? void 0),
                      (a = e?.headers.get("baggage") ?? void 0),
                      (n = e?.headers);
                  } catch (e) {}
                  return o
                    .wrapServerComponentWithSentry(e, {
                      componentRoute: "/[locale]/dashboard",
                      componentType: "Page",
                      sentryTraceHeader: s,
                      baggageHeader: a,
                      headers: n,
                    })
                    .apply(t, r);
                },
              })
            : i;
        let c = void 0,
          u = void 0,
          p = void 0,
          h = s;
      },
      46299: (e, t, r) => {
        "use strict";
        r.d(t, { A: () => s });
        let s = (0, r(95255).A)("Briefcase", [
          [
            "rect",
            {
              width: "20",
              height: "14",
              x: "2",
              y: "7",
              rx: "2",
              ry: "2",
              key: "eto64e",
            },
          ],
          [
            "path",
            { d: "M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16", key: "zwj3tp" },
          ],
        ]);
      },
      48161: (e) => {
        "use strict";
        e.exports = require("node:os");
      },
      53053: (e) => {
        "use strict";
        e.exports = require("node:diagnostics_channel");
      },
      53974: (e, t, r) => {
        "use strict";
        let s;
        r.r(t),
          r.d(t, {
            default: () => h,
            generateImageMetadata: () => u,
            generateMetadata: () => c,
            generateViewport: () => p,
          });
        var a = r(63033),
          n = r(26394),
          o = r(60442),
          i = (0, n.registerClientReference)(
            function () {
              throw Error(
                "Attempted to call the default export of \"E:\\\\downloads\\\\Hijraah\\\\apps\\\\web\\\\src\\\\app\\\\not-found.tsx\" from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
              );
            },
            "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\not-found.tsx",
            "default",
          );
        let l = { ...a },
          d =
            "workUnitAsyncStorage" in l
              ? l.workUnitAsyncStorage
              : "requestAsyncStorage" in l
                ? l.requestAsyncStorage
                : void 0;
        s =
          "function" == typeof i
            ? new Proxy(i, {
                apply: (e, t, r) => {
                  let s, a, n;
                  try {
                    let e = d?.getStore();
                    (s = e?.headers.get("sentry-trace") ?? void 0),
                      (a = e?.headers.get("baggage") ?? void 0),
                      (n = e?.headers);
                  } catch (e) {}
                  return o
                    .wrapServerComponentWithSentry(e, {
                      componentRoute: "/",
                      componentType: "Not-found",
                      sentryTraceHeader: s,
                      baggageHeader: a,
                      headers: n,
                    })
                    .apply(t, r);
                },
              })
            : i;
        let c = void 0,
          u = void 0,
          p = void 0,
          h = s;
      },
      55511: (e) => {
        "use strict";
        e.exports = require("crypto");
      },
      55591: (e) => {
        "use strict";
        e.exports = require("https");
      },
      56460: (e, t, r) => {
        "use strict";
        r.r(t), r.d(t, { default: () => n });
        var s = r(61268),
          a = r(89882);
        function n() {
          return (
            (0, a.useRouter)(),
            (0, s.jsxs)("div", {
              className:
                "flex flex-col items-center justify-center min-h-screen py-2",
              children: [
                (0, s.jsx)("h1", {
                  className: "text-4xl font-bold",
                  children: "Page Not Found",
                }),
                (0, s.jsx)("p", {
                  className: "mt-3 text-xl",
                  children: "Redirecting to home page...",
                }),
              ],
            })
          );
        }
        r(84205), r(58702);
      },
      57075: (e) => {
        "use strict";
        e.exports = require("node:stream");
      },
      57975: (e) => {
        "use strict";
        e.exports = require("node:util");
      },
      58702: (e, t, r) => {
        "use strict";
        r.d(t, {
          IB: () => s,
          V8: () => i,
          XG: () => o,
          o0: () => n,
          q: () => a,
        });
        let s = ["en", "ar", "es", "fr"],
          a = "en",
          n = {
            en: {
              nativeName: "English",
              englishName: "English",
              direction: "ltr",
              dateFormat: "MM/DD/YYYY",
              flag: "\uD83C\uDDFA\uD83C\uDDF8",
              htmlLang: "en",
              calendar: "gregory",
              number: { decimal: ".", thousands: "," },
            },
            ar: {
              nativeName: "العربية",
              englishName: "Arabic",
              direction: "rtl",
              dateFormat: "DD/MM/YYYY",
              flag: "\uD83C\uDDF8\uD83C\uDDE6",
              htmlLang: "ar",
              calendar: "islamic",
              fontClass: "font-arabic",
              number: { decimal: "٫", thousands: "٬" },
            },
            fr: {
              nativeName: "Fran\xe7ais",
              englishName: "French",
              direction: "ltr",
              dateFormat: "DD/MM/YYYY",
              flag: "\uD83C\uDDEB\uD83C\uDDF7",
              htmlLang: "fr",
              calendar: "gregory",
              number: { decimal: ",", thousands: " " },
            },
            es: {
              nativeName: "Espa\xf1ol",
              englishName: "Spanish",
              direction: "ltr",
              dateFormat: "DD/MM/YYYY",
              flag: "\uD83C\uDDEA\uD83C\uDDF8",
              htmlLang: "es",
              calendar: "gregory",
              number: { decimal: ",", thousands: "." },
            },
          };
        function o(e) {
          return n[e] || n[a];
        }
        function i(e) {
          return "rtl" === o(e).direction;
        }
      },
      59059: (e, t, r) => {
        "use strict";
        r.r(t), r.d(t, { default: () => s });
        let s = (0, r(26394).registerClientReference)(
          function () {
            throw Error(
              "Attempted to call the default export of \"E:\\\\downloads\\\\Hijraah\\\\apps\\\\web\\\\src\\\\app\\\\global-error.tsx\" from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\global-error.tsx",
          "default",
        );
      },
      59150: (e, t, r) => {
        "use strict";
        r.d(t, { RG: () => y, bL: () => q, q7: () => A });
        var s = r(84205),
          a = r(28777),
          n = r(28029),
          o = r(71604),
          i = r(18047),
          l = r(42414),
          d = r(78593),
          c = r(10308),
          u = r(48705),
          p = r(7839),
          h = r(61268),
          m = "rovingFocusGroup.onEntryFocus",
          x = { bubbles: !1, cancelable: !0 },
          f = "RovingFocusGroup",
          [g, v, b] = (0, n.N)(f),
          [w, y] = (0, i.A)(f, [b]),
          [j, N] = w(f),
          _ = s.forwardRef((e, t) =>
            (0, h.jsx)(g.Provider, {
              scope: e.__scopeRovingFocusGroup,
              children: (0, h.jsx)(g.Slot, {
                scope: e.__scopeRovingFocusGroup,
                children: (0, h.jsx)(C, { ...e, ref: t }),
              }),
            }),
          );
        _.displayName = f;
        var C = s.forwardRef((e, t) => {
            let {
                __scopeRovingFocusGroup: r,
                orientation: n,
                loop: i = !1,
                dir: l,
                currentTabStopId: g,
                defaultCurrentTabStopId: b,
                onCurrentTabStopIdChange: w,
                onEntryFocus: y,
                preventScrollOnEntryFocus: N = !1,
                ..._
              } = e,
              C = s.useRef(null),
              S = (0, o.s)(t, C),
              E = (0, p.jH)(l),
              [k, q] = (0, u.i)({
                prop: g,
                defaultProp: b ?? null,
                onChange: w,
                caller: f,
              }),
              [A, D] = s.useState(!1),
              I = (0, c.c)(y),
              T = v(r),
              R = s.useRef(!1),
              [F, M] = s.useState(0);
            return (
              s.useEffect(() => {
                let e = C.current;
                if (e)
                  return (
                    e.addEventListener(m, I), () => e.removeEventListener(m, I)
                  );
              }, [I]),
              (0, h.jsx)(j, {
                scope: r,
                orientation: n,
                dir: E,
                loop: i,
                currentTabStopId: k,
                onItemFocus: s.useCallback((e) => q(e), [q]),
                onItemShiftTab: s.useCallback(() => D(!0), []),
                onFocusableItemAdd: s.useCallback(() => M((e) => e + 1), []),
                onFocusableItemRemove: s.useCallback(() => M((e) => e - 1), []),
                children: (0, h.jsx)(d.sG.div, {
                  tabIndex: A || 0 === F ? -1 : 0,
                  "data-orientation": n,
                  ..._,
                  ref: S,
                  style: { outline: "none", ...e.style },
                  onMouseDown: (0, a.m)(e.onMouseDown, () => {
                    R.current = !0;
                  }),
                  onFocus: (0, a.m)(e.onFocus, (e) => {
                    let t = !R.current;
                    if (e.target === e.currentTarget && t && !A) {
                      let t = new CustomEvent(m, x);
                      if (
                        (e.currentTarget.dispatchEvent(t), !t.defaultPrevented)
                      ) {
                        let e = T().filter((e) => e.focusable);
                        P(
                          [
                            e.find((e) => e.active),
                            e.find((e) => e.id === k),
                            ...e,
                          ]
                            .filter(Boolean)
                            .map((e) => e.ref.current),
                          N,
                        );
                      }
                    }
                    R.current = !1;
                  }),
                  onBlur: (0, a.m)(e.onBlur, () => D(!1)),
                }),
              })
            );
          }),
          S = "RovingFocusGroupItem",
          E = s.forwardRef((e, t) => {
            let {
                __scopeRovingFocusGroup: r,
                focusable: n = !0,
                active: o = !1,
                tabStopId: i,
                children: c,
                ...u
              } = e,
              p = (0, l.B)(),
              m = i || p,
              x = N(S, r),
              f = x.currentTabStopId === m,
              b = v(r),
              {
                onFocusableItemAdd: w,
                onFocusableItemRemove: y,
                currentTabStopId: j,
              } = x;
            return (
              s.useEffect(() => {
                if (n) return w(), () => y();
              }, [n, w, y]),
              (0, h.jsx)(g.ItemSlot, {
                scope: r,
                id: m,
                focusable: n,
                active: o,
                children: (0, h.jsx)(d.sG.span, {
                  tabIndex: f ? 0 : -1,
                  "data-orientation": x.orientation,
                  ...u,
                  ref: t,
                  onMouseDown: (0, a.m)(e.onMouseDown, (e) => {
                    n ? x.onItemFocus(m) : e.preventDefault();
                  }),
                  onFocus: (0, a.m)(e.onFocus, () => x.onItemFocus(m)),
                  onKeyDown: (0, a.m)(e.onKeyDown, (e) => {
                    if ("Tab" === e.key && e.shiftKey)
                      return void x.onItemShiftTab();
                    if (e.target !== e.currentTarget) return;
                    let t = (function (e, t, r) {
                      var s;
                      let a =
                        ((s = e.key),
                        "rtl" !== r
                          ? s
                          : "ArrowLeft" === s
                            ? "ArrowRight"
                            : "ArrowRight" === s
                              ? "ArrowLeft"
                              : s);
                      if (
                        !(
                          "vertical" === t &&
                          ["ArrowLeft", "ArrowRight"].includes(a)
                        ) &&
                        !(
                          "horizontal" === t &&
                          ["ArrowUp", "ArrowDown"].includes(a)
                        )
                      )
                        return k[a];
                    })(e, x.orientation, x.dir);
                    if (void 0 !== t) {
                      if (e.metaKey || e.ctrlKey || e.altKey || e.shiftKey)
                        return;
                      e.preventDefault();
                      let r = b()
                        .filter((e) => e.focusable)
                        .map((e) => e.ref.current);
                      if ("last" === t) r.reverse();
                      else if ("prev" === t || "next" === t) {
                        "prev" === t && r.reverse();
                        let s = r.indexOf(e.currentTarget);
                        r = x.loop
                          ? (function (e, t) {
                              return e.map((r, s) => e[(t + s) % e.length]);
                            })(r, s + 1)
                          : r.slice(s + 1);
                      }
                      setTimeout(() => P(r));
                    }
                  }),
                  children:
                    "function" == typeof c
                      ? c({ isCurrentTabStop: f, hasTabStop: null != j })
                      : c,
                }),
              })
            );
          });
        E.displayName = S;
        var k = {
          ArrowLeft: "prev",
          ArrowUp: "prev",
          ArrowRight: "next",
          ArrowDown: "next",
          PageUp: "first",
          Home: "first",
          PageDown: "last",
          End: "last",
        };
        function P(e, t = !1) {
          let r = document.activeElement;
          for (let s of e)
            if (
              s === r ||
              (s.focus({ preventScroll: t }), document.activeElement !== r)
            )
              return;
        }
        var q = _,
          A = E;
      },
      59893: (e, t, r) => {
        Promise.resolve().then(r.bind(r, 87447));
      },
      63017: (e, t, r) => {
        Promise.resolve().then(r.bind(r, 59059));
      },
      63033: (e) => {
        "use strict";
        e.exports = require("next/dist/server/app-render/work-unit-async-storage.external.js");
      },
      69621: (e, t, r) => {
        Promise.resolve().then(r.bind(r, 94745));
      },
      73024: (e) => {
        "use strict";
        e.exports = require("node:fs");
      },
      73566: (e) => {
        "use strict";
        e.exports = require("worker_threads");
      },
      74075: (e) => {
        "use strict";
        e.exports = require("zlib");
      },
      74619: (e) => {
        function t(e) {
          var t = Error("Cannot find module '" + e + "'");
          throw ((t.code = "MODULE_NOT_FOUND"), t);
        }
        (t.keys = () => []), (t.resolve = t), (t.id = 74619), (e.exports = t);
      },
      74998: (e) => {
        "use strict";
        e.exports = require("perf_hooks");
      },
      75919: (e) => {
        "use strict";
        e.exports = require("node:worker_threads");
      },
      76760: (e) => {
        "use strict";
        e.exports = require("node:path");
      },
      77030: (e) => {
        "use strict";
        e.exports = require("node:net");
      },
      77032: (e, t, r) => {
        Promise.resolve().then(r.t.bind(r, 11299, 23)),
          Promise.resolve().then(r.t.bind(r, 81119, 23)),
          Promise.resolve().then(r.t.bind(r, 68259, 23)),
          Promise.resolve().then(r.t.bind(r, 36914, 23)),
          Promise.resolve().then(r.t.bind(r, 15142, 23)),
          Promise.resolve().then(r.t.bind(r, 98554, 23)),
          Promise.resolve().then(r.t.bind(r, 88424, 23)),
          Promise.resolve().then(r.t.bind(r, 64834, 23));
      },
      77598: (e) => {
        "use strict";
        e.exports = require("node:crypto");
      },
      79428: (e) => {
        "use strict";
        e.exports = require("buffer");
      },
      79551: (e) => {
        "use strict";
        e.exports = require("url");
      },
      79646: (e) => {
        "use strict";
        e.exports = require("child_process");
      },
      80481: (e) => {
        "use strict";
        e.exports = require("node:readline");
      },
      81630: (e) => {
        "use strict";
        e.exports = require("http");
      },
      83997: (e) => {
        "use strict";
        e.exports = require("tty");
      },
      84297: (e) => {
        "use strict";
        e.exports = require("async_hooks");
      },
      85488: (e) => {
        "use strict";
        e.exports = import("ai");
      },
      86592: (e) => {
        "use strict";
        e.exports = require("node:inspector");
      },
      87113: (e, t, r) => {
        "use strict";
        r.a(e, async (e, s) => {
          try {
            r.r(t), r.d(t, { default: () => i });
            var a = r(61268);
            r(86896), r(84205);
            var n = r(28909),
              o = e([n]);
            function i({ error: e, reset: t }) {
              return (0, a.jsx)("html", {
                children: (0, a.jsx)("body", {
                  children: (0, a.jsxs)("div", {
                    className:
                      "flex min-h-screen flex-col items-center justify-center p-4 text-center",
                    children: [
                      (0, a.jsx)("h1", {
                        className: "text-4xl font-bold mb-4",
                        children: "Something went wrong!",
                      }),
                      (0, a.jsx)("p", {
                        className: "text-xl mb-8",
                        children: e.message || "An unexpected error occurred",
                      }),
                      (0, a.jsxs)("div", {
                        className: "space-x-4",
                        children: [
                          (0, a.jsx)(n.$, {
                            onClick: () => t(),
                            children: "Try again",
                          }),
                          (0, a.jsx)(n.$, {
                            variant: "outline",
                            onClick: () => (window.location.href = "/"),
                            children: "Go home",
                          }),
                        ],
                      }),
                      !1,
                    ],
                  }),
                }),
              });
            }
            (n = (o.then ? (await o)() : o)[0]), s();
          } catch (e) {
            s(e);
          }
        });
      },
      87282: (e, t, r) => {
        Promise.resolve().then(r.bind(r, 5503));
      },
      87447: (e, t, r) => {
        "use strict";
        r.a(e, async (e, s) => {
          try {
            r.r(t), r.d(t, { default: () => i });
            var a = r(61268);
            r(84205);
            var n = r(28909),
              o = e([n]);
            function i({ error: e, reset: t }) {
              return (0, a.jsx)("div", {
                className: "flex h-screen",
                children: (0, a.jsxs)("div", {
                  className: "m-auto text-center space-y-4",
                  children: [
                    (0, a.jsx)("h2", {
                      className: "text-2xl font-bold",
                      children: "Something went wrong!",
                    }),
                    (0, a.jsx)("p", {
                      className: "text-muted-foreground",
                      children: e.message,
                    }),
                    (0, a.jsx)(n.$, {
                      onClick: () => t(),
                      variant: "outline",
                      children: "Try again",
                    }),
                  ],
                }),
              });
            }
            (n = (o.then ? (await o)() : o)[0]), s();
          } catch (e) {
            s(e);
          }
        });
      },
      89783: (e, t, r) => {
        Promise.resolve().then(r.bind(r, 53974));
      },
      90184: (e, t, r) => {
        Promise.resolve().then(r.t.bind(r, 2938, 23)),
          Promise.resolve().then(r.t.bind(r, 65405, 23)),
          Promise.resolve().then(r.t.bind(r, 83573, 23)),
          Promise.resolve().then(r.t.bind(r, 35348, 23)),
          Promise.resolve().then(r.t.bind(r, 39308, 23)),
          Promise.resolve().then(r.t.bind(r, 4784, 23)),
          Promise.resolve().then(r.t.bind(r, 60830, 23)),
          Promise.resolve().then(r.t.bind(r, 84360, 23));
      },
      91645: (e) => {
        "use strict";
        e.exports = require("net");
      },
      93206: () => {},
      94511: (e, t, r) => {
        Promise.resolve().then(r.bind(r, 56460));
      },
      94735: (e) => {
        "use strict";
        e.exports = require("events");
      },
      94745: (e, t, r) => {
        "use strict";
        r.r(t), r.d(t, { default: () => s });
        let s = (0, r(26394).registerClientReference)(
          function () {
            throw Error(
              "Attempted to call the default export of \"E:\\\\downloads\\\\Hijraah\\\\apps\\\\web\\\\src\\\\app\\\\error.tsx\" from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\error.tsx",
          "default",
        );
      },
      96708: (e) => {
        function t(e) {
          var t = Error("Cannot find module '" + e + "'");
          throw ((t.code = "MODULE_NOT_FOUND"), t);
        }
        (t.keys = () => []), (t.resolve = t), (t.id = 96708), (e.exports = t);
      },
      97927: (e, t, r) => {
        Promise.resolve().then(r.bind(r, 51433)),
          Promise.resolve().then(r.bind(r, 59107)),
          Promise.resolve().then(r.bind(r, 39862));
      },
    });
  var t = require("../../../webpack-runtime.js");
  t.C(e);
  var r = (e) => t((t.s = e)),
    s = t.X(
      0,
      [
        827, 6518, 2033, 4027, 2872, 7713, 5149, 8859, 1655, 8029, 5728, 9729,
        3390, 4990, 6188, 7911, 7401, 5124, 7272, 3042, 385, 7393, 4486, 7018,
        4763, 7333, 7145, 9207, 1578, 8264, 27, 7935, 7251,
      ],
      () => r(34196),
    );
  module.exports = s;
})();
//# sourceMappingURL=page.js.map
