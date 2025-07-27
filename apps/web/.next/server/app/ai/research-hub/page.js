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
    (e._sentryDebugIds[t] = "3c24ee1c-1fb3-4bcc-baad-de977760c126"),
    (e._sentryDebugIdIdentifier =
      "sentry-dbid-3c24ee1c-1fb3-4bcc-baad-de977760c126"));
} catch (e) {}
(() => {
  var e = {};
  (e.id = 8133),
    (e.ids = [8133]),
    (e.modules = {
      3295: (e) => {
        "use strict";
        e.exports = require("next/dist/server/app-render/after-task-async-storage.external.js");
      },
      4229: (e, t, r) => {
        "use strict";
        r.a(e, async (e, s) => {
          try {
            r.d(t, { x: () => w });
            var a = r(61268),
              i = r(94763),
              n = r(31469),
              o = r(15014),
              c = r(15127),
              d = r(44803),
              l = r(14677),
              u = r(43572),
              p = r(84205),
              h = r(46532),
              x = r(28909),
              m = r(5451),
              f = r(78337),
              v = r(94812),
              g = r(77001),
              b = r(51624),
              y = e([h, x, m, f, v, g, b]);
            function w({
              initialSessions: e,
              onSessionSelect: t,
              onSessionCreate: r,
              onSessionDelete: s,
              onSessionArchive: l,
              initialSelectedSessionId: u,
            }) {
              let [h, v] = (0, p.useState)([]),
                [y, w] = (0, p.useState)([]),
                [N, k] = (0, p.useState)(""),
                [A, S] = (0, p.useState)(null),
                [C, R] = (0, p.useState)(!0),
                [D, q] = (0, p.useState)("all"),
                T = (e) => {
                  S(e), t && t(e);
                },
                I = (e) => {
                  v(h.filter((t) => t.id !== e)),
                    A?.id === e && S(null),
                    s && s(e);
                },
                _ = (e) => {
                  v(
                    h.map((t) =>
                      t.id === e
                        ? { ...t, status: "archived", updatedAt: new Date() }
                        : t,
                    ),
                  ),
                    l && l(e);
                };
              return (0, a.jsxs)("div", {
                className:
                  "grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-4",
                children: [
                  (0, a.jsxs)("div", {
                    className: "md:col-span-1 space-y-4",
                    children: [
                      (0, a.jsxs)("div", {
                        className: "flex items-center justify-between",
                        children: [
                          (0, a.jsx)("h2", {
                            className: "text-xl font-bold",
                            children: "Research Sessions",
                          }),
                          (0, a.jsxs)(x.$, {
                            onClick: () => {
                              let e = {
                                id: `session-${Date.now()}`,
                                title: "New Research Session",
                                description: "Click to add description",
                                createdAt: new Date(),
                                updatedAt: new Date(),
                                status: "active",
                                createdBy: {
                                  id: "user-1",
                                  name: "Current User",
                                },
                                category: "General",
                              };
                              v([e, ...h]), r && r(e), S(e);
                            },
                            size: "sm",
                            children: [
                              (0, a.jsx)(c.A, { className: "w-4 h-4 mr-2" }),
                              "New",
                            ],
                          }),
                        ],
                      }),
                      (0, a.jsxs)("div", {
                        className: "relative",
                        children: [
                          (0, a.jsx)(d.A, {
                            className:
                              "absolute left-2.5 top-2.5 h-4 w-4 text-gray-500",
                          }),
                          (0, a.jsx)(f.p, {
                            type: "search",
                            placeholder: "Search sessions...",
                            className: "pl-8",
                            value: N,
                            onChange: (e) => k(e.target.value),
                          }),
                        ],
                      }),
                      (0, a.jsxs)(g.Tabs, {
                        defaultValue: "all",
                        children: [
                          (0, a.jsxs)(g.TabsList, {
                            className: "grid w-full grid-cols-3",
                            children: [
                              (0, a.jsx)(g.TabsTrigger, {
                                value: "all",
                                onClick: () => q("all"),
                                children: "All",
                              }),
                              (0, a.jsx)(g.TabsTrigger, {
                                value: "active",
                                onClick: () => q("active"),
                                children: "Active",
                              }),
                              (0, a.jsx)(g.TabsTrigger, {
                                value: "archived",
                                onClick: () => q("archived"),
                                children: "Archived",
                              }),
                            ],
                          }),
                          (0, a.jsx)(g.TabsContent, {
                            value: "all",
                            className: "space-y-0 mt-2",
                            children: (0, a.jsx)(j, {
                              sessions: y,
                              selectedId: A?.id,
                              onSelect: T,
                              isLoading: C,
                            }),
                          }),
                          (0, a.jsx)(g.TabsContent, {
                            value: "active",
                            className: "space-y-0 mt-2",
                            children: (0, a.jsx)(j, {
                              sessions: y,
                              selectedId: A?.id,
                              onSelect: T,
                              isLoading: C,
                            }),
                          }),
                          (0, a.jsx)(g.TabsContent, {
                            value: "archived",
                            className: "space-y-0 mt-2",
                            children: (0, a.jsx)(j, {
                              sessions: y,
                              selectedId: A?.id,
                              onSelect: T,
                              isLoading: C,
                            }),
                          }),
                        ],
                      }),
                    ],
                  }),
                  (0, a.jsx)("div", {
                    className: "md:col-span-2 lg:col-span-3",
                    children: (0, a.jsx)(() => {
                      let [e, t] = (0, p.useState)(!1),
                        [r, s] = (0, p.useState)(null);
                      if (!A)
                        return (0, a.jsxs)("div", {
                          className:
                            "flex flex-col items-center justify-center h-full p-8 text-center text-gray-500",
                          children: [
                            (0, a.jsx)("h3", {
                              className: "text-xl font-medium",
                              children: "No Session Selected",
                            }),
                            (0, a.jsx)("p", {
                              className: "mt-2",
                              children:
                                "Select a research session from the list or create a new one",
                            }),
                          ],
                        });
                      let c = async (e, r) => {
                        t(!0),
                          await new Promise((e) => setTimeout(e, 1500)),
                          s(
                            `Results for query "${e}" on session "${A.title}". Options: ${JSON.stringify(r)}`,
                          ),
                          t(!1);
                      };
                      return (0, a.jsx)("div", {
                        className: "h-full overflow-auto",
                        children: (0, a.jsxs)(m.Zp, {
                          className: "h-full",
                          children: [
                            (0, a.jsxs)(m.aR, {
                              children: [
                                (0, a.jsx)(m.ZB, { children: A.title }),
                                (0, a.jsxs)(m.BT, {
                                  children: [
                                    "Created",
                                    " ",
                                    (0, i.m)(A.createdAt, { addSuffix: !0 }),
                                  ],
                                }),
                              ],
                            }),
                            (0, a.jsx)(m.Wu, {
                              children: (0, a.jsxs)("div", {
                                className: "space-y-4",
                                children: [
                                  (0, a.jsxs)("div", {
                                    children: [
                                      (0, a.jsx)("h3", {
                                        className:
                                          "text-sm font-medium text-gray-500",
                                        children: "Description",
                                      }),
                                      (0, a.jsx)("p", {
                                        className: "mt-1",
                                        children: A.description,
                                      }),
                                    ],
                                  }),
                                  (0, a.jsxs)("div", {
                                    children: [
                                      (0, a.jsx)("h3", {
                                        className:
                                          "text-sm font-medium text-gray-500",
                                        children: "Category",
                                      }),
                                      (0, a.jsx)("p", {
                                        className: "mt-1",
                                        children: A.category,
                                      }),
                                    ],
                                  }),
                                  A.caseId &&
                                    (0, a.jsxs)("div", {
                                      children: [
                                        (0, a.jsx)("h3", {
                                          className:
                                            "text-sm font-medium text-gray-500",
                                          children: "Related Case",
                                        }),
                                        (0, a.jsx)("p", {
                                          className: "mt-1",
                                          children: A.caseId,
                                        }),
                                      ],
                                    }),
                                  A.notes &&
                                    (0, a.jsxs)("div", {
                                      children: [
                                        (0, a.jsx)("h3", {
                                          className:
                                            "text-sm font-medium text-gray-500",
                                          children: "Notes",
                                        }),
                                        (0, a.jsx)("p", {
                                          className: "mt-1 whitespace-pre-line",
                                          children: A.notes,
                                        }),
                                      ],
                                    }),
                                  (0, a.jsx)(b.c, {
                                    onResearch: c,
                                    isLoading: e,
                                    results: r,
                                  }),
                                ],
                              }),
                            }),
                            (0, a.jsx)(m.wL, {
                              children: (0, a.jsxs)("div", {
                                className: "flex justify-between w-full",
                                children: [
                                  (0, a.jsxs)(x.$, {
                                    variant: "outline",
                                    size: "sm",
                                    onClick: () => _(A.id),
                                    children: [
                                      (0, a.jsx)(n.A, {
                                        className: "w-4 h-4 mr-2",
                                      }),
                                      "Archive",
                                    ],
                                  }),
                                  (0, a.jsxs)(x.$, {
                                    variant: "destructive",
                                    size: "sm",
                                    onClick: () => I(A.id),
                                    children: [
                                      (0, a.jsx)(o.A, {
                                        className: "w-4 h-4 mr-2",
                                      }),
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
            function j({
              sessions: e,
              selectedId: t,
              onSelect: r,
              isLoading: s,
            }) {
              return s
                ? (0, a.jsx)("div", {
                    className: "space-y-2",
                    children: Array.from({ length: 5 }).map((e, t) =>
                      (0, a.jsx)(N, {}, t),
                    ),
                  })
                : 0 === e.length
                  ? (0, a.jsx)("div", {
                      className: "p-4 text-center border rounded-md",
                      children: (0, a.jsx)("p", {
                        className: "text-sm text-gray-500",
                        children: "No sessions found",
                      }),
                    })
                  : (0, a.jsx)("div", {
                      className: "space-y-2",
                      children: e.map((e) =>
                        (0, a.jsxs)(
                          m.Zp,
                          {
                            className: `cursor-pointer hover:bg-gray-50 transition-colors ${t === e.id ? "border-primary" : ""}`,
                            onClick: () => r(e),
                            children: [
                              (0, a.jsx)(m.aR, {
                                className: "p-4",
                                children: (0, a.jsxs)("div", {
                                  className: "flex justify-between items-start",
                                  children: [
                                    (0, a.jsxs)("div", {
                                      children: [
                                        (0, a.jsx)(m.ZB, {
                                          className: "text-base",
                                          children: e.title,
                                        }),
                                        (0, a.jsx)(m.BT, {
                                          className: "text-xs",
                                          children:
                                            e.description.length > 60
                                              ? `${e.description.substring(0, 60)}...`
                                              : e.description,
                                        }),
                                      ],
                                    }),
                                    (0, a.jsx)(h.E, {
                                      variant:
                                        "active" === e.status
                                          ? "default"
                                          : (e.status, "secondary"),
                                      children: e.status,
                                    }),
                                  ],
                                }),
                              }),
                              (0, a.jsx)(m.wL, {
                                className: "p-4 pt-0 text-xs text-gray-500",
                                children: (0, a.jsxs)("div", {
                                  className: "flex items-center gap-4",
                                  children: [
                                    (0, a.jsxs)("div", {
                                      className: "flex items-center",
                                      children: [
                                        (0, a.jsx)(l.A, {
                                          className: "w-3 h-3 mr-1",
                                        }),
                                        (0, i.m)(e.updatedAt, {
                                          addSuffix: !0,
                                        }),
                                      ],
                                    }),
                                    (0, a.jsxs)("div", {
                                      className: "flex items-center",
                                      children: [
                                        (0, a.jsx)(u.A, {
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
              return (0, a.jsxs)(m.Zp, {
                children: [
                  (0, a.jsxs)(m.aR, {
                    className: "p-4",
                    children: [
                      (0, a.jsx)(v.E, { className: "h-5 w-3/4" }),
                      (0, a.jsx)(v.E, { className: "h-4 w-full mt-2" }),
                    ],
                  }),
                  (0, a.jsx)(m.wL, {
                    className: "p-4 pt-0",
                    children: (0, a.jsx)(v.E, { className: "h-3 w-1/2" }),
                  }),
                ],
              });
            }
            ([h, x, m, f, v, g, b] = y.then ? (await y)() : y),
              Date.now(),
              Date.now(),
              Date.now(),
              Date.now(),
              Date.now(),
              Date.now(),
              Date.now(),
              Date.now(),
              Date.now(),
              Date.now(),
              s();
          } catch (e) {
            s(e);
          }
        });
      },
      7163: (e, t, r) => {
        Promise.resolve().then(r.bind(r, 80992));
      },
      7839: (e, t, r) => {
        "use strict";
        r.d(t, { jH: () => i });
        var s = r(84205);
        r(61268);
        var a = s.createContext(void 0);
        function i(e) {
          let t = s.useContext(a);
          return e || t || "ltr";
        }
      },
      8086: (e) => {
        "use strict";
        e.exports = require("module");
      },
      10308: (e, t, r) => {
        "use strict";
        r.d(t, { c: () => a });
        var s = r(84205);
        function a(e) {
          let t = s.useRef(e);
          return (
            s.useEffect(() => {
              t.current = e;
            }),
            s.useMemo(
              () =>
                (...e) =>
                  t.current?.(...e),
              [],
            )
          );
        }
      },
      10846: (e) => {
        "use strict";
        e.exports = require("next/dist/compiled/next-server/app-page.runtime.prod.js");
      },
      11514: (e, t, r) => {
        "use strict";
        let s;
        r.r(t),
          r.d(t, {
            default: () => h,
            generateImageMetadata: () => u,
            generateMetadata: () => l,
            generateViewport: () => p,
          });
        var a = r(63033),
          i = r(26394),
          n = r(60442),
          o = (0, i.registerClientReference)(
            function () {
              throw Error(
                "Attempted to call the default export of \"E:\\\\downloads\\\\Hijraah\\\\apps\\\\web\\\\src\\\\app\\\\ai\\\\research-hub\\\\page.tsx\" from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
              );
            },
            "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\ai\\research-hub\\page.tsx",
            "default",
          );
        let c = { ...a },
          d =
            "workUnitAsyncStorage" in c
              ? c.workUnitAsyncStorage
              : "requestAsyncStorage" in c
                ? c.requestAsyncStorage
                : void 0;
        s =
          "function" == typeof o
            ? new Proxy(o, {
                apply: (e, t, r) => {
                  let s, a, i;
                  try {
                    let e = d?.getStore();
                    (s = e?.headers.get("sentry-trace") ?? void 0),
                      (a = e?.headers.get("baggage") ?? void 0),
                      (i = e?.headers);
                  } catch (e) {}
                  return n
                    .wrapServerComponentWithSentry(e, {
                      componentRoute: "/ai/research-hub",
                      componentType: "Page",
                      sentryTraceHeader: s,
                      baggageHeader: a,
                      headers: i,
                    })
                    .apply(t, r);
                },
              })
            : o;
        let l = void 0,
          u = void 0,
          p = void 0,
          h = s;
      },
      14677: (e, t, r) => {
        "use strict";
        r.d(t, { A: () => s });
        let s = (0, r(95255).A)("Calendar", [
          ["path", { d: "M8 2v4", key: "1cmpym" }],
          ["path", { d: "M16 2v4", key: "4m81vk" }],
          [
            "rect",
            {
              width: "18",
              height: "18",
              x: "3",
              y: "4",
              rx: "2",
              key: "1hopcy",
            },
          ],
          ["path", { d: "M3 10h18", key: "8toen8" }],
        ]);
      },
      15014: (e, t, r) => {
        "use strict";
        r.d(t, { A: () => s });
        let s = (0, r(95255).A)("Trash2", [
          ["path", { d: "M3 6h18", key: "d0wm0j" }],
          [
            "path",
            { d: "M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6", key: "4alrt4" },
          ],
          ["path", { d: "M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2", key: "v07s0e" }],
          ["line", { x1: "10", x2: "10", y1: "11", y2: "17", key: "1uufr5" }],
          ["line", { x1: "14", x2: "14", y1: "11", y2: "17", key: "xtxkd" }],
        ]);
      },
      15127: (e, t, r) => {
        "use strict";
        r.d(t, { A: () => s });
        let s = (0, r(95255).A)("Plus", [
          ["path", { d: "M5 12h14", key: "1ays0h" }],
          ["path", { d: "M12 5v14", key: "s699le" }],
        ]);
      },
      19121: (e) => {
        "use strict";
        e.exports = require("next/dist/server/app-render/action-async-storage.external.js");
      },
      19771: (e) => {
        "use strict";
        e.exports = require("process");
      },
      21820: (e) => {
        "use strict";
        e.exports = require("os");
      },
      28354: (e) => {
        "use strict";
        e.exports = require("util");
      },
      28366: (e, t, r) => {
        "use strict";
        r.d(t, { B8: () => D, UC: () => T, bL: () => R, l9: () => q });
        var s = r(84205),
          a = r(28777),
          i = r(18047),
          n = r(59150),
          o = r(94653),
          c = r(78593),
          d = r(7839),
          l = r(48705),
          u = r(42414),
          p = r(61268),
          h = "Tabs",
          [x, m] = (0, i.A)(h, [n.RG]),
          f = (0, n.RG)(),
          [v, g] = x(h),
          b = s.forwardRef((e, t) => {
            let {
                __scopeTabs: r,
                value: s,
                onValueChange: a,
                defaultValue: i,
                orientation: n = "horizontal",
                dir: o,
                activationMode: x = "automatic",
                ...m
              } = e,
              f = (0, d.jH)(o),
              [g, b] = (0, l.i)({
                prop: s,
                onChange: a,
                defaultProp: i ?? "",
                caller: h,
              });
            return (0, p.jsx)(v, {
              scope: r,
              baseId: (0, u.B)(),
              value: g,
              onValueChange: b,
              orientation: n,
              dir: f,
              activationMode: x,
              children: (0, p.jsx)(c.sG.div, {
                dir: f,
                "data-orientation": n,
                ...m,
                ref: t,
              }),
            });
          });
        b.displayName = h;
        var y = "TabsList",
          w = s.forwardRef((e, t) => {
            let { __scopeTabs: r, loop: s = !0, ...a } = e,
              i = g(y, r),
              o = f(r);
            return (0, p.jsx)(n.bL, {
              asChild: !0,
              ...o,
              orientation: i.orientation,
              dir: i.dir,
              loop: s,
              children: (0, p.jsx)(c.sG.div, {
                role: "tablist",
                "aria-orientation": i.orientation,
                ...a,
                ref: t,
              }),
            });
          });
        w.displayName = y;
        var j = "TabsTrigger",
          N = s.forwardRef((e, t) => {
            let { __scopeTabs: r, value: s, disabled: i = !1, ...o } = e,
              d = g(j, r),
              l = f(r),
              u = S(d.baseId, s),
              h = C(d.baseId, s),
              x = s === d.value;
            return (0, p.jsx)(n.q7, {
              asChild: !0,
              ...l,
              focusable: !i,
              active: x,
              children: (0, p.jsx)(c.sG.button, {
                type: "button",
                role: "tab",
                "aria-selected": x,
                "aria-controls": h,
                "data-state": x ? "active" : "inactive",
                "data-disabled": i ? "" : void 0,
                disabled: i,
                id: u,
                ...o,
                ref: t,
                onMouseDown: (0, a.m)(e.onMouseDown, (e) => {
                  i || 0 !== e.button || !1 !== e.ctrlKey
                    ? e.preventDefault()
                    : d.onValueChange(s);
                }),
                onKeyDown: (0, a.m)(e.onKeyDown, (e) => {
                  [" ", "Enter"].includes(e.key) && d.onValueChange(s);
                }),
                onFocus: (0, a.m)(e.onFocus, () => {
                  let e = "manual" !== d.activationMode;
                  x || i || !e || d.onValueChange(s);
                }),
              }),
            });
          });
        N.displayName = j;
        var k = "TabsContent",
          A = s.forwardRef((e, t) => {
            let {
                __scopeTabs: r,
                value: a,
                forceMount: i,
                children: n,
                ...d
              } = e,
              l = g(k, r),
              u = S(l.baseId, a),
              h = C(l.baseId, a),
              x = a === l.value,
              m = s.useRef(x);
            return (
              s.useEffect(() => {
                let e = requestAnimationFrame(() => (m.current = !1));
                return () => cancelAnimationFrame(e);
              }, []),
              (0, p.jsx)(o.C, {
                present: i || x,
                children: ({ present: r }) =>
                  (0, p.jsx)(c.sG.div, {
                    "data-state": x ? "active" : "inactive",
                    "data-orientation": l.orientation,
                    role: "tabpanel",
                    "aria-labelledby": u,
                    hidden: !r,
                    id: h,
                    tabIndex: 0,
                    ...d,
                    ref: t,
                    style: {
                      ...e.style,
                      animationDuration: m.current ? "0s" : void 0,
                    },
                    children: r && n,
                  }),
              })
            );
          });
        function S(e, t) {
          return `${e}-trigger-${t}`;
        }
        function C(e, t) {
          return `${e}-content-${t}`;
        }
        A.displayName = k;
        var R = b,
          D = w,
          q = N,
          T = A;
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
      31469: (e, t, r) => {
        "use strict";
        r.d(t, { A: () => s });
        let s = (0, r(95255).A)("Archive", [
          [
            "rect",
            {
              width: "20",
              height: "5",
              x: "2",
              y: "3",
              rx: "1",
              key: "1wp1u1",
            },
          ],
          [
            "path",
            { d: "M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8", key: "1s80jp" },
          ],
          ["path", { d: "M10 12h4", key: "a56b0p" }],
        ]);
      },
      33873: (e) => {
        "use strict";
        e.exports = require("path");
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
      41507: (e, t, r) => {
        Promise.resolve().then(r.bind(r, 11514));
      },
      41692: (e) => {
        "use strict";
        e.exports = require("node:tls");
      },
      42414: (e, t, r) => {
        "use strict";
        r.d(t, { B: () => c });
        var s,
          a = r(84205),
          i = r(66130),
          n =
            (s || (s = r.t(a, 2)))[" useId ".trim().toString()] ||
            (() => void 0),
          o = 0;
        function c(e) {
          let [t, r] = a.useState(n());
          return (
            (0, i.N)(() => {
              e || r((e) => e ?? String(o++));
            }, [e]),
            e || (t ? `radix-${t}` : "")
          );
        }
      },
      43572: (e, t, r) => {
        "use strict";
        r.d(t, { A: () => s });
        let s = (0, r(95255).A)("User", [
          [
            "path",
            { d: "M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2", key: "975kel" },
          ],
          ["circle", { cx: "12", cy: "7", r: "4", key: "17ys0d" }],
        ]);
      },
      44708: (e) => {
        "use strict";
        e.exports = require("node:https");
      },
      44803: (e, t, r) => {
        "use strict";
        r.d(t, { A: () => s });
        let s = (0, r(95255).A)("Search", [
          ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }],
          ["path", { d: "m21 21-4.3-4.3", key: "1qie3q" }],
        ]);
      },
      46532: (e, t, r) => {
        "use strict";
        r.a(e, async (e, s) => {
          try {
            r.d(t, { E: () => d });
            var a = r(61268),
              i = r(86415),
              n = r(91635);
            r(84205);
            var o = r(15942),
              c = e([o]);
            o = (c.then ? (await c)() : c)[0];
            let l = (0, n.F)(
              "inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden",
              {
                variants: {
                  variant: {
                    default:
                      "border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90",
                    secondary:
                      "border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90",
                    destructive:
                      "border-transparent bg-destructive text-white [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
                    outline:
                      "text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground",
                  },
                },
                defaultVariants: { variant: "default" },
              },
            );
            function d({ className: e, variant: t, asChild: r = !1, ...s }) {
              let n = r ? i.DX : "span";
              return (0, a.jsx)(n, {
                "data-slot": "badge",
                className: (0, o.cn)(l({ variant: t }), e),
                ...s,
              });
            }
            s();
          } catch (e) {
            s(e);
          }
        });
      },
      48161: (e) => {
        "use strict";
        e.exports = require("node:os");
      },
      53053: (e) => {
        "use strict";
        e.exports = require("node:diagnostics_channel");
      },
      55511: (e) => {
        "use strict";
        e.exports = require("crypto");
      },
      57075: (e) => {
        "use strict";
        e.exports = require("node:stream");
      },
      57975: (e) => {
        "use strict";
        e.exports = require("node:util");
      },
      59150: (e, t, r) => {
        "use strict";
        r.d(t, { RG: () => w, bL: () => q, q7: () => T });
        var s = r(84205),
          a = r(28777),
          i = r(28029),
          n = r(71604),
          o = r(18047),
          c = r(42414),
          d = r(78593),
          l = r(10308),
          u = r(48705),
          p = r(7839),
          h = r(61268),
          x = "rovingFocusGroup.onEntryFocus",
          m = { bubbles: !1, cancelable: !0 },
          f = "RovingFocusGroup",
          [v, g, b] = (0, i.N)(f),
          [y, w] = (0, o.A)(f, [b]),
          [j, N] = y(f),
          k = s.forwardRef((e, t) =>
            (0, h.jsx)(v.Provider, {
              scope: e.__scopeRovingFocusGroup,
              children: (0, h.jsx)(v.Slot, {
                scope: e.__scopeRovingFocusGroup,
                children: (0, h.jsx)(A, { ...e, ref: t }),
              }),
            }),
          );
        k.displayName = f;
        var A = s.forwardRef((e, t) => {
            let {
                __scopeRovingFocusGroup: r,
                orientation: i,
                loop: o = !1,
                dir: c,
                currentTabStopId: v,
                defaultCurrentTabStopId: b,
                onCurrentTabStopIdChange: y,
                onEntryFocus: w,
                preventScrollOnEntryFocus: N = !1,
                ...k
              } = e,
              A = s.useRef(null),
              S = (0, n.s)(t, A),
              C = (0, p.jH)(c),
              [R, q] = (0, u.i)({
                prop: v,
                defaultProp: b ?? null,
                onChange: y,
                caller: f,
              }),
              [T, I] = s.useState(!1),
              _ = (0, l.c)(w),
              P = g(r),
              E = s.useRef(!1),
              [M, L] = s.useState(0);
            return (
              s.useEffect(() => {
                let e = A.current;
                if (e)
                  return (
                    e.addEventListener(x, _), () => e.removeEventListener(x, _)
                  );
              }, [_]),
              (0, h.jsx)(j, {
                scope: r,
                orientation: i,
                dir: C,
                loop: o,
                currentTabStopId: R,
                onItemFocus: s.useCallback((e) => q(e), [q]),
                onItemShiftTab: s.useCallback(() => I(!0), []),
                onFocusableItemAdd: s.useCallback(() => L((e) => e + 1), []),
                onFocusableItemRemove: s.useCallback(() => L((e) => e - 1), []),
                children: (0, h.jsx)(d.sG.div, {
                  tabIndex: T || 0 === M ? -1 : 0,
                  "data-orientation": i,
                  ...k,
                  ref: S,
                  style: { outline: "none", ...e.style },
                  onMouseDown: (0, a.m)(e.onMouseDown, () => {
                    E.current = !0;
                  }),
                  onFocus: (0, a.m)(e.onFocus, (e) => {
                    let t = !E.current;
                    if (e.target === e.currentTarget && t && !T) {
                      let t = new CustomEvent(x, m);
                      if (
                        (e.currentTarget.dispatchEvent(t), !t.defaultPrevented)
                      ) {
                        let e = P().filter((e) => e.focusable);
                        D(
                          [
                            e.find((e) => e.active),
                            e.find((e) => e.id === R),
                            ...e,
                          ]
                            .filter(Boolean)
                            .map((e) => e.ref.current),
                          N,
                        );
                      }
                    }
                    E.current = !1;
                  }),
                  onBlur: (0, a.m)(e.onBlur, () => I(!1)),
                }),
              })
            );
          }),
          S = "RovingFocusGroupItem",
          C = s.forwardRef((e, t) => {
            let {
                __scopeRovingFocusGroup: r,
                focusable: i = !0,
                active: n = !1,
                tabStopId: o,
                children: l,
                ...u
              } = e,
              p = (0, c.B)(),
              x = o || p,
              m = N(S, r),
              f = m.currentTabStopId === x,
              b = g(r),
              {
                onFocusableItemAdd: y,
                onFocusableItemRemove: w,
                currentTabStopId: j,
              } = m;
            return (
              s.useEffect(() => {
                if (i) return y(), () => w();
              }, [i, y, w]),
              (0, h.jsx)(v.ItemSlot, {
                scope: r,
                id: x,
                focusable: i,
                active: n,
                children: (0, h.jsx)(d.sG.span, {
                  tabIndex: f ? 0 : -1,
                  "data-orientation": m.orientation,
                  ...u,
                  ref: t,
                  onMouseDown: (0, a.m)(e.onMouseDown, (e) => {
                    i ? m.onItemFocus(x) : e.preventDefault();
                  }),
                  onFocus: (0, a.m)(e.onFocus, () => m.onItemFocus(x)),
                  onKeyDown: (0, a.m)(e.onKeyDown, (e) => {
                    if ("Tab" === e.key && e.shiftKey)
                      return void m.onItemShiftTab();
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
                        return R[a];
                    })(e, m.orientation, m.dir);
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
                        r = m.loop
                          ? (function (e, t) {
                              return e.map((r, s) => e[(t + s) % e.length]);
                            })(r, s + 1)
                          : r.slice(s + 1);
                      }
                      setTimeout(() => D(r));
                    }
                  }),
                  children:
                    "function" == typeof l
                      ? l({ isCurrentTabStop: f, hasTabStop: null != j })
                      : l,
                }),
              })
            );
          });
        C.displayName = S;
        var R = {
          ArrowLeft: "prev",
          ArrowUp: "prev",
          ArrowRight: "next",
          ArrowDown: "next",
          PageUp: "first",
          Home: "first",
          PageDown: "last",
          End: "last",
        };
        function D(e, t = !1) {
          let r = document.activeElement;
          for (let s of e)
            if (
              s === r ||
              (s.focus({ preventScroll: t }), document.activeElement !== r)
            )
              return;
        }
        var q = k,
          T = C;
      },
      62128: (e, t, r) => {
        "use strict";
        r.r(t),
          r.d(t, {
            GlobalError: () => i.default,
            __next_app__: () => l,
            pages: () => d,
            routeModule: () => u,
            tree: () => c,
          });
        var s = r(11610),
          a = r(51293),
          i = r(59059),
          n = r(17770),
          o = {};
        for (let e in n)
          0 >
            [
              "default",
              "tree",
              "pages",
              "GlobalError",
              "__next_app__",
              "routeModule",
            ].indexOf(e) && (o[e] = () => n[e]);
        r.d(t, o);
        let c = {
            children: [
              "",
              {
                children: [
                  "ai",
                  {
                    children: [
                      "research-hub",
                      {
                        children: [
                          "__PAGE__",
                          {},
                          {
                            page: [
                              () => Promise.resolve().then(r.bind(r, 11514)),
                              "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\ai\\research-hub\\page.tsx",
                            ],
                          },
                        ],
                      },
                      {},
                    ],
                  },
                  {},
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
            "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\ai\\research-hub\\page.tsx",
          ],
          l = { require: r, loadChunk: () => Promise.resolve() },
          u = new s.AppPageRouteModule({
            definition: {
              kind: a.RouteKind.APP_PAGE,
              page: "/ai/research-hub/page",
              pathname: "/ai/research-hub",
              bundlePath: "",
              filename: "",
              appPaths: [],
            },
            userland: { loaderTree: c },
          });
      },
      63033: (e) => {
        "use strict";
        e.exports = require("next/dist/server/app-render/work-unit-async-storage.external.js");
      },
      73024: (e) => {
        "use strict";
        e.exports = require("node:fs");
      },
      73566: (e) => {
        "use strict";
        e.exports = require("worker_threads");
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
      77001: (e, t, r) => {
        "use strict";
        r.a(e, async (e, s) => {
          try {
            r.d(t, {
              Tabs: () => c,
              TabsContent: () => u,
              TabsList: () => d,
              TabsTrigger: () => l,
            });
            var a = r(61268),
              i = r(28366);
            r(84205);
            var n = r(15942),
              o = e([n]);
            function c({ className: e, ...t }) {
              return (0, a.jsx)(i.bL, {
                "data-slot": "tabs",
                className: (0, n.cn)("flex flex-col gap-2", e),
                ...t,
              });
            }
            function d({ className: e, ...t }) {
              return (0, a.jsx)(i.B8, {
                "data-slot": "tabs-list",
                className: (0, n.cn)(
                  "bg-muted text-muted-foreground inline-flex h-9 w-fit items-center justify-center rounded-lg p-[3px]",
                  e,
                ),
                ...t,
              });
            }
            function l({ className: e, ...t }) {
              return (0, a.jsx)(i.l9, {
                "data-slot": "tabs-trigger",
                className: (0, n.cn)(
                  "data-[state=active]:bg-background dark:data-[state=active]:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:outline-ring dark:data-[state=active]:border-input dark:data-[state=active]:bg-input/30 text-foreground dark:text-muted-foreground inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-md border border-transparent px-2 py-1 text-sm font-medium whitespace-nowrap transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:shadow-sm [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
                  e,
                ),
                ...t,
              });
            }
            function u({ className: e, ...t }) {
              return (0, a.jsx)(i.UC, {
                "data-slot": "tabs-content",
                className: (0, n.cn)("flex-1 outline-none", e),
                ...t,
              });
            }
            (n = (o.then ? (await o)() : o)[0]), s();
          } catch (e) {
            s(e);
          }
        });
      },
      77030: (e) => {
        "use strict";
        e.exports = require("node:net");
      },
      77598: (e) => {
        "use strict";
        e.exports = require("node:crypto");
      },
      78337: (e, t, r) => {
        "use strict";
        r.a(e, async (e, s) => {
          try {
            r.d(t, { p: () => o });
            var a = r(61268);
            r(84205);
            var i = r(15942),
              n = e([i]);
            function o({ className: e, type: t, ...r }) {
              return (0, a.jsx)("input", {
                type: t,
                "data-slot": "input",
                className: (0, i.cn)(
                  "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
                  "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
                  "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
                  e,
                ),
                ...r,
              });
            }
            (i = (n.then ? (await n)() : n)[0]), s();
          } catch (e) {
            s(e);
          }
        });
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
      80992: (e, t, r) => {
        "use strict";
        r.a(e, async (e, s) => {
          try {
            r.r(t), r.d(t, { default: () => d });
            var a = r(61268),
              i = r(89882),
              n = r(4229),
              o = r(96037),
              c = e([n, o]);
            function d() {
              let e = (0, i.useSearchParams)().get("session") || void 0;
              return (0, a.jsxs)("div", {
                className: "container py-8",
                children: [
                  (0, a.jsx)("h1", {
                    className: "text-3xl font-bold mb-6",
                    children: "Unified Research Center",
                  }),
                  (0, a.jsx)("p", {
                    className: "text-muted-foreground mb-8",
                    children:
                      "Create and manage research sessions for immigration cases and documents. Each session can utilize AI-powered deep research to gather information.",
                  }),
                  (0, a.jsx)(n.x, { initialSelectedSessionId: e }),
                  (0, a.jsx)(o.J, {}),
                ],
              });
            }
            ([n, o] = c.then ? (await c)() : c), s();
          } catch (e) {
            s(e);
          }
        });
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
      94735: (e) => {
        "use strict";
        e.exports = require("events");
      },
      94812: (e, t, r) => {
        "use strict";
        r.a(e, async (e, s) => {
          try {
            r.d(t, { E: () => o });
            var a = r(61268),
              i = r(15942),
              n = e([i]);
            function o({ className: e, ...t }) {
              return (0, a.jsx)("div", {
                "data-slot": "skeleton",
                className: (0, i.cn)("bg-accent animate-pulse rounded-md", e),
                ...t,
              });
            }
            (i = (n.then ? (await n)() : n)[0]), s();
          } catch (e) {
            s(e);
          }
        });
      },
      96037: (e, t, r) => {
        "use strict";
        r.a(e, async (e, s) => {
          try {
            r.d(t, { J: () => o });
            var a = r(61268),
              i = r(5451),
              n = e([i]);
            function o() {
              return (0, a.jsxs)(i.Zp, {
                className: "mt-8",
                children: [
                  (0, a.jsxs)(i.aR, {
                    children: [
                      (0, a.jsx)(i.ZB, {
                        children: "Deep Research Implementation",
                      }),
                      (0, a.jsx)(i.BT, {
                        children:
                          "Architecture overview of the Deep Research feature",
                      }),
                    ],
                  }),
                  (0, a.jsx)(i.Wu, {
                    children: (0, a.jsx)("div", {
                      className: "border rounded-md p-4",
                      children: (0, a.jsx)("pre", {
                        className: "text-xs overflow-auto",
                        children: `
Deep Research Architecture:

1. Context & State Management
   ├── DeepResearchProvider (src/lib/contexts/deep-research-context.tsx)
   │   └── Manages state via reducer pattern
   │       ├── sources: Research sources
   │       ├── activity: Research activities
   │       ├── depth: Current and max research depth
   │       └── progress: Steps completed and total
   └── useDeepResearch() hook (src/lib/hooks/useDeepResearch.ts)
       └── Provides API for research operations
           ├── startResearch(): Begin a research session
           ├── addSource(): Add a research source
           ├── addActivity(): Record a research step
           └── Other utility functions

2. UI Components
   ├── ResearchSessionManager (src/components/ui/research/session-manager.tsx)
   │   └── Manages research sessions
   │       ├── Lists all research sessions
   │       ├── Filtering and searching
   │       ├── Creation and deletion
   │       └── Displays selected session
   └── DeepResearch (src/components/ui/research/deep-research.tsx)
       └── Displays research results
           ├── Shows progress bars
           ├── Lists sources with relevance
           ├── Shows activity log
           └── Displays research findings

3. API Integration
   // TODO: Update API route path if necessary after consolidation
   └── API Routes (src/app/api/deep-research/route.ts) 
       ├── POST /api/deep-research: Start research
       └── GET /api/deep-research: Get results

4. Persistence
   ├── Supabase Tables
   │   ├── research_sessions: Stores session metadata
   │   ├── research_sources: Stores research sources
   │   └── research_findings: Stores research activities and findings
   └── SessionStorage (for client-side caching)
            `,
                      }),
                    }),
                  }),
                ],
              });
            }
            (i = (n.then ? (await n)() : n)[0]), s();
          } catch (e) {
            s(e);
          }
        });
      },
    });
  var t = require("../../../webpack-runtime.js");
  t.C(e);
  var r = (e) => t((t.s = e)),
    s = t.X(
      0,
      [
        827, 6518, 2033, 4027, 8859, 8029, 5728, 9729, 3390, 7401, 7272, 4763,
        6867, 4630, 8543,
      ],
      () => r(62128),
    );
  module.exports = s;
})();
//# sourceMappingURL=page.js.map
