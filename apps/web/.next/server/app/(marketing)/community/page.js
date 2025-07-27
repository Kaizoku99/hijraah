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
    (e._sentryDebugIds[t] = "56fe54c6-5429-4f82-9251-11232fe2ba77"),
    (e._sentryDebugIdIdentifier =
      "sentry-dbid-56fe54c6-5429-4f82-9251-11232fe2ba77"));
} catch (e) {}
(() => {
  var e = {};
  (e.id = 6888),
    (e.ids = [6888]),
    (e.modules = {
      3295: (e) => {
        "use strict";
        e.exports = require("next/dist/server/app-render/after-task-async-storage.external.js");
      },
      3954: (e, t, r) => {
        "use strict";
        e.exports = r(31756).vendored.contexts.HeadManagerContext;
      },
      5451: (e, t, r) => {
        "use strict";
        r.a(e, async (e, s) => {
          try {
            r.d(t, {
              BT: () => f,
              Wu: () => p,
              ZB: () => c,
              Zp: () => u,
              aR: () => d,
              wL: () => m,
            });
            var n = r(61268),
              a = r(55728),
              i = r(84205),
              o = r(15942),
              l = e([o]);
            o = (l.then ? (await l)() : l)[0];
            let u = i.forwardRef(({ className: e, ...t }, r) =>
              (0, n.jsx)(a.P.div, {
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
            u.displayName = "Card";
            let d = i.forwardRef(({ className: e, ...t }, r) =>
              (0, n.jsx)("div", {
                ref: r,
                className: (0, o.cn)("flex flex-col space-y-1.5 p-6", e),
                ...t,
              }),
            );
            d.displayName = "CardHeader";
            let c = i.forwardRef(({ className: e, ...t }, r) =>
              (0, n.jsx)("h3", {
                ref: r,
                className: (0, o.cn)(
                  "text-2xl font-semibold leading-none tracking-tight",
                  e,
                ),
                ...t,
              }),
            );
            c.displayName = "CardTitle";
            let f = i.forwardRef(({ className: e, ...t }, r) =>
              (0, n.jsx)("p", {
                ref: r,
                className: (0, o.cn)("text-sm text-muted-foreground", e),
                ...t,
              }),
            );
            f.displayName = "CardDescription";
            let p = i.forwardRef(({ className: e, ...t }, r) =>
              (0, n.jsx)("div", {
                ref: r,
                className: (0, o.cn)("p-6 pt-0", e),
                ...t,
              }),
            );
            p.displayName = "CardContent";
            let m = i.forwardRef(({ className: e, ...t }, r) =>
              (0, n.jsx)("div", {
                ref: r,
                className: (0, o.cn)("flex items-center p-6 pt-0", e),
                ...t,
              }),
            );
            (m.displayName = "CardFooter"), s();
          } catch (e) {
            s(e);
          }
        });
      },
      7839: (e, t, r) => {
        "use strict";
        r.d(t, { jH: () => a });
        var s = r(84205);
        r(61268);
        var n = s.createContext(void 0);
        function a(e) {
          let t = s.useContext(n);
          return e || t || "ltr";
        }
      },
      8086: (e) => {
        "use strict";
        e.exports = require("module");
      },
      10308: (e, t, r) => {
        "use strict";
        r.d(t, { c: () => n });
        var s = r(84205);
        function n(e) {
          let t = s.useRef(e);
          return (
            s.useEffect(() => {
              t.current = e;
            }),
            s.useMemo(
              () =>
                (...e) =>
                  t.current?.(...e),
              [],
            )
          );
        }
      },
      10846: (e) => {
        "use strict";
        e.exports = require("next/dist/compiled/next-server/app-page.runtime.prod.js");
      },
      13315: (e, t, r) => {
        "use strict";
        r.d(t, { H4: () => k, _V: () => N, bL: () => j });
        var s = r(84205),
          n = r(18047),
          a = r(10308),
          i = r(66130),
          o = r(78593),
          l = r(17764);
        function u() {
          return () => {};
        }
        var d = r(61268),
          c = "Avatar",
          [f, p] = (0, n.A)(c),
          [m, x] = f(c),
          h = s.forwardRef((e, t) => {
            let { __scopeAvatar: r, ...n } = e,
              [a, i] = s.useState("idle");
            return (0, d.jsx)(m, {
              scope: r,
              imageLoadingStatus: a,
              onImageLoadingStatusChange: i,
              children: (0, d.jsx)(o.sG.span, { ...n, ref: t }),
            });
          });
        h.displayName = c;
        var v = "AvatarImage",
          g = s.forwardRef((e, t) => {
            let {
                __scopeAvatar: r,
                src: n,
                onLoadingStatusChange: c = () => {},
                ...f
              } = e,
              p = x(v, r),
              m = (function (e, { referrerPolicy: t, crossOrigin: r }) {
                let n = (0, l.useSyncExternalStore)(
                    u,
                    () => !0,
                    () => !1,
                  ),
                  a = s.useRef(null),
                  o = n
                    ? (a.current || (a.current = new window.Image()), a.current)
                    : null,
                  [d, c] = s.useState(() => w(o, e));
                return (
                  (0, i.N)(() => {
                    c(w(o, e));
                  }, [o, e]),
                  (0, i.N)(() => {
                    let e = (e) => () => {
                      c(e);
                    };
                    if (!o) return;
                    let s = e("loaded"),
                      n = e("error");
                    return (
                      o.addEventListener("load", s),
                      o.addEventListener("error", n),
                      t && (o.referrerPolicy = t),
                      "string" == typeof r && (o.crossOrigin = r),
                      () => {
                        o.removeEventListener("load", s),
                          o.removeEventListener("error", n);
                      }
                    );
                  }, [o, r, t]),
                  d
                );
              })(n, f),
              h = (0, a.c)((e) => {
                c(e), p.onImageLoadingStatusChange(e);
              });
            return (
              (0, i.N)(() => {
                "idle" !== m && h(m);
              }, [m, h]),
              "loaded" === m
                ? (0, d.jsx)(o.sG.img, { ...f, ref: t, src: n })
                : null
            );
          });
        g.displayName = v;
        var b = "AvatarFallback",
          y = s.forwardRef((e, t) => {
            let { __scopeAvatar: r, delayMs: n, ...a } = e,
              i = x(b, r),
              [l, u] = s.useState(void 0 === n);
            return (
              s.useEffect(() => {
                if (void 0 !== n) {
                  let e = window.setTimeout(() => u(!0), n);
                  return () => window.clearTimeout(e);
                }
              }, [n]),
              l && "loaded" !== i.imageLoadingStatus
                ? (0, d.jsx)(o.sG.span, { ...a, ref: t })
                : null
            );
          });
        function w(e, t) {
          return e
            ? t
              ? (e.src !== t && (e.src = t),
                e.complete && e.naturalWidth > 0 ? "loaded" : "loading")
              : "error"
            : "idle";
        }
        y.displayName = b;
        var j = h,
          N = g,
          k = y;
      },
      14711: (e, t, r) => {
        "use strict";
        r.d(t, { A: () => s });
        let s = (0, r(95255).A)("Share2", [
          ["circle", { cx: "18", cy: "5", r: "3", key: "gq8acd" }],
          ["circle", { cx: "6", cy: "12", r: "3", key: "w7nqdw" }],
          ["circle", { cx: "18", cy: "19", r: "3", key: "1xt0gg" }],
          [
            "line",
            {
              x1: "8.59",
              x2: "15.42",
              y1: "13.51",
              y2: "17.49",
              key: "47mynk",
            },
          ],
          [
            "line",
            { x1: "15.41", x2: "8.59", y1: "6.51", y2: "10.49", key: "1n3mei" },
          ],
        ]);
      },
      17764: (e, t, r) => {
        "use strict";
        e.exports = r(42001);
      },
      19121: (e) => {
        "use strict";
        e.exports = require("next/dist/server/app-render/action-async-storage.external.js");
      },
      19604: (e, t, r) => {
        "use strict";
        r.r(t),
          r.d(t, {
            GlobalError: () => a.default,
            __next_app__: () => d,
            pages: () => u,
            routeModule: () => c,
            tree: () => l,
          });
        var s = r(11610),
          n = r(51293),
          a = r(59059),
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
                  "(marketing)",
                  {
                    children: [
                      "community",
                      {
                        children: [
                          "__PAGE__",
                          {},
                          {
                            page: [
                              () => Promise.resolve().then(r.bind(r, 80712)),
                              "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\(marketing)\\community\\page.tsx",
                            ],
                          },
                        ],
                      },
                      {},
                    ],
                  },
                  {
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
          u = [
            "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\(marketing)\\community\\page.tsx",
          ],
          d = { require: r, loadChunk: () => Promise.resolve() },
          c = new s.AppPageRouteModule({
            definition: {
              kind: n.RouteKind.APP_PAGE,
              page: "/(marketing)/community/page",
              pathname: "/community",
              bundlePath: "",
              filename: "",
              appPaths: [],
            },
            userland: { loaderTree: l },
          });
      },
      19771: (e) => {
        "use strict";
        e.exports = require("process");
      },
      21820: (e) => {
        "use strict";
        e.exports = require("os");
      },
      23734: (e, t, r) => {
        "use strict";
        r.a(e, async (e, s) => {
          try {
            r.d(t, { BK: () => f, eu: () => c, q5: () => p });
            var n = r(61268),
              a = r(13315),
              i = r(91635),
              o = r(84205),
              l = r(15942),
              u = e([l]);
            l = (u.then ? (await u)() : u)[0];
            let d = (0, i.F)(
                "relative flex shrink-0 overflow-hidden rounded-full",
                {
                  variants: {
                    size: { sm: "h-8 w-8", md: "h-10 w-10", lg: "h-12 w-12" },
                  },
                  defaultVariants: { size: "md" },
                },
              ),
              c = o.forwardRef(({ className: e, size: t, ...r }, s) =>
                (0, n.jsx)(a.bL, {
                  ref: s,
                  className: (0, l.cn)(d({ size: t }), e),
                  ...r,
                }),
              );
            c.displayName = a.bL.displayName;
            let f = o.forwardRef(({ className: e, ...t }, r) =>
              (0, n.jsx)(a._V, {
                ref: r,
                className: (0, l.cn)("aspect-square h-full w-full", e),
                ...t,
              }),
            );
            f.displayName = a._V.displayName;
            let p = o.forwardRef(({ className: e, ...t }, r) =>
              (0, n.jsx)(a.H4, {
                ref: r,
                className: (0, l.cn)(
                  "flex h-full w-full items-center justify-center rounded-full bg-muted",
                  e,
                ),
                ...t,
              }),
            );
            (p.displayName = a.H4.displayName), s();
          } catch (e) {
            s(e);
          }
        });
      },
      27011: (e, t, r) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          Object.defineProperty(t, "useMergedRef", {
            enumerable: !0,
            get: function () {
              return n;
            },
          });
        let s = r(84205);
        function n(e, t) {
          let r = (0, s.useRef)(null),
            n = (0, s.useRef)(null);
          return (0, s.useCallback)(
            (s) => {
              if (null === s) {
                let e = r.current;
                e && ((r.current = null), e());
                let t = n.current;
                t && ((n.current = null), t());
              } else e && (r.current = a(e, s)), t && (n.current = a(t, s));
            },
            [e, t],
          );
        }
        function a(e, t) {
          if ("function" != typeof e)
            return (
              (e.current = t),
              () => {
                e.current = null;
              }
            );
          {
            let r = e(t);
            return "function" == typeof r ? r : () => e(null);
          }
        }
        ("function" == typeof t.default ||
          ("object" == typeof t.default && null !== t.default)) &&
          void 0 === t.default.__esModule &&
          (Object.defineProperty(t.default, "__esModule", { value: !0 }),
          Object.assign(t.default, t),
          (e.exports = t.default));
      },
      28354: (e) => {
        "use strict";
        e.exports = require("util");
      },
      28366: (e, t, r) => {
        "use strict";
        r.d(t, { B8: () => _, UC: () => P, bL: () => C, l9: () => R });
        var s = r(84205),
          n = r(28777),
          a = r(18047),
          i = r(59150),
          o = r(94653),
          l = r(78593),
          u = r(7839),
          d = r(48705),
          c = r(42414),
          f = r(61268),
          p = "Tabs",
          [m, x] = (0, a.A)(p, [i.RG]),
          h = (0, i.RG)(),
          [v, g] = m(p),
          b = s.forwardRef((e, t) => {
            let {
                __scopeTabs: r,
                value: s,
                onValueChange: n,
                defaultValue: a,
                orientation: i = "horizontal",
                dir: o,
                activationMode: m = "automatic",
                ...x
              } = e,
              h = (0, u.jH)(o),
              [g, b] = (0, d.i)({
                prop: s,
                onChange: n,
                defaultProp: a ?? "",
                caller: p,
              });
            return (0, f.jsx)(v, {
              scope: r,
              baseId: (0, c.B)(),
              value: g,
              onValueChange: b,
              orientation: i,
              dir: h,
              activationMode: m,
              children: (0, f.jsx)(l.sG.div, {
                dir: h,
                "data-orientation": i,
                ...x,
                ref: t,
              }),
            });
          });
        b.displayName = p;
        var y = "TabsList",
          w = s.forwardRef((e, t) => {
            let { __scopeTabs: r, loop: s = !0, ...n } = e,
              a = g(y, r),
              o = h(r);
            return (0, f.jsx)(i.bL, {
              asChild: !0,
              ...o,
              orientation: a.orientation,
              dir: a.dir,
              loop: s,
              children: (0, f.jsx)(l.sG.div, {
                role: "tablist",
                "aria-orientation": a.orientation,
                ...n,
                ref: t,
              }),
            });
          });
        w.displayName = y;
        var j = "TabsTrigger",
          N = s.forwardRef((e, t) => {
            let { __scopeTabs: r, value: s, disabled: a = !1, ...o } = e,
              u = g(j, r),
              d = h(r),
              c = q(u.baseId, s),
              p = A(u.baseId, s),
              m = s === u.value;
            return (0, f.jsx)(i.q7, {
              asChild: !0,
              ...d,
              focusable: !a,
              active: m,
              children: (0, f.jsx)(l.sG.button, {
                type: "button",
                role: "tab",
                "aria-selected": m,
                "aria-controls": p,
                "data-state": m ? "active" : "inactive",
                "data-disabled": a ? "" : void 0,
                disabled: a,
                id: c,
                ...o,
                ref: t,
                onMouseDown: (0, n.m)(e.onMouseDown, (e) => {
                  a || 0 !== e.button || !1 !== e.ctrlKey
                    ? e.preventDefault()
                    : u.onValueChange(s);
                }),
                onKeyDown: (0, n.m)(e.onKeyDown, (e) => {
                  [" ", "Enter"].includes(e.key) && u.onValueChange(s);
                }),
                onFocus: (0, n.m)(e.onFocus, () => {
                  let e = "manual" !== u.activationMode;
                  m || a || !e || u.onValueChange(s);
                }),
              }),
            });
          });
        N.displayName = j;
        var k = "TabsContent",
          S = s.forwardRef((e, t) => {
            let {
                __scopeTabs: r,
                value: n,
                forceMount: a,
                children: i,
                ...u
              } = e,
              d = g(k, r),
              c = q(d.baseId, n),
              p = A(d.baseId, n),
              m = n === d.value,
              x = s.useRef(m);
            return (
              s.useEffect(() => {
                let e = requestAnimationFrame(() => (x.current = !1));
                return () => cancelAnimationFrame(e);
              }, []),
              (0, f.jsx)(o.C, {
                present: a || m,
                children: ({ present: r }) =>
                  (0, f.jsx)(l.sG.div, {
                    "data-state": m ? "active" : "inactive",
                    "data-orientation": d.orientation,
                    role: "tabpanel",
                    "aria-labelledby": c,
                    hidden: !r,
                    id: p,
                    tabIndex: 0,
                    ...u,
                    ref: t,
                    style: {
                      ...e.style,
                      animationDuration: x.current ? "0s" : void 0,
                    },
                    children: r && i,
                  }),
              })
            );
          });
        function q(e, t) {
          return `${e}-trigger-${t}`;
        }
        function A(e, t) {
          return `${e}-content-${t}`;
        }
        S.displayName = k;
        var C = b,
          _ = w,
          R = N,
          P = S;
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
      42001: (e, t, r) => {
        "use strict";
        var s = r(84205),
          n =
            "function" == typeof Object.is
              ? Object.is
              : function (e, t) {
                  return (
                    (e === t && (0 !== e || 1 / e == 1 / t)) ||
                    (e != e && t != t)
                  );
                },
          a = s.useState,
          i = s.useEffect,
          o = s.useLayoutEffect,
          l = s.useDebugValue;
        function u(e) {
          var t = e.getSnapshot;
          e = e.value;
          try {
            var r = t();
            return !n(e, r);
          } catch (e) {
            return !0;
          }
        }
        var d =
          "undefined" == typeof window ||
          void 0 === window.document ||
          void 0 === window.document.createElement
            ? function (e, t) {
                return t();
              }
            : function (e, t) {
                var r = t(),
                  s = a({ inst: { value: r, getSnapshot: t } }),
                  n = s[0].inst,
                  d = s[1];
                return (
                  o(
                    function () {
                      (n.value = r),
                        (n.getSnapshot = t),
                        u(n) && d({ inst: n });
                    },
                    [e, r, t],
                  ),
                  i(
                    function () {
                      return (
                        u(n) && d({ inst: n }),
                        e(function () {
                          u(n) && d({ inst: n });
                        })
                      );
                    },
                    [e],
                  ),
                  l(r),
                  r
                );
              };
        t.useSyncExternalStore =
          void 0 !== s.useSyncExternalStore ? s.useSyncExternalStore : d;
      },
      42414: (e, t, r) => {
        "use strict";
        r.d(t, { B: () => l });
        var s,
          n = r(84205),
          a = r(66130),
          i =
            (s || (s = r.t(n, 2)))[" useId ".trim().toString()] ||
            (() => void 0),
          o = 0;
        function l(e) {
          let [t, r] = n.useState(i());
          return (
            (0, a.N)(() => {
              e || r((e) => e ?? String(o++));
            }, [e]),
            e || (t ? `radix-${t}` : "")
          );
        }
      },
      44708: (e) => {
        "use strict";
        e.exports = require("node:https");
      },
      46756: (e, t, r) => {
        Promise.resolve().then(r.bind(r, 95977));
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
      57075: (e) => {
        "use strict";
        e.exports = require("node:stream");
      },
      57975: (e) => {
        "use strict";
        e.exports = require("node:util");
      },
      59150: (e, t, r) => {
        "use strict";
        r.d(t, { RG: () => w, bL: () => R, q7: () => P });
        var s = r(84205),
          n = r(28777),
          a = r(28029),
          i = r(71604),
          o = r(18047),
          l = r(42414),
          u = r(78593),
          d = r(10308),
          c = r(48705),
          f = r(7839),
          p = r(61268),
          m = "rovingFocusGroup.onEntryFocus",
          x = { bubbles: !1, cancelable: !0 },
          h = "RovingFocusGroup",
          [v, g, b] = (0, a.N)(h),
          [y, w] = (0, o.A)(h, [b]),
          [j, N] = y(h),
          k = s.forwardRef((e, t) =>
            (0, p.jsx)(v.Provider, {
              scope: e.__scopeRovingFocusGroup,
              children: (0, p.jsx)(v.Slot, {
                scope: e.__scopeRovingFocusGroup,
                children: (0, p.jsx)(S, { ...e, ref: t }),
              }),
            }),
          );
        k.displayName = h;
        var S = s.forwardRef((e, t) => {
            let {
                __scopeRovingFocusGroup: r,
                orientation: a,
                loop: o = !1,
                dir: l,
                currentTabStopId: v,
                defaultCurrentTabStopId: b,
                onCurrentTabStopIdChange: y,
                onEntryFocus: w,
                preventScrollOnEntryFocus: N = !1,
                ...k
              } = e,
              S = s.useRef(null),
              q = (0, i.s)(t, S),
              A = (0, f.jH)(l),
              [C, R] = (0, c.i)({
                prop: v,
                defaultProp: b ?? null,
                onChange: y,
                caller: h,
              }),
              [P, T] = s.useState(!1),
              E = (0, d.c)(w),
              I = g(r),
              L = s.useRef(!1),
              [D, M] = s.useState(0);
            return (
              s.useEffect(() => {
                let e = S.current;
                if (e)
                  return (
                    e.addEventListener(m, E), () => e.removeEventListener(m, E)
                  );
              }, [E]),
              (0, p.jsx)(j, {
                scope: r,
                orientation: a,
                dir: A,
                loop: o,
                currentTabStopId: C,
                onItemFocus: s.useCallback((e) => R(e), [R]),
                onItemShiftTab: s.useCallback(() => T(!0), []),
                onFocusableItemAdd: s.useCallback(() => M((e) => e + 1), []),
                onFocusableItemRemove: s.useCallback(() => M((e) => e - 1), []),
                children: (0, p.jsx)(u.sG.div, {
                  tabIndex: P || 0 === D ? -1 : 0,
                  "data-orientation": a,
                  ...k,
                  ref: q,
                  style: { outline: "none", ...e.style },
                  onMouseDown: (0, n.m)(e.onMouseDown, () => {
                    L.current = !0;
                  }),
                  onFocus: (0, n.m)(e.onFocus, (e) => {
                    let t = !L.current;
                    if (e.target === e.currentTarget && t && !P) {
                      let t = new CustomEvent(m, x);
                      if (
                        (e.currentTarget.dispatchEvent(t), !t.defaultPrevented)
                      ) {
                        let e = I().filter((e) => e.focusable);
                        _(
                          [
                            e.find((e) => e.active),
                            e.find((e) => e.id === C),
                            ...e,
                          ]
                            .filter(Boolean)
                            .map((e) => e.ref.current),
                          N,
                        );
                      }
                    }
                    L.current = !1;
                  }),
                  onBlur: (0, n.m)(e.onBlur, () => T(!1)),
                }),
              })
            );
          }),
          q = "RovingFocusGroupItem",
          A = s.forwardRef((e, t) => {
            let {
                __scopeRovingFocusGroup: r,
                focusable: a = !0,
                active: i = !1,
                tabStopId: o,
                children: d,
                ...c
              } = e,
              f = (0, l.B)(),
              m = o || f,
              x = N(q, r),
              h = x.currentTabStopId === m,
              b = g(r),
              {
                onFocusableItemAdd: y,
                onFocusableItemRemove: w,
                currentTabStopId: j,
              } = x;
            return (
              s.useEffect(() => {
                if (a) return y(), () => w();
              }, [a, y, w]),
              (0, p.jsx)(v.ItemSlot, {
                scope: r,
                id: m,
                focusable: a,
                active: i,
                children: (0, p.jsx)(u.sG.span, {
                  tabIndex: h ? 0 : -1,
                  "data-orientation": x.orientation,
                  ...c,
                  ref: t,
                  onMouseDown: (0, n.m)(e.onMouseDown, (e) => {
                    a ? x.onItemFocus(m) : e.preventDefault();
                  }),
                  onFocus: (0, n.m)(e.onFocus, () => x.onItemFocus(m)),
                  onKeyDown: (0, n.m)(e.onKeyDown, (e) => {
                    if ("Tab" === e.key && e.shiftKey)
                      return void x.onItemShiftTab();
                    if (e.target !== e.currentTarget) return;
                    let t = (function (e, t, r) {
                      var s;
                      let n =
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
                          ["ArrowLeft", "ArrowRight"].includes(n)
                        ) &&
                        !(
                          "horizontal" === t &&
                          ["ArrowUp", "ArrowDown"].includes(n)
                        )
                      )
                        return C[n];
                    })(e, x.orientation, x.dir);
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
                        r = x.loop
                          ? (function (e, t) {
                              return e.map((r, s) => e[(t + s) % e.length]);
                            })(r, s + 1)
                          : r.slice(s + 1);
                      }
                      setTimeout(() => _(r));
                    }
                  }),
                  children:
                    "function" == typeof d
                      ? d({ isCurrentTabStop: h, hasTabStop: null != j })
                      : d,
                }),
              })
            );
          });
        A.displayName = q;
        var C = {
          ArrowLeft: "prev",
          ArrowUp: "prev",
          ArrowRight: "next",
          ArrowDown: "next",
          PageUp: "first",
          Home: "first",
          PageDown: "last",
          End: "last",
        };
        function _(e, t = !1) {
          let r = document.activeElement;
          for (let s of e)
            if (
              s === r ||
              (s.focus({ preventScroll: t }), document.activeElement !== r)
            )
              return;
        }
        var R = k,
          P = A;
      },
      63033: (e) => {
        "use strict";
        e.exports = require("next/dist/server/app-render/work-unit-async-storage.external.js");
      },
      65316: (e, t, r) => {
        Promise.resolve().then(r.bind(r, 80712));
      },
      69394: (e, t, r) => {
        "use strict";
        r.d(t, { A: () => s });
        let s = (0, r(95255).A)("ThumbsUp", [
          ["path", { d: "M7 10v12", key: "1qc93n" }],
          [
            "path",
            {
              d: "M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z",
              key: "y3tblf",
            },
          ],
        ]);
      },
      71507: (e, t, r) => {
        "use strict";
        r.d(t, { default: () => n.a });
        var s = r(82860),
          n = r.n(s);
      },
      73024: (e) => {
        "use strict";
        e.exports = require("node:fs");
      },
      73566: (e) => {
        "use strict";
        e.exports = require("worker_threads");
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
              TabsContent: () => c,
              TabsList: () => u,
              TabsTrigger: () => d,
            });
            var n = r(61268),
              a = r(28366);
            r(84205);
            var i = r(15942),
              o = e([i]);
            function l({ className: e, ...t }) {
              return (0, n.jsx)(a.bL, {
                "data-slot": "tabs",
                className: (0, i.cn)("flex flex-col gap-2", e),
                ...t,
              });
            }
            function u({ className: e, ...t }) {
              return (0, n.jsx)(a.B8, {
                "data-slot": "tabs-list",
                className: (0, i.cn)(
                  "bg-muted text-muted-foreground inline-flex h-9 w-fit items-center justify-center rounded-lg p-[3px]",
                  e,
                ),
                ...t,
              });
            }
            function d({ className: e, ...t }) {
              return (0, n.jsx)(a.l9, {
                "data-slot": "tabs-trigger",
                className: (0, i.cn)(
                  "data-[state=active]:bg-background dark:data-[state=active]:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:outline-ring dark:data-[state=active]:border-input dark:data-[state=active]:bg-input/30 text-foreground dark:text-muted-foreground inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-md border border-transparent px-2 py-1 text-sm font-medium whitespace-nowrap transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:shadow-sm [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
                  e,
                ),
                ...t,
              });
            }
            function c({ className: e, ...t }) {
              return (0, n.jsx)(a.UC, {
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
      77598: (e) => {
        "use strict";
        e.exports = require("node:crypto");
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
      80712: (e, t, r) => {
        "use strict";
        let s;
        r.r(t),
          r.d(t, {
            default: () => p,
            generateImageMetadata: () => c,
            generateMetadata: () => d,
            generateViewport: () => f,
          });
        var n = r(63033),
          a = r(26394),
          i = r(60442),
          o = (0, a.registerClientReference)(
            function () {
              throw Error(
                "Attempted to call the default export of \"E:\\\\downloads\\\\Hijraah\\\\apps\\\\web\\\\src\\\\app\\\\(marketing)\\\\community\\\\page.tsx\" from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
              );
            },
            "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\(marketing)\\community\\page.tsx",
            "default",
          );
        let l = { ...n },
          u =
            "workUnitAsyncStorage" in l
              ? l.workUnitAsyncStorage
              : "requestAsyncStorage" in l
                ? l.requestAsyncStorage
                : void 0;
        s =
          "function" == typeof o
            ? new Proxy(o, {
                apply: (e, t, r) => {
                  let s, n, a;
                  try {
                    let e = u?.getStore();
                    (s = e?.headers.get("sentry-trace") ?? void 0),
                      (n = e?.headers.get("baggage") ?? void 0),
                      (a = e?.headers);
                  } catch (e) {}
                  return i
                    .wrapServerComponentWithSentry(e, {
                      componentRoute: "/(marketing)/community",
                      componentType: "Page",
                      sentryTraceHeader: s,
                      baggageHeader: n,
                      headers: a,
                    })
                    .apply(t, r);
                },
              })
            : o;
        let d = void 0,
          c = void 0,
          f = void 0,
          p = s;
      },
      82860: (e, t, r) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          !(function (e, t) {
            for (var r in t)
              Object.defineProperty(e, r, { enumerable: !0, get: t[r] });
          })(t, {
            default: function () {
              return l;
            },
            getImageProps: function () {
              return o;
            },
          });
        let s = r(17380),
          n = r(92566),
          a = r(37018),
          i = s._(r(29576));
        function o(e) {
          let { props: t } = (0, n.getImgProps)(e, {
            defaultLoader: i.default,
            imgConf: {
              deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
              imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
              path: "/_next/image",
              loader: "default",
              dangerouslyAllowSVG: !1,
              unoptimized: !1,
            },
          });
          for (let [e, r] of Object.entries(t)) void 0 === r && delete t[e];
          return { props: t };
        }
        let l = a.Image;
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
      92206: (e, t, r) => {
        "use strict";
        r.d(t, { A: () => s });
        let s = (0, r(95255).A)("MessageSquare", [
          [
            "path",
            {
              d: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z",
              key: "1lielz",
            },
          ],
        ]);
      },
      94735: (e) => {
        "use strict";
        e.exports = require("events");
      },
      95255: (e, t, r) => {
        "use strict";
        r.d(t, { A: () => i });
        var s = r(84205),
          n = {
            xmlns: "http://www.w3.org/2000/svg",
            width: 24,
            height: 24,
            viewBox: "0 0 24 24",
            fill: "none",
            stroke: "currentColor",
            strokeWidth: 2,
            strokeLinecap: "round",
            strokeLinejoin: "round",
          };
        let a = (e) =>
            e
              .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
              .toLowerCase()
              .trim(),
          i = (e, t) => {
            let r = (0, s.forwardRef)(
              (
                {
                  color: r = "currentColor",
                  size: i = 24,
                  strokeWidth: o = 2,
                  absoluteStrokeWidth: l,
                  className: u = "",
                  children: d,
                  ...c
                },
                f,
              ) =>
                (0, s.createElement)(
                  "svg",
                  {
                    ref: f,
                    ...n,
                    width: i,
                    height: i,
                    stroke: r,
                    strokeWidth: l ? (24 * Number(o)) / Number(i) : o,
                    className: ["lucide", `lucide-${a(e)}`, u].join(" "),
                    ...c,
                  },
                  [
                    ...t.map(([e, t]) => (0, s.createElement)(e, t)),
                    ...(Array.isArray(d) ? d : [d]),
                  ],
                ),
            );
            return (r.displayName = `${e}`), r;
          };
      },
      95977: (e, t, r) => {
        "use strict";
        r.a(e, async (e, s) => {
          try {
            r.r(t), r.d(t, { default: () => x });
            var n = r(61268),
              a = r(69394),
              i = r(92206),
              o = r(14711),
              l = r(71507),
              u = r(84205),
              d = r(23734),
              c = r(28909),
              f = r(5451),
              p = r(77001),
              m = e([d, c, f, p]);
            [d, c, f, p] = m.then ? (await m)() : m;
            let h = [
              {
                id: 1,
                author: {
                  name: "John Doe",
                  image:
                    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
                },
                title: "My Immigration Success Story",
                content: "After 2 years of hard work and dedication...",
                likes: 42,
                comments: 12,
                category: "success-stories",
              },
            ];
            function x() {
              let [e, t] = (0, u.useState)("all");
              return (0, n.jsxs)("div", {
                className: "container py-8",
                children: [
                  (0, n.jsxs)("div", {
                    className: "flex justify-between items-center mb-8",
                    children: [
                      (0, n.jsxs)("div", {
                        children: [
                          (0, n.jsx)("h1", {
                            className: "text-3xl font-bold",
                            children: "Community",
                          }),
                          (0, n.jsx)("p", {
                            className: "text-muted-foreground",
                            children:
                              "Connect with others on their immigration journey",
                          }),
                        ],
                      }),
                      (0, n.jsx)(c.$, { children: "Create Post" }),
                    ],
                  }),
                  (0, n.jsxs)("div", {
                    className: "grid md:grid-cols-3 gap-6",
                    children: [
                      (0, n.jsx)("div", {
                        className: "md:col-span-2",
                        children: (0, n.jsxs)(p.Tabs, {
                          defaultValue: "all",
                          className: "mb-6",
                          children: [
                            (0, n.jsxs)(p.TabsList, {
                              children: [
                                (0, n.jsx)(p.TabsTrigger, {
                                  value: "all",
                                  children: "All Posts",
                                }),
                                (0, n.jsx)(p.TabsTrigger, {
                                  value: "success-stories",
                                  children: "Success Stories",
                                }),
                                (0, n.jsx)(p.TabsTrigger, {
                                  value: "questions",
                                  children: "Questions",
                                }),
                                (0, n.jsx)(p.TabsTrigger, {
                                  value: "resources",
                                  children: "Resources",
                                }),
                              ],
                            }),
                            (0, n.jsx)(p.TabsContent, {
                              value: "all",
                              className: "space-y-4",
                              children: h.map((e) =>
                                (0, n.jsx)(
                                  f.Zp,
                                  {
                                    className: "p-6",
                                    children: (0, n.jsxs)("div", {
                                      className: "flex items-start gap-4",
                                      children: [
                                        (0, n.jsx)(d.eu, {
                                          children: (0, n.jsx)(l.default, {
                                            src: e.author.image,
                                            alt: e.author.name,
                                            width: 40,
                                            height: 40,
                                            className: "rounded-full",
                                          }),
                                        }),
                                        (0, n.jsxs)("div", {
                                          className: "flex-1",
                                          children: [
                                            (0, n.jsx)("div", {
                                              className:
                                                "flex justify-between items-start",
                                              children: (0, n.jsxs)("div", {
                                                children: [
                                                  (0, n.jsx)("h3", {
                                                    className: "font-semibold",
                                                    children: e.title,
                                                  }),
                                                  (0, n.jsxs)("p", {
                                                    className:
                                                      "text-sm text-muted-foreground",
                                                    children: [
                                                      "Posted by ",
                                                      e.author.name,
                                                    ],
                                                  }),
                                                ],
                                              }),
                                            }),
                                            (0, n.jsx)("p", {
                                              className: "mt-2",
                                              children: e.content,
                                            }),
                                            (0, n.jsxs)("div", {
                                              className: "mt-4 flex gap-4",
                                              children: [
                                                (0, n.jsxs)(c.$, {
                                                  variant: "ghost",
                                                  size: "sm",
                                                  children: [
                                                    (0, n.jsx)(a.A, {
                                                      className: "w-4 h-4 mr-2",
                                                    }),
                                                    e.likes,
                                                  ],
                                                }),
                                                (0, n.jsxs)(c.$, {
                                                  variant: "ghost",
                                                  size: "sm",
                                                  children: [
                                                    (0, n.jsx)(i.A, {
                                                      className: "w-4 h-4 mr-2",
                                                    }),
                                                    e.comments,
                                                  ],
                                                }),
                                                (0, n.jsxs)(c.$, {
                                                  variant: "ghost",
                                                  size: "sm",
                                                  children: [
                                                    (0, n.jsx)(o.A, {
                                                      className: "w-4 h-4 mr-2",
                                                    }),
                                                    "Share",
                                                  ],
                                                }),
                                              ],
                                            }),
                                          ],
                                        }),
                                      ],
                                    }),
                                  },
                                  e.id,
                                ),
                              ),
                            }),
                          ],
                        }),
                      }),
                      (0, n.jsxs)("div", {
                        className: "space-y-6",
                        children: [
                          (0, n.jsxs)(f.Zp, {
                            className: "p-6",
                            children: [
                              (0, n.jsx)("h3", {
                                className: "font-semibold mb-4",
                                children: "Popular Topics",
                              }),
                              (0, n.jsxs)("div", {
                                className: "space-y-2",
                                children: [
                                  (0, n.jsx)(c.$, {
                                    variant: "outline",
                                    className: "w-full justify-start",
                                    children: "#VisaApplication",
                                  }),
                                  (0, n.jsx)(c.$, {
                                    variant: "outline",
                                    className: "w-full justify-start",
                                    children: "#StudyAbroad",
                                  }),
                                  (0, n.jsx)(c.$, {
                                    variant: "outline",
                                    className: "w-full justify-start",
                                    children: "#WorkPermit",
                                  }),
                                ],
                              }),
                            ],
                          }),
                          (0, n.jsxs)(f.Zp, {
                            className: "p-6",
                            children: [
                              (0, n.jsx)("h3", {
                                className: "font-semibold mb-4",
                                children: "Community Guidelines",
                              }),
                              (0, n.jsxs)("ul", {
                                className:
                                  "space-y-2 text-sm text-muted-foreground",
                                children: [
                                  (0, n.jsx)("li", {
                                    children: "Be respectful and supportive",
                                  }),
                                  (0, n.jsx)("li", {
                                    children: "Share accurate information",
                                  }),
                                  (0, n.jsx)("li", {
                                    children: "Protect personal information",
                                  }),
                                  (0, n.jsx)("li", {
                                    children: "No spam or self-promotion",
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
              });
            }
            s();
          } catch (e) {
            s(e);
          }
        });
      },
    });
  var t = require("../../../webpack-runtime.js");
  t.C(e);
  var r = (e) => t((t.s = e)),
    s = t.X(0, [827, 6518, 2033, 4027, 8859, 8029, 5728, 7018, 4630], () =>
      r(19604),
    );
  module.exports = s;
})();
//# sourceMappingURL=page.js.map
