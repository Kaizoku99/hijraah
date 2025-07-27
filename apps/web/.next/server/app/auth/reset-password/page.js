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
    (e._sentryDebugIds[t] = "7af25c24-b99a-458c-8994-c2f8f64bc860"),
    (e._sentryDebugIdIdentifier =
      "sentry-dbid-7af25c24-b99a-458c-8994-c2f8f64bc860"));
} catch (e) {}
(() => {
  var e = {};
  (e.id = 4089),
    (e.ids = [4089]),
    (e.modules = {
      3295: (e) => {
        "use strict";
        e.exports = require("next/dist/server/app-render/after-task-async-storage.external.js");
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
      15090: (e, t, r) => {
        "use strict";
        r.d(t, { d: () => p });
        var s = r(84205);
        let o = {
            ADD_TOAST: "ADD_TOAST",
            UPDATE_TOAST: "UPDATE_TOAST",
            DISMISS_TOAST: "DISMISS_TOAST",
            REMOVE_TOAST: "REMOVE_TOAST",
          },
          i = 0,
          a = new Map(),
          n = (e, t) => {
            switch (t.type) {
              case o.ADD_TOAST:
                return { ...e, toasts: [t.toast, ...e.toasts].slice(0, 5) };
              case o.UPDATE_TOAST:
                return {
                  ...e,
                  toasts: e.toasts.map((e) =>
                    e.id === t.toast.id ? { ...e, ...t.toast } : e,
                  ),
                };
              case o.DISMISS_TOAST: {
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
              case o.REMOVE_TOAST:
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
          let t = (i = (i + 1) % Number.MAX_VALUE).toString(),
            r = () => l({ type: o.DISMISS_TOAST, toastId: t });
          return (
            l({
              type: o.ADD_TOAST,
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
                l({ type: o.UPDATE_TOAST, toast: { ...e, id: t } }),
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
              dismiss: (e) => l({ type: o.DISMISS_TOAST, toastId: e }),
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
            var o = r(61268),
              i = r(30595);
            r(84205);
            var a = r(15942),
              n = e([a]);
            function d({ className: e, ...t }) {
              return (0, o.jsx)(i.b, {
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
      18143: (e, t, r) => {
        Promise.resolve().then(r.bind(r, 28974));
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
      28974: (e, t, r) => {
        "use strict";
        let s;
        r.r(t),
          r.d(t, {
            default: () => f,
            generateImageMetadata: () => c,
            generateMetadata: () => l,
            generateViewport: () => p,
          });
        var o = r(63033),
          i = r(26394),
          a = r(60442),
          n = (0, i.registerClientReference)(
            function () {
              throw Error(
                "Attempted to call the default export of \"E:\\\\downloads\\\\Hijraah\\\\apps\\\\web\\\\src\\\\app\\\\auth\\\\reset-password\\\\page.tsx\" from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
              );
            },
            "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\auth\\reset-password\\page.tsx",
            "default",
          );
        let d = { ...o },
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
                  let s, o, i;
                  try {
                    let e = u?.getStore();
                    (s = e?.headers.get("sentry-trace") ?? void 0),
                      (o = e?.headers.get("baggage") ?? void 0),
                      (i = e?.headers);
                  } catch (e) {}
                  return a
                    .wrapServerComponentWithSentry(e, {
                      componentRoute: "/auth/reset-password",
                      componentType: "Page",
                      sentryTraceHeader: s,
                      baggageHeader: o,
                      headers: i,
                    })
                    .apply(t, r);
                },
              })
            : n;
        let l = void 0,
          c = void 0,
          p = void 0,
          f = s;
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
          o = r(56558),
          i = r(61268),
          a = s.forwardRef((e, t) =>
            (0, i.jsx)(o.sG.label, {
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
      32367: (e, t, r) => {
        "use strict";
        let s;
        r.d(t, { AG: () => w, Iw: () => x, UU: () => m });
        var o = r(97713),
          i = r(15149),
          a = r.n(i),
          n = r(84205);
        let { fetch: d } = a()(),
          u = "http://localhost:54321",
          l =
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0",
          c = process.env.SUPABASE_SERVICE_ROLE_KEY,
          p = l ? { apikey: l } : void 0;
        function f() {
          if (!u || !l)
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
            ((e.fetch = d), (e.__USING_PONYFETCH__ = !0));
        }
        function h() {
          return (f(), s)
            ? s
            : (s = (0, o.createBrowserClient)(u, l, {
                global: { headers: p },
              }));
        }
        function x() {
          return (0, n.useMemo)(h, []);
        }
        function m() {
          return (
            f(), (0, o.createBrowserClient)(u, l, { global: { headers: p } })
          );
        }
        let w = h;
        h();
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
      40428: (e, t, r) => {
        "use strict";
        r.a(e, async (e, s) => {
          try {
            r.r(t), r.d(t, { default: () => f });
            var o = r(61268),
              i = r(89882),
              a = r(84205),
              n = r(16979),
              d = r(15090),
              u = r(32367),
              l = r(28909),
              c = r(78337),
              p = e([n, l, c]);
            function f() {
              let [e, t] = (0, a.useState)(""),
                [r, s] = (0, a.useState)(""),
                [p, f] = (0, a.useState)(!1),
                h = (0, i.useRouter)(),
                { toast: x } = (0, d.d)(),
                m = (0, u.AG)(),
                w = async (t) => {
                  if ((t.preventDefault(), f(!0), e !== r)) {
                    x({
                      variant: "destructive",
                      title: "Error",
                      description: "Passwords do not match",
                    }),
                      f(!1);
                    return;
                  }
                  try {
                    let { error: t } = await m.auth.updateUser({ password: e });
                    if (t) throw t;
                    x({
                      title: "Success",
                      description: "Your password has been reset successfully",
                    }),
                      h.push("/auth/login");
                  } catch (e) {
                    x({
                      variant: "destructive",
                      title: "Error",
                      description: "Failed to reset password",
                    });
                  } finally {
                    f(!1);
                  }
                };
              return (0, o.jsx)("div", {
                className:
                  "container flex h-screen w-screen flex-col items-center justify-center",
                children: (0, o.jsxs)("div", {
                  className:
                    "mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]",
                  children: [
                    (0, o.jsxs)("div", {
                      className: "flex flex-col space-y-2 text-center",
                      children: [
                        (0, o.jsx)("h1", {
                          className: "text-2xl font-semibold tracking-tight",
                          children: "Reset your password",
                        }),
                        (0, o.jsx)("p", {
                          className: "text-sm text-muted-foreground",
                          children: "Enter your new password below",
                        }),
                      ],
                    }),
                    (0, o.jsxs)("form", {
                      onSubmit: w,
                      className: "space-y-4",
                      children: [
                        (0, o.jsxs)("div", {
                          className: "space-y-2",
                          children: [
                            (0, o.jsx)(n.J, {
                              htmlFor: "password",
                              children: "New Password",
                            }),
                            (0, o.jsx)(c.p, {
                              id: "password",
                              type: "password",
                              value: e,
                              onChange: (e) => t(e.target.value),
                              required: !0,
                            }),
                          ],
                        }),
                        (0, o.jsxs)("div", {
                          className: "space-y-2",
                          children: [
                            (0, o.jsx)(n.J, {
                              htmlFor: "confirmPassword",
                              children: "Confirm Password",
                            }),
                            (0, o.jsx)(c.p, {
                              id: "confirmPassword",
                              type: "password",
                              value: r,
                              onChange: (e) => s(e.target.value),
                              required: !0,
                            }),
                          ],
                        }),
                        (0, o.jsx)(l.$, {
                          type: "submit",
                          className: "w-full",
                          disabled: p,
                          children: p
                            ? "Resetting password..."
                            : "Reset Password",
                        }),
                      ],
                    }),
                  ],
                }),
              });
            }
            ([n, l, c] = p.then ? (await p)() : p), s();
          } catch (e) {
            s(e);
          }
        });
      },
      41692: (e) => {
        "use strict";
        e.exports = require("node:tls");
      },
      42744: (e, t, r) => {
        "use strict";
        r.r(t),
          r.d(t, {
            GlobalError: () => i.default,
            __next_app__: () => l,
            pages: () => u,
            routeModule: () => c,
            tree: () => d,
          });
        var s = r(11610),
          o = r(51293),
          i = r(59059),
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
                  "auth",
                  {
                    children: [
                      "reset-password",
                      {
                        children: [
                          "__PAGE__",
                          {},
                          {
                            page: [
                              () => Promise.resolve().then(r.bind(r, 28974)),
                              "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\auth\\reset-password\\page.tsx",
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
          u = [
            "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\auth\\reset-password\\page.tsx",
          ],
          l = { require: r, loadChunk: () => Promise.resolve() },
          c = new s.AppPageRouteModule({
            definition: {
              kind: o.RouteKind.APP_PAGE,
              page: "/auth/reset-password/page",
              pathname: "/auth/reset-password",
              bundlePath: "",
              filename: "",
              appPaths: [],
            },
            userland: { loaderTree: d },
          });
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
      55095: (e, t, r) => {
        Promise.resolve().then(r.bind(r, 40428));
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
          o = r(90304),
          i = r(86415),
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
            let r = (0, i.TL)(`Primitive.${t}`),
              o = s.forwardRef((e, s) => {
                let { asChild: o, ...i } = e;
                return (
                  "undefined" != typeof window &&
                    (window[Symbol.for("radix-ui")] = !0),
                  (0, a.jsx)(o ? r : t, { ...i, ref: s })
                );
              });
            return (o.displayName = `Primitive.${t}`), { ...e, [t]: o };
          }, {});
        function d(e, t) {
          e && o.flushSync(() => e.dispatchEvent(t));
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
            var o = r(61268);
            r(84205);
            var i = r(15942),
              a = e([i]);
            function n({ className: e, type: t, ...r }) {
              return (0, o.jsx)("input", {
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
            (i = (a.then ? (await a)() : a)[0]), s();
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
    });
  var t = require("../../../webpack-runtime.js");
  t.C(e);
  var r = (e) => t((t.s = e)),
    s = t.X(0, [827, 6518, 2033, 4027, 2872, 7713, 5149, 4630], () => r(42744));
  module.exports = s;
})();
//# sourceMappingURL=page.js.map
