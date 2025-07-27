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
    r = new e.Error().stack;
  r &&
    ((e._sentryDebugIds = e._sentryDebugIds || {}),
    (e._sentryDebugIds[r] = "22b46c72-917c-4ac9-a1dc-e3805a4dc5ea"),
    (e._sentryDebugIdIdentifier =
      "sentry-dbid-22b46c72-917c-4ac9-a1dc-e3805a4dc5ea"));
} catch (e) {}
(() => {
  var e = {};
  (e.id = 3554),
    (e.ids = [3554]),
    (e.modules = {
      3295: (e) => {
        "use strict";
        e.exports = require("next/dist/server/app-render/after-task-async-storage.external.js");
      },
      7609: (e, r, t) => {
        "use strict";
        t.d(r, { A: () => s });
        let s = (0, t(30980).A)("CheckSquare", [
          ["path", { d: "m9 11 3 3L22 4", key: "1pflzl" }],
          [
            "path",
            {
              d: "M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11",
              key: "1jnkn4",
            },
          ],
        ]);
      },
      8086: (e) => {
        "use strict";
        e.exports = require("module");
      },
      10846: (e) => {
        "use strict";
        e.exports = require("next/dist/compiled/next-server/app-page.runtime.prod.js");
      },
      14664: (e, r, t) => {
        "use strict";
        t.d(r, { A: () => s });
        let s = (0, t(30980).A)("ClipboardList", [
          [
            "rect",
            {
              width: "8",
              height: "4",
              x: "8",
              y: "2",
              rx: "1",
              ry: "1",
              key: "tgr4d6",
            },
          ],
          [
            "path",
            {
              d: "M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2",
              key: "116196",
            },
          ],
          ["path", { d: "M12 11h4", key: "1jrz19" }],
          ["path", { d: "M12 16h4", key: "n85exb" }],
          ["path", { d: "M8 11h.01", key: "1dfujw" }],
          ["path", { d: "M8 16h.01", key: "18s6g9" }],
        ]);
      },
      14829: (e, r, t) => {
        "use strict";
        t.a(e, async (e, s) => {
          try {
            t.d(r, {
              BT: () => p,
              Wu: () => x,
              ZB: () => u,
              Zp: () => d,
              aR: () => c,
            });
            var i = t(35242),
              n = t(47350),
              o = t(84147),
              a = t(20716),
              l = e([a]);
            a = (l.then ? (await l)() : l)[0];
            let d = o.forwardRef(({ className: e, ...r }, t) =>
              (0, i.jsx)(n.motion.div, {
                ref: t,
                className: (0, a.cn)(
                  "rounded-lg border bg-card text-card-foreground shadow-sm",
                  e,
                ),
                whileHover: {
                  scale: 1.03,
                  boxShadow:
                    "0px 7px 25px rgba(0,0,0,0.08), 0px 3px 10px rgba(0,0,0,0.04)",
                },
                transition: { type: "spring", stiffness: 300, damping: 20 },
                ...r,
              }),
            );
            d.displayName = "Card";
            let c = o.forwardRef(({ className: e, ...r }, t) =>
              (0, i.jsx)("div", {
                ref: t,
                className: (0, a.cn)("flex flex-col space-y-1.5 p-6", e),
                ...r,
              }),
            );
            c.displayName = "CardHeader";
            let u = o.forwardRef(({ className: e, ...r }, t) =>
              (0, i.jsx)("h3", {
                ref: t,
                className: (0, a.cn)(
                  "text-2xl font-semibold leading-none tracking-tight",
                  e,
                ),
                ...r,
              }),
            );
            u.displayName = "CardTitle";
            let p = o.forwardRef(({ className: e, ...r }, t) =>
              (0, i.jsx)("p", {
                ref: t,
                className: (0, a.cn)("text-sm text-muted-foreground", e),
                ...r,
              }),
            );
            p.displayName = "CardDescription";
            let x = o.forwardRef(({ className: e, ...r }, t) =>
              (0, i.jsx)("div", {
                ref: t,
                className: (0, a.cn)("p-6 pt-0", e),
                ...r,
              }),
            );
            (x.displayName = "CardContent"),
              (o.forwardRef(({ className: e, ...r }, t) =>
                (0, i.jsx)("div", {
                  ref: t,
                  className: (0, a.cn)("flex items-center p-6 pt-0", e),
                  ...r,
                }),
              ).displayName = "CardFooter"),
              s();
          } catch (e) {
            s(e);
          }
        });
      },
      18676: (e, r, t) => {
        Promise.resolve().then(t.bind(t, 47350)),
          Promise.resolve().then(t.t.bind(t, 83793, 23));
      },
      19121: (e) => {
        "use strict";
        e.exports = require("next/dist/server/app-render/action-async-storage.external.js");
      },
      19771: (e) => {
        "use strict";
        e.exports = require("process");
      },
      20716: (e, r, t) => {
        "use strict";
        t.a(e, async (e, s) => {
          try {
            t.d(r, { cn: () => d, lk: () => c, p1: () => u });
            var i = t(85488),
              n = t(31399),
              o = t(63775),
              a = t(54710),
              l = e([i]);
            function d(...e) {
              return (0, a.QP)((0, o.$)(e));
            }
            function c() {
              return "undefined" != typeof crypto && crypto.randomUUID
                ? crypto.randomUUID()
                : "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
                    /[xy]/g,
                    function (e) {
                      let r = (16 * Math.random()) | 0;
                      return ("x" === e ? r : (3 & r) | 8).toString(16);
                    },
                  );
            }
            function u() {
              var e = (0, i.generateId)(12);
              let r = (0, n.uP)(10);
              return (0, n.Y8)(e, r);
            }
            (i = (l.then ? (await l)() : l)[0]), s();
          } catch (e) {
            s(e);
          }
        });
      },
      20884: (e, r, t) => {
        Promise.resolve().then(t.bind(t, 46376)),
          Promise.resolve().then(t.t.bind(t, 31655, 23));
      },
      21820: (e) => {
        "use strict";
        e.exports = require("os");
      },
      28354: (e) => {
        "use strict";
        e.exports = require("util");
      },
      29021: (e) => {
        "use strict";
        e.exports = require("fs");
      },
      29294: (e) => {
        "use strict";
        e.exports = require("next/dist/server/app-render/work-async-storage.external.js");
      },
      31293: (e, r, t) => {
        "use strict";
        t.d(r, { A: () => s });
        let s = (0, t(30980).A)("Calculator", [
          [
            "rect",
            {
              width: "16",
              height: "20",
              x: "4",
              y: "2",
              rx: "2",
              key: "1nb95v",
            },
          ],
          ["line", { x1: "8", x2: "16", y1: "6", y2: "6", key: "x4nwl0" }],
          ["line", { x1: "16", x2: "16", y1: "14", y2: "18", key: "wjye3r" }],
          ["path", { d: "M16 10h.01", key: "1m94wz" }],
          ["path", { d: "M12 10h.01", key: "1nrarc" }],
          ["path", { d: "M8 10h.01", key: "19clt8" }],
          ["path", { d: "M12 14h.01", key: "1etili" }],
          ["path", { d: "M8 14h.01", key: "6423bh" }],
          ["path", { d: "M12 18h.01", key: "mhygvu" }],
          ["path", { d: "M8 18h.01", key: "lrp35t" }],
        ]);
      },
      31421: (e) => {
        "use strict";
        e.exports = require("node:child_process");
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
      41692: (e) => {
        "use strict";
        e.exports = require("node:tls");
      },
      44708: (e) => {
        "use strict";
        e.exports = require("node:https");
      },
      46572: (e, r, t) => {
        "use strict";
        t.r(r),
          t.d(r, {
            GlobalError: () => n.default,
            __next_app__: () => c,
            pages: () => d,
            routeModule: () => u,
            tree: () => l,
          });
        var s = t(11610),
          i = t(51293),
          n = t(59059),
          o = t(17770),
          a = {};
        for (let e in o)
          0 >
            [
              "default",
              "tree",
              "pages",
              "GlobalError",
              "__next_app__",
              "routeModule",
            ].indexOf(e) && (a[e] = () => o[e]);
        t.d(r, a);
        let l = {
            children: [
              "",
              {
                children: [
                  "tools",
                  {
                    children: [
                      "__PAGE__",
                      {},
                      {
                        page: [
                          () => Promise.resolve().then(t.bind(t, 61953)),
                          "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\tools\\page.tsx",
                        ],
                      },
                    ],
                  },
                  {},
                ],
              },
              {
                layout: [
                  () => Promise.resolve().then(t.bind(t, 22630)),
                  "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\layout.tsx",
                ],
                error: [
                  () => Promise.resolve().then(t.bind(t, 94745)),
                  "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\error.tsx",
                ],
                "global-error": [
                  () => Promise.resolve().then(t.bind(t, 59059)),
                  "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\global-error.tsx",
                ],
                "not-found": [
                  () => Promise.resolve().then(t.bind(t, 53974)),
                  "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\not-found.tsx",
                ],
                forbidden: [
                  () => Promise.resolve().then(t.t.bind(t, 57382, 23)),
                  "next/dist/client/components/forbidden-error",
                ],
                unauthorized: [
                  () => Promise.resolve().then(t.t.bind(t, 87039, 23)),
                  "next/dist/client/components/unauthorized-error",
                ],
              },
            ],
          }.children,
          d = ["E:\\downloads\\Hijraah\\apps\\web\\src\\app\\tools\\page.tsx"],
          c = { require: t, loadChunk: () => Promise.resolve() },
          u = new s.AppPageRouteModule({
            definition: {
              kind: i.RouteKind.APP_PAGE,
              page: "/tools/page",
              pathname: "/tools",
              bundlePath: "",
              filename: "",
              appPaths: [],
            },
            userland: { loaderTree: l },
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
      61953: (e, r, t) => {
        "use strict";
        t.a(e, async (e, s) => {
          try {
            let f;
            t.r(r),
              t.d(r, {
                default: () => w,
                generateImageMetadata: () => v,
                generateMetadata: () => g,
                generateViewport: () => b,
              });
            var i = t(63033),
              n = t(35242),
              o = t(7609),
              a = t(31293),
              l = t(14664),
              d = t(83793),
              c = t.n(d),
              u = t(76475),
              p = t(14829),
              x = t(60442),
              h = e([u, p]);
            [u, p] = h.then ? (await h)() : h;
            let m = { ...i },
              y =
                "workUnitAsyncStorage" in m
                  ? m.workUnitAsyncStorage
                  : "requestAsyncStorage" in m
                    ? m.requestAsyncStorage
                    : void 0;
            f = new Proxy(
              function () {
                let e = [
                  {
                    title: "Eligibility Assessment",
                    description:
                      "Check if you qualify for various immigration programs",
                    icon: o.A,
                    href: "/tools/eligibility",
                  },
                  {
                    title: "Points Calculator",
                    description:
                      "Calculate your points for skilled immigration programs",
                    icon: a.A,
                    href: "/tools/points-calculator",
                  },
                  {
                    title: "Document Checklist",
                    description: "Generate a personalized document checklist",
                    icon: l.A,
                    href: "/tools/document-checklist",
                  },
                ];
                return (0, n.jsxs)("div", {
                  className: "container max-w-6xl py-12",
                  children: [
                    (0, n.jsxs)("div", {
                      className: "text-center mb-12",
                      children: [
                        (0, n.jsx)("h1", {
                          className: "text-4xl font-bold mb-4",
                          children: "Immigration Tools",
                        }),
                        (0, n.jsx)("p", {
                          className: "text-lg text-muted-foreground",
                          children:
                            "Use our comprehensive tools to assess your immigration eligibility and requirements",
                        }),
                      ],
                    }),
                    (0, n.jsx)("div", {
                      className: "grid md:grid-cols-3 gap-6",
                      children: e.map((e) =>
                        (0, n.jsx)(
                          p.Zp,
                          {
                            className: "p-6 hover:shadow-lg transition-shadow",
                            children: (0, n.jsxs)("div", {
                              className:
                                "flex flex-col items-center text-center space-y-4",
                              children: [
                                (0, n.jsx)("div", {
                                  className: "p-3 bg-primary/10 rounded-full",
                                  children: (0, n.jsx)(e.icon, {
                                    className: "w-8 h-8 text-primary",
                                  }),
                                }),
                                (0, n.jsx)("h2", {
                                  className: "text-xl font-semibold",
                                  children: e.title,
                                }),
                                (0, n.jsx)("p", {
                                  className: "text-muted-foreground",
                                  children: e.description,
                                }),
                                (0, n.jsx)(u.$, {
                                  asChild: !0,
                                  className: "w-full mt-4",
                                  children: (0, n.jsx)(c(), {
                                    href: e.href,
                                    children: "Get Started",
                                  }),
                                }),
                              ],
                            }),
                          },
                          e.title,
                        ),
                      ),
                    }),
                  ],
                });
              },
              {
                apply: (e, r, t) => {
                  let s, i, n;
                  try {
                    let e = y?.getStore();
                    (s = e?.headers.get("sentry-trace") ?? void 0),
                      (i = e?.headers.get("baggage") ?? void 0),
                      (n = e?.headers);
                  } catch (e) {}
                  return x
                    .wrapServerComponentWithSentry(e, {
                      componentRoute: "/tools",
                      componentType: "Page",
                      sentryTraceHeader: s,
                      baggageHeader: i,
                      headers: n,
                    })
                    .apply(r, t);
                },
              },
            );
            let g = void 0,
              v = void 0,
              b = void 0,
              w = f;
            s();
          } catch (e) {
            s(e);
          }
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
      76475: (e, r, t) => {
        "use strict";
        t.a(e, async (e, s) => {
          try {
            t.d(r, { $: () => d });
            var i = t(35242),
              n = t(94316),
              o = t(84101);
            t(84147);
            var a = t(20716),
              l = e([a]);
            a = (l.then ? (await l)() : l)[0];
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
              variant: r,
              size: t,
              asChild: s = !1,
              ...o
            }) {
              let l = s ? n.DX : "button";
              return (0, i.jsx)(l, {
                "data-slot": "button",
                className: (0, a.cn)(c({ variant: r, size: t, className: e })),
                ...o,
              });
            }
            s();
          } catch (e) {
            s(e);
          }
        });
      },
      76760: (e) => {
        "use strict";
        e.exports = require("node:path");
      },
      77030: (e) => {
        "use strict";
        e.exports = require("node:net");
      },
      77598: (e) => {
        "use strict";
        e.exports = require("node:crypto");
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
      83793: (e, r, t) => {
        let { createProxy: s } = t(85493);
        e.exports = s(
          "E:\\downloads\\Hijraah\\node_modules\\.pnpm\\next@15.3.0-canary.31_@babe_be67f368de2727c847f3a61f5e6cf4fa\\node_modules\\next\\dist\\client\\app-dir\\link.js",
        );
      },
      83997: (e) => {
        "use strict";
        e.exports = require("tty");
      },
      84101: (e, r, t) => {
        "use strict";
        t.d(r, { F: () => o });
        var s = t(63775);
        let i = (e) => ("boolean" == typeof e ? `${e}` : 0 === e ? "0" : e),
          n = s.$,
          o = (e, r) => (t) => {
            var s;
            if ((null == r ? void 0 : r.variants) == null)
              return n(
                e,
                null == t ? void 0 : t.class,
                null == t ? void 0 : t.className,
              );
            let { variants: o, defaultVariants: a } = r,
              l = Object.keys(o).map((e) => {
                let r = null == t ? void 0 : t[e],
                  s = null == a ? void 0 : a[e];
                if (null === r) return null;
                let n = i(r) || i(s);
                return o[e][n];
              }),
              d =
                t &&
                Object.entries(t).reduce((e, r) => {
                  let [t, s] = r;
                  return void 0 === s || (e[t] = s), e;
                }, {});
            return n(
              e,
              l,
              null == r || null == (s = r.compoundVariants)
                ? void 0
                : s.reduce((e, r) => {
                    let { class: t, className: s, ...i } = r;
                    return Object.entries(i).every((e) => {
                      let [r, t] = e;
                      return Array.isArray(t)
                        ? t.includes({ ...a, ...d }[r])
                        : { ...a, ...d }[r] === t;
                    })
                      ? [...e, t, s]
                      : e;
                  }, []),
              null == t ? void 0 : t.class,
              null == t ? void 0 : t.className,
            );
          };
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
      94316: (e, r, t) => {
        "use strict";
        t.d(r, { DX: () => o });
        var s = t(84147);
        function i(e, r) {
          if ("function" == typeof e) return e(r);
          null != e && (e.current = r);
        }
        var n = t(35242),
          o = (function (e) {
            let r = (function (e) {
                let r = s.forwardRef((e, r) => {
                  let { children: t, ...n } = e;
                  if (s.isValidElement(t)) {
                    var o;
                    let e,
                      a,
                      l =
                        ((o = t),
                        (a =
                          (e = Object.getOwnPropertyDescriptor(
                            o.props,
                            "ref",
                          )?.get) &&
                          "isReactWarning" in e &&
                          e.isReactWarning)
                          ? o.ref
                          : (a =
                                (e = Object.getOwnPropertyDescriptor(
                                  o,
                                  "ref",
                                )?.get) &&
                                "isReactWarning" in e &&
                                e.isReactWarning)
                            ? o.props.ref
                            : o.props.ref || o.ref),
                      d = (function (e, r) {
                        let t = { ...r };
                        for (let s in r) {
                          let i = e[s],
                            n = r[s];
                          /^on[A-Z]/.test(s)
                            ? i && n
                              ? (t[s] = (...e) => {
                                  let r = n(...e);
                                  return i(...e), r;
                                })
                              : i && (t[s] = i)
                            : "style" === s
                              ? (t[s] = { ...i, ...n })
                              : "className" === s &&
                                (t[s] = [i, n].filter(Boolean).join(" "));
                        }
                        return { ...e, ...t };
                      })(n, t.props);
                    return (
                      t.type !== s.Fragment &&
                        (d.ref = r
                          ? (function (...e) {
                              return (r) => {
                                let t = !1,
                                  s = e.map((e) => {
                                    let s = i(e, r);
                                    return (
                                      t || "function" != typeof s || (t = !0), s
                                    );
                                  });
                                if (t)
                                  return () => {
                                    for (let r = 0; r < s.length; r++) {
                                      let t = s[r];
                                      "function" == typeof t
                                        ? t()
                                        : i(e[r], null);
                                    }
                                  };
                              };
                            })(r, l)
                          : l),
                      s.cloneElement(t, d)
                    );
                  }
                  return s.Children.count(t) > 1 ? s.Children.only(null) : null;
                });
                return (r.displayName = `${e}.SlotClone`), r;
              })(e),
              t = s.forwardRef((e, t) => {
                let { children: i, ...o } = e,
                  a = s.Children.toArray(i),
                  d = a.find(l);
                if (d) {
                  let e = d.props.children,
                    i = a.map((r) =>
                      r !== d
                        ? r
                        : s.Children.count(e) > 1
                          ? s.Children.only(null)
                          : s.isValidElement(e)
                            ? e.props.children
                            : null,
                    );
                  return (0, n.jsx)(r, {
                    ...o,
                    ref: t,
                    children: s.isValidElement(e)
                      ? s.cloneElement(e, void 0, i)
                      : null,
                  });
                }
                return (0, n.jsx)(r, { ...o, ref: t, children: i });
              });
            return (t.displayName = `${e}.Slot`), t;
          })("Slot"),
          a = Symbol("radix.slottable");
        function l(e) {
          return (
            s.isValidElement(e) &&
            "function" == typeof e.type &&
            "__radixId" in e.type &&
            e.type.__radixId === a
          );
        }
      },
      94735: (e) => {
        "use strict";
        e.exports = require("events");
      },
    });
  var r = require("../../webpack-runtime.js");
  r.C(e);
  var t = (e) => r((r.s = e)),
    s = r.X(0, [827, 6518, 2033, 4027, 1655, 5728, 4990, 4292, 4630], () =>
      t(46572),
    );
  module.exports = s;
})();
//# sourceMappingURL=page.js.map
