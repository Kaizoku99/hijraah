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
    (e._sentryDebugIds[r] = "d671cf19-01a3-4b13-92ec-6296bb705566"),
    (e._sentryDebugIdIdentifier =
      "sentry-dbid-d671cf19-01a3-4b13-92ec-6296bb705566"));
} catch (e) {}
(() => {
  var e = {};
  (e.id = 7096),
    (e.ids = [4630, 7096]),
    (e.modules = {
      3295: (e) => {
        "use strict";
        e.exports = require("next/dist/server/app-render/after-task-async-storage.external.js");
      },
      5224: (e, r, t) => {
        "use strict";
        t.d(r, { X5: () => a, zK: () => i });
        var s = t(36352);
        let a = s.Ik({
            email: s
              .Yj()
              .email({ message: "Please enter a valid email address" }),
            password: s.Yj().min(1, { message: "Password is required" }),
          }),
          i = s
            .Ik({
              email: s
                .Yj()
                .email({ message: "Please enter a valid email address" }),
              password: s
                .Yj()
                .min(8, { message: "Password must be at least 8 characters" })
                .refine((e) => /[A-Z]/.test(e), {
                  message:
                    "Password must contain at least one uppercase letter",
                })
                .refine((e) => /[a-z]/.test(e), {
                  message:
                    "Password must contain at least one lowercase letter",
                })
                .refine((e) => /[0-9]/.test(e), {
                  message: "Password must contain at least one number",
                })
                .refine((e) => /[^A-Za-z0-9]/.test(e), {
                  message:
                    "Password must contain at least one special character",
                }),
              confirmPassword: s.Yj(),
            })
            .refine((e) => e.password === e.confirmPassword, {
              message: "Passwords do not match",
              path: ["confirmPassword"],
            });
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
              i = t(55728),
              o = t(84205),
              n = t(15942),
              l = e([n]);
            n = (l.then ? (await l)() : l)[0];
            let d = o.forwardRef(({ className: e, ...r }, t) =>
              (0, a.jsx)(i.P.div, {
                ref: t,
                className: (0, n.cn)(
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
                className: (0, n.cn)("flex flex-col space-y-1.5 p-6", e),
                ...r,
              }),
            );
            c.displayName = "CardHeader";
            let u = o.forwardRef(({ className: e, ...r }, t) =>
              (0, a.jsx)("h3", {
                ref: t,
                className: (0, n.cn)(
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
                className: (0, n.cn)("text-sm text-muted-foreground", e),
                ...r,
              }),
            );
            p.displayName = "CardDescription";
            let m = o.forwardRef(({ className: e, ...r }, t) =>
              (0, a.jsx)("div", {
                ref: t,
                className: (0, n.cn)("p-6 pt-0", e),
                ...r,
              }),
            );
            m.displayName = "CardContent";
            let h = o.forwardRef(({ className: e, ...r }, t) =>
              (0, a.jsx)("div", {
                ref: t,
                className: (0, n.cn)("flex items-center p-6 pt-0", e),
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
            var i = t(79029),
              o = t(58360),
              n = e([a]);
            function l(...e) {
              return (0, o.QP)((0, i.$)(e));
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
            a = (n.then ? (await n)() : n)[0];
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
              i = t(30595);
            t(84205);
            var o = t(15942),
              n = e([o]);
            function l({ className: e, ...r }) {
              return (0, a.jsx)(i.b, {
                "data-slot": "label",
                className: (0, o.cn)(
                  "flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
                  e,
                ),
                ...r,
              });
            }
            (o = (n.then ? (await n)() : n)[0]), s();
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
      21366: (e, r, t) => {
        "use strict";
        t.d(r, { j: () => i });
        var s = t(61268),
          a = t(61950);
        function i({ message: e }) {
          return e
            ? (0, s.jsxs)("div", {
                className:
                  "bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive",
                children: [
                  (0, s.jsx)(a.A, { className: "h-4 w-4" }),
                  (0, s.jsx)("p", { children: e }),
                ],
              })
            : null;
        }
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
            default: () => y,
            dynamic: () => p,
            generateImageMetadata: () => f,
            generateMetadata: () => g,
            generateViewport: () => v,
            maxDuration: () => m,
            metadata: () => c,
            viewport: () => u,
          });
        var a = t(63033),
          i = t(35242);
        t(93206);
        var o = t(51433),
          n = t(59107),
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
            return (0, i.jsxs)(i.Fragment, {
              children: [
                e,
                (0, i.jsx)(n.Analytics, {}),
                (0, i.jsx)(l.SpeedInsights, {}),
                r && (0, i.jsx)(o.StagewiseToolbar, { config: r }),
              ],
            });
          },
          {
            apply: (e, r, t) => {
              let s, a, i;
              try {
                let e = x?.getStore();
                (s = e?.headers.get("sentry-trace") ?? void 0),
                  (a = e?.headers.get("baggage") ?? void 0),
                  (i = e?.headers);
              } catch (e) {}
              return d
                .wrapServerComponentWithSentry(e, {
                  componentRoute: "/",
                  componentType: "Layout",
                  sentryTraceHeader: s,
                  baggageHeader: a,
                  headers: i,
                })
                .apply(r, t);
            },
          },
        );
        let g = void 0,
          f = void 0,
          v = void 0,
          y = s;
      },
      26162: (e, r, t) => {
        "use strict";
        t.a(e, async (e, s) => {
          try {
            t.d(r, { M: () => n });
            var a = t(61268);
            t(84205);
            var i = t(15942),
              o = e([i]);
            function n({ password: e, className: r }) {
              let t = (function (e) {
                  if (!e || e.length < 6) return "weak";
                  if (e.length < 8) return "medium";
                  let r = /[A-Z]/.test(e),
                    t = /[a-z]/.test(e),
                    s = /\d/.test(e),
                    a = /[!@#$%^&*(),.?":{}|<>]/.test(e),
                    i = [r, t, s, a].filter(Boolean).length;
                  return e.length >= 12 && i >= 3
                    ? "very-strong"
                    : e.length >= 8 && i >= 2
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
                className: (0, i.cn)("space-y-2", r),
                children: [
                  (0, a.jsx)("div", {
                    className: "h-1 w-full bg-muted rounded overflow-hidden",
                    children: (0, a.jsx)("div", {
                      className: (0, i.cn)(
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
            (i = (o.then ? (await o)() : o)[0]), s();
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
              i = t(86415),
              o = t(91635);
            t(84205);
            var n = t(15942),
              l = e([n]);
            n = (l.then ? (await l)() : l)[0];
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
              let l = s ? i.DX : "button";
              return (0, a.jsx)(l, {
                "data-slot": "button",
                className: (0, n.cn)(c({ variant: r, size: t, className: e })),
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
      32662: (e, r, t) => {
        Promise.resolve().then(t.bind(t, 65462));
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
      43946: (e, r, t) => {
        "use strict";
        t.d(r, { A: () => s });
        let s = (0, t(95255).A)("KeyRound", [
          [
            "path",
            {
              d: "M2 18v3c0 .6.4 1 1 1h4v-3h3v-3h2l1.4-1.4a6.5 6.5 0 1 0-4-4Z",
              key: "167ctg",
            },
          ],
          [
            "circle",
            {
              cx: "16.5",
              cy: "7.5",
              r: ".5",
              fill: "currentColor",
              key: "w0ekpg",
            },
          ],
        ]);
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
            default: () => m,
            generateImageMetadata: () => u,
            generateMetadata: () => c,
            generateViewport: () => p,
          });
        var a = t(63033),
          i = t(26394),
          o = t(60442),
          n = (0, i.registerClientReference)(
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
          "function" == typeof n
            ? new Proxy(n, {
                apply: (e, r, t) => {
                  let s, a, i;
                  try {
                    let e = d?.getStore();
                    (s = e?.headers.get("sentry-trace") ?? void 0),
                      (a = e?.headers.get("baggage") ?? void 0),
                      (i = e?.headers);
                  } catch (e) {}
                  return o
                    .wrapServerComponentWithSentry(e, {
                      componentRoute: "/",
                      componentType: "Not-found",
                      sentryTraceHeader: s,
                      baggageHeader: a,
                      headers: i,
                    })
                    .apply(r, t);
                },
              })
            : n;
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
        t.r(r), t.d(r, { default: () => i });
        var s = t(61268),
          a = t(89882);
        function i() {
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
          V8: () => n,
          XG: () => o,
          o0: () => i,
          q: () => a,
        });
        let s = ["en", "ar", "es", "fr"],
          a = "en",
          i = {
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
          return i[e] || i[a];
        }
        function n(e) {
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
      65163: (e, r, t) => {
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
          i = t(26394),
          o = t(60442),
          n = (0, i.registerClientReference)(
            function () {
              throw Error(
                "Attempted to call the default export of \"E:\\\\downloads\\\\Hijraah\\\\apps\\\\web\\\\src\\\\app\\\\[locale]\\\\auth\\\\page.tsx\" from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
              );
            },
            "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\[locale]\\auth\\page.tsx",
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
          "function" == typeof n
            ? new Proxy(n, {
                apply: (e, r, t) => {
                  let s, a, i;
                  try {
                    let e = d?.getStore();
                    (s = e?.headers.get("sentry-trace") ?? void 0),
                      (a = e?.headers.get("baggage") ?? void 0),
                      (i = e?.headers);
                  } catch (e) {}
                  return o
                    .wrapServerComponentWithSentry(e, {
                      componentRoute: "/[locale]/auth",
                      componentType: "Page",
                      sentryTraceHeader: s,
                      baggageHeader: a,
                      headers: i,
                    })
                    .apply(r, t);
                },
              })
            : n;
        let c = void 0,
          u = void 0,
          p = void 0,
          m = s;
      },
      65462: (e, r, t) => {
        "use strict";
        t.a(e, async (e, s) => {
          try {
            t.r(r), t.d(r, { default: () => E });
            var a = t(61268),
              i = t(97052),
              o = t(6130),
              n = t(85044),
              l = t(43128),
              d = t(43946),
              c = t(98683),
              u = t(19688),
              p = t(66135),
              m = t(82285),
              h = t(31655),
              x = t.n(h),
              g = t(89882),
              f = t(84205),
              v = t(36322),
              y = t(97721),
              b = t(15090),
              w = t(3519),
              j = t(5224),
              N = t(28909),
              P = t(5451),
              k = t(21366),
              C = t(78337),
              q = t(16979),
              A = t(26162),
              _ = e([N, P, C, q, A]);
            function E() {
              let [e, r] = (0, f.useState)(!1),
                { signUp: t } = (0, w.useAuth)(),
                { toast: s } = (0, b.d)(),
                h = (0, g.useRouter)(),
                {
                  register: _,
                  handleSubmit: E,
                  watch: S,
                  formState: { errors: M },
                } = (0, v.mN)({
                  resolver: (0, i.u)(j.zK),
                  defaultValues: {
                    email: "",
                    password: "",
                    confirmPassword: "",
                  },
                  mode: "onChange",
                }),
                H = S("password", ""),
                D = [
                  {
                    id: "length",
                    label: "Must be at least 8 characters",
                    isValid: H.length >= 8,
                  },
                  {
                    id: "uppercase",
                    label: "Contains uppercase letter",
                    isValid: /[A-Z]/.test(H),
                  },
                  {
                    id: "lowercase",
                    label: "Contains lowercase letter",
                    isValid: /[a-z]/.test(H),
                  },
                  {
                    id: "number",
                    label: "Contains number",
                    isValid: /[0-9]/.test(H),
                  },
                  {
                    id: "special",
                    label: "Contains special character",
                    isValid: /[^A-Za-z0-9]/.test(H),
                  },
                ],
                I = async (e) => {
                  r(!0);
                  try {
                    await t(e.email, e.password);
                    try {
                      await fetch("/api/onboarding/init", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                      });
                    } catch (e) {
                      console.error("Error initializing onboarding:", e);
                    }
                    s({
                      title: "Register",
                      description:
                        "Registration successful! Please check your email to verify your account.",
                    }),
                      h.push("/auth/login");
                  } catch (e) {
                    s({
                      variant: "destructive",
                      title: "Error",
                      description:
                        e instanceof Error
                          ? e.message
                          : "An unexpected error occurred. Please try again.",
                    });
                  } finally {
                    r(!1);
                  }
                };
              return (0, a.jsxs)("div", {
                className:
                  "bg-gradient-to-br from-background to-muted flex min-h-svh flex-col items-center justify-center p-4 md:p-8",
                children: [
                  (0, a.jsx)(y.U, {}),
                  (0, a.jsxs)(o.P.div, {
                    initial: { opacity: 0, y: -20 },
                    animate: { opacity: 1, y: 0 },
                    transition: { duration: 0.3 },
                    className:
                      "w-full max-w-md px-4 py-8 flex flex-col items-center gap-8",
                    children: [
                      (0, a.jsxs)(x(), {
                        href: "/",
                        className:
                          "flex items-center gap-3 self-center transition-transform hover:scale-105",
                        legacyBehavior: !0,
                        children: [
                          (0, a.jsx)("div", {
                            className:
                              "bg-primary text-primary-foreground flex size-8 items-center justify-center rounded-md shadow-md",
                            children: (0, a.jsx)(n.A, { className: "size-4" }),
                          }),
                          (0, a.jsx)("span", {
                            className: "font-semibold text-xl tracking-tight",
                            children: "Hijraah",
                          }),
                        ],
                      }),
                      (0, a.jsx)(o.P.div, {
                        initial: { opacity: 0, scale: 0.95 },
                        animate: { opacity: 1, scale: 1 },
                        transition: { delay: 0.1, duration: 0.4 },
                        className: "w-full",
                        children: (0, a.jsxs)(P.Zp, {
                          className: "border-border/30 shadow-lg",
                          children: [
                            (0, a.jsxs)(P.aR, {
                              className: "space-y-2 text-center pb-6",
                              children: [
                                (0, a.jsx)(P.ZB, {
                                  className: "text-2xl font-bold",
                                  children: "Create an account",
                                }),
                                (0, a.jsx)(P.BT, {
                                  className: "text-muted-foreground",
                                  children:
                                    "Enter your details below to create your account",
                                }),
                              ],
                            }),
                            (0, a.jsx)(P.Wu, {
                              children: (0, a.jsx)("form", {
                                onSubmit: E(I),
                                className: "space-y-6",
                                children: (0, a.jsxs)("div", {
                                  className: "space-y-4",
                                  children: [
                                    (0, a.jsxs)("div", {
                                      className: "space-y-2",
                                      children: [
                                        (0, a.jsx)(q.J, {
                                          htmlFor: "email",
                                          className: "text-sm font-medium",
                                          children: "Email",
                                        }),
                                        (0, a.jsxs)("div", {
                                          className: "relative",
                                          children: [
                                            (0, a.jsx)(l.A, {
                                              className:
                                                "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground",
                                            }),
                                            (0, a.jsx)(C.p, {
                                              id: "email",
                                              type: "email",
                                              placeholder: "name@example.com",
                                              className: "pl-10",
                                              "aria-invalid": !!M.email,
                                              "aria-describedby": M.email
                                                ? "email-error"
                                                : void 0,
                                              disabled: e,
                                              ..._("email"),
                                            }),
                                          ],
                                        }),
                                        M.email &&
                                          (0, a.jsx)(k.j, {
                                            message: M.email.message,
                                            id: "email-error",
                                          }),
                                      ],
                                    }),
                                    (0, a.jsxs)("div", {
                                      className: "space-y-2",
                                      children: [
                                        (0, a.jsx)(q.J, {
                                          htmlFor: "password",
                                          className: "text-sm font-medium",
                                          children: "Password",
                                        }),
                                        (0, a.jsxs)("div", {
                                          className: "relative",
                                          children: [
                                            (0, a.jsx)(d.A, {
                                              className:
                                                "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground",
                                            }),
                                            (0, a.jsx)(C.p, {
                                              id: "password",
                                              type: "password",
                                              className: "pl-10",
                                              "aria-invalid": !!M.password,
                                              "aria-describedby": M.password
                                                ? "password-error"
                                                : void 0,
                                              disabled: e,
                                              ..._("password"),
                                            }),
                                          ],
                                        }),
                                        M.password &&
                                          (0, a.jsx)(k.j, {
                                            message: M.password.message,
                                            id: "password-error",
                                          }),
                                        H &&
                                          (0, a.jsx)(A.M, {
                                            password: H,
                                            className: "mt-3",
                                          }),
                                        H &&
                                          (0, a.jsx)("div", {
                                            className:
                                              "grid grid-cols-1 md:grid-cols-2 gap-2 mt-3",
                                            children: D.map(
                                              ({
                                                id: e,
                                                label: r,
                                                isValid: t,
                                              }) =>
                                                (0, a.jsxs)(
                                                  "div",
                                                  {
                                                    className:
                                                      "flex items-center gap-2 text-xs",
                                                    children: [
                                                      t
                                                        ? (0, a.jsx)(c.A, {
                                                            className:
                                                              "h-3.5 w-3.5 text-emerald-500",
                                                          })
                                                        : (0, a.jsx)(u.A, {
                                                            className:
                                                              "h-3.5 w-3.5 text-muted-foreground",
                                                          }),
                                                      (0, a.jsx)("span", {
                                                        className: t
                                                          ? "text-emerald-500"
                                                          : "text-muted-foreground",
                                                        children: r,
                                                      }),
                                                    ],
                                                  },
                                                  e,
                                                ),
                                            ),
                                          }),
                                      ],
                                    }),
                                    (0, a.jsxs)("div", {
                                      className: "space-y-2",
                                      children: [
                                        (0, a.jsx)(q.J, {
                                          htmlFor: "confirm-password",
                                          className: "text-sm font-medium",
                                          children: "Confirm Password",
                                        }),
                                        (0, a.jsxs)("div", {
                                          className: "relative",
                                          children: [
                                            (0, a.jsx)(d.A, {
                                              className:
                                                "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground",
                                            }),
                                            (0, a.jsx)(C.p, {
                                              id: "confirm-password",
                                              type: "password",
                                              className: "pl-10",
                                              "aria-invalid":
                                                !!M.confirmPassword,
                                              "aria-describedby":
                                                M.confirmPassword
                                                  ? "confirm-password-error"
                                                  : void 0,
                                              disabled: e,
                                              ..._("confirmPassword"),
                                            }),
                                          ],
                                        }),
                                        M.confirmPassword &&
                                          (0, a.jsx)(k.j, {
                                            message: M.confirmPassword.message,
                                            id: "confirm-password-error",
                                          }),
                                      ],
                                    }),
                                    (0, a.jsx)(N.$, {
                                      type: "submit",
                                      className: "w-full font-medium mt-2",
                                      disabled: e,
                                      children: e
                                        ? (0, a.jsxs)(a.Fragment, {
                                            children: [
                                              (0, a.jsx)(p.A, {
                                                className:
                                                  "mr-2 h-4 w-4 animate-spin",
                                              }),
                                              "Creating account...",
                                            ],
                                          })
                                        : (0, a.jsxs)(a.Fragment, {
                                            children: [
                                              "Create Account",
                                              (0, a.jsx)(m.A, {
                                                className: "ml-2 h-4 w-4",
                                              }),
                                            ],
                                          }),
                                    }),
                                  ],
                                }),
                              }),
                            }),
                            (0, a.jsx)(P.wL, {
                              className:
                                "flex justify-center border-t bg-muted/30 p-4",
                              children: (0, a.jsxs)("p", {
                                className: "text-center text-sm",
                                children: [
                                  "Already have an account?",
                                  " ",
                                  (0, a.jsx)(x(), {
                                    href: "/auth/login",
                                    className:
                                      "text-primary font-medium hover:underline underline-offset-4",
                                    children: "Sign in",
                                  }),
                                ],
                              }),
                            }),
                          ],
                        }),
                      }),
                      (0, a.jsxs)("p", {
                        className:
                          "text-muted-foreground text-center text-xs max-w-xs",
                        children: [
                          "By clicking Create Account, you agree to our",
                          " ",
                          (0, a.jsx)(x(), {
                            href: "/terms",
                            className:
                              "text-primary hover:underline underline-offset-4",
                            children: "Terms of Service",
                          }),
                          " ",
                          "and",
                          " ",
                          (0, a.jsx)(x(), {
                            href: "/privacy",
                            className:
                              "text-primary hover:underline underline-offset-4",
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
            ([N, P, C, q, A] = _.then ? (await _)() : _), s();
          } catch (e) {
            s(e);
          }
        });
      },
      69621: (e, r, t) => {
        Promise.resolve().then(t.bind(t, 94745));
      },
      70772: (e, r, t) => {
        "use strict";
        t.r(r),
          t.d(r, {
            GlobalError: () => i.default,
            __next_app__: () => c,
            pages: () => d,
            routeModule: () => u,
            tree: () => l,
          });
        var s = t(11610),
          a = t(51293),
          i = t(59059),
          o = t(17770),
          n = {};
        for (let e in o)
          0 >
            [
              "default",
              "tree",
              "pages",
              "GlobalError",
              "__next_app__",
              "routeModule",
            ].indexOf(e) && (n[e] = () => o[e]);
        t.d(r, n);
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
                          "__PAGE__",
                          {},
                          {
                            page: [
                              () => Promise.resolve().then(t.bind(t, 65163)),
                              "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\[locale]\\auth\\page.tsx",
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
            "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\[locale]\\auth\\page.tsx",
          ],
          c = { require: t, loadChunk: () => Promise.resolve() },
          u = new s.AppPageRouteModule({
            definition: {
              kind: a.RouteKind.APP_PAGE,
              page: "/[locale]/auth/page",
              pathname: "/[locale]/auth",
              bundlePath: "",
              filename: "",
              appPaths: [],
            },
            userland: { loaderTree: l },
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
      85044: (e, r, t) => {
        "use strict";
        t.d(r, { A: () => s });
        let s = (0, t(95255).A)("GalleryVerticalEnd", [
          ["path", { d: "M7 2h10", key: "nczekb" }],
          ["path", { d: "M5 6h14", key: "u2x4p" }],
          [
            "rect",
            {
              width: "18",
              height: "12",
              x: "3",
              y: "10",
              rx: "2",
              key: "l0tzu3",
            },
          ],
        ]);
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
            t.r(r), t.d(r, { default: () => n });
            var a = t(61268);
            t(86896), t(84205);
            var i = t(28909),
              o = e([i]);
            function n({ error: e, reset: r }) {
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
                          (0, a.jsx)(i.$, {
                            onClick: () => r(),
                            children: "Try again",
                          }),
                          (0, a.jsx)(i.$, {
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
            (i = (o.then ? (await o)() : o)[0]), s();
          } catch (e) {
            s(e);
          }
        });
      },
      87447: (e, r, t) => {
        "use strict";
        t.a(e, async (e, s) => {
          try {
            t.r(r), t.d(r, { default: () => n });
            var a = t(61268);
            t(84205);
            var i = t(28909),
              o = e([i]);
            function n({ error: e, reset: r }) {
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
                    (0, a.jsx)(i.$, {
                      onClick: () => r(),
                      variant: "outline",
                      children: "Try again",
                    }),
                  ],
                }),
              });
            }
            (i = (o.then ? (await o)() : o)[0]), s();
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
      92910: (e, r, t) => {
        Promise.resolve().then(t.bind(t, 65163));
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
      97721: (e, r, t) => {
        "use strict";
        t.d(r, { U: () => n });
        var s = t(89882);
        t(84205);
        var a = t(67135),
          i = t(3519),
          o = t(32367);
        function n() {
          (0, s.useRouter)();
          let { user: e } = (0, i.useAuth)();
          (0, o.UU)();
          let { onboarding: r } = (0, a.z)();
          return null;
        }
      },
      97927: (e, r, t) => {
        Promise.resolve().then(t.bind(t, 51433)),
          Promise.resolve().then(t.bind(t, 59107)),
          Promise.resolve().then(t.bind(t, 39862));
      },
      98683: (e, r, t) => {
        "use strict";
        t.d(r, { A: () => s });
        let s = (0, t(95255).A)("CheckCircle2", [
          ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
          ["path", { d: "m9 12 2 2 4-4", key: "dzmm74" }],
        ]);
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
        4763, 7333, 7145, 9207, 1502, 7052, 3749, 8264, 27, 7935,
      ],
      () => t(70772),
    );
  module.exports = s;
})();
//# sourceMappingURL=page.js.map
