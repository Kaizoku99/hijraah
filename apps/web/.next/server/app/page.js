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
    (e._sentryDebugIds[t] = "0762f604-64ed-4108-bbd0-3ff4c3c6495d"),
    (e._sentryDebugIdIdentifier =
      "sentry-dbid-0762f604-64ed-4108-bbd0-3ff4c3c6495d"));
} catch (e) {}
(() => {
  var e = {};
  (e.id = 8974),
    (e.ids = [8974]),
    (e.modules = {
      3295: (e) => {
        "use strict";
        e.exports = require("next/dist/server/app-render/after-task-async-storage.external.js");
      },
      8086: (e) => {
        "use strict";
        e.exports = require("module");
      },
      10846: (e) => {
        "use strict";
        e.exports = require("next/dist/compiled/next-server/app-page.runtime.prod.js");
      },
      12698: (e, t, r) => {
        "use strict";
        r.d(t, { A: () => s });
        let s = (0, r(30980).A)("User", [
          [
            "path",
            { d: "M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2", key: "975kel" },
          ],
          ["circle", { cx: "12", cy: "7", r: "4", key: "17ys0d" }],
        ]);
      },
      13006: (e, t, r) => {
        "use strict";
        r.d(t, { A: () => s });
        let s = (0, r(30980).A)("LineChart", [
          ["path", { d: "M3 3v18h18", key: "1s2lah" }],
          ["path", { d: "m19 9-5 5-4-4-3 3", key: "2osh9i" }],
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
      20716: (e, t, r) => {
        "use strict";
        r.a(e, async (e, s) => {
          try {
            r.d(t, { cn: () => d, lk: () => c, p1: () => u });
            var i = r(85488),
              a = r(31399),
              l = r(63775),
              n = r(54710),
              o = e([i]);
            function d(...e) {
              return (0, n.QP)((0, l.$)(e));
            }
            function c() {
              return "undefined" != typeof crypto && crypto.randomUUID
                ? crypto.randomUUID()
                : "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
                    /[xy]/g,
                    function (e) {
                      let t = (16 * Math.random()) | 0;
                      return ("x" === e ? t : (3 & t) | 8).toString(16);
                    },
                  );
            }
            function u() {
              var e = (0, i.generateId)(12);
              let t = (0, a.uP)(10);
              return (0, a.Y8)(e, t);
            }
            (i = (o.then ? (await o)() : o)[0]), s();
          } catch (e) {
            s(e);
          }
        });
      },
      21820: (e) => {
        "use strict";
        e.exports = require("os");
      },
      28354: (e) => {
        "use strict";
        e.exports = require("util");
      },
      28964: (e, t, r) => {
        "use strict";
        r.d(t, { IB: () => s, Wk: () => n, XG: () => l, q: () => i });
        let s = ["en", "ar", "es", "fr"],
          i = "en",
          a = {
            en: {
              nativeName: "English",
              englishName: "English",
              direction: "ltr",
              dateFormat: "MM/DD/YYYY",
              flag: "\uD83C\uDDFA\uD83C\uDDF8",
              htmlLang: "en",
              calendar: "gregory",
              number: { decimal: ".", thousands: "," },
            },
            ar: {
              nativeName: "العربية",
              englishName: "Arabic",
              direction: "rtl",
              dateFormat: "DD/MM/YYYY",
              flag: "\uD83C\uDDF8\uD83C\uDDE6",
              htmlLang: "ar",
              calendar: "islamic",
              fontClass: "font-arabic",
              number: { decimal: "٫", thousands: "٬" },
            },
            fr: {
              nativeName: "Fran\xe7ais",
              englishName: "French",
              direction: "ltr",
              dateFormat: "DD/MM/YYYY",
              flag: "\uD83C\uDDEB\uD83C\uDDF7",
              htmlLang: "fr",
              calendar: "gregory",
              number: { decimal: ",", thousands: " " },
            },
            es: {
              nativeName: "Espa\xf1ol",
              englishName: "Spanish",
              direction: "ltr",
              dateFormat: "DD/MM/YYYY",
              flag: "\uD83C\uDDEA\uD83C\uDDF8",
              htmlLang: "es",
              calendar: "gregory",
              number: { decimal: ",", thousands: "." },
            },
          };
        function l(e) {
          return a[e] || a[i];
        }
        function n(e) {
          return l(e).fontClass;
        }
      },
      29021: (e) => {
        "use strict";
        e.exports = require("fs");
      },
      29294: (e) => {
        "use strict";
        e.exports = require("next/dist/server/app-render/work-async-storage.external.js");
      },
      30980: (e, t, r) => {
        "use strict";
        r.d(t, { A: () => l });
        var s = r(84147),
          i = {
            xmlns: "http://www.w3.org/2000/svg",
            width: 24,
            height: 24,
            viewBox: "0 0 24 24",
            fill: "none",
            stroke: "currentColor",
            strokeWidth: 2,
            strokeLinecap: "round",
            strokeLinejoin: "round",
          };
        let a = (e) =>
            e
              .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
              .toLowerCase()
              .trim(),
          l = (e, t) => {
            let r = (0, s.forwardRef)(
              (
                {
                  color: r = "currentColor",
                  size: l = 24,
                  strokeWidth: n = 2,
                  absoluteStrokeWidth: o,
                  className: d = "",
                  children: c,
                  ...u
                },
                m,
              ) =>
                (0, s.createElement)(
                  "svg",
                  {
                    ref: m,
                    ...i,
                    width: l,
                    height: l,
                    stroke: r,
                    strokeWidth: o ? (24 * Number(n)) / Number(l) : n,
                    className: ["lucide", `lucide-${a(e)}`, d].join(" "),
                    ...u,
                  },
                  [
                    ...t.map(([e, t]) => (0, s.createElement)(e, t)),
                    ...(Array.isArray(c) ? c : [c]),
                  ],
                ),
            );
            return (r.displayName = `${e}`), r;
          };
      },
      31421: (e) => {
        "use strict";
        e.exports = require("node:child_process");
      },
      32064: (e, t, r) => {
        "use strict";
        r.d(t, { A: () => s });
        let s = (0, r(30980).A)("MessageSquare", [
          [
            "path",
            {
              d: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z",
              key: "1lielz",
            },
          ],
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
      41692: (e) => {
        "use strict";
        e.exports = require("node:tls");
      },
      44708: (e) => {
        "use strict";
        e.exports = require("node:https");
      },
      48161: (e) => {
        "use strict";
        e.exports = require("node:os");
      },
      49075: (e, t, r) => {
        Promise.resolve().then(r.t.bind(r, 31655, 23));
      },
      53053: (e) => {
        "use strict";
        e.exports = require("node:diagnostics_channel");
      },
      53144: (e, t, r) => {
        "use strict";
        r.r(t),
          r.d(t, {
            GlobalError: () => a.default,
            __next_app__: () => c,
            pages: () => d,
            routeModule: () => u,
            tree: () => o,
          });
        var s = r(11610),
          i = r(51293),
          a = r(59059),
          l = r(17770),
          n = {};
        for (let e in l)
          0 >
            [
              "default",
              "tree",
              "pages",
              "GlobalError",
              "__next_app__",
              "routeModule",
            ].indexOf(e) && (n[e] = () => l[e]);
        r.d(t, n);
        let o = [
            "",
            {
              children: [
                "__PAGE__",
                {},
                {
                  page: [
                    () => Promise.resolve().then(r.bind(r, 91677)),
                    "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\page.tsx",
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
          d = ["E:\\downloads\\Hijraah\\apps\\web\\src\\app\\page.tsx"],
          c = { require: r, loadChunk: () => Promise.resolve() },
          u = new s.AppPageRouteModule({
            definition: {
              kind: i.RouteKind.APP_PAGE,
              page: "/page",
              pathname: "/",
              bundlePath: "",
              filename: "",
              appPaths: [],
            },
            userland: { loaderTree: o },
          });
      },
      55511: (e) => {
        "use strict";
        e.exports = require("crypto");
      },
      57075: (e) => {
        "use strict";
        e.exports = require("node:stream");
      },
      57846: (e, t, r) => {
        "use strict";
        r.d(t, { A: () => s });
        let s = (0, r(30980).A)("CheckCircle", [
          ["path", { d: "M22 11.08V12a10 10 0 1 1-5.93-9.14", key: "g774vq" }],
          ["path", { d: "m9 11 3 3L22 4", key: "1pflzl" }],
        ]);
      },
      57975: (e) => {
        "use strict";
        e.exports = require("node:util");
      },
      60884: (e, t, r) => {
        "use strict";
        r.d(t, { A: () => s });
        let s = (0, r(30980).A)("Shield", [
          [
            "path",
            {
              d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
              key: "oel41y",
            },
          ],
        ]);
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
      75117: (e, t, r) => {
        "use strict";
        r.d(t, { A: () => s });
        let s = (0, r(30980).A)("Search", [
          ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }],
          ["path", { d: "m21 21-4.3-4.3", key: "1qie3q" }],
        ]);
      },
      75919: (e) => {
        "use strict";
        e.exports = require("node:worker_threads");
      },
      76475: (e, t, r) => {
        "use strict";
        r.a(e, async (e, s) => {
          try {
            r.d(t, { $: () => d });
            var i = r(35242),
              a = r(94316),
              l = r(84101);
            r(84147);
            var n = r(20716),
              o = e([n]);
            n = (o.then ? (await o)() : o)[0];
            let c = (0, l.F)(
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
              variant: t,
              size: r,
              asChild: s = !1,
              ...l
            }) {
              let o = s ? a.DX : "button";
              return (0, i.jsx)(o, {
                "data-slot": "button",
                className: (0, n.cn)(c({ variant: t, size: r, className: e })),
                ...l,
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
      79423: (e, t, r) => {
        "use strict";
        r.d(t, { A: () => s });
        let s = (0, r(30980).A)("Clock", [
          ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
          ["polyline", { points: "12 6 12 12 16 14", key: "68esgv" }],
        ]);
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
      83793: (e, t, r) => {
        let { createProxy: s } = r(85493);
        e.exports = s(
          "E:\\downloads\\Hijraah\\node_modules\\.pnpm\\next@15.3.0-canary.31_@babe_be67f368de2727c847f3a61f5e6cf4fa\\node_modules\\next\\dist\\client\\app-dir\\link.js",
        );
      },
      83997: (e) => {
        "use strict";
        e.exports = require("tty");
      },
      84101: (e, t, r) => {
        "use strict";
        r.d(t, { F: () => l });
        var s = r(63775);
        let i = (e) => ("boolean" == typeof e ? `${e}` : 0 === e ? "0" : e),
          a = s.$,
          l = (e, t) => (r) => {
            var s;
            if ((null == t ? void 0 : t.variants) == null)
              return a(
                e,
                null == r ? void 0 : r.class,
                null == r ? void 0 : r.className,
              );
            let { variants: l, defaultVariants: n } = t,
              o = Object.keys(l).map((e) => {
                let t = null == r ? void 0 : r[e],
                  s = null == n ? void 0 : n[e];
                if (null === t) return null;
                let a = i(t) || i(s);
                return l[e][a];
              }),
              d =
                r &&
                Object.entries(r).reduce((e, t) => {
                  let [r, s] = t;
                  return void 0 === s || (e[r] = s), e;
                }, {});
            return a(
              e,
              o,
              null == t || null == (s = t.compoundVariants)
                ? void 0
                : s.reduce((e, t) => {
                    let { class: r, className: s, ...i } = t;
                    return Object.entries(i).every((e) => {
                      let [t, r] = e;
                      return Array.isArray(r)
                        ? r.includes({ ...n, ...d }[t])
                        : { ...n, ...d }[t] === r;
                    })
                      ? [...e, r, s]
                      : e;
                  }, []),
              null == r ? void 0 : r.class,
              null == r ? void 0 : r.className,
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
      88987: (e, t, r) => {
        Promise.resolve().then(r.t.bind(r, 83793, 23));
      },
      90279: (e, t, r) => {
        "use strict";
        r.d(t, { A: () => s });
        let s = (0, r(30980).A)("ArrowRight", [
          ["path", { d: "M5 12h14", key: "1ays0h" }],
          ["path", { d: "m12 5 7 7-7 7", key: "xquz4c" }],
        ]);
      },
      91677: (e, t, r) => {
        "use strict";
        r.a(e, async (e, s) => {
          try {
            let j;
            r.r(t),
              r.d(t, {
                Home: () => y,
                default: () => _,
                generateImageMetadata: () => A,
                generateMetadata: () => N,
                generateViewport: () => q,
              });
            var i = r(63033),
              a = r(35242),
              l = r(32064),
              n = r(90279),
              o = r(13006),
              d = r(60884),
              c = r(79423),
              u = r(12698),
              m = r(75117),
              x = r(57846),
              h = r(83793),
              p = r.n(h),
              b = r(76475),
              g = r(28964),
              f = r(60442),
              v = e([b]);
            function y({ locale: e = g.q } = {}) {
              let t = `/${e}`;
              return (0, a.jsxs)(a.Fragment, {
                children: [
                  (0, a.jsxs)("section", {
                    className:
                      "relative overflow-hidden bg-gradient-to-b from-blue-900 via-blue-800 to-blue-700 dark:from-gray-950 dark:via-gray-900 dark:to-gray-800 py-16 md:py-20 lg:py-24",
                    children: [
                      (0, a.jsxs)("div", {
                        className: "absolute inset-0 opacity-10",
                        children: [
                          (0, a.jsx)("div", {
                            className:
                              "absolute -top-24 -left-24 w-96 h-96 rounded-full bg-blue-500 filter blur-3xl",
                          }),
                          (0, a.jsx)("div", {
                            className:
                              "absolute top-1/2 right-0 w-80 h-80 rounded-full bg-indigo-500 filter blur-3xl",
                          }),
                          (0, a.jsx)("div", {
                            className:
                              "absolute bottom-0 left-1/4 w-60 h-60 rounded-full bg-sky-500 filter blur-3xl",
                          }),
                        ],
                      }),
                      (0, a.jsx)("div", {
                        className:
                          "max-w-7xl mx-auto relative z-10 px-4 sm:px-6 lg:px-8",
                        children: (0, a.jsxs)("div", {
                          className:
                            "grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center",
                          children: [
                            (0, a.jsxs)("div", {
                              className: "text-left",
                              children: [
                                (0, a.jsx)("div", {
                                  className:
                                    "inline-block px-3 py-1 mb-4 md:mb-6 text-sm font-medium rounded-full bg-blue-500/20 text-blue-200 dark:bg-blue-800/30 dark:text-blue-200",
                                  children: "Simplified Immigration Solutions",
                                }),
                                (0, a.jsxs)("h1", {
                                  className:
                                    "text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white mb-4 md:mb-6 leading-tight",
                                  children: [
                                    "Navigate Your Immigration Journey with",
                                    " ",
                                    (0, a.jsxs)("span", {
                                      className:
                                        "text-blue-300 dark:text-blue-300 relative",
                                      children: [
                                        "AI Guidance",
                                        (0, a.jsx)("span", {
                                          className:
                                            "absolute bottom-0 left-0 w-full h-1 bg-blue-400 rounded-full",
                                        }),
                                      ],
                                    }),
                                  ],
                                }),
                                (0, a.jsx)("p", {
                                  className:
                                    "text-lg md:text-xl text-blue-100 dark:text-blue-100 mb-6 md:mb-8 leading-relaxed",
                                  children:
                                    "Get instant, personalized immigration assistance powered by AI. From eligibility assessment to document preparation, we're here to help 24/7.",
                                }),
                                (0, a.jsxs)("div", {
                                  className: "flex flex-col sm:flex-row gap-4",
                                  children: [
                                    (0, a.jsx)(b.$, {
                                      asChild: !0,
                                      size: "lg",
                                      className:
                                        "text-lg font-medium bg-white text-blue-700 hover:bg-blue-50 dark:bg-blue-100 dark:text-blue-900 dark:hover:bg-blue-200 transition-all duration-200",
                                      children: (0, a.jsx)(p(), {
                                        href: `${t}/chat`,
                                        className: "flex items-center",
                                        legacyBehavior: !0,
                                        children: (0, a.jsxs)("a", {
                                          children: [
                                            "Start Chat ",
                                            (0, a.jsx)(l.A, {
                                              className: "ml-2 h-5 w-5",
                                            }),
                                          ],
                                        }),
                                      }),
                                    }),
                                    (0, a.jsx)(b.$, {
                                      asChild: !0,
                                      size: "lg",
                                      variant: "outline",
                                      className:
                                        "text-lg font-medium border-white text-white hover:bg-white/10 dark:border-blue-300 dark:text-blue-300 dark:hover:bg-blue-900/50 transition-all duration-200",
                                      children: (0, a.jsxs)(p(), {
                                        href: `${t}/assessment`,
                                        className: "flex items-center",
                                        legacyBehavior: !0,
                                        children: [
                                          "Check Eligibility ",
                                          (0, a.jsx)(n.A, {
                                            className: "ml-2 h-5 w-5",
                                          }),
                                        ],
                                      }),
                                    }),
                                  ],
                                }),
                                (0, a.jsx)("div", {
                                  className: "mt-6 flex justify-start",
                                  children: (0, a.jsx)(b.$, {
                                    asChild: !0,
                                    variant: "link",
                                    className: "text-blue-200 hover:text-white",
                                    children: (0, a.jsxs)(p(), {
                                      href: `${t}/dashboard`,
                                      className: "flex items-center",
                                      legacyBehavior: !0,
                                      children: [
                                        (0, a.jsx)(o.A, {
                                          className: "mr-2 h-4 w-4",
                                        }),
                                        " Existing users? Go to Dashboard",
                                      ],
                                    }),
                                  }),
                                }),
                                (0, a.jsxs)("div", {
                                  className: "mt-6 md:mt-8 flex items-center",
                                  children: [
                                    (0, a.jsx)("div", {
                                      className: "flex -space-x-2",
                                      children: [1, 2, 3, 4].map((e) =>
                                        (0, a.jsx)(
                                          "div",
                                          {
                                            className:
                                              "w-8 h-8 rounded-full bg-gray-200 border-2 border-white dark:bg-gray-700 dark:border-blue-900",
                                          },
                                          e,
                                        ),
                                      ),
                                    }),
                                    (0, a.jsxs)("p", {
                                      className: "ml-4 text-sm text-blue-100",
                                      children: [
                                        (0, a.jsx)("span", {
                                          className: "font-medium",
                                          children: "5,000+",
                                        }),
                                        " successful immigration journeys",
                                      ],
                                    }),
                                  ],
                                }),
                              ],
                            }),
                            (0, a.jsx)("div", {
                              className: "hidden lg:block relative",
                              children: (0, a.jsxs)("div", {
                                className:
                                  "w-full h-[500px] relative bg-gradient-to-tr from-blue-400/20 to-blue-600/20 rounded-lg backdrop-blur-sm p-6 border border-white/10",
                                children: [
                                  (0, a.jsx)("div", {
                                    className:
                                      "absolute -right-6 -top-6 w-20 h-20 rounded-full bg-blue-500/30 backdrop-blur-xl",
                                  }),
                                  (0, a.jsx)("div", {
                                    className:
                                      "absolute -left-6 -bottom-6 w-16 h-16 rounded-full bg-indigo-500/30 backdrop-blur-xl",
                                  }),
                                  (0, a.jsxs)("div", {
                                    className:
                                      "h-full w-full rounded-md bg-white/5 backdrop-blur-sm border border-white/10 p-4 flex flex-col",
                                    children: [
                                      (0, a.jsx)("div", {
                                        className:
                                          "h-10 w-full bg-blue-900/40 rounded-md mb-4 flex items-center px-4",
                                        children: (0, a.jsxs)("div", {
                                          className: "flex space-x-2",
                                          children: [
                                            (0, a.jsx)("div", {
                                              className:
                                                "w-3 h-3 rounded-full bg-red-400",
                                            }),
                                            (0, a.jsx)("div", {
                                              className:
                                                "w-3 h-3 rounded-full bg-yellow-400",
                                            }),
                                            (0, a.jsx)("div", {
                                              className:
                                                "w-3 h-3 rounded-full bg-green-400",
                                            }),
                                          ],
                                        }),
                                      }),
                                      (0, a.jsxs)("div", {
                                        className:
                                          "flex-1 bg-blue-900/30 rounded-md p-4 backdrop-blur-sm",
                                        children: [
                                          (0, a.jsxs)("div", {
                                            className: "flex items-start mb-4",
                                            children: [
                                              (0, a.jsx)("div", {
                                                className:
                                                  "w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center mr-3 flex-shrink-0",
                                                children: (0, a.jsx)(l.A, {
                                                  className:
                                                    "h-4 w-4 text-white",
                                                }),
                                              }),
                                              (0, a.jsx)("div", {
                                                className:
                                                  "bg-blue-800/40 p-3 rounded-lg rounded-tl-none",
                                                children: (0, a.jsx)("p", {
                                                  className:
                                                    "text-sm text-blue-100",
                                                  children:
                                                    "How do I apply for a work visa in Canada?",
                                                }),
                                              }),
                                            ],
                                          }),
                                          (0, a.jsxs)("div", {
                                            className: "flex items-start mb-4",
                                            children: [
                                              (0, a.jsx)("div", {
                                                className:
                                                  "w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center mr-3 flex-shrink-0",
                                                children: (0, a.jsx)("svg", {
                                                  className:
                                                    "h-4 w-4 text-white",
                                                  fill: "currentColor",
                                                  viewBox: "0 0 24 24",
                                                  children: (0, a.jsx)("path", {
                                                    d: "M12 2a10 10 0 1 0 10 10A10.011 10.011 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8.01 8.01 0 0 1-8 8zm-1-5h2v2h-2zm0-8h2v6h-2z",
                                                  }),
                                                }),
                                              }),
                                              (0, a.jsx)("div", {
                                                className:
                                                  "bg-indigo-800/40 p-3 rounded-lg rounded-tl-none",
                                                children: (0, a.jsxs)("p", {
                                                  className:
                                                    "text-sm text-blue-100",
                                                  children: [
                                                    "To apply for a work visa in Canada, you'll need to:",
                                                    (0, a.jsx)("br", {}),
                                                    (0, a.jsx)("br", {}),
                                                    "1. Get a job offer from a Canadian employer",
                                                    (0, a.jsx)("br", {}),
                                                    "2. The employer must obtain an LMIA",
                                                    (0, a.jsx)("br", {}),
                                                    "3. Apply for a work permit",
                                                  ],
                                                }),
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
                          ],
                        }),
                      }),
                    ],
                  }),
                  (0, a.jsx)("section", {
                    className:
                      "py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900",
                    children: (0, a.jsxs)("div", {
                      className: "max-w-7xl mx-auto",
                      children: [
                        (0, a.jsxs)("div", {
                          className: "text-center mb-10 md:mb-12",
                          children: [
                            (0, a.jsx)("span", {
                              className:
                                "inline-block px-3 py-1 text-sm font-medium rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300 mb-3 md:mb-4",
                              children: "Why Choose Hijraah",
                            }),
                            (0, a.jsx)("h2", {
                              className:
                                "text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white",
                              children: "Simplify Your Immigration Process",
                            }),
                          ],
                        }),
                        (0, a.jsx)("div", {
                          className:
                            "grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8",
                          children: [
                            {
                              icon: l.A,
                              title: "24/7 AI Support",
                              description:
                                "Get instant answers to your immigration questions anytime, anywhere.",
                            },
                            {
                              icon: d.A,
                              title: "Expert Guidance",
                              description:
                                "Receive accurate, up-to-date immigration advice based on official guidelines.",
                            },
                            {
                              icon: c.A,
                              title: "Time-Saving Tools",
                              description:
                                "Streamline your application process with our document checklist and timeline planner.",
                            },
                          ].map((e, t) =>
                            (0, a.jsxs)(
                              "div",
                              {
                                className:
                                  "p-6 md:p-8 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50 hover:shadow-lg hover:border-blue-200 dark:hover:border-blue-900 transition-all",
                                children: [
                                  (0, a.jsx)("div", {
                                    className:
                                      "w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center mb-4 md:mb-6",
                                    children: (0, a.jsx)(e.icon, {
                                      className:
                                        "h-6 w-6 text-blue-600 dark:text-blue-400",
                                    }),
                                  }),
                                  (0, a.jsx)("h3", {
                                    className:
                                      "text-xl font-semibold mb-2 md:mb-3 text-gray-900 dark:text-white",
                                    children: e.title,
                                  }),
                                  (0, a.jsx)("p", {
                                    className:
                                      "text-gray-600 dark:text-gray-300",
                                    children: e.description,
                                  }),
                                ],
                              },
                              t,
                            ),
                          ),
                        }),
                      ],
                    }),
                  }),
                  (0, a.jsx)("section", {
                    className:
                      "py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-800",
                    children: (0, a.jsxs)("div", {
                      className: "max-w-7xl mx-auto",
                      children: [
                        (0, a.jsxs)("div", {
                          className: "text-center mb-10 md:mb-12",
                          children: [
                            (0, a.jsx)("span", {
                              className:
                                "inline-block px-3 py-1 text-sm font-medium rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300 mb-3 md:mb-4",
                              children: "Process",
                            }),
                            (0, a.jsx)("h2", {
                              className:
                                "text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white",
                              children: "How It Works",
                            }),
                          ],
                        }),
                        (0, a.jsxs)("div", {
                          className: "relative",
                          children: [
                            (0, a.jsx)("div", {
                              className:
                                "absolute top-1/2 left-0 right-0 h-1 bg-blue-200 dark:bg-blue-900 transform -translate-y-1/2 hidden md:block",
                            }),
                            (0, a.jsx)("div", {
                              className:
                                "grid grid-cols-1 md:grid-cols-4 gap-8 relative",
                              children: [
                                {
                                  step: "1",
                                  title: "Create Account",
                                  description:
                                    "Sign up in seconds with email or Google",
                                  icon: u.A,
                                },
                                {
                                  step: "2",
                                  title: "Assessment",
                                  description:
                                    "Complete our eligibility assessment",
                                  icon: m.A,
                                },
                                {
                                  step: "3",
                                  title: "Get Guidance",
                                  description:
                                    "Receive personalized immigration advice",
                                  icon: l.A,
                                },
                                {
                                  step: "4",
                                  title: "Track Progress",
                                  description:
                                    "Monitor your immigration journey",
                                  icon: x.A,
                                },
                              ].map((e, t) =>
                                (0, a.jsxs)(
                                  "div",
                                  {
                                    className: "text-center relative",
                                    children: [
                                      (0, a.jsx)("div", {
                                        className:
                                          "w-16 h-16 rounded-full bg-blue-600 text-white flex items-center justify-center mx-auto mb-4 md:mb-6 text-xl font-bold relative z-10 border-4 border-white dark:border-gray-800",
                                        children: e.step,
                                      }),
                                      (0, a.jsx)("h3", {
                                        className:
                                          "text-xl font-semibold mb-2 md:mb-3 text-gray-900 dark:text-white",
                                        children: e.title,
                                      }),
                                      (0, a.jsx)("p", {
                                        className:
                                          "text-gray-600 dark:text-gray-300",
                                        children: e.description,
                                      }),
                                    ],
                                  },
                                  t,
                                ),
                              ),
                            }),
                          ],
                        }),
                      ],
                    }),
                  }),
                  (0, a.jsxs)("section", {
                    className:
                      "py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-indigo-700 dark:from-blue-800 dark:to-indigo-900 relative overflow-hidden",
                    children: [
                      (0, a.jsx)("div", {
                        className: "absolute inset-0 opacity-10",
                        children: (0, a.jsx)("div", {
                          className:
                            "absolute top-0 left-0 w-full h-full bg-[url('/patterns/pattern.svg')] bg-repeat opacity-20",
                        }),
                      }),
                      (0, a.jsxs)("div", {
                        className:
                          "max-w-4xl mx-auto text-center relative z-10",
                        children: [
                          (0, a.jsx)("span", {
                            className:
                              "inline-block px-3 py-1 text-sm font-medium rounded-full bg-white/20 text-white mb-4 md:mb-6",
                            children: "Get Started Today",
                          }),
                          (0, a.jsx)("h2", {
                            className:
                              "text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4 md:mb-6",
                            children:
                              "Ready to Start Your Immigration Journey?",
                          }),
                          (0, a.jsx)("p", {
                            className:
                              "text-lg md:text-xl text-blue-100 mb-6 md:mb-8 max-w-2xl mx-auto",
                            children:
                              "Join thousands of others who have simplified their immigration process with Hijraah. Our AI-powered platform provides guidance every step of the way.",
                          }),
                          (0, a.jsxs)("div", {
                            className:
                              "flex flex-col sm:flex-row gap-4 justify-center",
                            children: [
                              (0, a.jsx)(b.$, {
                                asChild: !0,
                                size: "lg",
                                variant: "secondary",
                                className:
                                  "text-lg font-medium bg-white text-blue-700 hover:bg-blue-50 transition-all duration-200",
                                children: (0, a.jsxs)(p(), {
                                  href: `${t}/signup`,
                                  className: "flex items-center",
                                  legacyBehavior: !0,
                                  children: [
                                    "Get Started ",
                                    (0, a.jsx)(n.A, {
                                      className: "ml-2 h-5 w-5",
                                    }),
                                  ],
                                }),
                              }),
                              (0, a.jsx)(b.$, {
                                asChild: !0,
                                size: "lg",
                                variant: "outline",
                                className:
                                  "text-lg font-medium border-2 border-white text-white bg-white/10 hover:bg-white/30 transition-all duration-200 shadow-md ring-1 ring-white/20",
                                children: (0, a.jsx)(p(), {
                                  href: `${t}/about`,
                                  className: "flex items-center",
                                  children: "Learn More",
                                }),
                              }),
                            ],
                          }),
                          (0, a.jsx)("div", {
                            className: "mt-6",
                            children: (0, a.jsx)(b.$, {
                              asChild: !0,
                              variant: "link",
                              className: "text-blue-200 hover:text-white",
                              children: (0, a.jsxs)(p(), {
                                href: `${t}/dashboard`,
                                className: "flex items-center justify-center",
                                legacyBehavior: !0,
                                children: [
                                  (0, a.jsx)(o.A, {
                                    className: "mr-2 h-4 w-4",
                                  }),
                                  " Already have an account? Go to Dashboard",
                                ],
                              }),
                            }),
                          }),
                        ],
                      }),
                    ],
                  }),
                ],
              });
            }
            b = (v.then ? (await v)() : v)[0];
            let w = { ...i },
              k =
                "workUnitAsyncStorage" in w
                  ? w.workUnitAsyncStorage
                  : "requestAsyncStorage" in w
                    ? w.requestAsyncStorage
                    : void 0;
            j = new Proxy(
              function () {
                return (0, a.jsxs)("html", {
                  children: [
                    (0, a.jsxs)("head", {
                      children: [
                        (0, a.jsx)("meta", {
                          httpEquiv: "refresh",
                          content: `0;url=/${g.q}`,
                        }),
                        (0, a.jsx)("title", { children: "Redirecting..." }),
                      ],
                    }),
                    (0, a.jsx)("body", {
                      children: (0, a.jsxs)("div", {
                        style: {
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          height: "100vh",
                          flexDirection: "column",
                          fontFamily: "system-ui, sans-serif",
                          gap: "1rem",
                        },
                        children: [
                          (0, a.jsx)("p", {
                            children: "Redirecting to Hijraah...",
                          }),
                          (0, a.jsx)("a", {
                            href: `/${g.q}`,
                            style: {
                              color: "#3b82f6",
                              textDecoration: "underline",
                            },
                            children:
                              "Click here if you are not redirected automatically",
                          }),
                        ],
                      }),
                    }),
                  ],
                });
              },
              {
                apply: (e, t, r) => {
                  let s, i, a;
                  try {
                    let e = k?.getStore();
                    (s = e?.headers.get("sentry-trace") ?? void 0),
                      (i = e?.headers.get("baggage") ?? void 0),
                      (a = e?.headers);
                  } catch (e) {}
                  return f
                    .wrapServerComponentWithSentry(e, {
                      componentRoute: "/",
                      componentType: "Page",
                      sentryTraceHeader: s,
                      baggageHeader: i,
                      headers: a,
                    })
                    .apply(t, r);
                },
              },
            );
            let N = void 0,
              A = void 0,
              q = void 0,
              _ = j;
            s();
          } catch (e) {
            s(e);
          }
        });
      },
      94316: (e, t, r) => {
        "use strict";
        r.d(t, { DX: () => l });
        var s = r(84147);
        function i(e, t) {
          if ("function" == typeof e) return e(t);
          null != e && (e.current = t);
        }
        var a = r(35242),
          l = (function (e) {
            let t = (function (e) {
                let t = s.forwardRef((e, t) => {
                  let { children: r, ...a } = e;
                  if (s.isValidElement(r)) {
                    var l;
                    let e,
                      n,
                      o =
                        ((l = r),
                        (n =
                          (e = Object.getOwnPropertyDescriptor(
                            l.props,
                            "ref",
                          )?.get) &&
                          "isReactWarning" in e &&
                          e.isReactWarning)
                          ? l.ref
                          : (n =
                                (e = Object.getOwnPropertyDescriptor(
                                  l,
                                  "ref",
                                )?.get) &&
                                "isReactWarning" in e &&
                                e.isReactWarning)
                            ? l.props.ref
                            : l.props.ref || l.ref),
                      d = (function (e, t) {
                        let r = { ...t };
                        for (let s in t) {
                          let i = e[s],
                            a = t[s];
                          /^on[A-Z]/.test(s)
                            ? i && a
                              ? (r[s] = (...e) => {
                                  let t = a(...e);
                                  return i(...e), t;
                                })
                              : i && (r[s] = i)
                            : "style" === s
                              ? (r[s] = { ...i, ...a })
                              : "className" === s &&
                                (r[s] = [i, a].filter(Boolean).join(" "));
                        }
                        return { ...e, ...r };
                      })(a, r.props);
                    return (
                      r.type !== s.Fragment &&
                        (d.ref = t
                          ? (function (...e) {
                              return (t) => {
                                let r = !1,
                                  s = e.map((e) => {
                                    let s = i(e, t);
                                    return (
                                      r || "function" != typeof s || (r = !0), s
                                    );
                                  });
                                if (r)
                                  return () => {
                                    for (let t = 0; t < s.length; t++) {
                                      let r = s[t];
                                      "function" == typeof r
                                        ? r()
                                        : i(e[t], null);
                                    }
                                  };
                              };
                            })(t, o)
                          : o),
                      s.cloneElement(r, d)
                    );
                  }
                  return s.Children.count(r) > 1 ? s.Children.only(null) : null;
                });
                return (t.displayName = `${e}.SlotClone`), t;
              })(e),
              r = s.forwardRef((e, r) => {
                let { children: i, ...l } = e,
                  n = s.Children.toArray(i),
                  d = n.find(o);
                if (d) {
                  let e = d.props.children,
                    i = n.map((t) =>
                      t !== d
                        ? t
                        : s.Children.count(e) > 1
                          ? s.Children.only(null)
                          : s.isValidElement(e)
                            ? e.props.children
                            : null,
                    );
                  return (0, a.jsx)(t, {
                    ...l,
                    ref: r,
                    children: s.isValidElement(e)
                      ? s.cloneElement(e, void 0, i)
                      : null,
                  });
                }
                return (0, a.jsx)(t, { ...l, ref: r, children: i });
              });
            return (r.displayName = `${e}.Slot`), r;
          })("Slot"),
          n = Symbol("radix.slottable");
        function o(e) {
          return (
            s.isValidElement(e) &&
            "function" == typeof e.type &&
            "__radixId" in e.type &&
            e.type.__radixId === n
          );
        }
      },
      94735: (e) => {
        "use strict";
        e.exports = require("events");
      },
    });
  var t = require("../webpack-runtime.js");
  t.C(e);
  var r = (e) => t((t.s = e)),
    s = t.X(0, [827, 6518, 2033, 4027, 1655, 4990, 4630], () => r(53144));
  module.exports = s;
})();
//# sourceMappingURL=page.js.map
