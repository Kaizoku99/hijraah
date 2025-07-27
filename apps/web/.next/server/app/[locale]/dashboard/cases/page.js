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
    (e._sentryDebugIds[t] = "fe9aaaf4-61e5-4954-a117-8e6ded3d3275"),
    (e._sentryDebugIdIdentifier =
      "sentry-dbid-fe9aaaf4-61e5-4954-a117-8e6ded3d3275"));
} catch (e) {}
(() => {
  var e = {};
  (e.id = 6980),
    (e.ids = [4630, 6980]),
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
              Zp: () => d,
              aR: () => c,
              wL: () => x,
            });
            var a = r(61268),
              n = r(55728),
              i = r(84205),
              o = r(15942),
              l = e([o]);
            o = (l.then ? (await l)() : l)[0];
            let d = i.forwardRef(({ className: e, ...t }, r) =>
              (0, a.jsx)(n.P.div, {
                ref: r,
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
                ...t,
              }),
            );
            d.displayName = "Card";
            let c = i.forwardRef(({ className: e, ...t }, r) =>
              (0, a.jsx)("div", {
                ref: r,
                className: (0, o.cn)("flex flex-col space-y-1.5 p-6", e),
                ...t,
              }),
            );
            c.displayName = "CardHeader";
            let u = i.forwardRef(({ className: e, ...t }, r) =>
              (0, a.jsx)("h3", {
                ref: r,
                className: (0, o.cn)(
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
                className: (0, o.cn)("text-sm text-muted-foreground", e),
                ...t,
              }),
            );
            p.displayName = "CardDescription";
            let h = i.forwardRef(({ className: e, ...t }, r) =>
              (0, a.jsx)("div", {
                ref: r,
                className: (0, o.cn)("p-6 pt-0", e),
                ...t,
              }),
            );
            h.displayName = "CardContent";
            let x = i.forwardRef(({ className: e, ...t }, r) =>
              (0, a.jsx)("div", {
                ref: r,
                className: (0, o.cn)("flex items-center p-6 pt-0", e),
                ...t,
              }),
            );
            (x.displayName = "CardFooter"), s();
          } catch (e) {
            s(e);
          }
        });
      },
      7839: (e, t, r) => {
        "use strict";
        r.d(t, { jH: () => n });
        var s = r(84205);
        r(61268);
        var a = s.createContext(void 0);
        function n(e) {
          let t = s.useContext(a);
          return e || t || "ltr";
        }
      },
      8086: (e) => {
        "use strict";
        e.exports = require("module");
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
              cn: () => l,
              lk: () => d,
              y8: () => u,
            });
            var a = r(85488);
            r(3477);
            var n = r(79029),
              i = r(58360),
              o = e([a]);
            function l(...e) {
              return (0, i.QP)((0, n.$)(e));
            }
            function d() {
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
            a = (o.then ? (await o)() : o)[0];
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
      20149: (e, t, r) => {
        "use strict";
        r.a(e, async (e, s) => {
          try {
            r.d(t, { O: () => u });
            var a = r(61268),
              n = r(43851),
              i = r(17362),
              o = r(5451),
              l = r(94812),
              d = r(77001),
              c = e([n, i, o, l, d]);
            function u() {
              return (0, a.jsxs)("div", {
                className: "flex flex-col h-screen",
                children: [
                  (0, a.jsx)("div", {
                    className:
                      "flex items-center justify-between px-4 py-2 border-b",
                    children: (0, a.jsx)(i.Qp, {
                      children: (0, a.jsxs)(i.AB, {
                        children: [
                          (0, a.jsx)(i.J5, {
                            children: (0, a.jsx)(i.w1, {
                              href: "/",
                              children: "Home",
                            }),
                          }),
                          (0, a.jsx)(i.tH, {}),
                          (0, a.jsx)(i.J5, {
                            children: (0, a.jsx)(i.tJ, {
                              children: "Dashboard",
                            }),
                          }),
                        ],
                      }),
                    }),
                  }),
                  (0, a.jsxs)("div", {
                    className: "flex flex-1 overflow-hidden",
                    children: [
                      (0, a.jsx)(n.AppSidebar, { className: "h-screen" }),
                      (0, a.jsx)("div", {
                        className: "flex-1 overflow-auto",
                        children: (0, a.jsx)("div", {
                          className: "container mx-auto p-6",
                          children: (0, a.jsxs)(d.Tabs, {
                            defaultValue: "cases",
                            children: [
                              (0, a.jsxs)("div", {
                                className:
                                  "mb-6 flex items-center justify-between",
                                children: [
                                  (0, a.jsxs)(d.TabsList, {
                                    children: [
                                      (0, a.jsx)(d.TabsTrigger, {
                                        value: "cases",
                                        children: "Cases",
                                      }),
                                      (0, a.jsx)(d.TabsTrigger, {
                                        value: "documents",
                                        children: "Documents",
                                      }),
                                      (0, a.jsx)(d.TabsTrigger, {
                                        value: "analytics",
                                        children: "Analytics",
                                      }),
                                    ],
                                  }),
                                  (0, a.jsx)(l.E, { className: "h-10 w-32" }),
                                ],
                              }),
                              (0, a.jsx)("div", {
                                className: "grid gap-4 md:grid-cols-3 mb-6",
                                children: [1, 2, 3].map((e) =>
                                  (0, a.jsxs)(
                                    o.Zp,
                                    {
                                      children: [
                                        (0, a.jsxs)(o.aR, {
                                          className:
                                            "flex flex-row items-center justify-between space-y-0 pb-2",
                                          children: [
                                            (0, a.jsx)(l.E, {
                                              className: "h-5 w-24",
                                            }),
                                            (0, a.jsx)(l.E, {
                                              className: "h-4 w-4 rounded-full",
                                            }),
                                          ],
                                        }),
                                        (0, a.jsxs)(o.Wu, {
                                          children: [
                                            (0, a.jsx)(l.E, {
                                              className: "h-8 w-12 mb-1",
                                            }),
                                            (0, a.jsx)(l.E, {
                                              className: "h-3 w-32",
                                            }),
                                          ],
                                        }),
                                      ],
                                    },
                                    e,
                                  ),
                                ),
                              }),
                              (0, a.jsx)(d.TabsContent, {
                                value: "cases",
                                className: "space-y-4",
                                children: [1, 2, 3].map((e) =>
                                  (0, a.jsxs)(
                                    o.Zp,
                                    {
                                      children: [
                                        (0, a.jsx)(o.aR, {
                                          className: "p-4",
                                          children: (0, a.jsxs)("div", {
                                            className:
                                              "flex justify-between items-start",
                                            children: [
                                              (0, a.jsxs)("div", {
                                                children: [
                                                  (0, a.jsx)(l.E, {
                                                    className: "h-6 w-48 mb-2",
                                                  }),
                                                  (0, a.jsx)(l.E, {
                                                    className: "h-4 w-64",
                                                  }),
                                                ],
                                              }),
                                              (0, a.jsxs)("div", {
                                                className:
                                                  "flex items-center space-x-2",
                                                children: [
                                                  (0, a.jsx)(l.E, {
                                                    className:
                                                      "h-6 w-24 rounded-full",
                                                  }),
                                                  (0, a.jsx)(l.E, {
                                                    className:
                                                      "h-8 w-8 rounded-full",
                                                  }),
                                                ],
                                              }),
                                            ],
                                          }),
                                        }),
                                        (0, a.jsx)(o.Wu, {
                                          className: "p-4 pt-0",
                                          children: (0, a.jsxs)("div", {
                                            className: "flex flex-wrap gap-2",
                                            children: [
                                              (0, a.jsx)(l.E, {
                                                className: "h-4 w-32",
                                              }),
                                              (0, a.jsx)(l.E, {
                                                className: "h-4 w-40",
                                              }),
                                            ],
                                          }),
                                        }),
                                        (0, a.jsxs)(o.wL, {
                                          className:
                                            "p-4 pt-0 flex justify-between",
                                          children: [
                                            (0, a.jsx)(l.E, {
                                              className: "h-8 w-24",
                                            }),
                                            (0, a.jsx)(l.E, {
                                              className: "h-8 w-32",
                                            }),
                                          ],
                                        }),
                                      ],
                                    },
                                    e,
                                  ),
                                ),
                              }),
                              (0, a.jsx)(d.TabsContent, {
                                value: "documents",
                                className: "space-y-4",
                                children: [1, 2, 3].map((e) =>
                                  (0, a.jsxs)(
                                    o.Zp,
                                    {
                                      children: [
                                        (0, a.jsx)(o.aR, {
                                          className: "p-4",
                                          children: (0, a.jsxs)("div", {
                                            className:
                                              "flex justify-between items-start",
                                            children: [
                                              (0, a.jsxs)("div", {
                                                className:
                                                  "flex items-start space-x-3",
                                                children: [
                                                  (0, a.jsx)(l.E, {
                                                    className:
                                                      "h-10 w-10 rounded-md",
                                                  }),
                                                  (0, a.jsxs)("div", {
                                                    children: [
                                                      (0, a.jsx)(l.E, {
                                                        className:
                                                          "h-6 w-48 mb-2",
                                                      }),
                                                      (0, a.jsx)(l.E, {
                                                        className: "h-4 w-32",
                                                      }),
                                                    ],
                                                  }),
                                                ],
                                              }),
                                              (0, a.jsxs)("div", {
                                                className:
                                                  "flex items-center space-x-2",
                                                children: [
                                                  (0, a.jsx)(l.E, {
                                                    className:
                                                      "h-6 w-24 rounded-full",
                                                  }),
                                                  (0, a.jsx)(l.E, {
                                                    className:
                                                      "h-8 w-8 rounded-full",
                                                  }),
                                                ],
                                              }),
                                            ],
                                          }),
                                        }),
                                        (0, a.jsxs)(o.Wu, {
                                          className: "p-4 pt-0",
                                          children: [
                                            (0, a.jsx)(l.E, {
                                              className: "h-4 w-full mb-2",
                                            }),
                                            (0, a.jsxs)("div", {
                                              className: "flex flex-wrap gap-2",
                                              children: [
                                                (0, a.jsx)(l.E, {
                                                  className: "h-4 w-32",
                                                }),
                                                (0, a.jsx)(l.E, {
                                                  className: "h-4 w-24",
                                                }),
                                              ],
                                            }),
                                          ],
                                        }),
                                        (0, a.jsx)(o.wL, {
                                          className:
                                            "p-4 pt-0 flex justify-end",
                                          children: (0, a.jsx)(l.E, {
                                            className: "h-8 w-32",
                                          }),
                                        }),
                                      ],
                                    },
                                    e,
                                  ),
                                ),
                              }),
                              (0, a.jsx)(d.TabsContent, {
                                value: "analytics",
                                className: "space-y-4",
                                children: (0, a.jsx)("div", {
                                  className:
                                    "h-[400px] w-full rounded-md border border-dashed flex items-center justify-center",
                                  children: (0, a.jsx)(l.E, {
                                    className: "h-8 w-64",
                                  }),
                                }),
                              }),
                            ],
                          }),
                        }),
                      }),
                    ],
                  }),
                ],
              });
            }
            ([n, i, o, l, d] = c.then ? (await c)() : c), s();
          } catch (e) {
            s(e);
          }
        });
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
            generateImageMetadata: () => g,
            generateMetadata: () => f,
            generateViewport: () => v,
            maxDuration: () => h,
            metadata: () => c,
            viewport: () => u,
          });
        var a = r(63033),
          n = r(35242);
        r(93206);
        var i = r(51433),
          o = r(59107),
          l = r(39862),
          d = r(60442);
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
          x = { ...a },
          m =
            "workUnitAsyncStorage" in x
              ? x.workUnitAsyncStorage
              : "requestAsyncStorage" in x
                ? x.requestAsyncStorage
                : void 0;
        s = new Proxy(
          function ({ children: e }) {
            let t = { plugins: [] };
            return (0, n.jsxs)(n.Fragment, {
              children: [
                e,
                (0, n.jsx)(o.Analytics, {}),
                (0, n.jsx)(l.SpeedInsights, {}),
                t && (0, n.jsx)(i.StagewiseToolbar, { config: t }),
              ],
            });
          },
          {
            apply: (e, t, r) => {
              let s, a, n;
              try {
                let e = m?.getStore();
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
                .apply(t, r);
            },
          },
        );
        let f = void 0,
          g = void 0,
          v = void 0,
          b = s;
      },
      22991: (e, t, r) => {
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
          n = r(26394),
          i = r(60442),
          o = (0, n.registerClientReference)(
            function () {
              throw Error(
                "Attempted to call the default export of \"E:\\\\downloads\\\\Hijraah\\\\apps\\\\web\\\\src\\\\app\\\\[locale]\\\\dashboard\\\\cases\\\\page.tsx\" from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
              );
            },
            "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\[locale]\\dashboard\\cases\\page.tsx",
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
                apply: (e, t, r) => {
                  let s, a, n;
                  try {
                    let e = d?.getStore();
                    (s = e?.headers.get("sentry-trace") ?? void 0),
                      (a = e?.headers.get("baggage") ?? void 0),
                      (n = e?.headers);
                  } catch (e) {}
                  return i
                    .wrapServerComponentWithSentry(e, {
                      componentRoute: "/[locale]/dashboard/cases",
                      componentType: "Page",
                      sentryTraceHeader: s,
                      baggageHeader: a,
                      headers: n,
                    })
                    .apply(t, r);
                },
              })
            : o;
        let c = void 0,
          u = void 0,
          p = void 0,
          h = s;
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
      26189: (e, t, r) => {
        Promise.resolve().then(r.bind(r, 22991));
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
      28366: (e, t, r) => {
        "use strict";
        r.d(t, { B8: () => P, UC: () => q, bL: () => E, l9: () => T });
        var s = r(84205),
          a = r(28777),
          n = r(18047),
          i = r(59150),
          o = r(94653),
          l = r(78593),
          d = r(7839),
          c = r(48705),
          u = r(42414),
          p = r(61268),
          h = "Tabs",
          [x, m] = (0, n.A)(h, [i.RG]),
          f = (0, i.RG)(),
          [g, v] = x(h),
          b = s.forwardRef((e, t) => {
            let {
                __scopeTabs: r,
                value: s,
                onValueChange: a,
                defaultValue: n,
                orientation: i = "horizontal",
                dir: o,
                activationMode: x = "automatic",
                ...m
              } = e,
              f = (0, d.jH)(o),
              [v, b] = (0, c.i)({
                prop: s,
                onChange: a,
                defaultProp: n ?? "",
                caller: h,
              });
            return (0, p.jsx)(g, {
              scope: r,
              baseId: (0, u.B)(),
              value: v,
              onValueChange: b,
              orientation: i,
              dir: f,
              activationMode: x,
              children: (0, p.jsx)(l.sG.div, {
                dir: f,
                "data-orientation": i,
                ...m,
                ref: t,
              }),
            });
          });
        b.displayName = h;
        var j = "TabsList",
          w = s.forwardRef((e, t) => {
            let { __scopeTabs: r, loop: s = !0, ...a } = e,
              n = v(j, r),
              o = f(r);
            return (0, p.jsx)(i.bL, {
              asChild: !0,
              ...o,
              orientation: n.orientation,
              dir: n.dir,
              loop: s,
              children: (0, p.jsx)(l.sG.div, {
                role: "tablist",
                "aria-orientation": n.orientation,
                ...a,
                ref: t,
              }),
            });
          });
        w.displayName = j;
        var y = "TabsTrigger",
          N = s.forwardRef((e, t) => {
            let { __scopeTabs: r, value: s, disabled: n = !1, ...o } = e,
              d = v(y, r),
              c = f(r),
              u = _(d.baseId, s),
              h = A(d.baseId, s),
              x = s === d.value;
            return (0, p.jsx)(i.q7, {
              asChild: !0,
              ...c,
              focusable: !n,
              active: x,
              children: (0, p.jsx)(l.sG.button, {
                type: "button",
                role: "tab",
                "aria-selected": x,
                "aria-controls": h,
                "data-state": x ? "active" : "inactive",
                "data-disabled": n ? "" : void 0,
                disabled: n,
                id: u,
                ...o,
                ref: t,
                onMouseDown: (0, a.m)(e.onMouseDown, (e) => {
                  n || 0 !== e.button || !1 !== e.ctrlKey
                    ? e.preventDefault()
                    : d.onValueChange(s);
                }),
                onKeyDown: (0, a.m)(e.onKeyDown, (e) => {
                  [" ", "Enter"].includes(e.key) && d.onValueChange(s);
                }),
                onFocus: (0, a.m)(e.onFocus, () => {
                  let e = "manual" !== d.activationMode;
                  x || n || !e || d.onValueChange(s);
                }),
              }),
            });
          });
        N.displayName = y;
        var k = "TabsContent",
          C = s.forwardRef((e, t) => {
            let {
                __scopeTabs: r,
                value: a,
                forceMount: n,
                children: i,
                ...d
              } = e,
              c = v(k, r),
              u = _(c.baseId, a),
              h = A(c.baseId, a),
              x = a === c.value,
              m = s.useRef(x);
            return (
              s.useEffect(() => {
                let e = requestAnimationFrame(() => (m.current = !1));
                return () => cancelAnimationFrame(e);
              }, []),
              (0, p.jsx)(o.C, {
                present: n || x,
                children: ({ present: r }) =>
                  (0, p.jsx)(l.sG.div, {
                    "data-state": x ? "active" : "inactive",
                    "data-orientation": c.orientation,
                    role: "tabpanel",
                    "aria-labelledby": u,
                    hidden: !r,
                    id: h,
                    tabIndex: 0,
                    ...d,
                    ref: t,
                    style: {
                      ...e.style,
                      animationDuration: m.current ? "0s" : void 0,
                    },
                    children: r && i,
                  }),
              })
            );
          });
        function _(e, t) {
          return `${e}-trigger-${t}`;
        }
        function A(e, t) {
          return `${e}-content-${t}`;
        }
        C.displayName = k;
        var E = b,
          P = w,
          T = N,
          q = C;
      },
      28909: (e, t, r) => {
        "use strict";
        r.a(e, async (e, s) => {
          try {
            r.d(t, { $: () => d, r: () => c });
            var a = r(61268),
              n = r(86415),
              i = r(91635);
            r(84205);
            var o = r(15942),
              l = e([o]);
            o = (l.then ? (await l)() : l)[0];
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
            function d({
              className: e,
              variant: t,
              size: r,
              asChild: s = !1,
              ...i
            }) {
              let l = s ? n.DX : "button";
              return (0, a.jsx)(l, {
                "data-slot": "button",
                className: (0, o.cn)(c({ variant: t, size: r, className: e })),
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
      32425: (e, t, r) => {
        "use strict";
        r.a(e, async (e, s) => {
          try {
            r.r(t), r.d(t, { default: () => j });
            var a = r(61268),
              n = r(42944),
              i = r(44803),
              o = r(95124),
              l = r(84205),
              d = r(28909),
              c = r(5451),
              u = r(94507),
              p = r(20149),
              h = r(78337),
              x = r(77001),
              m = r(79366),
              f = r(58702),
              g = r(3452),
              v = r(15942),
              b = e([d, c, u, p, h, x, v]);
            [d, c, u, p, h, x, v] = b.then ? (await b)() : b;
            let w = async (e) => {
              await new Promise((e) => setTimeout(e, 1e3));
              let t = [
                {
                  id: "1",
                  user_id: "mock-user-1",
                  title: "Case Alpha - All",
                  status: "active",
                  created_at: new Date().toISOString(),
                  updated_at: new Date().toISOString(),
                  case_type: "work_visa",
                  destination_country: "Canada",
                  description: "First case example",
                  current_stage: "document_collection",
                  requirements: { passport: !0 },
                  notes: "Initial notes.",
                  metadata: null,
                },
                {
                  id: "2",
                  user_id: "mock-user-2",
                  title: "Case Beta - All",
                  status: "pending_review",
                  created_at: new Date().toISOString(),
                  updated_at: new Date().toISOString(),
                  case_type: "permanent_residence",
                  destination_country: "USA",
                  description: null,
                  current_stage: "submission",
                  requirements: void 0,
                  notes: void 0,
                  metadata: null,
                },
                {
                  id: "4",
                  user_id: "current-user-id",
                  title: "Case Delta - Assigned",
                  status: "in_progress",
                  created_at: new Date().toISOString(),
                  updated_at: new Date().toISOString(),
                  case_type: "family_visa",
                  destination_country: "Australia",
                  description: "Family sponsorship case",
                  current_stage: "review",
                  requirements: void 0,
                  notes: void 0,
                  metadata: null,
                },
              ];
              return "assigned" === e
                ? t.filter((e) => "current-user-id" === e.user_id)
                : t;
            };
            function j() {
              let e = (0, o.useTranslations)("cases"),
                t = (0, m.p)(),
                r = (0, f.V8)(t),
                [s, b] = (0, l.useState)(!0),
                [j, y] = (0, l.useState)([]),
                [N, k] = (0, l.useState)("all"),
                [C, _] = (0, l.useState)(""),
                A = async () => {
                  b(!0);
                  try {
                    let e = await w(N);
                    y(e);
                  } catch (e) {
                    console.error("Failed to refresh cases:", e);
                  } finally {
                    b(!1);
                  }
                };
              return (0, a.jsxs)("div", {
                className: (0, v.cn)("p-4 md:p-6 lg:p-8", r ? "rtl" : "ltr"),
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
                        children: (0, a.jsxs)(g.N_, {
                          href: "/dashboard/cases/new",
                          children: [
                            (0, a.jsx)(n.A, {
                              className: (0, v.cn)(
                                "h-4 w-4",
                                r ? "ml-2" : "mr-2",
                              ),
                            }),
                            e("newCaseButton"),
                          ],
                        }),
                      }),
                    ],
                  }),
                  (0, a.jsxs)(x.Tabs, {
                    defaultValue: N,
                    onValueChange: (e) => k(e),
                    className: "w-full",
                    children: [
                      (0, a.jsxs)("div", {
                        className: "flex items-center justify-between mb-4",
                        children: [
                          (0, a.jsxs)(x.TabsList, {
                            children: [
                              (0, a.jsx)(x.TabsTrigger, {
                                value: "all",
                                children: e("allCasesTab"),
                              }),
                              (0, a.jsx)(x.TabsTrigger, {
                                value: "assigned",
                                children: e("myCasesTab"),
                              }),
                            ],
                          }),
                          (0, a.jsxs)("div", {
                            className: "relative w-full max-w-sm",
                            children: [
                              (0, a.jsx)(i.A, {
                                className: (0, v.cn)(
                                  "absolute h-4 w-4 text-muted-foreground top-1/2 -translate-y-1/2",
                                  r ? "right-3" : "left-3",
                                ),
                              }),
                              (0, a.jsx)(h.p, {
                                placeholder: e("searchPlaceholder"),
                                className: (0, v.cn)(r ? "pr-8" : "pl-8"),
                                value: C,
                                onChange: (e) => _(e.target.value),
                              }),
                            ],
                          }),
                        ],
                      }),
                      (0, a.jsx)(x.TabsContent, {
                        value: "all",
                        children: (0, a.jsxs)(c.Zp, {
                          children: [
                            (0, a.jsxs)(c.aR, {
                              children: [
                                (0, a.jsx)(c.ZB, {
                                  children: e("allCasesTab"),
                                }),
                                (0, a.jsx)(c.BT, {
                                  children:
                                    "View and manage all immigration cases in the system.",
                                }),
                              ],
                            }),
                            (0, a.jsx)(c.Wu, {
                              children: s
                                ? (0, a.jsx)(p.O, {})
                                : (0, a.jsx)(u.G, {
                                    cases: j,
                                    onCaseUpdated: A,
                                  }),
                            }),
                          ],
                        }),
                      }),
                      (0, a.jsx)(x.TabsContent, {
                        value: "assigned",
                        children: (0, a.jsxs)(c.Zp, {
                          children: [
                            (0, a.jsxs)(c.aR, {
                              children: [
                                (0, a.jsx)(c.ZB, { children: e("myCasesTab") }),
                                (0, a.jsx)(c.BT, {
                                  children:
                                    "View and manage cases assigned directly to you.",
                                }),
                              ],
                            }),
                            (0, a.jsx)(c.Wu, {
                              children: s
                                ? (0, a.jsx)(p.O, {})
                                : (0, a.jsx)(u.G, {
                                    cases: j,
                                    onCaseUpdated: A,
                                  }),
                            }),
                          ],
                        }),
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
      46299: (e, t, r) => {
        "use strict";
        r.d(t, { A: () => s });
        let s = (0, r(95255).A)("Briefcase", [
          [
            "rect",
            {
              width: "20",
              height: "14",
              x: "2",
              y: "7",
              rx: "2",
              ry: "2",
              key: "eto64e",
            },
          ],
          [
            "path",
            { d: "M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16", key: "zwj3tp" },
          ],
        ]);
      },
      48161: (e) => {
        "use strict";
        e.exports = require("node:os");
      },
      48484: (e, t, r) => {
        "use strict";
        r.r(t),
          r.d(t, {
            GlobalError: () => n.default,
            __next_app__: () => c,
            pages: () => d,
            routeModule: () => u,
            tree: () => l,
          });
        var s = r(11610),
          a = r(51293),
          n = r(59059),
          i = r(17770),
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
        r.d(t, o);
        let l = {
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
                              "__PAGE__",
                              {},
                              {
                                page: [
                                  () =>
                                    Promise.resolve().then(r.bind(r, 22991)),
                                  "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\[locale]\\dashboard\\cases\\page.tsx",
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
          d = [
            "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\[locale]\\dashboard\\cases\\page.tsx",
          ],
          c = { require: r, loadChunk: () => Promise.resolve() },
          u = new s.AppPageRouteModule({
            definition: {
              kind: a.RouteKind.APP_PAGE,
              page: "/[locale]/dashboard/cases/page",
              pathname: "/[locale]/dashboard/cases",
              bundlePath: "",
              filename: "",
              appPaths: [],
            },
            userland: { loaderTree: l },
          });
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
          n = r(26394),
          i = r(60442),
          o = (0, n.registerClientReference)(
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
          "function" == typeof o
            ? new Proxy(o, {
                apply: (e, t, r) => {
                  let s, a, n;
                  try {
                    let e = d?.getStore();
                    (s = e?.headers.get("sentry-trace") ?? void 0),
                      (a = e?.headers.get("baggage") ?? void 0),
                      (n = e?.headers);
                  } catch (e) {}
                  return i
                    .wrapServerComponentWithSentry(e, {
                      componentRoute: "/",
                      componentType: "Not-found",
                      sentryTraceHeader: s,
                      baggageHeader: a,
                      headers: n,
                    })
                    .apply(t, r);
                },
              })
            : o;
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
        r.r(t), r.d(t, { default: () => n });
        var s = r(61268),
          a = r(89882);
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
          V8: () => o,
          XG: () => i,
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
        function i(e) {
          return n[e] || n[a];
        }
        function o(e) {
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
      59150: (e, t, r) => {
        "use strict";
        r.d(t, { RG: () => w, bL: () => T, q7: () => q });
        var s = r(84205),
          a = r(28777),
          n = r(28029),
          i = r(71604),
          o = r(18047),
          l = r(42414),
          d = r(78593),
          c = r(10308),
          u = r(48705),
          p = r(7839),
          h = r(61268),
          x = "rovingFocusGroup.onEntryFocus",
          m = { bubbles: !1, cancelable: !0 },
          f = "RovingFocusGroup",
          [g, v, b] = (0, n.N)(f),
          [j, w] = (0, o.A)(f, [b]),
          [y, N] = j(f),
          k = s.forwardRef((e, t) =>
            (0, h.jsx)(g.Provider, {
              scope: e.__scopeRovingFocusGroup,
              children: (0, h.jsx)(g.Slot, {
                scope: e.__scopeRovingFocusGroup,
                children: (0, h.jsx)(C, { ...e, ref: t }),
              }),
            }),
          );
        k.displayName = f;
        var C = s.forwardRef((e, t) => {
            let {
                __scopeRovingFocusGroup: r,
                orientation: n,
                loop: o = !1,
                dir: l,
                currentTabStopId: g,
                defaultCurrentTabStopId: b,
                onCurrentTabStopIdChange: j,
                onEntryFocus: w,
                preventScrollOnEntryFocus: N = !1,
                ...k
              } = e,
              C = s.useRef(null),
              _ = (0, i.s)(t, C),
              A = (0, p.jH)(l),
              [E, T] = (0, u.i)({
                prop: g,
                defaultProp: b ?? null,
                onChange: j,
                caller: f,
              }),
              [q, S] = s.useState(!1),
              D = (0, c.c)(w),
              I = v(r),
              R = s.useRef(!1),
              [M, H] = s.useState(0);
            return (
              s.useEffect(() => {
                let e = C.current;
                if (e)
                  return (
                    e.addEventListener(x, D), () => e.removeEventListener(x, D)
                  );
              }, [D]),
              (0, h.jsx)(y, {
                scope: r,
                orientation: n,
                dir: A,
                loop: o,
                currentTabStopId: E,
                onItemFocus: s.useCallback((e) => T(e), [T]),
                onItemShiftTab: s.useCallback(() => S(!0), []),
                onFocusableItemAdd: s.useCallback(() => H((e) => e + 1), []),
                onFocusableItemRemove: s.useCallback(() => H((e) => e - 1), []),
                children: (0, h.jsx)(d.sG.div, {
                  tabIndex: q || 0 === M ? -1 : 0,
                  "data-orientation": n,
                  ...k,
                  ref: _,
                  style: { outline: "none", ...e.style },
                  onMouseDown: (0, a.m)(e.onMouseDown, () => {
                    R.current = !0;
                  }),
                  onFocus: (0, a.m)(e.onFocus, (e) => {
                    let t = !R.current;
                    if (e.target === e.currentTarget && t && !q) {
                      let t = new CustomEvent(x, m);
                      if (
                        (e.currentTarget.dispatchEvent(t), !t.defaultPrevented)
                      ) {
                        let e = I().filter((e) => e.focusable);
                        P(
                          [
                            e.find((e) => e.active),
                            e.find((e) => e.id === E),
                            ...e,
                          ]
                            .filter(Boolean)
                            .map((e) => e.ref.current),
                          N,
                        );
                      }
                    }
                    R.current = !1;
                  }),
                  onBlur: (0, a.m)(e.onBlur, () => S(!1)),
                }),
              })
            );
          }),
          _ = "RovingFocusGroupItem",
          A = s.forwardRef((e, t) => {
            let {
                __scopeRovingFocusGroup: r,
                focusable: n = !0,
                active: i = !1,
                tabStopId: o,
                children: c,
                ...u
              } = e,
              p = (0, l.B)(),
              x = o || p,
              m = N(_, r),
              f = m.currentTabStopId === x,
              b = v(r),
              {
                onFocusableItemAdd: j,
                onFocusableItemRemove: w,
                currentTabStopId: y,
              } = m;
            return (
              s.useEffect(() => {
                if (n) return j(), () => w();
              }, [n, j, w]),
              (0, h.jsx)(g.ItemSlot, {
                scope: r,
                id: x,
                focusable: n,
                active: i,
                children: (0, h.jsx)(d.sG.span, {
                  tabIndex: f ? 0 : -1,
                  "data-orientation": m.orientation,
                  ...u,
                  ref: t,
                  onMouseDown: (0, a.m)(e.onMouseDown, (e) => {
                    n ? m.onItemFocus(x) : e.preventDefault();
                  }),
                  onFocus: (0, a.m)(e.onFocus, () => m.onItemFocus(x)),
                  onKeyDown: (0, a.m)(e.onKeyDown, (e) => {
                    if ("Tab" === e.key && e.shiftKey)
                      return void m.onItemShiftTab();
                    if (e.target !== e.currentTarget) return;
                    let t = (function (e, t, r) {
                      var s;
                      let a =
                        ((s = e.key),
                        "rtl" !== r
                          ? s
                          : "ArrowLeft" === s
                            ? "ArrowRight"
                            : "ArrowRight" === s
                              ? "ArrowLeft"
                              : s);
                      if (
                        !(
                          "vertical" === t &&
                          ["ArrowLeft", "ArrowRight"].includes(a)
                        ) &&
                        !(
                          "horizontal" === t &&
                          ["ArrowUp", "ArrowDown"].includes(a)
                        )
                      )
                        return E[a];
                    })(e, m.orientation, m.dir);
                    if (void 0 !== t) {
                      if (e.metaKey || e.ctrlKey || e.altKey || e.shiftKey)
                        return;
                      e.preventDefault();
                      let r = b()
                        .filter((e) => e.focusable)
                        .map((e) => e.ref.current);
                      if ("last" === t) r.reverse();
                      else if ("prev" === t || "next" === t) {
                        "prev" === t && r.reverse();
                        let s = r.indexOf(e.currentTarget);
                        r = m.loop
                          ? (function (e, t) {
                              return e.map((r, s) => e[(t + s) % e.length]);
                            })(r, s + 1)
                          : r.slice(s + 1);
                      }
                      setTimeout(() => P(r));
                    }
                  }),
                  children:
                    "function" == typeof c
                      ? c({ isCurrentTabStop: f, hasTabStop: null != y })
                      : c,
                }),
              })
            );
          });
        A.displayName = _;
        var E = {
          ArrowLeft: "prev",
          ArrowUp: "prev",
          ArrowRight: "next",
          ArrowDown: "next",
          PageUp: "first",
          Home: "first",
          PageDown: "last",
          End: "last",
        };
        function P(e, t = !1) {
          let r = document.activeElement;
          for (let s of e)
            if (
              s === r ||
              (s.focus({ preventScroll: t }), document.activeElement !== r)
            )
              return;
        }
        var T = k,
          q = A;
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
              Tabs: () => l,
              TabsContent: () => u,
              TabsList: () => d,
              TabsTrigger: () => c,
            });
            var a = r(61268),
              n = r(28366);
            r(84205);
            var i = r(15942),
              o = e([i]);
            function l({ className: e, ...t }) {
              return (0, a.jsx)(n.bL, {
                "data-slot": "tabs",
                className: (0, i.cn)("flex flex-col gap-2", e),
                ...t,
              });
            }
            function d({ className: e, ...t }) {
              return (0, a.jsx)(n.B8, {
                "data-slot": "tabs-list",
                className: (0, i.cn)(
                  "bg-muted text-muted-foreground inline-flex h-9 w-fit items-center justify-center rounded-lg p-[3px]",
                  e,
                ),
                ...t,
              });
            }
            function c({ className: e, ...t }) {
              return (0, a.jsx)(n.l9, {
                "data-slot": "tabs-trigger",
                className: (0, i.cn)(
                  "data-[state=active]:bg-background dark:data-[state=active]:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:outline-ring dark:data-[state=active]:border-input dark:data-[state=active]:bg-input/30 text-foreground dark:text-muted-foreground inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-md border border-transparent px-2 py-1 text-sm font-medium whitespace-nowrap transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:shadow-sm [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
                  e,
                ),
                ...t,
              });
            }
            function u({ className: e, ...t }) {
              return (0, a.jsx)(n.UC, {
                "data-slot": "tabs-content",
                className: (0, i.cn)("flex-1 outline-none", e),
                ...t,
              });
            }
            (i = (o.then ? (await o)() : o)[0]), s();
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
            r.r(t), r.d(t, { default: () => o });
            var a = r(61268);
            r(86896), r(84205);
            var n = r(28909),
              i = e([n]);
            function o({ error: e, reset: t }) {
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
                            onClick: () => t(),
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
            (n = (i.then ? (await i)() : i)[0]), s();
          } catch (e) {
            s(e);
          }
        });
      },
      87447: (e, t, r) => {
        "use strict";
        r.a(e, async (e, s) => {
          try {
            r.r(t), r.d(t, { default: () => o });
            var a = r(61268);
            r(84205);
            var n = r(28909),
              i = e([n]);
            function o({ error: e, reset: t }) {
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
                      onClick: () => t(),
                      variant: "outline",
                      children: "Try again",
                    }),
                  ],
                }),
              });
            }
            (n = (i.then ? (await i)() : i)[0]), s();
          } catch (e) {
            s(e);
          }
        });
      },
      89783: (e, t, r) => {
        Promise.resolve().then(r.bind(r, 53974));
      },
      89805: (e, t, r) => {
        Promise.resolve().then(r.bind(r, 32425));
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
      94507: (e, t, r) => {
        "use strict";
        r.a(e, async (e, s) => {
          try {
            r.d(t, { G: () => w });
            var a = r(61268),
              n = r(81578),
              i = r(46299),
              o = r(24131),
              l = r(14677),
              d = r(12335),
              c = r(89882),
              u = r(95124),
              p = r(84205),
              h = r(79366),
              x = r(58702),
              m = r(15942),
              f = r(46532),
              g = r(28909),
              v = r(5451),
              b = r(93336),
              j = e([m, f, g, v, b]);
            function w({ cases: e, onCaseUpdated: t }) {
              let r = (0, c.useRouter)(),
                [s, j] = (0, p.useState)(null),
                w = (0, u.useTranslations)("casesList"),
                y = (0, h.p)(),
                N = (0, x.V8)(y),
                k = (e) => {
                  switch (e) {
                    case "active":
                      return "bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-900/50 dark:text-green-300";
                    case "pending":
                    case "pending_review":
                      return "bg-yellow-100 text-yellow-800 hover:bg-yellow-200 dark:bg-yellow-900/50 dark:text-yellow-300";
                    case "in_progress":
                      return "bg-blue-100 text-blue-800 hover:bg-blue-200 dark:bg-blue-900/50 dark:text-blue-300";
                    case "completed":
                    case "approved":
                      return "bg-purple-100 text-purple-800 hover:bg-purple-200 dark:bg-purple-900/50 dark:text-purple-300";
                    case "rejected":
                      return "bg-red-100 text-red-800 hover:bg-red-200 dark:bg-red-900/50 dark:text-red-300";
                    default:
                      return "bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300";
                  }
                },
                C = (e) => {
                  switch (e) {
                    case "active":
                      return w("statusActive");
                    case "pending":
                      return w("statusPending");
                    case "in_progress":
                      return w("statusInProgress");
                    case "pending_review":
                      return w("statusPendingReview");
                    case "completed":
                      return w("statusCompleted");
                    case "approved":
                      return w("statusApproved");
                    case "rejected":
                      return w("statusRejected");
                    case "archived":
                      return w("statusArchived");
                    default:
                      return e;
                  }
                },
                _ = (e) => {
                  if (!e) return w("notAvailable");
                  try {
                    return (0, n.GP)(new Date(e), "MMM d, yyyy");
                  } catch (e) {
                    return w("invalidDate");
                  }
                },
                A = (e) => {
                  j(s === e ? null : e);
                };
              return 0 === e.length
                ? (0, a.jsxs)("div", {
                    className: "text-center p-12 border rounded-lg",
                    children: [
                      (0, a.jsx)(i.A, {
                        className:
                          "h-12 w-12 mx-auto text-muted-foreground mb-4",
                      }),
                      (0, a.jsx)("h3", {
                        className: "text-lg font-medium",
                        children: w("emptyTitle"),
                      }),
                      (0, a.jsx)("p", {
                        className: "text-muted-foreground mb-4",
                        children: w("emptyDescription"),
                      }),
                      (0, a.jsx)(g.$, {
                        onClick: () => r.push("/dashboard/cases/new"),
                        children: w("emptyButton"),
                      }),
                    ],
                  })
                : (0, a.jsx)("div", {
                    className: "space-y-4",
                    children: e.map((e) =>
                      (0, a.jsxs)(
                        v.Zp,
                        {
                          className: (0, m.cn)(
                            "transition-all",
                            s === e.id
                              ? "border-primary shadow-md"
                              : "hover:shadow-sm",
                          ),
                          children: [
                            (0, a.jsx)(v.aR, {
                              className: "p-4",
                              children: (0, a.jsxs)("div", {
                                className:
                                  "flex justify-between items-start gap-4",
                                children: [
                                  (0, a.jsxs)("div", {
                                    className: "flex-1",
                                    children: [
                                      (0, a.jsx)(v.ZB, {
                                        className: "text-lg",
                                        children: e.title || w("untitledCase"),
                                      }),
                                      e.description &&
                                        (0, a.jsxs)(v.BT, {
                                          className:
                                            "text-sm text-muted-foreground mt-1",
                                          children: [
                                            e.description.substring(0, 100),
                                            e.description.length > 100
                                              ? "..."
                                              : "",
                                          ],
                                        }),
                                    ],
                                  }),
                                  (0, a.jsxs)("div", {
                                    className:
                                      "flex items-center space-x-2 flex-shrink-0",
                                    children: [
                                      (0, a.jsx)(f.E, {
                                        className: k(e.status),
                                        children: C(e.status),
                                      }),
                                      (0, a.jsxs)(b.rI, {
                                        children: [
                                          (0, a.jsx)(b.ty, {
                                            asChild: !0,
                                            children: (0, a.jsx)(g.$, {
                                              variant: "ghost",
                                              size: "icon",
                                              className: "h-8 w-8",
                                              children: (0, a.jsx)(o.A, {
                                                className: "h-4 w-4",
                                              }),
                                            }),
                                          }),
                                          (0, a.jsxs)(b.SQ, {
                                            align: "end",
                                            children: [
                                              (0, a.jsx)(b.lp, {
                                                children: w("actionsLabel"),
                                              }),
                                              (0, a.jsx)(b.mB, {}),
                                              (0, a.jsx)(b._2, {
                                                onClick: () =>
                                                  r.push(
                                                    `/dashboard/cases/${e.id}`,
                                                  ),
                                                children:
                                                  w("viewDetailsAction"),
                                              }),
                                              (0, a.jsx)(b._2, {
                                                onClick: () =>
                                                  r.push(
                                                    `/dashboard/cases/${e.id}/edit`,
                                                  ),
                                                children: w("editCaseAction"),
                                              }),
                                              (0, a.jsx)(b._2, {
                                                onClick: () =>
                                                  r.push(
                                                    `/dashboard/cases/${e.id}/documents`,
                                                  ),
                                                children: w(
                                                  "viewDocumentsAction",
                                                ),
                                              }),
                                              (0, a.jsx)(b.mB, {}),
                                              (0, a.jsx)(b._2, {
                                                className:
                                                  "text-red-600 focus:bg-red-100 focus:text-red-700 dark:focus:bg-red-900/50 dark:focus:text-red-300",
                                                onClick: async () => {
                                                  await t();
                                                },
                                                children:
                                                  w("archiveCaseAction"),
                                              }),
                                            ],
                                          }),
                                        ],
                                      }),
                                    ],
                                  }),
                                ],
                              }),
                            }),
                            (0, a.jsx)(v.Wu, {
                              className: "p-4 pt-0",
                              children: (0, a.jsxs)("div", {
                                className:
                                  "flex flex-wrap text-sm text-muted-foreground gap-x-4 gap-y-1",
                                children: [
                                  (0, a.jsxs)("div", {
                                    className: "flex items-center",
                                    children: [
                                      (0, a.jsx)(i.A, {
                                        className: "mr-1 h-4 w-4 flex-shrink-0",
                                      }),
                                      (0, a.jsxs)("span", {
                                        children: [
                                          w("typePrefix"),
                                          ":",
                                          " ",
                                          e.case_type?.replace("_", " ") ||
                                            w("notAvailable"),
                                        ],
                                      }),
                                    ],
                                  }),
                                  e.target_date &&
                                    (0, a.jsxs)("div", {
                                      className: "flex items-center",
                                      children: [
                                        (0, a.jsx)(l.A, {
                                          className:
                                            "mr-1 h-4 w-4 flex-shrink-0",
                                        }),
                                        (0, a.jsxs)("span", {
                                          children: [
                                            w("targetPrefix"),
                                            ": ",
                                            _(e.target_date),
                                          ],
                                        }),
                                      ],
                                    }),
                                  (0, a.jsxs)("div", {
                                    className: "flex items-center",
                                    children: [
                                      (0, a.jsx)(l.A, {
                                        className: "mr-1 h-4 w-4 flex-shrink-0",
                                      }),
                                      (0, a.jsxs)("span", {
                                        children: [
                                          w("createdPrefix"),
                                          ": ",
                                          _(e.created_at),
                                        ],
                                      }),
                                    ],
                                  }),
                                ],
                              }),
                            }),
                            (0, a.jsxs)(v.wL, {
                              className: "p-4 pt-0 flex justify-between",
                              children: [
                                (0, a.jsx)(g.$, {
                                  variant: "ghost",
                                  size: "sm",
                                  onClick: () => A(e.id),
                                  children:
                                    s === e.id ? w("showLess") : w("showMore"),
                                }),
                                (0, a.jsxs)(g.$, {
                                  variant: "default",
                                  size: "sm",
                                  onClick: () =>
                                    r.push(`/dashboard/cases/${e.id}`),
                                  children: [
                                    w("viewDetailsAction"),
                                    (0, a.jsx)(d.A, {
                                      className: (0, m.cn)(
                                        "h-4 w-4",
                                        N ? "mr-1" : "ml-1",
                                      ),
                                    }),
                                  ],
                                }),
                              ],
                            }),
                            s === e.id &&
                              (0, a.jsx)("div", {
                                className: "px-4 pb-4 border-t pt-4",
                                children: (0, a.jsxs)("div", {
                                  className:
                                    "grid grid-cols-1 md:grid-cols-2 gap-4 text-sm",
                                  children: [
                                    (0, a.jsxs)("div", {
                                      children: [
                                        (0, a.jsx)("h4", {
                                          className: "font-medium mb-2",
                                          children: w("detailsHeader"),
                                        }),
                                        (0, a.jsxs)("p", {
                                          className:
                                            "text-muted-foreground mb-1",
                                          children: [
                                            (0, a.jsxs)("strong", {
                                              children: [w("idLabel"), ":"],
                                            }),
                                            " ",
                                            e.id,
                                          ],
                                        }),
                                        (0, a.jsxs)("p", {
                                          className:
                                            "text-muted-foreground mb-1",
                                          children: [
                                            (0, a.jsxs)("strong", {
                                              children: [
                                                w("destinationLabel"),
                                                ":",
                                              ],
                                            }),
                                            " ",
                                            e.destination_country ||
                                              w("notAvailable"),
                                          ],
                                        }),
                                        (0, a.jsxs)("p", {
                                          className: "text-muted-foreground",
                                          children: [
                                            (0, a.jsxs)("strong", {
                                              children: [
                                                w("lastUpdatedLabel"),
                                                ":",
                                              ],
                                            }),
                                            " ",
                                            _(e.updated_at),
                                          ],
                                        }),
                                      ],
                                    }),
                                    (0, a.jsxs)("div", {
                                      children: [
                                        (0, a.jsx)("h4", {
                                          className: "font-medium mb-2",
                                          children: w("requirementsHeader"),
                                        }),
                                        e.requirements &&
                                        Object.keys(e.requirements).length > 0
                                          ? (0, a.jsxs)("ul", {
                                              className:
                                                "list-disc list-inside text-muted-foreground space-y-1",
                                              children: [
                                                Object.entries(e.requirements)
                                                  .slice(0, 3)
                                                  .map(([e, t]) =>
                                                    (0, a.jsxs)(
                                                      "li",
                                                      {
                                                        children: [
                                                          e,
                                                          ": ",
                                                          String(t),
                                                        ],
                                                      },
                                                      e,
                                                    ),
                                                  ),
                                                Object.keys(e.requirements)
                                                  .length > 3 &&
                                                  (0, a.jsx)("li", {
                                                    children: w(
                                                      "andMoreItems",
                                                      {
                                                        count:
                                                          Object.keys(
                                                            e.requirements,
                                                          ).length - 3,
                                                      },
                                                    ),
                                                  }),
                                              ],
                                            })
                                          : (0, a.jsx)("p", {
                                              className:
                                                "text-muted-foreground",
                                              children: w("noRequirements"),
                                            }),
                                      ],
                                    }),
                                  ],
                                }),
                              }),
                          ],
                        },
                        e.id,
                      ),
                    ),
                  });
            }
            ([m, f, g, v, b] = j.then ? (await j)() : j), s();
          } catch (e) {
            s(e);
          }
        });
      },
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
  var t = require("../../../../webpack-runtime.js");
  t.C(e);
  var r = (e) => t((t.s = e)),
    s = t.X(
      0,
      [
        827, 6518, 2033, 4027, 2872, 7713, 5149, 8859, 1655, 8029, 5728, 9729,
        3390, 4990, 6188, 7911, 7401, 5124, 7272, 3042, 385, 7393, 4486, 7018,
        4763, 7333, 7145, 9207, 1578, 8264, 27, 7935,
      ],
      () => r(48484),
    );
  module.exports = s;
})();
//# sourceMappingURL=page.js.map
