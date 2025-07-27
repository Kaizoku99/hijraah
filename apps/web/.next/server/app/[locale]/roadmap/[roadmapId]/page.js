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
    (e._sentryDebugIds[r] = "3fc1e45d-3c77-4949-bfe0-2ed4e1687314"),
    (e._sentryDebugIdIdentifier =
      "sentry-dbid-3fc1e45d-3c77-4949-bfe0-2ed4e1687314"));
} catch (e) {}
(() => {
  var e = {};
  (e.id = 3116),
    (e.ids = [1603, 3116, 4630]),
    (e.modules = {
      3295: (e) => {
        "use strict";
        e.exports = require("next/dist/server/app-render/after-task-async-storage.external.js");
      },
      5451: (e, r, t) => {
        "use strict";
        t.a(e, async (e, a) => {
          try {
            t.d(r, {
              BT: () => u,
              Wu: () => h,
              ZB: () => p,
              Zp: () => l,
              aR: () => c,
              wL: () => m,
            });
            var o = t(61268),
              s = t(55728),
              n = t(84205),
              i = t(15942),
              d = e([i]);
            i = (d.then ? (await d)() : d)[0];
            let l = n.forwardRef(({ className: e, ...r }, t) =>
              (0, o.jsx)(s.P.div, {
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
              (0, o.jsx)("div", {
                ref: t,
                className: (0, i.cn)("flex flex-col space-y-1.5 p-6", e),
                ...r,
              }),
            );
            c.displayName = "CardHeader";
            let p = n.forwardRef(({ className: e, ...r }, t) =>
              (0, o.jsx)("h3", {
                ref: t,
                className: (0, i.cn)(
                  "text-2xl font-semibold leading-none tracking-tight",
                  e,
                ),
                ...r,
              }),
            );
            p.displayName = "CardTitle";
            let u = n.forwardRef(({ className: e, ...r }, t) =>
              (0, o.jsx)("p", {
                ref: t,
                className: (0, i.cn)("text-sm text-muted-foreground", e),
                ...r,
              }),
            );
            u.displayName = "CardDescription";
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
            (m.displayName = "CardFooter"), a();
          } catch (e) {
            a(e);
          }
        });
      },
      7839: (e, r, t) => {
        "use strict";
        t.d(r, { jH: () => s });
        var a = t(84205);
        t(61268);
        var o = a.createContext(void 0);
        function s(e) {
          let r = a.useContext(o);
          return e || r || "ltr";
        }
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
      11603: (e, r, t) => {
        "use strict";
        t.a(e, async (e, a) => {
          try {
            t.d(r, { $m: () => u, As: () => p, nD: () => c, ub: () => h });
            var o = t(61268),
              s = t(84205),
              n = t(42817),
              i = t(70753),
              d = t(15942),
              l = e([d]);
            d = (l.then ? (await l)() : l)[0];
            let c = n.bL,
              p = s.forwardRef(({ className: e, ...r }, t) =>
                (0, o.jsx)(n.q7, {
                  ref: t,
                  className: (0, d.cn)("border-b", e),
                  ...r,
                }),
              );
            p.displayName = "AccordionItem";
            let u = s.forwardRef(({ className: e, children: r, ...t }, a) =>
              (0, o.jsx)(n.Y9, {
                className: "flex",
                children: (0, o.jsxs)(n.l9, {
                  ref: a,
                  className: (0, d.cn)(
                    "flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180",
                    e,
                  ),
                  ...t,
                  children: [
                    r,
                    (0, o.jsx)(i.A, {
                      className:
                        "h-4 w-4 shrink-0 transition-transform duration-200",
                    }),
                  ],
                }),
              }),
            );
            u.displayName = n.l9.displayName;
            let h = s.forwardRef(({ className: e, children: r, ...t }, a) =>
              (0, o.jsx)(n.UC, {
                ref: a,
                className:
                  "overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",
                ...t,
                children: (0, o.jsx)("div", {
                  className: (0, d.cn)("pb-4 pt-0", e),
                  children: r,
                }),
              }),
            );
            (h.displayName = n.UC.displayName), a();
          } catch (e) {
            a(e);
          }
        });
      },
      11997: (e) => {
        "use strict";
        e.exports = require("punycode");
      },
      15942: (e, r, t) => {
        "use strict";
        t.a(e, async (e, a) => {
          try {
            t.d(r, {
              Cq: () => c,
              GO: () => u,
              cn: () => d,
              lk: () => l,
              y8: () => p,
            });
            var o = t(85488);
            t(3477);
            var s = t(79029),
              n = t(58360),
              i = e([o]);
            function d(...e) {
              return (0, n.QP)((0, s.$)(e));
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
            o = (i.then ? (await i)() : i)[0];
            let u = async (e) => {
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
            function p(e) {
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
            a();
          } catch (e) {
            a(e);
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
        let a;
        t.r(r),
          t.d(r, {
            default: () => b,
            dynamic: () => u,
            generateImageMetadata: () => g,
            generateMetadata: () => x,
            generateViewport: () => v,
            maxDuration: () => h,
            metadata: () => c,
            viewport: () => p,
          });
        var o = t(63033),
          s = t(35242);
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
          m = { ...o },
          f =
            "workUnitAsyncStorage" in m
              ? m.workUnitAsyncStorage
              : "requestAsyncStorage" in m
                ? m.requestAsyncStorage
                : void 0;
        a = new Proxy(
          function ({ children: e }) {
            let r = { plugins: [] };
            return (0, s.jsxs)(s.Fragment, {
              children: [
                e,
                (0, s.jsx)(i.Analytics, {}),
                (0, s.jsx)(d.SpeedInsights, {}),
                r && (0, s.jsx)(n.StagewiseToolbar, { config: r }),
              ],
            });
          },
          {
            apply: (e, r, t) => {
              let a, o, s;
              try {
                let e = f?.getStore();
                (a = e?.headers.get("sentry-trace") ?? void 0),
                  (o = e?.headers.get("baggage") ?? void 0),
                  (s = e?.headers);
              } catch (e) {}
              return l
                .wrapServerComponentWithSentry(e, {
                  componentRoute: "/",
                  componentType: "Layout",
                  sentryTraceHeader: a,
                  baggageHeader: o,
                  headers: s,
                })
                .apply(r, t);
            },
          },
        );
        let x = void 0,
          g = void 0,
          v = void 0,
          b = a;
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
        t.a(e, async (e, a) => {
          try {
            t.d(r, { $: () => l, r: () => c });
            var o = t(61268),
              s = t(86415),
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
              asChild: a = !1,
              ...n
            }) {
              let d = a ? s.DX : "button";
              return (0, o.jsx)(d, {
                "data-slot": "button",
                className: (0, i.cn)(c({ variant: r, size: t, className: e })),
                ...n,
              });
            }
            a();
          } catch (e) {
            a(e);
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
      33719: (e, r, t) => {
        "use strict";
        let a;
        t.r(r),
          t.d(r, {
            default: () => h,
            generateImageMetadata: () => p,
            generateMetadata: () => c,
            generateViewport: () => u,
          });
        var o = t(63033),
          s = t(26394),
          n = t(60442),
          i = (0, s.registerClientReference)(
            function () {
              throw Error(
                "Attempted to call the default export of \"E:\\\\downloads\\\\Hijraah\\\\apps\\\\web\\\\src\\\\app\\\\[locale]\\\\roadmap\\\\[roadmapId]\\\\page.tsx\" from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
              );
            },
            "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\[locale]\\roadmap\\[roadmapId]\\page.tsx",
            "default",
          );
        let d = { ...o },
          l =
            "workUnitAsyncStorage" in d
              ? d.workUnitAsyncStorage
              : "requestAsyncStorage" in d
                ? d.requestAsyncStorage
                : void 0;
        a =
          "function" == typeof i
            ? new Proxy(i, {
                apply: (e, r, t) => {
                  let a, o, s;
                  try {
                    let e = l?.getStore();
                    (a = e?.headers.get("sentry-trace") ?? void 0),
                      (o = e?.headers.get("baggage") ?? void 0),
                      (s = e?.headers);
                  } catch (e) {}
                  return n
                    .wrapServerComponentWithSentry(e, {
                      componentRoute: "/[locale]/roadmap/[roadmapId]",
                      componentType: "Page",
                      sentryTraceHeader: a,
                      baggageHeader: o,
                      headers: s,
                    })
                    .apply(r, t);
                },
              })
            : i;
        let c = void 0,
          p = void 0,
          u = void 0,
          h = a;
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
      42817: (e, r, t) => {
        "use strict";
        t.d(r, {
          UC: () => en,
          Y9: () => eo,
          q7: () => ea,
          bL: () => et,
          l9: () => es,
        });
        var a = t(84205),
          o = t(18047),
          s = t(28029),
          n = t(71604),
          i = t(28777),
          d = t(48705),
          l = t(78593),
          c = t(66130),
          p = t(94653),
          u = t(42414),
          h = t(61268),
          m = "Collapsible",
          [f, x] = (0, o.A)(m),
          [g, v] = f(m),
          b = a.forwardRef((e, r) => {
            let {
                __scopeCollapsible: t,
                open: o,
                defaultOpen: s,
                disabled: n,
                onOpenChange: i,
                ...c
              } = e,
              [p, f] = (0, d.i)({
                prop: o,
                defaultProp: s ?? !1,
                onChange: i,
                caller: m,
              });
            return (0, h.jsx)(g, {
              scope: t,
              disabled: n,
              contentId: (0, u.B)(),
              open: p,
              onOpenToggle: a.useCallback(() => f((e) => !e), [f]),
              children: (0, h.jsx)(l.sG.div, {
                "data-state": P(p),
                "data-disabled": n ? "" : void 0,
                ...c,
                ref: r,
              }),
            });
          });
        b.displayName = m;
        var y = "CollapsibleTrigger",
          w = a.forwardRef((e, r) => {
            let { __scopeCollapsible: t, ...a } = e,
              o = v(y, t);
            return (0, h.jsx)(l.sG.button, {
              type: "button",
              "aria-controls": o.contentId,
              "aria-expanded": o.open || !1,
              "data-state": P(o.open),
              "data-disabled": o.disabled ? "" : void 0,
              disabled: o.disabled,
              ...a,
              ref: r,
              onClick: (0, i.m)(e.onClick, o.onOpenToggle),
            });
          });
        w.displayName = y;
        var j = "CollapsibleContent",
          N = a.forwardRef((e, r) => {
            let { forceMount: t, ...a } = e,
              o = v(j, e.__scopeCollapsible);
            return (0, h.jsx)(p.C, {
              present: t || o.open,
              children: ({ present: e }) =>
                (0, h.jsx)(C, { ...a, ref: r, present: e }),
            });
          });
        N.displayName = j;
        var C = a.forwardRef((e, r) => {
          let { __scopeCollapsible: t, present: o, children: s, ...i } = e,
            d = v(j, t),
            [p, u] = a.useState(o),
            m = a.useRef(null),
            f = (0, n.s)(r, m),
            x = a.useRef(0),
            g = x.current,
            b = a.useRef(0),
            y = b.current,
            w = d.open || p,
            N = a.useRef(w),
            C = a.useRef(void 0);
          return (
            a.useEffect(() => {
              let e = requestAnimationFrame(() => (N.current = !1));
              return () => cancelAnimationFrame(e);
            }, []),
            (0, c.N)(() => {
              let e = m.current;
              if (e) {
                (C.current = C.current || {
                  transitionDuration: e.style.transitionDuration,
                  animationName: e.style.animationName,
                }),
                  (e.style.transitionDuration = "0s"),
                  (e.style.animationName = "none");
                let r = e.getBoundingClientRect();
                (x.current = r.height),
                  (b.current = r.width),
                  N.current ||
                    ((e.style.transitionDuration =
                      C.current.transitionDuration),
                    (e.style.animationName = C.current.animationName)),
                  u(o);
              }
            }, [d.open, o]),
            (0, h.jsx)(l.sG.div, {
              "data-state": P(d.open),
              "data-disabled": d.disabled ? "" : void 0,
              id: d.contentId,
              hidden: !w,
              ...i,
              ref: f,
              style: {
                "--radix-collapsible-content-height": g ? `${g}px` : void 0,
                "--radix-collapsible-content-width": y ? `${y}px` : void 0,
                ...e.style,
              },
              children: w && s,
            })
          );
        });
        function P(e) {
          return e ? "open" : "closed";
        }
        var _ = t(7839),
          k = "Accordion",
          q = [
            "Home",
            "End",
            "ArrowDown",
            "ArrowUp",
            "ArrowLeft",
            "ArrowRight",
          ],
          [A, I, R] = (0, s.N)(k),
          [E, D] = (0, o.A)(k, [R, x]),
          H = x(),
          S = a.forwardRef((e, r) => {
            let { type: t, ...a } = e;
            return (0, h.jsx)(A.Provider, {
              scope: e.__scopeAccordion,
              children:
                "multiple" === t
                  ? (0, h.jsx)(F, { ...a, ref: r })
                  : (0, h.jsx)(Y, { ...a, ref: r }),
            });
          });
        S.displayName = k;
        var [M, U] = E(k),
          [T, O] = E(k, { collapsible: !1 }),
          Y = a.forwardRef((e, r) => {
            let {
                value: t,
                defaultValue: o,
                onValueChange: s = () => {},
                collapsible: n = !1,
                ...i
              } = e,
              [l, c] = (0, d.i)({
                prop: t,
                defaultProp: o ?? "",
                onChange: s,
                caller: k,
              });
            return (0, h.jsx)(M, {
              scope: e.__scopeAccordion,
              value: a.useMemo(() => (l ? [l] : []), [l]),
              onItemOpen: c,
              onItemClose: a.useCallback(() => n && c(""), [n, c]),
              children: (0, h.jsx)(T, {
                scope: e.__scopeAccordion,
                collapsible: n,
                children: (0, h.jsx)(B, { ...i, ref: r }),
              }),
            });
          }),
          F = a.forwardRef((e, r) => {
            let {
                value: t,
                defaultValue: o,
                onValueChange: s = () => {},
                ...n
              } = e,
              [i, l] = (0, d.i)({
                prop: t,
                defaultProp: o ?? [],
                onChange: s,
                caller: k,
              }),
              c = a.useCallback((e) => l((r = []) => [...r, e]), [l]),
              p = a.useCallback(
                (e) => l((r = []) => r.filter((r) => r !== e)),
                [l],
              );
            return (0, h.jsx)(M, {
              scope: e.__scopeAccordion,
              value: i,
              onItemOpen: c,
              onItemClose: p,
              children: (0, h.jsx)(T, {
                scope: e.__scopeAccordion,
                collapsible: !0,
                children: (0, h.jsx)(B, { ...n, ref: r }),
              }),
            });
          }),
          [L, G] = E(k),
          B = a.forwardRef((e, r) => {
            let {
                __scopeAccordion: t,
                disabled: o,
                dir: s,
                orientation: d = "vertical",
                ...c
              } = e,
              p = a.useRef(null),
              u = (0, n.s)(p, r),
              m = I(t),
              f = "ltr" === (0, _.jH)(s),
              x = (0, i.m)(e.onKeyDown, (e) => {
                if (!q.includes(e.key)) return;
                let r = e.target,
                  t = m().filter((e) => !e.ref.current?.disabled),
                  a = t.findIndex((e) => e.ref.current === r),
                  o = t.length;
                if (-1 === a) return;
                e.preventDefault();
                let s = a,
                  n = o - 1,
                  i = () => {
                    (s = a + 1) > n && (s = 0);
                  },
                  l = () => {
                    (s = a - 1) < 0 && (s = n);
                  };
                switch (e.key) {
                  case "Home":
                    s = 0;
                    break;
                  case "End":
                    s = n;
                    break;
                  case "ArrowRight":
                    "horizontal" === d && (f ? i() : l());
                    break;
                  case "ArrowDown":
                    "vertical" === d && i();
                    break;
                  case "ArrowLeft":
                    "horizontal" === d && (f ? l() : i());
                    break;
                  case "ArrowUp":
                    "vertical" === d && l();
                }
                let c = s % o;
                t[c].ref.current?.focus();
              });
            return (0, h.jsx)(L, {
              scope: t,
              disabled: o,
              direction: s,
              orientation: d,
              children: (0, h.jsx)(A.Slot, {
                scope: t,
                children: (0, h.jsx)(l.sG.div, {
                  ...c,
                  "data-orientation": d,
                  ref: u,
                  onKeyDown: o ? void 0 : x,
                }),
              }),
            });
          }),
          z = "AccordionItem",
          [$, V] = E(z),
          K = a.forwardRef((e, r) => {
            let { __scopeAccordion: t, value: a, ...o } = e,
              s = G(z, t),
              n = U(z, t),
              i = H(t),
              d = (0, u.B)(),
              l = (a && n.value.includes(a)) || !1,
              c = s.disabled || e.disabled;
            return (0, h.jsx)($, {
              scope: t,
              open: l,
              disabled: c,
              triggerId: d,
              children: (0, h.jsx)(b, {
                "data-orientation": s.orientation,
                "data-state": er(l),
                ...i,
                ...o,
                ref: r,
                disabled: c,
                open: l,
                onOpenChange: (e) => {
                  e ? n.onItemOpen(a) : n.onItemClose(a);
                },
              }),
            });
          });
        K.displayName = z;
        var W = "AccordionHeader",
          X = a.forwardRef((e, r) => {
            let { __scopeAccordion: t, ...a } = e,
              o = G(k, t),
              s = V(W, t);
            return (0, h.jsx)(l.sG.h3, {
              "data-orientation": o.orientation,
              "data-state": er(s.open),
              "data-disabled": s.disabled ? "" : void 0,
              ...a,
              ref: r,
            });
          });
        X.displayName = W;
        var Z = "AccordionTrigger",
          J = a.forwardRef((e, r) => {
            let { __scopeAccordion: t, ...a } = e,
              o = G(k, t),
              s = V(Z, t),
              n = O(Z, t),
              i = H(t);
            return (0, h.jsx)(A.ItemSlot, {
              scope: t,
              children: (0, h.jsx)(w, {
                "aria-disabled": (s.open && !n.collapsible) || void 0,
                "data-orientation": o.orientation,
                id: s.triggerId,
                ...i,
                ...a,
                ref: r,
              }),
            });
          });
        J.displayName = Z;
        var Q = "AccordionContent",
          ee = a.forwardRef((e, r) => {
            let { __scopeAccordion: t, ...a } = e,
              o = G(k, t),
              s = V(Q, t),
              n = H(t);
            return (0, h.jsx)(N, {
              role: "region",
              "aria-labelledby": s.triggerId,
              "data-orientation": o.orientation,
              ...n,
              ...a,
              ref: r,
              style: {
                "--radix-accordion-content-height":
                  "var(--radix-collapsible-content-height)",
                "--radix-accordion-content-width":
                  "var(--radix-collapsible-content-width)",
                ...e.style,
              },
            });
          });
        function er(e) {
          return e ? "open" : "closed";
        }
        ee.displayName = Q;
        var et = S,
          ea = K,
          eo = X,
          es = J,
          en = ee;
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
        let a;
        t.r(r),
          t.d(r, {
            default: () => h,
            generateImageMetadata: () => p,
            generateMetadata: () => c,
            generateViewport: () => u,
          });
        var o = t(63033),
          s = t(26394),
          n = t(60442),
          i = (0, s.registerClientReference)(
            function () {
              throw Error(
                "Attempted to call the default export of \"E:\\\\downloads\\\\Hijraah\\\\apps\\\\web\\\\src\\\\app\\\\not-found.tsx\" from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
              );
            },
            "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\not-found.tsx",
            "default",
          );
        let d = { ...o },
          l =
            "workUnitAsyncStorage" in d
              ? d.workUnitAsyncStorage
              : "requestAsyncStorage" in d
                ? d.requestAsyncStorage
                : void 0;
        a =
          "function" == typeof i
            ? new Proxy(i, {
                apply: (e, r, t) => {
                  let a, o, s;
                  try {
                    let e = l?.getStore();
                    (a = e?.headers.get("sentry-trace") ?? void 0),
                      (o = e?.headers.get("baggage") ?? void 0),
                      (s = e?.headers);
                  } catch (e) {}
                  return n
                    .wrapServerComponentWithSentry(e, {
                      componentRoute: "/",
                      componentType: "Not-found",
                      sentryTraceHeader: a,
                      baggageHeader: o,
                      headers: s,
                    })
                    .apply(r, t);
                },
              })
            : i;
        let c = void 0,
          p = void 0,
          u = void 0,
          h = a;
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
        t.r(r), t.d(r, { default: () => s });
        var a = t(61268),
          o = t(89882);
        function s() {
          return (
            (0, o.useRouter)(),
            (0, a.jsxs)("div", {
              className:
                "flex flex-col items-center justify-center min-h-screen py-2",
              children: [
                (0, a.jsx)("h1", {
                  className: "text-4xl font-bold",
                  children: "Page Not Found",
                }),
                (0, a.jsx)("p", {
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
          IB: () => a,
          V8: () => i,
          XG: () => n,
          o0: () => s,
          q: () => o,
        });
        let a = ["en", "ar", "es", "fr"],
          o = "en",
          s = {
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
          return s[e] || s[o];
        }
        function i(e) {
          return "rtl" === n(e).direction;
        }
      },
      59059: (e, r, t) => {
        "use strict";
        t.r(r), t.d(r, { default: () => a });
        let a = (0, t(26394).registerClientReference)(
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
      62217: (e, r, t) => {
        Promise.resolve().then(t.bind(t, 97753));
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
        t.a(e, async (e, a) => {
          try {
            t.r(r), t.d(r, { default: () => i });
            var o = t(61268);
            t(86896), t(84205);
            var s = t(28909),
              n = e([s]);
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
                          (0, o.jsx)(s.$, {
                            onClick: () => r(),
                            children: "Try again",
                          }),
                          (0, o.jsx)(s.$, {
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
            (s = (n.then ? (await n)() : n)[0]), a();
          } catch (e) {
            a(e);
          }
        });
      },
      87447: (e, r, t) => {
        "use strict";
        t.a(e, async (e, a) => {
          try {
            t.r(r), t.d(r, { default: () => i });
            var o = t(61268);
            t(84205);
            var s = t(28909),
              n = e([s]);
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
                    (0, o.jsx)(s.$, {
                      onClick: () => r(),
                      variant: "outline",
                      children: "Try again",
                    }),
                  ],
                }),
              });
            }
            (s = (n.then ? (await n)() : n)[0]), a();
          } catch (e) {
            a(e);
          }
        });
      },
      88868: (e, r, t) => {
        "use strict";
        t.r(r),
          t.d(r, {
            GlobalError: () => s.default,
            __next_app__: () => c,
            pages: () => l,
            routeModule: () => p,
            tree: () => d,
          });
        var a = t(11610),
          o = t(51293),
          s = t(59059),
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
                      "roadmap",
                      {
                        children: [
                          "[roadmapId]",
                          {
                            children: [
                              "__PAGE__",
                              {},
                              {
                                page: [
                                  () =>
                                    Promise.resolve().then(t.bind(t, 33719)),
                                  "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\[locale]\\roadmap\\[roadmapId]\\page.tsx",
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
          l = [
            "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\[locale]\\roadmap\\[roadmapId]\\page.tsx",
          ],
          c = { require: t, loadChunk: () => Promise.resolve() },
          p = new a.AppPageRouteModule({
            definition: {
              kind: o.RouteKind.APP_PAGE,
              page: "/[locale]/roadmap/[roadmapId]/page",
              pathname: "/[locale]/roadmap/[roadmapId]",
              bundlePath: "",
              filename: "",
              appPaths: [],
            },
            userland: { loaderTree: d },
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
        t.r(r), t.d(r, { default: () => a });
        let a = (0, t(26394).registerClientReference)(
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
      97065: (e, r, t) => {
        Promise.resolve().then(t.bind(t, 33719));
      },
      97753: (e, r, t) => {
        "use strict";
        t.a(e, async (e, a) => {
          try {
            t.r(r), t.d(r, { default: () => h });
            var o = t(61268),
              s = t(95124),
              n = t(18476),
              i = t(94812),
              d = t(79366),
              l = t(58702),
              c = t(3519),
              p = t(15942),
              u = e([n, i, p]);
            function h({ params: e }) {
              let r = (0, s.useTranslations)("roadmap"),
                t = (0, d.p)(),
                a = (0, l.V8)(t),
                { user: u, isLoading: h } = (0, c.useAuth)(),
                { roadmapId: m } = e;
              return h
                ? (0, o.jsxs)("div", {
                    className: "p-8 space-y-4",
                    children: [
                      (0, o.jsx)(i.E, { className: "h-8 w-1/4" }),
                      (0, o.jsx)(i.E, { className: "h-4 w-1/2" }),
                      (0, o.jsx)(i.E, { className: "h-64 w-full" }),
                    ],
                  })
                : u
                  ? m
                    ? (0, o.jsxs)("div", {
                        className: (0, p.cn)(
                          "p-4 md:p-6 lg:p-8",
                          a ? "rtl" : "ltr",
                        ),
                        dir: a ? "rtl" : "ltr",
                        children: [
                          (0, o.jsxs)("div", {
                            className: "mb-6",
                            children: [
                              (0, o.jsx)("h1", {
                                className: "text-2xl md:text-3xl font-bold",
                                children: r("pageTitle"),
                              }),
                              (0, o.jsx)("p", {
                                className: "text-muted-foreground",
                                children: r("description"),
                              }),
                            ],
                          }),
                          (0, o.jsx)(n.A, { userId: u.id, roadmapId: m }),
                        ],
                      })
                    : (console.error(
                        "RoadmapPage: roadmapId is missing from URL params.",
                      ),
                      (0, o.jsx)("div", {
                        className: "p-8",
                        children: "Error: Roadmap ID not specified.",
                      }))
                  : (console.error("RoadmapPage: User is not authenticated."),
                    (0, o.jsx)("div", {
                      className: "p-8",
                      children:
                        "Access Denied: Please log in to view this page.",
                    }));
            }
            ([n, i, p] = u.then ? (await u)() : u), a();
          } catch (e) {
            a(e);
          }
        });
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
    a = r.X(
      0,
      [
        827, 6518, 2033, 4027, 2872, 7713, 5149, 8859, 1655, 8029, 5728, 9729,
        3390, 4990, 6188, 7911, 7401, 5124, 7272, 3042, 385, 7393, 4486, 7018,
        4763, 7333, 7145, 9207, 6867, 1578, 8264, 27, 7935, 8476,
      ],
      () => t(88868),
    );
  module.exports = a;
})();
//# sourceMappingURL=page.js.map
