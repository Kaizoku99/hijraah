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
    (e._sentryDebugIds[r] = "d1e87dd8-b514-4e7c-96c2-cfef0ba98800"),
    (e._sentryDebugIdIdentifier =
      "sentry-dbid-d1e87dd8-b514-4e7c-96c2-cfef0ba98800"));
} catch (e) {}
(() => {
  var e = {};
  (e.id = 6857),
    (e.ids = [4630, 6857]),
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
              Zp: () => l,
              aR: () => c,
              wL: () => m,
            });
            var a = t(61268),
              o = t(55728),
              n = t(84205),
              i = t(15942),
              d = e([i]);
            i = (d.then ? (await d)() : d)[0];
            let l = n.forwardRef(({ className: e, ...r }, t) =>
              (0, a.jsx)(o.P.div, {
                ref: t,
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
                ...r,
              }),
            );
            l.displayName = "Card";
            let c = n.forwardRef(({ className: e, ...r }, t) =>
              (0, a.jsx)("div", {
                ref: t,
                className: (0, i.cn)("flex flex-col space-y-1.5 p-6", e),
                ...r,
              }),
            );
            c.displayName = "CardHeader";
            let u = n.forwardRef(({ className: e, ...r }, t) =>
              (0, a.jsx)("h3", {
                ref: t,
                className: (0, i.cn)(
                  "text-2xl font-semibold leading-none tracking-tight",
                  e,
                ),
                ...r,
              }),
            );
            u.displayName = "CardTitle";
            let p = n.forwardRef(({ className: e, ...r }, t) =>
              (0, a.jsx)("p", {
                ref: t,
                className: (0, i.cn)("text-sm text-muted-foreground", e),
                ...r,
              }),
            );
            p.displayName = "CardDescription";
            let h = n.forwardRef(({ className: e, ...r }, t) =>
              (0, a.jsx)("div", {
                ref: t,
                className: (0, i.cn)("p-6 pt-0", e),
                ...r,
              }),
            );
            h.displayName = "CardContent";
            let m = n.forwardRef(({ className: e, ...r }, t) =>
              (0, a.jsx)("div", {
                ref: t,
                className: (0, i.cn)("flex items-center p-6 pt-0", e),
                ...r,
              }),
            );
            (m.displayName = "CardFooter"), s();
          } catch (e) {
            s(e);
          }
        });
      },
      8086: (e) => {
        "use strict";
        e.exports = require("module");
      },
      8963: (e) => {
        function r(e) {
          var r = Error("Cannot find module '" + e + "'");
          throw ((r.code = "MODULE_NOT_FOUND"), r);
        }
        (r.keys = () => []), (r.resolve = r), (r.id = 8963), (e.exports = r);
      },
      10846: (e) => {
        "use strict";
        e.exports = require("next/dist/compiled/next-server/app-page.runtime.prod.js");
      },
      11997: (e) => {
        "use strict";
        e.exports = require("punycode");
      },
      15942: (e, r, t) => {
        "use strict";
        t.a(e, async (e, s) => {
          try {
            t.d(r, {
              Cq: () => c,
              GO: () => p,
              cn: () => d,
              lk: () => l,
              y8: () => u,
            });
            var a = t(85488);
            t(3477);
            var o = t(79029),
              n = t(58360),
              i = e([a]);
            function d(...e) {
              return (0, n.QP)((0, o.$)(e));
            }
            function l() {
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
            function c(e) {
              if (0 === e) return "0 Bytes";
              let r = Math.floor(Math.log(e) / Math.log(1024));
              return (
                parseFloat((e / Math.pow(1024, r)).toFixed(2)) +
                " " +
                ["Bytes", "KB", "MB", "GB", "TB"][r]
              );
            }
            a = (i.then ? (await i)() : i)[0];
            let p = async (e) => {
              let r = await fetch(e);
              if (!r.ok) {
                let e = Error("An error occurred while fetching the data.");
                try {
                  e.info = await r.json();
                } catch (t) {
                  e.info = r.statusText;
                }
                throw ((e.status = r.status), e);
              }
              return r.json();
            };
            function u(e) {
              return e.map((e) => {
                var r;
                return {
                  ...e,
                  content:
                    ((r = e.content),
                    "string" != typeof r
                      ? ""
                      : r.replace(/<has_function_call>/g, "")),
                };
              });
            }
            s();
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
      20892: (e, r, t) => {
        "use strict";
        t.r(r),
          t.d(r, {
            GlobalError: () => o.default,
            __next_app__: () => c,
            pages: () => l,
            routeModule: () => u,
            tree: () => d,
          });
        var s = t(11610),
          a = t(51293),
          o = t(59059),
          n = t(17770),
          i = {};
        for (let e in n)
          0 >
            [
              "default",
              "tree",
              "pages",
              "GlobalError",
              "__next_app__",
              "routeModule",
            ].indexOf(e) && (i[e] = () => n[e]);
        t.d(r, i);
        let d = {
            children: [
              "",
              {
                children: [
                  "[locale]",
                  {
                    children: [
                      "dashboard",
                      {
                        children: [
                          "cases",
                          {
                            children: [
                              "new",
                              {
                                children: [
                                  "__PAGE__",
                                  {},
                                  {
                                    page: [
                                      () =>
                                        Promise.resolve().then(
                                          t.bind(t, 43006),
                                        ),
                                      "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\[locale]\\dashboard\\cases\\new\\page.tsx",
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
                      {},
                    ],
                  },
                  {
                    layout: [
                      () => Promise.resolve().then(t.bind(t, 63249)),
                      "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\[locale]\\layout.tsx",
                    ],
                    "not-found": [
                      () => Promise.resolve().then(t.bind(t, 47995)),
                      "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\[locale]\\not-found.tsx",
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
          l = [
            "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\[locale]\\dashboard\\cases\\new\\page.tsx",
          ],
          c = { require: t, loadChunk: () => Promise.resolve() },
          u = new s.AppPageRouteModule({
            definition: {
              kind: a.RouteKind.APP_PAGE,
              page: "/[locale]/dashboard/cases/new/page",
              pathname: "/[locale]/dashboard/cases/new",
              bundlePath: "",
              filename: "",
              appPaths: [],
            },
            userland: { loaderTree: d },
          });
      },
      21820: (e) => {
        "use strict";
        e.exports = require("os");
      },
      22630: (e, r, t) => {
        "use strict";
        let s;
        t.r(r),
          t.d(r, {
            default: () => b,
            dynamic: () => p,
            generateImageMetadata: () => f,
            generateMetadata: () => g,
            generateViewport: () => v,
            maxDuration: () => h,
            metadata: () => c,
            viewport: () => u,
          });
        var a = t(63033),
          o = t(35242);
        t(93206);
        var n = t(51433),
          i = t(59107),
          d = t(39862),
          l = t(60442);
        let c = {
            title: {
              default: "Hijraah - Navigate Your Immigration Journey",
              template: "%s | Hijraah",
            },
            metadataBase: new URL("https://hijraah.vercel.app"),
            description:
              "Navigate your immigration journey with AI guidance - Compare immigration policies across countries with intelligent insights",
            keywords: [
              "immigration",
              "visa",
              "comparison",
              "countries",
              "policies",
              "AI guidance",
              "immigration journey",
            ],
            authors: [{ name: "Hijraah Team" }],
            creator: "Hijraah",
            icons: { icon: "/Hijraah_logo.png", apple: "/Hijraah_logo.png" },
            openGraph: {
              type: "website",
              locale: "en_US",
              url: "https://hijraah.vercel.app",
              title: "Hijraah - Immigration Comparison",
              description:
                "Compare immigration policies across countries with AI-powered insights",
              siteName: "Hijraah",
              images: [
                {
                  url: "/Hijraah_logo.png",
                  width: 800,
                  height: 800,
                  alt: "Hijraah Logo",
                },
              ],
            },
            twitter: {
              card: "summary_large_image",
              title: "Hijraah - Immigration Comparison",
              description:
                "Compare immigration policies across countries with AI-powered insights",
              creator: "@hijraah",
              images: ["/Hijraah_logo.png"],
            },
            robots: { index: !0, follow: !0 },
          },
          u = {
            themeColor: [
              { media: "(prefers-color-scheme: light)", color: "white" },
              { media: "(prefers-color-scheme: dark)", color: "#18181b" },
            ],
            width: "device-width",
            initialScale: 1,
          },
          p = "force-dynamic",
          h = 60,
          m = { ...a },
          x =
            "workUnitAsyncStorage" in m
              ? m.workUnitAsyncStorage
              : "requestAsyncStorage" in m
                ? m.requestAsyncStorage
                : void 0;
        s = new Proxy(
          function ({ children: e }) {
            let r = { plugins: [] };
            return (0, o.jsxs)(o.Fragment, {
              children: [
                e,
                (0, o.jsx)(i.Analytics, {}),
                (0, o.jsx)(d.SpeedInsights, {}),
                r && (0, o.jsx)(n.StagewiseToolbar, { config: r }),
              ],
            });
          },
          {
            apply: (e, r, t) => {
              let s, a, o;
              try {
                let e = x?.getStore();
                (s = e?.headers.get("sentry-trace") ?? void 0),
                  (a = e?.headers.get("baggage") ?? void 0),
                  (o = e?.headers);
              } catch (e) {}
              return l
                .wrapServerComponentWithSentry(e, {
                  componentRoute: "/",
                  componentType: "Layout",
                  sentryTraceHeader: s,
                  baggageHeader: a,
                  headers: o,
                })
                .apply(r, t);
            },
          },
        );
        let g = void 0,
          f = void 0,
          v = void 0,
          b = s;
      },
      23316: (e, r, t) => {
        "use strict";
        t.a(e, async (e, s) => {
          try {
            t.r(r), t.d(r, { default: () => m });
            var a = t(61268),
              o = t(89882),
              n = t(95124),
              i = t(98654),
              d = t(5451),
              l = t(72015),
              c = t(79366),
              u = t(58702),
              p = t(15942),
              h = e([d, l, p]);
            [d, l, p] = h.then ? (await h)() : h;
            let x = async (e) =>
              (await new Promise((e) => setTimeout(e, 1e3)),
              Math.random() > 0.1)
                ? { success: !0 }
                : {
                    success: !1,
                    error:
                      "Failed to create case due to a simulated network error.",
                  };
            function m() {
              let e = (0, n.useTranslations)("newCaseForm"),
                r = (0, o.useRouter)(),
                t = (0, c.p)(),
                s = (0, u.V8)(t),
                h = async (e) => {
                  let s = { ...e, status: "pending" },
                    a = await x(s);
                  a.success
                    ? (i.oR.success("Case created successfully!"),
                      r.push(`/${t}/dashboard/cases`))
                    : i.oR.error(
                        `Error creating case: ${a.error || "Unknown error"}`,
                      );
                };
              return (0, a.jsx)("div", {
                className: (0, p.cn)(
                  "p-4 md:p-6 lg:p-8 max-w-2xl mx-auto",
                  s ? "rtl" : "ltr",
                ),
                dir: s ? "rtl" : "ltr",
                children: (0, a.jsxs)(d.Zp, {
                  children: [
                    (0, a.jsx)(d.aR, {
                      children: (0, a.jsx)(d.ZB, { children: e("title") }),
                    }),
                    (0, a.jsx)(d.Wu, {
                      children: (0, a.jsx)(l.Y, {
                        onSubmit: h,
                        onCancel: () => {
                          r.push(`/${t}/dashboard/cases`);
                        },
                      }),
                    }),
                  ],
                }),
              });
            }
            s();
          } catch (e) {
            s(e);
          }
        });
      },
      26564: (e) => {
        function r(e) {
          var r = Error("Cannot find module '" + e + "'");
          throw ((r.code = "MODULE_NOT_FOUND"), r);
        }
        (r.keys = () => []), (r.resolve = r), (r.id = 26564), (e.exports = r);
      },
      27910: (e) => {
        "use strict";
        e.exports = require("stream");
      },
      28169: (e, r, t) => {
        Promise.resolve().then(t.bind(t, 87113));
      },
      28191: (e, r, t) => {
        Promise.resolve().then(t.bind(t, 84792)),
          Promise.resolve().then(t.bind(t, 66561)),
          Promise.resolve().then(t.bind(t, 25052));
      },
      28354: (e) => {
        "use strict";
        e.exports = require("util");
      },
      28909: (e, r, t) => {
        "use strict";
        t.a(e, async (e, s) => {
          try {
            t.d(r, { $: () => l, r: () => c });
            var a = t(61268),
              o = t(86415),
              n = t(91635);
            t(84205);
            var i = t(15942),
              d = e([i]);
            i = (d.then ? (await d)() : d)[0];
            let c = (0, n.F)(
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
            function l({
              className: e,
              variant: r,
              size: t,
              asChild: s = !1,
              ...n
            }) {
              let d = s ? o.DX : "button";
              return (0, a.jsx)(d, {
                "data-slot": "button",
                className: (0, i.cn)(c({ variant: r, size: t, className: e })),
                ...n,
              });
            }
            s();
          } catch (e) {
            s(e);
          }
        });
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
      32729: (e, r, t) => {
        Promise.resolve().then(t.bind(t, 43006));
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
      37787: (e, r, t) => {
        "use strict";
        t.a(e, async (e, s) => {
          try {
            t.d(r, { T: () => d });
            var a = t(61268),
              o = t(84205),
              n = t(15942),
              i = e([n]);
            n = (i.then ? (await i)() : i)[0];
            let d = o.forwardRef(({ className: e, ...r }, t) =>
              (0, a.jsx)("textarea", {
                className: (0, n.cn)(
                  "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                  e,
                ),
                ref: t,
                ...r,
              }),
            );
            (d.displayName = "Textarea"), s();
          } catch (e) {
            s(e);
          }
        });
      },
      38522: (e) => {
        "use strict";
        e.exports = require("node:zlib");
      },
      41692: (e) => {
        "use strict";
        e.exports = require("node:tls");
      },
      43006: (e, r, t) => {
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
          o = t(26394),
          n = t(60442),
          i = (0, o.registerClientReference)(
            function () {
              throw Error(
                "Attempted to call the default export of \"E:\\\\downloads\\\\Hijraah\\\\apps\\\\web\\\\src\\\\app\\\\[locale]\\\\dashboard\\\\cases\\\\new\\\\page.tsx\" from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
              );
            },
            "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\[locale]\\dashboard\\cases\\new\\page.tsx",
            "default",
          );
        let d = { ...a },
          l =
            "workUnitAsyncStorage" in d
              ? d.workUnitAsyncStorage
              : "requestAsyncStorage" in d
                ? d.requestAsyncStorage
                : void 0;
        s =
          "function" == typeof i
            ? new Proxy(i, {
                apply: (e, r, t) => {
                  let s, a, o;
                  try {
                    let e = l?.getStore();
                    (s = e?.headers.get("sentry-trace") ?? void 0),
                      (a = e?.headers.get("baggage") ?? void 0),
                      (o = e?.headers);
                  } catch (e) {}
                  return n
                    .wrapServerComponentWithSentry(e, {
                      componentRoute: "/[locale]/dashboard/cases/new",
                      componentType: "Page",
                      sentryTraceHeader: s,
                      baggageHeader: a,
                      headers: o,
                    })
                    .apply(r, t);
                },
              })
            : i;
        let c = void 0,
          u = void 0,
          p = void 0,
          h = s;
      },
      44708: (e) => {
        "use strict";
        e.exports = require("node:https");
      },
      48161: (e) => {
        "use strict";
        e.exports = require("node:os");
      },
      53053: (e) => {
        "use strict";
        e.exports = require("node:diagnostics_channel");
      },
      53974: (e, r, t) => {
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
          o = t(26394),
          n = t(60442),
          i = (0, o.registerClientReference)(
            function () {
              throw Error(
                "Attempted to call the default export of \"E:\\\\downloads\\\\Hijraah\\\\apps\\\\web\\\\src\\\\app\\\\not-found.tsx\" from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
              );
            },
            "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\not-found.tsx",
            "default",
          );
        let d = { ...a },
          l =
            "workUnitAsyncStorage" in d
              ? d.workUnitAsyncStorage
              : "requestAsyncStorage" in d
                ? d.requestAsyncStorage
                : void 0;
        s =
          "function" == typeof i
            ? new Proxy(i, {
                apply: (e, r, t) => {
                  let s, a, o;
                  try {
                    let e = l?.getStore();
                    (s = e?.headers.get("sentry-trace") ?? void 0),
                      (a = e?.headers.get("baggage") ?? void 0),
                      (o = e?.headers);
                  } catch (e) {}
                  return n
                    .wrapServerComponentWithSentry(e, {
                      componentRoute: "/",
                      componentType: "Not-found",
                      sentryTraceHeader: s,
                      baggageHeader: a,
                      headers: o,
                    })
                    .apply(r, t);
                },
              })
            : i;
        let c = void 0,
          u = void 0,
          p = void 0,
          h = s;
      },
      55511: (e) => {
        "use strict";
        e.exports = require("crypto");
      },
      55591: (e) => {
        "use strict";
        e.exports = require("https");
      },
      56460: (e, r, t) => {
        "use strict";
        t.r(r), t.d(r, { default: () => o });
        var s = t(61268),
          a = t(89882);
        function o() {
          return (
            (0, a.useRouter)(),
            (0, s.jsxs)("div", {
              className:
                "flex flex-col items-center justify-center min-h-screen py-2",
              children: [
                (0, s.jsx)("h1", {
                  className: "text-4xl font-bold",
                  children: "Page Not Found",
                }),
                (0, s.jsx)("p", {
                  className: "mt-3 text-xl",
                  children: "Redirecting to home page...",
                }),
              ],
            })
          );
        }
        t(84205), t(58702);
      },
      57075: (e) => {
        "use strict";
        e.exports = require("node:stream");
      },
      57975: (e) => {
        "use strict";
        e.exports = require("node:util");
      },
      58702: (e, r, t) => {
        "use strict";
        t.d(r, {
          IB: () => s,
          V8: () => i,
          XG: () => n,
          o0: () => o,
          q: () => a,
        });
        let s = ["en", "ar", "es", "fr"],
          a = "en",
          o = {
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
        function n(e) {
          return o[e] || o[a];
        }
        function i(e) {
          return "rtl" === n(e).direction;
        }
      },
      59059: (e, r, t) => {
        "use strict";
        t.r(r), t.d(r, { default: () => s });
        let s = (0, t(26394).registerClientReference)(
          function () {
            throw Error(
              "Attempted to call the default export of \"E:\\\\downloads\\\\Hijraah\\\\apps\\\\web\\\\src\\\\app\\\\global-error.tsx\" from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\global-error.tsx",
          "default",
        );
      },
      59893: (e, r, t) => {
        Promise.resolve().then(t.bind(t, 87447));
      },
      63017: (e, r, t) => {
        Promise.resolve().then(t.bind(t, 59059));
      },
      63033: (e) => {
        "use strict";
        e.exports = require("next/dist/server/app-render/work-unit-async-storage.external.js");
      },
      69177: (e, r, t) => {
        Promise.resolve().then(t.bind(t, 23316));
      },
      69621: (e, r, t) => {
        Promise.resolve().then(t.bind(t, 94745));
      },
      72015: (e, r, t) => {
        "use strict";
        t.a(e, async (e, s) => {
          try {
            t.d(r, { Y: () => u });
            var a = t(61268),
              o = t(95124),
              n = t(84205),
              i = t(28909),
              d = t(78337),
              l = t(37787),
              c = e([i, d, l]);
            function u({ onSubmit: e, onCancel: r }) {
              let t = (0, o.useTranslations)("temporaryCaseForm"),
                [s, c] = (0, n.useState)(""),
                [u, p] = (0, n.useState)("");
              return (0, a.jsxs)("div", {
                className: "space-y-4 p-4",
                children: [
                  (0, a.jsx)("h2", {
                    className: "text-lg font-medium",
                    children: t("formTitle"),
                  }),
                  (0, a.jsxs)("form", {
                    onSubmit: (r) => {
                      r.preventDefault(),
                        e({
                          title: s || t("initialTitle"),
                          description: u || t("initialDescription"),
                          status: "active",
                        });
                    },
                    className: "space-y-4",
                    children: [
                      (0, a.jsxs)("div", {
                        className: "space-y-2",
                        children: [
                          (0, a.jsx)("label", {
                            htmlFor: "title",
                            className: "text-sm font-medium",
                            children: t("titleLabel"),
                          }),
                          (0, a.jsx)(d.p, {
                            id: "title",
                            type: "text",
                            value: s,
                            onChange: (e) => c(e.target.value),
                            placeholder: t("initialTitle"),
                          }),
                        ],
                      }),
                      (0, a.jsxs)("div", {
                        className: "space-y-2",
                        children: [
                          (0, a.jsx)("label", {
                            htmlFor: "description",
                            className: "text-sm font-medium",
                            children: t("descriptionLabel"),
                          }),
                          (0, a.jsx)(l.T, {
                            id: "description",
                            value: u,
                            onChange: (e) => p(e.target.value),
                            rows: 3,
                            placeholder: t("initialDescription"),
                          }),
                        ],
                      }),
                      (0, a.jsxs)("div", {
                        className: "flex justify-end space-x-2",
                        children: [
                          (0, a.jsx)(i.$, {
                            type: "button",
                            variant: "outline",
                            onClick: r,
                            children: t("cancelButton"),
                          }),
                          (0, a.jsx)(i.$, {
                            type: "submit",
                            children: t("createButton"),
                          }),
                        ],
                      }),
                    ],
                  }),
                ],
              });
            }
            ([i, d, l] = c.then ? (await c)() : c), s();
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
      74075: (e) => {
        "use strict";
        e.exports = require("zlib");
      },
      74619: (e) => {
        function r(e) {
          var r = Error("Cannot find module '" + e + "'");
          throw ((r.code = "MODULE_NOT_FOUND"), r);
        }
        (r.keys = () => []), (r.resolve = r), (r.id = 74619), (e.exports = r);
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
      77032: (e, r, t) => {
        Promise.resolve().then(t.t.bind(t, 11299, 23)),
          Promise.resolve().then(t.t.bind(t, 81119, 23)),
          Promise.resolve().then(t.t.bind(t, 68259, 23)),
          Promise.resolve().then(t.t.bind(t, 36914, 23)),
          Promise.resolve().then(t.t.bind(t, 15142, 23)),
          Promise.resolve().then(t.t.bind(t, 98554, 23)),
          Promise.resolve().then(t.t.bind(t, 88424, 23)),
          Promise.resolve().then(t.t.bind(t, 64834, 23));
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
      85488: (e) => {
        "use strict";
        e.exports = import("ai");
      },
      86592: (e) => {
        "use strict";
        e.exports = require("node:inspector");
      },
      87113: (e, r, t) => {
        "use strict";
        t.a(e, async (e, s) => {
          try {
            t.r(r), t.d(r, { default: () => i });
            var a = t(61268);
            t(86896), t(84205);
            var o = t(28909),
              n = e([o]);
            function i({ error: e, reset: r }) {
              return (0, a.jsx)("html", {
                children: (0, a.jsx)("body", {
                  children: (0, a.jsxs)("div", {
                    className:
                      "flex min-h-screen flex-col items-center justify-center p-4 text-center",
                    children: [
                      (0, a.jsx)("h1", {
                        className: "text-4xl font-bold mb-4",
                        children: "Something went wrong!",
                      }),
                      (0, a.jsx)("p", {
                        className: "text-xl mb-8",
                        children: e.message || "An unexpected error occurred",
                      }),
                      (0, a.jsxs)("div", {
                        className: "space-x-4",
                        children: [
                          (0, a.jsx)(o.$, {
                            onClick: () => r(),
                            children: "Try again",
                          }),
                          (0, a.jsx)(o.$, {
                            variant: "outline",
                            onClick: () => (window.location.href = "/"),
                            children: "Go home",
                          }),
                        ],
                      }),
                      !1,
                    ],
                  }),
                }),
              });
            }
            (o = (n.then ? (await n)() : n)[0]), s();
          } catch (e) {
            s(e);
          }
        });
      },
      87447: (e, r, t) => {
        "use strict";
        t.a(e, async (e, s) => {
          try {
            t.r(r), t.d(r, { default: () => i });
            var a = t(61268);
            t(84205);
            var o = t(28909),
              n = e([o]);
            function i({ error: e, reset: r }) {
              return (0, a.jsx)("div", {
                className: "flex h-screen",
                children: (0, a.jsxs)("div", {
                  className: "m-auto text-center space-y-4",
                  children: [
                    (0, a.jsx)("h2", {
                      className: "text-2xl font-bold",
                      children: "Something went wrong!",
                    }),
                    (0, a.jsx)("p", {
                      className: "text-muted-foreground",
                      children: e.message,
                    }),
                    (0, a.jsx)(o.$, {
                      onClick: () => r(),
                      variant: "outline",
                      children: "Try again",
                    }),
                  ],
                }),
              });
            }
            (o = (n.then ? (await n)() : n)[0]), s();
          } catch (e) {
            s(e);
          }
        });
      },
      89783: (e, r, t) => {
        Promise.resolve().then(t.bind(t, 53974));
      },
      90184: (e, r, t) => {
        Promise.resolve().then(t.t.bind(t, 2938, 23)),
          Promise.resolve().then(t.t.bind(t, 65405, 23)),
          Promise.resolve().then(t.t.bind(t, 83573, 23)),
          Promise.resolve().then(t.t.bind(t, 35348, 23)),
          Promise.resolve().then(t.t.bind(t, 39308, 23)),
          Promise.resolve().then(t.t.bind(t, 4784, 23)),
          Promise.resolve().then(t.t.bind(t, 60830, 23)),
          Promise.resolve().then(t.t.bind(t, 84360, 23));
      },
      91645: (e) => {
        "use strict";
        e.exports = require("net");
      },
      93206: () => {},
      94511: (e, r, t) => {
        Promise.resolve().then(t.bind(t, 56460));
      },
      94735: (e) => {
        "use strict";
        e.exports = require("events");
      },
      94745: (e, r, t) => {
        "use strict";
        t.r(r), t.d(r, { default: () => s });
        let s = (0, t(26394).registerClientReference)(
          function () {
            throw Error(
              "Attempted to call the default export of \"E:\\\\downloads\\\\Hijraah\\\\apps\\\\web\\\\src\\\\app\\\\error.tsx\" from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\error.tsx",
          "default",
        );
      },
      96708: (e) => {
        function r(e) {
          var r = Error("Cannot find module '" + e + "'");
          throw ((r.code = "MODULE_NOT_FOUND"), r);
        }
        (r.keys = () => []), (r.resolve = r), (r.id = 96708), (e.exports = r);
      },
      97927: (e, r, t) => {
        Promise.resolve().then(t.bind(t, 51433)),
          Promise.resolve().then(t.bind(t, 59107)),
          Promise.resolve().then(t.bind(t, 39862));
      },
    });
  var r = require("../../../../../webpack-runtime.js");
  r.C(e);
  var t = (e) => r((r.s = e)),
    s = r.X(
      0,
      [
        827, 6518, 2033, 4027, 2872, 7713, 5149, 8859, 1655, 8029, 5728, 9729,
        3390, 4990, 6188, 7911, 7401, 5124, 7272, 3042, 385, 7393, 4486, 7018,
        4763, 7333, 7145, 9207, 8264, 27, 7935,
      ],
      () => t(20892),
    );
  module.exports = s;
})();
//# sourceMappingURL=page.js.map
