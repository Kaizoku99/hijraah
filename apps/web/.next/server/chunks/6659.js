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
    (e._sentryDebugIds[t] = "03f8730c-1cb6-44b0-9899-10abbfcb919b"),
    (e._sentryDebugIdIdentifier =
      "sentry-dbid-03f8730c-1cb6-44b0-9899-10abbfcb919b"));
} catch (e) {}
("use strict");
(exports.id = 6659),
  (exports.ids = [6659]),
  (exports.modules = {
    6659: (e, t, n) => {
      n.a(e, async (e, r) => {
        try {
          n.r(t), n.d(t, { FeatureTour: () => y });
          var l = n(61268),
            s = n(63728),
            i = n(23174),
            o = n(61966),
            u = n(65666),
            a = n(6130),
            c = n(90495),
            d = n(10056),
            f = n(12335),
            m = n(84205),
            h = n(90304),
            p = n(16951),
            g = n(28909),
            x = n(67135),
            v = e([g]);
          g = (v.then ? (await v)() : v)[0];
          let b = () => p.Zj.find((e) => "feature-tour" === e.id),
            y = () => {
              let {
                  onboarding: e,
                  completeStep: t,
                  skipOnboarding: n,
                } = (0, x.z)(),
                [r, p] = (0, m.useState)(0),
                [v, y] = (0, m.useState)(null),
                w = (0, m.useRef)(null),
                R = b(),
                C = R?.tourStops,
                j =
                  e.isActive &&
                  "feature-tour" === e.currentStep &&
                  !e.hideForSession &&
                  !e.isCompleted,
                E = C ? C[r] : void 0,
                {
                  refs: S,
                  floatingStyles: M,
                  placement: N,
                  middlewareData: k,
                } = (0, s.we)({
                  placement: E?.placement || "bottom",
                  open: j && !!v,
                  middleware: [
                    (0, i.cY)(10),
                    (0, i.UU)(),
                    (0, i.BN)({ padding: 8 }),
                    (0, i.UE)({ element: w }),
                  ],
                  whileElementsMounted: (e, t, n) =>
                    (0, o.ll)(e, t, n, {
                      ancestorScroll: !0,
                      ancestorResize: !0,
                      elementResize: !0,
                    }),
                });
              if (
                ((0, m.useEffect)(() => {
                  if (!j || !E) return void y(null);
                  let e = document.querySelector(E.target);
                  return (
                    y(e),
                    e &&
                      ((e.style.outline = "2px solid var(--primary)"),
                      (e.style.outlineOffset = "2px"),
                      (e.style.borderRadius = "4px"),
                      e.scrollIntoView({
                        behavior: "smooth",
                        block: "center",
                        inline: "nearest",
                      })),
                    () => {
                      e &&
                        ((e.style.outline = ""),
                        (e.style.outlineOffset = ""),
                        (e.style.borderRadius = "")),
                        C?.forEach((e) => {
                          let t = document.querySelector(e.target);
                          t &&
                            ((t.style.outline = ""),
                            (t.style.outlineOffset = ""),
                            (t.style.borderRadius = ""));
                        });
                    }
                  );
                }, [j, E, C]),
                (0, m.useEffect)(() => {
                  S.setReference(v);
                }, [v, S]),
                !j || !E || !v)
              )
                return null;
              let { x: z, y: A } = k.arrow || {},
                I =
                  {
                    top: "bottom",
                    right: "left",
                    bottom: "top",
                    left: "right",
                  }[N.split("-")[0]] || "bottom";
              return (0, h.createPortal)(
                (0, l.jsx)(u.N, {
                  children:
                    j &&
                    (0, l.jsxs)(a.P.div, {
                      ref: S.setFloating,
                      style: M,
                      initial: { opacity: 0, scale: 0.9 },
                      animate: { opacity: 1, scale: 1 },
                      exit: { opacity: 0, scale: 0.9 },
                      transition: { duration: 0.2 },
                      className:
                        "bg-card border shadow-lg rounded-lg p-4 w-[320px] z-[9999]",
                      children: [
                        (0, l.jsx)("svg", {
                          ref: w,
                          width: "16",
                          height: "8",
                          viewBox: "0 0 16 8",
                          style: {
                            position: "absolute",
                            left: null != z ? `${z}px` : "",
                            top: null != A ? `${A}px` : "",
                            [I]: "-8px",
                          },
                          className: "fill-current text-card block",
                          children: (0, l.jsx)("path", {
                            d: "M0 8 L8 0 L16 8 Z",
                          }),
                        }),
                        (0, l.jsx)("div", {
                          className: "absolute right-2 top-2",
                          children: (0, l.jsx)(g.$, {
                            variant: "ghost",
                            size: "icon",
                            className: "h-6 w-6",
                            onClick: () => {
                              n();
                            },
                            "aria-label": "Skip Tour",
                            children: (0, l.jsx)(c.A, { size: 16 }),
                          }),
                        }),
                        (0, l.jsxs)("div", {
                          className: "mb-4 pr-6",
                          children: [
                            " ",
                            (0, l.jsx)("h3", {
                              className: "font-semibold text-lg",
                              children: E.title,
                            }),
                            (0, l.jsx)("p", {
                              className: "text-sm text-muted-foreground mt-1",
                              children: E.content,
                            }),
                          ],
                        }),
                        (0, l.jsxs)("div", {
                          className: "flex items-center justify-between mt-4",
                          children: [
                            (0, l.jsx)("div", {
                              className: "flex items-center space-x-2",
                              children:
                                C &&
                                Array.from({ length: C.length }).map((e, t) =>
                                  (0, l.jsx)(
                                    "div",
                                    {
                                      className: `h-1.5 w-1.5 rounded-full transition-colors duration-200 ${t === r ? "bg-primary" : "bg-muted"}`,
                                    },
                                    t,
                                  ),
                                ),
                            }),
                            (0, l.jsxs)("div", {
                              className: "flex items-center space-x-2",
                              children: [
                                (0, l.jsxs)(g.$, {
                                  variant: "outline",
                                  size: "sm",
                                  onClick: () => {
                                    r > 0 && p(r - 1);
                                  },
                                  disabled: 0 === r,
                                  className: "h-8",
                                  children: [
                                    (0, l.jsx)(d.A, {
                                      size: 16,
                                      className: "mr-1",
                                    }),
                                    "Previous",
                                  ],
                                }),
                                (0, l.jsxs)(g.$, {
                                  variant: "default",
                                  size: "sm",
                                  onClick: () => {
                                    C && r < C.length - 1
                                      ? p(r + 1)
                                      : t("feature-tour");
                                  },
                                  className: "h-8",
                                  children: [
                                    C && r === C.length - 1 ? "Finish" : "Next",
                                    C &&
                                      r < C.length - 1 &&
                                      (0, l.jsx)(f.A, {
                                        size: 16,
                                        className: "ml-1",
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
                document.body,
              );
            };
          r();
        } catch (e) {
          r(e);
        }
      });
    },
    10056: (e, t, n) => {
      n.d(t, { A: () => r });
      let r = (0, n(95255).A)("ChevronLeft", [
        ["path", { d: "m15 18-6-6 6-6", key: "1wnfg3" }],
      ]);
    },
    63728: (e, t, n) => {
      n.d(t, { we: () => D });
      var r,
        l = n(84205),
        s = n(83850);
      n(90304);
      var i = n(23174);
      let o = { ...(r || (r = n.t(l, 2))) },
        u = o.useInsertionEffect || ((e) => e()),
        a = "ArrowUp",
        c = "ArrowDown",
        d = "ArrowLeft",
        f = "ArrowRight";
      function m(e, t) {
        let {
            startingIndex: n = -1,
            decrement: r = !1,
            disabledIndices: l,
            amount: s = 1,
          } = void 0 === t ? {} : t,
          i = e.current,
          o = n;
        do o += r ? -s : s;
        while (
          o >= 0 &&
          o <= i.length - 1 &&
          (function (e, t, n) {
            if (n) return n.includes(t);
            let r = e[t];
            return (
              null == r ||
              r.hasAttribute("disabled") ||
              "true" === r.getAttribute("aria-disabled")
            );
          })(i, o, l)
        );
        return o;
      }
      var h = "undefined" != typeof document ? l.useLayoutEffect : l.useEffect;
      let p = !1,
        g = 0,
        x = () => "floating-ui-" + Math.random().toString(36).slice(2, 6) + g++,
        v =
          o.useId ||
          function () {
            let [e, t] = l.useState(() => (p ? x() : void 0));
            return (
              h(() => {
                null == e && t(x());
              }, []),
              l.useEffect(() => {
                p = !0;
              }, []),
              e
            );
          },
        b = l.createContext(null),
        y = l.createContext(null),
        w = () => {
          var e;
          return (null == (e = l.useContext(b)) ? void 0 : e.id) || null;
        },
        R = () => l.useContext(y),
        C = () => {},
        j = l.createContext({
          delay: 0,
          initialDelay: 0,
          timeoutMs: 0,
          currentId: null,
          setCurrentId: C,
          setState: C,
          isInstantPhase: !1,
        }),
        E = 0,
        S = new WeakMap(),
        M = new WeakSet(),
        N = {},
        k = 0,
        z = (e) => e && (e.host || z(e.parentNode)),
        A = (e, t) =>
          t
            .map((t) => {
              if (e.contains(t)) return t;
              let n = z(t);
              return e.contains(n) ? n : null;
            })
            .filter((e) => null != e),
        I = () => ({
          getShadowRoot: !0,
          displayCheck:
            "function" == typeof ResizeObserver &&
            ResizeObserver.toString().includes("[native code]")
              ? "full"
              : "none",
        });
      function P(e, t) {
        let n = tabbable(e, I());
        "prev" === t && n.reverse();
        let r = n.indexOf(activeElement(getDocument(e)));
        return n.slice(r + 1)[0];
      }
      let $ = "data-floating-ui-focusable",
        L = null;
      function D(e) {
        void 0 === e && (e = {});
        let { nodeId: t } = e,
          n = (function (e) {
            let { open: t = !1, onOpenChange: n, elements: r } = e,
              s = v(),
              i = l.useRef({}),
              [o] = l.useState(() =>
                (function () {
                  let e = new Map();
                  return {
                    emit(t, n) {
                      var r;
                      null == (r = e.get(t)) || r.forEach((e) => e(n));
                    },
                    on(t, n) {
                      e.set(t, [...(e.get(t) || []), n]);
                    },
                    off(t, n) {
                      var r;
                      e.set(
                        t,
                        (null == (r = e.get(t))
                          ? void 0
                          : r.filter((e) => e !== n)) || [],
                      );
                    },
                  };
                })(),
              ),
              a = null != w(),
              [c, d] = l.useState(r.reference),
              f = (function (e) {
                let t = l.useRef(() => {});
                return (
                  u(() => {
                    t.current = e;
                  }),
                  l.useCallback(function () {
                    for (
                      var e = arguments.length, n = Array(e), r = 0;
                      r < e;
                      r++
                    )
                      n[r] = arguments[r];
                    return null == t.current ? void 0 : t.current(...n);
                  }, [])
                );
              })((e, t, r) => {
                (i.current.openEvent = e ? t : void 0),
                  o.emit("openchange", {
                    open: e,
                    event: t,
                    reason: r,
                    nested: a,
                  }),
                  null == n || n(e, t, r);
              }),
              m = l.useMemo(() => ({ setPositionReference: d }), []),
              h = l.useMemo(
                () => ({
                  reference: c || r.reference || null,
                  floating: r.floating || null,
                  domReference: r.reference,
                }),
                [c, r.reference, r.floating],
              );
            return l.useMemo(
              () => ({
                dataRef: i,
                open: t,
                onOpenChange: f,
                elements: h,
                events: o,
                floatingId: s,
                refs: m,
              }),
              [t, f, h, o, s, m],
            );
          })({
            ...e,
            elements: { reference: null, floating: null, ...e.elements },
          }),
          r = e.rootContext || n,
          o = r.elements,
          [a, c] = l.useState(null),
          [d, f] = l.useState(null),
          m = (null == o ? void 0 : o.domReference) || a,
          p = l.useRef(null),
          g = R();
        h(() => {
          m && (p.current = m);
        }, [m]);
        let x = (0, i.we)({
            ...e,
            elements: { ...o, ...(d && { reference: d }) },
          }),
          b = l.useCallback(
            (e) => {
              let t = (0, s.vq)(e)
                ? {
                    getBoundingClientRect: () => e.getBoundingClientRect(),
                    contextElement: e,
                  }
                : e;
              f(t), x.refs.setReference(t);
            },
            [x.refs],
          ),
          y = l.useCallback(
            (e) => {
              ((0, s.vq)(e) || null === e) && ((p.current = e), c(e)),
                ((0, s.vq)(x.refs.reference.current) ||
                  null === x.refs.reference.current ||
                  (null !== e && !(0, s.vq)(e))) &&
                  x.refs.setReference(e);
            },
            [x.refs],
          ),
          C = l.useMemo(
            () => ({
              ...x.refs,
              setReference: y,
              setPositionReference: b,
              domReference: p,
            }),
            [x.refs, y, b],
          ),
          j = l.useMemo(
            () => ({ ...x.elements, domReference: m }),
            [x.elements, m],
          ),
          E = l.useMemo(
            () => ({ ...x, ...r, refs: C, elements: j, nodeId: t }),
            [x, C, j, t, r],
          );
        return (
          h(() => {
            r.dataRef.current.floatingContext = E;
            let e =
              null == g ? void 0 : g.nodesRef.current.find((e) => e.id === t);
            e && (e.context = E);
          }),
          l.useMemo(
            () => ({ ...x, context: E, refs: C, elements: j }),
            [x, C, j, E],
          )
        );
      }
      let O = "active",
        q = "selected";
      function U(e, t, n) {
        switch (e) {
          case "vertical":
            return t;
          case "horizontal":
            return n;
          default:
            return t || n;
        }
      }
    },
    65666: (e, t, n) => {
      n.d(t, { N: () => x });
      var r = n(61268),
        l = n(84205),
        s = n(420),
        i = n(95988),
        o = n(88924),
        u = n(26997);
      class a extends l.Component {
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
        let n = (0, l.useId)(),
          s = (0, l.useRef)(null),
          i = (0, l.useRef)({ width: 0, height: 0, top: 0, left: 0 }),
          { nonce: o } = (0, l.useContext)(u.Q);
        return (
          (0, l.useInsertionEffect)(() => {
            let { width: e, height: r, top: l, left: u } = i.current;
            if (t || !s.current || !e || !r) return;
            s.current.dataset.motionPopId = n;
            let a = document.createElement("style");
            return (
              o && (a.nonce = o),
              document.head.appendChild(a),
              a.sheet &&
                a.sheet.insertRule(`
          [data-motion-pop-id="${n}"] {
            position: absolute !important;
            width: ${e}px !important;
            height: ${r}px !important;
            top: ${l}px !important;
            left: ${u}px !important;
          }
        `),
              () => {
                document.head.removeChild(a);
              }
            );
          }, [t]),
          (0, r.jsx)(a, {
            isPresent: t,
            childRef: s,
            sizeRef: i,
            children: l.cloneElement(e, { ref: s }),
          })
        );
      }
      let d = ({
        children: e,
        initial: t,
        isPresent: n,
        onExitComplete: s,
        custom: u,
        presenceAffectsLayout: a,
        mode: d,
      }) => {
        let m = (0, i.M)(f),
          h = (0, l.useId)(),
          p = (0, l.useCallback)(
            (e) => {
              for (let t of (m.set(e, !0), m.values())) if (!t) return;
              s && s();
            },
            [m, s],
          ),
          g = (0, l.useMemo)(
            () => ({
              id: h,
              initial: t,
              isPresent: n,
              custom: u,
              onExitComplete: p,
              register: (e) => (m.set(e, !1), () => m.delete(e)),
            }),
            a ? [Math.random(), p] : [n, p],
          );
        return (
          (0, l.useMemo)(() => {
            m.forEach((e, t) => m.set(t, !1));
          }, [n]),
          l.useEffect(() => {
            n || m.size || !s || s();
          }, [n]),
          "popLayout" === d &&
            (e = (0, r.jsx)(c, { isPresent: n, children: e })),
          (0, r.jsx)(o.t.Provider, { value: g, children: e })
        );
      };
      function f() {
        return new Map();
      }
      var m = n(57751);
      let h = (e) => e.key || "";
      function p(e) {
        let t = [];
        return (
          l.Children.forEach(e, (e) => {
            (0, l.isValidElement)(e) && t.push(e);
          }),
          t
        );
      }
      var g = n(61267);
      let x = ({
        children: e,
        custom: t,
        initial: n = !0,
        onExitComplete: o,
        presenceAffectsLayout: u = !0,
        mode: a = "sync",
        propagate: c = !1,
      }) => {
        let [f, x] = (0, m.xQ)(c),
          v = (0, l.useMemo)(() => p(e), [e]),
          b = c && !f ? [] : v.map(h),
          y = (0, l.useRef)(!0),
          w = (0, l.useRef)(v),
          R = (0, i.M)(() => new Map()),
          [C, j] = (0, l.useState)(v),
          [E, S] = (0, l.useState)(v);
        (0, g.E)(() => {
          (y.current = !1), (w.current = v);
          for (let e = 0; e < E.length; e++) {
            let t = h(E[e]);
            b.includes(t) ? R.delete(t) : !0 !== R.get(t) && R.set(t, !1);
          }
        }, [E, b.length, b.join("-")]);
        let M = [];
        if (v !== C) {
          let e = [...v];
          for (let t = 0; t < E.length; t++) {
            let n = E[t],
              r = h(n);
            b.includes(r) || (e.splice(t, 0, n), M.push(n));
          }
          "wait" === a && M.length && (e = M), S(p(e)), j(v);
          return;
        }
        let { forceRender: N } = (0, l.useContext)(s.L);
        return (0, r.jsx)(r.Fragment, {
          children: E.map((e) => {
            let l = h(e),
              s = (!c || !!f) && (v === E || b.includes(l));
            return (0, r.jsx)(
              d,
              {
                isPresent: s,
                initial: (!y.current || !!n) && void 0,
                custom: s ? void 0 : t,
                presenceAffectsLayout: u,
                mode: a,
                onExitComplete: s
                  ? void 0
                  : () => {
                      if (!R.has(l)) return;
                      R.set(l, !0);
                      let e = !0;
                      R.forEach((t) => {
                        t || (e = !1);
                      }),
                        e &&
                          (null == N || N(),
                          S(w.current),
                          c && (null == x || x()),
                          o && o());
                    },
                children: e,
              },
              l,
            );
          }),
        });
      };
    },
  });
//# sourceMappingURL=6659.js.map
