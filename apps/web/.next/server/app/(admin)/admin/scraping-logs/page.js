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
    (e._sentryDebugIds[r] = "93398a43-131d-4591-a00c-11cfde50020f"),
    (e._sentryDebugIdIdentifier =
      "sentry-dbid-93398a43-131d-4591-a00c-11cfde50020f"));
} catch (e) {}
(() => {
  var e = {};
  (e.id = 6505),
    (e.ids = [6505]),
    (e.modules = {
      3295: (e) => {
        "use strict";
        e.exports = require("next/dist/server/app-render/after-task-async-storage.external.js");
      },
      5451: (e, r, t) => {
        "use strict";
        t.a(e, async (e, s) => {
          try {
            t.d(r, {
              BT: () => p,
              Wu: () => h,
              ZB: () => u,
              Zp: () => d,
              aR: () => c,
              wL: () => x,
            });
            var a = t(61268),
              n = t(55728),
              i = t(84205),
              o = t(15942),
              l = e([o]);
            o = (l.then ? (await l)() : l)[0];
            let d = i.forwardRef(({ className: e, ...r }, t) =>
              (0, a.jsx)(n.P.div, {
                ref: t,
                className: (0, o.cn)(
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
            let c = i.forwardRef(({ className: e, ...r }, t) =>
              (0, a.jsx)("div", {
                ref: t,
                className: (0, o.cn)("flex flex-col space-y-1.5 p-6", e),
                ...r,
              }),
            );
            c.displayName = "CardHeader";
            let u = i.forwardRef(({ className: e, ...r }, t) =>
              (0, a.jsx)("h3", {
                ref: t,
                className: (0, o.cn)(
                  "text-2xl font-semibold leading-none tracking-tight",
                  e,
                ),
                ...r,
              }),
            );
            u.displayName = "CardTitle";
            let p = i.forwardRef(({ className: e, ...r }, t) =>
              (0, a.jsx)("p", {
                ref: t,
                className: (0, o.cn)("text-sm text-muted-foreground", e),
                ...r,
              }),
            );
            p.displayName = "CardDescription";
            let h = i.forwardRef(({ className: e, ...r }, t) =>
              (0, a.jsx)("div", {
                ref: t,
                className: (0, o.cn)("p-6 pt-0", e),
                ...r,
              }),
            );
            h.displayName = "CardContent";
            let x = i.forwardRef(({ className: e, ...r }, t) =>
              (0, a.jsx)("div", {
                ref: t,
                className: (0, o.cn)("flex items-center p-6 pt-0", e),
                ...r,
              }),
            );
            (x.displayName = "CardFooter"), s();
          } catch (e) {
            s(e);
          }
        });
      },
      8086: (e) => {
        "use strict";
        e.exports = require("module");
      },
      10056: (e, r, t) => {
        "use strict";
        t.d(r, { A: () => s });
        let s = (0, t(95255).A)("ChevronLeft", [
          ["path", { d: "m15 18-6-6 6-6", key: "1wnfg3" }],
        ]);
      },
      10846: (e) => {
        "use strict";
        e.exports = require("next/dist/compiled/next-server/app-page.runtime.prod.js");
      },
      12335: (e, r, t) => {
        "use strict";
        t.d(r, { A: () => s });
        let s = (0, t(95255).A)("ChevronRight", [
          ["path", { d: "m9 18 6-6-6-6", key: "mthhwq" }],
        ]);
      },
      15090: (e, r, t) => {
        "use strict";
        t.d(r, { d: () => p });
        var s = t(84205);
        let a = {
            ADD_TOAST: "ADD_TOAST",
            UPDATE_TOAST: "UPDATE_TOAST",
            DISMISS_TOAST: "DISMISS_TOAST",
            REMOVE_TOAST: "REMOVE_TOAST",
          },
          n = 0,
          i = new Map(),
          o = (e, r) => {
            switch (r.type) {
              case a.ADD_TOAST:
                return { ...e, toasts: [r.toast, ...e.toasts].slice(0, 5) };
              case a.UPDATE_TOAST:
                return {
                  ...e,
                  toasts: e.toasts.map((e) =>
                    e.id === r.toast.id ? { ...e, ...r.toast } : e,
                  ),
                };
              case a.DISMISS_TOAST: {
                let { toastId: t } = r;
                if (t) i.has(t) && (clearTimeout(i.get(t)), i.delete(t));
                else
                  for (let [e, r] of i.entries()) clearTimeout(r), i.delete(e);
                return {
                  ...e,
                  toasts: e.toasts.map((e) =>
                    e.id === t || void 0 === t ? { ...e, open: !1 } : e,
                  ),
                };
              }
              case a.REMOVE_TOAST:
                if (void 0 === r.toastId) return { ...e, toasts: [] };
                return {
                  ...e,
                  toasts: e.toasts.filter((e) => e.id !== r.toastId),
                };
            }
          },
          l = [],
          d = { toasts: [] };
        function c(e) {
          (d = o(d, e)),
            l.forEach((e) => {
              e(d);
            });
        }
        function u({ ...e }) {
          let r = (n = (n + 1) % Number.MAX_VALUE).toString(),
            t = () => c({ type: a.DISMISS_TOAST, toastId: r });
          return (
            c({
              type: a.ADD_TOAST,
              toast: {
                ...e,
                id: r,
                open: !0,
                onOpenChange: (e) => {
                  e || t();
                },
              },
            }),
            {
              id: r,
              dismiss: t,
              update: (e) =>
                c({ type: a.UPDATE_TOAST, toast: { ...e, id: r } }),
            }
          );
        }
        function p() {
          let [e, r] = s.useState(d);
          return (
            s.useEffect(
              () => (
                l.push(r),
                () => {
                  let e = l.indexOf(r);
                  e > -1 && l.splice(e, 1);
                }
              ),
              [e],
            ),
            {
              ...e,
              toast: u,
              dismiss: (e) => c({ type: a.DISMISS_TOAST, toastId: e }),
            }
          );
        }
      },
      19121: (e) => {
        "use strict";
        e.exports = require("next/dist/server/app-render/action-async-storage.external.js");
      },
      19186: (e, r, t) => {
        Promise.resolve().then(t.bind(t, 85470));
      },
      19771: (e) => {
        "use strict";
        e.exports = require("process");
      },
      21820: (e) => {
        "use strict";
        e.exports = require("os");
      },
      24131: (e, r, t) => {
        "use strict";
        t.d(r, { A: () => s });
        let s = (0, t(95255).A)("MoreHorizontal", [
          ["circle", { cx: "12", cy: "12", r: "1", key: "41hilf" }],
          ["circle", { cx: "19", cy: "12", r: "1", key: "1wjl8i" }],
          ["circle", { cx: "5", cy: "12", r: "1", key: "1pcz8c" }],
        ]);
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
      46532: (e, r, t) => {
        "use strict";
        t.a(e, async (e, s) => {
          try {
            t.d(r, { E: () => d });
            var a = t(61268),
              n = t(86415),
              i = t(91635);
            t(84205);
            var o = t(15942),
              l = e([o]);
            o = (l.then ? (await l)() : l)[0];
            let c = (0, i.F)(
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
            function d({ className: e, variant: r, asChild: t = !1, ...s }) {
              let i = t ? n.DX : "span";
              return (0, a.jsx)(i, {
                "data-slot": "badge",
                className: (0, o.cn)(c({ variant: r }), e),
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
      63033: (e) => {
        "use strict";
        e.exports = require("next/dist/server/app-render/work-unit-async-storage.external.js");
      },
      63091: (e, r, t) => {
        "use strict";
        t.d(r, { A: () => s });
        let s = (0, t(95255).A)("RefreshCw", [
          [
            "path",
            {
              d: "M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8",
              key: "v9h5vc",
            },
          ],
          ["path", { d: "M21 3v5h-5", key: "1q7to0" }],
          [
            "path",
            {
              d: "M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16",
              key: "3uifl3",
            },
          ],
          ["path", { d: "M8 16H3v5", key: "1cv678" }],
        ]);
      },
      65996: (e, r, t) => {
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
          a = t(51293),
          n = t(59059),
          i = t(17770),
          o = {};
        for (let e in i)
          0 >
            [
              "default",
              "tree",
              "pages",
              "GlobalError",
              "__next_app__",
              "routeModule",
            ].indexOf(e) && (o[e] = () => i[e]);
        t.d(r, o);
        let l = {
            children: [
              "",
              {
                children: [
                  "(admin)",
                  {
                    children: [
                      "admin",
                      {
                        children: [
                          "scraping-logs",
                          {
                            children: [
                              "__PAGE__",
                              {},
                              {
                                page: [
                                  () =>
                                    Promise.resolve().then(t.bind(t, 85470)),
                                  "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\(admin)\\admin\\scraping-logs\\page.tsx",
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
          d = [
            "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\(admin)\\admin\\scraping-logs\\page.tsx",
          ],
          c = { require: t, loadChunk: () => Promise.resolve() },
          u = new s.AppPageRouteModule({
            definition: {
              kind: a.RouteKind.APP_PAGE,
              page: "/(admin)/admin/scraping-logs/page",
              pathname: "/admin/scraping-logs",
              bundlePath: "",
              filename: "",
              appPaths: [],
            },
            userland: { loaderTree: l },
          });
      },
      66042: (e, r, t) => {
        Promise.resolve().then(t.bind(t, 91876));
      },
      66321: (e, r, t) => {
        "use strict";
        t.a(e, async (e, s) => {
          try {
            t.d(r, {
              A0: () => d,
              BF: () => c,
              Hj: () => u,
              XI: () => l,
              nA: () => h,
              nd: () => p,
              r6: () => x,
            });
            var a = t(61268),
              n = t(84205),
              i = t(15942),
              o = e([i]);
            i = (o.then ? (await o)() : o)[0];
            let l = n.forwardRef(({ className: e, ...r }, t) =>
              (0, a.jsx)("div", {
                className: "relative w-full overflow-auto",
                children: (0, a.jsx)("table", {
                  ref: t,
                  className: (0, i.cn)("w-full caption-bottom text-sm", e),
                  ...r,
                }),
              }),
            );
            l.displayName = "Table";
            let d = n.forwardRef(({ className: e, ...r }, t) =>
              (0, a.jsx)("thead", {
                ref: t,
                className: (0, i.cn)("[&_tr]:border-b", e),
                ...r,
              }),
            );
            d.displayName = "TableHeader";
            let c = n.forwardRef(({ className: e, ...r }, t) =>
              (0, a.jsx)("tbody", {
                ref: t,
                className: (0, i.cn)("[&_tr:last-child]:border-0", e),
                ...r,
              }),
            );
            (c.displayName = "TableBody"),
              (n.forwardRef(({ className: e, ...r }, t) =>
                (0, a.jsx)("tfoot", {
                  ref: t,
                  className: (0, i.cn)(
                    "border-t bg-muted/50 font-medium [&>tr]:last:border-b-0",
                    e,
                  ),
                  ...r,
                }),
              ).displayName = "TableFooter");
            let u = n.forwardRef(({ className: e, ...r }, t) =>
              (0, a.jsx)("tr", {
                ref: t,
                className: (0, i.cn)(
                  "border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted",
                  e,
                ),
                ...r,
              }),
            );
            u.displayName = "TableRow";
            let p = n.forwardRef(({ className: e, ...r }, t) =>
              (0, a.jsx)("th", {
                ref: t,
                className: (0, i.cn)(
                  "h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0",
                  e,
                ),
                ...r,
              }),
            );
            p.displayName = "TableHead";
            let h = n.forwardRef(({ className: e, ...r }, t) =>
              (0, a.jsx)("td", {
                ref: t,
                className: (0, i.cn)(
                  "p-4 align-middle [&:has([role=checkbox])]:pr-0",
                  e,
                ),
                ...r,
              }),
            );
            h.displayName = "TableCell";
            let x = n.forwardRef(({ className: e, ...r }, t) =>
              (0, a.jsx)("caption", {
                ref: t,
                className: (0, i.cn)("mt-4 text-sm text-muted-foreground", e),
                ...r,
              }),
            );
            (x.displayName = "TableCaption"), s();
          } catch (e) {
            s(e);
          }
        });
      },
      67173: (e, r, t) => {
        "use strict";
        t.a(e, async (e, s) => {
          try {
            t.d(r, {
              Eb: () => f,
              Iu: () => h,
              M_: () => j,
              WA: () => g,
              cU: () => x,
              dK: () => p,
              n$: () => m,
            });
            var a = t(61268),
              n = t(10056),
              i = t(12335),
              o = t(24131),
              l = t(84205),
              d = t(15942),
              c = t(28909),
              u = e([d, c]);
            [d, c] = u.then ? (await u)() : u;
            let p = ({ className: e, ...r }) =>
              (0, a.jsx)("nav", {
                role: "navigation",
                "aria-label": "pagination",
                className: (0, d.cn)("mx-auto flex w-full justify-center", e),
                ...r,
              });
            p.displayName = "Pagination";
            let h = l.forwardRef(({ className: e, ...r }, t) =>
              (0, a.jsx)("ul", {
                ref: t,
                className: (0, d.cn)("flex flex-row items-center gap-1", e),
                ...r,
              }),
            );
            h.displayName = "PaginationContent";
            let x = l.forwardRef(({ className: e, ...r }, t) =>
              (0, a.jsx)("li", { ref: t, className: (0, d.cn)("", e), ...r }),
            );
            x.displayName = "PaginationItem";
            let m = ({ className: e, isActive: r, size: t = "icon", ...s }) =>
              (0, a.jsx)("a", {
                "aria-current": r ? "page" : void 0,
                className: (0, d.cn)(
                  (0, c.r)({ variant: r ? "outline" : "ghost", size: t }),
                  e,
                ),
                ...s,
              });
            m.displayName = "PaginationLink";
            let f = ({ className: e, ...r }) =>
              (0, a.jsxs)(m, {
                "aria-label": "Go to previous page",
                size: "default",
                className: (0, d.cn)("gap-1 pl-2.5", e),
                ...r,
                children: [
                  (0, a.jsx)(n.A, { className: "h-4 w-4" }),
                  (0, a.jsx)("span", { children: "Previous" }),
                ],
              });
            f.displayName = "PaginationPrevious";
            let g = ({ className: e, ...r }) =>
              (0, a.jsxs)(m, {
                "aria-label": "Go to next page",
                size: "default",
                className: (0, d.cn)("gap-1 pr-2.5", e),
                ...r,
                children: [
                  (0, a.jsx)("span", { children: "Next" }),
                  (0, a.jsx)(i.A, { className: "h-4 w-4" }),
                ],
              });
            g.displayName = "PaginationNext";
            let j = ({ className: e, ...r }) =>
              (0, a.jsxs)("span", {
                "aria-hidden": !0,
                className: (0, d.cn)(
                  "flex h-9 w-9 items-center justify-center",
                  e,
                ),
                ...r,
                children: [
                  (0, a.jsx)(o.A, { className: "h-4 w-4" }),
                  (0, a.jsx)("span", {
                    className: "sr-only",
                    children: "More pages",
                  }),
                ],
              });
            (j.displayName = "PaginationEllipsis"), s();
          } catch (e) {
            s(e);
          }
        });
      },
      73024: (e) => {
        "use strict";
        e.exports = require("node:fs");
      },
      73566: (e) => {
        "use strict";
        e.exports = require("worker_threads");
      },
      73940: (e, r, t) => {
        "use strict";
        t.d(r, { H: () => i });
        var s = t(65223),
          a = t(23047),
          n = t(46837);
        function i(e, r) {
          let t,
            i,
            m = () => (0, a.w)(r?.in, NaN),
            f = r?.additionalDigits ?? 2,
            g = (function (e) {
              let r,
                t = {},
                s = e.split(o.dateTimeDelimiter);
              if (s.length > 2) return t;
              if (
                (/:/.test(s[0])
                  ? (r = s[0])
                  : ((t.date = s[0]),
                    (r = s[1]),
                    o.timeZoneDelimiter.test(t.date) &&
                      ((t.date = e.split(o.timeZoneDelimiter)[0]),
                      (r = e.substr(t.date.length, e.length)))),
                r)
              ) {
                let e = o.timezone.exec(r);
                e
                  ? ((t.time = r.replace(e[1], "")), (t.timezone = e[1]))
                  : (t.time = r);
              }
              return t;
            })(e);
          if (g.date) {
            let e = (function (e, r) {
              let t = RegExp(
                  "^(?:(\\d{4}|[+-]\\d{" +
                    (4 + r) +
                    "})|(\\d{2}|[+-]\\d{" +
                    (2 + r) +
                    "})$)",
                ),
                s = e.match(t);
              if (!s) return { year: NaN, restDateString: "" };
              let a = s[1] ? parseInt(s[1]) : null,
                n = s[2] ? parseInt(s[2]) : null;
              return {
                year: null === n ? a : 100 * n,
                restDateString: e.slice((s[1] || s[2]).length),
              };
            })(g.date, f);
            t = (function (e, r) {
              var t, s, a, n, i, o, d, c;
              if (null === r) return new Date(NaN);
              let p = e.match(l);
              if (!p) return new Date(NaN);
              let m = !!p[4],
                f = u(p[1]),
                g = u(p[2]) - 1,
                j = u(p[3]),
                y = u(p[4]),
                v = u(p[5]) - 1;
              if (m) {
                return ((t = 0),
                (s = y),
                (a = v),
                s >= 1 && s <= 53 && a >= 0 && a <= 6)
                  ? (function (e, r, t) {
                      let s = new Date(0);
                      s.setUTCFullYear(e, 0, 4);
                      let a = s.getUTCDay() || 7;
                      return (
                        s.setUTCDate(
                          s.getUTCDate() + ((r - 1) * 7 + t + 1 - a),
                        ),
                        s
                      );
                    })(r, y, v)
                  : new Date(NaN);
              }
              {
                let e = new Date(0);
                return ((n = r),
                (i = g),
                (o = j),
                i >= 0 &&
                  i <= 11 &&
                  o >= 1 &&
                  o <= (h[i] || (x(n) ? 29 : 28)) &&
                  ((d = r), (c = f) >= 1 && c <= (x(d) ? 366 : 365)))
                  ? (e.setUTCFullYear(r, g, Math.max(f, j)), e)
                  : new Date(NaN);
              }
            })(e.restDateString, e.year);
          }
          if (!t || isNaN(+t)) return m();
          let j = +t,
            y = 0;
          if (
            g.time &&
            isNaN(
              (y = (function (e) {
                var r, t, a;
                let n = e.match(d);
                if (!n) return NaN;
                let i = p(n[1]),
                  o = p(n[2]),
                  l = p(n[3]);
                return ((r = i),
                (t = o),
                (a = l),
                24 === r
                  ? 0 === t && 0 === a
                  : a >= 0 && a < 60 && t >= 0 && t < 60 && r >= 0 && r < 25)
                  ? i * s.s0 + o * s.Cg + 1e3 * l
                  : NaN;
              })(g.time)),
            )
          )
            return m();
          if (g.timezone) {
            if (
              isNaN(
                (i = (function (e) {
                  var r, t;
                  if ("Z" === e) return 0;
                  let a = e.match(c);
                  if (!a) return 0;
                  let n = "+" === a[1] ? -1 : 1,
                    i = parseInt(a[2]),
                    o = (a[3] && parseInt(a[3])) || 0;
                  return ((r = 0), (t = o) >= 0 && t <= 59)
                    ? n * (i * s.s0 + o * s.Cg)
                    : NaN;
                })(g.timezone)),
              )
            )
              return m();
          } else {
            let e = new Date(j + y),
              t = (0, n.a)(0, r?.in);
            return (
              t.setFullYear(
                e.getUTCFullYear(),
                e.getUTCMonth(),
                e.getUTCDate(),
              ),
              t.setHours(
                e.getUTCHours(),
                e.getUTCMinutes(),
                e.getUTCSeconds(),
                e.getUTCMilliseconds(),
              ),
              t
            );
          }
          return (0, n.a)(j + y + i, r?.in);
        }
        let o = {
            dateTimeDelimiter: /[T ]/,
            timeZoneDelimiter: /[Z ]/i,
            timezone: /([Z+-].*)$/,
          },
          l = /^-?(?:(\d{3})|(\d{2})(?:-?(\d{2}))?|W(\d{2})(?:-?(\d{1}))?|)$/,
          d =
            /^(\d{2}(?:[.,]\d*)?)(?::?(\d{2}(?:[.,]\d*)?))?(?::?(\d{2}(?:[.,]\d*)?))?$/,
          c = /^([+-])(\d{2})(?::?(\d{2}))?$/;
        function u(e) {
          return e ? parseInt(e) : 1;
        }
        function p(e) {
          return (e && parseFloat(e.replace(",", "."))) || 0;
        }
        let h = [31, null, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        function x(e) {
          return e % 400 == 0 || (e % 4 == 0 && e % 100 != 0);
        }
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
      79551: (e) => {
        "use strict";
        e.exports = require("url");
      },
      79646: (e) => {
        "use strict";
        e.exports = require("child_process");
      },
      80069: (e, r, t) => {
        "use strict";
        t.d(r, { A: () => s });
        let s = (0, t(95255).A)("ExternalLink", [
          ["path", { d: "M15 3h6v6", key: "1q9fwt" }],
          ["path", { d: "M10 14 21 3", key: "gplh6r" }],
          [
            "path",
            {
              d: "M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6",
              key: "a6xqqp",
            },
          ],
        ]);
      },
      80481: (e) => {
        "use strict";
        e.exports = require("node:readline");
      },
      83997: (e) => {
        "use strict";
        e.exports = require("tty");
      },
      84297: (e) => {
        "use strict";
        e.exports = require("async_hooks");
      },
      85470: (e, r, t) => {
        "use strict";
        let s;
        t.r(r),
          t.d(r, {
            default: () => h,
            generateImageMetadata: () => u,
            generateMetadata: () => c,
            generateViewport: () => p,
          });
        var a = t(63033),
          n = t(26394),
          i = t(60442),
          o = (0, n.registerClientReference)(
            function () {
              throw Error(
                "Attempted to call the default export of \"E:\\\\downloads\\\\Hijraah\\\\apps\\\\web\\\\src\\\\app\\\\(admin)\\\\admin\\\\scraping-logs\\\\page.tsx\" from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
              );
            },
            "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\(admin)\\admin\\scraping-logs\\page.tsx",
            "default",
          );
        let l = { ...a },
          d =
            "workUnitAsyncStorage" in l
              ? l.workUnitAsyncStorage
              : "requestAsyncStorage" in l
                ? l.requestAsyncStorage
                : void 0;
        s =
          "function" == typeof o
            ? new Proxy(o, {
                apply: (e, r, t) => {
                  let s, a, n;
                  try {
                    let e = d?.getStore();
                    (s = e?.headers.get("sentry-trace") ?? void 0),
                      (a = e?.headers.get("baggage") ?? void 0),
                      (n = e?.headers);
                  } catch (e) {}
                  return i
                    .wrapServerComponentWithSentry(e, {
                      componentRoute: "/(admin)/admin/scraping-logs",
                      componentType: "Page",
                      sentryTraceHeader: s,
                      baggageHeader: a,
                      headers: n,
                    })
                    .apply(r, t);
                },
              })
            : o;
        let c = void 0,
          u = void 0,
          p = void 0,
          h = s;
      },
      85488: (e) => {
        "use strict";
        e.exports = import("ai");
      },
      86592: (e) => {
        "use strict";
        e.exports = require("node:inspector");
      },
      90286: (e, r, t) => {
        "use strict";
        t.d(r, { A: () => s });
        let s = (0, t(95255).A)("ArrowLeft", [
          ["path", { d: "m12 19-7-7 7-7", key: "1l729n" }],
          ["path", { d: "M19 12H5", key: "x3x0zl" }],
        ]);
      },
      91876: (e, r, t) => {
        "use strict";
        t.a(e, async (e, s) => {
          try {
            t.r(r), t.d(r, { default: () => b });
            var a = t(61268),
              n = t(81578),
              i = t(73940),
              o = t(90286),
              l = t(63091),
              d = t(80069),
              c = t(31655),
              u = t.n(c),
              p = t(84205),
              h = t(46532),
              x = t(28909),
              m = t(5451),
              f = t(67173),
              g = t(94812),
              j = t(66321),
              y = t(15090),
              v = e([h, x, m, f, g, j]);
            function b() {
              let { toast: e } = (0, y.d)(),
                [r, t] = (0, p.useState)(!0),
                [s, c] = (0, p.useState)([]),
                [v, b] = (0, p.useState)([]),
                [w, N] = (0, p.useState)(1),
                [A, T] = (0, p.useState)(1),
                [S, _] = (0, p.useState)("logs"),
                k = (0, p.useCallback)(async () => {
                  try {
                    let e = await fetch(`/api/admin/scraping-logs?page=${w}`);
                    if (!e.ok) throw Error("Failed to fetch scraping logs");
                    let r = await e.json();
                    c(r.logs), T(r.totalPages || 1);
                  } catch (e) {
                    throw (
                      (console.error("Error fetching scraping logs:", e), e)
                    );
                  }
                }, [w]),
                E = (0, p.useCallback)(async () => {
                  try {
                    let e = await fetch(`/api/admin/scrape-history?page=${w}`);
                    if (!e.ok) throw Error("Failed to fetch scrape history");
                    let r = await e.json();
                    b(r.history), T(r.totalPages || 1);
                  } catch (e) {
                    throw (
                      (console.error("Error fetching scrape history:", e), e)
                    );
                  }
                }, [w]),
                C = (0, p.useCallback)(async () => {
                  t(!0);
                  try {
                    "logs" === S ? await k() : await E();
                  } catch (r) {
                    console.error(`Error fetching ${S}:`, r),
                      e({
                        title: "Error",
                        description: `Failed to fetch ${S}`,
                        variant: "destructive",
                      });
                  } finally {
                    t(!1);
                  }
                }, [S, k, E, e]),
                D = (e) => {
                  try {
                    return (0, n.GP)((0, i.H)(e), "MMM d, yyyy HH:mm:ss");
                  } catch (r) {
                    return e;
                  }
                },
                q = (e) =>
                  e >= 200 && e < 300
                    ? (0, a.jsx)(h.E, {
                        variant: "default",
                        children: "Success",
                      })
                    : e >= 400 && e < 500
                      ? (0, a.jsx)(h.E, {
                          variant: "secondary",
                          children: "Client Error",
                        })
                      : e >= 500
                        ? (0, a.jsx)(h.E, {
                            variant: "destructive",
                            children: "Server Error",
                          })
                        : (0, a.jsx)(h.E, {
                            variant: "outline",
                            children: "Unknown",
                          }),
                M = (e) =>
                  "success" === e
                    ? (0, a.jsx)(h.E, {
                        variant: "default",
                        children: "Success",
                      })
                    : "error" === e
                      ? (0, a.jsx)(h.E, {
                          variant: "destructive",
                          children: "Error",
                        })
                      : (0, a.jsx)(h.E, {
                          variant: "secondary",
                          children: "Pending",
                        }),
                P = async (e) => {
                  C();
                },
                R = (e) => {
                  N(e);
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
                              (0, a.jsx)(x.$, {
                                variant: "outline",
                                size: "icon",
                                asChild: !0,
                                children: (0, a.jsx)(u(), {
                                  href: "/admin",
                                  legacyBehavior: !0,
                                  children: (0, a.jsx)(o.A, {
                                    className: "h-4 w-4",
                                  }),
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
                          (0, a.jsxs)(x.$, {
                            variant: "outline",
                            onClick: P,
                            children: [
                              (0, a.jsx)(l.A, { className: "mr-2 h-4 w-4" }),
                              " Refresh",
                            ],
                          }),
                          (0, a.jsx)(x.$, {
                            asChild: !0,
                            children: (0, a.jsx)(u(), {
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
                          onClick: () => _("logs"),
                          className: `py-2 px-4 border-b-2 ${"logs" === S ? "border-primary text-primary font-medium" : "border-transparent text-muted-foreground"}`,
                          children: "Cron Job Logs",
                        }),
                        (0, a.jsx)("button", {
                          onClick: () => _("history"),
                          className: `py-2 px-4 border-b-2 ${"history" === S ? "border-primary text-primary font-medium" : "border-transparent text-muted-foreground"}`,
                          children: "Scrape History",
                        }),
                      ],
                    }),
                  }),
                  r
                    ? (0, a.jsxs)(m.Zp, {
                        children: [
                          (0, a.jsxs)(m.aR, {
                            children: [
                              (0, a.jsx)(g.E, { className: "h-8 w-64 mb-2" }),
                              (0, a.jsx)(g.E, { className: "h-4 w-full" }),
                            ],
                          }),
                          (0, a.jsx)(m.Wu, {
                            children: (0, a.jsx)("div", {
                              className: "space-y-2",
                              children: [, , , , ,]
                                .fill(0)
                                .map((e, r) =>
                                  (0, a.jsx)(
                                    g.E,
                                    { className: "h-12 w-full" },
                                    r,
                                  ),
                                ),
                            }),
                          }),
                        ],
                      })
                    : "logs" === S
                      ? (0, a.jsxs)(m.Zp, {
                          children: [
                            (0, a.jsxs)(m.aR, {
                              children: [
                                (0, a.jsx)(m.ZB, {
                                  children: "Scheduled Job Execution Logs",
                                }),
                                (0, a.jsx)(m.BT, {
                                  children:
                                    "Records of each time the scheduled scraping job ran",
                                }),
                              ],
                            }),
                            (0, a.jsx)(m.Wu, {
                              children:
                                0 === s.length
                                  ? (0, a.jsx)("div", {
                                      className: "text-center py-6",
                                      children: (0, a.jsx)("p", {
                                        className: "text-muted-foreground",
                                        children: "No scraping logs found",
                                      }),
                                    })
                                  : (0, a.jsx)("div", {
                                      className: "overflow-x-auto",
                                      children: (0, a.jsxs)(j.XI, {
                                        children: [
                                          (0, a.jsx)(j.A0, {
                                            children: (0, a.jsxs)(j.Hj, {
                                              children: [
                                                (0, a.jsx)(j.nd, {
                                                  children: "Timestamp",
                                                }),
                                                (0, a.jsx)(j.nd, {
                                                  children: "Status",
                                                }),
                                                (0, a.jsx)(j.nd, {
                                                  children: "Message",
                                                }),
                                              ],
                                            }),
                                          }),
                                          (0, a.jsx)(j.BF, {
                                            children: s.map((e) =>
                                              (0, a.jsxs)(
                                                j.Hj,
                                                {
                                                  children: [
                                                    (0, a.jsx)(j.nA, {
                                                      className:
                                                        "font-mono text-sm",
                                                      children: D(
                                                        e.triggered_at,
                                                      ),
                                                    }),
                                                    (0, a.jsx)(j.nA, {
                                                      children: q(
                                                        e.status_code,
                                                      ),
                                                    }),
                                                    (0, a.jsx)(j.nA, {
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
                      : (0, a.jsxs)(m.Zp, {
                          children: [
                            (0, a.jsxs)(m.aR, {
                              children: [
                                (0, a.jsx)(m.ZB, {
                                  children: "Individual Scrape History",
                                }),
                                (0, a.jsx)(m.BT, {
                                  children:
                                    "History of individual source scraping attempts and results",
                                }),
                              ],
                            }),
                            (0, a.jsx)(m.Wu, {
                              children:
                                0 === v.length
                                  ? (0, a.jsx)("div", {
                                      className: "text-center py-6",
                                      children: (0, a.jsx)("p", {
                                        className: "text-muted-foreground",
                                        children: "No scrape history found",
                                      }),
                                    })
                                  : (0, a.jsx)("div", {
                                      className: "overflow-x-auto",
                                      children: (0, a.jsxs)(j.XI, {
                                        children: [
                                          (0, a.jsx)(j.A0, {
                                            children: (0, a.jsxs)(j.Hj, {
                                              children: [
                                                (0, a.jsx)(j.nd, {
                                                  children: "Timestamp",
                                                }),
                                                (0, a.jsx)(j.nd, {
                                                  children: "Source",
                                                }),
                                                (0, a.jsx)(j.nd, {
                                                  children: "Status",
                                                }),
                                                (0, a.jsx)(j.nd, {
                                                  children: "Changes",
                                                }),
                                                (0, a.jsx)(j.nd, {
                                                  children: "Message/Error",
                                                }),
                                                (0, a.jsx)(j.nd, {
                                                  children: "Document",
                                                }),
                                              ],
                                            }),
                                          }),
                                          (0, a.jsx)(j.BF, {
                                            children: v.map((e) =>
                                              (0, a.jsxs)(
                                                j.Hj,
                                                {
                                                  children: [
                                                    (0, a.jsx)(j.nA, {
                                                      className:
                                                        "font-mono text-sm",
                                                      children: D(e.scraped_at),
                                                    }),
                                                    (0, a.jsxs)(j.nA, {
                                                      children: [
                                                        e.source_name ||
                                                          e.source_id,
                                                        e.source_url &&
                                                          (0, a.jsx)("a", {
                                                            href: e.source_url,
                                                            target: "_blank",
                                                            rel: "noopener noreferrer",
                                                            className:
                                                              "ml-2 inline-flex items-center text-xs text-muted-foreground hover:text-foreground",
                                                            children: (0,
                                                            a.jsx)(d.A, {
                                                              className:
                                                                "h-3 w-3",
                                                            }),
                                                          }),
                                                      ],
                                                    }),
                                                    (0, a.jsx)(j.nA, {
                                                      children: M(e.status),
                                                    }),
                                                    (0, a.jsx)(j.nA, {
                                                      children:
                                                        "success" ===
                                                          e.status &&
                                                        (0, a.jsx)(h.E, {
                                                          variant: e.has_changes
                                                            ? "outline"
                                                            : "secondary",
                                                          children:
                                                            e.has_changes
                                                              ? "Changes Detected"
                                                              : "No Changes",
                                                        }),
                                                    }),
                                                    (0, a.jsx)(j.nA, {
                                                      className:
                                                        "max-w-md truncate",
                                                      children:
                                                        e.error_message ||
                                                        (e.has_changes
                                                          ? e.change_summary
                                                          : "Successful scrape"),
                                                    }),
                                                    (0, a.jsx)(j.nA, {
                                                      children:
                                                        e.artifact_id &&
                                                        (0, a.jsx)(x.$, {
                                                          variant: "outline",
                                                          size: "sm",
                                                          asChild: !0,
                                                          children: (0, a.jsx)(
                                                            u(),
                                                            {
                                                              href: `/documents/${e.artifact_id}`,
                                                              children: "View",
                                                            },
                                                          ),
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
                  A > 1 &&
                    (0, a.jsx)(f.dK, {
                      className: "mt-4",
                      children: (0, a.jsxs)(f.Iu, {
                        children: [
                          (0, a.jsx)(f.cU, {
                            children: (0, a.jsx)(f.Eb, {
                              href: "#",
                              onClick: (e) => {
                                e.preventDefault(), w > 1 && R(w - 1);
                              },
                              className:
                                1 === w ? "pointer-events-none opacity-50" : "",
                            }),
                          }),
                          Array.from({ length: Math.min(5, A) }, (e, r) => {
                            let t;
                            return (
                              (t =
                                A <= 5 || w <= 3
                                  ? r + 1
                                  : w >= A - 2
                                    ? A - 4 + r
                                    : w - 2 + r),
                              (0, a.jsx)(
                                f.cU,
                                {
                                  children: (0, a.jsx)(f.n$, {
                                    href: "#",
                                    onClick: (e) => {
                                      e.preventDefault(), R(t);
                                    },
                                    isActive: w === t,
                                    children: t,
                                  }),
                                },
                                r,
                              )
                            );
                          }),
                          A > 5 &&
                            w < A - 2 &&
                            (0, a.jsxs)(a.Fragment, {
                              children: [
                                (0, a.jsx)(f.cU, {
                                  children: (0, a.jsx)(f.M_, {}),
                                }),
                                (0, a.jsx)(f.cU, {
                                  children: (0, a.jsx)(f.n$, {
                                    href: "#",
                                    onClick: (e) => {
                                      e.preventDefault(), R(A);
                                    },
                                    children: A,
                                  }),
                                }),
                              ],
                            }),
                          (0, a.jsx)(f.cU, {
                            children: (0, a.jsx)(f.WA, {
                              href: "#",
                              onClick: (e) => {
                                e.preventDefault(), w < A && R(w + 1);
                              },
                              className:
                                w === A ? "pointer-events-none opacity-50" : "",
                            }),
                          }),
                        ],
                      }),
                    }),
                ],
              });
            }
            ([h, x, m, f, g, j] = v.then ? (await v)() : v), s();
          } catch (e) {
            s(e);
          }
        });
      },
      94735: (e) => {
        "use strict";
        e.exports = require("events");
      },
      94812: (e, r, t) => {
        "use strict";
        t.a(e, async (e, s) => {
          try {
            t.d(r, { E: () => o });
            var a = t(61268),
              n = t(15942),
              i = e([n]);
            function o({ className: e, ...r }) {
              return (0, a.jsx)("div", {
                "data-slot": "skeleton",
                className: (0, n.cn)("bg-accent animate-pulse rounded-md", e),
                ...r,
              });
            }
            (n = (i.then ? (await i)() : i)[0]), s();
          } catch (e) {
            s(e);
          }
        });
      },
      95255: (e, r, t) => {
        "use strict";
        t.d(r, { A: () => i });
        var s = t(84205),
          a = {
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
        let n = (e) =>
            e
              .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
              .toLowerCase()
              .trim(),
          i = (e, r) => {
            let t = (0, s.forwardRef)(
              (
                {
                  color: t = "currentColor",
                  size: i = 24,
                  strokeWidth: o = 2,
                  absoluteStrokeWidth: l,
                  className: d = "",
                  children: c,
                  ...u
                },
                p,
              ) =>
                (0, s.createElement)(
                  "svg",
                  {
                    ref: p,
                    ...a,
                    width: i,
                    height: i,
                    stroke: t,
                    strokeWidth: l ? (24 * Number(o)) / Number(i) : o,
                    className: ["lucide", `lucide-${n(e)}`, d].join(" "),
                    ...u,
                  },
                  [
                    ...r.map(([e, r]) => (0, s.createElement)(e, r)),
                    ...(Array.isArray(c) ? c : [c]),
                  ],
                ),
            );
            return (t.displayName = `${e}`), t;
          };
      },
    });
  var r = require("../../../../webpack-runtime.js");
  r.C(e);
  var t = (e) => r((r.s = e)),
    s = r.X(0, [827, 6518, 2033, 4027, 1655, 5728, 7272, 1578, 4630], () =>
      t(65996),
    );
  module.exports = s;
})();
//# sourceMappingURL=page.js.map
