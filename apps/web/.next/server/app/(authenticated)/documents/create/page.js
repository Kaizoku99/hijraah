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
    (e._sentryDebugIds[t] = "0b44524f-a21f-485b-b461-4a5ed3a014bb"),
    (e._sentryDebugIdIdentifier =
      "sentry-dbid-0b44524f-a21f-485b-b461-4a5ed3a014bb"));
} catch (e) {}
(() => {
  var e = {};
  (e.id = 8347),
    (e.ids = [8347]),
    (e.modules = {
      3295: (e) => {
        "use strict";
        e.exports = require("next/dist/server/app-render/after-task-async-storage.external.js");
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
      23924: (e, t, r) => {
        "use strict";
        r.r(t),
          r.d(t, {
            GlobalError: () => i.default,
            __next_app__: () => u,
            pages: () => c,
            routeModule: () => l,
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
                  "(authenticated)",
                  {
                    children: [
                      "documents",
                      {
                        children: [
                          "create",
                          {
                            children: [
                              "__PAGE__",
                              {},
                              {
                                page: [
                                  () =>
                                    Promise.resolve().then(r.bind(r, 90316)),
                                  "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\(authenticated)\\documents\\create\\page.tsx",
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
            "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\(authenticated)\\documents\\create\\page.tsx",
          ],
          u = { require: r, loadChunk: () => Promise.resolve() },
          l = new s.AppPageRouteModule({
            definition: {
              kind: a.RouteKind.APP_PAGE,
              page: "/(authenticated)/documents/create/page",
              pathname: "/documents/create",
              bundlePath: "",
              filename: "",
              appPaths: [],
            },
            userland: { loaderTree: d },
          });
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
        r.d(t, { AG: () => v, Iw: () => h, UU: () => x });
        var a = r(97713),
          i = r(15149),
          o = r.n(i),
          n = r(84205);
        let { fetch: d } = o()(),
          c = "http://localhost:54321",
          u =
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0",
          l = process.env.SUPABASE_SERVICE_ROLE_KEY,
          p = u ? { apikey: u } : void 0;
        function f() {
          if (!c || !u)
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
        function m() {
          return (f(), s)
            ? s
            : (s = (0, a.createBrowserClient)(c, u, {
                global: { headers: p },
              }));
        }
        function h() {
          return (0, n.useMemo)(m, []);
        }
        function x() {
          return (
            f(), (0, a.createBrowserClient)(c, u, { global: { headers: p } })
          );
        }
        let v = m;
        m();
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
      53954: (e, t, r) => {
        Promise.resolve().then(r.bind(r, 90316));
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
      59570: () => {},
      63033: (e) => {
        "use strict";
        e.exports = require("next/dist/server/app-render/work-unit-async-storage.external.js");
      },
      72967: (e, t, r) => {
        "use strict";
        let s;
        r.r(t),
          r.d(t, {
            default: () => p,
            generateImageMetadata: () => u,
            generateMetadata: () => c,
            generateViewport: () => l,
          });
        var a = r(63033),
          i = r(35242),
          o = r(60442);
        let n = { ...a },
          d =
            "workUnitAsyncStorage" in n
              ? n.workUnitAsyncStorage
              : "requestAsyncStorage" in n
                ? n.requestAsyncStorage
                : void 0;
        s = new Proxy(
          function ({ children: e }) {
            return (0, i.jsx)(i.Fragment, { children: e });
          },
          {
            apply: (e, t, r) => {
              let s, a, i;
              try {
                let e = d?.getStore();
                (s = e?.headers.get("sentry-trace") ?? void 0),
                  (a = e?.headers.get("baggage") ?? void 0),
                  (i = e?.headers);
              } catch (e) {}
              return o
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
          u = void 0,
          l = void 0,
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
      87216: (e, t, r) => {
        "use strict";
        r.a(e, async (e, s) => {
          try {
            r.d(t, { Ck: () => x, dj: () => v });
            var a = r(61268),
              i = r(24419),
              o = r(91635),
              n = r(90495),
              d = r(61950),
              c = r(38568),
              u = r(89123),
              l = r(84205),
              p = r.n(l),
              f = r(15942),
              m = e([f]);
            f = (m.then ? (await m)() : m)[0];
            let b = (0, l.createContext)(void 0);
            i.Kq,
              (p().forwardRef(({ className: e, ...t }, r) =>
                (0, a.jsx)(i.LM, {
                  ref: r,
                  className: (0, f.cn)(
                    "fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]",
                    e,
                  ),
                  ...t,
                }),
              ).displayName = i.LM.displayName);
            let w = (0, o.F)(
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
                destructive: d.A,
                success: c.A,
                info: u.A,
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
                    children: (0, a.jsx)(n.A, { className: "h-4 w-4" }),
                  }),
                ],
              });
            }
            function x({ children: e }) {
              let [t, r] = (0, l.useState)([]),
                s = (0, l.useRef)(0),
                i = (0, l.useCallback)((e) => {
                  r((t) => t.filter((t) => t.id !== e));
                }, []),
                o = (0, l.useCallback)(
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
                n = (0, l.useMemo)(
                  () => ({ toast: o, toasts: t, removeToast: i }),
                  [o, t, i],
                );
              return (0, a.jsxs)(b.Provider, {
                value: n,
                children: [e, (0, a.jsx)(g, {})],
              });
            }
            function v() {
              let e = (0, l.useContext)(b);
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
            (p().forwardRef(({ className: e, variant: t, ...r }, s) =>
              (0, a.jsx)(i.bL, {
                ref: s,
                className: (0, f.cn)(w({ variant: t }), e),
                ...r,
              }),
            ).displayName = i.bL.displayName),
              (p().forwardRef(({ className: e, ...t }, r) =>
                (0, a.jsx)(i.rc, {
                  ref: r,
                  className: (0, f.cn)(
                    "inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 text-sm font-medium ring-offset-background transition-colors hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 group-[.destructive]:border-muted/40 group-[.destructive]:hover:border-destructive/30 group-[.destructive]:hover:bg-destructive group-[.destructive]:hover:text-destructive-foreground group-[.destructive]:focus:ring-destructive",
                    e,
                  ),
                  ...t,
                }),
              ).displayName = i.rc.displayName),
              (p().forwardRef(({ className: e, ...t }, r) =>
                (0, a.jsx)(i.bm, {
                  ref: r,
                  className: (0, f.cn)(
                    "absolute right-2 top-2 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-2 group-hover:opacity-100 group-[.destructive]:text-red-300 group-[.destructive]:hover:text-red-50 group-[.destructive]:focus:ring-red-400 group-[.destructive]:focus:ring-offset-red-600",
                    e,
                  ),
                  "toast-close": "",
                  ...t,
                  children: (0, a.jsx)(n.A, { className: "h-4 w-4" }),
                }),
              ).displayName = i.bm.displayName),
              (p().forwardRef(({ className: e, ...t }, r) =>
                (0, a.jsx)(i.hE, {
                  ref: r,
                  className: (0, f.cn)("text-sm font-semibold", e),
                  ...t,
                }),
              ).displayName = i.hE.displayName),
              (p().forwardRef(({ className: e, ...t }, r) =>
                (0, a.jsx)(i.VY, {
                  ref: r,
                  className: (0, f.cn)("text-sm opacity-90", e),
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
            r.d(t, { S: () => p, k: () => u });
            var a = r(61268),
              i = r(89882),
              o = r(84205),
              n = r(87216),
              d = r(32367),
              c = e([n]);
            n = (c.then ? (await c)() : c)[0];
            let l = (0, o.createContext)(void 0);
            function u({ children: e }) {
              let [t, r] = (0, o.useState)([]),
                [s, c] = (0, o.useState)(null),
                [u, p] = (0, o.useState)([]),
                [f, m] = (0, o.useState)(!1),
                [h, x] = (0, o.useState)(null),
                v = (0, i.useRouter)(),
                { toast: g } = (0, n.dj)(),
                b = (0, d.AG)(),
                w = async (e) => {
                  try {
                    m(!0), x(null);
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
                    p(s || []);
                  } catch (e) {
                    console.error("Error fetching artifact:", e),
                      x("Failed to fetch artifact");
                  } finally {
                    m(!1);
                  }
                },
                y = async (e, t, r, s) => {
                  try {
                    m(!0), x(null);
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
                      { data: o, error: n } = await b
                        .from("artifacts")
                        .insert(i)
                        .select()
                        .single();
                    if (n) throw n;
                    return (
                      g({
                        title: "Artifact created",
                        description: `${e} has been created successfully`,
                        variant: "success",
                      }),
                      o
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
                    m(!1);
                  }
                },
                j = async (e, t) => {
                  try {
                    m(!0), x(null);
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
                    m(!1);
                  }
                },
                N = async (e) => {
                  try {
                    m(!0), x(null);
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
                    m(!1);
                  }
                },
                _ = async (e, t, r) => {
                  try {
                    m(!0), x(null);
                    let { error: s } = await b
                      .from("artifact_messages")
                      .insert({ artifact_id: e, content: t, role: r });
                    if (s) throw s;
                    await w(e);
                  } catch (e) {
                    x("Failed to add message"), console.error(e);
                  } finally {
                    m(!1);
                  }
                },
                q = async (e, t) => {
                  try {
                    m(!0), x(null);
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
                    m(!1);
                  }
                };
              return (0, a.jsx)(l.Provider, {
                value: {
                  artifacts: t,
                  currentArtifact: s,
                  artifactMessages: u,
                  isLoading: f,
                  error: h,
                  createArtifact: y,
                  updateArtifact: j,
                  deleteArtifact: N,
                  getArtifact: w,
                  addArtifactMessage: _,
                  updateArtifactVisibility: q,
                },
                children: e,
              });
            }
            let p = () => {
              let e = (0, o.useContext)(l);
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
      88458: (e, t, r) => {
        Promise.resolve().then(r.bind(r, 90326));
      },
      90286: (e, t, r) => {
        "use strict";
        r.d(t, { A: () => s });
        let s = (0, r(95255).A)("ArrowLeft", [
          ["path", { d: "m12 19-7-7 7-7", key: "1l729n" }],
          ["path", { d: "M19 12H5", key: "x3x0zl" }],
        ]);
      },
      90316: (e, t, r) => {
        "use strict";
        let s;
        r.r(t),
          r.d(t, {
            default: () => f,
            generateImageMetadata: () => l,
            generateMetadata: () => u,
            generateViewport: () => p,
          });
        var a = r(63033),
          i = r(26394),
          o = r(60442),
          n = (0, i.registerClientReference)(
            function () {
              throw Error(
                "Attempted to call the default export of \"E:\\\\downloads\\\\Hijraah\\\\apps\\\\web\\\\src\\\\app\\\\(authenticated)\\\\documents\\\\create\\\\page.tsx\" from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
              );
            },
            "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\(authenticated)\\documents\\create\\page.tsx",
            "default",
          );
        let d = { ...a },
          c =
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
                    let e = c?.getStore();
                    (s = e?.headers.get("sentry-trace") ?? void 0),
                      (a = e?.headers.get("baggage") ?? void 0),
                      (i = e?.headers);
                  } catch (e) {}
                  return o
                    .wrapServerComponentWithSentry(e, {
                      componentRoute: "/(authenticated)/documents/create",
                      componentType: "Page",
                      sentryTraceHeader: s,
                      baggageHeader: a,
                      headers: i,
                    })
                    .apply(t, r);
                },
              })
            : n;
        let u = void 0,
          l = void 0,
          p = void 0,
          f = s;
      },
      90326: (e, t, r) => {
        "use strict";
        r.a(e, async (e, s) => {
          try {
            r.r(t), r.d(t, { default: () => m });
            var a = r(61268),
              i = r(90286),
              o = r(31655),
              n = r.n(o),
              d = r(84205),
              c = r(94953),
              u = r(87826),
              l = r(28909),
              p = e([u, l]);
            function f() {
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
                      (0, a.jsx)("div", {
                        className: "h-32 w-full bg-muted rounded-md",
                      }),
                      (0, a.jsx)("div", {
                        className: "h-20 w-full bg-muted rounded-md",
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
            function m() {
              return (0, a.jsxs)("div", {
                className: "container py-8",
                children: [
                  (0, a.jsx)("div", {
                    className: "flex items-center mb-6",
                    children: (0, a.jsx)(n(), {
                      href: "/documents",
                      legacyBehavior: !0,
                      children: (0, a.jsxs)(l.$, {
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
                      children: "Create AI Document",
                    }),
                  }),
                  (0, a.jsx)(u.k, {
                    children: (0, a.jsx)(d.Suspense, {
                      fallback: (0, a.jsx)(f, {}),
                      children: (0, a.jsx)(c.A, {}),
                    }),
                  }),
                ],
              });
            }
            ([u, l] = p.then ? (await p)() : p), s();
          } catch (e) {
            s(e);
          }
        });
      },
      90495: (e, t, r) => {
        "use strict";
        r.d(t, { A: () => s });
        let s = (0, r(95255).A)("X", [
          ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
          ["path", { d: "m6 6 12 12", key: "d8bk6v" }],
        ]);
      },
      91645: (e) => {
        "use strict";
        e.exports = require("net");
      },
      94735: (e) => {
        "use strict";
        e.exports = require("events");
      },
      94953: (e, t, r) => {
        "use strict";
        r.d(t, { A: () => a });
        var s = r(61268);
        r(84205);
        let a = () => (0, s.jsx)("div", {});
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
                  className: c = "",
                  children: u,
                  ...l
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
                    className: ["lucide", `lucide-${i(e)}`, c].join(" "),
                    ...l,
                  },
                  [
                    ...t.map(([e, t]) => (0, s.createElement)(e, t)),
                    ...(Array.isArray(u) ? u : [u]),
                  ],
                ),
            );
            return (r.displayName = `${e}`), r;
          };
      },
    });
  var t = require("../../../../webpack-runtime.js");
  t.C(e);
  var r = (e) => t((t.s = e)),
    s = t.X(
      0,
      [827, 6518, 2033, 4027, 2872, 7713, 5149, 8859, 1655, 8029, 7393, 4630],
      () => r(23924),
    );
  module.exports = s;
})();
//# sourceMappingURL=page.js.map
