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
    (e._sentryDebugIds[r] = "5430fc86-4de6-4518-a89b-c182194e3ae7"),
    (e._sentryDebugIdIdentifier =
      "sentry-dbid-5430fc86-4de6-4518-a89b-c182194e3ae7"));
} catch (e) {}
(() => {
  var e = {};
  (e.id = 5495),
    (e.ids = [4630, 5495]),
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
              wL: () => m,
            });
            var o = t(61268),
              a = t(55728),
              n = t(84205),
              i = t(15942),
              l = e([i]);
            i = (l.then ? (await l)() : l)[0];
            let d = n.forwardRef(({ className: e, ...r }, t) =>
              (0, o.jsx)(a.P.div, {
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
            let c = n.forwardRef(({ className: e, ...r }, t) =>
              (0, o.jsx)("div", {
                ref: t,
                className: (0, i.cn)("flex flex-col space-y-1.5 p-6", e),
                ...r,
              }),
            );
            c.displayName = "CardHeader";
            let u = n.forwardRef(({ className: e, ...r }, t) =>
              (0, o.jsx)("h3", {
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
              (0, o.jsx)("p", {
                ref: t,
                className: (0, i.cn)("text-sm text-muted-foreground", e),
                ...r,
              }),
            );
            p.displayName = "CardDescription";
            let h = n.forwardRef(({ className: e, ...r }, t) =>
              (0, o.jsx)("div", {
                ref: t,
                className: (0, i.cn)("p-6 pt-0", e),
                ...r,
              }),
            );
            h.displayName = "CardContent";
            let m = n.forwardRef(({ className: e, ...r }, t) =>
              (0, o.jsx)("div", {
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
              cn: () => l,
              lk: () => d,
              y8: () => u,
            });
            var o = t(85488);
            t(3477);
            var a = t(79029),
              n = t(58360),
              i = e([o]);
            function l(...e) {
              return (0, n.QP)((0, a.$)(e));
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
            o = (i.then ? (await i)() : i)[0];
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
            var o = t(61268),
              a = t(30595);
            t(84205);
            var n = t(15942),
              i = e([n]);
            function l({ className: e, ...r }) {
              return (0, o.jsx)(a.b, {
                "data-slot": "label",
                className: (0, n.cn)(
                  "flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
                  e,
                ),
                ...r,
              });
            }
            (n = (i.then ? (await i)() : i)[0]), s();
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
            maxDuration: () => h,
            metadata: () => c,
            viewport: () => u,
          });
        var o = t(63033),
          a = t(35242);
        t(93206);
        var n = t(51433),
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
          h = 60,
          m = { ...o },
          x =
            "workUnitAsyncStorage" in m
              ? m.workUnitAsyncStorage
              : "requestAsyncStorage" in m
                ? m.requestAsyncStorage
                : void 0;
        s = new Proxy(
          function ({ children: e }) {
            let r = { plugins: [] };
            return (0, a.jsxs)(a.Fragment, {
              children: [
                e,
                (0, a.jsx)(i.Analytics, {}),
                (0, a.jsx)(l.SpeedInsights, {}),
                r && (0, a.jsx)(n.StagewiseToolbar, { config: r }),
              ],
            });
          },
          {
            apply: (e, r, t) => {
              let s, o, a;
              try {
                let e = x?.getStore();
                (s = e?.headers.get("sentry-trace") ?? void 0),
                  (o = e?.headers.get("baggage") ?? void 0),
                  (a = e?.headers);
              } catch (e) {}
              return d
                .wrapServerComponentWithSentry(e, {
                  componentRoute: "/",
                  componentType: "Layout",
                  sentryTraceHeader: s,
                  baggageHeader: o,
                  headers: a,
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
            var o = t(61268),
              a = t(86415),
              n = t(91635);
            t(84205);
            var i = t(15942),
              l = e([i]);
            i = (l.then ? (await l)() : l)[0];
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
            function d({
              className: e,
              variant: r,
              size: t,
              asChild: s = !1,
              ...n
            }) {
              let l = s ? a.DX : "button";
              return (0, o.jsx)(l, {
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
      37664: (e, r, t) => {
        "use strict";
        let s;
        t.r(r),
          t.d(r, {
            default: () => h,
            generateImageMetadata: () => u,
            generateMetadata: () => c,
            generateViewport: () => p,
          });
        var o = t(63033),
          a = t(35242);
        t(84147);
        var n = t(54908),
          i = t(60442);
        let l = { ...o },
          d =
            "workUnitAsyncStorage" in l
              ? l.workUnitAsyncStorage
              : "requestAsyncStorage" in l
                ? l.requestAsyncStorage
                : void 0;
        s = new Proxy(
          function () {
            return (0, a.jsx)("div", {
              className:
                "flex min-h-[calc(100vh-theme(spacing.16))] items-center justify-center py-10",
              children: (0, a.jsx)(n.LoginForm, {}),
            });
          },
          {
            apply: (e, r, t) => {
              let s, o, a;
              try {
                let e = d?.getStore();
                (s = e?.headers.get("sentry-trace") ?? void 0),
                  (o = e?.headers.get("baggage") ?? void 0),
                  (a = e?.headers);
              } catch (e) {}
              return i
                .wrapServerComponentWithSentry(e, {
                  componentRoute: "/[locale]/login",
                  componentType: "Page",
                  sentryTraceHeader: s,
                  baggageHeader: o,
                  headers: a,
                })
                .apply(r, t);
            },
          },
        );
        let c = void 0,
          u = void 0,
          p = void 0,
          h = s;
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
      51929: (e, r, t) => {
        Promise.resolve().then(t.bind(t, 54908));
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
        var o = t(63033),
          a = t(26394),
          n = t(60442),
          i = (0, a.registerClientReference)(
            function () {
              throw Error(
                "Attempted to call the default export of \"E:\\\\downloads\\\\Hijraah\\\\apps\\\\web\\\\src\\\\app\\\\not-found.tsx\" from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
              );
            },
            "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\not-found.tsx",
            "default",
          );
        let l = { ...o },
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
                  let s, o, a;
                  try {
                    let e = d?.getStore();
                    (s = e?.headers.get("sentry-trace") ?? void 0),
                      (o = e?.headers.get("baggage") ?? void 0),
                      (a = e?.headers);
                  } catch (e) {}
                  return n
                    .wrapServerComponentWithSentry(e, {
                      componentRoute: "/",
                      componentType: "Not-found",
                      sentryTraceHeader: s,
                      baggageHeader: o,
                      headers: a,
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
      54908: (e, r, t) => {
        "use strict";
        t.d(r, { LoginForm: () => s });
        let s = (0, t(26394).registerClientReference)(
          function () {
            throw Error(
              "Attempted to call LoginForm() from the server but LoginForm is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\apps\\web\\src\\components\\ui\\auth\\login-form.tsx",
          "LoginForm",
        );
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
        t.r(r), t.d(r, { default: () => a });
        var s = t(61268),
          o = t(89882);
        function a() {
          return (
            (0, o.useRouter)(),
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
          o0: () => a,
          q: () => o,
        });
        let s = ["en", "ar", "es", "fr"],
          o = "en",
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
        function n(e) {
          return a[e] || a[o];
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
      68436: (e, r, t) => {
        "use strict";
        t.r(r),
          t.d(r, {
            GlobalError: () => a.default,
            __next_app__: () => c,
            pages: () => d,
            routeModule: () => u,
            tree: () => l,
          });
        var s = t(11610),
          o = t(51293),
          a = t(59059),
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
        let l = {
            children: [
              "",
              {
                children: [
                  "[locale]",
                  {
                    children: [
                      "login",
                      {
                        children: [
                          "__PAGE__",
                          {},
                          {
                            page: [
                              () => Promise.resolve().then(t.bind(t, 37664)),
                              "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\[locale]\\login\\page.tsx",
                            ],
                          },
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
            "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\[locale]\\login\\page.tsx",
          ],
          c = { require: t, loadChunk: () => Promise.resolve() },
          u = new s.AppPageRouteModule({
            definition: {
              kind: o.RouteKind.APP_PAGE,
              page: "/[locale]/login/page",
              pathname: "/[locale]/login",
              bundlePath: "",
              filename: "",
              appPaths: [],
            },
            userland: { loaderTree: l },
          });
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
      75378: (e, r, t) => {
        "use strict";
        t.a(e, async (e, s) => {
          try {
            t.d(r, { LoginForm: () => v });
            var o = t(61268),
              a = t(97052),
              n = t(66135),
              i = t(89882),
              l = t(84205),
              d = t(36322),
              c = t(98654),
              u = t(36352),
              p = t(3519),
              h = t(28909),
              m = t(5451),
              x = t(86183),
              g = t(78337),
              f = e([h, m, x, g]);
            [h, m, x, g] = f.then ? (await f)() : f;
            let b = u.Ik({
              email: u.Yj().email("Invalid email address"),
              password: u.Yj().min(8, "Password must be at least 8 characters"),
            });
            function v() {
              let { signIn: e } = (0, p.useAuth)(),
                r = (0, i.useRouter)(),
                t = (0, i.useSearchParams)(),
                [s, u] = l.useState(!1),
                f = (0, d.mN)({
                  resolver: (0, a.u)(b),
                  defaultValues: { email: "", password: "" },
                }),
                v = async (s) => {
                  try {
                    u(!0),
                      await e("email", {
                        email: s.email,
                        password: s.password,
                      });
                    let o = t.get("redirect") || "/dashboard";
                    r.push(o);
                  } catch (e) {
                    console.error("Login error:", e),
                      c.oR.error("Failed to sign in");
                  } finally {
                    u(!1);
                  }
                };
              return (0, o.jsxs)(m.Zp, {
                className: "w-full max-w-md",
                children: [
                  (0, o.jsxs)(m.aR, {
                    children: [
                      (0, o.jsx)(m.ZB, { children: "Sign In" }),
                      (0, o.jsx)(m.BT, {
                        children:
                          "Choose your sign-in method or enter your email and password",
                      }),
                    ],
                  }),
                  (0, o.jsxs)(m.Wu, {
                    children: [
                      (0, o.jsxs)("div", {
                        className: "grid gap-4 mb-6",
                        children: [
                          (0, o.jsxs)(h.$, {
                            variant: "outline",
                            className: "w-full",
                            onClick: () =>
                              c.oR.info("Apple login not implemented yet."),
                            children: [
                              (0, o.jsx)("svg", {
                                className: "mr-2 h-4 w-4",
                                xmlns: "http://www.w3.org/2000/svg",
                                viewBox: "0 0 24 24",
                                children: (0, o.jsx)("path", {
                                  d: "M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701",
                                  fill: "currentColor",
                                }),
                              }),
                              "Sign in with Apple",
                            ],
                          }),
                          (0, o.jsxs)(h.$, {
                            variant: "outline",
                            className: "w-full",
                            onClick: () =>
                              c.oR.info("Google login not implemented yet."),
                            children: [
                              (0, o.jsx)("svg", {
                                className: "mr-2 h-4 w-4",
                                xmlns: "http://www.w3.org/2000/svg",
                                viewBox: "0 0 24 24",
                                children: (0, o.jsx)("path", {
                                  d: "M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z",
                                  fill: "currentColor",
                                }),
                              }),
                              "Sign in with Google",
                            ],
                          }),
                        ],
                      }),
                      (0, o.jsxs)("div", {
                        className: "relative mb-4",
                        children: [
                          (0, o.jsx)("div", {
                            className: "absolute inset-0 flex items-center",
                            children: (0, o.jsx)("span", {
                              className: "w-full border-t",
                            }),
                          }),
                          (0, o.jsx)("div", {
                            className:
                              "relative flex justify-center text-xs uppercase",
                            children: (0, o.jsx)("span", {
                              className: "bg-card px-2 text-muted-foreground",
                              children: "Or continue with",
                            }),
                          }),
                        ],
                      }),
                      (0, o.jsx)(x.lV, {
                        ...f,
                        children: (0, o.jsxs)("form", {
                          onSubmit: f.handleSubmit(v),
                          className: "space-y-4",
                          children: [
                            (0, o.jsx)(x.zB, {
                              control: f.control,
                              name: "email",
                              render: ({ field: e }) =>
                                (0, o.jsxs)(x.eI, {
                                  children: [
                                    (0, o.jsx)(x.lR, { children: "Email" }),
                                    (0, o.jsx)(x.MJ, {
                                      children: (0, o.jsx)(g.p, {
                                        type: "email",
                                        placeholder: "Enter your email",
                                        disabled: s,
                                        ...e,
                                      }),
                                    }),
                                    (0, o.jsx)(x.C5, {}),
                                  ],
                                }),
                            }),
                            (0, o.jsx)(x.zB, {
                              control: f.control,
                              name: "password",
                              render: ({ field: e }) =>
                                (0, o.jsxs)(x.eI, {
                                  children: [
                                    (0, o.jsx)(x.lR, { children: "Password" }),
                                    (0, o.jsx)(x.MJ, {
                                      children: (0, o.jsx)(g.p, {
                                        type: "password",
                                        placeholder: "Enter your password",
                                        disabled: s,
                                        ...e,
                                      }),
                                    }),
                                    (0, o.jsx)(x.C5, {}),
                                  ],
                                }),
                            }),
                            (0, o.jsx)(h.$, {
                              type: "submit",
                              className: "w-full",
                              disabled: s,
                              children: s
                                ? (0, o.jsxs)(o.Fragment, {
                                    children: [
                                      (0, o.jsx)(n.A, {
                                        className: "mr-2 h-4 w-4 animate-spin",
                                      }),
                                      "Signing in...",
                                    ],
                                  })
                                : "Sign In",
                            }),
                          ],
                        }),
                      }),
                    ],
                  }),
                  (0, o.jsxs)(m.wL, {
                    className: "flex flex-col gap-3 items-center pt-0",
                    children: [
                      (0, o.jsx)("div", {
                        className: "text-center text-sm",
                        children: (0, o.jsx)(h.$, {
                          variant: "link",
                          className: "px-2 text-muted-foreground",
                          onClick: () => r.push("/auth/reset-password"),
                          children: "Forgot password?",
                        }),
                      }),
                      (0, o.jsxs)("div", {
                        className: "text-center text-sm",
                        children: [
                          "Don't have an account?",
                          " ",
                          (0, o.jsx)(h.$, {
                            variant: "link",
                            className: "px-2",
                            onClick: () => r.push("/auth/register"),
                            children: "Sign up",
                          }),
                        ],
                      }),
                      (0, o.jsxs)("div", {
                        className:
                          "text-muted-foreground text-center text-xs mt-2",
                        children: [
                          "By clicking continue, you agree to our",
                          " ",
                          (0, o.jsx)(h.$, {
                            variant: "link",
                            className: "p-0 h-auto text-xs",
                            onClick: () => r.push("/legal/terms"),
                            children: "Terms of Service",
                          }),
                          " ",
                          "and",
                          " ",
                          (0, o.jsx)(h.$, {
                            variant: "link",
                            className: "p-0 h-auto text-xs",
                            onClick: () => r.push("/legal/privacy"),
                            children: "Privacy Policy",
                          }),
                          ".",
                        ],
                      }),
                    ],
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
      86183: (e, r, t) => {
        "use strict";
        t.a(e, async (e, s) => {
          try {
            t.d(r, {
              C5: () => m,
              MJ: () => h,
              eI: () => u,
              lR: () => p,
              lV: () => x,
              zB: () => f,
            });
            var o = t(61268),
              a = t(86415),
              n = t(84205),
              i = t(36322),
              l = t(16979),
              d = t(15942),
              c = e([l, d]);
            [l, d] = c.then ? (await c)() : c;
            let x = i.Op,
              g = n.createContext({}),
              f = ({ ...e }) =>
                (0, o.jsx)(g.Provider, {
                  value: { name: e.name },
                  children: (0, o.jsx)(i.xI, { ...e }),
                }),
              v = () => {
                let e = n.useContext(g),
                  r = n.useContext(b),
                  { getFieldState: t } = (0, i.xW)(),
                  s = (0, i.lN)({ name: e.name }),
                  o = t(e.name, s);
                if (!e)
                  throw Error("useFormField should be used within <FormField>");
                let { id: a } = r;
                return {
                  id: a,
                  name: e.name,
                  formItemId: `${a}-form-item`,
                  formDescriptionId: `${a}-form-item-description`,
                  formMessageId: `${a}-form-item-message`,
                  ...o,
                };
              },
              b = n.createContext({});
            function u({ className: e, ...r }) {
              let t = n.useId();
              return (0, o.jsx)(b.Provider, {
                value: { id: t },
                children: (0, o.jsx)("div", {
                  "data-slot": "form-item",
                  className: (0, d.cn)("grid gap-2", e),
                  ...r,
                }),
              });
            }
            function p({ className: e, ...r }) {
              let { error: t, formItemId: s } = v();
              return (0, o.jsx)(l.J, {
                "data-slot": "form-label",
                "data-error": !!t,
                className: (0, d.cn)("data-[error=true]:text-destructive", e),
                htmlFor: s,
                ...r,
              });
            }
            function h({ ...e }) {
              let {
                error: r,
                formItemId: t,
                formDescriptionId: s,
                formMessageId: n,
              } = v();
              return (0, o.jsx)(a.DX, {
                "data-slot": "form-control",
                id: t,
                "aria-describedby": r ? `${s} ${n}` : `${s}`,
                "aria-invalid": !!r,
                ...e,
              });
            }
            function m({ className: e, ...r }) {
              let { error: t, formMessageId: s } = v(),
                a = t ? String(t?.message ?? "") : r.children;
              return a
                ? (0, o.jsx)("p", {
                    "data-slot": "form-message",
                    id: s,
                    className: (0, d.cn)("text-destructive text-sm", e),
                    ...r,
                    children: a,
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
            var o = t(61268);
            t(86896), t(84205);
            var a = t(28909),
              n = e([a]);
            function i({ error: e, reset: r }) {
              return (0, o.jsx)("html", {
                children: (0, o.jsx)("body", {
                  children: (0, o.jsxs)("div", {
                    className:
                      "flex min-h-screen flex-col items-center justify-center p-4 text-center",
                    children: [
                      (0, o.jsx)("h1", {
                        className: "text-4xl font-bold mb-4",
                        children: "Something went wrong!",
                      }),
                      (0, o.jsx)("p", {
                        className: "text-xl mb-8",
                        children: e.message || "An unexpected error occurred",
                      }),
                      (0, o.jsxs)("div", {
                        className: "space-x-4",
                        children: [
                          (0, o.jsx)(a.$, {
                            onClick: () => r(),
                            children: "Try again",
                          }),
                          (0, o.jsx)(a.$, {
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
            (a = (n.then ? (await n)() : n)[0]), s();
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
            var o = t(61268);
            t(84205);
            var a = t(28909),
              n = e([a]);
            function i({ error: e, reset: r }) {
              return (0, o.jsx)("div", {
                className: "flex h-screen",
                children: (0, o.jsxs)("div", {
                  className: "m-auto text-center space-y-4",
                  children: [
                    (0, o.jsx)("h2", {
                      className: "text-2xl font-bold",
                      children: "Something went wrong!",
                    }),
                    (0, o.jsx)("p", {
                      className: "text-muted-foreground",
                      children: e.message,
                    }),
                    (0, o.jsx)(a.$, {
                      onClick: () => r(),
                      variant: "outline",
                      children: "Try again",
                    }),
                  ],
                }),
              });
            }
            (a = (n.then ? (await n)() : n)[0]), s();
          } catch (e) {
            s(e);
          }
        });
      },
      88377: (e, r, t) => {
        Promise.resolve().then(t.bind(t, 75378));
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
  var r = require("../../../webpack-runtime.js");
  r.C(e);
  var t = (e) => r((r.s = e)),
    s = r.X(
      0,
      [
        827, 6518, 2033, 4027, 2872, 7713, 5149, 8859, 1655, 8029, 5728, 9729,
        3390, 4990, 6188, 7911, 7401, 5124, 7272, 3042, 385, 7393, 4486, 7018,
        4763, 7333, 7145, 9207, 1502, 7052, 8264, 27, 7935,
      ],
      () => t(68436),
    );
  module.exports = s;
})();
//# sourceMappingURL=page.js.map
