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
    (e._sentryDebugIds[s] = "72508136-aa76-4ea5-a055-3aa68d6c9925"),
    (e._sentryDebugIdIdentifier =
      "sentry-dbid-72508136-aa76-4ea5-a055-3aa68d6c9925"));
} catch (e) {}
("use strict");
(exports.id = 7251),
  (exports.ids = [7251]),
  (exports.modules = {
    8435: (e, s, t) => {
      t.a(e, async (e, a) => {
        try {
          t.d(s, { G: () => m });
          var r = t(61268),
            n = t(46299),
            l = t(33156),
            i = t(38568),
            c = t(99793),
            d = t(61950),
            o = t(5451),
            x = e([o]);
          function m({ cases: e, documents: s, activeTab: t }) {
            let a = e.filter((e) => "active" === e.status).length,
              x = e.filter((e) => "pending_review" === e.status).length,
              m = e.filter((e) => "completed" === e.status).length,
              u = s.filter((e) => "processing" === e.status).length,
              h = s.filter((e) => "ready" === e.status).length,
              p = s.filter((e) => "error" === e.status).length;
            return "cases" === t
              ? (0, r.jsxs)("div", {
                  className: "grid gap-4 md:grid-cols-3 mb-6",
                  children: [
                    (0, r.jsxs)(o.Zp, {
                      children: [
                        (0, r.jsxs)(o.aR, {
                          className:
                            "flex flex-row items-center justify-between space-y-0 pb-2",
                          children: [
                            (0, r.jsx)(o.ZB, {
                              className: "text-sm font-medium",
                              children: "Active Cases",
                            }),
                            (0, r.jsx)(n.A, {
                              className: "h-4 w-4 text-muted-foreground",
                            }),
                          ],
                        }),
                        (0, r.jsxs)(o.Wu, {
                          children: [
                            (0, r.jsx)("div", {
                              className: "text-2xl font-bold",
                              children: a,
                            }),
                            (0, r.jsx)("p", {
                              className: "text-xs text-muted-foreground mt-1",
                              children:
                                a > 0
                                  ? `${Math.round((a / e.length) * 100)}% of total cases`
                                  : "No active cases",
                            }),
                          ],
                        }),
                      ],
                    }),
                    (0, r.jsxs)(o.Zp, {
                      children: [
                        (0, r.jsxs)(o.aR, {
                          className:
                            "flex flex-row items-center justify-between space-y-0 pb-2",
                          children: [
                            (0, r.jsx)(o.ZB, {
                              className: "text-sm font-medium",
                              children: "Pending Review",
                            }),
                            (0, r.jsx)(l.A, {
                              className: "h-4 w-4 text-muted-foreground",
                            }),
                          ],
                        }),
                        (0, r.jsxs)(o.Wu, {
                          children: [
                            (0, r.jsx)("div", {
                              className: "text-2xl font-bold",
                              children: x,
                            }),
                            (0, r.jsx)("p", {
                              className: "text-xs text-muted-foreground mt-1",
                              children:
                                x > 0
                                  ? `${Math.round((x / e.length) * 100)}% of total cases`
                                  : "No pending reviews",
                            }),
                          ],
                        }),
                      ],
                    }),
                    (0, r.jsxs)(o.Zp, {
                      children: [
                        (0, r.jsxs)(o.aR, {
                          className:
                            "flex flex-row items-center justify-between space-y-0 pb-2",
                          children: [
                            (0, r.jsx)(o.ZB, {
                              className: "text-sm font-medium",
                              children: "Completed Cases",
                            }),
                            (0, r.jsx)(i.A, {
                              className: "h-4 w-4 text-muted-foreground",
                            }),
                          ],
                        }),
                        (0, r.jsxs)(o.Wu, {
                          children: [
                            (0, r.jsx)("div", {
                              className: "text-2xl font-bold",
                              children: m,
                            }),
                            (0, r.jsx)("p", {
                              className: "text-xs text-muted-foreground mt-1",
                              children:
                                m > 0
                                  ? `${Math.round((m / e.length) * 100)}% of total cases`
                                  : "No completed cases",
                            }),
                          ],
                        }),
                      ],
                    }),
                  ],
                })
              : "documents" === t
                ? (0, r.jsxs)("div", {
                    className: "grid gap-4 md:grid-cols-3 mb-6",
                    children: [
                      (0, r.jsxs)(o.Zp, {
                        children: [
                          (0, r.jsxs)(o.aR, {
                            className:
                              "flex flex-row items-center justify-between space-y-0 pb-2",
                            children: [
                              (0, r.jsx)(o.ZB, {
                                className: "text-sm font-medium",
                                children: "Processing",
                              }),
                              (0, r.jsx)(c.A, {
                                className: "h-4 w-4 text-muted-foreground",
                              }),
                            ],
                          }),
                          (0, r.jsxs)(o.Wu, {
                            children: [
                              (0, r.jsx)("div", {
                                className: "text-2xl font-bold",
                                children: u,
                              }),
                              (0, r.jsx)("p", {
                                className: "text-xs text-muted-foreground mt-1",
                                children:
                                  u > 0
                                    ? `${Math.round((u / s.length) * 100)}% of total documents`
                                    : "No documents processing",
                              }),
                            ],
                          }),
                        ],
                      }),
                      (0, r.jsxs)(o.Zp, {
                        children: [
                          (0, r.jsxs)(o.aR, {
                            className:
                              "flex flex-row items-center justify-between space-y-0 pb-2",
                            children: [
                              (0, r.jsx)(o.ZB, {
                                className: "text-sm font-medium",
                                children: "Ready",
                              }),
                              (0, r.jsx)(i.A, {
                                className: "h-4 w-4 text-muted-foreground",
                              }),
                            ],
                          }),
                          (0, r.jsxs)(o.Wu, {
                            children: [
                              (0, r.jsx)("div", {
                                className: "text-2xl font-bold",
                                children: h,
                              }),
                              (0, r.jsx)("p", {
                                className: "text-xs text-muted-foreground mt-1",
                                children:
                                  h > 0
                                    ? `${Math.round((h / s.length) * 100)}% of total documents`
                                    : "No ready documents",
                              }),
                            ],
                          }),
                        ],
                      }),
                      (0, r.jsxs)(o.Zp, {
                        children: [
                          (0, r.jsxs)(o.aR, {
                            className:
                              "flex flex-row items-center justify-between space-y-0 pb-2",
                            children: [
                              (0, r.jsx)(o.ZB, {
                                className: "text-sm font-medium",
                                children: "Error",
                              }),
                              (0, r.jsx)(d.A, {
                                className: "h-4 w-4 text-muted-foreground",
                              }),
                            ],
                          }),
                          (0, r.jsxs)(o.Wu, {
                            children: [
                              (0, r.jsx)("div", {
                                className: "text-2xl font-bold",
                                children: p,
                              }),
                              (0, r.jsx)("p", {
                                className: "text-xs text-muted-foreground mt-1",
                                children:
                                  p > 0
                                    ? `${Math.round((p / s.length) * 100)}% of total documents`
                                    : "No documents with errors",
                              }),
                            ],
                          }),
                        ],
                      }),
                    ],
                  })
                : "analytics" === t
                  ? (0, r.jsxs)("div", {
                      className: "grid gap-4 md:grid-cols-3 mb-6",
                      children: [
                        (0, r.jsxs)(o.Zp, {
                          children: [
                            (0, r.jsxs)(o.aR, {
                              className:
                                "flex flex-row items-center justify-between space-y-0 pb-2",
                              children: [
                                (0, r.jsx)(o.ZB, {
                                  className: "text-sm font-medium",
                                  children: "Total Cases",
                                }),
                                (0, r.jsx)(n.A, {
                                  className: "h-4 w-4 text-muted-foreground",
                                }),
                              ],
                            }),
                            (0, r.jsx)(o.Wu, {
                              children: (0, r.jsx)("div", {
                                className: "text-2xl font-bold",
                                children: e.length,
                              }),
                            }),
                          ],
                        }),
                        (0, r.jsxs)(o.Zp, {
                          children: [
                            (0, r.jsxs)(o.aR, {
                              className:
                                "flex flex-row items-center justify-between space-y-0 pb-2",
                              children: [
                                (0, r.jsx)(o.ZB, {
                                  className: "text-sm font-medium",
                                  children: "Total Documents",
                                }),
                                (0, r.jsx)(c.A, {
                                  className: "h-4 w-4 text-muted-foreground",
                                }),
                              ],
                            }),
                            (0, r.jsx)(o.Wu, {
                              children: (0, r.jsx)("div", {
                                className: "text-2xl font-bold",
                                children: s.length,
                              }),
                            }),
                          ],
                        }),
                        (0, r.jsxs)(o.Zp, {
                          children: [
                            (0, r.jsxs)(o.aR, {
                              className:
                                "flex flex-row items-center justify-between space-y-0 pb-2",
                              children: [
                                (0, r.jsx)(o.ZB, {
                                  className: "text-sm font-medium",
                                  children: "Success Rate",
                                }),
                                (0, r.jsx)(i.A, {
                                  className: "h-4 w-4 text-muted-foreground",
                                }),
                              ],
                            }),
                            (0, r.jsx)(o.Wu, {
                              children: (0, r.jsx)("div", {
                                className: "text-2xl font-bold",
                                children:
                                  s.length > 0
                                    ? `${Math.round((h / s.length) * 100)}%`
                                    : "N/A",
                              }),
                            }),
                          ],
                        }),
                      ],
                    })
                  : null;
          }
          (o = (x.then ? (await x)() : x)[0]), a();
        } catch (e) {
          a(e);
        }
      });
    },
    24131: (e, s, t) => {
      t.d(s, { A: () => a });
      let a = (0, t(95255).A)("MoreHorizontal", [
        ["circle", { cx: "12", cy: "12", r: "1", key: "41hilf" }],
        ["circle", { cx: "19", cy: "12", r: "1", key: "1wjl8i" }],
        ["circle", { cx: "5", cy: "12", r: "1", key: "1pcz8c" }],
      ]);
    },
    28539: (e, s, t) => {
      t.a(e, async (e, a) => {
        try {
          t.d(s, { c: () => u });
          var r = t(61268),
            n = t(15127),
            l = t(84205),
            i = t(3519),
            c = t(28909),
            d = t(51384),
            o = t(72015),
            x = t(81324),
            m = e([c, d, o, x]);
          function u({
            activeTab: e,
            cases: s,
            onCreateCase: t,
            onUploadDocument: a,
          }) {
            let [m, u] = (0, l.useState)(!1),
              { user: h } = (0, i.useAuth)(),
              p = async (e) => {
                await t(e), u(!1);
              },
              f = async (e) => {
                await a(e), u(!1);
              };
            return h
              ? (0, r.jsxs)(d.cj, {
                  open: m,
                  onOpenChange: (e) => {
                    u(e);
                  },
                  children: [
                    (0, r.jsx)(d.CG, {
                      asChild: !0,
                      children: (0, r.jsxs)(c.$, {
                        children: [
                          (0, r.jsx)(n.A, { className: "mr-2 h-4 w-4" }),
                          (() => {
                            switch (e) {
                              case "cases":
                                return "Create Case";
                              case "documents":
                                return "Upload Document";
                              case "analytics":
                                return "Export Report";
                              default:
                                return "New Item";
                            }
                          })(),
                        ],
                      }),
                    }),
                    (0, r.jsxs)(d.h, {
                      children: [
                        (0, r.jsx)(d.Fm, {
                          children: (0, r.jsx)(d.qp, {
                            children:
                              "cases" === e
                                ? "Create New Case"
                                : "documents" === e
                                  ? "Upload New Document"
                                  : "Export Report",
                          }),
                        }),
                        "cases" === e &&
                          (0, r.jsx)("div", {
                            className: "py-4",
                            children: (0, r.jsx)(o.Y, {
                              onSubmit: p,
                              onCancel: () => u(!1),
                            }),
                          }),
                        "documents" === e &&
                          (0, r.jsx)("div", {
                            className: "py-4",
                            children: (0, r.jsx)(x.P, {
                              userId: h.id,
                              onSubmit: f,
                              onCancel: () => u(!1),
                            }),
                          }),
                        "analytics" === e &&
                          (0, r.jsxs)("div", {
                            className: "py-4 space-y-4",
                            children: [
                              (0, r.jsx)("p", {
                                className: "text-sm text-muted-foreground",
                                children:
                                  "Export analytics reports in various formats",
                              }),
                              (0, r.jsxs)("div", {
                                className: "space-y-2",
                                children: [
                                  (0, r.jsx)(c.$, {
                                    className: "w-full",
                                    variant: "outline",
                                    children: "Export as PDF",
                                  }),
                                  (0, r.jsx)(c.$, {
                                    className: "w-full",
                                    variant: "outline",
                                    children: "Export as CSV",
                                  }),
                                  (0, r.jsx)(c.$, {
                                    className: "w-full",
                                    variant: "outline",
                                    children: "Export as Excel",
                                  }),
                                ],
                              }),
                            ],
                          }),
                      ],
                    }),
                  ],
                })
              : null;
          }
          ([c, d, o, x] = m.then ? (await m)() : m), a();
        } catch (e) {
          a(e);
        }
      });
    },
    33156: (e, s, t) => {
      t.d(s, { A: () => a });
      let a = (0, t(95255).A)("FileCheck", [
        [
          "path",
          {
            d: "M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z",
            key: "1rqfz7",
          },
        ],
        ["path", { d: "M14 2v4a2 2 0 0 0 2 2h4", key: "tnqrlb" }],
        ["path", { d: "m9 15 2 2 4-4", key: "1grp1n" }],
      ]);
    },
    37787: (e, s, t) => {
      t.a(e, async (e, a) => {
        try {
          t.d(s, { T: () => c });
          var r = t(61268),
            n = t(84205),
            l = t(15942),
            i = e([l]);
          l = (i.then ? (await i)() : i)[0];
          let c = n.forwardRef(({ className: e, ...s }, t) =>
            (0, r.jsx)("textarea", {
              className: (0, l.cn)(
                "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                e,
              ),
              ref: t,
              ...s,
            }),
          );
          (c.displayName = "Textarea"), a();
        } catch (e) {
          a(e);
        }
      });
    },
    72015: (e, s, t) => {
      t.a(e, async (e, a) => {
        try {
          t.d(s, { Y: () => x });
          var r = t(61268),
            n = t(95124),
            l = t(84205),
            i = t(28909),
            c = t(78337),
            d = t(37787),
            o = e([i, c, d]);
          function x({ onSubmit: e, onCancel: s }) {
            let t = (0, n.useTranslations)("temporaryCaseForm"),
              [a, o] = (0, l.useState)(""),
              [x, m] = (0, l.useState)("");
            return (0, r.jsxs)("div", {
              className: "space-y-4 p-4",
              children: [
                (0, r.jsx)("h2", {
                  className: "text-lg font-medium",
                  children: t("formTitle"),
                }),
                (0, r.jsxs)("form", {
                  onSubmit: (s) => {
                    s.preventDefault(),
                      e({
                        title: a || t("initialTitle"),
                        description: x || t("initialDescription"),
                        status: "active",
                      });
                  },
                  className: "space-y-4",
                  children: [
                    (0, r.jsxs)("div", {
                      className: "space-y-2",
                      children: [
                        (0, r.jsx)("label", {
                          htmlFor: "title",
                          className: "text-sm font-medium",
                          children: t("titleLabel"),
                        }),
                        (0, r.jsx)(c.p, {
                          id: "title",
                          type: "text",
                          value: a,
                          onChange: (e) => o(e.target.value),
                          placeholder: t("initialTitle"),
                        }),
                      ],
                    }),
                    (0, r.jsxs)("div", {
                      className: "space-y-2",
                      children: [
                        (0, r.jsx)("label", {
                          htmlFor: "description",
                          className: "text-sm font-medium",
                          children: t("descriptionLabel"),
                        }),
                        (0, r.jsx)(d.T, {
                          id: "description",
                          value: x,
                          onChange: (e) => m(e.target.value),
                          rows: 3,
                          placeholder: t("initialDescription"),
                        }),
                      ],
                    }),
                    (0, r.jsxs)("div", {
                      className: "flex justify-end space-x-2",
                      children: [
                        (0, r.jsx)(i.$, {
                          type: "button",
                          variant: "outline",
                          onClick: s,
                          children: t("cancelButton"),
                        }),
                        (0, r.jsx)(i.$, {
                          type: "submit",
                          children: t("createButton"),
                        }),
                      ],
                    }),
                  ],
                }),
              ],
            });
          }
          ([i, c, d] = o.then ? (await o)() : o), a();
        } catch (e) {
          a(e);
        }
      });
    },
    77001: (e, s, t) => {
      t.a(e, async (e, a) => {
        try {
          t.d(s, {
            Tabs: () => c,
            TabsContent: () => x,
            TabsList: () => d,
            TabsTrigger: () => o,
          });
          var r = t(61268),
            n = t(28366);
          t(84205);
          var l = t(15942),
            i = e([l]);
          function c({ className: e, ...s }) {
            return (0, r.jsx)(n.bL, {
              "data-slot": "tabs",
              className: (0, l.cn)("flex flex-col gap-2", e),
              ...s,
            });
          }
          function d({ className: e, ...s }) {
            return (0, r.jsx)(n.B8, {
              "data-slot": "tabs-list",
              className: (0, l.cn)(
                "bg-muted text-muted-foreground inline-flex h-9 w-fit items-center justify-center rounded-lg p-[3px]",
                e,
              ),
              ...s,
            });
          }
          function o({ className: e, ...s }) {
            return (0, r.jsx)(n.l9, {
              "data-slot": "tabs-trigger",
              className: (0, l.cn)(
                "data-[state=active]:bg-background dark:data-[state=active]:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:outline-ring dark:data-[state=active]:border-input dark:data-[state=active]:bg-input/30 text-foreground dark:text-muted-foreground inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-md border border-transparent px-2 py-1 text-sm font-medium whitespace-nowrap transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:shadow-sm [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
                e,
              ),
              ...s,
            });
          }
          function x({ className: e, ...s }) {
            return (0, r.jsx)(n.UC, {
              "data-slot": "tabs-content",
              className: (0, l.cn)("flex-1 outline-none", e),
              ...s,
            });
          }
          (l = (i.then ? (await i)() : i)[0]), a();
        } catch (e) {
          a(e);
        }
      });
    },
    81324: (e, s, t) => {
      t.a(e, async (e, a) => {
        try {
          t.d(s, { P: () => x });
          var r = t(61268),
            n = t(95124),
            l = t(84205),
            i = t(28909),
            c = t(78337),
            d = t(37787),
            o = e([i, c, d]);
          function x({ userId: e, onSubmit: s, onCancel: t }) {
            let a = (0, n.useTranslations)("temporaryDocumentForm"),
              [o, x] = (0, l.useState)(""),
              [m, u] = (0, l.useState)(""),
              [h, p] = (0, l.useState)(null);
            return (0, r.jsxs)("div", {
              className: "space-y-4 p-4",
              children: [
                (0, r.jsx)("h2", {
                  className: "text-lg font-medium",
                  children: a("formTitle"),
                }),
                (0, r.jsxs)("form", {
                  onSubmit: (t) => {
                    if ((t.preventDefault(), !h))
                      return void alert(a("selectFileAlert"));
                    s({
                      name: o || a("initialName"),
                      description: m || a("initialDescription"),
                      file: h,
                      user_id: e,
                    });
                  },
                  className: "space-y-4",
                  children: [
                    (0, r.jsxs)("div", {
                      className: "space-y-2",
                      children: [
                        (0, r.jsx)("label", {
                          htmlFor: "name",
                          className: "text-sm font-medium",
                          children: a("nameLabel"),
                        }),
                        (0, r.jsx)(c.p, {
                          id: "name",
                          type: "text",
                          value: o,
                          onChange: (e) => x(e.target.value),
                          placeholder: a("initialName"),
                        }),
                      ],
                    }),
                    (0, r.jsxs)("div", {
                      className: "space-y-2",
                      children: [
                        (0, r.jsx)("label", {
                          htmlFor: "description",
                          className: "text-sm font-medium",
                          children: a("descriptionLabel"),
                        }),
                        (0, r.jsx)(d.T, {
                          id: "description",
                          value: m,
                          onChange: (e) => u(e.target.value),
                          rows: 3,
                          placeholder: a("initialDescription"),
                        }),
                      ],
                    }),
                    (0, r.jsxs)("div", {
                      className: "space-y-2",
                      children: [
                        (0, r.jsx)("label", {
                          htmlFor: "file",
                          className: "text-sm font-medium",
                          children: a("fileLabel"),
                        }),
                        (0, r.jsx)(c.p, {
                          id: "file",
                          type: "file",
                          onChange: (e) => {
                            e.target.files &&
                              e.target.files[0] &&
                              p(e.target.files[0]);
                          },
                          className: "cursor-pointer",
                          required: !0,
                        }),
                        h &&
                          (0, r.jsx)("p", {
                            className: "text-xs text-muted-foreground mt-1",
                            children: a("selectedFileInfo", {
                              fileName: h.name,
                              fileSizeKB: Math.round(h.size / 1024),
                            }),
                          }),
                      ],
                    }),
                    (0, r.jsxs)("div", {
                      className: "flex justify-end space-x-2",
                      children: [
                        (0, r.jsx)(i.$, {
                          type: "button",
                          variant: "outline",
                          onClick: t,
                          children: a("cancelButton"),
                        }),
                        (0, r.jsx)(i.$, {
                          type: "submit",
                          disabled: !h,
                          children: a("uploadButton"),
                        }),
                      ],
                    }),
                  ],
                }),
              ],
            });
          }
          ([i, c, d] = o.then ? (await o)() : o), a();
        } catch (e) {
          a(e);
        }
      });
    },
    94507: (e, s, t) => {
      t.a(e, async (e, a) => {
        try {
          t.d(s, { G: () => y });
          var r = t(61268),
            n = t(81578),
            l = t(46299),
            i = t(24131),
            c = t(14677),
            d = t(12335),
            o = t(89882),
            x = t(95124),
            m = t(84205),
            u = t(79366),
            h = t(58702),
            p = t(15942),
            f = t(46532),
            j = t(28909),
            g = t(5451),
            b = t(93336),
            N = e([p, f, j, g, b]);
          function y({ cases: e, onCaseUpdated: s }) {
            let t = (0, o.useRouter)(),
              [a, N] = (0, m.useState)(null),
              y = (0, x.useTranslations)("casesList"),
              v = (0, u.p)(),
              w = (0, h.V8)(v),
              k = (e) => {
                switch (e) {
                  case "active":
                    return "bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-900/50 dark:text-green-300";
                  case "pending":
                  case "pending_review":
                    return "bg-yellow-100 text-yellow-800 hover:bg-yellow-200 dark:bg-yellow-900/50 dark:text-yellow-300";
                  case "in_progress":
                    return "bg-blue-100 text-blue-800 hover:bg-blue-200 dark:bg-blue-900/50 dark:text-blue-300";
                  case "completed":
                  case "approved":
                    return "bg-purple-100 text-purple-800 hover:bg-purple-200 dark:bg-purple-900/50 dark:text-purple-300";
                  case "rejected":
                    return "bg-red-100 text-red-800 hover:bg-red-200 dark:bg-red-900/50 dark:text-red-300";
                  default:
                    return "bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300";
                }
              },
              C = (e) => {
                switch (e) {
                  case "active":
                    return y("statusActive");
                  case "pending":
                    return y("statusPending");
                  case "in_progress":
                    return y("statusInProgress");
                  case "pending_review":
                    return y("statusPendingReview");
                  case "completed":
                    return y("statusCompleted");
                  case "approved":
                    return y("statusApproved");
                  case "rejected":
                    return y("statusRejected");
                  case "archived":
                    return y("statusArchived");
                  default:
                    return e;
                }
              },
              A = (e) => {
                if (!e) return y("notAvailable");
                try {
                  return (0, n.GP)(new Date(e), "MMM d, yyyy");
                } catch (e) {
                  return y("invalidDate");
                }
              },
              _ = (e) => {
                N(a === e ? null : e);
              };
            return 0 === e.length
              ? (0, r.jsxs)("div", {
                  className: "text-center p-12 border rounded-lg",
                  children: [
                    (0, r.jsx)(l.A, {
                      className: "h-12 w-12 mx-auto text-muted-foreground mb-4",
                    }),
                    (0, r.jsx)("h3", {
                      className: "text-lg font-medium",
                      children: y("emptyTitle"),
                    }),
                    (0, r.jsx)("p", {
                      className: "text-muted-foreground mb-4",
                      children: y("emptyDescription"),
                    }),
                    (0, r.jsx)(j.$, {
                      onClick: () => t.push("/dashboard/cases/new"),
                      children: y("emptyButton"),
                    }),
                  ],
                })
              : (0, r.jsx)("div", {
                  className: "space-y-4",
                  children: e.map((e) =>
                    (0, r.jsxs)(
                      g.Zp,
                      {
                        className: (0, p.cn)(
                          "transition-all",
                          a === e.id
                            ? "border-primary shadow-md"
                            : "hover:shadow-sm",
                        ),
                        children: [
                          (0, r.jsx)(g.aR, {
                            className: "p-4",
                            children: (0, r.jsxs)("div", {
                              className:
                                "flex justify-between items-start gap-4",
                              children: [
                                (0, r.jsxs)("div", {
                                  className: "flex-1",
                                  children: [
                                    (0, r.jsx)(g.ZB, {
                                      className: "text-lg",
                                      children: e.title || y("untitledCase"),
                                    }),
                                    e.description &&
                                      (0, r.jsxs)(g.BT, {
                                        className:
                                          "text-sm text-muted-foreground mt-1",
                                        children: [
                                          e.description.substring(0, 100),
                                          e.description.length > 100
                                            ? "..."
                                            : "",
                                        ],
                                      }),
                                  ],
                                }),
                                (0, r.jsxs)("div", {
                                  className:
                                    "flex items-center space-x-2 flex-shrink-0",
                                  children: [
                                    (0, r.jsx)(f.E, {
                                      className: k(e.status),
                                      children: C(e.status),
                                    }),
                                    (0, r.jsxs)(b.rI, {
                                      children: [
                                        (0, r.jsx)(b.ty, {
                                          asChild: !0,
                                          children: (0, r.jsx)(j.$, {
                                            variant: "ghost",
                                            size: "icon",
                                            className: "h-8 w-8",
                                            children: (0, r.jsx)(i.A, {
                                              className: "h-4 w-4",
                                            }),
                                          }),
                                        }),
                                        (0, r.jsxs)(b.SQ, {
                                          align: "end",
                                          children: [
                                            (0, r.jsx)(b.lp, {
                                              children: y("actionsLabel"),
                                            }),
                                            (0, r.jsx)(b.mB, {}),
                                            (0, r.jsx)(b._2, {
                                              onClick: () =>
                                                t.push(
                                                  `/dashboard/cases/${e.id}`,
                                                ),
                                              children: y("viewDetailsAction"),
                                            }),
                                            (0, r.jsx)(b._2, {
                                              onClick: () =>
                                                t.push(
                                                  `/dashboard/cases/${e.id}/edit`,
                                                ),
                                              children: y("editCaseAction"),
                                            }),
                                            (0, r.jsx)(b._2, {
                                              onClick: () =>
                                                t.push(
                                                  `/dashboard/cases/${e.id}/documents`,
                                                ),
                                              children: y(
                                                "viewDocumentsAction",
                                              ),
                                            }),
                                            (0, r.jsx)(b.mB, {}),
                                            (0, r.jsx)(b._2, {
                                              className:
                                                "text-red-600 focus:bg-red-100 focus:text-red-700 dark:focus:bg-red-900/50 dark:focus:text-red-300",
                                              onClick: async () => {
                                                await s();
                                              },
                                              children: y("archiveCaseAction"),
                                            }),
                                          ],
                                        }),
                                      ],
                                    }),
                                  ],
                                }),
                              ],
                            }),
                          }),
                          (0, r.jsx)(g.Wu, {
                            className: "p-4 pt-0",
                            children: (0, r.jsxs)("div", {
                              className:
                                "flex flex-wrap text-sm text-muted-foreground gap-x-4 gap-y-1",
                              children: [
                                (0, r.jsxs)("div", {
                                  className: "flex items-center",
                                  children: [
                                    (0, r.jsx)(l.A, {
                                      className: "mr-1 h-4 w-4 flex-shrink-0",
                                    }),
                                    (0, r.jsxs)("span", {
                                      children: [
                                        y("typePrefix"),
                                        ":",
                                        " ",
                                        e.case_type?.replace("_", " ") ||
                                          y("notAvailable"),
                                      ],
                                    }),
                                  ],
                                }),
                                e.target_date &&
                                  (0, r.jsxs)("div", {
                                    className: "flex items-center",
                                    children: [
                                      (0, r.jsx)(c.A, {
                                        className: "mr-1 h-4 w-4 flex-shrink-0",
                                      }),
                                      (0, r.jsxs)("span", {
                                        children: [
                                          y("targetPrefix"),
                                          ": ",
                                          A(e.target_date),
                                        ],
                                      }),
                                    ],
                                  }),
                                (0, r.jsxs)("div", {
                                  className: "flex items-center",
                                  children: [
                                    (0, r.jsx)(c.A, {
                                      className: "mr-1 h-4 w-4 flex-shrink-0",
                                    }),
                                    (0, r.jsxs)("span", {
                                      children: [
                                        y("createdPrefix"),
                                        ": ",
                                        A(e.created_at),
                                      ],
                                    }),
                                  ],
                                }),
                              ],
                            }),
                          }),
                          (0, r.jsxs)(g.wL, {
                            className: "p-4 pt-0 flex justify-between",
                            children: [
                              (0, r.jsx)(j.$, {
                                variant: "ghost",
                                size: "sm",
                                onClick: () => _(e.id),
                                children:
                                  a === e.id ? y("showLess") : y("showMore"),
                              }),
                              (0, r.jsxs)(j.$, {
                                variant: "default",
                                size: "sm",
                                onClick: () =>
                                  t.push(`/dashboard/cases/${e.id}`),
                                children: [
                                  y("viewDetailsAction"),
                                  (0, r.jsx)(d.A, {
                                    className: (0, p.cn)(
                                      "h-4 w-4",
                                      w ? "mr-1" : "ml-1",
                                    ),
                                  }),
                                ],
                              }),
                            ],
                          }),
                          a === e.id &&
                            (0, r.jsx)("div", {
                              className: "px-4 pb-4 border-t pt-4",
                              children: (0, r.jsxs)("div", {
                                className:
                                  "grid grid-cols-1 md:grid-cols-2 gap-4 text-sm",
                                children: [
                                  (0, r.jsxs)("div", {
                                    children: [
                                      (0, r.jsx)("h4", {
                                        className: "font-medium mb-2",
                                        children: y("detailsHeader"),
                                      }),
                                      (0, r.jsxs)("p", {
                                        className: "text-muted-foreground mb-1",
                                        children: [
                                          (0, r.jsxs)("strong", {
                                            children: [y("idLabel"), ":"],
                                          }),
                                          " ",
                                          e.id,
                                        ],
                                      }),
                                      (0, r.jsxs)("p", {
                                        className: "text-muted-foreground mb-1",
                                        children: [
                                          (0, r.jsxs)("strong", {
                                            children: [
                                              y("destinationLabel"),
                                              ":",
                                            ],
                                          }),
                                          " ",
                                          e.destination_country ||
                                            y("notAvailable"),
                                        ],
                                      }),
                                      (0, r.jsxs)("p", {
                                        className: "text-muted-foreground",
                                        children: [
                                          (0, r.jsxs)("strong", {
                                            children: [
                                              y("lastUpdatedLabel"),
                                              ":",
                                            ],
                                          }),
                                          " ",
                                          A(e.updated_at),
                                        ],
                                      }),
                                    ],
                                  }),
                                  (0, r.jsxs)("div", {
                                    children: [
                                      (0, r.jsx)("h4", {
                                        className: "font-medium mb-2",
                                        children: y("requirementsHeader"),
                                      }),
                                      e.requirements &&
                                      Object.keys(e.requirements).length > 0
                                        ? (0, r.jsxs)("ul", {
                                            className:
                                              "list-disc list-inside text-muted-foreground space-y-1",
                                            children: [
                                              Object.entries(e.requirements)
                                                .slice(0, 3)
                                                .map(([e, s]) =>
                                                  (0, r.jsxs)(
                                                    "li",
                                                    {
                                                      children: [
                                                        e,
                                                        ": ",
                                                        String(s),
                                                      ],
                                                    },
                                                    e,
                                                  ),
                                                ),
                                              Object.keys(e.requirements)
                                                .length > 3 &&
                                                (0, r.jsx)("li", {
                                                  children: y("andMoreItems", {
                                                    count:
                                                      Object.keys(
                                                        e.requirements,
                                                      ).length - 3,
                                                  }),
                                                }),
                                            ],
                                          })
                                        : (0, r.jsx)("p", {
                                            className: "text-muted-foreground",
                                            children: y("noRequirements"),
                                          }),
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
          ([p, f, j, g, b] = N.then ? (await N)() : N), a();
        } catch (e) {
          a(e);
        }
      });
    },
  });
//# sourceMappingURL=7251.js.map
