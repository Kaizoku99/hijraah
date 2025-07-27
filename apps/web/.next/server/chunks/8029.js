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
    (e._sentryDebugIds[t] = "2cc3a524-8a0c-42f6-8443-b911ba075f1a"),
    (e._sentryDebugIdIdentifier =
      "sentry-dbid-2cc3a524-8a0c-42f6-8443-b911ba075f1a"));
} catch (e) {}
("use strict");
(exports.id = 8029),
  (exports.ids = [8029]),
  (exports.modules = {
    28029: (e, t, r) => {
      r.d(t, { N: () => f });
      var l = r(84205),
        n = r(18047),
        o = r(71604),
        i = r(63961),
        a = r(61268);
      function f(e) {
        let t = e + "CollectionProvider",
          [r, f] = (0, n.A)(t),
          [u, c] = r(t, {
            collectionRef: { current: null },
            itemMap: new Map(),
          }),
          s = (e) => {
            let { scope: t, children: r } = e,
              n = l.useRef(null),
              o = l.useRef(new Map()).current;
            return (0, a.jsx)(u, {
              scope: t,
              itemMap: o,
              collectionRef: n,
              children: r,
            });
          };
        s.displayName = t;
        let d = e + "CollectionSlot",
          p = (0, i.TL)(d),
          y = l.forwardRef((e, t) => {
            let { scope: r, children: l } = e,
              n = c(d, r),
              i = (0, o.s)(t, n.collectionRef);
            return (0, a.jsx)(p, { ref: i, children: l });
          });
        y.displayName = d;
        let m = e + "CollectionItemSlot",
          b = "data-radix-collection-item",
          w = (0, i.TL)(m),
          R = l.forwardRef((e, t) => {
            let { scope: r, children: n, ...i } = e,
              f = l.useRef(null),
              u = (0, o.s)(t, f),
              s = c(m, r);
            return (
              l.useEffect(
                () => (
                  s.itemMap.set(f, { ref: f, ...i }),
                  () => void s.itemMap.delete(f)
                ),
              ),
              (0, a.jsx)(w, { ...{ [b]: "" }, ref: u, children: n })
            );
          });
        return (
          (R.displayName = m),
          [
            { Provider: s, Slot: y, ItemSlot: R },
            function (t) {
              let r = c(e + "CollectionConsumer", t);
              return l.useCallback(() => {
                let e = r.collectionRef.current;
                if (!e) return [];
                let t = Array.from(e.querySelectorAll(`[${b}]`));
                return Array.from(r.itemMap.values()).sort(
                  (e, r) => t.indexOf(e.ref.current) - t.indexOf(r.ref.current),
                );
              }, [r.collectionRef, r.itemMap]);
            },
            f,
          ]
        );
      }
      var u = new WeakMap();
      function c(e, t) {
        if ("at" in Array.prototype) return Array.prototype.at.call(e, t);
        let r = (function (e, t) {
          let r = e.length,
            l = s(t),
            n = l >= 0 ? l : r + l;
          return n < 0 || n >= r ? -1 : n;
        })(e, t);
        return -1 === r ? void 0 : e[r];
      }
      function s(e) {
        return e != e || 0 === e ? 0 : Math.trunc(e);
      }
    },
  });
//# sourceMappingURL=8029.js.map
