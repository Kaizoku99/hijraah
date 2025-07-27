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
    (e._sentryDebugIds[t] = "6d851744-c7a2-4771-8b26-21fa3f63474d"),
    (e._sentryDebugIdIdentifier =
      "sentry-dbid-6d851744-c7a2-4771-8b26-21fa3f63474d"));
} catch (e) {}
(() => {
  var e = {};
  (e.id = 3790),
    (e.ids = [3790]),
    (e.modules = {
      3295: (e) => {
        "use strict";
        e.exports = require("next/dist/server/app-render/after-task-async-storage.external.js");
      },
      5416: (e, t, r) => {
        Promise.resolve().then(r.bind(r, 20919));
      },
      6934: () => {},
      7839: (e, t, r) => {
        "use strict";
        r.d(t, { jH: () => i });
        var s = r(84205);
        r(61268);
        var a = s.createContext(void 0);
        function i(e) {
          let t = s.useContext(a);
          return e || t || "ltr";
        }
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
      15127: (e, t, r) => {
        "use strict";
        r.d(t, { A: () => s });
        let s = (0, r(95255).A)("Plus", [
          ["path", { d: "M5 12h14", key: "1ays0h" }],
          ["path", { d: "M12 5v14", key: "s699le" }],
        ]);
      },
      15668: (e) => {
        function t(e) {
          var t = Error("Cannot find module '" + e + "'");
          throw ((t.code = "MODULE_NOT_FOUND"), t);
        }
        (t.keys = () => []), (t.resolve = t), (t.id = 15668), (e.exports = t);
      },
      18568: (e, t, r) => {
        Promise.resolve().then(r.bind(r, 20821));
      },
      19121: (e) => {
        "use strict";
        e.exports = require("next/dist/server/app-render/action-async-storage.external.js");
      },
      19771: (e) => {
        "use strict";
        e.exports = require("process");
      },
      20821: (e, t, r) => {
        "use strict";
        let s;
        r.r(t),
          r.d(t, {
            default: () => f,
            generateImageMetadata: () => u,
            generateMetadata: () => l,
            generateViewport: () => p,
          });
        var a = r(63033),
          i = r(26394),
          o = r(60442),
          n = (0, i.registerClientReference)(
            function () {
              throw Error(
                "Attempted to call the default export of \"E:\\\\downloads\\\\Hijraah\\\\apps\\\\web\\\\src\\\\app\\\\(authenticated)\\\\documents\\\\page.tsx\" from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
              );
            },
            "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\(authenticated)\\documents\\page.tsx",
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
                      componentRoute: "/(authenticated)/documents",
                      componentType: "Page",
                      sentryTraceHeader: s,
                      baggageHeader: a,
                      headers: i,
                    })
                    .apply(t, r);
                },
              })
            : n;
        let l = void 0,
          u = void 0,
          p = void 0,
          f = s;
      },
      20919: (e, t, r) => {
        "use strict";
        r.a(e, async (e, s) => {
          try {
            r.r(t), r.d(t, { default: () => y });
            var a = r(61268),
              i = r(15127),
              o = r(44803),
              n = r(99358),
              d = r(82122),
              c = r(99793),
              l = r(31655),
              u = r.n(l),
              p = r(84205),
              f = r(65299),
              h = r(87826),
              m = r(28909),
              x = r(94812),
              v = r(77001),
              g = e([h, m, x, v]);
            function b() {
              return (0, a.jsxs)("div", {
                className: "space-y-4",
                children: [
                  (0, a.jsxs)("div", {
                    className: "flex items-center justify-between",
                    children: [
                      (0, a.jsx)(x.E, { className: "h-8 w-48" }),
                      (0, a.jsx)(x.E, { className: "h-10 w-32" }),
                    ],
                  }),
                  (0, a.jsx)(x.E, { className: "h-12 w-full" }),
                  (0, a.jsx)("div", {
                    className:
                      "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4",
                    children: Array(6)
                      .fill(0)
                      .map((e, t) =>
                        (0, a.jsx)(
                          x.E,
                          { className: "h-52 w-full rounded-md" },
                          t,
                        ),
                      ),
                  }),
                ],
              });
            }
            function y() {
              return (0, a.jsxs)("div", {
                className: "container py-8",
                children: [
                  (0, a.jsxs)("div", {
                    className: "mb-8 flex items-center justify-between",
                    children: [
                      (0, a.jsxs)("div", {
                        children: [
                          (0, a.jsx)("h1", {
                            className: "text-3xl font-bold",
                            children: "Your Documents",
                          }),
                          (0, a.jsx)("p", {
                            className: "text-muted-foreground",
                            children:
                              "Manage and organize your immigration related documents.",
                          }),
                        ],
                      }),
                      (0, a.jsxs)("div", {
                        className: "flex gap-2",
                        children: [
                          (0, a.jsx)(m.$, {
                            asChild: !0,
                            children: (0, a.jsxs)(u(), {
                              href: "/documents/create",
                              legacyBehavior: !0,
                              children: [
                                (0, a.jsx)(i.A, { className: "mr-2 h-4 w-4" }),
                                " Create Document",
                              ],
                            }),
                          }),
                          (0, a.jsx)(m.$, {
                            asChild: !0,
                            variant: "outline",
                            children: (0, a.jsxs)(u(), {
                              href: "/documents/search",
                              legacyBehavior: !0,
                              children: [
                                (0, a.jsx)(o.A, { className: "mr-2 h-4 w-4" }),
                                " Semantic Search",
                              ],
                            }),
                          }),
                          (0, a.jsx)(m.$, {
                            asChild: !0,
                            variant: "outline",
                            children: (0, a.jsxs)(u(), {
                              href: "/documents/scrape",
                              legacyBehavior: !0,
                              children: [
                                (0, a.jsx)(n.A, { className: "mr-2 h-4 w-4" }),
                                " Scrape Website",
                              ],
                            }),
                          }),
                          (0, a.jsx)(m.$, {
                            asChild: !0,
                            variant: "ghost",
                            children: (0, a.jsxs)(u(), {
                              href: "/admin/scraping-sources",
                              legacyBehavior: !0,
                              children: [
                                (0, a.jsx)(d.A, { className: "mr-2 h-4 w-4" }),
                                " Manage Sources",
                              ],
                            }),
                          }),
                        ],
                      }),
                    ],
                  }),
                  (0, a.jsxs)(v.Tabs, {
                    defaultValue: "ai-generated",
                    className: "w-full",
                    children: [
                      (0, a.jsxs)(v.TabsList, {
                        className: "mb-4",
                        children: [
                          (0, a.jsx)(v.TabsTrigger, {
                            value: "ai-generated",
                            children: "AI-Generated Documents",
                          }),
                          (0, a.jsx)(v.TabsTrigger, {
                            value: "scraped",
                            children: "Website Scrapes",
                          }),
                          (0, a.jsx)(v.TabsTrigger, {
                            value: "uploaded",
                            children: "Uploaded Documents",
                          }),
                        ],
                      }),
                      (0, a.jsxs)(v.TabsContent, {
                        value: "ai-generated",
                        className: "space-y-4",
                        children: [
                          (0, a.jsxs)("div", {
                            className: "mb-4 flex items-center gap-2",
                            children: [
                              (0, a.jsx)(c.A, {
                                className: "h-5 w-5 text-muted-foreground",
                              }),
                              (0, a.jsx)("p", {
                                className: "text-sm text-muted-foreground",
                                children:
                                  "These documents are generated with AI assistance based on your inputs.",
                              }),
                            ],
                          }),
                          (0, a.jsx)(h.k, {
                            children: (0, a.jsx)(p.Suspense, {
                              fallback: (0, a.jsx)(b, {}),
                              children: (0, a.jsx)(f.g, {}),
                            }),
                          }),
                        ],
                      }),
                      (0, a.jsxs)(v.TabsContent, {
                        value: "scraped",
                        className: "space-y-4",
                        children: [
                          (0, a.jsxs)("div", {
                            className: "mb-4 flex items-center gap-2",
                            children: [
                              (0, a.jsx)(n.A, {
                                className: "h-5 w-5 text-muted-foreground",
                              }),
                              (0, a.jsx)("p", {
                                className: "text-sm text-muted-foreground",
                                children:
                                  "Documents created from web content using the scraper tool.",
                              }),
                            ],
                          }),
                          (0, a.jsx)(h.k, {
                            children: (0, a.jsx)(p.Suspense, {
                              fallback: (0, a.jsx)(b, {}),
                              children: (0, a.jsx)(f.g, {}),
                            }),
                          }),
                        ],
                      }),
                      (0, a.jsx)(v.TabsContent, {
                        value: "uploaded",
                        className: "space-y-4",
                        children: (0, a.jsxs)("div", {
                          className: "bg-muted/50 p-12 rounded-md text-center",
                          children: [
                            (0, a.jsx)("h3", {
                              className: "text-lg font-medium mb-2",
                              children: "Document Upload Feature",
                            }),
                            (0, a.jsx)("p", {
                              className: "text-muted-foreground mb-4",
                              children:
                                "This feature is coming soon. You will be able to upload and process documents with AI.",
                            }),
                          ],
                        }),
                      }),
                    ],
                  }),
                ],
              });
            }
            ([h, m, x, v] = g.then ? (await g)() : g), s();
          } catch (e) {
            s(e);
          }
        });
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
        r.d(t, { B8: () => E, UC: () => T, bL: () => q, l9: () => S });
        var s = r(84205),
          a = r(28777),
          i = r(18047),
          o = r(59150),
          n = r(94653),
          d = r(78593),
          c = r(7839),
          l = r(48705),
          u = r(42414),
          p = r(61268),
          f = "Tabs",
          [h, m] = (0, i.A)(f, [o.RG]),
          x = (0, o.RG)(),
          [v, g] = h(f),
          b = s.forwardRef((e, t) => {
            let {
                __scopeTabs: r,
                value: s,
                onValueChange: a,
                defaultValue: i,
                orientation: o = "horizontal",
                dir: n,
                activationMode: h = "automatic",
                ...m
              } = e,
              x = (0, c.jH)(n),
              [g, b] = (0, l.i)({
                prop: s,
                onChange: a,
                defaultProp: i ?? "",
                caller: f,
              });
            return (0, p.jsx)(v, {
              scope: r,
              baseId: (0, u.B)(),
              value: g,
              onValueChange: b,
              orientation: o,
              dir: x,
              activationMode: h,
              children: (0, p.jsx)(d.sG.div, {
                dir: x,
                "data-orientation": o,
                ...m,
                ref: t,
              }),
            });
          });
        b.displayName = f;
        var y = "TabsList",
          w = s.forwardRef((e, t) => {
            let { __scopeTabs: r, loop: s = !0, ...a } = e,
              i = g(y, r),
              n = x(r);
            return (0, p.jsx)(o.bL, {
              asChild: !0,
              ...n,
              orientation: i.orientation,
              dir: i.dir,
              loop: s,
              children: (0, p.jsx)(d.sG.div, {
                role: "tablist",
                "aria-orientation": i.orientation,
                ...a,
                ref: t,
              }),
            });
          });
        w.displayName = y;
        var j = "TabsTrigger",
          N = s.forwardRef((e, t) => {
            let { __scopeTabs: r, value: s, disabled: i = !1, ...n } = e,
              c = g(j, r),
              l = x(r),
              u = _(c.baseId, s),
              f = C(c.baseId, s),
              h = s === c.value;
            return (0, p.jsx)(o.q7, {
              asChild: !0,
              ...l,
              focusable: !i,
              active: h,
              children: (0, p.jsx)(d.sG.button, {
                type: "button",
                role: "tab",
                "aria-selected": h,
                "aria-controls": f,
                "data-state": h ? "active" : "inactive",
                "data-disabled": i ? "" : void 0,
                disabled: i,
                id: u,
                ...n,
                ref: t,
                onMouseDown: (0, a.m)(e.onMouseDown, (e) => {
                  i || 0 !== e.button || !1 !== e.ctrlKey
                    ? e.preventDefault()
                    : c.onValueChange(s);
                }),
                onKeyDown: (0, a.m)(e.onKeyDown, (e) => {
                  [" ", "Enter"].includes(e.key) && c.onValueChange(s);
                }),
                onFocus: (0, a.m)(e.onFocus, () => {
                  let e = "manual" !== c.activationMode;
                  h || i || !e || c.onValueChange(s);
                }),
              }),
            });
          });
        N.displayName = j;
        var A = "TabsContent",
          k = s.forwardRef((e, t) => {
            let {
                __scopeTabs: r,
                value: a,
                forceMount: i,
                children: o,
                ...c
              } = e,
              l = g(A, r),
              u = _(l.baseId, a),
              f = C(l.baseId, a),
              h = a === l.value,
              m = s.useRef(h);
            return (
              s.useEffect(() => {
                let e = requestAnimationFrame(() => (m.current = !1));
                return () => cancelAnimationFrame(e);
              }, []),
              (0, p.jsx)(n.C, {
                present: i || h,
                children: ({ present: r }) =>
                  (0, p.jsx)(d.sG.div, {
                    "data-state": h ? "active" : "inactive",
                    "data-orientation": l.orientation,
                    role: "tabpanel",
                    "aria-labelledby": u,
                    hidden: !r,
                    id: f,
                    tabIndex: 0,
                    ...c,
                    ref: t,
                    style: {
                      ...e.style,
                      animationDuration: m.current ? "0s" : void 0,
                    },
                    children: r && o,
                  }),
              })
            );
          });
        function _(e, t) {
          return `${e}-trigger-${t}`;
        }
        function C(e, t) {
          return `${e}-content-${t}`;
        }
        k.displayName = A;
        var q = b,
          E = w,
          S = N,
          T = k;
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
        r.d(t, { AG: () => v, Iw: () => m, UU: () => x });
        var a = r(97713),
          i = r(15149),
          o = r.n(i),
          n = r(84205);
        let { fetch: d } = o()(),
          c = "http://localhost:54321",
          l =
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0",
          u = process.env.SUPABASE_SERVICE_ROLE_KEY,
          p = l ? { apikey: l } : void 0;
        function f() {
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
            ((e.fetch = d), (e.__USING_PONYFETCH__ = !0));
        }
        function h() {
          return (f(), s)
            ? s
            : (s = (0, a.createBrowserClient)(c, l, {
                global: { headers: p },
              }));
        }
        function m() {
          return (0, n.useMemo)(h, []);
        }
        function x() {
          return (
            f(), (0, a.createBrowserClient)(c, l, { global: { headers: p } })
          );
        }
        let v = h;
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
      41692: (e) => {
        "use strict";
        e.exports = require("node:tls");
      },
      42414: (e, t, r) => {
        "use strict";
        r.d(t, { B: () => d });
        var s,
          a = r(84205),
          i = r(66130),
          o =
            (s || (s = r.t(a, 2)))[" useId ".trim().toString()] ||
            (() => void 0),
          n = 0;
        function d(e) {
          let [t, r] = a.useState(o());
          return (
            (0, i.N)(() => {
              e || r((e) => e ?? String(n++));
            }, [e]),
            e || (t ? `radix-${t}` : "")
          );
        }
      },
      43886: () => {},
      44708: (e) => {
        "use strict";
        e.exports = require("node:https");
      },
      44803: (e, t, r) => {
        "use strict";
        r.d(t, { A: () => s });
        let s = (0, r(95255).A)("Search", [
          ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }],
          ["path", { d: "m21 21-4.3-4.3", key: "1qie3q" }],
        ]);
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
      59150: (e, t, r) => {
        "use strict";
        r.d(t, { RG: () => w, bL: () => S, q7: () => T });
        var s = r(84205),
          a = r(28777),
          i = r(28029),
          o = r(71604),
          n = r(18047),
          d = r(42414),
          c = r(78593),
          l = r(10308),
          u = r(48705),
          p = r(7839),
          f = r(61268),
          h = "rovingFocusGroup.onEntryFocus",
          m = { bubbles: !1, cancelable: !0 },
          x = "RovingFocusGroup",
          [v, g, b] = (0, i.N)(x),
          [y, w] = (0, n.A)(x, [b]),
          [j, N] = y(x),
          A = s.forwardRef((e, t) =>
            (0, f.jsx)(v.Provider, {
              scope: e.__scopeRovingFocusGroup,
              children: (0, f.jsx)(v.Slot, {
                scope: e.__scopeRovingFocusGroup,
                children: (0, f.jsx)(k, { ...e, ref: t }),
              }),
            }),
          );
        A.displayName = x;
        var k = s.forwardRef((e, t) => {
            let {
                __scopeRovingFocusGroup: r,
                orientation: i,
                loop: n = !1,
                dir: d,
                currentTabStopId: v,
                defaultCurrentTabStopId: b,
                onCurrentTabStopIdChange: y,
                onEntryFocus: w,
                preventScrollOnEntryFocus: N = !1,
                ...A
              } = e,
              k = s.useRef(null),
              _ = (0, o.s)(t, k),
              C = (0, p.jH)(d),
              [q, S] = (0, u.i)({
                prop: v,
                defaultProp: b ?? null,
                onChange: y,
                caller: x,
              }),
              [T, I] = s.useState(!1),
              R = (0, l.c)(w),
              P = g(r),
              M = s.useRef(!1),
              [F, D] = s.useState(0);
            return (
              s.useEffect(() => {
                let e = k.current;
                if (e)
                  return (
                    e.addEventListener(h, R), () => e.removeEventListener(h, R)
                  );
              }, [R]),
              (0, f.jsx)(j, {
                scope: r,
                orientation: i,
                dir: C,
                loop: n,
                currentTabStopId: q,
                onItemFocus: s.useCallback((e) => S(e), [S]),
                onItemShiftTab: s.useCallback(() => I(!0), []),
                onFocusableItemAdd: s.useCallback(() => D((e) => e + 1), []),
                onFocusableItemRemove: s.useCallback(() => D((e) => e - 1), []),
                children: (0, f.jsx)(c.sG.div, {
                  tabIndex: T || 0 === F ? -1 : 0,
                  "data-orientation": i,
                  ...A,
                  ref: _,
                  style: { outline: "none", ...e.style },
                  onMouseDown: (0, a.m)(e.onMouseDown, () => {
                    M.current = !0;
                  }),
                  onFocus: (0, a.m)(e.onFocus, (e) => {
                    let t = !M.current;
                    if (e.target === e.currentTarget && t && !T) {
                      let t = new CustomEvent(h, m);
                      if (
                        (e.currentTarget.dispatchEvent(t), !t.defaultPrevented)
                      ) {
                        let e = P().filter((e) => e.focusable);
                        E(
                          [
                            e.find((e) => e.active),
                            e.find((e) => e.id === q),
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
          _ = "RovingFocusGroupItem",
          C = s.forwardRef((e, t) => {
            let {
                __scopeRovingFocusGroup: r,
                focusable: i = !0,
                active: o = !1,
                tabStopId: n,
                children: l,
                ...u
              } = e,
              p = (0, d.B)(),
              h = n || p,
              m = N(_, r),
              x = m.currentTabStopId === h,
              b = g(r),
              {
                onFocusableItemAdd: y,
                onFocusableItemRemove: w,
                currentTabStopId: j,
              } = m;
            return (
              s.useEffect(() => {
                if (i) return y(), () => w();
              }, [i, y, w]),
              (0, f.jsx)(v.ItemSlot, {
                scope: r,
                id: h,
                focusable: i,
                active: o,
                children: (0, f.jsx)(c.sG.span, {
                  tabIndex: x ? 0 : -1,
                  "data-orientation": m.orientation,
                  ...u,
                  ref: t,
                  onMouseDown: (0, a.m)(e.onMouseDown, (e) => {
                    i ? m.onItemFocus(h) : e.preventDefault();
                  }),
                  onFocus: (0, a.m)(e.onFocus, () => m.onItemFocus(h)),
                  onKeyDown: (0, a.m)(e.onKeyDown, (e) => {
                    if ("Tab" === e.key && e.shiftKey)
                      return void m.onItemShiftTab();
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
                        return q[a];
                    })(e, m.orientation, m.dir);
                    if (void 0 !== t) {
                      if (e.metaKey || e.ctrlKey || e.altKey || e.shiftKey)
                        return;
                      e.preventDefault();
                      let r = b()
                        .filter((e) => e.focusable)
                        .map((e) => e.ref.current);
                      if ("last" === t) r.reverse();
                      else if ("prev" === t || "next" === t) {
                        "prev" === t && r.reverse();
                        let s = r.indexOf(e.currentTarget);
                        r = m.loop
                          ? (function (e, t) {
                              return e.map((r, s) => e[(t + s) % e.length]);
                            })(r, s + 1)
                          : r.slice(s + 1);
                      }
                      setTimeout(() => E(r));
                    }
                  }),
                  children:
                    "function" == typeof l
                      ? l({ isCurrentTabStop: x, hasTabStop: null != j })
                      : l,
                }),
              })
            );
          });
        C.displayName = _;
        var q = {
          ArrowLeft: "prev",
          ArrowUp: "prev",
          ArrowRight: "next",
          ArrowDown: "next",
          PageUp: "first",
          Home: "first",
          PageDown: "last",
          End: "last",
        };
        function E(e, t = !1) {
          let r = document.activeElement;
          for (let s of e)
            if (
              s === r ||
              (s.focus({ preventScroll: t }), document.activeElement !== r)
            )
              return;
        }
        var S = A,
          T = C;
      },
      59570: () => {},
      63033: (e) => {
        "use strict";
        e.exports = require("next/dist/server/app-render/work-unit-async-storage.external.js");
      },
      65299: (e, t, r) => {
        "use strict";
        r.d(t, { g: () => a });
        var s = r(61268);
        r(84205);
        let a = () => (0, s.jsx)("div", {});
      },
      70968: (e, t, r) => {
        "use strict";
        r.r(t),
          r.d(t, {
            GlobalError: () => i.default,
            __next_app__: () => l,
            pages: () => c,
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
                  "(authenticated)",
                  {
                    children: [
                      "documents",
                      {
                        children: [
                          "__PAGE__",
                          {},
                          {
                            page: [
                              () => Promise.resolve().then(r.bind(r, 20821)),
                              "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\(authenticated)\\documents\\page.tsx",
                            ],
                          },
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
            "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\(authenticated)\\documents\\page.tsx",
          ],
          l = { require: r, loadChunk: () => Promise.resolve() },
          u = new s.AppPageRouteModule({
            definition: {
              kind: a.RouteKind.APP_PAGE,
              page: "/(authenticated)/documents/page",
              pathname: "/documents",
              bundlePath: "",
              filename: "",
              appPaths: [],
            },
            userland: { loaderTree: d },
          });
      },
      72967: (e, t, r) => {
        "use strict";
        let s;
        r.r(t),
          r.d(t, {
            default: () => p,
            generateImageMetadata: () => l,
            generateMetadata: () => c,
            generateViewport: () => u,
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
          l = void 0,
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
              Tabs: () => d,
              TabsContent: () => u,
              TabsList: () => c,
              TabsTrigger: () => l,
            });
            var a = r(61268),
              i = r(28366);
            r(84205);
            var o = r(15942),
              n = e([o]);
            function d({ className: e, ...t }) {
              return (0, a.jsx)(i.bL, {
                "data-slot": "tabs",
                className: (0, o.cn)("flex flex-col gap-2", e),
                ...t,
              });
            }
            function c({ className: e, ...t }) {
              return (0, a.jsx)(i.B8, {
                "data-slot": "tabs-list",
                className: (0, o.cn)(
                  "bg-muted text-muted-foreground inline-flex h-9 w-fit items-center justify-center rounded-lg p-[3px]",
                  e,
                ),
                ...t,
              });
            }
            function l({ className: e, ...t }) {
              return (0, a.jsx)(i.l9, {
                "data-slot": "tabs-trigger",
                className: (0, o.cn)(
                  "data-[state=active]:bg-background dark:data-[state=active]:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:outline-ring dark:data-[state=active]:border-input dark:data-[state=active]:bg-input/30 text-foreground dark:text-muted-foreground inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-md border border-transparent px-2 py-1 text-sm font-medium whitespace-nowrap transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:shadow-sm [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
                  e,
                ),
                ...t,
              });
            }
            function u({ className: e, ...t }) {
              return (0, a.jsx)(i.UC, {
                "data-slot": "tabs-content",
                className: (0, o.cn)("flex-1 outline-none", e),
                ...t,
              });
            }
            (o = (n.then ? (await n)() : n)[0]), s();
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
      82122: (e, t, r) => {
        "use strict";
        r.d(t, { A: () => s });
        let s = (0, r(95255).A)("Shield", [
          [
            "path",
            {
              d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
              key: "oel41y",
            },
          ],
        ]);
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
              l = r(89123),
              u = r(84205),
              p = r.n(u),
              f = r(15942),
              h = e([f]);
            f = (h.then ? (await h)() : h)[0];
            let b = (0, u.createContext)(void 0);
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
            let y = (0, o.F)(
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
            function m({
              title: e,
              description: t,
              variant: r = "default",
              onClose: s,
            }) {
              let i = {
                default: null,
                destructive: d.A,
                success: c.A,
                info: l.A,
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
              let [t, r] = (0, u.useState)([]),
                s = (0, u.useRef)(0),
                i = (0, u.useCallback)((e) => {
                  r((t) => t.filter((t) => t.id !== e));
                }, []),
                o = (0, u.useCallback)(
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
                n = (0, u.useMemo)(
                  () => ({ toast: o, toasts: t, removeToast: i }),
                  [o, t, i],
                );
              return (0, a.jsxs)(b.Provider, {
                value: n,
                children: [e, (0, a.jsx)(g, {})],
              });
            }
            function v() {
              let e = (0, u.useContext)(b);
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
                  (0, a.jsx)(m, { ...e, onClose: () => t(e.id) }, e.id),
                ),
              });
            }
            (p().forwardRef(({ className: e, variant: t, ...r }, s) =>
              (0, a.jsx)(i.bL, {
                ref: s,
                className: (0, f.cn)(y({ variant: t }), e),
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
            r.d(t, { S: () => p, k: () => l });
            var a = r(61268),
              i = r(89882),
              o = r(84205),
              n = r(87216),
              d = r(32367),
              c = e([n]);
            n = (c.then ? (await c)() : c)[0];
            let u = (0, o.createContext)(void 0);
            function l({ children: e }) {
              let [t, r] = (0, o.useState)([]),
                [s, c] = (0, o.useState)(null),
                [l, p] = (0, o.useState)([]),
                [f, h] = (0, o.useState)(!1),
                [m, x] = (0, o.useState)(null),
                v = (0, i.useRouter)(),
                { toast: g } = (0, n.dj)(),
                b = (0, d.AG)(),
                y = async (e) => {
                  try {
                    h(!0), x(null);
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
                    h(!1);
                  }
                },
                w = async (e, t, r, s) => {
                  try {
                    h(!0), x(null);
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
                    h(!1);
                  }
                },
                j = async (e, t) => {
                  try {
                    h(!0), x(null);
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
                    h(!1);
                  }
                },
                N = async (e) => {
                  try {
                    h(!0), x(null);
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
                    h(!1);
                  }
                },
                A = async (e, t, r) => {
                  try {
                    h(!0), x(null);
                    let { error: s } = await b
                      .from("artifact_messages")
                      .insert({ artifact_id: e, content: t, role: r });
                    if (s) throw s;
                    await y(e);
                  } catch (e) {
                    x("Failed to add message"), console.error(e);
                  } finally {
                    h(!1);
                  }
                },
                k = async (e, t) => {
                  try {
                    h(!0), x(null);
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
                    h(!1);
                  }
                };
              return (0, a.jsx)(u.Provider, {
                value: {
                  artifacts: t,
                  currentArtifact: s,
                  artifactMessages: l,
                  isLoading: f,
                  error: m,
                  createArtifact: w,
                  updateArtifact: j,
                  deleteArtifact: N,
                  getArtifact: y,
                  addArtifactMessage: A,
                  updateArtifactVisibility: k,
                },
                children: e,
              });
            }
            let p = () => {
              let e = (0, o.useContext)(u);
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
      94812: (e, t, r) => {
        "use strict";
        r.a(e, async (e, s) => {
          try {
            r.d(t, { E: () => n });
            var a = r(61268),
              i = r(15942),
              o = e([i]);
            function n({ className: e, ...t }) {
              return (0, a.jsx)("div", {
                "data-slot": "skeleton",
                className: (0, i.cn)("bg-accent animate-pulse rounded-md", e),
                ...t,
              });
            }
            (i = (o.then ? (await o)() : o)[0]), s();
          } catch (e) {
            s(e);
          }
        });
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
                  children: l,
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
                    className: ["lucide", `lucide-${i(e)}`, c].join(" "),
                    ...u,
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
      99358: (e, t, r) => {
        "use strict";
        r.d(t, { A: () => s });
        let s = (0, r(95255).A)("Globe", [
          ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
          [
            "path",
            {
              d: "M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20",
              key: "13o1zl",
            },
          ],
          ["path", { d: "M2 12h20", key: "9i4pu4" }],
        ]);
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
  var t = require("../../../webpack-runtime.js");
  t.C(e);
  var r = (e) => t((t.s = e)),
    s = t.X(
      0,
      [827, 6518, 2033, 4027, 2872, 7713, 5149, 8859, 1655, 8029, 7393, 4630],
      () => r(70968),
    );
  module.exports = s;
})();
//# sourceMappingURL=page.js.map
