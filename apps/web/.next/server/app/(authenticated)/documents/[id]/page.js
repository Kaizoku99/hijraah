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
    (e._sentryDebugIds[t] = "6c9e651e-3268-4af0-810c-568ab02fe48a"),
    (e._sentryDebugIdIdentifier =
      "sentry-dbid-6c9e651e-3268-4af0-810c-568ab02fe48a"));
} catch (e) {}
(() => {
  var e = {};
  (e.id = 2596),
    (e.ids = [2596]),
    (e.modules = {
      2357: (e, t, r) => {
        "use strict";
        r.a(e, async (e, s) => {
          try {
            r.r(t), r.d(t, { default: () => g });
            var a = r(61268),
              i = r(90286),
              o = r(31766),
              n = r(34558),
              d = r(15014),
              l = r(89882),
              c = r(84205),
              u = r(46532),
              p = r(87826),
              f = r(73638),
              m = r(28909),
              x = r(5451),
              h = r(94812),
              v = e([u, p, f, m, x, h]);
            function g() {
              (0, l.useParams)();
              let e = (0, l.useRouter)(),
                {
                  artifacts: t,
                  deleteArtifact: r,
                  updateArtifactVisibility: s,
                } = (0, p.S)(),
                [v, g] = (0, c.useState)(null),
                [y, b] = (0, c.useState)(!0),
                w = async () => {
                  v && (await r(v.id), e.push("/documents"));
                },
                j = async () => {
                  if (v) {
                    let e = "public" === v.visibility ? "private" : "public";
                    await s(v.id, e), g({ ...v, visibility: e });
                  }
                };
              if (y)
                return (0, a.jsxs)("div", {
                  className: "container py-8",
                  children: [
                    (0, a.jsxs)("div", {
                      className: "flex items-center mb-6",
                      children: [
                        (0, a.jsx)(h.E, {
                          className: "h-10 w-10 rounded-full",
                        }),
                        (0, a.jsx)(h.E, { className: "h-8 w-48 ml-4" }),
                      ],
                    }),
                    (0, a.jsx)(h.E, { className: "h-8 w-full mb-4" }),
                    (0, a.jsx)(h.E, { className: "h-64 w-full rounded-md" }),
                  ],
                });
              if (!v)
                return (0, a.jsxs)("div", {
                  className: "container py-8",
                  children: [
                    (0, a.jsxs)(m.$, {
                      variant: "outline",
                      onClick: () => e.push("/documents"),
                      className: "mb-6",
                      children: [
                        (0, a.jsx)(i.A, { className: "mr-2 h-4 w-4" }),
                        "Back to Documents",
                      ],
                    }),
                    (0, a.jsxs)(x.Zp, {
                      className: "p-8 text-center",
                      children: [
                        (0, a.jsx)("h2", {
                          className: "text-2xl font-bold mb-2",
                          children: "Document Not Found",
                        }),
                        (0, a.jsx)("p", {
                          className: "text-muted-foreground mb-4",
                          children:
                            "The document you are looking for does not exist or has been deleted.",
                        }),
                        (0, a.jsx)(m.$, {
                          onClick: () => e.push("/documents"),
                          children: "Return to Documents",
                        }),
                      ],
                    }),
                  ],
                });
              let N = "public" === v.visibility;
              return (0, a.jsxs)("div", {
                className: "container py-8",
                children: [
                  (0, a.jsxs)(m.$, {
                    variant: "outline",
                    onClick: () => e.push("/documents"),
                    className: "mb-6",
                    children: [
                      (0, a.jsx)(i.A, { className: "mr-2 h-4 w-4" }),
                      "Back to Documents",
                    ],
                  }),
                  (0, a.jsxs)("div", {
                    className: "flex justify-between items-center mb-4",
                    children: [
                      (0, a.jsx)("h1", {
                        className: "text-3xl font-bold",
                        children: v.title,
                      }),
                      (0, a.jsxs)("div", {
                        className: "flex gap-2",
                        children: [
                          (0, a.jsx)(m.$, {
                            variant: "outline",
                            size: "sm",
                            onClick: j,
                            children: N
                              ? (0, a.jsxs)(a.Fragment, {
                                  children: [
                                    (0, a.jsx)(o.A, {
                                      className: "mr-2 h-4 w-4",
                                    }),
                                    "Public",
                                  ],
                                })
                              : (0, a.jsxs)(a.Fragment, {
                                  children: [
                                    (0, a.jsx)(n.A, {
                                      className: "mr-2 h-4 w-4",
                                    }),
                                    "Private",
                                  ],
                                }),
                          }),
                          (0, a.jsxs)(f.Lt, {
                            children: [
                              (0, a.jsx)(f.tv, {
                                asChild: !0,
                                children: (0, a.jsxs)(m.$, {
                                  variant: "destructive",
                                  size: "sm",
                                  children: [
                                    (0, a.jsx)(d.A, {
                                      className: "mr-2 h-4 w-4",
                                    }),
                                    "Delete",
                                  ],
                                }),
                              }),
                              (0, a.jsxs)(f.EO, {
                                children: [
                                  (0, a.jsxs)(f.wd, {
                                    children: [
                                      (0, a.jsx)(f.r7, {
                                        children: "Are you sure?",
                                      }),
                                      (0, a.jsx)(f.$v, {
                                        children:
                                          "This action cannot be undone. This will permanently delete the document and remove its data from our servers.",
                                      }),
                                    ],
                                  }),
                                  (0, a.jsxs)(f.ck, {
                                    children: [
                                      (0, a.jsx)(f.Zr, { children: "Cancel" }),
                                      (0, a.jsx)(f.Rx, {
                                        onClick: w,
                                        children: "Delete",
                                      }),
                                    ],
                                  }),
                                ],
                              }),
                            ],
                          }),
                        ],
                      }),
                    ],
                  }),
                  (0, a.jsxs)("div", {
                    className: "mb-6 flex gap-2",
                    children: [
                      (0, a.jsx)(u.E, {
                        variant: N ? "default" : "outline",
                        children: N ? "Public" : "Private",
                      }),
                      (0, a.jsx)(u.E, {
                        variant: "secondary",
                        children: v.type || "Document",
                      }),
                      v.created_at &&
                        (0, a.jsxs)(u.E, {
                          variant: "outline",
                          children: [
                            "Created: ",
                            new Date(v.created_at).toLocaleDateString(),
                          ],
                        }),
                    ],
                  }),
                  (0, a.jsx)(x.Zp, {
                    className: "p-6 mb-6",
                    children: (0, a.jsxs)("div", {
                      className: "prose dark:prose-invert max-w-none",
                      children: [
                        (0, a.jsx)("h2", {
                          className: "text-xl font-semibold mb-2",
                          children: v.title,
                        }),
                        (0, a.jsx)("div", {
                          className: "whitespace-pre-wrap",
                          children:
                            "object" == typeof v.content && v.content.text
                              ? v.content.text
                              : "string" == typeof v.content
                                ? v.content
                                : JSON.stringify(v.content, null, 2),
                        }),
                      ],
                    }),
                  }),
                ],
              });
            }
            ([u, p, f, m, x, h] = v.then ? (await v)() : v), s();
          } catch (e) {
            s(e);
          }
        });
      },
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
              Wu: () => f,
              ZB: () => u,
              Zp: () => l,
              aR: () => c,
              wL: () => m,
            });
            var a = r(61268),
              i = r(55728),
              o = r(84205),
              n = r(15942),
              d = e([n]);
            n = (d.then ? (await d)() : d)[0];
            let l = o.forwardRef(({ className: e, ...t }, r) =>
              (0, a.jsx)(i.P.div, {
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
            let c = o.forwardRef(({ className: e, ...t }, r) =>
              (0, a.jsx)("div", {
                ref: r,
                className: (0, n.cn)("flex flex-col space-y-1.5 p-6", e),
                ...t,
              }),
            );
            c.displayName = "CardHeader";
            let u = o.forwardRef(({ className: e, ...t }, r) =>
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
            let p = o.forwardRef(({ className: e, ...t }, r) =>
              (0, a.jsx)("p", {
                ref: r,
                className: (0, n.cn)("text-sm text-muted-foreground", e),
                ...t,
              }),
            );
            p.displayName = "CardDescription";
            let f = o.forwardRef(({ className: e, ...t }, r) =>
              (0, a.jsx)("div", {
                ref: r,
                className: (0, n.cn)("p-6 pt-0", e),
                ...t,
              }),
            );
            f.displayName = "CardContent";
            let m = o.forwardRef(({ className: e, ...t }, r) =>
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
      15014: (e, t, r) => {
        "use strict";
        r.d(t, { A: () => s });
        let s = (0, r(95255).A)("Trash2", [
          ["path", { d: "M3 6h18", key: "d0wm0j" }],
          [
            "path",
            { d: "M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6", key: "4alrt4" },
          ],
          ["path", { d: "M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2", key: "v07s0e" }],
          ["line", { x1: "10", x2: "10", y1: "11", y2: "17", key: "1uufr5" }],
          ["line", { x1: "14", x2: "14", y1: "11", y2: "17", key: "xtxkd" }],
        ]);
      },
      15668: (e) => {
        function t(e) {
          var t = Error("Cannot find module '" + e + "'");
          throw ((t.code = "MODULE_NOT_FOUND"), t);
        }
        (t.keys = () => []), (t.resolve = t), (t.id = 15668), (e.exports = t);
      },
      17988: (e, t, r) => {
        "use strict";
        r.r(t),
          r.d(t, {
            GlobalError: () => i.default,
            __next_app__: () => c,
            pages: () => l,
            routeModule: () => u,
            tree: () => d,
          });
        var s = r(11610),
          a = r(51293),
          i = r(59059),
          o = r(17770),
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
        r.d(t, n);
        let d = {
            children: [
              "",
              {
                children: [
                  "(authenticated)",
                  {
                    children: [
                      "documents",
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
                                    Promise.resolve().then(r.bind(r, 73199)),
                                  "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\(authenticated)\\documents\\[id]\\page.tsx",
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
                      () => Promise.resolve().then(r.bind(r, 72967)),
                      "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\(authenticated)\\layout.tsx",
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
            "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\(authenticated)\\documents\\[id]\\page.tsx",
          ],
          c = { require: r, loadChunk: () => Promise.resolve() },
          u = new s.AppPageRouteModule({
            definition: {
              kind: a.RouteKind.APP_PAGE,
              page: "/(authenticated)/documents/[id]/page",
              pathname: "/documents/[id]",
              bundlePath: "",
              filename: "",
              appPaths: [],
            },
            userland: { loaderTree: d },
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
      31766: (e, t, r) => {
        "use strict";
        r.d(t, { A: () => s });
        let s = (0, r(95255).A)("Eye", [
          [
            "path",
            {
              d: "M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z",
              key: "rwhkz3",
            },
          ],
          ["circle", { cx: "12", cy: "12", r: "3", key: "1v7zrd" }],
        ]);
      },
      32367: (e, t, r) => {
        "use strict";
        let s;
        r.d(t, { AG: () => v, Iw: () => x, UU: () => h });
        var a = r(97713),
          i = r(15149),
          o = r.n(i),
          n = r(84205);
        let { fetch: d } = o()(),
          l = "http://localhost:54321",
          c =
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0",
          u = process.env.SUPABASE_SERVICE_ROLE_KEY,
          p = c ? { apikey: c } : void 0;
        function f() {
          if (!l || !c)
            throw (
              (console.error(
                "Missing environment variables NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY",
              ),
              Error("Supabase URL or Anon Key is missing."))
            );
        }
        {
          let e = globalThis;
          e.__USING_PONYFETCH__ ||
            ((e.fetch = d), (e.__USING_PONYFETCH__ = !0));
        }
        function m() {
          return (f(), s)
            ? s
            : (s = (0, a.createBrowserClient)(l, c, {
                global: { headers: p },
              }));
        }
        function x() {
          return (0, n.useMemo)(m, []);
        }
        function h() {
          return (
            f(), (0, a.createBrowserClient)(l, c, { global: { headers: p } })
          );
        }
        let v = m;
        m();
      },
      33873: (e) => {
        "use strict";
        e.exports = require("path");
      },
      34558: (e, t, r) => {
        "use strict";
        r.d(t, { A: () => s });
        let s = (0, r(95255).A)("EyeOff", [
          ["path", { d: "M9.88 9.88a3 3 0 1 0 4.24 4.24", key: "1jxqfv" }],
          [
            "path",
            {
              d: "M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68",
              key: "9wicm4",
            },
          ],
          [
            "path",
            {
              d: "M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61",
              key: "1jreej",
            },
          ],
          ["line", { x1: "2", x2: "22", y1: "2", y2: "22", key: "a6p6uj" }],
        ]);
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
      43886: () => {},
      44708: (e) => {
        "use strict";
        e.exports = require("node:https");
      },
      46532: (e, t, r) => {
        "use strict";
        r.a(e, async (e, s) => {
          try {
            r.d(t, { E: () => l });
            var a = r(61268),
              i = r(86415),
              o = r(91635);
            r(84205);
            var n = r(15942),
              d = e([n]);
            n = (d.then ? (await d)() : d)[0];
            let c = (0, o.F)(
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
            function l({ className: e, variant: t, asChild: r = !1, ...s }) {
              let o = r ? i.DX : "span";
              return (0, a.jsx)(o, {
                "data-slot": "badge",
                className: (0, n.cn)(c({ variant: t }), e),
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
      55591: (e) => {
        "use strict";
        e.exports = require("https");
      },
      56414: (e, t, r) => {
        "use strict";
        r.d(t, {
          UC: () => T,
          VY: () => L,
          ZD: () => O,
          ZL: () => D,
          bL: () => P,
          hE: () => U,
          hJ: () => I,
          l9: () => S,
          rc: () => M,
        });
        var s = r(84205),
          a = r(14072),
          i = r(79744),
          o = r(33459),
          n = r(28777),
          d = r(86415),
          l = r(61268),
          c = "AlertDialog",
          [u, p] = (0, a.A)(c, [o.Hs]),
          f = (0, o.Hs)(),
          m = (e) => {
            let { __scopeAlertDialog: t, ...r } = e,
              s = f(t);
            return (0, l.jsx)(o.bL, { ...s, ...r, modal: !0 });
          };
        m.displayName = c;
        var x = s.forwardRef((e, t) => {
          let { __scopeAlertDialog: r, ...s } = e,
            a = f(r);
          return (0, l.jsx)(o.l9, { ...a, ...s, ref: t });
        });
        x.displayName = "AlertDialogTrigger";
        var h = (e) => {
          let { __scopeAlertDialog: t, ...r } = e,
            s = f(t);
          return (0, l.jsx)(o.ZL, { ...s, ...r });
        };
        h.displayName = "AlertDialogPortal";
        var v = s.forwardRef((e, t) => {
          let { __scopeAlertDialog: r, ...s } = e,
            a = f(r);
          return (0, l.jsx)(o.hJ, { ...a, ...s, ref: t });
        });
        v.displayName = "AlertDialogOverlay";
        var g = "AlertDialogContent",
          [y, b] = u(g),
          w = (0, d.Dc)("AlertDialogContent"),
          j = s.forwardRef((e, t) => {
            let { __scopeAlertDialog: r, children: a, ...d } = e,
              c = f(r),
              u = s.useRef(null),
              p = (0, i.s)(t, u),
              m = s.useRef(null);
            return (0, l.jsx)(o.G$, {
              contentName: g,
              titleName: N,
              docsSlug: "alert-dialog",
              children: (0, l.jsx)(y, {
                scope: r,
                cancelRef: m,
                children: (0, l.jsxs)(o.UC, {
                  role: "alertdialog",
                  ...c,
                  ...d,
                  ref: p,
                  onOpenAutoFocus: (0, n.m)(d.onOpenAutoFocus, (e) => {
                    e.preventDefault(), m.current?.focus({ preventScroll: !0 });
                  }),
                  onPointerDownOutside: (e) => e.preventDefault(),
                  onInteractOutside: (e) => e.preventDefault(),
                  children: [
                    (0, l.jsx)(w, { children: a }),
                    (0, l.jsx)(R, { contentRef: u }),
                  ],
                }),
              }),
            });
          });
        j.displayName = g;
        var N = "AlertDialogTitle",
          A = s.forwardRef((e, t) => {
            let { __scopeAlertDialog: r, ...s } = e,
              a = f(r);
            return (0, l.jsx)(o.hE, { ...a, ...s, ref: t });
          });
        A.displayName = N;
        var k = "AlertDialogDescription",
          E = s.forwardRef((e, t) => {
            let { __scopeAlertDialog: r, ...s } = e,
              a = f(r);
            return (0, l.jsx)(o.VY, { ...a, ...s, ref: t });
          });
        E.displayName = k;
        var _ = s.forwardRef((e, t) => {
          let { __scopeAlertDialog: r, ...s } = e,
            a = f(r);
          return (0, l.jsx)(o.bm, { ...a, ...s, ref: t });
        });
        _.displayName = "AlertDialogAction";
        var q = "AlertDialogCancel",
          C = s.forwardRef((e, t) => {
            let { __scopeAlertDialog: r, ...s } = e,
              { cancelRef: a } = b(q, r),
              n = f(r),
              d = (0, i.s)(t, a);
            return (0, l.jsx)(o.bm, { ...n, ...s, ref: d });
          });
        C.displayName = q;
        var R = ({ contentRef: e }) => {
            let t = `\`${g}\` requires a description for the component to be accessible for screen reader users.

You can add a description to the \`${g}\` by passing a \`${k}\` component as a child, which also benefits sighted users by adding visible context to the dialog.

Alternatively, you can use your own component as a description by assigning it an \`id\` and passing the same value to the \`aria-describedby\` prop in \`${g}\`. If the description is confusing or duplicative for sighted users, you can use the \`@radix-ui/react-visually-hidden\` primitive as a wrapper around your description component.

For more information, see https://radix-ui.com/primitives/docs/components/alert-dialog`;
            return (
              s.useEffect(() => {
                document.getElementById(
                  e.current?.getAttribute("aria-describedby"),
                ) || console.warn(t);
              }, [t, e]),
              null
            );
          },
          P = m,
          S = x,
          D = h,
          I = v,
          T = j,
          M = _,
          O = C,
          U = A,
          L = E;
      },
      57075: (e) => {
        "use strict";
        e.exports = require("node:stream");
      },
      57975: (e) => {
        "use strict";
        e.exports = require("node:util");
      },
      59570: () => {},
      63033: (e) => {
        "use strict";
        e.exports = require("next/dist/server/app-render/work-unit-async-storage.external.js");
      },
      63505: (e, t, r) => {
        Promise.resolve().then(r.bind(r, 2357));
      },
      72967: (e, t, r) => {
        "use strict";
        let s;
        r.r(t),
          r.d(t, {
            default: () => p,
            generateImageMetadata: () => c,
            generateMetadata: () => l,
            generateViewport: () => u,
          });
        var a = r(63033),
          i = r(35242),
          o = r(60442);
        let n = { ...a },
          d =
            "workUnitAsyncStorage" in n
              ? n.workUnitAsyncStorage
              : "requestAsyncStorage" in n
                ? n.requestAsyncStorage
                : void 0;
        s = new Proxy(
          function ({ children: e }) {
            return (0, i.jsx)(i.Fragment, { children: e });
          },
          {
            apply: (e, t, r) => {
              let s, a, i;
              try {
                let e = d?.getStore();
                (s = e?.headers.get("sentry-trace") ?? void 0),
                  (a = e?.headers.get("baggage") ?? void 0),
                  (i = e?.headers);
              } catch (e) {}
              return o
                .wrapServerComponentWithSentry(e, {
                  componentRoute: "/(authenticated)",
                  componentType: "Layout",
                  sentryTraceHeader: s,
                  baggageHeader: a,
                  headers: i,
                })
                .apply(t, r);
            },
          },
        );
        let l = void 0,
          c = void 0,
          u = void 0,
          p = s;
      },
      73024: (e) => {
        "use strict";
        e.exports = require("node:fs");
      },
      73199: (e, t, r) => {
        "use strict";
        let s;
        r.r(t),
          r.d(t, {
            default: () => f,
            generateImageMetadata: () => u,
            generateMetadata: () => c,
            generateViewport: () => p,
          });
        var a = r(63033),
          i = r(26394),
          o = r(60442),
          n = (0, i.registerClientReference)(
            function () {
              throw Error(
                "Attempted to call the default export of \"E:\\\\downloads\\\\Hijraah\\\\apps\\\\web\\\\src\\\\app\\\\(authenticated)\\\\documents\\\\[id]\\\\page.tsx\" from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
              );
            },
            "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\(authenticated)\\documents\\[id]\\page.tsx",
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
                  let s, a, i;
                  try {
                    let e = l?.getStore();
                    (s = e?.headers.get("sentry-trace") ?? void 0),
                      (a = e?.headers.get("baggage") ?? void 0),
                      (i = e?.headers);
                  } catch (e) {}
                  return o
                    .wrapServerComponentWithSentry(e, {
                      componentRoute: "/(authenticated)/documents/[id]",
                      componentType: "Page",
                      sentryTraceHeader: s,
                      baggageHeader: a,
                      headers: i,
                    })
                    .apply(t, r);
                },
              })
            : n;
        let c = void 0,
          u = void 0,
          p = void 0,
          f = s;
      },
      73566: (e) => {
        "use strict";
        e.exports = require("worker_threads");
      },
      73638: (e, t, r) => {
        "use strict";
        r.a(e, async (e, s) => {
          try {
            r.d(t, {
              $v: () => g,
              EO: () => m,
              Lt: () => c,
              Rx: () => y,
              Zr: () => b,
              ck: () => h,
              r7: () => v,
              tv: () => u,
              wd: () => x,
            });
            var a = r(61268),
              i = r(56414),
              o = r(84205),
              n = r(15942),
              d = r(28909),
              l = e([n, d]);
            [n, d] = l.then ? (await l)() : l;
            let c = i.bL,
              u = i.l9,
              p = i.ZL,
              f = o.forwardRef(({ className: e, ...t }, r) =>
                (0, a.jsx)(i.hJ, {
                  className: (0, n.cn)(
                    "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
                    e,
                  ),
                  ...t,
                  ref: r,
                }),
              );
            f.displayName = i.hJ.displayName;
            let m = o.forwardRef(({ className: e, ...t }, r) =>
              (0, a.jsxs)(p, {
                children: [
                  (0, a.jsx)(f, {}),
                  (0, a.jsx)(i.UC, {
                    ref: r,
                    className: (0, n.cn)(
                      "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
                      e,
                    ),
                    ...t,
                  }),
                ],
              }),
            );
            m.displayName = i.UC.displayName;
            let x = ({ className: e, ...t }) =>
              (0, a.jsx)("div", {
                className: (0, n.cn)(
                  "flex flex-col space-y-2 text-center sm:text-left",
                  e,
                ),
                ...t,
              });
            x.displayName = "AlertDialogHeader";
            let h = ({ className: e, ...t }) =>
              (0, a.jsx)("div", {
                className: (0, n.cn)(
                  "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
                  e,
                ),
                ...t,
              });
            h.displayName = "AlertDialogFooter";
            let v = o.forwardRef(({ className: e, ...t }, r) =>
              (0, a.jsx)(i.hE, {
                ref: r,
                className: (0, n.cn)("text-lg font-semibold", e),
                ...t,
              }),
            );
            v.displayName = i.hE.displayName;
            let g = o.forwardRef(({ className: e, ...t }, r) =>
              (0, a.jsx)(i.VY, {
                ref: r,
                className: (0, n.cn)("text-sm text-muted-foreground", e),
                ...t,
              }),
            );
            g.displayName = i.VY.displayName;
            let y = o.forwardRef(({ className: e, ...t }, r) =>
              (0, a.jsx)(i.rc, {
                ref: r,
                className: (0, n.cn)((0, d.r)(), e),
                ...t,
              }),
            );
            y.displayName = i.rc.displayName;
            let b = o.forwardRef(({ className: e, ...t }, r) =>
              (0, a.jsx)(i.ZD, {
                ref: r,
                className: (0, n.cn)(
                  (0, d.r)({ variant: "outline" }),
                  "mt-2 sm:mt-0",
                  e,
                ),
                ...t,
              }),
            );
            (b.displayName = i.ZD.displayName), s();
          } catch (e) {
            s(e);
          }
        });
      },
      74075: (e) => {
        "use strict";
        e.exports = require("zlib");
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
      85488: (e) => {
        "use strict";
        e.exports = import("ai");
      },
      86592: (e) => {
        "use strict";
        e.exports = require("node:inspector");
      },
      87216: (e, t, r) => {
        "use strict";
        r.a(e, async (e, s) => {
          try {
            r.d(t, { Ck: () => h, dj: () => v });
            var a = r(61268),
              i = r(24419),
              o = r(91635),
              n = r(90495),
              d = r(61950),
              l = r(38568),
              c = r(89123),
              u = r(84205),
              p = r.n(u),
              f = r(15942),
              m = e([f]);
            f = (m.then ? (await m)() : m)[0];
            let y = (0, u.createContext)(void 0);
            i.Kq,
              (p().forwardRef(({ className: e, ...t }, r) =>
                (0, a.jsx)(i.LM, {
                  ref: r,
                  className: (0, f.cn)(
                    "fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]",
                    e,
                  ),
                  ...t,
                }),
              ).displayName = i.LM.displayName);
            let b = (0, o.F)(
              "group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full",
              {
                variants: {
                  variant: {
                    default: "border bg-background text-foreground",
                    destructive:
                      "destructive group border-destructive bg-destructive text-destructive-foreground",
                  },
                },
                defaultVariants: { variant: "default" },
              },
            );
            function x({
              title: e,
              description: t,
              variant: r = "default",
              onClose: s,
            }) {
              let i = {
                default: null,
                destructive: d.A,
                success: l.A,
                info: c.A,
              }[r];
              return (0, a.jsxs)("div", {
                className: `max-w-md rounded-lg border shadow-lg p-4 flex items-start gap-3 animate-slide-up-fade ${{ default: "bg-white border-gray-200", destructive: "bg-red-50 border-red-200 text-red-700", success: "bg-green-50 border-green-200 text-green-700", info: "bg-blue-50 border-blue-200 text-blue-700" }[r]}`,
                role: "alert",
                children: [
                  i && (0, a.jsx)(i, { className: "h-5 w-5 flex-shrink-0" }),
                  (0, a.jsxs)("div", {
                    className: "flex-1",
                    children: [
                      (0, a.jsx)("h3", {
                        className: "font-medium",
                        children: e,
                      }),
                      t &&
                        (0, a.jsx)("p", {
                          className: "text-sm mt-1 opacity-90",
                          children: t,
                        }),
                    ],
                  }),
                  (0, a.jsx)("button", {
                    onClick: s,
                    className:
                      "flex-shrink-0 rounded-full p-1 hover:bg-gray-100",
                    "aria-label": "Close",
                    children: (0, a.jsx)(n.A, { className: "h-4 w-4" }),
                  }),
                ],
              });
            }
            function h({ children: e }) {
              let [t, r] = (0, u.useState)([]),
                s = (0, u.useRef)(0),
                i = (0, u.useCallback)((e) => {
                  r((t) => t.filter((t) => t.id !== e));
                }, []),
                o = (0, u.useCallback)(
                  (e) => {
                    let t = `toast-${s.current++}`,
                      a = { ...e, id: t };
                    r((e) => [...e, a]),
                      setTimeout(() => {
                        i(t);
                      }, e.duration || 5e3);
                  },
                  [i],
                ),
                n = (0, u.useMemo)(
                  () => ({ toast: o, toasts: t, removeToast: i }),
                  [o, t, i],
                );
              return (0, a.jsxs)(y.Provider, {
                value: n,
                children: [e, (0, a.jsx)(g, {})],
              });
            }
            function v() {
              let e = (0, u.useContext)(y);
              if (!e)
                throw Error(
                  "useToast must be used within a CustomToastProvider",
                );
              return e;
            }
            function g() {
              let { toasts: e, removeToast: t } = v();
              return (0, a.jsx)("div", {
                className: "fixed bottom-0 right-0 p-4 space-y-2 z-50",
                children: e.map((e) =>
                  (0, a.jsx)(x, { ...e, onClose: () => t(e.id) }, e.id),
                ),
              });
            }
            (p().forwardRef(({ className: e, variant: t, ...r }, s) =>
              (0, a.jsx)(i.bL, {
                ref: s,
                className: (0, f.cn)(b({ variant: t }), e),
                ...r,
              }),
            ).displayName = i.bL.displayName),
              (p().forwardRef(({ className: e, ...t }, r) =>
                (0, a.jsx)(i.rc, {
                  ref: r,
                  className: (0, f.cn)(
                    "inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 text-sm font-medium ring-offset-background transition-colors hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 group-[.destructive]:border-muted/40 group-[.destructive]:hover:border-destructive/30 group-[.destructive]:hover:bg-destructive group-[.destructive]:hover:text-destructive-foreground group-[.destructive]:focus:ring-destructive",
                    e,
                  ),
                  ...t,
                }),
              ).displayName = i.rc.displayName),
              (p().forwardRef(({ className: e, ...t }, r) =>
                (0, a.jsx)(i.bm, {
                  ref: r,
                  className: (0, f.cn)(
                    "absolute right-2 top-2 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-2 group-hover:opacity-100 group-[.destructive]:text-red-300 group-[.destructive]:hover:text-red-50 group-[.destructive]:focus:ring-red-400 group-[.destructive]:focus:ring-offset-red-600",
                    e,
                  ),
                  "toast-close": "",
                  ...t,
                  children: (0, a.jsx)(n.A, { className: "h-4 w-4" }),
                }),
              ).displayName = i.bm.displayName),
              (p().forwardRef(({ className: e, ...t }, r) =>
                (0, a.jsx)(i.hE, {
                  ref: r,
                  className: (0, f.cn)("text-sm font-semibold", e),
                  ...t,
                }),
              ).displayName = i.hE.displayName),
              (p().forwardRef(({ className: e, ...t }, r) =>
                (0, a.jsx)(i.VY, {
                  ref: r,
                  className: (0, f.cn)("text-sm opacity-90", e),
                  ...t,
                }),
              ).displayName = i.VY.displayName),
              s();
          } catch (e) {
            s(e);
          }
        });
      },
      87826: (e, t, r) => {
        "use strict";
        r.a(e, async (e, s) => {
          try {
            r.d(t, { S: () => p, k: () => c });
            var a = r(61268),
              i = r(89882),
              o = r(84205),
              n = r(87216),
              d = r(32367),
              l = e([n]);
            n = (l.then ? (await l)() : l)[0];
            let u = (0, o.createContext)(void 0);
            function c({ children: e }) {
              let [t, r] = (0, o.useState)([]),
                [s, l] = (0, o.useState)(null),
                [c, p] = (0, o.useState)([]),
                [f, m] = (0, o.useState)(!1),
                [x, h] = (0, o.useState)(null),
                v = (0, i.useRouter)(),
                { toast: g } = (0, n.dj)(),
                y = (0, d.AG)(),
                b = async (e) => {
                  try {
                    m(!0), h(null);
                    let { data: t, error: r } = await y
                      .from("artifacts")
                      .select("*")
                      .eq("id", e)
                      .single();
                    if (r) throw r;
                    l(t);
                    let { data: s, error: a } = await y
                      .from("artifact_messages")
                      .select("*")
                      .eq("artifact_id", e)
                      .order("created_at", { ascending: !0 });
                    if (a) throw a;
                    p(s || []);
                  } catch (e) {
                    console.error("Error fetching artifact:", e),
                      h("Failed to fetch artifact");
                  } finally {
                    m(!1);
                  }
                },
                w = async (e, t, r, s) => {
                  try {
                    m(!0), h(null);
                    let { data: a } = await y.auth.getUser();
                    if (!a?.user) throw Error("User not authenticated");
                    let i = {
                        title: e,
                        type: t,
                        content: r,
                        user_id: a.user.id,
                        chat_id: s,
                        visibility: "private",
                      },
                      { data: o, error: n } = await y
                        .from("artifacts")
                        .insert(i)
                        .select()
                        .single();
                    if (n) throw n;
                    return (
                      g({
                        title: "Artifact created",
                        description: `${e} has been created successfully`,
                        variant: "success",
                      }),
                      o
                    );
                  } catch (t) {
                    let e = "Failed to create artifact";
                    throw (
                      (h(e),
                      console.error(t),
                      g({
                        title: "Error",
                        description: e,
                        variant: "destructive",
                      }),
                      t)
                    );
                  } finally {
                    m(!1);
                  }
                },
                j = async (e, t) => {
                  try {
                    m(!0), h(null);
                    let { error: r } = await y
                      .from("artifacts")
                      .update({ ...t, updated_at: new Date().toISOString() })
                      .eq("id", e);
                    if (r) throw r;
                    g({
                      title: "Artifact updated",
                      description: "Your changes have been saved",
                      variant: "success",
                    });
                  } catch (t) {
                    let e = "Failed to update artifact";
                    h(e),
                      console.error(t),
                      g({
                        title: "Error",
                        description: e,
                        variant: "destructive",
                      });
                  } finally {
                    m(!1);
                  }
                },
                N = async (e) => {
                  try {
                    m(!0), h(null);
                    let { error: t } = await y
                      .from("artifacts")
                      .delete()
                      .eq("id", e);
                    if (t) throw t;
                    s?.id === e && (l(null), v.push("/artifacts")),
                      g({
                        title: "Artifact deleted",
                        description: "The artifact has been removed",
                        variant: "success",
                      });
                  } catch (t) {
                    let e = "Failed to delete artifact";
                    h(e),
                      console.error(t),
                      g({
                        title: "Error",
                        description: e,
                        variant: "destructive",
                      });
                  } finally {
                    m(!1);
                  }
                },
                A = async (e, t, r) => {
                  try {
                    m(!0), h(null);
                    let { error: s } = await y
                      .from("artifact_messages")
                      .insert({ artifact_id: e, content: t, role: r });
                    if (s) throw s;
                    await b(e);
                  } catch (e) {
                    h("Failed to add message"), console.error(e);
                  } finally {
                    m(!1);
                  }
                },
                k = async (e, t) => {
                  try {
                    m(!0), h(null);
                    let { error: r } = await y
                      .from("artifacts")
                      .update({ visibility: t })
                      .eq("id", e);
                    if (r) throw r;
                    g({
                      title: "Visibility updated",
                      description: `Artifact is now ${t}`,
                      variant: "success",
                    });
                  } catch (t) {
                    let e = "Failed to update visibility";
                    h(e),
                      console.error(t),
                      g({
                        title: "Error",
                        description: e,
                        variant: "destructive",
                      });
                  } finally {
                    m(!1);
                  }
                };
              return (0, a.jsx)(u.Provider, {
                value: {
                  artifacts: t,
                  currentArtifact: s,
                  artifactMessages: c,
                  isLoading: f,
                  error: x,
                  createArtifact: w,
                  updateArtifact: j,
                  deleteArtifact: N,
                  getArtifact: b,
                  addArtifactMessage: A,
                  updateArtifactVisibility: k,
                },
                children: e,
              });
            }
            let p = () => {
              let e = (0, o.useContext)(u);
              if (void 0 === e)
                throw Error(
                  "useArtifact must be used within an ArtifactProvider",
                );
              return e;
            };
            s();
          } catch (e) {
            s(e);
          }
        });
      },
      90286: (e, t, r) => {
        "use strict";
        r.d(t, { A: () => s });
        let s = (0, r(95255).A)("ArrowLeft", [
          ["path", { d: "m12 19-7-7 7-7", key: "1l729n" }],
          ["path", { d: "M19 12H5", key: "x3x0zl" }],
        ]);
      },
      91645: (e) => {
        "use strict";
        e.exports = require("net");
      },
      94735: (e) => {
        "use strict";
        e.exports = require("events");
      },
      94812: (e, t, r) => {
        "use strict";
        r.a(e, async (e, s) => {
          try {
            r.d(t, { E: () => n });
            var a = r(61268),
              i = r(15942),
              o = e([i]);
            function n({ className: e, ...t }) {
              return (0, a.jsx)("div", {
                "data-slot": "skeleton",
                className: (0, i.cn)("bg-accent animate-pulse rounded-md", e),
                ...t,
              });
            }
            (i = (o.then ? (await o)() : o)[0]), s();
          } catch (e) {
            s(e);
          }
        });
      },
      98353: (e, t, r) => {
        Promise.resolve().then(r.bind(r, 73199));
      },
    });
  var t = require("../../../../webpack-runtime.js");
  t.C(e);
  var r = (e) => t((t.s = e)),
    s = t.X(
      0,
      [
        827, 6518, 2033, 4027, 2872, 7713, 5149, 8859, 8029, 5728, 9729, 6188,
        7393, 4630,
      ],
      () => r(17988),
    );
  module.exports = s;
})();
//# sourceMappingURL=page.js.map
