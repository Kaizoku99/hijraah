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
    a = new e.Error().stack;
  a &&
    ((e._sentryDebugIds = e._sentryDebugIds || {}),
    (e._sentryDebugIds[a] = "7c69e5ed-33e4-404e-b962-98141faba97b"),
    (e._sentryDebugIdIdentifier =
      "sentry-dbid-7c69e5ed-33e4-404e-b962-98141faba97b"));
} catch (e) {}
("use strict");
(exports.id = 8543),
  (exports.ids = [8543]),
  (exports.modules = {
    1278: (e, a, s) => {
      s.d(a, { Qg: () => d, bL: () => n });
      var r = s(84205),
        t = s(56558),
        l = s(61268),
        d = Object.freeze({
          position: "absolute",
          border: 0,
          width: 1,
          height: 1,
          padding: 0,
          margin: -1,
          overflow: "hidden",
          clip: "rect(0, 0, 0, 0)",
          whiteSpace: "nowrap",
          wordWrap: "normal",
        }),
        i = r.forwardRef((e, a) =>
          (0, l.jsx)(t.sG.span, { ...e, ref: a, style: { ...d, ...e.style } }),
        );
      i.displayName = "VisuallyHidden";
      var n = i;
    },
    5451: (e, a, s) => {
      s.a(e, async (e, r) => {
        try {
          s.d(a, {
            BT: () => h,
            Wu: () => m,
            ZB: () => p,
            Zp: () => o,
            aR: () => c,
            wL: () => f,
          });
          var t = s(61268),
            l = s(55728),
            d = s(84205),
            i = s(15942),
            n = e([i]);
          i = (n.then ? (await n)() : n)[0];
          let o = d.forwardRef(({ className: e, ...a }, s) =>
            (0, t.jsx)(l.P.div, {
              ref: s,
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
              ...a,
            }),
          );
          o.displayName = "Card";
          let c = d.forwardRef(({ className: e, ...a }, s) =>
            (0, t.jsx)("div", {
              ref: s,
              className: (0, i.cn)("flex flex-col space-y-1.5 p-6", e),
              ...a,
            }),
          );
          c.displayName = "CardHeader";
          let p = d.forwardRef(({ className: e, ...a }, s) =>
            (0, t.jsx)("h3", {
              ref: s,
              className: (0, i.cn)(
                "text-2xl font-semibold leading-none tracking-tight",
                e,
              ),
              ...a,
            }),
          );
          p.displayName = "CardTitle";
          let h = d.forwardRef(({ className: e, ...a }, s) =>
            (0, t.jsx)("p", {
              ref: s,
              className: (0, i.cn)("text-sm text-muted-foreground", e),
              ...a,
            }),
          );
          h.displayName = "CardDescription";
          let m = d.forwardRef(({ className: e, ...a }, s) =>
            (0, t.jsx)("div", {
              ref: s,
              className: (0, i.cn)("p-6 pt-0", e),
              ...a,
            }),
          );
          m.displayName = "CardContent";
          let f = d.forwardRef(({ className: e, ...a }, s) =>
            (0, t.jsx)("div", {
              ref: s,
              className: (0, i.cn)("flex items-center p-6 pt-0", e),
              ...a,
            }),
          );
          (f.displayName = "CardFooter"), r();
        } catch (e) {
          r(e);
        }
      });
    },
    13242: (e, a, s) => {
      s.d(a, { F: () => t });
      var r = s(61268);
      s(84205);
      let t = ({ children: e, className: a, ...s }) =>
        (0, r.jsx)("div", {
          className: `overflow-auto ${a || ""}`,
          ...s,
          children: e,
        });
    },
    16176: (e, a, s) => {
      s.a(e, async (e, r) => {
        try {
          s.d(a, { Separator: () => n });
          var t = s(61268),
            l = s(51209);
          s(84205);
          var d = s(15942),
            i = e([d]);
          function n({
            className: e,
            orientation: a = "horizontal",
            decorative: s = !0,
            ...r
          }) {
            return (0, t.jsx)(l.b, {
              "data-slot": "separator-root",
              decorative: s,
              orientation: a,
              className: (0, d.cn)(
                "bg-border shrink-0 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px",
                e,
              ),
              ...r,
            });
          }
          (d = (i.then ? (await i)() : i)[0]), r();
        } catch (e) {
          r(e);
        }
      });
    },
    37787: (e, a, s) => {
      s.a(e, async (e, r) => {
        try {
          s.d(a, { T: () => n });
          var t = s(61268),
            l = s(84205),
            d = s(15942),
            i = e([d]);
          d = (i.then ? (await i)() : i)[0];
          let n = l.forwardRef(({ className: e, ...a }, s) =>
            (0, t.jsx)("textarea", {
              className: (0, d.cn)(
                "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                e,
              ),
              ref: s,
              ...a,
            }),
          );
          (n.displayName = "Textarea"), r();
        } catch (e) {
          r(e);
        }
      });
    },
    51624: (e, a, s) => {
      s.a(e, async (e, r) => {
        try {
          s.d(a, { c: () => x });
          var t = s(61268),
            l = s(66135),
            d = s(84205),
            i = s(98654),
            n = s(5451),
            o = s(28909),
            c = s(13242),
            p = s(95957),
            h = s(16176),
            m = s(37787),
            f = e([n, o, p, h, m]);
          [n, o, p, h, m] = f.then ? (await f)() : f;
          let u = ["visa", "study", "work", "immigrate", "citizenship"],
            b = [
              { value: "basic", label: "Basic Overview" },
              { value: "detailed", label: "Detailed Analysis" },
              { value: "comprehensive", label: "Comprehensive Research" },
            ];
          function x({ onResearch: e, isLoading: a, results: s }) {
            let [r, f] = (0, d.useState)(""),
              [x, y] = (0, d.useState)(""),
              [g, v] = (0, d.useState)(""),
              [j, w] = (0, d.useState)("detailed"),
              N = async () => {
                if (!r.trim())
                  return void i.oR.error("Please enter a research query");
                try {
                  await e(r, {
                    country: x || void 0,
                    category: g || void 0,
                    depth: j,
                  });
                } catch (e) {
                  console.error("Research error:", e),
                    i.oR.error("Failed to perform research. Please try again.");
                }
              };
            return (0, t.jsxs)(n.Zp, {
              className: "w-full",
              children: [
                (0, t.jsx)(n.aR, {
                  children: (0, t.jsx)(n.ZB, {
                    children: "Deep Immigration Research",
                  }),
                }),
                (0, t.jsxs)(n.Wu, {
                  className: "space-y-6",
                  children: [
                    (0, t.jsxs)("div", {
                      className: "space-y-4",
                      children: [
                        (0, t.jsxs)("div", {
                          children: [
                            (0, t.jsx)("h3", {
                              className: "text-sm font-medium mb-2",
                              children: "Research Query",
                            }),
                            (0, t.jsx)(m.T, {
                              value: r,
                              onChange: (e) => f(e.target.value),
                              placeholder: "Enter your research question...",
                              className: "min-h-[100px]",
                            }),
                          ],
                        }),
                        (0, t.jsxs)("div", {
                          className: "grid grid-cols-1 md:grid-cols-3 gap-4",
                          children: [
                            (0, t.jsxs)("div", {
                              children: [
                                (0, t.jsx)("h3", {
                                  className: "text-sm font-medium mb-2",
                                  children: "Country (Optional)",
                                }),
                                (0, t.jsxs)(p.l6, {
                                  value: x,
                                  onValueChange: y,
                                  children: [
                                    (0, t.jsx)(p.bq, {
                                      children: (0, t.jsx)(p.yv, {
                                        placeholder: "Select country",
                                      }),
                                    }),
                                    (0, t.jsxs)(p.gC, {
                                      children: [
                                        (0, t.jsx)(p.eb, {
                                          value: "",
                                          children: "Any Country",
                                        }),
                                        [].map((e) =>
                                          (0, t.jsx)(
                                            p.eb,
                                            {
                                              value: e,
                                              children:
                                                e.charAt(0).toUpperCase() +
                                                e.slice(1),
                                            },
                                            e,
                                          ),
                                        ),
                                      ],
                                    }),
                                  ],
                                }),
                              ],
                            }),
                            (0, t.jsxs)("div", {
                              children: [
                                (0, t.jsx)("h3", {
                                  className: "text-sm font-medium mb-2",
                                  children: "Category (Optional)",
                                }),
                                (0, t.jsxs)(p.l6, {
                                  value: g,
                                  onValueChange: v,
                                  children: [
                                    (0, t.jsx)(p.bq, {
                                      children: (0, t.jsx)(p.yv, {
                                        placeholder: "Select category",
                                      }),
                                    }),
                                    (0, t.jsxs)(p.gC, {
                                      children: [
                                        (0, t.jsx)(p.eb, {
                                          value: "",
                                          children: "Any Category",
                                        }),
                                        u.map((e) =>
                                          (0, t.jsx)(
                                            p.eb,
                                            {
                                              value: e,
                                              children:
                                                e.charAt(0).toUpperCase() +
                                                e.slice(1),
                                            },
                                            e,
                                          ),
                                        ),
                                      ],
                                    }),
                                  ],
                                }),
                              ],
                            }),
                            (0, t.jsxs)("div", {
                              children: [
                                (0, t.jsx)("h3", {
                                  className: "text-sm font-medium mb-2",
                                  children: "Research Depth",
                                }),
                                (0, t.jsxs)(p.l6, {
                                  value: j,
                                  onValueChange: (e) => w(e),
                                  children: [
                                    (0, t.jsx)(p.bq, {
                                      children: (0, t.jsx)(p.yv, {
                                        placeholder: "Select depth",
                                      }),
                                    }),
                                    (0, t.jsx)(p.gC, {
                                      children: b.map((e) =>
                                        (0, t.jsx)(
                                          p.eb,
                                          { value: e.value, children: e.label },
                                          e.value,
                                        ),
                                      ),
                                    }),
                                  ],
                                }),
                              ],
                            }),
                          ],
                        }),
                      ],
                    }),
                    (0, t.jsx)(o.$, {
                      onClick: N,
                      disabled: a || !r.trim(),
                      className: "w-full",
                      children: a
                        ? (0, t.jsxs)(t.Fragment, {
                            children: [
                              (0, t.jsx)(l.A, {
                                className: "mr-2 h-4 w-4 animate-spin",
                              }),
                              "Researching...",
                            ],
                          })
                        : "Start Deep Research",
                    }),
                    s &&
                      (0, t.jsxs)(t.Fragment, {
                        children: [
                          (0, t.jsx)(h.Separator, {}),
                          (0, t.jsxs)("div", {
                            className: "rounded-lg border p-4",
                            children: [
                              (0, t.jsx)("h2", {
                                className: "text-xl font-semibold mb-4",
                                children: "Research Results",
                              }),
                              (0, t.jsx)(c.F, {
                                className: "h-[600px]",
                                children: (0, t.jsx)("div", {
                                  className:
                                    "prose dark:prose-invert max-w-none",
                                  children: s,
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
          r();
        } catch (e) {
          r(e);
        }
      });
    },
    66135: (e, a, s) => {
      s.d(a, { A: () => r });
      let r = (0, s(95255).A)("Loader2", [
        ["path", { d: "M21 12a9 9 0 1 1-6.219-8.56", key: "13zald" }],
      ]);
    },
    70753: (e, a, s) => {
      s.d(a, { A: () => r });
      let r = (0, s(95255).A)("ChevronDown", [
        ["path", { d: "m6 9 6 6 6-6", key: "qrunsl" }],
      ]);
    },
    95957: (e, a, s) => {
      s.a(e, async (e, r) => {
        try {
          s.d(a, {
            bq: () => m,
            eb: () => x,
            gC: () => f,
            l6: () => p,
            yv: () => h,
          });
          var t = s(61268),
            l = s(81242),
            d = s(70753),
            i = s(415),
            n = s(84205),
            o = s(15942),
            c = e([o]);
          o = (c.then ? (await c)() : c)[0];
          let p = l.bL;
          l.YJ;
          let h = l.WT,
            m = n.forwardRef(({ className: e, children: a, ...s }, r) =>
              (0, t.jsxs)(l.l9, {
                ref: r,
                className: (0, o.cn)(
                  "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                  e,
                ),
                ...s,
                children: [
                  a,
                  (0, t.jsx)(l.In, {
                    asChild: !0,
                    children: (0, t.jsx)(d.A, {
                      className: "h-4 w-4 opacity-50",
                    }),
                  }),
                ],
              }),
            );
          m.displayName = l.l9.displayName;
          let f = n.forwardRef(
            ({ className: e, children: a, position: s = "popper", ...r }, d) =>
              (0, t.jsx)(l.ZL, {
                children: (0, t.jsx)(l.UC, {
                  ref: d,
                  className: (0, o.cn)(
                    "relative z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
                    "popper" === s &&
                      "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
                    e,
                  ),
                  position: s,
                  ...r,
                  children: (0, t.jsx)(l.LM, {
                    className: (0, o.cn)(
                      "p-1",
                      "popper" === s &&
                        "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]",
                    ),
                    children: a,
                  }),
                }),
              }),
          );
          (f.displayName = l.UC.displayName),
            (n.forwardRef(({ className: e, ...a }, s) =>
              (0, t.jsx)(l.JU, {
                ref: s,
                className: (0, o.cn)(
                  "py-1.5 pl-8 pr-2 text-sm font-semibold",
                  e,
                ),
                ...a,
              }),
            ).displayName = l.JU.displayName);
          let x = n.forwardRef(({ className: e, children: a, ...s }, r) =>
            (0, t.jsxs)(l.q7, {
              ref: r,
              className: (0, o.cn)(
                "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
                e,
              ),
              ...s,
              children: [
                (0, t.jsx)("span", {
                  className:
                    "absolute left-2 flex h-3.5 w-3.5 items-center justify-center",
                  children: (0, t.jsx)(l.VF, {
                    children: (0, t.jsx)(i.A, { className: "h-4 w-4" }),
                  }),
                }),
                (0, t.jsx)(l.p4, { children: a }),
              ],
            }),
          );
          (x.displayName = l.q7.displayName),
            (n.forwardRef(({ className: e, ...a }, s) =>
              (0, t.jsx)(l.wv, {
                ref: s,
                className: (0, o.cn)("-mx-1 my-1 h-px bg-muted", e),
                ...a,
              }),
            ).displayName = l.wv.displayName),
            r();
        } catch (e) {
          r(e);
        }
      });
    },
  });
//# sourceMappingURL=8543.js.map
