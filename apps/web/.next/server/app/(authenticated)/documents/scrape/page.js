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
    (e._sentryDebugIds[t] = "b3ccf59e-b94f-4bd8-b475-9d57d6162e9d"),
    (e._sentryDebugIdIdentifier =
      "sentry-dbid-b3ccf59e-b94f-4bd8-b475-9d57d6162e9d"));
} catch (e) {}
(() => {
  var e = {};
  (e.id = 8291),
    (e.ids = [8291]),
    (e.modules = {
      278: (e, t, r) => {
        "use strict";
        r.d(t, { bL: () => j, zi: () => N });
        var s = r(84205),
          a = r(28777),
          i = r(71604),
          n = r(18047),
          o = r(48705),
          l = r(67155),
          c = r(91557),
          d = r(78593),
          u = r(61268),
          m = "Switch",
          [p, f] = (0, n.A)(m),
          [h, x] = p(m),
          v = s.forwardRef((e, t) => {
            let {
                __scopeSwitch: r,
                name: n,
                checked: l,
                defaultChecked: c,
                required: p,
                disabled: f,
                value: x = "on",
                onCheckedChange: v,
                form: g,
                ...b
              } = e,
              [j, N] = s.useState(null),
              k = (0, i.s)(t, (e) => N(e)),
              S = s.useRef(!1),
              A = !j || g || !!j.closest("form"),
              [T, C] = (0, o.i)({
                prop: l,
                defaultProp: c ?? !1,
                onChange: v,
                caller: m,
              });
            return (0, u.jsxs)(h, {
              scope: r,
              checked: T,
              disabled: f,
              children: [
                (0, u.jsx)(d.sG.button, {
                  type: "button",
                  role: "switch",
                  "aria-checked": T,
                  "aria-required": p,
                  "data-state": w(T),
                  "data-disabled": f ? "" : void 0,
                  disabled: f,
                  value: x,
                  ...b,
                  ref: k,
                  onClick: (0, a.m)(e.onClick, (e) => {
                    C((e) => !e),
                      A &&
                        ((S.current = e.isPropagationStopped()),
                        S.current || e.stopPropagation());
                  }),
                }),
                A &&
                  (0, u.jsx)(y, {
                    control: j,
                    bubbles: !S.current,
                    name: n,
                    value: x,
                    checked: T,
                    required: p,
                    disabled: f,
                    form: g,
                    style: { transform: "translateX(-100%)" },
                  }),
              ],
            });
          });
        v.displayName = m;
        var g = "SwitchThumb",
          b = s.forwardRef((e, t) => {
            let { __scopeSwitch: r, ...s } = e,
              a = x(g, r);
            return (0, u.jsx)(d.sG.span, {
              "data-state": w(a.checked),
              "data-disabled": a.disabled ? "" : void 0,
              ...s,
              ref: t,
            });
          });
        b.displayName = g;
        var y = s.forwardRef(
          (
            { __scopeSwitch: e, control: t, checked: r, bubbles: a = !0, ...n },
            o,
          ) => {
            let d = s.useRef(null),
              m = (0, i.s)(d, o),
              p = (0, l.Z)(r),
              f = (0, c.X)(t);
            return (
              s.useEffect(() => {
                let e = d.current;
                if (!e) return;
                let t = Object.getOwnPropertyDescriptor(
                  window.HTMLInputElement.prototype,
                  "checked",
                ).set;
                if (p !== r && t) {
                  let s = new Event("click", { bubbles: a });
                  t.call(e, r), e.dispatchEvent(s);
                }
              }, [p, r, a]),
              (0, u.jsx)("input", {
                type: "checkbox",
                "aria-hidden": !0,
                defaultChecked: r,
                ...n,
                tabIndex: -1,
                ref: m,
                style: {
                  ...n.style,
                  ...f,
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
        var j = v,
          N = b;
      },
      1628: (e, t, r) => {
        "use strict";
        r.r(t),
          r.d(t, {
            GlobalError: () => i.default,
            __next_app__: () => d,
            pages: () => c,
            routeModule: () => u,
            tree: () => l,
          });
        var s = r(11610),
          a = r(51293),
          i = r(59059),
          n = r(17770),
          o = {};
        for (let e in n)
          0 >
            [
              "default",
              "tree",
              "pages",
              "GlobalError",
              "__next_app__",
              "routeModule",
            ].indexOf(e) && (o[e] = () => n[e]);
        r.d(t, o);
        let l = {
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
                          "scrape",
                          {
                            children: [
                              "__PAGE__",
                              {},
                              {
                                page: [
                                  () =>
                                    Promise.resolve().then(r.bind(r, 41220)),
                                  "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\(authenticated)\\documents\\scrape\\page.tsx",
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
          c = [
            "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\(authenticated)\\documents\\scrape\\page.tsx",
          ],
          d = { require: r, loadChunk: () => Promise.resolve() },
          u = new s.AppPageRouteModule({
            definition: {
              kind: a.RouteKind.APP_PAGE,
              page: "/(authenticated)/documents/scrape/page",
              pathname: "/documents/scrape",
              bundlePath: "",
              filename: "",
              appPaths: [],
            },
            userland: { loaderTree: l },
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
              BT: () => m,
              Wu: () => p,
              ZB: () => u,
              Zp: () => c,
              aR: () => d,
              wL: () => f,
            });
            var a = r(61268),
              i = r(55728),
              n = r(84205),
              o = r(15942),
              l = e([o]);
            o = (l.then ? (await l)() : l)[0];
            let c = n.forwardRef(({ className: e, ...t }, r) =>
              (0, a.jsx)(i.P.div, {
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
            c.displayName = "Card";
            let d = n.forwardRef(({ className: e, ...t }, r) =>
              (0, a.jsx)("div", {
                ref: r,
                className: (0, o.cn)("flex flex-col space-y-1.5 p-6", e),
                ...t,
              }),
            );
            d.displayName = "CardHeader";
            let u = n.forwardRef(({ className: e, ...t }, r) =>
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
            let m = n.forwardRef(({ className: e, ...t }, r) =>
              (0, a.jsx)("p", {
                ref: r,
                className: (0, o.cn)("text-sm text-muted-foreground", e),
                ...t,
              }),
            );
            m.displayName = "CardDescription";
            let p = n.forwardRef(({ className: e, ...t }, r) =>
              (0, a.jsx)("div", {
                ref: r,
                className: (0, o.cn)("p-6 pt-0", e),
                ...t,
              }),
            );
            p.displayName = "CardContent";
            let f = n.forwardRef(({ className: e, ...t }, r) =>
              (0, a.jsx)("div", {
                ref: r,
                className: (0, o.cn)("flex items-center p-6 pt-0", e),
                ...t,
              }),
            );
            (f.displayName = "CardFooter"), s();
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
      10308: (e, t, r) => {
        "use strict";
        r.d(t, { c: () => a });
        var s = r(84205);
        function a(e) {
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
      11997: (e) => {
        "use strict";
        e.exports = require("punycode");
      },
      13909: (e, t, r) => {
        "use strict";
        r.a(e, async (e, s) => {
          try {
            r.d(t, { d: () => c });
            var a = r(61268),
              i = r(278),
              n = r(84205),
              o = r(15942),
              l = e([o]);
            o = (l.then ? (await l)() : l)[0];
            let c = n.forwardRef(({ className: e, ...t }, r) =>
              (0, a.jsx)(i.bL, {
                className: (0, o.cn)(
                  "peer inline-flex h-[24px] w-[44px] shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input",
                  e,
                ),
                ...t,
                ref: r,
                children: (0, a.jsx)(i.zi, {
                  className: (0, o.cn)(
                    "pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0",
                  ),
                }),
              }),
            );
            (c.displayName = i.bL.displayName), s();
          } catch (e) {
            s(e);
          }
        });
      },
      15090: (e, t, r) => {
        "use strict";
        r.d(t, { d: () => m });
        var s = r(84205);
        let a = {
            ADD_TOAST: "ADD_TOAST",
            UPDATE_TOAST: "UPDATE_TOAST",
            DISMISS_TOAST: "DISMISS_TOAST",
            REMOVE_TOAST: "REMOVE_TOAST",
          },
          i = 0,
          n = new Map(),
          o = (e, t) => {
            switch (t.type) {
              case a.ADD_TOAST:
                return { ...e, toasts: [t.toast, ...e.toasts].slice(0, 5) };
              case a.UPDATE_TOAST:
                return {
                  ...e,
                  toasts: e.toasts.map((e) =>
                    e.id === t.toast.id ? { ...e, ...t.toast } : e,
                  ),
                };
              case a.DISMISS_TOAST: {
                let { toastId: r } = t;
                if (r) n.has(r) && (clearTimeout(n.get(r)), n.delete(r));
                else
                  for (let [e, t] of n.entries()) clearTimeout(t), n.delete(e);
                return {
                  ...e,
                  toasts: e.toasts.map((e) =>
                    e.id === r || void 0 === r ? { ...e, open: !1 } : e,
                  ),
                };
              }
              case a.REMOVE_TOAST:
                if (void 0 === t.toastId) return { ...e, toasts: [] };
                return {
                  ...e,
                  toasts: e.toasts.filter((e) => e.id !== t.toastId),
                };
            }
          },
          l = [],
          c = { toasts: [] };
        function d(e) {
          (c = o(c, e)),
            l.forEach((e) => {
              e(c);
            });
        }
        function u({ ...e }) {
          let t = (i = (i + 1) % Number.MAX_VALUE).toString(),
            r = () => d({ type: a.DISMISS_TOAST, toastId: t });
          return (
            d({
              type: a.ADD_TOAST,
              toast: {
                ...e,
                id: t,
                open: !0,
                onOpenChange: (e) => {
                  e || r();
                },
              },
            }),
            {
              id: t,
              dismiss: r,
              update: (e) =>
                d({ type: a.UPDATE_TOAST, toast: { ...e, id: t } }),
            }
          );
        }
        function m() {
          let [e, t] = s.useState(c);
          return (
            s.useEffect(
              () => (
                l.push(t),
                () => {
                  let e = l.indexOf(t);
                  e > -1 && l.splice(e, 1);
                }
              ),
              [e],
            ),
            {
              ...e,
              toast: u,
              dismiss: (e) => d({ type: a.DISMISS_TOAST, toastId: e }),
            }
          );
        }
      },
      15668: (e) => {
        function t(e) {
          var t = Error("Cannot find module '" + e + "'");
          throw ((t.code = "MODULE_NOT_FOUND"), t);
        }
        (t.keys = () => []), (t.resolve = t), (t.id = 15668), (e.exports = t);
      },
      16851: (e, t, r) => {
        "use strict";
        r.d(t, { A: () => s });
        let s = (0, r(95255).A)("Brain", [
          [
            "path",
            {
              d: "M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z",
              key: "l5xja",
            },
          ],
          [
            "path",
            {
              d: "M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z",
              key: "ep3f8r",
            },
          ],
          [
            "path",
            { d: "M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4", key: "1p4c4q" },
          ],
          ["path", { d: "M17.599 6.5a3 3 0 0 0 .399-1.375", key: "tmeiqw" }],
          ["path", { d: "M6.003 5.125A3 3 0 0 0 6.401 6.5", key: "105sqy" }],
          ["path", { d: "M3.477 10.896a4 4 0 0 1 .585-.396", key: "ql3yin" }],
          ["path", { d: "M19.938 10.5a4 4 0 0 1 .585.396", key: "1qfode" }],
          ["path", { d: "M6 18a4 4 0 0 1-1.967-.516", key: "2e4loj" }],
          ["path", { d: "M19.967 17.484A4 4 0 0 1 18 18", key: "159ez6" }],
        ]);
      },
      16979: (e, t, r) => {
        "use strict";
        r.a(e, async (e, s) => {
          try {
            r.d(t, { J: () => l });
            var a = r(61268),
              i = r(30595);
            r(84205);
            var n = r(15942),
              o = e([n]);
            function l({ className: e, ...t }) {
              return (0, a.jsx)(i.b, {
                "data-slot": "label",
                className: (0, n.cn)(
                  "flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
                  e,
                ),
                ...t,
              });
            }
            (n = (o.then ? (await o)() : o)[0]), s();
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
      27910: (e) => {
        "use strict";
        e.exports = require("stream");
      },
      28354: (e) => {
        "use strict";
        e.exports = require("util");
      },
      28366: (e, t, r) => {
        "use strict";
        r.d(t, { B8: () => I, UC: () => E, bL: () => C, l9: () => _ });
        var s = r(84205),
          a = r(28777),
          i = r(18047),
          n = r(59150),
          o = r(94653),
          l = r(78593),
          c = r(7839),
          d = r(48705),
          u = r(42414),
          m = r(61268),
          p = "Tabs",
          [f, h] = (0, i.A)(p, [n.RG]),
          x = (0, n.RG)(),
          [v, g] = f(p),
          b = s.forwardRef((e, t) => {
            let {
                __scopeTabs: r,
                value: s,
                onValueChange: a,
                defaultValue: i,
                orientation: n = "horizontal",
                dir: o,
                activationMode: f = "automatic",
                ...h
              } = e,
              x = (0, c.jH)(o),
              [g, b] = (0, d.i)({
                prop: s,
                onChange: a,
                defaultProp: i ?? "",
                caller: p,
              });
            return (0, m.jsx)(v, {
              scope: r,
              baseId: (0, u.B)(),
              value: g,
              onValueChange: b,
              orientation: n,
              dir: x,
              activationMode: f,
              children: (0, m.jsx)(l.sG.div, {
                dir: x,
                "data-orientation": n,
                ...h,
                ref: t,
              }),
            });
          });
        b.displayName = p;
        var y = "TabsList",
          w = s.forwardRef((e, t) => {
            let { __scopeTabs: r, loop: s = !0, ...a } = e,
              i = g(y, r),
              o = x(r);
            return (0, m.jsx)(n.bL, {
              asChild: !0,
              ...o,
              orientation: i.orientation,
              dir: i.dir,
              loop: s,
              children: (0, m.jsx)(l.sG.div, {
                role: "tablist",
                "aria-orientation": i.orientation,
                ...a,
                ref: t,
              }),
            });
          });
        w.displayName = y;
        var j = "TabsTrigger",
          N = s.forwardRef((e, t) => {
            let { __scopeTabs: r, value: s, disabled: i = !1, ...o } = e,
              c = g(j, r),
              d = x(r),
              u = A(c.baseId, s),
              p = T(c.baseId, s),
              f = s === c.value;
            return (0, m.jsx)(n.q7, {
              asChild: !0,
              ...d,
              focusable: !i,
              active: f,
              children: (0, m.jsx)(l.sG.button, {
                type: "button",
                role: "tab",
                "aria-selected": f,
                "aria-controls": p,
                "data-state": f ? "active" : "inactive",
                "data-disabled": i ? "" : void 0,
                disabled: i,
                id: u,
                ...o,
                ref: t,
                onMouseDown: (0, a.m)(e.onMouseDown, (e) => {
                  i || 0 !== e.button || !1 !== e.ctrlKey
                    ? e.preventDefault()
                    : c.onValueChange(s);
                }),
                onKeyDown: (0, a.m)(e.onKeyDown, (e) => {
                  [" ", "Enter"].includes(e.key) && c.onValueChange(s);
                }),
                onFocus: (0, a.m)(e.onFocus, () => {
                  let e = "manual" !== c.activationMode;
                  f || i || !e || c.onValueChange(s);
                }),
              }),
            });
          });
        N.displayName = j;
        var k = "TabsContent",
          S = s.forwardRef((e, t) => {
            let {
                __scopeTabs: r,
                value: a,
                forceMount: i,
                children: n,
                ...c
              } = e,
              d = g(k, r),
              u = A(d.baseId, a),
              p = T(d.baseId, a),
              f = a === d.value,
              h = s.useRef(f);
            return (
              s.useEffect(() => {
                let e = requestAnimationFrame(() => (h.current = !1));
                return () => cancelAnimationFrame(e);
              }, []),
              (0, m.jsx)(o.C, {
                present: i || f,
                children: ({ present: r }) =>
                  (0, m.jsx)(l.sG.div, {
                    "data-state": f ? "active" : "inactive",
                    "data-orientation": d.orientation,
                    role: "tabpanel",
                    "aria-labelledby": u,
                    hidden: !r,
                    id: p,
                    tabIndex: 0,
                    ...c,
                    ref: t,
                    style: {
                      ...e.style,
                      animationDuration: h.current ? "0s" : void 0,
                    },
                    children: r && n,
                  }),
              })
            );
          });
        function A(e, t) {
          return `${e}-trigger-${t}`;
        }
        function T(e, t) {
          return `${e}-content-${t}`;
        }
        S.displayName = k;
        var C = b,
          I = w,
          _ = N,
          E = S;
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
        r.d(t, { AG: () => v, Iw: () => h, UU: () => x });
        var a = r(97713),
          i = r(15149),
          n = r.n(i),
          o = r(84205);
        let { fetch: l } = n()(),
          c = "http://localhost:54321",
          d =
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0",
          u = process.env.SUPABASE_SERVICE_ROLE_KEY,
          m = d ? { apikey: d } : void 0;
        function p() {
          if (!c || !d)
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
            ((e.fetch = l), (e.__USING_PONYFETCH__ = !0));
        }
        function f() {
          return (p(), s)
            ? s
            : (s = (0, a.createBrowserClient)(c, d, {
                global: { headers: m },
              }));
        }
        function h() {
          return (0, o.useMemo)(f, []);
        }
        function x() {
          return (
            p(), (0, a.createBrowserClient)(c, d, { global: { headers: m } })
          );
        }
        let v = f;
        f();
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
      37787: (e, t, r) => {
        "use strict";
        r.a(e, async (e, s) => {
          try {
            r.d(t, { T: () => l });
            var a = r(61268),
              i = r(84205),
              n = r(15942),
              o = e([n]);
            n = (o.then ? (await o)() : o)[0];
            let l = i.forwardRef(({ className: e, ...t }, r) =>
              (0, a.jsx)("textarea", {
                className: (0, n.cn)(
                  "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                  e,
                ),
                ref: r,
                ...t,
              }),
            );
            (l.displayName = "Textarea"), s();
          } catch (e) {
            s(e);
          }
        });
      },
      38522: (e) => {
        "use strict";
        e.exports = require("node:zlib");
      },
      39132: (e, t, r) => {
        "use strict";
        r.a(e, async (e, s) => {
          try {
            r.d(t, { T: () => T });
            var a = r(61268),
              i = r(97052),
              n = r(99358),
              o = r(99927),
              l = r(31766),
              c = r(16851),
              d = r(94910),
              u = r(66135),
              m = r(92663),
              p = r(89882),
              f = r(84205),
              h = r(36322),
              x = r(36352),
              v = r(11603),
              g = r(28909),
              b = r(5451),
              y = r(86183),
              w = r(78337),
              j = r(13909),
              N = r(77001),
              k = r(37787),
              S = r(15090),
              A = e([v, g, b, y, w, j, N, k]);
            [v, g, b, y, w, j, N, k] = A.then ? (await A)() : A;
            let C = x.Ik({
              url: x.Yj().url({ message: "Please enter a valid URL" }),
              waitForNetworkIdle: x.zM().default(!0),
              extractLinks: x.zM().default(!0),
              mobile: x.zM().default(!1),
              waitForSelectors: x.Yj().optional(),
              extractSelectors: x.Yj().optional(),
              generateSummary: x.zM().default(!0),
              extractData: x.zM().default(!0),
            });
            function T() {
              let e = (0, p.useRouter)(),
                { toast: t } = (0, S.d)(),
                [r, s] = (0, f.useState)(!1),
                [x, A] = (0, f.useState)("url"),
                [T, I] = (0, f.useState)(null),
                _ = (0, h.mN)({
                  resolver: (0, i.u)(C),
                  defaultValues: {
                    url: "",
                    waitForNetworkIdle: !0,
                    extractLinks: !0,
                    mobile: !1,
                    waitForSelectors: "",
                    extractSelectors: "",
                    generateSummary: !0,
                    extractData: !0,
                  },
                }),
                E = async (e) => {
                  s(!0), I(null);
                  try {
                    let r,
                      s = localStorage.getItem("user-data"),
                      a = s ? JSON.parse(s).id : null,
                      i = e.waitForSelectors
                        ? e.waitForSelectors.split(",").map((e) => e.trim())
                        : void 0;
                    if (e.extractSelectors)
                      try {
                        r = JSON.parse(e.extractSelectors);
                      } catch (s) {
                        let t = e.extractSelectors.split(",");
                        for (let e of ((r = {}), t)) {
                          let [t, s] = e.split(":").map((e) => e.trim());
                          t && s && (r[t] = s);
                        }
                      }
                    let n = {
                        waitForNetworkIdle: e.waitForNetworkIdle,
                        extractLinks: e.extractLinks,
                        mobile: e.mobile,
                        waitForSelectors: i,
                        extractSelectors: r,
                        timeout: 3e4,
                      },
                      o = await fetch("/api/scraper", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                          url: e.url,
                          options: n,
                          userId: a,
                          generateSummary: e.generateSummary,
                          extractData: e.extractData,
                        }),
                      });
                    if (!o.ok) throw Error("Failed to scrape URL");
                    let l = await o.json();
                    if ((I(l), A("preview"), l.saved)) {
                      t({
                        title: "Content saved successfully",
                        description:
                          "The scraped content has been saved to your documents.",
                      });
                      try {
                        let e = window.__ARTIFACT_CONTEXT__;
                        e?.refreshArtifacts && e.refreshArtifacts();
                      } catch (e) {}
                    }
                  } catch (e) {
                    console.error("Error:", e),
                      t({
                        title: "Error",
                        description: "Failed to scrape URL. Please try again.",
                        variant: "destructive",
                      });
                  } finally {
                    s(!1);
                  }
                };
              return (0, a.jsx)("div", {
                className: "container mx-auto p-4 max-w-4xl",
                children: (0, a.jsxs)(b.Zp, {
                  children: [
                    (0, a.jsx)(b.aR, {
                      children: (0, a.jsxs)(b.ZB, {
                        className: "text-2xl flex items-center gap-2",
                        children: [
                          (0, a.jsx)(n.A, { className: "h-6 w-6" }),
                          "Web Scraper",
                        ],
                      }),
                    }),
                    (0, a.jsx)(b.Wu, {
                      children: (0, a.jsxs)(N.Tabs, {
                        defaultValue: x,
                        children: [
                          (0, a.jsxs)(N.TabsList, {
                            className: "mb-4",
                            children: [
                              (0, a.jsxs)(N.TabsTrigger, {
                                value: "url",
                                onClick: () => A("url"),
                                children: [
                                  (0, a.jsx)(o.A, {
                                    className: "h-4 w-4 mr-2",
                                  }),
                                  "URL Input",
                                ],
                              }),
                              (0, a.jsxs)(N.TabsTrigger, {
                                value: "preview",
                                disabled: !T,
                                onClick: () => A("preview"),
                                children: [
                                  (0, a.jsx)(l.A, {
                                    className: "h-4 w-4 mr-2",
                                  }),
                                  "Content Preview",
                                ],
                              }),
                            ],
                          }),
                          (0, a.jsx)(N.TabsContent, {
                            value: "url",
                            children: (0, a.jsxs)("form", {
                              onSubmit: _.handleSubmit(E),
                              className: "space-y-6",
                              children: [
                                (0, a.jsx)(y.zB, {
                                  control: _.control,
                                  name: "url",
                                  render: ({ field: e }) =>
                                    (0, a.jsxs)(y.eI, {
                                      children: [
                                        (0, a.jsx)(y.lR, {
                                          children: "Website URL",
                                        }),
                                        (0, a.jsx)(y.MJ, {
                                          children: (0, a.jsx)(w.p, {
                                            placeholder:
                                              "https://www.example.com",
                                            ...e,
                                          }),
                                        }),
                                        (0, a.jsx)(y.C5, {}),
                                      ],
                                    }),
                                }),
                                (0, a.jsxs)("div", {
                                  className:
                                    "grid grid-cols-1 md:grid-cols-2 gap-4",
                                  children: [
                                    (0, a.jsxs)("div", {
                                      className: "space-y-4",
                                      children: [
                                        (0, a.jsx)("h3", {
                                          className: "text-lg font-medium",
                                          children: "Basic Options",
                                        }),
                                        (0, a.jsx)(y.zB, {
                                          control: _.control,
                                          name: "waitForNetworkIdle",
                                          render: ({ field: e }) =>
                                            (0, a.jsxs)(y.eI, {
                                              className:
                                                "flex items-center justify-between space-x-2",
                                              children: [
                                                (0, a.jsx)(y.lR, {
                                                  children:
                                                    "Wait for network idle",
                                                }),
                                                (0, a.jsx)(y.MJ, {
                                                  children: (0, a.jsx)(j.d, {
                                                    checked: e.value,
                                                    onCheckedChange: e.onChange,
                                                  }),
                                                }),
                                              ],
                                            }),
                                        }),
                                        (0, a.jsx)(y.zB, {
                                          control: _.control,
                                          name: "extractLinks",
                                          render: ({ field: e }) =>
                                            (0, a.jsxs)(y.eI, {
                                              className:
                                                "flex items-center justify-between space-x-2",
                                              children: [
                                                (0, a.jsx)(y.lR, {
                                                  children: "Extract links",
                                                }),
                                                (0, a.jsx)(y.MJ, {
                                                  children: (0, a.jsx)(j.d, {
                                                    checked: e.value,
                                                    onCheckedChange: e.onChange,
                                                  }),
                                                }),
                                              ],
                                            }),
                                        }),
                                        (0, a.jsx)(y.zB, {
                                          control: _.control,
                                          name: "mobile",
                                          render: ({ field: e }) =>
                                            (0, a.jsxs)(y.eI, {
                                              className:
                                                "flex items-center justify-between space-x-2",
                                              children: [
                                                (0, a.jsx)(y.lR, {
                                                  children: "Mobile emulation",
                                                }),
                                                (0, a.jsx)(y.MJ, {
                                                  children: (0, a.jsx)(j.d, {
                                                    checked: e.value,
                                                    onCheckedChange: e.onChange,
                                                  }),
                                                }),
                                              ],
                                            }),
                                        }),
                                      ],
                                    }),
                                    (0, a.jsxs)("div", {
                                      className: "space-y-4",
                                      children: [
                                        (0, a.jsx)("h3", {
                                          className: "text-lg font-medium",
                                          children: "AI Features",
                                        }),
                                        (0, a.jsx)(y.zB, {
                                          control: _.control,
                                          name: "generateSummary",
                                          render: ({ field: e }) =>
                                            (0, a.jsxs)(y.eI, {
                                              className:
                                                "flex items-center justify-between space-x-2",
                                              children: [
                                                (0, a.jsxs)("div", {
                                                  children: [
                                                    (0, a.jsxs)(y.lR, {
                                                      className:
                                                        "flex items-center",
                                                      children: [
                                                        (0, a.jsx)(c.A, {
                                                          className:
                                                            "h-4 w-4 mr-2",
                                                        }),
                                                        "Generate AI Summary",
                                                      ],
                                                    }),
                                                    (0, a.jsx)("p", {
                                                      className:
                                                        "text-sm text-gray-500",
                                                      children:
                                                        "Create a concise summary of the content",
                                                    }),
                                                  ],
                                                }),
                                                (0, a.jsx)(y.MJ, {
                                                  children: (0, a.jsx)(j.d, {
                                                    checked: e.value,
                                                    onCheckedChange: e.onChange,
                                                  }),
                                                }),
                                              ],
                                            }),
                                        }),
                                        (0, a.jsx)(y.zB, {
                                          control: _.control,
                                          name: "extractData",
                                          render: ({ field: e }) =>
                                            (0, a.jsxs)(y.eI, {
                                              className:
                                                "flex items-center justify-between space-x-2",
                                              children: [
                                                (0, a.jsxs)("div", {
                                                  children: [
                                                    (0, a.jsxs)(y.lR, {
                                                      className:
                                                        "flex items-center",
                                                      children: [
                                                        (0, a.jsx)(d.A, {
                                                          className:
                                                            "h-4 w-4 mr-2",
                                                        }),
                                                        "Extract Immigration Data",
                                                      ],
                                                    }),
                                                    (0, a.jsx)("p", {
                                                      className:
                                                        "text-sm text-gray-500",
                                                      children:
                                                        "Extract structured immigration information",
                                                    }),
                                                  ],
                                                }),
                                                (0, a.jsx)(y.MJ, {
                                                  children: (0, a.jsx)(j.d, {
                                                    checked: e.value,
                                                    onCheckedChange: e.onChange,
                                                  }),
                                                }),
                                              ],
                                            }),
                                        }),
                                      ],
                                    }),
                                  ],
                                }),
                                (0, a.jsx)(v.nD, {
                                  type: "single",
                                  collapsible: !0,
                                  className: "w-full",
                                  children: (0, a.jsxs)(v.As, {
                                    value: "advanced",
                                    children: [
                                      (0, a.jsx)(v.$m, {
                                        children: "Advanced Options",
                                      }),
                                      (0, a.jsx)(v.ub, {
                                        children: (0, a.jsxs)("div", {
                                          className: "space-y-4 pt-2",
                                          children: [
                                            (0, a.jsx)(y.zB, {
                                              control: _.control,
                                              name: "waitForSelectors",
                                              render: ({ field: e }) =>
                                                (0, a.jsxs)(y.eI, {
                                                  children: [
                                                    (0, a.jsx)(y.lR, {
                                                      children:
                                                        "Wait for selectors (comma separated)",
                                                    }),
                                                    (0, a.jsx)(y.MJ, {
                                                      children: (0, a.jsx)(
                                                        w.p,
                                                        {
                                                          placeholder:
                                                            "#main-content, .article-body",
                                                          ...e,
                                                        },
                                                      ),
                                                    }),
                                                    (0, a.jsx)("p", {
                                                      className:
                                                        "text-sm text-gray-500",
                                                      children:
                                                        "CSS selectors to wait for before scraping",
                                                    }),
                                                    (0, a.jsx)(y.C5, {}),
                                                  ],
                                                }),
                                            }),
                                            (0, a.jsx)(y.zB, {
                                              control: _.control,
                                              name: "extractSelectors",
                                              render: ({ field: e }) =>
                                                (0, a.jsxs)(y.eI, {
                                                  children: [
                                                    (0, a.jsx)(y.lR, {
                                                      children:
                                                        "Extract selectors (JSON or key:value format)",
                                                    }),
                                                    (0, a.jsx)(y.MJ, {
                                                      children: (0, a.jsx)(
                                                        k.T,
                                                        {
                                                          placeholder:
                                                            '{"title": "h1", "content": ".article-body"}',
                                                          ...e,
                                                        },
                                                      ),
                                                    }),
                                                    (0, a.jsx)("p", {
                                                      className:
                                                        "text-sm text-gray-500",
                                                      children:
                                                        "CSS selectors to extract specific content",
                                                    }),
                                                    (0, a.jsx)(y.C5, {}),
                                                  ],
                                                }),
                                            }),
                                          ],
                                        }),
                                      }),
                                    ],
                                  }),
                                }),
                                (0, a.jsx)(g.$, {
                                  type: "submit",
                                  className: "w-full",
                                  disabled: r,
                                  children: r
                                    ? (0, a.jsxs)(a.Fragment, {
                                        children: [
                                          (0, a.jsx)(u.A, {
                                            className:
                                              "mr-2 h-4 w-4 animate-spin",
                                          }),
                                          "Scraping...",
                                        ],
                                      })
                                    : (0, a.jsx)(a.Fragment, {
                                        children: "Scrape",
                                      }),
                                }),
                              ],
                            }),
                          }),
                          (0, a.jsx)(N.TabsContent, {
                            value: "preview",
                            children:
                              T &&
                              (0, a.jsxs)("div", {
                                className: "space-y-6",
                                children: [
                                  (0, a.jsxs)("div", {
                                    children: [
                                      (0, a.jsx)("h3", {
                                        className: "text-lg font-medium mb-2",
                                        children: T.title || "Scraped Content",
                                      }),
                                      (0, a.jsxs)("p", {
                                        className: "text-sm text-gray-500",
                                        children: [
                                          "Source: ",
                                          (0, a.jsx)("a", {
                                            href: T.url,
                                            target: "_blank",
                                            rel: "noopener noreferrer",
                                            className:
                                              "text-blue-500 hover:underline",
                                            children: T.url,
                                          }),
                                        ],
                                      }),
                                    ],
                                  }),
                                  T.summary &&
                                    (0, a.jsxs)(b.Zp, {
                                      children: [
                                        (0, a.jsx)(b.aR, {
                                          children: (0, a.jsxs)(b.ZB, {
                                            className:
                                              "text-md flex items-center gap-2",
                                            children: [
                                              (0, a.jsx)(c.A, {
                                                className: "h-5 w-5",
                                              }),
                                              "AI Summary",
                                            ],
                                          }),
                                        }),
                                        (0, a.jsx)(b.Wu, {
                                          children: (0, a.jsx)("div", {
                                            className: "prose max-w-none",
                                            children: T.summary
                                              .split("\n")
                                              .map((e, t) =>
                                                (0, a.jsx)(
                                                  "p",
                                                  { children: e },
                                                  t,
                                                ),
                                              ),
                                          }),
                                        }),
                                      ],
                                    }),
                                  T.immigrationData &&
                                    (0, a.jsxs)(b.Zp, {
                                      children: [
                                        (0, a.jsx)(b.aR, {
                                          children: (0, a.jsxs)(b.ZB, {
                                            className:
                                              "text-md flex items-center gap-2",
                                            children: [
                                              (0, a.jsx)(d.A, {
                                                className: "h-5 w-5",
                                              }),
                                              "Immigration Data",
                                            ],
                                          }),
                                        }),
                                        (0, a.jsx)(b.Wu, {
                                          children: (0, a.jsxs)("div", {
                                            className:
                                              "grid grid-cols-1 md:grid-cols-2 gap-4",
                                            children: [
                                              T.immigrationData.documentType &&
                                                (0, a.jsxs)("div", {
                                                  children: [
                                                    (0, a.jsx)("h4", {
                                                      className: "font-medium",
                                                      children: "Document Type",
                                                    }),
                                                    (0, a.jsx)("p", {
                                                      children:
                                                        T.immigrationData
                                                          .documentType,
                                                    }),
                                                  ],
                                                }),
                                              T.immigrationData.sourceType &&
                                                (0, a.jsxs)("div", {
                                                  children: [
                                                    (0, a.jsx)("h4", {
                                                      className: "font-medium",
                                                      children: "Source Type",
                                                    }),
                                                    (0, a.jsx)("p", {
                                                      children:
                                                        T.immigrationData
                                                          .sourceType,
                                                    }),
                                                  ],
                                                }),
                                              T.immigrationData
                                                .credibilityScore &&
                                                (0, a.jsxs)("div", {
                                                  children: [
                                                    (0, a.jsx)("h4", {
                                                      className: "font-medium",
                                                      children:
                                                        "Credibility Score",
                                                    }),
                                                    (0, a.jsxs)("p", {
                                                      children: [
                                                        T.immigrationData
                                                          .credibilityScore,
                                                        "/100",
                                                      ],
                                                    }),
                                                  ],
                                                }),
                                              T.immigrationData.countries &&
                                                T.immigrationData.countries
                                                  .length > 0 &&
                                                (0, a.jsxs)("div", {
                                                  children: [
                                                    (0, a.jsx)("h4", {
                                                      className: "font-medium",
                                                      children: "Countries",
                                                    }),
                                                    (0, a.jsx)("p", {
                                                      children:
                                                        T.immigrationData.countries.join(
                                                          ", ",
                                                        ),
                                                    }),
                                                  ],
                                                }),
                                              T.immigrationData.visaTypes &&
                                                T.immigrationData.visaTypes
                                                  .length > 0 &&
                                                (0, a.jsxs)("div", {
                                                  className: "col-span-2",
                                                  children: [
                                                    (0, a.jsx)("h4", {
                                                      className: "font-medium",
                                                      children: "Visa Types",
                                                    }),
                                                    (0, a.jsx)("p", {
                                                      children:
                                                        T.immigrationData.visaTypes.join(
                                                          ", ",
                                                        ),
                                                    }),
                                                  ],
                                                }),
                                              T.immigrationData.requirements &&
                                                T.immigrationData.requirements
                                                  .length > 0 &&
                                                (0, a.jsxs)("div", {
                                                  className: "col-span-2",
                                                  children: [
                                                    (0, a.jsx)("h4", {
                                                      className: "font-medium",
                                                      children: "Requirements",
                                                    }),
                                                    (0, a.jsx)("ul", {
                                                      className:
                                                        "list-disc pl-5",
                                                      children:
                                                        T.immigrationData.requirements.map(
                                                          (e, t) =>
                                                            (0, a.jsx)(
                                                              "li",
                                                              { children: e },
                                                              t,
                                                            ),
                                                        ),
                                                    }),
                                                  ],
                                                }),
                                              T.immigrationData.keyPoints &&
                                                T.immigrationData.keyPoints
                                                  .length > 0 &&
                                                (0, a.jsxs)("div", {
                                                  className: "col-span-2",
                                                  children: [
                                                    (0, a.jsx)("h4", {
                                                      className: "font-medium",
                                                      children: "Key Points",
                                                    }),
                                                    (0, a.jsx)("ul", {
                                                      className:
                                                        "list-disc pl-5",
                                                      children:
                                                        T.immigrationData.keyPoints.map(
                                                          (e, t) =>
                                                            (0, a.jsx)(
                                                              "li",
                                                              { children: e },
                                                              t,
                                                            ),
                                                        ),
                                                    }),
                                                  ],
                                                }),
                                            ],
                                          }),
                                        }),
                                      ],
                                    }),
                                  (0, a.jsxs)("div", {
                                    children: [
                                      (0, a.jsx)("h3", {
                                        className: "text-lg font-medium mb-2",
                                        children: "Original Content",
                                      }),
                                      (0, a.jsx)("div", {
                                        className:
                                          "max-h-96 overflow-y-auto bg-gray-50 dark:bg-gray-900 rounded-md p-4",
                                        children: (0, a.jsx)("pre", {
                                          className:
                                            "whitespace-pre-wrap text-sm",
                                          children: T.content,
                                        }),
                                      }),
                                    ],
                                  }),
                                  (0, a.jsxs)("div", {
                                    className: "flex justify-between",
                                    children: [
                                      (0, a.jsx)(g.$, {
                                        variant: "outline",
                                        onClick: () => A("url"),
                                        children: "Back to URL Input",
                                      }),
                                      (0, a.jsxs)(g.$, {
                                        onClick: () => e.push("/documents"),
                                        children: [
                                          (0, a.jsx)(m.A, {
                                            className: "mr-2 h-4 w-4",
                                          }),
                                          "Go to Documents",
                                        ],
                                      }),
                                    ],
                                  }),
                                ],
                              }),
                          }),
                        ],
                      }),
                    }),
                  ],
                }),
              });
            }
            s();
          } catch (e) {
            s(e);
          }
        });
      },
      40406: (e, t, r) => {
        Promise.resolve().then(r.bind(r, 98738));
      },
      41220: (e, t, r) => {
        "use strict";
        let s;
        r.r(t),
          r.d(t, {
            default: () => p,
            generateImageMetadata: () => u,
            generateMetadata: () => d,
            generateViewport: () => m,
          });
        var a = r(63033),
          i = r(26394),
          n = r(60442),
          o = (0, i.registerClientReference)(
            function () {
              throw Error(
                "Attempted to call the default export of \"E:\\\\downloads\\\\Hijraah\\\\apps\\\\web\\\\src\\\\app\\\\(authenticated)\\\\documents\\\\scrape\\\\page.tsx\" from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
              );
            },
            "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\(authenticated)\\documents\\scrape\\page.tsx",
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
          "function" == typeof o
            ? new Proxy(o, {
                apply: (e, t, r) => {
                  let s, a, i;
                  try {
                    let e = c?.getStore();
                    (s = e?.headers.get("sentry-trace") ?? void 0),
                      (a = e?.headers.get("baggage") ?? void 0),
                      (i = e?.headers);
                  } catch (e) {}
                  return n
                    .wrapServerComponentWithSentry(e, {
                      componentRoute: "/(authenticated)/documents/scrape",
                      componentType: "Page",
                      sentryTraceHeader: s,
                      baggageHeader: a,
                      headers: i,
                    })
                    .apply(t, r);
                },
              })
            : o;
        let d = void 0,
          u = void 0,
          m = void 0,
          p = s;
      },
      41692: (e) => {
        "use strict";
        e.exports = require("node:tls");
      },
      42414: (e, t, r) => {
        "use strict";
        r.d(t, { B: () => l });
        var s,
          a = r(84205),
          i = r(66130),
          n =
            (s || (s = r.t(a, 2)))[" useId ".trim().toString()] ||
            (() => void 0),
          o = 0;
        function l(e) {
          let [t, r] = a.useState(n());
          return (
            (0, i.N)(() => {
              e || r((e) => e ?? String(o++));
            }, [e]),
            e || (t ? `radix-${t}` : "")
          );
        }
      },
      43886: () => {},
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
      55511: (e) => {
        "use strict";
        e.exports = require("crypto");
      },
      55591: (e) => {
        "use strict";
        e.exports = require("https");
      },
      56558: (e, t, r) => {
        "use strict";
        r.d(t, { hO: () => l, sG: () => o });
        var s = r(84205),
          a = r(90304),
          i = r(86415),
          n = r(61268),
          o = [
            "a",
            "button",
            "div",
            "form",
            "h2",
            "h3",
            "img",
            "input",
            "label",
            "li",
            "nav",
            "ol",
            "p",
            "select",
            "span",
            "svg",
            "ul",
          ].reduce((e, t) => {
            let r = (0, i.TL)(`Primitive.${t}`),
              a = s.forwardRef((e, s) => {
                let { asChild: a, ...i } = e;
                return (
                  "undefined" != typeof window &&
                    (window[Symbol.for("radix-ui")] = !0),
                  (0, n.jsx)(a ? r : t, { ...i, ref: s })
                );
              });
            return (a.displayName = `Primitive.${t}`), { ...e, [t]: a };
          }, {});
        function l(e, t) {
          e && a.flushSync(() => e.dispatchEvent(t));
        }
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
        r.d(t, { RG: () => w, bL: () => _, q7: () => E });
        var s = r(84205),
          a = r(28777),
          i = r(28029),
          n = r(71604),
          o = r(18047),
          l = r(42414),
          c = r(78593),
          d = r(10308),
          u = r(48705),
          m = r(7839),
          p = r(61268),
          f = "rovingFocusGroup.onEntryFocus",
          h = { bubbles: !1, cancelable: !0 },
          x = "RovingFocusGroup",
          [v, g, b] = (0, i.N)(x),
          [y, w] = (0, o.A)(x, [b]),
          [j, N] = y(x),
          k = s.forwardRef((e, t) =>
            (0, p.jsx)(v.Provider, {
              scope: e.__scopeRovingFocusGroup,
              children: (0, p.jsx)(v.Slot, {
                scope: e.__scopeRovingFocusGroup,
                children: (0, p.jsx)(S, { ...e, ref: t }),
              }),
            }),
          );
        k.displayName = x;
        var S = s.forwardRef((e, t) => {
            let {
                __scopeRovingFocusGroup: r,
                orientation: i,
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
              A = (0, n.s)(t, S),
              T = (0, m.jH)(l),
              [C, _] = (0, u.i)({
                prop: v,
                defaultProp: b ?? null,
                onChange: y,
                caller: x,
              }),
              [E, R] = s.useState(!1),
              D = (0, d.c)(w),
              M = g(r),
              q = s.useRef(!1),
              [P, F] = s.useState(0);
            return (
              s.useEffect(() => {
                let e = S.current;
                if (e)
                  return (
                    e.addEventListener(f, D), () => e.removeEventListener(f, D)
                  );
              }, [D]),
              (0, p.jsx)(j, {
                scope: r,
                orientation: i,
                dir: T,
                loop: o,
                currentTabStopId: C,
                onItemFocus: s.useCallback((e) => _(e), [_]),
                onItemShiftTab: s.useCallback(() => R(!0), []),
                onFocusableItemAdd: s.useCallback(() => F((e) => e + 1), []),
                onFocusableItemRemove: s.useCallback(() => F((e) => e - 1), []),
                children: (0, p.jsx)(c.sG.div, {
                  tabIndex: E || 0 === P ? -1 : 0,
                  "data-orientation": i,
                  ...k,
                  ref: A,
                  style: { outline: "none", ...e.style },
                  onMouseDown: (0, a.m)(e.onMouseDown, () => {
                    q.current = !0;
                  }),
                  onFocus: (0, a.m)(e.onFocus, (e) => {
                    let t = !q.current;
                    if (e.target === e.currentTarget && t && !E) {
                      let t = new CustomEvent(f, h);
                      if (
                        (e.currentTarget.dispatchEvent(t), !t.defaultPrevented)
                      ) {
                        let e = M().filter((e) => e.focusable);
                        I(
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
                    q.current = !1;
                  }),
                  onBlur: (0, a.m)(e.onBlur, () => R(!1)),
                }),
              })
            );
          }),
          A = "RovingFocusGroupItem",
          T = s.forwardRef((e, t) => {
            let {
                __scopeRovingFocusGroup: r,
                focusable: i = !0,
                active: n = !1,
                tabStopId: o,
                children: d,
                ...u
              } = e,
              m = (0, l.B)(),
              f = o || m,
              h = N(A, r),
              x = h.currentTabStopId === f,
              b = g(r),
              {
                onFocusableItemAdd: y,
                onFocusableItemRemove: w,
                currentTabStopId: j,
              } = h;
            return (
              s.useEffect(() => {
                if (i) return y(), () => w();
              }, [i, y, w]),
              (0, p.jsx)(v.ItemSlot, {
                scope: r,
                id: f,
                focusable: i,
                active: n,
                children: (0, p.jsx)(c.sG.span, {
                  tabIndex: x ? 0 : -1,
                  "data-orientation": h.orientation,
                  ...u,
                  ref: t,
                  onMouseDown: (0, a.m)(e.onMouseDown, (e) => {
                    i ? h.onItemFocus(f) : e.preventDefault();
                  }),
                  onFocus: (0, a.m)(e.onFocus, () => h.onItemFocus(f)),
                  onKeyDown: (0, a.m)(e.onKeyDown, (e) => {
                    if ("Tab" === e.key && e.shiftKey)
                      return void h.onItemShiftTab();
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
                        return C[a];
                    })(e, h.orientation, h.dir);
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
                        r = h.loop
                          ? (function (e, t) {
                              return e.map((r, s) => e[(t + s) % e.length]);
                            })(r, s + 1)
                          : r.slice(s + 1);
                      }
                      setTimeout(() => I(r));
                    }
                  }),
                  children:
                    "function" == typeof d
                      ? d({ isCurrentTabStop: x, hasTabStop: null != j })
                      : d,
                }),
              })
            );
          });
        T.displayName = A;
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
        function I(e, t = !1) {
          let r = document.activeElement;
          for (let s of e)
            if (
              s === r ||
              (s.focus({ preventScroll: t }), document.activeElement !== r)
            )
              return;
        }
        var _ = k,
          E = T;
      },
      59570: () => {},
      63033: (e) => {
        "use strict";
        e.exports = require("next/dist/server/app-render/work-unit-async-storage.external.js");
      },
      66135: (e, t, r) => {
        "use strict";
        r.d(t, { A: () => s });
        let s = (0, r(95255).A)("Loader2", [
          ["path", { d: "M21 12a9 9 0 1 1-6.219-8.56", key: "13zald" }],
        ]);
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
      70753: (e, t, r) => {
        "use strict";
        r.d(t, { A: () => s });
        let s = (0, r(95255).A)("ChevronDown", [
          ["path", { d: "m6 9 6 6 6-6", key: "qrunsl" }],
        ]);
      },
      72967: (e, t, r) => {
        "use strict";
        let s;
        r.r(t),
          r.d(t, {
            default: () => m,
            generateImageMetadata: () => d,
            generateMetadata: () => c,
            generateViewport: () => u,
          });
        var a = r(63033),
          i = r(35242),
          n = r(60442);
        let o = { ...a },
          l =
            "workUnitAsyncStorage" in o
              ? o.workUnitAsyncStorage
              : "requestAsyncStorage" in o
                ? o.requestAsyncStorage
                : void 0;
        s = new Proxy(
          function ({ children: e }) {
            return (0, i.jsx)(i.Fragment, { children: e });
          },
          {
            apply: (e, t, r) => {
              let s, a, i;
              try {
                let e = l?.getStore();
                (s = e?.headers.get("sentry-trace") ?? void 0),
                  (a = e?.headers.get("baggage") ?? void 0),
                  (i = e?.headers);
              } catch (e) {}
              return n
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
        let c = void 0,
          d = void 0,
          u = void 0,
          m = s;
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
              TabsList: () => c,
              TabsTrigger: () => d,
            });
            var a = r(61268),
              i = r(28366);
            r(84205);
            var n = r(15942),
              o = e([n]);
            function l({ className: e, ...t }) {
              return (0, a.jsx)(i.bL, {
                "data-slot": "tabs",
                className: (0, n.cn)("flex flex-col gap-2", e),
                ...t,
              });
            }
            function c({ className: e, ...t }) {
              return (0, a.jsx)(i.B8, {
                "data-slot": "tabs-list",
                className: (0, n.cn)(
                  "bg-muted text-muted-foreground inline-flex h-9 w-fit items-center justify-center rounded-lg p-[3px]",
                  e,
                ),
                ...t,
              });
            }
            function d({ className: e, ...t }) {
              return (0, a.jsx)(i.l9, {
                "data-slot": "tabs-trigger",
                className: (0, n.cn)(
                  "data-[state=active]:bg-background dark:data-[state=active]:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:outline-ring dark:data-[state=active]:border-input dark:data-[state=active]:bg-input/30 text-foreground dark:text-muted-foreground inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-md border border-transparent px-2 py-1 text-sm font-medium whitespace-nowrap transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:shadow-sm [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
                  e,
                ),
                ...t,
              });
            }
            function u({ className: e, ...t }) {
              return (0, a.jsx)(i.UC, {
                "data-slot": "tabs-content",
                className: (0, n.cn)("flex-1 outline-none", e),
                ...t,
              });
            }
            (n = (o.then ? (await o)() : o)[0]), s();
          } catch (e) {
            s(e);
          }
        });
      },
      77030: (e) => {
        "use strict";
        e.exports = require("node:net");
      },
      77358: (e, t, r) => {
        Promise.resolve().then(r.bind(r, 41220));
      },
      77598: (e) => {
        "use strict";
        e.exports = require("node:crypto");
      },
      78337: (e, t, r) => {
        "use strict";
        r.a(e, async (e, s) => {
          try {
            r.d(t, { p: () => o });
            var a = r(61268);
            r(84205);
            var i = r(15942),
              n = e([i]);
            function o({ className: e, type: t, ...r }) {
              return (0, a.jsx)("input", {
                type: t,
                "data-slot": "input",
                className: (0, i.cn)(
                  "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
                  "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
                  "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
                  e,
                ),
                ...r,
              });
            }
            (i = (n.then ? (await n)() : n)[0]), s();
          } catch (e) {
            s(e);
          }
        });
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
      86183: (e, t, r) => {
        "use strict";
        r.a(e, async (e, s) => {
          try {
            r.d(t, {
              C5: () => f,
              MJ: () => p,
              eI: () => u,
              lR: () => m,
              lV: () => h,
              zB: () => v,
            });
            var a = r(61268),
              i = r(86415),
              n = r(84205),
              o = r(36322),
              l = r(16979),
              c = r(15942),
              d = e([l, c]);
            [l, c] = d.then ? (await d)() : d;
            let h = o.Op,
              x = n.createContext({}),
              v = ({ ...e }) =>
                (0, a.jsx)(x.Provider, {
                  value: { name: e.name },
                  children: (0, a.jsx)(o.xI, { ...e }),
                }),
              g = () => {
                let e = n.useContext(x),
                  t = n.useContext(b),
                  { getFieldState: r } = (0, o.xW)(),
                  s = (0, o.lN)({ name: e.name }),
                  a = r(e.name, s);
                if (!e)
                  throw Error("useFormField should be used within <FormField>");
                let { id: i } = t;
                return {
                  id: i,
                  name: e.name,
                  formItemId: `${i}-form-item`,
                  formDescriptionId: `${i}-form-item-description`,
                  formMessageId: `${i}-form-item-message`,
                  ...a,
                };
              },
              b = n.createContext({});
            function u({ className: e, ...t }) {
              let r = n.useId();
              return (0, a.jsx)(b.Provider, {
                value: { id: r },
                children: (0, a.jsx)("div", {
                  "data-slot": "form-item",
                  className: (0, c.cn)("grid gap-2", e),
                  ...t,
                }),
              });
            }
            function m({ className: e, ...t }) {
              let { error: r, formItemId: s } = g();
              return (0, a.jsx)(l.J, {
                "data-slot": "form-label",
                "data-error": !!r,
                className: (0, c.cn)("data-[error=true]:text-destructive", e),
                htmlFor: s,
                ...t,
              });
            }
            function p({ ...e }) {
              let {
                error: t,
                formItemId: r,
                formDescriptionId: s,
                formMessageId: n,
              } = g();
              return (0, a.jsx)(i.DX, {
                "data-slot": "form-control",
                id: r,
                "aria-describedby": t ? `${s} ${n}` : `${s}`,
                "aria-invalid": !!t,
                ...e,
              });
            }
            function f({ className: e, ...t }) {
              let { error: r, formMessageId: s } = g(),
                i = r ? String(r?.message ?? "") : t.children;
              return i
                ? (0, a.jsx)("p", {
                    "data-slot": "form-message",
                    id: s,
                    className: (0, c.cn)("text-destructive text-sm", e),
                    ...t,
                    children: i,
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
      87216: (e, t, r) => {
        "use strict";
        r.a(e, async (e, s) => {
          try {
            r.d(t, { Ck: () => x, dj: () => v });
            var a = r(61268),
              i = r(24419),
              n = r(91635),
              o = r(90495),
              l = r(61950),
              c = r(38568),
              d = r(89123),
              u = r(84205),
              m = r.n(u),
              p = r(15942),
              f = e([p]);
            p = (f.then ? (await f)() : f)[0];
            let b = (0, u.createContext)(void 0);
            i.Kq,
              (m().forwardRef(({ className: e, ...t }, r) =>
                (0, a.jsx)(i.LM, {
                  ref: r,
                  className: (0, p.cn)(
                    "fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]",
                    e,
                  ),
                  ...t,
                }),
              ).displayName = i.LM.displayName);
            let y = (0, n.F)(
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
            function h({
              title: e,
              description: t,
              variant: r = "default",
              onClose: s,
            }) {
              let i = {
                default: null,
                destructive: l.A,
                success: c.A,
                info: d.A,
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
                    children: (0, a.jsx)(o.A, { className: "h-4 w-4" }),
                  }),
                ],
              });
            }
            function x({ children: e }) {
              let [t, r] = (0, u.useState)([]),
                s = (0, u.useRef)(0),
                i = (0, u.useCallback)((e) => {
                  r((t) => t.filter((t) => t.id !== e));
                }, []),
                n = (0, u.useCallback)(
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
                o = (0, u.useMemo)(
                  () => ({ toast: n, toasts: t, removeToast: i }),
                  [n, t, i],
                );
              return (0, a.jsxs)(b.Provider, {
                value: o,
                children: [e, (0, a.jsx)(g, {})],
              });
            }
            function v() {
              let e = (0, u.useContext)(b);
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
                  (0, a.jsx)(h, { ...e, onClose: () => t(e.id) }, e.id),
                ),
              });
            }
            (m().forwardRef(({ className: e, variant: t, ...r }, s) =>
              (0, a.jsx)(i.bL, {
                ref: s,
                className: (0, p.cn)(y({ variant: t }), e),
                ...r,
              }),
            ).displayName = i.bL.displayName),
              (m().forwardRef(({ className: e, ...t }, r) =>
                (0, a.jsx)(i.rc, {
                  ref: r,
                  className: (0, p.cn)(
                    "inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 text-sm font-medium ring-offset-background transition-colors hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 group-[.destructive]:border-muted/40 group-[.destructive]:hover:border-destructive/30 group-[.destructive]:hover:bg-destructive group-[.destructive]:hover:text-destructive-foreground group-[.destructive]:focus:ring-destructive",
                    e,
                  ),
                  ...t,
                }),
              ).displayName = i.rc.displayName),
              (m().forwardRef(({ className: e, ...t }, r) =>
                (0, a.jsx)(i.bm, {
                  ref: r,
                  className: (0, p.cn)(
                    "absolute right-2 top-2 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-2 group-hover:opacity-100 group-[.destructive]:text-red-300 group-[.destructive]:hover:text-red-50 group-[.destructive]:focus:ring-red-400 group-[.destructive]:focus:ring-offset-red-600",
                    e,
                  ),
                  "toast-close": "",
                  ...t,
                  children: (0, a.jsx)(o.A, { className: "h-4 w-4" }),
                }),
              ).displayName = i.bm.displayName),
              (m().forwardRef(({ className: e, ...t }, r) =>
                (0, a.jsx)(i.hE, {
                  ref: r,
                  className: (0, p.cn)("text-sm font-semibold", e),
                  ...t,
                }),
              ).displayName = i.hE.displayName),
              (m().forwardRef(({ className: e, ...t }, r) =>
                (0, a.jsx)(i.VY, {
                  ref: r,
                  className: (0, p.cn)("text-sm opacity-90", e),
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
            r.d(t, { S: () => m, k: () => d });
            var a = r(61268),
              i = r(89882),
              n = r(84205),
              o = r(87216),
              l = r(32367),
              c = e([o]);
            o = (c.then ? (await c)() : c)[0];
            let u = (0, n.createContext)(void 0);
            function d({ children: e }) {
              let [t, r] = (0, n.useState)([]),
                [s, c] = (0, n.useState)(null),
                [d, m] = (0, n.useState)([]),
                [p, f] = (0, n.useState)(!1),
                [h, x] = (0, n.useState)(null),
                v = (0, i.useRouter)(),
                { toast: g } = (0, o.dj)(),
                b = (0, l.AG)(),
                y = async (e) => {
                  try {
                    f(!0), x(null);
                    let { data: t, error: r } = await b
                      .from("artifacts")
                      .select("*")
                      .eq("id", e)
                      .single();
                    if (r) throw r;
                    c(t);
                    let { data: s, error: a } = await b
                      .from("artifact_messages")
                      .select("*")
                      .eq("artifact_id", e)
                      .order("created_at", { ascending: !0 });
                    if (a) throw a;
                    m(s || []);
                  } catch (e) {
                    console.error("Error fetching artifact:", e),
                      x("Failed to fetch artifact");
                  } finally {
                    f(!1);
                  }
                },
                w = async (e, t, r, s) => {
                  try {
                    f(!0), x(null);
                    let { data: a } = await b.auth.getUser();
                    if (!a?.user) throw Error("User not authenticated");
                    let i = {
                        title: e,
                        type: t,
                        content: r,
                        user_id: a.user.id,
                        chat_id: s,
                        visibility: "private",
                      },
                      { data: n, error: o } = await b
                        .from("artifacts")
                        .insert(i)
                        .select()
                        .single();
                    if (o) throw o;
                    return (
                      g({
                        title: "Artifact created",
                        description: `${e} has been created successfully`,
                        variant: "success",
                      }),
                      n
                    );
                  } catch (t) {
                    let e = "Failed to create artifact";
                    throw (
                      (x(e),
                      console.error(t),
                      g({
                        title: "Error",
                        description: e,
                        variant: "destructive",
                      }),
                      t)
                    );
                  } finally {
                    f(!1);
                  }
                },
                j = async (e, t) => {
                  try {
                    f(!0), x(null);
                    let { error: r } = await b
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
                    x(e),
                      console.error(t),
                      g({
                        title: "Error",
                        description: e,
                        variant: "destructive",
                      });
                  } finally {
                    f(!1);
                  }
                },
                N = async (e) => {
                  try {
                    f(!0), x(null);
                    let { error: t } = await b
                      .from("artifacts")
                      .delete()
                      .eq("id", e);
                    if (t) throw t;
                    s?.id === e && (c(null), v.push("/artifacts")),
                      g({
                        title: "Artifact deleted",
                        description: "The artifact has been removed",
                        variant: "success",
                      });
                  } catch (t) {
                    let e = "Failed to delete artifact";
                    x(e),
                      console.error(t),
                      g({
                        title: "Error",
                        description: e,
                        variant: "destructive",
                      });
                  } finally {
                    f(!1);
                  }
                },
                k = async (e, t, r) => {
                  try {
                    f(!0), x(null);
                    let { error: s } = await b
                      .from("artifact_messages")
                      .insert({ artifact_id: e, content: t, role: r });
                    if (s) throw s;
                    await y(e);
                  } catch (e) {
                    x("Failed to add message"), console.error(e);
                  } finally {
                    f(!1);
                  }
                },
                S = async (e, t) => {
                  try {
                    f(!0), x(null);
                    let { error: r } = await b
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
                    x(e),
                      console.error(t),
                      g({
                        title: "Error",
                        description: e,
                        variant: "destructive",
                      });
                  } finally {
                    f(!1);
                  }
                };
              return (0, a.jsx)(u.Provider, {
                value: {
                  artifacts: t,
                  currentArtifact: s,
                  artifactMessages: d,
                  isLoading: p,
                  error: h,
                  createArtifact: w,
                  updateArtifact: j,
                  deleteArtifact: N,
                  getArtifact: y,
                  addArtifactMessage: k,
                  updateArtifactVisibility: S,
                },
                children: e,
              });
            }
            let m = () => {
              let e = (0, n.useContext)(u);
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
      90495: (e, t, r) => {
        "use strict";
        r.d(t, { A: () => s });
        let s = (0, r(95255).A)("X", [
          ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
          ["path", { d: "m6 6 12 12", key: "d8bk6v" }],
        ]);
      },
      91557: (e, t, r) => {
        "use strict";
        r.d(t, { X: () => i });
        var s = r(84205),
          a = r(66130);
        function i(e) {
          let [t, r] = s.useState(void 0);
          return (
            (0, a.N)(() => {
              if (e) {
                r({ width: e.offsetWidth, height: e.offsetHeight });
                let t = new ResizeObserver((t) => {
                  let s, a;
                  if (!Array.isArray(t) || !t.length) return;
                  let i = t[0];
                  if ("borderBoxSize" in i) {
                    let e = i.borderBoxSize,
                      t = Array.isArray(e) ? e[0] : e;
                    (s = t.inlineSize), (a = t.blockSize);
                  } else (s = e.offsetWidth), (a = e.offsetHeight);
                  r({ width: s, height: a });
                });
                return (
                  t.observe(e, { box: "border-box" }), () => t.unobserve(e)
                );
              }
              r(void 0);
            }, [e]),
            t
          );
        }
      },
      91645: (e) => {
        "use strict";
        e.exports = require("net");
      },
      92663: (e, t, r) => {
        "use strict";
        r.d(t, { A: () => s });
        let s = (0, r(95255).A)("BookOpen", [
          [
            "path",
            { d: "M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z", key: "vv98re" },
          ],
          [
            "path",
            { d: "M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z", key: "1cyq3y" },
          ],
        ]);
      },
      94735: (e) => {
        "use strict";
        e.exports = require("events");
      },
      94910: (e, t, r) => {
        "use strict";
        r.d(t, { A: () => s });
        let s = (0, r(95255).A)("Database", [
          ["ellipse", { cx: "12", cy: "5", rx: "9", ry: "3", key: "msslwz" }],
          ["path", { d: "M3 5V19A9 3 0 0 0 21 19V5", key: "1wlel7" }],
          ["path", { d: "M3 12A9 3 0 0 0 21 12", key: "mv7ke4" }],
        ]);
      },
      95255: (e, t, r) => {
        "use strict";
        r.d(t, { A: () => n });
        var s = r(84205),
          a = {
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
        let i = (e) =>
            e
              .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
              .toLowerCase()
              .trim(),
          n = (e, t) => {
            let r = (0, s.forwardRef)(
              (
                {
                  color: r = "currentColor",
                  size: n = 24,
                  strokeWidth: o = 2,
                  absoluteStrokeWidth: l,
                  className: c = "",
                  children: d,
                  ...u
                },
                m,
              ) =>
                (0, s.createElement)(
                  "svg",
                  {
                    ref: m,
                    ...a,
                    width: n,
                    height: n,
                    stroke: r,
                    strokeWidth: l ? (24 * Number(o)) / Number(n) : o,
                    className: ["lucide", `lucide-${i(e)}`, c].join(" "),
                    ...u,
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
      98738: (e, t, r) => {
        "use strict";
        r.a(e, async (e, s) => {
          try {
            r.r(t), r.d(t, { default: () => f });
            var a = r(61268),
              i = r(90286),
              n = r(31655),
              o = r.n(n),
              l = r(84205),
              c = r(39132),
              d = r(87826),
              u = r(28909),
              m = e([c, d, u]);
            function p() {
              return (0, a.jsxs)("div", {
                className:
                  "w-full max-w-4xl mx-auto bg-muted/20 rounded-lg p-8 animate-pulse",
                children: [
                  (0, a.jsx)("div", {
                    className: "h-8 w-64 bg-muted mb-4 rounded-md",
                  }),
                  (0, a.jsx)("div", {
                    className: "h-4 w-96 bg-muted/70 mb-8 rounded-md",
                  }),
                  (0, a.jsxs)("div", {
                    className: "space-y-6",
                    children: [
                      (0, a.jsx)("div", {
                        className: "h-10 w-full bg-muted rounded-md",
                      }),
                      (0, a.jsxs)("div", {
                        className: "grid grid-cols-2 gap-4",
                        children: [
                          (0, a.jsx)("div", {
                            className: "h-24 w-full bg-muted rounded-md",
                          }),
                          (0, a.jsx)("div", {
                            className: "h-24 w-full bg-muted rounded-md",
                          }),
                        ],
                      }),
                      (0, a.jsx)("div", {
                        className: "flex justify-end",
                        children: (0, a.jsx)("div", {
                          className: "h-10 w-32 bg-muted rounded-md",
                        }),
                      }),
                    ],
                  }),
                ],
              });
            }
            function f() {
              return (0, a.jsxs)("div", {
                className: "container py-8",
                children: [
                  (0, a.jsx)("div", {
                    className: "flex items-center mb-6",
                    children: (0, a.jsx)(o(), {
                      href: "/documents",
                      legacyBehavior: !0,
                      children: (0, a.jsxs)(u.$, {
                        variant: "ghost",
                        size: "sm",
                        className: "flex items-center gap-1",
                        children: [
                          (0, a.jsx)(i.A, { className: "h-4 w-4" }),
                          "Back to Documents",
                        ],
                      }),
                    }),
                  }),
                  (0, a.jsx)("div", {
                    className: "flex justify-between items-center mb-6",
                    children: (0, a.jsx)("h1", {
                      className: "text-3xl font-bold",
                      children: "Create Document from Website",
                    }),
                  }),
                  (0, a.jsx)(d.k, {
                    children: (0, a.jsx)(l.Suspense, {
                      fallback: (0, a.jsx)(p, {}),
                      children: (0, a.jsx)(c.T, {}),
                    }),
                  }),
                ],
              });
            }
            ([c, d, u] = m.then ? (await m)() : m), s();
          } catch (e) {
            s(e);
          }
        });
      },
      99358: (e, t, r) => {
        "use strict";
        r.d(t, { A: () => s });
        let s = (0, r(95255).A)("Globe", [
          ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
          [
            "path",
            {
              d: "M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20",
              key: "13o1zl",
            },
          ],
          ["path", { d: "M2 12h20", key: "9i4pu4" }],
        ]);
      },
      99927: (e, t, r) => {
        "use strict";
        r.d(t, { A: () => s });
        let s = (0, r(95255).A)("Link", [
          [
            "path",
            {
              d: "M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71",
              key: "1cjeqo",
            },
          ],
          [
            "path",
            {
              d: "M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71",
              key: "19qd67",
            },
          ],
        ]);
      },
    });
  var t = require("../../../../webpack-runtime.js");
  t.C(e);
  var r = (e) => t((t.s = e)),
    s = t.X(
      0,
      [
        827, 6518, 2033, 4027, 2872, 7713, 5149, 8859, 1655, 8029, 5728, 7393,
        1502, 7052, 4630, 1603,
      ],
      () => r(1628),
    );
  module.exports = s;
})();
//# sourceMappingURL=page.js.map
