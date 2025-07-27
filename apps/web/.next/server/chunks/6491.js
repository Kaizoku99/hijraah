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
    s = new e.Error().stack;
  s &&
    ((e._sentryDebugIds = e._sentryDebugIds || {}),
    (e._sentryDebugIds[s] = "8e2ea87a-b636-4525-bf63-0cb7011dffe6"),
    (e._sentryDebugIdIdentifier =
      "sentry-dbid-8e2ea87a-b636-4525-bf63-0cb7011dffe6"));
} catch (e) {}
("use strict");
(exports.id = 6491),
  (exports.ids = [6491]),
  (exports.modules = {
    7839: (e, s, a) => {
      a.d(s, { jH: () => n });
      var r = a(84205);
      a(61268);
      var t = r.createContext(void 0);
      function n(e) {
        let s = r.useContext(t);
        return e || s || "ltr";
      }
    },
    20149: (e, s, a) => {
      a.a(e, async (e, r) => {
        try {
          a.d(s, { O: () => u });
          var t = a(61268),
            n = a(43851),
            l = a(17362),
            i = a(5451),
            c = a(94812),
            d = a(77001),
            o = e([n, l, i, c, d]);
          function u() {
            return (0, t.jsxs)("div", {
              className: "flex flex-col h-screen",
              children: [
                (0, t.jsx)("div", {
                  className:
                    "flex items-center justify-between px-4 py-2 border-b",
                  children: (0, t.jsx)(l.Qp, {
                    children: (0, t.jsxs)(l.AB, {
                      children: [
                        (0, t.jsx)(l.J5, {
                          children: (0, t.jsx)(l.w1, {
                            href: "/",
                            children: "Home",
                          }),
                        }),
                        (0, t.jsx)(l.tH, {}),
                        (0, t.jsx)(l.J5, {
                          children: (0, t.jsx)(l.tJ, { children: "Dashboard" }),
                        }),
                      ],
                    }),
                  }),
                }),
                (0, t.jsxs)("div", {
                  className: "flex flex-1 overflow-hidden",
                  children: [
                    (0, t.jsx)(n.AppSidebar, { className: "h-screen" }),
                    (0, t.jsx)("div", {
                      className: "flex-1 overflow-auto",
                      children: (0, t.jsx)("div", {
                        className: "container mx-auto p-6",
                        children: (0, t.jsxs)(d.Tabs, {
                          defaultValue: "cases",
                          children: [
                            (0, t.jsxs)("div", {
                              className:
                                "mb-6 flex items-center justify-between",
                              children: [
                                (0, t.jsxs)(d.TabsList, {
                                  children: [
                                    (0, t.jsx)(d.TabsTrigger, {
                                      value: "cases",
                                      children: "Cases",
                                    }),
                                    (0, t.jsx)(d.TabsTrigger, {
                                      value: "documents",
                                      children: "Documents",
                                    }),
                                    (0, t.jsx)(d.TabsTrigger, {
                                      value: "analytics",
                                      children: "Analytics",
                                    }),
                                  ],
                                }),
                                (0, t.jsx)(c.E, { className: "h-10 w-32" }),
                              ],
                            }),
                            (0, t.jsx)("div", {
                              className: "grid gap-4 md:grid-cols-3 mb-6",
                              children: [1, 2, 3].map((e) =>
                                (0, t.jsxs)(
                                  i.Zp,
                                  {
                                    children: [
                                      (0, t.jsxs)(i.aR, {
                                        className:
                                          "flex flex-row items-center justify-between space-y-0 pb-2",
                                        children: [
                                          (0, t.jsx)(c.E, {
                                            className: "h-5 w-24",
                                          }),
                                          (0, t.jsx)(c.E, {
                                            className: "h-4 w-4 rounded-full",
                                          }),
                                        ],
                                      }),
                                      (0, t.jsxs)(i.Wu, {
                                        children: [
                                          (0, t.jsx)(c.E, {
                                            className: "h-8 w-12 mb-1",
                                          }),
                                          (0, t.jsx)(c.E, {
                                            className: "h-3 w-32",
                                          }),
                                        ],
                                      }),
                                    ],
                                  },
                                  e,
                                ),
                              ),
                            }),
                            (0, t.jsx)(d.TabsContent, {
                              value: "cases",
                              className: "space-y-4",
                              children: [1, 2, 3].map((e) =>
                                (0, t.jsxs)(
                                  i.Zp,
                                  {
                                    children: [
                                      (0, t.jsx)(i.aR, {
                                        className: "p-4",
                                        children: (0, t.jsxs)("div", {
                                          className:
                                            "flex justify-between items-start",
                                          children: [
                                            (0, t.jsxs)("div", {
                                              children: [
                                                (0, t.jsx)(c.E, {
                                                  className: "h-6 w-48 mb-2",
                                                }),
                                                (0, t.jsx)(c.E, {
                                                  className: "h-4 w-64",
                                                }),
                                              ],
                                            }),
                                            (0, t.jsxs)("div", {
                                              className:
                                                "flex items-center space-x-2",
                                              children: [
                                                (0, t.jsx)(c.E, {
                                                  className:
                                                    "h-6 w-24 rounded-full",
                                                }),
                                                (0, t.jsx)(c.E, {
                                                  className:
                                                    "h-8 w-8 rounded-full",
                                                }),
                                              ],
                                            }),
                                          ],
                                        }),
                                      }),
                                      (0, t.jsx)(i.Wu, {
                                        className: "p-4 pt-0",
                                        children: (0, t.jsxs)("div", {
                                          className: "flex flex-wrap gap-2",
                                          children: [
                                            (0, t.jsx)(c.E, {
                                              className: "h-4 w-32",
                                            }),
                                            (0, t.jsx)(c.E, {
                                              className: "h-4 w-40",
                                            }),
                                          ],
                                        }),
                                      }),
                                      (0, t.jsxs)(i.wL, {
                                        className:
                                          "p-4 pt-0 flex justify-between",
                                        children: [
                                          (0, t.jsx)(c.E, {
                                            className: "h-8 w-24",
                                          }),
                                          (0, t.jsx)(c.E, {
                                            className: "h-8 w-32",
                                          }),
                                        ],
                                      }),
                                    ],
                                  },
                                  e,
                                ),
                              ),
                            }),
                            (0, t.jsx)(d.TabsContent, {
                              value: "documents",
                              className: "space-y-4",
                              children: [1, 2, 3].map((e) =>
                                (0, t.jsxs)(
                                  i.Zp,
                                  {
                                    children: [
                                      (0, t.jsx)(i.aR, {
                                        className: "p-4",
                                        children: (0, t.jsxs)("div", {
                                          className:
                                            "flex justify-between items-start",
                                          children: [
                                            (0, t.jsxs)("div", {
                                              className:
                                                "flex items-start space-x-3",
                                              children: [
                                                (0, t.jsx)(c.E, {
                                                  className:
                                                    "h-10 w-10 rounded-md",
                                                }),
                                                (0, t.jsxs)("div", {
                                                  children: [
                                                    (0, t.jsx)(c.E, {
                                                      className:
                                                        "h-6 w-48 mb-2",
                                                    }),
                                                    (0, t.jsx)(c.E, {
                                                      className: "h-4 w-32",
                                                    }),
                                                  ],
                                                }),
                                              ],
                                            }),
                                            (0, t.jsxs)("div", {
                                              className:
                                                "flex items-center space-x-2",
                                              children: [
                                                (0, t.jsx)(c.E, {
                                                  className:
                                                    "h-6 w-24 rounded-full",
                                                }),
                                                (0, t.jsx)(c.E, {
                                                  className:
                                                    "h-8 w-8 rounded-full",
                                                }),
                                              ],
                                            }),
                                          ],
                                        }),
                                      }),
                                      (0, t.jsxs)(i.Wu, {
                                        className: "p-4 pt-0",
                                        children: [
                                          (0, t.jsx)(c.E, {
                                            className: "h-4 w-full mb-2",
                                          }),
                                          (0, t.jsxs)("div", {
                                            className: "flex flex-wrap gap-2",
                                            children: [
                                              (0, t.jsx)(c.E, {
                                                className: "h-4 w-32",
                                              }),
                                              (0, t.jsx)(c.E, {
                                                className: "h-4 w-24",
                                              }),
                                            ],
                                          }),
                                        ],
                                      }),
                                      (0, t.jsx)(i.wL, {
                                        className: "p-4 pt-0 flex justify-end",
                                        children: (0, t.jsx)(c.E, {
                                          className: "h-8 w-32",
                                        }),
                                      }),
                                    ],
                                  },
                                  e,
                                ),
                              ),
                            }),
                            (0, t.jsx)(d.TabsContent, {
                              value: "analytics",
                              className: "space-y-4",
                              children: (0, t.jsx)("div", {
                                className:
                                  "h-[400px] w-full rounded-md border border-dashed flex items-center justify-center",
                                children: (0, t.jsx)(c.E, {
                                  className: "h-8 w-64",
                                }),
                              }),
                            }),
                          ],
                        }),
                      }),
                    }),
                  ],
                }),
              ],
            });
          }
          ([n, l, i, c, d] = o.then ? (await o)() : o), r();
        } catch (e) {
          r(e);
        }
      });
    },
    28366: (e, s, a) => {
      a.d(s, { B8: () => k, UC: () => I, bL: () => T, l9: () => R });
      var r = a(84205),
        t = a(28777),
        n = a(18047),
        l = a(59150),
        i = a(94653),
        c = a(78593),
        d = a(7839),
        o = a(48705),
        u = a(42414),
        x = a(61268),
        m = "Tabs",
        [h, f] = (0, n.A)(m, [l.RG]),
        p = (0, l.RG)(),
        [j, v] = h(m),
        b = r.forwardRef((e, s) => {
          let {
              __scopeTabs: a,
              value: r,
              onValueChange: t,
              defaultValue: n,
              orientation: l = "horizontal",
              dir: i,
              activationMode: h = "automatic",
              ...f
            } = e,
            p = (0, d.jH)(i),
            [v, b] = (0, o.i)({
              prop: r,
              onChange: t,
              defaultProp: n ?? "",
              caller: m,
            });
          return (0, x.jsx)(j, {
            scope: a,
            baseId: (0, u.B)(),
            value: v,
            onValueChange: b,
            orientation: l,
            dir: p,
            activationMode: h,
            children: (0, x.jsx)(c.sG.div, {
              dir: p,
              "data-orientation": l,
              ...f,
              ref: s,
            }),
          });
        });
      b.displayName = m;
      var w = "TabsList",
        y = r.forwardRef((e, s) => {
          let { __scopeTabs: a, loop: r = !0, ...t } = e,
            n = v(w, a),
            i = p(a);
          return (0, x.jsx)(l.bL, {
            asChild: !0,
            ...i,
            orientation: n.orientation,
            dir: n.dir,
            loop: r,
            children: (0, x.jsx)(c.sG.div, {
              role: "tablist",
              "aria-orientation": n.orientation,
              ...t,
              ref: s,
            }),
          });
        });
      y.displayName = w;
      var g = "TabsTrigger",
        N = r.forwardRef((e, s) => {
          let { __scopeTabs: a, value: r, disabled: n = !1, ...i } = e,
            d = v(g, a),
            o = p(a),
            u = C(d.baseId, r),
            m = D(d.baseId, r),
            h = r === d.value;
          return (0, x.jsx)(l.q7, {
            asChild: !0,
            ...o,
            focusable: !n,
            active: h,
            children: (0, x.jsx)(c.sG.button, {
              type: "button",
              role: "tab",
              "aria-selected": h,
              "aria-controls": m,
              "data-state": h ? "active" : "inactive",
              "data-disabled": n ? "" : void 0,
              disabled: n,
              id: u,
              ...i,
              ref: s,
              onMouseDown: (0, t.m)(e.onMouseDown, (e) => {
                n || 0 !== e.button || !1 !== e.ctrlKey
                  ? e.preventDefault()
                  : d.onValueChange(r);
              }),
              onKeyDown: (0, t.m)(e.onKeyDown, (e) => {
                [" ", "Enter"].includes(e.key) && d.onValueChange(r);
              }),
              onFocus: (0, t.m)(e.onFocus, () => {
                let e = "manual" !== d.activationMode;
                h || n || !e || d.onValueChange(r);
              }),
            }),
          });
        });
      N.displayName = g;
      var A = "TabsContent",
        E = r.forwardRef((e, s) => {
          let {
              __scopeTabs: a,
              value: t,
              forceMount: n,
              children: l,
              ...d
            } = e,
            o = v(A, a),
            u = C(o.baseId, t),
            m = D(o.baseId, t),
            h = t === o.value,
            f = r.useRef(h);
          return (
            r.useEffect(() => {
              let e = requestAnimationFrame(() => (f.current = !1));
              return () => cancelAnimationFrame(e);
            }, []),
            (0, x.jsx)(i.C, {
              present: n || h,
              children: ({ present: a }) =>
                (0, x.jsx)(c.sG.div, {
                  "data-state": h ? "active" : "inactive",
                  "data-orientation": o.orientation,
                  role: "tabpanel",
                  "aria-labelledby": u,
                  hidden: !a,
                  id: m,
                  tabIndex: 0,
                  ...d,
                  ref: s,
                  style: {
                    ...e.style,
                    animationDuration: f.current ? "0s" : void 0,
                  },
                  children: a && l,
                }),
            })
          );
        });
      function C(e, s) {
        return `${e}-trigger-${s}`;
      }
      function D(e, s) {
        return `${e}-content-${s}`;
      }
      E.displayName = A;
      var T = b,
        k = y,
        R = N,
        I = E;
    },
    31766: (e, s, a) => {
      a.d(s, { A: () => r });
      let r = (0, a(95255).A)("Eye", [
        [
          "path",
          { d: "M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z", key: "rwhkz3" },
        ],
        ["circle", { cx: "12", cy: "12", r: "3", key: "1v7zrd" }],
      ]);
    },
    36789: (e, s, a) => {
      a.d(s, { A: () => r });
      let r = (0, a(95255).A)("Clock", [
        ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
        ["polyline", { points: "12 6 12 12 16 14", key: "68esgv" }],
      ]);
    },
    36939: (e, s, a) => {
      a.d(s, { A: () => r });
      let r = (0, a(95255).A)("Paperclip", [
        [
          "path",
          {
            d: "m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48",
            key: "1u3ebp",
          },
        ],
      ]);
    },
    59150: (e, s, a) => {
      a.d(s, { RG: () => y, bL: () => R, q7: () => I });
      var r = a(84205),
        t = a(28777),
        n = a(28029),
        l = a(71604),
        i = a(18047),
        c = a(42414),
        d = a(78593),
        o = a(10308),
        u = a(48705),
        x = a(7839),
        m = a(61268),
        h = "rovingFocusGroup.onEntryFocus",
        f = { bubbles: !1, cancelable: !0 },
        p = "RovingFocusGroup",
        [j, v, b] = (0, n.N)(p),
        [w, y] = (0, i.A)(p, [b]),
        [g, N] = w(p),
        A = r.forwardRef((e, s) =>
          (0, m.jsx)(j.Provider, {
            scope: e.__scopeRovingFocusGroup,
            children: (0, m.jsx)(j.Slot, {
              scope: e.__scopeRovingFocusGroup,
              children: (0, m.jsx)(E, { ...e, ref: s }),
            }),
          }),
        );
      A.displayName = p;
      var E = r.forwardRef((e, s) => {
          let {
              __scopeRovingFocusGroup: a,
              orientation: n,
              loop: i = !1,
              dir: c,
              currentTabStopId: j,
              defaultCurrentTabStopId: b,
              onCurrentTabStopIdChange: w,
              onEntryFocus: y,
              preventScrollOnEntryFocus: N = !1,
              ...A
            } = e,
            E = r.useRef(null),
            C = (0, l.s)(s, E),
            D = (0, x.jH)(c),
            [T, R] = (0, u.i)({
              prop: j,
              defaultProp: b ?? null,
              onChange: w,
              caller: p,
            }),
            [I, F] = r.useState(!1),
            _ = (0, o.c)(y),
            L = v(a),
            G = r.useRef(!1),
            [M, S] = r.useState(0);
          return (
            r.useEffect(() => {
              let e = E.current;
              if (e)
                return (
                  e.addEventListener(h, _), () => e.removeEventListener(h, _)
                );
            }, [_]),
            (0, m.jsx)(g, {
              scope: a,
              orientation: n,
              dir: D,
              loop: i,
              currentTabStopId: T,
              onItemFocus: r.useCallback((e) => R(e), [R]),
              onItemShiftTab: r.useCallback(() => F(!0), []),
              onFocusableItemAdd: r.useCallback(() => S((e) => e + 1), []),
              onFocusableItemRemove: r.useCallback(() => S((e) => e - 1), []),
              children: (0, m.jsx)(d.sG.div, {
                tabIndex: I || 0 === M ? -1 : 0,
                "data-orientation": n,
                ...A,
                ref: C,
                style: { outline: "none", ...e.style },
                onMouseDown: (0, t.m)(e.onMouseDown, () => {
                  G.current = !0;
                }),
                onFocus: (0, t.m)(e.onFocus, (e) => {
                  let s = !G.current;
                  if (e.target === e.currentTarget && s && !I) {
                    let s = new CustomEvent(h, f);
                    if (
                      (e.currentTarget.dispatchEvent(s), !s.defaultPrevented)
                    ) {
                      let e = L().filter((e) => e.focusable);
                      k(
                        [
                          e.find((e) => e.active),
                          e.find((e) => e.id === T),
                          ...e,
                        ]
                          .filter(Boolean)
                          .map((e) => e.ref.current),
                        N,
                      );
                    }
                  }
                  G.current = !1;
                }),
                onBlur: (0, t.m)(e.onBlur, () => F(!1)),
              }),
            })
          );
        }),
        C = "RovingFocusGroupItem",
        D = r.forwardRef((e, s) => {
          let {
              __scopeRovingFocusGroup: a,
              focusable: n = !0,
              active: l = !1,
              tabStopId: i,
              children: o,
              ...u
            } = e,
            x = (0, c.B)(),
            h = i || x,
            f = N(C, a),
            p = f.currentTabStopId === h,
            b = v(a),
            {
              onFocusableItemAdd: w,
              onFocusableItemRemove: y,
              currentTabStopId: g,
            } = f;
          return (
            r.useEffect(() => {
              if (n) return w(), () => y();
            }, [n, w, y]),
            (0, m.jsx)(j.ItemSlot, {
              scope: a,
              id: h,
              focusable: n,
              active: l,
              children: (0, m.jsx)(d.sG.span, {
                tabIndex: p ? 0 : -1,
                "data-orientation": f.orientation,
                ...u,
                ref: s,
                onMouseDown: (0, t.m)(e.onMouseDown, (e) => {
                  n ? f.onItemFocus(h) : e.preventDefault();
                }),
                onFocus: (0, t.m)(e.onFocus, () => f.onItemFocus(h)),
                onKeyDown: (0, t.m)(e.onKeyDown, (e) => {
                  if ("Tab" === e.key && e.shiftKey)
                    return void f.onItemShiftTab();
                  if (e.target !== e.currentTarget) return;
                  let s = (function (e, s, a) {
                    var r;
                    let t =
                      ((r = e.key),
                      "rtl" !== a
                        ? r
                        : "ArrowLeft" === r
                          ? "ArrowRight"
                          : "ArrowRight" === r
                            ? "ArrowLeft"
                            : r);
                    if (
                      !(
                        "vertical" === s &&
                        ["ArrowLeft", "ArrowRight"].includes(t)
                      ) &&
                      !(
                        "horizontal" === s &&
                        ["ArrowUp", "ArrowDown"].includes(t)
                      )
                    )
                      return T[t];
                  })(e, f.orientation, f.dir);
                  if (void 0 !== s) {
                    if (e.metaKey || e.ctrlKey || e.altKey || e.shiftKey)
                      return;
                    e.preventDefault();
                    let a = b()
                      .filter((e) => e.focusable)
                      .map((e) => e.ref.current);
                    if ("last" === s) a.reverse();
                    else if ("prev" === s || "next" === s) {
                      "prev" === s && a.reverse();
                      let r = a.indexOf(e.currentTarget);
                      a = f.loop
                        ? (function (e, s) {
                            return e.map((a, r) => e[(s + r) % e.length]);
                          })(a, r + 1)
                        : a.slice(r + 1);
                    }
                    setTimeout(() => k(a));
                  }
                }),
                children:
                  "function" == typeof o
                    ? o({ isCurrentTabStop: p, hasTabStop: null != g })
                    : o,
              }),
            })
          );
        });
      D.displayName = C;
      var T = {
        ArrowLeft: "prev",
        ArrowUp: "prev",
        ArrowRight: "next",
        ArrowDown: "next",
        PageUp: "first",
        Home: "first",
        PageDown: "last",
        End: "last",
      };
      function k(e, s = !1) {
        let a = document.activeElement;
        for (let r of e)
          if (
            r === a ||
            (r.focus({ preventScroll: s }), document.activeElement !== a)
          )
            return;
      }
      var R = A,
        I = D;
    },
    81774: (e, s, a) => {
      a.a(e, async (e, r) => {
        try {
          a.d(s, { P: () => N });
          var t = a(61268),
            n = a(81578),
            l = a(89525),
            i = a(99793),
            c = a(24131),
            d = a(31766),
            o = a(97911),
            u = a(36939),
            x = a(36789),
            m = a(12335),
            h = a(89882),
            f = a(95124),
            p = a(84205),
            j = a(15942),
            v = a(46532),
            b = a(28909),
            w = a(5451),
            y = a(93336),
            g = e([j, v, b, w, y]);
          function N({ documents: e, onDocumentUpdated: s }) {
            let a = (0, h.useRouter)(),
              r = (0, f.useTranslations)("documentsList"),
              [g, N] = (0, p.useState)(null),
              A = (e) => {
                a.push(`/dashboard/documents/${e}`);
              },
              E = (e) => {
                switch (e) {
                  case "processing":
                    return "bg-blue-100 text-blue-800 hover:bg-blue-200";
                  case "ready":
                  case "verified":
                    return "bg-green-100 text-green-800 hover:bg-green-200";
                  case "error":
                  case "rejected":
                    return "bg-red-100 text-red-800 hover:bg-red-200";
                  case "pending":
                    return "bg-yellow-100 text-yellow-800 hover:bg-yellow-200";
                  case "expired":
                    return "bg-purple-100 text-purple-800 hover:bg-purple-200";
                  default:
                    return "bg-gray-100 text-gray-800 hover:bg-gray-200";
                }
              },
              C = (e) => {
                switch (e?.toLowerCase()) {
                  case "pdf":
                    return (0, t.jsx)(l.A, {
                      className: "h-4 w-4 text-red-500",
                    });
                  case "jpg":
                  case "jpeg":
                  case "png":
                  case "gif":
                    return (0, t.jsx)(l.A, {
                      className: "h-4 w-4 text-blue-500",
                    });
                  case "doc":
                  case "docx":
                    return (0, t.jsx)(l.A, {
                      className: "h-4 w-4 text-blue-700",
                    });
                  case "xls":
                  case "xlsx":
                    return (0, t.jsx)(l.A, {
                      className: "h-4 w-4 text-green-600",
                    });
                  default:
                    return (0, t.jsx)(l.A, {
                      className: "h-4 w-4 text-gray-500",
                    });
                }
              },
              D = (e) => {
                if (!e) return r("invalidDate");
                try {
                  return (0, n.GP)(new Date(e), "MMM d, yyyy");
                } catch (e) {
                  return r("invalidDate");
                }
              };
            return 0 === e.length
              ? (0, t.jsxs)("div", {
                  className: "text-center p-12 border rounded-lg",
                  children: [
                    (0, t.jsx)(i.A, {
                      className: "h-12 w-12 mx-auto text-muted-foreground mb-4",
                    }),
                    (0, t.jsx)("h3", {
                      className: "text-lg font-medium",
                      children: r("noDocumentsFound"),
                    }),
                    (0, t.jsx)("p", {
                      className: "text-muted-foreground mb-4",
                      children: r("getStarted"),
                    }),
                    (0, t.jsx)(b.$, {
                      onClick: () => a.push("/dashboard/documents/upload"),
                      children: r("uploadDocument"),
                    }),
                  ],
                })
              : (0, t.jsx)("div", {
                  className: "space-y-4",
                  children: e.map((e) =>
                    (0, t.jsxs)(
                      w.Zp,
                      {
                        className: g === e.id ? "border-primary" : "",
                        children: [
                          (0, t.jsx)(w.aR, {
                            className: "p-4",
                            children: (0, t.jsxs)("div", {
                              className: "flex justify-between items-start",
                              children: [
                                (0, t.jsxs)("div", {
                                  className: "flex items-start space-x-3",
                                  children: [
                                    (0, t.jsx)("div", {
                                      className: "p-2 bg-gray-100 rounded-md",
                                      children: C(e.file_type),
                                    }),
                                    (0, t.jsxs)("div", {
                                      children: [
                                        (0, t.jsx)(w.ZB, {
                                          className: "text-lg",
                                          children:
                                            e.name || r("untitledDocument"),
                                        }),
                                        (0, t.jsxs)("div", {
                                          className:
                                            "text-sm text-muted-foreground mt-1",
                                          children: [
                                            e.file_type?.toUpperCase(),
                                            " • ",
                                            (0, j.Cq)(e.file_size || 0),
                                          ],
                                        }),
                                      ],
                                    }),
                                  ],
                                }),
                                (0, t.jsxs)("div", {
                                  className: "flex items-center space-x-2",
                                  children: [
                                    (0, t.jsx)(v.E, {
                                      className: E(e.status),
                                      children: r(
                                        `status.${e.status || "unknown"}`,
                                      ),
                                    }),
                                    (0, t.jsxs)(y.rI, {
                                      children: [
                                        (0, t.jsx)(y.ty, {
                                          asChild: !0,
                                          children: (0, t.jsx)(b.$, {
                                            variant: "ghost",
                                            size: "icon",
                                            children: (0, t.jsx)(c.A, {
                                              className: "h-4 w-4",
                                            }),
                                          }),
                                        }),
                                        (0, t.jsxs)(y.SQ, {
                                          align: "end",
                                          children: [
                                            (0, t.jsx)(y.lp, {
                                              children: r("actions"),
                                            }),
                                            (0, t.jsx)(y.mB, {}),
                                            (0, t.jsxs)(y._2, {
                                              onClick: () => A(e.id),
                                              children: [
                                                (0, t.jsx)(d.A, {
                                                  className: "mr-2 h-4 w-4",
                                                }),
                                                r("viewDocument"),
                                              ],
                                            }),
                                            (0, t.jsxs)(y._2, {
                                              onClick: () =>
                                                window.open(
                                                  e.file_path,
                                                  "_blank",
                                                ),
                                              children: [
                                                (0, t.jsx)(o.A, {
                                                  className: "mr-2 h-4 w-4",
                                                }),
                                                r("download"),
                                              ],
                                            }),
                                            e.case_id &&
                                              (0, t.jsxs)(y._2, {
                                                onClick: () =>
                                                  a.push(
                                                    `/dashboard/cases/${e.case_id}`,
                                                  ),
                                                children: [
                                                  (0, t.jsx)(u.A, {
                                                    className: "mr-2 h-4 w-4",
                                                  }),
                                                  r("viewRelatedCase"),
                                                ],
                                              }),
                                            (0, t.jsx)(y.mB, {}),
                                            (0, t.jsx)(y._2, {
                                              className: "text-red-600",
                                              onClick: async () => {
                                                await s();
                                              },
                                              children: r("deleteDocument"),
                                            }),
                                          ],
                                        }),
                                      ],
                                    }),
                                  ],
                                }),
                              ],
                            }),
                          }),
                          (0, t.jsx)(w.Wu, {
                            className: "p-4 pt-0",
                            children: (0, t.jsxs)("div", {
                              className:
                                "flex flex-wrap text-sm text-muted-foreground gap-y-1",
                              children: [
                                e.description &&
                                  (0, t.jsx)("p", {
                                    className: "w-full mb-2",
                                    children: e.description,
                                  }),
                                (0, t.jsxs)("div", {
                                  className: "flex items-center mr-4",
                                  children: [
                                    (0, t.jsx)(x.A, {
                                      className: "mr-1 h-4 w-4",
                                    }),
                                    (0, t.jsxs)("span", {
                                      children: [
                                        r("uploadedPrefix"),
                                        D(e.created_at),
                                      ],
                                    }),
                                  ],
                                }),
                                e.case_id &&
                                  (0, t.jsxs)("div", {
                                    className: "flex items-center",
                                    children: [
                                      (0, t.jsx)(u.A, {
                                        className: "mr-1 h-4 w-4",
                                      }),
                                      (0, t.jsx)("span", {
                                        children: r("linkedToCase"),
                                      }),
                                    ],
                                  }),
                              ],
                            }),
                          }),
                          (0, t.jsx)(w.wL, {
                            className: "p-4 pt-0 flex justify-end",
                            children: (0, t.jsxs)(b.$, {
                              variant: "default",
                              size: "sm",
                              onClick: () => A(e.id),
                              children: [
                                r("viewDocument"),
                                (0, t.jsx)(m.A, { className: "ml-1 h-4 w-4" }),
                              ],
                            }),
                          }),
                        ],
                      },
                      e.id,
                    ),
                  ),
                });
          }
          ([j, v, b, w, y] = g.then ? (await g)() : g), r();
        } catch (e) {
          r(e);
        }
      });
    },
    89525: (e, s, a) => {
      a.d(s, { A: () => r });
      let r = (0, a(95255).A)("File", [
        [
          "path",
          {
            d: "M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z",
            key: "1rqfz7",
          },
        ],
        ["path", { d: "M14 2v4a2 2 0 0 0 2 2h4", key: "tnqrlb" }],
      ]);
    },
    97911: (e, s, a) => {
      a.d(s, { A: () => r });
      let r = (0, a(95255).A)("Download", [
        [
          "path",
          { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4", key: "ih7n3h" },
        ],
        ["polyline", { points: "7 10 12 15 17 10", key: "2ggqvy" }],
        ["line", { x1: "12", x2: "12", y1: "15", y2: "3", key: "1vk2je" }],
      ]);
    },
  });
//# sourceMappingURL=6491.js.map
