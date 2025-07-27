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
    (e._sentryDebugIds[t] = "ea62eeeb-9edd-4b4b-a184-d9dc10a5557b"),
    (e._sentryDebugIdIdentifier =
      "sentry-dbid-ea62eeeb-9edd-4b4b-a184-d9dc10a5557b"));
} catch (e) {}
(() => {
  var e = {};
  (e.id = 5920),
    (e.ids = [5920]),
    (e.modules = {
      1523: (e, t) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          !(function (e, t) {
            for (var r in t)
              Object.defineProperty(e, r, { enumerable: !0, get: t[r] });
          })(t, {
            cancelIdleCallback: function () {
              return n;
            },
            requestIdleCallback: function () {
              return r;
            },
          });
        let r =
            ("undefined" != typeof self &&
              self.requestIdleCallback &&
              self.requestIdleCallback.bind(window)) ||
            function (e) {
              let t = Date.now();
              return self.setTimeout(function () {
                e({
                  didTimeout: !1,
                  timeRemaining: function () {
                    return Math.max(0, 50 - (Date.now() - t));
                  },
                });
              }, 1);
            },
          n =
            ("undefined" != typeof self &&
              self.cancelIdleCallback &&
              self.cancelIdleCallback.bind(window)) ||
            function (e) {
              return clearTimeout(e);
            };
        ("function" == typeof t.default ||
          ("object" == typeof t.default && null !== t.default)) &&
          void 0 === t.default.__esModule &&
          (Object.defineProperty(t.default, "__esModule", { value: !0 }),
          Object.assign(t.default, t),
          (e.exports = t.default));
      },
      1708: (e) => {
        "use strict";
        e.exports = require("node:process");
      },
      3295: (e) => {
        "use strict";
        e.exports = require("next/dist/server/app-render/after-task-async-storage.external.js");
      },
      3474: (e, t, r) => {
        Promise.resolve().then(r.bind(r, 35891));
      },
      6934: () => {},
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
        r.d(t, { F: () => o });
        var n = r(61268);
        r(84205);
        let o = ({ children: e, className: t, ...r }) =>
          (0, n.jsx)("div", {
            className: `overflow-auto ${t || ""}`,
            ...r,
            children: e,
          });
      },
      14604: (e, t, r) => {
        let { createProxy: n } = r(85493);
        e.exports = n(
          "E:\\downloads\\Hijraah\\node_modules\\.pnpm\\next@15.3.0-canary.31_@babe_be67f368de2727c847f3a61f5e6cf4fa\\node_modules\\next\\dist\\client\\script.js",
        );
      },
      14795: (e, t, r) => {
        "use strict";
        r.d(t, { j2: () => o });
        var n = r(84001);
        async function o() {
          return (await (0, n.WV)()).session;
        }
        r(57011), r(67761), r(29244);
      },
      16714: (e, t, r) => {
        "use strict";
        r.d(t, { AppSidebar: () => n });
        let n = (0, r(26394).registerClientReference)(
          function () {
            throw Error(
              "Attempted to call AppSidebar() from the server but AppSidebar is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\apps\\web\\src\\components\\ui\\app-sidebar.tsx",
          "AppSidebar",
        );
      },
      19121: (e) => {
        "use strict";
        e.exports = require("next/dist/server/app-render/action-async-storage.external.js");
      },
      19771: (e) => {
        "use strict";
        e.exports = require("process");
      },
      21800: (e, t, r) => {
        Promise.resolve().then(r.bind(r, 16714)),
          Promise.resolve().then(r.bind(r, 98699)),
          Promise.resolve().then(r.bind(r, 29244)),
          Promise.resolve().then(r.t.bind(r, 14604, 23));
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
      33873: (e) => {
        "use strict";
        e.exports = require("path");
      },
      34631: (e) => {
        "use strict";
        e.exports = require("tls");
      },
      35891: (e, t, r) => {
        "use strict";
        let n;
        r.r(t),
          r.d(t, {
            default: () => f,
            generateImageMetadata: () => u,
            generateMetadata: () => c,
            generateViewport: () => p,
          });
        var o = r(63033),
          s = r(26394),
          a = r(60442),
          i = (0, s.registerClientReference)(
            function () {
              throw Error(
                "Attempted to call the default export of \"E:\\\\downloads\\\\Hijraah\\\\apps\\\\web\\\\src\\\\app\\\\(ai-unified)\\\\chat\\\\shared\\\\[id]\\\\page.tsx\" from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
              );
            },
            "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\(ai-unified)\\chat\\shared\\[id]\\page.tsx",
            "default",
          );
        let d = { ...o },
          l =
            "workUnitAsyncStorage" in d
              ? d.workUnitAsyncStorage
              : "requestAsyncStorage" in d
                ? d.requestAsyncStorage
                : void 0;
        n =
          "function" == typeof i
            ? new Proxy(i, {
                apply: (e, t, r) => {
                  let n, o, s;
                  try {
                    let e = l?.getStore();
                    (n = e?.headers.get("sentry-trace") ?? void 0),
                      (o = e?.headers.get("baggage") ?? void 0),
                      (s = e?.headers);
                  } catch (e) {}
                  return a
                    .wrapServerComponentWithSentry(e, {
                      componentRoute: "/(ai-unified)/chat/shared/[id]",
                      componentType: "Page",
                      sentryTraceHeader: n,
                      baggageHeader: o,
                      headers: s,
                    })
                    .apply(t, r);
                },
              })
            : i;
        let c = void 0,
          u = void 0,
          p = void 0,
          f = n;
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
      42057: (e, t, r) => {
        "use strict";
        r.d(t, { default: () => o.a });
        var n = r(14604),
          o = r.n(n);
      },
      43886: () => {},
      44619: (e, t, r) => {
        "use strict";
        r.a(e, async (e, n) => {
          try {
            r.d(t, { Fc: () => d, TN: () => c, XL: () => l });
            var o = r(61268),
              s = r(91635);
            r(84205);
            var a = r(15942),
              i = e([a]);
            a = (i.then ? (await i)() : i)[0];
            let u = (0, s.F)(
              "relative w-full rounded-lg border px-4 py-3 text-sm grid has-[>svg]:grid-cols-[calc(var(--spacing)*4)_1fr] grid-cols-[0_1fr] has-[>svg]:gap-x-3 gap-y-0.5 items-start [&>svg]:size-4 [&>svg]:translate-y-0.5 [&>svg]:text-current",
              {
                variants: {
                  variant: {
                    default: "bg-background text-foreground",
                    destructive:
                      "text-destructive-foreground [&>svg]:text-current *:data-[slot=alert-description]:text-destructive-foreground/80",
                  },
                },
                defaultVariants: { variant: "default" },
              },
            );
            function d({ className: e, variant: t, ...r }) {
              return (0, o.jsx)("div", {
                "data-slot": "alert",
                role: "alert",
                className: (0, a.cn)(u({ variant: t }), e),
                ...r,
              });
            }
            function l({ className: e, ...t }) {
              return (0, o.jsx)("div", {
                "data-slot": "alert-title",
                className: (0, a.cn)(
                  "col-start-2 line-clamp-1 min-h-4 font-medium tracking-tight",
                  e,
                ),
                ...t,
              });
            }
            function c({ className: e, ...t }) {
              return (0, o.jsx)("div", {
                "data-slot": "alert-description",
                className: (0, a.cn)(
                  "text-muted-foreground col-start-2 grid justify-items-start gap-1 text-sm [&_p]:leading-relaxed",
                  e,
                ),
                ...t,
              });
            }
            n();
          } catch (e) {
            n(e);
          }
        });
      },
      44708: (e) => {
        "use strict";
        e.exports = require("node:https");
      },
      45824: (e, t, r) => {
        "use strict";
        r.r(t),
          r.d(t, {
            GlobalError: () => s.default,
            __next_app__: () => c,
            pages: () => l,
            routeModule: () => u,
            tree: () => d,
          });
        var n = r(11610),
          o = r(51293),
          s = r(59059),
          a = r(17770),
          i = {};
        for (let e in a)
          0 >
            [
              "default",
              "tree",
              "pages",
              "GlobalError",
              "__next_app__",
              "routeModule",
            ].indexOf(e) && (i[e] = () => a[e]);
        r.d(t, i);
        let d = {
            children: [
              "",
              {
                children: [
                  "(ai-unified)",
                  {
                    children: [
                      "chat",
                      {
                        children: [
                          "shared",
                          {
                            children: [
                              "[id]",
                              {
                                children: [
                                  "__PAGE__",
                                  {},
                                  {
                                    page: [
                                      () =>
                                        Promise.resolve().then(
                                          r.bind(r, 35891),
                                        ),
                                      "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\(ai-unified)\\chat\\shared\\[id]\\page.tsx",
                                    ],
                                  },
                                ],
                              },
                              {},
                            ],
                          },
                          {
                            layout: [
                              () => Promise.resolve().then(r.bind(r, 64706)),
                              "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\(ai-unified)\\chat\\shared\\layout.tsx",
                            ],
                          },
                        ],
                      },
                      {
                        layout: [
                          () => Promise.resolve().then(r.bind(r, 74614)),
                          "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\(ai-unified)\\chat\\layout.tsx",
                        ],
                      },
                    ],
                  },
                  {
                    layout: [
                      () => Promise.resolve().then(r.bind(r, 89663)),
                      "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\(ai-unified)\\layout.tsx",
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
          l = [
            "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\(ai-unified)\\chat\\shared\\[id]\\page.tsx",
          ],
          c = { require: r, loadChunk: () => Promise.resolve() },
          u = new n.AppPageRouteModule({
            definition: {
              kind: o.RouteKind.APP_PAGE,
              page: "/(ai-unified)/chat/shared/[id]/page",
              pathname: "/chat/shared/[id]",
              bundlePath: "",
              filename: "",
              appPaths: [],
            },
            userland: { loaderTree: d },
          });
      },
      46532: (e, t, r) => {
        "use strict";
        r.a(e, async (e, n) => {
          try {
            r.d(t, { E: () => l });
            var o = r(61268),
              s = r(86415),
              a = r(91635);
            r(84205);
            var i = r(15942),
              d = e([i]);
            i = (d.then ? (await d)() : d)[0];
            let c = (0, a.F)(
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
            function l({ className: e, variant: t, asChild: r = !1, ...n }) {
              let a = r ? s.DX : "span";
              return (0, o.jsx)(a, {
                "data-slot": "badge",
                className: (0, i.cn)(c({ variant: t }), e),
                ...n,
              });
            }
            n();
          } catch (e) {
            n(e);
          }
        });
      },
      48161: (e) => {
        "use strict";
        e.exports = require("node:os");
      },
      49917: (e, t, r) => {
        "use strict";
        r.d(t, { C1: () => w, bL: () => x });
        var n = r(84205),
          o = r(18047),
          s = r(78593),
          a = r(61268),
          i = "Progress",
          [d, l] = (0, o.A)(i),
          [c, u] = d(i),
          p = n.forwardRef((e, t) => {
            var r, n;
            let {
              __scopeProgress: o,
              value: i = null,
              max: d,
              getValueLabel: l = h,
              ...u
            } = e;
            (d || 0 === d) &&
              !g(d) &&
              console.error(
                ((r = `${d}`),
                `Invalid prop \`max\` of value \`${r}\` supplied to \`Progress\`. Only numbers greater than 0 are valid max values. Defaulting to \`100\`.`),
              );
            let p = g(d) ? d : 100;
            null === i ||
              y(i, p) ||
              console.error(
                ((n = `${i}`),
                `Invalid prop \`value\` of value \`${n}\` supplied to \`Progress\`. The \`value\` prop must be:
  - a positive number
  - less than the value passed to \`max\` (or 100 if no \`max\` prop is set)
  - \`null\` or \`undefined\` if the progress is indeterminate.

Defaulting to \`null\`.`),
              );
            let f = y(i, p) ? i : null,
              b = v(f) ? l(f, p) : void 0;
            return (0, a.jsx)(c, {
              scope: o,
              value: f,
              max: p,
              children: (0, a.jsx)(s.sG.div, {
                "aria-valuemax": p,
                "aria-valuemin": 0,
                "aria-valuenow": v(f) ? f : void 0,
                "aria-valuetext": b,
                role: "progressbar",
                "data-state": m(f, p),
                "data-value": f ?? void 0,
                "data-max": p,
                ...u,
                ref: t,
              }),
            });
          });
        p.displayName = i;
        var f = "ProgressIndicator",
          b = n.forwardRef((e, t) => {
            let { __scopeProgress: r, ...n } = e,
              o = u(f, r);
            return (0, a.jsx)(s.sG.div, {
              "data-state": m(o.value, o.max),
              "data-value": o.value ?? void 0,
              "data-max": o.max,
              ...n,
              ref: t,
            });
          });
        function h(e, t) {
          return `${Math.round((e / t) * 100)}%`;
        }
        function m(e, t) {
          return null == e ? "indeterminate" : e === t ? "complete" : "loading";
        }
        function v(e) {
          return "number" == typeof e;
        }
        function g(e) {
          return v(e) && !isNaN(e) && e > 0;
        }
        function y(e, t) {
          return v(e) && !isNaN(e) && e <= t && e >= 0;
        }
        b.displayName = f;
        var x = p,
          w = b;
      },
      52327: (e, t, r) => {
        "use strict";
        r.d(t, { A: () => n });
        let n = (0, r(95255).A)("Users", [
          [
            "path",
            { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2", key: "1yyitq" },
          ],
          ["circle", { cx: "9", cy: "7", r: "4", key: "nufk8" }],
          ["path", { d: "M22 21v-2a4 4 0 0 0-3-3.87", key: "kshegd" }],
          ["path", { d: "M16 3.13a4 4 0 0 1 0 7.75", key: "1da9ce" }],
        ]);
      },
      53053: (e) => {
        "use strict";
        e.exports = require("node:diagnostics_channel");
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
      58882: (e, t, r) => {
        "use strict";
        r.d(t, { A: () => n });
        let n = (0, r(95255).A)("Upload", [
          [
            "path",
            { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4", key: "ih7n3h" },
          ],
          ["polyline", { points: "17 8 12 3 7 8", key: "t8dd8p" }],
          ["line", { x1: "12", x2: "12", y1: "3", y2: "15", key: "widbto" }],
        ]);
      },
      61950: (e, t, r) => {
        "use strict";
        r.d(t, { A: () => n });
        let n = (0, r(95255).A)("AlertCircle", [
          ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
          ["line", { x1: "12", x2: "12", y1: "8", y2: "12", key: "1pkeuh" }],
          [
            "line",
            { x1: "12", x2: "12.01", y1: "16", y2: "16", key: "4dfq90" },
          ],
        ]);
      },
      63033: (e) => {
        "use strict";
        e.exports = require("next/dist/server/app-render/work-unit-async-storage.external.js");
      },
      64706: (e, t, r) => {
        "use strict";
        let n;
        r.r(t),
          r.d(t, {
            default: () => p,
            generateImageMetadata: () => c,
            generateMetadata: () => l,
            generateViewport: () => u,
            metadata: () => a,
          });
        var o = r(63033),
          s = r(60442);
        let a = {
            title: "Shared Chat - Hijraah",
            description: "View a shared AI chat conversation",
          },
          i = { ...o },
          d =
            "workUnitAsyncStorage" in i
              ? i.workUnitAsyncStorage
              : "requestAsyncStorage" in i
                ? i.requestAsyncStorage
                : void 0;
        n = new Proxy(
          function ({ children: e }) {
            return e;
          },
          {
            apply: (e, t, r) => {
              let n, o, a;
              try {
                let e = d?.getStore();
                (n = e?.headers.get("sentry-trace") ?? void 0),
                  (o = e?.headers.get("baggage") ?? void 0),
                  (a = e?.headers);
              } catch (e) {}
              return s
                .wrapServerComponentWithSentry(e, {
                  componentRoute: "/(ai-unified)/chat/shared",
                  componentType: "Layout",
                  sentryTraceHeader: n,
                  baggageHeader: o,
                  headers: a,
                })
                .apply(t, r);
            },
          },
        );
        let l = void 0,
          c = void 0,
          u = void 0,
          p = n;
      },
      66135: (e, t, r) => {
        "use strict";
        r.d(t, { A: () => n });
        let n = (0, r(95255).A)("Loader2", [
          ["path", { d: "M21 12a9 9 0 1 1-6.219-8.56", key: "13zald" }],
        ]);
      },
      66682: (e, t, r) => {
        Promise.resolve().then(r.bind(r, 96717));
      },
      70724: (e, t, r) => {
        "use strict";
        r.r(t),
          r.d(t, {
            useGlobalTranslate: () => i,
            useI18n: () => s,
            useTranslate: () => a,
          });
        var n = r(95124),
          o = r(58702);
        function s() {
          let e = (0, n.useLocale)(),
            t = (0, n.useTranslations)(),
            r = (0, n.useFormatter)(),
            s = (0, n.useTimeZone)(),
            a = (0, n.useNow)(),
            i = (0, o.XG)(e),
            d = i.direction;
          return {
            t,
            format: r,
            locale: e,
            timeZone: s,
            now: a,
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
        function a(e) {
          return (0, n.useTranslations)(e);
        }
        function i() {
          return (0, n.useTranslations)();
        }
      },
      73024: (e) => {
        "use strict";
        e.exports = require("node:fs");
      },
      73136: (e) => {
        "use strict";
        e.exports = require("node:url");
      },
      73566: (e) => {
        "use strict";
        e.exports = require("worker_threads");
      },
      73927: (e, t, r) => {
        "use strict";
        r.r(t),
          r.d(t, { "4055c9f9dce3c849928e65e87017b3609674121d00": () => n.M });
        var n = r(29997);
      },
      74075: (e) => {
        "use strict";
        e.exports = require("zlib");
      },
      74614: (e, t, r) => {
        "use strict";
        let n;
        r.r(t),
          r.d(t, {
            default: () => x,
            experimental_ppr: () => f,
            generateImageMetadata: () => g,
            generateMetadata: () => v,
            generateViewport: () => y,
            metadata: () => p,
          });
        var o = r(63033),
          s = r(35242),
          a = r(15058),
          i = r(42057),
          d = r(16714),
          l = r(98699),
          c = r(14795),
          u = r(60442);
        let p = {
            title: "Unified Chat - Hijraah",
            description: "Chat with our AI assistant to get immigration help",
          },
          f = !0;
        async function b({ children: e }) {
          let [t, r] = await Promise.all([(0, c.j2)(), (0, a.UL)()]),
            n = r.get("sidebar:state")?.value !== "true";
          return (0, s.jsxs)(s.Fragment, {
            children: [
              (0, s.jsx)(i.default, {
                src: "https://cdn.jsdelivr.net/pyodide/v0.23.4/full/pyodide.js",
                strategy: "beforeInteractive",
              }),
              (0, s.jsxs)(l.SidebarProvider, {
                defaultOpen: !n,
                children: [
                  (0, s.jsx)(d.AppSidebar, {}),
                  (0, s.jsx)(l.SidebarInset, { children: e }),
                ],
              }),
            ],
          });
        }
        let h = { ...o },
          m =
            "workUnitAsyncStorage" in h
              ? h.workUnitAsyncStorage
              : "requestAsyncStorage" in h
                ? h.requestAsyncStorage
                : void 0;
        n = new Proxy(b, {
          apply: (e, t, r) => {
            let n, o, s;
            try {
              let e = m?.getStore();
              (n = e?.headers.get("sentry-trace") ?? void 0),
                (o = e?.headers.get("baggage") ?? void 0),
                (s = e?.headers);
            } catch (e) {}
            return u
              .wrapServerComponentWithSentry(e, {
                componentRoute: "/(ai-unified)/chat",
                componentType: "Layout",
                sentryTraceHeader: n,
                baggageHeader: o,
                headers: s,
              })
              .apply(t, r);
          },
        });
        let v = void 0,
          g = void 0,
          y = void 0,
          x = n;
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
      77030: (e) => {
        "use strict";
        e.exports = require("node:net");
      },
      77598: (e) => {
        "use strict";
        e.exports = require("node:crypto");
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
      80481: (e) => {
        "use strict";
        e.exports = require("node:readline");
      },
      81630: (e) => {
        "use strict";
        e.exports = require("http");
      },
      83997: (e) => {
        "use strict";
        e.exports = require("tty");
      },
      84297: (e) => {
        "use strict";
        e.exports = require("async_hooks");
      },
      85352: (e, t, r) => {
        Promise.resolve().then(r.bind(r, 43851)),
          Promise.resolve().then(r.bind(r, 33713)),
          Promise.resolve().then(r.bind(r, 3519)),
          Promise.resolve().then(r.t.bind(r, 99966, 23));
      },
      85488: (e) => {
        "use strict";
        e.exports = import("ai");
      },
      86327: (e, t) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          Object.defineProperty(t, "setAttributesFromProps", {
            enumerable: !0,
            get: function () {
              return s;
            },
          });
        let r = {
            acceptCharset: "accept-charset",
            className: "class",
            htmlFor: "for",
            httpEquiv: "http-equiv",
            noModule: "noModule",
          },
          n = [
            "onLoad",
            "onReady",
            "dangerouslySetInnerHTML",
            "children",
            "onError",
            "strategy",
            "stylesheets",
          ];
        function o(e) {
          return ["async", "defer", "noModule"].includes(e);
        }
        function s(e, t) {
          for (let [s, a] of Object.entries(t)) {
            if (!t.hasOwnProperty(s) || n.includes(s) || void 0 === a) continue;
            let i = r[s] || s.toLowerCase();
            "SCRIPT" === e.tagName && o(i)
              ? (e[i] = !!a)
              : e.setAttribute(i, String(a)),
              (!1 === a ||
                ("SCRIPT" === e.tagName && o(i) && (!a || "false" === a))) &&
                (e.setAttribute(i, ""), e.removeAttribute(i));
          }
        }
        ("function" == typeof t.default ||
          ("object" == typeof t.default && null !== t.default)) &&
          void 0 === t.default.__esModule &&
          (Object.defineProperty(t.default, "__esModule", { value: !0 }),
          Object.assign(t.default, t),
          (e.exports = t.default));
      },
      86592: (e) => {
        "use strict";
        e.exports = require("node:inspector");
      },
      89123: (e, t, r) => {
        "use strict";
        r.d(t, { A: () => n });
        let n = (0, r(95255).A)("Info", [
          ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
          ["path", { d: "M12 16v-4", key: "1dtifu" }],
          ["path", { d: "M12 8h.01", key: "e9boi3" }],
        ]);
      },
      89663: (e, t, r) => {
        "use strict";
        let n;
        r.r(t),
          r.d(t, {
            default: () => y,
            experimental_ppr: () => p,
            generateImageMetadata: () => v,
            generateMetadata: () => m,
            generateViewport: () => g,
          });
        var o = r(63033),
          s = r(35242),
          a = r(15058),
          i = r(42057),
          d = r(16714),
          l = r(98699),
          c = r(14795),
          u = r(60442);
        let p = !0;
        async function f({ children: e }) {
          let [t, r] = await Promise.all([(0, c.j2)(), (0, a.UL)()]),
            n = r.get("sidebar:state")?.value !== "true";
          return (0, s.jsxs)(s.Fragment, {
            children: [
              (0, s.jsx)(i.default, {
                src: "https://cdn.jsdelivr.net/pyodide/v0.23.4/full/pyodide.js",
                strategy: "beforeInteractive",
              }),
              (0, s.jsxs)(l.SidebarProvider, {
                defaultOpen: !n,
                children: [
                  (0, s.jsx)(d.AppSidebar, {}),
                  (0, s.jsx)(l.SidebarInset, { children: e }),
                ],
              }),
            ],
          });
        }
        let b = { ...o },
          h =
            "workUnitAsyncStorage" in b
              ? b.workUnitAsyncStorage
              : "requestAsyncStorage" in b
                ? b.requestAsyncStorage
                : void 0;
        n = new Proxy(f, {
          apply: (e, t, r) => {
            let n, o, s;
            try {
              let e = h?.getStore();
              (n = e?.headers.get("sentry-trace") ?? void 0),
                (o = e?.headers.get("baggage") ?? void 0),
                (s = e?.headers);
            } catch (e) {}
            return u
              .wrapServerComponentWithSentry(e, {
                componentRoute: "/(ai-unified)",
                componentType: "Layout",
                sentryTraceHeader: n,
                baggageHeader: o,
                headers: s,
              })
              .apply(t, r);
          },
        });
        let m = void 0,
          v = void 0,
          g = void 0,
          y = n;
      },
      91645: (e) => {
        "use strict";
        e.exports = require("net");
      },
      92256: (e, t, r) => {
        "use strict";
        r.a(e, async (e, n) => {
          try {
            r.d(t, { k: () => l });
            var o = r(61268),
              s = r(49917),
              a = r(84205),
              i = r(15942),
              d = e([i]);
            i = (d.then ? (await d)() : d)[0];
            let l = a.forwardRef(({ className: e, value: t, ...r }, n) =>
              (0, o.jsx)(s.bL, {
                ref: n,
                className: (0, i.cn)(
                  "relative h-2 w-full overflow-hidden rounded-full bg-secondary",
                  e,
                ),
                ...r,
                children: (0, o.jsx)(s.C1, {
                  className: "h-full w-full flex-1 bg-primary transition-all",
                  style: { transform: `translateX(-${100 - (t || 0)}%)` },
                }),
              }),
            );
            (l.displayName = s.bL.displayName), n();
          } catch (e) {
            n(e);
          }
        });
      },
      92663: (e, t, r) => {
        "use strict";
        r.d(t, { A: () => n });
        let n = (0, r(95255).A)("BookOpen", [
          [
            "path",
            { d: "M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z", key: "vv98re" },
          ],
          [
            "path",
            { d: "M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z", key: "1cyq3y" },
          ],
        ]);
      },
      94735: (e) => {
        "use strict";
        e.exports = require("events");
      },
      96717: (e, t, r) => {
        "use strict";
        r.a(e, async (e, n) => {
          try {
            r.r(t), r.d(t, { default: () => u });
            var o = r(61268),
              s = r(89882),
              a = r(84205),
              i = r(94812),
              d = r(39008),
              l = r(32367),
              c = e([i, d]);
            function u() {
              let e = (0, s.useParams)().id,
                [t, r] = (0, a.useState)(!0),
                [n, c] = (0, a.useState)([]),
                [u, p] = (0, a.useState)("gpt-4o"),
                [f, b] = (0, a.useState)(null);
              return ((0, l.Iw)(), f)
                ? (0, o.jsx)("div", {
                    className: "flex h-screen items-center justify-center",
                    children: (0, o.jsxs)("div", {
                      className: "text-center",
                      children: [
                        (0, o.jsx)("h2", {
                          className: "text-2xl font-bold",
                          children: "Error",
                        }),
                        (0, o.jsx)("p", {
                          className: "text-muted-foreground",
                          children: f,
                        }),
                      ],
                    }),
                  })
                : t
                  ? (0, o.jsxs)("div", {
                      className: "flex h-screen flex-col",
                      children: [
                        (0, o.jsxs)("div", {
                          className:
                            "flex h-14 items-center justify-between border-b px-4",
                          children: [
                            (0, o.jsx)(i.E, { className: "h-6 w-48" }),
                            (0, o.jsx)(i.E, { className: "h-8 w-32" }),
                          ],
                        }),
                        (0, o.jsxs)("div", {
                          className: "flex-1 p-4 space-y-6",
                          children: [
                            (0, o.jsx)(i.E, { className: "h-16 w-2/3" }),
                            (0, o.jsx)(i.E, {
                              className: "h-16 w-2/3 ml-auto",
                            }),
                            (0, o.jsx)(i.E, { className: "h-16 w-2/3" }),
                          ],
                        }),
                        (0, o.jsx)("div", {
                          className: "border-t p-4",
                          children: (0, o.jsx)(i.E, {
                            className: "h-10 w-full",
                          }),
                        }),
                      ],
                    })
                  : (0, o.jsx)("div", {
                      className: "flex h-screen flex-col",
                      children: (0, o.jsx)(d.UnifiedChatContainer, {
                        id: e,
                        isReadonly: !0,
                      }),
                    });
            }
            ([i, d] = c.then ? (await c)() : c), n();
          } catch (e) {
            n(e);
          }
        });
      },
      98699: (e, t, r) => {
        "use strict";
        r.d(t, {
          SidebarInset: () => o,
          SidebarProvider: () => s,
          SidebarTrigger: () => a,
        });
        var n = r(26394);
        (0, n.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call Sidebar() from the server but Sidebar is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\apps\\web\\src\\components\\ui\\sidebar.tsx",
          "Sidebar",
        ),
          (0, n.registerClientReference)(
            function () {
              throw Error(
                "Attempted to call SidebarContent() from the server but SidebarContent is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
              );
            },
            "E:\\downloads\\Hijraah\\apps\\web\\src\\components\\ui\\sidebar.tsx",
            "SidebarContent",
          ),
          (0, n.registerClientReference)(
            function () {
              throw Error(
                "Attempted to call SidebarFooter() from the server but SidebarFooter is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
              );
            },
            "E:\\downloads\\Hijraah\\apps\\web\\src\\components\\ui\\sidebar.tsx",
            "SidebarFooter",
          ),
          (0, n.registerClientReference)(
            function () {
              throw Error(
                "Attempted to call SidebarGroup() from the server but SidebarGroup is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
              );
            },
            "E:\\downloads\\Hijraah\\apps\\web\\src\\components\\ui\\sidebar.tsx",
            "SidebarGroup",
          ),
          (0, n.registerClientReference)(
            function () {
              throw Error(
                "Attempted to call SidebarGroupAction() from the server but SidebarGroupAction is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
              );
            },
            "E:\\downloads\\Hijraah\\apps\\web\\src\\components\\ui\\sidebar.tsx",
            "SidebarGroupAction",
          ),
          (0, n.registerClientReference)(
            function () {
              throw Error(
                "Attempted to call SidebarGroupContent() from the server but SidebarGroupContent is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
              );
            },
            "E:\\downloads\\Hijraah\\apps\\web\\src\\components\\ui\\sidebar.tsx",
            "SidebarGroupContent",
          ),
          (0, n.registerClientReference)(
            function () {
              throw Error(
                "Attempted to call SidebarGroupLabel() from the server but SidebarGroupLabel is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
              );
            },
            "E:\\downloads\\Hijraah\\apps\\web\\src\\components\\ui\\sidebar.tsx",
            "SidebarGroupLabel",
          ),
          (0, n.registerClientReference)(
            function () {
              throw Error(
                "Attempted to call SidebarHeader() from the server but SidebarHeader is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
              );
            },
            "E:\\downloads\\Hijraah\\apps\\web\\src\\components\\ui\\sidebar.tsx",
            "SidebarHeader",
          ),
          (0, n.registerClientReference)(
            function () {
              throw Error(
                "Attempted to call SidebarInput() from the server but SidebarInput is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
              );
            },
            "E:\\downloads\\Hijraah\\apps\\web\\src\\components\\ui\\sidebar.tsx",
            "SidebarInput",
          );
        let o = (0, n.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call SidebarInset() from the server but SidebarInset is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\apps\\web\\src\\components\\ui\\sidebar.tsx",
          "SidebarInset",
        );
        (0, n.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call SidebarMenu() from the server but SidebarMenu is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\apps\\web\\src\\components\\ui\\sidebar.tsx",
          "SidebarMenu",
        ),
          (0, n.registerClientReference)(
            function () {
              throw Error(
                "Attempted to call SidebarMenuAction() from the server but SidebarMenuAction is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
              );
            },
            "E:\\downloads\\Hijraah\\apps\\web\\src\\components\\ui\\sidebar.tsx",
            "SidebarMenuAction",
          ),
          (0, n.registerClientReference)(
            function () {
              throw Error(
                "Attempted to call SidebarMenuBadge() from the server but SidebarMenuBadge is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
              );
            },
            "E:\\downloads\\Hijraah\\apps\\web\\src\\components\\ui\\sidebar.tsx",
            "SidebarMenuBadge",
          ),
          (0, n.registerClientReference)(
            function () {
              throw Error(
                "Attempted to call SidebarMenuButton() from the server but SidebarMenuButton is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
              );
            },
            "E:\\downloads\\Hijraah\\apps\\web\\src\\components\\ui\\sidebar.tsx",
            "SidebarMenuButton",
          ),
          (0, n.registerClientReference)(
            function () {
              throw Error(
                "Attempted to call SidebarMenuItem() from the server but SidebarMenuItem is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
              );
            },
            "E:\\downloads\\Hijraah\\apps\\web\\src\\components\\ui\\sidebar.tsx",
            "SidebarMenuItem",
          ),
          (0, n.registerClientReference)(
            function () {
              throw Error(
                "Attempted to call SidebarMenuSkeleton() from the server but SidebarMenuSkeleton is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
              );
            },
            "E:\\downloads\\Hijraah\\apps\\web\\src\\components\\ui\\sidebar.tsx",
            "SidebarMenuSkeleton",
          ),
          (0, n.registerClientReference)(
            function () {
              throw Error(
                "Attempted to call SidebarMenuSub() from the server but SidebarMenuSub is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
              );
            },
            "E:\\downloads\\Hijraah\\apps\\web\\src\\components\\ui\\sidebar.tsx",
            "SidebarMenuSub",
          ),
          (0, n.registerClientReference)(
            function () {
              throw Error(
                "Attempted to call SidebarMenuSubButton() from the server but SidebarMenuSubButton is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
              );
            },
            "E:\\downloads\\Hijraah\\apps\\web\\src\\components\\ui\\sidebar.tsx",
            "SidebarMenuSubButton",
          ),
          (0, n.registerClientReference)(
            function () {
              throw Error(
                "Attempted to call SidebarMenuSubItem() from the server but SidebarMenuSubItem is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
              );
            },
            "E:\\downloads\\Hijraah\\apps\\web\\src\\components\\ui\\sidebar.tsx",
            "SidebarMenuSubItem",
          );
        let s = (0, n.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call SidebarProvider() from the server but SidebarProvider is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\apps\\web\\src\\components\\ui\\sidebar.tsx",
          "SidebarProvider",
        );
        (0, n.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call SidebarRail() from the server but SidebarRail is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\apps\\web\\src\\components\\ui\\sidebar.tsx",
          "SidebarRail",
        ),
          (0, n.registerClientReference)(
            function () {
              throw Error(
                "Attempted to call SidebarSeparator() from the server but SidebarSeparator is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
              );
            },
            "E:\\downloads\\Hijraah\\apps\\web\\src\\components\\ui\\sidebar.tsx",
            "SidebarSeparator",
          );
        let a = (0, n.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call SidebarTrigger() from the server but SidebarTrigger is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\apps\\web\\src\\components\\ui\\sidebar.tsx",
          "SidebarTrigger",
        );
        (0, n.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call useSidebar() from the server but useSidebar is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\apps\\web\\src\\components\\ui\\sidebar.tsx",
          "useSidebar",
        );
      },
      99966: (e, t, r) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          !(function (e, t) {
            for (var r in t)
              Object.defineProperty(e, r, { enumerable: !0, get: t[r] });
          })(t, {
            default: function () {
              return g;
            },
            handleClientScriptLoad: function () {
              return h;
            },
            initScriptLoader: function () {
              return m;
            },
          });
        let n = r(17380),
          o = r(88835),
          s = r(61268),
          a = n._(r(90304)),
          i = o._(r(84205)),
          d = r(3954),
          l = r(86327),
          c = r(1523),
          u = new Map(),
          p = new Set(),
          f = (e) => {
            if (a.default.preinit)
              return void e.forEach((e) => {
                a.default.preinit(e, { as: "style" });
              });
          },
          b = (e) => {
            let {
                src: t,
                id: r,
                onLoad: n = () => {},
                onReady: o = null,
                dangerouslySetInnerHTML: s,
                children: a = "",
                strategy: i = "afterInteractive",
                onError: d,
                stylesheets: c,
              } = e,
              b = r || t;
            if (b && p.has(b)) return;
            if (u.has(t)) {
              p.add(b), u.get(t).then(n, d);
              return;
            }
            let h = () => {
                o && o(), p.add(b);
              },
              m = document.createElement("script"),
              v = new Promise((e, t) => {
                m.addEventListener("load", function (t) {
                  e(), n && n.call(this, t), h();
                }),
                  m.addEventListener("error", function (e) {
                    t(e);
                  });
              }).catch(function (e) {
                d && d(e);
              });
            s
              ? ((m.innerHTML = s.__html || ""), h())
              : a
                ? ((m.textContent =
                    "string" == typeof a
                      ? a
                      : Array.isArray(a)
                        ? a.join("")
                        : ""),
                  h())
                : t && ((m.src = t), u.set(t, v)),
              (0, l.setAttributesFromProps)(m, e),
              "worker" === i && m.setAttribute("type", "text/partytown"),
              m.setAttribute("data-nscript", i),
              c && f(c),
              document.body.appendChild(m);
          };
        function h(e) {
          let { strategy: t = "afterInteractive" } = e;
          "lazyOnload" === t
            ? window.addEventListener("load", () => {
                (0, c.requestIdleCallback)(() => b(e));
              })
            : b(e);
        }
        function m(e) {
          e.forEach(h),
            [
              ...document.querySelectorAll(
                '[data-nscript="beforeInteractive"]',
              ),
              ...document.querySelectorAll('[data-nscript="beforePageRender"]'),
            ].forEach((e) => {
              let t = e.id || e.getAttribute("src");
              p.add(t);
            });
        }
        function v(e) {
          let {
              id: t,
              src: r = "",
              onLoad: n = () => {},
              onReady: o = null,
              strategy: l = "afterInteractive",
              onError: u,
              stylesheets: f,
              ...h
            } = e,
            {
              updateScripts: m,
              scripts: v,
              getIsSsr: g,
              appDir: y,
              nonce: x,
            } = (0, i.useContext)(d.HeadManagerContext),
            w = (0, i.useRef)(!1);
          (0, i.useEffect)(() => {
            let e = t || r;
            w.current || (o && e && p.has(e) && o(), (w.current = !0));
          }, [o, t, r]);
          let S = (0, i.useRef)(!1);
          if (
            ((0, i.useEffect)(() => {
              if (!S.current) {
                if ("afterInteractive" === l) b(e);
                else
                  "lazyOnload" === l &&
                    ("complete" === document.readyState
                      ? (0, c.requestIdleCallback)(() => b(e))
                      : window.addEventListener("load", () => {
                          (0, c.requestIdleCallback)(() => b(e));
                        }));
                S.current = !0;
              }
            }, [e, l]),
            ("beforeInteractive" === l || "worker" === l) &&
              (m
                ? ((v[l] = (v[l] || []).concat([
                    { id: t, src: r, onLoad: n, onReady: o, onError: u, ...h },
                  ])),
                  m(v))
                : g && g()
                  ? p.add(t || r)
                  : g && !g() && b(e)),
            y)
          ) {
            if (
              (f &&
                f.forEach((e) => {
                  a.default.preinit(e, { as: "style" });
                }),
              "beforeInteractive" === l)
            )
              if (!r)
                return (
                  h.dangerouslySetInnerHTML &&
                    ((h.children = h.dangerouslySetInnerHTML.__html),
                    delete h.dangerouslySetInnerHTML),
                  (0, s.jsx)("script", {
                    nonce: x,
                    dangerouslySetInnerHTML: {
                      __html:
                        "(self.__next_s=self.__next_s||[]).push(" +
                        JSON.stringify([0, { ...h, id: t }]) +
                        ")",
                    },
                  })
                );
              else
                return (
                  a.default.preload(
                    r,
                    h.integrity
                      ? {
                          as: "script",
                          integrity: h.integrity,
                          nonce: x,
                          crossOrigin: h.crossOrigin,
                        }
                      : { as: "script", nonce: x, crossOrigin: h.crossOrigin },
                  ),
                  (0, s.jsx)("script", {
                    nonce: x,
                    dangerouslySetInnerHTML: {
                      __html:
                        "(self.__next_s=self.__next_s||[]).push(" +
                        JSON.stringify([r, { ...h, id: t }]) +
                        ")",
                    },
                  })
                );
            "afterInteractive" === l &&
              r &&
              a.default.preload(
                r,
                h.integrity
                  ? {
                      as: "script",
                      integrity: h.integrity,
                      nonce: x,
                      crossOrigin: h.crossOrigin,
                    }
                  : { as: "script", nonce: x, crossOrigin: h.crossOrigin },
              );
          }
          return null;
        }
        Object.defineProperty(v, "__nextScript", { value: !0 });
        let g = v;
        ("function" == typeof t.default ||
          ("object" == typeof t.default && null !== t.default)) &&
          void 0 === t.default.__esModule &&
          (Object.defineProperty(t.default, "__esModule", { value: !0 }),
          Object.assign(t.default, t),
          (e.exports = t.default));
      },
    });
  var t = require("../../../../../webpack-runtime.js");
  t.C(e);
  var r = (e) => t((t.s = e)),
    n = t.X(
      0,
      [
        827, 6518, 2033, 4027, 2872, 7713, 5149, 8859, 1655, 8029, 5728, 9729,
        3390, 7719, 6188, 7911, 7401, 5124, 3042, 385, 4486, 8119, 5058, 131,
        2028, 4307, 7111, 4630, 8264, 27, 4232, 9008,
      ],
      () => r(45824),
    );
  module.exports = n;
})();
//# sourceMappingURL=page.js.map
