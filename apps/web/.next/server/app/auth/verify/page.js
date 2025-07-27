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
    (e._sentryDebugIds[t] = "77815332-e305-4b35-86f1-5ca8f66eedb2"),
    (e._sentryDebugIdIdentifier =
      "sentry-dbid-77815332-e305-4b35-86f1-5ca8f66eedb2"));
} catch (e) {}
(() => {
  var e = {};
  (e.id = 3067),
    (e.ids = [3067]),
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
          u = [],
          c = { toasts: [] };
        function l(e) {
          (c = n(c, e)),
            u.forEach((e) => {
              e(c);
            });
        }
        function d({ ...e }) {
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
          let [e, t] = s.useState(c);
          return (
            s.useEffect(
              () => (
                u.push(t),
                () => {
                  let e = u.indexOf(t);
                  e > -1 && u.splice(e, 1);
                }
              ),
              [e],
            ),
            {
              ...e,
              toast: d,
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
      31421: (e) => {
        "use strict";
        e.exports = require("node:child_process");
      },
      32367: (e, t, r) => {
        "use strict";
        let s;
        r.d(t, { AG: () => y, Iw: () => f, UU: () => m });
        var i = r(97713),
          o = r(15149),
          a = r.n(o),
          n = r(84205);
        let { fetch: u } = a()(),
          c = "http://localhost:54321",
          l =
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0",
          d = process.env.SUPABASE_SERVICE_ROLE_KEY,
          p = l ? { apikey: l } : void 0;
        function x() {
          if (!c || !l)
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
            ((e.fetch = u), (e.__USING_PONYFETCH__ = !0));
        }
        function h() {
          return (x(), s)
            ? s
            : (s = (0, i.createBrowserClient)(c, l, {
                global: { headers: p },
              }));
        }
        function f() {
          return (0, n.useMemo)(h, []);
        }
        function m() {
          return (
            x(), (0, i.createBrowserClient)(c, l, { global: { headers: p } })
          );
        }
        let y = h;
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
      36954: (e, t, r) => {
        "use strict";
        r.a(e, async (e, s) => {
          try {
            r.r(t), r.d(t, { default: () => d });
            var i = r(61268),
              o = r(89882),
              a = r(84205),
              n = r(15090),
              u = r(32367),
              c = r(28909),
              l = e([c]);
            function d() {
              let [e, t] = (0, a.useState)(!0),
                [r, s] = (0, a.useState)(!1),
                l = (0, o.useRouter)(),
                d = (0, o.useSearchParams)(),
                { toast: p } = (0, n.d)(),
                x = (0, u.UU)();
              return ((0, a.useCallback)(async () => {
                try {
                  let e = d.get("token"),
                    t = d.get("type");
                  if (!e || "email" !== t)
                    throw Error("Invalid verification link");
                  let { error: r } = await x.auth.verifyOtp({
                    token_hash: e,
                    type: "email",
                  });
                  if (r) throw r;
                  s(!0),
                    p({
                      title: "Success",
                      description: "Your email has been verified",
                    });
                } catch (e) {
                  p({
                    variant: "destructive",
                    title: "Error",
                    description: "Failed to verify email",
                  });
                } finally {
                  t(!1);
                }
              }, [d, x.auth, p]),
              e)
                ? (0, i.jsx)("div", {
                    className:
                      "container flex h-screen w-screen flex-col items-center justify-center",
                    children: (0, i.jsx)("div", {
                      className:
                        "mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]",
                      children: (0, i.jsxs)("div", {
                        className: "flex flex-col space-y-2 text-center",
                        children: [
                          (0, i.jsx)("h1", {
                            className: "text-2xl font-semibold tracking-tight",
                            children: "Verifying your email",
                          }),
                          (0, i.jsx)("p", {
                            className: "text-sm text-muted-foreground",
                            children:
                              "Please wait while we verify your email address",
                          }),
                        ],
                      }),
                    }),
                  })
                : (0, i.jsx)("div", {
                    className:
                      "container flex h-screen w-screen flex-col items-center justify-center",
                    children: (0, i.jsxs)("div", {
                      className:
                        "mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]",
                      children: [
                        (0, i.jsxs)("div", {
                          className: "flex flex-col space-y-2 text-center",
                          children: [
                            (0, i.jsx)("h1", {
                              className:
                                "text-2xl font-semibold tracking-tight",
                              children: r
                                ? "Email verified"
                                : "Verification failed",
                            }),
                            (0, i.jsx)("p", {
                              className: "text-sm text-muted-foreground",
                              children: r
                                ? "You can now sign in to your account"
                                : "Please try again or contact support",
                            }),
                          ],
                        }),
                        (0, i.jsx)(c.$, {
                          onClick: () => l.push("/auth/login"),
                          className: "w-full",
                          children: "Go to Login",
                        }),
                      ],
                    }),
                  });
            }
            (c = (l.then ? (await l)() : l)[0]), s();
          } catch (e) {
            s(e);
          }
        });
      },
      37067: (e) => {
        "use strict";
        e.exports = require("node:http");
      },
      38521: (e, t, r) => {
        Promise.resolve().then(r.bind(r, 36954));
      },
      38522: (e) => {
        "use strict";
        e.exports = require("node:zlib");
      },
      41692: (e) => {
        "use strict";
        e.exports = require("node:tls");
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
      57075: (e) => {
        "use strict";
        e.exports = require("node:stream");
      },
      57975: (e) => {
        "use strict";
        e.exports = require("node:util");
      },
      58960: (e, t, r) => {
        "use strict";
        r.r(t),
          r.d(t, {
            GlobalError: () => o.default,
            __next_app__: () => l,
            pages: () => c,
            routeModule: () => d,
            tree: () => u,
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
        let u = {
            children: [
              "",
              {
                children: [
                  "auth",
                  {
                    children: [
                      "verify",
                      {
                        children: [
                          "__PAGE__",
                          {},
                          {
                            page: [
                              () => Promise.resolve().then(r.bind(r, 96836)),
                              "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\auth\\verify\\page.tsx",
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
          c = [
            "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\auth\\verify\\page.tsx",
          ],
          l = { require: r, loadChunk: () => Promise.resolve() },
          d = new s.AppPageRouteModule({
            definition: {
              kind: i.RouteKind.APP_PAGE,
              page: "/auth/verify/page",
              pathname: "/auth/verify",
              bundlePath: "",
              filename: "",
              appPaths: [],
            },
            userland: { loaderTree: u },
          });
      },
      59570: () => {},
      63033: (e) => {
        "use strict";
        e.exports = require("next/dist/server/app-render/work-unit-async-storage.external.js");
      },
      67897: (e, t, r) => {
        Promise.resolve().then(r.bind(r, 96836));
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
      96836: (e, t, r) => {
        "use strict";
        let s;
        r.r(t),
          r.d(t, {
            default: () => x,
            generateImageMetadata: () => d,
            generateMetadata: () => l,
            generateViewport: () => p,
          });
        var i = r(63033),
          o = r(26394),
          a = r(60442),
          n = (0, o.registerClientReference)(
            function () {
              throw Error(
                "Attempted to call the default export of \"E:\\\\downloads\\\\Hijraah\\\\apps\\\\web\\\\src\\\\app\\\\auth\\\\verify\\\\page.tsx\" from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
              );
            },
            "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\auth\\verify\\page.tsx",
            "default",
          );
        let u = { ...i },
          c =
            "workUnitAsyncStorage" in u
              ? u.workUnitAsyncStorage
              : "requestAsyncStorage" in u
                ? u.requestAsyncStorage
                : void 0;
        s =
          "function" == typeof n
            ? new Proxy(n, {
                apply: (e, t, r) => {
                  let s, i, o;
                  try {
                    let e = c?.getStore();
                    (s = e?.headers.get("sentry-trace") ?? void 0),
                      (i = e?.headers.get("baggage") ?? void 0),
                      (o = e?.headers);
                  } catch (e) {}
                  return a
                    .wrapServerComponentWithSentry(e, {
                      componentRoute: "/auth/verify",
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
          d = void 0,
          p = void 0,
          x = s;
      },
    });
  var t = require("../../../webpack-runtime.js");
  t.C(e);
  var r = (e) => t((t.s = e)),
    s = t.X(0, [827, 6518, 2033, 4027, 2872, 7713, 5149, 4630], () => r(58960));
  module.exports = s;
})();
//# sourceMappingURL=page.js.map
