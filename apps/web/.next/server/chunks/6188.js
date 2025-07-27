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
    (e._sentryDebugIds[t] = "3ffa411b-a678-46d0-8a49-0e993e1d9f06"),
    (e._sentryDebugIdIdentifier =
      "sentry-dbid-3ffa411b-a678-46d0-8a49-0e993e1d9f06"));
} catch (e) {}
("use strict");
(exports.id = 6188),
  (exports.ids = [6188]),
  (exports.modules = {
    10308: (e, t, n) => {
      n.d(t, { c: () => o });
      var r = n(84205);
      function o(e) {
        let t = r.useRef(e);
        return (
          r.useEffect(() => {
            t.current = e;
          }),
          r.useMemo(
            () =>
              (...e) =>
                t.current?.(...e),
            [],
          )
        );
      }
    },
    33459: (e, t, n) => {
      n.d(t, {
        G$: () => J,
        Hs: () => h,
        UC: () => en,
        VY: () => eo,
        ZL: () => ee,
        bL: () => z,
        bm: () => ei,
        hE: () => er,
        hJ: () => et,
        l9: () => Q,
      });
      var r = n(84205),
        o = n(28777),
        i = n(79744),
        a = n(14072),
        s = n(66257),
        l = n(15359),
        u = n(67400),
        d = n(12447),
        c = n(85660),
        f = n(35549),
        p = n(56558),
        m = n(10897),
        g = n(3205),
        y = n(73460),
        v = n(86415),
        N = n(61268),
        D = "Dialog",
        [b, h] = (0, a.A)(D),
        [I, O] = b(D),
        R = (e) => {
          let {
              __scopeDialog: t,
              children: n,
              open: o,
              defaultOpen: i,
              onOpenChange: a,
              modal: u = !0,
            } = e,
            d = r.useRef(null),
            c = r.useRef(null),
            [f, p] = (0, l.i)({
              prop: o,
              defaultProp: i ?? !1,
              onChange: a,
              caller: D,
            });
          return (0, N.jsx)(I, {
            scope: t,
            triggerRef: d,
            contentRef: c,
            contentId: (0, s.B)(),
            titleId: (0, s.B)(),
            descriptionId: (0, s.B)(),
            open: f,
            onOpenChange: p,
            onOpenToggle: r.useCallback(() => p((e) => !e), [p]),
            modal: u,
            children: n,
          });
        };
      R.displayName = D;
      var w = "DialogTrigger",
        x = r.forwardRef((e, t) => {
          let { __scopeDialog: n, ...r } = e,
            a = O(w, n),
            s = (0, i.s)(t, a.triggerRef);
          return (0, N.jsx)(p.sG.button, {
            type: "button",
            "aria-haspopup": "dialog",
            "aria-expanded": a.open,
            "aria-controls": a.contentId,
            "data-state": Z(a.open),
            ...r,
            ref: s,
            onClick: (0, o.m)(e.onClick, a.onOpenToggle),
          });
        });
      x.displayName = w;
      var C = "DialogPortal",
        [E, j] = b(C, { forceMount: void 0 }),
        T = (e) => {
          let {
              __scopeDialog: t,
              forceMount: n,
              children: o,
              container: i,
            } = e,
            a = O(C, t);
          return (0, N.jsx)(E, {
            scope: t,
            forceMount: n,
            children: r.Children.map(o, (e) =>
              (0, N.jsx)(f.C, {
                present: n || a.open,
                children: (0, N.jsx)(c.Z, {
                  asChild: !0,
                  container: i,
                  children: e,
                }),
              }),
            ),
          });
        };
      T.displayName = C;
      var M = "DialogOverlay",
        A = r.forwardRef((e, t) => {
          let n = j(M, e.__scopeDialog),
            { forceMount: r = n.forceMount, ...o } = e,
            i = O(M, e.__scopeDialog);
          return i.modal
            ? (0, N.jsx)(f.C, {
                present: r || i.open,
                children: (0, N.jsx)(F, { ...o, ref: t }),
              })
            : null;
        });
      A.displayName = M;
      var _ = (0, v.TL)("DialogOverlay.RemoveScroll"),
        F = r.forwardRef((e, t) => {
          let { __scopeDialog: n, ...r } = e,
            o = O(M, n);
          return (0, N.jsx)(g.A, {
            as: _,
            allowPinchZoom: !0,
            shards: [o.contentRef],
            children: (0, N.jsx)(p.sG.div, {
              "data-state": Z(o.open),
              ...r,
              ref: t,
              style: { pointerEvents: "auto", ...r.style },
            }),
          });
        }),
        P = "DialogContent",
        U = r.forwardRef((e, t) => {
          let n = j(P, e.__scopeDialog),
            { forceMount: r = n.forceMount, ...o } = e,
            i = O(P, e.__scopeDialog);
          return (0, N.jsx)(f.C, {
            present: r || i.open,
            children: i.modal
              ? (0, N.jsx)(k, { ...o, ref: t })
              : (0, N.jsx)(L, { ...o, ref: t }),
          });
        });
      U.displayName = P;
      var k = r.forwardRef((e, t) => {
          let n = O(P, e.__scopeDialog),
            a = r.useRef(null),
            s = (0, i.s)(t, n.contentRef, a);
          return (
            r.useEffect(() => {
              let e = a.current;
              if (e) return (0, y.Eq)(e);
            }, []),
            (0, N.jsx)(S, {
              ...e,
              ref: s,
              trapFocus: n.open,
              disableOutsidePointerEvents: !0,
              onCloseAutoFocus: (0, o.m)(e.onCloseAutoFocus, (e) => {
                e.preventDefault(), n.triggerRef.current?.focus();
              }),
              onPointerDownOutside: (0, o.m)(e.onPointerDownOutside, (e) => {
                let t = e.detail.originalEvent,
                  n = 0 === t.button && !0 === t.ctrlKey;
                (2 === t.button || n) && e.preventDefault();
              }),
              onFocusOutside: (0, o.m)(e.onFocusOutside, (e) =>
                e.preventDefault(),
              ),
            })
          );
        }),
        L = r.forwardRef((e, t) => {
          let n = O(P, e.__scopeDialog),
            o = r.useRef(!1),
            i = r.useRef(!1);
          return (0, N.jsx)(S, {
            ...e,
            ref: t,
            trapFocus: !1,
            disableOutsidePointerEvents: !1,
            onCloseAutoFocus: (t) => {
              e.onCloseAutoFocus?.(t),
                t.defaultPrevented ||
                  (o.current || n.triggerRef.current?.focus(),
                  t.preventDefault()),
                (o.current = !1),
                (i.current = !1);
            },
            onInteractOutside: (t) => {
              e.onInteractOutside?.(t),
                t.defaultPrevented ||
                  ((o.current = !0),
                  "pointerdown" === t.detail.originalEvent.type &&
                    (i.current = !0));
              let r = t.target;
              n.triggerRef.current?.contains(r) && t.preventDefault(),
                "focusin" === t.detail.originalEvent.type &&
                  i.current &&
                  t.preventDefault();
            },
          });
        }),
        S = r.forwardRef((e, t) => {
          let {
              __scopeDialog: n,
              trapFocus: o,
              onOpenAutoFocus: a,
              onCloseAutoFocus: s,
              ...l
            } = e,
            c = O(P, n),
            f = r.useRef(null),
            p = (0, i.s)(t, f);
          return (
            (0, m.Oh)(),
            (0, N.jsxs)(N.Fragment, {
              children: [
                (0, N.jsx)(d.n, {
                  asChild: !0,
                  loop: !0,
                  trapped: o,
                  onMountAutoFocus: a,
                  onUnmountAutoFocus: s,
                  children: (0, N.jsx)(u.qW, {
                    role: "dialog",
                    id: c.contentId,
                    "aria-describedby": c.descriptionId,
                    "aria-labelledby": c.titleId,
                    "data-state": Z(c.open),
                    ...l,
                    ref: p,
                    onDismiss: () => c.onOpenChange(!1),
                  }),
                }),
                (0, N.jsxs)(N.Fragment, {
                  children: [
                    (0, N.jsx)(X, { titleId: c.titleId }),
                    (0, N.jsx)(Y, {
                      contentRef: f,
                      descriptionId: c.descriptionId,
                    }),
                  ],
                }),
              ],
            })
          );
        }),
        W = "DialogTitle",
        G = r.forwardRef((e, t) => {
          let { __scopeDialog: n, ...r } = e,
            o = O(W, n);
          return (0, N.jsx)(p.sG.h2, { id: o.titleId, ...r, ref: t });
        });
      G.displayName = W;
      var $ = "DialogDescription",
        B = r.forwardRef((e, t) => {
          let { __scopeDialog: n, ...r } = e,
            o = O($, n);
          return (0, N.jsx)(p.sG.p, { id: o.descriptionId, ...r, ref: t });
        });
      B.displayName = $;
      var q = "DialogClose",
        V = r.forwardRef((e, t) => {
          let { __scopeDialog: n, ...r } = e,
            i = O(q, n);
          return (0, N.jsx)(p.sG.button, {
            type: "button",
            ...r,
            ref: t,
            onClick: (0, o.m)(e.onClick, () => i.onOpenChange(!1)),
          });
        });
      function Z(e) {
        return e ? "open" : "closed";
      }
      V.displayName = q;
      var H = "DialogTitleWarning",
        [J, K] = (0, a.q)(H, {
          contentName: P,
          titleName: W,
          docsSlug: "dialog",
        }),
        X = ({ titleId: e }) => {
          let t = K(H),
            n = `\`${t.contentName}\` requires a \`${t.titleName}\` for the component to be accessible for screen reader users.

If you want to hide the \`${t.titleName}\`, you can wrap it with our VisuallyHidden component.

For more information, see https://radix-ui.com/primitives/docs/components/${t.docsSlug}`;
          return (
            r.useEffect(() => {
              e && (document.getElementById(e) || console.error(n));
            }, [n, e]),
            null
          );
        },
        Y = ({ contentRef: e, descriptionId: t }) => {
          let n = K("DialogDescriptionWarning"),
            o = `Warning: Missing \`Description\` or \`aria-describedby={undefined}\` for {${n.contentName}}.`;
          return (
            r.useEffect(() => {
              let n = e.current?.getAttribute("aria-describedby");
              t && n && (document.getElementById(t) || console.warn(o));
            }, [o, e, t]),
            null
          );
        },
        z = R,
        Q = x,
        ee = T,
        et = A,
        en = U,
        er = G,
        eo = B,
        ei = V;
    },
    35549: (e, t, n) => {
      n.d(t, { C: () => a });
      var r = n(84205),
        o = n(79744),
        i = n(37155),
        a = (e) => {
          let { present: t, children: n } = e,
            a = (function (e) {
              var t, n;
              let [o, a] = r.useState(),
                l = r.useRef(null),
                u = r.useRef(e),
                d = r.useRef("none"),
                [c, f] =
                  ((t = e ? "mounted" : "unmounted"),
                  (n = {
                    mounted: {
                      UNMOUNT: "unmounted",
                      ANIMATION_OUT: "unmountSuspended",
                    },
                    unmountSuspended: {
                      MOUNT: "mounted",
                      ANIMATION_END: "unmounted",
                    },
                    unmounted: { MOUNT: "mounted" },
                  }),
                  r.useReducer((e, t) => n[e][t] ?? e, t));
              return (
                r.useEffect(() => {
                  let e = s(l.current);
                  d.current = "mounted" === c ? e : "none";
                }, [c]),
                (0, i.N)(() => {
                  let t = l.current,
                    n = u.current;
                  if (n !== e) {
                    let r = d.current,
                      o = s(t);
                    e
                      ? f("MOUNT")
                      : "none" === o || t?.display === "none"
                        ? f("UNMOUNT")
                        : n && r !== o
                          ? f("ANIMATION_OUT")
                          : f("UNMOUNT"),
                      (u.current = e);
                  }
                }, [e, f]),
                (0, i.N)(() => {
                  if (o) {
                    let e,
                      t = o.ownerDocument.defaultView ?? window,
                      n = (n) => {
                        let r = s(l.current).includes(n.animationName);
                        if (
                          n.target === o &&
                          r &&
                          (f("ANIMATION_END"), !u.current)
                        ) {
                          let n = o.style.animationFillMode;
                          (o.style.animationFillMode = "forwards"),
                            (e = t.setTimeout(() => {
                              "forwards" === o.style.animationFillMode &&
                                (o.style.animationFillMode = n);
                            }));
                        }
                      },
                      r = (e) => {
                        e.target === o && (d.current = s(l.current));
                      };
                    return (
                      o.addEventListener("animationstart", r),
                      o.addEventListener("animationcancel", n),
                      o.addEventListener("animationend", n),
                      () => {
                        t.clearTimeout(e),
                          o.removeEventListener("animationstart", r),
                          o.removeEventListener("animationcancel", n),
                          o.removeEventListener("animationend", n);
                      }
                    );
                  }
                  f("ANIMATION_END");
                }, [o, f]),
                {
                  isPresent: ["mounted", "unmountSuspended"].includes(c),
                  ref: r.useCallback((e) => {
                    (l.current = e ? getComputedStyle(e) : null), a(e);
                  }, []),
                }
              );
            })(t),
            l =
              "function" == typeof n
                ? n({ present: a.isPresent })
                : r.Children.only(n),
            u = (0, o.s)(
              a.ref,
              (function (e) {
                let t = Object.getOwnPropertyDescriptor(e.props, "ref")?.get,
                  n = t && "isReactWarning" in t && t.isReactWarning;
                return n
                  ? e.ref
                  : (n =
                        (t = Object.getOwnPropertyDescriptor(e, "ref")?.get) &&
                        "isReactWarning" in t &&
                        t.isReactWarning)
                    ? e.props.ref
                    : e.props.ref || e.ref;
              })(l),
            );
          return "function" == typeof n || a.isPresent
            ? r.cloneElement(l, { ref: u })
            : null;
        };
      function s(e) {
        return e?.animationName || "none";
      }
      a.displayName = "Presence";
    },
    90495: (e, t, n) => {
      n.d(t, { A: () => r });
      let r = (0, n(95255).A)("X", [
        ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
        ["path", { d: "m6 6 12 12", key: "d8bk6v" }],
      ]);
    },
  });
//# sourceMappingURL=6188.js.map
