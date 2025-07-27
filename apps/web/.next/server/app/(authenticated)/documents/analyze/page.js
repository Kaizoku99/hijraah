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
    (e._sentryDebugIds[t] = "b66f9941-7c63-4a28-92d7-6e17c5814093"),
    (e._sentryDebugIdIdentifier =
      "sentry-dbid-b66f9941-7c63-4a28-92d7-6e17c5814093"));
} catch (e) {}
(() => {
  var e = {};
  (e.id = 2313),
    (e.ids = [2313]),
    (e.modules = {
      1278: (e, t, r) => {
        "use strict";
        r.d(t, { Qg: () => i, bL: () => l });
        var s = r(84205),
          a = r(56558),
          n = r(61268),
          i = Object.freeze({
            position: "absolute",
            border: 0,
            width: 1,
            height: 1,
            padding: 0,
            margin: -1,
            overflow: "hidden",
            clip: "rect(0, 0, 0, 0)",
            whiteSpace: "nowrap",
            wordWrap: "normal",
          }),
          o = s.forwardRef((e, t) =>
            (0, n.jsx)(a.sG.span, {
              ...e,
              ref: t,
              style: { ...i, ...e.style },
            }),
          );
        o.displayName = "VisuallyHidden";
        var l = o;
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
              Wu: () => m,
              ZB: () => u,
              Zp: () => d,
              aR: () => c,
              wL: () => f,
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
            let m = i.forwardRef(({ className: e, ...t }, r) =>
              (0, a.jsx)("div", {
                ref: r,
                className: (0, o.cn)("p-6 pt-0", e),
                ...t,
              }),
            );
            m.displayName = "CardContent";
            let f = i.forwardRef(({ className: e, ...t }, r) =>
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
      7795: (e, t, r) => {
        "use strict";
        r.d(t, { DocumentAnalyzer: () => s });
        let s = (0, r(26394).registerClientReference)(
          function () {
            throw Error(
              "Attempted to call DocumentAnalyzer() from the server but DocumentAnalyzer is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\apps\\web\\src\\components\\ui\\documents\\DocumentAnalyzer.tsx",
          "DocumentAnalyzer",
        );
      },
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
      15090: (e, t, r) => {
        "use strict";
        r.d(t, { d: () => p });
        var s = r(84205);
        let a = {
            ADD_TOAST: "ADD_TOAST",
            UPDATE_TOAST: "UPDATE_TOAST",
            DISMISS_TOAST: "DISMISS_TOAST",
            REMOVE_TOAST: "REMOVE_TOAST",
          },
          n = 0,
          i = new Map(),
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
                if (r) i.has(r) && (clearTimeout(i.get(r)), i.delete(r));
                else
                  for (let [e, t] of i.entries()) clearTimeout(t), i.delete(e);
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
          d = { toasts: [] };
        function c(e) {
          (d = o(d, e)),
            l.forEach((e) => {
              e(d);
            });
        }
        function u({ ...e }) {
          let t = (n = (n + 1) % Number.MAX_VALUE).toString(),
            r = () => c({ type: a.DISMISS_TOAST, toastId: t });
          return (
            c({
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
                c({ type: a.UPDATE_TOAST, toast: { ...e, id: t } }),
            }
          );
        }
        function p() {
          let [e, t] = s.useState(d);
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
              dismiss: (e) => c({ type: a.DISMISS_TOAST, toastId: e }),
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
      16979: (e, t, r) => {
        "use strict";
        r.a(e, async (e, s) => {
          try {
            r.d(t, { J: () => l });
            var a = r(61268),
              n = r(30595);
            r(84205);
            var i = r(15942),
              o = e([i]);
            function l({ className: e, ...t }) {
              return (0, a.jsx)(n.b, {
                "data-slot": "label",
                className: (0, i.cn)(
                  "flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
                  e,
                ),
                ...t,
              });
            }
            (i = (o.then ? (await o)() : o)[0]), s();
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
        r.d(t, { B8: () => D, UC: () => k, bL: () => _, l9: () => C });
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
          m = "Tabs",
          [f, x] = (0, n.A)(m, [i.RG]),
          h = (0, i.RG)(),
          [g, v] = f(m),
          y = s.forwardRef((e, t) => {
            let {
                __scopeTabs: r,
                value: s,
                onValueChange: a,
                defaultValue: n,
                orientation: i = "horizontal",
                dir: o,
                activationMode: f = "automatic",
                ...x
              } = e,
              h = (0, d.jH)(o),
              [v, y] = (0, c.i)({
                prop: s,
                onChange: a,
                defaultProp: n ?? "",
                caller: m,
              });
            return (0, p.jsx)(g, {
              scope: r,
              baseId: (0, u.B)(),
              value: v,
              onValueChange: y,
              orientation: i,
              dir: h,
              activationMode: f,
              children: (0, p.jsx)(l.sG.div, {
                dir: h,
                "data-orientation": i,
                ...x,
                ref: t,
              }),
            });
          });
        y.displayName = m;
        var b = "TabsList",
          j = s.forwardRef((e, t) => {
            let { __scopeTabs: r, loop: s = !0, ...a } = e,
              n = v(b, r),
              o = h(r);
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
        j.displayName = b;
        var w = "TabsTrigger",
          N = s.forwardRef((e, t) => {
            let { __scopeTabs: r, value: s, disabled: n = !1, ...o } = e,
              d = v(w, r),
              c = h(r),
              u = E(d.baseId, s),
              m = S(d.baseId, s),
              f = s === d.value;
            return (0, p.jsx)(i.q7, {
              asChild: !0,
              ...c,
              focusable: !n,
              active: f,
              children: (0, p.jsx)(l.sG.button, {
                type: "button",
                role: "tab",
                "aria-selected": f,
                "aria-controls": m,
                "data-state": f ? "active" : "inactive",
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
                  f || n || !e || d.onValueChange(s);
                }),
              }),
            });
          });
        N.displayName = w;
        var A = "TabsContent",
          T = s.forwardRef((e, t) => {
            let {
                __scopeTabs: r,
                value: a,
                forceMount: n,
                children: i,
                ...d
              } = e,
              c = v(A, r),
              u = E(c.baseId, a),
              m = S(c.baseId, a),
              f = a === c.value,
              x = s.useRef(f);
            return (
              s.useEffect(() => {
                let e = requestAnimationFrame(() => (x.current = !1));
                return () => cancelAnimationFrame(e);
              }, []),
              (0, p.jsx)(o.C, {
                present: n || f,
                children: ({ present: r }) =>
                  (0, p.jsx)(l.sG.div, {
                    "data-state": f ? "active" : "inactive",
                    "data-orientation": c.orientation,
                    role: "tabpanel",
                    "aria-labelledby": u,
                    hidden: !r,
                    id: m,
                    tabIndex: 0,
                    ...d,
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
        function E(e, t) {
          return `${e}-trigger-${t}`;
        }
        function S(e, t) {
          return `${e}-content-${t}`;
        }
        T.displayName = A;
        var _ = y,
          D = j,
          C = N,
          k = T;
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
      42414: (e, t, r) => {
        "use strict";
        r.d(t, { B: () => l });
        var s,
          a = r(84205),
          n = r(66130),
          i =
            (s || (s = r.t(a, 2)))[" useId ".trim().toString()] ||
            (() => void 0),
          o = 0;
        function l(e) {
          let [t, r] = a.useState(i());
          return (
            (0, n.N)(() => {
              e || r((e) => e ?? String(o++));
            }, [e]),
            e || (t ? `radix-${t}` : "")
          );
        }
      },
      43886: () => {},
      44619: (e, t, r) => {
        "use strict";
        r.a(e, async (e, s) => {
          try {
            r.d(t, { Fc: () => l, TN: () => c, XL: () => d });
            var a = r(61268),
              n = r(91635);
            r(84205);
            var i = r(15942),
              o = e([i]);
            i = (o.then ? (await o)() : o)[0];
            let u = (0, n.F)(
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
              return (0, a.jsx)("div", {
                "data-slot": "alert",
                role: "alert",
                className: (0, i.cn)(u({ variant: t }), e),
                ...r,
              });
            }
            function d({ className: e, ...t }) {
              return (0, a.jsx)("div", {
                "data-slot": "alert-title",
                className: (0, i.cn)(
                  "col-start-2 line-clamp-1 min-h-4 font-medium tracking-tight",
                  e,
                ),
                ...t,
              });
            }
            function c({ className: e, ...t }) {
              return (0, a.jsx)("div", {
                "data-slot": "alert-description",
                className: (0, i.cn)(
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
            var a = r(61268),
              n = r(86415),
              i = r(91635);
            r(84205);
            var o = r(15942),
              l = e([o]);
            o = (l.then ? (await l)() : l)[0];
            let c = (0, i.F)(
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
              let i = r ? n.DX : "span";
              return (0, a.jsx)(i, {
                "data-slot": "badge",
                className: (0, o.cn)(c({ variant: t }), e),
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
      48322: (e, t, r) => {
        "use strict";
        r.d(t, { A: () => s });
        let s = (0, r(95255).A)("AlertTriangle", [
          [
            "path",
            {
              d: "m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z",
              key: "c3ski4",
            },
          ],
          ["path", { d: "M12 9v4", key: "juzpu7" }],
          ["path", { d: "M12 17h.01", key: "p32p05" }],
        ]);
      },
      49077: (e, t, r) => {
        "use strict";
        r.a(e, async (e, s) => {
          try {
            r.d(t, { DocumentAnalyzer: () => T });
            var a = r(61268),
              n = r(64818),
              i = r(48322),
              o = r(58882),
              l = r(99793),
              d = r(89882),
              c = r(84205),
              u = r(67359),
              p = r(81368),
              m = r(11603),
              f = r(44619),
              x = r(46532),
              h = r(28909),
              g = r(5451),
              v = r(78337),
              y = r(16979),
              b = r(92256),
              j = r(95957),
              w = r(77001),
              N = r(15090),
              A = e([m, f, x, h, g, v, y, b, j, w]);
            function T({
              onAnalysisComplete: e,
              allowedDocumentTypes: t,
              defaultDocumentType: r = p.K.PASSPORT,
              targetCountry: s,
              userId: A,
              className: T,
            }) {
              (0, d.useRouter)();
              let { toast: E } = (0, N.d)(),
                [S, _] = (0, c.useState)(null),
                [D, C] = (0, c.useState)(r),
                [k, I] = (0, c.useState)(!1),
                [R, q] = (0, c.useState)(0),
                [M, P] = (0, c.useState)(!1),
                [z, O] = (0, c.useState)(null),
                [F, U] = (0, c.useState)("upload"),
                L = t || Object.values(p.K),
                $ = (0, c.useCallback)(async () => {
                  if (!S)
                    return void E({
                      title: "No file selected",
                      description: "Please select a document file to analyze.",
                      variant: "destructive",
                    });
                  try {
                    I(!0), q(10);
                    let t = "documents",
                      r = A ? `users/${A}` : "public",
                      a = {
                        documentType: D,
                        uploadedAt: new Date().toISOString(),
                        originalName: S.name,
                      },
                      n = await (0, u.QM)(t, S, r, a);
                    q(50);
                    let i = (0, u.b4)(t, n);
                    I(!1), P(!0), q(70);
                    let o = await fetch("/api/ai/document-analysis", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({
                        documentType: D,
                        fileUrl: i,
                        userId: A,
                        targetCountry: s,
                      }),
                    });
                    if (!o.ok) throw Error(`Analysis failed: ${o.statusText}`);
                    let l = await o.json();
                    if ((q(100), !l.success))
                      throw Error(l.error || "Analysis failed");
                    O(l.data),
                      e && e(l.data),
                      U("results"),
                      E({
                        title: "Document analysis complete",
                        description: l.data.isValid
                          ? "The document has been successfully analyzed."
                          : "The document has been analyzed with some issues.",
                      });
                  } catch (e) {
                    console.error("Document analysis error:", e),
                      E({
                        title: "Analysis failed",
                        description:
                          e instanceof Error
                            ? e.message
                            : "Failed to analyze document",
                        variant: "destructive",
                      });
                  } finally {
                    I(!1), P(!1);
                  }
                }, [S, D, A, s, E, e]);
              return (0, a.jsxs)(g.Zp, {
                className: T,
                children: [
                  (0, a.jsxs)(g.aR, {
                    children: [
                      (0, a.jsxs)(g.ZB, {
                        className: "flex items-center gap-2",
                        children: [
                          (0, a.jsx)(n.A, { className: "h-5 w-5" }),
                          "Document Analyzer",
                        ],
                      }),
                      (0, a.jsx)(g.BT, {
                        children:
                          "Upload and analyze immigration documents for validation and information extraction",
                      }),
                    ],
                  }),
                  (0, a.jsxs)(w.Tabs, {
                    defaultValue: "upload",
                    children: [
                      (0, a.jsxs)(w.TabsList, {
                        className: "mx-6",
                        children: [
                          (0, a.jsx)(w.TabsTrigger, {
                            value: "upload",
                            onClick: () => U("upload"),
                            children: "Upload",
                          }),
                          (0, a.jsx)(w.TabsTrigger, {
                            value: "results",
                            onClick: () => U("results"),
                            disabled: !z,
                            children: "Results",
                          }),
                        ],
                      }),
                      (0, a.jsxs)(g.Wu, {
                        className: "pt-6",
                        children: [
                          "upload" === F &&
                            (0, a.jsxs)("div", {
                              className: "space-y-4",
                              children: [
                                (0, a.jsxs)("div", {
                                  className: "space-y-2",
                                  children: [
                                    (0, a.jsx)(y.J, {
                                      htmlFor: "documentType",
                                      children: "Document Type",
                                    }),
                                    (0, a.jsxs)(j.l6, {
                                      value: D,
                                      onValueChange: (e) => {
                                        C(e), O(null);
                                      },
                                      disabled: k || M,
                                      children: [
                                        (0, a.jsx)(j.bq, {
                                          id: "documentType",
                                          children: (0, a.jsx)(j.yv, {
                                            placeholder:
                                              "Select a document type",
                                          }),
                                        }),
                                        (0, a.jsx)(j.gC, {
                                          children: L.map((e) =>
                                            (0, a.jsx)(
                                              j.eb,
                                              {
                                                value: e,
                                                children: e
                                                  .replace(/_/g, " ")
                                                  .replace(/\b\w/g, (e) =>
                                                    e.toUpperCase(),
                                                  ),
                                              },
                                              e,
                                            ),
                                          ),
                                        }),
                                      ],
                                    }),
                                  ],
                                }),
                                (0, a.jsxs)("div", {
                                  className: "space-y-2",
                                  children: [
                                    (0, a.jsx)(y.J, {
                                      htmlFor: "file",
                                      children: "Document File",
                                    }),
                                    (0, a.jsx)("div", {
                                      className: "flex items-center gap-2",
                                      children: (0, a.jsx)(v.p, {
                                        id: "file",
                                        type: "file",
                                        onChange: (e) => {
                                          if (
                                            e.target.files &&
                                            e.target.files[0]
                                          ) {
                                            let t = e.target.files[0];
                                            _(t), q(0), O(null);
                                          }
                                        },
                                        accept: ".pdf,.jpg,.jpeg,.png",
                                        disabled: k || M,
                                        className: "flex-1",
                                      }),
                                    }),
                                    S &&
                                      (0, a.jsxs)("p", {
                                        className:
                                          "text-sm text-muted-foreground",
                                        children: [
                                          "Selected: ",
                                          S.name,
                                          " (",
                                          (S.size / 1024 / 1024).toFixed(2),
                                          " MB)",
                                        ],
                                      }),
                                  ],
                                }),
                                (k || M) &&
                                  (0, a.jsxs)("div", {
                                    className: "space-y-2",
                                    children: [
                                      (0, a.jsxs)("div", {
                                        className:
                                          "flex items-center justify-between",
                                        children: [
                                          (0, a.jsx)(y.J, {
                                            children: k
                                              ? "Uploading..."
                                              : "Analyzing...",
                                          }),
                                          (0, a.jsxs)("span", {
                                            className:
                                              "text-sm text-muted-foreground",
                                            children: [R, "%"],
                                          }),
                                        ],
                                      }),
                                      (0, a.jsx)(b.k, {
                                        value: R,
                                        className: "h-2",
                                      }),
                                    ],
                                  }),
                              ],
                            }),
                          "results" === F &&
                            z &&
                            (0, a.jsxs)("div", {
                              className: "space-y-6",
                              children: [
                                (0, a.jsxs)("div", {
                                  className:
                                    "flex items-center justify-between",
                                  children: [
                                    (0, a.jsxs)("div", {
                                      className: "flex items-center gap-2",
                                      children: [
                                        (0, a.jsx)(x.E, {
                                          variant: z.isValid
                                            ? "default"
                                            : "destructive",
                                          children: z.isValid
                                            ? "Valid"
                                            : "Invalid",
                                        }),
                                        (0, a.jsxs)("span", {
                                          className: "text-sm font-medium",
                                          children: [
                                            "Completeness:",
                                            " ",
                                            Math.round(100 * z.completeness),
                                            "%",
                                          ],
                                        }),
                                      ],
                                    }),
                                    (0, a.jsxs)(x.E, {
                                      variant: "outline",
                                      children: [
                                        z.languageDetection.primary.toUpperCase(),
                                        z.languageDetection.secondary &&
                                          ` / ${z.languageDetection.secondary.toUpperCase()}`,
                                      ],
                                    }),
                                  ],
                                }),
                                (0, a.jsxs)("div", {
                                  className: "space-y-4",
                                  children: [
                                    (0, a.jsxs)(f.Fc, {
                                      variant:
                                        z.formatErrors.length > 0
                                          ? "destructive"
                                          : "default",
                                      children: [
                                        (0, a.jsx)(i.A, {
                                          className: "h-4 w-4",
                                        }),
                                        (0, a.jsx)(f.XL, {
                                          className: "ml-2",
                                          children: "Format Issues",
                                        }),
                                        (0, a.jsx)(f.TN, {
                                          children:
                                            0 === z.formatErrors.length
                                              ? "No format issues detected"
                                              : `${z.formatErrors.length} format ${1 === z.formatErrors.length ? "issue" : "issues"} detected`,
                                        }),
                                      ],
                                    }),
                                    z.formatErrors.length > 0 &&
                                      (0, a.jsx)(m.nD, {
                                        type: "single",
                                        collapsible: !0,
                                        className: "w-full",
                                        children: z.formatErrors.map((e, t) =>
                                          (0, a.jsxs)(
                                            m.As,
                                            {
                                              value: `format-error-${t}`,
                                              children: [
                                                (0, a.jsxs)(m.$m, {
                                                  className:
                                                    "flex items-center gap-2",
                                                  children: [
                                                    (0, a.jsx)(x.E, {
                                                      variant:
                                                        "critical" === e.type
                                                          ? "destructive"
                                                          : "outline",
                                                      children: e.type,
                                                    }),
                                                    (0, a.jsx)("span", {
                                                      children: e.message,
                                                    }),
                                                  ],
                                                }),
                                                (0, a.jsxs)(m.ub, {
                                                  children: [
                                                    e.suggestion &&
                                                      (0, a.jsxs)("div", {
                                                        className:
                                                          "mt-2 rounded-md bg-muted p-3",
                                                        children: [
                                                          (0, a.jsx)("p", {
                                                            className:
                                                              "text-sm font-medium",
                                                            children:
                                                              "Suggestion:",
                                                          }),
                                                          (0, a.jsx)("p", {
                                                            className:
                                                              "text-sm",
                                                            children:
                                                              e.suggestion,
                                                          }),
                                                        ],
                                                      }),
                                                    e.position &&
                                                      (0, a.jsx)("div", {
                                                        className: "mt-2",
                                                        children: (0, a.jsxs)(
                                                          "p",
                                                          {
                                                            className:
                                                              "text-sm text-muted-foreground",
                                                            children: [
                                                              "Position: x: ",
                                                              e.position.x,
                                                              ", y:",
                                                              " ",
                                                              e.position.y,
                                                            ],
                                                          },
                                                        ),
                                                      }),
                                                  ],
                                                }),
                                              ],
                                            },
                                            t,
                                          ),
                                        ),
                                      }),
                                  ],
                                }),
                                (0, a.jsxs)("div", {
                                  className: "space-y-4",
                                  children: [
                                    (0, a.jsxs)(f.Fc, {
                                      variant:
                                        z.contentErrors.length > 0
                                          ? "destructive"
                                          : "default",
                                      children: [
                                        (0, a.jsx)(i.A, {
                                          className: "h-4 w-4",
                                        }),
                                        (0, a.jsx)(f.XL, {
                                          className: "ml-2",
                                          children: "Content Issues",
                                        }),
                                        (0, a.jsx)(f.TN, {
                                          children:
                                            0 === z.contentErrors.length
                                              ? "No content issues detected"
                                              : `${z.contentErrors.length} content ${1 === z.contentErrors.length ? "issue" : "issues"} detected`,
                                        }),
                                      ],
                                    }),
                                    z.contentErrors.length > 0 &&
                                      (0, a.jsx)(m.nD, {
                                        type: "single",
                                        collapsible: !0,
                                        className: "w-full",
                                        children: z.contentErrors.map((e, t) =>
                                          (0, a.jsxs)(
                                            m.As,
                                            {
                                              value: `content-error-${t}`,
                                              children: [
                                                (0, a.jsxs)(m.$m, {
                                                  className:
                                                    "flex items-center gap-2",
                                                  children: [
                                                    (0, a.jsx)(x.E, {
                                                      variant:
                                                        "critical" === e.type
                                                          ? "destructive"
                                                          : "outline",
                                                      children: e.type,
                                                    }),
                                                    (0, a.jsx)("span", {
                                                      className: "ml-2",
                                                      children: e.message,
                                                    }),
                                                  ],
                                                }),
                                                (0, a.jsx)(m.ub, {
                                                  children: (0, a.jsxs)("div", {
                                                    className: "space-y-2",
                                                    children: [
                                                      (0, a.jsxs)("div", {
                                                        children: [
                                                          (0, a.jsx)("p", {
                                                            className:
                                                              "text-sm font-medium",
                                                            children:
                                                              "Section:",
                                                          }),
                                                          (0, a.jsx)("p", {
                                                            className:
                                                              "text-sm",
                                                            children: e.section,
                                                          }),
                                                        ],
                                                      }),
                                                      e.suggestion &&
                                                        (0, a.jsxs)("div", {
                                                          className:
                                                            "rounded-md bg-muted p-3",
                                                          children: [
                                                            (0, a.jsx)("p", {
                                                              className:
                                                                "text-sm font-medium",
                                                              children:
                                                                "Suggestion:",
                                                            }),
                                                            (0, a.jsx)("p", {
                                                              className:
                                                                "text-sm",
                                                              children:
                                                                e.suggestion,
                                                            }),
                                                          ],
                                                        }),
                                                    ],
                                                  }),
                                                }),
                                              ],
                                            },
                                            t,
                                          ),
                                        ),
                                      }),
                                  ],
                                }),
                                (0, a.jsxs)("div", {
                                  className: "space-y-4",
                                  children: [
                                    (0, a.jsx)("h3", {
                                      className: "text-lg font-medium",
                                      children: "Extracted Data",
                                    }),
                                    (0, a.jsx)("div", {
                                      className: "rounded-md border",
                                      children: (0, a.jsx)("div", {
                                        className: "grid grid-cols-2 gap-4 p-4",
                                        children: Object.entries(
                                          z.extractedData,
                                        ).map(([e, t]) =>
                                          (0, a.jsxs)(
                                            "div",
                                            {
                                              className: "space-y-1",
                                              children: [
                                                (0, a.jsxs)("p", {
                                                  className:
                                                    "text-sm font-medium",
                                                  children: [e, ":"],
                                                }),
                                                (0, a.jsx)("p", {
                                                  className: "text-sm",
                                                  children: t,
                                                }),
                                              ],
                                            },
                                            e,
                                          ),
                                        ),
                                      }),
                                    }),
                                  ],
                                }),
                              ],
                            }),
                        ],
                      }),
                    ],
                  }),
                  (0, a.jsxs)(g.wL, {
                    className: "flex justify-between",
                    children: [
                      (0, a.jsx)(h.$, {
                        variant: "outline",
                        onClick: () => {
                          _(null), C(r), q(0), O(null), U("upload");
                        },
                        children: "Reset",
                      }),
                      (0, a.jsx)(h.$, {
                        onClick: $,
                        disabled: !S || k || M,
                        children: k
                          ? (0, a.jsx)(o.A, {
                              className: "mr-2 h-4 w-4 animate-spin",
                            })
                          : M
                            ? (0, a.jsxs)("span", {
                                className: "flex items-center gap-2",
                                children: [
                                  (0, a.jsx)(l.A, { className: "h-4 w-4" }),
                                  "Analyzing...",
                                ],
                              })
                            : (0, a.jsxs)("span", {
                                className: "flex items-center gap-2",
                                children: [
                                  (0, a.jsx)(l.A, { className: "h-4 w-4" }),
                                  "Analyze Document",
                                ],
                              }),
                      }),
                    ],
                  }),
                ],
              });
            }
            ([m, f, x, h, g, v, y, b, j, w] = A.then ? (await A)() : A), s();
          } catch (e) {
            s(e);
          }
        });
      },
      49917: (e, t, r) => {
        "use strict";
        r.d(t, { C1: () => j, bL: () => b });
        var s = r(84205),
          a = r(18047),
          n = r(78593),
          i = r(61268),
          o = "Progress",
          [l, d] = (0, a.A)(o),
          [c, u] = l(o),
          p = s.forwardRef((e, t) => {
            var r, s;
            let {
              __scopeProgress: a,
              value: o = null,
              max: l,
              getValueLabel: d = x,
              ...u
            } = e;
            (l || 0 === l) &&
              !v(l) &&
              console.error(
                ((r = `${l}`),
                `Invalid prop \`max\` of value \`${r}\` supplied to \`Progress\`. Only numbers greater than 0 are valid max values. Defaulting to \`100\`.`),
              );
            let p = v(l) ? l : 100;
            null === o ||
              y(o, p) ||
              console.error(
                ((s = `${o}`),
                `Invalid prop \`value\` of value \`${s}\` supplied to \`Progress\`. The \`value\` prop must be:
  - a positive number
  - less than the value passed to \`max\` (or 100 if no \`max\` prop is set)
  - \`null\` or \`undefined\` if the progress is indeterminate.

Defaulting to \`null\`.`),
              );
            let m = y(o, p) ? o : null,
              f = g(m) ? d(m, p) : void 0;
            return (0, i.jsx)(c, {
              scope: a,
              value: m,
              max: p,
              children: (0, i.jsx)(n.sG.div, {
                "aria-valuemax": p,
                "aria-valuemin": 0,
                "aria-valuenow": g(m) ? m : void 0,
                "aria-valuetext": f,
                role: "progressbar",
                "data-state": h(m, p),
                "data-value": m ?? void 0,
                "data-max": p,
                ...u,
                ref: t,
              }),
            });
          });
        p.displayName = o;
        var m = "ProgressIndicator",
          f = s.forwardRef((e, t) => {
            let { __scopeProgress: r, ...s } = e,
              a = u(m, r);
            return (0, i.jsx)(n.sG.div, {
              "data-state": h(a.value, a.max),
              "data-value": a.value ?? void 0,
              "data-max": a.max,
              ...s,
              ref: t,
            });
          });
        function x(e, t) {
          return `${Math.round((e / t) * 100)}%`;
        }
        function h(e, t) {
          return null == e ? "indeterminate" : e === t ? "complete" : "loading";
        }
        function g(e) {
          return "number" == typeof e;
        }
        function v(e) {
          return g(e) && !isNaN(e) && e > 0;
        }
        function y(e, t) {
          return g(e) && !isNaN(e) && e <= t && e >= 0;
        }
        f.displayName = m;
        var b = p,
          j = f;
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
      59150: (e, t, r) => {
        "use strict";
        r.d(t, { RG: () => j, bL: () => C, q7: () => k });
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
          m = r(61268),
          f = "rovingFocusGroup.onEntryFocus",
          x = { bubbles: !1, cancelable: !0 },
          h = "RovingFocusGroup",
          [g, v, y] = (0, n.N)(h),
          [b, j] = (0, o.A)(h, [y]),
          [w, N] = b(h),
          A = s.forwardRef((e, t) =>
            (0, m.jsx)(g.Provider, {
              scope: e.__scopeRovingFocusGroup,
              children: (0, m.jsx)(g.Slot, {
                scope: e.__scopeRovingFocusGroup,
                children: (0, m.jsx)(T, { ...e, ref: t }),
              }),
            }),
          );
        A.displayName = h;
        var T = s.forwardRef((e, t) => {
            let {
                __scopeRovingFocusGroup: r,
                orientation: n,
                loop: o = !1,
                dir: l,
                currentTabStopId: g,
                defaultCurrentTabStopId: y,
                onCurrentTabStopIdChange: b,
                onEntryFocus: j,
                preventScrollOnEntryFocus: N = !1,
                ...A
              } = e,
              T = s.useRef(null),
              E = (0, i.s)(t, T),
              S = (0, p.jH)(l),
              [_, C] = (0, u.i)({
                prop: g,
                defaultProp: y ?? null,
                onChange: b,
                caller: h,
              }),
              [k, I] = s.useState(!1),
              R = (0, c.c)(j),
              q = v(r),
              M = s.useRef(!1),
              [P, z] = s.useState(0);
            return (
              s.useEffect(() => {
                let e = T.current;
                if (e)
                  return (
                    e.addEventListener(f, R), () => e.removeEventListener(f, R)
                  );
              }, [R]),
              (0, m.jsx)(w, {
                scope: r,
                orientation: n,
                dir: S,
                loop: o,
                currentTabStopId: _,
                onItemFocus: s.useCallback((e) => C(e), [C]),
                onItemShiftTab: s.useCallback(() => I(!0), []),
                onFocusableItemAdd: s.useCallback(() => z((e) => e + 1), []),
                onFocusableItemRemove: s.useCallback(() => z((e) => e - 1), []),
                children: (0, m.jsx)(d.sG.div, {
                  tabIndex: k || 0 === P ? -1 : 0,
                  "data-orientation": n,
                  ...A,
                  ref: E,
                  style: { outline: "none", ...e.style },
                  onMouseDown: (0, a.m)(e.onMouseDown, () => {
                    M.current = !0;
                  }),
                  onFocus: (0, a.m)(e.onFocus, (e) => {
                    let t = !M.current;
                    if (e.target === e.currentTarget && t && !k) {
                      let t = new CustomEvent(f, x);
                      if (
                        (e.currentTarget.dispatchEvent(t), !t.defaultPrevented)
                      ) {
                        let e = q().filter((e) => e.focusable);
                        D(
                          [
                            e.find((e) => e.active),
                            e.find((e) => e.id === _),
                            ...e,
                          ]
                            .filter(Boolean)
                            .map((e) => e.ref.current),
                          N,
                        );
                      }
                    }
                    M.current = !1;
                  }),
                  onBlur: (0, a.m)(e.onBlur, () => I(!1)),
                }),
              })
            );
          }),
          E = "RovingFocusGroupItem",
          S = s.forwardRef((e, t) => {
            let {
                __scopeRovingFocusGroup: r,
                focusable: n = !0,
                active: i = !1,
                tabStopId: o,
                children: c,
                ...u
              } = e,
              p = (0, l.B)(),
              f = o || p,
              x = N(E, r),
              h = x.currentTabStopId === f,
              y = v(r),
              {
                onFocusableItemAdd: b,
                onFocusableItemRemove: j,
                currentTabStopId: w,
              } = x;
            return (
              s.useEffect(() => {
                if (n) return b(), () => j();
              }, [n, b, j]),
              (0, m.jsx)(g.ItemSlot, {
                scope: r,
                id: f,
                focusable: n,
                active: i,
                children: (0, m.jsx)(d.sG.span, {
                  tabIndex: h ? 0 : -1,
                  "data-orientation": x.orientation,
                  ...u,
                  ref: t,
                  onMouseDown: (0, a.m)(e.onMouseDown, (e) => {
                    n ? x.onItemFocus(f) : e.preventDefault();
                  }),
                  onFocus: (0, a.m)(e.onFocus, () => x.onItemFocus(f)),
                  onKeyDown: (0, a.m)(e.onKeyDown, (e) => {
                    if ("Tab" === e.key && e.shiftKey)
                      return void x.onItemShiftTab();
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
                        return _[a];
                    })(e, x.orientation, x.dir);
                    if (void 0 !== t) {
                      if (e.metaKey || e.ctrlKey || e.altKey || e.shiftKey)
                        return;
                      e.preventDefault();
                      let r = y()
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
                      setTimeout(() => D(r));
                    }
                  }),
                  children:
                    "function" == typeof c
                      ? c({ isCurrentTabStop: h, hasTabStop: null != w })
                      : c,
                }),
              })
            );
          });
        S.displayName = E;
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
        function D(e, t = !1) {
          let r = document.activeElement;
          for (let s of e)
            if (
              s === r ||
              (s.focus({ preventScroll: t }), document.activeElement !== r)
            )
              return;
        }
        var C = A,
          k = S;
      },
      59570: () => {},
      63033: (e) => {
        "use strict";
        e.exports = require("next/dist/server/app-render/work-unit-async-storage.external.js");
      },
      64818: (e, t, r) => {
        "use strict";
        r.d(t, { A: () => s });
        let s = (0, r(95255).A)("FilePlus", [
          [
            "path",
            {
              d: "M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z",
              key: "1rqfz7",
            },
          ],
          ["path", { d: "M14 2v4a2 2 0 0 0 2 2h4", key: "tnqrlb" }],
          ["path", { d: "M9 15h6", key: "cctwl0" }],
          ["path", { d: "M12 18v-6", key: "17g6i2" }],
        ]);
      },
      67359: (e, t, r) => {
        "use strict";
        r.d(t, { QM: () => o, b4: () => l });
        var s = r(12872);
        let a = process.env.SUPABASE_SERVICE_ROLE_KEY || "",
          n = (0, s.createClient)("http://localhost:54321", a),
          i = "documents";
        async function o(e, t, r = i, s) {
          try {
            let a = Date.now(),
              i = Math.random().toString(36).substring(2, 10),
              o = encodeURIComponent(t.replace(/[^a-zA-Z0-9.-]/g, "_")),
              l = `${a}_${i}_${o}`,
              { data: d, error: c } = await n.storage.from(r).upload(l, e, {
                contentType: (function (e) {
                  switch (e.split(".").pop()?.toLowerCase()) {
                    case "pdf":
                      return "application/pdf";
                    case "png":
                      return "image/png";
                    case "jpg":
                    case "jpeg":
                      return "image/jpeg";
                    case "tiff":
                    case "tif":
                      return "image/tiff";
                    case "doc":
                      return "application/msword";
                    case "docx":
                      return "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
                    case "xls":
                      return "application/vnd.ms-excel";
                    case "xlsx":
                      return "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
                    case "ppt":
                      return "application/vnd.ms-powerpoint";
                    case "pptx":
                      return "application/vnd.openxmlformats-officedocument.presentationml.presentation";
                    default:
                      return "application/octet-stream";
                  }
                })(t),
                upsert: !1,
                ...(s ? { metadata: s } : {}),
              });
            if (c)
              throw (
                (console.error("Supabase Storage upload error:", c),
                Error(
                  `Failed to upload file to Supabase Storage: ${c.message}`,
                ))
              );
            if (!d || !d.path)
              throw Error("Failed to upload file: No path returned");
            return d.path;
          } catch (e) {
            throw (
              (console.error("File upload error:", e),
              Error(
                `File upload failed: ${e instanceof Error ? e.message : "Unknown error"}`,
              ))
            );
          }
        }
        function l(e, t = i) {
          let { data: r } = n.storage.from(t).getPublicUrl(e);
          return r.publicUrl;
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
            default: () => p,
            generateImageMetadata: () => c,
            generateMetadata: () => d,
            generateViewport: () => u,
          });
        var a = r(63033),
          n = r(35242),
          i = r(60442);
        let o = { ...a },
          l =
            "workUnitAsyncStorage" in o
              ? o.workUnitAsyncStorage
              : "requestAsyncStorage" in o
                ? o.requestAsyncStorage
                : void 0;
        s = new Proxy(
          function ({ children: e }) {
            return (0, n.jsx)(n.Fragment, { children: e });
          },
          {
            apply: (e, t, r) => {
              let s, a, n;
              try {
                let e = l?.getStore();
                (s = e?.headers.get("sentry-trace") ?? void 0),
                  (a = e?.headers.get("baggage") ?? void 0),
                  (n = e?.headers);
              } catch (e) {}
              return i
                .wrapServerComponentWithSentry(e, {
                  componentRoute: "/(authenticated)",
                  componentType: "Layout",
                  sentryTraceHeader: s,
                  baggageHeader: a,
                  headers: n,
                })
                .apply(t, r);
            },
          },
        );
        let d = void 0,
          c = void 0,
          u = void 0,
          p = s;
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
            var n = r(15942),
              i = e([n]);
            function o({ className: e, type: t, ...r }) {
              return (0, a.jsx)("input", {
                type: t,
                "data-slot": "input",
                className: (0, n.cn)(
                  "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
                  "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
                  "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
                  e,
                ),
                ...r,
              });
            }
            (n = (i.then ? (await i)() : i)[0]), s();
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
      81368: (e, t, r) => {
        "use strict";
        r.d(t, { K: () => a });
        var s = r(36352),
          a = (function (e) {
            return (
              (e.PASSPORT = "passport"),
              (e.VISA = "visa"),
              (e.BIRTH_CERTIFICATE = "birth_certificate"),
              (e.MARRIAGE_CERTIFICATE = "marriage_certificate"),
              (e.EDUCATION_CREDENTIAL = "education_credential"),
              (e.EMPLOYMENT_LETTER = "employment_letter"),
              (e.BANK_STATEMENT = "bank_statement"),
              (e.TAX_DOCUMENT = "tax_document"),
              (e.MEDICAL_RECORD = "medical_record"),
              (e.POLICE_CLEARANCE = "police_clearance"),
              (e.OTHER = "other"),
              e
            );
          })({});
        s.Ik({
          documentType: s.fc(a),
          fileUrl: s.Yj().url(),
          fileName: s.Yj(),
          userId: s.Yj().uuid(),
          validateAgainstTemplate: s.zM().optional().default(!1),
          callbackUrl: s.Yj().url().optional(),
          metadata: s.g1(s.Yj(), s.bz()).optional(),
        });
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
      89342: (e, t, r) => {
        Promise.resolve().then(r.bind(r, 49077));
      },
      91645: (e) => {
        "use strict";
        e.exports = require("net");
      },
      91932: (e, t, r) => {
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
                  "(authenticated)",
                  {
                    children: [
                      "documents",
                      {
                        children: [
                          "analyze",
                          {
                            children: [
                              "__PAGE__",
                              {},
                              {
                                page: [
                                  () =>
                                    Promise.resolve().then(r.bind(r, 95326)),
                                  "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\(authenticated)\\documents\\analyze\\page.tsx",
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
          d = [
            "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\(authenticated)\\documents\\analyze\\page.tsx",
          ],
          c = { require: r, loadChunk: () => Promise.resolve() },
          u = new s.AppPageRouteModule({
            definition: {
              kind: a.RouteKind.APP_PAGE,
              page: "/(authenticated)/documents/analyze/page",
              pathname: "/documents/analyze",
              bundlePath: "",
              filename: "",
              appPaths: [],
            },
            userland: { loaderTree: l },
          });
      },
      92256: (e, t, r) => {
        "use strict";
        r.a(e, async (e, s) => {
          try {
            r.d(t, { k: () => d });
            var a = r(61268),
              n = r(49917),
              i = r(84205),
              o = r(15942),
              l = e([o]);
            o = (l.then ? (await l)() : l)[0];
            let d = i.forwardRef(({ className: e, value: t, ...r }, s) =>
              (0, a.jsx)(n.bL, {
                ref: s,
                className: (0, o.cn)(
                  "relative h-2 w-full overflow-hidden rounded-full bg-secondary",
                  e,
                ),
                ...r,
                children: (0, a.jsx)(n.C1, {
                  className: "h-full w-full flex-1 bg-primary transition-all",
                  style: { transform: `translateX(-${100 - (t || 0)}%)` },
                }),
              }),
            );
            (d.displayName = n.bL.displayName), s();
          } catch (e) {
            s(e);
          }
        });
      },
      94070: (e, t, r) => {
        Promise.resolve().then(r.bind(r, 7795));
      },
      94735: (e) => {
        "use strict";
        e.exports = require("events");
      },
      95326: (e, t, r) => {
        "use strict";
        let s;
        r.r(t),
          r.d(t, {
            default: () => f,
            generateImageMetadata: () => p,
            generateMetadata: () => u,
            generateViewport: () => m,
            metadata: () => l,
          });
        var a = r(63033),
          n = r(35242),
          i = r(7795),
          o = r(60442);
        let l = {
            title: "Document Analysis - Hijraah",
            description:
              "Analyze and validate immigration documents with AI assistance",
          },
          d = { ...a },
          c =
            "workUnitAsyncStorage" in d
              ? d.workUnitAsyncStorage
              : "requestAsyncStorage" in d
                ? d.requestAsyncStorage
                : void 0;
        s = new Proxy(
          function () {
            return (0, n.jsx)("div", {
              className: "container mx-auto py-10",
              children: (0, n.jsxs)("div", {
                className: "max-w-4xl mx-auto space-y-6",
                children: [
                  (0, n.jsxs)("div", {
                    className: "space-y-2",
                    children: [
                      (0, n.jsx)("h1", {
                        className: "text-3xl font-bold tracking-tight",
                        children: "Document Analysis",
                      }),
                      (0, n.jsx)("p", {
                        className: "text-muted-foreground",
                        children:
                          "Upload your immigration documents for AI-powered analysis, validation, and data extraction.",
                      }),
                    ],
                  }),
                  (0, n.jsx)(i.DocumentAnalyzer, {}),
                  (0, n.jsxs)("div", {
                    className: "mt-8 space-y-4",
                    children: [
                      (0, n.jsx)("h2", {
                        className: "text-xl font-semibold",
                        children: "About Document Analysis",
                      }),
                      (0, n.jsxs)("div", {
                        className: "prose prose-gray max-w-none",
                        children: [
                          (0, n.jsx)("p", {
                            children:
                              "Our AI-powered document analyzer helps you ensure your immigration documents are correct, complete, and comply with requirements. The system can:",
                          }),
                          (0, n.jsxs)("ul", {
                            children: [
                              (0, n.jsx)("li", {
                                children:
                                  "Validate document format and content",
                              }),
                              (0, n.jsx)("li", {
                                children:
                                  "Extract key information automatically",
                              }),
                              (0, n.jsx)("li", {
                                children:
                                  "Identify potential errors and issues",
                              }),
                              (0, n.jsx)("li", {
                                children: "Provide suggestions for corrections",
                              }),
                              (0, n.jsx)("li", {
                                children: "Detect document language",
                              }),
                              (0, n.jsx)("li", {
                                children: "Assess document completeness",
                              }),
                            ],
                          }),
                          (0, n.jsx)("p", {
                            children:
                              "Currently supported document types include passports, visas, birth certificates, marriage certificates, education credentials, employment letters, and more.",
                          }),
                          (0, n.jsx)("h3", {
                            children: "Privacy and Security",
                          }),
                          (0, n.jsx)("p", {
                            children:
                              "All document processing is performed securely. Your documents are encrypted during transit and storage. The AI analysis is performed in isolated environments with strict access controls. We do not use your documents for training our AI models.",
                          }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
            });
          },
          {
            apply: (e, t, r) => {
              let s, a, n;
              try {
                let e = c?.getStore();
                (s = e?.headers.get("sentry-trace") ?? void 0),
                  (a = e?.headers.get("baggage") ?? void 0),
                  (n = e?.headers);
              } catch (e) {}
              return o
                .wrapServerComponentWithSentry(e, {
                  componentRoute: "/(authenticated)/documents/analyze",
                  componentType: "Page",
                  sentryTraceHeader: s,
                  baggageHeader: a,
                  headers: n,
                })
                .apply(t, r);
            },
          },
        );
        let u = void 0,
          p = void 0,
          m = void 0,
          f = s;
      },
      95957: (e, t, r) => {
        "use strict";
        r.a(e, async (e, s) => {
          try {
            r.d(t, {
              bq: () => m,
              eb: () => x,
              gC: () => f,
              l6: () => u,
              yv: () => p,
            });
            var a = r(61268),
              n = r(81242),
              i = r(70753),
              o = r(415),
              l = r(84205),
              d = r(15942),
              c = e([d]);
            d = (c.then ? (await c)() : c)[0];
            let u = n.bL;
            n.YJ;
            let p = n.WT,
              m = l.forwardRef(({ className: e, children: t, ...r }, s) =>
                (0, a.jsxs)(n.l9, {
                  ref: s,
                  className: (0, d.cn)(
                    "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                    e,
                  ),
                  ...r,
                  children: [
                    t,
                    (0, a.jsx)(n.In, {
                      asChild: !0,
                      children: (0, a.jsx)(i.A, {
                        className: "h-4 w-4 opacity-50",
                      }),
                    }),
                  ],
                }),
              );
            m.displayName = n.l9.displayName;
            let f = l.forwardRef(
              (
                { className: e, children: t, position: r = "popper", ...s },
                i,
              ) =>
                (0, a.jsx)(n.ZL, {
                  children: (0, a.jsx)(n.UC, {
                    ref: i,
                    className: (0, d.cn)(
                      "relative z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
                      "popper" === r &&
                        "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
                      e,
                    ),
                    position: r,
                    ...s,
                    children: (0, a.jsx)(n.LM, {
                      className: (0, d.cn)(
                        "p-1",
                        "popper" === r &&
                          "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]",
                      ),
                      children: t,
                    }),
                  }),
                }),
            );
            (f.displayName = n.UC.displayName),
              (l.forwardRef(({ className: e, ...t }, r) =>
                (0, a.jsx)(n.JU, {
                  ref: r,
                  className: (0, d.cn)(
                    "py-1.5 pl-8 pr-2 text-sm font-semibold",
                    e,
                  ),
                  ...t,
                }),
              ).displayName = n.JU.displayName);
            let x = l.forwardRef(({ className: e, children: t, ...r }, s) =>
              (0, a.jsxs)(n.q7, {
                ref: s,
                className: (0, d.cn)(
                  "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
                  e,
                ),
                ...r,
                children: [
                  (0, a.jsx)("span", {
                    className:
                      "absolute left-2 flex h-3.5 w-3.5 items-center justify-center",
                    children: (0, a.jsx)(n.VF, {
                      children: (0, a.jsx)(o.A, { className: "h-4 w-4" }),
                    }),
                  }),
                  (0, a.jsx)(n.p4, { children: t }),
                ],
              }),
            );
            (x.displayName = n.q7.displayName),
              (l.forwardRef(({ className: e, ...t }, r) =>
                (0, a.jsx)(n.wv, {
                  ref: r,
                  className: (0, d.cn)("-mx-1 my-1 h-px bg-muted", e),
                  ...t,
                }),
              ).displayName = n.wv.displayName),
              s();
          } catch (e) {
            s(e);
          }
        });
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
    });
  var t = require("../../../../webpack-runtime.js");
  t.C(e);
  var r = (e) => t((t.s = e)),
    s = t.X(
      0,
      [
        827, 6518, 2033, 4027, 2872, 8859, 8029, 5728, 9729, 3390, 6867, 1502,
        4630, 1603,
      ],
      () => r(91932),
    );
  module.exports = s;
})();
//# sourceMappingURL=page.js.map
