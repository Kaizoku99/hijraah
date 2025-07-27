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
    (e._sentryDebugIds[t] = "aae1ab22-41fc-422d-beb6-b8b823073e58"),
    (e._sentryDebugIdIdentifier =
      "sentry-dbid-aae1ab22-41fc-422d-beb6-b8b823073e58"));
} catch (e) {}
("use strict");
(exports.id = 7333),
  (exports.ids = [7333]),
  (exports.modules = {
    8166: (e, t, r) => {
      r.d(t, { uB: () => ey });
      var n = /[\\\/_+.#"@\[\(\{&]/,
        o = /[\\\/_+.#"@\[\(\{&]/g,
        a = /[\s-]/,
        l = /[\s-]/g;
      function i(e) {
        return e.toLowerCase().replace(l, " ");
      }
      var u = r(84205),
        c = r(28777),
        s = r(71604),
        d = r(18047),
        f = r(42414),
        p = r(48705),
        m = r(67301),
        v = r(94449),
        h = r(83138),
        g = r(94653),
        y = r(78593),
        b = r(26481),
        w = r(82824),
        E = r(73460),
        x = r(63961),
        C = r(61268),
        S = "Dialog",
        [R, k] = (0, d.A)(S),
        [A, I] = R(S),
        P = (e) => {
          let {
              __scopeDialog: t,
              children: r,
              open: n,
              defaultOpen: o,
              onOpenChange: a,
              modal: l = !0,
            } = e,
            i = u.useRef(null),
            c = u.useRef(null),
            [s, d] = (0, p.i)({
              prop: n,
              defaultProp: o ?? !1,
              onChange: a,
              caller: S,
            });
          return (0, C.jsx)(A, {
            scope: t,
            triggerRef: i,
            contentRef: c,
            contentId: (0, f.B)(),
            titleId: (0, f.B)(),
            descriptionId: (0, f.B)(),
            open: s,
            onOpenChange: d,
            onOpenToggle: u.useCallback(() => d((e) => !e), [d]),
            modal: l,
            children: r,
          });
        };
      P.displayName = S;
      var j = "DialogTrigger";
      u.forwardRef((e, t) => {
        let { __scopeDialog: r, ...n } = e,
          o = I(j, r),
          a = (0, s.s)(t, o.triggerRef);
        return (0, C.jsx)(y.sG.button, {
          type: "button",
          "aria-haspopup": "dialog",
          "aria-expanded": o.open,
          "aria-controls": o.contentId,
          "data-state": H(o.open),
          ...n,
          ref: a,
          onClick: (0, c.m)(e.onClick, o.onOpenToggle),
        });
      }).displayName = j;
      var D = "DialogPortal",
        [N, M] = R(D, { forceMount: void 0 }),
        O = (e) => {
          let {
              __scopeDialog: t,
              forceMount: r,
              children: n,
              container: o,
            } = e,
            a = I(D, t);
          return (0, C.jsx)(N, {
            scope: t,
            forceMount: r,
            children: u.Children.map(n, (e) =>
              (0, C.jsx)(g.C, {
                present: r || a.open,
                children: (0, C.jsx)(h.Z, {
                  asChild: !0,
                  container: o,
                  children: e,
                }),
              }),
            ),
          });
        };
      O.displayName = D;
      var T = "DialogOverlay",
        $ = u.forwardRef((e, t) => {
          let r = M(T, e.__scopeDialog),
            { forceMount: n = r.forceMount, ...o } = e,
            a = I(T, e.__scopeDialog);
          return a.modal
            ? (0, C.jsx)(g.C, {
                present: n || a.open,
                children: (0, C.jsx)(L, { ...o, ref: t }),
              })
            : null;
        });
      $.displayName = T;
      var F = (0, x.TL)("DialogOverlay.RemoveScroll"),
        L = u.forwardRef((e, t) => {
          let { __scopeDialog: r, ...n } = e,
            o = I(T, r);
          return (0, C.jsx)(w.A, {
            as: F,
            allowPinchZoom: !0,
            shards: [o.contentRef],
            children: (0, C.jsx)(y.sG.div, {
              "data-state": H(o.open),
              ...n,
              ref: t,
              style: { pointerEvents: "auto", ...n.style },
            }),
          });
        }),
        _ = "DialogContent",
        B = u.forwardRef((e, t) => {
          let r = M(_, e.__scopeDialog),
            { forceMount: n = r.forceMount, ...o } = e,
            a = I(_, e.__scopeDialog);
          return (0, C.jsx)(g.C, {
            present: n || a.open,
            children: a.modal
              ? (0, C.jsx)(K, { ...o, ref: t })
              : (0, C.jsx)(G, { ...o, ref: t }),
          });
        });
      B.displayName = _;
      var K = u.forwardRef((e, t) => {
          let r = I(_, e.__scopeDialog),
            n = u.useRef(null),
            o = (0, s.s)(t, r.contentRef, n);
          return (
            u.useEffect(() => {
              let e = n.current;
              if (e) return (0, E.Eq)(e);
            }, []),
            (0, C.jsx)(U, {
              ...e,
              ref: o,
              trapFocus: r.open,
              disableOutsidePointerEvents: !0,
              onCloseAutoFocus: (0, c.m)(e.onCloseAutoFocus, (e) => {
                e.preventDefault(), r.triggerRef.current?.focus();
              }),
              onPointerDownOutside: (0, c.m)(e.onPointerDownOutside, (e) => {
                let t = e.detail.originalEvent,
                  r = 0 === t.button && !0 === t.ctrlKey;
                (2 === t.button || r) && e.preventDefault();
              }),
              onFocusOutside: (0, c.m)(e.onFocusOutside, (e) =>
                e.preventDefault(),
              ),
            })
          );
        }),
        G = u.forwardRef((e, t) => {
          let r = I(_, e.__scopeDialog),
            n = u.useRef(!1),
            o = u.useRef(!1);
          return (0, C.jsx)(U, {
            ...e,
            ref: t,
            trapFocus: !1,
            disableOutsidePointerEvents: !1,
            onCloseAutoFocus: (t) => {
              e.onCloseAutoFocus?.(t),
                t.defaultPrevented ||
                  (n.current || r.triggerRef.current?.focus(),
                  t.preventDefault()),
                (n.current = !1),
                (o.current = !1);
            },
            onInteractOutside: (t) => {
              e.onInteractOutside?.(t),
                t.defaultPrevented ||
                  ((n.current = !0),
                  "pointerdown" === t.detail.originalEvent.type &&
                    (o.current = !0));
              let a = t.target;
              r.triggerRef.current?.contains(a) && t.preventDefault(),
                "focusin" === t.detail.originalEvent.type &&
                  o.current &&
                  t.preventDefault();
            },
          });
        }),
        U = u.forwardRef((e, t) => {
          let {
              __scopeDialog: r,
              trapFocus: n,
              onOpenAutoFocus: o,
              onCloseAutoFocus: a,
              ...l
            } = e,
            i = I(_, r),
            c = u.useRef(null),
            d = (0, s.s)(t, c);
          return (
            (0, b.Oh)(),
            (0, C.jsxs)(C.Fragment, {
              children: [
                (0, C.jsx)(v.n, {
                  asChild: !0,
                  loop: !0,
                  trapped: n,
                  onMountAutoFocus: o,
                  onUnmountAutoFocus: a,
                  children: (0, C.jsx)(m.qW, {
                    role: "dialog",
                    id: i.contentId,
                    "aria-describedby": i.descriptionId,
                    "aria-labelledby": i.titleId,
                    "data-state": H(i.open),
                    ...l,
                    ref: d,
                    onDismiss: () => i.onOpenChange(!1),
                  }),
                }),
                (0, C.jsxs)(C.Fragment, {
                  children: [
                    (0, C.jsx)(Z, { titleId: i.titleId }),
                    (0, C.jsx)(J, {
                      contentRef: c,
                      descriptionId: i.descriptionId,
                    }),
                  ],
                }),
              ],
            })
          );
        }),
        W = "DialogTitle";
      u.forwardRef((e, t) => {
        let { __scopeDialog: r, ...n } = e,
          o = I(W, r);
        return (0, C.jsx)(y.sG.h2, { id: o.titleId, ...n, ref: t });
      }).displayName = W;
      var q = "DialogDescription";
      u.forwardRef((e, t) => {
        let { __scopeDialog: r, ...n } = e,
          o = I(q, r);
        return (0, C.jsx)(y.sG.p, { id: o.descriptionId, ...n, ref: t });
      }).displayName = q;
      var Y = "DialogClose";
      function H(e) {
        return e ? "open" : "closed";
      }
      u.forwardRef((e, t) => {
        let { __scopeDialog: r, ...n } = e,
          o = I(Y, r);
        return (0, C.jsx)(y.sG.button, {
          type: "button",
          ...n,
          ref: t,
          onClick: (0, c.m)(e.onClick, () => o.onOpenChange(!1)),
        });
      }).displayName = Y;
      var X = "DialogTitleWarning",
        [V, z] = (0, d.q)(X, {
          contentName: _,
          titleName: W,
          docsSlug: "dialog",
        }),
        Z = ({ titleId: e }) => {
          let t = z(X),
            r = `\`${t.contentName}\` requires a \`${t.titleName}\` for the component to be accessible for screen reader users.

If you want to hide the \`${t.titleName}\`, you can wrap it with our VisuallyHidden component.

For more information, see https://radix-ui.com/primitives/docs/components/${t.docsSlug}`;
          return (
            u.useEffect(() => {
              e && (document.getElementById(e) || console.error(r));
            }, [r, e]),
            null
          );
        },
        J = ({ contentRef: e, descriptionId: t }) => {
          let r = z("DialogDescriptionWarning"),
            n = `Warning: Missing \`Description\` or \`aria-describedby={undefined}\` for {${r.contentName}}.`;
          return (
            u.useEffect(() => {
              let r = e.current?.getAttribute("aria-describedby");
              t && r && (document.getElementById(t) || console.warn(n));
            }, [n, e, t]),
            null
          );
        },
        Q = '[cmdk-group=""]',
        ee = '[cmdk-group-items=""]',
        et = '[cmdk-item=""]',
        er = `${et}:not([aria-disabled="true"])`,
        en = "cmdk-item-select",
        eo = "data-value",
        ea = (e, t, r) =>
          (function (e, t, r) {
            return (function e(t, r, i, u, c, s, d) {
              if (s === r.length) return c === t.length ? 1 : 0.99;
              var f = `${c},${s}`;
              if (void 0 !== d[f]) return d[f];
              for (
                var p, m, v, h, g = u.charAt(s), y = i.indexOf(g, c), b = 0;
                y >= 0;

              )
                (p = e(t, r, i, u, y + 1, s + 1, d)) > b &&
                  (y === c
                    ? (p *= 1)
                    : n.test(t.charAt(y - 1))
                      ? ((p *= 0.8),
                        (v = t.slice(c, y - 1).match(o)) &&
                          c > 0 &&
                          (p *= Math.pow(0.999, v.length)))
                      : a.test(t.charAt(y - 1))
                        ? ((p *= 0.9),
                          (h = t.slice(c, y - 1).match(l)) &&
                            c > 0 &&
                            (p *= Math.pow(0.999, h.length)))
                        : ((p *= 0.17), c > 0 && (p *= Math.pow(0.999, y - c))),
                  t.charAt(y) !== r.charAt(s) && (p *= 0.9999)),
                  ((p < 0.1 && i.charAt(y - 1) === u.charAt(s + 1)) ||
                    (u.charAt(s + 1) === u.charAt(s) &&
                      i.charAt(y - 1) !== u.charAt(s))) &&
                    0.1 * (m = e(t, r, i, u, y + 1, s + 2, d)) > p &&
                    (p = 0.1 * m),
                  p > b && (b = p),
                  (y = i.indexOf(g, y + 1));
              return (d[f] = b), b;
            })(
              (e = r && r.length > 0 ? `${e + " " + r.join(" ")}` : e),
              t,
              i(e),
              i(t),
              0,
              0,
              {},
            );
          })(e, t, r),
        el = u.createContext(void 0),
        ei = () => u.useContext(el),
        eu = u.createContext(void 0),
        ec = () => u.useContext(eu),
        es = u.createContext(void 0),
        ed = u.forwardRef((e, t) => {
          let r = eE(() => {
              var t, r;
              return {
                search: "",
                value:
                  null != (r = null != (t = e.value) ? t : e.defaultValue)
                    ? r
                    : "",
                selectedItemId: void 0,
                filtered: { count: 0, items: new Map(), groups: new Set() },
              };
            }),
            n = eE(() => new Set()),
            o = eE(() => new Map()),
            a = eE(() => new Map()),
            l = eE(() => new Set()),
            i = eb(e),
            {
              label: c,
              children: s,
              value: d,
              onValueChange: p,
              filter: m,
              shouldFilter: v,
              loop: h,
              disablePointerSelection: g = !1,
              vimBindings: b = !0,
              ...w
            } = e,
            E = (0, f.B)(),
            x = (0, f.B)(),
            C = (0, f.B)(),
            S = u.useRef(null),
            R = eS();
          ew(() => {
            if (void 0 !== d) {
              let e = d.trim();
              (r.current.value = e), k.emit();
            }
          }, [d]),
            ew(() => {
              R(6, N);
            }, []);
          let k = u.useMemo(
              () => ({
                subscribe: (e) => (l.current.add(e), () => l.current.delete(e)),
                snapshot: () => r.current,
                setState: (e, t, n) => {
                  var o, a, l, u;
                  if (!Object.is(r.current[e], t)) {
                    if (((r.current[e] = t), "search" === e)) D(), P(), R(1, j);
                    else if ("value" === e) {
                      if (
                        document.activeElement.hasAttribute("cmdk-input") ||
                        document.activeElement.hasAttribute("cmdk-root")
                      ) {
                        let e = document.getElementById(C);
                        e
                          ? e.focus()
                          : null == (o = document.getElementById(E)) ||
                            o.focus();
                      }
                      if (
                        (R(7, () => {
                          var e;
                          (r.current.selectedItemId =
                            null == (e = M()) ? void 0 : e.id),
                            k.emit();
                        }),
                        n || R(5, N),
                        (null == (a = i.current) ? void 0 : a.value) !== void 0)
                      ) {
                        null == (u = (l = i.current).onValueChange) ||
                          u.call(l, null != t ? t : "");
                        return;
                      }
                    }
                    k.emit();
                  }
                },
                emit: () => {
                  l.current.forEach((e) => e());
                },
              }),
              [],
            ),
            A = u.useMemo(
              () => ({
                value: (e, t, n) => {
                  var o;
                  t !== (null == (o = a.current.get(e)) ? void 0 : o.value) &&
                    (a.current.set(e, { value: t, keywords: n }),
                    r.current.filtered.items.set(e, I(t, n)),
                    R(2, () => {
                      P(), k.emit();
                    }));
                },
                item: (e, t) => (
                  n.current.add(e),
                  t &&
                    (o.current.has(t)
                      ? o.current.get(t).add(e)
                      : o.current.set(t, new Set([e]))),
                  R(3, () => {
                    D(), P(), r.current.value || j(), k.emit();
                  }),
                  () => {
                    a.current.delete(e),
                      n.current.delete(e),
                      r.current.filtered.items.delete(e);
                    let t = M();
                    R(4, () => {
                      D(),
                        (null == t ? void 0 : t.getAttribute("id")) === e &&
                          j(),
                        k.emit();
                    });
                  }
                ),
                group: (e) => (
                  o.current.has(e) || o.current.set(e, new Set()),
                  () => {
                    a.current.delete(e), o.current.delete(e);
                  }
                ),
                filter: () => i.current.shouldFilter,
                label: c || e["aria-label"],
                getDisablePointerSelection: () =>
                  i.current.disablePointerSelection,
                listId: E,
                inputId: C,
                labelId: x,
                listInnerRef: S,
              }),
              [],
            );
          function I(e, t) {
            var n, o;
            let a =
              null != (o = null == (n = i.current) ? void 0 : n.filter)
                ? o
                : ea;
            return e ? a(e, r.current.search, t) : 0;
          }
          function P() {
            if (!r.current.search || !1 === i.current.shouldFilter) return;
            let e = r.current.filtered.items,
              t = [];
            r.current.filtered.groups.forEach((r) => {
              let n = o.current.get(r),
                a = 0;
              n.forEach((t) => {
                a = Math.max(e.get(t), a);
              }),
                t.push([r, a]);
            });
            let n = S.current;
            O()
              .sort((t, r) => {
                var n, o;
                let a = t.getAttribute("id"),
                  l = r.getAttribute("id");
                return (
                  (null != (n = e.get(l)) ? n : 0) -
                  (null != (o = e.get(a)) ? o : 0)
                );
              })
              .forEach((e) => {
                let t = e.closest(ee);
                t
                  ? t.appendChild(
                      e.parentElement === t ? e : e.closest(`${ee} > *`),
                    )
                  : n.appendChild(
                      e.parentElement === n ? e : e.closest(`${ee} > *`),
                    );
              }),
              t
                .sort((e, t) => t[1] - e[1])
                .forEach((e) => {
                  var t;
                  let r =
                    null == (t = S.current)
                      ? void 0
                      : t.querySelector(
                          `${Q}[${eo}="${encodeURIComponent(e[0])}"]`,
                        );
                  null == r || r.parentElement.appendChild(r);
                });
          }
          function j() {
            let e = O().find((e) => "true" !== e.getAttribute("aria-disabled")),
              t = null == e ? void 0 : e.getAttribute(eo);
            k.setState("value", t || void 0);
          }
          function D() {
            var e, t, l, u;
            if (!r.current.search || !1 === i.current.shouldFilter) {
              r.current.filtered.count = n.current.size;
              return;
            }
            r.current.filtered.groups = new Set();
            let c = 0;
            for (let o of n.current) {
              let n = I(
                null != (t = null == (e = a.current.get(o)) ? void 0 : e.value)
                  ? t
                  : "",
                null !=
                  (u = null == (l = a.current.get(o)) ? void 0 : l.keywords)
                  ? u
                  : [],
              );
              r.current.filtered.items.set(o, n), n > 0 && c++;
            }
            for (let [e, t] of o.current)
              for (let n of t)
                if (r.current.filtered.items.get(n) > 0) {
                  r.current.filtered.groups.add(e);
                  break;
                }
            r.current.filtered.count = c;
          }
          function N() {
            var e, t, r;
            let n = M();
            n &&
              ((null == (e = n.parentElement) ? void 0 : e.firstChild) === n &&
                (null ==
                  (r =
                    null == (t = n.closest(Q))
                      ? void 0
                      : t.querySelector('[cmdk-group-heading=""]')) ||
                  r.scrollIntoView({ block: "nearest" })),
              n.scrollIntoView({ block: "nearest" }));
          }
          function M() {
            var e;
            return null == (e = S.current)
              ? void 0
              : e.querySelector(`${et}[aria-selected="true"]`);
          }
          function O() {
            var e;
            return Array.from(
              (null == (e = S.current) ? void 0 : e.querySelectorAll(er)) || [],
            );
          }
          function T(e) {
            let t = O()[e];
            t && k.setState("value", t.getAttribute(eo));
          }
          function $(e) {
            var t;
            let r = M(),
              n = O(),
              o = n.findIndex((e) => e === r),
              a = n[o + e];
            null != (t = i.current) &&
              t.loop &&
              (a =
                o + e < 0
                  ? n[n.length - 1]
                  : o + e === n.length
                    ? n[0]
                    : n[o + e]),
              a && k.setState("value", a.getAttribute(eo));
          }
          function F(e) {
            let t = M(),
              r = null == t ? void 0 : t.closest(Q),
              n;
            for (; r && !n; )
              n =
                null ==
                (r =
                  e > 0
                    ? (function (e, t) {
                        let r = e.nextElementSibling;
                        for (; r; ) {
                          if (r.matches(t)) return r;
                          r = r.nextElementSibling;
                        }
                      })(r, Q)
                    : (function (e, t) {
                        let r = e.previousElementSibling;
                        for (; r; ) {
                          if (r.matches(t)) return r;
                          r = r.previousElementSibling;
                        }
                      })(r, Q))
                  ? void 0
                  : r.querySelector(er);
            n ? k.setState("value", n.getAttribute(eo)) : $(e);
          }
          let L = () => T(O().length - 1),
            _ = (e) => {
              e.preventDefault(), e.metaKey ? L() : e.altKey ? F(1) : $(1);
            },
            B = (e) => {
              e.preventDefault(), e.metaKey ? T(0) : e.altKey ? F(-1) : $(-1);
            };
          return u.createElement(
            y.sG.div,
            {
              ref: t,
              tabIndex: -1,
              ...w,
              "cmdk-root": "",
              onKeyDown: (e) => {
                var t;
                null == (t = w.onKeyDown) || t.call(w, e);
                let r = e.nativeEvent.isComposing || 229 === e.keyCode;
                if (!(e.defaultPrevented || r))
                  switch (e.key) {
                    case "n":
                    case "j":
                      b && e.ctrlKey && _(e);
                      break;
                    case "ArrowDown":
                      _(e);
                      break;
                    case "p":
                    case "k":
                      b && e.ctrlKey && B(e);
                      break;
                    case "ArrowUp":
                      B(e);
                      break;
                    case "Home":
                      e.preventDefault(), T(0);
                      break;
                    case "End":
                      e.preventDefault(), L();
                      break;
                    case "Enter": {
                      e.preventDefault();
                      let t = M();
                      if (t) {
                        let e = new Event(en);
                        t.dispatchEvent(e);
                      }
                    }
                  }
              },
            },
            u.createElement(
              "label",
              {
                "cmdk-label": "",
                htmlFor: A.inputId,
                id: A.labelId,
                style: ek,
              },
              c,
            ),
            eR(e, (e) =>
              u.createElement(
                eu.Provider,
                { value: k },
                u.createElement(el.Provider, { value: A }, e),
              ),
            ),
          );
        }),
        ef = u.forwardRef((e, t) => {
          var r, n;
          let o = (0, f.B)(),
            a = u.useRef(null),
            l = u.useContext(es),
            i = ei(),
            c = eb(e),
            d =
              null != (n = null == (r = c.current) ? void 0 : r.forceMount)
                ? n
                : null == l
                  ? void 0
                  : l.forceMount;
          ew(() => {
            if (!d) return i.item(o, null == l ? void 0 : l.id);
          }, [d]);
          let p = eC(o, a, [e.value, e.children, a], e.keywords),
            m = ec(),
            v = ex((e) => e.value && e.value === p.current),
            h = ex(
              (e) =>
                !!d ||
                !1 === i.filter() ||
                !e.search ||
                e.filtered.items.get(o) > 0,
            );
          function g() {
            var e, t;
            b(), null == (t = (e = c.current).onSelect) || t.call(e, p.current);
          }
          function b() {
            m.setState("value", p.current, !0);
          }
          if (
            (u.useEffect(() => {
              let t = a.current;
              if (!(!t || e.disabled))
                return (
                  t.addEventListener(en, g), () => t.removeEventListener(en, g)
                );
            }, [h, e.onSelect, e.disabled]),
            !h)
          )
            return null;
          let {
            disabled: w,
            value: E,
            onSelect: x,
            forceMount: C,
            keywords: S,
            ...R
          } = e;
          return u.createElement(
            y.sG.div,
            {
              ref: (0, s.t)(a, t),
              ...R,
              id: o,
              "cmdk-item": "",
              role: "option",
              "aria-disabled": !!w,
              "aria-selected": !!v,
              "data-disabled": !!w,
              "data-selected": !!v,
              onPointerMove: w || i.getDisablePointerSelection() ? void 0 : b,
              onClick: w ? void 0 : g,
            },
            e.children,
          );
        }),
        ep = u.forwardRef((e, t) => {
          let { heading: r, children: n, forceMount: o, ...a } = e,
            l = (0, f.B)(),
            i = u.useRef(null),
            c = u.useRef(null),
            d = (0, f.B)(),
            p = ei(),
            m = ex(
              (e) =>
                !!o ||
                !1 === p.filter() ||
                !e.search ||
                e.filtered.groups.has(l),
            );
          ew(() => p.group(l), []), eC(l, i, [e.value, e.heading, c]);
          let v = u.useMemo(() => ({ id: l, forceMount: o }), [o]);
          return u.createElement(
            y.sG.div,
            {
              ref: (0, s.t)(i, t),
              ...a,
              "cmdk-group": "",
              role: "presentation",
              hidden: !m || void 0,
            },
            r &&
              u.createElement(
                "div",
                { ref: c, "cmdk-group-heading": "", "aria-hidden": !0, id: d },
                r,
              ),
            eR(e, (e) =>
              u.createElement(
                "div",
                {
                  "cmdk-group-items": "",
                  role: "group",
                  "aria-labelledby": r ? d : void 0,
                },
                u.createElement(es.Provider, { value: v }, e),
              ),
            ),
          );
        }),
        em = u.forwardRef((e, t) => {
          let { alwaysRender: r, ...n } = e,
            o = u.useRef(null),
            a = ex((e) => !e.search);
          return r || a
            ? u.createElement(y.sG.div, {
                ref: (0, s.t)(o, t),
                ...n,
                "cmdk-separator": "",
                role: "separator",
              })
            : null;
        }),
        ev = u.forwardRef((e, t) => {
          let { onValueChange: r, ...n } = e,
            o = null != e.value,
            a = ec(),
            l = ex((e) => e.search),
            i = ex((e) => e.selectedItemId),
            c = ei();
          return (
            u.useEffect(() => {
              null != e.value && a.setState("search", e.value);
            }, [e.value]),
            u.createElement(y.sG.input, {
              ref: t,
              ...n,
              "cmdk-input": "",
              autoComplete: "off",
              autoCorrect: "off",
              spellCheck: !1,
              "aria-autocomplete": "list",
              role: "combobox",
              "aria-expanded": !0,
              "aria-controls": c.listId,
              "aria-labelledby": c.labelId,
              "aria-activedescendant": i,
              id: c.inputId,
              type: "text",
              value: o ? e.value : l,
              onChange: (e) => {
                o || a.setState("search", e.target.value),
                  null == r || r(e.target.value);
              },
            })
          );
        }),
        eh = u.forwardRef((e, t) => {
          let { children: r, label: n = "Suggestions", ...o } = e,
            a = u.useRef(null),
            l = u.useRef(null),
            i = ex((e) => e.selectedItemId),
            c = ei();
          return (
            u.useEffect(() => {
              if (l.current && a.current) {
                let e = l.current,
                  t = a.current,
                  r,
                  n = new ResizeObserver(() => {
                    r = requestAnimationFrame(() => {
                      let r = e.offsetHeight;
                      t.style.setProperty(
                        "--cmdk-list-height",
                        r.toFixed(1) + "px",
                      );
                    });
                  });
                return (
                  n.observe(e),
                  () => {
                    cancelAnimationFrame(r), n.unobserve(e);
                  }
                );
              }
            }, []),
            u.createElement(
              y.sG.div,
              {
                ref: (0, s.t)(a, t),
                ...o,
                "cmdk-list": "",
                role: "listbox",
                tabIndex: -1,
                "aria-activedescendant": i,
                "aria-label": n,
                id: c.listId,
              },
              eR(e, (e) =>
                u.createElement(
                  "div",
                  { ref: (0, s.t)(l, c.listInnerRef), "cmdk-list-sizer": "" },
                  e,
                ),
              ),
            )
          );
        }),
        eg = u.forwardRef((e, t) => {
          let {
            open: r,
            onOpenChange: n,
            overlayClassName: o,
            contentClassName: a,
            container: l,
            ...i
          } = e;
          return u.createElement(
            P,
            { open: r, onOpenChange: n },
            u.createElement(
              O,
              { container: l },
              u.createElement($, { "cmdk-overlay": "", className: o }),
              u.createElement(
                B,
                { "aria-label": e.label, "cmdk-dialog": "", className: a },
                u.createElement(ed, { ref: t, ...i }),
              ),
            ),
          );
        }),
        ey = Object.assign(ed, {
          List: eh,
          Item: ef,
          Input: ev,
          Group: ep,
          Separator: em,
          Dialog: eg,
          Empty: u.forwardRef((e, t) =>
            ex((e) => 0 === e.filtered.count)
              ? u.createElement(y.sG.div, {
                  ref: t,
                  ...e,
                  "cmdk-empty": "",
                  role: "presentation",
                })
              : null,
          ),
          Loading: u.forwardRef((e, t) => {
            let { progress: r, children: n, label: o = "Loading...", ...a } = e;
            return u.createElement(
              y.sG.div,
              {
                ref: t,
                ...a,
                "cmdk-loading": "",
                role: "progressbar",
                "aria-valuenow": r,
                "aria-valuemin": 0,
                "aria-valuemax": 100,
                "aria-label": o,
              },
              eR(e, (e) => u.createElement("div", { "aria-hidden": !0 }, e)),
            );
          }),
        });
      function eb(e) {
        let t = u.useRef(e);
        return (
          ew(() => {
            t.current = e;
          }),
          t
        );
      }
      var ew = u.useEffect;
      function eE(e) {
        let t = u.useRef();
        return void 0 === t.current && (t.current = e()), t;
      }
      function ex(e) {
        let t = ec(),
          r = () => e(t.snapshot());
        return u.useSyncExternalStore(t.subscribe, r, r);
      }
      function eC(e, t, r, n = []) {
        let o = u.useRef(),
          a = ei();
        return (
          ew(() => {
            var l;
            let i = (() => {
                var e;
                for (let t of r) {
                  if ("string" == typeof t) return t.trim();
                  if ("object" == typeof t && "current" in t)
                    return t.current
                      ? null == (e = t.current.textContent)
                        ? void 0
                        : e.trim()
                      : o.current;
                }
              })(),
              u = n.map((e) => e.trim());
            a.value(e, i, u),
              null == (l = t.current) || l.setAttribute(eo, i),
              (o.current = i);
          }),
          o
        );
      }
      var eS = () => {
        let [e, t] = u.useState(),
          r = eE(() => new Map());
        return (
          ew(() => {
            r.current.forEach((e) => e()), (r.current = new Map());
          }, [e]),
          (e, n) => {
            r.current.set(e, n), t({});
          }
        );
      };
      function eR({ asChild: e, children: t }, r) {
        let n;
        return e && u.isValidElement(t)
          ? u.cloneElement(
              "function" == typeof (n = t.type)
                ? n(t.props)
                : "render" in n
                  ? n.render(t.props)
                  : t,
              { ref: t.ref },
              r(t.props.children),
            )
          : r(t);
      }
      var ek = {
        position: "absolute",
        width: "1px",
        height: "1px",
        padding: "0",
        margin: "-1px",
        overflow: "hidden",
        clip: "rect(0, 0, 0, 0)",
        whiteSpace: "nowrap",
        borderWidth: "0",
      };
    },
    23174: (e, t, r) => {
      r.d(t, {
        BN: () => m,
        ER: () => v,
        Ej: () => g,
        UE: () => b,
        UU: () => h,
        cY: () => p,
        jD: () => y,
        we: () => d,
      });
      var n = r(61966),
        o = r(84205),
        a = r(90304),
        l = "undefined" != typeof document ? o.useLayoutEffect : function () {};
      function i(e, t) {
        let r, n, o;
        if (e === t) return !0;
        if (typeof e != typeof t) return !1;
        if ("function" == typeof e && e.toString() === t.toString()) return !0;
        if (e && t && "object" == typeof e) {
          if (Array.isArray(e)) {
            if ((r = e.length) !== t.length) return !1;
            for (n = r; 0 != n--; ) if (!i(e[n], t[n])) return !1;
            return !0;
          }
          if ((r = (o = Object.keys(e)).length) !== Object.keys(t).length)
            return !1;
          for (n = r; 0 != n--; )
            if (!{}.hasOwnProperty.call(t, o[n])) return !1;
          for (n = r; 0 != n--; ) {
            let r = o[n];
            if (("_owner" !== r || !e.$$typeof) && !i(e[r], t[r])) return !1;
          }
          return !0;
        }
        return e != e && t != t;
      }
      function u(e) {
        return "undefined" == typeof window
          ? 1
          : (e.ownerDocument.defaultView || window).devicePixelRatio || 1;
      }
      function c(e, t) {
        let r = u(e);
        return Math.round(t * r) / r;
      }
      function s(e) {
        let t = o.useRef(e);
        return (
          l(() => {
            t.current = e;
          }),
          t
        );
      }
      function d(e) {
        void 0 === e && (e = {});
        let {
            placement: t = "bottom",
            strategy: r = "absolute",
            middleware: d = [],
            platform: f,
            elements: { reference: p, floating: m } = {},
            transform: v = !0,
            whileElementsMounted: h,
            open: g,
          } = e,
          [y, b] = o.useState({
            x: 0,
            y: 0,
            strategy: r,
            placement: t,
            middlewareData: {},
            isPositioned: !1,
          }),
          [w, E] = o.useState(d);
        i(w, d) || E(d);
        let [x, C] = o.useState(null),
          [S, R] = o.useState(null),
          k = o.useCallback((e) => {
            e !== j.current && ((j.current = e), C(e));
          }, []),
          A = o.useCallback((e) => {
            e !== D.current && ((D.current = e), R(e));
          }, []),
          I = p || x,
          P = m || S,
          j = o.useRef(null),
          D = o.useRef(null),
          N = o.useRef(y),
          M = null != h,
          O = s(h),
          T = s(f),
          $ = s(g),
          F = o.useCallback(() => {
            if (!j.current || !D.current) return;
            let e = { placement: t, strategy: r, middleware: w };
            T.current && (e.platform = T.current),
              (0, n.rD)(j.current, D.current, e).then((e) => {
                let t = { ...e, isPositioned: !1 !== $.current };
                L.current &&
                  !i(N.current, t) &&
                  ((N.current = t),
                  a.flushSync(() => {
                    b(t);
                  }));
              });
          }, [w, t, r, T, $]);
        l(() => {
          !1 === g &&
            N.current.isPositioned &&
            ((N.current.isPositioned = !1),
            b((e) => ({ ...e, isPositioned: !1 })));
        }, [g]);
        let L = o.useRef(!1);
        l(
          () => (
            (L.current = !0),
            () => {
              L.current = !1;
            }
          ),
          [],
        ),
          l(() => {
            if ((I && (j.current = I), P && (D.current = P), I && P)) {
              if (O.current) return O.current(I, P, F);
              F();
            }
          }, [I, P, F, O, M]);
        let _ = o.useMemo(
            () => ({
              reference: j,
              floating: D,
              setReference: k,
              setFloating: A,
            }),
            [k, A],
          ),
          B = o.useMemo(() => ({ reference: I, floating: P }), [I, P]),
          K = o.useMemo(() => {
            let e = { position: r, left: 0, top: 0 };
            if (!B.floating) return e;
            let t = c(B.floating, y.x),
              n = c(B.floating, y.y);
            return v
              ? {
                  ...e,
                  transform: "translate(" + t + "px, " + n + "px)",
                  ...(u(B.floating) >= 1.5 && { willChange: "transform" }),
                }
              : { position: r, left: t, top: n };
          }, [r, v, B.floating, y.x, y.y]);
        return o.useMemo(
          () => ({ ...y, update: F, refs: _, elements: B, floatingStyles: K }),
          [y, F, _, B, K],
        );
      }
      let f = (e) => ({
          name: "arrow",
          options: e,
          fn(t) {
            let { element: r, padding: o } = "function" == typeof e ? e(t) : e;
            return r && {}.hasOwnProperty.call(r, "current")
              ? null != r.current
                ? (0, n.UE)({ element: r.current, padding: o }).fn(t)
                : {}
              : r
                ? (0, n.UE)({ element: r, padding: o }).fn(t)
                : {};
          },
        }),
        p = (e, t) => ({ ...(0, n.cY)(e), options: [e, t] }),
        m = (e, t) => ({ ...(0, n.BN)(e), options: [e, t] }),
        v = (e, t) => ({ ...(0, n.ER)(e), options: [e, t] }),
        h = (e, t) => ({ ...(0, n.UU)(e), options: [e, t] }),
        g = (e, t) => ({ ...(0, n.Ej)(e), options: [e, t] }),
        y = (e, t) => ({ ...(0, n.jD)(e), options: [e, t] }),
        b = (e, t) => ({ ...f(e), options: [e, t] });
    },
    26481: (e, t, r) => {
      r.d(t, { Oh: () => a });
      var n = r(84205),
        o = 0;
      function a() {
        n.useEffect(() => {
          let e = document.querySelectorAll("[data-radix-focus-guard]");
          return (
            document.body.insertAdjacentElement("afterbegin", e[0] ?? l()),
            document.body.insertAdjacentElement("beforeend", e[1] ?? l()),
            o++,
            () => {
              1 === o &&
                document
                  .querySelectorAll("[data-radix-focus-guard]")
                  .forEach((e) => e.remove()),
                o--;
            }
          );
        }, []);
      }
      function l() {
        let e = document.createElement("span");
        return (
          e.setAttribute("data-radix-focus-guard", ""),
          (e.tabIndex = 0),
          (e.style.outline = "none"),
          (e.style.opacity = "0"),
          (e.style.position = "fixed"),
          (e.style.pointerEvents = "none"),
          e
        );
      }
    },
    82824: (e, t, r) => {
      r.d(t, { A: () => q });
      var n,
        o = r(13597),
        a = r(84205),
        l = "right-scroll-bar-position",
        i = "width-before-scroll-bar";
      function u(e, t) {
        return "function" == typeof e ? e(t) : e && (e.current = t), e;
      }
      var c = "undefined" != typeof window ? a.useLayoutEffect : a.useEffect,
        s = new WeakMap();
      function d(e) {
        return e;
      }
      var f = (function (e) {
          void 0 === e && (e = {});
          var t,
            r,
            n,
            a,
            l =
              ((t = null),
              void 0 === r && (r = d),
              (n = []),
              (a = !1),
              {
                read: function () {
                  if (a)
                    throw Error(
                      "Sidecar: could not `read` from an `assigned` medium. `read` could be used only with `useMedium`.",
                    );
                  return n.length ? n[n.length - 1] : null;
                },
                useMedium: function (e) {
                  var t = r(e, a);
                  return (
                    n.push(t),
                    function () {
                      n = n.filter(function (e) {
                        return e !== t;
                      });
                    }
                  );
                },
                assignSyncMedium: function (e) {
                  for (a = !0; n.length; ) {
                    var t = n;
                    (n = []), t.forEach(e);
                  }
                  n = {
                    push: function (t) {
                      return e(t);
                    },
                    filter: function () {
                      return n;
                    },
                  };
                },
                assignMedium: function (e) {
                  a = !0;
                  var t = [];
                  if (n.length) {
                    var r = n;
                    (n = []), r.forEach(e), (t = n);
                  }
                  var o = function () {
                      var r = t;
                      (t = []), r.forEach(e);
                    },
                    l = function () {
                      return Promise.resolve().then(o);
                    };
                  l(),
                    (n = {
                      push: function (e) {
                        t.push(e), l();
                      },
                      filter: function (e) {
                        return (t = t.filter(e)), n;
                      },
                    });
                },
              });
          return (l.options = (0, o.Cl)({ async: !0, ssr: !1 }, e)), l;
        })(),
        p = function () {},
        m = a.forwardRef(function (e, t) {
          var r,
            n,
            l,
            i,
            d = a.useRef(null),
            m = a.useState({
              onScrollCapture: p,
              onWheelCapture: p,
              onTouchMoveCapture: p,
            }),
            v = m[0],
            h = m[1],
            g = e.forwardProps,
            y = e.children,
            b = e.className,
            w = e.removeScrollBar,
            E = e.enabled,
            x = e.shards,
            C = e.sideCar,
            S = e.noRelative,
            R = e.noIsolation,
            k = e.inert,
            A = e.allowPinchZoom,
            I = e.as,
            P = e.gapMode,
            j = (0, o.Tt)(e, [
              "forwardProps",
              "children",
              "className",
              "removeScrollBar",
              "enabled",
              "shards",
              "sideCar",
              "noRelative",
              "noIsolation",
              "inert",
              "allowPinchZoom",
              "as",
              "gapMode",
            ]),
            D =
              ((r = [d, t]),
              (n = function (e) {
                return r.forEach(function (t) {
                  return u(t, e);
                });
              }),
              ((l = (0, a.useState)(function () {
                return {
                  value: null,
                  callback: n,
                  facade: {
                    get current() {
                      return l.value;
                    },
                    set current(value) {
                      var e = l.value;
                      e !== value && ((l.value = value), l.callback(value, e));
                    },
                  },
                };
              })[0]).callback = n),
              (i = l.facade),
              c(
                function () {
                  var e = s.get(i);
                  if (e) {
                    var t = new Set(e),
                      n = new Set(r),
                      o = i.current;
                    t.forEach(function (e) {
                      n.has(e) || u(e, null);
                    }),
                      n.forEach(function (e) {
                        t.has(e) || u(e, o);
                      });
                  }
                  s.set(i, r);
                },
                [r],
              ),
              i),
            N = (0, o.Cl)((0, o.Cl)({}, j), v);
          return a.createElement(
            a.Fragment,
            null,
            E &&
              a.createElement(C, {
                sideCar: f,
                removeScrollBar: w,
                shards: x,
                noRelative: S,
                noIsolation: R,
                inert: k,
                setCallbacks: h,
                allowPinchZoom: !!A,
                lockRef: d,
                gapMode: P,
              }),
            g
              ? a.cloneElement(
                  a.Children.only(y),
                  (0, o.Cl)((0, o.Cl)({}, N), { ref: D }),
                )
              : a.createElement(
                  void 0 === I ? "div" : I,
                  (0, o.Cl)({}, N, { className: b, ref: D }),
                  y,
                ),
          );
        });
      (m.defaultProps = { enabled: !0, removeScrollBar: !0, inert: !1 }),
        (m.classNames = { fullWidth: i, zeroRight: l });
      var v = function (e) {
        var t = e.sideCar,
          r = (0, o.Tt)(e, ["sideCar"]);
        if (!t)
          throw Error(
            "Sidecar: please provide `sideCar` property to import the right car",
          );
        var n = t.read();
        if (!n) throw Error("Sidecar medium not found");
        return a.createElement(n, (0, o.Cl)({}, r));
      };
      v.isSideCarExport = !0;
      var h = r(47925),
        g = function () {
          var e = 0,
            t = null;
          return {
            add: function (r) {
              if (
                0 == e &&
                (t = (function () {
                  if (!document) return null;
                  var e = document.createElement("style");
                  e.type = "text/css";
                  var t = (0, h.m)();
                  return t && e.setAttribute("nonce", t), e;
                })())
              ) {
                var n, o;
                (n = t).styleSheet
                  ? (n.styleSheet.cssText = r)
                  : n.appendChild(document.createTextNode(r)),
                  (o = t),
                  (
                    document.head || document.getElementsByTagName("head")[0]
                  ).appendChild(o);
              }
              e++;
            },
            remove: function () {
              --e ||
                !t ||
                (t.parentNode && t.parentNode.removeChild(t), (t = null));
            },
          };
        },
        y = function () {
          var e = g();
          return function (t, r) {
            a.useEffect(
              function () {
                return (
                  e.add(t),
                  function () {
                    e.remove();
                  }
                );
              },
              [t && r],
            );
          };
        },
        b = function () {
          var e = y();
          return function (t) {
            return e(t.styles, t.dynamic), null;
          };
        },
        w = { left: 0, top: 0, right: 0, gap: 0 },
        E = function (e) {
          return parseInt(e || "", 10) || 0;
        },
        x = function (e) {
          var t = window.getComputedStyle(document.body),
            r = t["padding" === e ? "paddingLeft" : "marginLeft"],
            n = t["padding" === e ? "paddingTop" : "marginTop"],
            o = t["padding" === e ? "paddingRight" : "marginRight"];
          return [E(r), E(n), E(o)];
        },
        C = function (e) {
          if ((void 0 === e && (e = "margin"), "undefined" == typeof window))
            return w;
          var t = x(e),
            r = document.documentElement.clientWidth,
            n = window.innerWidth;
          return {
            left: t[0],
            top: t[1],
            right: t[2],
            gap: Math.max(0, n - r + t[2] - t[0]),
          };
        },
        S = b(),
        R = "data-scroll-locked",
        k = function (e, t, r, n) {
          var o = e.left,
            a = e.top,
            u = e.right,
            c = e.gap;
          return (
            void 0 === r && (r = "margin"),
            "\n  ."
              .concat("with-scroll-bars-hidden", " {\n   overflow: hidden ")
              .concat(n, ";\n   padding-right: ")
              .concat(c, "px ")
              .concat(n, ";\n  }\n  body[")
              .concat(R, "] {\n    overflow: hidden ")
              .concat(n, ";\n    overscroll-behavior: contain;\n    ")
              .concat(
                [
                  t && "position: relative ".concat(n, ";"),
                  "margin" === r &&
                    "\n    padding-left: "
                      .concat(o, "px;\n    padding-top: ")
                      .concat(a, "px;\n    padding-right: ")
                      .concat(
                        u,
                        "px;\n    margin-left:0;\n    margin-top:0;\n    margin-right: ",
                      )
                      .concat(c, "px ")
                      .concat(n, ";\n    "),
                  "padding" === r &&
                    "padding-right: ".concat(c, "px ").concat(n, ";"),
                ]
                  .filter(Boolean)
                  .join(""),
                "\n  }\n  \n  .",
              )
              .concat(l, " {\n    right: ")
              .concat(c, "px ")
              .concat(n, ";\n  }\n  \n  .")
              .concat(i, " {\n    margin-right: ")
              .concat(c, "px ")
              .concat(n, ";\n  }\n  \n  .")
              .concat(l, " .")
              .concat(l, " {\n    right: 0 ")
              .concat(n, ";\n  }\n  \n  .")
              .concat(i, " .")
              .concat(i, " {\n    margin-right: 0 ")
              .concat(n, ";\n  }\n  \n  body[")
              .concat(R, "] {\n    ")
              .concat("--removed-body-scroll-bar-size", ": ")
              .concat(c, "px;\n  }\n")
          );
        },
        A = function () {
          var e = parseInt(document.body.getAttribute(R) || "0", 10);
          return isFinite(e) ? e : 0;
        },
        I = function () {
          a.useEffect(function () {
            return (
              document.body.setAttribute(R, (A() + 1).toString()),
              function () {
                var e = A() - 1;
                e <= 0
                  ? document.body.removeAttribute(R)
                  : document.body.setAttribute(R, e.toString());
              }
            );
          }, []);
        },
        P = function (e) {
          var t = e.noRelative,
            r = e.noImportant,
            n = e.gapMode,
            o = void 0 === n ? "margin" : n;
          I();
          var l = a.useMemo(
            function () {
              return C(o);
            },
            [o],
          );
          return a.createElement(S, {
            styles: k(l, !t, o, r ? "" : "!important"),
          });
        },
        j = !1;
      if ("undefined" != typeof window)
        try {
          var D = Object.defineProperty({}, "passive", {
            get: function () {
              return (j = !0), !0;
            },
          });
          window.addEventListener("test", D, D),
            window.removeEventListener("test", D, D);
        } catch (e) {
          j = !1;
        }
      var N = !!j && { passive: !1 },
        M = function (e, t) {
          if (!(e instanceof Element)) return !1;
          var r = window.getComputedStyle(e);
          return (
            "hidden" !== r[t] &&
            (r.overflowY !== r.overflowX ||
              "TEXTAREA" === e.tagName ||
              "visible" !== r[t])
          );
        },
        O = function (e, t) {
          var r = t.ownerDocument,
            n = t;
          do {
            if (
              ("undefined" != typeof ShadowRoot &&
                n instanceof ShadowRoot &&
                (n = n.host),
              T(e, n))
            ) {
              var o = $(e, n);
              if (o[1] > o[2]) return !0;
            }
            n = n.parentNode;
          } while (n && n !== r.body);
          return !1;
        },
        T = function (e, t) {
          return "v" === e ? M(t, "overflowY") : M(t, "overflowX");
        },
        $ = function (e, t) {
          return "v" === e
            ? [t.scrollTop, t.scrollHeight, t.clientHeight]
            : [t.scrollLeft, t.scrollWidth, t.clientWidth];
        },
        F = function (e, t, r, n, o) {
          var a,
            l =
              ((a = window.getComputedStyle(t).direction),
              "h" === e && "rtl" === a ? -1 : 1),
            i = l * n,
            u = r.target,
            c = t.contains(u),
            s = !1,
            d = i > 0,
            f = 0,
            p = 0;
          do {
            if (!u) break;
            var m = $(e, u),
              v = m[0],
              h = m[1] - m[2] - l * v;
            (v || h) && T(e, u) && ((f += h), (p += v));
            var g = u.parentNode;
            u = g && g.nodeType === Node.DOCUMENT_FRAGMENT_NODE ? g.host : g;
          } while (
            (!c && u !== document.body) ||
            (c && (t.contains(u) || t === u))
          );
          return (
            d && ((o && 1 > Math.abs(f)) || (!o && i > f))
              ? (s = !0)
              : !d && ((o && 1 > Math.abs(p)) || (!o && -i > p)) && (s = !0),
            s
          );
        },
        L = function (e) {
          return "changedTouches" in e
            ? [e.changedTouches[0].clientX, e.changedTouches[0].clientY]
            : [0, 0];
        },
        _ = function (e) {
          return [e.deltaX, e.deltaY];
        },
        B = function (e) {
          return e && "current" in e ? e.current : e;
        },
        K = 0,
        G = [];
      let U =
        ((n = function (e) {
          var t = a.useRef([]),
            r = a.useRef([0, 0]),
            n = a.useRef(),
            l = a.useState(K++)[0],
            i = a.useState(b)[0],
            u = a.useRef(e);
          a.useEffect(
            function () {
              u.current = e;
            },
            [e],
          ),
            a.useEffect(
              function () {
                if (e.inert) {
                  document.body.classList.add("block-interactivity-".concat(l));
                  var t = (0, o.fX)(
                    [e.lockRef.current],
                    (e.shards || []).map(B),
                    !0,
                  ).filter(Boolean);
                  return (
                    t.forEach(function (e) {
                      return e.classList.add("allow-interactivity-".concat(l));
                    }),
                    function () {
                      document.body.classList.remove(
                        "block-interactivity-".concat(l),
                      ),
                        t.forEach(function (e) {
                          return e.classList.remove(
                            "allow-interactivity-".concat(l),
                          );
                        });
                    }
                  );
                }
              },
              [e.inert, e.lockRef.current, e.shards],
            );
          var c = a.useCallback(function (e, t) {
              if (
                ("touches" in e && 2 === e.touches.length) ||
                ("wheel" === e.type && e.ctrlKey)
              )
                return !u.current.allowPinchZoom;
              var o,
                a = L(e),
                l = r.current,
                i = "deltaX" in e ? e.deltaX : l[0] - a[0],
                c = "deltaY" in e ? e.deltaY : l[1] - a[1],
                s = e.target,
                d = Math.abs(i) > Math.abs(c) ? "h" : "v";
              if ("touches" in e && "h" === d && "range" === s.type) return !1;
              var f = O(d, s);
              if (!f) return !0;
              if (
                (f ? (o = d) : ((o = "v" === d ? "h" : "v"), (f = O(d, s))), !f)
              )
                return !1;
              if (
                (!n.current &&
                  "changedTouches" in e &&
                  (i || c) &&
                  (n.current = o),
                !o)
              )
                return !0;
              var p = n.current || o;
              return F(p, t, e, "h" === p ? i : c, !0);
            }, []),
            s = a.useCallback(function (e) {
              if (G.length && G[G.length - 1] === i) {
                var r = "deltaY" in e ? _(e) : L(e),
                  n = t.current.filter(function (t) {
                    var n;
                    return (
                      t.name === e.type &&
                      (t.target === e.target || e.target === t.shadowParent) &&
                      ((n = t.delta), n[0] === r[0] && n[1] === r[1])
                    );
                  })[0];
                if (n && n.should) {
                  e.cancelable && e.preventDefault();
                  return;
                }
                if (!n) {
                  var o = (u.current.shards || [])
                    .map(B)
                    .filter(Boolean)
                    .filter(function (t) {
                      return t.contains(e.target);
                    });
                  (o.length > 0 ? c(e, o[0]) : !u.current.noIsolation) &&
                    e.cancelable &&
                    e.preventDefault();
                }
              }
            }, []),
            d = a.useCallback(function (e, r, n, o) {
              var a = {
                name: e,
                delta: r,
                target: n,
                should: o,
                shadowParent: (function (e) {
                  for (var t = null; null !== e; )
                    e instanceof ShadowRoot && ((t = e.host), (e = e.host)),
                      (e = e.parentNode);
                  return t;
                })(n),
              };
              t.current.push(a),
                setTimeout(function () {
                  t.current = t.current.filter(function (e) {
                    return e !== a;
                  });
                }, 1);
            }, []),
            f = a.useCallback(function (e) {
              (r.current = L(e)), (n.current = void 0);
            }, []),
            p = a.useCallback(function (t) {
              d(t.type, _(t), t.target, c(t, e.lockRef.current));
            }, []),
            m = a.useCallback(function (t) {
              d(t.type, L(t), t.target, c(t, e.lockRef.current));
            }, []);
          a.useEffect(function () {
            return (
              G.push(i),
              e.setCallbacks({
                onScrollCapture: p,
                onWheelCapture: p,
                onTouchMoveCapture: m,
              }),
              document.addEventListener("wheel", s, N),
              document.addEventListener("touchmove", s, N),
              document.addEventListener("touchstart", f, N),
              function () {
                (G = G.filter(function (e) {
                  return e !== i;
                })),
                  document.removeEventListener("wheel", s, N),
                  document.removeEventListener("touchmove", s, N),
                  document.removeEventListener("touchstart", f, N);
              }
            );
          }, []);
          var v = e.removeScrollBar,
            h = e.inert;
          return a.createElement(
            a.Fragment,
            null,
            h
              ? a.createElement(i, {
                  styles: "\n  .block-interactivity-"
                    .concat(
                      l,
                      " {pointer-events: none;}\n  .allow-interactivity-",
                    )
                    .concat(l, " {pointer-events: all;}\n"),
                })
              : null,
            v
              ? a.createElement(P, {
                  noRelative: e.noRelative,
                  gapMode: e.gapMode,
                })
              : null,
          );
        }),
        f.useMedium(n),
        v);
      var W = a.forwardRef(function (e, t) {
        return a.createElement(m, (0, o.Cl)({}, e, { ref: t, sideCar: U }));
      });
      W.classNames = m.classNames;
      let q = W;
    },
    94449: (e, t, r) => {
      r.d(t, { n: () => d });
      var n = r(84205),
        o = r(71604),
        a = r(78593),
        l = r(10308),
        i = r(61268),
        u = "focusScope.autoFocusOnMount",
        c = "focusScope.autoFocusOnUnmount",
        s = { bubbles: !1, cancelable: !0 },
        d = n.forwardRef((e, t) => {
          let {
              loop: r = !1,
              trapped: d = !1,
              onMountAutoFocus: h,
              onUnmountAutoFocus: g,
              ...y
            } = e,
            [b, w] = n.useState(null),
            E = (0, l.c)(h),
            x = (0, l.c)(g),
            C = n.useRef(null),
            S = (0, o.s)(t, (e) => w(e)),
            R = n.useRef({
              paused: !1,
              pause() {
                this.paused = !0;
              },
              resume() {
                this.paused = !1;
              },
            }).current;
          n.useEffect(() => {
            if (d) {
              let e = function (e) {
                  if (R.paused || !b) return;
                  let t = e.target;
                  b.contains(t)
                    ? (C.current = t)
                    : m(C.current, { select: !0 });
                },
                t = function (e) {
                  if (R.paused || !b) return;
                  let t = e.relatedTarget;
                  null !== t && (b.contains(t) || m(C.current, { select: !0 }));
                };
              document.addEventListener("focusin", e),
                document.addEventListener("focusout", t);
              let r = new MutationObserver(function (e) {
                if (document.activeElement === document.body)
                  for (let t of e) t.removedNodes.length > 0 && m(b);
              });
              return (
                b && r.observe(b, { childList: !0, subtree: !0 }),
                () => {
                  document.removeEventListener("focusin", e),
                    document.removeEventListener("focusout", t),
                    r.disconnect();
                }
              );
            }
          }, [d, b, R.paused]),
            n.useEffect(() => {
              if (b) {
                v.add(R);
                let e = document.activeElement;
                if (!b.contains(e)) {
                  let t = new CustomEvent(u, s);
                  b.addEventListener(u, E),
                    b.dispatchEvent(t),
                    t.defaultPrevented ||
                      ((function (e, { select: t = !1 } = {}) {
                        let r = document.activeElement;
                        for (let n of e)
                          if (
                            (m(n, { select: t }), document.activeElement !== r)
                          )
                            return;
                      })(
                        f(b).filter((e) => "A" !== e.tagName),
                        { select: !0 },
                      ),
                      document.activeElement === e && m(b));
                }
                return () => {
                  b.removeEventListener(u, E),
                    setTimeout(() => {
                      let t = new CustomEvent(c, s);
                      b.addEventListener(c, x),
                        b.dispatchEvent(t),
                        t.defaultPrevented ||
                          m(e ?? document.body, { select: !0 }),
                        b.removeEventListener(c, x),
                        v.remove(R);
                    }, 0);
                };
              }
            }, [b, E, x, R]);
          let k = n.useCallback(
            (e) => {
              if ((!r && !d) || R.paused) return;
              let t = "Tab" === e.key && !e.altKey && !e.ctrlKey && !e.metaKey,
                n = document.activeElement;
              if (t && n) {
                let t = e.currentTarget,
                  [o, a] = (function (e) {
                    let t = f(e);
                    return [p(t, e), p(t.reverse(), e)];
                  })(t);
                o && a
                  ? e.shiftKey || n !== a
                    ? e.shiftKey &&
                      n === o &&
                      (e.preventDefault(), r && m(a, { select: !0 }))
                    : (e.preventDefault(), r && m(o, { select: !0 }))
                  : n === t && e.preventDefault();
              }
            },
            [r, d, R.paused],
          );
          return (0, i.jsx)(a.sG.div, {
            tabIndex: -1,
            ...y,
            ref: S,
            onKeyDown: k,
          });
        });
      function f(e) {
        let t = [],
          r = document.createTreeWalker(e, NodeFilter.SHOW_ELEMENT, {
            acceptNode: (e) => {
              let t = "INPUT" === e.tagName && "hidden" === e.type;
              return e.disabled || e.hidden || t
                ? NodeFilter.FILTER_SKIP
                : e.tabIndex >= 0
                  ? NodeFilter.FILTER_ACCEPT
                  : NodeFilter.FILTER_SKIP;
            },
          });
        for (; r.nextNode(); ) t.push(r.currentNode);
        return t;
      }
      function p(e, t) {
        for (let r of e)
          if (
            !(function (e, { upTo: t }) {
              if ("hidden" === getComputedStyle(e).visibility) return !0;
              for (; e && (void 0 === t || e !== t); ) {
                if ("none" === getComputedStyle(e).display) return !0;
                e = e.parentElement;
              }
              return !1;
            })(r, { upTo: t })
          )
            return r;
      }
      function m(e, { select: t = !1 } = {}) {
        if (e && e.focus) {
          var r;
          let n = document.activeElement;
          e.focus({ preventScroll: !0 }),
            e !== n &&
              (r = e) instanceof HTMLInputElement &&
              "select" in r &&
              t &&
              e.select();
        }
      }
      d.displayName = "FocusScope";
      var v = (function () {
        let e = [];
        return {
          add(t) {
            let r = e[0];
            t !== r && r?.pause(), (e = h(e, t)).unshift(t);
          },
          remove(t) {
            (e = h(e, t)), e[0]?.resume();
          },
        };
      })();
      function h(e, t) {
        let r = [...e],
          n = r.indexOf(t);
        return -1 !== n && r.splice(n, 1), r;
      }
    },
    96106: (e, t, r) => {
      r.d(t, { D: () => u, N: () => c });
      var n = r(84205),
        o = ["light", "dark"],
        a = "(prefers-color-scheme: dark)",
        l = n.createContext(void 0),
        i = { setTheme: (e) => {}, themes: [] },
        u = () => {
          var e;
          return null != (e = n.useContext(l)) ? e : i;
        },
        c = (e) =>
          n.useContext(l) ? e.children : n.createElement(d, { ...e }),
        s = ["light", "dark"],
        d = ({
          forcedTheme: e,
          disableTransitionOnChange: t = !1,
          enableSystem: r = !0,
          enableColorScheme: i = !0,
          storageKey: u = "theme",
          themes: c = s,
          defaultTheme: d = r ? "system" : "light",
          attribute: h = "data-theme",
          value: g,
          children: y,
          nonce: b,
        }) => {
          let [w, E] = n.useState(() => p(u, d)),
            [x, C] = n.useState(() => p(u)),
            S = g ? Object.values(g) : c,
            R = n.useCallback((e) => {
              let n = e;
              if (!n) return;
              "system" === e && r && (n = v());
              let a = g ? g[n] : n,
                l = t ? m() : null,
                u = document.documentElement;
              if (
                ("class" === h
                  ? (u.classList.remove(...S), a && u.classList.add(a))
                  : a
                    ? u.setAttribute(h, a)
                    : u.removeAttribute(h),
                i)
              ) {
                let e = o.includes(d) ? d : null,
                  t = o.includes(n) ? n : e;
                u.style.colorScheme = t;
              }
              null == l || l();
            }, []),
            k = n.useCallback(
              (e) => {
                let t = "function" == typeof e ? e(e) : e;
                E(t);
                try {
                  localStorage.setItem(u, t);
                } catch (e) {}
              },
              [e],
            ),
            A = n.useCallback(
              (t) => {
                C(v(t)), "system" === w && r && !e && R("system");
              },
              [w, e],
            );
          n.useEffect(() => {
            let e = window.matchMedia(a);
            return e.addListener(A), A(e), () => e.removeListener(A);
          }, [A]),
            n.useEffect(() => {
              let e = (e) => {
                e.key === u && k(e.newValue || d);
              };
              return (
                window.addEventListener("storage", e),
                () => window.removeEventListener("storage", e)
              );
            }, [k]),
            n.useEffect(() => {
              R(null != e ? e : w);
            }, [e, w]);
          let I = n.useMemo(
            () => ({
              theme: w,
              setTheme: k,
              forcedTheme: e,
              resolvedTheme: "system" === w ? x : w,
              themes: r ? [...c, "system"] : c,
              systemTheme: r ? x : void 0,
            }),
            [w, k, e, x, r, c],
          );
          return n.createElement(
            l.Provider,
            { value: I },
            n.createElement(f, {
              forcedTheme: e,
              disableTransitionOnChange: t,
              enableSystem: r,
              enableColorScheme: i,
              storageKey: u,
              themes: c,
              defaultTheme: d,
              attribute: h,
              value: g,
              children: y,
              attrs: S,
              nonce: b,
            }),
            y,
          );
        },
        f = n.memo(
          ({
            forcedTheme: e,
            storageKey: t,
            attribute: r,
            enableSystem: l,
            enableColorScheme: i,
            defaultTheme: u,
            value: c,
            attrs: s,
            nonce: d,
          }) => {
            let f = "system" === u,
              p =
                "class" === r
                  ? `var d=document.documentElement,c=d.classList;c.remove(${s.map((e) => `'${e}'`).join(",")});`
                  : `var d=document.documentElement,n='${r}',s='setAttribute';`,
              m = i
                ? (o.includes(u) ? u : null)
                  ? `if(e==='light'||e==='dark'||!e)d.style.colorScheme=e||'${u}'`
                  : "if(e==='light'||e==='dark')d.style.colorScheme=e"
                : "",
              v = (e, t = !1, n = !0) => {
                let a = c ? c[e] : e,
                  l = t ? e + "|| ''" : `'${a}'`,
                  u = "";
                return (
                  i &&
                    n &&
                    !t &&
                    o.includes(e) &&
                    (u += `d.style.colorScheme = '${e}';`),
                  "class" === r
                    ? t || a
                      ? (u += `c.add(${l})`)
                      : (u += "null")
                    : a && (u += `d[s](n,${l})`),
                  u
                );
              },
              h = e
                ? `!function(){${p}${v(e)}}()`
                : l
                  ? `!function(){try{${p}var e=localStorage.getItem('${t}');if('system'===e||(!e&&${f})){var t='${a}',m=window.matchMedia(t);if(m.media!==t||m.matches){${v("dark")}}else{${v("light")}}}else if(e){${c ? `var x=${JSON.stringify(c)};` : ""}${v(c ? "x[e]" : "e", !0)}}${f ? "" : "else{" + v(u, !1, !1) + "}"}${m}}catch(e){}}()`
                  : `!function(){try{${p}var e=localStorage.getItem('${t}');if(e){${c ? `var x=${JSON.stringify(c)};` : ""}${v(c ? "x[e]" : "e", !0)}}else{${v(u, !1, !1)};}${m}}catch(t){}}();`;
            return n.createElement("script", {
              nonce: d,
              dangerouslySetInnerHTML: { __html: h },
            });
          },
        ),
        p = (e, t) => {},
        m = () => {
          let e = document.createElement("style");
          return (
            e.appendChild(
              document.createTextNode(
                "*{-webkit-transition:none!important;-moz-transition:none!important;-o-transition:none!important;-ms-transition:none!important;transition:none!important}",
              ),
            ),
            document.head.appendChild(e),
            () => {
              window.getComputedStyle(document.body),
                setTimeout(() => {
                  document.head.removeChild(e);
                }, 1);
            }
          );
        },
        v = (e) => (
          e || (e = window.matchMedia(a)), e.matches ? "dark" : "light"
        );
    },
    96229: (e, t, r) => {
      r.d(t, { UC: () => em, ZL: () => ep, bL: () => ed, l9: () => ef });
      var n = r(84205),
        o = r(28777),
        a = r(71604),
        l = r(18047),
        i = r(67301),
        u = r(26481),
        c = r(94449),
        s = r(42414),
        d = r(23174),
        f = r(61966),
        p = r(78593),
        m = r(61268),
        v = n.forwardRef((e, t) => {
          let { children: r, width: n = 10, height: o = 5, ...a } = e;
          return (0, m.jsx)(p.sG.svg, {
            ...a,
            ref: t,
            width: n,
            height: o,
            viewBox: "0 0 30 10",
            preserveAspectRatio: "none",
            children: e.asChild
              ? r
              : (0, m.jsx)("polygon", { points: "0,0 30,0 15,10" }),
          });
        });
      v.displayName = "Arrow";
      var h = r(10308),
        g = r(66130),
        y = r(91557),
        b = "Popper",
        [w, E] = (0, l.A)(b),
        [x, C] = w(b),
        S = (e) => {
          let { __scopePopper: t, children: r } = e,
            [o, a] = n.useState(null);
          return (0, m.jsx)(x, {
            scope: t,
            anchor: o,
            onAnchorChange: a,
            children: r,
          });
        };
      S.displayName = b;
      var R = "PopperAnchor",
        k = n.forwardRef((e, t) => {
          let { __scopePopper: r, virtualRef: o, ...l } = e,
            i = C(R, r),
            u = n.useRef(null),
            c = (0, a.s)(t, u);
          return (
            n.useEffect(() => {
              i.onAnchorChange(o?.current || u.current);
            }),
            o ? null : (0, m.jsx)(p.sG.div, { ...l, ref: c })
          );
        });
      k.displayName = R;
      var A = "PopperContent",
        [I, P] = w(A),
        j = n.forwardRef((e, t) => {
          let {
              __scopePopper: r,
              side: o = "bottom",
              sideOffset: l = 0,
              align: i = "center",
              alignOffset: u = 0,
              arrowPadding: c = 0,
              avoidCollisions: s = !0,
              collisionBoundary: v = [],
              collisionPadding: b = 0,
              sticky: w = "partial",
              hideWhenDetached: E = !1,
              updatePositionStrategy: x = "optimized",
              onPlaced: S,
              ...R
            } = e,
            k = C(A, r),
            [P, j] = n.useState(null),
            D = (0, a.s)(t, (e) => j(e)),
            [N, M] = n.useState(null),
            F = (0, y.X)(N),
            L = F?.width ?? 0,
            _ = F?.height ?? 0,
            B =
              "number" == typeof b
                ? b
                : { top: 0, right: 0, bottom: 0, left: 0, ...b },
            K = Array.isArray(v) ? v : [v],
            G = K.length > 0,
            U = { padding: B, boundary: K.filter(O), altBoundary: G },
            {
              refs: W,
              floatingStyles: q,
              placement: Y,
              isPositioned: H,
              middlewareData: X,
            } = (0, d.we)({
              strategy: "fixed",
              placement: o + ("center" !== i ? "-" + i : ""),
              whileElementsMounted: (...e) =>
                (0, f.ll)(...e, { animationFrame: "always" === x }),
              elements: { reference: k.anchor },
              middleware: [
                (0, d.cY)({ mainAxis: l + _, alignmentAxis: u }),
                s &&
                  (0, d.BN)({
                    mainAxis: !0,
                    crossAxis: !1,
                    limiter: "partial" === w ? (0, d.ER)() : void 0,
                    ...U,
                  }),
                s && (0, d.UU)({ ...U }),
                (0, d.Ej)({
                  ...U,
                  apply: ({
                    elements: e,
                    rects: t,
                    availableWidth: r,
                    availableHeight: n,
                  }) => {
                    let { width: o, height: a } = t.reference,
                      l = e.floating.style;
                    l.setProperty("--radix-popper-available-width", `${r}px`),
                      l.setProperty(
                        "--radix-popper-available-height",
                        `${n}px`,
                      ),
                      l.setProperty("--radix-popper-anchor-width", `${o}px`),
                      l.setProperty("--radix-popper-anchor-height", `${a}px`);
                  },
                }),
                N && (0, d.UE)({ element: N, padding: c }),
                T({ arrowWidth: L, arrowHeight: _ }),
                E && (0, d.jD)({ strategy: "referenceHidden", ...U }),
              ],
            }),
            [V, z] = $(Y),
            Z = (0, h.c)(S);
          (0, g.N)(() => {
            H && Z?.();
          }, [H, Z]);
          let J = X.arrow?.x,
            Q = X.arrow?.y,
            ee = X.arrow?.centerOffset !== 0,
            [et, er] = n.useState();
          return (
            (0, g.N)(() => {
              P && er(window.getComputedStyle(P).zIndex);
            }, [P]),
            (0, m.jsx)("div", {
              ref: W.setFloating,
              "data-radix-popper-content-wrapper": "",
              style: {
                ...q,
                transform: H ? q.transform : "translate(0, -200%)",
                minWidth: "max-content",
                zIndex: et,
                "--radix-popper-transform-origin": [
                  X.transformOrigin?.x,
                  X.transformOrigin?.y,
                ].join(" "),
                ...(X.hide?.referenceHidden && {
                  visibility: "hidden",
                  pointerEvents: "none",
                }),
              },
              dir: e.dir,
              children: (0, m.jsx)(I, {
                scope: r,
                placedSide: V,
                onArrowChange: M,
                arrowX: J,
                arrowY: Q,
                shouldHideArrow: ee,
                children: (0, m.jsx)(p.sG.div, {
                  "data-side": V,
                  "data-align": z,
                  ...R,
                  ref: D,
                  style: { ...R.style, animation: H ? void 0 : "none" },
                }),
              }),
            })
          );
        });
      j.displayName = A;
      var D = "PopperArrow",
        N = { top: "bottom", right: "left", bottom: "top", left: "right" },
        M = n.forwardRef(function (e, t) {
          let { __scopePopper: r, ...n } = e,
            o = P(D, r),
            a = N[o.placedSide];
          return (0, m.jsx)("span", {
            ref: o.onArrowChange,
            style: {
              position: "absolute",
              left: o.arrowX,
              top: o.arrowY,
              [a]: 0,
              transformOrigin: {
                top: "",
                right: "0 0",
                bottom: "center 0",
                left: "100% 0",
              }[o.placedSide],
              transform: {
                top: "translateY(100%)",
                right: "translateY(50%) rotate(90deg) translateX(-50%)",
                bottom: "rotate(180deg)",
                left: "translateY(50%) rotate(-90deg) translateX(50%)",
              }[o.placedSide],
              visibility: o.shouldHideArrow ? "hidden" : void 0,
            },
            children: (0, m.jsx)(v, {
              ...n,
              ref: t,
              style: { ...n.style, display: "block" },
            }),
          });
        });
      function O(e) {
        return null !== e;
      }
      M.displayName = D;
      var T = (e) => ({
        name: "transformOrigin",
        options: e,
        fn(t) {
          let { placement: r, rects: n, middlewareData: o } = t,
            a = o.arrow?.centerOffset !== 0,
            l = a ? 0 : e.arrowWidth,
            i = a ? 0 : e.arrowHeight,
            [u, c] = $(r),
            s = { start: "0%", center: "50%", end: "100%" }[c],
            d = (o.arrow?.x ?? 0) + l / 2,
            f = (o.arrow?.y ?? 0) + i / 2,
            p = "",
            m = "";
          return (
            "bottom" === u
              ? ((p = a ? s : `${d}px`), (m = `${-i}px`))
              : "top" === u
                ? ((p = a ? s : `${d}px`), (m = `${n.floating.height + i}px`))
                : "right" === u
                  ? ((p = `${-i}px`), (m = a ? s : `${f}px`))
                  : "left" === u &&
                    ((p = `${n.floating.width + i}px`), (m = a ? s : `${f}px`)),
            { data: { x: p, y: m } }
          );
        },
      });
      function $(e) {
        let [t, r = "center"] = e.split("-");
        return [t, r];
      }
      var F = r(83138),
        L = r(94653),
        _ = r(63961),
        B = r(48705),
        K = r(73460),
        G = r(82824),
        U = "Popover",
        [W, q] = (0, l.A)(U, [E]),
        Y = E(),
        [H, X] = W(U),
        V = (e) => {
          let {
              __scopePopover: t,
              children: r,
              open: o,
              defaultOpen: a,
              onOpenChange: l,
              modal: i = !1,
            } = e,
            u = Y(t),
            c = n.useRef(null),
            [d, f] = n.useState(!1),
            [p, v] = (0, B.i)({
              prop: o,
              defaultProp: a ?? !1,
              onChange: l,
              caller: U,
            });
          return (0, m.jsx)(S, {
            ...u,
            children: (0, m.jsx)(H, {
              scope: t,
              contentId: (0, s.B)(),
              triggerRef: c,
              open: p,
              onOpenChange: v,
              onOpenToggle: n.useCallback(() => v((e) => !e), [v]),
              hasCustomAnchor: d,
              onCustomAnchorAdd: n.useCallback(() => f(!0), []),
              onCustomAnchorRemove: n.useCallback(() => f(!1), []),
              modal: i,
              children: r,
            }),
          });
        };
      V.displayName = U;
      var z = "PopoverAnchor";
      n.forwardRef((e, t) => {
        let { __scopePopover: r, ...o } = e,
          a = X(z, r),
          l = Y(r),
          { onCustomAnchorAdd: i, onCustomAnchorRemove: u } = a;
        return (
          n.useEffect(() => (i(), () => u()), [i, u]),
          (0, m.jsx)(k, { ...l, ...o, ref: t })
        );
      }).displayName = z;
      var Z = "PopoverTrigger",
        J = n.forwardRef((e, t) => {
          let { __scopePopover: r, ...n } = e,
            l = X(Z, r),
            i = Y(r),
            u = (0, a.s)(t, l.triggerRef),
            c = (0, m.jsx)(p.sG.button, {
              type: "button",
              "aria-haspopup": "dialog",
              "aria-expanded": l.open,
              "aria-controls": l.contentId,
              "data-state": es(l.open),
              ...n,
              ref: u,
              onClick: (0, o.m)(e.onClick, l.onOpenToggle),
            });
          return l.hasCustomAnchor
            ? c
            : (0, m.jsx)(k, { asChild: !0, ...i, children: c });
        });
      J.displayName = Z;
      var Q = "PopoverPortal",
        [ee, et] = W(Q, { forceMount: void 0 }),
        er = (e) => {
          let {
              __scopePopover: t,
              forceMount: r,
              children: n,
              container: o,
            } = e,
            a = X(Q, t);
          return (0, m.jsx)(ee, {
            scope: t,
            forceMount: r,
            children: (0, m.jsx)(L.C, {
              present: r || a.open,
              children: (0, m.jsx)(F.Z, {
                asChild: !0,
                container: o,
                children: n,
              }),
            }),
          });
        };
      er.displayName = Q;
      var en = "PopoverContent",
        eo = n.forwardRef((e, t) => {
          let r = et(en, e.__scopePopover),
            { forceMount: n = r.forceMount, ...o } = e,
            a = X(en, e.__scopePopover);
          return (0, m.jsx)(L.C, {
            present: n || a.open,
            children: a.modal
              ? (0, m.jsx)(el, { ...o, ref: t })
              : (0, m.jsx)(ei, { ...o, ref: t }),
          });
        });
      eo.displayName = en;
      var ea = (0, _.TL)("PopoverContent.RemoveScroll"),
        el = n.forwardRef((e, t) => {
          let r = X(en, e.__scopePopover),
            l = n.useRef(null),
            i = (0, a.s)(t, l),
            u = n.useRef(!1);
          return (
            n.useEffect(() => {
              let e = l.current;
              if (e) return (0, K.Eq)(e);
            }, []),
            (0, m.jsx)(G.A, {
              as: ea,
              allowPinchZoom: !0,
              children: (0, m.jsx)(eu, {
                ...e,
                ref: i,
                trapFocus: r.open,
                disableOutsidePointerEvents: !0,
                onCloseAutoFocus: (0, o.m)(e.onCloseAutoFocus, (e) => {
                  e.preventDefault(),
                    u.current || r.triggerRef.current?.focus();
                }),
                onPointerDownOutside: (0, o.m)(
                  e.onPointerDownOutside,
                  (e) => {
                    let t = e.detail.originalEvent,
                      r = 0 === t.button && !0 === t.ctrlKey;
                    u.current = 2 === t.button || r;
                  },
                  { checkForDefaultPrevented: !1 },
                ),
                onFocusOutside: (0, o.m)(
                  e.onFocusOutside,
                  (e) => e.preventDefault(),
                  { checkForDefaultPrevented: !1 },
                ),
              }),
            })
          );
        }),
        ei = n.forwardRef((e, t) => {
          let r = X(en, e.__scopePopover),
            o = n.useRef(!1),
            a = n.useRef(!1);
          return (0, m.jsx)(eu, {
            ...e,
            ref: t,
            trapFocus: !1,
            disableOutsidePointerEvents: !1,
            onCloseAutoFocus: (t) => {
              e.onCloseAutoFocus?.(t),
                t.defaultPrevented ||
                  (o.current || r.triggerRef.current?.focus(),
                  t.preventDefault()),
                (o.current = !1),
                (a.current = !1);
            },
            onInteractOutside: (t) => {
              e.onInteractOutside?.(t),
                t.defaultPrevented ||
                  ((o.current = !0),
                  "pointerdown" === t.detail.originalEvent.type &&
                    (a.current = !0));
              let n = t.target;
              r.triggerRef.current?.contains(n) && t.preventDefault(),
                "focusin" === t.detail.originalEvent.type &&
                  a.current &&
                  t.preventDefault();
            },
          });
        }),
        eu = n.forwardRef((e, t) => {
          let {
              __scopePopover: r,
              trapFocus: n,
              onOpenAutoFocus: o,
              onCloseAutoFocus: a,
              disableOutsidePointerEvents: l,
              onEscapeKeyDown: s,
              onPointerDownOutside: d,
              onFocusOutside: f,
              onInteractOutside: p,
              ...v
            } = e,
            h = X(en, r),
            g = Y(r);
          return (
            (0, u.Oh)(),
            (0, m.jsx)(c.n, {
              asChild: !0,
              loop: !0,
              trapped: n,
              onMountAutoFocus: o,
              onUnmountAutoFocus: a,
              children: (0, m.jsx)(i.qW, {
                asChild: !0,
                disableOutsidePointerEvents: l,
                onInteractOutside: p,
                onEscapeKeyDown: s,
                onPointerDownOutside: d,
                onFocusOutside: f,
                onDismiss: () => h.onOpenChange(!1),
                children: (0, m.jsx)(j, {
                  "data-state": es(h.open),
                  role: "dialog",
                  id: h.contentId,
                  ...g,
                  ...v,
                  ref: t,
                  style: {
                    ...v.style,
                    "--radix-popover-content-transform-origin":
                      "var(--radix-popper-transform-origin)",
                    "--radix-popover-content-available-width":
                      "var(--radix-popper-available-width)",
                    "--radix-popover-content-available-height":
                      "var(--radix-popper-available-height)",
                    "--radix-popover-trigger-width":
                      "var(--radix-popper-anchor-width)",
                    "--radix-popover-trigger-height":
                      "var(--radix-popper-anchor-height)",
                  },
                }),
              }),
            })
          );
        }),
        ec = "PopoverClose";
      function es(e) {
        return e ? "open" : "closed";
      }
      (n.forwardRef((e, t) => {
        let { __scopePopover: r, ...n } = e,
          a = X(ec, r);
        return (0, m.jsx)(p.sG.button, {
          type: "button",
          ...n,
          ref: t,
          onClick: (0, o.m)(e.onClick, () => a.onOpenChange(!1)),
        });
      }).displayName = ec),
        (n.forwardRef((e, t) => {
          let { __scopePopover: r, ...n } = e,
            o = Y(r);
          return (0, m.jsx)(M, { ...o, ...n, ref: t });
        }).displayName = "PopoverArrow");
      var ed = V,
        ef = J,
        ep = er,
        em = eo;
    },
  });
//# sourceMappingURL=7333.js.map
