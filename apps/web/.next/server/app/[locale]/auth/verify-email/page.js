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
    (e._sentryDebugIds[r] = "02f6297f-b4bc-4819-ba9c-b08988ccffc5"),
    (e._sentryDebugIdIdentifier =
      "sentry-dbid-02f6297f-b4bc-4819-ba9c-b08988ccffc5"));
} catch (e) {}
(() => {
  var e = {};
  (e.id = 1845),
    (e.ids = [1845, 4630]),
    (e.modules = {
      2618: (e, r, t) => {
        "use strict";
        let s;
        t.r(r),
          t.d(r, {
            default: () => h,
            generateImageMetadata: () => u,
            generateMetadata: () => d,
            generateViewport: () => p,
          });
        var a = t(63033),
          i = t(26394),
          o = t(60442),
          n = (0, i.registerClientReference)(
            function () {
              throw Error(
                "Attempted to call the default export of \"E:\\\\downloads\\\\Hijraah\\\\apps\\\\web\\\\src\\\\app\\\\[locale]\\\\auth\\\\verify-email\\\\page.tsx\" from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
              );
            },
            "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\[locale]\\auth\\verify-email\\page.tsx",
            "default",
          );
        let l = { ...a },
          c =
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
                    let e = c?.getStore();
                    (s = e?.headers.get("sentry-trace") ?? void 0),
                      (a = e?.headers.get("baggage") ?? void 0),
                      (i = e?.headers);
                  } catch (e) {}
                  return o
                    .wrapServerComponentWithSentry(e, {
                      componentRoute: "/[locale]/auth/verify-email",
                      componentType: "Page",
                      sentryTraceHeader: s,
                      baggageHeader: a,
                      headers: i,
                    })
                    .apply(r, t);
                },
              })
            : n;
        let d = void 0,
          u = void 0,
          p = void 0,
          h = s;
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
              Wu: () => h,
              ZB: () => u,
              Zp: () => c,
              aR: () => d,
              wL: () => m,
            });
            var a = t(61268),
              i = t(55728),
              o = t(84205),
              n = t(15942),
              l = e([n]);
            n = (l.then ? (await l)() : l)[0];
            let c = o.forwardRef(({ className: e, ...r }, t) =>
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
            c.displayName = "Card";
            let d = o.forwardRef(({ className: e, ...r }, t) =>
              (0, a.jsx)("div", {
                ref: t,
                className: (0, n.cn)("flex flex-col space-y-1.5 p-6", e),
                ...r,
              }),
            );
            d.displayName = "CardHeader";
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
            let h = o.forwardRef(({ className: e, ...r }, t) =>
              (0, a.jsx)("div", {
                ref: t,
                className: (0, n.cn)("p-6 pt-0", e),
                ...r,
              }),
            );
            h.displayName = "CardContent";
            let m = o.forwardRef(({ className: e, ...r }, t) =>
              (0, a.jsx)("div", {
                ref: t,
                className: (0, n.cn)("flex items-center p-6 pt-0", e),
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
              Cq: () => d,
              GO: () => p,
              cn: () => l,
              lk: () => c,
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
            function d(e) {
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
            default: () => y,
            dynamic: () => p,
            generateImageMetadata: () => g,
            generateMetadata: () => x,
            generateViewport: () => v,
            maxDuration: () => h,
            metadata: () => d,
            viewport: () => u,
          });
        var a = t(63033),
          i = t(35242);
        t(93206);
        var o = t(51433),
          n = t(59107),
          l = t(39862),
          c = t(60442);
        let d = {
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
          f =
            "workUnitAsyncStorage" in m
              ? m.workUnitAsyncStorage
              : "requestAsyncStorage" in m
                ? m.requestAsyncStorage
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
                let e = f?.getStore();
                (s = e?.headers.get("sentry-trace") ?? void 0),
                  (a = e?.headers.get("baggage") ?? void 0),
                  (i = e?.headers);
              } catch (e) {}
              return c
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
        let x = void 0,
          g = void 0,
          v = void 0,
          y = s;
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
            t.d(r, { $: () => c, r: () => d });
            var a = t(61268),
              i = t(86415),
              o = t(91635);
            t(84205);
            var n = t(15942),
              l = e([n]);
            n = (l.then ? (await l)() : l)[0];
            let d = (0, o.F)(
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
              asChild: s = !1,
              ...o
            }) {
              let l = s ? i.DX : "button";
              return (0, a.jsx)(l, {
                "data-slot": "button",
                className: (0, n.cn)(d({ variant: r, size: t, className: e })),
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
      44708: (e) => {
        "use strict";
        e.exports = require("node:https");
      },
      48161: (e) => {
        "use strict";
        e.exports = require("node:os");
      },
      52468: (e, r, t) => {
        "use strict";
        t.a(e, async (e, s) => {
          try {
            t.r(r), t.d(r, { default: () => x });
            var a = t(61268),
              i = t(43128),
              o = t(66135),
              n = t(63091),
              l = t(89882),
              c = t(84205),
              d = t(98654),
              u = t(3519),
              p = t(32367),
              h = t(28909),
              m = t(5451),
              f = e([h, m]);
            function x() {
              let { user: e } = (0, u.useAuth)(),
                r = (0, l.useRouter)(),
                [t, s] = c.useState(!1),
                [f, x] = c.useState(60),
                [g, v] = c.useState(60),
                y = c.useRef(null);
              c.useEffect(() => {
                if (f > 0) {
                  let e = setTimeout(() => x(f - 1), 1e3);
                  return () => clearTimeout(e);
                }
              }, [f]),
                c.useEffect(() => {
                  if (g > 0) {
                    let e = setTimeout(() => v(g - 1), 1e3);
                    return () => clearTimeout(e);
                  }
                }, [g]),
                c.useEffect(() => {
                  0 === g && !t && y.current && y.current.focus();
                }, [g, t]),
                c.useEffect(() => {
                  let e = async () => {
                    try {
                      let e = await (0, p.AG)(),
                        {
                          data: { user: t },
                          error: s,
                        } = await e.auth.getUser();
                      if (s) throw s;
                      t?.email_confirmed_at &&
                        (d.oR.success("Email verified successfully!"),
                        r.push("/dashboard"));
                    } catch (e) {
                      console.error("Error checking verification:", e),
                        d.oR.error(
                          "Failed to check email verification status. Please check your internet connection.",
                        );
                    }
                  };
                  0 === f && (e(), x(60));
                }, [f, r]);
              let b = async () => {
                try {
                  if (!e?.email)
                    return void d.oR.error("Email address not found");
                  s(!0);
                  let r = await (0, p.AG)(),
                    { error: t } = await r.auth.resend({
                      type: "signup",
                      email: e.email,
                    });
                  if (t) throw t;
                  d.oR.success("Verification email resent successfully"),
                    v(60),
                    x(60);
                } catch (e) {
                  console.error("Error resending verification:", e),
                    d.oR.error("Failed to resend verification email"),
                    v(30);
                } finally {
                  s(!1);
                }
              };
              return (0, a.jsx)("div", {
                className:
                  "container flex items-center justify-center min-h-[calc(100vh-4rem)]",
                children: (0, a.jsxs)(m.Zp, {
                  className: "w-full max-w-md",
                  children: [
                    (0, a.jsxs)(m.aR, {
                      children: [
                        (0, a.jsxs)(m.ZB, {
                          className: "flex items-center gap-2",
                          children: [
                            (0, a.jsx)(i.A, { className: "h-5 w-5" }),
                            "Verify Your Email",
                          ],
                        }),
                        (0, a.jsx)(m.BT, {
                          children: e?.email
                            ? (0, a.jsxs)(a.Fragment, {
                                children: [
                                  "We've sent a verification email to",
                                  " ",
                                  (0, a.jsx)("span", {
                                    className: "font-medium",
                                    children: e.email,
                                  }),
                                ],
                              })
                            : "Please check your email for verification instructions",
                        }),
                      ],
                    }),
                    (0, a.jsxs)(m.Wu, {
                      className: "space-y-4",
                      children: [
                        (0, a.jsxs)("div", {
                          className: "text-sm text-muted-foreground",
                          children: [
                            (0, a.jsx)("p", {
                              children:
                                "Please check your email and click the verification link to continue.",
                            }),
                            (0, a.jsxs)("p", {
                              className: "mt-2",
                              children: [
                                "The page will automatically refresh in",
                                " ",
                                (0, a.jsx)("span", {
                                  className: "font-medium",
                                  children: f,
                                }),
                                " ",
                                "seconds.",
                              ],
                            }),
                          ],
                        }),
                        (0, a.jsx)("div", {
                          className: "flex items-center justify-center",
                          children:
                            0 === f &&
                            (0, a.jsx)(o.A, {
                              className: "h-8 w-8 animate-spin text-primary",
                            }),
                        }),
                      ],
                    }),
                    (0, a.jsxs)(m.wL, {
                      className: "flex flex-col gap-4",
                      children: [
                        (0, a.jsx)(h.$, {
                          ref: y,
                          variant: "outline",
                          className: "w-full",
                          onClick: b,
                          disabled: t || g > 0,
                          children: t
                            ? (0, a.jsxs)(a.Fragment, {
                                children: [
                                  (0, a.jsx)(o.A, {
                                    className: "mr-2 h-4 w-4 animate-spin",
                                  }),
                                  "Resending...",
                                ],
                              })
                            : (0, a.jsxs)(a.Fragment, {
                                children: [
                                  (0, a.jsx)(n.A, {
                                    className: "mr-2 h-4 w-4",
                                  }),
                                  "Resend Verification Email",
                                  g > 0 && ` (${g}s)`,
                                ],
                              }),
                        }),
                        (0, a.jsx)("div", {
                          className: "text-center text-sm",
                          children: (0, a.jsx)(h.$, {
                            variant: "link",
                            className: "text-muted-foreground",
                            onClick: () => r.push("/auth/login"),
                            children: "Back to Sign In",
                          }),
                        }),
                      ],
                    }),
                  ],
                }),
              });
            }
            ([h, m] = f.then ? (await f)() : f), s();
          } catch (e) {
            s(e);
          }
        });
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
            generateMetadata: () => d,
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
          c =
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
                    let e = c?.getStore();
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
        let d = void 0,
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
      83997: (e) => {
        "use strict";
        e.exports = require("tty");
      },
      84297: (e) => {
        "use strict";
        e.exports = require("async_hooks");
      },
      84396: (e, r, t) => {
        Promise.resolve().then(t.bind(t, 2618));
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
      90476: (e, r, t) => {
        Promise.resolve().then(t.bind(t, 52468));
      },
      91645: (e) => {
        "use strict";
        e.exports = require("net");
      },
      93206: () => {},
      94196: (e, r, t) => {
        "use strict";
        t.r(r),
          t.d(r, {
            GlobalError: () => i.default,
            __next_app__: () => d,
            pages: () => c,
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
                          "verify-email",
                          {
                            children: [
                              "__PAGE__",
                              {},
                              {
                                page: [
                                  () => Promise.resolve().then(t.bind(t, 2618)),
                                  "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\[locale]\\auth\\verify-email\\page.tsx",
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
          c = [
            "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\[locale]\\auth\\verify-email\\page.tsx",
          ],
          d = { require: t, loadChunk: () => Promise.resolve() },
          u = new s.AppPageRouteModule({
            definition: {
              kind: a.RouteKind.APP_PAGE,
              page: "/[locale]/auth/verify-email/page",
              pathname: "/[locale]/auth/verify-email",
              bundlePath: "",
              filename: "",
              appPaths: [],
            },
            userland: { loaderTree: l },
          });
      },
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
  var r = require("../../../../webpack-runtime.js");
  r.C(e);
  var t = (e) => r((r.s = e)),
    s = r.X(
      0,
      [
        827, 6518, 2033, 4027, 2872, 7713, 5149, 8859, 1655, 8029, 5728, 9729,
        3390, 4990, 6188, 7911, 7401, 5124, 7272, 3042, 385, 7393, 4486, 7018,
        4763, 7333, 7145, 9207, 8264, 27, 7935,
      ],
      () => t(94196),
    );
  module.exports = s;
})();
//# sourceMappingURL=page.js.map
