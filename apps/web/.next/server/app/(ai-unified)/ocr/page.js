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
    (e._sentryDebugIds[t] = "ab58e2a2-25cc-4a5f-a4d9-c574ac453836"),
    (e._sentryDebugIdIdentifier =
      "sentry-dbid-ab58e2a2-25cc-4a5f-a4d9-c574ac453836"));
} catch (e) {}
(() => {
  var e = {};
  (e.id = 3252),
    (e.ids = [3252]),
    (e.modules = {
      415: (e, t, r) => {
        "use strict";
        r.d(t, { A: () => s });
        let s = (0, r(95255).A)("Check", [
          ["path", { d: "M20 6 9 17l-5-5", key: "1gmf2c" }],
        ]);
      },
      1523: (e, t) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          !(function (e, t) {
            for (var r in t)
              Object.defineProperty(e, r, { enumerable: !0, get: t[r] });
          })(t, {
            cancelIdleCallback: function () {
              return s;
            },
            requestIdleCallback: function () {
              return r;
            },
          });
        let r =
            ("undefined" != typeof self &&
              self.requestIdleCallback &&
              self.requestIdleCallback.bind(window)) ||
            function (e) {
              let t = Date.now();
              return self.setTimeout(function () {
                e({
                  didTimeout: !1,
                  timeRemaining: function () {
                    return Math.max(0, 50 - (Date.now() - t));
                  },
                });
              }, 1);
            },
          s =
            ("undefined" != typeof self &&
              self.cancelIdleCallback &&
              self.cancelIdleCallback.bind(window)) ||
            function (e) {
              return clearTimeout(e);
            };
        ("function" == typeof t.default ||
          ("object" == typeof t.default && null !== t.default)) &&
          void 0 === t.default.__esModule &&
          (Object.defineProperty(t.default, "__esModule", { value: !0 }),
          Object.assign(t.default, t),
          (e.exports = t.default));
      },
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
              BT: () => p,
              Wu: () => f,
              ZB: () => u,
              Zp: () => d,
              aR: () => c,
              wL: () => m,
            });
            var n = r(61268),
              a = r(55728),
              o = r(84205),
              i = r(15942),
              l = e([i]);
            i = (l.then ? (await l)() : l)[0];
            let d = o.forwardRef(({ className: e, ...t }, r) =>
              (0, n.jsx)(a.P.div, {
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
            d.displayName = "Card";
            let c = o.forwardRef(({ className: e, ...t }, r) =>
              (0, n.jsx)("div", {
                ref: r,
                className: (0, i.cn)("flex flex-col space-y-1.5 p-6", e),
                ...t,
              }),
            );
            c.displayName = "CardHeader";
            let u = o.forwardRef(({ className: e, ...t }, r) =>
              (0, n.jsx)("h3", {
                ref: r,
                className: (0, i.cn)(
                  "text-2xl font-semibold leading-none tracking-tight",
                  e,
                ),
                ...t,
              }),
            );
            u.displayName = "CardTitle";
            let p = o.forwardRef(({ className: e, ...t }, r) =>
              (0, n.jsx)("p", {
                ref: r,
                className: (0, i.cn)("text-sm text-muted-foreground", e),
                ...t,
              }),
            );
            p.displayName = "CardDescription";
            let f = o.forwardRef(({ className: e, ...t }, r) =>
              (0, n.jsx)("div", {
                ref: r,
                className: (0, i.cn)("p-6 pt-0", e),
                ...t,
              }),
            );
            f.displayName = "CardContent";
            let m = o.forwardRef(({ className: e, ...t }, r) =>
              (0, n.jsx)("div", {
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
      5727: (e, t, r) => {
        Promise.resolve().then(r.bind(r, 58897)),
          Promise.resolve().then(r.bind(r, 79446)),
          Promise.resolve().then(r.bind(r, 10695)),
          Promise.resolve().then(r.bind(r, 43691)),
          Promise.resolve().then(r.bind(r, 47350));
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
      9235: (e, t, r) => {
        "use strict";
        r.d(t, { C1: () => C, bL: () => j });
        var s = r(84205),
          n = r(71604),
          a = r(18047),
          o = r(28777),
          i = r(48705),
          l = r(67155),
          d = r(91557),
          c = r(94653),
          u = r(78593),
          p = r(61268),
          f = "Checkbox",
          [m, h] = (0, a.A)(f),
          [b, x] = m(f);
        function g(e) {
          let {
              __scopeCheckbox: t,
              checked: r,
              children: n,
              defaultChecked: a,
              disabled: o,
              form: l,
              name: d,
              onCheckedChange: c,
              required: u,
              value: m = "on",
              internal_do_not_use_render: h,
            } = e,
            [x, g] = (0, i.i)({
              prop: r,
              defaultProp: a ?? !1,
              onChange: c,
              caller: f,
            }),
            [v, y] = s.useState(null),
            [j, w] = s.useState(null),
            C = s.useRef(!1),
            R = !v || !!l || !!v.closest("form"),
            N = {
              checked: x,
              disabled: o,
              setChecked: g,
              control: v,
              setControl: y,
              name: d,
              form: l,
              value: m,
              hasConsumerStoppedPropagationRef: C,
              required: u,
              defaultChecked: !S(a) && a,
              isFormControl: R,
              bubbleInput: j,
              setBubbleInput: w,
            };
          return (0, p.jsx)(b, {
            scope: t,
            ...N,
            children: "function" == typeof h ? h(N) : n,
          });
        }
        var v = "CheckboxTrigger",
          y = s.forwardRef(
            ({ __scopeCheckbox: e, onKeyDown: t, onClick: r, ...a }, i) => {
              let {
                  control: l,
                  value: d,
                  disabled: c,
                  checked: f,
                  required: m,
                  setControl: h,
                  setChecked: b,
                  hasConsumerStoppedPropagationRef: g,
                  isFormControl: y,
                  bubbleInput: j,
                } = x(v, e),
                w = (0, n.s)(i, h),
                C = s.useRef(f);
              return (
                s.useEffect(() => {
                  let e = l?.form;
                  if (e) {
                    let t = () => b(C.current);
                    return (
                      e.addEventListener("reset", t),
                      () => e.removeEventListener("reset", t)
                    );
                  }
                }, [l, b]),
                (0, p.jsx)(u.sG.button, {
                  type: "button",
                  role: "checkbox",
                  "aria-checked": S(f) ? "mixed" : f,
                  "aria-required": m,
                  "data-state": E(f),
                  "data-disabled": c ? "" : void 0,
                  disabled: c,
                  value: d,
                  ...a,
                  ref: w,
                  onKeyDown: (0, o.m)(t, (e) => {
                    "Enter" === e.key && e.preventDefault();
                  }),
                  onClick: (0, o.m)(r, (e) => {
                    b((e) => !!S(e) || !e),
                      j &&
                        y &&
                        ((g.current = e.isPropagationStopped()),
                        g.current || e.stopPropagation());
                  }),
                })
              );
            },
          );
        y.displayName = v;
        var j = s.forwardRef((e, t) => {
          let {
            __scopeCheckbox: r,
            name: s,
            checked: n,
            defaultChecked: a,
            required: o,
            disabled: i,
            value: l,
            onCheckedChange: d,
            form: c,
            ...u
          } = e;
          return (0, p.jsx)(g, {
            __scopeCheckbox: r,
            checked: n,
            defaultChecked: a,
            disabled: i,
            required: o,
            onCheckedChange: d,
            name: s,
            form: c,
            value: l,
            internal_do_not_use_render: ({ isFormControl: e }) =>
              (0, p.jsxs)(p.Fragment, {
                children: [
                  (0, p.jsx)(y, { ...u, ref: t, __scopeCheckbox: r }),
                  e && (0, p.jsx)(N, { __scopeCheckbox: r }),
                ],
              }),
          });
        });
        j.displayName = f;
        var w = "CheckboxIndicator",
          C = s.forwardRef((e, t) => {
            let { __scopeCheckbox: r, forceMount: s, ...n } = e,
              a = x(w, r);
            return (0, p.jsx)(c.C, {
              present: s || S(a.checked) || !0 === a.checked,
              children: (0, p.jsx)(u.sG.span, {
                "data-state": E(a.checked),
                "data-disabled": a.disabled ? "" : void 0,
                ...n,
                ref: t,
                style: { pointerEvents: "none", ...e.style },
              }),
            });
          });
        C.displayName = w;
        var R = "CheckboxBubbleInput",
          N = s.forwardRef(({ __scopeCheckbox: e, ...t }, r) => {
            let {
                control: a,
                hasConsumerStoppedPropagationRef: o,
                checked: i,
                defaultChecked: c,
                required: f,
                disabled: m,
                name: h,
                value: b,
                form: g,
                bubbleInput: v,
                setBubbleInput: y,
              } = x(R, e),
              j = (0, n.s)(r, y),
              w = (0, l.Z)(i),
              C = (0, d.X)(a);
            s.useEffect(() => {
              if (!v) return;
              let e = Object.getOwnPropertyDescriptor(
                  window.HTMLInputElement.prototype,
                  "checked",
                ).set,
                t = !o.current;
              if (w !== i && e) {
                let r = new Event("click", { bubbles: t });
                (v.indeterminate = S(i)),
                  e.call(v, !S(i) && i),
                  v.dispatchEvent(r);
              }
            }, [v, w, i, o]);
            let N = s.useRef(!S(i) && i);
            return (0, p.jsx)(u.sG.input, {
              type: "checkbox",
              "aria-hidden": !0,
              defaultChecked: c ?? N.current,
              required: f,
              disabled: m,
              name: h,
              value: b,
              form: g,
              ...t,
              tabIndex: -1,
              ref: j,
              style: {
                ...t.style,
                ...C,
                position: "absolute",
                pointerEvents: "none",
                opacity: 0,
                margin: 0,
                transform: "translateX(-100%)",
              },
            });
          });
        function S(e) {
          return "indeterminate" === e;
        }
        function E(e) {
          return S(e) ? "indeterminate" : e ? "checked" : "unchecked";
        }
        N.displayName = R;
      },
      10695: (e, t, r) => {
        "use strict";
        r.d(t, { MistralOcrUploader: () => s });
        let s = (0, r(26394).registerClientReference)(
          function () {
            throw Error(
              "Attempted to call MistralOcrUploader() from the server but MistralOcrUploader is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\apps\\web\\src\\components\\ui\\document\\MistralOcrUploader.tsx",
          "MistralOcrUploader",
        );
      },
      10846: (e) => {
        "use strict";
        e.exports = require("next/dist/compiled/next-server/app-page.runtime.prod.js");
      },
      11316: (e, t, r) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          Object.defineProperty(t, "notFound", {
            enumerable: !0,
            get: function () {
              return n;
            },
          });
        let s = "" + r(17581).HTTP_ERROR_FALLBACK_ERROR_CODE + ";404";
        function n() {
          let e = Object.defineProperty(Error(s), "__NEXT_ERROR_CODE", {
            value: "E394",
            enumerable: !1,
            configurable: !0,
          });
          throw ((e.digest = s), e);
        }
        ("function" == typeof t.default ||
          ("object" == typeof t.default && null !== t.default)) &&
          void 0 === t.default.__esModule &&
          (Object.defineProperty(t.default, "__esModule", { value: !0 }),
          Object.assign(t.default, t),
          (e.exports = t.default));
      },
      11997: (e) => {
        "use strict";
        e.exports = require("punycode");
      },
      13242: (e, t, r) => {
        "use strict";
        r.d(t, { F: () => n });
        var s = r(61268);
        r(84205);
        let n = ({ children: e, className: t, ...r }) =>
          (0, s.jsx)("div", {
            className: `overflow-auto ${t || ""}`,
            ...r,
            children: e,
          });
      },
      14604: (e, t, r) => {
        let { createProxy: s } = r(85493);
        e.exports = s(
          "E:\\downloads\\Hijraah\\node_modules\\.pnpm\\next@15.3.0-canary.31_@babe_be67f368de2727c847f3a61f5e6cf4fa\\node_modules\\next\\dist\\client\\script.js",
        );
      },
      14749: (e, t, r) => {
        "use strict";
        function s() {
          throw Object.defineProperty(
            Error(
              "`forbidden()` is experimental and only allowed to be enabled when `experimental.authInterrupts` is enabled.",
            ),
            "__NEXT_ERROR_CODE",
            { value: "E488", enumerable: !1, configurable: !0 },
          );
        }
        Object.defineProperty(t, "__esModule", { value: !0 }),
          Object.defineProperty(t, "forbidden", {
            enumerable: !0,
            get: function () {
              return s;
            },
          }),
          r(17581).HTTP_ERROR_FALLBACK_ERROR_CODE,
          ("function" == typeof t.default ||
            ("object" == typeof t.default && null !== t.default)) &&
            void 0 === t.default.__esModule &&
            (Object.defineProperty(t.default, "__esModule", { value: !0 }),
            Object.assign(t.default, t),
            (e.exports = t.default));
      },
      14795: (e, t, r) => {
        "use strict";
        r.d(t, { j2: () => n });
        var s = r(84001);
        async function n() {
          return (await (0, s.WV)()).session;
        }
        r(57011), r(67761), r(29244);
      },
      14829: (e, t, r) => {
        "use strict";
        r.a(e, async (e, s) => {
          try {
            r.d(t, {
              BT: () => p,
              Wu: () => f,
              ZB: () => u,
              Zp: () => d,
              aR: () => c,
            });
            var n = r(35242),
              a = r(47350),
              o = r(84147),
              i = r(20716),
              l = e([i]);
            i = (l.then ? (await l)() : l)[0];
            let d = o.forwardRef(({ className: e, ...t }, r) =>
              (0, n.jsx)(a.motion.div, {
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
            d.displayName = "Card";
            let c = o.forwardRef(({ className: e, ...t }, r) =>
              (0, n.jsx)("div", {
                ref: r,
                className: (0, i.cn)("flex flex-col space-y-1.5 p-6", e),
                ...t,
              }),
            );
            c.displayName = "CardHeader";
            let u = o.forwardRef(({ className: e, ...t }, r) =>
              (0, n.jsx)("h3", {
                ref: r,
                className: (0, i.cn)(
                  "text-2xl font-semibold leading-none tracking-tight",
                  e,
                ),
                ...t,
              }),
            );
            u.displayName = "CardTitle";
            let p = o.forwardRef(({ className: e, ...t }, r) =>
              (0, n.jsx)("p", {
                ref: r,
                className: (0, i.cn)("text-sm text-muted-foreground", e),
                ...t,
              }),
            );
            p.displayName = "CardDescription";
            let f = o.forwardRef(({ className: e, ...t }, r) =>
              (0, n.jsx)("div", {
                ref: r,
                className: (0, i.cn)("p-6 pt-0", e),
                ...t,
              }),
            );
            (f.displayName = "CardContent"),
              (o.forwardRef(({ className: e, ...t }, r) =>
                (0, n.jsx)("div", {
                  ref: r,
                  className: (0, i.cn)("flex items-center p-6 pt-0", e),
                  ...t,
                }),
              ).displayName = "CardFooter"),
              s();
          } catch (e) {
            s(e);
          }
        });
      },
      16714: (e, t, r) => {
        "use strict";
        r.d(t, { AppSidebar: () => s });
        let s = (0, r(26394).registerClientReference)(
          function () {
            throw Error(
              "Attempted to call AppSidebar() from the server but AppSidebar is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\apps\\web\\src\\components\\ui\\app-sidebar.tsx",
          "AppSidebar",
        );
      },
      16979: (e, t, r) => {
        "use strict";
        r.a(e, async (e, s) => {
          try {
            r.d(t, { J: () => l });
            var n = r(61268),
              a = r(30595);
            r(84205);
            var o = r(15942),
              i = e([o]);
            function l({ className: e, ...t }) {
              return (0, n.jsx)(a.b, {
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
      20716: (e, t, r) => {
        "use strict";
        r.a(e, async (e, s) => {
          try {
            r.d(t, { cn: () => d, lk: () => c, p1: () => u });
            var n = r(85488),
              a = r(31399),
              o = r(63775),
              i = r(54710),
              l = e([n]);
            function d(...e) {
              return (0, i.QP)((0, o.$)(e));
            }
            function c() {
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
            function u() {
              var e = (0, n.generateId)(12);
              let t = (0, a.uP)(10);
              return (0, a.Y8)(e, t);
            }
            (n = (l.then ? (await l)() : l)[0]), s();
          } catch (e) {
            s(e);
          }
        });
      },
      21800: (e, t, r) => {
        Promise.resolve().then(r.bind(r, 16714)),
          Promise.resolve().then(r.bind(r, 98699)),
          Promise.resolve().then(r.bind(r, 29244)),
          Promise.resolve().then(r.t.bind(r, 14604, 23));
      },
      21820: (e) => {
        "use strict";
        e.exports = require("os");
      },
      23399: (e, t, r) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          Object.defineProperty(t, "unstable_rethrow", {
            enumerable: !0,
            get: function () {
              return function e(t) {
                if (
                  (0, o.isNextRouterError)(t) ||
                  (0, a.isBailoutToCSRError)(t) ||
                  (0, l.isDynamicServerError)(t) ||
                  (0, i.isDynamicPostpone)(t) ||
                  (0, n.isPostpone)(t) ||
                  (0, s.isHangingPromiseRejectionError)(t)
                )
                  throw t;
                t instanceof Error && "cause" in t && e(t.cause);
              };
            },
          });
        let s = r(6223),
          n = r(96124),
          a = r(58937),
          o = r(91613),
          i = r(62938),
          l = r(98800);
        ("function" == typeof t.default ||
          ("object" == typeof t.default && null !== t.default)) &&
          void 0 === t.default.__esModule &&
          (Object.defineProperty(t.default, "__esModule", { value: !0 }),
          Object.assign(t.default, t),
          (e.exports = t.default));
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
        r.d(t, { B8: () => k, UC: () => A, bL: () => _, l9: () => P });
        var s = r(84205),
          n = r(28777),
          a = r(18047),
          o = r(59150),
          i = r(94653),
          l = r(78593),
          d = r(7839),
          c = r(48705),
          u = r(42414),
          p = r(61268),
          f = "Tabs",
          [m, h] = (0, a.A)(f, [o.RG]),
          b = (0, o.RG)(),
          [x, g] = m(f),
          v = s.forwardRef((e, t) => {
            let {
                __scopeTabs: r,
                value: s,
                onValueChange: n,
                defaultValue: a,
                orientation: o = "horizontal",
                dir: i,
                activationMode: m = "automatic",
                ...h
              } = e,
              b = (0, d.jH)(i),
              [g, v] = (0, c.i)({
                prop: s,
                onChange: n,
                defaultProp: a ?? "",
                caller: f,
              });
            return (0, p.jsx)(x, {
              scope: r,
              baseId: (0, u.B)(),
              value: g,
              onValueChange: v,
              orientation: o,
              dir: b,
              activationMode: m,
              children: (0, p.jsx)(l.sG.div, {
                dir: b,
                "data-orientation": o,
                ...h,
                ref: t,
              }),
            });
          });
        v.displayName = f;
        var y = "TabsList",
          j = s.forwardRef((e, t) => {
            let { __scopeTabs: r, loop: s = !0, ...n } = e,
              a = g(y, r),
              i = b(r);
            return (0, p.jsx)(o.bL, {
              asChild: !0,
              ...i,
              orientation: a.orientation,
              dir: a.dir,
              loop: s,
              children: (0, p.jsx)(l.sG.div, {
                role: "tablist",
                "aria-orientation": a.orientation,
                ...n,
                ref: t,
              }),
            });
          });
        j.displayName = y;
        var w = "TabsTrigger",
          C = s.forwardRef((e, t) => {
            let { __scopeTabs: r, value: s, disabled: a = !1, ...i } = e,
              d = g(w, r),
              c = b(r),
              u = S(d.baseId, s),
              f = E(d.baseId, s),
              m = s === d.value;
            return (0, p.jsx)(o.q7, {
              asChild: !0,
              ...c,
              focusable: !a,
              active: m,
              children: (0, p.jsx)(l.sG.button, {
                type: "button",
                role: "tab",
                "aria-selected": m,
                "aria-controls": f,
                "data-state": m ? "active" : "inactive",
                "data-disabled": a ? "" : void 0,
                disabled: a,
                id: u,
                ...i,
                ref: t,
                onMouseDown: (0, n.m)(e.onMouseDown, (e) => {
                  a || 0 !== e.button || !1 !== e.ctrlKey
                    ? e.preventDefault()
                    : d.onValueChange(s);
                }),
                onKeyDown: (0, n.m)(e.onKeyDown, (e) => {
                  [" ", "Enter"].includes(e.key) && d.onValueChange(s);
                }),
                onFocus: (0, n.m)(e.onFocus, () => {
                  let e = "manual" !== d.activationMode;
                  m || a || !e || d.onValueChange(s);
                }),
              }),
            });
          });
        C.displayName = w;
        var R = "TabsContent",
          N = s.forwardRef((e, t) => {
            let {
                __scopeTabs: r,
                value: n,
                forceMount: a,
                children: o,
                ...d
              } = e,
              c = g(R, r),
              u = S(c.baseId, n),
              f = E(c.baseId, n),
              m = n === c.value,
              h = s.useRef(m);
            return (
              s.useEffect(() => {
                let e = requestAnimationFrame(() => (h.current = !1));
                return () => cancelAnimationFrame(e);
              }, []),
              (0, p.jsx)(i.C, {
                present: a || m,
                children: ({ present: r }) =>
                  (0, p.jsx)(l.sG.div, {
                    "data-state": m ? "active" : "inactive",
                    "data-orientation": c.orientation,
                    role: "tabpanel",
                    "aria-labelledby": u,
                    hidden: !r,
                    id: f,
                    tabIndex: 0,
                    ...d,
                    ref: t,
                    style: {
                      ...e.style,
                      animationDuration: h.current ? "0s" : void 0,
                    },
                    children: r && o,
                  }),
              })
            );
          });
        function S(e, t) {
          return `${e}-trigger-${t}`;
        }
        function E(e, t) {
          return `${e}-content-${t}`;
        }
        N.displayName = R;
        var _ = v,
          k = j,
          P = C,
          A = N;
      },
      28764: (e, t, r) => {
        "use strict";
        r.d(t, { A: () => s });
        let s = (0, r(30980).A)("AlertCircle", [
          ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
          ["line", { x1: "12", x2: "12", y1: "8", y2: "12", key: "1pkeuh" }],
          [
            "line",
            { x1: "12", x2: "12.01", y1: "16", y2: "16", key: "4dfq90" },
          ],
        ]);
      },
      29021: (e) => {
        "use strict";
        e.exports = require("fs");
      },
      29073: (e, t, r) => {
        "use strict";
        var s = r(90645);
        r.o(s, "notFound") &&
          r.d(t, {
            notFound: function () {
              return s.notFound;
            },
          }),
          r.o(s, "permanentRedirect") &&
            r.d(t, {
              permanentRedirect: function () {
                return s.permanentRedirect;
              },
            }),
          r.o(s, "redirect") &&
            r.d(t, {
              redirect: function () {
                return s.redirect;
              },
            });
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
      37787: (e, t, r) => {
        "use strict";
        r.a(e, async (e, s) => {
          try {
            r.d(t, { T: () => l });
            var n = r(61268),
              a = r(84205),
              o = r(15942),
              i = e([o]);
            o = (i.then ? (await i)() : i)[0];
            let l = a.forwardRef(({ className: e, ...t }, r) =>
              (0, n.jsx)("textarea", {
                className: (0, o.cn)(
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
      41133: (e, t, r) => {
        "use strict";
        r.a(e, async (e, s) => {
          try {
            r.d(t, { Fc: () => l, TN: () => c, XL: () => d });
            var n = r(35242),
              a = r(84101);
            r(84147);
            var o = r(20716),
              i = e([o]);
            o = (i.then ? (await i)() : i)[0];
            let u = (0, a.F)(
              "relative w-full rounded-lg border px-4 py-3 text-sm grid has-[>svg]:grid-cols-[calc(var(--spacing)*4)_1fr] grid-cols-[0_1fr] has-[>svg]:gap-x-3 gap-y-0.5 items-start [&>svg]:size-4 [&>svg]:translate-y-0.5 [&>svg]:text-current",
              {
                variants: {
                  variant: {
                    default: "bg-background text-foreground",
                    destructive:
                      "text-destructive-foreground [&>svg]:text-current *:data-[slot=alert-description]:text-destructive-foreground/80",
                  },
                },
                defaultVariants: { variant: "default" },
              },
            );
            function l({ className: e, variant: t, ...r }) {
              return (0, n.jsx)("div", {
                "data-slot": "alert",
                role: "alert",
                className: (0, o.cn)(u({ variant: t }), e),
                ...r,
              });
            }
            function d({ className: e, ...t }) {
              return (0, n.jsx)("div", {
                "data-slot": "alert-title",
                className: (0, o.cn)(
                  "col-start-2 line-clamp-1 min-h-4 font-medium tracking-tight",
                  e,
                ),
                ...t,
              });
            }
            function c({ className: e, ...t }) {
              return (0, n.jsx)("div", {
                "data-slot": "alert-description",
                className: (0, o.cn)(
                  "text-muted-foreground col-start-2 grid justify-items-start gap-1 text-sm [&_p]:leading-relaxed",
                  e,
                ),
                ...t,
              });
            }
            s();
          } catch (e) {
            s(e);
          }
        });
      },
      41692: (e) => {
        "use strict";
        e.exports = require("node:tls");
      },
      42057: (e, t, r) => {
        "use strict";
        r.d(t, { default: () => n.a });
        var s = r(14604),
          n = r.n(s);
      },
      42279: (e, t, r) => {
        "use strict";
        r.a(e, async (e, s) => {
          try {
            r.d(t, { BatchProcessor: () => w });
            var n = r(61268),
              a = r(61950),
              o = r(58882),
              i = r(89525),
              l = r(15014),
              d = r(66135),
              c = r(98683),
              u = r(84205),
              p = r(35926),
              f = r(44619),
              m = r(46532),
              h = r(28909),
              b = r(5451),
              x = r(79826),
              g = r(92256),
              v = r(13242),
              y = r(66321),
              j = e([f, m, h, b, x, g, y]);
            [f, m, h, b, x, g, y] = j.then ? (await j)() : j;
            let C = {
              "application/pdf": [".pdf"],
              "image/jpeg": [".jpg", ".jpeg"],
              "image/png": [".png"],
              "image/tiff": [".tiff", ".tif"],
              "application/msword": [".doc"],
              "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
                [".docx"],
            };
            function w({
              onComplete: e,
              maxFiles: t = 10,
              showControls: r = !0,
            }) {
              let [s, j] = (0, u.useState)([]),
                [w, R] = (0, u.useState)(!1),
                [N, S] = (0, u.useState)(!0),
                [E, _] = (0, u.useState)(!0),
                [k, P] = (0, u.useState)(null),
                A = (0, u.useCallback)(
                  (e) => {
                    let r = e.map((e) => ({
                      id: `file-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
                      file: e,
                      status: "pending",
                      progress: 0,
                    }));
                    j((e) => {
                      let s = [...e, ...r];
                      return s.length > t
                        ? (alert(
                            `You can only upload a maximum of ${t} files at once.`,
                          ),
                          [...e, ...r.slice(0, t - e.length)])
                        : s;
                    });
                  },
                  [t],
                ),
                {
                  getRootProps: T,
                  getInputProps: I,
                  isDragActive: O,
                } = (0, p.VB)({ onDrop: A, accept: C, maxFiles: t }),
                M = (e) => {
                  j((t) => t.filter((t) => t.id !== e));
                },
                F = (e) =>
                  e < 1024
                    ? `${e} B`
                    : e < 1048576
                      ? `${(e / 1024).toFixed(1)} KB`
                      : `${(e / 1048576).toFixed(1)} MB`,
                D = async () => {
                  try {
                    let e = await fetch("/api/ocr/check-batch", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ fileCount: s.length }),
                      }),
                      t = await e.json();
                    if (!t.success || !t.allowed)
                      return (
                        P({
                          exceeded: !0,
                          message: t.message || "Rate limit exceeded",
                          allowed: t.maxBatchSize,
                          tier: t.tier,
                        }),
                        !1
                      );
                    return !0;
                  } catch (e) {
                    return (
                      console.error("Error checking batch processing:", e),
                      P({
                        exceeded: !0,
                        message:
                          e instanceof Error
                            ? e.message
                            : "Unknown error checking batch limits",
                      }),
                      !1
                    );
                  }
                },
                q = async (e) => {
                  try {
                    j((t) =>
                      t.map((t) =>
                        t.id === e.id
                          ? { ...t, status: "processing", progress: 10 }
                          : t,
                      ),
                    );
                    let t = new FormData();
                    t.append("file", e.file),
                      t.append("preserveFormatting", N.toString()),
                      t.append("detectTables", E.toString());
                    let r = await fetch("/api/ocr/process-file-batch", {
                      method: "POST",
                      body: t,
                    });
                    if (!r.ok) {
                      let e = await r.json();
                      throw Error(e.error || r.statusText);
                    }
                    let s = await r.json();
                    return (
                      j((t) =>
                        t.map((t) =>
                          t.id === e.id
                            ? {
                                ...t,
                                status: "completed",
                                progress: 100,
                                documentId: s.documentId,
                                result: s.result,
                              }
                            : t,
                        ),
                      ),
                      {
                        success: !0,
                        fileId: e.id,
                        documentId: s.documentId,
                        result: s.result,
                      }
                    );
                  } catch (t) {
                    return (
                      console.error(`Error processing file ${e.file.name}:`, t),
                      j((r) =>
                        r.map((r) =>
                          r.id === e.id
                            ? {
                                ...r,
                                status: "failed",
                                progress: 0,
                                error:
                                  t instanceof Error
                                    ? t.message
                                    : "Unknown error",
                              }
                            : r,
                        ),
                      ),
                      {
                        success: !1,
                        fileId: e.id,
                        error: t instanceof Error ? t.message : "Unknown error",
                      }
                    );
                  }
                },
                H = async () => {
                  if (0 !== s.length && (await D())) {
                    R(!0);
                    try {
                      let t = 0,
                        r = s.filter((e) => "pending" === e.status),
                        n = [];
                      for (; t < r.length; ) {
                        let e = r.slice(t, t + 3).map((e) => q(e)),
                          s = await Promise.all(e);
                        n.push(...s), (t += 3);
                      }
                      e && e(s);
                    } catch (e) {
                      console.error("Batch processing error:", e);
                    } finally {
                      R(!1);
                    }
                  }
                },
                L = () => {
                  if (0 === s.length) return 0;
                  let e = s.reduce((e, t) => e + t.progress, 0);
                  return Math.floor(e / s.length);
                },
                B = (e) => {
                  switch (e) {
                    case "pending":
                      return (0, n.jsx)(m.E, {
                        variant: "outline",
                        children: "Pending",
                      });
                    case "processing":
                      return (0, n.jsx)(m.E, {
                        variant: "secondary",
                        children: "Processing",
                      });
                    case "completed":
                      return (0, n.jsx)(m.E, {
                        variant: "success",
                        className: "bg-green-100 text-green-800",
                        children: "Completed",
                      });
                    case "failed":
                      return (0, n.jsx)(m.E, {
                        variant: "destructive",
                        children: "Failed",
                      });
                    default:
                      return null;
                  }
                };
              return (0, n.jsxs)("div", {
                className: "space-y-4",
                children: [
                  k?.exceeded &&
                    (0, n.jsxs)(f.Fc, {
                      variant: "destructive",
                      children: [
                        (0, n.jsx)(a.A, { className: "h-4 w-4" }),
                        (0, n.jsx)(f.XL, { children: "Rate Limit Exceeded" }),
                        (0, n.jsxs)(f.TN, {
                          children: [
                            k.message,
                            k.allowed &&
                              (0, n.jsxs)("p", {
                                className: "mt-2",
                                children: [
                                  "Maximum allowed batch size: ",
                                  k.allowed,
                                  " files.",
                                ],
                              }),
                            k.tier &&
                              (0, n.jsxs)("p", {
                                className: "mt-1",
                                children: ["Current tier: ", k.tier],
                              }),
                          ],
                        }),
                      ],
                    }),
                  (0, n.jsxs)(b.Zp, {
                    children: [
                      (0, n.jsx)(b.aR, {
                        children: (0, n.jsx)(b.ZB, {
                          children: "Batch Document Processing",
                        }),
                      }),
                      (0, n.jsxs)(b.Wu, {
                        className: "space-y-4",
                        children: [
                          (0, n.jsxs)("div", {
                            ...T(),
                            className: `border-2 border-dashed rounded-md p-6 text-center cursor-pointer ${O ? "border-primary bg-muted/50" : "border-border"}`,
                            children: [
                              (0, n.jsx)("input", { ...I() }),
                              (0, n.jsxs)("div", {
                                className:
                                  "flex flex-col items-center justify-center space-y-2",
                                children: [
                                  (0, n.jsx)(o.A, {
                                    className: "h-8 w-8 text-muted-foreground",
                                  }),
                                  (0, n.jsx)("p", {
                                    className: "font-medium",
                                    children: O
                                      ? "Drop the files here..."
                                      : "Drag & drop files, or click to select",
                                  }),
                                  (0, n.jsx)("p", {
                                    className: "text-sm text-muted-foreground",
                                    children:
                                      "Supported formats: PDF, JPG, PNG, TIFF, DOC, DOCX",
                                  }),
                                  (0, n.jsxs)("p", {
                                    className: "text-xs text-muted-foreground",
                                    children: ["Maximum ", t, " files"],
                                  }),
                                ],
                              }),
                            ],
                          }),
                          r &&
                            (0, n.jsxs)("div", {
                              className:
                                "flex flex-col gap-4 sm:flex-row sm:items-center",
                              children: [
                                (0, n.jsxs)("div", {
                                  className: "flex items-center space-x-2",
                                  children: [
                                    (0, n.jsx)(x.S, {
                                      id: "preserveFormatting",
                                      checked: N,
                                      onCheckedChange: (e) => S(!0 === e),
                                      disabled: w,
                                    }),
                                    (0, n.jsx)("label", {
                                      htmlFor: "preserveFormatting",
                                      className:
                                        "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
                                      children: "Preserve Formatting",
                                    }),
                                  ],
                                }),
                                (0, n.jsxs)("div", {
                                  className: "flex items-center space-x-2",
                                  children: [
                                    (0, n.jsx)(x.S, {
                                      id: "detectTables",
                                      checked: E,
                                      onCheckedChange: (e) => _(!0 === e),
                                      disabled: w,
                                    }),
                                    (0, n.jsx)("label", {
                                      htmlFor: "detectTables",
                                      className:
                                        "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
                                      children: "Detect Tables",
                                    }),
                                  ],
                                }),
                              ],
                            }),
                          s.length > 0 &&
                            (0, n.jsx)("div", {
                              className: "mt-4",
                              children: (0, n.jsx)(v.F, {
                                className: "h-[300px]",
                                children: (0, n.jsxs)(y.XI, {
                                  children: [
                                    (0, n.jsx)(y.A0, {
                                      children: (0, n.jsxs)(y.Hj, {
                                        children: [
                                          (0, n.jsx)(y.nd, {
                                            children: "File",
                                          }),
                                          (0, n.jsx)(y.nd, {
                                            children: "Size",
                                          }),
                                          (0, n.jsx)(y.nd, {
                                            children: "Status",
                                          }),
                                          (0, n.jsx)(y.nd, {
                                            children: "Progress",
                                          }),
                                          (0, n.jsx)(y.nd, {
                                            className: "w-[80px]",
                                            children: "Actions",
                                          }),
                                        ],
                                      }),
                                    }),
                                    (0, n.jsx)(y.BF, {
                                      children: s.map((e) =>
                                        (0, n.jsxs)(
                                          y.Hj,
                                          {
                                            children: [
                                              (0, n.jsx)(y.nA, {
                                                className: "font-medium",
                                                children: (0, n.jsxs)("div", {
                                                  className:
                                                    "flex items-center space-x-2",
                                                  children: [
                                                    (0, n.jsx)(i.A, {
                                                      className: "h-4 w-4",
                                                    }),
                                                    (0, n.jsx)("span", {
                                                      className:
                                                        "truncate max-w-[200px]",
                                                      children: e.file.name,
                                                    }),
                                                  ],
                                                }),
                                              }),
                                              (0, n.jsx)(y.nA, {
                                                children: F(e.file.size),
                                              }),
                                              (0, n.jsx)(y.nA, {
                                                children: B(e.status),
                                              }),
                                              (0, n.jsxs)(y.nA, {
                                                children: [
                                                  (0, n.jsx)("div", {
                                                    className: "w-[100px]",
                                                    children: (0, n.jsx)(g.k, {
                                                      value: e.progress,
                                                      className: "h-2",
                                                      color:
                                                        "failed" === e.status
                                                          ? "bg-red-600"
                                                          : "completed" ===
                                                              e.status
                                                            ? "bg-green-600"
                                                            : void 0,
                                                    }),
                                                  }),
                                                  e.error &&
                                                    (0, n.jsx)("p", {
                                                      className:
                                                        "text-xs text-red-600 mt-1 truncate max-w-[200px]",
                                                      title: e.error,
                                                      children: e.error,
                                                    }),
                                                ],
                                              }),
                                              (0, n.jsx)(y.nA, {
                                                children: (0, n.jsx)(h.$, {
                                                  variant: "ghost",
                                                  size: "icon",
                                                  onClick: () => M(e.id),
                                                  disabled: w,
                                                  children: (0, n.jsx)(l.A, {
                                                    className: "h-4 w-4",
                                                  }),
                                                }),
                                              }),
                                            ],
                                          },
                                          e.id,
                                        ),
                                      ),
                                    }),
                                  ],
                                }),
                              }),
                            }),
                          s.length > 0 &&
                            w &&
                            (0, n.jsxs)("div", {
                              className: "space-y-2",
                              children: [
                                (0, n.jsxs)("div", {
                                  className: "flex justify-between text-sm",
                                  children: [
                                    (0, n.jsx)("span", {
                                      children: "Overall Progress:",
                                    }),
                                    (0, n.jsxs)("span", {
                                      children: [L(), "%"],
                                    }),
                                  ],
                                }),
                                (0, n.jsx)(g.k, {
                                  value: L(),
                                  className: "h-2",
                                }),
                              ],
                            }),
                        ],
                      }),
                      s.length > 0 &&
                        (0, n.jsxs)(b.wL, {
                          className: "flex justify-between",
                          children: [
                            (0, n.jsx)(h.$, {
                              variant: "outline",
                              onClick: () => {
                                j([]), P(null);
                              },
                              disabled: w,
                              children: "Clear All",
                            }),
                            (0, n.jsx)(h.$, {
                              onClick: H,
                              disabled:
                                w ||
                                0 === s.length ||
                                s.every((e) => "pending" !== e.status),
                              children: w
                                ? (0, n.jsxs)(n.Fragment, {
                                    children: [
                                      (0, n.jsx)(d.A, {
                                        className: "mr-2 h-4 w-4 animate-spin",
                                      }),
                                      "Processing...",
                                    ],
                                  })
                                : (0, n.jsxs)(n.Fragment, {
                                    children: [
                                      "Process ",
                                      s.filter((e) => "pending" === e.status)
                                        .length,
                                      " Files",
                                    ],
                                  }),
                            }),
                          ],
                        }),
                    ],
                  }),
                  s.some((e) => "completed" === e.status) &&
                    (0, n.jsxs)(b.Zp, {
                      children: [
                        (0, n.jsx)(b.aR, {
                          children: (0, n.jsx)(b.ZB, {
                            children: "Processing Results",
                          }),
                        }),
                        (0, n.jsx)(b.Wu, {
                          children: (0, n.jsxs)("div", {
                            className: "space-y-2",
                            children: [
                              (0, n.jsxs)("div", {
                                className: "flex space-x-2",
                                children: [
                                  (0, n.jsx)(c.A, {
                                    className: "h-5 w-5 text-green-600",
                                  }),
                                  (0, n.jsxs)("span", {
                                    children: [
                                      "Successfully processed: ",
                                      s.filter((e) => "completed" === e.status)
                                        .length,
                                      " files",
                                    ],
                                  }),
                                ],
                              }),
                              s.some((e) => "failed" === e.status) &&
                                (0, n.jsxs)("div", {
                                  className: "flex space-x-2",
                                  children: [
                                    (0, n.jsx)(a.A, {
                                      className: "h-5 w-5 text-red-600",
                                    }),
                                    (0, n.jsxs)("span", {
                                      children: [
                                        "Failed: ",
                                        s.filter((e) => "failed" === e.status)
                                          .length,
                                        " files",
                                      ],
                                    }),
                                  ],
                                }),
                              s.some(
                                (e) =>
                                  "pending" === e.status ||
                                  "processing" === e.status,
                              ) &&
                                (0, n.jsxs)("div", {
                                  className: "flex space-x-2",
                                  children: [
                                    (0, n.jsx)(d.A, {
                                      className: "h-5 w-5 animate-spin",
                                    }),
                                    (0, n.jsxs)("span", {
                                      children: [
                                        "Pending/Processing: ",
                                        s.filter(
                                          (e) =>
                                            "pending" === e.status ||
                                            "processing" === e.status,
                                        ).length,
                                        " files",
                                      ],
                                    }),
                                  ],
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
      42414: (e, t, r) => {
        "use strict";
        r.d(t, { B: () => l });
        var s,
          n = r(84205),
          a = r(66130),
          o =
            (s || (s = r.t(n, 2)))[" useId ".trim().toString()] ||
            (() => void 0),
          i = 0;
        function l(e) {
          let [t, r] = n.useState(o());
          return (
            (0, a.N)(() => {
              e || r((e) => e ?? String(i++));
            }, [e]),
            e || (t ? `radix-${t}` : "")
          );
        }
      },
      42600: (e, t, r) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          Object.defineProperty(t, "unstable_rethrow", {
            enumerable: !0,
            get: function () {
              return s;
            },
          });
        let s = r(23399).unstable_rethrow;
        ("function" == typeof t.default ||
          ("object" == typeof t.default && null !== t.default)) &&
          void 0 === t.default.__esModule &&
          (Object.defineProperty(t.default, "__esModule", { value: !0 }),
          Object.assign(t.default, t),
          (e.exports = t.default));
      },
      42679: (e, t, r) => {
        Promise.resolve().then(r.bind(r, 42279)),
          Promise.resolve().then(r.bind(r, 56868)),
          Promise.resolve().then(r.bind(r, 76773)),
          Promise.resolve().then(r.bind(r, 77001)),
          Promise.resolve().then(r.bind(r, 46376));
      },
      43691: (e, t, r) => {
        "use strict";
        r.d(t, {
          Tabs: () => n,
          TabsContent: () => i,
          TabsList: () => a,
          TabsTrigger: () => o,
        });
        var s = r(26394);
        let n = (0, s.registerClientReference)(
            function () {
              throw Error(
                "Attempted to call Tabs() from the server but Tabs is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
              );
            },
            "E:\\downloads\\Hijraah\\apps\\web\\src\\components\\ui\\tabs.tsx",
            "Tabs",
          ),
          a = (0, s.registerClientReference)(
            function () {
              throw Error(
                "Attempted to call TabsList() from the server but TabsList is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
              );
            },
            "E:\\downloads\\Hijraah\\apps\\web\\src\\components\\ui\\tabs.tsx",
            "TabsList",
          ),
          o = (0, s.registerClientReference)(
            function () {
              throw Error(
                "Attempted to call TabsTrigger() from the server but TabsTrigger is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
              );
            },
            "E:\\downloads\\Hijraah\\apps\\web\\src\\components\\ui\\tabs.tsx",
            "TabsTrigger",
          ),
          i = (0, s.registerClientReference)(
            function () {
              throw Error(
                "Attempted to call TabsContent() from the server but TabsContent is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
              );
            },
            "E:\\downloads\\Hijraah\\apps\\web\\src\\components\\ui\\tabs.tsx",
            "TabsContent",
          );
      },
      44619: (e, t, r) => {
        "use strict";
        r.a(e, async (e, s) => {
          try {
            r.d(t, { Fc: () => l, TN: () => c, XL: () => d });
            var n = r(61268),
              a = r(91635);
            r(84205);
            var o = r(15942),
              i = e([o]);
            o = (i.then ? (await i)() : i)[0];
            let u = (0, a.F)(
              "relative w-full rounded-lg border px-4 py-3 text-sm grid has-[>svg]:grid-cols-[calc(var(--spacing)*4)_1fr] grid-cols-[0_1fr] has-[>svg]:gap-x-3 gap-y-0.5 items-start [&>svg]:size-4 [&>svg]:translate-y-0.5 [&>svg]:text-current",
              {
                variants: {
                  variant: {
                    default: "bg-background text-foreground",
                    destructive:
                      "text-destructive-foreground [&>svg]:text-current *:data-[slot=alert-description]:text-destructive-foreground/80",
                  },
                },
                defaultVariants: { variant: "default" },
              },
            );
            function l({ className: e, variant: t, ...r }) {
              return (0, n.jsx)("div", {
                "data-slot": "alert",
                role: "alert",
                className: (0, o.cn)(u({ variant: t }), e),
                ...r,
              });
            }
            function d({ className: e, ...t }) {
              return (0, n.jsx)("div", {
                "data-slot": "alert-title",
                className: (0, o.cn)(
                  "col-start-2 line-clamp-1 min-h-4 font-medium tracking-tight",
                  e,
                ),
                ...t,
              });
            }
            function c({ className: e, ...t }) {
              return (0, n.jsx)("div", {
                "data-slot": "alert-description",
                className: (0, o.cn)(
                  "text-muted-foreground col-start-2 grid justify-items-start gap-1 text-sm [&_p]:leading-relaxed",
                  e,
                ),
                ...t,
              });
            }
            s();
          } catch (e) {
            s(e);
          }
        });
      },
      44708: (e) => {
        "use strict";
        e.exports = require("node:https");
      },
      46532: (e, t, r) => {
        "use strict";
        r.a(e, async (e, s) => {
          try {
            r.d(t, { E: () => d });
            var n = r(61268),
              a = r(86415),
              o = r(91635);
            r(84205);
            var i = r(15942),
              l = e([i]);
            i = (l.then ? (await l)() : l)[0];
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
            function d({ className: e, variant: t, asChild: r = !1, ...s }) {
              let o = r ? a.DX : "span";
              return (0, n.jsx)(o, {
                "data-slot": "badge",
                className: (0, i.cn)(c({ variant: t }), e),
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
      49917: (e, t, r) => {
        "use strict";
        r.d(t, { C1: () => j, bL: () => y });
        var s = r(84205),
          n = r(18047),
          a = r(78593),
          o = r(61268),
          i = "Progress",
          [l, d] = (0, n.A)(i),
          [c, u] = l(i),
          p = s.forwardRef((e, t) => {
            var r, s;
            let {
              __scopeProgress: n,
              value: i = null,
              max: l,
              getValueLabel: d = h,
              ...u
            } = e;
            (l || 0 === l) &&
              !g(l) &&
              console.error(
                ((r = `${l}`),
                `Invalid prop \`max\` of value \`${r}\` supplied to \`Progress\`. Only numbers greater than 0 are valid max values. Defaulting to \`100\`.`),
              );
            let p = g(l) ? l : 100;
            null === i ||
              v(i, p) ||
              console.error(
                ((s = `${i}`),
                `Invalid prop \`value\` of value \`${s}\` supplied to \`Progress\`. The \`value\` prop must be:
  - a positive number
  - less than the value passed to \`max\` (or 100 if no \`max\` prop is set)
  - \`null\` or \`undefined\` if the progress is indeterminate.

Defaulting to \`null\`.`),
              );
            let f = v(i, p) ? i : null,
              m = x(f) ? d(f, p) : void 0;
            return (0, o.jsx)(c, {
              scope: n,
              value: f,
              max: p,
              children: (0, o.jsx)(a.sG.div, {
                "aria-valuemax": p,
                "aria-valuemin": 0,
                "aria-valuenow": x(f) ? f : void 0,
                "aria-valuetext": m,
                role: "progressbar",
                "data-state": b(f, p),
                "data-value": f ?? void 0,
                "data-max": p,
                ...u,
                ref: t,
              }),
            });
          });
        p.displayName = i;
        var f = "ProgressIndicator",
          m = s.forwardRef((e, t) => {
            let { __scopeProgress: r, ...s } = e,
              n = u(f, r);
            return (0, o.jsx)(a.sG.div, {
              "data-state": b(n.value, n.max),
              "data-value": n.value ?? void 0,
              "data-max": n.max,
              ...s,
              ref: t,
            });
          });
        function h(e, t) {
          return `${Math.round((e / t) * 100)}%`;
        }
        function b(e, t) {
          return null == e ? "indeterminate" : e === t ? "complete" : "loading";
        }
        function x(e) {
          return "number" == typeof e;
        }
        function g(e) {
          return x(e) && !isNaN(e) && e > 0;
        }
        function v(e, t) {
          return x(e) && !isNaN(e) && e <= t && e >= 0;
        }
        m.displayName = f;
        var y = p,
          j = m;
      },
      52480: (e, t, r) => {
        "use strict";
        function s() {
          throw Object.defineProperty(
            Error(
              "`unauthorized()` is experimental and only allowed to be used when `experimental.authInterrupts` is enabled.",
            ),
            "__NEXT_ERROR_CODE",
            { value: "E411", enumerable: !1, configurable: !0 },
          );
        }
        Object.defineProperty(t, "__esModule", { value: !0 }),
          Object.defineProperty(t, "unauthorized", {
            enumerable: !0,
            get: function () {
              return s;
            },
          }),
          r(17581).HTTP_ERROR_FALLBACK_ERROR_CODE,
          ("function" == typeof t.default ||
            ("object" == typeof t.default && null !== t.default)) &&
            void 0 === t.default.__esModule &&
            (Object.defineProperty(t.default, "__esModule", { value: !0 }),
            Object.assign(t.default, t),
            (e.exports = t.default));
      },
      53053: (e) => {
        "use strict";
        e.exports = require("node:diagnostics_channel");
      },
      54599: (e, t, r) => {
        "use strict";
        r.a(e, async (e, s) => {
          try {
            let b;
            r.r(t),
              r.d(t, {
                default: () => C,
                generateImageMetadata: () => j,
                generateMetadata: () => y,
                generateViewport: () => w,
                metadata: () => x,
              });
            var n = r(63033),
              a = r(35242),
              o = r(65469),
              i = r(28764),
              l = r(41133),
              d = r(14829),
              c = r(58897),
              u = r(79446),
              p = r(10695),
              f = r(43691),
              m = r(60442),
              h = e([l, d]);
            [l, d] = h.then ? (await h)() : h;
            let x = {
                title: "Unified OCR - Hijraah",
                description:
                  "Enhanced OCR capabilities with persistent storage, caching, progress tracking, and batch processing",
              },
              g = { ...n },
              v =
                "workUnitAsyncStorage" in g
                  ? g.workUnitAsyncStorage
                  : "requestAsyncStorage" in g
                    ? g.requestAsyncStorage
                    : void 0;
            b = new Proxy(
              function () {
                return (0, a.jsxs)("div", {
                  className: "container mx-auto py-10 px-4",
                  children: [
                    (0, a.jsxs)("div", {
                      className: "mb-10 text-center",
                      children: [
                        (0, a.jsx)("h1", {
                          className: "text-4xl font-bold mb-2",
                          children: "Unified OCR",
                        }),
                        (0, a.jsx)("p", {
                          className:
                            "text-muted-foreground text-lg max-w-3xl mx-auto",
                          children:
                            "Enhanced document processing with persistent storage, caching, progress tracking, and batch processing",
                        }),
                      ],
                    }),
                    (0, a.jsxs)(f.Tabs, {
                      defaultValue: "single",
                      className: "w-full max-w-5xl mx-auto",
                      children: [
                        (0, a.jsxs)(f.TabsList, {
                          className: "grid w-full grid-cols-3 mb-6",
                          children: [
                            (0, a.jsx)(f.TabsTrigger, {
                              value: "single",
                              children: "Single Document",
                            }),
                            (0, a.jsx)(f.TabsTrigger, {
                              value: "batch",
                              children: "Batch Processing",
                            }),
                            (0, a.jsx)(f.TabsTrigger, {
                              value: "understanding",
                              children: "Document Understanding",
                            }),
                          ],
                        }),
                        (0, a.jsx)(f.TabsContent, {
                          value: "single",
                          children: (0, a.jsx)("div", {
                            className: "mb-6",
                            children: (0, a.jsxs)(d.Zp, {
                              children: [
                                (0, a.jsxs)(d.aR, {
                                  children: [
                                    (0, a.jsx)(d.ZB, {
                                      children: "Single Document Processing",
                                    }),
                                    (0, a.jsx)(d.BT, {
                                      children:
                                        "Process a single document with real-time progress tracking and result caching",
                                    }),
                                  ],
                                }),
                                (0, a.jsxs)(d.Wu, {
                                  children: [
                                    (0, a.jsxs)(l.Fc, {
                                      className: "mb-4",
                                      children: [
                                        (0, a.jsx)(o.A, {
                                          className: "h-4 w-4",
                                        }),
                                        (0, a.jsx)(l.XL, {
                                          children: "Enhanced OCR Processing",
                                        }),
                                        (0, a.jsx)(l.TN, {
                                          children:
                                            "This OCR processor now includes persistent storage, caching for faster repeated processing, and real-time progress tracking.",
                                        }),
                                      ],
                                    }),
                                    (0, a.jsx)(p.MistralOcrUploader, {}),
                                  ],
                                }),
                              ],
                            }),
                          }),
                        }),
                        (0, a.jsx)(f.TabsContent, {
                          value: "batch",
                          children: (0, a.jsx)("div", {
                            className: "mb-6",
                            children: (0, a.jsxs)(d.Zp, {
                              children: [
                                (0, a.jsxs)(d.aR, {
                                  children: [
                                    (0, a.jsx)(d.ZB, {
                                      children: "Batch Document Processing",
                                    }),
                                    (0, a.jsx)(d.BT, {
                                      children:
                                        "Process multiple documents at once with parallel processing and progress tracking",
                                    }),
                                  ],
                                }),
                                (0, a.jsxs)(d.Wu, {
                                  children: [
                                    (0, a.jsxs)(l.Fc, {
                                      className: "mb-4",
                                      children: [
                                        (0, a.jsx)(o.A, {
                                          className: "h-4 w-4",
                                        }),
                                        (0, a.jsx)(l.XL, {
                                          children:
                                            "Efficient Batch Processing",
                                        }),
                                        (0, a.jsx)(l.TN, {
                                          children:
                                            "Upload multiple documents at once for efficient processing. The system handles rate limiting, parallel processing, and provides detailed progress for each document.",
                                        }),
                                      ],
                                    }),
                                    (0, a.jsx)(c.BatchProcessor, {
                                      maxFiles: 5,
                                    }),
                                  ],
                                }),
                              ],
                            }),
                          }),
                        }),
                        (0, a.jsx)(f.TabsContent, {
                          value: "understanding",
                          children: (0, a.jsx)("div", {
                            className: "mb-6",
                            children: (0, a.jsxs)(d.Zp, {
                              children: [
                                (0, a.jsxs)(d.aR, {
                                  children: [
                                    (0, a.jsx)(d.ZB, {
                                      children: "Document Understanding",
                                    }),
                                    (0, a.jsx)(d.BT, {
                                      children:
                                        "Ask questions about document content and get AI-powered answers with caching",
                                    }),
                                  ],
                                }),
                                (0, a.jsxs)(d.Wu, {
                                  children: [
                                    (0, a.jsxs)(l.Fc, {
                                      className: "mb-4",
                                      children: [
                                        (0, a.jsx)(o.A, {
                                          className: "h-4 w-4",
                                        }),
                                        (0, a.jsx)(l.XL, {
                                          children: "Intelligent Document Q&A",
                                        }),
                                        (0, a.jsx)(l.TN, {
                                          children:
                                            "Upload a document or provide a URL to ask questions about its content. Answers are cached for improved performance when asking similar questions.",
                                        }),
                                      ],
                                    }),
                                    (0, a.jsx)(
                                      u.MistralDocumentUnderstanding,
                                      {},
                                    ),
                                  ],
                                }),
                              ],
                            }),
                          }),
                        }),
                      ],
                    }),
                    (0, a.jsxs)("div", {
                      className: "mt-16 max-w-4xl mx-auto",
                      children: [
                        (0, a.jsx)("h2", {
                          className: "text-2xl font-bold mb-4",
                          children: "Enhanced OCR Capabilities",
                        }),
                        (0, a.jsxs)("div", {
                          className:
                            "grid grid-cols-1 md:grid-cols-2 gap-6 mb-8",
                          children: [
                            (0, a.jsxs)(d.Zp, {
                              children: [
                                (0, a.jsx)(d.aR, {
                                  children: (0, a.jsx)(d.ZB, {
                                    children: "Persistent Storage",
                                  }),
                                }),
                                (0, a.jsx)(d.Wu, {
                                  children: (0, a.jsx)("p", {
                                    className: "text-muted-foreground",
                                    children:
                                      "Documents are now stored securely in Supabase Storage, providing reliable and persistent access to your uploaded files.",
                                  }),
                                }),
                              ],
                            }),
                            (0, a.jsxs)(d.Zp, {
                              children: [
                                (0, a.jsx)(d.aR, {
                                  children: (0, a.jsx)(d.ZB, {
                                    children: "Result Caching",
                                  }),
                                }),
                                (0, a.jsx)(d.Wu, {
                                  children: (0, a.jsx)("p", {
                                    className: "text-muted-foreground",
                                    children:
                                      "OCR results are cached using Redis, significantly improving performance for repeated processing of the same documents and reducing API costs.",
                                  }),
                                }),
                              ],
                            }),
                            (0, a.jsxs)(d.Zp, {
                              children: [
                                (0, a.jsx)(d.aR, {
                                  children: (0, a.jsx)(d.ZB, {
                                    children: "Rate Limiting",
                                  }),
                                }),
                                (0, a.jsx)(d.Wu, {
                                  children: (0, a.jsx)("p", {
                                    className: "text-muted-foreground",
                                    children:
                                      "Intelligent rate limiting prevents abuse of the OCR API while providing fair usage based on user tiers (standard, premium, enterprise).",
                                  }),
                                }),
                              ],
                            }),
                            (0, a.jsxs)(d.Zp, {
                              children: [
                                (0, a.jsx)(d.aR, {
                                  children: (0, a.jsx)(d.ZB, {
                                    children: "Progress Tracking",
                                  }),
                                }),
                                (0, a.jsx)(d.Wu, {
                                  children: (0, a.jsx)("p", {
                                    className: "text-muted-foreground",
                                    children:
                                      "Real-time progress updates keep you informed about the status of document processing, especially useful for large documents and batch operations.",
                                  }),
                                }),
                              ],
                            }),
                          ],
                        }),
                        (0, a.jsxs)(d.Zp, {
                          className: "mb-8",
                          children: [
                            (0, a.jsx)(d.aR, {
                              children: (0, a.jsx)(d.ZB, {
                                children: "Implementation Details",
                              }),
                            }),
                            (0, a.jsx)(d.Wu, {
                              children: (0, a.jsxs)("div", {
                                className: "space-y-4",
                                children: [
                                  (0, a.jsxs)("div", {
                                    children: [
                                      (0, a.jsx)("h3", {
                                        className: "font-semibold mb-2",
                                        children: "Technology Stack",
                                      }),
                                      (0, a.jsxs)("ul", {
                                        className: "list-disc pl-5 space-y-1",
                                        children: [
                                          (0, a.jsx)("li", {
                                            children:
                                              "Next.js 15 with App Router for the frontend",
                                          }),
                                          (0, a.jsx)("li", {
                                            children:
                                              "Hono.js for API routes and middleware",
                                          }),
                                          (0, a.jsx)("li", {
                                            children:
                                              "Supabase for document storage and metadata",
                                          }),
                                          (0, a.jsx)("li", {
                                            children:
                                              "Upstash Redis for caching and rate limiting",
                                          }),
                                          (0, a.jsx)("li", {
                                            children:
                                              "Mistral AI API for OCR and document understanding",
                                          }),
                                          (0, a.jsx)("li", {
                                            children:
                                              "React and Shadcn UI for the user interface",
                                          }),
                                        ],
                                      }),
                                    ],
                                  }),
                                  (0, a.jsxs)("div", {
                                    children: [
                                      (0, a.jsx)("h3", {
                                        className: "font-semibold mb-2",
                                        children: "Performance Enhancements",
                                      }),
                                      (0, a.jsxs)("ul", {
                                        className: "list-disc pl-5 space-y-1",
                                        children: [
                                          (0, a.jsx)("li", {
                                            children:
                                              "Document results cached for 7 days by default",
                                          }),
                                          (0, a.jsx)("li", {
                                            children:
                                              "Token-based rate limiting with tier-specific quotas",
                                          }),
                                          (0, a.jsx)("li", {
                                            children:
                                              "Concurrent batch processing with adjustable limits",
                                          }),
                                          (0, a.jsx)("li", {
                                            children:
                                              "Real-time progress updates via polling",
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
                        (0, a.jsxs)(l.Fc, {
                          variant: "destructive",
                          className: "mb-4",
                          children: [
                            (0, a.jsx)(i.A, { className: "h-4 w-4" }),
                            (0, a.jsx)(l.XL, { children: "Important Note" }),
                            (0, a.jsx)(l.TN, {
                              children:
                                "This is a demonstration environment. Processing times and capabilities may be limited. In a production environment, document processing would be handled by background jobs for improved scalability.",
                            }),
                          ],
                        }),
                      ],
                    }),
                  ],
                });
              },
              {
                apply: (e, t, r) => {
                  let s, n, a;
                  try {
                    let e = v?.getStore();
                    (s = e?.headers.get("sentry-trace") ?? void 0),
                      (n = e?.headers.get("baggage") ?? void 0),
                      (a = e?.headers);
                  } catch (e) {}
                  return m
                    .wrapServerComponentWithSentry(e, {
                      componentRoute: "/(ai-unified)/ocr",
                      componentType: "Page",
                      sentryTraceHeader: s,
                      baggageHeader: n,
                      headers: a,
                    })
                    .apply(t, r);
                },
              },
            );
            let y = void 0,
              j = void 0,
              w = void 0,
              C = b;
            s();
          } catch (e) {
            s(e);
          }
        });
      },
      55511: (e) => {
        "use strict";
        e.exports = require("crypto");
      },
      55591: (e) => {
        "use strict";
        e.exports = require("https");
      },
      56868: (e, t, r) => {
        "use strict";
        r.a(e, async (e, s) => {
          try {
            r.d(t, { MistralDocumentUnderstanding: () => b });
            var n = r(61268),
              a = r(66135),
              o = r(99927),
              i = r(99793),
              l = r(84205),
              d = r(28909),
              c = r(5451),
              u = r(78337),
              p = r(16979),
              f = r(77001),
              m = r(37787),
              h = e([d, c, u, p, f, m]);
            function b() {
              let [e, t] = (0, l.useState)(null),
                [r, s] = (0, l.useState)(""),
                [h, b] = (0, l.useState)(""),
                [x, g] = (0, l.useState)(!1),
                [v, y] = (0, l.useState)(null),
                j = async () => {
                  if (e && h) {
                    g(!0), y(null);
                    try {
                      let t = new FormData();
                      t.append("file", e), t.append("question", h);
                      let r = await fetch("/api/ocr/ask-document", {
                          method: "POST",
                          body: t,
                        }),
                        s = await r.json();
                      y(s);
                    } catch (e) {
                      console.error("Error processing document question:", e),
                        y({
                          success: !1,
                          error:
                            e instanceof Error
                              ? e.message
                              : "Unknown error occurred",
                        });
                    } finally {
                      g(!1);
                    }
                  }
                },
                w = async () => {
                  if (r && h) {
                    g(!0), y(null);
                    try {
                      let e = await fetch("/api/ocr/ask-document-url", {
                          method: "POST",
                          headers: { "Content-Type": "application/json" },
                          body: JSON.stringify({ url: r, question: h }),
                        }),
                        t = await e.json();
                      y(t);
                    } catch (e) {
                      console.error("Error processing document question:", e),
                        y({
                          success: !1,
                          error:
                            e instanceof Error
                              ? e.message
                              : "Unknown error occurred",
                        });
                    } finally {
                      g(!1);
                    }
                  }
                };
              return (0, n.jsxs)(c.Zp, {
                className: "w-full max-w-3xl mx-auto",
                children: [
                  (0, n.jsxs)(c.aR, {
                    children: [
                      (0, n.jsx)(c.ZB, { children: "Document Understanding" }),
                      (0, n.jsx)(c.BT, {
                        children:
                          "Upload a document or provide a URL to ask questions about its content",
                      }),
                    ],
                  }),
                  (0, n.jsxs)(c.Wu, {
                    children: [
                      (0, n.jsxs)(f.Tabs, {
                        defaultValue: "file",
                        className: "w-full",
                        children: [
                          (0, n.jsxs)(f.TabsList, {
                            className: "grid w-full grid-cols-2",
                            children: [
                              (0, n.jsx)(f.TabsTrigger, {
                                value: "file",
                                children: "File Upload",
                              }),
                              (0, n.jsx)(f.TabsTrigger, {
                                value: "url",
                                children: "URL",
                              }),
                            ],
                          }),
                          (0, n.jsx)(f.TabsContent, {
                            value: "file",
                            className: "space-y-4",
                            children: (0, n.jsxs)("div", {
                              className: "grid w-full gap-2",
                              children: [
                                (0, n.jsx)(p.J, {
                                  htmlFor: "file",
                                  children: "Upload Document",
                                }),
                                (0, n.jsx)(u.p, {
                                  id: "file",
                                  type: "file",
                                  accept: ".pdf,.png,.jpg,.jpeg,.tiff,.tif",
                                  onChange: (e) => {
                                    e.target.files &&
                                      e.target.files[0] &&
                                      t(e.target.files[0]);
                                  },
                                }),
                                e &&
                                  (0, n.jsxs)("p", {
                                    className: "text-sm text-muted-foreground",
                                    children: [
                                      "Selected: ",
                                      e.name,
                                      " (",
                                      Math.round(e.size / 1024),
                                      " KB)",
                                    ],
                                  }),
                              ],
                            }),
                          }),
                          (0, n.jsx)(f.TabsContent, {
                            value: "url",
                            className: "space-y-4",
                            children: (0, n.jsxs)("div", {
                              className: "grid w-full gap-2",
                              children: [
                                (0, n.jsx)(p.J, {
                                  htmlFor: "url",
                                  children: "Document URL",
                                }),
                                (0, n.jsx)(u.p, {
                                  id: "url",
                                  type: "url",
                                  placeholder:
                                    "https://example.com/document.pdf",
                                  value: r,
                                  onChange: (e) => s(e.target.value),
                                }),
                              ],
                            }),
                          }),
                          (0, n.jsx)("div", {
                            className: "flex flex-col gap-4 mt-4",
                            children: (0, n.jsxs)("div", {
                              className: "grid w-full gap-2",
                              children: [
                                (0, n.jsx)(p.J, {
                                  htmlFor: "question",
                                  children: "Your Question",
                                }),
                                (0, n.jsx)(m.T, {
                                  id: "question",
                                  placeholder:
                                    "What is the main topic of this document?",
                                  value: h,
                                  onChange: (e) => b(e.target.value),
                                  className: "min-h-[100px]",
                                }),
                              ],
                            }),
                          }),
                        ],
                      }),
                      v &&
                        (0, n.jsxs)("div", {
                          className: "mt-6",
                          children: [
                            (0, n.jsx)("h3", {
                              className: "font-medium mb-2",
                              children: "Answer",
                            }),
                            v.success
                              ? (0, n.jsx)("div", {
                                  className:
                                    "p-4 bg-muted rounded-md whitespace-pre-wrap",
                                  children: v.answer,
                                })
                              : (0, n.jsxs)("div", {
                                  className: "text-red-500",
                                  children: [
                                    "Error: ",
                                    v.error || "Unknown error occurred",
                                  ],
                                }),
                          ],
                        }),
                    ],
                  }),
                  (0, n.jsxs)(c.wL, {
                    className: "flex justify-between",
                    children: [
                      (0, n.jsx)(d.$, {
                        variant: "outline",
                        onClick: () => {
                          t(null), s(""), b(""), y(null);
                        },
                        children: "Clear",
                      }),
                      (0, n.jsx)(d.$, {
                        onClick: r ? w : j,
                        disabled: x || (!e && !r) || !h,
                        children: x
                          ? (0, n.jsxs)(n.Fragment, {
                              children: [
                                (0, n.jsx)(a.A, {
                                  className: "mr-2 h-4 w-4 animate-spin",
                                }),
                                "Processing...",
                              ],
                            })
                          : (0, n.jsx)(n.Fragment, {
                              children: r
                                ? (0, n.jsxs)(n.Fragment, {
                                    children: [
                                      (0, n.jsx)(o.A, {
                                        className: "mr-2 h-4 w-4",
                                      }),
                                      "Process URL",
                                    ],
                                  })
                                : (0, n.jsxs)(n.Fragment, {
                                    children: [
                                      (0, n.jsx)(i.A, {
                                        className: "mr-2 h-4 w-4",
                                      }),
                                      "Process Document",
                                    ],
                                  }),
                            }),
                      }),
                    ],
                  }),
                ],
              });
            }
            ([d, c, u, p, f, m] = h.then ? (await h)() : h), s();
          } catch (e) {
            s(e);
          }
        });
      },
      57075: (e) => {
        "use strict";
        e.exports = require("node:stream");
      },
      57975: (e) => {
        "use strict";
        e.exports = require("node:util");
      },
      58882: (e, t, r) => {
        "use strict";
        r.d(t, { A: () => s });
        let s = (0, r(95255).A)("Upload", [
          [
            "path",
            { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4", key: "ih7n3h" },
          ],
          ["polyline", { points: "17 8 12 3 7 8", key: "t8dd8p" }],
          ["line", { x1: "12", x2: "12", y1: "3", y2: "15", key: "widbto" }],
        ]);
      },
      58897: (e, t, r) => {
        "use strict";
        r.d(t, { BatchProcessor: () => s });
        let s = (0, r(26394).registerClientReference)(
          function () {
            throw Error(
              "Attempted to call BatchProcessor() from the server but BatchProcessor is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\apps\\web\\src\\components\\ui\\document\\BatchProcessor.tsx",
          "BatchProcessor",
        );
      },
      59150: (e, t, r) => {
        "use strict";
        r.d(t, { RG: () => j, bL: () => P, q7: () => A });
        var s = r(84205),
          n = r(28777),
          a = r(28029),
          o = r(71604),
          i = r(18047),
          l = r(42414),
          d = r(78593),
          c = r(10308),
          u = r(48705),
          p = r(7839),
          f = r(61268),
          m = "rovingFocusGroup.onEntryFocus",
          h = { bubbles: !1, cancelable: !0 },
          b = "RovingFocusGroup",
          [x, g, v] = (0, a.N)(b),
          [y, j] = (0, i.A)(b, [v]),
          [w, C] = y(b),
          R = s.forwardRef((e, t) =>
            (0, f.jsx)(x.Provider, {
              scope: e.__scopeRovingFocusGroup,
              children: (0, f.jsx)(x.Slot, {
                scope: e.__scopeRovingFocusGroup,
                children: (0, f.jsx)(N, { ...e, ref: t }),
              }),
            }),
          );
        R.displayName = b;
        var N = s.forwardRef((e, t) => {
            let {
                __scopeRovingFocusGroup: r,
                orientation: a,
                loop: i = !1,
                dir: l,
                currentTabStopId: x,
                defaultCurrentTabStopId: v,
                onCurrentTabStopIdChange: y,
                onEntryFocus: j,
                preventScrollOnEntryFocus: C = !1,
                ...R
              } = e,
              N = s.useRef(null),
              S = (0, o.s)(t, N),
              E = (0, p.jH)(l),
              [_, P] = (0, u.i)({
                prop: x,
                defaultProp: v ?? null,
                onChange: y,
                caller: b,
              }),
              [A, T] = s.useState(!1),
              I = (0, c.c)(j),
              O = g(r),
              M = s.useRef(!1),
              [F, D] = s.useState(0);
            return (
              s.useEffect(() => {
                let e = N.current;
                if (e)
                  return (
                    e.addEventListener(m, I), () => e.removeEventListener(m, I)
                  );
              }, [I]),
              (0, f.jsx)(w, {
                scope: r,
                orientation: a,
                dir: E,
                loop: i,
                currentTabStopId: _,
                onItemFocus: s.useCallback((e) => P(e), [P]),
                onItemShiftTab: s.useCallback(() => T(!0), []),
                onFocusableItemAdd: s.useCallback(() => D((e) => e + 1), []),
                onFocusableItemRemove: s.useCallback(() => D((e) => e - 1), []),
                children: (0, f.jsx)(d.sG.div, {
                  tabIndex: A || 0 === F ? -1 : 0,
                  "data-orientation": a,
                  ...R,
                  ref: S,
                  style: { outline: "none", ...e.style },
                  onMouseDown: (0, n.m)(e.onMouseDown, () => {
                    M.current = !0;
                  }),
                  onFocus: (0, n.m)(e.onFocus, (e) => {
                    let t = !M.current;
                    if (e.target === e.currentTarget && t && !A) {
                      let t = new CustomEvent(m, h);
                      if (
                        (e.currentTarget.dispatchEvent(t), !t.defaultPrevented)
                      ) {
                        let e = O().filter((e) => e.focusable);
                        k(
                          [
                            e.find((e) => e.active),
                            e.find((e) => e.id === _),
                            ...e,
                          ]
                            .filter(Boolean)
                            .map((e) => e.ref.current),
                          C,
                        );
                      }
                    }
                    M.current = !1;
                  }),
                  onBlur: (0, n.m)(e.onBlur, () => T(!1)),
                }),
              })
            );
          }),
          S = "RovingFocusGroupItem",
          E = s.forwardRef((e, t) => {
            let {
                __scopeRovingFocusGroup: r,
                focusable: a = !0,
                active: o = !1,
                tabStopId: i,
                children: c,
                ...u
              } = e,
              p = (0, l.B)(),
              m = i || p,
              h = C(S, r),
              b = h.currentTabStopId === m,
              v = g(r),
              {
                onFocusableItemAdd: y,
                onFocusableItemRemove: j,
                currentTabStopId: w,
              } = h;
            return (
              s.useEffect(() => {
                if (a) return y(), () => j();
              }, [a, y, j]),
              (0, f.jsx)(x.ItemSlot, {
                scope: r,
                id: m,
                focusable: a,
                active: o,
                children: (0, f.jsx)(d.sG.span, {
                  tabIndex: b ? 0 : -1,
                  "data-orientation": h.orientation,
                  ...u,
                  ref: t,
                  onMouseDown: (0, n.m)(e.onMouseDown, (e) => {
                    a ? h.onItemFocus(m) : e.preventDefault();
                  }),
                  onFocus: (0, n.m)(e.onFocus, () => h.onItemFocus(m)),
                  onKeyDown: (0, n.m)(e.onKeyDown, (e) => {
                    if ("Tab" === e.key && e.shiftKey)
                      return void h.onItemShiftTab();
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
                        return _[n];
                    })(e, h.orientation, h.dir);
                    if (void 0 !== t) {
                      if (e.metaKey || e.ctrlKey || e.altKey || e.shiftKey)
                        return;
                      e.preventDefault();
                      let r = v()
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
                      setTimeout(() => k(r));
                    }
                  }),
                  children:
                    "function" == typeof c
                      ? c({ isCurrentTabStop: b, hasTabStop: null != w })
                      : c,
                }),
              })
            );
          });
        E.displayName = S;
        var _ = {
          ArrowLeft: "prev",
          ArrowUp: "prev",
          ArrowRight: "next",
          ArrowDown: "next",
          PageUp: "first",
          Home: "first",
          PageDown: "last",
          End: "last",
        };
        function k(e, t = !1) {
          let r = document.activeElement;
          for (let s of e)
            if (
              s === r ||
              (s.focus({ preventScroll: t }), document.activeElement !== r)
            )
              return;
        }
        var P = R,
          A = E;
      },
      61950: (e, t, r) => {
        "use strict";
        r.d(t, { A: () => s });
        let s = (0, r(95255).A)("AlertCircle", [
          ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
          ["line", { x1: "12", x2: "12", y1: "8", y2: "12", key: "1pkeuh" }],
          [
            "line",
            { x1: "12", x2: "12.01", y1: "16", y2: "16", key: "4dfq90" },
          ],
        ]);
      },
      63033: (e) => {
        "use strict";
        e.exports = require("next/dist/server/app-render/work-unit-async-storage.external.js");
      },
      65278: (e, t, r) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          !(function (e, t) {
            for (var r in t)
              Object.defineProperty(e, r, { enumerable: !0, get: t[r] });
          })(t, {
            getRedirectError: function () {
              return o;
            },
            getRedirectStatusCodeFromError: function () {
              return u;
            },
            getRedirectTypeFromError: function () {
              return c;
            },
            getURLFromRedirectError: function () {
              return d;
            },
            permanentRedirect: function () {
              return l;
            },
            redirect: function () {
              return i;
            },
          });
        let s = r(20835),
          n = r(21293),
          a = r(19121).actionAsyncStorage;
        function o(e, t, r) {
          void 0 === r && (r = s.RedirectStatusCode.TemporaryRedirect);
          let a = Object.defineProperty(
            Error(n.REDIRECT_ERROR_CODE),
            "__NEXT_ERROR_CODE",
            { value: "E394", enumerable: !1, configurable: !0 },
          );
          return (
            (a.digest =
              n.REDIRECT_ERROR_CODE + ";" + t + ";" + e + ";" + r + ";"),
            a
          );
        }
        function i(e, t) {
          var r;
          throw (
            (null != t ||
              (t = (
                null == a || null == (r = a.getStore()) ? void 0 : r.isAction
              )
                ? n.RedirectType.push
                : n.RedirectType.replace),
            o(e, t, s.RedirectStatusCode.TemporaryRedirect))
          );
        }
        function l(e, t) {
          throw (
            (void 0 === t && (t = n.RedirectType.replace),
            o(e, t, s.RedirectStatusCode.PermanentRedirect))
          );
        }
        function d(e) {
          return (0, n.isRedirectError)(e)
            ? e.digest.split(";").slice(2, -2).join(";")
            : null;
        }
        function c(e) {
          if (!(0, n.isRedirectError)(e))
            throw Object.defineProperty(
              Error("Not a redirect error"),
              "__NEXT_ERROR_CODE",
              { value: "E260", enumerable: !1, configurable: !0 },
            );
          return e.digest.split(";", 2)[1];
        }
        function u(e) {
          if (!(0, n.isRedirectError)(e))
            throw Object.defineProperty(
              Error("Not a redirect error"),
              "__NEXT_ERROR_CODE",
              { value: "E260", enumerable: !1, configurable: !0 },
            );
          return Number(e.digest.split(";").at(-2));
        }
        ("function" == typeof t.default ||
          ("object" == typeof t.default && null !== t.default)) &&
          void 0 === t.default.__esModule &&
          (Object.defineProperty(t.default, "__esModule", { value: !0 }),
          Object.assign(t.default, t),
          (e.exports = t.default));
      },
      65469: (e, t, r) => {
        "use strict";
        r.d(t, { A: () => s });
        let s = (0, r(30980).A)("Info", [
          ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
          ["path", { d: "M12 16v-4", key: "1dtifu" }],
          ["path", { d: "M12 8h.01", key: "e9boi3" }],
        ]);
      },
      66135: (e, t, r) => {
        "use strict";
        r.d(t, { A: () => s });
        let s = (0, r(95255).A)("Loader2", [
          ["path", { d: "M21 12a9 9 0 1 1-6.219-8.56", key: "13zald" }],
        ]);
      },
      66321: (e, t, r) => {
        "use strict";
        r.a(e, async (e, s) => {
          try {
            r.d(t, {
              A0: () => d,
              BF: () => c,
              Hj: () => u,
              XI: () => l,
              nA: () => f,
              nd: () => p,
              r6: () => m,
            });
            var n = r(61268),
              a = r(84205),
              o = r(15942),
              i = e([o]);
            o = (i.then ? (await i)() : i)[0];
            let l = a.forwardRef(({ className: e, ...t }, r) =>
              (0, n.jsx)("div", {
                className: "relative w-full overflow-auto",
                children: (0, n.jsx)("table", {
                  ref: r,
                  className: (0, o.cn)("w-full caption-bottom text-sm", e),
                  ...t,
                }),
              }),
            );
            l.displayName = "Table";
            let d = a.forwardRef(({ className: e, ...t }, r) =>
              (0, n.jsx)("thead", {
                ref: r,
                className: (0, o.cn)("[&_tr]:border-b", e),
                ...t,
              }),
            );
            d.displayName = "TableHeader";
            let c = a.forwardRef(({ className: e, ...t }, r) =>
              (0, n.jsx)("tbody", {
                ref: r,
                className: (0, o.cn)("[&_tr:last-child]:border-0", e),
                ...t,
              }),
            );
            (c.displayName = "TableBody"),
              (a.forwardRef(({ className: e, ...t }, r) =>
                (0, n.jsx)("tfoot", {
                  ref: r,
                  className: (0, o.cn)(
                    "border-t bg-muted/50 font-medium [&>tr]:last:border-b-0",
                    e,
                  ),
                  ...t,
                }),
              ).displayName = "TableFooter");
            let u = a.forwardRef(({ className: e, ...t }, r) =>
              (0, n.jsx)("tr", {
                ref: r,
                className: (0, o.cn)(
                  "border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted",
                  e,
                ),
                ...t,
              }),
            );
            u.displayName = "TableRow";
            let p = a.forwardRef(({ className: e, ...t }, r) =>
              (0, n.jsx)("th", {
                ref: r,
                className: (0, o.cn)(
                  "h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0",
                  e,
                ),
                ...t,
              }),
            );
            p.displayName = "TableHead";
            let f = a.forwardRef(({ className: e, ...t }, r) =>
              (0, n.jsx)("td", {
                ref: r,
                className: (0, o.cn)(
                  "p-4 align-middle [&:has([role=checkbox])]:pr-0",
                  e,
                ),
                ...t,
              }),
            );
            f.displayName = "TableCell";
            let m = a.forwardRef(({ className: e, ...t }, r) =>
              (0, n.jsx)("caption", {
                ref: r,
                className: (0, o.cn)("mt-4 text-sm text-muted-foreground", e),
                ...t,
              }),
            );
            (m.displayName = "TableCaption"), s();
          } catch (e) {
            s(e);
          }
        });
      },
      67356: (e, t, r) => {
        "use strict";
        r.r(t),
          r.d(t, {
            GlobalError: () => a.default,
            __next_app__: () => c,
            pages: () => d,
            routeModule: () => u,
            tree: () => l,
          });
        var s = r(11610),
          n = r(51293),
          a = r(59059),
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
        let l = {
            children: [
              "",
              {
                children: [
                  "(ai-unified)",
                  {
                    children: [
                      "ocr",
                      {
                        children: [
                          "__PAGE__",
                          {},
                          {
                            page: [
                              () => Promise.resolve().then(r.bind(r, 54599)),
                              "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\(ai-unified)\\ocr\\page.tsx",
                            ],
                          },
                        ],
                      },
                      {},
                    ],
                  },
                  {
                    layout: [
                      () => Promise.resolve().then(r.bind(r, 89663)),
                      "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\(ai-unified)\\layout.tsx",
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
          d = [
            "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\(ai-unified)\\ocr\\page.tsx",
          ],
          c = { require: r, loadChunk: () => Promise.resolve() },
          u = new s.AppPageRouteModule({
            definition: {
              kind: n.RouteKind.APP_PAGE,
              page: "/(ai-unified)/ocr/page",
              pathname: "/ocr",
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
      73927: (e, t, r) => {
        "use strict";
        r.r(t),
          r.d(t, { "4055c9f9dce3c849928e65e87017b3609674121d00": () => s.M });
        var s = r(29997);
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
      76773: (e, t, r) => {
        "use strict";
        r.a(e, async (e, s) => {
          try {
            r.d(t, { MistralOcrUploader: () => h });
            var n = r(61268),
              a = r(66135),
              o = r(58882),
              i = r(84205),
              l = r(28909),
              d = r(5451),
              c = r(78337),
              u = r(16979),
              p = r(15090),
              f = r(32367),
              m = e([l, d, c, u]);
            function h() {
              let e = (0, f.Iw)(),
                { toast: t } = (0, p.d)(),
                [r, s] = (0, i.useState)(null),
                [m, h] = (0, i.useState)({ status: "idle", message: "" }),
                b = async () => {
                  if (!r) return;
                  h({ status: "getting_user", message: "Starting upload..." });
                  let s = null;
                  try {
                    let {
                      data: { user: n },
                      error: a,
                    } = await e.auth.getUser();
                    if (a || !n)
                      throw Error(a?.message || "User not authenticated.");
                    h({
                      status: "creating_record",
                      message: "Creating document record...",
                    });
                    let o = {
                        owner_id: n.id,
                        name: r.name,
                        file_size: r.size,
                        mime_type: r.type,
                        status: "uploading",
                      },
                      { data: i, error: l } = await e
                        .from("documents")
                        .insert(o)
                        .select("id")
                        .single();
                    if (l || !i?.id)
                      throw (
                        (console.error("DB Insert Error Details:", l),
                        Error(
                          l?.message || "Failed to create document record.",
                        ))
                      );
                    (s = i.id),
                      h({
                        status: "uploading",
                        message: "Uploading file to secure storage...",
                      });
                    let d = `${n.id}/${s}/${r.name}`,
                      { error: c } = await e.storage
                        .from("documents")
                        .upload(d, r);
                    if (c)
                      throw (
                        (console.warn(
                          `Upload failed for doc ${s}, attempting DB cleanup.`,
                        ),
                        await e.from("documents").delete().eq("id", s),
                        (s = null),
                        Error(c.message || "Failed to upload file."))
                      );
                    h({
                      status: "updating_record",
                      message: "Finalizing document record...",
                    });
                    let { error: u } = await e
                      .from("documents")
                      .update({ file_path: d, status: "uploaded" })
                      .eq("id", s);
                    if (u)
                      throw (
                        (console.error(
                          `Failed to update doc ${s} status after successful upload:`,
                          u,
                        ),
                        Error(
                          u.message ||
                            "Failed to update document record after upload.",
                        ))
                      );
                    h({
                      status: "triggering",
                      message: "Initiating processing workflow...",
                    });
                    let p = await fetch("/api/documents/process", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                          documentId: s,
                          filePath: d,
                          fileType: r.type,
                        }),
                      }),
                      f = await p.json();
                    if (!p.ok || !f.success)
                      throw (
                        (console.error(
                          `Failed to trigger processing via API for doc ${s}:`,
                          f.error,
                        ),
                        await e
                          .from("documents")
                          .update({
                            status: "processing_failed",
                            status_message:
                              f.error || "Failed to trigger processing",
                          })
                          .eq("id", s),
                        Error(
                          f.error || "Failed to trigger document processing.",
                        ))
                      );
                    let m = f.eventId
                      ? `Upload complete! Processing started (Event ID: ${f.eventId}).`
                      : "Upload complete! Document verified, processing trigger temporarily disabled.";
                    h({ status: "success", message: m }),
                      t({
                        title: "Upload Successful",
                        description: "Document processing has started.",
                      });
                  } catch (r) {
                    console.error("Error during document upload process:", r);
                    let e =
                      r instanceof Error ? r.message : "Unknown error occurred";
                    h({ status: "error", message: "Upload failed", error: e }),
                      t({
                        title: "Upload Failed",
                        description: e,
                        variant: "destructive",
                      });
                  } finally {
                  }
                },
                x = [
                  "getting_user",
                  "creating_record",
                  "uploading",
                  "updating_record",
                  "triggering",
                ].includes(m.status);
              return (0, n.jsxs)(d.Zp, {
                className: "w-full max-w-lg mx-auto",
                children: [
                  (0, n.jsxs)(d.aR, {
                    children: [
                      (0, n.jsx)(d.ZB, {
                        children: "Upload Document for Processing",
                      }),
                      (0, n.jsx)(d.BT, {
                        children:
                          "Select a document (PDF, PNG, JPG, TIFF) to upload and start the processing pipeline.",
                      }),
                    ],
                  }),
                  (0, n.jsxs)(d.Wu, {
                    className: "space-y-6",
                    children: [
                      (0, n.jsxs)("div", {
                        className: "grid w-full gap-2",
                        children: [
                          (0, n.jsx)(u.J, {
                            htmlFor: "file",
                            children: "Select Document",
                          }),
                          (0, n.jsx)(c.p, {
                            id: "file",
                            type: "file",
                            accept: ".pdf,.png,.jpg,.jpeg,.tiff,.tif",
                            onChange: (e) => {
                              e.target.files &&
                                e.target.files[0] &&
                                (s(e.target.files[0]),
                                h({ status: "idle", message: "" }));
                            },
                            disabled: x,
                          }),
                          r &&
                            (0, n.jsxs)("p", {
                              className: "text-sm text-muted-foreground",
                              children: [
                                "Selected: ",
                                r.name,
                                " (",
                                Math.round(r.size / 1024),
                                " KB)",
                              ],
                            }),
                        ],
                      }),
                      ("idle" !== m.status || m.message) &&
                        (0, n.jsxs)("div", {
                          className: "mt-4 p-3 rounded-md bg-muted/50 border",
                          children: [
                            (0, n.jsx)("h3", {
                              className: "font-medium mb-1 text-sm",
                              children: "Upload Status",
                            }),
                            (0, n.jsx)("p", {
                              className: `text-sm ${"error" === m.status ? "text-red-600" : "text-muted-foreground"}`,
                              children: m.message,
                            }),
                            m.error &&
                              (0, n.jsxs)("p", {
                                className: "text-xs text-red-700 mt-1",
                                children: ["Error details: ", m.error],
                              }),
                          ],
                        }),
                    ],
                  }),
                  (0, n.jsxs)(d.wL, {
                    className: "flex justify-between",
                    children: [
                      (0, n.jsx)(l.$, {
                        variant: "outline",
                        onClick: () => {
                          s(null), h({ status: "idle", message: "" });
                        },
                        disabled: x,
                        children: "Clear",
                      }),
                      (0, n.jsx)(l.$, {
                        onClick: b,
                        disabled: x || !r,
                        children: x
                          ? (0, n.jsxs)(n.Fragment, {
                              children: [
                                (0, n.jsx)(a.A, {
                                  className: "mr-2 h-4 w-4 animate-spin",
                                }),
                                m.message || "Processing...",
                              ],
                            })
                          : (0, n.jsxs)(n.Fragment, {
                              children: [
                                (0, n.jsx)(o.A, { className: "mr-2 h-4 w-4" }),
                                "Upload and Process",
                              ],
                            }),
                      }),
                    ],
                  }),
                ],
              });
            }
            ([l, d, c, u] = m.then ? (await m)() : m), s();
          } catch (e) {
            s(e);
          }
        });
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
            var n = r(61268),
              a = r(28366);
            r(84205);
            var o = r(15942),
              i = e([o]);
            function l({ className: e, ...t }) {
              return (0, n.jsx)(a.bL, {
                "data-slot": "tabs",
                className: (0, o.cn)("flex flex-col gap-2", e),
                ...t,
              });
            }
            function d({ className: e, ...t }) {
              return (0, n.jsx)(a.B8, {
                "data-slot": "tabs-list",
                className: (0, o.cn)(
                  "bg-muted text-muted-foreground inline-flex h-9 w-fit items-center justify-center rounded-lg p-[3px]",
                  e,
                ),
                ...t,
              });
            }
            function c({ className: e, ...t }) {
              return (0, n.jsx)(a.l9, {
                "data-slot": "tabs-trigger",
                className: (0, o.cn)(
                  "data-[state=active]:bg-background dark:data-[state=active]:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:outline-ring dark:data-[state=active]:border-input dark:data-[state=active]:bg-input/30 text-foreground dark:text-muted-foreground inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-md border border-transparent px-2 py-1 text-sm font-medium whitespace-nowrap transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:shadow-sm [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
                  e,
                ),
                ...t,
              });
            }
            function u({ className: e, ...t }) {
              return (0, n.jsx)(a.UC, {
                "data-slot": "tabs-content",
                className: (0, o.cn)("flex-1 outline-none", e),
                ...t,
              });
            }
            (o = (i.then ? (await i)() : i)[0]), s();
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
      79428: (e) => {
        "use strict";
        e.exports = require("buffer");
      },
      79446: (e, t, r) => {
        "use strict";
        r.d(t, { MistralDocumentUnderstanding: () => s });
        let s = (0, r(26394).registerClientReference)(
          function () {
            throw Error(
              "Attempted to call MistralDocumentUnderstanding() from the server but MistralDocumentUnderstanding is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\apps\\web\\src\\components\\ui\\document\\MistralDocumentUnderstanding.tsx",
          "MistralDocumentUnderstanding",
        );
      },
      79551: (e) => {
        "use strict";
        e.exports = require("url");
      },
      79646: (e) => {
        "use strict";
        e.exports = require("child_process");
      },
      79826: (e, t, r) => {
        "use strict";
        r.a(e, async (e, s) => {
          try {
            r.d(t, { S: () => c });
            var n = r(61268),
              a = r(9235),
              o = r(415),
              i = r(84205),
              l = r(15942),
              d = e([l]);
            l = (d.then ? (await d)() : d)[0];
            let c = i.forwardRef(({ className: e, ...t }, r) =>
              (0, n.jsx)(a.bL, {
                ref: r,
                className: (0, l.cn)(
                  "peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
                  e,
                ),
                ...t,
                children: (0, n.jsx)(a.C1, {
                  className: (0, l.cn)(
                    "flex items-center justify-center text-current",
                  ),
                  children: (0, n.jsx)(o.A, { className: "h-4 w-4" }),
                }),
              }),
            );
            (c.displayName = a.bL.displayName), s();
          } catch (e) {
            s(e);
          }
        });
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
      84101: (e, t, r) => {
        "use strict";
        r.d(t, { F: () => o });
        var s = r(63775);
        let n = (e) => ("boolean" == typeof e ? `${e}` : 0 === e ? "0" : e),
          a = s.$,
          o = (e, t) => (r) => {
            var s;
            if ((null == t ? void 0 : t.variants) == null)
              return a(
                e,
                null == r ? void 0 : r.class,
                null == r ? void 0 : r.className,
              );
            let { variants: o, defaultVariants: i } = t,
              l = Object.keys(o).map((e) => {
                let t = null == r ? void 0 : r[e],
                  s = null == i ? void 0 : i[e];
                if (null === t) return null;
                let a = n(t) || n(s);
                return o[e][a];
              }),
              d =
                r &&
                Object.entries(r).reduce((e, t) => {
                  let [r, s] = t;
                  return void 0 === s || (e[r] = s), e;
                }, {});
            return a(
              e,
              l,
              null == t || null == (s = t.compoundVariants)
                ? void 0
                : s.reduce((e, t) => {
                    let { class: r, className: s, ...n } = t;
                    return Object.entries(n).every((e) => {
                      let [t, r] = e;
                      return Array.isArray(r)
                        ? r.includes({ ...i, ...d }[t])
                        : { ...i, ...d }[t] === r;
                    })
                      ? [...e, r, s]
                      : e;
                  }, []),
              null == r ? void 0 : r.class,
              null == r ? void 0 : r.className,
            );
          };
      },
      84297: (e) => {
        "use strict";
        e.exports = require("async_hooks");
      },
      85352: (e, t, r) => {
        Promise.resolve().then(r.bind(r, 43851)),
          Promise.resolve().then(r.bind(r, 33713)),
          Promise.resolve().then(r.bind(r, 3519)),
          Promise.resolve().then(r.t.bind(r, 99966, 23));
      },
      85488: (e) => {
        "use strict";
        e.exports = import("ai");
      },
      86327: (e, t) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          Object.defineProperty(t, "setAttributesFromProps", {
            enumerable: !0,
            get: function () {
              return a;
            },
          });
        let r = {
            acceptCharset: "accept-charset",
            className: "class",
            htmlFor: "for",
            httpEquiv: "http-equiv",
            noModule: "noModule",
          },
          s = [
            "onLoad",
            "onReady",
            "dangerouslySetInnerHTML",
            "children",
            "onError",
            "strategy",
            "stylesheets",
          ];
        function n(e) {
          return ["async", "defer", "noModule"].includes(e);
        }
        function a(e, t) {
          for (let [a, o] of Object.entries(t)) {
            if (!t.hasOwnProperty(a) || s.includes(a) || void 0 === o) continue;
            let i = r[a] || a.toLowerCase();
            "SCRIPT" === e.tagName && n(i)
              ? (e[i] = !!o)
              : e.setAttribute(i, String(o)),
              (!1 === o ||
                ("SCRIPT" === e.tagName && n(i) && (!o || "false" === o))) &&
                (e.setAttribute(i, ""), e.removeAttribute(i));
          }
        }
        ("function" == typeof t.default ||
          ("object" == typeof t.default && null !== t.default)) &&
          void 0 === t.default.__esModule &&
          (Object.defineProperty(t.default, "__esModule", { value: !0 }),
          Object.assign(t.default, t),
          (e.exports = t.default));
      },
      86592: (e) => {
        "use strict";
        e.exports = require("node:inspector");
      },
      89663: (e, t, r) => {
        "use strict";
        let s;
        r.r(t),
          r.d(t, {
            default: () => v,
            experimental_ppr: () => p,
            generateImageMetadata: () => x,
            generateMetadata: () => b,
            generateViewport: () => g,
          });
        var n = r(63033),
          a = r(35242),
          o = r(15058),
          i = r(42057),
          l = r(16714),
          d = r(98699),
          c = r(14795),
          u = r(60442);
        let p = !0;
        async function f({ children: e }) {
          let [t, r] = await Promise.all([(0, c.j2)(), (0, o.UL)()]),
            s = r.get("sidebar:state")?.value !== "true";
          return (0, a.jsxs)(a.Fragment, {
            children: [
              (0, a.jsx)(i.default, {
                src: "https://cdn.jsdelivr.net/pyodide/v0.23.4/full/pyodide.js",
                strategy: "beforeInteractive",
              }),
              (0, a.jsxs)(d.SidebarProvider, {
                defaultOpen: !s,
                children: [
                  (0, a.jsx)(l.AppSidebar, {}),
                  (0, a.jsx)(d.SidebarInset, { children: e }),
                ],
              }),
            ],
          });
        }
        let m = { ...n },
          h =
            "workUnitAsyncStorage" in m
              ? m.workUnitAsyncStorage
              : "requestAsyncStorage" in m
                ? m.requestAsyncStorage
                : void 0;
        s = new Proxy(f, {
          apply: (e, t, r) => {
            let s, n, a;
            try {
              let e = h?.getStore();
              (s = e?.headers.get("sentry-trace") ?? void 0),
                (n = e?.headers.get("baggage") ?? void 0),
                (a = e?.headers);
            } catch (e) {}
            return u
              .wrapServerComponentWithSentry(e, {
                componentRoute: "/(ai-unified)",
                componentType: "Layout",
                sentryTraceHeader: s,
                baggageHeader: n,
                headers: a,
              })
              .apply(t, r);
          },
        });
        let b = void 0,
          x = void 0,
          g = void 0,
          v = s;
      },
      90645: (e, t, r) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          !(function (e, t) {
            for (var r in t)
              Object.defineProperty(e, r, { enumerable: !0, get: t[r] });
          })(t, {
            ReadonlyURLSearchParams: function () {
              return c;
            },
            RedirectType: function () {
              return n.RedirectType;
            },
            forbidden: function () {
              return o.forbidden;
            },
            notFound: function () {
              return a.notFound;
            },
            permanentRedirect: function () {
              return s.permanentRedirect;
            },
            redirect: function () {
              return s.redirect;
            },
            unauthorized: function () {
              return i.unauthorized;
            },
            unstable_rethrow: function () {
              return l.unstable_rethrow;
            },
          });
        let s = r(65278),
          n = r(21293),
          a = r(11316),
          o = r(14749),
          i = r(52480),
          l = r(42600);
        class d extends Error {
          constructor() {
            super(
              "Method unavailable on `ReadonlyURLSearchParams`. Read more: https://nextjs.org/docs/app/api-reference/functions/use-search-params#updating-searchparams",
            );
          }
        }
        class c extends URLSearchParams {
          append() {
            throw new d();
          }
          delete() {
            throw new d();
          }
          set() {
            throw new d();
          }
          sort() {
            throw new d();
          }
        }
        ("function" == typeof t.default ||
          ("object" == typeof t.default && null !== t.default)) &&
          void 0 === t.default.__esModule &&
          (Object.defineProperty(t.default, "__esModule", { value: !0 }),
          Object.assign(t.default, t),
          (e.exports = t.default));
      },
      91557: (e, t, r) => {
        "use strict";
        r.d(t, { X: () => a });
        var s = r(84205),
          n = r(66130);
        function a(e) {
          let [t, r] = s.useState(void 0);
          return (
            (0, n.N)(() => {
              if (e) {
                r({ width: e.offsetWidth, height: e.offsetHeight });
                let t = new ResizeObserver((t) => {
                  let s, n;
                  if (!Array.isArray(t) || !t.length) return;
                  let a = t[0];
                  if ("borderBoxSize" in a) {
                    let e = a.borderBoxSize,
                      t = Array.isArray(e) ? e[0] : e;
                    (s = t.inlineSize), (n = t.blockSize);
                  } else (s = e.offsetWidth), (n = e.offsetHeight);
                  r({ width: s, height: n });
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
      92256: (e, t, r) => {
        "use strict";
        r.a(e, async (e, s) => {
          try {
            r.d(t, { k: () => d });
            var n = r(61268),
              a = r(49917),
              o = r(84205),
              i = r(15942),
              l = e([i]);
            i = (l.then ? (await l)() : l)[0];
            let d = o.forwardRef(({ className: e, value: t, ...r }, s) =>
              (0, n.jsx)(a.bL, {
                ref: s,
                className: (0, i.cn)(
                  "relative h-2 w-full overflow-hidden rounded-full bg-secondary",
                  e,
                ),
                ...r,
                children: (0, n.jsx)(a.C1, {
                  className: "h-full w-full flex-1 bg-primary transition-all",
                  style: { transform: `translateX(-${100 - (t || 0)}%)` },
                }),
              }),
            );
            (d.displayName = a.bL.displayName), s();
          } catch (e) {
            s(e);
          }
        });
      },
      94735: (e) => {
        "use strict";
        e.exports = require("events");
      },
      98683: (e, t, r) => {
        "use strict";
        r.d(t, { A: () => s });
        let s = (0, r(95255).A)("CheckCircle2", [
          ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
          ["path", { d: "m9 12 2 2 4-4", key: "dzmm74" }],
        ]);
      },
      98699: (e, t, r) => {
        "use strict";
        r.d(t, {
          SidebarInset: () => n,
          SidebarProvider: () => a,
          SidebarTrigger: () => o,
        });
        var s = r(26394);
        (0, s.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call Sidebar() from the server but Sidebar is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\apps\\web\\src\\components\\ui\\sidebar.tsx",
          "Sidebar",
        ),
          (0, s.registerClientReference)(
            function () {
              throw Error(
                "Attempted to call SidebarContent() from the server but SidebarContent is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
              );
            },
            "E:\\downloads\\Hijraah\\apps\\web\\src\\components\\ui\\sidebar.tsx",
            "SidebarContent",
          ),
          (0, s.registerClientReference)(
            function () {
              throw Error(
                "Attempted to call SidebarFooter() from the server but SidebarFooter is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
              );
            },
            "E:\\downloads\\Hijraah\\apps\\web\\src\\components\\ui\\sidebar.tsx",
            "SidebarFooter",
          ),
          (0, s.registerClientReference)(
            function () {
              throw Error(
                "Attempted to call SidebarGroup() from the server but SidebarGroup is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
              );
            },
            "E:\\downloads\\Hijraah\\apps\\web\\src\\components\\ui\\sidebar.tsx",
            "SidebarGroup",
          ),
          (0, s.registerClientReference)(
            function () {
              throw Error(
                "Attempted to call SidebarGroupAction() from the server but SidebarGroupAction is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
              );
            },
            "E:\\downloads\\Hijraah\\apps\\web\\src\\components\\ui\\sidebar.tsx",
            "SidebarGroupAction",
          ),
          (0, s.registerClientReference)(
            function () {
              throw Error(
                "Attempted to call SidebarGroupContent() from the server but SidebarGroupContent is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
              );
            },
            "E:\\downloads\\Hijraah\\apps\\web\\src\\components\\ui\\sidebar.tsx",
            "SidebarGroupContent",
          ),
          (0, s.registerClientReference)(
            function () {
              throw Error(
                "Attempted to call SidebarGroupLabel() from the server but SidebarGroupLabel is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
              );
            },
            "E:\\downloads\\Hijraah\\apps\\web\\src\\components\\ui\\sidebar.tsx",
            "SidebarGroupLabel",
          ),
          (0, s.registerClientReference)(
            function () {
              throw Error(
                "Attempted to call SidebarHeader() from the server but SidebarHeader is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
              );
            },
            "E:\\downloads\\Hijraah\\apps\\web\\src\\components\\ui\\sidebar.tsx",
            "SidebarHeader",
          ),
          (0, s.registerClientReference)(
            function () {
              throw Error(
                "Attempted to call SidebarInput() from the server but SidebarInput is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
              );
            },
            "E:\\downloads\\Hijraah\\apps\\web\\src\\components\\ui\\sidebar.tsx",
            "SidebarInput",
          );
        let n = (0, s.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call SidebarInset() from the server but SidebarInset is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\apps\\web\\src\\components\\ui\\sidebar.tsx",
          "SidebarInset",
        );
        (0, s.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call SidebarMenu() from the server but SidebarMenu is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\apps\\web\\src\\components\\ui\\sidebar.tsx",
          "SidebarMenu",
        ),
          (0, s.registerClientReference)(
            function () {
              throw Error(
                "Attempted to call SidebarMenuAction() from the server but SidebarMenuAction is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
              );
            },
            "E:\\downloads\\Hijraah\\apps\\web\\src\\components\\ui\\sidebar.tsx",
            "SidebarMenuAction",
          ),
          (0, s.registerClientReference)(
            function () {
              throw Error(
                "Attempted to call SidebarMenuBadge() from the server but SidebarMenuBadge is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
              );
            },
            "E:\\downloads\\Hijraah\\apps\\web\\src\\components\\ui\\sidebar.tsx",
            "SidebarMenuBadge",
          ),
          (0, s.registerClientReference)(
            function () {
              throw Error(
                "Attempted to call SidebarMenuButton() from the server but SidebarMenuButton is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
              );
            },
            "E:\\downloads\\Hijraah\\apps\\web\\src\\components\\ui\\sidebar.tsx",
            "SidebarMenuButton",
          ),
          (0, s.registerClientReference)(
            function () {
              throw Error(
                "Attempted to call SidebarMenuItem() from the server but SidebarMenuItem is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
              );
            },
            "E:\\downloads\\Hijraah\\apps\\web\\src\\components\\ui\\sidebar.tsx",
            "SidebarMenuItem",
          ),
          (0, s.registerClientReference)(
            function () {
              throw Error(
                "Attempted to call SidebarMenuSkeleton() from the server but SidebarMenuSkeleton is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
              );
            },
            "E:\\downloads\\Hijraah\\apps\\web\\src\\components\\ui\\sidebar.tsx",
            "SidebarMenuSkeleton",
          ),
          (0, s.registerClientReference)(
            function () {
              throw Error(
                "Attempted to call SidebarMenuSub() from the server but SidebarMenuSub is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
              );
            },
            "E:\\downloads\\Hijraah\\apps\\web\\src\\components\\ui\\sidebar.tsx",
            "SidebarMenuSub",
          ),
          (0, s.registerClientReference)(
            function () {
              throw Error(
                "Attempted to call SidebarMenuSubButton() from the server but SidebarMenuSubButton is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
              );
            },
            "E:\\downloads\\Hijraah\\apps\\web\\src\\components\\ui\\sidebar.tsx",
            "SidebarMenuSubButton",
          ),
          (0, s.registerClientReference)(
            function () {
              throw Error(
                "Attempted to call SidebarMenuSubItem() from the server but SidebarMenuSubItem is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
              );
            },
            "E:\\downloads\\Hijraah\\apps\\web\\src\\components\\ui\\sidebar.tsx",
            "SidebarMenuSubItem",
          );
        let a = (0, s.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call SidebarProvider() from the server but SidebarProvider is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\apps\\web\\src\\components\\ui\\sidebar.tsx",
          "SidebarProvider",
        );
        (0, s.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call SidebarRail() from the server but SidebarRail is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\apps\\web\\src\\components\\ui\\sidebar.tsx",
          "SidebarRail",
        ),
          (0, s.registerClientReference)(
            function () {
              throw Error(
                "Attempted to call SidebarSeparator() from the server but SidebarSeparator is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
              );
            },
            "E:\\downloads\\Hijraah\\apps\\web\\src\\components\\ui\\sidebar.tsx",
            "SidebarSeparator",
          );
        let o = (0, s.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call SidebarTrigger() from the server but SidebarTrigger is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\apps\\web\\src\\components\\ui\\sidebar.tsx",
          "SidebarTrigger",
        );
        (0, s.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call useSidebar() from the server but useSidebar is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\apps\\web\\src\\components\\ui\\sidebar.tsx",
          "useSidebar",
        );
      },
      99793: (e, t, r) => {
        "use strict";
        r.d(t, { A: () => s });
        let s = (0, r(95255).A)("FileText", [
          [
            "path",
            {
              d: "M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z",
              key: "1rqfz7",
            },
          ],
          ["path", { d: "M14 2v4a2 2 0 0 0 2 2h4", key: "tnqrlb" }],
          ["path", { d: "M10 9H8", key: "b1mrlr" }],
          ["path", { d: "M16 13H8", key: "t4e002" }],
          ["path", { d: "M16 17H8", key: "z1uh3a" }],
        ]);
      },
      99966: (e, t, r) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          !(function (e, t) {
            for (var r in t)
              Object.defineProperty(e, r, { enumerable: !0, get: t[r] });
          })(t, {
            default: function () {
              return g;
            },
            handleClientScriptLoad: function () {
              return h;
            },
            initScriptLoader: function () {
              return b;
            },
          });
        let s = r(17380),
          n = r(88835),
          a = r(61268),
          o = s._(r(90304)),
          i = n._(r(84205)),
          l = r(3954),
          d = r(86327),
          c = r(1523),
          u = new Map(),
          p = new Set(),
          f = (e) => {
            if (o.default.preinit)
              return void e.forEach((e) => {
                o.default.preinit(e, { as: "style" });
              });
          },
          m = (e) => {
            let {
                src: t,
                id: r,
                onLoad: s = () => {},
                onReady: n = null,
                dangerouslySetInnerHTML: a,
                children: o = "",
                strategy: i = "afterInteractive",
                onError: l,
                stylesheets: c,
              } = e,
              m = r || t;
            if (m && p.has(m)) return;
            if (u.has(t)) {
              p.add(m), u.get(t).then(s, l);
              return;
            }
            let h = () => {
                n && n(), p.add(m);
              },
              b = document.createElement("script"),
              x = new Promise((e, t) => {
                b.addEventListener("load", function (t) {
                  e(), s && s.call(this, t), h();
                }),
                  b.addEventListener("error", function (e) {
                    t(e);
                  });
              }).catch(function (e) {
                l && l(e);
              });
            a
              ? ((b.innerHTML = a.__html || ""), h())
              : o
                ? ((b.textContent =
                    "string" == typeof o
                      ? o
                      : Array.isArray(o)
                        ? o.join("")
                        : ""),
                  h())
                : t && ((b.src = t), u.set(t, x)),
              (0, d.setAttributesFromProps)(b, e),
              "worker" === i && b.setAttribute("type", "text/partytown"),
              b.setAttribute("data-nscript", i),
              c && f(c),
              document.body.appendChild(b);
          };
        function h(e) {
          let { strategy: t = "afterInteractive" } = e;
          "lazyOnload" === t
            ? window.addEventListener("load", () => {
                (0, c.requestIdleCallback)(() => m(e));
              })
            : m(e);
        }
        function b(e) {
          e.forEach(h),
            [
              ...document.querySelectorAll(
                '[data-nscript="beforeInteractive"]',
              ),
              ...document.querySelectorAll('[data-nscript="beforePageRender"]'),
            ].forEach((e) => {
              let t = e.id || e.getAttribute("src");
              p.add(t);
            });
        }
        function x(e) {
          let {
              id: t,
              src: r = "",
              onLoad: s = () => {},
              onReady: n = null,
              strategy: d = "afterInteractive",
              onError: u,
              stylesheets: f,
              ...h
            } = e,
            {
              updateScripts: b,
              scripts: x,
              getIsSsr: g,
              appDir: v,
              nonce: y,
            } = (0, i.useContext)(l.HeadManagerContext),
            j = (0, i.useRef)(!1);
          (0, i.useEffect)(() => {
            let e = t || r;
            j.current || (n && e && p.has(e) && n(), (j.current = !0));
          }, [n, t, r]);
          let w = (0, i.useRef)(!1);
          if (
            ((0, i.useEffect)(() => {
              if (!w.current) {
                if ("afterInteractive" === d) m(e);
                else
                  "lazyOnload" === d &&
                    ("complete" === document.readyState
                      ? (0, c.requestIdleCallback)(() => m(e))
                      : window.addEventListener("load", () => {
                          (0, c.requestIdleCallback)(() => m(e));
                        }));
                w.current = !0;
              }
            }, [e, d]),
            ("beforeInteractive" === d || "worker" === d) &&
              (b
                ? ((x[d] = (x[d] || []).concat([
                    { id: t, src: r, onLoad: s, onReady: n, onError: u, ...h },
                  ])),
                  b(x))
                : g && g()
                  ? p.add(t || r)
                  : g && !g() && m(e)),
            v)
          ) {
            if (
              (f &&
                f.forEach((e) => {
                  o.default.preinit(e, { as: "style" });
                }),
              "beforeInteractive" === d)
            )
              if (!r)
                return (
                  h.dangerouslySetInnerHTML &&
                    ((h.children = h.dangerouslySetInnerHTML.__html),
                    delete h.dangerouslySetInnerHTML),
                  (0, a.jsx)("script", {
                    nonce: y,
                    dangerouslySetInnerHTML: {
                      __html:
                        "(self.__next_s=self.__next_s||[]).push(" +
                        JSON.stringify([0, { ...h, id: t }]) +
                        ")",
                    },
                  })
                );
              else
                return (
                  o.default.preload(
                    r,
                    h.integrity
                      ? {
                          as: "script",
                          integrity: h.integrity,
                          nonce: y,
                          crossOrigin: h.crossOrigin,
                        }
                      : { as: "script", nonce: y, crossOrigin: h.crossOrigin },
                  ),
                  (0, a.jsx)("script", {
                    nonce: y,
                    dangerouslySetInnerHTML: {
                      __html:
                        "(self.__next_s=self.__next_s||[]).push(" +
                        JSON.stringify([r, { ...h, id: t }]) +
                        ")",
                    },
                  })
                );
            "afterInteractive" === d &&
              r &&
              o.default.preload(
                r,
                h.integrity
                  ? {
                      as: "script",
                      integrity: h.integrity,
                      nonce: y,
                      crossOrigin: h.crossOrigin,
                    }
                  : { as: "script", nonce: y, crossOrigin: h.crossOrigin },
              );
          }
          return null;
        }
        Object.defineProperty(x, "__nextScript", { value: !0 });
        let g = x;
        ("function" == typeof t.default ||
          ("object" == typeof t.default && null !== t.default)) &&
          void 0 === t.default.__esModule &&
          (Object.defineProperty(t.default, "__esModule", { value: !0 }),
          Object.assign(t.default, t),
          (e.exports = t.default));
      },
    });
  var t = require("../../../webpack-runtime.js");
  t.C(e);
  var r = (e) => t((t.s = e)),
    s = t.X(
      0,
      [
        827, 6518, 2033, 4027, 2872, 7713, 5149, 8859, 1655, 8029, 5728, 9729,
        3390, 4990, 7719, 6188, 7911, 7401, 5124, 3042, 385, 8119, 5058, 131,
        2028, 7111, 4292, 4630, 8264, 27, 4232,
      ],
      () => r(67356),
    );
  module.exports = s;
})();
//# sourceMappingURL=page.js.map
