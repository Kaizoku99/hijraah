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
    (e._sentryDebugIds[t] = "f9b3fcb5-ee02-414e-953d-4d5ced442925"),
    (e._sentryDebugIdIdentifier =
      "sentry-dbid-f9b3fcb5-ee02-414e-953d-4d5ced442925"));
} catch (e) {}
(() => {
  var e = {};
  (e.id = 9275),
    (e.ids = [9275]),
    (e.modules = {
      1278: (e, t, r) => {
        "use strict";
        r.d(t, { Qg: () => o, bL: () => d });
        var s = r(84205),
          a = r(56558),
          i = r(61268),
          o = Object.freeze({
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
          n = s.forwardRef((e, t) =>
            (0, i.jsx)(a.sG.span, {
              ...e,
              ref: t,
              style: { ...o, ...e.style },
            }),
          );
        n.displayName = "VisuallyHidden";
        var d = n;
      },
      2434: (e, t, r) => {
        "use strict";
        r.a(e, async (e, s) => {
          try {
            r.r(t), r.d(t, { default: () => m });
            var a = r(61268),
              i = r(98262),
              o = r(97911),
              n = r(84205),
              d = r(28909),
              l = r(5451),
              c = r(79826),
              p = r(16979),
              u = r(95957),
              f = e([d, l, c, p, u]);
            [d, l, c, p, u] = f.then ? (await f)() : f;
            let h = {
              student: {
                name: "Student Visa",
                documents: [
                  "Valid passport",
                  "Acceptance letter from educational institution",
                  "Proof of financial support",
                  "Academic transcripts",
                  "Language proficiency test results",
                  "Passport-size photographs",
                  "Medical examination results",
                  "Police clearance certificate",
                ],
              },
              work: {
                name: "Work Visa",
                documents: [
                  "Valid passport",
                  "Job offer letter",
                  "Employment contract",
                  "Educational credentials",
                  "Work experience letters",
                  "Language proficiency test results",
                  "Medical examination results",
                  "Police clearance certificate",
                  "Resume/CV",
                  "Professional qualifications",
                ],
              },
              family: {
                name: "Family Sponsorship",
                documents: [
                  "Valid passport",
                  "Birth certificates",
                  "Marriage certificate (if applicable)",
                  "Proof of relationship",
                  "Sponsor's documents",
                  "Financial documents",
                  "Medical examination results",
                  "Police clearance certificate",
                  "Photographs",
                  "Affidavit of support",
                ],
              },
            };
            function m() {
              let [e, t] = (0, n.useState)(""),
                [r, s] = (0, n.useState)([]),
                f = (e) => {
                  s((t) =>
                    t.includes(e) ? t.filter((t) => t !== e) : [...t, e],
                  );
                };
              return (0, a.jsx)("div", {
                className: "container max-w-2xl py-12",
                children: (0, a.jsxs)(l.Zp, {
                  className: "p-6",
                  children: [
                    (0, a.jsxs)("div", {
                      className: "flex items-center gap-3 mb-8",
                      children: [
                        (0, a.jsx)(i.A, { className: "w-8 h-8" }),
                        (0, a.jsxs)("div", {
                          children: [
                            (0, a.jsx)("h1", {
                              className: "text-2xl font-bold",
                              children: "Document Checklist Generator",
                            }),
                            (0, a.jsx)("p", {
                              className: "text-sm text-muted-foreground",
                              children:
                                "Generate a personalized document checklist for your immigration application",
                            }),
                          ],
                        }),
                      ],
                    }),
                    (0, a.jsxs)("div", {
                      className: "space-y-6",
                      children: [
                        (0, a.jsxs)("div", {
                          className: "space-y-2",
                          children: [
                            (0, a.jsx)(p.J, {
                              children: "Select Visa/Immigration Type",
                            }),
                            (0, a.jsxs)(u.l6, {
                              onValueChange: (e) => {
                                t(e), s([]);
                              },
                              children: [
                                (0, a.jsx)(u.bq, {
                                  children: (0, a.jsx)(u.yv, {
                                    placeholder: "Choose visa type",
                                  }),
                                }),
                                (0, a.jsx)(u.gC, {
                                  children: Object.entries(h).map(([e, t]) =>
                                    (0, a.jsx)(
                                      u.eb,
                                      { value: e, children: t.name },
                                      e,
                                    ),
                                  ),
                                }),
                              ],
                            }),
                          ],
                        }),
                        e &&
                          (0, a.jsxs)(a.Fragment, {
                            children: [
                              (0, a.jsxs)("div", {
                                className: "space-y-4",
                                children: [
                                  (0, a.jsx)("h2", {
                                    className: "font-semibold",
                                    children: "Required Documents:",
                                  }),
                                  h[e].documents.map((e) =>
                                    (0, a.jsxs)(
                                      "div",
                                      {
                                        className:
                                          "flex items-center space-x-2",
                                        children: [
                                          (0, a.jsx)(c.S, {
                                            id: e,
                                            checked: r.includes(e),
                                            onCheckedChange: () => f(e),
                                          }),
                                          (0, a.jsx)("label", {
                                            htmlFor: e,
                                            className:
                                              "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
                                            children: e,
                                          }),
                                        ],
                                      },
                                      e,
                                    ),
                                  ),
                                ],
                              }),
                              (0, a.jsxs)("div", {
                                className: "pt-6 border-t",
                                children: [
                                  (0, a.jsxs)("div", {
                                    className:
                                      "flex justify-between items-center mb-4",
                                    children: [
                                      (0, a.jsx)("span", {
                                        className: "text-sm font-medium",
                                        children: "Progress:",
                                      }),
                                      (0, a.jsxs)("span", {
                                        className: "text-sm",
                                        children: [
                                          r.length,
                                          " of ",
                                          h[e].documents.length,
                                          " complete",
                                        ],
                                      }),
                                    ],
                                  }),
                                  (0, a.jsx)("div", {
                                    className:
                                      "w-full bg-secondary rounded-full h-2.5",
                                    children: (0, a.jsx)("div", {
                                      className:
                                        "bg-primary rounded-full h-2.5 transition-all",
                                      style: {
                                        width: `${(r.length / h[e].documents.length) * 100}%`,
                                      },
                                    }),
                                  }),
                                ],
                              }),
                              (0, a.jsxs)(d.$, {
                                className: "w-full",
                                onClick: () => {
                                  let t =
                                      `${h[e].name} Document Checklist

` + h[e].documents.map((e) => `[${r.includes(e) ? "x" : " "}] ${e}`).join("\n"),
                                    s = new Blob([t], { type: "text/plain" }),
                                    a = URL.createObjectURL(s),
                                    i = document.createElement("a");
                                  (i.href = a),
                                    (i.download = "immigration-checklist.txt"),
                                    document.body.appendChild(i),
                                    i.click(),
                                    document.body.removeChild(i),
                                    URL.revokeObjectURL(a);
                                },
                                disabled: !e,
                                children: [
                                  (0, a.jsx)(o.A, {
                                    className: "w-4 h-4 mr-2",
                                  }),
                                  "Download Checklist",
                                ],
                              }),
                            ],
                          }),
                      ],
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
              Wu: () => f,
              ZB: () => p,
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
            let p = o.forwardRef(({ className: e, ...t }, r) =>
              (0, a.jsx)("h3", {
                ref: r,
                className: (0, n.cn)(
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
                className: (0, n.cn)("text-sm text-muted-foreground", e),
                ...t,
              }),
            );
            u.displayName = "CardDescription";
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
      8086: (e) => {
        "use strict";
        e.exports = require("module");
      },
      9235: (e, t, r) => {
        "use strict";
        r.d(t, { C1: () => k, bL: () => w });
        var s = r(84205),
          a = r(71604),
          i = r(18047),
          o = r(28777),
          n = r(48705),
          d = r(67155),
          l = r(91557),
          c = r(94653),
          p = r(78593),
          u = r(61268),
          f = "Checkbox",
          [m, h] = (0, i.A)(f),
          [x, b] = m(f);
        function y(e) {
          let {
              __scopeCheckbox: t,
              checked: r,
              children: a,
              defaultChecked: i,
              disabled: o,
              form: d,
              name: l,
              onCheckedChange: c,
              required: p,
              value: m = "on",
              internal_do_not_use_render: h,
            } = e,
            [b, y] = (0, n.i)({
              prop: r,
              defaultProp: i ?? !1,
              onChange: c,
              caller: f,
            }),
            [g, v] = s.useState(null),
            [w, j] = s.useState(null),
            k = s.useRef(!1),
            N = !g || !!d || !!g.closest("form"),
            q = {
              checked: b,
              disabled: o,
              setChecked: y,
              control: g,
              setControl: v,
              name: l,
              form: d,
              value: m,
              hasConsumerStoppedPropagationRef: k,
              required: p,
              defaultChecked: !C(i) && i,
              isFormControl: N,
              bubbleInput: w,
              setBubbleInput: j,
            };
          return (0, u.jsx)(x, {
            scope: t,
            ...q,
            children: "function" == typeof h ? h(q) : a,
          });
        }
        var g = "CheckboxTrigger",
          v = s.forwardRef(
            ({ __scopeCheckbox: e, onKeyDown: t, onClick: r, ...i }, n) => {
              let {
                  control: d,
                  value: l,
                  disabled: c,
                  checked: f,
                  required: m,
                  setControl: h,
                  setChecked: x,
                  hasConsumerStoppedPropagationRef: y,
                  isFormControl: v,
                  bubbleInput: w,
                } = b(g, e),
                j = (0, a.s)(n, h),
                k = s.useRef(f);
              return (
                s.useEffect(() => {
                  let e = d?.form;
                  if (e) {
                    let t = () => x(k.current);
                    return (
                      e.addEventListener("reset", t),
                      () => e.removeEventListener("reset", t)
                    );
                  }
                }, [d, x]),
                (0, u.jsx)(p.sG.button, {
                  type: "button",
                  role: "checkbox",
                  "aria-checked": C(f) ? "mixed" : f,
                  "aria-required": m,
                  "data-state": P(f),
                  "data-disabled": c ? "" : void 0,
                  disabled: c,
                  value: l,
                  ...i,
                  ref: j,
                  onKeyDown: (0, o.m)(t, (e) => {
                    "Enter" === e.key && e.preventDefault();
                  }),
                  onClick: (0, o.m)(r, (e) => {
                    x((e) => !!C(e) || !e),
                      w &&
                        v &&
                        ((y.current = e.isPropagationStopped()),
                        y.current || e.stopPropagation());
                  }),
                })
              );
            },
          );
        v.displayName = g;
        var w = s.forwardRef((e, t) => {
          let {
            __scopeCheckbox: r,
            name: s,
            checked: a,
            defaultChecked: i,
            required: o,
            disabled: n,
            value: d,
            onCheckedChange: l,
            form: c,
            ...p
          } = e;
          return (0, u.jsx)(y, {
            __scopeCheckbox: r,
            checked: a,
            defaultChecked: i,
            disabled: n,
            required: o,
            onCheckedChange: l,
            name: s,
            form: c,
            value: d,
            internal_do_not_use_render: ({ isFormControl: e }) =>
              (0, u.jsxs)(u.Fragment, {
                children: [
                  (0, u.jsx)(v, { ...p, ref: t, __scopeCheckbox: r }),
                  e && (0, u.jsx)(q, { __scopeCheckbox: r }),
                ],
              }),
          });
        });
        w.displayName = f;
        var j = "CheckboxIndicator",
          k = s.forwardRef((e, t) => {
            let { __scopeCheckbox: r, forceMount: s, ...a } = e,
              i = b(j, r);
            return (0, u.jsx)(c.C, {
              present: s || C(i.checked) || !0 === i.checked,
              children: (0, u.jsx)(p.sG.span, {
                "data-state": P(i.checked),
                "data-disabled": i.disabled ? "" : void 0,
                ...a,
                ref: t,
                style: { pointerEvents: "none", ...e.style },
              }),
            });
          });
        k.displayName = j;
        var N = "CheckboxBubbleInput",
          q = s.forwardRef(({ __scopeCheckbox: e, ...t }, r) => {
            let {
                control: i,
                hasConsumerStoppedPropagationRef: o,
                checked: n,
                defaultChecked: c,
                required: f,
                disabled: m,
                name: h,
                value: x,
                form: y,
                bubbleInput: g,
                setBubbleInput: v,
              } = b(N, e),
              w = (0, a.s)(r, v),
              j = (0, d.Z)(n),
              k = (0, l.X)(i);
            s.useEffect(() => {
              if (!g) return;
              let e = Object.getOwnPropertyDescriptor(
                  window.HTMLInputElement.prototype,
                  "checked",
                ).set,
                t = !o.current;
              if (j !== n && e) {
                let r = new Event("click", { bubbles: t });
                (g.indeterminate = C(n)),
                  e.call(g, !C(n) && n),
                  g.dispatchEvent(r);
              }
            }, [g, j, n, o]);
            let q = s.useRef(!C(n) && n);
            return (0, u.jsx)(p.sG.input, {
              type: "checkbox",
              "aria-hidden": !0,
              defaultChecked: c ?? q.current,
              required: f,
              disabled: m,
              name: h,
              value: x,
              form: y,
              ...t,
              tabIndex: -1,
              ref: w,
              style: {
                ...t.style,
                ...k,
                position: "absolute",
                pointerEvents: "none",
                opacity: 0,
                margin: 0,
                transform: "translateX(-100%)",
              },
            });
          });
        function C(e) {
          return "indeterminate" === e;
        }
        function P(e) {
          return C(e) ? "indeterminate" : e ? "checked" : "unchecked";
        }
        q.displayName = N;
      },
      10846: (e) => {
        "use strict";
        e.exports = require("next/dist/compiled/next-server/app-page.runtime.prod.js");
      },
      16979: (e, t, r) => {
        "use strict";
        r.a(e, async (e, s) => {
          try {
            r.d(t, { J: () => d });
            var a = r(61268),
              i = r(30595);
            r(84205);
            var o = r(15942),
              n = e([o]);
            function d({ className: e, ...t }) {
              return (0, a.jsx)(i.b, {
                "data-slot": "label",
                className: (0, o.cn)(
                  "flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
                  e,
                ),
                ...t,
              });
            }
            (o = (n.then ? (await n)() : n)[0]), s();
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
      19820: (e, t, r) => {
        "use strict";
        let s;
        r.r(t),
          r.d(t, {
            default: () => f,
            generateImageMetadata: () => p,
            generateMetadata: () => c,
            generateViewport: () => u,
          });
        var a = r(63033),
          i = r(26394),
          o = r(60442),
          n = (0, i.registerClientReference)(
            function () {
              throw Error(
                "Attempted to call the default export of \"E:\\\\downloads\\\\Hijraah\\\\apps\\\\web\\\\src\\\\app\\\\tools\\\\document-checklist\\\\page.tsx\" from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
              );
            },
            "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\tools\\document-checklist\\page.tsx",
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
                      componentRoute: "/tools/document-checklist",
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
          p = void 0,
          u = void 0,
          f = s;
      },
      21820: (e) => {
        "use strict";
        e.exports = require("os");
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
      30595: (e, t, r) => {
        "use strict";
        r.d(t, { b: () => n });
        var s = r(84205),
          a = r(56558),
          i = r(61268),
          o = s.forwardRef((e, t) =>
            (0, i.jsx)(a.sG.label, {
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
        var n = o;
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
      43427: (e, t, r) => {
        Promise.resolve().then(r.bind(r, 19820));
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
      55511: (e) => {
        "use strict";
        e.exports = require("crypto");
      },
      57075: (e) => {
        "use strict";
        e.exports = require("node:stream");
      },
      57499: (e, t, r) => {
        Promise.resolve().then(r.bind(r, 2434));
      },
      57975: (e) => {
        "use strict";
        e.exports = require("node:util");
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
      70753: (e, t, r) => {
        "use strict";
        r.d(t, { A: () => s });
        let s = (0, r(95255).A)("ChevronDown", [
          ["path", { d: "m6 9 6 6 6-6", key: "qrunsl" }],
        ]);
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
            var a = r(61268),
              i = r(9235),
              o = r(415),
              n = r(84205),
              d = r(15942),
              l = e([d]);
            d = (l.then ? (await l)() : l)[0];
            let c = n.forwardRef(({ className: e, ...t }, r) =>
              (0, a.jsx)(i.bL, {
                ref: r,
                className: (0, d.cn)(
                  "peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
                  e,
                ),
                ...t,
                children: (0, a.jsx)(i.C1, {
                  className: (0, d.cn)(
                    "flex items-center justify-center text-current",
                  ),
                  children: (0, a.jsx)(o.A, { className: "h-4 w-4" }),
                }),
              }),
            );
            (c.displayName = i.bL.displayName), s();
          } catch (e) {
            s(e);
          }
        });
      },
      80481: (e) => {
        "use strict";
        e.exports = require("node:readline");
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
      94735: (e) => {
        "use strict";
        e.exports = require("events");
      },
      95957: (e, t, r) => {
        "use strict";
        r.a(e, async (e, s) => {
          try {
            r.d(t, {
              bq: () => f,
              eb: () => h,
              gC: () => m,
              l6: () => p,
              yv: () => u,
            });
            var a = r(61268),
              i = r(81242),
              o = r(70753),
              n = r(415),
              d = r(84205),
              l = r(15942),
              c = e([l]);
            l = (c.then ? (await c)() : c)[0];
            let p = i.bL;
            i.YJ;
            let u = i.WT,
              f = d.forwardRef(({ className: e, children: t, ...r }, s) =>
                (0, a.jsxs)(i.l9, {
                  ref: s,
                  className: (0, l.cn)(
                    "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                    e,
                  ),
                  ...r,
                  children: [
                    t,
                    (0, a.jsx)(i.In, {
                      asChild: !0,
                      children: (0, a.jsx)(o.A, {
                        className: "h-4 w-4 opacity-50",
                      }),
                    }),
                  ],
                }),
              );
            f.displayName = i.l9.displayName;
            let m = d.forwardRef(
              (
                { className: e, children: t, position: r = "popper", ...s },
                o,
              ) =>
                (0, a.jsx)(i.ZL, {
                  children: (0, a.jsx)(i.UC, {
                    ref: o,
                    className: (0, l.cn)(
                      "relative z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
                      "popper" === r &&
                        "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
                      e,
                    ),
                    position: r,
                    ...s,
                    children: (0, a.jsx)(i.LM, {
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
            (m.displayName = i.UC.displayName),
              (d.forwardRef(({ className: e, ...t }, r) =>
                (0, a.jsx)(i.JU, {
                  ref: r,
                  className: (0, l.cn)(
                    "py-1.5 pl-8 pr-2 text-sm font-semibold",
                    e,
                  ),
                  ...t,
                }),
              ).displayName = i.JU.displayName);
            let h = d.forwardRef(({ className: e, children: t, ...r }, s) =>
              (0, a.jsxs)(i.q7, {
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
                    children: (0, a.jsx)(i.VF, {
                      children: (0, a.jsx)(n.A, { className: "h-4 w-4" }),
                    }),
                  }),
                  (0, a.jsx)(i.p4, { children: t }),
                ],
              }),
            );
            (h.displayName = i.q7.displayName),
              (d.forwardRef(({ className: e, ...t }, r) =>
                (0, a.jsx)(i.wv, {
                  ref: r,
                  className: (0, l.cn)("-mx-1 my-1 h-px bg-muted", e),
                  ...t,
                }),
              ).displayName = i.wv.displayName),
              s();
          } catch (e) {
            s(e);
          }
        });
      },
      96492: (e, t, r) => {
        "use strict";
        r.r(t),
          r.d(t, {
            GlobalError: () => i.default,
            __next_app__: () => c,
            pages: () => l,
            routeModule: () => p,
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
                  "tools",
                  {
                    children: [
                      "document-checklist",
                      {
                        children: [
                          "__PAGE__",
                          {},
                          {
                            page: [
                              () => Promise.resolve().then(r.bind(r, 19820)),
                              "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\tools\\document-checklist\\page.tsx",
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
            "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\tools\\document-checklist\\page.tsx",
          ],
          c = { require: r, loadChunk: () => Promise.resolve() },
          p = new s.AppPageRouteModule({
            definition: {
              kind: a.RouteKind.APP_PAGE,
              page: "/tools/document-checklist/page",
              pathname: "/tools/document-checklist",
              bundlePath: "",
              filename: "",
              appPaths: [],
            },
            userland: { loaderTree: d },
          });
      },
      97911: (e, t, r) => {
        "use strict";
        r.d(t, { A: () => s });
        let s = (0, r(95255).A)("Download", [
          [
            "path",
            { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4", key: "ih7n3h" },
          ],
          ["polyline", { points: "7 10 12 15 17 10", key: "2ggqvy" }],
          ["line", { x1: "12", x2: "12", y1: "15", y2: "3", key: "1vk2je" }],
        ]);
      },
      98262: (e, t, r) => {
        "use strict";
        r.d(t, { A: () => s });
        let s = (0, r(95255).A)("ClipboardList", [
          [
            "rect",
            {
              width: "8",
              height: "4",
              x: "8",
              y: "2",
              rx: "1",
              ry: "1",
              key: "tgr4d6",
            },
          ],
          [
            "path",
            {
              d: "M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2",
              key: "116196",
            },
          ],
          ["path", { d: "M12 11h4", key: "1jrz19" }],
          ["path", { d: "M12 16h4", key: "n85exb" }],
          ["path", { d: "M8 11h.01", key: "1dfujw" }],
          ["path", { d: "M8 16h.01", key: "18s6g9" }],
        ]);
      },
    });
  var t = require("../../../webpack-runtime.js");
  t.C(e);
  var r = (e) => t((t.s = e)),
    s = t.X(
      0,
      [827, 6518, 2033, 4027, 8859, 5728, 9729, 3390, 6867, 4630],
      () => r(96492),
    );
  module.exports = s;
})();
//# sourceMappingURL=page.js.map
