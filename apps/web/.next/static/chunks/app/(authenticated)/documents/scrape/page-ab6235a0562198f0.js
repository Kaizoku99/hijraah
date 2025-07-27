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
    (e._sentryDebugIds[s] = "706ed583-4791-4ef2-a071-7539bd3e778f"),
    (e._sentryDebugIdIdentifier =
      "sentry-dbid-706ed583-4791-4ef2-a071-7539bd3e778f"));
} catch (e) {}
(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [8291],
  {
    91266: (e, s, a) => {
      Promise.resolve().then(a.bind(a, 91790));
    },
    91790: (e, s, a) => {
      "use strict";
      a.r(s), a.d(s, { default: () => F });
      var t = a(30602),
        r = a(13575),
        l = a(97687),
        i = a.n(l),
        n = a(85218),
        c = a(26515),
        d = a(74583),
        m = a(24486),
        o = a(1055),
        x = a(86202),
        h = a(45783),
        u = a(71188),
        j = a(77030),
        p = a(41960),
        g = a(72508),
        f = a(17967),
        N = a(69727),
        y = a(5271),
        v = a(77413),
        b = a(16873),
        w = a(4401),
        k = a(21382),
        S = a(86697),
        C = a(1805),
        D = a(47482);
      let I = f.Ik({
        url: f.Yj().url({ message: "Please enter a valid URL" }),
        waitForNetworkIdle: f.zM().default(!0),
        extractLinks: f.zM().default(!0),
        mobile: f.zM().default(!1),
        waitForSelectors: f.Yj().optional(),
        extractSelectors: f.Yj().optional(),
        generateSummary: f.zM().default(!0),
        extractData: f.zM().default(!0),
      });
      function T() {
        let e = (0, p.useRouter)(),
          { toast: s } = (0, D.d)(),
          [a, r] = (0, n.useState)(!1),
          [l, i] = (0, n.useState)("url"),
          [f, T] = (0, n.useState)(null),
          R = (0, g.mN)({
            resolver: (0, c.u)(I),
            defaultValues: {
              url: "",
              waitForNetworkIdle: !0,
              extractLinks: !0,
              mobile: !1,
              waitForSelectors: "",
              extractSelectors: "",
              generateSummary: !0,
              extractData: !0,
            },
          }),
          A = async (e) => {
            r(!0), T(null);
            try {
              let a,
                t = localStorage.getItem("user-data"),
                r = t ? JSON.parse(t).id : null,
                l = e.waitForSelectors
                  ? e.waitForSelectors.split(",").map((e) => e.trim())
                  : void 0;
              if (e.extractSelectors)
                try {
                  a = JSON.parse(e.extractSelectors);
                } catch (t) {
                  let s = e.extractSelectors.split(",");
                  for (let e of ((a = {}), s)) {
                    let [s, t] = e.split(":").map((e) => e.trim());
                    s && t && (a[s] = t);
                  }
                }
              let n = {
                  waitForNetworkIdle: e.waitForNetworkIdle,
                  extractLinks: e.extractLinks,
                  mobile: e.mobile,
                  waitForSelectors: l,
                  extractSelectors: a,
                  timeout: 3e4,
                },
                c = await fetch("/api/scraper", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    url: e.url,
                    options: n,
                    userId: r,
                    generateSummary: e.generateSummary,
                    extractData: e.extractData,
                  }),
                });
              if (!c.ok) throw Error("Failed to scrape URL");
              let d = await c.json();
              if ((T(d), i("preview"), d.saved)) {
                s({
                  title: "Content saved successfully",
                  description:
                    "The scraped content has been saved to your documents.",
                });
                try {
                  let e = window.__ARTIFACT_CONTEXT__;
                  (null == e ? void 0 : e.refreshArtifacts) &&
                    e.refreshArtifacts();
                } catch (e) {}
              }
            } catch (e) {
              console.error("Error:", e),
                s({
                  title: "Error",
                  description: "Failed to scrape URL. Please try again.",
                  variant: "destructive",
                });
            } finally {
              r(!1);
            }
          };
        return (0, t.jsx)("div", {
          className: "container mx-auto p-4 max-w-4xl",
          children: (0, t.jsxs)(v.Zp, {
            children: [
              (0, t.jsx)(v.aR, {
                children: (0, t.jsxs)(v.ZB, {
                  className: "text-2xl flex items-center gap-2",
                  children: [
                    (0, t.jsx)(d.A, { className: "h-6 w-6" }),
                    "Web Scraper",
                  ],
                }),
              }),
              (0, t.jsx)(v.Wu, {
                children: (0, t.jsxs)(S.Tabs, {
                  defaultValue: l,
                  children: [
                    (0, t.jsxs)(S.TabsList, {
                      className: "mb-4",
                      children: [
                        (0, t.jsxs)(S.TabsTrigger, {
                          value: "url",
                          onClick: () => i("url"),
                          children: [
                            (0, t.jsx)(m.A, { className: "h-4 w-4 mr-2" }),
                            "URL Input",
                          ],
                        }),
                        (0, t.jsxs)(S.TabsTrigger, {
                          value: "preview",
                          disabled: !f,
                          onClick: () => i("preview"),
                          children: [
                            (0, t.jsx)(o.A, { className: "h-4 w-4 mr-2" }),
                            "Content Preview",
                          ],
                        }),
                      ],
                    }),
                    (0, t.jsx)(S.TabsContent, {
                      value: "url",
                      children: (0, t.jsxs)("form", {
                        onSubmit: R.handleSubmit(A),
                        className: "space-y-6",
                        children: [
                          (0, t.jsx)(b.zB, {
                            control: R.control,
                            name: "url",
                            render: (e) => {
                              let { field: s } = e;
                              return (0, t.jsxs)(b.eI, {
                                children: [
                                  (0, t.jsx)(b.lR, { children: "Website URL" }),
                                  (0, t.jsx)(b.MJ, {
                                    children: (0, t.jsx)(w.p, {
                                      placeholder: "https://www.example.com",
                                      ...s,
                                    }),
                                  }),
                                  (0, t.jsx)(b.C5, {}),
                                ],
                              });
                            },
                          }),
                          (0, t.jsxs)("div", {
                            className: "grid grid-cols-1 md:grid-cols-2 gap-4",
                            children: [
                              (0, t.jsxs)("div", {
                                className: "space-y-4",
                                children: [
                                  (0, t.jsx)("h3", {
                                    className: "text-lg font-medium",
                                    children: "Basic Options",
                                  }),
                                  (0, t.jsx)(b.zB, {
                                    control: R.control,
                                    name: "waitForNetworkIdle",
                                    render: (e) => {
                                      let { field: s } = e;
                                      return (0, t.jsxs)(b.eI, {
                                        className:
                                          "flex items-center justify-between space-x-2",
                                        children: [
                                          (0, t.jsx)(b.lR, {
                                            children: "Wait for network idle",
                                          }),
                                          (0, t.jsx)(b.MJ, {
                                            children: (0, t.jsx)(k.d, {
                                              checked: s.value,
                                              onCheckedChange: s.onChange,
                                            }),
                                          }),
                                        ],
                                      });
                                    },
                                  }),
                                  (0, t.jsx)(b.zB, {
                                    control: R.control,
                                    name: "extractLinks",
                                    render: (e) => {
                                      let { field: s } = e;
                                      return (0, t.jsxs)(b.eI, {
                                        className:
                                          "flex items-center justify-between space-x-2",
                                        children: [
                                          (0, t.jsx)(b.lR, {
                                            children: "Extract links",
                                          }),
                                          (0, t.jsx)(b.MJ, {
                                            children: (0, t.jsx)(k.d, {
                                              checked: s.value,
                                              onCheckedChange: s.onChange,
                                            }),
                                          }),
                                        ],
                                      });
                                    },
                                  }),
                                  (0, t.jsx)(b.zB, {
                                    control: R.control,
                                    name: "mobile",
                                    render: (e) => {
                                      let { field: s } = e;
                                      return (0, t.jsxs)(b.eI, {
                                        className:
                                          "flex items-center justify-between space-x-2",
                                        children: [
                                          (0, t.jsx)(b.lR, {
                                            children: "Mobile emulation",
                                          }),
                                          (0, t.jsx)(b.MJ, {
                                            children: (0, t.jsx)(k.d, {
                                              checked: s.value,
                                              onCheckedChange: s.onChange,
                                            }),
                                          }),
                                        ],
                                      });
                                    },
                                  }),
                                ],
                              }),
                              (0, t.jsxs)("div", {
                                className: "space-y-4",
                                children: [
                                  (0, t.jsx)("h3", {
                                    className: "text-lg font-medium",
                                    children: "AI Features",
                                  }),
                                  (0, t.jsx)(b.zB, {
                                    control: R.control,
                                    name: "generateSummary",
                                    render: (e) => {
                                      let { field: s } = e;
                                      return (0, t.jsxs)(b.eI, {
                                        className:
                                          "flex items-center justify-between space-x-2",
                                        children: [
                                          (0, t.jsxs)("div", {
                                            children: [
                                              (0, t.jsxs)(b.lR, {
                                                className: "flex items-center",
                                                children: [
                                                  (0, t.jsx)(x.A, {
                                                    className: "h-4 w-4 mr-2",
                                                  }),
                                                  "Generate AI Summary",
                                                ],
                                              }),
                                              (0, t.jsx)("p", {
                                                className:
                                                  "text-sm text-gray-500",
                                                children:
                                                  "Create a concise summary of the content",
                                              }),
                                            ],
                                          }),
                                          (0, t.jsx)(b.MJ, {
                                            children: (0, t.jsx)(k.d, {
                                              checked: s.value,
                                              onCheckedChange: s.onChange,
                                            }),
                                          }),
                                        ],
                                      });
                                    },
                                  }),
                                  (0, t.jsx)(b.zB, {
                                    control: R.control,
                                    name: "extractData",
                                    render: (e) => {
                                      let { field: s } = e;
                                      return (0, t.jsxs)(b.eI, {
                                        className:
                                          "flex items-center justify-between space-x-2",
                                        children: [
                                          (0, t.jsxs)("div", {
                                            children: [
                                              (0, t.jsxs)(b.lR, {
                                                className: "flex items-center",
                                                children: [
                                                  (0, t.jsx)(h.A, {
                                                    className: "h-4 w-4 mr-2",
                                                  }),
                                                  "Extract Immigration Data",
                                                ],
                                              }),
                                              (0, t.jsx)("p", {
                                                className:
                                                  "text-sm text-gray-500",
                                                children:
                                                  "Extract structured immigration information",
                                              }),
                                            ],
                                          }),
                                          (0, t.jsx)(b.MJ, {
                                            children: (0, t.jsx)(k.d, {
                                              checked: s.value,
                                              onCheckedChange: s.onChange,
                                            }),
                                          }),
                                        ],
                                      });
                                    },
                                  }),
                                ],
                              }),
                            ],
                          }),
                          (0, t.jsx)(N.nD, {
                            type: "single",
                            collapsible: !0,
                            className: "w-full",
                            children: (0, t.jsxs)(N.As, {
                              value: "advanced",
                              children: [
                                (0, t.jsx)(N.$m, {
                                  children: "Advanced Options",
                                }),
                                (0, t.jsx)(N.ub, {
                                  children: (0, t.jsxs)("div", {
                                    className: "space-y-4 pt-2",
                                    children: [
                                      (0, t.jsx)(b.zB, {
                                        control: R.control,
                                        name: "waitForSelectors",
                                        render: (e) => {
                                          let { field: s } = e;
                                          return (0, t.jsxs)(b.eI, {
                                            children: [
                                              (0, t.jsx)(b.lR, {
                                                children:
                                                  "Wait for selectors (comma separated)",
                                              }),
                                              (0, t.jsx)(b.MJ, {
                                                children: (0, t.jsx)(w.p, {
                                                  placeholder:
                                                    "#main-content, .article-body",
                                                  ...s,
                                                }),
                                              }),
                                              (0, t.jsx)("p", {
                                                className:
                                                  "text-sm text-gray-500",
                                                children:
                                                  "CSS selectors to wait for before scraping",
                                              }),
                                              (0, t.jsx)(b.C5, {}),
                                            ],
                                          });
                                        },
                                      }),
                                      (0, t.jsx)(b.zB, {
                                        control: R.control,
                                        name: "extractSelectors",
                                        render: (e) => {
                                          let { field: s } = e;
                                          return (0, t.jsxs)(b.eI, {
                                            children: [
                                              (0, t.jsx)(b.lR, {
                                                children:
                                                  "Extract selectors (JSON or key:value format)",
                                              }),
                                              (0, t.jsx)(b.MJ, {
                                                children: (0, t.jsx)(C.T, {
                                                  placeholder:
                                                    '{"title": "h1", "content": ".article-body"}',
                                                  ...s,
                                                }),
                                              }),
                                              (0, t.jsx)("p", {
                                                className:
                                                  "text-sm text-gray-500",
                                                children:
                                                  "CSS selectors to extract specific content",
                                              }),
                                              (0, t.jsx)(b.C5, {}),
                                            ],
                                          });
                                        },
                                      }),
                                    ],
                                  }),
                                }),
                              ],
                            }),
                          }),
                          (0, t.jsx)(y.$, {
                            type: "submit",
                            className: "w-full",
                            disabled: a,
                            children: a
                              ? (0, t.jsxs)(t.Fragment, {
                                  children: [
                                    (0, t.jsx)(u.A, {
                                      className: "mr-2 h-4 w-4 animate-spin",
                                    }),
                                    "Scraping...",
                                  ],
                                })
                              : (0, t.jsx)(t.Fragment, { children: "Scrape" }),
                          }),
                        ],
                      }),
                    }),
                    (0, t.jsx)(S.TabsContent, {
                      value: "preview",
                      children:
                        f &&
                        (0, t.jsxs)("div", {
                          className: "space-y-6",
                          children: [
                            (0, t.jsxs)("div", {
                              children: [
                                (0, t.jsx)("h3", {
                                  className: "text-lg font-medium mb-2",
                                  children: f.title || "Scraped Content",
                                }),
                                (0, t.jsxs)("p", {
                                  className: "text-sm text-gray-500",
                                  children: [
                                    "Source: ",
                                    (0, t.jsx)("a", {
                                      href: f.url,
                                      target: "_blank",
                                      rel: "noopener noreferrer",
                                      className:
                                        "text-blue-500 hover:underline",
                                      children: f.url,
                                    }),
                                  ],
                                }),
                              ],
                            }),
                            f.summary &&
                              (0, t.jsxs)(v.Zp, {
                                children: [
                                  (0, t.jsx)(v.aR, {
                                    children: (0, t.jsxs)(v.ZB, {
                                      className:
                                        "text-md flex items-center gap-2",
                                      children: [
                                        (0, t.jsx)(x.A, {
                                          className: "h-5 w-5",
                                        }),
                                        "AI Summary",
                                      ],
                                    }),
                                  }),
                                  (0, t.jsx)(v.Wu, {
                                    children: (0, t.jsx)("div", {
                                      className: "prose max-w-none",
                                      children: f.summary
                                        .split("\n")
                                        .map((e, s) =>
                                          (0, t.jsx)("p", { children: e }, s),
                                        ),
                                    }),
                                  }),
                                ],
                              }),
                            f.immigrationData &&
                              (0, t.jsxs)(v.Zp, {
                                children: [
                                  (0, t.jsx)(v.aR, {
                                    children: (0, t.jsxs)(v.ZB, {
                                      className:
                                        "text-md flex items-center gap-2",
                                      children: [
                                        (0, t.jsx)(h.A, {
                                          className: "h-5 w-5",
                                        }),
                                        "Immigration Data",
                                      ],
                                    }),
                                  }),
                                  (0, t.jsx)(v.Wu, {
                                    children: (0, t.jsxs)("div", {
                                      className:
                                        "grid grid-cols-1 md:grid-cols-2 gap-4",
                                      children: [
                                        f.immigrationData.documentType &&
                                          (0, t.jsxs)("div", {
                                            children: [
                                              (0, t.jsx)("h4", {
                                                className: "font-medium",
                                                children: "Document Type",
                                              }),
                                              (0, t.jsx)("p", {
                                                children:
                                                  f.immigrationData
                                                    .documentType,
                                              }),
                                            ],
                                          }),
                                        f.immigrationData.sourceType &&
                                          (0, t.jsxs)("div", {
                                            children: [
                                              (0, t.jsx)("h4", {
                                                className: "font-medium",
                                                children: "Source Type",
                                              }),
                                              (0, t.jsx)("p", {
                                                children:
                                                  f.immigrationData.sourceType,
                                              }),
                                            ],
                                          }),
                                        f.immigrationData.credibilityScore &&
                                          (0, t.jsxs)("div", {
                                            children: [
                                              (0, t.jsx)("h4", {
                                                className: "font-medium",
                                                children: "Credibility Score",
                                              }),
                                              (0, t.jsxs)("p", {
                                                children: [
                                                  f.immigrationData
                                                    .credibilityScore,
                                                  "/100",
                                                ],
                                              }),
                                            ],
                                          }),
                                        f.immigrationData.countries &&
                                          f.immigrationData.countries.length >
                                            0 &&
                                          (0, t.jsxs)("div", {
                                            children: [
                                              (0, t.jsx)("h4", {
                                                className: "font-medium",
                                                children: "Countries",
                                              }),
                                              (0, t.jsx)("p", {
                                                children:
                                                  f.immigrationData.countries.join(
                                                    ", ",
                                                  ),
                                              }),
                                            ],
                                          }),
                                        f.immigrationData.visaTypes &&
                                          f.immigrationData.visaTypes.length >
                                            0 &&
                                          (0, t.jsxs)("div", {
                                            className: "col-span-2",
                                            children: [
                                              (0, t.jsx)("h4", {
                                                className: "font-medium",
                                                children: "Visa Types",
                                              }),
                                              (0, t.jsx)("p", {
                                                children:
                                                  f.immigrationData.visaTypes.join(
                                                    ", ",
                                                  ),
                                              }),
                                            ],
                                          }),
                                        f.immigrationData.requirements &&
                                          f.immigrationData.requirements
                                            .length > 0 &&
                                          (0, t.jsxs)("div", {
                                            className: "col-span-2",
                                            children: [
                                              (0, t.jsx)("h4", {
                                                className: "font-medium",
                                                children: "Requirements",
                                              }),
                                              (0, t.jsx)("ul", {
                                                className: "list-disc pl-5",
                                                children:
                                                  f.immigrationData.requirements.map(
                                                    (e, s) =>
                                                      (0, t.jsx)(
                                                        "li",
                                                        { children: e },
                                                        s,
                                                      ),
                                                  ),
                                              }),
                                            ],
                                          }),
                                        f.immigrationData.keyPoints &&
                                          f.immigrationData.keyPoints.length >
                                            0 &&
                                          (0, t.jsxs)("div", {
                                            className: "col-span-2",
                                            children: [
                                              (0, t.jsx)("h4", {
                                                className: "font-medium",
                                                children: "Key Points",
                                              }),
                                              (0, t.jsx)("ul", {
                                                className: "list-disc pl-5",
                                                children:
                                                  f.immigrationData.keyPoints.map(
                                                    (e, s) =>
                                                      (0, t.jsx)(
                                                        "li",
                                                        { children: e },
                                                        s,
                                                      ),
                                                  ),
                                              }),
                                            ],
                                          }),
                                      ],
                                    }),
                                  }),
                                ],
                              }),
                            (0, t.jsxs)("div", {
                              children: [
                                (0, t.jsx)("h3", {
                                  className: "text-lg font-medium mb-2",
                                  children: "Original Content",
                                }),
                                (0, t.jsx)("div", {
                                  className:
                                    "max-h-96 overflow-y-auto bg-gray-50 dark:bg-gray-900 rounded-md p-4",
                                  children: (0, t.jsx)("pre", {
                                    className: "whitespace-pre-wrap text-sm",
                                    children: f.content,
                                  }),
                                }),
                              ],
                            }),
                            (0, t.jsxs)("div", {
                              className: "flex justify-between",
                              children: [
                                (0, t.jsx)(y.$, {
                                  variant: "outline",
                                  onClick: () => i("url"),
                                  children: "Back to URL Input",
                                }),
                                (0, t.jsxs)(y.$, {
                                  onClick: () => e.push("/documents"),
                                  children: [
                                    (0, t.jsx)(j.A, {
                                      className: "mr-2 h-4 w-4",
                                    }),
                                    "Go to Documents",
                                  ],
                                }),
                              ],
                            }),
                          ],
                        }),
                    }),
                  ],
                }),
              }),
            ],
          }),
        });
      }
      var R = a(6530);
      function A() {
        return (0, t.jsxs)("div", {
          className:
            "w-full max-w-4xl mx-auto bg-muted/20 rounded-lg p-8 animate-pulse",
          children: [
            (0, t.jsx)("div", {
              className: "h-8 w-64 bg-muted mb-4 rounded-md",
            }),
            (0, t.jsx)("div", {
              className: "h-4 w-96 bg-muted/70 mb-8 rounded-md",
            }),
            (0, t.jsxs)("div", {
              className: "space-y-6",
              children: [
                (0, t.jsx)("div", {
                  className: "h-10 w-full bg-muted rounded-md",
                }),
                (0, t.jsxs)("div", {
                  className: "grid grid-cols-2 gap-4",
                  children: [
                    (0, t.jsx)("div", {
                      className: "h-24 w-full bg-muted rounded-md",
                    }),
                    (0, t.jsx)("div", {
                      className: "h-24 w-full bg-muted rounded-md",
                    }),
                  ],
                }),
                (0, t.jsx)("div", {
                  className: "flex justify-end",
                  children: (0, t.jsx)("div", {
                    className: "h-10 w-32 bg-muted rounded-md",
                  }),
                }),
              ],
            }),
          ],
        });
      }
      function F() {
        return (0, t.jsxs)("div", {
          className: "container py-8",
          children: [
            (0, t.jsx)("div", {
              className: "flex items-center mb-6",
              children: (0, t.jsx)(i(), {
                href: "/documents",
                legacyBehavior: !0,
                children: (0, t.jsxs)(y.$, {
                  variant: "ghost",
                  size: "sm",
                  className: "flex items-center gap-1",
                  children: [
                    (0, t.jsx)(r.A, { className: "h-4 w-4" }),
                    "Back to Documents",
                  ],
                }),
              }),
            }),
            (0, t.jsx)("div", {
              className: "flex justify-between items-center mb-6",
              children: (0, t.jsx)("h1", {
                className: "text-3xl font-bold",
                children: "Create Document from Website",
              }),
            }),
            (0, t.jsx)(R.k, {
              children: (0, t.jsx)(n.Suspense, {
                fallback: (0, t.jsx)(A, {}),
                children: (0, t.jsx)(T, {}),
              }),
            }),
          ],
        });
      }
    },
  },
  (e) => {
    var s = (s) => e((e.s = s));
    e.O(0, [6593, 4223, 3209, 7358], () => s(91266)), (_N_E = e.O());
  },
]);
