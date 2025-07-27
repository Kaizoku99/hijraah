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
    (e._sentryDebugIds[t] = "22bdd618-1957-4851-ba50-8d84c3ec1686"),
    (e._sentryDebugIdIdentifier =
      "sentry-dbid-22bdd618-1957-4851-ba50-8d84c3ec1686"));
} catch (e) {}
(() => {
  var e = {};
  (e.id = 2271),
    (e.ids = [2271]),
    (e.modules = {
      3295: (e) => {
        "use strict";
        e.exports = require("next/dist/server/app-render/after-task-async-storage.external.js");
      },
      7032: (e, t, r) => {
        "use strict";
        r.r(t),
          r.d(t, {
            GlobalError: () => o.default,
            __next_app__: () => l,
            pages: () => u,
            routeModule: () => c,
            tree: () => d,
          });
        var s = r(11610),
          i = r(51293),
          o = r(59059),
          a = r(17770),
          n = {};
        for (let e in a)
          0 >
            [
              "default",
              "tree",
              "pages",
              "GlobalError",
              "__next_app__",
              "routeModule",
            ].indexOf(e) && (n[e] = () => a[e]);
        r.d(t, n);
        let d = {
            children: [
              "",
              {
                children: [
                  "(auth)",
                  {
                    children: [
                      "signup",
                      {
                        children: [
                          "__PAGE__",
                          {},
                          {
                            page: [
                              () => Promise.resolve().then(r.bind(r, 43200)),
                              "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\(auth)\\signup\\page.tsx",
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
            "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\(auth)\\signup\\page.tsx",
          ],
          l = { require: r, loadChunk: () => Promise.resolve() },
          c = new s.AppPageRouteModule({
            definition: {
              kind: i.RouteKind.APP_PAGE,
              page: "/(auth)/signup/page",
              pathname: "/signup",
              bundlePath: "",
              filename: "",
              appPaths: [],
            },
            userland: { loaderTree: d },
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
      11997: (e) => {
        "use strict";
        e.exports = require("punycode");
      },
      14480: (e, t, r) => {
        "use strict";
        r.d(t, { A: () => s });
        let s = (0, r(95255).A)("Github", [
          [
            "path",
            {
              d: "M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4",
              key: "tonef",
            },
          ],
          ["path", { d: "M9 18c-4.51 2-5-2-7-2", key: "9comsn" }],
        ]);
      },
      15090: (e, t, r) => {
        "use strict";
        r.d(t, { d: () => p });
        var s = r(84205);
        let i = {
            ADD_TOAST: "ADD_TOAST",
            UPDATE_TOAST: "UPDATE_TOAST",
            DISMISS_TOAST: "DISMISS_TOAST",
            REMOVE_TOAST: "REMOVE_TOAST",
          },
          o = 0,
          a = new Map(),
          n = (e, t) => {
            switch (t.type) {
              case i.ADD_TOAST:
                return { ...e, toasts: [t.toast, ...e.toasts].slice(0, 5) };
              case i.UPDATE_TOAST:
                return {
                  ...e,
                  toasts: e.toasts.map((e) =>
                    e.id === t.toast.id ? { ...e, ...t.toast } : e,
                  ),
                };
              case i.DISMISS_TOAST: {
                let { toastId: r } = t;
                if (r) a.has(r) && (clearTimeout(a.get(r)), a.delete(r));
                else
                  for (let [e, t] of a.entries()) clearTimeout(t), a.delete(e);
                return {
                  ...e,
                  toasts: e.toasts.map((e) =>
                    e.id === r || void 0 === r ? { ...e, open: !1 } : e,
                  ),
                };
              }
              case i.REMOVE_TOAST:
                if (void 0 === t.toastId) return { ...e, toasts: [] };
                return {
                  ...e,
                  toasts: e.toasts.filter((e) => e.id !== t.toastId),
                };
            }
          },
          d = [],
          u = { toasts: [] };
        function l(e) {
          (u = n(u, e)),
            d.forEach((e) => {
              e(u);
            });
        }
        function c({ ...e }) {
          let t = (o = (o + 1) % Number.MAX_VALUE).toString(),
            r = () => l({ type: i.DISMISS_TOAST, toastId: t });
          return (
            l({
              type: i.ADD_TOAST,
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
                l({ type: i.UPDATE_TOAST, toast: { ...e, id: t } }),
            }
          );
        }
        function p() {
          let [e, t] = s.useState(u);
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
              toast: c,
              dismiss: (e) => l({ type: i.DISMISS_TOAST, toastId: e }),
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
            r.d(t, { J: () => d });
            var i = r(61268),
              o = r(30595);
            r(84205);
            var a = r(15942),
              n = e([a]);
            function d({ className: e, ...t }) {
              return (0, i.jsx)(o.b, {
                "data-slot": "label",
                className: (0, a.cn)(
                  "flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
                  e,
                ),
                ...t,
              });
            }
            (a = (n.then ? (await n)() : n)[0]), s();
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
          i = r(56558),
          o = r(61268),
          a = s.forwardRef((e, t) =>
            (0, o.jsx)(i.sG.label, {
              ...e,
              ref: t,
              onMouseDown: (t) => {
                t.target.closest("button, input, select, textarea") ||
                  (e.onMouseDown?.(t),
                  !t.defaultPrevented && t.detail > 1 && t.preventDefault());
              },
            }),
          );
        a.displayName = "Label";
        var n = a;
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
      39767: (e, t, r) => {
        Promise.resolve().then(r.bind(r, 43200));
      },
      41692: (e) => {
        "use strict";
        e.exports = require("node:tls");
      },
      43200: (e, t, r) => {
        "use strict";
        let s;
        r.r(t),
          r.d(t, {
            default: () => h,
            generateImageMetadata: () => c,
            generateMetadata: () => l,
            generateViewport: () => p,
          });
        var i = r(63033),
          o = r(26394),
          a = r(60442),
          n = (0, o.registerClientReference)(
            function () {
              throw Error(
                "Attempted to call the default export of \"E:\\\\downloads\\\\Hijraah\\\\apps\\\\web\\\\src\\\\app\\\\(auth)\\\\signup\\\\page.tsx\" from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
              );
            },
            "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\(auth)\\signup\\page.tsx",
            "default",
          );
        let d = { ...i },
          u =
            "workUnitAsyncStorage" in d
              ? d.workUnitAsyncStorage
              : "requestAsyncStorage" in d
                ? d.requestAsyncStorage
                : void 0;
        s =
          "function" == typeof n
            ? new Proxy(n, {
                apply: (e, t, r) => {
                  let s, i, o;
                  try {
                    let e = u?.getStore();
                    (s = e?.headers.get("sentry-trace") ?? void 0),
                      (i = e?.headers.get("baggage") ?? void 0),
                      (o = e?.headers);
                  } catch (e) {}
                  return a
                    .wrapServerComponentWithSentry(e, {
                      componentRoute: "/(auth)/signup",
                      componentType: "Page",
                      sentryTraceHeader: s,
                      baggageHeader: i,
                      headers: o,
                    })
                    .apply(t, r);
                },
              })
            : n;
        let l = void 0,
          c = void 0,
          p = void 0,
          h = s;
      },
      44495: (e, t, r) => {
        Promise.resolve().then(r.bind(r, 70033));
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
      55591: (e) => {
        "use strict";
        e.exports = require("https");
      },
      56558: (e, t, r) => {
        "use strict";
        r.d(t, { hO: () => d, sG: () => n });
        var s = r(84205),
          i = r(90304),
          o = r(86415),
          a = r(61268),
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
            let r = (0, o.TL)(`Primitive.${t}`),
              i = s.forwardRef((e, s) => {
                let { asChild: i, ...o } = e;
                return (
                  "undefined" != typeof window &&
                    (window[Symbol.for("radix-ui")] = !0),
                  (0, a.jsx)(i ? r : t, { ...o, ref: s })
                );
              });
            return (i.displayName = `Primitive.${t}`), { ...e, [t]: i };
          }, {});
        function d(e, t) {
          e && i.flushSync(() => e.dispatchEvent(t));
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
      59570: () => {},
      63033: (e) => {
        "use strict";
        e.exports = require("next/dist/server/app-render/work-unit-async-storage.external.js");
      },
      70033: (e, t, r) => {
        "use strict";
        r.a(e, async (e, s) => {
          try {
            r.r(t), r.d(t, { default: () => x });
            var i = r(61268),
              o = r(97713),
              a = r(14480),
              n = r(89882),
              d = r(84205),
              u = r(28909),
              l = r(78337),
              c = r(16979),
              p = r(15090),
              h = e([u, l, c]);
            function x() {
              let [e, t] = (0, d.useState)(""),
                [r, s] = (0, d.useState)(""),
                [h, x] = (0, d.useState)(!1),
                m = (0, n.useRouter)(),
                { toast: f } = (0, p.d)(),
                g = (0, o.createBrowserClient)(
                  "http://localhost:54321",
                  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0",
                ),
                b = async (t) => {
                  t.preventDefault(), x(!0);
                  try {
                    let { error: t } = await g.auth.signUp({
                      email: e,
                      password: r,
                      options: {
                        emailRedirectTo: `${location.origin}/auth/callback`,
                      },
                    });
                    if (t) throw t;
                    f({
                      title: "Success",
                      description:
                        "Please check your email to confirm your account.",
                    }),
                      m.push("/login");
                  } catch (e) {
                    f({
                      title: "Error",
                      description: e.message,
                      variant: "destructive",
                    });
                  } finally {
                    x(!1);
                  }
                },
                v = async () => {
                  try {
                    let { error: e } = await g.auth.signInWithOAuth({
                      provider: "google",
                      options: {
                        redirectTo: `${location.origin}/auth/callback`,
                      },
                    });
                    if (e) throw e;
                  } catch (e) {
                    f({
                      title: "Error",
                      description: e.message,
                      variant: "destructive",
                    });
                  }
                };
              return (0, i.jsx)("div", {
                className:
                  "flex min-h-[calc(100vh-3.5rem)] items-center justify-center py-12 px-4 sm:px-6 lg:px-8",
                children: (0, i.jsxs)("div", {
                  className: "w-full max-w-md space-y-8",
                  children: [
                    (0, i.jsxs)("div", {
                      className: "text-center",
                      children: [
                        (0, i.jsx)("h2", {
                          className: "text-3xl font-bold tracking-tight",
                          children: "Create an account",
                        }),
                        (0, i.jsx)("p", {
                          className: "mt-2 text-sm text-muted-foreground",
                          children: "Sign up to get started with Hijraah",
                        }),
                      ],
                    }),
                    (0, i.jsxs)("form", {
                      onSubmit: b,
                      className: "mt-8 space-y-6",
                      children: [
                        (0, i.jsxs)("div", {
                          className: "space-y-4",
                          children: [
                            (0, i.jsxs)("div", {
                              children: [
                                (0, i.jsx)(c.J, {
                                  htmlFor: "email",
                                  children: "Email address",
                                }),
                                (0, i.jsx)(l.p, {
                                  id: "email",
                                  type: "email",
                                  value: e,
                                  onChange: (e) => t(e.target.value),
                                  required: !0,
                                  className: "mt-1",
                                }),
                              ],
                            }),
                            (0, i.jsxs)("div", {
                              children: [
                                (0, i.jsx)(c.J, {
                                  htmlFor: "password",
                                  children: "Password",
                                }),
                                (0, i.jsx)(l.p, {
                                  id: "password",
                                  type: "password",
                                  value: r,
                                  onChange: (e) => s(e.target.value),
                                  required: !0,
                                  className: "mt-1",
                                }),
                              ],
                            }),
                          ],
                        }),
                        (0, i.jsx)(u.$, {
                          type: "submit",
                          className: "w-full",
                          disabled: h,
                          children: h
                            ? "Creating account..."
                            : "Create account",
                        }),
                      ],
                    }),
                    (0, i.jsxs)("div", {
                      className: "relative my-4",
                      children: [
                        (0, i.jsx)("div", {
                          className: "absolute inset-0 flex items-center",
                          children: (0, i.jsx)("div", {
                            className: "w-full border-t",
                          }),
                        }),
                        (0, i.jsx)("div", {
                          className: "relative flex justify-center text-sm",
                          children: (0, i.jsx)("span", {
                            className:
                              "bg-background px-2 text-muted-foreground",
                            children: "Or continue with",
                          }),
                        }),
                      ],
                    }),
                    (0, i.jsxs)(u.$, {
                      type: "button",
                      variant: "outline",
                      className: "w-full",
                      onClick: v,
                      children: [
                        (0, i.jsx)(a.A, { className: "mr-2 h-4 w-4" }),
                        " Google",
                      ],
                    }),
                  ],
                }),
              });
            }
            ([u, l, c] = h.then ? (await h)() : h), s();
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
            var i = r(61268);
            r(84205);
            var o = r(15942),
              a = e([o]);
            function n({ className: e, type: t, ...r }) {
              return (0, i.jsx)("input", {
                type: t,
                "data-slot": "input",
                className: (0, o.cn)(
                  "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
                  "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
                  "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
                  e,
                ),
                ...r,
              });
            }
            (o = (a.then ? (await a)() : a)[0]), s();
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
      86592: (e) => {
        "use strict";
        e.exports = require("node:inspector");
      },
      91645: (e) => {
        "use strict";
        e.exports = require("net");
      },
      94735: (e) => {
        "use strict";
        e.exports = require("events");
      },
      95255: (e, t, r) => {
        "use strict";
        r.d(t, { A: () => a });
        var s = r(84205),
          i = {
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
          a = (e, t) => {
            let r = (0, s.forwardRef)(
              (
                {
                  color: r = "currentColor",
                  size: a = 24,
                  strokeWidth: n = 2,
                  absoluteStrokeWidth: d,
                  className: u = "",
                  children: l,
                  ...c
                },
                p,
              ) =>
                (0, s.createElement)(
                  "svg",
                  {
                    ref: p,
                    ...i,
                    width: a,
                    height: a,
                    stroke: r,
                    strokeWidth: d ? (24 * Number(n)) / Number(a) : n,
                    className: ["lucide", `lucide-${o(e)}`, u].join(" "),
                    ...c,
                  },
                  [
                    ...t.map(([e, t]) => (0, s.createElement)(e, t)),
                    ...(Array.isArray(l) ? l : [l]),
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
    s = t.X(0, [827, 6518, 2033, 4027, 2872, 7713, 4630], () => r(7032));
  module.exports = s;
})();
//# sourceMappingURL=page.js.map
