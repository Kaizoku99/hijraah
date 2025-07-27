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
    (e._sentryDebugIds[s] = "20daf6d4-e51d-4410-b770-9a84ced1d0e9"),
    (e._sentryDebugIdIdentifier =
      "sentry-dbid-20daf6d4-e51d-4410-b770-9a84ced1d0e9"));
} catch (e) {}
(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [8133],
  {
    71786: (e, s, a) => {
      "use strict";
      a.r(s), a.d(s, { default: () => S });
      var t = a(30602),
        n = a(41960),
        i = a(68454),
        r = a(76208),
        c = a(5071),
        l = a(1510),
        d = a(72170),
        o = a(35752),
        h = a(49921),
        m = a(85218),
        u = a(26600),
        x = a(5271),
        p = a(77413),
        f = a(4401),
        j = a(88542),
        g = a(86697),
        v = a(53658);
      function y(e) {
        let {
            initialSessions: s,
            onSessionSelect: a,
            onSessionCreate: n,
            onSessionDelete: o,
            onSessionArchive: h,
            initialSelectedSessionId: u,
          } = e,
          [j, y] = (0, m.useState)([]),
          [N, D] = (0, m.useState)([]),
          [S, A] = (0, m.useState)(""),
          [C, R] = (0, m.useState)(null),
          [T, I] = (0, m.useState)(!0),
          [k, B] = (0, m.useState)("all");
        (0, m.useEffect)(() => {
          (async () => {
            await new Promise((e) => setTimeout(e, 1e3));
            let e = s || b;
            if ((y(e), D(e), I(!1), u)) {
              let s = e.find((e) => e.id === u);
              s && (R(s), a && a(s));
            }
          })();
        }, [s, u, a]),
          (0, m.useEffect)(() => {
            let e = [...j];
            S &&
              (e = e.filter(
                (e) =>
                  e.title.toLowerCase().includes(S.toLowerCase()) ||
                  e.description.toLowerCase().includes(S.toLowerCase()) ||
                  e.category.toLowerCase().includes(S.toLowerCase()),
              )),
              "all" !== k && (e = e.filter((e) => e.status === k)),
              D(e);
          }, [j, S, k]);
        let L = (e) => {
            R(e), a && a(e);
          },
          E = (e) => {
            y(j.filter((s) => s.id !== e)),
              (null == C ? void 0 : C.id) === e && R(null),
              o && o(e);
          },
          P = (e) => {
            y(
              j.map((s) =>
                s.id === e
                  ? { ...s, status: "archived", updatedAt: new Date() }
                  : s,
              ),
            ),
              h && h(e);
          };
        return (0, t.jsxs)("div", {
          className: "grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-4",
          children: [
            (0, t.jsxs)("div", {
              className: "md:col-span-1 space-y-4",
              children: [
                (0, t.jsxs)("div", {
                  className: "flex items-center justify-between",
                  children: [
                    (0, t.jsx)("h2", {
                      className: "text-xl font-bold",
                      children: "Research Sessions",
                    }),
                    (0, t.jsxs)(x.$, {
                      onClick: () => {
                        let e = {
                          id: "session-".concat(Date.now()),
                          title: "New Research Session",
                          description: "Click to add description",
                          createdAt: new Date(),
                          updatedAt: new Date(),
                          status: "active",
                          createdBy: { id: "user-1", name: "Current User" },
                          category: "General",
                        };
                        y([e, ...j]), n && n(e), R(e);
                      },
                      size: "sm",
                      children: [
                        (0, t.jsx)(l.A, { className: "w-4 h-4 mr-2" }),
                        "New",
                      ],
                    }),
                  ],
                }),
                (0, t.jsxs)("div", {
                  className: "relative",
                  children: [
                    (0, t.jsx)(d.A, {
                      className:
                        "absolute left-2.5 top-2.5 h-4 w-4 text-gray-500",
                    }),
                    (0, t.jsx)(f.p, {
                      type: "search",
                      placeholder: "Search sessions...",
                      className: "pl-8",
                      value: S,
                      onChange: (e) => A(e.target.value),
                    }),
                  ],
                }),
                (0, t.jsxs)(g.Tabs, {
                  defaultValue: "all",
                  children: [
                    (0, t.jsxs)(g.TabsList, {
                      className: "grid w-full grid-cols-3",
                      children: [
                        (0, t.jsx)(g.TabsTrigger, {
                          value: "all",
                          onClick: () => B("all"),
                          children: "All",
                        }),
                        (0, t.jsx)(g.TabsTrigger, {
                          value: "active",
                          onClick: () => B("active"),
                          children: "Active",
                        }),
                        (0, t.jsx)(g.TabsTrigger, {
                          value: "archived",
                          onClick: () => B("archived"),
                          children: "Archived",
                        }),
                      ],
                    }),
                    (0, t.jsx)(g.TabsContent, {
                      value: "all",
                      className: "space-y-0 mt-2",
                      children: (0, t.jsx)(w, {
                        sessions: N,
                        selectedId: null == C ? void 0 : C.id,
                        onSelect: L,
                        isLoading: T,
                      }),
                    }),
                    (0, t.jsx)(g.TabsContent, {
                      value: "active",
                      className: "space-y-0 mt-2",
                      children: (0, t.jsx)(w, {
                        sessions: N,
                        selectedId: null == C ? void 0 : C.id,
                        onSelect: L,
                        isLoading: T,
                      }),
                    }),
                    (0, t.jsx)(g.TabsContent, {
                      value: "archived",
                      className: "space-y-0 mt-2",
                      children: (0, t.jsx)(w, {
                        sessions: N,
                        selectedId: null == C ? void 0 : C.id,
                        onSelect: L,
                        isLoading: T,
                      }),
                    }),
                  ],
                }),
              ],
            }),
            (0, t.jsx)("div", {
              className: "md:col-span-2 lg:col-span-3",
              children: (0, t.jsx)(() => {
                let [e, s] = (0, m.useState)(!1),
                  [a, n] = (0, m.useState)(null);
                if (!C)
                  return (0, t.jsxs)("div", {
                    className:
                      "flex flex-col items-center justify-center h-full p-8 text-center text-gray-500",
                    children: [
                      (0, t.jsx)("h3", {
                        className: "text-xl font-medium",
                        children: "No Session Selected",
                      }),
                      (0, t.jsx)("p", {
                        className: "mt-2",
                        children:
                          "Select a research session from the list or create a new one",
                      }),
                    ],
                  });
                let l = async (e, a) => {
                  s(!0),
                    await new Promise((e) => setTimeout(e, 1500)),
                    n(
                      'Results for query "'
                        .concat(e, '" on session "')
                        .concat(C.title, '". Options: ')
                        .concat(JSON.stringify(a)),
                    ),
                    s(!1);
                };
                return (0, t.jsx)("div", {
                  className: "h-full overflow-auto",
                  children: (0, t.jsxs)(p.Zp, {
                    className: "h-full",
                    children: [
                      (0, t.jsxs)(p.aR, {
                        children: [
                          (0, t.jsx)(p.ZB, { children: C.title }),
                          (0, t.jsxs)(p.BT, {
                            children: [
                              "Created",
                              " ",
                              (0, i.m)(C.createdAt, { addSuffix: !0 }),
                            ],
                          }),
                        ],
                      }),
                      (0, t.jsx)(p.Wu, {
                        children: (0, t.jsxs)("div", {
                          className: "space-y-4",
                          children: [
                            (0, t.jsxs)("div", {
                              children: [
                                (0, t.jsx)("h3", {
                                  className:
                                    "text-sm font-medium text-gray-500",
                                  children: "Description",
                                }),
                                (0, t.jsx)("p", {
                                  className: "mt-1",
                                  children: C.description,
                                }),
                              ],
                            }),
                            (0, t.jsxs)("div", {
                              children: [
                                (0, t.jsx)("h3", {
                                  className:
                                    "text-sm font-medium text-gray-500",
                                  children: "Category",
                                }),
                                (0, t.jsx)("p", {
                                  className: "mt-1",
                                  children: C.category,
                                }),
                              ],
                            }),
                            C.caseId &&
                              (0, t.jsxs)("div", {
                                children: [
                                  (0, t.jsx)("h3", {
                                    className:
                                      "text-sm font-medium text-gray-500",
                                    children: "Related Case",
                                  }),
                                  (0, t.jsx)("p", {
                                    className: "mt-1",
                                    children: C.caseId,
                                  }),
                                ],
                              }),
                            C.notes &&
                              (0, t.jsxs)("div", {
                                children: [
                                  (0, t.jsx)("h3", {
                                    className:
                                      "text-sm font-medium text-gray-500",
                                    children: "Notes",
                                  }),
                                  (0, t.jsx)("p", {
                                    className: "mt-1 whitespace-pre-line",
                                    children: C.notes,
                                  }),
                                ],
                              }),
                            (0, t.jsx)(v.c, {
                              onResearch: l,
                              isLoading: e,
                              results: a,
                            }),
                          ],
                        }),
                      }),
                      (0, t.jsx)(p.wL, {
                        children: (0, t.jsxs)("div", {
                          className: "flex justify-between w-full",
                          children: [
                            (0, t.jsxs)(x.$, {
                              variant: "outline",
                              size: "sm",
                              onClick: () => P(C.id),
                              children: [
                                (0, t.jsx)(r.A, { className: "w-4 h-4 mr-2" }),
                                "Archive",
                              ],
                            }),
                            (0, t.jsxs)(x.$, {
                              variant: "destructive",
                              size: "sm",
                              onClick: () => E(C.id),
                              children: [
                                (0, t.jsx)(c.A, { className: "w-4 h-4 mr-2" }),
                                "Delete",
                              ],
                            }),
                          ],
                        }),
                      }),
                    ],
                  }),
                });
              }, {}),
            }),
          ],
        });
      }
      function w(e) {
        let { sessions: s, selectedId: a, onSelect: n, isLoading: r } = e;
        return r
          ? (0, t.jsx)("div", {
              className: "space-y-2",
              children: Array.from({ length: 5 }).map((e, s) =>
                (0, t.jsx)(N, {}, s),
              ),
            })
          : 0 === s.length
            ? (0, t.jsx)("div", {
                className: "p-4 text-center border rounded-md",
                children: (0, t.jsx)("p", {
                  className: "text-sm text-gray-500",
                  children: "No sessions found",
                }),
              })
            : (0, t.jsx)("div", {
                className: "space-y-2",
                children: s.map((e) =>
                  (0, t.jsxs)(
                    p.Zp,
                    {
                      className:
                        "cursor-pointer hover:bg-gray-50 transition-colors ".concat(
                          a === e.id ? "border-primary" : "",
                        ),
                      onClick: () => n(e),
                      children: [
                        (0, t.jsx)(p.aR, {
                          className: "p-4",
                          children: (0, t.jsxs)("div", {
                            className: "flex justify-between items-start",
                            children: [
                              (0, t.jsxs)("div", {
                                children: [
                                  (0, t.jsx)(p.ZB, {
                                    className: "text-base",
                                    children: e.title,
                                  }),
                                  (0, t.jsx)(p.BT, {
                                    className: "text-xs",
                                    children:
                                      e.description.length > 60
                                        ? "".concat(
                                            e.description.substring(0, 60),
                                            "...",
                                          )
                                        : e.description,
                                  }),
                                ],
                              }),
                              (0, t.jsx)(u.E, {
                                variant:
                                  "active" === e.status
                                    ? "default"
                                    : (e.status, "secondary"),
                                children: e.status,
                              }),
                            ],
                          }),
                        }),
                        (0, t.jsx)(p.wL, {
                          className: "p-4 pt-0 text-xs text-gray-500",
                          children: (0, t.jsxs)("div", {
                            className: "flex items-center gap-4",
                            children: [
                              (0, t.jsxs)("div", {
                                className: "flex items-center",
                                children: [
                                  (0, t.jsx)(o.A, {
                                    className: "w-3 h-3 mr-1",
                                  }),
                                  (0, i.m)(e.updatedAt, { addSuffix: !0 }),
                                ],
                              }),
                              (0, t.jsxs)("div", {
                                className: "flex items-center",
                                children: [
                                  (0, t.jsx)(h.A, {
                                    className: "w-3 h-3 mr-1",
                                  }),
                                  e.createdBy.name,
                                ],
                              }),
                            ],
                          }),
                        }),
                      ],
                    },
                    e.id,
                  ),
                ),
              });
      }
      function N() {
        return (0, t.jsxs)(p.Zp, {
          children: [
            (0, t.jsxs)(p.aR, {
              className: "p-4",
              children: [
                (0, t.jsx)(j.E, { className: "h-5 w-3/4" }),
                (0, t.jsx)(j.E, { className: "h-4 w-full mt-2" }),
              ],
            }),
            (0, t.jsx)(p.wL, {
              className: "p-4 pt-0",
              children: (0, t.jsx)(j.E, { className: "h-3 w-1/2" }),
            }),
          ],
        });
      }
      let b = [
        {
          id: "1",
          title: "Visa Requirements Research",
          description:
            "Research on eligibility requirements for work visas in the UK",
          createdAt: new Date(Date.now() - 1728e5),
          updatedAt: new Date(Date.now() - 432e5),
          status: "active",
          createdBy: {
            id: "user-1",
            name: "Jane Smith",
            avatarUrl: "/avatars/jane-smith.png",
          },
          caseId: "case-12345",
          category: "Work Visas",
          notes:
            "Client needs to know about the latest changes to Skilled Worker Visa requirements.",
        },
        {
          id: "2",
          title: "Family Reunification Process",
          description:
            "Analysis of documentation needed for family reunification applications",
          createdAt: new Date(Date.now() - 432e6),
          updatedAt: new Date(Date.now() - 864e5),
          status: "active",
          createdBy: { id: "user-2", name: "John Davis" },
          category: "Family Visas",
        },
        {
          id: "3",
          title: "Student Visa Extensions",
          description:
            "Research on policy changes affecting student visa extensions post-graduation",
          createdAt: new Date(Date.now() - 864e6),
          updatedAt: new Date(Date.now() - 864e6),
          status: "archived",
          createdBy: {
            id: "user-1",
            name: "Jane Smith",
            avatarUrl: "/avatars/jane-smith.png",
          },
          category: "Student Visas",
        },
        {
          id: "4",
          title: "Asylum Procedure Updates",
          description:
            "Summary of recent changes to asylum application procedures and processing times",
          createdAt: new Date(Date.now() - 2592e5),
          updatedAt: new Date(Date.now() - 216e5),
          status: "active",
          createdBy: { id: "user-3", name: "Michael Chen" },
          caseId: "case-67890",
          category: "Asylum",
          notes:
            "Need to compile a comprehensive guide for legal team reference.",
        },
        {
          id: "5",
          title: "Brexit Impact Analysis",
          description:
            "Analysis of Brexit impacts on EEA nationals currently residing in the UK",
          createdAt: new Date(Date.now() - 2592e6),
          updatedAt: new Date(Date.now() - 1296e6),
          status: "completed",
          createdBy: { id: "user-2", name: "John Davis" },
          category: "Policy Analysis",
          notes:
            "This research has been completed and findings have been compiled into a report for clients.",
        },
      ];
      function D() {
        return (0, t.jsxs)(p.Zp, {
          className: "mt-8",
          children: [
            (0, t.jsxs)(p.aR, {
              children: [
                (0, t.jsx)(p.ZB, { children: "Deep Research Implementation" }),
                (0, t.jsx)(p.BT, {
                  children:
                    "Architecture overview of the Deep Research feature",
                }),
              ],
            }),
            (0, t.jsx)(p.Wu, {
              children: (0, t.jsx)("div", {
                className: "border rounded-md p-4",
                children: (0, t.jsx)("pre", {
                  className: "text-xs overflow-auto",
                  children:
                    "\nDeep Research Architecture:\n\n1. Context & State Management\n   ├── DeepResearchProvider (src/lib/contexts/deep-research-context.tsx)\n   │   └── Manages state via reducer pattern\n   │       ├── sources: Research sources\n   │       ├── activity: Research activities\n   │       ├── depth: Current and max research depth\n   │       └── progress: Steps completed and total\n   └── useDeepResearch() hook (src/lib/hooks/useDeepResearch.ts)\n       └── Provides API for research operations\n           ├── startResearch(): Begin a research session\n           ├── addSource(): Add a research source\n           ├── addActivity(): Record a research step\n           └── Other utility functions\n\n2. UI Components\n   ├── ResearchSessionManager (src/components/ui/research/session-manager.tsx)\n   │   └── Manages research sessions\n   │       ├── Lists all research sessions\n   │       ├── Filtering and searching\n   │       ├── Creation and deletion\n   │       └── Displays selected session\n   └── DeepResearch (src/components/ui/research/deep-research.tsx)\n       └── Displays research results\n           ├── Shows progress bars\n           ├── Lists sources with relevance\n           ├── Shows activity log\n           └── Displays research findings\n\n3. API Integration\n   // TODO: Update API route path if necessary after consolidation\n   └── API Routes (src/app/api/deep-research/route.ts) \n       ├── POST /api/deep-research: Start research\n       └── GET /api/deep-research: Get results\n\n4. Persistence\n   ├── Supabase Tables\n   │   ├── research_sessions: Stores session metadata\n   │   ├── research_sources: Stores research sources\n   │   └── research_findings: Stores research activities and findings\n   └── SessionStorage (for client-side caching)\n            ",
                }),
              }),
            }),
          ],
        });
      }
      function S() {
        let e = (0, n.useSearchParams)().get("session") || void 0;
        return (0, t.jsxs)("div", {
          className: "container py-8",
          children: [
            (0, t.jsx)("h1", {
              className: "text-3xl font-bold mb-6",
              children: "Unified Research Center",
            }),
            (0, t.jsx)("p", {
              className: "text-muted-foreground mb-8",
              children:
                "Create and manage research sessions for immigration cases and documents. Each session can utilize AI-powered deep research to gather information.",
            }),
            (0, t.jsx)(y, { initialSelectedSessionId: e }),
            (0, t.jsx)(D, {}),
          ],
        });
      }
    },
    72677: (e, s, a) => {
      Promise.resolve().then(a.bind(a, 71786));
    },
  },
  (e) => {
    var s = (s) => e((e.s = s));
    e.O(0, [6593, 4223, 3209, 7358], () => s(72677)), (_N_E = e.O());
  },
]);
