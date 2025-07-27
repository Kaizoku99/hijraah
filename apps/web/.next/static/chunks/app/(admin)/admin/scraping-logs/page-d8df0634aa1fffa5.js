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
    (e._sentryDebugIds[s] = "bca6d1ac-e556-4c31-86cc-5d830dfcdf6a"),
    (e._sentryDebugIdIdentifier =
      "sentry-dbid-bca6d1ac-e556-4c31-86cc-5d830dfcdf6a"));
} catch (e) {}
(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [6505],
  {
    7019: (e, s, r) => {
      "use strict";
      r.r(s), r.d(s, { default: () => S });
      var a = r(30602),
        n = r(30230),
        t = r(23836),
        i = r(13575),
        c = r(59834),
        l = r(41624),
        d = r(97687),
        o = r.n(d),
        h = r(85218),
        x = r(26600),
        u = r(5271),
        j = r(77413),
        m = r(58797),
        f = r(87758),
        p = r(95233),
        g = r(30311);
      let y = (e) => {
        let { className: s, ...r } = e;
        return (0, a.jsx)("nav", {
          role: "navigation",
          "aria-label": "pagination",
          className: (0, g.cn)("mx-auto flex w-full justify-center", s),
          ...r,
        });
      };
      y.displayName = "Pagination";
      let N = h.forwardRef((e, s) => {
        let { className: r, ...n } = e;
        return (0, a.jsx)("ul", {
          ref: s,
          className: (0, g.cn)("flex flex-row items-center gap-1", r),
          ...n,
        });
      });
      N.displayName = "PaginationContent";
      let v = h.forwardRef((e, s) => {
        let { className: r, ...n } = e;
        return (0, a.jsx)("li", { ref: s, className: (0, g.cn)("", r), ...n });
      });
      v.displayName = "PaginationItem";
      let b = (e) => {
        let { className: s, isActive: r, size: n = "icon", ...t } = e;
        return (0, a.jsx)("a", {
          "aria-current": r ? "page" : void 0,
          className: (0, g.cn)(
            (0, u.r)({ variant: r ? "outline" : "ghost", size: n }),
            s,
          ),
          ...t,
        });
      };
      b.displayName = "PaginationLink";
      let w = (e) => {
        let { className: s, ...r } = e;
        return (0, a.jsxs)(b, {
          "aria-label": "Go to previous page",
          size: "default",
          className: (0, g.cn)("gap-1 pl-2.5", s),
          ...r,
          children: [
            (0, a.jsx)(m.A, { className: "h-4 w-4" }),
            (0, a.jsx)("span", { children: "Previous" }),
          ],
        });
      };
      w.displayName = "PaginationPrevious";
      let E = (e) => {
        let { className: s, ...r } = e;
        return (0, a.jsxs)(b, {
          "aria-label": "Go to next page",
          size: "default",
          className: (0, g.cn)("gap-1 pr-2.5", s),
          ...r,
          children: [
            (0, a.jsx)("span", { children: "Next" }),
            (0, a.jsx)(f.A, { className: "h-4 w-4" }),
          ],
        });
      };
      E.displayName = "PaginationNext";
      let _ = (e) => {
        let { className: s, ...r } = e;
        return (0, a.jsxs)("span", {
          "aria-hidden": !0,
          className: (0, g.cn)("flex h-9 w-9 items-center justify-center", s),
          ...r,
          children: [
            (0, a.jsx)(p.A, { className: "h-4 w-4" }),
            (0, a.jsx)("span", {
              className: "sr-only",
              children: "More pages",
            }),
          ],
        });
      };
      _.displayName = "PaginationEllipsis";
      var C = r(88542),
        k = r(43213),
        A = r(47482);
      function S() {
        let { toast: e } = (0, A.d)(),
          [s, r] = (0, h.useState)(!0),
          [d, m] = (0, h.useState)([]),
          [f, p] = (0, h.useState)([]),
          [g, S] = (0, h.useState)(1),
          [P, D] = (0, h.useState)(1),
          [H, I] = (0, h.useState)("logs"),
          M = (0, h.useCallback)(async () => {
            try {
              let e = await fetch("/api/admin/scraping-logs?page=".concat(g));
              if (!e.ok) throw Error("Failed to fetch scraping logs");
              let s = await e.json();
              m(s.logs), D(s.totalPages || 1);
            } catch (e) {
              throw (console.error("Error fetching scraping logs:", e), e);
            }
          }, [g]),
          B = (0, h.useCallback)(async () => {
            try {
              let e = await fetch("/api/admin/scrape-history?page=".concat(g));
              if (!e.ok) throw Error("Failed to fetch scrape history");
              let s = await e.json();
              p(s.history), D(s.totalPages || 1);
            } catch (e) {
              throw (console.error("Error fetching scrape history:", e), e);
            }
          }, [g]),
          R = (0, h.useCallback)(async () => {
            r(!0);
            try {
              "logs" === H ? await M() : await B();
            } catch (s) {
              console.error("Error fetching ".concat(H, ":"), s),
                e({
                  title: "Error",
                  description: "Failed to fetch ".concat(H),
                  variant: "destructive",
                });
            } finally {
              r(!1);
            }
          }, [H, M, B, e]);
        (0, h.useEffect)(() => {
          R();
        }, [R]);
        let F = (e) => {
            try {
              return (0, n.GP)((0, t.H)(e), "MMM d, yyyy HH:mm:ss");
            } catch (s) {
              return e;
            }
          },
          T = (e) =>
            e >= 200 && e < 300
              ? (0, a.jsx)(x.E, { variant: "default", children: "Success" })
              : e >= 400 && e < 500
                ? (0, a.jsx)(x.E, {
                    variant: "secondary",
                    children: "Client Error",
                  })
                : e >= 500
                  ? (0, a.jsx)(x.E, {
                      variant: "destructive",
                      children: "Server Error",
                    })
                  : (0, a.jsx)(x.E, {
                      variant: "outline",
                      children: "Unknown",
                    }),
          Z = (e) =>
            "success" === e
              ? (0, a.jsx)(x.E, { variant: "default", children: "Success" })
              : "error" === e
                ? (0, a.jsx)(x.E, { variant: "destructive", children: "Error" })
                : (0, a.jsx)(x.E, {
                    variant: "secondary",
                    children: "Pending",
                  }),
          z = async (e) => {
            R();
          },
          L = (e) => {
            S(e);
          };
        return (0, a.jsxs)("div", {
          className: "container mx-auto py-6",
          children: [
            (0, a.jsxs)("div", {
              className: "flex justify-between items-center mb-6",
              children: [
                (0, a.jsxs)("div", {
                  children: [
                    (0, a.jsxs)("div", {
                      className: "flex items-center gap-2",
                      children: [
                        (0, a.jsx)(u.$, {
                          variant: "outline",
                          size: "icon",
                          asChild: !0,
                          children: (0, a.jsx)(o(), {
                            href: "/admin",
                            legacyBehavior: !0,
                            children: (0, a.jsx)(i.A, { className: "h-4 w-4" }),
                          }),
                        }),
                        (0, a.jsx)("h1", {
                          className: "text-3xl font-bold",
                          children: "Scraping Logs",
                        }),
                      ],
                    }),
                    (0, a.jsx)("p", {
                      className: "text-muted-foreground mt-2",
                      children:
                        "Monitor scheduled scraping jobs and their results",
                    }),
                  ],
                }),
                (0, a.jsxs)("div", {
                  className: "flex gap-2",
                  children: [
                    (0, a.jsxs)(u.$, {
                      variant: "outline",
                      onClick: z,
                      children: [
                        (0, a.jsx)(c.A, { className: "mr-2 h-4 w-4" }),
                        " Refresh",
                      ],
                    }),
                    (0, a.jsx)(u.$, {
                      asChild: !0,
                      children: (0, a.jsx)(o(), {
                        href: "/admin/scraping-sources",
                        children: "Manage Sources",
                      }),
                    }),
                  ],
                }),
              ],
            }),
            (0, a.jsx)("div", {
              className: "mb-6",
              children: (0, a.jsxs)("div", {
                className: "flex space-x-4 border-b",
                children: [
                  (0, a.jsx)("button", {
                    onClick: () => I("logs"),
                    className: "py-2 px-4 border-b-2 ".concat(
                      "logs" === H
                        ? "border-primary text-primary font-medium"
                        : "border-transparent text-muted-foreground",
                    ),
                    children: "Cron Job Logs",
                  }),
                  (0, a.jsx)("button", {
                    onClick: () => I("history"),
                    className: "py-2 px-4 border-b-2 ".concat(
                      "history" === H
                        ? "border-primary text-primary font-medium"
                        : "border-transparent text-muted-foreground",
                    ),
                    children: "Scrape History",
                  }),
                ],
              }),
            }),
            s
              ? (0, a.jsxs)(j.Zp, {
                  children: [
                    (0, a.jsxs)(j.aR, {
                      children: [
                        (0, a.jsx)(C.E, { className: "h-8 w-64 mb-2" }),
                        (0, a.jsx)(C.E, { className: "h-4 w-full" }),
                      ],
                    }),
                    (0, a.jsx)(j.Wu, {
                      children: (0, a.jsx)("div", {
                        className: "space-y-2",
                        children: [, , , , ,]
                          .fill(0)
                          .map((e, s) =>
                            (0, a.jsx)(C.E, { className: "h-12 w-full" }, s),
                          ),
                      }),
                    }),
                  ],
                })
              : "logs" === H
                ? (0, a.jsxs)(j.Zp, {
                    children: [
                      (0, a.jsxs)(j.aR, {
                        children: [
                          (0, a.jsx)(j.ZB, {
                            children: "Scheduled Job Execution Logs",
                          }),
                          (0, a.jsx)(j.BT, {
                            children:
                              "Records of each time the scheduled scraping job ran",
                          }),
                        ],
                      }),
                      (0, a.jsx)(j.Wu, {
                        children:
                          0 === d.length
                            ? (0, a.jsx)("div", {
                                className: "text-center py-6",
                                children: (0, a.jsx)("p", {
                                  className: "text-muted-foreground",
                                  children: "No scraping logs found",
                                }),
                              })
                            : (0, a.jsx)("div", {
                                className: "overflow-x-auto",
                                children: (0, a.jsxs)(k.XI, {
                                  children: [
                                    (0, a.jsx)(k.A0, {
                                      children: (0, a.jsxs)(k.Hj, {
                                        children: [
                                          (0, a.jsx)(k.nd, {
                                            children: "Timestamp",
                                          }),
                                          (0, a.jsx)(k.nd, {
                                            children: "Status",
                                          }),
                                          (0, a.jsx)(k.nd, {
                                            children: "Message",
                                          }),
                                        ],
                                      }),
                                    }),
                                    (0, a.jsx)(k.BF, {
                                      children: d.map((e) =>
                                        (0, a.jsxs)(
                                          k.Hj,
                                          {
                                            children: [
                                              (0, a.jsx)(k.nA, {
                                                className: "font-mono text-sm",
                                                children: F(e.triggered_at),
                                              }),
                                              (0, a.jsx)(k.nA, {
                                                children: T(e.status_code),
                                              }),
                                              (0, a.jsx)(k.nA, {
                                                children: e.message,
                                              }),
                                            ],
                                          },
                                          e.id,
                                        ),
                                      ),
                                    }),
                                  ],
                                }),
                              }),
                      }),
                    ],
                  })
                : (0, a.jsxs)(j.Zp, {
                    children: [
                      (0, a.jsxs)(j.aR, {
                        children: [
                          (0, a.jsx)(j.ZB, {
                            children: "Individual Scrape History",
                          }),
                          (0, a.jsx)(j.BT, {
                            children:
                              "History of individual source scraping attempts and results",
                          }),
                        ],
                      }),
                      (0, a.jsx)(j.Wu, {
                        children:
                          0 === f.length
                            ? (0, a.jsx)("div", {
                                className: "text-center py-6",
                                children: (0, a.jsx)("p", {
                                  className: "text-muted-foreground",
                                  children: "No scrape history found",
                                }),
                              })
                            : (0, a.jsx)("div", {
                                className: "overflow-x-auto",
                                children: (0, a.jsxs)(k.XI, {
                                  children: [
                                    (0, a.jsx)(k.A0, {
                                      children: (0, a.jsxs)(k.Hj, {
                                        children: [
                                          (0, a.jsx)(k.nd, {
                                            children: "Timestamp",
                                          }),
                                          (0, a.jsx)(k.nd, {
                                            children: "Source",
                                          }),
                                          (0, a.jsx)(k.nd, {
                                            children: "Status",
                                          }),
                                          (0, a.jsx)(k.nd, {
                                            children: "Changes",
                                          }),
                                          (0, a.jsx)(k.nd, {
                                            children: "Message/Error",
                                          }),
                                          (0, a.jsx)(k.nd, {
                                            children: "Document",
                                          }),
                                        ],
                                      }),
                                    }),
                                    (0, a.jsx)(k.BF, {
                                      children: f.map((e) =>
                                        (0, a.jsxs)(
                                          k.Hj,
                                          {
                                            children: [
                                              (0, a.jsx)(k.nA, {
                                                className: "font-mono text-sm",
                                                children: F(e.scraped_at),
                                              }),
                                              (0, a.jsxs)(k.nA, {
                                                children: [
                                                  e.source_name || e.source_id,
                                                  e.source_url &&
                                                    (0, a.jsx)("a", {
                                                      href: e.source_url,
                                                      target: "_blank",
                                                      rel: "noopener noreferrer",
                                                      className:
                                                        "ml-2 inline-flex items-center text-xs text-muted-foreground hover:text-foreground",
                                                      children: (0, a.jsx)(
                                                        l.A,
                                                        {
                                                          className: "h-3 w-3",
                                                        },
                                                      ),
                                                    }),
                                                ],
                                              }),
                                              (0, a.jsx)(k.nA, {
                                                children: Z(e.status),
                                              }),
                                              (0, a.jsx)(k.nA, {
                                                children:
                                                  "success" === e.status &&
                                                  (0, a.jsx)(x.E, {
                                                    variant: e.has_changes
                                                      ? "outline"
                                                      : "secondary",
                                                    children: e.has_changes
                                                      ? "Changes Detected"
                                                      : "No Changes",
                                                  }),
                                              }),
                                              (0, a.jsx)(k.nA, {
                                                className: "max-w-md truncate",
                                                children:
                                                  e.error_message ||
                                                  (e.has_changes
                                                    ? e.change_summary
                                                    : "Successful scrape"),
                                              }),
                                              (0, a.jsx)(k.nA, {
                                                children:
                                                  e.artifact_id &&
                                                  (0, a.jsx)(u.$, {
                                                    variant: "outline",
                                                    size: "sm",
                                                    asChild: !0,
                                                    children: (0, a.jsx)(o(), {
                                                      href: "/documents/".concat(
                                                        e.artifact_id,
                                                      ),
                                                      children: "View",
                                                    }),
                                                  }),
                                              }),
                                            ],
                                          },
                                          e.id,
                                        ),
                                      ),
                                    }),
                                  ],
                                }),
                              }),
                      }),
                    ],
                  }),
            P > 1 &&
              (0, a.jsx)(y, {
                className: "mt-4",
                children: (0, a.jsxs)(N, {
                  children: [
                    (0, a.jsx)(v, {
                      children: (0, a.jsx)(w, {
                        href: "#",
                        onClick: (e) => {
                          e.preventDefault(), g > 1 && L(g - 1);
                        },
                        className:
                          1 === g ? "pointer-events-none opacity-50" : "",
                      }),
                    }),
                    Array.from({ length: Math.min(5, P) }, (e, s) => {
                      let r;
                      return (
                        (r =
                          P <= 5 || g <= 3
                            ? s + 1
                            : g >= P - 2
                              ? P - 4 + s
                              : g - 2 + s),
                        (0, a.jsx)(
                          v,
                          {
                            children: (0, a.jsx)(b, {
                              href: "#",
                              onClick: (e) => {
                                e.preventDefault(), L(r);
                              },
                              isActive: g === r,
                              children: r,
                            }),
                          },
                          s,
                        )
                      );
                    }),
                    P > 5 &&
                      g < P - 2 &&
                      (0, a.jsxs)(a.Fragment, {
                        children: [
                          (0, a.jsx)(v, { children: (0, a.jsx)(_, {}) }),
                          (0, a.jsx)(v, {
                            children: (0, a.jsx)(b, {
                              href: "#",
                              onClick: (e) => {
                                e.preventDefault(), L(P);
                              },
                              children: P,
                            }),
                          }),
                        ],
                      }),
                    (0, a.jsx)(v, {
                      children: (0, a.jsx)(E, {
                        href: "#",
                        onClick: (e) => {
                          e.preventDefault(), g < P && L(g + 1);
                        },
                        className:
                          g === P ? "pointer-events-none opacity-50" : "",
                      }),
                    }),
                  ],
                }),
              }),
          ],
        });
      }
    },
    91750: (e, s, r) => {
      Promise.resolve().then(r.bind(r, 7019));
    },
  },
  (e) => {
    var s = (s) => e((e.s = s));
    e.O(0, [6593, 4223, 3209, 7358], () => s(91750)), (_N_E = e.O());
  },
]);
