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
    (e._sentryDebugIds[r] = "e2c8696e-5c6c-4d05-bfbb-7b6e2d7f9981"),
    (e._sentryDebugIdIdentifier =
      "sentry-dbid-e2c8696e-5c6c-4d05-bfbb-7b6e2d7f9981"));
} catch (e) {}
(() => {
  var e = {};
  (e.id = 768),
    (e.ids = [768, 4630]),
    (e.modules = {
      1811: (e, r, t) => {
        "use strict";
        let s;
        t.r(r),
          t.d(r, {
            default: () => m,
            generateImageMetadata: () => u,
            generateMetadata: () => c,
            generateViewport: () => p,
          });
        var a = t(63033),
          n = t(35242),
          o = t(97402),
          i = t(60442);
        let l = { ...a },
          d =
            "workUnitAsyncStorage" in l
              ? l.workUnitAsyncStorage
              : "requestAsyncStorage" in l
                ? l.requestAsyncStorage
                : void 0;
        s = new Proxy(
          function () {
            return (0, n.jsx)("div", {
              className: "flex min-h-screen items-center justify-center p-4",
              children: (0, n.jsx)(o.RegisterForm, {}),
            });
          },
          {
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
                  componentRoute: "/[locale]/auth/register",
                  componentType: "Page",
                  sentryTraceHeader: s,
                  baggageHeader: a,
                  headers: n,
                })
                .apply(r, t);
            },
          },
        );
        let c = void 0,
          u = void 0,
          p = void 0,
          m = s;
      },
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
              Wu: () => m,
              ZB: () => u,
              Zp: () => d,
              aR: () => c,
              wL: () => h,
            });
            var a = t(61268),
              n = t(55728),
              o = t(84205),
              i = t(15942),
              l = e([i]);
            i = (l.then ? (await l)() : l)[0];
            let d = o.forwardRef(({ className: e, ...r }, t) =>
              (0, a.jsx)(n.P.div, {
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
            d.displayName = "Card";
            let c = o.forwardRef(({ className: e, ...r }, t) =>
              (0, a.jsx)("div", {
                ref: t,
                className: (0, i.cn)("flex flex-col space-y-1.5 p-6", e),
                ...r,
              }),
            );
            c.displayName = "CardHeader";
            let u = o.forwardRef(({ className: e, ...r }, t) =>
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
            let p = o.forwardRef(({ className: e, ...r }, t) =>
              (0, a.jsx)("p", {
                ref: t,
                className: (0, i.cn)("text-sm text-muted-foreground", e),
                ...r,
              }),
            );
            p.displayName = "CardDescription";
            let m = o.forwardRef(({ className: e, ...r }, t) =>
              (0, a.jsx)("div", {
                ref: t,
                className: (0, i.cn)("p-6 pt-0", e),
                ...r,
              }),
            );
            m.displayName = "CardContent";
            let h = o.forwardRef(({ className: e, ...r }, t) =>
              (0, a.jsx)("div", {
                ref: t,
                className: (0, i.cn)("flex items-center p-6 pt-0", e),
                ...r,
              }),
            );
            (h.displayName = "CardFooter"), s();
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
              cn: () => l,
              lk: () => d,
              y8: () => u,
            });
            var a = t(85488);
            t(3477);
            var n = t(79029),
              o = t(58360),
              i = e([a]);
            function l(...e) {
              return (0, o.QP)((0, n.$)(e));
            }
            function d() {
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
      16979: (e, r, t) => {
        "use strict";
        t.a(e, async (e, s) => {
          try {
            t.d(r, { J: () => l });
            var a = t(61268),
              n = t(30595);
            t(84205);
            var o = t(15942),
              i = e([o]);
            function l({ className: e, ...r }) {
              return (0, a.jsx)(n.b, {
                "data-slot": "label",
                className: (0, o.cn)(
                  "flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
                  e,
                ),
                ...r,
              });
            }
            (o = (i.then ? (await i)() : i)[0]), s();
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
            maxDuration: () => m,
            metadata: () => c,
            viewport: () => u,
          });
        var a = t(63033),
          n = t(35242);
        t(93206);
        var o = t(51433),
          i = t(59107),
          l = t(39862),
          d = t(60442);
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
          m = 60,
          h = { ...a },
          x =
            "workUnitAsyncStorage" in h
              ? h.workUnitAsyncStorage
              : "requestAsyncStorage" in h
                ? h.requestAsyncStorage
                : void 0;
        s = new Proxy(
          function ({ children: e }) {
            let r = { plugins: [] };
            return (0, n.jsxs)(n.Fragment, {
              children: [
                e,
                (0, n.jsx)(i.Analytics, {}),
                (0, n.jsx)(l.SpeedInsights, {}),
                r && (0, n.jsx)(o.StagewiseToolbar, { config: r }),
              ],
            });
          },
          {
            apply: (e, r, t) => {
              let s, a, n;
              try {
                let e = x?.getStore();
                (s = e?.headers.get("sentry-trace") ?? void 0),
                  (a = e?.headers.get("baggage") ?? void 0),
                  (n = e?.headers);
              } catch (e) {}
              return d
                .wrapServerComponentWithSentry(e, {
                  componentRoute: "/",
                  componentType: "Layout",
                  sentryTraceHeader: s,
                  baggageHeader: a,
                  headers: n,
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
      26162: (e, r, t) => {
        "use strict";
        t.a(e, async (e, s) => {
          try {
            t.d(r, { M: () => i });
            var a = t(61268);
            t(84205);
            var n = t(15942),
              o = e([n]);
            function i({ password: e, className: r }) {
              let t = (function (e) {
                  if (!e || e.length < 6) return "weak";
                  if (e.length < 8) return "medium";
                  let r = /[A-Z]/.test(e),
                    t = /[a-z]/.test(e),
                    s = /\d/.test(e),
                    a = /[!@#$%^&*(),.?":{}|<>]/.test(e),
                    n = [r, t, s, a].filter(Boolean).length;
                  return e.length >= 12 && n >= 3
                    ? "very-strong"
                    : e.length >= 8 && n >= 2
                      ? "strong"
                      : "medium";
                })(e),
                s = (function (e) {
                  switch (e) {
                    case "weak":
                      return 25;
                    case "medium":
                      return 50;
                    case "strong":
                      return 75;
                    case "very-strong":
                      return 100;
                  }
                })(t);
              return (0, a.jsxs)("div", {
                className: (0, n.cn)("space-y-2", r),
                children: [
                  (0, a.jsx)("div", {
                    className: "h-1 w-full bg-muted rounded overflow-hidden",
                    children: (0, a.jsx)("div", {
                      className: (0, n.cn)(
                        "h-full transition-all duration-300",
                        {
                          "bg-destructive": "weak" === t,
                          "bg-yellow-500": "medium" === t,
                          "bg-green-500": "strong" === t,
                          "bg-primary": "very-strong" === t,
                        },
                      ),
                      style: { width: `${s}%` },
                    }),
                  }),
                  (0, a.jsxs)("p", {
                    className: "text-xs text-muted-foreground",
                    children: [
                      "weak" === t && "Weak password",
                      "medium" === t && "Medium strength password",
                      "strong" === t && "Strong password",
                      "very-strong" === t && "Very strong password",
                    ],
                  }),
                ],
              });
            }
            (n = (o.then ? (await o)() : o)[0]), s();
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
            t.d(r, { $: () => d, r: () => c });
            var a = t(61268),
              n = t(86415),
              o = t(91635);
            t(84205);
            var i = t(15942),
              l = e([i]);
            i = (l.then ? (await l)() : l)[0];
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
              return (0, a.jsx)(l, {
                "data-slot": "button",
                className: (0, i.cn)(c({ variant: r, size: t, className: e })),
                ...o,
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
      41692: (e) => {
        "use strict";
        e.exports = require("node:tls");
      },
      42811: (e, r, t) => {
        "use strict";
        t.a(e, async (e, s) => {
          try {
            t.d(r, { z: () => p });
            var a = t(61268),
              n = t(66135),
              o = t(89882),
              i = t(84205),
              l = t(98654),
              d = t(3519),
              c = t(28909),
              u = e([c]);
            function p({ view: e }) {
              (0, o.useRouter)();
              let { signIn: r } = (0, d.useAuth)(),
                [t, s] = i.useState(null),
                u = async (e) => {
                  try {
                    s(e),
                      await r(e, {
                        redirectTo: `${window.location.origin}/auth/callback`,
                      });
                  } catch (r) {
                    console.error(`Error signing in with ${e}:`, r),
                      l.oR.error(`Failed to sign in with ${e}`),
                      s(null);
                  }
                };
              return (0, a.jsxs)("div", {
                className: "grid gap-2",
                children: [
                  (0, a.jsx)(c.$, {
                    variant: "outline",
                    className: "w-full",
                    onClick: () => u("google"),
                    disabled: null !== t,
                    children:
                      "google" === t
                        ? (0, a.jsxs)(a.Fragment, {
                            children: [
                              (0, a.jsx)(n.A, {
                                className: "mr-2 h-4 w-4 animate-spin",
                              }),
                              "Connecting...",
                            ],
                          })
                        : (0, a.jsxs)(a.Fragment, {
                            children: [
                              (0, a.jsxs)("svg", {
                                className: "mr-2 h-4 w-4",
                                viewBox: "0 0 24 24",
                                children: [
                                  (0, a.jsx)("path", {
                                    d: "M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z",
                                    fill: "#4285F4",
                                  }),
                                  (0, a.jsx)("path", {
                                    d: "M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z",
                                    fill: "#34A853",
                                  }),
                                  (0, a.jsx)("path", {
                                    d: "M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z",
                                    fill: "#FBBC05",
                                  }),
                                  (0, a.jsx)("path", {
                                    d: "M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z",
                                    fill: "#EA4335",
                                  }),
                                ],
                              }),
                              "Continue with Google",
                            ],
                          }),
                  }),
                  (0, a.jsxs)("div", {
                    className: "relative",
                    children: [
                      (0, a.jsx)("div", {
                        className: "absolute inset-0 flex items-center",
                        children: (0, a.jsx)("span", {
                          className: "w-full border-t",
                        }),
                      }),
                      (0, a.jsx)("div", {
                        className:
                          "relative flex justify-center text-xs uppercase",
                        children: (0, a.jsx)("span", {
                          className: "bg-background px-2 text-muted-foreground",
                          children: "Or continue with",
                        }),
                      }),
                    ],
                  }),
                ],
              });
            }
            (c = (u.then ? (await u)() : u)[0]), s();
          } catch (e) {
            s(e);
          }
        });
      },
      43460: (e, r, t) => {
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
          o = t(17770),
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
        t.d(r, i);
        let l = {
            children: [
              "",
              {
                children: [
                  "[locale]",
                  {
                    children: [
                      "auth",
                      {
                        children: [
                          "register",
                          {
                            children: [
                              "__PAGE__",
                              {},
                              {
                                page: [
                                  () => Promise.resolve().then(t.bind(t, 1811)),
                                  "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\[locale]\\auth\\register\\page.tsx",
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
          d = [
            "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\[locale]\\auth\\register\\page.tsx",
          ],
          c = { require: t, loadChunk: () => Promise.resolve() },
          u = new s.AppPageRouteModule({
            definition: {
              kind: a.RouteKind.APP_PAGE,
              page: "/[locale]/auth/register/page",
              pathname: "/[locale]/auth/register",
              bundlePath: "",
              filename: "",
              appPaths: [],
            },
            userland: { loaderTree: l },
          });
      },
      44708: (e) => {
        "use strict";
        e.exports = require("node:https");
      },
      45473: (e, r, t) => {
        Promise.resolve().then(t.bind(t, 97402));
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
            default: () => m,
            generateImageMetadata: () => u,
            generateMetadata: () => c,
            generateViewport: () => p,
          });
        var a = t(63033),
          n = t(26394),
          o = t(60442),
          i = (0, n.registerClientReference)(
            function () {
              throw Error(
                "Attempted to call the default export of \"E:\\\\downloads\\\\Hijraah\\\\apps\\\\web\\\\src\\\\app\\\\not-found.tsx\" from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
              );
            },
            "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\not-found.tsx",
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
          "function" == typeof i
            ? new Proxy(i, {
                apply: (e, r, t) => {
                  let s, a, n;
                  try {
                    let e = d?.getStore();
                    (s = e?.headers.get("sentry-trace") ?? void 0),
                      (a = e?.headers.get("baggage") ?? void 0),
                      (n = e?.headers);
                  } catch (e) {}
                  return o
                    .wrapServerComponentWithSentry(e, {
                      componentRoute: "/",
                      componentType: "Not-found",
                      sentryTraceHeader: s,
                      baggageHeader: a,
                      headers: n,
                    })
                    .apply(r, t);
                },
              })
            : i;
        let c = void 0,
          u = void 0,
          p = void 0,
          m = s;
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
        t.r(r), t.d(r, { default: () => n });
        var s = t(61268),
          a = t(89882);
        function n() {
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
          XG: () => o,
          o0: () => n,
          q: () => a,
        });
        let s = ["en", "ar", "es", "fr"],
          a = "en",
          n = {
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
        function o(e) {
          return n[e] || n[a];
        }
        function i(e) {
          return "rtl" === o(e).direction;
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
      69621: (e, r, t) => {
        Promise.resolve().then(t.bind(t, 94745));
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
      81921: (e, r, t) => {
        Promise.resolve().then(t.bind(t, 89680));
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
      86183: (e, r, t) => {
        "use strict";
        t.a(e, async (e, s) => {
          try {
            t.d(r, {
              C5: () => h,
              MJ: () => m,
              eI: () => u,
              lR: () => p,
              lV: () => x,
              zB: () => f,
            });
            var a = t(61268),
              n = t(86415),
              o = t(84205),
              i = t(36322),
              l = t(16979),
              d = t(15942),
              c = e([l, d]);
            [l, d] = c.then ? (await c)() : c;
            let x = i.Op,
              g = o.createContext({}),
              f = ({ ...e }) =>
                (0, a.jsx)(g.Provider, {
                  value: { name: e.name },
                  children: (0, a.jsx)(i.xI, { ...e }),
                }),
              v = () => {
                let e = o.useContext(g),
                  r = o.useContext(b),
                  { getFieldState: t } = (0, i.xW)(),
                  s = (0, i.lN)({ name: e.name }),
                  a = t(e.name, s);
                if (!e)
                  throw Error("useFormField should be used within <FormField>");
                let { id: n } = r;
                return {
                  id: n,
                  name: e.name,
                  formItemId: `${n}-form-item`,
                  formDescriptionId: `${n}-form-item-description`,
                  formMessageId: `${n}-form-item-message`,
                  ...a,
                };
              },
              b = o.createContext({});
            function u({ className: e, ...r }) {
              let t = o.useId();
              return (0, a.jsx)(b.Provider, {
                value: { id: t },
                children: (0, a.jsx)("div", {
                  "data-slot": "form-item",
                  className: (0, d.cn)("grid gap-2", e),
                  ...r,
                }),
              });
            }
            function p({ className: e, ...r }) {
              let { error: t, formItemId: s } = v();
              return (0, a.jsx)(l.J, {
                "data-slot": "form-label",
                "data-error": !!t,
                className: (0, d.cn)("data-[error=true]:text-destructive", e),
                htmlFor: s,
                ...r,
              });
            }
            function m({ ...e }) {
              let {
                error: r,
                formItemId: t,
                formDescriptionId: s,
                formMessageId: o,
              } = v();
              return (0, a.jsx)(n.DX, {
                "data-slot": "form-control",
                id: t,
                "aria-describedby": r ? `${s} ${o}` : `${s}`,
                "aria-invalid": !!r,
                ...e,
              });
            }
            function h({ className: e, ...r }) {
              let { error: t, formMessageId: s } = v(),
                n = t ? String(t?.message ?? "") : r.children;
              return n
                ? (0, a.jsx)("p", {
                    "data-slot": "form-message",
                    id: s,
                    className: (0, d.cn)("text-destructive text-sm", e),
                    ...r,
                    children: n,
                  })
                : null;
            }
            s();
          } catch (e) {
            s(e);
          }
        });
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
            var n = t(28909),
              o = e([n]);
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
                          (0, a.jsx)(n.$, {
                            onClick: () => r(),
                            children: "Try again",
                          }),
                          (0, a.jsx)(n.$, {
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
            (n = (o.then ? (await o)() : o)[0]), s();
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
            var n = t(28909),
              o = e([n]);
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
                    (0, a.jsx)(n.$, {
                      onClick: () => r(),
                      variant: "outline",
                      children: "Try again",
                    }),
                  ],
                }),
              });
            }
            (n = (o.then ? (await o)() : o)[0]), s();
          } catch (e) {
            s(e);
          }
        });
      },
      89680: (e, r, t) => {
        "use strict";
        t.a(e, async (e, s) => {
          try {
            t.d(r, { RegisterForm: () => w });
            var a = t(61268),
              n = t(97052),
              o = t(66135),
              i = t(89882),
              l = t(84205),
              d = t(36322),
              c = t(98654),
              u = t(36352),
              p = t(42811),
              m = t(26162),
              h = t(32367),
              x = t(28909),
              g = t(5451),
              f = t(86183),
              v = t(78337),
              b = e([p, m, x, g, f, v]);
            [p, m, x, g, f, v] = b.then ? (await b)() : b;
            let y = u
              .Ik({
                email: u.Yj().email("Invalid email address"),
                password: u
                  .Yj()
                  .min(8, "Password must be at least 8 characters")
                  .regex(
                    /[A-Z]/,
                    "Password must contain at least one uppercase letter",
                  )
                  .regex(
                    /[a-z]/,
                    "Password must contain at least one lowercase letter",
                  )
                  .regex(/[0-9]/, "Password must contain at least one number")
                  .regex(
                    /[^A-Za-z0-9]/,
                    "Password must contain at least one special character",
                  ),
                confirmPassword: u.Yj(),
                firstName: u
                  .Yj()
                  .min(2, "First name must be at least 2 characters"),
                lastName: u
                  .Yj()
                  .min(2, "Last name must be at least 2 characters"),
              })
              .refine((e) => e.password === e.confirmPassword, {
                message: "Passwords don't match",
                path: ["confirmPassword"],
              });
            function w() {
              let e = (0, i.useRouter)();
              (0, i.useSearchParams)();
              let [r, t] = l.useState(!1),
                [s, u] = l.useState(""),
                b = (0, d.mN)({
                  resolver: (0, n.u)(y),
                  defaultValues: {
                    email: "",
                    password: "",
                    confirmPassword: "",
                    firstName: "",
                    lastName: "",
                  },
                }),
                w = async (r) => {
                  try {
                    t(!0);
                    let s = (0, h.UU)(),
                      { data: a, error: n } = await s.auth.signUp({
                        email: r.email,
                        password: r.password,
                        options: {
                          emailRedirectTo: `${window.location.origin}/auth/callback`,
                          data: {
                            first_name: r.firstName,
                            last_name: r.lastName,
                            full_name: `${r.firstName} ${r.lastName}`,
                          },
                        },
                      });
                    if (n) throw n;
                    a.user
                      ? e.push("/auth/verify-email")
                      : c.oR.error(
                          "Registration completed, but user data is missing. Please try logging in.",
                        );
                  } catch (e) {
                    console.error("Registration error:", e),
                      c.oR.error(
                        e.message ||
                          "An unexpected error occurred during registration.",
                      );
                  } finally {
                    t(!1);
                  }
                };
              return (0, a.jsxs)(g.Zp, {
                className: "w-full max-w-md",
                children: [
                  (0, a.jsxs)(g.aR, {
                    children: [
                      (0, a.jsx)(g.ZB, { children: "Create Account" }),
                      (0, a.jsx)(g.BT, {
                        children: "Enter your details to create a new account",
                      }),
                    ],
                  }),
                  (0, a.jsxs)(g.Wu, {
                    className: "space-y-6",
                    children: [
                      (0, a.jsx)(p.z, { view: "sign-up" }),
                      (0, a.jsx)(f.lV, {
                        ...b,
                        children: (0, a.jsxs)("form", {
                          onSubmit: b.handleSubmit(w),
                          className: "space-y-4",
                          children: [
                            (0, a.jsxs)("div", {
                              className: "grid grid-cols-2 gap-4",
                              children: [
                                (0, a.jsx)(f.zB, {
                                  control: b.control,
                                  name: "firstName",
                                  render: ({ field: e }) =>
                                    (0, a.jsxs)(f.eI, {
                                      children: [
                                        (0, a.jsx)(f.lR, {
                                          children: "First Name",
                                        }),
                                        (0, a.jsx)(f.MJ, {
                                          children: (0, a.jsx)(v.p, {
                                            placeholder:
                                              "Enter your first name",
                                            disabled: r,
                                            ...e,
                                          }),
                                        }),
                                        (0, a.jsx)(f.C5, {}),
                                      ],
                                    }),
                                }),
                                (0, a.jsx)(f.zB, {
                                  control: b.control,
                                  name: "lastName",
                                  render: ({ field: e }) =>
                                    (0, a.jsxs)(f.eI, {
                                      children: [
                                        (0, a.jsx)(f.lR, {
                                          children: "Last Name",
                                        }),
                                        (0, a.jsx)(f.MJ, {
                                          children: (0, a.jsx)(v.p, {
                                            placeholder: "Enter your last name",
                                            disabled: r,
                                            ...e,
                                          }),
                                        }),
                                        (0, a.jsx)(f.C5, {}),
                                      ],
                                    }),
                                }),
                              ],
                            }),
                            (0, a.jsx)(f.zB, {
                              control: b.control,
                              name: "email",
                              render: ({ field: e }) =>
                                (0, a.jsxs)(f.eI, {
                                  children: [
                                    (0, a.jsx)(f.lR, { children: "Email" }),
                                    (0, a.jsx)(f.MJ, {
                                      children: (0, a.jsx)(v.p, {
                                        type: "email",
                                        placeholder: "Enter your email",
                                        disabled: r,
                                        ...e,
                                      }),
                                    }),
                                    (0, a.jsx)(f.C5, {}),
                                  ],
                                }),
                            }),
                            (0, a.jsx)(f.zB, {
                              control: b.control,
                              name: "password",
                              render: ({ field: e }) =>
                                (0, a.jsxs)(f.eI, {
                                  children: [
                                    (0, a.jsx)(f.lR, { children: "Password" }),
                                    (0, a.jsx)(f.MJ, {
                                      children: (0, a.jsx)(v.p, {
                                        type: "password",
                                        placeholder: "Create a password",
                                        disabled: r,
                                        ...e,
                                        onChange: (r) => {
                                          e.onChange(r), u(r.target.value);
                                        },
                                      }),
                                    }),
                                    (0, a.jsx)(f.C5, {}),
                                  ],
                                }),
                            }),
                            (0, a.jsx)(m.M, { password: s }),
                            (0, a.jsx)(f.zB, {
                              control: b.control,
                              name: "confirmPassword",
                              render: ({ field: e }) =>
                                (0, a.jsxs)(f.eI, {
                                  children: [
                                    (0, a.jsx)(f.lR, {
                                      children: "Confirm Password",
                                    }),
                                    (0, a.jsx)(f.MJ, {
                                      children: (0, a.jsx)(v.p, {
                                        type: "password",
                                        placeholder: "Confirm your password",
                                        disabled: r,
                                        ...e,
                                      }),
                                    }),
                                    (0, a.jsx)(f.C5, {}),
                                  ],
                                }),
                            }),
                            (0, a.jsx)(x.$, {
                              type: "submit",
                              className: "w-full",
                              disabled: r,
                              children: r
                                ? (0, a.jsxs)(a.Fragment, {
                                    children: [
                                      (0, a.jsx)(o.A, {
                                        className: "mr-2 h-4 w-4 animate-spin",
                                      }),
                                      "Creating account...",
                                    ],
                                  })
                                : "Create Account",
                            }),
                          ],
                        }),
                      }),
                    ],
                  }),
                  (0, a.jsx)(g.wL, {
                    className: "flex justify-center",
                    children: (0, a.jsxs)("div", {
                      className: "text-center text-sm",
                      children: [
                        "Already have an account?",
                        " ",
                        (0, a.jsx)(x.$, {
                          variant: "link",
                          className: "px-2",
                          onClick: () => e.push("/auth/login"),
                          children: "Sign in",
                        }),
                      ],
                    }),
                  }),
                ],
              });
            }
            s();
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
      97402: (e, r, t) => {
        "use strict";
        t.d(r, { RegisterForm: () => s });
        let s = (0, t(26394).registerClientReference)(
          function () {
            throw Error(
              "Attempted to call RegisterForm() from the server but RegisterForm is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\apps\\web\\src\\components\\ui\\auth\\register-form.tsx",
          "RegisterForm",
        );
      },
      97927: (e, r, t) => {
        Promise.resolve().then(t.bind(t, 51433)),
          Promise.resolve().then(t.bind(t, 59107)),
          Promise.resolve().then(t.bind(t, 39862));
      },
    });
  var r = require("../../../../webpack-runtime.js");
  r.C(e);
  var t = (e) => r((r.s = e)),
    s = r.X(
      0,
      [
        827, 6518, 2033, 4027, 2872, 7713, 5149, 8859, 1655, 8029, 5728, 9729,
        3390, 4990, 6188, 7911, 7401, 5124, 7272, 3042, 385, 7393, 4486, 7018,
        4763, 7333, 7145, 9207, 1502, 7052, 8264, 27, 7935,
      ],
      () => t(43460),
    );
  module.exports = s;
})();
//# sourceMappingURL=page.js.map
