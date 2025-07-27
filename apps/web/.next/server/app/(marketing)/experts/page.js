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
    (e._sentryDebugIds[t] = "2f9d8b38-0e33-4b07-939f-b527eedfc6b2"),
    (e._sentryDebugIdIdentifier =
      "sentry-dbid-2f9d8b38-0e33-4b07-939f-b527eedfc6b2"));
} catch (e) {}
(() => {
  var e = {};
  (e.id = 8064),
    (e.ids = [8064]),
    (e.modules = {
      1278: (e, t, r) => {
        "use strict";
        r.d(t, { Qg: () => i, bL: () => l });
        var s = r(84205),
          n = r(56558),
          a = r(61268),
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
            (0, a.jsx)(n.sG.span, {
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
              i = r(84205),
              o = r(15942),
              l = e([o]);
            o = (l.then ? (await l)() : l)[0];
            let d = i.forwardRef(({ className: e, ...t }, r) =>
              (0, n.jsx)(a.P.div, {
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
              (0, n.jsx)("div", {
                ref: r,
                className: (0, o.cn)("flex flex-col space-y-1.5 p-6", e),
                ...t,
              }),
            );
            c.displayName = "CardHeader";
            let u = i.forwardRef(({ className: e, ...t }, r) =>
              (0, n.jsx)("h3", {
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
              (0, n.jsx)("p", {
                ref: r,
                className: (0, o.cn)("text-sm text-muted-foreground", e),
                ...t,
              }),
            );
            p.displayName = "CardDescription";
            let f = i.forwardRef(({ className: e, ...t }, r) =>
              (0, n.jsx)("div", {
                ref: r,
                className: (0, o.cn)("p-6 pt-0", e),
                ...t,
              }),
            );
            f.displayName = "CardContent";
            let m = i.forwardRef(({ className: e, ...t }, r) =>
              (0, n.jsx)("div", {
                ref: r,
                className: (0, o.cn)("flex items-center p-6 pt-0", e),
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
      10308: (e, t, r) => {
        "use strict";
        r.d(t, { c: () => n });
        var s = r(84205);
        function n(e) {
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
      13315: (e, t, r) => {
        "use strict";
        r.d(t, { H4: () => q, _V: () => N, bL: () => j });
        var s = r(84205),
          n = r(18047),
          a = r(10308),
          i = r(66130),
          o = r(78593),
          l = r(17764);
        function d() {
          return () => {};
        }
        var c = r(61268),
          u = "Avatar",
          [p, f] = (0, n.A)(u),
          [m, x] = p(u),
          h = s.forwardRef((e, t) => {
            let { __scopeAvatar: r, ...n } = e,
              [a, i] = s.useState("idle");
            return (0, c.jsx)(m, {
              scope: r,
              imageLoadingStatus: a,
              onImageLoadingStatusChange: i,
              children: (0, c.jsx)(o.sG.span, { ...n, ref: t }),
            });
          });
        h.displayName = u;
        var g = "AvatarImage",
          v = s.forwardRef((e, t) => {
            let {
                __scopeAvatar: r,
                src: n,
                onLoadingStatusChange: u = () => {},
                ...p
              } = e,
              f = x(g, r),
              m = (function (e, { referrerPolicy: t, crossOrigin: r }) {
                let n = (0, l.useSyncExternalStore)(
                    d,
                    () => !0,
                    () => !1,
                  ),
                  a = s.useRef(null),
                  o = n
                    ? (a.current || (a.current = new window.Image()), a.current)
                    : null,
                  [c, u] = s.useState(() => w(o, e));
                return (
                  (0, i.N)(() => {
                    u(w(o, e));
                  }, [o, e]),
                  (0, i.N)(() => {
                    let e = (e) => () => {
                      u(e);
                    };
                    if (!o) return;
                    let s = e("loaded"),
                      n = e("error");
                    return (
                      o.addEventListener("load", s),
                      o.addEventListener("error", n),
                      t && (o.referrerPolicy = t),
                      "string" == typeof r && (o.crossOrigin = r),
                      () => {
                        o.removeEventListener("load", s),
                          o.removeEventListener("error", n);
                      }
                    );
                  }, [o, r, t]),
                  c
                );
              })(n, p),
              h = (0, a.c)((e) => {
                u(e), f.onImageLoadingStatusChange(e);
              });
            return (
              (0, i.N)(() => {
                "idle" !== m && h(m);
              }, [m, h]),
              "loaded" === m
                ? (0, c.jsx)(o.sG.img, { ...p, ref: t, src: n })
                : null
            );
          });
        v.displayName = g;
        var y = "AvatarFallback",
          b = s.forwardRef((e, t) => {
            let { __scopeAvatar: r, delayMs: n, ...a } = e,
              i = x(y, r),
              [l, d] = s.useState(void 0 === n);
            return (
              s.useEffect(() => {
                if (void 0 !== n) {
                  let e = window.setTimeout(() => d(!0), n);
                  return () => window.clearTimeout(e);
                }
              }, [n]),
              l && "loaded" !== i.imageLoadingStatus
                ? (0, c.jsx)(o.sG.span, { ...a, ref: t })
                : null
            );
          });
        function w(e, t) {
          return e
            ? t
              ? (e.src !== t && (e.src = t),
                e.complete && e.naturalWidth > 0 ? "loaded" : "loading")
              : "error"
            : "idle";
        }
        b.displayName = y;
        var j = h,
          N = v,
          q = b;
      },
      15012: (e, t, r) => {
        "use strict";
        r.d(t, { A: () => s });
        let s = (0, r(95255).A)("Video", [
          ["path", { d: "m22 8-6 4 6 4V8Z", key: "50v9me" }],
          [
            "rect",
            {
              width: "14",
              height: "12",
              x: "2",
              y: "6",
              rx: "2",
              ry: "2",
              key: "1rqjg6",
            },
          ],
        ]);
      },
      17117: (e, t, r) => {
        "use strict";
        r.a(e, async (e, s) => {
          try {
            r.r(t), r.d(t, { default: () => v });
            var n = r(61268),
              a = r(86951),
              i = r(58055),
              o = r(36789),
              l = r(15012),
              d = r(71507),
              c = r(84205),
              u = r(23734),
              p = r(28909),
              f = r(84063),
              m = r(5451),
              x = r(78337),
              h = r(95957),
              g = e([u, p, m, x, h]);
            [u, p, m, x, h] = g.then ? (await g)() : g;
            let y = [
              {
                id: 1,
                name: "Dr. Sarah Johnson",
                specialization: "Immigration Law",
                rating: 4.9,
                reviews: 128,
                location: "New York, USA",
                image:
                  "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
                availability: ["Monday", "Wednesday", "Friday"],
                hourlyRate: 150,
              },
            ];
            function v() {
              let [e, t] = (0, c.useState)(null),
                [r, s] = (0, c.useState)(void 0);
              return (0, n.jsxs)("div", {
                className: "container py-8",
                children: [
                  (0, n.jsxs)("div", {
                    className: "flex justify-between items-center mb-8",
                    children: [
                      (0, n.jsxs)("div", {
                        children: [
                          (0, n.jsx)("h1", {
                            className: "text-3xl font-bold",
                            children: "Immigration Experts",
                          }),
                          (0, n.jsx)("p", {
                            className: "text-muted-foreground",
                            children:
                              "Connect with verified immigration experts for personalized guidance",
                          }),
                        ],
                      }),
                      (0, n.jsxs)("div", {
                        className: "flex gap-4",
                        children: [
                          (0, n.jsxs)(h.l6, {
                            children: [
                              (0, n.jsx)(h.bq, {
                                className: "w-[180px]",
                                children: (0, n.jsx)(h.yv, {
                                  placeholder: "Specialization",
                                }),
                              }),
                              (0, n.jsxs)(h.gC, {
                                children: [
                                  (0, n.jsx)(h.eb, {
                                    value: "law",
                                    children: "Immigration Law",
                                  }),
                                  (0, n.jsx)(h.eb, {
                                    value: "visa",
                                    children: "Visa Processing",
                                  }),
                                  (0, n.jsx)(h.eb, {
                                    value: "business",
                                    children: "Business Immigration",
                                  }),
                                ],
                              }),
                            ],
                          }),
                          (0, n.jsx)(x.p, {
                            placeholder: "Search experts...",
                            className: "w-[200px]",
                          }),
                        ],
                      }),
                    ],
                  }),
                  (0, n.jsx)("div", {
                    className: "grid md:grid-cols-2 gap-6",
                    children: y.map((e) =>
                      (0, n.jsx)(
                        m.Zp,
                        {
                          className: "p-6",
                          children: (0, n.jsxs)("div", {
                            className: "flex gap-4",
                            children: [
                              (0, n.jsx)(u.eu, {
                                className: "h-16 w-16",
                                children: (0, n.jsx)(d.default, {
                                  src: e.image,
                                  alt: e.name,
                                  width: 64,
                                  height: 64,
                                  className: "rounded-full",
                                }),
                              }),
                              (0, n.jsxs)("div", {
                                className: "flex-1",
                                children: [
                                  (0, n.jsxs)("div", {
                                    className:
                                      "flex justify-between items-start",
                                    children: [
                                      (0, n.jsxs)("div", {
                                        children: [
                                          (0, n.jsx)("h3", {
                                            className: "font-semibold text-lg",
                                            children: e.name,
                                          }),
                                          (0, n.jsx)("p", {
                                            className:
                                              "text-sm text-muted-foreground",
                                            children: e.specialization,
                                          }),
                                        ],
                                      }),
                                      (0, n.jsxs)("div", {
                                        className: "flex items-center",
                                        children: [
                                          (0, n.jsx)(a.A, {
                                            className:
                                              "w-4 h-4 text-yellow-400 fill-current",
                                          }),
                                          (0, n.jsxs)("span", {
                                            className:
                                              "ml-1 text-sm font-medium",
                                            children: [
                                              e.rating,
                                              " (",
                                              e.reviews,
                                              ")",
                                            ],
                                          }),
                                        ],
                                      }),
                                    ],
                                  }),
                                  (0, n.jsxs)("div", {
                                    className:
                                      "mt-2 flex items-center text-sm text-muted-foreground",
                                    children: [
                                      (0, n.jsx)(i.A, {
                                        className: "w-4 h-4 mr-1",
                                      }),
                                      e.location,
                                    ],
                                  }),
                                  (0, n.jsxs)("div", {
                                    className:
                                      "mt-4 flex justify-between items-center",
                                    children: [
                                      (0, n.jsxs)("div", {
                                        className: "flex items-center",
                                        children: [
                                          (0, n.jsx)(o.A, {
                                            className: "w-4 h-4 mr-1",
                                          }),
                                          (0, n.jsxs)("span", {
                                            className: "text-sm",
                                            children: [
                                              "Available ",
                                              e.availability.join(", "),
                                            ],
                                          }),
                                        ],
                                      }),
                                      (0, n.jsxs)("span", {
                                        className: "text-sm font-medium",
                                        children: ["$", e.hourlyRate, "/hour"],
                                      }),
                                    ],
                                  }),
                                  (0, n.jsxs)("div", {
                                    className: "mt-4 flex gap-2",
                                    children: [
                                      (0, n.jsx)(p.$, {
                                        variant: "outline",
                                        className: "flex-1",
                                        onClick: () => t(e.id),
                                        children: "View Profile",
                                      }),
                                      (0, n.jsxs)(p.$, {
                                        className: "flex-1",
                                        children: [
                                          (0, n.jsx)(l.A, {
                                            className: "w-4 h-4 mr-2",
                                          }),
                                          "Book Consultation",
                                        ],
                                      }),
                                    ],
                                  }),
                                ],
                              }),
                            ],
                          }),
                        },
                        e.id,
                      ),
                    ),
                  }),
                  e &&
                    (0, n.jsx)("div", {
                      className:
                        "fixed inset-0 bg-background/80 backdrop-blur-sm",
                      children: (0, n.jsxs)("div", {
                        className:
                          "fixed inset-y-0 right-0 w-full max-w-md border-l bg-background p-6 shadow-lg",
                        children: [
                          (0, n.jsx)("h2", {
                            className: "text-2xl font-bold mb-4",
                            children: "Book Consultation",
                          }),
                          (0, n.jsxs)("div", {
                            className: "space-y-4",
                            children: [
                              (0, n.jsx)(f.V, {
                                mode: "single",
                                selected: r,
                                onSelect: s,
                                className: "rounded-md border",
                              }),
                              (0, n.jsxs)(h.l6, {
                                children: [
                                  (0, n.jsx)(h.bq, {
                                    children: (0, n.jsx)(h.yv, {
                                      placeholder: "Select time slot",
                                    }),
                                  }),
                                  (0, n.jsxs)(h.gC, {
                                    children: [
                                      (0, n.jsx)(h.eb, {
                                        value: "9",
                                        children: "9:00 AM",
                                      }),
                                      (0, n.jsx)(h.eb, {
                                        value: "10",
                                        children: "10:00 AM",
                                      }),
                                      (0, n.jsx)(h.eb, {
                                        value: "11",
                                        children: "11:00 AM",
                                      }),
                                    ],
                                  }),
                                ],
                              }),
                              (0, n.jsx)(p.$, {
                                className: "w-full",
                                children: "Confirm Booking",
                              }),
                            ],
                          }),
                        ],
                      }),
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
      17764: (e, t, r) => {
        "use strict";
        e.exports = r(42001);
      },
      18047: (e, t, r) => {
        "use strict";
        r.d(t, { A: () => i, q: () => a });
        var s = r(84205),
          n = r(61268);
        function a(e, t) {
          let r = s.createContext(t),
            a = (e) => {
              let { children: t, ...a } = e,
                i = s.useMemo(() => a, Object.values(a));
              return (0, n.jsx)(r.Provider, { value: i, children: t });
            };
          return (
            (a.displayName = e + "Provider"),
            [
              a,
              function (n) {
                let a = s.useContext(r);
                if (a) return a;
                if (void 0 !== t) return t;
                throw Error(`\`${n}\` must be used within \`${e}\``);
              },
            ]
          );
        }
        function i(e, t = []) {
          let r = [],
            a = () => {
              let t = r.map((e) => s.createContext(e));
              return function (r) {
                let n = r?.[e] || t;
                return s.useMemo(
                  () => ({ [`__scope${e}`]: { ...r, [e]: n } }),
                  [r, n],
                );
              };
            };
          return (
            (a.scopeName = e),
            [
              function (t, a) {
                let i = s.createContext(a),
                  o = r.length;
                r = [...r, a];
                let l = (t) => {
                  let { scope: r, children: a, ...l } = t,
                    d = r?.[e]?.[o] || i,
                    c = s.useMemo(() => l, Object.values(l));
                  return (0, n.jsx)(d.Provider, { value: c, children: a });
                };
                return (
                  (l.displayName = t + "Provider"),
                  [
                    l,
                    function (r, n) {
                      let l = n?.[e]?.[o] || i,
                        d = s.useContext(l);
                      if (d) return d;
                      if (void 0 !== a) return a;
                      throw Error(`\`${r}\` must be used within \`${t}\``);
                    },
                  ]
                );
              },
              (function (...e) {
                let t = e[0];
                if (1 === e.length) return t;
                let r = () => {
                  let r = e.map((e) => ({
                    useScope: e(),
                    scopeName: e.scopeName,
                  }));
                  return function (e) {
                    let n = r.reduce((t, { useScope: r, scopeName: s }) => {
                      let n = r(e)[`__scope${s}`];
                      return { ...t, ...n };
                    }, {});
                    return s.useMemo(
                      () => ({ [`__scope${t.scopeName}`]: n }),
                      [n],
                    );
                  };
                };
                return (r.scopeName = t.scopeName), r;
              })(a, ...t),
            ]
          );
        }
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
      23734: (e, t, r) => {
        "use strict";
        r.a(e, async (e, s) => {
          try {
            r.d(t, { BK: () => p, eu: () => u, q5: () => f });
            var n = r(61268),
              a = r(13315),
              i = r(91635),
              o = r(84205),
              l = r(15942),
              d = e([l]);
            l = (d.then ? (await d)() : d)[0];
            let c = (0, i.F)(
                "relative flex shrink-0 overflow-hidden rounded-full",
                {
                  variants: {
                    size: { sm: "h-8 w-8", md: "h-10 w-10", lg: "h-12 w-12" },
                  },
                  defaultVariants: { size: "md" },
                },
              ),
              u = o.forwardRef(({ className: e, size: t, ...r }, s) =>
                (0, n.jsx)(a.bL, {
                  ref: s,
                  className: (0, l.cn)(c({ size: t }), e),
                  ...r,
                }),
              );
            u.displayName = a.bL.displayName;
            let p = o.forwardRef(({ className: e, ...t }, r) =>
              (0, n.jsx)(a._V, {
                ref: r,
                className: (0, l.cn)("aspect-square h-full w-full", e),
                ...t,
              }),
            );
            p.displayName = a._V.displayName;
            let f = o.forwardRef(({ className: e, ...t }, r) =>
              (0, n.jsx)(a.H4, {
                ref: r,
                className: (0, l.cn)(
                  "flex h-full w-full items-center justify-center rounded-full bg-muted",
                  e,
                ),
                ...t,
              }),
            );
            (f.displayName = a.H4.displayName), s();
          } catch (e) {
            s(e);
          }
        });
      },
      24619: (e, t, r) => {
        "use strict";
        let s;
        r.r(t),
          r.d(t, {
            default: () => f,
            generateImageMetadata: () => u,
            generateMetadata: () => c,
            generateViewport: () => p,
          });
        var n = r(63033),
          a = r(26394),
          i = r(60442),
          o = (0, a.registerClientReference)(
            function () {
              throw Error(
                "Attempted to call the default export of \"E:\\\\downloads\\\\Hijraah\\\\apps\\\\web\\\\src\\\\app\\\\(marketing)\\\\experts\\\\page.tsx\" from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
              );
            },
            "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\(marketing)\\experts\\page.tsx",
            "default",
          );
        let l = { ...n },
          d =
            "workUnitAsyncStorage" in l
              ? l.workUnitAsyncStorage
              : "requestAsyncStorage" in l
                ? l.requestAsyncStorage
                : void 0;
        s =
          "function" == typeof o
            ? new Proxy(o, {
                apply: (e, t, r) => {
                  let s, n, a;
                  try {
                    let e = d?.getStore();
                    (s = e?.headers.get("sentry-trace") ?? void 0),
                      (n = e?.headers.get("baggage") ?? void 0),
                      (a = e?.headers);
                  } catch (e) {}
                  return i
                    .wrapServerComponentWithSentry(e, {
                      componentRoute: "/(marketing)/experts",
                      componentType: "Page",
                      sentryTraceHeader: s,
                      baggageHeader: n,
                      headers: a,
                    })
                    .apply(t, r);
                },
              })
            : o;
        let c = void 0,
          u = void 0,
          p = void 0,
          f = s;
      },
      27011: (e, t, r) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          Object.defineProperty(t, "useMergedRef", {
            enumerable: !0,
            get: function () {
              return n;
            },
          });
        let s = r(84205);
        function n(e, t) {
          let r = (0, s.useRef)(null),
            n = (0, s.useRef)(null);
          return (0, s.useCallback)(
            (s) => {
              if (null === s) {
                let e = r.current;
                e && ((r.current = null), e());
                let t = n.current;
                t && ((n.current = null), t());
              } else e && (r.current = a(e, s)), t && (n.current = a(t, s));
            },
            [e, t],
          );
        }
        function a(e, t) {
          if ("function" != typeof e)
            return (
              (e.current = t),
              () => {
                e.current = null;
              }
            );
          {
            let r = e(t);
            return "function" == typeof r ? r : () => e(null);
          }
        }
        ("function" == typeof t.default ||
          ("object" == typeof t.default && null !== t.default)) &&
          void 0 === t.default.__esModule &&
          (Object.defineProperty(t.default, "__esModule", { value: !0 }),
          Object.assign(t.default, t),
          (e.exports = t.default));
      },
      28354: (e) => {
        "use strict";
        e.exports = require("util");
      },
      28777: (e, t, r) => {
        "use strict";
        function s(e, t, { checkForDefaultPrevented: r = !0 } = {}) {
          return function (s) {
            if ((e?.(s), !1 === r || !s.defaultPrevented)) return t?.(s);
          };
        }
        r.d(t, { m: () => s });
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
      36789: (e, t, r) => {
        "use strict";
        r.d(t, { A: () => s });
        let s = (0, r(95255).A)("Clock", [
          ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
          ["polyline", { points: "12 6 12 12 16 14", key: "68esgv" }],
        ]);
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
      42001: (e, t, r) => {
        "use strict";
        var s = r(84205),
          n =
            "function" == typeof Object.is
              ? Object.is
              : function (e, t) {
                  return (
                    (e === t && (0 !== e || 1 / e == 1 / t)) ||
                    (e != e && t != t)
                  );
                },
          a = s.useState,
          i = s.useEffect,
          o = s.useLayoutEffect,
          l = s.useDebugValue;
        function d(e) {
          var t = e.getSnapshot;
          e = e.value;
          try {
            var r = t();
            return !n(e, r);
          } catch (e) {
            return !0;
          }
        }
        var c =
          "undefined" == typeof window ||
          void 0 === window.document ||
          void 0 === window.document.createElement
            ? function (e, t) {
                return t();
              }
            : function (e, t) {
                var r = t(),
                  s = a({ inst: { value: r, getSnapshot: t } }),
                  n = s[0].inst,
                  c = s[1];
                return (
                  o(
                    function () {
                      (n.value = r),
                        (n.getSnapshot = t),
                        d(n) && c({ inst: n });
                    },
                    [e, r, t],
                  ),
                  i(
                    function () {
                      return (
                        d(n) && c({ inst: n }),
                        e(function () {
                          d(n) && c({ inst: n });
                        })
                      );
                    },
                    [e],
                  ),
                  l(r),
                  r
                );
              };
        t.useSyncExternalStore =
          void 0 !== s.useSyncExternalStore ? s.useSyncExternalStore : c;
      },
      44708: (e) => {
        "use strict";
        e.exports = require("node:https");
      },
      45560: (e, t, r) => {
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
                  "(marketing)",
                  {
                    children: [
                      "experts",
                      {
                        children: [
                          "__PAGE__",
                          {},
                          {
                            page: [
                              () => Promise.resolve().then(r.bind(r, 24619)),
                              "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\(marketing)\\experts\\page.tsx",
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
          d = [
            "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\(marketing)\\experts\\page.tsx",
          ],
          c = { require: r, loadChunk: () => Promise.resolve() },
          u = new s.AppPageRouteModule({
            definition: {
              kind: n.RouteKind.APP_PAGE,
              page: "/(marketing)/experts/page",
              pathname: "/experts",
              bundlePath: "",
              filename: "",
              appPaths: [],
            },
            userland: { loaderTree: l },
          });
      },
      47832: (e, t, r) => {
        Promise.resolve().then(r.bind(r, 24619));
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
      57560: (e, t, r) => {
        Promise.resolve().then(r.bind(r, 17117));
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
      63961: (e, t, r) => {
        "use strict";
        r.d(t, { TL: () => i });
        var s = r(84205),
          n = r(71604),
          a = r(61268);
        function i(e) {
          let t = (function (e) {
              let t = s.forwardRef((e, t) => {
                let { children: r, ...a } = e;
                if (s.isValidElement(r)) {
                  var i;
                  let e,
                    o,
                    l =
                      ((i = r),
                      (o =
                        (e = Object.getOwnPropertyDescriptor(
                          i.props,
                          "ref",
                        )?.get) &&
                        "isReactWarning" in e &&
                        e.isReactWarning)
                        ? i.ref
                        : (o =
                              (e = Object.getOwnPropertyDescriptor(
                                i,
                                "ref",
                              )?.get) &&
                              "isReactWarning" in e &&
                              e.isReactWarning)
                          ? i.props.ref
                          : i.props.ref || i.ref),
                    d = (function (e, t) {
                      let r = { ...t };
                      for (let s in t) {
                        let n = e[s],
                          a = t[s];
                        /^on[A-Z]/.test(s)
                          ? n && a
                            ? (r[s] = (...e) => {
                                let t = a(...e);
                                return n(...e), t;
                              })
                            : n && (r[s] = n)
                          : "style" === s
                            ? (r[s] = { ...n, ...a })
                            : "className" === s &&
                              (r[s] = [n, a].filter(Boolean).join(" "));
                      }
                      return { ...e, ...r };
                    })(a, r.props);
                  return (
                    r.type !== s.Fragment && (d.ref = t ? (0, n.t)(t, l) : l),
                    s.cloneElement(r, d)
                  );
                }
                return s.Children.count(r) > 1 ? s.Children.only(null) : null;
              });
              return (t.displayName = `${e}.SlotClone`), t;
            })(e),
            r = s.forwardRef((e, r) => {
              let { children: n, ...i } = e,
                o = s.Children.toArray(n),
                d = o.find(l);
              if (d) {
                let e = d.props.children,
                  n = o.map((t) =>
                    t !== d
                      ? t
                      : s.Children.count(e) > 1
                        ? s.Children.only(null)
                        : s.isValidElement(e)
                          ? e.props.children
                          : null,
                  );
                return (0, a.jsx)(t, {
                  ...i,
                  ref: r,
                  children: s.isValidElement(e)
                    ? s.cloneElement(e, void 0, n)
                    : null,
                });
              }
              return (0, a.jsx)(t, { ...i, ref: r, children: n });
            });
          return (r.displayName = `${e}.Slot`), r;
        }
        var o = Symbol("radix.slottable");
        function l(e) {
          return (
            s.isValidElement(e) &&
            "function" == typeof e.type &&
            "__radixId" in e.type &&
            e.type.__radixId === o
          );
        }
      },
      66130: (e, t, r) => {
        "use strict";
        r.d(t, { N: () => n });
        var s = r(84205),
          n = globalThis?.document ? s.useLayoutEffect : () => {};
      },
      70753: (e, t, r) => {
        "use strict";
        r.d(t, { A: () => s });
        let s = (0, r(95255).A)("ChevronDown", [
          ["path", { d: "m6 9 6 6 6-6", key: "qrunsl" }],
        ]);
      },
      71507: (e, t, r) => {
        "use strict";
        r.d(t, { default: () => n.a });
        var s = r(82860),
          n = r.n(s);
      },
      71604: (e, t, r) => {
        "use strict";
        r.d(t, { s: () => i, t: () => a });
        var s = r(84205);
        function n(e, t) {
          if ("function" == typeof e) return e(t);
          null != e && (e.current = t);
        }
        function a(...e) {
          return (t) => {
            let r = !1,
              s = e.map((e) => {
                let s = n(e, t);
                return r || "function" != typeof s || (r = !0), s;
              });
            if (r)
              return () => {
                for (let t = 0; t < s.length; t++) {
                  let r = s[t];
                  "function" == typeof r ? r() : n(e[t], null);
                }
              };
          };
        }
        function i(...e) {
          return s.useCallback(a(...e), e);
        }
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
            r.d(t, { p: () => o });
            var n = r(61268);
            r(84205);
            var a = r(15942),
              i = e([a]);
            function o({ className: e, type: t, ...r }) {
              return (0, n.jsx)("input", {
                type: t,
                "data-slot": "input",
                className: (0, a.cn)(
                  "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
                  "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
                  "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
                  e,
                ),
                ...r,
              });
            }
            (a = (i.then ? (await i)() : i)[0]), s();
          } catch (e) {
            s(e);
          }
        });
      },
      78593: (e, t, r) => {
        "use strict";
        r.d(t, { hO: () => l, sG: () => o });
        var s = r(84205),
          n = r(90304),
          a = r(63961),
          i = r(61268),
          o = [
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
            let r = (0, a.TL)(`Primitive.${t}`),
              n = s.forwardRef((e, s) => {
                let { asChild: n, ...a } = e;
                return (
                  "undefined" != typeof window &&
                    (window[Symbol.for("radix-ui")] = !0),
                  (0, i.jsx)(n ? r : t, { ...a, ref: s })
                );
              });
            return (n.displayName = `Primitive.${t}`), { ...e, [t]: n };
          }, {});
        function l(e, t) {
          e && n.flushSync(() => e.dispatchEvent(t));
        }
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
      82860: (e, t, r) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          !(function (e, t) {
            for (var r in t)
              Object.defineProperty(e, r, { enumerable: !0, get: t[r] });
          })(t, {
            default: function () {
              return l;
            },
            getImageProps: function () {
              return o;
            },
          });
        let s = r(17380),
          n = r(92566),
          a = r(37018),
          i = s._(r(29576));
        function o(e) {
          let { props: t } = (0, n.getImgProps)(e, {
            defaultLoader: i.default,
            imgConf: {
              deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
              imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
              path: "/_next/image",
              loader: "default",
              dangerouslyAllowSVG: !1,
              unoptimized: !1,
            },
          });
          for (let [e, r] of Object.entries(t)) void 0 === r && delete t[e];
          return { props: t };
        }
        let l = a.Image;
      },
      83997: (e) => {
        "use strict";
        e.exports = require("tty");
      },
      84063: (e, t, r) => {
        "use strict";
        r.d(t, { V: () => n });
        var s = r(61268);
        r(84205);
        let n = ({
          mode: e = "single",
          selected: t,
          onSelect: r,
          className: n,
        }) => (0, s.jsx)("div", { className: n });
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
      86951: (e, t, r) => {
        "use strict";
        r.d(t, { A: () => s });
        let s = (0, r(95255).A)("Star", [
          [
            "polygon",
            {
              points:
                "12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2",
              key: "8f66p6",
            },
          ],
        ]);
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
              eb: () => x,
              gC: () => m,
              l6: () => u,
              yv: () => p,
            });
            var n = r(61268),
              a = r(81242),
              i = r(70753),
              o = r(415),
              l = r(84205),
              d = r(15942),
              c = e([d]);
            d = (c.then ? (await c)() : c)[0];
            let u = a.bL;
            a.YJ;
            let p = a.WT,
              f = l.forwardRef(({ className: e, children: t, ...r }, s) =>
                (0, n.jsxs)(a.l9, {
                  ref: s,
                  className: (0, d.cn)(
                    "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                    e,
                  ),
                  ...r,
                  children: [
                    t,
                    (0, n.jsx)(a.In, {
                      asChild: !0,
                      children: (0, n.jsx)(i.A, {
                        className: "h-4 w-4 opacity-50",
                      }),
                    }),
                  ],
                }),
              );
            f.displayName = a.l9.displayName;
            let m = l.forwardRef(
              (
                { className: e, children: t, position: r = "popper", ...s },
                i,
              ) =>
                (0, n.jsx)(a.ZL, {
                  children: (0, n.jsx)(a.UC, {
                    ref: i,
                    className: (0, d.cn)(
                      "relative z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
                      "popper" === r &&
                        "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
                      e,
                    ),
                    position: r,
                    ...s,
                    children: (0, n.jsx)(a.LM, {
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
            (m.displayName = a.UC.displayName),
              (l.forwardRef(({ className: e, ...t }, r) =>
                (0, n.jsx)(a.JU, {
                  ref: r,
                  className: (0, d.cn)(
                    "py-1.5 pl-8 pr-2 text-sm font-semibold",
                    e,
                  ),
                  ...t,
                }),
              ).displayName = a.JU.displayName);
            let x = l.forwardRef(({ className: e, children: t, ...r }, s) =>
              (0, n.jsxs)(a.q7, {
                ref: s,
                className: (0, d.cn)(
                  "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
                  e,
                ),
                ...r,
                children: [
                  (0, n.jsx)("span", {
                    className:
                      "absolute left-2 flex h-3.5 w-3.5 items-center justify-center",
                    children: (0, n.jsx)(a.VF, {
                      children: (0, n.jsx)(o.A, { className: "h-4 w-4" }),
                    }),
                  }),
                  (0, n.jsx)(a.p4, { children: t }),
                ],
              }),
            );
            (x.displayName = a.q7.displayName),
              (l.forwardRef(({ className: e, ...t }, r) =>
                (0, n.jsx)(a.wv, {
                  ref: r,
                  className: (0, d.cn)("-mx-1 my-1 h-px bg-muted", e),
                  ...t,
                }),
              ).displayName = a.wv.displayName),
              s();
          } catch (e) {
            s(e);
          }
        });
      },
    });
  var t = require("../../../webpack-runtime.js");
  t.C(e);
  var r = (e) => t((t.s = e)),
    s = t.X(
      0,
      [827, 6518, 2033, 4027, 5728, 9729, 3390, 7018, 6867, 4630],
      () => r(45560),
    );
  module.exports = s;
})();
//# sourceMappingURL=page.js.map
