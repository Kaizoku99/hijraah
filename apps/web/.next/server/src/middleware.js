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
    (e._sentryDebugIds[t] = "7783a60d-6359-4adc-868a-d3e947d647ad"),
    (e._sentryDebugIdIdentifier =
      "sentry-dbid-7783a60d-6359-4adc-868a-d3e947d647ad"));
} catch (e) {}
(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [550],
  {
    991: (e, t, r) => {
      "use strict";
      r.r(t),
        r.d(t, {
          DiagConsoleLogger: () => L,
          DiagLogLevel: () => n,
          INVALID_SPANID: () => ed,
          INVALID_SPAN_CONTEXT: () => ef,
          INVALID_TRACEID: () => eh,
          ProxyTracer: () => eA,
          ProxyTracerProvider: () => ej,
          ROOT_CONTEXT: () => I,
          SamplingDecision: () => a,
          SpanKind: () => o,
          SpanStatusCode: () => l,
          TraceFlags: () => s,
          ValueType: () => i,
          baggageEntryMetadataFromString: () => O,
          context: () => eU,
          createContextKey: () => A,
          createNoopMeter: () => ee,
          createTraceState: () => eq,
          default: () => e2,
          defaultTextMapGetter: () => et,
          defaultTextMapSetter: () => er,
          diag: () => eB,
          isSpanContextValid: () => eT,
          isValidSpanId: () => ex,
          isValidTraceId: () => ek,
          metrics: () => eH,
          propagation: () => eQ,
          trace: () => e1,
        });
      var n,
        i,
        s,
        a,
        o,
        l,
        u =
          "object" == typeof globalThis
            ? globalThis
            : "object" == typeof self
              ? self
              : "object" == typeof window
                ? window
                : "object" == typeof r.g
                  ? r.g
                  : {},
        c = "1.9.0",
        d = /^(\d+)\.(\d+)\.(\d+)(-(.+))?$/,
        h = (function (e) {
          var t = new Set([e]),
            r = new Set(),
            n = e.match(d);
          if (!n)
            return function () {
              return !1;
            };
          var i = {
            major: +n[1],
            minor: +n[2],
            patch: +n[3],
            prerelease: n[4],
          };
          if (null != i.prerelease)
            return function (t) {
              return t === e;
            };
          function s(e) {
            return r.add(e), !1;
          }
          return function (e) {
            if (t.has(e)) return !0;
            if (r.has(e)) return !1;
            var n = e.match(d);
            if (!n) return s(e);
            var a = {
              major: +n[1],
              minor: +n[2],
              patch: +n[3],
              prerelease: n[4],
            };
            if (null != a.prerelease || i.major !== a.major) return s(e);
            if (0 === i.major)
              return i.minor === a.minor && i.patch <= a.patch
                ? (t.add(e), !0)
                : s(e);
            return i.minor <= a.minor ? (t.add(e), !0) : s(e);
          };
        })(c),
        f = Symbol.for("opentelemetry.js.api." + c.split(".")[0]);
      function p(e, t, r, n) {
        void 0 === n && (n = !1);
        var i,
          s = (u[f] = null != (i = u[f]) ? i : { version: c });
        if (!n && s[e]) {
          var a = Error(
            "@opentelemetry/api: Attempted duplicate registration of API: " + e,
          );
          return r.error(a.stack || a.message), !1;
        }
        if (s.version !== c) {
          var a = Error(
            "@opentelemetry/api: Registration of version v" +
              s.version +
              " for " +
              e +
              " does not match previously registered API v" +
              c,
          );
          return r.error(a.stack || a.message), !1;
        }
        return (
          (s[e] = t),
          r.debug(
            "@opentelemetry/api: Registered a global for " + e + " v" + c + ".",
          ),
          !0
        );
      }
      function _(e) {
        var t,
          r,
          n = null == (t = u[f]) ? void 0 : t.version;
        if (n && h(n)) return null == (r = u[f]) ? void 0 : r[e];
      }
      function g(e, t) {
        t.debug(
          "@opentelemetry/api: Unregistering a global for " +
            e +
            " v" +
            c +
            ".",
        );
        var r = u[f];
        r && delete r[e];
      }
      var m = function (e, t) {
          var r = "function" == typeof Symbol && e[Symbol.iterator];
          if (!r) return e;
          var n,
            i,
            s = r.call(e),
            a = [];
          try {
            for (; (void 0 === t || t-- > 0) && !(n = s.next()).done; )
              a.push(n.value);
          } catch (e) {
            i = { error: e };
          } finally {
            try {
              n && !n.done && (r = s.return) && r.call(s);
            } finally {
              if (i) throw i.error;
            }
          }
          return a;
        },
        y = function (e, t, r) {
          if (r || 2 == arguments.length)
            for (var n, i = 0, s = t.length; i < s; i++)
              (!n && i in t) ||
                (n || (n = Array.prototype.slice.call(t, 0, i)), (n[i] = t[i]));
          return e.concat(n || Array.prototype.slice.call(t));
        },
        w = (function () {
          function e(e) {
            this._namespace = e.namespace || "DiagComponentLogger";
          }
          return (
            (e.prototype.debug = function () {
              for (var e = [], t = 0; t < arguments.length; t++)
                e[t] = arguments[t];
              return v("debug", this._namespace, e);
            }),
            (e.prototype.error = function () {
              for (var e = [], t = 0; t < arguments.length; t++)
                e[t] = arguments[t];
              return v("error", this._namespace, e);
            }),
            (e.prototype.info = function () {
              for (var e = [], t = 0; t < arguments.length; t++)
                e[t] = arguments[t];
              return v("info", this._namespace, e);
            }),
            (e.prototype.warn = function () {
              for (var e = [], t = 0; t < arguments.length; t++)
                e[t] = arguments[t];
              return v("warn", this._namespace, e);
            }),
            (e.prototype.verbose = function () {
              for (var e = [], t = 0; t < arguments.length; t++)
                e[t] = arguments[t];
              return v("verbose", this._namespace, e);
            }),
            e
          );
        })();
      function v(e, t, r) {
        var n = _("diag");
        if (n) return r.unshift(t), n[e].apply(n, y([], m(r), !1));
      }
      !(function (e) {
        (e[(e.NONE = 0)] = "NONE"),
          (e[(e.ERROR = 30)] = "ERROR"),
          (e[(e.WARN = 50)] = "WARN"),
          (e[(e.INFO = 60)] = "INFO"),
          (e[(e.DEBUG = 70)] = "DEBUG"),
          (e[(e.VERBOSE = 80)] = "VERBOSE"),
          (e[(e.ALL = 9999)] = "ALL");
      })(n || (n = {}));
      var b = function (e, t) {
          var r = "function" == typeof Symbol && e[Symbol.iterator];
          if (!r) return e;
          var n,
            i,
            s = r.call(e),
            a = [];
          try {
            for (; (void 0 === t || t-- > 0) && !(n = s.next()).done; )
              a.push(n.value);
          } catch (e) {
            i = { error: e };
          } finally {
            try {
              n && !n.done && (r = s.return) && r.call(s);
            } finally {
              if (i) throw i.error;
            }
          }
          return a;
        },
        S = function (e, t, r) {
          if (r || 2 == arguments.length)
            for (var n, i = 0, s = t.length; i < s; i++)
              (!n && i in t) ||
                (n || (n = Array.prototype.slice.call(t, 0, i)), (n[i] = t[i]));
          return e.concat(n || Array.prototype.slice.call(t));
        },
        E = (function () {
          function e() {
            function e(e) {
              return function () {
                for (var t = [], r = 0; r < arguments.length; r++)
                  t[r] = arguments[r];
                var n = _("diag");
                if (n) return n[e].apply(n, S([], b(t), !1));
              };
            }
            var t = this;
            (t.setLogger = function (e, r) {
              if ((void 0 === r && (r = { logLevel: n.INFO }), e === t)) {
                var i,
                  s,
                  a,
                  o = Error(
                    "Cannot use diag as the logger for itself. Please use a DiagLogger implementation like ConsoleDiagLogger or a custom implementation",
                  );
                return t.error(null != (i = o.stack) ? i : o.message), !1;
              }
              "number" == typeof r && (r = { logLevel: r });
              var l = _("diag"),
                u = (function (e, t) {
                  function r(r, n) {
                    var i = t[r];
                    return "function" == typeof i && e >= n
                      ? i.bind(t)
                      : function () {};
                  }
                  return (
                    e < n.NONE ? (e = n.NONE) : e > n.ALL && (e = n.ALL),
                    (t = t || {}),
                    {
                      error: r("error", n.ERROR),
                      warn: r("warn", n.WARN),
                      info: r("info", n.INFO),
                      debug: r("debug", n.DEBUG),
                      verbose: r("verbose", n.VERBOSE),
                    }
                  );
                })(null != (s = r.logLevel) ? s : n.INFO, e);
              if (l && !r.suppressOverrideMessage) {
                var c =
                  null != (a = Error().stack)
                    ? a
                    : "<failed to generate stacktrace>";
                l.warn("Current logger will be overwritten from " + c),
                  u.warn(
                    "Current logger will overwrite one already registered from " +
                      c,
                  );
              }
              return p("diag", u, t, !0);
            }),
              (t.disable = function () {
                g("diag", t);
              }),
              (t.createComponentLogger = function (e) {
                return new w(e);
              }),
              (t.verbose = e("verbose")),
              (t.debug = e("debug")),
              (t.info = e("info")),
              (t.warn = e("warn")),
              (t.error = e("error"));
          }
          return (
            (e.instance = function () {
              return (
                this._instance || (this._instance = new e()), this._instance
              );
            }),
            e
          );
        })(),
        k = function (e, t) {
          var r = "function" == typeof Symbol && e[Symbol.iterator];
          if (!r) return e;
          var n,
            i,
            s = r.call(e),
            a = [];
          try {
            for (; (void 0 === t || t-- > 0) && !(n = s.next()).done; )
              a.push(n.value);
          } catch (e) {
            i = { error: e };
          } finally {
            try {
              n && !n.done && (r = s.return) && r.call(s);
            } finally {
              if (i) throw i.error;
            }
          }
          return a;
        },
        x = function (e) {
          var t = "function" == typeof Symbol && Symbol.iterator,
            r = t && e[t],
            n = 0;
          if (r) return r.call(e);
          if (e && "number" == typeof e.length)
            return {
              next: function () {
                return (
                  e && n >= e.length && (e = void 0),
                  { value: e && e[n++], done: !e }
                );
              },
            };
          throw TypeError(
            t ? "Object is not iterable." : "Symbol.iterator is not defined.",
          );
        },
        T = (function () {
          function e(e) {
            this._entries = e ? new Map(e) : new Map();
          }
          return (
            (e.prototype.getEntry = function (e) {
              var t = this._entries.get(e);
              if (t) return Object.assign({}, t);
            }),
            (e.prototype.getAllEntries = function () {
              return Array.from(this._entries.entries()).map(function (e) {
                var t = k(e, 2);
                return [t[0], t[1]];
              });
            }),
            (e.prototype.setEntry = function (t, r) {
              var n = new e(this._entries);
              return n._entries.set(t, r), n;
            }),
            (e.prototype.removeEntry = function (t) {
              var r = new e(this._entries);
              return r._entries.delete(t), r;
            }),
            (e.prototype.removeEntries = function () {
              for (var t, r, n = [], i = 0; i < arguments.length; i++)
                n[i] = arguments[i];
              var s = new e(this._entries);
              try {
                for (var a = x(n), o = a.next(); !o.done; o = a.next()) {
                  var l = o.value;
                  s._entries.delete(l);
                }
              } catch (e) {
                t = { error: e };
              } finally {
                try {
                  o && !o.done && (r = a.return) && r.call(a);
                } finally {
                  if (t) throw t.error;
                }
              }
              return s;
            }),
            (e.prototype.clear = function () {
              return new e();
            }),
            e
          );
        })(),
        R = Symbol("BaggageEntryMetadata"),
        C = E.instance();
      function P(e) {
        return void 0 === e && (e = {}), new T(new Map(Object.entries(e)));
      }
      function O(e) {
        return (
          "string" != typeof e &&
            (C.error(
              "Cannot create baggage metadata from unknown type: " + typeof e,
            ),
            (e = "")),
          {
            __TYPE__: R,
            toString: function () {
              return e;
            },
          }
        );
      }
      function A(e) {
        return Symbol.for(e);
      }
      var I = new (function e(t) {
          var r = this;
          (r._currentContext = t ? new Map(t) : new Map()),
            (r.getValue = function (e) {
              return r._currentContext.get(e);
            }),
            (r.setValue = function (t, n) {
              var i = new e(r._currentContext);
              return i._currentContext.set(t, n), i;
            }),
            (r.deleteValue = function (t) {
              var n = new e(r._currentContext);
              return n._currentContext.delete(t), n;
            });
        })(),
        j = [
          { n: "error", c: "error" },
          { n: "warn", c: "warn" },
          { n: "info", c: "info" },
          { n: "debug", c: "debug" },
          { n: "verbose", c: "trace" },
        ],
        L = function () {
          for (var e = 0; e < j.length; e++)
            this[j[e].n] = (function (e) {
              return function () {
                for (var t = [], r = 0; r < arguments.length; r++)
                  t[r] = arguments[r];
                if (console) {
                  var n = console[e];
                  if (
                    ("function" != typeof n && (n = console.log),
                    "function" == typeof n)
                  )
                    return n.apply(console, t);
                }
              };
            })(j[e].c);
        },
        N = (function () {
          var e = function (t, r) {
            return (e =
              Object.setPrototypeOf ||
              ({ __proto__: [] } instanceof Array &&
                function (e, t) {
                  e.__proto__ = t;
                }) ||
              function (e, t) {
                for (var r in t)
                  Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r]);
              })(t, r);
          };
          return function (t, r) {
            if ("function" != typeof r && null !== r)
              throw TypeError(
                "Class extends value " +
                  String(r) +
                  " is not a constructor or null",
              );
            function n() {
              this.constructor = t;
            }
            e(t, r),
              (t.prototype =
                null === r
                  ? Object.create(r)
                  : ((n.prototype = r.prototype), new n()));
          };
        })(),
        M = (function () {
          function e() {}
          return (
            (e.prototype.createGauge = function (e, t) {
              return V;
            }),
            (e.prototype.createHistogram = function (e, t) {
              return J;
            }),
            (e.prototype.createCounter = function (e, t) {
              return K;
            }),
            (e.prototype.createUpDownCounter = function (e, t) {
              return X;
            }),
            (e.prototype.createObservableGauge = function (e, t) {
              return Z;
            }),
            (e.prototype.createObservableCounter = function (e, t) {
              return Y;
            }),
            (e.prototype.createObservableUpDownCounter = function (e, t) {
              return Q;
            }),
            (e.prototype.addBatchObservableCallback = function (e, t) {}),
            (e.prototype.removeBatchObservableCallback = function (e) {}),
            e
          );
        })(),
        D = function () {},
        $ = (function (e) {
          function t() {
            return (null !== e && e.apply(this, arguments)) || this;
          }
          return N(t, e), (t.prototype.add = function (e, t) {}), t;
        })(D),
        q = (function (e) {
          function t() {
            return (null !== e && e.apply(this, arguments)) || this;
          }
          return N(t, e), (t.prototype.add = function (e, t) {}), t;
        })(D),
        U = (function (e) {
          function t() {
            return (null !== e && e.apply(this, arguments)) || this;
          }
          return N(t, e), (t.prototype.record = function (e, t) {}), t;
        })(D),
        B = (function (e) {
          function t() {
            return (null !== e && e.apply(this, arguments)) || this;
          }
          return N(t, e), (t.prototype.record = function (e, t) {}), t;
        })(D),
        G = (function () {
          function e() {}
          return (
            (e.prototype.addCallback = function (e) {}),
            (e.prototype.removeCallback = function (e) {}),
            e
          );
        })(),
        z = (function (e) {
          function t() {
            return (null !== e && e.apply(this, arguments)) || this;
          }
          return N(t, e), t;
        })(G),
        H = (function (e) {
          function t() {
            return (null !== e && e.apply(this, arguments)) || this;
          }
          return N(t, e), t;
        })(G),
        F = (function (e) {
          function t() {
            return (null !== e && e.apply(this, arguments)) || this;
          }
          return N(t, e), t;
        })(G),
        W = new M(),
        K = new $(),
        V = new U(),
        J = new B(),
        X = new q(),
        Y = new z(),
        Z = new H(),
        Q = new F();
      function ee() {
        return W;
      }
      !(function (e) {
        (e[(e.INT = 0)] = "INT"), (e[(e.DOUBLE = 1)] = "DOUBLE");
      })(i || (i = {}));
      var et = {
          get: function (e, t) {
            if (null != e) return e[t];
          },
          keys: function (e) {
            return null == e ? [] : Object.keys(e);
          },
        },
        er = {
          set: function (e, t, r) {
            null != e && (e[t] = r);
          },
        },
        en = function (e, t) {
          var r = "function" == typeof Symbol && e[Symbol.iterator];
          if (!r) return e;
          var n,
            i,
            s = r.call(e),
            a = [];
          try {
            for (; (void 0 === t || t-- > 0) && !(n = s.next()).done; )
              a.push(n.value);
          } catch (e) {
            i = { error: e };
          } finally {
            try {
              n && !n.done && (r = s.return) && r.call(s);
            } finally {
              if (i) throw i.error;
            }
          }
          return a;
        },
        ei = function (e, t, r) {
          if (r || 2 == arguments.length)
            for (var n, i = 0, s = t.length; i < s; i++)
              (!n && i in t) ||
                (n || (n = Array.prototype.slice.call(t, 0, i)), (n[i] = t[i]));
          return e.concat(n || Array.prototype.slice.call(t));
        },
        es = (function () {
          function e() {}
          return (
            (e.prototype.active = function () {
              return I;
            }),
            (e.prototype.with = function (e, t, r) {
              for (var n = [], i = 3; i < arguments.length; i++)
                n[i - 3] = arguments[i];
              return t.call.apply(t, ei([r], en(n), !1));
            }),
            (e.prototype.bind = function (e, t) {
              return t;
            }),
            (e.prototype.enable = function () {
              return this;
            }),
            (e.prototype.disable = function () {
              return this;
            }),
            e
          );
        })(),
        ea = function (e, t) {
          var r = "function" == typeof Symbol && e[Symbol.iterator];
          if (!r) return e;
          var n,
            i,
            s = r.call(e),
            a = [];
          try {
            for (; (void 0 === t || t-- > 0) && !(n = s.next()).done; )
              a.push(n.value);
          } catch (e) {
            i = { error: e };
          } finally {
            try {
              n && !n.done && (r = s.return) && r.call(s);
            } finally {
              if (i) throw i.error;
            }
          }
          return a;
        },
        eo = function (e, t, r) {
          if (r || 2 == arguments.length)
            for (var n, i = 0, s = t.length; i < s; i++)
              (!n && i in t) ||
                (n || (n = Array.prototype.slice.call(t, 0, i)), (n[i] = t[i]));
          return e.concat(n || Array.prototype.slice.call(t));
        },
        el = "context",
        eu = new es(),
        ec = (function () {
          function e() {}
          return (
            (e.getInstance = function () {
              return (
                this._instance || (this._instance = new e()), this._instance
              );
            }),
            (e.prototype.setGlobalContextManager = function (e) {
              return p(el, e, E.instance());
            }),
            (e.prototype.active = function () {
              return this._getContextManager().active();
            }),
            (e.prototype.with = function (e, t, r) {
              for (var n, i = [], s = 3; s < arguments.length; s++)
                i[s - 3] = arguments[s];
              return (n = this._getContextManager()).with.apply(
                n,
                eo([e, t, r], ea(i), !1),
              );
            }),
            (e.prototype.bind = function (e, t) {
              return this._getContextManager().bind(e, t);
            }),
            (e.prototype._getContextManager = function () {
              return _(el) || eu;
            }),
            (e.prototype.disable = function () {
              this._getContextManager().disable(), g(el, E.instance());
            }),
            e
          );
        })();
      !(function (e) {
        (e[(e.NONE = 0)] = "NONE"), (e[(e.SAMPLED = 1)] = "SAMPLED");
      })(s || (s = {}));
      var ed = "0000000000000000",
        eh = "00000000000000000000000000000000",
        ef = { traceId: eh, spanId: ed, traceFlags: s.NONE },
        ep = (function () {
          function e(e) {
            void 0 === e && (e = ef), (this._spanContext = e);
          }
          return (
            (e.prototype.spanContext = function () {
              return this._spanContext;
            }),
            (e.prototype.setAttribute = function (e, t) {
              return this;
            }),
            (e.prototype.setAttributes = function (e) {
              return this;
            }),
            (e.prototype.addEvent = function (e, t) {
              return this;
            }),
            (e.prototype.addLink = function (e) {
              return this;
            }),
            (e.prototype.addLinks = function (e) {
              return this;
            }),
            (e.prototype.setStatus = function (e) {
              return this;
            }),
            (e.prototype.updateName = function (e) {
              return this;
            }),
            (e.prototype.end = function (e) {}),
            (e.prototype.isRecording = function () {
              return !1;
            }),
            (e.prototype.recordException = function (e, t) {}),
            e
          );
        })(),
        e_ = A("OpenTelemetry Context Key SPAN");
      function eg(e) {
        return e.getValue(e_) || void 0;
      }
      function em() {
        return eg(ec.getInstance().active());
      }
      function ey(e, t) {
        return e.setValue(e_, t);
      }
      function ew(e) {
        return e.deleteValue(e_);
      }
      function ev(e, t) {
        return ey(e, new ep(t));
      }
      function eb(e) {
        var t;
        return null == (t = eg(e)) ? void 0 : t.spanContext();
      }
      var eS = /^([0-9a-f]{32})$/i,
        eE = /^[0-9a-f]{16}$/i;
      function ek(e) {
        return eS.test(e) && e !== eh;
      }
      function ex(e) {
        return eE.test(e) && e !== ed;
      }
      function eT(e) {
        return ek(e.traceId) && ex(e.spanId);
      }
      function eR(e) {
        return new ep(e);
      }
      var eC = ec.getInstance(),
        eP = (function () {
          function e() {}
          return (
            (e.prototype.startSpan = function (e, t, r) {
              if (
                (void 0 === r && (r = eC.active()), null == t ? void 0 : t.root)
              )
                return new ep();
              var n,
                i = r && eb(r);
              return "object" == typeof (n = i) &&
                "string" == typeof n.spanId &&
                "string" == typeof n.traceId &&
                "number" == typeof n.traceFlags &&
                eT(i)
                ? new ep(i)
                : new ep();
            }),
            (e.prototype.startActiveSpan = function (e, t, r, n) {
              if (!(arguments.length < 2)) {
                2 == arguments.length
                  ? (a = t)
                  : 3 == arguments.length
                    ? ((i = t), (a = r))
                    : ((i = t), (s = r), (a = n));
                var i,
                  s,
                  a,
                  o = null != s ? s : eC.active(),
                  l = this.startSpan(e, i, o),
                  u = ey(o, l);
                return eC.with(u, a, void 0, l);
              }
            }),
            e
          );
        })(),
        eO = new eP(),
        eA = (function () {
          function e(e, t, r, n) {
            (this._provider = e),
              (this.name = t),
              (this.version = r),
              (this.options = n);
          }
          return (
            (e.prototype.startSpan = function (e, t, r) {
              return this._getTracer().startSpan(e, t, r);
            }),
            (e.prototype.startActiveSpan = function (e, t, r, n) {
              var i = this._getTracer();
              return Reflect.apply(i.startActiveSpan, i, arguments);
            }),
            (e.prototype._getTracer = function () {
              if (this._delegate) return this._delegate;
              var e = this._provider.getDelegateTracer(
                this.name,
                this.version,
                this.options,
              );
              return e ? ((this._delegate = e), this._delegate) : eO;
            }),
            e
          );
        })(),
        eI = new ((function () {
          function e() {}
          return (
            (e.prototype.getTracer = function (e, t, r) {
              return new eP();
            }),
            e
          );
        })())(),
        ej = (function () {
          function e() {}
          return (
            (e.prototype.getTracer = function (e, t, r) {
              var n;
              return null != (n = this.getDelegateTracer(e, t, r))
                ? n
                : new eA(this, e, t, r);
            }),
            (e.prototype.getDelegate = function () {
              var e;
              return null != (e = this._delegate) ? e : eI;
            }),
            (e.prototype.setDelegate = function (e) {
              this._delegate = e;
            }),
            (e.prototype.getDelegateTracer = function (e, t, r) {
              var n;
              return null == (n = this._delegate)
                ? void 0
                : n.getTracer(e, t, r);
            }),
            e
          );
        })();
      !(function (e) {
        (e[(e.NOT_RECORD = 0)] = "NOT_RECORD"),
          (e[(e.RECORD = 1)] = "RECORD"),
          (e[(e.RECORD_AND_SAMPLED = 2)] = "RECORD_AND_SAMPLED");
      })(a || (a = {})),
        (function (e) {
          (e[(e.INTERNAL = 0)] = "INTERNAL"),
            (e[(e.SERVER = 1)] = "SERVER"),
            (e[(e.CLIENT = 2)] = "CLIENT"),
            (e[(e.PRODUCER = 3)] = "PRODUCER"),
            (e[(e.CONSUMER = 4)] = "CONSUMER");
        })(o || (o = {})),
        (function (e) {
          (e[(e.UNSET = 0)] = "UNSET"),
            (e[(e.OK = 1)] = "OK"),
            (e[(e.ERROR = 2)] = "ERROR");
        })(l || (l = {}));
      var eL = "[_0-9a-z-*/]",
        eN = RegExp(
          "^(?:[a-z]" +
            eL +
            "{0,255}|" +
            ("[a-z0-9]" + eL + "{0,240}@[a-z]") +
            eL +
            "{0,13})$",
        ),
        eM = /^[ -~]{0,255}[!-~]$/,
        eD = /,|=/,
        e$ = (function () {
          function e(e) {
            (this._internalState = new Map()), e && this._parse(e);
          }
          return (
            (e.prototype.set = function (e, t) {
              var r = this._clone();
              return (
                r._internalState.has(e) && r._internalState.delete(e),
                r._internalState.set(e, t),
                r
              );
            }),
            (e.prototype.unset = function (e) {
              var t = this._clone();
              return t._internalState.delete(e), t;
            }),
            (e.prototype.get = function (e) {
              return this._internalState.get(e);
            }),
            (e.prototype.serialize = function () {
              var e = this;
              return this._keys()
                .reduce(function (t, r) {
                  return t.push(r + "=" + e.get(r)), t;
                }, [])
                .join(",");
            }),
            (e.prototype._parse = function (e) {
              !(e.length > 512) &&
                ((this._internalState = e
                  .split(",")
                  .reverse()
                  .reduce(function (e, t) {
                    var r = t.trim(),
                      n = r.indexOf("=");
                    if (-1 !== n) {
                      var i = r.slice(0, n),
                        s = r.slice(n + 1, t.length);
                      eN.test(i) && eM.test(s) && !eD.test(s) && e.set(i, s);
                    }
                    return e;
                  }, new Map())),
                this._internalState.size > 32 &&
                  (this._internalState = new Map(
                    Array.from(this._internalState.entries())
                      .reverse()
                      .slice(0, 32),
                  )));
            }),
            (e.prototype._keys = function () {
              return Array.from(this._internalState.keys()).reverse();
            }),
            (e.prototype._clone = function () {
              var t = new e();
              return (t._internalState = new Map(this._internalState)), t;
            }),
            e
          );
        })();
      function eq(e) {
        return new e$(e);
      }
      var eU = ec.getInstance(),
        eB = E.instance(),
        eG = new ((function () {
          function e() {}
          return (
            (e.prototype.getMeter = function (e, t, r) {
              return W;
            }),
            e
          );
        })())(),
        ez = "metrics",
        eH = (function () {
          function e() {}
          return (
            (e.getInstance = function () {
              return (
                this._instance || (this._instance = new e()), this._instance
              );
            }),
            (e.prototype.setGlobalMeterProvider = function (e) {
              return p(ez, e, E.instance());
            }),
            (e.prototype.getMeterProvider = function () {
              return _(ez) || eG;
            }),
            (e.prototype.getMeter = function (e, t, r) {
              return this.getMeterProvider().getMeter(e, t, r);
            }),
            (e.prototype.disable = function () {
              g(ez, E.instance());
            }),
            e
          );
        })().getInstance(),
        eF = (function () {
          function e() {}
          return (
            (e.prototype.inject = function (e, t) {}),
            (e.prototype.extract = function (e, t) {
              return e;
            }),
            (e.prototype.fields = function () {
              return [];
            }),
            e
          );
        })(),
        eW = A("OpenTelemetry Baggage Key");
      function eK(e) {
        return e.getValue(eW) || void 0;
      }
      function eV() {
        return eK(ec.getInstance().active());
      }
      function eJ(e, t) {
        return e.setValue(eW, t);
      }
      function eX(e) {
        return e.deleteValue(eW);
      }
      var eY = "propagation",
        eZ = new eF(),
        eQ = (function () {
          function e() {
            (this.createBaggage = P),
              (this.getBaggage = eK),
              (this.getActiveBaggage = eV),
              (this.setBaggage = eJ),
              (this.deleteBaggage = eX);
          }
          return (
            (e.getInstance = function () {
              return (
                this._instance || (this._instance = new e()), this._instance
              );
            }),
            (e.prototype.setGlobalPropagator = function (e) {
              return p(eY, e, E.instance());
            }),
            (e.prototype.inject = function (e, t, r) {
              return (
                void 0 === r && (r = er),
                this._getGlobalPropagator().inject(e, t, r)
              );
            }),
            (e.prototype.extract = function (e, t, r) {
              return (
                void 0 === r && (r = et),
                this._getGlobalPropagator().extract(e, t, r)
              );
            }),
            (e.prototype.fields = function () {
              return this._getGlobalPropagator().fields();
            }),
            (e.prototype.disable = function () {
              g(eY, E.instance());
            }),
            (e.prototype._getGlobalPropagator = function () {
              return _(eY) || eZ;
            }),
            e
          );
        })().getInstance(),
        e0 = "trace",
        e1 = (function () {
          function e() {
            (this._proxyTracerProvider = new ej()),
              (this.wrapSpanContext = eR),
              (this.isSpanContextValid = eT),
              (this.deleteSpan = ew),
              (this.getSpan = eg),
              (this.getActiveSpan = em),
              (this.getSpanContext = eb),
              (this.setSpan = ey),
              (this.setSpanContext = ev);
          }
          return (
            (e.getInstance = function () {
              return (
                this._instance || (this._instance = new e()), this._instance
              );
            }),
            (e.prototype.setGlobalTracerProvider = function (e) {
              var t = p(e0, this._proxyTracerProvider, E.instance());
              return t && this._proxyTracerProvider.setDelegate(e), t;
            }),
            (e.prototype.getTracerProvider = function () {
              return _(e0) || this._proxyTracerProvider;
            }),
            (e.prototype.getTracer = function (e, t) {
              return this.getTracerProvider().getTracer(e, t);
            }),
            (e.prototype.disable = function () {
              g(e0, E.instance()), (this._proxyTracerProvider = new ej());
            }),
            e
          );
        })().getInstance();
      let e2 = {
        context: eU,
        diag: eB,
        metrics: eH,
        propagation: eQ,
        trace: e1,
      };
    },
    993: (e) => {
      "use strict";
      e.exports = function () {
        throw Error(
          "ws does not work in the browser. Browser clients must use the native WebSocket object",
        );
      };
    },
    2207: (e, t, r) => {
      "use strict";
      r.d(t, { xl: () => a });
      let n = Object.defineProperty(
        Error(
          "Invariant: AsyncLocalStorage accessed in runtime where it is not available",
        ),
        "__NEXT_ERROR_CODE",
        { value: "E504", enumerable: !1, configurable: !0 },
      );
      class i {
        disable() {
          throw n;
        }
        getStore() {}
        run() {
          throw n;
        }
        exit() {
          throw n;
        }
        enterWith() {
          throw n;
        }
        static bind(e) {
          return e;
        }
      }
      let s = "undefined" != typeof globalThis && globalThis.AsyncLocalStorage;
      function a() {
        return s ? new s() : new i();
      }
    },
    4932: (e, t, r) => {
      "use strict";
      let n, i, s, a;
      r.r(t), r.d(t, { default: () => iB });
      var o,
        l,
        u,
        c,
        d,
        h,
        f,
        p,
        _,
        g,
        m,
        y = {};
      async function w() {
        return (
          "_ENTRIES" in globalThis &&
          _ENTRIES.middleware_instrumentation &&
          (await _ENTRIES.middleware_instrumentation)
        );
      }
      r.r(y),
        r.d(y, { config: () => iL, default: () => iD, middleware: () => iM });
      let v = null;
      async function b() {
        if ("phase-production-build" === process.env.NEXT_PHASE) return;
        v || (v = w());
        let e = await v;
        if (null == e ? void 0 : e.register)
          try {
            await e.register();
          } catch (e) {
            throw (
              ((e.message = `An error occurred while loading instrumentation hook: ${e.message}`),
              e)
            );
          }
      }
      async function S(...e) {
        let t = await w();
        try {
          var r;
          await (null == t || null == (r = t.onRequestError)
            ? void 0
            : r.call(t, ...e));
        } catch (e) {
          console.error("Error in instrumentation.onRequestError:", e);
        }
      }
      let E = null;
      function k() {
        return E || (E = b()), E;
      }
      function x(e) {
        return `The edge runtime does not support Node.js '${e}' module.
Learn More: https://nextjs.org/docs/messages/node-module-in-edge-runtime`;
      }
      process !== r.g.process &&
        ((process.env = r.g.process.env), (r.g.process = process)),
        Object.defineProperty(globalThis, "__import_unsupported", {
          value: function (e) {
            let t = new Proxy(function () {}, {
              get(t, r) {
                if ("then" === r) return {};
                throw Object.defineProperty(Error(x(e)), "__NEXT_ERROR_CODE", {
                  value: "E394",
                  enumerable: !1,
                  configurable: !0,
                });
              },
              construct() {
                throw Object.defineProperty(Error(x(e)), "__NEXT_ERROR_CODE", {
                  value: "E394",
                  enumerable: !1,
                  configurable: !0,
                });
              },
              apply(r, n, i) {
                if ("function" == typeof i[0]) return i[0](t);
                throw Object.defineProperty(Error(x(e)), "__NEXT_ERROR_CODE", {
                  value: "E394",
                  enumerable: !1,
                  configurable: !0,
                });
              },
            });
            return new Proxy({}, { get: () => t });
          },
          enumerable: !1,
          configurable: !1,
        }),
        k();
      var T = r(57057),
        R = r(97236);
      let C = Symbol("response"),
        P = Symbol("passThrough"),
        O = Symbol("waitUntil");
      class A {
        constructor(e, t) {
          (this[P] = !1),
            (this[O] = t
              ? { kind: "external", function: t }
              : { kind: "internal", promises: [] });
        }
        respondWith(e) {
          this[C] || (this[C] = Promise.resolve(e));
        }
        passThroughOnException() {
          this[P] = !0;
        }
        waitUntil(e) {
          if ("external" === this[O].kind) return (0, this[O].function)(e);
          this[O].promises.push(e);
        }
      }
      class I extends A {
        constructor(e) {
          var t;
          super(e.request, null == (t = e.context) ? void 0 : t.waitUntil),
            (this.sourcePage = e.page);
        }
        get request() {
          throw Object.defineProperty(
            new T.CB({ page: this.sourcePage }),
            "__NEXT_ERROR_CODE",
            { value: "E394", enumerable: !1, configurable: !0 },
          );
        }
        respondWith() {
          throw Object.defineProperty(
            new T.CB({ page: this.sourcePage }),
            "__NEXT_ERROR_CODE",
            { value: "E394", enumerable: !1, configurable: !0 },
          );
        }
      }
      var j = r(87848),
        L = r(79590);
      function N(e, t) {
        let r = "string" == typeof t ? new URL(t) : t,
          n = new URL(e, t),
          i = n.origin === r.origin;
        return {
          url: i ? n.toString().slice(r.origin.length) : n.toString(),
          isRelative: i,
        };
      }
      var M = r(45077);
      let D = "Next-Router-Prefetch",
        $ = [
          "RSC",
          "Next-Router-State-Tree",
          D,
          "Next-HMR-Refresh",
          "Next-Router-Segment-Prefetch",
        ],
        q = "_rsc";
      var U = r(47737);
      class B extends Error {
        constructor() {
          super(
            "Headers cannot be modified. Read more: https://nextjs.org/docs/app/api-reference/functions/headers",
          );
        }
        static callable() {
          throw new B();
        }
      }
      class G extends Headers {
        constructor(e) {
          super(),
            (this.headers = new Proxy(e, {
              get(t, r, n) {
                if ("symbol" == typeof r) return U.l.get(t, r, n);
                let i = r.toLowerCase(),
                  s = Object.keys(e).find((e) => e.toLowerCase() === i);
                if (void 0 !== s) return U.l.get(t, s, n);
              },
              set(t, r, n, i) {
                if ("symbol" == typeof r) return U.l.set(t, r, n, i);
                let s = r.toLowerCase(),
                  a = Object.keys(e).find((e) => e.toLowerCase() === s);
                return U.l.set(t, a ?? r, n, i);
              },
              has(t, r) {
                if ("symbol" == typeof r) return U.l.has(t, r);
                let n = r.toLowerCase(),
                  i = Object.keys(e).find((e) => e.toLowerCase() === n);
                return void 0 !== i && U.l.has(t, i);
              },
              deleteProperty(t, r) {
                if ("symbol" == typeof r) return U.l.deleteProperty(t, r);
                let n = r.toLowerCase(),
                  i = Object.keys(e).find((e) => e.toLowerCase() === n);
                return void 0 === i || U.l.deleteProperty(t, i);
              },
            }));
        }
        static seal(e) {
          return new Proxy(e, {
            get(e, t, r) {
              switch (t) {
                case "append":
                case "delete":
                case "set":
                  return B.callable;
                default:
                  return U.l.get(e, t, r);
              }
            },
          });
        }
        merge(e) {
          return Array.isArray(e) ? e.join(", ") : e;
        }
        static from(e) {
          return e instanceof Headers ? e : new G(e);
        }
        append(e, t) {
          let r = this.headers[e];
          "string" == typeof r
            ? (this.headers[e] = [r, t])
            : Array.isArray(r)
              ? r.push(t)
              : (this.headers[e] = t);
        }
        delete(e) {
          delete this.headers[e];
        }
        get(e) {
          let t = this.headers[e];
          return void 0 !== t ? this.merge(t) : null;
        }
        has(e) {
          return void 0 !== this.headers[e];
        }
        set(e, t) {
          this.headers[e] = t;
        }
        forEach(e, t) {
          for (let [r, n] of this.entries()) e.call(t, n, r, this);
        }
        *entries() {
          for (let e of Object.keys(this.headers)) {
            let t = e.toLowerCase(),
              r = this.get(t);
            yield [t, r];
          }
        }
        *keys() {
          for (let e of Object.keys(this.headers)) {
            let t = e.toLowerCase();
            yield t;
          }
        }
        *values() {
          for (let e of Object.keys(this.headers)) {
            let t = this.get(e);
            yield t;
          }
        }
        [Symbol.iterator]() {
          return this.entries();
        }
      }
      var z = r(29130),
        H = r(35264),
        F = r(21261);
      class W extends Error {
        constructor() {
          super(
            "Cookies can only be modified in a Server Action or Route Handler. Read more: https://nextjs.org/docs/app/api-reference/functions/cookies#options",
          );
        }
        static callable() {
          throw new W();
        }
      }
      class K {
        static seal(e) {
          return new Proxy(e, {
            get(e, t, r) {
              switch (t) {
                case "clear":
                case "delete":
                case "set":
                  return W.callable;
                default:
                  return U.l.get(e, t, r);
              }
            },
          });
        }
      }
      let V = Symbol.for("next.mutated.cookies");
      class J {
        static wrap(e, t) {
          let r = new z.VO(new Headers());
          for (let t of e.getAll()) r.set(t);
          let n = [],
            i = new Set(),
            s = () => {
              let e = H.J.getStore();
              if (
                (e && (e.pathWasRevalidated = !0),
                (n = r.getAll().filter((e) => i.has(e.name))),
                t)
              ) {
                let e = [];
                for (let t of n) {
                  let r = new z.VO(new Headers());
                  r.set(t), e.push(r.toString());
                }
                t(e);
              }
            },
            a = new Proxy(r, {
              get(e, t, r) {
                switch (t) {
                  case V:
                    return n;
                  case "delete":
                    return function (...t) {
                      i.add("string" == typeof t[0] ? t[0] : t[0].name);
                      try {
                        return e.delete(...t), a;
                      } finally {
                        s();
                      }
                    };
                  case "set":
                    return function (...t) {
                      i.add("string" == typeof t[0] ? t[0] : t[0].name);
                      try {
                        return e.set(...t), a;
                      } finally {
                        s();
                      }
                    };
                  default:
                    return U.l.get(e, t, r);
                }
              },
            });
          return a;
        }
      }
      function X(e) {
        if ("action" !== (0, F.XN)(e).phase) throw new W();
      }
      var Y = r(20421),
        Z = (function (e) {
          return (
            (e.handleRequest = "BaseServer.handleRequest"),
            (e.run = "BaseServer.run"),
            (e.pipe = "BaseServer.pipe"),
            (e.getStaticHTML = "BaseServer.getStaticHTML"),
            (e.render = "BaseServer.render"),
            (e.renderToResponseWithComponents =
              "BaseServer.renderToResponseWithComponents"),
            (e.renderToResponse = "BaseServer.renderToResponse"),
            (e.renderToHTML = "BaseServer.renderToHTML"),
            (e.renderError = "BaseServer.renderError"),
            (e.renderErrorToResponse = "BaseServer.renderErrorToResponse"),
            (e.renderErrorToHTML = "BaseServer.renderErrorToHTML"),
            (e.render404 = "BaseServer.render404"),
            e
          );
        })(Z || {}),
        Q = (function (e) {
          return (
            (e.loadDefaultErrorComponents =
              "LoadComponents.loadDefaultErrorComponents"),
            (e.loadComponents = "LoadComponents.loadComponents"),
            e
          );
        })(Q || {}),
        ee = (function (e) {
          return (
            (e.getRequestHandler = "NextServer.getRequestHandler"),
            (e.getServer = "NextServer.getServer"),
            (e.getServerRequestHandler = "NextServer.getServerRequestHandler"),
            (e.createServer = "createServer.createServer"),
            e
          );
        })(ee || {}),
        et = (function (e) {
          return (
            (e.compression = "NextNodeServer.compression"),
            (e.getBuildId = "NextNodeServer.getBuildId"),
            (e.createComponentTree = "NextNodeServer.createComponentTree"),
            (e.clientComponentLoading =
              "NextNodeServer.clientComponentLoading"),
            (e.getLayoutOrPageModule = "NextNodeServer.getLayoutOrPageModule"),
            (e.generateStaticRoutes = "NextNodeServer.generateStaticRoutes"),
            (e.generateFsStaticRoutes =
              "NextNodeServer.generateFsStaticRoutes"),
            (e.generatePublicRoutes = "NextNodeServer.generatePublicRoutes"),
            (e.generateImageRoutes =
              "NextNodeServer.generateImageRoutes.route"),
            (e.sendRenderResult = "NextNodeServer.sendRenderResult"),
            (e.proxyRequest = "NextNodeServer.proxyRequest"),
            (e.runApi = "NextNodeServer.runApi"),
            (e.render = "NextNodeServer.render"),
            (e.renderHTML = "NextNodeServer.renderHTML"),
            (e.imageOptimizer = "NextNodeServer.imageOptimizer"),
            (e.getPagePath = "NextNodeServer.getPagePath"),
            (e.getRoutesManifest = "NextNodeServer.getRoutesManifest"),
            (e.findPageComponents = "NextNodeServer.findPageComponents"),
            (e.getFontManifest = "NextNodeServer.getFontManifest"),
            (e.getServerComponentManifest =
              "NextNodeServer.getServerComponentManifest"),
            (e.getRequestHandler = "NextNodeServer.getRequestHandler"),
            (e.renderToHTML = "NextNodeServer.renderToHTML"),
            (e.renderError = "NextNodeServer.renderError"),
            (e.renderErrorToHTML = "NextNodeServer.renderErrorToHTML"),
            (e.render404 = "NextNodeServer.render404"),
            (e.startResponse = "NextNodeServer.startResponse"),
            (e.route = "route"),
            (e.onProxyReq = "onProxyReq"),
            (e.apiResolver = "apiResolver"),
            (e.internalFetch = "internalFetch"),
            e
          );
        })(et || {}),
        er = (function (e) {
          return (e.startServer = "startServer.startServer"), e;
        })(er || {}),
        en = (function (e) {
          return (
            (e.getServerSideProps = "Render.getServerSideProps"),
            (e.getStaticProps = "Render.getStaticProps"),
            (e.renderToString = "Render.renderToString"),
            (e.renderDocument = "Render.renderDocument"),
            (e.createBodyResult = "Render.createBodyResult"),
            e
          );
        })(en || {}),
        ei = (function (e) {
          return (
            (e.renderToString = "AppRender.renderToString"),
            (e.renderToReadableStream = "AppRender.renderToReadableStream"),
            (e.getBodyResult = "AppRender.getBodyResult"),
            (e.fetch = "AppRender.fetch"),
            e
          );
        })(ei || {}),
        es = (function (e) {
          return (e.executeRoute = "Router.executeRoute"), e;
        })(es || {}),
        ea = (function (e) {
          return (e.runHandler = "Node.runHandler"), e;
        })(ea || {}),
        eo = (function (e) {
          return (e.runHandler = "AppRouteRouteHandlers.runHandler"), e;
        })(eo || {}),
        el = (function (e) {
          return (
            (e.generateMetadata = "ResolveMetadata.generateMetadata"),
            (e.generateViewport = "ResolveMetadata.generateViewport"),
            e
          );
        })(el || {}),
        eu = (function (e) {
          return (e.execute = "Middleware.execute"), e;
        })(eu || {});
      let ec = [
          "Middleware.execute",
          "BaseServer.handleRequest",
          "Render.getServerSideProps",
          "Render.getStaticProps",
          "AppRender.fetch",
          "AppRender.getBodyResult",
          "Render.renderDocument",
          "Node.runHandler",
          "AppRouteRouteHandlers.runHandler",
          "ResolveMetadata.generateMetadata",
          "ResolveMetadata.generateViewport",
          "NextNodeServer.createComponentTree",
          "NextNodeServer.findPageComponents",
          "NextNodeServer.getLayoutOrPageModule",
          "NextNodeServer.startResponse",
          "NextNodeServer.clientComponentLoading",
        ],
        ed = [
          "NextNodeServer.findPageComponents",
          "NextNodeServer.createComponentTree",
          "NextNodeServer.clientComponentLoading",
        ];
      function eh(e) {
        return (
          null !== e &&
          "object" == typeof e &&
          "then" in e &&
          "function" == typeof e.then
        );
      }
      let {
        context: ef,
        propagation: ep,
        trace: e_,
        SpanStatusCode: eg,
        SpanKind: em,
        ROOT_CONTEXT: ey,
      } = (n = r(991));
      class ew extends Error {
        constructor(e, t) {
          super(), (this.bubble = e), (this.result = t);
        }
      }
      let ev = (e, t) => {
          (function (e) {
            return "object" == typeof e && null !== e && e instanceof ew;
          })(t) && t.bubble
            ? e.setAttribute("next.bubble", !0)
            : (t && e.recordException(t),
              e.setStatus({
                code: eg.ERROR,
                message: null == t ? void 0 : t.message,
              })),
            e.end();
        },
        eb = new Map(),
        eS = n.createContextKey("next.rootSpanId"),
        eE = 0,
        ek = () => eE++,
        ex = {
          set(e, t, r) {
            e.push({ key: t, value: r });
          },
        };
      class eT {
        getTracerInstance() {
          return e_.getTracer("next.js", "0.0.1");
        }
        getContext() {
          return ef;
        }
        getTracePropagationData() {
          let e = ef.active(),
            t = [];
          return ep.inject(e, t, ex), t;
        }
        getActiveScopeSpan() {
          return e_.getSpan(null == ef ? void 0 : ef.active());
        }
        withPropagatedContext(e, t, r) {
          let n = ef.active();
          if (e_.getSpanContext(n)) return t();
          let i = ep.extract(n, e, r);
          return ef.with(i, t);
        }
        trace(...e) {
          var t;
          let [r, n, i] = e,
            { fn: s, options: a } =
              "function" == typeof n
                ? { fn: n, options: {} }
                : { fn: i, options: { ...n } },
            o = a.spanName ?? r;
          if (
            (!ec.includes(r) && "1" !== process.env.NEXT_OTEL_VERBOSE) ||
            a.hideSpan
          )
            return s();
          let l = this.getSpanContext(
              (null == a ? void 0 : a.parentSpan) ?? this.getActiveScopeSpan(),
            ),
            u = !1;
          l
            ? (null == (t = e_.getSpanContext(l)) ? void 0 : t.isRemote) &&
              (u = !0)
            : ((l = (null == ef ? void 0 : ef.active()) ?? ey), (u = !0));
          let c = ek();
          return (
            (a.attributes = {
              "next.span_name": o,
              "next.span_type": r,
              ...a.attributes,
            }),
            ef.with(l.setValue(eS, c), () =>
              this.getTracerInstance().startActiveSpan(o, a, (e) => {
                let t =
                    "performance" in globalThis && "measure" in performance
                      ? globalThis.performance.now()
                      : void 0,
                  n = () => {
                    eb.delete(c),
                      t &&
                        process.env.NEXT_OTEL_PERFORMANCE_PREFIX &&
                        ed.includes(r || "") &&
                        performance.measure(
                          `${process.env.NEXT_OTEL_PERFORMANCE_PREFIX}:next-${(r.split(".").pop() || "").replace(/[A-Z]/g, (e) => "-" + e.toLowerCase())}`,
                          { start: t, end: performance.now() },
                        );
                  };
                u && eb.set(c, new Map(Object.entries(a.attributes ?? {})));
                try {
                  if (s.length > 1) return s(e, (t) => ev(e, t));
                  let t = s(e);
                  if (eh(t))
                    return t
                      .then((t) => (e.end(), t))
                      .catch((t) => {
                        throw (ev(e, t), t);
                      })
                      .finally(n);
                  return e.end(), n(), t;
                } catch (t) {
                  throw (ev(e, t), n(), t);
                }
              }),
            )
          );
        }
        wrap(...e) {
          let t = this,
            [r, n, i] = 3 === e.length ? e : [e[0], {}, e[1]];
          return ec.includes(r) || "1" === process.env.NEXT_OTEL_VERBOSE
            ? function () {
                let e = n;
                "function" == typeof e &&
                  "function" == typeof i &&
                  (e = e.apply(this, arguments));
                let s = arguments.length - 1,
                  a = arguments[s];
                if ("function" != typeof a)
                  return t.trace(r, e, () => i.apply(this, arguments));
                {
                  let n = t.getContext().bind(ef.active(), a);
                  return t.trace(
                    r,
                    e,
                    (e, t) => (
                      (arguments[s] = function (e) {
                        return null == t || t(e), n.apply(this, arguments);
                      }),
                      i.apply(this, arguments)
                    ),
                  );
                }
              }
            : i;
        }
        startSpan(...e) {
          let [t, r] = e,
            n = this.getSpanContext(
              (null == r ? void 0 : r.parentSpan) ?? this.getActiveScopeSpan(),
            );
          return this.getTracerInstance().startSpan(t, r, n);
        }
        getSpanContext(e) {
          return e ? e_.setSpan(ef.active(), e) : void 0;
        }
        getRootSpanAttributes() {
          let e = ef.active().getValue(eS);
          return eb.get(e);
        }
        setRootSpanAttribute(e, t) {
          let r = ef.active().getValue(eS),
            n = eb.get(r);
          n && n.set(e, t);
        }
      }
      let eR = (() => {
          let e = new eT();
          return () => e;
        })(),
        eC = "__prerender_bypass";
      Symbol("__next_preview_data"), Symbol(eC);
      class eP {
        constructor(e, t, r, n) {
          var i;
          let s =
              e &&
              (function (e, t) {
                let r = G.from(e.headers);
                return {
                  isOnDemandRevalidate: r.get(Y.kz) === t.previewModeId,
                  revalidateOnlyGenerated: r.has(Y.r4),
                };
              })(t, e).isOnDemandRevalidate,
            a = null == (i = r.get(eC)) ? void 0 : i.value;
          (this._isEnabled = !!(!s && a && e && a === e.previewModeId)),
            (this._previewModeId = null == e ? void 0 : e.previewModeId),
            (this._mutableCookies = n);
        }
        get isEnabled() {
          return this._isEnabled;
        }
        enable() {
          if (!this._previewModeId)
            throw Object.defineProperty(
              Error(
                "Invariant: previewProps missing previewModeId this should never happen",
              ),
              "__NEXT_ERROR_CODE",
              { value: "E93", enumerable: !1, configurable: !0 },
            );
          this._mutableCookies.set({
            name: eC,
            value: this._previewModeId,
            httpOnly: !0,
            sameSite: "none",
            secure: !0,
            path: "/",
          }),
            (this._isEnabled = !0);
        }
        disable() {
          this._mutableCookies.set({
            name: eC,
            value: "",
            httpOnly: !0,
            sameSite: "none",
            secure: !0,
            path: "/",
            expires: new Date(0),
          }),
            (this._isEnabled = !1);
        }
      }
      function eO(e, t) {
        if (
          "x-middleware-set-cookie" in e.headers &&
          "string" == typeof e.headers["x-middleware-set-cookie"]
        ) {
          let r = e.headers["x-middleware-set-cookie"],
            n = new Headers();
          for (let e of (0, R.RD)(r)) n.append("set-cookie", e);
          for (let e of new z.VO(n).getAll()) t.set(e);
        }
      }
      var eA = r(71803),
        eI = r.n(eA),
        ej = r(25503);
      class eL {
        constructor(e, t) {
          (this.cache = new Map()),
            (this.sizes = new Map()),
            (this.totalSize = 0),
            (this.maxSize = e),
            (this.calculateSize = t || (() => 1));
        }
        set(e, t) {
          if (!e || !t) return;
          let r = this.calculateSize(t);
          if (r > this.maxSize)
            return void console.warn("Single item size exceeds maxSize");
          this.cache.has(e) && (this.totalSize -= this.sizes.get(e) || 0),
            this.cache.set(e, t),
            this.sizes.set(e, r),
            (this.totalSize += r),
            this.touch(e);
        }
        has(e) {
          return !!e && (this.touch(e), !!this.cache.get(e));
        }
        get(e) {
          if (!e) return;
          let t = this.cache.get(e);
          if (void 0 !== t) return this.touch(e), t;
        }
        touch(e) {
          let t = this.cache.get(e);
          void 0 !== t &&
            (this.cache.delete(e),
            this.cache.set(e, t),
            this.evictIfNecessary());
        }
        evictIfNecessary() {
          for (; this.totalSize > this.maxSize && this.cache.size > 0; )
            this.evictLeastRecentlyUsed();
        }
        evictLeastRecentlyUsed() {
          let e = this.cache.keys().next().value;
          if (void 0 !== e) {
            let t = this.sizes.get(e) || 0;
            (this.totalSize -= t), this.cache.delete(e), this.sizes.delete(e);
          }
        }
        reset() {
          this.cache.clear(), this.sizes.clear(), (this.totalSize = 0);
        }
        keys() {
          return [...this.cache.keys()];
        }
        remove(e) {
          this.cache.has(e) &&
            ((this.totalSize -= this.sizes.get(e) || 0),
            this.cache.delete(e),
            this.sizes.delete(e));
        }
        clear() {
          this.cache.clear(), this.sizes.clear(), (this.totalSize = 0);
        }
        get size() {
          return this.cache.size;
        }
        get currentSize() {
          return this.totalSize;
        }
      }
      r(25356).Buffer,
        new eL(0x3200000, (e) => e.size),
        process.env.NEXT_PRIVATE_DEBUG_CACHE || (() => {}),
        Symbol.for("@next/cache-handlers"),
        Symbol.for("@next/cache-handlers-map");
      let eN = Symbol.for("@next/cache-handlers-set"),
        eM = globalThis;
      async function eD(e, t) {
        if (!e) return t();
        let r = e$(e);
        try {
          return await t();
        } finally {
          let t = (function (e, t) {
            let r = new Set(e.pendingRevalidatedTags),
              n = new Set(e.pendingRevalidateWrites);
            return {
              pendingRevalidatedTags: t.pendingRevalidatedTags.filter(
                (e) => !r.has(e),
              ),
              pendingRevalidates: Object.fromEntries(
                Object.entries(t.pendingRevalidates).filter(
                  ([t]) => !(t in e.pendingRevalidates),
                ),
              ),
              pendingRevalidateWrites: t.pendingRevalidateWrites.filter(
                (e) => !n.has(e),
              ),
            };
          })(r, e$(e));
          await eU(e, t);
        }
      }
      function e$(e) {
        return {
          pendingRevalidatedTags: e.pendingRevalidatedTags
            ? [...e.pendingRevalidatedTags]
            : [],
          pendingRevalidates: { ...e.pendingRevalidates },
          pendingRevalidateWrites: e.pendingRevalidateWrites
            ? [...e.pendingRevalidateWrites]
            : [],
        };
      }
      async function eq(e, t) {
        if (0 === e.length) return;
        let r = [];
        t && r.push(t.revalidateTag(e));
        let n = (function () {
          if (eM[eN]) return eM[eN].values();
        })();
        if (n) for (let t of n) r.push(t.expireTags(...e));
        await Promise.all(r);
      }
      async function eU(e, t) {
        let r =
            (null == t ? void 0 : t.pendingRevalidatedTags) ??
            e.pendingRevalidatedTags ??
            [],
          n =
            (null == t ? void 0 : t.pendingRevalidates) ??
            e.pendingRevalidates ??
            {},
          i =
            (null == t ? void 0 : t.pendingRevalidateWrites) ??
            e.pendingRevalidateWrites ??
            [];
        return Promise.all([
          eq(r, e.incrementalCache),
          ...Object.values(n),
          ...i,
        ]);
      }
      var eB = r(94664),
        eG = r(71659);
      class ez {
        constructor({ waitUntil: e, onClose: t, onTaskError: r }) {
          (this.workUnitStores = new Set()),
            (this.waitUntil = e),
            (this.onClose = t),
            (this.onTaskError = r),
            (this.callbackQueue = new (eI())()),
            this.callbackQueue.pause();
        }
        after(e) {
          if (eh(e))
            this.waitUntil || eH(),
              this.waitUntil(
                e.catch((e) => this.reportTaskError("promise", e)),
              );
          else if ("function" == typeof e) this.addCallback(e);
          else
            throw Object.defineProperty(
              Error("`after()`: Argument must be a promise or a function"),
              "__NEXT_ERROR_CODE",
              { value: "E50", enumerable: !1, configurable: !0 },
            );
        }
        addCallback(e) {
          this.waitUntil || eH();
          let t = F.FP.getStore();
          t && this.workUnitStores.add(t);
          let r = eG.Z.getStore(),
            n = r ? r.rootTaskSpawnPhase : null == t ? void 0 : t.phase;
          this.runCallbacksOnClosePromise ||
            ((this.runCallbacksOnClosePromise = this.runCallbacksOnClose()),
            this.waitUntil(this.runCallbacksOnClosePromise));
          let i = (0, eB.cg)(async () => {
            try {
              await eG.Z.run({ rootTaskSpawnPhase: n }, () => e());
            } catch (e) {
              this.reportTaskError("function", e);
            }
          });
          this.callbackQueue.add(i);
        }
        async runCallbacksOnClose() {
          return await new Promise((e) => this.onClose(e)), this.runCallbacks();
        }
        async runCallbacks() {
          if (0 === this.callbackQueue.size) return;
          for (let e of this.workUnitStores) e.phase = "after";
          let e = H.J.getStore();
          if (!e)
            throw Object.defineProperty(
              new ej.z("Missing workStore in AfterContext.runCallbacks"),
              "__NEXT_ERROR_CODE",
              { value: "E547", enumerable: !1, configurable: !0 },
            );
          return eD(
            e,
            () => (this.callbackQueue.start(), this.callbackQueue.onIdle()),
          );
        }
        reportTaskError(e, t) {
          if (
            (console.error(
              "promise" === e
                ? "A promise passed to `after()` rejected:"
                : "An error occurred in a function passed to `after()`:",
              t,
            ),
            this.onTaskError)
          )
            try {
              null == this.onTaskError || this.onTaskError.call(this, t);
            } catch (e) {
              console.error(
                Object.defineProperty(
                  new ej.z(
                    "`onTaskError` threw while handling an error thrown from an `after` task",
                    { cause: e },
                  ),
                  "__NEXT_ERROR_CODE",
                  { value: "E569", enumerable: !1, configurable: !0 },
                ),
              );
            }
        }
      }
      function eH() {
        throw Object.defineProperty(
          Error(
            "`after()` will not work correctly, because `waitUntil` is not available in the current environment.",
          ),
          "__NEXT_ERROR_CODE",
          { value: "E91", enumerable: !1, configurable: !0 },
        );
      }
      class eF {
        onClose(e) {
          if (this.isClosed)
            throw Object.defineProperty(
              Error("Cannot subscribe to a closed CloseController"),
              "__NEXT_ERROR_CODE",
              { value: "E365", enumerable: !1, configurable: !0 },
            );
          this.target.addEventListener("close", e), this.listeners++;
        }
        dispatchClose() {
          if (this.isClosed)
            throw Object.defineProperty(
              Error("Cannot close a CloseController multiple times"),
              "__NEXT_ERROR_CODE",
              { value: "E229", enumerable: !1, configurable: !0 },
            );
          this.listeners > 0 && this.target.dispatchEvent(new Event("close")),
            (this.isClosed = !0);
        }
        constructor() {
          (this.target = new EventTarget()),
            (this.listeners = 0),
            (this.isClosed = !1);
        }
      }
      function eW() {
        return {
          previewModeId: process.env.__NEXT_PREVIEW_MODE_ID,
          previewModeSigningKey:
            process.env.__NEXT_PREVIEW_MODE_SIGNING_KEY || "",
          previewModeEncryptionKey:
            process.env.__NEXT_PREVIEW_MODE_ENCRYPTION_KEY || "",
        };
      }
      let eK = Symbol.for("@next/request-context");
      class eV extends j.J {
        constructor(e) {
          super(e.input, e.init), (this.sourcePage = e.page);
        }
        get request() {
          throw Object.defineProperty(
            new T.CB({ page: this.sourcePage }),
            "__NEXT_ERROR_CODE",
            { value: "E394", enumerable: !1, configurable: !0 },
          );
        }
        respondWith() {
          throw Object.defineProperty(
            new T.CB({ page: this.sourcePage }),
            "__NEXT_ERROR_CODE",
            { value: "E394", enumerable: !1, configurable: !0 },
          );
        }
        waitUntil() {
          throw Object.defineProperty(
            new T.CB({ page: this.sourcePage }),
            "__NEXT_ERROR_CODE",
            { value: "E394", enumerable: !1, configurable: !0 },
          );
        }
      }
      let eJ = {
          keys: (e) => Array.from(e.keys()),
          get: (e, t) => e.get(t) ?? void 0,
        },
        eX = (e, t) => eR().withPropagatedContext(e.headers, t, eJ),
        eY = !1;
      async function eZ(e) {
        var t;
        let n, i;
        if (
          !eY &&
          ((eY = !0), "true" === process.env.NEXT_PRIVATE_TEST_PROXY)
        ) {
          let { interceptTestApis: e, wrapRequestHandler: t } = r(58010);
          e(), (eX = t(eX));
        }
        await k();
        let s = void 0 !== globalThis.__BUILD_MANIFEST;
        e.request.url = e.request.url.replace(/\.rsc($|\?)/, "$1");
        let a = new M.X(e.request.url, {
          headers: e.request.headers,
          nextConfig: e.request.nextConfig,
        });
        for (let e of [...a.searchParams.keys()]) {
          let t = a.searchParams.getAll(e),
            r = (0, R.wN)(e);
          if (r) {
            for (let e of (a.searchParams.delete(r), t))
              a.searchParams.append(r, e);
            a.searchParams.delete(e);
          }
        }
        let o = a.buildId;
        a.buildId = "";
        let l = (0, R.p$)(e.request.headers),
          u = l.has("x-nextjs-data"),
          c = "1" === l.get("RSC");
        u && "/index" === a.pathname && (a.pathname = "/");
        let d = new Map();
        if (!s)
          for (let e of $) {
            let t = e.toLowerCase(),
              r = l.get(t);
            null !== r && (d.set(t, r), l.delete(t));
          }
        let h = new eV({
          page: e.page,
          input: (function (e) {
            let t = "string" == typeof e,
              r = t ? new URL(e) : e;
            return r.searchParams.delete(q), t ? r.toString() : r;
          })(a).toString(),
          init: {
            body: e.request.body,
            headers: l,
            method: e.request.method,
            nextConfig: e.request.nextConfig,
            signal: e.request.signal,
          },
        });
        u &&
          Object.defineProperty(h, "__isData", { enumerable: !1, value: !0 }),
          !globalThis.__incrementalCache &&
            e.IncrementalCache &&
            (globalThis.__incrementalCache = new e.IncrementalCache({
              appDir: !0,
              fetchCache: !0,
              minimalMode: !0,
              fetchCacheKeyPrefix: "",
              dev: !1,
              requestHeaders: e.request.headers,
              requestProtocol: "https",
              getPrerenderManifest: () => ({
                version: -1,
                routes: {},
                dynamicRoutes: {},
                notFoundRoutes: [],
                preview: eW(),
              }),
            }));
        let f =
            e.request.waitUntil ??
            (null ==
            (t = (function () {
              let e = globalThis[eK];
              return null == e ? void 0 : e.get();
            })())
              ? void 0
              : t.waitUntil),
          p = new I({
            request: h,
            page: e.page,
            context: f ? { waitUntil: f } : void 0,
          });
        if (
          (n = await eX(h, () => {
            if ("/middleware" === e.page || "/src/middleware" === e.page) {
              let t = p.waitUntil.bind(p),
                r = new eF();
              return eR().trace(
                eu.execute,
                {
                  spanName: `middleware ${h.method} ${h.nextUrl.pathname}`,
                  attributes: {
                    "http.target": h.nextUrl.pathname,
                    "http.method": h.method,
                  },
                },
                async () => {
                  try {
                    var n, s, a, l, u, c, d;
                    let f = eW(),
                      _ =
                        ((u = h.nextUrl),
                        (c = void 0),
                        (d = (e) => {
                          i = e;
                        }),
                        (function (e, t, r, n, i, s, a, o, l, u, c) {
                          function d(e) {
                            r && r.setHeader("Set-Cookie", e);
                          }
                          let h = {};
                          return {
                            type: "request",
                            phase: e,
                            implicitTags: s,
                            url: {
                              pathname: n.pathname,
                              search: n.search ?? "",
                            },
                            rootParams: i,
                            get headers() {
                              return (
                                h.headers ||
                                  (h.headers = (function (e) {
                                    let t = G.from(e);
                                    for (let e of $) t.delete(e.toLowerCase());
                                    return G.seal(t);
                                  })(t.headers)),
                                h.headers
                              );
                            },
                            get cookies() {
                              if (!h.cookies) {
                                let e = new z.tm(G.from(t.headers));
                                eO(t, e), (h.cookies = K.seal(e));
                              }
                              return h.cookies;
                            },
                            set cookies(value) {
                              h.cookies = value;
                            },
                            get mutableCookies() {
                              if (!h.mutableCookies) {
                                let e = (function (e, t) {
                                  let r = new z.tm(G.from(e));
                                  return J.wrap(r, t);
                                })(t.headers, a || (r ? d : void 0));
                                eO(t, e), (h.mutableCookies = e);
                              }
                              return h.mutableCookies;
                            },
                            get userspaceMutableCookies() {
                              return (
                                h.userspaceMutableCookies ||
                                  (h.userspaceMutableCookies = (function (e) {
                                    let t = new Proxy(e, {
                                      get(e, r, n) {
                                        switch (r) {
                                          case "delete":
                                            return function (...r) {
                                              return (
                                                X("cookies().delete"),
                                                e.delete(...r),
                                                t
                                              );
                                            };
                                          case "set":
                                            return function (...r) {
                                              return (
                                                X("cookies().set"),
                                                e.set(...r),
                                                t
                                              );
                                            };
                                          default:
                                            return U.l.get(e, r, n);
                                        }
                                      },
                                    });
                                    return t;
                                  })(this.mutableCookies)),
                                h.userspaceMutableCookies
                              );
                            },
                            get draftMode() {
                              return (
                                h.draftMode ||
                                  (h.draftMode = new eP(
                                    l,
                                    t,
                                    this.cookies,
                                    this.mutableCookies,
                                  )),
                                h.draftMode
                              );
                            },
                            renderResumeDataCache: o ?? null,
                            isHmrRefresh: u,
                            serverComponentsHmrCache:
                              c || globalThis.__serverComponentsHmrCache,
                          };
                        })(
                          "action",
                          h,
                          void 0,
                          u,
                          {},
                          c,
                          d,
                          void 0,
                          f,
                          !1,
                          void 0,
                        )),
                      g = (function ({
                        page: e,
                        fallbackRouteParams: t,
                        renderOpts: r,
                        requestEndedState: n,
                        isPrefetchRequest: i,
                        buildId: s,
                        previouslyRevalidatedTags: a,
                      }) {
                        var o;
                        let l = {
                          isStaticGeneration:
                            !r.shouldWaitOnAllReady &&
                            !r.supportsDynamicResponse &&
                            !r.isDraftMode &&
                            !r.isServerAction,
                          page: e,
                          fallbackRouteParams: t,
                          route: (o = e
                            .split("/")
                            .reduce(
                              (e, t, r, n) =>
                                t
                                  ? ("(" === t[0] && t.endsWith(")")) ||
                                    "@" === t[0] ||
                                    (("page" === t || "route" === t) &&
                                      r === n.length - 1)
                                    ? e
                                    : e + "/" + t
                                  : e,
                              "",
                            )).startsWith("/")
                            ? o
                            : "/" + o,
                          incrementalCache:
                            r.incrementalCache || globalThis.__incrementalCache,
                          cacheLifeProfiles: r.cacheLifeProfiles,
                          isRevalidate: r.isRevalidate,
                          isPrerendering: r.nextExport,
                          fetchCache: r.fetchCache,
                          isOnDemandRevalidate: r.isOnDemandRevalidate,
                          isDraftMode: r.isDraftMode,
                          requestEndedState: n,
                          isPrefetchRequest: i,
                          buildId: s,
                          reactLoadableManifest:
                            (null == r ? void 0 : r.reactLoadableManifest) ||
                            {},
                          assetPrefix:
                            (null == r ? void 0 : r.assetPrefix) || "",
                          afterContext: (function (e) {
                            let {
                              waitUntil: t,
                              onClose: r,
                              onAfterTaskError: n,
                            } = e;
                            return new ez({
                              waitUntil: t,
                              onClose: r,
                              onTaskError: n,
                            });
                          })(r),
                          dynamicIOEnabled: r.experimental.dynamicIO,
                          dev: r.dev ?? !1,
                          previouslyRevalidatedTags: a,
                        };
                        return (r.store = l), l;
                      })({
                        page: "/",
                        fallbackRouteParams: null,
                        renderOpts: {
                          cacheLifeProfiles:
                            null == (s = e.request.nextConfig) ||
                            null == (n = s.experimental)
                              ? void 0
                              : n.cacheLife,
                          experimental: {
                            isRoutePPREnabled: !1,
                            dynamicIO: !1,
                            authInterrupts: !!(null ==
                              (l = e.request.nextConfig) ||
                            null == (a = l.experimental)
                              ? void 0
                              : a.authInterrupts),
                          },
                          supportsDynamicResponse: !0,
                          waitUntil: t,
                          onClose: r.onClose.bind(r),
                          onAfterTaskError: void 0,
                        },
                        requestEndedState: { ended: !1 },
                        isPrefetchRequest: h.headers.has(D),
                        buildId: o ?? "",
                        previouslyRevalidatedTags: [],
                      });
                    return await H.J.run(g, () => F.FP.run(_, e.handler, h, p));
                  } finally {
                    setTimeout(() => {
                      r.dispatchClose();
                    }, 0);
                  }
                },
              );
            }
            return e.handler(h, p);
          })) &&
          !(n instanceof Response)
        )
          throw Object.defineProperty(
            TypeError("Expected an instance of Response to be returned"),
            "__NEXT_ERROR_CODE",
            { value: "E567", enumerable: !1, configurable: !0 },
          );
        n && i && n.headers.set("set-cookie", i);
        let _ = null == n ? void 0 : n.headers.get("x-middleware-rewrite");
        if (n && _ && (c || !s)) {
          let t = new M.X(_, {
            forceLocale: !0,
            headers: e.request.headers,
            nextConfig: e.request.nextConfig,
          });
          s ||
            t.host !== h.nextUrl.host ||
            ((t.buildId = o || t.buildId),
            n.headers.set("x-middleware-rewrite", String(t)));
          let { url: r, isRelative: i } = N(t.toString(), a.toString());
          !s && u && n.headers.set("x-nextjs-rewrite", r),
            c &&
              i &&
              (a.pathname !== t.pathname &&
                n.headers.set("x-nextjs-rewritten-path", t.pathname),
              a.search !== t.search &&
                n.headers.set("x-nextjs-rewritten-query", t.search.slice(1)));
        }
        let g = null == n ? void 0 : n.headers.get("Location");
        if (n && g && !s) {
          let t = new M.X(g, {
            forceLocale: !1,
            headers: e.request.headers,
            nextConfig: e.request.nextConfig,
          });
          (n = new Response(n.body, n)),
            t.host === a.host &&
              ((t.buildId = o || t.buildId),
              n.headers.set("Location", t.toString())),
            u &&
              (n.headers.delete("Location"),
              n.headers.set(
                "x-nextjs-redirect",
                N(t.toString(), a.toString()).url,
              ));
        }
        let m = n || L.R.next(),
          y = m.headers.get("x-middleware-override-headers"),
          w = [];
        if (y) {
          for (let [e, t] of d)
            m.headers.set(`x-middleware-request-${e}`, t), w.push(e);
          w.length > 0 &&
            m.headers.set(
              "x-middleware-override-headers",
              y + "," + w.join(","),
            );
        }
        return {
          response: m,
          waitUntil:
            ("internal" === p[O].kind
              ? Promise.all(p[O].promises).then(() => {})
              : void 0) ?? Promise.resolve(),
          fetchMetrics: h.fetchMetrics,
        };
      }
      var eQ = r(18947),
        e0 = r(14406),
        e1 = r(81619);
      function e2() {
        return "undefined" != typeof window && void 0 !== window.document;
      }
      let e3 = { path: "/", sameSite: "lax", httpOnly: !1, maxAge: 3456e4 },
        e4 = /^(.*)[.](0|[1-9][0-9]*)$/;
      function e5(e, t) {
        if (e === t) return !0;
        let r = e.match(e4);
        return !!r && r[1] === t;
      }
      function e6(e, t, r) {
        let n = r ?? 3180,
          i = encodeURIComponent(t);
        if (i.length <= n) return [{ name: e, value: t }];
        let s = [];
        for (; i.length > 0; ) {
          let e = i.slice(0, n),
            t = e.lastIndexOf("%");
          t > n - 3 && (e = e.slice(0, t));
          let r = "";
          for (; e.length > 0; )
            try {
              r = decodeURIComponent(e);
              break;
            } catch (t) {
              if (t instanceof URIError && "%" === e.at(-3) && e.length > 3)
                e = e.slice(0, e.length - 3);
              else throw t;
            }
          s.push(r), (i = i.slice(e.length));
        }
        return s.map((t, r) => ({ name: `${e}.${r}`, value: t }));
      }
      async function e9(e, t) {
        let r = await t(e);
        if (r) return r;
        let n = [];
        for (let r = 0; ; r++) {
          let i = `${e}.${r}`,
            s = await t(i);
          if (!s) break;
          n.push(s);
        }
        return n.length > 0 ? n.join("") : null;
      }
      let e8 =
          "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_".split(
            "",
          ),
        e7 = " 	\n\r=".split(""),
        te = (() => {
          let e = Array(128);
          for (let t = 0; t < e.length; t += 1) e[t] = -1;
          for (let t = 0; t < e7.length; t += 1) e[e7[t].charCodeAt(0)] = -2;
          for (let t = 0; t < e8.length; t += 1) e[e8[t].charCodeAt(0)] = t;
          return e;
        })();
      function tt(e) {
        let t = [],
          r = 0,
          n = 0;
        if (
          ((function (e, t) {
            for (let r = 0; r < e.length; r += 1) {
              let n = e.charCodeAt(r);
              if (n > 55295 && n <= 56319) {
                let t = ((n - 55296) * 1024) & 65535;
                (n = (((e.charCodeAt(r + 1) - 56320) & 65535) | t) + 65536),
                  (r += 1);
              }
              !(function (e, t) {
                if (e <= 127) return t(e);
                if (e <= 2047) {
                  t(192 | (e >> 6)), t(128 | (63 & e));
                  return;
                }
                if (e <= 65535) {
                  t(224 | (e >> 12)),
                    t(128 | ((e >> 6) & 63)),
                    t(128 | (63 & e));
                  return;
                }
                if (e <= 1114111) {
                  t(240 | (e >> 18)),
                    t(128 | ((e >> 12) & 63)),
                    t(128 | ((e >> 6) & 63)),
                    t(128 | (63 & e));
                  return;
                }
                throw Error(
                  `Unrecognized Unicode codepoint: ${e.toString(16)}`,
                );
              })(n, t);
            }
          })(e, (e) => {
            for (r = (r << 8) | e, n += 8; n >= 6; ) {
              let e = (r >> (n - 6)) & 63;
              t.push(e8[e]), (n -= 6);
            }
          }),
          n > 0)
        )
          for (r <<= 6 - n, n = 6; n >= 6; ) {
            let e = (r >> (n - 6)) & 63;
            t.push(e8[e]), (n -= 6);
          }
        return t.join("");
      }
      function tr(e) {
        let t = [],
          r = (e) => {
            t.push(String.fromCodePoint(e));
          },
          n = { utf8seq: 0, codepoint: 0 },
          i = 0,
          s = 0;
        for (let t = 0; t < e.length; t += 1) {
          let a = te[e.charCodeAt(t)];
          if (a > -1)
            for (i = (i << 6) | a, s += 6; s >= 8; )
              (function (e, t, r) {
                if (0 === t.utf8seq) {
                  if (e <= 127) return r(e);
                  for (let r = 1; r < 6; r += 1)
                    if (((e >> (7 - r)) & 1) == 0) {
                      t.utf8seq = r;
                      break;
                    }
                  if (2 === t.utf8seq) t.codepoint = 31 & e;
                  else if (3 === t.utf8seq) t.codepoint = 15 & e;
                  else if (4 === t.utf8seq) t.codepoint = 7 & e;
                  else throw Error("Invalid UTF-8 sequence");
                  t.utf8seq -= 1;
                } else if (t.utf8seq > 0) {
                  if (e <= 127) throw Error("Invalid UTF-8 sequence");
                  (t.codepoint = (t.codepoint << 6) | (63 & e)),
                    (t.utf8seq -= 1),
                    0 === t.utf8seq && r(t.codepoint);
                }
              })((i >> (s - 8)) & 255, n, r),
                (s -= 8);
          else if (-2 === a) continue;
          else
            throw Error(
              `Invalid Base64-URL character "${e.at(t)}" at position ${t}`,
            );
        }
        return t.join("");
      }
      let tn = "base64-";
      async function ti(
        { getAll: e, setAll: t, setItems: r, removedItems: n },
        i,
      ) {
        let s = i.cookieEncoding,
          a = i.cookieOptions ?? null,
          o = await e([
            ...(r ? Object.keys(r) : []),
            ...(n ? Object.keys(n) : []),
          ]),
          l = o?.map(({ name: e }) => e) || [],
          u = Object.keys(n).flatMap((e) => l.filter((t) => e5(t, e))),
          c = Object.keys(r).flatMap((e) => {
            let t = new Set(l.filter((t) => e5(t, e))),
              n = r[e];
            "base64url" === s && (n = tn + tt(n));
            let i = e6(e, n);
            return (
              i.forEach((e) => {
                t.delete(e.name);
              }),
              u.push(...t),
              i
            );
          }),
          d = { ...e3, ...a, maxAge: 0 },
          h = { ...e3, ...a, maxAge: e3.maxAge };
        delete d.name,
          delete h.name,
          await t([
            ...u.map((e) => ({ name: e, value: "", options: d })),
            ...c.map(({ name: e, value: t }) => ({
              name: e,
              value: t,
              options: h,
            })),
          ]);
      }
      let ts = (e) => {
        let t;
        return (
          (t =
            e ||
            ("undefined" == typeof fetch
              ? (...e) =>
                  Promise.resolve()
                    .then(r.bind(r, 96148))
                    .then(({ default: t }) => t(...e))
              : fetch)),
          (...e) => t(...e)
        );
      };
      class ta extends Error {
        constructor(e, t = "FunctionsError", r) {
          super(e), (this.name = t), (this.context = r);
        }
      }
      class to extends ta {
        constructor(e) {
          super(
            "Failed to send a request to the Edge Function",
            "FunctionsFetchError",
            e,
          );
        }
      }
      class tl extends ta {
        constructor(e) {
          super(
            "Relay Error invoking the Edge Function",
            "FunctionsRelayError",
            e,
          );
        }
      }
      class tu extends ta {
        constructor(e) {
          super(
            "Edge Function returned a non-2xx status code",
            "FunctionsHttpError",
            e,
          );
        }
      }
      !(function (e) {
        (e.Any = "any"),
          (e.ApNortheast1 = "ap-northeast-1"),
          (e.ApNortheast2 = "ap-northeast-2"),
          (e.ApSouth1 = "ap-south-1"),
          (e.ApSoutheast1 = "ap-southeast-1"),
          (e.ApSoutheast2 = "ap-southeast-2"),
          (e.CaCentral1 = "ca-central-1"),
          (e.EuCentral1 = "eu-central-1"),
          (e.EuWest1 = "eu-west-1"),
          (e.EuWest2 = "eu-west-2"),
          (e.EuWest3 = "eu-west-3"),
          (e.SaEast1 = "sa-east-1"),
          (e.UsEast1 = "us-east-1"),
          (e.UsWest1 = "us-west-1"),
          (e.UsWest2 = "us-west-2");
      })(o || (o = {}));
      class tc {
        constructor(
          e,
          { headers: t = {}, customFetch: r, region: n = o.Any } = {},
        ) {
          (this.url = e),
            (this.headers = t),
            (this.region = n),
            (this.fetch = ts(r));
        }
        setAuth(e) {
          this.headers.Authorization = `Bearer ${e}`;
        }
        invoke(e, t = {}) {
          var r, n, i, s, a;
          return (
            (n = this),
            (i = void 0),
            (s = void 0),
            (a = function* () {
              try {
                let n,
                  i,
                  { headers: s, method: a, body: o } = t,
                  l = {},
                  { region: u } = t;
                u || (u = this.region),
                  u && "any" !== u && (l["x-region"] = u),
                  o &&
                    ((s &&
                      !Object.prototype.hasOwnProperty.call(
                        s,
                        "Content-Type",
                      )) ||
                      !s) &&
                    (("undefined" != typeof Blob && o instanceof Blob) ||
                    o instanceof ArrayBuffer
                      ? ((l["Content-Type"] = "application/octet-stream"),
                        (n = o))
                      : "string" == typeof o
                        ? ((l["Content-Type"] = "text/plain"), (n = o))
                        : "undefined" != typeof FormData &&
                            o instanceof FormData
                          ? (n = o)
                          : ((l["Content-Type"] = "application/json"),
                            (n = JSON.stringify(o))));
                let c = yield this.fetch(`${this.url}/${e}`, {
                    method: a || "POST",
                    headers: Object.assign(
                      Object.assign(Object.assign({}, l), this.headers),
                      s,
                    ),
                    body: n,
                  }).catch((e) => {
                    throw new to(e);
                  }),
                  d = c.headers.get("x-relay-error");
                if (d && "true" === d) throw new tl(c);
                if (!c.ok) throw new tu(c);
                let h = (
                  null != (r = c.headers.get("Content-Type")) ? r : "text/plain"
                )
                  .split(";")[0]
                  .trim();
                return {
                  data:
                    "application/json" === h
                      ? yield c.json()
                      : "application/octet-stream" === h
                        ? yield c.blob()
                        : "text/event-stream" === h
                          ? c
                          : "multipart/form-data" === h
                            ? yield c.formData()
                            : yield c.text(),
                  error: null,
                };
              } catch (e) {
                return { data: null, error: e };
              }
            }),
            new (s || (s = Promise))(function (e, t) {
              function r(e) {
                try {
                  l(a.next(e));
                } catch (e) {
                  t(e);
                }
              }
              function o(e) {
                try {
                  l(a.throw(e));
                } catch (e) {
                  t(e);
                }
              }
              function l(t) {
                var n;
                t.done
                  ? e(t.value)
                  : ((n = t.value) instanceof s
                      ? n
                      : new s(function (e) {
                          e(n);
                        })
                    ).then(r, o);
              }
              l((a = a.apply(n, i || [])).next());
            })
          );
        }
      }
      let {
          PostgrestClient: td,
          PostgrestQueryBuilder: th,
          PostgrestFilterBuilder: tf,
          PostgrestTransformBuilder: tp,
          PostgrestBuilder: t_,
          PostgrestError: tg,
        } = r(14773),
        tm = "undefined" == typeof window ? r(993) : window.WebSocket,
        ty = { "X-Client-Info": "realtime-js/2.11.10" };
      !(function (e) {
        (e[(e.connecting = 0)] = "connecting"),
          (e[(e.open = 1)] = "open"),
          (e[(e.closing = 2)] = "closing"),
          (e[(e.closed = 3)] = "closed");
      })(l || (l = {})),
        (function (e) {
          (e.closed = "closed"),
            (e.errored = "errored"),
            (e.joined = "joined"),
            (e.joining = "joining"),
            (e.leaving = "leaving");
        })(u || (u = {})),
        (function (e) {
          (e.close = "phx_close"),
            (e.error = "phx_error"),
            (e.join = "phx_join"),
            (e.reply = "phx_reply"),
            (e.leave = "phx_leave"),
            (e.access_token = "access_token");
        })(c || (c = {})),
        ((d || (d = {})).websocket = "websocket"),
        (function (e) {
          (e.Connecting = "connecting"),
            (e.Open = "open"),
            (e.Closing = "closing"),
            (e.Closed = "closed");
        })(h || (h = {}));
      class tw {
        constructor() {
          this.HEADER_LENGTH = 1;
        }
        decode(e, t) {
          return e.constructor === ArrayBuffer
            ? t(this._binaryDecode(e))
            : "string" == typeof e
              ? t(JSON.parse(e))
              : t({});
        }
        _binaryDecode(e) {
          let t = new DataView(e),
            r = new TextDecoder();
          return this._decodeBroadcast(e, t, r);
        }
        _decodeBroadcast(e, t, r) {
          let n = t.getUint8(1),
            i = t.getUint8(2),
            s = this.HEADER_LENGTH + 2,
            a = r.decode(e.slice(s, s + n));
          s += n;
          let o = r.decode(e.slice(s, s + i));
          return (
            (s += i),
            {
              ref: null,
              topic: a,
              event: o,
              payload: JSON.parse(r.decode(e.slice(s, e.byteLength))),
            }
          );
        }
      }
      class tv {
        constructor(e, t) {
          (this.callback = e),
            (this.timerCalc = t),
            (this.timer = void 0),
            (this.tries = 0),
            (this.callback = e),
            (this.timerCalc = t);
        }
        reset() {
          (this.tries = 0), clearTimeout(this.timer);
        }
        scheduleTimeout() {
          clearTimeout(this.timer),
            (this.timer = setTimeout(
              () => {
                (this.tries = this.tries + 1), this.callback();
              },
              this.timerCalc(this.tries + 1),
            ));
        }
      }
      !(function (e) {
        (e.abstime = "abstime"),
          (e.bool = "bool"),
          (e.date = "date"),
          (e.daterange = "daterange"),
          (e.float4 = "float4"),
          (e.float8 = "float8"),
          (e.int2 = "int2"),
          (e.int4 = "int4"),
          (e.int4range = "int4range"),
          (e.int8 = "int8"),
          (e.int8range = "int8range"),
          (e.json = "json"),
          (e.jsonb = "jsonb"),
          (e.money = "money"),
          (e.numeric = "numeric"),
          (e.oid = "oid"),
          (e.reltime = "reltime"),
          (e.text = "text"),
          (e.time = "time"),
          (e.timestamp = "timestamp"),
          (e.timestamptz = "timestamptz"),
          (e.timetz = "timetz"),
          (e.tsrange = "tsrange"),
          (e.tstzrange = "tstzrange");
      })(f || (f = {}));
      let tb = (e, t, r = {}) => {
          var n;
          let i = null != (n = r.skipTypes) ? n : [];
          return Object.keys(t).reduce(
            (r, n) => ((r[n] = tS(n, e, t, i)), r),
            {},
          );
        },
        tS = (e, t, r, n) => {
          let i = t.find((t) => t.name === e),
            s = null == i ? void 0 : i.type,
            a = r[e];
          return s && !n.includes(s) ? tE(s, a) : tk(a);
        },
        tE = (e, t) => {
          if ("_" === e.charAt(0)) return tC(t, e.slice(1, e.length));
          switch (e) {
            case f.bool:
              return tx(t);
            case f.float4:
            case f.float8:
            case f.int2:
            case f.int4:
            case f.int8:
            case f.numeric:
            case f.oid:
              return tT(t);
            case f.json:
            case f.jsonb:
              return tR(t);
            case f.timestamp:
              return tP(t);
            case f.abstime:
            case f.date:
            case f.daterange:
            case f.int4range:
            case f.int8range:
            case f.money:
            case f.reltime:
            case f.text:
            case f.time:
            case f.timestamptz:
            case f.timetz:
            case f.tsrange:
            case f.tstzrange:
            default:
              return tk(t);
          }
        },
        tk = (e) => e,
        tx = (e) => {
          switch (e) {
            case "t":
              return !0;
            case "f":
              return !1;
            default:
              return e;
          }
        },
        tT = (e) => {
          if ("string" == typeof e) {
            let t = parseFloat(e);
            if (!Number.isNaN(t)) return t;
          }
          return e;
        },
        tR = (e) => {
          if ("string" == typeof e)
            try {
              return JSON.parse(e);
            } catch (e) {
              console.log(`JSON parse error: ${e}`);
            }
          return e;
        },
        tC = (e, t) => {
          if ("string" != typeof e) return e;
          let r = e.length - 1,
            n = e[r];
          if ("{" === e[0] && "}" === n) {
            let n,
              i = e.slice(1, r);
            try {
              n = JSON.parse("[" + i + "]");
            } catch (e) {
              n = i ? i.split(",") : [];
            }
            return n.map((e) => tE(t, e));
          }
          return e;
        },
        tP = (e) => ("string" == typeof e ? e.replace(" ", "T") : e),
        tO = (e) => {
          let t = e;
          return (t = (t = t.replace(/^ws/i, "http")).replace(
            /(\/socket\/websocket|\/socket|\/websocket)\/?$/i,
            "",
          )).replace(/\/+$/, "");
        };
      class tA {
        constructor(e, t, r = {}, n = 1e4) {
          (this.channel = e),
            (this.event = t),
            (this.payload = r),
            (this.timeout = n),
            (this.sent = !1),
            (this.timeoutTimer = void 0),
            (this.ref = ""),
            (this.receivedResp = null),
            (this.recHooks = []),
            (this.refEvent = null);
        }
        resend(e) {
          (this.timeout = e),
            this._cancelRefEvent(),
            (this.ref = ""),
            (this.refEvent = null),
            (this.receivedResp = null),
            (this.sent = !1),
            this.send();
        }
        send() {
          this._hasReceived("timeout") ||
            (this.startTimeout(),
            (this.sent = !0),
            this.channel.socket.push({
              topic: this.channel.topic,
              event: this.event,
              payload: this.payload,
              ref: this.ref,
              join_ref: this.channel._joinRef(),
            }));
        }
        updatePayload(e) {
          this.payload = Object.assign(Object.assign({}, this.payload), e);
        }
        receive(e, t) {
          var r;
          return (
            this._hasReceived(e) &&
              t(null == (r = this.receivedResp) ? void 0 : r.response),
            this.recHooks.push({ status: e, callback: t }),
            this
          );
        }
        startTimeout() {
          this.timeoutTimer ||
            ((this.ref = this.channel.socket._makeRef()),
            (this.refEvent = this.channel._replyEventName(this.ref)),
            this.channel._on(this.refEvent, {}, (e) => {
              this._cancelRefEvent(),
                this._cancelTimeout(),
                (this.receivedResp = e),
                this._matchReceive(e);
            }),
            (this.timeoutTimer = setTimeout(() => {
              this.trigger("timeout", {});
            }, this.timeout)));
        }
        trigger(e, t) {
          this.refEvent &&
            this.channel._trigger(this.refEvent, { status: e, response: t });
        }
        destroy() {
          this._cancelRefEvent(), this._cancelTimeout();
        }
        _cancelRefEvent() {
          this.refEvent && this.channel._off(this.refEvent, {});
        }
        _cancelTimeout() {
          clearTimeout(this.timeoutTimer), (this.timeoutTimer = void 0);
        }
        _matchReceive({ status: e, response: t }) {
          this.recHooks
            .filter((t) => t.status === e)
            .forEach((e) => e.callback(t));
        }
        _hasReceived(e) {
          return this.receivedResp && this.receivedResp.status === e;
        }
      }
      !(function (e) {
        (e.SYNC = "sync"), (e.JOIN = "join"), (e.LEAVE = "leave");
      })(p || (p = {}));
      class tI {
        constructor(e, t) {
          (this.channel = e),
            (this.state = {}),
            (this.pendingDiffs = []),
            (this.joinRef = null),
            (this.caller = {
              onJoin: () => {},
              onLeave: () => {},
              onSync: () => {},
            });
          let r = (null == t ? void 0 : t.events) || {
            state: "presence_state",
            diff: "presence_diff",
          };
          this.channel._on(r.state, {}, (e) => {
            let { onJoin: t, onLeave: r, onSync: n } = this.caller;
            (this.joinRef = this.channel._joinRef()),
              (this.state = tI.syncState(this.state, e, t, r)),
              this.pendingDiffs.forEach((e) => {
                this.state = tI.syncDiff(this.state, e, t, r);
              }),
              (this.pendingDiffs = []),
              n();
          }),
            this.channel._on(r.diff, {}, (e) => {
              let { onJoin: t, onLeave: r, onSync: n } = this.caller;
              this.inPendingSyncState()
                ? this.pendingDiffs.push(e)
                : ((this.state = tI.syncDiff(this.state, e, t, r)), n());
            }),
            this.onJoin((e, t, r) => {
              this.channel._trigger("presence", {
                event: "join",
                key: e,
                currentPresences: t,
                newPresences: r,
              });
            }),
            this.onLeave((e, t, r) => {
              this.channel._trigger("presence", {
                event: "leave",
                key: e,
                currentPresences: t,
                leftPresences: r,
              });
            }),
            this.onSync(() => {
              this.channel._trigger("presence", { event: "sync" });
            });
        }
        static syncState(e, t, r, n) {
          let i = this.cloneDeep(e),
            s = this.transformState(t),
            a = {},
            o = {};
          return (
            this.map(i, (e, t) => {
              s[e] || (o[e] = t);
            }),
            this.map(s, (e, t) => {
              let r = i[e];
              if (r) {
                let n = t.map((e) => e.presence_ref),
                  i = r.map((e) => e.presence_ref),
                  s = t.filter((e) => 0 > i.indexOf(e.presence_ref)),
                  l = r.filter((e) => 0 > n.indexOf(e.presence_ref));
                s.length > 0 && (a[e] = s), l.length > 0 && (o[e] = l);
              } else a[e] = t;
            }),
            this.syncDiff(i, { joins: a, leaves: o }, r, n)
          );
        }
        static syncDiff(e, t, r, n) {
          let { joins: i, leaves: s } = {
            joins: this.transformState(t.joins),
            leaves: this.transformState(t.leaves),
          };
          return (
            r || (r = () => {}),
            n || (n = () => {}),
            this.map(i, (t, n) => {
              var i;
              let s = null != (i = e[t]) ? i : [];
              if (((e[t] = this.cloneDeep(n)), s.length > 0)) {
                let r = e[t].map((e) => e.presence_ref),
                  n = s.filter((e) => 0 > r.indexOf(e.presence_ref));
                e[t].unshift(...n);
              }
              r(t, s, n);
            }),
            this.map(s, (t, r) => {
              let i = e[t];
              if (!i) return;
              let s = r.map((e) => e.presence_ref);
              (i = i.filter((e) => 0 > s.indexOf(e.presence_ref))),
                (e[t] = i),
                n(t, i, r),
                0 === i.length && delete e[t];
            }),
            e
          );
        }
        static map(e, t) {
          return Object.getOwnPropertyNames(e).map((r) => t(r, e[r]));
        }
        static transformState(e) {
          return Object.getOwnPropertyNames((e = this.cloneDeep(e))).reduce(
            (t, r) => {
              let n = e[r];
              return (
                "metas" in n
                  ? (t[r] = n.metas.map(
                      (e) => (
                        (e.presence_ref = e.phx_ref),
                        delete e.phx_ref,
                        delete e.phx_ref_prev,
                        e
                      ),
                    ))
                  : (t[r] = n),
                t
              );
            },
            {},
          );
        }
        static cloneDeep(e) {
          return JSON.parse(JSON.stringify(e));
        }
        onJoin(e) {
          this.caller.onJoin = e;
        }
        onLeave(e) {
          this.caller.onLeave = e;
        }
        onSync(e) {
          this.caller.onSync = e;
        }
        inPendingSyncState() {
          return !this.joinRef || this.joinRef !== this.channel._joinRef();
        }
      }
      !(function (e) {
        (e.ALL = "*"),
          (e.INSERT = "INSERT"),
          (e.UPDATE = "UPDATE"),
          (e.DELETE = "DELETE");
      })(_ || (_ = {})),
        (function (e) {
          (e.BROADCAST = "broadcast"),
            (e.PRESENCE = "presence"),
            (e.POSTGRES_CHANGES = "postgres_changes"),
            (e.SYSTEM = "system");
        })(g || (g = {})),
        (function (e) {
          (e.SUBSCRIBED = "SUBSCRIBED"),
            (e.TIMED_OUT = "TIMED_OUT"),
            (e.CLOSED = "CLOSED"),
            (e.CHANNEL_ERROR = "CHANNEL_ERROR");
        })(m || (m = {}));
      class tj {
        constructor(e, t = { config: {} }, r) {
          (this.topic = e),
            (this.params = t),
            (this.socket = r),
            (this.bindings = {}),
            (this.state = u.closed),
            (this.joinedOnce = !1),
            (this.pushBuffer = []),
            (this.subTopic = e.replace(/^realtime:/i, "")),
            (this.params.config = Object.assign(
              {
                broadcast: { ack: !1, self: !1 },
                presence: { key: "" },
                private: !1,
              },
              t.config,
            )),
            (this.timeout = this.socket.timeout),
            (this.joinPush = new tA(this, c.join, this.params, this.timeout)),
            (this.rejoinTimer = new tv(
              () => this._rejoinUntilConnected(),
              this.socket.reconnectAfterMs,
            )),
            this.joinPush.receive("ok", () => {
              (this.state = u.joined),
                this.rejoinTimer.reset(),
                this.pushBuffer.forEach((e) => e.send()),
                (this.pushBuffer = []);
            }),
            this._onClose(() => {
              this.rejoinTimer.reset(),
                this.socket.log(
                  "channel",
                  `close ${this.topic} ${this._joinRef()}`,
                ),
                (this.state = u.closed),
                this.socket._remove(this);
            }),
            this._onError((e) => {
              this._isLeaving() ||
                this._isClosed() ||
                (this.socket.log("channel", `error ${this.topic}`, e),
                (this.state = u.errored),
                this.rejoinTimer.scheduleTimeout());
            }),
            this.joinPush.receive("timeout", () => {
              this._isJoining() &&
                (this.socket.log(
                  "channel",
                  `timeout ${this.topic}`,
                  this.joinPush.timeout,
                ),
                (this.state = u.errored),
                this.rejoinTimer.scheduleTimeout());
            }),
            this._on(c.reply, {}, (e, t) => {
              this._trigger(this._replyEventName(t), e);
            }),
            (this.presence = new tI(this)),
            (this.broadcastEndpointURL =
              tO(this.socket.endPoint) + "/api/broadcast"),
            (this.private = this.params.config.private || !1);
        }
        subscribe(e, t = this.timeout) {
          var r, n;
          if (
            (this.socket.isConnected() || this.socket.connect(),
            this.joinedOnce)
          )
            throw "tried to subscribe multiple times. 'subscribe' can only be called a single time per channel instance";
          {
            let {
              config: { broadcast: i, presence: s, private: a },
            } = this.params;
            this._onError((t) => (null == e ? void 0 : e(m.CHANNEL_ERROR, t))),
              this._onClose(() => (null == e ? void 0 : e(m.CLOSED)));
            let o = {},
              l = {
                broadcast: i,
                presence: s,
                postgres_changes:
                  null !=
                  (n =
                    null == (r = this.bindings.postgres_changes)
                      ? void 0
                      : r.map((e) => e.filter))
                    ? n
                    : [],
                private: a,
              };
            this.socket.accessTokenValue &&
              (o.access_token = this.socket.accessTokenValue),
              this.updateJoinPayload(Object.assign({ config: l }, o)),
              (this.joinedOnce = !0),
              this._rejoin(t),
              this.joinPush
                .receive("ok", async ({ postgres_changes: t }) => {
                  var r;
                  if ((this.socket.setAuth(), void 0 === t)) {
                    null == e || e(m.SUBSCRIBED);
                    return;
                  }
                  {
                    let n = this.bindings.postgres_changes,
                      i = null != (r = null == n ? void 0 : n.length) ? r : 0,
                      s = [];
                    for (let r = 0; r < i; r++) {
                      let i = n[r],
                        {
                          filter: { event: a, schema: o, table: l, filter: c },
                        } = i,
                        d = t && t[r];
                      if (
                        d &&
                        d.event === a &&
                        d.schema === o &&
                        d.table === l &&
                        d.filter === c
                      )
                        s.push(
                          Object.assign(Object.assign({}, i), { id: d.id }),
                        );
                      else {
                        this.unsubscribe(),
                          (this.state = u.errored),
                          null == e ||
                            e(
                              m.CHANNEL_ERROR,
                              Error(
                                "mismatch between server and client bindings for postgres changes",
                              ),
                            );
                        return;
                      }
                    }
                    (this.bindings.postgres_changes = s), e && e(m.SUBSCRIBED);
                    return;
                  }
                })
                .receive("error", (t) => {
                  (this.state = u.errored),
                    null == e ||
                      e(
                        m.CHANNEL_ERROR,
                        Error(
                          JSON.stringify(
                            Object.values(t).join(", ") || "error",
                          ),
                        ),
                      );
                })
                .receive("timeout", () => {
                  null == e || e(m.TIMED_OUT);
                });
          }
          return this;
        }
        presenceState() {
          return this.presence.state;
        }
        async track(e, t = {}) {
          return await this.send(
            { type: "presence", event: "track", payload: e },
            t.timeout || this.timeout,
          );
        }
        async untrack(e = {}) {
          return await this.send({ type: "presence", event: "untrack" }, e);
        }
        on(e, t, r) {
          return this._on(e, t, r);
        }
        async send(e, t = {}) {
          var r, n;
          if (this._canPush() || "broadcast" !== e.type)
            return new Promise((r) => {
              var n, i, s;
              let a = this._push(e.type, e, t.timeout || this.timeout);
              "broadcast" !== e.type ||
                (null ==
                (s =
                  null == (i = null == (n = this.params) ? void 0 : n.config)
                    ? void 0
                    : i.broadcast)
                  ? void 0
                  : s.ack) ||
                r("ok"),
                a.receive("ok", () => r("ok")),
                a.receive("error", () => r("error")),
                a.receive("timeout", () => r("timed out"));
            });
          {
            let { event: i, payload: s } = e,
              a = {
                method: "POST",
                headers: {
                  Authorization: this.socket.accessTokenValue
                    ? `Bearer ${this.socket.accessTokenValue}`
                    : "",
                  apikey: this.socket.apiKey ? this.socket.apiKey : "",
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  messages: [
                    {
                      topic: this.subTopic,
                      event: i,
                      payload: s,
                      private: this.private,
                    },
                  ],
                }),
              };
            try {
              let e = await this._fetchWithTimeout(
                this.broadcastEndpointURL,
                a,
                null != (r = t.timeout) ? r : this.timeout,
              );
              return (
                await (null == (n = e.body) ? void 0 : n.cancel()),
                e.ok ? "ok" : "error"
              );
            } catch (e) {
              if ("AbortError" === e.name) return "timed out";
              return "error";
            }
          }
        }
        updateJoinPayload(e) {
          this.joinPush.updatePayload(e);
        }
        unsubscribe(e = this.timeout) {
          this.state = u.leaving;
          let t = () => {
            this.socket.log("channel", `leave ${this.topic}`),
              this._trigger(c.close, "leave", this._joinRef());
          };
          return (
            this.joinPush.destroy(),
            new Promise((r) => {
              let n = new tA(this, c.leave, {}, e);
              n
                .receive("ok", () => {
                  t(), r("ok");
                })
                .receive("timeout", () => {
                  t(), r("timed out");
                })
                .receive("error", () => {
                  r("error");
                }),
                n.send(),
                this._canPush() || n.trigger("ok", {});
            })
          );
        }
        teardown() {
          this.pushBuffer.forEach((e) => e.destroy()),
            this.rejoinTimer && clearTimeout(this.rejoinTimer.timer),
            this.joinPush.destroy();
        }
        async _fetchWithTimeout(e, t, r) {
          let n = new AbortController(),
            i = setTimeout(() => n.abort(), r),
            s = await this.socket.fetch(
              e,
              Object.assign(Object.assign({}, t), { signal: n.signal }),
            );
          return clearTimeout(i), s;
        }
        _push(e, t, r = this.timeout) {
          if (!this.joinedOnce)
            throw `tried to push '${e}' to '${this.topic}' before joining. Use channel.subscribe() before pushing events`;
          let n = new tA(this, e, t, r);
          return (
            this._canPush()
              ? n.send()
              : (n.startTimeout(), this.pushBuffer.push(n)),
            n
          );
        }
        _onMessage(e, t, r) {
          return t;
        }
        _isMember(e) {
          return this.topic === e;
        }
        _joinRef() {
          return this.joinPush.ref;
        }
        _trigger(e, t, r) {
          var n, i;
          let s = e.toLocaleLowerCase(),
            { close: a, error: o, leave: l, join: u } = c;
          if (r && [a, o, l, u].indexOf(s) >= 0 && r !== this._joinRef())
            return;
          let d = this._onMessage(s, t, r);
          if (t && !d)
            throw "channel onMessage callbacks must return the payload, modified or unmodified";
          ["insert", "update", "delete"].includes(s)
            ? null == (n = this.bindings.postgres_changes) ||
              n
                .filter((e) => {
                  var t, r, n;
                  return (
                    (null == (t = e.filter) ? void 0 : t.event) === "*" ||
                    (null == (n = null == (r = e.filter) ? void 0 : r.event)
                      ? void 0
                      : n.toLocaleLowerCase()) === s
                  );
                })
                .map((e) => e.callback(d, r))
            : null == (i = this.bindings[s]) ||
              i
                .filter((e) => {
                  var r, n, i, a, o, l;
                  if (
                    !["broadcast", "presence", "postgres_changes"].includes(s)
                  )
                    return e.type.toLocaleLowerCase() === s;
                  if ("id" in e) {
                    let s = e.id,
                      a = null == (r = e.filter) ? void 0 : r.event;
                    return (
                      s &&
                      (null == (n = t.ids) ? void 0 : n.includes(s)) &&
                      ("*" === a ||
                        (null == a ? void 0 : a.toLocaleLowerCase()) ===
                          (null == (i = t.data)
                            ? void 0
                            : i.type.toLocaleLowerCase()))
                    );
                  }
                  {
                    let r =
                      null ==
                      (o =
                        null == (a = null == e ? void 0 : e.filter)
                          ? void 0
                          : a.event)
                        ? void 0
                        : o.toLocaleLowerCase();
                    return (
                      "*" === r ||
                      r ===
                        (null == (l = null == t ? void 0 : t.event)
                          ? void 0
                          : l.toLocaleLowerCase())
                    );
                  }
                })
                .map((e) => {
                  if ("object" == typeof d && "ids" in d) {
                    let e = d.data,
                      {
                        schema: t,
                        table: r,
                        commit_timestamp: n,
                        type: i,
                        errors: s,
                      } = e;
                    d = Object.assign(
                      Object.assign(
                        {},
                        {
                          schema: t,
                          table: r,
                          commit_timestamp: n,
                          eventType: i,
                          new: {},
                          old: {},
                          errors: s,
                        },
                      ),
                      this._getPayloadRecords(e),
                    );
                  }
                  e.callback(d, r);
                });
        }
        _isClosed() {
          return this.state === u.closed;
        }
        _isJoined() {
          return this.state === u.joined;
        }
        _isJoining() {
          return this.state === u.joining;
        }
        _isLeaving() {
          return this.state === u.leaving;
        }
        _replyEventName(e) {
          return `chan_reply_${e}`;
        }
        _on(e, t, r) {
          let n = e.toLocaleLowerCase(),
            i = { type: n, filter: t, callback: r };
          return (
            this.bindings[n]
              ? this.bindings[n].push(i)
              : (this.bindings[n] = [i]),
            this
          );
        }
        _off(e, t) {
          let r = e.toLocaleLowerCase();
          return (
            (this.bindings[r] = this.bindings[r].filter((e) => {
              var n;
              return !(
                (null == (n = e.type) ? void 0 : n.toLocaleLowerCase()) === r &&
                tj.isEqual(e.filter, t)
              );
            })),
            this
          );
        }
        static isEqual(e, t) {
          if (Object.keys(e).length !== Object.keys(t).length) return !1;
          for (let r in e) if (e[r] !== t[r]) return !1;
          return !0;
        }
        _rejoinUntilConnected() {
          this.rejoinTimer.scheduleTimeout(),
            this.socket.isConnected() && this._rejoin();
        }
        _onClose(e) {
          this._on(c.close, {}, e);
        }
        _onError(e) {
          this._on(c.error, {}, (t) => e(t));
        }
        _canPush() {
          return this.socket.isConnected() && this._isJoined();
        }
        _rejoin(e = this.timeout) {
          this._isLeaving() ||
            (this.socket._leaveOpenTopic(this.topic),
            (this.state = u.joining),
            this.joinPush.resend(e));
        }
        _getPayloadRecords(e) {
          let t = { new: {}, old: {} };
          return (
            ("INSERT" === e.type || "UPDATE" === e.type) &&
              (t.new = tb(e.columns, e.record)),
            ("UPDATE" === e.type || "DELETE" === e.type) &&
              (t.old = tb(e.columns, e.old_record)),
            t
          );
        }
      }
      let tL = () => {},
        tN = `
  addEventListener("message", (e) => {
    if (e.data.event === "start") {
      setInterval(() => postMessage({ event: "keepAlive" }), e.data.interval);
    }
  });`;
      class tM {
        constructor(e, t) {
          var n;
          (this.accessTokenValue = null),
            (this.apiKey = null),
            (this.channels = []),
            (this.endPoint = ""),
            (this.httpEndpoint = ""),
            (this.headers = ty),
            (this.params = {}),
            (this.timeout = 1e4),
            (this.heartbeatIntervalMs = 25e3),
            (this.heartbeatTimer = void 0),
            (this.pendingHeartbeatRef = null),
            (this.heartbeatCallback = tL),
            (this.ref = 0),
            (this.logger = tL),
            (this.conn = null),
            (this.sendBuffer = []),
            (this.serializer = new tw()),
            (this.stateChangeCallbacks = {
              open: [],
              close: [],
              error: [],
              message: [],
            }),
            (this.accessToken = null),
            (this._resolveFetch = (e) => {
              let t;
              return (
                (t =
                  e ||
                  ("undefined" == typeof fetch
                    ? (...e) =>
                        Promise.resolve()
                          .then(r.bind(r, 96148))
                          .then(({ default: t }) => t(...e))
                    : fetch)),
                (...e) => t(...e)
              );
            }),
            (this.endPoint = `${e}/${d.websocket}`),
            (this.httpEndpoint = tO(e)),
            (null == t ? void 0 : t.transport)
              ? (this.transport = t.transport)
              : (this.transport = null),
            (null == t ? void 0 : t.params) && (this.params = t.params),
            (null == t ? void 0 : t.headers) &&
              (this.headers = Object.assign(
                Object.assign({}, this.headers),
                t.headers,
              )),
            (null == t ? void 0 : t.timeout) && (this.timeout = t.timeout),
            (null == t ? void 0 : t.logger) && (this.logger = t.logger),
            ((null == t ? void 0 : t.logLevel) ||
              (null == t ? void 0 : t.log_level)) &&
              ((this.logLevel = t.logLevel || t.log_level),
              (this.params = Object.assign(Object.assign({}, this.params), {
                log_level: this.logLevel,
              }))),
            (null == t ? void 0 : t.heartbeatIntervalMs) &&
              (this.heartbeatIntervalMs = t.heartbeatIntervalMs);
          let i =
            null == (n = null == t ? void 0 : t.params) ? void 0 : n.apikey;
          if (
            (i && ((this.accessTokenValue = i), (this.apiKey = i)),
            (this.reconnectAfterMs = (null == t ? void 0 : t.reconnectAfterMs)
              ? t.reconnectAfterMs
              : (e) => [1e3, 2e3, 5e3, 1e4][e - 1] || 1e4),
            (this.encode = (null == t ? void 0 : t.encode)
              ? t.encode
              : (e, t) => t(JSON.stringify(e))),
            (this.decode = (null == t ? void 0 : t.decode)
              ? t.decode
              : this.serializer.decode.bind(this.serializer)),
            (this.reconnectTimer = new tv(async () => {
              this.disconnect(), this.connect();
            }, this.reconnectAfterMs)),
            (this.fetch = this._resolveFetch(null == t ? void 0 : t.fetch)),
            null == t ? void 0 : t.worker)
          ) {
            if ("undefined" != typeof window && !window.Worker)
              throw Error("Web Worker is not supported");
            (this.worker = (null == t ? void 0 : t.worker) || !1),
              (this.workerUrl = null == t ? void 0 : t.workerUrl);
          }
          this.accessToken = (null == t ? void 0 : t.accessToken) || null;
        }
        connect() {
          if (!this.conn) {
            if ((this.transport || (this.transport = tm), this.transport)) {
              "undefined" != typeof window &&
              this.transport === window.WebSocket
                ? (this.conn = new this.transport(this.endpointURL()))
                : (this.conn = new this.transport(this.endpointURL(), void 0, {
                    headers: this.headers,
                  })),
                this.setupConnection();
              return;
            }
            this.conn = new tD(this.endpointURL(), void 0, {
              close: () => {
                this.conn = null;
              },
            });
          }
        }
        endpointURL() {
          return this._appendParams(
            this.endPoint,
            Object.assign({}, this.params, { vsn: "1.0.0" }),
          );
        }
        disconnect(e, t) {
          this.conn &&
            ((this.conn.onclose = function () {}),
            e ? this.conn.close(e, null != t ? t : "") : this.conn.close(),
            (this.conn = null),
            this.heartbeatTimer && clearInterval(this.heartbeatTimer),
            this.reconnectTimer.reset(),
            this.channels.forEach((e) => e.teardown()));
        }
        getChannels() {
          return this.channels;
        }
        async removeChannel(e) {
          let t = await e.unsubscribe();
          return (
            (this.channels = this.channels.filter(
              (t) => t._joinRef !== e._joinRef,
            )),
            0 === this.channels.length && this.disconnect(),
            t
          );
        }
        async removeAllChannels() {
          let e = await Promise.all(this.channels.map((e) => e.unsubscribe()));
          return (this.channels = []), this.disconnect(), e;
        }
        log(e, t, r) {
          this.logger(e, t, r);
        }
        connectionState() {
          switch (this.conn && this.conn.readyState) {
            case l.connecting:
              return h.Connecting;
            case l.open:
              return h.Open;
            case l.closing:
              return h.Closing;
            default:
              return h.Closed;
          }
        }
        isConnected() {
          return this.connectionState() === h.Open;
        }
        channel(e, t = { config: {} }) {
          let r = `realtime:${e}`,
            n = this.getChannels().find((e) => e.topic === r);
          if (n) return n;
          {
            let r = new tj(`realtime:${e}`, t, this);
            return this.channels.push(r), r;
          }
        }
        push(e) {
          let { topic: t, event: r, payload: n, ref: i } = e,
            s = () => {
              this.encode(e, (e) => {
                var t;
                null == (t = this.conn) || t.send(e);
              });
            };
          this.log("push", `${t} ${r} (${i})`, n),
            this.isConnected() ? s() : this.sendBuffer.push(s);
        }
        async setAuth(e = null) {
          let t =
            e ||
            (this.accessToken && (await this.accessToken())) ||
            this.accessTokenValue;
          this.accessTokenValue != t &&
            ((this.accessTokenValue = t),
            this.channels.forEach((e) => {
              t &&
                e.updateJoinPayload({
                  access_token: t,
                  version: this.headers && this.headers["X-Client-Info"],
                }),
                e.joinedOnce &&
                  e._isJoined() &&
                  e._push(c.access_token, { access_token: t });
            }));
        }
        async sendHeartbeat() {
          var e;
          if (!this.isConnected())
            return void this.heartbeatCallback("disconnected");
          if (this.pendingHeartbeatRef) {
            (this.pendingHeartbeatRef = null),
              this.log(
                "transport",
                "heartbeat timeout. Attempting to re-establish connection",
              ),
              this.heartbeatCallback("timeout"),
              null == (e = this.conn) || e.close(1e3, "hearbeat timeout");
            return;
          }
          (this.pendingHeartbeatRef = this._makeRef()),
            this.push({
              topic: "phoenix",
              event: "heartbeat",
              payload: {},
              ref: this.pendingHeartbeatRef,
            }),
            this.heartbeatCallback("sent"),
            await this.setAuth();
        }
        onHeartbeat(e) {
          this.heartbeatCallback = e;
        }
        flushSendBuffer() {
          this.isConnected() &&
            this.sendBuffer.length > 0 &&
            (this.sendBuffer.forEach((e) => e()), (this.sendBuffer = []));
        }
        _makeRef() {
          let e = this.ref + 1;
          return (
            e === this.ref ? (this.ref = 0) : (this.ref = e),
            this.ref.toString()
          );
        }
        _leaveOpenTopic(e) {
          let t = this.channels.find(
            (t) => t.topic === e && (t._isJoined() || t._isJoining()),
          );
          t &&
            (this.log("transport", `leaving duplicate topic "${e}"`),
            t.unsubscribe());
        }
        _remove(e) {
          this.channels = this.channels.filter((t) => t.topic !== e.topic);
        }
        setupConnection() {
          this.conn &&
            ((this.conn.binaryType = "arraybuffer"),
            (this.conn.onopen = () => this._onConnOpen()),
            (this.conn.onerror = (e) => this._onConnError(e)),
            (this.conn.onmessage = (e) => this._onConnMessage(e)),
            (this.conn.onclose = (e) => this._onConnClose(e)));
        }
        _onConnMessage(e) {
          this.decode(e.data, (e) => {
            let { topic: t, event: r, payload: n, ref: i } = e;
            "phoenix" === t &&
              "phx_reply" === r &&
              this.heartbeatCallback("ok" == e.payload.status ? "ok" : "error"),
              i &&
                i === this.pendingHeartbeatRef &&
                (this.pendingHeartbeatRef = null),
              this.log(
                "receive",
                `${n.status || ""} ${t} ${r} ${(i && "(" + i + ")") || ""}`,
                n,
              ),
              Array.from(this.channels)
                .filter((e) => e._isMember(t))
                .forEach((e) => e._trigger(r, n, i)),
              this.stateChangeCallbacks.message.forEach((t) => t(e));
          });
        }
        _onConnOpen() {
          if (
            (this.log("transport", `connected to ${this.endpointURL()}`),
            this.flushSendBuffer(),
            this.reconnectTimer.reset(),
            this.worker)
          ) {
            this.workerUrl
              ? this.log("worker", `starting worker for from ${this.workerUrl}`)
              : this.log("worker", "starting default worker");
            let e = this._workerObjectUrl(this.workerUrl);
            (this.workerRef = new Worker(e)),
              (this.workerRef.onerror = (e) => {
                this.log("worker", "worker error", e.message),
                  this.workerRef.terminate();
              }),
              (this.workerRef.onmessage = (e) => {
                "keepAlive" === e.data.event && this.sendHeartbeat();
              }),
              this.workerRef.postMessage({
                event: "start",
                interval: this.heartbeatIntervalMs,
              });
          } else
            this.heartbeatTimer && clearInterval(this.heartbeatTimer),
              (this.heartbeatTimer = setInterval(
                () => this.sendHeartbeat(),
                this.heartbeatIntervalMs,
              ));
          this.stateChangeCallbacks.open.forEach((e) => e());
        }
        _onConnClose(e) {
          this.log("transport", "close", e),
            this._triggerChanError(),
            this.heartbeatTimer && clearInterval(this.heartbeatTimer),
            this.reconnectTimer.scheduleTimeout(),
            this.stateChangeCallbacks.close.forEach((t) => t(e));
        }
        _onConnError(e) {
          this.log("transport", e.message),
            this._triggerChanError(),
            this.stateChangeCallbacks.error.forEach((t) => t(e));
        }
        _triggerChanError() {
          this.channels.forEach((e) => e._trigger(c.error));
        }
        _appendParams(e, t) {
          if (0 === Object.keys(t).length) return e;
          let r = e.match(/\?/) ? "&" : "?",
            n = new URLSearchParams(t);
          return `${e}${r}${n}`;
        }
        _workerObjectUrl(e) {
          let t;
          if (e) t = e;
          else {
            let e = new Blob([tN], { type: "application/javascript" });
            t = URL.createObjectURL(e);
          }
          return t;
        }
      }
      class tD {
        constructor(e, t, r) {
          (this.binaryType = "arraybuffer"),
            (this.onclose = () => {}),
            (this.onerror = () => {}),
            (this.onmessage = () => {}),
            (this.onopen = () => {}),
            (this.readyState = l.connecting),
            (this.send = () => {}),
            (this.url = null),
            (this.url = e),
            (this.close = r.close);
        }
      }
      class t$ extends Error {
        constructor(e) {
          super(e), (this.__isStorageError = !0), (this.name = "StorageError");
        }
      }
      function tq(e) {
        return "object" == typeof e && null !== e && "__isStorageError" in e;
      }
      class tU extends t$ {
        constructor(e, t) {
          super(e), (this.name = "StorageApiError"), (this.status = t);
        }
        toJSON() {
          return {
            name: this.name,
            message: this.message,
            status: this.status,
          };
        }
      }
      class tB extends t$ {
        constructor(e, t) {
          super(e),
            (this.name = "StorageUnknownError"),
            (this.originalError = t);
        }
      }
      let tG = (e) => {
          let t;
          return (
            (t =
              e ||
              ("undefined" == typeof fetch
                ? (...e) =>
                    Promise.resolve()
                      .then(r.bind(r, 96148))
                      .then(({ default: t }) => t(...e))
                : fetch)),
            (...e) => t(...e)
          );
        },
        tz = () =>
          (function (e, t, r, n) {
            return new (r || (r = Promise))(function (i, s) {
              function a(e) {
                try {
                  l(n.next(e));
                } catch (e) {
                  s(e);
                }
              }
              function o(e) {
                try {
                  l(n.throw(e));
                } catch (e) {
                  s(e);
                }
              }
              function l(e) {
                var t;
                e.done
                  ? i(e.value)
                  : ((t = e.value) instanceof r
                      ? t
                      : new r(function (e) {
                          e(t);
                        })
                    ).then(a, o);
              }
              l((n = n.apply(e, t || [])).next());
            });
          })(void 0, void 0, void 0, function* () {
            return "undefined" == typeof Response
              ? (yield Promise.resolve().then(r.bind(r, 96148))).Response
              : Response;
          }),
        tH = (e) => {
          if (Array.isArray(e)) return e.map((e) => tH(e));
          if ("function" == typeof e || e !== Object(e)) return e;
          let t = {};
          return (
            Object.entries(e).forEach(([e, r]) => {
              t[
                e.replace(/([-_][a-z])/gi, (e) =>
                  e.toUpperCase().replace(/[-_]/g, ""),
                )
              ] = tH(r);
            }),
            t
          );
        };
      var tF = function (e, t, r, n) {
        return new (r || (r = Promise))(function (i, s) {
          function a(e) {
            try {
              l(n.next(e));
            } catch (e) {
              s(e);
            }
          }
          function o(e) {
            try {
              l(n.throw(e));
            } catch (e) {
              s(e);
            }
          }
          function l(e) {
            var t;
            e.done
              ? i(e.value)
              : ((t = e.value) instanceof r
                  ? t
                  : new r(function (e) {
                      e(t);
                    })
                ).then(a, o);
          }
          l((n = n.apply(e, t || [])).next());
        });
      };
      let tW = (e) =>
          e.msg ||
          e.message ||
          e.error_description ||
          e.error ||
          JSON.stringify(e),
        tK = (e, t, r) =>
          tF(void 0, void 0, void 0, function* () {
            e instanceof (yield tz()) && !(null == r ? void 0 : r.noResolveJson)
              ? e
                  .json()
                  .then((r) => {
                    t(new tU(tW(r), e.status || 500));
                  })
                  .catch((e) => {
                    t(new tB(tW(e), e));
                  })
              : t(new tB(tW(e), e));
          }),
        tV = (e, t, r, n) => {
          let i = {
            method: e,
            headers: (null == t ? void 0 : t.headers) || {},
          };
          return "GET" === e
            ? i
            : ((i.headers = Object.assign(
                { "Content-Type": "application/json" },
                null == t ? void 0 : t.headers,
              )),
              n && (i.body = JSON.stringify(n)),
              Object.assign(Object.assign({}, i), r));
        };
      function tJ(e, t, r, n, i, s) {
        return tF(this, void 0, void 0, function* () {
          return new Promise((a, o) => {
            e(r, tV(t, n, i, s))
              .then((e) => {
                if (!e.ok) throw e;
                return (null == n ? void 0 : n.noResolveJson) ? e : e.json();
              })
              .then((e) => a(e))
              .catch((e) => tK(e, o, n));
          });
        });
      }
      function tX(e, t, r, n) {
        return tF(this, void 0, void 0, function* () {
          return tJ(e, "GET", t, r, n);
        });
      }
      function tY(e, t, r, n, i) {
        return tF(this, void 0, void 0, function* () {
          return tJ(e, "POST", t, n, i, r);
        });
      }
      function tZ(e, t, r, n, i) {
        return tF(this, void 0, void 0, function* () {
          return tJ(e, "DELETE", t, n, i, r);
        });
      }
      var tQ = r(25356).Buffer,
        t0 = function (e, t, r, n) {
          return new (r || (r = Promise))(function (i, s) {
            function a(e) {
              try {
                l(n.next(e));
              } catch (e) {
                s(e);
              }
            }
            function o(e) {
              try {
                l(n.throw(e));
              } catch (e) {
                s(e);
              }
            }
            function l(e) {
              var t;
              e.done
                ? i(e.value)
                : ((t = e.value) instanceof r
                    ? t
                    : new r(function (e) {
                        e(t);
                      })
                  ).then(a, o);
            }
            l((n = n.apply(e, t || [])).next());
          });
        };
      let t1 = {
          limit: 100,
          offset: 0,
          sortBy: { column: "name", order: "asc" },
        },
        t2 = {
          cacheControl: "3600",
          contentType: "text/plain;charset=UTF-8",
          upsert: !1,
        };
      class t3 {
        constructor(e, t = {}, r, n) {
          (this.url = e),
            (this.headers = t),
            (this.bucketId = r),
            (this.fetch = tG(n));
        }
        uploadOrUpdate(e, t, r, n) {
          return t0(this, void 0, void 0, function* () {
            try {
              let i,
                s = Object.assign(Object.assign({}, t2), n),
                a = Object.assign(
                  Object.assign({}, this.headers),
                  "POST" === e && { "x-upsert": String(s.upsert) },
                ),
                o = s.metadata;
              "undefined" != typeof Blob && r instanceof Blob
                ? ((i = new FormData()).append("cacheControl", s.cacheControl),
                  o && i.append("metadata", this.encodeMetadata(o)),
                  i.append("", r))
                : "undefined" != typeof FormData && r instanceof FormData
                  ? ((i = r).append("cacheControl", s.cacheControl),
                    o && i.append("metadata", this.encodeMetadata(o)))
                  : ((i = r),
                    (a["cache-control"] = `max-age=${s.cacheControl}`),
                    (a["content-type"] = s.contentType),
                    o &&
                      (a["x-metadata"] = this.toBase64(
                        this.encodeMetadata(o),
                      ))),
                (null == n ? void 0 : n.headers) &&
                  (a = Object.assign(Object.assign({}, a), n.headers));
              let l = this._removeEmptyFolders(t),
                u = this._getFinalPath(l),
                c = yield this.fetch(
                  `${this.url}/object/${u}`,
                  Object.assign(
                    { method: e, body: i, headers: a },
                    (null == s ? void 0 : s.duplex) ? { duplex: s.duplex } : {},
                  ),
                ),
                d = yield c.json();
              if (c.ok)
                return {
                  data: { path: l, id: d.Id, fullPath: d.Key },
                  error: null,
                };
              return { data: null, error: d };
            } catch (e) {
              if (tq(e)) return { data: null, error: e };
              throw e;
            }
          });
        }
        upload(e, t, r) {
          return t0(this, void 0, void 0, function* () {
            return this.uploadOrUpdate("POST", e, t, r);
          });
        }
        uploadToSignedUrl(e, t, r, n) {
          return t0(this, void 0, void 0, function* () {
            let i = this._removeEmptyFolders(e),
              s = this._getFinalPath(i),
              a = new URL(this.url + `/object/upload/sign/${s}`);
            a.searchParams.set("token", t);
            try {
              let e,
                t = Object.assign({ upsert: t2.upsert }, n),
                s = Object.assign(Object.assign({}, this.headers), {
                  "x-upsert": String(t.upsert),
                });
              "undefined" != typeof Blob && r instanceof Blob
                ? ((e = new FormData()).append("cacheControl", t.cacheControl),
                  e.append("", r))
                : "undefined" != typeof FormData && r instanceof FormData
                  ? (e = r).append("cacheControl", t.cacheControl)
                  : ((e = r),
                    (s["cache-control"] = `max-age=${t.cacheControl}`),
                    (s["content-type"] = t.contentType));
              let o = yield this.fetch(a.toString(), {
                  method: "PUT",
                  body: e,
                  headers: s,
                }),
                l = yield o.json();
              if (o.ok)
                return { data: { path: i, fullPath: l.Key }, error: null };
              return { data: null, error: l };
            } catch (e) {
              if (tq(e)) return { data: null, error: e };
              throw e;
            }
          });
        }
        createSignedUploadUrl(e, t) {
          return t0(this, void 0, void 0, function* () {
            try {
              let r = this._getFinalPath(e),
                n = Object.assign({}, this.headers);
              (null == t ? void 0 : t.upsert) && (n["x-upsert"] = "true");
              let i = yield tY(
                  this.fetch,
                  `${this.url}/object/upload/sign/${r}`,
                  {},
                  { headers: n },
                ),
                s = new URL(this.url + i.url),
                a = s.searchParams.get("token");
              if (!a) throw new t$("No token returned by API");
              return {
                data: { signedUrl: s.toString(), path: e, token: a },
                error: null,
              };
            } catch (e) {
              if (tq(e)) return { data: null, error: e };
              throw e;
            }
          });
        }
        update(e, t, r) {
          return t0(this, void 0, void 0, function* () {
            return this.uploadOrUpdate("PUT", e, t, r);
          });
        }
        move(e, t, r) {
          return t0(this, void 0, void 0, function* () {
            try {
              return {
                data: yield tY(
                  this.fetch,
                  `${this.url}/object/move`,
                  {
                    bucketId: this.bucketId,
                    sourceKey: e,
                    destinationKey: t,
                    destinationBucket: null == r ? void 0 : r.destinationBucket,
                  },
                  { headers: this.headers },
                ),
                error: null,
              };
            } catch (e) {
              if (tq(e)) return { data: null, error: e };
              throw e;
            }
          });
        }
        copy(e, t, r) {
          return t0(this, void 0, void 0, function* () {
            try {
              return {
                data: {
                  path: (yield tY(
                    this.fetch,
                    `${this.url}/object/copy`,
                    {
                      bucketId: this.bucketId,
                      sourceKey: e,
                      destinationKey: t,
                      destinationBucket:
                        null == r ? void 0 : r.destinationBucket,
                    },
                    { headers: this.headers },
                  )).Key,
                },
                error: null,
              };
            } catch (e) {
              if (tq(e)) return { data: null, error: e };
              throw e;
            }
          });
        }
        createSignedUrl(e, t, r) {
          return t0(this, void 0, void 0, function* () {
            try {
              let n = this._getFinalPath(e),
                i = yield tY(
                  this.fetch,
                  `${this.url}/object/sign/${n}`,
                  Object.assign(
                    { expiresIn: t },
                    (null == r ? void 0 : r.transform)
                      ? { transform: r.transform }
                      : {},
                  ),
                  { headers: this.headers },
                ),
                s = (null == r ? void 0 : r.download)
                  ? `&download=${!0 === r.download ? "" : r.download}`
                  : "";
              return {
                data: (i = {
                  signedUrl: encodeURI(`${this.url}${i.signedURL}${s}`),
                }),
                error: null,
              };
            } catch (e) {
              if (tq(e)) return { data: null, error: e };
              throw e;
            }
          });
        }
        createSignedUrls(e, t, r) {
          return t0(this, void 0, void 0, function* () {
            try {
              let n = yield tY(
                  this.fetch,
                  `${this.url}/object/sign/${this.bucketId}`,
                  { expiresIn: t, paths: e },
                  { headers: this.headers },
                ),
                i = (null == r ? void 0 : r.download)
                  ? `&download=${!0 === r.download ? "" : r.download}`
                  : "";
              return {
                data: n.map((e) =>
                  Object.assign(Object.assign({}, e), {
                    signedUrl: e.signedURL
                      ? encodeURI(`${this.url}${e.signedURL}${i}`)
                      : null,
                  }),
                ),
                error: null,
              };
            } catch (e) {
              if (tq(e)) return { data: null, error: e };
              throw e;
            }
          });
        }
        download(e, t) {
          return t0(this, void 0, void 0, function* () {
            let r = void 0 !== (null == t ? void 0 : t.transform),
              n = this.transformOptsToQueryString(
                (null == t ? void 0 : t.transform) || {},
              ),
              i = n ? `?${n}` : "";
            try {
              let t = this._getFinalPath(e),
                n = yield tX(
                  this.fetch,
                  `${this.url}/${r ? "render/image/authenticated" : "object"}/${t}${i}`,
                  { headers: this.headers, noResolveJson: !0 },
                );
              return { data: yield n.blob(), error: null };
            } catch (e) {
              if (tq(e)) return { data: null, error: e };
              throw e;
            }
          });
        }
        info(e) {
          return t0(this, void 0, void 0, function* () {
            let t = this._getFinalPath(e);
            try {
              let e = yield tX(this.fetch, `${this.url}/object/info/${t}`, {
                headers: this.headers,
              });
              return { data: tH(e), error: null };
            } catch (e) {
              if (tq(e)) return { data: null, error: e };
              throw e;
            }
          });
        }
        exists(e) {
          return t0(this, void 0, void 0, function* () {
            let t = this._getFinalPath(e);
            try {
              return (
                yield (function (e, t, r, n) {
                  return tF(this, void 0, void 0, function* () {
                    return tJ(
                      e,
                      "HEAD",
                      t,
                      Object.assign(Object.assign({}, r), {
                        noResolveJson: !0,
                      }),
                      void 0,
                    );
                  });
                })(this.fetch, `${this.url}/object/${t}`, {
                  headers: this.headers,
                }),
                { data: !0, error: null }
              );
            } catch (e) {
              if (tq(e) && e instanceof tB) {
                let t = e.originalError;
                if ([400, 404].includes(null == t ? void 0 : t.status))
                  return { data: !1, error: e };
              }
              throw e;
            }
          });
        }
        getPublicUrl(e, t) {
          let r = this._getFinalPath(e),
            n = [],
            i = (null == t ? void 0 : t.download)
              ? `download=${!0 === t.download ? "" : t.download}`
              : "";
          "" !== i && n.push(i);
          let s = void 0 !== (null == t ? void 0 : t.transform),
            a = this.transformOptsToQueryString(
              (null == t ? void 0 : t.transform) || {},
            );
          "" !== a && n.push(a);
          let o = n.join("&");
          return (
            "" !== o && (o = `?${o}`),
            {
              data: {
                publicUrl: encodeURI(
                  `${this.url}/${s ? "render/image" : "object"}/public/${r}${o}`,
                ),
              },
            }
          );
        }
        remove(e) {
          return t0(this, void 0, void 0, function* () {
            try {
              return {
                data: yield tZ(
                  this.fetch,
                  `${this.url}/object/${this.bucketId}`,
                  { prefixes: e },
                  { headers: this.headers },
                ),
                error: null,
              };
            } catch (e) {
              if (tq(e)) return { data: null, error: e };
              throw e;
            }
          });
        }
        list(e, t, r) {
          return t0(this, void 0, void 0, function* () {
            try {
              let n = Object.assign(Object.assign(Object.assign({}, t1), t), {
                prefix: e || "",
              });
              return {
                data: yield tY(
                  this.fetch,
                  `${this.url}/object/list/${this.bucketId}`,
                  n,
                  { headers: this.headers },
                  r,
                ),
                error: null,
              };
            } catch (e) {
              if (tq(e)) return { data: null, error: e };
              throw e;
            }
          });
        }
        encodeMetadata(e) {
          return JSON.stringify(e);
        }
        toBase64(e) {
          return void 0 !== tQ ? tQ.from(e).toString("base64") : btoa(e);
        }
        _getFinalPath(e) {
          return `${this.bucketId}/${e}`;
        }
        _removeEmptyFolders(e) {
          return e.replace(/^\/|\/$/g, "").replace(/\/+/g, "/");
        }
        transformOptsToQueryString(e) {
          let t = [];
          return (
            e.width && t.push(`width=${e.width}`),
            e.height && t.push(`height=${e.height}`),
            e.resize && t.push(`resize=${e.resize}`),
            e.format && t.push(`format=${e.format}`),
            e.quality && t.push(`quality=${e.quality}`),
            t.join("&")
          );
        }
      }
      let t4 = { "X-Client-Info": "storage-js/2.7.1" };
      var t5 = function (e, t, r, n) {
        return new (r || (r = Promise))(function (i, s) {
          function a(e) {
            try {
              l(n.next(e));
            } catch (e) {
              s(e);
            }
          }
          function o(e) {
            try {
              l(n.throw(e));
            } catch (e) {
              s(e);
            }
          }
          function l(e) {
            var t;
            e.done
              ? i(e.value)
              : ((t = e.value) instanceof r
                  ? t
                  : new r(function (e) {
                      e(t);
                    })
                ).then(a, o);
          }
          l((n = n.apply(e, t || [])).next());
        });
      };
      class t6 {
        constructor(e, t = {}, r) {
          (this.url = e),
            (this.headers = Object.assign(Object.assign({}, t4), t)),
            (this.fetch = tG(r));
        }
        listBuckets() {
          return t5(this, void 0, void 0, function* () {
            try {
              return {
                data: yield tX(this.fetch, `${this.url}/bucket`, {
                  headers: this.headers,
                }),
                error: null,
              };
            } catch (e) {
              if (tq(e)) return { data: null, error: e };
              throw e;
            }
          });
        }
        getBucket(e) {
          return t5(this, void 0, void 0, function* () {
            try {
              return {
                data: yield tX(this.fetch, `${this.url}/bucket/${e}`, {
                  headers: this.headers,
                }),
                error: null,
              };
            } catch (e) {
              if (tq(e)) return { data: null, error: e };
              throw e;
            }
          });
        }
        createBucket(e, t = { public: !1 }) {
          return t5(this, void 0, void 0, function* () {
            try {
              return {
                data: yield tY(
                  this.fetch,
                  `${this.url}/bucket`,
                  {
                    id: e,
                    name: e,
                    public: t.public,
                    file_size_limit: t.fileSizeLimit,
                    allowed_mime_types: t.allowedMimeTypes,
                  },
                  { headers: this.headers },
                ),
                error: null,
              };
            } catch (e) {
              if (tq(e)) return { data: null, error: e };
              throw e;
            }
          });
        }
        updateBucket(e, t) {
          return t5(this, void 0, void 0, function* () {
            try {
              return {
                data: yield (function (e, t, r, n, i) {
                  return tF(this, void 0, void 0, function* () {
                    return tJ(e, "PUT", t, n, void 0, r);
                  });
                })(
                  this.fetch,
                  `${this.url}/bucket/${e}`,
                  {
                    id: e,
                    name: e,
                    public: t.public,
                    file_size_limit: t.fileSizeLimit,
                    allowed_mime_types: t.allowedMimeTypes,
                  },
                  { headers: this.headers },
                ),
                error: null,
              };
            } catch (e) {
              if (tq(e)) return { data: null, error: e };
              throw e;
            }
          });
        }
        emptyBucket(e) {
          return t5(this, void 0, void 0, function* () {
            try {
              return {
                data: yield tY(
                  this.fetch,
                  `${this.url}/bucket/${e}/empty`,
                  {},
                  { headers: this.headers },
                ),
                error: null,
              };
            } catch (e) {
              if (tq(e)) return { data: null, error: e };
              throw e;
            }
          });
        }
        deleteBucket(e) {
          return t5(this, void 0, void 0, function* () {
            try {
              return {
                data: yield tZ(
                  this.fetch,
                  `${this.url}/bucket/${e}`,
                  {},
                  { headers: this.headers },
                ),
                error: null,
              };
            } catch (e) {
              if (tq(e)) return { data: null, error: e };
              throw e;
            }
          });
        }
      }
      class t9 extends t6 {
        constructor(e, t = {}, r) {
          super(e, t, r);
        }
        from(e) {
          return new t3(this.url, this.headers, e, this.fetch);
        }
      }
      let t8 = "";
      t8 =
        "undefined" != typeof Deno
          ? "deno"
          : "undefined" != typeof document
            ? "web"
            : "undefined" != typeof navigator &&
                "ReactNative" === navigator.product
              ? "react-native"
              : "node";
      let t7 = { headers: { "X-Client-Info": `supabase-js-${t8}/2.50.0` } },
        re = { schema: "public" },
        rt = {
          autoRefreshToken: !0,
          persistSession: !0,
          detectSessionInUrl: !0,
          flowType: "implicit",
        },
        rr = {};
      var rn = r(96148);
      let ri = (e) => {
          let t;
          return (
            (t = e || ("undefined" == typeof fetch ? rn.default : fetch)),
            (...e) => t(...e)
          );
        },
        rs = () => ("undefined" == typeof Headers ? rn.Headers : Headers),
        ra = (e, t, r) => {
          let n = ri(r),
            i = rs();
          return (r, s) =>
            (function (e, t, r, n) {
              return new (r || (r = Promise))(function (i, s) {
                function a(e) {
                  try {
                    l(n.next(e));
                  } catch (e) {
                    s(e);
                  }
                }
                function o(e) {
                  try {
                    l(n.throw(e));
                  } catch (e) {
                    s(e);
                  }
                }
                function l(e) {
                  var t;
                  e.done
                    ? i(e.value)
                    : ((t = e.value) instanceof r
                        ? t
                        : new r(function (e) {
                            e(t);
                          })
                      ).then(a, o);
                }
                l((n = n.apply(e, t || [])).next());
              });
            })(void 0, void 0, void 0, function* () {
              var a;
              let o = null != (a = yield t()) ? a : e,
                l = new i(null == s ? void 0 : s.headers);
              return (
                l.has("apikey") || l.set("apikey", e),
                l.has("Authorization") || l.set("Authorization", `Bearer ${o}`),
                n(r, Object.assign(Object.assign({}, s), { headers: l }))
              );
            });
        },
        ro = "2.70.0",
        rl = { "X-Client-Info": `gotrue-js/${ro}` },
        ru = "X-Supabase-Api-Version",
        rc = {
          "2024-01-01": {
            timestamp: Date.parse("2024-01-01T00:00:00.0Z"),
            name: "2024-01-01",
          },
        },
        rd = /^([a-z0-9_-]{4})*($|[a-z0-9_-]{3}$|[a-z0-9_-]{2}$)$/i;
      class rh extends Error {
        constructor(e, t, r) {
          super(e),
            (this.__isAuthError = !0),
            (this.name = "AuthError"),
            (this.status = t),
            (this.code = r);
        }
      }
      function rf(e) {
        return "object" == typeof e && null !== e && "__isAuthError" in e;
      }
      class rp extends rh {
        constructor(e, t, r) {
          super(e, t, r),
            (this.name = "AuthApiError"),
            (this.status = t),
            (this.code = r);
        }
      }
      class r_ extends rh {
        constructor(e, t) {
          super(e), (this.name = "AuthUnknownError"), (this.originalError = t);
        }
      }
      class rg extends rh {
        constructor(e, t, r, n) {
          super(e, r, n), (this.name = t), (this.status = r);
        }
      }
      class rm extends rg {
        constructor() {
          super(
            "Auth session missing!",
            "AuthSessionMissingError",
            400,
            void 0,
          );
        }
      }
      class ry extends rg {
        constructor() {
          super(
            "Auth session or user missing",
            "AuthInvalidTokenResponseError",
            500,
            void 0,
          );
        }
      }
      class rw extends rg {
        constructor(e) {
          super(e, "AuthInvalidCredentialsError", 400, void 0);
        }
      }
      class rv extends rg {
        constructor(e, t = null) {
          super(e, "AuthImplicitGrantRedirectError", 500, void 0),
            (this.details = null),
            (this.details = t);
        }
        toJSON() {
          return {
            name: this.name,
            message: this.message,
            status: this.status,
            details: this.details,
          };
        }
      }
      class rb extends rg {
        constructor(e, t = null) {
          super(e, "AuthPKCEGrantCodeExchangeError", 500, void 0),
            (this.details = null),
            (this.details = t);
        }
        toJSON() {
          return {
            name: this.name,
            message: this.message,
            status: this.status,
            details: this.details,
          };
        }
      }
      class rS extends rg {
        constructor(e, t) {
          super(e, "AuthRetryableFetchError", t, void 0);
        }
      }
      function rE(e) {
        return rf(e) && "AuthRetryableFetchError" === e.name;
      }
      class rk extends rg {
        constructor(e, t, r) {
          super(e, "AuthWeakPasswordError", t, "weak_password"),
            (this.reasons = r);
        }
      }
      class rx extends rg {
        constructor(e) {
          super(e, "AuthInvalidJwtError", 400, "invalid_jwt");
        }
      }
      let rT =
          "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_".split(
            "",
          ),
        rR = " 	\n\r=".split(""),
        rC = (() => {
          let e = Array(128);
          for (let t = 0; t < e.length; t += 1) e[t] = -1;
          for (let t = 0; t < rR.length; t += 1) e[rR[t].charCodeAt(0)] = -2;
          for (let t = 0; t < rT.length; t += 1) e[rT[t].charCodeAt(0)] = t;
          return e;
        })();
      function rP(e, t, r) {
        if (null !== e)
          for (
            t.queue = (t.queue << 8) | e, t.queuedBits += 8;
            t.queuedBits >= 6;

          )
            r(rT[(t.queue >> (t.queuedBits - 6)) & 63]), (t.queuedBits -= 6);
        else if (t.queuedBits > 0)
          for (
            t.queue = t.queue << (6 - t.queuedBits), t.queuedBits = 6;
            t.queuedBits >= 6;

          )
            r(rT[(t.queue >> (t.queuedBits - 6)) & 63]), (t.queuedBits -= 6);
      }
      function rO(e, t, r) {
        let n = rC[e];
        if (n > -1)
          for (
            t.queue = (t.queue << 6) | n, t.queuedBits += 6;
            t.queuedBits >= 8;

          )
            r((t.queue >> (t.queuedBits - 8)) & 255), (t.queuedBits -= 8);
        else if (-2 === n) return;
        else
          throw Error(
            `Invalid Base64-URL character "${String.fromCharCode(e)}"`,
          );
      }
      function rA(e) {
        let t = [],
          r = (e) => {
            t.push(String.fromCodePoint(e));
          },
          n = { utf8seq: 0, codepoint: 0 },
          i = { queue: 0, queuedBits: 0 },
          s = (e) => {
            !(function (e, t, r) {
              if (0 === t.utf8seq) {
                if (e <= 127) return r(e);
                for (let r = 1; r < 6; r += 1)
                  if (((e >> (7 - r)) & 1) == 0) {
                    t.utf8seq = r;
                    break;
                  }
                if (2 === t.utf8seq) t.codepoint = 31 & e;
                else if (3 === t.utf8seq) t.codepoint = 15 & e;
                else if (4 === t.utf8seq) t.codepoint = 7 & e;
                else throw Error("Invalid UTF-8 sequence");
                t.utf8seq -= 1;
              } else if (t.utf8seq > 0) {
                if (e <= 127) throw Error("Invalid UTF-8 sequence");
                (t.codepoint = (t.codepoint << 6) | (63 & e)),
                  (t.utf8seq -= 1),
                  0 === t.utf8seq && r(t.codepoint);
              }
            })(e, n, r);
          };
        for (let t = 0; t < e.length; t += 1) rO(e.charCodeAt(t), i, s);
        return t.join("");
      }
      let rI = () =>
          "undefined" != typeof window && "undefined" != typeof document,
        rj = { tested: !1, writable: !1 },
        rL = () => {
          if (!rI()) return !1;
          try {
            if ("object" != typeof globalThis.localStorage) return !1;
          } catch (e) {
            return !1;
          }
          if (rj.tested) return rj.writable;
          let e = `lswt-${Math.random()}${Math.random()}`;
          try {
            globalThis.localStorage.setItem(e, e),
              globalThis.localStorage.removeItem(e),
              (rj.tested = !0),
              (rj.writable = !0);
          } catch (e) {
            (rj.tested = !0), (rj.writable = !1);
          }
          return rj.writable;
        },
        rN = (e) => {
          let t;
          return (
            (t =
              e ||
              ("undefined" == typeof fetch
                ? (...e) =>
                    Promise.resolve()
                      .then(r.bind(r, 96148))
                      .then(({ default: t }) => t(...e))
                : fetch)),
            (...e) => t(...e)
          );
        },
        rM = (e) =>
          "object" == typeof e &&
          null !== e &&
          "status" in e &&
          "ok" in e &&
          "json" in e &&
          "function" == typeof e.json,
        rD = async (e, t, r) => {
          await e.setItem(t, JSON.stringify(r));
        },
        r$ = async (e, t) => {
          let r = await e.getItem(t);
          if (!r) return null;
          try {
            return JSON.parse(r);
          } catch (e) {
            return r;
          }
        },
        rq = async (e, t) => {
          await e.removeItem(t);
        };
      class rU {
        constructor() {
          this.promise = new rU.promiseConstructor((e, t) => {
            (this.resolve = e), (this.reject = t);
          });
        }
      }
      function rB(e) {
        let t = e.split(".");
        if (3 !== t.length) throw new rx("Invalid JWT structure");
        for (let e = 0; e < t.length; e++)
          if (!rd.test(t[e])) throw new rx("JWT not in base64url format");
        return {
          header: JSON.parse(rA(t[0])),
          payload: JSON.parse(rA(t[1])),
          signature: (function (e) {
            let t = [],
              r = { queue: 0, queuedBits: 0 },
              n = (e) => {
                t.push(e);
              };
            for (let t = 0; t < e.length; t += 1) rO(e.charCodeAt(t), r, n);
            return new Uint8Array(t);
          })(t[2]),
          raw: { header: t[0], payload: t[1] },
        };
      }
      async function rG(e) {
        return await new Promise((t) => {
          setTimeout(() => t(null), e);
        });
      }
      function rz(e) {
        return ("0" + e.toString(16)).substr(-2);
      }
      async function rH(e) {
        let t = new TextEncoder().encode(e);
        return Array.from(
          new Uint8Array(await crypto.subtle.digest("SHA-256", t)),
        )
          .map((e) => String.fromCharCode(e))
          .join("");
      }
      async function rF(e) {
        return "undefined" == typeof crypto ||
          void 0 === crypto.subtle ||
          "undefined" == typeof TextEncoder
          ? (console.warn(
              "WebCrypto API is not supported. Code challenge method will default to use plain instead of sha256.",
            ),
            e)
          : btoa(await rH(e))
              .replace(/\+/g, "-")
              .replace(/\//g, "_")
              .replace(/=+$/, "");
      }
      async function rW(e, t, r = !1) {
        let n = (function () {
            let e = new Uint32Array(56);
            if ("undefined" == typeof crypto) {
              let e =
                  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~",
                t = e.length,
                r = "";
              for (let n = 0; n < 56; n++)
                r += e.charAt(Math.floor(Math.random() * t));
              return r;
            }
            return crypto.getRandomValues(e), Array.from(e, rz).join("");
          })(),
          i = n;
        r && (i += "/PASSWORD_RECOVERY"), await rD(e, `${t}-code-verifier`, i);
        let s = await rF(n),
          a = n === s ? "plain" : "s256";
        return [s, a];
      }
      rU.promiseConstructor = Promise;
      let rK = /^2[0-9]{3}-(0[1-9]|1[0-2])-(0[1-9]|1[0-9]|2[0-9]|3[0-1])$/i,
        rV = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;
      function rJ(e) {
        if (!rV.test(e))
          throw Error(
            "@supabase/auth-js: Expected parameter to be UUID but is not",
          );
      }
      var rX = function (e, t) {
        var r = {};
        for (var n in e)
          Object.prototype.hasOwnProperty.call(e, n) &&
            0 > t.indexOf(n) &&
            (r[n] = e[n]);
        if (null != e && "function" == typeof Object.getOwnPropertySymbols)
          for (
            var i = 0, n = Object.getOwnPropertySymbols(e);
            i < n.length;
            i++
          )
            0 > t.indexOf(n[i]) &&
              Object.prototype.propertyIsEnumerable.call(e, n[i]) &&
              (r[n[i]] = e[n[i]]);
        return r;
      };
      let rY = (e) =>
          e.msg ||
          e.message ||
          e.error_description ||
          e.error ||
          JSON.stringify(e),
        rZ = [502, 503, 504];
      async function rQ(e) {
        var t;
        let r, n;
        if (!rM(e)) throw new rS(rY(e), 0);
        if (rZ.includes(e.status)) throw new rS(rY(e), e.status);
        try {
          r = await e.json();
        } catch (e) {
          throw new r_(rY(e), e);
        }
        let i = (function (e) {
          let t = e.headers.get(ru);
          if (!t || !t.match(rK)) return null;
          try {
            return new Date(`${t}T00:00:00.0Z`);
          } catch (e) {
            return null;
          }
        })(e);
        if (
          (i &&
          i.getTime() >= rc["2024-01-01"].timestamp &&
          "object" == typeof r &&
          r &&
          "string" == typeof r.code
            ? (n = r.code)
            : "object" == typeof r &&
              r &&
              "string" == typeof r.error_code &&
              (n = r.error_code),
          n)
        ) {
          if ("weak_password" === n)
            throw new rk(
              rY(r),
              e.status,
              (null == (t = r.weak_password) ? void 0 : t.reasons) || [],
            );
          else if ("session_not_found" === n) throw new rm();
        } else if (
          "object" == typeof r &&
          r &&
          "object" == typeof r.weak_password &&
          r.weak_password &&
          Array.isArray(r.weak_password.reasons) &&
          r.weak_password.reasons.length &&
          r.weak_password.reasons.reduce(
            (e, t) => e && "string" == typeof t,
            !0,
          )
        )
          throw new rk(rY(r), e.status, r.weak_password.reasons);
        throw new rp(rY(r), e.status || 500, n);
      }
      let r0 = (e, t, r, n) => {
        let i = { method: e, headers: (null == t ? void 0 : t.headers) || {} };
        return "GET" === e
          ? i
          : ((i.headers = Object.assign(
              { "Content-Type": "application/json;charset=UTF-8" },
              null == t ? void 0 : t.headers,
            )),
            (i.body = JSON.stringify(n)),
            Object.assign(Object.assign({}, i), r));
      };
      async function r1(e, t, r, n) {
        var i;
        let s = Object.assign({}, null == n ? void 0 : n.headers);
        s[ru] || (s[ru] = rc["2024-01-01"].name),
          (null == n ? void 0 : n.jwt) && (s.Authorization = `Bearer ${n.jwt}`);
        let a = null != (i = null == n ? void 0 : n.query) ? i : {};
        (null == n ? void 0 : n.redirectTo) && (a.redirect_to = n.redirectTo);
        let o = Object.keys(a).length
            ? "?" + new URLSearchParams(a).toString()
            : "",
          l = await r2(
            e,
            t,
            r + o,
            { headers: s, noResolveJson: null == n ? void 0 : n.noResolveJson },
            {},
            null == n ? void 0 : n.body,
          );
        return (null == n ? void 0 : n.xform)
          ? null == n
            ? void 0
            : n.xform(l)
          : { data: Object.assign({}, l), error: null };
      }
      async function r2(e, t, r, n, i, s) {
        let a,
          o = r0(t, n, i, s);
        try {
          a = await e(r, Object.assign({}, o));
        } catch (e) {
          throw (console.error(e), new rS(rY(e), 0));
        }
        if ((a.ok || (await rQ(a)), null == n ? void 0 : n.noResolveJson))
          return a;
        try {
          return await a.json();
        } catch (e) {
          await rQ(e);
        }
      }
      function r3(e) {
        var t, r, n;
        let i = null;
        (n = e).access_token &&
          n.refresh_token &&
          n.expires_in &&
          ((i = Object.assign({}, e)),
          e.expires_at ||
            (i.expires_at =
              ((r = e.expires_in), Math.round(Date.now() / 1e3) + r)));
        return {
          data: { session: i, user: null != (t = e.user) ? t : e },
          error: null,
        };
      }
      function r4(e) {
        let t = r3(e);
        return (
          !t.error &&
            e.weak_password &&
            "object" == typeof e.weak_password &&
            Array.isArray(e.weak_password.reasons) &&
            e.weak_password.reasons.length &&
            e.weak_password.message &&
            "string" == typeof e.weak_password.message &&
            e.weak_password.reasons.reduce(
              (e, t) => e && "string" == typeof t,
              !0,
            ) &&
            (t.data.weak_password = e.weak_password),
          t
        );
      }
      function r5(e) {
        var t;
        return { data: { user: null != (t = e.user) ? t : e }, error: null };
      }
      function r6(e) {
        return { data: e, error: null };
      }
      function r9(e) {
        let {
          action_link: t,
          email_otp: r,
          hashed_token: n,
          redirect_to: i,
          verification_type: s,
        } = e;
        return {
          data: {
            properties: {
              action_link: t,
              email_otp: r,
              hashed_token: n,
              redirect_to: i,
              verification_type: s,
            },
            user: Object.assign(
              {},
              rX(e, [
                "action_link",
                "email_otp",
                "hashed_token",
                "redirect_to",
                "verification_type",
              ]),
            ),
          },
          error: null,
        };
      }
      function r8(e) {
        return e;
      }
      let r7 = ["global", "local", "others"];
      var ne = function (e, t) {
        var r = {};
        for (var n in e)
          Object.prototype.hasOwnProperty.call(e, n) &&
            0 > t.indexOf(n) &&
            (r[n] = e[n]);
        if (null != e && "function" == typeof Object.getOwnPropertySymbols)
          for (
            var i = 0, n = Object.getOwnPropertySymbols(e);
            i < n.length;
            i++
          )
            0 > t.indexOf(n[i]) &&
              Object.prototype.propertyIsEnumerable.call(e, n[i]) &&
              (r[n[i]] = e[n[i]]);
        return r;
      };
      class nt {
        constructor({ url: e = "", headers: t = {}, fetch: r }) {
          (this.url = e),
            (this.headers = t),
            (this.fetch = rN(r)),
            (this.mfa = {
              listFactors: this._listFactors.bind(this),
              deleteFactor: this._deleteFactor.bind(this),
            });
        }
        async signOut(e, t = r7[0]) {
          if (0 > r7.indexOf(t))
            throw Error(
              `@supabase/auth-js: Parameter scope must be one of ${r7.join(", ")}`,
            );
          try {
            return (
              await r1(this.fetch, "POST", `${this.url}/logout?scope=${t}`, {
                headers: this.headers,
                jwt: e,
                noResolveJson: !0,
              }),
              { data: null, error: null }
            );
          } catch (e) {
            if (rf(e)) return { data: null, error: e };
            throw e;
          }
        }
        async inviteUserByEmail(e, t = {}) {
          try {
            return await r1(this.fetch, "POST", `${this.url}/invite`, {
              body: { email: e, data: t.data },
              headers: this.headers,
              redirectTo: t.redirectTo,
              xform: r5,
            });
          } catch (e) {
            if (rf(e)) return { data: { user: null }, error: e };
            throw e;
          }
        }
        async generateLink(e) {
          try {
            let { options: t } = e,
              r = ne(e, ["options"]),
              n = Object.assign(Object.assign({}, r), t);
            return (
              "newEmail" in r &&
                ((n.new_email = null == r ? void 0 : r.newEmail),
                delete n.newEmail),
              await r1(this.fetch, "POST", `${this.url}/admin/generate_link`, {
                body: n,
                headers: this.headers,
                xform: r9,
                redirectTo: null == t ? void 0 : t.redirectTo,
              })
            );
          } catch (e) {
            if (rf(e))
              return { data: { properties: null, user: null }, error: e };
            throw e;
          }
        }
        async createUser(e) {
          try {
            return await r1(this.fetch, "POST", `${this.url}/admin/users`, {
              body: e,
              headers: this.headers,
              xform: r5,
            });
          } catch (e) {
            if (rf(e)) return { data: { user: null }, error: e };
            throw e;
          }
        }
        async listUsers(e) {
          var t, r, n, i, s, a, o;
          try {
            let l = { nextPage: null, lastPage: 0, total: 0 },
              u = await r1(this.fetch, "GET", `${this.url}/admin/users`, {
                headers: this.headers,
                noResolveJson: !0,
                query: {
                  page:
                    null !=
                    (r =
                      null == (t = null == e ? void 0 : e.page)
                        ? void 0
                        : t.toString())
                      ? r
                      : "",
                  per_page:
                    null !=
                    (i =
                      null == (n = null == e ? void 0 : e.perPage)
                        ? void 0
                        : n.toString())
                      ? i
                      : "",
                },
                xform: r8,
              });
            if (u.error) throw u.error;
            let c = await u.json(),
              d = null != (s = u.headers.get("x-total-count")) ? s : 0,
              h =
                null !=
                (o =
                  null == (a = u.headers.get("link")) ? void 0 : a.split(","))
                  ? o
                  : [];
            return (
              h.length > 0 &&
                (h.forEach((e) => {
                  let t = parseInt(
                      e.split(";")[0].split("=")[1].substring(0, 1),
                    ),
                    r = JSON.parse(e.split(";")[1].split("=")[1]);
                  l[`${r}Page`] = t;
                }),
                (l.total = parseInt(d))),
              { data: Object.assign(Object.assign({}, c), l), error: null }
            );
          } catch (e) {
            if (rf(e)) return { data: { users: [] }, error: e };
            throw e;
          }
        }
        async getUserById(e) {
          rJ(e);
          try {
            return await r1(this.fetch, "GET", `${this.url}/admin/users/${e}`, {
              headers: this.headers,
              xform: r5,
            });
          } catch (e) {
            if (rf(e)) return { data: { user: null }, error: e };
            throw e;
          }
        }
        async updateUserById(e, t) {
          rJ(e);
          try {
            return await r1(this.fetch, "PUT", `${this.url}/admin/users/${e}`, {
              body: t,
              headers: this.headers,
              xform: r5,
            });
          } catch (e) {
            if (rf(e)) return { data: { user: null }, error: e };
            throw e;
          }
        }
        async deleteUser(e, t = !1) {
          rJ(e);
          try {
            return await r1(
              this.fetch,
              "DELETE",
              `${this.url}/admin/users/${e}`,
              {
                headers: this.headers,
                body: { should_soft_delete: t },
                xform: r5,
              },
            );
          } catch (e) {
            if (rf(e)) return { data: { user: null }, error: e };
            throw e;
          }
        }
        async _listFactors(e) {
          rJ(e.userId);
          try {
            let { data: t, error: r } = await r1(
              this.fetch,
              "GET",
              `${this.url}/admin/users/${e.userId}/factors`,
              {
                headers: this.headers,
                xform: (e) => ({ data: { factors: e }, error: null }),
              },
            );
            return { data: t, error: r };
          } catch (e) {
            if (rf(e)) return { data: null, error: e };
            throw e;
          }
        }
        async _deleteFactor(e) {
          rJ(e.userId), rJ(e.id);
          try {
            return {
              data: await r1(
                this.fetch,
                "DELETE",
                `${this.url}/admin/users/${e.userId}/factors/${e.id}`,
                { headers: this.headers },
              ),
              error: null,
            };
          } catch (e) {
            if (rf(e)) return { data: null, error: e };
            throw e;
          }
        }
      }
      let nr = {
        getItem: (e) => (rL() ? globalThis.localStorage.getItem(e) : null),
        setItem: (e, t) => {
          rL() && globalThis.localStorage.setItem(e, t);
        },
        removeItem: (e) => {
          rL() && globalThis.localStorage.removeItem(e);
        },
      };
      function nn(e = {}) {
        return {
          getItem: (t) => e[t] || null,
          setItem: (t, r) => {
            e[t] = r;
          },
          removeItem: (t) => {
            delete e[t];
          },
        };
      }
      let ni = {
        debug: !!(
          globalThis &&
          rL() &&
          globalThis.localStorage &&
          "true" ===
            globalThis.localStorage.getItem("supabase.gotrue-js.locks.debug")
        ),
      };
      class ns extends Error {
        constructor(e) {
          super(e), (this.isAcquireTimeout = !0);
        }
      }
      class na extends ns {}
      async function no(e, t, r) {
        ni.debug &&
          console.log("@supabase/gotrue-js: navigatorLock: acquire lock", e, t);
        let n = new globalThis.AbortController();
        return (
          t > 0 &&
            setTimeout(() => {
              n.abort(),
                ni.debug &&
                  console.log(
                    "@supabase/gotrue-js: navigatorLock acquire timed out",
                    e,
                  );
            }, t),
          await Promise.resolve().then(() =>
            globalThis.navigator.locks.request(
              e,
              0 === t
                ? { mode: "exclusive", ifAvailable: !0 }
                : { mode: "exclusive", signal: n.signal },
              async (n) => {
                if (n) {
                  ni.debug &&
                    console.log(
                      "@supabase/gotrue-js: navigatorLock: acquired",
                      e,
                      n.name,
                    );
                  try {
                    return await r();
                  } finally {
                    ni.debug &&
                      console.log(
                        "@supabase/gotrue-js: navigatorLock: released",
                        e,
                        n.name,
                      );
                  }
                }
                if (0 === t)
                  throw (
                    (ni.debug &&
                      console.log(
                        "@supabase/gotrue-js: navigatorLock: not immediately available",
                        e,
                      ),
                    new na(
                      `Acquiring an exclusive Navigator LockManager lock "${e}" immediately failed`,
                    ))
                  );
                if (ni.debug)
                  try {
                    let e = await globalThis.navigator.locks.query();
                    console.log(
                      "@supabase/gotrue-js: Navigator LockManager state",
                      JSON.stringify(e, null, "  "),
                    );
                  } catch (e) {
                    console.warn(
                      "@supabase/gotrue-js: Error when querying Navigator LockManager state",
                      e,
                    );
                  }
                return (
                  console.warn(
                    "@supabase/gotrue-js: Navigator LockManager returned a null lock when using #request without ifAvailable set to true, it appears this browser is not following the LockManager spec https://developer.mozilla.org/en-US/docs/Web/API/LockManager/request",
                  ),
                  await r()
                );
              },
            ),
          )
        );
      }
      if ("object" != typeof globalThis)
        try {
          Object.defineProperty(Object.prototype, "__magic__", {
            get: function () {
              return this;
            },
            configurable: !0,
          }),
            (__magic__.globalThis = __magic__),
            delete Object.prototype.__magic__;
        } catch (e) {
          "undefined" != typeof self && (self.globalThis = self);
        }
      let nl = {
        url: "http://localhost:9999",
        storageKey: "supabase.auth.token",
        autoRefreshToken: !0,
        persistSession: !0,
        detectSessionInUrl: !0,
        headers: rl,
        flowType: "implicit",
        debug: !1,
        hasCustomAuthorizationHeader: !1,
      };
      async function nu(e, t, r) {
        return await r();
      }
      class nc {
        constructor(e) {
          var t, r;
          (this.memoryStorage = null),
            (this.stateChangeEmitters = new Map()),
            (this.autoRefreshTicker = null),
            (this.visibilityChangedCallback = null),
            (this.refreshingDeferred = null),
            (this.initializePromise = null),
            (this.detectSessionInUrl = !0),
            (this.hasCustomAuthorizationHeader = !1),
            (this.suppressGetSessionWarning = !1),
            (this.lockAcquired = !1),
            (this.pendingInLock = []),
            (this.broadcastChannel = null),
            (this.logger = console.log),
            (this.instanceID = nc.nextInstanceID),
            (nc.nextInstanceID += 1),
            this.instanceID > 0 &&
              rI() &&
              console.warn(
                "Multiple GoTrueClient instances detected in the same browser context. It is not an error, but this should be avoided as it may produce undefined behavior when used concurrently under the same storage key.",
              );
          let n = Object.assign(Object.assign({}, nl), e);
          if (
            ((this.logDebugMessages = !!n.debug),
            "function" == typeof n.debug && (this.logger = n.debug),
            (this.persistSession = n.persistSession),
            (this.storageKey = n.storageKey),
            (this.autoRefreshToken = n.autoRefreshToken),
            (this.admin = new nt({
              url: n.url,
              headers: n.headers,
              fetch: n.fetch,
            })),
            (this.url = n.url),
            (this.headers = n.headers),
            (this.fetch = rN(n.fetch)),
            (this.lock = n.lock || nu),
            (this.detectSessionInUrl = n.detectSessionInUrl),
            (this.flowType = n.flowType),
            (this.hasCustomAuthorizationHeader =
              n.hasCustomAuthorizationHeader),
            n.lock
              ? (this.lock = n.lock)
              : rI() &&
                  (null ==
                  (t = null == globalThis ? void 0 : globalThis.navigator)
                    ? void 0
                    : t.locks)
                ? (this.lock = no)
                : (this.lock = nu),
            (this.jwks = { keys: [] }),
            (this.jwks_cached_at = Number.MIN_SAFE_INTEGER),
            (this.mfa = {
              verify: this._verify.bind(this),
              enroll: this._enroll.bind(this),
              unenroll: this._unenroll.bind(this),
              challenge: this._challenge.bind(this),
              listFactors: this._listFactors.bind(this),
              challengeAndVerify: this._challengeAndVerify.bind(this),
              getAuthenticatorAssuranceLevel:
                this._getAuthenticatorAssuranceLevel.bind(this),
            }),
            this.persistSession
              ? n.storage
                ? (this.storage = n.storage)
                : rL()
                  ? (this.storage = nr)
                  : ((this.memoryStorage = {}),
                    (this.storage = nn(this.memoryStorage)))
              : ((this.memoryStorage = {}),
                (this.storage = nn(this.memoryStorage))),
            rI() &&
              globalThis.BroadcastChannel &&
              this.persistSession &&
              this.storageKey)
          ) {
            try {
              this.broadcastChannel = new globalThis.BroadcastChannel(
                this.storageKey,
              );
            } catch (e) {
              console.error(
                "Failed to create a new BroadcastChannel, multi-tab state changes will not be available",
                e,
              );
            }
            null == (r = this.broadcastChannel) ||
              r.addEventListener("message", async (e) => {
                this._debug(
                  "received broadcast notification from other tab or client",
                  e,
                ),
                  await this._notifyAllSubscribers(
                    e.data.event,
                    e.data.session,
                    !1,
                  );
              });
          }
          this.initialize();
        }
        _debug(...e) {
          return (
            this.logDebugMessages &&
              this.logger(
                `GoTrueClient@${this.instanceID} (${ro}) ${new Date().toISOString()}`,
                ...e,
              ),
            this
          );
        }
        async initialize() {
          return (
            this.initializePromise ||
              (this.initializePromise = (async () =>
                await this._acquireLock(
                  -1,
                  async () => await this._initialize(),
                ))()),
            await this.initializePromise
          );
        }
        async _initialize() {
          var e;
          try {
            let t = (function (e) {
                let t = {},
                  r = new URL(e);
                if (r.hash && "#" === r.hash[0])
                  try {
                    new URLSearchParams(r.hash.substring(1)).forEach((e, r) => {
                      t[r] = e;
                    });
                  } catch (e) {}
                return (
                  r.searchParams.forEach((e, r) => {
                    t[r] = e;
                  }),
                  t
                );
              })(window.location.href),
              r = "none";
            if (
              (this._isImplicitGrantCallback(t)
                ? (r = "implicit")
                : (await this._isPKCECallback(t)) && (r = "pkce"),
              rI() && this.detectSessionInUrl && "none" !== r)
            ) {
              let { data: n, error: i } = await this._getSessionFromURL(t, r);
              if (i) {
                if (
                  (this._debug(
                    "#_initialize()",
                    "error detecting session from URL",
                    i,
                  ),
                  rf(i) && "AuthImplicitGrantRedirectError" === i.name)
                ) {
                  let t = null == (e = i.details) ? void 0 : e.code;
                  if (
                    "identity_already_exists" === t ||
                    "identity_not_found" === t ||
                    "single_identity_not_deletable" === t
                  )
                    return { error: i };
                }
                return await this._removeSession(), { error: i };
              }
              let { session: s, redirectType: a } = n;
              return (
                this._debug(
                  "#_initialize()",
                  "detected session in URL",
                  s,
                  "redirect type",
                  a,
                ),
                await this._saveSession(s),
                setTimeout(async () => {
                  "recovery" === a
                    ? await this._notifyAllSubscribers("PASSWORD_RECOVERY", s)
                    : await this._notifyAllSubscribers("SIGNED_IN", s);
                }, 0),
                { error: null }
              );
            }
            return await this._recoverAndRefresh(), { error: null };
          } catch (e) {
            if (rf(e)) return { error: e };
            return {
              error: new r_("Unexpected error during initialization", e),
            };
          } finally {
            await this._handleVisibilityChange(),
              this._debug("#_initialize()", "end");
          }
        }
        async signInAnonymously(e) {
          var t, r, n;
          try {
            let { data: i, error: s } = await r1(
              this.fetch,
              "POST",
              `${this.url}/signup`,
              {
                headers: this.headers,
                body: {
                  data:
                    null !=
                    (r =
                      null == (t = null == e ? void 0 : e.options)
                        ? void 0
                        : t.data)
                      ? r
                      : {},
                  gotrue_meta_security: {
                    captcha_token:
                      null == (n = null == e ? void 0 : e.options)
                        ? void 0
                        : n.captchaToken,
                  },
                },
                xform: r3,
              },
            );
            if (s || !i)
              return { data: { user: null, session: null }, error: s };
            let a = i.session,
              o = i.user;
            return (
              i.session &&
                (await this._saveSession(i.session),
                await this._notifyAllSubscribers("SIGNED_IN", a)),
              { data: { user: o, session: a }, error: null }
            );
          } catch (e) {
            if (rf(e)) return { data: { user: null, session: null }, error: e };
            throw e;
          }
        }
        async signUp(e) {
          var t, r, n;
          try {
            let i;
            if ("email" in e) {
              let { email: r, password: n, options: s } = e,
                a = null,
                o = null;
              "pkce" === this.flowType &&
                ([a, o] = await rW(this.storage, this.storageKey)),
                (i = await r1(this.fetch, "POST", `${this.url}/signup`, {
                  headers: this.headers,
                  redirectTo: null == s ? void 0 : s.emailRedirectTo,
                  body: {
                    email: r,
                    password: n,
                    data: null != (t = null == s ? void 0 : s.data) ? t : {},
                    gotrue_meta_security: {
                      captcha_token: null == s ? void 0 : s.captchaToken,
                    },
                    code_challenge: a,
                    code_challenge_method: o,
                  },
                  xform: r3,
                }));
            } else if ("phone" in e) {
              let { phone: t, password: s, options: a } = e;
              i = await r1(this.fetch, "POST", `${this.url}/signup`, {
                headers: this.headers,
                body: {
                  phone: t,
                  password: s,
                  data: null != (r = null == a ? void 0 : a.data) ? r : {},
                  channel:
                    null != (n = null == a ? void 0 : a.channel) ? n : "sms",
                  gotrue_meta_security: {
                    captcha_token: null == a ? void 0 : a.captchaToken,
                  },
                },
                xform: r3,
              });
            } else
              throw new rw(
                "You must provide either an email or phone number and a password",
              );
            let { data: s, error: a } = i;
            if (a || !s)
              return { data: { user: null, session: null }, error: a };
            let o = s.session,
              l = s.user;
            return (
              s.session &&
                (await this._saveSession(s.session),
                await this._notifyAllSubscribers("SIGNED_IN", o)),
              { data: { user: l, session: o }, error: null }
            );
          } catch (e) {
            if (rf(e)) return { data: { user: null, session: null }, error: e };
            throw e;
          }
        }
        async signInWithPassword(e) {
          try {
            let t;
            if ("email" in e) {
              let { email: r, password: n, options: i } = e;
              t = await r1(
                this.fetch,
                "POST",
                `${this.url}/token?grant_type=password`,
                {
                  headers: this.headers,
                  body: {
                    email: r,
                    password: n,
                    gotrue_meta_security: {
                      captcha_token: null == i ? void 0 : i.captchaToken,
                    },
                  },
                  xform: r4,
                },
              );
            } else if ("phone" in e) {
              let { phone: r, password: n, options: i } = e;
              t = await r1(
                this.fetch,
                "POST",
                `${this.url}/token?grant_type=password`,
                {
                  headers: this.headers,
                  body: {
                    phone: r,
                    password: n,
                    gotrue_meta_security: {
                      captcha_token: null == i ? void 0 : i.captchaToken,
                    },
                  },
                  xform: r4,
                },
              );
            } else
              throw new rw(
                "You must provide either an email or phone number and a password",
              );
            let { data: r, error: n } = t;
            if (n) return { data: { user: null, session: null }, error: n };
            if (!r || !r.session || !r.user)
              return { data: { user: null, session: null }, error: new ry() };
            return (
              r.session &&
                (await this._saveSession(r.session),
                await this._notifyAllSubscribers("SIGNED_IN", r.session)),
              {
                data: Object.assign(
                  { user: r.user, session: r.session },
                  r.weak_password ? { weakPassword: r.weak_password } : null,
                ),
                error: n,
              }
            );
          } catch (e) {
            if (rf(e)) return { data: { user: null, session: null }, error: e };
            throw e;
          }
        }
        async signInWithOAuth(e) {
          var t, r, n, i;
          return await this._handleProviderSignIn(e.provider, {
            redirectTo: null == (t = e.options) ? void 0 : t.redirectTo,
            scopes: null == (r = e.options) ? void 0 : r.scopes,
            queryParams: null == (n = e.options) ? void 0 : n.queryParams,
            skipBrowserRedirect:
              null == (i = e.options) ? void 0 : i.skipBrowserRedirect,
          });
        }
        async exchangeCodeForSession(e) {
          return (
            await this.initializePromise,
            this._acquireLock(-1, async () => this._exchangeCodeForSession(e))
          );
        }
        async signInWithWeb3(e) {
          let { chain: t } = e;
          if ("solana" === t) return await this.signInWithSolana(e);
          throw Error(`@supabase/auth-js: Unsupported chain "${t}"`);
        }
        async signInWithSolana(e) {
          var t, r, n, i, s, a, o, l, u, c, d, h;
          let f, p;
          if ("message" in e) (f = e.message), (p = e.signature);
          else {
            let d,
              { chain: h, wallet: _, statement: g, options: m } = e;
            if (rI())
              if ("object" == typeof _) d = _;
              else {
                let e = window;
                if (
                  "solana" in e &&
                  "object" == typeof e.solana &&
                  (("signIn" in e.solana &&
                    "function" == typeof e.solana.signIn) ||
                    ("signMessage" in e.solana &&
                      "function" == typeof e.solana.signMessage))
                )
                  d = e.solana;
                else
                  throw Error(
                    "@supabase/auth-js: No compatible Solana wallet interface on the window object (window.solana) detected. Make sure the user already has a wallet installed and connected for this app. Prefer passing the wallet interface object directly to signInWithWeb3({ chain: 'solana', wallet: resolvedUserWallet }) instead.",
                  );
              }
            else {
              if ("object" != typeof _ || !(null == m ? void 0 : m.url))
                throw Error(
                  "@supabase/auth-js: Both wallet and url must be specified in non-browser environments.",
                );
              d = _;
            }
            let y = new URL(
              null != (t = null == m ? void 0 : m.url)
                ? t
                : window.location.href,
            );
            if ("signIn" in d && d.signIn) {
              let e,
                t = await d.signIn(
                  Object.assign(
                    Object.assign(
                      Object.assign(
                        { issuedAt: new Date().toISOString() },
                        null == m ? void 0 : m.signInWithSolana,
                      ),
                      { version: "1", domain: y.host, uri: y.href },
                    ),
                    g ? { statement: g } : null,
                  ),
                );
              if (Array.isArray(t) && t[0] && "object" == typeof t[0]) e = t[0];
              else if (
                t &&
                "object" == typeof t &&
                "signedMessage" in t &&
                "signature" in t
              )
                e = t;
              else
                throw Error(
                  "@supabase/auth-js: Wallet method signIn() returned unrecognized value",
                );
              if (
                "signedMessage" in e &&
                "signature" in e &&
                ("string" == typeof e.signedMessage ||
                  e.signedMessage instanceof Uint8Array) &&
                e.signature instanceof Uint8Array
              )
                (f =
                  "string" == typeof e.signedMessage
                    ? e.signedMessage
                    : new TextDecoder().decode(e.signedMessage)),
                  (p = e.signature);
              else
                throw Error(
                  "@supabase/auth-js: Wallet method signIn() API returned object without signedMessage and signature fields",
                );
            } else {
              if (
                !("signMessage" in d) ||
                "function" != typeof d.signMessage ||
                !("publicKey" in d) ||
                "object" != typeof d ||
                !d.publicKey ||
                !("toBase58" in d.publicKey) ||
                "function" != typeof d.publicKey.toBase58
              )
                throw Error(
                  "@supabase/auth-js: Wallet does not have a compatible signMessage() and publicKey.toBase58() API",
                );
              f = [
                `${y.host} wants you to sign in with your Solana account:`,
                d.publicKey.toBase58(),
                ...(g ? ["", g, ""] : [""]),
                "Version: 1",
                `URI: ${y.href}`,
                `Issued At: ${null != (n = null == (r = null == m ? void 0 : m.signInWithSolana) ? void 0 : r.issuedAt) ? n : new Date().toISOString()}`,
                ...((
                  null == (i = null == m ? void 0 : m.signInWithSolana)
                    ? void 0
                    : i.notBefore
                )
                  ? [`Not Before: ${m.signInWithSolana.notBefore}`]
                  : []),
                ...((
                  null == (s = null == m ? void 0 : m.signInWithSolana)
                    ? void 0
                    : s.expirationTime
                )
                  ? [`Expiration Time: ${m.signInWithSolana.expirationTime}`]
                  : []),
                ...((
                  null == (a = null == m ? void 0 : m.signInWithSolana)
                    ? void 0
                    : a.chainId
                )
                  ? [`Chain ID: ${m.signInWithSolana.chainId}`]
                  : []),
                ...((
                  null == (o = null == m ? void 0 : m.signInWithSolana)
                    ? void 0
                    : o.nonce
                )
                  ? [`Nonce: ${m.signInWithSolana.nonce}`]
                  : []),
                ...((
                  null == (l = null == m ? void 0 : m.signInWithSolana)
                    ? void 0
                    : l.requestId
                )
                  ? [`Request ID: ${m.signInWithSolana.requestId}`]
                  : []),
                ...((
                  null ==
                  (c =
                    null == (u = null == m ? void 0 : m.signInWithSolana)
                      ? void 0
                      : u.resources)
                    ? void 0
                    : c.length
                )
                  ? [
                      "Resources",
                      ...m.signInWithSolana.resources.map((e) => `- ${e}`),
                    ]
                  : []),
              ].join("\n");
              let e = await d.signMessage(new TextEncoder().encode(f), "utf8");
              if (!e || !(e instanceof Uint8Array))
                throw Error(
                  "@supabase/auth-js: Wallet signMessage() API returned an recognized value",
                );
              p = e;
            }
          }
          try {
            let { data: t, error: r } = await r1(
              this.fetch,
              "POST",
              `${this.url}/token?grant_type=web3`,
              {
                headers: this.headers,
                body: Object.assign(
                  {
                    chain: "solana",
                    message: f,
                    signature: (function (e) {
                      let t = [],
                        r = { queue: 0, queuedBits: 0 },
                        n = (e) => {
                          t.push(e);
                        };
                      return (
                        e.forEach((e) => rP(e, r, n)),
                        rP(null, r, n),
                        t.join("")
                      );
                    })(p),
                  },
                  (null == (d = e.options) ? void 0 : d.captchaToken)
                    ? {
                        gotrue_meta_security: {
                          captcha_token:
                            null == (h = e.options) ? void 0 : h.captchaToken,
                        },
                      }
                    : null,
                ),
                xform: r3,
              },
            );
            if (r) throw r;
            if (!t || !t.session || !t.user)
              return { data: { user: null, session: null }, error: new ry() };
            return (
              t.session &&
                (await this._saveSession(t.session),
                await this._notifyAllSubscribers("SIGNED_IN", t.session)),
              { data: Object.assign({}, t), error: r }
            );
          } catch (e) {
            if (rf(e)) return { data: { user: null, session: null }, error: e };
            throw e;
          }
        }
        async _exchangeCodeForSession(e) {
          let t = await r$(this.storage, `${this.storageKey}-code-verifier`),
            [r, n] = (null != t ? t : "").split("/");
          try {
            let { data: t, error: i } = await r1(
              this.fetch,
              "POST",
              `${this.url}/token?grant_type=pkce`,
              {
                headers: this.headers,
                body: { auth_code: e, code_verifier: r },
                xform: r3,
              },
            );
            if ((await rq(this.storage, `${this.storageKey}-code-verifier`), i))
              throw i;
            if (!t || !t.session || !t.user)
              return {
                data: { user: null, session: null, redirectType: null },
                error: new ry(),
              };
            return (
              t.session &&
                (await this._saveSession(t.session),
                await this._notifyAllSubscribers("SIGNED_IN", t.session)),
              {
                data: Object.assign(Object.assign({}, t), {
                  redirectType: null != n ? n : null,
                }),
                error: i,
              }
            );
          } catch (e) {
            if (rf(e))
              return {
                data: { user: null, session: null, redirectType: null },
                error: e,
              };
            throw e;
          }
        }
        async signInWithIdToken(e) {
          try {
            let {
                options: t,
                provider: r,
                token: n,
                access_token: i,
                nonce: s,
              } = e,
              { data: a, error: o } = await r1(
                this.fetch,
                "POST",
                `${this.url}/token?grant_type=id_token`,
                {
                  headers: this.headers,
                  body: {
                    provider: r,
                    id_token: n,
                    access_token: i,
                    nonce: s,
                    gotrue_meta_security: {
                      captcha_token: null == t ? void 0 : t.captchaToken,
                    },
                  },
                  xform: r3,
                },
              );
            if (o) return { data: { user: null, session: null }, error: o };
            if (!a || !a.session || !a.user)
              return { data: { user: null, session: null }, error: new ry() };
            return (
              a.session &&
                (await this._saveSession(a.session),
                await this._notifyAllSubscribers("SIGNED_IN", a.session)),
              { data: a, error: o }
            );
          } catch (e) {
            if (rf(e)) return { data: { user: null, session: null }, error: e };
            throw e;
          }
        }
        async signInWithOtp(e) {
          var t, r, n, i, s;
          try {
            if ("email" in e) {
              let { email: n, options: i } = e,
                s = null,
                a = null;
              "pkce" === this.flowType &&
                ([s, a] = await rW(this.storage, this.storageKey));
              let { error: o } = await r1(
                this.fetch,
                "POST",
                `${this.url}/otp`,
                {
                  headers: this.headers,
                  body: {
                    email: n,
                    data: null != (t = null == i ? void 0 : i.data) ? t : {},
                    create_user:
                      null == (r = null == i ? void 0 : i.shouldCreateUser) ||
                      r,
                    gotrue_meta_security: {
                      captcha_token: null == i ? void 0 : i.captchaToken,
                    },
                    code_challenge: s,
                    code_challenge_method: a,
                  },
                  redirectTo: null == i ? void 0 : i.emailRedirectTo,
                },
              );
              return { data: { user: null, session: null }, error: o };
            }
            if ("phone" in e) {
              let { phone: t, options: r } = e,
                { data: a, error: o } = await r1(
                  this.fetch,
                  "POST",
                  `${this.url}/otp`,
                  {
                    headers: this.headers,
                    body: {
                      phone: t,
                      data: null != (n = null == r ? void 0 : r.data) ? n : {},
                      create_user:
                        null == (i = null == r ? void 0 : r.shouldCreateUser) ||
                        i,
                      gotrue_meta_security: {
                        captcha_token: null == r ? void 0 : r.captchaToken,
                      },
                      channel:
                        null != (s = null == r ? void 0 : r.channel)
                          ? s
                          : "sms",
                    },
                  },
                );
              return {
                data: {
                  user: null,
                  session: null,
                  messageId: null == a ? void 0 : a.message_id,
                },
                error: o,
              };
            }
            throw new rw("You must provide either an email or phone number.");
          } catch (e) {
            if (rf(e)) return { data: { user: null, session: null }, error: e };
            throw e;
          }
        }
        async verifyOtp(e) {
          var t, r;
          try {
            let n, i;
            "options" in e &&
              ((n = null == (t = e.options) ? void 0 : t.redirectTo),
              (i = null == (r = e.options) ? void 0 : r.captchaToken));
            let { data: s, error: a } = await r1(
              this.fetch,
              "POST",
              `${this.url}/verify`,
              {
                headers: this.headers,
                body: Object.assign(Object.assign({}, e), {
                  gotrue_meta_security: { captcha_token: i },
                }),
                redirectTo: n,
                xform: r3,
              },
            );
            if (a) throw a;
            if (!s) throw Error("An error occurred on token verification.");
            let o = s.session,
              l = s.user;
            return (
              (null == o ? void 0 : o.access_token) &&
                (await this._saveSession(o),
                await this._notifyAllSubscribers(
                  "recovery" == e.type ? "PASSWORD_RECOVERY" : "SIGNED_IN",
                  o,
                )),
              { data: { user: l, session: o }, error: null }
            );
          } catch (e) {
            if (rf(e)) return { data: { user: null, session: null }, error: e };
            throw e;
          }
        }
        async signInWithSSO(e) {
          var t, r, n;
          try {
            let i = null,
              s = null;
            return (
              "pkce" === this.flowType &&
                ([i, s] = await rW(this.storage, this.storageKey)),
              await r1(this.fetch, "POST", `${this.url}/sso`, {
                body: Object.assign(
                  Object.assign(
                    Object.assign(
                      Object.assign(
                        Object.assign(
                          {},
                          "providerId" in e
                            ? { provider_id: e.providerId }
                            : null,
                        ),
                        "domain" in e ? { domain: e.domain } : null,
                      ),
                      {
                        redirect_to:
                          null !=
                          (r = null == (t = e.options) ? void 0 : t.redirectTo)
                            ? r
                            : void 0,
                      },
                    ),
                    (
                      null == (n = null == e ? void 0 : e.options)
                        ? void 0
                        : n.captchaToken
                    )
                      ? {
                          gotrue_meta_security: {
                            captcha_token: e.options.captchaToken,
                          },
                        }
                      : null,
                  ),
                  {
                    skip_http_redirect: !0,
                    code_challenge: i,
                    code_challenge_method: s,
                  },
                ),
                headers: this.headers,
                xform: r6,
              })
            );
          } catch (e) {
            if (rf(e)) return { data: null, error: e };
            throw e;
          }
        }
        async reauthenticate() {
          return (
            await this.initializePromise,
            await this._acquireLock(
              -1,
              async () => await this._reauthenticate(),
            )
          );
        }
        async _reauthenticate() {
          try {
            return await this._useSession(async (e) => {
              let {
                data: { session: t },
                error: r,
              } = e;
              if (r) throw r;
              if (!t) throw new rm();
              let { error: n } = await r1(
                this.fetch,
                "GET",
                `${this.url}/reauthenticate`,
                { headers: this.headers, jwt: t.access_token },
              );
              return { data: { user: null, session: null }, error: n };
            });
          } catch (e) {
            if (rf(e)) return { data: { user: null, session: null }, error: e };
            throw e;
          }
        }
        async resend(e) {
          try {
            let t = `${this.url}/resend`;
            if ("email" in e) {
              let { email: r, type: n, options: i } = e,
                { error: s } = await r1(this.fetch, "POST", t, {
                  headers: this.headers,
                  body: {
                    email: r,
                    type: n,
                    gotrue_meta_security: {
                      captcha_token: null == i ? void 0 : i.captchaToken,
                    },
                  },
                  redirectTo: null == i ? void 0 : i.emailRedirectTo,
                });
              return { data: { user: null, session: null }, error: s };
            }
            if ("phone" in e) {
              let { phone: r, type: n, options: i } = e,
                { data: s, error: a } = await r1(this.fetch, "POST", t, {
                  headers: this.headers,
                  body: {
                    phone: r,
                    type: n,
                    gotrue_meta_security: {
                      captcha_token: null == i ? void 0 : i.captchaToken,
                    },
                  },
                });
              return {
                data: {
                  user: null,
                  session: null,
                  messageId: null == s ? void 0 : s.message_id,
                },
                error: a,
              };
            }
            throw new rw(
              "You must provide either an email or phone number and a type",
            );
          } catch (e) {
            if (rf(e)) return { data: { user: null, session: null }, error: e };
            throw e;
          }
        }
        async getSession() {
          return (
            await this.initializePromise,
            await this._acquireLock(-1, async () =>
              this._useSession(async (e) => e),
            )
          );
        }
        async _acquireLock(e, t) {
          this._debug("#_acquireLock", "begin", e);
          try {
            if (this.lockAcquired) {
              let e = this.pendingInLock.length
                  ? this.pendingInLock[this.pendingInLock.length - 1]
                  : Promise.resolve(),
                r = (async () => (await e, await t()))();
              return (
                this.pendingInLock.push(
                  (async () => {
                    try {
                      await r;
                    } catch (e) {}
                  })(),
                ),
                r
              );
            }
            return await this.lock(`lock:${this.storageKey}`, e, async () => {
              this._debug(
                "#_acquireLock",
                "lock acquired for storage key",
                this.storageKey,
              );
              try {
                this.lockAcquired = !0;
                let e = t();
                for (
                  this.pendingInLock.push(
                    (async () => {
                      try {
                        await e;
                      } catch (e) {}
                    })(),
                  ),
                    await e;
                  this.pendingInLock.length;

                ) {
                  let e = [...this.pendingInLock];
                  await Promise.all(e), this.pendingInLock.splice(0, e.length);
                }
                return await e;
              } finally {
                this._debug(
                  "#_acquireLock",
                  "lock released for storage key",
                  this.storageKey,
                ),
                  (this.lockAcquired = !1);
              }
            });
          } finally {
            this._debug("#_acquireLock", "end");
          }
        }
        async _useSession(e) {
          this._debug("#_useSession", "begin");
          try {
            let t = await this.__loadSession();
            return await e(t);
          } finally {
            this._debug("#_useSession", "end");
          }
        }
        async __loadSession() {
          this._debug("#__loadSession()", "begin"),
            this.lockAcquired ||
              this._debug(
                "#__loadSession()",
                "used outside of an acquired lock!",
                Error().stack,
              );
          try {
            let e = null,
              t = await r$(this.storage, this.storageKey);
            if (
              (this._debug("#getSession()", "session from storage", t),
              null !== t &&
                (this._isValidSession(t)
                  ? (e = t)
                  : (this._debug(
                      "#getSession()",
                      "session from storage is not valid",
                    ),
                    await this._removeSession())),
              !e)
            )
              return { data: { session: null }, error: null };
            let r = !!e.expires_at && 1e3 * e.expires_at - Date.now() < 9e4;
            if (
              (this._debug(
                "#__loadSession()",
                `session has${r ? "" : " not"} expired`,
                "expires_at",
                e.expires_at,
              ),
              !r)
            ) {
              if (this.storage.isServer) {
                let t = this.suppressGetSessionWarning;
                e = new Proxy(e, {
                  get: (e, r, n) => (
                    t ||
                      "user" !== r ||
                      (console.warn(
                        "Using the user object as returned from supabase.auth.getSession() or from some supabase.auth.onAuthStateChange() events could be insecure! This value comes directly from the storage medium (usually cookies on the server) and may not be authentic. Use supabase.auth.getUser() instead which authenticates the data by contacting the Supabase Auth server.",
                      ),
                      (t = !0),
                      (this.suppressGetSessionWarning = !0)),
                    Reflect.get(e, r, n)
                  ),
                });
              }
              return { data: { session: e }, error: null };
            }
            let { session: n, error: i } = await this._callRefreshToken(
              e.refresh_token,
            );
            if (i) return { data: { session: null }, error: i };
            return { data: { session: n }, error: null };
          } finally {
            this._debug("#__loadSession()", "end");
          }
        }
        async getUser(e) {
          return e
            ? await this._getUser(e)
            : (await this.initializePromise,
              await this._acquireLock(-1, async () => await this._getUser()));
        }
        async _getUser(e) {
          try {
            if (e)
              return await r1(this.fetch, "GET", `${this.url}/user`, {
                headers: this.headers,
                jwt: e,
                xform: r5,
              });
            return await this._useSession(async (e) => {
              var t, r, n;
              let { data: i, error: s } = e;
              if (s) throw s;
              return (null == (t = i.session) ? void 0 : t.access_token) ||
                this.hasCustomAuthorizationHeader
                ? await r1(this.fetch, "GET", `${this.url}/user`, {
                    headers: this.headers,
                    jwt:
                      null !=
                      (n = null == (r = i.session) ? void 0 : r.access_token)
                        ? n
                        : void 0,
                    xform: r5,
                  })
                : { data: { user: null }, error: new rm() };
            });
          } catch (e) {
            if (rf(e))
              return (
                rf(e) &&
                  "AuthSessionMissingError" === e.name &&
                  (await this._removeSession(),
                  await rq(this.storage, `${this.storageKey}-code-verifier`)),
                { data: { user: null }, error: e }
              );
            throw e;
          }
        }
        async updateUser(e, t = {}) {
          return (
            await this.initializePromise,
            await this._acquireLock(
              -1,
              async () => await this._updateUser(e, t),
            )
          );
        }
        async _updateUser(e, t = {}) {
          try {
            return await this._useSession(async (r) => {
              let { data: n, error: i } = r;
              if (i) throw i;
              if (!n.session) throw new rm();
              let s = n.session,
                a = null,
                o = null;
              "pkce" === this.flowType &&
                null != e.email &&
                ([a, o] = await rW(this.storage, this.storageKey));
              let { data: l, error: u } = await r1(
                this.fetch,
                "PUT",
                `${this.url}/user`,
                {
                  headers: this.headers,
                  redirectTo: null == t ? void 0 : t.emailRedirectTo,
                  body: Object.assign(Object.assign({}, e), {
                    code_challenge: a,
                    code_challenge_method: o,
                  }),
                  jwt: s.access_token,
                  xform: r5,
                },
              );
              if (u) throw u;
              return (
                (s.user = l.user),
                await this._saveSession(s),
                await this._notifyAllSubscribers("USER_UPDATED", s),
                { data: { user: s.user }, error: null }
              );
            });
          } catch (e) {
            if (rf(e)) return { data: { user: null }, error: e };
            throw e;
          }
        }
        async setSession(e) {
          return (
            await this.initializePromise,
            await this._acquireLock(-1, async () => await this._setSession(e))
          );
        }
        async _setSession(e) {
          try {
            if (!e.access_token || !e.refresh_token) throw new rm();
            let t = Date.now() / 1e3,
              r = t,
              n = !0,
              i = null,
              { payload: s } = rB(e.access_token);
            if ((s.exp && (n = (r = s.exp) <= t), n)) {
              let { session: t, error: r } = await this._callRefreshToken(
                e.refresh_token,
              );
              if (r) return { data: { user: null, session: null }, error: r };
              if (!t)
                return { data: { user: null, session: null }, error: null };
              i = t;
            } else {
              let { data: n, error: s } = await this._getUser(e.access_token);
              if (s) throw s;
              (i = {
                access_token: e.access_token,
                refresh_token: e.refresh_token,
                user: n.user,
                token_type: "bearer",
                expires_in: r - t,
                expires_at: r,
              }),
                await this._saveSession(i),
                await this._notifyAllSubscribers("SIGNED_IN", i);
            }
            return { data: { user: i.user, session: i }, error: null };
          } catch (e) {
            if (rf(e)) return { data: { session: null, user: null }, error: e };
            throw e;
          }
        }
        async refreshSession(e) {
          return (
            await this.initializePromise,
            await this._acquireLock(
              -1,
              async () => await this._refreshSession(e),
            )
          );
        }
        async _refreshSession(e) {
          try {
            return await this._useSession(async (t) => {
              var r;
              if (!e) {
                let { data: n, error: i } = t;
                if (i) throw i;
                e = null != (r = n.session) ? r : void 0;
              }
              if (!(null == e ? void 0 : e.refresh_token)) throw new rm();
              let { session: n, error: i } = await this._callRefreshToken(
                e.refresh_token,
              );
              return i
                ? { data: { user: null, session: null }, error: i }
                : n
                  ? { data: { user: n.user, session: n }, error: null }
                  : { data: { user: null, session: null }, error: null };
            });
          } catch (e) {
            if (rf(e)) return { data: { user: null, session: null }, error: e };
            throw e;
          }
        }
        async _getSessionFromURL(e, t) {
          try {
            if (!rI()) throw new rv("No browser detected.");
            if (e.error || e.error_description || e.error_code)
              throw new rv(
                e.error_description ||
                  "Error in URL with unspecified error_description",
                {
                  error: e.error || "unspecified_error",
                  code: e.error_code || "unspecified_code",
                },
              );
            switch (t) {
              case "implicit":
                if ("pkce" === this.flowType)
                  throw new rb("Not a valid PKCE flow url.");
                break;
              case "pkce":
                if ("implicit" === this.flowType)
                  throw new rv("Not a valid implicit grant flow url.");
            }
            if ("pkce" === t) {
              if (
                (this._debug("#_initialize()", "begin", "is PKCE flow", !0),
                !e.code)
              )
                throw new rb("No code detected.");
              let { data: t, error: r } = await this._exchangeCodeForSession(
                e.code,
              );
              if (r) throw r;
              let n = new URL(window.location.href);
              return (
                n.searchParams.delete("code"),
                window.history.replaceState(
                  window.history.state,
                  "",
                  n.toString(),
                ),
                {
                  data: { session: t.session, redirectType: null },
                  error: null,
                }
              );
            }
            let {
              provider_token: r,
              provider_refresh_token: n,
              access_token: i,
              refresh_token: s,
              expires_in: a,
              expires_at: o,
              token_type: l,
            } = e;
            if (!i || !a || !s || !l) throw new rv("No session defined in URL");
            let u = Math.round(Date.now() / 1e3),
              c = parseInt(a),
              d = u + c;
            o && (d = parseInt(o));
            let h = d - u;
            1e3 * h <= 3e4 &&
              console.warn(
                `@supabase/gotrue-js: Session as retrieved from URL expires in ${h}s, should have been closer to ${c}s`,
              );
            let f = d - c;
            u - f >= 120
              ? console.warn(
                  "@supabase/gotrue-js: Session as retrieved from URL was issued over 120s ago, URL could be stale",
                  f,
                  d,
                  u,
                )
              : u - f < 0 &&
                console.warn(
                  "@supabase/gotrue-js: Session as retrieved from URL was issued in the future? Check the device clock for skew",
                  f,
                  d,
                  u,
                );
            let { data: p, error: _ } = await this._getUser(i);
            if (_) throw _;
            let g = {
              provider_token: r,
              provider_refresh_token: n,
              access_token: i,
              expires_in: c,
              expires_at: d,
              refresh_token: s,
              token_type: l,
              user: p.user,
            };
            return (
              (window.location.hash = ""),
              this._debug(
                "#_getSessionFromURL()",
                "clearing window.location.hash",
              ),
              { data: { session: g, redirectType: e.type }, error: null }
            );
          } catch (e) {
            if (rf(e))
              return { data: { session: null, redirectType: null }, error: e };
            throw e;
          }
        }
        _isImplicitGrantCallback(e) {
          return !!(e.access_token || e.error_description);
        }
        async _isPKCECallback(e) {
          let t = await r$(this.storage, `${this.storageKey}-code-verifier`);
          return !!(e.code && t);
        }
        async signOut(e = { scope: "global" }) {
          return (
            await this.initializePromise,
            await this._acquireLock(-1, async () => await this._signOut(e))
          );
        }
        async _signOut({ scope: e } = { scope: "global" }) {
          return await this._useSession(async (t) => {
            var r;
            let { data: n, error: i } = t;
            if (i) return { error: i };
            let s = null == (r = n.session) ? void 0 : r.access_token;
            if (s) {
              let { error: t } = await this.admin.signOut(s, e);
              if (
                t &&
                !(
                  rf(t) &&
                  "AuthApiError" === t.name &&
                  (404 === t.status || 401 === t.status || 403 === t.status)
                )
              )
                return { error: t };
            }
            return (
              "others" !== e &&
                (await this._removeSession(),
                await rq(this.storage, `${this.storageKey}-code-verifier`)),
              { error: null }
            );
          });
        }
        onAuthStateChange(e) {
          let t = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
              /[xy]/g,
              function (e) {
                let t = (16 * Math.random()) | 0;
                return ("x" == e ? t : (3 & t) | 8).toString(16);
              },
            ),
            r = {
              id: t,
              callback: e,
              unsubscribe: () => {
                this._debug(
                  "#unsubscribe()",
                  "state change callback with id removed",
                  t,
                ),
                  this.stateChangeEmitters.delete(t);
              },
            };
          return (
            this._debug(
              "#onAuthStateChange()",
              "registered callback with id",
              t,
            ),
            this.stateChangeEmitters.set(t, r),
            (async () => {
              await this.initializePromise,
                await this._acquireLock(-1, async () => {
                  this._emitInitialSession(t);
                });
            })(),
            { data: { subscription: r } }
          );
        }
        async _emitInitialSession(e) {
          return await this._useSession(async (t) => {
            var r, n;
            try {
              let {
                data: { session: n },
                error: i,
              } = t;
              if (i) throw i;
              await (null == (r = this.stateChangeEmitters.get(e))
                ? void 0
                : r.callback("INITIAL_SESSION", n)),
                this._debug("INITIAL_SESSION", "callback id", e, "session", n);
            } catch (t) {
              await (null == (n = this.stateChangeEmitters.get(e))
                ? void 0
                : n.callback("INITIAL_SESSION", null)),
                this._debug("INITIAL_SESSION", "callback id", e, "error", t),
                console.error(t);
            }
          });
        }
        async resetPasswordForEmail(e, t = {}) {
          let r = null,
            n = null;
          "pkce" === this.flowType &&
            ([r, n] = await rW(this.storage, this.storageKey, !0));
          try {
            return await r1(this.fetch, "POST", `${this.url}/recover`, {
              body: {
                email: e,
                code_challenge: r,
                code_challenge_method: n,
                gotrue_meta_security: { captcha_token: t.captchaToken },
              },
              headers: this.headers,
              redirectTo: t.redirectTo,
            });
          } catch (e) {
            if (rf(e)) return { data: null, error: e };
            throw e;
          }
        }
        async getUserIdentities() {
          var e;
          try {
            let { data: t, error: r } = await this.getUser();
            if (r) throw r;
            return {
              data: { identities: null != (e = t.user.identities) ? e : [] },
              error: null,
            };
          } catch (e) {
            if (rf(e)) return { data: null, error: e };
            throw e;
          }
        }
        async linkIdentity(e) {
          var t;
          try {
            let { data: r, error: n } = await this._useSession(async (t) => {
              var r, n, i, s, a;
              let { data: o, error: l } = t;
              if (l) throw l;
              let u = await this._getUrlForProvider(
                `${this.url}/user/identities/authorize`,
                e.provider,
                {
                  redirectTo: null == (r = e.options) ? void 0 : r.redirectTo,
                  scopes: null == (n = e.options) ? void 0 : n.scopes,
                  queryParams: null == (i = e.options) ? void 0 : i.queryParams,
                  skipBrowserRedirect: !0,
                },
              );
              return await r1(this.fetch, "GET", u, {
                headers: this.headers,
                jwt:
                  null !=
                  (a = null == (s = o.session) ? void 0 : s.access_token)
                    ? a
                    : void 0,
              });
            });
            if (n) throw n;
            return (
              !rI() ||
                (null == (t = e.options) ? void 0 : t.skipBrowserRedirect) ||
                window.location.assign(null == r ? void 0 : r.url),
              {
                data: { provider: e.provider, url: null == r ? void 0 : r.url },
                error: null,
              }
            );
          } catch (t) {
            if (rf(t))
              return { data: { provider: e.provider, url: null }, error: t };
            throw t;
          }
        }
        async unlinkIdentity(e) {
          try {
            return await this._useSession(async (t) => {
              var r, n;
              let { data: i, error: s } = t;
              if (s) throw s;
              return await r1(
                this.fetch,
                "DELETE",
                `${this.url}/user/identities/${e.identity_id}`,
                {
                  headers: this.headers,
                  jwt:
                    null !=
                    (n = null == (r = i.session) ? void 0 : r.access_token)
                      ? n
                      : void 0,
                },
              );
            });
          } catch (e) {
            if (rf(e)) return { data: null, error: e };
            throw e;
          }
        }
        async _refreshAccessToken(e) {
          let t = `#_refreshAccessToken(${e.substring(0, 5)}...)`;
          this._debug(t, "begin");
          try {
            var r, n;
            let i = Date.now();
            return await ((r = async (r) => (
              r > 0 && (await rG(200 * Math.pow(2, r - 1))),
              this._debug(t, "refreshing attempt", r),
              await r1(
                this.fetch,
                "POST",
                `${this.url}/token?grant_type=refresh_token`,
                {
                  body: { refresh_token: e },
                  headers: this.headers,
                  xform: r3,
                },
              )
            )),
            (n = (e, t) => {
              let r = 200 * Math.pow(2, e);
              return t && rE(t) && Date.now() + r - i < 3e4;
            }),
            new Promise((e, t) => {
              (async () => {
                for (let i = 0; i < 1 / 0; i++)
                  try {
                    let t = await r(i);
                    if (!n(i, null, t)) return void e(t);
                  } catch (e) {
                    if (!n(i, e)) return void t(e);
                  }
              })();
            }));
          } catch (e) {
            if ((this._debug(t, "error", e), rf(e)))
              return { data: { session: null, user: null }, error: e };
            throw e;
          } finally {
            this._debug(t, "end");
          }
        }
        _isValidSession(e) {
          return (
            "object" == typeof e &&
            null !== e &&
            "access_token" in e &&
            "refresh_token" in e &&
            "expires_at" in e
          );
        }
        async _handleProviderSignIn(e, t) {
          let r = await this._getUrlForProvider(`${this.url}/authorize`, e, {
            redirectTo: t.redirectTo,
            scopes: t.scopes,
            queryParams: t.queryParams,
          });
          return (
            this._debug(
              "#_handleProviderSignIn()",
              "provider",
              e,
              "options",
              t,
              "url",
              r,
            ),
            rI() && !t.skipBrowserRedirect && window.location.assign(r),
            { data: { provider: e, url: r }, error: null }
          );
        }
        async _recoverAndRefresh() {
          var e;
          let t = "#_recoverAndRefresh()";
          this._debug(t, "begin");
          try {
            let r = await r$(this.storage, this.storageKey);
            if (
              (this._debug(t, "session from storage", r),
              !this._isValidSession(r))
            ) {
              this._debug(t, "session is not valid"),
                null !== r && (await this._removeSession());
              return;
            }
            let n =
              (null != (e = r.expires_at) ? e : 1 / 0) * 1e3 - Date.now() < 9e4;
            if (
              (this._debug(
                t,
                `session has${n ? "" : " not"} expired with margin of 90000s`,
              ),
              n)
            ) {
              if (this.autoRefreshToken && r.refresh_token) {
                let { error: e } = await this._callRefreshToken(
                  r.refresh_token,
                );
                e &&
                  (console.error(e),
                  rE(e) ||
                    (this._debug(
                      t,
                      "refresh failed with a non-retryable error, removing the session",
                      e,
                    ),
                    await this._removeSession()));
              }
            } else await this._notifyAllSubscribers("SIGNED_IN", r);
          } catch (e) {
            this._debug(t, "error", e), console.error(e);
            return;
          } finally {
            this._debug(t, "end");
          }
        }
        async _callRefreshToken(e) {
          var t, r;
          if (!e) throw new rm();
          if (this.refreshingDeferred) return this.refreshingDeferred.promise;
          let n = `#_callRefreshToken(${e.substring(0, 5)}...)`;
          this._debug(n, "begin");
          try {
            this.refreshingDeferred = new rU();
            let { data: t, error: r } = await this._refreshAccessToken(e);
            if (r) throw r;
            if (!t.session) throw new rm();
            await this._saveSession(t.session),
              await this._notifyAllSubscribers("TOKEN_REFRESHED", t.session);
            let n = { session: t.session, error: null };
            return this.refreshingDeferred.resolve(n), n;
          } catch (e) {
            if ((this._debug(n, "error", e), rf(e))) {
              let r = { session: null, error: e };
              return (
                rE(e) || (await this._removeSession()),
                null == (t = this.refreshingDeferred) || t.resolve(r),
                r
              );
            }
            throw (null == (r = this.refreshingDeferred) || r.reject(e), e);
          } finally {
            (this.refreshingDeferred = null), this._debug(n, "end");
          }
        }
        async _notifyAllSubscribers(e, t, r = !0) {
          let n = `#_notifyAllSubscribers(${e})`;
          this._debug(n, "begin", t, `broadcast = ${r}`);
          try {
            this.broadcastChannel &&
              r &&
              this.broadcastChannel.postMessage({ event: e, session: t });
            let n = [],
              i = Array.from(this.stateChangeEmitters.values()).map(
                async (r) => {
                  try {
                    await r.callback(e, t);
                  } catch (e) {
                    n.push(e);
                  }
                },
              );
            if ((await Promise.all(i), n.length > 0)) {
              for (let e = 0; e < n.length; e += 1) console.error(n[e]);
              throw n[0];
            }
          } finally {
            this._debug(n, "end");
          }
        }
        async _saveSession(e) {
          this._debug("#_saveSession()", e),
            (this.suppressGetSessionWarning = !0),
            await rD(this.storage, this.storageKey, e);
        }
        async _removeSession() {
          this._debug("#_removeSession()"),
            await rq(this.storage, this.storageKey),
            await this._notifyAllSubscribers("SIGNED_OUT", null);
        }
        _removeVisibilityChangedCallback() {
          this._debug("#_removeVisibilityChangedCallback()");
          let e = this.visibilityChangedCallback;
          this.visibilityChangedCallback = null;
          try {
            e &&
              rI() &&
              (null == window ? void 0 : window.removeEventListener) &&
              window.removeEventListener("visibilitychange", e);
          } catch (e) {
            console.error("removing visibilitychange callback failed", e);
          }
        }
        async _startAutoRefresh() {
          await this._stopAutoRefresh(), this._debug("#_startAutoRefresh()");
          let e = setInterval(() => this._autoRefreshTokenTick(), 3e4);
          (this.autoRefreshTicker = e),
            e && "object" == typeof e && "function" == typeof e.unref
              ? e.unref()
              : "undefined" != typeof Deno &&
                "function" == typeof Deno.unrefTimer &&
                Deno.unrefTimer(e),
            setTimeout(async () => {
              await this.initializePromise, await this._autoRefreshTokenTick();
            }, 0);
        }
        async _stopAutoRefresh() {
          this._debug("#_stopAutoRefresh()");
          let e = this.autoRefreshTicker;
          (this.autoRefreshTicker = null), e && clearInterval(e);
        }
        async startAutoRefresh() {
          this._removeVisibilityChangedCallback(),
            await this._startAutoRefresh();
        }
        async stopAutoRefresh() {
          this._removeVisibilityChangedCallback(),
            await this._stopAutoRefresh();
        }
        async _autoRefreshTokenTick() {
          this._debug("#_autoRefreshTokenTick()", "begin");
          try {
            await this._acquireLock(0, async () => {
              try {
                let e = Date.now();
                try {
                  return await this._useSession(async (t) => {
                    let {
                      data: { session: r },
                    } = t;
                    if (!r || !r.refresh_token || !r.expires_at)
                      return void this._debug(
                        "#_autoRefreshTokenTick()",
                        "no session",
                      );
                    let n = Math.floor((1e3 * r.expires_at - e) / 3e4);
                    this._debug(
                      "#_autoRefreshTokenTick()",
                      `access token expires in ${n} ticks, a tick lasts 30000ms, refresh threshold is 3 ticks`,
                    ),
                      n <= 3 && (await this._callRefreshToken(r.refresh_token));
                  });
                } catch (e) {
                  console.error(
                    "Auto refresh tick failed with error. This is likely a transient error.",
                    e,
                  );
                }
              } finally {
                this._debug("#_autoRefreshTokenTick()", "end");
              }
            });
          } catch (e) {
            if (e.isAcquireTimeout || e instanceof ns)
              this._debug("auto refresh token tick lock not available");
            else throw e;
          }
        }
        async _handleVisibilityChange() {
          if (
            (this._debug("#_handleVisibilityChange()"),
            !rI() || !(null == window ? void 0 : window.addEventListener))
          )
            return this.autoRefreshToken && this.startAutoRefresh(), !1;
          try {
            (this.visibilityChangedCallback = async () =>
              await this._onVisibilityChanged(!1)),
              null == window ||
                window.addEventListener(
                  "visibilitychange",
                  this.visibilityChangedCallback,
                ),
              await this._onVisibilityChanged(!0);
          } catch (e) {
            console.error("_handleVisibilityChange", e);
          }
        }
        async _onVisibilityChanged(e) {
          let t = `#_onVisibilityChanged(${e})`;
          this._debug(t, "visibilityState", document.visibilityState),
            "visible" === document.visibilityState
              ? (this.autoRefreshToken && this._startAutoRefresh(),
                e ||
                  (await this.initializePromise,
                  await this._acquireLock(-1, async () => {
                    if ("visible" !== document.visibilityState)
                      return void this._debug(
                        t,
                        "acquired the lock to recover the session, but the browser visibilityState is no longer visible, aborting",
                      );
                    await this._recoverAndRefresh();
                  })))
              : "hidden" === document.visibilityState &&
                this.autoRefreshToken &&
                this._stopAutoRefresh();
        }
        async _getUrlForProvider(e, t, r) {
          let n = [`provider=${encodeURIComponent(t)}`];
          if (
            ((null == r ? void 0 : r.redirectTo) &&
              n.push(`redirect_to=${encodeURIComponent(r.redirectTo)}`),
            (null == r ? void 0 : r.scopes) &&
              n.push(`scopes=${encodeURIComponent(r.scopes)}`),
            "pkce" === this.flowType)
          ) {
            let [e, t] = await rW(this.storage, this.storageKey),
              r = new URLSearchParams({
                code_challenge: `${encodeURIComponent(e)}`,
                code_challenge_method: `${encodeURIComponent(t)}`,
              });
            n.push(r.toString());
          }
          if (null == r ? void 0 : r.queryParams) {
            let e = new URLSearchParams(r.queryParams);
            n.push(e.toString());
          }
          return (
            (null == r ? void 0 : r.skipBrowserRedirect) &&
              n.push(`skip_http_redirect=${r.skipBrowserRedirect}`),
            `${e}?${n.join("&")}`
          );
        }
        async _unenroll(e) {
          try {
            return await this._useSession(async (t) => {
              var r;
              let { data: n, error: i } = t;
              return i
                ? { data: null, error: i }
                : await r1(
                    this.fetch,
                    "DELETE",
                    `${this.url}/factors/${e.factorId}`,
                    {
                      headers: this.headers,
                      jwt:
                        null == (r = null == n ? void 0 : n.session)
                          ? void 0
                          : r.access_token,
                    },
                  );
            });
          } catch (e) {
            if (rf(e)) return { data: null, error: e };
            throw e;
          }
        }
        async _enroll(e) {
          try {
            return await this._useSession(async (t) => {
              var r, n;
              let { data: i, error: s } = t;
              if (s) return { data: null, error: s };
              let a = Object.assign(
                  { friendly_name: e.friendlyName, factor_type: e.factorType },
                  "phone" === e.factorType
                    ? { phone: e.phone }
                    : { issuer: e.issuer },
                ),
                { data: o, error: l } = await r1(
                  this.fetch,
                  "POST",
                  `${this.url}/factors`,
                  {
                    body: a,
                    headers: this.headers,
                    jwt:
                      null == (r = null == i ? void 0 : i.session)
                        ? void 0
                        : r.access_token,
                  },
                );
              return l
                ? { data: null, error: l }
                : ("totp" === e.factorType &&
                    (null == (n = null == o ? void 0 : o.totp)
                      ? void 0
                      : n.qr_code) &&
                    (o.totp.qr_code = `data:image/svg+xml;utf-8,${o.totp.qr_code}`),
                  { data: o, error: null });
            });
          } catch (e) {
            if (rf(e)) return { data: null, error: e };
            throw e;
          }
        }
        async _verify(e) {
          return this._acquireLock(-1, async () => {
            try {
              return await this._useSession(async (t) => {
                var r;
                let { data: n, error: i } = t;
                if (i) return { data: null, error: i };
                let { data: s, error: a } = await r1(
                  this.fetch,
                  "POST",
                  `${this.url}/factors/${e.factorId}/verify`,
                  {
                    body: { code: e.code, challenge_id: e.challengeId },
                    headers: this.headers,
                    jwt:
                      null == (r = null == n ? void 0 : n.session)
                        ? void 0
                        : r.access_token,
                  },
                );
                return a
                  ? { data: null, error: a }
                  : (await this._saveSession(
                      Object.assign(
                        {
                          expires_at:
                            Math.round(Date.now() / 1e3) + s.expires_in,
                        },
                        s,
                      ),
                    ),
                    await this._notifyAllSubscribers(
                      "MFA_CHALLENGE_VERIFIED",
                      s,
                    ),
                    { data: s, error: a });
              });
            } catch (e) {
              if (rf(e)) return { data: null, error: e };
              throw e;
            }
          });
        }
        async _challenge(e) {
          return this._acquireLock(-1, async () => {
            try {
              return await this._useSession(async (t) => {
                var r;
                let { data: n, error: i } = t;
                return i
                  ? { data: null, error: i }
                  : await r1(
                      this.fetch,
                      "POST",
                      `${this.url}/factors/${e.factorId}/challenge`,
                      {
                        body: { channel: e.channel },
                        headers: this.headers,
                        jwt:
                          null == (r = null == n ? void 0 : n.session)
                            ? void 0
                            : r.access_token,
                      },
                    );
              });
            } catch (e) {
              if (rf(e)) return { data: null, error: e };
              throw e;
            }
          });
        }
        async _challengeAndVerify(e) {
          let { data: t, error: r } = await this._challenge({
            factorId: e.factorId,
          });
          return r
            ? { data: null, error: r }
            : await this._verify({
                factorId: e.factorId,
                challengeId: t.id,
                code: e.code,
              });
        }
        async _listFactors() {
          let {
            data: { user: e },
            error: t,
          } = await this.getUser();
          if (t) return { data: null, error: t };
          let r = (null == e ? void 0 : e.factors) || [],
            n = r.filter(
              (e) => "totp" === e.factor_type && "verified" === e.status,
            ),
            i = r.filter(
              (e) => "phone" === e.factor_type && "verified" === e.status,
            );
          return { data: { all: r, totp: n, phone: i }, error: null };
        }
        async _getAuthenticatorAssuranceLevel() {
          return this._acquireLock(
            -1,
            async () =>
              await this._useSession(async (e) => {
                var t, r;
                let {
                  data: { session: n },
                  error: i,
                } = e;
                if (i) return { data: null, error: i };
                if (!n)
                  return {
                    data: {
                      currentLevel: null,
                      nextLevel: null,
                      currentAuthenticationMethods: [],
                    },
                    error: null,
                  };
                let { payload: s } = rB(n.access_token),
                  a = null;
                s.aal && (a = s.aal);
                let o = a;
                return (
                  (null !=
                  (r =
                    null == (t = n.user.factors)
                      ? void 0
                      : t.filter((e) => "verified" === e.status))
                    ? r
                    : []
                  ).length > 0 && (o = "aal2"),
                  {
                    data: {
                      currentLevel: a,
                      nextLevel: o,
                      currentAuthenticationMethods: s.amr || [],
                    },
                    error: null,
                  }
                );
              }),
          );
        }
        async fetchJwk(e, t = { keys: [] }) {
          let r = t.keys.find((t) => t.kid === e);
          if (
            r ||
            ((r = this.jwks.keys.find((t) => t.kid === e)) &&
              this.jwks_cached_at + 6e5 > Date.now())
          )
            return r;
          let { data: n, error: i } = await r1(
            this.fetch,
            "GET",
            `${this.url}/.well-known/jwks.json`,
            { headers: this.headers },
          );
          if (i) throw i;
          if (!n.keys || 0 === n.keys.length) throw new rx("JWKS is empty");
          if (
            ((this.jwks = n),
            (this.jwks_cached_at = Date.now()),
            !(r = n.keys.find((t) => t.kid === e)))
          )
            throw new rx("No matching signing key found in JWKS");
          return r;
        }
        async getClaims(e, t = { keys: [] }) {
          try {
            let n = e;
            if (!n) {
              let { data: e, error: t } = await this.getSession();
              if (t || !e.session) return { data: null, error: t };
              n = e.session.access_token;
            }
            let {
              header: i,
              payload: s,
              signature: a,
              raw: { header: o, payload: l },
            } = rB(n);
            var r = s.exp;
            if (!r) throw Error("Missing exp claim");
            if (r <= Math.floor(Date.now() / 1e3))
              throw Error("JWT has expired");
            if (
              !i.kid ||
              "HS256" === i.alg ||
              !("crypto" in globalThis && "subtle" in globalThis.crypto)
            ) {
              let { error: e } = await this.getUser(n);
              if (e) throw e;
              return {
                data: { claims: s, header: i, signature: a },
                error: null,
              };
            }
            let u = (function (e) {
                switch (e) {
                  case "RS256":
                    return {
                      name: "RSASSA-PKCS1-v1_5",
                      hash: { name: "SHA-256" },
                    };
                  case "ES256":
                    return {
                      name: "ECDSA",
                      namedCurve: "P-256",
                      hash: { name: "SHA-256" },
                    };
                  default:
                    throw Error("Invalid alg claim");
                }
              })(i.alg),
              c = await this.fetchJwk(i.kid, t),
              d = await crypto.subtle.importKey("jwk", c, u, !0, ["verify"]);
            if (
              !(await crypto.subtle.verify(
                u,
                d,
                a,
                (function (e) {
                  let t = [];
                  return (
                    (function (e, t) {
                      for (let r = 0; r < e.length; r += 1) {
                        let n = e.charCodeAt(r);
                        if (n > 55295 && n <= 56319) {
                          let t = ((n - 55296) * 1024) & 65535;
                          (n =
                            (((e.charCodeAt(r + 1) - 56320) & 65535) | t) +
                            65536),
                            (r += 1);
                        }
                        !(function (e, t) {
                          if (e <= 127) return t(e);
                          if (e <= 2047) {
                            t(192 | (e >> 6)), t(128 | (63 & e));
                            return;
                          }
                          if (e <= 65535) {
                            t(224 | (e >> 12)),
                              t(128 | ((e >> 6) & 63)),
                              t(128 | (63 & e));
                            return;
                          }
                          if (e <= 1114111) {
                            t(240 | (e >> 18)),
                              t(128 | ((e >> 12) & 63)),
                              t(128 | ((e >> 6) & 63)),
                              t(128 | (63 & e));
                            return;
                          }
                          throw Error(
                            `Unrecognized Unicode codepoint: ${e.toString(16)}`,
                          );
                        })(n, t);
                      }
                    })(e, (e) => t.push(e)),
                    new Uint8Array(t)
                  );
                })(`${o}.${l}`),
              ))
            )
              throw new rx("Invalid JWT signature");
            return {
              data: { claims: s, header: i, signature: a },
              error: null,
            };
          } catch (e) {
            if (rf(e)) return { data: null, error: e };
            throw e;
          }
        }
      }
      nc.nextInstanceID = 0;
      let nd = nc;
      class nh extends nd {
        constructor(e) {
          super(e);
        }
      }
      class nf {
        constructor(e, t, r) {
          var n, i, s;
          if (((this.supabaseUrl = e), (this.supabaseKey = t), !e))
            throw Error("supabaseUrl is required.");
          if (!t) throw Error("supabaseKey is required.");
          let a = new URL(
            (function (e) {
              return e.endsWith("/") ? e : e + "/";
            })(e),
          );
          (this.realtimeUrl = new URL("realtime/v1", a)),
            (this.realtimeUrl.protocol = this.realtimeUrl.protocol.replace(
              "http",
              "ws",
            )),
            (this.authUrl = new URL("auth/v1", a)),
            (this.storageUrl = new URL("storage/v1", a)),
            (this.functionsUrl = new URL("functions/v1", a));
          let o = `sb-${a.hostname.split(".")[0]}-auth-token`,
            l = (function (e, t) {
              var r, n;
              let { db: i, auth: s, realtime: a, global: o } = e,
                { db: l, auth: u, realtime: c, global: d } = t,
                h = {
                  db: Object.assign(Object.assign({}, l), i),
                  auth: Object.assign(Object.assign({}, u), s),
                  realtime: Object.assign(Object.assign({}, c), a),
                  global: Object.assign(
                    Object.assign(Object.assign({}, d), o),
                    {
                      headers: Object.assign(
                        Object.assign(
                          {},
                          null != (r = null == d ? void 0 : d.headers) ? r : {},
                        ),
                        null != (n = null == o ? void 0 : o.headers) ? n : {},
                      ),
                    },
                  ),
                  accessToken: () => {
                    var e, t, r, n;
                    return (
                      (e = this),
                      (t = void 0),
                      (n = function* () {
                        return "";
                      }),
                      new ((r = void 0), (r = Promise))(function (i, s) {
                        function a(e) {
                          try {
                            l(n.next(e));
                          } catch (e) {
                            s(e);
                          }
                        }
                        function o(e) {
                          try {
                            l(n.throw(e));
                          } catch (e) {
                            s(e);
                          }
                        }
                        function l(e) {
                          var t;
                          e.done
                            ? i(e.value)
                            : ((t = e.value) instanceof r
                                ? t
                                : new r(function (e) {
                                    e(t);
                                  })
                              ).then(a, o);
                        }
                        l((n = n.apply(e, t || [])).next());
                      })
                    );
                  },
                };
              return (
                e.accessToken
                  ? (h.accessToken = e.accessToken)
                  : delete h.accessToken,
                h
              );
            })(null != r ? r : {}, {
              db: re,
              realtime: rr,
              auth: Object.assign(Object.assign({}, rt), { storageKey: o }),
              global: t7,
            });
          (this.storageKey = null != (n = l.auth.storageKey) ? n : ""),
            (this.headers = null != (i = l.global.headers) ? i : {}),
            l.accessToken
              ? ((this.accessToken = l.accessToken),
                (this.auth = new Proxy(
                  {},
                  {
                    get: (e, t) => {
                      throw Error(
                        `@supabase/supabase-js: Supabase Client is configured with the accessToken option, accessing supabase.auth.${String(t)} is not possible`,
                      );
                    },
                  },
                )))
              : (this.auth = this._initSupabaseAuthClient(
                  null != (s = l.auth) ? s : {},
                  this.headers,
                  l.global.fetch,
                )),
            (this.fetch = ra(
              t,
              this._getAccessToken.bind(this),
              l.global.fetch,
            )),
            (this.realtime = this._initRealtimeClient(
              Object.assign(
                {
                  headers: this.headers,
                  accessToken: this._getAccessToken.bind(this),
                },
                l.realtime,
              ),
            )),
            (this.rest = new td(new URL("rest/v1", a).href, {
              headers: this.headers,
              schema: l.db.schema,
              fetch: this.fetch,
            })),
            l.accessToken || this._listenForAuthEvents();
        }
        get functions() {
          return new tc(this.functionsUrl.href, {
            headers: this.headers,
            customFetch: this.fetch,
          });
        }
        get storage() {
          return new t9(this.storageUrl.href, this.headers, this.fetch);
        }
        from(e) {
          return this.rest.from(e);
        }
        schema(e) {
          return this.rest.schema(e);
        }
        rpc(e, t = {}, r = {}) {
          return this.rest.rpc(e, t, r);
        }
        channel(e, t = { config: {} }) {
          return this.realtime.channel(e, t);
        }
        getChannels() {
          return this.realtime.getChannels();
        }
        removeChannel(e) {
          return this.realtime.removeChannel(e);
        }
        removeAllChannels() {
          return this.realtime.removeAllChannels();
        }
        _getAccessToken() {
          var e, t, r, n, i, s;
          return (
            (r = this),
            (n = void 0),
            (i = void 0),
            (s = function* () {
              if (this.accessToken) return yield this.accessToken();
              let { data: r } = yield this.auth.getSession();
              return null !=
                (t = null == (e = r.session) ? void 0 : e.access_token)
                ? t
                : null;
            }),
            new (i || (i = Promise))(function (e, t) {
              function a(e) {
                try {
                  l(s.next(e));
                } catch (e) {
                  t(e);
                }
              }
              function o(e) {
                try {
                  l(s.throw(e));
                } catch (e) {
                  t(e);
                }
              }
              function l(t) {
                var r;
                t.done
                  ? e(t.value)
                  : ((r = t.value) instanceof i
                      ? r
                      : new i(function (e) {
                          e(r);
                        })
                    ).then(a, o);
              }
              l((s = s.apply(r, n || [])).next());
            })
          );
        }
        _initSupabaseAuthClient(
          {
            autoRefreshToken: e,
            persistSession: t,
            detectSessionInUrl: r,
            storage: n,
            storageKey: i,
            flowType: s,
            lock: a,
            debug: o,
          },
          l,
          u,
        ) {
          let c = {
            Authorization: `Bearer ${this.supabaseKey}`,
            apikey: `${this.supabaseKey}`,
          };
          return new nh({
            url: this.authUrl.href,
            headers: Object.assign(Object.assign({}, c), l),
            storageKey: i,
            autoRefreshToken: e,
            persistSession: t,
            detectSessionInUrl: r,
            storage: n,
            flowType: s,
            lock: a,
            debug: o,
            fetch: u,
            hasCustomAuthorizationHeader: "Authorization" in this.headers,
          });
        }
        _initRealtimeClient(e) {
          return new tM(
            this.realtimeUrl.href,
            Object.assign(Object.assign({}, e), {
              params: Object.assign(
                { apikey: this.supabaseKey },
                null == e ? void 0 : e.params,
              ),
            }),
          );
        }
        _listenForAuthEvents() {
          return this.auth.onAuthStateChange((e, t) => {
            this._handleTokenChanged(
              e,
              "CLIENT",
              null == t ? void 0 : t.access_token,
            );
          });
        }
        _handleTokenChanged(e, t, r) {
          ("TOKEN_REFRESHED" === e || "SIGNED_IN" === e) &&
          this.changedAccessToken !== r
            ? (this.changedAccessToken = r)
            : "SIGNED_OUT" === e &&
              (this.realtime.setAuth(),
              "STORAGE" == t && this.auth.signOut(),
              (this.changedAccessToken = void 0));
        }
      }
      let np = (e, t, r) => new nf(e, t, r);
      function n_(e, t, r) {
        if (!e || !t)
          throw Error(`Your project's URL and Key are required to create a Supabase client!

Check your Supabase project's API settings to find these values

https://supabase.com/dashboard/project/_/settings/api`);
        let {
            storage: n,
            getAll: i,
            setAll: s,
            setItems: a,
            removedItems: o,
          } = (function (e, t) {
            let r,
              n,
              i = e.cookies ?? null,
              s = e.cookieEncoding,
              a = {},
              o = {};
            if (i)
              if ("get" in i) {
                let e = async (e) => {
                  let t = e.flatMap((e) => [
                      e,
                      ...Array.from({ length: 5 }).map((t, r) => `${e}.${r}`),
                    ]),
                    r = [];
                  for (let e = 0; e < t.length; e += 1) {
                    let n = await i.get(t[e]);
                    (n || "string" == typeof n) &&
                      r.push({ name: t[e], value: n });
                  }
                  return r;
                };
                if (
                  ((r = async (t) => await e(t)), "set" in i && "remove" in i)
                )
                  n = async (e) => {
                    for (let t = 0; t < e.length; t += 1) {
                      let { name: r, value: n, options: s } = e[t];
                      n ? await i.set(r, n, s) : await i.remove(r, s);
                    }
                  };
                else if (t)
                  n = async () => {
                    console.warn(
                      "@supabase/ssr: createServerClient was configured without set and remove cookie methods, but the client needs to set cookies. This can lead to issues such as random logouts, early session termination or increased token refresh requests. If in NextJS, check your middleware.ts file, route handlers and server actions for correctness. Consider switching to the getAll and setAll cookie methods instead of get, set and remove which are deprecated and can be difficult to use correctly.",
                    );
                  };
                else
                  throw Error(
                    "@supabase/ssr: createBrowserClient requires configuring a getAll and setAll cookie method (deprecated: alternatively both get, set and remove can be used)",
                  );
              } else if ("getAll" in i)
                if (((r = async () => await i.getAll()), "setAll" in i))
                  n = i.setAll;
                else if (t)
                  n = async () => {
                    console.warn(
                      "@supabase/ssr: createServerClient was configured without the setAll cookie method, but the client needs to set cookies. This can lead to issues such as random logouts, early session termination or increased token refresh requests. If in NextJS, check your middleware.ts file, route handlers and server actions for correctness.",
                    );
                  };
                else
                  throw Error(
                    "@supabase/ssr: createBrowserClient requires configuring both getAll and setAll cookie methods (deprecated: alternatively both get, set and remove can be used)",
                  );
              else
                throw Error(
                  `@supabase/ssr: ${t ? "createServerClient" : "createBrowserClient"} requires configuring getAll and setAll cookie methods (deprecated: alternatively use get, set and remove).${e2() ? " As this is called in a browser runtime, consider removing the cookies option object to use the document.cookie API automatically." : ""}`,
                );
            else if (!t && e2()) {
              let e = () => {
                let e = (0, e1.q)(document.cookie);
                return Object.keys(e).map((t) => ({ name: t, value: e[t] }));
              };
              (r = () => e()),
                (n = (e) => {
                  e.forEach(({ name: e, value: t, options: r }) => {
                    document.cookie = (0, e1.l)(e, t, r);
                  });
                });
            } else if (t)
              throw Error(
                "@supabase/ssr: createServerClient must be initialized with cookie options that specify getAll and setAll functions (deprecated, not recommended: alternatively use get, set and remove)",
              );
            else
              (r = () => []),
                (n = () => {
                  throw Error(
                    "@supabase/ssr: createBrowserClient in non-browser runtimes (including Next.js pre-rendering mode) was not initialized cookie options that specify getAll and setAll functions (deprecated: alternatively use get, set and remove), but they were needed",
                  );
                });
            return t
              ? {
                  getAll: r,
                  setAll: n,
                  setItems: a,
                  removedItems: o,
                  storage: {
                    isServer: !0,
                    getItem: async (e) => {
                      if ("string" == typeof a[e]) return a[e];
                      if (o[e]) return null;
                      let t = await r([e]),
                        n = await e9(e, async (e) => {
                          let r = t?.find(({ name: t }) => t === e) || null;
                          return r ? r.value : null;
                        });
                      if (!n) return null;
                      let i = n;
                      return (
                        "string" == typeof n &&
                          n.startsWith(tn) &&
                          (i = tr(n.substring(tn.length))),
                        i
                      );
                    },
                    setItem: async (t, i) => {
                      t.endsWith("-code-verifier") &&
                        (await ti(
                          {
                            getAll: r,
                            setAll: n,
                            setItems: { [t]: i },
                            removedItems: {},
                          },
                          {
                            cookieOptions: e?.cookieOptions ?? null,
                            cookieEncoding: s,
                          },
                        )),
                        (a[t] = i),
                        delete o[t];
                    },
                    removeItem: async (e) => {
                      delete a[e], (o[e] = !0);
                    },
                  },
                }
              : {
                  getAll: r,
                  setAll: n,
                  setItems: a,
                  removedItems: o,
                  storage: {
                    isServer: !1,
                    getItem: async (e) => {
                      let t = await r([e]),
                        n = await e9(e, async (e) => {
                          let r = t?.find(({ name: t }) => t === e) || null;
                          return r ? r.value : null;
                        });
                      if (!n) return null;
                      let i = n;
                      return (
                        n.startsWith(tn) && (i = tr(n.substring(tn.length))), i
                      );
                    },
                    setItem: async (t, i) => {
                      let a = await r([t]),
                        o = new Set(
                          (a?.map(({ name: e }) => e) || []).filter((e) =>
                            e5(e, t),
                          ),
                        ),
                        l = i;
                      "base64url" === s && (l = tn + tt(i));
                      let u = e6(t, l);
                      u.forEach(({ name: e }) => {
                        o.delete(e);
                      });
                      let c = { ...e3, ...e?.cookieOptions, maxAge: 0 },
                        d = { ...e3, ...e?.cookieOptions, maxAge: e3.maxAge };
                      delete c.name, delete d.name;
                      let h = [
                        ...[...o].map((e) => ({
                          name: e,
                          value: "",
                          options: c,
                        })),
                        ...u.map(({ name: e, value: t }) => ({
                          name: e,
                          value: t,
                          options: d,
                        })),
                      ];
                      h.length > 0 && (await n(h));
                    },
                    removeItem: async (t) => {
                      let i = await r([t]),
                        s = (i?.map(({ name: e }) => e) || []).filter((e) =>
                          e5(e, t),
                        ),
                        a = { ...e3, ...e?.cookieOptions, maxAge: 0 };
                      delete a.name,
                        s.length > 0 &&
                          (await n(
                            s.map((e) => ({ name: e, value: "", options: a })),
                          ));
                    },
                  },
                };
          })({ ...r, cookieEncoding: r?.cookieEncoding ?? "base64url" }, !0),
          l = np(e, t, {
            ...r,
            global: {
              ...r?.global,
              headers: {
                ...r?.global?.headers,
                "X-Client-Info": "supabase-ssr/0.5.2",
              },
            },
            auth: {
              ...(r?.cookieOptions?.name
                ? { storageKey: r.cookieOptions.name }
                : null),
              ...r?.auth,
              flowType: "pkce",
              autoRefreshToken: !1,
              detectSessionInUrl: !1,
              persistSession: !0,
              storage: n,
            },
          });
        return (
          l.auth.onAuthStateChange(async (e) => {
            (Object.keys(a).length > 0 || Object.keys(o).length > 0) &&
              ("SIGNED_IN" === e ||
                "TOKEN_REFRESHED" === e ||
                "USER_UPDATED" === e ||
                "PASSWORD_RECOVERY" === e ||
                "SIGNED_OUT" === e ||
                "MFA_CHALLENGE_VERIFIED" === e) &&
              (await ti(
                { getAll: i, setAll: s, setItems: a, removedItems: o },
                {
                  cookieOptions: r?.cookieOptions ?? null,
                  cookieEncoding: r?.cookieEncoding ?? "base64url",
                },
              ));
          }),
          l
        );
      }
      let ng = {
        en: {
          nativeName: "English",
          englishName: "English",
          direction: "ltr",
          dateFormat: "MM/DD/YYYY",
          flag: "\uD83C\uDDFA\uD83C\uDDF8",
          htmlLang: "en",
          calendar: "gregory",
          number: { decimal: ".", thousands: "," },
        },
        ar: {
          nativeName: "العربية",
          englishName: "Arabic",
          direction: "rtl",
          dateFormat: "DD/MM/YYYY",
          flag: "\uD83C\uDDF8\uD83C\uDDE6",
          htmlLang: "ar",
          calendar: "islamic",
          fontClass: "font-arabic",
          number: { decimal: "٫", thousands: "٬" },
        },
        fr: {
          nativeName: "Fran\xe7ais",
          englishName: "French",
          direction: "ltr",
          dateFormat: "DD/MM/YYYY",
          flag: "\uD83C\uDDEB\uD83C\uDDF7",
          htmlLang: "fr",
          calendar: "gregory",
          number: { decimal: ",", thousands: " " },
        },
        es: {
          nativeName: "Espa\xf1ol",
          englishName: "Spanish",
          direction: "ltr",
          dateFormat: "DD/MM/YYYY",
          flag: "\uD83C\uDDEA\uD83C\uDDF8",
          htmlLang: "es",
          calendar: "gregory",
          number: { decimal: ",", thousands: "." },
        },
      };
      async function nm(e) {
        let t = eQ.NextResponse.next({ request: { headers: e.headers } }),
          r = n_(
            "http://localhost:54321",
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0",
            {
              cookies: {
                get: (t) => e.cookies.get(t)?.value,
                set(r, n, i) {
                  e.cookies.set(r, n),
                    (t = eQ.NextResponse.next({
                      request: { headers: e.headers },
                    })).cookies.set(r, n, i);
                },
                remove(r, n) {
                  e.cookies.set(r, ""),
                    (t = eQ.NextResponse.next({
                      request: { headers: e.headers },
                    })).cookies.set(r, "", { ...n, maxAge: 0 });
                },
              },
            },
          );
        return await r.auth.getUser(), t;
      }
      let ny = "9.30.0",
        nw = globalThis;
      function nv() {
        return nb(nw), nw;
      }
      function nb(e) {
        let t = (e.__SENTRY__ = e.__SENTRY__ || {});
        return (t.version = t.version || ny), (t[ny] = t[ny] || {});
      }
      function nS(e, t, r = nw) {
        let n = (r.__SENTRY__ = r.__SENTRY__ || {}),
          i = (n[ny] = n[ny] || {});
        return i[e] || (i[e] = t());
      }
      function nE(e = nw.crypto || nw.msCrypto) {
        let t = () => 16 * Math.random();
        try {
          if (e?.randomUUID) return e.randomUUID().replace(/-/g, "");
          e?.getRandomValues &&
            (t = () => {
              let t = new Uint8Array(1);
              return e.getRandomValues(t), t[0];
            });
        } catch (e) {}
        return "10000000100040008000100000000000".replace(/[018]/g, (e) =>
          (e ^ ((15 & t()) >> (e / 4))).toString(16),
        );
      }
      function nk() {
        return Date.now() / 1e3;
      }
      let nx = (function () {
          let { performance: e } = nw;
          if (!e?.now) return nk;
          let t = Date.now() - e.now(),
            r = void 0 == e.timeOrigin ? t : e.timeOrigin;
          return () => (r + e.now()) / 1e3;
        })(),
        nT = ["debug", "info", "warn", "error", "log", "assert", "trace"],
        nR = {},
        nC = nS("logger", function () {
          let e = !1,
            t = {
              enable: () => {
                e = !0;
              },
              disable: () => {
                e = !1;
              },
              isEnabled: () => e,
            };
          return (
            nT.forEach((e) => {
              t[e] = () => void 0;
            }),
            t
          );
        });
      function nP(e, t, r) {
        try {
          Object.defineProperty(e, t, {
            value: r,
            writable: !0,
            configurable: !0,
          });
        } catch (e) {}
      }
      let nO = "_sentrySpan";
      function nA(e, t) {
        t ? nP(e, nO, t) : delete e[nO];
      }
      let nI = Object.prototype.toString;
      function nj(e, t) {
        return nI.call(e) === `[object ${t}]`;
      }
      function nL(e) {
        return !!(e?.then && "function" == typeof e.then);
      }
      function nN() {
        return nE().substring(16);
      }
      class nM {
        constructor() {
          (this._notifyingListeners = !1),
            (this._scopeListeners = []),
            (this._eventProcessors = []),
            (this._breadcrumbs = []),
            (this._attachments = []),
            (this._user = {}),
            (this._tags = {}),
            (this._extra = {}),
            (this._contexts = {}),
            (this._sdkProcessingMetadata = {}),
            (this._propagationContext = {
              traceId: nE(),
              sampleRand: Math.random(),
            });
        }
        clone() {
          let e = new nM();
          return (
            (e._breadcrumbs = [...this._breadcrumbs]),
            (e._tags = { ...this._tags }),
            (e._extra = { ...this._extra }),
            (e._contexts = { ...this._contexts }),
            this._contexts.flags &&
              (e._contexts.flags = {
                values: [...this._contexts.flags.values],
              }),
            (e._user = this._user),
            (e._level = this._level),
            (e._session = this._session),
            (e._transactionName = this._transactionName),
            (e._fingerprint = this._fingerprint),
            (e._eventProcessors = [...this._eventProcessors]),
            (e._attachments = [...this._attachments]),
            (e._sdkProcessingMetadata = { ...this._sdkProcessingMetadata }),
            (e._propagationContext = { ...this._propagationContext }),
            (e._client = this._client),
            (e._lastEventId = this._lastEventId),
            nA(e, this[nO]),
            e
          );
        }
        setClient(e) {
          this._client = e;
        }
        setLastEventId(e) {
          this._lastEventId = e;
        }
        getClient() {
          return this._client;
        }
        lastEventId() {
          return this._lastEventId;
        }
        addScopeListener(e) {
          this._scopeListeners.push(e);
        }
        addEventProcessor(e) {
          return this._eventProcessors.push(e), this;
        }
        setUser(e) {
          return (
            (this._user = e || {
              email: void 0,
              id: void 0,
              ip_address: void 0,
              username: void 0,
            }),
            this._session &&
              (function (e, t = {}) {
                if (
                  (t.user &&
                    (!e.ipAddress &&
                      t.user.ip_address &&
                      (e.ipAddress = t.user.ip_address),
                    e.did ||
                      t.did ||
                      (e.did = t.user.id || t.user.email || t.user.username)),
                  (e.timestamp = t.timestamp || nx()),
                  t.abnormal_mechanism &&
                    (e.abnormal_mechanism = t.abnormal_mechanism),
                  t.ignoreDuration && (e.ignoreDuration = t.ignoreDuration),
                  t.sid && (e.sid = 32 === t.sid.length ? t.sid : nE()),
                  void 0 !== t.init && (e.init = t.init),
                  !e.did && t.did && (e.did = `${t.did}`),
                  "number" == typeof t.started && (e.started = t.started),
                  e.ignoreDuration)
                )
                  e.duration = void 0;
                else if ("number" == typeof t.duration) e.duration = t.duration;
                else {
                  let t = e.timestamp - e.started;
                  e.duration = t >= 0 ? t : 0;
                }
                t.release && (e.release = t.release),
                  t.environment && (e.environment = t.environment),
                  !e.ipAddress && t.ipAddress && (e.ipAddress = t.ipAddress),
                  !e.userAgent && t.userAgent && (e.userAgent = t.userAgent),
                  "number" == typeof t.errors && (e.errors = t.errors),
                  t.status && (e.status = t.status);
              })(this._session, { user: e }),
            this._notifyScopeListeners(),
            this
          );
        }
        getUser() {
          return this._user;
        }
        setTags(e) {
          return (
            (this._tags = { ...this._tags, ...e }),
            this._notifyScopeListeners(),
            this
          );
        }
        setTag(e, t) {
          return (
            (this._tags = { ...this._tags, [e]: t }),
            this._notifyScopeListeners(),
            this
          );
        }
        setExtras(e) {
          return (
            (this._extra = { ...this._extra, ...e }),
            this._notifyScopeListeners(),
            this
          );
        }
        setExtra(e, t) {
          return (
            (this._extra = { ...this._extra, [e]: t }),
            this._notifyScopeListeners(),
            this
          );
        }
        setFingerprint(e) {
          return (this._fingerprint = e), this._notifyScopeListeners(), this;
        }
        setLevel(e) {
          return (this._level = e), this._notifyScopeListeners(), this;
        }
        setTransactionName(e) {
          return (
            (this._transactionName = e), this._notifyScopeListeners(), this
          );
        }
        setContext(e, t) {
          return (
            null === t ? delete this._contexts[e] : (this._contexts[e] = t),
            this._notifyScopeListeners(),
            this
          );
        }
        setSession(e) {
          return (
            e ? (this._session = e) : delete this._session,
            this._notifyScopeListeners(),
            this
          );
        }
        getSession() {
          return this._session;
        }
        update(e) {
          if (!e) return this;
          let t = "function" == typeof e ? e(this) : e,
            {
              tags: r,
              extra: n,
              user: i,
              contexts: s,
              level: a,
              fingerprint: o = [],
              propagationContext: l,
            } = (t instanceof nM
              ? t.getScopeData()
              : nj(t, "Object")
                ? e
                : void 0) || {};
          return (
            (this._tags = { ...this._tags, ...r }),
            (this._extra = { ...this._extra, ...n }),
            (this._contexts = { ...this._contexts, ...s }),
            i && Object.keys(i).length && (this._user = i),
            a && (this._level = a),
            o.length && (this._fingerprint = o),
            l && (this._propagationContext = l),
            this
          );
        }
        clear() {
          return (
            (this._breadcrumbs = []),
            (this._tags = {}),
            (this._extra = {}),
            (this._user = {}),
            (this._contexts = {}),
            (this._level = void 0),
            (this._transactionName = void 0),
            (this._fingerprint = void 0),
            (this._session = void 0),
            nA(this, void 0),
            (this._attachments = []),
            this.setPropagationContext({
              traceId: nE(),
              sampleRand: Math.random(),
            }),
            this._notifyScopeListeners(),
            this
          );
        }
        addBreadcrumb(e, t) {
          let r = "number" == typeof t ? t : 100;
          if (r <= 0) return this;
          let n = {
            timestamp: nk(),
            ...e,
            message: e.message
              ? (function (e, t = 0) {
                  return "string" != typeof e || 0 === t || e.length <= t
                    ? e
                    : `${e.slice(0, t)}...`;
                })(e.message, 2048)
              : e.message,
          };
          return (
            this._breadcrumbs.push(n),
            this._breadcrumbs.length > r &&
              ((this._breadcrumbs = this._breadcrumbs.slice(-r)),
              this._client?.recordDroppedEvent("buffer_overflow", "log_item")),
            this._notifyScopeListeners(),
            this
          );
        }
        getLastBreadcrumb() {
          return this._breadcrumbs[this._breadcrumbs.length - 1];
        }
        clearBreadcrumbs() {
          return (this._breadcrumbs = []), this._notifyScopeListeners(), this;
        }
        addAttachment(e) {
          return this._attachments.push(e), this;
        }
        clearAttachments() {
          return (this._attachments = []), this;
        }
        getScopeData() {
          return {
            breadcrumbs: this._breadcrumbs,
            attachments: this._attachments,
            contexts: this._contexts,
            tags: this._tags,
            extra: this._extra,
            user: this._user,
            level: this._level,
            fingerprint: this._fingerprint || [],
            eventProcessors: this._eventProcessors,
            propagationContext: this._propagationContext,
            sdkProcessingMetadata: this._sdkProcessingMetadata,
            transactionName: this._transactionName,
            span: this[nO],
          };
        }
        setSDKProcessingMetadata(e) {
          return (
            (this._sdkProcessingMetadata = (function e(t, r, n = 2) {
              if (!r || "object" != typeof r || n <= 0) return r;
              if (t && 0 === Object.keys(r).length) return t;
              let i = { ...t };
              for (let t in r)
                Object.prototype.hasOwnProperty.call(r, t) &&
                  (i[t] = e(i[t], r[t], n - 1));
              return i;
            })(this._sdkProcessingMetadata, e, 2)),
            this
          );
        }
        setPropagationContext(e) {
          return (this._propagationContext = e), this;
        }
        getPropagationContext() {
          return this._propagationContext;
        }
        captureException(e, t) {
          let r = t?.event_id || nE();
          if (!this._client)
            return (
              nC.warn(
                "No client configured on scope - will not capture exception!",
              ),
              r
            );
          let n = Error("Sentry syntheticException");
          return (
            this._client.captureException(
              e,
              {
                originalException: e,
                syntheticException: n,
                ...t,
                event_id: r,
              },
              this,
            ),
            r
          );
        }
        captureMessage(e, t, r) {
          let n = r?.event_id || nE();
          if (!this._client)
            return (
              nC.warn(
                "No client configured on scope - will not capture message!",
              ),
              n
            );
          let i = Error(e);
          return (
            this._client.captureMessage(
              e,
              t,
              {
                originalException: e,
                syntheticException: i,
                ...r,
                event_id: n,
              },
              this,
            ),
            n
          );
        }
        captureEvent(e, t) {
          let r = t?.event_id || nE();
          return (
            this._client
              ? this._client.captureEvent(e, { ...t, event_id: r }, this)
              : nC.warn(
                  "No client configured on scope - will not capture event!",
                ),
            r
          );
        }
        _notifyScopeListeners() {
          this._notifyingListeners ||
            ((this._notifyingListeners = !0),
            this._scopeListeners.forEach((e) => {
              e(this);
            }),
            (this._notifyingListeners = !1));
        }
      }
      class nD {
        constructor(e, t) {
          let r, n;
          (r = e || new nM()),
            (n = t || new nM()),
            (this._stack = [{ scope: r }]),
            (this._isolationScope = n);
        }
        withScope(e) {
          let t,
            r = this._pushScope();
          try {
            t = e(r);
          } catch (e) {
            throw (this._popScope(), e);
          }
          return nL(t)
            ? t.then(
                (e) => (this._popScope(), e),
                (e) => {
                  throw (this._popScope(), e);
                },
              )
            : (this._popScope(), t);
        }
        getClient() {
          return this.getStackTop().client;
        }
        getScope() {
          return this.getStackTop().scope;
        }
        getIsolationScope() {
          return this._isolationScope;
        }
        getStackTop() {
          return this._stack[this._stack.length - 1];
        }
        _pushScope() {
          let e = this.getScope().clone();
          return this._stack.push({ client: this.getClient(), scope: e }), e;
        }
        _popScope() {
          return !(this._stack.length <= 1) && !!this._stack.pop();
        }
      }
      function n$() {
        let e = nb(nv());
        return (e.stack =
          e.stack ||
          new nD(
            nS("defaultCurrentScope", () => new nM()),
            nS("defaultIsolationScope", () => new nM()),
          ));
      }
      function nq(e) {
        return n$().withScope(e);
      }
      function nU(e, t) {
        let r = n$();
        return r.withScope(() => ((r.getStackTop().scope = e), t(e)));
      }
      function nB(e) {
        return n$().withScope(() => e(n$().getIsolationScope()));
      }
      function nG(e) {
        let t = nb(e);
        return t.acs
          ? t.acs
          : {
              withIsolationScope: nB,
              withScope: nq,
              withSetScope: nU,
              withSetIsolationScope: (e, t) => nB(t),
              getCurrentScope: () => n$().getScope(),
              getIsolationScope: () => n$().getIsolationScope(),
            };
      }
      function nz() {
        return nG(nv()).getCurrentScope();
      }
      function nH(...e) {
        let t = nG(nv());
        if (2 === e.length) {
          let [r, n] = e;
          return r ? t.withSetScope(r, n) : t.withScope(n);
        }
        return t.withScope(e[0]);
      }
      function nF() {
        return nz().getClient();
      }
      let nW = "sentry.source",
        nK = "sentry.sample_rate",
        nV = "sentry.op",
        nJ = "sentry.origin",
        nX = "sentry.custom_span_name",
        nY = !1;
      function nZ(e) {
        return e && e.length > 0
          ? e.map(
              ({
                context: { spanId: e, traceId: t, traceFlags: r, ...n },
                attributes: i,
              }) => ({
                span_id: e,
                trace_id: t,
                sampled: 1 === r,
                attributes: i,
                ...n,
              }),
            )
          : void 0;
      }
      function nQ(e) {
        return "number" == typeof e
          ? n0(e)
          : Array.isArray(e)
            ? e[0] + e[1] / 1e9
            : e instanceof Date
              ? n0(e.getTime())
              : nx();
      }
      function n0(e) {
        return e > 0x2540be3ff ? e / 1e3 : e;
      }
      function n1(e) {
        var t;
        if ("function" == typeof e.getSpanJSON) return e.getSpanJSON();
        let { spanId: r, traceId: n } = e.spanContext();
        if (
          (t = e).attributes &&
          t.startTime &&
          t.name &&
          t.endTime &&
          t.status
        ) {
          let {
            attributes: t,
            startTime: i,
            name: s,
            endTime: a,
            status: o,
            links: l,
          } = e;
          return {
            span_id: r,
            trace_id: n,
            data: t,
            description: s,
            parent_span_id:
              "parentSpanId" in e
                ? e.parentSpanId
                : "parentSpanContext" in e
                  ? e.parentSpanContext?.spanId
                  : void 0,
            start_timestamp: nQ(i),
            timestamp: nQ(a) || void 0,
            status: n3(o),
            op: t[nV],
            origin: t[nJ],
            links: nZ(l),
          };
        }
        return { span_id: r, trace_id: n, start_timestamp: 0, data: {} };
      }
      function n2(e) {
        let { traceFlags: t } = e.spanContext();
        return 1 === t;
      }
      function n3(e) {
        if (e && 0 !== e.code)
          return 1 === e.code ? "ok" : e.message || "unknown_error";
      }
      let n4 = "_sentryChildSpans",
        n5 = "_sentryRootSpan";
      function n6(e, t) {
        let r = e[n5] || e;
        nP(t, n5, r), e[n4] ? e[n4].add(t) : nP(e, n4, new Set([t]));
      }
      function n9(e) {
        return e[n5] || e;
      }
      let n8 = "_sentryScope",
        n7 = "_sentryIsolationScope";
      function ie(e, t, r) {
        e && (nP(e, n7, r), nP(e, n8, t));
      }
      function it(e) {
        return { scope: e[n8], isolationScope: e[n7] };
      }
      function ir(e, t, r = () => {}) {
        var n, i, s;
        let a;
        try {
          a = e();
        } catch (e) {
          throw (t(e), r(), e);
        }
        return (
          (n = a),
          (i = t),
          (s = r),
          nL(n)
            ? n.then(
                (e) => (s(), e),
                (e) => {
                  throw (i(e), s(), e);
                },
              )
            : (s(), n)
        );
      }
      function ii(e) {
        if ("boolean" == typeof __SENTRY_TRACING__ && !__SENTRY_TRACING__)
          return !1;
        let t = e || nF()?.getOptions();
        return !!t && (null != t.tracesSampleRate || !!t.tracesSampler);
      }
      function is(e) {
        if ("boolean" == typeof e) return Number(e);
        let t = "string" == typeof e ? parseFloat(e) : e;
        if (!("number" != typeof t || isNaN(t)) && !(t < 0) && !(t > 1))
          return t;
      }
      let ia = /^sentry-/;
      function io(e) {
        return e
          .split(",")
          .map((e) =>
            e.split("=").map((e) => {
              try {
                return decodeURIComponent(e.trim());
              } catch {
                return;
              }
            }),
          )
          .reduce((e, [t, r]) => (t && r && (e[t] = r), e), {});
      }
      let il = /^o(\d+)\./,
        iu = "_frozenDsc";
      function ic(e) {
        let t = nF();
        if (!t) return {};
        let r = n9(e),
          n = n1(r),
          i = n.data,
          s = r.spanContext().traceState,
          a =
            s?.get("sentry.sample_rate") ??
            i[nK] ??
            i["sentry.previous_trace_sample_rate"];
        function o(e) {
          return (
            ("number" == typeof a || "string" == typeof a) &&
              (e.sample_rate = `${a}`),
            e
          );
        }
        let l = r[iu];
        if (l) return o(l);
        let u = s?.get("sentry.dsc"),
          c =
            u &&
            (function (e) {
              let t = (function (e) {
                if (e && (nj(e, "String") || Array.isArray(e)))
                  return Array.isArray(e)
                    ? e.reduce(
                        (e, t) => (
                          Object.entries(io(t)).forEach(([t, r]) => {
                            e[t] = r;
                          }),
                          e
                        ),
                        {},
                      )
                    : io(e);
              })(e);
              if (!t) return;
              let r = Object.entries(t).reduce(
                (e, [t, r]) => (t.match(ia) && (e[t.slice(7)] = r), e),
                {},
              );
              return Object.keys(r).length > 0 ? r : void 0;
            })(u);
        if (c) return o(c);
        let d = (function (e, t) {
            let r,
              n = t.getOptions(),
              { publicKey: i, host: s } = t.getDsn() || {};
            n.orgId
              ? (r = String(n.orgId))
              : s &&
                (r = (function (e) {
                  let t = e.match(il);
                  return t?.[1];
                })(s));
            let a = {
              environment: n.environment || "production",
              release: n.release,
              public_key: i,
              trace_id: e,
              org_id: r,
            };
            return t.emit("createDsc", a), a;
          })(e.spanContext().traceId, t),
          h = i[nW],
          f = n.description;
        return (
          "url" !== h && f && (d.transaction = f),
          ii() &&
            ((d.sampled = String(n2(r))),
            (d.sample_rand =
              s?.get("sentry.sample_rand") ??
              it(r).scope?.getPropagationContext().sampleRand.toString())),
          o(d),
          t.emit("createDsc", d, r),
          d
        );
      }
      class id {
        constructor(e = {}) {
          (this._traceId = e.traceId || nE()),
            (this._spanId = e.spanId || nN());
        }
        spanContext() {
          return {
            spanId: this._spanId,
            traceId: this._traceId,
            traceFlags: 0,
          };
        }
        end(e) {}
        setAttribute(e, t) {
          return this;
        }
        setAttributes(e) {
          return this;
        }
        setStatus(e) {
          return this;
        }
        updateName(e) {
          return this;
        }
        isRecording() {
          return !1;
        }
        addEvent(e, t, r) {
          return this;
        }
        addLink(e) {
          return this;
        }
        addLinks(e) {
          return this;
        }
        recordException(e, t) {}
      }
      function ih(e) {
        if (!e || 0 === e.length) return;
        let t = {};
        return (
          e.forEach((e) => {
            let r = e.attributes || {},
              n = r["sentry.measurement_unit"],
              i = r["sentry.measurement_value"];
            "string" == typeof n &&
              "number" == typeof i &&
              (t[e.name] = { value: i, unit: n });
          }),
          t
        );
      }
      class ip {
        constructor(e = {}) {
          (this._traceId = e.traceId || nE()),
            (this._spanId = e.spanId || nN()),
            (this._startTime = e.startTimestamp || nx()),
            (this._links = e.links),
            (this._attributes = {}),
            this.setAttributes({ [nJ]: "manual", [nV]: e.op, ...e.attributes }),
            (this._name = e.name),
            e.parentSpanId && (this._parentSpanId = e.parentSpanId),
            "sampled" in e && (this._sampled = e.sampled),
            e.endTimestamp && (this._endTime = e.endTimestamp),
            (this._events = []),
            (this._isStandaloneSpan = e.isStandalone),
            this._endTime && this._onSpanEnded();
        }
        addLink(e) {
          return this._links ? this._links.push(e) : (this._links = [e]), this;
        }
        addLinks(e) {
          return this._links ? this._links.push(...e) : (this._links = e), this;
        }
        recordException(e, t) {}
        spanContext() {
          let { _spanId: e, _traceId: t, _sampled: r } = this;
          return { spanId: e, traceId: t, traceFlags: +!!r };
        }
        setAttribute(e, t) {
          return (
            void 0 === t
              ? delete this._attributes[e]
              : (this._attributes[e] = t),
            this
          );
        }
        setAttributes(e) {
          return (
            Object.keys(e).forEach((t) => this.setAttribute(t, e[t])), this
          );
        }
        updateStartTime(e) {
          this._startTime = nQ(e);
        }
        setStatus(e) {
          return (this._status = e), this;
        }
        updateName(e) {
          return (this._name = e), this.setAttribute(nW, "custom"), this;
        }
        end(e) {
          var t;
          this._endTime ||
            ((this._endTime = nQ(e)), (t = 0), this._onSpanEnded());
        }
        getSpanJSON() {
          return {
            data: this._attributes,
            description: this._name,
            op: this._attributes[nV],
            parent_span_id: this._parentSpanId,
            span_id: this._spanId,
            start_timestamp: this._startTime,
            status: n3(this._status),
            timestamp: this._endTime,
            trace_id: this._traceId,
            origin: this._attributes[nJ],
            profile_id: this._attributes["sentry.profile_id"],
            exclusive_time: this._attributes["sentry.exclusive_time"],
            measurements: ih(this._events),
            is_segment: (this._isStandaloneSpan && n9(this) === this) || void 0,
            segment_id: this._isStandaloneSpan
              ? n9(this).spanContext().spanId
              : void 0,
            links: nZ(this._links),
          };
        }
        isRecording() {
          return !this._endTime && !!this._sampled;
        }
        addEvent(e, t, r) {
          let n = i_(t) ? t : r || nx(),
            i = i_(t) ? {} : t || {},
            s = { name: e, time: nQ(n), attributes: i };
          return this._events.push(s), this;
        }
        isStandaloneSpan() {
          return !!this._isStandaloneSpan;
        }
        _onSpanEnded() {
          let e = nF();
          if (
            (e && e.emit("spanEnd", this),
            !(this._isStandaloneSpan || this === n9(this)))
          )
            return;
          if (this._isStandaloneSpan)
            return void (this._sampled
              ? (function (e) {
                  let t = nF();
                  if (!t) return;
                  let r = e[1];
                  if (!r || 0 === r.length)
                    return t.recordDroppedEvent("before_send", "span");
                  t.sendEnvelope(e);
                })(
                  (function (e, t) {
                    let r = ic(e[0]),
                      n = t?.getDsn(),
                      i = t?.getOptions().tunnel,
                      s = {
                        sent_at: new Date().toISOString(),
                        ...(!!r.trace_id && !!r.public_key && { trace: r }),
                        ...(!!i &&
                          n && {
                            dsn: (function (e, t = !1) {
                              let {
                                host: r,
                                path: n,
                                pass: i,
                                port: s,
                                projectId: a,
                                protocol: o,
                                publicKey: l,
                              } = e;
                              return `${o}://${l}${t && i ? `:${i}` : ""}@${r}${s ? `:${s}` : ""}/${n ? `${n}/` : n}${a}`;
                            })(n),
                          }),
                      },
                      a = t?.getOptions().beforeSendSpan,
                      o = a
                        ? (e) => {
                            let t = n1(e),
                              r = a(t);
                            return (
                              r ||
                              (nY ||
                                ((function (e) {
                                  if (!("console" in nw)) return e();
                                  let t = nw.console,
                                    r = {},
                                    n = Object.keys(nR);
                                  n.forEach((e) => {
                                    let n = nR[e];
                                    (r[e] = t[e]), (t[e] = n);
                                  });
                                  try {
                                    return e();
                                  } finally {
                                    n.forEach((e) => {
                                      t[e] = r[e];
                                    });
                                  }
                                })(() => {
                                  console.warn(
                                    "[Sentry] Returning null from `beforeSendSpan` is disallowed. To drop certain spans, configure the respective integrations directly.",
                                  );
                                }),
                                (nY = !0)),
                              t)
                            );
                          }
                        : n1,
                      l = [];
                    for (let t of e) {
                      let e = o(t);
                      e && l.push([{ type: "span" }, e]);
                    }
                    return (function (e, t = []) {
                      return [e, t];
                    })(s, l);
                  })([this], e),
                )
              : e && e.recordDroppedEvent("sample_rate", "span"));
          let t = this._convertSpanToTransaction();
          t && (it(this).scope || nz()).captureEvent(t);
        }
        _convertSpanToTransaction() {
          if (!ig(n1(this))) return;
          this._name || (this._name = "<unlabeled transaction>");
          let { scope: e, isolationScope: t } = it(this),
            r = e?.getScopeData().sdkProcessingMetadata?.normalizedRequest;
          if (!0 !== this._sampled) return;
          let n = (function (e) {
              let t = new Set();
              return (
                !(function e(r) {
                  if (!t.has(r) && n2(r))
                    for (let n of (t.add(r), r[n4] ? Array.from(r[n4]) : []))
                      e(n);
                })(e),
                Array.from(t)
              );
            })(this)
              .filter((e) => {
                var t;
                return (
                  e !== this && !((t = e) instanceof ip && t.isStandaloneSpan())
                );
              })
              .map((e) => n1(e))
              .filter(ig),
            i = this._attributes[nW];
          delete this._attributes[nX],
            n.forEach((e) => {
              delete e.data[nX];
            });
          let s = {
              contexts: {
                trace: (function (e) {
                  let { spanId: t, traceId: r } = e.spanContext(),
                    {
                      data: n,
                      op: i,
                      parent_span_id: s,
                      status: a,
                      origin: o,
                      links: l,
                    } = n1(e);
                  return {
                    parent_span_id: s,
                    span_id: t,
                    trace_id: r,
                    data: n,
                    op: i,
                    status: a,
                    origin: o,
                    links: l,
                  };
                })(this),
              },
              spans:
                n.length > 1e3
                  ? n
                      .sort((e, t) => e.start_timestamp - t.start_timestamp)
                      .slice(0, 1e3)
                  : n,
              start_timestamp: this._startTime,
              timestamp: this._endTime,
              transaction: this._name,
              type: "transaction",
              sdkProcessingMetadata: {
                capturedSpanScope: e,
                capturedSpanIsolationScope: t,
                dynamicSamplingContext: ic(this),
              },
              request: r,
              ...(i && { transaction_info: { source: i } }),
            },
            a = ih(this._events);
          return a && Object.keys(a).length && (s.measurements = a), s;
        }
      }
      function i_(e) {
        return (
          (e && "number" == typeof e) || e instanceof Date || Array.isArray(e)
        );
      }
      function ig(e) {
        return (
          !!e.start_timestamp && !!e.timestamp && !!e.span_id && !!e.trace_id
        );
      }
      let im = "__SENTRY_SUPPRESS_TRACING__";
      function iy() {
        return nG(nv());
      }
      function iw(e, t, r) {
        let n = nF(),
          i = n?.getOptions() || {},
          { name: s = "" } = e,
          a = {
            spanAttributes: { ...e.attributes },
            spanName: s,
            parentSampled: r,
          };
        n?.emit("beforeSampling", a, { decision: !1 });
        let o = a.parentSampled ?? r,
          l = a.spanAttributes,
          u = t.getPropagationContext(),
          [c, d, h] = t.getScopeData().sdkProcessingMetadata[im]
            ? [!1]
            : (function (e, t, r) {
                let n, i;
                if (!ii(e)) return [!1];
                "function" == typeof e.tracesSampler
                  ? ((n = e.tracesSampler({
                      ...t,
                      inheritOrSampleWith: (e) =>
                        "number" == typeof t.parentSampleRate
                          ? t.parentSampleRate
                          : "boolean" == typeof t.parentSampled
                            ? Number(t.parentSampled)
                            : e,
                    })),
                    (i = !0))
                  : void 0 !== t.parentSampled
                    ? (n = t.parentSampled)
                    : void 0 !== e.tracesSampleRate &&
                      ((n = e.tracesSampleRate), (i = !0));
                let s = is(n);
                if (void 0 === s) return [!1];
                if (!s) return [!1, s, i];
                let a = r < s;
                return [a, s, i];
              })(
                i,
                {
                  name: s,
                  parentSampled: o,
                  attributes: l,
                  parentSampleRate: is(u.dsc?.sample_rate),
                },
                u.sampleRand,
              ),
          f = new ip({
            ...e,
            attributes: {
              [nW]: "custom",
              [nK]: void 0 !== d && h ? d : void 0,
              ...l,
            },
            sampled: c,
          });
        return (
          !c && n && n.recordDroppedEvent("sample_rate", "transaction"),
          n && n.emit("spanStart", f),
          f
        );
      }
      let iv = [
        "user",
        "level",
        "extra",
        "contexts",
        "tags",
        "fingerprint",
        "propagationContext",
      ];
      async function ib(e) {
        let t = nF();
        return t ? t.flush(e) : Promise.resolve(!1);
      }
      async function iS() {
        try {
          await ib(2e3);
        } catch (e) {}
      }
      function iE(e) {
        return new Proxy(e, {
          apply: async (e, t, r) =>
            (function (...e) {
              let t = nG(nv());
              if (2 === e.length) {
                let [r, n] = e;
                return r
                  ? t.withSetIsolationScope(r, n)
                  : t.withIsolationScope(n);
              }
              return t.withIsolationScope(e[0]);
            })((n) => {
              let i,
                s,
                a = r[0],
                o = nz();
              a instanceof Request
                ? (n.setSDKProcessingMetadata({
                    normalizedRequest: (function (e) {
                      let t = (function (e) {
                        let t = {};
                        try {
                          e.forEach((e, r) => {
                            "string" == typeof e && (t[r] = e);
                          });
                        } catch {}
                        return t;
                      })(e.headers);
                      return {
                        method: e.method,
                        url: e.url,
                        query_string: (function (e) {
                          if (e)
                            try {
                              let t = new URL(e, "http://s.io").search.slice(1);
                              return t.length ? t : void 0;
                            } catch {
                              return;
                            }
                        })(e.url),
                        headers: t,
                      };
                    })(a),
                  }),
                  (i = `middleware ${a.method} ${new URL(a.url).pathname}`),
                  (s = "url"))
                : ((i = "middleware"), (s = "component")),
                o.setTransactionName(i);
              let l = (function () {
                let e = nG(nv());
                return e.getActiveSpan ? e.getActiveSpan() : nz()[nO];
              })();
              if (l) {
                (i = "middleware"), (s = "component");
                let e = n9(l);
                e && ie(e, o, n);
              }
              return (function (e, t) {
                let r = nG(nv());
                if (r.startSpan) return r.startSpan(e, t);
                let n = (function (e) {
                    let t = {
                      isStandalone: (e.experimental || {}).standalone,
                      ...e,
                    };
                    if (e.startTime) {
                      let r = { ...t };
                      return (
                        (r.startTimestamp = nQ(e.startTime)),
                        delete r.startTime,
                        r
                      );
                    }
                    return t;
                  })(e),
                  { forceTransaction: i, parentSpan: s, scope: a } = e;
                return nH(a?.clone(), () => {
                  var r;
                  return (
                    void 0 !== (r = s)
                      ? (e) =>
                          (function (e, t) {
                            let r = (function () {
                              return nG(nv());
                            })();
                            return r.withActiveSpan
                              ? r.withActiveSpan(e, t)
                              : nH((r) => (nA(r, e || void 0), t(r)));
                          })(r, e)
                      : (e) => e()
                  )(() => {
                    let r = nz(),
                      s = (function (e) {
                        let t = e[nO];
                        if (!t) return;
                        let r = nF();
                        return (r ? r.getOptions() : {})
                          .parentSpanIsAlwaysRootSpan
                          ? n9(t)
                          : t;
                      })(r),
                      a =
                        e.onlyIfParent && !s
                          ? new id()
                          : (function ({
                              parentSpan: e,
                              spanArguments: t,
                              forceTransaction: r,
                              scope: n,
                            }) {
                              var i, s, a;
                              let o;
                              if (!ii()) {
                                let n = new id();
                                if (r || !e) {
                                  let e = {
                                    sampled: "false",
                                    sample_rate: "0",
                                    transaction: t.name,
                                    ...ic(n),
                                  };
                                  nP(n, iu, e);
                                }
                                return n;
                              }
                              let l = nG(nv()).getIsolationScope();
                              if (e && !r)
                                (o = (function (e, t, r) {
                                  let { spanId: n, traceId: i } =
                                      e.spanContext(),
                                    s =
                                      !t.getScopeData().sdkProcessingMetadata[
                                        im
                                      ] && n2(e),
                                    a = s
                                      ? new ip({
                                          ...r,
                                          parentSpanId: n,
                                          traceId: i,
                                          sampled: s,
                                        })
                                      : new id({ traceId: i });
                                  n6(e, a);
                                  let o = nF();
                                  return (
                                    o &&
                                      (o.emit("spanStart", a),
                                      r.endTimestamp && o.emit("spanEnd", a)),
                                    a
                                  );
                                })(e, n, t)),
                                  n6(e, o);
                              else if (e) {
                                let r = ic(e),
                                  { traceId: i, spanId: s } = e.spanContext(),
                                  a = n2(e);
                                nP(
                                  (o = iw(
                                    { traceId: i, parentSpanId: s, ...t },
                                    n,
                                    a,
                                  )),
                                  iu,
                                  r,
                                );
                              } else {
                                let {
                                  traceId: e,
                                  dsc: r,
                                  parentSpanId: i,
                                  sampled: s,
                                } = {
                                  ...l.getPropagationContext(),
                                  ...n.getPropagationContext(),
                                };
                                (o = iw(
                                  { traceId: e, parentSpanId: i, ...t },
                                  n,
                                  s,
                                )),
                                  r && nP(o, iu, r);
                              }
                              return (a = 0), ie(o, n, l), o;
                            })({
                              parentSpan: s,
                              spanArguments: n,
                              forceTransaction: i,
                              scope: r,
                            });
                    return (
                      nA(r, a),
                      ir(
                        () => t(a),
                        () => {
                          let { status: e } = n1(a);
                          a.isRecording() &&
                            (!e || "ok" === e) &&
                            a.setStatus({ code: 2, message: "internal_error" });
                        },
                        () => {
                          a.end();
                        },
                      )
                    );
                  });
                });
              })(
                {
                  name: i,
                  op: "http.server.middleware",
                  attributes: {
                    [nW]: s,
                    [nJ]: "auto.function.nextjs.wrapMiddlewareWithSentry",
                  },
                },
                () =>
                  ir(
                    () => e.apply(t, r),
                    (e) => {
                      nz().captureException(
                        e,
                        (function (e) {
                          if (e) {
                            var t;
                            return (t = e) instanceof nM ||
                              "function" == typeof t ||
                              Object.keys(e).some((e) => iv.includes(e))
                              ? { captureContext: e }
                              : e;
                          }
                        })({ mechanism: { type: "instrument", handled: !1 } }),
                      );
                    },
                    () => {
                      var e = iS();
                      let t = nw[Symbol.for("@vercel/request-context")],
                        r = t?.get && t.get() ? t.get() : {};
                      r?.waitUntil && r.waitUntil(e);
                    },
                  ),
              );
            }),
        });
      }
      let ik = (0, e0.A)({
          locales: ["en", "ar", "es", "fr"],
          defaultLocale: "en",
          localePrefix: "always",
        }),
        ix = ["/login", "/register", "/auth"],
        iT = ["/dashboard", "/admin", "/profile"],
        iR = ["/", "/about", "/contact", "/api/auth/guest"],
        iC = [
          "/chat",
          "/ai-unified/chat",
          "/artifacts",
          "/ai-unified/ocr",
          "/api/chat",
          "/api/(ai-unified)",
          "/api/artifacts",
          "/api/document",
          "/api/suggestions",
          "/api/vote",
        ],
        iP = {
          "/api/chat": "/api/(ai-unified)/api/chat",
          "/chat": "/ai-unified/chat",
          "/chat/new": "/ai-unified/chat/new",
          "/artifacts": "/ai-unified/chat",
        };
      async function iO(e, t) {
        if (t.isGuestAllowedRoute || t.isPublicRoute) return null;
        if (t.isProtectedRoute) {
          let r = new URL("/guest-signup", e.url);
          return (
            r.searchParams.set("redirect", t.pathname),
            eQ.NextResponse.redirect(r)
          );
        }
        return null;
      }
      async function iA(e, t, r) {
        if (t.isAuthRoute) {
          let t = new URL("/dashboard", e.url);
          return eQ.NextResponse.redirect(t);
        }
        if (t.pathname.startsWith("/admin")) {
          let n = r.user_metadata?.role || "client";
          if ("admin" !== n) {
            console.warn("Unauthorized admin access attempt:", {
              userId: r.id,
              role: n,
              pathname: t.pathname,
            });
            let i = new URL("/unauthorized", e.url);
            return eQ.NextResponse.redirect(i);
          }
        }
        return null;
      }
      async function iI(e, t) {
        if (t.isPublicRoute || t.isAuthRoute) return null;
        if (
          "true" === process.env.NEXT_PUBLIC_GUEST_AUTH_ENABLED &&
          t.isGuestAllowedRoute
        ) {
          let r = new URL("/api/auth/guest", e.url);
          return (
            r.searchParams.set("action", "create"),
            r.searchParams.set("redirect", t.pathname),
            eQ.NextResponse.redirect(r)
          );
        }
        if (t.isProtectedRoute) {
          let r = new URL("/login", e.url);
          return (
            r.searchParams.set("redirect", t.pathname),
            eQ.NextResponse.redirect(r)
          );
        }
        return null;
      }
      async function ij(e) {
        try {
          let t = (function (e) {
            let t = e.nextUrl.pathname,
              r = e.headers.get("user-agent") || "",
              n = e.headers.get("x-forwarded-for") || "",
              i = e.headers.get("x-real-ip") || "",
              s = n.split(",")[0] || i || "unknown";
            return {
              pathname: t,
              isAuthRoute: ix.some((e) => t.startsWith(e)),
              isProtectedRoute: iT.some((e) => t.startsWith(e)),
              isPublicRoute: iR.some((e) => t === e || t.startsWith(e)),
              isGuestAllowedRoute: iC.some((e) => t.startsWith(e)),
              userAgent: r.substring(0, 100),
              ipAddress: s,
            };
          })(e);
          if (
            t.pathname.startsWith("/_next") ||
            t.pathname.startsWith("/static") ||
            t.pathname.includes(".") ||
            (t.pathname.startsWith("/api") &&
              !t.pathname.startsWith("/api/auth") &&
              !t.pathname.startsWith("/api/(ai-unified)"))
          )
            return eQ.NextResponse.next();
          let r = (function (e) {
            let t = e.nextUrl.pathname;
            for (let [r, n] of Object.entries(iP))
              if (t === r || t.startsWith(r + "/")) {
                let i = new URL(t.replace(r, n), e.url);
                return (
                  e.nextUrl.searchParams.forEach((e, t) => {
                    i.searchParams.set(t, e);
                  }),
                  eQ.NextResponse.redirect(i, { status: 308 })
                );
              }
            return null;
          })(e);
          if (r) return r;
          let n = null;
          if (
            (function (e) {
              let t = e.cookies.get("is_guest_user")?.value === "true",
                r = e.cookies.get("guest_data")?.value;
              return t && !!r;
            })(e)
          )
            n = await iO(e, t);
          else {
            let r = eQ.NextResponse.next(),
              i = n_(
                "http://localhost:54321",
                "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0",
                {
                  cookies: {
                    get: (t) => e.cookies.get(t)?.value,
                    set(e, t, n) {
                      r.cookies.set(e, t, n);
                    },
                    remove(e, t) {
                      r.cookies.set(e, "", { ...t, maxAge: 0 });
                    },
                  },
                  auth: { persistSession: !0, autoRefreshToken: !0 },
                },
              ),
              {
                data: { user: s },
                error: a,
              } = await i.auth.getUser();
            (n = !a && s ? await iA(e, t, s) : await iI(e, t)) ||
              (n = await nm(e));
          }
          if (n) return n;
          return ik(e);
        } catch (t) {
          return console.error("Middleware error:", t), ik(e);
        }
      }
      let iL = {
        matcher: [
          "/((?!_next/static|_next/image|favicon.ico|public|.*\\.png$|.*\\.jpg$|.*\\.jpeg$|.*\\.gif$|.*\\.svg$|.*\\.ico$).*)",
        ],
      };
      var iN = Object.freeze({ __proto__: null, config: iL, middleware: ij });
      "middleware" in iN && "function" == typeof iN.middleware
        ? (s = iN.middleware)
        : "default" in iN && "function" == typeof iN.default
          ? (a = iN.default)
          : "function" == typeof iN && (a = iN);
      let iM = s ? iE(s) : void 0,
        iD = a ? iE(a) : void 0,
        i$ =
          (Object.values({ NOT_FOUND: 404, FORBIDDEN: 403, UNAUTHORIZED: 401 }),
          { ...y }),
        iq = i$.middleware || i$.default,
        iU = "/src/middleware";
      if ("function" != typeof iq)
        throw Object.defineProperty(
          Error(
            `The Middleware "${iU}" must export a \`middleware\` or a \`default\` function`,
          ),
          "__NEXT_ERROR_CODE",
          { value: "E120", enumerable: !1, configurable: !0 },
        );
      function iB(e) {
        return eZ({
          ...e,
          page: iU,
          handler: async (...e) => {
            try {
              return await iq(...e);
            } catch (i) {
              let t = e[0],
                r = new URL(t.url),
                n = r.pathname + r.search;
              throw (
                (await S(
                  i,
                  {
                    path: n,
                    method: t.method,
                    headers: Object.fromEntries(t.headers.entries()),
                  },
                  {
                    routerKind: "Pages Router",
                    routePath: "/middleware",
                    routeType: "middleware",
                    revalidateReason: void 0,
                  },
                ),
                i)
              );
            }
          },
        });
      }
    },
    5501: (e, t) => {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.version = void 0),
        (t.version = "0.0.0-automated");
    },
    6680: (e, t) => {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.default = function (e, t, r, n) {
          var i;
          let { name: s, ...a } = n;
          (null == (i = e.cookies.get(s)) ? void 0 : i.value) !== r &&
            t.cookies.set(s, r, { path: e.nextUrl.basePath || void 0, ...a });
        });
    },
    7688: (e, t, r) => {
      "use strict";
      e.exports = r(50534);
    },
    9594: (e, t, r) => {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 });
      var n = r(53443),
        i = r(15772);
      t.default = function (e) {
        var t;
        let {
            localizedPathnames: r,
            request: s,
            resolvedLocale: a,
            routing: o,
          } = e,
          l = s.nextUrl.clone(),
          u = i.getHost(s.headers);
        function c(e, t) {
          return (
            (e.pathname = n.normalizeTrailingSlash(e.pathname)),
            s.nextUrl.basePath &&
              ((e = new URL(e)).pathname = i.applyBasePath(
                e.pathname,
                s.nextUrl.basePath,
              )),
            "<"
              .concat(e.toString(), '>; rel="alternate"; hreflang="')
              .concat(t, '"')
          );
        }
        function d(e, t) {
          return r && "object" == typeof r
            ? i.formatTemplatePathname(e, r[a], r[t])
            : e;
        }
        u && ((l.port = ""), (l.host = u)),
          (l.protocol =
            null != (t = s.headers.get("x-forwarded-proto")) ? t : l.protocol),
          (l.pathname = i.getNormalizedPathname(
            l.pathname,
            o.locales,
            o.localePrefix,
          ));
        let h = i
          .getLocalePrefixes(o.locales, o.localePrefix, !1)
          .flatMap((e) => {
            let t,
              [n, s] = e;
            function a(e) {
              return "/" === e ? s : s + e;
            }
            if (o.domains)
              return o.domains
                .filter((e) => i.isLocaleSupportedOnDomain(n, e))
                .map(
                  (e) => (
                    ((t = new URL(l)).port = ""),
                    (t.host = e.domain),
                    (t.pathname = d(l.pathname, n)),
                    (n === e.defaultLocale &&
                      "always" !== o.localePrefix.mode) ||
                      (t.pathname = a(t.pathname)),
                    c(t, n)
                  ),
                );
            {
              let e;
              (e = r && "object" == typeof r ? d(l.pathname, n) : l.pathname),
                (n === o.defaultLocale && "always" !== o.localePrefix.mode) ||
                  (e = a(e)),
                (t = new URL(e, l));
            }
            return c(t, n);
          });
        if (
          !o.domains &&
          ("always" !== o.localePrefix.mode || "/" === l.pathname)
        ) {
          let e = new URL(d(l.pathname, o.defaultLocale), l);
          h.push(c(e, "x-default"));
        }
        return h.join(", ");
      };
    },
    11863: function (e, t, r) {
      "use strict";
      var n =
        (this && this.__importDefault) ||
        function (e) {
          return e && e.__esModule ? e : { default: e };
        };
      Object.defineProperty(t, "__esModule", { value: !0 });
      let i = n(r(60643));
      class s {
        constructor(e, { headers: t = {}, schema: r, fetch: n }) {
          (this.url = e),
            (this.headers = t),
            (this.schema = r),
            (this.fetch = n);
        }
        select(e, { head: t = !1, count: r } = {}) {
          let n = !1,
            s = (null != e ? e : "*")
              .split("")
              .map((e) =>
                /\s/.test(e) && !n ? "" : ('"' === e && (n = !n), e),
              )
              .join("");
          return (
            this.url.searchParams.set("select", s),
            r && (this.headers.Prefer = `count=${r}`),
            new i.default({
              method: t ? "HEAD" : "GET",
              url: this.url,
              headers: this.headers,
              schema: this.schema,
              fetch: this.fetch,
              allowEmpty: !1,
            })
          );
        }
        insert(e, { count: t, defaultToNull: r = !0 } = {}) {
          let n = [];
          if (
            (this.headers.Prefer && n.push(this.headers.Prefer),
            t && n.push(`count=${t}`),
            r || n.push("missing=default"),
            (this.headers.Prefer = n.join(",")),
            Array.isArray(e))
          ) {
            let t = e.reduce((e, t) => e.concat(Object.keys(t)), []);
            if (t.length > 0) {
              let e = [...new Set(t)].map((e) => `"${e}"`);
              this.url.searchParams.set("columns", e.join(","));
            }
          }
          return new i.default({
            method: "POST",
            url: this.url,
            headers: this.headers,
            schema: this.schema,
            body: e,
            fetch: this.fetch,
            allowEmpty: !1,
          });
        }
        upsert(
          e,
          {
            onConflict: t,
            ignoreDuplicates: r = !1,
            count: n,
            defaultToNull: s = !0,
          } = {},
        ) {
          let a = [`resolution=${r ? "ignore" : "merge"}-duplicates`];
          if (
            (void 0 !== t && this.url.searchParams.set("on_conflict", t),
            this.headers.Prefer && a.push(this.headers.Prefer),
            n && a.push(`count=${n}`),
            s || a.push("missing=default"),
            (this.headers.Prefer = a.join(",")),
            Array.isArray(e))
          ) {
            let t = e.reduce((e, t) => e.concat(Object.keys(t)), []);
            if (t.length > 0) {
              let e = [...new Set(t)].map((e) => `"${e}"`);
              this.url.searchParams.set("columns", e.join(","));
            }
          }
          return new i.default({
            method: "POST",
            url: this.url,
            headers: this.headers,
            schema: this.schema,
            body: e,
            fetch: this.fetch,
            allowEmpty: !1,
          });
        }
        update(e, { count: t } = {}) {
          let r = [];
          return (
            this.headers.Prefer && r.push(this.headers.Prefer),
            t && r.push(`count=${t}`),
            (this.headers.Prefer = r.join(",")),
            new i.default({
              method: "PATCH",
              url: this.url,
              headers: this.headers,
              schema: this.schema,
              body: e,
              fetch: this.fetch,
              allowEmpty: !1,
            })
          );
        }
        delete({ count: e } = {}) {
          let t = [];
          return (
            e && t.push(`count=${e}`),
            this.headers.Prefer && t.unshift(this.headers.Prefer),
            (this.headers.Prefer = t.join(",")),
            new i.default({
              method: "DELETE",
              url: this.url,
              headers: this.headers,
              schema: this.schema,
              fetch: this.fetch,
              allowEmpty: !1,
            })
          );
        }
      }
      t.default = s;
    },
    12531: function (e, t, r) {
      "use strict";
      var n =
        (this && this.__importDefault) ||
        function (e) {
          return e && e.__esModule ? e : { default: e };
        };
      Object.defineProperty(t, "__esModule", { value: !0 });
      let i = n(r(11863)),
        s = n(r(60643)),
        a = r(60870);
      class o {
        constructor(e, { headers: t = {}, schema: r, fetch: n } = {}) {
          (this.url = e),
            (this.headers = Object.assign(
              Object.assign({}, a.DEFAULT_HEADERS),
              t,
            )),
            (this.schemaName = r),
            (this.fetch = n);
        }
        from(e) {
          let t = new URL(`${this.url}/${e}`);
          return new i.default(t, {
            headers: Object.assign({}, this.headers),
            schema: this.schemaName,
            fetch: this.fetch,
          });
        }
        schema(e) {
          return new o(this.url, {
            headers: this.headers,
            schema: e,
            fetch: this.fetch,
          });
        }
        rpc(e, t = {}, { head: r = !1, get: n = !1, count: i } = {}) {
          let a,
            o,
            l = new URL(`${this.url}/rpc/${e}`);
          r || n
            ? ((a = r ? "HEAD" : "GET"),
              Object.entries(t)
                .filter(([e, t]) => void 0 !== t)
                .map(([e, t]) => [
                  e,
                  Array.isArray(t) ? `{${t.join(",")}}` : `${t}`,
                ])
                .forEach(([e, t]) => {
                  l.searchParams.append(e, t);
                }))
            : ((a = "POST"), (o = t));
          let u = Object.assign({}, this.headers);
          return (
            i && (u.Prefer = `count=${i}`),
            new s.default({
              method: a,
              url: l,
              headers: u,
              schema: this.schemaName,
              body: o,
              fetch: this.fetch,
              allowEmpty: !1,
            })
          );
        }
      }
      t.default = o;
    },
    14100: (e, t, r) => {
      "use strict";
      r.r(t),
        r.d(t, {
          LookupSupportedLocales: () => _,
          ResolveLocale: () => p,
          match: () => g,
        }),
        Object.create;
      function n(e, t, r) {
        if (r || 2 == arguments.length)
          for (var n, i = 0, s = t.length; i < s; i++)
            (!n && i in t) ||
              (n || (n = Array.prototype.slice.call(t, 0, i)), (n[i] = t[i]));
        return e.concat(n || Array.prototype.slice.call(t));
      }
      Object.create;
      var i,
        s =
          ("function" == typeof SuppressedError && SuppressedError,
          {
            supplemental: {
              languageMatching: {
                "written-new": [
                  {
                    paradigmLocales: {
                      _locales: "en en_GB es es_419 pt_BR pt_PT",
                    },
                  },
                  { $enUS: { _value: "AS+CA+GU+MH+MP+PH+PR+UM+US+VI" } },
                  { $cnsar: { _value: "HK+MO" } },
                  { $americas: { _value: "019" } },
                  { $maghreb: { _value: "MA+DZ+TN+LY+MR+EH" } },
                  { no: { _desired: "nb", _distance: "1" } },
                  { bs: { _desired: "hr", _distance: "4" } },
                  { bs: { _desired: "sh", _distance: "4" } },
                  { hr: { _desired: "sh", _distance: "4" } },
                  { sr: { _desired: "sh", _distance: "4" } },
                  { aa: { _desired: "ssy", _distance: "4" } },
                  { de: { _desired: "gsw", _distance: "4", _oneway: "true" } },
                  { de: { _desired: "lb", _distance: "4", _oneway: "true" } },
                  { no: { _desired: "da", _distance: "8" } },
                  { nb: { _desired: "da", _distance: "8" } },
                  { ru: { _desired: "ab", _distance: "30", _oneway: "true" } },
                  { en: { _desired: "ach", _distance: "30", _oneway: "true" } },
                  { nl: { _desired: "af", _distance: "20", _oneway: "true" } },
                  { en: { _desired: "ak", _distance: "30", _oneway: "true" } },
                  { en: { _desired: "am", _distance: "30", _oneway: "true" } },
                  { es: { _desired: "ay", _distance: "20", _oneway: "true" } },
                  { ru: { _desired: "az", _distance: "30", _oneway: "true" } },
                  { ur: { _desired: "bal", _distance: "20", _oneway: "true" } },
                  { ru: { _desired: "be", _distance: "20", _oneway: "true" } },
                  { en: { _desired: "bem", _distance: "30", _oneway: "true" } },
                  { hi: { _desired: "bh", _distance: "30", _oneway: "true" } },
                  { en: { _desired: "bn", _distance: "30", _oneway: "true" } },
                  { zh: { _desired: "bo", _distance: "20", _oneway: "true" } },
                  { fr: { _desired: "br", _distance: "20", _oneway: "true" } },
                  { es: { _desired: "ca", _distance: "20", _oneway: "true" } },
                  {
                    fil: { _desired: "ceb", _distance: "30", _oneway: "true" },
                  },
                  { en: { _desired: "chr", _distance: "20", _oneway: "true" } },
                  { ar: { _desired: "ckb", _distance: "30", _oneway: "true" } },
                  { fr: { _desired: "co", _distance: "20", _oneway: "true" } },
                  { fr: { _desired: "crs", _distance: "20", _oneway: "true" } },
                  { sk: { _desired: "cs", _distance: "20" } },
                  { en: { _desired: "cy", _distance: "20", _oneway: "true" } },
                  { en: { _desired: "ee", _distance: "30", _oneway: "true" } },
                  { en: { _desired: "eo", _distance: "30", _oneway: "true" } },
                  { es: { _desired: "eu", _distance: "20", _oneway: "true" } },
                  { da: { _desired: "fo", _distance: "20", _oneway: "true" } },
                  { nl: { _desired: "fy", _distance: "20", _oneway: "true" } },
                  { en: { _desired: "ga", _distance: "20", _oneway: "true" } },
                  { en: { _desired: "gaa", _distance: "30", _oneway: "true" } },
                  { en: { _desired: "gd", _distance: "20", _oneway: "true" } },
                  { es: { _desired: "gl", _distance: "20", _oneway: "true" } },
                  { es: { _desired: "gn", _distance: "20", _oneway: "true" } },
                  { hi: { _desired: "gu", _distance: "30", _oneway: "true" } },
                  { en: { _desired: "ha", _distance: "30", _oneway: "true" } },
                  { en: { _desired: "haw", _distance: "20", _oneway: "true" } },
                  { fr: { _desired: "ht", _distance: "20", _oneway: "true" } },
                  { ru: { _desired: "hy", _distance: "30", _oneway: "true" } },
                  { en: { _desired: "ia", _distance: "30", _oneway: "true" } },
                  { en: { _desired: "ig", _distance: "30", _oneway: "true" } },
                  { en: { _desired: "is", _distance: "20", _oneway: "true" } },
                  { id: { _desired: "jv", _distance: "20", _oneway: "true" } },
                  { en: { _desired: "ka", _distance: "30", _oneway: "true" } },
                  { fr: { _desired: "kg", _distance: "30", _oneway: "true" } },
                  { ru: { _desired: "kk", _distance: "30", _oneway: "true" } },
                  { en: { _desired: "km", _distance: "30", _oneway: "true" } },
                  { en: { _desired: "kn", _distance: "30", _oneway: "true" } },
                  { en: { _desired: "kri", _distance: "30", _oneway: "true" } },
                  { tr: { _desired: "ku", _distance: "30", _oneway: "true" } },
                  { ru: { _desired: "ky", _distance: "30", _oneway: "true" } },
                  { it: { _desired: "la", _distance: "20", _oneway: "true" } },
                  { en: { _desired: "lg", _distance: "30", _oneway: "true" } },
                  { fr: { _desired: "ln", _distance: "30", _oneway: "true" } },
                  { en: { _desired: "lo", _distance: "30", _oneway: "true" } },
                  { en: { _desired: "loz", _distance: "30", _oneway: "true" } },
                  { fr: { _desired: "lua", _distance: "30", _oneway: "true" } },
                  { hi: { _desired: "mai", _distance: "20", _oneway: "true" } },
                  { en: { _desired: "mfe", _distance: "30", _oneway: "true" } },
                  { fr: { _desired: "mg", _distance: "30", _oneway: "true" } },
                  { en: { _desired: "mi", _distance: "20", _oneway: "true" } },
                  { en: { _desired: "ml", _distance: "30", _oneway: "true" } },
                  { ru: { _desired: "mn", _distance: "30", _oneway: "true" } },
                  { hi: { _desired: "mr", _distance: "30", _oneway: "true" } },
                  { id: { _desired: "ms", _distance: "30", _oneway: "true" } },
                  { en: { _desired: "mt", _distance: "30", _oneway: "true" } },
                  { en: { _desired: "my", _distance: "30", _oneway: "true" } },
                  { en: { _desired: "ne", _distance: "30", _oneway: "true" } },
                  { nb: { _desired: "nn", _distance: "20" } },
                  { no: { _desired: "nn", _distance: "20" } },
                  { en: { _desired: "nso", _distance: "30", _oneway: "true" } },
                  { en: { _desired: "ny", _distance: "30", _oneway: "true" } },
                  { en: { _desired: "nyn", _distance: "30", _oneway: "true" } },
                  { fr: { _desired: "oc", _distance: "20", _oneway: "true" } },
                  { en: { _desired: "om", _distance: "30", _oneway: "true" } },
                  { en: { _desired: "or", _distance: "30", _oneway: "true" } },
                  { en: { _desired: "pa", _distance: "30", _oneway: "true" } },
                  { en: { _desired: "pcm", _distance: "20", _oneway: "true" } },
                  { en: { _desired: "ps", _distance: "30", _oneway: "true" } },
                  { es: { _desired: "qu", _distance: "30", _oneway: "true" } },
                  { de: { _desired: "rm", _distance: "20", _oneway: "true" } },
                  { en: { _desired: "rn", _distance: "30", _oneway: "true" } },
                  { fr: { _desired: "rw", _distance: "30", _oneway: "true" } },
                  { hi: { _desired: "sa", _distance: "30", _oneway: "true" } },
                  { en: { _desired: "sd", _distance: "30", _oneway: "true" } },
                  { en: { _desired: "si", _distance: "30", _oneway: "true" } },
                  { en: { _desired: "sn", _distance: "30", _oneway: "true" } },
                  { en: { _desired: "so", _distance: "30", _oneway: "true" } },
                  { en: { _desired: "sq", _distance: "30", _oneway: "true" } },
                  { en: { _desired: "st", _distance: "30", _oneway: "true" } },
                  { id: { _desired: "su", _distance: "20", _oneway: "true" } },
                  { en: { _desired: "sw", _distance: "30", _oneway: "true" } },
                  { en: { _desired: "ta", _distance: "30", _oneway: "true" } },
                  { en: { _desired: "te", _distance: "30", _oneway: "true" } },
                  { ru: { _desired: "tg", _distance: "30", _oneway: "true" } },
                  { en: { _desired: "ti", _distance: "30", _oneway: "true" } },
                  { ru: { _desired: "tk", _distance: "30", _oneway: "true" } },
                  { en: { _desired: "tlh", _distance: "30", _oneway: "true" } },
                  { en: { _desired: "tn", _distance: "30", _oneway: "true" } },
                  { en: { _desired: "to", _distance: "30", _oneway: "true" } },
                  { ru: { _desired: "tt", _distance: "30", _oneway: "true" } },
                  { en: { _desired: "tum", _distance: "30", _oneway: "true" } },
                  { zh: { _desired: "ug", _distance: "20", _oneway: "true" } },
                  { ru: { _desired: "uk", _distance: "20", _oneway: "true" } },
                  { en: { _desired: "ur", _distance: "30", _oneway: "true" } },
                  { ru: { _desired: "uz", _distance: "30", _oneway: "true" } },
                  { fr: { _desired: "wo", _distance: "30", _oneway: "true" } },
                  { en: { _desired: "xh", _distance: "30", _oneway: "true" } },
                  { en: { _desired: "yi", _distance: "30", _oneway: "true" } },
                  { en: { _desired: "yo", _distance: "30", _oneway: "true" } },
                  { zh: { _desired: "za", _distance: "20", _oneway: "true" } },
                  { en: { _desired: "zu", _distance: "30", _oneway: "true" } },
                  { ar: { _desired: "aao", _distance: "10", _oneway: "true" } },
                  { ar: { _desired: "abh", _distance: "10", _oneway: "true" } },
                  { ar: { _desired: "abv", _distance: "10", _oneway: "true" } },
                  { ar: { _desired: "acm", _distance: "10", _oneway: "true" } },
                  { ar: { _desired: "acq", _distance: "10", _oneway: "true" } },
                  { ar: { _desired: "acw", _distance: "10", _oneway: "true" } },
                  { ar: { _desired: "acx", _distance: "10", _oneway: "true" } },
                  { ar: { _desired: "acy", _distance: "10", _oneway: "true" } },
                  { ar: { _desired: "adf", _distance: "10", _oneway: "true" } },
                  { ar: { _desired: "aeb", _distance: "10", _oneway: "true" } },
                  { ar: { _desired: "aec", _distance: "10", _oneway: "true" } },
                  { ar: { _desired: "afb", _distance: "10", _oneway: "true" } },
                  { ar: { _desired: "ajp", _distance: "10", _oneway: "true" } },
                  { ar: { _desired: "apc", _distance: "10", _oneway: "true" } },
                  { ar: { _desired: "apd", _distance: "10", _oneway: "true" } },
                  { ar: { _desired: "arq", _distance: "10", _oneway: "true" } },
                  { ar: { _desired: "ars", _distance: "10", _oneway: "true" } },
                  { ar: { _desired: "ary", _distance: "10", _oneway: "true" } },
                  { ar: { _desired: "arz", _distance: "10", _oneway: "true" } },
                  { ar: { _desired: "auz", _distance: "10", _oneway: "true" } },
                  { ar: { _desired: "avl", _distance: "10", _oneway: "true" } },
                  { ar: { _desired: "ayh", _distance: "10", _oneway: "true" } },
                  { ar: { _desired: "ayl", _distance: "10", _oneway: "true" } },
                  { ar: { _desired: "ayn", _distance: "10", _oneway: "true" } },
                  { ar: { _desired: "ayp", _distance: "10", _oneway: "true" } },
                  { ar: { _desired: "bbz", _distance: "10", _oneway: "true" } },
                  { ar: { _desired: "pga", _distance: "10", _oneway: "true" } },
                  { ar: { _desired: "shu", _distance: "10", _oneway: "true" } },
                  { ar: { _desired: "ssh", _distance: "10", _oneway: "true" } },
                  { az: { _desired: "azb", _distance: "10", _oneway: "true" } },
                  { et: { _desired: "vro", _distance: "10", _oneway: "true" } },
                  { ff: { _desired: "ffm", _distance: "10", _oneway: "true" } },
                  { ff: { _desired: "fub", _distance: "10", _oneway: "true" } },
                  { ff: { _desired: "fue", _distance: "10", _oneway: "true" } },
                  { ff: { _desired: "fuf", _distance: "10", _oneway: "true" } },
                  { ff: { _desired: "fuh", _distance: "10", _oneway: "true" } },
                  { ff: { _desired: "fui", _distance: "10", _oneway: "true" } },
                  { ff: { _desired: "fuq", _distance: "10", _oneway: "true" } },
                  { ff: { _desired: "fuv", _distance: "10", _oneway: "true" } },
                  { gn: { _desired: "gnw", _distance: "10", _oneway: "true" } },
                  { gn: { _desired: "gui", _distance: "10", _oneway: "true" } },
                  { gn: { _desired: "gun", _distance: "10", _oneway: "true" } },
                  { gn: { _desired: "nhd", _distance: "10", _oneway: "true" } },
                  { iu: { _desired: "ikt", _distance: "10", _oneway: "true" } },
                  {
                    kln: { _desired: "enb", _distance: "10", _oneway: "true" },
                  },
                  {
                    kln: { _desired: "eyo", _distance: "10", _oneway: "true" },
                  },
                  {
                    kln: { _desired: "niq", _distance: "10", _oneway: "true" },
                  },
                  {
                    kln: { _desired: "oki", _distance: "10", _oneway: "true" },
                  },
                  {
                    kln: { _desired: "pko", _distance: "10", _oneway: "true" },
                  },
                  {
                    kln: { _desired: "sgc", _distance: "10", _oneway: "true" },
                  },
                  {
                    kln: { _desired: "tec", _distance: "10", _oneway: "true" },
                  },
                  {
                    kln: { _desired: "tuy", _distance: "10", _oneway: "true" },
                  },
                  {
                    kok: { _desired: "gom", _distance: "10", _oneway: "true" },
                  },
                  {
                    kpe: { _desired: "gkp", _distance: "10", _oneway: "true" },
                  },
                  {
                    luy: { _desired: "ida", _distance: "10", _oneway: "true" },
                  },
                  {
                    luy: { _desired: "lkb", _distance: "10", _oneway: "true" },
                  },
                  {
                    luy: { _desired: "lko", _distance: "10", _oneway: "true" },
                  },
                  {
                    luy: { _desired: "lks", _distance: "10", _oneway: "true" },
                  },
                  {
                    luy: { _desired: "lri", _distance: "10", _oneway: "true" },
                  },
                  {
                    luy: { _desired: "lrm", _distance: "10", _oneway: "true" },
                  },
                  {
                    luy: { _desired: "lsm", _distance: "10", _oneway: "true" },
                  },
                  {
                    luy: { _desired: "lto", _distance: "10", _oneway: "true" },
                  },
                  {
                    luy: { _desired: "lts", _distance: "10", _oneway: "true" },
                  },
                  {
                    luy: { _desired: "lwg", _distance: "10", _oneway: "true" },
                  },
                  {
                    luy: { _desired: "nle", _distance: "10", _oneway: "true" },
                  },
                  {
                    luy: { _desired: "nyd", _distance: "10", _oneway: "true" },
                  },
                  {
                    luy: { _desired: "rag", _distance: "10", _oneway: "true" },
                  },
                  { lv: { _desired: "ltg", _distance: "10", _oneway: "true" } },
                  { mg: { _desired: "bhr", _distance: "10", _oneway: "true" } },
                  { mg: { _desired: "bjq", _distance: "10", _oneway: "true" } },
                  { mg: { _desired: "bmm", _distance: "10", _oneway: "true" } },
                  { mg: { _desired: "bzc", _distance: "10", _oneway: "true" } },
                  { mg: { _desired: "msh", _distance: "10", _oneway: "true" } },
                  { mg: { _desired: "skg", _distance: "10", _oneway: "true" } },
                  { mg: { _desired: "tdx", _distance: "10", _oneway: "true" } },
                  { mg: { _desired: "tkg", _distance: "10", _oneway: "true" } },
                  { mg: { _desired: "txy", _distance: "10", _oneway: "true" } },
                  { mg: { _desired: "xmv", _distance: "10", _oneway: "true" } },
                  { mg: { _desired: "xmw", _distance: "10", _oneway: "true" } },
                  { mn: { _desired: "mvf", _distance: "10", _oneway: "true" } },
                  { ms: { _desired: "bjn", _distance: "10", _oneway: "true" } },
                  { ms: { _desired: "btj", _distance: "10", _oneway: "true" } },
                  { ms: { _desired: "bve", _distance: "10", _oneway: "true" } },
                  { ms: { _desired: "bvu", _distance: "10", _oneway: "true" } },
                  { ms: { _desired: "coa", _distance: "10", _oneway: "true" } },
                  { ms: { _desired: "dup", _distance: "10", _oneway: "true" } },
                  { ms: { _desired: "hji", _distance: "10", _oneway: "true" } },
                  { ms: { _desired: "id", _distance: "10", _oneway: "true" } },
                  { ms: { _desired: "jak", _distance: "10", _oneway: "true" } },
                  { ms: { _desired: "jax", _distance: "10", _oneway: "true" } },
                  { ms: { _desired: "kvb", _distance: "10", _oneway: "true" } },
                  { ms: { _desired: "kvr", _distance: "10", _oneway: "true" } },
                  { ms: { _desired: "kxd", _distance: "10", _oneway: "true" } },
                  { ms: { _desired: "lce", _distance: "10", _oneway: "true" } },
                  { ms: { _desired: "lcf", _distance: "10", _oneway: "true" } },
                  { ms: { _desired: "liw", _distance: "10", _oneway: "true" } },
                  { ms: { _desired: "max", _distance: "10", _oneway: "true" } },
                  { ms: { _desired: "meo", _distance: "10", _oneway: "true" } },
                  { ms: { _desired: "mfa", _distance: "10", _oneway: "true" } },
                  { ms: { _desired: "mfb", _distance: "10", _oneway: "true" } },
                  { ms: { _desired: "min", _distance: "10", _oneway: "true" } },
                  { ms: { _desired: "mqg", _distance: "10", _oneway: "true" } },
                  { ms: { _desired: "msi", _distance: "10", _oneway: "true" } },
                  { ms: { _desired: "mui", _distance: "10", _oneway: "true" } },
                  { ms: { _desired: "orn", _distance: "10", _oneway: "true" } },
                  { ms: { _desired: "ors", _distance: "10", _oneway: "true" } },
                  { ms: { _desired: "pel", _distance: "10", _oneway: "true" } },
                  { ms: { _desired: "pse", _distance: "10", _oneway: "true" } },
                  { ms: { _desired: "tmw", _distance: "10", _oneway: "true" } },
                  { ms: { _desired: "urk", _distance: "10", _oneway: "true" } },
                  { ms: { _desired: "vkk", _distance: "10", _oneway: "true" } },
                  { ms: { _desired: "vkt", _distance: "10", _oneway: "true" } },
                  { ms: { _desired: "xmm", _distance: "10", _oneway: "true" } },
                  { ms: { _desired: "zlm", _distance: "10", _oneway: "true" } },
                  { ms: { _desired: "zmi", _distance: "10", _oneway: "true" } },
                  { ne: { _desired: "dty", _distance: "10", _oneway: "true" } },
                  { om: { _desired: "gax", _distance: "10", _oneway: "true" } },
                  { om: { _desired: "hae", _distance: "10", _oneway: "true" } },
                  { om: { _desired: "orc", _distance: "10", _oneway: "true" } },
                  { or: { _desired: "spv", _distance: "10", _oneway: "true" } },
                  { ps: { _desired: "pbt", _distance: "10", _oneway: "true" } },
                  { ps: { _desired: "pst", _distance: "10", _oneway: "true" } },
                  { qu: { _desired: "qub", _distance: "10", _oneway: "true" } },
                  { qu: { _desired: "qud", _distance: "10", _oneway: "true" } },
                  { qu: { _desired: "quf", _distance: "10", _oneway: "true" } },
                  { qu: { _desired: "qug", _distance: "10", _oneway: "true" } },
                  { qu: { _desired: "quh", _distance: "10", _oneway: "true" } },
                  { qu: { _desired: "quk", _distance: "10", _oneway: "true" } },
                  { qu: { _desired: "qul", _distance: "10", _oneway: "true" } },
                  { qu: { _desired: "qup", _distance: "10", _oneway: "true" } },
                  { qu: { _desired: "qur", _distance: "10", _oneway: "true" } },
                  { qu: { _desired: "qus", _distance: "10", _oneway: "true" } },
                  { qu: { _desired: "quw", _distance: "10", _oneway: "true" } },
                  { qu: { _desired: "qux", _distance: "10", _oneway: "true" } },
                  { qu: { _desired: "quy", _distance: "10", _oneway: "true" } },
                  { qu: { _desired: "qva", _distance: "10", _oneway: "true" } },
                  { qu: { _desired: "qvc", _distance: "10", _oneway: "true" } },
                  { qu: { _desired: "qve", _distance: "10", _oneway: "true" } },
                  { qu: { _desired: "qvh", _distance: "10", _oneway: "true" } },
                  { qu: { _desired: "qvi", _distance: "10", _oneway: "true" } },
                  { qu: { _desired: "qvj", _distance: "10", _oneway: "true" } },
                  { qu: { _desired: "qvl", _distance: "10", _oneway: "true" } },
                  { qu: { _desired: "qvm", _distance: "10", _oneway: "true" } },
                  { qu: { _desired: "qvn", _distance: "10", _oneway: "true" } },
                  { qu: { _desired: "qvo", _distance: "10", _oneway: "true" } },
                  { qu: { _desired: "qvp", _distance: "10", _oneway: "true" } },
                  { qu: { _desired: "qvs", _distance: "10", _oneway: "true" } },
                  { qu: { _desired: "qvw", _distance: "10", _oneway: "true" } },
                  { qu: { _desired: "qvz", _distance: "10", _oneway: "true" } },
                  { qu: { _desired: "qwa", _distance: "10", _oneway: "true" } },
                  { qu: { _desired: "qwc", _distance: "10", _oneway: "true" } },
                  { qu: { _desired: "qwh", _distance: "10", _oneway: "true" } },
                  { qu: { _desired: "qws", _distance: "10", _oneway: "true" } },
                  { qu: { _desired: "qxa", _distance: "10", _oneway: "true" } },
                  { qu: { _desired: "qxc", _distance: "10", _oneway: "true" } },
                  { qu: { _desired: "qxh", _distance: "10", _oneway: "true" } },
                  { qu: { _desired: "qxl", _distance: "10", _oneway: "true" } },
                  { qu: { _desired: "qxn", _distance: "10", _oneway: "true" } },
                  { qu: { _desired: "qxo", _distance: "10", _oneway: "true" } },
                  { qu: { _desired: "qxp", _distance: "10", _oneway: "true" } },
                  { qu: { _desired: "qxr", _distance: "10", _oneway: "true" } },
                  { qu: { _desired: "qxt", _distance: "10", _oneway: "true" } },
                  { qu: { _desired: "qxu", _distance: "10", _oneway: "true" } },
                  { qu: { _desired: "qxw", _distance: "10", _oneway: "true" } },
                  { sc: { _desired: "sdc", _distance: "10", _oneway: "true" } },
                  { sc: { _desired: "sdn", _distance: "10", _oneway: "true" } },
                  { sc: { _desired: "sro", _distance: "10", _oneway: "true" } },
                  { sq: { _desired: "aae", _distance: "10", _oneway: "true" } },
                  { sq: { _desired: "aat", _distance: "10", _oneway: "true" } },
                  { sq: { _desired: "aln", _distance: "10", _oneway: "true" } },
                  {
                    syr: { _desired: "aii", _distance: "10", _oneway: "true" },
                  },
                  { uz: { _desired: "uzs", _distance: "10", _oneway: "true" } },
                  { yi: { _desired: "yih", _distance: "10", _oneway: "true" } },
                  { zh: { _desired: "cdo", _distance: "10", _oneway: "true" } },
                  { zh: { _desired: "cjy", _distance: "10", _oneway: "true" } },
                  { zh: { _desired: "cpx", _distance: "10", _oneway: "true" } },
                  { zh: { _desired: "czh", _distance: "10", _oneway: "true" } },
                  { zh: { _desired: "czo", _distance: "10", _oneway: "true" } },
                  { zh: { _desired: "gan", _distance: "10", _oneway: "true" } },
                  { zh: { _desired: "hak", _distance: "10", _oneway: "true" } },
                  { zh: { _desired: "hsn", _distance: "10", _oneway: "true" } },
                  { zh: { _desired: "lzh", _distance: "10", _oneway: "true" } },
                  { zh: { _desired: "mnp", _distance: "10", _oneway: "true" } },
                  { zh: { _desired: "nan", _distance: "10", _oneway: "true" } },
                  { zh: { _desired: "wuu", _distance: "10", _oneway: "true" } },
                  { zh: { _desired: "yue", _distance: "10", _oneway: "true" } },
                  { "*": { _desired: "*", _distance: "80" } },
                  {
                    "en-Latn": {
                      _desired: "am-Ethi",
                      _distance: "10",
                      _oneway: "true",
                    },
                  },
                  {
                    "ru-Cyrl": {
                      _desired: "az-Latn",
                      _distance: "10",
                      _oneway: "true",
                    },
                  },
                  {
                    "en-Latn": {
                      _desired: "bn-Beng",
                      _distance: "10",
                      _oneway: "true",
                    },
                  },
                  {
                    "zh-Hans": {
                      _desired: "bo-Tibt",
                      _distance: "10",
                      _oneway: "true",
                    },
                  },
                  {
                    "ru-Cyrl": {
                      _desired: "hy-Armn",
                      _distance: "10",
                      _oneway: "true",
                    },
                  },
                  {
                    "en-Latn": {
                      _desired: "ka-Geor",
                      _distance: "10",
                      _oneway: "true",
                    },
                  },
                  {
                    "en-Latn": {
                      _desired: "km-Khmr",
                      _distance: "10",
                      _oneway: "true",
                    },
                  },
                  {
                    "en-Latn": {
                      _desired: "kn-Knda",
                      _distance: "10",
                      _oneway: "true",
                    },
                  },
                  {
                    "en-Latn": {
                      _desired: "lo-Laoo",
                      _distance: "10",
                      _oneway: "true",
                    },
                  },
                  {
                    "en-Latn": {
                      _desired: "ml-Mlym",
                      _distance: "10",
                      _oneway: "true",
                    },
                  },
                  {
                    "en-Latn": {
                      _desired: "my-Mymr",
                      _distance: "10",
                      _oneway: "true",
                    },
                  },
                  {
                    "en-Latn": {
                      _desired: "ne-Deva",
                      _distance: "10",
                      _oneway: "true",
                    },
                  },
                  {
                    "en-Latn": {
                      _desired: "or-Orya",
                      _distance: "10",
                      _oneway: "true",
                    },
                  },
                  {
                    "en-Latn": {
                      _desired: "pa-Guru",
                      _distance: "10",
                      _oneway: "true",
                    },
                  },
                  {
                    "en-Latn": {
                      _desired: "ps-Arab",
                      _distance: "10",
                      _oneway: "true",
                    },
                  },
                  {
                    "en-Latn": {
                      _desired: "sd-Arab",
                      _distance: "10",
                      _oneway: "true",
                    },
                  },
                  {
                    "en-Latn": {
                      _desired: "si-Sinh",
                      _distance: "10",
                      _oneway: "true",
                    },
                  },
                  {
                    "en-Latn": {
                      _desired: "ta-Taml",
                      _distance: "10",
                      _oneway: "true",
                    },
                  },
                  {
                    "en-Latn": {
                      _desired: "te-Telu",
                      _distance: "10",
                      _oneway: "true",
                    },
                  },
                  {
                    "en-Latn": {
                      _desired: "ti-Ethi",
                      _distance: "10",
                      _oneway: "true",
                    },
                  },
                  {
                    "ru-Cyrl": {
                      _desired: "tk-Latn",
                      _distance: "10",
                      _oneway: "true",
                    },
                  },
                  {
                    "en-Latn": {
                      _desired: "ur-Arab",
                      _distance: "10",
                      _oneway: "true",
                    },
                  },
                  {
                    "ru-Cyrl": {
                      _desired: "uz-Latn",
                      _distance: "10",
                      _oneway: "true",
                    },
                  },
                  {
                    "en-Latn": {
                      _desired: "yi-Hebr",
                      _distance: "10",
                      _oneway: "true",
                    },
                  },
                  { "sr-Cyrl": { _desired: "sr-Latn", _distance: "5" } },
                  {
                    "zh-Hans": {
                      _desired: "za-Latn",
                      _distance: "10",
                      _oneway: "true",
                    },
                  },
                  {
                    "zh-Hans": {
                      _desired: "zh-Hani",
                      _distance: "20",
                      _oneway: "true",
                    },
                  },
                  {
                    "zh-Hant": {
                      _desired: "zh-Hani",
                      _distance: "20",
                      _oneway: "true",
                    },
                  },
                  {
                    "ar-Arab": {
                      _desired: "ar-Latn",
                      _distance: "20",
                      _oneway: "true",
                    },
                  },
                  {
                    "bn-Beng": {
                      _desired: "bn-Latn",
                      _distance: "20",
                      _oneway: "true",
                    },
                  },
                  {
                    "gu-Gujr": {
                      _desired: "gu-Latn",
                      _distance: "20",
                      _oneway: "true",
                    },
                  },
                  {
                    "hi-Deva": {
                      _desired: "hi-Latn",
                      _distance: "20",
                      _oneway: "true",
                    },
                  },
                  {
                    "kn-Knda": {
                      _desired: "kn-Latn",
                      _distance: "20",
                      _oneway: "true",
                    },
                  },
                  {
                    "ml-Mlym": {
                      _desired: "ml-Latn",
                      _distance: "20",
                      _oneway: "true",
                    },
                  },
                  {
                    "mr-Deva": {
                      _desired: "mr-Latn",
                      _distance: "20",
                      _oneway: "true",
                    },
                  },
                  {
                    "ta-Taml": {
                      _desired: "ta-Latn",
                      _distance: "20",
                      _oneway: "true",
                    },
                  },
                  {
                    "te-Telu": {
                      _desired: "te-Latn",
                      _distance: "20",
                      _oneway: "true",
                    },
                  },
                  {
                    "zh-Hans": {
                      _desired: "zh-Latn",
                      _distance: "20",
                      _oneway: "true",
                    },
                  },
                  {
                    "ja-Jpan": {
                      _desired: "ja-Latn",
                      _distance: "5",
                      _oneway: "true",
                    },
                  },
                  {
                    "ja-Jpan": {
                      _desired: "ja-Hani",
                      _distance: "5",
                      _oneway: "true",
                    },
                  },
                  {
                    "ja-Jpan": {
                      _desired: "ja-Hira",
                      _distance: "5",
                      _oneway: "true",
                    },
                  },
                  {
                    "ja-Jpan": {
                      _desired: "ja-Kana",
                      _distance: "5",
                      _oneway: "true",
                    },
                  },
                  {
                    "ja-Jpan": {
                      _desired: "ja-Hrkt",
                      _distance: "5",
                      _oneway: "true",
                    },
                  },
                  {
                    "ja-Hrkt": {
                      _desired: "ja-Hira",
                      _distance: "5",
                      _oneway: "true",
                    },
                  },
                  {
                    "ja-Hrkt": {
                      _desired: "ja-Kana",
                      _distance: "5",
                      _oneway: "true",
                    },
                  },
                  {
                    "ko-Kore": {
                      _desired: "ko-Hani",
                      _distance: "5",
                      _oneway: "true",
                    },
                  },
                  {
                    "ko-Kore": {
                      _desired: "ko-Hang",
                      _distance: "5",
                      _oneway: "true",
                    },
                  },
                  {
                    "ko-Kore": {
                      _desired: "ko-Jamo",
                      _distance: "5",
                      _oneway: "true",
                    },
                  },
                  {
                    "ko-Hang": {
                      _desired: "ko-Jamo",
                      _distance: "5",
                      _oneway: "true",
                    },
                  },
                  { "*-*": { _desired: "*-*", _distance: "50" } },
                  {
                    "ar-*-$maghreb": {
                      _desired: "ar-*-$maghreb",
                      _distance: "4",
                    },
                  },
                  {
                    "ar-*-$!maghreb": {
                      _desired: "ar-*-$!maghreb",
                      _distance: "4",
                    },
                  },
                  { "ar-*-*": { _desired: "ar-*-*", _distance: "5" } },
                  { "en-*-$enUS": { _desired: "en-*-$enUS", _distance: "4" } },
                  { "en-*-GB": { _desired: "en-*-$!enUS", _distance: "3" } },
                  {
                    "en-*-$!enUS": { _desired: "en-*-$!enUS", _distance: "4" },
                  },
                  { "en-*-*": { _desired: "en-*-*", _distance: "5" } },
                  {
                    "es-*-$americas": {
                      _desired: "es-*-$americas",
                      _distance: "4",
                    },
                  },
                  {
                    "es-*-$!americas": {
                      _desired: "es-*-$!americas",
                      _distance: "4",
                    },
                  },
                  { "es-*-*": { _desired: "es-*-*", _distance: "5" } },
                  {
                    "pt-*-$americas": {
                      _desired: "pt-*-$americas",
                      _distance: "4",
                    },
                  },
                  {
                    "pt-*-$!americas": {
                      _desired: "pt-*-$!americas",
                      _distance: "4",
                    },
                  },
                  { "pt-*-*": { _desired: "pt-*-*", _distance: "5" } },
                  {
                    "zh-Hant-$cnsar": {
                      _desired: "zh-Hant-$cnsar",
                      _distance: "4",
                    },
                  },
                  {
                    "zh-Hant-$!cnsar": {
                      _desired: "zh-Hant-$!cnsar",
                      _distance: "4",
                    },
                  },
                  { "zh-Hant-*": { _desired: "zh-Hant-*", _distance: "5" } },
                  { "*-*-*": { _desired: "*-*-*", _distance: "4" } },
                ],
              },
            },
          }),
        a = {
          "001": [
            "001",
            "001-status-grouping",
            "002",
            "005",
            "009",
            "011",
            "013",
            "014",
            "015",
            "017",
            "018",
            "019",
            "021",
            "029",
            "030",
            "034",
            "035",
            "039",
            "053",
            "054",
            "057",
            "061",
            "142",
            "143",
            "145",
            "150",
            "151",
            "154",
            "155",
            "AC",
            "AD",
            "AE",
            "AF",
            "AG",
            "AI",
            "AL",
            "AM",
            "AO",
            "AQ",
            "AR",
            "AS",
            "AT",
            "AU",
            "AW",
            "AX",
            "AZ",
            "BA",
            "BB",
            "BD",
            "BE",
            "BF",
            "BG",
            "BH",
            "BI",
            "BJ",
            "BL",
            "BM",
            "BN",
            "BO",
            "BQ",
            "BR",
            "BS",
            "BT",
            "BV",
            "BW",
            "BY",
            "BZ",
            "CA",
            "CC",
            "CD",
            "CF",
            "CG",
            "CH",
            "CI",
            "CK",
            "CL",
            "CM",
            "CN",
            "CO",
            "CP",
            "CQ",
            "CR",
            "CU",
            "CV",
            "CW",
            "CX",
            "CY",
            "CZ",
            "DE",
            "DG",
            "DJ",
            "DK",
            "DM",
            "DO",
            "DZ",
            "EA",
            "EC",
            "EE",
            "EG",
            "EH",
            "ER",
            "ES",
            "ET",
            "EU",
            "EZ",
            "FI",
            "FJ",
            "FK",
            "FM",
            "FO",
            "FR",
            "GA",
            "GB",
            "GD",
            "GE",
            "GF",
            "GG",
            "GH",
            "GI",
            "GL",
            "GM",
            "GN",
            "GP",
            "GQ",
            "GR",
            "GS",
            "GT",
            "GU",
            "GW",
            "GY",
            "HK",
            "HM",
            "HN",
            "HR",
            "HT",
            "HU",
            "IC",
            "ID",
            "IE",
            "IL",
            "IM",
            "IN",
            "IO",
            "IQ",
            "IR",
            "IS",
            "IT",
            "JE",
            "JM",
            "JO",
            "JP",
            "KE",
            "KG",
            "KH",
            "KI",
            "KM",
            "KN",
            "KP",
            "KR",
            "KW",
            "KY",
            "KZ",
            "LA",
            "LB",
            "LC",
            "LI",
            "LK",
            "LR",
            "LS",
            "LT",
            "LU",
            "LV",
            "LY",
            "MA",
            "MC",
            "MD",
            "ME",
            "MF",
            "MG",
            "MH",
            "MK",
            "ML",
            "MM",
            "MN",
            "MO",
            "MP",
            "MQ",
            "MR",
            "MS",
            "MT",
            "MU",
            "MV",
            "MW",
            "MX",
            "MY",
            "MZ",
            "NA",
            "NC",
            "NE",
            "NF",
            "NG",
            "NI",
            "NL",
            "NO",
            "NP",
            "NR",
            "NU",
            "NZ",
            "OM",
            "PA",
            "PE",
            "PF",
            "PG",
            "PH",
            "PK",
            "PL",
            "PM",
            "PN",
            "PR",
            "PS",
            "PT",
            "PW",
            "PY",
            "QA",
            "QO",
            "RE",
            "RO",
            "RS",
            "RU",
            "RW",
            "SA",
            "SB",
            "SC",
            "SD",
            "SE",
            "SG",
            "SH",
            "SI",
            "SJ",
            "SK",
            "SL",
            "SM",
            "SN",
            "SO",
            "SR",
            "SS",
            "ST",
            "SV",
            "SX",
            "SY",
            "SZ",
            "TA",
            "TC",
            "TD",
            "TF",
            "TG",
            "TH",
            "TJ",
            "TK",
            "TL",
            "TM",
            "TN",
            "TO",
            "TR",
            "TT",
            "TV",
            "TW",
            "TZ",
            "UA",
            "UG",
            "UM",
            "UN",
            "US",
            "UY",
            "UZ",
            "VA",
            "VC",
            "VE",
            "VG",
            "VI",
            "VN",
            "VU",
            "WF",
            "WS",
            "XK",
            "YE",
            "YT",
            "ZA",
            "ZM",
            "ZW",
          ],
          "002": [
            "002",
            "002-status-grouping",
            "011",
            "014",
            "015",
            "017",
            "018",
            "202",
            "AO",
            "BF",
            "BI",
            "BJ",
            "BW",
            "CD",
            "CF",
            "CG",
            "CI",
            "CM",
            "CV",
            "DJ",
            "DZ",
            "EA",
            "EG",
            "EH",
            "ER",
            "ET",
            "GA",
            "GH",
            "GM",
            "GN",
            "GQ",
            "GW",
            "IC",
            "IO",
            "KE",
            "KM",
            "LR",
            "LS",
            "LY",
            "MA",
            "MG",
            "ML",
            "MR",
            "MU",
            "MW",
            "MZ",
            "NA",
            "NE",
            "NG",
            "RE",
            "RW",
            "SC",
            "SD",
            "SH",
            "SL",
            "SN",
            "SO",
            "SS",
            "ST",
            "SZ",
            "TD",
            "TF",
            "TG",
            "TN",
            "TZ",
            "UG",
            "YT",
            "ZA",
            "ZM",
            "ZW",
          ],
          "003": [
            "003",
            "013",
            "021",
            "029",
            "AG",
            "AI",
            "AW",
            "BB",
            "BL",
            "BM",
            "BQ",
            "BS",
            "BZ",
            "CA",
            "CR",
            "CU",
            "CW",
            "DM",
            "DO",
            "GD",
            "GL",
            "GP",
            "GT",
            "HN",
            "HT",
            "JM",
            "KN",
            "KY",
            "LC",
            "MF",
            "MQ",
            "MS",
            "MX",
            "NI",
            "PA",
            "PM",
            "PR",
            "SV",
            "SX",
            "TC",
            "TT",
            "US",
            "VC",
            "VG",
            "VI",
          ],
          "005": [
            "005",
            "AR",
            "BO",
            "BR",
            "BV",
            "CL",
            "CO",
            "EC",
            "FK",
            "GF",
            "GS",
            "GY",
            "PE",
            "PY",
            "SR",
            "UY",
            "VE",
          ],
          "009": [
            "009",
            "053",
            "054",
            "057",
            "061",
            "AC",
            "AQ",
            "AS",
            "AU",
            "CC",
            "CK",
            "CP",
            "CX",
            "DG",
            "FJ",
            "FM",
            "GU",
            "HM",
            "KI",
            "MH",
            "MP",
            "NC",
            "NF",
            "NR",
            "NU",
            "NZ",
            "PF",
            "PG",
            "PN",
            "PW",
            "QO",
            "SB",
            "TA",
            "TK",
            "TO",
            "TV",
            "UM",
            "VU",
            "WF",
            "WS",
          ],
          "011": [
            "011",
            "BF",
            "BJ",
            "CI",
            "CV",
            "GH",
            "GM",
            "GN",
            "GW",
            "LR",
            "ML",
            "MR",
            "NE",
            "NG",
            "SH",
            "SL",
            "SN",
            "TG",
          ],
          "013": ["013", "BZ", "CR", "GT", "HN", "MX", "NI", "PA", "SV"],
          "014": [
            "014",
            "BI",
            "DJ",
            "ER",
            "ET",
            "IO",
            "KE",
            "KM",
            "MG",
            "MU",
            "MW",
            "MZ",
            "RE",
            "RW",
            "SC",
            "SO",
            "SS",
            "TF",
            "TZ",
            "UG",
            "YT",
            "ZM",
            "ZW",
          ],
          "015": ["015", "DZ", "EA", "EG", "EH", "IC", "LY", "MA", "SD", "TN"],
          "017": ["017", "AO", "CD", "CF", "CG", "CM", "GA", "GQ", "ST", "TD"],
          "018": ["018", "BW", "LS", "NA", "SZ", "ZA"],
          "019": [
            "003",
            "005",
            "013",
            "019",
            "019-status-grouping",
            "021",
            "029",
            "419",
            "AG",
            "AI",
            "AR",
            "AW",
            "BB",
            "BL",
            "BM",
            "BO",
            "BQ",
            "BR",
            "BS",
            "BV",
            "BZ",
            "CA",
            "CL",
            "CO",
            "CR",
            "CU",
            "CW",
            "DM",
            "DO",
            "EC",
            "FK",
            "GD",
            "GF",
            "GL",
            "GP",
            "GS",
            "GT",
            "GY",
            "HN",
            "HT",
            "JM",
            "KN",
            "KY",
            "LC",
            "MF",
            "MQ",
            "MS",
            "MX",
            "NI",
            "PA",
            "PE",
            "PM",
            "PR",
            "PY",
            "SR",
            "SV",
            "SX",
            "TC",
            "TT",
            "US",
            "UY",
            "VC",
            "VE",
            "VG",
            "VI",
          ],
          "021": ["021", "BM", "CA", "GL", "PM", "US"],
          "029": [
            "029",
            "AG",
            "AI",
            "AW",
            "BB",
            "BL",
            "BQ",
            "BS",
            "CU",
            "CW",
            "DM",
            "DO",
            "GD",
            "GP",
            "HT",
            "JM",
            "KN",
            "KY",
            "LC",
            "MF",
            "MQ",
            "MS",
            "PR",
            "SX",
            "TC",
            "TT",
            "VC",
            "VG",
            "VI",
          ],
          "030": ["030", "CN", "HK", "JP", "KP", "KR", "MN", "MO", "TW"],
          "034": ["034", "AF", "BD", "BT", "IN", "IR", "LK", "MV", "NP", "PK"],
          "035": [
            "035",
            "BN",
            "ID",
            "KH",
            "LA",
            "MM",
            "MY",
            "PH",
            "SG",
            "TH",
            "TL",
            "VN",
          ],
          "039": [
            "039",
            "AD",
            "AL",
            "BA",
            "ES",
            "GI",
            "GR",
            "HR",
            "IT",
            "ME",
            "MK",
            "MT",
            "PT",
            "RS",
            "SI",
            "SM",
            "VA",
            "XK",
          ],
          "053": ["053", "AU", "CC", "CX", "HM", "NF", "NZ"],
          "054": ["054", "FJ", "NC", "PG", "SB", "VU"],
          "057": ["057", "FM", "GU", "KI", "MH", "MP", "NR", "PW", "UM"],
          "061": [
            "061",
            "AS",
            "CK",
            "NU",
            "PF",
            "PN",
            "TK",
            "TO",
            "TV",
            "WF",
            "WS",
          ],
          142: [
            "030",
            "034",
            "035",
            "142",
            "143",
            "145",
            "AE",
            "AF",
            "AM",
            "AZ",
            "BD",
            "BH",
            "BN",
            "BT",
            "CN",
            "CY",
            "GE",
            "HK",
            "ID",
            "IL",
            "IN",
            "IQ",
            "IR",
            "JO",
            "JP",
            "KG",
            "KH",
            "KP",
            "KR",
            "KW",
            "KZ",
            "LA",
            "LB",
            "LK",
            "MM",
            "MN",
            "MO",
            "MV",
            "MY",
            "NP",
            "OM",
            "PH",
            "PK",
            "PS",
            "QA",
            "SA",
            "SG",
            "SY",
            "TH",
            "TJ",
            "TL",
            "TM",
            "TR",
            "TW",
            "UZ",
            "VN",
            "YE",
          ],
          143: ["143", "KG", "KZ", "TJ", "TM", "UZ"],
          145: [
            "145",
            "AE",
            "AM",
            "AZ",
            "BH",
            "CY",
            "GE",
            "IL",
            "IQ",
            "JO",
            "KW",
            "LB",
            "OM",
            "PS",
            "QA",
            "SA",
            "SY",
            "TR",
            "YE",
          ],
          150: [
            "039",
            "150",
            "151",
            "154",
            "155",
            "AD",
            "AL",
            "AT",
            "AX",
            "BA",
            "BE",
            "BG",
            "BY",
            "CH",
            "CQ",
            "CZ",
            "DE",
            "DK",
            "EE",
            "ES",
            "FI",
            "FO",
            "FR",
            "GB",
            "GG",
            "GI",
            "GR",
            "HR",
            "HU",
            "IE",
            "IM",
            "IS",
            "IT",
            "JE",
            "LI",
            "LT",
            "LU",
            "LV",
            "MC",
            "MD",
            "ME",
            "MK",
            "MT",
            "NL",
            "NO",
            "PL",
            "PT",
            "RO",
            "RS",
            "RU",
            "SE",
            "SI",
            "SJ",
            "SK",
            "SM",
            "UA",
            "VA",
            "XK",
          ],
          151: [
            "151",
            "BG",
            "BY",
            "CZ",
            "HU",
            "MD",
            "PL",
            "RO",
            "RU",
            "SK",
            "UA",
          ],
          154: [
            "154",
            "AX",
            "CQ",
            "DK",
            "EE",
            "FI",
            "FO",
            "GB",
            "GG",
            "IE",
            "IM",
            "IS",
            "JE",
            "LT",
            "LV",
            "NO",
            "SE",
            "SJ",
          ],
          155: ["155", "AT", "BE", "CH", "DE", "FR", "LI", "LU", "MC", "NL"],
          202: [
            "011",
            "014",
            "017",
            "018",
            "202",
            "AO",
            "BF",
            "BI",
            "BJ",
            "BW",
            "CD",
            "CF",
            "CG",
            "CI",
            "CM",
            "CV",
            "DJ",
            "ER",
            "ET",
            "GA",
            "GH",
            "GM",
            "GN",
            "GQ",
            "GW",
            "IO",
            "KE",
            "KM",
            "LR",
            "LS",
            "MG",
            "ML",
            "MR",
            "MU",
            "MW",
            "MZ",
            "NA",
            "NE",
            "NG",
            "RE",
            "RW",
            "SC",
            "SH",
            "SL",
            "SN",
            "SO",
            "SS",
            "ST",
            "SZ",
            "TD",
            "TF",
            "TG",
            "TZ",
            "UG",
            "YT",
            "ZA",
            "ZM",
            "ZW",
          ],
          419: [
            "005",
            "013",
            "029",
            "419",
            "AG",
            "AI",
            "AR",
            "AW",
            "BB",
            "BL",
            "BO",
            "BQ",
            "BR",
            "BS",
            "BV",
            "BZ",
            "CL",
            "CO",
            "CR",
            "CU",
            "CW",
            "DM",
            "DO",
            "EC",
            "FK",
            "GD",
            "GF",
            "GP",
            "GS",
            "GT",
            "GY",
            "HN",
            "HT",
            "JM",
            "KN",
            "KY",
            "LC",
            "MF",
            "MQ",
            "MS",
            "MX",
            "NI",
            "PA",
            "PE",
            "PR",
            "PY",
            "SR",
            "SV",
            "SX",
            "TC",
            "TT",
            "UY",
            "VC",
            "VE",
            "VG",
            "VI",
          ],
          EU: [
            "AT",
            "BE",
            "BG",
            "CY",
            "CZ",
            "DE",
            "DK",
            "EE",
            "ES",
            "EU",
            "FI",
            "FR",
            "GR",
            "HR",
            "HU",
            "IE",
            "IT",
            "LT",
            "LU",
            "LV",
            "MT",
            "NL",
            "PL",
            "PT",
            "RO",
            "SE",
            "SI",
            "SK",
          ],
          EZ: [
            "AT",
            "BE",
            "CY",
            "DE",
            "EE",
            "ES",
            "EZ",
            "FI",
            "FR",
            "GR",
            "IE",
            "IT",
            "LT",
            "LU",
            "LV",
            "MT",
            "NL",
            "PT",
            "SI",
            "SK",
          ],
          QO: ["AC", "AQ", "CP", "DG", "QO", "TA"],
          UN: [
            "AD",
            "AE",
            "AF",
            "AG",
            "AL",
            "AM",
            "AO",
            "AR",
            "AT",
            "AU",
            "AZ",
            "BA",
            "BB",
            "BD",
            "BE",
            "BF",
            "BG",
            "BH",
            "BI",
            "BJ",
            "BN",
            "BO",
            "BR",
            "BS",
            "BT",
            "BW",
            "BY",
            "BZ",
            "CA",
            "CD",
            "CF",
            "CG",
            "CH",
            "CI",
            "CL",
            "CM",
            "CN",
            "CO",
            "CR",
            "CU",
            "CV",
            "CY",
            "CZ",
            "DE",
            "DJ",
            "DK",
            "DM",
            "DO",
            "DZ",
            "EC",
            "EE",
            "EG",
            "ER",
            "ES",
            "ET",
            "FI",
            "FJ",
            "FM",
            "FR",
            "GA",
            "GB",
            "GD",
            "GE",
            "GH",
            "GM",
            "GN",
            "GQ",
            "GR",
            "GT",
            "GW",
            "GY",
            "HN",
            "HR",
            "HT",
            "HU",
            "ID",
            "IE",
            "IL",
            "IN",
            "IQ",
            "IR",
            "IS",
            "IT",
            "JM",
            "JO",
            "JP",
            "KE",
            "KG",
            "KH",
            "KI",
            "KM",
            "KN",
            "KP",
            "KR",
            "KW",
            "KZ",
            "LA",
            "LB",
            "LC",
            "LI",
            "LK",
            "LR",
            "LS",
            "LT",
            "LU",
            "LV",
            "LY",
            "MA",
            "MC",
            "MD",
            "ME",
            "MG",
            "MH",
            "MK",
            "ML",
            "MM",
            "MN",
            "MR",
            "MT",
            "MU",
            "MV",
            "MW",
            "MX",
            "MY",
            "MZ",
            "NA",
            "NE",
            "NG",
            "NI",
            "NL",
            "NO",
            "NP",
            "NR",
            "NZ",
            "OM",
            "PA",
            "PE",
            "PG",
            "PH",
            "PK",
            "PL",
            "PT",
            "PW",
            "PY",
            "QA",
            "RO",
            "RS",
            "RU",
            "RW",
            "SA",
            "SB",
            "SC",
            "SD",
            "SE",
            "SG",
            "SI",
            "SK",
            "SL",
            "SM",
            "SN",
            "SO",
            "SR",
            "SS",
            "ST",
            "SV",
            "SY",
            "SZ",
            "TD",
            "TG",
            "TH",
            "TJ",
            "TL",
            "TM",
            "TN",
            "TO",
            "TR",
            "TT",
            "TV",
            "TZ",
            "UA",
            "UG",
            "UN",
            "US",
            "UY",
            "UZ",
            "VC",
            "VE",
            "VN",
            "VU",
            "WS",
            "YE",
            "ZA",
            "ZM",
            "ZW",
          ],
        },
        o = /-u(?:-[0-9a-z]{2,8})+/gi;
      function l(e, t, r) {
        if ((void 0 === r && (r = Error), !e)) throw new r(t);
      }
      function u(e, t, r) {
        var i = t.split("-"),
          s = i[0],
          o = i[1],
          l = i[2],
          u = !0;
        if (l && "$" === l[0]) {
          var c = "!" !== l[1],
            d = (c ? r[l.slice(1)] : r[l.slice(2)])
              .map(function (e) {
                return a[e] || [e];
              })
              .reduce(function (e, t) {
                return n(n([], e, !0), t, !0);
              }, []);
          u && (u = d.indexOf(e.region || "") > 1 == c);
        } else u && (u = !e.region || "*" === l || l === e.region);
        return (
          u && (u = !e.script || "*" === o || o === e.script),
          u && (u = !e.language || "*" === s || s === e.language),
          u
        );
      }
      function c(e) {
        return [e.language, e.script, e.region].filter(Boolean).join("-");
      }
      function d(e, t, r) {
        for (var n = 0, i = r.matches; n < i.length; n++) {
          var s = i[n],
            a =
              u(e, s.desired, r.matchVariables) &&
              u(t, s.supported, r.matchVariables);
          if (
            (s.oneway ||
              a ||
              (a =
                u(e, s.supported, r.matchVariables) &&
                u(t, s.desired, r.matchVariables)),
            a)
          ) {
            var o = 10 * s.distance;
            if (
              r.paradigmLocales.indexOf(c(e)) > -1 !=
              r.paradigmLocales.indexOf(c(t)) > -1
            )
              return o - 1;
            return o;
          }
        }
        throw Error("No matching distance found");
      }
      function h(e) {
        return Intl.getCanonicalLocales(e)[0];
      }
      function f(e, t) {
        for (var r = t; ; ) {
          if (e.indexOf(r) > -1) return r;
          var n = r.lastIndexOf("-");
          if (!~n) return;
          n >= 2 && "-" === r[n - 2] && (n -= 2), (r = r.slice(0, n));
        }
      }
      function p(e, t, r, a, u, c) {
        "lookup" === r.localeMatcher
          ? (_ = (function (e, t, r) {
              for (var n = { locale: "" }, i = 0; i < t.length; i++) {
                var s = t[i],
                  a = s.replace(o, ""),
                  l = f(e, a);
                if (l)
                  return (
                    (n.locale = l),
                    s !== a && (n.extension = s.slice(a.length, s.length)),
                    n
                  );
              }
              return (n.locale = r()), n;
            })(Array.from(e), t, c))
          : ((m = Array.from(e)),
            (v = []),
            (b = t.reduce(function (e, t) {
              var r = t.replace(o, "");
              return v.push(r), (e[r] = t), e;
            }, {})),
            (void 0 === S && (S = 838),
            (E = 1 / 0),
            (k = { matchedDesiredLocale: "", distances: {} }),
            v.forEach(function (e, t) {
              k.distances[e] || (k.distances[e] = {}),
                m.forEach(function (r) {
                  var a,
                    o,
                    l,
                    u,
                    c,
                    h,
                    f =
                      ((a = new Intl.Locale(e).maximize()),
                      (o = new Intl.Locale(r).maximize()),
                      (l = {
                        language: a.language,
                        script: a.script || "",
                        region: a.region || "",
                      }),
                      (u = {
                        language: o.language,
                        script: o.script || "",
                        region: o.region || "",
                      }),
                      (c = 0),
                      (h = (function () {
                        var e, t;
                        if (!i) {
                          var r =
                              null ==
                              (t =
                                null ==
                                (e =
                                  s.supplemental.languageMatching[
                                    "written-new"
                                  ][0])
                                  ? void 0
                                  : e.paradigmLocales)
                                ? void 0
                                : t._locales.split(" "),
                            a = s.supplemental.languageMatching[
                              "written-new"
                            ].slice(1, 5);
                          i = {
                            matches: s.supplemental.languageMatching[
                              "written-new"
                            ]
                              .slice(5)
                              .map(function (e) {
                                var t = Object.keys(e)[0],
                                  r = e[t];
                                return {
                                  supported: t,
                                  desired: r._desired,
                                  distance: +r._distance,
                                  oneway: "true" === r.oneway,
                                };
                              }, {}),
                            matchVariables: a.reduce(function (e, t) {
                              var r = Object.keys(t)[0],
                                n = t[r];
                              return (e[r.slice(1)] = n._value.split("+")), e;
                            }, {}),
                            paradigmLocales: n(
                              n([], r, !0),
                              r.map(function (e) {
                                return new Intl.Locale(e.replace(/_/g, "-"))
                                  .maximize()
                                  .toString();
                              }),
                              !0,
                            ),
                          };
                        }
                        return i;
                      })()),
                      l.language !== u.language &&
                        (c += d(
                          { language: a.language, script: "", region: "" },
                          { language: o.language, script: "", region: "" },
                          h,
                        )),
                      l.script !== u.script &&
                        (c += d(
                          {
                            language: a.language,
                            script: l.script,
                            region: "",
                          },
                          {
                            language: o.language,
                            script: l.script,
                            region: "",
                          },
                          h,
                        )),
                      l.region !== u.region && (c += d(l, u, h)),
                      c + 0 + 40 * t);
                  (k.distances[e][r] = f),
                    f < E &&
                      ((E = f),
                      (k.matchedDesiredLocale = e),
                      (k.matchedSupportedLocale = r));
                });
            }),
            E >= S &&
              ((k.matchedDesiredLocale = void 0),
              (k.matchedSupportedLocale = void 0)),
            (x = k)).matchedSupportedLocale &&
              x.matchedDesiredLocale &&
              ((y = x.matchedSupportedLocale),
              (w =
                b[x.matchedDesiredLocale].slice(
                  x.matchedDesiredLocale.length,
                ) || void 0)),
            (_ = y ? { locale: y, extension: w } : { locale: c() })),
          null == _ && (_ = { locale: c(), extension: "" });
        var p,
          _,
          g,
          m,
          y,
          w,
          v,
          b,
          S,
          E,
          k,
          x,
          T = _.locale,
          R = u[T],
          C = { locale: "en", dataLocale: T };
        g = _.extension
          ? (function (e) {
              l(e === e.toLowerCase(), "Expected extension to be lowercase"),
                l(
                  "-u-" === e.slice(0, 3),
                  "Expected extension to be a Unicode locale extension",
                );
              for (var t, r = [], n = [], i = e.length, s = 3; s < i; ) {
                var a = e.indexOf("-", s),
                  o = void 0;
                o = -1 === a ? i - s : a - s;
                var u = e.slice(s, s + o);
                l(o >= 2, "Expected a subtag to have at least 2 characters"),
                  void 0 === t && 2 != o
                    ? -1 === r.indexOf(u) && r.push(u)
                    : 2 === o
                      ? ((t = { key: u, value: "" }),
                        void 0 ===
                          n.find(function (e) {
                            return e.key === (null == t ? void 0 : t.key);
                          }) && n.push(t))
                      : (null == t ? void 0 : t.value) === ""
                        ? (t.value = u)
                        : (l(void 0 !== t, "Expected keyword to be defined"),
                          (t.value += "-" + u)),
                  (s += o + 1);
              }
              return { attributes: r, keywords: n };
            })(_.extension).keywords
          : [];
        for (
          var P = [],
            O = function (e) {
              var t,
                n,
                i = null != (p = null == R ? void 0 : R[e]) ? p : [];
              l(
                Array.isArray(i),
                "keyLocaleData for ".concat(e, " must be an array"),
              );
              var s = i[0];
              l(
                void 0 === s || "string" == typeof s,
                "value must be a string or undefined",
              );
              var a = void 0,
                o = g.find(function (t) {
                  return t.key === e;
                });
              if (o) {
                var u = o.value;
                "" !== u
                  ? i.indexOf(u) > -1 && (a = { key: e, value: (s = u) })
                  : i.indexOf("true") > -1 &&
                    (a = { key: e, value: (s = "true") });
              }
              var c = r[e];
              l(
                null == c || "string" == typeof c,
                "optionsValue must be a string or undefined",
              ),
                "string" == typeof c &&
                  ((t = e.toLowerCase()),
                  (n = c.toLowerCase()),
                  l(void 0 !== t, "ukey must be defined"),
                  "" === (c = n) && (c = "true")),
                c !== s && i.indexOf(c) > -1 && ((s = c), (a = void 0)),
                a && P.push(a),
                (C[e] = s);
            },
            A = 0;
          A < a.length;
          A++
        )
          O(a[A]);
        var I = [];
        return (
          P.length > 0 &&
            (T = (function (e, t, r) {
              l(
                -1 === e.indexOf("-u-"),
                "Expected locale to not have a Unicode locale extension",
              );
              for (var n, i = "-u", s = 0; s < t.length; s++) {
                var a = t[s];
                i += "-".concat(a);
              }
              for (var o = 0; o < r.length; o++) {
                var u = r[o],
                  c = u.key,
                  d = u.value;
                (i += "-".concat(c)), "" !== d && (i += "-".concat(d));
              }
              if ("-u" === i) return h(e);
              var f = e.indexOf("-x-");
              return h(-1 === f ? e + i : e.slice(0, f) + i + e.slice(f));
            })(T, [], P)),
          (C.locale = T),
          C
        );
      }
      function _(e, t) {
        for (var r = [], n = 0; n < t.length; n++) {
          var i = f(e, t[n].replace(o, ""));
          i && r.push(i);
        }
        return r;
      }
      function g(e, t, r, n) {
        return p(
          t,
          Intl.getCanonicalLocales(e),
          { localeMatcher: (null == n ? void 0 : n.algorithm) || "best fit" },
          [],
          {},
          function () {
            return r;
          },
        ).locale;
      }
    },
    14406: (e, t, r) => {
      "use strict";
      t.A = r(75007).default;
    },
    14773: function (e, t, r) {
      "use strict";
      var n =
        (this && this.__importDefault) ||
        function (e) {
          return e && e.__esModule ? e : { default: e };
        };
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.PostgrestError =
          t.PostgrestBuilder =
          t.PostgrestTransformBuilder =
          t.PostgrestFilterBuilder =
          t.PostgrestQueryBuilder =
          t.PostgrestClient =
            void 0);
      let i = n(r(12531));
      t.PostgrestClient = i.default;
      let s = n(r(11863));
      t.PostgrestQueryBuilder = s.default;
      let a = n(r(60643));
      t.PostgrestFilterBuilder = a.default;
      let o = n(r(94703));
      t.PostgrestTransformBuilder = o.default;
      let l = n(r(94013));
      t.PostgrestBuilder = l.default;
      let u = n(r(87065));
      (t.PostgrestError = u.default),
        (t.default = {
          PostgrestClient: i.default,
          PostgrestQueryBuilder: s.default,
          PostgrestFilterBuilder: a.default,
          PostgrestTransformBuilder: o.default,
          PostgrestBuilder: l.default,
          PostgrestError: u.default,
        });
    },
    15772: (e, t, r) => {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 });
      var n = r(53443);
      function i(e, t) {
        let r =
            !(arguments.length > 2 && void 0 !== arguments[2]) || arguments[2],
          i = e.map((e) => [e, n.getLocalePrefix(e, t)]);
        return r && i.sort((e, t) => t[1].length - e[1].length), i;
      }
      function s(e, t) {
        let r = n.normalizeTrailingSlash(t),
          i = n.normalizeTrailingSlash(e),
          s = n.templateToRegex(i).exec(r);
        if (!s) return;
        let a = {};
        for (let e = 1; e < s.length; e++) {
          var o;
          let t =
            null == (o = i.match(/\[([^\]]+)\]/g))
              ? void 0
              : o[e - 1].replace(/[[\]]/g, "");
          t && (a[t] = s[e]);
        }
        return a;
      }
      function a(e, t) {
        if (!t) return e;
        let r = (e = e.replace(/\[\[/g, "[").replace(/\]\]/g, "]"));
        return (
          Object.entries(t).forEach((e) => {
            let [t, n] = e;
            r = r.replace("[".concat(t, "]"), n);
          }),
          r
        );
      }
      function o(e, t) {
        return t.defaultLocale === e || !t.locales || t.locales.includes(e);
      }
      (t.applyBasePath = function (e, t) {
        return n.normalizeTrailingSlash(t + e);
      }),
        (t.formatPathname = function (e, t, r) {
          let i = e;
          return t && (i = n.prefixPathname(t, i)), r && (i += r), i;
        }),
        (t.formatPathnameTemplate = a),
        (t.formatTemplatePathname = function (e, t, r, i) {
          let o = "";
          return (o += a(r, s(t, e))), (o = n.normalizeTrailingSlash(o));
        }),
        (t.getBestMatchingDomain = function (e, t, r) {
          let n;
          return (
            e && o(t, e) && (n = e),
            n || (n = r.find((e) => e.defaultLocale === t)),
            n ||
              (n = r.find((e) => {
                var r;
                return null == (r = e.locales) ? void 0 : r.includes(t);
              })),
            n || null != (null == e ? void 0 : e.locales) || (n = e),
            n || (n = r.find((e) => !e.locales)),
            n
          );
        }),
        (t.getHost = function (e) {
          var t, r;
          return null !=
            (t = null != (r = e.get("x-forwarded-host")) ? r : e.get("host"))
            ? t
            : void 0;
        }),
        (t.getInternalTemplate = function (e, t, r) {
          for (let i of n.getSortedPathnames(Object.keys(e))) {
            let s = e[i];
            if ("string" == typeof s) {
              if (n.matchesPathname(s, t)) return [void 0, i];
            } else {
              let e = Object.entries(s),
                a = e.findIndex((e) => {
                  let [t] = e;
                  return t === r;
                });
              for (let [r, s] of (a > 0 && e.unshift(e.splice(a, 1)[0]), e))
                if (n.matchesPathname(s, t)) return [r, i];
            }
          }
          for (let r of Object.keys(e))
            if (n.matchesPathname(r, t)) return [void 0, r];
          return [void 0, void 0];
        }),
        (t.getLocaleAsPrefix = function (e) {
          return "/".concat(e);
        }),
        (t.getLocalePrefixes = i),
        (t.getNormalizedPathname = function (e, t, r) {
          e.endsWith("/") || (e += "/");
          let s = i(t, r),
            a = RegExp(
              "^(".concat(
                s
                  .map((e) => {
                    let [, t] = e;
                    return t.replaceAll("/", "\\/");
                  })
                  .join("|"),
                ")/(.*)",
              ),
              "i",
            ),
            o = e.match(a),
            l = o ? "/" + o[2] : e;
          return "/" !== l && (l = n.normalizeTrailingSlash(l)), l;
        }),
        (t.getPathnameMatch = function (e, t, r) {
          for (let [n, s] of i(t, r)) {
            let t, r;
            if (e === s || e.startsWith(s + "/")) t = r = !0;
            else {
              let n = e.toLowerCase(),
                i = s.toLowerCase();
              (n === i || n.startsWith(i + "/")) && ((t = !1), (r = !0));
            }
            if (r)
              return {
                locale: n,
                prefix: s,
                matchedPrefix: e.slice(0, s.length),
                exact: t,
              };
          }
        }),
        (t.getRouteParams = s),
        (t.isLocaleSupportedOnDomain = o),
        (t.sanitizePathname = function (e) {
          return e.replace(/\\/g, "%5C").replace(/\/+/g, "/");
        });
    },
    17255: (e, t) => {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.HEADER_LOCALE_NAME = "X-NEXT-INTL-LOCALE"),
        (t.LOCALE_SEGMENT_NAME = "locale");
    },
    18947: (e, t, r) => {
      "use strict";
      function n() {
        throw Object.defineProperty(
          Error(
            'ImageResponse moved from "next/server" to "next/og" since Next.js 14, please import from "next/og" instead',
          ),
          "__NEXT_ERROR_CODE",
          { value: "E183", enumerable: !1, configurable: !0 },
        );
      }
      r.r(t),
        r.d(t, {
          ImageResponse: () => n,
          NextRequest: () => i.J,
          NextResponse: () => s.R,
          URLPattern: () => c,
          after: () => h,
          connection: () => T,
          unstable_rootParams: () => A,
          userAgent: () => u,
          userAgentFromString: () => l,
        });
      var i = r(87848),
        s = r(79590),
        a = r(45807),
        o = r.n(a);
      function l(e) {
        return {
          ...o()(e),
          isBot:
            void 0 !== e &&
            /Googlebot|Mediapartners-Google|AdsBot-Google|googleweblight|Storebot-Google|Google-PageRenderer|Google-InspectionTool|Bingbot|BingPreview|Slurp|DuckDuckBot|baiduspider|yandex|sogou|LinkedInBot|bitlybot|tumblr|vkShare|quora link preview|facebookexternalhit|facebookcatalog|Twitterbot|applebot|redditbot|Slackbot|Discordbot|WhatsApp|SkypeUriPreview|ia_archiver/i.test(
              e,
            ),
        };
      }
      function u({ headers: e }) {
        return l(e.get("user-agent") || void 0);
      }
      let c = "undefined" == typeof URLPattern ? void 0 : URLPattern;
      var d = r(35264);
      function h(e) {
        let t = d.J.getStore();
        if (!t)
          throw Object.defineProperty(
            Error(
              "`after` was called outside a request scope. Read more: https://nextjs.org/docs/messages/next-dynamic-api-wrong-context",
            ),
            "__NEXT_ERROR_CODE",
            { value: "E468", enumerable: !1, configurable: !0 },
          );
        let { afterContext: r } = t;
        return r.after(e);
      }
      var f = r(21261),
        p = r(7688);
      class _ extends Error {
        constructor(e) {
          super("Dynamic server usage: " + e),
            (this.description = e),
            (this.digest = "DYNAMIC_SERVER_USAGE");
        }
      }
      class g extends Error {
        constructor(...e) {
          super(...e), (this.code = "NEXT_STATIC_GEN_BAILOUT");
        }
      }
      class m extends Error {
        constructor(e) {
          super(
            `During prerendering, ${e} rejects when the prerender is complete. Typically these errors are handled by React but if you move ${e} to a different context by using \`setTimeout\`, \`after\`, or similar functions you may observe this error and you should handle it in that context.`,
          ),
            (this.expression = e),
            (this.digest = "HANGING_PROMISE_REJECTION");
        }
      }
      let y = new WeakMap();
      function w(e, t) {
        if (e.aborted) return Promise.reject(new m(t));
        {
          let r = new Promise((r, n) => {
            let i = n.bind(null, new m(t)),
              s = y.get(e);
            if (s) s.push(i);
            else {
              let t = [i];
              y.set(e, t),
                e.addEventListener(
                  "abort",
                  () => {
                    for (let e = 0; e < t.length; e++) t[e]();
                  },
                  { once: !0 },
                );
            }
          });
          return r.catch(v), r;
        }
      }
      function v() {}
      let b = "function" == typeof p.unstable_postpone;
      function S(e, t, r) {
        let n = Object.defineProperty(
          new _(
            `Route ${t.route} couldn't be rendered statically because it used \`${e}\`. See more info here: https://nextjs.org/docs/messages/dynamic-server-error`,
          ),
          "__NEXT_ERROR_CODE",
          { value: "E558", enumerable: !1, configurable: !0 },
        );
        throw (
          ((r.revalidate = 0),
          (t.dynamicUsageDescription = e),
          (t.dynamicUsageStack = n.stack),
          n)
        );
      }
      function E(e, t, r) {
        (function () {
          if (!b)
            throw Object.defineProperty(
              Error(
                "Invariant: React.unstable_postpone is not defined. This suggests the wrong version of React was loaded. This is a bug in Next.js",
              ),
              "__NEXT_ERROR_CODE",
              { value: "E224", enumerable: !1, configurable: !0 },
            );
        })(),
          r &&
            r.dynamicAccesses.push({
              stack: r.isDebugDynamicAccesses ? Error().stack : void 0,
              expression: t,
            }),
          p.unstable_postpone(k(e, t));
      }
      function k(e, t) {
        return `Route ${e} needs to bail out of prerendering at this point because it used ${t}. React throws this special object to indicate where. It should not be caught by your own try/catch. Learn more: https://nextjs.org/docs/messages/ppr-caught-error`;
      }
      if (
        !1 ===
        (function (e) {
          return (
            e.includes(
              "needs to bail out of prerendering at this point because it used",
            ) &&
            e.includes(
              "Learn more: https://nextjs.org/docs/messages/ppr-caught-error",
            )
          );
        })(k("%%%", "^^^"))
      )
        throw Object.defineProperty(
          Error(
            "Invariant: isDynamicPostpone misidentified a postpone reason. This is a bug in Next.js",
          ),
          "__NEXT_ERROR_CODE",
          { value: "E296", enumerable: !1, configurable: !0 },
        );
      RegExp(`\\n\\s+at __next_metadata_boundary__[\\n\\s]`),
        RegExp(`\\n\\s+at __next_viewport_boundary__[\\n\\s]`),
        RegExp(`\\n\\s+at __next_outlet_boundary__[\\n\\s]`);
      var x = r(71659);
      function T() {
        let e = d.J.getStore(),
          t = f.FP.getStore();
        if (e) {
          if (
            t &&
            "after" === t.phase &&
            !(function () {
              let e = x.Z.getStore();
              return (null == e ? void 0 : e.rootTaskSpawnPhase) === "action";
            })()
          )
            throw Object.defineProperty(
              Error(
                `Route ${e.route} used "connection" inside "after(...)". The \`connection()\` function is used to indicate the subsequent code must only run when there is an actual Request, but "after(...)" executes after the request, so this function is not allowed in this scope. See more info here: https://nextjs.org/docs/canary/app/api-reference/functions/after`,
              ),
              "__NEXT_ERROR_CODE",
              { value: "E186", enumerable: !1, configurable: !0 },
            );
          if (e.forceStatic) return Promise.resolve(void 0);
          if (t) {
            if ("cache" === t.type)
              throw Object.defineProperty(
                Error(
                  `Route ${e.route} used "connection" inside "use cache". The \`connection()\` function is used to indicate the subsequent code must only run when there is an actual Request, but caches must be able to be produced before a Request so this function is not allowed in this scope. See more info here: https://nextjs.org/docs/messages/next-request-in-use-cache`,
                ),
                "__NEXT_ERROR_CODE",
                { value: "E111", enumerable: !1, configurable: !0 },
              );
            else if ("unstable-cache" === t.type)
              throw Object.defineProperty(
                Error(
                  `Route ${e.route} used "connection" inside a function cached with "unstable_cache(...)". The \`connection()\` function is used to indicate the subsequent code must only run when there is an actual Request, but caches must be able to be produced before a Request so this function is not allowed in this scope. See more info here: https://nextjs.org/docs/app/api-reference/functions/unstable_cache`,
                ),
                "__NEXT_ERROR_CODE",
                { value: "E1", enumerable: !1, configurable: !0 },
              );
          }
          if (e.dynamicShouldError)
            throw Object.defineProperty(
              new g(
                `Route ${e.route} with \`dynamic = "error"\` couldn't be rendered statically because it used \`connection\`. See more info here: https://nextjs.org/docs/app/building-your-application/rendering/static-and-dynamic#dynamic-rendering`,
              ),
              "__NEXT_ERROR_CODE",
              { value: "E562", enumerable: !1, configurable: !0 },
            );
          if (t)
            if ("prerender" === t.type)
              return w(t.renderSignal, "`connection()`");
            else
              "prerender-ppr" === t.type
                ? E(e.route, "connection", t.dynamicTracking)
                : "prerender-legacy" === t.type && S("connection", e, t);
          t &&
            "cache" !== t.type &&
            "unstable-cache" !== t.type &&
            ("prerender" === t.type || "prerender-legacy" === t.type) &&
            (t.revalidate = 0);
        }
        return Promise.resolve(void 0);
      }
      var R = r(25503);
      let C = /^[A-Za-z_$][A-Za-z0-9_$]*$/,
        P = new Set([
          "hasOwnProperty",
          "isPrototypeOf",
          "propertyIsEnumerable",
          "toString",
          "valueOf",
          "toLocaleString",
          "then",
          "catch",
          "finally",
          "status",
          "displayName",
          "toJSON",
          "$$typeof",
          "__esModule",
        ]),
        O = new WeakMap();
      async function A() {
        let e = d.J.getStore();
        if (!e)
          throw Object.defineProperty(
            new R.z("Missing workStore in unstable_rootParams"),
            "__NEXT_ERROR_CODE",
            { value: "E615", enumerable: !1, configurable: !0 },
          );
        let t = f.FP.getStore();
        if (!t)
          throw Object.defineProperty(
            Error(
              `Route ${e.route} used \`unstable_rootParams()\` in Pages Router. This API is only available within App Router.`,
            ),
            "__NEXT_ERROR_CODE",
            { value: "E641", enumerable: !1, configurable: !0 },
          );
        switch (t.type) {
          case "unstable-cache":
          case "cache":
            throw Object.defineProperty(
              Error(
                `Route ${e.route} used \`unstable_rootParams()\` inside \`"use cache"\` or \`unstable_cache\`. Support for this API inside cache scopes is planned for a future version of Next.js.`,
              ),
              "__NEXT_ERROR_CODE",
              { value: "E642", enumerable: !1, configurable: !0 },
            );
          case "prerender":
          case "prerender-ppr":
          case "prerender-legacy":
            return (function (e, t, r) {
              let n = t.fallbackRouteParams;
              if (n) {
                let l = !1;
                for (let t in e)
                  if (n.has(t)) {
                    l = !0;
                    break;
                  }
                if (l) {
                  if ("prerender" === r.type) {
                    let t = O.get(e);
                    if (t) return t;
                    let n = w(r.renderSignal, "`unstable_rootParams`");
                    return O.set(e, n), n;
                  }
                  var i = e,
                    s = n,
                    a = t,
                    o = r;
                  let l = O.get(i);
                  if (l) return l;
                  let u = { ...i },
                    c = Promise.resolve(u);
                  return (
                    O.set(i, c),
                    Object.keys(i).forEach((e) => {
                      P.has(e) ||
                        (s.has(e)
                          ? Object.defineProperty(u, e, {
                              get() {
                                var t;
                                let r =
                                  ((t = "unstable_rootParams"),
                                  C.test(e)
                                    ? "`" + t + "." + e + "`"
                                    : "`" + t + "[" + JSON.stringify(e) + "]`");
                                "prerender-ppr" === o.type
                                  ? E(a.route, r, o.dynamicTracking)
                                  : S(r, a, o);
                              },
                              enumerable: !0,
                            })
                          : (c[e] = i[e]));
                    }),
                    c
                  );
                }
              }
              return Promise.resolve(e);
            })(t.rootParams, e, t);
          default:
            return Promise.resolve(t.rootParams);
        }
      }
    },
    20273: (e, t, r) => {
      "use strict";
      r.d(t, { I: () => n });
      let n = (0, r(2207).xl)();
    },
    20421: (e, t, r) => {
      "use strict";
      r.d(t, { AA: () => n, h: () => i, kz: () => s, r4: () => a });
      let n = "nxtP",
        i = "nxtI",
        s = "x-prerender-revalidate",
        a = "x-prerender-revalidate-if-generated",
        o = {
          shared: "shared",
          reactServerComponents: "rsc",
          serverSideRendering: "ssr",
          actionBrowser: "action-browser",
          apiNode: "api-node",
          apiEdge: "api-edge",
          middleware: "middleware",
          instrument: "instrument",
          edgeAsset: "edge-asset",
          appPagesBrowser: "app-pages-browser",
          pagesDirBrowser: "pages-dir-browser",
          pagesDirEdge: "pages-dir-edge",
          pagesDirNode: "pages-dir-node",
        };
      ({
        ...o,
        GROUP: {
          builtinReact: [o.reactServerComponents, o.actionBrowser],
          serverOnly: [
            o.reactServerComponents,
            o.actionBrowser,
            o.instrument,
            o.middleware,
          ],
          neutralTarget: [o.apiNode, o.apiEdge],
          clientOnly: [o.serverSideRendering, o.appPagesBrowser],
          bundled: [
            o.reactServerComponents,
            o.actionBrowser,
            o.serverSideRendering,
            o.appPagesBrowser,
            o.shared,
            o.instrument,
            o.middleware,
          ],
          appPages: [
            o.reactServerComponents,
            o.serverSideRendering,
            o.appPagesBrowser,
            o.actionBrowser,
          ],
        },
      });
    },
    21261: (e, t, r) => {
      "use strict";
      r.d(t, { FP: () => n.e, XN: () => i });
      var n = r(47440);
      function i(e) {
        let t = n.e.getStore();
        switch (
          (!t &&
            (function (e) {
              throw Object.defineProperty(
                Error(
                  `\`${e}\` was called outside a request scope. Read more: https://nextjs.org/docs/messages/next-dynamic-api-wrong-context`,
                ),
                "__NEXT_ERROR_CODE",
                { value: "E251", enumerable: !1, configurable: !0 },
              );
            })(e),
          t.type)
        ) {
          case "request":
          default:
            return t;
          case "prerender":
          case "prerender-ppr":
          case "prerender-legacy":
            throw Object.defineProperty(
              Error(
                `\`${e}\` cannot be called inside a prerender. This is a bug in Next.js.`,
              ),
              "__NEXT_ERROR_CODE",
              { value: "E401", enumerable: !1, configurable: !0 },
            );
          case "cache":
            throw Object.defineProperty(
              Error(
                `\`${e}\` cannot be called inside "use cache". Call it outside and pass an argument instead. Read more: https://nextjs.org/docs/messages/next-request-in-use-cache`,
              ),
              "__NEXT_ERROR_CODE",
              { value: "E37", enumerable: !1, configurable: !0 },
            );
          case "unstable-cache":
            throw Object.defineProperty(
              Error(
                `\`${e}\` cannot be called inside unstable_cache. Call it outside and pass an argument instead. Read more: https://nextjs.org/docs/app/api-reference/functions/unstable_cache`,
              ),
              "__NEXT_ERROR_CODE",
              { value: "E69", enumerable: !1, configurable: !0 },
            );
        }
      }
    },
    23233: (e) => {
      (() => {
        "use strict";
        "undefined" != typeof __nccwpck_require__ &&
          (__nccwpck_require__.ab = "//");
        var t = {};
        (() => {
          (t.parse = function (t, r) {
            if ("string" != typeof t)
              throw TypeError("argument str must be a string");
            for (
              var i = {}, s = t.split(n), a = (r || {}).decode || e, o = 0;
              o < s.length;
              o++
            ) {
              var l = s[o],
                u = l.indexOf("=");
              if (!(u < 0)) {
                var c = l.substr(0, u).trim(),
                  d = l.substr(++u, l.length).trim();
                '"' == d[0] && (d = d.slice(1, -1)),
                  void 0 == i[c] &&
                    (i[c] = (function (e, t) {
                      try {
                        return t(e);
                      } catch (t) {
                        return e;
                      }
                    })(d, a));
              }
            }
            return i;
          }),
            (t.serialize = function (e, t, n) {
              var s = n || {},
                a = s.encode || r;
              if ("function" != typeof a)
                throw TypeError("option encode is invalid");
              if (!i.test(e)) throw TypeError("argument name is invalid");
              var o = a(t);
              if (o && !i.test(o)) throw TypeError("argument val is invalid");
              var l = e + "=" + o;
              if (null != s.maxAge) {
                var u = s.maxAge - 0;
                if (isNaN(u) || !isFinite(u))
                  throw TypeError("option maxAge is invalid");
                l += "; Max-Age=" + Math.floor(u);
              }
              if (s.domain) {
                if (!i.test(s.domain))
                  throw TypeError("option domain is invalid");
                l += "; Domain=" + s.domain;
              }
              if (s.path) {
                if (!i.test(s.path)) throw TypeError("option path is invalid");
                l += "; Path=" + s.path;
              }
              if (s.expires) {
                if ("function" != typeof s.expires.toUTCString)
                  throw TypeError("option expires is invalid");
                l += "; Expires=" + s.expires.toUTCString();
              }
              if (
                (s.httpOnly && (l += "; HttpOnly"),
                s.secure && (l += "; Secure"),
                s.sameSite)
              )
                switch (
                  "string" == typeof s.sameSite
                    ? s.sameSite.toLowerCase()
                    : s.sameSite
                ) {
                  case !0:
                  case "strict":
                    l += "; SameSite=Strict";
                    break;
                  case "lax":
                    l += "; SameSite=Lax";
                    break;
                  case "none":
                    l += "; SameSite=None";
                    break;
                  default:
                    throw TypeError("option sameSite is invalid");
                }
              return l;
            });
          var e = decodeURIComponent,
            r = encodeURIComponent,
            n = /; */,
            i = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;
        })(),
          (e.exports = t);
      })();
    },
    25143: (e) => {
      "use strict";
      (e.exports = r), (e.exports.preferredCharsets = r);
      var t = /^\s*([^\s;]+)\s*(?:;(.*))?$/;
      function r(e, r) {
        var a = (function (e) {
          for (var r = e.split(","), n = 0, i = 0; n < r.length; n++) {
            var s = (function (e, r) {
              var n = t.exec(e);
              if (!n) return null;
              var i = n[1],
                s = 1;
              if (n[2])
                for (var a = n[2].split(";"), o = 0; o < a.length; o++) {
                  var l = a[o].trim().split("=");
                  if ("q" === l[0]) {
                    s = parseFloat(l[1]);
                    break;
                  }
                }
              return { charset: i, q: s, i: r };
            })(r[n].trim(), n);
            s && (r[i++] = s);
          }
          return (r.length = i), r;
        })(void 0 === e ? "*" : e || "");
        if (!r) return a.filter(s).sort(n).map(i);
        var o = r.map(function (e, t) {
          for (var r = { o: -1, q: 0, s: 0 }, n = 0; n < a.length; n++) {
            var i = (function (e, t, r) {
              var n = 0;
              if (t.charset.toLowerCase() === e.toLowerCase()) n |= 1;
              else if ("*" !== t.charset) return null;
              return { i: r, o: t.i, q: t.q, s: n };
            })(e, a[n], t);
            i && 0 > (r.s - i.s || r.q - i.q || r.o - i.o) && (r = i);
          }
          return r;
        });
        return o
          .filter(s)
          .sort(n)
          .map(function (e) {
            return r[o.indexOf(e)];
          });
      }
      function n(e, t) {
        return t.q - e.q || t.s - e.s || e.o - t.o || e.i - t.i || 0;
      }
      function i(e) {
        return e.charset;
      }
      function s(e) {
        return e.q > 0;
      }
    },
    25356: (e) => {
      "use strict";
      e.exports = require("node:buffer");
    },
    25503: (e, t, r) => {
      "use strict";
      r.d(t, { z: () => n });
      class n extends Error {
        constructor(e, t) {
          super(
            "Invariant: " +
              (e.endsWith(".") ? e : e + ".") +
              " This is a bug in Next.js.",
            t,
          ),
            (this.name = "InvariantError");
        }
      }
    },
    29130: (e, t, r) => {
      "use strict";
      r.d(t, {
        Ud: () => n.stringifyCookie,
        VO: () => n.ResponseCookies,
        tm: () => n.RequestCookies,
      });
      var n = r(75565);
    },
    35264: (e, t, r) => {
      "use strict";
      r.d(t, { J: () => n.I });
      var n = r(20273);
    },
    45077: (e, t, r) => {
      "use strict";
      function n(e) {
        return e.replace(/\/$/, "") || "/";
      }
      function i(e) {
        let t = e.indexOf("#"),
          r = e.indexOf("?"),
          n = r > -1 && (t < 0 || r < t);
        return n || t > -1
          ? {
              pathname: e.substring(0, n ? r : t),
              query: n ? e.substring(r, t > -1 ? t : void 0) : "",
              hash: t > -1 ? e.slice(t) : "",
            }
          : { pathname: e, query: "", hash: "" };
      }
      function s(e, t) {
        if (!e.startsWith("/") || !t) return e;
        let { pathname: r, query: n, hash: s } = i(e);
        return "" + t + r + n + s;
      }
      function a(e, t) {
        if (!e.startsWith("/") || !t) return e;
        let { pathname: r, query: n, hash: s } = i(e);
        return "" + r + t + n + s;
      }
      function o(e, t) {
        if ("string" != typeof e) return !1;
        let { pathname: r } = i(e);
        return r === t || r.startsWith(t + "/");
      }
      r.d(t, { X: () => f });
      let l = new WeakMap();
      function u(e, t) {
        let r;
        if (!t) return { pathname: e };
        let n = l.get(t);
        n || ((n = t.map((e) => e.toLowerCase())), l.set(t, n));
        let i = e.split("/", 2);
        if (!i[1]) return { pathname: e };
        let s = i[1].toLowerCase(),
          a = n.indexOf(s);
        return a < 0
          ? { pathname: e }
          : ((r = t[a]),
            {
              pathname: (e = e.slice(r.length + 1) || "/"),
              detectedLocale: r,
            });
      }
      let c =
        /(?!^https?:\/\/)(127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}|\[::1\]|localhost)/;
      function d(e, t) {
        return new URL(
          String(e).replace(c, "localhost"),
          t && String(t).replace(c, "localhost"),
        );
      }
      let h = Symbol("NextURLInternal");
      class f {
        constructor(e, t, r) {
          let n, i;
          ("object" == typeof t && "pathname" in t) || "string" == typeof t
            ? ((n = t), (i = r || {}))
            : (i = r || t || {}),
            (this[h] = { url: d(e, n ?? i.base), options: i, basePath: "" }),
            this.analyze();
        }
        analyze() {
          var e, t, r, n, i;
          let s = (function (e, t) {
              var r, n;
              let {
                  basePath: i,
                  i18n: s,
                  trailingSlash: a,
                } = null != (r = t.nextConfig) ? r : {},
                l = {
                  pathname: e,
                  trailingSlash: "/" !== e ? e.endsWith("/") : a,
                };
              i &&
                o(l.pathname, i) &&
                ((l.pathname = (function (e, t) {
                  if (!o(e, t)) return e;
                  let r = e.slice(t.length);
                  return r.startsWith("/") ? r : "/" + r;
                })(l.pathname, i)),
                (l.basePath = i));
              let c = l.pathname;
              if (
                l.pathname.startsWith("/_next/data/") &&
                l.pathname.endsWith(".json")
              ) {
                let e = l.pathname
                  .replace(/^\/_next\/data\//, "")
                  .replace(/\.json$/, "")
                  .split("/");
                (l.buildId = e[0]),
                  (c = "index" !== e[1] ? "/" + e.slice(1).join("/") : "/"),
                  !0 === t.parseData && (l.pathname = c);
              }
              if (s) {
                let e = t.i18nProvider
                  ? t.i18nProvider.analyze(l.pathname)
                  : u(l.pathname, s.locales);
                (l.locale = e.detectedLocale),
                  (l.pathname = null != (n = e.pathname) ? n : l.pathname),
                  !e.detectedLocale &&
                    l.buildId &&
                    (e = t.i18nProvider
                      ? t.i18nProvider.analyze(c)
                      : u(c, s.locales)).detectedLocale &&
                    (l.locale = e.detectedLocale);
              }
              return l;
            })(this[h].url.pathname, {
              nextConfig: this[h].options.nextConfig,
              parseData: !0,
              i18nProvider: this[h].options.i18nProvider,
            }),
            a = (function (e, t) {
              let r;
              if ((null == t ? void 0 : t.host) && !Array.isArray(t.host))
                r = t.host.toString().split(":", 1)[0];
              else {
                if (!e.hostname) return;
                r = e.hostname;
              }
              return r.toLowerCase();
            })(this[h].url, this[h].options.headers);
          this[h].domainLocale = this[h].options.i18nProvider
            ? this[h].options.i18nProvider.detectDomainLocale(a)
            : (function (e, t, r) {
                if (e)
                  for (let s of (r && (r = r.toLowerCase()), e)) {
                    var n, i;
                    if (
                      t ===
                        (null == (n = s.domain)
                          ? void 0
                          : n.split(":", 1)[0].toLowerCase()) ||
                      r === s.defaultLocale.toLowerCase() ||
                      (null == (i = s.locales)
                        ? void 0
                        : i.some((e) => e.toLowerCase() === r))
                    )
                      return s;
                  }
              })(
                null == (t = this[h].options.nextConfig) || null == (e = t.i18n)
                  ? void 0
                  : e.domains,
                a,
              );
          let l =
            (null == (r = this[h].domainLocale) ? void 0 : r.defaultLocale) ||
            (null == (i = this[h].options.nextConfig) || null == (n = i.i18n)
              ? void 0
              : n.defaultLocale);
          (this[h].url.pathname = s.pathname),
            (this[h].defaultLocale = l),
            (this[h].basePath = s.basePath ?? ""),
            (this[h].buildId = s.buildId),
            (this[h].locale = s.locale ?? l),
            (this[h].trailingSlash = s.trailingSlash);
        }
        formatPathname() {
          var e;
          let t;
          return (
            (t = (function (e, t, r, n) {
              if (!t || t === r) return e;
              let i = e.toLowerCase();
              return !n && (o(i, "/api") || o(i, "/" + t.toLowerCase()))
                ? e
                : s(e, "/" + t);
            })(
              (e = {
                basePath: this[h].basePath,
                buildId: this[h].buildId,
                defaultLocale: this[h].options.forceLocale
                  ? void 0
                  : this[h].defaultLocale,
                locale: this[h].locale,
                pathname: this[h].url.pathname,
                trailingSlash: this[h].trailingSlash,
              }).pathname,
              e.locale,
              e.buildId ? void 0 : e.defaultLocale,
              e.ignorePrefix,
            )),
            (e.buildId || !e.trailingSlash) && (t = n(t)),
            e.buildId &&
              (t = a(
                s(t, "/_next/data/" + e.buildId),
                "/" === e.pathname ? "index.json" : ".json",
              )),
            (t = s(t, e.basePath)),
            !e.buildId && e.trailingSlash
              ? t.endsWith("/")
                ? t
                : a(t, "/")
              : n(t)
          );
        }
        formatSearch() {
          return this[h].url.search;
        }
        get buildId() {
          return this[h].buildId;
        }
        set buildId(e) {
          this[h].buildId = e;
        }
        get locale() {
          return this[h].locale ?? "";
        }
        set locale(e) {
          var t, r;
          if (
            !this[h].locale ||
            !(null == (r = this[h].options.nextConfig) || null == (t = r.i18n)
              ? void 0
              : t.locales.includes(e))
          )
            throw Object.defineProperty(
              TypeError(`The NextURL configuration includes no locale "${e}"`),
              "__NEXT_ERROR_CODE",
              { value: "E597", enumerable: !1, configurable: !0 },
            );
          this[h].locale = e;
        }
        get defaultLocale() {
          return this[h].defaultLocale;
        }
        get domainLocale() {
          return this[h].domainLocale;
        }
        get searchParams() {
          return this[h].url.searchParams;
        }
        get host() {
          return this[h].url.host;
        }
        set host(e) {
          this[h].url.host = e;
        }
        get hostname() {
          return this[h].url.hostname;
        }
        set hostname(e) {
          this[h].url.hostname = e;
        }
        get port() {
          return this[h].url.port;
        }
        set port(e) {
          this[h].url.port = e;
        }
        get protocol() {
          return this[h].url.protocol;
        }
        set protocol(e) {
          this[h].url.protocol = e;
        }
        get href() {
          let e = this.formatPathname(),
            t = this.formatSearch();
          return `${this.protocol}//${this.host}${e}${t}${this.hash}`;
        }
        set href(e) {
          (this[h].url = d(e)), this.analyze();
        }
        get origin() {
          return this[h].url.origin;
        }
        get pathname() {
          return this[h].url.pathname;
        }
        set pathname(e) {
          this[h].url.pathname = e;
        }
        get hash() {
          return this[h].url.hash;
        }
        set hash(e) {
          this[h].url.hash = e;
        }
        get search() {
          return this[h].url.search;
        }
        set search(e) {
          this[h].url.search = e;
        }
        get password() {
          return this[h].url.password;
        }
        set password(e) {
          this[h].url.password = e;
        }
        get username() {
          return this[h].url.username;
        }
        set username(e) {
          this[h].url.username = e;
        }
        get basePath() {
          return this[h].basePath;
        }
        set basePath(e) {
          this[h].basePath = e.startsWith("/") ? e : `/${e}`;
        }
        toString() {
          return this.href;
        }
        toJSON() {
          return this.href;
        }
        [Symbol.for("edge-runtime.inspect.custom")]() {
          return {
            href: this.href,
            origin: this.origin,
            protocol: this.protocol,
            username: this.username,
            password: this.password,
            host: this.host,
            hostname: this.hostname,
            port: this.port,
            pathname: this.pathname,
            search: this.search,
            searchParams: this.searchParams,
            hash: this.hash,
          };
        }
        clone() {
          return new f(String(this), this[h].options);
        }
      }
    },
    45807: (e, t, r) => {
      var n;
      (() => {
        var i = {
            226: function (i, s) {
              !(function (a, o) {
                "use strict";
                var l = "function",
                  u = "undefined",
                  c = "object",
                  d = "string",
                  h = "major",
                  f = "model",
                  p = "name",
                  _ = "type",
                  g = "vendor",
                  m = "version",
                  y = "architecture",
                  w = "console",
                  v = "mobile",
                  b = "tablet",
                  S = "smarttv",
                  E = "wearable",
                  k = "embedded",
                  x = "Amazon",
                  T = "Apple",
                  R = "ASUS",
                  C = "BlackBerry",
                  P = "Browser",
                  O = "Chrome",
                  A = "Firefox",
                  I = "Google",
                  j = "Huawei",
                  L = "Microsoft",
                  N = "Motorola",
                  M = "Opera",
                  D = "Samsung",
                  $ = "Sharp",
                  q = "Sony",
                  U = "Xiaomi",
                  B = "Zebra",
                  G = "Facebook",
                  z = "Chromium OS",
                  H = "Mac OS",
                  F = function (e, t) {
                    var r = {};
                    for (var n in e)
                      t[n] && t[n].length % 2 == 0
                        ? (r[n] = t[n].concat(e[n]))
                        : (r[n] = e[n]);
                    return r;
                  },
                  W = function (e) {
                    for (var t = {}, r = 0; r < e.length; r++)
                      t[e[r].toUpperCase()] = e[r];
                    return t;
                  },
                  K = function (e, t) {
                    return typeof e === d && -1 !== V(t).indexOf(V(e));
                  },
                  V = function (e) {
                    return e.toLowerCase();
                  },
                  J = function (e, t) {
                    if (typeof e === d)
                      return (
                        (e = e.replace(/^\s\s*/, "")),
                        typeof t === u ? e : e.substring(0, 350)
                      );
                  },
                  X = function (e, t) {
                    for (var r, n, i, s, a, u, d = 0; d < t.length && !a; ) {
                      var h = t[d],
                        f = t[d + 1];
                      for (r = n = 0; r < h.length && !a && h[r]; )
                        if ((a = h[r++].exec(e)))
                          for (i = 0; i < f.length; i++)
                            (u = a[++n]),
                              typeof (s = f[i]) === c && s.length > 0
                                ? 2 === s.length
                                  ? typeof s[1] == l
                                    ? (this[s[0]] = s[1].call(this, u))
                                    : (this[s[0]] = s[1])
                                  : 3 === s.length
                                    ? typeof s[1] !== l ||
                                      (s[1].exec && s[1].test)
                                      ? (this[s[0]] = u
                                          ? u.replace(s[1], s[2])
                                          : void 0)
                                      : (this[s[0]] = u
                                          ? s[1].call(this, u, s[2])
                                          : void 0)
                                    : 4 === s.length &&
                                      (this[s[0]] = u
                                        ? s[3].call(this, u.replace(s[1], s[2]))
                                        : o)
                                : (this[s] = u || o);
                      d += 2;
                    }
                  },
                  Y = function (e, t) {
                    for (var r in t)
                      if (typeof t[r] === c && t[r].length > 0) {
                        for (var n = 0; n < t[r].length; n++)
                          if (K(t[r][n], e)) return "?" === r ? o : r;
                      } else if (K(t[r], e)) return "?" === r ? o : r;
                    return e;
                  },
                  Z = {
                    ME: "4.90",
                    "NT 3.11": "NT3.51",
                    "NT 4.0": "NT4.0",
                    2e3: "NT 5.0",
                    XP: ["NT 5.1", "NT 5.2"],
                    Vista: "NT 6.0",
                    7: "NT 6.1",
                    8: "NT 6.2",
                    8.1: "NT 6.3",
                    10: ["NT 6.4", "NT 10.0"],
                    RT: "ARM",
                  },
                  Q = {
                    browser: [
                      [/\b(?:crmo|crios)\/([\w\.]+)/i],
                      [m, [p, "Chrome"]],
                      [/edg(?:e|ios|a)?\/([\w\.]+)/i],
                      [m, [p, "Edge"]],
                      [
                        /(opera mini)\/([-\w\.]+)/i,
                        /(opera [mobiletab]{3,6})\b.+version\/([-\w\.]+)/i,
                        /(opera)(?:.+version\/|[\/ ]+)([\w\.]+)/i,
                      ],
                      [p, m],
                      [/opios[\/ ]+([\w\.]+)/i],
                      [m, [p, M + " Mini"]],
                      [/\bopr\/([\w\.]+)/i],
                      [m, [p, M]],
                      [
                        /(kindle)\/([\w\.]+)/i,
                        /(lunascape|maxthon|netfront|jasmine|blazer)[\/ ]?([\w\.]*)/i,
                        /(avant |iemobile|slim)(?:browser)?[\/ ]?([\w\.]*)/i,
                        /(ba?idubrowser)[\/ ]?([\w\.]+)/i,
                        /(?:ms|\()(ie) ([\w\.]+)/i,
                        /(flock|rockmelt|midori|epiphany|silk|skyfire|bolt|iron|vivaldi|iridium|phantomjs|bowser|quark|qupzilla|falkon|rekonq|puffin|brave|whale(?!.+naver)|qqbrowserlite|qq|duckduckgo)\/([-\w\.]+)/i,
                        /(heytap|ovi)browser\/([\d\.]+)/i,
                        /(weibo)__([\d\.]+)/i,
                      ],
                      [p, m],
                      [/(?:\buc? ?browser|(?:juc.+)ucweb)[\/ ]?([\w\.]+)/i],
                      [m, [p, "UC" + P]],
                      [
                        /microm.+\bqbcore\/([\w\.]+)/i,
                        /\bqbcore\/([\w\.]+).+microm/i,
                      ],
                      [m, [p, "WeChat(Win) Desktop"]],
                      [/micromessenger\/([\w\.]+)/i],
                      [m, [p, "WeChat"]],
                      [/konqueror\/([\w\.]+)/i],
                      [m, [p, "Konqueror"]],
                      [/trident.+rv[: ]([\w\.]{1,9})\b.+like gecko/i],
                      [m, [p, "IE"]],
                      [/ya(?:search)?browser\/([\w\.]+)/i],
                      [m, [p, "Yandex"]],
                      [/(avast|avg)\/([\w\.]+)/i],
                      [[p, /(.+)/, "$1 Secure " + P], m],
                      [/\bfocus\/([\w\.]+)/i],
                      [m, [p, A + " Focus"]],
                      [/\bopt\/([\w\.]+)/i],
                      [m, [p, M + " Touch"]],
                      [/coc_coc\w+\/([\w\.]+)/i],
                      [m, [p, "Coc Coc"]],
                      [/dolfin\/([\w\.]+)/i],
                      [m, [p, "Dolphin"]],
                      [/coast\/([\w\.]+)/i],
                      [m, [p, M + " Coast"]],
                      [/miuibrowser\/([\w\.]+)/i],
                      [m, [p, "MIUI " + P]],
                      [/fxios\/([-\w\.]+)/i],
                      [m, [p, A]],
                      [/\bqihu|(qi?ho?o?|360)browser/i],
                      [[p, "360 " + P]],
                      [/(oculus|samsung|sailfish|huawei)browser\/([\w\.]+)/i],
                      [[p, /(.+)/, "$1 " + P], m],
                      [/(comodo_dragon)\/([\w\.]+)/i],
                      [[p, /_/g, " "], m],
                      [
                        /(electron)\/([\w\.]+) safari/i,
                        /(tesla)(?: qtcarbrowser|\/(20\d\d\.[-\w\.]+))/i,
                        /m?(qqbrowser|baiduboxapp|2345Explorer)[\/ ]?([\w\.]+)/i,
                      ],
                      [p, m],
                      [
                        /(metasr)[\/ ]?([\w\.]+)/i,
                        /(lbbrowser)/i,
                        /\[(linkedin)app\]/i,
                      ],
                      [p],
                      [
                        /((?:fban\/fbios|fb_iab\/fb4a)(?!.+fbav)|;fbav\/([\w\.]+);)/i,
                      ],
                      [[p, G], m],
                      [
                        /(kakao(?:talk|story))[\/ ]([\w\.]+)/i,
                        /(naver)\(.*?(\d+\.[\w\.]+).*\)/i,
                        /safari (line)\/([\w\.]+)/i,
                        /\b(line)\/([\w\.]+)\/iab/i,
                        /(chromium|instagram)[\/ ]([-\w\.]+)/i,
                      ],
                      [p, m],
                      [/\bgsa\/([\w\.]+) .*safari\//i],
                      [m, [p, "GSA"]],
                      [/musical_ly(?:.+app_?version\/|_)([\w\.]+)/i],
                      [m, [p, "TikTok"]],
                      [/headlesschrome(?:\/([\w\.]+)| )/i],
                      [m, [p, O + " Headless"]],
                      [/ wv\).+(chrome)\/([\w\.]+)/i],
                      [[p, O + " WebView"], m],
                      [
                        /droid.+ version\/([\w\.]+)\b.+(?:mobile safari|safari)/i,
                      ],
                      [m, [p, "Android " + P]],
                      [
                        /(chrome|omniweb|arora|[tizenoka]{5} ?browser)\/v?([\w\.]+)/i,
                      ],
                      [p, m],
                      [/version\/([\w\.\,]+) .*mobile\/\w+ (safari)/i],
                      [m, [p, "Mobile Safari"]],
                      [/version\/([\w(\.|\,)]+) .*(mobile ?safari|safari)/i],
                      [m, p],
                      [/webkit.+?(mobile ?safari|safari)(\/[\w\.]+)/i],
                      [
                        p,
                        [
                          m,
                          Y,
                          {
                            "1.0": "/8",
                            1.2: "/1",
                            1.3: "/3",
                            "2.0": "/412",
                            "2.0.2": "/416",
                            "2.0.3": "/417",
                            "2.0.4": "/419",
                            "?": "/",
                          },
                        ],
                      ],
                      [/(webkit|khtml)\/([\w\.]+)/i],
                      [p, m],
                      [/(navigator|netscape\d?)\/([-\w\.]+)/i],
                      [[p, "Netscape"], m],
                      [/mobile vr; rv:([\w\.]+)\).+firefox/i],
                      [m, [p, A + " Reality"]],
                      [
                        /ekiohf.+(flow)\/([\w\.]+)/i,
                        /(swiftfox)/i,
                        /(icedragon|iceweasel|camino|chimera|fennec|maemo browser|minimo|conkeror|klar)[\/ ]?([\w\.\+]+)/i,
                        /(seamonkey|k-meleon|icecat|iceape|firebird|phoenix|palemoon|basilisk|waterfox)\/([-\w\.]+)$/i,
                        /(firefox)\/([\w\.]+)/i,
                        /(mozilla)\/([\w\.]+) .+rv\:.+gecko\/\d+/i,
                        /(polaris|lynx|dillo|icab|doris|amaya|w3m|netsurf|sleipnir|obigo|mosaic|(?:go|ice|up)[\. ]?browser)[-\/ ]?v?([\w\.]+)/i,
                        /(links) \(([\w\.]+)/i,
                        /panasonic;(viera)/i,
                      ],
                      [p, m],
                      [/(cobalt)\/([\w\.]+)/i],
                      [p, [m, /master.|lts./, ""]],
                    ],
                    cpu: [
                      [/(?:(amd|x(?:(?:86|64)[-_])?|wow|win)64)[;\)]/i],
                      [[y, "amd64"]],
                      [/(ia32(?=;))/i],
                      [[y, V]],
                      [/((?:i[346]|x)86)[;\)]/i],
                      [[y, "ia32"]],
                      [/\b(aarch64|arm(v?8e?l?|_?64))\b/i],
                      [[y, "arm64"]],
                      [/\b(arm(?:v[67])?ht?n?[fl]p?)\b/i],
                      [[y, "armhf"]],
                      [/windows (ce|mobile); ppc;/i],
                      [[y, "arm"]],
                      [/((?:ppc|powerpc)(?:64)?)(?: mac|;|\))/i],
                      [[y, /ower/, "", V]],
                      [/(sun4\w)[;\)]/i],
                      [[y, "sparc"]],
                      [
                        /((?:avr32|ia64(?=;))|68k(?=\))|\barm(?=v(?:[1-7]|[5-7]1)l?|;|eabi)|(?=atmel )avr|(?:irix|mips|sparc)(?:64)?\b|pa-risc)/i,
                      ],
                      [[y, V]],
                    ],
                    device: [
                      [
                        /\b(sch-i[89]0\d|shw-m380s|sm-[ptx]\w{2,4}|gt-[pn]\d{2,4}|sgh-t8[56]9|nexus 10)/i,
                      ],
                      [f, [g, D], [_, b]],
                      [
                        /\b((?:s[cgp]h|gt|sm)-\w+|sc[g-]?[\d]+a?|galaxy nexus)/i,
                        /samsung[- ]([-\w]+)/i,
                        /sec-(sgh\w+)/i,
                      ],
                      [f, [g, D], [_, v]],
                      [/(?:\/|\()(ip(?:hone|od)[\w, ]*)(?:\/|;)/i],
                      [f, [g, T], [_, v]],
                      [
                        /\((ipad);[-\w\),; ]+apple/i,
                        /applecoremedia\/[\w\.]+ \((ipad)/i,
                        /\b(ipad)\d\d?,\d\d?[;\]].+ios/i,
                      ],
                      [f, [g, T], [_, b]],
                      [/(macintosh);/i],
                      [f, [g, T]],
                      [/\b(sh-?[altvz]?\d\d[a-ekm]?)/i],
                      [f, [g, $], [_, v]],
                      [
                        /\b((?:ag[rs][23]?|bah2?|sht?|btv)-a?[lw]\d{2})\b(?!.+d\/s)/i,
                      ],
                      [f, [g, j], [_, b]],
                      [
                        /(?:huawei|honor)([-\w ]+)[;\)]/i,
                        /\b(nexus 6p|\w{2,4}e?-[atu]?[ln][\dx][012359c][adn]?)\b(?!.+d\/s)/i,
                      ],
                      [f, [g, j], [_, v]],
                      [
                        /\b(poco[\w ]+)(?: bui|\))/i,
                        /\b; (\w+) build\/hm\1/i,
                        /\b(hm[-_ ]?note?[_ ]?(?:\d\w)?) bui/i,
                        /\b(redmi[\-_ ]?(?:note|k)?[\w_ ]+)(?: bui|\))/i,
                        /\b(mi[-_ ]?(?:a\d|one|one[_ ]plus|note lte|max|cc)?[_ ]?(?:\d?\w?)[_ ]?(?:plus|se|lite)?)(?: bui|\))/i,
                      ],
                      [
                        [f, /_/g, " "],
                        [g, U],
                        [_, v],
                      ],
                      [/\b(mi[-_ ]?(?:pad)(?:[\w_ ]+))(?: bui|\))/i],
                      [
                        [f, /_/g, " "],
                        [g, U],
                        [_, b],
                      ],
                      [
                        /; (\w+) bui.+ oppo/i,
                        /\b(cph[12]\d{3}|p(?:af|c[al]|d\w|e[ar])[mt]\d0|x9007|a101op)\b/i,
                      ],
                      [f, [g, "OPPO"], [_, v]],
                      [
                        /vivo (\w+)(?: bui|\))/i,
                        /\b(v[12]\d{3}\w?[at])(?: bui|;)/i,
                      ],
                      [f, [g, "Vivo"], [_, v]],
                      [/\b(rmx[12]\d{3})(?: bui|;|\))/i],
                      [f, [g, "Realme"], [_, v]],
                      [
                        /\b(milestone|droid(?:[2-4x]| (?:bionic|x2|pro|razr))?:?( 4g)?)\b[\w ]+build\//i,
                        /\bmot(?:orola)?[- ](\w*)/i,
                        /((?:moto[\w\(\) ]+|xt\d{3,4}|nexus 6)(?= bui|\)))/i,
                      ],
                      [f, [g, N], [_, v]],
                      [/\b(mz60\d|xoom[2 ]{0,2}) build\//i],
                      [f, [g, N], [_, b]],
                      [
                        /((?=lg)?[vl]k\-?\d{3}) bui| 3\.[-\w; ]{10}lg?-([06cv9]{3,4})/i,
                      ],
                      [f, [g, "LG"], [_, b]],
                      [
                        /(lm(?:-?f100[nv]?|-[\w\.]+)(?= bui|\))|nexus [45])/i,
                        /\blg[-e;\/ ]+((?!browser|netcast|android tv)\w+)/i,
                        /\blg-?([\d\w]+) bui/i,
                      ],
                      [f, [g, "LG"], [_, v]],
                      [
                        /(ideatab[-\w ]+)/i,
                        /lenovo ?(s[56]000[-\w]+|tab(?:[\w ]+)|yt[-\d\w]{6}|tb[-\d\w]{6})/i,
                      ],
                      [f, [g, "Lenovo"], [_, b]],
                      [
                        /(?:maemo|nokia).*(n900|lumia \d+)/i,
                        /nokia[-_ ]?([-\w\.]*)/i,
                      ],
                      [
                        [f, /_/g, " "],
                        [g, "Nokia"],
                        [_, v],
                      ],
                      [/(pixel c)\b/i],
                      [f, [g, I], [_, b]],
                      [/droid.+; (pixel[\daxl ]{0,6})(?: bui|\))/i],
                      [f, [g, I], [_, v]],
                      [
                        /droid.+ (a?\d[0-2]{2}so|[c-g]\d{4}|so[-gl]\w+|xq-a\w[4-7][12])(?= bui|\).+chrome\/(?![1-6]{0,1}\d\.))/i,
                      ],
                      [f, [g, q], [_, v]],
                      [/sony tablet [ps]/i, /\b(?:sony)?sgp\w+(?: bui|\))/i],
                      [
                        [f, "Xperia Tablet"],
                        [g, q],
                        [_, b],
                      ],
                      [
                        / (kb2005|in20[12]5|be20[12][59])\b/i,
                        /(?:one)?(?:plus)? (a\d0\d\d)(?: b|\))/i,
                      ],
                      [f, [g, "OnePlus"], [_, v]],
                      [
                        /(alexa)webm/i,
                        /(kf[a-z]{2}wi|aeo[c-r]{2})( bui|\))/i,
                        /(kf[a-z]+)( bui|\)).+silk\//i,
                      ],
                      [f, [g, x], [_, b]],
                      [/((?:sd|kf)[0349hijorstuw]+)( bui|\)).+silk\//i],
                      [
                        [f, /(.+)/g, "Fire Phone $1"],
                        [g, x],
                        [_, v],
                      ],
                      [/(playbook);[-\w\),; ]+(rim)/i],
                      [f, g, [_, b]],
                      [/\b((?:bb[a-f]|st[hv])100-\d)/i, /\(bb10; (\w+)/i],
                      [f, [g, C], [_, v]],
                      [
                        /(?:\b|asus_)(transfo[prime ]{4,10} \w+|eeepc|slider \w+|nexus 7|padfone|p00[cj])/i,
                      ],
                      [f, [g, R], [_, b]],
                      [/ (z[bes]6[027][012][km][ls]|zenfone \d\w?)\b/i],
                      [f, [g, R], [_, v]],
                      [/(nexus 9)/i],
                      [f, [g, "HTC"], [_, b]],
                      [
                        /(htc)[-;_ ]{1,2}([\w ]+(?=\)| bui)|\w+)/i,
                        /(zte)[- ]([\w ]+?)(?: bui|\/|\))/i,
                        /(alcatel|geeksphone|nexian|panasonic(?!(?:;|\.))|sony(?!-bra))[-_ ]?([-\w]*)/i,
                      ],
                      [g, [f, /_/g, " "], [_, v]],
                      [/droid.+; ([ab][1-7]-?[0178a]\d\d?)/i],
                      [f, [g, "Acer"], [_, b]],
                      [/droid.+; (m[1-5] note) bui/i, /\bmz-([-\w]{2,})/i],
                      [f, [g, "Meizu"], [_, v]],
                      [
                        /(blackberry|benq|palm(?=\-)|sonyericsson|acer|asus|dell|meizu|motorola|polytron)[-_ ]?([-\w]*)/i,
                        /(hp) ([\w ]+\w)/i,
                        /(asus)-?(\w+)/i,
                        /(microsoft); (lumia[\w ]+)/i,
                        /(lenovo)[-_ ]?([-\w]+)/i,
                        /(jolla)/i,
                        /(oppo) ?([\w ]+) bui/i,
                      ],
                      [g, f, [_, v]],
                      [
                        /(kobo)\s(ereader|touch)/i,
                        /(archos) (gamepad2?)/i,
                        /(hp).+(touchpad(?!.+tablet)|tablet)/i,
                        /(kindle)\/([\w\.]+)/i,
                        /(nook)[\w ]+build\/(\w+)/i,
                        /(dell) (strea[kpr\d ]*[\dko])/i,
                        /(le[- ]+pan)[- ]+(\w{1,9}) bui/i,
                        /(trinity)[- ]*(t\d{3}) bui/i,
                        /(gigaset)[- ]+(q\w{1,9}) bui/i,
                        /(vodafone) ([\w ]+)(?:\)| bui)/i,
                      ],
                      [g, f, [_, b]],
                      [/(surface duo)/i],
                      [f, [g, L], [_, b]],
                      [/droid [\d\.]+; (fp\du?)(?: b|\))/i],
                      [f, [g, "Fairphone"], [_, v]],
                      [/(u304aa)/i],
                      [f, [g, "AT&T"], [_, v]],
                      [/\bsie-(\w*)/i],
                      [f, [g, "Siemens"], [_, v]],
                      [/\b(rct\w+) b/i],
                      [f, [g, "RCA"], [_, b]],
                      [/\b(venue[\d ]{2,7}) b/i],
                      [f, [g, "Dell"], [_, b]],
                      [/\b(q(?:mv|ta)\w+) b/i],
                      [f, [g, "Verizon"], [_, b]],
                      [/\b(?:barnes[& ]+noble |bn[rt])([\w\+ ]*) b/i],
                      [f, [g, "Barnes & Noble"], [_, b]],
                      [/\b(tm\d{3}\w+) b/i],
                      [f, [g, "NuVision"], [_, b]],
                      [/\b(k88) b/i],
                      [f, [g, "ZTE"], [_, b]],
                      [/\b(nx\d{3}j) b/i],
                      [f, [g, "ZTE"], [_, v]],
                      [/\b(gen\d{3}) b.+49h/i],
                      [f, [g, "Swiss"], [_, v]],
                      [/\b(zur\d{3}) b/i],
                      [f, [g, "Swiss"], [_, b]],
                      [/\b((zeki)?tb.*\b) b/i],
                      [f, [g, "Zeki"], [_, b]],
                      [
                        /\b([yr]\d{2}) b/i,
                        /\b(dragon[- ]+touch |dt)(\w{5}) b/i,
                      ],
                      [[g, "Dragon Touch"], f, [_, b]],
                      [/\b(ns-?\w{0,9}) b/i],
                      [f, [g, "Insignia"], [_, b]],
                      [/\b((nxa|next)-?\w{0,9}) b/i],
                      [f, [g, "NextBook"], [_, b]],
                      [/\b(xtreme\_)?(v(1[045]|2[015]|[3469]0|7[05])) b/i],
                      [[g, "Voice"], f, [_, v]],
                      [/\b(lvtel\-)?(v1[12]) b/i],
                      [[g, "LvTel"], f, [_, v]],
                      [/\b(ph-1) /i],
                      [f, [g, "Essential"], [_, v]],
                      [/\b(v(100md|700na|7011|917g).*\b) b/i],
                      [f, [g, "Envizen"], [_, b]],
                      [/\b(trio[-\w\. ]+) b/i],
                      [f, [g, "MachSpeed"], [_, b]],
                      [/\btu_(1491) b/i],
                      [f, [g, "Rotor"], [_, b]],
                      [/(shield[\w ]+) b/i],
                      [f, [g, "Nvidia"], [_, b]],
                      [/(sprint) (\w+)/i],
                      [g, f, [_, v]],
                      [/(kin\.[onetw]{3})/i],
                      [
                        [f, /\./g, " "],
                        [g, L],
                        [_, v],
                      ],
                      [/droid.+; (cc6666?|et5[16]|mc[239][23]x?|vc8[03]x?)\)/i],
                      [f, [g, B], [_, b]],
                      [/droid.+; (ec30|ps20|tc[2-8]\d[kx])\)/i],
                      [f, [g, B], [_, v]],
                      [/smart-tv.+(samsung)/i],
                      [g, [_, S]],
                      [/hbbtv.+maple;(\d+)/i],
                      [
                        [f, /^/, "SmartTV"],
                        [g, D],
                        [_, S],
                      ],
                      [
                        /(nux; netcast.+smarttv|lg (netcast\.tv-201\d|android tv))/i,
                      ],
                      [
                        [g, "LG"],
                        [_, S],
                      ],
                      [/(apple) ?tv/i],
                      [g, [f, T + " TV"], [_, S]],
                      [/crkey/i],
                      [
                        [f, O + "cast"],
                        [g, I],
                        [_, S],
                      ],
                      [/droid.+aft(\w)( bui|\))/i],
                      [f, [g, x], [_, S]],
                      [/\(dtv[\);].+(aquos)/i, /(aquos-tv[\w ]+)\)/i],
                      [f, [g, $], [_, S]],
                      [/(bravia[\w ]+)( bui|\))/i],
                      [f, [g, q], [_, S]],
                      [/(mitv-\w{5}) bui/i],
                      [f, [g, U], [_, S]],
                      [/Hbbtv.*(technisat) (.*);/i],
                      [g, f, [_, S]],
                      [
                        /\b(roku)[\dx]*[\)\/]((?:dvp-)?[\d\.]*)/i,
                        /hbbtv\/\d+\.\d+\.\d+ +\([\w\+ ]*; *([\w\d][^;]*);([^;]*)/i,
                      ],
                      [
                        [g, J],
                        [f, J],
                        [_, S],
                      ],
                      [/\b(android tv|smart[- ]?tv|opera tv|tv; rv:)\b/i],
                      [[_, S]],
                      [/(ouya)/i, /(nintendo) ([wids3utch]+)/i],
                      [g, f, [_, w]],
                      [/droid.+; (shield) bui/i],
                      [f, [g, "Nvidia"], [_, w]],
                      [/(playstation [345portablevi]+)/i],
                      [f, [g, q], [_, w]],
                      [/\b(xbox(?: one)?(?!; xbox))[\); ]/i],
                      [f, [g, L], [_, w]],
                      [/((pebble))app/i],
                      [g, f, [_, E]],
                      [/(watch)(?: ?os[,\/]|\d,\d\/)[\d\.]+/i],
                      [f, [g, T], [_, E]],
                      [/droid.+; (glass) \d/i],
                      [f, [g, I], [_, E]],
                      [/droid.+; (wt63?0{2,3})\)/i],
                      [f, [g, B], [_, E]],
                      [/(quest( 2| pro)?)/i],
                      [f, [g, G], [_, E]],
                      [/(tesla)(?: qtcarbrowser|\/[-\w\.]+)/i],
                      [g, [_, k]],
                      [/(aeobc)\b/i],
                      [f, [g, x], [_, k]],
                      [
                        /droid .+?; ([^;]+?)(?: bui|\) applew).+? mobile safari/i,
                      ],
                      [f, [_, v]],
                      [
                        /droid .+?; ([^;]+?)(?: bui|\) applew).+?(?! mobile) safari/i,
                      ],
                      [f, [_, b]],
                      [/\b((tablet|tab)[;\/]|focus\/\d(?!.+mobile))/i],
                      [[_, b]],
                      [
                        /(phone|mobile(?:[;\/]| [ \w\/\.]*safari)|pda(?=.+windows ce))/i,
                      ],
                      [[_, v]],
                      [/(android[-\w\. ]{0,9});.+buil/i],
                      [f, [g, "Generic"]],
                    ],
                    engine: [
                      [/windows.+ edge\/([\w\.]+)/i],
                      [m, [p, "EdgeHTML"]],
                      [/webkit\/537\.36.+chrome\/(?!27)([\w\.]+)/i],
                      [m, [p, "Blink"]],
                      [
                        /(presto)\/([\w\.]+)/i,
                        /(webkit|trident|netfront|netsurf|amaya|lynx|w3m|goanna)\/([\w\.]+)/i,
                        /ekioh(flow)\/([\w\.]+)/i,
                        /(khtml|tasman|links)[\/ ]\(?([\w\.]+)/i,
                        /(icab)[\/ ]([23]\.[\d\.]+)/i,
                        /\b(libweb)/i,
                      ],
                      [p, m],
                      [/rv\:([\w\.]{1,9})\b.+(gecko)/i],
                      [m, p],
                    ],
                    os: [
                      [/microsoft (windows) (vista|xp)/i],
                      [p, m],
                      [
                        /(windows) nt 6\.2; (arm)/i,
                        /(windows (?:phone(?: os)?|mobile))[\/ ]?([\d\.\w ]*)/i,
                        /(windows)[\/ ]?([ntce\d\. ]+\w)(?!.+xbox)/i,
                      ],
                      [p, [m, Y, Z]],
                      [/(win(?=3|9|n)|win 9x )([nt\d\.]+)/i],
                      [
                        [p, "Windows"],
                        [m, Y, Z],
                      ],
                      [
                        /ip[honead]{2,4}\b(?:.*os ([\w]+) like mac|; opera)/i,
                        /ios;fbsv\/([\d\.]+)/i,
                        /cfnetwork\/.+darwin/i,
                      ],
                      [
                        [m, /_/g, "."],
                        [p, "iOS"],
                      ],
                      [
                        /(mac os x) ?([\w\. ]*)/i,
                        /(macintosh|mac_powerpc\b)(?!.+haiku)/i,
                      ],
                      [
                        [p, H],
                        [m, /_/g, "."],
                      ],
                      [/droid ([\w\.]+)\b.+(android[- ]x86|harmonyos)/i],
                      [m, p],
                      [
                        /(android|webos|qnx|bada|rim tablet os|maemo|meego|sailfish)[-\/ ]?([\w\.]*)/i,
                        /(blackberry)\w*\/([\w\.]*)/i,
                        /(tizen|kaios)[\/ ]([\w\.]+)/i,
                        /\((series40);/i,
                      ],
                      [p, m],
                      [/\(bb(10);/i],
                      [m, [p, C]],
                      [
                        /(?:symbian ?os|symbos|s60(?=;)|series60)[-\/ ]?([\w\.]*)/i,
                      ],
                      [m, [p, "Symbian"]],
                      [
                        /mozilla\/[\d\.]+ \((?:mobile|tablet|tv|mobile; [\w ]+); rv:.+ gecko\/([\w\.]+)/i,
                      ],
                      [m, [p, A + " OS"]],
                      [
                        /web0s;.+rt(tv)/i,
                        /\b(?:hp)?wos(?:browser)?\/([\w\.]+)/i,
                      ],
                      [m, [p, "webOS"]],
                      [/watch(?: ?os[,\/]|\d,\d\/)([\d\.]+)/i],
                      [m, [p, "watchOS"]],
                      [/crkey\/([\d\.]+)/i],
                      [m, [p, O + "cast"]],
                      [/(cros) [\w]+(?:\)| ([\w\.]+)\b)/i],
                      [[p, z], m],
                      [
                        /panasonic;(viera)/i,
                        /(netrange)mmh/i,
                        /(nettv)\/(\d+\.[\w\.]+)/i,
                        /(nintendo|playstation) ([wids345portablevuch]+)/i,
                        /(xbox); +xbox ([^\);]+)/i,
                        /\b(joli|palm)\b ?(?:os)?\/?([\w\.]*)/i,
                        /(mint)[\/\(\) ]?(\w*)/i,
                        /(mageia|vectorlinux)[; ]/i,
                        /([kxln]?ubuntu|debian|suse|opensuse|gentoo|arch(?= linux)|slackware|fedora|mandriva|centos|pclinuxos|red ?hat|zenwalk|linpus|raspbian|plan 9|minix|risc os|contiki|deepin|manjaro|elementary os|sabayon|linspire)(?: gnu\/linux)?(?: enterprise)?(?:[- ]linux)?(?:-gnu)?[-\/ ]?(?!chrom|package)([-\w\.]*)/i,
                        /(hurd|linux) ?([\w\.]*)/i,
                        /(gnu) ?([\w\.]*)/i,
                        /\b([-frentopcghs]{0,5}bsd|dragonfly)[\/ ]?(?!amd|[ix346]{1,2}86)([\w\.]*)/i,
                        /(haiku) (\w+)/i,
                      ],
                      [p, m],
                      [/(sunos) ?([\w\.\d]*)/i],
                      [[p, "Solaris"], m],
                      [
                        /((?:open)?solaris)[-\/ ]?([\w\.]*)/i,
                        /(aix) ((\d)(?=\.|\)| )[\w\.])*/i,
                        /\b(beos|os\/2|amigaos|morphos|openvms|fuchsia|hp-ux|serenityos)/i,
                        /(unix) ?([\w\.]*)/i,
                      ],
                      [p, m],
                    ],
                  },
                  ee = function (e, t) {
                    if (
                      (typeof e === c && ((t = e), (e = o)),
                      !(this instanceof ee))
                    )
                      return new ee(e, t).getResult();
                    var r = typeof a !== u && a.navigator ? a.navigator : o,
                      n = e || (r && r.userAgent ? r.userAgent : ""),
                      i = r && r.userAgentData ? r.userAgentData : o,
                      s = t ? F(Q, t) : Q,
                      w = r && r.userAgent == n;
                    return (
                      (this.getBrowser = function () {
                        var e,
                          t = {};
                        return (
                          (t[p] = o),
                          (t[m] = o),
                          X.call(t, n, s.browser),
                          (t[h] =
                            typeof (e = t[m]) === d
                              ? e.replace(/[^\d\.]/g, "").split(".")[0]
                              : o),
                          w &&
                            r &&
                            r.brave &&
                            typeof r.brave.isBrave == l &&
                            (t[p] = "Brave"),
                          t
                        );
                      }),
                      (this.getCPU = function () {
                        var e = {};
                        return (e[y] = o), X.call(e, n, s.cpu), e;
                      }),
                      (this.getDevice = function () {
                        var e = {};
                        return (
                          (e[g] = o),
                          (e[f] = o),
                          (e[_] = o),
                          X.call(e, n, s.device),
                          w && !e[_] && i && i.mobile && (e[_] = v),
                          w &&
                            "Macintosh" == e[f] &&
                            r &&
                            typeof r.standalone !== u &&
                            r.maxTouchPoints &&
                            r.maxTouchPoints > 2 &&
                            ((e[f] = "iPad"), (e[_] = b)),
                          e
                        );
                      }),
                      (this.getEngine = function () {
                        var e = {};
                        return (
                          (e[p] = o), (e[m] = o), X.call(e, n, s.engine), e
                        );
                      }),
                      (this.getOS = function () {
                        var e = {};
                        return (
                          (e[p] = o),
                          (e[m] = o),
                          X.call(e, n, s.os),
                          w &&
                            !e[p] &&
                            i &&
                            "Unknown" != i.platform &&
                            (e[p] = i.platform
                              .replace(/chrome os/i, z)
                              .replace(/macos/i, H)),
                          e
                        );
                      }),
                      (this.getResult = function () {
                        return {
                          ua: this.getUA(),
                          browser: this.getBrowser(),
                          engine: this.getEngine(),
                          os: this.getOS(),
                          device: this.getDevice(),
                          cpu: this.getCPU(),
                        };
                      }),
                      (this.getUA = function () {
                        return n;
                      }),
                      (this.setUA = function (e) {
                        return (
                          (n =
                            typeof e === d && e.length > 350 ? J(e, 350) : e),
                          this
                        );
                      }),
                      this.setUA(n),
                      this
                    );
                  };
                (ee.VERSION = "1.0.35"),
                  (ee.BROWSER = W([p, m, h])),
                  (ee.CPU = W([y])),
                  (ee.DEVICE = W([f, g, _, w, v, S, b, E, k])),
                  (ee.ENGINE = ee.OS = W([p, m])),
                  typeof s !== u
                    ? (i.exports && (s = i.exports = ee), (s.UAParser = ee))
                    : r.amdO
                      ? void 0 ===
                          (n = function () {
                            return ee;
                          }.call(t, r, t, e)) || (e.exports = n)
                      : typeof a !== u && (a.UAParser = ee);
                var et = typeof a !== u && (a.jQuery || a.Zepto);
                if (et && !et.ua) {
                  var er = new ee();
                  (et.ua = er.getResult()),
                    (et.ua.get = function () {
                      return er.getUA();
                    }),
                    (et.ua.set = function (e) {
                      er.setUA(e);
                      var t = er.getResult();
                      for (var r in t) et.ua[r] = t[r];
                    });
                }
              })("object" == typeof window ? window : this);
            },
          },
          s = {};
        function a(e) {
          var t = s[e];
          if (void 0 !== t) return t.exports;
          var r = (s[e] = { exports: {} }),
            n = !0;
          try {
            i[e].call(r.exports, r, r.exports, a), (n = !1);
          } finally {
            n && delete s[e];
          }
          return r.exports;
        }
        (a.ab = "//"), (e.exports = a(226));
      })();
    },
    46794: (e, t, r) => {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 }),
        !(function (e, t) {
          for (var r in t)
            Object.defineProperty(e, r, { enumerable: !0, get: t[r] });
        })(t, {
          getTestReqInfo: function () {
            return a;
          },
          withRequest: function () {
            return s;
          },
        });
      let n = new (r(65521).AsyncLocalStorage)();
      function i(e, t) {
        let r = t.header(e, "next-test-proxy-port");
        if (!r) return;
        let n = t.url(e);
        return {
          url: n,
          proxyPort: Number(r),
          testData: t.header(e, "next-test-data") || "",
        };
      }
      function s(e, t, r) {
        let s = i(e, t);
        return s ? n.run(s, r) : r();
      }
      function a(e, t) {
        let r = n.getStore();
        return r || (e && t ? i(e, t) : void 0);
      }
    },
    47440: (e, t, r) => {
      "use strict";
      r.d(t, { e: () => n });
      let n = (0, r(2207).xl)();
    },
    47737: (e, t, r) => {
      "use strict";
      r.d(t, { l: () => n });
      class n {
        static get(e, t, r) {
          let n = Reflect.get(e, t, r);
          return "function" == typeof n ? n.bind(e) : n;
        }
        static set(e, t, r, n) {
          return Reflect.set(e, t, r, n);
        }
        static has(e, t) {
          return Reflect.has(e, t);
        }
        static deleteProperty(e, t) {
          return Reflect.deleteProperty(e, t);
        }
      }
    },
    48681: (e) => {
      "use strict";
      (e.exports = n), (e.exports.preferredLanguages = n);
      var t = /^\s*([^\s\-;]+)(?:-([^\s;]+))?\s*(?:;(.*))?$/;
      function r(e, r) {
        var n = t.exec(e);
        if (!n) return null;
        var i = n[1],
          s = n[2],
          a = i;
        s && (a += "-" + s);
        var o = 1;
        if (n[3])
          for (var l = n[3].split(";"), u = 0; u < l.length; u++) {
            var c = l[u].split("=");
            "q" === c[0] && (o = parseFloat(c[1]));
          }
        return { prefix: i, suffix: s, q: o, i: r, full: a };
      }
      function n(e, t) {
        var n = (function (e) {
          for (var t = e.split(","), n = 0, i = 0; n < t.length; n++) {
            var s = r(t[n].trim(), n);
            s && (t[i++] = s);
          }
          return (t.length = i), t;
        })(void 0 === e ? "*" : e || "");
        if (!t) return n.filter(a).sort(i).map(s);
        var o = t.map(function (e, t) {
          for (var i = { o: -1, q: 0, s: 0 }, s = 0; s < n.length; s++) {
            var a = (function (e, t, n) {
              var i = r(e);
              if (!i) return null;
              var s = 0;
              if (t.full.toLowerCase() === i.full.toLowerCase()) s |= 4;
              else if (t.prefix.toLowerCase() === i.full.toLowerCase()) s |= 2;
              else if (t.full.toLowerCase() === i.prefix.toLowerCase()) s |= 1;
              else if ("*" !== t.full) return null;
              return { i: n, o: t.i, q: t.q, s: s };
            })(e, n[s], t);
            a && 0 > (i.s - a.s || i.q - a.q || i.o - a.o) && (i = a);
          }
          return i;
        });
        return o
          .filter(a)
          .sort(i)
          .map(function (e) {
            return t[o.indexOf(e)];
          });
      }
      function i(e, t) {
        return t.q - e.q || t.s - e.s || e.o - t.o || e.i - t.i || 0;
      }
      function s(e) {
        return e.full;
      }
      function a(e) {
        return e.q > 0;
      }
    },
    49097: (e, t, r) => {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 });
      var n = r(14100),
        i = r(99055),
        s = r(15772),
        a = (function (e) {
          return e && e.__esModule ? e : { default: e };
        })(i);
      function o(e, t, r) {
        let i,
          s = new a.default({
            headers: { "accept-language": e.get("accept-language") || void 0 },
          }).languages();
        try {
          let e = t.slice().sort((e, t) => t.length - e.length);
          i = n.match(s, e, r);
        } catch (e) {}
        return i;
      }
      function l(e, t) {
        if (e.localeCookie && t.has(e.localeCookie.name)) {
          var r;
          let n = null == (r = t.get(e.localeCookie.name)) ? void 0 : r.value;
          if (n && e.locales.includes(n)) return n;
        }
      }
      function u(e, t, r, n) {
        var i;
        let a;
        return (
          n &&
            (a =
              null == (i = s.getPathnameMatch(n, e.locales, e.localePrefix))
                ? void 0
                : i.locale),
          !a && e.localeDetection && (a = l(e, r)),
          !a && e.localeDetection && (a = o(t, e.locales, e.defaultLocale)),
          a || (a = e.defaultLocale),
          a
        );
      }
      (t.default = function (e, t, r, n) {
        return e.domains
          ? (function (e, t, r, n) {
              let i,
                a = (function (e, t) {
                  let r = s.getHost(e);
                  if (r) return t.find((e) => e.domain === r);
                })(t, e.domains);
              if (!a) return { locale: u(e, t, r, n) };
              if (n) {
                var c;
                let t =
                  null == (c = s.getPathnameMatch(n, e.locales, e.localePrefix))
                    ? void 0
                    : c.locale;
                if (t) {
                  if (!s.isLocaleSupportedOnDomain(t, a))
                    return { locale: t, domain: a };
                  i = t;
                }
              }
              if (!i && e.localeDetection) {
                let t = l(e, r);
                t && s.isLocaleSupportedOnDomain(t, a) && (i = t);
              }
              if (!i && e.localeDetection) {
                let r = o(t, a.locales || e.locales, a.defaultLocale);
                r && (i = r);
              }
              return i || (i = a.defaultLocale), { locale: i, domain: a };
            })(e, t, r, n)
          : { locale: u(e, t, r, n) };
      }),
        (t.getAcceptLanguageLocale = o);
    },
    50534: (e, t) => {
      "use strict";
      var r = { H: null, A: null };
      function n(e) {
        var t = "https://react.dev/errors/" + e;
        if (1 < arguments.length) {
          t += "?args[]=" + encodeURIComponent(arguments[1]);
          for (var r = 2; r < arguments.length; r++)
            t += "&args[]=" + encodeURIComponent(arguments[r]);
        }
        return (
          "Minified React error #" +
          e +
          "; visit " +
          t +
          " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
        );
      }
      var i = Array.isArray,
        s = Symbol.for("react.transitional.element"),
        a = Symbol.for("react.portal"),
        o = Symbol.for("react.fragment"),
        l = Symbol.for("react.strict_mode"),
        u = Symbol.for("react.profiler"),
        c = Symbol.for("react.forward_ref"),
        d = Symbol.for("react.suspense"),
        h = Symbol.for("react.memo"),
        f = Symbol.for("react.lazy"),
        p = Symbol.iterator,
        _ = Object.prototype.hasOwnProperty,
        g = Object.assign;
      function m(e, t, r, n, i, a) {
        return {
          $$typeof: s,
          type: e,
          key: t,
          ref: void 0 !== (r = a.ref) ? r : null,
          props: a,
        };
      }
      function y(e) {
        return "object" == typeof e && null !== e && e.$$typeof === s;
      }
      var w = /\/+/g;
      function v(e, t) {
        var r, n;
        return "object" == typeof e && null !== e && null != e.key
          ? ((r = "" + e.key),
            (n = { "=": "=0", ":": "=2" }),
            "$" +
              r.replace(/[=:]/g, function (e) {
                return n[e];
              }))
          : t.toString(36);
      }
      function b() {}
      function S(e, t, r) {
        if (null == e) return e;
        var o = [],
          l = 0;
        return (
          !(function e(t, r, o, l, u) {
            var c,
              d,
              h,
              _ = typeof t;
            ("undefined" === _ || "boolean" === _) && (t = null);
            var g = !1;
            if (null === t) g = !0;
            else
              switch (_) {
                case "bigint":
                case "string":
                case "number":
                  g = !0;
                  break;
                case "object":
                  switch (t.$$typeof) {
                    case s:
                    case a:
                      g = !0;
                      break;
                    case f:
                      return e((g = t._init)(t._payload), r, o, l, u);
                  }
              }
            if (g)
              return (
                (u = u(t)),
                (g = "" === l ? "." + v(t, 0) : l),
                i(u)
                  ? ((o = ""),
                    null != g && (o = g.replace(w, "$&/") + "/"),
                    e(u, r, o, "", function (e) {
                      return e;
                    }))
                  : null != u &&
                    (y(u) &&
                      ((c = u),
                      (d =
                        o +
                        (null == u.key || (t && t.key === u.key)
                          ? ""
                          : ("" + u.key).replace(w, "$&/") + "/") +
                        g),
                      (u = m(c.type, d, void 0, void 0, void 0, c.props))),
                    r.push(u)),
                1
              );
            g = 0;
            var S = "" === l ? "." : l + ":";
            if (i(t))
              for (var E = 0; E < t.length; E++)
                (_ = S + v((l = t[E]), E)), (g += e(l, r, o, _, u));
            else if (
              "function" ==
              typeof (E =
                null === (h = t) || "object" != typeof h
                  ? null
                  : "function" == typeof (h = (p && h[p]) || h["@@iterator"])
                    ? h
                    : null)
            )
              for (t = E.call(t), E = 0; !(l = t.next()).done; )
                (_ = S + v((l = l.value), E++)), (g += e(l, r, o, _, u));
            else if ("object" === _) {
              if ("function" == typeof t.then)
                return e(
                  (function (e) {
                    switch (e.status) {
                      case "fulfilled":
                        return e.value;
                      case "rejected":
                        throw e.reason;
                      default:
                        switch (
                          ("string" == typeof e.status
                            ? e.then(b, b)
                            : ((e.status = "pending"),
                              e.then(
                                function (t) {
                                  "pending" === e.status &&
                                    ((e.status = "fulfilled"), (e.value = t));
                                },
                                function (t) {
                                  "pending" === e.status &&
                                    ((e.status = "rejected"), (e.reason = t));
                                },
                              )),
                          e.status)
                        ) {
                          case "fulfilled":
                            return e.value;
                          case "rejected":
                            throw e.reason;
                        }
                    }
                    throw e;
                  })(t),
                  r,
                  o,
                  l,
                  u,
                );
              throw Error(
                n(
                  31,
                  "[object Object]" === (r = String(t))
                    ? "object with keys {" + Object.keys(t).join(", ") + "}"
                    : r,
                ),
              );
            }
            return g;
          })(e, o, "", "", function (e) {
            return t.call(r, e, l++);
          }),
          o
        );
      }
      function E(e) {
        if (-1 === e._status) {
          var t = e._result;
          (t = t()).then(
            function (t) {
              (0 === e._status || -1 === e._status) &&
                ((e._status = 1), (e._result = t));
            },
            function (t) {
              (0 === e._status || -1 === e._status) &&
                ((e._status = 2), (e._result = t));
            },
          ),
            -1 === e._status && ((e._status = 0), (e._result = t));
        }
        if (1 === e._status) return e._result.default;
        throw e._result;
      }
      function k() {
        return new WeakMap();
      }
      function x() {
        return { s: 0, v: void 0, o: null, p: null };
      }
      (t.Children = {
        map: S,
        forEach: function (e, t, r) {
          S(
            e,
            function () {
              t.apply(this, arguments);
            },
            r,
          );
        },
        count: function (e) {
          var t = 0;
          return (
            S(e, function () {
              t++;
            }),
            t
          );
        },
        toArray: function (e) {
          return (
            S(e, function (e) {
              return e;
            }) || []
          );
        },
        only: function (e) {
          if (!y(e)) throw Error(n(143));
          return e;
        },
      }),
        (t.Fragment = o),
        (t.Profiler = u),
        (t.StrictMode = l),
        (t.Suspense = d),
        (t.__SERVER_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = r),
        (t.cache = function (e) {
          return function () {
            var t = r.A;
            if (!t) return e.apply(null, arguments);
            var n = t.getCacheForType(k);
            void 0 === (t = n.get(e)) && ((t = x()), n.set(e, t)), (n = 0);
            for (var i = arguments.length; n < i; n++) {
              var s = arguments[n];
              if (
                "function" == typeof s ||
                ("object" == typeof s && null !== s)
              ) {
                var a = t.o;
                null === a && (t.o = a = new WeakMap()),
                  void 0 === (t = a.get(s)) && ((t = x()), a.set(s, t));
              } else
                null === (a = t.p) && (t.p = a = new Map()),
                  void 0 === (t = a.get(s)) && ((t = x()), a.set(s, t));
            }
            if (1 === t.s) return t.v;
            if (2 === t.s) throw t.v;
            try {
              var o = e.apply(null, arguments);
              return ((n = t).s = 1), (n.v = o);
            } catch (e) {
              throw (((o = t).s = 2), (o.v = e), e);
            }
          };
        }),
        (t.captureOwnerStack = function () {
          return null;
        }),
        (t.cloneElement = function (e, t, r) {
          if (null == e) throw Error(n(267, e));
          var i = g({}, e.props),
            s = e.key,
            a = void 0;
          if (null != t)
            for (o in (void 0 !== t.ref && (a = void 0),
            void 0 !== t.key && (s = "" + t.key),
            t))
              _.call(t, o) &&
                "key" !== o &&
                "__self" !== o &&
                "__source" !== o &&
                ("ref" !== o || void 0 !== t.ref) &&
                (i[o] = t[o]);
          var o = arguments.length - 2;
          if (1 === o) i.children = r;
          else if (1 < o) {
            for (var l = Array(o), u = 0; u < o; u++) l[u] = arguments[u + 2];
            i.children = l;
          }
          return m(e.type, s, void 0, void 0, a, i);
        }),
        (t.createElement = function (e, t, r) {
          var n,
            i = {},
            s = null;
          if (null != t)
            for (n in (void 0 !== t.key && (s = "" + t.key), t))
              _.call(t, n) &&
                "key" !== n &&
                "__self" !== n &&
                "__source" !== n &&
                (i[n] = t[n]);
          var a = arguments.length - 2;
          if (1 === a) i.children = r;
          else if (1 < a) {
            for (var o = Array(a), l = 0; l < a; l++) o[l] = arguments[l + 2];
            i.children = o;
          }
          if (e && e.defaultProps)
            for (n in (a = e.defaultProps)) void 0 === i[n] && (i[n] = a[n]);
          return m(e, s, void 0, void 0, null, i);
        }),
        (t.createRef = function () {
          return { current: null };
        }),
        (t.forwardRef = function (e) {
          return { $$typeof: c, render: e };
        }),
        (t.isValidElement = y),
        (t.lazy = function (e) {
          return {
            $$typeof: f,
            _payload: { _status: -1, _result: e },
            _init: E,
          };
        }),
        (t.memo = function (e, t) {
          return { $$typeof: h, type: e, compare: void 0 === t ? null : t };
        }),
        (t.use = function (e) {
          return r.H.use(e);
        }),
        (t.useCallback = function (e, t) {
          return r.H.useCallback(e, t);
        }),
        (t.useDebugValue = function () {}),
        (t.useId = function () {
          return r.H.useId();
        }),
        (t.useMemo = function (e, t) {
          return r.H.useMemo(e, t);
        }),
        (t.version = "19.2.0-canary-63779030-20250328");
    },
    53443: (e, t) => {
      "use strict";
      function r(e) {
        return (
          ("object" == typeof e
            ? null == e.host && null == e.hostname
            : !/^[a-z]+:/i.test(e)) &&
          !(function (e) {
            let t = "object" == typeof e ? e.pathname : e;
            return null != t && !t.startsWith("/");
          })(e)
        );
      }
      function n(e, t) {
        let r;
        return (
          "string" == typeof e
            ? (r = i(t, e))
            : ((r = { ...e }), e.pathname && (r.pathname = i(t, e.pathname))),
          r
        );
      }
      function i(e, t) {
        let r = e;
        return /^\/(\?.*)?$/.test(t) && (t = t.slice(1)), (r += t);
      }
      function s(e, t) {
        return t === e || t.startsWith("".concat(e, "/"));
      }
      function a(e) {
        let t = (function () {
          try {
            return "true" === process.env._next_intl_trailing_slash;
          } catch (e) {
            return !1;
          }
        })();
        if ("/" !== e) {
          let r = e.endsWith("/");
          t && !r ? (e += "/") : !t && r && (e = e.slice(0, -1));
        }
        return e;
      }
      function o(e) {
        return "/" + e;
      }
      function l(e) {
        let t = e
          .replace(/\[\[(\.\.\.[^\]]+)\]\]/g, "?(.*)")
          .replace(/\[(\.\.\.[^\]]+)\]/g, "(.+)")
          .replace(/\[([^\]]+)\]/g, "([^/]+)");
        return new RegExp("^".concat(t, "$"));
      }
      function u(e) {
        return e.includes("[[...");
      }
      function c(e) {
        return e.includes("[...");
      }
      function d(e) {
        return e.includes("[");
      }
      function h(e, t) {
        let r = e.split("/"),
          n = t.split("/"),
          i = Math.max(r.length, n.length);
        for (let e = 0; e < i; e++) {
          let t = r[e],
            i = n[e];
          if (!t && i) return -1;
          if (t && !i) return 1;
          if (t || i) {
            if (!d(t) && d(i)) return -1;
            if (d(t) && !d(i)) return 1;
            if (!c(t) && c(i)) return -1;
            if (c(t) && !c(i)) return 1;
            if (!u(t) && u(i)) return -1;
            if (u(t) && !u(i)) return 1;
          }
        }
        return 0;
      }
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.getLocaleAsPrefix = o),
        (t.getLocalePrefix = function (e, t) {
          var r;
          return (
            ("never" !== t.mode &&
              (null == (r = t.prefixes) ? void 0 : r[e])) ||
            o(e)
          );
        }),
        (t.getSortedPathnames = function (e) {
          return e.sort(h);
        }),
        (t.hasPathnamePrefixed = s),
        (t.isLocalizableHref = r),
        (t.isPromise = function (e) {
          return "function" == typeof e.then;
        }),
        (t.localizeHref = function (e, t) {
          let i =
              arguments.length > 2 && void 0 !== arguments[2]
                ? arguments[2]
                : t,
            a = arguments.length > 3 ? arguments[3] : void 0,
            o = arguments.length > 4 ? arguments[4] : void 0;
          if (!r(e)) return e;
          let l = s(o, a);
          return (t !== i || l) && null != o ? n(e, o) : e;
        }),
        (t.matchesPathname = function (e, t) {
          let r = a(e),
            n = a(t);
          return l(r).test(n);
        }),
        (t.normalizeTrailingSlash = a),
        (t.prefixHref = n),
        (t.prefixPathname = i),
        (t.templateToRegex = l),
        (t.unprefixPathname = function (e, t) {
          return e.replace(new RegExp("^".concat(t)), "") || "/";
        });
    },
    57057: (e, t, r) => {
      "use strict";
      r.d(t, { CB: () => n, Yq: () => i, l_: () => s });
      class n extends Error {
        constructor({ page: e }) {
          super(`The middleware "${e}" accepts an async API directly with the form:
  
  export function middleware(request, event) {
    return NextResponse.redirect('/new-location')
  }
  
  Read more: https://nextjs.org/docs/messages/middleware-new-signature
  `);
        }
      }
      class i extends Error {
        constructor() {
          super(`The request.page has been deprecated in favour of \`URLPattern\`.
  Read more: https://nextjs.org/docs/messages/middleware-request-page
  `);
        }
      }
      class s extends Error {
        constructor() {
          super(`The request.ua has been removed in favour of \`userAgent\` function.
  Read more: https://nextjs.org/docs/messages/middleware-parse-user-agent
  `);
        }
      }
    },
    58010: (e, t, r) => {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 }),
        !(function (e, t) {
          for (var r in t)
            Object.defineProperty(e, r, { enumerable: !0, get: t[r] });
        })(t, {
          interceptTestApis: function () {
            return s;
          },
          wrapRequestHandler: function () {
            return a;
          },
        });
      let n = r(46794),
        i = r(98099);
      function s() {
        return (0, i.interceptFetch)(r.g.fetch);
      }
      function a(e) {
        return (t, r) => (0, n.withRequest)(t, i.reader, () => e(t, r));
      }
    },
    60643: function (e, t, r) {
      "use strict";
      var n =
        (this && this.__importDefault) ||
        function (e) {
          return e && e.__esModule ? e : { default: e };
        };
      Object.defineProperty(t, "__esModule", { value: !0 });
      let i = n(r(94703));
      class s extends i.default {
        eq(e, t) {
          return this.url.searchParams.append(e, `eq.${t}`), this;
        }
        neq(e, t) {
          return this.url.searchParams.append(e, `neq.${t}`), this;
        }
        gt(e, t) {
          return this.url.searchParams.append(e, `gt.${t}`), this;
        }
        gte(e, t) {
          return this.url.searchParams.append(e, `gte.${t}`), this;
        }
        lt(e, t) {
          return this.url.searchParams.append(e, `lt.${t}`), this;
        }
        lte(e, t) {
          return this.url.searchParams.append(e, `lte.${t}`), this;
        }
        like(e, t) {
          return this.url.searchParams.append(e, `like.${t}`), this;
        }
        likeAllOf(e, t) {
          return (
            this.url.searchParams.append(e, `like(all).{${t.join(",")}}`), this
          );
        }
        likeAnyOf(e, t) {
          return (
            this.url.searchParams.append(e, `like(any).{${t.join(",")}}`), this
          );
        }
        ilike(e, t) {
          return this.url.searchParams.append(e, `ilike.${t}`), this;
        }
        ilikeAllOf(e, t) {
          return (
            this.url.searchParams.append(e, `ilike(all).{${t.join(",")}}`), this
          );
        }
        ilikeAnyOf(e, t) {
          return (
            this.url.searchParams.append(e, `ilike(any).{${t.join(",")}}`), this
          );
        }
        is(e, t) {
          return this.url.searchParams.append(e, `is.${t}`), this;
        }
        in(e, t) {
          let r = Array.from(new Set(t))
            .map((e) =>
              "string" == typeof e && RegExp("[,()]").test(e)
                ? `"${e}"`
                : `${e}`,
            )
            .join(",");
          return this.url.searchParams.append(e, `in.(${r})`), this;
        }
        contains(e, t) {
          return (
            "string" == typeof t
              ? this.url.searchParams.append(e, `cs.${t}`)
              : Array.isArray(t)
                ? this.url.searchParams.append(e, `cs.{${t.join(",")}}`)
                : this.url.searchParams.append(e, `cs.${JSON.stringify(t)}`),
            this
          );
        }
        containedBy(e, t) {
          return (
            "string" == typeof t
              ? this.url.searchParams.append(e, `cd.${t}`)
              : Array.isArray(t)
                ? this.url.searchParams.append(e, `cd.{${t.join(",")}}`)
                : this.url.searchParams.append(e, `cd.${JSON.stringify(t)}`),
            this
          );
        }
        rangeGt(e, t) {
          return this.url.searchParams.append(e, `sr.${t}`), this;
        }
        rangeGte(e, t) {
          return this.url.searchParams.append(e, `nxl.${t}`), this;
        }
        rangeLt(e, t) {
          return this.url.searchParams.append(e, `sl.${t}`), this;
        }
        rangeLte(e, t) {
          return this.url.searchParams.append(e, `nxr.${t}`), this;
        }
        rangeAdjacent(e, t) {
          return this.url.searchParams.append(e, `adj.${t}`), this;
        }
        overlaps(e, t) {
          return (
            "string" == typeof t
              ? this.url.searchParams.append(e, `ov.${t}`)
              : this.url.searchParams.append(e, `ov.{${t.join(",")}}`),
            this
          );
        }
        textSearch(e, t, { config: r, type: n } = {}) {
          let i = "";
          "plain" === n
            ? (i = "pl")
            : "phrase" === n
              ? (i = "ph")
              : "websearch" === n && (i = "w");
          let s = void 0 === r ? "" : `(${r})`;
          return this.url.searchParams.append(e, `${i}fts${s}.${t}`), this;
        }
        match(e) {
          return (
            Object.entries(e).forEach(([e, t]) => {
              this.url.searchParams.append(e, `eq.${t}`);
            }),
            this
          );
        }
        not(e, t, r) {
          return this.url.searchParams.append(e, `not.${t}.${r}`), this;
        }
        or(e, { foreignTable: t, referencedTable: r = t } = {}) {
          let n = r ? `${r}.or` : "or";
          return this.url.searchParams.append(n, `(${e})`), this;
        }
        filter(e, t, r) {
          return this.url.searchParams.append(e, `${t}.${r}`), this;
        }
      }
      t.default = s;
    },
    60870: (e, t, r) => {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.DEFAULT_HEADERS = void 0);
      let n = r(5501);
      t.DEFAULT_HEADERS = { "X-Client-Info": `postgrest-js/${n.version}` };
    },
    64365: (e, t) => {
      "use strict";
      function r(e) {
        return (
          !(null != e && !e) && {
            name: "NEXT_LOCALE",
            maxAge: 31536e3,
            sameSite: "lax",
            ...("object" == typeof e && e),
          }
        );
      }
      function n(e) {
        return "object" == typeof e ? e : { mode: e || "always" };
      }
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.receiveLocaleCookie = r),
        (t.receiveLocalePrefixConfig = n),
        (t.receiveRoutingConfig = function (e) {
          var t, i;
          return {
            ...e,
            localePrefix: n(e.localePrefix),
            localeCookie: r(e.localeCookie),
            localeDetection: null == (t = e.localeDetection) || t,
            alternateLinks: null == (i = e.alternateLinks) || i,
          };
        });
    },
    65521: (e) => {
      "use strict";
      e.exports = require("node:async_hooks");
    },
    71659: (e, t, r) => {
      "use strict";
      r.d(t, { Z: () => n });
      let n = (0, r(94664).xl)();
    },
    71803: (e) => {
      (() => {
        "use strict";
        var t = {
            993: (e) => {
              var t = Object.prototype.hasOwnProperty,
                r = "~";
              function n() {}
              function i(e, t, r) {
                (this.fn = e), (this.context = t), (this.once = r || !1);
              }
              function s(e, t, n, s, a) {
                if ("function" != typeof n)
                  throw TypeError("The listener must be a function");
                var o = new i(n, s || e, a),
                  l = r ? r + t : t;
                return (
                  e._events[l]
                    ? e._events[l].fn
                      ? (e._events[l] = [e._events[l], o])
                      : e._events[l].push(o)
                    : ((e._events[l] = o), e._eventsCount++),
                  e
                );
              }
              function a(e, t) {
                0 == --e._eventsCount
                  ? (e._events = new n())
                  : delete e._events[t];
              }
              function o() {
                (this._events = new n()), (this._eventsCount = 0);
              }
              Object.create &&
                ((n.prototype = Object.create(null)),
                new n().__proto__ || (r = !1)),
                (o.prototype.eventNames = function () {
                  var e,
                    n,
                    i = [];
                  if (0 === this._eventsCount) return i;
                  for (n in (e = this._events))
                    t.call(e, n) && i.push(r ? n.slice(1) : n);
                  return Object.getOwnPropertySymbols
                    ? i.concat(Object.getOwnPropertySymbols(e))
                    : i;
                }),
                (o.prototype.listeners = function (e) {
                  var t = r ? r + e : e,
                    n = this._events[t];
                  if (!n) return [];
                  if (n.fn) return [n.fn];
                  for (var i = 0, s = n.length, a = Array(s); i < s; i++)
                    a[i] = n[i].fn;
                  return a;
                }),
                (o.prototype.listenerCount = function (e) {
                  var t = r ? r + e : e,
                    n = this._events[t];
                  return n ? (n.fn ? 1 : n.length) : 0;
                }),
                (o.prototype.emit = function (e, t, n, i, s, a) {
                  var o = r ? r + e : e;
                  if (!this._events[o]) return !1;
                  var l,
                    u,
                    c = this._events[o],
                    d = arguments.length;
                  if (c.fn) {
                    switch (
                      (c.once && this.removeListener(e, c.fn, void 0, !0), d)
                    ) {
                      case 1:
                        return c.fn.call(c.context), !0;
                      case 2:
                        return c.fn.call(c.context, t), !0;
                      case 3:
                        return c.fn.call(c.context, t, n), !0;
                      case 4:
                        return c.fn.call(c.context, t, n, i), !0;
                      case 5:
                        return c.fn.call(c.context, t, n, i, s), !0;
                      case 6:
                        return c.fn.call(c.context, t, n, i, s, a), !0;
                    }
                    for (u = 1, l = Array(d - 1); u < d; u++)
                      l[u - 1] = arguments[u];
                    c.fn.apply(c.context, l);
                  } else {
                    var h,
                      f = c.length;
                    for (u = 0; u < f; u++)
                      switch (
                        (c[u].once &&
                          this.removeListener(e, c[u].fn, void 0, !0),
                        d)
                      ) {
                        case 1:
                          c[u].fn.call(c[u].context);
                          break;
                        case 2:
                          c[u].fn.call(c[u].context, t);
                          break;
                        case 3:
                          c[u].fn.call(c[u].context, t, n);
                          break;
                        case 4:
                          c[u].fn.call(c[u].context, t, n, i);
                          break;
                        default:
                          if (!l)
                            for (h = 1, l = Array(d - 1); h < d; h++)
                              l[h - 1] = arguments[h];
                          c[u].fn.apply(c[u].context, l);
                      }
                  }
                  return !0;
                }),
                (o.prototype.on = function (e, t, r) {
                  return s(this, e, t, r, !1);
                }),
                (o.prototype.once = function (e, t, r) {
                  return s(this, e, t, r, !0);
                }),
                (o.prototype.removeListener = function (e, t, n, i) {
                  var s = r ? r + e : e;
                  if (!this._events[s]) return this;
                  if (!t) return a(this, s), this;
                  var o = this._events[s];
                  if (o.fn)
                    o.fn !== t ||
                      (i && !o.once) ||
                      (n && o.context !== n) ||
                      a(this, s);
                  else {
                    for (var l = 0, u = [], c = o.length; l < c; l++)
                      (o[l].fn !== t ||
                        (i && !o[l].once) ||
                        (n && o[l].context !== n)) &&
                        u.push(o[l]);
                    u.length
                      ? (this._events[s] = 1 === u.length ? u[0] : u)
                      : a(this, s);
                  }
                  return this;
                }),
                (o.prototype.removeAllListeners = function (e) {
                  var t;
                  return (
                    e
                      ? ((t = r ? r + e : e), this._events[t] && a(this, t))
                      : ((this._events = new n()), (this._eventsCount = 0)),
                    this
                  );
                }),
                (o.prototype.off = o.prototype.removeListener),
                (o.prototype.addListener = o.prototype.on),
                (o.prefixed = r),
                (o.EventEmitter = o),
                (e.exports = o);
            },
            213: (e) => {
              e.exports = (e, t) => (
                (t = t || (() => {})),
                e.then(
                  (e) =>
                    new Promise((e) => {
                      e(t());
                    }).then(() => e),
                  (e) =>
                    new Promise((e) => {
                      e(t());
                    }).then(() => {
                      throw e;
                    }),
                )
              );
            },
            574: (e, t) => {
              Object.defineProperty(t, "__esModule", { value: !0 }),
                (t.default = function (e, t, r) {
                  let n = 0,
                    i = e.length;
                  for (; i > 0; ) {
                    let s = (i / 2) | 0,
                      a = n + s;
                    0 >= r(e[a], t) ? ((n = ++a), (i -= s + 1)) : (i = s);
                  }
                  return n;
                });
            },
            821: (e, t, r) => {
              Object.defineProperty(t, "__esModule", { value: !0 });
              let n = r(574);
              class i {
                constructor() {
                  this._queue = [];
                }
                enqueue(e, t) {
                  let r = {
                    priority: (t = Object.assign({ priority: 0 }, t)).priority,
                    run: e,
                  };
                  if (
                    this.size &&
                    this._queue[this.size - 1].priority >= t.priority
                  )
                    return void this._queue.push(r);
                  let i = n.default(
                    this._queue,
                    r,
                    (e, t) => t.priority - e.priority,
                  );
                  this._queue.splice(i, 0, r);
                }
                dequeue() {
                  let e = this._queue.shift();
                  return null == e ? void 0 : e.run;
                }
                filter(e) {
                  return this._queue
                    .filter((t) => t.priority === e.priority)
                    .map((e) => e.run);
                }
                get size() {
                  return this._queue.length;
                }
              }
              t.default = i;
            },
            816: (e, t, r) => {
              let n = r(213);
              class i extends Error {
                constructor(e) {
                  super(e), (this.name = "TimeoutError");
                }
              }
              let s = (e, t, r) =>
                new Promise((s, a) => {
                  if ("number" != typeof t || t < 0)
                    throw TypeError(
                      "Expected `milliseconds` to be a positive number",
                    );
                  if (t === 1 / 0) return void s(e);
                  let o = setTimeout(() => {
                    if ("function" == typeof r) {
                      try {
                        s(r());
                      } catch (e) {
                        a(e);
                      }
                      return;
                    }
                    let n =
                        "string" == typeof r
                          ? r
                          : `Promise timed out after ${t} milliseconds`,
                      o = r instanceof Error ? r : new i(n);
                    "function" == typeof e.cancel && e.cancel(), a(o);
                  }, t);
                  n(e.then(s, a), () => {
                    clearTimeout(o);
                  });
                });
              (e.exports = s),
                (e.exports.default = s),
                (e.exports.TimeoutError = i);
            },
          },
          r = {};
        function n(e) {
          var i = r[e];
          if (void 0 !== i) return i.exports;
          var s = (r[e] = { exports: {} }),
            a = !0;
          try {
            t[e](s, s.exports, n), (a = !1);
          } finally {
            a && delete r[e];
          }
          return s.exports;
        }
        n.ab = "//";
        var i = {};
        (() => {
          Object.defineProperty(i, "__esModule", { value: !0 });
          let e = n(993),
            t = n(816),
            r = n(821),
            s = () => {},
            a = new t.TimeoutError();
          class o extends e {
            constructor(e) {
              var t, n, i, a;
              if (
                (super(),
                (this._intervalCount = 0),
                (this._intervalEnd = 0),
                (this._pendingCount = 0),
                (this._resolveEmpty = s),
                (this._resolveIdle = s),
                !(
                  "number" ==
                    typeof (e = Object.assign(
                      {
                        carryoverConcurrencyCount: !1,
                        intervalCap: 1 / 0,
                        interval: 0,
                        concurrency: 1 / 0,
                        autoStart: !0,
                        queueClass: r.default,
                      },
                      e,
                    )).intervalCap && e.intervalCap >= 1
                ))
              )
                throw TypeError(
                  `Expected \`intervalCap\` to be a number from 1 and up, got \`${null != (n = null == (t = e.intervalCap) ? void 0 : t.toString()) ? n : ""}\` (${typeof e.intervalCap})`,
                );
              if (
                void 0 === e.interval ||
                !(Number.isFinite(e.interval) && e.interval >= 0)
              )
                throw TypeError(
                  `Expected \`interval\` to be a finite number >= 0, got \`${null != (a = null == (i = e.interval) ? void 0 : i.toString()) ? a : ""}\` (${typeof e.interval})`,
                );
              (this._carryoverConcurrencyCount = e.carryoverConcurrencyCount),
                (this._isIntervalIgnored =
                  e.intervalCap === 1 / 0 || 0 === e.interval),
                (this._intervalCap = e.intervalCap),
                (this._interval = e.interval),
                (this._queue = new e.queueClass()),
                (this._queueClass = e.queueClass),
                (this.concurrency = e.concurrency),
                (this._timeout = e.timeout),
                (this._throwOnTimeout = !0 === e.throwOnTimeout),
                (this._isPaused = !1 === e.autoStart);
            }
            get _doesIntervalAllowAnother() {
              return (
                this._isIntervalIgnored ||
                this._intervalCount < this._intervalCap
              );
            }
            get _doesConcurrentAllowAnother() {
              return this._pendingCount < this._concurrency;
            }
            _next() {
              this._pendingCount--,
                this._tryToStartAnother(),
                this.emit("next");
            }
            _resolvePromises() {
              this._resolveEmpty(),
                (this._resolveEmpty = s),
                0 === this._pendingCount &&
                  (this._resolveIdle(),
                  (this._resolveIdle = s),
                  this.emit("idle"));
            }
            _onResumeInterval() {
              this._onInterval(),
                this._initializeIntervalIfNeeded(),
                (this._timeoutId = void 0);
            }
            _isIntervalPaused() {
              let e = Date.now();
              if (void 0 === this._intervalId) {
                let t = this._intervalEnd - e;
                if (!(t < 0))
                  return (
                    void 0 === this._timeoutId &&
                      (this._timeoutId = setTimeout(() => {
                        this._onResumeInterval();
                      }, t)),
                    !0
                  );
                this._intervalCount = this._carryoverConcurrencyCount
                  ? this._pendingCount
                  : 0;
              }
              return !1;
            }
            _tryToStartAnother() {
              if (0 === this._queue.size)
                return (
                  this._intervalId && clearInterval(this._intervalId),
                  (this._intervalId = void 0),
                  this._resolvePromises(),
                  !1
                );
              if (!this._isPaused) {
                let e = !this._isIntervalPaused();
                if (
                  this._doesIntervalAllowAnother &&
                  this._doesConcurrentAllowAnother
                ) {
                  let t = this._queue.dequeue();
                  return (
                    !!t &&
                    (this.emit("active"),
                    t(),
                    e && this._initializeIntervalIfNeeded(),
                    !0)
                  );
                }
              }
              return !1;
            }
            _initializeIntervalIfNeeded() {
              this._isIntervalIgnored ||
                void 0 !== this._intervalId ||
                ((this._intervalId = setInterval(() => {
                  this._onInterval();
                }, this._interval)),
                (this._intervalEnd = Date.now() + this._interval));
            }
            _onInterval() {
              0 === this._intervalCount &&
                0 === this._pendingCount &&
                this._intervalId &&
                (clearInterval(this._intervalId), (this._intervalId = void 0)),
                (this._intervalCount = this._carryoverConcurrencyCount
                  ? this._pendingCount
                  : 0),
                this._processQueue();
            }
            _processQueue() {
              for (; this._tryToStartAnother(); );
            }
            get concurrency() {
              return this._concurrency;
            }
            set concurrency(e) {
              if (!("number" == typeof e && e >= 1))
                throw TypeError(
                  `Expected \`concurrency\` to be a number from 1 and up, got \`${e}\` (${typeof e})`,
                );
              (this._concurrency = e), this._processQueue();
            }
            async add(e, r = {}) {
              return new Promise((n, i) => {
                let s = async () => {
                  this._pendingCount++, this._intervalCount++;
                  try {
                    let s =
                      void 0 === this._timeout && void 0 === r.timeout
                        ? e()
                        : t.default(
                            Promise.resolve(e()),
                            void 0 === r.timeout ? this._timeout : r.timeout,
                            () => {
                              (void 0 === r.throwOnTimeout
                                ? this._throwOnTimeout
                                : r.throwOnTimeout) && i(a);
                            },
                          );
                    n(await s);
                  } catch (e) {
                    i(e);
                  }
                  this._next();
                };
                this._queue.enqueue(s, r),
                  this._tryToStartAnother(),
                  this.emit("add");
              });
            }
            async addAll(e, t) {
              return Promise.all(e.map(async (e) => this.add(e, t)));
            }
            start() {
              return (
                this._isPaused && ((this._isPaused = !1), this._processQueue()),
                this
              );
            }
            pause() {
              this._isPaused = !0;
            }
            clear() {
              this._queue = new this._queueClass();
            }
            async onEmpty() {
              if (0 !== this._queue.size)
                return new Promise((e) => {
                  let t = this._resolveEmpty;
                  this._resolveEmpty = () => {
                    t(), e();
                  };
                });
            }
            async onIdle() {
              if (0 !== this._pendingCount || 0 !== this._queue.size)
                return new Promise((e) => {
                  let t = this._resolveIdle;
                  this._resolveIdle = () => {
                    t(), e();
                  };
                });
            }
            get size() {
              return this._queue.size;
            }
            sizeBy(e) {
              return this._queue.filter(e).length;
            }
            get pending() {
              return this._pendingCount;
            }
            get isPaused() {
              return this._isPaused;
            }
            get timeout() {
              return this._timeout;
            }
            set timeout(e) {
              this._timeout = e;
            }
          }
          i.default = o;
        })(),
          (e.exports = i);
      })();
    },
    75007: (e, t, r) => {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 });
      var n = r(18947),
        i = r(64365),
        s = r(17255),
        a = r(53443),
        o = r(9594),
        l = r(49097),
        u = r(6680),
        c = r(15772);
      t.default = function (e, t) {
        var r, d, h;
        let f = i.receiveRoutingConfig({
          ...e,
          alternateLinks:
            null != (r = null == t ? void 0 : t.alternateLinks)
              ? r
              : e.alternateLinks,
          localeDetection:
            null != (d = null == t ? void 0 : t.localeDetection)
              ? d
              : e.localeDetection,
          localeCookie:
            null != (h = null == t ? void 0 : t.localeCookie)
              ? h
              : e.localeCookie,
        });
        return function (e) {
          var t;
          let r;
          try {
            r = decodeURI(e.nextUrl.pathname);
          } catch (e) {
            return n.NextResponse.next();
          }
          let i = c.sanitizePathname(r),
            { domain: d, locale: h } = l.default(f, e.headers, e.cookies, i),
            p = d ? d.defaultLocale === h : h === f.defaultLocale,
            _ =
              (null == (t = f.domains)
                ? void 0
                : t.filter((e) => c.isLocaleSupportedOnDomain(h, e))) || [],
            g = null != f.domains && !d;
          function m(t) {
            let r = new URL(t, e.url);
            e.nextUrl.basePath &&
              (r.pathname = c.applyBasePath(r.pathname, e.nextUrl.basePath));
            let i = new Headers(e.headers);
            return (
              i.set(s.HEADER_LOCALE_NAME, h),
              n.NextResponse.rewrite(r, { request: { headers: i } })
            );
          }
          function y(t, r) {
            var i, s;
            let o = new URL(t, e.url);
            if (
              ((o.pathname = a.normalizeTrailingSlash(o.pathname)),
              _.length > 0 && !r && d)
            ) {
              let e = c.getBestMatchingDomain(d, h, _);
              e &&
                ((r = e.domain),
                e.defaultLocale === h &&
                  "as-needed" === f.localePrefix.mode &&
                  (o.pathname = c.getNormalizedPathname(
                    o.pathname,
                    f.locales,
                    f.localePrefix,
                  )));
            }
            return (
              r &&
                ((o.host = r),
                e.headers.get("x-forwarded-host") &&
                  ((o.protocol =
                    null != (i = e.headers.get("x-forwarded-proto"))
                      ? i
                      : e.nextUrl.protocol),
                  (o.port =
                    null != (s = e.headers.get("x-forwarded-port")) ? s : ""))),
              e.nextUrl.basePath &&
                (o.pathname = c.applyBasePath(o.pathname, e.nextUrl.basePath)),
              n.NextResponse.redirect(o.toString())
            );
          }
          let w = c.getNormalizedPathname(i, f.locales, f.localePrefix),
            v = c.getPathnameMatch(i, f.locales, f.localePrefix),
            b = null != v,
            S =
              "never" === f.localePrefix.mode ||
              (p && "as-needed" === f.localePrefix.mode),
            E,
            k,
            x = w,
            T = f.pathnames;
          if (T) {
            let t;
            if ((([t, k] = c.getInternalTemplate(T, w, h)), k)) {
              let r = T[k],
                n = "string" == typeof r ? r : r[h];
              if (a.matchesPathname(n, w))
                x = c.formatTemplatePathname(w, n, k);
              else {
                let i;
                i = t ? ("string" == typeof r ? r : r[t]) : k;
                let s = S ? void 0 : a.getLocalePrefix(h, f.localePrefix),
                  o = c.formatTemplatePathname(w, i, n);
                E = y(c.formatPathname(o, s, e.nextUrl.search));
              }
            }
          }
          if (!E)
            if ("/" !== x || b) {
              let t = c.formatPathname(
                x,
                c.getLocaleAsPrefix(h),
                e.nextUrl.search,
              );
              if (b) {
                let r = c.formatPathname(w, v.prefix, e.nextUrl.search);
                if ("never" === f.localePrefix.mode)
                  E = y(c.formatPathname(w, void 0, e.nextUrl.search));
                else if (v.exact)
                  if (p && S)
                    E = y(c.formatPathname(w, void 0, e.nextUrl.search));
                  else if (f.domains) {
                    let e = c.getBestMatchingDomain(d, v.locale, _);
                    E =
                      (null == d ? void 0 : d.domain) ===
                        (null == e ? void 0 : e.domain) || g
                        ? m(t)
                        : y(r, null == e ? void 0 : e.domain);
                  } else E = m(t);
                else E = y(r);
              } else
                E = S
                  ? m(t)
                  : y(
                      c.formatPathname(
                        w,
                        a.getLocalePrefix(h, f.localePrefix),
                        e.nextUrl.search,
                      ),
                    );
            } else
              E = S
                ? m(
                    c.formatPathname(
                      x,
                      c.getLocaleAsPrefix(h),
                      e.nextUrl.search,
                    ),
                  )
                : y(
                    c.formatPathname(
                      w,
                      a.getLocalePrefix(h, f.localePrefix),
                      e.nextUrl.search,
                    ),
                  );
          return (
            f.localeDetection &&
              f.localeCookie &&
              u.default(e, E, h, f.localeCookie),
            "never" !== f.localePrefix.mode &&
              f.alternateLinks &&
              f.locales.length > 1 &&
              E.headers.set(
                "Link",
                o.default({
                  routing: f,
                  localizedPathnames: null != k && T ? T[k] : void 0,
                  request: e,
                  resolvedLocale: h,
                }),
              ),
            E
          );
        };
      };
    },
    75565: (e) => {
      "use strict";
      var t = Object.defineProperty,
        r = Object.getOwnPropertyDescriptor,
        n = Object.getOwnPropertyNames,
        i = Object.prototype.hasOwnProperty,
        s = {};
      function a(e) {
        var t;
        let r = [
            "path" in e && e.path && `Path=${e.path}`,
            "expires" in e &&
              (e.expires || 0 === e.expires) &&
              `Expires=${("number" == typeof e.expires ? new Date(e.expires) : e.expires).toUTCString()}`,
            "maxAge" in e &&
              "number" == typeof e.maxAge &&
              `Max-Age=${e.maxAge}`,
            "domain" in e && e.domain && `Domain=${e.domain}`,
            "secure" in e && e.secure && "Secure",
            "httpOnly" in e && e.httpOnly && "HttpOnly",
            "sameSite" in e && e.sameSite && `SameSite=${e.sameSite}`,
            "partitioned" in e && e.partitioned && "Partitioned",
            "priority" in e && e.priority && `Priority=${e.priority}`,
          ].filter(Boolean),
          n = `${e.name}=${encodeURIComponent(null != (t = e.value) ? t : "")}`;
        return 0 === r.length ? n : `${n}; ${r.join("; ")}`;
      }
      function o(e) {
        let t = new Map();
        for (let r of e.split(/; */)) {
          if (!r) continue;
          let e = r.indexOf("=");
          if (-1 === e) {
            t.set(r, "true");
            continue;
          }
          let [n, i] = [r.slice(0, e), r.slice(e + 1)];
          try {
            t.set(n, decodeURIComponent(null != i ? i : "true"));
          } catch {}
        }
        return t;
      }
      function l(e) {
        if (!e) return;
        let [[t, r], ...n] = o(e),
          {
            domain: i,
            expires: s,
            httponly: a,
            maxage: l,
            path: d,
            samesite: h,
            secure: f,
            partitioned: p,
            priority: _,
          } = Object.fromEntries(
            n.map(([e, t]) => [e.toLowerCase().replace(/-/g, ""), t]),
          );
        {
          var g,
            m,
            y = {
              name: t,
              value: decodeURIComponent(r),
              domain: i,
              ...(s && { expires: new Date(s) }),
              ...(a && { httpOnly: !0 }),
              ...("string" == typeof l && { maxAge: Number(l) }),
              path: d,
              ...(h && {
                sameSite: u.includes((g = (g = h).toLowerCase())) ? g : void 0,
              }),
              ...(f && { secure: !0 }),
              ...(_ && {
                priority: c.includes((m = (m = _).toLowerCase())) ? m : void 0,
              }),
              ...(p && { partitioned: !0 }),
            };
          let e = {};
          for (let t in y) y[t] && (e[t] = y[t]);
          return e;
        }
      }
      ((e, r) => {
        for (var n in r) t(e, n, { get: r[n], enumerable: !0 });
      })(s, {
        RequestCookies: () => d,
        ResponseCookies: () => h,
        parseCookie: () => o,
        parseSetCookie: () => l,
        stringifyCookie: () => a,
      }),
        (e.exports = ((e, s, a, o) => {
          if ((s && "object" == typeof s) || "function" == typeof s)
            for (let l of n(s))
              i.call(e, l) ||
                l === a ||
                t(e, l, {
                  get: () => s[l],
                  enumerable: !(o = r(s, l)) || o.enumerable,
                });
          return e;
        })(t({}, "__esModule", { value: !0 }), s));
      var u = ["strict", "lax", "none"],
        c = ["low", "medium", "high"],
        d = class {
          constructor(e) {
            (this._parsed = new Map()), (this._headers = e);
            let t = e.get("cookie");
            if (t)
              for (let [e, r] of o(t))
                this._parsed.set(e, { name: e, value: r });
          }
          [Symbol.iterator]() {
            return this._parsed[Symbol.iterator]();
          }
          get size() {
            return this._parsed.size;
          }
          get(...e) {
            let t = "string" == typeof e[0] ? e[0] : e[0].name;
            return this._parsed.get(t);
          }
          getAll(...e) {
            var t;
            let r = Array.from(this._parsed);
            if (!e.length) return r.map(([e, t]) => t);
            let n =
              "string" == typeof e[0]
                ? e[0]
                : null == (t = e[0])
                  ? void 0
                  : t.name;
            return r.filter(([e]) => e === n).map(([e, t]) => t);
          }
          has(e) {
            return this._parsed.has(e);
          }
          set(...e) {
            let [t, r] = 1 === e.length ? [e[0].name, e[0].value] : e,
              n = this._parsed;
            return (
              n.set(t, { name: t, value: r }),
              this._headers.set(
                "cookie",
                Array.from(n)
                  .map(([e, t]) => a(t))
                  .join("; "),
              ),
              this
            );
          }
          delete(e) {
            let t = this._parsed,
              r = Array.isArray(e) ? e.map((e) => t.delete(e)) : t.delete(e);
            return (
              this._headers.set(
                "cookie",
                Array.from(t)
                  .map(([e, t]) => a(t))
                  .join("; "),
              ),
              r
            );
          }
          clear() {
            return this.delete(Array.from(this._parsed.keys())), this;
          }
          [Symbol.for("edge-runtime.inspect.custom")]() {
            return `RequestCookies ${JSON.stringify(Object.fromEntries(this._parsed))}`;
          }
          toString() {
            return [...this._parsed.values()]
              .map((e) => `${e.name}=${encodeURIComponent(e.value)}`)
              .join("; ");
          }
        },
        h = class {
          constructor(e) {
            var t, r, n;
            (this._parsed = new Map()), (this._headers = e);
            let i =
              null !=
              (n =
                null != (r = null == (t = e.getSetCookie) ? void 0 : t.call(e))
                  ? r
                  : e.get("set-cookie"))
                ? n
                : [];
            for (let e of Array.isArray(i)
              ? i
              : (function (e) {
                  if (!e) return [];
                  var t,
                    r,
                    n,
                    i,
                    s,
                    a = [],
                    o = 0;
                  function l() {
                    for (; o < e.length && /\s/.test(e.charAt(o)); ) o += 1;
                    return o < e.length;
                  }
                  for (; o < e.length; ) {
                    for (t = o, s = !1; l(); )
                      if ("," === (r = e.charAt(o))) {
                        for (
                          n = o, o += 1, l(), i = o;
                          o < e.length &&
                          "=" !== (r = e.charAt(o)) &&
                          ";" !== r &&
                          "," !== r;

                        )
                          o += 1;
                        o < e.length && "=" === e.charAt(o)
                          ? ((s = !0),
                            (o = i),
                            a.push(e.substring(t, n)),
                            (t = o))
                          : (o = n + 1);
                      } else o += 1;
                    (!s || o >= e.length) && a.push(e.substring(t, e.length));
                  }
                  return a;
                })(i)) {
              let t = l(e);
              t && this._parsed.set(t.name, t);
            }
          }
          get(...e) {
            let t = "string" == typeof e[0] ? e[0] : e[0].name;
            return this._parsed.get(t);
          }
          getAll(...e) {
            var t;
            let r = Array.from(this._parsed.values());
            if (!e.length) return r;
            let n =
              "string" == typeof e[0]
                ? e[0]
                : null == (t = e[0])
                  ? void 0
                  : t.name;
            return r.filter((e) => e.name === n);
          }
          has(e) {
            return this._parsed.has(e);
          }
          set(...e) {
            let [t, r, n] = 1 === e.length ? [e[0].name, e[0].value, e[0]] : e,
              i = this._parsed;
            return (
              i.set(
                t,
                (function (e = { name: "", value: "" }) {
                  return (
                    "number" == typeof e.expires &&
                      (e.expires = new Date(e.expires)),
                    e.maxAge &&
                      (e.expires = new Date(Date.now() + 1e3 * e.maxAge)),
                    (null === e.path || void 0 === e.path) && (e.path = "/"),
                    e
                  );
                })({ name: t, value: r, ...n }),
              ),
              (function (e, t) {
                for (let [, r] of (t.delete("set-cookie"), e)) {
                  let e = a(r);
                  t.append("set-cookie", e);
                }
              })(i, this._headers),
              this
            );
          }
          delete(...e) {
            let [t, r] = "string" == typeof e[0] ? [e[0]] : [e[0].name, e[0]];
            return this.set({ ...r, name: t, value: "", expires: new Date(0) });
          }
          [Symbol.for("edge-runtime.inspect.custom")]() {
            return `ResponseCookies ${JSON.stringify(Object.fromEntries(this._parsed))}`;
          }
          toString() {
            return [...this._parsed.values()].map(a).join("; ");
          }
        };
    },
    79590: (e, t, r) => {
      "use strict";
      r.d(t, { R: () => c });
      var n = r(29130),
        i = r(45077),
        s = r(97236),
        a = r(47737);
      let o = Symbol("internal response"),
        l = new Set([301, 302, 303, 307, 308]);
      function u(e, t) {
        var r;
        if (null == e || null == (r = e.request) ? void 0 : r.headers) {
          if (!(e.request.headers instanceof Headers))
            throw Object.defineProperty(
              Error("request.headers must be an instance of Headers"),
              "__NEXT_ERROR_CODE",
              { value: "E119", enumerable: !1, configurable: !0 },
            );
          let r = [];
          for (let [n, i] of e.request.headers)
            t.set("x-middleware-request-" + n, i), r.push(n);
          t.set("x-middleware-override-headers", r.join(","));
        }
      }
      class c extends Response {
        constructor(e, t = {}) {
          super(e, t);
          let r = this.headers,
            l = new Proxy(new n.VO(r), {
              get(e, i, s) {
                switch (i) {
                  case "delete":
                  case "set":
                    return (...s) => {
                      let a = Reflect.apply(e[i], e, s),
                        o = new Headers(r);
                      return (
                        a instanceof n.VO &&
                          r.set(
                            "x-middleware-set-cookie",
                            a
                              .getAll()
                              .map((e) => (0, n.Ud)(e))
                              .join(","),
                          ),
                        u(t, o),
                        a
                      );
                    };
                  default:
                    return a.l.get(e, i, s);
                }
              },
            });
          this[o] = {
            cookies: l,
            url: t.url
              ? new i.X(t.url, {
                  headers: (0, s.Cu)(r),
                  nextConfig: t.nextConfig,
                })
              : void 0,
          };
        }
        [Symbol.for("edge-runtime.inspect.custom")]() {
          return {
            cookies: this.cookies,
            url: this.url,
            body: this.body,
            bodyUsed: this.bodyUsed,
            headers: Object.fromEntries(this.headers),
            ok: this.ok,
            redirected: this.redirected,
            status: this.status,
            statusText: this.statusText,
            type: this.type,
          };
        }
        get cookies() {
          return this[o].cookies;
        }
        static json(e, t) {
          let r = Response.json(e, t);
          return new c(r.body, r);
        }
        static redirect(e, t) {
          let r =
            "number" == typeof t ? t : ((null == t ? void 0 : t.status) ?? 307);
          if (!l.has(r))
            throw Object.defineProperty(
              RangeError(
                'Failed to execute "redirect" on "response": Invalid status code',
              ),
              "__NEXT_ERROR_CODE",
              { value: "E529", enumerable: !1, configurable: !0 },
            );
          let n = "object" == typeof t ? t : {},
            i = new Headers(null == n ? void 0 : n.headers);
          return (
            i.set("Location", (0, s.qU)(e)),
            new c(null, { ...n, headers: i, status: r })
          );
        }
        static rewrite(e, t) {
          let r = new Headers(null == t ? void 0 : t.headers);
          return (
            r.set("x-middleware-rewrite", (0, s.qU)(e)),
            u(t, r),
            new c(null, { ...t, headers: r })
          );
        }
        static next(e) {
          let t = new Headers(null == e ? void 0 : e.headers);
          return (
            t.set("x-middleware-next", "1"),
            u(e, t),
            new c(null, { ...e, headers: t })
          );
        }
      }
    },
    81619: (e, t) => {
      "use strict";
      (t.q = function (e, t) {
        if ("string" != typeof e)
          throw TypeError("argument str must be a string");
        var r = {},
          i = e.length;
        if (i < 2) return r;
        var s = (t && t.decode) || c,
          a = 0,
          o = 0,
          d = 0;
        do {
          if (-1 === (o = e.indexOf("=", a))) break;
          if (-1 === (d = e.indexOf(";", a))) d = i;
          else if (o > d) {
            a = e.lastIndexOf(";", o - 1) + 1;
            continue;
          }
          var h = l(e, a, o),
            f = u(e, o, h),
            p = e.slice(h, f);
          if (!n.call(r, p)) {
            var _ = l(e, o + 1, d),
              g = u(e, d, _);
            34 === e.charCodeAt(_) && 34 === e.charCodeAt(g - 1) && (_++, g--);
            var m = e.slice(_, g);
            r[p] = (function (e, t) {
              try {
                return t(e);
              } catch (t) {
                return e;
              }
            })(m, s);
          }
          a = d + 1;
        } while (a < i);
        return r;
      }),
        (t.l = function (e, t, n) {
          var l = (n && n.encode) || encodeURIComponent;
          if ("function" != typeof l)
            throw TypeError("option encode is invalid");
          if (!i.test(e)) throw TypeError("argument name is invalid");
          var u = l(t);
          if (!s.test(u)) throw TypeError("argument val is invalid");
          var c = e + "=" + u;
          if (!n) return c;
          if (null != n.maxAge) {
            var d = Math.floor(n.maxAge);
            if (!isFinite(d)) throw TypeError("option maxAge is invalid");
            c += "; Max-Age=" + d;
          }
          if (n.domain) {
            if (!a.test(n.domain)) throw TypeError("option domain is invalid");
            c += "; Domain=" + n.domain;
          }
          if (n.path) {
            if (!o.test(n.path)) throw TypeError("option path is invalid");
            c += "; Path=" + n.path;
          }
          if (n.expires) {
            var h,
              f = n.expires;
            if (((h = f), "[object Date]" !== r.call(h) || isNaN(f.valueOf())))
              throw TypeError("option expires is invalid");
            c += "; Expires=" + f.toUTCString();
          }
          if (
            (n.httpOnly && (c += "; HttpOnly"),
            n.secure && (c += "; Secure"),
            n.partitioned && (c += "; Partitioned"),
            n.priority)
          )
            switch (
              "string" == typeof n.priority
                ? n.priority.toLowerCase()
                : n.priority
            ) {
              case "low":
                c += "; Priority=Low";
                break;
              case "medium":
                c += "; Priority=Medium";
                break;
              case "high":
                c += "; Priority=High";
                break;
              default:
                throw TypeError("option priority is invalid");
            }
          if (n.sameSite)
            switch (
              "string" == typeof n.sameSite
                ? n.sameSite.toLowerCase()
                : n.sameSite
            ) {
              case !0:
              case "strict":
                c += "; SameSite=Strict";
                break;
              case "lax":
                c += "; SameSite=Lax";
                break;
              case "none":
                c += "; SameSite=None";
                break;
              default:
                throw TypeError("option sameSite is invalid");
            }
          return c;
        });
      var r = Object.prototype.toString,
        n = Object.prototype.hasOwnProperty,
        i = /^[!#$%&'*+\-.^_`|~0-9A-Za-z]+$/,
        s =
          /^("?)[\u0021\u0023-\u002B\u002D-\u003A\u003C-\u005B\u005D-\u007E]*\1$/,
        a =
          /^([.]?[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)([.][a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)*$/i,
        o = /^[\u0020-\u003A\u003D-\u007E]*$/;
      function l(e, t, r) {
        do {
          var n = e.charCodeAt(t);
          if (32 !== n && 9 !== n) return t;
        } while (++t < r);
        return r;
      }
      function u(e, t, r) {
        for (; t > r; ) {
          var n = e.charCodeAt(--t);
          if (32 !== n && 9 !== n) return t + 1;
        }
        return r;
      }
      function c(e) {
        return -1 !== e.indexOf("%") ? decodeURIComponent(e) : e;
      }
    },
    86419: (e) => {
      "use strict";
      (e.exports = n), (e.exports.preferredMediaTypes = n);
      var t = /^\s*([^\s\/;]+)\/([^;\s]+)\s*(?:;(.*))?$/;
      function r(e, r) {
        var n = t.exec(e);
        if (!n) return null;
        var i = Object.create(null),
          s = 1,
          a = n[2],
          u = n[1];
        if (n[3])
          for (
            var c = (function (e) {
                for (var t = e.split(";"), r = 1, n = 0; r < t.length; r++)
                  o(t[n]) % 2 == 0 ? (t[++n] = t[r]) : (t[n] += ";" + t[r]);
                t.length = n + 1;
                for (var r = 0; r < t.length; r++) t[r] = t[r].trim();
                return t;
              })(n[3]).map(l),
              d = 0;
            d < c.length;
            d++
          ) {
            var h = c[d],
              f = h[0].toLowerCase(),
              p = h[1],
              _ =
                p && '"' === p[0] && '"' === p[p.length - 1]
                  ? p.slice(1, -1)
                  : p;
            if ("q" === f) {
              s = parseFloat(_);
              break;
            }
            i[f] = _;
          }
        return { type: u, subtype: a, params: i, q: s, i: r };
      }
      function n(e, t) {
        var n = (function (e) {
          for (
            var t = (function (e) {
                for (var t = e.split(","), r = 1, n = 0; r < t.length; r++)
                  o(t[n]) % 2 == 0 ? (t[++n] = t[r]) : (t[n] += "," + t[r]);
                return (t.length = n + 1), t;
              })(e),
              n = 0,
              i = 0;
            n < t.length;
            n++
          ) {
            var s = r(t[n].trim(), n);
            s && (t[i++] = s);
          }
          return (t.length = i), t;
        })(void 0 === e ? "*/*" : e || "");
        if (!t) return n.filter(a).sort(i).map(s);
        var l = t.map(function (e, t) {
          for (var i = { o: -1, q: 0, s: 0 }, s = 0; s < n.length; s++) {
            var a = (function (e, t, n) {
              var i = r(e),
                s = 0;
              if (!i) return null;
              if (t.type.toLowerCase() == i.type.toLowerCase()) s |= 4;
              else if ("*" != t.type) return null;
              if (t.subtype.toLowerCase() == i.subtype.toLowerCase()) s |= 2;
              else if ("*" != t.subtype) return null;
              var a = Object.keys(t.params);
              if (a.length > 0)
                if (
                  !a.every(function (e) {
                    return (
                      "*" == t.params[e] ||
                      (t.params[e] || "").toLowerCase() ==
                        (i.params[e] || "").toLowerCase()
                    );
                  })
                )
                  return null;
                else s |= 1;
              return { i: n, o: t.i, q: t.q, s: s };
            })(e, n[s], t);
            a && 0 > (i.s - a.s || i.q - a.q || i.o - a.o) && (i = a);
          }
          return i;
        });
        return l
          .filter(a)
          .sort(i)
          .map(function (e) {
            return t[l.indexOf(e)];
          });
      }
      function i(e, t) {
        return t.q - e.q || t.s - e.s || e.o - t.o || e.i - t.i || 0;
      }
      function s(e) {
        return e.type + "/" + e.subtype;
      }
      function a(e) {
        return e.q > 0;
      }
      function o(e) {
        for (var t = 0, r = 0; -1 !== (r = e.indexOf('"', r)); ) t++, r++;
        return t;
      }
      function l(e) {
        var t,
          r,
          n = e.indexOf("=");
        return (
          -1 === n ? (t = e) : ((t = e.slice(0, n)), (r = e.slice(n + 1))),
          [t, r]
        );
      }
    },
    87065: (e, t) => {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 });
      class r extends Error {
        constructor(e) {
          super(e.message),
            (this.name = "PostgrestError"),
            (this.details = e.details),
            (this.hint = e.hint),
            (this.code = e.code);
        }
      }
      t.default = r;
    },
    87848: (e, t, r) => {
      "use strict";
      r.d(t, { J: () => l });
      var n = r(45077),
        i = r(97236),
        s = r(57057),
        a = r(29130);
      let o = Symbol("internal request");
      class l extends Request {
        constructor(e, t = {}) {
          let r = "string" != typeof e && "url" in e ? e.url : String(e);
          (0, i.qU)(r), e instanceof Request ? super(e, t) : super(r, t);
          let s = new n.X(r, {
            headers: (0, i.Cu)(this.headers),
            nextConfig: t.nextConfig,
          });
          this[o] = {
            cookies: new a.tm(this.headers),
            nextUrl: s,
            url: s.toString(),
          };
        }
        [Symbol.for("edge-runtime.inspect.custom")]() {
          return {
            cookies: this.cookies,
            nextUrl: this.nextUrl,
            url: this.url,
            bodyUsed: this.bodyUsed,
            cache: this.cache,
            credentials: this.credentials,
            destination: this.destination,
            headers: Object.fromEntries(this.headers),
            integrity: this.integrity,
            keepalive: this.keepalive,
            method: this.method,
            mode: this.mode,
            redirect: this.redirect,
            referrer: this.referrer,
            referrerPolicy: this.referrerPolicy,
            signal: this.signal,
          };
        }
        get cookies() {
          return this[o].cookies;
        }
        get nextUrl() {
          return this[o].nextUrl;
        }
        get page() {
          throw new s.Yq();
        }
        get ua() {
          throw new s.l_();
        }
        get url() {
          return this[o].url;
        }
      }
    },
    94013: function (e, t, r) {
      "use strict";
      var n =
        (this && this.__importDefault) ||
        function (e) {
          return e && e.__esModule ? e : { default: e };
        };
      Object.defineProperty(t, "__esModule", { value: !0 });
      let i = n(r(96148)),
        s = n(r(87065));
      class a {
        constructor(e) {
          (this.shouldThrowOnError = !1),
            (this.method = e.method),
            (this.url = e.url),
            (this.headers = e.headers),
            (this.schema = e.schema),
            (this.body = e.body),
            (this.shouldThrowOnError = e.shouldThrowOnError),
            (this.signal = e.signal),
            (this.isMaybeSingle = e.isMaybeSingle),
            e.fetch
              ? (this.fetch = e.fetch)
              : "undefined" == typeof fetch
                ? (this.fetch = i.default)
                : (this.fetch = fetch);
        }
        throwOnError() {
          return (this.shouldThrowOnError = !0), this;
        }
        setHeader(e, t) {
          return (
            (this.headers = Object.assign({}, this.headers)),
            (this.headers[e] = t),
            this
          );
        }
        then(e, t) {
          void 0 === this.schema ||
            (["GET", "HEAD"].includes(this.method)
              ? (this.headers["Accept-Profile"] = this.schema)
              : (this.headers["Content-Profile"] = this.schema)),
            "GET" !== this.method &&
              "HEAD" !== this.method &&
              (this.headers["Content-Type"] = "application/json");
          let r = (0, this.fetch)(this.url.toString(), {
            method: this.method,
            headers: this.headers,
            body: JSON.stringify(this.body),
            signal: this.signal,
          }).then(async (e) => {
            var t, r, n;
            let i = null,
              a = null,
              o = null,
              l = e.status,
              u = e.statusText;
            if (e.ok) {
              if ("HEAD" !== this.method) {
                let t = await e.text();
                "" === t ||
                  (a =
                    "text/csv" === this.headers.Accept ||
                    (this.headers.Accept &&
                      this.headers.Accept.includes(
                        "application/vnd.pgrst.plan+text",
                      ))
                      ? t
                      : JSON.parse(t));
              }
              let n =
                  null == (t = this.headers.Prefer)
                    ? void 0
                    : t.match(/count=(exact|planned|estimated)/),
                s =
                  null == (r = e.headers.get("content-range"))
                    ? void 0
                    : r.split("/");
              n && s && s.length > 1 && (o = parseInt(s[1])),
                this.isMaybeSingle &&
                  "GET" === this.method &&
                  Array.isArray(a) &&
                  (a.length > 1
                    ? ((i = {
                        code: "PGRST116",
                        details: `Results contain ${a.length} rows, application/vnd.pgrst.object+json requires 1 row`,
                        hint: null,
                        message:
                          "JSON object requested, multiple (or no) rows returned",
                      }),
                      (a = null),
                      (o = null),
                      (l = 406),
                      (u = "Not Acceptable"))
                    : (a = 1 === a.length ? a[0] : null));
            } else {
              let t = await e.text();
              try {
                (i = JSON.parse(t)),
                  Array.isArray(i) &&
                    404 === e.status &&
                    ((a = []), (i = null), (l = 200), (u = "OK"));
              } catch (r) {
                404 === e.status && "" === t
                  ? ((l = 204), (u = "No Content"))
                  : (i = { message: t });
              }
              if (
                (i &&
                  this.isMaybeSingle &&
                  (null == (n = null == i ? void 0 : i.details)
                    ? void 0
                    : n.includes("0 rows")) &&
                  ((i = null), (l = 200), (u = "OK")),
                i && this.shouldThrowOnError)
              )
                throw new s.default(i);
            }
            return { error: i, data: a, count: o, status: l, statusText: u };
          });
          return (
            this.shouldThrowOnError ||
              (r = r.catch((e) => {
                var t, r, n;
                return {
                  error: {
                    message: `${null != (t = null == e ? void 0 : e.name) ? t : "FetchError"}: ${null == e ? void 0 : e.message}`,
                    details: `${null != (r = null == e ? void 0 : e.stack) ? r : ""}`,
                    hint: "",
                    code: `${null != (n = null == e ? void 0 : e.code) ? n : ""}`,
                  },
                  data: null,
                  count: null,
                  status: 0,
                  statusText: "",
                };
              })),
            r.then(e, t)
          );
        }
        returns() {
          return this;
        }
        overrideTypes() {
          return this;
        }
      }
      t.default = a;
    },
    94664: (e, t, r) => {
      "use strict";
      r.d(t, { cg: () => o, xl: () => a });
      let n = Object.defineProperty(
        Error(
          "Invariant: AsyncLocalStorage accessed in runtime where it is not available",
        ),
        "__NEXT_ERROR_CODE",
        { value: "E504", enumerable: !1, configurable: !0 },
      );
      class i {
        disable() {
          throw n;
        }
        getStore() {}
        run() {
          throw n;
        }
        exit() {
          throw n;
        }
        enterWith() {
          throw n;
        }
        static bind(e) {
          return e;
        }
      }
      let s = "undefined" != typeof globalThis && globalThis.AsyncLocalStorage;
      function a() {
        return s ? new s() : new i();
      }
      function o(e) {
        return s ? s.bind(e) : i.bind(e);
      }
    },
    94703: function (e, t, r) {
      "use strict";
      var n =
        (this && this.__importDefault) ||
        function (e) {
          return e && e.__esModule ? e : { default: e };
        };
      Object.defineProperty(t, "__esModule", { value: !0 });
      let i = n(r(94013));
      class s extends i.default {
        select(e) {
          let t = !1,
            r = (null != e ? e : "*")
              .split("")
              .map((e) =>
                /\s/.test(e) && !t ? "" : ('"' === e && (t = !t), e),
              )
              .join("");
          return (
            this.url.searchParams.set("select", r),
            this.headers.Prefer && (this.headers.Prefer += ","),
            (this.headers.Prefer += "return=representation"),
            this
          );
        }
        order(
          e,
          {
            ascending: t = !0,
            nullsFirst: r,
            foreignTable: n,
            referencedTable: i = n,
          } = {},
        ) {
          let s = i ? `${i}.order` : "order",
            a = this.url.searchParams.get(s);
          return (
            this.url.searchParams.set(
              s,
              `${a ? `${a},` : ""}${e}.${t ? "asc" : "desc"}${void 0 === r ? "" : r ? ".nullsfirst" : ".nullslast"}`,
            ),
            this
          );
        }
        limit(e, { foreignTable: t, referencedTable: r = t } = {}) {
          let n = void 0 === r ? "limit" : `${r}.limit`;
          return this.url.searchParams.set(n, `${e}`), this;
        }
        range(e, t, { foreignTable: r, referencedTable: n = r } = {}) {
          let i = void 0 === n ? "offset" : `${n}.offset`,
            s = void 0 === n ? "limit" : `${n}.limit`;
          return (
            this.url.searchParams.set(i, `${e}`),
            this.url.searchParams.set(s, `${t - e + 1}`),
            this
          );
        }
        abortSignal(e) {
          return (this.signal = e), this;
        }
        single() {
          return (
            (this.headers.Accept = "application/vnd.pgrst.object+json"), this
          );
        }
        maybeSingle() {
          return (
            "GET" === this.method
              ? (this.headers.Accept = "application/json")
              : (this.headers.Accept = "application/vnd.pgrst.object+json"),
            (this.isMaybeSingle = !0),
            this
          );
        }
        csv() {
          return (this.headers.Accept = "text/csv"), this;
        }
        geojson() {
          return (this.headers.Accept = "application/geo+json"), this;
        }
        explain({
          analyze: e = !1,
          verbose: t = !1,
          settings: r = !1,
          buffers: n = !1,
          wal: i = !1,
          format: s = "text",
        } = {}) {
          var a;
          let o = [
              e ? "analyze" : null,
              t ? "verbose" : null,
              r ? "settings" : null,
              n ? "buffers" : null,
              i ? "wal" : null,
            ]
              .filter(Boolean)
              .join("|"),
            l = null != (a = this.headers.Accept) ? a : "application/json";
          return (
            (this.headers.Accept = `application/vnd.pgrst.plan+${s}; for="${l}"; options=${o};`),
            this
          );
        }
        rollback() {
          var e;
          return (
            (null != (e = this.headers.Prefer) ? e : "").trim().length > 0
              ? (this.headers.Prefer += ",tx=rollback")
              : (this.headers.Prefer = "tx=rollback"),
            this
          );
        }
        returns() {
          return this;
        }
      }
      t.default = s;
    },
    96148: (e, t, r) => {
      "use strict";
      r.r(t),
        r.d(t, {
          Headers: () => a,
          Request: () => o,
          Response: () => l,
          default: () => s,
          fetch: () => i,
        });
      var n = (function () {
        if ("undefined" != typeof self) return self;
        if ("undefined" != typeof window) return window;
        if (void 0 !== r.g) return r.g;
        throw Error("unable to locate global object");
      })();
      let i = n.fetch,
        s = n.fetch.bind(n),
        a = n.Headers,
        o = n.Request,
        l = n.Response;
    },
    97236: (e, t, r) => {
      "use strict";
      r.d(t, {
        Cu: () => a,
        RD: () => s,
        p$: () => i,
        qU: () => o,
        wN: () => l,
      });
      var n = r(20421);
      function i(e) {
        let t = new Headers();
        for (let [r, n] of Object.entries(e))
          for (let e of Array.isArray(n) ? n : [n])
            void 0 !== e &&
              ("number" == typeof e && (e = e.toString()), t.append(r, e));
        return t;
      }
      function s(e) {
        var t,
          r,
          n,
          i,
          s,
          a = [],
          o = 0;
        function l() {
          for (; o < e.length && /\s/.test(e.charAt(o)); ) o += 1;
          return o < e.length;
        }
        for (; o < e.length; ) {
          for (t = o, s = !1; l(); )
            if ("," === (r = e.charAt(o))) {
              for (
                n = o, o += 1, l(), i = o;
                o < e.length &&
                "=" !== (r = e.charAt(o)) &&
                ";" !== r &&
                "," !== r;

              )
                o += 1;
              o < e.length && "=" === e.charAt(o)
                ? ((s = !0), (o = i), a.push(e.substring(t, n)), (t = o))
                : (o = n + 1);
            } else o += 1;
          (!s || o >= e.length) && a.push(e.substring(t, e.length));
        }
        return a;
      }
      function a(e) {
        let t = {},
          r = [];
        if (e)
          for (let [n, i] of e.entries())
            "set-cookie" === n.toLowerCase()
              ? (r.push(...s(i)), (t[n] = 1 === r.length ? r[0] : r))
              : (t[n] = i);
        return t;
      }
      function o(e) {
        try {
          return String(new URL(String(e)));
        } catch (t) {
          throw Object.defineProperty(
            Error(
              `URL is malformed "${String(e)}". Please use only absolute URLs - https://nextjs.org/docs/messages/middleware-relative-urls`,
              { cause: t },
            ),
            "__NEXT_ERROR_CODE",
            { value: "E61", enumerable: !1, configurable: !0 },
          );
        }
      }
      function l(e) {
        for (let t of [n.AA, n.h])
          if (e !== t && e.startsWith(t)) return e.substring(t.length);
        return null;
      }
    },
    98099: (e, t, r) => {
      "use strict";
      var n = r(25356).Buffer;
      Object.defineProperty(t, "__esModule", { value: !0 }),
        !(function (e, t) {
          for (var r in t)
            Object.defineProperty(e, r, { enumerable: !0, get: t[r] });
        })(t, {
          handleFetch: function () {
            return o;
          },
          interceptFetch: function () {
            return l;
          },
          reader: function () {
            return s;
          },
        });
      let i = r(46794),
        s = { url: (e) => e.url, header: (e, t) => e.headers.get(t) };
      async function a(e, t) {
        let {
          url: r,
          method: i,
          headers: s,
          body: a,
          cache: o,
          credentials: l,
          integrity: u,
          mode: c,
          redirect: d,
          referrer: h,
          referrerPolicy: f,
        } = t;
        return {
          testData: e,
          api: "fetch",
          request: {
            url: r,
            method: i,
            headers: [
              ...Array.from(s),
              [
                "next-test-stack",
                (function () {
                  let e = (Error().stack ?? "").split("\n");
                  for (let t = 1; t < e.length; t++)
                    if (e[t].length > 0) {
                      e = e.slice(t);
                      break;
                    }
                  return (e = (e = (e = e.filter(
                    (e) => !e.includes("/next/dist/"),
                  )).slice(0, 5)).map((e) =>
                    e.replace("webpack-internal:///(rsc)/", "").trim(),
                  )).join("    ");
                })(),
              ],
            ],
            body: a ? n.from(await t.arrayBuffer()).toString("base64") : null,
            cache: o,
            credentials: l,
            integrity: u,
            mode: c,
            redirect: d,
            referrer: h,
            referrerPolicy: f,
          },
        };
      }
      async function o(e, t) {
        let r = (0, i.getTestReqInfo)(t, s);
        if (!r) return e(t);
        let { testData: o, proxyPort: l } = r,
          u = await a(o, t),
          c = await e(`http://localhost:${l}`, {
            method: "POST",
            body: JSON.stringify(u),
            next: { internal: !0 },
          });
        if (!c.ok)
          throw Object.defineProperty(
            Error(`Proxy request failed: ${c.status}`),
            "__NEXT_ERROR_CODE",
            { value: "E146", enumerable: !1, configurable: !0 },
          );
        let d = await c.json(),
          { api: h } = d;
        switch (h) {
          case "continue":
            return e(t);
          case "abort":
          case "unhandled":
            throw Object.defineProperty(
              Error(`Proxy request aborted [${t.method} ${t.url}]`),
              "__NEXT_ERROR_CODE",
              { value: "E145", enumerable: !1, configurable: !0 },
            );
        }
        let { status: f, headers: p, body: _ } = d.response;
        return new Response(_ ? n.from(_, "base64") : null, {
          status: f,
          headers: new Headers(p),
        });
      }
      function l(e) {
        return (
          (r.g.fetch = function (t, r) {
            var n;
            return (null == r || null == (n = r.next) ? void 0 : n.internal)
              ? e(t, r)
              : o(e, new Request(t, r));
          }),
          () => {
            r.g.fetch = e;
          }
        );
      }
    },
    99055: (e, t, r) => {
      "use strict";
      var n = r(25143),
        i = r(99524),
        s = r(48681),
        a = r(86419);
      function o(e) {
        if (!(this instanceof o)) return new o(e);
        this.request = e;
      }
      (e.exports = o),
        (e.exports.Negotiator = o),
        (o.prototype.charset = function (e) {
          var t = this.charsets(e);
          return t && t[0];
        }),
        (o.prototype.charsets = function (e) {
          return n(this.request.headers["accept-charset"], e);
        }),
        (o.prototype.encoding = function (e, t) {
          var r = this.encodings(e, t);
          return r && r[0];
        }),
        (o.prototype.encodings = function (e, t) {
          return i(
            this.request.headers["accept-encoding"],
            e,
            (t || {}).preferred,
          );
        }),
        (o.prototype.language = function (e) {
          var t = this.languages(e);
          return t && t[0];
        }),
        (o.prototype.languages = function (e) {
          return s(this.request.headers["accept-language"], e);
        }),
        (o.prototype.mediaType = function (e) {
          var t = this.mediaTypes(e);
          return t && t[0];
        }),
        (o.prototype.mediaTypes = function (e) {
          return a(this.request.headers.accept, e);
        }),
        (o.prototype.preferredCharset = o.prototype.charset),
        (o.prototype.preferredCharsets = o.prototype.charsets),
        (o.prototype.preferredEncoding = o.prototype.encoding),
        (o.prototype.preferredEncodings = o.prototype.encodings),
        (o.prototype.preferredLanguage = o.prototype.language),
        (o.prototype.preferredLanguages = o.prototype.languages),
        (o.prototype.preferredMediaType = o.prototype.mediaType),
        (o.prototype.preferredMediaTypes = o.prototype.mediaTypes);
    },
    99524: (e) => {
      "use strict";
      (e.exports = n), (e.exports.preferredEncodings = n);
      var t = /^\s*([^\s;]+)\s*(?:;(.*))?$/;
      function r(e, t, r) {
        var n = 0;
        if (t.encoding.toLowerCase() === e.toLowerCase()) n |= 1;
        else if ("*" !== t.encoding) return null;
        return { encoding: e, i: r, o: t.i, q: t.q, s: n };
      }
      function n(e, n, o) {
        var l = (function (e) {
            for (
              var n = e.split(","), i = !1, s = 1, a = 0, o = 0;
              a < n.length;
              a++
            ) {
              var l = (function (e, r) {
                var n = t.exec(e);
                if (!n) return null;
                var i = n[1],
                  s = 1;
                if (n[2])
                  for (var a = n[2].split(";"), o = 0; o < a.length; o++) {
                    var l = a[o].trim().split("=");
                    if ("q" === l[0]) {
                      s = parseFloat(l[1]);
                      break;
                    }
                  }
                return { encoding: i, q: s, i: r };
              })(n[a].trim(), a);
              l &&
                ((n[o++] = l),
                (i = i || r("identity", l)),
                (s = Math.min(s, l.q || 1)));
            }
            return (
              i || (n[o++] = { encoding: "identity", q: s, i: a }),
              (n.length = o),
              n
            );
          })(e || ""),
          u = o
            ? function (e, t) {
                if (e.q !== t.q) return t.q - e.q;
                var r = o.indexOf(e.encoding),
                  n = o.indexOf(t.encoding);
                return -1 === r && -1 === n
                  ? t.s - e.s || e.o - t.o || e.i - t.i
                  : -1 !== r && -1 !== n
                    ? r - n
                    : -1 === r
                      ? 1
                      : -1;
              }
            : i;
        if (!n) return l.filter(a).sort(u).map(s);
        var c = n.map(function (e, t) {
          for (
            var n = { encoding: e, o: -1, q: 0, s: 0 }, i = 0;
            i < l.length;
            i++
          ) {
            var s = r(e, l[i], t);
            s && 0 > (n.s - s.s || n.q - s.q || n.o - s.o) && (n = s);
          }
          return n;
        });
        return c
          .filter(a)
          .sort(u)
          .map(function (e) {
            return n[c.indexOf(e)];
          });
      }
      function i(e, t) {
        return t.q - e.q || t.s - e.s || e.o - t.o || e.i - t.i;
      }
      function s(e) {
        return e.encoding;
      }
      function a(e) {
        return e.q > 0;
      }
    },
  },
  (e) => {
    var t = e((e.s = 4932));
    (_ENTRIES = "undefined" == typeof _ENTRIES ? {} : _ENTRIES)[
      "middleware_src/middleware"
    ] = t;
  },
]);
//# sourceMappingURL=middleware.js.map
