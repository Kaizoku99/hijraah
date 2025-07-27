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
    (e._sentryDebugIds[t] = "d13a94c2-e6b9-4d26-aaa9-d59977b7f7f5"),
    (e._sentryDebugIdIdentifier =
      "sentry-dbid-d13a94c2-e6b9-4d26-aaa9-d59977b7f7f5"));
} catch (e) {}
("use strict");
(exports.id = 6867),
  (exports.ids = [6867]),
  (exports.modules = {
    415: (e, t, r) => {
      r.d(t, { A: () => n });
      let n = (0, r(95255).A)("Check", [
        ["path", { d: "M20 6 9 17l-5-5", key: "1gmf2c" }],
      ]);
    },
    81242: (e, t, r) => {
      r.d(t, {
        UC: () => eD,
        YJ: () => eL,
        In: () => eE,
        q7: () => eH,
        VF: () => eB,
        p4: () => e_,
        JU: () => eA,
        ZL: () => eP,
        bL: () => eI,
        wv: () => eV,
        l9: () => eR,
        WT: () => eN,
        LM: () => eM,
      });
      var n = r(84205),
        l = r(90304);
      function o(e, [t, r]) {
        return Math.min(r, Math.max(t, e));
      }
      var a = r(28777),
        i = r(15016),
        s = r(79744),
        d = r(14072),
        u = r(68476),
        c = r(67400),
        p = r(10897),
        f = r(12447),
        h = r(66257),
        v = r(80434),
        m = r(85660),
        g = r(56558),
        w = r(86415),
        x = r(21899),
        y = r(15359),
        b = r(37155),
        S = r(1278),
        C = r(73460),
        j = r(3205),
        T = r(61268),
        k = [" ", "Enter", "ArrowUp", "ArrowDown"],
        I = [" ", "Enter"],
        R = "Select",
        [N, E, P] = (0, i.N)(R),
        [D, M] = (0, d.A)(R, [P, v.Bk]),
        L = (0, v.Bk)(),
        [A, H] = D(R),
        [_, B] = D(R),
        V = (e) => {
          let {
              __scopeSelect: t,
              children: r,
              open: l,
              defaultOpen: o,
              onOpenChange: a,
              value: i,
              defaultValue: s,
              onValueChange: d,
              dir: c,
              name: p,
              autoComplete: f,
              disabled: m,
              required: g,
              form: w,
            } = e,
            x = L(t),
            [b, S] = n.useState(null),
            [C, j] = n.useState(null),
            [k, I] = n.useState(!1),
            E = (0, u.jH)(c),
            [P, D] = (0, y.i)({
              prop: l,
              defaultProp: o ?? !1,
              onChange: a,
              caller: R,
            }),
            [M, H] = (0, y.i)({
              prop: i,
              defaultProp: s,
              onChange: d,
              caller: R,
            }),
            B = n.useRef(null),
            V = !b || w || !!b.closest("form"),
            [G, F] = n.useState(new Set()),
            K = Array.from(G)
              .map((e) => e.props.value)
              .join(";");
          return (0, T.jsx)(v.bL, {
            ...x,
            children: (0, T.jsxs)(A, {
              required: g,
              scope: t,
              trigger: b,
              onTriggerChange: S,
              valueNode: C,
              onValueNodeChange: j,
              valueNodeHasChildren: k,
              onValueNodeHasChildrenChange: I,
              contentId: (0, h.B)(),
              value: M,
              onValueChange: H,
              open: P,
              onOpenChange: D,
              dir: E,
              triggerPointerDownPosRef: B,
              disabled: m,
              children: [
                (0, T.jsx)(N.Provider, {
                  scope: t,
                  children: (0, T.jsx)(_, {
                    scope: e.__scopeSelect,
                    onNativeOptionAdd: n.useCallback((e) => {
                      F((t) => new Set(t).add(e));
                    }, []),
                    onNativeOptionRemove: n.useCallback((e) => {
                      F((t) => {
                        let r = new Set(t);
                        return r.delete(e), r;
                      });
                    }, []),
                    children: r,
                  }),
                }),
                V
                  ? (0, T.jsxs)(
                      eC,
                      {
                        "aria-hidden": !0,
                        required: g,
                        tabIndex: -1,
                        name: p,
                        autoComplete: f,
                        value: M,
                        onChange: (e) => H(e.target.value),
                        disabled: m,
                        form: w,
                        children: [
                          void 0 === M
                            ? (0, T.jsx)("option", { value: "" })
                            : null,
                          Array.from(G),
                        ],
                      },
                      K,
                    )
                  : null,
              ],
            }),
          });
        };
      V.displayName = R;
      var G = "SelectTrigger",
        F = n.forwardRef((e, t) => {
          let { __scopeSelect: r, disabled: l = !1, ...o } = e,
            i = L(r),
            d = H(G, r),
            u = d.disabled || l,
            c = (0, s.s)(t, d.onTriggerChange),
            p = E(r),
            f = n.useRef("touch"),
            [h, m, w] = eT((e) => {
              let t = p().filter((e) => !e.disabled),
                r = t.find((e) => e.value === d.value),
                n = ek(t, e, r);
              void 0 !== n && d.onValueChange(n.value);
            }),
            x = (e) => {
              u || (d.onOpenChange(!0), w()),
                e &&
                  (d.triggerPointerDownPosRef.current = {
                    x: Math.round(e.pageX),
                    y: Math.round(e.pageY),
                  });
            };
          return (0, T.jsx)(v.Mz, {
            asChild: !0,
            ...i,
            children: (0, T.jsx)(g.sG.button, {
              type: "button",
              role: "combobox",
              "aria-controls": d.contentId,
              "aria-expanded": d.open,
              "aria-required": d.required,
              "aria-autocomplete": "none",
              dir: d.dir,
              "data-state": d.open ? "open" : "closed",
              disabled: u,
              "data-disabled": u ? "" : void 0,
              "data-placeholder": ej(d.value) ? "" : void 0,
              ...o,
              ref: c,
              onClick: (0, a.m)(o.onClick, (e) => {
                e.currentTarget.focus(), "mouse" !== f.current && x(e);
              }),
              onPointerDown: (0, a.m)(o.onPointerDown, (e) => {
                f.current = e.pointerType;
                let t = e.target;
                t.hasPointerCapture(e.pointerId) &&
                  t.releasePointerCapture(e.pointerId),
                  0 === e.button &&
                    !1 === e.ctrlKey &&
                    "mouse" === e.pointerType &&
                    (x(e), e.preventDefault());
              }),
              onKeyDown: (0, a.m)(o.onKeyDown, (e) => {
                let t = "" !== h.current;
                e.ctrlKey ||
                  e.altKey ||
                  e.metaKey ||
                  1 !== e.key.length ||
                  m(e.key),
                  (!t || " " !== e.key) &&
                    k.includes(e.key) &&
                    (x(), e.preventDefault());
              }),
            }),
          });
        });
      F.displayName = G;
      var K = "SelectValue",
        O = n.forwardRef((e, t) => {
          let {
              __scopeSelect: r,
              className: n,
              style: l,
              children: o,
              placeholder: a = "",
              ...i
            } = e,
            d = H(K, r),
            { onValueNodeHasChildrenChange: u } = d,
            c = void 0 !== o,
            p = (0, s.s)(t, d.onValueNodeChange);
          return (
            (0, b.N)(() => {
              u(c);
            }, [u, c]),
            (0, T.jsx)(g.sG.span, {
              ...i,
              ref: p,
              style: { pointerEvents: "none" },
              children: ej(d.value)
                ? (0, T.jsx)(T.Fragment, { children: a })
                : o,
            })
          );
        });
      O.displayName = K;
      var U = n.forwardRef((e, t) => {
        let { __scopeSelect: r, children: n, ...l } = e;
        return (0, T.jsx)(g.sG.span, {
          "aria-hidden": !0,
          ...l,
          ref: t,
          children: n || "▼",
        });
      });
      U.displayName = "SelectIcon";
      var W = (e) => (0, T.jsx)(m.Z, { asChild: !0, ...e });
      W.displayName = "SelectPortal";
      var z = "SelectContent",
        q = n.forwardRef((e, t) => {
          let r = H(z, e.__scopeSelect),
            [o, a] = n.useState();
          return ((0, b.N)(() => {
            a(new DocumentFragment());
          }, []),
          r.open)
            ? (0, T.jsx)(X, { ...e, ref: t })
            : o
              ? l.createPortal(
                  (0, T.jsx)(Y, {
                    scope: e.__scopeSelect,
                    children: (0, T.jsx)(N.Slot, {
                      scope: e.__scopeSelect,
                      children: (0, T.jsx)("div", { children: e.children }),
                    }),
                  }),
                  o,
                )
              : null;
        });
      q.displayName = z;
      var [Y, Z] = D(z),
        J = (0, w.TL)("SelectContent.RemoveScroll"),
        X = n.forwardRef((e, t) => {
          let {
              __scopeSelect: r,
              position: l = "item-aligned",
              onCloseAutoFocus: o,
              onEscapeKeyDown: i,
              onPointerDownOutside: d,
              side: u,
              sideOffset: h,
              align: v,
              alignOffset: m,
              arrowPadding: g,
              collisionBoundary: w,
              collisionPadding: x,
              sticky: y,
              hideWhenDetached: b,
              avoidCollisions: S,
              ...k
            } = e,
            I = H(z, r),
            [R, N] = n.useState(null),
            [P, D] = n.useState(null),
            M = (0, s.s)(t, (e) => N(e)),
            [L, A] = n.useState(null),
            [_, B] = n.useState(null),
            V = E(r),
            [G, F] = n.useState(!1),
            K = n.useRef(!1);
          n.useEffect(() => {
            if (R) return (0, C.Eq)(R);
          }, [R]),
            (0, p.Oh)();
          let O = n.useCallback(
              (e) => {
                let [t, ...r] = V().map((e) => e.ref.current),
                  [n] = r.slice(-1),
                  l = document.activeElement;
                for (let r of e)
                  if (
                    r === l ||
                    (r?.scrollIntoView({ block: "nearest" }),
                    r === t && P && (P.scrollTop = 0),
                    r === n && P && (P.scrollTop = P.scrollHeight),
                    r?.focus(),
                    document.activeElement !== l)
                  )
                    return;
              },
              [V, P],
            ),
            U = n.useCallback(() => O([L, R]), [O, L, R]);
          n.useEffect(() => {
            G && U();
          }, [G, U]);
          let { onOpenChange: W, triggerPointerDownPosRef: q } = I;
          n.useEffect(() => {
            if (R) {
              let e = { x: 0, y: 0 },
                t = (t) => {
                  e = {
                    x: Math.abs(Math.round(t.pageX) - (q.current?.x ?? 0)),
                    y: Math.abs(Math.round(t.pageY) - (q.current?.y ?? 0)),
                  };
                },
                r = (r) => {
                  e.x <= 10 && e.y <= 10
                    ? r.preventDefault()
                    : R.contains(r.target) || W(!1),
                    document.removeEventListener("pointermove", t),
                    (q.current = null);
                };
              return (
                null !== q.current &&
                  (document.addEventListener("pointermove", t),
                  document.addEventListener("pointerup", r, {
                    capture: !0,
                    once: !0,
                  })),
                () => {
                  document.removeEventListener("pointermove", t),
                    document.removeEventListener("pointerup", r, {
                      capture: !0,
                    });
                }
              );
            }
          }, [R, W, q]),
            n.useEffect(() => {
              let e = () => W(!1);
              return (
                window.addEventListener("blur", e),
                window.addEventListener("resize", e),
                () => {
                  window.removeEventListener("blur", e),
                    window.removeEventListener("resize", e);
                }
              );
            }, [W]);
          let [Z, X] = eT((e) => {
              let t = V().filter((e) => !e.disabled),
                r = t.find((e) => e.ref.current === document.activeElement),
                n = ek(t, e, r);
              n && setTimeout(() => n.ref.current.focus());
            }),
            ee = n.useCallback(
              (e, t, r) => {
                let n = !K.current && !r;
                ((void 0 !== I.value && I.value === t) || n) &&
                  (A(e), n && (K.current = !0));
              },
              [I.value],
            ),
            et = n.useCallback(() => R?.focus(), [R]),
            er = n.useCallback(
              (e, t, r) => {
                let n = !K.current && !r;
                ((void 0 !== I.value && I.value === t) || n) && B(e);
              },
              [I.value],
            ),
            en = "popper" === l ? $ : Q,
            el =
              en === $
                ? {
                    side: u,
                    sideOffset: h,
                    align: v,
                    alignOffset: m,
                    arrowPadding: g,
                    collisionBoundary: w,
                    collisionPadding: x,
                    sticky: y,
                    hideWhenDetached: b,
                    avoidCollisions: S,
                  }
                : {};
          return (0, T.jsx)(Y, {
            scope: r,
            content: R,
            viewport: P,
            onViewportChange: D,
            itemRefCallback: ee,
            selectedItem: L,
            onItemLeave: et,
            itemTextRefCallback: er,
            focusSelectedItem: U,
            selectedItemText: _,
            position: l,
            isPositioned: G,
            searchRef: Z,
            children: (0, T.jsx)(j.A, {
              as: J,
              allowPinchZoom: !0,
              children: (0, T.jsx)(f.n, {
                asChild: !0,
                trapped: I.open,
                onMountAutoFocus: (e) => {
                  e.preventDefault();
                },
                onUnmountAutoFocus: (0, a.m)(o, (e) => {
                  I.trigger?.focus({ preventScroll: !0 }), e.preventDefault();
                }),
                children: (0, T.jsx)(c.qW, {
                  asChild: !0,
                  disableOutsidePointerEvents: !0,
                  onEscapeKeyDown: i,
                  onPointerDownOutside: d,
                  onFocusOutside: (e) => e.preventDefault(),
                  onDismiss: () => I.onOpenChange(!1),
                  children: (0, T.jsx)(en, {
                    role: "listbox",
                    id: I.contentId,
                    "data-state": I.open ? "open" : "closed",
                    dir: I.dir,
                    onContextMenu: (e) => e.preventDefault(),
                    ...k,
                    ...el,
                    onPlaced: () => F(!0),
                    ref: M,
                    style: {
                      display: "flex",
                      flexDirection: "column",
                      outline: "none",
                      ...k.style,
                    },
                    onKeyDown: (0, a.m)(k.onKeyDown, (e) => {
                      let t = e.ctrlKey || e.altKey || e.metaKey;
                      if (
                        ("Tab" === e.key && e.preventDefault(),
                        t || 1 !== e.key.length || X(e.key),
                        ["ArrowUp", "ArrowDown", "Home", "End"].includes(e.key))
                      ) {
                        let t = V()
                          .filter((e) => !e.disabled)
                          .map((e) => e.ref.current);
                        if (
                          (["ArrowUp", "End"].includes(e.key) &&
                            (t = t.slice().reverse()),
                          ["ArrowUp", "ArrowDown"].includes(e.key))
                        ) {
                          let r = e.target,
                            n = t.indexOf(r);
                          t = t.slice(n + 1);
                        }
                        setTimeout(() => O(t)), e.preventDefault();
                      }
                    }),
                  }),
                }),
              }),
            }),
          });
        });
      X.displayName = "SelectContentImpl";
      var Q = n.forwardRef((e, t) => {
        let { __scopeSelect: r, onPlaced: l, ...a } = e,
          i = H(z, r),
          d = Z(z, r),
          [u, c] = n.useState(null),
          [p, f] = n.useState(null),
          h = (0, s.s)(t, (e) => f(e)),
          v = E(r),
          m = n.useRef(!1),
          w = n.useRef(!0),
          {
            viewport: x,
            selectedItem: y,
            selectedItemText: S,
            focusSelectedItem: C,
          } = d,
          j = n.useCallback(() => {
            if (i.trigger && i.valueNode && u && p && x && y && S) {
              let e = i.trigger.getBoundingClientRect(),
                t = p.getBoundingClientRect(),
                r = i.valueNode.getBoundingClientRect(),
                n = S.getBoundingClientRect();
              if ("rtl" !== i.dir) {
                let l = n.left - t.left,
                  a = r.left - l,
                  i = e.left - a,
                  s = e.width + i,
                  d = Math.max(s, t.width),
                  c = o(a, [10, Math.max(10, window.innerWidth - 10 - d)]);
                (u.style.minWidth = s + "px"), (u.style.left = c + "px");
              } else {
                let l = t.right - n.right,
                  a = window.innerWidth - r.right - l,
                  i = window.innerWidth - e.right - a,
                  s = e.width + i,
                  d = Math.max(s, t.width),
                  c = o(a, [10, Math.max(10, window.innerWidth - 10 - d)]);
                (u.style.minWidth = s + "px"), (u.style.right = c + "px");
              }
              let a = v(),
                s = window.innerHeight - 20,
                d = x.scrollHeight,
                c = window.getComputedStyle(p),
                f = parseInt(c.borderTopWidth, 10),
                h = parseInt(c.paddingTop, 10),
                g = parseInt(c.borderBottomWidth, 10),
                w = f + h + d + parseInt(c.paddingBottom, 10) + g,
                b = Math.min(5 * y.offsetHeight, w),
                C = window.getComputedStyle(x),
                j = parseInt(C.paddingTop, 10),
                T = parseInt(C.paddingBottom, 10),
                k = e.top + e.height / 2 - 10,
                I = y.offsetHeight / 2,
                R = f + h + (y.offsetTop + I);
              if (R <= k) {
                let e = a.length > 0 && y === a[a.length - 1].ref.current;
                u.style.bottom = "0px";
                let t = Math.max(
                  s - k,
                  I +
                    (e ? T : 0) +
                    (p.clientHeight - x.offsetTop - x.offsetHeight) +
                    g,
                );
                u.style.height = R + t + "px";
              } else {
                let e = a.length > 0 && y === a[0].ref.current;
                u.style.top = "0px";
                let t = Math.max(k, f + x.offsetTop + (e ? j : 0) + I);
                (u.style.height = t + (w - R) + "px"),
                  (x.scrollTop = R - k + x.offsetTop);
              }
              (u.style.margin = "10px 0"),
                (u.style.minHeight = b + "px"),
                (u.style.maxHeight = s + "px"),
                l?.(),
                requestAnimationFrame(() => (m.current = !0));
            }
          }, [v, i.trigger, i.valueNode, u, p, x, y, S, i.dir, l]);
        (0, b.N)(() => j(), [j]);
        let [k, I] = n.useState();
        (0, b.N)(() => {
          p && I(window.getComputedStyle(p).zIndex);
        }, [p]);
        let R = n.useCallback(
          (e) => {
            e && !0 === w.current && (j(), C?.(), (w.current = !1));
          },
          [j, C],
        );
        return (0, T.jsx)(ee, {
          scope: r,
          contentWrapper: u,
          shouldExpandOnScrollRef: m,
          onScrollButtonChange: R,
          children: (0, T.jsx)("div", {
            ref: c,
            style: {
              display: "flex",
              flexDirection: "column",
              position: "fixed",
              zIndex: k,
            },
            children: (0, T.jsx)(g.sG.div, {
              ...a,
              ref: h,
              style: { boxSizing: "border-box", maxHeight: "100%", ...a.style },
            }),
          }),
        });
      });
      Q.displayName = "SelectItemAlignedPosition";
      var $ = n.forwardRef((e, t) => {
        let {
            __scopeSelect: r,
            align: n = "start",
            collisionPadding: l = 10,
            ...o
          } = e,
          a = L(r);
        return (0, T.jsx)(v.UC, {
          ...a,
          ...o,
          ref: t,
          align: n,
          collisionPadding: l,
          style: {
            boxSizing: "border-box",
            ...o.style,
            "--radix-select-content-transform-origin":
              "var(--radix-popper-transform-origin)",
            "--radix-select-content-available-width":
              "var(--radix-popper-available-width)",
            "--radix-select-content-available-height":
              "var(--radix-popper-available-height)",
            "--radix-select-trigger-width": "var(--radix-popper-anchor-width)",
            "--radix-select-trigger-height":
              "var(--radix-popper-anchor-height)",
          },
        });
      });
      $.displayName = "SelectPopperPosition";
      var [ee, et] = D(z, {}),
        er = "SelectViewport",
        en = n.forwardRef((e, t) => {
          let { __scopeSelect: r, nonce: l, ...o } = e,
            i = Z(er, r),
            d = et(er, r),
            u = (0, s.s)(t, i.onViewportChange),
            c = n.useRef(0);
          return (0, T.jsxs)(T.Fragment, {
            children: [
              (0, T.jsx)("style", {
                dangerouslySetInnerHTML: {
                  __html:
                    "[data-radix-select-viewport]{scrollbar-width:none;-ms-overflow-style:none;-webkit-overflow-scrolling:touch;}[data-radix-select-viewport]::-webkit-scrollbar{display:none}",
                },
                nonce: l,
              }),
              (0, T.jsx)(N.Slot, {
                scope: r,
                children: (0, T.jsx)(g.sG.div, {
                  "data-radix-select-viewport": "",
                  role: "presentation",
                  ...o,
                  ref: u,
                  style: {
                    position: "relative",
                    flex: 1,
                    overflow: "hidden auto",
                    ...o.style,
                  },
                  onScroll: (0, a.m)(o.onScroll, (e) => {
                    let t = e.currentTarget,
                      { contentWrapper: r, shouldExpandOnScrollRef: n } = d;
                    if (n?.current && r) {
                      let e = Math.abs(c.current - t.scrollTop);
                      if (e > 0) {
                        let n = window.innerHeight - 20,
                          l = Math.max(
                            parseFloat(r.style.minHeight),
                            parseFloat(r.style.height),
                          );
                        if (l < n) {
                          let o = l + e,
                            a = Math.min(n, o),
                            i = o - a;
                          (r.style.height = a + "px"),
                            "0px" === r.style.bottom &&
                              ((t.scrollTop = i > 0 ? i : 0),
                              (r.style.justifyContent = "flex-end"));
                        }
                      }
                    }
                    c.current = t.scrollTop;
                  }),
                }),
              }),
            ],
          });
        });
      en.displayName = er;
      var el = "SelectGroup",
        [eo, ea] = D(el),
        ei = n.forwardRef((e, t) => {
          let { __scopeSelect: r, ...n } = e,
            l = (0, h.B)();
          return (0, T.jsx)(eo, {
            scope: r,
            id: l,
            children: (0, T.jsx)(g.sG.div, {
              role: "group",
              "aria-labelledby": l,
              ...n,
              ref: t,
            }),
          });
        });
      ei.displayName = el;
      var es = "SelectLabel",
        ed = n.forwardRef((e, t) => {
          let { __scopeSelect: r, ...n } = e,
            l = ea(es, r);
          return (0, T.jsx)(g.sG.div, { id: l.id, ...n, ref: t });
        });
      ed.displayName = es;
      var eu = "SelectItem",
        [ec, ep] = D(eu),
        ef = n.forwardRef((e, t) => {
          let {
              __scopeSelect: r,
              value: l,
              disabled: o = !1,
              textValue: i,
              ...d
            } = e,
            u = H(eu, r),
            c = Z(eu, r),
            p = u.value === l,
            [f, v] = n.useState(i ?? ""),
            [m, w] = n.useState(!1),
            x = (0, s.s)(t, (e) => c.itemRefCallback?.(e, l, o)),
            y = (0, h.B)(),
            b = n.useRef("touch"),
            S = () => {
              o || (u.onValueChange(l), u.onOpenChange(!1));
            };
          if ("" === l)
            throw Error(
              "A <Select.Item /> must have a value prop that is not an empty string. This is because the Select value can be set to an empty string to clear the selection and show the placeholder.",
            );
          return (0, T.jsx)(ec, {
            scope: r,
            value: l,
            disabled: o,
            textId: y,
            isSelected: p,
            onItemTextChange: n.useCallback((e) => {
              v((t) => t || (e?.textContent ?? "").trim());
            }, []),
            children: (0, T.jsx)(N.ItemSlot, {
              scope: r,
              value: l,
              disabled: o,
              textValue: f,
              children: (0, T.jsx)(g.sG.div, {
                role: "option",
                "aria-labelledby": y,
                "data-highlighted": m ? "" : void 0,
                "aria-selected": p && m,
                "data-state": p ? "checked" : "unchecked",
                "aria-disabled": o || void 0,
                "data-disabled": o ? "" : void 0,
                tabIndex: o ? void 0 : -1,
                ...d,
                ref: x,
                onFocus: (0, a.m)(d.onFocus, () => w(!0)),
                onBlur: (0, a.m)(d.onBlur, () => w(!1)),
                onClick: (0, a.m)(d.onClick, () => {
                  "mouse" !== b.current && S();
                }),
                onPointerUp: (0, a.m)(d.onPointerUp, () => {
                  "mouse" === b.current && S();
                }),
                onPointerDown: (0, a.m)(d.onPointerDown, (e) => {
                  b.current = e.pointerType;
                }),
                onPointerMove: (0, a.m)(d.onPointerMove, (e) => {
                  (b.current = e.pointerType),
                    o
                      ? c.onItemLeave?.()
                      : "mouse" === b.current &&
                        e.currentTarget.focus({ preventScroll: !0 });
                }),
                onPointerLeave: (0, a.m)(d.onPointerLeave, (e) => {
                  e.currentTarget === document.activeElement &&
                    c.onItemLeave?.();
                }),
                onKeyDown: (0, a.m)(d.onKeyDown, (e) => {
                  (c.searchRef?.current === "" || " " !== e.key) &&
                    (I.includes(e.key) && S(),
                    " " === e.key && e.preventDefault());
                }),
              }),
            }),
          });
        });
      ef.displayName = eu;
      var eh = "SelectItemText",
        ev = n.forwardRef((e, t) => {
          let { __scopeSelect: r, className: o, style: a, ...i } = e,
            d = H(eh, r),
            u = Z(eh, r),
            c = ep(eh, r),
            p = B(eh, r),
            [f, h] = n.useState(null),
            v = (0, s.s)(
              t,
              (e) => h(e),
              c.onItemTextChange,
              (e) => u.itemTextRefCallback?.(e, c.value, c.disabled),
            ),
            m = f?.textContent,
            w = n.useMemo(
              () =>
                (0, T.jsx)(
                  "option",
                  { value: c.value, disabled: c.disabled, children: m },
                  c.value,
                ),
              [c.disabled, c.value, m],
            ),
            { onNativeOptionAdd: x, onNativeOptionRemove: y } = p;
          return (
            (0, b.N)(() => (x(w), () => y(w)), [x, y, w]),
            (0, T.jsxs)(T.Fragment, {
              children: [
                (0, T.jsx)(g.sG.span, { id: c.textId, ...i, ref: v }),
                c.isSelected && d.valueNode && !d.valueNodeHasChildren
                  ? l.createPortal(i.children, d.valueNode)
                  : null,
              ],
            })
          );
        });
      ev.displayName = eh;
      var em = "SelectItemIndicator",
        eg = n.forwardRef((e, t) => {
          let { __scopeSelect: r, ...n } = e;
          return ep(em, r).isSelected
            ? (0, T.jsx)(g.sG.span, { "aria-hidden": !0, ...n, ref: t })
            : null;
        });
      eg.displayName = em;
      var ew = "SelectScrollUpButton";
      n.forwardRef((e, t) => {
        let r = Z(ew, e.__scopeSelect),
          l = et(ew, e.__scopeSelect),
          [o, a] = n.useState(!1),
          i = (0, s.s)(t, l.onScrollButtonChange);
        return (
          (0, b.N)(() => {
            if (r.viewport && r.isPositioned) {
              let e = function () {
                  a(t.scrollTop > 0);
                },
                t = r.viewport;
              return (
                e(),
                t.addEventListener("scroll", e),
                () => t.removeEventListener("scroll", e)
              );
            }
          }, [r.viewport, r.isPositioned]),
          o
            ? (0, T.jsx)(ey, {
                ...e,
                ref: i,
                onAutoScroll: () => {
                  let { viewport: e, selectedItem: t } = r;
                  e && t && (e.scrollTop = e.scrollTop - t.offsetHeight);
                },
              })
            : null
        );
      }).displayName = ew;
      var ex = "SelectScrollDownButton";
      n.forwardRef((e, t) => {
        let r = Z(ex, e.__scopeSelect),
          l = et(ex, e.__scopeSelect),
          [o, a] = n.useState(!1),
          i = (0, s.s)(t, l.onScrollButtonChange);
        return (
          (0, b.N)(() => {
            if (r.viewport && r.isPositioned) {
              let e = function () {
                  let e = t.scrollHeight - t.clientHeight;
                  a(Math.ceil(t.scrollTop) < e);
                },
                t = r.viewport;
              return (
                e(),
                t.addEventListener("scroll", e),
                () => t.removeEventListener("scroll", e)
              );
            }
          }, [r.viewport, r.isPositioned]),
          o
            ? (0, T.jsx)(ey, {
                ...e,
                ref: i,
                onAutoScroll: () => {
                  let { viewport: e, selectedItem: t } = r;
                  e && t && (e.scrollTop = e.scrollTop + t.offsetHeight);
                },
              })
            : null
        );
      }).displayName = ex;
      var ey = n.forwardRef((e, t) => {
          let { __scopeSelect: r, onAutoScroll: l, ...o } = e,
            i = Z("SelectScrollButton", r),
            s = n.useRef(null),
            d = E(r),
            u = n.useCallback(() => {
              null !== s.current &&
                (window.clearInterval(s.current), (s.current = null));
            }, []);
          return (
            n.useEffect(() => () => u(), [u]),
            (0, b.N)(() => {
              let e = d().find((e) => e.ref.current === document.activeElement);
              e?.ref.current?.scrollIntoView({ block: "nearest" });
            }, [d]),
            (0, T.jsx)(g.sG.div, {
              "aria-hidden": !0,
              ...o,
              ref: t,
              style: { flexShrink: 0, ...o.style },
              onPointerDown: (0, a.m)(o.onPointerDown, () => {
                null === s.current && (s.current = window.setInterval(l, 50));
              }),
              onPointerMove: (0, a.m)(o.onPointerMove, () => {
                i.onItemLeave?.(),
                  null === s.current && (s.current = window.setInterval(l, 50));
              }),
              onPointerLeave: (0, a.m)(o.onPointerLeave, () => {
                u();
              }),
            })
          );
        }),
        eb = n.forwardRef((e, t) => {
          let { __scopeSelect: r, ...n } = e;
          return (0, T.jsx)(g.sG.div, { "aria-hidden": !0, ...n, ref: t });
        });
      eb.displayName = "SelectSeparator";
      var eS = "SelectArrow";
      n.forwardRef((e, t) => {
        let { __scopeSelect: r, ...n } = e,
          l = L(r),
          o = H(eS, r),
          a = Z(eS, r);
        return o.open && "popper" === a.position
          ? (0, T.jsx)(v.i3, { ...l, ...n, ref: t })
          : null;
      }).displayName = eS;
      var eC = n.forwardRef(({ __scopeSelect: e, value: t, ...r }, l) => {
        let o = n.useRef(null),
          a = (0, s.s)(l, o),
          i = (function (e) {
            let t = n.useRef({ value: e, previous: e });
            return n.useMemo(
              () => (
                t.current.value !== e &&
                  ((t.current.previous = t.current.value),
                  (t.current.value = e)),
                t.current.previous
              ),
              [e],
            );
          })(t);
        return (
          n.useEffect(() => {
            let e = o.current;
            if (!e) return;
            let r = Object.getOwnPropertyDescriptor(
              window.HTMLSelectElement.prototype,
              "value",
            ).set;
            if (i !== t && r) {
              let n = new Event("change", { bubbles: !0 });
              r.call(e, t), e.dispatchEvent(n);
            }
          }, [i, t]),
          (0, T.jsx)(g.sG.select, {
            ...r,
            style: { ...S.Qg, ...r.style },
            ref: a,
            defaultValue: t,
          })
        );
      });
      function ej(e) {
        return "" === e || void 0 === e;
      }
      function eT(e) {
        let t = (0, x.c)(e),
          r = n.useRef(""),
          l = n.useRef(0),
          o = n.useCallback(
            (e) => {
              let n = r.current + e;
              t(n),
                (function e(t) {
                  (r.current = t),
                    window.clearTimeout(l.current),
                    "" !== t &&
                      (l.current = window.setTimeout(() => e(""), 1e3));
                })(n);
            },
            [t],
          ),
          a = n.useCallback(() => {
            (r.current = ""), window.clearTimeout(l.current);
          }, []);
        return (
          n.useEffect(() => () => window.clearTimeout(l.current), []), [r, o, a]
        );
      }
      function ek(e, t, r) {
        var n, l;
        let o =
            t.length > 1 && Array.from(t).every((e) => e === t[0]) ? t[0] : t,
          a = r ? e.indexOf(r) : -1,
          i =
            ((n = e),
            (l = Math.max(a, 0)),
            n.map((e, t) => n[(l + t) % n.length]));
        1 === o.length && (i = i.filter((e) => e !== r));
        let s = i.find((e) =>
          e.textValue.toLowerCase().startsWith(o.toLowerCase()),
        );
        return s !== r ? s : void 0;
      }
      eC.displayName = "SelectBubbleInput";
      var eI = V,
        eR = F,
        eN = O,
        eE = U,
        eP = W,
        eD = q,
        eM = en,
        eL = ei,
        eA = ed,
        eH = ef,
        e_ = ev,
        eB = eg,
        eV = eb;
    },
  });
//# sourceMappingURL=6867.js.map
