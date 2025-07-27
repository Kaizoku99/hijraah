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
    (e._sentryDebugIds[s] = "8d014d05-a239-4d8e-afae-8b0ef10f0954"),
    (e._sentryDebugIdIdentifier =
      "sentry-dbid-8d014d05-a239-4d8e-afae-8b0ef10f0954"));
} catch (e) {}
(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [1312],
  {
    39207: (e, s, a) => {
      "use strict";
      a.d(s, { CaseDetail: () => w });
      var t = a(30602),
        l = a(30230),
        r = a(13575),
        n = a(83944),
        d = a(65955),
        i = a(5071),
        c = a(65266),
        o = a(40972),
        m = a(35752),
        x = a(41960),
        h = a(85218),
        u = a(86697),
        j = a(8053),
        p = a(68886),
        g = a(14024),
        f = a(26600),
        b = a(5271),
        N = a(77413),
        v = a(88542),
        y = a(47482);
      function w(e) {
        var s, a;
        let { caseId: w } = e,
          C = (0, x.useRouter)(),
          { toast: T } = (0, y.d)(),
          [k, _] = (0, h.useState)(!0),
          [D, E] = (0, h.useState)(null),
          [A, B] = (0, h.useState)([]),
          [Z, I] = (0, h.useState)("details"),
          $ = (e) => {
            switch (e) {
              case "active":
                return "bg-green-100 text-green-800 hover:bg-green-200";
              case "pending":
              case "pending_review":
                return "bg-yellow-100 text-yellow-800 hover:bg-yellow-200";
              case "in_progress":
                return "bg-blue-100 text-blue-800 hover:bg-blue-200";
              case "completed":
              case "approved":
                return "bg-purple-100 text-purple-800 hover:bg-purple-200";
              case "rejected":
                return "bg-red-100 text-red-800 hover:bg-red-200";
              default:
                return "bg-gray-100 text-gray-800 hover:bg-gray-200";
            }
          },
          S = (e) => {
            if (!e) return "N/A";
            try {
              return (0, l.GP)(new Date(e), "MMM d, yyyy");
            } catch (e) {
              return "Invalid date";
            }
          },
          P = (0, h.useCallback)(async () => {
            _(!0);
            try {
              let [e, s] = await Promise.all([
                j.pC.getCaseById(w),
                p.wP.getDocuments(w),
              ]);
              E(e), B(s);
            } catch (e) {
              console.error("Error fetching case details:", e),
                T({
                  title: "Error",
                  description: "Failed to load case details. Please try again.",
                  variant: "destructive",
                });
            } finally {
              _(!1);
            }
          }, [w, T]);
        (0, h.useEffect)(() => {
          w && P();
        }, [w, P]);
        let R = async () => {
          try {
            await j.pC.deleteCase(w),
              T({
                title: "Success",
                description: "Case deleted successfully.",
              }),
              C.push("/dashboard/cases");
          } catch (e) {
            console.error("Error deleting case:", e),
              T({
                title: "Error",
                description: "Failed to delete case. Please try again.",
                variant: "destructive",
              });
          }
        };
        return k
          ? (0, t.jsxs)("div", {
              className: "container px-4 py-8 mx-auto",
              children: [
                (0, t.jsx)(v.E, { className: "h-8 w-32 mb-6" }),
                (0, t.jsx)(v.E, { className: "h-12 w-full mb-8" }),
                (0, t.jsx)(v.E, { className: "h-96 w-full" }),
              ],
            })
          : D
            ? (0, t.jsxs)("div", {
                className: "container px-4 py-8 mx-auto",
                children: [
                  (0, t.jsxs)("div", {
                    className: "flex items-center mb-6",
                    children: [
                      (0, t.jsxs)(b.$, {
                        variant: "ghost",
                        onClick: () => C.back(),
                        className: "mr-2",
                        children: [
                          (0, t.jsx)(r.A, { className: "mr-2 h-4 w-4" }),
                          " Back",
                        ],
                      }),
                      (0, t.jsx)("h1", {
                        className: "text-2xl font-bold",
                        children: D.title || "Case Details",
                      }),
                    ],
                  }),
                  (0, t.jsxs)("div", {
                    className:
                      "flex flex-col md:flex-row md:justify-between md:items-center mb-8",
                    children: [
                      (0, t.jsxs)("div", {
                        className: "flex items-center mb-4 md:mb-0",
                        children: [
                          (0, t.jsx)(f.E, {
                            className: $(D.status),
                            children:
                              null == (s = D.status)
                                ? void 0
                                : s.replace("_", " "),
                          }),
                          (0, t.jsxs)("span", {
                            className: "ml-4 text-sm text-muted-foreground",
                            children: [
                              (0, t.jsx)(n.A, {
                                className: "inline h-4 w-4 mr-1",
                              }),
                              "Created: ",
                              S(D.created_at),
                            ],
                          }),
                        ],
                      }),
                      (0, t.jsxs)("div", {
                        className: "flex space-x-2",
                        children: [
                          (0, t.jsxs)(b.$, {
                            variant: "outline",
                            onClick: () =>
                              C.push("/dashboard/cases/".concat(w, "/edit")),
                            children: [
                              (0, t.jsx)(d.A, { className: "mr-2 h-4 w-4" }),
                              " Edit",
                            ],
                          }),
                          (0, t.jsxs)(g.Lt, {
                            children: [
                              (0, t.jsx)(g.tv, {
                                asChild: !0,
                                children: (0, t.jsxs)(b.$, {
                                  variant: "destructive",
                                  children: [
                                    (0, t.jsx)(i.A, {
                                      className: "mr-2 h-4 w-4",
                                    }),
                                    " Delete",
                                  ],
                                }),
                              }),
                              (0, t.jsxs)(g.EO, {
                                children: [
                                  (0, t.jsxs)(g.wd, {
                                    children: [
                                      (0, t.jsx)(g.r7, {
                                        children: "Are you sure?",
                                      }),
                                      (0, t.jsx)(g.$v, {
                                        children:
                                          "This will permanently delete this case and all its associated data. This action cannot be undone.",
                                      }),
                                    ],
                                  }),
                                  (0, t.jsxs)(g.ck, {
                                    children: [
                                      (0, t.jsx)(g.Zr, { children: "Cancel" }),
                                      (0, t.jsx)(g.Rx, {
                                        onClick: R,
                                        children: "Delete",
                                      }),
                                    ],
                                  }),
                                ],
                              }),
                            ],
                          }),
                        ],
                      }),
                    ],
                  }),
                  (0, t.jsxs)(u.Tabs, {
                    defaultValue: "details",
                    className: "mb-8",
                    onValueChange: I,
                    children: [
                      (0, t.jsxs)(u.TabsList, {
                        className: "grid w-full md:w-auto grid-cols-3 mb-8",
                        children: [
                          (0, t.jsxs)(u.TabsTrigger, {
                            value: "details",
                            className: "flex items-center gap-2",
                            children: [
                              (0, t.jsx)(c.A, { className: "h-4 w-4" }),
                              (0, t.jsx)("span", {
                                className: "hidden md:inline",
                                children: "Details",
                              }),
                            ],
                          }),
                          (0, t.jsxs)(u.TabsTrigger, {
                            value: "documents",
                            className: "flex items-center gap-2",
                            children: [
                              (0, t.jsx)(o.A, { className: "h-4 w-4" }),
                              (0, t.jsx)("span", {
                                className: "hidden md:inline",
                                children: "Documents",
                              }),
                            ],
                          }),
                          (0, t.jsxs)(u.TabsTrigger, {
                            value: "timeline",
                            className: "flex items-center gap-2",
                            children: [
                              (0, t.jsx)(m.A, { className: "h-4 w-4" }),
                              (0, t.jsx)("span", {
                                className: "hidden md:inline",
                                children: "Timeline",
                              }),
                            ],
                          }),
                        ],
                      }),
                      (0, t.jsx)(u.TabsContent, {
                        value: "details",
                        children: (0, t.jsxs)(N.Zp, {
                          children: [
                            (0, t.jsxs)(N.aR, {
                              children: [
                                (0, t.jsx)(N.ZB, {
                                  children: "Case Information",
                                }),
                                (0, t.jsx)(N.BT, {
                                  children:
                                    "Details and information about this immigration case",
                                }),
                              ],
                            }),
                            (0, t.jsxs)(N.Wu, {
                              className: "space-y-4",
                              children: [
                                (0, t.jsxs)("div", {
                                  className: "grid md:grid-cols-2 gap-4",
                                  children: [
                                    (0, t.jsxs)("div", {
                                      children: [
                                        (0, t.jsx)("h3", {
                                          className:
                                            "text-sm font-medium text-muted-foreground mb-1",
                                          children: "Case Number",
                                        }),
                                        (0, t.jsx)("p", {
                                          children: D.case_number || "N/A",
                                        }),
                                      ],
                                    }),
                                    (0, t.jsxs)("div", {
                                      children: [
                                        (0, t.jsx)("h3", {
                                          className:
                                            "text-sm font-medium text-muted-foreground mb-1",
                                          children: "Case Type",
                                        }),
                                        (0, t.jsx)("p", {
                                          children: D.case_type || "N/A",
                                        }),
                                      ],
                                    }),
                                    (0, t.jsxs)("div", {
                                      children: [
                                        (0, t.jsx)("h3", {
                                          className:
                                            "text-sm font-medium text-muted-foreground mb-1",
                                          children: "Status",
                                        }),
                                        (0, t.jsx)(f.E, {
                                          className: $(D.status),
                                          children:
                                            null == (a = D.status)
                                              ? void 0
                                              : a.replace("_", " "),
                                        }),
                                      ],
                                    }),
                                    (0, t.jsxs)("div", {
                                      children: [
                                        (0, t.jsx)("h3", {
                                          className:
                                            "text-sm font-medium text-muted-foreground mb-1",
                                          children: "Created Date",
                                        }),
                                        (0, t.jsx)("p", {
                                          children: S(D.created_at),
                                        }),
                                      ],
                                    }),
                                  ],
                                }),
                                (0, t.jsxs)("div", {
                                  children: [
                                    (0, t.jsx)("h3", {
                                      className:
                                        "text-sm font-medium text-muted-foreground mb-1",
                                      children: "Description",
                                    }),
                                    (0, t.jsx)("p", {
                                      className:
                                        "text-gray-600 dark:text-gray-400",
                                      children:
                                        D.description ||
                                        "No description provided",
                                    }),
                                  ],
                                }),
                                D.notes &&
                                  (0, t.jsxs)("div", {
                                    children: [
                                      (0, t.jsx)("h3", {
                                        className:
                                          "text-sm font-medium text-muted-foreground mb-1",
                                        children: "Notes",
                                      }),
                                      (0, t.jsx)("p", {
                                        className: "text-sm",
                                        children: D.notes,
                                      }),
                                    ],
                                  }),
                              ],
                            }),
                          ],
                        }),
                      }),
                      (0, t.jsx)(u.TabsContent, {
                        value: "documents",
                        children: (0, t.jsxs)(N.Zp, {
                          children: [
                            (0, t.jsxs)(N.aR, {
                              children: [
                                (0, t.jsx)(N.ZB, { children: "Documents" }),
                                (0, t.jsx)(N.BT, {
                                  children: "Documents related to this case",
                                }),
                              ],
                            }),
                            (0, t.jsx)(N.Wu, {
                              children:
                                0 === A.length
                                  ? (0, t.jsxs)("div", {
                                      className: "text-center py-8",
                                      children: [
                                        (0, t.jsx)(o.A, {
                                          className:
                                            "h-12 w-12 mx-auto text-muted-foreground mb-4",
                                        }),
                                        (0, t.jsx)("h3", {
                                          className: "text-lg font-medium",
                                          children: "No documents found",
                                        }),
                                        (0, t.jsx)("p", {
                                          className:
                                            "text-muted-foreground mb-4",
                                          children:
                                            "Upload documents for this case",
                                        }),
                                        (0, t.jsx)(b.$, {
                                          onClick: () =>
                                            C.push(
                                              "/dashboard/cases/".concat(
                                                w,
                                                "/documents/upload",
                                              ),
                                            ),
                                          children: "Upload Document",
                                        }),
                                      ],
                                    })
                                  : (0, t.jsx)("div", {
                                      className: "grid gap-4",
                                      children: A.map((e) =>
                                        (0, t.jsxs)(
                                          "div",
                                          {
                                            className:
                                              "flex items-center justify-between p-4 border rounded-lg",
                                            children: [
                                              (0, t.jsxs)("div", {
                                                className: "flex items-center",
                                                children: [
                                                  (0, t.jsx)(o.A, {
                                                    className:
                                                      "h-5 w-5 mr-3 text-blue-500",
                                                  }),
                                                  (0, t.jsxs)("div", {
                                                    children: [
                                                      (0, t.jsx)("h4", {
                                                        className:
                                                          "font-medium",
                                                        children: e.name,
                                                      }),
                                                      (0, t.jsxs)("p", {
                                                        className:
                                                          "text-sm text-muted-foreground",
                                                        children: [
                                                          "Uploaded on ",
                                                          S(e.created_at),
                                                        ],
                                                      }),
                                                    ],
                                                  }),
                                                ],
                                              }),
                                              (0, t.jsx)(b.$, {
                                                variant: "ghost",
                                                size: "sm",
                                                onClick: () =>
                                                  C.push(
                                                    "/dashboard/documents/".concat(
                                                      e.id,
                                                    ),
                                                  ),
                                                children: "View",
                                              }),
                                            ],
                                          },
                                          e.id,
                                        ),
                                      ),
                                    }),
                            }),
                          ],
                        }),
                      }),
                      (0, t.jsx)(u.TabsContent, {
                        value: "timeline",
                        children: (0, t.jsxs)(N.Zp, {
                          children: [
                            (0, t.jsxs)(N.aR, {
                              children: [
                                (0, t.jsx)(N.ZB, { children: "Case Timeline" }),
                                (0, t.jsx)(N.BT, {
                                  children: "History and progress of this case",
                                }),
                              ],
                            }),
                            (0, t.jsx)(N.Wu, {
                              children: (0, t.jsxs)("div", {
                                className: "text-center py-8",
                                children: [
                                  (0, t.jsx)(m.A, {
                                    className:
                                      "h-12 w-12 mx-auto text-muted-foreground mb-4",
                                  }),
                                  (0, t.jsx)("h3", {
                                    className: "text-lg font-medium",
                                    children: "Timeline Coming Soon",
                                  }),
                                  (0, t.jsx)("p", {
                                    className: "text-muted-foreground",
                                    children:
                                      "Timeline feature is under development",
                                  }),
                                ],
                              }),
                            }),
                          ],
                        }),
                      }),
                    ],
                  }),
                ],
              })
            : (0, t.jsxs)("div", {
                className: "container px-4 py-8 mx-auto",
                children: [
                  (0, t.jsxs)(b.$, {
                    variant: "ghost",
                    onClick: () => C.back(),
                    className: "mb-6",
                    children: [
                      (0, t.jsx)(r.A, { className: "mr-2 h-4 w-4" }),
                      " Back",
                    ],
                  }),
                  (0, t.jsxs)(N.Zp, {
                    children: [
                      (0, t.jsxs)(N.aR, {
                        children: [
                          (0, t.jsx)(N.ZB, { children: "Case Not Found" }),
                          (0, t.jsx)(N.BT, {
                            children:
                              "The case you are looking for does not exist or you don't have permission to view it.",
                          }),
                        ],
                      }),
                      (0, t.jsx)(N.wL, {
                        children: (0, t.jsx)(b.$, {
                          onClick: () => C.push("/dashboard/cases"),
                          children: "Go to Cases",
                        }),
                      }),
                    ],
                  }),
                ],
              });
      }
    },
    93126: (e, s, a) => {
      Promise.resolve().then(a.bind(a, 39207));
    },
  },
  (e) => {
    var s = (s) => e((e.s = s));
    e.O(0, [6593, 4223, 3209, 7358], () => s(93126)), (_N_E = e.O());
  },
]);
