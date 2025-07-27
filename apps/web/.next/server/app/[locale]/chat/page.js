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
    (e._sentryDebugIds[r] = "c9ccfa67-f236-4bf1-b0cb-f789e96eec5c"),
    (e._sentryDebugIdIdentifier =
      "sentry-dbid-c9ccfa67-f236-4bf1-b0cb-f789e96eec5c"));
} catch (e) {}
(() => {
  var e = {};
  (e.id = 4448),
    (e.ids = [4448, 4630]),
    (e.modules = {
      1708: (e) => {
        "use strict";
        e.exports = require("node:process");
      },
      3295: (e) => {
        "use strict";
        e.exports = require("next/dist/server/app-render/after-task-async-storage.external.js");
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
        t.a(e, async (e, o) => {
          try {
            t.d(r, {
              Cq: () => l,
              GO: () => p,
              cn: () => d,
              lk: () => c,
              y8: () => u,
            });
            var s = t(85488);
            t(3477);
            var n = t(79029),
              i = t(58360),
              a = e([s]);
            function d(...e) {
              return (0, i.QP)((0, n.$)(e));
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
            function l(e) {
              if (0 === e) return "0 Bytes";
              let r = Math.floor(Math.log(e) / Math.log(1024));
              return (
                parseFloat((e / Math.pow(1024, r)).toFixed(2)) +
                " " +
                ["Bytes", "KB", "MB", "GB", "TB"][r]
              );
            }
            s = (a.then ? (await a)() : a)[0];
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
            o();
          } catch (e) {
            o(e);
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
        let o;
        t.r(r),
          t.d(r, {
            default: () => b,
            dynamic: () => p,
            generateImageMetadata: () => f,
            generateMetadata: () => x,
            generateViewport: () => v,
            maxDuration: () => h,
            metadata: () => l,
            viewport: () => u,
          });
        var s = t(63033),
          n = t(35242);
        t(93206);
        var i = t(51433),
          a = t(59107),
          d = t(39862),
          c = t(60442);
        let l = {
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
          m = { ...s },
          g =
            "workUnitAsyncStorage" in m
              ? m.workUnitAsyncStorage
              : "requestAsyncStorage" in m
                ? m.requestAsyncStorage
                : void 0;
        o = new Proxy(
          function ({ children: e }) {
            let r = { plugins: [] };
            return (0, n.jsxs)(n.Fragment, {
              children: [
                e,
                (0, n.jsx)(a.Analytics, {}),
                (0, n.jsx)(d.SpeedInsights, {}),
                r && (0, n.jsx)(i.StagewiseToolbar, { config: r }),
              ],
            });
          },
          {
            apply: (e, r, t) => {
              let o, s, n;
              try {
                let e = g?.getStore();
                (o = e?.headers.get("sentry-trace") ?? void 0),
                  (s = e?.headers.get("baggage") ?? void 0),
                  (n = e?.headers);
              } catch (e) {}
              return c
                .wrapServerComponentWithSentry(e, {
                  componentRoute: "/",
                  componentType: "Layout",
                  sentryTraceHeader: o,
                  baggageHeader: s,
                  headers: n,
                })
                .apply(r, t);
            },
          },
        );
        let x = void 0,
          f = void 0,
          v = void 0,
          b = o;
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
        t.a(e, async (e, o) => {
          try {
            t.d(r, { $: () => c, r: () => l });
            var s = t(61268),
              n = t(86415),
              i = t(91635);
            t(84205);
            var a = t(15942),
              d = e([a]);
            a = (d.then ? (await d)() : d)[0];
            let l = (0, i.F)(
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
            function c({
              className: e,
              variant: r,
              size: t,
              asChild: o = !1,
              ...i
            }) {
              let d = o ? n.DX : "button";
              return (0, s.jsx)(d, {
                "data-slot": "button",
                className: (0, a.cn)(l({ variant: r, size: t, className: e })),
                ...i,
              });
            }
            o();
          } catch (e) {
            o(e);
          }
        });
      },
      28967: (e, r, t) => {
        "use strict";
        t.a(e, async (e, o) => {
          try {
            t.d(r, { _j: () => s.UnifiedChatContainer });
            var s = t(39008),
              n = t(84594),
              i = t(60066),
              a = t(80506),
              d = t(48768),
              c = t(1480),
              l = t(20493),
              u = t(83115),
              p = t(11102),
              h = t(62268),
              m = t(71269),
              g = t(28616),
              x = t(14835),
              f = e([s, n, i, a, d, c, l, u, p, h, m, g, x]);
            ([s, n, i, a, d, c, l, u, p, h, m, g, x] = f.then
              ? (await f)()
              : f),
              o();
          } catch (e) {
            o(e);
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
      31874: (e, r, t) => {
        Promise.resolve().then(t.bind(t, 53291));
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
      37509: (e, r, t) => {
        "use strict";
        t.a(e, async (e, o) => {
          try {
            t.r(r), t.d(r, { default: () => a });
            var s = t(61268),
              n = t(28967),
              i = e([n]);
            function a() {
              return (0, s.jsx)(n._j, {});
            }
            (n = (i.then ? (await i)() : i)[0]), o();
          } catch (e) {
            o(e);
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
      44708: (e) => {
        "use strict";
        e.exports = require("node:https");
      },
      48161: (e) => {
        "use strict";
        e.exports = require("node:os");
      },
      50026: (e, r, t) => {
        Promise.resolve().then(t.bind(t, 37509));
      },
      53053: (e) => {
        "use strict";
        e.exports = require("node:diagnostics_channel");
      },
      53291: (e, r, t) => {
        "use strict";
        let o;
        t.r(r),
          t.d(r, {
            default: () => h,
            generateImageMetadata: () => u,
            generateMetadata: () => l,
            generateViewport: () => p,
          });
        var s = t(63033),
          n = t(26394),
          i = t(60442),
          a = (0, n.registerClientReference)(
            function () {
              throw Error(
                "Attempted to call the default export of \"E:\\\\downloads\\\\Hijraah\\\\apps\\\\web\\\\src\\\\app\\\\[locale]\\\\chat\\\\page.tsx\" from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
              );
            },
            "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\[locale]\\chat\\page.tsx",
            "default",
          );
        let d = { ...s },
          c =
            "workUnitAsyncStorage" in d
              ? d.workUnitAsyncStorage
              : "requestAsyncStorage" in d
                ? d.requestAsyncStorage
                : void 0;
        o =
          "function" == typeof a
            ? new Proxy(a, {
                apply: (e, r, t) => {
                  let o, s, n;
                  try {
                    let e = c?.getStore();
                    (o = e?.headers.get("sentry-trace") ?? void 0),
                      (s = e?.headers.get("baggage") ?? void 0),
                      (n = e?.headers);
                  } catch (e) {}
                  return i
                    .wrapServerComponentWithSentry(e, {
                      componentRoute: "/[locale]/chat",
                      componentType: "Page",
                      sentryTraceHeader: o,
                      baggageHeader: s,
                      headers: n,
                    })
                    .apply(r, t);
                },
              })
            : a;
        let l = void 0,
          u = void 0,
          p = void 0,
          h = o;
      },
      53974: (e, r, t) => {
        "use strict";
        let o;
        t.r(r),
          t.d(r, {
            default: () => h,
            generateImageMetadata: () => u,
            generateMetadata: () => l,
            generateViewport: () => p,
          });
        var s = t(63033),
          n = t(26394),
          i = t(60442),
          a = (0, n.registerClientReference)(
            function () {
              throw Error(
                "Attempted to call the default export of \"E:\\\\downloads\\\\Hijraah\\\\apps\\\\web\\\\src\\\\app\\\\not-found.tsx\" from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
              );
            },
            "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\not-found.tsx",
            "default",
          );
        let d = { ...s },
          c =
            "workUnitAsyncStorage" in d
              ? d.workUnitAsyncStorage
              : "requestAsyncStorage" in d
                ? d.requestAsyncStorage
                : void 0;
        o =
          "function" == typeof a
            ? new Proxy(a, {
                apply: (e, r, t) => {
                  let o, s, n;
                  try {
                    let e = c?.getStore();
                    (o = e?.headers.get("sentry-trace") ?? void 0),
                      (s = e?.headers.get("baggage") ?? void 0),
                      (n = e?.headers);
                  } catch (e) {}
                  return i
                    .wrapServerComponentWithSentry(e, {
                      componentRoute: "/",
                      componentType: "Not-found",
                      sentryTraceHeader: o,
                      baggageHeader: s,
                      headers: n,
                    })
                    .apply(r, t);
                },
              })
            : a;
        let l = void 0,
          u = void 0,
          p = void 0,
          h = o;
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
        var o = t(61268),
          s = t(89882);
        function n() {
          return (
            (0, s.useRouter)(),
            (0, o.jsxs)("div", {
              className:
                "flex flex-col items-center justify-center min-h-screen py-2",
              children: [
                (0, o.jsx)("h1", {
                  className: "text-4xl font-bold",
                  children: "Page Not Found",
                }),
                (0, o.jsx)("p", {
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
          IB: () => o,
          V8: () => a,
          XG: () => i,
          o0: () => n,
          q: () => s,
        });
        let o = ["en", "ar", "es", "fr"],
          s = "en",
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
        function i(e) {
          return n[e] || n[s];
        }
        function a(e) {
          return "rtl" === i(e).direction;
        }
      },
      59059: (e, r, t) => {
        "use strict";
        t.r(r), t.d(r, { default: () => o });
        let o = (0, t(26394).registerClientReference)(
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
      73136: (e) => {
        "use strict";
        e.exports = require("node:url");
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
        t.a(e, async (e, o) => {
          try {
            t.r(r), t.d(r, { default: () => a });
            var s = t(61268);
            t(86896), t(84205);
            var n = t(28909),
              i = e([n]);
            function a({ error: e, reset: r }) {
              return (0, s.jsx)("html", {
                children: (0, s.jsx)("body", {
                  children: (0, s.jsxs)("div", {
                    className:
                      "flex min-h-screen flex-col items-center justify-center p-4 text-center",
                    children: [
                      (0, s.jsx)("h1", {
                        className: "text-4xl font-bold mb-4",
                        children: "Something went wrong!",
                      }),
                      (0, s.jsx)("p", {
                        className: "text-xl mb-8",
                        children: e.message || "An unexpected error occurred",
                      }),
                      (0, s.jsxs)("div", {
                        className: "space-x-4",
                        children: [
                          (0, s.jsx)(n.$, {
                            onClick: () => r(),
                            children: "Try again",
                          }),
                          (0, s.jsx)(n.$, {
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
            (n = (i.then ? (await i)() : i)[0]), o();
          } catch (e) {
            o(e);
          }
        });
      },
      87447: (e, r, t) => {
        "use strict";
        t.a(e, async (e, o) => {
          try {
            t.r(r), t.d(r, { default: () => a });
            var s = t(61268);
            t(84205);
            var n = t(28909),
              i = e([n]);
            function a({ error: e, reset: r }) {
              return (0, s.jsx)("div", {
                className: "flex h-screen",
                children: (0, s.jsxs)("div", {
                  className: "m-auto text-center space-y-4",
                  children: [
                    (0, s.jsx)("h2", {
                      className: "text-2xl font-bold",
                      children: "Something went wrong!",
                    }),
                    (0, s.jsx)("p", {
                      className: "text-muted-foreground",
                      children: e.message,
                    }),
                    (0, s.jsx)(n.$, {
                      onClick: () => r(),
                      variant: "outline",
                      children: "Try again",
                    }),
                  ],
                }),
              });
            }
            (n = (i.then ? (await i)() : i)[0]), o();
          } catch (e) {
            o(e);
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
      90904: (e, r, t) => {
        "use strict";
        t.r(r),
          t.d(r, {
            GlobalError: () => n.default,
            __next_app__: () => l,
            pages: () => c,
            routeModule: () => u,
            tree: () => d,
          });
        var o = t(11610),
          s = t(51293),
          n = t(59059),
          i = t(17770),
          a = {};
        for (let e in i)
          0 >
            [
              "default",
              "tree",
              "pages",
              "GlobalError",
              "__next_app__",
              "routeModule",
            ].indexOf(e) && (a[e] = () => i[e]);
        t.d(r, a);
        let d = {
            children: [
              "",
              {
                children: [
                  "[locale]",
                  {
                    children: [
                      "chat",
                      {
                        children: [
                          "__PAGE__",
                          {},
                          {
                            page: [
                              () => Promise.resolve().then(t.bind(t, 53291)),
                              "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\[locale]\\chat\\page.tsx",
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
          c = [
            "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\[locale]\\chat\\page.tsx",
          ],
          l = { require: t, loadChunk: () => Promise.resolve() },
          u = new o.AppPageRouteModule({
            definition: {
              kind: s.RouteKind.APP_PAGE,
              page: "/[locale]/chat/page",
              pathname: "/[locale]/chat",
              bundlePath: "",
              filename: "",
              appPaths: [],
            },
            userland: { loaderTree: d },
          });
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
        t.r(r), t.d(r, { default: () => o });
        let o = (0, t(26394).registerClientReference)(
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
    o = r.X(
      0,
      [
        827, 6518, 2033, 4027, 2872, 7713, 5149, 8859, 1655, 8029, 5728, 9729,
        3390, 4990, 6188, 7911, 7401, 5124, 7272, 3042, 385, 7393, 4486, 7018,
        4763, 7333, 7145, 9207, 4307, 7111, 8264, 27, 7935, 9008,
      ],
      () => t(90904),
    );
  module.exports = o;
})();
//# sourceMappingURL=page.js.map
