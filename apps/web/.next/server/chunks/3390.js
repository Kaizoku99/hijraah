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
    (e._sentryDebugIds[t] = "29fabe1d-f0de-4d49-90b0-6d91ac6d693a"),
    (e._sentryDebugIdIdentifier =
      "sentry-dbid-29fabe1d-f0de-4d49-90b0-6d91ac6d693a"));
} catch (e) {}
("use strict");
(exports.id = 3390),
  (exports.ids = [3390]),
  (exports.modules = {
    15016: (e, t, n) => {
      n.d(t, { N: () => f });
      var r = n(84205),
        i = n(14072),
        o = n(79744),
        l = n(86415),
        a = n(61268);
      function f(e) {
        let t = e + "CollectionProvider",
          [n, f] = (0, i.A)(t),
          [s, u] = n(t, {
            collectionRef: { current: null },
            itemMap: new Map(),
          }),
          c = (e) => {
            let { scope: t, children: n } = e,
              i = r.useRef(null),
              o = r.useRef(new Map()).current;
            return (0, a.jsx)(s, {
              scope: t,
              itemMap: o,
              collectionRef: i,
              children: n,
            });
          };
        c.displayName = t;
        let d = e + "CollectionSlot",
          p = (0, l.TL)(d),
          h = r.forwardRef((e, t) => {
            let { scope: n, children: r } = e,
              i = u(d, n),
              l = (0, o.s)(t, i.collectionRef);
            return (0, a.jsx)(p, { ref: l, children: r });
          });
        h.displayName = d;
        let m = e + "CollectionItemSlot",
          g = "data-radix-collection-item",
          y = (0, l.TL)(m),
          w = r.forwardRef((e, t) => {
            let { scope: n, children: i, ...l } = e,
              f = r.useRef(null),
              s = (0, o.s)(t, f),
              c = u(m, n);
            return (
              r.useEffect(
                () => (
                  c.itemMap.set(f, { ref: f, ...l }),
                  () => void c.itemMap.delete(f)
                ),
              ),
              (0, a.jsx)(y, { ...{ [g]: "" }, ref: s, children: i })
            );
          });
        return (
          (w.displayName = m),
          [
            { Provider: c, Slot: h, ItemSlot: w },
            function (t) {
              let n = u(e + "CollectionConsumer", t);
              return r.useCallback(() => {
                let e = n.collectionRef.current;
                if (!e) return [];
                let t = Array.from(e.querySelectorAll(`[${g}]`));
                return Array.from(n.itemMap.values()).sort(
                  (e, n) => t.indexOf(e.ref.current) - t.indexOf(n.ref.current),
                );
              }, [n.collectionRef, n.itemMap]);
            },
            f,
          ]
        );
      }
      var s = new WeakMap();
      function u(e, t) {
        if ("at" in Array.prototype) return Array.prototype.at.call(e, t);
        let n = (function (e, t) {
          let n = e.length,
            r = c(t),
            i = r >= 0 ? r : n + r;
          return i < 0 || i >= n ? -1 : i;
        })(e, t);
        return -1 === n ? void 0 : e[n];
      }
      function c(e) {
        return e != e || 0 === e ? 0 : Math.trunc(e);
      }
    },
    61966: (e, t, n) => {
      n.d(t, {
        UE: () => Z,
        ll: () => I,
        rD: () => Q,
        UU: () => _,
        jD: () => X,
        ER: () => G,
        cY: () => U,
        BN: () => V,
        Ej: () => Y,
      });
      let r = ["top", "right", "bottom", "left"],
        i = Math.min,
        o = Math.max,
        l = Math.round,
        a = Math.floor,
        f = (e) => ({ x: e, y: e }),
        s = { left: "right", right: "left", bottom: "top", top: "bottom" },
        u = { start: "end", end: "start" };
      function c(e, t) {
        return "function" == typeof e ? e(t) : e;
      }
      function d(e) {
        return e.split("-")[0];
      }
      function p(e) {
        return e.split("-")[1];
      }
      function h(e) {
        return "x" === e ? "y" : "x";
      }
      function m(e) {
        return "y" === e ? "height" : "width";
      }
      function g(e) {
        return ["top", "bottom"].includes(d(e)) ? "y" : "x";
      }
      function y(e) {
        return e.replace(/start|end/g, (e) => u[e]);
      }
      function w(e) {
        return e.replace(/left|right|bottom|top/g, (e) => s[e]);
      }
      function x(e) {
        return "number" != typeof e
          ? { top: 0, right: 0, bottom: 0, left: 0, ...e }
          : { top: e, right: e, bottom: e, left: e };
      }
      function v(e) {
        let { x: t, y: n, width: r, height: i } = e;
        return {
          width: r,
          height: i,
          top: n,
          left: t,
          right: t + r,
          bottom: n + i,
          x: t,
          y: n,
        };
      }
      function b(e, t, n) {
        let r,
          { reference: i, floating: o } = e,
          l = g(t),
          a = h(g(t)),
          f = m(a),
          s = d(t),
          u = "y" === l,
          c = i.x + i.width / 2 - o.width / 2,
          y = i.y + i.height / 2 - o.height / 2,
          w = i[f] / 2 - o[f] / 2;
        switch (s) {
          case "top":
            r = { x: c, y: i.y - o.height };
            break;
          case "bottom":
            r = { x: c, y: i.y + i.height };
            break;
          case "right":
            r = { x: i.x + i.width, y: y };
            break;
          case "left":
            r = { x: i.x - o.width, y: y };
            break;
          default:
            r = { x: i.x, y: i.y };
        }
        switch (p(t)) {
          case "start":
            r[a] -= w * (n && u ? -1 : 1);
            break;
          case "end":
            r[a] += w * (n && u ? -1 : 1);
        }
        return r;
      }
      let R = async (e, t, n) => {
        let {
            placement: r = "bottom",
            strategy: i = "absolute",
            middleware: o = [],
            platform: l,
          } = n,
          a = o.filter(Boolean),
          f = await (null == l.isRTL ? void 0 : l.isRTL(t)),
          s = await l.getElementRects({
            reference: e,
            floating: t,
            strategy: i,
          }),
          { x: u, y: c } = b(s, r, f),
          d = r,
          p = {},
          h = 0;
        for (let n = 0; n < a.length; n++) {
          let { name: o, fn: m } = a[n],
            {
              x: g,
              y: y,
              data: w,
              reset: x,
            } = await m({
              x: u,
              y: c,
              initialPlacement: r,
              placement: d,
              strategy: i,
              middlewareData: p,
              rects: s,
              platform: l,
              elements: { reference: e, floating: t },
            });
          (u = null != g ? g : u),
            (c = null != y ? y : c),
            (p = { ...p, [o]: { ...p[o], ...w } }),
            x &&
              h <= 50 &&
              (h++,
              "object" == typeof x &&
                (x.placement && (d = x.placement),
                x.rects &&
                  (s =
                    !0 === x.rects
                      ? await l.getElementRects({
                          reference: e,
                          floating: t,
                          strategy: i,
                        })
                      : x.rects),
                ({ x: u, y: c } = b(s, d, f))),
              (n = -1));
        }
        return { x: u, y: c, placement: d, strategy: i, middlewareData: p };
      };
      async function A(e, t) {
        var n;
        void 0 === t && (t = {});
        let { x: r, y: i, platform: o, rects: l, elements: a, strategy: f } = e,
          {
            boundary: s = "clippingAncestors",
            rootBoundary: u = "viewport",
            elementContext: d = "floating",
            altBoundary: p = !1,
            padding: h = 0,
          } = c(t, e),
          m = x(h),
          g = a[p ? ("floating" === d ? "reference" : "floating") : d],
          y = v(
            await o.getClippingRect({
              element:
                null ==
                  (n = await (null == o.isElement ? void 0 : o.isElement(g))) ||
                n
                  ? g
                  : g.contextElement ||
                    (await (null == o.getDocumentElement
                      ? void 0
                      : o.getDocumentElement(a.floating))),
              boundary: s,
              rootBoundary: u,
              strategy: f,
            }),
          ),
          w =
            "floating" === d
              ? {
                  x: r,
                  y: i,
                  width: l.floating.width,
                  height: l.floating.height,
                }
              : l.reference,
          b = await (null == o.getOffsetParent
            ? void 0
            : o.getOffsetParent(a.floating)),
          R = ((await (null == o.isElement ? void 0 : o.isElement(b))) &&
            (await (null == o.getScale ? void 0 : o.getScale(b)))) || {
            x: 1,
            y: 1,
          },
          A = v(
            o.convertOffsetParentRelativeRectToViewportRelativeRect
              ? await o.convertOffsetParentRelativeRectToViewportRelativeRect({
                  elements: a,
                  rect: w,
                  offsetParent: b,
                  strategy: f,
                })
              : w,
          );
        return {
          top: (y.top - A.top + m.top) / R.y,
          bottom: (A.bottom - y.bottom + m.bottom) / R.y,
          left: (y.left - A.left + m.left) / R.x,
          right: (A.right - y.right + m.right) / R.x,
        };
      }
      function L(e, t) {
        return {
          top: e.top - t.height,
          right: e.right - t.width,
          bottom: e.bottom - t.height,
          left: e.left - t.width,
        };
      }
      function T(e) {
        return r.some((t) => e[t] >= 0);
      }
      async function C(e, t) {
        let { placement: n, platform: r, elements: i } = e,
          o = await (null == r.isRTL ? void 0 : r.isRTL(i.floating)),
          l = d(n),
          a = p(n),
          f = "y" === g(n),
          s = ["left", "top"].includes(l) ? -1 : 1,
          u = o && f ? -1 : 1,
          h = c(t, e),
          {
            mainAxis: m,
            crossAxis: y,
            alignmentAxis: w,
          } = "number" == typeof h
            ? { mainAxis: h, crossAxis: 0, alignmentAxis: null }
            : {
                mainAxis: h.mainAxis || 0,
                crossAxis: h.crossAxis || 0,
                alignmentAxis: h.alignmentAxis,
              };
        return (
          a && "number" == typeof w && (y = "end" === a ? -1 * w : w),
          f ? { x: y * u, y: m * s } : { x: m * s, y: y * u }
        );
      }
      var E = n(83850);
      function S(e) {
        let t = (0, E.L9)(e),
          n = parseFloat(t.width) || 0,
          r = parseFloat(t.height) || 0,
          i = (0, E.sb)(e),
          o = i ? e.offsetWidth : n,
          a = i ? e.offsetHeight : r,
          f = l(n) !== o || l(r) !== a;
        return f && ((n = o), (r = a)), { width: n, height: r, $: f };
      }
      function P(e) {
        return (0, E.vq)(e) ? e : e.contextElement;
      }
      function O(e) {
        let t = P(e);
        if (!(0, E.sb)(t)) return f(1);
        let n = t.getBoundingClientRect(),
          { width: r, height: i, $: o } = S(t),
          a = (o ? l(n.width) : n.width) / r,
          s = (o ? l(n.height) : n.height) / i;
        return (
          (a && Number.isFinite(a)) || (a = 1),
          (s && Number.isFinite(s)) || (s = 1),
          { x: a, y: s }
        );
      }
      let k = f(0);
      function D(e) {
        let t = (0, E.zk)(e);
        return (0, E.Tc)() && t.visualViewport
          ? { x: t.visualViewport.offsetLeft, y: t.visualViewport.offsetTop }
          : k;
      }
      function M(e, t, n, r) {
        var i;
        void 0 === t && (t = !1), void 0 === n && (n = !1);
        let o = e.getBoundingClientRect(),
          l = P(e),
          a = f(1);
        t && (r ? (0, E.vq)(r) && (a = O(r)) : (a = O(e)));
        let s = (void 0 === (i = n) && (i = !1),
          r && (!i || r === (0, E.zk)(l)) && i)
            ? D(l)
            : f(0),
          u = (o.left + s.x) / a.x,
          c = (o.top + s.y) / a.y,
          d = o.width / a.x,
          p = o.height / a.y;
        if (l) {
          let e = (0, E.zk)(l),
            t = r && (0, E.vq)(r) ? (0, E.zk)(r) : r,
            n = e,
            i = (0, E._m)(n);
          for (; i && r && t !== n; ) {
            let e = O(i),
              t = i.getBoundingClientRect(),
              r = (0, E.L9)(i),
              o = t.left + (i.clientLeft + parseFloat(r.paddingLeft)) * e.x,
              l = t.top + (i.clientTop + parseFloat(r.paddingTop)) * e.y;
            (u *= e.x),
              (c *= e.y),
              (d *= e.x),
              (p *= e.y),
              (u += o),
              (c += l),
              (n = (0, E.zk)(i)),
              (i = (0, E._m)(n));
          }
        }
        return v({ width: d, height: p, x: u, y: c });
      }
      function j(e, t) {
        let n = (0, E.CP)(e).scrollLeft;
        return t ? t.left + n : M((0, E.ep)(e)).left + n;
      }
      function H(e, t, n) {
        void 0 === n && (n = !1);
        let r = e.getBoundingClientRect();
        return {
          x: r.left + t.scrollLeft - (n ? 0 : j(e, r)),
          y: r.top + t.scrollTop,
        };
      }
      function z(e, t, n) {
        let r;
        if ("viewport" === t)
          r = (function (e, t) {
            let n = (0, E.zk)(e),
              r = (0, E.ep)(e),
              i = n.visualViewport,
              o = r.clientWidth,
              l = r.clientHeight,
              a = 0,
              f = 0;
            if (i) {
              (o = i.width), (l = i.height);
              let e = (0, E.Tc)();
              (!e || (e && "fixed" === t)) &&
                ((a = i.offsetLeft), (f = i.offsetTop));
            }
            return { width: o, height: l, x: a, y: f };
          })(e, n);
        else if ("document" === t)
          r = (function (e) {
            let t = (0, E.ep)(e),
              n = (0, E.CP)(e),
              r = e.ownerDocument.body,
              i = o(t.scrollWidth, t.clientWidth, r.scrollWidth, r.clientWidth),
              l = o(
                t.scrollHeight,
                t.clientHeight,
                r.scrollHeight,
                r.clientHeight,
              ),
              a = -n.scrollLeft + j(e),
              f = -n.scrollTop;
            return (
              "rtl" === (0, E.L9)(r).direction &&
                (a += o(t.clientWidth, r.clientWidth) - i),
              { width: i, height: l, x: a, y: f }
            );
          })((0, E.ep)(e));
        else if ((0, E.vq)(t))
          r = (function (e, t) {
            let n = M(e, !0, "fixed" === t),
              r = n.top + e.clientTop,
              i = n.left + e.clientLeft,
              o = (0, E.sb)(e) ? O(e) : f(1),
              l = e.clientWidth * o.x,
              a = e.clientHeight * o.y;
            return { width: l, height: a, x: i * o.x, y: r * o.y };
          })(t, n);
        else {
          let n = D(e);
          r = { x: t.x - n.x, y: t.y - n.y, width: t.width, height: t.height };
        }
        return v(r);
      }
      function $(e) {
        return "static" === (0, E.L9)(e).position;
      }
      function N(e, t) {
        if (!(0, E.sb)(e) || "fixed" === (0, E.L9)(e).position) return null;
        if (t) return t(e);
        let n = e.offsetParent;
        return (0, E.ep)(e) === n && (n = n.ownerDocument.body), n;
      }
      function q(e, t) {
        let n = (0, E.zk)(e);
        if ((0, E.Tf)(e)) return n;
        if (!(0, E.sb)(e)) {
          let t = (0, E.$4)(e);
          for (; t && !(0, E.eu)(t); ) {
            if ((0, E.vq)(t) && !$(t)) return t;
            t = (0, E.$4)(t);
          }
          return n;
        }
        let r = N(e, t);
        for (; r && (0, E.Lv)(r) && $(r); ) r = N(r, t);
        return r && (0, E.eu)(r) && $(r) && !(0, E.sQ)(r)
          ? n
          : r || (0, E.gJ)(e) || n;
      }
      let F = async function (e) {
          let t = this.getOffsetParent || q,
            n = this.getDimensions,
            r = await n(e.floating);
          return {
            reference: (function (e, t, n) {
              let r = (0, E.sb)(t),
                i = (0, E.ep)(t),
                o = "fixed" === n,
                l = M(e, !0, o, t),
                a = { scrollLeft: 0, scrollTop: 0 },
                s = f(0);
              if (r || (!r && !o))
                if (
                  (("body" !== (0, E.mq)(t) || (0, E.ZU)(i)) &&
                    (a = (0, E.CP)(t)),
                  r)
                ) {
                  let e = M(t, !0, o, t);
                  (s.x = e.x + t.clientLeft), (s.y = e.y + t.clientTop);
                } else i && (s.x = j(i));
              o && !r && i && (s.x = j(i));
              let u = !i || r || o ? f(0) : H(i, a);
              return {
                x: l.left + a.scrollLeft - s.x - u.x,
                y: l.top + a.scrollTop - s.y - u.y,
                width: l.width,
                height: l.height,
              };
            })(e.reference, await t(e.floating), e.strategy),
            floating: { x: 0, y: 0, width: r.width, height: r.height },
          };
        },
        W = {
          convertOffsetParentRelativeRectToViewportRelativeRect: function (e) {
            let { elements: t, rect: n, offsetParent: r, strategy: i } = e,
              o = "fixed" === i,
              l = (0, E.ep)(r),
              a = !!t && (0, E.Tf)(t.floating);
            if (r === l || (a && o)) return n;
            let s = { scrollLeft: 0, scrollTop: 0 },
              u = f(1),
              c = f(0),
              d = (0, E.sb)(r);
            if (
              (d || (!d && !o)) &&
              (("body" !== (0, E.mq)(r) || (0, E.ZU)(l)) && (s = (0, E.CP)(r)),
              (0, E.sb)(r))
            ) {
              let e = M(r);
              (u = O(r)), (c.x = e.x + r.clientLeft), (c.y = e.y + r.clientTop);
            }
            let p = !l || d || o ? f(0) : H(l, s, !0);
            return {
              width: n.width * u.x,
              height: n.height * u.y,
              x: n.x * u.x - s.scrollLeft * u.x + c.x + p.x,
              y: n.y * u.y - s.scrollTop * u.y + c.y + p.y,
            };
          },
          getDocumentElement: E.ep,
          getClippingRect: function (e) {
            let { element: t, boundary: n, rootBoundary: r, strategy: l } = e,
              a = [
                ...("clippingAncestors" === n
                  ? (0, E.Tf)(t)
                    ? []
                    : (function (e, t) {
                        let n = t.get(e);
                        if (n) return n;
                        let r = (0, E.v9)(e, [], !1).filter(
                            (e) => (0, E.vq)(e) && "body" !== (0, E.mq)(e),
                          ),
                          i = null,
                          o = "fixed" === (0, E.L9)(e).position,
                          l = o ? (0, E.$4)(e) : e;
                        for (; (0, E.vq)(l) && !(0, E.eu)(l); ) {
                          let t = (0, E.L9)(l),
                            n = (0, E.sQ)(l);
                          n || "fixed" !== t.position || (i = null),
                            (
                              o
                                ? !n && !i
                                : (!n &&
                                    "static" === t.position &&
                                    !!i &&
                                    ["absolute", "fixed"].includes(
                                      i.position,
                                    )) ||
                                  ((0, E.ZU)(l) &&
                                    !n &&
                                    (function e(t, n) {
                                      let r = (0, E.$4)(t);
                                      return (
                                        !(
                                          r === n ||
                                          !(0, E.vq)(r) ||
                                          (0, E.eu)(r)
                                        ) &&
                                        ("fixed" === (0, E.L9)(r).position ||
                                          e(r, n))
                                      );
                                    })(e, l))
                            )
                              ? (r = r.filter((e) => e !== l))
                              : (i = t),
                            (l = (0, E.$4)(l));
                        }
                        return t.set(e, r), r;
                      })(t, this._c)
                  : [].concat(n)),
                r,
              ],
              f = a[0],
              s = a.reduce(
                (e, n) => {
                  let r = z(t, n, l);
                  return (
                    (e.top = o(r.top, e.top)),
                    (e.right = i(r.right, e.right)),
                    (e.bottom = i(r.bottom, e.bottom)),
                    (e.left = o(r.left, e.left)),
                    e
                  );
                },
                z(t, f, l),
              );
            return {
              width: s.right - s.left,
              height: s.bottom - s.top,
              x: s.left,
              y: s.top,
            };
          },
          getOffsetParent: q,
          getElementRects: F,
          getClientRects: function (e) {
            return Array.from(e.getClientRects());
          },
          getDimensions: function (e) {
            let { width: t, height: n } = S(e);
            return { width: t, height: n };
          },
          getScale: O,
          isElement: E.vq,
          isRTL: function (e) {
            return "rtl" === (0, E.L9)(e).direction;
          },
        };
      function B(e, t) {
        return (
          e.x === t.x &&
          e.y === t.y &&
          e.width === t.width &&
          e.height === t.height
        );
      }
      function I(e, t, n, r) {
        let l;
        void 0 === r && (r = {});
        let {
            ancestorScroll: f = !0,
            ancestorResize: s = !0,
            elementResize: u = "function" == typeof ResizeObserver,
            layoutShift: c = "function" == typeof IntersectionObserver,
            animationFrame: d = !1,
          } = r,
          p = P(e),
          h = f || s ? [...(p ? (0, E.v9)(p) : []), ...(0, E.v9)(t)] : [];
        h.forEach((e) => {
          f && e.addEventListener("scroll", n, { passive: !0 }),
            s && e.addEventListener("resize", n);
        });
        let m =
            p && c
              ? (function (e, t) {
                  let n,
                    r = null,
                    l = (0, E.ep)(e);
                  function f() {
                    var e;
                    clearTimeout(n),
                      null == (e = r) || e.disconnect(),
                      (r = null);
                  }
                  return (
                    !(function s(u, c) {
                      void 0 === u && (u = !1), void 0 === c && (c = 1), f();
                      let d = e.getBoundingClientRect(),
                        { left: p, top: h, width: m, height: g } = d;
                      if ((u || t(), !m || !g)) return;
                      let y = a(h),
                        w = a(l.clientWidth - (p + m)),
                        x = {
                          rootMargin:
                            -y +
                            "px " +
                            -w +
                            "px " +
                            -a(l.clientHeight - (h + g)) +
                            "px " +
                            -a(p) +
                            "px",
                          threshold: o(0, i(1, c)) || 1,
                        },
                        v = !0;
                      function b(t) {
                        let r = t[0].intersectionRatio;
                        if (r !== c) {
                          if (!v) return s();
                          r
                            ? s(!1, r)
                            : (n = setTimeout(() => {
                                s(!1, 1e-7);
                              }, 1e3));
                        }
                        1 !== r || B(d, e.getBoundingClientRect()) || s(),
                          (v = !1);
                      }
                      try {
                        r = new IntersectionObserver(b, {
                          ...x,
                          root: l.ownerDocument,
                        });
                      } catch (e) {
                        r = new IntersectionObserver(b, x);
                      }
                      r.observe(e);
                    })(!0),
                    f
                  );
                })(p, n)
              : null,
          g = -1,
          y = null;
        u &&
          ((y = new ResizeObserver((e) => {
            let [r] = e;
            r &&
              r.target === p &&
              y &&
              (y.unobserve(t),
              cancelAnimationFrame(g),
              (g = requestAnimationFrame(() => {
                var e;
                null == (e = y) || e.observe(t);
              }))),
              n();
          })),
          p && !d && y.observe(p),
          y.observe(t));
        let w = d ? M(e) : null;
        return (
          d &&
            (function t() {
              let r = M(e);
              w && !B(w, r) && n(), (w = r), (l = requestAnimationFrame(t));
            })(),
          n(),
          () => {
            var e;
            h.forEach((e) => {
              f && e.removeEventListener("scroll", n),
                s && e.removeEventListener("resize", n);
            }),
              null == m || m(),
              null == (e = y) || e.disconnect(),
              (y = null),
              d && cancelAnimationFrame(l);
          }
        );
      }
      let U = function (e) {
          return (
            void 0 === e && (e = 0),
            {
              name: "offset",
              options: e,
              async fn(t) {
                var n, r;
                let { x: i, y: o, placement: l, middlewareData: a } = t,
                  f = await C(t, e);
                return l === (null == (n = a.offset) ? void 0 : n.placement) &&
                  null != (r = a.arrow) &&
                  r.alignmentOffset
                  ? {}
                  : { x: i + f.x, y: o + f.y, data: { ...f, placement: l } };
              },
            }
          );
        },
        V = function (e) {
          return (
            void 0 === e && (e = {}),
            {
              name: "shift",
              options: e,
              async fn(t) {
                let { x: n, y: r, placement: l } = t,
                  {
                    mainAxis: a = !0,
                    crossAxis: f = !1,
                    limiter: s = {
                      fn: (e) => {
                        let { x: t, y: n } = e;
                        return { x: t, y: n };
                      },
                    },
                    ...u
                  } = c(e, t),
                  p = { x: n, y: r },
                  m = await A(t, u),
                  y = g(d(l)),
                  w = h(y),
                  x = p[w],
                  v = p[y];
                if (a) {
                  let e = "y" === w ? "top" : "left",
                    t = "y" === w ? "bottom" : "right",
                    n = x + m[e],
                    r = x - m[t];
                  x = o(n, i(x, r));
                }
                if (f) {
                  let e = "y" === y ? "top" : "left",
                    t = "y" === y ? "bottom" : "right",
                    n = v + m[e],
                    r = v - m[t];
                  v = o(n, i(v, r));
                }
                let b = s.fn({ ...t, [w]: x, [y]: v });
                return {
                  ...b,
                  data: { x: b.x - n, y: b.y - r, enabled: { [w]: a, [y]: f } },
                };
              },
            }
          );
        },
        _ = function (e) {
          return (
            void 0 === e && (e = {}),
            {
              name: "flip",
              options: e,
              async fn(t) {
                var n, r, i, o, l;
                let {
                    placement: a,
                    middlewareData: f,
                    rects: s,
                    initialPlacement: u,
                    platform: x,
                    elements: v,
                  } = t,
                  {
                    mainAxis: b = !0,
                    crossAxis: R = !0,
                    fallbackPlacements: L,
                    fallbackStrategy: T = "bestFit",
                    fallbackAxisSideDirection: C = "none",
                    flipAlignment: E = !0,
                    ...S
                  } = c(e, t);
                if (null != (n = f.arrow) && n.alignmentOffset) return {};
                let P = d(a),
                  O = g(u),
                  k = d(u) === u,
                  D = await (null == x.isRTL ? void 0 : x.isRTL(v.floating)),
                  M =
                    L ||
                    (k || !E
                      ? [w(u)]
                      : (function (e) {
                          let t = w(e);
                          return [y(e), t, y(t)];
                        })(u)),
                  j = "none" !== C;
                !L &&
                  j &&
                  M.push(
                    ...(function (e, t, n, r) {
                      let i = p(e),
                        o = (function (e, t, n) {
                          let r = ["left", "right"],
                            i = ["right", "left"];
                          switch (e) {
                            case "top":
                            case "bottom":
                              if (n) return t ? i : r;
                              return t ? r : i;
                            case "left":
                            case "right":
                              return t ? ["top", "bottom"] : ["bottom", "top"];
                            default:
                              return [];
                          }
                        })(d(e), "start" === n, r);
                      return (
                        i &&
                          ((o = o.map((e) => e + "-" + i)),
                          t && (o = o.concat(o.map(y)))),
                        o
                      );
                    })(u, E, C, D),
                  );
                let H = [u, ...M],
                  z = await A(t, S),
                  $ = [],
                  N = (null == (r = f.flip) ? void 0 : r.overflows) || [];
                if ((b && $.push(z[P]), R)) {
                  let e = (function (e, t, n) {
                    void 0 === n && (n = !1);
                    let r = p(e),
                      i = h(g(e)),
                      o = m(i),
                      l =
                        "x" === i
                          ? r === (n ? "end" : "start")
                            ? "right"
                            : "left"
                          : "start" === r
                            ? "bottom"
                            : "top";
                    return (
                      t.reference[o] > t.floating[o] && (l = w(l)), [l, w(l)]
                    );
                  })(a, s, D);
                  $.push(z[e[0]], z[e[1]]);
                }
                if (
                  ((N = [...N, { placement: a, overflows: $ }]),
                  !$.every((e) => e <= 0))
                ) {
                  let e = ((null == (i = f.flip) ? void 0 : i.index) || 0) + 1,
                    t = H[e];
                  if (
                    t &&
                    ("alignment" !== R ||
                      O === g(t) ||
                      N.every(
                        (e) => e.overflows[0] > 0 && g(e.placement) === O,
                      ))
                  )
                    return {
                      data: { index: e, overflows: N },
                      reset: { placement: t },
                    };
                  let n =
                    null ==
                    (o = N.filter((e) => e.overflows[0] <= 0).sort(
                      (e, t) => e.overflows[1] - t.overflows[1],
                    )[0])
                      ? void 0
                      : o.placement;
                  if (!n)
                    switch (T) {
                      case "bestFit": {
                        let e =
                          null ==
                          (l = N.filter((e) => {
                            if (j) {
                              let t = g(e.placement);
                              return t === O || "y" === t;
                            }
                            return !0;
                          })
                            .map((e) => [
                              e.placement,
                              e.overflows
                                .filter((e) => e > 0)
                                .reduce((e, t) => e + t, 0),
                            ])
                            .sort((e, t) => e[1] - t[1])[0])
                            ? void 0
                            : l[0];
                        e && (n = e);
                        break;
                      }
                      case "initialPlacement":
                        n = u;
                    }
                  if (a !== n) return { reset: { placement: n } };
                }
                return {};
              },
            }
          );
        },
        Y = function (e) {
          return (
            void 0 === e && (e = {}),
            {
              name: "size",
              options: e,
              async fn(t) {
                var n, r;
                let l,
                  a,
                  { placement: f, rects: s, platform: u, elements: h } = t,
                  { apply: m = () => {}, ...y } = c(e, t),
                  w = await A(t, y),
                  x = d(f),
                  v = p(f),
                  b = "y" === g(f),
                  { width: R, height: L } = s.floating;
                "top" === x || "bottom" === x
                  ? ((l = x),
                    (a =
                      v ===
                      ((await (null == u.isRTL ? void 0 : u.isRTL(h.floating)))
                        ? "start"
                        : "end")
                        ? "left"
                        : "right"))
                  : ((a = x), (l = "end" === v ? "top" : "bottom"));
                let T = L - w.top - w.bottom,
                  C = R - w.left - w.right,
                  E = i(L - w[l], T),
                  S = i(R - w[a], C),
                  P = !t.middlewareData.shift,
                  O = E,
                  k = S;
                if (
                  (null != (n = t.middlewareData.shift) &&
                    n.enabled.x &&
                    (k = C),
                  null != (r = t.middlewareData.shift) &&
                    r.enabled.y &&
                    (O = T),
                  P && !v)
                ) {
                  let e = o(w.left, 0),
                    t = o(w.right, 0),
                    n = o(w.top, 0),
                    r = o(w.bottom, 0);
                  b
                    ? (k =
                        R -
                        2 * (0 !== e || 0 !== t ? e + t : o(w.left, w.right)))
                    : (O =
                        L -
                        2 * (0 !== n || 0 !== r ? n + r : o(w.top, w.bottom)));
                }
                await m({ ...t, availableWidth: k, availableHeight: O });
                let D = await u.getDimensions(h.floating);
                return R !== D.width || L !== D.height
                  ? { reset: { rects: !0 } }
                  : {};
              },
            }
          );
        },
        X = function (e) {
          return (
            void 0 === e && (e = {}),
            {
              name: "hide",
              options: e,
              async fn(t) {
                let { rects: n } = t,
                  { strategy: r = "referenceHidden", ...i } = c(e, t);
                switch (r) {
                  case "referenceHidden": {
                    let e = L(
                      await A(t, { ...i, elementContext: "reference" }),
                      n.reference,
                    );
                    return {
                      data: {
                        referenceHiddenOffsets: e,
                        referenceHidden: T(e),
                      },
                    };
                  }
                  case "escaped": {
                    let e = L(
                      await A(t, { ...i, altBoundary: !0 }),
                      n.floating,
                    );
                    return { data: { escapedOffsets: e, escaped: T(e) } };
                  }
                  default:
                    return {};
                }
              },
            }
          );
        },
        Z = (e) => ({
          name: "arrow",
          options: e,
          async fn(t) {
            let {
                x: n,
                y: r,
                placement: l,
                rects: a,
                platform: f,
                elements: s,
                middlewareData: u,
              } = t,
              { element: d, padding: y = 0 } = c(e, t) || {};
            if (null == d) return {};
            let w = x(y),
              v = { x: n, y: r },
              b = h(g(l)),
              R = m(b),
              A = await f.getDimensions(d),
              L = "y" === b,
              T = L ? "clientHeight" : "clientWidth",
              C = a.reference[R] + a.reference[b] - v[b] - a.floating[R],
              E = v[b] - a.reference[b],
              S = await (null == f.getOffsetParent
                ? void 0
                : f.getOffsetParent(d)),
              P = S ? S[T] : 0;
            (P && (await (null == f.isElement ? void 0 : f.isElement(S)))) ||
              (P = s.floating[T] || a.floating[R]);
            let O = P / 2 - A[R] / 2 - 1,
              k = i(w[L ? "top" : "left"], O),
              D = i(w[L ? "bottom" : "right"], O),
              M = P - A[R] - D,
              j = P / 2 - A[R] / 2 + (C / 2 - E / 2),
              H = o(k, i(j, M)),
              z =
                !u.arrow &&
                null != p(l) &&
                j !== H &&
                a.reference[R] / 2 - (j < k ? k : D) - A[R] / 2 < 0,
              $ = z ? (j < k ? j - k : j - M) : 0;
            return {
              [b]: v[b] + $,
              data: {
                [b]: H,
                centerOffset: j - H - $,
                ...(z && { alignmentOffset: $ }),
              },
              reset: z,
            };
          },
        }),
        G = function (e) {
          return (
            void 0 === e && (e = {}),
            {
              options: e,
              fn(t) {
                let {
                    x: n,
                    y: r,
                    placement: i,
                    rects: o,
                    middlewareData: l,
                  } = t,
                  {
                    offset: a = 0,
                    mainAxis: f = !0,
                    crossAxis: s = !0,
                  } = c(e, t),
                  u = { x: n, y: r },
                  p = g(i),
                  m = h(p),
                  y = u[m],
                  w = u[p],
                  x = c(a, t),
                  v =
                    "number" == typeof x
                      ? { mainAxis: x, crossAxis: 0 }
                      : { mainAxis: 0, crossAxis: 0, ...x };
                if (f) {
                  let e = "y" === m ? "height" : "width",
                    t = o.reference[m] - o.floating[e] + v.mainAxis,
                    n = o.reference[m] + o.reference[e] - v.mainAxis;
                  y < t ? (y = t) : y > n && (y = n);
                }
                if (s) {
                  var b, R;
                  let e = "y" === m ? "width" : "height",
                    t = ["top", "left"].includes(d(i)),
                    n =
                      o.reference[p] -
                      o.floating[e] +
                      ((t && (null == (b = l.offset) ? void 0 : b[p])) || 0) +
                      (t ? 0 : v.crossAxis),
                    r =
                      o.reference[p] +
                      o.reference[e] +
                      (t ? 0 : (null == (R = l.offset) ? void 0 : R[p]) || 0) -
                      (t ? v.crossAxis : 0);
                  w < n ? (w = n) : w > r && (w = r);
                }
                return { [m]: y, [p]: w };
              },
            }
          );
        },
        Q = (e, t, n) => {
          let r = new Map(),
            i = { platform: W, ...n },
            o = { ...i.platform, _c: r };
          return R(e, t, { ...i, platform: o });
        };
    },
    68476: (e, t, n) => {
      n.d(t, { jH: () => o });
      var r = n(84205);
      n(61268);
      var i = r.createContext(void 0);
      function o(e) {
        let t = r.useContext(i);
        return e || t || "ltr";
      }
    },
    80434: (e, t, n) => {
      n.d(t, {
        Mz: () => V,
        i3: () => Y,
        UC: () => _,
        bL: () => U,
        Bk: () => S,
      });
      var r = n(84205),
        i = n(61966),
        o = n(90304),
        l = "undefined" != typeof document ? r.useLayoutEffect : function () {};
      function a(e, t) {
        let n, r, i;
        if (e === t) return !0;
        if (typeof e != typeof t) return !1;
        if ("function" == typeof e && e.toString() === t.toString()) return !0;
        if (e && t && "object" == typeof e) {
          if (Array.isArray(e)) {
            if ((n = e.length) !== t.length) return !1;
            for (r = n; 0 != r--; ) if (!a(e[r], t[r])) return !1;
            return !0;
          }
          if ((n = (i = Object.keys(e)).length) !== Object.keys(t).length)
            return !1;
          for (r = n; 0 != r--; )
            if (!{}.hasOwnProperty.call(t, i[r])) return !1;
          for (r = n; 0 != r--; ) {
            let n = i[r];
            if (("_owner" !== n || !e.$$typeof) && !a(e[n], t[n])) return !1;
          }
          return !0;
        }
        return e != e && t != t;
      }
      function f(e) {
        return "undefined" == typeof window
          ? 1
          : (e.ownerDocument.defaultView || window).devicePixelRatio || 1;
      }
      function s(e, t) {
        let n = f(e);
        return Math.round(t * n) / n;
      }
      function u(e) {
        let t = r.useRef(e);
        return (
          l(() => {
            t.current = e;
          }),
          t
        );
      }
      let c = (e) => ({
          name: "arrow",
          options: e,
          fn(t) {
            let { element: n, padding: r } = "function" == typeof e ? e(t) : e;
            return n && {}.hasOwnProperty.call(n, "current")
              ? null != n.current
                ? (0, i.UE)({ element: n.current, padding: r }).fn(t)
                : {}
              : n
                ? (0, i.UE)({ element: n, padding: r }).fn(t)
                : {};
          },
        }),
        d = (e, t) => ({ ...(0, i.cY)(e), options: [e, t] }),
        p = (e, t) => ({ ...(0, i.BN)(e), options: [e, t] }),
        h = (e, t) => ({ ...(0, i.ER)(e), options: [e, t] }),
        m = (e, t) => ({ ...(0, i.UU)(e), options: [e, t] }),
        g = (e, t) => ({ ...(0, i.Ej)(e), options: [e, t] }),
        y = (e, t) => ({ ...(0, i.jD)(e), options: [e, t] }),
        w = (e, t) => ({ ...c(e), options: [e, t] });
      var x = n(56558),
        v = n(61268),
        b = r.forwardRef((e, t) => {
          let { children: n, width: r = 10, height: i = 5, ...o } = e;
          return (0, v.jsx)(x.sG.svg, {
            ...o,
            ref: t,
            width: r,
            height: i,
            viewBox: "0 0 30 10",
            preserveAspectRatio: "none",
            children: e.asChild
              ? n
              : (0, v.jsx)("polygon", { points: "0,0 30,0 15,10" }),
          });
        });
      b.displayName = "Arrow";
      var R = n(79744),
        A = n(14072),
        L = n(21899),
        T = n(37155),
        C = "Popper",
        [E, S] = (0, A.A)(C),
        [P, O] = E(C),
        k = (e) => {
          let { __scopePopper: t, children: n } = e,
            [i, o] = r.useState(null);
          return (0, v.jsx)(P, {
            scope: t,
            anchor: i,
            onAnchorChange: o,
            children: n,
          });
        };
      k.displayName = C;
      var D = "PopperAnchor",
        M = r.forwardRef((e, t) => {
          let { __scopePopper: n, virtualRef: i, ...o } = e,
            l = O(D, n),
            a = r.useRef(null),
            f = (0, R.s)(t, a);
          return (
            r.useEffect(() => {
              l.onAnchorChange(i?.current || a.current);
            }),
            i ? null : (0, v.jsx)(x.sG.div, { ...o, ref: f })
          );
        });
      M.displayName = D;
      var j = "PopperContent",
        [H, z] = E(j),
        $ = r.forwardRef((e, t) => {
          let {
              __scopePopper: n,
              side: c = "bottom",
              sideOffset: b = 0,
              align: A = "center",
              alignOffset: C = 0,
              arrowPadding: E = 0,
              avoidCollisions: S = !0,
              collisionBoundary: P = [],
              collisionPadding: k = 0,
              sticky: D = "partial",
              hideWhenDetached: M = !1,
              updatePositionStrategy: z = "optimized",
              onPlaced: $,
              ...N
            } = e,
            q = O(j, n),
            [F, U] = r.useState(null),
            V = (0, R.s)(t, (e) => U(e)),
            [_, Y] = r.useState(null),
            X = (function (e) {
              let [t, n] = r.useState(void 0);
              return (
                (0, T.N)(() => {
                  if (e) {
                    n({ width: e.offsetWidth, height: e.offsetHeight });
                    let t = new ResizeObserver((t) => {
                      let r, i;
                      if (!Array.isArray(t) || !t.length) return;
                      let o = t[0];
                      if ("borderBoxSize" in o) {
                        let e = o.borderBoxSize,
                          t = Array.isArray(e) ? e[0] : e;
                        (r = t.inlineSize), (i = t.blockSize);
                      } else (r = e.offsetWidth), (i = e.offsetHeight);
                      n({ width: r, height: i });
                    });
                    return (
                      t.observe(e, { box: "border-box" }), () => t.unobserve(e)
                    );
                  }
                  n(void 0);
                }, [e]),
                t
              );
            })(_),
            Z = X?.width ?? 0,
            G = X?.height ?? 0,
            Q =
              "number" == typeof k
                ? k
                : { top: 0, right: 0, bottom: 0, left: 0, ...k },
            J = Array.isArray(P) ? P : [P],
            K = J.length > 0,
            ee = { padding: Q, boundary: J.filter(W), altBoundary: K },
            {
              refs: et,
              floatingStyles: en,
              placement: er,
              isPositioned: ei,
              middlewareData: eo,
            } = (function (e) {
              void 0 === e && (e = {});
              let {
                  placement: t = "bottom",
                  strategy: n = "absolute",
                  middleware: c = [],
                  platform: d,
                  elements: { reference: p, floating: h } = {},
                  transform: m = !0,
                  whileElementsMounted: g,
                  open: y,
                } = e,
                [w, x] = r.useState({
                  x: 0,
                  y: 0,
                  strategy: n,
                  placement: t,
                  middlewareData: {},
                  isPositioned: !1,
                }),
                [v, b] = r.useState(c);
              a(v, c) || b(c);
              let [R, A] = r.useState(null),
                [L, T] = r.useState(null),
                C = r.useCallback((e) => {
                  e !== O.current && ((O.current = e), A(e));
                }, []),
                E = r.useCallback((e) => {
                  e !== k.current && ((k.current = e), T(e));
                }, []),
                S = p || R,
                P = h || L,
                O = r.useRef(null),
                k = r.useRef(null),
                D = r.useRef(w),
                M = null != g,
                j = u(g),
                H = u(d),
                z = u(y),
                $ = r.useCallback(() => {
                  if (!O.current || !k.current) return;
                  let e = { placement: t, strategy: n, middleware: v };
                  H.current && (e.platform = H.current),
                    (0, i.rD)(O.current, k.current, e).then((e) => {
                      let t = { ...e, isPositioned: !1 !== z.current };
                      N.current &&
                        !a(D.current, t) &&
                        ((D.current = t),
                        o.flushSync(() => {
                          x(t);
                        }));
                    });
                }, [v, t, n, H, z]);
              l(() => {
                !1 === y &&
                  D.current.isPositioned &&
                  ((D.current.isPositioned = !1),
                  x((e) => ({ ...e, isPositioned: !1 })));
              }, [y]);
              let N = r.useRef(!1);
              l(
                () => (
                  (N.current = !0),
                  () => {
                    N.current = !1;
                  }
                ),
                [],
              ),
                l(() => {
                  if ((S && (O.current = S), P && (k.current = P), S && P)) {
                    if (j.current) return j.current(S, P, $);
                    $();
                  }
                }, [S, P, $, j, M]);
              let q = r.useMemo(
                  () => ({
                    reference: O,
                    floating: k,
                    setReference: C,
                    setFloating: E,
                  }),
                  [C, E],
                ),
                F = r.useMemo(() => ({ reference: S, floating: P }), [S, P]),
                W = r.useMemo(() => {
                  let e = { position: n, left: 0, top: 0 };
                  if (!F.floating) return e;
                  let t = s(F.floating, w.x),
                    r = s(F.floating, w.y);
                  return m
                    ? {
                        ...e,
                        transform: "translate(" + t + "px, " + r + "px)",
                        ...(f(F.floating) >= 1.5 && {
                          willChange: "transform",
                        }),
                      }
                    : { position: n, left: t, top: r };
                }, [n, m, F.floating, w.x, w.y]);
              return r.useMemo(
                () => ({
                  ...w,
                  update: $,
                  refs: q,
                  elements: F,
                  floatingStyles: W,
                }),
                [w, $, q, F, W],
              );
            })({
              strategy: "fixed",
              placement: c + ("center" !== A ? "-" + A : ""),
              whileElementsMounted: (...e) =>
                (0, i.ll)(...e, { animationFrame: "always" === z }),
              elements: { reference: q.anchor },
              middleware: [
                d({ mainAxis: b + G, alignmentAxis: C }),
                S &&
                  p({
                    mainAxis: !0,
                    crossAxis: !1,
                    limiter: "partial" === D ? h() : void 0,
                    ...ee,
                  }),
                S && m({ ...ee }),
                g({
                  ...ee,
                  apply: ({
                    elements: e,
                    rects: t,
                    availableWidth: n,
                    availableHeight: r,
                  }) => {
                    let { width: i, height: o } = t.reference,
                      l = e.floating.style;
                    l.setProperty("--radix-popper-available-width", `${n}px`),
                      l.setProperty(
                        "--radix-popper-available-height",
                        `${r}px`,
                      ),
                      l.setProperty("--radix-popper-anchor-width", `${i}px`),
                      l.setProperty("--radix-popper-anchor-height", `${o}px`);
                  },
                }),
                _ && w({ element: _, padding: E }),
                B({ arrowWidth: Z, arrowHeight: G }),
                M && y({ strategy: "referenceHidden", ...ee }),
              ],
            }),
            [el, ea] = I(er),
            ef = (0, L.c)($);
          (0, T.N)(() => {
            ei && ef?.();
          }, [ei, ef]);
          let es = eo.arrow?.x,
            eu = eo.arrow?.y,
            ec = eo.arrow?.centerOffset !== 0,
            [ed, ep] = r.useState();
          return (
            (0, T.N)(() => {
              F && ep(window.getComputedStyle(F).zIndex);
            }, [F]),
            (0, v.jsx)("div", {
              ref: et.setFloating,
              "data-radix-popper-content-wrapper": "",
              style: {
                ...en,
                transform: ei ? en.transform : "translate(0, -200%)",
                minWidth: "max-content",
                zIndex: ed,
                "--radix-popper-transform-origin": [
                  eo.transformOrigin?.x,
                  eo.transformOrigin?.y,
                ].join(" "),
                ...(eo.hide?.referenceHidden && {
                  visibility: "hidden",
                  pointerEvents: "none",
                }),
              },
              dir: e.dir,
              children: (0, v.jsx)(H, {
                scope: n,
                placedSide: el,
                onArrowChange: Y,
                arrowX: es,
                arrowY: eu,
                shouldHideArrow: ec,
                children: (0, v.jsx)(x.sG.div, {
                  "data-side": el,
                  "data-align": ea,
                  ...N,
                  ref: V,
                  style: { ...N.style, animation: ei ? void 0 : "none" },
                }),
              }),
            })
          );
        });
      $.displayName = j;
      var N = "PopperArrow",
        q = { top: "bottom", right: "left", bottom: "top", left: "right" },
        F = r.forwardRef(function (e, t) {
          let { __scopePopper: n, ...r } = e,
            i = z(N, n),
            o = q[i.placedSide];
          return (0, v.jsx)("span", {
            ref: i.onArrowChange,
            style: {
              position: "absolute",
              left: i.arrowX,
              top: i.arrowY,
              [o]: 0,
              transformOrigin: {
                top: "",
                right: "0 0",
                bottom: "center 0",
                left: "100% 0",
              }[i.placedSide],
              transform: {
                top: "translateY(100%)",
                right: "translateY(50%) rotate(90deg) translateX(-50%)",
                bottom: "rotate(180deg)",
                left: "translateY(50%) rotate(-90deg) translateX(50%)",
              }[i.placedSide],
              visibility: i.shouldHideArrow ? "hidden" : void 0,
            },
            children: (0, v.jsx)(b, {
              ...r,
              ref: t,
              style: { ...r.style, display: "block" },
            }),
          });
        });
      function W(e) {
        return null !== e;
      }
      F.displayName = N;
      var B = (e) => ({
        name: "transformOrigin",
        options: e,
        fn(t) {
          let { placement: n, rects: r, middlewareData: i } = t,
            o = i.arrow?.centerOffset !== 0,
            l = o ? 0 : e.arrowWidth,
            a = o ? 0 : e.arrowHeight,
            [f, s] = I(n),
            u = { start: "0%", center: "50%", end: "100%" }[s],
            c = (i.arrow?.x ?? 0) + l / 2,
            d = (i.arrow?.y ?? 0) + a / 2,
            p = "",
            h = "";
          return (
            "bottom" === f
              ? ((p = o ? u : `${c}px`), (h = `${-a}px`))
              : "top" === f
                ? ((p = o ? u : `${c}px`), (h = `${r.floating.height + a}px`))
                : "right" === f
                  ? ((p = `${-a}px`), (h = o ? u : `${d}px`))
                  : "left" === f &&
                    ((p = `${r.floating.width + a}px`), (h = o ? u : `${d}px`)),
            { data: { x: p, y: h } }
          );
        },
      });
      function I(e) {
        let [t, n = "center"] = e.split("-");
        return [t, n];
      }
      var U = k,
        V = M,
        _ = $,
        Y = F;
    },
    83850: (e, t, n) => {
      function r() {
        return "undefined" != typeof window;
      }
      function i(e) {
        return a(e) ? (e.nodeName || "").toLowerCase() : "#document";
      }
      function o(e) {
        var t;
        return (
          (null == e || null == (t = e.ownerDocument)
            ? void 0
            : t.defaultView) || window
        );
      }
      function l(e) {
        var t;
        return null ==
          (t = (a(e) ? e.ownerDocument : e.document) || window.document)
          ? void 0
          : t.documentElement;
      }
      function a(e) {
        return !!r() && (e instanceof Node || e instanceof o(e).Node);
      }
      function f(e) {
        return !!r() && (e instanceof Element || e instanceof o(e).Element);
      }
      function s(e) {
        return (
          !!r() && (e instanceof HTMLElement || e instanceof o(e).HTMLElement)
        );
      }
      function u(e) {
        return (
          !!r() &&
          "undefined" != typeof ShadowRoot &&
          (e instanceof ShadowRoot || e instanceof o(e).ShadowRoot)
        );
      }
      function c(e) {
        let { overflow: t, overflowX: n, overflowY: r, display: i } = w(e);
        return (
          /auto|scroll|overlay|hidden|clip/.test(t + r + n) &&
          !["inline", "contents"].includes(i)
        );
      }
      function d(e) {
        return ["table", "td", "th"].includes(i(e));
      }
      function p(e) {
        return [":popover-open", ":modal"].some((t) => {
          try {
            return e.matches(t);
          } catch (e) {
            return !1;
          }
        });
      }
      function h(e) {
        let t = g(),
          n = f(e) ? w(e) : e;
        return (
          ["transform", "translate", "scale", "rotate", "perspective"].some(
            (e) => !!n[e] && "none" !== n[e],
          ) ||
          (!!n.containerType && "normal" !== n.containerType) ||
          (!t && !!n.backdropFilter && "none" !== n.backdropFilter) ||
          (!t && !!n.filter && "none" !== n.filter) ||
          [
            "transform",
            "translate",
            "scale",
            "rotate",
            "perspective",
            "filter",
          ].some((e) => (n.willChange || "").includes(e)) ||
          ["paint", "layout", "strict", "content"].some((e) =>
            (n.contain || "").includes(e),
          )
        );
      }
      function m(e) {
        let t = v(e);
        for (; s(t) && !y(t); ) {
          if (h(t)) return t;
          if (p(t)) break;
          t = v(t);
        }
        return null;
      }
      function g() {
        return (
          "undefined" != typeof CSS &&
          !!CSS.supports &&
          CSS.supports("-webkit-backdrop-filter", "none")
        );
      }
      function y(e) {
        return ["html", "body", "#document"].includes(i(e));
      }
      function w(e) {
        return o(e).getComputedStyle(e);
      }
      function x(e) {
        return f(e)
          ? { scrollLeft: e.scrollLeft, scrollTop: e.scrollTop }
          : { scrollLeft: e.scrollX, scrollTop: e.scrollY };
      }
      function v(e) {
        if ("html" === i(e)) return e;
        let t = e.assignedSlot || e.parentNode || (u(e) && e.host) || l(e);
        return u(t) ? t.host : t;
      }
      function b(e) {
        return e.parent && Object.getPrototypeOf(e.parent)
          ? e.frameElement
          : null;
      }
      n.d(t, {
        $4: () => v,
        CP: () => x,
        L9: () => w,
        Lv: () => d,
        Tc: () => g,
        Tf: () => p,
        ZU: () => c,
        _m: () => b,
        ep: () => l,
        eu: () => y,
        gJ: () => m,
        mq: () => i,
        sQ: () => h,
        sb: () => s,
        v9: () =>
          function e(t, n, r) {
            var i;
            void 0 === n && (n = []), void 0 === r && (r = !0);
            let l = (function e(t) {
                let n = v(t);
                return y(n)
                  ? t.ownerDocument
                    ? t.ownerDocument.body
                    : t.body
                  : s(n) && c(n)
                    ? n
                    : e(n);
              })(t),
              a = l === (null == (i = t.ownerDocument) ? void 0 : i.body),
              f = o(l);
            if (a) {
              let t = b(f);
              return n.concat(
                f,
                f.visualViewport || [],
                c(l) ? l : [],
                t && r ? e(t) : [],
              );
            }
            return n.concat(l, e(l, [], r));
          },
        vq: () => f,
        zk: () => o,
      });
    },
  });
//# sourceMappingURL=3390.js.map
