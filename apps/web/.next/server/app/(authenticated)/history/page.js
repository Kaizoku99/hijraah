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
    (e._sentryDebugIds[t] = "180a7b55-596d-4af2-97ee-3d9ccf13d74d"),
    (e._sentryDebugIdIdentifier =
      "sentry-dbid-180a7b55-596d-4af2-97ee-3d9ccf13d74d"));
} catch (e) {}
(() => {
  var e = {};
  (e.id = 2588),
    (e.ids = [2588]),
    (e.modules = {
      2963: (e, t, r) => {
        "use strict";
        r.a(e, async (e, s) => {
          try {
            r.d(t, { O: () => x });
            var a = r(61268),
              n = r(44803),
              o = r(13274),
              i = r(23734),
              d = r(17362),
              c = r(28909),
              l = r(78337),
              u = r(98383),
              m = r(16176),
              p = r(33713),
              h = r(82389),
              f = e([i, d, c, l, u, m, p, h]);
            function x({
              children: e,
              title: t = "Dashboard",
              breadcrumbs: r = [],
              heroSection: s,
            }) {
              return (0, a.jsxs)(a.Fragment, {
                children: [
                  (0, a.jsxs)("header", {
                    className:
                      "sticky top-0 z-40 flex h-16 items-center border-b border-border bg-background/95 backdrop-blur-sm px-4 transition-[width,height] ease-linear",
                    children: [
                      (0, a.jsxs)("div", {
                        className: "flex items-center gap-2 mr-4",
                        children: [
                          (0, a.jsx)(p.SidebarTrigger, { className: "-ml-1" }),
                          (0, a.jsx)(m.Separator, {
                            orientation: "vertical",
                            className: "h-4 mr-2",
                          }),
                          (0, a.jsx)(d.Qp, {
                            children: (0, a.jsxs)(d.AB, {
                              children: [
                                r.map((e, t) =>
                                  (0, a.jsxs)(
                                    d.J5,
                                    {
                                      className: "hidden md:block",
                                      children: [
                                        e.href
                                          ? (0, a.jsx)(d.w1, {
                                              href: e.href,
                                              children: e.title,
                                            })
                                          : (0, a.jsx)(d.tJ, {
                                              children: e.title,
                                            }),
                                        t < r.length - 1 &&
                                          (0, a.jsx)(d.tH, {}),
                                      ],
                                    },
                                    t,
                                  ),
                                ),
                                0 === r.length &&
                                  (0, a.jsx)(d.J5, {
                                    children: (0, a.jsx)(d.tJ, { children: t }),
                                  }),
                              ],
                            }),
                          }),
                        ],
                      }),
                      (0, a.jsxs)("div", {
                        className: "ml-auto flex items-center gap-4",
                        children: [
                          (0, a.jsxs)("div", {
                            className: "relative hidden md:block w-72",
                            children: [
                              (0, a.jsx)(n.A, {
                                className:
                                  "absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground",
                              }),
                              (0, a.jsx)(l.p, {
                                type: "search",
                                placeholder: "Search...",
                                className:
                                  "w-full rounded-full bg-background pl-8 md:w-60 lg:w-72",
                              }),
                            ],
                          }),
                          (0, a.jsxs)(c.$, {
                            size: "icon",
                            variant: "ghost",
                            className: "relative",
                            children: [
                              (0, a.jsx)(o.A, {
                                className: "h-5 w-5 text-muted-foreground",
                              }),
                              (0, a.jsx)("span", {
                                className:
                                  "absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground",
                                children: "3",
                              }),
                            ],
                          }),
                          (0, a.jsx)(u.A, {}),
                          (0, a.jsx)(h.ThemeToggle, {}),
                          (0, a.jsx)(i.eu, {
                            className: "h-8 w-8 border border-border",
                            children: (0, a.jsx)("span", {
                              className: "font-medium text-sm",
                              children: "U",
                            }),
                          }),
                        ],
                      }),
                    ],
                  }),
                  s &&
                    (0, a.jsx)("div", {
                      className:
                        "bg-sidebar-background text-sidebar-foreground",
                      children: s,
                    }),
                  (0, a.jsx)("div", {
                    className: "flex-1",
                    children: (0, a.jsx)("div", {
                      className: "container py-6 max-w-full px-6",
                      children: e,
                    }),
                  }),
                ],
              });
            }
            ([i, d, c, l, u, m, p, h] = f.then ? (await f)() : f), s();
          } catch (e) {
            s(e);
          }
        });
      },
      3295: (e) => {
        "use strict";
        e.exports = require("next/dist/server/app-render/after-task-async-storage.external.js");
      },
      5357: (e, t, r) => {
        "use strict";
        r.d(t, { IB: () => s.IB, o0: () => s.o0, s9: () => a.useI18n });
        var s = r(58702),
          a = r(70724);
        r(3452);
      },
      5451: (e, t, r) => {
        "use strict";
        r.a(e, async (e, s) => {
          try {
            r.d(t, {
              BT: () => m,
              Wu: () => p,
              ZB: () => u,
              Zp: () => c,
              aR: () => l,
              wL: () => h,
            });
            var a = r(61268),
              n = r(55728),
              o = r(84205),
              i = r(15942),
              d = e([i]);
            i = (d.then ? (await d)() : d)[0];
            let c = o.forwardRef(({ className: e, ...t }, r) =>
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
            c.displayName = "Card";
            let l = o.forwardRef(({ className: e, ...t }, r) =>
              (0, a.jsx)("div", {
                ref: r,
                className: (0, i.cn)("flex flex-col space-y-1.5 p-6", e),
                ...t,
              }),
            );
            l.displayName = "CardHeader";
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
            let m = o.forwardRef(({ className: e, ...t }, r) =>
              (0, a.jsx)("p", {
                ref: r,
                className: (0, i.cn)("text-sm text-muted-foreground", e),
                ...t,
              }),
            );
            m.displayName = "CardDescription";
            let p = o.forwardRef(({ className: e, ...t }, r) =>
              (0, a.jsx)("div", {
                ref: r,
                className: (0, i.cn)("p-6 pt-0", e),
                ...t,
              }),
            );
            p.displayName = "CardContent";
            let h = o.forwardRef(({ className: e, ...t }, r) =>
              (0, a.jsx)("div", {
                ref: r,
                className: (0, i.cn)("flex items-center p-6 pt-0", e),
                ...t,
              }),
            );
            (h.displayName = "CardFooter"), s();
          } catch (e) {
            s(e);
          }
        });
      },
      6934: () => {},
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
      10846: (e) => {
        "use strict";
        e.exports = require("next/dist/compiled/next-server/app-page.runtime.prod.js");
      },
      11997: (e) => {
        "use strict";
        e.exports = require("punycode");
      },
      13242: (e, t, r) => {
        "use strict";
        r.d(t, { F: () => a });
        var s = r(61268);
        r(84205);
        let a = ({ children: e, className: t, ...r }) =>
          (0, s.jsx)("div", {
            className: `overflow-auto ${t || ""}`,
            ...r,
            children: e,
          });
      },
      17362: (e, t, r) => {
        "use strict";
        r.a(e, async (e, s) => {
          try {
            r.d(t, {
              AB: () => l,
              J5: () => u,
              Qp: () => c,
              tH: () => h,
              tJ: () => p,
              w1: () => m,
            });
            var a = r(61268),
              n = r(86415),
              o = r(12335);
            r(84205);
            var i = r(15942),
              d = e([i]);
            function c({ ...e }) {
              return (0, a.jsx)("nav", {
                "aria-label": "breadcrumb",
                "data-slot": "breadcrumb",
                ...e,
              });
            }
            function l({ className: e, ...t }) {
              return (0, a.jsx)("ol", {
                "data-slot": "breadcrumb-list",
                className: (0, i.cn)(
                  "text-muted-foreground flex flex-wrap items-center gap-1.5 text-sm break-words sm:gap-2.5",
                  e,
                ),
                ...t,
              });
            }
            function u({ className: e, ...t }) {
              return (0, a.jsx)("li", {
                "data-slot": "breadcrumb-item",
                className: (0, i.cn)("inline-flex items-center gap-1.5", e),
                ...t,
              });
            }
            function m({ asChild: e, className: t, ...r }) {
              let s = e ? n.DX : "a";
              return (0, a.jsx)(s, {
                "data-slot": "breadcrumb-link",
                className: (0, i.cn)(
                  "hover:text-foreground transition-colors",
                  t,
                ),
                ...r,
              });
            }
            function p({ className: e, ...t }) {
              return (0, a.jsx)("span", {
                "data-slot": "breadcrumb-page",
                role: "link",
                "aria-disabled": "true",
                "aria-current": "page",
                className: (0, i.cn)("text-foreground font-normal", e),
                ...t,
              });
            }
            function h({ children: e, className: t, ...r }) {
              return (0, a.jsx)("li", {
                "data-slot": "breadcrumb-separator",
                role: "presentation",
                "aria-hidden": "true",
                className: (0, i.cn)("[&>svg]:size-3.5", t),
                ...r,
                children: e ?? (0, a.jsx)(o.A, {}),
              });
            }
            (i = (d.then ? (await d)() : d)[0]), s();
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
      21820: (e) => {
        "use strict";
        e.exports = require("os");
      },
      27910: (e) => {
        "use strict";
        e.exports = require("stream");
      },
      28354: (e) => {
        "use strict";
        e.exports = require("util");
      },
      28366: (e, t, r) => {
        "use strict";
        r.d(t, { B8: () => q, UC: () => E, bL: () => A, l9: () => I });
        var s = r(84205),
          a = r(28777),
          n = r(18047),
          o = r(59150),
          i = r(94653),
          d = r(78593),
          c = r(7839),
          l = r(48705),
          u = r(42414),
          m = r(61268),
          p = "Tabs",
          [h, f] = (0, n.A)(p, [o.RG]),
          x = (0, o.RG)(),
          [b, g] = h(p),
          v = s.forwardRef((e, t) => {
            let {
                __scopeTabs: r,
                value: s,
                onValueChange: a,
                defaultValue: n,
                orientation: o = "horizontal",
                dir: i,
                activationMode: h = "automatic",
                ...f
              } = e,
              x = (0, c.jH)(i),
              [g, v] = (0, l.i)({
                prop: s,
                onChange: a,
                defaultProp: n ?? "",
                caller: p,
              });
            return (0, m.jsx)(b, {
              scope: r,
              baseId: (0, u.B)(),
              value: g,
              onValueChange: v,
              orientation: o,
              dir: x,
              activationMode: h,
              children: (0, m.jsx)(d.sG.div, {
                dir: x,
                "data-orientation": o,
                ...f,
                ref: t,
              }),
            });
          });
        v.displayName = p;
        var y = "TabsList",
          w = s.forwardRef((e, t) => {
            let { __scopeTabs: r, loop: s = !0, ...a } = e,
              n = g(y, r),
              i = x(r);
            return (0, m.jsx)(o.bL, {
              asChild: !0,
              ...i,
              orientation: n.orientation,
              dir: n.dir,
              loop: s,
              children: (0, m.jsx)(d.sG.div, {
                role: "tablist",
                "aria-orientation": n.orientation,
                ...a,
                ref: t,
              }),
            });
          });
        w.displayName = y;
        var j = "TabsTrigger",
          N = s.forwardRef((e, t) => {
            let { __scopeTabs: r, value: s, disabled: n = !1, ...i } = e,
              c = g(j, r),
              l = x(r),
              u = C(c.baseId, s),
              p = S(c.baseId, s),
              h = s === c.value;
            return (0, m.jsx)(o.q7, {
              asChild: !0,
              ...l,
              focusable: !n,
              active: h,
              children: (0, m.jsx)(d.sG.button, {
                type: "button",
                role: "tab",
                "aria-selected": h,
                "aria-controls": p,
                "data-state": h ? "active" : "inactive",
                "data-disabled": n ? "" : void 0,
                disabled: n,
                id: u,
                ...i,
                ref: t,
                onMouseDown: (0, a.m)(e.onMouseDown, (e) => {
                  n || 0 !== e.button || !1 !== e.ctrlKey
                    ? e.preventDefault()
                    : c.onValueChange(s);
                }),
                onKeyDown: (0, a.m)(e.onKeyDown, (e) => {
                  [" ", "Enter"].includes(e.key) && c.onValueChange(s);
                }),
                onFocus: (0, a.m)(e.onFocus, () => {
                  let e = "manual" !== c.activationMode;
                  h || n || !e || c.onValueChange(s);
                }),
              }),
            });
          });
        N.displayName = j;
        var k = "TabsContent",
          T = s.forwardRef((e, t) => {
            let {
                __scopeTabs: r,
                value: a,
                forceMount: n,
                children: o,
                ...c
              } = e,
              l = g(k, r),
              u = C(l.baseId, a),
              p = S(l.baseId, a),
              h = a === l.value,
              f = s.useRef(h);
            return (
              s.useEffect(() => {
                let e = requestAnimationFrame(() => (f.current = !1));
                return () => cancelAnimationFrame(e);
              }, []),
              (0, m.jsx)(i.C, {
                present: n || h,
                children: ({ present: r }) =>
                  (0, m.jsx)(d.sG.div, {
                    "data-state": h ? "active" : "inactive",
                    "data-orientation": l.orientation,
                    role: "tabpanel",
                    "aria-labelledby": u,
                    hidden: !r,
                    id: p,
                    tabIndex: 0,
                    ...c,
                    ref: t,
                    style: {
                      ...e.style,
                      animationDuration: f.current ? "0s" : void 0,
                    },
                    children: r && o,
                  }),
              })
            );
          });
        function C(e, t) {
          return `${e}-trigger-${t}`;
        }
        function S(e, t) {
          return `${e}-content-${t}`;
        }
        T.displayName = k;
        var A = v,
          q = w,
          I = N,
          E = T;
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
      32300: (e, t, r) => {
        "use strict";
        r.d(t, { A: () => s });
        let s = (0, r(95255).A)("Languages", [
          ["path", { d: "m5 8 6 6", key: "1wu5hv" }],
          ["path", { d: "m4 14 6-6 2-3", key: "1k1g8d" }],
          ["path", { d: "M2 5h12", key: "or177f" }],
          ["path", { d: "M7 2h1", key: "1t2jsx" }],
          ["path", { d: "m22 22-5-10-5 10", key: "don7ne" }],
          ["path", { d: "M14 18h6", key: "1m8k6r" }],
        ]);
      },
      33157: (e, t, r) => {
        "use strict";
        r.a(e, async (e, s) => {
          try {
            r.r(t), r.d(t, { default: () => h });
            var a = r(61268),
              n = r(97713),
              o = r(81578),
              i = r(84205),
              d = r(2963),
              c = r(3519),
              l = r(5451),
              u = r(13242),
              m = r(77001),
              p = e([d, l, m]);
            [d, l, m] = p.then ? (await p)() : p;
            let f = (e) => (0, o.GP)(new Date(e), "PPp");
            function h() {
              let [e, t] = (0, i.useState)([]),
                [r, s] = (0, i.useState)([]),
                [o, p] = (0, i.useState)(!0),
                { user: h } = (0, c.useAuth)();
              return (
                (0, n.createBrowserClient)(
                  "http://localhost:54321",
                  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0",
                ),
                (0, a.jsx)(d.O, {
                  children: (0, a.jsxs)("div", {
                    className: "flex flex-col gap-8",
                    children: [
                      (0, a.jsxs)("div", {
                        children: [
                          (0, a.jsx)("h1", {
                            className: "text-3xl font-bold",
                            children: "History",
                          }),
                          (0, a.jsx)("p", {
                            className: "text-muted-foreground",
                            children: "View your chat and document history",
                          }),
                        ],
                      }),
                      (0, a.jsxs)(l.Zp, {
                        children: [
                          (0, a.jsxs)(l.aR, {
                            children: [
                              (0, a.jsx)(l.ZB, {
                                children: "Activity History",
                              }),
                              (0, a.jsx)(l.BT, {
                                children:
                                  "Your recent chats and document activities",
                              }),
                            ],
                          }),
                          (0, a.jsx)(l.Wu, {
                            children: (0, a.jsxs)(m.Tabs, {
                              defaultValue: "chats",
                              children: [
                                (0, a.jsxs)(m.TabsList, {
                                  children: [
                                    (0, a.jsx)(m.TabsTrigger, {
                                      value: "chats",
                                      children: "Chat History",
                                    }),
                                    (0, a.jsx)(m.TabsTrigger, {
                                      value: "documents",
                                      children: "Document History",
                                    }),
                                  ],
                                }),
                                (0, a.jsx)(m.TabsContent, {
                                  value: "chats",
                                  children: (0, a.jsx)(u.F, {
                                    className: "h-[500px]",
                                    children: (0, a.jsx)("div", {
                                      className: "space-y-4",
                                      children: e.map((e) =>
                                        (0, a.jsxs)(
                                          "div",
                                          {
                                            className: "rounded-lg border p-4",
                                            children: [
                                              (0, a.jsxs)("div", {
                                                className:
                                                  "flex items-center justify-between",
                                                children: [
                                                  (0, a.jsx)("h3", {
                                                    className: "font-medium",
                                                    children: e.title,
                                                  }),
                                                  (0, a.jsx)("span", {
                                                    className:
                                                      "text-sm text-muted-foreground",
                                                    children: f(e.created_at),
                                                  }),
                                                ],
                                              }),
                                              (0, a.jsx)("p", {
                                                className:
                                                  "mt-2 text-sm text-muted-foreground",
                                                children: e.description,
                                              }),
                                            ],
                                          },
                                          e.id,
                                        ),
                                      ),
                                    }),
                                  }),
                                }),
                                (0, a.jsx)(m.TabsContent, {
                                  value: "documents",
                                  children: (0, a.jsx)(u.F, {
                                    className: "h-[500px]",
                                    children: (0, a.jsx)("div", {
                                      className: "space-y-4",
                                      children: r.map((e) =>
                                        (0, a.jsxs)(
                                          "div",
                                          {
                                            className: "rounded-lg border p-4",
                                            children: [
                                              (0, a.jsxs)("div", {
                                                className:
                                                  "flex items-center justify-between",
                                                children: [
                                                  (0, a.jsx)("h3", {
                                                    className: "font-medium",
                                                    children: e.title,
                                                  }),
                                                  (0, a.jsx)("span", {
                                                    className:
                                                      "text-sm text-muted-foreground",
                                                    children: f(e.created_at),
                                                  }),
                                                ],
                                              }),
                                              (0, a.jsx)("p", {
                                                className:
                                                  "mt-2 text-sm text-muted-foreground",
                                                children: e.description,
                                              }),
                                            ],
                                          },
                                          e.id,
                                        ),
                                      ),
                                    }),
                                  }),
                                }),
                              ],
                            }),
                          }),
                        ],
                      }),
                    ],
                  }),
                })
              );
            }
            s();
          } catch (e) {
            s(e);
          }
        });
      },
      33873: (e) => {
        "use strict";
        e.exports = require("path");
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
      39067: (e, t, r) => {
        "use strict";
        r.d(t, { A: () => s });
        let s = (0, r(95255).A)("Laptop", [
          [
            "path",
            {
              d: "M20 16V7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v9m16 0H4m16 0 1.28 2.55a1 1 0 0 1-.9 1.45H3.62a1 1 0 0 1-.9-1.45L4 16",
              key: "tarvll",
            },
          ],
        ]);
      },
      40174: (e, t, r) => {
        Promise.resolve().then(r.bind(r, 41231));
      },
      41231: (e, t, r) => {
        "use strict";
        let s;
        r.r(t),
          r.d(t, {
            default: () => p,
            generateImageMetadata: () => u,
            generateMetadata: () => l,
            generateViewport: () => m,
          });
        var a = r(63033),
          n = r(26394),
          o = r(60442),
          i = (0, n.registerClientReference)(
            function () {
              throw Error(
                "Attempted to call the default export of \"E:\\\\downloads\\\\Hijraah\\\\apps\\\\web\\\\src\\\\app\\\\(authenticated)\\\\history\\\\page.tsx\" from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
              );
            },
            "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\(authenticated)\\history\\page.tsx",
            "default",
          );
        let d = { ...a },
          c =
            "workUnitAsyncStorage" in d
              ? d.workUnitAsyncStorage
              : "requestAsyncStorage" in d
                ? d.requestAsyncStorage
                : void 0;
        s =
          "function" == typeof i
            ? new Proxy(i, {
                apply: (e, t, r) => {
                  let s, a, n;
                  try {
                    let e = c?.getStore();
                    (s = e?.headers.get("sentry-trace") ?? void 0),
                      (a = e?.headers.get("baggage") ?? void 0),
                      (n = e?.headers);
                  } catch (e) {}
                  return o
                    .wrapServerComponentWithSentry(e, {
                      componentRoute: "/(authenticated)/history",
                      componentType: "Page",
                      sentryTraceHeader: s,
                      baggageHeader: a,
                      headers: n,
                    })
                    .apply(t, r);
                },
              })
            : i;
        let l = void 0,
          u = void 0,
          m = void 0,
          p = s;
      },
      41692: (e) => {
        "use strict";
        e.exports = require("node:tls");
      },
      42414: (e, t, r) => {
        "use strict";
        r.d(t, { B: () => d });
        var s,
          a = r(84205),
          n = r(66130),
          o =
            (s || (s = r.t(a, 2)))[" useId ".trim().toString()] ||
            (() => void 0),
          i = 0;
        function d(e) {
          let [t, r] = a.useState(o());
          return (
            (0, n.N)(() => {
              e || r((e) => e ?? String(i++));
            }, [e]),
            e || (t ? `radix-${t}` : "")
          );
        }
      },
      43886: () => {},
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
      48098: (e, t, r) => {
        "use strict";
        r.d(t, { A: () => s });
        let s = (0, r(95255).A)("Moon", [
          ["path", { d: "M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z", key: "a7tn18" }],
        ]);
      },
      48161: (e) => {
        "use strict";
        e.exports = require("node:os");
      },
      51209: (e, t, r) => {
        "use strict";
        r.d(t, { b: () => c });
        var s = r(84205),
          a = r(56558),
          n = r(61268),
          o = "horizontal",
          i = ["horizontal", "vertical"],
          d = s.forwardRef((e, t) => {
            var r;
            let { decorative: s, orientation: d = o, ...c } = e,
              l = ((r = d), i.includes(r)) ? d : o;
            return (0, n.jsx)(a.sG.div, {
              "data-orientation": l,
              ...(s
                ? { role: "none" }
                : {
                    "aria-orientation": "vertical" === l ? l : void 0,
                    role: "separator",
                  }),
              ...c,
              ref: t,
            });
          });
        d.displayName = "Separator";
        var c = d;
      },
      53053: (e) => {
        "use strict";
        e.exports = require("node:diagnostics_channel");
      },
      55060: (e, t, r) => {
        "use strict";
        r.r(t),
          r.d(t, {
            GlobalError: () => n.default,
            __next_app__: () => l,
            pages: () => c,
            routeModule: () => u,
            tree: () => d,
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
        let d = {
            children: [
              "",
              {
                children: [
                  "(authenticated)",
                  {
                    children: [
                      "history",
                      {
                        children: [
                          "__PAGE__",
                          {},
                          {
                            page: [
                              () => Promise.resolve().then(r.bind(r, 41231)),
                              "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\(authenticated)\\history\\page.tsx",
                            ],
                          },
                        ],
                      },
                      {},
                    ],
                  },
                  {
                    layout: [
                      () => Promise.resolve().then(r.bind(r, 72967)),
                      "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\(authenticated)\\layout.tsx",
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
          c = [
            "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\(authenticated)\\history\\page.tsx",
          ],
          l = { require: r, loadChunk: () => Promise.resolve() },
          u = new s.AppPageRouteModule({
            definition: {
              kind: a.RouteKind.APP_PAGE,
              page: "/(authenticated)/history/page",
              pathname: "/history",
              bundlePath: "",
              filename: "",
              appPaths: [],
            },
            userland: { loaderTree: d },
          });
      },
      55511: (e) => {
        "use strict";
        e.exports = require("crypto");
      },
      55591: (e) => {
        "use strict";
        e.exports = require("https");
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
        r.d(t, { RG: () => w, bL: () => I, q7: () => E });
        var s = r(84205),
          a = r(28777),
          n = r(28029),
          o = r(71604),
          i = r(18047),
          d = r(42414),
          c = r(78593),
          l = r(10308),
          u = r(48705),
          m = r(7839),
          p = r(61268),
          h = "rovingFocusGroup.onEntryFocus",
          f = { bubbles: !1, cancelable: !0 },
          x = "RovingFocusGroup",
          [b, g, v] = (0, n.N)(x),
          [y, w] = (0, i.A)(x, [v]),
          [j, N] = y(x),
          k = s.forwardRef((e, t) =>
            (0, p.jsx)(b.Provider, {
              scope: e.__scopeRovingFocusGroup,
              children: (0, p.jsx)(b.Slot, {
                scope: e.__scopeRovingFocusGroup,
                children: (0, p.jsx)(T, { ...e, ref: t }),
              }),
            }),
          );
        k.displayName = x;
        var T = s.forwardRef((e, t) => {
            let {
                __scopeRovingFocusGroup: r,
                orientation: n,
                loop: i = !1,
                dir: d,
                currentTabStopId: b,
                defaultCurrentTabStopId: v,
                onCurrentTabStopIdChange: y,
                onEntryFocus: w,
                preventScrollOnEntryFocus: N = !1,
                ...k
              } = e,
              T = s.useRef(null),
              C = (0, o.s)(t, T),
              S = (0, m.jH)(d),
              [A, I] = (0, u.i)({
                prop: b,
                defaultProp: v ?? null,
                onChange: y,
                caller: x,
              }),
              [E, _] = s.useState(!1),
              R = (0, l.c)(w),
              $ = g(r),
              L = s.useRef(!1),
              [P, D] = s.useState(0);
            return (
              s.useEffect(() => {
                let e = T.current;
                if (e)
                  return (
                    e.addEventListener(h, R), () => e.removeEventListener(h, R)
                  );
              }, [R]),
              (0, p.jsx)(j, {
                scope: r,
                orientation: n,
                dir: S,
                loop: i,
                currentTabStopId: A,
                onItemFocus: s.useCallback((e) => I(e), [I]),
                onItemShiftTab: s.useCallback(() => _(!0), []),
                onFocusableItemAdd: s.useCallback(() => D((e) => e + 1), []),
                onFocusableItemRemove: s.useCallback(() => D((e) => e - 1), []),
                children: (0, p.jsx)(c.sG.div, {
                  tabIndex: E || 0 === P ? -1 : 0,
                  "data-orientation": n,
                  ...k,
                  ref: C,
                  style: { outline: "none", ...e.style },
                  onMouseDown: (0, a.m)(e.onMouseDown, () => {
                    L.current = !0;
                  }),
                  onFocus: (0, a.m)(e.onFocus, (e) => {
                    let t = !L.current;
                    if (e.target === e.currentTarget && t && !E) {
                      let t = new CustomEvent(h, f);
                      if (
                        (e.currentTarget.dispatchEvent(t), !t.defaultPrevented)
                      ) {
                        let e = $().filter((e) => e.focusable);
                        q(
                          [
                            e.find((e) => e.active),
                            e.find((e) => e.id === A),
                            ...e,
                          ]
                            .filter(Boolean)
                            .map((e) => e.ref.current),
                          N,
                        );
                      }
                    }
                    L.current = !1;
                  }),
                  onBlur: (0, a.m)(e.onBlur, () => _(!1)),
                }),
              })
            );
          }),
          C = "RovingFocusGroupItem",
          S = s.forwardRef((e, t) => {
            let {
                __scopeRovingFocusGroup: r,
                focusable: n = !0,
                active: o = !1,
                tabStopId: i,
                children: l,
                ...u
              } = e,
              m = (0, d.B)(),
              h = i || m,
              f = N(C, r),
              x = f.currentTabStopId === h,
              v = g(r),
              {
                onFocusableItemAdd: y,
                onFocusableItemRemove: w,
                currentTabStopId: j,
              } = f;
            return (
              s.useEffect(() => {
                if (n) return y(), () => w();
              }, [n, y, w]),
              (0, p.jsx)(b.ItemSlot, {
                scope: r,
                id: h,
                focusable: n,
                active: o,
                children: (0, p.jsx)(c.sG.span, {
                  tabIndex: x ? 0 : -1,
                  "data-orientation": f.orientation,
                  ...u,
                  ref: t,
                  onMouseDown: (0, a.m)(e.onMouseDown, (e) => {
                    n ? f.onItemFocus(h) : e.preventDefault();
                  }),
                  onFocus: (0, a.m)(e.onFocus, () => f.onItemFocus(h)),
                  onKeyDown: (0, a.m)(e.onKeyDown, (e) => {
                    if ("Tab" === e.key && e.shiftKey)
                      return void f.onItemShiftTab();
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
                        return A[a];
                    })(e, f.orientation, f.dir);
                    if (void 0 !== t) {
                      if (e.metaKey || e.ctrlKey || e.altKey || e.shiftKey)
                        return;
                      e.preventDefault();
                      let r = v()
                        .filter((e) => e.focusable)
                        .map((e) => e.ref.current);
                      if ("last" === t) r.reverse();
                      else if ("prev" === t || "next" === t) {
                        "prev" === t && r.reverse();
                        let s = r.indexOf(e.currentTarget);
                        r = f.loop
                          ? (function (e, t) {
                              return e.map((r, s) => e[(t + s) % e.length]);
                            })(r, s + 1)
                          : r.slice(s + 1);
                      }
                      setTimeout(() => q(r));
                    }
                  }),
                  children:
                    "function" == typeof l
                      ? l({ isCurrentTabStop: x, hasTabStop: null != j })
                      : l,
                }),
              })
            );
          });
        S.displayName = C;
        var A = {
          ArrowLeft: "prev",
          ArrowUp: "prev",
          ArrowRight: "next",
          ArrowDown: "next",
          PageUp: "first",
          Home: "first",
          PageDown: "last",
          End: "last",
        };
        function q(e, t = !1) {
          let r = document.activeElement;
          for (let s of e)
            if (
              s === r ||
              (s.focus({ preventScroll: t }), document.activeElement !== r)
            )
              return;
        }
        var I = k,
          E = S;
      },
      63033: (e) => {
        "use strict";
        e.exports = require("next/dist/server/app-render/work-unit-async-storage.external.js");
      },
      70724: (e, t, r) => {
        "use strict";
        r.r(t),
          r.d(t, {
            useGlobalTranslate: () => i,
            useI18n: () => n,
            useTranslate: () => o,
          });
        var s = r(95124),
          a = r(58702);
        function n() {
          let e = (0, s.useLocale)(),
            t = (0, s.useTranslations)(),
            r = (0, s.useFormatter)(),
            n = (0, s.useTimeZone)(),
            o = (0, s.useNow)(),
            i = (0, a.XG)(e),
            d = i.direction;
          return {
            t,
            format: r,
            locale: e,
            timeZone: n,
            now: o,
            config: i,
            direction: d,
            isRtl: "rtl" === d,
            formatDate: (e, t) => r.dateTime(e, t),
            formatRelativeTime: (e) => r.relativeTime(e),
            formatCurrency: (e, t = "USD") =>
              r.number(e, { style: "currency", currency: t }),
            formatNumber: (e, t) => r.number(e, t),
          };
        }
        function o(e) {
          return (0, s.useTranslations)(e);
        }
        function i() {
          return (0, s.useTranslations)();
        }
      },
      72967: (e, t, r) => {
        "use strict";
        let s;
        r.r(t),
          r.d(t, {
            default: () => m,
            generateImageMetadata: () => l,
            generateMetadata: () => c,
            generateViewport: () => u,
          });
        var a = r(63033),
          n = r(35242),
          o = r(60442);
        let i = { ...a },
          d =
            "workUnitAsyncStorage" in i
              ? i.workUnitAsyncStorage
              : "requestAsyncStorage" in i
                ? i.requestAsyncStorage
                : void 0;
        s = new Proxy(
          function ({ children: e }) {
            return (0, n.jsx)(n.Fragment, { children: e });
          },
          {
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
                  componentRoute: "/(authenticated)",
                  componentType: "Layout",
                  sentryTraceHeader: s,
                  baggageHeader: a,
                  headers: n,
                })
                .apply(t, r);
            },
          },
        );
        let c = void 0,
          l = void 0,
          u = void 0,
          m = s;
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
              Tabs: () => d,
              TabsContent: () => u,
              TabsList: () => c,
              TabsTrigger: () => l,
            });
            var a = r(61268),
              n = r(28366);
            r(84205);
            var o = r(15942),
              i = e([o]);
            function d({ className: e, ...t }) {
              return (0, a.jsx)(n.bL, {
                "data-slot": "tabs",
                className: (0, o.cn)("flex flex-col gap-2", e),
                ...t,
              });
            }
            function c({ className: e, ...t }) {
              return (0, a.jsx)(n.B8, {
                "data-slot": "tabs-list",
                className: (0, o.cn)(
                  "bg-muted text-muted-foreground inline-flex h-9 w-fit items-center justify-center rounded-lg p-[3px]",
                  e,
                ),
                ...t,
              });
            }
            function l({ className: e, ...t }) {
              return (0, a.jsx)(n.l9, {
                "data-slot": "tabs-trigger",
                className: (0, o.cn)(
                  "data-[state=active]:bg-background dark:data-[state=active]:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:outline-ring dark:data-[state=active]:border-input dark:data-[state=active]:bg-input/30 text-foreground dark:text-muted-foreground inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-md border border-transparent px-2 py-1 text-sm font-medium whitespace-nowrap transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:shadow-sm [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
                  e,
                ),
                ...t,
              });
            }
            function u({ className: e, ...t }) {
              return (0, a.jsx)(n.UC, {
                "data-slot": "tabs-content",
                className: (0, o.cn)("flex-1 outline-none", e),
                ...t,
              });
            }
            (o = (i.then ? (await i)() : i)[0]), s();
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
      78077: (e, t, r) => {
        "use strict";
        r.d(t, { A: () => s });
        let s = (0, r(95255).A)("Sun", [
          ["circle", { cx: "12", cy: "12", r: "4", key: "4exip2" }],
          ["path", { d: "M12 2v2", key: "tus03m" }],
          ["path", { d: "M12 20v2", key: "1lh1kg" }],
          ["path", { d: "m4.93 4.93 1.41 1.41", key: "149t6j" }],
          ["path", { d: "m17.66 17.66 1.41 1.41", key: "ptbguv" }],
          ["path", { d: "M2 12h2", key: "1t8f8n" }],
          ["path", { d: "M20 12h2", key: "1q8mjw" }],
          ["path", { d: "m6.34 17.66-1.41 1.41", key: "1m8zz5" }],
          ["path", { d: "m19.07 4.93-1.41 1.41", key: "1shlcs" }],
        ]);
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
      79926: (e, t, r) => {
        Promise.resolve().then(r.bind(r, 33157));
      },
      80481: (e) => {
        "use strict";
        e.exports = require("node:readline");
      },
      81630: (e) => {
        "use strict";
        e.exports = require("http");
      },
      82389: (e, t, r) => {
        "use strict";
        r.a(e, async (e, s) => {
          try {
            r.d(t, { ThemeToggle: () => h });
            var a = r(61268),
              n = r(78077),
              o = r(48098),
              i = r(39067),
              d = r(96106),
              c = r(84205),
              l = r(28909),
              u = r(93336),
              m = r(15942),
              p = e([l, u, m]);
            function h({ variant: e = "default" }) {
              let { theme: t, setTheme: r } = (0, d.D)(),
                [s, p] = (0, c.useState)(!1),
                h = "sidebar" === e;
              return (0, a.jsxs)(u.rI, {
                children: [
                  (0, a.jsx)(u.ty, {
                    asChild: !0,
                    children: (0, a.jsxs)(l.$, {
                      variant: "ghost",
                      size: "icon",
                      className: (0, m.cn)(
                        "h-9 w-9 rounded-full bg-background hover:bg-accent hover:text-accent-foreground",
                        "border border-border/40 shadow-sm transition-all duration-200",
                        "hover:shadow-md data-[state=open]:bg-accent data-[state=open]:text-accent-foreground",
                        "focus-visible:ring-offset-0 focus-visible:border-primary/50",
                        s && "animate-in fade-in-50 duration-300",
                        h && "h-8 w-8 rounded-md",
                      ),
                      children: [
                        (0, a.jsx)(n.A, {
                          className: (0, m.cn)(
                            "h-[1.15rem] w-[1.15rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0",
                            h && "h-4 w-4",
                          ),
                        }),
                        (0, a.jsx)(o.A, {
                          className: (0, m.cn)(
                            "absolute h-[1.15rem] w-[1.15rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100",
                            h && "h-4 w-4",
                          ),
                        }),
                        (0, a.jsx)("span", {
                          className: "sr-only",
                          children: "Toggle theme",
                        }),
                      ],
                    }),
                  }),
                  (0, a.jsxs)(u.SQ, {
                    align: "end",
                    className:
                      "animate-in fade-in-50 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
                    children: [
                      (0, a.jsxs)(u._2, {
                        onClick: () => r("light"),
                        className: (0, m.cn)(
                          "flex cursor-pointer items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors",
                          "light" === t &&
                            "bg-accent font-medium text-accent-foreground",
                        ),
                        children: [
                          (0, a.jsx)(n.A, { className: "h-4 w-4" }),
                          (0, a.jsx)("span", { children: "Light" }),
                        ],
                      }),
                      (0, a.jsxs)(u._2, {
                        onClick: () => r("dark"),
                        className: (0, m.cn)(
                          "flex cursor-pointer items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors",
                          "dark" === t &&
                            "bg-accent font-medium text-accent-foreground",
                        ),
                        children: [
                          (0, a.jsx)(o.A, { className: "h-4 w-4" }),
                          (0, a.jsx)("span", { children: "Dark" }),
                        ],
                      }),
                      (0, a.jsxs)(u._2, {
                        onClick: () => r("system"),
                        className: (0, m.cn)(
                          "flex cursor-pointer items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors",
                          "system" === t &&
                            "bg-accent font-medium text-accent-foreground",
                        ),
                        children: [
                          (0, a.jsx)(i.A, { className: "h-4 w-4" }),
                          (0, a.jsx)("span", { children: "System" }),
                        ],
                      }),
                    ],
                  }),
                ],
              });
            }
            ([l, u, m] = p.then ? (await p)() : p), s();
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
      91645: (e) => {
        "use strict";
        e.exports = require("net");
      },
      94735: (e) => {
        "use strict";
        e.exports = require("events");
      },
      96106: (e, t, r) => {
        "use strict";
        r.d(t, { D: () => d, N: () => c });
        var s = r(84205),
          a = ["light", "dark"],
          n = "(prefers-color-scheme: dark)",
          o = s.createContext(void 0),
          i = { setTheme: (e) => {}, themes: [] },
          d = () => {
            var e;
            return null != (e = s.useContext(o)) ? e : i;
          },
          c = (e) =>
            s.useContext(o) ? e.children : s.createElement(u, { ...e }),
          l = ["light", "dark"],
          u = ({
            forcedTheme: e,
            disableTransitionOnChange: t = !1,
            enableSystem: r = !0,
            enableColorScheme: i = !0,
            storageKey: d = "theme",
            themes: c = l,
            defaultTheme: u = r ? "system" : "light",
            attribute: x = "data-theme",
            value: b,
            children: g,
            nonce: v,
          }) => {
            let [y, w] = s.useState(() => p(d, u)),
              [j, N] = s.useState(() => p(d)),
              k = b ? Object.values(b) : c,
              T = s.useCallback((e) => {
                let s = e;
                if (!s) return;
                "system" === e && r && (s = f());
                let n = b ? b[s] : s,
                  o = t ? h() : null,
                  d = document.documentElement;
                if (
                  ("class" === x
                    ? (d.classList.remove(...k), n && d.classList.add(n))
                    : n
                      ? d.setAttribute(x, n)
                      : d.removeAttribute(x),
                  i)
                ) {
                  let e = a.includes(u) ? u : null,
                    t = a.includes(s) ? s : e;
                  d.style.colorScheme = t;
                }
                null == o || o();
              }, []),
              C = s.useCallback(
                (e) => {
                  let t = "function" == typeof e ? e(e) : e;
                  w(t);
                  try {
                    localStorage.setItem(d, t);
                  } catch (e) {}
                },
                [e],
              ),
              S = s.useCallback(
                (t) => {
                  N(f(t)), "system" === y && r && !e && T("system");
                },
                [y, e],
              );
            s.useEffect(() => {
              let e = window.matchMedia(n);
              return e.addListener(S), S(e), () => e.removeListener(S);
            }, [S]),
              s.useEffect(() => {
                let e = (e) => {
                  e.key === d && C(e.newValue || u);
                };
                return (
                  window.addEventListener("storage", e),
                  () => window.removeEventListener("storage", e)
                );
              }, [C]),
              s.useEffect(() => {
                T(null != e ? e : y);
              }, [e, y]);
            let A = s.useMemo(
              () => ({
                theme: y,
                setTheme: C,
                forcedTheme: e,
                resolvedTheme: "system" === y ? j : y,
                themes: r ? [...c, "system"] : c,
                systemTheme: r ? j : void 0,
              }),
              [y, C, e, j, r, c],
            );
            return s.createElement(
              o.Provider,
              { value: A },
              s.createElement(m, {
                forcedTheme: e,
                disableTransitionOnChange: t,
                enableSystem: r,
                enableColorScheme: i,
                storageKey: d,
                themes: c,
                defaultTheme: u,
                attribute: x,
                value: b,
                children: g,
                attrs: k,
                nonce: v,
              }),
              g,
            );
          },
          m = s.memo(
            ({
              forcedTheme: e,
              storageKey: t,
              attribute: r,
              enableSystem: o,
              enableColorScheme: i,
              defaultTheme: d,
              value: c,
              attrs: l,
              nonce: u,
            }) => {
              let m = "system" === d,
                p =
                  "class" === r
                    ? `var d=document.documentElement,c=d.classList;c.remove(${l.map((e) => `'${e}'`).join(",")});`
                    : `var d=document.documentElement,n='${r}',s='setAttribute';`,
                h = i
                  ? (a.includes(d) ? d : null)
                    ? `if(e==='light'||e==='dark'||!e)d.style.colorScheme=e||'${d}'`
                    : "if(e==='light'||e==='dark')d.style.colorScheme=e"
                  : "",
                f = (e, t = !1, s = !0) => {
                  let n = c ? c[e] : e,
                    o = t ? e + "|| ''" : `'${n}'`,
                    d = "";
                  return (
                    i &&
                      s &&
                      !t &&
                      a.includes(e) &&
                      (d += `d.style.colorScheme = '${e}';`),
                    "class" === r
                      ? t || n
                        ? (d += `c.add(${o})`)
                        : (d += "null")
                      : n && (d += `d[s](n,${o})`),
                    d
                  );
                },
                x = e
                  ? `!function(){${p}${f(e)}}()`
                  : o
                    ? `!function(){try{${p}var e=localStorage.getItem('${t}');if('system'===e||(!e&&${m})){var t='${n}',m=window.matchMedia(t);if(m.media!==t||m.matches){${f("dark")}}else{${f("light")}}}else if(e){${c ? `var x=${JSON.stringify(c)};` : ""}${f(c ? "x[e]" : "e", !0)}}${m ? "" : "else{" + f(d, !1, !1) + "}"}${h}}catch(e){}}()`
                    : `!function(){try{${p}var e=localStorage.getItem('${t}');if(e){${c ? `var x=${JSON.stringify(c)};` : ""}${f(c ? "x[e]" : "e", !0)}}else{${f(d, !1, !1)};}${h}}catch(t){}}();`;
              return s.createElement("script", {
                nonce: u,
                dangerouslySetInnerHTML: { __html: x },
              });
            },
          ),
          p = (e, t) => {},
          h = () => {
            let e = document.createElement("style");
            return (
              e.appendChild(
                document.createTextNode(
                  "*{-webkit-transition:none!important;-moz-transition:none!important;-o-transition:none!important;-ms-transition:none!important;transition:none!important}",
                ),
              ),
              document.head.appendChild(e),
              () => {
                window.getComputedStyle(document.body),
                  setTimeout(() => {
                    document.head.removeChild(e);
                  }, 1);
              }
            );
          },
          f = (e) => (
            e || (e = window.matchMedia(n)), e.matches ? "dark" : "light"
          );
      },
      98383: (e, t, r) => {
        "use strict";
        r.a(e, async (e, s) => {
          try {
            r.d(t, { A: () => p });
            var a = r(61268),
              n = r(32300),
              o = r(89882),
              i = r(84205),
              d = r(5357),
              c = r(15942),
              l = r(28909),
              u = r(93336),
              m = e([c, l, u]);
            function p({ variant: e = "default" }) {
              let { locale: t, t: r } = (0, d.s9)(),
                s = (0, o.usePathname)(),
                [m, p] = (0, i.useTransition)(),
                h = "sidebar" === e,
                f = s.replace(`/${t}`, "") || "/",
                x = (e) => {
                  m ||
                    e === t ||
                    p(() => {
                      let t = `/${e}${f.startsWith("/") ? f : `/${f}`}`,
                        r = d.o0[e];
                      (document.documentElement.dir = r.direction),
                        r.fontClass &&
                          (document.documentElement.classList.forEach((e) => {
                            e.startsWith("font-") &&
                              document.documentElement.classList.remove(e);
                          }),
                          document.documentElement.classList.add(r.fontClass)),
                        localStorage.setItem("NEXT_LOCALE", e),
                        (window.location.href = t);
                    });
                };
              return (0, a.jsxs)(u.rI, {
                children: [
                  (0, a.jsx)(u.ty, {
                    asChild: !0,
                    children: (0, a.jsxs)(l.$, {
                      variant: "ghost",
                      size: "icon",
                      className: (0, c.cn)(
                        "relative h-9 w-9 rounded-full bg-background hover:bg-accent hover:text-accent-foreground",
                        "border border-border/40 shadow-sm transition-all duration-200",
                        "hover:shadow-md data-[state=open]:bg-accent data-[state=open]:text-accent-foreground",
                        "focus-visible:ring-offset-0 focus-visible:border-primary/50",
                        h && "h-8 w-8 rounded-md",
                        m && "opacity-50 cursor-not-allowed",
                      ),
                      disabled: m,
                      "aria-label": r("common.switchLanguage"),
                      children: [
                        (0, a.jsx)(n.A, {
                          className: (0, c.cn)(
                            "h-[1.2rem] w-[1.2rem]",
                            h && "h-4 w-4",
                          ),
                        }),
                        (0, a.jsx)("span", {
                          className: "sr-only",
                          children: r("common.switchLanguage"),
                        }),
                        m &&
                          (0, a.jsx)("div", {
                            className:
                              "absolute inset-0 flex items-center justify-center bg-background/50 rounded-full",
                            children: (0, a.jsx)("div", {
                              className:
                                "h-4 w-4 border-2 border-primary border-t-transparent rounded-full animate-spin",
                            }),
                          }),
                      ],
                    }),
                  }),
                  (0, a.jsx)(u.SQ, {
                    align: "end",
                    className: (0, c.cn)(
                      "animate-in fade-in-50 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
                      "min-w-[150px]",
                    ),
                    children: d.IB.map((e) => {
                      let r = d.o0[e],
                        s = t === e;
                      return (0, a.jsxs)(
                        u._2,
                        {
                          onClick: () => !m && x(e),
                          className: (0, c.cn)(
                            "flex cursor-pointer items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors",
                            "hover:bg-accent hover:text-accent-foreground",
                            s && "bg-accent font-medium text-accent-foreground",
                            m && "opacity-50 cursor-not-allowed",
                          ),
                          disabled: m,
                          children: [
                            (0, a.jsx)("span", {
                              className: "text-base",
                              children: r.flag,
                            }),
                            (0, a.jsx)("span", {
                              className: (0, c.cn)(
                                "flex-1",
                                "ar" === e && "font-arabic text-right",
                              ),
                              children: r.nativeName,
                            }),
                            s &&
                              (0, a.jsx)("div", {
                                className: "h-2 w-2 rounded-full bg-primary",
                              }),
                          ],
                        },
                        e,
                      );
                    }),
                  }),
                ],
              });
            }
            ([c, l, u] = m.then ? (await m)() : m), s();
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
        827, 6518, 2033, 4027, 2872, 7713, 5149, 8859, 1655, 8029, 5728, 9729,
        3390, 6188, 7911, 5124, 7272, 3042, 1578, 4630, 8264,
      ],
      () => r(55060),
    );
  module.exports = s;
})();
//# sourceMappingURL=page.js.map
