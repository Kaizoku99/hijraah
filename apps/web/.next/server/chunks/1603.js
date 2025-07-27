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
    (e._sentryDebugIds[r] = "819092bc-7119-408d-83e9-3964b0744010"),
    (e._sentryDebugIdIdentifier =
      "sentry-dbid-819092bc-7119-408d-83e9-3964b0744010"));
} catch (e) {}
("use strict");
(exports.id = 1603),
  (exports.ids = [1603]),
  (exports.modules = {
    7839: (e, r, t) => {
      t.d(r, { jH: () => o });
      var a = t(84205);
      t(61268);
      var n = a.createContext(void 0);
      function o(e) {
        let r = a.useContext(n);
        return e || r || "ltr";
      }
    },
    11603: (e, r, t) => {
      t.a(e, async (e, a) => {
        try {
          t.d(r, { $m: () => p, As: () => f, nD: () => c, ub: () => u });
          var n = t(61268),
            o = t(84205),
            i = t(42817),
            l = t(70753),
            s = t(15942),
            d = e([s]);
          s = (d.then ? (await d)() : d)[0];
          let c = i.bL,
            f = o.forwardRef(({ className: e, ...r }, t) =>
              (0, n.jsx)(i.q7, {
                ref: t,
                className: (0, s.cn)("border-b", e),
                ...r,
              }),
            );
          f.displayName = "AccordionItem";
          let p = o.forwardRef(({ className: e, children: r, ...t }, a) =>
            (0, n.jsx)(i.Y9, {
              className: "flex",
              children: (0, n.jsxs)(i.l9, {
                ref: a,
                className: (0, s.cn)(
                  "flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180",
                  e,
                ),
                ...t,
                children: [
                  r,
                  (0, n.jsx)(l.A, {
                    className:
                      "h-4 w-4 shrink-0 transition-transform duration-200",
                  }),
                ],
              }),
            }),
          );
          p.displayName = i.l9.displayName;
          let u = o.forwardRef(({ className: e, children: r, ...t }, a) =>
            (0, n.jsx)(i.UC, {
              ref: a,
              className:
                "overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",
              ...t,
              children: (0, n.jsx)("div", {
                className: (0, s.cn)("pb-4 pt-0", e),
                children: r,
              }),
            }),
          );
          (u.displayName = i.UC.displayName), a();
        } catch (e) {
          a(e);
        }
      });
    },
    42817: (e, r, t) => {
      t.d(r, {
        UC: () => ei,
        Y9: () => en,
        q7: () => ea,
        bL: () => et,
        l9: () => eo,
      });
      var a = t(84205),
        n = t(18047),
        o = t(28029),
        i = t(71604),
        l = t(28777),
        s = t(48705),
        d = t(78593),
        c = t(66130),
        f = t(94653),
        p = t(42414),
        u = t(61268),
        b = "Collapsible",
        [m, h] = (0, n.A)(b),
        [x, y] = m(b),
        w = a.forwardRef((e, r) => {
          let {
              __scopeCollapsible: t,
              open: n,
              defaultOpen: o,
              disabled: i,
              onOpenChange: l,
              ...c
            } = e,
            [f, m] = (0, s.i)({
              prop: n,
              defaultProp: o ?? !1,
              onChange: l,
              caller: b,
            });
          return (0, u.jsx)(x, {
            scope: t,
            disabled: i,
            contentId: (0, p.B)(),
            open: f,
            onOpenToggle: a.useCallback(() => m((e) => !e), [m]),
            children: (0, u.jsx)(d.sG.div, {
              "data-state": A(f),
              "data-disabled": i ? "" : void 0,
              ...c,
              ref: r,
            }),
          });
        });
      w.displayName = b;
      var v = "CollapsibleTrigger",
        g = a.forwardRef((e, r) => {
          let { __scopeCollapsible: t, ...a } = e,
            n = y(v, t);
          return (0, u.jsx)(d.sG.button, {
            type: "button",
            "aria-controls": n.contentId,
            "aria-expanded": n.open || !1,
            "data-state": A(n.open),
            "data-disabled": n.disabled ? "" : void 0,
            disabled: n.disabled,
            ...a,
            ref: r,
            onClick: (0, l.m)(e.onClick, n.onOpenToggle),
          });
        });
      g.displayName = v;
      var j = "CollapsibleContent",
        C = a.forwardRef((e, r) => {
          let { forceMount: t, ...a } = e,
            n = y(j, e.__scopeCollapsible);
          return (0, u.jsx)(f.C, {
            present: t || n.open,
            children: ({ present: e }) =>
              (0, u.jsx)(N, { ...a, ref: r, present: e }),
          });
        });
      C.displayName = j;
      var N = a.forwardRef((e, r) => {
        let { __scopeCollapsible: t, present: n, children: o, ...l } = e,
          s = y(j, t),
          [f, p] = a.useState(n),
          b = a.useRef(null),
          m = (0, i.s)(r, b),
          h = a.useRef(0),
          x = h.current,
          w = a.useRef(0),
          v = w.current,
          g = s.open || f,
          C = a.useRef(g),
          N = a.useRef(void 0);
        return (
          a.useEffect(() => {
            let e = requestAnimationFrame(() => (C.current = !1));
            return () => cancelAnimationFrame(e);
          }, []),
          (0, c.N)(() => {
            let e = b.current;
            if (e) {
              (N.current = N.current || {
                transitionDuration: e.style.transitionDuration,
                animationName: e.style.animationName,
              }),
                (e.style.transitionDuration = "0s"),
                (e.style.animationName = "none");
              let r = e.getBoundingClientRect();
              (h.current = r.height),
                (w.current = r.width),
                C.current ||
                  ((e.style.transitionDuration = N.current.transitionDuration),
                  (e.style.animationName = N.current.animationName)),
                p(n);
            }
          }, [s.open, n]),
          (0, u.jsx)(d.sG.div, {
            "data-state": A(s.open),
            "data-disabled": s.disabled ? "" : void 0,
            id: s.contentId,
            hidden: !g,
            ...l,
            ref: m,
            style: {
              "--radix-collapsible-content-height": x ? `${x}px` : void 0,
              "--radix-collapsible-content-width": v ? `${v}px` : void 0,
              ...e.style,
            },
            children: g && o,
          })
        );
      });
      function A(e) {
        return e ? "open" : "closed";
      }
      var R = t(7839),
        I = "Accordion",
        _ = ["Home", "End", "ArrowDown", "ArrowUp", "ArrowLeft", "ArrowRight"],
        [k, D, O] = (0, o.N)(I),
        [T, G] = (0, n.A)(I, [O, h]),
        H = h(),
        U = a.forwardRef((e, r) => {
          let { type: t, ...a } = e;
          return (0, u.jsx)(k.Provider, {
            scope: e.__scopeAccordion,
            children:
              "multiple" === t
                ? (0, u.jsx)(S, { ...a, ref: r })
                : (0, u.jsx)(B, { ...a, ref: r }),
          });
        });
      U.displayName = I;
      var [E, L] = T(I),
        [P, q] = T(I, { collapsible: !1 }),
        B = a.forwardRef((e, r) => {
          let {
              value: t,
              defaultValue: n,
              onValueChange: o = () => {},
              collapsible: i = !1,
              ...l
            } = e,
            [d, c] = (0, s.i)({
              prop: t,
              defaultProp: n ?? "",
              onChange: o,
              caller: I,
            });
          return (0, u.jsx)(E, {
            scope: e.__scopeAccordion,
            value: a.useMemo(() => (d ? [d] : []), [d]),
            onItemOpen: c,
            onItemClose: a.useCallback(() => i && c(""), [i, c]),
            children: (0, u.jsx)(P, {
              scope: e.__scopeAccordion,
              collapsible: i,
              children: (0, u.jsx)(F, { ...l, ref: r }),
            }),
          });
        }),
        S = a.forwardRef((e, r) => {
          let {
              value: t,
              defaultValue: n,
              onValueChange: o = () => {},
              ...i
            } = e,
            [l, d] = (0, s.i)({
              prop: t,
              defaultProp: n ?? [],
              onChange: o,
              caller: I,
            }),
            c = a.useCallback((e) => d((r = []) => [...r, e]), [d]),
            f = a.useCallback(
              (e) => d((r = []) => r.filter((r) => r !== e)),
              [d],
            );
          return (0, u.jsx)(E, {
            scope: e.__scopeAccordion,
            value: l,
            onItemOpen: c,
            onItemClose: f,
            children: (0, u.jsx)(P, {
              scope: e.__scopeAccordion,
              collapsible: !0,
              children: (0, u.jsx)(F, { ...i, ref: r }),
            }),
          });
        }),
        [$, z] = T(I),
        F = a.forwardRef((e, r) => {
          let {
              __scopeAccordion: t,
              disabled: n,
              dir: o,
              orientation: s = "vertical",
              ...c
            } = e,
            f = a.useRef(null),
            p = (0, i.s)(f, r),
            b = D(t),
            m = "ltr" === (0, R.jH)(o),
            h = (0, l.m)(e.onKeyDown, (e) => {
              if (!_.includes(e.key)) return;
              let r = e.target,
                t = b().filter((e) => !e.ref.current?.disabled),
                a = t.findIndex((e) => e.ref.current === r),
                n = t.length;
              if (-1 === a) return;
              e.preventDefault();
              let o = a,
                i = n - 1,
                l = () => {
                  (o = a + 1) > i && (o = 0);
                },
                d = () => {
                  (o = a - 1) < 0 && (o = i);
                };
              switch (e.key) {
                case "Home":
                  o = 0;
                  break;
                case "End":
                  o = i;
                  break;
                case "ArrowRight":
                  "horizontal" === s && (m ? l() : d());
                  break;
                case "ArrowDown":
                  "vertical" === s && l();
                  break;
                case "ArrowLeft":
                  "horizontal" === s && (m ? d() : l());
                  break;
                case "ArrowUp":
                  "vertical" === s && d();
              }
              let c = o % n;
              t[c].ref.current?.focus();
            });
          return (0, u.jsx)($, {
            scope: t,
            disabled: n,
            direction: o,
            orientation: s,
            children: (0, u.jsx)(k.Slot, {
              scope: t,
              children: (0, u.jsx)(d.sG.div, {
                ...c,
                "data-orientation": s,
                ref: p,
                onKeyDown: n ? void 0 : h,
              }),
            }),
          });
        }),
        K = "AccordionItem",
        [Y, M] = T(K),
        J = a.forwardRef((e, r) => {
          let { __scopeAccordion: t, value: a, ...n } = e,
            o = z(K, t),
            i = L(K, t),
            l = H(t),
            s = (0, p.B)(),
            d = (a && i.value.includes(a)) || !1,
            c = o.disabled || e.disabled;
          return (0, u.jsx)(Y, {
            scope: t,
            open: d,
            disabled: c,
            triggerId: s,
            children: (0, u.jsx)(w, {
              "data-orientation": o.orientation,
              "data-state": er(d),
              ...l,
              ...n,
              ref: r,
              disabled: c,
              open: d,
              onOpenChange: (e) => {
                e ? i.onItemOpen(a) : i.onItemClose(a);
              },
            }),
          });
        });
      J.displayName = K;
      var Q = "AccordionHeader",
        V = a.forwardRef((e, r) => {
          let { __scopeAccordion: t, ...a } = e,
            n = z(I, t),
            o = M(Q, t);
          return (0, u.jsx)(d.sG.h3, {
            "data-orientation": n.orientation,
            "data-state": er(o.open),
            "data-disabled": o.disabled ? "" : void 0,
            ...a,
            ref: r,
          });
        });
      V.displayName = Q;
      var W = "AccordionTrigger",
        X = a.forwardRef((e, r) => {
          let { __scopeAccordion: t, ...a } = e,
            n = z(I, t),
            o = M(W, t),
            i = q(W, t),
            l = H(t);
          return (0, u.jsx)(k.ItemSlot, {
            scope: t,
            children: (0, u.jsx)(g, {
              "aria-disabled": (o.open && !i.collapsible) || void 0,
              "data-orientation": n.orientation,
              id: o.triggerId,
              ...l,
              ...a,
              ref: r,
            }),
          });
        });
      X.displayName = W;
      var Z = "AccordionContent",
        ee = a.forwardRef((e, r) => {
          let { __scopeAccordion: t, ...a } = e,
            n = z(I, t),
            o = M(Z, t),
            i = H(t);
          return (0, u.jsx)(C, {
            role: "region",
            "aria-labelledby": o.triggerId,
            "data-orientation": n.orientation,
            ...i,
            ...a,
            ref: r,
            style: {
              "--radix-accordion-content-height":
                "var(--radix-collapsible-content-height)",
              "--radix-accordion-content-width":
                "var(--radix-collapsible-content-width)",
              ...e.style,
            },
          });
        });
      function er(e) {
        return e ? "open" : "closed";
      }
      ee.displayName = Z;
      var et = U,
        ea = J,
        en = V,
        eo = X,
        ei = ee;
    },
  });
//# sourceMappingURL=1603.js.map
