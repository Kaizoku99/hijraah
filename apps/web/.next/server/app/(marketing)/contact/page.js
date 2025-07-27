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
    (e._sentryDebugIds[t] = "91ce0dad-b84a-49b1-89ee-7e3872051369"),
    (e._sentryDebugIdIdentifier =
      "sentry-dbid-91ce0dad-b84a-49b1-89ee-7e3872051369"));
} catch (e) {}
(() => {
  var e = {};
  (e.id = 4461),
    (e.ids = [4461]),
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
              Wu: () => m,
              ZB: () => u,
              Zp: () => l,
              aR: () => c,
              wL: () => x,
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
            let m = o.forwardRef(({ className: e, ...t }, r) =>
              (0, a.jsx)("div", {
                ref: r,
                className: (0, n.cn)("p-6 pt-0", e),
                ...t,
              }),
            );
            m.displayName = "CardContent";
            let x = o.forwardRef(({ className: e, ...t }, r) =>
              (0, a.jsx)("div", {
                ref: r,
                className: (0, n.cn)("flex items-center p-6 pt-0", e),
                ...t,
              }),
            );
            (x.displayName = "CardFooter"), s();
          } catch (e) {
            s(e);
          }
        });
      },
      8086: (e) => {
        "use strict";
        e.exports = require("module");
      },
      10846: (e) => {
        "use strict";
        e.exports = require("next/dist/compiled/next-server/app-page.runtime.prod.js");
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
          i = 0,
          o = new Map(),
          n = (e, t) => {
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
                if (r) o.has(r) && (clearTimeout(o.get(r)), o.delete(r));
                else
                  for (let [e, t] of o.entries()) clearTimeout(t), o.delete(e);
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
          d = [],
          l = { toasts: [] };
        function c(e) {
          (l = n(l, e)),
            d.forEach((e) => {
              e(l);
            });
        }
        function u({ ...e }) {
          let t = (i = (i + 1) % Number.MAX_VALUE).toString(),
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
          let [e, t] = s.useState(l);
          return (
            s.useEffect(
              () => (
                d.push(t),
                () => {
                  let e = d.indexOf(t);
                  e > -1 && d.splice(e, 1);
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
      18906: (e, t, r) => {
        "use strict";
        let s;
        r.r(t),
          r.d(t, {
            default: () => m,
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
                "Attempted to call the default export of \"E:\\\\downloads\\\\Hijraah\\\\apps\\\\web\\\\src\\\\app\\\\(marketing)\\\\contact\\\\page.tsx\" from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
              );
            },
            "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\(marketing)\\contact\\page.tsx",
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
                      componentRoute: "/(marketing)/contact",
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
          m = s;
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
      37787: (e, t, r) => {
        "use strict";
        r.a(e, async (e, s) => {
          try {
            r.d(t, { T: () => d });
            var a = r(61268),
              i = r(84205),
              o = r(15942),
              n = e([o]);
            o = (n.then ? (await n)() : n)[0];
            let d = i.forwardRef(({ className: e, ...t }, r) =>
              (0, a.jsx)("textarea", {
                className: (0, o.cn)(
                  "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                  e,
                ),
                ref: r,
                ...t,
              }),
            );
            (d.displayName = "Textarea"), s();
          } catch (e) {
            s(e);
          }
        });
      },
      38522: (e) => {
        "use strict";
        e.exports = require("node:zlib");
      },
      41692: (e) => {
        "use strict";
        e.exports = require("node:tls");
      },
      43128: (e, t, r) => {
        "use strict";
        r.d(t, { A: () => s });
        let s = (0, r(95255).A)("Mail", [
          [
            "rect",
            {
              width: "20",
              height: "16",
              x: "2",
              y: "4",
              rx: "2",
              key: "18n3k1",
            },
          ],
          [
            "path",
            { d: "m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7", key: "1ocrg3" },
          ],
        ]);
      },
      44708: (e) => {
        "use strict";
        e.exports = require("node:https");
      },
      47047: (e, t, r) => {
        Promise.resolve().then(r.bind(r, 86236));
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
      56558: (e, t, r) => {
        "use strict";
        r.d(t, { hO: () => d, sG: () => n });
        var s = r(84205),
          a = r(90304),
          i = r(86415),
          o = r(61268),
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
          ].reduce((e, t) => {
            let r = (0, i.TL)(`Primitive.${t}`),
              a = s.forwardRef((e, s) => {
                let { asChild: a, ...i } = e;
                return (
                  "undefined" != typeof window &&
                    (window[Symbol.for("radix-ui")] = !0),
                  (0, o.jsx)(a ? r : t, { ...i, ref: s })
                );
              });
            return (a.displayName = `Primitive.${t}`), { ...e, [t]: a };
          }, {});
        function d(e, t) {
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
      58055: (e, t, r) => {
        "use strict";
        r.d(t, { A: () => s });
        let s = (0, r(95255).A)("MapPin", [
          [
            "path",
            {
              d: "M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z",
              key: "2oe9fu",
            },
          ],
          ["circle", { cx: "12", cy: "10", r: "3", key: "ilqhr7" }],
        ]);
      },
      63033: (e) => {
        "use strict";
        e.exports = require("next/dist/server/app-render/work-unit-async-storage.external.js");
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
      78337: (e, t, r) => {
        "use strict";
        r.a(e, async (e, s) => {
          try {
            r.d(t, { p: () => n });
            var a = r(61268);
            r(84205);
            var i = r(15942),
              o = e([i]);
            function n({ className: e, type: t, ...r }) {
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
            (i = (o.then ? (await o)() : o)[0]), s();
          } catch (e) {
            s(e);
          }
        });
      },
      78516: (e, t, r) => {
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
                  "(marketing)",
                  {
                    children: [
                      "contact",
                      {
                        children: [
                          "__PAGE__",
                          {},
                          {
                            page: [
                              () => Promise.resolve().then(r.bind(r, 18906)),
                              "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\(marketing)\\contact\\page.tsx",
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
          l = [
            "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\(marketing)\\contact\\page.tsx",
          ],
          c = { require: r, loadChunk: () => Promise.resolve() },
          u = new s.AppPageRouteModule({
            definition: {
              kind: a.RouteKind.APP_PAGE,
              page: "/(marketing)/contact/page",
              pathname: "/contact",
              bundlePath: "",
              filename: "",
              appPaths: [],
            },
            userland: { loaderTree: d },
          });
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
              C5: () => x,
              MJ: () => m,
              eI: () => u,
              lR: () => p,
              lV: () => h,
              zB: () => g,
            });
            var a = r(61268),
              i = r(86415),
              o = r(84205),
              n = r(36322),
              d = r(16979),
              l = r(15942),
              c = e([d, l]);
            [d, l] = c.then ? (await c)() : c;
            let h = n.Op,
              f = o.createContext({}),
              g = ({ ...e }) =>
                (0, a.jsx)(f.Provider, {
                  value: { name: e.name },
                  children: (0, a.jsx)(n.xI, { ...e }),
                }),
              b = () => {
                let e = o.useContext(f),
                  t = o.useContext(v),
                  { getFieldState: r } = (0, n.xW)(),
                  s = (0, n.lN)({ name: e.name }),
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
              v = o.createContext({});
            function u({ className: e, ...t }) {
              let r = o.useId();
              return (0, a.jsx)(v.Provider, {
                value: { id: r },
                children: (0, a.jsx)("div", {
                  "data-slot": "form-item",
                  className: (0, l.cn)("grid gap-2", e),
                  ...t,
                }),
              });
            }
            function p({ className: e, ...t }) {
              let { error: r, formItemId: s } = b();
              return (0, a.jsx)(d.J, {
                "data-slot": "form-label",
                "data-error": !!r,
                className: (0, l.cn)("data-[error=true]:text-destructive", e),
                htmlFor: s,
                ...t,
              });
            }
            function m({ ...e }) {
              let {
                error: t,
                formItemId: r,
                formDescriptionId: s,
                formMessageId: o,
              } = b();
              return (0, a.jsx)(i.DX, {
                "data-slot": "form-control",
                id: r,
                "aria-describedby": t ? `${s} ${o}` : `${s}`,
                "aria-invalid": !!t,
                ...e,
              });
            }
            function x({ className: e, ...t }) {
              let { error: r, formMessageId: s } = b(),
                i = r ? String(r?.message ?? "") : t.children;
              return i
                ? (0, a.jsx)("p", {
                    "data-slot": "form-message",
                    id: s,
                    className: (0, l.cn)("text-destructive text-sm", e),
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
      86236: (e, t, r) => {
        "use strict";
        r.a(e, async (e, s) => {
          try {
            r.r(t), r.d(t, { default: () => v });
            var a = r(61268),
              i = r(97052),
              o = r(43128),
              n = r(88627),
              d = r(58055),
              l = r(84205),
              c = r(36322),
              u = r(36352),
              p = r(15090),
              m = r(28909),
              x = r(5451),
              h = r(86183),
              f = r(78337),
              g = r(37787),
              b = e([m, x, h, f, g]);
            [m, x, h, f, g] = b.then ? (await b)() : b;
            let y = u.Ik({
              name: u.Yj().min(2, "Name must be at least 2 characters"),
              email: u.Yj().email("Invalid email address"),
              subject: u.Yj().min(5, "Subject must be at least 5 characters"),
              message: u.Yj().min(10, "Message must be at least 10 characters"),
            });
            function v() {
              let [e, t] = (0, l.useState)(!1),
                { toast: r } = (0, p.d)(),
                s = (0, c.mN)({
                  resolver: (0, i.u)(y),
                  defaultValues: {
                    name: "",
                    email: "",
                    subject: "",
                    message: "",
                  },
                });
              async function u(e) {
                try {
                  t(!0),
                    await new Promise((e) => setTimeout(e, 1e3)),
                    r({
                      title: "Message sent!",
                      description: "We'll get back to you as soon as possible.",
                    }),
                    s.reset();
                } catch (e) {
                  r({
                    title: "Error",
                    description: "Something went wrong. Please try again.",
                    variant: "destructive",
                  });
                } finally {
                  t(!1);
                }
              }
              return (0, a.jsx)("div", {
                className: "container py-12",
                children: (0, a.jsxs)("div", {
                  className: "grid gap-8 md:grid-cols-2",
                  children: [
                    (0, a.jsxs)("div", {
                      children: [
                        (0, a.jsx)("h1", {
                          className: "text-3xl font-bold mb-4",
                          children: "Contact Us",
                        }),
                        (0, a.jsx)("p", {
                          className: "text-muted-foreground mb-8",
                          children:
                            "Have questions about immigration? We're here to help. Fill out the form below and we'll get back to you as soon as possible.",
                        }),
                        (0, a.jsxs)("div", {
                          className: "space-y-6",
                          children: [
                            (0, a.jsxs)("div", {
                              className: "flex items-center gap-3",
                              children: [
                                (0, a.jsx)(o.A, {
                                  className: "w-5 h-5 text-muted-foreground",
                                }),
                                (0, a.jsxs)("div", {
                                  children: [
                                    (0, a.jsx)("h3", {
                                      className: "font-medium",
                                      children: "Email",
                                    }),
                                    (0, a.jsx)("p", {
                                      className:
                                        "text-sm text-muted-foreground",
                                      children: "support@hijraah.com",
                                    }),
                                  ],
                                }),
                              ],
                            }),
                            (0, a.jsxs)("div", {
                              className: "flex items-center gap-3",
                              children: [
                                (0, a.jsx)(n.A, {
                                  className: "w-5 h-5 text-muted-foreground",
                                }),
                                (0, a.jsxs)("div", {
                                  children: [
                                    (0, a.jsx)("h3", {
                                      className: "font-medium",
                                      children: "Phone",
                                    }),
                                    (0, a.jsx)("p", {
                                      className:
                                        "text-sm text-muted-foreground",
                                      children: "+1 (555) 123-4567",
                                    }),
                                  ],
                                }),
                              ],
                            }),
                            (0, a.jsxs)("div", {
                              className: "flex items-center gap-3",
                              children: [
                                (0, a.jsx)(d.A, {
                                  className: "w-5 h-5 text-muted-foreground",
                                }),
                                (0, a.jsxs)("div", {
                                  children: [
                                    (0, a.jsx)("h3", {
                                      className: "font-medium",
                                      children: "Address",
                                    }),
                                    (0, a.jsxs)("p", {
                                      className:
                                        "text-sm text-muted-foreground",
                                      children: [
                                        "123 Immigration Street",
                                        (0, a.jsx)("br", {}),
                                        "New York, NY 10001",
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
                    (0, a.jsx)(x.Zp, {
                      className: "p-6",
                      children: (0, a.jsxs)(h.lV, {
                        form: s,
                        onSubmit: s.handleSubmit(u),
                        className: "space-y-6",
                        children: [
                          (0, a.jsx)(h.zB, {
                            control: s.control,
                            name: "name",
                            render: ({ field: e }) =>
                              (0, a.jsxs)(h.eI, {
                                children: [
                                  (0, a.jsx)(h.lR, { children: "Name" }),
                                  (0, a.jsx)(h.MJ, {
                                    children: (0, a.jsx)(f.p, {
                                      placeholder: "Your name",
                                      ...e,
                                    }),
                                  }),
                                  (0, a.jsx)(h.C5, {}),
                                ],
                              }),
                          }),
                          (0, a.jsx)(h.zB, {
                            control: s.control,
                            name: "email",
                            render: ({ field: e }) =>
                              (0, a.jsxs)(h.eI, {
                                children: [
                                  (0, a.jsx)(h.lR, { children: "Email" }),
                                  (0, a.jsx)(h.MJ, {
                                    children: (0, a.jsx)(f.p, {
                                      placeholder: "your@email.com",
                                      type: "email",
                                      ...e,
                                    }),
                                  }),
                                  (0, a.jsx)(h.C5, {}),
                                ],
                              }),
                          }),
                          (0, a.jsx)(h.zB, {
                            control: s.control,
                            name: "subject",
                            render: ({ field: e }) =>
                              (0, a.jsxs)(h.eI, {
                                children: [
                                  (0, a.jsx)(h.lR, { children: "Subject" }),
                                  (0, a.jsx)(h.MJ, {
                                    children: (0, a.jsx)(f.p, {
                                      placeholder: "How can we help?",
                                      ...e,
                                    }),
                                  }),
                                  (0, a.jsx)(h.C5, {}),
                                ],
                              }),
                          }),
                          (0, a.jsx)(h.zB, {
                            control: s.control,
                            name: "message",
                            render: ({ field: e }) =>
                              (0, a.jsxs)(h.eI, {
                                children: [
                                  (0, a.jsx)(h.lR, { children: "Message" }),
                                  (0, a.jsx)(h.MJ, {
                                    children: (0, a.jsx)(g.T, {
                                      placeholder:
                                        "Tell us more about your inquiry...",
                                      className: "min-h-[120px]",
                                      ...e,
                                    }),
                                  }),
                                  (0, a.jsx)(h.C5, {}),
                                ],
                              }),
                          }),
                          (0, a.jsx)(m.$, {
                            type: "submit",
                            className: "w-full",
                            disabled: e,
                            children: e ? "Sending..." : "Send Message",
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
      86592: (e) => {
        "use strict";
        e.exports = require("node:inspector");
      },
      87215: (e, t, r) => {
        Promise.resolve().then(r.bind(r, 18906));
      },
      88627: (e, t, r) => {
        "use strict";
        r.d(t, { A: () => s });
        let s = (0, r(95255).A)("Phone", [
          [
            "path",
            {
              d: "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z",
              key: "foiqr5",
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
        r.d(t, { A: () => o });
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
          o = (e, t) => {
            let r = (0, s.forwardRef)(
              (
                {
                  color: r = "currentColor",
                  size: o = 24,
                  strokeWidth: n = 2,
                  absoluteStrokeWidth: d,
                  className: l = "",
                  children: c,
                  ...u
                },
                p,
              ) =>
                (0, s.createElement)(
                  "svg",
                  {
                    ref: p,
                    ...a,
                    width: o,
                    height: o,
                    stroke: r,
                    strokeWidth: d ? (24 * Number(n)) / Number(o) : n,
                    className: ["lucide", `lucide-${i(e)}`, l].join(" "),
                    ...u,
                  },
                  [
                    ...t.map(([e, t]) => (0, s.createElement)(e, t)),
                    ...(Array.isArray(c) ? c : [c]),
                  ],
                ),
            );
            return (r.displayName = `${e}`), r;
          };
      },
    });
  var t = require("../../../webpack-runtime.js");
  t.C(e);
  var r = (e) => t((t.s = e)),
    s = t.X(0, [827, 6518, 2033, 4027, 5728, 1502, 7052, 4630], () => r(78516));
  module.exports = s;
})();
//# sourceMappingURL=page.js.map
