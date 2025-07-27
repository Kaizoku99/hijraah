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
    (e._sentryDebugIds[t] = "8f061031-4276-446a-b3b9-dd244f6667ec"),
    (e._sentryDebugIdIdentifier =
      "sentry-dbid-8f061031-4276-446a-b3b9-dd244f6667ec"));
} catch (e) {}
("use strict");
(exports.id = 2140),
  (exports.ids = [2140]),
  (exports.modules = {
    32140: (e, t, r) => {
      var n, s, i, o, a;
      r.r(t),
        r.d(t, {
          SuperJSON: () => ee,
          allowErrorProps: () => el,
          default: () => ee,
          deserialize: () => er,
          parse: () => es,
          registerClass: () => ei,
          registerCustom: () => eo,
          registerSymbol: () => ea,
          serialize: () => et,
          stringify: () => en,
        });
      class l {
        constructor() {
          (this.keyToValue = new Map()), (this.valueToKey = new Map());
        }
        set(e, t) {
          this.keyToValue.set(e, t), this.valueToKey.set(t, e);
        }
        getByKey(e) {
          return this.keyToValue.get(e);
        }
        getByValue(e) {
          return this.valueToKey.get(e);
        }
        clear() {
          this.keyToValue.clear(), this.valueToKey.clear();
        }
      }
      class u {
        constructor(e) {
          (this.generateIdentifier = e), (this.kv = new l());
        }
        register(e, t) {
          this.kv.getByValue(e) ||
            (t || (t = this.generateIdentifier(e)), this.kv.set(t, e));
        }
        clear() {
          this.kv.clear();
        }
        getIdentifier(e) {
          return this.kv.getByValue(e);
        }
        getValue(e) {
          return this.kv.getByKey(e);
        }
      }
      class f extends u {
        constructor() {
          super((e) => e.name), (this.classToAllowedProps = new Map());
        }
        register(e, t) {
          "object" == typeof t
            ? (t.allowProps && this.classToAllowedProps.set(e, t.allowProps),
              super.register(e, t.identifier))
            : super.register(e, t);
        }
        getAllowedProps(e) {
          return this.classToAllowedProps.get(e);
        }
      }
      function c(e, t) {
        Object.entries(e).forEach(([e, r]) => t(r, e));
      }
      function p(e, t) {
        return -1 !== e.indexOf(t);
      }
      function d(e, t) {
        for (let r = 0; r < e.length; r++) {
          let n = e[r];
          if (t(n)) return n;
        }
      }
      class y {
        constructor() {
          this.transfomers = {};
        }
        register(e) {
          this.transfomers[e.name] = e;
        }
        findApplicable(e) {
          return (function (e, t) {
            let r = (function (e) {
              if ("values" in Object) return Object.values(e);
              let t = [];
              for (let r in e) e.hasOwnProperty(r) && t.push(e[r]);
              return t;
            })(e);
            if ("find" in r) return r.find(t);
            for (let e = 0; e < r.length; e++) {
              let n = r[e];
              if (t(n)) return n;
            }
          })(this.transfomers, (t) => t.isApplicable(e));
        }
        findByName(e) {
          return this.transfomers[e];
        }
      }
      let g = (e) => Object.prototype.toString.call(e).slice(8, -1),
        m = (e) => void 0 === e,
        b = (e) => null === e,
        h = (e) =>
          "object" == typeof e &&
          null !== e &&
          e !== Object.prototype &&
          (null === Object.getPrototypeOf(e) ||
            Object.getPrototypeOf(e) === Object.prototype),
        w = (e) => h(e) && 0 === Object.keys(e).length,
        I = (e) => Array.isArray(e),
        v = (e) => "string" == typeof e,
        E = (e) => "number" == typeof e && !isNaN(e),
        k = (e) => "boolean" == typeof e,
        O = (e) => e instanceof Map,
        A = (e) => e instanceof Set,
        j = (e) => "Symbol" === g(e),
        P = (e) => "number" == typeof e && isNaN(e),
        T = (e) => k(e) || b(e) || m(e) || E(e) || v(e) || j(e),
        R = (e) => e === 1 / 0 || e === -1 / 0,
        S = (e) => e.replace(/\./g, "\\."),
        z = (e) => e.map(String).map(S).join("."),
        V = (e) => {
          let t = [],
            r = "";
          for (let n = 0; n < e.length; n++) {
            let s = e.charAt(n);
            if ("\\" === s && "." === e.charAt(n + 1)) {
              (r += "."), n++;
              continue;
            }
            if ("." === s) {
              t.push(r), (r = "");
              continue;
            }
            r += s;
          }
          let n = r;
          return t.push(n), t;
        };
      function N(e, t, r, n) {
        return { isApplicable: e, annotation: t, transform: r, untransform: n };
      }
      let _ = [
        N(
          m,
          "undefined",
          () => null,
          () => void 0,
        ),
        N(
          (e) => "bigint" == typeof e,
          "bigint",
          (e) => e.toString(),
          (e) =>
            "undefined" != typeof BigInt
              ? BigInt(e)
              : (console.error("Please add a BigInt polyfill."), e),
        ),
        N(
          (e) => e instanceof Date && !isNaN(e.valueOf()),
          "Date",
          (e) => e.toISOString(),
          (e) => new Date(e),
        ),
        N(
          (e) => e instanceof Error,
          "Error",
          (e, t) => {
            let r = { name: e.name, message: e.message };
            return (
              t.allowedErrorProps.forEach((t) => {
                r[t] = e[t];
              }),
              r
            );
          },
          (e, t) => {
            let r = Error(e.message);
            return (
              (r.name = e.name),
              (r.stack = e.stack),
              t.allowedErrorProps.forEach((t) => {
                r[t] = e[t];
              }),
              r
            );
          },
        ),
        N(
          (e) => e instanceof RegExp,
          "regexp",
          (e) => "" + e,
          (e) =>
            new RegExp(
              e.slice(1, e.lastIndexOf("/")),
              e.slice(e.lastIndexOf("/") + 1),
            ),
        ),
        N(
          A,
          "set",
          (e) => [...e.values()],
          (e) => new Set(e),
        ),
        N(
          O,
          "map",
          (e) => [...e.entries()],
          (e) => new Map(e),
        ),
        N(
          (e) => P(e) || R(e),
          "number",
          (e) => (P(e) ? "NaN" : e > 0 ? "Infinity" : "-Infinity"),
          Number,
        ),
        N(
          (e) => 0 === e && 1 / e == -1 / 0,
          "number",
          () => "-0",
          Number,
        ),
        N(
          (e) => e instanceof URL,
          "URL",
          (e) => e.toString(),
          (e) => new URL(e),
        ),
      ];
      function x(e, t, r, n) {
        return { isApplicable: e, annotation: t, transform: r, untransform: n };
      }
      let B = x(
          (e, t) => !!j(e) && !!t.symbolRegistry.getIdentifier(e),
          (e, t) => ["symbol", t.symbolRegistry.getIdentifier(e)],
          (e) => e.description,
          (e, t, r) => {
            let n = r.symbolRegistry.getValue(t[1]);
            if (!n) throw Error("Trying to deserialize unknown symbol");
            return n;
          },
        ),
        C = [
          Int8Array,
          Uint8Array,
          Int16Array,
          Uint16Array,
          Int32Array,
          Uint32Array,
          Float32Array,
          Float64Array,
          Uint8ClampedArray,
        ].reduce((e, t) => ((e[t.name] = t), e), {}),
        U = x(
          (e) => ArrayBuffer.isView(e) && !(e instanceof DataView),
          (e) => ["typed-array", e.constructor.name],
          (e) => [...e],
          (e, t) => {
            let r = C[t[1]];
            if (!r) throw Error("Trying to deserialize unknown typed array");
            return new r(e);
          },
        );
      function D(e, t) {
        return (
          !!e?.constructor && !!t.classRegistry.getIdentifier(e.constructor)
        );
      }
      let M = x(
          D,
          (e, t) => ["class", t.classRegistry.getIdentifier(e.constructor)],
          (e, t) => {
            let r = t.classRegistry.getAllowedProps(e.constructor);
            if (!r) return { ...e };
            let n = {};
            return (
              r.forEach((t) => {
                n[t] = e[t];
              }),
              n
            );
          },
          (e, t, r) => {
            let n = r.classRegistry.getValue(t[1]);
            if (!n)
              throw Error(
                `Trying to deserialize unknown class '${t[1]}' - check https://github.com/blitz-js/superjson/issues/116#issuecomment-773996564`,
              );
            return Object.assign(Object.create(n.prototype), e);
          },
        ),
        K = x(
          (e, t) => !!t.customTransformerRegistry.findApplicable(e),
          (e, t) => [
            "custom",
            t.customTransformerRegistry.findApplicable(e).name,
          ],
          (e, t) => t.customTransformerRegistry.findApplicable(e).serialize(e),
          (e, t, r) => {
            let n = r.customTransformerRegistry.findByName(t[1]);
            if (!n) throw Error("Trying to deserialize unknown custom value");
            return n.deserialize(e);
          },
        ),
        q = [M, B, K, U],
        J = (e, t) => {
          let r = d(q, (r) => r.isApplicable(e, t));
          if (r) return { value: r.transform(e, t), type: r.annotation(e, t) };
          let n = d(_, (r) => r.isApplicable(e, t));
          if (n) return { value: n.transform(e, t), type: n.annotation };
        },
        L = {};
      _.forEach((e) => {
        L[e.annotation] = e;
      });
      let F = (e, t, r) => {
          if (I(t))
            switch (t[0]) {
              case "symbol":
                return B.untransform(e, t, r);
              case "class":
                return M.untransform(e, t, r);
              case "custom":
                return K.untransform(e, t, r);
              case "typed-array":
                return U.untransform(e, t, r);
              default:
                throw Error("Unknown transformation: " + t);
            }
          {
            let n = L[t];
            if (!n) throw Error("Unknown transformation: " + t);
            return n.untransform(e, r);
          }
        },
        $ = (e, t) => {
          if (t > e.size) throw Error("index out of bounds");
          let r = e.keys();
          for (; t > 0; ) r.next(), t--;
          return r.next().value;
        };
      function G(e) {
        if (p(e, "__proto__"))
          throw Error("__proto__ is not allowed as a property");
        if (p(e, "prototype"))
          throw Error("prototype is not allowed as a property");
        if (p(e, "constructor"))
          throw Error("constructor is not allowed as a property");
      }
      let H = (e, t) => {
          G(t);
          for (let r = 0; r < t.length; r++) {
            let n = t[r];
            if (A(e)) e = $(e, +n);
            else if (O(e)) {
              let s = +n,
                i = 0 == +t[++r] ? "key" : "value",
                o = $(e, s);
              switch (i) {
                case "key":
                  e = o;
                  break;
                case "value":
                  e = e.get(o);
              }
            } else e = e[n];
          }
          return e;
        },
        Q = (e, t, r) => {
          if ((G(t), 0 === t.length)) return r(e);
          let n = e;
          for (let e = 0; e < t.length - 1; e++) {
            let r = t[e];
            if (I(n)) n = n[+r];
            else if (h(n)) n = n[r];
            else if (A(n)) n = $(n, +r);
            else if (O(n)) {
              if (e === t.length - 2) break;
              let s = +r,
                i = 0 == +t[++e] ? "key" : "value",
                o = $(n, s);
              switch (i) {
                case "key":
                  n = o;
                  break;
                case "value":
                  n = n.get(o);
              }
            }
          }
          let s = t[t.length - 1];
          if ((I(n) ? (n[+s] = r(n[+s])) : h(n) && (n[s] = r(n[s])), A(n))) {
            let e = $(n, +s),
              t = r(e);
            e !== t && (n.delete(e), n.add(t));
          }
          if (O(n)) {
            let e = $(n, +t[t.length - 2]);
            switch (0 == +s ? "key" : "value") {
              case "key": {
                let t = r(e);
                n.set(t, n.get(e)), t !== e && n.delete(e);
                break;
              }
              case "value":
                n.set(e, r(n.get(e)));
            }
          }
          return e;
        },
        W = (e, t) => h(e) || I(e) || O(e) || A(e) || D(e, t),
        X = (e, t, r, n, s = [], i = [], o = new Map()) => {
          let a = T(e);
          if (!a) {
            !(function (e, t, r) {
              let n = r.get(e);
              n ? n.push(t) : r.set(e, [t]);
            })(e, s, t);
            let r = o.get(e);
            if (r) return n ? { transformedValue: null } : r;
          }
          if (!W(e, r)) {
            let t = J(e, r),
              n = t
                ? { transformedValue: t.value, annotations: [t.type] }
                : { transformedValue: e };
            return a || o.set(e, n), n;
          }
          if (p(i, e)) return { transformedValue: null };
          let l = J(e, r),
            u = l?.value ?? e,
            f = I(u) ? [] : {},
            d = {};
          c(u, (a, l) => {
            if ("__proto__" === l || "constructor" === l || "prototype" === l)
              throw Error(
                `Detected property ${l}. This is a prototype pollution risk, please remove it from your object.`,
              );
            let u = X(a, t, r, n, [...s, l], [...i, e], o);
            (f[l] = u.transformedValue),
              I(u.annotations)
                ? (d[l] = u.annotations)
                : h(u.annotations) &&
                  c(u.annotations, (e, t) => {
                    d[S(l) + "." + t] = e;
                  });
          });
          let y = w(d)
            ? { transformedValue: f, annotations: l ? [l.type] : void 0 }
            : { transformedValue: f, annotations: l ? [l.type, d] : d };
          return a || o.set(e, y), y;
        };
      function Y(e) {
        return Object.prototype.toString.call(e).slice(8, -1);
      }
      function Z(e) {
        return "Array" === Y(e);
      }
      (n = function (e) {
        return "Null" === Y(e);
      }),
        (s = function (e) {
          return "Undefined" === Y(e);
        });
      class ee {
        constructor({ dedupe: e = !1 } = {}) {
          (this.classRegistry = new f()),
            (this.symbolRegistry = new u((e) => e.description ?? "")),
            (this.customTransformerRegistry = new y()),
            (this.allowedErrorProps = []),
            (this.dedupe = e);
        }
        serialize(e) {
          let t = new Map(),
            r = X(e, t, this, this.dedupe),
            n = { json: r.transformedValue };
          r.annotations && (n.meta = { ...n.meta, values: r.annotations });
          let s = (function (e, t) {
            let r,
              n = {};
            return (e.forEach((e) => {
              if (e.length <= 1) return;
              t ||
                (e = e
                  .map((e) => e.map(String))
                  .sort((e, t) => e.length - t.length));
              let [s, ...i] = e;
              0 === s.length ? (r = i.map(z)) : (n[z(s)] = i.map(z));
            }),
            r)
              ? w(n)
                ? [r]
                : [r, n]
              : w(n)
                ? void 0
                : n;
          })(t, this.dedupe);
          return s && (n.meta = { ...n.meta, referentialEqualities: s }), n;
        }
        deserialize(e) {
          var t, r, n;
          let { json: s, meta: i } = e,
            o = (function e(t, r = {}) {
              return Z(t)
                ? t.map((t) => e(t, r))
                : !(function (e) {
                      if ("Object" !== Y(e)) return !1;
                      let t = Object.getPrototypeOf(e);
                      return (
                        !!t &&
                        t.constructor === Object &&
                        t === Object.prototype
                      );
                    })(t)
                  ? t
                  : [
                      ...Object.getOwnPropertyNames(t),
                      ...Object.getOwnPropertySymbols(t),
                    ].reduce((n, s) => {
                      if (Z(r.props) && !r.props.includes(s)) return n;
                      let i = e(t[s], r);
                      var o = r.nonenumerable;
                      let a = {}.propertyIsEnumerable.call(t, s)
                        ? "enumerable"
                        : "nonenumerable";
                      return (
                        "enumerable" === a && (n[s] = i),
                        o &&
                          "nonenumerable" === a &&
                          Object.defineProperty(n, s, {
                            value: i,
                            enumerable: !1,
                            writable: !0,
                            configurable: !0,
                          }),
                        n
                      );
                    }, {});
            })(s);
          return (
            i?.values &&
              ((t = o),
              (r = i.values),
              (n = this),
              (function e(t, r, n = []) {
                if (!t) return;
                if (!I(t)) return void c(t, (t, s) => e(t, r, [...n, ...V(s)]));
                let [s, i] = t;
                i &&
                  c(i, (t, s) => {
                    e(t, r, [...n, ...V(s)]);
                  }),
                  r(s, n);
              })(r, (e, r) => {
                t = Q(t, r, (t) => F(t, e, n));
              }),
              (o = t)),
            i?.referentialEqualities &&
              (o = (function (e, t) {
                function r(t, r) {
                  let n = H(e, V(r));
                  t.map(V).forEach((t) => {
                    e = Q(e, t, () => n);
                  });
                }
                if (I(t)) {
                  let [n, s] = t;
                  n.forEach((t) => {
                    e = Q(e, V(t), () => e);
                  }),
                    s && c(s, r);
                } else c(t, r);
                return e;
              })(o, i.referentialEqualities)),
            o
          );
        }
        stringify(e) {
          return JSON.stringify(this.serialize(e));
        }
        parse(e) {
          return this.deserialize(JSON.parse(e));
        }
        registerClass(e, t) {
          this.classRegistry.register(e, t);
        }
        registerSymbol(e, t) {
          this.symbolRegistry.register(e, t);
        }
        registerCustom(e, t) {
          this.customTransformerRegistry.register({ name: t, ...e });
        }
        allowErrorProps(...e) {
          this.allowedErrorProps.push(...e);
        }
      }
      (ee.defaultInstance = new ee()),
        (ee.serialize = ee.defaultInstance.serialize.bind(ee.defaultInstance)),
        (ee.deserialize = ee.defaultInstance.deserialize.bind(
          ee.defaultInstance,
        )),
        (ee.stringify = ee.defaultInstance.stringify.bind(ee.defaultInstance)),
        (ee.parse = ee.defaultInstance.parse.bind(ee.defaultInstance)),
        (ee.registerClass = ee.defaultInstance.registerClass.bind(
          ee.defaultInstance,
        )),
        (ee.registerSymbol = ee.defaultInstance.registerSymbol.bind(
          ee.defaultInstance,
        )),
        (ee.registerCustom = ee.defaultInstance.registerCustom.bind(
          ee.defaultInstance,
        )),
        (ee.allowErrorProps = ee.defaultInstance.allowErrorProps.bind(
          ee.defaultInstance,
        ));
      let et = ee.serialize,
        er = ee.deserialize,
        en = ee.stringify,
        es = ee.parse,
        ei = ee.registerClass,
        eo = ee.registerCustom,
        ea = ee.registerSymbol,
        el = ee.allowErrorProps;
    },
  });
//# sourceMappingURL=2140.js.map
