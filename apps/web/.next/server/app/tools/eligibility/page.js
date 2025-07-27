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
    (e._sentryDebugIds[r] = "eeb0675a-9e52-403c-8bd5-2eaf863b3b54"),
    (e._sentryDebugIdIdentifier =
      "sentry-dbid-eeb0675a-9e52-403c-8bd5-2eaf863b3b54"));
} catch (e) {}
(() => {
  var e = {};
  (e.id = 9512),
    (e.ids = [9512]),
    (e.modules = {
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
              Wu: () => f,
              ZB: () => c,
              Zp: () => d,
              aR: () => u,
              wL: () => m,
            });
            var a = t(61268),
              o = t(55728),
              i = t(84205),
              n = t(15942),
              l = e([n]);
            n = (l.then ? (await l)() : l)[0];
            let d = i.forwardRef(({ className: e, ...r }, t) =>
              (0, a.jsx)(o.P.div, {
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
            let u = i.forwardRef(({ className: e, ...r }, t) =>
              (0, a.jsx)("div", {
                ref: t,
                className: (0, n.cn)("flex flex-col space-y-1.5 p-6", e),
                ...r,
              }),
            );
            u.displayName = "CardHeader";
            let c = i.forwardRef(({ className: e, ...r }, t) =>
              (0, a.jsx)("h3", {
                ref: t,
                className: (0, n.cn)(
                  "text-2xl font-semibold leading-none tracking-tight",
                  e,
                ),
                ...r,
              }),
            );
            c.displayName = "CardTitle";
            let p = i.forwardRef(({ className: e, ...r }, t) =>
              (0, a.jsx)("p", {
                ref: t,
                className: (0, n.cn)("text-sm text-muted-foreground", e),
                ...r,
              }),
            );
            p.displayName = "CardDescription";
            let f = i.forwardRef(({ className: e, ...r }, t) =>
              (0, a.jsx)("div", {
                ref: t,
                className: (0, n.cn)("p-6 pt-0", e),
                ...r,
              }),
            );
            f.displayName = "CardContent";
            let m = i.forwardRef(({ className: e, ...r }, t) =>
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
      7839: (e, r, t) => {
        "use strict";
        t.d(r, { jH: () => o });
        var s = t(84205);
        t(61268);
        var a = s.createContext(void 0);
        function o(e) {
          let r = s.useContext(a);
          return e || r || "ltr";
        }
      },
      8086: (e) => {
        "use strict";
        e.exports = require("module");
      },
      10308: (e, r, t) => {
        "use strict";
        t.d(r, { c: () => a });
        var s = t(84205);
        function a(e) {
          let r = s.useRef(e);
          return (
            s.useEffect(() => {
              r.current = e;
            }),
            s.useMemo(
              () =>
                (...e) =>
                  r.current?.(...e),
              [],
            )
          );
        }
      },
      10846: (e) => {
        "use strict";
        e.exports = require("next/dist/compiled/next-server/app-page.runtime.prod.js");
      },
      16979: (e, r, t) => {
        "use strict";
        t.a(e, async (e, s) => {
          try {
            t.d(r, { J: () => l });
            var a = t(61268),
              o = t(30595);
            t(84205);
            var i = t(15942),
              n = e([i]);
            function l({ className: e, ...r }) {
              return (0, a.jsx)(o.b, {
                "data-slot": "label",
                className: (0, i.cn)(
                  "flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
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
      19121: (e) => {
        "use strict";
        e.exports = require("next/dist/server/app-render/action-async-storage.external.js");
      },
      19688: (e, r, t) => {
        "use strict";
        t.d(r, { A: () => s });
        let s = (0, t(95255).A)("XCircle", [
          ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
          ["path", { d: "m15 9-6 6", key: "1uzhvr" }],
          ["path", { d: "m9 9 6 6", key: "z0biqf" }],
        ]);
      },
      19771: (e) => {
        "use strict";
        e.exports = require("process");
      },
      21820: (e) => {
        "use strict";
        e.exports = require("os");
      },
      24172: (e, r, t) => {
        "use strict";
        t.r(r),
          t.d(r, {
            GlobalError: () => o.default,
            __next_app__: () => u,
            pages: () => d,
            routeModule: () => c,
            tree: () => l,
          });
        var s = t(11610),
          a = t(51293),
          o = t(59059),
          i = t(17770),
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
        t.d(r, n);
        let l = {
            children: [
              "",
              {
                children: [
                  "tools",
                  {
                    children: [
                      "eligibility",
                      {
                        children: [
                          "__PAGE__",
                          {},
                          {
                            page: [
                              () => Promise.resolve().then(t.bind(t, 92187)),
                              "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\tools\\eligibility\\page.tsx",
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
            "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\tools\\eligibility\\page.tsx",
          ],
          u = { require: t, loadChunk: () => Promise.resolve() },
          c = new s.AppPageRouteModule({
            definition: {
              kind: a.RouteKind.APP_PAGE,
              page: "/tools/eligibility/page",
              pathname: "/tools/eligibility",
              bundlePath: "",
              filename: "",
              appPaths: [],
            },
            userland: { loaderTree: l },
          });
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
      42414: (e, r, t) => {
        "use strict";
        t.d(r, { B: () => l });
        var s,
          a = t(84205),
          o = t(66130),
          i =
            (s || (s = t.t(a, 2)))[" useId ".trim().toString()] ||
            (() => void 0),
          n = 0;
        function l(e) {
          let [r, t] = a.useState(i());
          return (
            (0, o.N)(() => {
              e || t((e) => e ?? String(n++));
            }, [e]),
            e || (r ? `radix-${r}` : "")
          );
        }
      },
      44708: (e) => {
        "use strict";
        e.exports = require("node:https");
      },
      48161: (e) => {
        "use strict";
        e.exports = require("node:os");
      },
      49917: (e, r, t) => {
        "use strict";
        t.d(r, { C1: () => w, bL: () => y });
        var s = t(84205),
          a = t(18047),
          o = t(78593),
          i = t(61268),
          n = "Progress",
          [l, d] = (0, a.A)(n),
          [u, c] = l(n),
          p = s.forwardRef((e, r) => {
            var t, s;
            let {
              __scopeProgress: a,
              value: n = null,
              max: l,
              getValueLabel: d = x,
              ...c
            } = e;
            (l || 0 === l) &&
              !b(l) &&
              console.error(
                ((t = `${l}`),
                `Invalid prop \`max\` of value \`${t}\` supplied to \`Progress\`. Only numbers greater than 0 are valid max values. Defaulting to \`100\`.`),
              );
            let p = b(l) ? l : 100;
            null === n ||
              g(n, p) ||
              console.error(
                ((s = `${n}`),
                `Invalid prop \`value\` of value \`${s}\` supplied to \`Progress\`. The \`value\` prop must be:
  - a positive number
  - less than the value passed to \`max\` (or 100 if no \`max\` prop is set)
  - \`null\` or \`undefined\` if the progress is indeterminate.

Defaulting to \`null\`.`),
              );
            let f = g(n, p) ? n : null,
              m = h(f) ? d(f, p) : void 0;
            return (0, i.jsx)(u, {
              scope: a,
              value: f,
              max: p,
              children: (0, i.jsx)(o.sG.div, {
                "aria-valuemax": p,
                "aria-valuemin": 0,
                "aria-valuenow": h(f) ? f : void 0,
                "aria-valuetext": m,
                role: "progressbar",
                "data-state": v(f, p),
                "data-value": f ?? void 0,
                "data-max": p,
                ...c,
                ref: r,
              }),
            });
          });
        p.displayName = n;
        var f = "ProgressIndicator",
          m = s.forwardRef((e, r) => {
            let { __scopeProgress: t, ...s } = e,
              a = c(f, t);
            return (0, i.jsx)(o.sG.div, {
              "data-state": v(a.value, a.max),
              "data-value": a.value ?? void 0,
              "data-max": a.max,
              ...s,
              ref: r,
            });
          });
        function x(e, r) {
          return `${Math.round((e / r) * 100)}%`;
        }
        function v(e, r) {
          return null == e ? "indeterminate" : e === r ? "complete" : "loading";
        }
        function h(e) {
          return "number" == typeof e;
        }
        function b(e) {
          return h(e) && !isNaN(e) && e > 0;
        }
        function g(e, r) {
          return h(e) && !isNaN(e) && e <= r && e >= 0;
        }
        m.displayName = f;
        var y = p,
          w = m;
      },
      53053: (e) => {
        "use strict";
        e.exports = require("node:diagnostics_channel");
      },
      54884: (e, r, t) => {
        Promise.resolve().then(t.bind(t, 92187));
      },
      55511: (e) => {
        "use strict";
        e.exports = require("crypto");
      },
      56558: (e, r, t) => {
        "use strict";
        t.d(r, { hO: () => l, sG: () => n });
        var s = t(84205),
          a = t(90304),
          o = t(86415),
          i = t(61268),
          n = [
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
          ].reduce((e, r) => {
            let t = (0, o.TL)(`Primitive.${r}`),
              a = s.forwardRef((e, s) => {
                let { asChild: a, ...o } = e;
                return (
                  "undefined" != typeof window &&
                    (window[Symbol.for("radix-ui")] = !0),
                  (0, i.jsx)(a ? t : r, { ...o, ref: s })
                );
              });
            return (a.displayName = `Primitive.${r}`), { ...e, [r]: a };
          }, {});
        function l(e, r) {
          e && a.flushSync(() => e.dispatchEvent(r));
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
      59150: (e, r, t) => {
        "use strict";
        t.d(r, { RG: () => w, bL: () => I, q7: () => P });
        var s = t(84205),
          a = t(28777),
          o = t(28029),
          i = t(71604),
          n = t(18047),
          l = t(42414),
          d = t(78593),
          u = t(10308),
          c = t(48705),
          p = t(7839),
          f = t(61268),
          m = "rovingFocusGroup.onEntryFocus",
          x = { bubbles: !1, cancelable: !0 },
          v = "RovingFocusGroup",
          [h, b, g] = (0, o.N)(v),
          [y, w] = (0, n.A)(v, [g]),
          [j, N] = y(v),
          k = s.forwardRef((e, r) =>
            (0, f.jsx)(h.Provider, {
              scope: e.__scopeRovingFocusGroup,
              children: (0, f.jsx)(h.Slot, {
                scope: e.__scopeRovingFocusGroup,
                children: (0, f.jsx)(R, { ...e, ref: r }),
              }),
            }),
          );
        k.displayName = v;
        var R = s.forwardRef((e, r) => {
            let {
                __scopeRovingFocusGroup: t,
                orientation: o,
                loop: n = !1,
                dir: l,
                currentTabStopId: h,
                defaultCurrentTabStopId: g,
                onCurrentTabStopIdChange: y,
                onEntryFocus: w,
                preventScrollOnEntryFocus: N = !1,
                ...k
              } = e,
              R = s.useRef(null),
              q = (0, i.s)(r, R),
              C = (0, p.jH)(l),
              [A, I] = (0, c.i)({
                prop: h,
                defaultProp: g ?? null,
                onChange: y,
                caller: v,
              }),
              [P, S] = s.useState(!1),
              _ = (0, u.c)(w),
              D = b(t),
              F = s.useRef(!1),
              [G, L] = s.useState(0);
            return (
              s.useEffect(() => {
                let e = R.current;
                if (e)
                  return (
                    e.addEventListener(m, _), () => e.removeEventListener(m, _)
                  );
              }, [_]),
              (0, f.jsx)(j, {
                scope: t,
                orientation: o,
                dir: C,
                loop: n,
                currentTabStopId: A,
                onItemFocus: s.useCallback((e) => I(e), [I]),
                onItemShiftTab: s.useCallback(() => S(!0), []),
                onFocusableItemAdd: s.useCallback(() => L((e) => e + 1), []),
                onFocusableItemRemove: s.useCallback(() => L((e) => e - 1), []),
                children: (0, f.jsx)(d.sG.div, {
                  tabIndex: P || 0 === G ? -1 : 0,
                  "data-orientation": o,
                  ...k,
                  ref: q,
                  style: { outline: "none", ...e.style },
                  onMouseDown: (0, a.m)(e.onMouseDown, () => {
                    F.current = !0;
                  }),
                  onFocus: (0, a.m)(e.onFocus, (e) => {
                    let r = !F.current;
                    if (e.target === e.currentTarget && r && !P) {
                      let r = new CustomEvent(m, x);
                      if (
                        (e.currentTarget.dispatchEvent(r), !r.defaultPrevented)
                      ) {
                        let e = D().filter((e) => e.focusable);
                        E(
                          [
                            e.find((e) => e.active),
                            e.find((e) => e.id === A),
                            ...e,
                          ]
                            .filter(Boolean)
                            .map((e) => e.ref.current),
                          N,
                        );
                      }
                    }
                    F.current = !1;
                  }),
                  onBlur: (0, a.m)(e.onBlur, () => S(!1)),
                }),
              })
            );
          }),
          q = "RovingFocusGroupItem",
          C = s.forwardRef((e, r) => {
            let {
                __scopeRovingFocusGroup: t,
                focusable: o = !0,
                active: i = !1,
                tabStopId: n,
                children: u,
                ...c
              } = e,
              p = (0, l.B)(),
              m = n || p,
              x = N(q, t),
              v = x.currentTabStopId === m,
              g = b(t),
              {
                onFocusableItemAdd: y,
                onFocusableItemRemove: w,
                currentTabStopId: j,
              } = x;
            return (
              s.useEffect(() => {
                if (o) return y(), () => w();
              }, [o, y, w]),
              (0, f.jsx)(h.ItemSlot, {
                scope: t,
                id: m,
                focusable: o,
                active: i,
                children: (0, f.jsx)(d.sG.span, {
                  tabIndex: v ? 0 : -1,
                  "data-orientation": x.orientation,
                  ...c,
                  ref: r,
                  onMouseDown: (0, a.m)(e.onMouseDown, (e) => {
                    o ? x.onItemFocus(m) : e.preventDefault();
                  }),
                  onFocus: (0, a.m)(e.onFocus, () => x.onItemFocus(m)),
                  onKeyDown: (0, a.m)(e.onKeyDown, (e) => {
                    if ("Tab" === e.key && e.shiftKey)
                      return void x.onItemShiftTab();
                    if (e.target !== e.currentTarget) return;
                    let r = (function (e, r, t) {
                      var s;
                      let a =
                        ((s = e.key),
                        "rtl" !== t
                          ? s
                          : "ArrowLeft" === s
                            ? "ArrowRight"
                            : "ArrowRight" === s
                              ? "ArrowLeft"
                              : s);
                      if (
                        !(
                          "vertical" === r &&
                          ["ArrowLeft", "ArrowRight"].includes(a)
                        ) &&
                        !(
                          "horizontal" === r &&
                          ["ArrowUp", "ArrowDown"].includes(a)
                        )
                      )
                        return A[a];
                    })(e, x.orientation, x.dir);
                    if (void 0 !== r) {
                      if (e.metaKey || e.ctrlKey || e.altKey || e.shiftKey)
                        return;
                      e.preventDefault();
                      let t = g()
                        .filter((e) => e.focusable)
                        .map((e) => e.ref.current);
                      if ("last" === r) t.reverse();
                      else if ("prev" === r || "next" === r) {
                        "prev" === r && t.reverse();
                        let s = t.indexOf(e.currentTarget);
                        t = x.loop
                          ? (function (e, r) {
                              return e.map((t, s) => e[(r + s) % e.length]);
                            })(t, s + 1)
                          : t.slice(s + 1);
                      }
                      setTimeout(() => E(t));
                    }
                  }),
                  children:
                    "function" == typeof u
                      ? u({ isCurrentTabStop: v, hasTabStop: null != j })
                      : u,
                }),
              })
            );
          });
        C.displayName = q;
        var A = {
          ArrowLeft: "prev",
          ArrowUp: "prev",
          ArrowRight: "next",
          ArrowDown: "next",
          PageUp: "first",
          Home: "first",
          PageDown: "last",
          End: "last",
        };
        function E(e, r = !1) {
          let t = document.activeElement;
          for (let s of e)
            if (
              s === t ||
              (s.focus({ preventScroll: r }), document.activeElement !== t)
            )
              return;
        }
        var I = k,
          P = C;
      },
      63033: (e) => {
        "use strict";
        e.exports = require("next/dist/server/app-render/work-unit-async-storage.external.js");
      },
      67155: (e, r, t) => {
        "use strict";
        t.d(r, { Z: () => a });
        var s = t(84205);
        function a(e) {
          let r = s.useRef({ value: e, previous: e });
          return s.useMemo(
            () => (
              r.current.value !== e &&
                ((r.current.previous = r.current.value), (r.current.value = e)),
              r.current.previous
            ),
            [e],
          );
        }
      },
      70706: (e, r, t) => {
        "use strict";
        t.a(e, async (e, s) => {
          try {
            t.d(r, { C: () => u, z: () => d });
            var a = t(61268),
              o = t(90277),
              i = t(83659);
            t(84205);
            var n = t(15942),
              l = e([n]);
            function d({ className: e, ...r }) {
              return (0, a.jsx)(o.bL, {
                "data-slot": "radio-group",
                className: (0, n.cn)("grid gap-3", e),
                ...r,
              });
            }
            function u({ className: e, ...r }) {
              return (0, a.jsx)(o.q7, {
                "data-slot": "radio-group-item",
                className: (0, n.cn)(
                  "border-input text-primary focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive aspect-square size-4 shrink-0 rounded-full border shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
                  e,
                ),
                ...r,
                children: (0, a.jsx)(o.C1, {
                  "data-slot": "radio-group-indicator",
                  className: "relative flex items-center justify-center",
                  children: (0, a.jsx)(i.A, {
                    className:
                      "fill-primary absolute top-1/2 left-1/2 size-2 -translate-x-1/2 -translate-y-1/2",
                  }),
                }),
              });
            }
            (n = (l.then ? (await l)() : l)[0]), s();
          } catch (e) {
            s(e);
          }
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
      78852: (e, r, t) => {
        Promise.resolve().then(t.bind(t, 94401));
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
      83659: (e, r, t) => {
        "use strict";
        t.d(r, { A: () => s });
        let s = (0, t(95255).A)("Circle", [
          ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
        ]);
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
      86183: (e, r, t) => {
        "use strict";
        t.a(e, async (e, s) => {
          try {
            t.d(r, {
              C5: () => m,
              MJ: () => f,
              eI: () => c,
              lR: () => p,
              lV: () => x,
              zB: () => h,
            });
            var a = t(61268),
              o = t(86415),
              i = t(84205),
              n = t(36322),
              l = t(16979),
              d = t(15942),
              u = e([l, d]);
            [l, d] = u.then ? (await u)() : u;
            let x = n.Op,
              v = i.createContext({}),
              h = ({ ...e }) =>
                (0, a.jsx)(v.Provider, {
                  value: { name: e.name },
                  children: (0, a.jsx)(n.xI, { ...e }),
                }),
              b = () => {
                let e = i.useContext(v),
                  r = i.useContext(g),
                  { getFieldState: t } = (0, n.xW)(),
                  s = (0, n.lN)({ name: e.name }),
                  a = t(e.name, s);
                if (!e)
                  throw Error("useFormField should be used within <FormField>");
                let { id: o } = r;
                return {
                  id: o,
                  name: e.name,
                  formItemId: `${o}-form-item`,
                  formDescriptionId: `${o}-form-item-description`,
                  formMessageId: `${o}-form-item-message`,
                  ...a,
                };
              },
              g = i.createContext({});
            function c({ className: e, ...r }) {
              let t = i.useId();
              return (0, a.jsx)(g.Provider, {
                value: { id: t },
                children: (0, a.jsx)("div", {
                  "data-slot": "form-item",
                  className: (0, d.cn)("grid gap-2", e),
                  ...r,
                }),
              });
            }
            function p({ className: e, ...r }) {
              let { error: t, formItemId: s } = b();
              return (0, a.jsx)(l.J, {
                "data-slot": "form-label",
                "data-error": !!t,
                className: (0, d.cn)("data-[error=true]:text-destructive", e),
                htmlFor: s,
                ...r,
              });
            }
            function f({ ...e }) {
              let {
                error: r,
                formItemId: t,
                formDescriptionId: s,
                formMessageId: i,
              } = b();
              return (0, a.jsx)(o.DX, {
                "data-slot": "form-control",
                id: t,
                "aria-describedby": r ? `${s} ${i}` : `${s}`,
                "aria-invalid": !!r,
                ...e,
              });
            }
            function m({ className: e, ...r }) {
              let { error: t, formMessageId: s } = b(),
                o = t ? String(t?.message ?? "") : r.children;
              return o
                ? (0, a.jsx)("p", {
                    "data-slot": "form-message",
                    id: s,
                    className: (0, d.cn)("text-destructive text-sm", e),
                    ...r,
                    children: o,
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
      90277: (e, r, t) => {
        "use strict";
        t.d(r, { C1: () => T, bL: () => L, q7: () => $ });
        var s = t(84205),
          a = t(28777),
          o = t(71604),
          i = t(18047),
          n = t(78593),
          l = t(59150),
          d = t(48705),
          u = t(7839),
          c = t(91557),
          p = t(67155),
          f = t(94653),
          m = t(61268),
          x = "Radio",
          [v, h] = (0, i.A)(x),
          [b, g] = v(x),
          y = s.forwardRef((e, r) => {
            let {
                __scopeRadio: t,
                name: i,
                checked: l = !1,
                required: d,
                disabled: u,
                value: c = "on",
                onCheck: p,
                form: f,
                ...x
              } = e,
              [v, h] = s.useState(null),
              g = (0, o.s)(r, (e) => h(e)),
              y = s.useRef(!1),
              w = !v || f || !!v.closest("form");
            return (0, m.jsxs)(b, {
              scope: t,
              checked: l,
              disabled: u,
              children: [
                (0, m.jsx)(n.sG.button, {
                  type: "button",
                  role: "radio",
                  "aria-checked": l,
                  "data-state": k(l),
                  "data-disabled": u ? "" : void 0,
                  disabled: u,
                  value: c,
                  ...x,
                  ref: g,
                  onClick: (0, a.m)(e.onClick, (e) => {
                    l || p?.(),
                      w &&
                        ((y.current = e.isPropagationStopped()),
                        y.current || e.stopPropagation());
                  }),
                }),
                w &&
                  (0, m.jsx)(N, {
                    control: v,
                    bubbles: !y.current,
                    name: i,
                    value: c,
                    checked: l,
                    required: d,
                    disabled: u,
                    form: f,
                    style: { transform: "translateX(-100%)" },
                  }),
              ],
            });
          });
        y.displayName = x;
        var w = "RadioIndicator",
          j = s.forwardRef((e, r) => {
            let { __scopeRadio: t, forceMount: s, ...a } = e,
              o = g(w, t);
            return (0, m.jsx)(f.C, {
              present: s || o.checked,
              children: (0, m.jsx)(n.sG.span, {
                "data-state": k(o.checked),
                "data-disabled": o.disabled ? "" : void 0,
                ...a,
                ref: r,
              }),
            });
          });
        j.displayName = w;
        var N = s.forwardRef(
          (
            { __scopeRadio: e, control: r, checked: t, bubbles: a = !0, ...i },
            l,
          ) => {
            let d = s.useRef(null),
              u = (0, o.s)(d, l),
              f = (0, p.Z)(t),
              x = (0, c.X)(r);
            return (
              s.useEffect(() => {
                let e = d.current;
                if (!e) return;
                let r = Object.getOwnPropertyDescriptor(
                  window.HTMLInputElement.prototype,
                  "checked",
                ).set;
                if (f !== t && r) {
                  let s = new Event("click", { bubbles: a });
                  r.call(e, t), e.dispatchEvent(s);
                }
              }, [f, t, a]),
              (0, m.jsx)(n.sG.input, {
                type: "radio",
                "aria-hidden": !0,
                defaultChecked: t,
                ...i,
                tabIndex: -1,
                ref: u,
                style: {
                  ...i.style,
                  ...x,
                  position: "absolute",
                  pointerEvents: "none",
                  opacity: 0,
                  margin: 0,
                },
              })
            );
          },
        );
        function k(e) {
          return e ? "checked" : "unchecked";
        }
        N.displayName = "RadioBubbleInput";
        var R = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"],
          q = "RadioGroup",
          [C, A] = (0, i.A)(q, [l.RG, h]),
          E = (0, l.RG)(),
          I = h(),
          [P, S] = C(q),
          _ = s.forwardRef((e, r) => {
            let {
                __scopeRadioGroup: t,
                name: s,
                defaultValue: a,
                value: o,
                required: i = !1,
                disabled: c = !1,
                orientation: p,
                dir: f,
                loop: x = !0,
                onValueChange: v,
                ...h
              } = e,
              b = E(t),
              g = (0, u.jH)(f),
              [y, w] = (0, d.i)({
                prop: o,
                defaultProp: a ?? null,
                onChange: v,
                caller: q,
              });
            return (0, m.jsx)(P, {
              scope: t,
              name: s,
              required: i,
              disabled: c,
              value: y,
              onValueChange: w,
              children: (0, m.jsx)(l.bL, {
                asChild: !0,
                ...b,
                orientation: p,
                dir: g,
                loop: x,
                children: (0, m.jsx)(n.sG.div, {
                  role: "radiogroup",
                  "aria-required": i,
                  "aria-orientation": p,
                  "data-disabled": c ? "" : void 0,
                  dir: g,
                  ...h,
                  ref: r,
                }),
              }),
            });
          });
        _.displayName = q;
        var D = "RadioGroupItem",
          F = s.forwardRef((e, r) => {
            let { __scopeRadioGroup: t, disabled: i, ...n } = e,
              d = S(D, t),
              u = d.disabled || i,
              c = E(t),
              p = I(t),
              f = s.useRef(null),
              x = (0, o.s)(r, f),
              v = d.value === n.value,
              h = s.useRef(!1);
            return (
              s.useEffect(() => {
                let e = (e) => {
                    R.includes(e.key) && (h.current = !0);
                  },
                  r = () => (h.current = !1);
                return (
                  document.addEventListener("keydown", e),
                  document.addEventListener("keyup", r),
                  () => {
                    document.removeEventListener("keydown", e),
                      document.removeEventListener("keyup", r);
                  }
                );
              }, []),
              (0, m.jsx)(l.q7, {
                asChild: !0,
                ...c,
                focusable: !u,
                active: v,
                children: (0, m.jsx)(y, {
                  disabled: u,
                  required: d.required,
                  checked: v,
                  ...p,
                  ...n,
                  name: d.name,
                  ref: x,
                  onCheck: () => d.onValueChange(n.value),
                  onKeyDown: (0, a.m)((e) => {
                    "Enter" === e.key && e.preventDefault();
                  }),
                  onFocus: (0, a.m)(n.onFocus, () => {
                    h.current && f.current?.click();
                  }),
                }),
              })
            );
          });
        F.displayName = D;
        var G = s.forwardRef((e, r) => {
          let { __scopeRadioGroup: t, ...s } = e,
            a = I(t);
          return (0, m.jsx)(j, { ...a, ...s, ref: r });
        });
        G.displayName = "RadioGroupIndicator";
        var L = _,
          $ = F,
          T = G;
      },
      91557: (e, r, t) => {
        "use strict";
        t.d(r, { X: () => o });
        var s = t(84205),
          a = t(66130);
        function o(e) {
          let [r, t] = s.useState(void 0);
          return (
            (0, a.N)(() => {
              if (e) {
                t({ width: e.offsetWidth, height: e.offsetHeight });
                let r = new ResizeObserver((r) => {
                  let s, a;
                  if (!Array.isArray(r) || !r.length) return;
                  let o = r[0];
                  if ("borderBoxSize" in o) {
                    let e = o.borderBoxSize,
                      r = Array.isArray(e) ? e[0] : e;
                    (s = r.inlineSize), (a = r.blockSize);
                  } else (s = e.offsetWidth), (a = e.offsetHeight);
                  t({ width: s, height: a });
                });
                return (
                  r.observe(e, { box: "border-box" }), () => r.unobserve(e)
                );
              }
              t(void 0);
            }, [e]),
            r
          );
        }
      },
      92187: (e, r, t) => {
        "use strict";
        let s;
        t.r(r),
          t.d(r, {
            default: () => f,
            generateImageMetadata: () => c,
            generateMetadata: () => u,
            generateViewport: () => p,
          });
        var a = t(63033),
          o = t(26394),
          i = t(60442),
          n = (0, o.registerClientReference)(
            function () {
              throw Error(
                "Attempted to call the default export of \"E:\\\\downloads\\\\Hijraah\\\\apps\\\\web\\\\src\\\\app\\\\tools\\\\eligibility\\\\page.tsx\" from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
              );
            },
            "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\tools\\eligibility\\page.tsx",
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
                  let s, a, o;
                  try {
                    let e = d?.getStore();
                    (s = e?.headers.get("sentry-trace") ?? void 0),
                      (a = e?.headers.get("baggage") ?? void 0),
                      (o = e?.headers);
                  } catch (e) {}
                  return i
                    .wrapServerComponentWithSentry(e, {
                      componentRoute: "/tools/eligibility",
                      componentType: "Page",
                      sentryTraceHeader: s,
                      baggageHeader: a,
                      headers: o,
                    })
                    .apply(r, t);
                },
              })
            : n;
        let u = void 0,
          c = void 0,
          p = void 0,
          f = s;
      },
      92256: (e, r, t) => {
        "use strict";
        t.a(e, async (e, s) => {
          try {
            t.d(r, { k: () => d });
            var a = t(61268),
              o = t(49917),
              i = t(84205),
              n = t(15942),
              l = e([n]);
            n = (l.then ? (await l)() : l)[0];
            let d = i.forwardRef(({ className: e, value: r, ...t }, s) =>
              (0, a.jsx)(o.bL, {
                ref: s,
                className: (0, n.cn)(
                  "relative h-2 w-full overflow-hidden rounded-full bg-secondary",
                  e,
                ),
                ...t,
                children: (0, a.jsx)(o.C1, {
                  className: "h-full w-full flex-1 bg-primary transition-all",
                  style: { transform: `translateX(-${100 - (r || 0)}%)` },
                }),
              }),
            );
            (d.displayName = o.bL.displayName), s();
          } catch (e) {
            s(e);
          }
        });
      },
      94401: (e, r, t) => {
        "use strict";
        t.a(e, async (e, s) => {
          try {
            t.r(r), t.d(r, { default: () => h });
            var a = t(61268),
              o = t(97052),
              i = t(98683),
              n = t(19688),
              l = t(84205),
              d = t(36322),
              u = t(36352),
              c = t(28909),
              p = t(5451),
              f = t(86183),
              m = t(92256),
              x = t(70706),
              v = e([c, p, f, m, x]);
            [c, p, f, m, x] = v.then ? (await v)() : v;
            let b = [
                {
                  id: "age",
                  question: "What is your age group?",
                  options: [
                    { value: "18-24", label: "18-24 years" },
                    { value: "25-34", label: "25-34 years" },
                    { value: "35-44", label: "35-44 years" },
                    { value: "45-plus", label: "45 years or older" },
                  ],
                },
                {
                  id: "education",
                  question: "What is your highest level of education?",
                  options: [
                    { value: "high-school", label: "High School" },
                    { value: "bachelors", label: "Bachelor&apos;s Degree" },
                    { value: "masters", label: "Master&apos;s Degree" },
                    { value: "phd", label: "PhD or Doctorate" },
                  ],
                },
                {
                  id: "experience",
                  question: "How many years of work experience do you have?",
                  options: [
                    { value: "0-2", label: "0-2 years" },
                    { value: "3-5", label: "3-5 years" },
                    { value: "6-10", label: "6-10 years" },
                    { value: "10-plus", label: "10+ years" },
                  ],
                },
                {
                  id: "language",
                  question: "What is your English language proficiency?",
                  options: [
                    { value: "basic", label: "Basic" },
                    { value: "intermediate", label: "Intermediate" },
                    { value: "advanced", label: "Advanced" },
                    { value: "native", label: "Native/Bilingual" },
                  ],
                },
              ],
              g = u.Ik({
                age: u.Yj(),
                education: u.Yj(),
                experience: u.Yj(),
                language: u.Yj(),
              });
            function h() {
              let [e, r] = (0, l.useState)(0),
                [t, s] = (0, l.useState)(!1),
                u = (0, d.mN)({ resolver: (0, o.u)(g) }),
                v = ((e + 1) / b.length) * 100,
                h = (e) => {
                  let r = 0;
                  return (
                    "25-34" === e.age && (r += 25),
                    ("masters" === e.education || "phd" === e.education) &&
                      (r += 25),
                    ("6-10" === e.experience || "10-plus" === e.experience) &&
                      (r += 25),
                    ("advanced" === e.language || "native" === e.language) &&
                      (r += 25),
                    r
                  );
                };
              return (0, a.jsx)("div", {
                className: "container max-w-2xl py-12",
                children: (0, a.jsx)(p.Zp, {
                  className: "p-6",
                  children: t
                    ? (0, a.jsxs)("div", {
                        className: "text-center",
                        children: [
                          (0, a.jsxs)("div", {
                            className: "mb-6",
                            children: [
                              h(u.getValues()) >= 75
                                ? (0, a.jsx)(i.A, {
                                    className:
                                      "w-16 h-16 text-green-500 mx-auto mb-4",
                                  })
                                : (0, a.jsx)(n.A, {
                                    className:
                                      "w-16 h-16 text-red-500 mx-auto mb-4",
                                  }),
                              (0, a.jsx)("h2", {
                                className: "text-2xl font-bold mb-2",
                                children: "Assessment Results",
                              }),
                              (0, a.jsx)("p", {
                                className: "text-muted-foreground",
                                children:
                                  "Based on your responses, here's your eligibility assessment:",
                              }),
                            ],
                          }),
                          (0, a.jsxs)("div", {
                            className: "mb-8",
                            children: [
                              (0, a.jsxs)("div", {
                                className: "text-4xl font-bold mb-2",
                                children: [h(u.getValues()), "%"],
                              }),
                              (0, a.jsx)("p", {
                                className: "text-sm text-muted-foreground",
                                children: "Eligibility Score",
                              }),
                            ],
                          }),
                          (0, a.jsxs)("div", {
                            className: "space-y-4",
                            children: [
                              (0, a.jsx)("p", {
                                className: "text-sm",
                                children:
                                  h(u.getValues()) >= 75
                                    ? "You appear to be eligible for immigration programs. We recommend proceeding with your application."
                                    : "You might need to improve certain aspects to increase your eligibility. Consider consulting with an immigration expert.",
                              }),
                              (0, a.jsx)(c.$, {
                                onClick: () => {
                                  s(!1), r(0), u.reset();
                                },
                                children: "Start Over",
                              }),
                            ],
                          }),
                        ],
                      })
                    : (0, a.jsxs)(a.Fragment, {
                        children: [
                          (0, a.jsxs)("div", {
                            className: "mb-8",
                            children: [
                              (0, a.jsx)("h1", {
                                className: "text-2xl font-bold mb-2",
                                children: "Eligibility Assessment",
                              }),
                              (0, a.jsx)(m.k, { value: v, className: "h-2" }),
                              (0, a.jsxs)("p", {
                                className: "text-sm text-muted-foreground mt-2",
                                children: [
                                  "Question ",
                                  e + 1,
                                  " of ",
                                  b.length,
                                ],
                              }),
                            ],
                          }),
                          (0, a.jsx)(f.lV, {
                            ...u,
                            children: (0, a.jsxs)("form", {
                              onSubmit: u.handleSubmit((t) => {
                                e < b.length - 1 ? r(e + 1) : s(!0);
                              }),
                              className: "space-y-6",
                              children: [
                                (0, a.jsx)(f.zB, {
                                  control: u.control,
                                  name: b[e].id,
                                  render: ({ field: r }) =>
                                    (0, a.jsxs)(f.eI, {
                                      className: "space-y-3",
                                      children: [
                                        (0, a.jsx)(f.lR, {
                                          children: b[e].question,
                                        }),
                                        (0, a.jsx)(f.MJ, {
                                          children: (0, a.jsx)(x.z, {
                                            onValueChange: r.onChange,
                                            defaultValue: r.value,
                                            className:
                                              "flex flex-col space-y-1",
                                            children: b[e].options.map((e) =>
                                              (0, a.jsxs)(
                                                f.eI,
                                                {
                                                  className:
                                                    "flex items-center space-x-3 space-y-0",
                                                  children: [
                                                    (0, a.jsx)(f.MJ, {
                                                      children: (0, a.jsx)(
                                                        x.C,
                                                        { value: e.value },
                                                      ),
                                                    }),
                                                    (0, a.jsx)(f.lR, {
                                                      className: "font-normal",
                                                      children: e.label,
                                                    }),
                                                  ],
                                                },
                                                e.value,
                                              ),
                                            ),
                                          }),
                                        }),
                                      ],
                                    }),
                                }),
                                (0, a.jsx)(c.$, {
                                  type: "submit",
                                  children:
                                    e === b.length - 1 ? "Submit" : "Next",
                                }),
                              ],
                            }),
                          }),
                        ],
                      }),
                }),
              });
            }
            s();
          } catch (e) {
            s(e);
          }
        });
      },
      94735: (e) => {
        "use strict";
        e.exports = require("events");
      },
      95255: (e, r, t) => {
        "use strict";
        t.d(r, { A: () => i });
        var s = t(84205),
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
        let o = (e) =>
            e
              .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
              .toLowerCase()
              .trim(),
          i = (e, r) => {
            let t = (0, s.forwardRef)(
              (
                {
                  color: t = "currentColor",
                  size: i = 24,
                  strokeWidth: n = 2,
                  absoluteStrokeWidth: l,
                  className: d = "",
                  children: u,
                  ...c
                },
                p,
              ) =>
                (0, s.createElement)(
                  "svg",
                  {
                    ref: p,
                    ...a,
                    width: i,
                    height: i,
                    stroke: t,
                    strokeWidth: l ? (24 * Number(n)) / Number(i) : n,
                    className: ["lucide", `lucide-${o(e)}`, d].join(" "),
                    ...c,
                  },
                  [
                    ...r.map(([e, r]) => (0, s.createElement)(e, r)),
                    ...(Array.isArray(u) ? u : [u]),
                  ],
                ),
            );
            return (t.displayName = `${e}`), t;
          };
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
      [827, 6518, 2033, 4027, 8859, 8029, 5728, 1502, 7052, 4630],
      () => t(24172),
    );
  module.exports = s;
})();
//# sourceMappingURL=page.js.map
