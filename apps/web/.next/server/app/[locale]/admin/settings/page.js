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
    (e._sentryDebugIds[t] = "f23d0e50-c933-4866-a78a-45f79d7db433"),
    (e._sentryDebugIdIdentifier =
      "sentry-dbid-f23d0e50-c933-4866-a78a-45f79d7db433"));
} catch (e) {}
(() => {
  var e = {};
  (e.id = 6783),
    (e.ids = [4630, 6783]),
    (e.modules = {
      278: (e, t, r) => {
        "use strict";
        r.d(t, { bL: () => j, zi: () => N });
        var s = r(84205),
          a = r(28777),
          n = r(71604),
          o = r(18047),
          i = r(48705),
          d = r(67155),
          l = r(91557),
          c = r(78593),
          p = r(61268),
          u = "Switch",
          [h, m] = (0, o.A)(u),
          [x, f] = h(u),
          g = s.forwardRef((e, t) => {
            let {
                __scopeSwitch: r,
                name: o,
                checked: d,
                defaultChecked: l,
                required: h,
                disabled: m,
                value: f = "on",
                onCheckedChange: g,
                form: v,
                ...b
              } = e,
              [j, N] = s.useState(null),
              k = (0, n.s)(t, (e) => N(e)),
              P = s.useRef(!1),
              q = !j || v || !!j.closest("form"),
              [C, S] = (0, i.i)({
                prop: d,
                defaultProp: l ?? !1,
                onChange: g,
                caller: u,
              });
            return (0, p.jsxs)(x, {
              scope: r,
              checked: C,
              disabled: m,
              children: [
                (0, p.jsx)(c.sG.button, {
                  type: "button",
                  role: "switch",
                  "aria-checked": C,
                  "aria-required": h,
                  "data-state": w(C),
                  "data-disabled": m ? "" : void 0,
                  disabled: m,
                  value: f,
                  ...b,
                  ref: k,
                  onClick: (0, a.m)(e.onClick, (e) => {
                    S((e) => !e),
                      q &&
                        ((P.current = e.isPropagationStopped()),
                        P.current || e.stopPropagation());
                  }),
                }),
                q &&
                  (0, p.jsx)(y, {
                    control: j,
                    bubbles: !P.current,
                    name: o,
                    value: f,
                    checked: C,
                    required: h,
                    disabled: m,
                    form: v,
                    style: { transform: "translateX(-100%)" },
                  }),
              ],
            });
          });
        g.displayName = u;
        var v = "SwitchThumb",
          b = s.forwardRef((e, t) => {
            let { __scopeSwitch: r, ...s } = e,
              a = f(v, r);
            return (0, p.jsx)(c.sG.span, {
              "data-state": w(a.checked),
              "data-disabled": a.disabled ? "" : void 0,
              ...s,
              ref: t,
            });
          });
        b.displayName = v;
        var y = s.forwardRef(
          (
            { __scopeSwitch: e, control: t, checked: r, bubbles: a = !0, ...o },
            i,
          ) => {
            let c = s.useRef(null),
              u = (0, n.s)(c, i),
              h = (0, d.Z)(r),
              m = (0, l.X)(t);
            return (
              s.useEffect(() => {
                let e = c.current;
                if (!e) return;
                let t = Object.getOwnPropertyDescriptor(
                  window.HTMLInputElement.prototype,
                  "checked",
                ).set;
                if (h !== r && t) {
                  let s = new Event("click", { bubbles: a });
                  t.call(e, r), e.dispatchEvent(s);
                }
              }, [h, r, a]),
              (0, p.jsx)("input", {
                type: "checkbox",
                "aria-hidden": !0,
                defaultChecked: r,
                ...o,
                tabIndex: -1,
                ref: u,
                style: {
                  ...o.style,
                  ...m,
                  position: "absolute",
                  pointerEvents: "none",
                  opacity: 0,
                  margin: 0,
                },
              })
            );
          },
        );
        function w(e) {
          return e ? "checked" : "unchecked";
        }
        y.displayName = "SwitchBubbleInput";
        var j = g,
          N = b;
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
              BT: () => u,
              Wu: () => h,
              ZB: () => p,
              Zp: () => l,
              aR: () => c,
              wL: () => m,
            });
            var a = r(61268),
              n = r(55728),
              o = r(84205),
              i = r(15942),
              d = e([i]);
            i = (d.then ? (await d)() : d)[0];
            let l = o.forwardRef(({ className: e, ...t }, r) =>
              (0, a.jsx)(n.P.div, {
                ref: r,
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
                ...t,
              }),
            );
            l.displayName = "Card";
            let c = o.forwardRef(({ className: e, ...t }, r) =>
              (0, a.jsx)("div", {
                ref: r,
                className: (0, i.cn)("flex flex-col space-y-1.5 p-6", e),
                ...t,
              }),
            );
            c.displayName = "CardHeader";
            let p = o.forwardRef(({ className: e, ...t }, r) =>
              (0, a.jsx)("h3", {
                ref: r,
                className: (0, i.cn)(
                  "text-2xl font-semibold leading-none tracking-tight",
                  e,
                ),
                ...t,
              }),
            );
            p.displayName = "CardTitle";
            let u = o.forwardRef(({ className: e, ...t }, r) =>
              (0, a.jsx)("p", {
                ref: r,
                className: (0, i.cn)("text-sm text-muted-foreground", e),
                ...t,
              }),
            );
            u.displayName = "CardDescription";
            let h = o.forwardRef(({ className: e, ...t }, r) =>
              (0, a.jsx)("div", {
                ref: r,
                className: (0, i.cn)("p-6 pt-0", e),
                ...t,
              }),
            );
            h.displayName = "CardContent";
            let m = o.forwardRef(({ className: e, ...t }, r) =>
              (0, a.jsx)("div", {
                ref: r,
                className: (0, i.cn)("flex items-center p-6 pt-0", e),
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
      13909: (e, t, r) => {
        "use strict";
        r.a(e, async (e, s) => {
          try {
            r.d(t, { d: () => l });
            var a = r(61268),
              n = r(278),
              o = r(84205),
              i = r(15942),
              d = e([i]);
            i = (d.then ? (await d)() : d)[0];
            let l = o.forwardRef(({ className: e, ...t }, r) =>
              (0, a.jsx)(n.bL, {
                className: (0, i.cn)(
                  "peer inline-flex h-[24px] w-[44px] shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input",
                  e,
                ),
                ...t,
                ref: r,
                children: (0, a.jsx)(n.zi, {
                  className: (0, i.cn)(
                    "pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0",
                  ),
                }),
              }),
            );
            (l.displayName = n.bL.displayName), s();
          } catch (e) {
            s(e);
          }
        });
      },
      15942: (e, t, r) => {
        "use strict";
        r.a(e, async (e, s) => {
          try {
            r.d(t, {
              Cq: () => c,
              GO: () => u,
              cn: () => d,
              lk: () => l,
              y8: () => p,
            });
            var a = r(85488);
            r(3477);
            var n = r(79029),
              o = r(58360),
              i = e([a]);
            function d(...e) {
              return (0, o.QP)((0, n.$)(e));
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
            a = (i.then ? (await i)() : i)[0];
            let u = async (e) => {
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
            function p(e) {
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
      16979: (e, t, r) => {
        "use strict";
        r.a(e, async (e, s) => {
          try {
            r.d(t, { J: () => d });
            var a = r(61268),
              n = r(30595);
            r(84205);
            var o = r(15942),
              i = e([o]);
            function d({ className: e, ...t }) {
              return (0, a.jsx)(n.b, {
                "data-slot": "label",
                className: (0, o.cn)(
                  "flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
                  e,
                ),
                ...t,
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
      21004: (e, t, r) => {
        "use strict";
        r.r(t),
          r.d(t, {
            GlobalError: () => n.default,
            __next_app__: () => c,
            pages: () => l,
            routeModule: () => p,
            tree: () => d,
          });
        var s = r(11610),
          a = r(51293),
          n = r(59059),
          o = r(17770),
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
        r.d(t, i);
        let d = {
            children: [
              "",
              {
                children: [
                  "[locale]",
                  {
                    children: [
                      "admin",
                      {
                        children: [
                          "settings",
                          {
                            children: [
                              "__PAGE__",
                              {},
                              {
                                page: [
                                  () =>
                                    Promise.resolve().then(r.bind(r, 76280)),
                                  "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\[locale]\\admin\\settings\\page.tsx",
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
          l = [
            "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\[locale]\\admin\\settings\\page.tsx",
          ],
          c = { require: r, loadChunk: () => Promise.resolve() },
          p = new s.AppPageRouteModule({
            definition: {
              kind: a.RouteKind.APP_PAGE,
              page: "/[locale]/admin/settings/page",
              pathname: "/[locale]/admin/settings",
              bundlePath: "",
              filename: "",
              appPaths: [],
            },
            userland: { loaderTree: d },
          });
      },
      21246: (e, t, r) => {
        "use strict";
        r.a(e, async (e, s) => {
          try {
            r.r(t), r.d(t, { default: () => b });
            var a = r(61268),
              n = r(89882),
              o = r(95124),
              i = r(84205),
              d = r(98654),
              l = r(28909),
              c = r(5451),
              p = r(78337),
              u = r(16979),
              h = r(95957),
              m = r(13909),
              x = r(64012),
              f = r(58702),
              g = r(15942),
              v = e([l, c, p, u, h, m, g]);
            [l, c, p, u, h, m, g] = v.then ? (await v)() : v;
            let y = async (e) =>
              (await new Promise((e) => setTimeout(e, 1e3)),
              Math.random() > 0.1)
                ? { success: !0 }
                : { success: !1, error: "Simulated network error" };
            function b() {
              let e = (0, n.useParams)().locale || "en",
                { isAdmin: t, isLoading: r } = (0, x.h)(),
                s = (0, o.useTranslations)("adminSettings"),
                v = (0, f.V8)(e),
                [b, w] = (0, i.useState)({}),
                [j, N] = (0, i.useState)(!0),
                [k, P] = (0, i.useState)(!1),
                q = (e, t) => {
                  w((r) => ({ ...r, [e]: t }));
                },
                C = async () => {
                  P(!0);
                  try {
                    let e = await y(b);
                    e.success
                      ? d.oR.success(s("saveSuccess"))
                      : d.oR.error(`${s("saveError")} ${e.error || ""}`);
                  } catch (e) {
                    d.oR.error(s("saveError")),
                      console.error("Save settings error:", e);
                  } finally {
                    P(!1);
                  }
                };
              return r || (t && j)
                ? (0, a.jsx)("div", {
                    className: "p-4",
                    children: "Loading...",
                  })
                : t
                  ? (0, a.jsxs)("div", {
                      className: (0, g.cn)(
                        "p-4 md:p-6 lg:p-8 space-y-6",
                        v ? "rtl" : "ltr",
                      ),
                      dir: v ? "rtl" : "ltr",
                      children: [
                        (0, a.jsxs)("div", {
                          className: "mb-6",
                          children: [
                            (0, a.jsx)("h1", {
                              className: "text-2xl md:text-3xl font-bold",
                              children: s("pageTitle"),
                            }),
                            (0, a.jsx)("p", {
                              className: "text-muted-foreground",
                              children: s("description"),
                            }),
                          ],
                        }),
                        (0, a.jsxs)(c.Zp, {
                          children: [
                            (0, a.jsx)(c.aR, {
                              children: (0, a.jsx)(c.ZB, {
                                children: s("generalSection"),
                              }),
                            }),
                            (0, a.jsxs)(c.Wu, {
                              className: "space-y-4",
                              children: [
                                (0, a.jsxs)("div", {
                                  className: "space-y-2",
                                  children: [
                                    (0, a.jsx)(u.J, {
                                      htmlFor: "appName",
                                      children: s("appNameLabel"),
                                    }),
                                    (0, a.jsx)(p.p, {
                                      id: "appName",
                                      value: b.appName || "",
                                      onChange: (e) =>
                                        q("appName", e.target.value),
                                    }),
                                  ],
                                }),
                                (0, a.jsxs)("div", {
                                  className: "space-y-2",
                                  children: [
                                    (0, a.jsx)(u.J, {
                                      htmlFor: "defaultLocale",
                                      children: s("defaultLocaleLabel"),
                                    }),
                                    (0, a.jsxs)(h.l6, {
                                      value: b.defaultLocale || "",
                                      onValueChange: (e) =>
                                        q("defaultLocale", e),
                                      children: [
                                        (0, a.jsx)(h.bq, {
                                          id: "defaultLocale",
                                          children: (0, a.jsx)(h.yv, {
                                            placeholder:
                                              "Select default language",
                                          }),
                                        }),
                                        (0, a.jsx)(h.gC, {
                                          children: f.IB.map((e) =>
                                            (0, a.jsx)(
                                              h.eb,
                                              {
                                                value: e,
                                                children: e.toUpperCase(),
                                              },
                                              e,
                                            ),
                                          ),
                                        }),
                                      ],
                                    }),
                                  ],
                                }),
                              ],
                            }),
                          ],
                        }),
                        (0, a.jsxs)(c.Zp, {
                          children: [
                            (0, a.jsx)(c.aR, {
                              children: (0, a.jsx)(c.ZB, {
                                children: s("appearanceSection"),
                              }),
                            }),
                            (0, a.jsx)(c.Wu, {
                              className: "space-y-4",
                              children: (0, a.jsxs)("div", {
                                className: "space-y-2",
                                children: [
                                  (0, a.jsx)(u.J, {
                                    htmlFor: "theme",
                                    children: s("themeLabel"),
                                  }),
                                  (0, a.jsxs)(h.l6, {
                                    value: b.theme || "system",
                                    onValueChange: (e) => q("theme", e),
                                    children: [
                                      (0, a.jsx)(h.bq, {
                                        id: "theme",
                                        children: (0, a.jsx)(h.yv, {
                                          placeholder: "Select theme",
                                        }),
                                      }),
                                      (0, a.jsxs)(h.gC, {
                                        children: [
                                          (0, a.jsx)(h.eb, {
                                            value: "system",
                                            children: s("themeSystem"),
                                          }),
                                          (0, a.jsx)(h.eb, {
                                            value: "light",
                                            children: s("themeLight"),
                                          }),
                                          (0, a.jsx)(h.eb, {
                                            value: "dark",
                                            children: s("themeDark"),
                                          }),
                                        ],
                                      }),
                                    ],
                                  }),
                                ],
                              }),
                            }),
                          ],
                        }),
                        (0, a.jsxs)(c.Zp, {
                          children: [
                            (0, a.jsx)(c.aR, {
                              children: (0, a.jsx)(c.ZB, {
                                children: s("securitySection"),
                              }),
                            }),
                            (0, a.jsx)(c.Wu, {
                              children: (0, a.jsxs)("div", {
                                className:
                                  "flex items-center justify-between space-x-2",
                                children: [
                                  (0, a.jsx)(u.J, {
                                    htmlFor: "enable2fa",
                                    className: "flex flex-col space-y-1",
                                    children: (0, a.jsx)("span", {
                                      children: s("enable2faLabel"),
                                    }),
                                  }),
                                  (0, a.jsx)(m.d, {
                                    id: "enable2fa",
                                    checked: b.enable2fa || !1,
                                    onCheckedChange: (e) => q("enable2fa", e),
                                  }),
                                ],
                              }),
                            }),
                          ],
                        }),
                        (0, a.jsx)("div", {
                          className: "flex justify-end",
                          children: (0, a.jsx)(l.$, {
                            onClick: C,
                            disabled: k,
                            children: k ? "Saving..." : s("saveButton"),
                          }),
                        }),
                      ],
                    })
                  : null;
            }
            s();
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
            dynamic: () => u,
            generateImageMetadata: () => g,
            generateMetadata: () => f,
            generateViewport: () => v,
            maxDuration: () => h,
            metadata: () => c,
            viewport: () => p,
          });
        var a = r(63033),
          n = r(35242);
        r(93206);
        var o = r(51433),
          i = r(59107),
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
          p = {
            themeColor: [
              { media: "(prefers-color-scheme: light)", color: "white" },
              { media: "(prefers-color-scheme: dark)", color: "#18181b" },
            ],
            width: "device-width",
            initialScale: 1,
          },
          u = "force-dynamic",
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
            let t = { plugins: [] };
            return (0, n.jsxs)(n.Fragment, {
              children: [
                e,
                (0, n.jsx)(i.Analytics, {}),
                (0, n.jsx)(d.SpeedInsights, {}),
                t && (0, n.jsx)(o.StagewiseToolbar, { config: t }),
              ],
            });
          },
          {
            apply: (e, t, r) => {
              let s, a, n;
              try {
                let e = x?.getStore();
                (s = e?.headers.get("sentry-trace") ?? void 0),
                  (a = e?.headers.get("baggage") ?? void 0),
                  (n = e?.headers);
              } catch (e) {}
              return l
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
              n = r(86415),
              o = r(91635);
            r(84205);
            var i = r(15942),
              d = e([i]);
            i = (d.then ? (await d)() : d)[0];
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
            function l({
              className: e,
              variant: t,
              size: r,
              asChild: s = !1,
              ...o
            }) {
              let d = s ? n.DX : "button";
              return (0, a.jsx)(d, {
                "data-slot": "button",
                className: (0, i.cn)(c({ variant: t, size: r, className: e })),
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
      30595: (e, t, r) => {
        "use strict";
        r.d(t, { b: () => i });
        var s = r(84205),
          a = r(56558),
          n = r(61268),
          o = s.forwardRef((e, t) =>
            (0, n.jsx)(a.sG.label, {
              ...e,
              ref: t,
              onMouseDown: (t) => {
                t.target.closest("button, input, select, textarea") ||
                  (e.onMouseDown?.(t),
                  !t.defaultPrevented && t.detail > 1 && t.preventDefault());
              },
            }),
          );
        o.displayName = "Label";
        var i = o;
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
            generateImageMetadata: () => p,
            generateMetadata: () => c,
            generateViewport: () => u,
          });
        var a = r(63033),
          n = r(26394),
          o = r(60442),
          i = (0, n.registerClientReference)(
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
                apply: (e, t, r) => {
                  let s, a, n;
                  try {
                    let e = l?.getStore();
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
                    .apply(t, r);
                },
              })
            : i;
        let c = void 0,
          p = void 0,
          u = void 0,
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
      67155: (e, t, r) => {
        "use strict";
        r.d(t, { Z: () => a });
        var s = r(84205);
        function a(e) {
          let t = s.useRef({ value: e, previous: e });
          return s.useMemo(
            () => (
              t.current.value !== e &&
                ((t.current.previous = t.current.value), (t.current.value = e)),
              t.current.previous
            ),
            [e],
          );
        }
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
      76280: (e, t, r) => {
        "use strict";
        let s;
        r.r(t),
          r.d(t, {
            default: () => h,
            generateImageMetadata: () => p,
            generateMetadata: () => c,
            generateViewport: () => u,
          });
        var a = r(63033),
          n = r(26394),
          o = r(60442),
          i = (0, n.registerClientReference)(
            function () {
              throw Error(
                "Attempted to call the default export of \"E:\\\\downloads\\\\Hijraah\\\\apps\\\\web\\\\src\\\\app\\\\[locale]\\\\admin\\\\settings\\\\page.tsx\" from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
              );
            },
            "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\[locale]\\admin\\settings\\page.tsx",
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
                apply: (e, t, r) => {
                  let s, a, n;
                  try {
                    let e = l?.getStore();
                    (s = e?.headers.get("sentry-trace") ?? void 0),
                      (a = e?.headers.get("baggage") ?? void 0),
                      (n = e?.headers);
                  } catch (e) {}
                  return o
                    .wrapServerComponentWithSentry(e, {
                      componentRoute: "/[locale]/admin/settings",
                      componentType: "Page",
                      sentryTraceHeader: s,
                      baggageHeader: a,
                      headers: n,
                    })
                    .apply(t, r);
                },
              })
            : i;
        let c = void 0,
          p = void 0,
          u = void 0,
          h = s;
      },
      76760: (e) => {
        "use strict";
        e.exports = require("node:path");
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
      84710: (e, t, r) => {
        Promise.resolve().then(r.bind(r, 21246));
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
            r.r(t), r.d(t, { default: () => i });
            var a = r(61268);
            r(86896), r(84205);
            var n = r(28909),
              o = e([n]);
            function i({ error: e, reset: t }) {
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
            (n = (o.then ? (await o)() : o)[0]), s();
          } catch (e) {
            s(e);
          }
        });
      },
      87447: (e, t, r) => {
        "use strict";
        r.a(e, async (e, s) => {
          try {
            r.r(t), r.d(t, { default: () => i });
            var a = r(61268);
            r(84205);
            var n = r(28909),
              o = e([n]);
            function i({ error: e, reset: t }) {
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
            (n = (o.then ? (await o)() : o)[0]), s();
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
      92958: (e, t, r) => {
        Promise.resolve().then(r.bind(r, 76280));
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
      95957: (e, t, r) => {
        "use strict";
        r.a(e, async (e, s) => {
          try {
            r.d(t, {
              bq: () => h,
              eb: () => x,
              gC: () => m,
              l6: () => p,
              yv: () => u,
            });
            var a = r(61268),
              n = r(81242),
              o = r(70753),
              i = r(415),
              d = r(84205),
              l = r(15942),
              c = e([l]);
            l = (c.then ? (await c)() : c)[0];
            let p = n.bL;
            n.YJ;
            let u = n.WT,
              h = d.forwardRef(({ className: e, children: t, ...r }, s) =>
                (0, a.jsxs)(n.l9, {
                  ref: s,
                  className: (0, l.cn)(
                    "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                    e,
                  ),
                  ...r,
                  children: [
                    t,
                    (0, a.jsx)(n.In, {
                      asChild: !0,
                      children: (0, a.jsx)(o.A, {
                        className: "h-4 w-4 opacity-50",
                      }),
                    }),
                  ],
                }),
              );
            h.displayName = n.l9.displayName;
            let m = d.forwardRef(
              (
                { className: e, children: t, position: r = "popper", ...s },
                o,
              ) =>
                (0, a.jsx)(n.ZL, {
                  children: (0, a.jsx)(n.UC, {
                    ref: o,
                    className: (0, l.cn)(
                      "relative z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
                      "popper" === r &&
                        "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
                      e,
                    ),
                    position: r,
                    ...s,
                    children: (0, a.jsx)(n.LM, {
                      className: (0, l.cn)(
                        "p-1",
                        "popper" === r &&
                          "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]",
                      ),
                      children: t,
                    }),
                  }),
                }),
            );
            (m.displayName = n.UC.displayName),
              (d.forwardRef(({ className: e, ...t }, r) =>
                (0, a.jsx)(n.JU, {
                  ref: r,
                  className: (0, l.cn)(
                    "py-1.5 pl-8 pr-2 text-sm font-semibold",
                    e,
                  ),
                  ...t,
                }),
              ).displayName = n.JU.displayName);
            let x = d.forwardRef(({ className: e, children: t, ...r }, s) =>
              (0, a.jsxs)(n.q7, {
                ref: s,
                className: (0, l.cn)(
                  "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
                  e,
                ),
                ...r,
                children: [
                  (0, a.jsx)("span", {
                    className:
                      "absolute left-2 flex h-3.5 w-3.5 items-center justify-center",
                    children: (0, a.jsx)(n.VF, {
                      children: (0, a.jsx)(i.A, { className: "h-4 w-4" }),
                    }),
                  }),
                  (0, a.jsx)(n.p4, { children: t }),
                ],
              }),
            );
            (x.displayName = n.q7.displayName),
              (d.forwardRef(({ className: e, ...t }, r) =>
                (0, a.jsx)(n.wv, {
                  ref: r,
                  className: (0, l.cn)("-mx-1 my-1 h-px bg-muted", e),
                  ...t,
                }),
              ).displayName = n.wv.displayName),
              s();
          } catch (e) {
            s(e);
          }
        });
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
        4763, 7333, 7145, 9207, 6867, 8264, 27, 7935,
      ],
      () => r(21004),
    );
  module.exports = s;
})();
//# sourceMappingURL=page.js.map
