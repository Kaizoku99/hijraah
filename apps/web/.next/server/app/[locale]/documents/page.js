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
    (e._sentryDebugIds[t] = "e43e8dda-da6e-4abb-acba-fdf6a7eb87b3"),
    (e._sentryDebugIdIdentifier =
      "sentry-dbid-e43e8dda-da6e-4abb-acba-fdf6a7eb87b3"));
} catch (e) {}
(() => {
  var e = {};
  (e.id = 440),
    (e.ids = [440, 4630]),
    (e.modules = {
      3295: (e) => {
        "use strict";
        e.exports = require("next/dist/server/app-render/after-task-async-storage.external.js");
      },
      5451: (e, t, r) => {
        "use strict";
        r.a(e, async (e, s) => {
          try {
            r.d(t, {
              BT: () => p,
              Wu: () => h,
              ZB: () => u,
              Zp: () => l,
              aR: () => c,
              wL: () => m,
            });
            var a = r(61268),
              o = r(55728),
              i = r(84205),
              n = r(15942),
              d = e([n]);
            n = (d.then ? (await d)() : d)[0];
            let l = i.forwardRef(({ className: e, ...t }, r) =>
              (0, a.jsx)(o.P.div, {
                ref: r,
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
                ...t,
              }),
            );
            l.displayName = "Card";
            let c = i.forwardRef(({ className: e, ...t }, r) =>
              (0, a.jsx)("div", {
                ref: r,
                className: (0, n.cn)("flex flex-col space-y-1.5 p-6", e),
                ...t,
              }),
            );
            c.displayName = "CardHeader";
            let u = i.forwardRef(({ className: e, ...t }, r) =>
              (0, a.jsx)("h3", {
                ref: r,
                className: (0, n.cn)(
                  "text-2xl font-semibold leading-none tracking-tight",
                  e,
                ),
                ...t,
              }),
            );
            u.displayName = "CardTitle";
            let p = i.forwardRef(({ className: e, ...t }, r) =>
              (0, a.jsx)("p", {
                ref: r,
                className: (0, n.cn)("text-sm text-muted-foreground", e),
                ...t,
              }),
            );
            p.displayName = "CardDescription";
            let h = i.forwardRef(({ className: e, ...t }, r) =>
              (0, a.jsx)("div", {
                ref: r,
                className: (0, n.cn)("p-6 pt-0", e),
                ...t,
              }),
            );
            h.displayName = "CardContent";
            let m = i.forwardRef(({ className: e, ...t }, r) =>
              (0, a.jsx)("div", {
                ref: r,
                className: (0, n.cn)("flex items-center p-6 pt-0", e),
                ...t,
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
      8880: (e, t, r) => {
        Promise.resolve().then(r.bind(r, 45157));
      },
      8963: (e) => {
        function t(e) {
          var t = Error("Cannot find module '" + e + "'");
          throw ((t.code = "MODULE_NOT_FOUND"), t);
        }
        (t.keys = () => []), (t.resolve = t), (t.id = 8963), (e.exports = t);
      },
      10846: (e) => {
        "use strict";
        e.exports = require("next/dist/compiled/next-server/app-page.runtime.prod.js");
      },
      11997: (e) => {
        "use strict";
        e.exports = require("punycode");
      },
      15942: (e, t, r) => {
        "use strict";
        r.a(e, async (e, s) => {
          try {
            r.d(t, {
              Cq: () => c,
              GO: () => p,
              cn: () => d,
              lk: () => l,
              y8: () => u,
            });
            var a = r(85488);
            r(3477);
            var o = r(79029),
              i = r(58360),
              n = e([a]);
            function d(...e) {
              return (0, i.QP)((0, o.$)(e));
            }
            function l() {
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
            function c(e) {
              if (0 === e) return "0 Bytes";
              let t = Math.floor(Math.log(e) / Math.log(1024));
              return (
                parseFloat((e / Math.pow(1024, t)).toFixed(2)) +
                " " +
                ["Bytes", "KB", "MB", "GB", "TB"][t]
              );
            }
            a = (n.then ? (await n)() : n)[0];
            let p = async (e) => {
              let t = await fetch(e);
              if (!t.ok) {
                let e = Error("An error occurred while fetching the data.");
                try {
                  e.info = await t.json();
                } catch (r) {
                  e.info = t.statusText;
                }
                throw ((e.status = t.status), e);
              }
              return t.json();
            };
            function u(e) {
              return e.map((e) => {
                var t;
                return {
                  ...e,
                  content:
                    ((t = e.content),
                    "string" != typeof t
                      ? ""
                      : t.replace(/<has_function_call>/g, "")),
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
      22630: (e, t, r) => {
        "use strict";
        let s;
        r.r(t),
          r.d(t, {
            default: () => b,
            dynamic: () => p,
            generateImageMetadata: () => x,
            generateMetadata: () => g,
            generateViewport: () => v,
            maxDuration: () => h,
            metadata: () => c,
            viewport: () => u,
          });
        var a = r(63033),
          o = r(35242);
        r(93206);
        var i = r(51433),
          n = r(59107),
          d = r(39862),
          l = r(60442);
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
          f =
            "workUnitAsyncStorage" in m
              ? m.workUnitAsyncStorage
              : "requestAsyncStorage" in m
                ? m.requestAsyncStorage
                : void 0;
        s = new Proxy(
          function ({ children: e }) {
            let t = { plugins: [] };
            return (0, o.jsxs)(o.Fragment, {
              children: [
                e,
                (0, o.jsx)(n.Analytics, {}),
                (0, o.jsx)(d.SpeedInsights, {}),
                t && (0, o.jsx)(i.StagewiseToolbar, { config: t }),
              ],
            });
          },
          {
            apply: (e, t, r) => {
              let s, a, o;
              try {
                let e = f?.getStore();
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
                .apply(t, r);
            },
          },
        );
        let g = void 0,
          x = void 0,
          v = void 0,
          b = s;
      },
      24131: (e, t, r) => {
        "use strict";
        r.d(t, { A: () => s });
        let s = (0, r(95255).A)("MoreHorizontal", [
          ["circle", { cx: "12", cy: "12", r: "1", key: "41hilf" }],
          ["circle", { cx: "19", cy: "12", r: "1", key: "1wjl8i" }],
          ["circle", { cx: "5", cy: "12", r: "1", key: "1pcz8c" }],
        ]);
      },
      26564: (e) => {
        function t(e) {
          var t = Error("Cannot find module '" + e + "'");
          throw ((t.code = "MODULE_NOT_FOUND"), t);
        }
        (t.keys = () => []), (t.resolve = t), (t.id = 26564), (e.exports = t);
      },
      27910: (e) => {
        "use strict";
        e.exports = require("stream");
      },
      28169: (e, t, r) => {
        Promise.resolve().then(r.bind(r, 87113));
      },
      28191: (e, t, r) => {
        Promise.resolve().then(r.bind(r, 84792)),
          Promise.resolve().then(r.bind(r, 66561)),
          Promise.resolve().then(r.bind(r, 25052));
      },
      28354: (e) => {
        "use strict";
        e.exports = require("util");
      },
      28909: (e, t, r) => {
        "use strict";
        r.a(e, async (e, s) => {
          try {
            r.d(t, { $: () => l, r: () => c });
            var a = r(61268),
              o = r(86415),
              i = r(91635);
            r(84205);
            var n = r(15942),
              d = e([n]);
            n = (d.then ? (await d)() : d)[0];
            let c = (0, i.F)(
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
              variant: t,
              size: r,
              asChild: s = !1,
              ...i
            }) {
              let d = s ? o.DX : "button";
              return (0, a.jsx)(d, {
                "data-slot": "button",
                className: (0, n.cn)(c({ variant: t, size: r, className: e })),
                ...i,
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
      42944: (e, t, r) => {
        "use strict";
        r.d(t, { A: () => s });
        let s = (0, r(95255).A)("PlusCircle", [
          ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
          ["path", { d: "M8 12h8", key: "1wcyev" }],
          ["path", { d: "M12 8v8", key: "napkw2" }],
        ]);
      },
      44708: (e) => {
        "use strict";
        e.exports = require("node:https");
      },
      45157: (e, t, r) => {
        "use strict";
        r.a(e, async (e, s) => {
          try {
            r.r(t), r.d(t, { default: () => g });
            var a = r(61268),
              o = r(42944),
              i = r(95124),
              n = r(84205),
              d = r(28909),
              l = r(20149),
              c = r(81774),
              u = r(79366),
              p = r(58702),
              h = r(3452),
              m = r(15942),
              f = e([d, l, c, m]);
            [d, l, c, m] = f.then ? (await f)() : f;
            let x = async () => (
              await new Promise((e) => setTimeout(e, 1e3)),
              [
                {
                  id: "doc1",
                  name: "Passport Scan",
                  status: "ready",
                  created_at: new Date().toISOString(),
                  file_type: "pdf",
                  file_size: 512e3,
                  description: "Scan of main passport page.",
                  user_id: "mock-user-1",
                  case_id: "1",
                  file_path: "/mock/passport.pdf",
                  metadata: null,
                  updated_at: new Date().toISOString(),
                  category_id: "cat-id-1",
                  session_id: null,
                },
                {
                  id: "doc2",
                  name: "Application Form",
                  status: "processing",
                  created_at: new Date().toISOString(),
                  file_type: "pdf",
                  file_size: 1228800,
                  description: "Completed IMM 1294 form.",
                  user_id: "mock-user-1",
                  case_id: "1",
                  file_path: "/mock/app_form.pdf",
                  metadata: null,
                  updated_at: new Date().toISOString(),
                  category_id: "cat-id-2",
                  session_id: null,
                },
                {
                  id: "doc3",
                  name: "Proof of Funds",
                  status: "error",
                  created_at: new Date().toISOString(),
                  file_type: "jpg",
                  file_size: 819200,
                  description: "Bank statement.",
                  user_id: "mock-user-2",
                  case_id: "2",
                  file_path: "/mock/funds.jpg",
                  metadata: { error_message: "Invalid file format" },
                  updated_at: new Date().toISOString(),
                  category_id: "cat-id-3",
                  session_id: null,
                },
                {
                  id: "doc4",
                  name: "Utility Bill",
                  status: "verified",
                  created_at: new Date().toISOString(),
                  file_type: "png",
                  file_size: 307200,
                  description: "Proof of address.",
                  user_id: "mock-user-1",
                  case_id: null,
                  file_path: "/mock/utility.png",
                  metadata: null,
                  updated_at: new Date().toISOString(),
                  category_id: "cat-id-4",
                  session_id: null,
                },
              ]
            );
            function g() {
              let e = (0, i.useTranslations)("documents"),
                t = (0, u.p)(),
                r = (0, p.V8)(t),
                [s, f] = (0, n.useState)(!0),
                [g, v] = (0, n.useState)([]),
                b = async () => {
                  f(!0);
                  try {
                    let e = await x();
                    v(e);
                  } catch (e) {
                    console.error("Failed to refresh documents:", e);
                  } finally {
                    f(!1);
                  }
                };
              return (0, a.jsxs)("div", {
                className: (0, m.cn)("p-4 md:p-6 lg:p-8", r ? "rtl" : "ltr"),
                dir: r ? "rtl" : "ltr",
                children: [
                  (0, a.jsxs)("div", {
                    className: "flex items-center justify-between mb-6",
                    children: [
                      (0, a.jsxs)("div", {
                        children: [
                          (0, a.jsx)("h1", {
                            className: "text-2xl md:text-3xl font-bold",
                            children: e("pageTitle"),
                          }),
                          (0, a.jsx)("p", {
                            className: "text-muted-foreground",
                            children: e("description"),
                          }),
                        ],
                      }),
                      (0, a.jsx)(d.$, {
                        asChild: !0,
                        children: (0, a.jsxs)(h.N_, {
                          href: "/documents/upload",
                          children: [
                            (0, a.jsx)(o.A, {
                              className: (0, m.cn)(
                                "h-4 w-4",
                                r ? "ml-2" : "mr-2",
                              ),
                            }),
                            e("uploadButton"),
                          ],
                        }),
                      }),
                    ],
                  }),
                  s
                    ? (0, a.jsx)(l.O, { section: "documents" })
                    : (0, a.jsx)(c.P, { documents: g, onDocumentUpdated: b }),
                ],
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
      49028: (e, t, r) => {
        "use strict";
        r.r(t),
          r.d(t, {
            GlobalError: () => o.default,
            __next_app__: () => c,
            pages: () => l,
            routeModule: () => u,
            tree: () => d,
          });
        var s = r(11610),
          a = r(51293),
          o = r(59059),
          i = r(17770),
          n = {};
        for (let e in i)
          0 >
            [
              "default",
              "tree",
              "pages",
              "GlobalError",
              "__next_app__",
              "routeModule",
            ].indexOf(e) && (n[e] = () => i[e]);
        r.d(t, n);
        let d = {
            children: [
              "",
              {
                children: [
                  "[locale]",
                  {
                    children: [
                      "documents",
                      {
                        children: [
                          "__PAGE__",
                          {},
                          {
                            page: [
                              () => Promise.resolve().then(r.bind(r, 84507)),
                              "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\[locale]\\documents\\page.tsx",
                            ],
                          },
                        ],
                      },
                      {},
                    ],
                  },
                  {
                    layout: [
                      () => Promise.resolve().then(r.bind(r, 63249)),
                      "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\[locale]\\layout.tsx",
                    ],
                    "not-found": [
                      () => Promise.resolve().then(r.bind(r, 47995)),
                      "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\[locale]\\not-found.tsx",
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
            "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\[locale]\\documents\\page.tsx",
          ],
          c = { require: r, loadChunk: () => Promise.resolve() },
          u = new s.AppPageRouteModule({
            definition: {
              kind: a.RouteKind.APP_PAGE,
              page: "/[locale]/documents/page",
              pathname: "/[locale]/documents",
              bundlePath: "",
              filename: "",
              appPaths: [],
            },
            userland: { loaderTree: d },
          });
      },
      50736: (e, t, r) => {
        Promise.resolve().then(r.bind(r, 84507));
      },
      53053: (e) => {
        "use strict";
        e.exports = require("node:diagnostics_channel");
      },
      53974: (e, t, r) => {
        "use strict";
        let s;
        r.r(t),
          r.d(t, {
            default: () => h,
            generateImageMetadata: () => u,
            generateMetadata: () => c,
            generateViewport: () => p,
          });
        var a = r(63033),
          o = r(26394),
          i = r(60442),
          n = (0, o.registerClientReference)(
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
          "function" == typeof n
            ? new Proxy(n, {
                apply: (e, t, r) => {
                  let s, a, o;
                  try {
                    let e = l?.getStore();
                    (s = e?.headers.get("sentry-trace") ?? void 0),
                      (a = e?.headers.get("baggage") ?? void 0),
                      (o = e?.headers);
                  } catch (e) {}
                  return i
                    .wrapServerComponentWithSentry(e, {
                      componentRoute: "/",
                      componentType: "Not-found",
                      sentryTraceHeader: s,
                      baggageHeader: a,
                      headers: o,
                    })
                    .apply(t, r);
                },
              })
            : n;
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
      56460: (e, t, r) => {
        "use strict";
        r.r(t), r.d(t, { default: () => o });
        var s = r(61268),
          a = r(89882);
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
        r(84205), r(58702);
      },
      57075: (e) => {
        "use strict";
        e.exports = require("node:stream");
      },
      57975: (e) => {
        "use strict";
        e.exports = require("node:util");
      },
      58702: (e, t, r) => {
        "use strict";
        r.d(t, {
          IB: () => s,
          V8: () => n,
          XG: () => i,
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
        function i(e) {
          return o[e] || o[a];
        }
        function n(e) {
          return "rtl" === i(e).direction;
        }
      },
      59059: (e, t, r) => {
        "use strict";
        r.r(t), r.d(t, { default: () => s });
        let s = (0, r(26394).registerClientReference)(
          function () {
            throw Error(
              "Attempted to call the default export of \"E:\\\\downloads\\\\Hijraah\\\\apps\\\\web\\\\src\\\\app\\\\global-error.tsx\" from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\global-error.tsx",
          "default",
        );
      },
      59893: (e, t, r) => {
        Promise.resolve().then(r.bind(r, 87447));
      },
      63017: (e, t, r) => {
        Promise.resolve().then(r.bind(r, 59059));
      },
      63033: (e) => {
        "use strict";
        e.exports = require("next/dist/server/app-render/work-unit-async-storage.external.js");
      },
      69621: (e, t, r) => {
        Promise.resolve().then(r.bind(r, 94745));
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
        function t(e) {
          var t = Error("Cannot find module '" + e + "'");
          throw ((t.code = "MODULE_NOT_FOUND"), t);
        }
        (t.keys = () => []), (t.resolve = t), (t.id = 74619), (e.exports = t);
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
      77001: (e, t, r) => {
        "use strict";
        r.a(e, async (e, s) => {
          try {
            r.d(t, {
              Tabs: () => d,
              TabsContent: () => u,
              TabsList: () => l,
              TabsTrigger: () => c,
            });
            var a = r(61268),
              o = r(28366);
            r(84205);
            var i = r(15942),
              n = e([i]);
            function d({ className: e, ...t }) {
              return (0, a.jsx)(o.bL, {
                "data-slot": "tabs",
                className: (0, i.cn)("flex flex-col gap-2", e),
                ...t,
              });
            }
            function l({ className: e, ...t }) {
              return (0, a.jsx)(o.B8, {
                "data-slot": "tabs-list",
                className: (0, i.cn)(
                  "bg-muted text-muted-foreground inline-flex h-9 w-fit items-center justify-center rounded-lg p-[3px]",
                  e,
                ),
                ...t,
              });
            }
            function c({ className: e, ...t }) {
              return (0, a.jsx)(o.l9, {
                "data-slot": "tabs-trigger",
                className: (0, i.cn)(
                  "data-[state=active]:bg-background dark:data-[state=active]:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:outline-ring dark:data-[state=active]:border-input dark:data-[state=active]:bg-input/30 text-foreground dark:text-muted-foreground inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-md border border-transparent px-2 py-1 text-sm font-medium whitespace-nowrap transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:shadow-sm [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
                  e,
                ),
                ...t,
              });
            }
            function u({ className: e, ...t }) {
              return (0, a.jsx)(o.UC, {
                "data-slot": "tabs-content",
                className: (0, i.cn)("flex-1 outline-none", e),
                ...t,
              });
            }
            (i = (n.then ? (await n)() : n)[0]), s();
          } catch (e) {
            s(e);
          }
        });
      },
      77030: (e) => {
        "use strict";
        e.exports = require("node:net");
      },
      77032: (e, t, r) => {
        Promise.resolve().then(r.t.bind(r, 11299, 23)),
          Promise.resolve().then(r.t.bind(r, 81119, 23)),
          Promise.resolve().then(r.t.bind(r, 68259, 23)),
          Promise.resolve().then(r.t.bind(r, 36914, 23)),
          Promise.resolve().then(r.t.bind(r, 15142, 23)),
          Promise.resolve().then(r.t.bind(r, 98554, 23)),
          Promise.resolve().then(r.t.bind(r, 88424, 23)),
          Promise.resolve().then(r.t.bind(r, 64834, 23));
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
      84507: (e, t, r) => {
        "use strict";
        let s;
        r.r(t),
          r.d(t, {
            default: () => h,
            generateImageMetadata: () => u,
            generateMetadata: () => c,
            generateViewport: () => p,
          });
        var a = r(63033),
          o = r(26394),
          i = r(60442),
          n = (0, o.registerClientReference)(
            function () {
              throw Error(
                "Attempted to call the default export of \"E:\\\\downloads\\\\Hijraah\\\\apps\\\\web\\\\src\\\\app\\\\[locale]\\\\documents\\\\page.tsx\" from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
              );
            },
            "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\[locale]\\documents\\page.tsx",
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
          "function" == typeof n
            ? new Proxy(n, {
                apply: (e, t, r) => {
                  let s, a, o;
                  try {
                    let e = l?.getStore();
                    (s = e?.headers.get("sentry-trace") ?? void 0),
                      (a = e?.headers.get("baggage") ?? void 0),
                      (o = e?.headers);
                  } catch (e) {}
                  return i
                    .wrapServerComponentWithSentry(e, {
                      componentRoute: "/[locale]/documents",
                      componentType: "Page",
                      sentryTraceHeader: s,
                      baggageHeader: a,
                      headers: o,
                    })
                    .apply(t, r);
                },
              })
            : n;
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
      87113: (e, t, r) => {
        "use strict";
        r.a(e, async (e, s) => {
          try {
            r.r(t), r.d(t, { default: () => n });
            var a = r(61268);
            r(86896), r(84205);
            var o = r(28909),
              i = e([o]);
            function n({ error: e, reset: t }) {
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
                            onClick: () => t(),
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
            (o = (i.then ? (await i)() : i)[0]), s();
          } catch (e) {
            s(e);
          }
        });
      },
      87447: (e, t, r) => {
        "use strict";
        r.a(e, async (e, s) => {
          try {
            r.r(t), r.d(t, { default: () => n });
            var a = r(61268);
            r(84205);
            var o = r(28909),
              i = e([o]);
            function n({ error: e, reset: t }) {
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
                      onClick: () => t(),
                      variant: "outline",
                      children: "Try again",
                    }),
                  ],
                }),
              });
            }
            (o = (i.then ? (await i)() : i)[0]), s();
          } catch (e) {
            s(e);
          }
        });
      },
      89783: (e, t, r) => {
        Promise.resolve().then(r.bind(r, 53974));
      },
      90184: (e, t, r) => {
        Promise.resolve().then(r.t.bind(r, 2938, 23)),
          Promise.resolve().then(r.t.bind(r, 65405, 23)),
          Promise.resolve().then(r.t.bind(r, 83573, 23)),
          Promise.resolve().then(r.t.bind(r, 35348, 23)),
          Promise.resolve().then(r.t.bind(r, 39308, 23)),
          Promise.resolve().then(r.t.bind(r, 4784, 23)),
          Promise.resolve().then(r.t.bind(r, 60830, 23)),
          Promise.resolve().then(r.t.bind(r, 84360, 23));
      },
      91645: (e) => {
        "use strict";
        e.exports = require("net");
      },
      93206: () => {},
      94511: (e, t, r) => {
        Promise.resolve().then(r.bind(r, 56460));
      },
      94735: (e) => {
        "use strict";
        e.exports = require("events");
      },
      94745: (e, t, r) => {
        "use strict";
        r.r(t), r.d(t, { default: () => s });
        let s = (0, r(26394).registerClientReference)(
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
        function t(e) {
          var t = Error("Cannot find module '" + e + "'");
          throw ((t.code = "MODULE_NOT_FOUND"), t);
        }
        (t.keys = () => []), (t.resolve = t), (t.id = 96708), (e.exports = t);
      },
      97927: (e, t, r) => {
        Promise.resolve().then(r.bind(r, 51433)),
          Promise.resolve().then(r.bind(r, 59107)),
          Promise.resolve().then(r.bind(r, 39862));
      },
    });
  var t = require("../../../webpack-runtime.js");
  t.C(e);
  var r = (e) => t((t.s = e)),
    s = t.X(
      0,
      [
        827, 6518, 2033, 4027, 2872, 7713, 5149, 8859, 1655, 8029, 5728, 9729,
        3390, 4990, 6188, 7911, 7401, 5124, 7272, 3042, 385, 7393, 4486, 7018,
        4763, 7333, 7145, 9207, 1578, 8264, 27, 7935, 6491,
      ],
      () => r(49028),
    );
  module.exports = s;
})();
//# sourceMappingURL=page.js.map
