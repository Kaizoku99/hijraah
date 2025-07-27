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
    (e._sentryDebugIds[t] = "fbfd1f9b-da36-44d8-8cf8-ae1d1db5716b"),
    (e._sentryDebugIdIdentifier =
      "sentry-dbid-fbfd1f9b-da36-44d8-8cf8-ae1d1db5716b"));
} catch (e) {}
("use strict");
(exports.id = 7414),
  (exports.ids = [7414]),
  (exports.modules = {
    5451: (e, t, r) => {
      r.a(e, async (e, a) => {
        try {
          r.d(t, {
            BT: () => f,
            Wu: () => p,
            ZB: () => u,
            Zp: () => d,
            aR: () => c,
            wL: () => m,
          });
          var n = r(61268),
            s = r(55728),
            i = r(84205),
            o = r(15942),
            l = e([o]);
          o = (l.then ? (await l)() : l)[0];
          let d = i.forwardRef(({ className: e, ...t }, r) =>
            (0, n.jsx)(s.P.div, {
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
          let f = i.forwardRef(({ className: e, ...t }, r) =>
            (0, n.jsx)("p", {
              ref: r,
              className: (0, o.cn)("text-sm text-muted-foreground", e),
              ...t,
            }),
          );
          f.displayName = "CardDescription";
          let p = i.forwardRef(({ className: e, ...t }, r) =>
            (0, n.jsx)("div", {
              ref: r,
              className: (0, o.cn)("p-6 pt-0", e),
              ...t,
            }),
          );
          p.displayName = "CardContent";
          let m = i.forwardRef(({ className: e, ...t }, r) =>
            (0, n.jsx)("div", {
              ref: r,
              className: (0, o.cn)("flex items-center p-6 pt-0", e),
              ...t,
            }),
          );
          (m.displayName = "CardFooter"), a();
        } catch (e) {
          a(e);
        }
      });
    },
    7839: (e, t, r) => {
      r.d(t, { jH: () => s });
      var a = r(84205);
      r(61268);
      var n = a.createContext(void 0);
      function s(e) {
        let t = a.useContext(n);
        return e || t || "ltr";
      }
    },
    9845: (e, t, r) => {
      r.d(t, { A: () => a });
      let a = (0, r(95255).A)("ArrowRight", [
        ["path", { d: "M5 12h14", key: "1ays0h" }],
        ["path", { d: "m12 5 7 7-7 7", key: "xquz4c" }],
      ]);
    },
    28366: (e, t, r) => {
      r.d(t, { B8: () => A, UC: () => D, bL: () => I, l9: () => E });
      var a = r(84205),
        n = r(28777),
        s = r(18047),
        i = r(59150),
        o = r(94653),
        l = r(78593),
        d = r(7839),
        c = r(48705),
        u = r(42414),
        f = r(61268),
        p = "Tabs",
        [m, h] = (0, s.A)(p, [i.RG]),
        x = (0, i.RG)(),
        [b, v] = m(p),
        g = a.forwardRef((e, t) => {
          let {
              __scopeTabs: r,
              value: a,
              onValueChange: n,
              defaultValue: s,
              orientation: i = "horizontal",
              dir: o,
              activationMode: m = "automatic",
              ...h
            } = e,
            x = (0, d.jH)(o),
            [v, g] = (0, c.i)({
              prop: a,
              onChange: n,
              defaultProp: s ?? "",
              caller: p,
            });
          return (0, f.jsx)(b, {
            scope: r,
            baseId: (0, u.B)(),
            value: v,
            onValueChange: g,
            orientation: i,
            dir: x,
            activationMode: m,
            children: (0, f.jsx)(l.sG.div, {
              dir: x,
              "data-orientation": i,
              ...h,
              ref: t,
            }),
          });
        });
      g.displayName = p;
      var y = "TabsList",
        w = a.forwardRef((e, t) => {
          let { __scopeTabs: r, loop: a = !0, ...n } = e,
            s = v(y, r),
            o = x(r);
          return (0, f.jsx)(i.bL, {
            asChild: !0,
            ...o,
            orientation: s.orientation,
            dir: s.dir,
            loop: a,
            children: (0, f.jsx)(l.sG.div, {
              role: "tablist",
              "aria-orientation": s.orientation,
              ...n,
              ref: t,
            }),
          });
        });
      w.displayName = y;
      var j = "TabsTrigger",
        C = a.forwardRef((e, t) => {
          let { __scopeTabs: r, value: a, disabled: s = !1, ...o } = e,
            d = v(j, r),
            c = x(r),
            u = T(d.baseId, a),
            p = k(d.baseId, a),
            m = a === d.value;
          return (0, f.jsx)(i.q7, {
            asChild: !0,
            ...c,
            focusable: !s,
            active: m,
            children: (0, f.jsx)(l.sG.button, {
              type: "button",
              role: "tab",
              "aria-selected": m,
              "aria-controls": p,
              "data-state": m ? "active" : "inactive",
              "data-disabled": s ? "" : void 0,
              disabled: s,
              id: u,
              ...o,
              ref: t,
              onMouseDown: (0, n.m)(e.onMouseDown, (e) => {
                s || 0 !== e.button || !1 !== e.ctrlKey
                  ? e.preventDefault()
                  : d.onValueChange(a);
              }),
              onKeyDown: (0, n.m)(e.onKeyDown, (e) => {
                [" ", "Enter"].includes(e.key) && d.onValueChange(a);
              }),
              onFocus: (0, n.m)(e.onFocus, () => {
                let e = "manual" !== d.activationMode;
                m || s || !e || d.onValueChange(a);
              }),
            }),
          });
        });
      C.displayName = j;
      var N = "TabsContent",
        R = a.forwardRef((e, t) => {
          let {
              __scopeTabs: r,
              value: n,
              forceMount: s,
              children: i,
              ...d
            } = e,
            c = v(N, r),
            u = T(c.baseId, n),
            p = k(c.baseId, n),
            m = n === c.value,
            h = a.useRef(m);
          return (
            a.useEffect(() => {
              let e = requestAnimationFrame(() => (h.current = !1));
              return () => cancelAnimationFrame(e);
            }, []),
            (0, f.jsx)(o.C, {
              present: s || m,
              children: ({ present: r }) =>
                (0, f.jsx)(l.sG.div, {
                  "data-state": m ? "active" : "inactive",
                  "data-orientation": c.orientation,
                  role: "tabpanel",
                  "aria-labelledby": u,
                  hidden: !r,
                  id: p,
                  tabIndex: 0,
                  ...d,
                  ref: t,
                  style: {
                    ...e.style,
                    animationDuration: h.current ? "0s" : void 0,
                  },
                  children: r && i,
                }),
            })
          );
        });
      function T(e, t) {
        return `${e}-trigger-${t}`;
      }
      function k(e, t) {
        return `${e}-content-${t}`;
      }
      R.displayName = N;
      var I = g,
        A = w,
        E = C,
        D = R;
    },
    47414: (e, t, r) => {
      r.a(e, async (e, a) => {
        try {
          r.r(t), r.d(t, { FirstTask: () => b });
          var n = r(61268),
            s = r(65666),
            i = r(6130),
            o = r(9845),
            l = r(98683),
            d = r(84205),
            c = r(16951),
            u = r(28909),
            f = r(5451),
            p = r(77001),
            m = r(67135),
            h = e([u, f, p]);
          [u, f, p] = h.then ? (await h)() : h;
          let x = ({ task: e, onComplete: t }) => {
              let [r, a] = (0, d.useState)(!1),
                [c, p] = (0, d.useState)(!1),
                m = (0, d.useCallback)(() => {
                  a(!0),
                    setTimeout(() => {
                      p(!0), a(!1), setTimeout(() => t(e.id, e.actionKey), 1e3);
                    }, 1e3);
                }, [e.id, e.actionKey, t]),
                h = e.icon;
              return (0, n.jsxs)(f.Zp, {
                className:
                  "border border-muted relative overflow-hidden transition-shadow hover:shadow-md",
                children: [
                  (0, n.jsx)(f.aR, {
                    children: (0, n.jsxs)("div", {
                      className: "flex items-start gap-4",
                      children: [
                        (0, n.jsx)("div", {
                          className:
                            "h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0",
                          children: (0, n.jsx)(h, {
                            className: "h-5 w-5 text-primary",
                          }),
                        }),
                        (0, n.jsxs)("div", {
                          children: [
                            (0, n.jsx)(f.ZB, { children: e.title }),
                            (0, n.jsx)(f.BT, {
                              className: "mt-1",
                              children: e.description,
                            }),
                          ],
                        }),
                      ],
                    }),
                  }),
                  (0, n.jsx)(f.wL, {
                    className: "flex justify-end",
                    children: (0, n.jsx)(s.N, {
                      mode: "wait",
                      children: c
                        ? (0, n.jsxs)(
                            i.P.div,
                            {
                              initial: { opacity: 0, y: 10 },
                              animate: { opacity: 1, y: 0 },
                              exit: { opacity: 0 },
                              className:
                                "flex items-center gap-2 text-primary font-medium",
                              children: [
                                (0, n.jsx)(l.A, { size: 18 }),
                                " Completed",
                              ],
                            },
                            "completed",
                          )
                        : (0, n.jsxs)(
                            u.$,
                            {
                              onClick: m,
                              disabled: r,
                              className: "gap-2",
                              children: [
                                r ? "Processing..." : e.cta,
                                !r && (0, n.jsx)(o.A, { size: 16 }),
                              ],
                            },
                            "cta-button",
                          ),
                    }),
                  }),
                  c &&
                    (0, n.jsx)(i.P.div, {
                      initial: { opacity: 0 },
                      animate: { opacity: 1 },
                      className:
                        "absolute inset-0 bg-primary/5 pointer-events-none",
                    }),
                ],
              });
            },
            b = () => {
              let { onboarding: e, completeStep: t } = (0, m.z)(),
                [r, a] = (0, d.useState)(null),
                [o, h] = (0, d.useState)(!1),
                b = (0, c.Dv)("first-task"),
                v = (0, d.useMemo)(() => b?.tasks || [], [b]);
              (0, d.useEffect)(() => {
                v.length > 0 && !r && a(v[0].id);
              }, [v, r]);
              let g = (0, d.useCallback)(
                  async (e, r) => {
                    h(!0);
                    try {
                      await fetch("/api/onboarding/actions", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ actionKey: r, isCompleted: !0 }),
                      });
                    } catch (e) {
                      console.error(
                        `Failed to mark action ${r} as completed:`,
                        e,
                      );
                    }
                    setTimeout(() => t("first-task"), 1500);
                  },
                  [t],
                ),
                y =
                  e.isActive &&
                  "first-task" === e.currentStep &&
                  !e.hideForSession &&
                  !e.isCompleted;
              return y && b && 0 !== v.length
                ? (0, n.jsx)(s.N, {
                    children:
                      y &&
                      (0, n.jsx)("div", {
                        className:
                          "fixed inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm z-50 p-4",
                        children: (0, n.jsxs)(
                          i.P.div,
                          {
                            initial: { opacity: 0, scale: 0.95 },
                            animate: { opacity: 1, scale: 1 },
                            exit: { opacity: 0, scale: 0.9 },
                            className:
                              "bg-card border rounded-xl shadow-lg max-w-2xl w-full flex flex-col max-h-[90vh]",
                            children: [
                              (0, n.jsxs)(f.aR, {
                                children: [
                                  (0, n.jsx)(f.ZB, {
                                    className: "text-2xl",
                                    children: b.title,
                                  }),
                                  (0, n.jsx)(f.BT, {
                                    className: "text-base",
                                    children: b.description,
                                  }),
                                ],
                              }),
                              (0, n.jsx)(f.Wu, {
                                className: "flex-grow overflow-y-auto",
                                children: (0, n.jsxs)(p.Tabs, {
                                  value: r ?? "",
                                  onValueChange: (e) => {
                                    a(e);
                                  },
                                  className: "w-full",
                                  children: [
                                    (0, n.jsx)(p.TabsList, {
                                      className: `grid w-full grid-cols-${v.length} mb-6`,
                                      children: v.map((e) =>
                                        (0, n.jsxs)(
                                          p.TabsTrigger,
                                          {
                                            value: e.id,
                                            children: [
                                              e.title.split(" ")[0],
                                              " ",
                                            ],
                                          },
                                          e.id,
                                        ),
                                      ),
                                    }),
                                    v.map((e) =>
                                      (0, n.jsx)(
                                        p.TabsContent,
                                        {
                                          value: e.id,
                                          className: "mt-0",
                                          children: (0, n.jsx)(s.N, {
                                            mode: "wait",
                                            children: (0, n.jsx)(
                                              i.P.div,
                                              {
                                                initial: { opacity: 0, x: 20 },
                                                animate: { opacity: 1, x: 0 },
                                                exit: { opacity: 0, x: -20 },
                                                transition: { duration: 0.2 },
                                                children: (0, n.jsx)(x, {
                                                  task: e,
                                                  onComplete: g,
                                                }),
                                              },
                                              e.id,
                                            ),
                                          }),
                                        },
                                        e.id,
                                      ),
                                    ),
                                  ],
                                }),
                              }),
                              (0, n.jsxs)(f.wL, {
                                className:
                                  "flex justify-between border-t p-6 mt-auto",
                                children: [
                                  (0, n.jsx)(u.$, {
                                    variant: "ghost",
                                    onClick: () => t("first-task"),
                                    children: "Skip This Step",
                                  }),
                                  o &&
                                    (0, n.jsxs)(i.P.div, {
                                      initial: { opacity: 0, y: 10 },
                                      animate: { opacity: 1, y: 0 },
                                      className:
                                        "text-primary flex items-center gap-2",
                                      children: [
                                        (0, n.jsx)(l.A, { size: 16 }),
                                        (0, n.jsx)("span", {
                                          children:
                                            "Task Completed! Moving on...",
                                        }),
                                      ],
                                    }),
                                ],
                              }),
                            ],
                          },
                          "first-task-modal",
                        ),
                      }),
                  })
                : null;
            };
          a();
        } catch (e) {
          a(e);
        }
      });
    },
    59150: (e, t, r) => {
      r.d(t, { RG: () => w, bL: () => E, q7: () => D });
      var a = r(84205),
        n = r(28777),
        s = r(28029),
        i = r(71604),
        o = r(18047),
        l = r(42414),
        d = r(78593),
        c = r(10308),
        u = r(48705),
        f = r(7839),
        p = r(61268),
        m = "rovingFocusGroup.onEntryFocus",
        h = { bubbles: !1, cancelable: !0 },
        x = "RovingFocusGroup",
        [b, v, g] = (0, s.N)(x),
        [y, w] = (0, o.A)(x, [g]),
        [j, C] = y(x),
        N = a.forwardRef((e, t) =>
          (0, p.jsx)(b.Provider, {
            scope: e.__scopeRovingFocusGroup,
            children: (0, p.jsx)(b.Slot, {
              scope: e.__scopeRovingFocusGroup,
              children: (0, p.jsx)(R, { ...e, ref: t }),
            }),
          }),
        );
      N.displayName = x;
      var R = a.forwardRef((e, t) => {
          let {
              __scopeRovingFocusGroup: r,
              orientation: s,
              loop: o = !1,
              dir: l,
              currentTabStopId: b,
              defaultCurrentTabStopId: g,
              onCurrentTabStopIdChange: y,
              onEntryFocus: w,
              preventScrollOnEntryFocus: C = !1,
              ...N
            } = e,
            R = a.useRef(null),
            T = (0, i.s)(t, R),
            k = (0, f.jH)(l),
            [I, E] = (0, u.i)({
              prop: b,
              defaultProp: g ?? null,
              onChange: y,
              caller: x,
            }),
            [D, F] = a.useState(!1),
            S = (0, c.c)(w),
            P = v(r),
            L = a.useRef(!1),
            [M, z] = a.useState(0);
          return (
            a.useEffect(() => {
              let e = R.current;
              if (e)
                return (
                  e.addEventListener(m, S), () => e.removeEventListener(m, S)
                );
            }, [S]),
            (0, p.jsx)(j, {
              scope: r,
              orientation: s,
              dir: k,
              loop: o,
              currentTabStopId: I,
              onItemFocus: a.useCallback((e) => E(e), [E]),
              onItemShiftTab: a.useCallback(() => F(!0), []),
              onFocusableItemAdd: a.useCallback(() => z((e) => e + 1), []),
              onFocusableItemRemove: a.useCallback(() => z((e) => e - 1), []),
              children: (0, p.jsx)(d.sG.div, {
                tabIndex: D || 0 === M ? -1 : 0,
                "data-orientation": s,
                ...N,
                ref: T,
                style: { outline: "none", ...e.style },
                onMouseDown: (0, n.m)(e.onMouseDown, () => {
                  L.current = !0;
                }),
                onFocus: (0, n.m)(e.onFocus, (e) => {
                  let t = !L.current;
                  if (e.target === e.currentTarget && t && !D) {
                    let t = new CustomEvent(m, h);
                    if (
                      (e.currentTarget.dispatchEvent(t), !t.defaultPrevented)
                    ) {
                      let e = P().filter((e) => e.focusable);
                      A(
                        [
                          e.find((e) => e.active),
                          e.find((e) => e.id === I),
                          ...e,
                        ]
                          .filter(Boolean)
                          .map((e) => e.ref.current),
                        C,
                      );
                    }
                  }
                  L.current = !1;
                }),
                onBlur: (0, n.m)(e.onBlur, () => F(!1)),
              }),
            })
          );
        }),
        T = "RovingFocusGroupItem",
        k = a.forwardRef((e, t) => {
          let {
              __scopeRovingFocusGroup: r,
              focusable: s = !0,
              active: i = !1,
              tabStopId: o,
              children: c,
              ...u
            } = e,
            f = (0, l.B)(),
            m = o || f,
            h = C(T, r),
            x = h.currentTabStopId === m,
            g = v(r),
            {
              onFocusableItemAdd: y,
              onFocusableItemRemove: w,
              currentTabStopId: j,
            } = h;
          return (
            a.useEffect(() => {
              if (s) return y(), () => w();
            }, [s, y, w]),
            (0, p.jsx)(b.ItemSlot, {
              scope: r,
              id: m,
              focusable: s,
              active: i,
              children: (0, p.jsx)(d.sG.span, {
                tabIndex: x ? 0 : -1,
                "data-orientation": h.orientation,
                ...u,
                ref: t,
                onMouseDown: (0, n.m)(e.onMouseDown, (e) => {
                  s ? h.onItemFocus(m) : e.preventDefault();
                }),
                onFocus: (0, n.m)(e.onFocus, () => h.onItemFocus(m)),
                onKeyDown: (0, n.m)(e.onKeyDown, (e) => {
                  if ("Tab" === e.key && e.shiftKey)
                    return void h.onItemShiftTab();
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
                      return I[n];
                  })(e, h.orientation, h.dir);
                  if (void 0 !== t) {
                    if (e.metaKey || e.ctrlKey || e.altKey || e.shiftKey)
                      return;
                    e.preventDefault();
                    let r = g()
                      .filter((e) => e.focusable)
                      .map((e) => e.ref.current);
                    if ("last" === t) r.reverse();
                    else if ("prev" === t || "next" === t) {
                      "prev" === t && r.reverse();
                      let a = r.indexOf(e.currentTarget);
                      r = h.loop
                        ? (function (e, t) {
                            return e.map((r, a) => e[(t + a) % e.length]);
                          })(r, a + 1)
                        : r.slice(a + 1);
                    }
                    setTimeout(() => A(r));
                  }
                }),
                children:
                  "function" == typeof c
                    ? c({ isCurrentTabStop: x, hasTabStop: null != j })
                    : c,
              }),
            })
          );
        });
      k.displayName = T;
      var I = {
        ArrowLeft: "prev",
        ArrowUp: "prev",
        ArrowRight: "next",
        ArrowDown: "next",
        PageUp: "first",
        Home: "first",
        PageDown: "last",
        End: "last",
      };
      function A(e, t = !1) {
        let r = document.activeElement;
        for (let a of e)
          if (
            a === r ||
            (a.focus({ preventScroll: t }), document.activeElement !== r)
          )
            return;
      }
      var E = N,
        D = k;
    },
    65666: (e, t, r) => {
      r.d(t, { N: () => b });
      var a = r(61268),
        n = r(84205),
        s = r(420),
        i = r(95988),
        o = r(88924),
        l = r(26997);
      class d extends n.Component {
        getSnapshotBeforeUpdate(e) {
          let t = this.props.childRef.current;
          if (t && e.isPresent && !this.props.isPresent) {
            let e = this.props.sizeRef.current;
            (e.height = t.offsetHeight || 0),
              (e.width = t.offsetWidth || 0),
              (e.top = t.offsetTop),
              (e.left = t.offsetLeft);
          }
          return null;
        }
        componentDidUpdate() {}
        render() {
          return this.props.children;
        }
      }
      function c({ children: e, isPresent: t }) {
        let r = (0, n.useId)(),
          s = (0, n.useRef)(null),
          i = (0, n.useRef)({ width: 0, height: 0, top: 0, left: 0 }),
          { nonce: o } = (0, n.useContext)(l.Q);
        return (
          (0, n.useInsertionEffect)(() => {
            let { width: e, height: a, top: n, left: l } = i.current;
            if (t || !s.current || !e || !a) return;
            s.current.dataset.motionPopId = r;
            let d = document.createElement("style");
            return (
              o && (d.nonce = o),
              document.head.appendChild(d),
              d.sheet &&
                d.sheet.insertRule(`
          [data-motion-pop-id="${r}"] {
            position: absolute !important;
            width: ${e}px !important;
            height: ${a}px !important;
            top: ${n}px !important;
            left: ${l}px !important;
          }
        `),
              () => {
                document.head.removeChild(d);
              }
            );
          }, [t]),
          (0, a.jsx)(d, {
            isPresent: t,
            childRef: s,
            sizeRef: i,
            children: n.cloneElement(e, { ref: s }),
          })
        );
      }
      let u = ({
        children: e,
        initial: t,
        isPresent: r,
        onExitComplete: s,
        custom: l,
        presenceAffectsLayout: d,
        mode: u,
      }) => {
        let p = (0, i.M)(f),
          m = (0, n.useId)(),
          h = (0, n.useCallback)(
            (e) => {
              for (let t of (p.set(e, !0), p.values())) if (!t) return;
              s && s();
            },
            [p, s],
          ),
          x = (0, n.useMemo)(
            () => ({
              id: m,
              initial: t,
              isPresent: r,
              custom: l,
              onExitComplete: h,
              register: (e) => (p.set(e, !1), () => p.delete(e)),
            }),
            d ? [Math.random(), h] : [r, h],
          );
        return (
          (0, n.useMemo)(() => {
            p.forEach((e, t) => p.set(t, !1));
          }, [r]),
          n.useEffect(() => {
            r || p.size || !s || s();
          }, [r]),
          "popLayout" === u &&
            (e = (0, a.jsx)(c, { isPresent: r, children: e })),
          (0, a.jsx)(o.t.Provider, { value: x, children: e })
        );
      };
      function f() {
        return new Map();
      }
      var p = r(57751);
      let m = (e) => e.key || "";
      function h(e) {
        let t = [];
        return (
          n.Children.forEach(e, (e) => {
            (0, n.isValidElement)(e) && t.push(e);
          }),
          t
        );
      }
      var x = r(61267);
      let b = ({
        children: e,
        custom: t,
        initial: r = !0,
        onExitComplete: o,
        presenceAffectsLayout: l = !0,
        mode: d = "sync",
        propagate: c = !1,
      }) => {
        let [f, b] = (0, p.xQ)(c),
          v = (0, n.useMemo)(() => h(e), [e]),
          g = c && !f ? [] : v.map(m),
          y = (0, n.useRef)(!0),
          w = (0, n.useRef)(v),
          j = (0, i.M)(() => new Map()),
          [C, N] = (0, n.useState)(v),
          [R, T] = (0, n.useState)(v);
        (0, x.E)(() => {
          (y.current = !1), (w.current = v);
          for (let e = 0; e < R.length; e++) {
            let t = m(R[e]);
            g.includes(t) ? j.delete(t) : !0 !== j.get(t) && j.set(t, !1);
          }
        }, [R, g.length, g.join("-")]);
        let k = [];
        if (v !== C) {
          let e = [...v];
          for (let t = 0; t < R.length; t++) {
            let r = R[t],
              a = m(r);
            g.includes(a) || (e.splice(t, 0, r), k.push(r));
          }
          "wait" === d && k.length && (e = k), T(h(e)), N(v);
          return;
        }
        let { forceRender: I } = (0, n.useContext)(s.L);
        return (0, a.jsx)(a.Fragment, {
          children: R.map((e) => {
            let n = m(e),
              s = (!c || !!f) && (v === R || g.includes(n));
            return (0, a.jsx)(
              u,
              {
                isPresent: s,
                initial: (!y.current || !!r) && void 0,
                custom: s ? void 0 : t,
                presenceAffectsLayout: l,
                mode: d,
                onExitComplete: s
                  ? void 0
                  : () => {
                      if (!j.has(n)) return;
                      j.set(n, !0);
                      let e = !0;
                      j.forEach((t) => {
                        t || (e = !1);
                      }),
                        e &&
                          (null == I || I(),
                          T(w.current),
                          c && (null == b || b()),
                          o && o());
                    },
                children: e,
              },
              n,
            );
          }),
        });
      };
    },
    77001: (e, t, r) => {
      r.a(e, async (e, a) => {
        try {
          r.d(t, {
            Tabs: () => l,
            TabsContent: () => u,
            TabsList: () => d,
            TabsTrigger: () => c,
          });
          var n = r(61268),
            s = r(28366);
          r(84205);
          var i = r(15942),
            o = e([i]);
          function l({ className: e, ...t }) {
            return (0, n.jsx)(s.bL, {
              "data-slot": "tabs",
              className: (0, i.cn)("flex flex-col gap-2", e),
              ...t,
            });
          }
          function d({ className: e, ...t }) {
            return (0, n.jsx)(s.B8, {
              "data-slot": "tabs-list",
              className: (0, i.cn)(
                "bg-muted text-muted-foreground inline-flex h-9 w-fit items-center justify-center rounded-lg p-[3px]",
                e,
              ),
              ...t,
            });
          }
          function c({ className: e, ...t }) {
            return (0, n.jsx)(s.l9, {
              "data-slot": "tabs-trigger",
              className: (0, i.cn)(
                "data-[state=active]:bg-background dark:data-[state=active]:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:outline-ring dark:data-[state=active]:border-input dark:data-[state=active]:bg-input/30 text-foreground dark:text-muted-foreground inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-md border border-transparent px-2 py-1 text-sm font-medium whitespace-nowrap transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:shadow-sm [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
                e,
              ),
              ...t,
            });
          }
          function u({ className: e, ...t }) {
            return (0, n.jsx)(s.UC, {
              "data-slot": "tabs-content",
              className: (0, i.cn)("flex-1 outline-none", e),
              ...t,
            });
          }
          (i = (o.then ? (await o)() : o)[0]), a();
        } catch (e) {
          a(e);
        }
      });
    },
    98683: (e, t, r) => {
      r.d(t, { A: () => a });
      let a = (0, r(95255).A)("CheckCircle2", [
        ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
        ["path", { d: "m9 12 2 2 4-4", key: "dzmm74" }],
      ]);
    },
  });
//# sourceMappingURL=7414.js.map
