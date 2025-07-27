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
    (e._sentryDebugIds[r] = "5b5ab6c7-90e6-414e-b265-bc79b9cfe28f"),
    (e._sentryDebugIdIdentifier =
      "sentry-dbid-5b5ab6c7-90e6-414e-b265-bc79b9cfe28f"));
} catch (e) {}
(() => {
  var e = {};
  (e.id = 2959),
    (e.ids = [2959]),
    (e.modules = {
      3295: (e) => {
        "use strict";
        e.exports = require("next/dist/server/app-render/after-task-async-storage.external.js");
      },
      4158: (e, r, t) => {
        "use strict";
        t.a(e, async (e, s) => {
          try {
            t.r(r), t.d(r, { default: () => o });
            var a = t(61268),
              n = t(28959),
              i = e([n]);
            function o() {
              return (0, a.jsx)("div", {
                className: "container py-8",
                children: (0, a.jsxs)("div", {
                  className: "max-w-4xl mx-auto",
                  children: [
                    (0, a.jsx)("h1", {
                      className: "text-3xl font-bold mb-2",
                      children: "Semantic Document Search",
                    }),
                    (0, a.jsx)("p", {
                      className: "text-muted-foreground mb-8",
                      children:
                        "Search for documents using natural language. Our AI-powered search understands the meaning behind your query.",
                    }),
                    (0, a.jsx)(n.$, {}),
                  ],
                }),
              });
            }
            (n = (i.then ? (await i)() : i)[0]), s();
          } catch (e) {
            s(e);
          }
        });
      },
      4277: (e, r, t) => {
        "use strict";
        t.d(r, { ZA: () => g });
        var s = t(68416);
        function a(e, r, t) {
          try {
            return e(r);
          } catch (e) {
            return (
              (0, s.R8)(
                "[nuqs] Error while parsing value `%s`: %O" +
                  (t ? " (for key `%s`)" : ""),
                r,
                e,
                t,
              ),
              null
            );
          }
        }
        var n = (function () {
            if ("undefined" == typeof window || !window.GestureEvent) return 50;
            try {
              let e = navigator.userAgent?.match(/version\/([\d\.]+) safari/i);
              return parseFloat(e[1]) >= 17 ? 120 : 320;
            } catch {
              return 320;
            }
          })(),
          i = new Map(),
          o = { history: "replace", scroll: !1, shallow: !0, throttleMs: n },
          l = new Set(),
          u = 0,
          c = null,
          d = t(84205);
        function p(e) {
          function r(r) {
            if (void 0 === r) return null;
            let t = "";
            if (Array.isArray(r)) {
              if (void 0 === r[0]) return null;
              t = r[0];
            }
            return "string" == typeof r && (t = r), a(e.parse, t);
          }
          return {
            eq: (e, r) => e === r,
            ...e,
            parseServerSide: r,
            withDefault(e) {
              return {
                ...this,
                defaultValue: e,
                parseServerSide: (t) => r(t) ?? e,
              };
            },
            withOptions(e) {
              return { ...this, ...e };
            },
          };
        }
        p({ parse: (e) => e, serialize: (e) => `${e}` });
        var h = p({
          parse: (e) => {
            let r = parseInt(e);
            return Number.isNaN(r) ? null : r;
          },
          serialize: (e) => Math.round(e).toFixed(),
        });
        function f(e, r) {
          return e.valueOf() === r.valueOf();
        }
        p({
          parse: (e) => {
            let r = h.parse(e);
            return null === r ? null : r - 1;
          },
          serialize: (e) => h.serialize(e + 1),
        }),
          p({
            parse: (e) => {
              let r = parseInt(e, 16);
              return Number.isNaN(r) ? null : r;
            },
            serialize: (e) => {
              let r = Math.round(e).toString(16);
              return r.padStart(r.length + (r.length % 2), "0");
            },
          }),
          p({
            parse: (e) => {
              let r = parseFloat(e);
              return Number.isNaN(r) ? null : r;
            },
            serialize: (e) => e.toString(),
          }),
          p({
            parse: (e) => "true" === e,
            serialize: (e) => (e ? "true" : "false"),
          }),
          p({
            parse: (e) => {
              let r = parseInt(e);
              return Number.isNaN(r) ? null : new Date(r);
            },
            serialize: (e) => e.valueOf().toString(),
            eq: f,
          }),
          p({
            parse: (e) => {
              let r = new Date(e);
              return Number.isNaN(r.valueOf()) ? null : r;
            },
            serialize: (e) => e.toISOString(),
            eq: f,
          }),
          p({
            parse: (e) => {
              let r = new Date(e.slice(0, 10));
              return Number.isNaN(r.valueOf()) ? null : r;
            },
            serialize: (e) => e.toISOString().slice(0, 10),
            eq: f,
          });
        var m = (function (e) {
          return {
            all: (e = e || new Map()),
            on: function (r, t) {
              var s = e.get(r);
              s ? s.push(t) : e.set(r, [t]);
            },
            off: function (r, t) {
              var s = e.get(r);
              s && (t ? s.splice(s.indexOf(t) >>> 0, 1) : e.set(r, []));
            },
            emit: function (r, t) {
              var s = e.get(r);
              s &&
                s.slice().map(function (e) {
                  e(t);
                }),
                (s = e.get("*")) &&
                  s.slice().map(function (e) {
                    e(r, t);
                  });
            },
          };
        })();
        function g(
          e,
          {
            history: r = "replace",
            shallow: t = !0,
            scroll: p = !1,
            throttleMs: h = n,
            parse: f = (e) => e,
            serialize: x = String,
            eq: v = (e, r) => e === r,
            defaultValue: b,
            clearOnDefault: w = !0,
            startTransition: y,
          } = {
            history: "replace",
            scroll: !1,
            shallow: !0,
            throttleMs: n,
            parse: (e) => e,
            serialize: String,
            eq: (e, r) => e === r,
            clearOnDefault: !0,
            defaultValue: void 0,
          },
        ) {
          let q = (0, s.V7)(),
            N = q.searchParams;
          (0, d.useRef)(N?.get(e) ?? null);
          let [j, S] = (0, d.useState)(() => {
              let r = i.get(e),
                t = void 0 === r ? (N?.get(e) ?? null) : r;
              return null === t ? null : a(f, t, e);
            }),
            k = (0, d.useRef)(j);
          (0, s.Yz)(
            "[nuqs `%s`] render - state: %O, iSP: %s",
            e,
            j,
            N?.get(e) ?? null,
          );
          let E = (0, d.useCallback)(
            (a, d = {}) => {
              let f = "function" == typeof a ? a(k.current ?? b ?? null) : a;
              (d.clearOnDefault ?? w) &&
                null !== f &&
                void 0 !== b &&
                v(f, b) &&
                (f = null);
              let g = (function (e, r, t, a) {
                let u = null === r ? null : t(r);
                return (
                  (0, s.Yz)("[nuqs queue] Enqueueing %s=%s %O", e, u, a),
                  i.set(e, u),
                  "push" === a.history && (o.history = "push"),
                  a.scroll && (o.scroll = !0),
                  !1 === a.shallow && (o.shallow = !1),
                  a.startTransition && l.add(a.startTransition),
                  (o.throttleMs = Math.max(
                    a.throttleMs ?? n,
                    Number.isFinite(o.throttleMs) ? o.throttleMs : 0,
                  )),
                  u
                );
              })(e, f, x, {
                history: d.history ?? r,
                shallow: d.shallow ?? t,
                scroll: d.scroll ?? p,
                throttleMs: d.throttleMs ?? h,
                startTransition: d.startTransition ?? y,
              });
              return (
                m.emit(e, { state: f, query: g }),
                (function ({
                  getSearchParamsSnapshot: e = function () {
                    return new URLSearchParams(location.search);
                  },
                  updateUrl: r,
                  rateLimitFactor: t = 1,
                }) {
                  return (
                    null === c &&
                      (c = new Promise((a, d) => {
                        if (!Number.isFinite(o.throttleMs)) {
                          (0, s.Yz)(
                            "[nuqs queue] Skipping flush due to throttleMs=Infinity",
                          ),
                            a(e()),
                            setTimeout(() => {
                              c = null;
                            }, 0);
                          return;
                        }
                        function p() {
                          u = performance.now();
                          let [t, p] = (function ({
                            updateUrl: e,
                            getSearchParamsSnapshot: r,
                          }) {
                            let t = r();
                            if (0 === i.size) return [t, null];
                            let a = Array.from(i.entries()),
                              u = { ...o },
                              c = Array.from(l);
                            for (let [e, r] of (i.clear(),
                            l.clear(),
                            (o.history = "replace"),
                            (o.scroll = !1),
                            (o.shallow = !0),
                            (o.throttleMs = n),
                            (0, s.Yz)(
                              "[nuqs queue] Flushing queue %O with options %O",
                              a,
                              u,
                            ),
                            a))
                              null === r ? t.delete(e) : t.set(e, r);
                            try {
                              return (
                                (function (e, r) {
                                  let t = (s) => {
                                    if (s === e.length) return r();
                                    let a = e[s];
                                    if (!a)
                                      throw Error(
                                        "Invalid transition function",
                                      );
                                    a(() => t(s + 1));
                                  };
                                  t(0);
                                })(c, () => {
                                  e(t, {
                                    history: u.history,
                                    scroll: u.scroll,
                                    shallow: u.shallow,
                                  });
                                }),
                                [t, null]
                              );
                            } catch (e) {
                              return (
                                console.error(
                                  (0, s.z3)(429),
                                  a.map(([e]) => e).join(),
                                  e,
                                ),
                                [t, e]
                              );
                            }
                          })({ updateUrl: r, getSearchParamsSnapshot: e });
                          null === p ? a(t) : d(t), (c = null);
                        }
                        setTimeout(function () {
                          let e = performance.now() - u,
                            r = o.throttleMs,
                            a = t * Math.max(0, Math.min(r, r - e));
                          (0, s.Yz)(
                            "[nuqs queue] Scheduling flush in %f ms. Throttled at %f ms",
                            a,
                            r,
                          ),
                            0 === a ? p() : setTimeout(p, a);
                        }, 0);
                      })),
                    c
                  );
                })(q)
              );
            },
            [
              e,
              r,
              t,
              p,
              h,
              y,
              q.updateUrl,
              q.getSearchParamsSnapshot,
              q.rateLimitFactor,
            ],
          );
          return [j ?? b ?? null, E];
        }
      },
      5451: (e, r, t) => {
        "use strict";
        t.a(e, async (e, s) => {
          try {
            t.d(r, {
              BT: () => p,
              Wu: () => h,
              ZB: () => d,
              Zp: () => u,
              aR: () => c,
              wL: () => f,
            });
            var a = t(61268),
              n = t(55728),
              i = t(84205),
              o = t(15942),
              l = e([o]);
            o = (l.then ? (await l)() : l)[0];
            let u = i.forwardRef(({ className: e, ...r }, t) =>
              (0, a.jsx)(n.P.div, {
                ref: t,
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
                ...r,
              }),
            );
            u.displayName = "Card";
            let c = i.forwardRef(({ className: e, ...r }, t) =>
              (0, a.jsx)("div", {
                ref: t,
                className: (0, o.cn)("flex flex-col space-y-1.5 p-6", e),
                ...r,
              }),
            );
            c.displayName = "CardHeader";
            let d = i.forwardRef(({ className: e, ...r }, t) =>
              (0, a.jsx)("h3", {
                ref: t,
                className: (0, o.cn)(
                  "text-2xl font-semibold leading-none tracking-tight",
                  e,
                ),
                ...r,
              }),
            );
            d.displayName = "CardTitle";
            let p = i.forwardRef(({ className: e, ...r }, t) =>
              (0, a.jsx)("p", {
                ref: t,
                className: (0, o.cn)("text-sm text-muted-foreground", e),
                ...r,
              }),
            );
            p.displayName = "CardDescription";
            let h = i.forwardRef(({ className: e, ...r }, t) =>
              (0, a.jsx)("div", {
                ref: t,
                className: (0, o.cn)("p-6 pt-0", e),
                ...r,
              }),
            );
            h.displayName = "CardContent";
            let f = i.forwardRef(({ className: e, ...r }, t) =>
              (0, a.jsx)("div", {
                ref: t,
                className: (0, o.cn)("flex items-center p-6 pt-0", e),
                ...r,
              }),
            );
            (f.displayName = "CardFooter"), s();
          } catch (e) {
            s(e);
          }
        });
      },
      6946: (e, r, t) => {
        Promise.resolve().then(t.bind(t, 12272));
      },
      8086: (e) => {
        "use strict";
        e.exports = require("module");
      },
      10846: (e) => {
        "use strict";
        e.exports = require("next/dist/compiled/next-server/app-page.runtime.prod.js");
      },
      12272: (e, r, t) => {
        "use strict";
        let s;
        t.r(r),
          t.d(r, {
            default: () => h,
            generateImageMetadata: () => d,
            generateMetadata: () => c,
            generateViewport: () => p,
          });
        var a = t(63033),
          n = t(26394),
          i = t(60442),
          o = (0, n.registerClientReference)(
            function () {
              throw Error(
                "Attempted to call the default export of \"E:\\\\downloads\\\\Hijraah\\\\apps\\\\web\\\\src\\\\app\\\\search\\\\page.tsx\" from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
              );
            },
            "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\search\\page.tsx",
            "default",
          );
        let l = { ...a },
          u =
            "workUnitAsyncStorage" in l
              ? l.workUnitAsyncStorage
              : "requestAsyncStorage" in l
                ? l.requestAsyncStorage
                : void 0;
        s =
          "function" == typeof o
            ? new Proxy(o, {
                apply: (e, r, t) => {
                  let s, a, n;
                  try {
                    let e = u?.getStore();
                    (s = e?.headers.get("sentry-trace") ?? void 0),
                      (a = e?.headers.get("baggage") ?? void 0),
                      (n = e?.headers);
                  } catch (e) {}
                  return i
                    .wrapServerComponentWithSentry(e, {
                      componentRoute: "/search",
                      componentType: "Page",
                      sentryTraceHeader: s,
                      baggageHeader: a,
                      headers: n,
                    })
                    .apply(r, t);
                },
              })
            : o;
        let c = void 0,
          d = void 0,
          p = void 0,
          h = s;
      },
      16804: (e, r, t) => {
        "use strict";
        t.r(r),
          t.d(r, {
            GlobalError: () => n.default,
            __next_app__: () => c,
            pages: () => u,
            routeModule: () => d,
            tree: () => l,
          });
        var s = t(11610),
          a = t(51293),
          n = t(59059),
          i = t(17770),
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
        t.d(r, o);
        let l = {
            children: [
              "",
              {
                children: [
                  "search",
                  {
                    children: [
                      "__PAGE__",
                      {},
                      {
                        page: [
                          () => Promise.resolve().then(t.bind(t, 12272)),
                          "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\search\\page.tsx",
                        ],
                      },
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
          u = ["E:\\downloads\\Hijraah\\apps\\web\\src\\app\\search\\page.tsx"],
          c = { require: t, loadChunk: () => Promise.resolve() },
          d = new s.AppPageRouteModule({
            definition: {
              kind: a.RouteKind.APP_PAGE,
              page: "/search/page",
              pathname: "/search",
              bundlePath: "",
              filename: "",
              appPaths: [],
            },
            userland: { loaderTree: l },
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
      25098: (e, r, t) => {
        Promise.resolve().then(t.bind(t, 4158));
      },
      28354: (e) => {
        "use strict";
        e.exports = require("util");
      },
      28959: (e, r, t) => {
        "use strict";
        t.a(e, async (e, s) => {
          try {
            t.d(r, { $: () => m });
            var a = t(61268),
              n = t(44803),
              i = t(89882),
              o = t(4277),
              l = t(84205),
              u = t(46532),
              c = t(28909),
              d = t(5451),
              p = t(78337),
              h = t(94812),
              f = e([u, c, d, p, h]);
            function m() {
              let e = (0, i.useRouter)(),
                [r, t] = (0, o.ZA)("q", { defaultValue: "" }),
                [s, f] = (0, l.useState)([]),
                [m, g] = (0, l.useState)(!1),
                [x, v] = (0, l.useState)(null),
                b = async (e) => {
                  if (!e.trim()) {
                    f([]), v(null);
                    return;
                  }
                  g(!0), v(null);
                  try {
                    let r = await fetch(
                      `/api/search?query=${encodeURIComponent(e)}`,
                    );
                    if (!r.ok) {
                      let e = await r.json();
                      throw Error(e.error || "Search failed");
                    }
                    let t = await r.json();
                    f(t.results),
                      0 === t.results.length &&
                        v("No documents found matching your query");
                  } catch (e) {
                    console.error("Search error:", e),
                      v(e.message || "An error occurred during search");
                  } finally {
                    g(!1);
                  }
                },
                w = async (e) => {
                  e.preventDefault(), r.trim() ? b(r) : (f([]), v(null));
                },
                y = (r) => {
                  e.push(`/documents/${r}`);
                };
              return (0, a.jsxs)("div", {
                className: "w-full max-w-3xl mx-auto",
                children: [
                  (0, a.jsxs)("form", {
                    onSubmit: w,
                    className: "flex gap-2 mb-6",
                    children: [
                      (0, a.jsx)(p.p, {
                        type: "text",
                        placeholder: "Search documents semantically...",
                        value: r,
                        onChange: (e) => t(e.target.value),
                        className: "flex-1",
                      }),
                      (0, a.jsxs)(c.$, {
                        type: "submit",
                        disabled: m,
                        children: [
                          m
                            ? "Searching..."
                            : (0, a.jsx)(n.A, { className: "h-4 w-4 mr-2" }),
                          "Search",
                        ],
                      }),
                    ],
                  }),
                  m &&
                    (0, a.jsx)("div", {
                      className: "space-y-4",
                      children: [void 0, void 0, void 0].map((e, r) =>
                        (0, a.jsxs)(
                          d.Zp,
                          {
                            children: [
                              (0, a.jsxs)(d.aR, {
                                className: "pb-2",
                                children: [
                                  (0, a.jsx)(h.E, { className: "h-4 w-3/4" }),
                                  (0, a.jsx)(h.E, { className: "h-3 w-1/2" }),
                                ],
                              }),
                              (0, a.jsxs)(d.Wu, {
                                children: [
                                  (0, a.jsx)(h.E, {
                                    className: "h-3 w-full mb-2",
                                  }),
                                  (0, a.jsx)(h.E, {
                                    className: "h-3 w-full mb-2",
                                  }),
                                  (0, a.jsx)(h.E, { className: "h-3 w-2/3" }),
                                ],
                              }),
                            ],
                          },
                          r,
                        ),
                      ),
                    }),
                  x &&
                    !m &&
                    (0, a.jsx)("div", {
                      className: "text-center py-8 text-muted-foreground",
                      children: x,
                    }),
                  !m &&
                    s.length > 0 &&
                    (0, a.jsx)("div", {
                      className: "space-y-4",
                      children: s.map((e) =>
                        (0, a.jsxs)(
                          d.Zp,
                          {
                            className:
                              "cursor-pointer hover:bg-muted/50 transition-colors",
                            onClick: () => y(e.id),
                            children: [
                              (0, a.jsxs)(d.aR, {
                                className: "pb-2",
                                children: [
                                  (0, a.jsxs)("div", {
                                    className:
                                      "flex justify-between items-start",
                                    children: [
                                      (0, a.jsx)(d.ZB, {
                                        className: "text-lg",
                                        children: e.title,
                                      }),
                                      (0, a.jsx)(u.E, {
                                        variant:
                                          "public" === e.visibility
                                            ? "default"
                                            : "outline",
                                        children: e.visibility,
                                      }),
                                    ],
                                  }),
                                  (0, a.jsxs)(d.BT, {
                                    children: [
                                      "Relevance: ",
                                      Math.round(100 * e.similarity),
                                      "%",
                                    ],
                                  }),
                                ],
                              }),
                              (0, a.jsx)(d.Wu, {
                                children: (0, a.jsxs)("p", {
                                  className:
                                    "text-sm text-muted-foreground line-clamp-3",
                                  children: [
                                    e.content?.text?.substring(0, 200) ||
                                      "No preview available",
                                    "...",
                                  ],
                                }),
                              }),
                              (0, a.jsx)(d.wL, {
                                className: "pt-0",
                                children: (0, a.jsx)(c.$, {
                                  variant: "ghost",
                                  size: "sm",
                                  children: "View Document",
                                }),
                              }),
                            ],
                          },
                          e.id,
                        ),
                      ),
                    }),
                ],
              });
            }
            ([u, c, d, p, h] = f.then ? (await f)() : f), s();
          } catch (e) {
            s(e);
          }
        });
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
      44708: (e) => {
        "use strict";
        e.exports = require("node:https");
      },
      44803: (e, r, t) => {
        "use strict";
        t.d(r, { A: () => s });
        let s = (0, t(95255).A)("Search", [
          ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }],
          ["path", { d: "m21 21-4.3-4.3", key: "1qie3q" }],
        ]);
      },
      46532: (e, r, t) => {
        "use strict";
        t.a(e, async (e, s) => {
          try {
            t.d(r, { E: () => u });
            var a = t(61268),
              n = t(86415),
              i = t(91635);
            t(84205);
            var o = t(15942),
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
            function u({ className: e, variant: r, asChild: t = !1, ...s }) {
              let i = t ? n.DX : "span";
              return (0, a.jsx)(i, {
                "data-slot": "badge",
                className: (0, o.cn)(c({ variant: r }), e),
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
      57975: (e) => {
        "use strict";
        e.exports = require("node:util");
      },
      63033: (e) => {
        "use strict";
        e.exports = require("next/dist/server/app-render/work-unit-async-storage.external.js");
      },
      68416: (e, r, t) => {
        "use strict";
        t.d(r, {
          Hx: () => d,
          OB: () => i,
          R8: () => u,
          V7: () => p,
          Yz: () => l,
          z3: () => n,
        });
        var s = t(84205),
          a = {
            303: "Multiple adapter contexts detected. This might happen in monorepos.",
            404: "nuqs requires an adapter to work with your framework.",
            409: "Multiple versions of the library are loaded. This may lead to unexpected behavior. Currently using `%s`, but `%s` (via the %s adapter) was about to load on top.",
            414: "Max safe URL length exceeded. Some browsers may not be able to accept this URL. Consider limiting the amount of state stored in the URL.",
            429: "URL update rate-limited by the browser. Consider increasing `throttleMs` for key(s) `%s`. %O",
            500: "Empty search params cache. Search params can't be accessed in Layouts.",
            501: "Search params cache already populated. Have you called `parse` twice?",
          };
        function n(e) {
          return `[nuqs] ${a[e]}
  See https://err.47ng.com/NUQS-${e}`;
        }
        function i(e) {
          if (0 === e.size) return "";
          let r = [];
          for (let [t, s] of e.entries()) {
            let e = t
              .replace(/#/g, "%23")
              .replace(/&/g, "%26")
              .replace(/\+/g, "%2B")
              .replace(/=/g, "%3D")
              .replace(/\?/g, "%3F");
            r.push(
              `${e}=${s
                .replace(/%/g, "%25")
                .replace(/\+/g, "%2B")
                .replace(/ /g, "+")
                .replace(/#/g, "%23")
                .replace(/&/g, "%26")
                .replace(/"/g, "%22")
                .replace(/'/g, "%27")
                .replace(/`/g, "%60")
                .replace(/</g, "%3C")
                .replace(/>/g, "%3E")
                .replace(/[\x00-\x1F]/g, (e) => encodeURIComponent(e))}`,
            );
          }
          return "?" + r.join("&");
        }
        var o = (function () {
          try {
            if ("undefined" == typeof localStorage) return !1;
            let e = "nuqs-localStorage-test";
            localStorage.setItem(e, e);
            let r = localStorage.getItem(e) === e;
            if ((localStorage.removeItem(e), !r)) return !1;
          } catch (e) {
            return (
              console.error(
                "[nuqs]: debug mode is disabled (localStorage unavailable).",
                e,
              ),
              !1
            );
          }
          return (localStorage.getItem("debug") ?? "").includes("nuqs");
        })();
        function l(e, ...r) {
          if (!o) return;
          let t = (function (e, ...r) {
            return e.replace(/%[sfdO]/g, (e) => {
              let t = r.shift();
              return "%O" === e && t
                ? JSON.stringify(t).replace(/"([^"]+)":/g, "$1:")
                : String(t);
            });
          })(e, ...r);
          performance.mark(t);
          try {
            console.log(e, ...r);
          } catch (e) {
            console.log(t);
          }
        }
        function u(e, ...r) {
          o && console.warn(e, ...r);
        }
        var c = (0, s.createContext)({
          useAdapter() {
            throw Error(n(404));
          },
        });
        function d(e) {
          return ({ children: r, ...t }) =>
            (0, s.createElement)(
              c.Provider,
              { ...t, value: { useAdapter: e } },
              r,
            );
        }
        function p() {
          let e = (0, s.useContext)(c);
          if (!("useAdapter" in e)) throw Error(n(404));
          return e.useAdapter();
        }
        (c.displayName = "NuqsAdapterContext"),
          o &&
            "undefined" != typeof window &&
            (window.__NuqsAdapterContext &&
              window.__NuqsAdapterContext !== c &&
              console.error(n(303)),
            (window.__NuqsAdapterContext = c));
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
      78337: (e, r, t) => {
        "use strict";
        t.a(e, async (e, s) => {
          try {
            t.d(r, { p: () => o });
            var a = t(61268);
            t(84205);
            var n = t(15942),
              i = e([n]);
            function o({ className: e, type: r, ...t }) {
              return (0, a.jsx)("input", {
                type: r,
                "data-slot": "input",
                className: (0, n.cn)(
                  "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
                  "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
                  "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
                  e,
                ),
                ...t,
              });
            }
            (n = (i.then ? (await i)() : i)[0]), s();
          } catch (e) {
            s(e);
          }
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
      86592: (e) => {
        "use strict";
        e.exports = require("node:inspector");
      },
      94735: (e) => {
        "use strict";
        e.exports = require("events");
      },
      94812: (e, r, t) => {
        "use strict";
        t.a(e, async (e, s) => {
          try {
            t.d(r, { E: () => o });
            var a = t(61268),
              n = t(15942),
              i = e([n]);
            function o({ className: e, ...r }) {
              return (0, a.jsx)("div", {
                "data-slot": "skeleton",
                className: (0, n.cn)("bg-accent animate-pulse rounded-md", e),
                ...r,
              });
            }
            (n = (i.then ? (await i)() : i)[0]), s();
          } catch (e) {
            s(e);
          }
        });
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
        let n = (e) =>
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
                  strokeWidth: o = 2,
                  absoluteStrokeWidth: l,
                  className: u = "",
                  children: c,
                  ...d
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
                    strokeWidth: l ? (24 * Number(o)) / Number(i) : o,
                    className: ["lucide", `lucide-${n(e)}`, u].join(" "),
                    ...d,
                  },
                  [
                    ...r.map(([e, r]) => (0, s.createElement)(e, r)),
                    ...(Array.isArray(c) ? c : [c]),
                  ],
                ),
            );
            return (t.displayName = `${e}`), t;
          };
      },
    });
  var r = require("../../webpack-runtime.js");
  r.C(e);
  var t = (e) => r((r.s = e)),
    s = r.X(0, [827, 6518, 2033, 4027, 5728, 4630], () => t(16804));
  module.exports = s;
})();
//# sourceMappingURL=page.js.map
