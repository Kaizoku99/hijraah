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
    (e._sentryDebugIds[s] = "4be0b1ed-8701-4b41-9aec-19205686797f"),
    (e._sentryDebugIdIdentifier =
      "sentry-dbid-4be0b1ed-8701-4b41-9aec-19205686797f"));
} catch (e) {}
(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [2984],
  {
    17779: (e, s, r) => {
      Promise.resolve().then(r.bind(r, 90032));
    },
    90032: (e, s, r) => {
      "use strict";
      r.r(s), r.d(s, { default: () => q });
      var l = r(30602),
        a = r(26515),
        n = r(1510),
        c = r(74583),
        i = r(95233),
        t = r(65955),
        d = r(41624),
        o = r(78155),
        h = r(89068),
        x = r(99284),
        u = r(35752),
        j = r(83944),
        m = r(95230),
        p = r(78179),
        g = r(41960),
        v = r(85218),
        f = r(72508),
        y = r(17967),
        b = r(14024),
        N = r(26600),
        w = r(5271),
        C = r(77413),
        S = r(14315),
        E = r(74879),
        k = r(16873),
        _ = r(4401),
        T = r(61159),
        I = r(88542),
        A = r(21382),
        M = r(86697),
        R = r(1805),
        B = r(47482);
      let V = y.Ik({
          name: y
            .Yj()
            .min(2, { message: "Name must be at least 2 characters" }),
          url: y.Yj().url({ message: "Please enter a valid URL" }),
          category: y.k5([
            "government",
            "legal",
            "news",
            "blog",
            "forum",
            "other",
          ]),
          description: y.Yj().optional(),
          scrape_frequency: y.Yj(),
          is_active: y.zM().default(!0),
        }),
        z = y.Ik({ score: y.ai().min(0).max(100), notes: y.Yj().optional() });
      function q() {
        (0, g.useRouter)();
        let { toast: e } = (0, B.d)(),
          [s, r] = (0, v.useState)([]),
          [y, q] = (0, v.useState)(!0),
          [F, J] = (0, v.useState)("all"),
          [O, D] = (0, v.useState)(!1),
          [L, $] = (0, v.useState)(!1),
          [Y, G] = (0, v.useState)(!1),
          [P, U] = (0, v.useState)(null),
          [W, Z] = (0, v.useState)(!1),
          Q = (0, f.mN)({
            resolver: (0, a.u)(V),
            defaultValues: {
              name: "",
              url: "",
              category: "other",
              description: "",
              scrape_frequency: "1 day",
              is_active: !0,
            },
          }),
          H = (0, f.mN)({
            resolver: (0, a.u)(z),
            defaultValues: { score: 50, notes: "" },
          }),
          K = (0, v.useCallback)(async () => {
            q(!0);
            try {
              let e = await fetch("/api/admin/scraping-sources");
              if (!e.ok) throw Error("Failed to fetch sources");
              let s = await e.json();
              r(s);
            } catch (s) {
              console.error("Error fetching sources:", s),
                e({
                  title: "Error",
                  description: "Failed to fetch scraping sources",
                  variant: "destructive",
                });
            } finally {
              q(!1);
            }
          }, []);
        (0, v.useEffect)(() => {
          K();
        }, [K]),
          (0, v.useEffect)(() => {
            O || L || Q.reset();
          }, [O, L, Q]),
          (0, v.useEffect)(() => {
            P &&
              L &&
              Q.reset({
                name: P.name,
                url: P.url,
                category: P.category,
                description: P.description || "",
                scrape_frequency: P.scrape_frequency,
                is_active: P.is_active,
              });
          }, [P, L, Q]);
        let X = async (s) => {
            try {
              let r = P
                  ? "/api/admin/scraping-sources/".concat(P.id)
                  : "/api/admin/scraping-sources",
                l = P ? "PUT" : "POST";
              if (
                !(
                  await fetch(r, {
                    method: l,
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(s),
                  })
                ).ok
              )
                throw Error(
                  "Failed to ".concat(P ? "update" : "create", " source"),
                );
              K(),
                e({
                  title: "Success",
                  description: "Source ".concat(
                    P ? "updated" : "created",
                    " successfully",
                  ),
                }),
                D(!1),
                $(!1);
            } catch (s) {
              console.error("Error saving source:", s),
                e({
                  title: "Error",
                  description: "Failed to ".concat(
                    P ? "update" : "create",
                    " source",
                  ),
                  variant: "destructive",
                });
            }
          },
          ee = async (s) => {
            try {
              if (
                !(
                  await fetch("/api/admin/scraping-sources/".concat(s), {
                    method: "DELETE",
                  })
                ).ok
              )
                throw Error("Failed to delete source");
              K(),
                e({
                  title: "Success",
                  description: "Source deleted successfully",
                });
            } catch (s) {
              console.error("Error deleting source:", s),
                e({
                  title: "Error",
                  description: "Failed to delete source",
                  variant: "destructive",
                });
            }
          },
          es = async (s) => {
            try {
              let r = await fetch("/api/scheduled-scraping", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ sourceIds: [s] }),
              });
              if (!r.ok) throw Error("Failed to trigger scraping");
              await r.json(),
                e({
                  title: "Scraping initiated",
                  description: "The source will be scraped in the background",
                }),
                setTimeout(K, 5e3);
            } catch (s) {
              console.error("Error triggering scraping:", s),
                e({
                  title: "Error",
                  description: "Failed to trigger scraping",
                  variant: "destructive",
                });
            }
          },
          er = async (s) => {
            if (P) {
              Z(!0);
              try {
                if (
                  !(
                    await fetch(
                      "/api/admin/scraping-sources/".concat(P.id, "/validate"),
                      {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(s),
                      },
                    )
                  ).ok
                )
                  throw Error("Failed to validate source");
                K(),
                  e({
                    title: "Validation submitted",
                    description: "Your validation has been recorded",
                  }),
                  G(!1),
                  H.reset();
              } catch (s) {
                console.error("Error validating source:", s),
                  e({
                    title: "Error",
                    description: "Failed to submit validation",
                    variant: "destructive",
                  });
              } finally {
                Z(!1);
              }
            }
          },
          el = "all" === F ? s : s.filter((e) => e.category === F);
        return (0, l.jsxs)("div", {
          className: "container mx-auto py-6",
          children: [
            (0, l.jsxs)("div", {
              className: "flex justify-between items-center mb-6",
              children: [
                (0, l.jsxs)("div", {
                  children: [
                    (0, l.jsx)("h1", {
                      className: "text-3xl font-bold",
                      children: "Web Scraping Sources",
                    }),
                    (0, l.jsx)("p", {
                      className: "text-muted-foreground",
                      children:
                        "Manage the sources for scheduled web scraping.",
                    }),
                  ],
                }),
                (0, l.jsxs)(S.lG, {
                  open: O,
                  onOpenChange: D,
                  children: [
                    (0, l.jsx)(S.zM, {
                      asChild: !0,
                      children: (0, l.jsxs)(w.$, {
                        children: [
                          (0, l.jsx)(n.A, { className: "mr-2 h-4 w-4" }),
                          "Add Source",
                        ],
                      }),
                    }),
                    (0, l.jsxs)(S.Cf, {
                      className: "sm:max-w-[425px]",
                      children: [
                        (0, l.jsxs)(S.c7, {
                          children: [
                            (0, l.jsx)(S.L3, {
                              children: "Add New Scraping Source",
                            }),
                            (0, l.jsx)(S.rr, {
                              children:
                                "Add a new website for scheduled scraping.",
                            }),
                          ],
                        }),
                        (0, l.jsx)(k.lV, {
                          ...Q,
                          children: (0, l.jsxs)("form", {
                            onSubmit: Q.handleSubmit(X),
                            className: "space-y-4 py-4",
                            children: [
                              (0, l.jsx)(k.zB, {
                                control: Q.control,
                                name: "name",
                                render: (e) => {
                                  let { field: s } = e;
                                  return (0, l.jsxs)(k.eI, {
                                    children: [
                                      (0, l.jsx)(k.lR, { children: "Name" }),
                                      (0, l.jsx)(k.MJ, {
                                        children: (0, l.jsx)(_.p, {
                                          placeholder:
                                            "Canadian Immigration Official Site",
                                          ...s,
                                        }),
                                      }),
                                      (0, l.jsx)(k.C5, {}),
                                    ],
                                  });
                                },
                              }),
                              (0, l.jsx)(k.zB, {
                                control: Q.control,
                                name: "url",
                                render: (e) => {
                                  let { field: s } = e;
                                  return (0, l.jsxs)(k.eI, {
                                    children: [
                                      (0, l.jsx)(k.lR, { children: "URL" }),
                                      (0, l.jsx)(k.MJ, {
                                        children: (0, l.jsx)(_.p, {
                                          placeholder:
                                            "https://www.example.com",
                                          ...s,
                                        }),
                                      }),
                                      (0, l.jsx)(k.C5, {}),
                                    ],
                                  });
                                },
                              }),
                              (0, l.jsx)(k.zB, {
                                control: Q.control,
                                name: "category",
                                render: (e) => {
                                  let { field: s } = e;
                                  return (0, l.jsxs)(k.eI, {
                                    children: [
                                      (0, l.jsx)(k.lR, {
                                        children: "Category",
                                      }),
                                      (0, l.jsxs)(T.l6, {
                                        onValueChange: s.onChange,
                                        defaultValue: s.value,
                                        children: [
                                          (0, l.jsx)(k.MJ, {
                                            children: (0, l.jsx)(T.bq, {
                                              children: (0, l.jsx)(T.yv, {
                                                placeholder:
                                                  "Select a category",
                                              }),
                                            }),
                                          }),
                                          (0, l.jsxs)(T.gC, {
                                            children: [
                                              (0, l.jsx)(T.eb, {
                                                value: "government",
                                                children: "Government",
                                              }),
                                              (0, l.jsx)(T.eb, {
                                                value: "legal",
                                                children: "Legal",
                                              }),
                                              (0, l.jsx)(T.eb, {
                                                value: "news",
                                                children: "News",
                                              }),
                                              (0, l.jsx)(T.eb, {
                                                value: "blog",
                                                children: "Blog",
                                              }),
                                              (0, l.jsx)(T.eb, {
                                                value: "forum",
                                                children: "Forum",
                                              }),
                                              (0, l.jsx)(T.eb, {
                                                value: "other",
                                                children: "Other",
                                              }),
                                            ],
                                          }),
                                        ],
                                      }),
                                      (0, l.jsx)(k.C5, {}),
                                    ],
                                  });
                                },
                              }),
                              (0, l.jsx)(k.zB, {
                                control: Q.control,
                                name: "description",
                                render: (e) => {
                                  let { field: s } = e;
                                  return (0, l.jsxs)(k.eI, {
                                    children: [
                                      (0, l.jsx)(k.lR, {
                                        children: "Description",
                                      }),
                                      (0, l.jsx)(k.MJ, {
                                        children: (0, l.jsx)(R.T, {
                                          placeholder:
                                            "Description of this source...",
                                          ...s,
                                          value: s.value || "",
                                        }),
                                      }),
                                      (0, l.jsx)(k.C5, {}),
                                    ],
                                  });
                                },
                              }),
                              (0, l.jsx)(k.zB, {
                                control: Q.control,
                                name: "scrape_frequency",
                                render: (e) => {
                                  let { field: s } = e;
                                  return (0, l.jsxs)(k.eI, {
                                    children: [
                                      (0, l.jsx)(k.lR, {
                                        children: "Scrape Frequency",
                                      }),
                                      (0, l.jsxs)(T.l6, {
                                        onValueChange: s.onChange,
                                        defaultValue: s.value,
                                        children: [
                                          (0, l.jsx)(k.MJ, {
                                            children: (0, l.jsx)(T.bq, {
                                              children: (0, l.jsx)(T.yv, {
                                                placeholder: "Select frequency",
                                              }),
                                            }),
                                          }),
                                          (0, l.jsxs)(T.gC, {
                                            children: [
                                              (0, l.jsx)(T.eb, {
                                                value: "1 hour",
                                                children: "Every hour",
                                              }),
                                              (0, l.jsx)(T.eb, {
                                                value: "6 hours",
                                                children: "Every 6 hours",
                                              }),
                                              (0, l.jsx)(T.eb, {
                                                value: "12 hours",
                                                children: "Every 12 hours",
                                              }),
                                              (0, l.jsx)(T.eb, {
                                                value: "1 day",
                                                children: "Daily",
                                              }),
                                              (0, l.jsx)(T.eb, {
                                                value: "3 days",
                                                children: "Every 3 days",
                                              }),
                                              (0, l.jsx)(T.eb, {
                                                value: "1 week",
                                                children: "Weekly",
                                              }),
                                              (0, l.jsx)(T.eb, {
                                                value: "2 weeks",
                                                children: "Every 2 weeks",
                                              }),
                                              (0, l.jsx)(T.eb, {
                                                value: "1 month",
                                                children: "Monthly",
                                              }),
                                              (0, l.jsx)(T.eb, {
                                                value: "manual",
                                                children: "Manual only",
                                              }),
                                            ],
                                          }),
                                        ],
                                      }),
                                      (0, l.jsx)(k.C5, {}),
                                    ],
                                  });
                                },
                              }),
                              (0, l.jsx)(k.zB, {
                                control: Q.control,
                                name: "is_active",
                                render: (e) => {
                                  let { field: s } = e;
                                  return (0, l.jsxs)(k.eI, {
                                    className:
                                      "flex flex-row items-center justify-between rounded-lg border p-3",
                                    children: [
                                      (0, l.jsxs)("div", {
                                        className: "space-y-0.5",
                                        children: [
                                          (0, l.jsx)(k.lR, {
                                            children: "Active",
                                          }),
                                          (0, l.jsx)("p", {
                                            className:
                                              "text-sm text-muted-foreground",
                                            children:
                                              "Should this source be included in scheduled scraping?",
                                          }),
                                        ],
                                      }),
                                      (0, l.jsx)(k.MJ, {
                                        children: (0, l.jsx)(A.d, {
                                          checked: s.value,
                                          onCheckedChange: s.onChange,
                                        }),
                                      }),
                                    ],
                                  });
                                },
                              }),
                              (0, l.jsxs)(S.Es, {
                                children: [
                                  (0, l.jsx)(w.$, {
                                    type: "button",
                                    variant: "outline",
                                    onClick: () => D(!1),
                                    children: "Cancel",
                                  }),
                                  (0, l.jsx)(w.$, {
                                    type: "submit",
                                    children: "Save",
                                  }),
                                ],
                              }),
                            ],
                          }),
                        }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
            (0, l.jsxs)(M.Tabs, {
              defaultValue: "all",
              className: "w-full",
              onValueChange: J,
              children: [
                (0, l.jsxs)(M.TabsList, {
                  className: "mb-4",
                  children: [
                    (0, l.jsx)(M.TabsTrigger, {
                      value: "all",
                      children: "All Sources",
                    }),
                    (0, l.jsx)(M.TabsTrigger, {
                      value: "government",
                      children: "Government",
                    }),
                    (0, l.jsx)(M.TabsTrigger, {
                      value: "legal",
                      children: "Legal",
                    }),
                    (0, l.jsx)(M.TabsTrigger, {
                      value: "news",
                      children: "News",
                    }),
                    (0, l.jsx)(M.TabsTrigger, {
                      value: "blog",
                      children: "Blogs",
                    }),
                    (0, l.jsx)(M.TabsTrigger, {
                      value: "forum",
                      children: "Forums",
                    }),
                    (0, l.jsx)(M.TabsTrigger, {
                      value: "other",
                      children: "Other",
                    }),
                  ],
                }),
                (0, l.jsx)(M.TabsContent, {
                  value: F,
                  className: "space-y-4",
                  children: y
                    ? (0, l.jsx)("div", {
                        className:
                          "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4",
                        children: Array(6)
                          .fill(0)
                          .map((e, s) =>
                            (0, l.jsxs)(
                              C.Zp,
                              {
                                className: "overflow-hidden",
                                children: [
                                  (0, l.jsxs)(C.aR, {
                                    className: "pb-2",
                                    children: [
                                      (0, l.jsx)(I.E, {
                                        className: "h-6 w-3/4 mb-2",
                                      }),
                                      (0, l.jsx)(I.E, {
                                        className: "h-4 w-full",
                                      }),
                                    ],
                                  }),
                                  (0, l.jsxs)(C.Wu, {
                                    children: [
                                      (0, l.jsx)(I.E, {
                                        className: "h-4 w-full mb-2",
                                      }),
                                      (0, l.jsx)(I.E, {
                                        className: "h-4 w-3/4",
                                      }),
                                    ],
                                  }),
                                  (0, l.jsxs)(C.wL, {
                                    className: "flex justify-between",
                                    children: [
                                      (0, l.jsx)(I.E, {
                                        className: "h-9 w-20",
                                      }),
                                      (0, l.jsx)(I.E, {
                                        className: "h-9 w-9 rounded-full",
                                      }),
                                    ],
                                  }),
                                ],
                              },
                              s,
                            ),
                          ),
                      })
                    : 0 === el.length
                      ? (0, l.jsxs)("div", {
                          className:
                            "flex flex-col items-center justify-center p-8 text-center",
                          children: [
                            (0, l.jsx)(c.A, {
                              className: "h-12 w-12 text-muted-foreground mb-4",
                            }),
                            (0, l.jsx)("h3", {
                              className: "text-lg font-medium",
                              children: "No sources found",
                            }),
                            (0, l.jsx)("p", {
                              className: "text-muted-foreground mt-1 mb-4",
                              children:
                                "all" === F
                                  ? "You haven't added any scraping sources yet."
                                  : "No ".concat(F, " sources found."),
                            }),
                            (0, l.jsxs)(w.$, {
                              onClick: () => D(!0),
                              children: [
                                (0, l.jsx)(n.A, { className: "mr-2 h-4 w-4" }),
                                "Add Your First Source",
                              ],
                            }),
                          ],
                        })
                      : (0, l.jsx)("div", {
                          className:
                            "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4",
                          children: el.map((e) =>
                            (0, l.jsxs)(
                              C.Zp,
                              {
                                className: "overflow-hidden",
                                children: [
                                  (0, l.jsxs)(C.aR, {
                                    className: "pb-2",
                                    children: [
                                      (0, l.jsxs)("div", {
                                        className:
                                          "flex justify-between items-start",
                                        children: [
                                          (0, l.jsx)(C.ZB, {
                                            className: "text-lg",
                                            children: e.name,
                                          }),
                                          (0, l.jsxs)(E.rI, {
                                            children: [
                                              (0, l.jsx)(E.ty, {
                                                asChild: !0,
                                                children: (0, l.jsx)(w.$, {
                                                  variant: "ghost",
                                                  size: "icon",
                                                  className: "h-8 w-8",
                                                  children: (0, l.jsx)(i.A, {
                                                    className: "h-4 w-4",
                                                  }),
                                                }),
                                              }),
                                              (0, l.jsxs)(E.SQ, {
                                                align: "end",
                                                children: [
                                                  (0, l.jsxs)(E._2, {
                                                    onClick: () => {
                                                      U(e), $(!0);
                                                    },
                                                    children: [
                                                      (0, l.jsx)(t.A, {
                                                        className:
                                                          "mr-2 h-4 w-4",
                                                      }),
                                                      "Edit",
                                                    ],
                                                  }),
                                                  (0, l.jsxs)(E._2, {
                                                    onClick: () => {
                                                      window.open(
                                                        e.url,
                                                        "_blank",
                                                      );
                                                    },
                                                    children: [
                                                      (0, l.jsx)(d.A, {
                                                        className:
                                                          "mr-2 h-4 w-4",
                                                      }),
                                                      "Visit Source",
                                                    ],
                                                  }),
                                                  (0, l.jsxs)(E._2, {
                                                    onClick: () => {
                                                      U(e), G(!0);
                                                    },
                                                    children: [
                                                      (0, l.jsx)(o.A, {
                                                        className:
                                                          "mr-2 h-4 w-4",
                                                      }),
                                                      "Validate",
                                                    ],
                                                  }),
                                                  (0, l.jsxs)(E._2, {
                                                    onClick: () => es(e.id),
                                                    children: [
                                                      (0, l.jsx)(h.A, {
                                                        className:
                                                          "mr-2 h-4 w-4",
                                                      }),
                                                      "Scrape Now",
                                                    ],
                                                  }),
                                                  (0, l.jsx)(E.mB, {}),
                                                  (0, l.jsxs)(b.Lt, {
                                                    children: [
                                                      (0, l.jsx)(b.tv, {
                                                        asChild: !0,
                                                        children: (0, l.jsxs)(
                                                          E._2,
                                                          {
                                                            onSelect: (e) =>
                                                              e.preventDefault(),
                                                            children: [
                                                              (0, l.jsx)(x.A, {
                                                                className:
                                                                  "mr-2 h-4 w-4",
                                                              }),
                                                              "Delete",
                                                            ],
                                                          },
                                                        ),
                                                      }),
                                                      (0, l.jsxs)(b.EO, {
                                                        children: [
                                                          (0, l.jsxs)(b.wd, {
                                                            children: [
                                                              (0, l.jsx)(b.r7, {
                                                                children:
                                                                  "Are you absolutely sure?",
                                                              }),
                                                              (0, l.jsxs)(
                                                                b.$v,
                                                                {
                                                                  children: [
                                                                    'This will permanently delete the scraping source "',
                                                                    e.name,
                                                                    '" and all associated validation records.',
                                                                  ],
                                                                },
                                                              ),
                                                            ],
                                                          }),
                                                          (0, l.jsxs)(b.ck, {
                                                            children: [
                                                              (0, l.jsx)(b.Zr, {
                                                                children:
                                                                  "Cancel",
                                                              }),
                                                              (0, l.jsx)(b.Rx, {
                                                                onClick: () =>
                                                                  ee(e.id),
                                                                className:
                                                                  "bg-destructive text-destructive-foreground",
                                                                children:
                                                                  "Delete",
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
                                        ],
                                      }),
                                      (0, l.jsxs)("div", {
                                        className: "flex items-center gap-2",
                                        children: [
                                          (0, l.jsx)(N.E, {
                                            variant: e.is_active
                                              ? "default"
                                              : "secondary",
                                            children: e.is_active
                                              ? "Active"
                                              : "Inactive",
                                          }),
                                          (0, l.jsx)(N.E, {
                                            variant: "outline",
                                            className: "capitalize",
                                            children: e.category,
                                          }),
                                        ],
                                      }),
                                    ],
                                  }),
                                  (0, l.jsxs)(C.Wu, {
                                    className: "pb-2",
                                    children: [
                                      (0, l.jsx)("p", {
                                        className:
                                          "text-sm text-muted-foreground truncate",
                                        children: (0, l.jsx)("a", {
                                          href: e.url,
                                          target: "_blank",
                                          rel: "noopener noreferrer",
                                          className: "hover:underline",
                                          children: e.url,
                                        }),
                                      }),
                                      e.description &&
                                        (0, l.jsx)("p", {
                                          className:
                                            "text-sm mt-2 line-clamp-2",
                                          children: e.description,
                                        }),
                                    ],
                                  }),
                                  (0, l.jsxs)(C.wL, {
                                    className: "flex justify-between pt-2",
                                    children: [
                                      (0, l.jsxs)("div", {
                                        className: "flex flex-col",
                                        children: [
                                          (0, l.jsxs)("div", {
                                            className:
                                              "flex items-center gap-1 text-sm text-muted-foreground",
                                            children: [
                                              (0, l.jsx)(u.A, {
                                                className: "h-3 w-3",
                                              }),
                                              (0, l.jsx)("span", {
                                                children: e.last_scraped
                                                  ? new Date(
                                                      e.last_scraped,
                                                    ).toLocaleDateString()
                                                  : "Never scraped",
                                              }),
                                            ],
                                          }),
                                          (0, l.jsxs)("div", {
                                            className:
                                              "flex items-center gap-1 text-sm text-muted-foreground",
                                            children: [
                                              (0, l.jsx)(j.A, {
                                                className: "h-3 w-3",
                                              }),
                                              (0, l.jsx)("span", {
                                                children:
                                                  "manual" ===
                                                  e.scrape_frequency
                                                    ? "Manual only"
                                                    : "Every ".concat(
                                                        e.scrape_frequency,
                                                      ),
                                              }),
                                            ],
                                          }),
                                        ],
                                      }),
                                      (0, l.jsx)("div", {
                                        className: "flex items-center",
                                        children: (0, l.jsxs)("div", {
                                          className:
                                            "flex items-center gap-1 rounded-full px-2 py-1 bg-muted",
                                          title: "Trust Score",
                                          children: [
                                            (0, l.jsx)(o.A, {
                                              className: "h-3 w-3",
                                            }),
                                            (0, l.jsx)("span", {
                                              className: "text-sm font-medium",
                                              children: e.trust_score,
                                            }),
                                          ],
                                        }),
                                      }),
                                    ],
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
            (0, l.jsx)(S.lG, {
              open: L,
              onOpenChange: $,
              children: (0, l.jsxs)(S.Cf, {
                className: "sm:max-w-[425px]",
                children: [
                  (0, l.jsxs)(S.c7, {
                    children: [
                      (0, l.jsx)(S.L3, { children: "Edit Scraping Source" }),
                      (0, l.jsx)(S.rr, {
                        children:
                          "Update the details for this scraping source.",
                      }),
                    ],
                  }),
                  (0, l.jsx)(k.lV, {
                    ...Q,
                    children: (0, l.jsxs)("form", {
                      onSubmit: Q.handleSubmit(X),
                      className: "space-y-4 py-4",
                      children: [
                        (0, l.jsx)(k.zB, {
                          control: Q.control,
                          name: "name",
                          render: (e) => {
                            let { field: s } = e;
                            return (0, l.jsxs)(k.eI, {
                              children: [
                                (0, l.jsx)(k.lR, { children: "Name" }),
                                (0, l.jsx)(k.MJ, {
                                  children: (0, l.jsx)(_.p, { ...s }),
                                }),
                                (0, l.jsx)(k.C5, {}),
                              ],
                            });
                          },
                        }),
                        (0, l.jsx)(k.zB, {
                          control: Q.control,
                          name: "url",
                          render: (e) => {
                            let { field: s } = e;
                            return (0, l.jsxs)(k.eI, {
                              children: [
                                (0, l.jsx)(k.lR, { children: "URL" }),
                                (0, l.jsx)(k.MJ, {
                                  children: (0, l.jsx)(_.p, { ...s }),
                                }),
                                (0, l.jsx)(k.C5, {}),
                              ],
                            });
                          },
                        }),
                        (0, l.jsx)(k.zB, {
                          control: Q.control,
                          name: "category",
                          render: (e) => {
                            let { field: s } = e;
                            return (0, l.jsxs)(k.eI, {
                              children: [
                                (0, l.jsx)(k.lR, { children: "Category" }),
                                (0, l.jsxs)(T.l6, {
                                  onValueChange: s.onChange,
                                  value: s.value,
                                  children: [
                                    (0, l.jsx)(k.MJ, {
                                      children: (0, l.jsx)(T.bq, {
                                        children: (0, l.jsx)(T.yv, {
                                          placeholder: "Select a category",
                                        }),
                                      }),
                                    }),
                                    (0, l.jsxs)(T.gC, {
                                      children: [
                                        (0, l.jsx)(T.eb, {
                                          value: "government",
                                          children: "Government",
                                        }),
                                        (0, l.jsx)(T.eb, {
                                          value: "legal",
                                          children: "Legal",
                                        }),
                                        (0, l.jsx)(T.eb, {
                                          value: "news",
                                          children: "News",
                                        }),
                                        (0, l.jsx)(T.eb, {
                                          value: "blog",
                                          children: "Blog",
                                        }),
                                        (0, l.jsx)(T.eb, {
                                          value: "forum",
                                          children: "Forum",
                                        }),
                                        (0, l.jsx)(T.eb, {
                                          value: "other",
                                          children: "Other",
                                        }),
                                      ],
                                    }),
                                  ],
                                }),
                                (0, l.jsx)(k.C5, {}),
                              ],
                            });
                          },
                        }),
                        (0, l.jsx)(k.zB, {
                          control: Q.control,
                          name: "description",
                          render: (e) => {
                            let { field: s } = e;
                            return (0, l.jsxs)(k.eI, {
                              children: [
                                (0, l.jsx)(k.lR, { children: "Description" }),
                                (0, l.jsx)(k.MJ, {
                                  children: (0, l.jsx)(R.T, {
                                    ...s,
                                    value: s.value || "",
                                  }),
                                }),
                                (0, l.jsx)(k.C5, {}),
                              ],
                            });
                          },
                        }),
                        (0, l.jsx)(k.zB, {
                          control: Q.control,
                          name: "scrape_frequency",
                          render: (e) => {
                            let { field: s } = e;
                            return (0, l.jsxs)(k.eI, {
                              children: [
                                (0, l.jsx)(k.lR, {
                                  children: "Scrape Frequency",
                                }),
                                (0, l.jsxs)(T.l6, {
                                  onValueChange: s.onChange,
                                  value: s.value,
                                  children: [
                                    (0, l.jsx)(k.MJ, {
                                      children: (0, l.jsx)(T.bq, {
                                        children: (0, l.jsx)(T.yv, {
                                          placeholder: "Select frequency",
                                        }),
                                      }),
                                    }),
                                    (0, l.jsxs)(T.gC, {
                                      children: [
                                        (0, l.jsx)(T.eb, {
                                          value: "1 hour",
                                          children: "Every hour",
                                        }),
                                        (0, l.jsx)(T.eb, {
                                          value: "6 hours",
                                          children: "Every 6 hours",
                                        }),
                                        (0, l.jsx)(T.eb, {
                                          value: "12 hours",
                                          children: "Every 12 hours",
                                        }),
                                        (0, l.jsx)(T.eb, {
                                          value: "1 day",
                                          children: "Daily",
                                        }),
                                        (0, l.jsx)(T.eb, {
                                          value: "3 days",
                                          children: "Every 3 days",
                                        }),
                                        (0, l.jsx)(T.eb, {
                                          value: "1 week",
                                          children: "Weekly",
                                        }),
                                        (0, l.jsx)(T.eb, {
                                          value: "2 weeks",
                                          children: "Every 2 weeks",
                                        }),
                                        (0, l.jsx)(T.eb, {
                                          value: "1 month",
                                          children: "Monthly",
                                        }),
                                        (0, l.jsx)(T.eb, {
                                          value: "manual",
                                          children: "Manual only",
                                        }),
                                      ],
                                    }),
                                  ],
                                }),
                                (0, l.jsx)(k.C5, {}),
                              ],
                            });
                          },
                        }),
                        (0, l.jsx)(k.zB, {
                          control: Q.control,
                          name: "is_active",
                          render: (e) => {
                            let { field: s } = e;
                            return (0, l.jsxs)(k.eI, {
                              className:
                                "flex flex-row items-center justify-between rounded-lg border p-3",
                              children: [
                                (0, l.jsxs)("div", {
                                  className: "space-y-0.5",
                                  children: [
                                    (0, l.jsx)(k.lR, { children: "Active" }),
                                    (0, l.jsx)("p", {
                                      className:
                                        "text-sm text-muted-foreground",
                                      children:
                                        "Should this source be included in scheduled scraping?",
                                    }),
                                  ],
                                }),
                                (0, l.jsx)(k.MJ, {
                                  children: (0, l.jsx)(A.d, {
                                    checked: s.value,
                                    onCheckedChange: s.onChange,
                                  }),
                                }),
                              ],
                            });
                          },
                        }),
                        (0, l.jsxs)(S.Es, {
                          children: [
                            (0, l.jsx)(w.$, {
                              type: "button",
                              variant: "outline",
                              onClick: () => $(!1),
                              children: "Cancel",
                            }),
                            (0, l.jsx)(w.$, {
                              type: "submit",
                              children: "Save Changes",
                            }),
                          ],
                        }),
                      ],
                    }),
                  }),
                ],
              }),
            }),
            (0, l.jsx)(S.lG, {
              open: Y,
              onOpenChange: G,
              children: (0, l.jsxs)(S.Cf, {
                className: "sm:max-w-[425px]",
                children: [
                  (0, l.jsxs)(S.c7, {
                    children: [
                      (0, l.jsx)(S.L3, { children: "Validate Source" }),
                      (0, l.jsx)(S.rr, {
                        children:
                          "Rate the reliability and quality of this source.",
                      }),
                    ],
                  }),
                  P &&
                    (0, l.jsxs)(l.Fragment, {
                      children: [
                        (0, l.jsxs)("div", {
                          className: "py-4",
                          children: [
                            (0, l.jsx)("h3", {
                              className: "font-medium",
                              children: P.name,
                            }),
                            (0, l.jsx)("p", {
                              className: "text-sm text-muted-foreground",
                              children: P.url,
                            }),
                            (0, l.jsx)("div", {
                              className: "flex items-center mt-2",
                              children: (0, l.jsxs)("div", {
                                className:
                                  "flex items-center gap-1 rounded-full px-2 py-1 bg-muted",
                                children: [
                                  (0, l.jsx)(o.A, { className: "h-4 w-4" }),
                                  (0, l.jsxs)("span", {
                                    className: "text-sm font-medium",
                                    children: [
                                      "Current score: ",
                                      P.trust_score,
                                    ],
                                  }),
                                ],
                              }),
                            }),
                          ],
                        }),
                        (0, l.jsx)(k.lV, {
                          ...H,
                          children: (0, l.jsxs)("form", {
                            onSubmit: H.handleSubmit(er),
                            className: "space-y-4",
                            children: [
                              (0, l.jsx)(k.zB, {
                                control: H.control,
                                name: "score",
                                render: (e) => {
                                  let { field: s } = e;
                                  return (0, l.jsxs)(k.eI, {
                                    children: [
                                      (0, l.jsx)(k.lR, {
                                        children: "Trust Score (0-100)",
                                      }),
                                      (0, l.jsxs)("div", {
                                        className: "space-y-2",
                                        children: [
                                          (0, l.jsxs)("div", {
                                            className:
                                              "flex justify-between text-xs text-muted-foreground",
                                            children: [
                                              (0, l.jsxs)("span", {
                                                className: "flex items-center",
                                                children: [
                                                  (0, l.jsx)(m.A, {
                                                    className: "h-3 w-3 mr-1",
                                                  }),
                                                  "Unreliable",
                                                ],
                                              }),
                                              (0, l.jsxs)("span", {
                                                className: "flex items-center",
                                                children: [
                                                  (0, l.jsx)(p.A, {
                                                    className: "h-3 w-3 mr-1",
                                                  }),
                                                  "Very reliable",
                                                ],
                                              }),
                                            ],
                                          }),
                                          (0, l.jsx)(k.MJ, {
                                            children: (0, l.jsxs)("div", {
                                              className:
                                                "flex items-center gap-4",
                                              children: [
                                                (0, l.jsx)(_.p, {
                                                  type: "range",
                                                  min: 0,
                                                  max: 100,
                                                  step: 1,
                                                  className: "w-full",
                                                  ...s,
                                                  value: s.value,
                                                  onChange: (e) =>
                                                    s.onChange(
                                                      parseInt(
                                                        e.target.value,
                                                        10,
                                                      ),
                                                    ),
                                                }),
                                                (0, l.jsx)("span", {
                                                  className:
                                                    "font-medium w-8 text-center",
                                                  children: s.value,
                                                }),
                                              ],
                                            }),
                                          }),
                                        ],
                                      }),
                                      (0, l.jsx)(k.C5, {}),
                                    ],
                                  });
                                },
                              }),
                              (0, l.jsx)(k.zB, {
                                control: H.control,
                                name: "notes",
                                render: (e) => {
                                  let { field: s } = e;
                                  return (0, l.jsxs)(k.eI, {
                                    children: [
                                      (0, l.jsx)(k.lR, { children: "Notes" }),
                                      (0, l.jsx)(k.MJ, {
                                        children: (0, l.jsx)(R.T, {
                                          placeholder:
                                            "Why did you give this score? (optional)",
                                          className: "min-h-[80px]",
                                          ...s,
                                          value: s.value || "",
                                        }),
                                      }),
                                      (0, l.jsx)(k.C5, {}),
                                    ],
                                  });
                                },
                              }),
                              (0, l.jsxs)(S.Es, {
                                children: [
                                  (0, l.jsx)(w.$, {
                                    type: "button",
                                    variant: "outline",
                                    onClick: () => G(!1),
                                    children: "Cancel",
                                  }),
                                  (0, l.jsx)(w.$, {
                                    type: "submit",
                                    disabled: W,
                                    children: W
                                      ? "Submitting..."
                                      : "Submit Validation",
                                  }),
                                ],
                              }),
                            ],
                          }),
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
    e.O(0, [6593, 4223, 3209, 7358], () => s(17779)), (_N_E = e.O());
  },
]);
