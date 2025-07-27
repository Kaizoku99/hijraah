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
    (e._sentryDebugIds[r] = "12e9fcf5-9621-484d-a586-80b241b968d0"),
    (e._sentryDebugIdIdentifier =
      "sentry-dbid-12e9fcf5-9621-484d-a586-80b241b968d0"));
} catch (e) {}
("use strict");
(exports.id = 7911),
  (exports.ids = [7911]),
  (exports.modules = {
    57833: (e, r, n) => {
      n.d(r, {
        UC: () => rt,
        YJ: () => ro,
        q7: () => ru,
        VF: () => rs,
        JU: () => ra,
        ZL: () => rn,
        z6: () => rl,
        hN: () => ri,
        bL: () => re,
        wv: () => rd,
        l9: () => rr,
      });
      var t = n(84205),
        o = n(28777),
        a = n(79744),
        u = n(14072),
        l = n(15359),
        i = n(56558),
        s = n(15016),
        d = n(68476),
        c = n(67400),
        f = n(10897),
        p = n(12447),
        m = n(66257),
        v = n(80434),
        w = n(85660),
        g = n(35549),
        h = n(21899),
        x = n(61268),
        y = "rovingFocusGroup.onEntryFocus",
        b = { bubbles: !1, cancelable: !0 },
        C = "RovingFocusGroup",
        [M, R, D] = (0, s.N)(C),
        [j, _] = (0, u.A)(C, [D]),
        [k, I] = j(C),
        P = t.forwardRef((e, r) =>
          (0, x.jsx)(M.Provider, {
            scope: e.__scopeRovingFocusGroup,
            children: (0, x.jsx)(M.Slot, {
              scope: e.__scopeRovingFocusGroup,
              children: (0, x.jsx)(T, { ...e, ref: r }),
            }),
          }),
        );
      P.displayName = C;
      var T = t.forwardRef((e, r) => {
          let {
              __scopeRovingFocusGroup: n,
              orientation: u,
              loop: s = !1,
              dir: c,
              currentTabStopId: f,
              defaultCurrentTabStopId: p,
              onCurrentTabStopIdChange: m,
              onEntryFocus: v,
              preventScrollOnEntryFocus: w = !1,
              ...g
            } = e,
            M = t.useRef(null),
            D = (0, a.s)(r, M),
            j = (0, d.jH)(c),
            [_, I] = (0, l.i)({
              prop: f,
              defaultProp: p ?? null,
              onChange: m,
              caller: C,
            }),
            [P, T] = t.useState(!1),
            E = (0, h.c)(v),
            A = R(n),
            F = t.useRef(!1),
            [N, L] = t.useState(0);
          return (
            t.useEffect(() => {
              let e = M.current;
              if (e)
                return (
                  e.addEventListener(y, E), () => e.removeEventListener(y, E)
                );
            }, [E]),
            (0, x.jsx)(k, {
              scope: n,
              orientation: u,
              dir: j,
              loop: s,
              currentTabStopId: _,
              onItemFocus: t.useCallback((e) => I(e), [I]),
              onItemShiftTab: t.useCallback(() => T(!0), []),
              onFocusableItemAdd: t.useCallback(() => L((e) => e + 1), []),
              onFocusableItemRemove: t.useCallback(() => L((e) => e - 1), []),
              children: (0, x.jsx)(i.sG.div, {
                tabIndex: P || 0 === N ? -1 : 0,
                "data-orientation": u,
                ...g,
                ref: D,
                style: { outline: "none", ...e.style },
                onMouseDown: (0, o.m)(e.onMouseDown, () => {
                  F.current = !0;
                }),
                onFocus: (0, o.m)(e.onFocus, (e) => {
                  let r = !F.current;
                  if (e.target === e.currentTarget && r && !P) {
                    let r = new CustomEvent(y, b);
                    if (
                      (e.currentTarget.dispatchEvent(r), !r.defaultPrevented)
                    ) {
                      let e = A().filter((e) => e.focusable);
                      S(
                        [
                          e.find((e) => e.active),
                          e.find((e) => e.id === _),
                          ...e,
                        ]
                          .filter(Boolean)
                          .map((e) => e.ref.current),
                        w,
                      );
                    }
                  }
                  F.current = !1;
                }),
                onBlur: (0, o.m)(e.onBlur, () => T(!1)),
              }),
            })
          );
        }),
        E = "RovingFocusGroupItem",
        A = t.forwardRef((e, r) => {
          let {
              __scopeRovingFocusGroup: n,
              focusable: a = !0,
              active: u = !1,
              tabStopId: l,
              children: s,
              ...d
            } = e,
            c = (0, m.B)(),
            f = l || c,
            p = I(E, n),
            v = p.currentTabStopId === f,
            w = R(n),
            {
              onFocusableItemAdd: g,
              onFocusableItemRemove: h,
              currentTabStopId: y,
            } = p;
          return (
            t.useEffect(() => {
              if (a) return g(), () => h();
            }, [a, g, h]),
            (0, x.jsx)(M.ItemSlot, {
              scope: n,
              id: f,
              focusable: a,
              active: u,
              children: (0, x.jsx)(i.sG.span, {
                tabIndex: v ? 0 : -1,
                "data-orientation": p.orientation,
                ...d,
                ref: r,
                onMouseDown: (0, o.m)(e.onMouseDown, (e) => {
                  a ? p.onItemFocus(f) : e.preventDefault();
                }),
                onFocus: (0, o.m)(e.onFocus, () => p.onItemFocus(f)),
                onKeyDown: (0, o.m)(e.onKeyDown, (e) => {
                  if ("Tab" === e.key && e.shiftKey)
                    return void p.onItemShiftTab();
                  if (e.target !== e.currentTarget) return;
                  let r = (function (e, r, n) {
                    var t;
                    let o =
                      ((t = e.key),
                      "rtl" !== n
                        ? t
                        : "ArrowLeft" === t
                          ? "ArrowRight"
                          : "ArrowRight" === t
                            ? "ArrowLeft"
                            : t);
                    if (
                      !(
                        "vertical" === r &&
                        ["ArrowLeft", "ArrowRight"].includes(o)
                      ) &&
                      !(
                        "horizontal" === r &&
                        ["ArrowUp", "ArrowDown"].includes(o)
                      )
                    )
                      return F[o];
                  })(e, p.orientation, p.dir);
                  if (void 0 !== r) {
                    if (e.metaKey || e.ctrlKey || e.altKey || e.shiftKey)
                      return;
                    e.preventDefault();
                    let n = w()
                      .filter((e) => e.focusable)
                      .map((e) => e.ref.current);
                    if ("last" === r) n.reverse();
                    else if ("prev" === r || "next" === r) {
                      "prev" === r && n.reverse();
                      let t = n.indexOf(e.currentTarget);
                      n = p.loop
                        ? (function (e, r) {
                            return e.map((n, t) => e[(r + t) % e.length]);
                          })(n, t + 1)
                        : n.slice(t + 1);
                    }
                    setTimeout(() => S(n));
                  }
                }),
                children:
                  "function" == typeof s
                    ? s({ isCurrentTabStop: v, hasTabStop: null != y })
                    : s,
              }),
            })
          );
        });
      A.displayName = E;
      var F = {
        ArrowLeft: "prev",
        ArrowUp: "prev",
        ArrowRight: "next",
        ArrowDown: "next",
        PageUp: "first",
        Home: "first",
        PageDown: "last",
        End: "last",
      };
      function S(e, r = !1) {
        let n = document.activeElement;
        for (let t of e)
          if (
            t === n ||
            (t.focus({ preventScroll: r }), document.activeElement !== n)
          )
            return;
      }
      var N = n(86415),
        L = n(73460),
        O = n(3205),
        K = ["Enter", " "],
        G = ["ArrowUp", "PageDown", "End"],
        B = ["ArrowDown", "PageUp", "Home", ...G],
        U = { ltr: [...K, "ArrowRight"], rtl: [...K, "ArrowLeft"] },
        V = { ltr: ["ArrowLeft"], rtl: ["ArrowRight"] },
        X = "Menu",
        [z, H, q] = (0, s.N)(X),
        [Y, Z] = (0, u.A)(X, [q, v.Bk, _]),
        J = (0, v.Bk)(),
        W = _(),
        [Q, $] = Y(X),
        [ee, er] = Y(X),
        en = (e) => {
          let {
              __scopeMenu: r,
              open: n = !1,
              children: o,
              dir: a,
              onOpenChange: u,
              modal: l = !0,
            } = e,
            i = J(r),
            [s, c] = t.useState(null),
            f = t.useRef(!1),
            p = (0, h.c)(u),
            m = (0, d.jH)(a);
          return (
            t.useEffect(() => {
              let e = () => {
                  (f.current = !0),
                    document.addEventListener("pointerdown", r, {
                      capture: !0,
                      once: !0,
                    }),
                    document.addEventListener("pointermove", r, {
                      capture: !0,
                      once: !0,
                    });
                },
                r = () => (f.current = !1);
              return (
                document.addEventListener("keydown", e, { capture: !0 }),
                () => {
                  document.removeEventListener("keydown", e, { capture: !0 }),
                    document.removeEventListener("pointerdown", r, {
                      capture: !0,
                    }),
                    document.removeEventListener("pointermove", r, {
                      capture: !0,
                    });
                }
              );
            }, []),
            (0, x.jsx)(v.bL, {
              ...i,
              children: (0, x.jsx)(Q, {
                scope: r,
                open: n,
                onOpenChange: p,
                content: s,
                onContentChange: c,
                children: (0, x.jsx)(ee, {
                  scope: r,
                  onClose: t.useCallback(() => p(!1), [p]),
                  isUsingKeyboardRef: f,
                  dir: m,
                  modal: l,
                  children: o,
                }),
              }),
            })
          );
        };
      en.displayName = X;
      var et = t.forwardRef((e, r) => {
        let { __scopeMenu: n, ...t } = e,
          o = J(n);
        return (0, x.jsx)(v.Mz, { ...o, ...t, ref: r });
      });
      et.displayName = "MenuAnchor";
      var eo = "MenuPortal",
        [ea, eu] = Y(eo, { forceMount: void 0 }),
        el = (e) => {
          let { __scopeMenu: r, forceMount: n, children: t, container: o } = e,
            a = $(eo, r);
          return (0, x.jsx)(ea, {
            scope: r,
            forceMount: n,
            children: (0, x.jsx)(g.C, {
              present: n || a.open,
              children: (0, x.jsx)(w.Z, {
                asChild: !0,
                container: o,
                children: t,
              }),
            }),
          });
        };
      el.displayName = eo;
      var ei = "MenuContent",
        [es, ed] = Y(ei),
        ec = t.forwardRef((e, r) => {
          let n = eu(ei, e.__scopeMenu),
            { forceMount: t = n.forceMount, ...o } = e,
            a = $(ei, e.__scopeMenu),
            u = er(ei, e.__scopeMenu);
          return (0, x.jsx)(z.Provider, {
            scope: e.__scopeMenu,
            children: (0, x.jsx)(g.C, {
              present: t || a.open,
              children: (0, x.jsx)(z.Slot, {
                scope: e.__scopeMenu,
                children: u.modal
                  ? (0, x.jsx)(ef, { ...o, ref: r })
                  : (0, x.jsx)(ep, { ...o, ref: r }),
              }),
            }),
          });
        }),
        ef = t.forwardRef((e, r) => {
          let n = $(ei, e.__scopeMenu),
            u = t.useRef(null),
            l = (0, a.s)(r, u);
          return (
            t.useEffect(() => {
              let e = u.current;
              if (e) return (0, L.Eq)(e);
            }, []),
            (0, x.jsx)(ev, {
              ...e,
              ref: l,
              trapFocus: n.open,
              disableOutsidePointerEvents: n.open,
              disableOutsideScroll: !0,
              onFocusOutside: (0, o.m)(
                e.onFocusOutside,
                (e) => e.preventDefault(),
                { checkForDefaultPrevented: !1 },
              ),
              onDismiss: () => n.onOpenChange(!1),
            })
          );
        }),
        ep = t.forwardRef((e, r) => {
          let n = $(ei, e.__scopeMenu);
          return (0, x.jsx)(ev, {
            ...e,
            ref: r,
            trapFocus: !1,
            disableOutsidePointerEvents: !1,
            disableOutsideScroll: !1,
            onDismiss: () => n.onOpenChange(!1),
          });
        }),
        em = (0, N.TL)("MenuContent.ScrollLock"),
        ev = t.forwardRef((e, r) => {
          let {
              __scopeMenu: n,
              loop: u = !1,
              trapFocus: l,
              onOpenAutoFocus: i,
              onCloseAutoFocus: s,
              disableOutsidePointerEvents: d,
              onEntryFocus: m,
              onEscapeKeyDown: w,
              onPointerDownOutside: g,
              onFocusOutside: h,
              onInteractOutside: y,
              onDismiss: b,
              disableOutsideScroll: C,
              ...M
            } = e,
            R = $(ei, n),
            D = er(ei, n),
            j = J(n),
            _ = W(n),
            k = H(n),
            [I, T] = t.useState(null),
            E = t.useRef(null),
            A = (0, a.s)(r, E, R.onContentChange),
            F = t.useRef(0),
            S = t.useRef(""),
            N = t.useRef(0),
            L = t.useRef(null),
            K = t.useRef("right"),
            U = t.useRef(0),
            V = C ? O.A : t.Fragment,
            X = (e) => {
              let r = S.current + e,
                n = k().filter((e) => !e.disabled),
                t = document.activeElement,
                o = n.find((e) => e.ref.current === t)?.textValue,
                a = (function (e, r, n) {
                  var t;
                  let o =
                      r.length > 1 && Array.from(r).every((e) => e === r[0])
                        ? r[0]
                        : r,
                    a = n ? e.indexOf(n) : -1,
                    u =
                      ((t = Math.max(a, 0)),
                      e.map((r, n) => e[(t + n) % e.length]));
                  1 === o.length && (u = u.filter((e) => e !== n));
                  let l = u.find((e) =>
                    e.toLowerCase().startsWith(o.toLowerCase()),
                  );
                  return l !== n ? l : void 0;
                })(
                  n.map((e) => e.textValue),
                  r,
                  o,
                ),
                u = n.find((e) => e.textValue === a)?.ref.current;
              !(function e(r) {
                (S.current = r),
                  window.clearTimeout(F.current),
                  "" !== r && (F.current = window.setTimeout(() => e(""), 1e3));
              })(r),
                u && setTimeout(() => u.focus());
            };
          t.useEffect(() => () => window.clearTimeout(F.current), []),
            (0, f.Oh)();
          let z = t.useCallback(
            (e) =>
              K.current === L.current?.side &&
              (function (e, r) {
                return (
                  !!r &&
                  (function (e, r) {
                    let { x: n, y: t } = e,
                      o = !1;
                    for (let e = 0, a = r.length - 1; e < r.length; a = e++) {
                      let u = r[e],
                        l = r[a],
                        i = u.x,
                        s = u.y,
                        d = l.x,
                        c = l.y;
                      s > t != c > t &&
                        n < ((d - i) * (t - s)) / (c - s) + i &&
                        (o = !o);
                    }
                    return o;
                  })({ x: e.clientX, y: e.clientY }, r)
                );
              })(e, L.current?.area),
            [],
          );
          return (0, x.jsx)(es, {
            scope: n,
            searchRef: S,
            onItemEnter: t.useCallback(
              (e) => {
                z(e) && e.preventDefault();
              },
              [z],
            ),
            onItemLeave: t.useCallback(
              (e) => {
                z(e) || (E.current?.focus(), T(null));
              },
              [z],
            ),
            onTriggerLeave: t.useCallback(
              (e) => {
                z(e) && e.preventDefault();
              },
              [z],
            ),
            pointerGraceTimerRef: N,
            onPointerGraceIntentChange: t.useCallback((e) => {
              L.current = e;
            }, []),
            children: (0, x.jsx)(V, {
              ...(C ? { as: em, allowPinchZoom: !0 } : void 0),
              children: (0, x.jsx)(p.n, {
                asChild: !0,
                trapped: l,
                onMountAutoFocus: (0, o.m)(i, (e) => {
                  e.preventDefault(), E.current?.focus({ preventScroll: !0 });
                }),
                onUnmountAutoFocus: s,
                children: (0, x.jsx)(c.qW, {
                  asChild: !0,
                  disableOutsidePointerEvents: d,
                  onEscapeKeyDown: w,
                  onPointerDownOutside: g,
                  onFocusOutside: h,
                  onInteractOutside: y,
                  onDismiss: b,
                  children: (0, x.jsx)(P, {
                    asChild: !0,
                    ..._,
                    dir: D.dir,
                    orientation: "vertical",
                    loop: u,
                    currentTabStopId: I,
                    onCurrentTabStopIdChange: T,
                    onEntryFocus: (0, o.m)(m, (e) => {
                      D.isUsingKeyboardRef.current || e.preventDefault();
                    }),
                    preventScrollOnEntryFocus: !0,
                    children: (0, x.jsx)(v.UC, {
                      role: "menu",
                      "aria-orientation": "vertical",
                      "data-state": eB(R.open),
                      "data-radix-menu-content": "",
                      dir: D.dir,
                      ...j,
                      ...M,
                      ref: A,
                      style: { outline: "none", ...M.style },
                      onKeyDown: (0, o.m)(M.onKeyDown, (e) => {
                        let r =
                            e.target.closest("[data-radix-menu-content]") ===
                            e.currentTarget,
                          n = e.ctrlKey || e.altKey || e.metaKey,
                          t = 1 === e.key.length;
                        r &&
                          ("Tab" === e.key && e.preventDefault(),
                          !n && t && X(e.key));
                        let o = E.current;
                        if (e.target !== o || !B.includes(e.key)) return;
                        e.preventDefault();
                        let a = k()
                          .filter((e) => !e.disabled)
                          .map((e) => e.ref.current);
                        G.includes(e.key) && a.reverse(),
                          (function (e) {
                            let r = document.activeElement;
                            for (let n of e)
                              if (
                                n === r ||
                                (n.focus(), document.activeElement !== r)
                              )
                                return;
                          })(a);
                      }),
                      onBlur: (0, o.m)(e.onBlur, (e) => {
                        e.currentTarget.contains(e.target) ||
                          (window.clearTimeout(F.current), (S.current = ""));
                      }),
                      onPointerMove: (0, o.m)(
                        e.onPointerMove,
                        eX((e) => {
                          let r = e.target,
                            n = U.current !== e.clientX;
                          e.currentTarget.contains(r) &&
                            n &&
                            ((K.current =
                              e.clientX > U.current ? "right" : "left"),
                            (U.current = e.clientX));
                        }),
                      ),
                    }),
                  }),
                }),
              }),
            }),
          });
        });
      ec.displayName = ei;
      var ew = t.forwardRef((e, r) => {
        let { __scopeMenu: n, ...t } = e;
        return (0, x.jsx)(i.sG.div, { role: "group", ...t, ref: r });
      });
      ew.displayName = "MenuGroup";
      var eg = t.forwardRef((e, r) => {
        let { __scopeMenu: n, ...t } = e;
        return (0, x.jsx)(i.sG.div, { ...t, ref: r });
      });
      eg.displayName = "MenuLabel";
      var eh = "MenuItem",
        ex = "menu.itemSelect",
        ey = t.forwardRef((e, r) => {
          let { disabled: n = !1, onSelect: u, ...l } = e,
            s = t.useRef(null),
            d = er(eh, e.__scopeMenu),
            c = ed(eh, e.__scopeMenu),
            f = (0, a.s)(r, s),
            p = t.useRef(!1);
          return (0, x.jsx)(eb, {
            ...l,
            ref: f,
            disabled: n,
            onClick: (0, o.m)(e.onClick, () => {
              let e = s.current;
              if (!n && e) {
                let r = new CustomEvent(ex, { bubbles: !0, cancelable: !0 });
                e.addEventListener(ex, (e) => u?.(e), { once: !0 }),
                  (0, i.hO)(e, r),
                  r.defaultPrevented ? (p.current = !1) : d.onClose();
              }
            }),
            onPointerDown: (r) => {
              e.onPointerDown?.(r), (p.current = !0);
            },
            onPointerUp: (0, o.m)(e.onPointerUp, (e) => {
              p.current || e.currentTarget?.click();
            }),
            onKeyDown: (0, o.m)(e.onKeyDown, (e) => {
              let r = "" !== c.searchRef.current;
              n ||
                (r && " " === e.key) ||
                (K.includes(e.key) &&
                  (e.currentTarget.click(), e.preventDefault()));
            }),
          });
        });
      ey.displayName = eh;
      var eb = t.forwardRef((e, r) => {
          let { __scopeMenu: n, disabled: u = !1, textValue: l, ...s } = e,
            d = ed(eh, n),
            c = W(n),
            f = t.useRef(null),
            p = (0, a.s)(r, f),
            [m, v] = t.useState(!1),
            [w, g] = t.useState("");
          return (
            t.useEffect(() => {
              let e = f.current;
              e && g((e.textContent ?? "").trim());
            }, [s.children]),
            (0, x.jsx)(z.ItemSlot, {
              scope: n,
              disabled: u,
              textValue: l ?? w,
              children: (0, x.jsx)(A, {
                asChild: !0,
                ...c,
                focusable: !u,
                children: (0, x.jsx)(i.sG.div, {
                  role: "menuitem",
                  "data-highlighted": m ? "" : void 0,
                  "aria-disabled": u || void 0,
                  "data-disabled": u ? "" : void 0,
                  ...s,
                  ref: p,
                  onPointerMove: (0, o.m)(
                    e.onPointerMove,
                    eX((e) => {
                      u
                        ? d.onItemLeave(e)
                        : (d.onItemEnter(e),
                          e.defaultPrevented ||
                            e.currentTarget.focus({ preventScroll: !0 }));
                    }),
                  ),
                  onPointerLeave: (0, o.m)(
                    e.onPointerLeave,
                    eX((e) => d.onItemLeave(e)),
                  ),
                  onFocus: (0, o.m)(e.onFocus, () => v(!0)),
                  onBlur: (0, o.m)(e.onBlur, () => v(!1)),
                }),
              }),
            })
          );
        }),
        eC = t.forwardRef((e, r) => {
          let { checked: n = !1, onCheckedChange: t, ...a } = e;
          return (0, x.jsx)(eP, {
            scope: e.__scopeMenu,
            checked: n,
            children: (0, x.jsx)(ey, {
              role: "menuitemcheckbox",
              "aria-checked": eU(n) ? "mixed" : n,
              ...a,
              ref: r,
              "data-state": eV(n),
              onSelect: (0, o.m)(a.onSelect, () => t?.(!!eU(n) || !n), {
                checkForDefaultPrevented: !1,
              }),
            }),
          });
        });
      eC.displayName = "MenuCheckboxItem";
      var eM = "MenuRadioGroup",
        [eR, eD] = Y(eM, { value: void 0, onValueChange: () => {} }),
        ej = t.forwardRef((e, r) => {
          let { value: n, onValueChange: t, ...o } = e,
            a = (0, h.c)(t);
          return (0, x.jsx)(eR, {
            scope: e.__scopeMenu,
            value: n,
            onValueChange: a,
            children: (0, x.jsx)(ew, { ...o, ref: r }),
          });
        });
      ej.displayName = eM;
      var e_ = "MenuRadioItem",
        ek = t.forwardRef((e, r) => {
          let { value: n, ...t } = e,
            a = eD(e_, e.__scopeMenu),
            u = n === a.value;
          return (0, x.jsx)(eP, {
            scope: e.__scopeMenu,
            checked: u,
            children: (0, x.jsx)(ey, {
              role: "menuitemradio",
              "aria-checked": u,
              ...t,
              ref: r,
              "data-state": eV(u),
              onSelect: (0, o.m)(t.onSelect, () => a.onValueChange?.(n), {
                checkForDefaultPrevented: !1,
              }),
            }),
          });
        });
      ek.displayName = e_;
      var eI = "MenuItemIndicator",
        [eP, eT] = Y(eI, { checked: !1 }),
        eE = t.forwardRef((e, r) => {
          let { __scopeMenu: n, forceMount: t, ...o } = e,
            a = eT(eI, n);
          return (0, x.jsx)(g.C, {
            present: t || eU(a.checked) || !0 === a.checked,
            children: (0, x.jsx)(i.sG.span, {
              ...o,
              ref: r,
              "data-state": eV(a.checked),
            }),
          });
        });
      eE.displayName = eI;
      var eA = t.forwardRef((e, r) => {
        let { __scopeMenu: n, ...t } = e;
        return (0, x.jsx)(i.sG.div, {
          role: "separator",
          "aria-orientation": "horizontal",
          ...t,
          ref: r,
        });
      });
      eA.displayName = "MenuSeparator";
      var eF = t.forwardRef((e, r) => {
        let { __scopeMenu: n, ...t } = e,
          o = J(n);
        return (0, x.jsx)(v.i3, { ...o, ...t, ref: r });
      });
      eF.displayName = "MenuArrow";
      var [eS, eN] = Y("MenuSub"),
        eL = "MenuSubTrigger",
        eO = t.forwardRef((e, r) => {
          let n = $(eL, e.__scopeMenu),
            u = er(eL, e.__scopeMenu),
            l = eN(eL, e.__scopeMenu),
            i = ed(eL, e.__scopeMenu),
            s = t.useRef(null),
            { pointerGraceTimerRef: d, onPointerGraceIntentChange: c } = i,
            f = { __scopeMenu: e.__scopeMenu },
            p = t.useCallback(() => {
              s.current && window.clearTimeout(s.current), (s.current = null);
            }, []);
          return (
            t.useEffect(() => p, [p]),
            t.useEffect(() => {
              let e = d.current;
              return () => {
                window.clearTimeout(e), c(null);
              };
            }, [d, c]),
            (0, x.jsx)(et, {
              asChild: !0,
              ...f,
              children: (0, x.jsx)(eb, {
                id: l.triggerId,
                "aria-haspopup": "menu",
                "aria-expanded": n.open,
                "aria-controls": l.contentId,
                "data-state": eB(n.open),
                ...e,
                ref: (0, a.t)(r, l.onTriggerChange),
                onClick: (r) => {
                  e.onClick?.(r),
                    e.disabled ||
                      r.defaultPrevented ||
                      (r.currentTarget.focus(), n.open || n.onOpenChange(!0));
                },
                onPointerMove: (0, o.m)(
                  e.onPointerMove,
                  eX((r) => {
                    i.onItemEnter(r),
                      !r.defaultPrevented &&
                        (e.disabled ||
                          n.open ||
                          s.current ||
                          (i.onPointerGraceIntentChange(null),
                          (s.current = window.setTimeout(() => {
                            n.onOpenChange(!0), p();
                          }, 100))));
                  }),
                ),
                onPointerLeave: (0, o.m)(
                  e.onPointerLeave,
                  eX((e) => {
                    p();
                    let r = n.content?.getBoundingClientRect();
                    if (r) {
                      let t = n.content?.dataset.side,
                        o = "right" === t,
                        a = r[o ? "left" : "right"],
                        u = r[o ? "right" : "left"];
                      i.onPointerGraceIntentChange({
                        area: [
                          { x: e.clientX + (o ? -5 : 5), y: e.clientY },
                          { x: a, y: r.top },
                          { x: u, y: r.top },
                          { x: u, y: r.bottom },
                          { x: a, y: r.bottom },
                        ],
                        side: t,
                      }),
                        window.clearTimeout(d.current),
                        (d.current = window.setTimeout(
                          () => i.onPointerGraceIntentChange(null),
                          300,
                        ));
                    } else {
                      if ((i.onTriggerLeave(e), e.defaultPrevented)) return;
                      i.onPointerGraceIntentChange(null);
                    }
                  }),
                ),
                onKeyDown: (0, o.m)(e.onKeyDown, (r) => {
                  let t = "" !== i.searchRef.current;
                  e.disabled ||
                    (t && " " === r.key) ||
                    (U[u.dir].includes(r.key) &&
                      (n.onOpenChange(!0),
                      n.content?.focus(),
                      r.preventDefault()));
                }),
              }),
            })
          );
        });
      eO.displayName = eL;
      var eK = "MenuSubContent",
        eG = t.forwardRef((e, r) => {
          let n = eu(ei, e.__scopeMenu),
            { forceMount: u = n.forceMount, ...l } = e,
            i = $(ei, e.__scopeMenu),
            s = er(ei, e.__scopeMenu),
            d = eN(eK, e.__scopeMenu),
            c = t.useRef(null),
            f = (0, a.s)(r, c);
          return (0, x.jsx)(z.Provider, {
            scope: e.__scopeMenu,
            children: (0, x.jsx)(g.C, {
              present: u || i.open,
              children: (0, x.jsx)(z.Slot, {
                scope: e.__scopeMenu,
                children: (0, x.jsx)(ev, {
                  id: d.contentId,
                  "aria-labelledby": d.triggerId,
                  ...l,
                  ref: f,
                  align: "start",
                  side: "rtl" === s.dir ? "left" : "right",
                  disableOutsidePointerEvents: !1,
                  disableOutsideScroll: !1,
                  trapFocus: !1,
                  onOpenAutoFocus: (e) => {
                    s.isUsingKeyboardRef.current && c.current?.focus(),
                      e.preventDefault();
                  },
                  onCloseAutoFocus: (e) => e.preventDefault(),
                  onFocusOutside: (0, o.m)(e.onFocusOutside, (e) => {
                    e.target !== d.trigger && i.onOpenChange(!1);
                  }),
                  onEscapeKeyDown: (0, o.m)(e.onEscapeKeyDown, (e) => {
                    s.onClose(), e.preventDefault();
                  }),
                  onKeyDown: (0, o.m)(e.onKeyDown, (e) => {
                    let r = e.currentTarget.contains(e.target),
                      n = V[s.dir].includes(e.key);
                    r &&
                      n &&
                      (i.onOpenChange(!1),
                      d.trigger?.focus(),
                      e.preventDefault());
                  }),
                }),
              }),
            }),
          });
        });
      function eB(e) {
        return e ? "open" : "closed";
      }
      function eU(e) {
        return "indeterminate" === e;
      }
      function eV(e) {
        return eU(e) ? "indeterminate" : e ? "checked" : "unchecked";
      }
      function eX(e) {
        return (r) => ("mouse" === r.pointerType ? e(r) : void 0);
      }
      eG.displayName = eK;
      var ez = "DropdownMenu",
        [eH, eq] = (0, u.A)(ez, [Z]),
        eY = Z(),
        [eZ, eJ] = eH(ez),
        eW = (e) => {
          let {
              __scopeDropdownMenu: r,
              children: n,
              dir: o,
              open: a,
              defaultOpen: u,
              onOpenChange: i,
              modal: s = !0,
            } = e,
            d = eY(r),
            c = t.useRef(null),
            [f, p] = (0, l.i)({
              prop: a,
              defaultProp: u ?? !1,
              onChange: i,
              caller: ez,
            });
          return (0, x.jsx)(eZ, {
            scope: r,
            triggerId: (0, m.B)(),
            triggerRef: c,
            contentId: (0, m.B)(),
            open: f,
            onOpenChange: p,
            onOpenToggle: t.useCallback(() => p((e) => !e), [p]),
            modal: s,
            children: (0, x.jsx)(en, {
              ...d,
              open: f,
              onOpenChange: p,
              dir: o,
              modal: s,
              children: n,
            }),
          });
        };
      eW.displayName = ez;
      var eQ = "DropdownMenuTrigger",
        e$ = t.forwardRef((e, r) => {
          let { __scopeDropdownMenu: n, disabled: t = !1, ...u } = e,
            l = eJ(eQ, n),
            s = eY(n);
          return (0, x.jsx)(et, {
            asChild: !0,
            ...s,
            children: (0, x.jsx)(i.sG.button, {
              type: "button",
              id: l.triggerId,
              "aria-haspopup": "menu",
              "aria-expanded": l.open,
              "aria-controls": l.open ? l.contentId : void 0,
              "data-state": l.open ? "open" : "closed",
              "data-disabled": t ? "" : void 0,
              disabled: t,
              ...u,
              ref: (0, a.t)(r, l.triggerRef),
              onPointerDown: (0, o.m)(e.onPointerDown, (e) => {
                !t &&
                  0 === e.button &&
                  !1 === e.ctrlKey &&
                  (l.onOpenToggle(), l.open || e.preventDefault());
              }),
              onKeyDown: (0, o.m)(e.onKeyDown, (e) => {
                !t &&
                  (["Enter", " "].includes(e.key) && l.onOpenToggle(),
                  "ArrowDown" === e.key && l.onOpenChange(!0),
                  ["Enter", " ", "ArrowDown"].includes(e.key) &&
                    e.preventDefault());
              }),
            }),
          });
        });
      e$.displayName = eQ;
      var e0 = (e) => {
        let { __scopeDropdownMenu: r, ...n } = e,
          t = eY(r);
        return (0, x.jsx)(el, { ...t, ...n });
      };
      e0.displayName = "DropdownMenuPortal";
      var e1 = "DropdownMenuContent",
        e5 = t.forwardRef((e, r) => {
          let { __scopeDropdownMenu: n, ...a } = e,
            u = eJ(e1, n),
            l = eY(n),
            i = t.useRef(!1);
          return (0, x.jsx)(ec, {
            id: u.contentId,
            "aria-labelledby": u.triggerId,
            ...l,
            ...a,
            ref: r,
            onCloseAutoFocus: (0, o.m)(e.onCloseAutoFocus, (e) => {
              i.current || u.triggerRef.current?.focus(),
                (i.current = !1),
                e.preventDefault();
            }),
            onInteractOutside: (0, o.m)(e.onInteractOutside, (e) => {
              let r = e.detail.originalEvent,
                n = 0 === r.button && !0 === r.ctrlKey,
                t = 2 === r.button || n;
              (!u.modal || t) && (i.current = !0);
            }),
            style: {
              ...e.style,
              "--radix-dropdown-menu-content-transform-origin":
                "var(--radix-popper-transform-origin)",
              "--radix-dropdown-menu-content-available-width":
                "var(--radix-popper-available-width)",
              "--radix-dropdown-menu-content-available-height":
                "var(--radix-popper-available-height)",
              "--radix-dropdown-menu-trigger-width":
                "var(--radix-popper-anchor-width)",
              "--radix-dropdown-menu-trigger-height":
                "var(--radix-popper-anchor-height)",
            },
          });
        });
      e5.displayName = e1;
      var e6 = t.forwardRef((e, r) => {
        let { __scopeDropdownMenu: n, ...t } = e,
          o = eY(n);
        return (0, x.jsx)(ew, { ...o, ...t, ref: r });
      });
      e6.displayName = "DropdownMenuGroup";
      var e8 = t.forwardRef((e, r) => {
        let { __scopeDropdownMenu: n, ...t } = e,
          o = eY(n);
        return (0, x.jsx)(eg, { ...o, ...t, ref: r });
      });
      e8.displayName = "DropdownMenuLabel";
      var e4 = t.forwardRef((e, r) => {
        let { __scopeDropdownMenu: n, ...t } = e,
          o = eY(n);
        return (0, x.jsx)(ey, { ...o, ...t, ref: r });
      });
      (e4.displayName = "DropdownMenuItem"),
        (t.forwardRef((e, r) => {
          let { __scopeDropdownMenu: n, ...t } = e,
            o = eY(n);
          return (0, x.jsx)(eC, { ...o, ...t, ref: r });
        }).displayName = "DropdownMenuCheckboxItem");
      var e2 = t.forwardRef((e, r) => {
        let { __scopeDropdownMenu: n, ...t } = e,
          o = eY(n);
        return (0, x.jsx)(ej, { ...o, ...t, ref: r });
      });
      e2.displayName = "DropdownMenuRadioGroup";
      var e9 = t.forwardRef((e, r) => {
        let { __scopeDropdownMenu: n, ...t } = e,
          o = eY(n);
        return (0, x.jsx)(ek, { ...o, ...t, ref: r });
      });
      e9.displayName = "DropdownMenuRadioItem";
      var e7 = t.forwardRef((e, r) => {
        let { __scopeDropdownMenu: n, ...t } = e,
          o = eY(n);
        return (0, x.jsx)(eE, { ...o, ...t, ref: r });
      });
      e7.displayName = "DropdownMenuItemIndicator";
      var e3 = t.forwardRef((e, r) => {
        let { __scopeDropdownMenu: n, ...t } = e,
          o = eY(n);
        return (0, x.jsx)(eA, { ...o, ...t, ref: r });
      });
      (e3.displayName = "DropdownMenuSeparator"),
        (t.forwardRef((e, r) => {
          let { __scopeDropdownMenu: n, ...t } = e,
            o = eY(n);
          return (0, x.jsx)(eF, { ...o, ...t, ref: r });
        }).displayName = "DropdownMenuArrow"),
        (t.forwardRef((e, r) => {
          let { __scopeDropdownMenu: n, ...t } = e,
            o = eY(n);
          return (0, x.jsx)(eO, { ...o, ...t, ref: r });
        }).displayName = "DropdownMenuSubTrigger"),
        (t.forwardRef((e, r) => {
          let { __scopeDropdownMenu: n, ...t } = e,
            o = eY(n);
          return (0, x.jsx)(eG, {
            ...o,
            ...t,
            ref: r,
            style: {
              ...e.style,
              "--radix-dropdown-menu-content-transform-origin":
                "var(--radix-popper-transform-origin)",
              "--radix-dropdown-menu-content-available-width":
                "var(--radix-popper-available-width)",
              "--radix-dropdown-menu-content-available-height":
                "var(--radix-popper-available-height)",
              "--radix-dropdown-menu-trigger-width":
                "var(--radix-popper-anchor-width)",
              "--radix-dropdown-menu-trigger-height":
                "var(--radix-popper-anchor-height)",
            },
          });
        }).displayName = "DropdownMenuSubContent");
      var re = eW,
        rr = e$,
        rn = e0,
        rt = e5,
        ro = e6,
        ra = e8,
        ru = e4,
        rl = e2,
        ri = e9,
        rs = e7,
        rd = e3;
    },
    83659: (e, r, n) => {
      n.d(r, { A: () => t });
      let t = (0, n(95255).A)("Circle", [
        ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
      ]);
    },
  });
//# sourceMappingURL=7911.js.map
