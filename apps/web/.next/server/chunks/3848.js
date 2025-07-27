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
    (e._sentryDebugIds[t] = "c63d67ca-60f4-4f25-a74f-06eb0f5d5258"),
    (e._sentryDebugIdIdentifier =
      "sentry-dbid-c63d67ca-60f4-4f25-a74f-06eb0f5d5258"));
} catch (e) {}
(exports.id = 3848),
  (exports.ids = [3848]),
  (exports.modules = {
    252: (e, t) => {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 }),
        Object.defineProperty(t, "ReflectAdapter", {
          enumerable: !0,
          get: function () {
            return r;
          },
        });
      class r {
        static get(e, t, r) {
          let o = Reflect.get(e, t, r);
          return "function" == typeof o ? o.bind(e) : o;
        }
        static set(e, t, r, o) {
          return Reflect.set(e, t, r, o);
        }
        static has(e, t) {
          return Reflect.has(e, t);
        }
        static deleteProperty(e, t) {
          return Reflect.deleteProperty(e, t);
        }
      }
    },
    10576: (e) => {
      "use strict";
      var t = String.prototype.replace,
        r = /%20/g,
        o = { RFC1738: "RFC1738", RFC3986: "RFC3986" };
      e.exports = {
        default: o.RFC3986,
        formatters: {
          RFC1738: function (e) {
            return t.call(e, r, "+");
          },
          RFC3986: function (e) {
            return String(e);
          },
        },
        RFC1738: o.RFC1738,
        RFC3986: o.RFC3986,
      };
    },
    11540: (e, t, r) => {
      "use strict";
      var o = r(93186),
        n = r(11747),
        i = function (e, t, r) {
          for (var o, n = e; null != (o = n.next); n = o)
            if (o.key === t)
              return (
                (n.next = o.next), r || ((o.next = e.next), (e.next = o)), o
              );
        },
        a = function (e, t) {
          if (e) {
            var r = i(e, t);
            return r && r.value;
          }
        },
        s = function (e, t, r) {
          var o = i(e, t);
          o ? (o.value = r) : (e.next = { key: t, next: e.next, value: r });
        },
        l = function (e, t) {
          if (e) return i(e, t, !0);
        };
      e.exports = function () {
        var e,
          t = {
            assert: function (e) {
              if (!t.has(e))
                throw new n("Side channel does not contain " + o(e));
            },
            delete: function (t) {
              var r = e && e.next,
                o = l(e, t);
              return o && r && r === o && (e = void 0), !!o;
            },
            get: function (t) {
              return a(e, t);
            },
            has: function (t) {
              var r;
              return !!(r = e) && !!i(r, t);
            },
            set: function (t, r) {
              e || (e = { next: void 0 }), s(e, t, r);
            },
          };
        return t;
      };
    },
    19570: (e, t, r) => {
      "use strict";
      var o = r(75431),
        n = r(70804),
        i = n([o("%String.prototype.indexOf%")]);
      e.exports = function (e, t) {
        var r = o(e, !!t);
        return "function" == typeof r && i(e, ".prototype.") > -1 ? n([r]) : r;
      };
    },
    19753: (e, t, r) => {
      "use strict";
      var o = r(11747),
        n = r(93186),
        i = r(11540),
        a = r(99809),
        s = r(52112) || a || i;
      e.exports = function () {
        var e,
          t = {
            assert: function (e) {
              if (!t.has(e))
                throw new o("Side channel does not contain " + n(e));
            },
            delete: function (t) {
              return !!e && e.delete(t);
            },
            get: function (t) {
              return e && e.get(t);
            },
            has: function (t) {
              return !!e && e.has(t);
            },
            set: function (t, r) {
              e || (e = s()), e.set(t, r);
            },
          };
        return t;
      };
    },
    31391: (e, t, r) => {
      "use strict";
      var o = r(52769),
        n = Object.prototype.hasOwnProperty,
        i = Array.isArray,
        a = {
          allowDots: !1,
          allowEmptyArrays: !1,
          allowPrototypes: !1,
          allowSparse: !1,
          arrayLimit: 20,
          charset: "utf-8",
          charsetSentinel: !1,
          comma: !1,
          decodeDotInKeys: !1,
          decoder: o.decode,
          delimiter: "&",
          depth: 5,
          duplicates: "combine",
          ignoreQueryPrefix: !1,
          interpretNumericEntities: !1,
          parameterLimit: 1e3,
          parseArrays: !0,
          plainObjects: !1,
          strictDepth: !1,
          strictNullHandling: !1,
          throwOnLimitExceeded: !1,
        },
        s = function (e, t, r) {
          if (e && "string" == typeof e && t.comma && e.indexOf(",") > -1)
            return e.split(",");
          if (t.throwOnLimitExceeded && r >= t.arrayLimit)
            throw RangeError(
              "Array limit exceeded. Only " +
                t.arrayLimit +
                " element" +
                (1 === t.arrayLimit ? "" : "s") +
                " allowed in an array.",
            );
          return e;
        },
        l = function (e, t) {
          var r = { __proto__: null },
            l = t.ignoreQueryPrefix ? e.replace(/^\?/, "") : e;
          l = l.replace(/%5B/gi, "[").replace(/%5D/gi, "]");
          var u = t.parameterLimit === 1 / 0 ? void 0 : t.parameterLimit,
            d = l.split(t.delimiter, t.throwOnLimitExceeded ? u + 1 : u);
          if (t.throwOnLimitExceeded && d.length > u)
            throw RangeError(
              "Parameter limit exceeded. Only " +
                u +
                " parameter" +
                (1 === u ? "" : "s") +
                " allowed.",
            );
          var c = -1,
            h = t.charset;
          if (t.charsetSentinel)
            for (p = 0; p < d.length; ++p)
              0 === d[p].indexOf("utf8=") &&
                ("utf8=%E2%9C%93" === d[p]
                  ? (h = "utf-8")
                  : "utf8=%26%2310003%3B" === d[p] && (h = "iso-8859-1"),
                (c = p),
                (p = d.length));
          for (p = 0; p < d.length; ++p)
            if (p !== c) {
              var p,
                m,
                f,
                v = d[p],
                y = v.indexOf("]="),
                P = -1 === y ? v.indexOf("=") : y + 1;
              -1 === P
                ? ((m = t.decoder(v, a.decoder, h, "key")),
                  (f = t.strictNullHandling ? null : ""))
                : ((m = t.decoder(v.slice(0, P), a.decoder, h, "key")),
                  (f = o.maybeMap(
                    s(v.slice(P + 1), t, i(r[m]) ? r[m].length : 0),
                    function (e) {
                      return t.decoder(e, a.decoder, h, "value");
                    },
                  ))),
                f &&
                  t.interpretNumericEntities &&
                  "iso-8859-1" === h &&
                  (f = String(f).replace(/&#(\d+);/g, function (e, t) {
                    return String.fromCharCode(parseInt(t, 10));
                  })),
                v.indexOf("[]=") > -1 && (f = i(f) ? [f] : f);
              var g = n.call(r, m);
              g && "combine" === t.duplicates
                ? (r[m] = o.combine(r[m], f))
                : (g && "last" !== t.duplicates) || (r[m] = f);
            }
          return r;
        },
        u = function (e, t, r, n) {
          var i = 0;
          if (e.length > 0 && "[]" === e[e.length - 1]) {
            var a = e.slice(0, -1).join("");
            i = Array.isArray(t) && t[a] ? t[a].length : 0;
          }
          for (var l = n ? t : s(t, r, i), u = e.length - 1; u >= 0; --u) {
            var d,
              c = e[u];
            if ("[]" === c && r.parseArrays)
              d =
                r.allowEmptyArrays &&
                ("" === l || (r.strictNullHandling && null === l))
                  ? []
                  : o.combine([], l);
            else {
              d = r.plainObjects ? { __proto__: null } : {};
              var h =
                  "[" === c.charAt(0) && "]" === c.charAt(c.length - 1)
                    ? c.slice(1, -1)
                    : c,
                p = r.decodeDotInKeys ? h.replace(/%2E/g, ".") : h,
                m = parseInt(p, 10);
              r.parseArrays || "" !== p
                ? !isNaN(m) &&
                  c !== p &&
                  String(m) === p &&
                  m >= 0 &&
                  r.parseArrays &&
                  m <= r.arrayLimit
                  ? ((d = [])[m] = l)
                  : "__proto__" !== p && (d[p] = l)
                : (d = { 0: l });
            }
            l = d;
          }
          return l;
        },
        d = function (e, t, r, o) {
          if (e) {
            var i = r.allowDots ? e.replace(/\.([^.[]+)/g, "[$1]") : e,
              a = /(\[[^[\]]*])/g,
              s = r.depth > 0 && /(\[[^[\]]*])/.exec(i),
              l = s ? i.slice(0, s.index) : i,
              d = [];
            if (l) {
              if (
                !r.plainObjects &&
                n.call(Object.prototype, l) &&
                !r.allowPrototypes
              )
                return;
              d.push(l);
            }
            for (
              var c = 0;
              r.depth > 0 && null !== (s = a.exec(i)) && c < r.depth;

            ) {
              if (
                ((c += 1),
                !r.plainObjects &&
                  n.call(Object.prototype, s[1].slice(1, -1)) &&
                  !r.allowPrototypes)
              )
                return;
              d.push(s[1]);
            }
            if (s) {
              if (!0 === r.strictDepth)
                throw RangeError(
                  "Input depth exceeded depth option of " +
                    r.depth +
                    " and strictDepth is true",
                );
              d.push("[" + i.slice(s.index) + "]");
            }
            return u(d, t, r, o);
          }
        },
        c = function (e) {
          if (!e) return a;
          if (
            void 0 !== e.allowEmptyArrays &&
            "boolean" != typeof e.allowEmptyArrays
          )
            throw TypeError(
              "`allowEmptyArrays` option can only be `true` or `false`, when provided",
            );
          if (
            void 0 !== e.decodeDotInKeys &&
            "boolean" != typeof e.decodeDotInKeys
          )
            throw TypeError(
              "`decodeDotInKeys` option can only be `true` or `false`, when provided",
            );
          if (
            null !== e.decoder &&
            void 0 !== e.decoder &&
            "function" != typeof e.decoder
          )
            throw TypeError("Decoder has to be a function.");
          if (
            void 0 !== e.charset &&
            "utf-8" !== e.charset &&
            "iso-8859-1" !== e.charset
          )
            throw TypeError(
              "The charset option must be either utf-8, iso-8859-1, or undefined",
            );
          if (
            void 0 !== e.throwOnLimitExceeded &&
            "boolean" != typeof e.throwOnLimitExceeded
          )
            throw TypeError("`throwOnLimitExceeded` option must be a boolean");
          var t = void 0 === e.charset ? a.charset : e.charset,
            r = void 0 === e.duplicates ? a.duplicates : e.duplicates;
          if ("combine" !== r && "first" !== r && "last" !== r)
            throw TypeError(
              "The duplicates option must be either combine, first, or last",
            );
          return {
            allowDots:
              void 0 === e.allowDots
                ? !0 === e.decodeDotInKeys || a.allowDots
                : !!e.allowDots,
            allowEmptyArrays:
              "boolean" == typeof e.allowEmptyArrays
                ? !!e.allowEmptyArrays
                : a.allowEmptyArrays,
            allowPrototypes:
              "boolean" == typeof e.allowPrototypes
                ? e.allowPrototypes
                : a.allowPrototypes,
            allowSparse:
              "boolean" == typeof e.allowSparse ? e.allowSparse : a.allowSparse,
            arrayLimit:
              "number" == typeof e.arrayLimit ? e.arrayLimit : a.arrayLimit,
            charset: t,
            charsetSentinel:
              "boolean" == typeof e.charsetSentinel
                ? e.charsetSentinel
                : a.charsetSentinel,
            comma: "boolean" == typeof e.comma ? e.comma : a.comma,
            decodeDotInKeys:
              "boolean" == typeof e.decodeDotInKeys
                ? e.decodeDotInKeys
                : a.decodeDotInKeys,
            decoder: "function" == typeof e.decoder ? e.decoder : a.decoder,
            delimiter:
              "string" == typeof e.delimiter || o.isRegExp(e.delimiter)
                ? e.delimiter
                : a.delimiter,
            depth:
              "number" == typeof e.depth || !1 === e.depth ? +e.depth : a.depth,
            duplicates: r,
            ignoreQueryPrefix: !0 === e.ignoreQueryPrefix,
            interpretNumericEntities:
              "boolean" == typeof e.interpretNumericEntities
                ? e.interpretNumericEntities
                : a.interpretNumericEntities,
            parameterLimit:
              "number" == typeof e.parameterLimit
                ? e.parameterLimit
                : a.parameterLimit,
            parseArrays: !1 !== e.parseArrays,
            plainObjects:
              "boolean" == typeof e.plainObjects
                ? e.plainObjects
                : a.plainObjects,
            strictDepth:
              "boolean" == typeof e.strictDepth
                ? !!e.strictDepth
                : a.strictDepth,
            strictNullHandling:
              "boolean" == typeof e.strictNullHandling
                ? e.strictNullHandling
                : a.strictNullHandling,
            throwOnLimitExceeded:
              "boolean" == typeof e.throwOnLimitExceeded &&
              e.throwOnLimitExceeded,
          };
        };
      e.exports = function (e, t) {
        var r = c(t);
        if ("" === e || null == e)
          return r.plainObjects ? { __proto__: null } : {};
        for (
          var n = "string" == typeof e ? l(e, r) : e,
            i = r.plainObjects ? { __proto__: null } : {},
            a = Object.keys(n),
            s = 0;
          s < a.length;
          ++s
        ) {
          var u = a[s],
            h = d(u, n[u], r, "string" == typeof e);
          i = o.merge(i, h, r);
        }
        return !0 === r.allowSparse ? i : o.compact(i);
      };
    },
    52112: (e, t, r) => {
      "use strict";
      var o = r(75431),
        n = r(19570),
        i = r(93186),
        a = r(99809),
        s = r(11747),
        l = o("%WeakMap%", !0),
        u = n("WeakMap.prototype.get", !0),
        d = n("WeakMap.prototype.set", !0),
        c = n("WeakMap.prototype.has", !0),
        h = n("WeakMap.prototype.delete", !0);
      e.exports = l
        ? function () {
            var e,
              t,
              r = {
                assert: function (e) {
                  if (!r.has(e))
                    throw new s("Side channel does not contain " + i(e));
                },
                delete: function (r) {
                  if (
                    l &&
                    r &&
                    ("object" == typeof r || "function" == typeof r)
                  ) {
                    if (e) return h(e, r);
                  } else if (a && t) return t.delete(r);
                  return !1;
                },
                get: function (r) {
                  return l &&
                    r &&
                    ("object" == typeof r || "function" == typeof r) &&
                    e
                    ? u(e, r)
                    : t && t.get(r);
                },
                has: function (r) {
                  return l &&
                    r &&
                    ("object" == typeof r || "function" == typeof r) &&
                    e
                    ? c(e, r)
                    : !!t && t.has(r);
                },
                set: function (r, o) {
                  l && r && ("object" == typeof r || "function" == typeof r)
                    ? (e || (e = new l()), d(e, r, o))
                    : a && (t || (t = a()), t.set(r, o));
                },
              };
            return r;
          }
        : a;
    },
    52769: (e, t, r) => {
      "use strict";
      var o = r(10576),
        n = Object.prototype.hasOwnProperty,
        i = Array.isArray,
        a = (function () {
          for (var e = [], t = 0; t < 256; ++t)
            e.push("%" + ((t < 16 ? "0" : "") + t.toString(16)).toUpperCase());
          return e;
        })(),
        s = function (e) {
          for (; e.length > 1; ) {
            var t = e.pop(),
              r = t.obj[t.prop];
            if (i(r)) {
              for (var o = [], n = 0; n < r.length; ++n)
                void 0 !== r[n] && o.push(r[n]);
              t.obj[t.prop] = o;
            }
          }
        },
        l = function (e, t) {
          for (
            var r = t && t.plainObjects ? { __proto__: null } : {}, o = 0;
            o < e.length;
            ++o
          )
            void 0 !== e[o] && (r[o] = e[o]);
          return r;
        };
      e.exports = {
        arrayToObject: l,
        assign: function (e, t) {
          return Object.keys(t).reduce(function (e, r) {
            return (e[r] = t[r]), e;
          }, e);
        },
        combine: function (e, t) {
          return [].concat(e, t);
        },
        compact: function (e) {
          for (
            var t = [{ obj: { o: e }, prop: "o" }], r = [], o = 0;
            o < t.length;
            ++o
          )
            for (
              var n = t[o], i = n.obj[n.prop], a = Object.keys(i), l = 0;
              l < a.length;
              ++l
            ) {
              var u = a[l],
                d = i[u];
              "object" == typeof d &&
                null !== d &&
                -1 === r.indexOf(d) &&
                (t.push({ obj: i, prop: u }), r.push(d));
            }
          return s(t), e;
        },
        decode: function (e, t, r) {
          var o = e.replace(/\+/g, " ");
          if ("iso-8859-1" === r) return o.replace(/%[0-9a-f]{2}/gi, unescape);
          try {
            return decodeURIComponent(o);
          } catch (e) {
            return o;
          }
        },
        encode: function (e, t, r, n, i) {
          if (0 === e.length) return e;
          var s = e;
          if (
            ("symbol" == typeof e
              ? (s = Symbol.prototype.toString.call(e))
              : "string" != typeof e && (s = String(e)),
            "iso-8859-1" === r)
          )
            return escape(s).replace(/%u[0-9a-f]{4}/gi, function (e) {
              return "%26%23" + parseInt(e.slice(2), 16) + "%3B";
            });
          for (var l = "", u = 0; u < s.length; u += 1024) {
            for (
              var d = s.length >= 1024 ? s.slice(u, u + 1024) : s,
                c = [],
                h = 0;
              h < d.length;
              ++h
            ) {
              var p = d.charCodeAt(h);
              if (
                45 === p ||
                46 === p ||
                95 === p ||
                126 === p ||
                (p >= 48 && p <= 57) ||
                (p >= 65 && p <= 90) ||
                (p >= 97 && p <= 122) ||
                (i === o.RFC1738 && (40 === p || 41 === p))
              ) {
                c[c.length] = d.charAt(h);
                continue;
              }
              if (p < 128) {
                c[c.length] = a[p];
                continue;
              }
              if (p < 2048) {
                c[c.length] = a[192 | (p >> 6)] + a[128 | (63 & p)];
                continue;
              }
              if (p < 55296 || p >= 57344) {
                c[c.length] =
                  a[224 | (p >> 12)] +
                  a[128 | ((p >> 6) & 63)] +
                  a[128 | (63 & p)];
                continue;
              }
              (h += 1),
                (p = 65536 + (((1023 & p) << 10) | (1023 & d.charCodeAt(h)))),
                (c[c.length] =
                  a[240 | (p >> 18)] +
                  a[128 | ((p >> 12) & 63)] +
                  a[128 | ((p >> 6) & 63)] +
                  a[128 | (63 & p)]);
            }
            l += c.join("");
          }
          return l;
        },
        isBuffer: function (e) {
          return (
            !!e &&
            "object" == typeof e &&
            !!(
              e.constructor &&
              e.constructor.isBuffer &&
              e.constructor.isBuffer(e)
            )
          );
        },
        isRegExp: function (e) {
          return "[object RegExp]" === Object.prototype.toString.call(e);
        },
        maybeMap: function (e, t) {
          if (i(e)) {
            for (var r = [], o = 0; o < e.length; o += 1) r.push(t(e[o]));
            return r;
          }
          return t(e);
        },
        merge: function e(t, r, o) {
          if (!r) return t;
          if ("object" != typeof r && "function" != typeof r) {
            if (i(t)) t.push(r);
            else {
              if (!t || "object" != typeof t) return [t, r];
              ((o && (o.plainObjects || o.allowPrototypes)) ||
                !n.call(Object.prototype, r)) &&
                (t[r] = !0);
            }
            return t;
          }
          if (!t || "object" != typeof t) return [t].concat(r);
          var a = t;
          return (i(t) && !i(r) && (a = l(t, o)), i(t) && i(r))
            ? (r.forEach(function (r, i) {
                if (n.call(t, i)) {
                  var a = t[i];
                  a && "object" == typeof a && r && "object" == typeof r
                    ? (t[i] = e(a, r, o))
                    : t.push(r);
                } else t[i] = r;
              }),
              t)
            : Object.keys(r).reduce(function (t, i) {
                var a = r[i];
                return n.call(t, i) ? (t[i] = e(t[i], a, o)) : (t[i] = a), t;
              }, a);
        },
      };
    },
    55213: (e, t, r) => {
      "use strict";
      var o = r(19753),
        n = r(52769),
        i = r(10576),
        a = Object.prototype.hasOwnProperty,
        s = {
          brackets: function (e) {
            return e + "[]";
          },
          comma: "comma",
          indices: function (e, t) {
            return e + "[" + t + "]";
          },
          repeat: function (e) {
            return e;
          },
        },
        l = Array.isArray,
        u = Array.prototype.push,
        d = function (e, t) {
          u.apply(e, l(t) ? t : [t]);
        },
        c = Date.prototype.toISOString,
        h = i.default,
        p = {
          addQueryPrefix: !1,
          allowDots: !1,
          allowEmptyArrays: !1,
          arrayFormat: "indices",
          charset: "utf-8",
          charsetSentinel: !1,
          commaRoundTrip: !1,
          delimiter: "&",
          encode: !0,
          encodeDotInKeys: !1,
          encoder: n.encode,
          encodeValuesOnly: !1,
          filter: void 0,
          format: h,
          formatter: i.formatters[h],
          indices: !1,
          serializeDate: function (e) {
            return c.call(e);
          },
          skipNulls: !1,
          strictNullHandling: !1,
        },
        m = {},
        f = function e(t, r, i, a, s, u, c, h, f, v, y, P, g, T, _, E, b, S) {
          for (
            var O, x, w = t, A = S, C = 0, G = !1;
            void 0 !== (A = A.get(m)) && !G;

          ) {
            var R = A.get(t);
            if (((C += 1), void 0 !== R))
              if (R === C) throw RangeError("Cyclic object value");
              else G = !0;
            void 0 === A.get(m) && (C = 0);
          }
          if (
            ("function" == typeof v
              ? (w = v(r, w))
              : w instanceof Date
                ? (w = g(w))
                : "comma" === i &&
                  l(w) &&
                  (w = n.maybeMap(w, function (e) {
                    return e instanceof Date ? g(e) : e;
                  })),
            null === w)
          ) {
            if (u) return f && !E ? f(r, p.encoder, b, "key", T) : r;
            w = "";
          }
          if (
            "string" == typeof (O = w) ||
            "number" == typeof O ||
            "boolean" == typeof O ||
            "symbol" == typeof O ||
            "bigint" == typeof O ||
            n.isBuffer(w)
          )
            return f
              ? [
                  _(E ? r : f(r, p.encoder, b, "key", T)) +
                    "=" +
                    _(f(w, p.encoder, b, "value", T)),
                ]
              : [_(r) + "=" + _(String(w))];
          var j = [];
          if (void 0 === w) return j;
          if ("comma" === i && l(w))
            E && f && (w = n.maybeMap(w, f)),
              (x = [{ value: w.length > 0 ? w.join(",") || null : void 0 }]);
          else if (l(v)) x = v;
          else {
            var k = Object.keys(w);
            x = y ? k.sort(y) : k;
          }
          var D = h ? String(r).replace(/\./g, "%2E") : String(r),
            I = a && l(w) && 1 === w.length ? D + "[]" : D;
          if (s && l(w) && 0 === w.length) return I + "[]";
          for (var N = 0; N < x.length; ++N) {
            var q = x[N],
              M =
                "object" == typeof q && q && void 0 !== q.value
                  ? q.value
                  : w[q];
            if (!c || null !== M) {
              var L = P && h ? String(q).replace(/\./g, "%2E") : String(q),
                H = l(w)
                  ? "function" == typeof i
                    ? i(I, L)
                    : I
                  : I + (P ? "." + L : "[" + L + "]");
              S.set(t, C);
              var U = o();
              U.set(m, S),
                d(
                  j,
                  e(
                    M,
                    H,
                    i,
                    a,
                    s,
                    u,
                    c,
                    h,
                    "comma" === i && E && l(w) ? null : f,
                    v,
                    y,
                    P,
                    g,
                    T,
                    _,
                    E,
                    b,
                    U,
                  ),
                );
            }
          }
          return j;
        },
        v = function (e) {
          if (!e) return p;
          if (
            void 0 !== e.allowEmptyArrays &&
            "boolean" != typeof e.allowEmptyArrays
          )
            throw TypeError(
              "`allowEmptyArrays` option can only be `true` or `false`, when provided",
            );
          if (
            void 0 !== e.encodeDotInKeys &&
            "boolean" != typeof e.encodeDotInKeys
          )
            throw TypeError(
              "`encodeDotInKeys` option can only be `true` or `false`, when provided",
            );
          if (
            null !== e.encoder &&
            void 0 !== e.encoder &&
            "function" != typeof e.encoder
          )
            throw TypeError("Encoder has to be a function.");
          var t,
            r = e.charset || p.charset;
          if (
            void 0 !== e.charset &&
            "utf-8" !== e.charset &&
            "iso-8859-1" !== e.charset
          )
            throw TypeError(
              "The charset option must be either utf-8, iso-8859-1, or undefined",
            );
          var o = i.default;
          if (void 0 !== e.format) {
            if (!a.call(i.formatters, e.format))
              throw TypeError("Unknown format option provided.");
            o = e.format;
          }
          var n = i.formatters[o],
            u = p.filter;
          if (
            (("function" == typeof e.filter || l(e.filter)) && (u = e.filter),
            (t =
              e.arrayFormat in s
                ? e.arrayFormat
                : "indices" in e
                  ? e.indices
                    ? "indices"
                    : "repeat"
                  : p.arrayFormat),
            "commaRoundTrip" in e && "boolean" != typeof e.commaRoundTrip)
          )
            throw TypeError("`commaRoundTrip` must be a boolean, or absent");
          var d =
            void 0 === e.allowDots
              ? !0 === e.encodeDotInKeys || p.allowDots
              : !!e.allowDots;
          return {
            addQueryPrefix:
              "boolean" == typeof e.addQueryPrefix
                ? e.addQueryPrefix
                : p.addQueryPrefix,
            allowDots: d,
            allowEmptyArrays:
              "boolean" == typeof e.allowEmptyArrays
                ? !!e.allowEmptyArrays
                : p.allowEmptyArrays,
            arrayFormat: t,
            charset: r,
            charsetSentinel:
              "boolean" == typeof e.charsetSentinel
                ? e.charsetSentinel
                : p.charsetSentinel,
            commaRoundTrip: !!e.commaRoundTrip,
            delimiter: void 0 === e.delimiter ? p.delimiter : e.delimiter,
            encode: "boolean" == typeof e.encode ? e.encode : p.encode,
            encodeDotInKeys:
              "boolean" == typeof e.encodeDotInKeys
                ? e.encodeDotInKeys
                : p.encodeDotInKeys,
            encoder: "function" == typeof e.encoder ? e.encoder : p.encoder,
            encodeValuesOnly:
              "boolean" == typeof e.encodeValuesOnly
                ? e.encodeValuesOnly
                : p.encodeValuesOnly,
            filter: u,
            format: o,
            formatter: n,
            serializeDate:
              "function" == typeof e.serializeDate
                ? e.serializeDate
                : p.serializeDate,
            skipNulls:
              "boolean" == typeof e.skipNulls ? e.skipNulls : p.skipNulls,
            sort: "function" == typeof e.sort ? e.sort : null,
            strictNullHandling:
              "boolean" == typeof e.strictNullHandling
                ? e.strictNullHandling
                : p.strictNullHandling,
          };
        };
      e.exports = function (e, t) {
        var r,
          n,
          i = e,
          a = v(t);
        "function" == typeof a.filter
          ? (i = (0, a.filter)("", i))
          : l(a.filter) && (r = a.filter);
        var u = [];
        if ("object" != typeof i || null === i) return "";
        var c = s[a.arrayFormat],
          h = "comma" === c && a.commaRoundTrip;
        r || (r = Object.keys(i)), a.sort && r.sort(a.sort);
        for (var p = o(), m = 0; m < r.length; ++m) {
          var y = r[m],
            P = i[y];
          (a.skipNulls && null === P) ||
            d(
              u,
              f(
                P,
                y,
                c,
                h,
                a.allowEmptyArrays,
                a.strictNullHandling,
                a.skipNulls,
                a.encodeDotInKeys,
                a.encode ? a.encoder : null,
                a.filter,
                a.sort,
                a.allowDots,
                a.serializeDate,
                a.format,
                a.formatter,
                a.encodeValuesOnly,
                a.charset,
                p,
              ),
            );
        }
        var g = u.join(a.delimiter),
          T = !0 === a.addQueryPrefix ? "?" : "";
        return (
          a.charsetSentinel &&
            ("iso-8859-1" === a.charset
              ? (T += "utf8=%26%2310003%3B&")
              : (T += "utf8=%E2%9C%93&")),
          g.length > 0 ? T + g : ""
        );
      };
    },
    59714: (e, t, r) => {
      "use strict";
      r.d(t, { A: () => nL });
      var o = {};
      r.r(o),
        r.d(o, {
          StripeAPIError: () => j,
          StripeAuthenticationError: () => k,
          StripeCardError: () => G,
          StripeConnectionError: () => N,
          StripeError: () => C,
          StripeIdempotencyError: () => M,
          StripeInvalidGrantError: () => L,
          StripeInvalidRequestError: () => R,
          StripePermissionError: () => D,
          StripeRateLimitError: () => I,
          StripeSignatureVerificationError: () => q,
          StripeUnknownError: () => H,
          TemporarySessionExpiredError: () => U,
          generateV1Error: () => w,
          generateV2Error: () => A,
        });
      var n = {};
      r.r(n),
        r.d(n, {
          Account: () => rM,
          AccountLinks: () => rH,
          AccountSessions: () => rF,
          Accounts: () => rM,
          ApplePayDomains: () => rz,
          ApplicationFees: () => rK,
          Apps: () => nf,
          Balance: () => rV,
          BalanceTransactions: () => rQ,
          Billing: () => nv,
          BillingPortal: () => ny,
          Charges: () => rY,
          Checkout: () => nP,
          Climate: () => ng,
          ConfirmationTokens: () => r1,
          CountrySpecs: () => r2,
          Coupons: () => r5,
          CreditNotes: () => r6,
          CustomerSessions: () => r4,
          Customers: () => oe,
          Disputes: () => or,
          Entitlements: () => nT,
          EphemeralKeys: () => on,
          Events: () => oa,
          ExchangeRates: () => ol,
          FileLinks: () => od,
          Files: () => op,
          FinancialConnections: () => n_,
          Forwarding: () => nE,
          Identity: () => nb,
          InvoiceItems: () => of,
          InvoiceRenderingTemplates: () => oy,
          Invoices: () => og,
          Issuing: () => nS,
          Mandates: () => o_,
          OAuth: () => oS,
          PaymentIntents: () => ox,
          PaymentLinks: () => oA,
          PaymentMethodConfigurations: () => oG,
          PaymentMethodDomains: () => oj,
          PaymentMethods: () => oD,
          Payouts: () => oN,
          Plans: () => oM,
          Prices: () => oH,
          Products: () => oF,
          PromotionCodes: () => oz,
          Quotes: () => oK,
          Radar: () => nO,
          Refunds: () => oV,
          Reporting: () => nx,
          Reviews: () => oQ,
          SetupAttempts: () => oY,
          SetupIntents: () => o1,
          ShippingRates: () => o2,
          Sigma: () => nw,
          Sources: () => o5,
          SubscriptionItems: () => o6,
          SubscriptionSchedules: () => o4,
          Subscriptions: () => ne,
          Tax: () => nA,
          TaxCodes: () => nr,
          TaxIds: () => nn,
          TaxRates: () => na,
          Terminal: () => nC,
          TestHelpers: () => nG,
          Tokens: () => nl,
          Topups: () => nd,
          Transfers: () => nh,
          Treasury: () => nR,
          V2: () => nj,
          WebhookEndpoints: () => nm,
        });
      var i = r(55511),
        a = r(94735);
      class s {
        computeHMACSignature(e, t) {
          throw Error("computeHMACSignature not implemented.");
        }
        computeHMACSignatureAsync(e, t) {
          throw Error("computeHMACSignatureAsync not implemented.");
        }
        computeSHA256Async(e) {
          throw Error("computeSHA256 not implemented.");
        }
      }
      class l extends Error {}
      class u extends s {
        computeHMACSignature(e, t) {
          return i.createHmac("sha256", t).update(e, "utf8").digest("hex");
        }
        async computeHMACSignatureAsync(e, t) {
          return await this.computeHMACSignature(e, t);
        }
        async computeSHA256Async(e) {
          return new Uint8Array(
            await i.createHash("sha256").update(e).digest(),
          );
        }
      }
      var d = r(81630),
        c = r.t(d, 2),
        h = r(55591),
        p = r.t(h, 2);
      class m {
        getClientName() {
          throw Error("getClientName not implemented.");
        }
        makeRequest(e, t, r, o, n, i, a, s) {
          throw Error("makeRequest not implemented.");
        }
        static makeTimeoutError() {
          let e = TypeError(m.TIMEOUT_ERROR_CODE);
          return (e.code = m.TIMEOUT_ERROR_CODE), e;
        }
      }
      (m.CONNECTION_CLOSED_ERROR_CODES = ["ECONNRESET", "EPIPE"]),
        (m.TIMEOUT_ERROR_CODE = "ETIMEDOUT");
      class f {
        constructor(e, t) {
          (this._statusCode = e), (this._headers = t);
        }
        getStatusCode() {
          return this._statusCode;
        }
        getHeaders() {
          return this._headers;
        }
        getRawResponse() {
          throw Error("getRawResponse not implemented.");
        }
        toStream(e) {
          throw Error("toStream not implemented.");
        }
        toJSON() {
          throw Error("toJSON not implemented.");
        }
      }
      let v = d || c,
        y = h || p,
        P = new v.Agent({ keepAlive: !0 }),
        g = new y.Agent({ keepAlive: !0 });
      class T extends m {
        constructor(e) {
          super(), (this._agent = e);
        }
        getClientName() {
          return "node";
        }
        makeRequest(e, t, r, o, n, i, a, s) {
          let l = "http" === a,
            u = this._agent;
          return (
            u || (u = l ? P : g),
            new Promise((a, d) => {
              let c = (l ? v : y).request({
                host: e,
                port: t,
                path: r,
                method: o,
                agent: u,
                headers: n,
                ciphers: "DEFAULT:!aNULL:!eNULL:!LOW:!EXPORT:!SSLv2:!MD5",
              });
              c.setTimeout(s, () => {
                c.destroy(m.makeTimeoutError());
              }),
                c.on("response", (e) => {
                  a(new _(e));
                }),
                c.on("error", (e) => {
                  d(e);
                }),
                c.once("socket", (e) => {
                  e.connecting
                    ? e.once(l ? "connect" : "secureConnect", () => {
                        c.write(i), c.end();
                      })
                    : (c.write(i), c.end());
                });
            })
          );
        }
      }
      class _ extends f {
        constructor(e) {
          super(e.statusCode, e.headers || {}), (this._res = e);
        }
        getRawResponse() {
          return this._res;
        }
        toStream(e) {
          return this._res.once("end", () => e()), this._res;
        }
        toJSON() {
          return new Promise((e, t) => {
            let r = "";
            this._res.setEncoding("utf8"),
              this._res.on("data", (e) => {
                r += e;
              }),
              this._res.once("end", () => {
                try {
                  e(JSON.parse(r));
                } catch (e) {
                  t(e);
                }
              });
          });
        }
      }
      class E extends m {
        constructor(e) {
          if ((super(), !e)) {
            if (!globalThis.fetch)
              throw Error(
                "fetch() function not provided and is not defined in the global scope. You must provide a fetch implementation.",
              );
            e = globalThis.fetch;
          }
          globalThis.AbortController
            ? (this._fetchFn = E.makeFetchWithAbortTimeout(e))
            : (this._fetchFn = E.makeFetchWithRaceTimeout(e));
        }
        static makeFetchWithRaceTimeout(e) {
          return (t, r, o) => {
            let n,
              i = new Promise((e, t) => {
                n = setTimeout(() => {
                  (n = null), t(m.makeTimeoutError());
                }, o);
              });
            return Promise.race([e(t, r), i]).finally(() => {
              n && clearTimeout(n);
            });
          };
        }
        static makeFetchWithAbortTimeout(e) {
          return async (t, r, o) => {
            let n = new AbortController(),
              i = setTimeout(() => {
                (i = null), n.abort(m.makeTimeoutError());
              }, o);
            try {
              return await e(
                t,
                Object.assign(Object.assign({}, r), { signal: n.signal }),
              );
            } catch (e) {
              if ("AbortError" === e.name) throw m.makeTimeoutError();
              throw e;
            } finally {
              i && clearTimeout(i);
            }
          };
        }
        getClientName() {
          return "fetch";
        }
        async makeRequest(e, t, r, o, n, i, a, s) {
          let l = new URL(r, `${"http" === a ? "http" : "https"}://${e}`);
          l.port = t;
          let u = "POST" == o || "PUT" == o || "PATCH" == o;
          return new b(
            await this._fetchFn(
              l.toString(),
              { method: o, headers: n, body: i || (u ? "" : void 0) },
              s,
            ),
          );
        }
      }
      class b extends f {
        constructor(e) {
          super(e.status, b._transformHeadersToObject(e.headers)),
            (this._res = e);
        }
        getRawResponse() {
          return this._res;
        }
        toStream(e) {
          return e(), this._res.body;
        }
        toJSON() {
          return this._res.json();
        }
        static _transformHeadersToObject(e) {
          let t = {};
          for (let r of e) {
            if (!Array.isArray(r) || 2 != r.length)
              throw Error(
                "Response objects produced by the fetch function given to FetchHttpClient do not have an iterable headers map. Response#headers should be an iterable object.",
              );
            t[r[0]] = r[1];
          }
          return t;
        }
      }
      class S extends s {
        constructor(e) {
          super(), (this.subtleCrypto = e || crypto.subtle);
        }
        computeHMACSignature(e, t) {
          throw new l(
            "SubtleCryptoProvider cannot be used in a synchronous context.",
          );
        }
        async computeHMACSignatureAsync(e, t) {
          let r = new TextEncoder(),
            o = await this.subtleCrypto.importKey(
              "raw",
              r.encode(t),
              { name: "HMAC", hash: { name: "SHA-256" } },
              !1,
              ["sign"],
            ),
            n = new Uint8Array(
              await this.subtleCrypto.sign("hmac", o, r.encode(e)),
            ),
            i = Array(n.length);
          for (let e = 0; e < n.length; e++) i[e] = O[n[e]];
          return i.join("");
        }
        async computeSHA256Async(e) {
          return new Uint8Array(await this.subtleCrypto.digest("SHA-256", e));
        }
      }
      let O = Array(256);
      for (let e = 0; e < O.length; e++) O[e] = e.toString(16).padStart(2, "0");
      class x {
        constructor() {
          (this._fetchFn = null), (this._agent = null);
        }
        getUname() {
          throw Error("getUname not implemented.");
        }
        uuid4() {
          return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
            /[xy]/g,
            (e) => {
              let t = (16 * Math.random()) | 0;
              return ("x" === e ? t : (3 & t) | 8).toString(16);
            },
          );
        }
        secureCompare(e, t) {
          if (e.length !== t.length) return !1;
          let r = e.length,
            o = 0;
          for (let n = 0; n < r; ++n) o |= e.charCodeAt(n) ^ t.charCodeAt(n);
          return 0 === o;
        }
        createEmitter() {
          throw Error("createEmitter not implemented.");
        }
        tryBufferData(e) {
          throw Error("tryBufferData not implemented.");
        }
        createNodeHttpClient(e) {
          throw Error("createNodeHttpClient not implemented.");
        }
        createFetchHttpClient(e) {
          return new E(e);
        }
        createDefaultHttpClient() {
          throw Error("createDefaultHttpClient not implemented.");
        }
        createNodeCryptoProvider() {
          throw Error("createNodeCryptoProvider not implemented.");
        }
        createSubtleCryptoProvider(e) {
          return new S(e);
        }
        createDefaultCryptoProvider() {
          throw Error("createDefaultCryptoProvider not implemented.");
        }
      }
      let w = (e) => {
          switch (e.type) {
            case "card_error":
              return new G(e);
            case "invalid_request_error":
              return new R(e);
            case "api_error":
              return new j(e);
            case "authentication_error":
              return new k(e);
            case "rate_limit_error":
              return new I(e);
            case "idempotency_error":
              return new M(e);
            case "invalid_grant":
              return new L(e);
            default:
              return new H(e);
          }
        },
        A = (e) =>
          "temporary_session_expired" === e.type
            ? new U(e)
            : "invalid_fields" === e.code
              ? new R(e)
              : w(e);
      class C extends Error {
        constructor(e = {}, t = null) {
          super(e.message),
            (this.type = t || this.constructor.name),
            (this.raw = e),
            (this.rawType = e.type),
            (this.code = e.code),
            (this.doc_url = e.doc_url),
            (this.param = e.param),
            (this.detail = e.detail),
            (this.headers = e.headers),
            (this.requestId = e.requestId),
            (this.statusCode = e.statusCode),
            (this.message = e.message),
            (this.userMessage = e.user_message),
            (this.charge = e.charge),
            (this.decline_code = e.decline_code),
            (this.payment_intent = e.payment_intent),
            (this.payment_method = e.payment_method),
            (this.payment_method_type = e.payment_method_type),
            (this.setup_intent = e.setup_intent),
            (this.source = e.source);
        }
      }
      C.generate = w;
      class G extends C {
        constructor(e = {}) {
          super(e, "StripeCardError");
        }
      }
      class R extends C {
        constructor(e = {}) {
          super(e, "StripeInvalidRequestError");
        }
      }
      class j extends C {
        constructor(e = {}) {
          super(e, "StripeAPIError");
        }
      }
      class k extends C {
        constructor(e = {}) {
          super(e, "StripeAuthenticationError");
        }
      }
      class D extends C {
        constructor(e = {}) {
          super(e, "StripePermissionError");
        }
      }
      class I extends C {
        constructor(e = {}) {
          super(e, "StripeRateLimitError");
        }
      }
      class N extends C {
        constructor(e = {}) {
          super(e, "StripeConnectionError");
        }
      }
      class q extends C {
        constructor(e, t, r = {}) {
          super(r, "StripeSignatureVerificationError"),
            (this.header = e),
            (this.payload = t);
        }
      }
      class M extends C {
        constructor(e = {}) {
          super(e, "StripeIdempotencyError");
        }
      }
      class L extends C {
        constructor(e = {}) {
          super(e, "StripeInvalidGrantError");
        }
      }
      class H extends C {
        constructor(e = {}) {
          super(e, "StripeUnknownError");
        }
      }
      class U extends C {
        constructor(e = {}) {
          super(e, "TemporarySessionExpiredError");
        }
      }
      var F = r(77680);
      let $ = [
        "apiKey",
        "idempotencyKey",
        "stripeAccount",
        "apiVersion",
        "maxNetworkRetries",
        "timeout",
        "host",
        "authenticator",
        "stripeContext",
        "additionalHeaders",
      ];
      function z(e) {
        return (
          e &&
          "object" == typeof e &&
          $.some((t) => Object.prototype.hasOwnProperty.call(e, t))
        );
      }
      function B(e, t) {
        return F.stringify(e, {
          serializeDate: (e) => Math.floor(e.getTime() / 1e3).toString(),
          arrayFormat: "v2" == t ? "repeat" : "indices",
        })
          .replace(/%5B/g, "[")
          .replace(/%5D/g, "]");
      }
      let K = (() => {
        let e = {
          "\n": "\\n",
          '"': '\\"',
          "\u2028": "\\u2028",
          "\u2029": "\\u2029",
        };
        return (t) => {
          let r = t.replace(/["\n\r\u2028\u2029]/g, (t) => e[t]);
          return (e) =>
            r.replace(/\{([\s\S]+?)\}/g, (t, r) =>
              encodeURIComponent(e[r] || ""),
            );
        };
      })();
      function W(e) {
        if (!Array.isArray(e) || !e[0] || "object" != typeof e[0]) return {};
        if (!z(e[0])) return e.shift();
        let t = Object.keys(e[0]),
          r = t.filter((e) => $.includes(e));
        return (
          r.length > 0 &&
            r.length !== t.length &&
            X(
              `Options found in arguments (${r.join(", ")}). Did you mean to pass an options object? See https://github.com/stripe/stripe-node/wiki/Passing-Options.`,
            ),
          {}
        );
      }
      function V(e) {
        let t = { host: null, headers: {}, settings: {} };
        if (e.length > 0) {
          let r = e[e.length - 1];
          if ("string" == typeof r) t.authenticator = Z(e.pop());
          else if (z(r)) {
            let r = Object.assign({}, e.pop()),
              o = Object.keys(r).filter((e) => !$.includes(e));
            if (
              (o.length &&
                X(`Invalid options found (${o.join(", ")}); ignoring.`),
              r.apiKey && (t.authenticator = Z(r.apiKey)),
              r.idempotencyKey &&
                (t.headers["Idempotency-Key"] = r.idempotencyKey),
              r.stripeAccount &&
                (t.headers["Stripe-Account"] = r.stripeAccount),
              r.stripeContext)
            ) {
              if (t.headers["Stripe-Account"])
                throw Error(
                  "Can't specify both stripeAccount and stripeContext.",
                );
              t.headers["Stripe-Context"] = r.stripeContext;
            }
            if (
              (r.apiVersion && (t.headers["Stripe-Version"] = r.apiVersion),
              Number.isInteger(r.maxNetworkRetries) &&
                (t.settings.maxNetworkRetries = r.maxNetworkRetries),
              Number.isInteger(r.timeout) && (t.settings.timeout = r.timeout),
              r.host && (t.host = r.host),
              r.authenticator)
            ) {
              if (r.apiKey)
                throw Error("Can't specify both apiKey and authenticator.");
              if ("function" != typeof r.authenticator)
                throw Error(
                  "The authenticator must be a function receiving a request as the first parameter.",
                );
              t.authenticator = r.authenticator;
            }
            r.additionalHeaders && (t.headers = r.additionalHeaders);
          }
        }
        return t;
      }
      function J(e) {
        if ("object" != typeof e) throw Error("Argument must be an object");
        return Object.keys(e).reduce(
          (t, r) => (null != e[r] && (t[r] = e[r]), t),
          {},
        );
      }
      function Q(e, t) {
        return t
          ? e.then(
              (e) => {
                setTimeout(() => {
                  t(null, e);
                }, 0);
              },
              (e) => {
                setTimeout(() => {
                  t(e, null);
                }, 0);
              },
            )
          : e;
      }
      function X(e) {
        return "function" != typeof process.emitWarning
          ? console.warn(`Stripe: ${e}`)
          : process.emitWarning(e, "Stripe");
      }
      function Y(e, t, r) {
        if (!Number.isInteger(t))
          if (void 0 !== r) return r;
          else throw Error(`${e} must be an integer`);
        return t;
      }
      function Z(e) {
        let t = (t) => (
          (t.headers.Authorization = "Bearer " + e), Promise.resolve()
        );
        return (t._apiKey = e), t;
      }
      function ee(e, t) {
        return this[e] instanceof Date
          ? Math.floor(this[e].getTime() / 1e3).toString()
          : t;
      }
      function et(e) {
        return e && e.startsWith("/v2") ? "v2" : "v1";
      }
      var er = r(79646);
      class eo extends C {}
      class en extends x {
        constructor() {
          super(), (this._exec = er.exec), (this._UNAME_CACHE = null);
        }
        uuid4() {
          return i.randomUUID ? i.randomUUID() : super.uuid4();
        }
        getUname() {
          return (
            this._UNAME_CACHE ||
              (this._UNAME_CACHE = new Promise((e, t) => {
                try {
                  this._exec("uname -a", (t, r) => {
                    if (t) return e(null);
                    e(r);
                  });
                } catch (t) {
                  e(null);
                }
              })),
            this._UNAME_CACHE
          );
        }
        secureCompare(e, t) {
          if (!e || !t) throw Error("secureCompare must receive two arguments");
          if (e.length !== t.length) return !1;
          if (i.timingSafeEqual) {
            let r = new TextEncoder(),
              o = r.encode(e),
              n = r.encode(t);
            return i.timingSafeEqual(o, n);
          }
          return super.secureCompare(e, t);
        }
        createEmitter() {
          return new a.EventEmitter();
        }
        tryBufferData(e) {
          if (!(e.file.data instanceof a.EventEmitter))
            return Promise.resolve(e);
          let t = [];
          return new Promise((r, o) => {
            e.file.data
              .on("data", (e) => {
                t.push(e);
              })
              .once("end", () => {
                let o = Object.assign({}, e);
                (o.file.data = (function (e) {
                  let t = new Uint8Array(e.reduce((e, t) => e + t.length, 0)),
                    r = 0;
                  return (
                    e.forEach((e) => {
                      t.set(e, r), (r += e.length);
                    }),
                    t
                  );
                })(t)),
                  r(o);
              })
              .on("error", (e) => {
                o(
                  new eo({
                    message:
                      "An error occurred while attempting to process the file for upload.",
                    detail: e,
                  }),
                );
              });
          });
        }
        createNodeHttpClient(e) {
          return new T(e);
        }
        createDefaultHttpClient() {
          return new T();
        }
        createNodeCryptoProvider() {
          return new u();
        }
        createDefaultCryptoProvider() {
          return this.createNodeCryptoProvider();
        }
      }
      class ei {
        constructor(e, t) {
          (this._stripe = e), (this._maxBufferedRequestMetric = t);
        }
        _addHeadersDirectlyToObject(e, t) {
          (e.requestId = t["request-id"]),
            (e.stripeAccount = e.stripeAccount || t["stripe-account"]),
            (e.apiVersion = e.apiVersion || t["stripe-version"]),
            (e.idempotencyKey = e.idempotencyKey || t["idempotency-key"]);
        }
        _makeResponseEvent(e, t, r) {
          let o = Date.now(),
            n = o - e.request_start_time;
          return J({
            api_version: r["stripe-version"],
            account: r["stripe-account"],
            idempotency_key: r["idempotency-key"],
            method: e.method,
            path: e.path,
            status: t,
            request_id: this._getRequestId(r),
            elapsed: n,
            request_start_time: e.request_start_time,
            request_end_time: o,
          });
        }
        _getRequestId(e) {
          return e["request-id"];
        }
        _streamingResponseHandler(e, t, r) {
          return (o) => {
            let n = o.getHeaders(),
              i = o.toStream(() => {
                let r = this._makeResponseEvent(e, o.getStatusCode(), n);
                this._stripe._emitter.emit("response", r),
                  this._recordRequestMetrics(
                    this._getRequestId(n),
                    r.elapsed,
                    t,
                  );
              });
            return this._addHeadersDirectlyToObject(i, n), r(null, i);
          };
        }
        _jsonResponseHandler(e, t, r, o) {
          return (n) => {
            let i = n.getHeaders(),
              a = this._getRequestId(i),
              s = n.getStatusCode(),
              l = this._makeResponseEvent(e, s, i);
            this._stripe._emitter.emit("response", l),
              n
                .toJSON()
                .then(
                  (e) => {
                    if (e.error) {
                      let r;
                      throw (
                        ("string" == typeof e.error &&
                          (e.error = {
                            type: e.error,
                            message: e.error_description,
                          }),
                        (e.error.headers = i),
                        (e.error.statusCode = s),
                        (e.error.requestId = a),
                        401 === s
                          ? new k(e.error)
                          : 403 === s
                            ? new D(e.error)
                            : 429 === s
                              ? new I(e.error)
                              : "v2" === t
                                ? A(e.error)
                                : w(e.error))
                      );
                    }
                    return e;
                  },
                  (e) => {
                    throw new j({
                      message: "Invalid JSON received from the Stripe API",
                      exception: e,
                      requestId: i["request-id"],
                    });
                  },
                )
                .then(
                  (e) => {
                    this._recordRequestMetrics(a, l.elapsed, r);
                    let t = n.getRawResponse();
                    this._addHeadersDirectlyToObject(t, i),
                      Object.defineProperty(e, "lastResponse", {
                        enumerable: !1,
                        writable: !1,
                        value: t,
                      }),
                      o(null, e);
                  },
                  (e) => o(e, null),
                );
          };
        }
        static _generateConnectionErrorMessage(e) {
          return `An error occurred with our connection to Stripe.${e > 0 ? ` Request was retried ${e} times.` : ""}`;
        }
        static _shouldRetry(e, t, r, o) {
          return (
            !!(
              o &&
              0 === t &&
              m.CONNECTION_CLOSED_ERROR_CODES.includes(o.code)
            ) ||
            (!(t >= r) &&
              (!e ||
                ("false" !== e.getHeaders()["stripe-should-retry"] &&
                  !!(
                    "true" === e.getHeaders()["stripe-should-retry"] ||
                    409 === e.getStatusCode() ||
                    e.getStatusCode() >= 500
                  ))))
          );
        }
        _getSleepTimeInMS(e, t = null) {
          let r = this._stripe.getInitialNetworkRetryDelay(),
            o = Math.min(
              r * Math.pow(2, e - 1),
              this._stripe.getMaxNetworkRetryDelay(),
            );
          return (
            (o *= 0.5 * (1 + Math.random())),
            (o = Math.max(r, o)),
            Number.isInteger(t) && t <= 60 && (o = Math.max(o, t)),
            1e3 * o
          );
        }
        _getMaxNetworkRetries(e = {}) {
          return void 0 !== e.maxNetworkRetries &&
            Number.isInteger(e.maxNetworkRetries)
            ? e.maxNetworkRetries
            : this._stripe.getMaxNetworkRetries();
        }
        _defaultIdempotencyKey(e, t, r) {
          let o = this._getMaxNetworkRetries(t),
            n = () =>
              `stripe-node-retry-${this._stripe._platformFunctions.uuid4()}`;
          if ("v2" === r) {
            if ("POST" === e || "DELETE" === e) return n();
          } else if ("v1" === r && "POST" === e && o > 0) return n();
          return null;
        }
        _makeHeaders({
          contentType: e,
          contentLength: t,
          apiVersion: r,
          clientUserAgent: o,
          method: n,
          userSuppliedHeaders: i,
          userSuppliedSettings: a,
          stripeAccount: s,
          stripeContext: l,
          apiMode: u,
        }) {
          let d = {
              Accept: "application/json",
              "Content-Type": e,
              "User-Agent": this._getUserAgentString(u),
              "X-Stripe-Client-User-Agent": o,
              "X-Stripe-Client-Telemetry": this._getTelemetryHeader(),
              "Stripe-Version": r,
              "Stripe-Account": s,
              "Stripe-Context": l,
              "Idempotency-Key": this._defaultIdempotencyKey(n, a, u),
            },
            c = "POST" == n || "PUT" == n || "PATCH" == n;
          return (
            (c || t) &&
              (c ||
                X(
                  `${n} method had non-zero contentLength but no payload is expected for this verb`,
                ),
              (d["Content-Length"] = t)),
            Object.assign(
              J(d),
              i && "object" == typeof i
                ? Object.keys(i).reduce(
                    (e, t) => (
                      (e[
                        t
                          .split("-")
                          .map(
                            (e) =>
                              e.charAt(0).toUpperCase() +
                              e.substr(1).toLowerCase(),
                          )
                          .join("-")
                      ] = i[t]),
                      e
                    ),
                    {},
                  )
                : i,
            )
          );
        }
        _getUserAgentString(e) {
          let t = this._stripe.getConstant("PACKAGE_VERSION"),
            r = this._stripe._appInfo ? this._stripe.getAppInfoAsString() : "";
          return `Stripe/${e} NodeBindings/${t} ${r}`.trim();
        }
        _getTelemetryHeader() {
          if (
            this._stripe.getTelemetryEnabled() &&
            this._stripe._prevRequestMetrics.length > 0
          )
            return JSON.stringify({
              last_request_metrics: this._stripe._prevRequestMetrics.shift(),
            });
        }
        _recordRequestMetrics(e, t, r) {
          if (this._stripe.getTelemetryEnabled() && e)
            if (
              this._stripe._prevRequestMetrics.length >
              this._maxBufferedRequestMetric
            )
              X("Request metrics buffer is full, dropping telemetry message.");
            else {
              let o = { request_id: e, request_duration_ms: t };
              r && r.length > 0 && (o.usage = r),
                this._stripe._prevRequestMetrics.push(o);
            }
        }
        _rawRequest(e, t, r, o) {
          return new Promise((n, i) => {
            let a;
            try {
              let n = e.toUpperCase();
              if ("POST" !== n && r && 0 !== Object.keys(r).length)
                throw Error(
                  "rawRequest only supports params on POST requests. Please pass null and add your parameters to path.",
                );
              let i = [].slice.call([r, o]),
                s = W(i),
                l = Object.assign({}, s),
                u = V(i),
                d = u.headers,
                c = u.authenticator;
              a = {
                requestMethod: n,
                requestPath: t,
                bodyData: l,
                queryData: {},
                authenticator: c,
                headers: d,
                host: null,
                streaming: !1,
                settings: {},
                usage: ["raw_request"],
              };
            } catch (e) {
              i(e);
              return;
            }
            let { headers: s, settings: l } = a,
              u = a.authenticator;
            this._request(
              a.requestMethod,
              a.host,
              t,
              a.bodyData,
              u,
              { headers: s, settings: l, streaming: a.streaming },
              a.usage,
              function (e, t) {
                e ? i(e) : n(t);
              },
            );
          });
        }
        _request(e, t, r, o, n, i, a = [], s, l = null) {
          var u;
          let d;
          n =
            null != (u = null != n ? n : this._stripe._authenticator)
              ? u
              : null;
          let c = et(r),
            h = (e, t, r, o, n) =>
              setTimeout(e, this._getSleepTimeInMS(o, n), t, r, o + 1),
            p = (o, l, u) => {
              let f =
                  i.settings &&
                  i.settings.timeout &&
                  Number.isInteger(i.settings.timeout) &&
                  i.settings.timeout >= 0
                    ? i.settings.timeout
                    : this._stripe.getApiField("timeout"),
                v = {
                  host: t || this._stripe.getApiField("host"),
                  port: this._stripe.getApiField("port"),
                  path: r,
                  method: e,
                  headers: Object.assign({}, l),
                  body: d,
                  protocol: this._stripe.getApiField("protocol"),
                };
              n(v)
                .then(() => {
                  let t = this._stripe
                      .getApiField("httpClient")
                      .makeRequest(
                        v.host,
                        v.port,
                        v.path,
                        v.method,
                        v.headers,
                        v.body,
                        v.protocol,
                        f,
                      ),
                    n = Date.now(),
                    d = J({
                      api_version: o,
                      account: l["Stripe-Account"],
                      idempotency_key: l["Idempotency-Key"],
                      method: e,
                      path: r,
                      request_start_time: n,
                    }),
                    y = u || 0,
                    P = this._getMaxNetworkRetries(i.settings || {});
                  this._stripe._emitter.emit("request", d),
                    t
                      .then((e) =>
                        ei._shouldRetry(e, y, P)
                          ? h(p, o, l, y, e.getHeaders()["retry-after"])
                          : i.streaming && 400 > e.getStatusCode()
                            ? this._streamingResponseHandler(d, a, s)(e)
                            : this._jsonResponseHandler(d, c, a, s)(e),
                      )
                      .catch((e) =>
                        ei._shouldRetry(null, y, P, e)
                          ? h(p, o, l, y, null)
                          : s(
                              new N({
                                message:
                                  e.code && e.code === m.TIMEOUT_ERROR_CODE
                                    ? `Request aborted due to timeout being reached (${f}ms)`
                                    : ei._generateConnectionErrorMessage(y),
                                detail: e,
                              }),
                            ),
                      );
                })
                .catch((e) => {
                  throw new C({
                    message: "Unable to authenticate the request",
                    exception: e,
                  });
                });
            },
            f = (t, r) => {
              if (t) return s(t);
              (d = r),
                this._stripe.getClientUserAgent((t) => {
                  let r = this._stripe.getApiField("version"),
                    o = this._makeHeaders({
                      contentType:
                        "v2" == c
                          ? "application/json"
                          : "application/x-www-form-urlencoded",
                      contentLength: d.length,
                      apiVersion: r,
                      clientUserAgent: t,
                      method: e,
                      userSuppliedHeaders: i.headers,
                      userSuppliedSettings: i.settings,
                      stripeAccount:
                        "v2" == c
                          ? null
                          : this._stripe.getApiField("stripeAccount"),
                      stripeContext:
                        "v2" == c
                          ? this._stripe.getApiField("stripeContext")
                          : null,
                      apiMode: c,
                    });
                  p(r, o, 0);
                });
            };
          if (l) l(e, o, i.headers, f);
          else {
            let e;
            f(
              null,
              (e =
                "v2" == c ? (o ? JSON.stringify(o, ee) : "") : B(o || {}, c)),
            );
          }
        }
      }
      class ea {
        constructor(e, t, r, o) {
          (this.index = 0),
            (this.pagePromise = e),
            (this.promiseCache = { currentPromise: null }),
            (this.requestArgs = t),
            (this.spec = r),
            (this.stripeResource = o);
        }
        async iterate(e) {
          if (!(e && e.data && "number" == typeof e.data.length))
            throw Error(
              "Unexpected: Stripe API response does not have a well-formed `data` array.",
            );
          let t = eh(this.requestArgs);
          if (this.index < e.data.length) {
            let r = t ? e.data.length - 1 - this.index : this.index,
              o = e.data[r];
            return (this.index += 1), { value: o, done: !1 };
          }
          if (e.has_more) {
            (this.index = 0), (this.pagePromise = this.getNextPage(e));
            let t = await this.pagePromise;
            return this.iterate(t);
          }
          return { done: !0, value: void 0 };
        }
        getNextPage(e) {
          throw Error("Unimplemented");
        }
        async _next() {
          return this.iterate(await this.pagePromise);
        }
        next() {
          if (this.promiseCache.currentPromise)
            return this.promiseCache.currentPromise;
          let e = (async () => {
            let e = await this._next();
            return (this.promiseCache.currentPromise = null), e;
          })();
          return (this.promiseCache.currentPromise = e), e;
        }
      }
      class es extends ea {
        getNextPage(e) {
          let t = eh(this.requestArgs),
            r = (function (e, t) {
              let r = t ? 0 : e.data.length - 1,
                o = e.data[r],
                n = o && o.id;
              if (!n)
                throw Error(
                  "Unexpected: No `id` found on the last item while auto-paging a list.",
                );
              return n;
            })(e, t);
          return this.stripeResource._makeRequest(this.requestArgs, this.spec, {
            [t ? "ending_before" : "starting_after"]: r,
          });
        }
      }
      class el extends ea {
        getNextPage(e) {
          if (!e.next_page)
            throw Error(
              "Unexpected: Stripe API response does not have a well-formed `next_page` field, but `has_more` was true.",
            );
          return this.stripeResource._makeRequest(this.requestArgs, this.spec, {
            page: e.next_page,
          });
        }
      }
      class eu {
        constructor(e, t, r, o) {
          (this.currentPageIterator = (async () =>
            (await e).data[Symbol.iterator]())()),
            (this.nextPageUrl = (async () =>
              (await e).next_page_url || null)()),
            (this.requestArgs = t),
            (this.spec = r),
            (this.stripeResource = o);
        }
        async turnPage() {
          let e = await this.nextPageUrl;
          if (!e) return null;
          this.spec.fullPath = e;
          let t = await this.stripeResource._makeRequest([], this.spec, {});
          return (
            (this.nextPageUrl = Promise.resolve(t.next_page_url)),
            (this.currentPageIterator = Promise.resolve(
              t.data[Symbol.iterator](),
            )),
            this.currentPageIterator
          );
        }
        async next() {
          {
            let e = (await this.currentPageIterator).next();
            if (!e.done) return { done: !1, value: e.value };
          }
          let e = await this.turnPage();
          if (!e) return { done: !0, value: void 0 };
          let t = e.next();
          return t.done
            ? { done: !0, value: void 0 }
            : { done: !1, value: t.value };
        }
      }
      let ed = (e, t, r, o) => {
          let n = et(r.fullPath || r.path);
          return "v2" !== n && "search" === r.methodType
            ? ec(new el(o, t, r, e))
            : "v2" !== n && "list" === r.methodType
              ? ec(new es(o, t, r, e))
              : "v2" === n && "list" === r.methodType
                ? ec(new eu(o, t, r, e))
                : null;
        },
        ec = (e) => {
          var t, r;
          let o =
              ((t = (...t) => e.next(...t)),
              function () {
                var e, r;
                let o = [].slice.call(arguments),
                  n = (function (e) {
                    if (0 === e.length) return;
                    let t = e[0];
                    if ("function" != typeof t)
                      throw Error(
                        `The first argument to autoPagingEach, if present, must be a callback function; received ${typeof t}`,
                      );
                    if (2 === t.length) return t;
                    if (t.length > 2)
                      throw Error(
                        `The \`onItem\` callback function passed to autoPagingEach must accept at most two arguments; got ${t}`,
                      );
                    return function (e, r) {
                      r(t(e));
                    };
                  })(o),
                  i = (function (e) {
                    if (e.length < 2) return null;
                    let t = e[1];
                    if ("function" != typeof t)
                      throw Error(
                        `The second argument to autoPagingEach, if present, must be a callback function; received ${typeof t}`,
                      );
                    return t;
                  })(o);
                if (o.length > 2)
                  throw Error(
                    `autoPagingEach takes up to two arguments; received ${o}`,
                  );
                return Q(
                  ((e = t),
                  (r = n),
                  new Promise((t, o) => {
                    e()
                      .then(function o(n) {
                        if (n.done) return void t();
                        let i = n.value;
                        return new Promise((e) => {
                          r(i, e);
                        }).then((t) =>
                          !1 === t
                            ? o({ done: !0, value: void 0 })
                            : e().then(o),
                        );
                      })
                      .catch(o);
                  })),
                  i,
                );
              }),
            n =
              ((r = o),
              function (e, t) {
                let o = e && e.limit;
                if (!o)
                  throw Error(
                    "You must pass a `limit` option to autoPagingToArray, e.g., `autoPagingToArray({limit: 1000});`.",
                  );
                if (o > 1e4)
                  throw Error(
                    "You cannot specify a limit of more than 10,000 items to fetch in `autoPagingToArray`; use `autoPagingEach` to iterate through longer lists.",
                  );
                return Q(
                  new Promise((e, t) => {
                    let n = [];
                    r((e) => {
                      if ((n.push(e), n.length >= o)) return !1;
                    })
                      .then(() => {
                        e(n);
                      })
                      .catch(t);
                  }),
                  t,
                );
              }),
            i = {
              autoPagingEach: o,
              autoPagingToArray: n,
              next: () => e.next(),
              return: () => ({}),
              ["undefined" != typeof Symbol && Symbol.asyncIterator
                ? Symbol.asyncIterator
                : "@@asyncIterator"]: () => i,
            };
          return i;
        };
      function eh(e) {
        return !!W([].slice.call(e)).ending_before;
      }
      function ep(e, t) {
        if (((this._stripe = e), t))
          throw Error(
            "Support for curried url params was dropped in stripe-node v7.0.0. Instead, pass two ids.",
          );
        (this.basePath = K(this.basePath || e.getApiField("basePath"))),
          (this.resourcePath = this.path),
          (this.path = K(this.path)),
          this.initialize(...arguments);
      }
      function em(e) {
        let t = {
            DEFAULT_TOLERANCE: 300,
            signature: null,
            constructEvent(e, r, o, n, i, a) {
              try {
                this.signature.verifyHeader(
                  e,
                  r,
                  o,
                  n || t.DEFAULT_TOLERANCE,
                  i,
                  a,
                );
              } catch (e) {
                throw (
                  (e instanceof l &&
                    (e.message +=
                      "\nUse `await constructEventAsync(...)` instead of `constructEvent(...)`"),
                  e)
                );
              }
              return e instanceof Uint8Array
                ? JSON.parse(new TextDecoder("utf8").decode(e))
                : JSON.parse(e);
            },
            async constructEventAsync(e, r, o, n, i, a) {
              return (
                await this.signature.verifyHeaderAsync(
                  e,
                  r,
                  o,
                  n || t.DEFAULT_TOLERANCE,
                  i,
                  a,
                ),
                e instanceof Uint8Array
                  ? JSON.parse(new TextDecoder("utf8").decode(e))
                  : JSON.parse(e)
              );
            },
            generateTestHeaderString: function (e) {
              let t = u(e),
                r =
                  t.signature ||
                  t.cryptoProvider.computeHMACSignature(
                    t.payloadString,
                    t.secret,
                  );
              return t.generateHeaderString(r);
            },
            generateTestHeaderStringAsync: async function (e) {
              let t = u(e),
                r =
                  t.signature ||
                  (await t.cryptoProvider.computeHMACSignatureAsync(
                    t.payloadString,
                    t.secret,
                  ));
              return t.generateHeaderString(r);
            },
          },
          r = {
            EXPECTED_SCHEME: "v1",
            verifyHeader(e, t, r, a, l, u) {
              let {
                  decodedHeader: d,
                  decodedPayload: c,
                  details: h,
                  suspectPayloadType: p,
                } = n(e, t, this.EXPECTED_SCHEME),
                m = /\s/.test(r),
                f = (l = l || s()).computeHMACSignature(o(c, h), r);
              return i(c, d, h, f, a, p, m, u), !0;
            },
            async verifyHeaderAsync(e, t, r, a, l, u) {
              let {
                  decodedHeader: d,
                  decodedPayload: c,
                  details: h,
                  suspectPayloadType: p,
                } = n(e, t, this.EXPECTED_SCHEME),
                m = /\s/.test(r);
              l = l || s();
              let f = await l.computeHMACSignatureAsync(o(c, h), r);
              return i(c, d, h, f, a, p, m, u);
            },
          };
        function o(e, t) {
          return `${t.timestamp}.${e}`;
        }
        function n(e, t, r) {
          var o, n;
          if (!e)
            throw new q(t, e, { message: "No webhook payload was provided." });
          let i = "string" != typeof e && !(e instanceof Uint8Array),
            a = new TextDecoder("utf8"),
            s = e instanceof Uint8Array ? a.decode(e) : e;
          if (Array.isArray(t))
            throw Error(
              "Unexpected: An array was passed as a header, which should not be possible for the stripe-signature header.",
            );
          if (null == t || "" == t)
            throw new q(t, e, {
              message: "No stripe-signature header value was provided.",
            });
          let l = t instanceof Uint8Array ? a.decode(t) : t,
            u =
              ((o = l),
              (n = r),
              "string" != typeof o
                ? null
                : o.split(",").reduce(
                    (e, t) => {
                      let r = t.split("=");
                      return (
                        "t" === r[0] && (e.timestamp = parseInt(r[1], 10)),
                        r[0] === n && e.signatures.push(r[1]),
                        e
                      );
                    },
                    { timestamp: -1, signatures: [] },
                  ));
          if (!u || -1 === u.timestamp)
            throw new q(l, s, {
              message: "Unable to extract timestamp and signatures from header",
            });
          if (!u.signatures.length)
            throw new q(l, s, {
              message: "No signatures found with expected scheme",
            });
          return {
            decodedPayload: s,
            decodedHeader: l,
            details: u,
            suspectPayloadType: i,
          };
        }
        function i(t, r, o, n, i, a, s, l) {
          let u = !!o.signatures.filter(e.secureCompare.bind(e, n)).length,
            d =
              "\nLearn more about webhook signing and explore webhook integration examples for various frameworks at https://docs.stripe.com/webhooks/signature",
            c = s
              ? "\n\nNote: The provided signing secret contains whitespace. This often indicates an extra newline or space is in the value"
              : "";
          if (!u) {
            if (a)
              throw new q(r, t, {
                message:
                  "Webhook payload must be provided as a string or a Buffer (https://nodejs.org/api/buffer.html) instance representing the _raw_ request body.Payload was provided as a parsed JavaScript object instead. \nSignature verification is impossible without access to the original signed material. \n" +
                  d +
                  "\n" +
                  c,
              });
            throw new q(r, t, {
              message:
                "No signatures found matching the expected signature for payload. Are you passing the raw request body you received from Stripe? \n If a webhook request is being forwarded by a third-party tool, ensure that the exact request body, including JSON formatting and new line style, is preserved.\n" +
                d +
                "\n" +
                c,
            });
          }
          let h =
            Math.floor(("number" == typeof l ? l : Date.now()) / 1e3) -
            o.timestamp;
          if (i > 0 && h > i)
            throw new q(r, t, {
              message: "Timestamp outside the tolerance zone",
            });
          return !0;
        }
        let a = null;
        function s() {
          return a || (a = e.createDefaultCryptoProvider()), a;
        }
        function u(e) {
          if (!e) throw new C({ message: "Options are required" });
          let t = Math.floor(e.timestamp) || Math.floor(Date.now() / 1e3),
            o = e.scheme || r.EXPECTED_SCHEME,
            n = e.cryptoProvider || s(),
            i = `${t}.${e.payload}`;
          return Object.assign(Object.assign({}, e), {
            timestamp: t,
            scheme: o,
            cryptoProvider: n,
            payloadString: i,
            generateHeaderString: (e) => `t=${t},${o}=${e}`,
          });
        }
        return (t.signature = r), t;
      }
      function ef(e, t) {
        for (let r in t) {
          if (!Object.prototype.hasOwnProperty.call(t, r)) continue;
          let o = r[0].toLowerCase() + r.substring(1),
            n = new t[r](e);
          this[o] = n;
        }
      }
      function ev(e, t) {
        return function (e) {
          return new ef(e, t);
        };
      }
      (ep.extend = function (e) {
        let t = this,
          r = Object.prototype.hasOwnProperty.call(e, "constructor")
            ? e.constructor
            : function (...e) {
                t.apply(this, e);
              };
        return (
          Object.assign(r, t),
          (r.prototype = Object.create(t.prototype)),
          Object.assign(r.prototype, e),
          r
        );
      }),
        (ep.method = function (e) {
          if (void 0 !== e.path && void 0 !== e.fullPath)
            throw Error(
              `Method spec specified both a 'path' (${e.path}) and a 'fullPath' (${e.fullPath}).`,
            );
          return function (...t) {
            let r = "function" == typeof t[t.length - 1] && t.pop();
            e.urlParams = (function (e) {
              let t = e.match(/\{\w+\}/g);
              return t ? t.map((e) => e.replace(/[{}]/g, "")) : [];
            })(e.fullPath || this.createResourcePathWithSymbols(e.path || ""));
            let o = Q(this._makeRequest(t, e, {}), r);
            return Object.assign(o, ed(this, t, e, o)), o;
          };
        }),
        (ep.MAX_BUFFERED_REQUEST_METRICS = 100),
        (ep.prototype = {
          _stripe: null,
          path: "",
          resourcePath: "",
          basePath: null,
          initialize() {},
          requestDataProcessor: null,
          validateRequest: null,
          createFullPath(e, t) {
            let r = [this.basePath(t), this.path(t)];
            if ("function" == typeof e) {
              let o = e(t);
              o && r.push(o);
            } else r.push(e);
            return this._joinUrlParts(r);
          },
          createResourcePathWithSymbols(e) {
            return e
              ? `/${this._joinUrlParts([this.resourcePath, e])}`
              : `/${this.resourcePath}`;
          },
          _joinUrlParts: (e) => e.join("/").replace(/\/{2,}/g, "/"),
          _getRequestOpts(e, t, r) {
            var o;
            let n = (t.method || "GET").toUpperCase(),
              i = t.usage || [],
              a = t.urlParams || [],
              s = t.encode || ((e) => e),
              l = !!t.fullPath,
              u = K(l ? t.fullPath : t.path || ""),
              d = l ? t.fullPath : this.createResourcePathWithSymbols(t.path),
              c = [].slice.call(e),
              h = a.reduce((e, t) => {
                let r = c.shift();
                if ("string" != typeof r)
                  throw Error(
                    `Stripe: Argument "${t}" must be a string, but got: ${r} (on API request to \`${n} ${d}\`)`,
                  );
                return (e[t] = r), e;
              }, {}),
              p = s(Object.assign({}, W(c), r)),
              m = V(c),
              f = m.host || t.host,
              v = !!t.streaming;
            if (c.filter((e) => null != e).length)
              throw Error(
                `Stripe: Unknown arguments (${c}). Did you mean to pass an options object? See https://github.com/stripe/stripe-node/wiki/Passing-Options. (on API request to ${n} \`${d}\`)`,
              );
            let y = l ? u(h) : this.createFullPath(u, h),
              P = Object.assign(m.headers, t.headers);
            t.validator && t.validator(p, { headers: P });
            let g = "GET" === t.method || "DELETE" === t.method;
            return {
              requestMethod: n,
              requestPath: y,
              bodyData: g ? null : p,
              queryData: g ? p : {},
              authenticator: null != (o = m.authenticator) ? o : null,
              headers: P,
              host: null != f ? f : null,
              streaming: v,
              settings: m.settings,
              usage: i,
            };
          },
          _makeRequest(e, t, r) {
            return new Promise((o, n) => {
              var i;
              let a;
              try {
                a = this._getRequestOpts(e, t, r);
              } catch (e) {
                n(e);
                return;
              }
              let s = 0 === Object.keys(a.queryData).length,
                l = [
                  a.requestPath,
                  s ? "" : "?",
                  B(a.queryData, et(a.requestPath)),
                ].join(""),
                { headers: u, settings: d } = a;
              this._stripe._requestSender._request(
                a.requestMethod,
                a.host,
                l,
                a.bodyData,
                a.authenticator,
                { headers: u, settings: d, streaming: a.streaming },
                a.usage,
                function (e, r) {
                  e
                    ? n(e)
                    : o(
                        t.transformResponseData
                          ? t.transformResponseData(r)
                          : r,
                      );
                },
                null == (i = this.requestDataProcessor) ? void 0 : i.bind(this),
              );
            });
          },
        });
      let ey = ep.method,
        eP = ep.extend({
          retrieve: ey({
            method: "GET",
            fullPath: "/v1/financial_connections/accounts/{account}",
          }),
          list: ey({
            method: "GET",
            fullPath: "/v1/financial_connections/accounts",
            methodType: "list",
          }),
          disconnect: ey({
            method: "POST",
            fullPath: "/v1/financial_connections/accounts/{account}/disconnect",
          }),
          listOwners: ey({
            method: "GET",
            fullPath: "/v1/financial_connections/accounts/{account}/owners",
            methodType: "list",
          }),
          refresh: ey({
            method: "POST",
            fullPath: "/v1/financial_connections/accounts/{account}/refresh",
          }),
          subscribe: ey({
            method: "POST",
            fullPath: "/v1/financial_connections/accounts/{account}/subscribe",
          }),
          unsubscribe: ey({
            method: "POST",
            fullPath:
              "/v1/financial_connections/accounts/{account}/unsubscribe",
          }),
        }),
        eg = ep.method,
        eT = ep.extend({
          retrieve: eg({
            method: "GET",
            fullPath: "/v1/entitlements/active_entitlements/{id}",
          }),
          list: eg({
            method: "GET",
            fullPath: "/v1/entitlements/active_entitlements",
            methodType: "list",
          }),
        }),
        e_ = ep.method,
        eE = ep.extend({
          create: e_({ method: "POST", fullPath: "/v1/billing/alerts" }),
          retrieve: e_({ method: "GET", fullPath: "/v1/billing/alerts/{id}" }),
          list: e_({
            method: "GET",
            fullPath: "/v1/billing/alerts",
            methodType: "list",
          }),
          activate: e_({
            method: "POST",
            fullPath: "/v1/billing/alerts/{id}/activate",
          }),
          archive: e_({
            method: "POST",
            fullPath: "/v1/billing/alerts/{id}/archive",
          }),
          deactivate: e_({
            method: "POST",
            fullPath: "/v1/billing/alerts/{id}/deactivate",
          }),
        }),
        eb = ep.method,
        eS = ep.extend({
          create: eb({
            method: "POST",
            fullPath: "/v1/test_helpers/issuing/authorizations",
          }),
          capture: eb({
            method: "POST",
            fullPath:
              "/v1/test_helpers/issuing/authorizations/{authorization}/capture",
          }),
          expire: eb({
            method: "POST",
            fullPath:
              "/v1/test_helpers/issuing/authorizations/{authorization}/expire",
          }),
          finalizeAmount: eb({
            method: "POST",
            fullPath:
              "/v1/test_helpers/issuing/authorizations/{authorization}/finalize_amount",
          }),
          increment: eb({
            method: "POST",
            fullPath:
              "/v1/test_helpers/issuing/authorizations/{authorization}/increment",
          }),
          respond: eb({
            method: "POST",
            fullPath:
              "/v1/test_helpers/issuing/authorizations/{authorization}/fraud_challenges/respond",
          }),
          reverse: eb({
            method: "POST",
            fullPath:
              "/v1/test_helpers/issuing/authorizations/{authorization}/reverse",
          }),
        }),
        eO = ep.method,
        ex = ep.extend({
          retrieve: eO({
            method: "GET",
            fullPath: "/v1/issuing/authorizations/{authorization}",
          }),
          update: eO({
            method: "POST",
            fullPath: "/v1/issuing/authorizations/{authorization}",
          }),
          list: eO({
            method: "GET",
            fullPath: "/v1/issuing/authorizations",
            methodType: "list",
          }),
          approve: eO({
            method: "POST",
            fullPath: "/v1/issuing/authorizations/{authorization}/approve",
          }),
          decline: eO({
            method: "POST",
            fullPath: "/v1/issuing/authorizations/{authorization}/decline",
          }),
        }),
        ew = ep.method,
        eA = ep.extend({
          create: ew({ method: "POST", fullPath: "/v1/tax/calculations" }),
          retrieve: ew({
            method: "GET",
            fullPath: "/v1/tax/calculations/{calculation}",
          }),
          listLineItems: ew({
            method: "GET",
            fullPath: "/v1/tax/calculations/{calculation}/line_items",
            methodType: "list",
          }),
        }),
        eC = ep.method,
        eG = ep.extend({
          create: eC({ method: "POST", fullPath: "/v1/issuing/cardholders" }),
          retrieve: eC({
            method: "GET",
            fullPath: "/v1/issuing/cardholders/{cardholder}",
          }),
          update: eC({
            method: "POST",
            fullPath: "/v1/issuing/cardholders/{cardholder}",
          }),
          list: eC({
            method: "GET",
            fullPath: "/v1/issuing/cardholders",
            methodType: "list",
          }),
        }),
        eR = ep.method,
        ej = ep.extend({
          deliverCard: eR({
            method: "POST",
            fullPath: "/v1/test_helpers/issuing/cards/{card}/shipping/deliver",
          }),
          failCard: eR({
            method: "POST",
            fullPath: "/v1/test_helpers/issuing/cards/{card}/shipping/fail",
          }),
          returnCard: eR({
            method: "POST",
            fullPath: "/v1/test_helpers/issuing/cards/{card}/shipping/return",
          }),
          shipCard: eR({
            method: "POST",
            fullPath: "/v1/test_helpers/issuing/cards/{card}/shipping/ship",
          }),
          submitCard: eR({
            method: "POST",
            fullPath: "/v1/test_helpers/issuing/cards/{card}/shipping/submit",
          }),
        }),
        ek = ep.method,
        eD = ep.extend({
          create: ek({ method: "POST", fullPath: "/v1/issuing/cards" }),
          retrieve: ek({ method: "GET", fullPath: "/v1/issuing/cards/{card}" }),
          update: ek({ method: "POST", fullPath: "/v1/issuing/cards/{card}" }),
          list: ek({
            method: "GET",
            fullPath: "/v1/issuing/cards",
            methodType: "list",
          }),
        }),
        eI = ep.method,
        eN = ep.extend({
          create: eI({
            method: "POST",
            fullPath: "/v1/billing_portal/configurations",
          }),
          retrieve: eI({
            method: "GET",
            fullPath: "/v1/billing_portal/configurations/{configuration}",
          }),
          update: eI({
            method: "POST",
            fullPath: "/v1/billing_portal/configurations/{configuration}",
          }),
          list: eI({
            method: "GET",
            fullPath: "/v1/billing_portal/configurations",
            methodType: "list",
          }),
        }),
        eq = ep.method,
        eM = ep.extend({
          create: eq({
            method: "POST",
            fullPath: "/v1/terminal/configurations",
          }),
          retrieve: eq({
            method: "GET",
            fullPath: "/v1/terminal/configurations/{configuration}",
          }),
          update: eq({
            method: "POST",
            fullPath: "/v1/terminal/configurations/{configuration}",
          }),
          list: eq({
            method: "GET",
            fullPath: "/v1/terminal/configurations",
            methodType: "list",
          }),
          del: eq({
            method: "DELETE",
            fullPath: "/v1/terminal/configurations/{configuration}",
          }),
        }),
        eL = ep.method,
        eH = ep.extend({
          create: eL({
            method: "POST",
            fullPath: "/v1/test_helpers/confirmation_tokens",
          }),
        }),
        eU = ep.method,
        eF = ep.extend({
          create: eU({
            method: "POST",
            fullPath: "/v1/terminal/connection_tokens",
          }),
        }),
        e$ = ep.method,
        ez = ep.extend({
          retrieve: e$({
            method: "GET",
            fullPath: "/v1/billing/credit_balance_summary",
          }),
        }),
        eB = ep.method,
        eK = ep.extend({
          retrieve: eB({
            method: "GET",
            fullPath: "/v1/billing/credit_balance_transactions/{id}",
          }),
          list: eB({
            method: "GET",
            fullPath: "/v1/billing/credit_balance_transactions",
            methodType: "list",
          }),
        }),
        eW = ep.method,
        eV = ep.extend({
          create: eW({ method: "POST", fullPath: "/v1/billing/credit_grants" }),
          retrieve: eW({
            method: "GET",
            fullPath: "/v1/billing/credit_grants/{id}",
          }),
          update: eW({
            method: "POST",
            fullPath: "/v1/billing/credit_grants/{id}",
          }),
          list: eW({
            method: "GET",
            fullPath: "/v1/billing/credit_grants",
            methodType: "list",
          }),
          expire: eW({
            method: "POST",
            fullPath: "/v1/billing/credit_grants/{id}/expire",
          }),
          voidGrant: eW({
            method: "POST",
            fullPath: "/v1/billing/credit_grants/{id}/void",
          }),
        }),
        eJ = ep.method,
        eQ = ep.extend({
          create: eJ({
            method: "POST",
            fullPath: "/v1/treasury/credit_reversals",
          }),
          retrieve: eJ({
            method: "GET",
            fullPath: "/v1/treasury/credit_reversals/{credit_reversal}",
          }),
          list: eJ({
            method: "GET",
            fullPath: "/v1/treasury/credit_reversals",
            methodType: "list",
          }),
        }),
        eX = ep.method,
        eY = ep.extend({
          fundCashBalance: eX({
            method: "POST",
            fullPath: "/v1/test_helpers/customers/{customer}/fund_cash_balance",
          }),
        }),
        eZ = ep.method,
        e1 = ep.extend({
          create: eZ({
            method: "POST",
            fullPath: "/v1/treasury/debit_reversals",
          }),
          retrieve: eZ({
            method: "GET",
            fullPath: "/v1/treasury/debit_reversals/{debit_reversal}",
          }),
          list: eZ({
            method: "GET",
            fullPath: "/v1/treasury/debit_reversals",
            methodType: "list",
          }),
        }),
        e0 = ep.method,
        e2 = ep.extend({
          create: e0({ method: "POST", fullPath: "/v1/issuing/disputes" }),
          retrieve: e0({
            method: "GET",
            fullPath: "/v1/issuing/disputes/{dispute}",
          }),
          update: e0({
            method: "POST",
            fullPath: "/v1/issuing/disputes/{dispute}",
          }),
          list: e0({
            method: "GET",
            fullPath: "/v1/issuing/disputes",
            methodType: "list",
          }),
          submit: e0({
            method: "POST",
            fullPath: "/v1/issuing/disputes/{dispute}/submit",
          }),
        }),
        e8 = ep.method,
        e5 = ep.extend({
          retrieve: e8({
            method: "GET",
            fullPath: "/v1/radar/early_fraud_warnings/{early_fraud_warning}",
          }),
          list: e8({
            method: "GET",
            fullPath: "/v1/radar/early_fraud_warnings",
            methodType: "list",
          }),
        }),
        e3 = ep.method,
        e6 = ep.extend({
          create: e3({
            method: "POST",
            fullPath: "/v2/core/event_destinations",
          }),
          retrieve: e3({
            method: "GET",
            fullPath: "/v2/core/event_destinations/{id}",
          }),
          update: e3({
            method: "POST",
            fullPath: "/v2/core/event_destinations/{id}",
          }),
          list: e3({
            method: "GET",
            fullPath: "/v2/core/event_destinations",
            methodType: "list",
          }),
          del: e3({
            method: "DELETE",
            fullPath: "/v2/core/event_destinations/{id}",
          }),
          disable: e3({
            method: "POST",
            fullPath: "/v2/core/event_destinations/{id}/disable",
          }),
          enable: e3({
            method: "POST",
            fullPath: "/v2/core/event_destinations/{id}/enable",
          }),
          ping: e3({
            method: "POST",
            fullPath: "/v2/core/event_destinations/{id}/ping",
          }),
        }),
        e9 = ep.method,
        e4 = ep.extend({
          retrieve(...e) {
            return e9({
              method: "GET",
              fullPath: "/v2/core/events/{id}",
              transformResponseData: (e) =>
                this.addFetchRelatedObjectIfNeeded(e),
            }).apply(this, e);
          },
          list(...e) {
            return e9({
              method: "GET",
              fullPath: "/v2/core/events",
              methodType: "list",
              transformResponseData: (e) =>
                Object.assign(Object.assign({}, e), {
                  data: e.data.map(
                    this.addFetchRelatedObjectIfNeeded.bind(this),
                  ),
                }),
            }).apply(this, e);
          },
          addFetchRelatedObjectIfNeeded(e) {
            return e.related_object && e.related_object.url
              ? Object.assign(Object.assign({}, e), {
                  fetchRelatedObject: () =>
                    e9({ method: "GET", fullPath: e.related_object.url }).apply(
                      this,
                      [{ stripeAccount: e.context }],
                    ),
                })
              : e;
          },
        }),
        e7 = ep.method,
        te = ep.extend({
          create: e7({ method: "POST", fullPath: "/v1/entitlements/features" }),
          retrieve: e7({
            method: "GET",
            fullPath: "/v1/entitlements/features/{id}",
          }),
          update: e7({
            method: "POST",
            fullPath: "/v1/entitlements/features/{id}",
          }),
          list: e7({
            method: "GET",
            fullPath: "/v1/entitlements/features",
            methodType: "list",
          }),
        }),
        tt = ep.method,
        tr = ep.extend({
          create: tt({
            method: "POST",
            fullPath: "/v1/treasury/financial_accounts",
          }),
          retrieve: tt({
            method: "GET",
            fullPath: "/v1/treasury/financial_accounts/{financial_account}",
          }),
          update: tt({
            method: "POST",
            fullPath: "/v1/treasury/financial_accounts/{financial_account}",
          }),
          list: tt({
            method: "GET",
            fullPath: "/v1/treasury/financial_accounts",
            methodType: "list",
          }),
          close: tt({
            method: "POST",
            fullPath:
              "/v1/treasury/financial_accounts/{financial_account}/close",
          }),
          retrieveFeatures: tt({
            method: "GET",
            fullPath:
              "/v1/treasury/financial_accounts/{financial_account}/features",
          }),
          updateFeatures: tt({
            method: "POST",
            fullPath:
              "/v1/treasury/financial_accounts/{financial_account}/features",
          }),
        }),
        to = ep.method,
        tn = ep.extend({
          fail: to({
            method: "POST",
            fullPath: "/v1/test_helpers/treasury/inbound_transfers/{id}/fail",
          }),
          returnInboundTransfer: to({
            method: "POST",
            fullPath: "/v1/test_helpers/treasury/inbound_transfers/{id}/return",
          }),
          succeed: to({
            method: "POST",
            fullPath:
              "/v1/test_helpers/treasury/inbound_transfers/{id}/succeed",
          }),
        }),
        ti = ep.method,
        ta = ep.extend({
          create: ti({
            method: "POST",
            fullPath: "/v1/treasury/inbound_transfers",
          }),
          retrieve: ti({
            method: "GET",
            fullPath: "/v1/treasury/inbound_transfers/{id}",
          }),
          list: ti({
            method: "GET",
            fullPath: "/v1/treasury/inbound_transfers",
            methodType: "list",
          }),
          cancel: ti({
            method: "POST",
            fullPath:
              "/v1/treasury/inbound_transfers/{inbound_transfer}/cancel",
          }),
        }),
        ts = ep.method,
        tl = ep.extend({
          create: ts({ method: "POST", fullPath: "/v1/terminal/locations" }),
          retrieve: ts({
            method: "GET",
            fullPath: "/v1/terminal/locations/{location}",
          }),
          update: ts({
            method: "POST",
            fullPath: "/v1/terminal/locations/{location}",
          }),
          list: ts({
            method: "GET",
            fullPath: "/v1/terminal/locations",
            methodType: "list",
          }),
          del: ts({
            method: "DELETE",
            fullPath: "/v1/terminal/locations/{location}",
          }),
        }),
        tu = ep.method,
        td = ep.extend({
          create: tu({
            method: "POST",
            fullPath: "/v1/billing/meter_event_adjustments",
          }),
        }),
        tc = ep.method,
        th = ep.extend({
          create: tc({
            method: "POST",
            fullPath: "/v2/billing/meter_event_adjustments",
          }),
        }),
        tp = ep.method,
        tm = ep.extend({
          create: tp({
            method: "POST",
            fullPath: "/v2/billing/meter_event_session",
          }),
        }),
        tf = ep.method,
        tv = ep.extend({
          create: tf({
            method: "POST",
            fullPath: "/v2/billing/meter_event_stream",
            host: "meter-events.stripe.com",
          }),
        }),
        ty = ep.method,
        tP = ep.extend({
          create: ty({ method: "POST", fullPath: "/v1/billing/meter_events" }),
        }),
        tg = ep.method,
        tT = ep.extend({
          create: tg({ method: "POST", fullPath: "/v2/billing/meter_events" }),
        }),
        t_ = ep.method,
        tE = ep.extend({
          create: t_({ method: "POST", fullPath: "/v1/billing/meters" }),
          retrieve: t_({ method: "GET", fullPath: "/v1/billing/meters/{id}" }),
          update: t_({ method: "POST", fullPath: "/v1/billing/meters/{id}" }),
          list: t_({
            method: "GET",
            fullPath: "/v1/billing/meters",
            methodType: "list",
          }),
          deactivate: t_({
            method: "POST",
            fullPath: "/v1/billing/meters/{id}/deactivate",
          }),
          listEventSummaries: t_({
            method: "GET",
            fullPath: "/v1/billing/meters/{id}/event_summaries",
            methodType: "list",
          }),
          reactivate: t_({
            method: "POST",
            fullPath: "/v1/billing/meters/{id}/reactivate",
          }),
        }),
        tb = ep.method,
        tS = ep.extend({
          create: tb({ method: "POST", fullPath: "/v1/climate/orders" }),
          retrieve: tb({
            method: "GET",
            fullPath: "/v1/climate/orders/{order}",
          }),
          update: tb({
            method: "POST",
            fullPath: "/v1/climate/orders/{order}",
          }),
          list: tb({
            method: "GET",
            fullPath: "/v1/climate/orders",
            methodType: "list",
          }),
          cancel: tb({
            method: "POST",
            fullPath: "/v1/climate/orders/{order}/cancel",
          }),
        }),
        tO = ep.method,
        tx = ep.extend({
          update: tO({
            method: "POST",
            fullPath: "/v1/test_helpers/treasury/outbound_payments/{id}",
          }),
          fail: tO({
            method: "POST",
            fullPath: "/v1/test_helpers/treasury/outbound_payments/{id}/fail",
          }),
          post: tO({
            method: "POST",
            fullPath: "/v1/test_helpers/treasury/outbound_payments/{id}/post",
          }),
          returnOutboundPayment: tO({
            method: "POST",
            fullPath: "/v1/test_helpers/treasury/outbound_payments/{id}/return",
          }),
        }),
        tw = ep.method,
        tA = ep.extend({
          create: tw({
            method: "POST",
            fullPath: "/v1/treasury/outbound_payments",
          }),
          retrieve: tw({
            method: "GET",
            fullPath: "/v1/treasury/outbound_payments/{id}",
          }),
          list: tw({
            method: "GET",
            fullPath: "/v1/treasury/outbound_payments",
            methodType: "list",
          }),
          cancel: tw({
            method: "POST",
            fullPath: "/v1/treasury/outbound_payments/{id}/cancel",
          }),
        }),
        tC = ep.method,
        tG = ep.extend({
          update: tC({
            method: "POST",
            fullPath:
              "/v1/test_helpers/treasury/outbound_transfers/{outbound_transfer}",
          }),
          fail: tC({
            method: "POST",
            fullPath:
              "/v1/test_helpers/treasury/outbound_transfers/{outbound_transfer}/fail",
          }),
          post: tC({
            method: "POST",
            fullPath:
              "/v1/test_helpers/treasury/outbound_transfers/{outbound_transfer}/post",
          }),
          returnOutboundTransfer: tC({
            method: "POST",
            fullPath:
              "/v1/test_helpers/treasury/outbound_transfers/{outbound_transfer}/return",
          }),
        }),
        tR = ep.method,
        tj = ep.extend({
          create: tR({
            method: "POST",
            fullPath: "/v1/treasury/outbound_transfers",
          }),
          retrieve: tR({
            method: "GET",
            fullPath: "/v1/treasury/outbound_transfers/{outbound_transfer}",
          }),
          list: tR({
            method: "GET",
            fullPath: "/v1/treasury/outbound_transfers",
            methodType: "list",
          }),
          cancel: tR({
            method: "POST",
            fullPath:
              "/v1/treasury/outbound_transfers/{outbound_transfer}/cancel",
          }),
        }),
        tk = ep.method,
        tD = ep.extend({
          activate: tk({
            method: "POST",
            fullPath:
              "/v1/test_helpers/issuing/personalization_designs/{personalization_design}/activate",
          }),
          deactivate: tk({
            method: "POST",
            fullPath:
              "/v1/test_helpers/issuing/personalization_designs/{personalization_design}/deactivate",
          }),
          reject: tk({
            method: "POST",
            fullPath:
              "/v1/test_helpers/issuing/personalization_designs/{personalization_design}/reject",
          }),
        }),
        tI = ep.method,
        tN = ep.extend({
          create: tI({
            method: "POST",
            fullPath: "/v1/issuing/personalization_designs",
          }),
          retrieve: tI({
            method: "GET",
            fullPath:
              "/v1/issuing/personalization_designs/{personalization_design}",
          }),
          update: tI({
            method: "POST",
            fullPath:
              "/v1/issuing/personalization_designs/{personalization_design}",
          }),
          list: tI({
            method: "GET",
            fullPath: "/v1/issuing/personalization_designs",
            methodType: "list",
          }),
        }),
        tq = ep.method,
        tM = ep.extend({
          retrieve: tq({
            method: "GET",
            fullPath: "/v1/issuing/physical_bundles/{physical_bundle}",
          }),
          list: tq({
            method: "GET",
            fullPath: "/v1/issuing/physical_bundles",
            methodType: "list",
          }),
        }),
        tL = ep.method,
        tH = ep.extend({
          retrieve: tL({
            method: "GET",
            fullPath: "/v1/climate/products/{product}",
          }),
          list: tL({
            method: "GET",
            fullPath: "/v1/climate/products",
            methodType: "list",
          }),
        }),
        tU = ep.method,
        tF = ep.extend({
          presentPaymentMethod: tU({
            method: "POST",
            fullPath:
              "/v1/test_helpers/terminal/readers/{reader}/present_payment_method",
          }),
        }),
        t$ = ep.method,
        tz = ep.extend({
          create: t$({ method: "POST", fullPath: "/v1/terminal/readers" }),
          retrieve: t$({
            method: "GET",
            fullPath: "/v1/terminal/readers/{reader}",
          }),
          update: t$({
            method: "POST",
            fullPath: "/v1/terminal/readers/{reader}",
          }),
          list: t$({
            method: "GET",
            fullPath: "/v1/terminal/readers",
            methodType: "list",
          }),
          del: t$({
            method: "DELETE",
            fullPath: "/v1/terminal/readers/{reader}",
          }),
          cancelAction: t$({
            method: "POST",
            fullPath: "/v1/terminal/readers/{reader}/cancel_action",
          }),
          processPaymentIntent: t$({
            method: "POST",
            fullPath: "/v1/terminal/readers/{reader}/process_payment_intent",
          }),
          processSetupIntent: t$({
            method: "POST",
            fullPath: "/v1/terminal/readers/{reader}/process_setup_intent",
          }),
          refundPayment: t$({
            method: "POST",
            fullPath: "/v1/terminal/readers/{reader}/refund_payment",
          }),
          setReaderDisplay: t$({
            method: "POST",
            fullPath: "/v1/terminal/readers/{reader}/set_reader_display",
          }),
        }),
        tB = ep.method,
        tK = ep.extend({
          create: tB({
            method: "POST",
            fullPath: "/v1/test_helpers/treasury/received_credits",
          }),
        }),
        tW = ep.method,
        tV = ep.extend({
          retrieve: tW({
            method: "GET",
            fullPath: "/v1/treasury/received_credits/{id}",
          }),
          list: tW({
            method: "GET",
            fullPath: "/v1/treasury/received_credits",
            methodType: "list",
          }),
        }),
        tJ = ep.method,
        tQ = ep.extend({
          create: tJ({
            method: "POST",
            fullPath: "/v1/test_helpers/treasury/received_debits",
          }),
        }),
        tX = ep.method,
        tY = ep.extend({
          retrieve: tX({
            method: "GET",
            fullPath: "/v1/treasury/received_debits/{id}",
          }),
          list: tX({
            method: "GET",
            fullPath: "/v1/treasury/received_debits",
            methodType: "list",
          }),
        }),
        tZ = ep.method,
        t1 = ep.extend({
          expire: tZ({
            method: "POST",
            fullPath: "/v1/test_helpers/refunds/{refund}/expire",
          }),
        }),
        t0 = ep.method,
        t2 = ep.extend({
          create: t0({ method: "POST", fullPath: "/v1/tax/registrations" }),
          retrieve: t0({
            method: "GET",
            fullPath: "/v1/tax/registrations/{id}",
          }),
          update: t0({
            method: "POST",
            fullPath: "/v1/tax/registrations/{id}",
          }),
          list: t0({
            method: "GET",
            fullPath: "/v1/tax/registrations",
            methodType: "list",
          }),
        }),
        t8 = ep.method,
        t5 = ep.extend({
          create: t8({ method: "POST", fullPath: "/v1/reporting/report_runs" }),
          retrieve: t8({
            method: "GET",
            fullPath: "/v1/reporting/report_runs/{report_run}",
          }),
          list: t8({
            method: "GET",
            fullPath: "/v1/reporting/report_runs",
            methodType: "list",
          }),
        }),
        t3 = ep.method,
        t6 = ep.extend({
          retrieve: t3({
            method: "GET",
            fullPath: "/v1/reporting/report_types/{report_type}",
          }),
          list: t3({
            method: "GET",
            fullPath: "/v1/reporting/report_types",
            methodType: "list",
          }),
        }),
        t9 = ep.method,
        t4 = ep.extend({
          create: t9({ method: "POST", fullPath: "/v1/forwarding/requests" }),
          retrieve: t9({
            method: "GET",
            fullPath: "/v1/forwarding/requests/{id}",
          }),
          list: t9({
            method: "GET",
            fullPath: "/v1/forwarding/requests",
            methodType: "list",
          }),
        }),
        t7 = ep.method,
        re = ep.extend({
          retrieve: t7({
            method: "GET",
            fullPath: "/v1/sigma/scheduled_query_runs/{scheduled_query_run}",
          }),
          list: t7({
            method: "GET",
            fullPath: "/v1/sigma/scheduled_query_runs",
            methodType: "list",
          }),
        }),
        rt = ep.method,
        rr = ep.extend({
          create: rt({ method: "POST", fullPath: "/v1/apps/secrets" }),
          list: rt({
            method: "GET",
            fullPath: "/v1/apps/secrets",
            methodType: "list",
          }),
          deleteWhere: rt({
            method: "POST",
            fullPath: "/v1/apps/secrets/delete",
          }),
          find: rt({ method: "GET", fullPath: "/v1/apps/secrets/find" }),
        }),
        ro = ep.method,
        rn = ep.extend({
          create: ro({
            method: "POST",
            fullPath: "/v1/billing_portal/sessions",
          }),
        }),
        ri = ep.method,
        ra = ep.extend({
          create: ri({ method: "POST", fullPath: "/v1/checkout/sessions" }),
          retrieve: ri({
            method: "GET",
            fullPath: "/v1/checkout/sessions/{session}",
          }),
          update: ri({
            method: "POST",
            fullPath: "/v1/checkout/sessions/{session}",
          }),
          list: ri({
            method: "GET",
            fullPath: "/v1/checkout/sessions",
            methodType: "list",
          }),
          expire: ri({
            method: "POST",
            fullPath: "/v1/checkout/sessions/{session}/expire",
          }),
          listLineItems: ri({
            method: "GET",
            fullPath: "/v1/checkout/sessions/{session}/line_items",
            methodType: "list",
          }),
        }),
        rs = ep.method,
        rl = ep.extend({
          create: rs({
            method: "POST",
            fullPath: "/v1/financial_connections/sessions",
          }),
          retrieve: rs({
            method: "GET",
            fullPath: "/v1/financial_connections/sessions/{session}",
          }),
        }),
        ru = ep.method,
        rd = ep.extend({
          retrieve: ru({ method: "GET", fullPath: "/v1/tax/settings" }),
          update: ru({ method: "POST", fullPath: "/v1/tax/settings" }),
        }),
        rc = ep.method,
        rh = ep.extend({
          retrieve: rc({
            method: "GET",
            fullPath: "/v1/climate/suppliers/{supplier}",
          }),
          list: rc({
            method: "GET",
            fullPath: "/v1/climate/suppliers",
            methodType: "list",
          }),
        }),
        rp = ep.method,
        rm = ep.extend({
          create: rp({
            method: "POST",
            fullPath: "/v1/test_helpers/test_clocks",
          }),
          retrieve: rp({
            method: "GET",
            fullPath: "/v1/test_helpers/test_clocks/{test_clock}",
          }),
          list: rp({
            method: "GET",
            fullPath: "/v1/test_helpers/test_clocks",
            methodType: "list",
          }),
          del: rp({
            method: "DELETE",
            fullPath: "/v1/test_helpers/test_clocks/{test_clock}",
          }),
          advance: rp({
            method: "POST",
            fullPath: "/v1/test_helpers/test_clocks/{test_clock}/advance",
          }),
        }),
        rf = ep.method,
        rv = ep.extend({
          retrieve: rf({
            method: "GET",
            fullPath: "/v1/issuing/tokens/{token}",
          }),
          update: rf({
            method: "POST",
            fullPath: "/v1/issuing/tokens/{token}",
          }),
          list: rf({
            method: "GET",
            fullPath: "/v1/issuing/tokens",
            methodType: "list",
          }),
        }),
        ry = ep.method,
        rP = ep.extend({
          retrieve: ry({
            method: "GET",
            fullPath: "/v1/treasury/transaction_entries/{id}",
          }),
          list: ry({
            method: "GET",
            fullPath: "/v1/treasury/transaction_entries",
            methodType: "list",
          }),
        }),
        rg = ep.method,
        rT = ep.extend({
          createForceCapture: rg({
            method: "POST",
            fullPath:
              "/v1/test_helpers/issuing/transactions/create_force_capture",
          }),
          createUnlinkedRefund: rg({
            method: "POST",
            fullPath:
              "/v1/test_helpers/issuing/transactions/create_unlinked_refund",
          }),
          refund: rg({
            method: "POST",
            fullPath:
              "/v1/test_helpers/issuing/transactions/{transaction}/refund",
          }),
        }),
        r_ = ep.method,
        rE = ep.extend({
          retrieve: r_({
            method: "GET",
            fullPath: "/v1/financial_connections/transactions/{transaction}",
          }),
          list: r_({
            method: "GET",
            fullPath: "/v1/financial_connections/transactions",
            methodType: "list",
          }),
        }),
        rb = ep.method,
        rS = ep.extend({
          retrieve: rb({
            method: "GET",
            fullPath: "/v1/issuing/transactions/{transaction}",
          }),
          update: rb({
            method: "POST",
            fullPath: "/v1/issuing/transactions/{transaction}",
          }),
          list: rb({
            method: "GET",
            fullPath: "/v1/issuing/transactions",
            methodType: "list",
          }),
        }),
        rO = ep.method,
        rx = ep.extend({
          retrieve: rO({
            method: "GET",
            fullPath: "/v1/tax/transactions/{transaction}",
          }),
          createFromCalculation: rO({
            method: "POST",
            fullPath: "/v1/tax/transactions/create_from_calculation",
          }),
          createReversal: rO({
            method: "POST",
            fullPath: "/v1/tax/transactions/create_reversal",
          }),
          listLineItems: rO({
            method: "GET",
            fullPath: "/v1/tax/transactions/{transaction}/line_items",
            methodType: "list",
          }),
        }),
        rw = ep.method,
        rA = ep.extend({
          retrieve: rw({
            method: "GET",
            fullPath: "/v1/treasury/transactions/{id}",
          }),
          list: rw({
            method: "GET",
            fullPath: "/v1/treasury/transactions",
            methodType: "list",
          }),
        }),
        rC = ep.method,
        rG = ep.extend({
          create: rC({
            method: "POST",
            fullPath: "/v1/radar/value_list_items",
          }),
          retrieve: rC({
            method: "GET",
            fullPath: "/v1/radar/value_list_items/{item}",
          }),
          list: rC({
            method: "GET",
            fullPath: "/v1/radar/value_list_items",
            methodType: "list",
          }),
          del: rC({
            method: "DELETE",
            fullPath: "/v1/radar/value_list_items/{item}",
          }),
        }),
        rR = ep.method,
        rj = ep.extend({
          create: rR({ method: "POST", fullPath: "/v1/radar/value_lists" }),
          retrieve: rR({
            method: "GET",
            fullPath: "/v1/radar/value_lists/{value_list}",
          }),
          update: rR({
            method: "POST",
            fullPath: "/v1/radar/value_lists/{value_list}",
          }),
          list: rR({
            method: "GET",
            fullPath: "/v1/radar/value_lists",
            methodType: "list",
          }),
          del: rR({
            method: "DELETE",
            fullPath: "/v1/radar/value_lists/{value_list}",
          }),
        }),
        rk = ep.method,
        rD = ep.extend({
          retrieve: rk({
            method: "GET",
            fullPath: "/v1/identity/verification_reports/{report}",
          }),
          list: rk({
            method: "GET",
            fullPath: "/v1/identity/verification_reports",
            methodType: "list",
          }),
        }),
        rI = ep.method,
        rN = ep.extend({
          create: rI({
            method: "POST",
            fullPath: "/v1/identity/verification_sessions",
          }),
          retrieve: rI({
            method: "GET",
            fullPath: "/v1/identity/verification_sessions/{session}",
          }),
          update: rI({
            method: "POST",
            fullPath: "/v1/identity/verification_sessions/{session}",
          }),
          list: rI({
            method: "GET",
            fullPath: "/v1/identity/verification_sessions",
            methodType: "list",
          }),
          cancel: rI({
            method: "POST",
            fullPath: "/v1/identity/verification_sessions/{session}/cancel",
          }),
          redact: rI({
            method: "POST",
            fullPath: "/v1/identity/verification_sessions/{session}/redact",
          }),
        }),
        rq = ep.method,
        rM = ep.extend({
          create: rq({ method: "POST", fullPath: "/v1/accounts" }),
          retrieve(e, ...t) {
            return "string" == typeof e
              ? rq({ method: "GET", fullPath: "/v1/accounts/{id}" }).apply(
                  this,
                  [e, ...t],
                )
              : (null == e && [].shift.apply([e, ...t]),
                rq({ method: "GET", fullPath: "/v1/account" }).apply(this, [
                  e,
                  ...t,
                ]));
          },
          update: rq({ method: "POST", fullPath: "/v1/accounts/{account}" }),
          list: rq({
            method: "GET",
            fullPath: "/v1/accounts",
            methodType: "list",
          }),
          del: rq({ method: "DELETE", fullPath: "/v1/accounts/{account}" }),
          createExternalAccount: rq({
            method: "POST",
            fullPath: "/v1/accounts/{account}/external_accounts",
          }),
          createLoginLink: rq({
            method: "POST",
            fullPath: "/v1/accounts/{account}/login_links",
          }),
          createPerson: rq({
            method: "POST",
            fullPath: "/v1/accounts/{account}/persons",
          }),
          deleteExternalAccount: rq({
            method: "DELETE",
            fullPath: "/v1/accounts/{account}/external_accounts/{id}",
          }),
          deletePerson: rq({
            method: "DELETE",
            fullPath: "/v1/accounts/{account}/persons/{person}",
          }),
          listCapabilities: rq({
            method: "GET",
            fullPath: "/v1/accounts/{account}/capabilities",
            methodType: "list",
          }),
          listExternalAccounts: rq({
            method: "GET",
            fullPath: "/v1/accounts/{account}/external_accounts",
            methodType: "list",
          }),
          listPersons: rq({
            method: "GET",
            fullPath: "/v1/accounts/{account}/persons",
            methodType: "list",
          }),
          reject: rq({
            method: "POST",
            fullPath: "/v1/accounts/{account}/reject",
          }),
          retrieveCurrent: rq({ method: "GET", fullPath: "/v1/account" }),
          retrieveCapability: rq({
            method: "GET",
            fullPath: "/v1/accounts/{account}/capabilities/{capability}",
          }),
          retrieveExternalAccount: rq({
            method: "GET",
            fullPath: "/v1/accounts/{account}/external_accounts/{id}",
          }),
          retrievePerson: rq({
            method: "GET",
            fullPath: "/v1/accounts/{account}/persons/{person}",
          }),
          updateCapability: rq({
            method: "POST",
            fullPath: "/v1/accounts/{account}/capabilities/{capability}",
          }),
          updateExternalAccount: rq({
            method: "POST",
            fullPath: "/v1/accounts/{account}/external_accounts/{id}",
          }),
          updatePerson: rq({
            method: "POST",
            fullPath: "/v1/accounts/{account}/persons/{person}",
          }),
        }),
        rL = ep.method,
        rH = ep.extend({
          create: rL({ method: "POST", fullPath: "/v1/account_links" }),
        }),
        rU = ep.method,
        rF = ep.extend({
          create: rU({ method: "POST", fullPath: "/v1/account_sessions" }),
        }),
        r$ = ep.method,
        rz = ep.extend({
          create: r$({ method: "POST", fullPath: "/v1/apple_pay/domains" }),
          retrieve: r$({
            method: "GET",
            fullPath: "/v1/apple_pay/domains/{domain}",
          }),
          list: r$({
            method: "GET",
            fullPath: "/v1/apple_pay/domains",
            methodType: "list",
          }),
          del: r$({
            method: "DELETE",
            fullPath: "/v1/apple_pay/domains/{domain}",
          }),
        }),
        rB = ep.method,
        rK = ep.extend({
          retrieve: rB({
            method: "GET",
            fullPath: "/v1/application_fees/{id}",
          }),
          list: rB({
            method: "GET",
            fullPath: "/v1/application_fees",
            methodType: "list",
          }),
          createRefund: rB({
            method: "POST",
            fullPath: "/v1/application_fees/{id}/refunds",
          }),
          listRefunds: rB({
            method: "GET",
            fullPath: "/v1/application_fees/{id}/refunds",
            methodType: "list",
          }),
          retrieveRefund: rB({
            method: "GET",
            fullPath: "/v1/application_fees/{fee}/refunds/{id}",
          }),
          updateRefund: rB({
            method: "POST",
            fullPath: "/v1/application_fees/{fee}/refunds/{id}",
          }),
        }),
        rW = ep.method,
        rV = ep.extend({
          retrieve: rW({ method: "GET", fullPath: "/v1/balance" }),
        }),
        rJ = ep.method,
        rQ = ep.extend({
          retrieve: rJ({
            method: "GET",
            fullPath: "/v1/balance_transactions/{id}",
          }),
          list: rJ({
            method: "GET",
            fullPath: "/v1/balance_transactions",
            methodType: "list",
          }),
        }),
        rX = ep.method,
        rY = ep.extend({
          create: rX({ method: "POST", fullPath: "/v1/charges" }),
          retrieve: rX({ method: "GET", fullPath: "/v1/charges/{charge}" }),
          update: rX({ method: "POST", fullPath: "/v1/charges/{charge}" }),
          list: rX({
            method: "GET",
            fullPath: "/v1/charges",
            methodType: "list",
          }),
          capture: rX({
            method: "POST",
            fullPath: "/v1/charges/{charge}/capture",
          }),
          search: rX({
            method: "GET",
            fullPath: "/v1/charges/search",
            methodType: "search",
          }),
        }),
        rZ = ep.method,
        r1 = ep.extend({
          retrieve: rZ({
            method: "GET",
            fullPath: "/v1/confirmation_tokens/{confirmation_token}",
          }),
        }),
        r0 = ep.method,
        r2 = ep.extend({
          retrieve: r0({
            method: "GET",
            fullPath: "/v1/country_specs/{country}",
          }),
          list: r0({
            method: "GET",
            fullPath: "/v1/country_specs",
            methodType: "list",
          }),
        }),
        r8 = ep.method,
        r5 = ep.extend({
          create: r8({ method: "POST", fullPath: "/v1/coupons" }),
          retrieve: r8({ method: "GET", fullPath: "/v1/coupons/{coupon}" }),
          update: r8({ method: "POST", fullPath: "/v1/coupons/{coupon}" }),
          list: r8({
            method: "GET",
            fullPath: "/v1/coupons",
            methodType: "list",
          }),
          del: r8({ method: "DELETE", fullPath: "/v1/coupons/{coupon}" }),
        }),
        r3 = ep.method,
        r6 = ep.extend({
          create: r3({ method: "POST", fullPath: "/v1/credit_notes" }),
          retrieve: r3({ method: "GET", fullPath: "/v1/credit_notes/{id}" }),
          update: r3({ method: "POST", fullPath: "/v1/credit_notes/{id}" }),
          list: r3({
            method: "GET",
            fullPath: "/v1/credit_notes",
            methodType: "list",
          }),
          listLineItems: r3({
            method: "GET",
            fullPath: "/v1/credit_notes/{credit_note}/lines",
            methodType: "list",
          }),
          listPreviewLineItems: r3({
            method: "GET",
            fullPath: "/v1/credit_notes/preview/lines",
            methodType: "list",
          }),
          preview: r3({ method: "GET", fullPath: "/v1/credit_notes/preview" }),
          voidCreditNote: r3({
            method: "POST",
            fullPath: "/v1/credit_notes/{id}/void",
          }),
        }),
        r9 = ep.method,
        r4 = ep.extend({
          create: r9({ method: "POST", fullPath: "/v1/customer_sessions" }),
        }),
        r7 = ep.method,
        oe = ep.extend({
          create: r7({ method: "POST", fullPath: "/v1/customers" }),
          retrieve: r7({ method: "GET", fullPath: "/v1/customers/{customer}" }),
          update: r7({ method: "POST", fullPath: "/v1/customers/{customer}" }),
          list: r7({
            method: "GET",
            fullPath: "/v1/customers",
            methodType: "list",
          }),
          del: r7({ method: "DELETE", fullPath: "/v1/customers/{customer}" }),
          createBalanceTransaction: r7({
            method: "POST",
            fullPath: "/v1/customers/{customer}/balance_transactions",
          }),
          createFundingInstructions: r7({
            method: "POST",
            fullPath: "/v1/customers/{customer}/funding_instructions",
          }),
          createSource: r7({
            method: "POST",
            fullPath: "/v1/customers/{customer}/sources",
          }),
          createTaxId: r7({
            method: "POST",
            fullPath: "/v1/customers/{customer}/tax_ids",
          }),
          deleteDiscount: r7({
            method: "DELETE",
            fullPath: "/v1/customers/{customer}/discount",
          }),
          deleteSource: r7({
            method: "DELETE",
            fullPath: "/v1/customers/{customer}/sources/{id}",
          }),
          deleteTaxId: r7({
            method: "DELETE",
            fullPath: "/v1/customers/{customer}/tax_ids/{id}",
          }),
          listBalanceTransactions: r7({
            method: "GET",
            fullPath: "/v1/customers/{customer}/balance_transactions",
            methodType: "list",
          }),
          listCashBalanceTransactions: r7({
            method: "GET",
            fullPath: "/v1/customers/{customer}/cash_balance_transactions",
            methodType: "list",
          }),
          listPaymentMethods: r7({
            method: "GET",
            fullPath: "/v1/customers/{customer}/payment_methods",
            methodType: "list",
          }),
          listSources: r7({
            method: "GET",
            fullPath: "/v1/customers/{customer}/sources",
            methodType: "list",
          }),
          listTaxIds: r7({
            method: "GET",
            fullPath: "/v1/customers/{customer}/tax_ids",
            methodType: "list",
          }),
          retrieveBalanceTransaction: r7({
            method: "GET",
            fullPath:
              "/v1/customers/{customer}/balance_transactions/{transaction}",
          }),
          retrieveCashBalance: r7({
            method: "GET",
            fullPath: "/v1/customers/{customer}/cash_balance",
          }),
          retrieveCashBalanceTransaction: r7({
            method: "GET",
            fullPath:
              "/v1/customers/{customer}/cash_balance_transactions/{transaction}",
          }),
          retrievePaymentMethod: r7({
            method: "GET",
            fullPath:
              "/v1/customers/{customer}/payment_methods/{payment_method}",
          }),
          retrieveSource: r7({
            method: "GET",
            fullPath: "/v1/customers/{customer}/sources/{id}",
          }),
          retrieveTaxId: r7({
            method: "GET",
            fullPath: "/v1/customers/{customer}/tax_ids/{id}",
          }),
          search: r7({
            method: "GET",
            fullPath: "/v1/customers/search",
            methodType: "search",
          }),
          updateBalanceTransaction: r7({
            method: "POST",
            fullPath:
              "/v1/customers/{customer}/balance_transactions/{transaction}",
          }),
          updateCashBalance: r7({
            method: "POST",
            fullPath: "/v1/customers/{customer}/cash_balance",
          }),
          updateSource: r7({
            method: "POST",
            fullPath: "/v1/customers/{customer}/sources/{id}",
          }),
          verifySource: r7({
            method: "POST",
            fullPath: "/v1/customers/{customer}/sources/{id}/verify",
          }),
        }),
        ot = ep.method,
        or = ep.extend({
          retrieve: ot({ method: "GET", fullPath: "/v1/disputes/{dispute}" }),
          update: ot({ method: "POST", fullPath: "/v1/disputes/{dispute}" }),
          list: ot({
            method: "GET",
            fullPath: "/v1/disputes",
            methodType: "list",
          }),
          close: ot({
            method: "POST",
            fullPath: "/v1/disputes/{dispute}/close",
          }),
        }),
        oo = ep.method,
        on = ep.extend({
          create: oo({
            method: "POST",
            fullPath: "/v1/ephemeral_keys",
            validator: (e, t) => {
              if (!t.headers || !t.headers["Stripe-Version"])
                throw Error(
                  "Passing apiVersion in a separate options hash is required to create an ephemeral key. See https://stripe.com/docs/api/versioning?lang=node",
                );
            },
          }),
          del: oo({ method: "DELETE", fullPath: "/v1/ephemeral_keys/{key}" }),
        }),
        oi = ep.method,
        oa = ep.extend({
          retrieve: oi({ method: "GET", fullPath: "/v1/events/{id}" }),
          list: oi({
            method: "GET",
            fullPath: "/v1/events",
            methodType: "list",
          }),
        }),
        os = ep.method,
        ol = ep.extend({
          retrieve: os({
            method: "GET",
            fullPath: "/v1/exchange_rates/{rate_id}",
          }),
          list: os({
            method: "GET",
            fullPath: "/v1/exchange_rates",
            methodType: "list",
          }),
        }),
        ou = ep.method,
        od = ep.extend({
          create: ou({ method: "POST", fullPath: "/v1/file_links" }),
          retrieve: ou({ method: "GET", fullPath: "/v1/file_links/{link}" }),
          update: ou({ method: "POST", fullPath: "/v1/file_links/{link}" }),
          list: ou({
            method: "GET",
            fullPath: "/v1/file_links",
            methodType: "list",
          }),
        }),
        oc = (e, t, r) => {
          let o = (
            Math.round(1e16 * Math.random()) + Math.round(1e16 * Math.random())
          ).toString();
          r["Content-Type"] = `multipart/form-data; boundary=${o}`;
          let n = new TextEncoder(),
            i = new Uint8Array(0),
            a = n.encode("\r\n");
          function s(e) {
            let t = i,
              r = e instanceof Uint8Array ? e : new Uint8Array(n.encode(e));
            (i = new Uint8Array(t.length + r.length + 2)).set(t),
              i.set(r, t.length),
              i.set(a, i.length - 2);
          }
          function l(e) {
            return `"${e.replace(/"|"/g, "%22").replace(/\r\n|\r|\n/g, " ")}"`;
          }
          let u = (function (e) {
            let t = {},
              r = (e, o) => {
                Object.entries(e).forEach(([e, n]) => {
                  let i = o ? `${o}[${e}]` : e;
                  if (
                    (function (e) {
                      let t = typeof e;
                      return ("function" === t || "object" === t) && !!e;
                    })(n)
                  )
                    if (
                      !(n instanceof Uint8Array) &&
                      !Object.prototype.hasOwnProperty.call(n, "data")
                    )
                      return r(n, i);
                    else t[i] = n;
                  else t[i] = String(n);
                });
              };
            return r(e, null), t;
          })(t);
          for (let e in u) {
            if (!Object.prototype.hasOwnProperty.call(u, e)) continue;
            let t = u[e];
            s(`--${o}`),
              Object.prototype.hasOwnProperty.call(t, "data")
                ? (s(
                    `Content-Disposition: form-data; name=${l(e)}; filename=${l(t.name || "blob")}`,
                  ),
                  s(`Content-Type: ${t.type || "application/octet-stream"}`),
                  s(""),
                  s(t.data))
                : (s(`Content-Disposition: form-data; name=${l(e)}`),
                  s(""),
                  s(t));
          }
          return s(`--${o}--`), i;
        },
        oh = ep.method,
        op = ep.extend({
          create: oh({
            method: "POST",
            fullPath: "/v1/files",
            headers: { "Content-Type": "multipart/form-data" },
            host: "files.stripe.com",
          }),
          retrieve: oh({ method: "GET", fullPath: "/v1/files/{file}" }),
          list: oh({
            method: "GET",
            fullPath: "/v1/files",
            methodType: "list",
          }),
          requestDataProcessor: function (e, t, r, o) {
            if (((t = t || {}), "POST" !== e)) return o(null, B(t));
            this._stripe._platformFunctions
              .tryBufferData(t)
              .then((t) => o(null, oc(e, t, r)))
              .catch((e) => o(e, null));
          },
        }),
        om = ep.method,
        of = ep.extend({
          create: om({ method: "POST", fullPath: "/v1/invoiceitems" }),
          retrieve: om({
            method: "GET",
            fullPath: "/v1/invoiceitems/{invoiceitem}",
          }),
          update: om({
            method: "POST",
            fullPath: "/v1/invoiceitems/{invoiceitem}",
          }),
          list: om({
            method: "GET",
            fullPath: "/v1/invoiceitems",
            methodType: "list",
          }),
          del: om({
            method: "DELETE",
            fullPath: "/v1/invoiceitems/{invoiceitem}",
          }),
        }),
        ov = ep.method,
        oy = ep.extend({
          retrieve: ov({
            method: "GET",
            fullPath: "/v1/invoice_rendering_templates/{template}",
          }),
          list: ov({
            method: "GET",
            fullPath: "/v1/invoice_rendering_templates",
            methodType: "list",
          }),
          archive: ov({
            method: "POST",
            fullPath: "/v1/invoice_rendering_templates/{template}/archive",
          }),
          unarchive: ov({
            method: "POST",
            fullPath: "/v1/invoice_rendering_templates/{template}/unarchive",
          }),
        }),
        oP = ep.method,
        og = ep.extend({
          create: oP({ method: "POST", fullPath: "/v1/invoices" }),
          retrieve: oP({ method: "GET", fullPath: "/v1/invoices/{invoice}" }),
          update: oP({ method: "POST", fullPath: "/v1/invoices/{invoice}" }),
          list: oP({
            method: "GET",
            fullPath: "/v1/invoices",
            methodType: "list",
          }),
          del: oP({ method: "DELETE", fullPath: "/v1/invoices/{invoice}" }),
          addLines: oP({
            method: "POST",
            fullPath: "/v1/invoices/{invoice}/add_lines",
          }),
          createPreview: oP({
            method: "POST",
            fullPath: "/v1/invoices/create_preview",
          }),
          finalizeInvoice: oP({
            method: "POST",
            fullPath: "/v1/invoices/{invoice}/finalize",
          }),
          listLineItems: oP({
            method: "GET",
            fullPath: "/v1/invoices/{invoice}/lines",
            methodType: "list",
          }),
          listUpcomingLines: oP({
            method: "GET",
            fullPath: "/v1/invoices/upcoming/lines",
            methodType: "list",
          }),
          markUncollectible: oP({
            method: "POST",
            fullPath: "/v1/invoices/{invoice}/mark_uncollectible",
          }),
          pay: oP({ method: "POST", fullPath: "/v1/invoices/{invoice}/pay" }),
          removeLines: oP({
            method: "POST",
            fullPath: "/v1/invoices/{invoice}/remove_lines",
          }),
          retrieveUpcoming: oP({
            method: "GET",
            fullPath: "/v1/invoices/upcoming",
          }),
          search: oP({
            method: "GET",
            fullPath: "/v1/invoices/search",
            methodType: "search",
          }),
          sendInvoice: oP({
            method: "POST",
            fullPath: "/v1/invoices/{invoice}/send",
          }),
          updateLines: oP({
            method: "POST",
            fullPath: "/v1/invoices/{invoice}/update_lines",
          }),
          updateLineItem: oP({
            method: "POST",
            fullPath: "/v1/invoices/{invoice}/lines/{line_item_id}",
          }),
          voidInvoice: oP({
            method: "POST",
            fullPath: "/v1/invoices/{invoice}/void",
          }),
        }),
        oT = ep.method,
        o_ = ep.extend({
          retrieve: oT({ method: "GET", fullPath: "/v1/mandates/{mandate}" }),
        }),
        oE = ep.method,
        ob = "connect.stripe.com",
        oS = ep.extend({
          basePath: "/",
          authorizeUrl(e, t) {
            e = e || {};
            let r = "oauth/authorize";
            return (
              (t = t || {}).express && (r = `express/${r}`),
              e.response_type || (e.response_type = "code"),
              e.client_id || (e.client_id = this._stripe.getClientId()),
              e.scope || (e.scope = "read_write"),
              `https://${ob}/${r}?${B(e)}`
            );
          },
          token: oE({ method: "POST", path: "oauth/token", host: ob }),
          deauthorize(e, ...t) {
            return (
              e.client_id || (e.client_id = this._stripe.getClientId()),
              oE({ method: "POST", path: "oauth/deauthorize", host: ob }).apply(
                this,
                [e, ...t],
              )
            );
          },
        }),
        oO = ep.method,
        ox = ep.extend({
          create: oO({ method: "POST", fullPath: "/v1/payment_intents" }),
          retrieve: oO({
            method: "GET",
            fullPath: "/v1/payment_intents/{intent}",
          }),
          update: oO({
            method: "POST",
            fullPath: "/v1/payment_intents/{intent}",
          }),
          list: oO({
            method: "GET",
            fullPath: "/v1/payment_intents",
            methodType: "list",
          }),
          applyCustomerBalance: oO({
            method: "POST",
            fullPath: "/v1/payment_intents/{intent}/apply_customer_balance",
          }),
          cancel: oO({
            method: "POST",
            fullPath: "/v1/payment_intents/{intent}/cancel",
          }),
          capture: oO({
            method: "POST",
            fullPath: "/v1/payment_intents/{intent}/capture",
          }),
          confirm: oO({
            method: "POST",
            fullPath: "/v1/payment_intents/{intent}/confirm",
          }),
          incrementAuthorization: oO({
            method: "POST",
            fullPath: "/v1/payment_intents/{intent}/increment_authorization",
          }),
          search: oO({
            method: "GET",
            fullPath: "/v1/payment_intents/search",
            methodType: "search",
          }),
          verifyMicrodeposits: oO({
            method: "POST",
            fullPath: "/v1/payment_intents/{intent}/verify_microdeposits",
          }),
        }),
        ow = ep.method,
        oA = ep.extend({
          create: ow({ method: "POST", fullPath: "/v1/payment_links" }),
          retrieve: ow({
            method: "GET",
            fullPath: "/v1/payment_links/{payment_link}",
          }),
          update: ow({
            method: "POST",
            fullPath: "/v1/payment_links/{payment_link}",
          }),
          list: ow({
            method: "GET",
            fullPath: "/v1/payment_links",
            methodType: "list",
          }),
          listLineItems: ow({
            method: "GET",
            fullPath: "/v1/payment_links/{payment_link}/line_items",
            methodType: "list",
          }),
        }),
        oC = ep.method,
        oG = ep.extend({
          create: oC({
            method: "POST",
            fullPath: "/v1/payment_method_configurations",
          }),
          retrieve: oC({
            method: "GET",
            fullPath: "/v1/payment_method_configurations/{configuration}",
          }),
          update: oC({
            method: "POST",
            fullPath: "/v1/payment_method_configurations/{configuration}",
          }),
          list: oC({
            method: "GET",
            fullPath: "/v1/payment_method_configurations",
            methodType: "list",
          }),
        }),
        oR = ep.method,
        oj = ep.extend({
          create: oR({
            method: "POST",
            fullPath: "/v1/payment_method_domains",
          }),
          retrieve: oR({
            method: "GET",
            fullPath: "/v1/payment_method_domains/{payment_method_domain}",
          }),
          update: oR({
            method: "POST",
            fullPath: "/v1/payment_method_domains/{payment_method_domain}",
          }),
          list: oR({
            method: "GET",
            fullPath: "/v1/payment_method_domains",
            methodType: "list",
          }),
          validate: oR({
            method: "POST",
            fullPath:
              "/v1/payment_method_domains/{payment_method_domain}/validate",
          }),
        }),
        ok = ep.method,
        oD = ep.extend({
          create: ok({ method: "POST", fullPath: "/v1/payment_methods" }),
          retrieve: ok({
            method: "GET",
            fullPath: "/v1/payment_methods/{payment_method}",
          }),
          update: ok({
            method: "POST",
            fullPath: "/v1/payment_methods/{payment_method}",
          }),
          list: ok({
            method: "GET",
            fullPath: "/v1/payment_methods",
            methodType: "list",
          }),
          attach: ok({
            method: "POST",
            fullPath: "/v1/payment_methods/{payment_method}/attach",
          }),
          detach: ok({
            method: "POST",
            fullPath: "/v1/payment_methods/{payment_method}/detach",
          }),
        }),
        oI = ep.method,
        oN = ep.extend({
          create: oI({ method: "POST", fullPath: "/v1/payouts" }),
          retrieve: oI({ method: "GET", fullPath: "/v1/payouts/{payout}" }),
          update: oI({ method: "POST", fullPath: "/v1/payouts/{payout}" }),
          list: oI({
            method: "GET",
            fullPath: "/v1/payouts",
            methodType: "list",
          }),
          cancel: oI({
            method: "POST",
            fullPath: "/v1/payouts/{payout}/cancel",
          }),
          reverse: oI({
            method: "POST",
            fullPath: "/v1/payouts/{payout}/reverse",
          }),
        }),
        oq = ep.method,
        oM = ep.extend({
          create: oq({ method: "POST", fullPath: "/v1/plans" }),
          retrieve: oq({ method: "GET", fullPath: "/v1/plans/{plan}" }),
          update: oq({ method: "POST", fullPath: "/v1/plans/{plan}" }),
          list: oq({
            method: "GET",
            fullPath: "/v1/plans",
            methodType: "list",
          }),
          del: oq({ method: "DELETE", fullPath: "/v1/plans/{plan}" }),
        }),
        oL = ep.method,
        oH = ep.extend({
          create: oL({ method: "POST", fullPath: "/v1/prices" }),
          retrieve: oL({ method: "GET", fullPath: "/v1/prices/{price}" }),
          update: oL({ method: "POST", fullPath: "/v1/prices/{price}" }),
          list: oL({
            method: "GET",
            fullPath: "/v1/prices",
            methodType: "list",
          }),
          search: oL({
            method: "GET",
            fullPath: "/v1/prices/search",
            methodType: "search",
          }),
        }),
        oU = ep.method,
        oF = ep.extend({
          create: oU({ method: "POST", fullPath: "/v1/products" }),
          retrieve: oU({ method: "GET", fullPath: "/v1/products/{id}" }),
          update: oU({ method: "POST", fullPath: "/v1/products/{id}" }),
          list: oU({
            method: "GET",
            fullPath: "/v1/products",
            methodType: "list",
          }),
          del: oU({ method: "DELETE", fullPath: "/v1/products/{id}" }),
          createFeature: oU({
            method: "POST",
            fullPath: "/v1/products/{product}/features",
          }),
          deleteFeature: oU({
            method: "DELETE",
            fullPath: "/v1/products/{product}/features/{id}",
          }),
          listFeatures: oU({
            method: "GET",
            fullPath: "/v1/products/{product}/features",
            methodType: "list",
          }),
          retrieveFeature: oU({
            method: "GET",
            fullPath: "/v1/products/{product}/features/{id}",
          }),
          search: oU({
            method: "GET",
            fullPath: "/v1/products/search",
            methodType: "search",
          }),
        }),
        o$ = ep.method,
        oz = ep.extend({
          create: o$({ method: "POST", fullPath: "/v1/promotion_codes" }),
          retrieve: o$({
            method: "GET",
            fullPath: "/v1/promotion_codes/{promotion_code}",
          }),
          update: o$({
            method: "POST",
            fullPath: "/v1/promotion_codes/{promotion_code}",
          }),
          list: o$({
            method: "GET",
            fullPath: "/v1/promotion_codes",
            methodType: "list",
          }),
        }),
        oB = ep.method,
        oK = ep.extend({
          create: oB({ method: "POST", fullPath: "/v1/quotes" }),
          retrieve: oB({ method: "GET", fullPath: "/v1/quotes/{quote}" }),
          update: oB({ method: "POST", fullPath: "/v1/quotes/{quote}" }),
          list: oB({
            method: "GET",
            fullPath: "/v1/quotes",
            methodType: "list",
          }),
          accept: oB({ method: "POST", fullPath: "/v1/quotes/{quote}/accept" }),
          cancel: oB({ method: "POST", fullPath: "/v1/quotes/{quote}/cancel" }),
          finalizeQuote: oB({
            method: "POST",
            fullPath: "/v1/quotes/{quote}/finalize",
          }),
          listComputedUpfrontLineItems: oB({
            method: "GET",
            fullPath: "/v1/quotes/{quote}/computed_upfront_line_items",
            methodType: "list",
          }),
          listLineItems: oB({
            method: "GET",
            fullPath: "/v1/quotes/{quote}/line_items",
            methodType: "list",
          }),
          pdf: oB({
            method: "GET",
            fullPath: "/v1/quotes/{quote}/pdf",
            host: "files.stripe.com",
            streaming: !0,
          }),
        }),
        oW = ep.method,
        oV = ep.extend({
          create: oW({ method: "POST", fullPath: "/v1/refunds" }),
          retrieve: oW({ method: "GET", fullPath: "/v1/refunds/{refund}" }),
          update: oW({ method: "POST", fullPath: "/v1/refunds/{refund}" }),
          list: oW({
            method: "GET",
            fullPath: "/v1/refunds",
            methodType: "list",
          }),
          cancel: oW({
            method: "POST",
            fullPath: "/v1/refunds/{refund}/cancel",
          }),
        }),
        oJ = ep.method,
        oQ = ep.extend({
          retrieve: oJ({ method: "GET", fullPath: "/v1/reviews/{review}" }),
          list: oJ({
            method: "GET",
            fullPath: "/v1/reviews",
            methodType: "list",
          }),
          approve: oJ({
            method: "POST",
            fullPath: "/v1/reviews/{review}/approve",
          }),
        }),
        oX = ep.method,
        oY = ep.extend({
          list: oX({
            method: "GET",
            fullPath: "/v1/setup_attempts",
            methodType: "list",
          }),
        }),
        oZ = ep.method,
        o1 = ep.extend({
          create: oZ({ method: "POST", fullPath: "/v1/setup_intents" }),
          retrieve: oZ({
            method: "GET",
            fullPath: "/v1/setup_intents/{intent}",
          }),
          update: oZ({
            method: "POST",
            fullPath: "/v1/setup_intents/{intent}",
          }),
          list: oZ({
            method: "GET",
            fullPath: "/v1/setup_intents",
            methodType: "list",
          }),
          cancel: oZ({
            method: "POST",
            fullPath: "/v1/setup_intents/{intent}/cancel",
          }),
          confirm: oZ({
            method: "POST",
            fullPath: "/v1/setup_intents/{intent}/confirm",
          }),
          verifyMicrodeposits: oZ({
            method: "POST",
            fullPath: "/v1/setup_intents/{intent}/verify_microdeposits",
          }),
        }),
        o0 = ep.method,
        o2 = ep.extend({
          create: o0({ method: "POST", fullPath: "/v1/shipping_rates" }),
          retrieve: o0({
            method: "GET",
            fullPath: "/v1/shipping_rates/{shipping_rate_token}",
          }),
          update: o0({
            method: "POST",
            fullPath: "/v1/shipping_rates/{shipping_rate_token}",
          }),
          list: o0({
            method: "GET",
            fullPath: "/v1/shipping_rates",
            methodType: "list",
          }),
        }),
        o8 = ep.method,
        o5 = ep.extend({
          create: o8({ method: "POST", fullPath: "/v1/sources" }),
          retrieve: o8({ method: "GET", fullPath: "/v1/sources/{source}" }),
          update: o8({ method: "POST", fullPath: "/v1/sources/{source}" }),
          listSourceTransactions: o8({
            method: "GET",
            fullPath: "/v1/sources/{source}/source_transactions",
            methodType: "list",
          }),
          verify: o8({
            method: "POST",
            fullPath: "/v1/sources/{source}/verify",
          }),
        }),
        o3 = ep.method,
        o6 = ep.extend({
          create: o3({ method: "POST", fullPath: "/v1/subscription_items" }),
          retrieve: o3({
            method: "GET",
            fullPath: "/v1/subscription_items/{item}",
          }),
          update: o3({
            method: "POST",
            fullPath: "/v1/subscription_items/{item}",
          }),
          list: o3({
            method: "GET",
            fullPath: "/v1/subscription_items",
            methodType: "list",
          }),
          del: o3({
            method: "DELETE",
            fullPath: "/v1/subscription_items/{item}",
          }),
          createUsageRecord: o3({
            method: "POST",
            fullPath:
              "/v1/subscription_items/{subscription_item}/usage_records",
          }),
          listUsageRecordSummaries: o3({
            method: "GET",
            fullPath:
              "/v1/subscription_items/{subscription_item}/usage_record_summaries",
            methodType: "list",
          }),
        }),
        o9 = ep.method,
        o4 = ep.extend({
          create: o9({
            method: "POST",
            fullPath: "/v1/subscription_schedules",
          }),
          retrieve: o9({
            method: "GET",
            fullPath: "/v1/subscription_schedules/{schedule}",
          }),
          update: o9({
            method: "POST",
            fullPath: "/v1/subscription_schedules/{schedule}",
          }),
          list: o9({
            method: "GET",
            fullPath: "/v1/subscription_schedules",
            methodType: "list",
          }),
          cancel: o9({
            method: "POST",
            fullPath: "/v1/subscription_schedules/{schedule}/cancel",
          }),
          release: o9({
            method: "POST",
            fullPath: "/v1/subscription_schedules/{schedule}/release",
          }),
        }),
        o7 = ep.method,
        ne = ep.extend({
          create: o7({ method: "POST", fullPath: "/v1/subscriptions" }),
          retrieve: o7({
            method: "GET",
            fullPath: "/v1/subscriptions/{subscription_exposed_id}",
          }),
          update: o7({
            method: "POST",
            fullPath: "/v1/subscriptions/{subscription_exposed_id}",
          }),
          list: o7({
            method: "GET",
            fullPath: "/v1/subscriptions",
            methodType: "list",
          }),
          cancel: o7({
            method: "DELETE",
            fullPath: "/v1/subscriptions/{subscription_exposed_id}",
          }),
          deleteDiscount: o7({
            method: "DELETE",
            fullPath: "/v1/subscriptions/{subscription_exposed_id}/discount",
          }),
          resume: o7({
            method: "POST",
            fullPath: "/v1/subscriptions/{subscription}/resume",
          }),
          search: o7({
            method: "GET",
            fullPath: "/v1/subscriptions/search",
            methodType: "search",
          }),
        }),
        nt = ep.method,
        nr = ep.extend({
          retrieve: nt({ method: "GET", fullPath: "/v1/tax_codes/{id}" }),
          list: nt({
            method: "GET",
            fullPath: "/v1/tax_codes",
            methodType: "list",
          }),
        }),
        no = ep.method,
        nn = ep.extend({
          create: no({ method: "POST", fullPath: "/v1/tax_ids" }),
          retrieve: no({ method: "GET", fullPath: "/v1/tax_ids/{id}" }),
          list: no({
            method: "GET",
            fullPath: "/v1/tax_ids",
            methodType: "list",
          }),
          del: no({ method: "DELETE", fullPath: "/v1/tax_ids/{id}" }),
        }),
        ni = ep.method,
        na = ep.extend({
          create: ni({ method: "POST", fullPath: "/v1/tax_rates" }),
          retrieve: ni({ method: "GET", fullPath: "/v1/tax_rates/{tax_rate}" }),
          update: ni({ method: "POST", fullPath: "/v1/tax_rates/{tax_rate}" }),
          list: ni({
            method: "GET",
            fullPath: "/v1/tax_rates",
            methodType: "list",
          }),
        }),
        ns = ep.method,
        nl = ep.extend({
          create: ns({ method: "POST", fullPath: "/v1/tokens" }),
          retrieve: ns({ method: "GET", fullPath: "/v1/tokens/{token}" }),
        }),
        nu = ep.method,
        nd = ep.extend({
          create: nu({ method: "POST", fullPath: "/v1/topups" }),
          retrieve: nu({ method: "GET", fullPath: "/v1/topups/{topup}" }),
          update: nu({ method: "POST", fullPath: "/v1/topups/{topup}" }),
          list: nu({
            method: "GET",
            fullPath: "/v1/topups",
            methodType: "list",
          }),
          cancel: nu({ method: "POST", fullPath: "/v1/topups/{topup}/cancel" }),
        }),
        nc = ep.method,
        nh = ep.extend({
          create: nc({ method: "POST", fullPath: "/v1/transfers" }),
          retrieve: nc({ method: "GET", fullPath: "/v1/transfers/{transfer}" }),
          update: nc({ method: "POST", fullPath: "/v1/transfers/{transfer}" }),
          list: nc({
            method: "GET",
            fullPath: "/v1/transfers",
            methodType: "list",
          }),
          createReversal: nc({
            method: "POST",
            fullPath: "/v1/transfers/{id}/reversals",
          }),
          listReversals: nc({
            method: "GET",
            fullPath: "/v1/transfers/{id}/reversals",
            methodType: "list",
          }),
          retrieveReversal: nc({
            method: "GET",
            fullPath: "/v1/transfers/{transfer}/reversals/{id}",
          }),
          updateReversal: nc({
            method: "POST",
            fullPath: "/v1/transfers/{transfer}/reversals/{id}",
          }),
        }),
        np = ep.method,
        nm = ep.extend({
          create: np({ method: "POST", fullPath: "/v1/webhook_endpoints" }),
          retrieve: np({
            method: "GET",
            fullPath: "/v1/webhook_endpoints/{webhook_endpoint}",
          }),
          update: np({
            method: "POST",
            fullPath: "/v1/webhook_endpoints/{webhook_endpoint}",
          }),
          list: np({
            method: "GET",
            fullPath: "/v1/webhook_endpoints",
            methodType: "list",
          }),
          del: np({
            method: "DELETE",
            fullPath: "/v1/webhook_endpoints/{webhook_endpoint}",
          }),
        }),
        nf = ev("apps", { Secrets: rr }),
        nv = ev("billing", {
          Alerts: eE,
          CreditBalanceSummary: ez,
          CreditBalanceTransactions: eK,
          CreditGrants: eV,
          MeterEventAdjustments: td,
          MeterEvents: tP,
          Meters: tE,
        }),
        ny = ev("billingPortal", { Configurations: eN, Sessions: rn }),
        nP = ev("checkout", { Sessions: ra }),
        ng = ev("climate", { Orders: tS, Products: tH, Suppliers: rh }),
        nT = ev("entitlements", { ActiveEntitlements: eT, Features: te }),
        n_ = ev("financialConnections", {
          Accounts: eP,
          Sessions: rl,
          Transactions: rE,
        }),
        nE = ev("forwarding", { Requests: t4 }),
        nb = ev("identity", {
          VerificationReports: rD,
          VerificationSessions: rN,
        }),
        nS = ev("issuing", {
          Authorizations: ex,
          Cardholders: eG,
          Cards: eD,
          Disputes: e2,
          PersonalizationDesigns: tN,
          PhysicalBundles: tM,
          Tokens: rv,
          Transactions: rS,
        }),
        nO = ev("radar", {
          EarlyFraudWarnings: e5,
          ValueListItems: rG,
          ValueLists: rj,
        }),
        nx = ev("reporting", { ReportRuns: t5, ReportTypes: t6 }),
        nw = ev("sigma", { ScheduledQueryRuns: re }),
        nA = ev("tax", {
          Calculations: eA,
          Registrations: t2,
          Settings: rd,
          Transactions: rx,
        }),
        nC = ev("terminal", {
          Configurations: eM,
          ConnectionTokens: eF,
          Locations: tl,
          Readers: tz,
        }),
        nG = ev("testHelpers", {
          ConfirmationTokens: eH,
          Customers: eY,
          Refunds: t1,
          TestClocks: rm,
          Issuing: ev("issuing", {
            Authorizations: eS,
            Cards: ej,
            PersonalizationDesigns: tD,
            Transactions: rT,
          }),
          Terminal: ev("terminal", { Readers: tF }),
          Treasury: ev("treasury", {
            InboundTransfers: tn,
            OutboundPayments: tx,
            OutboundTransfers: tG,
            ReceivedCredits: tK,
            ReceivedDebits: tQ,
          }),
        }),
        nR = ev("treasury", {
          CreditReversals: eQ,
          DebitReversals: e1,
          FinancialAccounts: tr,
          InboundTransfers: ta,
          OutboundPayments: tA,
          OutboundTransfers: tj,
          ReceivedCredits: tV,
          ReceivedDebits: tY,
          TransactionEntries: rP,
          Transactions: rA,
        }),
        nj = ev("v2", {
          Billing: ev("billing", {
            MeterEventAdjustments: th,
            MeterEventSession: tm,
            MeterEventStream: tv,
            MeterEvents: tT,
          }),
          Core: ev("core", { EventDestinations: e6, Events: e4 }),
        }),
        nk = "api.stripe.com",
        nD = "/v1/",
        nI = "2025-02-24.acacia",
        nN = ["name", "version", "url", "partner_id"],
        nq = [
          "authenticator",
          "apiVersion",
          "typescript",
          "maxNetworkRetries",
          "httpAgent",
          "httpClient",
          "timeout",
          "host",
          "port",
          "protocol",
          "telemetry",
          "appInfo",
          "stripeAccount",
          "stripeContext",
        ],
        nM = (e) => new ei(e, ep.MAX_BUFFERED_REQUEST_METRICS),
        nL = (function (e, t = nM) {
          function r(t = e) {
            return em(t);
          }
          function i(n, a = {}) {
            if (!(this instanceof i)) return new i(n, a);
            let s = this._getPropsFromConfig(a);
            (this._platformFunctions = e),
              Object.defineProperty(this, "_emitter", {
                value: this._platformFunctions.createEmitter(),
                enumerable: !1,
                configurable: !1,
                writable: !1,
              }),
              (this.VERSION = i.PACKAGE_VERSION),
              (this.on = this._emitter.on.bind(this._emitter)),
              (this.once = this._emitter.once.bind(this._emitter)),
              (this.off = this._emitter.removeListener.bind(this._emitter));
            let l = s.httpAgent || null;
            this._api = {
              host: s.host || nk,
              port: s.port || "443",
              protocol: s.protocol || "https",
              basePath: nD,
              version: s.apiVersion || nI,
              timeout: Y("timeout", s.timeout, 8e4),
              maxNetworkRetries: Y("maxNetworkRetries", s.maxNetworkRetries, 2),
              agent: l,
              httpClient:
                s.httpClient ||
                (l
                  ? this._platformFunctions.createNodeHttpClient(l)
                  : this._platformFunctions.createDefaultHttpClient()),
              dev: !1,
              stripeAccount: s.stripeAccount || null,
              stripeContext: s.stripeContext || null,
            };
            let u = s.typescript || !1;
            u !== i.USER_AGENT.typescript && (i.USER_AGENT.typescript = u),
              s.appInfo && this._setAppInfo(s.appInfo),
              this._prepResources(),
              this._setAuthenticator(n, s.authenticator),
              (this.errors = o),
              (this.webhooks = r()),
              (this._prevRequestMetrics = []),
              (this._enableTelemetry = !1 !== s.telemetry),
              (this._requestSender = t(this)),
              (this.StripeResource = i.StripeResource);
          }
          return (
            (i.PACKAGE_VERSION = "17.7.0"),
            (i.USER_AGENT = Object.assign(
              {
                bindings_version: i.PACKAGE_VERSION,
                lang: "node",
                publisher: "stripe",
                uname: null,
                typescript: !1,
              },
              "undefined" == typeof process
                ? {}
                : { lang_version: process.version, platform: process.platform },
            )),
            (i.StripeResource = ep),
            (i.resources = n),
            (i.HttpClient = m),
            (i.HttpClientResponse = f),
            (i.CryptoProvider = s),
            (i.webhooks = Object.assign(r, em(e))),
            (i.errors = o),
            (i.createNodeHttpClient = e.createNodeHttpClient),
            (i.createFetchHttpClient = e.createFetchHttpClient),
            (i.createNodeCryptoProvider = e.createNodeCryptoProvider),
            (i.createSubtleCryptoProvider = e.createSubtleCryptoProvider),
            (i.prototype = {
              _appInfo: void 0,
              on: null,
              off: null,
              once: null,
              VERSION: null,
              StripeResource: null,
              webhooks: null,
              errors: null,
              _api: null,
              _prevRequestMetrics: null,
              _emitter: null,
              _enableTelemetry: null,
              _requestSender: null,
              _platformFunctions: null,
              rawRequest(e, t, r, o) {
                return this._requestSender._rawRequest(e, t, r, o);
              },
              _setAuthenticator(e, t) {
                if (e && t)
                  throw Error("Can't specify both apiKey and authenticator");
                if (!e && !t)
                  throw Error(
                    "Neither apiKey nor config.authenticator provided",
                  );
                this._authenticator = e ? Z(e) : t;
              },
              _setAppInfo(e) {
                if (e && "object" != typeof e)
                  throw Error("AppInfo must be an object.");
                if (e && !e.name) throw Error("AppInfo.name is required");
                (e = e || {}),
                  (this._appInfo = nN.reduce(
                    (t, r) => (
                      "string" == typeof e[r] && ((t = t || {})[r] = e[r]), t
                    ),
                    void 0,
                  ));
              },
              _setApiField(e, t) {
                this._api[e] = t;
              },
              getApiField(e) {
                return this._api[e];
              },
              setClientId(e) {
                this._clientId = e;
              },
              getClientId() {
                return this._clientId;
              },
              getConstant: (e) => {
                switch (e) {
                  case "DEFAULT_HOST":
                    return nk;
                  case "DEFAULT_PORT":
                    return "443";
                  case "DEFAULT_BASE_PATH":
                    return nD;
                  case "DEFAULT_API_VERSION":
                    return nI;
                  case "DEFAULT_TIMEOUT":
                    return 8e4;
                  case "MAX_NETWORK_RETRY_DELAY_SEC":
                    return 5;
                  case "INITIAL_NETWORK_RETRY_DELAY_SEC":
                    return 0.5;
                }
                return i[e];
              },
              getMaxNetworkRetries() {
                return this.getApiField("maxNetworkRetries");
              },
              _setApiNumberField(e, t, r) {
                let o = Y(e, t, r);
                this._setApiField(e, o);
              },
              getMaxNetworkRetryDelay: () => 5,
              getInitialNetworkRetryDelay: () => 0.5,
              getClientUserAgent(e) {
                return this.getClientUserAgentSeeded(i.USER_AGENT, e);
              },
              getClientUserAgentSeeded(e, t) {
                this._platformFunctions.getUname().then((r) => {
                  var o;
                  let n = {};
                  for (let t in e)
                    Object.prototype.hasOwnProperty.call(e, t) &&
                      (n[t] = encodeURIComponent(
                        null != (o = e[t]) ? o : "null",
                      ));
                  n.uname = encodeURIComponent(r || "UNKNOWN");
                  let i = this.getApiField("httpClient");
                  i && (n.httplib = encodeURIComponent(i.getClientName())),
                    this._appInfo && (n.application = this._appInfo),
                    t(JSON.stringify(n));
                });
              },
              getAppInfoAsString() {
                if (!this._appInfo) return "";
                let e = this._appInfo.name;
                return (
                  this._appInfo.version && (e += `/${this._appInfo.version}`),
                  this._appInfo.url && (e += ` (${this._appInfo.url})`),
                  e
                );
              },
              getTelemetryEnabled() {
                return this._enableTelemetry;
              },
              _prepResources() {
                for (let e in n)
                  Object.prototype.hasOwnProperty.call(n, e) &&
                    (this[
                      "OAuth" === e
                        ? "oauth"
                        : e[0].toLowerCase() + e.substring(1)
                    ] = new n[e](this));
              },
              _getPropsFromConfig(e) {
                if (!e) return {};
                let t = "string" == typeof e;
                if (!(e === Object(e) && !Array.isArray(e)) && !t)
                  throw Error("Config must either be an object or a string");
                if (t) return { apiVersion: e };
                if (Object.keys(e).filter((e) => !nq.includes(e)).length > 0)
                  throw Error(
                    `Config object may only contain the following: ${nq.join(", ")}`,
                  );
                return e;
              },
              parseThinEvent(e, t, r, o, n, i) {
                return this.webhooks.constructEvent(e, t, r, o, n, i);
              },
            }),
            i
          );
        })(new en());
    },
    76387: (e, t, r) => {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 }),
        Object.defineProperty(
          t,
          "createDedupedByCallsiteServerErrorLoggerDev",
          {
            enumerable: !0,
            get: function () {
              return l;
            },
          },
        );
      let o = (function (e, t) {
        if (e && e.__esModule) return e;
        if (null === e || ("object" != typeof e && "function" != typeof e))
          return { default: e };
        var r = n(t);
        if (r && r.has(e)) return r.get(e);
        var o = { __proto__: null },
          i = Object.defineProperty && Object.getOwnPropertyDescriptor;
        for (var a in e)
          if ("default" !== a && Object.prototype.hasOwnProperty.call(e, a)) {
            var s = i ? Object.getOwnPropertyDescriptor(e, a) : null;
            s && (s.get || s.set)
              ? Object.defineProperty(o, a, s)
              : (o[a] = e[a]);
          }
        return (o.default = e), r && r.set(e, o), o;
      })(r(84147));
      function n(e) {
        if ("function" != typeof WeakMap) return null;
        var t = new WeakMap(),
          r = new WeakMap();
        return (n = function (e) {
          return e ? r : t;
        })(e);
      }
      let i = { current: null },
        a = "function" == typeof o.cache ? o.cache : (e) => e,
        s = console.warn;
      function l(e) {
        return function (...t) {
          s(e(...t));
        };
      }
      a((e) => {
        try {
          s(i.current);
        } finally {
          i.current = null;
        }
      });
    },
    77680: (e, t, r) => {
      "use strict";
      var o = r(55213),
        n = r(31391);
      e.exports = { formats: r(10576), parse: n, stringify: o };
    },
    90020: (e, t, r) => {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 }),
        !(function (e, t) {
          for (var r in t)
            Object.defineProperty(e, r, { enumerable: !0, get: t[r] });
        })(t, {
          isRequestAPICallableInsideAfter: function () {
            return l;
          },
          throwForSearchParamsAccessInUseCache: function () {
            return s;
          },
          throwWithStaticGenerationBailoutError: function () {
            return i;
          },
          throwWithStaticGenerationBailoutErrorWithDynamicError: function () {
            return a;
          },
        });
      let o = r(57154),
        n = r(3295);
      function i(e, t) {
        throw Object.defineProperty(
          new o.StaticGenBailoutError(
            `Route ${e} couldn't be rendered statically because it used ${t}. See more info here: https://nextjs.org/docs/app/building-your-application/rendering/static-and-dynamic#dynamic-rendering`,
          ),
          "__NEXT_ERROR_CODE",
          { value: "E576", enumerable: !1, configurable: !0 },
        );
      }
      function a(e, t) {
        throw Object.defineProperty(
          new o.StaticGenBailoutError(
            `Route ${e} with \`dynamic = "error"\` couldn't be rendered statically because it used ${t}. See more info here: https://nextjs.org/docs/app/building-your-application/rendering/static-and-dynamic#dynamic-rendering`,
          ),
          "__NEXT_ERROR_CODE",
          { value: "E543", enumerable: !1, configurable: !0 },
        );
      }
      function s(e) {
        throw Object.defineProperty(
          Error(
            `Route ${e} used "searchParams" inside "use cache". Accessing Dynamic data sources inside a cache scope is not supported. If you need this data inside a cached function use "searchParams" outside of the cached function and pass the required dynamic data in as an argument. See more info here: https://nextjs.org/docs/messages/next-request-in-use-cache`,
          ),
          "__NEXT_ERROR_CODE",
          { value: "E634", enumerable: !1, configurable: !0 },
        );
      }
      function l() {
        let e = n.afterTaskAsyncStorage.getStore();
        return (null == e ? void 0 : e.rootTaskSpawnPhase) === "action";
      }
    },
    92254: (e, t, r) => {
      e.exports = r(28354).inspect;
    },
    93186: (e, t, r) => {
      var o = "function" == typeof Map && Map.prototype,
        n =
          Object.getOwnPropertyDescriptor && o
            ? Object.getOwnPropertyDescriptor(Map.prototype, "size")
            : null,
        i = o && n && "function" == typeof n.get ? n.get : null,
        a = o && Map.prototype.forEach,
        s = "function" == typeof Set && Set.prototype,
        l =
          Object.getOwnPropertyDescriptor && s
            ? Object.getOwnPropertyDescriptor(Set.prototype, "size")
            : null,
        u = s && l && "function" == typeof l.get ? l.get : null,
        d = s && Set.prototype.forEach,
        c =
          "function" == typeof WeakMap && WeakMap.prototype
            ? WeakMap.prototype.has
            : null,
        h =
          "function" == typeof WeakSet && WeakSet.prototype
            ? WeakSet.prototype.has
            : null,
        p =
          "function" == typeof WeakRef && WeakRef.prototype
            ? WeakRef.prototype.deref
            : null,
        m = Boolean.prototype.valueOf,
        f = Object.prototype.toString,
        v = Function.prototype.toString,
        y = String.prototype.match,
        P = String.prototype.slice,
        g = String.prototype.replace,
        T = String.prototype.toUpperCase,
        _ = String.prototype.toLowerCase,
        E = RegExp.prototype.test,
        b = Array.prototype.concat,
        S = Array.prototype.join,
        O = Array.prototype.slice,
        x = Math.floor,
        w = "function" == typeof BigInt ? BigInt.prototype.valueOf : null,
        A = Object.getOwnPropertySymbols,
        C =
          "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
            ? Symbol.prototype.toString
            : null,
        G = "function" == typeof Symbol && "object" == typeof Symbol.iterator,
        R =
          "function" == typeof Symbol &&
          Symbol.toStringTag &&
          (typeof Symbol.toStringTag === G ? "object" : "symbol")
            ? Symbol.toStringTag
            : null,
        j = Object.prototype.propertyIsEnumerable,
        k =
          ("function" == typeof Reflect
            ? Reflect.getPrototypeOf
            : Object.getPrototypeOf) ||
          ([].__proto__ === Array.prototype
            ? function (e) {
                return e.__proto__;
              }
            : null);
      function D(e, t) {
        if (
          e === 1 / 0 ||
          e === -1 / 0 ||
          e != e ||
          (e && e > -1e3 && e < 1e3) ||
          E.call(/e/, t)
        )
          return t;
        var r = /[0-9](?=(?:[0-9]{3})+(?![0-9]))/g;
        if ("number" == typeof e) {
          var o = e < 0 ? -x(-e) : x(e);
          if (o !== e) {
            var n = String(o),
              i = P.call(t, n.length + 1);
            return (
              g.call(n, r, "$&_") +
              "." +
              g.call(g.call(i, /([0-9]{3})/g, "$&_"), /_$/, "")
            );
          }
        }
        return g.call(t, r, "$&_");
      }
      var I = r(92254),
        N = I.custom,
        q = z(N) ? N : null,
        M = { __proto__: null, double: '"', single: "'" },
        L = { __proto__: null, double: /(["\\])/g, single: /(['\\])/g };
      function H(e, t, r) {
        var o = M[r.quoteStyle || t];
        return o + e + o;
      }
      function U(e) {
        return !R || !("object" == typeof e && (R in e || void 0 !== e[R]));
      }
      function F(e) {
        return "[object Array]" === W(e) && U(e);
      }
      function $(e) {
        return "[object RegExp]" === W(e) && U(e);
      }
      function z(e) {
        if (G) return e && "object" == typeof e && e instanceof Symbol;
        if ("symbol" == typeof e) return !0;
        if (!e || "object" != typeof e || !C) return !1;
        try {
          return C.call(e), !0;
        } catch (e) {}
        return !1;
      }
      e.exports = function e(t, r, o, n) {
        var s,
          l,
          f,
          T,
          E,
          x = r || {};
        if (K(x, "quoteStyle") && !K(M, x.quoteStyle))
          throw TypeError('option "quoteStyle" must be "single" or "double"');
        if (
          K(x, "maxStringLength") &&
          ("number" == typeof x.maxStringLength
            ? x.maxStringLength < 0 && x.maxStringLength !== 1 / 0
            : null !== x.maxStringLength)
        )
          throw TypeError(
            'option "maxStringLength", if provided, must be a positive integer, Infinity, or `null`',
          );
        var A = !K(x, "customInspect") || x.customInspect;
        if ("boolean" != typeof A && "symbol" !== A)
          throw TypeError(
            "option \"customInspect\", if provided, must be `true`, `false`, or `'symbol'`",
          );
        if (
          K(x, "indent") &&
          null !== x.indent &&
          "	" !== x.indent &&
          !(parseInt(x.indent, 10) === x.indent && x.indent > 0)
        )
          throw TypeError(
            'option "indent" must be "\\t", an integer > 0, or `null`',
          );
        if (K(x, "numericSeparator") && "boolean" != typeof x.numericSeparator)
          throw TypeError(
            'option "numericSeparator", if provided, must be `true` or `false`',
          );
        var N = x.numericSeparator;
        if (void 0 === t) return "undefined";
        if (null === t) return "null";
        if ("boolean" == typeof t) return t ? "true" : "false";
        if ("string" == typeof t)
          return (function e(t, r) {
            if (t.length > r.maxStringLength) {
              var o = t.length - r.maxStringLength;
              return (
                e(P.call(t, 0, r.maxStringLength), r) +
                ("... " + o) +
                " more character" +
                (o > 1 ? "s" : "")
              );
            }
            var n = L[r.quoteStyle || "single"];
            return (
              (n.lastIndex = 0),
              H(g.call(g.call(t, n, "\\$1"), /[\x00-\x1f]/g, J), "single", r)
            );
          })(t, x);
        if ("number" == typeof t) {
          if (0 === t) return 1 / 0 / t > 0 ? "0" : "-0";
          var B = String(t);
          return N ? D(t, B) : B;
        }
        if ("bigint" == typeof t) {
          var et = String(t) + "n";
          return N ? D(t, et) : et;
        }
        var er = void 0 === x.depth ? 5 : x.depth;
        if (
          (void 0 === o && (o = 0), o >= er && er > 0 && "object" == typeof t)
        )
          return F(t) ? "[Array]" : "[Object]";
        var eo = (function (e, t) {
          var r;
          if ("	" === e.indent) r = "	";
          else {
            if ("number" != typeof e.indent || !(e.indent > 0)) return null;
            r = S.call(Array(e.indent + 1), " ");
          }
          return { base: r, prev: S.call(Array(t + 1), r) };
        })(x, o);
        if (void 0 === n) n = [];
        else if (V(n, t) >= 0) return "[Circular]";
        function en(t, r, i) {
          if ((r && (n = O.call(n)).push(r), i)) {
            var a = { depth: x.depth };
            return (
              K(x, "quoteStyle") && (a.quoteStyle = x.quoteStyle),
              e(t, a, o + 1, n)
            );
          }
          return e(t, x, o + 1, n);
        }
        if ("function" == typeof t && !$(t)) {
          var ei = (function (e) {
              if (e.name) return e.name;
              var t = y.call(v.call(e), /^function\s*([\w$]+)/);
              return t ? t[1] : null;
            })(t),
            ea = ee(t, en);
          return (
            "[Function" +
            (ei ? ": " + ei : " (anonymous)") +
            "]" +
            (ea.length > 0 ? " { " + S.call(ea, ", ") + " }" : "")
          );
        }
        if (z(t)) {
          var es = G
            ? g.call(String(t), /^(Symbol\(.*\))_[^)]*$/, "$1")
            : C.call(t);
          return "object" != typeof t || G ? es : Q(es);
        }
        if (
          (el = t) &&
          "object" == typeof el &&
          (("undefined" != typeof HTMLElement && el instanceof HTMLElement) ||
            ("string" == typeof el.nodeName &&
              "function" == typeof el.getAttribute))
        ) {
          for (
            var el,
              eu,
              ed = "<" + _.call(String(t.nodeName)),
              ec = t.attributes || [],
              eh = 0;
            eh < ec.length;
            eh++
          ) {
            ed +=
              " " +
              ec[eh].name +
              "=" +
              H(
                ((eu = ec[eh].value), g.call(String(eu), /"/g, "&quot;")),
                "double",
                x,
              );
          }
          return (
            (ed += ">"),
            t.childNodes && t.childNodes.length && (ed += "..."),
            (ed += "</" + _.call(String(t.nodeName)) + ">")
          );
        }
        if (F(t)) {
          if (0 === t.length) return "[]";
          var ep = ee(t, en);
          return eo &&
            !(function (e) {
              for (var t = 0; t < e.length; t++)
                if (V(e[t], "\n") >= 0) return !1;
              return !0;
            })(ep)
            ? "[" + Z(ep, eo) + "]"
            : "[ " + S.call(ep, ", ") + " ]";
        }
        if ("[object Error]" === W((s = t)) && U(s)) {
          var em = ee(t, en);
          return "cause" in Error.prototype ||
            !("cause" in t) ||
            j.call(t, "cause")
            ? 0 === em.length
              ? "[" + String(t) + "]"
              : "{ [" + String(t) + "] " + S.call(em, ", ") + " }"
            : "{ [" +
                String(t) +
                "] " +
                S.call(b.call("[cause]: " + en(t.cause), em), ", ") +
                " }";
        }
        if ("object" == typeof t && A) {
          if (q && "function" == typeof t[q] && I)
            return I(t, { depth: er - o });
          else if ("symbol" !== A && "function" == typeof t.inspect)
            return t.inspect();
        }
        if (
          (function (e) {
            if (!i || !e || "object" != typeof e) return !1;
            try {
              i.call(e);
              try {
                u.call(e);
              } catch (e) {
                return !0;
              }
              return e instanceof Map;
            } catch (e) {}
            return !1;
          })(t)
        ) {
          var ef = [];
          return (
            a &&
              a.call(t, function (e, r) {
                ef.push(en(r, t, !0) + " => " + en(e, t));
              }),
            Y("Map", i.call(t), ef, eo)
          );
        }
        if (
          (function (e) {
            if (!u || !e || "object" != typeof e) return !1;
            try {
              u.call(e);
              try {
                i.call(e);
              } catch (e) {
                return !0;
              }
              return e instanceof Set;
            } catch (e) {}
            return !1;
          })(t)
        ) {
          var ev = [];
          return (
            d &&
              d.call(t, function (e) {
                ev.push(en(e, t));
              }),
            Y("Set", u.call(t), ev, eo)
          );
        }
        if (
          (function (e) {
            if (!c || !e || "object" != typeof e) return !1;
            try {
              c.call(e, c);
              try {
                h.call(e, h);
              } catch (e) {
                return !0;
              }
              return e instanceof WeakMap;
            } catch (e) {}
            return !1;
          })(t)
        )
          return X("WeakMap");
        if (
          (function (e) {
            if (!h || !e || "object" != typeof e) return !1;
            try {
              h.call(e, h);
              try {
                c.call(e, c);
              } catch (e) {
                return !0;
              }
              return e instanceof WeakSet;
            } catch (e) {}
            return !1;
          })(t)
        )
          return X("WeakSet");
        if (
          (function (e) {
            if (!p || !e || "object" != typeof e) return !1;
            try {
              return p.call(e), !0;
            } catch (e) {}
            return !1;
          })(t)
        )
          return X("WeakRef");
        if ("[object Number]" === W((l = t)) && U(l)) return Q(en(Number(t)));
        if (
          (function (e) {
            if (!e || "object" != typeof e || !w) return !1;
            try {
              return w.call(e), !0;
            } catch (e) {}
            return !1;
          })(t)
        )
          return Q(en(w.call(t)));
        if ("[object Boolean]" === W((f = t)) && U(f)) return Q(m.call(t));
        if ("[object String]" === W((T = t)) && U(T)) return Q(en(String(t)));
        if ("undefined" != typeof window && t === window)
          return "{ [object Window] }";
        if (
          ("undefined" != typeof globalThis && t === globalThis) ||
          ("undefined" != typeof global && t === global)
        )
          return "{ [object globalThis] }";
        if (!("[object Date]" === W((E = t)) && U(E)) && !$(t)) {
          var ey = ee(t, en),
            eP = k
              ? k(t) === Object.prototype
              : t instanceof Object || t.constructor === Object,
            eg = t instanceof Object ? "" : "null prototype",
            eT =
              !eP && R && Object(t) === t && R in t
                ? P.call(W(t), 8, -1)
                : eg
                  ? "Object"
                  : "",
            e_ =
              (eP || "function" != typeof t.constructor
                ? ""
                : t.constructor.name
                  ? t.constructor.name + " "
                  : "") +
              (eT || eg
                ? "[" + S.call(b.call([], eT || [], eg || []), ": ") + "] "
                : "");
          return 0 === ey.length
            ? e_ + "{}"
            : eo
              ? e_ + "{" + Z(ey, eo) + "}"
              : e_ + "{ " + S.call(ey, ", ") + " }";
        }
        return String(t);
      };
      var B =
        Object.prototype.hasOwnProperty ||
        function (e) {
          return e in this;
        };
      function K(e, t) {
        return B.call(e, t);
      }
      function W(e) {
        return f.call(e);
      }
      function V(e, t) {
        if (e.indexOf) return e.indexOf(t);
        for (var r = 0, o = e.length; r < o; r++) if (e[r] === t) return r;
        return -1;
      }
      function J(e) {
        var t = e.charCodeAt(0),
          r = { 8: "b", 9: "t", 10: "n", 12: "f", 13: "r" }[t];
        return r
          ? "\\" + r
          : "\\x" + (t < 16 ? "0" : "") + T.call(t.toString(16));
      }
      function Q(e) {
        return "Object(" + e + ")";
      }
      function X(e) {
        return e + " { ? }";
      }
      function Y(e, t, r, o) {
        return e + " (" + t + ") {" + (o ? Z(r, o) : S.call(r, ", ")) + "}";
      }
      function Z(e, t) {
        if (0 === e.length) return "";
        var r = "\n" + t.prev + t.base;
        return r + S.call(e, "," + r) + "\n" + t.prev;
      }
      function ee(e, t) {
        var r,
          o = F(e),
          n = [];
        if (o) {
          n.length = e.length;
          for (var i = 0; i < e.length; i++) n[i] = K(e, i) ? t(e[i], e) : "";
        }
        var a = "function" == typeof A ? A(e) : [];
        if (G) {
          r = {};
          for (var s = 0; s < a.length; s++) r["$" + a[s]] = a[s];
        }
        for (var l in e)
          if (K(e, l) && (!o || String(Number(l)) !== l || !(l < e.length)))
            if (G && r["$" + l] instanceof Symbol) continue;
            else
              E.call(/[^\w$]/, l)
                ? n.push(t(l, e) + ": " + t(e[l], e))
                : n.push(l + ": " + t(e[l], e));
        if ("function" == typeof A)
          for (var u = 0; u < a.length; u++)
            j.call(e, a[u]) && n.push("[" + t(a[u]) + "]: " + t(e[a[u]], e));
        return n;
      }
    },
    99809: (e, t, r) => {
      "use strict";
      var o = r(75431),
        n = r(19570),
        i = r(93186),
        a = r(11747),
        s = o("%Map%", !0),
        l = n("Map.prototype.get", !0),
        u = n("Map.prototype.set", !0),
        d = n("Map.prototype.has", !0),
        c = n("Map.prototype.delete", !0),
        h = n("Map.prototype.size", !0);
      e.exports =
        !!s &&
        function () {
          var e,
            t = {
              assert: function (e) {
                if (!t.has(e))
                  throw new a("Side channel does not contain " + i(e));
              },
              delete: function (t) {
                if (e) {
                  var r = c(e, t);
                  return 0 === h(e) && (e = void 0), r;
                }
                return !1;
              },
              get: function (t) {
                if (e) return l(e, t);
              },
              has: function (t) {
                return !!e && d(e, t);
              },
              set: function (t, r) {
                e || (e = new s()), u(e, t, r);
              },
            };
          return t;
        };
    },
  });
//# sourceMappingURL=3848.js.map
