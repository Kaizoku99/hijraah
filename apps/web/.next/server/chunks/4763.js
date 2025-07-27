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
    (e._sentryDebugIds[t] = "374c0dfa-8cdf-4444-82eb-bf8bc4025131"),
    (e._sentryDebugIdIdentifier =
      "sentry-dbid-374c0dfa-8cdf-4444-82eb-bf8bc4025131"));
} catch (e) {}
("use strict");
(exports.id = 4763),
  (exports.ids = [4763]),
  (exports.modules = {
    94763: (e, t, n) => {
      n.d(t, { m: () => c });
      var r = n(23047),
        a = n(77666),
        s = n(89830),
        o = n(53614),
        i = n(43507),
        u = n(46837);
      function f(e, t) {
        let n = +(0, u.a)(e) - +(0, u.a)(t);
        return n < 0 ? -1 : n > 0 ? 1 : n;
      }
      var l = n(65223);
      function c(e, t) {
        return (function (e, t, n) {
          let r,
            c = (0, s.q)(),
            d = n?.locale ?? c.locale ?? a.c,
            h = f(e, t);
          if (isNaN(h)) throw RangeError("Invalid time value");
          let D = Object.assign({}, n, {
              addSuffix: n?.addSuffix,
              comparison: h,
            }),
            [m, M] = (0, i.x)(n?.in, ...(h > 0 ? [t, e] : [e, t])),
            b = (function (e, t, n) {
              var r;
              return ((r = void 0),
              (e) => {
                let t = (r ? Math[r] : Math.trunc)(e);
                return 0 === t ? 0 : t;
              })((+(0, u.a)(e) - +(0, u.a)(t)) / 1e3);
            })(M, m),
            g = Math.round((b - ((0, o.G)(M) - (0, o.G)(m)) / 1e3) / 60);
          if (g < 2)
            if (n?.includeSeconds)
              if (b < 5) return d.formatDistance("lessThanXSeconds", 5, D);
              else if (b < 10)
                return d.formatDistance("lessThanXSeconds", 10, D);
              else if (b < 20)
                return d.formatDistance("lessThanXSeconds", 20, D);
              else if (b < 40) return d.formatDistance("halfAMinute", 0, D);
              else if (b < 60)
                return d.formatDistance("lessThanXMinutes", 1, D);
              else return d.formatDistance("xMinutes", 1, D);
            else if (0 === g) return d.formatDistance("lessThanXMinutes", 1, D);
            else return d.formatDistance("xMinutes", g, D);
          if (g < 45) return d.formatDistance("xMinutes", g, D);
          if (g < 90) return d.formatDistance("aboutXHours", 1, D);
          if (g < l.F6) {
            let e = Math.round(g / 60);
            return d.formatDistance("aboutXHours", e, D);
          }
          if (g < 2520) return d.formatDistance("xDays", 1, D);
          else if (g < l.Nw) {
            let e = Math.round(g / l.F6);
            return d.formatDistance("xDays", e, D);
          } else if (g < 2 * l.Nw)
            return (
              (r = Math.round(g / l.Nw)), d.formatDistance("aboutXMonths", r, D)
            );
          if (
            (r = (function (e, t, n) {
              let [r, a, s] = (0, i.x)(void 0, e, e, t),
                o = f(a, s),
                l = Math.abs(
                  (function (e, t, n) {
                    let [r, a] = (0, i.x)(void 0, e, t);
                    return (
                      12 * (r.getFullYear() - a.getFullYear()) +
                      (r.getMonth() - a.getMonth())
                    );
                  })(a, s),
                );
              if (l < 1) return 0;
              1 === a.getMonth() && a.getDate() > 27 && a.setDate(30),
                a.setMonth(a.getMonth() - o * l);
              let c = f(a, s) === -o;
              (function (e, t) {
                let n = (0, u.a)(e, void 0);
                return (
                  +(function (e, t) {
                    let n = (0, u.a)(e, t?.in);
                    return n.setHours(23, 59, 59, 999), n;
                  })(n, void 0) ==
                  +(function (e, t) {
                    let n = (0, u.a)(e, t?.in),
                      r = n.getMonth();
                    return (
                      n.setFullYear(n.getFullYear(), r + 1, 0),
                      n.setHours(23, 59, 59, 999),
                      n
                    );
                  })(n, t)
                );
              })(r) &&
                1 === l &&
                1 === f(r, s) &&
                (c = !1);
              let d = o * (l - +c);
              return 0 === d ? 0 : d;
            })(M, m)) < 12
          ) {
            let e = Math.round(g / l.Nw);
            return d.formatDistance("xMonths", e, D);
          }
          {
            let e = r % 12,
              t = Math.trunc(r / 12);
            return e < 3
              ? d.formatDistance("aboutXYears", t, D)
              : e < 9
                ? d.formatDistance("overXYears", t, D)
                : d.formatDistance("almostXYears", t + 1, D);
          }
        })(e, (0, r.w)(e, Date.now()), t);
      }
    },
  });
//# sourceMappingURL=4763.js.map
