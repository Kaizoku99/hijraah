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
    (e._sentryDebugIds[t] = "2078d61c-18f9-4238-a5dd-d9bc3f9b225c"),
    (e._sentryDebugIdIdentifier =
      "sentry-dbid-2078d61c-18f9-4238-a5dd-d9bc3f9b225c"));
} catch (e) {}
("use strict");
(exports.id = 6777),
  (exports.ids = [6777]),
  (exports.modules = {
    7839: (e, t, r) => {
      r.d(t, { jH: () => o });
      var a = r(84205);
      r(61268);
      var n = a.createContext(void 0);
      function o(e) {
        let t = a.useContext(n);
        return e || t || "ltr";
      }
    },
    26216: (e, t, r) => {
      r.d(t, { A: () => a });
      let a = (0, r(95255).A)("Menu", [
        ["line", { x1: "4", x2: "20", y1: "12", y2: "12", key: "1e0a9i" }],
        ["line", { x1: "4", x2: "20", y1: "6", y2: "6", key: "1owob3" }],
        ["line", { x1: "4", x2: "20", y1: "18", y2: "18", key: "yk5zj1" }],
      ]);
    },
    28366: (e, t, r) => {
      r.d(t, { B8: () => M, UC: () => C, bL: () => j, l9: () => T });
      var a = r(84205),
        n = r(28777),
        o = r(18047),
        i = r(59150),
        l = r(94653),
        s = r(78593),
        d = r(7839),
        u = r(48705),
        c = r(42414),
        f = r(61268),
        y = "Tabs",
        [v, p] = (0, o.A)(y, [i.RG]),
        b = (0, i.RG)(),
        [h, m] = v(y),
        x = a.forwardRef((e, t) => {
          let {
              __scopeTabs: r,
              value: a,
              onValueChange: n,
              defaultValue: o,
              orientation: i = "horizontal",
              dir: l,
              activationMode: v = "automatic",
              ...p
            } = e,
            b = (0, d.jH)(l),
            [m, x] = (0, u.i)({
              prop: a,
              onChange: n,
              defaultProp: o ?? "",
              caller: y,
            });
          return (0, f.jsx)(h, {
            scope: r,
            baseId: (0, c.B)(),
            value: m,
            onValueChange: x,
            orientation: i,
            dir: b,
            activationMode: v,
            children: (0, f.jsx)(s.sG.div, {
              dir: b,
              "data-orientation": i,
              ...p,
              ref: t,
            }),
          });
        });
      x.displayName = y;
      var g = "TabsList",
        w = a.forwardRef((e, t) => {
          let { __scopeTabs: r, loop: a = !0, ...n } = e,
            o = m(g, r),
            l = b(r);
          return (0, f.jsx)(i.bL, {
            asChild: !0,
            ...l,
            orientation: o.orientation,
            dir: o.dir,
            loop: a,
            children: (0, f.jsx)(s.sG.div, {
              role: "tablist",
              "aria-orientation": o.orientation,
              ...n,
              ref: t,
            }),
          });
        });
      w.displayName = g;
      var k = "TabsTrigger",
        A = a.forwardRef((e, t) => {
          let { __scopeTabs: r, value: a, disabled: o = !1, ...l } = e,
            d = m(k, r),
            u = b(r),
            c = D(d.baseId, a),
            y = F(d.baseId, a),
            v = a === d.value;
          return (0, f.jsx)(i.q7, {
            asChild: !0,
            ...u,
            focusable: !o,
            active: v,
            children: (0, f.jsx)(s.sG.button, {
              type: "button",
              role: "tab",
              "aria-selected": v,
              "aria-controls": y,
              "data-state": v ? "active" : "inactive",
              "data-disabled": o ? "" : void 0,
              disabled: o,
              id: c,
              ...l,
              ref: t,
              onMouseDown: (0, n.m)(e.onMouseDown, (e) => {
                o || 0 !== e.button || !1 !== e.ctrlKey
                  ? e.preventDefault()
                  : d.onValueChange(a);
              }),
              onKeyDown: (0, n.m)(e.onKeyDown, (e) => {
                [" ", "Enter"].includes(e.key) && d.onValueChange(a);
              }),
              onFocus: (0, n.m)(e.onFocus, () => {
                let e = "manual" !== d.activationMode;
                v || o || !e || d.onValueChange(a);
              }),
            }),
          });
        });
      A.displayName = k;
      var I = "TabsContent",
        R = a.forwardRef((e, t) => {
          let {
              __scopeTabs: r,
              value: n,
              forceMount: o,
              children: i,
              ...d
            } = e,
            u = m(I, r),
            c = D(u.baseId, n),
            y = F(u.baseId, n),
            v = n === u.value,
            p = a.useRef(v);
          return (
            a.useEffect(() => {
              let e = requestAnimationFrame(() => (p.current = !1));
              return () => cancelAnimationFrame(e);
            }, []),
            (0, f.jsx)(l.C, {
              present: o || v,
              children: ({ present: r }) =>
                (0, f.jsx)(s.sG.div, {
                  "data-state": v ? "active" : "inactive",
                  "data-orientation": u.orientation,
                  role: "tabpanel",
                  "aria-labelledby": c,
                  hidden: !r,
                  id: y,
                  tabIndex: 0,
                  ...d,
                  ref: t,
                  style: {
                    ...e.style,
                    animationDuration: p.current ? "0s" : void 0,
                  },
                  children: r && i,
                }),
            })
          );
        });
      function D(e, t) {
        return `${e}-trigger-${t}`;
      }
      function F(e, t) {
        return `${e}-content-${t}`;
      }
      R.displayName = I;
      var j = x,
        M = w,
        T = A,
        C = R;
    },
    36798: (e, t, r) => {
      r.d(t, { A: () => a });
      let a = (0, r(95255).A)("Settings", [
        [
          "path",
          {
            d: "M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z",
            key: "1qme2f",
          },
        ],
        ["circle", { cx: "12", cy: "12", r: "3", key: "1v7zrd" }],
      ]);
    },
    42414: (e, t, r) => {
      r.d(t, { B: () => s });
      var a,
        n = r(84205),
        o = r(66130),
        i =
          (a || (a = r.t(n, 2)))[" useId ".trim().toString()] || (() => void 0),
        l = 0;
      function s(e) {
        let [t, r] = n.useState(i());
        return (
          (0, o.N)(() => {
            e || r((e) => e ?? String(l++));
          }, [e]),
          e || (t ? `radix-${t}` : "")
        );
      }
    },
    43202: (e, t, r) => {
      r.d(t, { A: () => a });
      let a = (0, r(95255).A)("Map", [
        [
          "polygon",
          { points: "3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21", key: "ok2ie8" },
        ],
        ["line", { x1: "9", x2: "9", y1: "3", y2: "18", key: "w34qz5" }],
        ["line", { x1: "15", x2: "15", y1: "6", y2: "21", key: "volv9a" }],
      ]);
    },
    46299: (e, t, r) => {
      r.d(t, { A: () => a });
      let a = (0, r(95255).A)("Briefcase", [
        [
          "rect",
          {
            width: "20",
            height: "14",
            x: "2",
            y: "7",
            rx: "2",
            ry: "2",
            key: "eto64e",
          },
        ],
        [
          "path",
          { d: "M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16", key: "zwj3tp" },
        ],
      ]);
    },
    52327: (e, t, r) => {
      r.d(t, { A: () => a });
      let a = (0, r(95255).A)("Users", [
        [
          "path",
          { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2", key: "1yyitq" },
        ],
        ["circle", { cx: "9", cy: "7", r: "4", key: "nufk8" }],
        ["path", { d: "M22 21v-2a4 4 0 0 0-3-3.87", key: "kshegd" }],
        ["path", { d: "M16 3.13a4 4 0 0 1 0 7.75", key: "1da9ce" }],
      ]);
    },
    57896: (e, t, r) => {
      r.d(t, { A: () => a });
      let a = (0, r(95255).A)("Home", [
        [
          "path",
          {
            d: "m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",
            key: "y5dka4",
          },
        ],
        ["polyline", { points: "9 22 9 12 15 12 15 22", key: "e2us08" }],
      ]);
    },
    59150: (e, t, r) => {
      r.d(t, { RG: () => w, bL: () => T, q7: () => C });
      var a = r(84205),
        n = r(28777),
        o = r(28029),
        i = r(71604),
        l = r(18047),
        s = r(42414),
        d = r(78593),
        u = r(10308),
        c = r(48705),
        f = r(7839),
        y = r(61268),
        v = "rovingFocusGroup.onEntryFocus",
        p = { bubbles: !1, cancelable: !0 },
        b = "RovingFocusGroup",
        [h, m, x] = (0, o.N)(b),
        [g, w] = (0, l.A)(b, [x]),
        [k, A] = g(b),
        I = a.forwardRef((e, t) =>
          (0, y.jsx)(h.Provider, {
            scope: e.__scopeRovingFocusGroup,
            children: (0, y.jsx)(h.Slot, {
              scope: e.__scopeRovingFocusGroup,
              children: (0, y.jsx)(R, { ...e, ref: t }),
            }),
          }),
        );
      I.displayName = b;
      var R = a.forwardRef((e, t) => {
          let {
              __scopeRovingFocusGroup: r,
              orientation: o,
              loop: l = !1,
              dir: s,
              currentTabStopId: h,
              defaultCurrentTabStopId: x,
              onCurrentTabStopIdChange: g,
              onEntryFocus: w,
              preventScrollOnEntryFocus: A = !1,
              ...I
            } = e,
            R = a.useRef(null),
            D = (0, i.s)(t, R),
            F = (0, f.jH)(s),
            [j, T] = (0, c.i)({
              prop: h,
              defaultProp: x ?? null,
              onChange: g,
              caller: b,
            }),
            [C, G] = a.useState(!1),
            E = (0, u.c)(w),
            S = m(r),
            z = a.useRef(!1),
            [H, K] = a.useState(0);
          return (
            a.useEffect(() => {
              let e = R.current;
              if (e)
                return (
                  e.addEventListener(v, E), () => e.removeEventListener(v, E)
                );
            }, [E]),
            (0, y.jsx)(k, {
              scope: r,
              orientation: o,
              dir: F,
              loop: l,
              currentTabStopId: j,
              onItemFocus: a.useCallback((e) => T(e), [T]),
              onItemShiftTab: a.useCallback(() => G(!0), []),
              onFocusableItemAdd: a.useCallback(() => K((e) => e + 1), []),
              onFocusableItemRemove: a.useCallback(() => K((e) => e - 1), []),
              children: (0, y.jsx)(d.sG.div, {
                tabIndex: C || 0 === H ? -1 : 0,
                "data-orientation": o,
                ...I,
                ref: D,
                style: { outline: "none", ...e.style },
                onMouseDown: (0, n.m)(e.onMouseDown, () => {
                  z.current = !0;
                }),
                onFocus: (0, n.m)(e.onFocus, (e) => {
                  let t = !z.current;
                  if (e.target === e.currentTarget && t && !C) {
                    let t = new CustomEvent(v, p);
                    if (
                      (e.currentTarget.dispatchEvent(t), !t.defaultPrevented)
                    ) {
                      let e = S().filter((e) => e.focusable);
                      M(
                        [
                          e.find((e) => e.active),
                          e.find((e) => e.id === j),
                          ...e,
                        ]
                          .filter(Boolean)
                          .map((e) => e.ref.current),
                        A,
                      );
                    }
                  }
                  z.current = !1;
                }),
                onBlur: (0, n.m)(e.onBlur, () => G(!1)),
              }),
            })
          );
        }),
        D = "RovingFocusGroupItem",
        F = a.forwardRef((e, t) => {
          let {
              __scopeRovingFocusGroup: r,
              focusable: o = !0,
              active: i = !1,
              tabStopId: l,
              children: u,
              ...c
            } = e,
            f = (0, s.B)(),
            v = l || f,
            p = A(D, r),
            b = p.currentTabStopId === v,
            x = m(r),
            {
              onFocusableItemAdd: g,
              onFocusableItemRemove: w,
              currentTabStopId: k,
            } = p;
          return (
            a.useEffect(() => {
              if (o) return g(), () => w();
            }, [o, g, w]),
            (0, y.jsx)(h.ItemSlot, {
              scope: r,
              id: v,
              focusable: o,
              active: i,
              children: (0, y.jsx)(d.sG.span, {
                tabIndex: b ? 0 : -1,
                "data-orientation": p.orientation,
                ...c,
                ref: t,
                onMouseDown: (0, n.m)(e.onMouseDown, (e) => {
                  o ? p.onItemFocus(v) : e.preventDefault();
                }),
                onFocus: (0, n.m)(e.onFocus, () => p.onItemFocus(v)),
                onKeyDown: (0, n.m)(e.onKeyDown, (e) => {
                  if ("Tab" === e.key && e.shiftKey)
                    return void p.onItemShiftTab();
                  if (e.target !== e.currentTarget) return;
                  let t = (function (e, t, r) {
                    var a;
                    let n =
                      ((a = e.key),
                      "rtl" !== r
                        ? a
                        : "ArrowLeft" === a
                          ? "ArrowRight"
                          : "ArrowRight" === a
                            ? "ArrowLeft"
                            : a);
                    if (
                      !(
                        "vertical" === t &&
                        ["ArrowLeft", "ArrowRight"].includes(n)
                      ) &&
                      !(
                        "horizontal" === t &&
                        ["ArrowUp", "ArrowDown"].includes(n)
                      )
                    )
                      return j[n];
                  })(e, p.orientation, p.dir);
                  if (void 0 !== t) {
                    if (e.metaKey || e.ctrlKey || e.altKey || e.shiftKey)
                      return;
                    e.preventDefault();
                    let r = x()
                      .filter((e) => e.focusable)
                      .map((e) => e.ref.current);
                    if ("last" === t) r.reverse();
                    else if ("prev" === t || "next" === t) {
                      "prev" === t && r.reverse();
                      let a = r.indexOf(e.currentTarget);
                      r = p.loop
                        ? (function (e, t) {
                            return e.map((r, a) => e[(t + a) % e.length]);
                          })(r, a + 1)
                        : r.slice(a + 1);
                    }
                    setTimeout(() => M(r));
                  }
                }),
                children:
                  "function" == typeof u
                    ? u({ isCurrentTabStop: b, hasTabStop: null != k })
                    : u,
              }),
            })
          );
        });
      F.displayName = D;
      var j = {
        ArrowLeft: "prev",
        ArrowUp: "prev",
        ArrowRight: "next",
        ArrowDown: "next",
        PageUp: "first",
        Home: "first",
        PageDown: "last",
        End: "last",
      };
      function M(e, t = !1) {
        let r = document.activeElement;
        for (let a of e)
          if (
            a === r ||
            (a.focus({ preventScroll: t }), document.activeElement !== r)
          )
            return;
      }
      var T = I,
        C = F;
    },
    80305: (e, t, r) => {
      r.d(t, { A: () => a });
      let a = (0, r(95255).A)("Flag", [
        [
          "path",
          {
            d: "M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z",
            key: "i9b6wo",
          },
        ],
        ["line", { x1: "4", x2: "4", y1: "22", y2: "15", key: "1cm3nv" }],
      ]);
    },
    99793: (e, t, r) => {
      r.d(t, { A: () => a });
      let a = (0, r(95255).A)("FileText", [
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
//# sourceMappingURL=6777.js.map
