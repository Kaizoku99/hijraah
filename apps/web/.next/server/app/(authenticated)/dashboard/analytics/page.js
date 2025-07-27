try {
  let t =
      "undefined" != typeof window
        ? window
        : "undefined" != typeof global
          ? global
          : "undefined" != typeof globalThis
            ? globalThis
            : "undefined" != typeof self
              ? self
              : {},
    e = new t.Error().stack;
  e &&
    ((t._sentryDebugIds = t._sentryDebugIds || {}),
    (t._sentryDebugIds[e] = "c67bf847-4213-4a08-8c63-c52a84875ed0"),
    (t._sentryDebugIdIdentifier =
      "sentry-dbid-c67bf847-4213-4a08-8c63-c52a84875ed0"));
} catch (t) {}
(() => {
  var t = {};
  (t.id = 9095),
    (t.ids = [9095]),
    (t.modules = {
      45: (t, e, r) => {
        "use strict";
        var n = r(92685),
          i = r(25369),
          o = r(37869);
        t.exports = function (t, e, r) {
          return e == e ? o(t, e, r) : n(t, i, r);
        };
      },
      132: (t, e, r) => {
        "use strict";
        r.d(e, { d: () => M });
        var n = r(84205),
          i = r.n(n),
          o = r(4276),
          a = r.n(o),
          c = r(13493),
          u = r(61481),
          s = r(18862),
          l = r(75243),
          f = r(12139),
          p = r(59769),
          h = r(9403),
          d = ["x1", "y1", "x2", "y2", "key"],
          y = ["offset"];
        function v(t) {
          return (v =
            "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
              ? function (t) {
                  return typeof t;
                }
              : function (t) {
                  return t &&
                    "function" == typeof Symbol &&
                    t.constructor === Symbol &&
                    t !== Symbol.prototype
                    ? "symbol"
                    : typeof t;
                })(t);
        }
        function m(t, e) {
          var r = Object.keys(t);
          if (Object.getOwnPropertySymbols) {
            var n = Object.getOwnPropertySymbols(t);
            e &&
              (n = n.filter(function (e) {
                return Object.getOwnPropertyDescriptor(t, e).enumerable;
              })),
              r.push.apply(r, n);
          }
          return r;
        }
        function b(t) {
          for (var e = 1; e < arguments.length; e++) {
            var r = null != arguments[e] ? arguments[e] : {};
            e % 2
              ? m(Object(r), !0).forEach(function (e) {
                  var n, i, o;
                  (n = t),
                    (i = e),
                    (o = r[e]),
                    (i = (function (t) {
                      var e = (function (t, e) {
                        if ("object" != v(t) || !t) return t;
                        var r = t[Symbol.toPrimitive];
                        if (void 0 !== r) {
                          var n = r.call(t, e || "default");
                          if ("object" != v(n)) return n;
                          throw TypeError(
                            "@@toPrimitive must return a primitive value.",
                          );
                        }
                        return ("string" === e ? String : Number)(t);
                      })(t, "string");
                      return "symbol" == v(e) ? e : e + "";
                    })(i)) in n
                      ? Object.defineProperty(n, i, {
                          value: o,
                          enumerable: !0,
                          configurable: !0,
                          writable: !0,
                        })
                      : (n[i] = o);
                })
              : Object.getOwnPropertyDescriptors
                ? Object.defineProperties(
                    t,
                    Object.getOwnPropertyDescriptors(r),
                  )
                : m(Object(r)).forEach(function (e) {
                    Object.defineProperty(
                      t,
                      e,
                      Object.getOwnPropertyDescriptor(r, e),
                    );
                  });
          }
          return t;
        }
        function g() {
          return (g = Object.assign
            ? Object.assign.bind()
            : function (t) {
                for (var e = 1; e < arguments.length; e++) {
                  var r = arguments[e];
                  for (var n in r)
                    Object.prototype.hasOwnProperty.call(r, n) && (t[n] = r[n]);
                }
                return t;
              }).apply(this, arguments);
        }
        function x(t, e) {
          if (null == t) return {};
          var r,
            n,
            i = (function (t, e) {
              if (null == t) return {};
              var r = {};
              for (var n in t)
                if (Object.prototype.hasOwnProperty.call(t, n)) {
                  if (e.indexOf(n) >= 0) continue;
                  r[n] = t[n];
                }
              return r;
            })(t, e);
          if (Object.getOwnPropertySymbols) {
            var o = Object.getOwnPropertySymbols(t);
            for (n = 0; n < o.length; n++)
              (r = o[n]),
                !(e.indexOf(r) >= 0) &&
                  Object.prototype.propertyIsEnumerable.call(t, r) &&
                  (i[r] = t[r]);
          }
          return i;
        }
        var w = function (t) {
          var e = t.fill;
          if (!e || "none" === e) return null;
          var r = t.fillOpacity,
            n = t.x,
            o = t.y,
            a = t.width,
            c = t.height,
            u = t.ry;
          return i().createElement("rect", {
            x: n,
            y: o,
            ry: u,
            width: a,
            height: c,
            stroke: "none",
            fill: e,
            fillOpacity: r,
            className: "recharts-cartesian-grid-bg",
          });
        };
        function O(t, e) {
          var r;
          if (i().isValidElement(t)) r = i().cloneElement(t, e);
          else if (a()(t)) r = t(e);
          else {
            var n = e.x1,
              o = e.y1,
              c = e.x2,
              u = e.y2,
              l = e.key,
              f = x(e, d),
              p = (0, s.J9)(f, !1),
              h = (p.offset, x(p, y));
            r = i().createElement(
              "line",
              g({}, h, { x1: n, y1: o, x2: c, y2: u, fill: "none", key: l }),
            );
          }
          return r;
        }
        function j(t) {
          var e = t.x,
            r = t.width,
            n = t.horizontal,
            o = void 0 === n || n,
            a = t.horizontalPoints;
          if (!o || !a || !a.length) return null;
          var c = a.map(function (n, i) {
            return O(
              o,
              b(
                b({}, t),
                {},
                {
                  x1: e,
                  y1: n,
                  x2: e + r,
                  y2: n,
                  key: "line-".concat(i),
                  index: i,
                },
              ),
            );
          });
          return i().createElement(
            "g",
            { className: "recharts-cartesian-grid-horizontal" },
            c,
          );
        }
        function S(t) {
          var e = t.y,
            r = t.height,
            n = t.vertical,
            o = void 0 === n || n,
            a = t.verticalPoints;
          if (!o || !a || !a.length) return null;
          var c = a.map(function (n, i) {
            return O(
              o,
              b(
                b({}, t),
                {},
                {
                  x1: n,
                  y1: e,
                  x2: n,
                  y2: e + r,
                  key: "line-".concat(i),
                  index: i,
                },
              ),
            );
          });
          return i().createElement(
            "g",
            { className: "recharts-cartesian-grid-vertical" },
            c,
          );
        }
        function A(t) {
          var e = t.horizontalFill,
            r = t.fillOpacity,
            n = t.x,
            o = t.y,
            a = t.width,
            c = t.height,
            u = t.horizontalPoints,
            s = t.horizontal;
          if (!(void 0 === s || s) || !e || !e.length) return null;
          var l = u
            .map(function (t) {
              return Math.round(t + o - o);
            })
            .sort(function (t, e) {
              return t - e;
            });
          o !== l[0] && l.unshift(0);
          var f = l.map(function (t, u) {
            var s = l[u + 1] ? l[u + 1] - t : o + c - t;
            if (s <= 0) return null;
            var f = u % e.length;
            return i().createElement("rect", {
              key: "react-".concat(u),
              y: t,
              x: n,
              height: s,
              width: a,
              stroke: "none",
              fill: e[f],
              fillOpacity: r,
              className: "recharts-cartesian-grid-bg",
            });
          });
          return i().createElement(
            "g",
            { className: "recharts-cartesian-gridstripes-horizontal" },
            f,
          );
        }
        function P(t) {
          var e = t.vertical,
            r = t.verticalFill,
            n = t.fillOpacity,
            o = t.x,
            a = t.y,
            c = t.width,
            u = t.height,
            s = t.verticalPoints;
          if (!(void 0 === e || e) || !r || !r.length) return null;
          var l = s
            .map(function (t) {
              return Math.round(t + o - o);
            })
            .sort(function (t, e) {
              return t - e;
            });
          o !== l[0] && l.unshift(0);
          var f = l.map(function (t, e) {
            var s = l[e + 1] ? l[e + 1] - t : o + c - t;
            if (s <= 0) return null;
            var f = e % r.length;
            return i().createElement("rect", {
              key: "react-".concat(e),
              x: t,
              y: a,
              width: s,
              height: u,
              stroke: "none",
              fill: r[f],
              fillOpacity: n,
              className: "recharts-cartesian-grid-bg",
            });
          });
          return i().createElement(
            "g",
            { className: "recharts-cartesian-gridstripes-vertical" },
            f,
          );
        }
        var E = function (t, e) {
            var r = t.xAxis,
              n = t.width,
              i = t.height,
              o = t.offset;
            return (0, l.PW)(
              (0, f.f)(
                b(
                  b(b({}, p.u.defaultProps), r),
                  {},
                  {
                    ticks: (0, l.Rh)(r, !0),
                    viewBox: { x: 0, y: 0, width: n, height: i },
                  },
                ),
              ),
              o.left,
              o.left + o.width,
              e,
            );
          },
          k = function (t, e) {
            var r = t.yAxis,
              n = t.width,
              i = t.height,
              o = t.offset;
            return (0, l.PW)(
              (0, f.f)(
                b(
                  b(b({}, p.u.defaultProps), r),
                  {},
                  {
                    ticks: (0, l.Rh)(r, !0),
                    viewBox: { x: 0, y: 0, width: n, height: i },
                  },
                ),
              ),
              o.top,
              o.top + o.height,
              e,
            );
          },
          _ = {
            horizontal: !0,
            vertical: !0,
            stroke: "#ccc",
            fill: "none",
            verticalFill: [],
            horizontalFill: [],
          };
        function M(t) {
          var e,
            r,
            n,
            o,
            s,
            l,
            f = (0, h.yi)(),
            p = (0, h.rY)(),
            d = (0, h.hj)(),
            y = b(
              b({}, t),
              {},
              {
                stroke: null != (e = t.stroke) ? e : _.stroke,
                fill: null != (r = t.fill) ? r : _.fill,
                horizontal: null != (n = t.horizontal) ? n : _.horizontal,
                horizontalFill:
                  null != (o = t.horizontalFill) ? o : _.horizontalFill,
                vertical: null != (s = t.vertical) ? s : _.vertical,
                verticalFill: null != (l = t.verticalFill) ? l : _.verticalFill,
                x: (0, u.Et)(t.x) ? t.x : d.left,
                y: (0, u.Et)(t.y) ? t.y : d.top,
                width: (0, u.Et)(t.width) ? t.width : d.width,
                height: (0, u.Et)(t.height) ? t.height : d.height,
              },
            ),
            m = y.x,
            x = y.y,
            O = y.width,
            M = y.height,
            T = y.syncWithTicks,
            C = y.horizontalValues,
            N = y.verticalValues,
            I = (0, h.pj)(),
            D = (0, h.$G)();
          if (
            !(0, u.Et)(O) ||
            O <= 0 ||
            !(0, u.Et)(M) ||
            M <= 0 ||
            !(0, u.Et)(m) ||
            m !== +m ||
            !(0, u.Et)(x) ||
            x !== +x
          )
            return null;
          var B = y.verticalCoordinatesGenerator || E,
            R = y.horizontalCoordinatesGenerator || k,
            L = y.horizontalPoints,
            z = y.verticalPoints;
          if ((!L || !L.length) && a()(R)) {
            var U = C && C.length,
              F = R(
                {
                  yAxis: D
                    ? b(b({}, D), {}, { ticks: U ? C : D.ticks })
                    : void 0,
                  width: f,
                  height: p,
                  offset: d,
                },
                !!U || T,
              );
            (0, c.R)(
              Array.isArray(F),
              "horizontalCoordinatesGenerator should return Array but instead it returned [".concat(
                v(F),
                "]",
              ),
            ),
              Array.isArray(F) && (L = F);
          }
          if ((!z || !z.length) && a()(B)) {
            var q = N && N.length,
              $ = B(
                {
                  xAxis: I
                    ? b(b({}, I), {}, { ticks: q ? N : I.ticks })
                    : void 0,
                  width: f,
                  height: p,
                  offset: d,
                },
                !!q || T,
              );
            (0, c.R)(
              Array.isArray($),
              "verticalCoordinatesGenerator should return Array but instead it returned [".concat(
                v($),
                "]",
              ),
            ),
              Array.isArray($) && (z = $);
          }
          return i().createElement(
            "g",
            { className: "recharts-cartesian-grid" },
            i().createElement(w, {
              fill: y.fill,
              fillOpacity: y.fillOpacity,
              x: y.x,
              y: y.y,
              width: y.width,
              height: y.height,
              ry: y.ry,
            }),
            i().createElement(
              j,
              g({}, y, { offset: d, horizontalPoints: L, xAxis: I, yAxis: D }),
            ),
            i().createElement(
              S,
              g({}, y, { offset: d, verticalPoints: z, xAxis: I, yAxis: D }),
            ),
            i().createElement(A, g({}, y, { horizontalPoints: L })),
            i().createElement(P, g({}, y, { verticalPoints: z })),
          );
        }
        M.displayName = "CartesianGrid";
      },
      513: (t, e, r) => {
        "use strict";
        var n = r(11804),
          i = r(87790),
          o = r(58493),
          a = r(82121),
          c = r(87521);
        function u(t) {
          var e = -1,
            r = null == t ? 0 : t.length;
          for (this.clear(); ++e < r; ) {
            var n = t[e];
            this.set(n[0], n[1]);
          }
        }
        (u.prototype.clear = n),
          (u.prototype.delete = i),
          (u.prototype.get = o),
          (u.prototype.has = a),
          (u.prototype.set = c),
          (t.exports = u);
      },
      869: (t, e, r) => {
        "use strict";
        r.a(t, async (t, n) => {
          try {
            let s;
            r.r(e),
              r.d(e, {
                default: () => y,
                generateImageMetadata: () => h,
                generateMetadata: () => p,
                generateViewport: () => d,
              });
            var i = r(63033),
              o = r(35242),
              a = r(8630),
              c = r(60442),
              u = t([a]);
            a = (u.then ? (await u)() : u)[0];
            let l = { ...i },
              f =
                "workUnitAsyncStorage" in l
                  ? l.workUnitAsyncStorage
                  : "requestAsyncStorage" in l
                    ? l.requestAsyncStorage
                    : void 0;
            s = new Proxy(
              function () {
                return (0, o.jsxs)("div", {
                  className: "flex flex-col h-screen",
                  children: [
                    (0, o.jsx)("div", {
                      className:
                        "flex items-center justify-between px-4 py-2 border-b",
                      children: (0, o.jsx)(a.E, { className: "h-6 w-48" }),
                    }),
                    (0, o.jsxs)("div", {
                      className: "flex flex-1 overflow-hidden",
                      children: [
                        (0, o.jsx)("div", {
                          className: "w-64 h-screen border-r",
                          children: (0, o.jsx)(a.E, {
                            className: "h-screen w-full",
                          }),
                        }),
                        (0, o.jsx)("div", {
                          className: "flex-1 overflow-auto",
                          children: (0, o.jsxs)("div", {
                            className: "container mx-auto p-6",
                            children: [
                              (0, o.jsxs)("div", {
                                className:
                                  "flex justify-between items-center mb-6",
                                children: [
                                  (0, o.jsx)(a.E, { className: "h-8 w-48" }),
                                  (0, o.jsxs)("div", {
                                    className: "flex gap-4",
                                    children: [
                                      (0, o.jsx)(a.E, {
                                        className: "h-10 w-36",
                                      }),
                                      (0, o.jsx)(a.E, {
                                        className: "h-10 w-40",
                                      }),
                                    ],
                                  }),
                                ],
                              }),
                              (0, o.jsxs)("div", {
                                className:
                                  "grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6",
                                children: [
                                  (0, o.jsx)(a.E, {
                                    className: "h-24 w-full rounded-lg",
                                  }),
                                  (0, o.jsx)(a.E, {
                                    className: "h-24 w-full rounded-lg",
                                  }),
                                  (0, o.jsx)(a.E, {
                                    className: "h-24 w-full rounded-lg",
                                  }),
                                  (0, o.jsx)(a.E, {
                                    className: "h-24 w-full rounded-lg",
                                  }),
                                ],
                              }),
                              (0, o.jsx)(a.E, {
                                className: "h-80 w-full rounded-lg mb-6",
                              }),
                              (0, o.jsxs)("div", {
                                className: "grid gap-4 md:grid-cols-2",
                                children: [
                                  (0, o.jsx)(a.E, {
                                    className: "h-60 w-full rounded-lg",
                                  }),
                                  (0, o.jsx)(a.E, {
                                    className: "h-60 w-full rounded-lg",
                                  }),
                                ],
                              }),
                            ],
                          }),
                        }),
                      ],
                    }),
                  ],
                });
              },
              {
                apply: (t, e, r) => {
                  let n, i, o;
                  try {
                    let t = f?.getStore();
                    (n = t?.headers.get("sentry-trace") ?? void 0),
                      (i = t?.headers.get("baggage") ?? void 0),
                      (o = t?.headers);
                  } catch (t) {}
                  return c
                    .wrapServerComponentWithSentry(t, {
                      componentRoute: "/(authenticated)/dashboard/analytics",
                      componentType: "Loading",
                      sentryTraceHeader: n,
                      baggageHeader: i,
                      headers: o,
                    })
                    .apply(e, r);
                },
              },
            );
            let p = void 0,
              h = void 0,
              d = void 0,
              y = s;
            n();
          } catch (t) {
            n(t);
          }
        });
      },
      1229: (t) => {
        "use strict";
        var e = Object.prototype;
        t.exports = function (t) {
          var r = t && t.constructor;
          return t === (("function" == typeof r && r.prototype) || e);
        };
      },
      1281: (t, e, r) => {
        "use strict";
        var n = r(37609),
          i = r(74682),
          o = r(49905);
        t.exports = function (t, e, r, a, c, u) {
          var s = 1 & r,
            l = t.length,
            f = e.length;
          if (l != f && !(s && f > l)) return !1;
          var p = u.get(t),
            h = u.get(e);
          if (p && h) return p == e && h == t;
          var d = -1,
            y = !0,
            v = 2 & r ? new n() : void 0;
          for (u.set(t, e), u.set(e, t); ++d < l; ) {
            var m = t[d],
              b = e[d];
            if (a) var g = s ? a(b, m, d, e, t, u) : a(m, b, d, t, e, u);
            if (void 0 !== g) {
              if (g) continue;
              y = !1;
              break;
            }
            if (v) {
              if (
                !i(e, function (t, e) {
                  if (!o(v, e) && (m === t || c(m, t, r, a, u)))
                    return v.push(e);
                })
              ) {
                y = !1;
                break;
              }
            } else if (!(m === b || c(m, b, r, a, u))) {
              y = !1;
              break;
            }
          }
          return u.delete(t), u.delete(e), y;
        };
      },
      1371: (t, e, r) => {
        "use strict";
        var n = r(80657);
        t.exports = function (t) {
          return n(t) && t != +t;
        };
      },
      1419: (t, e, r) => {
        "use strict";
        t.exports = r(65530)();
      },
      1643: (t, e, r) => {
        "use strict";
        var n = r(38785);
        t.exports = function (t) {
          return n(this, t).has(t);
        };
      },
      1883: (t, e, r) => {
        "use strict";
        var n = r(30842);
        t.exports = function (t) {
          var e = n(t),
            r = e % 1;
          return e == e ? (r ? e - r : e) : 0;
        };
      },
      2322: (t, e, r) => {
        "use strict";
        var n = r(68080),
          i = r(23899),
          o = Object.prototype.propertyIsEnumerable,
          a = Object.getOwnPropertySymbols;
        t.exports = a
          ? function (t) {
              return null == t
                ? []
                : n(a((t = Object(t))), function (e) {
                    return o.call(t, e);
                  });
            }
          : i;
      },
      2385: (t, e, r) => {
        "use strict";
        r.d(e, { Z: () => P });
        var n = r(84205),
          i = r.n(n),
          o = r(58929),
          a = r.n(o),
          c = r(95311),
          u = r.n(c),
          s = r(4276),
          l = r.n(s),
          f = r(46096),
          p = r.n(f),
          h = r(79669),
          d = r(57830),
          y = r(18862),
          v = r(75243);
        function m(t) {
          return (m =
            "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
              ? function (t) {
                  return typeof t;
                }
              : function (t) {
                  return t &&
                    "function" == typeof Symbol &&
                    t.constructor === Symbol &&
                    t !== Symbol.prototype
                    ? "symbol"
                    : typeof t;
                })(t);
        }
        var b = ["valueAccessor"],
          g = ["data", "dataKey", "clockWise", "id", "textBreakAll"];
        function x(t, e) {
          (null == e || e > t.length) && (e = t.length);
          for (var r = 0, n = Array(e); r < e; r++) n[r] = t[r];
          return n;
        }
        function w() {
          return (w = Object.assign
            ? Object.assign.bind()
            : function (t) {
                for (var e = 1; e < arguments.length; e++) {
                  var r = arguments[e];
                  for (var n in r)
                    Object.prototype.hasOwnProperty.call(r, n) && (t[n] = r[n]);
                }
                return t;
              }).apply(this, arguments);
        }
        function O(t, e) {
          var r = Object.keys(t);
          if (Object.getOwnPropertySymbols) {
            var n = Object.getOwnPropertySymbols(t);
            e &&
              (n = n.filter(function (e) {
                return Object.getOwnPropertyDescriptor(t, e).enumerable;
              })),
              r.push.apply(r, n);
          }
          return r;
        }
        function j(t) {
          for (var e = 1; e < arguments.length; e++) {
            var r = null != arguments[e] ? arguments[e] : {};
            e % 2
              ? O(Object(r), !0).forEach(function (e) {
                  var n, i, o;
                  (n = t),
                    (i = e),
                    (o = r[e]),
                    (i = (function (t) {
                      var e = (function (t, e) {
                        if ("object" != m(t) || !t) return t;
                        var r = t[Symbol.toPrimitive];
                        if (void 0 !== r) {
                          var n = r.call(t, e || "default");
                          if ("object" != m(n)) return n;
                          throw TypeError(
                            "@@toPrimitive must return a primitive value.",
                          );
                        }
                        return ("string" === e ? String : Number)(t);
                      })(t, "string");
                      return "symbol" == m(e) ? e : e + "";
                    })(i)) in n
                      ? Object.defineProperty(n, i, {
                          value: o,
                          enumerable: !0,
                          configurable: !0,
                          writable: !0,
                        })
                      : (n[i] = o);
                })
              : Object.getOwnPropertyDescriptors
                ? Object.defineProperties(
                    t,
                    Object.getOwnPropertyDescriptors(r),
                  )
                : O(Object(r)).forEach(function (e) {
                    Object.defineProperty(
                      t,
                      e,
                      Object.getOwnPropertyDescriptor(r, e),
                    );
                  });
          }
          return t;
        }
        function S(t, e) {
          if (null == t) return {};
          var r,
            n,
            i = (function (t, e) {
              if (null == t) return {};
              var r = {};
              for (var n in t)
                if (Object.prototype.hasOwnProperty.call(t, n)) {
                  if (e.indexOf(n) >= 0) continue;
                  r[n] = t[n];
                }
              return r;
            })(t, e);
          if (Object.getOwnPropertySymbols) {
            var o = Object.getOwnPropertySymbols(t);
            for (n = 0; n < o.length; n++)
              (r = o[n]),
                !(e.indexOf(r) >= 0) &&
                  Object.prototype.propertyIsEnumerable.call(t, r) &&
                  (i[r] = t[r]);
          }
          return i;
        }
        var A = function (t) {
          return Array.isArray(t.value) ? p()(t.value) : t.value;
        };
        function P(t) {
          var e = t.valueAccessor,
            r = void 0 === e ? A : e,
            n = S(t, b),
            o = n.data,
            c = n.dataKey,
            u = n.clockWise,
            s = n.id,
            l = n.textBreakAll,
            f = S(n, g);
          return o && o.length
            ? i().createElement(
                d.W,
                { className: "recharts-label-list" },
                o.map(function (t, e) {
                  var n = a()(c) ? r(t, e) : (0, v.kr)(t && t.payload, c),
                    o = a()(s) ? {} : { id: "".concat(s, "-").concat(e) };
                  return i().createElement(
                    h.J,
                    w({}, (0, y.J9)(t, !0), f, o, {
                      parentViewBox: t.parentViewBox,
                      value: n,
                      textBreakAll: l,
                      viewBox: h.J.parseViewBox(
                        a()(u) ? t : j(j({}, t), {}, { clockWise: u }),
                      ),
                      key: "label-".concat(e),
                      index: e,
                    }),
                  );
                }),
              )
            : null;
        }
        (P.displayName = "LabelList"),
          (P.renderCallByParent = function (t, e) {
            var r,
              o =
                !(arguments.length > 2) ||
                void 0 === arguments[2] ||
                arguments[2];
            if (!t || (!t.children && o && !t.label)) return null;
            var a = t.children,
              c = (0, y.aS)(a, P).map(function (t, r) {
                return (0, n.cloneElement)(t, {
                  data: e,
                  key: "labelList-".concat(r),
                });
              });
            return o
              ? [
                  ((r = t.label),
                  !r
                    ? null
                    : !0 === r
                      ? i().createElement(P, {
                          key: "labelList-implicit",
                          data: e,
                        })
                      : i().isValidElement(r) || l()(r)
                        ? i().createElement(P, {
                            key: "labelList-implicit",
                            data: e,
                            content: r,
                          })
                        : u()(r)
                          ? i().createElement(
                              P,
                              w({ data: e }, r, { key: "labelList-implicit" }),
                            )
                          : null),
                ].concat(
                  (function (t) {
                    if (Array.isArray(t)) return x(t);
                  })(c) ||
                    (function (t) {
                      if (
                        ("undefined" != typeof Symbol &&
                          null != t[Symbol.iterator]) ||
                        null != t["@@iterator"]
                      )
                        return Array.from(t);
                    })(c) ||
                    (function (t, e) {
                      if (t) {
                        if ("string" == typeof t) return x(t, void 0);
                        var r = Object.prototype.toString.call(t).slice(8, -1);
                        if (
                          ("Object" === r &&
                            t.constructor &&
                            (r = t.constructor.name),
                          "Map" === r || "Set" === r)
                        )
                          return Array.from(t);
                        if (
                          "Arguments" === r ||
                          /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)
                        )
                          return x(t, e);
                      }
                    })(c) ||
                    (function () {
                      throw TypeError(
                        "Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.",
                      );
                    })(),
                )
              : c;
          });
      },
      2773: (t, e, r) => {
        "use strict";
        var n = r(66368),
          i = r(62588),
          o = r(58902),
          a = r(12836);
        t.exports = function (t) {
          return function (e) {
            var r = i((e = a(e))) ? o(e) : void 0,
              c = r ? r[0] : e.charAt(0),
              u = r ? n(r, 1).join("") : e.slice(1);
            return c[t]() + u;
          };
        };
      },
      3004: (t, e, r) => {
        "use strict";
        var n = r(68368),
          i = r(65946),
          o = r(55525),
          a = r(79208),
          c = r(5074),
          u = r(60363),
          s = r(6359);
        t.exports = function (t, e) {
          return a(t) && c(e)
            ? u(s(t), e)
            : function (r) {
                var a = i(r, t);
                return void 0 === a && a === e ? o(r, t) : n(e, a, 3);
              };
        };
      },
      3295: (t) => {
        "use strict";
        t.exports = require("next/dist/server/app-render/after-task-async-storage.external.js");
      },
      3395: (t) => {
        "use strict";
        t.exports = function (t, e) {
          for (var r = -1, n = null == t ? 0 : t.length; ++r < n; )
            if (!e(t[r], r, t)) return !1;
          return !0;
        };
      },
      3490: (t, e, r) => {
        "use strict";
        r.d(e, { F: () => z });
        var n = r(84205),
          i = r.n(n),
          o = r(7469),
          a = r(65946),
          c = r.n(a),
          u = r(5642),
          s = r.n(u),
          l = r(58929),
          f = r.n(l),
          p = r(4276),
          h = r.n(p),
          d = r(79029),
          y = r(57830),
          v = r(21958),
          m = r(6265),
          b = r(79669),
          g = r(2385),
          x = r(57611),
          w = r(18862),
          O = r(44729),
          j = r(76987),
          S = r(61481),
          A = r(75243),
          P = r(13493),
          E = r(10621),
          k = r(54569);
        function _(t) {
          return (_ =
            "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
              ? function (t) {
                  return typeof t;
                }
              : function (t) {
                  return t &&
                    "function" == typeof Symbol &&
                    t.constructor === Symbol &&
                    t !== Symbol.prototype
                    ? "symbol"
                    : typeof t;
                })(t);
        }
        function M() {
          return (M = Object.assign
            ? Object.assign.bind()
            : function (t) {
                for (var e = 1; e < arguments.length; e++) {
                  var r = arguments[e];
                  for (var n in r)
                    Object.prototype.hasOwnProperty.call(r, n) && (t[n] = r[n]);
                }
                return t;
              }).apply(this, arguments);
        }
        function T(t, e) {
          var r = Object.keys(t);
          if (Object.getOwnPropertySymbols) {
            var n = Object.getOwnPropertySymbols(t);
            e &&
              (n = n.filter(function (e) {
                return Object.getOwnPropertyDescriptor(t, e).enumerable;
              })),
              r.push.apply(r, n);
          }
          return r;
        }
        function C(t) {
          for (var e = 1; e < arguments.length; e++) {
            var r = null != arguments[e] ? arguments[e] : {};
            e % 2
              ? T(Object(r), !0).forEach(function (e) {
                  R(t, e, r[e]);
                })
              : Object.getOwnPropertyDescriptors
                ? Object.defineProperties(
                    t,
                    Object.getOwnPropertyDescriptors(r),
                  )
                : T(Object(r)).forEach(function (e) {
                    Object.defineProperty(
                      t,
                      e,
                      Object.getOwnPropertyDescriptor(r, e),
                    );
                  });
          }
          return t;
        }
        function N(t, e) {
          for (var r = 0; r < e.length; r++) {
            var n = e[r];
            (n.enumerable = n.enumerable || !1),
              (n.configurable = !0),
              "value" in n && (n.writable = !0),
              Object.defineProperty(t, L(n.key), n);
          }
        }
        function I() {
          try {
            var t = !Boolean.prototype.valueOf.call(
              Reflect.construct(Boolean, [], function () {}),
            );
          } catch (t) {}
          return (I = function () {
            return !!t;
          })();
        }
        function D(t) {
          return (D = Object.setPrototypeOf
            ? Object.getPrototypeOf.bind()
            : function (t) {
                return t.__proto__ || Object.getPrototypeOf(t);
              })(t);
        }
        function B(t, e) {
          return (B = Object.setPrototypeOf
            ? Object.setPrototypeOf.bind()
            : function (t, e) {
                return (t.__proto__ = e), t;
              })(t, e);
        }
        function R(t, e, r) {
          return (
            (e = L(e)) in t
              ? Object.defineProperty(t, e, {
                  value: r,
                  enumerable: !0,
                  configurable: !0,
                  writable: !0,
                })
              : (t[e] = r),
            t
          );
        }
        function L(t) {
          var e = (function (t, e) {
            if ("object" != _(t) || !t) return t;
            var r = t[Symbol.toPrimitive];
            if (void 0 !== r) {
              var n = r.call(t, e || "default");
              if ("object" != _(n)) return n;
              throw TypeError("@@toPrimitive must return a primitive value.");
            }
            return ("string" === e ? String : Number)(t);
          })(t, "string");
          return "symbol" == _(e) ? e : e + "";
        }
        var z = (function (t) {
          var e, r;
          function n(t) {
            var e, r, i;
            if (!(this instanceof n))
              throw TypeError("Cannot call a class as a function");
            return (
              (r = n),
              (i = [t]),
              (r = D(r)),
              R(
                (e = (function (t, e) {
                  if (e && ("object" === _(e) || "function" == typeof e))
                    return e;
                  if (void 0 !== e)
                    throw TypeError(
                      "Derived constructors may only return object or undefined",
                    );
                  var r = t;
                  if (void 0 === r)
                    throw ReferenceError(
                      "this hasn't been initialised - super() hasn't been called",
                    );
                  return r;
                })(
                  this,
                  I()
                    ? Reflect.construct(r, i || [], D(this).constructor)
                    : r.apply(this, i),
                )),
                "pieRef",
                null,
              ),
              R(e, "sectorRefs", []),
              R(e, "id", (0, S.NF)("recharts-pie-")),
              R(e, "handleAnimationEnd", function () {
                var t = e.props.onAnimationEnd;
                e.setState({ isAnimationFinished: !0 }), h()(t) && t();
              }),
              R(e, "handleAnimationStart", function () {
                var t = e.props.onAnimationStart;
                e.setState({ isAnimationFinished: !1 }), h()(t) && t();
              }),
              (e.state = {
                isAnimationFinished: !t.isAnimationActive,
                prevIsAnimationActive: t.isAnimationActive,
                prevAnimationId: t.animationId,
                sectorToFocus: 0,
              }),
              e
            );
          }
          if ("function" != typeof t && null !== t)
            throw TypeError(
              "Super expression must either be null or a function",
            );
          return (
            (n.prototype = Object.create(t && t.prototype, {
              constructor: { value: n, writable: !0, configurable: !0 },
            })),
            Object.defineProperty(n, "prototype", { writable: !1 }),
            t && B(n, t),
            (e = [
              {
                key: "isActiveIndex",
                value: function (t) {
                  var e = this.props.activeIndex;
                  return Array.isArray(e) ? -1 !== e.indexOf(t) : t === e;
                },
              },
              {
                key: "hasActiveIndex",
                value: function () {
                  var t = this.props.activeIndex;
                  return Array.isArray(t) ? 0 !== t.length : t || 0 === t;
                },
              },
              {
                key: "renderLabels",
                value: function (t) {
                  if (
                    this.props.isAnimationActive &&
                    !this.state.isAnimationFinished
                  )
                    return null;
                  var e = this.props,
                    r = e.label,
                    o = e.labelLine,
                    a = e.dataKey,
                    c = e.valueKey,
                    u = (0, w.J9)(this.props, !1),
                    s = (0, w.J9)(r, !1),
                    l = (0, w.J9)(o, !1),
                    p = (r && r.offsetRadius) || 20,
                    h = t.map(function (t, e) {
                      var h = (t.startAngle + t.endAngle) / 2,
                        d = (0, j.IZ)(t.cx, t.cy, t.outerRadius + p, h),
                        v = C(
                          C(C(C({}, u), t), {}, { stroke: "none" }, s),
                          {},
                          { index: e, textAnchor: n.getTextAnchor(d.x, t.cx) },
                          d,
                        ),
                        m = C(
                          C(
                            C(C({}, u), t),
                            {},
                            { fill: "none", stroke: t.fill },
                            l,
                          ),
                          {},
                          {
                            index: e,
                            points: [
                              (0, j.IZ)(t.cx, t.cy, t.outerRadius, h),
                              d,
                            ],
                          },
                        ),
                        b = a;
                      return (
                        f()(a) && f()(c) ? (b = "value") : f()(a) && (b = c),
                        i().createElement(
                          y.W,
                          {
                            key: "label-"
                              .concat(t.startAngle, "-")
                              .concat(t.endAngle, "-")
                              .concat(t.midAngle, "-")
                              .concat(e),
                          },
                          o && n.renderLabelLineItem(o, m, "line"),
                          n.renderLabelItem(r, v, (0, A.kr)(t, b)),
                        )
                      );
                    });
                  return i().createElement(
                    y.W,
                    { className: "recharts-pie-labels" },
                    h,
                  );
                },
              },
              {
                key: "renderSectorsStatically",
                value: function (t) {
                  var e = this,
                    r = this.props,
                    n = r.activeShape,
                    o = r.blendStroke,
                    a = r.inactiveShape;
                  return t.map(function (r, c) {
                    if (
                      (null == r ? void 0 : r.startAngle) === 0 &&
                      (null == r ? void 0 : r.endAngle) === 0 &&
                      1 !== t.length
                    )
                      return null;
                    var u = e.isActiveIndex(c),
                      s = a && e.hasActiveIndex() ? a : null,
                      l = C(
                        C({}, r),
                        {},
                        { stroke: o ? r.fill : r.stroke, tabIndex: -1 },
                      );
                    return i().createElement(
                      y.W,
                      M(
                        {
                          ref: function (t) {
                            t &&
                              !e.sectorRefs.includes(t) &&
                              e.sectorRefs.push(t);
                          },
                          tabIndex: -1,
                          className: "recharts-pie-sector",
                        },
                        (0, E.XC)(e.props, r, c),
                        {
                          key: "sector-"
                            .concat(null == r ? void 0 : r.startAngle, "-")
                            .concat(null == r ? void 0 : r.endAngle, "-")
                            .concat(r.midAngle, "-")
                            .concat(c),
                        },
                      ),
                      i().createElement(
                        k.yp,
                        M(
                          {
                            option: u ? n : s,
                            isActive: u,
                            shapeType: "sector",
                          },
                          l,
                        ),
                      ),
                    );
                  });
                },
              },
              {
                key: "renderSectorsWithAnimation",
                value: function () {
                  var t = this,
                    e = this.props,
                    r = e.sectors,
                    n = e.isAnimationActive,
                    a = e.animationBegin,
                    u = e.animationDuration,
                    s = e.animationEasing,
                    l = e.animationId,
                    f = this.state,
                    p = f.prevSectors,
                    h = f.prevIsAnimationActive;
                  return i().createElement(
                    o.Ay,
                    {
                      begin: a,
                      duration: u,
                      isActive: n,
                      easing: s,
                      from: { t: 0 },
                      to: { t: 1 },
                      key: "pie-".concat(l, "-").concat(h),
                      onAnimationStart: this.handleAnimationStart,
                      onAnimationEnd: this.handleAnimationEnd,
                    },
                    function (e) {
                      var n = e.t,
                        o = [],
                        a = (r && r[0]).startAngle;
                      return (
                        r.forEach(function (t, e) {
                          var r = p && p[e],
                            i = e > 0 ? c()(t, "paddingAngle", 0) : 0;
                          if (r) {
                            var u = (0, S.Dj)(
                                r.endAngle - r.startAngle,
                                t.endAngle - t.startAngle,
                              ),
                              s = C(
                                C({}, t),
                                {},
                                { startAngle: a + i, endAngle: a + u(n) + i },
                              );
                            o.push(s), (a = s.endAngle);
                          } else {
                            var l = t.endAngle,
                              f = t.startAngle,
                              h = (0, S.Dj)(0, l - f)(n),
                              d = C(
                                C({}, t),
                                {},
                                { startAngle: a + i, endAngle: a + h + i },
                              );
                            o.push(d), (a = d.endAngle);
                          }
                        }),
                        i().createElement(
                          y.W,
                          null,
                          t.renderSectorsStatically(o),
                        )
                      );
                    },
                  );
                },
              },
              {
                key: "attachKeyboardHandlers",
                value: function (t) {
                  var e = this;
                  t.onkeydown = function (t) {
                    if (!t.altKey)
                      switch (t.key) {
                        case "ArrowLeft":
                          var r = ++e.state.sectorToFocus % e.sectorRefs.length;
                          e.sectorRefs[r].focus(),
                            e.setState({ sectorToFocus: r });
                          break;
                        case "ArrowRight":
                          var n =
                            --e.state.sectorToFocus < 0
                              ? e.sectorRefs.length - 1
                              : e.state.sectorToFocus % e.sectorRefs.length;
                          e.sectorRefs[n].focus(),
                            e.setState({ sectorToFocus: n });
                          break;
                        case "Escape":
                          e.sectorRefs[e.state.sectorToFocus].blur(),
                            e.setState({ sectorToFocus: 0 });
                      }
                  };
                },
              },
              {
                key: "renderSectors",
                value: function () {
                  var t = this.props,
                    e = t.sectors,
                    r = t.isAnimationActive,
                    n = this.state.prevSectors;
                  return r && e && e.length && (!n || !s()(n, e))
                    ? this.renderSectorsWithAnimation()
                    : this.renderSectorsStatically(e);
                },
              },
              {
                key: "componentDidMount",
                value: function () {
                  this.pieRef && this.attachKeyboardHandlers(this.pieRef);
                },
              },
              {
                key: "render",
                value: function () {
                  var t = this,
                    e = this.props,
                    r = e.hide,
                    n = e.sectors,
                    o = e.className,
                    a = e.label,
                    c = e.cx,
                    u = e.cy,
                    s = e.innerRadius,
                    l = e.outerRadius,
                    f = e.isAnimationActive,
                    p = this.state.isAnimationFinished;
                  if (
                    r ||
                    !n ||
                    !n.length ||
                    !(0, S.Et)(c) ||
                    !(0, S.Et)(u) ||
                    !(0, S.Et)(s) ||
                    !(0, S.Et)(l)
                  )
                    return null;
                  var h = (0, d.A)("recharts-pie", o);
                  return i().createElement(
                    y.W,
                    {
                      tabIndex: this.props.rootTabIndex,
                      className: h,
                      ref: function (e) {
                        t.pieRef = e;
                      },
                    },
                    this.renderSectors(),
                    a && this.renderLabels(n),
                    b.J.renderCallByParent(this.props, null, !1),
                    (!f || p) && g.Z.renderCallByParent(this.props, n, !1),
                  );
                },
              },
            ]),
            (r = [
              {
                key: "getDerivedStateFromProps",
                value: function (t, e) {
                  return e.prevIsAnimationActive !== t.isAnimationActive
                    ? {
                        prevIsAnimationActive: t.isAnimationActive,
                        prevAnimationId: t.animationId,
                        curSectors: t.sectors,
                        prevSectors: [],
                        isAnimationFinished: !0,
                      }
                    : t.isAnimationActive && t.animationId !== e.prevAnimationId
                      ? {
                          prevAnimationId: t.animationId,
                          curSectors: t.sectors,
                          prevSectors: e.curSectors,
                          isAnimationFinished: !0,
                        }
                      : t.sectors !== e.curSectors
                        ? { curSectors: t.sectors, isAnimationFinished: !0 }
                        : null;
                },
              },
              {
                key: "getTextAnchor",
                value: function (t, e) {
                  return t > e ? "start" : t < e ? "end" : "middle";
                },
              },
              {
                key: "renderLabelLineItem",
                value: function (t, e, r) {
                  if (i().isValidElement(t)) return i().cloneElement(t, e);
                  if (h()(t)) return t(e);
                  var n = (0, d.A)(
                    "recharts-pie-label-line",
                    "boolean" != typeof t ? t.className : "",
                  );
                  return i().createElement(
                    v.I,
                    M({}, e, { key: r, type: "linear", className: n }),
                  );
                },
              },
              {
                key: "renderLabelItem",
                value: function (t, e, r) {
                  if (i().isValidElement(t)) return i().cloneElement(t, e);
                  var n = r;
                  if (h()(t) && ((n = t(e)), i().isValidElement(n))) return n;
                  var o = (0, d.A)(
                    "recharts-pie-label-text",
                    "boolean" == typeof t || h()(t) ? "" : t.className,
                  );
                  return i().createElement(
                    m.E,
                    M({}, e, { alignmentBaseline: "middle", className: o }),
                    n,
                  );
                },
              },
            ]),
            e && N(n.prototype, e),
            r && N(n, r),
            Object.defineProperty(n, "prototype", { writable: !1 }),
            n
          );
        })(n.PureComponent);
        R(z, "displayName", "Pie"),
          R(z, "defaultProps", {
            stroke: "#fff",
            fill: "#808080",
            legendType: "rect",
            cx: "50%",
            cy: "50%",
            startAngle: 0,
            endAngle: 360,
            innerRadius: 0,
            outerRadius: "80%",
            paddingAngle: 0,
            labelLine: !0,
            hide: !1,
            minAngle: 0,
            isAnimationActive: !O.m.isSsr,
            animationBegin: 400,
            animationDuration: 1500,
            animationEasing: "ease",
            nameKey: "name",
            blendStroke: !1,
            rootTabIndex: 0,
          }),
          R(z, "parseDeltaAngle", function (t, e) {
            return (0, S.sA)(e - t) * Math.min(Math.abs(e - t), 360);
          }),
          R(z, "getRealPieData", function (t) {
            var e = t.data,
              r = t.children,
              n = (0, w.J9)(t, !1),
              i = (0, w.aS)(r, x.f);
            return e && e.length
              ? e.map(function (t, e) {
                  return C(C(C({ payload: t }, n), t), i && i[e] && i[e].props);
                })
              : i && i.length
                ? i.map(function (t) {
                    return C(C({}, n), t.props);
                  })
                : [];
          }),
          R(z, "parseCoordinateOfPie", function (t, e) {
            var r = e.top,
              n = e.left,
              i = e.width,
              o = e.height,
              a = (0, j.lY)(i, o);
            return {
              cx: n + (0, S.F4)(t.cx, i, i / 2),
              cy: r + (0, S.F4)(t.cy, o, o / 2),
              innerRadius: (0, S.F4)(t.innerRadius, a, 0),
              outerRadius: (0, S.F4)(t.outerRadius, a, 0.8 * a),
              maxRadius: t.maxRadius || Math.sqrt(i * i + o * o) / 2,
            };
          }),
          R(z, "getComposedData", function (t) {
            var e,
              r,
              n = t.item,
              i = t.offset,
              o =
                void 0 !== n.type.defaultProps
                  ? C(C({}, n.type.defaultProps), n.props)
                  : n.props,
              a = z.getRealPieData(o);
            if (!a || !a.length) return null;
            var c = o.cornerRadius,
              u = o.startAngle,
              s = o.endAngle,
              l = o.paddingAngle,
              p = o.dataKey,
              h = o.nameKey,
              d = o.valueKey,
              y = o.tooltipType,
              v = Math.abs(o.minAngle),
              m = z.parseCoordinateOfPie(o, i),
              b = z.parseDeltaAngle(u, s),
              g = Math.abs(b),
              x = p;
            f()(p) && f()(d)
              ? ((0, P.R)(
                  !1,
                  'Use "dataKey" to specify the value of pie,\n      the props "valueKey" will be deprecated in 1.1.0',
                ),
                (x = "value"))
              : f()(p) &&
                ((0, P.R)(
                  !1,
                  'Use "dataKey" to specify the value of pie,\n      the props "valueKey" will be deprecated in 1.1.0',
                ),
                (x = d));
            var w = a.filter(function (t) {
                return 0 !== (0, A.kr)(t, x, 0);
              }).length,
              O = g - w * v - (g >= 360 ? w : w - 1) * l,
              E = a.reduce(function (t, e) {
                var r = (0, A.kr)(e, x, 0);
                return t + ((0, S.Et)(r) ? r : 0);
              }, 0);
            return (
              E > 0 &&
                (e = a.map(function (t, e) {
                  var n,
                    i = (0, A.kr)(t, x, 0),
                    o = (0, A.kr)(t, h, e),
                    a = ((0, S.Et)(i) ? i : 0) / E,
                    s =
                      (n = e ? r.endAngle + (0, S.sA)(b) * l * +(0 !== i) : u) +
                      (0, S.sA)(b) * ((0 !== i ? v : 0) + a * O),
                    f = (n + s) / 2,
                    p = (m.innerRadius + m.outerRadius) / 2,
                    d = [
                      { name: o, value: i, payload: t, dataKey: x, type: y },
                    ],
                    g = (0, j.IZ)(m.cx, m.cy, p, f);
                  return (r = C(
                    C(
                      C(
                        {
                          percent: a,
                          cornerRadius: c,
                          name: o,
                          tooltipPayload: d,
                          midAngle: f,
                          middleRadius: p,
                          tooltipPosition: g,
                        },
                        t,
                      ),
                      m,
                    ),
                    {},
                    {
                      value: (0, A.kr)(t, x),
                      startAngle: n,
                      endAngle: s,
                      payload: t,
                      paddingAngle: (0, S.sA)(b) * l,
                    },
                  ));
                })),
              C(C({}, m), {}, { sectors: e, data: a })
            );
          });
      },
      3576: (t, e, r) => {
        "use strict";
        var n = r(33965),
          i = r(50021),
          o = r(11730);
        t.exports = function (t) {
          return t && t.length ? n(t, o, i) : void 0;
        };
      },
      3989: (t, e, r) => {
        "use strict";
        var n = r(87327),
          i = r(68368);
        t.exports = function (t, e, r, o) {
          var a = r.length,
            c = a,
            u = !o;
          if (null == t) return !c;
          for (t = Object(t); a--; ) {
            var s = r[a];
            if (u && s[2] ? s[1] !== t[s[0]] : !(s[0] in t)) return !1;
          }
          for (; ++a < c; ) {
            var l = (s = r[a])[0],
              f = t[l],
              p = s[1];
            if (u && s[2]) {
              if (void 0 === f && !(l in t)) return !1;
            } else {
              var h = new n();
              if (o) var d = o(f, p, l, t, e, h);
              if (!(void 0 === d ? i(p, f, 3, o, h) : d)) return !1;
            }
          }
          return !0;
        };
      },
      4167: (t, e, r) => {
        "use strict";
        var n = r(4222),
          i = r(13708),
          o = r(46403),
          a = r(35183),
          c = r(4551);
        function u(t) {
          var e = -1,
            r = null == t ? 0 : t.length;
          for (this.clear(); ++e < r; ) {
            var n = t[e];
            this.set(n[0], n[1]);
          }
        }
        (u.prototype.clear = n),
          (u.prototype.delete = i),
          (u.prototype.get = o),
          (u.prototype.has = a),
          (u.prototype.set = c),
          (t.exports = u);
      },
      4222: (t, e, r) => {
        "use strict";
        var n = r(8316);
        t.exports = function () {
          (this.__data__ = n ? n(null) : {}), (this.size = 0);
        };
      },
      4276: (t, e, r) => {
        "use strict";
        var n = r(28017),
          i = r(95311);
        t.exports = function (t) {
          if (!i(t)) return !1;
          var e = n(t);
          return (
            "[object Function]" == e ||
            "[object GeneratorFunction]" == e ||
            "[object AsyncFunction]" == e ||
            "[object Proxy]" == e
          );
        };
      },
      4551: (t, e, r) => {
        "use strict";
        var n = r(8316);
        t.exports = function (t, e) {
          var r = this.__data__;
          return (
            (this.size += +!this.has(t)),
            (r[t] = n && void 0 === e ? "__lodash_hash_undefined__" : e),
            this
          );
        };
      },
      4775: (t) => {
        "use strict";
        t.exports = function (t) {
          var e = -1,
            r = Array(t.size);
          return (
            t.forEach(function (t, n) {
              r[++e] = [n, t];
            }),
            r
          );
        };
      },
      5074: (t, e, r) => {
        "use strict";
        var n = r(95311);
        t.exports = function (t) {
          return t == t && !n(t);
        };
      },
      5642: (t, e, r) => {
        "use strict";
        var n = r(68368);
        t.exports = function (t, e) {
          return n(t, e);
        };
      },
      5913: (t, e, r) => {
        "use strict";
        r.d(e, { pC: () => i });
        var n = r(32367);
        let i = {
          async getCases() {
            let t = (0, n.UU)(),
              { data: e, error: r } = await t
                .from("cases")
                .select("*")
                .order("created_at", { ascending: !1 });
            if (r) throw r;
            return e;
          },
          async getCaseById(t) {
            let e = (0, n.UU)(),
              { data: r, error: i } = await e
                .from("cases")
                .select("*")
                .eq("id", t)
                .single();
            if (i) throw i;
            return r;
          },
          async createCase(t) {
            let e = (0, n.UU)(),
              { data: r, error: i } = await e
                .from("cases")
                .insert(t)
                .select()
                .single();
            if (i) throw i;
            return r;
          },
          async updateCase(t, e) {
            let r = (0, n.UU)(),
              { data: i, error: o } = await r
                .from("cases")
                .update(e)
                .eq("id", t)
                .select()
                .single();
            if (o) throw o;
            return i;
          },
          async deleteCase(t) {
            let e = (0, n.UU)(),
              { error: r } = await e.from("cases").delete().eq("id", t);
            if (r) throw r;
          },
          async getCaseAnalytics() {
            let t = (0, n.UU)(),
              { data: e, error: r } = await t
                .from("cases")
                .select("status, type");
            if (r) throw r;
            return {
              total: e.length,
              byStatus: e.reduce(
                (t, e) => ((t[e.status] = (t[e.status] || 0) + 1), t),
                {},
              ),
              byType: e.reduce(
                (t, e) => ((t[e.type] = (t[e.type] || 0) + 1), t),
                {},
              ),
            };
          },
        };
      },
      6265: (t, e, r) => {
        "use strict";
        r.d(e, { E: () => L });
        var n = r(84205),
          i = r.n(n),
          o = r(58929),
          a = r.n(o),
          c = r(79029),
          u = r(61481),
          s = r(44729),
          l = r(18862),
          f = r(50839);
        function p(t) {
          return (p =
            "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
              ? function (t) {
                  return typeof t;
                }
              : function (t) {
                  return t &&
                    "function" == typeof Symbol &&
                    t.constructor === Symbol &&
                    t !== Symbol.prototype
                    ? "symbol"
                    : typeof t;
                })(t);
        }
        function h(t, e) {
          return (
            (function (t) {
              if (Array.isArray(t)) return t;
            })(t) ||
            (function (t, e) {
              var r =
                null == t
                  ? null
                  : ("undefined" != typeof Symbol && t[Symbol.iterator]) ||
                    t["@@iterator"];
              if (null != r) {
                var n,
                  i,
                  o,
                  a,
                  c = [],
                  u = !0,
                  s = !1;
                try {
                  if (((o = (r = r.call(t)).next), 0 === e)) {
                    if (Object(r) !== r) return;
                    u = !1;
                  } else
                    for (
                      ;
                      !(u = (n = o.call(r)).done) &&
                      (c.push(n.value), c.length !== e);
                      u = !0
                    );
                } catch (t) {
                  (s = !0), (i = t);
                } finally {
                  try {
                    if (
                      !u &&
                      null != r.return &&
                      ((a = r.return()), Object(a) !== a)
                    )
                      return;
                  } finally {
                    if (s) throw i;
                  }
                }
                return c;
              }
            })(t, e) ||
            (function (t, e) {
              if (t) {
                if ("string" == typeof t) return d(t, e);
                var r = Object.prototype.toString.call(t).slice(8, -1);
                if (
                  ("Object" === r && t.constructor && (r = t.constructor.name),
                  "Map" === r || "Set" === r)
                )
                  return Array.from(t);
                if (
                  "Arguments" === r ||
                  /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)
                )
                  return d(t, e);
              }
            })(t, e) ||
            (function () {
              throw TypeError(
                "Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.",
              );
            })()
          );
        }
        function d(t, e) {
          (null == e || e > t.length) && (e = t.length);
          for (var r = 0, n = Array(e); r < e; r++) n[r] = t[r];
          return n;
        }
        function y(t, e) {
          for (var r = 0; r < e.length; r++) {
            var n = e[r];
            (n.enumerable = n.enumerable || !1),
              (n.configurable = !0),
              "value" in n && (n.writable = !0),
              Object.defineProperty(
                t,
                (function (t) {
                  var e = (function (t, e) {
                    if ("object" != p(t) || !t) return t;
                    var r = t[Symbol.toPrimitive];
                    if (void 0 !== r) {
                      var n = r.call(t, e || "default");
                      if ("object" != p(n)) return n;
                      throw TypeError(
                        "@@toPrimitive must return a primitive value.",
                      );
                    }
                    return ("string" === e ? String : Number)(t);
                  })(t, "string");
                  return "symbol" == p(e) ? e : e + "";
                })(n.key),
                n,
              );
          }
        }
        var v = /(-?\d+(?:\.\d+)?[a-zA-Z%]*)([*/])(-?\d+(?:\.\d+)?[a-zA-Z%]*)/,
          m = /(-?\d+(?:\.\d+)?[a-zA-Z%]*)([+-])(-?\d+(?:\.\d+)?[a-zA-Z%]*)/,
          b = /^px|cm|vh|vw|em|rem|%|mm|in|pt|pc|ex|ch|vmin|vmax|Q$/,
          g = /(-?\d+(?:\.\d+)?)([a-zA-Z%]+)?/,
          x = {
            cm: 96 / 2.54,
            mm: 96 / 25.4,
            pt: 96 / 72,
            pc: 16,
            in: 96,
            Q: 96 / 101.6,
            px: 1,
          },
          w = Object.keys(x),
          O = (function () {
            var t, e;
            function r(t, e) {
              if (!(this instanceof r))
                throw TypeError("Cannot call a class as a function");
              (this.num = t),
                (this.unit = e),
                (this.num = t),
                (this.unit = e),
                Number.isNaN(t) && (this.unit = ""),
                "" === e || b.test(e) || ((this.num = NaN), (this.unit = "")),
                w.includes(e) && ((this.num = t * x[e]), (this.unit = "px"));
            }
            return (
              (t = [
                {
                  key: "add",
                  value: function (t) {
                    return this.unit !== t.unit
                      ? new r(NaN, "")
                      : new r(this.num + t.num, this.unit);
                  },
                },
                {
                  key: "subtract",
                  value: function (t) {
                    return this.unit !== t.unit
                      ? new r(NaN, "")
                      : new r(this.num - t.num, this.unit);
                  },
                },
                {
                  key: "multiply",
                  value: function (t) {
                    return "" !== this.unit &&
                      "" !== t.unit &&
                      this.unit !== t.unit
                      ? new r(NaN, "")
                      : new r(this.num * t.num, this.unit || t.unit);
                  },
                },
                {
                  key: "divide",
                  value: function (t) {
                    return "" !== this.unit &&
                      "" !== t.unit &&
                      this.unit !== t.unit
                      ? new r(NaN, "")
                      : new r(this.num / t.num, this.unit || t.unit);
                  },
                },
                {
                  key: "toString",
                  value: function () {
                    return "".concat(this.num).concat(this.unit);
                  },
                },
                {
                  key: "isNaN",
                  value: function () {
                    return Number.isNaN(this.num);
                  },
                },
              ]),
              (e = [
                {
                  key: "parse",
                  value: function (t) {
                    var e,
                      n = h(null != (e = g.exec(t)) ? e : [], 3),
                      i = n[1],
                      o = n[2];
                    return new r(parseFloat(i), null != o ? o : "");
                  },
                },
              ]),
              t && y(r.prototype, t),
              e && y(r, e),
              Object.defineProperty(r, "prototype", { writable: !1 }),
              r
            );
          })();
        function j(t) {
          if (t.includes("NaN")) return "NaN";
          for (var e = t; e.includes("*") || e.includes("/"); ) {
            var r,
              n = h(null != (r = v.exec(e)) ? r : [], 4),
              i = n[1],
              o = n[2],
              a = n[3],
              c = O.parse(null != i ? i : ""),
              u = O.parse(null != a ? a : ""),
              s = "*" === o ? c.multiply(u) : c.divide(u);
            if (s.isNaN()) return "NaN";
            e = e.replace(v, s.toString());
          }
          for (; e.includes("+") || /.-\d+(?:\.\d+)?/.test(e); ) {
            var l,
              f = h(null != (l = m.exec(e)) ? l : [], 4),
              p = f[1],
              d = f[2],
              y = f[3],
              b = O.parse(null != p ? p : ""),
              g = O.parse(null != y ? y : ""),
              x = "+" === d ? b.add(g) : b.subtract(g);
            if (x.isNaN()) return "NaN";
            e = e.replace(m, x.toString());
          }
          return e;
        }
        var S = /\(([^()]*)\)/;
        function A(t) {
          var e = (function (t) {
            try {
              var e;
              return (
                (e = t.replace(/\s+/g, "")),
                (e = (function (t) {
                  for (var e = t; e.includes("("); ) {
                    var r = h(S.exec(e), 2)[1];
                    e = e.replace(S, j(r));
                  }
                  return e;
                })(e)),
                (e = j(e))
              );
            } catch (t) {
              return "NaN";
            }
          })(t.slice(5, -1));
          return "NaN" === e ? "" : e;
        }
        var P = [
            "x",
            "y",
            "lineHeight",
            "capHeight",
            "scaleToFit",
            "textAnchor",
            "verticalAnchor",
            "fill",
          ],
          E = ["dx", "dy", "angle", "className", "breakAll"];
        function k() {
          return (k = Object.assign
            ? Object.assign.bind()
            : function (t) {
                for (var e = 1; e < arguments.length; e++) {
                  var r = arguments[e];
                  for (var n in r)
                    Object.prototype.hasOwnProperty.call(r, n) && (t[n] = r[n]);
                }
                return t;
              }).apply(this, arguments);
        }
        function _(t, e) {
          if (null == t) return {};
          var r,
            n,
            i = (function (t, e) {
              if (null == t) return {};
              var r = {};
              for (var n in t)
                if (Object.prototype.hasOwnProperty.call(t, n)) {
                  if (e.indexOf(n) >= 0) continue;
                  r[n] = t[n];
                }
              return r;
            })(t, e);
          if (Object.getOwnPropertySymbols) {
            var o = Object.getOwnPropertySymbols(t);
            for (n = 0; n < o.length; n++)
              (r = o[n]),
                !(e.indexOf(r) >= 0) &&
                  Object.prototype.propertyIsEnumerable.call(t, r) &&
                  (i[r] = t[r]);
          }
          return i;
        }
        function M(t, e) {
          return (
            (function (t) {
              if (Array.isArray(t)) return t;
            })(t) ||
            (function (t, e) {
              var r =
                null == t
                  ? null
                  : ("undefined" != typeof Symbol && t[Symbol.iterator]) ||
                    t["@@iterator"];
              if (null != r) {
                var n,
                  i,
                  o,
                  a,
                  c = [],
                  u = !0,
                  s = !1;
                try {
                  if (((o = (r = r.call(t)).next), 0 === e)) {
                    if (Object(r) !== r) return;
                    u = !1;
                  } else
                    for (
                      ;
                      !(u = (n = o.call(r)).done) &&
                      (c.push(n.value), c.length !== e);
                      u = !0
                    );
                } catch (t) {
                  (s = !0), (i = t);
                } finally {
                  try {
                    if (
                      !u &&
                      null != r.return &&
                      ((a = r.return()), Object(a) !== a)
                    )
                      return;
                  } finally {
                    if (s) throw i;
                  }
                }
                return c;
              }
            })(t, e) ||
            (function (t, e) {
              if (t) {
                if ("string" == typeof t) return T(t, e);
                var r = Object.prototype.toString.call(t).slice(8, -1);
                if (
                  ("Object" === r && t.constructor && (r = t.constructor.name),
                  "Map" === r || "Set" === r)
                )
                  return Array.from(t);
                if (
                  "Arguments" === r ||
                  /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)
                )
                  return T(t, e);
              }
            })(t, e) ||
            (function () {
              throw TypeError(
                "Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.",
              );
            })()
          );
        }
        function T(t, e) {
          (null == e || e > t.length) && (e = t.length);
          for (var r = 0, n = Array(e); r < e; r++) n[r] = t[r];
          return n;
        }
        var C = /[ \f\n\r\t\v\u2028\u2029]+/,
          N = function (t) {
            var e = t.children,
              r = t.breakAll,
              n = t.style;
            try {
              var i = [];
              a()(e) ||
                (i = r ? e.toString().split("") : e.toString().split(C));
              var o = i.map(function (t) {
                  return { word: t, width: (0, f.Pu)(t, n).width };
                }),
                c = r ? 0 : (0, f.Pu)("\xa0", n).width;
              return { wordsWithComputedWidth: o, spaceWidth: c };
            } catch (t) {
              return null;
            }
          },
          I = function (t, e, r, n, i) {
            var o,
              a = t.maxLines,
              c = t.children,
              s = t.style,
              l = t.breakAll,
              f = (0, u.Et)(a),
              p = function () {
                var t =
                  arguments.length > 0 && void 0 !== arguments[0]
                    ? arguments[0]
                    : [];
                return t.reduce(function (t, e) {
                  var o = e.word,
                    a = e.width,
                    c = t[t.length - 1];
                  return (
                    c && (null == n || i || c.width + a + r < Number(n))
                      ? (c.words.push(o), (c.width += a + r))
                      : t.push({ words: [o], width: a }),
                    t
                  );
                }, []);
              },
              h = p(e);
            if (!f) return h;
            for (
              var d = function (t) {
                  var e = p(
                    N({ breakAll: l, style: s, children: c.slice(0, t) + "…" })
                      .wordsWithComputedWidth,
                  );
                  return [
                    e.length > a ||
                      e.reduce(function (t, e) {
                        return t.width > e.width ? t : e;
                      }).width > Number(n),
                    e,
                  ];
                },
                y = 0,
                v = c.length - 1,
                m = 0;
              y <= v && m <= c.length - 1;

            ) {
              var b = Math.floor((y + v) / 2),
                g = M(d(b - 1), 2),
                x = g[0],
                w = g[1],
                O = M(d(b), 1)[0];
              if ((x || O || (y = b + 1), x && O && (v = b - 1), !x && O)) {
                o = w;
                break;
              }
              m++;
            }
            return o || h;
          },
          D = function (t) {
            return [{ words: a()(t) ? [] : t.toString().split(C) }];
          },
          B = function (t) {
            var e = t.width,
              r = t.scaleToFit,
              n = t.children,
              i = t.style,
              o = t.breakAll,
              a = t.maxLines;
            if ((e || r) && !s.m.isSsr) {
              var c = N({ breakAll: o, children: n, style: i });
              if (!c) return D(n);
              var u = c.wordsWithComputedWidth,
                l = c.spaceWidth;
              return I(
                { breakAll: o, children: n, maxLines: a, style: i },
                u,
                l,
                e,
                r,
              );
            }
            return D(n);
          },
          R = "#808080",
          L = function (t) {
            var e,
              r = t.x,
              o = void 0 === r ? 0 : r,
              a = t.y,
              s = void 0 === a ? 0 : a,
              f = t.lineHeight,
              p = void 0 === f ? "1em" : f,
              h = t.capHeight,
              d = void 0 === h ? "0.71em" : h,
              y = t.scaleToFit,
              v = void 0 !== y && y,
              m = t.textAnchor,
              b = t.verticalAnchor,
              g = t.fill,
              x = void 0 === g ? R : g,
              w = _(t, P),
              O = (0, n.useMemo)(
                function () {
                  return B({
                    breakAll: w.breakAll,
                    children: w.children,
                    maxLines: w.maxLines,
                    scaleToFit: v,
                    style: w.style,
                    width: w.width,
                  });
                },
                [w.breakAll, w.children, w.maxLines, v, w.style, w.width],
              ),
              j = w.dx,
              S = w.dy,
              M = w.angle,
              T = w.className,
              C = w.breakAll,
              N = _(w, E);
            if (!(0, u.vh)(o) || !(0, u.vh)(s)) return null;
            var I = o + ((0, u.Et)(j) ? j : 0),
              D = s + ((0, u.Et)(S) ? S : 0);
            switch (void 0 === b ? "end" : b) {
              case "start":
                e = A("calc(".concat(d, ")"));
                break;
              case "middle":
                e = A(
                  "calc("
                    .concat((O.length - 1) / 2, " * -")
                    .concat(p, " + (")
                    .concat(d, " / 2))"),
                );
                break;
              default:
                e = A("calc(".concat(O.length - 1, " * -").concat(p, ")"));
            }
            var L = [];
            if (v) {
              var z = O[0].width,
                U = w.width;
              L.push("scale(".concat(((0, u.Et)(U) ? U / z : 1) / z, ")"));
            }
            return (
              M &&
                L.push(
                  "rotate(".concat(M, ", ").concat(I, ", ").concat(D, ")"),
                ),
              L.length && (N.transform = L.join(" ")),
              i().createElement(
                "text",
                k({}, (0, l.J9)(N, !0), {
                  x: I,
                  y: D,
                  className: (0, c.A)("recharts-text", T),
                  textAnchor: void 0 === m ? "start" : m,
                  fill: x.includes("url") ? R : x,
                }),
                O.map(function (t, r) {
                  var n = t.words.join(C ? "" : " ");
                  return i().createElement(
                    "tspan",
                    {
                      x: I,
                      dy: 0 === r ? e : p,
                      key: "".concat(n, "-").concat(r),
                    },
                    n,
                  );
                }),
              )
            );
          };
      },
      6359: (t, e, r) => {
        "use strict";
        var n = r(85412),
          i = 1 / 0;
        t.exports = function (t) {
          if ("string" == typeof t || n(t)) return t;
          var e = t + "";
          return "0" == e && 1 / t == -i ? "-0" : e;
        };
      },
      6394: (t, e, r) => {
        "use strict";
        t = r.nmd(t);
        var n = r(40671),
          i = r(45141),
          o = e && !e.nodeType && e,
          a = o && t && !t.nodeType && t,
          c = a && a.exports === o ? n.Buffer : void 0,
          u = c ? c.isBuffer : void 0;
        t.exports = u || i;
      },
      6431: (t, e, r) => {
        "use strict";
        var n = r(74631);
        t.exports = r(19075)(n);
      },
      6544: (t, e, r) => {
        "use strict";
        r.d(e, { J: () => d, M: () => v });
        var n = r(84205),
          i = r.n(n),
          o = r(79029),
          a = r(7469),
          c = r(18862);
        function u(t) {
          return (u =
            "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
              ? function (t) {
                  return typeof t;
                }
              : function (t) {
                  return t &&
                    "function" == typeof Symbol &&
                    t.constructor === Symbol &&
                    t !== Symbol.prototype
                    ? "symbol"
                    : typeof t;
                })(t);
        }
        function s() {
          return (s = Object.assign
            ? Object.assign.bind()
            : function (t) {
                for (var e = 1; e < arguments.length; e++) {
                  var r = arguments[e];
                  for (var n in r)
                    Object.prototype.hasOwnProperty.call(r, n) && (t[n] = r[n]);
                }
                return t;
              }).apply(this, arguments);
        }
        function l(t, e) {
          (null == e || e > t.length) && (e = t.length);
          for (var r = 0, n = Array(e); r < e; r++) n[r] = t[r];
          return n;
        }
        function f(t, e) {
          var r = Object.keys(t);
          if (Object.getOwnPropertySymbols) {
            var n = Object.getOwnPropertySymbols(t);
            e &&
              (n = n.filter(function (e) {
                return Object.getOwnPropertyDescriptor(t, e).enumerable;
              })),
              r.push.apply(r, n);
          }
          return r;
        }
        function p(t) {
          for (var e = 1; e < arguments.length; e++) {
            var r = null != arguments[e] ? arguments[e] : {};
            e % 2
              ? f(Object(r), !0).forEach(function (e) {
                  var n, i, o;
                  (n = t),
                    (i = e),
                    (o = r[e]),
                    (i = (function (t) {
                      var e = (function (t, e) {
                        if ("object" != u(t) || !t) return t;
                        var r = t[Symbol.toPrimitive];
                        if (void 0 !== r) {
                          var n = r.call(t, e || "default");
                          if ("object" != u(n)) return n;
                          throw TypeError(
                            "@@toPrimitive must return a primitive value.",
                          );
                        }
                        return ("string" === e ? String : Number)(t);
                      })(t, "string");
                      return "symbol" == u(e) ? e : e + "";
                    })(i)) in n
                      ? Object.defineProperty(n, i, {
                          value: o,
                          enumerable: !0,
                          configurable: !0,
                          writable: !0,
                        })
                      : (n[i] = o);
                })
              : Object.getOwnPropertyDescriptors
                ? Object.defineProperties(
                    t,
                    Object.getOwnPropertyDescriptors(r),
                  )
                : f(Object(r)).forEach(function (e) {
                    Object.defineProperty(
                      t,
                      e,
                      Object.getOwnPropertyDescriptor(r, e),
                    );
                  });
          }
          return t;
        }
        var h = function (t, e, r, n, i) {
            var o,
              a = Math.min(Math.abs(r) / 2, Math.abs(n) / 2),
              c = n >= 0 ? 1 : -1,
              u = r >= 0 ? 1 : -1,
              s = +((n >= 0 && r >= 0) || (n < 0 && r < 0));
            if (a > 0 && i instanceof Array) {
              for (var l = [0, 0, 0, 0], f = 0; f < 4; f++)
                l[f] = i[f] > a ? a : i[f];
              (o = "M".concat(t, ",").concat(e + c * l[0])),
                l[0] > 0 &&
                  (o += "A "
                    .concat(l[0], ",")
                    .concat(l[0], ",0,0,")
                    .concat(s, ",")
                    .concat(t + u * l[0], ",")
                    .concat(e)),
                (o += "L ".concat(t + r - u * l[1], ",").concat(e)),
                l[1] > 0 &&
                  (o += "A "
                    .concat(l[1], ",")
                    .concat(l[1], ",0,0,")
                    .concat(s, ",\n        ")
                    .concat(t + r, ",")
                    .concat(e + c * l[1])),
                (o += "L ".concat(t + r, ",").concat(e + n - c * l[2])),
                l[2] > 0 &&
                  (o += "A "
                    .concat(l[2], ",")
                    .concat(l[2], ",0,0,")
                    .concat(s, ",\n        ")
                    .concat(t + r - u * l[2], ",")
                    .concat(e + n)),
                (o += "L ".concat(t + u * l[3], ",").concat(e + n)),
                l[3] > 0 &&
                  (o += "A "
                    .concat(l[3], ",")
                    .concat(l[3], ",0,0,")
                    .concat(s, ",\n        ")
                    .concat(t, ",")
                    .concat(e + n - c * l[3])),
                (o += "Z");
            } else if (a > 0 && i === +i && i > 0) {
              var p = Math.min(a, i);
              o = "M "
                .concat(t, ",")
                .concat(e + c * p, "\n            A ")
                .concat(p, ",")
                .concat(p, ",0,0,")
                .concat(s, ",")
                .concat(t + u * p, ",")
                .concat(e, "\n            L ")
                .concat(t + r - u * p, ",")
                .concat(e, "\n            A ")
                .concat(p, ",")
                .concat(p, ",0,0,")
                .concat(s, ",")
                .concat(t + r, ",")
                .concat(e + c * p, "\n            L ")
                .concat(t + r, ",")
                .concat(e + n - c * p, "\n            A ")
                .concat(p, ",")
                .concat(p, ",0,0,")
                .concat(s, ",")
                .concat(t + r - u * p, ",")
                .concat(e + n, "\n            L ")
                .concat(t + u * p, ",")
                .concat(e + n, "\n            A ")
                .concat(p, ",")
                .concat(p, ",0,0,")
                .concat(s, ",")
                .concat(t, ",")
                .concat(e + n - c * p, " Z");
            } else
              o = "M "
                .concat(t, ",")
                .concat(e, " h ")
                .concat(r, " v ")
                .concat(n, " h ")
                .concat(-r, " Z");
            return o;
          },
          d = function (t, e) {
            if (!t || !e) return !1;
            var r = t.x,
              n = t.y,
              i = e.x,
              o = e.y,
              a = e.width,
              c = e.height;
            if (Math.abs(a) > 0 && Math.abs(c) > 0) {
              var u = Math.min(i, i + a),
                s = Math.max(i, i + a),
                l = Math.min(o, o + c),
                f = Math.max(o, o + c);
              return r >= u && r <= s && n >= l && n <= f;
            }
            return !1;
          },
          y = {
            x: 0,
            y: 0,
            width: 0,
            height: 0,
            radius: 0,
            isAnimationActive: !1,
            isUpdateAnimationActive: !1,
            animationBegin: 0,
            animationDuration: 1500,
            animationEasing: "ease",
          },
          v = function (t) {
            var e,
              r = p(p({}, y), t),
              u = (0, n.useRef)(),
              f =
                (function (t) {
                  if (Array.isArray(t)) return t;
                })((e = (0, n.useState)(-1))) ||
                (function (t, e) {
                  var r =
                    null == t
                      ? null
                      : ("undefined" != typeof Symbol && t[Symbol.iterator]) ||
                        t["@@iterator"];
                  if (null != r) {
                    var n,
                      i,
                      o,
                      a,
                      c = [],
                      u = !0,
                      s = !1;
                    try {
                      (o = (r = r.call(t)).next), !1;
                      for (
                        ;
                        !(u = (n = o.call(r)).done) &&
                        (c.push(n.value), c.length !== e);
                        u = !0
                      );
                    } catch (t) {
                      (s = !0), (i = t);
                    } finally {
                      try {
                        if (
                          !u &&
                          null != r.return &&
                          ((a = r.return()), Object(a) !== a)
                        )
                          return;
                      } finally {
                        if (s) throw i;
                      }
                    }
                    return c;
                  }
                })(e, 2) ||
                (function (t, e) {
                  if (t) {
                    if ("string" == typeof t) return l(t, 2);
                    var r = Object.prototype.toString.call(t).slice(8, -1);
                    if (
                      ("Object" === r &&
                        t.constructor &&
                        (r = t.constructor.name),
                      "Map" === r || "Set" === r)
                    )
                      return Array.from(t);
                    if (
                      "Arguments" === r ||
                      /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)
                    )
                      return l(t, e);
                  }
                })(e, 2) ||
                (function () {
                  throw TypeError(
                    "Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.",
                  );
                })(),
              d = f[0],
              v = f[1];
            (0, n.useEffect)(function () {
              if (u.current && u.current.getTotalLength)
                try {
                  var t = u.current.getTotalLength();
                  t && v(t);
                } catch (t) {}
            }, []);
            var m = r.x,
              b = r.y,
              g = r.width,
              x = r.height,
              w = r.radius,
              O = r.className,
              j = r.animationEasing,
              S = r.animationDuration,
              A = r.animationBegin,
              P = r.isAnimationActive,
              E = r.isUpdateAnimationActive;
            if (
              m !== +m ||
              b !== +b ||
              g !== +g ||
              x !== +x ||
              0 === g ||
              0 === x
            )
              return null;
            var k = (0, o.A)("recharts-rectangle", O);
            return E
              ? i().createElement(
                  a.Ay,
                  {
                    canBegin: d > 0,
                    from: { width: g, height: x, x: m, y: b },
                    to: { width: g, height: x, x: m, y: b },
                    duration: S,
                    animationEasing: j,
                    isActive: E,
                  },
                  function (t) {
                    var e = t.width,
                      n = t.height,
                      o = t.x,
                      l = t.y;
                    return i().createElement(
                      a.Ay,
                      {
                        canBegin: d > 0,
                        from: "0px ".concat(-1 === d ? 1 : d, "px"),
                        to: "".concat(d, "px 0px"),
                        attributeName: "strokeDasharray",
                        begin: A,
                        duration: S,
                        isActive: P,
                        easing: j,
                      },
                      i().createElement(
                        "path",
                        s({}, (0, c.J9)(r, !0), {
                          className: k,
                          d: h(o, l, e, n, w),
                          ref: u,
                        }),
                      ),
                    );
                  },
                )
              : i().createElement(
                  "path",
                  s({}, (0, c.J9)(r, !0), {
                    className: k,
                    d: h(m, b, g, x, w),
                  }),
                );
          };
      },
      6962: (t, e, r) => {
        "use strict";
        var n = r(47091),
          i = (function () {
            var t = /[^.]+$/.exec((n && n.keys && n.keys.IE_PROTO) || "");
            return t ? "Symbol(src)_1." + t : "";
          })();
        t.exports = function (t) {
          return !!i && i in t;
        };
      },
      7154: (t, e, r) => {
        "use strict";
        function n(t, e) {
          switch (arguments.length) {
            case 0:
              break;
            case 1:
              this.range(t);
              break;
            default:
              this.range(e).domain(t);
          }
          return this;
        }
        function i(t, e) {
          switch (arguments.length) {
            case 0:
              break;
            case 1:
              "function" == typeof t ? this.interpolator(t) : this.range(t);
              break;
            default:
              this.domain(t),
                "function" == typeof e ? this.interpolator(e) : this.range(e);
          }
          return this;
        }
        r.d(e, { C: () => n, K: () => i });
      },
      7469: (t, e, r) => {
        "use strict";
        r.d(e, { Ay: () => tA });
        var n = r(84205),
          i = r.n(n),
          o = r(31090),
          a = r.n(o),
          c = Object.getOwnPropertyNames,
          u = Object.getOwnPropertySymbols,
          s = Object.prototype.hasOwnProperty;
        function l(t, e) {
          return function (r, n, i) {
            return t(r, n, i) && e(r, n, i);
          };
        }
        function f(t) {
          return function (e, r, n) {
            if (!e || !r || "object" != typeof e || "object" != typeof r)
              return t(e, r, n);
            var i = n.cache,
              o = i.get(e),
              a = i.get(r);
            if (o && a) return o === r && a === e;
            i.set(e, r), i.set(r, e);
            var c = t(e, r, n);
            return i.delete(e), i.delete(r), c;
          };
        }
        function p(t) {
          return c(t).concat(u(t));
        }
        var h =
          Object.hasOwn ||
          function (t, e) {
            return s.call(t, e);
          };
        function d(t, e) {
          return t === e || (!t && !e && t != t && e != e);
        }
        var y = Object.getOwnPropertyDescriptor,
          v = Object.keys;
        function m(t, e, r) {
          var n = t.length;
          if (e.length !== n) return !1;
          for (; n-- > 0; ) if (!r.equals(t[n], e[n], n, n, t, e, r)) return !1;
          return !0;
        }
        function b(t, e) {
          return d(t.getTime(), e.getTime());
        }
        function g(t, e) {
          return (
            t.name === e.name &&
            t.message === e.message &&
            t.cause === e.cause &&
            t.stack === e.stack
          );
        }
        function x(t, e) {
          return t === e;
        }
        function w(t, e, r) {
          var n,
            i,
            o = t.size;
          if (o !== e.size) return !1;
          if (!o) return !0;
          for (
            var a = Array(o), c = t.entries(), u = 0;
            (n = c.next()) && !n.done;

          ) {
            for (
              var s = e.entries(), l = !1, f = 0;
              (i = s.next()) && !i.done;

            ) {
              if (a[f]) {
                f++;
                continue;
              }
              var p = n.value,
                h = i.value;
              if (
                r.equals(p[0], h[0], u, f, t, e, r) &&
                r.equals(p[1], h[1], p[0], h[0], t, e, r)
              ) {
                l = a[f] = !0;
                break;
              }
              f++;
            }
            if (!l) return !1;
            u++;
          }
          return !0;
        }
        function O(t, e, r) {
          var n = v(t),
            i = n.length;
          if (v(e).length !== i) return !1;
          for (; i-- > 0; ) if (!_(t, e, r, n[i])) return !1;
          return !0;
        }
        function j(t, e, r) {
          var n,
            i,
            o,
            a = p(t),
            c = a.length;
          if (p(e).length !== c) return !1;
          for (; c-- > 0; )
            if (
              !_(t, e, r, (n = a[c])) ||
              ((i = y(t, n)),
              (o = y(e, n)),
              (i || o) &&
                (!i ||
                  !o ||
                  i.configurable !== o.configurable ||
                  i.enumerable !== o.enumerable ||
                  i.writable !== o.writable))
            )
              return !1;
          return !0;
        }
        function S(t, e) {
          return d(t.valueOf(), e.valueOf());
        }
        function A(t, e) {
          return t.source === e.source && t.flags === e.flags;
        }
        function P(t, e, r) {
          var n,
            i,
            o = t.size;
          if (o !== e.size) return !1;
          if (!o) return !0;
          for (var a = Array(o), c = t.values(); (n = c.next()) && !n.done; ) {
            for (
              var u = e.values(), s = !1, l = 0;
              (i = u.next()) && !i.done;

            ) {
              if (
                !a[l] &&
                r.equals(n.value, i.value, n.value, i.value, t, e, r)
              ) {
                s = a[l] = !0;
                break;
              }
              l++;
            }
            if (!s) return !1;
          }
          return !0;
        }
        function E(t, e) {
          var r = t.length;
          if (e.length !== r) return !1;
          for (; r-- > 0; ) if (t[r] !== e[r]) return !1;
          return !0;
        }
        function k(t, e) {
          return (
            t.hostname === e.hostname &&
            t.pathname === e.pathname &&
            t.protocol === e.protocol &&
            t.port === e.port &&
            t.hash === e.hash &&
            t.username === e.username &&
            t.password === e.password
          );
        }
        function _(t, e, r, n) {
          return (
            (("_owner" === n || "__o" === n || "__v" === n) &&
              (!!t.$$typeof || !!e.$$typeof)) ||
            (h(e, n) && r.equals(t[n], e[n], n, n, t, e, r))
          );
        }
        var M = Array.isArray,
          T =
            "function" == typeof ArrayBuffer && ArrayBuffer.isView
              ? ArrayBuffer.isView
              : null,
          C = Object.assign,
          N = Object.prototype.toString.call.bind(Object.prototype.toString),
          I = D();
        function D(t) {
          void 0 === t && (t = {});
          var e,
            r,
            n,
            i,
            o,
            a,
            c,
            u,
            s,
            p,
            h,
            y,
            v,
            _ = t.circular,
            I = t.createInternalComparator,
            D = t.createState,
            B = t.strict,
            R =
              ((r = (e = (function (t) {
                var e = t.circular,
                  r = t.createCustomConfig,
                  n = t.strict,
                  i = {
                    areArraysEqual: n ? j : m,
                    areDatesEqual: b,
                    areErrorsEqual: g,
                    areFunctionsEqual: x,
                    areMapsEqual: n ? l(w, j) : w,
                    areNumbersEqual: d,
                    areObjectsEqual: n ? j : O,
                    arePrimitiveWrappersEqual: S,
                    areRegExpsEqual: A,
                    areSetsEqual: n ? l(P, j) : P,
                    areTypedArraysEqual: n ? j : E,
                    areUrlsEqual: k,
                  };
                if ((r && (i = C({}, i, r(i))), e)) {
                  var o = f(i.areArraysEqual),
                    a = f(i.areMapsEqual),
                    c = f(i.areObjectsEqual),
                    u = f(i.areSetsEqual);
                  i = C({}, i, {
                    areArraysEqual: o,
                    areMapsEqual: a,
                    areObjectsEqual: c,
                    areSetsEqual: u,
                  });
                }
                return i;
              })(t)).areArraysEqual),
              (n = e.areDatesEqual),
              (i = e.areErrorsEqual),
              (o = e.areFunctionsEqual),
              (a = e.areMapsEqual),
              (c = e.areNumbersEqual),
              (u = e.areObjectsEqual),
              (s = e.arePrimitiveWrappersEqual),
              (p = e.areRegExpsEqual),
              (h = e.areSetsEqual),
              (y = e.areTypedArraysEqual),
              (v = e.areUrlsEqual),
              function (t, e, l) {
                if (t === e) return !0;
                if (null == t || null == e) return !1;
                var f = typeof t;
                if (f !== typeof e) return !1;
                if ("object" !== f)
                  return "number" === f
                    ? c(t, e, l)
                    : "function" === f && o(t, e, l);
                var d = t.constructor;
                if (d !== e.constructor) return !1;
                if (d === Object) return u(t, e, l);
                if (M(t)) return r(t, e, l);
                if (null != T && T(t)) return y(t, e, l);
                if (d === Date) return n(t, e, l);
                if (d === RegExp) return p(t, e, l);
                if (d === Map) return a(t, e, l);
                if (d === Set) return h(t, e, l);
                var m = N(t);
                return "[object Date]" === m
                  ? n(t, e, l)
                  : "[object RegExp]" === m
                    ? p(t, e, l)
                    : "[object Map]" === m
                      ? a(t, e, l)
                      : "[object Set]" === m
                        ? h(t, e, l)
                        : "[object Object]" === m
                          ? "function" != typeof t.then &&
                            "function" != typeof e.then &&
                            u(t, e, l)
                          : "[object URL]" === m
                            ? v(t, e, l)
                            : "[object Error]" === m
                              ? i(t, e, l)
                              : "[object Arguments]" === m
                                ? u(t, e, l)
                                : ("[object Boolean]" === m ||
                                    "[object Number]" === m ||
                                    "[object String]" === m) &&
                                  s(t, e, l);
              }),
            L = I
              ? I(R)
              : function (t, e, r, n, i, o, a) {
                  return R(t, e, a);
                };
          return (function (t) {
            var e = t.circular,
              r = t.comparator,
              n = t.createState,
              i = t.equals,
              o = t.strict;
            if (n)
              return function (t, a) {
                var c = n(),
                  u = c.cache;
                return r(t, a, {
                  cache: void 0 === u ? (e ? new WeakMap() : void 0) : u,
                  equals: i,
                  meta: c.meta,
                  strict: o,
                });
              };
            if (e)
              return function (t, e) {
                return r(t, e, {
                  cache: new WeakMap(),
                  equals: i,
                  meta: void 0,
                  strict: o,
                });
              };
            var a = { cache: void 0, equals: i, meta: void 0, strict: o };
            return function (t, e) {
              return r(t, e, a);
            };
          })({
            circular: void 0 !== _ && _,
            comparator: R,
            createState: D,
            equals: L,
            strict: void 0 !== B && B,
          });
        }
        function B(t) {
          var e =
              arguments.length > 1 && void 0 !== arguments[1]
                ? arguments[1]
                : 0,
            r = -1;
          requestAnimationFrame(function n(i) {
            if ((r < 0 && (r = i), i - r > e)) t(i), (r = -1);
            else {
              var o;
              (o = n),
                "undefined" != typeof requestAnimationFrame &&
                  requestAnimationFrame(o);
            }
          });
        }
        function R(t) {
          return (R =
            "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
              ? function (t) {
                  return typeof t;
                }
              : function (t) {
                  return t &&
                    "function" == typeof Symbol &&
                    t.constructor === Symbol &&
                    t !== Symbol.prototype
                    ? "symbol"
                    : typeof t;
                })(t);
        }
        function L(t, e) {
          (null == e || e > t.length) && (e = t.length);
          for (var r = 0, n = Array(e); r < e; r++) n[r] = t[r];
          return n;
        }
        function z(t) {
          return (z =
            "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
              ? function (t) {
                  return typeof t;
                }
              : function (t) {
                  return t &&
                    "function" == typeof Symbol &&
                    t.constructor === Symbol &&
                    t !== Symbol.prototype
                    ? "symbol"
                    : typeof t;
                })(t);
        }
        function U(t, e) {
          var r = Object.keys(t);
          if (Object.getOwnPropertySymbols) {
            var n = Object.getOwnPropertySymbols(t);
            e &&
              (n = n.filter(function (e) {
                return Object.getOwnPropertyDescriptor(t, e).enumerable;
              })),
              r.push.apply(r, n);
          }
          return r;
        }
        function F(t) {
          for (var e = 1; e < arguments.length; e++) {
            var r = null != arguments[e] ? arguments[e] : {};
            e % 2
              ? U(Object(r), !0).forEach(function (e) {
                  q(t, e, r[e]);
                })
              : Object.getOwnPropertyDescriptors
                ? Object.defineProperties(
                    t,
                    Object.getOwnPropertyDescriptors(r),
                  )
                : U(Object(r)).forEach(function (e) {
                    Object.defineProperty(
                      t,
                      e,
                      Object.getOwnPropertyDescriptor(r, e),
                    );
                  });
          }
          return t;
        }
        function q(t, e, r) {
          var n;
          return (
            ((n = (function (t, e) {
              if ("object" !== z(t) || null === t) return t;
              var r = t[Symbol.toPrimitive];
              if (void 0 !== r) {
                var n = r.call(t, e || "default");
                if ("object" !== z(n)) return n;
                throw TypeError("@@toPrimitive must return a primitive value.");
              }
              return ("string" === e ? String : Number)(t);
            })(e, "string")),
            (e = "symbol" === z(n) ? n : String(n)) in t)
              ? Object.defineProperty(t, e, {
                  value: r,
                  enumerable: !0,
                  configurable: !0,
                  writable: !0,
                })
              : (t[e] = r),
            t
          );
        }
        D({ strict: !0 }),
          D({ circular: !0 }),
          D({ circular: !0, strict: !0 }),
          D({
            createInternalComparator: function () {
              return d;
            },
          }),
          D({
            strict: !0,
            createInternalComparator: function () {
              return d;
            },
          }),
          D({
            circular: !0,
            createInternalComparator: function () {
              return d;
            },
          }),
          D({
            circular: !0,
            createInternalComparator: function () {
              return d;
            },
            strict: !0,
          });
        var $ = function (t) {
            return t;
          },
          W = function (t, e) {
            return Object.keys(e).reduce(function (r, n) {
              return F(F({}, r), {}, q({}, n, t(n, e[n])));
            }, {});
          },
          X = function (t, e, r) {
            return t
              .map(function (t) {
                return ""
                  .concat(
                    t.replace(/([A-Z])/g, function (t) {
                      return "-".concat(t.toLowerCase());
                    }),
                    " ",
                  )
                  .concat(e, "ms ")
                  .concat(r);
              })
              .join(",");
          },
          H = function (t, e, r, n, i, o, a, c) {};
        function V(t, e) {
          if (t) {
            if ("string" == typeof t) return K(t, e);
            var r = Object.prototype.toString.call(t).slice(8, -1);
            if (
              ("Object" === r && t.constructor && (r = t.constructor.name),
              "Map" === r || "Set" === r)
            )
              return Array.from(t);
            if (
              "Arguments" === r ||
              /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)
            )
              return K(t, e);
          }
        }
        function K(t, e) {
          (null == e || e > t.length) && (e = t.length);
          for (var r = 0, n = Array(e); r < e; r++) n[r] = t[r];
          return n;
        }
        var G = function (t, e) {
            return [0, 3 * t, 3 * e - 6 * t, 3 * t - 3 * e + 1];
          },
          J = function (t, e) {
            return t
              .map(function (t, r) {
                return t * Math.pow(e, r);
              })
              .reduce(function (t, e) {
                return t + e;
              });
          },
          Y = function (t, e) {
            return function (r) {
              return J(G(t, e), r);
            };
          },
          Z = function () {
            for (
              var t, e, r = arguments.length, n = Array(r), i = 0;
              i < r;
              i++
            )
              n[i] = arguments[i];
            var o = n[0],
              a = n[1],
              c = n[2],
              u = n[3];
            if (1 === n.length)
              switch (n[0]) {
                case "linear":
                  (o = 0), (a = 0), (c = 1), (u = 1);
                  break;
                case "ease":
                  (o = 0.25), (a = 0.1), (c = 0.25), (u = 1);
                  break;
                case "ease-in":
                  (o = 0.42), (a = 0), (c = 1), (u = 1);
                  break;
                case "ease-out":
                  (o = 0.42), (a = 0), (c = 0.58), (u = 1);
                  break;
                case "ease-in-out":
                  (o = 0), (a = 0), (c = 0.58), (u = 1);
                  break;
                default:
                  var s = n[0].split("(");
                  if (
                    "cubic-bezier" === s[0] &&
                    4 === s[1].split(")")[0].split(",").length
                  ) {
                    var l,
                      f =
                        (function (t) {
                          if (Array.isArray(t)) return t;
                        })(
                          (l = s[1]
                            .split(")")[0]
                            .split(",")
                            .map(function (t) {
                              return parseFloat(t);
                            })),
                        ) ||
                        (function (t, e) {
                          var r =
                            null == t
                              ? null
                              : ("undefined" != typeof Symbol &&
                                  t[Symbol.iterator]) ||
                                t["@@iterator"];
                          if (null != r) {
                            var n,
                              i,
                              o,
                              a,
                              c = [],
                              u = !0,
                              s = !1;
                            try {
                              (o = (r = r.call(t)).next), !1;
                              for (
                                ;
                                !(u = (n = o.call(r)).done) &&
                                (c.push(n.value), c.length !== e);
                                u = !0
                              );
                            } catch (t) {
                              (s = !0), (i = t);
                            } finally {
                              try {
                                if (
                                  !u &&
                                  null != r.return &&
                                  ((a = r.return()), Object(a) !== a)
                                )
                                  return;
                              } finally {
                                if (s) throw i;
                              }
                            }
                            return c;
                          }
                        })(l, 4) ||
                        V(l, 4) ||
                        (function () {
                          throw TypeError(
                            "Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.",
                          );
                        })();
                    (o = f[0]), (a = f[1]), (c = f[2]), (u = f[3]);
                  } else
                    H(
                      !1,
                      "[configBezier]: arguments should be one of oneOf 'linear', 'ease', 'ease-in', 'ease-out', 'ease-in-out','cubic-bezier(x1,y1,x2,y2)', instead received %s",
                      n,
                    );
              }
            H(
              [o, c, a, u].every(function (t) {
                return "number" == typeof t && t >= 0 && t <= 1;
              }),
              "[configBezier]: arguments should be x1, y1, x2, y2 of [0, 1] instead received %s",
              n,
            );
            var p = Y(o, c),
              h = Y(a, u),
              d =
                ((t = o),
                (e = c),
                function (r) {
                  var n;
                  return J(
                    [].concat(
                      (function (t) {
                        if (Array.isArray(t)) return K(t);
                      })(
                        (n = G(t, e)
                          .map(function (t, e) {
                            return t * e;
                          })
                          .slice(1)),
                      ) ||
                        (function (t) {
                          if (
                            ("undefined" != typeof Symbol &&
                              null != t[Symbol.iterator]) ||
                            null != t["@@iterator"]
                          )
                            return Array.from(t);
                        })(n) ||
                        V(n) ||
                        (function () {
                          throw TypeError(
                            "Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.",
                          );
                        })(),
                      [0],
                    ),
                    r,
                  );
                }),
              y = function (t) {
                for (var e = t > 1 ? 1 : t, r = e, n = 0; n < 8; ++n) {
                  var i,
                    o = p(r) - e,
                    a = d(r);
                  if (1e-4 > Math.abs(o - e) || a < 1e-4) break;
                  r = (i = r - o / a) > 1 ? 1 : i < 0 ? 0 : i;
                }
                return h(r);
              };
            return (y.isStepper = !1), y;
          },
          Q = function () {
            var t =
                arguments.length > 0 && void 0 !== arguments[0]
                  ? arguments[0]
                  : {},
              e = t.stiff,
              r = void 0 === e ? 100 : e,
              n = t.damping,
              i = void 0 === n ? 8 : n,
              o = t.dt,
              a = void 0 === o ? 17 : o,
              c = function (t, e, n) {
                var o = n + ((-(t - e) * r - n * i) * a) / 1e3,
                  c = (n * a) / 1e3 + t;
                return 1e-4 > Math.abs(c - e) && 1e-4 > Math.abs(o)
                  ? [e, 0]
                  : [c, o];
              };
            return (c.isStepper = !0), (c.dt = a), c;
          },
          tt = function () {
            for (var t = arguments.length, e = Array(t), r = 0; r < t; r++)
              e[r] = arguments[r];
            var n = e[0];
            if ("string" == typeof n)
              switch (n) {
                case "ease":
                case "ease-in-out":
                case "ease-out":
                case "ease-in":
                case "linear":
                  return Z(n);
                case "spring":
                  return Q();
                default:
                  if ("cubic-bezier" === n.split("(")[0]) return Z(n);
                  H(
                    !1,
                    "[configEasing]: first argument should be one of 'ease', 'ease-in', 'ease-out', 'ease-in-out','cubic-bezier(x1,y1,x2,y2)', 'linear' and 'spring', instead  received %s",
                    e,
                  );
              }
            return "function" == typeof n
              ? n
              : (H(
                  !1,
                  "[configEasing]: first argument type should be function or string, instead received %s",
                  e,
                ),
                null);
          };
        function te(t) {
          return (te =
            "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
              ? function (t) {
                  return typeof t;
                }
              : function (t) {
                  return t &&
                    "function" == typeof Symbol &&
                    t.constructor === Symbol &&
                    t !== Symbol.prototype
                    ? "symbol"
                    : typeof t;
                })(t);
        }
        function tr(t) {
          return (
            (function (t) {
              if (Array.isArray(t)) return tc(t);
            })(t) ||
            (function (t) {
              if (
                ("undefined" != typeof Symbol && null != t[Symbol.iterator]) ||
                null != t["@@iterator"]
              )
                return Array.from(t);
            })(t) ||
            ta(t) ||
            (function () {
              throw TypeError(
                "Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.",
              );
            })()
          );
        }
        function tn(t, e) {
          var r = Object.keys(t);
          if (Object.getOwnPropertySymbols) {
            var n = Object.getOwnPropertySymbols(t);
            e &&
              (n = n.filter(function (e) {
                return Object.getOwnPropertyDescriptor(t, e).enumerable;
              })),
              r.push.apply(r, n);
          }
          return r;
        }
        function ti(t) {
          for (var e = 1; e < arguments.length; e++) {
            var r = null != arguments[e] ? arguments[e] : {};
            e % 2
              ? tn(Object(r), !0).forEach(function (e) {
                  to(t, e, r[e]);
                })
              : Object.getOwnPropertyDescriptors
                ? Object.defineProperties(
                    t,
                    Object.getOwnPropertyDescriptors(r),
                  )
                : tn(Object(r)).forEach(function (e) {
                    Object.defineProperty(
                      t,
                      e,
                      Object.getOwnPropertyDescriptor(r, e),
                    );
                  });
          }
          return t;
        }
        function to(t, e, r) {
          var n;
          return (
            ((n = (function (t, e) {
              if ("object" !== te(t) || null === t) return t;
              var r = t[Symbol.toPrimitive];
              if (void 0 !== r) {
                var n = r.call(t, e || "default");
                if ("object" !== te(n)) return n;
                throw TypeError("@@toPrimitive must return a primitive value.");
              }
              return ("string" === e ? String : Number)(t);
            })(e, "string")),
            (e = "symbol" === te(n) ? n : String(n)) in t)
              ? Object.defineProperty(t, e, {
                  value: r,
                  enumerable: !0,
                  configurable: !0,
                  writable: !0,
                })
              : (t[e] = r),
            t
          );
        }
        function ta(t, e) {
          if (t) {
            if ("string" == typeof t) return tc(t, e);
            var r = Object.prototype.toString.call(t).slice(8, -1);
            if (
              ("Object" === r && t.constructor && (r = t.constructor.name),
              "Map" === r || "Set" === r)
            )
              return Array.from(t);
            if (
              "Arguments" === r ||
              /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)
            )
              return tc(t, e);
          }
        }
        function tc(t, e) {
          (null == e || e > t.length) && (e = t.length);
          for (var r = 0, n = Array(e); r < e; r++) n[r] = t[r];
          return n;
        }
        var tu = function (t, e, r) {
            return t + (e - t) * r;
          },
          ts = function (t) {
            return t.from !== t.to;
          },
          tl = function t(e, r, n) {
            var i = W(function (t, r) {
              if (ts(r)) {
                var n,
                  i =
                    (function (t) {
                      if (Array.isArray(t)) return t;
                    })((n = e(r.from, r.to, r.velocity))) ||
                    (function (t, e) {
                      var r =
                        null == t
                          ? null
                          : ("undefined" != typeof Symbol &&
                              t[Symbol.iterator]) ||
                            t["@@iterator"];
                      if (null != r) {
                        var n,
                          i,
                          o,
                          a,
                          c = [],
                          u = !0,
                          s = !1;
                        try {
                          (o = (r = r.call(t)).next), !1;
                          for (
                            ;
                            !(u = (n = o.call(r)).done) &&
                            (c.push(n.value), c.length !== e);
                            u = !0
                          );
                        } catch (t) {
                          (s = !0), (i = t);
                        } finally {
                          try {
                            if (
                              !u &&
                              null != r.return &&
                              ((a = r.return()), Object(a) !== a)
                            )
                              return;
                          } finally {
                            if (s) throw i;
                          }
                        }
                        return c;
                      }
                    })(n, 2) ||
                    ta(n, 2) ||
                    (function () {
                      throw TypeError(
                        "Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.",
                      );
                    })(),
                  o = i[0],
                  a = i[1];
                return ti(ti({}, r), {}, { from: o, velocity: a });
              }
              return r;
            }, r);
            return n < 1
              ? W(function (t, e) {
                  return ts(e)
                    ? ti(
                        ti({}, e),
                        {},
                        {
                          velocity: tu(e.velocity, i[t].velocity, n),
                          from: tu(e.from, i[t].from, n),
                        },
                      )
                    : e;
                }, r)
              : t(e, i, n - 1);
          };
        let tf = function (t, e, r, n, i) {
          var o,
            a,
            c = [Object.keys(t), Object.keys(e)].reduce(function (t, e) {
              return t.filter(function (t) {
                return e.includes(t);
              });
            }),
            u = c.reduce(function (r, n) {
              return ti(ti({}, r), {}, to({}, n, [t[n], e[n]]));
            }, {}),
            s = c.reduce(function (r, n) {
              return ti(
                ti({}, r),
                {},
                to({}, n, { from: t[n], velocity: 0, to: e[n] }),
              );
            }, {}),
            l = -1,
            f = function () {
              return null;
            };
          return (
            (f = r.isStepper
              ? function (n) {
                  o || (o = n);
                  var a = (n - o) / r.dt;
                  (s = tl(r, s, a)),
                    i(
                      ti(
                        ti(ti({}, t), e),
                        W(function (t, e) {
                          return e.from;
                        }, s),
                      ),
                    ),
                    (o = n),
                    Object.values(s).filter(ts).length &&
                      (l = requestAnimationFrame(f));
                }
              : function (o) {
                  a || (a = o);
                  var c = (o - a) / n,
                    s = W(function (t, e) {
                      return tu.apply(void 0, tr(e).concat([r(c)]));
                    }, u);
                  if ((i(ti(ti(ti({}, t), e), s)), c < 1))
                    l = requestAnimationFrame(f);
                  else {
                    var p = W(function (t, e) {
                      return tu.apply(void 0, tr(e).concat([r(1)]));
                    }, u);
                    i(ti(ti(ti({}, t), e), p));
                  }
                }),
            function () {
              return (
                requestAnimationFrame(f),
                function () {
                  cancelAnimationFrame(l);
                }
              );
            }
          );
        };
        function tp(t) {
          return (tp =
            "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
              ? function (t) {
                  return typeof t;
                }
              : function (t) {
                  return t &&
                    "function" == typeof Symbol &&
                    t.constructor === Symbol &&
                    t !== Symbol.prototype
                    ? "symbol"
                    : typeof t;
                })(t);
        }
        var th = [
          "children",
          "begin",
          "duration",
          "attributeName",
          "easing",
          "isActive",
          "steps",
          "from",
          "to",
          "canBegin",
          "onAnimationEnd",
          "shouldReAnimate",
          "onAnimationReStart",
        ];
        function td(t) {
          return (
            (function (t) {
              if (Array.isArray(t)) return ty(t);
            })(t) ||
            (function (t) {
              if (
                ("undefined" != typeof Symbol && null != t[Symbol.iterator]) ||
                null != t["@@iterator"]
              )
                return Array.from(t);
            })(t) ||
            (function (t, e) {
              if (t) {
                if ("string" == typeof t) return ty(t, void 0);
                var r = Object.prototype.toString.call(t).slice(8, -1);
                if (
                  ("Object" === r && t.constructor && (r = t.constructor.name),
                  "Map" === r || "Set" === r)
                )
                  return Array.from(t);
                if (
                  "Arguments" === r ||
                  /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)
                )
                  return ty(t, e);
              }
            })(t) ||
            (function () {
              throw TypeError(
                "Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.",
              );
            })()
          );
        }
        function ty(t, e) {
          (null == e || e > t.length) && (e = t.length);
          for (var r = 0, n = Array(e); r < e; r++) n[r] = t[r];
          return n;
        }
        function tv(t, e) {
          var r = Object.keys(t);
          if (Object.getOwnPropertySymbols) {
            var n = Object.getOwnPropertySymbols(t);
            e &&
              (n = n.filter(function (e) {
                return Object.getOwnPropertyDescriptor(t, e).enumerable;
              })),
              r.push.apply(r, n);
          }
          return r;
        }
        function tm(t) {
          for (var e = 1; e < arguments.length; e++) {
            var r = null != arguments[e] ? arguments[e] : {};
            e % 2
              ? tv(Object(r), !0).forEach(function (e) {
                  tb(t, e, r[e]);
                })
              : Object.getOwnPropertyDescriptors
                ? Object.defineProperties(
                    t,
                    Object.getOwnPropertyDescriptors(r),
                  )
                : tv(Object(r)).forEach(function (e) {
                    Object.defineProperty(
                      t,
                      e,
                      Object.getOwnPropertyDescriptor(r, e),
                    );
                  });
          }
          return t;
        }
        function tb(t, e, r) {
          return (
            (e = tg(e)) in t
              ? Object.defineProperty(t, e, {
                  value: r,
                  enumerable: !0,
                  configurable: !0,
                  writable: !0,
                })
              : (t[e] = r),
            t
          );
        }
        function tg(t) {
          var e = (function (t, e) {
            if ("object" !== tp(t) || null === t) return t;
            var r = t[Symbol.toPrimitive];
            if (void 0 !== r) {
              var n = r.call(t, e || "default");
              if ("object" !== tp(n)) return n;
              throw TypeError("@@toPrimitive must return a primitive value.");
            }
            return ("string" === e ? String : Number)(t);
          })(t, "string");
          return "symbol" === tp(e) ? e : String(e);
        }
        function tx(t, e) {
          return (tx = Object.setPrototypeOf
            ? Object.setPrototypeOf.bind()
            : function (t, e) {
                return (t.__proto__ = e), t;
              })(t, e);
        }
        function tw(t, e) {
          if (e && ("object" === tp(e) || "function" == typeof e)) return e;
          if (void 0 !== e)
            throw TypeError(
              "Derived constructors may only return object or undefined",
            );
          return tO(t);
        }
        function tO(t) {
          if (void 0 === t)
            throw ReferenceError(
              "this hasn't been initialised - super() hasn't been called",
            );
          return t;
        }
        function tj(t) {
          return (tj = Object.setPrototypeOf
            ? Object.getPrototypeOf.bind()
            : function (t) {
                return t.__proto__ || Object.getPrototypeOf(t);
              })(t);
        }
        var tS = (function (t) {
          if ("function" != typeof t && null !== t)
            throw TypeError(
              "Super expression must either be null or a function",
            );
          (a.prototype = Object.create(t && t.prototype, {
            constructor: { value: a, writable: !0, configurable: !0 },
          })),
            Object.defineProperty(a, "prototype", { writable: !1 }),
            t && tx(a, t);
          var e,
            r,
            o =
              ((e = (function () {
                if (
                  "undefined" == typeof Reflect ||
                  !Reflect.construct ||
                  Reflect.construct.sham
                )
                  return !1;
                if ("function" == typeof Proxy) return !0;
                try {
                  return (
                    Boolean.prototype.valueOf.call(
                      Reflect.construct(Boolean, [], function () {}),
                    ),
                    !0
                  );
                } catch (t) {
                  return !1;
                }
              })()),
              function () {
                var t,
                  r = tj(a);
                return (
                  (t = e
                    ? Reflect.construct(r, arguments, tj(this).constructor)
                    : r.apply(this, arguments)),
                  tw(this, t)
                );
              });
          function a(t, e) {
            if (!(this instanceof a))
              throw TypeError("Cannot call a class as a function");
            var r = o.call(this, t, e),
              n = r.props,
              i = n.isActive,
              c = n.attributeName,
              u = n.from,
              s = n.to,
              l = n.steps,
              f = n.children,
              p = n.duration;
            if (
              ((r.handleStyleChange = r.handleStyleChange.bind(tO(r))),
              (r.changeStyle = r.changeStyle.bind(tO(r))),
              !i || p <= 0)
            )
              return (
                (r.state = { style: {} }),
                "function" == typeof f && (r.state = { style: s }),
                tw(r)
              );
            if (l && l.length) r.state = { style: l[0].style };
            else if (u) {
              if ("function" == typeof f)
                return (r.state = { style: u }), tw(r);
              r.state = { style: c ? tb({}, c, u) : u };
            } else r.state = { style: {} };
            return r;
          }
          return (
            (r = [
              {
                key: "componentDidMount",
                value: function () {
                  var t = this.props,
                    e = t.isActive,
                    r = t.canBegin;
                  (this.mounted = !0), e && r && this.runAnimation(this.props);
                },
              },
              {
                key: "componentDidUpdate",
                value: function (t) {
                  var e = this.props,
                    r = e.isActive,
                    n = e.canBegin,
                    i = e.attributeName,
                    o = e.shouldReAnimate,
                    a = e.to,
                    c = e.from,
                    u = this.state.style;
                  if (n) {
                    if (!r) {
                      var s = { style: i ? tb({}, i, a) : a };
                      this.state &&
                        u &&
                        ((i && u[i] !== a) || (!i && u !== a)) &&
                        this.setState(s);
                      return;
                    }
                    if (!I(t.to, a) || !t.canBegin || !t.isActive) {
                      var l = !t.canBegin || !t.isActive;
                      this.manager && this.manager.stop(),
                        this.stopJSAnimation && this.stopJSAnimation();
                      var f = l || o ? c : t.to;
                      if (this.state && u) {
                        var p = { style: i ? tb({}, i, f) : f };
                        ((i && u[i] !== f) || (!i && u !== f)) &&
                          this.setState(p);
                      }
                      this.runAnimation(
                        tm(tm({}, this.props), {}, { from: f, begin: 0 }),
                      );
                    }
                  }
                },
              },
              {
                key: "componentWillUnmount",
                value: function () {
                  this.mounted = !1;
                  var t = this.props.onAnimationEnd;
                  this.unSubscribe && this.unSubscribe(),
                    this.manager &&
                      (this.manager.stop(), (this.manager = null)),
                    this.stopJSAnimation && this.stopJSAnimation(),
                    t && t();
                },
              },
              {
                key: "handleStyleChange",
                value: function (t) {
                  this.changeStyle(t);
                },
              },
              {
                key: "changeStyle",
                value: function (t) {
                  this.mounted && this.setState({ style: t });
                },
              },
              {
                key: "runJSAnimation",
                value: function (t) {
                  var e = this,
                    r = t.from,
                    n = t.to,
                    i = t.duration,
                    o = t.easing,
                    a = t.begin,
                    c = t.onAnimationEnd,
                    u = t.onAnimationStart,
                    s = tf(r, n, tt(o), i, this.changeStyle);
                  this.manager.start([
                    u,
                    a,
                    function () {
                      e.stopJSAnimation = s();
                    },
                    i,
                    c,
                  ]);
                },
              },
              {
                key: "runStepAnimation",
                value: function (t) {
                  var e = this,
                    r = t.steps,
                    n = t.begin,
                    i = t.onAnimationStart,
                    o = r[0],
                    a = o.style,
                    c = o.duration;
                  return this.manager.start(
                    [i].concat(
                      td(
                        r.reduce(
                          function (t, n, i) {
                            if (0 === i) return t;
                            var o = n.duration,
                              a = n.easing,
                              c = void 0 === a ? "ease" : a,
                              u = n.style,
                              s = n.properties,
                              l = n.onAnimationEnd,
                              f = i > 0 ? r[i - 1] : n,
                              p = s || Object.keys(u);
                            if ("function" == typeof c || "spring" === c)
                              return [].concat(td(t), [
                                e.runJSAnimation.bind(e, {
                                  from: f.style,
                                  to: u,
                                  duration: o,
                                  easing: c,
                                }),
                                o,
                              ]);
                            var h = X(p, o, c),
                              d = tm(
                                tm(tm({}, f.style), u),
                                {},
                                { transition: h },
                              );
                            return [].concat(td(t), [d, o, l]).filter($);
                          },
                          [a, Math.max(void 0 === c ? 0 : c, n)],
                        ),
                      ),
                      [t.onAnimationEnd],
                    ),
                  );
                },
              },
              {
                key: "runAnimation",
                value: function (t) {
                  this.manager ||
                    (this.manager =
                      ((r = function () {
                        return null;
                      }),
                      (n = !1),
                      (i = function t(e) {
                        if (!n) {
                          if (Array.isArray(e)) {
                            if (!e.length) return;
                            var i =
                                (function (t) {
                                  if (Array.isArray(t)) return t;
                                })(e) ||
                                (function (t) {
                                  if (
                                    ("undefined" != typeof Symbol &&
                                      null != t[Symbol.iterator]) ||
                                    null != t["@@iterator"]
                                  )
                                    return Array.from(t);
                                })(e) ||
                                (function (t, e) {
                                  if (t) {
                                    if ("string" == typeof t)
                                      return L(t, void 0);
                                    var r = Object.prototype.toString
                                      .call(t)
                                      .slice(8, -1);
                                    if (
                                      ("Object" === r &&
                                        t.constructor &&
                                        (r = t.constructor.name),
                                      "Map" === r || "Set" === r)
                                    )
                                      return Array.from(t);
                                    if (
                                      "Arguments" === r ||
                                      /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(
                                        r,
                                      )
                                    )
                                      return L(t, e);
                                  }
                                })(e) ||
                                (function () {
                                  throw TypeError(
                                    "Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.",
                                  );
                                })(),
                              o = i[0],
                              a = i.slice(1);
                            return "number" == typeof o
                              ? void B(t.bind(null, a), o)
                              : (t(o), void B(t.bind(null, a)));
                          }
                          "object" === R(e) && r(e),
                            "function" == typeof e && e();
                        }
                      }),
                      {
                        stop: function () {
                          n = !0;
                        },
                        start: function (t) {
                          (n = !1), i(t);
                        },
                        subscribe: function (t) {
                          return (
                            (r = t),
                            function () {
                              r = function () {
                                return null;
                              };
                            }
                          );
                        },
                      }));
                  var e,
                    r,
                    n,
                    i,
                    o = t.begin,
                    a = t.duration,
                    c = t.attributeName,
                    u = t.to,
                    s = t.easing,
                    l = t.onAnimationStart,
                    f = t.onAnimationEnd,
                    p = t.steps,
                    h = t.children,
                    d = this.manager;
                  if (
                    ((this.unSubscribe = d.subscribe(this.handleStyleChange)),
                    "function" == typeof s ||
                      "function" == typeof h ||
                      "spring" === s)
                  )
                    return void this.runJSAnimation(t);
                  if (p.length > 1) return void this.runStepAnimation(t);
                  var y = c ? tb({}, c, u) : u,
                    v = X(Object.keys(y), a, s);
                  d.start([l, o, tm(tm({}, y), {}, { transition: v }), a, f]);
                },
              },
              {
                key: "render",
                value: function () {
                  var t = this.props,
                    e = t.children,
                    r = (t.begin, t.duration),
                    o = (t.attributeName, t.easing, t.isActive),
                    a =
                      (t.steps,
                      t.from,
                      t.to,
                      t.canBegin,
                      t.onAnimationEnd,
                      t.shouldReAnimate,
                      t.onAnimationReStart,
                      (function (t, e) {
                        if (null == t) return {};
                        var r,
                          n,
                          i = (function (t, e) {
                            if (null == t) return {};
                            var r,
                              n,
                              i = {},
                              o = Object.keys(t);
                            for (n = 0; n < o.length; n++)
                              (r = o[n]), e.indexOf(r) >= 0 || (i[r] = t[r]);
                            return i;
                          })(t, e);
                        if (Object.getOwnPropertySymbols) {
                          var o = Object.getOwnPropertySymbols(t);
                          for (n = 0; n < o.length; n++)
                            (r = o[n]),
                              !(e.indexOf(r) >= 0) &&
                                Object.prototype.propertyIsEnumerable.call(
                                  t,
                                  r,
                                ) &&
                                (i[r] = t[r]);
                        }
                        return i;
                      })(t, th)),
                    c = n.Children.count(e),
                    u = this.state.style;
                  if ("function" == typeof e) return e(u);
                  if (!o || 0 === c || r <= 0) return e;
                  var s = function (t) {
                    var e = t.props,
                      r = e.style,
                      i = e.className;
                    return (0, n.cloneElement)(
                      t,
                      tm(
                        tm({}, a),
                        {},
                        {
                          style: tm(tm({}, void 0 === r ? {} : r), u),
                          className: i,
                        },
                      ),
                    );
                  };
                  return 1 === c
                    ? s(n.Children.only(e))
                    : i().createElement(
                        "div",
                        null,
                        n.Children.map(e, function (t) {
                          return s(t);
                        }),
                      );
                },
              },
            ]),
            (function (t, e) {
              for (var r = 0; r < e.length; r++) {
                var n = e[r];
                (n.enumerable = n.enumerable || !1),
                  (n.configurable = !0),
                  "value" in n && (n.writable = !0),
                  Object.defineProperty(t, tg(n.key), n);
              }
            })(a.prototype, r),
            Object.defineProperty(a, "prototype", { writable: !1 }),
            a
          );
        })(n.PureComponent);
        (tS.displayName = "Animate"),
          (tS.defaultProps = {
            begin: 0,
            duration: 1e3,
            from: "",
            to: "",
            attributeName: "",
            easing: "ease",
            isActive: !0,
            canBegin: !0,
            steps: [],
            onAnimationEnd: function () {},
            onAnimationStart: function () {},
          }),
          (tS.propTypes = {
            from: a().oneOfType([a().object, a().string]),
            to: a().oneOfType([a().object, a().string]),
            attributeName: a().string,
            duration: a().number,
            begin: a().number,
            easing: a().oneOfType([a().string, a().func]),
            steps: a().arrayOf(
              a().shape({
                duration: a().number.isRequired,
                style: a().object.isRequired,
                easing: a().oneOfType([
                  a().oneOf([
                    "ease",
                    "ease-in",
                    "ease-out",
                    "ease-in-out",
                    "linear",
                  ]),
                  a().func,
                ]),
                properties: a().arrayOf("string"),
                onAnimationEnd: a().func,
              }),
            ),
            children: a().oneOfType([a().node, a().func]),
            isActive: a().bool,
            canBegin: a().bool,
            onAnimationEnd: a().func,
            shouldReAnimate: a().bool,
            onAnimationStart: a().func,
            onAnimationReStart: a().func,
          });
        let tA = tS;
      },
      8086: (t) => {
        "use strict";
        t.exports = require("module");
      },
      8108: (t) => {
        "use strict";
        t.exports = function (t) {
          return function () {
            return t;
          };
        };
      },
      8178: (t) => {
        "use strict";
        t.exports = function (t) {
          return this.__data__.set(t, "__lodash_hash_undefined__"), this;
        };
      },
      8316: (t, e, r) => {
        "use strict";
        t.exports = r(43960)(Object, "create");
      },
      8603: (t, e, r) => {
        "use strict";
        var n = r(6431);
        t.exports = function (t, e) {
          var r = !0;
          return (
            n(t, function (t, n, i) {
              return (r = !!e(t, n, i));
            }),
            r
          );
        };
      },
      8952: (t, e, r) => {
        "use strict";
        var n = r(63428),
          i = r(90927);
        t.exports = function (t, e) {
          return t && t.length ? i(t, n(e, 2)) : [];
        };
      },
      9403: (t, e, r) => {
        "use strict";
        r.d(e, {
          DR: () => x,
          pj: () => j,
          rY: () => _,
          yi: () => k,
          Yp: () => w,
          hj: () => E,
          sk: () => P,
          AF: () => O,
          Nk: () => A,
          $G: () => S,
        });
        var n = r(84205),
          i = r.n(n),
          o = r(24236),
          a = r(42824),
          c = r.n(a),
          u = r(81105),
          s = r.n(u),
          l = r(99554),
          f = r.n(l)()(
            function (t) {
              return { x: t.left, y: t.top, width: t.width, height: t.height };
            },
            function (t) {
              return [
                "l",
                t.left,
                "t",
                t.top,
                "w",
                t.width,
                "h",
                t.height,
              ].join("");
            },
          ),
          p = r(61481),
          h = (0, n.createContext)(void 0),
          d = (0, n.createContext)(void 0),
          y = (0, n.createContext)(void 0),
          v = (0, n.createContext)({}),
          m = (0, n.createContext)(void 0),
          b = (0, n.createContext)(0),
          g = (0, n.createContext)(0),
          x = function (t) {
            var e = t.state,
              r = e.xAxisMap,
              n = e.yAxisMap,
              o = e.offset,
              a = t.clipPathId,
              c = t.children,
              u = t.width,
              s = t.height,
              l = f(o);
            return i().createElement(
              h.Provider,
              { value: r },
              i().createElement(
                d.Provider,
                { value: n },
                i().createElement(
                  v.Provider,
                  { value: o },
                  i().createElement(
                    y.Provider,
                    { value: l },
                    i().createElement(
                      m.Provider,
                      { value: a },
                      i().createElement(
                        b.Provider,
                        { value: s },
                        i().createElement(g.Provider, { value: u }, c),
                      ),
                    ),
                  ),
                ),
              ),
            );
          },
          w = function () {
            return (0, n.useContext)(m);
          },
          O = function (t) {
            var e = (0, n.useContext)(h);
            null == e && (0, o.A)(!1);
            var r = e[t];
            return null == r && (0, o.A)(!1), r;
          },
          j = function () {
            var t = (0, n.useContext)(h);
            return (0, p.lX)(t);
          },
          S = function () {
            var t = (0, n.useContext)(d);
            return (
              c()(t, function (t) {
                return s()(t.domain, Number.isFinite);
              }) || (0, p.lX)(t)
            );
          },
          A = function (t) {
            var e = (0, n.useContext)(d);
            null == e && (0, o.A)(!1);
            var r = e[t];
            return null == r && (0, o.A)(!1), r;
          },
          P = function () {
            return (0, n.useContext)(y);
          },
          E = function () {
            return (0, n.useContext)(v);
          },
          k = function () {
            return (0, n.useContext)(g);
          },
          _ = function () {
            return (0, n.useContext)(b);
          };
      },
      10621: (t, e, r) => {
        "use strict";
        r.d(e, {
          QQ: () => c,
          VU: () => s,
          XC: () => p,
          _U: () => f,
          j2: () => l,
        });
        var n = r(84205),
          i = r(95311),
          o = r.n(i);
        function a(t) {
          return (a =
            "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
              ? function (t) {
                  return typeof t;
                }
              : function (t) {
                  return t &&
                    "function" == typeof Symbol &&
                    t.constructor === Symbol &&
                    t !== Symbol.prototype
                    ? "symbol"
                    : typeof t;
                })(t);
        }
        var c = [
            "aria-activedescendant",
            "aria-atomic",
            "aria-autocomplete",
            "aria-busy",
            "aria-checked",
            "aria-colcount",
            "aria-colindex",
            "aria-colspan",
            "aria-controls",
            "aria-current",
            "aria-describedby",
            "aria-details",
            "aria-disabled",
            "aria-errormessage",
            "aria-expanded",
            "aria-flowto",
            "aria-haspopup",
            "aria-hidden",
            "aria-invalid",
            "aria-keyshortcuts",
            "aria-label",
            "aria-labelledby",
            "aria-level",
            "aria-live",
            "aria-modal",
            "aria-multiline",
            "aria-multiselectable",
            "aria-orientation",
            "aria-owns",
            "aria-placeholder",
            "aria-posinset",
            "aria-pressed",
            "aria-readonly",
            "aria-relevant",
            "aria-required",
            "aria-roledescription",
            "aria-rowcount",
            "aria-rowindex",
            "aria-rowspan",
            "aria-selected",
            "aria-setsize",
            "aria-sort",
            "aria-valuemax",
            "aria-valuemin",
            "aria-valuenow",
            "aria-valuetext",
            "className",
            "color",
            "height",
            "id",
            "lang",
            "max",
            "media",
            "method",
            "min",
            "name",
            "style",
            "target",
            "width",
            "role",
            "tabIndex",
            "accentHeight",
            "accumulate",
            "additive",
            "alignmentBaseline",
            "allowReorder",
            "alphabetic",
            "amplitude",
            "arabicForm",
            "ascent",
            "attributeName",
            "attributeType",
            "autoReverse",
            "azimuth",
            "baseFrequency",
            "baselineShift",
            "baseProfile",
            "bbox",
            "begin",
            "bias",
            "by",
            "calcMode",
            "capHeight",
            "clip",
            "clipPath",
            "clipPathUnits",
            "clipRule",
            "colorInterpolation",
            "colorInterpolationFilters",
            "colorProfile",
            "colorRendering",
            "contentScriptType",
            "contentStyleType",
            "cursor",
            "cx",
            "cy",
            "d",
            "decelerate",
            "descent",
            "diffuseConstant",
            "direction",
            "display",
            "divisor",
            "dominantBaseline",
            "dur",
            "dx",
            "dy",
            "edgeMode",
            "elevation",
            "enableBackground",
            "end",
            "exponent",
            "externalResourcesRequired",
            "fill",
            "fillOpacity",
            "fillRule",
            "filter",
            "filterRes",
            "filterUnits",
            "floodColor",
            "floodOpacity",
            "focusable",
            "fontFamily",
            "fontSize",
            "fontSizeAdjust",
            "fontStretch",
            "fontStyle",
            "fontVariant",
            "fontWeight",
            "format",
            "from",
            "fx",
            "fy",
            "g1",
            "g2",
            "glyphName",
            "glyphOrientationHorizontal",
            "glyphOrientationVertical",
            "glyphRef",
            "gradientTransform",
            "gradientUnits",
            "hanging",
            "horizAdvX",
            "horizOriginX",
            "href",
            "ideographic",
            "imageRendering",
            "in2",
            "in",
            "intercept",
            "k1",
            "k2",
            "k3",
            "k4",
            "k",
            "kernelMatrix",
            "kernelUnitLength",
            "kerning",
            "keyPoints",
            "keySplines",
            "keyTimes",
            "lengthAdjust",
            "letterSpacing",
            "lightingColor",
            "limitingConeAngle",
            "local",
            "markerEnd",
            "markerHeight",
            "markerMid",
            "markerStart",
            "markerUnits",
            "markerWidth",
            "mask",
            "maskContentUnits",
            "maskUnits",
            "mathematical",
            "mode",
            "numOctaves",
            "offset",
            "opacity",
            "operator",
            "order",
            "orient",
            "orientation",
            "origin",
            "overflow",
            "overlinePosition",
            "overlineThickness",
            "paintOrder",
            "panose1",
            "pathLength",
            "patternContentUnits",
            "patternTransform",
            "patternUnits",
            "pointerEvents",
            "pointsAtX",
            "pointsAtY",
            "pointsAtZ",
            "preserveAlpha",
            "preserveAspectRatio",
            "primitiveUnits",
            "r",
            "radius",
            "refX",
            "refY",
            "renderingIntent",
            "repeatCount",
            "repeatDur",
            "requiredExtensions",
            "requiredFeatures",
            "restart",
            "result",
            "rotate",
            "rx",
            "ry",
            "seed",
            "shapeRendering",
            "slope",
            "spacing",
            "specularConstant",
            "specularExponent",
            "speed",
            "spreadMethod",
            "startOffset",
            "stdDeviation",
            "stemh",
            "stemv",
            "stitchTiles",
            "stopColor",
            "stopOpacity",
            "strikethroughPosition",
            "strikethroughThickness",
            "string",
            "stroke",
            "strokeDasharray",
            "strokeDashoffset",
            "strokeLinecap",
            "strokeLinejoin",
            "strokeMiterlimit",
            "strokeOpacity",
            "strokeWidth",
            "surfaceScale",
            "systemLanguage",
            "tableValues",
            "targetX",
            "targetY",
            "textAnchor",
            "textDecoration",
            "textLength",
            "textRendering",
            "to",
            "transform",
            "u1",
            "u2",
            "underlinePosition",
            "underlineThickness",
            "unicode",
            "unicodeBidi",
            "unicodeRange",
            "unitsPerEm",
            "vAlphabetic",
            "values",
            "vectorEffect",
            "version",
            "vertAdvY",
            "vertOriginX",
            "vertOriginY",
            "vHanging",
            "vIdeographic",
            "viewTarget",
            "visibility",
            "vMathematical",
            "widths",
            "wordSpacing",
            "writingMode",
            "x1",
            "x2",
            "x",
            "xChannelSelector",
            "xHeight",
            "xlinkActuate",
            "xlinkArcrole",
            "xlinkHref",
            "xlinkRole",
            "xlinkShow",
            "xlinkTitle",
            "xlinkType",
            "xmlBase",
            "xmlLang",
            "xmlns",
            "xmlnsXlink",
            "xmlSpace",
            "y1",
            "y2",
            "y",
            "yChannelSelector",
            "z",
            "zoomAndPan",
            "ref",
            "key",
            "angle",
          ],
          u = ["points", "pathLength"],
          s = { svg: ["viewBox", "children"], polygon: u, polyline: u },
          l = [
            "dangerouslySetInnerHTML",
            "onCopy",
            "onCopyCapture",
            "onCut",
            "onCutCapture",
            "onPaste",
            "onPasteCapture",
            "onCompositionEnd",
            "onCompositionEndCapture",
            "onCompositionStart",
            "onCompositionStartCapture",
            "onCompositionUpdate",
            "onCompositionUpdateCapture",
            "onFocus",
            "onFocusCapture",
            "onBlur",
            "onBlurCapture",
            "onChange",
            "onChangeCapture",
            "onBeforeInput",
            "onBeforeInputCapture",
            "onInput",
            "onInputCapture",
            "onReset",
            "onResetCapture",
            "onSubmit",
            "onSubmitCapture",
            "onInvalid",
            "onInvalidCapture",
            "onLoad",
            "onLoadCapture",
            "onError",
            "onErrorCapture",
            "onKeyDown",
            "onKeyDownCapture",
            "onKeyPress",
            "onKeyPressCapture",
            "onKeyUp",
            "onKeyUpCapture",
            "onAbort",
            "onAbortCapture",
            "onCanPlay",
            "onCanPlayCapture",
            "onCanPlayThrough",
            "onCanPlayThroughCapture",
            "onDurationChange",
            "onDurationChangeCapture",
            "onEmptied",
            "onEmptiedCapture",
            "onEncrypted",
            "onEncryptedCapture",
            "onEnded",
            "onEndedCapture",
            "onLoadedData",
            "onLoadedDataCapture",
            "onLoadedMetadata",
            "onLoadedMetadataCapture",
            "onLoadStart",
            "onLoadStartCapture",
            "onPause",
            "onPauseCapture",
            "onPlay",
            "onPlayCapture",
            "onPlaying",
            "onPlayingCapture",
            "onProgress",
            "onProgressCapture",
            "onRateChange",
            "onRateChangeCapture",
            "onSeeked",
            "onSeekedCapture",
            "onSeeking",
            "onSeekingCapture",
            "onStalled",
            "onStalledCapture",
            "onSuspend",
            "onSuspendCapture",
            "onTimeUpdate",
            "onTimeUpdateCapture",
            "onVolumeChange",
            "onVolumeChangeCapture",
            "onWaiting",
            "onWaitingCapture",
            "onAuxClick",
            "onAuxClickCapture",
            "onClick",
            "onClickCapture",
            "onContextMenu",
            "onContextMenuCapture",
            "onDoubleClick",
            "onDoubleClickCapture",
            "onDrag",
            "onDragCapture",
            "onDragEnd",
            "onDragEndCapture",
            "onDragEnter",
            "onDragEnterCapture",
            "onDragExit",
            "onDragExitCapture",
            "onDragLeave",
            "onDragLeaveCapture",
            "onDragOver",
            "onDragOverCapture",
            "onDragStart",
            "onDragStartCapture",
            "onDrop",
            "onDropCapture",
            "onMouseDown",
            "onMouseDownCapture",
            "onMouseEnter",
            "onMouseLeave",
            "onMouseMove",
            "onMouseMoveCapture",
            "onMouseOut",
            "onMouseOutCapture",
            "onMouseOver",
            "onMouseOverCapture",
            "onMouseUp",
            "onMouseUpCapture",
            "onSelect",
            "onSelectCapture",
            "onTouchCancel",
            "onTouchCancelCapture",
            "onTouchEnd",
            "onTouchEndCapture",
            "onTouchMove",
            "onTouchMoveCapture",
            "onTouchStart",
            "onTouchStartCapture",
            "onPointerDown",
            "onPointerDownCapture",
            "onPointerMove",
            "onPointerMoveCapture",
            "onPointerUp",
            "onPointerUpCapture",
            "onPointerCancel",
            "onPointerCancelCapture",
            "onPointerEnter",
            "onPointerEnterCapture",
            "onPointerLeave",
            "onPointerLeaveCapture",
            "onPointerOver",
            "onPointerOverCapture",
            "onPointerOut",
            "onPointerOutCapture",
            "onGotPointerCapture",
            "onGotPointerCaptureCapture",
            "onLostPointerCapture",
            "onLostPointerCaptureCapture",
            "onScroll",
            "onScrollCapture",
            "onWheel",
            "onWheelCapture",
            "onAnimationStart",
            "onAnimationStartCapture",
            "onAnimationEnd",
            "onAnimationEndCapture",
            "onAnimationIteration",
            "onAnimationIterationCapture",
            "onTransitionEnd",
            "onTransitionEndCapture",
          ],
          f = function (t, e) {
            if (!t || "function" == typeof t || "boolean" == typeof t)
              return null;
            var r = t;
            if (((0, n.isValidElement)(t) && (r = t.props), !o()(r)))
              return null;
            var i = {};
            return (
              Object.keys(r).forEach(function (t) {
                l.includes(t) &&
                  (i[t] =
                    e ||
                    function (e) {
                      return r[t](r, e);
                    });
              }),
              i
            );
          },
          p = function (t, e, r) {
            if (!o()(t) || "object" !== a(t)) return null;
            var n = null;
            return (
              Object.keys(t).forEach(function (i) {
                var o = t[i];
                l.includes(i) &&
                  "function" == typeof o &&
                  (n || (n = {}),
                  (n[i] = function (t) {
                    return o(e, r, t), null;
                  }));
              }),
              n
            );
          };
      },
      10846: (t) => {
        "use strict";
        t.exports = require("next/dist/compiled/next-server/app-page.runtime.prod.js");
      },
      11172: (t) => {
        "use strict";
        t.exports = function () {};
      },
      11411: (t) => {
        "use strict";
        t.exports = function (t, e, r) {
          for (var n = -1, i = null == t ? 0 : t.length; ++n < i; )
            if (r(e, t[n])) return !0;
          return !1;
        };
      },
      11730: (t) => {
        "use strict";
        t.exports = function (t) {
          return t;
        };
      },
      11804: (t) => {
        "use strict";
        t.exports = function () {
          (this.__data__ = []), (this.size = 0);
        };
      },
      11997: (t) => {
        "use strict";
        t.exports = require("punycode");
      },
      12139: (t, e, r) => {
        "use strict";
        r.d(e, { f: () => d });
        var n = r(4276),
          i = r.n(n),
          o = r(61481),
          a = r(50839),
          c = r(44729),
          u = r(88225);
        function s(t, e, r) {
          if (e < 1) return [];
          if (1 === e && void 0 === r) return t;
          for (var n = [], i = 0; i < t.length; i += e)
            if (void 0 !== r && !0 !== r(t[i])) return;
            else n.push(t[i]);
          return n;
        }
        function l(t, e, r, n, i) {
          if (t * e < t * n || t * e > t * i) return !1;
          var o = r();
          return (
            t * (e - (t * o) / 2 - n) >= 0 && t * (e + (t * o) / 2 - i) <= 0
          );
        }
        function f(t) {
          return (f =
            "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
              ? function (t) {
                  return typeof t;
                }
              : function (t) {
                  return t &&
                    "function" == typeof Symbol &&
                    t.constructor === Symbol &&
                    t !== Symbol.prototype
                    ? "symbol"
                    : typeof t;
                })(t);
        }
        function p(t, e) {
          var r = Object.keys(t);
          if (Object.getOwnPropertySymbols) {
            var n = Object.getOwnPropertySymbols(t);
            e &&
              (n = n.filter(function (e) {
                return Object.getOwnPropertyDescriptor(t, e).enumerable;
              })),
              r.push.apply(r, n);
          }
          return r;
        }
        function h(t) {
          for (var e = 1; e < arguments.length; e++) {
            var r = null != arguments[e] ? arguments[e] : {};
            e % 2
              ? p(Object(r), !0).forEach(function (e) {
                  var n, i, o;
                  (n = t),
                    (i = e),
                    (o = r[e]),
                    (i = (function (t) {
                      var e = (function (t, e) {
                        if ("object" != f(t) || !t) return t;
                        var r = t[Symbol.toPrimitive];
                        if (void 0 !== r) {
                          var n = r.call(t, e || "default");
                          if ("object" != f(n)) return n;
                          throw TypeError(
                            "@@toPrimitive must return a primitive value.",
                          );
                        }
                        return ("string" === e ? String : Number)(t);
                      })(t, "string");
                      return "symbol" == f(e) ? e : e + "";
                    })(i)) in n
                      ? Object.defineProperty(n, i, {
                          value: o,
                          enumerable: !0,
                          configurable: !0,
                          writable: !0,
                        })
                      : (n[i] = o);
                })
              : Object.getOwnPropertyDescriptors
                ? Object.defineProperties(
                    t,
                    Object.getOwnPropertyDescriptors(r),
                  )
                : p(Object(r)).forEach(function (e) {
                    Object.defineProperty(
                      t,
                      e,
                      Object.getOwnPropertyDescriptor(r, e),
                    );
                  });
          }
          return t;
        }
        function d(t, e, r) {
          var n,
            f,
            p,
            d,
            y,
            v = t.tick,
            m = t.ticks,
            b = t.viewBox,
            g = t.minTickGap,
            x = t.orientation,
            w = t.interval,
            O = t.tickFormatter,
            j = t.unit,
            S = t.angle;
          if (!m || !m.length || !v) return [];
          if ((0, o.Et)(w) || c.m.isSsr)
            return s(m, ("number" == typeof w && (0, o.Et)(w) ? w : 0) + 1);
          var A = [],
            P = "top" === x || "bottom" === x ? "width" : "height",
            E =
              j && "width" === P
                ? (0, a.Pu)(j, { fontSize: e, letterSpacing: r })
                : { width: 0, height: 0 },
            k = function (t, n) {
              var o,
                c,
                s = i()(O) ? O(t.value, n) : t.value;
              return "width" === P
                ? ((o = (0, a.Pu)(s, { fontSize: e, letterSpacing: r })),
                  (c = {
                    width: o.width + E.width,
                    height: o.height + E.height,
                  }),
                  (0, u.bx)(c, S))
                : (0, a.Pu)(s, { fontSize: e, letterSpacing: r })[P];
            },
            _ =
              m.length >= 2 ? (0, o.sA)(m[1].coordinate - m[0].coordinate) : 1,
            M =
              ((n = "width" === P),
              (f = b.x),
              (p = b.y),
              (d = b.width),
              (y = b.height),
              1 === _
                ? { start: n ? f : p, end: n ? f + d : p + y }
                : { start: n ? f + d : p + y, end: n ? f : p });
          return "equidistantPreserveStart" === w
            ? (function (t, e, r, n, i) {
                for (
                  var o,
                    a = (n || []).slice(),
                    c = e.start,
                    u = e.end,
                    f = 0,
                    p = 1,
                    h = c;
                  p <= a.length;

                )
                  if (
                    (o = (function () {
                      var e,
                        o = null == n ? void 0 : n[f];
                      if (void 0 === o) return { v: s(n, p) };
                      var a = f,
                        d = function () {
                          return void 0 === e && (e = r(o, a)), e;
                        },
                        y = o.coordinate,
                        v = 0 === f || l(t, y, d, h, u);
                      v || ((f = 0), (h = c), (p += 1)),
                        v && ((h = y + t * (d() / 2 + i)), (f += p));
                    })())
                  )
                    return o.v;
                return [];
              })(_, M, k, m, g)
            : ("preserveStart" === w || "preserveStartEnd" === w
                ? (function (t, e, r, n, i, o) {
                    var a = (n || []).slice(),
                      c = a.length,
                      u = e.start,
                      s = e.end;
                    if (o) {
                      var f = n[c - 1],
                        p = r(f, c - 1),
                        d = t * (f.coordinate + (t * p) / 2 - s);
                      (a[c - 1] = f =
                        h(
                          h({}, f),
                          {},
                          {
                            tickCoord:
                              d > 0 ? f.coordinate - d * t : f.coordinate,
                          },
                        )),
                        l(
                          t,
                          f.tickCoord,
                          function () {
                            return p;
                          },
                          u,
                          s,
                        ) &&
                          ((s = f.tickCoord - t * (p / 2 + i)),
                          (a[c - 1] = h(h({}, f), {}, { isShow: !0 })));
                    }
                    for (
                      var y = o ? c - 1 : c,
                        v = function (e) {
                          var n,
                            o = a[e],
                            c = function () {
                              return void 0 === n && (n = r(o, e)), n;
                            };
                          if (0 === e) {
                            var f = t * (o.coordinate - (t * c()) / 2 - u);
                            a[e] = o = h(
                              h({}, o),
                              {},
                              {
                                tickCoord:
                                  f < 0 ? o.coordinate - f * t : o.coordinate,
                              },
                            );
                          } else
                            a[e] = o = h(
                              h({}, o),
                              {},
                              { tickCoord: o.coordinate },
                            );
                          l(t, o.tickCoord, c, u, s) &&
                            ((u = o.tickCoord + t * (c() / 2 + i)),
                            (a[e] = h(h({}, o), {}, { isShow: !0 })));
                        },
                        m = 0;
                      m < y;
                      m++
                    )
                      v(m);
                    return a;
                  })(_, M, k, m, g, "preserveStartEnd" === w)
                : (function (t, e, r, n, i) {
                    for (
                      var o = (n || []).slice(),
                        a = o.length,
                        c = e.start,
                        u = e.end,
                        s = function (e) {
                          var n,
                            s = o[e],
                            f = function () {
                              return void 0 === n && (n = r(s, e)), n;
                            };
                          if (e === a - 1) {
                            var p = t * (s.coordinate + (t * f()) / 2 - u);
                            o[e] = s = h(
                              h({}, s),
                              {},
                              {
                                tickCoord:
                                  p > 0 ? s.coordinate - p * t : s.coordinate,
                              },
                            );
                          } else
                            o[e] = s = h(
                              h({}, s),
                              {},
                              { tickCoord: s.coordinate },
                            );
                          l(t, s.tickCoord, f, c, u) &&
                            ((u = s.tickCoord - t * (f() / 2 + i)),
                            (o[e] = h(h({}, s), {}, { isShow: !0 })));
                        },
                        f = a - 1;
                      f >= 0;
                      f--
                    )
                      s(f);
                    return o;
                  })(_, M, k, m, g)
              ).filter(function (t) {
                return t.isShow;
              });
        }
      },
      12836: (t, e, r) => {
        "use strict";
        var n = r(24838);
        t.exports = function (t) {
          return null == t ? "" : n(t);
        };
      },
      13493: (t, e, r) => {
        "use strict";
        r.d(e, { R: () => n });
        var n = function (t, e) {
          for (
            var r = arguments.length, n = Array(r > 2 ? r - 2 : 0), i = 2;
            i < r;
            i++
          )
            n[i - 2] = arguments[i];
        };
      },
      13708: (t) => {
        "use strict";
        t.exports = function (t) {
          var e = this.has(t) && delete this.__data__[t];
          return (this.size -= +!!e), e;
        };
      },
      13821: (t, e, r) => {
        "use strict";
        var n = r(3989),
          i = r(81494),
          o = r(60363);
        t.exports = function (t) {
          var e = i(t);
          return 1 == e.length && e[0][2]
            ? o(e[0][0], e[0][1])
            : function (r) {
                return r === t || n(r, t, e);
              };
        };
      },
      14170: (t) => {
        "use strict";
        t.exports = function (t, e) {
          for (
            var r = -1, n = null == t ? 0 : t.length, i = Array(n);
            ++r < n;

          )
            i[r] = e(t[r], r, t);
          return i;
        };
      },
      16778: (t, e, r) => {
        "use strict";
        var n = r(40671);
        t.exports = function () {
          return n.Date.now();
        };
      },
      17213: (t, e, r) => {
        "use strict";
        t.exports = r(43960)(r(40671), "WeakMap");
      },
      17362: (t, e, r) => {
        "use strict";
        r.a(t, async (t, n) => {
          try {
            r.d(e, {
              AB: () => l,
              J5: () => f,
              Qp: () => s,
              tH: () => d,
              tJ: () => h,
              w1: () => p,
            });
            var i = r(61268),
              o = r(86415),
              a = r(12335);
            r(84205);
            var c = r(15942),
              u = t([c]);
            function s({ ...t }) {
              return (0, i.jsx)("nav", {
                "aria-label": "breadcrumb",
                "data-slot": "breadcrumb",
                ...t,
              });
            }
            function l({ className: t, ...e }) {
              return (0, i.jsx)("ol", {
                "data-slot": "breadcrumb-list",
                className: (0, c.cn)(
                  "text-muted-foreground flex flex-wrap items-center gap-1.5 text-sm break-words sm:gap-2.5",
                  t,
                ),
                ...e,
              });
            }
            function f({ className: t, ...e }) {
              return (0, i.jsx)("li", {
                "data-slot": "breadcrumb-item",
                className: (0, c.cn)("inline-flex items-center gap-1.5", t),
                ...e,
              });
            }
            function p({ asChild: t, className: e, ...r }) {
              let n = t ? o.DX : "a";
              return (0, i.jsx)(n, {
                "data-slot": "breadcrumb-link",
                className: (0, c.cn)(
                  "hover:text-foreground transition-colors",
                  e,
                ),
                ...r,
              });
            }
            function h({ className: t, ...e }) {
              return (0, i.jsx)("span", {
                "data-slot": "breadcrumb-page",
                role: "link",
                "aria-disabled": "true",
                "aria-current": "page",
                className: (0, c.cn)("text-foreground font-normal", t),
                ...e,
              });
            }
            function d({ children: t, className: e, ...r }) {
              return (0, i.jsx)("li", {
                "data-slot": "breadcrumb-separator",
                role: "presentation",
                "aria-hidden": "true",
                className: (0, c.cn)("[&>svg]:size-3.5", e),
                ...r,
                children: t ?? (0, i.jsx)(a.A, {}),
              });
            }
            (c = (u.then ? (await u)() : u)[0]), n();
          } catch (t) {
            n(t);
          }
        });
      },
      18862: (t, e, r) => {
        "use strict";
        r.d(e, {
          AW: () => B,
          BU: () => E,
          J9: () => T,
          Me: () => k,
          Mn: () => O,
          OV: () => C,
          X_: () => D,
          aS: () => P,
          ee: () => I,
        });
        var n = r(65946),
          i = r.n(n),
          o = r(58929),
          a = r.n(o),
          c = r(27909),
          u = r.n(c),
          s = r(4276),
          l = r.n(s),
          f = r(95311),
          p = r.n(f),
          h = r(84205),
          d = r(57026),
          y = r(61481),
          v = r(60974),
          m = r(10621),
          b = ["children"],
          g = ["children"];
        function x(t, e) {
          if (null == t) return {};
          var r,
            n,
            i = (function (t, e) {
              if (null == t) return {};
              var r = {};
              for (var n in t)
                if (Object.prototype.hasOwnProperty.call(t, n)) {
                  if (e.indexOf(n) >= 0) continue;
                  r[n] = t[n];
                }
              return r;
            })(t, e);
          if (Object.getOwnPropertySymbols) {
            var o = Object.getOwnPropertySymbols(t);
            for (n = 0; n < o.length; n++)
              (r = o[n]),
                !(e.indexOf(r) >= 0) &&
                  Object.prototype.propertyIsEnumerable.call(t, r) &&
                  (i[r] = t[r]);
          }
          return i;
        }
        var w = {
            click: "onClick",
            mousedown: "onMouseDown",
            mouseup: "onMouseUp",
            mouseover: "onMouseOver",
            mousemove: "onMouseMove",
            mouseout: "onMouseOut",
            mouseenter: "onMouseEnter",
            mouseleave: "onMouseLeave",
            touchcancel: "onTouchCancel",
            touchend: "onTouchEnd",
            touchmove: "onTouchMove",
            touchstart: "onTouchStart",
            contextmenu: "onContextMenu",
            dblclick: "onDoubleClick",
          },
          O = function (t) {
            return "string" == typeof t
              ? t
              : t
                ? t.displayName || t.name || "Component"
                : "";
          },
          j = null,
          S = null,
          A = function t(e) {
            if (e === j && Array.isArray(S)) return S;
            var r = [];
            return (
              h.Children.forEach(e, function (e) {
                a()(e) ||
                  ((0, d.isFragment)(e)
                    ? (r = r.concat(t(e.props.children)))
                    : r.push(e));
              }),
              (S = r),
              (j = e),
              r
            );
          };
        function P(t, e) {
          var r = [],
            n = [];
          return (
            (n = Array.isArray(e)
              ? e.map(function (t) {
                  return O(t);
                })
              : [O(e)]),
            A(t).forEach(function (t) {
              var e = i()(t, "type.displayName") || i()(t, "type.name");
              -1 !== n.indexOf(e) && r.push(t);
            }),
            r
          );
        }
        function E(t, e) {
          var r = P(t, e);
          return r && r[0];
        }
        var k = function (t) {
            if (!t || !t.props) return !1;
            var e = t.props,
              r = e.width,
              n = e.height;
            return !!(0, y.Et)(r) && !(r <= 0) && !!(0, y.Et)(n) && !(n <= 0);
          },
          _ = [
            "a",
            "altGlyph",
            "altGlyphDef",
            "altGlyphItem",
            "animate",
            "animateColor",
            "animateMotion",
            "animateTransform",
            "circle",
            "clipPath",
            "color-profile",
            "cursor",
            "defs",
            "desc",
            "ellipse",
            "feBlend",
            "feColormatrix",
            "feComponentTransfer",
            "feComposite",
            "feConvolveMatrix",
            "feDiffuseLighting",
            "feDisplacementMap",
            "feDistantLight",
            "feFlood",
            "feFuncA",
            "feFuncB",
            "feFuncG",
            "feFuncR",
            "feGaussianBlur",
            "feImage",
            "feMerge",
            "feMergeNode",
            "feMorphology",
            "feOffset",
            "fePointLight",
            "feSpecularLighting",
            "feSpotLight",
            "feTile",
            "feTurbulence",
            "filter",
            "font",
            "font-face",
            "font-face-format",
            "font-face-name",
            "font-face-url",
            "foreignObject",
            "g",
            "glyph",
            "glyphRef",
            "hkern",
            "image",
            "line",
            "lineGradient",
            "marker",
            "mask",
            "metadata",
            "missing-glyph",
            "mpath",
            "path",
            "pattern",
            "polygon",
            "polyline",
            "radialGradient",
            "rect",
            "script",
            "set",
            "stop",
            "style",
            "svg",
            "switch",
            "symbol",
            "text",
            "textPath",
            "title",
            "tref",
            "tspan",
            "use",
            "view",
            "vkern",
          ],
          M = function (t, e, r, n) {
            var i,
              o =
                null !=
                (i = null === m.VU || void 0 === m.VU ? void 0 : m.VU[n])
                  ? i
                  : [];
            return (
              e.startsWith("data-") ||
              (!l()(t) && ((n && o.includes(e)) || m.QQ.includes(e))) ||
              (r && m.j2.includes(e))
            );
          },
          T = function (t, e, r) {
            if (!t || "function" == typeof t || "boolean" == typeof t)
              return null;
            var n = t;
            if (((0, h.isValidElement)(t) && (n = t.props), !p()(n)))
              return null;
            var i = {};
            return (
              Object.keys(n).forEach(function (t) {
                var o;
                M(null == (o = n) ? void 0 : o[t], t, e, r) && (i[t] = n[t]);
              }),
              i
            );
          },
          C = function t(e, r) {
            if (e === r) return !0;
            var n = h.Children.count(e);
            if (n !== h.Children.count(r)) return !1;
            if (0 === n) return !0;
            if (1 === n)
              return N(
                Array.isArray(e) ? e[0] : e,
                Array.isArray(r) ? r[0] : r,
              );
            for (var i = 0; i < n; i++) {
              var o = e[i],
                a = r[i];
              if (Array.isArray(o) || Array.isArray(a)) {
                if (!t(o, a)) return !1;
              } else if (!N(o, a)) return !1;
            }
            return !0;
          },
          N = function (t, e) {
            if (a()(t) && a()(e)) return !0;
            if (!a()(t) && !a()(e)) {
              var r = t.props || {},
                n = r.children,
                i = x(r, b),
                o = e.props || {},
                c = o.children,
                u = x(o, g);
              if (n && c) return (0, v.b)(i, u) && C(n, c);
              if (!n && !c) return (0, v.b)(i, u);
            }
            return !1;
          },
          I = function (t, e) {
            var r = [],
              n = {};
            return (
              A(t).forEach(function (t, i) {
                var o;
                if ((o = t) && o.type && u()(o.type) && _.indexOf(o.type) >= 0)
                  r.push(t);
                else if (t) {
                  var a = O(t.type),
                    c = e[a] || {},
                    s = c.handler,
                    l = c.once;
                  if (s && (!l || !n[a])) {
                    var f = s(t, a, i);
                    r.push(f), (n[a] = !0);
                  }
                }
              }),
              r
            );
          },
          D = function (t) {
            var e = t && t.type;
            return e && w[e] ? w[e] : null;
          },
          B = function (t, e) {
            return A(e).indexOf(t);
          };
      },
      18955: (t) => {
        "use strict";
        var e = Function.prototype.toString;
        t.exports = function (t) {
          if (null != t) {
            try {
              return e.call(t);
            } catch (t) {}
            try {
              return t + "";
            } catch (t) {}
          }
          return "";
        };
      },
      19064: (t, e, r) => {
        "use strict";
        var n = r(27871),
          i = r(6359);
        t.exports = function (t, e) {
          e = n(e, t);
          for (var r = 0, o = e.length; null != t && r < o; ) t = t[i(e[r++])];
          return r && r == o ? t : void 0;
        };
      },
      19075: (t, e, r) => {
        "use strict";
        var n = r(77404);
        t.exports = function (t, e) {
          return function (r, i) {
            if (null == r) return r;
            if (!n(r)) return t(r, i);
            for (
              var o = r.length, a = e ? o : -1, c = Object(r);
              (e ? a-- : ++a < o) && !1 !== i(c[a], a, c);

            );
            return r;
          };
        };
      },
      19121: (t) => {
        "use strict";
        t.exports = require("next/dist/server/app-render/action-async-storage.external.js");
      },
      19131: (t) => {
        "use strict";
        t.exports = function (t, e, r) {
          switch (r.length) {
            case 0:
              return t.call(e);
            case 1:
              return t.call(e, r[0]);
            case 2:
              return t.call(e, r[0], r[1]);
            case 3:
              return t.call(e, r[0], r[1], r[2]);
          }
          return t.apply(e, r);
        };
      },
      19542: (t, e, r) => {
        "use strict";
        var n = r(83649);
        t.exports = function (t, e, r) {
          "__proto__" == e && n
            ? n(t, e, {
                configurable: !0,
                enumerable: !0,
                value: r,
                writable: !0,
              })
            : (t[e] = r);
        };
      },
      19692: (t, e, r) => {
        "use strict";
        r.d(e, { u: () => s });
        var n = r(84205),
          i = r.n(n),
          o = r(79029),
          a = r(18862),
          c = [
            "children",
            "width",
            "height",
            "viewBox",
            "className",
            "style",
            "title",
            "desc",
          ];
        function u() {
          return (u = Object.assign
            ? Object.assign.bind()
            : function (t) {
                for (var e = 1; e < arguments.length; e++) {
                  var r = arguments[e];
                  for (var n in r)
                    Object.prototype.hasOwnProperty.call(r, n) && (t[n] = r[n]);
                }
                return t;
              }).apply(this, arguments);
        }
        function s(t) {
          var e = t.children,
            r = t.width,
            n = t.height,
            s = t.viewBox,
            l = t.className,
            f = t.style,
            p = t.title,
            h = t.desc,
            d = (function (t, e) {
              if (null == t) return {};
              var r,
                n,
                i = (function (t, e) {
                  if (null == t) return {};
                  var r = {};
                  for (var n in t)
                    if (Object.prototype.hasOwnProperty.call(t, n)) {
                      if (e.indexOf(n) >= 0) continue;
                      r[n] = t[n];
                    }
                  return r;
                })(t, e);
              if (Object.getOwnPropertySymbols) {
                var o = Object.getOwnPropertySymbols(t);
                for (n = 0; n < o.length; n++)
                  (r = o[n]),
                    !(e.indexOf(r) >= 0) &&
                      Object.prototype.propertyIsEnumerable.call(t, r) &&
                      (i[r] = t[r]);
              }
              return i;
            })(t, c),
            y = s || { width: r, height: n, x: 0, y: 0 },
            v = (0, o.A)("recharts-surface", l);
          return i().createElement(
            "svg",
            u({}, (0, a.J9)(d, !0, "svg"), {
              className: v,
              width: r,
              height: n,
              style: f,
              viewBox: ""
                .concat(y.x, " ")
                .concat(y.y, " ")
                .concat(y.width, " ")
                .concat(y.height),
            }),
            i().createElement("title", null, p),
            i().createElement("desc", null, h),
            e,
          );
        }
      },
      19771: (t) => {
        "use strict";
        t.exports = require("process");
      },
      19878: (t) => {
        "use strict";
        var e = /\s/;
        t.exports = function (t) {
          for (var r = t.length; r-- && e.test(t.charAt(r)); );
          return r;
        };
      },
      20006: (t) => {
        "use strict";
        t.exports = function (t, e) {
          for (var r = -1, n = e.length, i = t.length; ++r < n; )
            t[i + r] = e[r];
          return t;
        };
      },
      21820: (t) => {
        "use strict";
        t.exports = require("os");
      },
      21958: (t, e, r) => {
        "use strict";
        r.d(e, { I: () => V });
        var n = r(84205);
        function i() {}
        function o(t, e, r) {
          t._context.bezierCurveTo(
            (2 * t._x0 + t._x1) / 3,
            (2 * t._y0 + t._y1) / 3,
            (t._x0 + 2 * t._x1) / 3,
            (t._y0 + 2 * t._y1) / 3,
            (t._x0 + 4 * t._x1 + e) / 6,
            (t._y0 + 4 * t._y1 + r) / 6,
          );
        }
        function a(t) {
          this._context = t;
        }
        function c(t) {
          this._context = t;
        }
        function u(t) {
          this._context = t;
        }
        (a.prototype = {
          areaStart: function () {
            this._line = 0;
          },
          areaEnd: function () {
            this._line = NaN;
          },
          lineStart: function () {
            (this._x0 = this._x1 = this._y0 = this._y1 = NaN),
              (this._point = 0);
          },
          lineEnd: function () {
            switch (this._point) {
              case 3:
                o(this, this._x1, this._y1);
              case 2:
                this._context.lineTo(this._x1, this._y1);
            }
            (this._line || (0 !== this._line && 1 === this._point)) &&
              this._context.closePath(),
              (this._line = 1 - this._line);
          },
          point: function (t, e) {
            switch (((t *= 1), (e *= 1), this._point)) {
              case 0:
                (this._point = 1),
                  this._line
                    ? this._context.lineTo(t, e)
                    : this._context.moveTo(t, e);
                break;
              case 1:
                this._point = 2;
                break;
              case 2:
                (this._point = 3),
                  this._context.lineTo(
                    (5 * this._x0 + this._x1) / 6,
                    (5 * this._y0 + this._y1) / 6,
                  );
              default:
                o(this, t, e);
            }
            (this._x0 = this._x1),
              (this._x1 = t),
              (this._y0 = this._y1),
              (this._y1 = e);
          },
        }),
          (c.prototype = {
            areaStart: i,
            areaEnd: i,
            lineStart: function () {
              (this._x0 =
                this._x1 =
                this._x2 =
                this._x3 =
                this._x4 =
                this._y0 =
                this._y1 =
                this._y2 =
                this._y3 =
                this._y4 =
                  NaN),
                (this._point = 0);
            },
            lineEnd: function () {
              switch (this._point) {
                case 1:
                  this._context.moveTo(this._x2, this._y2),
                    this._context.closePath();
                  break;
                case 2:
                  this._context.moveTo(
                    (this._x2 + 2 * this._x3) / 3,
                    (this._y2 + 2 * this._y3) / 3,
                  ),
                    this._context.lineTo(
                      (this._x3 + 2 * this._x2) / 3,
                      (this._y3 + 2 * this._y2) / 3,
                    ),
                    this._context.closePath();
                  break;
                case 3:
                  this.point(this._x2, this._y2),
                    this.point(this._x3, this._y3),
                    this.point(this._x4, this._y4);
              }
            },
            point: function (t, e) {
              switch (((t *= 1), (e *= 1), this._point)) {
                case 0:
                  (this._point = 1), (this._x2 = t), (this._y2 = e);
                  break;
                case 1:
                  (this._point = 2), (this._x3 = t), (this._y3 = e);
                  break;
                case 2:
                  (this._point = 3),
                    (this._x4 = t),
                    (this._y4 = e),
                    this._context.moveTo(
                      (this._x0 + 4 * this._x1 + t) / 6,
                      (this._y0 + 4 * this._y1 + e) / 6,
                    );
                  break;
                default:
                  o(this, t, e);
              }
              (this._x0 = this._x1),
                (this._x1 = t),
                (this._y0 = this._y1),
                (this._y1 = e);
            },
          }),
          (u.prototype = {
            areaStart: function () {
              this._line = 0;
            },
            areaEnd: function () {
              this._line = NaN;
            },
            lineStart: function () {
              (this._x0 = this._x1 = this._y0 = this._y1 = NaN),
                (this._point = 0);
            },
            lineEnd: function () {
              (this._line || (0 !== this._line && 3 === this._point)) &&
                this._context.closePath(),
                (this._line = 1 - this._line);
            },
            point: function (t, e) {
              switch (((t *= 1), (e *= 1), this._point)) {
                case 0:
                  this._point = 1;
                  break;
                case 1:
                  this._point = 2;
                  break;
                case 2:
                  this._point = 3;
                  var r = (this._x0 + 4 * this._x1 + t) / 6,
                    n = (this._y0 + 4 * this._y1 + e) / 6;
                  this._line
                    ? this._context.lineTo(r, n)
                    : this._context.moveTo(r, n);
                  break;
                case 3:
                  this._point = 4;
                default:
                  o(this, t, e);
              }
              (this._x0 = this._x1),
                (this._x1 = t),
                (this._y0 = this._y1),
                (this._y1 = e);
            },
          });
        class s {
          constructor(t, e) {
            (this._context = t), (this._x = e);
          }
          areaStart() {
            this._line = 0;
          }
          areaEnd() {
            this._line = NaN;
          }
          lineStart() {
            this._point = 0;
          }
          lineEnd() {
            (this._line || (0 !== this._line && 1 === this._point)) &&
              this._context.closePath(),
              (this._line = 1 - this._line);
          }
          point(t, e) {
            switch (((t *= 1), (e *= 1), this._point)) {
              case 0:
                (this._point = 1),
                  this._line
                    ? this._context.lineTo(t, e)
                    : this._context.moveTo(t, e);
                break;
              case 1:
                this._point = 2;
              default:
                this._x
                  ? this._context.bezierCurveTo(
                      (this._x0 = (this._x0 + t) / 2),
                      this._y0,
                      this._x0,
                      e,
                      t,
                      e,
                    )
                  : this._context.bezierCurveTo(
                      this._x0,
                      (this._y0 = (this._y0 + e) / 2),
                      t,
                      this._y0,
                      t,
                      e,
                    );
            }
            (this._x0 = t), (this._y0 = e);
          }
        }
        function l(t) {
          this._context = t;
        }
        function f(t) {
          this._context = t;
        }
        function p(t) {
          return new f(t);
        }
        l.prototype = {
          areaStart: i,
          areaEnd: i,
          lineStart: function () {
            this._point = 0;
          },
          lineEnd: function () {
            this._point && this._context.closePath();
          },
          point: function (t, e) {
            (t *= 1),
              (e *= 1),
              this._point
                ? this._context.lineTo(t, e)
                : ((this._point = 1), this._context.moveTo(t, e));
          },
        };
        function h(t, e, r) {
          var n = t._x1 - t._x0,
            i = e - t._x1,
            o = (t._y1 - t._y0) / (n || (i < 0 && -0)),
            a = (r - t._y1) / (i || (n < 0 && -0));
          return (
            ((o < 0 ? -1 : 1) + (a < 0 ? -1 : 1)) *
              Math.min(
                Math.abs(o),
                Math.abs(a),
                0.5 * Math.abs((o * i + a * n) / (n + i)),
              ) || 0
          );
        }
        function d(t, e) {
          var r = t._x1 - t._x0;
          return r ? ((3 * (t._y1 - t._y0)) / r - e) / 2 : e;
        }
        function y(t, e, r) {
          var n = t._x0,
            i = t._y0,
            o = t._x1,
            a = t._y1,
            c = (o - n) / 3;
          t._context.bezierCurveTo(n + c, i + c * e, o - c, a - c * r, o, a);
        }
        function v(t) {
          this._context = t;
        }
        function m(t) {
          this._context = new b(t);
        }
        function b(t) {
          this._context = t;
        }
        function g(t) {
          this._context = t;
        }
        function x(t) {
          var e,
            r,
            n = t.length - 1,
            i = Array(n),
            o = Array(n),
            a = Array(n);
          for (
            i[0] = 0, o[0] = 2, a[0] = t[0] + 2 * t[1], e = 1;
            e < n - 1;
            ++e
          )
            (i[e] = 1), (o[e] = 4), (a[e] = 4 * t[e] + 2 * t[e + 1]);
          for (
            i[n - 1] = 2, o[n - 1] = 7, a[n - 1] = 8 * t[n - 1] + t[n], e = 1;
            e < n;
            ++e
          )
            (r = i[e] / o[e - 1]), (o[e] -= r), (a[e] -= r * a[e - 1]);
          for (i[n - 1] = a[n - 1] / o[n - 1], e = n - 2; e >= 0; --e)
            i[e] = (a[e] - i[e + 1]) / o[e];
          for (e = 0, o[n - 1] = (t[n] + i[n - 1]) / 2; e < n - 1; ++e)
            o[e] = 2 * t[e + 1] - i[e + 1];
          return [i, o];
        }
        function w(t, e) {
          (this._context = t), (this._t = e);
        }
        (f.prototype = {
          areaStart: function () {
            this._line = 0;
          },
          areaEnd: function () {
            this._line = NaN;
          },
          lineStart: function () {
            this._point = 0;
          },
          lineEnd: function () {
            (this._line || (0 !== this._line && 1 === this._point)) &&
              this._context.closePath(),
              (this._line = 1 - this._line);
          },
          point: function (t, e) {
            switch (((t *= 1), (e *= 1), this._point)) {
              case 0:
                (this._point = 1),
                  this._line
                    ? this._context.lineTo(t, e)
                    : this._context.moveTo(t, e);
                break;
              case 1:
                this._point = 2;
              default:
                this._context.lineTo(t, e);
            }
          },
        }),
          (v.prototype = {
            areaStart: function () {
              this._line = 0;
            },
            areaEnd: function () {
              this._line = NaN;
            },
            lineStart: function () {
              (this._x0 = this._x1 = this._y0 = this._y1 = this._t0 = NaN),
                (this._point = 0);
            },
            lineEnd: function () {
              switch (this._point) {
                case 2:
                  this._context.lineTo(this._x1, this._y1);
                  break;
                case 3:
                  y(this, this._t0, d(this, this._t0));
              }
              (this._line || (0 !== this._line && 1 === this._point)) &&
                this._context.closePath(),
                (this._line = 1 - this._line);
            },
            point: function (t, e) {
              var r = NaN;
              if (((e *= 1), (t *= 1) !== this._x1 || e !== this._y1)) {
                switch (this._point) {
                  case 0:
                    (this._point = 1),
                      this._line
                        ? this._context.lineTo(t, e)
                        : this._context.moveTo(t, e);
                    break;
                  case 1:
                    this._point = 2;
                    break;
                  case 2:
                    (this._point = 3), y(this, d(this, (r = h(this, t, e))), r);
                    break;
                  default:
                    y(this, this._t0, (r = h(this, t, e)));
                }
                (this._x0 = this._x1),
                  (this._x1 = t),
                  (this._y0 = this._y1),
                  (this._y1 = e),
                  (this._t0 = r);
              }
            },
          }),
          ((m.prototype = Object.create(v.prototype)).point = function (t, e) {
            v.prototype.point.call(this, e, t);
          }),
          (b.prototype = {
            moveTo: function (t, e) {
              this._context.moveTo(e, t);
            },
            closePath: function () {
              this._context.closePath();
            },
            lineTo: function (t, e) {
              this._context.lineTo(e, t);
            },
            bezierCurveTo: function (t, e, r, n, i, o) {
              this._context.bezierCurveTo(e, t, n, r, o, i);
            },
          }),
          (g.prototype = {
            areaStart: function () {
              this._line = 0;
            },
            areaEnd: function () {
              this._line = NaN;
            },
            lineStart: function () {
              (this._x = []), (this._y = []);
            },
            lineEnd: function () {
              var t = this._x,
                e = this._y,
                r = t.length;
              if (r)
                if (
                  (this._line
                    ? this._context.lineTo(t[0], e[0])
                    : this._context.moveTo(t[0], e[0]),
                  2 === r)
                )
                  this._context.lineTo(t[1], e[1]);
                else
                  for (var n = x(t), i = x(e), o = 0, a = 1; a < r; ++o, ++a)
                    this._context.bezierCurveTo(
                      n[0][o],
                      i[0][o],
                      n[1][o],
                      i[1][o],
                      t[a],
                      e[a],
                    );
              (this._line || (0 !== this._line && 1 === r)) &&
                this._context.closePath(),
                (this._line = 1 - this._line),
                (this._x = this._y = null);
            },
            point: function (t, e) {
              this._x.push(+t), this._y.push(+e);
            },
          }),
          (w.prototype = {
            areaStart: function () {
              this._line = 0;
            },
            areaEnd: function () {
              this._line = NaN;
            },
            lineStart: function () {
              (this._x = this._y = NaN), (this._point = 0);
            },
            lineEnd: function () {
              0 < this._t &&
                this._t < 1 &&
                2 === this._point &&
                this._context.lineTo(this._x, this._y),
                (this._line || (0 !== this._line && 1 === this._point)) &&
                  this._context.closePath(),
                this._line >= 0 &&
                  ((this._t = 1 - this._t), (this._line = 1 - this._line));
            },
            point: function (t, e) {
              switch (((t *= 1), (e *= 1), this._point)) {
                case 0:
                  (this._point = 1),
                    this._line
                      ? this._context.lineTo(t, e)
                      : this._context.moveTo(t, e);
                  break;
                case 1:
                  this._point = 2;
                default:
                  if (this._t <= 0)
                    this._context.lineTo(this._x, e),
                      this._context.lineTo(t, e);
                  else {
                    var r = this._x * (1 - this._t) + t * this._t;
                    this._context.lineTo(r, this._y),
                      this._context.lineTo(r, e);
                  }
              }
              (this._x = t), (this._y = e);
            },
          });
        var O = r(73498),
          j = r(77095),
          S = r(80855);
        function A(t) {
          return t[0];
        }
        function P(t) {
          return t[1];
        }
        function E(t, e) {
          var r = (0, j.A)(!0),
            n = null,
            i = p,
            o = null,
            a = (0, S.i)(c);
          function c(c) {
            var u,
              s,
              l,
              f = (c = (0, O.A)(c)).length,
              p = !1;
            for (null == n && (o = i((l = a()))), u = 0; u <= f; ++u)
              !(u < f && r((s = c[u]), u, c)) === p &&
                ((p = !p) ? o.lineStart() : o.lineEnd()),
                p && o.point(+t(s, u, c), +e(s, u, c));
            if (l) return (o = null), l + "" || null;
          }
          return (
            (t = "function" == typeof t ? t : void 0 === t ? A : (0, j.A)(t)),
            (e = "function" == typeof e ? e : void 0 === e ? P : (0, j.A)(e)),
            (c.x = function (e) {
              return arguments.length
                ? ((t = "function" == typeof e ? e : (0, j.A)(+e)), c)
                : t;
            }),
            (c.y = function (t) {
              return arguments.length
                ? ((e = "function" == typeof t ? t : (0, j.A)(+t)), c)
                : e;
            }),
            (c.defined = function (t) {
              return arguments.length
                ? ((r = "function" == typeof t ? t : (0, j.A)(!!t)), c)
                : r;
            }),
            (c.curve = function (t) {
              return arguments.length
                ? ((i = t), null != n && (o = i(n)), c)
                : i;
            }),
            (c.context = function (t) {
              return arguments.length
                ? (null == t ? (n = o = null) : (o = i((n = t))), c)
                : n;
            }),
            c
          );
        }
        function k(t, e, r) {
          var n = null,
            i = (0, j.A)(!0),
            o = null,
            a = p,
            c = null,
            u = (0, S.i)(s);
          function s(s) {
            var l,
              f,
              p,
              h,
              d,
              y = (s = (0, O.A)(s)).length,
              v = !1,
              m = Array(y),
              b = Array(y);
            for (null == o && (c = a((d = u()))), l = 0; l <= y; ++l) {
              if (!(l < y && i((h = s[l]), l, s)) === v)
                if ((v = !v)) (f = l), c.areaStart(), c.lineStart();
                else {
                  for (c.lineEnd(), c.lineStart(), p = l - 1; p >= f; --p)
                    c.point(m[p], b[p]);
                  c.lineEnd(), c.areaEnd();
                }
              v &&
                ((m[l] = +t(h, l, s)),
                (b[l] = +e(h, l, s)),
                c.point(n ? +n(h, l, s) : m[l], r ? +r(h, l, s) : b[l]));
            }
            if (d) return (c = null), d + "" || null;
          }
          function l() {
            return E().defined(i).curve(a).context(o);
          }
          return (
            (t = "function" == typeof t ? t : void 0 === t ? A : (0, j.A)(+t)),
            (e =
              "function" == typeof e
                ? e
                : void 0 === e
                  ? (0, j.A)(0)
                  : (0, j.A)(+e)),
            (r = "function" == typeof r ? r : void 0 === r ? P : (0, j.A)(+r)),
            (s.x = function (e) {
              return arguments.length
                ? ((t = "function" == typeof e ? e : (0, j.A)(+e)),
                  (n = null),
                  s)
                : t;
            }),
            (s.x0 = function (e) {
              return arguments.length
                ? ((t = "function" == typeof e ? e : (0, j.A)(+e)), s)
                : t;
            }),
            (s.x1 = function (t) {
              return arguments.length
                ? ((n =
                    null == t
                      ? null
                      : "function" == typeof t
                        ? t
                        : (0, j.A)(+t)),
                  s)
                : n;
            }),
            (s.y = function (t) {
              return arguments.length
                ? ((e = "function" == typeof t ? t : (0, j.A)(+t)),
                  (r = null),
                  s)
                : e;
            }),
            (s.y0 = function (t) {
              return arguments.length
                ? ((e = "function" == typeof t ? t : (0, j.A)(+t)), s)
                : e;
            }),
            (s.y1 = function (t) {
              return arguments.length
                ? ((r =
                    null == t
                      ? null
                      : "function" == typeof t
                        ? t
                        : (0, j.A)(+t)),
                  s)
                : r;
            }),
            (s.lineX0 = s.lineY0 =
              function () {
                return l().x(t).y(e);
              }),
            (s.lineY1 = function () {
              return l().x(t).y(r);
            }),
            (s.lineX1 = function () {
              return l().x(n).y(e);
            }),
            (s.defined = function (t) {
              return arguments.length
                ? ((i = "function" == typeof t ? t : (0, j.A)(!!t)), s)
                : i;
            }),
            (s.curve = function (t) {
              return arguments.length
                ? ((a = t), null != o && (c = a(o)), s)
                : a;
            }),
            (s.context = function (t) {
              return arguments.length
                ? (null == t ? (o = c = null) : (c = a((o = t))), s)
                : o;
            }),
            s
          );
        }
        var _ = r(56830),
          M = r.n(_),
          T = r(4276),
          C = r.n(T),
          N = r(79029),
          I = r(10621),
          D = r(18862),
          B = r(61481);
        function R(t) {
          return (R =
            "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
              ? function (t) {
                  return typeof t;
                }
              : function (t) {
                  return t &&
                    "function" == typeof Symbol &&
                    t.constructor === Symbol &&
                    t !== Symbol.prototype
                    ? "symbol"
                    : typeof t;
                })(t);
        }
        function L() {
          return (L = Object.assign
            ? Object.assign.bind()
            : function (t) {
                for (var e = 1; e < arguments.length; e++) {
                  var r = arguments[e];
                  for (var n in r)
                    Object.prototype.hasOwnProperty.call(r, n) && (t[n] = r[n]);
                }
                return t;
              }).apply(this, arguments);
        }
        function z(t, e) {
          var r = Object.keys(t);
          if (Object.getOwnPropertySymbols) {
            var n = Object.getOwnPropertySymbols(t);
            e &&
              (n = n.filter(function (e) {
                return Object.getOwnPropertyDescriptor(t, e).enumerable;
              })),
              r.push.apply(r, n);
          }
          return r;
        }
        function U(t) {
          for (var e = 1; e < arguments.length; e++) {
            var r = null != arguments[e] ? arguments[e] : {};
            e % 2
              ? z(Object(r), !0).forEach(function (e) {
                  var n, i, o;
                  (n = t),
                    (i = e),
                    (o = r[e]),
                    (i = (function (t) {
                      var e = (function (t, e) {
                        if ("object" != R(t) || !t) return t;
                        var r = t[Symbol.toPrimitive];
                        if (void 0 !== r) {
                          var n = r.call(t, e || "default");
                          if ("object" != R(n)) return n;
                          throw TypeError(
                            "@@toPrimitive must return a primitive value.",
                          );
                        }
                        return ("string" === e ? String : Number)(t);
                      })(t, "string");
                      return "symbol" == R(e) ? e : e + "";
                    })(i)) in n
                      ? Object.defineProperty(n, i, {
                          value: o,
                          enumerable: !0,
                          configurable: !0,
                          writable: !0,
                        })
                      : (n[i] = o);
                })
              : Object.getOwnPropertyDescriptors
                ? Object.defineProperties(
                    t,
                    Object.getOwnPropertyDescriptors(r),
                  )
                : z(Object(r)).forEach(function (e) {
                    Object.defineProperty(
                      t,
                      e,
                      Object.getOwnPropertyDescriptor(r, e),
                    );
                  });
          }
          return t;
        }
        var F = {
            curveBasisClosed: function (t) {
              return new c(t);
            },
            curveBasisOpen: function (t) {
              return new u(t);
            },
            curveBasis: function (t) {
              return new a(t);
            },
            curveBumpX: function (t) {
              return new s(t, !0);
            },
            curveBumpY: function (t) {
              return new s(t, !1);
            },
            curveLinearClosed: function (t) {
              return new l(t);
            },
            curveLinear: p,
            curveMonotoneX: function (t) {
              return new v(t);
            },
            curveMonotoneY: function (t) {
              return new m(t);
            },
            curveNatural: function (t) {
              return new g(t);
            },
            curveStep: function (t) {
              return new w(t, 0.5);
            },
            curveStepAfter: function (t) {
              return new w(t, 1);
            },
            curveStepBefore: function (t) {
              return new w(t, 0);
            },
          },
          q = function (t) {
            return t.x === +t.x && t.y === +t.y;
          },
          $ = function (t) {
            return t.x;
          },
          W = function (t) {
            return t.y;
          },
          X = function (t, e) {
            if (C()(t)) return t;
            var r = "curve".concat(M()(t));
            return ("curveMonotone" === r || "curveBump" === r) && e
              ? F["".concat(r).concat("vertical" === e ? "Y" : "X")]
              : F[r] || p;
          },
          H = function (t) {
            var e,
              r = t.type,
              n = t.points,
              i = void 0 === n ? [] : n,
              o = t.baseLine,
              a = t.layout,
              c = t.connectNulls,
              u = void 0 !== c && c,
              s = X(void 0 === r ? "linear" : r, a),
              l = u
                ? i.filter(function (t) {
                    return q(t);
                  })
                : i;
            if (Array.isArray(o)) {
              var f = u
                  ? o.filter(function (t) {
                      return q(t);
                    })
                  : o,
                p = l.map(function (t, e) {
                  return U(U({}, t), {}, { base: f[e] });
                });
              return (
                (e =
                  "vertical" === a
                    ? k()
                        .y(W)
                        .x1($)
                        .x0(function (t) {
                          return t.base.x;
                        })
                    : k()
                        .x($)
                        .y1(W)
                        .y0(function (t) {
                          return t.base.y;
                        }))
                  .defined(q)
                  .curve(s),
                e(p)
              );
            }
            return (
              (e =
                "vertical" === a && (0, B.Et)(o)
                  ? k().y(W).x1($).x0(o)
                  : (0, B.Et)(o)
                    ? k().x($).y1(W).y0(o)
                    : E().x($).y(W))
                .defined(q)
                .curve(s),
              e(l)
            );
          },
          V = function (t) {
            var e = t.className,
              r = t.points,
              i = t.path,
              o = t.pathRef;
            if ((!r || !r.length) && !i) return null;
            var a = r && r.length ? H(t) : i;
            return n.createElement(
              "path",
              L({}, (0, D.J9)(t, !1), (0, I._U)(t), {
                className: (0, N.A)("recharts-curve", e),
                d: a,
                ref: o,
              }),
            );
          };
      },
      23899: (t) => {
        "use strict";
        t.exports = function () {
          return [];
        };
      },
      23995: (t, e, r) => {
        "use strict";
        var n = r(11730),
          i = r(64895),
          o = r(87403);
        t.exports = function (t, e) {
          return o(i(t, e, n), t + "");
        };
      },
      24236: (t, e, r) => {
        "use strict";
        r.d(e, { A: () => n });
        function n(t, e) {
          if (!t) throw Error("Invariant failed");
        }
      },
      24547: (t, e, r) => {
        "use strict";
        r.d(e, {
          A: () =>
            function t() {
              var e = new n(),
                r = [],
                i = [],
                o = c;
              function u(t) {
                let n = e.get(t);
                if (void 0 === n) {
                  if (o !== c) return o;
                  e.set(t, (n = r.push(t) - 1));
                }
                return i[n % i.length];
              }
              return (
                (u.domain = function (t) {
                  if (!arguments.length) return r.slice();
                  for (let i of ((r = []), (e = new n()), t))
                    e.has(i) || e.set(i, r.push(i) - 1);
                  return u;
                }),
                (u.range = function (t) {
                  return arguments.length
                    ? ((i = Array.from(t)), u)
                    : i.slice();
                }),
                (u.unknown = function (t) {
                  return arguments.length ? ((o = t), u) : o;
                }),
                (u.copy = function () {
                  return t(r, i).unknown(o);
                }),
                a.C.apply(u, arguments),
                u
              );
            },
          h: () => c,
        });
        class n extends Map {
          constructor(t, e = o) {
            if (
              (super(),
              Object.defineProperties(this, {
                _intern: { value: new Map() },
                _key: { value: e },
              }),
              null != t)
            )
              for (let [e, r] of t) this.set(e, r);
          }
          get(t) {
            return super.get(i(this, t));
          }
          has(t) {
            return super.has(i(this, t));
          }
          set(t, e) {
            return super.set(
              (function ({ _intern: t, _key: e }, r) {
                let n = e(r);
                return t.has(n) ? t.get(n) : (t.set(n, r), r);
              })(this, t),
              e,
            );
          }
          delete(t) {
            return super.delete(
              (function ({ _intern: t, _key: e }, r) {
                let n = e(r);
                return t.has(n) && ((r = t.get(n)), t.delete(n)), r;
              })(this, t),
            );
          }
        }
        function i({ _intern: t, _key: e }, r) {
          let n = e(r);
          return t.has(n) ? t.get(n) : r;
        }
        function o(t) {
          return null !== t && "object" == typeof t ? t.valueOf() : t;
        }
        var a = r(7154);
        let c = Symbol("implicit");
      },
      24570: (t, e, r) => {
        "use strict";
        var n = r(4167),
          i = r(513),
          o = r(98373);
        t.exports = function () {
          (this.size = 0),
            (this.__data__ = {
              hash: new n(),
              map: new (o || i)(),
              string: new n(),
            });
        };
      },
      24762: (t, e, r) => {
        "use strict";
        var n = r(51758),
          i = r(77404),
          o = r(72459),
          a = r(95311);
        t.exports = function (t, e, r) {
          if (!a(r)) return !1;
          var c = typeof e;
          return (
            ("number" == c
              ? !!(i(r) && o(e, r.length))
              : "string" == c && e in r) && n(r[e], t)
          );
        };
      },
      24838: (t, e, r) => {
        "use strict";
        var n = r(38155),
          i = r(14170),
          o = r(83855),
          a = r(85412),
          c = 1 / 0,
          u = n ? n.prototype : void 0,
          s = u ? u.toString : void 0;
        t.exports = function t(e) {
          if ("string" == typeof e) return e;
          if (o(e)) return i(e, t) + "";
          if (a(e)) return s ? s.call(e) : "";
          var r = e + "";
          return "0" == r && 1 / e == -c ? "-0" : r;
        };
      },
      25369: (t) => {
        "use strict";
        t.exports = function (t) {
          return t != t;
        };
      },
      25696: (t, e, r) => {
        "use strict";
        r.r(e),
          r.d(e, {
            GlobalError: () => o.default,
            __next_app__: () => l,
            pages: () => s,
            routeModule: () => f,
            tree: () => u,
          });
        var n = r(11610),
          i = r(51293),
          o = r(59059),
          a = r(17770),
          c = {};
        for (let t in a)
          0 >
            [
              "default",
              "tree",
              "pages",
              "GlobalError",
              "__next_app__",
              "routeModule",
            ].indexOf(t) && (c[t] = () => a[t]);
        r.d(e, c);
        let u = {
            children: [
              "",
              {
                children: [
                  "(authenticated)",
                  {
                    children: [
                      "dashboard",
                      {
                        children: [
                          "analytics",
                          {
                            children: [
                              "__PAGE__",
                              {},
                              {
                                page: [
                                  () =>
                                    Promise.resolve().then(r.bind(r, 58728)),
                                  "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\(authenticated)\\dashboard\\analytics\\page.tsx",
                                ],
                              },
                            ],
                          },
                          {
                            loading: [
                              () => Promise.resolve().then(r.bind(r, 869)),
                              "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\(authenticated)\\dashboard\\analytics\\loading.tsx",
                            ],
                          },
                        ],
                      },
                      {
                        layout: [
                          () => Promise.resolve().then(r.bind(r, 73856)),
                          "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\(authenticated)\\dashboard\\layout.tsx",
                        ],
                        loading: [
                          () => Promise.resolve().then(r.bind(r, 97020)),
                          "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\(authenticated)\\dashboard\\loading.tsx",
                        ],
                      },
                    ],
                  },
                  {
                    layout: [
                      () => Promise.resolve().then(r.bind(r, 72967)),
                      "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\(authenticated)\\layout.tsx",
                    ],
                    forbidden: [
                      () => Promise.resolve().then(r.t.bind(r, 57382, 23)),
                      "next/dist/client/components/forbidden-error",
                    ],
                    unauthorized: [
                      () => Promise.resolve().then(r.t.bind(r, 87039, 23)),
                      "next/dist/client/components/unauthorized-error",
                    ],
                  },
                ],
              },
              {
                layout: [
                  () => Promise.resolve().then(r.bind(r, 22630)),
                  "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\layout.tsx",
                ],
                error: [
                  () => Promise.resolve().then(r.bind(r, 94745)),
                  "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\error.tsx",
                ],
                "global-error": [
                  () => Promise.resolve().then(r.bind(r, 59059)),
                  "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\global-error.tsx",
                ],
                "not-found": [
                  () => Promise.resolve().then(r.bind(r, 53974)),
                  "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\not-found.tsx",
                ],
                forbidden: [
                  () => Promise.resolve().then(r.t.bind(r, 57382, 23)),
                  "next/dist/client/components/forbidden-error",
                ],
                unauthorized: [
                  () => Promise.resolve().then(r.t.bind(r, 87039, 23)),
                  "next/dist/client/components/unauthorized-error",
                ],
              },
            ],
          }.children,
          s = [
            "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\(authenticated)\\dashboard\\analytics\\page.tsx",
          ],
          l = { require: r, loadChunk: () => Promise.resolve() },
          f = new n.AppPageRouteModule({
            definition: {
              kind: i.RouteKind.APP_PAGE,
              page: "/(authenticated)/dashboard/analytics/page",
              pathname: "/dashboard/analytics",
              bundlePath: "",
              filename: "",
              appPaths: [],
            },
            userland: { loaderTree: u },
          });
      },
      27005: (t, e, r) => {
        "use strict";
        var n = r(20006),
          i = r(83855);
        t.exports = function (t, e, r) {
          var o = e(t);
          return i(t) ? o : n(o, r(t));
        };
      },
      27030: (t, e, r) => {
        "use strict";
        t.exports = r(40671).Uint8Array;
      },
      27501: (t, e, r) => {
        "use strict";
        var n = r(52975),
          i = r(30277),
          o = r(79208),
          a = r(6359);
        t.exports = function (t) {
          return o(t) ? n(a(t)) : i(t);
        };
      },
      27871: (t, e, r) => {
        "use strict";
        var n = r(83855),
          i = r(79208),
          o = r(34384),
          a = r(12836);
        t.exports = function (t, e) {
          return n(t) ? t : i(t, e) ? [t] : o(a(t));
        };
      },
      27909: (t, e, r) => {
        "use strict";
        var n = r(28017),
          i = r(83855),
          o = r(64508);
        t.exports = function (t) {
          return (
            "string" == typeof t || (!i(t) && o(t) && "[object String]" == n(t))
          );
        };
      },
      27910: (t) => {
        "use strict";
        t.exports = require("stream");
      },
      28017: (t, e, r) => {
        "use strict";
        var n = r(38155),
          i = r(28841),
          o = r(31868),
          a = n ? n.toStringTag : void 0;
        t.exports = function (t) {
          return null == t
            ? void 0 === t
              ? "[object Undefined]"
              : "[object Null]"
            : a && a in Object(t)
              ? i(t)
              : o(t);
        };
      },
      28354: (t) => {
        "use strict";
        t.exports = require("util");
      },
      28841: (t, e, r) => {
        "use strict";
        var n = r(38155),
          i = Object.prototype,
          o = i.hasOwnProperty,
          a = i.toString,
          c = n ? n.toStringTag : void 0;
        t.exports = function (t) {
          var e = o.call(t, c),
            r = t[c];
          try {
            t[c] = void 0;
            var n = !0;
          } catch (t) {}
          var i = a.call(t);
          return n && (e ? (t[c] = r) : delete t[c]), i;
        };
      },
      28886: (t) => {
        "use strict";
        t.exports = function (t, e) {
          for (var r = -1, n = Array(t); ++r < t; ) n[r] = e(r);
          return n;
        };
      },
      29021: (t) => {
        "use strict";
        t.exports = require("fs");
      },
      29294: (t) => {
        "use strict";
        t.exports = require("next/dist/server/app-render/work-async-storage.external.js");
      },
      29392: (t, e, r) => {
        "use strict";
        r.d(e, { gu: () => eI });
        var n = r(84205),
          i = r.n(n),
          o = r(58929),
          a = r.n(o),
          c = r(4276),
          u = r.n(c),
          s = r(1419),
          l = r.n(s),
          f = r(65946),
          p = r.n(f),
          h = r(60897),
          d = r.n(h),
          y = r(75672),
          v = r.n(y),
          m = r(79029),
          b = r(24236),
          g = r(19692),
          x = r(57830),
          w = r(39643),
          O = r(93224),
          j = r(77214),
          S = r(6544),
          A = r(18862),
          P = r(34574),
          E = r(6265),
          k = r(75243),
          _ = r(61481);
        function M(t) {
          return (M =
            "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
              ? function (t) {
                  return typeof t;
                }
              : function (t) {
                  return t &&
                    "function" == typeof Symbol &&
                    t.constructor === Symbol &&
                    t !== Symbol.prototype
                    ? "symbol"
                    : typeof t;
                })(t);
        }
        function T(t, e) {
          var r = Object.keys(t);
          if (Object.getOwnPropertySymbols) {
            var n = Object.getOwnPropertySymbols(t);
            e &&
              (n = n.filter(function (e) {
                return Object.getOwnPropertyDescriptor(t, e).enumerable;
              })),
              r.push.apply(r, n);
          }
          return r;
        }
        function C(t) {
          for (var e = 1; e < arguments.length; e++) {
            var r = null != arguments[e] ? arguments[e] : {};
            e % 2
              ? T(Object(r), !0).forEach(function (e) {
                  N(t, e, r[e]);
                })
              : Object.getOwnPropertyDescriptors
                ? Object.defineProperties(
                    t,
                    Object.getOwnPropertyDescriptors(r),
                  )
                : T(Object(r)).forEach(function (e) {
                    Object.defineProperty(
                      t,
                      e,
                      Object.getOwnPropertyDescriptor(r, e),
                    );
                  });
          }
          return t;
        }
        function N(t, e, r) {
          var n;
          return (
            ((n = (function (t, e) {
              if ("object" != M(t) || !t) return t;
              var r = t[Symbol.toPrimitive];
              if (void 0 !== r) {
                var n = r.call(t, e || "default");
                if ("object" != M(n)) return n;
                throw TypeError("@@toPrimitive must return a primitive value.");
              }
              return ("string" === e ? String : Number)(t);
            })(e, "string")),
            (e = "symbol" == M(n) ? n : n + "") in t)
              ? Object.defineProperty(t, e, {
                  value: r,
                  enumerable: !0,
                  configurable: !0,
                  writable: !0,
                })
              : (t[e] = r),
            t
          );
        }
        var I = ["Webkit", "Moz", "O", "ms"],
          D = function (t, e) {
            if (!t) return null;
            var r = t.replace(/(\w)/, function (t) {
                return t.toUpperCase();
              }),
              n = I.reduce(function (t, n) {
                return C(C({}, t), {}, N({}, n + r, e));
              }, {});
            return (n[t] = e), n;
          };
        function B(t) {
          return (B =
            "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
              ? function (t) {
                  return typeof t;
                }
              : function (t) {
                  return t &&
                    "function" == typeof Symbol &&
                    t.constructor === Symbol &&
                    t !== Symbol.prototype
                    ? "symbol"
                    : typeof t;
                })(t);
        }
        function R() {
          return (R = Object.assign
            ? Object.assign.bind()
            : function (t) {
                for (var e = 1; e < arguments.length; e++) {
                  var r = arguments[e];
                  for (var n in r)
                    Object.prototype.hasOwnProperty.call(r, n) && (t[n] = r[n]);
                }
                return t;
              }).apply(this, arguments);
        }
        function L(t, e) {
          var r = Object.keys(t);
          if (Object.getOwnPropertySymbols) {
            var n = Object.getOwnPropertySymbols(t);
            e &&
              (n = n.filter(function (e) {
                return Object.getOwnPropertyDescriptor(t, e).enumerable;
              })),
              r.push.apply(r, n);
          }
          return r;
        }
        function z(t) {
          for (var e = 1; e < arguments.length; e++) {
            var r = null != arguments[e] ? arguments[e] : {};
            e % 2
              ? L(Object(r), !0).forEach(function (e) {
                  W(t, e, r[e]);
                })
              : Object.getOwnPropertyDescriptors
                ? Object.defineProperties(
                    t,
                    Object.getOwnPropertyDescriptors(r),
                  )
                : L(Object(r)).forEach(function (e) {
                    Object.defineProperty(
                      t,
                      e,
                      Object.getOwnPropertyDescriptor(r, e),
                    );
                  });
          }
          return t;
        }
        function U(t, e) {
          for (var r = 0; r < e.length; r++) {
            var n = e[r];
            (n.enumerable = n.enumerable || !1),
              (n.configurable = !0),
              "value" in n && (n.writable = !0),
              Object.defineProperty(t, X(n.key), n);
          }
        }
        function F() {
          try {
            var t = !Boolean.prototype.valueOf.call(
              Reflect.construct(Boolean, [], function () {}),
            );
          } catch (t) {}
          return (F = function () {
            return !!t;
          })();
        }
        function q(t) {
          return (q = Object.setPrototypeOf
            ? Object.getPrototypeOf.bind()
            : function (t) {
                return t.__proto__ || Object.getPrototypeOf(t);
              })(t);
        }
        function $(t, e) {
          return ($ = Object.setPrototypeOf
            ? Object.setPrototypeOf.bind()
            : function (t, e) {
                return (t.__proto__ = e), t;
              })(t, e);
        }
        function W(t, e, r) {
          return (
            (e = X(e)) in t
              ? Object.defineProperty(t, e, {
                  value: r,
                  enumerable: !0,
                  configurable: !0,
                  writable: !0,
                })
              : (t[e] = r),
            t
          );
        }
        function X(t) {
          var e = (function (t, e) {
            if ("object" != B(t) || !t) return t;
            var r = t[Symbol.toPrimitive];
            if (void 0 !== r) {
              var n = r.call(t, e || "default");
              if ("object" != B(n)) return n;
              throw TypeError("@@toPrimitive must return a primitive value.");
            }
            return ("string" === e ? String : Number)(t);
          })(t, "string");
          return "symbol" == B(e) ? e : e + "";
        }
        var H = function (t) {
            var e = t.data,
              r = t.startIndex,
              n = t.endIndex,
              i = t.x,
              o = t.width,
              a = t.travellerWidth;
            if (!e || !e.length) return {};
            var c = e.length,
              u = (0, P.z)()
                .domain(l()(0, c))
                .range([i, i + o - a]),
              s = u.domain().map(function (t) {
                return u(t);
              });
            return {
              isTextActive: !1,
              isSlideMoving: !1,
              isTravellerMoving: !1,
              isTravellerFocused: !1,
              startX: u(r),
              endX: u(n),
              scale: u,
              scaleValues: s,
            };
          },
          V = function (t) {
            return t.changedTouches && !!t.changedTouches.length;
          },
          K = (function (t) {
            var e, r;
            function o(t) {
              var e, r, n;
              if (!(this instanceof o))
                throw TypeError("Cannot call a class as a function");
              return (
                (r = o),
                (n = [t]),
                (r = q(r)),
                W(
                  (e = (function (t, e) {
                    if (e && ("object" === B(e) || "function" == typeof e))
                      return e;
                    if (void 0 !== e)
                      throw TypeError(
                        "Derived constructors may only return object or undefined",
                      );
                    var r = t;
                    if (void 0 === r)
                      throw ReferenceError(
                        "this hasn't been initialised - super() hasn't been called",
                      );
                    return r;
                  })(
                    this,
                    F()
                      ? Reflect.construct(r, n || [], q(this).constructor)
                      : r.apply(this, n),
                  )),
                  "handleDrag",
                  function (t) {
                    e.leaveTimer &&
                      (clearTimeout(e.leaveTimer), (e.leaveTimer = null)),
                      e.state.isTravellerMoving
                        ? e.handleTravellerMove(t)
                        : e.state.isSlideMoving && e.handleSlideDrag(t);
                  },
                ),
                W(e, "handleTouchMove", function (t) {
                  null != t.changedTouches &&
                    t.changedTouches.length > 0 &&
                    e.handleDrag(t.changedTouches[0]);
                }),
                W(e, "handleDragEnd", function () {
                  e.setState(
                    { isTravellerMoving: !1, isSlideMoving: !1 },
                    function () {
                      var t = e.props,
                        r = t.endIndex,
                        n = t.onDragEnd,
                        i = t.startIndex;
                      null == n || n({ endIndex: r, startIndex: i });
                    },
                  ),
                    e.detachDragEndListener();
                }),
                W(e, "handleLeaveWrapper", function () {
                  (e.state.isTravellerMoving || e.state.isSlideMoving) &&
                    (e.leaveTimer = window.setTimeout(
                      e.handleDragEnd,
                      e.props.leaveTimeOut,
                    ));
                }),
                W(e, "handleEnterSlideOrTraveller", function () {
                  e.setState({ isTextActive: !0 });
                }),
                W(e, "handleLeaveSlideOrTraveller", function () {
                  e.setState({ isTextActive: !1 });
                }),
                W(e, "handleSlideDragStart", function (t) {
                  var r = V(t) ? t.changedTouches[0] : t;
                  e.setState({
                    isTravellerMoving: !1,
                    isSlideMoving: !0,
                    slideMoveStartX: r.pageX,
                  }),
                    e.attachDragEndListener();
                }),
                (e.travellerDragStartHandlers = {
                  startX: e.handleTravellerDragStart.bind(e, "startX"),
                  endX: e.handleTravellerDragStart.bind(e, "endX"),
                }),
                (e.state = {}),
                e
              );
            }
            if ("function" != typeof t && null !== t)
              throw TypeError(
                "Super expression must either be null or a function",
              );
            return (
              (o.prototype = Object.create(t && t.prototype, {
                constructor: { value: o, writable: !0, configurable: !0 },
              })),
              Object.defineProperty(o, "prototype", { writable: !1 }),
              t && $(o, t),
              (e = [
                {
                  key: "componentWillUnmount",
                  value: function () {
                    this.leaveTimer &&
                      (clearTimeout(this.leaveTimer), (this.leaveTimer = null)),
                      this.detachDragEndListener();
                  },
                },
                {
                  key: "getIndex",
                  value: function (t) {
                    var e = t.startX,
                      r = t.endX,
                      n = this.state.scaleValues,
                      i = this.props,
                      a = i.gap,
                      c = i.data.length - 1,
                      u = Math.min(e, r),
                      s = Math.max(e, r),
                      l = o.getIndexInRange(n, u),
                      f = o.getIndexInRange(n, s);
                    return {
                      startIndex: l - (l % a),
                      endIndex: f === c ? c : f - (f % a),
                    };
                  },
                },
                {
                  key: "getTextOfTick",
                  value: function (t) {
                    var e = this.props,
                      r = e.data,
                      n = e.tickFormatter,
                      i = e.dataKey,
                      o = (0, k.kr)(r[t], i, t);
                    return u()(n) ? n(o, t) : o;
                  },
                },
                {
                  key: "attachDragEndListener",
                  value: function () {
                    window.addEventListener("mouseup", this.handleDragEnd, !0),
                      window.addEventListener(
                        "touchend",
                        this.handleDragEnd,
                        !0,
                      ),
                      window.addEventListener("mousemove", this.handleDrag, !0);
                  },
                },
                {
                  key: "detachDragEndListener",
                  value: function () {
                    window.removeEventListener(
                      "mouseup",
                      this.handleDragEnd,
                      !0,
                    ),
                      window.removeEventListener(
                        "touchend",
                        this.handleDragEnd,
                        !0,
                      ),
                      window.removeEventListener(
                        "mousemove",
                        this.handleDrag,
                        !0,
                      );
                  },
                },
                {
                  key: "handleSlideDrag",
                  value: function (t) {
                    var e = this.state,
                      r = e.slideMoveStartX,
                      n = e.startX,
                      i = e.endX,
                      o = this.props,
                      a = o.x,
                      c = o.width,
                      u = o.travellerWidth,
                      s = o.startIndex,
                      l = o.endIndex,
                      f = o.onChange,
                      p = t.pageX - r;
                    p > 0
                      ? (p = Math.min(p, a + c - u - i, a + c - u - n))
                      : p < 0 && (p = Math.max(p, a - n, a - i));
                    var h = this.getIndex({ startX: n + p, endX: i + p });
                    (h.startIndex !== s || h.endIndex !== l) && f && f(h),
                      this.setState({
                        startX: n + p,
                        endX: i + p,
                        slideMoveStartX: t.pageX,
                      });
                  },
                },
                {
                  key: "handleTravellerDragStart",
                  value: function (t, e) {
                    var r = V(e) ? e.changedTouches[0] : e;
                    this.setState({
                      isSlideMoving: !1,
                      isTravellerMoving: !0,
                      movingTravellerId: t,
                      brushMoveStartX: r.pageX,
                    }),
                      this.attachDragEndListener();
                  },
                },
                {
                  key: "handleTravellerMove",
                  value: function (t) {
                    var e = this.state,
                      r = e.brushMoveStartX,
                      n = e.movingTravellerId,
                      i = e.endX,
                      o = e.startX,
                      a = this.state[n],
                      c = this.props,
                      u = c.x,
                      s = c.width,
                      l = c.travellerWidth,
                      f = c.onChange,
                      p = c.gap,
                      h = c.data,
                      d = { startX: this.state.startX, endX: this.state.endX },
                      y = t.pageX - r;
                    y > 0
                      ? (y = Math.min(y, u + s - l - a))
                      : y < 0 && (y = Math.max(y, u - a)),
                      (d[n] = a + y);
                    var v = this.getIndex(d),
                      m = v.startIndex,
                      b = v.endIndex,
                      g = function () {
                        var t = h.length - 1;
                        return (
                          ("startX" === n &&
                            (i > o ? m % p == 0 : b % p == 0)) ||
                          (!!(i < o) && b === t) ||
                          ("endX" === n && (i > o ? b % p == 0 : m % p == 0)) ||
                          (!!(i > o) && b === t)
                        );
                      };
                    this.setState(
                      W(W({}, n, a + y), "brushMoveStartX", t.pageX),
                      function () {
                        f && g() && f(v);
                      },
                    );
                  },
                },
                {
                  key: "handleTravellerMoveKeyboard",
                  value: function (t, e) {
                    var r = this,
                      n = this.state,
                      i = n.scaleValues,
                      o = n.startX,
                      a = n.endX,
                      c = this.state[e],
                      u = i.indexOf(c);
                    if (-1 !== u) {
                      var s = u + t;
                      if (-1 !== s && !(s >= i.length)) {
                        var l = i[s];
                        ("startX" === e && l >= a) ||
                          ("endX" === e && l <= o) ||
                          this.setState(W({}, e, l), function () {
                            r.props.onChange(
                              r.getIndex({
                                startX: r.state.startX,
                                endX: r.state.endX,
                              }),
                            );
                          });
                      }
                    }
                  },
                },
                {
                  key: "renderBackground",
                  value: function () {
                    var t = this.props,
                      e = t.x,
                      r = t.y,
                      n = t.width,
                      o = t.height,
                      a = t.fill,
                      c = t.stroke;
                    return i().createElement("rect", {
                      stroke: c,
                      fill: a,
                      x: e,
                      y: r,
                      width: n,
                      height: o,
                    });
                  },
                },
                {
                  key: "renderPanorama",
                  value: function () {
                    var t = this.props,
                      e = t.x,
                      r = t.y,
                      o = t.width,
                      a = t.height,
                      c = t.data,
                      u = t.children,
                      s = t.padding,
                      l = n.Children.only(u);
                    return l
                      ? i().cloneElement(l, {
                          x: e,
                          y: r,
                          width: o,
                          height: a,
                          margin: s,
                          compact: !0,
                          data: c,
                        })
                      : null;
                  },
                },
                {
                  key: "renderTravellerLayer",
                  value: function (t, e) {
                    var r,
                      n,
                      a = this,
                      c = this.props,
                      u = c.y,
                      s = c.travellerWidth,
                      l = c.height,
                      f = c.traveller,
                      p = c.ariaLabel,
                      h = c.data,
                      d = c.startIndex,
                      y = c.endIndex,
                      v = Math.max(t, this.props.x),
                      m = z(
                        z({}, (0, A.J9)(this.props, !1)),
                        {},
                        { x: v, y: u, width: s, height: l },
                      ),
                      b =
                        p ||
                        "Min value: "
                          .concat(
                            null == (r = h[d]) ? void 0 : r.name,
                            ", Max value: ",
                          )
                          .concat(null == (n = h[y]) ? void 0 : n.name);
                    return i().createElement(
                      x.W,
                      {
                        tabIndex: 0,
                        role: "slider",
                        "aria-label": b,
                        "aria-valuenow": t,
                        className: "recharts-brush-traveller",
                        onMouseEnter: this.handleEnterSlideOrTraveller,
                        onMouseLeave: this.handleLeaveSlideOrTraveller,
                        onMouseDown: this.travellerDragStartHandlers[e],
                        onTouchStart: this.travellerDragStartHandlers[e],
                        onKeyDown: function (t) {
                          ["ArrowLeft", "ArrowRight"].includes(t.key) &&
                            (t.preventDefault(),
                            t.stopPropagation(),
                            a.handleTravellerMoveKeyboard(
                              "ArrowRight" === t.key ? 1 : -1,
                              e,
                            ));
                        },
                        onFocus: function () {
                          a.setState({ isTravellerFocused: !0 });
                        },
                        onBlur: function () {
                          a.setState({ isTravellerFocused: !1 });
                        },
                        style: { cursor: "col-resize" },
                      },
                      o.renderTraveller(f, m),
                    );
                  },
                },
                {
                  key: "renderSlide",
                  value: function (t, e) {
                    var r = this.props,
                      n = r.y,
                      o = r.height,
                      a = r.stroke,
                      c = r.travellerWidth,
                      u = Math.min(t, e) + c,
                      s = Math.max(Math.abs(e - t) - c, 0);
                    return i().createElement("rect", {
                      className: "recharts-brush-slide",
                      onMouseEnter: this.handleEnterSlideOrTraveller,
                      onMouseLeave: this.handleLeaveSlideOrTraveller,
                      onMouseDown: this.handleSlideDragStart,
                      onTouchStart: this.handleSlideDragStart,
                      style: { cursor: "move" },
                      stroke: "none",
                      fill: a,
                      fillOpacity: 0.2,
                      x: u,
                      y: n,
                      width: s,
                      height: o,
                    });
                  },
                },
                {
                  key: "renderText",
                  value: function () {
                    var t = this.props,
                      e = t.startIndex,
                      r = t.endIndex,
                      n = t.y,
                      o = t.height,
                      a = t.travellerWidth,
                      c = t.stroke,
                      u = this.state,
                      s = u.startX,
                      l = u.endX,
                      f = { pointerEvents: "none", fill: c };
                    return i().createElement(
                      x.W,
                      { className: "recharts-brush-texts" },
                      i().createElement(
                        E.E,
                        R(
                          {
                            textAnchor: "end",
                            verticalAnchor: "middle",
                            x: Math.min(s, l) - 5,
                            y: n + o / 2,
                          },
                          f,
                        ),
                        this.getTextOfTick(e),
                      ),
                      i().createElement(
                        E.E,
                        R(
                          {
                            textAnchor: "start",
                            verticalAnchor: "middle",
                            x: Math.max(s, l) + a + 5,
                            y: n + o / 2,
                          },
                          f,
                        ),
                        this.getTextOfTick(r),
                      ),
                    );
                  },
                },
                {
                  key: "render",
                  value: function () {
                    var t = this.props,
                      e = t.data,
                      r = t.className,
                      n = t.children,
                      o = t.x,
                      a = t.y,
                      c = t.width,
                      u = t.height,
                      s = t.alwaysShowText,
                      l = this.state,
                      f = l.startX,
                      p = l.endX,
                      h = l.isTextActive,
                      d = l.isSlideMoving,
                      y = l.isTravellerMoving,
                      v = l.isTravellerFocused;
                    if (
                      !e ||
                      !e.length ||
                      !(0, _.Et)(o) ||
                      !(0, _.Et)(a) ||
                      !(0, _.Et)(c) ||
                      !(0, _.Et)(u) ||
                      c <= 0 ||
                      u <= 0
                    )
                      return null;
                    var b = (0, m.A)("recharts-brush", r),
                      g = 1 === i().Children.count(n),
                      w = D("userSelect", "none");
                    return i().createElement(
                      x.W,
                      {
                        className: b,
                        onMouseLeave: this.handleLeaveWrapper,
                        onTouchMove: this.handleTouchMove,
                        style: w,
                      },
                      this.renderBackground(),
                      g && this.renderPanorama(),
                      this.renderSlide(f, p),
                      this.renderTravellerLayer(f, "startX"),
                      this.renderTravellerLayer(p, "endX"),
                      (h || d || y || v || s) && this.renderText(),
                    );
                  },
                },
              ]),
              (r = [
                {
                  key: "renderDefaultTraveller",
                  value: function (t) {
                    var e = t.x,
                      r = t.y,
                      n = t.width,
                      o = t.height,
                      a = t.stroke,
                      c = Math.floor(r + o / 2) - 1;
                    return i().createElement(
                      i().Fragment,
                      null,
                      i().createElement("rect", {
                        x: e,
                        y: r,
                        width: n,
                        height: o,
                        fill: a,
                        stroke: "none",
                      }),
                      i().createElement("line", {
                        x1: e + 1,
                        y1: c,
                        x2: e + n - 1,
                        y2: c,
                        fill: "none",
                        stroke: "#fff",
                      }),
                      i().createElement("line", {
                        x1: e + 1,
                        y1: c + 2,
                        x2: e + n - 1,
                        y2: c + 2,
                        fill: "none",
                        stroke: "#fff",
                      }),
                    );
                  },
                },
                {
                  key: "renderTraveller",
                  value: function (t, e) {
                    var r;
                    return i().isValidElement(t)
                      ? i().cloneElement(t, e)
                      : u()(t)
                        ? t(e)
                        : o.renderDefaultTraveller(e);
                  },
                },
                {
                  key: "getDerivedStateFromProps",
                  value: function (t, e) {
                    var r = t.data,
                      n = t.width,
                      i = t.x,
                      o = t.travellerWidth,
                      a = t.updateId,
                      c = t.startIndex,
                      u = t.endIndex;
                    if (r !== e.prevData || a !== e.prevUpdateId)
                      return z(
                        {
                          prevData: r,
                          prevTravellerWidth: o,
                          prevUpdateId: a,
                          prevX: i,
                          prevWidth: n,
                        },
                        r && r.length
                          ? H({
                              data: r,
                              width: n,
                              x: i,
                              travellerWidth: o,
                              startIndex: c,
                              endIndex: u,
                            })
                          : { scale: null, scaleValues: null },
                      );
                    if (
                      e.scale &&
                      (n !== e.prevWidth ||
                        i !== e.prevX ||
                        o !== e.prevTravellerWidth)
                    ) {
                      e.scale.range([i, i + n - o]);
                      var s = e.scale.domain().map(function (t) {
                        return e.scale(t);
                      });
                      return {
                        prevData: r,
                        prevTravellerWidth: o,
                        prevUpdateId: a,
                        prevX: i,
                        prevWidth: n,
                        startX: e.scale(t.startIndex),
                        endX: e.scale(t.endIndex),
                        scaleValues: s,
                      };
                    }
                    return null;
                  },
                },
                {
                  key: "getIndexInRange",
                  value: function (t, e) {
                    for (var r = t.length, n = 0, i = r - 1; i - n > 1; ) {
                      var o = Math.floor((n + i) / 2);
                      t[o] > e ? (i = o) : (n = o);
                    }
                    return e >= t[i] ? i : n;
                  },
                },
              ]),
              e && U(o.prototype, e),
              r && U(o, r),
              Object.defineProperty(o, "prototype", { writable: !1 }),
              o
            );
          })(n.PureComponent);
        W(K, "displayName", "Brush"),
          W(K, "defaultProps", {
            height: 40,
            travellerWidth: 5,
            gap: 1,
            fill: "#fff",
            stroke: "#666",
            padding: { top: 1, right: 1, bottom: 1, left: 1 },
            leaveTimeOut: 1e3,
            alwaysShowText: !1,
          });
        var G = r(50839),
          J = r(40703),
          Y = r(79669),
          Z = function (t, e) {
            var r = t.alwaysShow,
              n = t.ifOverflow;
            return r && (n = "extendDomain"), n === e;
          },
          Q = r(88225),
          tt = r(13493);
        function te() {
          return (te = Object.assign
            ? Object.assign.bind()
            : function (t) {
                for (var e = 1; e < arguments.length; e++) {
                  var r = arguments[e];
                  for (var n in r)
                    Object.prototype.hasOwnProperty.call(r, n) && (t[n] = r[n]);
                }
                return t;
              }).apply(this, arguments);
        }
        function tr(t) {
          return (tr =
            "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
              ? function (t) {
                  return typeof t;
                }
              : function (t) {
                  return t &&
                    "function" == typeof Symbol &&
                    t.constructor === Symbol &&
                    t !== Symbol.prototype
                    ? "symbol"
                    : typeof t;
                })(t);
        }
        function tn(t, e) {
          var r = Object.keys(t);
          if (Object.getOwnPropertySymbols) {
            var n = Object.getOwnPropertySymbols(t);
            e &&
              (n = n.filter(function (e) {
                return Object.getOwnPropertyDescriptor(t, e).enumerable;
              })),
              r.push.apply(r, n);
          }
          return r;
        }
        function ti(t) {
          for (var e = 1; e < arguments.length; e++) {
            var r = null != arguments[e] ? arguments[e] : {};
            e % 2
              ? tn(Object(r), !0).forEach(function (e) {
                  tu(t, e, r[e]);
                })
              : Object.getOwnPropertyDescriptors
                ? Object.defineProperties(
                    t,
                    Object.getOwnPropertyDescriptors(r),
                  )
                : tn(Object(r)).forEach(function (e) {
                    Object.defineProperty(
                      t,
                      e,
                      Object.getOwnPropertyDescriptor(r, e),
                    );
                  });
          }
          return t;
        }
        function to() {
          try {
            var t = !Boolean.prototype.valueOf.call(
              Reflect.construct(Boolean, [], function () {}),
            );
          } catch (t) {}
          return (to = function () {
            return !!t;
          })();
        }
        function ta(t) {
          return (ta = Object.setPrototypeOf
            ? Object.getPrototypeOf.bind()
            : function (t) {
                return t.__proto__ || Object.getPrototypeOf(t);
              })(t);
        }
        function tc(t, e) {
          return (tc = Object.setPrototypeOf
            ? Object.setPrototypeOf.bind()
            : function (t, e) {
                return (t.__proto__ = e), t;
              })(t, e);
        }
        function tu(t, e, r) {
          return (
            (e = ts(e)) in t
              ? Object.defineProperty(t, e, {
                  value: r,
                  enumerable: !0,
                  configurable: !0,
                  writable: !0,
                })
              : (t[e] = r),
            t
          );
        }
        function ts(t) {
          var e = (function (t, e) {
            if ("object" != tr(t) || !t) return t;
            var r = t[Symbol.toPrimitive];
            if (void 0 !== r) {
              var n = r.call(t, e || "default");
              if ("object" != tr(n)) return n;
              throw TypeError("@@toPrimitive must return a primitive value.");
            }
            return ("string" === e ? String : Number)(t);
          })(t, "string");
          return "symbol" == tr(e) ? e : e + "";
        }
        var tl = function (t) {
            var e = t.x,
              r = t.y,
              n = t.xAxis,
              i = t.yAxis,
              o = (0, Q.P2)({ x: n.scale, y: i.scale }),
              a = o.apply({ x: e, y: r }, { bandAware: !0 });
            return Z(t, "discard") && !o.isInRange(a) ? null : a;
          },
          tf = (function (t) {
            var e;
            function r() {
              var t, e;
              if (!(this instanceof r))
                throw TypeError("Cannot call a class as a function");
              return (
                (t = r),
                (e = arguments),
                (t = ta(t)),
                (function (t, e) {
                  if (e && ("object" === tr(e) || "function" == typeof e))
                    return e;
                  if (void 0 !== e)
                    throw TypeError(
                      "Derived constructors may only return object or undefined",
                    );
                  var r = t;
                  if (void 0 === r)
                    throw ReferenceError(
                      "this hasn't been initialised - super() hasn't been called",
                    );
                  return r;
                })(
                  this,
                  to()
                    ? Reflect.construct(t, e || [], ta(this).constructor)
                    : t.apply(this, e),
                )
              );
            }
            if ("function" != typeof t && null !== t)
              throw TypeError(
                "Super expression must either be null or a function",
              );
            return (
              (r.prototype = Object.create(t && t.prototype, {
                constructor: { value: r, writable: !0, configurable: !0 },
              })),
              Object.defineProperty(r, "prototype", { writable: !1 }),
              t && tc(r, t),
              (e = [
                {
                  key: "render",
                  value: function () {
                    var t = this.props,
                      e = t.x,
                      n = t.y,
                      o = t.r,
                      a = t.alwaysShow,
                      c = t.clipPathId,
                      u = (0, _.vh)(e),
                      s = (0, _.vh)(n);
                    if (
                      ((0, tt.R)(
                        void 0 === a,
                        'The alwaysShow prop is deprecated. Please use ifOverflow="extendDomain" instead.',
                      ),
                      !u || !s)
                    )
                      return null;
                    var l = tl(this.props);
                    if (!l) return null;
                    var f = l.x,
                      p = l.y,
                      h = this.props,
                      d = h.shape,
                      y = h.className,
                      v = ti(
                        ti(
                          {
                            clipPath: Z(this.props, "hidden")
                              ? "url(#".concat(c, ")")
                              : void 0,
                          },
                          (0, A.J9)(this.props, !0),
                        ),
                        {},
                        { cx: f, cy: p },
                      );
                    return i().createElement(
                      x.W,
                      { className: (0, m.A)("recharts-reference-dot", y) },
                      r.renderDot(d, v),
                      Y.J.renderCallByParent(this.props, {
                        x: f - o,
                        y: p - o,
                        width: 2 * o,
                        height: 2 * o,
                      }),
                    );
                  },
                },
              ]),
              (function (t, e) {
                for (var r = 0; r < e.length; r++) {
                  var n = e[r];
                  (n.enumerable = n.enumerable || !1),
                    (n.configurable = !0),
                    "value" in n && (n.writable = !0),
                    Object.defineProperty(t, ts(n.key), n);
                }
              })(r.prototype, e),
              Object.defineProperty(r, "prototype", { writable: !1 }),
              r
            );
          })(i().Component);
        tu(tf, "displayName", "ReferenceDot"),
          tu(tf, "defaultProps", {
            isFront: !1,
            ifOverflow: "discard",
            xAxisId: 0,
            yAxisId: 0,
            r: 10,
            fill: "#fff",
            stroke: "#ccc",
            fillOpacity: 1,
            strokeWidth: 1,
          }),
          tu(tf, "renderDot", function (t, e) {
            var r;
            return i().isValidElement(t)
              ? i().cloneElement(t, e)
              : u()(t)
                ? t(e)
                : i().createElement(
                    j.c,
                    te({}, e, {
                      cx: e.cx,
                      cy: e.cy,
                      className: "recharts-reference-dot-dot",
                    }),
                  );
          });
        var tp = r(59684),
          th = r.n(tp),
          td = r(9403);
        function ty(t) {
          return (ty =
            "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
              ? function (t) {
                  return typeof t;
                }
              : function (t) {
                  return t &&
                    "function" == typeof Symbol &&
                    t.constructor === Symbol &&
                    t !== Symbol.prototype
                    ? "symbol"
                    : typeof t;
                })(t);
        }
        function tv() {
          try {
            var t = !Boolean.prototype.valueOf.call(
              Reflect.construct(Boolean, [], function () {}),
            );
          } catch (t) {}
          return (tv = function () {
            return !!t;
          })();
        }
        function tm(t) {
          return (tm = Object.setPrototypeOf
            ? Object.getPrototypeOf.bind()
            : function (t) {
                return t.__proto__ || Object.getPrototypeOf(t);
              })(t);
        }
        function tb(t, e) {
          return (tb = Object.setPrototypeOf
            ? Object.setPrototypeOf.bind()
            : function (t, e) {
                return (t.__proto__ = e), t;
              })(t, e);
        }
        function tg(t, e) {
          var r = Object.keys(t);
          if (Object.getOwnPropertySymbols) {
            var n = Object.getOwnPropertySymbols(t);
            e &&
              (n = n.filter(function (e) {
                return Object.getOwnPropertyDescriptor(t, e).enumerable;
              })),
              r.push.apply(r, n);
          }
          return r;
        }
        function tx(t) {
          for (var e = 1; e < arguments.length; e++) {
            var r = null != arguments[e] ? arguments[e] : {};
            e % 2
              ? tg(Object(r), !0).forEach(function (e) {
                  tw(t, e, r[e]);
                })
              : Object.getOwnPropertyDescriptors
                ? Object.defineProperties(
                    t,
                    Object.getOwnPropertyDescriptors(r),
                  )
                : tg(Object(r)).forEach(function (e) {
                    Object.defineProperty(
                      t,
                      e,
                      Object.getOwnPropertyDescriptor(r, e),
                    );
                  });
          }
          return t;
        }
        function tw(t, e, r) {
          return (
            (e = tO(e)) in t
              ? Object.defineProperty(t, e, {
                  value: r,
                  enumerable: !0,
                  configurable: !0,
                  writable: !0,
                })
              : (t[e] = r),
            t
          );
        }
        function tO(t) {
          var e = (function (t, e) {
            if ("object" != ty(t) || !t) return t;
            var r = t[Symbol.toPrimitive];
            if (void 0 !== r) {
              var n = r.call(t, e || "default");
              if ("object" != ty(n)) return n;
              throw TypeError("@@toPrimitive must return a primitive value.");
            }
            return ("string" === e ? String : Number)(t);
          })(t, "string");
          return "symbol" == ty(e) ? e : e + "";
        }
        function tj(t, e) {
          (null == e || e > t.length) && (e = t.length);
          for (var r = 0, n = Array(e); r < e; r++) n[r] = t[r];
          return n;
        }
        function tS() {
          return (tS = Object.assign
            ? Object.assign.bind()
            : function (t) {
                for (var e = 1; e < arguments.length; e++) {
                  var r = arguments[e];
                  for (var n in r)
                    Object.prototype.hasOwnProperty.call(r, n) && (t[n] = r[n]);
                }
                return t;
              }).apply(this, arguments);
        }
        var tA = function (t, e) {
            var r;
            return i().isValidElement(t)
              ? i().cloneElement(t, e)
              : u()(t)
                ? t(e)
                : i().createElement(
                    "line",
                    tS({}, e, { className: "recharts-reference-line-line" }),
                  );
          },
          tP = function (t, e, r, n, i, o, a, c, u) {
            var s = i.x,
              l = i.y,
              f = i.width,
              p = i.height;
            if (r) {
              var h = u.y,
                d = t.y.apply(h, { position: o });
              if (Z(u, "discard") && !t.y.isInRange(d)) return null;
              var y = [
                { x: s + f, y: d },
                { x: s, y: d },
              ];
              return "left" === c ? y.reverse() : y;
            }
            if (e) {
              var v = u.x,
                m = t.x.apply(v, { position: o });
              if (Z(u, "discard") && !t.x.isInRange(m)) return null;
              var b = [
                { x: m, y: l + p },
                { x: m, y: l },
              ];
              return "top" === a ? b.reverse() : b;
            }
            if (n) {
              var g = u.segment.map(function (e) {
                return t.apply(e, { position: o });
              });
              return Z(u, "discard") &&
                th()(g, function (e) {
                  return !t.isInRange(e);
                })
                ? null
                : g;
            }
            return null;
          };
        function tE(t) {
          var e = t.x,
            r = t.y,
            n = t.segment,
            o = t.xAxisId,
            a = t.yAxisId,
            c = t.shape,
            u = t.className,
            s = t.alwaysShow,
            l = (0, td.Yp)(),
            f = (0, td.AF)(o),
            p = (0, td.Nk)(a),
            h = (0, td.sk)();
          if (!l || !h) return null;
          (0, tt.R)(
            void 0 === s,
            'The alwaysShow prop is deprecated. Please use ifOverflow="extendDomain" instead.',
          );
          var d = tP(
            (0, Q.P2)({ x: f.scale, y: p.scale }),
            (0, _.vh)(e),
            (0, _.vh)(r),
            n && 2 === n.length,
            h,
            t.position,
            f.orientation,
            p.orientation,
            t,
          );
          if (!d) return null;
          var y =
              (function (t) {
                if (Array.isArray(t)) return t;
              })(d) ||
              (function (t, e) {
                var r =
                  null == t
                    ? null
                    : ("undefined" != typeof Symbol && t[Symbol.iterator]) ||
                      t["@@iterator"];
                if (null != r) {
                  var n,
                    i,
                    o,
                    a,
                    c = [],
                    u = !0,
                    s = !1;
                  try {
                    (o = (r = r.call(t)).next), !1;
                    for (
                      ;
                      !(u = (n = o.call(r)).done) &&
                      (c.push(n.value), c.length !== e);
                      u = !0
                    );
                  } catch (t) {
                    (s = !0), (i = t);
                  } finally {
                    try {
                      if (
                        !u &&
                        null != r.return &&
                        ((a = r.return()), Object(a) !== a)
                      )
                        return;
                    } finally {
                      if (s) throw i;
                    }
                  }
                  return c;
                }
              })(d, 2) ||
              (function (t, e) {
                if (t) {
                  if ("string" == typeof t) return tj(t, 2);
                  var r = Object.prototype.toString.call(t).slice(8, -1);
                  if (
                    ("Object" === r &&
                      t.constructor &&
                      (r = t.constructor.name),
                    "Map" === r || "Set" === r)
                  )
                    return Array.from(t);
                  if (
                    "Arguments" === r ||
                    /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)
                  )
                    return tj(t, e);
                }
              })(d, 2) ||
              (function () {
                throw TypeError(
                  "Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.",
                );
              })(),
            v = y[0],
            b = v.x,
            g = v.y,
            w = y[1],
            O = w.x,
            j = w.y,
            S = tx(
              tx(
                { clipPath: Z(t, "hidden") ? "url(#".concat(l, ")") : void 0 },
                (0, A.J9)(t, !0),
              ),
              {},
              { x1: b, y1: g, x2: O, y2: j },
            );
          return i().createElement(
            x.W,
            { className: (0, m.A)("recharts-reference-line", u) },
            tA(c, S),
            Y.J.renderCallByParent(
              t,
              (0, Q.vh)({ x1: b, y1: g, x2: O, y2: j }),
            ),
          );
        }
        var tk = (function (t) {
          var e;
          function r() {
            var t, e;
            if (!(this instanceof r))
              throw TypeError("Cannot call a class as a function");
            return (
              (t = r),
              (e = arguments),
              (t = tm(t)),
              (function (t, e) {
                if (e && ("object" === ty(e) || "function" == typeof e))
                  return e;
                if (void 0 !== e)
                  throw TypeError(
                    "Derived constructors may only return object or undefined",
                  );
                var r = t;
                if (void 0 === r)
                  throw ReferenceError(
                    "this hasn't been initialised - super() hasn't been called",
                  );
                return r;
              })(
                this,
                tv()
                  ? Reflect.construct(t, e || [], tm(this).constructor)
                  : t.apply(this, e),
              )
            );
          }
          if ("function" != typeof t && null !== t)
            throw TypeError(
              "Super expression must either be null or a function",
            );
          return (
            (r.prototype = Object.create(t && t.prototype, {
              constructor: { value: r, writable: !0, configurable: !0 },
            })),
            Object.defineProperty(r, "prototype", { writable: !1 }),
            t && tb(r, t),
            (e = [
              {
                key: "render",
                value: function () {
                  return i().createElement(tE, this.props);
                },
              },
            ]),
            (function (t, e) {
              for (var r = 0; r < e.length; r++) {
                var n = e[r];
                (n.enumerable = n.enumerable || !1),
                  (n.configurable = !0),
                  "value" in n && (n.writable = !0),
                  Object.defineProperty(t, tO(n.key), n);
              }
            })(r.prototype, e),
            Object.defineProperty(r, "prototype", { writable: !1 }),
            r
          );
        })(i().Component);
        function t_() {
          return (t_ = Object.assign
            ? Object.assign.bind()
            : function (t) {
                for (var e = 1; e < arguments.length; e++) {
                  var r = arguments[e];
                  for (var n in r)
                    Object.prototype.hasOwnProperty.call(r, n) && (t[n] = r[n]);
                }
                return t;
              }).apply(this, arguments);
        }
        function tM(t) {
          return (tM =
            "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
              ? function (t) {
                  return typeof t;
                }
              : function (t) {
                  return t &&
                    "function" == typeof Symbol &&
                    t.constructor === Symbol &&
                    t !== Symbol.prototype
                    ? "symbol"
                    : typeof t;
                })(t);
        }
        function tT(t, e) {
          var r = Object.keys(t);
          if (Object.getOwnPropertySymbols) {
            var n = Object.getOwnPropertySymbols(t);
            e &&
              (n = n.filter(function (e) {
                return Object.getOwnPropertyDescriptor(t, e).enumerable;
              })),
              r.push.apply(r, n);
          }
          return r;
        }
        function tC(t) {
          for (var e = 1; e < arguments.length; e++) {
            var r = null != arguments[e] ? arguments[e] : {};
            e % 2
              ? tT(Object(r), !0).forEach(function (e) {
                  tB(t, e, r[e]);
                })
              : Object.getOwnPropertyDescriptors
                ? Object.defineProperties(
                    t,
                    Object.getOwnPropertyDescriptors(r),
                  )
                : tT(Object(r)).forEach(function (e) {
                    Object.defineProperty(
                      t,
                      e,
                      Object.getOwnPropertyDescriptor(r, e),
                    );
                  });
          }
          return t;
        }
        tw(tk, "displayName", "ReferenceLine"),
          tw(tk, "defaultProps", {
            isFront: !1,
            ifOverflow: "discard",
            xAxisId: 0,
            yAxisId: 0,
            fill: "none",
            stroke: "#ccc",
            fillOpacity: 1,
            strokeWidth: 1,
            position: "middle",
          });
        function tN() {
          try {
            var t = !Boolean.prototype.valueOf.call(
              Reflect.construct(Boolean, [], function () {}),
            );
          } catch (t) {}
          return (tN = function () {
            return !!t;
          })();
        }
        function tI(t) {
          return (tI = Object.setPrototypeOf
            ? Object.getPrototypeOf.bind()
            : function (t) {
                return t.__proto__ || Object.getPrototypeOf(t);
              })(t);
        }
        function tD(t, e) {
          return (tD = Object.setPrototypeOf
            ? Object.setPrototypeOf.bind()
            : function (t, e) {
                return (t.__proto__ = e), t;
              })(t, e);
        }
        function tB(t, e, r) {
          return (
            (e = tR(e)) in t
              ? Object.defineProperty(t, e, {
                  value: r,
                  enumerable: !0,
                  configurable: !0,
                  writable: !0,
                })
              : (t[e] = r),
            t
          );
        }
        function tR(t) {
          var e = (function (t, e) {
            if ("object" != tM(t) || !t) return t;
            var r = t[Symbol.toPrimitive];
            if (void 0 !== r) {
              var n = r.call(t, e || "default");
              if ("object" != tM(n)) return n;
              throw TypeError("@@toPrimitive must return a primitive value.");
            }
            return ("string" === e ? String : Number)(t);
          })(t, "string");
          return "symbol" == tM(e) ? e : e + "";
        }
        var tL = function (t, e, r, n, i) {
            var o = i.x1,
              a = i.x2,
              c = i.y1,
              u = i.y2,
              s = i.xAxis,
              l = i.yAxis;
            if (!s || !l) return null;
            var f = (0, Q.P2)({ x: s.scale, y: l.scale }),
              p = {
                x: t ? f.x.apply(o, { position: "start" }) : f.x.rangeMin,
                y: r ? f.y.apply(c, { position: "start" }) : f.y.rangeMin,
              },
              h = {
                x: e ? f.x.apply(a, { position: "end" }) : f.x.rangeMax,
                y: n ? f.y.apply(u, { position: "end" }) : f.y.rangeMax,
              };
            return !Z(i, "discard") || (f.isInRange(p) && f.isInRange(h))
              ? (0, Q.sl)(p, h)
              : null;
          },
          tz = (function (t) {
            var e;
            function r() {
              var t, e;
              if (!(this instanceof r))
                throw TypeError("Cannot call a class as a function");
              return (
                (t = r),
                (e = arguments),
                (t = tI(t)),
                (function (t, e) {
                  if (e && ("object" === tM(e) || "function" == typeof e))
                    return e;
                  if (void 0 !== e)
                    throw TypeError(
                      "Derived constructors may only return object or undefined",
                    );
                  var r = t;
                  if (void 0 === r)
                    throw ReferenceError(
                      "this hasn't been initialised - super() hasn't been called",
                    );
                  return r;
                })(
                  this,
                  tN()
                    ? Reflect.construct(t, e || [], tI(this).constructor)
                    : t.apply(this, e),
                )
              );
            }
            if ("function" != typeof t && null !== t)
              throw TypeError(
                "Super expression must either be null or a function",
              );
            return (
              (r.prototype = Object.create(t && t.prototype, {
                constructor: { value: r, writable: !0, configurable: !0 },
              })),
              Object.defineProperty(r, "prototype", { writable: !1 }),
              t && tD(r, t),
              (e = [
                {
                  key: "render",
                  value: function () {
                    var t = this.props,
                      e = t.x1,
                      n = t.x2,
                      o = t.y1,
                      a = t.y2,
                      c = t.className,
                      u = t.alwaysShow,
                      s = t.clipPathId;
                    (0, tt.R)(
                      void 0 === u,
                      'The alwaysShow prop is deprecated. Please use ifOverflow="extendDomain" instead.',
                    );
                    var l = (0, _.vh)(e),
                      f = (0, _.vh)(n),
                      p = (0, _.vh)(o),
                      h = (0, _.vh)(a),
                      d = this.props.shape;
                    if (!l && !f && !p && !h && !d) return null;
                    var y = tL(l, f, p, h, this.props);
                    if (!y && !d) return null;
                    var v = Z(this.props, "hidden")
                      ? "url(#".concat(s, ")")
                      : void 0;
                    return i().createElement(
                      x.W,
                      { className: (0, m.A)("recharts-reference-area", c) },
                      r.renderRect(
                        d,
                        tC(tC({ clipPath: v }, (0, A.J9)(this.props, !0)), y),
                      ),
                      Y.J.renderCallByParent(this.props, y),
                    );
                  },
                },
              ]),
              (function (t, e) {
                for (var r = 0; r < e.length; r++) {
                  var n = e[r];
                  (n.enumerable = n.enumerable || !1),
                    (n.configurable = !0),
                    "value" in n && (n.writable = !0),
                    Object.defineProperty(t, tR(n.key), n);
                }
              })(r.prototype, e),
              Object.defineProperty(r, "prototype", { writable: !1 }),
              r
            );
          })(i().Component);
        function tU(t) {
          return (
            (function (t) {
              if (Array.isArray(t)) return tF(t);
            })(t) ||
            (function (t) {
              if (
                ("undefined" != typeof Symbol && null != t[Symbol.iterator]) ||
                null != t["@@iterator"]
              )
                return Array.from(t);
            })(t) ||
            (function (t, e) {
              if (t) {
                if ("string" == typeof t) return tF(t, void 0);
                var r = Object.prototype.toString.call(t).slice(8, -1);
                if (
                  ("Object" === r && t.constructor && (r = t.constructor.name),
                  "Map" === r || "Set" === r)
                )
                  return Array.from(t);
                if (
                  "Arguments" === r ||
                  /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)
                )
                  return tF(t, e);
              }
            })(t) ||
            (function () {
              throw TypeError(
                "Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.",
              );
            })()
          );
        }
        function tF(t, e) {
          (null == e || e > t.length) && (e = t.length);
          for (var r = 0, n = Array(e); r < e; r++) n[r] = t[r];
          return n;
        }
        tB(tz, "displayName", "ReferenceArea"),
          tB(tz, "defaultProps", {
            isFront: !1,
            ifOverflow: "discard",
            xAxisId: 0,
            yAxisId: 0,
            r: 10,
            fill: "#ccc",
            fillOpacity: 0.5,
            stroke: "none",
            strokeWidth: 1,
          }),
          tB(tz, "renderRect", function (t, e) {
            var r;
            return i().isValidElement(t)
              ? i().cloneElement(t, e)
              : u()(t)
                ? t(e)
                : i().createElement(
                    S.M,
                    t_({}, e, { className: "recharts-reference-area-rect" }),
                  );
          });
        var tq = function (t, e, r, n, i) {
            var o = (0, A.aS)(t, tk),
              a = (0, A.aS)(t, tf),
              c = [].concat(tU(o), tU(a)),
              u = (0, A.aS)(t, tz),
              s = "".concat(n, "Id"),
              l = n[0],
              f = e;
            if (
              (c.length &&
                (f = c.reduce(function (t, e) {
                  if (
                    e.props[s] === r &&
                    Z(e.props, "extendDomain") &&
                    (0, _.Et)(e.props[l])
                  ) {
                    var n = e.props[l];
                    return [Math.min(t[0], n), Math.max(t[1], n)];
                  }
                  return t;
                }, f)),
              u.length)
            ) {
              var p = "".concat(l, "1"),
                h = "".concat(l, "2");
              f = u.reduce(function (t, e) {
                if (
                  e.props[s] === r &&
                  Z(e.props, "extendDomain") &&
                  (0, _.Et)(e.props[p]) &&
                  (0, _.Et)(e.props[h])
                ) {
                  var n = e.props[p],
                    i = e.props[h];
                  return [Math.min(t[0], n, i), Math.max(t[1], n, i)];
                }
                return t;
              }, f);
            }
            return (
              i &&
                i.length &&
                (f = i.reduce(function (t, e) {
                  return (0, _.Et)(e)
                    ? [Math.min(t[0], e), Math.max(t[1], e)]
                    : t;
                }, f)),
              f
            );
          },
          t$ = r(76987),
          tW = r(60974),
          tX = r(87766),
          tH = new (r.n(tX)())(),
          tV = "recharts.syncMouseEvents",
          tK = r(10621);
        function tG(t) {
          return (tG =
            "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
              ? function (t) {
                  return typeof t;
                }
              : function (t) {
                  return t &&
                    "function" == typeof Symbol &&
                    t.constructor === Symbol &&
                    t !== Symbol.prototype
                    ? "symbol"
                    : typeof t;
                })(t);
        }
        function tJ(t, e, r) {
          return (
            (e = tY(e)) in t
              ? Object.defineProperty(t, e, {
                  value: r,
                  enumerable: !0,
                  configurable: !0,
                  writable: !0,
                })
              : (t[e] = r),
            t
          );
        }
        function tY(t) {
          var e = (function (t, e) {
            if ("object" != tG(t) || !t) return t;
            var r = t[Symbol.toPrimitive];
            if (void 0 !== r) {
              var n = r.call(t, e || "default");
              if ("object" != tG(n)) return n;
              throw TypeError("@@toPrimitive must return a primitive value.");
            }
            return ("string" === e ? String : Number)(t);
          })(t, "string");
          return "symbol" == tG(e) ? e : e + "";
        }
        var tZ = (function () {
            var t, e;
            return (
              (t = function t() {
                if (!(this instanceof t))
                  throw TypeError("Cannot call a class as a function");
                tJ(this, "activeIndex", 0),
                  tJ(this, "coordinateList", []),
                  tJ(this, "layout", "horizontal");
              }),
              (e = [
                {
                  key: "setDetails",
                  value: function (t) {
                    var e,
                      r = t.coordinateList,
                      n = void 0 === r ? null : r,
                      i = t.container,
                      o = void 0 === i ? null : i,
                      a = t.layout,
                      c = void 0 === a ? null : a,
                      u = t.offset,
                      s = void 0 === u ? null : u,
                      l = t.mouseHandlerCallback,
                      f = void 0 === l ? null : l;
                    (this.coordinateList =
                      null != (e = null != n ? n : this.coordinateList)
                        ? e
                        : []),
                      (this.container = null != o ? o : this.container),
                      (this.layout = null != c ? c : this.layout),
                      (this.offset = null != s ? s : this.offset),
                      (this.mouseHandlerCallback =
                        null != f ? f : this.mouseHandlerCallback),
                      (this.activeIndex = Math.min(
                        Math.max(this.activeIndex, 0),
                        this.coordinateList.length - 1,
                      ));
                  },
                },
                {
                  key: "focus",
                  value: function () {
                    this.spoofMouse();
                  },
                },
                {
                  key: "keyboardEvent",
                  value: function (t) {
                    if (0 !== this.coordinateList.length)
                      switch (t.key) {
                        case "ArrowRight":
                          if ("horizontal" !== this.layout) return;
                          (this.activeIndex = Math.min(
                            this.activeIndex + 1,
                            this.coordinateList.length - 1,
                          )),
                            this.spoofMouse();
                          break;
                        case "ArrowLeft":
                          if ("horizontal" !== this.layout) return;
                          (this.activeIndex = Math.max(
                            this.activeIndex - 1,
                            0,
                          )),
                            this.spoofMouse();
                      }
                  },
                },
                {
                  key: "setIndex",
                  value: function (t) {
                    this.activeIndex = t;
                  },
                },
                {
                  key: "spoofMouse",
                  value: function () {
                    if (
                      "horizontal" === this.layout &&
                      0 !== this.coordinateList.length
                    ) {
                      var t,
                        e,
                        r = this.container.getBoundingClientRect(),
                        n = r.x,
                        i = r.y,
                        o = r.height,
                        a = this.coordinateList[this.activeIndex].coordinate,
                        c = (null == (t = window) ? void 0 : t.scrollX) || 0,
                        u = (null == (e = window) ? void 0 : e.scrollY) || 0,
                        s = i + this.offset.top + o / 2 + u;
                      this.mouseHandlerCallback({ pageX: n + a + c, pageY: s });
                    }
                  },
                },
              ]),
              (function (t, e) {
                for (var r = 0; r < e.length; r++) {
                  var n = e[r];
                  (n.enumerable = n.enumerable || !1),
                    (n.configurable = !0),
                    "value" in n && (n.writable = !0),
                    Object.defineProperty(t, tY(n.key), n);
                }
              })(t.prototype, e),
              Object.defineProperty(t, "prototype", { writable: !1 }),
              t
            );
          })(),
          tQ = r(54569),
          t0 = r(21958);
        function t1(t) {
          return (t1 =
            "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
              ? function (t) {
                  return typeof t;
                }
              : function (t) {
                  return t &&
                    "function" == typeof Symbol &&
                    t.constructor === Symbol &&
                    t !== Symbol.prototype
                    ? "symbol"
                    : typeof t;
                })(t);
        }
        var t2 = ["x", "y", "top", "left", "width", "height", "className"];
        function t8() {
          return (t8 = Object.assign
            ? Object.assign.bind()
            : function (t) {
                for (var e = 1; e < arguments.length; e++) {
                  var r = arguments[e];
                  for (var n in r)
                    Object.prototype.hasOwnProperty.call(r, n) && (t[n] = r[n]);
                }
                return t;
              }).apply(this, arguments);
        }
        function t5(t, e) {
          var r = Object.keys(t);
          if (Object.getOwnPropertySymbols) {
            var n = Object.getOwnPropertySymbols(t);
            e &&
              (n = n.filter(function (e) {
                return Object.getOwnPropertyDescriptor(t, e).enumerable;
              })),
              r.push.apply(r, n);
          }
          return r;
        }
        var t3 = function (t) {
          var e = t.x,
            r = void 0 === e ? 0 : e,
            n = t.y,
            o = void 0 === n ? 0 : n,
            a = t.top,
            c = void 0 === a ? 0 : a,
            u = t.left,
            s = void 0 === u ? 0 : u,
            l = t.width,
            f = void 0 === l ? 0 : l,
            p = t.height,
            h = void 0 === p ? 0 : p,
            d = t.className,
            y = (function (t) {
              for (var e = 1; e < arguments.length; e++) {
                var r = null != arguments[e] ? arguments[e] : {};
                e % 2
                  ? t5(Object(r), !0).forEach(function (e) {
                      var n, i, o;
                      (n = t),
                        (i = e),
                        (o = r[e]),
                        (i = (function (t) {
                          var e = (function (t, e) {
                            if ("object" != t1(t) || !t) return t;
                            var r = t[Symbol.toPrimitive];
                            if (void 0 !== r) {
                              var n = r.call(t, e || "default");
                              if ("object" != t1(n)) return n;
                              throw TypeError(
                                "@@toPrimitive must return a primitive value.",
                              );
                            }
                            return ("string" === e ? String : Number)(t);
                          })(t, "string");
                          return "symbol" == t1(e) ? e : e + "";
                        })(i)) in n
                          ? Object.defineProperty(n, i, {
                              value: o,
                              enumerable: !0,
                              configurable: !0,
                              writable: !0,
                            })
                          : (n[i] = o);
                    })
                  : Object.getOwnPropertyDescriptors
                    ? Object.defineProperties(
                        t,
                        Object.getOwnPropertyDescriptors(r),
                      )
                    : t5(Object(r)).forEach(function (e) {
                        Object.defineProperty(
                          t,
                          e,
                          Object.getOwnPropertyDescriptor(r, e),
                        );
                      });
              }
              return t;
            })(
              { x: r, y: o, top: c, left: s, width: f, height: h },
              (function (t, e) {
                if (null == t) return {};
                var r,
                  n,
                  i = (function (t, e) {
                    if (null == t) return {};
                    var r = {};
                    for (var n in t)
                      if (Object.prototype.hasOwnProperty.call(t, n)) {
                        if (e.indexOf(n) >= 0) continue;
                        r[n] = t[n];
                      }
                    return r;
                  })(t, e);
                if (Object.getOwnPropertySymbols) {
                  var o = Object.getOwnPropertySymbols(t);
                  for (n = 0; n < o.length; n++)
                    (r = o[n]),
                      !(e.indexOf(r) >= 0) &&
                        Object.prototype.propertyIsEnumerable.call(t, r) &&
                        (i[r] = t[r]);
                }
                return i;
              })(t, t2),
            );
          return (0, _.Et)(r) &&
            (0, _.Et)(o) &&
            (0, _.Et)(f) &&
            (0, _.Et)(h) &&
            (0, _.Et)(c) &&
            (0, _.Et)(s)
            ? i().createElement(
                "path",
                t8({}, (0, A.J9)(y, !0), {
                  className: (0, m.A)("recharts-cross", d),
                  d: "M"
                    .concat(r, ",")
                    .concat(c, "v")
                    .concat(h, "M")
                    .concat(s, ",")
                    .concat(o, "h")
                    .concat(f),
                }),
              )
            : null;
        };
        function t4(t) {
          var e = t.cx,
            r = t.cy,
            n = t.radius,
            i = t.startAngle,
            o = t.endAngle;
          return {
            points: [(0, t$.IZ)(e, r, n, i), (0, t$.IZ)(e, r, n, o)],
            cx: e,
            cy: r,
            radius: n,
            startAngle: i,
            endAngle: o,
          };
        }
        var t6 = r(42103);
        function t9(t) {
          return (t9 =
            "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
              ? function (t) {
                  return typeof t;
                }
              : function (t) {
                  return t &&
                    "function" == typeof Symbol &&
                    t.constructor === Symbol &&
                    t !== Symbol.prototype
                    ? "symbol"
                    : typeof t;
                })(t);
        }
        function t7(t, e) {
          var r = Object.keys(t);
          if (Object.getOwnPropertySymbols) {
            var n = Object.getOwnPropertySymbols(t);
            e &&
              (n = n.filter(function (e) {
                return Object.getOwnPropertyDescriptor(t, e).enumerable;
              })),
              r.push.apply(r, n);
          }
          return r;
        }
        function et(t) {
          for (var e = 1; e < arguments.length; e++) {
            var r = null != arguments[e] ? arguments[e] : {};
            e % 2
              ? t7(Object(r), !0).forEach(function (e) {
                  var n, i, o;
                  (n = t),
                    (i = e),
                    (o = r[e]),
                    (i = (function (t) {
                      var e = (function (t, e) {
                        if ("object" != t9(t) || !t) return t;
                        var r = t[Symbol.toPrimitive];
                        if (void 0 !== r) {
                          var n = r.call(t, e || "default");
                          if ("object" != t9(n)) return n;
                          throw TypeError(
                            "@@toPrimitive must return a primitive value.",
                          );
                        }
                        return ("string" === e ? String : Number)(t);
                      })(t, "string");
                      return "symbol" == t9(e) ? e : e + "";
                    })(i)) in n
                      ? Object.defineProperty(n, i, {
                          value: o,
                          enumerable: !0,
                          configurable: !0,
                          writable: !0,
                        })
                      : (n[i] = o);
                })
              : Object.getOwnPropertyDescriptors
                ? Object.defineProperties(
                    t,
                    Object.getOwnPropertyDescriptors(r),
                  )
                : t7(Object(r)).forEach(function (e) {
                    Object.defineProperty(
                      t,
                      e,
                      Object.getOwnPropertyDescriptor(r, e),
                    );
                  });
          }
          return t;
        }
        function ee(t) {
          var e,
            r,
            i,
            o,
            a = t.element,
            c = t.tooltipEventType,
            u = t.isActive,
            s = t.activeCoordinate,
            l = t.activePayload,
            f = t.offset,
            p = t.activeTooltipIndex,
            h = t.tooltipAxisBandSize,
            d = t.layout,
            y = t.chartName,
            v =
              null != (r = a.props.cursor)
                ? r
                : null == (i = a.type.defaultProps)
                  ? void 0
                  : i.cursor;
          if (!a || !v || !u || !s || ("ScatterChart" !== y && "axis" !== c))
            return null;
          var b = t0.I;
          if ("ScatterChart" === y) (o = s), (b = t3);
          else if ("BarChart" === y)
            (e = h / 2),
              (o = {
                stroke: "none",
                fill: "#ccc",
                x: "horizontal" === d ? s.x - e : f.left + 0.5,
                y: "horizontal" === d ? f.top + 0.5 : s.y - e,
                width: "horizontal" === d ? h : f.width - 1,
                height: "horizontal" === d ? f.height - 1 : h,
              }),
              (b = S.M);
          else if ("radial" === d) {
            var g = t4(s),
              x = g.cx,
              w = g.cy,
              O = g.radius;
            (o = {
              cx: x,
              cy: w,
              startAngle: g.startAngle,
              endAngle: g.endAngle,
              innerRadius: O,
              outerRadius: O,
            }),
              (b = t6.h);
          } else
            (o = {
              points: (function (t, e, r) {
                var n, i, o, a;
                if ("horizontal" === t)
                  (o = n = e.x), (i = r.top), (a = r.top + r.height);
                else if ("vertical" === t)
                  (a = i = e.y), (n = r.left), (o = r.left + r.width);
                else if (null != e.cx && null != e.cy)
                  if ("centric" !== t) return t4(e);
                  else {
                    var c = e.cx,
                      u = e.cy,
                      s = e.innerRadius,
                      l = e.outerRadius,
                      f = e.angle,
                      p = (0, t$.IZ)(c, u, s, f),
                      h = (0, t$.IZ)(c, u, l, f);
                    (n = p.x), (i = p.y), (o = h.x), (a = h.y);
                  }
                return [
                  { x: n, y: i },
                  { x: o, y: a },
                ];
              })(d, s, f),
            }),
              (b = t0.I);
          var j = et(
            et(
              et(et({ stroke: "#ccc", pointerEvents: "none" }, f), o),
              (0, A.J9)(v, !1),
            ),
            {},
            {
              payload: l,
              payloadIndex: p,
              className: (0, m.A)("recharts-tooltip-cursor", v.className),
            },
          );
          return (0, n.isValidElement)(v)
            ? (0, n.cloneElement)(v, j)
            : (0, n.createElement)(b, j);
        }
        var er = ["item"],
          en = [
            "children",
            "className",
            "width",
            "height",
            "style",
            "compact",
            "title",
            "desc",
          ];
        function ei(t) {
          return (ei =
            "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
              ? function (t) {
                  return typeof t;
                }
              : function (t) {
                  return t &&
                    "function" == typeof Symbol &&
                    t.constructor === Symbol &&
                    t !== Symbol.prototype
                    ? "symbol"
                    : typeof t;
                })(t);
        }
        function eo() {
          return (eo = Object.assign
            ? Object.assign.bind()
            : function (t) {
                for (var e = 1; e < arguments.length; e++) {
                  var r = arguments[e];
                  for (var n in r)
                    Object.prototype.hasOwnProperty.call(r, n) && (t[n] = r[n]);
                }
                return t;
              }).apply(this, arguments);
        }
        function ea(t, e) {
          return (
            (function (t) {
              if (Array.isArray(t)) return t;
            })(t) ||
            (function (t, e) {
              var r =
                null == t
                  ? null
                  : ("undefined" != typeof Symbol && t[Symbol.iterator]) ||
                    t["@@iterator"];
              if (null != r) {
                var n,
                  i,
                  o,
                  a,
                  c = [],
                  u = !0,
                  s = !1;
                try {
                  if (((o = (r = r.call(t)).next), 0 === e)) {
                    if (Object(r) !== r) return;
                    u = !1;
                  } else
                    for (
                      ;
                      !(u = (n = o.call(r)).done) &&
                      (c.push(n.value), c.length !== e);
                      u = !0
                    );
                } catch (t) {
                  (s = !0), (i = t);
                } finally {
                  try {
                    if (
                      !u &&
                      null != r.return &&
                      ((a = r.return()), Object(a) !== a)
                    )
                      return;
                  } finally {
                    if (s) throw i;
                  }
                }
                return c;
              }
            })(t, e) ||
            ep(t, e) ||
            (function () {
              throw TypeError(
                "Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.",
              );
            })()
          );
        }
        function ec(t, e) {
          if (null == t) return {};
          var r,
            n,
            i = (function (t, e) {
              if (null == t) return {};
              var r = {};
              for (var n in t)
                if (Object.prototype.hasOwnProperty.call(t, n)) {
                  if (e.indexOf(n) >= 0) continue;
                  r[n] = t[n];
                }
              return r;
            })(t, e);
          if (Object.getOwnPropertySymbols) {
            var o = Object.getOwnPropertySymbols(t);
            for (n = 0; n < o.length; n++)
              (r = o[n]),
                !(e.indexOf(r) >= 0) &&
                  Object.prototype.propertyIsEnumerable.call(t, r) &&
                  (i[r] = t[r]);
          }
          return i;
        }
        function eu() {
          try {
            var t = !Boolean.prototype.valueOf.call(
              Reflect.construct(Boolean, [], function () {}),
            );
          } catch (t) {}
          return (eu = function () {
            return !!t;
          })();
        }
        function es(t) {
          return (es = Object.setPrototypeOf
            ? Object.getPrototypeOf.bind()
            : function (t) {
                return t.__proto__ || Object.getPrototypeOf(t);
              })(t);
        }
        function el(t, e) {
          return (el = Object.setPrototypeOf
            ? Object.setPrototypeOf.bind()
            : function (t, e) {
                return (t.__proto__ = e), t;
              })(t, e);
        }
        function ef(t) {
          return (
            (function (t) {
              if (Array.isArray(t)) return eh(t);
            })(t) ||
            (function (t) {
              if (
                ("undefined" != typeof Symbol && null != t[Symbol.iterator]) ||
                null != t["@@iterator"]
              )
                return Array.from(t);
            })(t) ||
            ep(t) ||
            (function () {
              throw TypeError(
                "Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.",
              );
            })()
          );
        }
        function ep(t, e) {
          if (t) {
            if ("string" == typeof t) return eh(t, e);
            var r = Object.prototype.toString.call(t).slice(8, -1);
            if (
              ("Object" === r && t.constructor && (r = t.constructor.name),
              "Map" === r || "Set" === r)
            )
              return Array.from(t);
            if (
              "Arguments" === r ||
              /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)
            )
              return eh(t, e);
          }
        }
        function eh(t, e) {
          (null == e || e > t.length) && (e = t.length);
          for (var r = 0, n = Array(e); r < e; r++) n[r] = t[r];
          return n;
        }
        function ed(t, e) {
          var r = Object.keys(t);
          if (Object.getOwnPropertySymbols) {
            var n = Object.getOwnPropertySymbols(t);
            e &&
              (n = n.filter(function (e) {
                return Object.getOwnPropertyDescriptor(t, e).enumerable;
              })),
              r.push.apply(r, n);
          }
          return r;
        }
        function ey(t) {
          for (var e = 1; e < arguments.length; e++) {
            var r = null != arguments[e] ? arguments[e] : {};
            e % 2
              ? ed(Object(r), !0).forEach(function (e) {
                  ev(t, e, r[e]);
                })
              : Object.getOwnPropertyDescriptors
                ? Object.defineProperties(
                    t,
                    Object.getOwnPropertyDescriptors(r),
                  )
                : ed(Object(r)).forEach(function (e) {
                    Object.defineProperty(
                      t,
                      e,
                      Object.getOwnPropertyDescriptor(r, e),
                    );
                  });
          }
          return t;
        }
        function ev(t, e, r) {
          return (
            (e = em(e)) in t
              ? Object.defineProperty(t, e, {
                  value: r,
                  enumerable: !0,
                  configurable: !0,
                  writable: !0,
                })
              : (t[e] = r),
            t
          );
        }
        function em(t) {
          var e = (function (t, e) {
            if ("object" != ei(t) || !t) return t;
            var r = t[Symbol.toPrimitive];
            if (void 0 !== r) {
              var n = r.call(t, e || "default");
              if ("object" != ei(n)) return n;
              throw TypeError("@@toPrimitive must return a primitive value.");
            }
            return ("string" === e ? String : Number)(t);
          })(t, "string");
          return "symbol" == ei(e) ? e : e + "";
        }
        var eb = { xAxis: ["bottom", "top"], yAxis: ["left", "right"] },
          eg = { width: "100%", height: "100%" },
          ex = { x: 0, y: 0 };
        function ew(t) {
          return t;
        }
        var eO = function (t, e, r, n) {
            var i = e.find(function (t) {
              return t && t.index === r;
            });
            if (i) {
              if ("horizontal" === t) return { x: i.coordinate, y: n.y };
              if ("vertical" === t) return { x: n.x, y: i.coordinate };
              if ("centric" === t) {
                var o = i.coordinate,
                  a = n.radius;
                return ey(
                  ey(ey({}, n), (0, t$.IZ)(n.cx, n.cy, a, o)),
                  {},
                  { angle: o, radius: a },
                );
              }
              var c = i.coordinate,
                u = n.angle;
              return ey(
                ey(ey({}, n), (0, t$.IZ)(n.cx, n.cy, c, u)),
                {},
                { angle: u, radius: c },
              );
            }
            return ex;
          },
          ej = function (t, e) {
            var r = e.graphicalItems,
              n = e.dataStartIndex,
              i = e.dataEndIndex,
              o = (null != r ? r : []).reduce(function (t, e) {
                var r = e.props.data;
                return r && r.length ? [].concat(ef(t), ef(r)) : t;
              }, []);
            return o.length > 0
              ? o
              : t && t.length && (0, _.Et)(n) && (0, _.Et)(i)
                ? t.slice(n, i + 1)
                : [];
          };
        function eS(t) {
          return "number" === t ? [0, "auto"] : void 0;
        }
        var eA = function (t, e, r, n) {
            var i = t.graphicalItems,
              o = t.tooltipAxis,
              a = ej(e, t);
            return r < 0 || !i || !i.length || r >= a.length
              ? null
              : i.reduce(function (i, c) {
                  var u,
                    s,
                    l = null != (u = c.props.data) ? u : e;
                  if (
                    (l &&
                      t.dataStartIndex + t.dataEndIndex !== 0 &&
                      t.dataEndIndex - t.dataStartIndex >= r &&
                      (l = l.slice(t.dataStartIndex, t.dataEndIndex + 1)),
                    o.dataKey && !o.allowDuplicatedCategory)
                  ) {
                    var f = void 0 === l ? a : l;
                    s = (0, _.eP)(f, o.dataKey, n);
                  } else s = (l && l[r]) || a[r];
                  return s ? [].concat(ef(i), [(0, k.zb)(c, s)]) : i;
                }, []);
          },
          eP = function (t, e, r, n) {
            var i = n || { x: t.chartX, y: t.chartY },
              o =
                "horizontal" === r
                  ? i.x
                  : "vertical" === r
                    ? i.y
                    : "centric" === r
                      ? i.angle
                      : i.radius,
              a = t.orderedTooltipTicks,
              c = t.tooltipAxis,
              u = t.tooltipTicks,
              s = (0, k.gH)(o, a, u, c);
            if (s >= 0 && u) {
              var l = u[s] && u[s].value,
                f = eA(t, e, s, l),
                p = eO(r, a, s, i);
              return {
                activeTooltipIndex: s,
                activeLabel: l,
                activePayload: f,
                activeCoordinate: p,
              };
            }
            return null;
          },
          eE = function (t, e) {
            var r = e.axes,
              n = e.graphicalItems,
              i = e.axisType,
              o = e.axisIdKey,
              c = e.stackGroups,
              u = e.dataStartIndex,
              s = e.dataEndIndex,
              f = t.layout,
              p = t.children,
              h = t.stackOffset,
              d = (0, k._L)(f, i);
            return r.reduce(function (e, r) {
              var y =
                  void 0 !== r.type.defaultProps
                    ? ey(ey({}, r.type.defaultProps), r.props)
                    : r.props,
                v = y.type,
                m = y.dataKey,
                b = y.allowDataOverflow,
                g = y.allowDuplicatedCategory,
                x = y.scale,
                w = y.ticks,
                O = y.includeHidden,
                j = y[o];
              if (e[j]) return e;
              var S = ej(t.data, {
                  graphicalItems: n.filter(function (t) {
                    var e;
                    return (
                      (o in t.props
                        ? t.props[o]
                        : null == (e = t.type.defaultProps)
                          ? void 0
                          : e[o]) === j
                    );
                  }),
                  dataStartIndex: u,
                  dataEndIndex: s,
                }),
                A = S.length;
              (function (t, e, r) {
                if ("number" === r && !0 === e && Array.isArray(t)) {
                  var n = null == t ? void 0 : t[0],
                    i = null == t ? void 0 : t[1];
                  if (n && i && (0, _.Et)(n) && (0, _.Et)(i)) return !0;
                }
                return !1;
              })(y.domain, b, v) &&
                ((M = (0, k.AQ)(y.domain, null, b)),
                d &&
                  ("number" === v || "auto" !== x) &&
                  (C = (0, k.Ay)(S, m, "category")));
              var P = eS(v);
              if (!M || 0 === M.length) {
                var E,
                  M,
                  T,
                  C,
                  N,
                  I = null != (N = y.domain) ? N : P;
                if (m) {
                  if (((M = (0, k.Ay)(S, m, v)), "category" === v && d)) {
                    var D = (0, _.CG)(M);
                    g && D
                      ? ((T = M), (M = l()(0, A)))
                      : g ||
                        (M = (0, k.KC)(I, M, r).reduce(function (t, e) {
                          return t.indexOf(e) >= 0 ? t : [].concat(ef(t), [e]);
                        }, []));
                  } else if ("category" === v)
                    M = g
                      ? M.filter(function (t) {
                          return "" !== t && !a()(t);
                        })
                      : (0, k.KC)(I, M, r).reduce(function (t, e) {
                          return t.indexOf(e) >= 0 || "" === e || a()(e)
                            ? t
                            : [].concat(ef(t), [e]);
                        }, []);
                  else if ("number" === v) {
                    var B = (0, k.A1)(
                      S,
                      n.filter(function (t) {
                        var e,
                          r,
                          n =
                            o in t.props
                              ? t.props[o]
                              : null == (e = t.type.defaultProps)
                                ? void 0
                                : e[o],
                          i =
                            "hide" in t.props
                              ? t.props.hide
                              : null == (r = t.type.defaultProps)
                                ? void 0
                                : r.hide;
                        return n === j && (O || !i);
                      }),
                      m,
                      i,
                      f,
                    );
                    B && (M = B);
                  }
                  d &&
                    ("number" === v || "auto" !== x) &&
                    (C = (0, k.Ay)(S, m, "category"));
                } else
                  M = d
                    ? l()(0, A)
                    : c && c[j] && c[j].hasStack && "number" === v
                      ? "expand" === h
                        ? [0, 1]
                        : (0, k.Mk)(c[j].stackGroups, u, s)
                      : (0, k.vf)(
                          S,
                          n.filter(function (t) {
                            var e =
                                o in t.props
                                  ? t.props[o]
                                  : t.type.defaultProps[o],
                              r =
                                "hide" in t.props
                                  ? t.props.hide
                                  : t.type.defaultProps.hide;
                            return e === j && (O || !r);
                          }),
                          v,
                          f,
                          !0,
                        );
                "number" === v
                  ? ((M = tq(p, M, j, i, w)), I && (M = (0, k.AQ)(I, M, b)))
                  : "category" === v &&
                    I &&
                    M.every(function (t) {
                      return I.indexOf(t) >= 0;
                    }) &&
                    (M = I);
              }
              return ey(
                ey({}, e),
                {},
                ev(
                  {},
                  j,
                  ey(
                    ey({}, y),
                    {},
                    {
                      axisType: i,
                      domain: M,
                      categoricalDomain: C,
                      duplicateDomain: T,
                      originalDomain: null != (E = y.domain) ? E : P,
                      isCategorical: d,
                      layout: f,
                    },
                  ),
                ),
              );
            }, {});
          },
          ek = function (t, e) {
            var r = e.graphicalItems,
              n = e.Axis,
              i = e.axisType,
              o = e.axisIdKey,
              a = e.stackGroups,
              c = e.dataStartIndex,
              u = e.dataEndIndex,
              s = t.layout,
              f = t.children,
              h = ej(t.data, {
                graphicalItems: r,
                dataStartIndex: c,
                dataEndIndex: u,
              }),
              d = h.length,
              y = (0, k._L)(s, i),
              v = -1;
            return r.reduce(function (t, e) {
              var m,
                b = (
                  void 0 !== e.type.defaultProps
                    ? ey(ey({}, e.type.defaultProps), e.props)
                    : e.props
                )[o],
                g = eS("number");
              return t[b]
                ? t
                : (v++,
                  (m = y
                    ? l()(0, d)
                    : a && a[b] && a[b].hasStack
                      ? tq(f, (m = (0, k.Mk)(a[b].stackGroups, c, u)), b, i)
                      : tq(
                          f,
                          (m = (0, k.AQ)(
                            g,
                            (0, k.vf)(
                              h,
                              r.filter(function (t) {
                                var e,
                                  r,
                                  n =
                                    o in t.props
                                      ? t.props[o]
                                      : null == (e = t.type.defaultProps)
                                        ? void 0
                                        : e[o],
                                  i =
                                    "hide" in t.props
                                      ? t.props.hide
                                      : null == (r = t.type.defaultProps)
                                        ? void 0
                                        : r.hide;
                                return n === b && !i;
                              }),
                              "number",
                              s,
                            ),
                            n.defaultProps.allowDataOverflow,
                          )),
                          b,
                          i,
                        )),
                  ey(
                    ey({}, t),
                    {},
                    ev(
                      {},
                      b,
                      ey(
                        ey({ axisType: i }, n.defaultProps),
                        {},
                        {
                          hide: !0,
                          orientation: p()(
                            eb,
                            "".concat(i, ".").concat(v % 2),
                            null,
                          ),
                          domain: m,
                          originalDomain: g,
                          isCategorical: y,
                          layout: s,
                        },
                      ),
                    ),
                  ));
            }, {});
          },
          e_ = function (t, e) {
            var r = e.axisType,
              n = void 0 === r ? "xAxis" : r,
              i = e.AxisComp,
              o = e.graphicalItems,
              a = e.stackGroups,
              c = e.dataStartIndex,
              u = e.dataEndIndex,
              s = t.children,
              l = "".concat(n, "Id"),
              f = (0, A.aS)(s, i),
              p = {};
            return (
              f && f.length
                ? (p = eE(t, {
                    axes: f,
                    graphicalItems: o,
                    axisType: n,
                    axisIdKey: l,
                    stackGroups: a,
                    dataStartIndex: c,
                    dataEndIndex: u,
                  }))
                : o &&
                  o.length &&
                  (p = ek(t, {
                    Axis: i,
                    graphicalItems: o,
                    axisType: n,
                    axisIdKey: l,
                    stackGroups: a,
                    dataStartIndex: c,
                    dataEndIndex: u,
                  })),
              p
            );
          },
          eM = function (t) {
            var e = (0, _.lX)(t),
              r = (0, k.Rh)(e, !1, !0);
            return {
              tooltipTicks: r,
              orderedTooltipTicks: d()(r, function (t) {
                return t.coordinate;
              }),
              tooltipAxis: e,
              tooltipAxisBandSize: (0, k.Hj)(e, r),
            };
          },
          eT = function (t) {
            var e = t.children,
              r = t.defaultShowTooltip,
              n = (0, A.BU)(e, K),
              i = 0,
              o = 0;
            return (
              t.data && 0 !== t.data.length && (o = t.data.length - 1),
              n &&
                n.props &&
                (n.props.startIndex >= 0 && (i = n.props.startIndex),
                n.props.endIndex >= 0 && (o = n.props.endIndex)),
              {
                chartX: 0,
                chartY: 0,
                dataStartIndex: i,
                dataEndIndex: o,
                activeTooltipIndex: -1,
                isTooltipActive: !!r,
              }
            );
          },
          eC = function (t) {
            return "horizontal" === t
              ? { numericAxisName: "yAxis", cateAxisName: "xAxis" }
              : "vertical" === t
                ? { numericAxisName: "xAxis", cateAxisName: "yAxis" }
                : "centric" === t
                  ? { numericAxisName: "radiusAxis", cateAxisName: "angleAxis" }
                  : {
                      numericAxisName: "angleAxis",
                      cateAxisName: "radiusAxis",
                    };
          },
          eN = function (t, e) {
            var r = t.props,
              n = t.graphicalItems,
              i = t.xAxisMap,
              o = void 0 === i ? {} : i,
              a = t.yAxisMap,
              c = void 0 === a ? {} : a,
              u = r.width,
              s = r.height,
              l = r.children,
              f = r.margin || {},
              h = (0, A.BU)(l, K),
              d = (0, A.BU)(l, O.s),
              y = Object.keys(c).reduce(
                function (t, e) {
                  var r = c[e],
                    n = r.orientation;
                  return r.mirror || r.hide
                    ? t
                    : ey(ey({}, t), {}, ev({}, n, t[n] + r.width));
                },
                { left: f.left || 0, right: f.right || 0 },
              ),
              v = Object.keys(o).reduce(
                function (t, e) {
                  var r = o[e],
                    n = r.orientation;
                  return r.mirror || r.hide
                    ? t
                    : ey(
                        ey({}, t),
                        {},
                        ev({}, n, p()(t, "".concat(n)) + r.height),
                      );
                },
                { top: f.top || 0, bottom: f.bottom || 0 },
              ),
              m = ey(ey({}, v), y),
              b = m.bottom;
            h && (m.bottom += h.props.height || K.defaultProps.height),
              d && e && (m = (0, k.s0)(m, n, r, e));
            var g = u - m.left - m.right,
              x = s - m.top - m.bottom;
            return ey(
              ey({ brushBottom: b }, m),
              {},
              { width: Math.max(g, 0), height: Math.max(x, 0) },
            );
          },
          eI = function (t) {
            var e = t.chartName,
              r = t.GraphicalChild,
              o = t.defaultTooltipEventType,
              c = void 0 === o ? "axis" : o,
              s = t.validateTooltipEventTypes,
              l = void 0 === s ? ["axis"] : s,
              f = t.axisComponents,
              h = t.legendContent,
              d = t.formatAxisMap,
              y = t.defaultProps,
              O = function (t, e) {
                var r = e.graphicalItems,
                  n = e.stackGroups,
                  i = e.offset,
                  o = e.updateId,
                  c = e.dataStartIndex,
                  u = e.dataEndIndex,
                  s = t.barSize,
                  l = t.layout,
                  p = t.barGap,
                  h = t.barCategoryGap,
                  d = t.maxBarSize,
                  y = eC(l),
                  v = y.numericAxisName,
                  m = y.cateAxisName,
                  g =
                    !!r &&
                    !!r.length &&
                    r.some(function (t) {
                      var e = (0, A.Mn)(t && t.type);
                      return e && e.indexOf("Bar") >= 0;
                    }),
                  x = [];
                return (
                  r.forEach(function (r, y) {
                    var w = ej(t.data, {
                        graphicalItems: [r],
                        dataStartIndex: c,
                        dataEndIndex: u,
                      }),
                      O =
                        void 0 !== r.type.defaultProps
                          ? ey(ey({}, r.type.defaultProps), r.props)
                          : r.props,
                      j = O.dataKey,
                      S = O.maxBarSize,
                      P = O["".concat(v, "Id")],
                      E = O["".concat(m, "Id")],
                      _ = f.reduce(function (t, r) {
                        var n = e["".concat(r.axisType, "Map")],
                          i = O["".concat(r.axisType, "Id")];
                        (n && n[i]) || "zAxis" === r.axisType || (0, b.A)(!1);
                        var o = n[i];
                        return ey(
                          ey({}, t),
                          {},
                          ev(
                            ev({}, r.axisType, o),
                            "".concat(r.axisType, "Ticks"),
                            (0, k.Rh)(o),
                          ),
                        );
                      }, {}),
                      M = _[m],
                      T = _["".concat(m, "Ticks")],
                      C =
                        n &&
                        n[P] &&
                        n[P].hasStack &&
                        (0, k.kA)(r, n[P].stackGroups),
                      N = (0, A.Mn)(r.type).indexOf("Bar") >= 0,
                      I = (0, k.Hj)(M, T),
                      D = [],
                      B =
                        g &&
                        (0, k.tA)({
                          barSize: s,
                          stackGroups: n,
                          totalSize:
                            "xAxis" === m
                              ? _[m].width
                              : "yAxis" === m
                                ? _[m].height
                                : void 0,
                        });
                    if (N) {
                      var R,
                        L,
                        z = a()(S) ? d : S,
                        U =
                          null !=
                          (R = null != (L = (0, k.Hj)(M, T, !0)) ? L : z)
                            ? R
                            : 0;
                      (D = (0, k.BX)({
                        barGap: p,
                        barCategoryGap: h,
                        bandSize: U !== I ? U : I,
                        sizeList: B[E],
                        maxBarSize: z,
                      })),
                        U !== I &&
                          (D = D.map(function (t) {
                            return ey(
                              ey({}, t),
                              {},
                              {
                                position: ey(
                                  ey({}, t.position),
                                  {},
                                  { offset: t.position.offset - U / 2 },
                                ),
                              },
                            );
                          }));
                    }
                    var F = r && r.type && r.type.getComposedData;
                    F &&
                      x.push({
                        props: ey(
                          ey(
                            {},
                            F(
                              ey(
                                ey({}, _),
                                {},
                                {
                                  displayedData: w,
                                  props: t,
                                  dataKey: j,
                                  item: r,
                                  bandSize: I,
                                  barPosition: D,
                                  offset: i,
                                  stackedData: C,
                                  layout: l,
                                  dataStartIndex: c,
                                  dataEndIndex: u,
                                },
                              ),
                            ),
                          ),
                          {},
                          ev(
                            ev(
                              ev({ key: r.key || "item-".concat(y) }, v, _[v]),
                              m,
                              _[m],
                            ),
                            "animationId",
                            o,
                          ),
                        ),
                        childIndex: (0, A.AW)(r, t.children),
                        item: r,
                      });
                  }),
                  x
                );
              },
              P = function (t, n) {
                var i = t.props,
                  o = t.dataStartIndex,
                  a = t.dataEndIndex,
                  c = t.updateId;
                if (!(0, A.Me)({ props: i })) return null;
                var u = i.children,
                  s = i.layout,
                  l = i.stackOffset,
                  p = i.data,
                  h = i.reverseStackOrder,
                  y = eC(s),
                  v = y.numericAxisName,
                  m = y.cateAxisName,
                  b = (0, A.aS)(u, r),
                  g = (0, k.Mn)(
                    p,
                    b,
                    "".concat(v, "Id"),
                    "".concat(m, "Id"),
                    l,
                    h,
                  ),
                  x = f.reduce(function (t, e) {
                    var r = "".concat(e.axisType, "Map");
                    return ey(
                      ey({}, t),
                      {},
                      ev(
                        {},
                        r,
                        e_(
                          i,
                          ey(
                            ey({}, e),
                            {},
                            {
                              graphicalItems: b,
                              stackGroups: e.axisType === v && g,
                              dataStartIndex: o,
                              dataEndIndex: a,
                            },
                          ),
                        ),
                      ),
                    );
                  }, {}),
                  w = eN(
                    ey(ey({}, x), {}, { props: i, graphicalItems: b }),
                    null == n ? void 0 : n.legendBBox,
                  );
                Object.keys(x).forEach(function (t) {
                  x[t] = d(i, x[t], w, t.replace("Map", ""), e);
                });
                var j = eM(x["".concat(m, "Map")]),
                  S = O(
                    i,
                    ey(
                      ey({}, x),
                      {},
                      {
                        dataStartIndex: o,
                        dataEndIndex: a,
                        updateId: c,
                        graphicalItems: b,
                        stackGroups: g,
                        offset: w,
                      },
                    ),
                  );
                return ey(
                  ey(
                    {
                      formattedGraphicalItems: S,
                      graphicalItems: b,
                      offset: w,
                      stackGroups: g,
                    },
                    j,
                  ),
                  x,
                );
              },
              E = (function (t) {
                var r;
                function o(t) {
                  var r, c, s, l, f;
                  if (!(this instanceof o))
                    throw TypeError("Cannot call a class as a function");
                  return (
                    (l = o),
                    (f = [t]),
                    (l = es(l)),
                    ev(
                      (s = (function (t, e) {
                        if (e && ("object" === ei(e) || "function" == typeof e))
                          return e;
                        if (void 0 !== e)
                          throw TypeError(
                            "Derived constructors may only return object or undefined",
                          );
                        var r = t;
                        if (void 0 === r)
                          throw ReferenceError(
                            "this hasn't been initialised - super() hasn't been called",
                          );
                        return r;
                      })(
                        this,
                        eu()
                          ? Reflect.construct(l, f || [], es(this).constructor)
                          : l.apply(this, f),
                      )),
                      "eventEmitterSymbol",
                      Symbol("rechartsEventEmitter"),
                    ),
                    ev(s, "accessibilityManager", new tZ()),
                    ev(s, "handleLegendBBoxUpdate", function (t) {
                      if (t) {
                        var e = s.state,
                          r = e.dataStartIndex,
                          n = e.dataEndIndex,
                          i = e.updateId;
                        s.setState(
                          ey(
                            { legendBBox: t },
                            P(
                              {
                                props: s.props,
                                dataStartIndex: r,
                                dataEndIndex: n,
                                updateId: i,
                              },
                              ey(ey({}, s.state), {}, { legendBBox: t }),
                            ),
                          ),
                        );
                      }
                    }),
                    ev(s, "handleReceiveSyncEvent", function (t, e, r) {
                      s.props.syncId === t &&
                        (r !== s.eventEmitterSymbol ||
                          "function" == typeof s.props.syncMethod) &&
                        s.applySyncEvent(e);
                    }),
                    ev(s, "handleBrushChange", function (t) {
                      var e = t.startIndex,
                        r = t.endIndex;
                      if (
                        e !== s.state.dataStartIndex ||
                        r !== s.state.dataEndIndex
                      ) {
                        var n = s.state.updateId;
                        s.setState(function () {
                          return ey(
                            { dataStartIndex: e, dataEndIndex: r },
                            P(
                              {
                                props: s.props,
                                dataStartIndex: e,
                                dataEndIndex: r,
                                updateId: n,
                              },
                              s.state,
                            ),
                          );
                        }),
                          s.triggerSyncEvent({
                            dataStartIndex: e,
                            dataEndIndex: r,
                          });
                      }
                    }),
                    ev(s, "handleMouseEnter", function (t) {
                      var e = s.getMouseInfo(t);
                      if (e) {
                        var r = ey(ey({}, e), {}, { isTooltipActive: !0 });
                        s.setState(r), s.triggerSyncEvent(r);
                        var n = s.props.onMouseEnter;
                        u()(n) && n(r, t);
                      }
                    }),
                    ev(s, "triggeredAfterMouseMove", function (t) {
                      var e = s.getMouseInfo(t),
                        r = e
                          ? ey(ey({}, e), {}, { isTooltipActive: !0 })
                          : { isTooltipActive: !1 };
                      s.setState(r), s.triggerSyncEvent(r);
                      var n = s.props.onMouseMove;
                      u()(n) && n(r, t);
                    }),
                    ev(s, "handleItemMouseEnter", function (t) {
                      s.setState(function () {
                        return {
                          isTooltipActive: !0,
                          activeItem: t,
                          activePayload: t.tooltipPayload,
                          activeCoordinate: t.tooltipPosition || {
                            x: t.cx,
                            y: t.cy,
                          },
                        };
                      });
                    }),
                    ev(s, "handleItemMouseLeave", function () {
                      s.setState(function () {
                        return { isTooltipActive: !1 };
                      });
                    }),
                    ev(s, "handleMouseMove", function (t) {
                      t.persist(), s.throttleTriggeredAfterMouseMove(t);
                    }),
                    ev(s, "handleMouseLeave", function (t) {
                      s.throttleTriggeredAfterMouseMove.cancel();
                      var e = { isTooltipActive: !1 };
                      s.setState(e), s.triggerSyncEvent(e);
                      var r = s.props.onMouseLeave;
                      u()(r) && r(e, t);
                    }),
                    ev(s, "handleOuterEvent", function (t) {
                      var e,
                        r,
                        n = (0, A.X_)(t),
                        i = p()(s.props, "".concat(n));
                      n &&
                        u()(i) &&
                        i(
                          null !=
                            (e = /.*touch.*/i.test(n)
                              ? s.getMouseInfo(t.changedTouches[0])
                              : s.getMouseInfo(t))
                            ? e
                            : {},
                          t,
                        );
                    }),
                    ev(s, "handleClick", function (t) {
                      var e = s.getMouseInfo(t);
                      if (e) {
                        var r = ey(ey({}, e), {}, { isTooltipActive: !0 });
                        s.setState(r), s.triggerSyncEvent(r);
                        var n = s.props.onClick;
                        u()(n) && n(r, t);
                      }
                    }),
                    ev(s, "handleMouseDown", function (t) {
                      var e = s.props.onMouseDown;
                      u()(e) && e(s.getMouseInfo(t), t);
                    }),
                    ev(s, "handleMouseUp", function (t) {
                      var e = s.props.onMouseUp;
                      u()(e) && e(s.getMouseInfo(t), t);
                    }),
                    ev(s, "handleTouchMove", function (t) {
                      null != t.changedTouches &&
                        t.changedTouches.length > 0 &&
                        s.throttleTriggeredAfterMouseMove(t.changedTouches[0]);
                    }),
                    ev(s, "handleTouchStart", function (t) {
                      null != t.changedTouches &&
                        t.changedTouches.length > 0 &&
                        s.handleMouseDown(t.changedTouches[0]);
                    }),
                    ev(s, "handleTouchEnd", function (t) {
                      null != t.changedTouches &&
                        t.changedTouches.length > 0 &&
                        s.handleMouseUp(t.changedTouches[0]);
                    }),
                    ev(s, "handleDoubleClick", function (t) {
                      var e = s.props.onDoubleClick;
                      u()(e) && e(s.getMouseInfo(t), t);
                    }),
                    ev(s, "handleContextMenu", function (t) {
                      var e = s.props.onContextMenu;
                      u()(e) && e(s.getMouseInfo(t), t);
                    }),
                    ev(s, "triggerSyncEvent", function (t) {
                      void 0 !== s.props.syncId &&
                        tH.emit(tV, s.props.syncId, t, s.eventEmitterSymbol);
                    }),
                    ev(s, "applySyncEvent", function (t) {
                      var e = s.props,
                        r = e.layout,
                        n = e.syncMethod,
                        i = s.state.updateId,
                        o = t.dataStartIndex,
                        a = t.dataEndIndex;
                      if (
                        void 0 !== t.dataStartIndex ||
                        void 0 !== t.dataEndIndex
                      )
                        s.setState(
                          ey(
                            { dataStartIndex: o, dataEndIndex: a },
                            P(
                              {
                                props: s.props,
                                dataStartIndex: o,
                                dataEndIndex: a,
                                updateId: i,
                              },
                              s.state,
                            ),
                          ),
                        );
                      else if (void 0 !== t.activeTooltipIndex) {
                        var c = t.chartX,
                          u = t.chartY,
                          l = t.activeTooltipIndex,
                          f = s.state,
                          p = f.offset,
                          h = f.tooltipTicks;
                        if (!p) return;
                        if ("function" == typeof n) l = n(h, t);
                        else if ("value" === n) {
                          l = -1;
                          for (var d = 0; d < h.length; d++)
                            if (h[d].value === t.activeLabel) {
                              l = d;
                              break;
                            }
                        }
                        var y = ey(ey({}, p), {}, { x: p.left, y: p.top }),
                          v = Math.min(c, y.x + y.width),
                          m = Math.min(u, y.y + y.height),
                          b = h[l] && h[l].value,
                          g = eA(s.state, s.props.data, l),
                          x = h[l]
                            ? {
                                x: "horizontal" === r ? h[l].coordinate : v,
                                y: "horizontal" === r ? m : h[l].coordinate,
                              }
                            : ex;
                        s.setState(
                          ey(
                            ey({}, t),
                            {},
                            {
                              activeLabel: b,
                              activeCoordinate: x,
                              activePayload: g,
                              activeTooltipIndex: l,
                            },
                          ),
                        );
                      } else s.setState(t);
                    }),
                    ev(s, "renderCursor", function (t) {
                      var r,
                        n = s.state,
                        o = n.isTooltipActive,
                        a = n.activeCoordinate,
                        c = n.activePayload,
                        u = n.offset,
                        l = n.activeTooltipIndex,
                        f = n.tooltipAxisBandSize,
                        p = s.getTooltipEventType(),
                        h = null != (r = t.props.active) ? r : o,
                        d = s.props.layout,
                        y = t.key || "_recharts-cursor";
                      return i().createElement(ee, {
                        key: y,
                        activeCoordinate: a,
                        activePayload: c,
                        activeTooltipIndex: l,
                        chartName: e,
                        element: t,
                        isActive: h,
                        layout: d,
                        offset: u,
                        tooltipAxisBandSize: f,
                        tooltipEventType: p,
                      });
                    }),
                    ev(s, "renderPolarAxis", function (t, e, r) {
                      var i = p()(t, "type.axisType"),
                        o = p()(s.state, "".concat(i, "Map")),
                        a = t.type.defaultProps,
                        c = void 0 !== a ? ey(ey({}, a), t.props) : t.props,
                        u = o && o[c["".concat(i, "Id")]];
                      return (0, n.cloneElement)(
                        t,
                        ey(
                          ey({}, u),
                          {},
                          {
                            className: (0, m.A)(i, u.className),
                            key: t.key || "".concat(e, "-").concat(r),
                            ticks: (0, k.Rh)(u, !0),
                          },
                        ),
                      );
                    }),
                    ev(s, "renderPolarGrid", function (t) {
                      var e = t.props,
                        r = e.radialLines,
                        i = e.polarAngles,
                        o = e.polarRadius,
                        a = s.state,
                        c = a.radiusAxisMap,
                        u = a.angleAxisMap,
                        l = (0, _.lX)(c),
                        f = (0, _.lX)(u),
                        p = f.cx,
                        h = f.cy,
                        d = f.innerRadius,
                        y = f.outerRadius;
                      return (0, n.cloneElement)(t, {
                        polarAngles: Array.isArray(i)
                          ? i
                          : (0, k.Rh)(f, !0).map(function (t) {
                              return t.coordinate;
                            }),
                        polarRadius: Array.isArray(o)
                          ? o
                          : (0, k.Rh)(l, !0).map(function (t) {
                              return t.coordinate;
                            }),
                        cx: p,
                        cy: h,
                        innerRadius: d,
                        outerRadius: y,
                        key: t.key || "polar-grid",
                        radialLines: r,
                      });
                    }),
                    ev(s, "renderLegend", function () {
                      var t = s.state.formattedGraphicalItems,
                        e = s.props,
                        r = e.children,
                        i = e.width,
                        o = e.height,
                        a = s.props.margin || {},
                        c = i - (a.left || 0) - (a.right || 0),
                        u = (0, J.g)({
                          children: r,
                          formattedGraphicalItems: t,
                          legendWidth: c,
                          legendContent: h,
                        });
                      if (!u) return null;
                      var l = u.item,
                        f = ec(u, er);
                      return (0, n.cloneElement)(
                        l,
                        ey(
                          ey({}, f),
                          {},
                          {
                            chartWidth: i,
                            chartHeight: o,
                            margin: a,
                            onBBoxUpdate: s.handleLegendBBoxUpdate,
                          },
                        ),
                      );
                    }),
                    ev(s, "renderTooltip", function () {
                      var t,
                        e = s.props,
                        r = e.children,
                        i = e.accessibilityLayer,
                        o = (0, A.BU)(r, w.m);
                      if (!o) return null;
                      var a = s.state,
                        c = a.isTooltipActive,
                        u = a.activeCoordinate,
                        l = a.activePayload,
                        f = a.activeLabel,
                        p = a.offset,
                        h = null != (t = o.props.active) ? t : c;
                      return (0, n.cloneElement)(o, {
                        viewBox: ey(ey({}, p), {}, { x: p.left, y: p.top }),
                        active: h,
                        label: f,
                        payload: h ? l : [],
                        coordinate: u,
                        accessibilityLayer: i,
                      });
                    }),
                    ev(s, "renderBrush", function (t) {
                      var e = s.props,
                        r = e.margin,
                        i = e.data,
                        o = s.state,
                        a = o.offset,
                        c = o.dataStartIndex,
                        u = o.dataEndIndex,
                        l = o.updateId;
                      return (0, n.cloneElement)(t, {
                        key: t.key || "_recharts-brush",
                        onChange: (0, k.HQ)(
                          s.handleBrushChange,
                          t.props.onChange,
                        ),
                        data: i,
                        x: (0, _.Et)(t.props.x) ? t.props.x : a.left,
                        y: (0, _.Et)(t.props.y)
                          ? t.props.y
                          : a.top + a.height + a.brushBottom - (r.bottom || 0),
                        width: (0, _.Et)(t.props.width)
                          ? t.props.width
                          : a.width,
                        startIndex: c,
                        endIndex: u,
                        updateId: "brush-".concat(l),
                      });
                    }),
                    ev(s, "renderReferenceElement", function (t, e, r) {
                      if (!t) return null;
                      var i = s.clipPathId,
                        o = s.state,
                        a = o.xAxisMap,
                        c = o.yAxisMap,
                        u = o.offset,
                        l = t.type.defaultProps || {},
                        f = t.props,
                        p = f.xAxisId,
                        h = void 0 === p ? l.xAxisId : p,
                        d = f.yAxisId,
                        y = void 0 === d ? l.yAxisId : d;
                      return (0, n.cloneElement)(t, {
                        key: t.key || "".concat(e, "-").concat(r),
                        xAxis: a[h],
                        yAxis: c[y],
                        viewBox: {
                          x: u.left,
                          y: u.top,
                          width: u.width,
                          height: u.height,
                        },
                        clipPathId: i,
                      });
                    }),
                    ev(s, "renderActivePoints", function (t) {
                      var e = t.item,
                        r = t.activePoint,
                        n = t.basePoint,
                        i = t.childIndex,
                        a = t.isRange,
                        c = [],
                        u = e.props.key,
                        s =
                          void 0 !== e.item.type.defaultProps
                            ? ey(ey({}, e.item.type.defaultProps), e.item.props)
                            : e.item.props,
                        l = s.activeDot,
                        f = ey(
                          ey(
                            {
                              index: i,
                              dataKey: s.dataKey,
                              cx: r.x,
                              cy: r.y,
                              r: 4,
                              fill: (0, k.Ps)(e.item),
                              strokeWidth: 2,
                              stroke: "#fff",
                              payload: r.payload,
                              value: r.value,
                            },
                            (0, A.J9)(l, !1),
                          ),
                          (0, tK._U)(l),
                        );
                      return (
                        c.push(
                          o.renderActiveDot(
                            l,
                            f,
                            "".concat(u, "-activePoint-").concat(i),
                          ),
                        ),
                        n
                          ? c.push(
                              o.renderActiveDot(
                                l,
                                ey(ey({}, f), {}, { cx: n.x, cy: n.y }),
                                "".concat(u, "-basePoint-").concat(i),
                              ),
                            )
                          : a && c.push(null),
                        c
                      );
                    }),
                    ev(s, "renderGraphicChild", function (t, e, r) {
                      var i = s.filterFormatItem(t, e, r);
                      if (!i) return null;
                      var o = s.getTooltipEventType(),
                        c = s.state,
                        u = c.isTooltipActive,
                        l = c.tooltipAxis,
                        f = c.activeTooltipIndex,
                        p = c.activeLabel,
                        h = s.props.children,
                        d = (0, A.BU)(h, w.m),
                        y = i.props,
                        v = y.points,
                        m = y.isRange,
                        b = y.baseLine,
                        g =
                          void 0 !== i.item.type.defaultProps
                            ? ey(ey({}, i.item.type.defaultProps), i.item.props)
                            : i.item.props,
                        x = g.activeDot,
                        O = g.hide,
                        j = g.activeBar,
                        S = g.activeShape,
                        P = !!(!O && u && d && (x || j || S)),
                        E = {};
                      "axis" !== o && d && "click" === d.props.trigger
                        ? (E = {
                            onClick: (0, k.HQ)(
                              s.handleItemMouseEnter,
                              t.props.onClick,
                            ),
                          })
                        : "axis" !== o &&
                          (E = {
                            onMouseLeave: (0, k.HQ)(
                              s.handleItemMouseLeave,
                              t.props.onMouseLeave,
                            ),
                            onMouseEnter: (0, k.HQ)(
                              s.handleItemMouseEnter,
                              t.props.onMouseEnter,
                            ),
                          });
                      var M = (0, n.cloneElement)(t, ey(ey({}, i.props), E));
                      if (P)
                        if (f >= 0) {
                          if (l.dataKey && !l.allowDuplicatedCategory) {
                            var T =
                              "function" == typeof l.dataKey
                                ? function (t) {
                                    return "function" == typeof l.dataKey
                                      ? l.dataKey(t.payload)
                                      : null;
                                  }
                                : "payload.".concat(l.dataKey.toString());
                            (N = (0, _.eP)(v, T, p)),
                              (I = m && b && (0, _.eP)(b, T, p));
                          } else
                            (N = null == v ? void 0 : v[f]),
                              (I = m && b && b[f]);
                          if (S || j) {
                            var C =
                              void 0 !== t.props.activeIndex
                                ? t.props.activeIndex
                                : f;
                            return [
                              (0, n.cloneElement)(
                                t,
                                ey(
                                  ey(ey({}, i.props), E),
                                  {},
                                  { activeIndex: C },
                                ),
                              ),
                              null,
                              null,
                            ];
                          }
                          if (!a()(N))
                            return [M].concat(
                              ef(
                                s.renderActivePoints({
                                  item: i,
                                  activePoint: N,
                                  basePoint: I,
                                  childIndex: f,
                                  isRange: m,
                                }),
                              ),
                            );
                        } else {
                          var N,
                            I,
                            D,
                            B = (
                              null !=
                              (D = s.getItemByXY(s.state.activeCoordinate))
                                ? D
                                : { graphicalItem: M }
                            ).graphicalItem,
                            R = B.item,
                            L = void 0 === R ? t : R,
                            z = B.childIndex,
                            U = ey(
                              ey(ey({}, i.props), E),
                              {},
                              { activeIndex: z },
                            );
                          return [(0, n.cloneElement)(L, U), null, null];
                        }
                      return m ? [M, null, null] : [M, null];
                    }),
                    ev(s, "renderCustomized", function (t, e, r) {
                      return (0, n.cloneElement)(
                        t,
                        ey(
                          ey(
                            { key: "recharts-customized-".concat(r) },
                            s.props,
                          ),
                          s.state,
                        ),
                      );
                    }),
                    ev(s, "renderMap", {
                      CartesianGrid: { handler: ew, once: !0 },
                      ReferenceArea: { handler: s.renderReferenceElement },
                      ReferenceLine: { handler: ew },
                      ReferenceDot: { handler: s.renderReferenceElement },
                      XAxis: { handler: ew },
                      YAxis: { handler: ew },
                      Brush: { handler: s.renderBrush, once: !0 },
                      Bar: { handler: s.renderGraphicChild },
                      Line: { handler: s.renderGraphicChild },
                      Area: { handler: s.renderGraphicChild },
                      Radar: { handler: s.renderGraphicChild },
                      RadialBar: { handler: s.renderGraphicChild },
                      Scatter: { handler: s.renderGraphicChild },
                      Pie: { handler: s.renderGraphicChild },
                      Funnel: { handler: s.renderGraphicChild },
                      Tooltip: { handler: s.renderCursor, once: !0 },
                      PolarGrid: { handler: s.renderPolarGrid, once: !0 },
                      PolarAngleAxis: { handler: s.renderPolarAxis },
                      PolarRadiusAxis: { handler: s.renderPolarAxis },
                      Customized: { handler: s.renderCustomized },
                    }),
                    (s.clipPathId = "".concat(
                      null != (r = t.id) ? r : (0, _.NF)("recharts"),
                      "-clip",
                    )),
                    (s.throttleTriggeredAfterMouseMove = v()(
                      s.triggeredAfterMouseMove,
                      null != (c = t.throttleDelay) ? c : 1e3 / 60,
                    )),
                    (s.state = {}),
                    s
                  );
                }
                if ("function" != typeof t && null !== t)
                  throw TypeError(
                    "Super expression must either be null or a function",
                  );
                return (
                  (o.prototype = Object.create(t && t.prototype, {
                    constructor: { value: o, writable: !0, configurable: !0 },
                  })),
                  Object.defineProperty(o, "prototype", { writable: !1 }),
                  t && el(o, t),
                  (r = [
                    {
                      key: "componentDidMount",
                      value: function () {
                        var t, e;
                        this.addListener(),
                          this.accessibilityManager.setDetails({
                            container: this.container,
                            offset: {
                              left:
                                null != (t = this.props.margin.left) ? t : 0,
                              top: null != (e = this.props.margin.top) ? e : 0,
                            },
                            coordinateList: this.state.tooltipTicks,
                            mouseHandlerCallback: this.triggeredAfterMouseMove,
                            layout: this.props.layout,
                          }),
                          this.displayDefaultTooltip();
                      },
                    },
                    {
                      key: "displayDefaultTooltip",
                      value: function () {
                        var t = this.props,
                          e = t.children,
                          r = t.data,
                          n = t.height,
                          i = t.layout,
                          o = (0, A.BU)(e, w.m);
                        if (o) {
                          var a = o.props.defaultIndex;
                          if (
                            "number" == typeof a &&
                            !(a < 0) &&
                            !(a > this.state.tooltipTicks.length - 1)
                          ) {
                            var c =
                                this.state.tooltipTicks[a] &&
                                this.state.tooltipTicks[a].value,
                              u = eA(this.state, r, a, c),
                              s = this.state.tooltipTicks[a].coordinate,
                              l = (this.state.offset.top + n) / 2,
                              f =
                                "horizontal" === i
                                  ? { x: s, y: l }
                                  : { y: s, x: l },
                              p = this.state.formattedGraphicalItems.find(
                                function (t) {
                                  return "Scatter" === t.item.type.name;
                                },
                              );
                            p &&
                              ((f = ey(
                                ey({}, f),
                                p.props.points[a].tooltipPosition,
                              )),
                              (u = p.props.points[a].tooltipPayload));
                            var h = {
                              activeTooltipIndex: a,
                              isTooltipActive: !0,
                              activeLabel: c,
                              activePayload: u,
                              activeCoordinate: f,
                            };
                            this.setState(h),
                              this.renderCursor(o),
                              this.accessibilityManager.setIndex(a);
                          }
                        }
                      },
                    },
                    {
                      key: "getSnapshotBeforeUpdate",
                      value: function (t, e) {
                        if (!this.props.accessibilityLayer) return null;
                        if (
                          (this.state.tooltipTicks !== e.tooltipTicks &&
                            this.accessibilityManager.setDetails({
                              coordinateList: this.state.tooltipTicks,
                            }),
                          this.props.layout !== t.layout &&
                            this.accessibilityManager.setDetails({
                              layout: this.props.layout,
                            }),
                          this.props.margin !== t.margin)
                        ) {
                          var r, n;
                          this.accessibilityManager.setDetails({
                            offset: {
                              left:
                                null != (r = this.props.margin.left) ? r : 0,
                              top: null != (n = this.props.margin.top) ? n : 0,
                            },
                          });
                        }
                        return null;
                      },
                    },
                    {
                      key: "componentDidUpdate",
                      value: function (t) {
                        (0, A.OV)(
                          [(0, A.BU)(t.children, w.m)],
                          [(0, A.BU)(this.props.children, w.m)],
                        ) || this.displayDefaultTooltip();
                      },
                    },
                    {
                      key: "componentWillUnmount",
                      value: function () {
                        this.removeListener(),
                          this.throttleTriggeredAfterMouseMove.cancel();
                      },
                    },
                    {
                      key: "getTooltipEventType",
                      value: function () {
                        var t = (0, A.BU)(this.props.children, w.m);
                        if (t && "boolean" == typeof t.props.shared) {
                          var e = t.props.shared ? "axis" : "item";
                          return l.indexOf(e) >= 0 ? e : c;
                        }
                        return c;
                      },
                    },
                    {
                      key: "getMouseInfo",
                      value: function (t) {
                        if (!this.container) return null;
                        var e = this.container,
                          r = e.getBoundingClientRect(),
                          n = (0, G.A3)(r),
                          i = {
                            chartX: Math.round(t.pageX - n.left),
                            chartY: Math.round(t.pageY - n.top),
                          },
                          o = r.width / e.offsetWidth || 1,
                          a = this.inRange(i.chartX, i.chartY, o);
                        if (!a) return null;
                        var c = this.state,
                          u = c.xAxisMap,
                          s = c.yAxisMap,
                          l = this.getTooltipEventType(),
                          f = eP(
                            this.state,
                            this.props.data,
                            this.props.layout,
                            a,
                          );
                        if ("axis" !== l && u && s) {
                          var p = (0, _.lX)(u).scale,
                            h = (0, _.lX)(s).scale,
                            d = p && p.invert ? p.invert(i.chartX) : null,
                            y = h && h.invert ? h.invert(i.chartY) : null;
                          return ey(ey({}, i), {}, { xValue: d, yValue: y }, f);
                        }
                        return f ? ey(ey({}, i), f) : null;
                      },
                    },
                    {
                      key: "inRange",
                      value: function (t, e) {
                        var r =
                            arguments.length > 2 && void 0 !== arguments[2]
                              ? arguments[2]
                              : 1,
                          n = this.props.layout,
                          i = t / r,
                          o = e / r;
                        if ("horizontal" === n || "vertical" === n) {
                          var a = this.state.offset;
                          return i >= a.left &&
                            i <= a.left + a.width &&
                            o >= a.top &&
                            o <= a.top + a.height
                            ? { x: i, y: o }
                            : null;
                        }
                        var c = this.state,
                          u = c.angleAxisMap,
                          s = c.radiusAxisMap;
                        if (u && s) {
                          var l = (0, _.lX)(u);
                          return (0, t$.yy)({ x: i, y: o }, l);
                        }
                        return null;
                      },
                    },
                    {
                      key: "parseEventsOfWrapper",
                      value: function () {
                        var t = this.props.children,
                          e = this.getTooltipEventType(),
                          r = (0, A.BU)(t, w.m),
                          n = {};
                        return (
                          r &&
                            "axis" === e &&
                            (n =
                              "click" === r.props.trigger
                                ? { onClick: this.handleClick }
                                : {
                                    onMouseEnter: this.handleMouseEnter,
                                    onDoubleClick: this.handleDoubleClick,
                                    onMouseMove: this.handleMouseMove,
                                    onMouseLeave: this.handleMouseLeave,
                                    onTouchMove: this.handleTouchMove,
                                    onTouchStart: this.handleTouchStart,
                                    onTouchEnd: this.handleTouchEnd,
                                    onContextMenu: this.handleContextMenu,
                                  }),
                          ey(
                            ey(
                              {},
                              (0, tK._U)(this.props, this.handleOuterEvent),
                            ),
                            n,
                          )
                        );
                      },
                    },
                    {
                      key: "addListener",
                      value: function () {
                        tH.on(tV, this.handleReceiveSyncEvent);
                      },
                    },
                    {
                      key: "removeListener",
                      value: function () {
                        tH.removeListener(tV, this.handleReceiveSyncEvent);
                      },
                    },
                    {
                      key: "filterFormatItem",
                      value: function (t, e, r) {
                        for (
                          var n = this.state.formattedGraphicalItems,
                            i = 0,
                            o = n.length;
                          i < o;
                          i++
                        ) {
                          var a = n[i];
                          if (
                            a.item === t ||
                            a.props.key === t.key ||
                            (e === (0, A.Mn)(a.item.type) && r === a.childIndex)
                          )
                            return a;
                        }
                        return null;
                      },
                    },
                    {
                      key: "renderClipPath",
                      value: function () {
                        var t = this.clipPathId,
                          e = this.state.offset,
                          r = e.left,
                          n = e.top,
                          o = e.height,
                          a = e.width;
                        return i().createElement(
                          "defs",
                          null,
                          i().createElement(
                            "clipPath",
                            { id: t },
                            i().createElement("rect", {
                              x: r,
                              y: n,
                              height: o,
                              width: a,
                            }),
                          ),
                        );
                      },
                    },
                    {
                      key: "getXScales",
                      value: function () {
                        var t = this.state.xAxisMap;
                        return t
                          ? Object.entries(t).reduce(function (t, e) {
                              var r = ea(e, 2),
                                n = r[0],
                                i = r[1];
                              return ey(ey({}, t), {}, ev({}, n, i.scale));
                            }, {})
                          : null;
                      },
                    },
                    {
                      key: "getYScales",
                      value: function () {
                        var t = this.state.yAxisMap;
                        return t
                          ? Object.entries(t).reduce(function (t, e) {
                              var r = ea(e, 2),
                                n = r[0],
                                i = r[1];
                              return ey(ey({}, t), {}, ev({}, n, i.scale));
                            }, {})
                          : null;
                      },
                    },
                    {
                      key: "getXScaleByAxisId",
                      value: function (t) {
                        var e;
                        return null == (e = this.state.xAxisMap) ||
                          null == (e = e[t])
                          ? void 0
                          : e.scale;
                      },
                    },
                    {
                      key: "getYScaleByAxisId",
                      value: function (t) {
                        var e;
                        return null == (e = this.state.yAxisMap) ||
                          null == (e = e[t])
                          ? void 0
                          : e.scale;
                      },
                    },
                    {
                      key: "getItemByXY",
                      value: function (t) {
                        var e = this.state,
                          r = e.formattedGraphicalItems,
                          n = e.activeItem;
                        if (r && r.length)
                          for (var i = 0, o = r.length; i < o; i++) {
                            var a = r[i],
                              c = a.props,
                              u = a.item,
                              s =
                                void 0 !== u.type.defaultProps
                                  ? ey(ey({}, u.type.defaultProps), u.props)
                                  : u.props,
                              l = (0, A.Mn)(u.type);
                            if ("Bar" === l) {
                              var f = (c.data || []).find(function (e) {
                                return (0, S.J)(t, e);
                              });
                              if (f) return { graphicalItem: a, payload: f };
                            } else if ("RadialBar" === l) {
                              var p = (c.data || []).find(function (e) {
                                return (0, t$.yy)(t, e);
                              });
                              if (p) return { graphicalItem: a, payload: p };
                            } else if (
                              (0, tQ.NE)(a, n) ||
                              (0, tQ.nZ)(a, n) ||
                              (0, tQ.xQ)(a, n)
                            ) {
                              var h = (0, tQ.GG)({
                                  graphicalItem: a,
                                  activeTooltipItem: n,
                                  itemData: s.data,
                                }),
                                d =
                                  void 0 === s.activeIndex ? h : s.activeIndex;
                              return {
                                graphicalItem: ey(
                                  ey({}, a),
                                  {},
                                  { childIndex: d },
                                ),
                                payload: (0, tQ.xQ)(a, n)
                                  ? s.data[h]
                                  : a.props.data[h],
                              };
                            }
                          }
                        return null;
                      },
                    },
                    {
                      key: "render",
                      value: function () {
                        var t,
                          e,
                          r = this;
                        if (!(0, A.Me)(this)) return null;
                        var n = this.props,
                          o = n.children,
                          a = n.className,
                          c = n.width,
                          u = n.height,
                          s = n.style,
                          l = n.compact,
                          f = n.title,
                          p = n.desc,
                          h = ec(n, en),
                          d = (0, A.J9)(h, !1);
                        if (l)
                          return i().createElement(
                            td.DR,
                            {
                              state: this.state,
                              width: this.props.width,
                              height: this.props.height,
                              clipPathId: this.clipPathId,
                            },
                            i().createElement(
                              g.u,
                              eo({}, d, {
                                width: c,
                                height: u,
                                title: f,
                                desc: p,
                              }),
                              this.renderClipPath(),
                              (0, A.ee)(o, this.renderMap),
                            ),
                          );
                        this.props.accessibilityLayer &&
                          ((d.tabIndex =
                            null != (t = this.props.tabIndex) ? t : 0),
                          (d.role =
                            null != (e = this.props.role) ? e : "application"),
                          (d.onKeyDown = function (t) {
                            r.accessibilityManager.keyboardEvent(t);
                          }),
                          (d.onFocus = function () {
                            r.accessibilityManager.focus();
                          }));
                        var y = this.parseEventsOfWrapper();
                        return i().createElement(
                          td.DR,
                          {
                            state: this.state,
                            width: this.props.width,
                            height: this.props.height,
                            clipPathId: this.clipPathId,
                          },
                          i().createElement(
                            "div",
                            eo(
                              {
                                className: (0, m.A)("recharts-wrapper", a),
                                style: ey(
                                  {
                                    position: "relative",
                                    cursor: "default",
                                    width: c,
                                    height: u,
                                  },
                                  s,
                                ),
                              },
                              y,
                              {
                                ref: function (t) {
                                  r.container = t;
                                },
                              },
                            ),
                            i().createElement(
                              g.u,
                              eo({}, d, {
                                width: c,
                                height: u,
                                title: f,
                                desc: p,
                                style: eg,
                              }),
                              this.renderClipPath(),
                              (0, A.ee)(o, this.renderMap),
                            ),
                            this.renderLegend(),
                            this.renderTooltip(),
                          ),
                        );
                      },
                    },
                  ]),
                  (function (t, e) {
                    for (var r = 0; r < e.length; r++) {
                      var n = e[r];
                      (n.enumerable = n.enumerable || !1),
                        (n.configurable = !0),
                        "value" in n && (n.writable = !0),
                        Object.defineProperty(t, em(n.key), n);
                    }
                  })(o.prototype, r),
                  Object.defineProperty(o, "prototype", { writable: !1 }),
                  o
                );
              })(n.Component);
            ev(E, "displayName", e),
              ev(
                E,
                "defaultProps",
                ey(
                  {
                    layout: "horizontal",
                    stackOffset: "none",
                    barCategoryGap: "10%",
                    barGap: 4,
                    margin: { top: 5, right: 5, bottom: 5, left: 5 },
                    reverseStackOrder: !1,
                    syncMethod: "index",
                  },
                  y,
                ),
              ),
              ev(E, "getDerivedStateFromProps", function (t, e) {
                var r = t.dataKey,
                  n = t.data,
                  i = t.children,
                  o = t.width,
                  c = t.height,
                  u = t.layout,
                  s = t.stackOffset,
                  l = t.margin,
                  f = e.dataStartIndex,
                  p = e.dataEndIndex;
                if (void 0 === e.updateId) {
                  var h = eT(t);
                  return ey(
                    ey(
                      ey({}, h),
                      {},
                      { updateId: 0 },
                      P(ey(ey({ props: t }, h), {}, { updateId: 0 }), e),
                    ),
                    {},
                    {
                      prevDataKey: r,
                      prevData: n,
                      prevWidth: o,
                      prevHeight: c,
                      prevLayout: u,
                      prevStackOffset: s,
                      prevMargin: l,
                      prevChildren: i,
                    },
                  );
                }
                if (
                  r !== e.prevDataKey ||
                  n !== e.prevData ||
                  o !== e.prevWidth ||
                  c !== e.prevHeight ||
                  u !== e.prevLayout ||
                  s !== e.prevStackOffset ||
                  !(0, tW.b)(l, e.prevMargin)
                ) {
                  var d = eT(t),
                    y = {
                      chartX: e.chartX,
                      chartY: e.chartY,
                      isTooltipActive: e.isTooltipActive,
                    },
                    v = ey(
                      ey({}, eP(e, n, u)),
                      {},
                      { updateId: e.updateId + 1 },
                    ),
                    m = ey(ey(ey({}, d), y), v);
                  return ey(
                    ey(ey({}, m), P(ey({ props: t }, m), e)),
                    {},
                    {
                      prevDataKey: r,
                      prevData: n,
                      prevWidth: o,
                      prevHeight: c,
                      prevLayout: u,
                      prevStackOffset: s,
                      prevMargin: l,
                      prevChildren: i,
                    },
                  );
                }
                if (!(0, A.OV)(i, e.prevChildren)) {
                  var b,
                    g,
                    x,
                    w,
                    O = (0, A.BU)(i, K),
                    j =
                      O &&
                      null !=
                        (b = null == (g = O.props) ? void 0 : g.startIndex)
                        ? b
                        : f,
                    S =
                      O &&
                      null != (x = null == (w = O.props) ? void 0 : w.endIndex)
                        ? x
                        : p,
                    E =
                      a()(n) || j !== f || S !== p
                        ? e.updateId + 1
                        : e.updateId;
                  return ey(
                    ey(
                      { updateId: E },
                      P(
                        ey(
                          ey({ props: t }, e),
                          {},
                          { updateId: E, dataStartIndex: j, dataEndIndex: S },
                        ),
                        e,
                      ),
                    ),
                    {},
                    { prevChildren: i, dataStartIndex: j, dataEndIndex: S },
                  );
                }
                return null;
              }),
              ev(E, "renderActiveDot", function (t, e, r) {
                var o;
                return (
                  (o = (0, n.isValidElement)(t)
                    ? (0, n.cloneElement)(t, e)
                    : u()(t)
                      ? t(e)
                      : i().createElement(j.c, e)),
                  i().createElement(
                    x.W,
                    { className: "recharts-active-dot", key: r },
                    o,
                  )
                );
              });
            var M = (0, n.forwardRef)(function (t, e) {
              return i().createElement(E, eo({}, t, { ref: e }));
            });
            return (M.displayName = E.displayName), M;
          };
      },
      30277: (t, e, r) => {
        "use strict";
        var n = r(19064);
        t.exports = function (t) {
          return function (e) {
            return n(e, t);
          };
        };
      },
      30842: (t, e, r) => {
        "use strict";
        var n = r(83048),
          i = 1 / 0;
        t.exports = function (t) {
          return t
            ? (t = n(t)) === i || t === -i
              ? (t < 0 ? -1 : 1) * 17976931348623157e292
              : t == t
                ? t
                : 0
            : 0 === t
              ? t
              : 0;
        };
      },
      31030: (t) => {
        "use strict";
        t.exports = function (t, e) {
          return null == t ? void 0 : t[e];
        };
      },
      31090: (t, e, r) => {
        t.exports = r(31528)();
      },
      31135: (t, e, r) => {
        "use strict";
        r.d(e, { W: () => v });
        var n = r(84205),
          i = r(79029),
          o = r(9403),
          a = r(59769),
          c = r(75243);
        function u(t) {
          return (u =
            "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
              ? function (t) {
                  return typeof t;
                }
              : function (t) {
                  return t &&
                    "function" == typeof Symbol &&
                    t.constructor === Symbol &&
                    t !== Symbol.prototype
                    ? "symbol"
                    : typeof t;
                })(t);
        }
        function s() {
          try {
            var t = !Boolean.prototype.valueOf.call(
              Reflect.construct(Boolean, [], function () {}),
            );
          } catch (t) {}
          return (s = function () {
            return !!t;
          })();
        }
        function l(t) {
          return (l = Object.setPrototypeOf
            ? Object.getPrototypeOf.bind()
            : function (t) {
                return t.__proto__ || Object.getPrototypeOf(t);
              })(t);
        }
        function f(t, e) {
          return (f = Object.setPrototypeOf
            ? Object.setPrototypeOf.bind()
            : function (t, e) {
                return (t.__proto__ = e), t;
              })(t, e);
        }
        function p(t, e, r) {
          return (
            (e = h(e)) in t
              ? Object.defineProperty(t, e, {
                  value: r,
                  enumerable: !0,
                  configurable: !0,
                  writable: !0,
                })
              : (t[e] = r),
            t
          );
        }
        function h(t) {
          var e = (function (t, e) {
            if ("object" != u(t) || !t) return t;
            var r = t[Symbol.toPrimitive];
            if (void 0 !== r) {
              var n = r.call(t, e || "default");
              if ("object" != u(n)) return n;
              throw TypeError("@@toPrimitive must return a primitive value.");
            }
            return ("string" === e ? String : Number)(t);
          })(t, "string");
          return "symbol" == u(e) ? e : e + "";
        }
        function d() {
          return (d = Object.assign
            ? Object.assign.bind()
            : function (t) {
                for (var e = 1; e < arguments.length; e++) {
                  var r = arguments[e];
                  for (var n in r)
                    Object.prototype.hasOwnProperty.call(r, n) && (t[n] = r[n]);
                }
                return t;
              }).apply(this, arguments);
        }
        function y(t) {
          var e = t.xAxisId,
            r = (0, o.yi)(),
            u = (0, o.rY)(),
            s = (0, o.AF)(e);
          return null == s
            ? null
            : n.createElement(
                a.u,
                d({}, s, {
                  className: (0, i.A)(
                    "recharts-".concat(s.axisType, " ").concat(s.axisType),
                    s.className,
                  ),
                  viewBox: { x: 0, y: 0, width: r, height: u },
                  ticksGenerator: function (t) {
                    return (0, c.Rh)(t, !0);
                  },
                }),
              );
        }
        var v = (function (t) {
          var e;
          function r() {
            var t, e;
            if (!(this instanceof r))
              throw TypeError("Cannot call a class as a function");
            return (
              (t = r),
              (e = arguments),
              (t = l(t)),
              (function (t, e) {
                if (e && ("object" === u(e) || "function" == typeof e))
                  return e;
                if (void 0 !== e)
                  throw TypeError(
                    "Derived constructors may only return object or undefined",
                  );
                var r = t;
                if (void 0 === r)
                  throw ReferenceError(
                    "this hasn't been initialised - super() hasn't been called",
                  );
                return r;
              })(
                this,
                s()
                  ? Reflect.construct(t, e || [], l(this).constructor)
                  : t.apply(this, e),
              )
            );
          }
          if ("function" != typeof t && null !== t)
            throw TypeError(
              "Super expression must either be null or a function",
            );
          return (
            (r.prototype = Object.create(t && t.prototype, {
              constructor: { value: r, writable: !0, configurable: !0 },
            })),
            Object.defineProperty(r, "prototype", { writable: !1 }),
            t && f(r, t),
            (e = [
              {
                key: "render",
                value: function () {
                  return n.createElement(y, this.props);
                },
              },
            ]),
            (function (t, e) {
              for (var r = 0; r < e.length; r++) {
                var n = e[r];
                (n.enumerable = n.enumerable || !1),
                  (n.configurable = !0),
                  "value" in n && (n.writable = !0),
                  Object.defineProperty(t, h(n.key), n);
              }
            })(r.prototype, e),
            Object.defineProperty(r, "prototype", { writable: !1 }),
            r
          );
        })(n.Component);
        p(v, "displayName", "XAxis"),
          p(v, "defaultProps", {
            allowDecimals: !0,
            hide: !1,
            orientation: "bottom",
            width: 0,
            height: 30,
            mirror: !1,
            xAxisId: 0,
            tickCount: 5,
            type: "category",
            padding: { left: 0, right: 0 },
            allowDataOverflow: !1,
            scale: "auto",
            reversed: !1,
            allowDuplicatedCategory: !0,
          });
      },
      31421: (t) => {
        "use strict";
        t.exports = require("node:child_process");
      },
      31528: (t, e, r) => {
        "use strict";
        var n = r(63819);
        function i() {}
        function o() {}
        (o.resetWarningCache = i),
          (t.exports = function () {
            function t(t, e, r, i, o, a) {
              if (a !== n) {
                var c = Error(
                  "Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types",
                );
                throw ((c.name = "Invariant Violation"), c);
              }
            }
            function e() {
              return t;
            }
            t.isRequired = t;
            var r = {
              array: t,
              bigint: t,
              bool: t,
              func: t,
              number: t,
              object: t,
              string: t,
              symbol: t,
              any: t,
              arrayOf: e,
              element: t,
              elementType: t,
              instanceOf: e,
              node: t,
              objectOf: e,
              oneOf: e,
              oneOfType: e,
              shape: e,
              exact: e,
              checkPropTypes: o,
              resetWarningCache: i,
            };
            return (r.PropTypes = r), r;
          });
      },
      31868: (t) => {
        "use strict";
        var e = Object.prototype.toString;
        t.exports = function (t) {
          return e.call(t);
        };
      },
      33143: (t, e, r) => {
        "use strict";
        var n = r(28017),
          i = r(90236),
          o = r(64508),
          a = {};
        (a["[object Float32Array]"] =
          a["[object Float64Array]"] =
          a["[object Int8Array]"] =
          a["[object Int16Array]"] =
          a["[object Int32Array]"] =
          a["[object Uint8Array]"] =
          a["[object Uint8ClampedArray]"] =
          a["[object Uint16Array]"] =
          a["[object Uint32Array]"] =
            !0),
          (a["[object Arguments]"] =
            a["[object Array]"] =
            a["[object ArrayBuffer]"] =
            a["[object Boolean]"] =
            a["[object DataView]"] =
            a["[object Date]"] =
            a["[object Error]"] =
            a["[object Function]"] =
            a["[object Map]"] =
            a["[object Number]"] =
            a["[object Object]"] =
            a["[object RegExp]"] =
            a["[object Set]"] =
            a["[object String]"] =
            a["[object WeakMap]"] =
              !1),
          (t.exports = function (t) {
            return o(t) && i(t.length) && !!a[n(t)];
          });
      },
      33873: (t) => {
        "use strict";
        t.exports = require("path");
      },
      33965: (t, e, r) => {
        "use strict";
        var n = r(85412);
        t.exports = function (t, e, r) {
          for (var i = -1, o = t.length; ++i < o; ) {
            var a = t[i],
              c = e(a);
            if (null != c && (void 0 === u ? c == c && !n(c) : r(c, u)))
              var u = c,
                s = a;
          }
          return s;
        };
      },
      34219: (t, e, r) => {
        "use strict";
        var n = r(45);
        t.exports = function (t, e) {
          return !!(null == t ? 0 : t.length) && n(t, e, 0) > -1;
        };
      },
      34384: (t, e, r) => {
        "use strict";
        var n = r(39822),
          i =
            /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g,
          o = /\\(\\)?/g;
        t.exports = n(function (t) {
          var e = [];
          return (
            46 === t.charCodeAt(0) && e.push(""),
            t.replace(i, function (t, r, n, i) {
              e.push(n ? i.replace(o, "$1") : r || t);
            }),
            e
          );
        });
      },
      34425: (t, e, r) => {
        "use strict";
        var n = r(28017),
          i = r(86913),
          o = r(64508),
          a = Object.prototype,
          c = Function.prototype.toString,
          u = a.hasOwnProperty,
          s = c.call(Object);
        t.exports = function (t) {
          if (!o(t) || "[object Object]" != n(t)) return !1;
          var e = i(t);
          if (null === e) return !0;
          var r = u.call(e, "constructor") && e.constructor;
          return "function" == typeof r && r instanceof r && c.call(r) == s;
        };
      },
      34574: (t, e, r) => {
        "use strict";
        r.d(e, { A: () => o, z: () => a });
        var n = r(7154),
          i = r(24547);
        function o() {
          var t,
            e,
            r = (0, i.A)().unknown(void 0),
            a = r.domain,
            c = r.range,
            u = 0,
            s = 1,
            l = !1,
            f = 0,
            p = 0,
            h = 0.5;
          function d() {
            var r = a().length,
              n = s < u,
              i = n ? s : u,
              o = n ? u : s;
            (t = (o - i) / Math.max(1, r - f + 2 * p)),
              l && (t = Math.floor(t)),
              (i += (o - i - t * (r - f)) * h),
              (e = t * (1 - f)),
              l && ((i = Math.round(i)), (e = Math.round(e)));
            var d = (function (t, e, r) {
              (t *= 1),
                (e *= 1),
                (r =
                  (i = arguments.length) < 2
                    ? ((e = t), (t = 0), 1)
                    : i < 3
                      ? 1
                      : +r);
              for (
                var n = -1,
                  i = 0 | Math.max(0, Math.ceil((e - t) / r)),
                  o = Array(i);
                ++n < i;

              )
                o[n] = t + n * r;
              return o;
            })(r).map(function (e) {
              return i + t * e;
            });
            return c(n ? d.reverse() : d);
          }
          return (
            delete r.unknown,
            (r.domain = function (t) {
              return arguments.length ? (a(t), d()) : a();
            }),
            (r.range = function (t) {
              return arguments.length
                ? (([u, s] = t), (u *= 1), (s *= 1), d())
                : [u, s];
            }),
            (r.rangeRound = function (t) {
              return ([u, s] = t), (u *= 1), (s *= 1), (l = !0), d();
            }),
            (r.bandwidth = function () {
              return e;
            }),
            (r.step = function () {
              return t;
            }),
            (r.round = function (t) {
              return arguments.length ? ((l = !!t), d()) : l;
            }),
            (r.padding = function (t) {
              return arguments.length ? ((f = Math.min(1, (p = +t))), d()) : f;
            }),
            (r.paddingInner = function (t) {
              return arguments.length ? ((f = Math.min(1, t)), d()) : f;
            }),
            (r.paddingOuter = function (t) {
              return arguments.length ? ((p = +t), d()) : p;
            }),
            (r.align = function (t) {
              return arguments.length
                ? ((h = Math.max(0, Math.min(1, t))), d())
                : h;
            }),
            (r.copy = function () {
              return o(a(), [u, s])
                .round(l)
                .paddingInner(f)
                .paddingOuter(p)
                .align(h);
            }),
            n.C.apply(d(), arguments)
          );
        }
        function a() {
          return (function t(e) {
            var r = e.copy;
            return (
              (e.padding = e.paddingOuter),
              delete e.paddingInner,
              delete e.paddingOuter,
              (e.copy = function () {
                return t(r());
              }),
              e
            );
          })(o.apply(null, arguments).paddingInner(1));
        }
      },
      34631: (t) => {
        "use strict";
        t.exports = require("tls");
      },
      34764: (t, e, r) => {
        "use strict";
        var n = r(58180);
        t.exports = function (t, e, r) {
          for (
            var i = -1,
              o = t.criteria,
              a = e.criteria,
              c = o.length,
              u = r.length;
            ++i < c;

          ) {
            var s = n(o[i], a[i]);
            if (s) {
              if (i >= u) return s;
              return s * ("desc" == r[i] ? -1 : 1);
            }
          }
          return t.index - e.index;
        };
      },
      34831: (t, e, r) => {
        "use strict";
        r.d(e, { i: () => I });
        var n = r(84205),
          i = r.n(n),
          o = r(56830),
          a = r.n(o);
        let c = Math.cos,
          u = Math.sin,
          s = Math.sqrt,
          l = Math.PI,
          f = 2 * l,
          p = {
            draw(t, e) {
              let r = s(e / l);
              t.moveTo(r, 0), t.arc(0, 0, r, 0, f);
            },
          },
          h = s(1 / 3),
          d = 2 * h,
          y = u(l / 10) / u((7 * l) / 10),
          v = u(f / 10) * y,
          m = -c(f / 10) * y,
          b = s(3),
          g = s(3) / 2,
          x = 1 / s(12),
          w = (x / 2 + 1) * 3;
        var O = r(77095),
          j = r(80855);
        s(3), s(3);
        var S = r(79029),
          A = r(18862);
        function P(t) {
          return (P =
            "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
              ? function (t) {
                  return typeof t;
                }
              : function (t) {
                  return t &&
                    "function" == typeof Symbol &&
                    t.constructor === Symbol &&
                    t !== Symbol.prototype
                    ? "symbol"
                    : typeof t;
                })(t);
        }
        var E = ["type", "size", "sizeType"];
        function k() {
          return (k = Object.assign
            ? Object.assign.bind()
            : function (t) {
                for (var e = 1; e < arguments.length; e++) {
                  var r = arguments[e];
                  for (var n in r)
                    Object.prototype.hasOwnProperty.call(r, n) && (t[n] = r[n]);
                }
                return t;
              }).apply(this, arguments);
        }
        function _(t, e) {
          var r = Object.keys(t);
          if (Object.getOwnPropertySymbols) {
            var n = Object.getOwnPropertySymbols(t);
            e &&
              (n = n.filter(function (e) {
                return Object.getOwnPropertyDescriptor(t, e).enumerable;
              })),
              r.push.apply(r, n);
          }
          return r;
        }
        function M(t) {
          for (var e = 1; e < arguments.length; e++) {
            var r = null != arguments[e] ? arguments[e] : {};
            e % 2
              ? _(Object(r), !0).forEach(function (e) {
                  var n, i, o;
                  (n = t),
                    (i = e),
                    (o = r[e]),
                    (i = (function (t) {
                      var e = (function (t, e) {
                        if ("object" != P(t) || !t) return t;
                        var r = t[Symbol.toPrimitive];
                        if (void 0 !== r) {
                          var n = r.call(t, e || "default");
                          if ("object" != P(n)) return n;
                          throw TypeError(
                            "@@toPrimitive must return a primitive value.",
                          );
                        }
                        return ("string" === e ? String : Number)(t);
                      })(t, "string");
                      return "symbol" == P(e) ? e : e + "";
                    })(i)) in n
                      ? Object.defineProperty(n, i, {
                          value: o,
                          enumerable: !0,
                          configurable: !0,
                          writable: !0,
                        })
                      : (n[i] = o);
                })
              : Object.getOwnPropertyDescriptors
                ? Object.defineProperties(
                    t,
                    Object.getOwnPropertyDescriptors(r),
                  )
                : _(Object(r)).forEach(function (e) {
                    Object.defineProperty(
                      t,
                      e,
                      Object.getOwnPropertyDescriptor(r, e),
                    );
                  });
          }
          return t;
        }
        var T = {
            symbolCircle: p,
            symbolCross: {
              draw(t, e) {
                let r = s(e / 5) / 2;
                t.moveTo(-3 * r, -r),
                  t.lineTo(-r, -r),
                  t.lineTo(-r, -3 * r),
                  t.lineTo(r, -3 * r),
                  t.lineTo(r, -r),
                  t.lineTo(3 * r, -r),
                  t.lineTo(3 * r, r),
                  t.lineTo(r, r),
                  t.lineTo(r, 3 * r),
                  t.lineTo(-r, 3 * r),
                  t.lineTo(-r, r),
                  t.lineTo(-3 * r, r),
                  t.closePath();
              },
            },
            symbolDiamond: {
              draw(t, e) {
                let r = s(e / d),
                  n = r * h;
                t.moveTo(0, -r),
                  t.lineTo(n, 0),
                  t.lineTo(0, r),
                  t.lineTo(-n, 0),
                  t.closePath();
              },
            },
            symbolSquare: {
              draw(t, e) {
                let r = s(e),
                  n = -r / 2;
                t.rect(n, n, r, r);
              },
            },
            symbolStar: {
              draw(t, e) {
                let r = s(0.8908130915292852 * e),
                  n = v * r,
                  i = m * r;
                t.moveTo(0, -r), t.lineTo(n, i);
                for (let e = 1; e < 5; ++e) {
                  let o = (f * e) / 5,
                    a = c(o),
                    s = u(o);
                  t.lineTo(s * r, -a * r),
                    t.lineTo(a * n - s * i, s * n + a * i);
                }
                t.closePath();
              },
            },
            symbolTriangle: {
              draw(t, e) {
                let r = -s(e / (3 * b));
                t.moveTo(0, 2 * r),
                  t.lineTo(-b * r, -r),
                  t.lineTo(b * r, -r),
                  t.closePath();
              },
            },
            symbolWye: {
              draw(t, e) {
                let r = s(e / w),
                  n = r / 2,
                  i = r * x,
                  o = r * x + r,
                  a = -n;
                t.moveTo(n, i),
                  t.lineTo(n, o),
                  t.lineTo(a, o),
                  t.lineTo(-0.5 * n - g * i, g * n + -0.5 * i),
                  t.lineTo(-0.5 * n - g * o, g * n + -0.5 * o),
                  t.lineTo(-0.5 * a - g * o, g * a + -0.5 * o),
                  t.lineTo(-0.5 * n + g * i, -0.5 * i - g * n),
                  t.lineTo(-0.5 * n + g * o, -0.5 * o - g * n),
                  t.lineTo(-0.5 * a + g * o, -0.5 * o - g * a),
                  t.closePath();
              },
            },
          },
          C = Math.PI / 180,
          N = function (t, e, r) {
            if ("area" === e) return t;
            switch (r) {
              case "cross":
                return (5 * t * t) / 9;
              case "diamond":
                return (0.5 * t * t) / Math.sqrt(3);
              case "square":
                return t * t;
              case "star":
                var n = 18 * C;
                return (
                  1.25 *
                  t *
                  t *
                  (Math.tan(n) - Math.tan(2 * n) * Math.pow(Math.tan(n), 2))
                );
              case "triangle":
                return (Math.sqrt(3) * t * t) / 4;
              case "wye":
                return ((21 - 10 * Math.sqrt(3)) * t * t) / 8;
              default:
                return (Math.PI * t * t) / 4;
            }
          },
          I = function (t) {
            var e,
              r = t.type,
              n = void 0 === r ? "circle" : r,
              o = t.size,
              c = void 0 === o ? 64 : o,
              u = t.sizeType,
              s = void 0 === u ? "area" : u,
              l = M(
                M(
                  {},
                  (function (t, e) {
                    if (null == t) return {};
                    var r,
                      n,
                      i = (function (t, e) {
                        if (null == t) return {};
                        var r = {};
                        for (var n in t)
                          if (Object.prototype.hasOwnProperty.call(t, n)) {
                            if (e.indexOf(n) >= 0) continue;
                            r[n] = t[n];
                          }
                        return r;
                      })(t, e);
                    if (Object.getOwnPropertySymbols) {
                      var o = Object.getOwnPropertySymbols(t);
                      for (n = 0; n < o.length; n++)
                        (r = o[n]),
                          !(e.indexOf(r) >= 0) &&
                            Object.prototype.propertyIsEnumerable.call(t, r) &&
                            (i[r] = t[r]);
                    }
                    return i;
                  })(t, E),
                ),
                {},
                { type: n, size: c, sizeType: s },
              ),
              f = l.className,
              h = l.cx,
              d = l.cy,
              y = (0, A.J9)(l, !0);
            return h === +h && d === +d && c === +c
              ? i().createElement(
                  "path",
                  k({}, y, {
                    className: (0, S.A)("recharts-symbols", f),
                    transform: "translate(".concat(h, ", ").concat(d, ")"),
                    d:
                      ((e = T["symbol".concat(a()(n))] || p),
                      (function (t, e) {
                        let r = null,
                          n = (0, j.i)(i);
                        function i() {
                          let i;
                          if (
                            (r || (r = i = n()),
                            t
                              .apply(this, arguments)
                              .draw(r, +e.apply(this, arguments)),
                            i)
                          )
                            return (r = null), i + "" || null;
                        }
                        return (
                          (t = "function" == typeof t ? t : (0, O.A)(t || p)),
                          (e =
                            "function" == typeof e
                              ? e
                              : (0, O.A)(void 0 === e ? 64 : +e)),
                          (i.type = function (e) {
                            return arguments.length
                              ? ((t = "function" == typeof e ? e : (0, O.A)(e)),
                                i)
                              : t;
                          }),
                          (i.size = function (t) {
                            return arguments.length
                              ? ((e =
                                  "function" == typeof t ? t : (0, O.A)(+t)),
                                i)
                              : e;
                          }),
                          (i.context = function (t) {
                            return arguments.length
                              ? ((r = null == t ? null : t), i)
                              : r;
                          }),
                          i
                        );
                      })()
                        .type(e)
                        .size(N(c, s, n))()),
                  }),
                )
              : null;
          };
        I.registerSymbol = function (t, e) {
          T["symbol".concat(a()(t))] = e;
        };
      },
      35183: (t, e, r) => {
        "use strict";
        var n = r(8316),
          i = Object.prototype.hasOwnProperty;
        t.exports = function (t) {
          var e = this.__data__;
          return n ? void 0 !== e[t] : i.call(e, t);
        };
      },
      36343: (t, e, r) => {
        "use strict";
        t.exports = r(43960)(r(40671), "Set");
      },
      36686: (t) => {
        "use strict";
        t.exports = require("diagnostics_channel");
      },
      37067: (t) => {
        "use strict";
        t.exports = require("node:http");
      },
      37609: (t, e, r) => {
        "use strict";
        var n = r(45131),
          i = r(8178),
          o = r(71825);
        function a(t) {
          var e = -1,
            r = null == t ? 0 : t.length;
          for (this.__data__ = new n(); ++e < r; ) this.add(t[e]);
        }
        (a.prototype.add = a.prototype.push = i),
          (a.prototype.has = o),
          (t.exports = a);
      },
      37676: (t, e, r) => {
        "use strict";
        r.d(e, { h: () => v });
        var n = r(84205),
          i = r(79029),
          o = r(9403),
          a = r(59769),
          c = r(75243);
        function u(t) {
          return (u =
            "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
              ? function (t) {
                  return typeof t;
                }
              : function (t) {
                  return t &&
                    "function" == typeof Symbol &&
                    t.constructor === Symbol &&
                    t !== Symbol.prototype
                    ? "symbol"
                    : typeof t;
                })(t);
        }
        function s() {
          try {
            var t = !Boolean.prototype.valueOf.call(
              Reflect.construct(Boolean, [], function () {}),
            );
          } catch (t) {}
          return (s = function () {
            return !!t;
          })();
        }
        function l(t) {
          return (l = Object.setPrototypeOf
            ? Object.getPrototypeOf.bind()
            : function (t) {
                return t.__proto__ || Object.getPrototypeOf(t);
              })(t);
        }
        function f(t, e) {
          return (f = Object.setPrototypeOf
            ? Object.setPrototypeOf.bind()
            : function (t, e) {
                return (t.__proto__ = e), t;
              })(t, e);
        }
        function p(t, e, r) {
          return (
            (e = h(e)) in t
              ? Object.defineProperty(t, e, {
                  value: r,
                  enumerable: !0,
                  configurable: !0,
                  writable: !0,
                })
              : (t[e] = r),
            t
          );
        }
        function h(t) {
          var e = (function (t, e) {
            if ("object" != u(t) || !t) return t;
            var r = t[Symbol.toPrimitive];
            if (void 0 !== r) {
              var n = r.call(t, e || "default");
              if ("object" != u(n)) return n;
              throw TypeError("@@toPrimitive must return a primitive value.");
            }
            return ("string" === e ? String : Number)(t);
          })(t, "string");
          return "symbol" == u(e) ? e : e + "";
        }
        function d() {
          return (d = Object.assign
            ? Object.assign.bind()
            : function (t) {
                for (var e = 1; e < arguments.length; e++) {
                  var r = arguments[e];
                  for (var n in r)
                    Object.prototype.hasOwnProperty.call(r, n) && (t[n] = r[n]);
                }
                return t;
              }).apply(this, arguments);
        }
        var y = function (t) {
            var e = t.yAxisId,
              r = (0, o.yi)(),
              u = (0, o.rY)(),
              s = (0, o.Nk)(e);
            return null == s
              ? null
              : n.createElement(
                  a.u,
                  d({}, s, {
                    className: (0, i.A)(
                      "recharts-".concat(s.axisType, " ").concat(s.axisType),
                      s.className,
                    ),
                    viewBox: { x: 0, y: 0, width: r, height: u },
                    ticksGenerator: function (t) {
                      return (0, c.Rh)(t, !0);
                    },
                  }),
                );
          },
          v = (function (t) {
            var e;
            function r() {
              var t, e;
              if (!(this instanceof r))
                throw TypeError("Cannot call a class as a function");
              return (
                (t = r),
                (e = arguments),
                (t = l(t)),
                (function (t, e) {
                  if (e && ("object" === u(e) || "function" == typeof e))
                    return e;
                  if (void 0 !== e)
                    throw TypeError(
                      "Derived constructors may only return object or undefined",
                    );
                  var r = t;
                  if (void 0 === r)
                    throw ReferenceError(
                      "this hasn't been initialised - super() hasn't been called",
                    );
                  return r;
                })(
                  this,
                  s()
                    ? Reflect.construct(t, e || [], l(this).constructor)
                    : t.apply(this, e),
                )
              );
            }
            if ("function" != typeof t && null !== t)
              throw TypeError(
                "Super expression must either be null or a function",
              );
            return (
              (r.prototype = Object.create(t && t.prototype, {
                constructor: { value: r, writable: !0, configurable: !0 },
              })),
              Object.defineProperty(r, "prototype", { writable: !1 }),
              t && f(r, t),
              (e = [
                {
                  key: "render",
                  value: function () {
                    return n.createElement(y, this.props);
                  },
                },
              ]),
              (function (t, e) {
                for (var r = 0; r < e.length; r++) {
                  var n = e[r];
                  (n.enumerable = n.enumerable || !1),
                    (n.configurable = !0),
                    "value" in n && (n.writable = !0),
                    Object.defineProperty(t, h(n.key), n);
                }
              })(r.prototype, e),
              Object.defineProperty(r, "prototype", { writable: !1 }),
              r
            );
          })(n.Component);
        p(v, "displayName", "YAxis"),
          p(v, "defaultProps", {
            allowDuplicatedCategory: !0,
            allowDecimals: !0,
            hide: !1,
            orientation: "left",
            width: 60,
            height: 0,
            mirror: !1,
            yAxisId: 0,
            tickCount: 5,
            type: "number",
            padding: { top: 0, bottom: 0 },
            allowDataOverflow: !1,
            scale: "auto",
            reversed: !1,
          });
      },
      37861: (t) => {
        "use strict";
        var e = Date.now;
        t.exports = function (t) {
          var r = 0,
            n = 0;
          return function () {
            var i = e(),
              o = 16 - (i - n);
            if (((n = i), o > 0)) {
              if (++r >= 800) return arguments[0];
            } else r = 0;
            return t.apply(void 0, arguments);
          };
        };
      },
      37869: (t) => {
        "use strict";
        t.exports = function (t, e, r) {
          for (var n = r - 1, i = t.length; ++n < i; ) if (t[n] === e) return n;
          return -1;
        };
      },
      37895: (t) => {
        "use strict";
        t.exports = function (t, e) {
          return null != t && e in Object(t);
        };
      },
      38155: (t, e, r) => {
        "use strict";
        t.exports = r(40671).Symbol;
      },
      38439: (t, e, r) => {
        "use strict";
        t.exports = r(53163)();
      },
      38522: (t) => {
        "use strict";
        t.exports = require("node:zlib");
      },
      38785: (t, e, r) => {
        "use strict";
        var n = r(81828);
        t.exports = function (t, e) {
          var r = t.__data__;
          return n(e) ? r["string" == typeof e ? "string" : "hash"] : r.map;
        };
      },
      39125: (t, e, r) => {
        "use strict";
        r.d(e, { r: () => tr });
        var n = r(29392),
          i = r(84205),
          o = r.n(i),
          a = r(4276),
          c = r.n(a),
          u = r(79029),
          s = r(57830),
          l = r(77214),
          f = r(18862),
          p = ["points", "className", "baseLinePoints", "connectNulls"];
        function h() {
          return (h = Object.assign
            ? Object.assign.bind()
            : function (t) {
                for (var e = 1; e < arguments.length; e++) {
                  var r = arguments[e];
                  for (var n in r)
                    Object.prototype.hasOwnProperty.call(r, n) && (t[n] = r[n]);
                }
                return t;
              }).apply(this, arguments);
        }
        function d(t) {
          return (
            (function (t) {
              if (Array.isArray(t)) return y(t);
            })(t) ||
            (function (t) {
              if (
                ("undefined" != typeof Symbol && null != t[Symbol.iterator]) ||
                null != t["@@iterator"]
              )
                return Array.from(t);
            })(t) ||
            (function (t, e) {
              if (t) {
                if ("string" == typeof t) return y(t, void 0);
                var r = Object.prototype.toString.call(t).slice(8, -1);
                if (
                  ("Object" === r && t.constructor && (r = t.constructor.name),
                  "Map" === r || "Set" === r)
                )
                  return Array.from(t);
                if (
                  "Arguments" === r ||
                  /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)
                )
                  return y(t, e);
              }
            })(t) ||
            (function () {
              throw TypeError(
                "Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.",
              );
            })()
          );
        }
        function y(t, e) {
          (null == e || e > t.length) && (e = t.length);
          for (var r = 0, n = Array(e); r < e; r++) n[r] = t[r];
          return n;
        }
        var v = function (t) {
            return t && t.x === +t.x && t.y === +t.y;
          },
          m = function () {
            var t =
                arguments.length > 0 && void 0 !== arguments[0]
                  ? arguments[0]
                  : [],
              e = [[]];
            return (
              t.forEach(function (t) {
                v(t)
                  ? e[e.length - 1].push(t)
                  : e[e.length - 1].length > 0 && e.push([]);
              }),
              v(t[0]) && e[e.length - 1].push(t[0]),
              e[e.length - 1].length <= 0 && (e = e.slice(0, -1)),
              e
            );
          },
          b = function (t, e) {
            var r = m(t);
            e &&
              (r = [
                r.reduce(function (t, e) {
                  return [].concat(d(t), d(e));
                }, []),
              ]);
            var n = r
              .map(function (t) {
                return t.reduce(function (t, e, r) {
                  return ""
                    .concat(t)
                    .concat(0 === r ? "M" : "L")
                    .concat(e.x, ",")
                    .concat(e.y);
                }, "");
              })
              .join("");
            return 1 === r.length ? "".concat(n, "Z") : n;
          },
          g = function (t, e, r) {
            var n = b(t, r);
            return ""
              .concat("Z" === n.slice(-1) ? n.slice(0, -1) : n, "L")
              .concat(b(e.reverse(), r).slice(1));
          },
          x = function (t) {
            var e = t.points,
              r = t.className,
              n = t.baseLinePoints,
              i = t.connectNulls,
              a = (function (t, e) {
                if (null == t) return {};
                var r,
                  n,
                  i = (function (t, e) {
                    if (null == t) return {};
                    var r = {};
                    for (var n in t)
                      if (Object.prototype.hasOwnProperty.call(t, n)) {
                        if (e.indexOf(n) >= 0) continue;
                        r[n] = t[n];
                      }
                    return r;
                  })(t, e);
                if (Object.getOwnPropertySymbols) {
                  var o = Object.getOwnPropertySymbols(t);
                  for (n = 0; n < o.length; n++)
                    (r = o[n]),
                      !(e.indexOf(r) >= 0) &&
                        Object.prototype.propertyIsEnumerable.call(t, r) &&
                        (i[r] = t[r]);
                }
                return i;
              })(t, p);
            if (!e || !e.length) return null;
            var c = (0, u.A)("recharts-polygon", r);
            if (n && n.length) {
              var s = a.stroke && "none" !== a.stroke,
                l = g(e, n, i);
              return o().createElement(
                "g",
                { className: c },
                o().createElement(
                  "path",
                  h({}, (0, f.J9)(a, !0), {
                    fill: "Z" === l.slice(-1) ? a.fill : "none",
                    stroke: "none",
                    d: l,
                  }),
                ),
                s
                  ? o().createElement(
                      "path",
                      h({}, (0, f.J9)(a, !0), { fill: "none", d: b(e, i) }),
                    )
                  : null,
                s
                  ? o().createElement(
                      "path",
                      h({}, (0, f.J9)(a, !0), { fill: "none", d: b(n, i) }),
                    )
                  : null,
              );
            }
            var d = b(e, i);
            return o().createElement(
              "path",
              h({}, (0, f.J9)(a, !0), {
                fill: "Z" === d.slice(-1) ? a.fill : "none",
                className: c,
                d: d,
              }),
            );
          },
          w = r(6265),
          O = r(10621),
          j = r(76987);
        function S(t) {
          return (S =
            "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
              ? function (t) {
                  return typeof t;
                }
              : function (t) {
                  return t &&
                    "function" == typeof Symbol &&
                    t.constructor === Symbol &&
                    t !== Symbol.prototype
                    ? "symbol"
                    : typeof t;
                })(t);
        }
        function A() {
          return (A = Object.assign
            ? Object.assign.bind()
            : function (t) {
                for (var e = 1; e < arguments.length; e++) {
                  var r = arguments[e];
                  for (var n in r)
                    Object.prototype.hasOwnProperty.call(r, n) && (t[n] = r[n]);
                }
                return t;
              }).apply(this, arguments);
        }
        function P(t, e) {
          var r = Object.keys(t);
          if (Object.getOwnPropertySymbols) {
            var n = Object.getOwnPropertySymbols(t);
            e &&
              (n = n.filter(function (e) {
                return Object.getOwnPropertyDescriptor(t, e).enumerable;
              })),
              r.push.apply(r, n);
          }
          return r;
        }
        function E(t) {
          for (var e = 1; e < arguments.length; e++) {
            var r = null != arguments[e] ? arguments[e] : {};
            e % 2
              ? P(Object(r), !0).forEach(function (e) {
                  C(t, e, r[e]);
                })
              : Object.getOwnPropertyDescriptors
                ? Object.defineProperties(
                    t,
                    Object.getOwnPropertyDescriptors(r),
                  )
                : P(Object(r)).forEach(function (e) {
                    Object.defineProperty(
                      t,
                      e,
                      Object.getOwnPropertyDescriptor(r, e),
                    );
                  });
          }
          return t;
        }
        function k(t, e) {
          for (var r = 0; r < e.length; r++) {
            var n = e[r];
            (n.enumerable = n.enumerable || !1),
              (n.configurable = !0),
              "value" in n && (n.writable = !0),
              Object.defineProperty(t, N(n.key), n);
          }
        }
        function _() {
          try {
            var t = !Boolean.prototype.valueOf.call(
              Reflect.construct(Boolean, [], function () {}),
            );
          } catch (t) {}
          return (_ = function () {
            return !!t;
          })();
        }
        function M(t) {
          return (M = Object.setPrototypeOf
            ? Object.getPrototypeOf.bind()
            : function (t) {
                return t.__proto__ || Object.getPrototypeOf(t);
              })(t);
        }
        function T(t, e) {
          return (T = Object.setPrototypeOf
            ? Object.setPrototypeOf.bind()
            : function (t, e) {
                return (t.__proto__ = e), t;
              })(t, e);
        }
        function C(t, e, r) {
          return (
            (e = N(e)) in t
              ? Object.defineProperty(t, e, {
                  value: r,
                  enumerable: !0,
                  configurable: !0,
                  writable: !0,
                })
              : (t[e] = r),
            t
          );
        }
        function N(t) {
          var e = (function (t, e) {
            if ("object" != S(t) || !t) return t;
            var r = t[Symbol.toPrimitive];
            if (void 0 !== r) {
              var n = r.call(t, e || "default");
              if ("object" != S(n)) return n;
              throw TypeError("@@toPrimitive must return a primitive value.");
            }
            return ("string" === e ? String : Number)(t);
          })(t, "string");
          return "symbol" == S(e) ? e : e + "";
        }
        var I = Math.PI / 180,
          D = (function (t) {
            var e, r;
            function n() {
              var t, e;
              if (!(this instanceof n))
                throw TypeError("Cannot call a class as a function");
              return (
                (t = n),
                (e = arguments),
                (t = M(t)),
                (function (t, e) {
                  if (e && ("object" === S(e) || "function" == typeof e))
                    return e;
                  if (void 0 !== e)
                    throw TypeError(
                      "Derived constructors may only return object or undefined",
                    );
                  var r = t;
                  if (void 0 === r)
                    throw ReferenceError(
                      "this hasn't been initialised - super() hasn't been called",
                    );
                  return r;
                })(
                  this,
                  _()
                    ? Reflect.construct(t, e || [], M(this).constructor)
                    : t.apply(this, e),
                )
              );
            }
            if ("function" != typeof t && null !== t)
              throw TypeError(
                "Super expression must either be null or a function",
              );
            return (
              (n.prototype = Object.create(t && t.prototype, {
                constructor: { value: n, writable: !0, configurable: !0 },
              })),
              Object.defineProperty(n, "prototype", { writable: !1 }),
              t && T(n, t),
              (e = [
                {
                  key: "getTickLineCoord",
                  value: function (t) {
                    var e = this.props,
                      r = e.cx,
                      n = e.cy,
                      i = e.radius,
                      o = e.orientation,
                      a = e.tickSize,
                      c = (0, j.IZ)(r, n, i, t.coordinate),
                      u = (0, j.IZ)(
                        r,
                        n,
                        i + ("inner" === o ? -1 : 1) * (a || 8),
                        t.coordinate,
                      );
                    return { x1: c.x, y1: c.y, x2: u.x, y2: u.y };
                  },
                },
                {
                  key: "getTickTextAnchor",
                  value: function (t) {
                    var e = this.props.orientation,
                      r = Math.cos(-t.coordinate * I);
                    return r > 1e-5
                      ? "outer" === e
                        ? "start"
                        : "end"
                      : r < -1e-5
                        ? "outer" === e
                          ? "end"
                          : "start"
                        : "middle";
                  },
                },
                {
                  key: "renderAxisLine",
                  value: function () {
                    var t = this.props,
                      e = t.cx,
                      r = t.cy,
                      n = t.radius,
                      i = t.axisLine,
                      a = t.axisLineType,
                      c = E(
                        E({}, (0, f.J9)(this.props, !1)),
                        {},
                        { fill: "none" },
                        (0, f.J9)(i, !1),
                      );
                    if ("circle" === a)
                      return o().createElement(
                        l.c,
                        A({ className: "recharts-polar-angle-axis-line" }, c, {
                          cx: e,
                          cy: r,
                          r: n,
                        }),
                      );
                    var u = this.props.ticks.map(function (t) {
                      return (0, j.IZ)(e, r, n, t.coordinate);
                    });
                    return o().createElement(
                      x,
                      A({ className: "recharts-polar-angle-axis-line" }, c, {
                        points: u,
                      }),
                    );
                  },
                },
                {
                  key: "renderTicks",
                  value: function () {
                    var t = this,
                      e = this.props,
                      r = e.ticks,
                      i = e.tick,
                      a = e.tickLine,
                      c = e.tickFormatter,
                      l = e.stroke,
                      p = (0, f.J9)(this.props, !1),
                      h = (0, f.J9)(i, !1),
                      d = E(E({}, p), {}, { fill: "none" }, (0, f.J9)(a, !1)),
                      y = r.map(function (e, r) {
                        var f = t.getTickLineCoord(e),
                          y = E(
                            E(
                              E({ textAnchor: t.getTickTextAnchor(e) }, p),
                              {},
                              { stroke: "none", fill: l },
                              h,
                            ),
                            {},
                            { index: r, payload: e, x: f.x2, y: f.y2 },
                          );
                        return o().createElement(
                          s.W,
                          A(
                            {
                              className: (0, u.A)(
                                "recharts-polar-angle-axis-tick",
                                (0, j.Zk)(i),
                              ),
                              key: "tick-".concat(e.coordinate),
                            },
                            (0, O.XC)(t.props, e, r),
                          ),
                          a &&
                            o().createElement(
                              "line",
                              A(
                                {
                                  className:
                                    "recharts-polar-angle-axis-tick-line",
                                },
                                d,
                                f,
                              ),
                            ),
                          i &&
                            n.renderTickItem(i, y, c ? c(e.value, r) : e.value),
                        );
                      });
                    return o().createElement(
                      s.W,
                      { className: "recharts-polar-angle-axis-ticks" },
                      y,
                    );
                  },
                },
                {
                  key: "render",
                  value: function () {
                    var t = this.props,
                      e = t.ticks,
                      r = t.radius,
                      n = t.axisLine;
                    return !(r <= 0) && e && e.length
                      ? o().createElement(
                          s.W,
                          {
                            className: (0, u.A)(
                              "recharts-polar-angle-axis",
                              this.props.className,
                            ),
                          },
                          n && this.renderAxisLine(),
                          this.renderTicks(),
                        )
                      : null;
                  },
                },
              ]),
              (r = [
                {
                  key: "renderTickItem",
                  value: function (t, e, r) {
                    var n;
                    return o().isValidElement(t)
                      ? o().cloneElement(t, e)
                      : c()(t)
                        ? t(e)
                        : o().createElement(
                            w.E,
                            A({}, e, {
                              className: "recharts-polar-angle-axis-tick-value",
                            }),
                            r,
                          );
                  },
                },
              ]),
              e && k(n.prototype, e),
              r && k(n, r),
              Object.defineProperty(n, "prototype", { writable: !1 }),
              n
            );
          })(i.PureComponent);
        C(D, "displayName", "PolarAngleAxis"),
          C(D, "axisType", "angleAxis"),
          C(D, "defaultProps", {
            type: "category",
            angleAxisId: 0,
            scale: "auto",
            cx: 0,
            cy: 0,
            orientation: "outer",
            axisLine: !0,
            tickLine: !0,
            tickSize: 8,
            tick: !0,
            hide: !1,
            allowDuplicatedCategory: !0,
          });
        var B = r(74689),
          R = r.n(B),
          L = r(67839),
          z = r.n(L),
          U = r(79669),
          F = ["cx", "cy", "angle", "ticks", "axisLine"],
          q = ["ticks", "tick", "angle", "tickFormatter", "stroke"];
        function $(t) {
          return ($ =
            "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
              ? function (t) {
                  return typeof t;
                }
              : function (t) {
                  return t &&
                    "function" == typeof Symbol &&
                    t.constructor === Symbol &&
                    t !== Symbol.prototype
                    ? "symbol"
                    : typeof t;
                })(t);
        }
        function W() {
          return (W = Object.assign
            ? Object.assign.bind()
            : function (t) {
                for (var e = 1; e < arguments.length; e++) {
                  var r = arguments[e];
                  for (var n in r)
                    Object.prototype.hasOwnProperty.call(r, n) && (t[n] = r[n]);
                }
                return t;
              }).apply(this, arguments);
        }
        function X(t, e) {
          var r = Object.keys(t);
          if (Object.getOwnPropertySymbols) {
            var n = Object.getOwnPropertySymbols(t);
            e &&
              (n = n.filter(function (e) {
                return Object.getOwnPropertyDescriptor(t, e).enumerable;
              })),
              r.push.apply(r, n);
          }
          return r;
        }
        function H(t) {
          for (var e = 1; e < arguments.length; e++) {
            var r = null != arguments[e] ? arguments[e] : {};
            e % 2
              ? X(Object(r), !0).forEach(function (e) {
                  Z(t, e, r[e]);
                })
              : Object.getOwnPropertyDescriptors
                ? Object.defineProperties(
                    t,
                    Object.getOwnPropertyDescriptors(r),
                  )
                : X(Object(r)).forEach(function (e) {
                    Object.defineProperty(
                      t,
                      e,
                      Object.getOwnPropertyDescriptor(r, e),
                    );
                  });
          }
          return t;
        }
        function V(t, e) {
          if (null == t) return {};
          var r,
            n,
            i = (function (t, e) {
              if (null == t) return {};
              var r = {};
              for (var n in t)
                if (Object.prototype.hasOwnProperty.call(t, n)) {
                  if (e.indexOf(n) >= 0) continue;
                  r[n] = t[n];
                }
              return r;
            })(t, e);
          if (Object.getOwnPropertySymbols) {
            var o = Object.getOwnPropertySymbols(t);
            for (n = 0; n < o.length; n++)
              (r = o[n]),
                !(e.indexOf(r) >= 0) &&
                  Object.prototype.propertyIsEnumerable.call(t, r) &&
                  (i[r] = t[r]);
          }
          return i;
        }
        function K(t, e) {
          for (var r = 0; r < e.length; r++) {
            var n = e[r];
            (n.enumerable = n.enumerable || !1),
              (n.configurable = !0),
              "value" in n && (n.writable = !0),
              Object.defineProperty(t, Q(n.key), n);
          }
        }
        function G() {
          try {
            var t = !Boolean.prototype.valueOf.call(
              Reflect.construct(Boolean, [], function () {}),
            );
          } catch (t) {}
          return (G = function () {
            return !!t;
          })();
        }
        function J(t) {
          return (J = Object.setPrototypeOf
            ? Object.getPrototypeOf.bind()
            : function (t) {
                return t.__proto__ || Object.getPrototypeOf(t);
              })(t);
        }
        function Y(t, e) {
          return (Y = Object.setPrototypeOf
            ? Object.setPrototypeOf.bind()
            : function (t, e) {
                return (t.__proto__ = e), t;
              })(t, e);
        }
        function Z(t, e, r) {
          return (
            (e = Q(e)) in t
              ? Object.defineProperty(t, e, {
                  value: r,
                  enumerable: !0,
                  configurable: !0,
                  writable: !0,
                })
              : (t[e] = r),
            t
          );
        }
        function Q(t) {
          var e = (function (t, e) {
            if ("object" != $(t) || !t) return t;
            var r = t[Symbol.toPrimitive];
            if (void 0 !== r) {
              var n = r.call(t, e || "default");
              if ("object" != $(n)) return n;
              throw TypeError("@@toPrimitive must return a primitive value.");
            }
            return ("string" === e ? String : Number)(t);
          })(t, "string");
          return "symbol" == $(e) ? e : e + "";
        }
        var tt = (function (t) {
          var e, r;
          function n() {
            var t, e;
            if (!(this instanceof n))
              throw TypeError("Cannot call a class as a function");
            return (
              (t = n),
              (e = arguments),
              (t = J(t)),
              (function (t, e) {
                if (e && ("object" === $(e) || "function" == typeof e))
                  return e;
                if (void 0 !== e)
                  throw TypeError(
                    "Derived constructors may only return object or undefined",
                  );
                var r = t;
                if (void 0 === r)
                  throw ReferenceError(
                    "this hasn't been initialised - super() hasn't been called",
                  );
                return r;
              })(
                this,
                G()
                  ? Reflect.construct(t, e || [], J(this).constructor)
                  : t.apply(this, e),
              )
            );
          }
          if ("function" != typeof t && null !== t)
            throw TypeError(
              "Super expression must either be null or a function",
            );
          return (
            (n.prototype = Object.create(t && t.prototype, {
              constructor: { value: n, writable: !0, configurable: !0 },
            })),
            Object.defineProperty(n, "prototype", { writable: !1 }),
            t && Y(n, t),
            (e = [
              {
                key: "getTickValueCoord",
                value: function (t) {
                  var e = t.coordinate,
                    r = this.props,
                    n = r.angle,
                    i = r.cx,
                    o = r.cy;
                  return (0, j.IZ)(i, o, e, n);
                },
              },
              {
                key: "getTickTextAnchor",
                value: function () {
                  var t;
                  switch (this.props.orientation) {
                    case "left":
                      t = "end";
                      break;
                    case "right":
                      t = "start";
                      break;
                    default:
                      t = "middle";
                  }
                  return t;
                },
              },
              {
                key: "getViewBox",
                value: function () {
                  var t = this.props,
                    e = t.cx,
                    r = t.cy,
                    n = t.angle,
                    i = t.ticks,
                    o = R()(i, function (t) {
                      return t.coordinate || 0;
                    });
                  return {
                    cx: e,
                    cy: r,
                    startAngle: n,
                    endAngle: n,
                    innerRadius:
                      z()(i, function (t) {
                        return t.coordinate || 0;
                      }).coordinate || 0,
                    outerRadius: o.coordinate || 0,
                  };
                },
              },
              {
                key: "renderAxisLine",
                value: function () {
                  var t = this.props,
                    e = t.cx,
                    r = t.cy,
                    n = t.angle,
                    i = t.ticks,
                    a = t.axisLine,
                    c = V(t, F),
                    u = i.reduce(
                      function (t, e) {
                        return [
                          Math.min(t[0], e.coordinate),
                          Math.max(t[1], e.coordinate),
                        ];
                      },
                      [1 / 0, -1 / 0],
                    ),
                    s = (0, j.IZ)(e, r, u[0], n),
                    l = (0, j.IZ)(e, r, u[1], n),
                    p = H(
                      H(
                        H({}, (0, f.J9)(c, !1)),
                        {},
                        { fill: "none" },
                        (0, f.J9)(a, !1),
                      ),
                      {},
                      { x1: s.x, y1: s.y, x2: l.x, y2: l.y },
                    );
                  return o().createElement(
                    "line",
                    W({ className: "recharts-polar-radius-axis-line" }, p),
                  );
                },
              },
              {
                key: "renderTicks",
                value: function () {
                  var t = this,
                    e = this.props,
                    r = e.ticks,
                    i = e.tick,
                    a = e.angle,
                    c = e.tickFormatter,
                    l = e.stroke,
                    p = V(e, q),
                    h = this.getTickTextAnchor(),
                    d = (0, f.J9)(p, !1),
                    y = (0, f.J9)(i, !1),
                    v = r.map(function (e, r) {
                      var f = t.getTickValueCoord(e),
                        p = H(
                          H(
                            H(
                              H(
                                {
                                  textAnchor: h,
                                  transform: "rotate("
                                    .concat(90 - a, ", ")
                                    .concat(f.x, ", ")
                                    .concat(f.y, ")"),
                                },
                                d,
                              ),
                              {},
                              { stroke: "none", fill: l },
                              y,
                            ),
                            {},
                            { index: r },
                            f,
                          ),
                          {},
                          { payload: e },
                        );
                      return o().createElement(
                        s.W,
                        W(
                          {
                            className: (0, u.A)(
                              "recharts-polar-radius-axis-tick",
                              (0, j.Zk)(i),
                            ),
                            key: "tick-".concat(e.coordinate),
                          },
                          (0, O.XC)(t.props, e, r),
                        ),
                        n.renderTickItem(i, p, c ? c(e.value, r) : e.value),
                      );
                    });
                  return o().createElement(
                    s.W,
                    { className: "recharts-polar-radius-axis-ticks" },
                    v,
                  );
                },
              },
              {
                key: "render",
                value: function () {
                  var t = this.props,
                    e = t.ticks,
                    r = t.axisLine,
                    n = t.tick;
                  return e && e.length
                    ? o().createElement(
                        s.W,
                        {
                          className: (0, u.A)(
                            "recharts-polar-radius-axis",
                            this.props.className,
                          ),
                        },
                        r && this.renderAxisLine(),
                        n && this.renderTicks(),
                        U.J.renderCallByParent(this.props, this.getViewBox()),
                      )
                    : null;
                },
              },
            ]),
            (r = [
              {
                key: "renderTickItem",
                value: function (t, e, r) {
                  var n;
                  return o().isValidElement(t)
                    ? o().cloneElement(t, e)
                    : c()(t)
                      ? t(e)
                      : o().createElement(
                          w.E,
                          W({}, e, {
                            className: "recharts-polar-radius-axis-tick-value",
                          }),
                          r,
                        );
                },
              },
            ]),
            e && K(n.prototype, e),
            r && K(n, r),
            Object.defineProperty(n, "prototype", { writable: !1 }),
            n
          );
        })(i.PureComponent);
        Z(tt, "displayName", "PolarRadiusAxis"),
          Z(tt, "axisType", "radiusAxis"),
          Z(tt, "defaultProps", {
            type: "number",
            radiusAxisId: 0,
            cx: 0,
            cy: 0,
            angle: 0,
            orientation: "right",
            stroke: "#ccc",
            axisLine: !0,
            tick: !0,
            tickCount: 5,
            allowDataOverflow: !1,
            scale: "auto",
            allowDuplicatedCategory: !0,
          });
        var te = r(3490),
          tr = (0, n.gu)({
            chartName: "PieChart",
            GraphicalChild: te.F,
            validateTooltipEventTypes: ["item"],
            defaultTooltipEventType: "item",
            legendContent: "children",
            axisComponents: [
              { axisType: "angleAxis", AxisComp: D },
              { axisType: "radiusAxis", AxisComp: tt },
            ],
            formatAxisMap: j.pr,
            defaultProps: {
              layout: "centric",
              startAngle: 0,
              endAngle: 360,
              cx: "50%",
              cy: "50%",
              innerRadius: 0,
              outerRadius: "80%",
            },
          });
      },
      39326: (t) => {
        "use strict";
        t.exports = function (t, e) {
          return t < e;
        };
      },
      39643: (t, e, r) => {
        "use strict";
        r.d(e, { m: () => $ });
        var n = r(84205),
          i = r.n(n),
          o = r(60897),
          a = r.n(o),
          c = r(58929),
          u = r.n(c),
          s = r(79029),
          l = r(61481);
        function f(t) {
          return (f =
            "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
              ? function (t) {
                  return typeof t;
                }
              : function (t) {
                  return t &&
                    "function" == typeof Symbol &&
                    t.constructor === Symbol &&
                    t !== Symbol.prototype
                    ? "symbol"
                    : typeof t;
                })(t);
        }
        function p() {
          return (p = Object.assign
            ? Object.assign.bind()
            : function (t) {
                for (var e = 1; e < arguments.length; e++) {
                  var r = arguments[e];
                  for (var n in r)
                    Object.prototype.hasOwnProperty.call(r, n) && (t[n] = r[n]);
                }
                return t;
              }).apply(this, arguments);
        }
        function h(t, e) {
          (null == e || e > t.length) && (e = t.length);
          for (var r = 0, n = Array(e); r < e; r++) n[r] = t[r];
          return n;
        }
        function d(t, e) {
          var r = Object.keys(t);
          if (Object.getOwnPropertySymbols) {
            var n = Object.getOwnPropertySymbols(t);
            e &&
              (n = n.filter(function (e) {
                return Object.getOwnPropertyDescriptor(t, e).enumerable;
              })),
              r.push.apply(r, n);
          }
          return r;
        }
        function y(t) {
          for (var e = 1; e < arguments.length; e++) {
            var r = null != arguments[e] ? arguments[e] : {};
            e % 2
              ? d(Object(r), !0).forEach(function (e) {
                  var n, i, o;
                  (n = t),
                    (i = e),
                    (o = r[e]),
                    (i = (function (t) {
                      var e = (function (t, e) {
                        if ("object" != f(t) || !t) return t;
                        var r = t[Symbol.toPrimitive];
                        if (void 0 !== r) {
                          var n = r.call(t, e || "default");
                          if ("object" != f(n)) return n;
                          throw TypeError(
                            "@@toPrimitive must return a primitive value.",
                          );
                        }
                        return ("string" === e ? String : Number)(t);
                      })(t, "string");
                      return "symbol" == f(e) ? e : e + "";
                    })(i)) in n
                      ? Object.defineProperty(n, i, {
                          value: o,
                          enumerable: !0,
                          configurable: !0,
                          writable: !0,
                        })
                      : (n[i] = o);
                })
              : Object.getOwnPropertyDescriptors
                ? Object.defineProperties(
                    t,
                    Object.getOwnPropertyDescriptors(r),
                  )
                : d(Object(r)).forEach(function (e) {
                    Object.defineProperty(
                      t,
                      e,
                      Object.getOwnPropertyDescriptor(r, e),
                    );
                  });
          }
          return t;
        }
        function v(t) {
          return Array.isArray(t) && (0, l.vh)(t[0]) && (0, l.vh)(t[1])
            ? t.join(" ~ ")
            : t;
        }
        var m = function (t) {
          var e = t.separator,
            r = void 0 === e ? " : " : e,
            n = t.contentStyle,
            o = t.itemStyle,
            c = void 0 === o ? {} : o,
            f = t.labelStyle,
            d = t.payload,
            m = t.formatter,
            b = t.itemSorter,
            g = t.wrapperClassName,
            x = t.labelClassName,
            w = t.label,
            O = t.labelFormatter,
            j = t.accessibilityLayer,
            S = y(
              {
                margin: 0,
                padding: 10,
                backgroundColor: "#fff",
                border: "1px solid #ccc",
                whiteSpace: "nowrap",
              },
              void 0 === n ? {} : n,
            ),
            A = y({ margin: 0 }, void 0 === f ? {} : f),
            P = !u()(w),
            E = P ? w : "",
            k = (0, s.A)("recharts-default-tooltip", g),
            _ = (0, s.A)("recharts-tooltip-label", x);
          return (
            P && O && null != d && (E = O(w, d)),
            i().createElement(
              "div",
              p(
                { className: k, style: S },
                void 0 !== j && j
                  ? { role: "status", "aria-live": "assertive" }
                  : {},
              ),
              i().createElement(
                "p",
                { className: _, style: A },
                i().isValidElement(E) ? E : "".concat(E),
              ),
              (function () {
                if (d && d.length) {
                  var t = (b ? a()(d, b) : d).map(function (t, e) {
                    if ("none" === t.type) return null;
                    var n = y(
                        {
                          display: "block",
                          paddingTop: 4,
                          paddingBottom: 4,
                          color: t.color || "#000",
                        },
                        c,
                      ),
                      o = t.formatter || m || v,
                      a = t.value,
                      u = t.name,
                      s = a,
                      f = u;
                    if (o && null != s && null != f) {
                      var p = o(a, u, t, e, d);
                      if (Array.isArray(p)) {
                        var b =
                          (function (t) {
                            if (Array.isArray(t)) return t;
                          })(p) ||
                          (function (t, e) {
                            var r =
                              null == t
                                ? null
                                : ("undefined" != typeof Symbol &&
                                    t[Symbol.iterator]) ||
                                  t["@@iterator"];
                            if (null != r) {
                              var n,
                                i,
                                o,
                                a,
                                c = [],
                                u = !0,
                                s = !1;
                              try {
                                (o = (r = r.call(t)).next), !1;
                                for (
                                  ;
                                  !(u = (n = o.call(r)).done) &&
                                  (c.push(n.value), c.length !== e);
                                  u = !0
                                );
                              } catch (t) {
                                (s = !0), (i = t);
                              } finally {
                                try {
                                  if (
                                    !u &&
                                    null != r.return &&
                                    ((a = r.return()), Object(a) !== a)
                                  )
                                    return;
                                } finally {
                                  if (s) throw i;
                                }
                              }
                              return c;
                            }
                          })(p, 2) ||
                          (function (t, e) {
                            if (t) {
                              if ("string" == typeof t) return h(t, 2);
                              var r = Object.prototype.toString
                                .call(t)
                                .slice(8, -1);
                              if (
                                ("Object" === r &&
                                  t.constructor &&
                                  (r = t.constructor.name),
                                "Map" === r || "Set" === r)
                              )
                                return Array.from(t);
                              if (
                                "Arguments" === r ||
                                /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(
                                  r,
                                )
                              )
                                return h(t, e);
                            }
                          })(p, 2) ||
                          (function () {
                            throw TypeError(
                              "Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.",
                            );
                          })();
                        (s = b[0]), (f = b[1]);
                      } else s = p;
                    }
                    return i().createElement(
                      "li",
                      {
                        className: "recharts-tooltip-item",
                        key: "tooltip-item-".concat(e),
                        style: n,
                      },
                      (0, l.vh)(f)
                        ? i().createElement(
                            "span",
                            { className: "recharts-tooltip-item-name" },
                            f,
                          )
                        : null,
                      (0, l.vh)(f)
                        ? i().createElement(
                            "span",
                            { className: "recharts-tooltip-item-separator" },
                            r,
                          )
                        : null,
                      i().createElement(
                        "span",
                        { className: "recharts-tooltip-item-value" },
                        s,
                      ),
                      i().createElement(
                        "span",
                        { className: "recharts-tooltip-item-unit" },
                        t.unit || "",
                      ),
                    );
                  });
                  return i().createElement(
                    "ul",
                    {
                      className: "recharts-tooltip-item-list",
                      style: { padding: 0, margin: 0 },
                    },
                    t,
                  );
                }
                return null;
              })(),
            )
          );
        };
        function b(t) {
          return (b =
            "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
              ? function (t) {
                  return typeof t;
                }
              : function (t) {
                  return t &&
                    "function" == typeof Symbol &&
                    t.constructor === Symbol &&
                    t !== Symbol.prototype
                    ? "symbol"
                    : typeof t;
                })(t);
        }
        function g(t, e, r) {
          var n;
          return (
            ((n = (function (t, e) {
              if ("object" != b(t) || !t) return t;
              var r = t[Symbol.toPrimitive];
              if (void 0 !== r) {
                var n = r.call(t, e || "default");
                if ("object" != b(n)) return n;
                throw TypeError("@@toPrimitive must return a primitive value.");
              }
              return ("string" === e ? String : Number)(t);
            })(e, "string")),
            (e = "symbol" == b(n) ? n : n + "") in t)
              ? Object.defineProperty(t, e, {
                  value: r,
                  enumerable: !0,
                  configurable: !0,
                  writable: !0,
                })
              : (t[e] = r),
            t
          );
        }
        var x = "recharts-tooltip-wrapper",
          w = { visibility: "hidden" };
        function O(t) {
          var e = t.allowEscapeViewBox,
            r = t.coordinate,
            n = t.key,
            i = t.offsetTopLeft,
            o = t.position,
            a = t.reverseDirection,
            c = t.tooltipDimension,
            u = t.viewBox,
            s = t.viewBoxDimension;
          if (o && (0, l.Et)(o[n])) return o[n];
          var f = r[n] - c - i,
            p = r[n] + i;
          return e[n]
            ? a[n]
              ? f
              : p
            : a[n]
              ? f < u[n]
                ? Math.max(p, u[n])
                : Math.max(f, u[n])
              : p + c > u[n] + s
                ? Math.max(f, u[n])
                : Math.max(p, u[n]);
        }
        function j(t) {
          return (j =
            "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
              ? function (t) {
                  return typeof t;
                }
              : function (t) {
                  return t &&
                    "function" == typeof Symbol &&
                    t.constructor === Symbol &&
                    t !== Symbol.prototype
                    ? "symbol"
                    : typeof t;
                })(t);
        }
        function S(t, e) {
          var r = Object.keys(t);
          if (Object.getOwnPropertySymbols) {
            var n = Object.getOwnPropertySymbols(t);
            e &&
              (n = n.filter(function (e) {
                return Object.getOwnPropertyDescriptor(t, e).enumerable;
              })),
              r.push.apply(r, n);
          }
          return r;
        }
        function A(t) {
          for (var e = 1; e < arguments.length; e++) {
            var r = null != arguments[e] ? arguments[e] : {};
            e % 2
              ? S(Object(r), !0).forEach(function (e) {
                  _(t, e, r[e]);
                })
              : Object.getOwnPropertyDescriptors
                ? Object.defineProperties(
                    t,
                    Object.getOwnPropertyDescriptors(r),
                  )
                : S(Object(r)).forEach(function (e) {
                    Object.defineProperty(
                      t,
                      e,
                      Object.getOwnPropertyDescriptor(r, e),
                    );
                  });
          }
          return t;
        }
        function P() {
          try {
            var t = !Boolean.prototype.valueOf.call(
              Reflect.construct(Boolean, [], function () {}),
            );
          } catch (t) {}
          return (P = function () {
            return !!t;
          })();
        }
        function E(t) {
          return (E = Object.setPrototypeOf
            ? Object.getPrototypeOf.bind()
            : function (t) {
                return t.__proto__ || Object.getPrototypeOf(t);
              })(t);
        }
        function k(t, e) {
          return (k = Object.setPrototypeOf
            ? Object.setPrototypeOf.bind()
            : function (t, e) {
                return (t.__proto__ = e), t;
              })(t, e);
        }
        function _(t, e, r) {
          return (
            (e = M(e)) in t
              ? Object.defineProperty(t, e, {
                  value: r,
                  enumerable: !0,
                  configurable: !0,
                  writable: !0,
                })
              : (t[e] = r),
            t
          );
        }
        function M(t) {
          var e = (function (t, e) {
            if ("object" != j(t) || !t) return t;
            var r = t[Symbol.toPrimitive];
            if (void 0 !== r) {
              var n = r.call(t, e || "default");
              if ("object" != j(n)) return n;
              throw TypeError("@@toPrimitive must return a primitive value.");
            }
            return ("string" === e ? String : Number)(t);
          })(t, "string");
          return "symbol" == j(e) ? e : e + "";
        }
        var T = (function (t) {
            var e;
            function r() {
              var t, e, n;
              if (!(this instanceof r))
                throw TypeError("Cannot call a class as a function");
              for (var i = arguments.length, o = Array(i), a = 0; a < i; a++)
                o[a] = arguments[a];
              return (
                (e = r),
                (n = [].concat(o)),
                (e = E(e)),
                _(
                  (t = (function (t, e) {
                    if (e && ("object" === j(e) || "function" == typeof e))
                      return e;
                    if (void 0 !== e)
                      throw TypeError(
                        "Derived constructors may only return object or undefined",
                      );
                    var r = t;
                    if (void 0 === r)
                      throw ReferenceError(
                        "this hasn't been initialised - super() hasn't been called",
                      );
                    return r;
                  })(
                    this,
                    P()
                      ? Reflect.construct(e, n || [], E(this).constructor)
                      : e.apply(this, n),
                  )),
                  "state",
                  {
                    dismissed: !1,
                    dismissedAtCoordinate: { x: 0, y: 0 },
                    lastBoundingBox: { width: -1, height: -1 },
                  },
                ),
                _(t, "handleKeyDown", function (e) {
                  if ("Escape" === e.key) {
                    var r, n, i, o;
                    t.setState({
                      dismissed: !0,
                      dismissedAtCoordinate: {
                        x:
                          null !=
                          (r = null == (n = t.props.coordinate) ? void 0 : n.x)
                            ? r
                            : 0,
                        y:
                          null !=
                          (i = null == (o = t.props.coordinate) ? void 0 : o.y)
                            ? i
                            : 0,
                      },
                    });
                  }
                }),
                t
              );
            }
            if ("function" != typeof t && null !== t)
              throw TypeError(
                "Super expression must either be null or a function",
              );
            return (
              (r.prototype = Object.create(t && t.prototype, {
                constructor: { value: r, writable: !0, configurable: !0 },
              })),
              Object.defineProperty(r, "prototype", { writable: !1 }),
              t && k(r, t),
              (e = [
                {
                  key: "updateBBox",
                  value: function () {
                    if (
                      this.wrapperNode &&
                      this.wrapperNode.getBoundingClientRect
                    ) {
                      var t = this.wrapperNode.getBoundingClientRect();
                      (Math.abs(t.width - this.state.lastBoundingBox.width) >
                        1 ||
                        Math.abs(t.height - this.state.lastBoundingBox.height) >
                          1) &&
                        this.setState({
                          lastBoundingBox: { width: t.width, height: t.height },
                        });
                    } else
                      (-1 !== this.state.lastBoundingBox.width ||
                        -1 !== this.state.lastBoundingBox.height) &&
                        this.setState({
                          lastBoundingBox: { width: -1, height: -1 },
                        });
                  },
                },
                {
                  key: "componentDidMount",
                  value: function () {
                    document.addEventListener("keydown", this.handleKeyDown),
                      this.updateBBox();
                  },
                },
                {
                  key: "componentWillUnmount",
                  value: function () {
                    document.removeEventListener("keydown", this.handleKeyDown);
                  },
                },
                {
                  key: "componentDidUpdate",
                  value: function () {
                    var t, e;
                    this.props.active && this.updateBBox(),
                      this.state.dismissed &&
                        ((null == (t = this.props.coordinate)
                          ? void 0
                          : t.x) !== this.state.dismissedAtCoordinate.x ||
                          (null == (e = this.props.coordinate)
                            ? void 0
                            : e.y) !== this.state.dismissedAtCoordinate.y) &&
                        (this.state.dismissed = !1);
                  },
                },
                {
                  key: "render",
                  value: function () {
                    var t,
                      e,
                      r,
                      n,
                      o,
                      a,
                      c,
                      u,
                      f,
                      p,
                      h,
                      d,
                      y,
                      v,
                      m,
                      b,
                      j,
                      S,
                      P,
                      E = this,
                      k = this.props,
                      _ = k.active,
                      M = k.allowEscapeViewBox,
                      T = k.animationDuration,
                      C = k.animationEasing,
                      N = k.children,
                      I = k.coordinate,
                      D = k.hasPayload,
                      B = k.isAnimationActive,
                      R = k.offset,
                      L = k.position,
                      z = k.reverseDirection,
                      U = k.useTranslate3d,
                      F = k.viewBox,
                      q = k.wrapperStyle,
                      $ =
                        ((d = (t = {
                          allowEscapeViewBox: M,
                          coordinate: I,
                          offsetTopLeft: R,
                          position: L,
                          reverseDirection: z,
                          tooltipBox: this.state.lastBoundingBox,
                          useTranslate3d: U,
                          viewBox: F,
                        }).allowEscapeViewBox),
                        (y = t.coordinate),
                        (v = t.offsetTopLeft),
                        (m = t.position),
                        (b = t.reverseDirection),
                        (j = t.tooltipBox),
                        (S = t.useTranslate3d),
                        (P = t.viewBox),
                        j.height > 0 && j.width > 0 && y
                          ? ((r = (e = {
                              translateX: (p = O({
                                allowEscapeViewBox: d,
                                coordinate: y,
                                key: "x",
                                offsetTopLeft: v,
                                position: m,
                                reverseDirection: b,
                                tooltipDimension: j.width,
                                viewBox: P,
                                viewBoxDimension: P.width,
                              })),
                              translateY: (h = O({
                                allowEscapeViewBox: d,
                                coordinate: y,
                                key: "y",
                                offsetTopLeft: v,
                                position: m,
                                reverseDirection: b,
                                tooltipDimension: j.height,
                                viewBox: P,
                                viewBoxDimension: P.height,
                              })),
                              useTranslate3d: S,
                            }).translateX),
                            (n = e.translateY),
                            (f = {
                              transform: e.useTranslate3d
                                ? "translate3d("
                                    .concat(r, "px, ")
                                    .concat(n, "px, 0)")
                                : "translate("
                                    .concat(r, "px, ")
                                    .concat(n, "px)"),
                            }))
                          : (f = w),
                        {
                          cssProperties: f,
                          cssClasses:
                            ((a = (o = {
                              translateX: p,
                              translateY: h,
                              coordinate: y,
                            }).coordinate),
                            (c = o.translateX),
                            (u = o.translateY),
                            (0, s.A)(
                              x,
                              g(
                                g(
                                  g(
                                    g(
                                      {},
                                      "".concat(x, "-right"),
                                      (0, l.Et)(c) &&
                                        a &&
                                        (0, l.Et)(a.x) &&
                                        c >= a.x,
                                    ),
                                    "".concat(x, "-left"),
                                    (0, l.Et)(c) &&
                                      a &&
                                      (0, l.Et)(a.x) &&
                                      c < a.x,
                                  ),
                                  "".concat(x, "-bottom"),
                                  (0, l.Et)(u) &&
                                    a &&
                                    (0, l.Et)(a.y) &&
                                    u >= a.y,
                                ),
                                "".concat(x, "-top"),
                                (0, l.Et)(u) && a && (0, l.Et)(a.y) && u < a.y,
                              ),
                            )),
                        }),
                      W = $.cssClasses,
                      X = $.cssProperties,
                      H = A(
                        A(
                          {
                            transition:
                              B && _
                                ? "transform ".concat(T, "ms ").concat(C)
                                : void 0,
                          },
                          X,
                        ),
                        {},
                        {
                          pointerEvents: "none",
                          visibility:
                            !this.state.dismissed && _ && D
                              ? "visible"
                              : "hidden",
                          position: "absolute",
                          top: 0,
                          left: 0,
                        },
                        q,
                      );
                    return i().createElement(
                      "div",
                      {
                        tabIndex: -1,
                        className: W,
                        style: H,
                        ref: function (t) {
                          E.wrapperNode = t;
                        },
                      },
                      N,
                    );
                  },
                },
              ]),
              (function (t, e) {
                for (var r = 0; r < e.length; r++) {
                  var n = e[r];
                  (n.enumerable = n.enumerable || !1),
                    (n.configurable = !0),
                    "value" in n && (n.writable = !0),
                    Object.defineProperty(t, M(n.key), n);
                }
              })(r.prototype, e),
              Object.defineProperty(r, "prototype", { writable: !1 }),
              r
            );
          })(n.PureComponent),
          C = r(44729),
          N = r(52272);
        function I(t) {
          return (I =
            "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
              ? function (t) {
                  return typeof t;
                }
              : function (t) {
                  return t &&
                    "function" == typeof Symbol &&
                    t.constructor === Symbol &&
                    t !== Symbol.prototype
                    ? "symbol"
                    : typeof t;
                })(t);
        }
        function D(t, e) {
          var r = Object.keys(t);
          if (Object.getOwnPropertySymbols) {
            var n = Object.getOwnPropertySymbols(t);
            e &&
              (n = n.filter(function (e) {
                return Object.getOwnPropertyDescriptor(t, e).enumerable;
              })),
              r.push.apply(r, n);
          }
          return r;
        }
        function B(t) {
          for (var e = 1; e < arguments.length; e++) {
            var r = null != arguments[e] ? arguments[e] : {};
            e % 2
              ? D(Object(r), !0).forEach(function (e) {
                  U(t, e, r[e]);
                })
              : Object.getOwnPropertyDescriptors
                ? Object.defineProperties(
                    t,
                    Object.getOwnPropertyDescriptors(r),
                  )
                : D(Object(r)).forEach(function (e) {
                    Object.defineProperty(
                      t,
                      e,
                      Object.getOwnPropertyDescriptor(r, e),
                    );
                  });
          }
          return t;
        }
        function R() {
          try {
            var t = !Boolean.prototype.valueOf.call(
              Reflect.construct(Boolean, [], function () {}),
            );
          } catch (t) {}
          return (R = function () {
            return !!t;
          })();
        }
        function L(t) {
          return (L = Object.setPrototypeOf
            ? Object.getPrototypeOf.bind()
            : function (t) {
                return t.__proto__ || Object.getPrototypeOf(t);
              })(t);
        }
        function z(t, e) {
          return (z = Object.setPrototypeOf
            ? Object.setPrototypeOf.bind()
            : function (t, e) {
                return (t.__proto__ = e), t;
              })(t, e);
        }
        function U(t, e, r) {
          return (
            (e = F(e)) in t
              ? Object.defineProperty(t, e, {
                  value: r,
                  enumerable: !0,
                  configurable: !0,
                  writable: !0,
                })
              : (t[e] = r),
            t
          );
        }
        function F(t) {
          var e = (function (t, e) {
            if ("object" != I(t) || !t) return t;
            var r = t[Symbol.toPrimitive];
            if (void 0 !== r) {
              var n = r.call(t, e || "default");
              if ("object" != I(n)) return n;
              throw TypeError("@@toPrimitive must return a primitive value.");
            }
            return ("string" === e ? String : Number)(t);
          })(t, "string");
          return "symbol" == I(e) ? e : e + "";
        }
        function q(t) {
          return t.dataKey;
        }
        var $ = (function (t) {
          var e;
          function r() {
            var t, e;
            if (!(this instanceof r))
              throw TypeError("Cannot call a class as a function");
            return (
              (t = r),
              (e = arguments),
              (t = L(t)),
              (function (t, e) {
                if (e && ("object" === I(e) || "function" == typeof e))
                  return e;
                if (void 0 !== e)
                  throw TypeError(
                    "Derived constructors may only return object or undefined",
                  );
                var r = t;
                if (void 0 === r)
                  throw ReferenceError(
                    "this hasn't been initialised - super() hasn't been called",
                  );
                return r;
              })(
                this,
                R()
                  ? Reflect.construct(t, e || [], L(this).constructor)
                  : t.apply(this, e),
              )
            );
          }
          if ("function" != typeof t && null !== t)
            throw TypeError(
              "Super expression must either be null or a function",
            );
          return (
            (r.prototype = Object.create(t && t.prototype, {
              constructor: { value: r, writable: !0, configurable: !0 },
            })),
            Object.defineProperty(r, "prototype", { writable: !1 }),
            t && z(r, t),
            (e = [
              {
                key: "render",
                value: function () {
                  var t,
                    e = this,
                    r = this.props,
                    n = r.active,
                    o = r.allowEscapeViewBox,
                    a = r.animationDuration,
                    c = r.animationEasing,
                    u = r.content,
                    s = r.coordinate,
                    l = r.filterNull,
                    f = r.isAnimationActive,
                    p = r.offset,
                    h = r.payload,
                    d = r.payloadUniqBy,
                    y = r.position,
                    v = r.reverseDirection,
                    b = r.useTranslate3d,
                    g = r.viewBox,
                    x = r.wrapperStyle,
                    w = null != h ? h : [];
                  l &&
                    w.length &&
                    (w = (0, N.s)(
                      h.filter(function (t) {
                        return (
                          null != t.value &&
                          (!0 !== t.hide || e.props.includeHidden)
                        );
                      }),
                      d,
                      q,
                    ));
                  var O = w.length > 0;
                  return i().createElement(
                    T,
                    {
                      allowEscapeViewBox: o,
                      animationDuration: a,
                      animationEasing: c,
                      isAnimationActive: f,
                      active: n,
                      coordinate: s,
                      hasPayload: O,
                      offset: p,
                      position: y,
                      reverseDirection: v,
                      useTranslate3d: b,
                      viewBox: g,
                      wrapperStyle: x,
                    },
                    ((t = B(B({}, this.props), {}, { payload: w })),
                    i().isValidElement(u)
                      ? i().cloneElement(u, t)
                      : "function" == typeof u
                        ? i().createElement(u, t)
                        : i().createElement(m, t)),
                  );
                },
              },
            ]),
            (function (t, e) {
              for (var r = 0; r < e.length; r++) {
                var n = e[r];
                (n.enumerable = n.enumerable || !1),
                  (n.configurable = !0),
                  "value" in n && (n.writable = !0),
                  Object.defineProperty(t, F(n.key), n);
              }
            })(r.prototype, e),
            Object.defineProperty(r, "prototype", { writable: !1 }),
            r
          );
        })(n.PureComponent);
        U($, "displayName", "Tooltip"),
          U($, "defaultProps", {
            accessibilityLayer: !1,
            allowEscapeViewBox: { x: !1, y: !1 },
            animationDuration: 400,
            animationEasing: "ease",
            contentStyle: {},
            coordinate: { x: 0, y: 0 },
            cursor: !0,
            cursorStyle: {},
            filterNull: !0,
            isAnimationActive: !C.m.isSsr,
            itemStyle: {},
            labelStyle: {},
            offset: 10,
            reverseDirection: { x: !1, y: !1 },
            separator: " : ",
            trigger: "hover",
            useTranslate3d: !1,
            viewBox: { x: 0, y: 0, height: 0, width: 0 },
            wrapperStyle: {},
          });
      },
      39822: (t, e, r) => {
        "use strict";
        var n = r(99554);
        t.exports = function (t) {
          var e = n(t, function (t) {
              return 500 === r.size && r.clear(), t;
            }),
            r = e.cache;
          return e;
        };
      },
      40671: (t, e, r) => {
        "use strict";
        var n = r(56634),
          i = "object" == typeof self && self && self.Object === Object && self;
        t.exports = n || i || Function("return this")();
      },
      40703: (t, e, r) => {
        "use strict";
        r.d(e, { g: () => s });
        var n = r(93224),
          i = r(75243),
          o = r(18862);
        function a(t) {
          return (a =
            "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
              ? function (t) {
                  return typeof t;
                }
              : function (t) {
                  return t &&
                    "function" == typeof Symbol &&
                    t.constructor === Symbol &&
                    t !== Symbol.prototype
                    ? "symbol"
                    : typeof t;
                })(t);
        }
        function c(t, e) {
          var r = Object.keys(t);
          if (Object.getOwnPropertySymbols) {
            var n = Object.getOwnPropertySymbols(t);
            e &&
              (n = n.filter(function (e) {
                return Object.getOwnPropertyDescriptor(t, e).enumerable;
              })),
              r.push.apply(r, n);
          }
          return r;
        }
        function u(t) {
          for (var e = 1; e < arguments.length; e++) {
            var r = null != arguments[e] ? arguments[e] : {};
            e % 2
              ? c(Object(r), !0).forEach(function (e) {
                  var n, i, o;
                  (n = t),
                    (i = e),
                    (o = r[e]),
                    (i = (function (t) {
                      var e = (function (t, e) {
                        if ("object" != a(t) || !t) return t;
                        var r = t[Symbol.toPrimitive];
                        if (void 0 !== r) {
                          var n = r.call(t, e || "default");
                          if ("object" != a(n)) return n;
                          throw TypeError(
                            "@@toPrimitive must return a primitive value.",
                          );
                        }
                        return ("string" === e ? String : Number)(t);
                      })(t, "string");
                      return "symbol" == a(e) ? e : e + "";
                    })(i)) in n
                      ? Object.defineProperty(n, i, {
                          value: o,
                          enumerable: !0,
                          configurable: !0,
                          writable: !0,
                        })
                      : (n[i] = o);
                })
              : Object.getOwnPropertyDescriptors
                ? Object.defineProperties(
                    t,
                    Object.getOwnPropertyDescriptors(r),
                  )
                : c(Object(r)).forEach(function (e) {
                    Object.defineProperty(
                      t,
                      e,
                      Object.getOwnPropertyDescriptor(r, e),
                    );
                  });
          }
          return t;
        }
        var s = function (t) {
          var e,
            r = t.children,
            a = t.formattedGraphicalItems,
            c = t.legendWidth,
            s = t.legendContent,
            l = (0, o.BU)(r, n.s);
          if (!l) return null;
          var f = n.s.defaultProps,
            p = void 0 !== f ? u(u({}, f), l.props) : {};
          return (
            (e =
              l.props && l.props.payload
                ? l.props && l.props.payload
                : "children" === s
                  ? (a || []).reduce(function (t, e) {
                      var r = e.item,
                        n = e.props,
                        i = n.sectors || n.data || [];
                      return t.concat(
                        i.map(function (t) {
                          return {
                            type: l.props.iconType || r.props.legendType,
                            value: t.name,
                            color: t.fill,
                            payload: t,
                          };
                        }),
                      );
                    }, [])
                  : (a || []).map(function (t) {
                      var e = t.item,
                        r = e.type.defaultProps,
                        n = void 0 !== r ? u(u({}, r), e.props) : {},
                        o = n.dataKey,
                        a = n.name,
                        c = n.legendType;
                      return {
                        inactive: n.hide,
                        dataKey: o,
                        type: p.iconType || c || "square",
                        color: (0, i.Ps)(e),
                        value: a || o,
                        payload: n,
                      };
                    })),
            u(u(u({}, p), n.s.getWithHeight(l, c)), {}, { payload: e, item: l })
          );
        };
      },
      41692: (t) => {
        "use strict";
        t.exports = require("node:tls");
      },
      42103: (t, e, r) => {
        "use strict";
        r.d(e, { h: () => m });
        var n = r(84205),
          i = r.n(n),
          o = r(79029),
          a = r(18862),
          c = r(76987),
          u = r(61481);
        function s(t) {
          return (s =
            "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
              ? function (t) {
                  return typeof t;
                }
              : function (t) {
                  return t &&
                    "function" == typeof Symbol &&
                    t.constructor === Symbol &&
                    t !== Symbol.prototype
                    ? "symbol"
                    : typeof t;
                })(t);
        }
        function l() {
          return (l = Object.assign
            ? Object.assign.bind()
            : function (t) {
                for (var e = 1; e < arguments.length; e++) {
                  var r = arguments[e];
                  for (var n in r)
                    Object.prototype.hasOwnProperty.call(r, n) && (t[n] = r[n]);
                }
                return t;
              }).apply(this, arguments);
        }
        function f(t, e) {
          var r = Object.keys(t);
          if (Object.getOwnPropertySymbols) {
            var n = Object.getOwnPropertySymbols(t);
            e &&
              (n = n.filter(function (e) {
                return Object.getOwnPropertyDescriptor(t, e).enumerable;
              })),
              r.push.apply(r, n);
          }
          return r;
        }
        function p(t) {
          for (var e = 1; e < arguments.length; e++) {
            var r = null != arguments[e] ? arguments[e] : {};
            e % 2
              ? f(Object(r), !0).forEach(function (e) {
                  var n, i, o;
                  (n = t),
                    (i = e),
                    (o = r[e]),
                    (i = (function (t) {
                      var e = (function (t, e) {
                        if ("object" != s(t) || !t) return t;
                        var r = t[Symbol.toPrimitive];
                        if (void 0 !== r) {
                          var n = r.call(t, e || "default");
                          if ("object" != s(n)) return n;
                          throw TypeError(
                            "@@toPrimitive must return a primitive value.",
                          );
                        }
                        return ("string" === e ? String : Number)(t);
                      })(t, "string");
                      return "symbol" == s(e) ? e : e + "";
                    })(i)) in n
                      ? Object.defineProperty(n, i, {
                          value: o,
                          enumerable: !0,
                          configurable: !0,
                          writable: !0,
                        })
                      : (n[i] = o);
                })
              : Object.getOwnPropertyDescriptors
                ? Object.defineProperties(
                    t,
                    Object.getOwnPropertyDescriptors(r),
                  )
                : f(Object(r)).forEach(function (e) {
                    Object.defineProperty(
                      t,
                      e,
                      Object.getOwnPropertyDescriptor(r, e),
                    );
                  });
          }
          return t;
        }
        var h = function (t) {
            var e = t.cx,
              r = t.cy,
              n = t.radius,
              i = t.angle,
              o = t.sign,
              a = t.isExternal,
              u = t.cornerRadius,
              s = t.cornerIsExternal,
              l = u * (a ? 1 : -1) + n,
              f = Math.asin(u / l) / c.Kg,
              p = s ? i : i + o * f;
            return {
              center: (0, c.IZ)(e, r, l, p),
              circleTangency: (0, c.IZ)(e, r, n, p),
              lineTangency: (0, c.IZ)(
                e,
                r,
                l * Math.cos(f * c.Kg),
                s ? i - o * f : i,
              ),
              theta: f,
            };
          },
          d = function (t) {
            var e = t.cx,
              r = t.cy,
              n = t.innerRadius,
              i = t.outerRadius,
              o = t.startAngle,
              a = t.endAngle,
              s = (0, u.sA)(a - o) * Math.min(Math.abs(a - o), 359.999),
              l = o + s,
              f = (0, c.IZ)(e, r, i, o),
              p = (0, c.IZ)(e, r, i, l),
              h = "M "
                .concat(f.x, ",")
                .concat(f.y, "\n    A ")
                .concat(i, ",")
                .concat(i, ",0,\n    ")
                .concat(+(Math.abs(s) > 180), ",")
                .concat(+(o > l), ",\n    ")
                .concat(p.x, ",")
                .concat(p.y, "\n  ");
            if (n > 0) {
              var d = (0, c.IZ)(e, r, n, o),
                y = (0, c.IZ)(e, r, n, l);
              h += "L "
                .concat(y.x, ",")
                .concat(y.y, "\n            A ")
                .concat(n, ",")
                .concat(n, ",0,\n            ")
                .concat(+(Math.abs(s) > 180), ",")
                .concat(+(o <= l), ",\n            ")
                .concat(d.x, ",")
                .concat(d.y, " Z");
            } else h += "L ".concat(e, ",").concat(r, " Z");
            return h;
          },
          y = function (t) {
            var e = t.cx,
              r = t.cy,
              n = t.innerRadius,
              i = t.outerRadius,
              o = t.cornerRadius,
              a = t.forceCornerRadius,
              c = t.cornerIsExternal,
              s = t.startAngle,
              l = t.endAngle,
              f = (0, u.sA)(l - s),
              p = h({
                cx: e,
                cy: r,
                radius: i,
                angle: s,
                sign: f,
                cornerRadius: o,
                cornerIsExternal: c,
              }),
              y = p.circleTangency,
              v = p.lineTangency,
              m = p.theta,
              b = h({
                cx: e,
                cy: r,
                radius: i,
                angle: l,
                sign: -f,
                cornerRadius: o,
                cornerIsExternal: c,
              }),
              g = b.circleTangency,
              x = b.lineTangency,
              w = b.theta,
              O = c ? Math.abs(s - l) : Math.abs(s - l) - m - w;
            if (O < 0)
              return a
                ? "M "
                    .concat(v.x, ",")
                    .concat(v.y, "\n        a")
                    .concat(o, ",")
                    .concat(o, ",0,0,1,")
                    .concat(2 * o, ",0\n        a")
                    .concat(o, ",")
                    .concat(o, ",0,0,1,")
                    .concat(-(2 * o), ",0\n      ")
                : d({
                    cx: e,
                    cy: r,
                    innerRadius: n,
                    outerRadius: i,
                    startAngle: s,
                    endAngle: l,
                  });
            var j = "M "
              .concat(v.x, ",")
              .concat(v.y, "\n    A")
              .concat(o, ",")
              .concat(o, ",0,0,")
              .concat(+(f < 0), ",")
              .concat(y.x, ",")
              .concat(y.y, "\n    A")
              .concat(i, ",")
              .concat(i, ",0,")
              .concat(+(O > 180), ",")
              .concat(+(f < 0), ",")
              .concat(g.x, ",")
              .concat(g.y, "\n    A")
              .concat(o, ",")
              .concat(o, ",0,0,")
              .concat(+(f < 0), ",")
              .concat(x.x, ",")
              .concat(x.y, "\n  ");
            if (n > 0) {
              var S = h({
                  cx: e,
                  cy: r,
                  radius: n,
                  angle: s,
                  sign: f,
                  isExternal: !0,
                  cornerRadius: o,
                  cornerIsExternal: c,
                }),
                A = S.circleTangency,
                P = S.lineTangency,
                E = S.theta,
                k = h({
                  cx: e,
                  cy: r,
                  radius: n,
                  angle: l,
                  sign: -f,
                  isExternal: !0,
                  cornerRadius: o,
                  cornerIsExternal: c,
                }),
                _ = k.circleTangency,
                M = k.lineTangency,
                T = k.theta,
                C = c ? Math.abs(s - l) : Math.abs(s - l) - E - T;
              if (C < 0 && 0 === o)
                return "".concat(j, "L").concat(e, ",").concat(r, "Z");
              j += "L"
                .concat(M.x, ",")
                .concat(M.y, "\n      A")
                .concat(o, ",")
                .concat(o, ",0,0,")
                .concat(+(f < 0), ",")
                .concat(_.x, ",")
                .concat(_.y, "\n      A")
                .concat(n, ",")
                .concat(n, ",0,")
                .concat(+(C > 180), ",")
                .concat(+(f > 0), ",")
                .concat(A.x, ",")
                .concat(A.y, "\n      A")
                .concat(o, ",")
                .concat(o, ",0,0,")
                .concat(+(f < 0), ",")
                .concat(P.x, ",")
                .concat(P.y, "Z");
            } else j += "L".concat(e, ",").concat(r, "Z");
            return j;
          },
          v = {
            cx: 0,
            cy: 0,
            innerRadius: 0,
            outerRadius: 0,
            startAngle: 0,
            endAngle: 0,
            cornerRadius: 0,
            forceCornerRadius: !1,
            cornerIsExternal: !1,
          },
          m = function (t) {
            var e,
              r = p(p({}, v), t),
              n = r.cx,
              c = r.cy,
              s = r.innerRadius,
              f = r.outerRadius,
              h = r.cornerRadius,
              m = r.forceCornerRadius,
              b = r.cornerIsExternal,
              g = r.startAngle,
              x = r.endAngle,
              w = r.className;
            if (f < s || g === x) return null;
            var O = (0, o.A)("recharts-sector", w),
              j = f - s,
              S = (0, u.F4)(h, j, 0, !0);
            return (
              (e =
                S > 0 && 360 > Math.abs(g - x)
                  ? y({
                      cx: n,
                      cy: c,
                      innerRadius: s,
                      outerRadius: f,
                      cornerRadius: Math.min(S, j / 2),
                      forceCornerRadius: m,
                      cornerIsExternal: b,
                      startAngle: g,
                      endAngle: x,
                    })
                  : d({
                      cx: n,
                      cy: c,
                      innerRadius: s,
                      outerRadius: f,
                      startAngle: g,
                      endAngle: x,
                    })),
              i().createElement(
                "path",
                l({}, (0, a.J9)(r, !0), { className: O, d: e, role: "img" }),
              )
            );
          };
      },
      42824: (t, e, r) => {
        "use strict";
        t.exports = r(91656)(r(74231));
      },
      43960: (t, e, r) => {
        "use strict";
        var n = r(45849),
          i = r(31030);
        t.exports = function (t, e) {
          var r = i(t, e);
          return n(r) ? r : void 0;
        };
      },
      44034: (t, e, r) => {
        "use strict";
        var n = r(28017),
          i = r(64508);
        t.exports = function (t) {
          return !0 === t || !1 === t || (i(t) && "[object Boolean]" == n(t));
        };
      },
      44074: (t, e, r) => {
        "use strict";
        var n = r(33965),
          i = r(39326),
          o = r(11730);
        t.exports = function (t) {
          return t && t.length ? n(t, o, i) : void 0;
        };
      },
      44549: (t, e, r) => {
        "use strict";
        r.d(e, { E: () => u });
        var n = r(29392),
          i = r(86594),
          o = r(31135),
          a = r(37676),
          c = r(88225),
          u = (0, n.gu)({
            chartName: "BarChart",
            GraphicalChild: i.y,
            defaultTooltipEventType: "axis",
            validateTooltipEventTypes: ["axis", "item"],
            axisComponents: [
              { axisType: "xAxis", AxisComp: o.W },
              { axisType: "yAxis", AxisComp: a.h },
            ],
            formatAxisMap: c.pr,
          });
      },
      44708: (t) => {
        "use strict";
        t.exports = require("node:https");
      },
      44729: (t, e, r) => {
        "use strict";
        r.d(e, { m: () => n });
        var n = {
          isSsr: !0,
          get: function (t) {
            return n[t];
          },
          set: function (t, e) {
            if ("string" == typeof t) n[t] = e;
            else {
              var r = Object.keys(t);
              r &&
                r.length &&
                r.forEach(function (e) {
                  n[e] = t[e];
                });
            }
          },
        };
      },
      45008: (t, e, r) => {
        "use strict";
        var n = r(28017),
          i = r(64508);
        t.exports = function (t) {
          return i(t) && "[object Arguments]" == n(t);
        };
      },
      45131: (t, e, r) => {
        "use strict";
        var n = r(24570),
          i = r(77488),
          o = r(47703),
          a = r(1643),
          c = r(49875);
        function u(t) {
          var e = -1,
            r = null == t ? 0 : t.length;
          for (this.clear(); ++e < r; ) {
            var n = t[e];
            this.set(n[0], n[1]);
          }
        }
        (u.prototype.clear = n),
          (u.prototype.delete = i),
          (u.prototype.get = o),
          (u.prototype.has = a),
          (u.prototype.set = c),
          (t.exports = u);
      },
      45141: (t) => {
        "use strict";
        t.exports = function () {
          return !1;
        };
      },
      45849: (t, e, r) => {
        "use strict";
        var n = r(4276),
          i = r(6962),
          o = r(95311),
          a = r(18955),
          c = /^\[object .+?Constructor\]$/,
          u = Object.prototype,
          s = Function.prototype.toString,
          l = u.hasOwnProperty,
          f = RegExp(
            "^" +
              s
                .call(l)
                .replace(/[\\^$.*+?()[\]{}|]/g, "\\$&")
                .replace(
                  /hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,
                  "$1.*?",
                ) +
              "$",
          );
        t.exports = function (t) {
          return !(!o(t) || i(t)) && (n(t) ? f : c).test(a(t));
        };
      },
      46096: (t) => {
        "use strict";
        t.exports = function (t) {
          var e = null == t ? 0 : t.length;
          return e ? t[e - 1] : void 0;
        };
      },
      46403: (t, e, r) => {
        "use strict";
        var n = r(8316),
          i = Object.prototype.hasOwnProperty;
        t.exports = function (t) {
          var e = this.__data__;
          if (n) {
            var r = e[t];
            return "__lodash_hash_undefined__" === r ? void 0 : r;
          }
          return i.call(e, t) ? e[t] : void 0;
        };
      },
      46951: (t) => {
        "use strict";
        t.exports = function (t, e) {
          var r = t.length;
          for (t.sort(e); r--; ) t[r] = t[r].value;
          return t;
        };
      },
      47091: (t, e, r) => {
        "use strict";
        t.exports = r(40671)["__core-js_shared__"];
      },
      47703: (t, e, r) => {
        "use strict";
        var n = r(38785);
        t.exports = function (t) {
          return n(this, t).get(t);
        };
      },
      48161: (t) => {
        "use strict";
        t.exports = require("node:os");
      },
      48352: (t, e, r) => {
        "use strict";
        var n = r(27871),
          i = r(50458),
          o = r(83855),
          a = r(72459),
          c = r(90236),
          u = r(6359);
        t.exports = function (t, e, r) {
          e = n(e, t);
          for (var s = -1, l = e.length, f = !1; ++s < l; ) {
            var p = u(e[s]);
            if (!(f = null != t && r(t, p))) break;
            t = t[p];
          }
          return f || ++s != l
            ? f
            : !!(l = null == t ? 0 : t.length) &&
                c(l) &&
                a(p, l) &&
                (o(t) || i(t));
        };
      },
      49875: (t, e, r) => {
        "use strict";
        var n = r(38785);
        t.exports = function (t, e) {
          var r = n(this, t),
            i = r.size;
          return r.set(t, e), (this.size += +(r.size != i)), this;
        };
      },
      49905: (t) => {
        "use strict";
        t.exports = function (t, e) {
          return t.has(e);
        };
      },
      50021: (t) => {
        "use strict";
        t.exports = function (t, e) {
          return t > e;
        };
      },
      50458: (t, e, r) => {
        "use strict";
        var n = r(45008),
          i = r(64508),
          o = Object.prototype,
          a = o.hasOwnProperty,
          c = o.propertyIsEnumerable;
        t.exports = n(
          (function () {
            return arguments;
          })(),
        )
          ? n
          : function (t) {
              return i(t) && a.call(t, "callee") && !c.call(t, "callee");
            };
      },
      50834: (t, e, r) => {
        "use strict";
        var n = r(87327),
          i = r(1281),
          o = r(52484),
          a = r(75963),
          c = r(98347),
          u = r(83855),
          s = r(6394),
          l = r(69277),
          f = "[object Arguments]",
          p = "[object Array]",
          h = "[object Object]",
          d = Object.prototype.hasOwnProperty;
        t.exports = function (t, e, r, y, v, m) {
          var b = u(t),
            g = u(e),
            x = b ? p : c(t),
            w = g ? p : c(e);
          (x = x == f ? h : x), (w = w == f ? h : w);
          var O = x == h,
            j = w == h,
            S = x == w;
          if (S && s(t)) {
            if (!s(e)) return !1;
            (b = !0), (O = !1);
          }
          if (S && !O)
            return (
              m || (m = new n()),
              b || l(t) ? i(t, e, r, y, v, m) : o(t, e, x, r, y, v, m)
            );
          if (!(1 & r)) {
            var A = O && d.call(t, "__wrapped__"),
              P = j && d.call(e, "__wrapped__");
            if (A || P) {
              var E = A ? t.value() : t,
                k = P ? e.value() : e;
              return m || (m = new n()), v(E, k, r, y, m);
            }
          }
          return !!S && (m || (m = new n()), a(t, e, r, y, v, m));
        };
      },
      50839: (t, e, r) => {
        "use strict";
        r.d(e, { A3: () => p, Pu: () => f });
        var n = r(44729);
        function i(t) {
          return (i =
            "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
              ? function (t) {
                  return typeof t;
                }
              : function (t) {
                  return t &&
                    "function" == typeof Symbol &&
                    t.constructor === Symbol &&
                    t !== Symbol.prototype
                    ? "symbol"
                    : typeof t;
                })(t);
        }
        function o(t, e) {
          var r = Object.keys(t);
          if (Object.getOwnPropertySymbols) {
            var n = Object.getOwnPropertySymbols(t);
            e &&
              (n = n.filter(function (e) {
                return Object.getOwnPropertyDescriptor(t, e).enumerable;
              })),
              r.push.apply(r, n);
          }
          return r;
        }
        function a(t) {
          for (var e = 1; e < arguments.length; e++) {
            var r = null != arguments[e] ? arguments[e] : {};
            e % 2
              ? o(Object(r), !0).forEach(function (e) {
                  var n, o, a;
                  (n = t),
                    (o = e),
                    (a = r[e]),
                    (o = (function (t) {
                      var e = (function (t, e) {
                        if ("object" != i(t) || !t) return t;
                        var r = t[Symbol.toPrimitive];
                        if (void 0 !== r) {
                          var n = r.call(t, e || "default");
                          if ("object" != i(n)) return n;
                          throw TypeError(
                            "@@toPrimitive must return a primitive value.",
                          );
                        }
                        return ("string" === e ? String : Number)(t);
                      })(t, "string");
                      return "symbol" == i(e) ? e : e + "";
                    })(o)) in n
                      ? Object.defineProperty(n, o, {
                          value: a,
                          enumerable: !0,
                          configurable: !0,
                          writable: !0,
                        })
                      : (n[o] = a);
                })
              : Object.getOwnPropertyDescriptors
                ? Object.defineProperties(
                    t,
                    Object.getOwnPropertyDescriptors(r),
                  )
                : o(Object(r)).forEach(function (e) {
                    Object.defineProperty(
                      t,
                      e,
                      Object.getOwnPropertyDescriptor(r, e),
                    );
                  });
          }
          return t;
        }
        function c(t, e) {
          (null == e || e > t.length) && (e = t.length);
          for (var r = 0, n = Array(e); r < e; r++) n[r] = t[r];
          return n;
        }
        var u = { widthCache: {}, cacheCount: 0 },
          s = {
            position: "absolute",
            top: "-20000px",
            left: 0,
            padding: 0,
            margin: 0,
            border: "none",
            whiteSpace: "pre",
          },
          l = "recharts_measurement_span",
          f = function (t) {
            var e,
              r =
                arguments.length > 1 && void 0 !== arguments[1]
                  ? arguments[1]
                  : {};
            if (null == t || n.m.isSsr) return { width: 0, height: 0 };
            var i =
                (Object.keys((e = a({}, r))).forEach(function (t) {
                  e[t] || delete e[t];
                }),
                e),
              o = JSON.stringify({ text: t, copyStyle: i });
            if (u.widthCache[o]) return u.widthCache[o];
            try {
              var c = document.getElementById(l);
              c ||
                ((c = document.createElement("span")).setAttribute("id", l),
                c.setAttribute("aria-hidden", "true"),
                document.body.appendChild(c));
              var f = a(a({}, s), i);
              Object.assign(c.style, f), (c.textContent = "".concat(t));
              var p = c.getBoundingClientRect(),
                h = { width: p.width, height: p.height };
              return (
                (u.widthCache[o] = h),
                ++u.cacheCount > 2e3 &&
                  ((u.cacheCount = 0), (u.widthCache = {})),
                h
              );
            } catch (t) {
              return { width: 0, height: 0 };
            }
          },
          p = function (t) {
            return {
              top: t.top + window.scrollY - document.documentElement.clientTop,
              left:
                t.left + window.scrollX - document.documentElement.clientLeft,
            };
          };
      },
      51713: (t, e, r) => {
        "use strict";
        var n = r(38155),
          i = r(50458),
          o = r(83855),
          a = n ? n.isConcatSpreadable : void 0;
        t.exports = function (t) {
          return o(t) || i(t) || !!(a && t && t[a]);
        };
      },
      51758: (t) => {
        "use strict";
        t.exports = function (t, e) {
          return t === e || (t != t && e != e);
        };
      },
      52272: (t, e, r) => {
        "use strict";
        r.d(e, { s: () => c });
        var n = r(8952),
          i = r.n(n),
          o = r(4276),
          a = r.n(o);
        function c(t, e, r) {
          return !0 === e ? i()(t, r) : a()(e) ? i()(t, e) : t;
        }
      },
      52484: (t, e, r) => {
        "use strict";
        var n = r(38155),
          i = r(27030),
          o = r(51758),
          a = r(1281),
          c = r(4775),
          u = r(86017),
          s = n ? n.prototype : void 0,
          l = s ? s.valueOf : void 0;
        t.exports = function (t, e, r, n, s, f, p) {
          switch (r) {
            case "[object DataView]":
              if (t.byteLength != e.byteLength || t.byteOffset != e.byteOffset)
                break;
              (t = t.buffer), (e = e.buffer);
            case "[object ArrayBuffer]":
              if (t.byteLength != e.byteLength || !f(new i(t), new i(e))) break;
              return !0;
            case "[object Boolean]":
            case "[object Date]":
            case "[object Number]":
              return o(+t, +e);
            case "[object Error]":
              return t.name == e.name && t.message == e.message;
            case "[object RegExp]":
            case "[object String]":
              return t == e + "";
            case "[object Map]":
              var h = c;
            case "[object Set]":
              var d = 1 & n;
              if ((h || (h = u), t.size != e.size && !d)) break;
              var y = p.get(t);
              if (y) return y == e;
              (n |= 2), p.set(t, e);
              var v = a(h(t), h(e), n, s, f, p);
              return p.delete(t), v;
            case "[object Symbol]":
              if (l) return l.call(t) == l.call(e);
          }
          return !1;
        };
      },
      52975: (t) => {
        "use strict";
        t.exports = function (t) {
          return function (e) {
            return null == e ? void 0 : e[t];
          };
        };
      },
      53053: (t) => {
        "use strict";
        t.exports = require("node:diagnostics_channel");
      },
      53163: (t) => {
        "use strict";
        t.exports = function (t) {
          return function (e, r, n) {
            for (var i = -1, o = Object(e), a = n(e), c = a.length; c--; ) {
              var u = a[t ? c : ++i];
              if (!1 === r(o[u], u, o)) break;
            }
            return e;
          };
        };
      },
      53359: (t, e, r) => {
        "use strict";
        var n = r(513),
          i = r(98373),
          o = r(45131);
        t.exports = function (t, e) {
          var r = this.__data__;
          if (r instanceof n) {
            var a = r.__data__;
            if (!i || a.length < 199)
              return a.push([t, e]), (this.size = ++r.size), this;
            r = this.__data__ = new o(a);
          }
          return r.set(t, e), (this.size = r.size), this;
        };
      },
      54217: (t) => {
        "use strict";
        t.exports = function (t, e) {
          return function (r) {
            return t(e(r));
          };
        };
      },
      54368: (t) => {
        "use strict";
        t.exports = function (t) {
          return t.split("");
        };
      },
      54569: (t, e, r) => {
        "use strict";
        r.d(e, {
          yp: () => N,
          GG: () => U,
          NE: () => I,
          nZ: () => D,
          xQ: () => B,
        });
        var n = r(84205),
          i = r.n(n),
          o = r(4276),
          a = r.n(o),
          c = r(34425),
          u = r.n(c),
          s = r(44034),
          l = r.n(s),
          f = r(5642),
          p = r.n(f),
          h = r(6544),
          d = r(79029),
          y = r(7469),
          v = r(18862);
        function m(t) {
          return (m =
            "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
              ? function (t) {
                  return typeof t;
                }
              : function (t) {
                  return t &&
                    "function" == typeof Symbol &&
                    t.constructor === Symbol &&
                    t !== Symbol.prototype
                    ? "symbol"
                    : typeof t;
                })(t);
        }
        function b() {
          return (b = Object.assign
            ? Object.assign.bind()
            : function (t) {
                for (var e = 1; e < arguments.length; e++) {
                  var r = arguments[e];
                  for (var n in r)
                    Object.prototype.hasOwnProperty.call(r, n) && (t[n] = r[n]);
                }
                return t;
              }).apply(this, arguments);
        }
        function g(t, e) {
          (null == e || e > t.length) && (e = t.length);
          for (var r = 0, n = Array(e); r < e; r++) n[r] = t[r];
          return n;
        }
        function x(t, e) {
          var r = Object.keys(t);
          if (Object.getOwnPropertySymbols) {
            var n = Object.getOwnPropertySymbols(t);
            e &&
              (n = n.filter(function (e) {
                return Object.getOwnPropertyDescriptor(t, e).enumerable;
              })),
              r.push.apply(r, n);
          }
          return r;
        }
        function w(t) {
          for (var e = 1; e < arguments.length; e++) {
            var r = null != arguments[e] ? arguments[e] : {};
            e % 2
              ? x(Object(r), !0).forEach(function (e) {
                  var n, i, o;
                  (n = t),
                    (i = e),
                    (o = r[e]),
                    (i = (function (t) {
                      var e = (function (t, e) {
                        if ("object" != m(t) || !t) return t;
                        var r = t[Symbol.toPrimitive];
                        if (void 0 !== r) {
                          var n = r.call(t, e || "default");
                          if ("object" != m(n)) return n;
                          throw TypeError(
                            "@@toPrimitive must return a primitive value.",
                          );
                        }
                        return ("string" === e ? String : Number)(t);
                      })(t, "string");
                      return "symbol" == m(e) ? e : e + "";
                    })(i)) in n
                      ? Object.defineProperty(n, i, {
                          value: o,
                          enumerable: !0,
                          configurable: !0,
                          writable: !0,
                        })
                      : (n[i] = o);
                })
              : Object.getOwnPropertyDescriptors
                ? Object.defineProperties(
                    t,
                    Object.getOwnPropertyDescriptors(r),
                  )
                : x(Object(r)).forEach(function (e) {
                    Object.defineProperty(
                      t,
                      e,
                      Object.getOwnPropertyDescriptor(r, e),
                    );
                  });
          }
          return t;
        }
        var O = function (t, e, r, n, i) {
            var o,
              a = r - n;
            return (
              "M ".concat(t, ",").concat(e) +
              "L ".concat(t + r, ",").concat(e) +
              "L ".concat(t + r - a / 2, ",").concat(e + i) +
              "L ".concat(t + r - a / 2 - n, ",").concat(e + i) +
              "L ".concat(t, ",").concat(e, " Z")
            );
          },
          j = {
            x: 0,
            y: 0,
            upperWidth: 0,
            lowerWidth: 0,
            height: 0,
            isUpdateAnimationActive: !1,
            animationBegin: 0,
            animationDuration: 1500,
            animationEasing: "ease",
          },
          S = function (t) {
            var e,
              r = w(w({}, j), t),
              o = (0, n.useRef)(),
              a =
                (function (t) {
                  if (Array.isArray(t)) return t;
                })((e = (0, n.useState)(-1))) ||
                (function (t, e) {
                  var r =
                    null == t
                      ? null
                      : ("undefined" != typeof Symbol && t[Symbol.iterator]) ||
                        t["@@iterator"];
                  if (null != r) {
                    var n,
                      i,
                      o,
                      a,
                      c = [],
                      u = !0,
                      s = !1;
                    try {
                      (o = (r = r.call(t)).next), !1;
                      for (
                        ;
                        !(u = (n = o.call(r)).done) &&
                        (c.push(n.value), c.length !== e);
                        u = !0
                      );
                    } catch (t) {
                      (s = !0), (i = t);
                    } finally {
                      try {
                        if (
                          !u &&
                          null != r.return &&
                          ((a = r.return()), Object(a) !== a)
                        )
                          return;
                      } finally {
                        if (s) throw i;
                      }
                    }
                    return c;
                  }
                })(e, 2) ||
                (function (t, e) {
                  if (t) {
                    if ("string" == typeof t) return g(t, 2);
                    var r = Object.prototype.toString.call(t).slice(8, -1);
                    if (
                      ("Object" === r &&
                        t.constructor &&
                        (r = t.constructor.name),
                      "Map" === r || "Set" === r)
                    )
                      return Array.from(t);
                    if (
                      "Arguments" === r ||
                      /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)
                    )
                      return g(t, e);
                  }
                })(e, 2) ||
                (function () {
                  throw TypeError(
                    "Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.",
                  );
                })(),
              c = a[0],
              u = a[1];
            (0, n.useEffect)(function () {
              if (o.current && o.current.getTotalLength)
                try {
                  var t = o.current.getTotalLength();
                  t && u(t);
                } catch (t) {}
            }, []);
            var s = r.x,
              l = r.y,
              f = r.upperWidth,
              p = r.lowerWidth,
              h = r.height,
              m = r.className,
              x = r.animationEasing,
              S = r.animationDuration,
              A = r.animationBegin,
              P = r.isUpdateAnimationActive;
            if (
              s !== +s ||
              l !== +l ||
              f !== +f ||
              p !== +p ||
              h !== +h ||
              (0 === f && 0 === p) ||
              0 === h
            )
              return null;
            var E = (0, d.A)("recharts-trapezoid", m);
            return P
              ? i().createElement(
                  y.Ay,
                  {
                    canBegin: c > 0,
                    from: {
                      upperWidth: 0,
                      lowerWidth: 0,
                      height: h,
                      x: s,
                      y: l,
                    },
                    to: { upperWidth: f, lowerWidth: p, height: h, x: s, y: l },
                    duration: S,
                    animationEasing: x,
                    isActive: P,
                  },
                  function (t) {
                    var e = t.upperWidth,
                      n = t.lowerWidth,
                      a = t.height,
                      u = t.x,
                      s = t.y;
                    return i().createElement(
                      y.Ay,
                      {
                        canBegin: c > 0,
                        from: "0px ".concat(-1 === c ? 1 : c, "px"),
                        to: "".concat(c, "px 0px"),
                        attributeName: "strokeDasharray",
                        begin: A,
                        duration: S,
                        easing: x,
                      },
                      i().createElement(
                        "path",
                        b({}, (0, v.J9)(r, !0), {
                          className: E,
                          d: O(u, s, e, n, a),
                          ref: o,
                        }),
                      ),
                    );
                  },
                )
              : i().createElement(
                  "g",
                  null,
                  i().createElement(
                    "path",
                    b({}, (0, v.J9)(r, !0), {
                      className: E,
                      d: O(s, l, f, p, h),
                    }),
                  ),
                );
          },
          A = r(42103),
          P = r(57830),
          E = r(34831),
          k = [
            "option",
            "shapeType",
            "propTransformer",
            "activeClassName",
            "isActive",
          ];
        function _(t) {
          return (_ =
            "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
              ? function (t) {
                  return typeof t;
                }
              : function (t) {
                  return t &&
                    "function" == typeof Symbol &&
                    t.constructor === Symbol &&
                    t !== Symbol.prototype
                    ? "symbol"
                    : typeof t;
                })(t);
        }
        function M(t, e) {
          var r = Object.keys(t);
          if (Object.getOwnPropertySymbols) {
            var n = Object.getOwnPropertySymbols(t);
            e &&
              (n = n.filter(function (e) {
                return Object.getOwnPropertyDescriptor(t, e).enumerable;
              })),
              r.push.apply(r, n);
          }
          return r;
        }
        function T(t) {
          for (var e = 1; e < arguments.length; e++) {
            var r = null != arguments[e] ? arguments[e] : {};
            e % 2
              ? M(Object(r), !0).forEach(function (e) {
                  var n, i, o;
                  (n = t),
                    (i = e),
                    (o = r[e]),
                    (i = (function (t) {
                      var e = (function (t, e) {
                        if ("object" != _(t) || !t) return t;
                        var r = t[Symbol.toPrimitive];
                        if (void 0 !== r) {
                          var n = r.call(t, e || "default");
                          if ("object" != _(n)) return n;
                          throw TypeError(
                            "@@toPrimitive must return a primitive value.",
                          );
                        }
                        return ("string" === e ? String : Number)(t);
                      })(t, "string");
                      return "symbol" == _(e) ? e : e + "";
                    })(i)) in n
                      ? Object.defineProperty(n, i, {
                          value: o,
                          enumerable: !0,
                          configurable: !0,
                          writable: !0,
                        })
                      : (n[i] = o);
                })
              : Object.getOwnPropertyDescriptors
                ? Object.defineProperties(
                    t,
                    Object.getOwnPropertyDescriptors(r),
                  )
                : M(Object(r)).forEach(function (e) {
                    Object.defineProperty(
                      t,
                      e,
                      Object.getOwnPropertyDescriptor(r, e),
                    );
                  });
          }
          return t;
        }
        function C(t) {
          var e = t.shapeType,
            r = t.elementProps;
          switch (e) {
            case "rectangle":
              return i().createElement(h.M, r);
            case "trapezoid":
              return i().createElement(S, r);
            case "sector":
              return i().createElement(A.h, r);
            case "symbols":
              if ("symbols" === e) return i().createElement(E.i, r);
              break;
            default:
              return null;
          }
        }
        function N(t) {
          var e,
            r = t.option,
            o = t.shapeType,
            c = t.propTransformer,
            s = t.activeClassName,
            f = t.isActive,
            p = (function (t, e) {
              if (null == t) return {};
              var r,
                n,
                i = (function (t, e) {
                  if (null == t) return {};
                  var r = {};
                  for (var n in t)
                    if (Object.prototype.hasOwnProperty.call(t, n)) {
                      if (e.indexOf(n) >= 0) continue;
                      r[n] = t[n];
                    }
                  return r;
                })(t, e);
              if (Object.getOwnPropertySymbols) {
                var o = Object.getOwnPropertySymbols(t);
                for (n = 0; n < o.length; n++)
                  (r = o[n]),
                    !(e.indexOf(r) >= 0) &&
                      Object.prototype.propertyIsEnumerable.call(t, r) &&
                      (i[r] = t[r]);
              }
              return i;
            })(t, k);
          if ((0, n.isValidElement)(r))
            e = (0, n.cloneElement)(
              r,
              T(T({}, p), (0, n.isValidElement)(r) ? r.props : r),
            );
          else if (a()(r)) e = r(p);
          else if (u()(r) && !l()(r)) {
            var h = (
              void 0 === c
                ? function (t, e) {
                    return T(T({}, e), t);
                  }
                : c
            )(r, p);
            e = i().createElement(C, { shapeType: o, elementProps: h });
          } else e = i().createElement(C, { shapeType: o, elementProps: p });
          return f
            ? i().createElement(
                P.W,
                { className: void 0 === s ? "recharts-active-shape" : s },
                e,
              )
            : e;
        }
        function I(t, e) {
          return null != e && "trapezoids" in t.props;
        }
        function D(t, e) {
          return null != e && "sectors" in t.props;
        }
        function B(t, e) {
          return null != e && "points" in t.props;
        }
        function R(t, e) {
          var r,
            n,
            i =
              t.x ===
                (null == e || null == (r = e.labelViewBox) ? void 0 : r.x) ||
              t.x === e.x,
            o =
              t.y ===
                (null == e || null == (n = e.labelViewBox) ? void 0 : n.y) ||
              t.y === e.y;
          return i && o;
        }
        function L(t, e) {
          var r = t.endAngle === e.endAngle,
            n = t.startAngle === e.startAngle;
          return r && n;
        }
        function z(t, e) {
          var r = t.x === e.x,
            n = t.y === e.y,
            i = t.z === e.z;
          return r && n && i;
        }
        function U(t) {
          var e,
            r,
            n,
            i = t.activeTooltipItem,
            o = t.graphicalItem,
            a = t.itemData,
            c =
              (I(o, i)
                ? (e = "trapezoids")
                : D(o, i)
                  ? (e = "sectors")
                  : B(o, i) && (e = "points"),
              e),
            u = I(o, i)
              ? null == (r = i.tooltipPayload) ||
                null == (r = r[0]) ||
                null == (r = r.payload)
                ? void 0
                : r.payload
              : D(o, i)
                ? null == (n = i.tooltipPayload) ||
                  null == (n = n[0]) ||
                  null == (n = n.payload)
                  ? void 0
                  : n.payload
                : B(o, i)
                  ? i.payload
                  : {},
            s = a.filter(function (t, e) {
              var r = p()(u, t),
                n = o.props[c].filter(function (t) {
                  var e;
                  return (I(o, i)
                    ? (e = R)
                    : D(o, i)
                      ? (e = L)
                      : B(o, i) && (e = z),
                  e)(t, i);
                }),
                a = o.props[c].indexOf(n[n.length - 1]);
              return r && e === a;
            });
          return a.indexOf(s[s.length - 1]);
        }
      },
      55290: (t, e, r) => {
        "use strict";
        var n = r(19878),
          i = /^\s+/;
        t.exports = function (t) {
          return t ? t.slice(0, n(t) + 1).replace(i, "") : t;
        };
      },
      55511: (t) => {
        "use strict";
        t.exports = require("crypto");
      },
      55525: (t, e, r) => {
        "use strict";
        var n = r(37895),
          i = r(48352);
        t.exports = function (t, e) {
          return null != t && i(t, e, n);
        };
      },
      55591: (t) => {
        "use strict";
        t.exports = require("https");
      },
      56634: (t) => {
        "use strict";
        t.exports =
          "object" == typeof global &&
          global &&
          global.Object === Object &&
          global;
      },
      56830: (t, e, r) => {
        "use strict";
        t.exports = r(2773)("toUpperCase");
      },
      57026: (t, e, r) => {
        "use strict";
        t.exports = r(66110);
      },
      57075: (t) => {
        "use strict";
        t.exports = require("node:stream");
      },
      57611: (t, e, r) => {
        "use strict";
        r.d(e, { f: () => n });
        var n = function (t) {
          return null;
        };
        n.displayName = "Cell";
      },
      57680: (t, e, r) => {
        "use strict";
        var n = r(75121),
          i = r(97614),
          o = r(77404);
        t.exports = function (t) {
          return o(t) ? n(t) : i(t);
        };
      },
      57830: (t, e, r) => {
        "use strict";
        r.d(e, { W: () => s });
        var n = r(84205),
          i = r.n(n),
          o = r(79029),
          a = r(18862),
          c = ["children", "className"];
        function u() {
          return (u = Object.assign
            ? Object.assign.bind()
            : function (t) {
                for (var e = 1; e < arguments.length; e++) {
                  var r = arguments[e];
                  for (var n in r)
                    Object.prototype.hasOwnProperty.call(r, n) && (t[n] = r[n]);
                }
                return t;
              }).apply(this, arguments);
        }
        var s = i().forwardRef(function (t, e) {
          var r = t.children,
            n = t.className,
            s = (function (t, e) {
              if (null == t) return {};
              var r,
                n,
                i = (function (t, e) {
                  if (null == t) return {};
                  var r = {};
                  for (var n in t)
                    if (Object.prototype.hasOwnProperty.call(t, n)) {
                      if (e.indexOf(n) >= 0) continue;
                      r[n] = t[n];
                    }
                  return r;
                })(t, e);
              if (Object.getOwnPropertySymbols) {
                var o = Object.getOwnPropertySymbols(t);
                for (n = 0; n < o.length; n++)
                  (r = o[n]),
                    !(e.indexOf(r) >= 0) &&
                      Object.prototype.propertyIsEnumerable.call(t, r) &&
                      (i[r] = t[r]);
              }
              return i;
            })(t, c),
            l = (0, o.A)("recharts-layer", n);
          return i().createElement(
            "g",
            u({ className: l }, (0, a.J9)(s, !0), { ref: e }),
            r,
          );
        });
      },
      57975: (t) => {
        "use strict";
        t.exports = require("node:util");
      },
      58180: (t, e, r) => {
        "use strict";
        var n = r(85412);
        t.exports = function (t, e) {
          if (t !== e) {
            var r = void 0 !== t,
              i = null === t,
              o = t == t,
              a = n(t),
              c = void 0 !== e,
              u = null === e,
              s = e == e,
              l = n(e);
            if (
              (!u && !l && !a && t > e) ||
              (a && c && s && !u && !l) ||
              (i && c && s) ||
              (!r && s) ||
              !o
            )
              return 1;
            if (
              (!i && !a && !l && t < e) ||
              (l && r && o && !i && !a) ||
              (u && r && o) ||
              (!c && o) ||
              !s
            )
              return -1;
          }
          return 0;
        };
      },
      58414: (t, e, r) => {
        Promise.resolve().then(r.bind(r, 58728));
      },
      58435: (t, e, r) => {
        "use strict";
        r.d(e, { u: () => m });
        var n = r(84205),
          i = r.n(n),
          o = r(24236),
          a = r(57830),
          c = r(18862),
          u = [
            "offset",
            "layout",
            "width",
            "dataKey",
            "data",
            "dataPointFormatter",
            "xAxis",
            "yAxis",
          ];
        function s(t) {
          return (s =
            "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
              ? function (t) {
                  return typeof t;
                }
              : function (t) {
                  return t &&
                    "function" == typeof Symbol &&
                    t.constructor === Symbol &&
                    t !== Symbol.prototype
                    ? "symbol"
                    : typeof t;
                })(t);
        }
        function l() {
          return (l = Object.assign
            ? Object.assign.bind()
            : function (t) {
                for (var e = 1; e < arguments.length; e++) {
                  var r = arguments[e];
                  for (var n in r)
                    Object.prototype.hasOwnProperty.call(r, n) && (t[n] = r[n]);
                }
                return t;
              }).apply(this, arguments);
        }
        function f(t, e) {
          (null == e || e > t.length) && (e = t.length);
          for (var r = 0, n = Array(e); r < e; r++) n[r] = t[r];
          return n;
        }
        function p() {
          try {
            var t = !Boolean.prototype.valueOf.call(
              Reflect.construct(Boolean, [], function () {}),
            );
          } catch (t) {}
          return (p = function () {
            return !!t;
          })();
        }
        function h(t) {
          return (h = Object.setPrototypeOf
            ? Object.getPrototypeOf.bind()
            : function (t) {
                return t.__proto__ || Object.getPrototypeOf(t);
              })(t);
        }
        function d(t, e) {
          return (d = Object.setPrototypeOf
            ? Object.setPrototypeOf.bind()
            : function (t, e) {
                return (t.__proto__ = e), t;
              })(t, e);
        }
        function y(t, e, r) {
          return (
            (e = v(e)) in t
              ? Object.defineProperty(t, e, {
                  value: r,
                  enumerable: !0,
                  configurable: !0,
                  writable: !0,
                })
              : (t[e] = r),
            t
          );
        }
        function v(t) {
          var e = (function (t, e) {
            if ("object" != s(t) || !t) return t;
            var r = t[Symbol.toPrimitive];
            if (void 0 !== r) {
              var n = r.call(t, e || "default");
              if ("object" != s(n)) return n;
              throw TypeError("@@toPrimitive must return a primitive value.");
            }
            return ("string" === e ? String : Number)(t);
          })(t, "string");
          return "symbol" == s(e) ? e : e + "";
        }
        var m = (function (t) {
          var e;
          function r() {
            var t, e;
            if (!(this instanceof r))
              throw TypeError("Cannot call a class as a function");
            return (
              (t = r),
              (e = arguments),
              (t = h(t)),
              (function (t, e) {
                if (e && ("object" === s(e) || "function" == typeof e))
                  return e;
                if (void 0 !== e)
                  throw TypeError(
                    "Derived constructors may only return object or undefined",
                  );
                var r = t;
                if (void 0 === r)
                  throw ReferenceError(
                    "this hasn't been initialised - super() hasn't been called",
                  );
                return r;
              })(
                this,
                p()
                  ? Reflect.construct(t, e || [], h(this).constructor)
                  : t.apply(this, e),
              )
            );
          }
          if ("function" != typeof t && null !== t)
            throw TypeError(
              "Super expression must either be null or a function",
            );
          return (
            (r.prototype = Object.create(t && t.prototype, {
              constructor: { value: r, writable: !0, configurable: !0 },
            })),
            Object.defineProperty(r, "prototype", { writable: !1 }),
            t && d(r, t),
            (e = [
              {
                key: "render",
                value: function () {
                  var t = this.props,
                    e = t.offset,
                    r = t.layout,
                    n = t.width,
                    s = t.dataKey,
                    p = t.data,
                    h = t.dataPointFormatter,
                    d = t.xAxis,
                    y = t.yAxis,
                    v = (function (t, e) {
                      if (null == t) return {};
                      var r,
                        n,
                        i = (function (t, e) {
                          if (null == t) return {};
                          var r = {};
                          for (var n in t)
                            if (Object.prototype.hasOwnProperty.call(t, n)) {
                              if (e.indexOf(n) >= 0) continue;
                              r[n] = t[n];
                            }
                          return r;
                        })(t, e);
                      if (Object.getOwnPropertySymbols) {
                        var o = Object.getOwnPropertySymbols(t);
                        for (n = 0; n < o.length; n++)
                          (r = o[n]),
                            !(e.indexOf(r) >= 0) &&
                              Object.prototype.propertyIsEnumerable.call(
                                t,
                                r,
                              ) &&
                              (i[r] = t[r]);
                      }
                      return i;
                    })(t, u),
                    m = (0, c.J9)(v, !1);
                  "x" === this.props.direction &&
                    "number" !== d.type &&
                    (0, o.A)(!1);
                  var b = p.map(function (t) {
                    var o,
                      c,
                      u = h(t, s),
                      p = u.x,
                      v = u.y,
                      b = u.value,
                      g = u.errorVal;
                    if (!g) return null;
                    var x = [];
                    if (Array.isArray(g)) {
                      var w =
                        (function (t) {
                          if (Array.isArray(t)) return t;
                        })(g) ||
                        (function (t, e) {
                          var r =
                            null == t
                              ? null
                              : ("undefined" != typeof Symbol &&
                                  t[Symbol.iterator]) ||
                                t["@@iterator"];
                          if (null != r) {
                            var n,
                              i,
                              o,
                              a,
                              c = [],
                              u = !0,
                              s = !1;
                            try {
                              (o = (r = r.call(t)).next), !1;
                              for (
                                ;
                                !(u = (n = o.call(r)).done) &&
                                (c.push(n.value), c.length !== e);
                                u = !0
                              );
                            } catch (t) {
                              (s = !0), (i = t);
                            } finally {
                              try {
                                if (
                                  !u &&
                                  null != r.return &&
                                  ((a = r.return()), Object(a) !== a)
                                )
                                  return;
                              } finally {
                                if (s) throw i;
                              }
                            }
                            return c;
                          }
                        })(g, 2) ||
                        (function (t, e) {
                          if (t) {
                            if ("string" == typeof t) return f(t, 2);
                            var r = Object.prototype.toString
                              .call(t)
                              .slice(8, -1);
                            if (
                              ("Object" === r &&
                                t.constructor &&
                                (r = t.constructor.name),
                              "Map" === r || "Set" === r)
                            )
                              return Array.from(t);
                            if (
                              "Arguments" === r ||
                              /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)
                            )
                              return f(t, e);
                          }
                        })(g, 2) ||
                        (function () {
                          throw TypeError(
                            "Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.",
                          );
                        })();
                      (o = w[0]), (c = w[1]);
                    } else o = c = g;
                    if ("vertical" === r) {
                      var O = d.scale,
                        j = v + e,
                        S = j + n,
                        A = j - n,
                        P = O(b - o),
                        E = O(b + c);
                      x.push({ x1: E, y1: S, x2: E, y2: A }),
                        x.push({ x1: P, y1: j, x2: E, y2: j }),
                        x.push({ x1: P, y1: S, x2: P, y2: A });
                    } else if ("horizontal" === r) {
                      var k = y.scale,
                        _ = p + e,
                        M = _ - n,
                        T = _ + n,
                        C = k(b - o),
                        N = k(b + c);
                      x.push({ x1: M, y1: N, x2: T, y2: N }),
                        x.push({ x1: _, y1: C, x2: _, y2: N }),
                        x.push({ x1: M, y1: C, x2: T, y2: C });
                    }
                    return i().createElement(
                      a.W,
                      l(
                        {
                          className: "recharts-errorBar",
                          key: "bar-".concat(
                            x.map(function (t) {
                              return ""
                                .concat(t.x1, "-")
                                .concat(t.x2, "-")
                                .concat(t.y1, "-")
                                .concat(t.y2);
                            }),
                          ),
                        },
                        m,
                      ),
                      x.map(function (t) {
                        return i().createElement(
                          "line",
                          l({}, t, {
                            key: "line-"
                              .concat(t.x1, "-")
                              .concat(t.x2, "-")
                              .concat(t.y1, "-")
                              .concat(t.y2),
                          }),
                        );
                      }),
                    );
                  });
                  return i().createElement(
                    a.W,
                    { className: "recharts-errorBars" },
                    b,
                  );
                },
              },
            ]),
            (function (t, e) {
              for (var r = 0; r < e.length; r++) {
                var n = e[r];
                (n.enumerable = n.enumerable || !1),
                  (n.configurable = !0),
                  "value" in n && (n.writable = !0),
                  Object.defineProperty(t, v(n.key), n);
              }
            })(r.prototype, e),
            Object.defineProperty(r, "prototype", { writable: !1 }),
            r
          );
        })(i().Component);
        y(m, "defaultProps", {
          stroke: "black",
          strokeWidth: 1.5,
          width: 5,
          offset: 0,
          layout: "horizontal",
        }),
          y(m, "displayName", "ErrorBar");
      },
      58493: (t, e, r) => {
        "use strict";
        var n = r(81379);
        t.exports = function (t) {
          var e = this.__data__,
            r = n(e, t);
          return r < 0 ? void 0 : e[r][1];
        };
      },
      58728: (t, e, r) => {
        "use strict";
        let n;
        r.r(e),
          r.d(e, {
            default: () => h,
            generateImageMetadata: () => f,
            generateMetadata: () => l,
            generateViewport: () => p,
          });
        var i = r(63033),
          o = r(26394),
          a = r(60442),
          c = (0, o.registerClientReference)(
            function () {
              throw Error(
                "Attempted to call the default export of \"E:\\\\downloads\\\\Hijraah\\\\apps\\\\web\\\\src\\\\app\\\\(authenticated)\\\\dashboard\\\\analytics\\\\page.tsx\" from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
              );
            },
            "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\(authenticated)\\dashboard\\analytics\\page.tsx",
            "default",
          );
        let u = { ...i },
          s =
            "workUnitAsyncStorage" in u
              ? u.workUnitAsyncStorage
              : "requestAsyncStorage" in u
                ? u.requestAsyncStorage
                : void 0;
        n =
          "function" == typeof c
            ? new Proxy(c, {
                apply: (t, e, r) => {
                  let n, i, o;
                  try {
                    let t = s?.getStore();
                    (n = t?.headers.get("sentry-trace") ?? void 0),
                      (i = t?.headers.get("baggage") ?? void 0),
                      (o = t?.headers);
                  } catch (t) {}
                  return a
                    .wrapServerComponentWithSentry(t, {
                      componentRoute: "/(authenticated)/dashboard/analytics",
                      componentType: "Page",
                      sentryTraceHeader: n,
                      baggageHeader: i,
                      headers: o,
                    })
                    .apply(e, r);
                },
              })
            : c;
        let l = void 0,
          f = void 0,
          p = void 0,
          h = n;
      },
      58902: (t, e, r) => {
        "use strict";
        var n = r(54368),
          i = r(62588),
          o = r(96360);
        t.exports = function (t) {
          return i(t) ? o(t) : n(t);
        };
      },
      58929: (t) => {
        "use strict";
        t.exports = function (t) {
          return null == t;
        };
      },
      59476: (t) => {
        "use strict";
        t.exports = function (t) {
          var e = this.__data__,
            r = e.delete(t);
          return (this.size = e.size), r;
        };
      },
      59684: (t, e, r) => {
        "use strict";
        var n = r(74682),
          i = r(63428),
          o = r(70226),
          a = r(83855),
          c = r(24762);
        t.exports = function (t, e, r) {
          var u = a(t) ? n : o;
          return r && c(t, e, r) && (e = void 0), u(t, i(e, 3));
        };
      },
      59769: (t, e, r) => {
        "use strict";
        r.d(e, { u: () => C });
        var n = r(84205),
          i = r.n(n),
          o = r(4276),
          a = r.n(o),
          c = r(65946),
          u = r.n(c),
          s = r(79029),
          l = r(60974),
          f = r(57830),
          p = r(6265),
          h = r(79669),
          d = r(61481),
          y = r(10621),
          v = r(18862),
          m = r(12139),
          b = ["viewBox"],
          g = ["viewBox"],
          x = ["ticks"];
        function w(t) {
          return (w =
            "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
              ? function (t) {
                  return typeof t;
                }
              : function (t) {
                  return t &&
                    "function" == typeof Symbol &&
                    t.constructor === Symbol &&
                    t !== Symbol.prototype
                    ? "symbol"
                    : typeof t;
                })(t);
        }
        function O() {
          return (O = Object.assign
            ? Object.assign.bind()
            : function (t) {
                for (var e = 1; e < arguments.length; e++) {
                  var r = arguments[e];
                  for (var n in r)
                    Object.prototype.hasOwnProperty.call(r, n) && (t[n] = r[n]);
                }
                return t;
              }).apply(this, arguments);
        }
        function j(t, e) {
          var r = Object.keys(t);
          if (Object.getOwnPropertySymbols) {
            var n = Object.getOwnPropertySymbols(t);
            e &&
              (n = n.filter(function (e) {
                return Object.getOwnPropertyDescriptor(t, e).enumerable;
              })),
              r.push.apply(r, n);
          }
          return r;
        }
        function S(t) {
          for (var e = 1; e < arguments.length; e++) {
            var r = null != arguments[e] ? arguments[e] : {};
            e % 2
              ? j(Object(r), !0).forEach(function (e) {
                  M(t, e, r[e]);
                })
              : Object.getOwnPropertyDescriptors
                ? Object.defineProperties(
                    t,
                    Object.getOwnPropertyDescriptors(r),
                  )
                : j(Object(r)).forEach(function (e) {
                    Object.defineProperty(
                      t,
                      e,
                      Object.getOwnPropertyDescriptor(r, e),
                    );
                  });
          }
          return t;
        }
        function A(t, e) {
          if (null == t) return {};
          var r,
            n,
            i = (function (t, e) {
              if (null == t) return {};
              var r = {};
              for (var n in t)
                if (Object.prototype.hasOwnProperty.call(t, n)) {
                  if (e.indexOf(n) >= 0) continue;
                  r[n] = t[n];
                }
              return r;
            })(t, e);
          if (Object.getOwnPropertySymbols) {
            var o = Object.getOwnPropertySymbols(t);
            for (n = 0; n < o.length; n++)
              (r = o[n]),
                !(e.indexOf(r) >= 0) &&
                  Object.prototype.propertyIsEnumerable.call(t, r) &&
                  (i[r] = t[r]);
          }
          return i;
        }
        function P(t, e) {
          for (var r = 0; r < e.length; r++) {
            var n = e[r];
            (n.enumerable = n.enumerable || !1),
              (n.configurable = !0),
              "value" in n && (n.writable = !0),
              Object.defineProperty(t, T(n.key), n);
          }
        }
        function E() {
          try {
            var t = !Boolean.prototype.valueOf.call(
              Reflect.construct(Boolean, [], function () {}),
            );
          } catch (t) {}
          return (E = function () {
            return !!t;
          })();
        }
        function k(t) {
          return (k = Object.setPrototypeOf
            ? Object.getPrototypeOf.bind()
            : function (t) {
                return t.__proto__ || Object.getPrototypeOf(t);
              })(t);
        }
        function _(t, e) {
          return (_ = Object.setPrototypeOf
            ? Object.setPrototypeOf.bind()
            : function (t, e) {
                return (t.__proto__ = e), t;
              })(t, e);
        }
        function M(t, e, r) {
          return (
            (e = T(e)) in t
              ? Object.defineProperty(t, e, {
                  value: r,
                  enumerable: !0,
                  configurable: !0,
                  writable: !0,
                })
              : (t[e] = r),
            t
          );
        }
        function T(t) {
          var e = (function (t, e) {
            if ("object" != w(t) || !t) return t;
            var r = t[Symbol.toPrimitive];
            if (void 0 !== r) {
              var n = r.call(t, e || "default");
              if ("object" != w(n)) return n;
              throw TypeError("@@toPrimitive must return a primitive value.");
            }
            return ("string" === e ? String : Number)(t);
          })(t, "string");
          return "symbol" == w(e) ? e : e + "";
        }
        var C = (function (t) {
          var e, r;
          function n(t) {
            var e, r, i;
            if (!(this instanceof n))
              throw TypeError("Cannot call a class as a function");
            return (
              (r = n),
              (i = [t]),
              (r = k(r)),
              ((e = (function (t, e) {
                if (e && ("object" === w(e) || "function" == typeof e))
                  return e;
                if (void 0 !== e)
                  throw TypeError(
                    "Derived constructors may only return object or undefined",
                  );
                var r = t;
                if (void 0 === r)
                  throw ReferenceError(
                    "this hasn't been initialised - super() hasn't been called",
                  );
                return r;
              })(
                this,
                E()
                  ? Reflect.construct(r, i || [], k(this).constructor)
                  : r.apply(this, i),
              )).state = { fontSize: "", letterSpacing: "" }),
              e
            );
          }
          if ("function" != typeof t && null !== t)
            throw TypeError(
              "Super expression must either be null or a function",
            );
          return (
            (n.prototype = Object.create(t && t.prototype, {
              constructor: { value: n, writable: !0, configurable: !0 },
            })),
            Object.defineProperty(n, "prototype", { writable: !1 }),
            t && _(n, t),
            (e = [
              {
                key: "shouldComponentUpdate",
                value: function (t, e) {
                  var r = t.viewBox,
                    n = A(t, b),
                    i = this.props,
                    o = i.viewBox,
                    a = A(i, g);
                  return (
                    !(0, l.b)(r, o) ||
                    !(0, l.b)(n, a) ||
                    !(0, l.b)(e, this.state)
                  );
                },
              },
              {
                key: "componentDidMount",
                value: function () {
                  var t = this.layerReference;
                  if (t) {
                    var e = t.getElementsByClassName(
                      "recharts-cartesian-axis-tick-value",
                    )[0];
                    e &&
                      this.setState({
                        fontSize: window.getComputedStyle(e).fontSize,
                        letterSpacing: window.getComputedStyle(e).letterSpacing,
                      });
                  }
                },
              },
              {
                key: "getTickLineCoord",
                value: function (t) {
                  var e,
                    r,
                    n,
                    i,
                    o,
                    a,
                    c = this.props,
                    u = c.x,
                    s = c.y,
                    l = c.width,
                    f = c.height,
                    p = c.orientation,
                    h = c.tickSize,
                    y = c.mirror,
                    v = c.tickMargin,
                    m = y ? -1 : 1,
                    b = t.tickSize || h,
                    g = (0, d.Et)(t.tickCoord) ? t.tickCoord : t.coordinate;
                  switch (p) {
                    case "top":
                      (e = r = t.coordinate),
                        (a = (n = (i = s + +!y * f) - m * b) - m * v),
                        (o = g);
                      break;
                    case "left":
                      (n = i = t.coordinate),
                        (o = (e = (r = u + +!y * l) - m * b) - m * v),
                        (a = g);
                      break;
                    case "right":
                      (n = i = t.coordinate),
                        (o = (e = (r = u + +y * l) + m * b) + m * v),
                        (a = g);
                      break;
                    default:
                      (e = r = t.coordinate),
                        (a = (n = (i = s + +y * f) + m * b) + m * v),
                        (o = g);
                  }
                  return {
                    line: { x1: e, y1: n, x2: r, y2: i },
                    tick: { x: o, y: a },
                  };
                },
              },
              {
                key: "getTickTextAnchor",
                value: function () {
                  var t,
                    e = this.props,
                    r = e.orientation,
                    n = e.mirror;
                  switch (r) {
                    case "left":
                      t = n ? "start" : "end";
                      break;
                    case "right":
                      t = n ? "end" : "start";
                      break;
                    default:
                      t = "middle";
                  }
                  return t;
                },
              },
              {
                key: "getTickVerticalAnchor",
                value: function () {
                  var t = this.props,
                    e = t.orientation,
                    r = t.mirror,
                    n = "end";
                  switch (e) {
                    case "left":
                    case "right":
                      n = "middle";
                      break;
                    case "top":
                      n = r ? "start" : "end";
                      break;
                    default:
                      n = r ? "end" : "start";
                  }
                  return n;
                },
              },
              {
                key: "renderAxisLine",
                value: function () {
                  var t = this.props,
                    e = t.x,
                    r = t.y,
                    n = t.width,
                    o = t.height,
                    a = t.orientation,
                    c = t.mirror,
                    l = t.axisLine,
                    f = S(
                      S(S({}, (0, v.J9)(this.props, !1)), (0, v.J9)(l, !1)),
                      {},
                      { fill: "none" },
                    );
                  if ("top" === a || "bottom" === a) {
                    var p = +(("top" === a && !c) || ("bottom" === a && c));
                    f = S(
                      S({}, f),
                      {},
                      { x1: e, y1: r + p * o, x2: e + n, y2: r + p * o },
                    );
                  } else {
                    var h = +(("left" === a && !c) || ("right" === a && c));
                    f = S(
                      S({}, f),
                      {},
                      { x1: e + h * n, y1: r, x2: e + h * n, y2: r + o },
                    );
                  }
                  return i().createElement(
                    "line",
                    O({}, f, {
                      className: (0, s.A)(
                        "recharts-cartesian-axis-line",
                        u()(l, "className"),
                      ),
                    }),
                  );
                },
              },
              {
                key: "renderTicks",
                value: function (t, e, r) {
                  var o = this,
                    c = this.props,
                    l = c.tickLine,
                    p = c.stroke,
                    h = c.tick,
                    d = c.tickFormatter,
                    b = c.unit,
                    g = (0, m.f)(S(S({}, this.props), {}, { ticks: t }), e, r),
                    x = this.getTickTextAnchor(),
                    w = this.getTickVerticalAnchor(),
                    j = (0, v.J9)(this.props, !1),
                    A = (0, v.J9)(h, !1),
                    P = S(S({}, j), {}, { fill: "none" }, (0, v.J9)(l, !1)),
                    E = g.map(function (t, e) {
                      var r = o.getTickLineCoord(t),
                        c = r.line,
                        v = r.tick,
                        m = S(
                          S(
                            S(
                              S({ textAnchor: x, verticalAnchor: w }, j),
                              {},
                              { stroke: "none", fill: p },
                              A,
                            ),
                            v,
                          ),
                          {},
                          {
                            index: e,
                            payload: t,
                            visibleTicksCount: g.length,
                            tickFormatter: d,
                          },
                        );
                      return i().createElement(
                        f.W,
                        O(
                          {
                            className: "recharts-cartesian-axis-tick",
                            key: "tick-"
                              .concat(t.value, "-")
                              .concat(t.coordinate, "-")
                              .concat(t.tickCoord),
                          },
                          (0, y.XC)(o.props, t, e),
                        ),
                        l &&
                          i().createElement(
                            "line",
                            O({}, P, c, {
                              className: (0, s.A)(
                                "recharts-cartesian-axis-tick-line",
                                u()(l, "className"),
                              ),
                            }),
                          ),
                        h &&
                          n.renderTickItem(
                            h,
                            m,
                            ""
                              .concat(a()(d) ? d(t.value, e) : t.value)
                              .concat(b || ""),
                          ),
                      );
                    });
                  return i().createElement(
                    "g",
                    { className: "recharts-cartesian-axis-ticks" },
                    E,
                  );
                },
              },
              {
                key: "render",
                value: function () {
                  var t = this,
                    e = this.props,
                    r = e.axisLine,
                    n = e.width,
                    o = e.height,
                    c = e.ticksGenerator,
                    u = e.className;
                  if (e.hide) return null;
                  var l = this.props,
                    p = l.ticks,
                    d = A(l, x),
                    y = p;
                  return (a()(c) && (y = c(p && p.length > 0 ? this.props : d)),
                  n <= 0 || o <= 0 || !y || !y.length)
                    ? null
                    : i().createElement(
                        f.W,
                        {
                          className: (0, s.A)("recharts-cartesian-axis", u),
                          ref: function (e) {
                            t.layerReference = e;
                          },
                        },
                        r && this.renderAxisLine(),
                        this.renderTicks(
                          y,
                          this.state.fontSize,
                          this.state.letterSpacing,
                        ),
                        h.J.renderCallByParent(this.props),
                      );
                },
              },
            ]),
            (r = [
              {
                key: "renderTickItem",
                value: function (t, e, r) {
                  var n,
                    o = (0, s.A)(
                      e.className,
                      "recharts-cartesian-axis-tick-value",
                    );
                  return i().isValidElement(t)
                    ? i().cloneElement(t, S(S({}, e), {}, { className: o }))
                    : a()(t)
                      ? t(S(S({}, e), {}, { className: o }))
                      : i().createElement(
                          p.E,
                          O({}, e, {
                            className: "recharts-cartesian-axis-tick-value",
                          }),
                          r,
                        );
                },
              },
            ]),
            e && P(n.prototype, e),
            r && P(n, r),
            Object.defineProperty(n, "prototype", { writable: !1 }),
            n
          );
        })(n.Component);
        M(C, "displayName", "CartesianAxis"),
          M(C, "defaultProps", {
            x: 0,
            y: 0,
            width: 0,
            height: 0,
            viewBox: { x: 0, y: 0, width: 0, height: 0 },
            orientation: "bottom",
            ticks: [],
            stroke: "#666",
            tickLine: !0,
            axisLine: !0,
            tick: !0,
            mirror: !1,
            minTickGap: 5,
            tickSize: 6,
            tickMargin: 2,
            interval: "preserveEnd",
          });
      },
      60363: (t) => {
        "use strict";
        t.exports = function (t, e) {
          return function (r) {
            return null != r && r[t] === e && (void 0 !== e || t in Object(r));
          };
        };
      },
      60897: (t, e, r) => {
        "use strict";
        var n = r(86154),
          i = r(89777),
          o = r(23995),
          a = r(24762);
        t.exports = o(function (t, e) {
          if (null == t) return [];
          var r = e.length;
          return (
            r > 1 && a(t, e[0], e[1])
              ? (e = [])
              : r > 2 && a(e[0], e[1], e[2]) && (e = [e[0]]),
            i(t, n(e, 1), [])
          );
        });
      },
      60974: (t, e, r) => {
        "use strict";
        function n(t, e) {
          for (var r in t)
            if (
              {}.hasOwnProperty.call(t, r) &&
              (!{}.hasOwnProperty.call(e, r) || t[r] !== e[r])
            )
              return !1;
          for (var n in e)
            if ({}.hasOwnProperty.call(e, n) && !{}.hasOwnProperty.call(t, n))
              return !1;
          return !0;
        }
        r.d(e, { b: () => n });
      },
      61481: (t, e, r) => {
        "use strict";
        r.d(e, {
          CG: () => O,
          Dj: () => j,
          Et: () => y,
          F4: () => x,
          NF: () => g,
          _3: () => d,
          ck: () => A,
          eP: () => S,
          lX: () => w,
          sA: () => h,
          uy: () => v,
          vh: () => m,
        });
        var n = r(27909),
          i = r.n(n),
          o = r(1371),
          a = r.n(o),
          c = r(65946),
          u = r.n(c),
          s = r(80657),
          l = r.n(s),
          f = r(58929),
          p = r.n(f),
          h = function (t) {
            return 0 === t ? 0 : t > 0 ? 1 : -1;
          },
          d = function (t) {
            return i()(t) && t.indexOf("%") === t.length - 1;
          },
          y = function (t) {
            return l()(t) && !a()(t);
          },
          v = function (t) {
            return p()(t);
          },
          m = function (t) {
            return y(t) || i()(t);
          },
          b = 0,
          g = function (t) {
            var e = ++b;
            return "".concat(t || "").concat(e);
          },
          x = function (t, e) {
            var r,
              n =
                arguments.length > 2 && void 0 !== arguments[2]
                  ? arguments[2]
                  : 0,
              o =
                arguments.length > 3 && void 0 !== arguments[3] && arguments[3];
            if (!y(t) && !i()(t)) return n;
            if (d(t)) {
              var c = t.indexOf("%");
              r = (e * parseFloat(t.slice(0, c))) / 100;
            } else r = +t;
            return a()(r) && (r = n), o && r > e && (r = e), r;
          },
          w = function (t) {
            if (!t) return null;
            var e = Object.keys(t);
            return e && e.length ? t[e[0]] : null;
          },
          O = function (t) {
            if (!Array.isArray(t)) return !1;
            for (var e = t.length, r = {}, n = 0; n < e; n++)
              if (r[t[n]]) return !0;
              else r[t[n]] = !0;
            return !1;
          },
          j = function (t, e) {
            return y(t) && y(e)
              ? function (r) {
                  return t + r * (e - t);
                }
              : function () {
                  return e;
                };
          };
        function S(t, e, r) {
          return t && t.length
            ? t.find(function (t) {
                return t && ("function" == typeof e ? e(t) : u()(t, e)) === r;
              })
            : null;
        }
        var A = function (t, e) {
          return y(t) && y(e)
            ? t - e
            : i()(t) && i()(e)
              ? t.localeCompare(e)
              : t instanceof Date && e instanceof Date
                ? t.getTime() - e.getTime()
                : String(t).localeCompare(String(e));
        };
      },
      62042: (t, e, r) => {
        "use strict";
        r.a(t, async (t, n) => {
          try {
            r.r(e), r.d(e, { default: () => k });
            var i = r(61268),
              o = r(84205),
              a = r(44549),
              c = r(132),
              u = r(31135),
              s = r(37676),
              l = r(39643),
              f = r(93224),
              p = r(86594),
              h = r(39125),
              d = r(3490),
              y = r(57611),
              v = r(43851),
              m = r(3519),
              b = r(5913),
              g = r(75822),
              x = r(17362),
              w = r(28909),
              O = r(5451),
              j = r(95957),
              S = r(94812),
              A = r(77001),
              P = r(15090),
              E = t([v, x, w, O, j, S, A]);
            [v, x, w, O, j, S, A] = E.then ? (await E)() : E;
            let _ = [
              "#0088FE",
              "#00C49F",
              "#FFBB28",
              "#FF8042",
              "#8884D8",
              "#D88884",
            ];
            function k() {
              let [t, e] = (0, o.useState)([]),
                [r, n] = (0, o.useState)([]),
                [E, k] = (0, o.useState)(!0),
                [M, T] = (0, o.useState)("last30days"),
                { user: C } = (0, m.useAuth)(),
                { toast: N } = (0, P.d)();
              (0, o.useCallback)(async () => {
                if (C)
                  try {
                    k(!0);
                    let [t, r] = await Promise.all([
                        b.pC.getCases(),
                        g.wP.getDocuments(),
                      ]),
                      i = t.filter((t) => t.user_id === C.id),
                      o = r.filter((t) => t.user_id === C.id);
                    e(i), n(o);
                  } catch (t) {
                    N({
                      variant: "destructive",
                      title: "Error",
                      description: "Failed to load analytics data",
                    });
                  } finally {
                    k(!1);
                  }
              }, [C, N]);
              let I = () => {
                  let e = {};
                  return (
                    t.forEach((t) => {
                      let r = t.case_type || "other";
                      e[r] = (e[r] || 0) + 1;
                    }),
                    Object.entries(e).map(([t, e]) => ({ name: t, value: e }))
                  );
                },
                D = () => {
                  let e = {};
                  return (
                    t.forEach((t) => {
                      let r = t.status || "unknown";
                      e[r] = (e[r] || 0) + 1;
                    }),
                    Object.entries(e).map(([t, e]) => ({ name: t, value: e }))
                  );
                },
                B = () => {
                  let t = {};
                  return (
                    r.forEach((e) => {
                      let r = e.status || "unknown";
                      t[r] = (t[r] || 0) + 1;
                    }),
                    Object.entries(t).map(([t, e]) => ({ name: t, value: e }))
                  );
                };
              return E
                ? (0, i.jsxs)("div", {
                    className: "flex flex-col h-screen",
                    children: [
                      (0, i.jsx)("div", {
                        className:
                          "flex items-center justify-between px-4 py-2 border-b",
                        children: (0, i.jsx)(S.E, { className: "h-6 w-48" }),
                      }),
                      (0, i.jsxs)("div", {
                        className: "flex flex-1 overflow-hidden",
                        children: [
                          (0, i.jsx)("div", {
                            className: "w-64 h-screen border-r",
                            children: (0, i.jsx)(S.E, {
                              className: "h-screen w-full",
                            }),
                          }),
                          (0, i.jsx)("div", {
                            className: "flex-1 overflow-auto",
                            children: (0, i.jsxs)("div", {
                              className: "container mx-auto p-6",
                              children: [
                                (0, i.jsxs)("div", {
                                  className:
                                    "grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6",
                                  children: [
                                    (0, i.jsx)(S.E, {
                                      className: "h-24 w-full rounded-lg",
                                    }),
                                    (0, i.jsx)(S.E, {
                                      className: "h-24 w-full rounded-lg",
                                    }),
                                    (0, i.jsx)(S.E, {
                                      className: "h-24 w-full rounded-lg",
                                    }),
                                    (0, i.jsx)(S.E, {
                                      className: "h-24 w-full rounded-lg",
                                    }),
                                  ],
                                }),
                                (0, i.jsx)(S.E, {
                                  className: "h-80 w-full rounded-lg mb-6",
                                }),
                                (0, i.jsxs)("div", {
                                  className: "grid gap-4 md:grid-cols-2",
                                  children: [
                                    (0, i.jsx)(S.E, {
                                      className: "h-60 w-full rounded-lg",
                                    }),
                                    (0, i.jsx)(S.E, {
                                      className: "h-60 w-full rounded-lg",
                                    }),
                                  ],
                                }),
                              ],
                            }),
                          }),
                        ],
                      }),
                    ],
                  })
                : (0, i.jsxs)("div", {
                    className: "flex flex-col h-screen",
                    children: [
                      (0, i.jsx)("div", {
                        className:
                          "flex items-center justify-between px-4 py-2 border-b",
                        children: (0, i.jsx)(x.Qp, {
                          children: (0, i.jsxs)(x.AB, {
                            children: [
                              (0, i.jsx)(x.J5, {
                                children: (0, i.jsx)(x.w1, {
                                  href: "/",
                                  children: "Home",
                                }),
                              }),
                              (0, i.jsx)(x.tH, {}),
                              (0, i.jsx)(x.J5, {
                                children: (0, i.jsx)(x.w1, {
                                  href: "/dashboard",
                                  children: "Dashboard",
                                }),
                              }),
                              (0, i.jsx)(x.tH, {}),
                              (0, i.jsx)(x.J5, {
                                children: (0, i.jsx)(x.tJ, {
                                  children: "Analytics",
                                }),
                              }),
                            ],
                          }),
                        }),
                      }),
                      (0, i.jsxs)("div", {
                        className: "flex flex-1 overflow-hidden",
                        children: [
                          (0, i.jsx)(v.AppSidebar, { className: "h-screen" }),
                          (0, i.jsx)("div", {
                            className: "flex-1 overflow-auto",
                            children: (0, i.jsxs)("div", {
                              className: "container mx-auto p-6",
                              children: [
                                (0, i.jsxs)("div", {
                                  className:
                                    "flex justify-between items-center mb-6",
                                  children: [
                                    (0, i.jsx)("h1", {
                                      className: "text-2xl font-bold",
                                      children: "Analytics Dashboard",
                                    }),
                                    (0, i.jsxs)("div", {
                                      className: "flex gap-4",
                                      children: [
                                        (0, i.jsxs)(j.l6, {
                                          value: M,
                                          onValueChange: T,
                                          children: [
                                            (0, i.jsx)(j.bq, {
                                              className: "w-[180px]",
                                              children: (0, i.jsx)(j.yv, {
                                                placeholder:
                                                  "Select time range",
                                              }),
                                            }),
                                            (0, i.jsxs)(j.gC, {
                                              children: [
                                                (0, i.jsx)(j.eb, {
                                                  value: "last7days",
                                                  children: "Last 7 days",
                                                }),
                                                (0, i.jsx)(j.eb, {
                                                  value: "last30days",
                                                  children: "Last 30 days",
                                                }),
                                                (0, i.jsx)(j.eb, {
                                                  value: "last90days",
                                                  children: "Last 90 days",
                                                }),
                                                (0, i.jsx)(j.eb, {
                                                  value: "lastYear",
                                                  children: "Last year",
                                                }),
                                                (0, i.jsx)(j.eb, {
                                                  value: "allTime",
                                                  children: "All time",
                                                }),
                                              ],
                                            }),
                                          ],
                                        }),
                                        (0, i.jsx)(w.$, {
                                          onClick: () => {
                                            N({
                                              title: "Report Downloaded",
                                              description:
                                                "Your analytics report has been downloaded.",
                                            });
                                          },
                                          children: "Download Report",
                                        }),
                                      ],
                                    }),
                                  ],
                                }),
                                (0, i.jsxs)("div", {
                                  className:
                                    "grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6",
                                  children: [
                                    (0, i.jsxs)(O.Zp, {
                                      children: [
                                        (0, i.jsx)(O.aR, {
                                          className: "pb-2",
                                          children: (0, i.jsx)(O.ZB, {
                                            className: "text-sm font-medium",
                                            children: "Total Cases",
                                          }),
                                        }),
                                        (0, i.jsxs)(O.Wu, {
                                          children: [
                                            (0, i.jsx)("div", {
                                              className: "text-2xl font-bold",
                                              children: t.length,
                                            }),
                                            (0, i.jsx)("p", {
                                              className:
                                                "text-xs text-muted-foreground",
                                              children:
                                                t.length > 0
                                                  ? `+${Math.floor(0.1 * t.length)} from last month`
                                                  : "No cases yet",
                                            }),
                                          ],
                                        }),
                                      ],
                                    }),
                                    (0, i.jsxs)(O.Zp, {
                                      children: [
                                        (0, i.jsx)(O.aR, {
                                          className: "pb-2",
                                          children: (0, i.jsx)(O.ZB, {
                                            className: "text-sm font-medium",
                                            children: "Active Cases",
                                          }),
                                        }),
                                        (0, i.jsxs)(O.Wu, {
                                          children: [
                                            (0, i.jsx)("div", {
                                              className: "text-2xl font-bold",
                                              children: t.filter(
                                                (t) => "active" === t.status,
                                              ).length,
                                            }),
                                            (0, i.jsx)("p", {
                                              className:
                                                "text-xs text-muted-foreground",
                                              children:
                                                t.filter(
                                                  (t) => "active" === t.status,
                                                ).length > 0
                                                  ? `${Math.floor((t.filter((t) => "active" === t.status).length / t.length) * 100)}% of total`
                                                  : "No active cases",
                                            }),
                                          ],
                                        }),
                                      ],
                                    }),
                                    (0, i.jsxs)(O.Zp, {
                                      children: [
                                        (0, i.jsx)(O.aR, {
                                          className: "pb-2",
                                          children: (0, i.jsx)(O.ZB, {
                                            className: "text-sm font-medium",
                                            children: "Completed Cases",
                                          }),
                                        }),
                                        (0, i.jsxs)(O.Wu, {
                                          children: [
                                            (0, i.jsx)("div", {
                                              className: "text-2xl font-bold",
                                              children: t.filter(
                                                (t) => "completed" === t.status,
                                              ).length,
                                            }),
                                            (0, i.jsx)("p", {
                                              className:
                                                "text-xs text-muted-foreground",
                                              children:
                                                t.filter(
                                                  (t) =>
                                                    "completed" === t.status,
                                                ).length > 0
                                                  ? `${Math.floor((t.filter((t) => "completed" === t.status).length / t.length) * 100)}% of total`
                                                  : "No completed cases",
                                            }),
                                          ],
                                        }),
                                      ],
                                    }),
                                    (0, i.jsxs)(O.Zp, {
                                      children: [
                                        (0, i.jsx)(O.aR, {
                                          className: "pb-2",
                                          children: (0, i.jsx)(O.ZB, {
                                            className: "text-sm font-medium",
                                            children: "Documents",
                                          }),
                                        }),
                                        (0, i.jsxs)(O.Wu, {
                                          children: [
                                            (0, i.jsx)("div", {
                                              className: "text-2xl font-bold",
                                              children: r.length,
                                            }),
                                            (0, i.jsx)("p", {
                                              className:
                                                "text-xs text-muted-foreground",
                                              children:
                                                r.length > 0
                                                  ? `${Math.floor(r.length / (t.length || 1))} per case avg.`
                                                  : "No documents",
                                            }),
                                          ],
                                        }),
                                      ],
                                    }),
                                  ],
                                }),
                                (0, i.jsxs)(A.Tabs, {
                                  defaultValue: "overview",
                                  className: "mb-6",
                                  children: [
                                    (0, i.jsxs)(A.TabsList, {
                                      children: [
                                        (0, i.jsx)(A.TabsTrigger, {
                                          value: "overview",
                                          children: "Overview",
                                        }),
                                        (0, i.jsx)(A.TabsTrigger, {
                                          value: "cases",
                                          children: "Cases",
                                        }),
                                        (0, i.jsx)(A.TabsTrigger, {
                                          value: "documents",
                                          children: "Documents",
                                        }),
                                      ],
                                    }),
                                    (0, i.jsxs)(A.TabsContent, {
                                      value: "overview",
                                      className: "p-4 border rounded-md",
                                      children: [
                                        (0, i.jsx)("h2", {
                                          className: "text-lg font-medium mb-4",
                                          children: "Case Creation Over Time",
                                        }),
                                        (0, i.jsx)("div", {
                                          className: "w-full",
                                          style: { height: "300px" },
                                          children: (0, i.jsxs)(a.E, {
                                            width: 800,
                                            height: 300,
                                            data: (() => {
                                              let e = [
                                                  "Jan",
                                                  "Feb",
                                                  "Mar",
                                                  "Apr",
                                                  "May",
                                                  "Jun",
                                                  "Jul",
                                                  "Aug",
                                                  "Sep",
                                                  "Oct",
                                                  "Nov",
                                                  "Dec",
                                                ],
                                                r = Array(12)
                                                  .fill(0)
                                                  .map((t, r) => ({
                                                    name: e[r],
                                                    count: 0,
                                                  }));
                                              return (
                                                t.forEach((t) => {
                                                  let e = new Date(
                                                    t.created_at,
                                                  ).getMonth();
                                                  r[e].count += 1;
                                                }),
                                                r
                                              );
                                            })(),
                                            margin: {
                                              top: 5,
                                              right: 30,
                                              left: 20,
                                              bottom: 5,
                                            },
                                            children: [
                                              (0, i.jsx)(c.d, {
                                                strokeDasharray: "3 3",
                                              }),
                                              (0, i.jsx)(u.W, {
                                                dataKey: "name",
                                              }),
                                              (0, i.jsx)(s.h, {}),
                                              (0, i.jsx)(l.m, {}),
                                              (0, i.jsx)(f.s, {}),
                                              (0, i.jsx)(p.y, {
                                                dataKey: "count",
                                                fill: "#8884d8",
                                                name: "Cases Created",
                                              }),
                                            ],
                                          }),
                                        }),
                                      ],
                                    }),
                                    (0, i.jsx)(A.TabsContent, {
                                      value: "cases",
                                      className: "p-4 border rounded-md",
                                      children: (0, i.jsxs)("div", {
                                        className:
                                          "grid grid-cols-1 md:grid-cols-2 gap-6",
                                        children: [
                                          (0, i.jsxs)("div", {
                                            children: [
                                              (0, i.jsx)("h2", {
                                                className:
                                                  "text-lg font-medium mb-4",
                                                children: "Cases by Type",
                                              }),
                                              (0, i.jsx)("div", {
                                                className:
                                                  "flex justify-center",
                                                children: (0, i.jsxs)(h.r, {
                                                  width: 300,
                                                  height: 300,
                                                  children: [
                                                    (0, i.jsx)(d.F, {
                                                      data: I(),
                                                      cx: "50%",
                                                      cy: "50%",
                                                      labelLine: !0,
                                                      outerRadius: 100,
                                                      fill: "#8884d8",
                                                      dataKey: "value",
                                                      nameKey: "name",
                                                      label: ({
                                                        name: t,
                                                        percent: e,
                                                      }) =>
                                                        `${t}: ${(100 * e).toFixed(0)}%`,
                                                      children: I().map(
                                                        (t, e) =>
                                                          (0, i.jsx)(
                                                            y.f,
                                                            {
                                                              fill: _[
                                                                e % _.length
                                                              ],
                                                            },
                                                            `cell-${e}`,
                                                          ),
                                                      ),
                                                    }),
                                                    (0, i.jsx)(l.m, {}),
                                                  ],
                                                }),
                                              }),
                                            ],
                                          }),
                                          (0, i.jsxs)("div", {
                                            children: [
                                              (0, i.jsx)("h2", {
                                                className:
                                                  "text-lg font-medium mb-4",
                                                children: "Cases by Status",
                                              }),
                                              (0, i.jsx)("div", {
                                                className:
                                                  "flex justify-center",
                                                children: (0, i.jsxs)(h.r, {
                                                  width: 300,
                                                  height: 300,
                                                  children: [
                                                    (0, i.jsx)(d.F, {
                                                      data: D(),
                                                      cx: "50%",
                                                      cy: "50%",
                                                      labelLine: !0,
                                                      outerRadius: 100,
                                                      fill: "#8884d8",
                                                      dataKey: "value",
                                                      nameKey: "name",
                                                      label: ({
                                                        name: t,
                                                        percent: e,
                                                      }) =>
                                                        `${t}: ${(100 * e).toFixed(0)}%`,
                                                      children: D().map(
                                                        (t, e) =>
                                                          (0, i.jsx)(
                                                            y.f,
                                                            {
                                                              fill: _[
                                                                e % _.length
                                                              ],
                                                            },
                                                            `cell-${e}`,
                                                          ),
                                                      ),
                                                    }),
                                                    (0, i.jsx)(l.m, {}),
                                                  ],
                                                }),
                                              }),
                                            ],
                                          }),
                                        ],
                                      }),
                                    }),
                                    (0, i.jsxs)(A.TabsContent, {
                                      value: "documents",
                                      className: "p-4 border rounded-md",
                                      children: [
                                        (0, i.jsx)("h2", {
                                          className: "text-lg font-medium mb-4",
                                          children: "Documents by Status",
                                        }),
                                        (0, i.jsx)("div", {
                                          className: "flex justify-center",
                                          children: (0, i.jsxs)(h.r, {
                                            width: 400,
                                            height: 300,
                                            children: [
                                              (0, i.jsx)(d.F, {
                                                data: B(),
                                                cx: "50%",
                                                cy: "50%",
                                                labelLine: !0,
                                                outerRadius: 100,
                                                fill: "#8884d8",
                                                dataKey: "value",
                                                nameKey: "name",
                                                label: ({
                                                  name: t,
                                                  percent: e,
                                                }) =>
                                                  `${t}: ${(100 * e).toFixed(0)}%`,
                                                children: B().map((t, e) =>
                                                  (0, i.jsx)(
                                                    y.f,
                                                    { fill: _[e % _.length] },
                                                    `cell-${e}`,
                                                  ),
                                                ),
                                              }),
                                              (0, i.jsx)(l.m, {}),
                                            ],
                                          }),
                                        }),
                                      ],
                                    }),
                                  ],
                                }),
                              ],
                            }),
                          }),
                        ],
                      }),
                    ],
                  });
            }
            n();
          } catch (t) {
            n(t);
          }
        });
      },
      62588: (t) => {
        "use strict";
        var e = RegExp(
          "[\\u200d\ud800-\udfff\\u0300-\\u036f\\ufe20-\\ufe2f\\u20d0-\\u20ff\\ufe0e\\ufe0f]",
        );
        t.exports = function (t) {
          return e.test(t);
        };
      },
      62823: (t) => {
        "use strict";
        t.exports = function (t) {
          return this.__data__.has(t);
        };
      },
      63033: (t) => {
        "use strict";
        t.exports = require("next/dist/server/app-render/work-unit-async-storage.external.js");
      },
      63428: (t, e, r) => {
        "use strict";
        var n = r(13821),
          i = r(3004),
          o = r(11730),
          a = r(83855),
          c = r(27501);
        t.exports = function (t) {
          return "function" == typeof t
            ? t
            : null == t
              ? o
              : "object" == typeof t
                ? a(t)
                  ? i(t[0], t[1])
                  : n(t)
                : c(t);
        };
      },
      63819: (t) => {
        "use strict";
        t.exports = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";
      },
      64508: (t) => {
        "use strict";
        t.exports = function (t) {
          return null != t && "object" == typeof t;
        };
      },
      64885: (t) => {
        "use strict";
        t.exports = function (t, e, r) {
          var n = -1,
            i = t.length;
          e < 0 && (e = -e > i ? 0 : i + e),
            (r = r > i ? i : r) < 0 && (r += i),
            (i = e > r ? 0 : (r - e) >>> 0),
            (e >>>= 0);
          for (var o = Array(i); ++n < i; ) o[n] = t[n + e];
          return o;
        };
      },
      64895: (t, e, r) => {
        "use strict";
        var n = r(19131),
          i = Math.max;
        t.exports = function (t, e, r) {
          return (
            (e = i(void 0 === e ? t.length - 1 : e, 0)),
            function () {
              for (
                var o = arguments, a = -1, c = i(o.length - e, 0), u = Array(c);
                ++a < c;

              )
                u[a] = o[e + a];
              a = -1;
              for (var s = Array(e + 1); ++a < e; ) s[a] = o[a];
              return (s[e] = r(u)), n(t, this, s);
            }
          );
        };
      },
      65530: (t, e, r) => {
        "use strict";
        var n = r(85969),
          i = r(24762),
          o = r(30842);
        t.exports = function (t) {
          return function (e, r, a) {
            return (
              a && "number" != typeof a && i(e, r, a) && (r = a = void 0),
              (e = o(e)),
              void 0 === r ? ((r = e), (e = 0)) : (r = o(r)),
              (a = void 0 === a ? (e < r ? 1 : -1) : o(a)),
              n(e, r, a, t)
            );
          };
        };
      },
      65946: (t, e, r) => {
        "use strict";
        var n = r(19064);
        t.exports = function (t, e, r) {
          var i = null == t ? void 0 : n(t, e);
          return void 0 === i ? r : i;
        };
      },
      65952: (t, e, r) => {
        "use strict";
        var n = r(8108),
          i = r(83649),
          o = r(11730);
        t.exports = i
          ? function (t, e) {
              return i(t, "toString", {
                configurable: !0,
                enumerable: !1,
                value: n(e),
                writable: !0,
              });
            }
          : o;
      },
      66110: (t, e) => {
        "use strict";
        var r,
          n = Symbol.for("react.element"),
          i = Symbol.for("react.portal"),
          o = Symbol.for("react.fragment"),
          a = Symbol.for("react.strict_mode"),
          c = Symbol.for("react.profiler"),
          u = Symbol.for("react.provider"),
          s = Symbol.for("react.context"),
          l = Symbol.for("react.server_context"),
          f = Symbol.for("react.forward_ref"),
          p = Symbol.for("react.suspense"),
          h = Symbol.for("react.suspense_list"),
          d = Symbol.for("react.memo"),
          y = Symbol.for("react.lazy");
        Symbol.for("react.offscreen");
        Symbol.for("react.module.reference"),
          (e.isFragment = function (t) {
            return (
              (function (t) {
                if ("object" == typeof t && null !== t) {
                  var e = t.$$typeof;
                  switch (e) {
                    case n:
                      switch ((t = t.type)) {
                        case o:
                        case c:
                        case a:
                        case p:
                        case h:
                          return t;
                        default:
                          switch ((t = t && t.$$typeof)) {
                            case l:
                            case s:
                            case f:
                            case y:
                            case d:
                            case u:
                              return t;
                            default:
                              return e;
                          }
                      }
                    case i:
                      return e;
                  }
                }
              })(t) === o
            );
          });
      },
      66368: (t, e, r) => {
        "use strict";
        var n = r(64885);
        t.exports = function (t, e, r) {
          var i = t.length;
          return (r = void 0 === r ? i : r), !e && r >= i ? t : n(t, e, r);
        };
      },
      67203: (t, e, r) => {
        "use strict";
        var n = r(36343),
          i = r(11172),
          o = r(86017);
        t.exports =
          n && 1 / o(new n([, -0]))[1] == 1 / 0
            ? function (t) {
                return new n(t);
              }
            : i;
      },
      67839: (t, e, r) => {
        "use strict";
        var n = r(33965),
          i = r(63428),
          o = r(39326);
        t.exports = function (t, e) {
          return t && t.length ? n(t, i(e, 2), o) : void 0;
        };
      },
      68080: (t) => {
        "use strict";
        t.exports = function (t, e) {
          for (
            var r = -1, n = null == t ? 0 : t.length, i = 0, o = [];
            ++r < n;

          ) {
            var a = t[r];
            e(a, r, t) && (o[i++] = a);
          }
          return o;
        };
      },
      68368: (t, e, r) => {
        "use strict";
        var n = r(50834),
          i = r(64508);
        t.exports = function t(e, r, o, a, c) {
          return (
            e === r ||
            (null != e && null != r && (i(e) || i(r))
              ? n(e, r, o, a, t, c)
              : e != e && r != r)
          );
        };
      },
      68491: (t) => {
        "use strict";
        t.exports = function (t) {
          return this.__data__.get(t);
        };
      },
      69277: (t, e, r) => {
        "use strict";
        var n = r(33143),
          i = r(77175),
          o = r(77895),
          a = o && o.isTypedArray;
        t.exports = a ? i(a) : n;
      },
      70226: (t, e, r) => {
        "use strict";
        var n = r(6431);
        t.exports = function (t, e) {
          var r;
          return (
            n(t, function (t, n, i) {
              return !(r = e(t, n, i));
            }),
            !!r
          );
        };
      },
      71825: (t) => {
        "use strict";
        t.exports = function (t) {
          return this.__data__.has(t);
        };
      },
      72392: (t, e, r) => {
        "use strict";
        var n = r(27005),
          i = r(2322),
          o = r(57680);
        t.exports = function (t) {
          return n(t, o, i);
        };
      },
      72459: (t) => {
        "use strict";
        var e = /^(?:0|[1-9]\d*)$/;
        t.exports = function (t, r) {
          var n = typeof t;
          return (
            !!(r = null == r ? 0x1fffffffffffff : r) &&
            ("number" == n || ("symbol" != n && e.test(t))) &&
            t > -1 &&
            t % 1 == 0 &&
            t < r
          );
        };
      },
      73024: (t) => {
        "use strict";
        t.exports = require("node:fs");
      },
      73498: (t, e, r) => {
        "use strict";
        function n(t) {
          return "object" == typeof t && "length" in t ? t : Array.from(t);
        }
        r.d(e, { A: () => n }), Array.prototype.slice;
      },
      73566: (t) => {
        "use strict";
        t.exports = require("worker_threads");
      },
      73927: (t, e, r) => {
        "use strict";
        r.r(e),
          r.d(e, { "4055c9f9dce3c849928e65e87017b3609674121d00": () => n.M });
        var n = r(29997);
      },
      74075: (t) => {
        "use strict";
        t.exports = require("zlib");
      },
      74231: (t, e, r) => {
        "use strict";
        var n = r(92685),
          i = r(63428),
          o = r(1883),
          a = Math.max;
        t.exports = function (t, e, r) {
          var c = null == t ? 0 : t.length;
          if (!c) return -1;
          var u = null == r ? 0 : o(r);
          return u < 0 && (u = a(c + u, 0)), n(t, i(e, 3), u);
        };
      },
      74631: (t, e, r) => {
        "use strict";
        var n = r(38439),
          i = r(57680);
        t.exports = function (t, e) {
          return t && n(t, e, i);
        };
      },
      74682: (t) => {
        "use strict";
        t.exports = function (t, e) {
          for (var r = -1, n = null == t ? 0 : t.length; ++r < n; )
            if (e(t[r], r, t)) return !0;
          return !1;
        };
      },
      74689: (t, e, r) => {
        "use strict";
        var n = r(33965),
          i = r(50021),
          o = r(63428);
        t.exports = function (t, e) {
          return t && t.length ? n(t, o(e, 2), i) : void 0;
        };
      },
      74998: (t) => {
        "use strict";
        t.exports = require("perf_hooks");
      },
      75121: (t, e, r) => {
        "use strict";
        var n = r(28886),
          i = r(50458),
          o = r(83855),
          a = r(6394),
          c = r(72459),
          u = r(69277),
          s = Object.prototype.hasOwnProperty;
        t.exports = function (t, e) {
          var r = o(t),
            l = !r && i(t),
            f = !r && !l && a(t),
            p = !r && !l && !f && u(t),
            h = r || l || f || p,
            d = h ? n(t.length, String) : [],
            y = d.length;
          for (var v in t)
            (e || s.call(t, v)) &&
              !(
                h &&
                ("length" == v ||
                  (f && ("offset" == v || "parent" == v)) ||
                  (p &&
                    ("buffer" == v ||
                      "byteLength" == v ||
                      "byteOffset" == v)) ||
                  c(v, y))
              ) &&
              d.push(v);
          return d;
        };
      },
      75243: (t, e, r) => {
        "use strict";
        r.d(e, {
          s0: () => iw,
          gH: () => im,
          YB: () => iT,
          HQ: () => i_,
          xi: () => iC,
          Hj: () => iX,
          BX: () => ix,
          tA: () => ig,
          DW: () => iz,
          y2: () => iL,
          PW: () => iP,
          Ay: () => iv,
          vf: () => iS,
          Mk: () => iF,
          Ps: () => ib,
          Mn: () => iB,
          kA: () => iU,
          Rh: () => iE,
          w7: () => iR,
          zb: () => iV,
          kr: () => iy,
          _L: () => iA,
          KC: () => iH,
          A1: () => ij,
          W7: () => iM,
          AQ: () => iW,
          _f: () => iN,
        });
        var n = {};
        r.r(n),
          r.d(n, {
            scaleBand: () => i.A,
            scaleDiverging: () =>
              function t() {
                var e = tk(rX()(ts));
                return (
                  (e.copy = function () {
                    return rq(e, t());
                  }),
                  tv.K.apply(e, arguments)
                );
              },
            scaleDivergingLog: () =>
              function t() {
                var e = tR(rX()).domain([0.1, 1, 10]);
                return (
                  (e.copy = function () {
                    return rq(e, t()).base(e.base());
                  }),
                  tv.K.apply(e, arguments)
                );
              },
            scaleDivergingPow: () => rH,
            scaleDivergingSqrt: () => rV,
            scaleDivergingSymlog: () =>
              function t() {
                var e = tU(rX());
                return (
                  (e.copy = function () {
                    return rq(e, t()).constant(e.constant());
                  }),
                  tv.K.apply(e, arguments)
                );
              },
            scaleIdentity: () =>
              function t(e) {
                var r;
                function n(t) {
                  return null == t || isNaN((t *= 1)) ? r : t;
                }
                return (
                  (n.invert = n),
                  (n.domain = n.range =
                    function (t) {
                      return arguments.length
                        ? ((e = Array.from(t, tc)), n)
                        : e.slice();
                    }),
                  (n.unknown = function (t) {
                    return arguments.length ? ((r = t), n) : r;
                  }),
                  (n.copy = function () {
                    return t(e).unknown(r);
                  }),
                  (e = arguments.length ? Array.from(e, tc) : [0, 1]),
                  tk(n)
                );
              },
            scaleImplicit: () => tF.h,
            scaleLinear: () => t_,
            scaleLog: () =>
              function t() {
                let e = tR(td()).domain([1, 10]);
                return (
                  (e.copy = () => th(e, t()).base(e.base())),
                  tv.C.apply(e, arguments),
                  e
                );
              },
            scaleOrdinal: () => tF.A,
            scalePoint: () => i.z,
            scalePow: () => tH,
            scaleQuantile: () =>
              function t() {
                var e,
                  r = [],
                  n = [],
                  i = [];
                function o() {
                  var t = 0,
                    e = Math.max(1, n.length);
                  for (i = Array(e - 1); ++t < e; )
                    i[t - 1] = (function (t, e, r = v) {
                      if (!(!(n = t.length) || isNaN((e *= 1)))) {
                        if (e <= 0 || n < 2) return +r(t[0], 0, t);
                        if (e >= 1) return +r(t[n - 1], n - 1, t);
                        var n,
                          i = (n - 1) * e,
                          o = Math.floor(i),
                          a = +r(t[o], o, t);
                        return a + (+r(t[o + 1], o + 1, t) - a) * (i - o);
                      }
                    })(r, t / e);
                  return a;
                }
                function a(t) {
                  return null == t || isNaN((t *= 1)) ? e : n[b(i, t)];
                }
                return (
                  (a.invertExtent = function (t) {
                    var e = n.indexOf(t);
                    return e < 0
                      ? [NaN, NaN]
                      : [
                          e > 0 ? i[e - 1] : r[0],
                          e < i.length ? i[e] : r[r.length - 1],
                        ];
                  }),
                  (a.domain = function (t) {
                    if (!arguments.length) return r.slice();
                    for (let e of ((r = []), t))
                      null == e || isNaN((e *= 1)) || r.push(e);
                    return r.sort(p), o();
                  }),
                  (a.range = function (t) {
                    return arguments.length
                      ? ((n = Array.from(t)), o())
                      : n.slice();
                  }),
                  (a.unknown = function (t) {
                    return arguments.length ? ((e = t), a) : e;
                  }),
                  (a.quantiles = function () {
                    return i.slice();
                  }),
                  (a.copy = function () {
                    return t().domain(r).range(n).unknown(e);
                  }),
                  tv.C.apply(a, arguments)
                );
              },
            scaleQuantize: () =>
              function t() {
                var e,
                  r = 0,
                  n = 1,
                  i = 1,
                  o = [0.5],
                  a = [0, 1];
                function c(t) {
                  return null != t && t <= t ? a[b(o, t, 0, i)] : e;
                }
                function u() {
                  var t = -1;
                  for (o = Array(i); ++t < i; )
                    o[t] = ((t + 1) * n - (t - i) * r) / (i + 1);
                  return c;
                }
                return (
                  (c.domain = function (t) {
                    return arguments.length
                      ? (([r, n] = t), (r *= 1), (n *= 1), u())
                      : [r, n];
                  }),
                  (c.range = function (t) {
                    return arguments.length
                      ? ((i = (a = Array.from(t)).length - 1), u())
                      : a.slice();
                  }),
                  (c.invertExtent = function (t) {
                    var e = a.indexOf(t);
                    return e < 0
                      ? [NaN, NaN]
                      : e < 1
                        ? [r, o[0]]
                        : e >= i
                          ? [o[i - 1], n]
                          : [o[e - 1], o[e]];
                  }),
                  (c.unknown = function (t) {
                    return arguments.length && (e = t), c;
                  }),
                  (c.thresholds = function () {
                    return o.slice();
                  }),
                  (c.copy = function () {
                    return t().domain([r, n]).range(a).unknown(e);
                  }),
                  tv.C.apply(tk(c), arguments)
                );
              },
            scaleRadial: () =>
              function t() {
                var e,
                  r = ty(),
                  n = [0, 1],
                  i = !1;
                function o(t) {
                  var n,
                    o = Math.sign((n = r(t))) * Math.sqrt(Math.abs(n));
                  return isNaN(o) ? e : i ? Math.round(o) : o;
                }
                return (
                  (o.invert = function (t) {
                    return r.invert(tK(t));
                  }),
                  (o.domain = function (t) {
                    return arguments.length ? (r.domain(t), o) : r.domain();
                  }),
                  (o.range = function (t) {
                    return arguments.length
                      ? (r.range((n = Array.from(t, tc)).map(tK)), o)
                      : n.slice();
                  }),
                  (o.rangeRound = function (t) {
                    return o.range(t).round(!0);
                  }),
                  (o.round = function (t) {
                    return arguments.length ? ((i = !!t), o) : i;
                  }),
                  (o.clamp = function (t) {
                    return arguments.length ? (r.clamp(t), o) : r.clamp();
                  }),
                  (o.unknown = function (t) {
                    return arguments.length ? ((e = t), o) : e;
                  }),
                  (o.copy = function () {
                    return t(r.domain(), n)
                      .round(i)
                      .clamp(r.clamp())
                      .unknown(e);
                  }),
                  tv.C.apply(o, arguments),
                  tk(o)
                );
              },
            scaleSequential: () =>
              function t() {
                var e = tk(rF()(ts));
                return (
                  (e.copy = function () {
                    return rq(e, t());
                  }),
                  tv.K.apply(e, arguments)
                );
              },
            scaleSequentialLog: () =>
              function t() {
                var e = tR(rF()).domain([1, 10]);
                return (
                  (e.copy = function () {
                    return rq(e, t()).base(e.base());
                  }),
                  tv.K.apply(e, arguments)
                );
              },
            scaleSequentialPow: () => r$,
            scaleSequentialQuantile: () =>
              function t() {
                var e = [],
                  r = ts;
                function n(t) {
                  if (null != t && !isNaN((t *= 1)))
                    return r((b(e, t, 1) - 1) / (e.length - 1));
                }
                return (
                  (n.domain = function (t) {
                    if (!arguments.length) return e.slice();
                    for (let r of ((e = []), t))
                      null == r || isNaN((r *= 1)) || e.push(r);
                    return e.sort(p), n;
                  }),
                  (n.interpolator = function (t) {
                    return arguments.length ? ((r = t), n) : r;
                  }),
                  (n.range = function () {
                    return e.map((t, n) => r(n / (e.length - 1)));
                  }),
                  (n.quantiles = function (t) {
                    return Array.from({ length: t + 1 }, (r, n) =>
                      (function (t, e, r) {
                        if (
                          !(
                            !(n = (t = Float64Array.from(
                              (function* (t, e) {
                                if (void 0 === e)
                                  for (let e of t)
                                    null != e && (e *= 1) >= e && (yield e);
                                else {
                                  let r = -1;
                                  for (let n of t)
                                    null != (n = e(n, ++r, t)) &&
                                      (n *= 1) >= n &&
                                      (yield n);
                                }
                              })(t, void 0),
                            )).length) || isNaN((e *= 1))
                          )
                        ) {
                          if (e <= 0 || n < 2) return tJ(t);
                          if (e >= 1) return tG(t);
                          var n,
                            i = (n - 1) * e,
                            o = Math.floor(i),
                            a = tG(
                              (function t(e, r, n = 0, i = 1 / 0, o) {
                                if (
                                  ((r = Math.floor(r)),
                                  (n = Math.floor(Math.max(0, n))),
                                  (i = Math.floor(Math.min(e.length - 1, i))),
                                  !(n <= r && r <= i))
                                )
                                  return e;
                                for (
                                  o =
                                    void 0 === o
                                      ? tY
                                      : (function (t = p) {
                                          if (t === p) return tY;
                                          if ("function" != typeof t)
                                            throw TypeError(
                                              "compare is not a function",
                                            );
                                          return (e, r) => {
                                            let n = t(e, r);
                                            return n || 0 === n
                                              ? n
                                              : (0 === t(r, r)) -
                                                  (0 === t(e, e));
                                          };
                                        })(o);
                                  i > n;

                                ) {
                                  if (i - n > 600) {
                                    let a = i - n + 1,
                                      c = r - n + 1,
                                      u = Math.log(a),
                                      s = 0.5 * Math.exp((2 * u) / 3),
                                      l =
                                        0.5 *
                                        Math.sqrt((u * s * (a - s)) / a) *
                                        (c - a / 2 < 0 ? -1 : 1),
                                      f = Math.max(
                                        n,
                                        Math.floor(r - (c * s) / a + l),
                                      ),
                                      p = Math.min(
                                        i,
                                        Math.floor(r + ((a - c) * s) / a + l),
                                      );
                                    t(e, r, f, p, o);
                                  }
                                  let a = e[r],
                                    c = n,
                                    u = i;
                                  for (
                                    tZ(e, n, r), o(e[i], a) > 0 && tZ(e, n, i);
                                    c < u;

                                  ) {
                                    for (
                                      tZ(e, c, u), ++c, --u;
                                      0 > o(e[c], a);

                                    )
                                      ++c;
                                    for (; o(e[u], a) > 0; ) --u;
                                  }
                                  0 === o(e[n], a)
                                    ? tZ(e, n, u)
                                    : tZ(e, ++u, i),
                                    u <= r && (n = u + 1),
                                    r <= u && (i = u - 1);
                                }
                                return e;
                              })(t, o).subarray(0, o + 1),
                            );
                          return a + (tJ(t.subarray(o + 1)) - a) * (i - o);
                        }
                      })(e, n / t),
                    );
                  }),
                  (n.copy = function () {
                    return t(r).domain(e);
                  }),
                  tv.K.apply(n, arguments)
                );
              },
            scaleSequentialSqrt: () => rW,
            scaleSequentialSymlog: () =>
              function t() {
                var e = tU(rF());
                return (
                  (e.copy = function () {
                    return rq(e, t()).constant(e.constant());
                  }),
                  tv.K.apply(e, arguments)
                );
              },
            scaleSqrt: () => tV,
            scaleSymlog: () =>
              function t() {
                var e = tU(td());
                return (
                  (e.copy = function () {
                    return th(e, t()).constant(e.constant());
                  }),
                  tv.C.apply(e, arguments)
                );
              },
            scaleThreshold: () =>
              function t() {
                var e,
                  r = [0.5],
                  n = [0, 1],
                  i = 1;
                function o(t) {
                  return null != t && t <= t ? n[b(r, t, 0, i)] : e;
                }
                return (
                  (o.domain = function (t) {
                    return arguments.length
                      ? ((i = Math.min(
                          (r = Array.from(t)).length,
                          n.length - 1,
                        )),
                        o)
                      : r.slice();
                  }),
                  (o.range = function (t) {
                    return arguments.length
                      ? ((n = Array.from(t)),
                        (i = Math.min(r.length, n.length - 1)),
                        o)
                      : n.slice();
                  }),
                  (o.invertExtent = function (t) {
                    var e = n.indexOf(t);
                    return [r[e - 1], r[e]];
                  }),
                  (o.unknown = function (t) {
                    return arguments.length ? ((e = t), o) : e;
                  }),
                  (o.copy = function () {
                    return t().domain(r).range(n).unknown(e);
                  }),
                  tv.C.apply(o, arguments)
                );
              },
            scaleTime: () => rz,
            scaleUtc: () => rU,
            tickFormat: () => tE,
          });
        var i = r(34574);
        let o = Math.sqrt(50),
          a = Math.sqrt(10),
          c = Math.sqrt(2);
        function u(t, e, r) {
          let n,
            i,
            s,
            l = (e - t) / Math.max(0, r),
            f = Math.floor(Math.log10(l)),
            p = l / Math.pow(10, f),
            h = p >= o ? 10 : p >= a ? 5 : p >= c ? 2 : 1;
          return (f < 0
            ? ((n = Math.round(t * (s = Math.pow(10, -f) / h))),
              (i = Math.round(e * s)),
              n / s < t && ++n,
              i / s > e && --i,
              (s = -s))
            : ((n = Math.round(t / (s = Math.pow(10, f) * h))),
              (i = Math.round(e / s)),
              n * s < t && ++n,
              i * s > e && --i),
          i < n && 0.5 <= r && r < 2)
            ? u(t, e, 2 * r)
            : [n, i, s];
        }
        function s(t, e, r) {
          if (((e *= 1), (t *= 1), !((r *= 1) > 0))) return [];
          if (t === e) return [t];
          let n = e < t,
            [i, o, a] = n ? u(e, t, r) : u(t, e, r);
          if (!(o >= i)) return [];
          let c = o - i + 1,
            s = Array(c);
          if (n)
            if (a < 0) for (let t = 0; t < c; ++t) s[t] = -((o - t) / a);
            else for (let t = 0; t < c; ++t) s[t] = (o - t) * a;
          else if (a < 0) for (let t = 0; t < c; ++t) s[t] = -((i + t) / a);
          else for (let t = 0; t < c; ++t) s[t] = (i + t) * a;
          return s;
        }
        function l(t, e, r) {
          return u((t *= 1), (e *= 1), (r *= 1))[2];
        }
        function f(t, e, r) {
          (e *= 1), (t *= 1), (r *= 1);
          let n = e < t,
            i = n ? l(e, t, r) : l(t, e, r);
          return (n ? -1 : 1) * (i < 0 ? -(1 / i) : i);
        }
        function p(t, e) {
          return null == t || null == e
            ? NaN
            : t < e
              ? -1
              : t > e
                ? 1
                : t >= e
                  ? 0
                  : NaN;
        }
        function h(t, e) {
          return null == t || null == e
            ? NaN
            : e < t
              ? -1
              : e > t
                ? 1
                : e >= t
                  ? 0
                  : NaN;
        }
        function d(t) {
          let e, r, n;
          function i(t, n, o = 0, a = t.length) {
            if (o < a) {
              if (0 !== e(n, n)) return a;
              do {
                let e = (o + a) >>> 1;
                0 > r(t[e], n) ? (o = e + 1) : (a = e);
              } while (o < a);
            }
            return o;
          }
          return (
            2 !== t.length
              ? ((e = p), (r = (e, r) => p(t(e), r)), (n = (e, r) => t(e) - r))
              : ((e = t === p || t === h ? t : y), (r = t), (n = t)),
            {
              left: i,
              center: function (t, e, r = 0, o = t.length) {
                let a = i(t, e, r, o - 1);
                return a > r && n(t[a - 1], e) > -n(t[a], e) ? a - 1 : a;
              },
              right: function (t, n, i = 0, o = t.length) {
                if (i < o) {
                  if (0 !== e(n, n)) return o;
                  do {
                    let e = (i + o) >>> 1;
                    0 >= r(t[e], n) ? (i = e + 1) : (o = e);
                  } while (i < o);
                }
                return i;
              },
            }
          );
        }
        function y() {
          return 0;
        }
        function v(t) {
          return null === t ? NaN : +t;
        }
        let m = d(p),
          b = m.right;
        function g(t, e, r) {
          (t.prototype = e.prototype = r), (r.constructor = t);
        }
        function x(t, e) {
          var r = Object.create(t.prototype);
          for (var n in e) r[n] = e[n];
          return r;
        }
        function w() {}
        m.left, d(v).center;
        var O = "\\s*([+-]?\\d+)\\s*",
          j = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*",
          S = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*",
          A = /^#([0-9a-f]{3,8})$/,
          P = RegExp(`^rgb\\(${O},${O},${O}\\)$`),
          E = RegExp(`^rgb\\(${S},${S},${S}\\)$`),
          k = RegExp(`^rgba\\(${O},${O},${O},${j}\\)$`),
          _ = RegExp(`^rgba\\(${S},${S},${S},${j}\\)$`),
          M = RegExp(`^hsl\\(${j},${S},${S}\\)$`),
          T = RegExp(`^hsla\\(${j},${S},${S},${j}\\)$`),
          C = {
            aliceblue: 0xf0f8ff,
            antiquewhite: 0xfaebd7,
            aqua: 65535,
            aquamarine: 8388564,
            azure: 0xf0ffff,
            beige: 0xf5f5dc,
            bisque: 0xffe4c4,
            black: 0,
            blanchedalmond: 0xffebcd,
            blue: 255,
            blueviolet: 9055202,
            brown: 0xa52a2a,
            burlywood: 0xdeb887,
            cadetblue: 6266528,
            chartreuse: 8388352,
            chocolate: 0xd2691e,
            coral: 0xff7f50,
            cornflowerblue: 6591981,
            cornsilk: 0xfff8dc,
            crimson: 0xdc143c,
            cyan: 65535,
            darkblue: 139,
            darkcyan: 35723,
            darkgoldenrod: 0xb8860b,
            darkgray: 0xa9a9a9,
            darkgreen: 25600,
            darkgrey: 0xa9a9a9,
            darkkhaki: 0xbdb76b,
            darkmagenta: 9109643,
            darkolivegreen: 5597999,
            darkorange: 0xff8c00,
            darkorchid: 0x9932cc,
            darkred: 9109504,
            darksalmon: 0xe9967a,
            darkseagreen: 9419919,
            darkslateblue: 4734347,
            darkslategray: 3100495,
            darkslategrey: 3100495,
            darkturquoise: 52945,
            darkviolet: 9699539,
            deeppink: 0xff1493,
            deepskyblue: 49151,
            dimgray: 6908265,
            dimgrey: 6908265,
            dodgerblue: 2003199,
            firebrick: 0xb22222,
            floralwhite: 0xfffaf0,
            forestgreen: 2263842,
            fuchsia: 0xff00ff,
            gainsboro: 0xdcdcdc,
            ghostwhite: 0xf8f8ff,
            gold: 0xffd700,
            goldenrod: 0xdaa520,
            gray: 8421504,
            green: 32768,
            greenyellow: 0xadff2f,
            grey: 8421504,
            honeydew: 0xf0fff0,
            hotpink: 0xff69b4,
            indianred: 0xcd5c5c,
            indigo: 4915330,
            ivory: 0xfffff0,
            khaki: 0xf0e68c,
            lavender: 0xe6e6fa,
            lavenderblush: 0xfff0f5,
            lawngreen: 8190976,
            lemonchiffon: 0xfffacd,
            lightblue: 0xadd8e6,
            lightcoral: 0xf08080,
            lightcyan: 0xe0ffff,
            lightgoldenrodyellow: 0xfafad2,
            lightgray: 0xd3d3d3,
            lightgreen: 9498256,
            lightgrey: 0xd3d3d3,
            lightpink: 0xffb6c1,
            lightsalmon: 0xffa07a,
            lightseagreen: 2142890,
            lightskyblue: 8900346,
            lightslategray: 7833753,
            lightslategrey: 7833753,
            lightsteelblue: 0xb0c4de,
            lightyellow: 0xffffe0,
            lime: 65280,
            limegreen: 3329330,
            linen: 0xfaf0e6,
            magenta: 0xff00ff,
            maroon: 8388608,
            mediumaquamarine: 6737322,
            mediumblue: 205,
            mediumorchid: 0xba55d3,
            mediumpurple: 9662683,
            mediumseagreen: 3978097,
            mediumslateblue: 8087790,
            mediumspringgreen: 64154,
            mediumturquoise: 4772300,
            mediumvioletred: 0xc71585,
            midnightblue: 1644912,
            mintcream: 0xf5fffa,
            mistyrose: 0xffe4e1,
            moccasin: 0xffe4b5,
            navajowhite: 0xffdead,
            navy: 128,
            oldlace: 0xfdf5e6,
            olive: 8421376,
            olivedrab: 7048739,
            orange: 0xffa500,
            orangered: 0xff4500,
            orchid: 0xda70d6,
            palegoldenrod: 0xeee8aa,
            palegreen: 0x98fb98,
            paleturquoise: 0xafeeee,
            palevioletred: 0xdb7093,
            papayawhip: 0xffefd5,
            peachpuff: 0xffdab9,
            peru: 0xcd853f,
            pink: 0xffc0cb,
            plum: 0xdda0dd,
            powderblue: 0xb0e0e6,
            purple: 8388736,
            rebeccapurple: 6697881,
            red: 0xff0000,
            rosybrown: 0xbc8f8f,
            royalblue: 4286945,
            saddlebrown: 9127187,
            salmon: 0xfa8072,
            sandybrown: 0xf4a460,
            seagreen: 3050327,
            seashell: 0xfff5ee,
            sienna: 0xa0522d,
            silver: 0xc0c0c0,
            skyblue: 8900331,
            slateblue: 6970061,
            slategray: 7372944,
            slategrey: 7372944,
            snow: 0xfffafa,
            springgreen: 65407,
            steelblue: 4620980,
            tan: 0xd2b48c,
            teal: 32896,
            thistle: 0xd8bfd8,
            tomato: 0xff6347,
            turquoise: 4251856,
            violet: 0xee82ee,
            wheat: 0xf5deb3,
            white: 0xffffff,
            whitesmoke: 0xf5f5f5,
            yellow: 0xffff00,
            yellowgreen: 0x9acd32,
          };
        function N() {
          return this.rgb().formatHex();
        }
        function I() {
          return this.rgb().formatRgb();
        }
        function D(t) {
          var e, r;
          return (
            (t = (t + "").trim().toLowerCase()),
            (e = A.exec(t))
              ? ((r = e[1].length),
                (e = parseInt(e[1], 16)),
                6 === r
                  ? B(e)
                  : 3 === r
                    ? new z(
                        ((e >> 8) & 15) | ((e >> 4) & 240),
                        ((e >> 4) & 15) | (240 & e),
                        ((15 & e) << 4) | (15 & e),
                        1,
                      )
                    : 8 === r
                      ? R(
                          (e >> 24) & 255,
                          (e >> 16) & 255,
                          (e >> 8) & 255,
                          (255 & e) / 255,
                        )
                      : 4 === r
                        ? R(
                            ((e >> 12) & 15) | ((e >> 8) & 240),
                            ((e >> 8) & 15) | ((e >> 4) & 240),
                            ((e >> 4) & 15) | (240 & e),
                            (((15 & e) << 4) | (15 & e)) / 255,
                          )
                        : null)
              : (e = P.exec(t))
                ? new z(e[1], e[2], e[3], 1)
                : (e = E.exec(t))
                  ? new z(
                      (255 * e[1]) / 100,
                      (255 * e[2]) / 100,
                      (255 * e[3]) / 100,
                      1,
                    )
                  : (e = k.exec(t))
                    ? R(e[1], e[2], e[3], e[4])
                    : (e = _.exec(t))
                      ? R(
                          (255 * e[1]) / 100,
                          (255 * e[2]) / 100,
                          (255 * e[3]) / 100,
                          e[4],
                        )
                      : (e = M.exec(t))
                        ? X(e[1], e[2] / 100, e[3] / 100, 1)
                        : (e = T.exec(t))
                          ? X(e[1], e[2] / 100, e[3] / 100, e[4])
                          : C.hasOwnProperty(t)
                            ? B(C[t])
                            : "transparent" === t
                              ? new z(NaN, NaN, NaN, 0)
                              : null
          );
        }
        function B(t) {
          return new z((t >> 16) & 255, (t >> 8) & 255, 255 & t, 1);
        }
        function R(t, e, r, n) {
          return n <= 0 && (t = e = r = NaN), new z(t, e, r, n);
        }
        function L(t, e, r, n) {
          var i;
          return 1 == arguments.length
            ? ((i = t) instanceof w || (i = D(i)), i)
              ? new z((i = i.rgb()).r, i.g, i.b, i.opacity)
              : new z()
            : new z(t, e, r, null == n ? 1 : n);
        }
        function z(t, e, r, n) {
          (this.r = +t), (this.g = +e), (this.b = +r), (this.opacity = +n);
        }
        function U() {
          return `#${W(this.r)}${W(this.g)}${W(this.b)}`;
        }
        function F() {
          let t = q(this.opacity);
          return `${1 === t ? "rgb(" : "rgba("}${$(this.r)}, ${$(this.g)}, ${$(this.b)}${1 === t ? ")" : `, ${t})`}`;
        }
        function q(t) {
          return isNaN(t) ? 1 : Math.max(0, Math.min(1, t));
        }
        function $(t) {
          return Math.max(0, Math.min(255, Math.round(t) || 0));
        }
        function W(t) {
          return ((t = $(t)) < 16 ? "0" : "") + t.toString(16);
        }
        function X(t, e, r, n) {
          return (
            n <= 0
              ? (t = e = r = NaN)
              : r <= 0 || r >= 1
                ? (t = e = NaN)
                : e <= 0 && (t = NaN),
            new V(t, e, r, n)
          );
        }
        function H(t) {
          if (t instanceof V) return new V(t.h, t.s, t.l, t.opacity);
          if ((t instanceof w || (t = D(t)), !t)) return new V();
          if (t instanceof V) return t;
          var e = (t = t.rgb()).r / 255,
            r = t.g / 255,
            n = t.b / 255,
            i = Math.min(e, r, n),
            o = Math.max(e, r, n),
            a = NaN,
            c = o - i,
            u = (o + i) / 2;
          return (
            c
              ? ((a =
                  e === o
                    ? (r - n) / c + (r < n) * 6
                    : r === o
                      ? (n - e) / c + 2
                      : (e - r) / c + 4),
                (c /= u < 0.5 ? o + i : 2 - o - i),
                (a *= 60))
              : (c = u > 0 && u < 1 ? 0 : a),
            new V(a, c, u, t.opacity)
          );
        }
        function V(t, e, r, n) {
          (this.h = +t), (this.s = +e), (this.l = +r), (this.opacity = +n);
        }
        function K(t) {
          return (t = (t || 0) % 360) < 0 ? t + 360 : t;
        }
        function G(t) {
          return Math.max(0, Math.min(1, t || 0));
        }
        function J(t, e, r) {
          return (
            (t < 60
              ? e + ((r - e) * t) / 60
              : t < 180
                ? r
                : t < 240
                  ? e + ((r - e) * (240 - t)) / 60
                  : e) * 255
          );
        }
        function Y(t, e, r, n, i) {
          var o = t * t,
            a = o * t;
          return (
            ((1 - 3 * t + 3 * o - a) * e +
              (4 - 6 * o + 3 * a) * r +
              (1 + 3 * t + 3 * o - 3 * a) * n +
              a * i) /
            6
          );
        }
        g(w, D, {
          copy(t) {
            return Object.assign(new this.constructor(), this, t);
          },
          displayable() {
            return this.rgb().displayable();
          },
          hex: N,
          formatHex: N,
          formatHex8: function () {
            return this.rgb().formatHex8();
          },
          formatHsl: function () {
            return H(this).formatHsl();
          },
          formatRgb: I,
          toString: I,
        }),
          g(
            z,
            L,
            x(w, {
              brighter(t) {
                return (
                  (t =
                    null == t
                      ? 1.4285714285714286
                      : Math.pow(1.4285714285714286, t)),
                  new z(this.r * t, this.g * t, this.b * t, this.opacity)
                );
              },
              darker(t) {
                return (
                  (t = null == t ? 0.7 : Math.pow(0.7, t)),
                  new z(this.r * t, this.g * t, this.b * t, this.opacity)
                );
              },
              rgb() {
                return this;
              },
              clamp() {
                return new z($(this.r), $(this.g), $(this.b), q(this.opacity));
              },
              displayable() {
                return (
                  -0.5 <= this.r &&
                  this.r < 255.5 &&
                  -0.5 <= this.g &&
                  this.g < 255.5 &&
                  -0.5 <= this.b &&
                  this.b < 255.5 &&
                  0 <= this.opacity &&
                  this.opacity <= 1
                );
              },
              hex: U,
              formatHex: U,
              formatHex8: function () {
                return `#${W(this.r)}${W(this.g)}${W(this.b)}${W((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
              },
              formatRgb: F,
              toString: F,
            }),
          ),
          g(
            V,
            function (t, e, r, n) {
              return 1 == arguments.length
                ? H(t)
                : new V(t, e, r, null == n ? 1 : n);
            },
            x(w, {
              brighter(t) {
                return (
                  (t =
                    null == t
                      ? 1.4285714285714286
                      : Math.pow(1.4285714285714286, t)),
                  new V(this.h, this.s, this.l * t, this.opacity)
                );
              },
              darker(t) {
                return (
                  (t = null == t ? 0.7 : Math.pow(0.7, t)),
                  new V(this.h, this.s, this.l * t, this.opacity)
                );
              },
              rgb() {
                var t = (this.h % 360) + (this.h < 0) * 360,
                  e = isNaN(t) || isNaN(this.s) ? 0 : this.s,
                  r = this.l,
                  n = r + (r < 0.5 ? r : 1 - r) * e,
                  i = 2 * r - n;
                return new z(
                  J(t >= 240 ? t - 240 : t + 120, i, n),
                  J(t, i, n),
                  J(t < 120 ? t + 240 : t - 120, i, n),
                  this.opacity,
                );
              },
              clamp() {
                return new V(K(this.h), G(this.s), G(this.l), q(this.opacity));
              },
              displayable() {
                return (
                  ((0 <= this.s && this.s <= 1) || isNaN(this.s)) &&
                  0 <= this.l &&
                  this.l <= 1 &&
                  0 <= this.opacity &&
                  this.opacity <= 1
                );
              },
              formatHsl() {
                let t = q(this.opacity);
                return `${1 === t ? "hsl(" : "hsla("}${K(this.h)}, ${100 * G(this.s)}%, ${100 * G(this.l)}%${1 === t ? ")" : `, ${t})`}`;
              },
            }),
          );
        let Z = (t) => () => t;
        function Q(t, e) {
          var r,
            n,
            i = e - t;
          return i
            ? ((r = t),
              (n = i),
              function (t) {
                return r + t * n;
              })
            : Z(isNaN(t) ? e : t);
        }
        let tt = (function t(e) {
          var r,
            n =
              1 == (r = +e)
                ? Q
                : function (t, e) {
                    var n, i, o;
                    return e - t
                      ? ((n = t),
                        (i = e),
                        (n = Math.pow(n, (o = r))),
                        (i = Math.pow(i, o) - n),
                        (o = 1 / o),
                        function (t) {
                          return Math.pow(n + t * i, o);
                        })
                      : Z(isNaN(t) ? e : t);
                  };
          function i(t, e) {
            var r = n((t = L(t)).r, (e = L(e)).r),
              i = n(t.g, e.g),
              o = n(t.b, e.b),
              a = Q(t.opacity, e.opacity);
            return function (e) {
              return (
                (t.r = r(e)),
                (t.g = i(e)),
                (t.b = o(e)),
                (t.opacity = a(e)),
                t + ""
              );
            };
          }
          return (i.gamma = t), i;
        })(1);
        function te(t) {
          return function (e) {
            var r,
              n,
              i = e.length,
              o = Array(i),
              a = Array(i),
              c = Array(i);
            for (r = 0; r < i; ++r)
              (n = L(e[r])),
                (o[r] = n.r || 0),
                (a[r] = n.g || 0),
                (c[r] = n.b || 0);
            return (
              (o = t(o)),
              (a = t(a)),
              (c = t(c)),
              (n.opacity = 1),
              function (t) {
                return (n.r = o(t)), (n.g = a(t)), (n.b = c(t)), n + "";
              }
            );
          };
        }
        te(function (t) {
          var e = t.length - 1;
          return function (r) {
            var n =
                r <= 0
                  ? (r = 0)
                  : r >= 1
                    ? ((r = 1), e - 1)
                    : Math.floor(r * e),
              i = t[n],
              o = t[n + 1],
              a = n > 0 ? t[n - 1] : 2 * i - o,
              c = n < e - 1 ? t[n + 2] : 2 * o - i;
            return Y((r - n / e) * e, a, i, o, c);
          };
        }),
          te(function (t) {
            var e = t.length;
            return function (r) {
              var n = Math.floor(((r %= 1) < 0 ? ++r : r) * e),
                i = t[(n + e - 1) % e],
                o = t[n % e],
                a = t[(n + 1) % e],
                c = t[(n + 2) % e];
              return Y((r - n / e) * e, i, o, a, c);
            };
          });
        function tr(t, e) {
          return (
            (t *= 1),
            (e *= 1),
            function (r) {
              return t * (1 - r) + e * r;
            }
          );
        }
        var tn = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g,
          ti = RegExp(tn.source, "g");
        function to(t, e) {
          var r,
            n,
            i = typeof e;
          return null == e || "boolean" === i
            ? Z(e)
            : ("number" === i
                ? tr
                : "string" === i
                  ? (n = D(e))
                    ? ((e = n), tt)
                    : function (t, e) {
                        var r,
                          n,
                          i,
                          o,
                          a,
                          c = (tn.lastIndex = ti.lastIndex = 0),
                          u = -1,
                          s = [],
                          l = [];
                        for (
                          t += "", e += "";
                          (i = tn.exec(t)) && (o = ti.exec(e));

                        )
                          (a = o.index) > c &&
                            ((a = e.slice(c, a)),
                            s[u] ? (s[u] += a) : (s[++u] = a)),
                            (i = i[0]) === (o = o[0])
                              ? s[u]
                                ? (s[u] += o)
                                : (s[++u] = o)
                              : ((s[++u] = null),
                                l.push({ i: u, x: tr(i, o) })),
                            (c = ti.lastIndex);
                        return (
                          c < e.length &&
                            ((a = e.slice(c)),
                            s[u] ? (s[u] += a) : (s[++u] = a)),
                          s.length < 2
                            ? l[0]
                              ? ((r = l[0].x),
                                function (t) {
                                  return r(t) + "";
                                })
                              : ((n = e),
                                function () {
                                  return n;
                                })
                            : ((e = l.length),
                              function (t) {
                                for (var r, n = 0; n < e; ++n)
                                  s[(r = l[n]).i] = r.x(t);
                                return s.join("");
                              })
                        );
                      }
                  : e instanceof D
                    ? tt
                    : e instanceof Date
                      ? function (t, e) {
                          var r = new Date();
                          return (
                            (t *= 1),
                            (e *= 1),
                            function (n) {
                              return r.setTime(t * (1 - n) + e * n), r;
                            }
                          );
                        }
                      : !ArrayBuffer.isView((r = e)) || r instanceof DataView
                        ? Array.isArray(e)
                          ? function (t, e) {
                              var r,
                                n = e ? e.length : 0,
                                i = t ? Math.min(n, t.length) : 0,
                                o = Array(i),
                                a = Array(n);
                              for (r = 0; r < i; ++r) o[r] = to(t[r], e[r]);
                              for (; r < n; ++r) a[r] = e[r];
                              return function (t) {
                                for (r = 0; r < i; ++r) a[r] = o[r](t);
                                return a;
                              };
                            }
                          : ("function" != typeof e.valueOf &&
                                "function" != typeof e.toString) ||
                              isNaN(e)
                            ? function (t, e) {
                                var r,
                                  n = {},
                                  i = {};
                                for (r in ((null === t ||
                                  "object" != typeof t) &&
                                  (t = {}),
                                (null === e || "object" != typeof e) &&
                                  (e = {}),
                                e))
                                  r in t
                                    ? (n[r] = to(t[r], e[r]))
                                    : (i[r] = e[r]);
                                return function (t) {
                                  for (r in n) i[r] = n[r](t);
                                  return i;
                                };
                              }
                            : tr
                        : function (t, e) {
                            e || (e = []);
                            var r,
                              n = t ? Math.min(e.length, t.length) : 0,
                              i = e.slice();
                            return function (o) {
                              for (r = 0; r < n; ++r)
                                i[r] = t[r] * (1 - o) + e[r] * o;
                              return i;
                            };
                          })(t, e);
        }
        function ta(t, e) {
          return (
            (t *= 1),
            (e *= 1),
            function (r) {
              return Math.round(t * (1 - r) + e * r);
            }
          );
        }
        function tc(t) {
          return +t;
        }
        var tu = [0, 1];
        function ts(t) {
          return t;
        }
        function tl(t, e) {
          var r;
          return (e -= t *= 1)
            ? function (r) {
                return (r - t) / e;
              }
            : ((r = isNaN(e) ? NaN : 0.5),
              function () {
                return r;
              });
        }
        function tf(t, e, r) {
          var n = t[0],
            i = t[1],
            o = e[0],
            a = e[1];
          return (
            i < n
              ? ((n = tl(i, n)), (o = r(a, o)))
              : ((n = tl(n, i)), (o = r(o, a))),
            function (t) {
              return o(n(t));
            }
          );
        }
        function tp(t, e, r) {
          var n = Math.min(t.length, e.length) - 1,
            i = Array(n),
            o = Array(n),
            a = -1;
          for (
            t[n] < t[0] &&
            ((t = t.slice().reverse()), (e = e.slice().reverse()));
            ++a < n;

          )
            (i[a] = tl(t[a], t[a + 1])), (o[a] = r(e[a], e[a + 1]));
          return function (e) {
            var r = b(t, e, 1, n) - 1;
            return o[r](i[r](e));
          };
        }
        function th(t, e) {
          return e
            .domain(t.domain())
            .range(t.range())
            .interpolate(t.interpolate())
            .clamp(t.clamp())
            .unknown(t.unknown());
        }
        function td() {
          var t,
            e,
            r,
            n,
            i,
            o,
            a = tu,
            c = tu,
            u = to,
            s = ts;
          function l() {
            var t,
              e,
              r,
              u = Math.min(a.length, c.length);
            return (
              s !== ts &&
                ((t = a[0]),
                (e = a[u - 1]),
                t > e && ((r = t), (t = e), (e = r)),
                (s = function (r) {
                  return Math.max(t, Math.min(e, r));
                })),
              (n = u > 2 ? tp : tf),
              (i = o = null),
              f
            );
          }
          function f(e) {
            return null == e || isNaN((e *= 1))
              ? r
              : (i || (i = n(a.map(t), c, u)))(t(s(e)));
          }
          return (
            (f.invert = function (r) {
              return s(e((o || (o = n(c, a.map(t), tr)))(r)));
            }),
            (f.domain = function (t) {
              return arguments.length
                ? ((a = Array.from(t, tc)), l())
                : a.slice();
            }),
            (f.range = function (t) {
              return arguments.length ? ((c = Array.from(t)), l()) : c.slice();
            }),
            (f.rangeRound = function (t) {
              return (c = Array.from(t)), (u = ta), l();
            }),
            (f.clamp = function (t) {
              return arguments.length ? ((s = !!t || ts), l()) : s !== ts;
            }),
            (f.interpolate = function (t) {
              return arguments.length ? ((u = t), l()) : u;
            }),
            (f.unknown = function (t) {
              return arguments.length ? ((r = t), f) : r;
            }),
            function (r, n) {
              return (t = r), (e = n), l();
            }
          );
        }
        function ty() {
          return td()(ts, ts);
        }
        var tv = r(7154),
          tm =
            /^(?:(.)?([<>=^]))?([+\-( ])?([$#])?(0)?(\d+)?(,)?(\.\d+)?(~)?([a-z%])?$/i;
        function tb(t) {
          var e;
          if (!(e = tm.exec(t))) throw Error("invalid format: " + t);
          return new tg({
            fill: e[1],
            align: e[2],
            sign: e[3],
            symbol: e[4],
            zero: e[5],
            width: e[6],
            comma: e[7],
            precision: e[8] && e[8].slice(1),
            trim: e[9],
            type: e[10],
          });
        }
        function tg(t) {
          (this.fill = void 0 === t.fill ? " " : t.fill + ""),
            (this.align = void 0 === t.align ? ">" : t.align + ""),
            (this.sign = void 0 === t.sign ? "-" : t.sign + ""),
            (this.symbol = void 0 === t.symbol ? "" : t.symbol + ""),
            (this.zero = !!t.zero),
            (this.width = void 0 === t.width ? void 0 : +t.width),
            (this.comma = !!t.comma),
            (this.precision = void 0 === t.precision ? void 0 : +t.precision),
            (this.trim = !!t.trim),
            (this.type = void 0 === t.type ? "" : t.type + "");
        }
        function tx(t, e) {
          if (
            (r = (t = e ? t.toExponential(e - 1) : t.toExponential()).indexOf(
              "e",
            )) < 0
          )
            return null;
          var r,
            n = t.slice(0, r);
          return [n.length > 1 ? n[0] + n.slice(2) : n, +t.slice(r + 1)];
        }
        function tw(t) {
          return (t = tx(Math.abs(t))) ? t[1] : NaN;
        }
        function tO(t, e) {
          var r = tx(t, e);
          if (!r) return t + "";
          var n = r[0],
            i = r[1];
          return i < 0
            ? "0." + Array(-i).join("0") + n
            : n.length > i + 1
              ? n.slice(0, i + 1) + "." + n.slice(i + 1)
              : n + Array(i - n.length + 2).join("0");
        }
        (tb.prototype = tg.prototype),
          (tg.prototype.toString = function () {
            return (
              this.fill +
              this.align +
              this.sign +
              this.symbol +
              (this.zero ? "0" : "") +
              (void 0 === this.width ? "" : Math.max(1, 0 | this.width)) +
              (this.comma ? "," : "") +
              (void 0 === this.precision
                ? ""
                : "." + Math.max(0, 0 | this.precision)) +
              (this.trim ? "~" : "") +
              this.type
            );
          });
        let tj = {
          "%": (t, e) => (100 * t).toFixed(e),
          b: (t) => Math.round(t).toString(2),
          c: (t) => t + "",
          d: function (t) {
            return Math.abs((t = Math.round(t))) >= 1e21
              ? t.toLocaleString("en").replace(/,/g, "")
              : t.toString(10);
          },
          e: (t, e) => t.toExponential(e),
          f: (t, e) => t.toFixed(e),
          g: (t, e) => t.toPrecision(e),
          o: (t) => Math.round(t).toString(8),
          p: (t, e) => tO(100 * t, e),
          r: tO,
          s: function (t, e) {
            var r = tx(t, e);
            if (!r) return t + "";
            var n = r[0],
              i = r[1],
              o =
                i - (r0 = 3 * Math.max(-8, Math.min(8, Math.floor(i / 3)))) + 1,
              a = n.length;
            return o === a
              ? n
              : o > a
                ? n + Array(o - a + 1).join("0")
                : o > 0
                  ? n.slice(0, o) + "." + n.slice(o)
                  : "0." +
                    Array(1 - o).join("0") +
                    tx(t, Math.max(0, e + o - 1))[0];
          },
          X: (t) => Math.round(t).toString(16).toUpperCase(),
          x: (t) => Math.round(t).toString(16),
        };
        function tS(t) {
          return t;
        }
        var tA = Array.prototype.map,
          tP = [
            "y",
            "z",
            "a",
            "f",
            "p",
            "n",
            "\xb5",
            "m",
            "",
            "k",
            "M",
            "G",
            "T",
            "P",
            "E",
            "Z",
            "Y",
          ];
        function tE(t, e, r, n) {
          var i,
            o,
            a,
            c = f(t, e, r);
          switch ((n = tb(null == n ? ",f" : n)).type) {
            case "s":
              var u = Math.max(Math.abs(t), Math.abs(e));
              return (
                null != n.precision ||
                  isNaN(
                    (a = Math.max(
                      0,
                      3 * Math.max(-8, Math.min(8, Math.floor(tw(u) / 3))) -
                        tw(Math.abs(c)),
                    )),
                  ) ||
                  (n.precision = a),
                r8(n, u)
              );
            case "":
            case "e":
            case "g":
            case "p":
            case "r":
              null != n.precision ||
                isNaN(
                  (a =
                    Math.max(
                      0,
                      tw(
                        Math.abs(Math.max(Math.abs(t), Math.abs(e))) -
                          (i = Math.abs((i = c))),
                      ) - tw(i),
                    ) + 1),
                ) ||
                (n.precision = a - ("e" === n.type));
              break;
            case "f":
            case "%":
              null != n.precision ||
                isNaN((a = Math.max(0, -tw(Math.abs(c))))) ||
                (n.precision = a - ("%" === n.type) * 2);
          }
          return r2(n);
        }
        function tk(t) {
          var e = t.domain;
          return (
            (t.ticks = function (t) {
              var r = e();
              return s(r[0], r[r.length - 1], null == t ? 10 : t);
            }),
            (t.tickFormat = function (t, r) {
              var n = e();
              return tE(n[0], n[n.length - 1], null == t ? 10 : t, r);
            }),
            (t.nice = function (r) {
              null == r && (r = 10);
              var n,
                i,
                o = e(),
                a = 0,
                c = o.length - 1,
                u = o[a],
                s = o[c],
                f = 10;
              for (
                s < u && ((i = u), (u = s), (s = i), (i = a), (a = c), (c = i));
                f-- > 0;

              ) {
                if ((i = l(u, s, r)) === n) return (o[a] = u), (o[c] = s), e(o);
                if (i > 0)
                  (u = Math.floor(u / i) * i), (s = Math.ceil(s / i) * i);
                else if (i < 0)
                  (u = Math.ceil(u * i) / i), (s = Math.floor(s * i) / i);
                else break;
                n = i;
              }
              return t;
            }),
            t
          );
        }
        function t_() {
          var t = ty();
          return (
            (t.copy = function () {
              return th(t, t_());
            }),
            tv.C.apply(t, arguments),
            tk(t)
          );
        }
        function tM(t, e) {
          t = t.slice();
          var r,
            n = 0,
            i = t.length - 1,
            o = t[n],
            a = t[i];
          return (
            a < o && ((r = n), (n = i), (i = r), (r = o), (o = a), (a = r)),
            (t[n] = e.floor(o)),
            (t[i] = e.ceil(a)),
            t
          );
        }
        function tT(t) {
          return Math.log(t);
        }
        function tC(t) {
          return Math.exp(t);
        }
        function tN(t) {
          return -Math.log(-t);
        }
        function tI(t) {
          return -Math.exp(-t);
        }
        function tD(t) {
          return isFinite(t) ? +("1e" + t) : t < 0 ? 0 : t;
        }
        function tB(t) {
          return (e, r) => -t(-e, r);
        }
        function tR(t) {
          let e,
            r,
            n = t(tT, tC),
            i = n.domain,
            o = 10;
          function a() {
            var a, c;
            return (
              (e =
                (a = o) === Math.E
                  ? Math.log
                  : (10 === a && Math.log10) ||
                    (2 === a && Math.log2) ||
                    ((a = Math.log(a)), (t) => Math.log(t) / a)),
              (r =
                10 === (c = o)
                  ? tD
                  : c === Math.E
                    ? Math.exp
                    : (t) => Math.pow(c, t)),
              i()[0] < 0 ? ((e = tB(e)), (r = tB(r)), t(tN, tI)) : t(tT, tC),
              n
            );
          }
          return (
            (n.base = function (t) {
              return arguments.length ? ((o = +t), a()) : o;
            }),
            (n.domain = function (t) {
              return arguments.length ? (i(t), a()) : i();
            }),
            (n.ticks = (t) => {
              let n,
                a,
                c = i(),
                u = c[0],
                l = c[c.length - 1],
                f = l < u;
              f && ([u, l] = [l, u]);
              let p = e(u),
                h = e(l),
                d = null == t ? 10 : +t,
                y = [];
              if (!(o % 1) && h - p < d) {
                if (((p = Math.floor(p)), (h = Math.ceil(h)), u > 0)) {
                  for (; p <= h; ++p)
                    for (n = 1; n < o; ++n)
                      if (!((a = p < 0 ? n / r(-p) : n * r(p)) < u)) {
                        if (a > l) break;
                        y.push(a);
                      }
                } else
                  for (; p <= h; ++p)
                    for (n = o - 1; n >= 1; --n)
                      if (!((a = p > 0 ? n / r(-p) : n * r(p)) < u)) {
                        if (a > l) break;
                        y.push(a);
                      }
                2 * y.length < d && (y = s(u, l, d));
              } else y = s(p, h, Math.min(h - p, d)).map(r);
              return f ? y.reverse() : y;
            }),
            (n.tickFormat = (t, i) => {
              if (
                (null == t && (t = 10),
                null == i && (i = 10 === o ? "s" : ","),
                "function" != typeof i &&
                  (o % 1 || null != (i = tb(i)).precision || (i.trim = !0),
                  (i = r2(i))),
                t === 1 / 0)
              )
                return i;
              let a = Math.max(1, (o * t) / n.ticks().length);
              return (t) => {
                let n = t / r(Math.round(e(t)));
                return n * o < o - 0.5 && (n *= o), n <= a ? i(t) : "";
              };
            }),
            (n.nice = () =>
              i(
                tM(i(), {
                  floor: (t) => r(Math.floor(e(t))),
                  ceil: (t) => r(Math.ceil(e(t))),
                }),
              )),
            n
          );
        }
        function tL(t) {
          return function (e) {
            return Math.sign(e) * Math.log1p(Math.abs(e / t));
          };
        }
        function tz(t) {
          return function (e) {
            return Math.sign(e) * Math.expm1(Math.abs(e)) * t;
          };
        }
        function tU(t) {
          var e = 1,
            r = t(tL(1), tz(e));
          return (
            (r.constant = function (r) {
              return arguments.length ? t(tL((e = +r)), tz(e)) : e;
            }),
            tk(r)
          );
        }
        (r2 = (r1 = (function (t) {
          var e,
            r,
            n,
            i =
              void 0 === t.grouping || void 0 === t.thousands
                ? tS
                : ((e = tA.call(t.grouping, Number)),
                  (r = t.thousands + ""),
                  function (t, n) {
                    for (
                      var i = t.length, o = [], a = 0, c = e[0], u = 0;
                      i > 0 &&
                      c > 0 &&
                      (u + c + 1 > n && (c = Math.max(1, n - u)),
                      o.push(t.substring((i -= c), i + c)),
                      !((u += c + 1) > n));

                    )
                      c = e[(a = (a + 1) % e.length)];
                    return o.reverse().join(r);
                  }),
            o = void 0 === t.currency ? "" : t.currency[0] + "",
            a = void 0 === t.currency ? "" : t.currency[1] + "",
            c = void 0 === t.decimal ? "." : t.decimal + "",
            u =
              void 0 === t.numerals
                ? tS
                : ((n = tA.call(t.numerals, String)),
                  function (t) {
                    return t.replace(/[0-9]/g, function (t) {
                      return n[+t];
                    });
                  }),
            s = void 0 === t.percent ? "%" : t.percent + "",
            l = void 0 === t.minus ? "−" : t.minus + "",
            f = void 0 === t.nan ? "NaN" : t.nan + "";
          function p(t) {
            var e = (t = tb(t)).fill,
              r = t.align,
              n = t.sign,
              p = t.symbol,
              h = t.zero,
              d = t.width,
              y = t.comma,
              v = t.precision,
              m = t.trim,
              b = t.type;
            "n" === b
              ? ((y = !0), (b = "g"))
              : tj[b] || (void 0 === v && (v = 12), (m = !0), (b = "g")),
              (h || ("0" === e && "=" === r)) &&
                ((h = !0), (e = "0"), (r = "="));
            var g =
                "$" === p
                  ? o
                  : "#" === p && /[boxX]/.test(b)
                    ? "0" + b.toLowerCase()
                    : "",
              x = "$" === p ? a : /[%p]/.test(b) ? s : "",
              w = tj[b],
              O = /[defgprs%]/.test(b);
            function j(t) {
              var o,
                a,
                s,
                p = g,
                j = x;
              if ("c" === b) (j = w(t) + j), (t = "");
              else {
                var S = (t *= 1) < 0 || 1 / t < 0;
                if (
                  ((t = isNaN(t) ? f : w(Math.abs(t), v)),
                  m &&
                    (t = (function (t) {
                      t: for (var e, r = t.length, n = 1, i = -1; n < r; ++n)
                        switch (t[n]) {
                          case ".":
                            i = e = n;
                            break;
                          case "0":
                            0 === i && (i = n), (e = n);
                            break;
                          default:
                            if (!+t[n]) break t;
                            i > 0 && (i = 0);
                        }
                      return i > 0 ? t.slice(0, i) + t.slice(e + 1) : t;
                    })(t)),
                  S && 0 == +t && "+" !== n && (S = !1),
                  (p =
                    (S
                      ? "(" === n
                        ? n
                        : l
                      : "-" === n || "(" === n
                        ? ""
                        : n) + p),
                  (j =
                    ("s" === b ? tP[8 + r0 / 3] : "") +
                    j +
                    (S && "(" === n ? ")" : "")),
                  O)
                ) {
                  for (o = -1, a = t.length; ++o < a; )
                    if (48 > (s = t.charCodeAt(o)) || s > 57) {
                      (j = (46 === s ? c + t.slice(o + 1) : t.slice(o)) + j),
                        (t = t.slice(0, o));
                      break;
                    }
                }
              }
              y && !h && (t = i(t, 1 / 0));
              var A = p.length + t.length + j.length,
                P = A < d ? Array(d - A + 1).join(e) : "";
              switch (
                (y &&
                  h &&
                  ((t = i(P + t, P.length ? d - j.length : 1 / 0)), (P = "")),
                r)
              ) {
                case "<":
                  t = p + t + j + P;
                  break;
                case "=":
                  t = p + P + t + j;
                  break;
                case "^":
                  t = P.slice(0, (A = P.length >> 1)) + p + t + j + P.slice(A);
                  break;
                default:
                  t = P + p + t + j;
              }
              return u(t);
            }
            return (
              (v =
                void 0 === v
                  ? 6
                  : /[gprs]/.test(b)
                    ? Math.max(1, Math.min(21, v))
                    : Math.max(0, Math.min(20, v))),
              (j.toString = function () {
                return t + "";
              }),
              j
            );
          }
          return {
            format: p,
            formatPrefix: function (t, e) {
              var r = p((((t = tb(t)).type = "f"), t)),
                n = 3 * Math.max(-8, Math.min(8, Math.floor(tw(e) / 3))),
                i = Math.pow(10, -n),
                o = tP[8 + n / 3];
              return function (t) {
                return r(i * t) + o;
              };
            },
          };
        })({ thousands: ",", grouping: [3], currency: ["$", ""] })).format),
          (r8 = r1.formatPrefix);
        var tF = r(24547);
        function tq(t) {
          return function (e) {
            return e < 0 ? -Math.pow(-e, t) : Math.pow(e, t);
          };
        }
        function t$(t) {
          return t < 0 ? -Math.sqrt(-t) : Math.sqrt(t);
        }
        function tW(t) {
          return t < 0 ? -t * t : t * t;
        }
        function tX(t) {
          var e = t(ts, ts),
            r = 1;
          return (
            (e.exponent = function (e) {
              return arguments.length
                ? 1 == (r = +e)
                  ? t(ts, ts)
                  : 0.5 === r
                    ? t(t$, tW)
                    : t(tq(r), tq(1 / r))
                : r;
            }),
            tk(e)
          );
        }
        function tH() {
          var t = tX(td());
          return (
            (t.copy = function () {
              return th(t, tH()).exponent(t.exponent());
            }),
            tv.C.apply(t, arguments),
            t
          );
        }
        function tV() {
          return tH.apply(null, arguments).exponent(0.5);
        }
        function tK(t) {
          return Math.sign(t) * t * t;
        }
        function tG(t, e) {
          let r;
          if (void 0 === e)
            for (let e of t)
              null != e && (r < e || (void 0 === r && e >= e)) && (r = e);
          else {
            let n = -1;
            for (let i of t)
              null != (i = e(i, ++n, t)) &&
                (r < i || (void 0 === r && i >= i)) &&
                (r = i);
          }
          return r;
        }
        function tJ(t, e) {
          let r;
          if (void 0 === e)
            for (let e of t)
              null != e && (r > e || (void 0 === r && e >= e)) && (r = e);
          else {
            let n = -1;
            for (let i of t)
              null != (i = e(i, ++n, t)) &&
                (r > i || (void 0 === r && i >= i)) &&
                (r = i);
          }
          return r;
        }
        function tY(t, e) {
          return (
            (null == t || !(t >= t)) - (null == e || !(e >= e)) ||
            (t < e ? -1 : +(t > e))
          );
        }
        function tZ(t, e, r) {
          let n = t[e];
          (t[e] = t[r]), (t[r] = n);
        }
        let tQ = new Date(),
          t0 = new Date();
        function t1(t, e, r, n) {
          function i(e) {
            return (
              t((e = 0 == arguments.length ? new Date() : new Date(+e))), e
            );
          }
          return (
            (i.floor = (e) => (t((e = new Date(+e))), e)),
            (i.ceil = (r) => (t((r = new Date(r - 1))), e(r, 1), t(r), r)),
            (i.round = (t) => {
              let e = i(t),
                r = i.ceil(t);
              return t - e < r - t ? e : r;
            }),
            (i.offset = (t, r) => (
              e((t = new Date(+t)), null == r ? 1 : Math.floor(r)), t
            )),
            (i.range = (r, n, o) => {
              let a,
                c = [];
              if (
                ((r = i.ceil(r)),
                (o = null == o ? 1 : Math.floor(o)),
                !(r < n) || !(o > 0))
              )
                return c;
              do c.push((a = new Date(+r))), e(r, o), t(r);
              while (a < r && r < n);
              return c;
            }),
            (i.filter = (r) =>
              t1(
                (e) => {
                  if (e >= e) for (; t(e), !r(e); ) e.setTime(e - 1);
                },
                (t, n) => {
                  if (t >= t)
                    if (n < 0) for (; ++n <= 0; ) for (; e(t, -1), !r(t); );
                    else for (; --n >= 0; ) for (; e(t, 1), !r(t); );
                },
              )),
            r &&
              ((i.count = (e, n) => (
                tQ.setTime(+e),
                t0.setTime(+n),
                t(tQ),
                t(t0),
                Math.floor(r(tQ, t0))
              )),
              (i.every = (t) =>
                isFinite((t = Math.floor(t))) && t > 0
                  ? t > 1
                    ? i.filter(
                        n
                          ? (e) => n(e) % t == 0
                          : (e) => i.count(0, e) % t == 0,
                      )
                    : i
                  : null)),
            i
          );
        }
        let t2 = t1(
          () => {},
          (t, e) => {
            t.setTime(+t + e);
          },
          (t, e) => e - t,
        );
        (t2.every = (t) =>
          isFinite((t = Math.floor(t))) && t > 0
            ? t > 1
              ? t1(
                  (e) => {
                    e.setTime(Math.floor(e / t) * t);
                  },
                  (e, r) => {
                    e.setTime(+e + r * t);
                  },
                  (e, r) => (r - e) / t,
                )
              : t2
            : null),
          t2.range;
        let t8 = t1(
          (t) => {
            t.setTime(t - t.getMilliseconds());
          },
          (t, e) => {
            t.setTime(+t + 1e3 * e);
          },
          (t, e) => (e - t) / 1e3,
          (t) => t.getUTCSeconds(),
        );
        t8.range;
        let t5 = t1(
          (t) => {
            t.setTime(t - t.getMilliseconds() - 1e3 * t.getSeconds());
          },
          (t, e) => {
            t.setTime(+t + 6e4 * e);
          },
          (t, e) => (e - t) / 6e4,
          (t) => t.getMinutes(),
        );
        t5.range;
        let t3 = t1(
          (t) => {
            t.setUTCSeconds(0, 0);
          },
          (t, e) => {
            t.setTime(+t + 6e4 * e);
          },
          (t, e) => (e - t) / 6e4,
          (t) => t.getUTCMinutes(),
        );
        t3.range;
        let t4 = t1(
          (t) => {
            t.setTime(
              t -
                t.getMilliseconds() -
                1e3 * t.getSeconds() -
                6e4 * t.getMinutes(),
            );
          },
          (t, e) => {
            t.setTime(+t + 36e5 * e);
          },
          (t, e) => (e - t) / 36e5,
          (t) => t.getHours(),
        );
        t4.range;
        let t6 = t1(
          (t) => {
            t.setUTCMinutes(0, 0, 0);
          },
          (t, e) => {
            t.setTime(+t + 36e5 * e);
          },
          (t, e) => (e - t) / 36e5,
          (t) => t.getUTCHours(),
        );
        t6.range;
        let t9 = t1(
          (t) => t.setHours(0, 0, 0, 0),
          (t, e) => t.setDate(t.getDate() + e),
          (t, e) =>
            (e - t - (e.getTimezoneOffset() - t.getTimezoneOffset()) * 6e4) /
            864e5,
          (t) => t.getDate() - 1,
        );
        t9.range;
        let t7 = t1(
          (t) => {
            t.setUTCHours(0, 0, 0, 0);
          },
          (t, e) => {
            t.setUTCDate(t.getUTCDate() + e);
          },
          (t, e) => (e - t) / 864e5,
          (t) => t.getUTCDate() - 1,
        );
        t7.range;
        let et = t1(
          (t) => {
            t.setUTCHours(0, 0, 0, 0);
          },
          (t, e) => {
            t.setUTCDate(t.getUTCDate() + e);
          },
          (t, e) => (e - t) / 864e5,
          (t) => Math.floor(t / 864e5),
        );
        function ee(t) {
          return t1(
            (e) => {
              e.setDate(e.getDate() - ((e.getDay() + 7 - t) % 7)),
                e.setHours(0, 0, 0, 0);
            },
            (t, e) => {
              t.setDate(t.getDate() + 7 * e);
            },
            (t, e) =>
              (e - t - (e.getTimezoneOffset() - t.getTimezoneOffset()) * 6e4) /
              6048e5,
          );
        }
        et.range;
        let er = ee(0),
          en = ee(1),
          ei = ee(2),
          eo = ee(3),
          ea = ee(4),
          ec = ee(5),
          eu = ee(6);
        function es(t) {
          return t1(
            (e) => {
              e.setUTCDate(e.getUTCDate() - ((e.getUTCDay() + 7 - t) % 7)),
                e.setUTCHours(0, 0, 0, 0);
            },
            (t, e) => {
              t.setUTCDate(t.getUTCDate() + 7 * e);
            },
            (t, e) => (e - t) / 6048e5,
          );
        }
        er.range, en.range, ei.range, eo.range, ea.range, ec.range, eu.range;
        let el = es(0),
          ef = es(1),
          ep = es(2),
          eh = es(3),
          ed = es(4),
          ey = es(5),
          ev = es(6);
        el.range, ef.range, ep.range, eh.range, ed.range, ey.range, ev.range;
        let em = t1(
          (t) => {
            t.setDate(1), t.setHours(0, 0, 0, 0);
          },
          (t, e) => {
            t.setMonth(t.getMonth() + e);
          },
          (t, e) =>
            e.getMonth() -
            t.getMonth() +
            (e.getFullYear() - t.getFullYear()) * 12,
          (t) => t.getMonth(),
        );
        em.range;
        let eb = t1(
          (t) => {
            t.setUTCDate(1), t.setUTCHours(0, 0, 0, 0);
          },
          (t, e) => {
            t.setUTCMonth(t.getUTCMonth() + e);
          },
          (t, e) =>
            e.getUTCMonth() -
            t.getUTCMonth() +
            (e.getUTCFullYear() - t.getUTCFullYear()) * 12,
          (t) => t.getUTCMonth(),
        );
        eb.range;
        let eg = t1(
          (t) => {
            t.setMonth(0, 1), t.setHours(0, 0, 0, 0);
          },
          (t, e) => {
            t.setFullYear(t.getFullYear() + e);
          },
          (t, e) => e.getFullYear() - t.getFullYear(),
          (t) => t.getFullYear(),
        );
        (eg.every = (t) =>
          isFinite((t = Math.floor(t))) && t > 0
            ? t1(
                (e) => {
                  e.setFullYear(Math.floor(e.getFullYear() / t) * t),
                    e.setMonth(0, 1),
                    e.setHours(0, 0, 0, 0);
                },
                (e, r) => {
                  e.setFullYear(e.getFullYear() + r * t);
                },
              )
            : null),
          eg.range;
        let ex = t1(
          (t) => {
            t.setUTCMonth(0, 1), t.setUTCHours(0, 0, 0, 0);
          },
          (t, e) => {
            t.setUTCFullYear(t.getUTCFullYear() + e);
          },
          (t, e) => e.getUTCFullYear() - t.getUTCFullYear(),
          (t) => t.getUTCFullYear(),
        );
        function ew(t, e, r, n, i, o) {
          let a = [
            [t8, 1, 1e3],
            [t8, 5, 5e3],
            [t8, 15, 15e3],
            [t8, 30, 3e4],
            [o, 1, 6e4],
            [o, 5, 3e5],
            [o, 15, 9e5],
            [o, 30, 18e5],
            [i, 1, 36e5],
            [i, 3, 108e5],
            [i, 6, 216e5],
            [i, 12, 432e5],
            [n, 1, 864e5],
            [n, 2, 1728e5],
            [r, 1, 6048e5],
            [e, 1, 2592e6],
            [e, 3, 7776e6],
            [t, 1, 31536e6],
          ];
          function c(e, r, n) {
            let i = Math.abs(r - e) / n,
              o = d(([, , t]) => t).right(a, i);
            if (o === a.length) return t.every(f(e / 31536e6, r / 31536e6, n));
            if (0 === o) return t2.every(Math.max(f(e, r, n), 1));
            let [c, u] = a[i / a[o - 1][2] < a[o][2] / i ? o - 1 : o];
            return c.every(u);
          }
          return [
            function (t, e, r) {
              let n = e < t;
              n && ([t, e] = [e, t]);
              let i = r && "function" == typeof r.range ? r : c(t, e, r),
                o = i ? i.range(t, +e + 1) : [];
              return n ? o.reverse() : o;
            },
            c,
          ];
        }
        (ex.every = (t) =>
          isFinite((t = Math.floor(t))) && t > 0
            ? t1(
                (e) => {
                  e.setUTCFullYear(Math.floor(e.getUTCFullYear() / t) * t),
                    e.setUTCMonth(0, 1),
                    e.setUTCHours(0, 0, 0, 0);
                },
                (e, r) => {
                  e.setUTCFullYear(e.getUTCFullYear() + r * t);
                },
              )
            : null),
          ex.range;
        let [eO, ej] = ew(ex, eb, el, et, t6, t3),
          [eS, eA] = ew(eg, em, er, t9, t4, t5);
        function eP(t) {
          if (0 <= t.y && t.y < 100) {
            var e = new Date(-1, t.m, t.d, t.H, t.M, t.S, t.L);
            return e.setFullYear(t.y), e;
          }
          return new Date(t.y, t.m, t.d, t.H, t.M, t.S, t.L);
        }
        function eE(t) {
          if (0 <= t.y && t.y < 100) {
            var e = new Date(Date.UTC(-1, t.m, t.d, t.H, t.M, t.S, t.L));
            return e.setUTCFullYear(t.y), e;
          }
          return new Date(Date.UTC(t.y, t.m, t.d, t.H, t.M, t.S, t.L));
        }
        function ek(t, e, r) {
          return { y: t, m: e, d: r, H: 0, M: 0, S: 0, L: 0 };
        }
        var e_ = { "-": "", _: " ", 0: "0" },
          eM = /^\s*\d+/,
          eT = /^%/,
          eC = /[\\^$*+?|[\]().{}]/g;
        function eN(t, e, r) {
          var n = t < 0 ? "-" : "",
            i = (n ? -t : t) + "",
            o = i.length;
          return n + (o < r ? Array(r - o + 1).join(e) + i : i);
        }
        function eI(t) {
          return t.replace(eC, "\\$&");
        }
        function eD(t) {
          return RegExp("^(?:" + t.map(eI).join("|") + ")", "i");
        }
        function eB(t) {
          return new Map(t.map((t, e) => [t.toLowerCase(), e]));
        }
        function eR(t, e, r) {
          var n = eM.exec(e.slice(r, r + 1));
          return n ? ((t.w = +n[0]), r + n[0].length) : -1;
        }
        function eL(t, e, r) {
          var n = eM.exec(e.slice(r, r + 1));
          return n ? ((t.u = +n[0]), r + n[0].length) : -1;
        }
        function ez(t, e, r) {
          var n = eM.exec(e.slice(r, r + 2));
          return n ? ((t.U = +n[0]), r + n[0].length) : -1;
        }
        function eU(t, e, r) {
          var n = eM.exec(e.slice(r, r + 2));
          return n ? ((t.V = +n[0]), r + n[0].length) : -1;
        }
        function eF(t, e, r) {
          var n = eM.exec(e.slice(r, r + 2));
          return n ? ((t.W = +n[0]), r + n[0].length) : -1;
        }
        function eq(t, e, r) {
          var n = eM.exec(e.slice(r, r + 4));
          return n ? ((t.y = +n[0]), r + n[0].length) : -1;
        }
        function e$(t, e, r) {
          var n = eM.exec(e.slice(r, r + 2));
          return n
            ? ((t.y = +n[0] + (+n[0] > 68 ? 1900 : 2e3)), r + n[0].length)
            : -1;
        }
        function eW(t, e, r) {
          var n = /^(Z)|([+-]\d\d)(?::?(\d\d))?/.exec(e.slice(r, r + 6));
          return n
            ? ((t.Z = n[1] ? 0 : -(n[2] + (n[3] || "00"))), r + n[0].length)
            : -1;
        }
        function eX(t, e, r) {
          var n = eM.exec(e.slice(r, r + 1));
          return n ? ((t.q = 3 * n[0] - 3), r + n[0].length) : -1;
        }
        function eH(t, e, r) {
          var n = eM.exec(e.slice(r, r + 2));
          return n ? ((t.m = n[0] - 1), r + n[0].length) : -1;
        }
        function eV(t, e, r) {
          var n = eM.exec(e.slice(r, r + 2));
          return n ? ((t.d = +n[0]), r + n[0].length) : -1;
        }
        function eK(t, e, r) {
          var n = eM.exec(e.slice(r, r + 3));
          return n ? ((t.m = 0), (t.d = +n[0]), r + n[0].length) : -1;
        }
        function eG(t, e, r) {
          var n = eM.exec(e.slice(r, r + 2));
          return n ? ((t.H = +n[0]), r + n[0].length) : -1;
        }
        function eJ(t, e, r) {
          var n = eM.exec(e.slice(r, r + 2));
          return n ? ((t.M = +n[0]), r + n[0].length) : -1;
        }
        function eY(t, e, r) {
          var n = eM.exec(e.slice(r, r + 2));
          return n ? ((t.S = +n[0]), r + n[0].length) : -1;
        }
        function eZ(t, e, r) {
          var n = eM.exec(e.slice(r, r + 3));
          return n ? ((t.L = +n[0]), r + n[0].length) : -1;
        }
        function eQ(t, e, r) {
          var n = eM.exec(e.slice(r, r + 6));
          return n ? ((t.L = Math.floor(n[0] / 1e3)), r + n[0].length) : -1;
        }
        function e0(t, e, r) {
          var n = eT.exec(e.slice(r, r + 1));
          return n ? r + n[0].length : -1;
        }
        function e1(t, e, r) {
          var n = eM.exec(e.slice(r));
          return n ? ((t.Q = +n[0]), r + n[0].length) : -1;
        }
        function e2(t, e, r) {
          var n = eM.exec(e.slice(r));
          return n ? ((t.s = +n[0]), r + n[0].length) : -1;
        }
        function e8(t, e) {
          return eN(t.getDate(), e, 2);
        }
        function e5(t, e) {
          return eN(t.getHours(), e, 2);
        }
        function e3(t, e) {
          return eN(t.getHours() % 12 || 12, e, 2);
        }
        function e4(t, e) {
          return eN(1 + t9.count(eg(t), t), e, 3);
        }
        function e6(t, e) {
          return eN(t.getMilliseconds(), e, 3);
        }
        function e9(t, e) {
          return e6(t, e) + "000";
        }
        function e7(t, e) {
          return eN(t.getMonth() + 1, e, 2);
        }
        function rt(t, e) {
          return eN(t.getMinutes(), e, 2);
        }
        function re(t, e) {
          return eN(t.getSeconds(), e, 2);
        }
        function rr(t) {
          var e = t.getDay();
          return 0 === e ? 7 : e;
        }
        function rn(t, e) {
          return eN(er.count(eg(t) - 1, t), e, 2);
        }
        function ri(t) {
          var e = t.getDay();
          return e >= 4 || 0 === e ? ea(t) : ea.ceil(t);
        }
        function ro(t, e) {
          return (
            (t = ri(t)), eN(ea.count(eg(t), t) + (4 === eg(t).getDay()), e, 2)
          );
        }
        function ra(t) {
          return t.getDay();
        }
        function rc(t, e) {
          return eN(en.count(eg(t) - 1, t), e, 2);
        }
        function ru(t, e) {
          return eN(t.getFullYear() % 100, e, 2);
        }
        function rs(t, e) {
          return eN((t = ri(t)).getFullYear() % 100, e, 2);
        }
        function rl(t, e) {
          return eN(t.getFullYear() % 1e4, e, 4);
        }
        function rf(t, e) {
          var r = t.getDay();
          return eN(
            (t = r >= 4 || 0 === r ? ea(t) : ea.ceil(t)).getFullYear() % 1e4,
            e,
            4,
          );
        }
        function rp(t) {
          var e = t.getTimezoneOffset();
          return (
            (e > 0 ? "-" : ((e *= -1), "+")) +
            eN((e / 60) | 0, "0", 2) +
            eN(e % 60, "0", 2)
          );
        }
        function rh(t, e) {
          return eN(t.getUTCDate(), e, 2);
        }
        function rd(t, e) {
          return eN(t.getUTCHours(), e, 2);
        }
        function ry(t, e) {
          return eN(t.getUTCHours() % 12 || 12, e, 2);
        }
        function rv(t, e) {
          return eN(1 + t7.count(ex(t), t), e, 3);
        }
        function rm(t, e) {
          return eN(t.getUTCMilliseconds(), e, 3);
        }
        function rb(t, e) {
          return rm(t, e) + "000";
        }
        function rg(t, e) {
          return eN(t.getUTCMonth() + 1, e, 2);
        }
        function rx(t, e) {
          return eN(t.getUTCMinutes(), e, 2);
        }
        function rw(t, e) {
          return eN(t.getUTCSeconds(), e, 2);
        }
        function rO(t) {
          var e = t.getUTCDay();
          return 0 === e ? 7 : e;
        }
        function rj(t, e) {
          return eN(el.count(ex(t) - 1, t), e, 2);
        }
        function rS(t) {
          var e = t.getUTCDay();
          return e >= 4 || 0 === e ? ed(t) : ed.ceil(t);
        }
        function rA(t, e) {
          return (
            (t = rS(t)),
            eN(ed.count(ex(t), t) + (4 === ex(t).getUTCDay()), e, 2)
          );
        }
        function rP(t) {
          return t.getUTCDay();
        }
        function rE(t, e) {
          return eN(ef.count(ex(t) - 1, t), e, 2);
        }
        function rk(t, e) {
          return eN(t.getUTCFullYear() % 100, e, 2);
        }
        function r_(t, e) {
          return eN((t = rS(t)).getUTCFullYear() % 100, e, 2);
        }
        function rM(t, e) {
          return eN(t.getUTCFullYear() % 1e4, e, 4);
        }
        function rT(t, e) {
          var r = t.getUTCDay();
          return eN(
            (t = r >= 4 || 0 === r ? ed(t) : ed.ceil(t)).getUTCFullYear() % 1e4,
            e,
            4,
          );
        }
        function rC() {
          return "+0000";
        }
        function rN() {
          return "%";
        }
        function rI(t) {
          return +t;
        }
        function rD(t) {
          return Math.floor(+t / 1e3);
        }
        function rB(t) {
          return new Date(t);
        }
        function rR(t) {
          return t instanceof Date ? +t : +new Date(+t);
        }
        function rL(t, e, r, n, i, o, a, c, u, s) {
          var l = ty(),
            f = l.invert,
            p = l.domain,
            h = s(".%L"),
            d = s(":%S"),
            y = s("%I:%M"),
            v = s("%I %p"),
            m = s("%a %d"),
            b = s("%b %d"),
            g = s("%B"),
            x = s("%Y");
          function w(t) {
            return (
              u(t) < t
                ? h
                : c(t) < t
                  ? d
                  : a(t) < t
                    ? y
                    : o(t) < t
                      ? v
                      : n(t) < t
                        ? i(t) < t
                          ? m
                          : b
                        : r(t) < t
                          ? g
                          : x
            )(t);
          }
          return (
            (l.invert = function (t) {
              return new Date(f(t));
            }),
            (l.domain = function (t) {
              return arguments.length ? p(Array.from(t, rR)) : p().map(rB);
            }),
            (l.ticks = function (e) {
              var r = p();
              return t(r[0], r[r.length - 1], null == e ? 10 : e);
            }),
            (l.tickFormat = function (t, e) {
              return null == e ? w : s(e);
            }),
            (l.nice = function (t) {
              var r = p();
              return (
                (t && "function" == typeof t.range) ||
                  (t = e(r[0], r[r.length - 1], null == t ? 10 : t)),
                t ? p(tM(r, t)) : l
              );
            }),
            (l.copy = function () {
              return th(l, rL(t, e, r, n, i, o, a, c, u, s));
            }),
            l
          );
        }
        function rz() {
          return tv.C.apply(
            rL(eS, eA, eg, em, er, t9, t4, t5, t8, r3).domain([
              new Date(2e3, 0, 1),
              new Date(2e3, 0, 2),
            ]),
            arguments,
          );
        }
        function rU() {
          return tv.C.apply(
            rL(eO, ej, ex, eb, el, t7, t6, t3, t8, r4).domain([
              Date.UTC(2e3, 0, 1),
              Date.UTC(2e3, 0, 2),
            ]),
            arguments,
          );
        }
        function rF() {
          var t,
            e,
            r,
            n,
            i,
            o = 0,
            a = 1,
            c = ts,
            u = !1;
          function s(e) {
            return null == e || isNaN((e *= 1))
              ? i
              : c(
                  0 === r
                    ? 0.5
                    : ((e = (n(e) - t) * r),
                      u ? Math.max(0, Math.min(1, e)) : e),
                );
          }
          function l(t) {
            return function (e) {
              var r, n;
              return arguments.length
                ? (([r, n] = e), (c = t(r, n)), s)
                : [c(0), c(1)];
            };
          }
          return (
            (s.domain = function (i) {
              return arguments.length
                ? (([o, a] = i),
                  (t = n((o *= 1))),
                  (e = n((a *= 1))),
                  (r = t === e ? 0 : 1 / (e - t)),
                  s)
                : [o, a];
            }),
            (s.clamp = function (t) {
              return arguments.length ? ((u = !!t), s) : u;
            }),
            (s.interpolator = function (t) {
              return arguments.length ? ((c = t), s) : c;
            }),
            (s.range = l(to)),
            (s.rangeRound = l(ta)),
            (s.unknown = function (t) {
              return arguments.length ? ((i = t), s) : i;
            }),
            function (i) {
              return (
                (n = i),
                (t = i(o)),
                (e = i(a)),
                (r = t === e ? 0 : 1 / (e - t)),
                s
              );
            }
          );
        }
        function rq(t, e) {
          return e
            .domain(t.domain())
            .interpolator(t.interpolator())
            .clamp(t.clamp())
            .unknown(t.unknown());
        }
        function r$() {
          var t = tX(rF());
          return (
            (t.copy = function () {
              return rq(t, r$()).exponent(t.exponent());
            }),
            tv.K.apply(t, arguments)
          );
        }
        function rW() {
          return r$.apply(null, arguments).exponent(0.5);
        }
        function rX() {
          var t,
            e,
            r,
            n,
            i,
            o,
            a,
            c = 0,
            u = 0.5,
            s = 1,
            l = 1,
            f = ts,
            p = !1;
          function h(t) {
            return isNaN((t *= 1))
              ? a
              : ((t = 0.5 + ((t = +o(t)) - e) * (l * t < l * e ? n : i)),
                f(p ? Math.max(0, Math.min(1, t)) : t));
          }
          function d(t) {
            return function (e) {
              var r, n, i;
              return arguments.length
                ? (([r, n, i] = e),
                  (f = (function (t, e) {
                    void 0 === e && ((e = t), (t = to));
                    for (
                      var r = 0,
                        n = e.length - 1,
                        i = e[0],
                        o = Array(n < 0 ? 0 : n);
                      r < n;

                    )
                      o[r] = t(i, (i = e[++r]));
                    return function (t) {
                      var e = Math.max(
                        0,
                        Math.min(n - 1, Math.floor((t *= n))),
                      );
                      return o[e](t - e);
                    };
                  })(t, [r, n, i])),
                  h)
                : [f(0), f(0.5), f(1)];
            };
          }
          return (
            (h.domain = function (a) {
              return arguments.length
                ? (([c, u, s] = a),
                  (t = o((c *= 1))),
                  (e = o((u *= 1))),
                  (r = o((s *= 1))),
                  (n = t === e ? 0 : 0.5 / (e - t)),
                  (i = e === r ? 0 : 0.5 / (r - e)),
                  (l = e < t ? -1 : 1),
                  h)
                : [c, u, s];
            }),
            (h.clamp = function (t) {
              return arguments.length ? ((p = !!t), h) : p;
            }),
            (h.interpolator = function (t) {
              return arguments.length ? ((f = t), h) : f;
            }),
            (h.range = d(to)),
            (h.rangeRound = d(ta)),
            (h.unknown = function (t) {
              return arguments.length ? ((a = t), h) : a;
            }),
            function (a) {
              return (
                (o = a),
                (t = a(c)),
                (e = a(u)),
                (r = a(s)),
                (n = t === e ? 0 : 0.5 / (e - t)),
                (i = e === r ? 0 : 0.5 / (r - e)),
                (l = e < t ? -1 : 1),
                h
              );
            }
          );
        }
        function rH() {
          var t = tX(rX());
          return (
            (t.copy = function () {
              return rq(t, rH()).exponent(t.exponent());
            }),
            tv.K.apply(t, arguments)
          );
        }
        function rV() {
          return rH.apply(null, arguments).exponent(0.5);
        }
        function rK(t, e) {
          if ((i = t.length) > 1)
            for (var r, n, i, o = 1, a = t[e[0]], c = a.length; o < i; ++o)
              for (n = a, a = t[e[o]], r = 0; r < c; ++r)
                a[r][1] += a[r][0] = isNaN(n[r][1]) ? n[r][0] : n[r][1];
        }
        (r3 = (r5 = (function (t) {
          var e = t.dateTime,
            r = t.date,
            n = t.time,
            i = t.periods,
            o = t.days,
            a = t.shortDays,
            c = t.months,
            u = t.shortMonths,
            s = eD(i),
            l = eB(i),
            f = eD(o),
            p = eB(o),
            h = eD(a),
            d = eB(a),
            y = eD(c),
            v = eB(c),
            m = eD(u),
            b = eB(u),
            g = {
              a: function (t) {
                return a[t.getDay()];
              },
              A: function (t) {
                return o[t.getDay()];
              },
              b: function (t) {
                return u[t.getMonth()];
              },
              B: function (t) {
                return c[t.getMonth()];
              },
              c: null,
              d: e8,
              e: e8,
              f: e9,
              g: rs,
              G: rf,
              H: e5,
              I: e3,
              j: e4,
              L: e6,
              m: e7,
              M: rt,
              p: function (t) {
                return i[+(t.getHours() >= 12)];
              },
              q: function (t) {
                return 1 + ~~(t.getMonth() / 3);
              },
              Q: rI,
              s: rD,
              S: re,
              u: rr,
              U: rn,
              V: ro,
              w: ra,
              W: rc,
              x: null,
              X: null,
              y: ru,
              Y: rl,
              Z: rp,
              "%": rN,
            },
            x = {
              a: function (t) {
                return a[t.getUTCDay()];
              },
              A: function (t) {
                return o[t.getUTCDay()];
              },
              b: function (t) {
                return u[t.getUTCMonth()];
              },
              B: function (t) {
                return c[t.getUTCMonth()];
              },
              c: null,
              d: rh,
              e: rh,
              f: rb,
              g: r_,
              G: rT,
              H: rd,
              I: ry,
              j: rv,
              L: rm,
              m: rg,
              M: rx,
              p: function (t) {
                return i[+(t.getUTCHours() >= 12)];
              },
              q: function (t) {
                return 1 + ~~(t.getUTCMonth() / 3);
              },
              Q: rI,
              s: rD,
              S: rw,
              u: rO,
              U: rj,
              V: rA,
              w: rP,
              W: rE,
              x: null,
              X: null,
              y: rk,
              Y: rM,
              Z: rC,
              "%": rN,
            },
            w = {
              a: function (t, e, r) {
                var n = h.exec(e.slice(r));
                return n
                  ? ((t.w = d.get(n[0].toLowerCase())), r + n[0].length)
                  : -1;
              },
              A: function (t, e, r) {
                var n = f.exec(e.slice(r));
                return n
                  ? ((t.w = p.get(n[0].toLowerCase())), r + n[0].length)
                  : -1;
              },
              b: function (t, e, r) {
                var n = m.exec(e.slice(r));
                return n
                  ? ((t.m = b.get(n[0].toLowerCase())), r + n[0].length)
                  : -1;
              },
              B: function (t, e, r) {
                var n = y.exec(e.slice(r));
                return n
                  ? ((t.m = v.get(n[0].toLowerCase())), r + n[0].length)
                  : -1;
              },
              c: function (t, r, n) {
                return S(t, e, r, n);
              },
              d: eV,
              e: eV,
              f: eQ,
              g: e$,
              G: eq,
              H: eG,
              I: eG,
              j: eK,
              L: eZ,
              m: eH,
              M: eJ,
              p: function (t, e, r) {
                var n = s.exec(e.slice(r));
                return n
                  ? ((t.p = l.get(n[0].toLowerCase())), r + n[0].length)
                  : -1;
              },
              q: eX,
              Q: e1,
              s: e2,
              S: eY,
              u: eL,
              U: ez,
              V: eU,
              w: eR,
              W: eF,
              x: function (t, e, n) {
                return S(t, r, e, n);
              },
              X: function (t, e, r) {
                return S(t, n, e, r);
              },
              y: e$,
              Y: eq,
              Z: eW,
              "%": e0,
            };
          function O(t, e) {
            return function (r) {
              var n,
                i,
                o,
                a = [],
                c = -1,
                u = 0,
                s = t.length;
              for (r instanceof Date || (r = new Date(+r)); ++c < s; )
                37 === t.charCodeAt(c) &&
                  (a.push(t.slice(u, c)),
                  null != (i = e_[(n = t.charAt(++c))])
                    ? (n = t.charAt(++c))
                    : (i = "e" === n ? " " : "0"),
                  (o = e[n]) && (n = o(r, i)),
                  a.push(n),
                  (u = c + 1));
              return a.push(t.slice(u, c)), a.join("");
            };
          }
          function j(t, e) {
            return function (r) {
              var n,
                i,
                o = ek(1900, void 0, 1);
              if (S(o, t, (r += ""), 0) != r.length) return null;
              if ("Q" in o) return new Date(o.Q);
              if ("s" in o) return new Date(1e3 * o.s + ("L" in o ? o.L : 0));
              if (
                (!e || "Z" in o || (o.Z = 0),
                "p" in o && (o.H = (o.H % 12) + 12 * o.p),
                void 0 === o.m && (o.m = "q" in o ? o.q : 0),
                "V" in o)
              ) {
                if (o.V < 1 || o.V > 53) return null;
                "w" in o || (o.w = 1),
                  "Z" in o
                    ? ((n =
                        (i = (n = eE(ek(o.y, 0, 1))).getUTCDay()) > 4 || 0 === i
                          ? ef.ceil(n)
                          : ef(n)),
                      (n = t7.offset(n, (o.V - 1) * 7)),
                      (o.y = n.getUTCFullYear()),
                      (o.m = n.getUTCMonth()),
                      (o.d = n.getUTCDate() + ((o.w + 6) % 7)))
                    : ((n =
                        (i = (n = eP(ek(o.y, 0, 1))).getDay()) > 4 || 0 === i
                          ? en.ceil(n)
                          : en(n)),
                      (n = t9.offset(n, (o.V - 1) * 7)),
                      (o.y = n.getFullYear()),
                      (o.m = n.getMonth()),
                      (o.d = n.getDate() + ((o.w + 6) % 7)));
              } else
                ("W" in o || "U" in o) &&
                  ("w" in o || (o.w = "u" in o ? o.u % 7 : +("W" in o)),
                  (i =
                    "Z" in o
                      ? eE(ek(o.y, 0, 1)).getUTCDay()
                      : eP(ek(o.y, 0, 1)).getDay()),
                  (o.m = 0),
                  (o.d =
                    "W" in o
                      ? ((o.w + 6) % 7) + 7 * o.W - ((i + 5) % 7)
                      : o.w + 7 * o.U - ((i + 6) % 7)));
              return "Z" in o
                ? ((o.H += (o.Z / 100) | 0), (o.M += o.Z % 100), eE(o))
                : eP(o);
            };
          }
          function S(t, e, r, n) {
            for (var i, o, a = 0, c = e.length, u = r.length; a < c; ) {
              if (n >= u) return -1;
              if (37 === (i = e.charCodeAt(a++))) {
                if (
                  !(o = w[(i = e.charAt(a++)) in e_ ? e.charAt(a++) : i]) ||
                  (n = o(t, r, n)) < 0
                )
                  return -1;
              } else if (i != r.charCodeAt(n++)) return -1;
            }
            return n;
          }
          return (
            (g.x = O(r, g)),
            (g.X = O(n, g)),
            (g.c = O(e, g)),
            (x.x = O(r, x)),
            (x.X = O(n, x)),
            (x.c = O(e, x)),
            {
              format: function (t) {
                var e = O((t += ""), g);
                return (
                  (e.toString = function () {
                    return t;
                  }),
                  e
                );
              },
              parse: function (t) {
                var e = j((t += ""), !1);
                return (
                  (e.toString = function () {
                    return t;
                  }),
                  e
                );
              },
              utcFormat: function (t) {
                var e = O((t += ""), x);
                return (
                  (e.toString = function () {
                    return t;
                  }),
                  e
                );
              },
              utcParse: function (t) {
                var e = j((t += ""), !0);
                return (
                  (e.toString = function () {
                    return t;
                  }),
                  e
                );
              },
            }
          );
        })({
          dateTime: "%x, %X",
          date: "%-m/%-d/%Y",
          time: "%-I:%M:%S %p",
          periods: ["AM", "PM"],
          days: [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
          ],
          shortDays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
          months: [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
          ],
          shortMonths: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
          ],
        })).format),
          r5.parse,
          (r4 = r5.utcFormat),
          r5.utcParse;
        var rG = r(73498),
          rJ = r(77095);
        function rY(t) {
          for (var e = t.length, r = Array(e); --e >= 0; ) r[e] = e;
          return r;
        }
        function rZ(t, e) {
          return t[e];
        }
        function rQ(t) {
          let e = [];
          return (e.key = t), e;
        }
        var r0,
          r1,
          r2,
          r8,
          r5,
          r3,
          r4,
          r6,
          r9,
          r7 = r(3576),
          nt = r.n(r7),
          ne = r(44074),
          nr = r.n(ne),
          nn = r(58929),
          ni = r.n(nn),
          no = r(4276),
          na = r.n(no),
          nc = r(27909),
          nu = r.n(nc),
          ns = r(65946),
          nl = r.n(ns),
          nf = r(99869),
          np = r.n(nf),
          nh = r(1371),
          nd = r.n(nh),
          ny = r(56830),
          nv = r.n(ny),
          nm = r(5642),
          nb = r.n(nm),
          ng = r(60897),
          nx = r.n(ng),
          nw = !0,
          nO = "[DecimalError] ",
          nj = nO + "Invalid argument: ",
          nS = nO + "Exponent out of range: ",
          nA = Math.floor,
          nP = Math.pow,
          nE = /^(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?$/i,
          nk = nA(1286742750677284.5),
          n_ = {};
        function nM(t, e) {
          var r,
            n,
            i,
            o,
            a,
            c,
            u,
            s,
            l = t.constructor,
            f = l.precision;
          if (!t.s || !e.s) return e.s || (e = new l(t)), nw ? nU(e, f) : e;
          if (
            ((u = t.d),
            (s = e.d),
            (a = t.e),
            (i = e.e),
            (u = u.slice()),
            (o = a - i))
          ) {
            for (
              o < 0
                ? ((n = u), (o = -o), (c = s.length))
                : ((n = s), (i = a), (c = u.length)),
                o > (c = (a = Math.ceil(f / 7)) > c ? a + 1 : c + 1) &&
                  ((o = c), (n.length = 1)),
                n.reverse();
              o--;

            )
              n.push(0);
            n.reverse();
          }
          for (
            (c = u.length) - (o = s.length) < 0 &&
              ((o = c), (n = s), (s = u), (u = n)),
              r = 0;
            o;

          )
            (r = ((u[--o] = u[o] + s[o] + r) / 1e7) | 0), (u[o] %= 1e7);
          for (r && (u.unshift(r), ++i), c = u.length; 0 == u[--c]; ) u.pop();
          return (e.d = u), (e.e = i), nw ? nU(e, f) : e;
        }
        function nT(t, e, r) {
          if (t !== ~~t || t < e || t > r) throw Error(nj + t);
        }
        function nC(t) {
          var e,
            r,
            n,
            i = t.length - 1,
            o = "",
            a = t[0];
          if (i > 0) {
            for (o += a, e = 1; e < i; e++)
              (r = 7 - (n = t[e] + "").length) && (o += nR(r)), (o += n);
            (r = 7 - (n = (a = t[e]) + "").length) && (o += nR(r));
          } else if (0 === a) return "0";
          for (; a % 10 == 0; ) a /= 10;
          return o + a;
        }
        (n_.absoluteValue = n_.abs =
          function () {
            var t = new this.constructor(this);
            return t.s && (t.s = 1), t;
          }),
          (n_.comparedTo = n_.cmp =
            function (t) {
              var e, r, n, i;
              if (((t = new this.constructor(t)), this.s !== t.s))
                return this.s || -t.s;
              if (this.e !== t.e) return (this.e > t.e) ^ (this.s < 0) ? 1 : -1;
              for (
                e = 0, r = (n = this.d.length) < (i = t.d.length) ? n : i;
                e < r;
                ++e
              )
                if (this.d[e] !== t.d[e])
                  return (this.d[e] > t.d[e]) ^ (this.s < 0) ? 1 : -1;
              return n === i ? 0 : (n > i) ^ (this.s < 0) ? 1 : -1;
            }),
          (n_.decimalPlaces = n_.dp =
            function () {
              var t = this.d.length - 1,
                e = (t - this.e) * 7;
              if ((t = this.d[t])) for (; t % 10 == 0; t /= 10) e--;
              return e < 0 ? 0 : e;
            }),
          (n_.dividedBy = n_.div =
            function (t) {
              return nN(this, new this.constructor(t));
            }),
          (n_.dividedToIntegerBy = n_.idiv =
            function (t) {
              var e = this.constructor;
              return nU(nN(this, new e(t), 0, 1), e.precision);
            }),
          (n_.equals = n_.eq =
            function (t) {
              return !this.cmp(t);
            }),
          (n_.exponent = function () {
            return nD(this);
          }),
          (n_.greaterThan = n_.gt =
            function (t) {
              return this.cmp(t) > 0;
            }),
          (n_.greaterThanOrEqualTo = n_.gte =
            function (t) {
              return this.cmp(t) >= 0;
            }),
          (n_.isInteger = n_.isint =
            function () {
              return this.e > this.d.length - 2;
            }),
          (n_.isNegative = n_.isneg =
            function () {
              return this.s < 0;
            }),
          (n_.isPositive = n_.ispos =
            function () {
              return this.s > 0;
            }),
          (n_.isZero = function () {
            return 0 === this.s;
          }),
          (n_.lessThan = n_.lt =
            function (t) {
              return 0 > this.cmp(t);
            }),
          (n_.lessThanOrEqualTo = n_.lte =
            function (t) {
              return 1 > this.cmp(t);
            }),
          (n_.logarithm = n_.log =
            function (t) {
              var e,
                r = this.constructor,
                n = r.precision,
                i = n + 5;
              if (void 0 === t) t = new r(10);
              else if ((t = new r(t)).s < 1 || t.eq(r9))
                throw Error(nO + "NaN");
              if (this.s < 1) throw Error(nO + (this.s ? "NaN" : "-Infinity"));
              return this.eq(r9)
                ? new r(0)
                : ((nw = !1),
                  (e = nN(nL(this, i), nL(t, i), i)),
                  (nw = !0),
                  nU(e, n));
            }),
          (n_.minus = n_.sub =
            function (t) {
              return (
                (t = new this.constructor(t)),
                this.s == t.s ? nF(this, t) : nM(this, ((t.s = -t.s), t))
              );
            }),
          (n_.modulo = n_.mod =
            function (t) {
              var e,
                r = this.constructor,
                n = r.precision;
              if (!(t = new r(t)).s) throw Error(nO + "NaN");
              return this.s
                ? ((nw = !1),
                  (e = nN(this, t, 0, 1).times(t)),
                  (nw = !0),
                  this.minus(e))
                : nU(new r(this), n);
            }),
          (n_.naturalExponential = n_.exp =
            function () {
              return nI(this);
            }),
          (n_.naturalLogarithm = n_.ln =
            function () {
              return nL(this);
            }),
          (n_.negated = n_.neg =
            function () {
              var t = new this.constructor(this);
              return (t.s = -t.s || 0), t;
            }),
          (n_.plus = n_.add =
            function (t) {
              return (
                (t = new this.constructor(t)),
                this.s == t.s ? nM(this, t) : nF(this, ((t.s = -t.s), t))
              );
            }),
          (n_.precision = n_.sd =
            function (t) {
              var e, r, n;
              if (void 0 !== t && !!t !== t && 1 !== t && 0 !== t)
                throw Error(nj + t);
              if (
                ((e = nD(this) + 1),
                (r = 7 * (n = this.d.length - 1) + 1),
                (n = this.d[n]))
              ) {
                for (; n % 10 == 0; n /= 10) r--;
                for (n = this.d[0]; n >= 10; n /= 10) r++;
              }
              return t && e > r ? e : r;
            }),
          (n_.squareRoot = n_.sqrt =
            function () {
              var t,
                e,
                r,
                n,
                i,
                o,
                a,
                c = this.constructor;
              if (this.s < 1) {
                if (!this.s) return new c(0);
                throw Error(nO + "NaN");
              }
              for (
                t = nD(this),
                  nw = !1,
                  0 == (i = Math.sqrt(+this)) || i == 1 / 0
                    ? (((e = nC(this.d)).length + t) % 2 == 0 && (e += "0"),
                      (i = Math.sqrt(e)),
                      (t = nA((t + 1) / 2) - (t < 0 || t % 2)),
                      (n = new c(
                        (e =
                          i == 1 / 0
                            ? "5e" + t
                            : (e = i.toExponential()).slice(
                                0,
                                e.indexOf("e") + 1,
                              ) + t),
                      )))
                    : (n = new c(i.toString())),
                  i = a = (r = c.precision) + 3;
                ;

              )
                if (
                  ((n = (o = n).plus(nN(this, o, a + 2)).times(0.5)),
                  nC(o.d).slice(0, a) === (e = nC(n.d)).slice(0, a))
                ) {
                  if (((e = e.slice(a - 3, a + 1)), i == a && "4999" == e)) {
                    if ((nU(o, r + 1, 0), o.times(o).eq(this))) {
                      n = o;
                      break;
                    }
                  } else if ("9999" != e) break;
                  a += 4;
                }
              return (nw = !0), nU(n, r);
            }),
          (n_.times = n_.mul =
            function (t) {
              var e,
                r,
                n,
                i,
                o,
                a,
                c,
                u,
                s,
                l = this.constructor,
                f = this.d,
                p = (t = new l(t)).d;
              if (!this.s || !t.s) return new l(0);
              for (
                t.s *= this.s,
                  r = this.e + t.e,
                  (u = f.length) < (s = p.length) &&
                    ((o = f), (f = p), (p = o), (a = u), (u = s), (s = a)),
                  o = [],
                  n = a = u + s;
                n--;

              )
                o.push(0);
              for (n = s; --n >= 0; ) {
                for (e = 0, i = u + n; i > n; )
                  (c = o[i] + p[n] * f[i - n - 1] + e),
                    (o[i--] = c % 1e7 | 0),
                    (e = (c / 1e7) | 0);
                o[i] = (o[i] + e) % 1e7 | 0;
              }
              for (; !o[--a]; ) o.pop();
              return (
                e ? ++r : o.shift(),
                (t.d = o),
                (t.e = r),
                nw ? nU(t, l.precision) : t
              );
            }),
          (n_.toDecimalPlaces = n_.todp =
            function (t, e) {
              var r = this,
                n = r.constructor;
              return ((r = new n(r)), void 0 === t)
                ? r
                : (nT(t, 0, 1e9),
                  void 0 === e ? (e = n.rounding) : nT(e, 0, 8),
                  nU(r, t + nD(r) + 1, e));
            }),
          (n_.toExponential = function (t, e) {
            var r,
              n = this,
              i = n.constructor;
            return (
              void 0 === t
                ? (r = nq(n, !0))
                : (nT(t, 0, 1e9),
                  void 0 === e ? (e = i.rounding) : nT(e, 0, 8),
                  (r = nq((n = nU(new i(n), t + 1, e)), !0, t + 1))),
              r
            );
          }),
          (n_.toFixed = function (t, e) {
            var r,
              n,
              i = this.constructor;
            return void 0 === t
              ? nq(this)
              : (nT(t, 0, 1e9),
                void 0 === e ? (e = i.rounding) : nT(e, 0, 8),
                (r = nq(
                  (n = nU(new i(this), t + nD(this) + 1, e)).abs(),
                  !1,
                  t + nD(n) + 1,
                )),
                this.isneg() && !this.isZero() ? "-" + r : r);
          }),
          (n_.toInteger = n_.toint =
            function () {
              var t = this.constructor;
              return nU(new t(this), nD(this) + 1, t.rounding);
            }),
          (n_.toNumber = function () {
            return +this;
          }),
          (n_.toPower = n_.pow =
            function (t) {
              var e,
                r,
                n,
                i,
                o,
                a,
                c = this,
                u = c.constructor,
                s = +(t = new u(t));
              if (!t.s) return new u(r9);
              if (!(c = new u(c)).s) {
                if (t.s < 1) throw Error(nO + "Infinity");
                return c;
              }
              if (c.eq(r9)) return c;
              if (((n = u.precision), t.eq(r9))) return nU(c, n);
              if (((a = (e = t.e) >= (r = t.d.length - 1)), (o = c.s), a)) {
                if ((r = s < 0 ? -s : s) <= 0x1fffffffffffff) {
                  for (
                    i = new u(r9), e = Math.ceil(n / 7 + 4), nw = !1;
                    r % 2 && n$((i = i.times(c)).d, e), 0 !== (r = nA(r / 2));

                  )
                    n$((c = c.times(c)).d, e);
                  return (nw = !0), t.s < 0 ? new u(r9).div(i) : nU(i, n);
                }
              } else if (o < 0) throw Error(nO + "NaN");
              return (
                (o = o < 0 && 1 & t.d[Math.max(e, r)] ? -1 : 1),
                (c.s = 1),
                (nw = !1),
                (i = t.times(nL(c, n + 12))),
                (nw = !0),
                ((i = nI(i)).s = o),
                i
              );
            }),
          (n_.toPrecision = function (t, e) {
            var r,
              n,
              i = this,
              o = i.constructor;
            return (
              void 0 === t
                ? ((r = nD(i)), (n = nq(i, r <= o.toExpNeg || r >= o.toExpPos)))
                : (nT(t, 1, 1e9),
                  void 0 === e ? (e = o.rounding) : nT(e, 0, 8),
                  (r = nD((i = nU(new o(i), t, e)))),
                  (n = nq(i, t <= r || r <= o.toExpNeg, t))),
              n
            );
          }),
          (n_.toSignificantDigits = n_.tosd =
            function (t, e) {
              var r = this.constructor;
              return (
                void 0 === t
                  ? ((t = r.precision), (e = r.rounding))
                  : (nT(t, 1, 1e9),
                    void 0 === e ? (e = r.rounding) : nT(e, 0, 8)),
                nU(new r(this), t, e)
              );
            }),
          (n_.toString =
            n_.valueOf =
            n_.val =
            n_.toJSON =
            n_[Symbol.for("nodejs.util.inspect.custom")] =
              function () {
                var t = nD(this),
                  e = this.constructor;
                return nq(this, t <= e.toExpNeg || t >= e.toExpPos);
              });
        var nN = (function () {
          function t(t, e) {
            var r,
              n = 0,
              i = t.length;
            for (t = t.slice(); i--; )
              (r = t[i] * e + n), (t[i] = r % 1e7 | 0), (n = (r / 1e7) | 0);
            return n && t.unshift(n), t;
          }
          function e(t, e, r, n) {
            var i, o;
            if (r != n) o = r > n ? 1 : -1;
            else
              for (i = o = 0; i < r; i++)
                if (t[i] != e[i]) {
                  o = t[i] > e[i] ? 1 : -1;
                  break;
                }
            return o;
          }
          function r(t, e, r) {
            for (var n = 0; r--; )
              (t[r] -= n), (n = +(t[r] < e[r])), (t[r] = 1e7 * n + t[r] - e[r]);
            for (; !t[0] && t.length > 1; ) t.shift();
          }
          return function (n, i, o, a) {
            var c,
              u,
              s,
              l,
              f,
              p,
              h,
              d,
              y,
              v,
              m,
              b,
              g,
              x,
              w,
              O,
              j,
              S,
              A = n.constructor,
              P = n.s == i.s ? 1 : -1,
              E = n.d,
              k = i.d;
            if (!n.s) return new A(n);
            if (!i.s) throw Error(nO + "Division by zero");
            for (
              s = 0,
                u = n.e - i.e,
                j = k.length,
                w = E.length,
                d = (h = new A(P)).d = [];
              k[s] == (E[s] || 0);

            )
              ++s;
            if (
              (k[s] > (E[s] || 0) && --u,
              (b =
                null == o
                  ? (o = A.precision)
                  : a
                    ? o + (nD(n) - nD(i)) + 1
                    : o) < 0)
            )
              return new A(0);
            if (((b = (b / 7 + 2) | 0), (s = 0), 1 == j))
              for (l = 0, k = k[0], b++; (s < w || l) && b--; s++)
                (g = 1e7 * l + (E[s] || 0)),
                  (d[s] = (g / k) | 0),
                  (l = g % k | 0);
            else {
              for (
                (l = (1e7 / (k[0] + 1)) | 0) > 1 &&
                  ((k = t(k, l)),
                  (E = t(E, l)),
                  (j = k.length),
                  (w = E.length)),
                  x = j,
                  v = (y = E.slice(0, j)).length;
                v < j;

              )
                y[v++] = 0;
              (S = k.slice()).unshift(0), (O = k[0]), k[1] >= 1e7 / 2 && ++O;
              do
                (l = 0),
                  (c = e(k, y, j, v)) < 0
                    ? ((m = y[0]),
                      j != v && (m = 1e7 * m + (y[1] || 0)),
                      (l = (m / O) | 0) > 1
                        ? (l >= 1e7 && (l = 1e7 - 1),
                          (p = (f = t(k, l)).length),
                          (v = y.length),
                          1 == (c = e(f, y, p, v)) &&
                            (l--, r(f, j < p ? S : k, p)))
                        : (0 == l && (c = l = 1), (f = k.slice())),
                      (p = f.length) < v && f.unshift(0),
                      r(y, f, v),
                      -1 == c &&
                        ((v = y.length),
                        (c = e(k, y, j, v)) < 1 &&
                          (l++, r(y, j < v ? S : k, v))),
                      (v = y.length))
                    : 0 === c && (l++, (y = [0])),
                  (d[s++] = l),
                  c && y[0] ? (y[v++] = E[x] || 0) : ((y = [E[x]]), (v = 1));
              while ((x++ < w || void 0 !== y[0]) && b--);
            }
            return d[0] || d.shift(), (h.e = u), nU(h, a ? o + nD(h) + 1 : o);
          };
        })();
        function nI(t, e) {
          var r,
            n,
            i,
            o,
            a,
            c = 0,
            u = 0,
            s = t.constructor,
            l = s.precision;
          if (nD(t) > 16) throw Error(nS + nD(t));
          if (!t.s) return new s(r9);
          for (
            null == e ? ((nw = !1), (a = l)) : (a = e), o = new s(0.03125);
            t.abs().gte(0.1);

          )
            (t = t.times(o)), (u += 5);
          for (
            a += ((Math.log(nP(2, u)) / Math.LN10) * 2 + 5) | 0,
              r = n = i = new s(r9),
              s.precision = a;
            ;

          ) {
            if (
              ((n = nU(n.times(t), a)),
              (r = r.times(++c)),
              nC((o = i.plus(nN(n, r, a))).d).slice(0, a) ===
                nC(i.d).slice(0, a))
            ) {
              for (; u--; ) i = nU(i.times(i), a);
              return (s.precision = l), null == e ? ((nw = !0), nU(i, l)) : i;
            }
            i = o;
          }
        }
        function nD(t) {
          for (var e = 7 * t.e, r = t.d[0]; r >= 10; r /= 10) e++;
          return e;
        }
        function nB(t, e, r) {
          if (e > t.LN10.sd())
            throw (
              ((nw = !0),
              r && (t.precision = r),
              Error(nO + "LN10 precision limit exceeded"))
            );
          return nU(new t(t.LN10), e);
        }
        function nR(t) {
          for (var e = ""; t--; ) e += "0";
          return e;
        }
        function nL(t, e) {
          var r,
            n,
            i,
            o,
            a,
            c,
            u,
            s,
            l,
            f = 1,
            p = t,
            h = p.d,
            d = p.constructor,
            y = d.precision;
          if (p.s < 1) throw Error(nO + (p.s ? "NaN" : "-Infinity"));
          if (p.eq(r9)) return new d(0);
          if ((null == e ? ((nw = !1), (s = y)) : (s = e), p.eq(10)))
            return null == e && (nw = !0), nB(d, s);
          if (
            ((d.precision = s += 10),
            (n = (r = nC(h)).charAt(0)),
            !(15e14 > Math.abs((o = nD(p)))))
          )
            return (
              (u = nB(d, s + 2, y).times(o + "")),
              (p = nL(new d(n + "." + r.slice(1)), s - 10).plus(u)),
              (d.precision = y),
              null == e ? ((nw = !0), nU(p, y)) : p
            );
          for (; (n < 7 && 1 != n) || (1 == n && r.charAt(1) > 3); )
            (n = (r = nC((p = p.times(t)).d)).charAt(0)), f++;
          for (
            o = nD(p),
              n > 1
                ? ((p = new d("0." + r)), o++)
                : (p = new d(n + "." + r.slice(1))),
              c = a = p = nN(p.minus(r9), p.plus(r9), s),
              l = nU(p.times(p), s),
              i = 3;
            ;

          ) {
            if (
              ((a = nU(a.times(l), s)),
              nC((u = c.plus(nN(a, new d(i), s))).d).slice(0, s) ===
                nC(c.d).slice(0, s))
            )
              return (
                (c = c.times(2)),
                0 !== o && (c = c.plus(nB(d, s + 2, y).times(o + ""))),
                (c = nN(c, new d(f), s)),
                (d.precision = y),
                null == e ? ((nw = !0), nU(c, y)) : c
              );
            (c = u), (i += 2);
          }
        }
        function nz(t, e) {
          var r, n, i;
          for (
            (r = e.indexOf(".")) > -1 && (e = e.replace(".", "")),
              (n = e.search(/e/i)) > 0
                ? (r < 0 && (r = n),
                  (r += +e.slice(n + 1)),
                  (e = e.substring(0, n)))
                : r < 0 && (r = e.length),
              n = 0;
            48 === e.charCodeAt(n);

          )
            ++n;
          for (i = e.length; 48 === e.charCodeAt(i - 1); ) --i;
          if ((e = e.slice(n, i))) {
            if (
              ((i -= n),
              (t.e = nA((r = r - n - 1) / 7)),
              (t.d = []),
              (n = (r + 1) % 7),
              r < 0 && (n += 7),
              n < i)
            ) {
              for (n && t.d.push(+e.slice(0, n)), i -= 7; n < i; )
                t.d.push(+e.slice(n, (n += 7)));
              n = 7 - (e = e.slice(n)).length;
            } else n -= i;
            for (; n--; ) e += "0";
            if ((t.d.push(+e), nw && (t.e > nk || t.e < -nk)))
              throw Error(nS + r);
          } else (t.s = 0), (t.e = 0), (t.d = [0]);
          return t;
        }
        function nU(t, e, r) {
          var n,
            i,
            o,
            a,
            c,
            u,
            s,
            l,
            f = t.d;
          for (a = 1, o = f[0]; o >= 10; o /= 10) a++;
          if ((n = e - a) < 0) (n += 7), (i = e), (s = f[(l = 0)]);
          else {
            if ((l = Math.ceil((n + 1) / 7)) >= (o = f.length)) return t;
            for (a = 1, s = o = f[l]; o >= 10; o /= 10) a++;
            (n %= 7), (i = n - 7 + a);
          }
          if (
            (void 0 !== r &&
              ((c = (s / (o = nP(10, a - i - 1))) % 10 | 0),
              (u = e < 0 || void 0 !== f[l + 1] || s % o),
              (u =
                r < 4
                  ? (c || u) && (0 == r || r == (t.s < 0 ? 3 : 2))
                  : c > 5 ||
                    (5 == c &&
                      (4 == r ||
                        u ||
                        (6 == r &&
                          (n > 0 ? (i > 0 ? s / nP(10, a - i) : 0) : f[l - 1]) %
                            10 &
                            1) ||
                        r == (t.s < 0 ? 8 : 7))))),
            e < 1 || !f[0])
          )
            return (
              u
                ? ((o = nD(t)),
                  (f.length = 1),
                  (e = e - o - 1),
                  (f[0] = nP(10, (7 - (e % 7)) % 7)),
                  (t.e = nA(-e / 7) || 0))
                : ((f.length = 1), (f[0] = t.e = t.s = 0)),
              t
            );
          if (
            (0 == n
              ? ((f.length = l), (o = 1), l--)
              : ((f.length = l + 1),
                (o = nP(10, 7 - n)),
                (f[l] = i > 0 ? ((s / nP(10, a - i)) % nP(10, i) | 0) * o : 0)),
            u)
          )
            for (;;)
              if (0 == l) {
                1e7 == (f[0] += o) && ((f[0] = 1), ++t.e);
                break;
              } else {
                if (((f[l] += o), 1e7 != f[l])) break;
                (f[l--] = 0), (o = 1);
              }
          for (n = f.length; 0 === f[--n]; ) f.pop();
          if (nw && (t.e > nk || t.e < -nk)) throw Error(nS + nD(t));
          return t;
        }
        function nF(t, e) {
          var r,
            n,
            i,
            o,
            a,
            c,
            u,
            s,
            l,
            f,
            p = t.constructor,
            h = p.precision;
          if (!t.s || !e.s)
            return e.s ? (e.s = -e.s) : (e = new p(t)), nw ? nU(e, h) : e;
          if (
            ((u = t.d),
            (f = e.d),
            (n = e.e),
            (s = t.e),
            (u = u.slice()),
            (a = s - n))
          ) {
            for (
              (l = a < 0)
                ? ((r = u), (a = -a), (c = f.length))
                : ((r = f), (n = s), (c = u.length)),
                a > (i = Math.max(Math.ceil(h / 7), c) + 2) &&
                  ((a = i), (r.length = 1)),
                r.reverse(),
                i = a;
              i--;

            )
              r.push(0);
            r.reverse();
          } else {
            for (
              (l = (i = u.length) < (c = f.length)) && (c = i), i = 0;
              i < c;
              i++
            )
              if (u[i] != f[i]) {
                l = u[i] < f[i];
                break;
              }
            a = 0;
          }
          for (
            l && ((r = u), (u = f), (f = r), (e.s = -e.s)),
              c = u.length,
              i = f.length - c;
            i > 0;
            --i
          )
            u[c++] = 0;
          for (i = f.length; i > a; ) {
            if (u[--i] < f[i]) {
              for (o = i; o && 0 === u[--o]; ) u[o] = 1e7 - 1;
              --u[o], (u[i] += 1e7);
            }
            u[i] -= f[i];
          }
          for (; 0 === u[--c]; ) u.pop();
          for (; 0 === u[0]; u.shift()) --n;
          return u[0] ? ((e.d = u), (e.e = n), nw ? nU(e, h) : e) : new p(0);
        }
        function nq(t, e, r) {
          var n,
            i = nD(t),
            o = nC(t.d),
            a = o.length;
          return (
            e
              ? (r && (n = r - a) > 0
                  ? (o = o.charAt(0) + "." + o.slice(1) + nR(n))
                  : a > 1 && (o = o.charAt(0) + "." + o.slice(1)),
                (o = o + (i < 0 ? "e" : "e+") + i))
              : i < 0
                ? ((o = "0." + nR(-i - 1) + o),
                  r && (n = r - a) > 0 && (o += nR(n)))
                : i >= a
                  ? ((o += nR(i + 1 - a)),
                    r && (n = r - i - 1) > 0 && (o = o + "." + nR(n)))
                  : ((n = i + 1) < a && (o = o.slice(0, n) + "." + o.slice(n)),
                    r &&
                      (n = r - a) > 0 &&
                      (i + 1 === a && (o += "."), (o += nR(n)))),
            t.s < 0 ? "-" + o : o
          );
        }
        function n$(t, e) {
          if (t.length > e) return (t.length = e), !0;
        }
        function nW(t) {
          if (!t || "object" != typeof t) throw Error(nO + "Object expected");
          var e,
            r,
            n,
            i = [
              "precision",
              1,
              1e9,
              "rounding",
              0,
              8,
              "toExpNeg",
              -1 / 0,
              0,
              "toExpPos",
              0,
              1 / 0,
            ];
          for (e = 0; e < i.length; e += 3)
            if (void 0 !== (n = t[(r = i[e])]))
              if (nA(n) === n && n >= i[e + 1] && n <= i[e + 2]) this[r] = n;
              else throw Error(nj + r + ": " + n);
          if (void 0 !== (n = t[(r = "LN10")]))
            if (n == Math.LN10) this[r] = new this(n);
            else throw Error(nj + r + ": " + n);
          return this;
        }
        var r6 = (function t(e) {
          var r, n, i;
          function o(t) {
            if (!(this instanceof o)) return new o(t);
            if (((this.constructor = o), t instanceof o)) {
              (this.s = t.s),
                (this.e = t.e),
                (this.d = (t = t.d) ? t.slice() : t);
              return;
            }
            if ("number" == typeof t) {
              if (0 * t != 0) throw Error(nj + t);
              if (t > 0) this.s = 1;
              else if (t < 0) (t = -t), (this.s = -1);
              else {
                (this.s = 0), (this.e = 0), (this.d = [0]);
                return;
              }
              if (t === ~~t && t < 1e7) {
                (this.e = 0), (this.d = [t]);
                return;
              }
              return nz(this, t.toString());
            }
            if ("string" != typeof t) throw Error(nj + t);
            if (
              (45 === t.charCodeAt(0)
                ? ((t = t.slice(1)), (this.s = -1))
                : (this.s = 1),
              nE.test(t))
            )
              nz(this, t);
            else throw Error(nj + t);
          }
          if (
            ((o.prototype = n_),
            (o.ROUND_UP = 0),
            (o.ROUND_DOWN = 1),
            (o.ROUND_CEIL = 2),
            (o.ROUND_FLOOR = 3),
            (o.ROUND_HALF_UP = 4),
            (o.ROUND_HALF_DOWN = 5),
            (o.ROUND_HALF_EVEN = 6),
            (o.ROUND_HALF_CEIL = 7),
            (o.ROUND_HALF_FLOOR = 8),
            (o.clone = t),
            (o.config = o.set = nW),
            void 0 === e && (e = {}),
            e)
          )
            for (
              r = 0,
                i = ["precision", "rounding", "toExpNeg", "toExpPos", "LN10"];
              r < i.length;

            )
              e.hasOwnProperty((n = i[r++])) || (e[n] = this[n]);
          return o.config(e), o;
        })({
          precision: 20,
          rounding: 4,
          toExpNeg: -7,
          toExpPos: 21,
          LN10: "2.302585092994045684017991454684364207601101488628772976033327900967572609677352480235997205089598298341967784042286",
        });
        r9 = new r6(1);
        let nX = r6;
        function nH(t, e) {
          (null == e || e > t.length) && (e = t.length);
          for (var r = 0, n = Array(e); r < e; r++) n[r] = t[r];
          return n;
        }
        var nV = function (t) {
            return t;
          },
          nK = {},
          nG = function (t) {
            return t === nK;
          },
          nJ = function (t) {
            return function e() {
              return 0 == arguments.length ||
                (1 == arguments.length &&
                  nG(arguments.length <= 0 ? void 0 : arguments[0]))
                ? e
                : t.apply(void 0, arguments);
            };
          },
          nY = function (t) {
            return (function t(e, r) {
              return 1 === e
                ? r
                : nJ(function () {
                    for (
                      var n = arguments.length, i = Array(n), o = 0;
                      o < n;
                      o++
                    )
                      i[o] = arguments[o];
                    var a = i.filter(function (t) {
                      return t !== nK;
                    }).length;
                    return a >= e
                      ? r.apply(void 0, i)
                      : t(
                          e - a,
                          nJ(function () {
                            for (
                              var t = arguments.length, e = Array(t), n = 0;
                              n < t;
                              n++
                            )
                              e[n] = arguments[n];
                            var o = i.map(function (t) {
                              return nG(t) ? e.shift() : t;
                            });
                            return r.apply(
                              void 0,
                              (
                                (function (t) {
                                  if (Array.isArray(t)) return nH(t);
                                })(o) ||
                                (function (t) {
                                  if (
                                    "undefined" != typeof Symbol &&
                                    Symbol.iterator in Object(t)
                                  )
                                    return Array.from(t);
                                })(o) ||
                                (function (t, e) {
                                  if (t) {
                                    if ("string" == typeof t)
                                      return nH(t, void 0);
                                    var r = Object.prototype.toString
                                      .call(t)
                                      .slice(8, -1);
                                    if (
                                      ("Object" === r &&
                                        t.constructor &&
                                        (r = t.constructor.name),
                                      "Map" === r || "Set" === r)
                                    )
                                      return Array.from(t);
                                    if (
                                      "Arguments" === r ||
                                      /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(
                                        r,
                                      )
                                    )
                                      return nH(t, e);
                                  }
                                })(o) ||
                                (function () {
                                  throw TypeError(
                                    "Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.",
                                  );
                                })()
                              ).concat(e),
                            );
                          }),
                        );
                  });
            })(t.length, t);
          },
          nZ = function (t, e) {
            for (var r = [], n = t; n < e; ++n) r[n - t] = n;
            return r;
          },
          nQ = nY(function (t, e) {
            return Array.isArray(e)
              ? e.map(t)
              : Object.keys(e)
                  .map(function (t) {
                    return e[t];
                  })
                  .map(t);
          }),
          n0 = function () {
            for (var t = arguments.length, e = Array(t), r = 0; r < t; r++)
              e[r] = arguments[r];
            if (!e.length) return nV;
            var n = e.reverse(),
              i = n[0],
              o = n.slice(1);
            return function () {
              return o.reduce(
                function (t, e) {
                  return e(t);
                },
                i.apply(void 0, arguments),
              );
            };
          },
          n1 = function (t) {
            return Array.isArray(t)
              ? t.reverse()
              : t.split("").reverse.join("");
          },
          n2 = function (t) {
            var e = null,
              r = null;
            return function () {
              for (var n = arguments.length, i = Array(n), o = 0; o < n; o++)
                i[o] = arguments[o];
              return e &&
                i.every(function (t, r) {
                  return t === e[r];
                })
                ? r
                : ((e = i), (r = t.apply(void 0, i)));
            };
          };
        nY(function (t, e, r) {
          var n = +t;
          return n + r * (+e - n);
        }),
          nY(function (t, e, r) {
            var n = e - +t;
            return (r - t) / (n = n || 1 / 0);
          }),
          nY(function (t, e, r) {
            var n = e - +t;
            return Math.max(0, Math.min(1, (r - t) / (n = n || 1 / 0)));
          });
        let n8 = {
          rangeStep: function (t, e, r) {
            for (var n = new nX(t), i = 0, o = []; n.lt(e) && i < 1e5; )
              o.push(n.toNumber()), (n = n.add(r)), i++;
            return o;
          },
          getDigitCount: function (t) {
            var e;
            return 0 === t
              ? 1
              : Math.floor(new nX(t).abs().log(10).toNumber()) + 1;
          },
        };
        function n5(t) {
          return (
            (function (t) {
              if (Array.isArray(t)) return n6(t);
            })(t) ||
            (function (t) {
              if ("undefined" != typeof Symbol && Symbol.iterator in Object(t))
                return Array.from(t);
            })(t) ||
            n4(t) ||
            (function () {
              throw TypeError(
                "Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.",
              );
            })()
          );
        }
        function n3(t, e) {
          return (
            (function (t) {
              if (Array.isArray(t)) return t;
            })(t) ||
            (function (t, e) {
              if (
                "undefined" != typeof Symbol &&
                Symbol.iterator in Object(t)
              ) {
                var r = [],
                  n = !0,
                  i = !1,
                  o = void 0;
                try {
                  for (
                    var a, c = t[Symbol.iterator]();
                    !(n = (a = c.next()).done) &&
                    (r.push(a.value), !e || r.length !== e);
                    n = !0
                  );
                } catch (t) {
                  (i = !0), (o = t);
                } finally {
                  try {
                    n || null == c.return || c.return();
                  } finally {
                    if (i) throw o;
                  }
                }
                return r;
              }
            })(t, e) ||
            n4(t, e) ||
            (function () {
              throw TypeError(
                "Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.",
              );
            })()
          );
        }
        function n4(t, e) {
          if (t) {
            if ("string" == typeof t) return n6(t, e);
            var r = Object.prototype.toString.call(t).slice(8, -1);
            if (
              ("Object" === r && t.constructor && (r = t.constructor.name),
              "Map" === r || "Set" === r)
            )
              return Array.from(t);
            if (
              "Arguments" === r ||
              /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)
            )
              return n6(t, e);
          }
        }
        function n6(t, e) {
          (null == e || e > t.length) && (e = t.length);
          for (var r = 0, n = Array(e); r < e; r++) n[r] = t[r];
          return n;
        }
        function n9(t) {
          var e = n3(t, 2),
            r = e[0],
            n = e[1],
            i = r,
            o = n;
          return r > n && ((i = n), (o = r)), [i, o];
        }
        function n7(t, e, r) {
          if (t.lte(0)) return new nX(0);
          var n = n8.getDigitCount(t.toNumber()),
            i = new nX(10).pow(n),
            o = t.div(i),
            a = 1 !== n ? 0.05 : 0.1,
            c = new nX(Math.ceil(o.div(a).toNumber())).add(r).mul(a).mul(i);
          return e ? c : new nX(Math.ceil(c));
        }
        function it(t, e, r) {
          var n = 1,
            i = new nX(t);
          if (!i.isint() && r) {
            var o = Math.abs(t);
            o < 1
              ? ((n = new nX(10).pow(n8.getDigitCount(t) - 1)),
                (i = new nX(Math.floor(i.div(n).toNumber())).mul(n)))
              : o > 1 && (i = new nX(Math.floor(t)));
          } else
            0 === t
              ? (i = new nX(Math.floor((e - 1) / 2)))
              : r || (i = new nX(Math.floor(t)));
          var a = Math.floor((e - 1) / 2);
          return n0(
            nQ(function (t) {
              return i.add(new nX(t - a).mul(n)).toNumber();
            }),
            nZ,
          )(0, e);
        }
        var ie = n2(function (t) {
          var e = n3(t, 2),
            r = e[0],
            n = e[1],
            i =
              arguments.length > 1 && void 0 !== arguments[1]
                ? arguments[1]
                : 6,
            o =
              !(arguments.length > 2) ||
              void 0 === arguments[2] ||
              arguments[2],
            a = Math.max(i, 2),
            c = n3(n9([r, n]), 2),
            u = c[0],
            s = c[1];
          if (u === -1 / 0 || s === 1 / 0) {
            var l =
              s === 1 / 0
                ? [u].concat(
                    n5(
                      nZ(0, i - 1).map(function () {
                        return 1 / 0;
                      }),
                    ),
                  )
                : [].concat(
                    n5(
                      nZ(0, i - 1).map(function () {
                        return -1 / 0;
                      }),
                    ),
                    [s],
                  );
            return r > n ? n1(l) : l;
          }
          if (u === s) return it(u, i, o);
          var f = (function t(e, r, n, i) {
              var o,
                a =
                  arguments.length > 4 && void 0 !== arguments[4]
                    ? arguments[4]
                    : 0;
              if (!Number.isFinite((r - e) / (n - 1)))
                return {
                  step: new nX(0),
                  tickMin: new nX(0),
                  tickMax: new nX(0),
                };
              var c = n7(new nX(r).sub(e).div(n - 1), i, a),
                u = Math.ceil(
                  (o =
                    e <= 0 && r >= 0
                      ? new nX(0)
                      : (o = new nX(e).add(r).div(2)).sub(new nX(o).mod(c)))
                    .sub(e)
                    .div(c)
                    .toNumber(),
                ),
                s = Math.ceil(new nX(r).sub(o).div(c).toNumber()),
                l = u + s + 1;
              return l > n
                ? t(e, r, n, i, a + 1)
                : (l < n &&
                    ((s = r > 0 ? s + (n - l) : s),
                    (u = r > 0 ? u : u + (n - l))),
                  {
                    step: c,
                    tickMin: o.sub(new nX(u).mul(c)),
                    tickMax: o.add(new nX(s).mul(c)),
                  });
            })(u, s, a, o),
            p = f.step,
            h = f.tickMin,
            d = f.tickMax,
            y = n8.rangeStep(h, d.add(new nX(0.1).mul(p)), p);
          return r > n ? n1(y) : y;
        });
        n2(function (t) {
          var e = n3(t, 2),
            r = e[0],
            n = e[1],
            i =
              arguments.length > 1 && void 0 !== arguments[1]
                ? arguments[1]
                : 6,
            o =
              !(arguments.length > 2) ||
              void 0 === arguments[2] ||
              arguments[2],
            a = Math.max(i, 2),
            c = n3(n9([r, n]), 2),
            u = c[0],
            s = c[1];
          if (u === -1 / 0 || s === 1 / 0) return [r, n];
          if (u === s) return it(u, i, o);
          var l = n7(new nX(s).sub(u).div(a - 1), o, 0),
            f = n0(
              nQ(function (t) {
                return new nX(u).add(new nX(t).mul(l)).toNumber();
              }),
              nZ,
            )(0, a).filter(function (t) {
              return t >= u && t <= s;
            });
          return r > n ? n1(f) : f;
        });
        var ir = n2(function (t, e) {
            var r = n3(t, 2),
              n = r[0],
              i = r[1],
              o =
                !(arguments.length > 2) ||
                void 0 === arguments[2] ||
                arguments[2],
              a = n3(n9([n, i]), 2),
              c = a[0],
              u = a[1];
            if (c === -1 / 0 || u === 1 / 0) return [n, i];
            if (c === u) return [c];
            var s = Math.max(e, 2),
              l = n7(new nX(u).sub(c).div(s - 1), o, 0),
              f = [].concat(
                n5(
                  n8.rangeStep(
                    new nX(c),
                    new nX(u).sub(new nX(0.99).mul(l)),
                    l,
                  ),
                ),
                [u],
              );
            return n > i ? n1(f) : f;
          }),
          ii = r(58435),
          io = r(61481),
          ia = r(18862),
          ic = r(40703);
        function iu(t) {
          return (iu =
            "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
              ? function (t) {
                  return typeof t;
                }
              : function (t) {
                  return t &&
                    "function" == typeof Symbol &&
                    t.constructor === Symbol &&
                    t !== Symbol.prototype
                    ? "symbol"
                    : typeof t;
                })(t);
        }
        function is(t) {
          return (
            (function (t) {
              if (Array.isArray(t)) return il(t);
            })(t) ||
            (function (t) {
              if (
                ("undefined" != typeof Symbol && null != t[Symbol.iterator]) ||
                null != t["@@iterator"]
              )
                return Array.from(t);
            })(t) ||
            (function (t, e) {
              if (t) {
                if ("string" == typeof t) return il(t, void 0);
                var r = Object.prototype.toString.call(t).slice(8, -1);
                if (
                  ("Object" === r && t.constructor && (r = t.constructor.name),
                  "Map" === r || "Set" === r)
                )
                  return Array.from(t);
                if (
                  "Arguments" === r ||
                  /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)
                )
                  return il(t, e);
              }
            })(t) ||
            (function () {
              throw TypeError(
                "Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.",
              );
            })()
          );
        }
        function il(t, e) {
          (null == e || e > t.length) && (e = t.length);
          for (var r = 0, n = Array(e); r < e; r++) n[r] = t[r];
          return n;
        }
        function ip(t, e) {
          var r = Object.keys(t);
          if (Object.getOwnPropertySymbols) {
            var n = Object.getOwnPropertySymbols(t);
            e &&
              (n = n.filter(function (e) {
                return Object.getOwnPropertyDescriptor(t, e).enumerable;
              })),
              r.push.apply(r, n);
          }
          return r;
        }
        function ih(t) {
          for (var e = 1; e < arguments.length; e++) {
            var r = null != arguments[e] ? arguments[e] : {};
            e % 2
              ? ip(Object(r), !0).forEach(function (e) {
                  id(t, e, r[e]);
                })
              : Object.getOwnPropertyDescriptors
                ? Object.defineProperties(
                    t,
                    Object.getOwnPropertyDescriptors(r),
                  )
                : ip(Object(r)).forEach(function (e) {
                    Object.defineProperty(
                      t,
                      e,
                      Object.getOwnPropertyDescriptor(r, e),
                    );
                  });
          }
          return t;
        }
        function id(t, e, r) {
          var n;
          return (
            ((n = (function (t, e) {
              if ("object" != iu(t) || !t) return t;
              var r = t[Symbol.toPrimitive];
              if (void 0 !== r) {
                var n = r.call(t, e || "default");
                if ("object" != iu(n)) return n;
                throw TypeError("@@toPrimitive must return a primitive value.");
              }
              return ("string" === e ? String : Number)(t);
            })(e, "string")),
            (e = "symbol" == iu(n) ? n : n + "") in t)
              ? Object.defineProperty(t, e, {
                  value: r,
                  enumerable: !0,
                  configurable: !0,
                  writable: !0,
                })
              : (t[e] = r),
            t
          );
        }
        function iy(t, e, r) {
          return ni()(t) || ni()(e)
            ? r
            : (0, io.vh)(e)
              ? nl()(t, e, r)
              : na()(e)
                ? e(t)
                : r;
        }
        function iv(t, e, r, n) {
          var i = np()(t, function (t) {
            return iy(t, e);
          });
          if ("number" === r) {
            var o = i.filter(function (t) {
              return (0, io.Et)(t) || parseFloat(t);
            });
            return o.length ? [nr()(o), nt()(o)] : [1 / 0, -1 / 0];
          }
          return (
            n
              ? i.filter(function (t) {
                  return !ni()(t);
                })
              : i
          ).map(function (t) {
            return (0, io.vh)(t) || t instanceof Date ? t : "";
          });
        }
        var im = function (t) {
            var e,
              r =
                arguments.length > 1 && void 0 !== arguments[1]
                  ? arguments[1]
                  : [],
              n = arguments.length > 2 ? arguments[2] : void 0,
              i = arguments.length > 3 ? arguments[3] : void 0,
              o = -1,
              a = null != (e = null == r ? void 0 : r.length) ? e : 0;
            if (a <= 1) return 0;
            if (
              i &&
              "angleAxis" === i.axisType &&
              1e-6 >= Math.abs(Math.abs(i.range[1] - i.range[0]) - 360)
            )
              for (var c = i.range, u = 0; u < a; u++) {
                var s = u > 0 ? n[u - 1].coordinate : n[a - 1].coordinate,
                  l = n[u].coordinate,
                  f = u >= a - 1 ? n[0].coordinate : n[u + 1].coordinate,
                  p = void 0;
                if ((0, io.sA)(l - s) !== (0, io.sA)(f - l)) {
                  var h = [];
                  if ((0, io.sA)(f - l) === (0, io.sA)(c[1] - c[0])) {
                    p = f;
                    var d = l + c[1] - c[0];
                    (h[0] = Math.min(d, (d + s) / 2)),
                      (h[1] = Math.max(d, (d + s) / 2));
                  } else {
                    p = s;
                    var y = f + c[1] - c[0];
                    (h[0] = Math.min(l, (y + l) / 2)),
                      (h[1] = Math.max(l, (y + l) / 2));
                  }
                  var v = [Math.min(l, (p + l) / 2), Math.max(l, (p + l) / 2)];
                  if ((t > v[0] && t <= v[1]) || (t >= h[0] && t <= h[1])) {
                    o = n[u].index;
                    break;
                  }
                } else {
                  var m = Math.min(s, f),
                    b = Math.max(s, f);
                  if (t > (m + l) / 2 && t <= (b + l) / 2) {
                    o = n[u].index;
                    break;
                  }
                }
              }
            else
              for (var g = 0; g < a; g++)
                if (
                  (0 === g &&
                    t <= (r[g].coordinate + r[g + 1].coordinate) / 2) ||
                  (g > 0 &&
                    g < a - 1 &&
                    t > (r[g].coordinate + r[g - 1].coordinate) / 2 &&
                    t <= (r[g].coordinate + r[g + 1].coordinate) / 2) ||
                  (g === a - 1 &&
                    t > (r[g].coordinate + r[g - 1].coordinate) / 2)
                ) {
                  o = r[g].index;
                  break;
                }
            return o;
          },
          ib = function (t) {
            var e,
              r,
              n = t.type.displayName,
              i =
                null != (e = t.type) && e.defaultProps
                  ? ih(ih({}, t.type.defaultProps), t.props)
                  : t.props,
              o = i.stroke,
              a = i.fill;
            switch (n) {
              case "Line":
                r = o;
                break;
              case "Area":
              case "Radar":
                r = o && "none" !== o ? o : a;
                break;
              default:
                r = a;
            }
            return r;
          },
          ig = function (t) {
            var e = t.barSize,
              r = t.totalSize,
              n = t.stackGroups,
              i = void 0 === n ? {} : n;
            if (!i) return {};
            for (
              var o = {}, a = Object.keys(i), c = 0, u = a.length;
              c < u;
              c++
            )
              for (
                var s = i[a[c]].stackGroups,
                  l = Object.keys(s),
                  f = 0,
                  p = l.length;
                f < p;
                f++
              ) {
                var h = s[l[f]],
                  d = h.items,
                  y = h.cateAxisId,
                  v = d.filter(function (t) {
                    return (0, ia.Mn)(t.type).indexOf("Bar") >= 0;
                  });
                if (v && v.length) {
                  var m = v[0].type.defaultProps,
                    b = void 0 !== m ? ih(ih({}, m), v[0].props) : v[0].props,
                    g = b.barSize,
                    x = b[y];
                  o[x] || (o[x] = []);
                  var w = ni()(g) ? e : g;
                  o[x].push({
                    item: v[0],
                    stackList: v.slice(1),
                    barSize: ni()(w) ? void 0 : (0, io.F4)(w, r, 0),
                  });
                }
              }
            return o;
          },
          ix = function (t) {
            var e,
              r = t.barGap,
              n = t.barCategoryGap,
              i = t.bandSize,
              o = t.sizeList,
              a = void 0 === o ? [] : o,
              c = t.maxBarSize,
              u = a.length;
            if (u < 1) return null;
            var s = (0, io.F4)(r, i, 0, !0),
              l = [];
            if (a[0].barSize === +a[0].barSize) {
              var f = !1,
                p = i / u,
                h = a.reduce(function (t, e) {
                  return t + e.barSize || 0;
                }, 0);
              (h += (u - 1) * s) >= i && ((h -= (u - 1) * s), (s = 0)),
                h >= i && p > 0 && ((f = !0), (p *= 0.9), (h = u * p));
              var d = { offset: (((i - h) / 2) >> 0) - s, size: 0 };
              e = a.reduce(function (t, e) {
                var r = {
                    item: e.item,
                    position: {
                      offset: d.offset + d.size + s,
                      size: f ? p : e.barSize,
                    },
                  },
                  n = [].concat(is(t), [r]);
                return (
                  (d = n[n.length - 1].position),
                  e.stackList &&
                    e.stackList.length &&
                    e.stackList.forEach(function (t) {
                      n.push({ item: t, position: d });
                    }),
                  n
                );
              }, l);
            } else {
              var y = (0, io.F4)(n, i, 0, !0);
              i - 2 * y - (u - 1) * s <= 0 && (s = 0);
              var v = (i - 2 * y - (u - 1) * s) / u;
              v > 1 && (v >>= 0);
              var m = c === +c ? Math.min(v, c) : v;
              e = a.reduce(function (t, e, r) {
                var n = [].concat(is(t), [
                  {
                    item: e.item,
                    position: {
                      offset: y + (v + s) * r + (v - m) / 2,
                      size: m,
                    },
                  },
                ]);
                return (
                  e.stackList &&
                    e.stackList.length &&
                    e.stackList.forEach(function (t) {
                      n.push({ item: t, position: n[n.length - 1].position });
                    }),
                  n
                );
              }, l);
            }
            return e;
          },
          iw = function (t, e, r, n) {
            var i = r.children,
              o = r.width,
              a = r.margin,
              c = o - (a.left || 0) - (a.right || 0),
              u = (0, ic.g)({ children: i, legendWidth: c });
            if (u) {
              var s = n || {},
                l = s.width,
                f = s.height,
                p = u.align,
                h = u.verticalAlign,
                d = u.layout;
              if (
                ("vertical" === d || ("horizontal" === d && "middle" === h)) &&
                "center" !== p &&
                (0, io.Et)(t[p])
              )
                return ih(ih({}, t), {}, id({}, p, t[p] + (l || 0)));
              if (
                ("horizontal" === d || ("vertical" === d && "center" === p)) &&
                "middle" !== h &&
                (0, io.Et)(t[h])
              )
                return ih(ih({}, t), {}, id({}, h, t[h] + (f || 0)));
            }
            return t;
          },
          iO = function (t, e, r, n, i) {
            var o = e.props.children,
              a = (0, ia.aS)(o, ii.u).filter(function (t) {
                var e;
                return (
                  (e = t.props.direction),
                  !!ni()(i) ||
                    ("horizontal" === n
                      ? "yAxis" === i
                      : "vertical" === n || "x" === e
                        ? "xAxis" === i
                        : "y" !== e || "yAxis" === i)
                );
              });
            if (a && a.length) {
              var c = a.map(function (t) {
                return t.props.dataKey;
              });
              return t.reduce(
                function (t, e) {
                  var n = iy(e, r);
                  if (ni()(n)) return t;
                  var i = Array.isArray(n) ? [nr()(n), nt()(n)] : [n, n],
                    o = c.reduce(
                      function (t, r) {
                        var n = iy(e, r, 0),
                          o = i[0] - Math.abs(Array.isArray(n) ? n[0] : n),
                          a = i[1] + Math.abs(Array.isArray(n) ? n[1] : n);
                        return [Math.min(o, t[0]), Math.max(a, t[1])];
                      },
                      [1 / 0, -1 / 0],
                    );
                  return [Math.min(o[0], t[0]), Math.max(o[1], t[1])];
                },
                [1 / 0, -1 / 0],
              );
            }
            return null;
          },
          ij = function (t, e, r, n, i) {
            var o = e
              .map(function (e) {
                return iO(t, e, r, i, n);
              })
              .filter(function (t) {
                return !ni()(t);
              });
            return o && o.length
              ? o.reduce(
                  function (t, e) {
                    return [Math.min(t[0], e[0]), Math.max(t[1], e[1])];
                  },
                  [1 / 0, -1 / 0],
                )
              : null;
          },
          iS = function (t, e, r, n, i) {
            var o = e.map(function (e) {
              var o = e.props.dataKey;
              return ("number" === r && o && iO(t, e, o, n)) || iv(t, o, r, i);
            });
            if ("number" === r)
              return o.reduce(
                function (t, e) {
                  return [Math.min(t[0], e[0]), Math.max(t[1], e[1])];
                },
                [1 / 0, -1 / 0],
              );
            var a = {};
            return o.reduce(function (t, e) {
              for (var r = 0, n = e.length; r < n; r++)
                a[e[r]] || ((a[e[r]] = !0), t.push(e[r]));
              return t;
            }, []);
          },
          iA = function (t, e) {
            return (
              ("horizontal" === t && "xAxis" === e) ||
              ("vertical" === t && "yAxis" === e) ||
              ("centric" === t && "angleAxis" === e) ||
              ("radial" === t && "radiusAxis" === e)
            );
          },
          iP = function (t, e, r, n) {
            if (n)
              return t.map(function (t) {
                return t.coordinate;
              });
            var i,
              o,
              a = t.map(function (t) {
                return (
                  t.coordinate === e && (i = !0),
                  t.coordinate === r && (o = !0),
                  t.coordinate
                );
              });
            return i || a.push(e), o || a.push(r), a;
          },
          iE = function (t, e, r) {
            if (!t) return null;
            var n = t.scale,
              i = t.duplicateDomain,
              o = t.type,
              a = t.range,
              c = "scaleBand" === t.realScaleType ? n.bandwidth() / 2 : 2,
              u =
                (e || r) && "category" === o && n.bandwidth
                  ? n.bandwidth() / c
                  : 0;
            return ((u =
              "angleAxis" === t.axisType && (null == a ? void 0 : a.length) >= 2
                ? 2 * (0, io.sA)(a[0] - a[1]) * u
                : u),
            e && (t.ticks || t.niceTicks))
              ? (t.ticks || t.niceTicks)
                  .map(function (t) {
                    return {
                      coordinate: n(i ? i.indexOf(t) : t) + u,
                      value: t,
                      offset: u,
                    };
                  })
                  .filter(function (t) {
                    return !nd()(t.coordinate);
                  })
              : t.isCategorical && t.categoricalDomain
                ? t.categoricalDomain.map(function (t, e) {
                    return {
                      coordinate: n(t) + u,
                      value: t,
                      index: e,
                      offset: u,
                    };
                  })
                : n.ticks && !r
                  ? n.ticks(t.tickCount).map(function (t) {
                      return { coordinate: n(t) + u, value: t, offset: u };
                    })
                  : n.domain().map(function (t, e) {
                      return {
                        coordinate: n(t) + u,
                        value: i ? i[t] : t,
                        index: e,
                        offset: u,
                      };
                    });
          },
          ik = new WeakMap(),
          i_ = function (t, e) {
            if ("function" != typeof e) return t;
            ik.has(t) || ik.set(t, new WeakMap());
            var r = ik.get(t);
            if (r.has(e)) return r.get(e);
            var n = function () {
              t.apply(void 0, arguments), e.apply(void 0, arguments);
            };
            return r.set(e, n), n;
          },
          iM = function (t, e, r) {
            var o = t.scale,
              a = t.type,
              c = t.layout,
              u = t.axisType;
            if ("auto" === o)
              return "radial" === c && "radiusAxis" === u
                ? { scale: i.A(), realScaleType: "band" }
                : "radial" === c && "angleAxis" === u
                  ? { scale: t_(), realScaleType: "linear" }
                  : "category" === a &&
                      e &&
                      (e.indexOf("LineChart") >= 0 ||
                        e.indexOf("AreaChart") >= 0 ||
                        (e.indexOf("ComposedChart") >= 0 && !r))
                    ? { scale: i.z(), realScaleType: "point" }
                    : "category" === a
                      ? { scale: i.A(), realScaleType: "band" }
                      : { scale: t_(), realScaleType: "linear" };
            if (nu()(o)) {
              var s = "scale".concat(nv()(o));
              return {
                scale: (n[s] || i.z)(),
                realScaleType: n[s] ? s : "point",
              };
            }
            return na()(o)
              ? { scale: o }
              : { scale: i.z(), realScaleType: "point" };
          },
          iT = function (t) {
            var e = t.domain();
            if (e && !(e.length <= 2)) {
              var r = e.length,
                n = t.range(),
                i = Math.min(n[0], n[1]) - 1e-4,
                o = Math.max(n[0], n[1]) + 1e-4,
                a = t(e[0]),
                c = t(e[r - 1]);
              (a < i || a > o || c < i || c > o) && t.domain([e[0], e[r - 1]]);
            }
          },
          iC = function (t, e) {
            if (!t) return null;
            for (var r = 0, n = t.length; r < n; r++)
              if (t[r].item === e) return t[r].position;
            return null;
          },
          iN = function (t, e) {
            if (!e || 2 !== e.length || !(0, io.Et)(e[0]) || !(0, io.Et)(e[1]))
              return t;
            var r = Math.min(e[0], e[1]),
              n = Math.max(e[0], e[1]),
              i = [t[0], t[1]];
            return (
              (!(0, io.Et)(t[0]) || t[0] < r) && (i[0] = r),
              (!(0, io.Et)(t[1]) || t[1] > n) && (i[1] = n),
              i[0] > n && (i[0] = n),
              i[1] < r && (i[1] = r),
              i
            );
          },
          iI = {
            sign: function (t) {
              var e = t.length;
              if (!(e <= 0))
                for (var r = 0, n = t[0].length; r < n; ++r)
                  for (var i = 0, o = 0, a = 0; a < e; ++a) {
                    var c = nd()(t[a][r][1]) ? t[a][r][0] : t[a][r][1];
                    c >= 0
                      ? ((t[a][r][0] = i),
                        (t[a][r][1] = i + c),
                        (i = t[a][r][1]))
                      : ((t[a][r][0] = o),
                        (t[a][r][1] = o + c),
                        (o = t[a][r][1]));
                  }
            },
            expand: function (t, e) {
              if ((n = t.length) > 0) {
                for (var r, n, i, o = 0, a = t[0].length; o < a; ++o) {
                  for (i = r = 0; r < n; ++r) i += t[r][o][1] || 0;
                  if (i) for (r = 0; r < n; ++r) t[r][o][1] /= i;
                }
                rK(t, e);
              }
            },
            none: rK,
            silhouette: function (t, e) {
              if ((r = t.length) > 0) {
                for (var r, n = 0, i = t[e[0]], o = i.length; n < o; ++n) {
                  for (var a = 0, c = 0; a < r; ++a) c += t[a][n][1] || 0;
                  i[n][1] += i[n][0] = -c / 2;
                }
                rK(t, e);
              }
            },
            wiggle: function (t, e) {
              if ((i = t.length) > 0 && (n = (r = t[e[0]]).length) > 0) {
                for (var r, n, i, o = 0, a = 1; a < n; ++a) {
                  for (var c = 0, u = 0, s = 0; c < i; ++c) {
                    for (
                      var l = t[e[c]],
                        f = l[a][1] || 0,
                        p = (f - (l[a - 1][1] || 0)) / 2,
                        h = 0;
                      h < c;
                      ++h
                    ) {
                      var d = t[e[h]];
                      p += (d[a][1] || 0) - (d[a - 1][1] || 0);
                    }
                    (u += f), (s += p * f);
                  }
                  (r[a - 1][1] += r[a - 1][0] = o), u && (o -= s / u);
                }
                (r[a - 1][1] += r[a - 1][0] = o), rK(t, e);
              }
            },
            positive: function (t) {
              var e = t.length;
              if (!(e <= 0))
                for (var r = 0, n = t[0].length; r < n; ++r)
                  for (var i = 0, o = 0; o < e; ++o) {
                    var a = nd()(t[o][r][1]) ? t[o][r][0] : t[o][r][1];
                    a >= 0
                      ? ((t[o][r][0] = i),
                        (t[o][r][1] = i + a),
                        (i = t[o][r][1]))
                      : ((t[o][r][0] = 0), (t[o][r][1] = 0));
                  }
            },
          },
          iD = function (t, e, r) {
            var n = e.map(function (t) {
                return t.props.dataKey;
              }),
              i = iI[r];
            return (function () {
              var t = (0, rJ.A)([]),
                e = rY,
                r = rK,
                n = rZ;
              function i(i) {
                var o,
                  a,
                  c = Array.from(t.apply(this, arguments), rQ),
                  u = c.length,
                  s = -1;
                for (let t of i)
                  for (o = 0, ++s; o < u; ++o)
                    (c[o][s] = [0, +n(t, c[o].key, s, i)]).data = t;
                for (o = 0, a = (0, rG.A)(e(c)); o < u; ++o) c[a[o]].index = o;
                return r(c, a), c;
              }
              return (
                (i.keys = function (e) {
                  return arguments.length
                    ? ((t =
                        "function" == typeof e ? e : (0, rJ.A)(Array.from(e))),
                      i)
                    : t;
                }),
                (i.value = function (t) {
                  return arguments.length
                    ? ((n = "function" == typeof t ? t : (0, rJ.A)(+t)), i)
                    : n;
                }),
                (i.order = function (t) {
                  return arguments.length
                    ? ((e =
                        null == t
                          ? rY
                          : "function" == typeof t
                            ? t
                            : (0, rJ.A)(Array.from(t))),
                      i)
                    : e;
                }),
                (i.offset = function (t) {
                  return arguments.length ? ((r = null == t ? rK : t), i) : r;
                }),
                i
              );
            })()
              .keys(n)
              .value(function (t, e) {
                return +iy(t, e, 0);
              })
              .order(rY)
              .offset(i)(t);
          },
          iB = function (t, e, r, n, i, o) {
            if (!t) return null;
            var a = (o ? e.reverse() : e).reduce(function (t, e) {
              var i,
                o =
                  null != (i = e.type) && i.defaultProps
                    ? ih(ih({}, e.type.defaultProps), e.props)
                    : e.props,
                a = o.stackId;
              if (o.hide) return t;
              var c = o[r],
                u = t[c] || { hasStack: !1, stackGroups: {} };
              if ((0, io.vh)(a)) {
                var s = u.stackGroups[a] || {
                  numericAxisId: r,
                  cateAxisId: n,
                  items: [],
                };
                s.items.push(e), (u.hasStack = !0), (u.stackGroups[a] = s);
              } else
                u.stackGroups[(0, io.NF)("_stackId_")] = {
                  numericAxisId: r,
                  cateAxisId: n,
                  items: [e],
                };
              return ih(ih({}, t), {}, id({}, c, u));
            }, {});
            return Object.keys(a).reduce(function (e, o) {
              var c = a[o];
              return (
                c.hasStack &&
                  (c.stackGroups = Object.keys(c.stackGroups).reduce(function (
                    e,
                    o,
                  ) {
                    var a = c.stackGroups[o];
                    return ih(
                      ih({}, e),
                      {},
                      id({}, o, {
                        numericAxisId: r,
                        cateAxisId: n,
                        items: a.items,
                        stackedData: iD(t, a.items, i),
                      }),
                    );
                  }, {})),
                ih(ih({}, e), {}, id({}, o, c))
              );
            }, {});
          },
          iR = function (t, e) {
            var r = e.realScaleType,
              n = e.type,
              i = e.tickCount,
              o = e.originalDomain,
              a = e.allowDecimals,
              c = r || e.scale;
            if ("auto" !== c && "linear" !== c) return null;
            if (
              i &&
              "number" === n &&
              o &&
              ("auto" === o[0] || "auto" === o[1])
            ) {
              var u = t.domain();
              if (!u.length) return null;
              var s = ie(u, i, a);
              return t.domain([nr()(s), nt()(s)]), { niceTicks: s };
            }
            return i && "number" === n
              ? { niceTicks: ir(t.domain(), i, a) }
              : null;
          },
          iL = function (t) {
            var e = t.axis,
              r = t.ticks,
              n = t.offset,
              i = t.bandSize,
              o = t.entry,
              a = t.index;
            if ("category" === e.type) return r[a] ? r[a].coordinate + n : null;
            var c = iy(o, e.dataKey, e.domain[a]);
            return ni()(c) ? null : e.scale(c) - i / 2 + n;
          },
          iz = function (t) {
            var e = t.numericAxis,
              r = e.scale.domain();
            if ("number" === e.type) {
              var n = Math.min(r[0], r[1]),
                i = Math.max(r[0], r[1]);
              return n <= 0 && i >= 0 ? 0 : i < 0 ? i : n;
            }
            return r[0];
          },
          iU = function (t, e) {
            var r,
              n = (
                null != (r = t.type) && r.defaultProps
                  ? ih(ih({}, t.type.defaultProps), t.props)
                  : t.props
              ).stackId;
            if ((0, io.vh)(n)) {
              var i = e[n];
              if (i) {
                var o = i.items.indexOf(t);
                return o >= 0 ? i.stackedData[o] : null;
              }
            }
            return null;
          },
          iF = function (t, e, r) {
            return Object.keys(t)
              .reduce(
                function (n, i) {
                  var o = t[i].stackedData.reduce(
                    function (t, n) {
                      var i = n.slice(e, r + 1).reduce(
                        function (t, e) {
                          return [
                            nr()(e.concat([t[0]]).filter(io.Et)),
                            nt()(e.concat([t[1]]).filter(io.Et)),
                          ];
                        },
                        [1 / 0, -1 / 0],
                      );
                      return [Math.min(t[0], i[0]), Math.max(t[1], i[1])];
                    },
                    [1 / 0, -1 / 0],
                  );
                  return [Math.min(o[0], n[0]), Math.max(o[1], n[1])];
                },
                [1 / 0, -1 / 0],
              )
              .map(function (t) {
                return t === 1 / 0 || t === -1 / 0 ? 0 : t;
              });
          },
          iq = /^dataMin[\s]*-[\s]*([0-9]+([.]{1}[0-9]+){0,1})$/,
          i$ = /^dataMax[\s]*\+[\s]*([0-9]+([.]{1}[0-9]+){0,1})$/,
          iW = function (t, e, r) {
            if (na()(t)) return t(e, r);
            if (!Array.isArray(t)) return e;
            var n = [];
            if ((0, io.Et)(t[0])) n[0] = r ? t[0] : Math.min(t[0], e[0]);
            else if (iq.test(t[0])) {
              var i = +iq.exec(t[0])[1];
              n[0] = e[0] - i;
            } else na()(t[0]) ? (n[0] = t[0](e[0])) : (n[0] = e[0]);
            if ((0, io.Et)(t[1])) n[1] = r ? t[1] : Math.max(t[1], e[1]);
            else if (i$.test(t[1])) {
              var o = +i$.exec(t[1])[1];
              n[1] = e[1] + o;
            } else na()(t[1]) ? (n[1] = t[1](e[1])) : (n[1] = e[1]);
            return n;
          },
          iX = function (t, e, r) {
            if (t && t.scale && t.scale.bandwidth) {
              var n = t.scale.bandwidth();
              if (!r || n > 0) return n;
            }
            if (t && e && e.length >= 2) {
              for (
                var i = nx()(e, function (t) {
                    return t.coordinate;
                  }),
                  o = 1 / 0,
                  a = 1,
                  c = i.length;
                a < c;
                a++
              ) {
                var u = i[a],
                  s = i[a - 1];
                o = Math.min((u.coordinate || 0) - (s.coordinate || 0), o);
              }
              return o === 1 / 0 ? 0 : o;
            }
            return r ? void 0 : 0;
          },
          iH = function (t, e, r) {
            return !t ||
              !t.length ||
              nb()(t, nl()(r, "type.defaultProps.domain"))
              ? e
              : t;
          },
          iV = function (t, e) {
            var r = t.type.defaultProps
                ? ih(ih({}, t.type.defaultProps), t.props)
                : t.props,
              n = r.dataKey,
              i = r.name,
              o = r.unit,
              a = r.formatter,
              c = r.tooltipType,
              u = r.chartType,
              s = r.hide;
            return ih(
              ih({}, (0, ia.J9)(t, !1)),
              {},
              {
                dataKey: n,
                unit: o,
                formatter: a,
                name: i || n,
                color: ib(t),
                value: iy(e, n),
                type: c,
                payload: e,
                chartType: u,
                hide: s,
              },
            );
          };
      },
      75672: (t, e, r) => {
        "use strict";
        var n = r(83675),
          i = r(95311);
        t.exports = function (t, e, r) {
          var o = !0,
            a = !0;
          if ("function" != typeof t) throw TypeError("Expected a function");
          return (
            i(r) &&
              ((o = "leading" in r ? !!r.leading : o),
              (a = "trailing" in r ? !!r.trailing : a)),
            n(t, e, { leading: o, maxWait: e, trailing: a })
          );
        };
      },
      75822: (t, e, r) => {
        "use strict";
        r.d(e, { wP: () => i });
        var n = r(32367);
        let i = {
          async getDocuments(t) {
            let e = (0, n.UU)()
              .from("documents")
              .select("*")
              .order("created_at", { ascending: !1 });
            t && e.eq("case_id", t);
            let { data: r, error: i } = await e;
            if (i) throw i;
            return r;
          },
          async getDocumentById(t) {
            let e = (0, n.UU)(),
              { data: r, error: i } = await e
                .from("documents")
                .select("*")
                .eq("id", t)
                .single();
            if (i) throw i;
            return r;
          },
          async uploadDocument(t, e) {
            let r = (0, n.UU)(),
              i = t.name.split(".").pop(),
              o = `${e}/${Date.now()}.${i}`,
              { data: a, error: c } = await r.storage
                .from("documents")
                .upload(o, t);
            if (c) throw c;
            let {
                data: { publicUrl: u },
              } = r.storage.from("documents").getPublicUrl(o),
              { data: s, error: l } = await r
                .from("documents")
                .insert({
                  case_id: e,
                  name: t.name,
                  type: t.type,
                  size: t.size,
                  url: u,
                  path: o,
                })
                .select()
                .single();
            if (l) throw l;
            return s;
          },
          async deleteDocument(t) {
            let e = (0, n.UU)(),
              { data: r, error: i } = await e
                .from("documents")
                .select("path")
                .eq("id", t)
                .single();
            if (i) throw i;
            if (r?.path) {
              let { error: t } = await e.storage
                .from("documents")
                .remove([r.path]);
              if (t) throw t;
            }
            let { error: o } = await e.from("documents").delete().eq("id", t);
            if (o) throw o;
          },
        };
      },
      75919: (t) => {
        "use strict";
        t.exports = require("node:worker_threads");
      },
      75963: (t, e, r) => {
        "use strict";
        var n = r(72392),
          i = Object.prototype.hasOwnProperty;
        t.exports = function (t, e, r, o, a, c) {
          var u = 1 & r,
            s = n(t),
            l = s.length;
          if (l != n(e).length && !u) return !1;
          for (var f = l; f--; ) {
            var p = s[f];
            if (!(u ? p in e : i.call(e, p))) return !1;
          }
          var h = c.get(t),
            d = c.get(e);
          if (h && d) return h == e && d == t;
          var y = !0;
          c.set(t, e), c.set(e, t);
          for (var v = u; ++f < l; ) {
            var m = t[(p = s[f])],
              b = e[p];
            if (o) var g = u ? o(b, m, p, e, t, c) : o(m, b, p, t, e, c);
            if (!(void 0 === g ? m === b || a(m, b, r, o, c) : g)) {
              y = !1;
              break;
            }
            v || (v = "constructor" == p);
          }
          if (y && !v) {
            var x = t.constructor,
              w = e.constructor;
            x != w &&
              "constructor" in t &&
              "constructor" in e &&
              !(
                "function" == typeof x &&
                x instanceof x &&
                "function" == typeof w &&
                w instanceof w
              ) &&
              (y = !1);
          }
          return c.delete(t), c.delete(e), y;
        };
      },
      76760: (t) => {
        "use strict";
        t.exports = require("node:path");
      },
      76987: (t, e, r) => {
        "use strict";
        r.d(e, {
          IZ: () => v,
          Kg: () => y,
          Zk: () => j,
          lY: () => m,
          pr: () => b,
          yy: () => O,
        });
        var n = r(58929),
          i = r.n(n),
          o = r(84205),
          a = r(4276),
          c = r.n(a),
          u = r(61481),
          s = r(75243);
        function l(t) {
          return (l =
            "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
              ? function (t) {
                  return typeof t;
                }
              : function (t) {
                  return t &&
                    "function" == typeof Symbol &&
                    t.constructor === Symbol &&
                    t !== Symbol.prototype
                    ? "symbol"
                    : typeof t;
                })(t);
        }
        function f(t, e) {
          var r = Object.keys(t);
          if (Object.getOwnPropertySymbols) {
            var n = Object.getOwnPropertySymbols(t);
            e &&
              (n = n.filter(function (e) {
                return Object.getOwnPropertyDescriptor(t, e).enumerable;
              })),
              r.push.apply(r, n);
          }
          return r;
        }
        function p(t) {
          for (var e = 1; e < arguments.length; e++) {
            var r = null != arguments[e] ? arguments[e] : {};
            e % 2
              ? f(Object(r), !0).forEach(function (e) {
                  h(t, e, r[e]);
                })
              : Object.getOwnPropertyDescriptors
                ? Object.defineProperties(
                    t,
                    Object.getOwnPropertyDescriptors(r),
                  )
                : f(Object(r)).forEach(function (e) {
                    Object.defineProperty(
                      t,
                      e,
                      Object.getOwnPropertyDescriptor(r, e),
                    );
                  });
          }
          return t;
        }
        function h(t, e, r) {
          var n;
          return (
            ((n = (function (t, e) {
              if ("object" != l(t) || !t) return t;
              var r = t[Symbol.toPrimitive];
              if (void 0 !== r) {
                var n = r.call(t, e || "default");
                if ("object" != l(n)) return n;
                throw TypeError("@@toPrimitive must return a primitive value.");
              }
              return ("string" === e ? String : Number)(t);
            })(e, "string")),
            (e = "symbol" == l(n) ? n : n + "") in t)
              ? Object.defineProperty(t, e, {
                  value: r,
                  enumerable: !0,
                  configurable: !0,
                  writable: !0,
                })
              : (t[e] = r),
            t
          );
        }
        function d(t, e) {
          (null == e || e > t.length) && (e = t.length);
          for (var r = 0, n = Array(e); r < e; r++) n[r] = t[r];
          return n;
        }
        var y = Math.PI / 180,
          v = function (t, e, r, n) {
            return { x: t + Math.cos(-y * n) * r, y: e + Math.sin(-y * n) * r };
          },
          m = function (t, e) {
            var r =
              arguments.length > 2 && void 0 !== arguments[2]
                ? arguments[2]
                : { top: 0, right: 0, bottom: 0, left: 0 };
            return (
              Math.min(
                Math.abs(t - (r.left || 0) - (r.right || 0)),
                Math.abs(e - (r.top || 0) - (r.bottom || 0)),
              ) / 2
            );
          },
          b = function (t, e, r, n, o) {
            var a = t.width,
              c = t.height,
              l = t.startAngle,
              f = t.endAngle,
              y = (0, u.F4)(t.cx, a, a / 2),
              v = (0, u.F4)(t.cy, c, c / 2),
              b = m(a, c, r),
              g = (0, u.F4)(t.innerRadius, b, 0),
              x = (0, u.F4)(t.outerRadius, b, 0.8 * b);
            return Object.keys(e).reduce(function (t, r) {
              var a,
                c = e[r],
                u = c.domain,
                m = c.reversed;
              if (i()(c.range))
                "angleAxis" === n
                  ? (a = [l, f])
                  : "radiusAxis" === n && (a = [g, x]),
                  m && (a = [a[1], a[0]]);
              else {
                var b,
                  w =
                    (function (t) {
                      if (Array.isArray(t)) return t;
                    })((b = a = c.range)) ||
                    (function (t, e) {
                      var r =
                        null == t
                          ? null
                          : ("undefined" != typeof Symbol &&
                              t[Symbol.iterator]) ||
                            t["@@iterator"];
                      if (null != r) {
                        var n,
                          i,
                          o,
                          a,
                          c = [],
                          u = !0,
                          s = !1;
                        try {
                          (o = (r = r.call(t)).next), !1;
                          for (
                            ;
                            !(u = (n = o.call(r)).done) &&
                            (c.push(n.value), c.length !== e);
                            u = !0
                          );
                        } catch (t) {
                          (s = !0), (i = t);
                        } finally {
                          try {
                            if (
                              !u &&
                              null != r.return &&
                              ((a = r.return()), Object(a) !== a)
                            )
                              return;
                          } finally {
                            if (s) throw i;
                          }
                        }
                        return c;
                      }
                    })(b, 2) ||
                    (function (t, e) {
                      if (t) {
                        if ("string" == typeof t) return d(t, 2);
                        var r = Object.prototype.toString.call(t).slice(8, -1);
                        if (
                          ("Object" === r &&
                            t.constructor &&
                            (r = t.constructor.name),
                          "Map" === r || "Set" === r)
                        )
                          return Array.from(t);
                        if (
                          "Arguments" === r ||
                          /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)
                        )
                          return d(t, e);
                      }
                    })(b, 2) ||
                    (function () {
                      throw TypeError(
                        "Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.",
                      );
                    })();
                (l = w[0]), (f = w[1]);
              }
              var O = (0, s.W7)(c, o),
                j = O.realScaleType,
                S = O.scale;
              S.domain(u).range(a), (0, s.YB)(S);
              var A = (0, s.w7)(S, p(p({}, c), {}, { realScaleType: j })),
                P = p(
                  p(p({}, c), A),
                  {},
                  {
                    range: a,
                    radius: x,
                    realScaleType: j,
                    scale: S,
                    cx: y,
                    cy: v,
                    innerRadius: g,
                    outerRadius: x,
                    startAngle: l,
                    endAngle: f,
                  },
                );
              return p(p({}, t), {}, h({}, r, P));
            }, {});
          },
          g = function (t, e) {
            var r = t.x,
              n = t.y;
            return Math.sqrt(Math.pow(r - e.x, 2) + Math.pow(n - e.y, 2));
          },
          x = function (t, e) {
            var r = t.x,
              n = t.y,
              i = e.cx,
              o = e.cy,
              a = g({ x: r, y: n }, { x: i, y: o });
            if (a <= 0) return { radius: a };
            var c = Math.acos((r - i) / a);
            return (
              n > o && (c = 2 * Math.PI - c),
              { radius: a, angle: (180 * c) / Math.PI, angleInRadian: c }
            );
          },
          w = function (t) {
            var e = t.startAngle,
              r = t.endAngle,
              n = Math.min(Math.floor(e / 360), Math.floor(r / 360));
            return { startAngle: e - 360 * n, endAngle: r - 360 * n };
          },
          O = function (t, e) {
            var r,
              n = x({ x: t.x, y: t.y }, e),
              i = n.radius,
              o = n.angle,
              a = e.innerRadius,
              c = e.outerRadius;
            if (i < a || i > c) return !1;
            if (0 === i) return !0;
            var u = w(e),
              s = u.startAngle,
              l = u.endAngle,
              f = o;
            if (s <= l) {
              for (; f > l; ) f -= 360;
              for (; f < s; ) f += 360;
              r = f >= s && f <= l;
            } else {
              for (; f > s; ) f -= 360;
              for (; f < l; ) f += 360;
              r = f >= l && f <= s;
            }
            return r
              ? p(
                  p({}, e),
                  {},
                  {
                    radius: i,
                    angle:
                      f +
                      360 *
                        Math.min(
                          Math.floor(e.startAngle / 360),
                          Math.floor(e.endAngle / 360),
                        ),
                  },
                )
              : null;
          },
          j = function (t) {
            return (0, o.isValidElement)(t) || c()(t) || "boolean" == typeof t
              ? ""
              : t.className;
          };
      },
      77001: (t, e, r) => {
        "use strict";
        r.a(t, async (t, n) => {
          try {
            r.d(e, {
              Tabs: () => u,
              TabsContent: () => f,
              TabsList: () => s,
              TabsTrigger: () => l,
            });
            var i = r(61268),
              o = r(28366);
            r(84205);
            var a = r(15942),
              c = t([a]);
            function u({ className: t, ...e }) {
              return (0, i.jsx)(o.bL, {
                "data-slot": "tabs",
                className: (0, a.cn)("flex flex-col gap-2", t),
                ...e,
              });
            }
            function s({ className: t, ...e }) {
              return (0, i.jsx)(o.B8, {
                "data-slot": "tabs-list",
                className: (0, a.cn)(
                  "bg-muted text-muted-foreground inline-flex h-9 w-fit items-center justify-center rounded-lg p-[3px]",
                  t,
                ),
                ...e,
              });
            }
            function l({ className: t, ...e }) {
              return (0, i.jsx)(o.l9, {
                "data-slot": "tabs-trigger",
                className: (0, a.cn)(
                  "data-[state=active]:bg-background dark:data-[state=active]:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:outline-ring dark:data-[state=active]:border-input dark:data-[state=active]:bg-input/30 text-foreground dark:text-muted-foreground inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-md border border-transparent px-2 py-1 text-sm font-medium whitespace-nowrap transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:shadow-sm [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
                  t,
                ),
                ...e,
              });
            }
            function f({ className: t, ...e }) {
              return (0, i.jsx)(o.UC, {
                "data-slot": "tabs-content",
                className: (0, a.cn)("flex-1 outline-none", t),
                ...e,
              });
            }
            (a = (c.then ? (await c)() : c)[0]), n();
          } catch (t) {
            n(t);
          }
        });
      },
      77030: (t) => {
        "use strict";
        t.exports = require("node:net");
      },
      77095: (t, e, r) => {
        "use strict";
        function n(t) {
          return function () {
            return t;
          };
        }
        r.d(e, { A: () => n });
      },
      77175: (t) => {
        "use strict";
        t.exports = function (t) {
          return function (e) {
            return t(e);
          };
        };
      },
      77214: (t, e, r) => {
        "use strict";
        r.d(e, { c: () => u });
        var n = r(84205),
          i = r(79029),
          o = r(10621),
          a = r(18862);
        function c() {
          return (c = Object.assign
            ? Object.assign.bind()
            : function (t) {
                for (var e = 1; e < arguments.length; e++) {
                  var r = arguments[e];
                  for (var n in r)
                    Object.prototype.hasOwnProperty.call(r, n) && (t[n] = r[n]);
                }
                return t;
              }).apply(this, arguments);
        }
        var u = function (t) {
          var e = t.cx,
            r = t.cy,
            u = t.r,
            s = t.className,
            l = (0, i.A)("recharts-dot", s);
          return e === +e && r === +r && u === +u
            ? n.createElement(
                "circle",
                c({}, (0, a.J9)(t, !1), (0, o._U)(t), {
                  className: l,
                  cx: e,
                  cy: r,
                  r: u,
                }),
              )
            : null;
        };
      },
      77404: (t, e, r) => {
        "use strict";
        var n = r(4276),
          i = r(90236);
        t.exports = function (t) {
          return null != t && i(t.length) && !n(t);
        };
      },
      77488: (t, e, r) => {
        "use strict";
        var n = r(38785);
        t.exports = function (t) {
          var e = n(this, t).delete(t);
          return (this.size -= +!!e), e;
        };
      },
      77598: (t) => {
        "use strict";
        t.exports = require("node:crypto");
      },
      77895: (t, e, r) => {
        "use strict";
        t = r.nmd(t);
        var n = r(56634),
          i = e && !e.nodeType && e,
          o = i && t && !t.nodeType && t,
          a = o && o.exports === i && n.process,
          c = (function () {
            try {
              var t = o && o.require && o.require("util").types;
              if (t) return t;
              return a && a.binding && a.binding("util");
            } catch (t) {}
          })();
        t.exports = c;
      },
      79208: (t, e, r) => {
        "use strict";
        var n = r(83855),
          i = r(85412),
          o = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
          a = /^\w*$/;
        t.exports = function (t, e) {
          if (n(t)) return !1;
          var r = typeof t;
          return (
            !!(
              "number" == r ||
              "symbol" == r ||
              "boolean" == r ||
              null == t ||
              i(t)
            ) ||
            a.test(t) ||
            !o.test(t) ||
            (null != e && t in Object(e))
          );
        };
      },
      79428: (t) => {
        "use strict";
        t.exports = require("buffer");
      },
      79551: (t) => {
        "use strict";
        t.exports = require("url");
      },
      79646: (t) => {
        "use strict";
        t.exports = require("child_process");
      },
      79669: (t, e, r) => {
        "use strict";
        r.d(e, { J: () => P });
        var n = r(84205),
          i = r.n(n),
          o = r(58929),
          a = r.n(o),
          c = r(4276),
          u = r.n(c),
          s = r(95311),
          l = r.n(s),
          f = r(79029),
          p = r(6265),
          h = r(18862),
          d = r(61481),
          y = r(76987);
        function v(t) {
          return (v =
            "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
              ? function (t) {
                  return typeof t;
                }
              : function (t) {
                  return t &&
                    "function" == typeof Symbol &&
                    t.constructor === Symbol &&
                    t !== Symbol.prototype
                    ? "symbol"
                    : typeof t;
                })(t);
        }
        var m = ["offset"];
        function b(t, e) {
          (null == e || e > t.length) && (e = t.length);
          for (var r = 0, n = Array(e); r < e; r++) n[r] = t[r];
          return n;
        }
        function g(t, e) {
          var r = Object.keys(t);
          if (Object.getOwnPropertySymbols) {
            var n = Object.getOwnPropertySymbols(t);
            e &&
              (n = n.filter(function (e) {
                return Object.getOwnPropertyDescriptor(t, e).enumerable;
              })),
              r.push.apply(r, n);
          }
          return r;
        }
        function x(t) {
          for (var e = 1; e < arguments.length; e++) {
            var r = null != arguments[e] ? arguments[e] : {};
            e % 2
              ? g(Object(r), !0).forEach(function (e) {
                  var n, i, o;
                  (n = t),
                    (i = e),
                    (o = r[e]),
                    (i = (function (t) {
                      var e = (function (t, e) {
                        if ("object" != v(t) || !t) return t;
                        var r = t[Symbol.toPrimitive];
                        if (void 0 !== r) {
                          var n = r.call(t, e || "default");
                          if ("object" != v(n)) return n;
                          throw TypeError(
                            "@@toPrimitive must return a primitive value.",
                          );
                        }
                        return ("string" === e ? String : Number)(t);
                      })(t, "string");
                      return "symbol" == v(e) ? e : e + "";
                    })(i)) in n
                      ? Object.defineProperty(n, i, {
                          value: o,
                          enumerable: !0,
                          configurable: !0,
                          writable: !0,
                        })
                      : (n[i] = o);
                })
              : Object.getOwnPropertyDescriptors
                ? Object.defineProperties(
                    t,
                    Object.getOwnPropertyDescriptors(r),
                  )
                : g(Object(r)).forEach(function (e) {
                    Object.defineProperty(
                      t,
                      e,
                      Object.getOwnPropertyDescriptor(r, e),
                    );
                  });
          }
          return t;
        }
        function w() {
          return (w = Object.assign
            ? Object.assign.bind()
            : function (t) {
                for (var e = 1; e < arguments.length; e++) {
                  var r = arguments[e];
                  for (var n in r)
                    Object.prototype.hasOwnProperty.call(r, n) && (t[n] = r[n]);
                }
                return t;
              }).apply(this, arguments);
        }
        var O = function (t) {
            var e = t.value,
              r = t.formatter,
              n = a()(t.children) ? e : t.children;
            return u()(r) ? r(n) : n;
          },
          j = function (t, e, r) {
            var n,
              o,
              c = t.position,
              u = t.viewBox,
              s = t.offset,
              l = t.className,
              p = u.cx,
              h = u.cy,
              v = u.innerRadius,
              m = u.outerRadius,
              b = u.startAngle,
              g = u.endAngle,
              x = u.clockWise,
              O = (v + m) / 2,
              j = (0, d.sA)(g - b) * Math.min(Math.abs(g - b), 360),
              S = j >= 0 ? 1 : -1;
            "insideStart" === c
              ? ((n = b + S * s), (o = x))
              : "insideEnd" === c
                ? ((n = g - S * s), (o = !x))
                : "end" === c && ((n = g + S * s), (o = x)),
              (o = j <= 0 ? o : !o);
            var A = (0, y.IZ)(p, h, O, n),
              P = (0, y.IZ)(p, h, O, n + (o ? 1 : -1) * 359),
              E = "M"
                .concat(A.x, ",")
                .concat(A.y, "\n    A")
                .concat(O, ",")
                .concat(O, ",0,1,")
                .concat(+!o, ",\n    ")
                .concat(P.x, ",")
                .concat(P.y),
              k = a()(t.id) ? (0, d.NF)("recharts-radial-line-") : t.id;
            return i().createElement(
              "text",
              w({}, r, {
                dominantBaseline: "central",
                className: (0, f.A)("recharts-radial-bar-label", l),
              }),
              i().createElement(
                "defs",
                null,
                i().createElement("path", { id: k, d: E }),
              ),
              i().createElement("textPath", { xlinkHref: "#".concat(k) }, e),
            );
          },
          S = function (t) {
            var e = t.viewBox,
              r = t.offset,
              n = t.position,
              i = e.cx,
              o = e.cy,
              a = e.innerRadius,
              c = e.outerRadius,
              u = (e.startAngle + e.endAngle) / 2;
            if ("outside" === n) {
              var s = (0, y.IZ)(i, o, c + r, u),
                l = s.x;
              return {
                x: l,
                y: s.y,
                textAnchor: l >= i ? "start" : "end",
                verticalAnchor: "middle",
              };
            }
            if ("center" === n)
              return {
                x: i,
                y: o,
                textAnchor: "middle",
                verticalAnchor: "middle",
              };
            if ("centerTop" === n)
              return {
                x: i,
                y: o,
                textAnchor: "middle",
                verticalAnchor: "start",
              };
            if ("centerBottom" === n)
              return {
                x: i,
                y: o,
                textAnchor: "middle",
                verticalAnchor: "end",
              };
            var f = (0, y.IZ)(i, o, (a + c) / 2, u);
            return {
              x: f.x,
              y: f.y,
              textAnchor: "middle",
              verticalAnchor: "middle",
            };
          },
          A = function (t) {
            var e = t.viewBox,
              r = t.parentViewBox,
              n = t.offset,
              i = t.position,
              o = e.x,
              a = e.y,
              c = e.width,
              u = e.height,
              s = u >= 0 ? 1 : -1,
              f = s * n,
              p = s > 0 ? "end" : "start",
              h = s > 0 ? "start" : "end",
              y = c >= 0 ? 1 : -1,
              v = y * n,
              m = y > 0 ? "end" : "start",
              b = y > 0 ? "start" : "end";
            if ("top" === i)
              return x(
                x(
                  {},
                  {
                    x: o + c / 2,
                    y: a - s * n,
                    textAnchor: "middle",
                    verticalAnchor: p,
                  },
                ),
                r ? { height: Math.max(a - r.y, 0), width: c } : {},
              );
            if ("bottom" === i)
              return x(
                x(
                  {},
                  {
                    x: o + c / 2,
                    y: a + u + f,
                    textAnchor: "middle",
                    verticalAnchor: h,
                  },
                ),
                r
                  ? { height: Math.max(r.y + r.height - (a + u), 0), width: c }
                  : {},
              );
            if ("left" === i) {
              var g = {
                x: o - v,
                y: a + u / 2,
                textAnchor: m,
                verticalAnchor: "middle",
              };
              return x(
                x({}, g),
                r ? { width: Math.max(g.x - r.x, 0), height: u } : {},
              );
            }
            if ("right" === i) {
              var w = {
                x: o + c + v,
                y: a + u / 2,
                textAnchor: b,
                verticalAnchor: "middle",
              };
              return x(
                x({}, w),
                r ? { width: Math.max(r.x + r.width - w.x, 0), height: u } : {},
              );
            }
            var O = r ? { width: c, height: u } : {};
            return "insideLeft" === i
              ? x(
                  {
                    x: o + v,
                    y: a + u / 2,
                    textAnchor: b,
                    verticalAnchor: "middle",
                  },
                  O,
                )
              : "insideRight" === i
                ? x(
                    {
                      x: o + c - v,
                      y: a + u / 2,
                      textAnchor: m,
                      verticalAnchor: "middle",
                    },
                    O,
                  )
                : "insideTop" === i
                  ? x(
                      {
                        x: o + c / 2,
                        y: a + f,
                        textAnchor: "middle",
                        verticalAnchor: h,
                      },
                      O,
                    )
                  : "insideBottom" === i
                    ? x(
                        {
                          x: o + c / 2,
                          y: a + u - f,
                          textAnchor: "middle",
                          verticalAnchor: p,
                        },
                        O,
                      )
                    : "insideTopLeft" === i
                      ? x(
                          {
                            x: o + v,
                            y: a + f,
                            textAnchor: b,
                            verticalAnchor: h,
                          },
                          O,
                        )
                      : "insideTopRight" === i
                        ? x(
                            {
                              x: o + c - v,
                              y: a + f,
                              textAnchor: m,
                              verticalAnchor: h,
                            },
                            O,
                          )
                        : "insideBottomLeft" === i
                          ? x(
                              {
                                x: o + v,
                                y: a + u - f,
                                textAnchor: b,
                                verticalAnchor: p,
                              },
                              O,
                            )
                          : "insideBottomRight" === i
                            ? x(
                                {
                                  x: o + c - v,
                                  y: a + u - f,
                                  textAnchor: m,
                                  verticalAnchor: p,
                                },
                                O,
                              )
                            : l()(i) &&
                                ((0, d.Et)(i.x) || (0, d._3)(i.x)) &&
                                ((0, d.Et)(i.y) || (0, d._3)(i.y))
                              ? x(
                                  {
                                    x: o + (0, d.F4)(i.x, c),
                                    y: a + (0, d.F4)(i.y, u),
                                    textAnchor: "end",
                                    verticalAnchor: "end",
                                  },
                                  O,
                                )
                              : x(
                                  {
                                    x: o + c / 2,
                                    y: a + u / 2,
                                    textAnchor: "middle",
                                    verticalAnchor: "middle",
                                  },
                                  O,
                                );
          };
        function P(t) {
          var e,
            r = t.offset,
            o = x(
              { offset: void 0 === r ? 5 : r },
              (function (t, e) {
                if (null == t) return {};
                var r,
                  n,
                  i = (function (t, e) {
                    if (null == t) return {};
                    var r = {};
                    for (var n in t)
                      if (Object.prototype.hasOwnProperty.call(t, n)) {
                        if (e.indexOf(n) >= 0) continue;
                        r[n] = t[n];
                      }
                    return r;
                  })(t, e);
                if (Object.getOwnPropertySymbols) {
                  var o = Object.getOwnPropertySymbols(t);
                  for (n = 0; n < o.length; n++)
                    (r = o[n]),
                      !(e.indexOf(r) >= 0) &&
                        Object.prototype.propertyIsEnumerable.call(t, r) &&
                        (i[r] = t[r]);
                }
                return i;
              })(t, m),
            ),
            c = o.viewBox,
            s = o.position,
            l = o.value,
            y = o.children,
            v = o.content,
            b = o.className,
            g = o.textBreakAll;
          if (!c || (a()(l) && a()(y) && !(0, n.isValidElement)(v) && !u()(v)))
            return null;
          if ((0, n.isValidElement)(v)) return (0, n.cloneElement)(v, o);
          if (u()(v)) {
            if (((e = (0, n.createElement)(v, o)), (0, n.isValidElement)(e)))
              return e;
          } else e = O(o);
          var P = "cx" in c && (0, d.Et)(c.cx),
            E = (0, h.J9)(o, !0);
          if (P && ("insideStart" === s || "insideEnd" === s || "end" === s))
            return j(o, e, E);
          var k = P ? S(o) : A(o);
          return i().createElement(
            p.E,
            w(
              { className: (0, f.A)("recharts-label", void 0 === b ? "" : b) },
              E,
              k,
              { breakAll: g },
            ),
            e,
          );
        }
        P.displayName = "Label";
        var E = function (t) {
          var e = t.cx,
            r = t.cy,
            n = t.angle,
            i = t.startAngle,
            o = t.endAngle,
            a = t.r,
            c = t.radius,
            u = t.innerRadius,
            s = t.outerRadius,
            l = t.x,
            f = t.y,
            p = t.top,
            h = t.left,
            y = t.width,
            v = t.height,
            m = t.clockWise,
            b = t.labelViewBox;
          if (b) return b;
          if ((0, d.Et)(y) && (0, d.Et)(v)) {
            if ((0, d.Et)(l) && (0, d.Et)(f))
              return { x: l, y: f, width: y, height: v };
            if ((0, d.Et)(p) && (0, d.Et)(h))
              return { x: p, y: h, width: y, height: v };
          }
          return (0, d.Et)(l) && (0, d.Et)(f)
            ? { x: l, y: f, width: 0, height: 0 }
            : (0, d.Et)(e) && (0, d.Et)(r)
              ? {
                  cx: e,
                  cy: r,
                  startAngle: i || n || 0,
                  endAngle: o || n || 0,
                  innerRadius: u || 0,
                  outerRadius: s || c || a || 0,
                  clockWise: m,
                }
              : t.viewBox
                ? t.viewBox
                : {};
        };
        (P.parseViewBox = E),
          (P.renderCallByParent = function (t, e) {
            var r,
              o,
              a =
                !(arguments.length > 2) ||
                void 0 === arguments[2] ||
                arguments[2];
            if (!t || (!t.children && a && !t.label)) return null;
            var c = t.children,
              s = E(t),
              f = (0, h.aS)(c, P).map(function (t, r) {
                return (0, n.cloneElement)(t, {
                  viewBox: e || s,
                  key: "label-".concat(r),
                });
              });
            if (!a) return f;
            return [
              ((r = t.label),
              (o = e || s),
              !r
                ? null
                : !0 === r
                  ? i().createElement(P, { key: "label-implicit", viewBox: o })
                  : (0, d.vh)(r)
                    ? i().createElement(P, {
                        key: "label-implicit",
                        viewBox: o,
                        value: r,
                      })
                    : (0, n.isValidElement)(r)
                      ? r.type === P
                        ? (0, n.cloneElement)(r, {
                            key: "label-implicit",
                            viewBox: o,
                          })
                        : i().createElement(P, {
                            key: "label-implicit",
                            content: r,
                            viewBox: o,
                          })
                      : u()(r)
                        ? i().createElement(P, {
                            key: "label-implicit",
                            content: r,
                            viewBox: o,
                          })
                        : l()(r)
                          ? i().createElement(
                              P,
                              w({ viewBox: o }, r, { key: "label-implicit" }),
                            )
                          : null),
            ].concat(
              (function (t) {
                if (Array.isArray(t)) return b(t);
              })(f) ||
                (function (t) {
                  if (
                    ("undefined" != typeof Symbol &&
                      null != t[Symbol.iterator]) ||
                    null != t["@@iterator"]
                  )
                    return Array.from(t);
                })(f) ||
                (function (t, e) {
                  if (t) {
                    if ("string" == typeof t) return b(t, void 0);
                    var r = Object.prototype.toString.call(t).slice(8, -1);
                    if (
                      ("Object" === r &&
                        t.constructor &&
                        (r = t.constructor.name),
                      "Map" === r || "Set" === r)
                    )
                      return Array.from(t);
                    if (
                      "Arguments" === r ||
                      /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)
                    )
                      return b(t, e);
                  }
                })(f) ||
                (function () {
                  throw TypeError(
                    "Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.",
                  );
                })(),
            );
          });
      },
      80481: (t) => {
        "use strict";
        t.exports = require("node:readline");
      },
      80657: (t, e, r) => {
        "use strict";
        var n = r(28017),
          i = r(64508);
        t.exports = function (t) {
          return "number" == typeof t || (i(t) && "[object Number]" == n(t));
        };
      },
      80855: (t, e, r) => {
        "use strict";
        r.d(e, { i: () => u });
        let n = Math.PI,
          i = 2 * n,
          o = i - 1e-6;
        function a(t) {
          this._ += t[0];
          for (let e = 1, r = t.length; e < r; ++e)
            this._ += arguments[e] + t[e];
        }
        class c {
          constructor(t) {
            (this._x0 = this._y0 = this._x1 = this._y1 = null),
              (this._ = ""),
              (this._append =
                null == t
                  ? a
                  : (function (t) {
                      let e = Math.floor(t);
                      if (!(e >= 0)) throw Error(`invalid digits: ${t}`);
                      if (e > 15) return a;
                      let r = 10 ** e;
                      return function (t) {
                        this._ += t[0];
                        for (let e = 1, n = t.length; e < n; ++e)
                          this._ += Math.round(arguments[e] * r) / r + t[e];
                      };
                    })(t));
          }
          moveTo(t, e) {
            this
              ._append`M${(this._x0 = this._x1 = +t)},${(this._y0 = this._y1 = +e)}`;
          }
          closePath() {
            null !== this._x1 &&
              ((this._x1 = this._x0), (this._y1 = this._y0), this._append`Z`);
          }
          lineTo(t, e) {
            this._append`L${(this._x1 = +t)},${(this._y1 = +e)}`;
          }
          quadraticCurveTo(t, e, r, n) {
            this._append`Q${+t},${+e},${(this._x1 = +r)},${(this._y1 = +n)}`;
          }
          bezierCurveTo(t, e, r, n, i, o) {
            this
              ._append`C${+t},${+e},${+r},${+n},${(this._x1 = +i)},${(this._y1 = +o)}`;
          }
          arcTo(t, e, r, i, o) {
            if (((t *= 1), (e *= 1), (r *= 1), (i *= 1), (o *= 1) < 0))
              throw Error(`negative radius: ${o}`);
            let a = this._x1,
              c = this._y1,
              u = r - t,
              s = i - e,
              l = a - t,
              f = c - e,
              p = l * l + f * f;
            if (null === this._x1)
              this._append`M${(this._x1 = t)},${(this._y1 = e)}`;
            else if (p > 1e-6)
              if (Math.abs(f * u - s * l) > 1e-6 && o) {
                let h = r - a,
                  d = i - c,
                  y = u * u + s * s,
                  v = Math.sqrt(y),
                  m = Math.sqrt(p),
                  b =
                    o *
                    Math.tan(
                      (n - Math.acos((y + p - (h * h + d * d)) / (2 * v * m))) /
                        2,
                    ),
                  g = b / m,
                  x = b / v;
                Math.abs(g - 1) > 1e-6 &&
                  this._append`L${t + g * l},${e + g * f}`,
                  this
                    ._append`A${o},${o},0,0,${+(f * h > l * d)},${(this._x1 = t + x * u)},${(this._y1 = e + x * s)}`;
              } else this._append`L${(this._x1 = t)},${(this._y1 = e)}`;
          }
          arc(t, e, r, a, c, u) {
            if (((t *= 1), (e *= 1), (r *= 1), (u = !!u), r < 0))
              throw Error(`negative radius: ${r}`);
            let s = r * Math.cos(a),
              l = r * Math.sin(a),
              f = t + s,
              p = e + l,
              h = 1 ^ u,
              d = u ? a - c : c - a;
            null === this._x1
              ? this._append`M${f},${p}`
              : (Math.abs(this._x1 - f) > 1e-6 ||
                  Math.abs(this._y1 - p) > 1e-6) &&
                this._append`L${f},${p}`,
              r &&
                (d < 0 && (d = (d % i) + i),
                d > o
                  ? this
                      ._append`A${r},${r},0,1,${h},${t - s},${e - l}A${r},${r},0,1,${h},${(this._x1 = f)},${(this._y1 = p)}`
                  : d > 1e-6 &&
                    this
                      ._append`A${r},${r},0,${+(d >= n)},${h},${(this._x1 = t + r * Math.cos(c))},${(this._y1 = e + r * Math.sin(c))}`);
          }
          rect(t, e, r, n) {
            this
              ._append`M${(this._x0 = this._x1 = +t)},${(this._y0 = this._y1 = +e)}h${(r *= 1)}v${+n}h${-r}Z`;
          }
          toString() {
            return this._;
          }
        }
        function u(t) {
          let e = 3;
          return (
            (t.digits = function (r) {
              if (!arguments.length) return e;
              if (null == r) e = null;
              else {
                let t = Math.floor(r);
                if (!(t >= 0)) throw RangeError(`invalid digits: ${r}`);
                e = t;
              }
              return t;
            }),
            () => new c(e)
          );
        }
        c.prototype;
      },
      81105: (t, e, r) => {
        "use strict";
        var n = r(3395),
          i = r(8603),
          o = r(63428),
          a = r(83855),
          c = r(24762);
        t.exports = function (t, e, r) {
          var u = a(t) ? n : i;
          return r && c(t, e, r) && (e = void 0), u(t, o(e, 3));
        };
      },
      81379: (t, e, r) => {
        "use strict";
        var n = r(51758);
        t.exports = function (t, e) {
          for (var r = t.length; r--; ) if (n(t[r][0], e)) return r;
          return -1;
        };
      },
      81494: (t, e, r) => {
        "use strict";
        var n = r(5074),
          i = r(57680);
        t.exports = function (t) {
          for (var e = i(t), r = e.length; r--; ) {
            var o = e[r],
              a = t[o];
            e[r] = [o, a, n(a)];
          }
          return e;
        };
      },
      81630: (t) => {
        "use strict";
        t.exports = require("http");
      },
      81828: (t) => {
        "use strict";
        t.exports = function (t) {
          var e = typeof t;
          return "string" == e ||
            "number" == e ||
            "symbol" == e ||
            "boolean" == e
            ? "__proto__" !== t
            : null === t;
        };
      },
      82121: (t, e, r) => {
        "use strict";
        var n = r(81379);
        t.exports = function (t) {
          return n(this.__data__, t) > -1;
        };
      },
      83048: (t, e, r) => {
        "use strict";
        var n = r(55290),
          i = r(95311),
          o = r(85412),
          a = 0 / 0,
          c = /^[-+]0x[0-9a-f]+$/i,
          u = /^0b[01]+$/i,
          s = /^0o[0-7]+$/i,
          l = parseInt;
        t.exports = function (t) {
          if ("number" == typeof t) return t;
          if (o(t)) return a;
          if (i(t)) {
            var e = "function" == typeof t.valueOf ? t.valueOf() : t;
            t = i(e) ? e + "" : e;
          }
          if ("string" != typeof t) return 0 === t ? t : +t;
          t = n(t);
          var r = u.test(t);
          return r || s.test(t) ? l(t.slice(2), r ? 2 : 8) : c.test(t) ? a : +t;
        };
      },
      83098: (t, e, r) => {
        "use strict";
        t.exports = r(43960)(r(40671), "Promise");
      },
      83649: (t, e, r) => {
        "use strict";
        var n = r(43960);
        t.exports = (function () {
          try {
            var t = n(Object, "defineProperty");
            return t({}, "", {}), t;
          } catch (t) {}
        })();
      },
      83675: (t, e, r) => {
        "use strict";
        var n = r(95311),
          i = r(16778),
          o = r(83048),
          a = Math.max,
          c = Math.min;
        t.exports = function (t, e, r) {
          var u,
            s,
            l,
            f,
            p,
            h,
            d = 0,
            y = !1,
            v = !1,
            m = !0;
          if ("function" != typeof t) throw TypeError("Expected a function");
          function b(e) {
            var r = u,
              n = s;
            return (u = s = void 0), (d = e), (f = t.apply(n, r));
          }
          function g(t) {
            var r = t - h,
              n = t - d;
            return void 0 === h || r >= e || r < 0 || (v && n >= l);
          }
          function x() {
            var t,
              r,
              n,
              o = i();
            if (g(o)) return w(o);
            p = setTimeout(
              x,
              ((t = o - h), (r = o - d), (n = e - t), v ? c(n, l - r) : n),
            );
          }
          function w(t) {
            return ((p = void 0), m && u) ? b(t) : ((u = s = void 0), f);
          }
          function O() {
            var t,
              r = i(),
              n = g(r);
            if (((u = arguments), (s = this), (h = r), n)) {
              if (void 0 === p)
                return (d = t = h), (p = setTimeout(x, e)), y ? b(t) : f;
              if (v) return clearTimeout(p), (p = setTimeout(x, e)), b(h);
            }
            return void 0 === p && (p = setTimeout(x, e)), f;
          }
          return (
            (e = o(e) || 0),
            n(r) &&
              ((y = !!r.leading),
              (l = (v = "maxWait" in r) ? a(o(r.maxWait) || 0, e) : l),
              (m = "trailing" in r ? !!r.trailing : m)),
            (O.cancel = function () {
              void 0 !== p && clearTimeout(p),
                (d = 0),
                (u = h = s = p = void 0);
            }),
            (O.flush = function () {
              return void 0 === p ? f : w(i());
            }),
            O
          );
        };
      },
      83855: (t) => {
        "use strict";
        t.exports = Array.isArray;
      },
      83997: (t) => {
        "use strict";
        t.exports = require("tty");
      },
      84297: (t) => {
        "use strict";
        t.exports = require("async_hooks");
      },
      85398: (t, e, r) => {
        "use strict";
        var n = r(513);
        t.exports = function () {
          (this.__data__ = new n()), (this.size = 0);
        };
      },
      85412: (t, e, r) => {
        "use strict";
        var n = r(28017),
          i = r(64508);
        t.exports = function (t) {
          return "symbol" == typeof t || (i(t) && "[object Symbol]" == n(t));
        };
      },
      85488: (t) => {
        "use strict";
        t.exports = import("ai");
      },
      85828: (t, e, r) => {
        "use strict";
        t.exports = r(54217)(Object.keys, Object);
      },
      85969: (t) => {
        "use strict";
        var e = Math.ceil,
          r = Math.max;
        t.exports = function (t, n, i, o) {
          for (var a = -1, c = r(e((n - t) / (i || 1)), 0), u = Array(c); c--; )
            (u[o ? c : ++a] = t), (t += i);
          return u;
        };
      },
      86017: (t) => {
        "use strict";
        t.exports = function (t) {
          var e = -1,
            r = Array(t.size);
          return (
            t.forEach(function (t) {
              r[++e] = t;
            }),
            r
          );
        };
      },
      86154: (t, e, r) => {
        "use strict";
        var n = r(20006),
          i = r(51713);
        t.exports = function t(e, r, o, a, c) {
          var u = -1,
            s = e.length;
          for (o || (o = i), c || (c = []); ++u < s; ) {
            var l = e[u];
            r > 0 && o(l)
              ? r > 1
                ? t(l, r - 1, o, a, c)
                : n(c, l)
              : a || (c[c.length] = l);
          }
          return c;
        };
      },
      86592: (t) => {
        "use strict";
        t.exports = require("node:inspector");
      },
      86594: (t, e, r) => {
        "use strict";
        r.d(e, { y: () => F });
        var n = r(84205),
          i = r.n(n),
          o = r(79029),
          a = r(7469),
          c = r(5642),
          u = r.n(c),
          s = r(58929),
          l = r.n(s),
          f = r(57830),
          p = r(58435),
          h = r(57611),
          d = r(2385),
          y = r(61481),
          v = r(18862),
          m = r(44729),
          b = r(75243),
          g = r(10621),
          x = r(24236),
          w = r(54569),
          O = ["x", "y"];
        function j(t) {
          return (j =
            "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
              ? function (t) {
                  return typeof t;
                }
              : function (t) {
                  return t &&
                    "function" == typeof Symbol &&
                    t.constructor === Symbol &&
                    t !== Symbol.prototype
                    ? "symbol"
                    : typeof t;
                })(t);
        }
        function S() {
          return (S = Object.assign
            ? Object.assign.bind()
            : function (t) {
                for (var e = 1; e < arguments.length; e++) {
                  var r = arguments[e];
                  for (var n in r)
                    Object.prototype.hasOwnProperty.call(r, n) && (t[n] = r[n]);
                }
                return t;
              }).apply(this, arguments);
        }
        function A(t, e) {
          var r = Object.keys(t);
          if (Object.getOwnPropertySymbols) {
            var n = Object.getOwnPropertySymbols(t);
            e &&
              (n = n.filter(function (e) {
                return Object.getOwnPropertyDescriptor(t, e).enumerable;
              })),
              r.push.apply(r, n);
          }
          return r;
        }
        function P(t) {
          for (var e = 1; e < arguments.length; e++) {
            var r = null != arguments[e] ? arguments[e] : {};
            e % 2
              ? A(Object(r), !0).forEach(function (e) {
                  var n, i, o;
                  (n = t),
                    (i = e),
                    (o = r[e]),
                    (i = (function (t) {
                      var e = (function (t, e) {
                        if ("object" != j(t) || !t) return t;
                        var r = t[Symbol.toPrimitive];
                        if (void 0 !== r) {
                          var n = r.call(t, e || "default");
                          if ("object" != j(n)) return n;
                          throw TypeError(
                            "@@toPrimitive must return a primitive value.",
                          );
                        }
                        return ("string" === e ? String : Number)(t);
                      })(t, "string");
                      return "symbol" == j(e) ? e : e + "";
                    })(i)) in n
                      ? Object.defineProperty(n, i, {
                          value: o,
                          enumerable: !0,
                          configurable: !0,
                          writable: !0,
                        })
                      : (n[i] = o);
                })
              : Object.getOwnPropertyDescriptors
                ? Object.defineProperties(
                    t,
                    Object.getOwnPropertyDescriptors(r),
                  )
                : A(Object(r)).forEach(function (e) {
                    Object.defineProperty(
                      t,
                      e,
                      Object.getOwnPropertyDescriptor(r, e),
                    );
                  });
          }
          return t;
        }
        function E(t, e) {
          var r = t.x,
            n = t.y,
            i = (function (t, e) {
              if (null == t) return {};
              var r,
                n,
                i = (function (t, e) {
                  if (null == t) return {};
                  var r = {};
                  for (var n in t)
                    if (Object.prototype.hasOwnProperty.call(t, n)) {
                      if (e.indexOf(n) >= 0) continue;
                      r[n] = t[n];
                    }
                  return r;
                })(t, e);
              if (Object.getOwnPropertySymbols) {
                var o = Object.getOwnPropertySymbols(t);
                for (n = 0; n < o.length; n++)
                  (r = o[n]),
                    !(e.indexOf(r) >= 0) &&
                      Object.prototype.propertyIsEnumerable.call(t, r) &&
                      (i[r] = t[r]);
              }
              return i;
            })(t, O),
            o = parseInt("".concat(r), 10),
            a = parseInt("".concat(n), 10),
            c = parseInt("".concat(e.height || i.height), 10),
            u = parseInt("".concat(e.width || i.width), 10);
          return P(
            P(P(P(P({}, e), i), o ? { x: o } : {}), a ? { y: a } : {}),
            {},
            { height: c, width: u, name: e.name, radius: e.radius },
          );
        }
        function k(t) {
          return i().createElement(
            w.yp,
            S(
              {
                shapeType: "rectangle",
                propTransformer: E,
                activeClassName: "recharts-active-bar",
              },
              t,
            ),
          );
        }
        var _ = function (t) {
            var e =
              arguments.length > 1 && void 0 !== arguments[1]
                ? arguments[1]
                : 0;
            return function (r, n) {
              if ("number" == typeof t) return t;
              var i = (0, y.Et)(r) || (0, y.uy)(r);
              return i ? t(r, n) : (i || (0, x.A)(!1), e);
            };
          },
          M = ["value", "background"];
        function T(t) {
          return (T =
            "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
              ? function (t) {
                  return typeof t;
                }
              : function (t) {
                  return t &&
                    "function" == typeof Symbol &&
                    t.constructor === Symbol &&
                    t !== Symbol.prototype
                    ? "symbol"
                    : typeof t;
                })(t);
        }
        function C() {
          return (C = Object.assign
            ? Object.assign.bind()
            : function (t) {
                for (var e = 1; e < arguments.length; e++) {
                  var r = arguments[e];
                  for (var n in r)
                    Object.prototype.hasOwnProperty.call(r, n) && (t[n] = r[n]);
                }
                return t;
              }).apply(this, arguments);
        }
        function N(t, e) {
          var r = Object.keys(t);
          if (Object.getOwnPropertySymbols) {
            var n = Object.getOwnPropertySymbols(t);
            e &&
              (n = n.filter(function (e) {
                return Object.getOwnPropertyDescriptor(t, e).enumerable;
              })),
              r.push.apply(r, n);
          }
          return r;
        }
        function I(t) {
          for (var e = 1; e < arguments.length; e++) {
            var r = null != arguments[e] ? arguments[e] : {};
            e % 2
              ? N(Object(r), !0).forEach(function (e) {
                  z(t, e, r[e]);
                })
              : Object.getOwnPropertyDescriptors
                ? Object.defineProperties(
                    t,
                    Object.getOwnPropertyDescriptors(r),
                  )
                : N(Object(r)).forEach(function (e) {
                    Object.defineProperty(
                      t,
                      e,
                      Object.getOwnPropertyDescriptor(r, e),
                    );
                  });
          }
          return t;
        }
        function D(t, e) {
          for (var r = 0; r < e.length; r++) {
            var n = e[r];
            (n.enumerable = n.enumerable || !1),
              (n.configurable = !0),
              "value" in n && (n.writable = !0),
              Object.defineProperty(t, U(n.key), n);
          }
        }
        function B() {
          try {
            var t = !Boolean.prototype.valueOf.call(
              Reflect.construct(Boolean, [], function () {}),
            );
          } catch (t) {}
          return (B = function () {
            return !!t;
          })();
        }
        function R(t) {
          return (R = Object.setPrototypeOf
            ? Object.getPrototypeOf.bind()
            : function (t) {
                return t.__proto__ || Object.getPrototypeOf(t);
              })(t);
        }
        function L(t, e) {
          return (L = Object.setPrototypeOf
            ? Object.setPrototypeOf.bind()
            : function (t, e) {
                return (t.__proto__ = e), t;
              })(t, e);
        }
        function z(t, e, r) {
          return (
            (e = U(e)) in t
              ? Object.defineProperty(t, e, {
                  value: r,
                  enumerable: !0,
                  configurable: !0,
                  writable: !0,
                })
              : (t[e] = r),
            t
          );
        }
        function U(t) {
          var e = (function (t, e) {
            if ("object" != T(t) || !t) return t;
            var r = t[Symbol.toPrimitive];
            if (void 0 !== r) {
              var n = r.call(t, e || "default");
              if ("object" != T(n)) return n;
              throw TypeError("@@toPrimitive must return a primitive value.");
            }
            return ("string" === e ? String : Number)(t);
          })(t, "string");
          return "symbol" == T(e) ? e : e + "";
        }
        var F = (function (t) {
          var e, r;
          function n() {
            var t, e, r;
            if (!(this instanceof n))
              throw TypeError("Cannot call a class as a function");
            for (var i = arguments.length, o = Array(i), a = 0; a < i; a++)
              o[a] = arguments[a];
            return (
              (e = n),
              (r = [].concat(o)),
              (e = R(e)),
              z(
                (t = (function (t, e) {
                  if (e && ("object" === T(e) || "function" == typeof e))
                    return e;
                  if (void 0 !== e)
                    throw TypeError(
                      "Derived constructors may only return object or undefined",
                    );
                  var r = t;
                  if (void 0 === r)
                    throw ReferenceError(
                      "this hasn't been initialised - super() hasn't been called",
                    );
                  return r;
                })(
                  this,
                  B()
                    ? Reflect.construct(e, r || [], R(this).constructor)
                    : e.apply(this, r),
                )),
                "state",
                { isAnimationFinished: !1 },
              ),
              z(t, "id", (0, y.NF)("recharts-bar-")),
              z(t, "handleAnimationEnd", function () {
                var e = t.props.onAnimationEnd;
                t.setState({ isAnimationFinished: !0 }), e && e();
              }),
              z(t, "handleAnimationStart", function () {
                var e = t.props.onAnimationStart;
                t.setState({ isAnimationFinished: !1 }), e && e();
              }),
              t
            );
          }
          if ("function" != typeof t && null !== t)
            throw TypeError(
              "Super expression must either be null or a function",
            );
          return (
            (n.prototype = Object.create(t && t.prototype, {
              constructor: { value: n, writable: !0, configurable: !0 },
            })),
            Object.defineProperty(n, "prototype", { writable: !1 }),
            t && L(n, t),
            (e = [
              {
                key: "renderRectanglesStatically",
                value: function (t) {
                  var e = this,
                    r = this.props,
                    n = r.shape,
                    o = r.dataKey,
                    a = r.activeIndex,
                    c = r.activeBar,
                    u = (0, v.J9)(this.props, !1);
                  return (
                    t &&
                    t.map(function (t, r) {
                      var s = r === a,
                        l = I(
                          I(I({}, u), t),
                          {},
                          {
                            isActive: s,
                            option: s ? c : n,
                            index: r,
                            dataKey: o,
                            onAnimationStart: e.handleAnimationStart,
                            onAnimationEnd: e.handleAnimationEnd,
                          },
                        );
                      return i().createElement(
                        f.W,
                        C(
                          { className: "recharts-bar-rectangle" },
                          (0, g.XC)(e.props, t, r),
                          {
                            key: "rectangle-"
                              .concat(null == t ? void 0 : t.x, "-")
                              .concat(null == t ? void 0 : t.y, "-")
                              .concat(null == t ? void 0 : t.value, "-")
                              .concat(r),
                          },
                        ),
                        i().createElement(k, l),
                      );
                    })
                  );
                },
              },
              {
                key: "renderRectanglesWithAnimation",
                value: function () {
                  var t = this,
                    e = this.props,
                    r = e.data,
                    n = e.layout,
                    o = e.isAnimationActive,
                    c = e.animationBegin,
                    u = e.animationDuration,
                    s = e.animationEasing,
                    l = e.animationId,
                    p = this.state.prevData;
                  return i().createElement(
                    a.Ay,
                    {
                      begin: c,
                      duration: u,
                      isActive: o,
                      easing: s,
                      from: { t: 0 },
                      to: { t: 1 },
                      key: "bar-".concat(l),
                      onAnimationEnd: this.handleAnimationEnd,
                      onAnimationStart: this.handleAnimationStart,
                    },
                    function (e) {
                      var o = e.t,
                        a = r.map(function (t, e) {
                          var r = p && p[e];
                          if (r) {
                            var i = (0, y.Dj)(r.x, t.x),
                              a = (0, y.Dj)(r.y, t.y),
                              c = (0, y.Dj)(r.width, t.width),
                              u = (0, y.Dj)(r.height, t.height);
                            return I(
                              I({}, t),
                              {},
                              { x: i(o), y: a(o), width: c(o), height: u(o) },
                            );
                          }
                          if ("horizontal" === n) {
                            var s = (0, y.Dj)(0, t.height)(o);
                            return I(
                              I({}, t),
                              {},
                              { y: t.y + t.height - s, height: s },
                            );
                          }
                          var l = (0, y.Dj)(0, t.width)(o);
                          return I(I({}, t), {}, { width: l });
                        });
                      return i().createElement(
                        f.W,
                        null,
                        t.renderRectanglesStatically(a),
                      );
                    },
                  );
                },
              },
              {
                key: "renderRectangles",
                value: function () {
                  var t = this.props,
                    e = t.data,
                    r = t.isAnimationActive,
                    n = this.state.prevData;
                  return r && e && e.length && (!n || !u()(n, e))
                    ? this.renderRectanglesWithAnimation()
                    : this.renderRectanglesStatically(e);
                },
              },
              {
                key: "renderBackground",
                value: function () {
                  var t = this,
                    e = this.props,
                    r = e.data,
                    n = e.dataKey,
                    o = e.activeIndex,
                    a = (0, v.J9)(this.props.background, !1);
                  return r.map(function (e, r) {
                    e.value;
                    var c = e.background,
                      u = (function (t, e) {
                        if (null == t) return {};
                        var r,
                          n,
                          i = (function (t, e) {
                            if (null == t) return {};
                            var r = {};
                            for (var n in t)
                              if (Object.prototype.hasOwnProperty.call(t, n)) {
                                if (e.indexOf(n) >= 0) continue;
                                r[n] = t[n];
                              }
                            return r;
                          })(t, e);
                        if (Object.getOwnPropertySymbols) {
                          var o = Object.getOwnPropertySymbols(t);
                          for (n = 0; n < o.length; n++)
                            (r = o[n]),
                              !(e.indexOf(r) >= 0) &&
                                Object.prototype.propertyIsEnumerable.call(
                                  t,
                                  r,
                                ) &&
                                (i[r] = t[r]);
                        }
                        return i;
                      })(e, M);
                    if (!c) return null;
                    var s = I(
                      I(
                        I(I(I({}, u), {}, { fill: "#eee" }, c), a),
                        (0, g.XC)(t.props, e, r),
                      ),
                      {},
                      {
                        onAnimationStart: t.handleAnimationStart,
                        onAnimationEnd: t.handleAnimationEnd,
                        dataKey: n,
                        index: r,
                        className: "recharts-bar-background-rectangle",
                      },
                    );
                    return i().createElement(
                      k,
                      C(
                        {
                          key: "background-bar-".concat(r),
                          option: t.props.background,
                          isActive: r === o,
                        },
                        s,
                      ),
                    );
                  });
                },
              },
              {
                key: "renderErrorBar",
                value: function (t, e) {
                  if (
                    this.props.isAnimationActive &&
                    !this.state.isAnimationFinished
                  )
                    return null;
                  var r = this.props,
                    n = r.data,
                    o = r.xAxis,
                    a = r.yAxis,
                    c = r.layout,
                    u = r.children,
                    s = (0, v.aS)(u, p.u);
                  if (!s) return null;
                  var l = "vertical" === c ? n[0].height / 2 : n[0].width / 2,
                    h = function (t, e) {
                      var r = Array.isArray(t.value) ? t.value[1] : t.value;
                      return {
                        x: t.x,
                        y: t.y,
                        value: r,
                        errorVal: (0, b.kr)(t, e),
                      };
                    };
                  return i().createElement(
                    f.W,
                    { clipPath: t ? "url(#clipPath-".concat(e, ")") : null },
                    s.map(function (t) {
                      return i().cloneElement(t, {
                        key: "error-bar-"
                          .concat(e, "-")
                          .concat(t.props.dataKey),
                        data: n,
                        xAxis: o,
                        yAxis: a,
                        layout: c,
                        offset: l,
                        dataPointFormatter: h,
                      });
                    }),
                  );
                },
              },
              {
                key: "render",
                value: function () {
                  var t = this.props,
                    e = t.hide,
                    r = t.data,
                    n = t.className,
                    a = t.xAxis,
                    c = t.yAxis,
                    u = t.left,
                    s = t.top,
                    p = t.width,
                    h = t.height,
                    y = t.isAnimationActive,
                    v = t.background,
                    m = t.id;
                  if (e || !r || !r.length) return null;
                  var b = this.state.isAnimationFinished,
                    g = (0, o.A)("recharts-bar", n),
                    x = a && a.allowDataOverflow,
                    w = c && c.allowDataOverflow,
                    O = x || w,
                    j = l()(m) ? this.id : m;
                  return i().createElement(
                    f.W,
                    { className: g },
                    x || w
                      ? i().createElement(
                          "defs",
                          null,
                          i().createElement(
                            "clipPath",
                            { id: "clipPath-".concat(j) },
                            i().createElement("rect", {
                              x: x ? u : u - p / 2,
                              y: w ? s : s - h / 2,
                              width: x ? p : 2 * p,
                              height: w ? h : 2 * h,
                            }),
                          ),
                        )
                      : null,
                    i().createElement(
                      f.W,
                      {
                        className: "recharts-bar-rectangles",
                        clipPath: O ? "url(#clipPath-".concat(j, ")") : null,
                      },
                      v ? this.renderBackground() : null,
                      this.renderRectangles(),
                    ),
                    this.renderErrorBar(O, j),
                    (!y || b) && d.Z.renderCallByParent(this.props, r),
                  );
                },
              },
            ]),
            (r = [
              {
                key: "getDerivedStateFromProps",
                value: function (t, e) {
                  return t.animationId !== e.prevAnimationId
                    ? {
                        prevAnimationId: t.animationId,
                        curData: t.data,
                        prevData: e.curData,
                      }
                    : t.data !== e.curData
                      ? { curData: t.data }
                      : null;
                },
              },
            ]),
            e && D(n.prototype, e),
            r && D(n, r),
            Object.defineProperty(n, "prototype", { writable: !1 }),
            n
          );
        })(n.PureComponent);
        z(F, "displayName", "Bar"),
          z(F, "defaultProps", {
            xAxisId: 0,
            yAxisId: 0,
            legendType: "rect",
            minPointSize: 0,
            hide: !1,
            data: [],
            layout: "vertical",
            activeBar: !1,
            isAnimationActive: !m.m.isSsr,
            animationBegin: 0,
            animationDuration: 400,
            animationEasing: "ease",
          }),
          z(F, "getComposedData", function (t) {
            var e = t.props,
              r = t.item,
              n = t.barPosition,
              i = t.bandSize,
              o = t.xAxis,
              a = t.yAxis,
              c = t.xAxisTicks,
              u = t.yAxisTicks,
              s = t.stackedData,
              l = t.dataStartIndex,
              f = t.displayedData,
              p = t.offset,
              d = (0, b.xi)(n, r);
            if (!d) return null;
            var m = e.layout,
              g = r.type.defaultProps,
              x = void 0 !== g ? I(I({}, g), r.props) : r.props,
              w = x.dataKey,
              O = x.children,
              j = x.minPointSize,
              S = "horizontal" === m ? a : o,
              A = s ? S.scale.domain() : null,
              P = (0, b.DW)({ numericAxis: S }),
              E = (0, v.aS)(O, h.f),
              k = f.map(function (t, e) {
                s
                  ? (f = (0, b._f)(s[l + e], A))
                  : Array.isArray((f = (0, b.kr)(t, w))) || (f = [P, f]);
                var n = _(j, F.defaultProps.minPointSize)(f[1], e);
                if ("horizontal" === m) {
                  var f,
                    p,
                    h,
                    v,
                    g,
                    x,
                    O,
                    S = [a.scale(f[0]), a.scale(f[1])],
                    k = S[0],
                    M = S[1];
                  (p = (0, b.y2)({
                    axis: o,
                    ticks: c,
                    bandSize: i,
                    offset: d.offset,
                    entry: t,
                    index: e,
                  })),
                    (h = null != (O = null != M ? M : k) ? O : void 0),
                    (v = d.size);
                  var T = k - M;
                  if (
                    ((g = Number.isNaN(T) ? 0 : T),
                    (x = { x: p, y: a.y, width: v, height: a.height }),
                    Math.abs(n) > 0 && Math.abs(g) < Math.abs(n))
                  ) {
                    var C = (0, y.sA)(g || n) * (Math.abs(n) - Math.abs(g));
                    (h -= C), (g += C);
                  }
                } else {
                  var N = [o.scale(f[0]), o.scale(f[1])],
                    D = N[0],
                    B = N[1];
                  if (
                    ((p = D),
                    (h = (0, b.y2)({
                      axis: a,
                      ticks: u,
                      bandSize: i,
                      offset: d.offset,
                      entry: t,
                      index: e,
                    })),
                    (v = B - D),
                    (g = d.size),
                    (x = { x: o.x, y: h, width: o.width, height: g }),
                    Math.abs(n) > 0 && Math.abs(v) < Math.abs(n))
                  ) {
                    var R = (0, y.sA)(v || n) * (Math.abs(n) - Math.abs(v));
                    v += R;
                  }
                }
                return I(
                  I(
                    I({}, t),
                    {},
                    {
                      x: p,
                      y: h,
                      width: v,
                      height: g,
                      value: s ? f : f[1],
                      payload: t,
                      background: x,
                    },
                    E && E[e] && E[e].props,
                  ),
                  {},
                  {
                    tooltipPayload: [(0, b.zb)(r, t)],
                    tooltipPosition: { x: p + v / 2, y: h + g / 2 },
                  },
                );
              });
            return I({ data: k, layout: m }, p);
          });
      },
      86913: (t, e, r) => {
        "use strict";
        t.exports = r(54217)(Object.getPrototypeOf, Object);
      },
      87327: (t, e, r) => {
        "use strict";
        var n = r(513),
          i = r(85398),
          o = r(59476),
          a = r(68491),
          c = r(62823),
          u = r(53359);
        function s(t) {
          var e = (this.__data__ = new n(t));
          this.size = e.size;
        }
        (s.prototype.clear = i),
          (s.prototype.delete = o),
          (s.prototype.get = a),
          (s.prototype.has = c),
          (s.prototype.set = u),
          (t.exports = s);
      },
      87403: (t, e, r) => {
        "use strict";
        var n = r(65952);
        t.exports = r(37861)(n);
      },
      87521: (t, e, r) => {
        "use strict";
        var n = r(81379);
        t.exports = function (t, e) {
          var r = this.__data__,
            i = n(r, t);
          return i < 0 ? (++this.size, r.push([t, e])) : (r[i][1] = e), this;
        };
      },
      87766: (t) => {
        "use strict";
        var e = Object.prototype.hasOwnProperty,
          r = "~";
        function n() {}
        function i(t, e, r) {
          (this.fn = t), (this.context = e), (this.once = r || !1);
        }
        function o(t, e, n, o, a) {
          if ("function" != typeof n)
            throw TypeError("The listener must be a function");
          var c = new i(n, o || t, a),
            u = r ? r + e : e;
          return (
            t._events[u]
              ? t._events[u].fn
                ? (t._events[u] = [t._events[u], c])
                : t._events[u].push(c)
              : ((t._events[u] = c), t._eventsCount++),
            t
          );
        }
        function a(t, e) {
          0 == --t._eventsCount ? (t._events = new n()) : delete t._events[e];
        }
        function c() {
          (this._events = new n()), (this._eventsCount = 0);
        }
        Object.create &&
          ((n.prototype = Object.create(null)), new n().__proto__ || (r = !1)),
          (c.prototype.eventNames = function () {
            var t,
              n,
              i = [];
            if (0 === this._eventsCount) return i;
            for (n in (t = this._events))
              e.call(t, n) && i.push(r ? n.slice(1) : n);
            return Object.getOwnPropertySymbols
              ? i.concat(Object.getOwnPropertySymbols(t))
              : i;
          }),
          (c.prototype.listeners = function (t) {
            var e = r ? r + t : t,
              n = this._events[e];
            if (!n) return [];
            if (n.fn) return [n.fn];
            for (var i = 0, o = n.length, a = Array(o); i < o; i++)
              a[i] = n[i].fn;
            return a;
          }),
          (c.prototype.listenerCount = function (t) {
            var e = r ? r + t : t,
              n = this._events[e];
            return n ? (n.fn ? 1 : n.length) : 0;
          }),
          (c.prototype.emit = function (t, e, n, i, o, a) {
            var c = r ? r + t : t;
            if (!this._events[c]) return !1;
            var u,
              s,
              l = this._events[c],
              f = arguments.length;
            if (l.fn) {
              switch ((l.once && this.removeListener(t, l.fn, void 0, !0), f)) {
                case 1:
                  return l.fn.call(l.context), !0;
                case 2:
                  return l.fn.call(l.context, e), !0;
                case 3:
                  return l.fn.call(l.context, e, n), !0;
                case 4:
                  return l.fn.call(l.context, e, n, i), !0;
                case 5:
                  return l.fn.call(l.context, e, n, i, o), !0;
                case 6:
                  return l.fn.call(l.context, e, n, i, o, a), !0;
              }
              for (s = 1, u = Array(f - 1); s < f; s++) u[s - 1] = arguments[s];
              l.fn.apply(l.context, u);
            } else {
              var p,
                h = l.length;
              for (s = 0; s < h; s++)
                switch (
                  (l[s].once && this.removeListener(t, l[s].fn, void 0, !0), f)
                ) {
                  case 1:
                    l[s].fn.call(l[s].context);
                    break;
                  case 2:
                    l[s].fn.call(l[s].context, e);
                    break;
                  case 3:
                    l[s].fn.call(l[s].context, e, n);
                    break;
                  case 4:
                    l[s].fn.call(l[s].context, e, n, i);
                    break;
                  default:
                    if (!u)
                      for (p = 1, u = Array(f - 1); p < f; p++)
                        u[p - 1] = arguments[p];
                    l[s].fn.apply(l[s].context, u);
                }
            }
            return !0;
          }),
          (c.prototype.on = function (t, e, r) {
            return o(this, t, e, r, !1);
          }),
          (c.prototype.once = function (t, e, r) {
            return o(this, t, e, r, !0);
          }),
          (c.prototype.removeListener = function (t, e, n, i) {
            var o = r ? r + t : t;
            if (!this._events[o]) return this;
            if (!e) return a(this, o), this;
            var c = this._events[o];
            if (c.fn)
              c.fn !== e ||
                (i && !c.once) ||
                (n && c.context !== n) ||
                a(this, o);
            else {
              for (var u = 0, s = [], l = c.length; u < l; u++)
                (c[u].fn !== e ||
                  (i && !c[u].once) ||
                  (n && c[u].context !== n)) &&
                  s.push(c[u]);
              s.length
                ? (this._events[o] = 1 === s.length ? s[0] : s)
                : a(this, o);
            }
            return this;
          }),
          (c.prototype.removeAllListeners = function (t) {
            var e;
            return (
              t
                ? ((e = r ? r + t : t), this._events[e] && a(this, e))
                : ((this._events = new n()), (this._eventsCount = 0)),
              this
            );
          }),
          (c.prototype.off = c.prototype.removeListener),
          (c.prototype.addListener = c.prototype.on),
          (c.prefixed = r),
          (c.EventEmitter = c),
          (t.exports = c);
      },
      87790: (t, e, r) => {
        "use strict";
        var n = r(81379),
          i = Array.prototype.splice;
        t.exports = function (t) {
          var e = this.__data__,
            r = n(e, t);
          return (
            !(r < 0) &&
            (r == e.length - 1 ? e.pop() : i.call(e, r, 1), --this.size, !0)
          );
        };
      },
      88225: (t, e, r) => {
        "use strict";
        r.d(e, {
          P2: () => w,
          bx: () => O,
          pr: () => m,
          sl: () => b,
          vh: () => g,
        });
        var n = r(91430),
          i = r.n(n),
          o = r(81105),
          a = r.n(o),
          c = r(75243),
          u = r(18862),
          s = r(61481),
          l = r(86594);
        function f(t) {
          return (f =
            "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
              ? function (t) {
                  return typeof t;
                }
              : function (t) {
                  return t &&
                    "function" == typeof Symbol &&
                    t.constructor === Symbol &&
                    t !== Symbol.prototype
                    ? "symbol"
                    : typeof t;
                })(t);
        }
        function p(t, e) {
          for (var r = 0; r < e.length; r++) {
            var n = e[r];
            (n.enumerable = n.enumerable || !1),
              (n.configurable = !0),
              "value" in n && (n.writable = !0),
              Object.defineProperty(t, v(n.key), n);
          }
        }
        function h(t, e) {
          var r = Object.keys(t);
          if (Object.getOwnPropertySymbols) {
            var n = Object.getOwnPropertySymbols(t);
            e &&
              (n = n.filter(function (e) {
                return Object.getOwnPropertyDescriptor(t, e).enumerable;
              })),
              r.push.apply(r, n);
          }
          return r;
        }
        function d(t) {
          for (var e = 1; e < arguments.length; e++) {
            var r = null != arguments[e] ? arguments[e] : {};
            e % 2
              ? h(Object(r), !0).forEach(function (e) {
                  y(t, e, r[e]);
                })
              : Object.getOwnPropertyDescriptors
                ? Object.defineProperties(
                    t,
                    Object.getOwnPropertyDescriptors(r),
                  )
                : h(Object(r)).forEach(function (e) {
                    Object.defineProperty(
                      t,
                      e,
                      Object.getOwnPropertyDescriptor(r, e),
                    );
                  });
          }
          return t;
        }
        function y(t, e, r) {
          return (
            (e = v(e)) in t
              ? Object.defineProperty(t, e, {
                  value: r,
                  enumerable: !0,
                  configurable: !0,
                  writable: !0,
                })
              : (t[e] = r),
            t
          );
        }
        function v(t) {
          var e = (function (t, e) {
            if ("object" != f(t) || !t) return t;
            var r = t[Symbol.toPrimitive];
            if (void 0 !== r) {
              var n = r.call(t, e || "default");
              if ("object" != f(n)) return n;
              throw TypeError("@@toPrimitive must return a primitive value.");
            }
            return ("string" === e ? String : Number)(t);
          })(t, "string");
          return "symbol" == f(e) ? e : e + "";
        }
        var m = function (t, e, r, n, i) {
            var o = t.width,
              a = t.height,
              f = t.layout,
              p = t.children,
              h = Object.keys(e),
              v = {
                left: r.left,
                leftMirror: r.left,
                right: o - r.right,
                rightMirror: o - r.right,
                top: r.top,
                topMirror: r.top,
                bottom: a - r.bottom,
                bottomMirror: a - r.bottom,
              },
              m = !!(0, u.BU)(p, l.y);
            return h.reduce(function (o, a) {
              var u,
                l,
                p,
                h,
                b,
                g = e[a],
                x = g.orientation,
                w = g.domain,
                O = g.padding,
                j = void 0 === O ? {} : O,
                S = g.mirror,
                A = g.reversed,
                P = "".concat(x).concat(S ? "Mirror" : "");
              if (
                "number" === g.type &&
                ("gap" === g.padding || "no-gap" === g.padding)
              ) {
                var E = w[1] - w[0],
                  k = 1 / 0,
                  _ = g.categoricalDomain.sort(s.ck);
                if (
                  (_.forEach(function (t, e) {
                    e > 0 && (k = Math.min((t || 0) - (_[e - 1] || 0), k));
                  }),
                  Number.isFinite(k))
                ) {
                  var M = k / E,
                    T = "vertical" === g.layout ? r.height : r.width;
                  if (
                    ("gap" === g.padding && (u = (M * T) / 2),
                    "no-gap" === g.padding)
                  ) {
                    var C = (0, s.F4)(t.barCategoryGap, M * T),
                      N = (M * T) / 2;
                    u = N - C - ((N - C) / T) * C;
                  }
                }
              }
              (l =
                "xAxis" === n
                  ? [
                      r.left + (j.left || 0) + (u || 0),
                      r.left + r.width - (j.right || 0) - (u || 0),
                    ]
                  : "yAxis" === n
                    ? "horizontal" === f
                      ? [
                          r.top + r.height - (j.bottom || 0),
                          r.top + (j.top || 0),
                        ]
                      : [
                          r.top + (j.top || 0) + (u || 0),
                          r.top + r.height - (j.bottom || 0) - (u || 0),
                        ]
                    : g.range),
                A && (l = [l[1], l[0]]);
              var I = (0, c.W7)(g, i, m),
                D = I.scale,
                B = I.realScaleType;
              D.domain(w).range(l), (0, c.YB)(D);
              var R = (0, c.w7)(D, d(d({}, g), {}, { realScaleType: B }));
              "xAxis" === n
                ? ((b = ("top" === x && !S) || ("bottom" === x && S)),
                  (p = r.left),
                  (h = v[P] - b * g.height))
                : "yAxis" === n &&
                  ((b = ("left" === x && !S) || ("right" === x && S)),
                  (p = v[P] - b * g.width),
                  (h = r.top));
              var L = d(
                d(d({}, g), R),
                {},
                {
                  realScaleType: B,
                  x: p,
                  y: h,
                  scale: D,
                  width: "xAxis" === n ? r.width : g.width,
                  height: "yAxis" === n ? r.height : g.height,
                },
              );
              return (
                (L.bandSize = (0, c.Hj)(L, R)),
                g.hide || "xAxis" !== n
                  ? g.hide || (v[P] += (b ? -1 : 1) * L.width)
                  : (v[P] += (b ? -1 : 1) * L.height),
                d(d({}, o), {}, y({}, a, L))
              );
            }, {});
          },
          b = function (t, e) {
            var r = t.x,
              n = t.y,
              i = e.x,
              o = e.y;
            return {
              x: Math.min(r, i),
              y: Math.min(n, o),
              width: Math.abs(i - r),
              height: Math.abs(o - n),
            };
          },
          g = function (t) {
            return b({ x: t.x1, y: t.y1 }, { x: t.x2, y: t.y2 });
          },
          x = (function () {
            var t, e;
            function r(t) {
              if (!(this instanceof r))
                throw TypeError("Cannot call a class as a function");
              this.scale = t;
            }
            return (
              (t = [
                {
                  key: "domain",
                  get: function () {
                    return this.scale.domain;
                  },
                },
                {
                  key: "range",
                  get: function () {
                    return this.scale.range;
                  },
                },
                {
                  key: "rangeMin",
                  get: function () {
                    return this.range()[0];
                  },
                },
                {
                  key: "rangeMax",
                  get: function () {
                    return this.range()[1];
                  },
                },
                {
                  key: "bandwidth",
                  get: function () {
                    return this.scale.bandwidth;
                  },
                },
                {
                  key: "apply",
                  value: function (t) {
                    var e =
                        arguments.length > 1 && void 0 !== arguments[1]
                          ? arguments[1]
                          : {},
                      r = e.bandAware,
                      n = e.position;
                    if (void 0 !== t) {
                      if (n)
                        switch (n) {
                          case "start":
                          default:
                            return this.scale(t);
                          case "middle":
                            var i = this.bandwidth ? this.bandwidth() / 2 : 0;
                            return this.scale(t) + i;
                          case "end":
                            var o = this.bandwidth ? this.bandwidth() : 0;
                            return this.scale(t) + o;
                        }
                      if (r) {
                        var a = this.bandwidth ? this.bandwidth() / 2 : 0;
                        return this.scale(t) + a;
                      }
                      return this.scale(t);
                    }
                  },
                },
                {
                  key: "isInRange",
                  value: function (t) {
                    var e = this.range(),
                      r = e[0],
                      n = e[e.length - 1];
                    return r <= n ? t >= r && t <= n : t >= n && t <= r;
                  },
                },
              ]),
              (e = [
                {
                  key: "create",
                  value: function (t) {
                    return new r(t);
                  },
                },
              ]),
              t && p(r.prototype, t),
              e && p(r, e),
              Object.defineProperty(r, "prototype", { writable: !1 }),
              r
            );
          })();
        y(x, "EPS", 1e-4);
        var w = function (t) {
            var e = Object.keys(t).reduce(function (e, r) {
              return d(d({}, e), {}, y({}, r, x.create(t[r])));
            }, {});
            return d(
              d({}, e),
              {},
              {
                apply: function (t) {
                  var r =
                      arguments.length > 1 && void 0 !== arguments[1]
                        ? arguments[1]
                        : {},
                    n = r.bandAware,
                    o = r.position;
                  return i()(t, function (t, r) {
                    return e[r].apply(t, { bandAware: n, position: o });
                  });
                },
                isInRange: function (t) {
                  return a()(t, function (t, r) {
                    return e[r].isInRange(t);
                  });
                },
              },
            );
          },
          O = function (t) {
            var e = t.width,
              r = t.height,
              n =
                arguments.length > 1 && void 0 !== arguments[1]
                  ? arguments[1]
                  : 0,
              i = ((((n % 180) + 180) % 180) * Math.PI) / 180,
              o = Math.atan(r / e);
            return Math.abs(
              i > o && i < Math.PI - o ? r / Math.sin(i) : e / Math.cos(i),
            );
          };
      },
      89674: (t, e, r) => {
        "use strict";
        t.exports = r(43960)(r(40671), "DataView");
      },
      89777: (t, e, r) => {
        "use strict";
        var n = r(14170),
          i = r(19064),
          o = r(63428),
          a = r(93874),
          c = r(46951),
          u = r(77175),
          s = r(34764),
          l = r(11730),
          f = r(83855);
        t.exports = function (t, e, r) {
          e = e.length
            ? n(e, function (t) {
                return f(t)
                  ? function (e) {
                      return i(e, 1 === t.length ? t[0] : t);
                    }
                  : t;
              })
            : [l];
          var p = -1;
          return (
            (e = n(e, u(o))),
            c(
              a(t, function (t, r, i) {
                return {
                  criteria: n(e, function (e) {
                    return e(t);
                  }),
                  index: ++p,
                  value: t,
                };
              }),
              function (t, e) {
                return s(t, e, r);
              },
            )
          );
        };
      },
      90236: (t) => {
        "use strict";
        t.exports = function (t) {
          return (
            "number" == typeof t &&
            t > -1 &&
            t % 1 == 0 &&
            t <= 0x1fffffffffffff
          );
        };
      },
      90624: (t, e, r) => {
        "use strict";
        var n = r(14170),
          i = r(63428),
          o = r(93874),
          a = r(83855);
        t.exports = function (t, e) {
          return (a(t) ? n : o)(t, i(e, 3));
        };
      },
      90927: (t, e, r) => {
        "use strict";
        var n = r(37609),
          i = r(34219),
          o = r(11411),
          a = r(49905),
          c = r(67203),
          u = r(86017);
        t.exports = function (t, e, r) {
          var s = -1,
            l = i,
            f = t.length,
            p = !0,
            h = [],
            d = h;
          if (r) (p = !1), (l = o);
          else if (f >= 200) {
            var y = e ? null : c(t);
            if (y) return u(y);
            (p = !1), (l = a), (d = new n());
          } else d = e ? [] : h;
          e: for (; ++s < f; ) {
            var v = t[s],
              m = e ? e(v) : v;
            if (((v = r || 0 !== v ? v : 0), p && m == m)) {
              for (var b = d.length; b--; ) if (d[b] === m) continue e;
              e && d.push(m), h.push(v);
            } else l(d, m, r) || (d !== h && d.push(m), h.push(v));
          }
          return h;
        };
      },
      91430: (t, e, r) => {
        "use strict";
        var n = r(19542),
          i = r(74631),
          o = r(63428);
        t.exports = function (t, e) {
          var r = {};
          return (
            (e = o(e, 3)),
            i(t, function (t, i, o) {
              n(r, i, e(t, i, o));
            }),
            r
          );
        };
      },
      91645: (t) => {
        "use strict";
        t.exports = require("net");
      },
      91656: (t, e, r) => {
        "use strict";
        var n = r(63428),
          i = r(77404),
          o = r(57680);
        t.exports = function (t) {
          return function (e, r, a) {
            var c = Object(e);
            if (!i(e)) {
              var u = n(r, 3);
              (e = o(e)),
                (r = function (t) {
                  return u(c[t], t, c);
                });
            }
            var s = t(e, r, a);
            return s > -1 ? c[u ? e[s] : s] : void 0;
          };
        };
      },
      92685: (t) => {
        "use strict";
        t.exports = function (t, e, r, n) {
          for (var i = t.length, o = r + (n ? 1 : -1); n ? o-- : ++o < i; )
            if (e(t[o], o, t)) return o;
          return -1;
        };
      },
      93224: (t, e, r) => {
        "use strict";
        r.d(e, { s: () => I });
        var n = r(84205),
          i = r.n(n),
          o = r(4276),
          a = r.n(o),
          c = r(79029),
          u = r(13493),
          s = r(19692),
          l = r(34831),
          f = r(10621);
        function p(t) {
          return (p =
            "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
              ? function (t) {
                  return typeof t;
                }
              : function (t) {
                  return t &&
                    "function" == typeof Symbol &&
                    t.constructor === Symbol &&
                    t !== Symbol.prototype
                    ? "symbol"
                    : typeof t;
                })(t);
        }
        function h() {
          return (h = Object.assign
            ? Object.assign.bind()
            : function (t) {
                for (var e = 1; e < arguments.length; e++) {
                  var r = arguments[e];
                  for (var n in r)
                    Object.prototype.hasOwnProperty.call(r, n) && (t[n] = r[n]);
                }
                return t;
              }).apply(this, arguments);
        }
        function d(t, e) {
          var r = Object.keys(t);
          if (Object.getOwnPropertySymbols) {
            var n = Object.getOwnPropertySymbols(t);
            e &&
              (n = n.filter(function (e) {
                return Object.getOwnPropertyDescriptor(t, e).enumerable;
              })),
              r.push.apply(r, n);
          }
          return r;
        }
        function y() {
          try {
            var t = !Boolean.prototype.valueOf.call(
              Reflect.construct(Boolean, [], function () {}),
            );
          } catch (t) {}
          return (y = function () {
            return !!t;
          })();
        }
        function v(t) {
          return (v = Object.setPrototypeOf
            ? Object.getPrototypeOf.bind()
            : function (t) {
                return t.__proto__ || Object.getPrototypeOf(t);
              })(t);
        }
        function m(t, e) {
          return (m = Object.setPrototypeOf
            ? Object.setPrototypeOf.bind()
            : function (t, e) {
                return (t.__proto__ = e), t;
              })(t, e);
        }
        function b(t, e, r) {
          return (
            (e = g(e)) in t
              ? Object.defineProperty(t, e, {
                  value: r,
                  enumerable: !0,
                  configurable: !0,
                  writable: !0,
                })
              : (t[e] = r),
            t
          );
        }
        function g(t) {
          var e = (function (t, e) {
            if ("object" != p(t) || !t) return t;
            var r = t[Symbol.toPrimitive];
            if (void 0 !== r) {
              var n = r.call(t, e || "default");
              if ("object" != p(n)) return n;
              throw TypeError("@@toPrimitive must return a primitive value.");
            }
            return ("string" === e ? String : Number)(t);
          })(t, "string");
          return "symbol" == p(e) ? e : e + "";
        }
        var x = (function (t) {
          var e;
          function r() {
            var t, e;
            if (!(this instanceof r))
              throw TypeError("Cannot call a class as a function");
            return (
              (t = r),
              (e = arguments),
              (t = v(t)),
              (function (t, e) {
                if (e && ("object" === p(e) || "function" == typeof e))
                  return e;
                if (void 0 !== e)
                  throw TypeError(
                    "Derived constructors may only return object or undefined",
                  );
                var r = t;
                if (void 0 === r)
                  throw ReferenceError(
                    "this hasn't been initialised - super() hasn't been called",
                  );
                return r;
              })(
                this,
                y()
                  ? Reflect.construct(t, e || [], v(this).constructor)
                  : t.apply(this, e),
              )
            );
          }
          if ("function" != typeof t && null !== t)
            throw TypeError(
              "Super expression must either be null or a function",
            );
          return (
            (r.prototype = Object.create(t && t.prototype, {
              constructor: { value: r, writable: !0, configurable: !0 },
            })),
            Object.defineProperty(r, "prototype", { writable: !1 }),
            t && m(r, t),
            (e = [
              {
                key: "renderIcon",
                value: function (t) {
                  var e = this.props.inactiveColor,
                    r = 32 / 6,
                    n = 32 / 3,
                    o = t.inactive ? e : t.color;
                  if ("plainline" === t.type)
                    return i().createElement("line", {
                      strokeWidth: 4,
                      fill: "none",
                      stroke: o,
                      strokeDasharray: t.payload.strokeDasharray,
                      x1: 0,
                      y1: 16,
                      x2: 32,
                      y2: 16,
                      className: "recharts-legend-icon",
                    });
                  if ("line" === t.type)
                    return i().createElement("path", {
                      strokeWidth: 4,
                      fill: "none",
                      stroke: o,
                      d: "M0,"
                        .concat(16, "h")
                        .concat(n, "\n            A")
                        .concat(r, ",")
                        .concat(r, ",0,1,1,")
                        .concat(2 * n, ",")
                        .concat(16, "\n            H")
                        .concat(32, "M")
                        .concat(2 * n, ",")
                        .concat(16, "\n            A")
                        .concat(r, ",")
                        .concat(r, ",0,1,1,")
                        .concat(n, ",")
                        .concat(16),
                      className: "recharts-legend-icon",
                    });
                  if ("rect" === t.type)
                    return i().createElement("path", {
                      stroke: "none",
                      fill: o,
                      d: "M0,"
                        .concat(4, "h")
                        .concat(32, "v")
                        .concat(24, "h")
                        .concat(-32, "z"),
                      className: "recharts-legend-icon",
                    });
                  if (i().isValidElement(t.legendIcon)) {
                    var a = (function (t) {
                      for (var e = 1; e < arguments.length; e++) {
                        var r = null != arguments[e] ? arguments[e] : {};
                        e % 2
                          ? d(Object(r), !0).forEach(function (e) {
                              b(t, e, r[e]);
                            })
                          : Object.getOwnPropertyDescriptors
                            ? Object.defineProperties(
                                t,
                                Object.getOwnPropertyDescriptors(r),
                              )
                            : d(Object(r)).forEach(function (e) {
                                Object.defineProperty(
                                  t,
                                  e,
                                  Object.getOwnPropertyDescriptor(r, e),
                                );
                              });
                      }
                      return t;
                    })({}, t);
                    return (
                      delete a.legendIcon, i().cloneElement(t.legendIcon, a)
                    );
                  }
                  return i().createElement(l.i, {
                    fill: o,
                    cx: 16,
                    cy: 16,
                    size: 32,
                    sizeType: "diameter",
                    type: t.type,
                  });
                },
              },
              {
                key: "renderItems",
                value: function () {
                  var t = this,
                    e = this.props,
                    r = e.payload,
                    n = e.iconSize,
                    o = e.layout,
                    l = e.formatter,
                    p = e.inactiveColor,
                    d = { x: 0, y: 0, width: 32, height: 32 },
                    y = {
                      display: "horizontal" === o ? "inline-block" : "block",
                      marginRight: 10,
                    },
                    v = {
                      display: "inline-block",
                      verticalAlign: "middle",
                      marginRight: 4,
                    };
                  return r.map(function (e, r) {
                    var o = e.formatter || l,
                      m = (0, c.A)(
                        b(
                          b(
                            { "recharts-legend-item": !0 },
                            "legend-item-".concat(r),
                            !0,
                          ),
                          "inactive",
                          e.inactive,
                        ),
                      );
                    if ("none" === e.type) return null;
                    var g = a()(e.value) ? null : e.value;
                    (0, u.R)(
                      !a()(e.value),
                      'The name property is also required when using a function for the dataKey of a chart\'s cartesian components. Ex: <Bar name="Name of my Data"/>',
                    );
                    var x = e.inactive ? p : e.color;
                    return i().createElement(
                      "li",
                      h(
                        {
                          className: m,
                          style: y,
                          key: "legend-item-".concat(r),
                        },
                        (0, f.XC)(t.props, e, r),
                      ),
                      i().createElement(
                        s.u,
                        { width: n, height: n, viewBox: d, style: v },
                        t.renderIcon(e),
                      ),
                      i().createElement(
                        "span",
                        {
                          className: "recharts-legend-item-text",
                          style: { color: x },
                        },
                        o ? o(g, e, r) : g,
                      ),
                    );
                  });
                },
              },
              {
                key: "render",
                value: function () {
                  var t = this.props,
                    e = t.payload,
                    r = t.layout,
                    n = t.align;
                  return e && e.length
                    ? i().createElement(
                        "ul",
                        {
                          className: "recharts-default-legend",
                          style: {
                            padding: 0,
                            margin: 0,
                            textAlign: "horizontal" === r ? n : "left",
                          },
                        },
                        this.renderItems(),
                      )
                    : null;
                },
              },
            ]),
            (function (t, e) {
              for (var r = 0; r < e.length; r++) {
                var n = e[r];
                (n.enumerable = n.enumerable || !1),
                  (n.configurable = !0),
                  "value" in n && (n.writable = !0),
                  Object.defineProperty(t, g(n.key), n);
              }
            })(r.prototype, e),
            Object.defineProperty(r, "prototype", { writable: !1 }),
            r
          );
        })(n.PureComponent);
        b(x, "displayName", "Legend"),
          b(x, "defaultProps", {
            iconSize: 14,
            layout: "horizontal",
            align: "center",
            verticalAlign: "middle",
            inactiveColor: "#ccc",
          });
        var w = r(61481),
          O = r(52272);
        function j(t) {
          return (j =
            "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
              ? function (t) {
                  return typeof t;
                }
              : function (t) {
                  return t &&
                    "function" == typeof Symbol &&
                    t.constructor === Symbol &&
                    t !== Symbol.prototype
                    ? "symbol"
                    : typeof t;
                })(t);
        }
        var S = ["ref"];
        function A(t, e) {
          var r = Object.keys(t);
          if (Object.getOwnPropertySymbols) {
            var n = Object.getOwnPropertySymbols(t);
            e &&
              (n = n.filter(function (e) {
                return Object.getOwnPropertyDescriptor(t, e).enumerable;
              })),
              r.push.apply(r, n);
          }
          return r;
        }
        function P(t) {
          for (var e = 1; e < arguments.length; e++) {
            var r = null != arguments[e] ? arguments[e] : {};
            e % 2
              ? A(Object(r), !0).forEach(function (e) {
                  T(t, e, r[e]);
                })
              : Object.getOwnPropertyDescriptors
                ? Object.defineProperties(
                    t,
                    Object.getOwnPropertyDescriptors(r),
                  )
                : A(Object(r)).forEach(function (e) {
                    Object.defineProperty(
                      t,
                      e,
                      Object.getOwnPropertyDescriptor(r, e),
                    );
                  });
          }
          return t;
        }
        function E(t, e) {
          for (var r = 0; r < e.length; r++) {
            var n = e[r];
            (n.enumerable = n.enumerable || !1),
              (n.configurable = !0),
              "value" in n && (n.writable = !0),
              Object.defineProperty(t, C(n.key), n);
          }
        }
        function k() {
          try {
            var t = !Boolean.prototype.valueOf.call(
              Reflect.construct(Boolean, [], function () {}),
            );
          } catch (t) {}
          return (k = function () {
            return !!t;
          })();
        }
        function _(t) {
          return (_ = Object.setPrototypeOf
            ? Object.getPrototypeOf.bind()
            : function (t) {
                return t.__proto__ || Object.getPrototypeOf(t);
              })(t);
        }
        function M(t, e) {
          return (M = Object.setPrototypeOf
            ? Object.setPrototypeOf.bind()
            : function (t, e) {
                return (t.__proto__ = e), t;
              })(t, e);
        }
        function T(t, e, r) {
          return (
            (e = C(e)) in t
              ? Object.defineProperty(t, e, {
                  value: r,
                  enumerable: !0,
                  configurable: !0,
                  writable: !0,
                })
              : (t[e] = r),
            t
          );
        }
        function C(t) {
          var e = (function (t, e) {
            if ("object" != j(t) || !t) return t;
            var r = t[Symbol.toPrimitive];
            if (void 0 !== r) {
              var n = r.call(t, e || "default");
              if ("object" != j(n)) return n;
              throw TypeError("@@toPrimitive must return a primitive value.");
            }
            return ("string" === e ? String : Number)(t);
          })(t, "string");
          return "symbol" == j(e) ? e : e + "";
        }
        function N(t) {
          return t.value;
        }
        var I = (function (t) {
          var e, r;
          function n() {
            var t, e, r;
            if (!(this instanceof n))
              throw TypeError("Cannot call a class as a function");
            for (var i = arguments.length, o = Array(i), a = 0; a < i; a++)
              o[a] = arguments[a];
            return (
              (e = n),
              (r = [].concat(o)),
              (e = _(e)),
              T(
                (t = (function (t, e) {
                  if (e && ("object" === j(e) || "function" == typeof e))
                    return e;
                  if (void 0 !== e)
                    throw TypeError(
                      "Derived constructors may only return object or undefined",
                    );
                  var r = t;
                  if (void 0 === r)
                    throw ReferenceError(
                      "this hasn't been initialised - super() hasn't been called",
                    );
                  return r;
                })(
                  this,
                  k()
                    ? Reflect.construct(e, r || [], _(this).constructor)
                    : e.apply(this, r),
                )),
                "lastBoundingBox",
                { width: -1, height: -1 },
              ),
              t
            );
          }
          if ("function" != typeof t && null !== t)
            throw TypeError(
              "Super expression must either be null or a function",
            );
          return (
            (n.prototype = Object.create(t && t.prototype, {
              constructor: { value: n, writable: !0, configurable: !0 },
            })),
            Object.defineProperty(n, "prototype", { writable: !1 }),
            t && M(n, t),
            (e = [
              {
                key: "componentDidMount",
                value: function () {
                  this.updateBBox();
                },
              },
              {
                key: "componentDidUpdate",
                value: function () {
                  this.updateBBox();
                },
              },
              {
                key: "getBBox",
                value: function () {
                  if (
                    this.wrapperNode &&
                    this.wrapperNode.getBoundingClientRect
                  ) {
                    var t = this.wrapperNode.getBoundingClientRect();
                    return (
                      (t.height = this.wrapperNode.offsetHeight),
                      (t.width = this.wrapperNode.offsetWidth),
                      t
                    );
                  }
                  return null;
                },
              },
              {
                key: "updateBBox",
                value: function () {
                  var t = this.props.onBBoxUpdate,
                    e = this.getBBox();
                  e
                    ? (Math.abs(e.width - this.lastBoundingBox.width) > 1 ||
                        Math.abs(e.height - this.lastBoundingBox.height) > 1) &&
                      ((this.lastBoundingBox.width = e.width),
                      (this.lastBoundingBox.height = e.height),
                      t && t(e))
                    : (-1 !== this.lastBoundingBox.width ||
                        -1 !== this.lastBoundingBox.height) &&
                      ((this.lastBoundingBox.width = -1),
                      (this.lastBoundingBox.height = -1),
                      t && t(null));
                },
              },
              {
                key: "getBBoxSnapshot",
                value: function () {
                  return this.lastBoundingBox.width >= 0 &&
                    this.lastBoundingBox.height >= 0
                    ? P({}, this.lastBoundingBox)
                    : { width: 0, height: 0 };
                },
              },
              {
                key: "getDefaultPosition",
                value: function (t) {
                  var e,
                    r,
                    n = this.props,
                    i = n.layout,
                    o = n.align,
                    a = n.verticalAlign,
                    c = n.margin,
                    u = n.chartWidth,
                    s = n.chartHeight;
                  return (
                    (t &&
                      ((void 0 !== t.left && null !== t.left) ||
                        (void 0 !== t.right && null !== t.right))) ||
                      (e =
                        "center" === o && "vertical" === i
                          ? {
                              left:
                                ((u || 0) - this.getBBoxSnapshot().width) / 2,
                            }
                          : "right" === o
                            ? { right: (c && c.right) || 0 }
                            : { left: (c && c.left) || 0 }),
                    (t &&
                      ((void 0 !== t.top && null !== t.top) ||
                        (void 0 !== t.bottom && null !== t.bottom))) ||
                      (r =
                        "middle" === a
                          ? {
                              top:
                                ((s || 0) - this.getBBoxSnapshot().height) / 2,
                            }
                          : "bottom" === a
                            ? { bottom: (c && c.bottom) || 0 }
                            : { top: (c && c.top) || 0 }),
                    P(P({}, e), r)
                  );
                },
              },
              {
                key: "render",
                value: function () {
                  var t = this,
                    e = this.props,
                    r = e.content,
                    n = e.width,
                    o = e.height,
                    a = e.wrapperStyle,
                    c = e.payloadUniqBy,
                    u = e.payload,
                    s = P(
                      P(
                        {
                          position: "absolute",
                          width: n || "auto",
                          height: o || "auto",
                        },
                        this.getDefaultPosition(a),
                      ),
                      a,
                    );
                  return i().createElement(
                    "div",
                    {
                      className: "recharts-legend-wrapper",
                      style: s,
                      ref: function (e) {
                        t.wrapperNode = e;
                      },
                    },
                    (function (t, e) {
                      if (i().isValidElement(t)) return i().cloneElement(t, e);
                      if ("function" == typeof t)
                        return i().createElement(t, e);
                      e.ref;
                      var r = (function (t, e) {
                        if (null == t) return {};
                        var r,
                          n,
                          i = (function (t, e) {
                            if (null == t) return {};
                            var r = {};
                            for (var n in t)
                              if (Object.prototype.hasOwnProperty.call(t, n)) {
                                if (e.indexOf(n) >= 0) continue;
                                r[n] = t[n];
                              }
                            return r;
                          })(t, e);
                        if (Object.getOwnPropertySymbols) {
                          var o = Object.getOwnPropertySymbols(t);
                          for (n = 0; n < o.length; n++)
                            (r = o[n]),
                              !(e.indexOf(r) >= 0) &&
                                Object.prototype.propertyIsEnumerable.call(
                                  t,
                                  r,
                                ) &&
                                (i[r] = t[r]);
                        }
                        return i;
                      })(e, S);
                      return i().createElement(x, r);
                    })(
                      r,
                      P(P({}, this.props), {}, { payload: (0, O.s)(u, c, N) }),
                    ),
                  );
                },
              },
            ]),
            (r = [
              {
                key: "getWithHeight",
                value: function (t, e) {
                  var r = P(P({}, this.defaultProps), t.props).layout;
                  return "vertical" === r && (0, w.Et)(t.props.height)
                    ? { height: t.props.height }
                    : "horizontal" === r
                      ? { width: t.props.width || e }
                      : null;
                },
              },
            ]),
            e && E(n.prototype, e),
            r && E(n, r),
            Object.defineProperty(n, "prototype", { writable: !1 }),
            n
          );
        })(n.PureComponent);
        T(I, "displayName", "Legend"),
          T(I, "defaultProps", {
            iconSize: 14,
            layout: "horizontal",
            align: "center",
            verticalAlign: "bottom",
          });
      },
      93874: (t, e, r) => {
        "use strict";
        var n = r(6431),
          i = r(77404);
        t.exports = function (t, e) {
          var r = -1,
            o = i(t) ? Array(t.length) : [];
          return (
            n(t, function (t, n, i) {
              o[++r] = e(t, n, i);
            }),
            o
          );
        };
      },
      94735: (t) => {
        "use strict";
        t.exports = require("events");
      },
      95311: (t) => {
        "use strict";
        t.exports = function (t) {
          var e = typeof t;
          return null != t && ("object" == e || "function" == e);
        };
      },
      95957: (t, e, r) => {
        "use strict";
        r.a(t, async (t, n) => {
          try {
            r.d(e, {
              bq: () => h,
              eb: () => y,
              gC: () => d,
              l6: () => f,
              yv: () => p,
            });
            var i = r(61268),
              o = r(81242),
              a = r(70753),
              c = r(415),
              u = r(84205),
              s = r(15942),
              l = t([s]);
            s = (l.then ? (await l)() : l)[0];
            let f = o.bL;
            o.YJ;
            let p = o.WT,
              h = u.forwardRef(({ className: t, children: e, ...r }, n) =>
                (0, i.jsxs)(o.l9, {
                  ref: n,
                  className: (0, s.cn)(
                    "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                    t,
                  ),
                  ...r,
                  children: [
                    e,
                    (0, i.jsx)(o.In, {
                      asChild: !0,
                      children: (0, i.jsx)(a.A, {
                        className: "h-4 w-4 opacity-50",
                      }),
                    }),
                  ],
                }),
              );
            h.displayName = o.l9.displayName;
            let d = u.forwardRef(
              (
                { className: t, children: e, position: r = "popper", ...n },
                a,
              ) =>
                (0, i.jsx)(o.ZL, {
                  children: (0, i.jsx)(o.UC, {
                    ref: a,
                    className: (0, s.cn)(
                      "relative z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
                      "popper" === r &&
                        "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
                      t,
                    ),
                    position: r,
                    ...n,
                    children: (0, i.jsx)(o.LM, {
                      className: (0, s.cn)(
                        "p-1",
                        "popper" === r &&
                          "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]",
                      ),
                      children: e,
                    }),
                  }),
                }),
            );
            (d.displayName = o.UC.displayName),
              (u.forwardRef(({ className: t, ...e }, r) =>
                (0, i.jsx)(o.JU, {
                  ref: r,
                  className: (0, s.cn)(
                    "py-1.5 pl-8 pr-2 text-sm font-semibold",
                    t,
                  ),
                  ...e,
                }),
              ).displayName = o.JU.displayName);
            let y = u.forwardRef(({ className: t, children: e, ...r }, n) =>
              (0, i.jsxs)(o.q7, {
                ref: n,
                className: (0, s.cn)(
                  "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
                  t,
                ),
                ...r,
                children: [
                  (0, i.jsx)("span", {
                    className:
                      "absolute left-2 flex h-3.5 w-3.5 items-center justify-center",
                    children: (0, i.jsx)(o.VF, {
                      children: (0, i.jsx)(c.A, { className: "h-4 w-4" }),
                    }),
                  }),
                  (0, i.jsx)(o.p4, { children: e }),
                ],
              }),
            );
            (y.displayName = o.q7.displayName),
              (u.forwardRef(({ className: t, ...e }, r) =>
                (0, i.jsx)(o.wv, {
                  ref: r,
                  className: (0, s.cn)("-mx-1 my-1 h-px bg-muted", t),
                  ...e,
                }),
              ).displayName = o.wv.displayName),
              n();
          } catch (t) {
            n(t);
          }
        });
      },
      96360: (t) => {
        "use strict";
        var e = "\ud800-\udfff",
          r = "[\\u0300-\\u036f\\ufe20-\\ufe2f\\u20d0-\\u20ff]",
          n = "\ud83c[\udffb-\udfff]",
          i = "[^" + e + "]",
          o = "(?:\ud83c[\udde6-\uddff]){2}",
          a = "[\ud800-\udbff][\udc00-\udfff]",
          c = "(?:" + r + "|" + n + ")?",
          u = "[\\ufe0e\\ufe0f]?",
          s = "(?:\\u200d(?:" + [i, o, a].join("|") + ")" + u + c + ")*",
          l = RegExp(
            n +
              "(?=" +
              n +
              ")|" +
              ("(?:" + [i + r + "?", r, o, a, "[" + e + "]"].join("|")) +
              ")" +
              (u + c + s),
            "g",
          );
        t.exports = function (t) {
          return t.match(l) || [];
        };
      },
      97614: (t, e, r) => {
        "use strict";
        var n = r(1229),
          i = r(85828),
          o = Object.prototype.hasOwnProperty;
        t.exports = function (t) {
          if (!n(t)) return i(t);
          var e = [];
          for (var r in Object(t))
            o.call(t, r) && "constructor" != r && e.push(r);
          return e;
        };
      },
      98166: (t, e, r) => {
        Promise.resolve().then(r.bind(r, 62042));
      },
      98347: (t, e, r) => {
        "use strict";
        var n = r(89674),
          i = r(98373),
          o = r(83098),
          a = r(36343),
          c = r(17213),
          u = r(28017),
          s = r(18955),
          l = "[object Map]",
          f = "[object Promise]",
          p = "[object Set]",
          h = "[object WeakMap]",
          d = "[object DataView]",
          y = s(n),
          v = s(i),
          m = s(o),
          b = s(a),
          g = s(c),
          x = u;
        ((n && x(new n(new ArrayBuffer(1))) != d) ||
          (i && x(new i()) != l) ||
          (o && x(o.resolve()) != f) ||
          (a && x(new a()) != p) ||
          (c && x(new c()) != h)) &&
          (x = function (t) {
            var e = u(t),
              r = "[object Object]" == e ? t.constructor : void 0,
              n = r ? s(r) : "";
            if (n)
              switch (n) {
                case y:
                  return d;
                case v:
                  return l;
                case m:
                  return f;
                case b:
                  return p;
                case g:
                  return h;
              }
            return e;
          }),
          (t.exports = x);
      },
      98373: (t, e, r) => {
        "use strict";
        t.exports = r(43960)(r(40671), "Map");
      },
      99554: (t, e, r) => {
        "use strict";
        var n = r(45131);
        function i(t, e) {
          if ("function" != typeof t || (null != e && "function" != typeof e))
            throw TypeError("Expected a function");
          var r = function () {
            var n = arguments,
              i = e ? e.apply(this, n) : n[0],
              o = r.cache;
            if (o.has(i)) return o.get(i);
            var a = t.apply(this, n);
            return (r.cache = o.set(i, a) || o), a;
          };
          return (r.cache = new (i.Cache || n)()), r;
        }
        (i.Cache = n), (t.exports = i);
      },
      99869: (t, e, r) => {
        "use strict";
        var n = r(86154),
          i = r(90624);
        t.exports = function (t, e) {
          return n(i(t, e), 1);
        };
      },
    });
  var e = require("../../../../webpack-runtime.js");
  e.C(t);
  var r = (t) => e((e.s = t)),
    n = e.X(
      0,
      [
        827, 6518, 2033, 4027, 2872, 7713, 5149, 8859, 1655, 8029, 5728, 9729,
        3390, 4990, 6188, 7911, 7401, 5124, 3042, 385, 6867, 6777, 4630, 8264,
        27, 6536,
      ],
      () => r(25696),
    );
  module.exports = n;
})();
//# sourceMappingURL=page.js.map
