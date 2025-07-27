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
    (e._sentryDebugIds[t] = "a62c35ac-731a-4ac5-952d-feb84b76cf30"),
    (e._sentryDebugIdIdentifier =
      "sentry-dbid-a62c35ac-731a-4ac5-952d-feb84b76cf30"));
} catch (e) {}
(exports.id = 8305),
  (exports.ids = [8305]),
  (exports.modules = {
    9943: (e) => {
      var t = (function () {
        "use strict";
        var e, t, s;
        function i(e, t) {
          return null != t && e instanceof t;
        }
        try {
          e = Map;
        } catch (t) {
          e = function () {};
        }
        try {
          t = Set;
        } catch (e) {
          t = function () {};
        }
        try {
          s = Promise;
        } catch (e) {
          s = function () {};
        }
        function r(n, o, h, c, l) {
          "object" == typeof o &&
            ((h = o.depth),
            (c = o.prototype),
            (l = o.includeNonEnumerable),
            (o = o.circular));
          var u = [],
            p = [],
            d = "undefined" != typeof Buffer;
          return (
            void 0 === o && (o = !0),
            void 0 === h && (h = 1 / 0),
            (function n(h, f) {
              if (null === h) return null;
              if (0 === f || "object" != typeof h) return h;
              if (i(h, e)) y = new e();
              else if (i(h, t)) y = new t();
              else if (i(h, s))
                y = new s(function (e, t) {
                  h.then(
                    function (t) {
                      e(n(t, f - 1));
                    },
                    function (e) {
                      t(n(e, f - 1));
                    },
                  );
                });
              else if (r.__isArray(h)) y = [];
              else if (r.__isRegExp(h))
                (y = new RegExp(h.source, a(h))),
                  h.lastIndex && (y.lastIndex = h.lastIndex);
              else if (r.__isDate(h)) y = new Date(h.getTime());
              else {
                if (d && Buffer.isBuffer(h))
                  return (
                    (y = Buffer.allocUnsafe
                      ? Buffer.allocUnsafe(h.length)
                      : new Buffer(h.length)),
                    h.copy(y),
                    y
                  );
                i(h, Error)
                  ? (y = Object.create(h))
                  : void 0 === c
                    ? (y = Object.create((m = Object.getPrototypeOf(h))))
                    : ((y = Object.create(c)), (m = c));
              }
              if (o) {
                var y,
                  m,
                  _,
                  b = u.indexOf(h);
                if (-1 != b) return p[b];
                u.push(h), p.push(y);
              }
              for (var g in (i(h, e) &&
                h.forEach(function (e, t) {
                  var s = n(t, f - 1),
                    i = n(e, f - 1);
                  y.set(s, i);
                }),
              i(h, t) &&
                h.forEach(function (e) {
                  var t = n(e, f - 1);
                  y.add(t);
                }),
              h))
                m && (_ = Object.getOwnPropertyDescriptor(m, g)),
                  (_ && null == _.set) || (y[g] = n(h[g], f - 1));
              if (Object.getOwnPropertySymbols)
                for (
                  var E = Object.getOwnPropertySymbols(h), g = 0;
                  g < E.length;
                  g++
                ) {
                  var w = E[g],
                    T = Object.getOwnPropertyDescriptor(h, w);
                  (!T || T.enumerable || l) &&
                    ((y[w] = n(h[w], f - 1)),
                    T.enumerable ||
                      Object.defineProperty(y, w, { enumerable: !1 }));
                }
              if (l)
                for (
                  var v = Object.getOwnPropertyNames(h), g = 0;
                  g < v.length;
                  g++
                ) {
                  var S = v[g],
                    T = Object.getOwnPropertyDescriptor(h, S);
                  (T && T.enumerable) ||
                    ((y[S] = n(h[S], f - 1)),
                    Object.defineProperty(y, S, { enumerable: !1 }));
                }
              return y;
            })(n, h)
          );
        }
        function n(e) {
          return Object.prototype.toString.call(e);
        }
        function a(e) {
          var t = "";
          return (
            e.global && (t += "g"),
            e.ignoreCase && (t += "i"),
            e.multiline && (t += "m"),
            t
          );
        }
        return (
          (r.clonePrototype = function (e) {
            if (null === e) return null;
            var t = function () {};
            return (t.prototype = e), new t();
          }),
          (r.__objToStr = n),
          (r.__isDate = function (e) {
            return "object" == typeof e && "[object Date]" === n(e);
          }),
          (r.__isArray = function (e) {
            return "object" == typeof e && "[object Array]" === n(e);
          }),
          (r.__isRegExp = function (e) {
            return "object" == typeof e && "[object RegExp]" === n(e);
          }),
          (r.__getRegExpFlags = a),
          r
        );
      })();
      e.exports && (e.exports = t);
    },
    33747: function (e, t, s) {
      (function () {
        (e.exports = s(38346)).version = "5.1.2";
      }).call(this);
    },
    38346: function (e, t, s) {
      (function () {
        var t,
          i,
          r = [].splice,
          n = function (e, t) {
            if (!(e instanceof t))
              throw Error("Bound instance method accessed before binding");
          },
          a = [].indexOf;
        (i = s(9943)),
          (t = s(94735).EventEmitter),
          (e.exports = function () {
            class e extends t {
              constructor(e = {}) {
                super(),
                  (this.get = this.get.bind(this)),
                  (this.mget = this.mget.bind(this)),
                  (this.set = this.set.bind(this)),
                  (this.mset = this.mset.bind(this)),
                  (this.del = this.del.bind(this)),
                  (this.take = this.take.bind(this)),
                  (this.ttl = this.ttl.bind(this)),
                  (this.getTtl = this.getTtl.bind(this)),
                  (this.keys = this.keys.bind(this)),
                  (this.has = this.has.bind(this)),
                  (this.getStats = this.getStats.bind(this)),
                  (this.flushAll = this.flushAll.bind(this)),
                  (this.flushStats = this.flushStats.bind(this)),
                  (this.close = this.close.bind(this)),
                  (this._checkData = this._checkData.bind(this)),
                  (this._check = this._check.bind(this)),
                  (this._isInvalidKey = this._isInvalidKey.bind(this)),
                  (this._wrap = this._wrap.bind(this)),
                  (this._getValLength = this._getValLength.bind(this)),
                  (this._error = this._error.bind(this)),
                  (this._initErrors = this._initErrors.bind(this)),
                  (this.options = e),
                  this._initErrors(),
                  (this.data = {}),
                  (this.options = Object.assign(
                    {
                      forceString: !1,
                      objectValueSize: 80,
                      promiseValueSize: 80,
                      arrayValueSize: 40,
                      stdTTL: 0,
                      checkperiod: 600,
                      useClones: !0,
                      deleteOnExpire: !0,
                      enableLegacyCallbacks: !1,
                      maxKeys: -1,
                    },
                    this.options,
                  )),
                  this.options.enableLegacyCallbacks &&
                    (console.warn(
                      "WARNING! node-cache legacy callback support will drop in v6.x",
                    ),
                    [
                      "get",
                      "mget",
                      "set",
                      "del",
                      "ttl",
                      "getTtl",
                      "keys",
                      "has",
                    ].forEach((e) => {
                      var t;
                      (t = this[e]),
                        (this[e] = function (...e) {
                          var s, i, n;
                          if (
                            ((i = e),
                            ([...e] = i),
                            ([s] = r.call(e, -1)),
                            "function" != typeof s)
                          )
                            return t(...e, s);
                          try {
                            (n = t(...e)), s(null, n);
                          } catch (e) {
                            s(e);
                          }
                        });
                    })),
                  (this.stats = {
                    hits: 0,
                    misses: 0,
                    keys: 0,
                    ksize: 0,
                    vsize: 0,
                  }),
                  (this.validKeyTypes = ["string", "number"]),
                  this._checkData();
                return;
              }
              get(t) {
                var s;
                if ((n(this, e), null != (s = this._isInvalidKey(t)))) throw s;
                return null != this.data[t] && this._check(t, this.data[t])
                  ? (this.stats.hits++, this._unwrap(this.data[t]))
                  : void this.stats.misses++;
              }
              mget(t) {
                var s, i, r, a, o;
                if ((n(this, e), !Array.isArray(t)))
                  throw this._error("EKEYSTYPE");
                for (i = 0, o = {}, a = t.length; i < a; i++) {
                  if (((r = t[i]), null != (s = this._isInvalidKey(r))))
                    throw s;
                  null != this.data[r] && this._check(r, this.data[r])
                    ? (this.stats.hits++, (o[r] = this._unwrap(this.data[r])))
                    : this.stats.misses++;
                }
                return o;
              }
              set(t, s, i) {
                var r, a;
                if (
                  (n(this, e),
                  this.options.maxKeys > -1 &&
                    this.stats.keys >= this.options.maxKeys)
                )
                  throw this._error("ECACHEFULL");
                if (
                  (this.options.forceString,
                  null == i && (i = this.options.stdTTL),
                  null != (r = this._isInvalidKey(t)))
                )
                  throw r;
                return (
                  (a = !1),
                  this.data[t] &&
                    ((a = !0),
                    (this.stats.vsize -= this._getValLength(
                      this._unwrap(this.data[t], !1),
                    ))),
                  (this.data[t] = this._wrap(s, i)),
                  (this.stats.vsize += this._getValLength(s)),
                  !a &&
                    ((this.stats.ksize += this._getKeyLength(t)),
                    this.stats.keys++),
                  this.emit("set", t, s),
                  !0
                );
              }
              mset(t) {
                var s, i, r, a, o, h, c, l, u, p;
                if (
                  (n(this, e),
                  this.options.maxKeys > -1 &&
                    this.stats.keys + t.length >= this.options.maxKeys)
                )
                  throw this._error("ECACHEFULL");
                for (r = 0, c = t.length; r < c; r++) {
                  if (
                    ((h = t[r]),
                    ({ key: o, val: p, ttl: u } = h),
                    u && "number" != typeof u)
                  )
                    throw this._error("ETTLTYPE");
                  if (null != (i = this._isInvalidKey(o))) throw i;
                }
                for (a = 0, l = t.length; a < l; a++)
                  (h = t[a]),
                    ({ key: o, val: p, ttl: u } = h),
                    this.set(o, p, u);
                return !0;
              }
              del(t) {
                var s, i, r, a, o, h;
                for (
                  n(this, e),
                    Array.isArray(t) || (t = [t]),
                    s = 0,
                    r = 0,
                    o = t.length;
                  r < o;
                  r++
                ) {
                  if (((a = t[r]), null != (i = this._isInvalidKey(a))))
                    throw i;
                  null != this.data[a] &&
                    ((this.stats.vsize -= this._getValLength(
                      this._unwrap(this.data[a], !1),
                    )),
                    (this.stats.ksize -= this._getKeyLength(a)),
                    this.stats.keys--,
                    s++,
                    (h = this.data[a]),
                    delete this.data[a],
                    this.emit("del", a, h.v));
                }
                return s;
              }
              take(t) {
                var s;
                return n(this, e), null != (s = this.get(t)) && this.del(t), s;
              }
              ttl(t, s) {
                var i;
                if ((n(this, e), s || (s = this.options.stdTTL), !t)) return !1;
                if (null != (i = this._isInvalidKey(t))) throw i;
                return (
                  !!(null != this.data[t] && this._check(t, this.data[t])) &&
                  (s >= 0
                    ? (this.data[t] = this._wrap(this.data[t].v, s, !1))
                    : this.del(t),
                  !0)
                );
              }
              getTtl(t) {
                var s;
                if ((n(this, e), t)) {
                  if (null != (s = this._isInvalidKey(t))) throw s;
                  return null != this.data[t] && this._check(t, this.data[t])
                    ? this.data[t].t
                    : void 0;
                }
              }
              keys() {
                return n(this, e), Object.keys(this.data);
              }
              has(t) {
                return (
                  n(this, e),
                  null != this.data[t] && this._check(t, this.data[t])
                );
              }
              getStats() {
                return n(this, e), this.stats;
              }
              flushAll(t = !0) {
                n(this, e),
                  (this.data = {}),
                  (this.stats = {
                    hits: 0,
                    misses: 0,
                    keys: 0,
                    ksize: 0,
                    vsize: 0,
                  }),
                  this._killCheckPeriod(),
                  this._checkData(t),
                  this.emit("flush");
              }
              flushStats() {
                n(this, e),
                  (this.stats = {
                    hits: 0,
                    misses: 0,
                    keys: 0,
                    ksize: 0,
                    vsize: 0,
                  }),
                  this.emit("flush_stats");
              }
              close() {
                n(this, e), this._killCheckPeriod();
              }
              _checkData(t = !0) {
                var s, i, r;
                for (s in (n(this, e), (i = this.data)))
                  (r = i[s]), this._check(s, r);
                t &&
                  this.options.checkperiod > 0 &&
                  ((this.checkTimeout = setTimeout(
                    this._checkData,
                    1e3 * this.options.checkperiod,
                    t,
                  )),
                  null != this.checkTimeout &&
                    null != this.checkTimeout.unref &&
                    this.checkTimeout.unref());
              }
              _killCheckPeriod() {
                if (null != this.checkTimeout)
                  return clearTimeout(this.checkTimeout);
              }
              _check(t, s) {
                var i;
                return (
                  n(this, e),
                  (i = !0),
                  0 !== s.t &&
                    s.t < Date.now() &&
                    (this.options.deleteOnExpire && ((i = !1), this.del(t)),
                    this.emit("expired", t, this._unwrap(s))),
                  i
                );
              }
              _isInvalidKey(t) {
                var s;
                if (
                  (n(this, e),
                  (s = typeof t),
                  0 > a.call(this.validKeyTypes, s))
                )
                  return this._error("EKEYTYPE", { type: typeof t });
              }
              _wrap(t, s, r = !0) {
                var a, o;
                return (
                  n(this, e),
                  this.options.useClones || (r = !1),
                  (o = Date.now()),
                  {
                    t:
                      0 === s
                        ? 0
                        : s
                          ? o + 1e3 * s
                          : 0 === this.options.stdTTL
                            ? this.options.stdTTL
                            : o + 1e3 * this.options.stdTTL,
                    v: r ? i(t) : t,
                  }
                );
              }
              _unwrap(e, t = !0) {
                if ((this.options.useClones || (t = !1), null != e.v))
                  if (t) return i(e.v);
                  else return e.v;
                return null;
              }
              _getKeyLength(e) {
                return e.toString().length;
              }
              _getValLength(t) {
                if ((n(this, e), "string" == typeof t)) return t.length;
                if (this.options.forceString) return JSON.stringify(t).length;
                if (Array.isArray(t))
                  return this.options.arrayValueSize * t.length;
                if ("number" == typeof t) return 8;
                if ("function" == typeof (null != t ? t.then : void 0))
                  return this.options.promiseValueSize;
                else if (
                  "undefined" != typeof Buffer && null !== Buffer
                    ? Buffer.isBuffer(t)
                    : void 0
                )
                  return t.length;
                else if (null != t && "object" == typeof t)
                  return this.options.objectValueSize * Object.keys(t).length;
                else if ("boolean" == typeof t) return 8;
                else return 0;
              }
              _error(t, s = {}) {
                var i;
                return (
                  n(this, e),
                  ((i = Error()).name = t),
                  (i.errorcode = t),
                  (i.message =
                    null != this.ERRORS[t] ? this.ERRORS[t](s) : "-"),
                  (i.data = s),
                  i
                );
              }
              _initErrors() {
                var t, s, i;
                for (s in (n(this, e), (this.ERRORS = {}), (i = this._ERRORS)))
                  (t = i[s]), (this.ERRORS[s] = this.createErrorMessage(t));
              }
              createErrorMessage(e) {
                return function (t) {
                  return e.replace("__key", t.type);
                };
              }
            }
            return (
              (e.prototype._ERRORS = {
                ENOTFOUND: "Key `__key` not found",
                ECACHEFULL: "Cache max keys amount exceeded",
                EKEYTYPE:
                  "The key argument has to be of type `string` or `number`. Found: `__key`",
                EKEYSTYPE: "The keys argument has to be an array.",
                ETTLTYPE: "The ttl argument has to be a number.",
              }),
              e
            );
          }.call(this));
      }).call(this);
    },
    38507: (e, t, s) => {
      "use strict";
      s.d(t, { jK: () => R });
      var i = class extends Error {
          constructor(e) {
            super(e), (this.name = "UpstashError");
          }
        },
        r = class {
          baseUrl;
          headers;
          options;
          retry;
          constructor(e) {
            (this.options = { cache: e.cache, signal: e.signal }),
              (this.baseUrl = e.baseUrl.replace(/\/$/, "")),
              (this.headers = {
                "Content-Type": "application/json",
                ...e.headers,
              }),
              (this.retry =
                "boolean" == typeof e?.retry && e?.retry === !1
                  ? { attempts: 1, backoff: () => 0 }
                  : {
                      attempts: e?.retry?.retries ?? 5,
                      backoff: e?.retry?.backoff ?? ((e) => 50 * Math.exp(e)),
                    });
          }
          async request(e) {
            let t = {
                cache: this.options.cache,
                method: "POST",
                headers: this.headers,
                body: JSON.stringify(e.body),
                keepalive: !0,
                signal: this.options.signal,
              },
              s = null,
              r = null;
            for (let i = 0; i <= this.retry.attempts; i++)
              try {
                s = await fetch([this.baseUrl, ...(e.path ?? [])].join("/"), t);
                break;
              } catch (e) {
                if (this.options.signal?.aborted) {
                  s = new Response(
                    new Blob([
                      JSON.stringify({
                        result: this.options.signal.reason ?? "Aborted",
                      }),
                    ]),
                    {
                      status: 200,
                      statusText: this.options.signal.reason ?? "Aborted",
                    },
                  );
                  break;
                }
                (r = e),
                  i < this.retry.attempts &&
                    (await new Promise((e) =>
                      setTimeout(e, this.retry.backoff(i)),
                    ));
              }
            if (!s) throw r ?? Error("Exhausted all retries");
            let n = await s.json();
            if (!s.ok) throw new i(`${n.error}`);
            return { result: n.result, error: n.error };
          }
        },
        n = ((e) => ((e.IDF = "IDF"), e))(n || {}),
        a = ((e) => ((e.RRF = "RRF"), (e.DBSF = "DBSF"), e))(a || {}),
        o = ((e) => (
          (e.HYBRID = "HYBRID"), (e.DENSE = "DENSE"), (e.SPARSE = "SPARSE"), e
        ))(o || {}),
        h = class {
          payload;
          endpoint;
          constructor(e, t) {
            (this.payload = e), (this.endpoint = t);
          }
          async exec(e) {
            let { result: t, error: s } = await e.request({
              body: this.payload,
              path: [this.endpoint],
            });
            if (s) throw new i(s);
            if (void 0 === t)
              throw TypeError("Request did not return a result");
            return t;
          }
        },
        c = class extends h {
          constructor(e, t) {
            let s = "query";
            (s = e.some((e) => e.data) ? "query-data" : "query"),
              t?.namespace && (s = `${s}/${t.namespace}`),
              super(e, s);
          }
        },
        l = class extends h {
          constructor(e, t) {
            let s = "query";
            if ("data" in e) s = "query-data";
            else if (!e.vector && !e.sparseVector)
              throw new i(
                "Either data, vector or sparseVector should be provided.",
              );
            t?.namespace && (s = `${s}/${t.namespace}`), super(e, s);
          }
        },
        u = class extends h {
          constructor(e, t) {
            let s = "delete";
            t?.namespace && (s = `${s}/${t.namespace}`),
              "string" == typeof e || "number" == typeof e
                ? super({ ids: [e] }, s)
                : Array.isArray(e)
                  ? super({ ids: e }, s)
                  : "object" == typeof e && super(e, s);
          }
        },
        p = class extends h {
          constructor(e, t) {
            let s = "upsert";
            (s = Array.isArray(e)
              ? e.some((e) => d(e))
                ? "upsert"
                : "upsert-data"
              : d(e)
                ? "upsert"
                : "upsert-data"),
              t?.namespace && (s = `${s}/${t.namespace}`),
              super(e, s);
          }
        },
        d = (e) => "vector" in e || "sparseVector" in e,
        f = class extends h {
          constructor([e, t]) {
            let s = "fetch";
            if (
              (t?.namespace &&
                ((s = `${s}/${t.namespace}`), delete t.namespace),
              Array.isArray(e))
            )
              super({ ids: e, ...t }, s);
            else if ("object" == typeof e) super({ ...e, ...t }, s);
            else throw Error("Invalid payload");
          }
        },
        y = class extends h {
          constructor(e, t) {
            let s = "range";
            t?.namespace && (s = `${s}/${t.namespace}`), super(e, s);
          }
        },
        m = class extends h {
          constructor(e) {
            let t = "reset";
            e?.namespace
              ? (t = `${t}/${e.namespace}`)
              : e?.all && (t = `${t}?all`),
              super([], t);
          }
        },
        _ = class extends h {
          constructor() {
            super([], "info");
          }
        },
        b = class extends h {
          constructor(e) {
            super(e, "resumable-query-next");
          }
        },
        g = class extends h {
          constructor(e, t) {
            let s = "resumable-query";
            "data" in e && (s = "resumable-query-data"),
              t && (s = `${s}/${t}`),
              super(e, s);
          }
        },
        E = class extends h {
          constructor(e) {
            super(e, "resumable-query-end");
          }
        },
        w = class {
          uuid;
          start;
          fetchNext;
          stop;
          constructor(e, t, s) {
            (this.start = async () => {
              let i = await new g(e, s).exec(t);
              return (this.uuid = i.uuid), i;
            }),
              (this.fetchNext = (e) => {
                if (!this.uuid)
                  throw Error(
                    "The resumable query has already been stopped. Please start another resumable query.",
                  );
                return new b({ uuid: this.uuid, additionalK: e }).exec(t);
              }),
              (this.stop = async () => {
                if (!this.uuid)
                  throw Error(
                    "Resumable query has not been started. Call start() first.",
                  );
                let e = await new E({ uuid: this.uuid }).exec(t);
                return (this.uuid = ""), e;
              });
          }
        },
        T = class {
          client;
          namespace;
          constructor(e, t) {
            (this.client = e), (this.namespace = t);
          }
          upsert = (e) =>
            new p(e, { namespace: this.namespace }).exec(this.client);
          update = (e) =>
            new v(e, { namespace: this.namespace }).exec(this.client);
          fetch = (...e) => (
            e[1]
              ? (e[1].namespace = this.namespace)
              : (e[1] = { namespace: this.namespace }),
            new f(e).exec(this.client)
          );
          query = (e) =>
            new l(e, { namespace: this.namespace }).exec(this.client);
          resumableQuery = async (e) => {
            let t = new w(e, this.client, this.namespace),
              s = await t.start(),
              { fetchNext: i, stop: r } = t;
            return { fetchNext: i, stop: r, result: s.scores };
          };
          delete = (e) =>
            new u(e, { namespace: this.namespace }).exec(this.client);
          range = (e) =>
            new y(e, { namespace: this.namespace }).exec(this.client);
          reset = () => new m({ namespace: this.namespace }).exec(this.client);
        },
        v = class extends h {
          constructor(e, t) {
            let s = "update";
            t?.namespace && (s = `${s}/${t.namespace}`), super(e, s);
          }
        },
        S = class extends h {
          constructor() {
            super([], "list-namespaces");
          }
        },
        k = class extends h {
          constructor(e) {
            super([], `delete-namespace/${e}`);
          }
        },
        x = class {
          client;
          constructor(e) {
            this.client = e;
          }
          namespace = (e) => new T(this.client, e);
          delete = (e, t) => new u(e, t).exec(this.client);
          query = (e, t) => new l(e, t).exec(this.client);
          queryMany = (e, t) => new c(e, t).exec(this.client);
          resumableQuery = async (e, t) => {
            let s = new w(e, this.client, t?.namespace),
              i = await s.start(),
              { fetchNext: r, stop: n } = s;
            return { fetchNext: r, stop: n, result: i.scores };
          };
          upsert = (e, t) => new p(e, t).exec(this.client);
          update = (e, t) => new v(e, t).exec(this.client);
          fetch = (...e) => new f(e).exec(this.client);
          reset = (e) => new m(e).exec(this.client);
          range = (e, t) => new y(e, t).exec(this.client);
          info = () => new _().exec(this.client);
          listNamespaces = () => new S().exec(this.client);
          deleteNamespace = (e) => new k(e).exec(this.client);
        },
        R = class e extends x {
          constructor(e) {
            if (void 0 !== e && "request" in e) return void super(e);
            let t =
                e?.token ??
                process.env.NEXT_PUBLIC_UPSTASH_VECTOR_REST_TOKEN ??
                process.env.UPSTASH_VECTOR_REST_TOKEN,
              s =
                e?.url ??
                process.env.NEXT_PUBLIC_UPSTASH_VECTOR_REST_URL ??
                process.env.UPSTASH_VECTOR_REST_URL;
            if (!t) throw Error("UPSTASH_VECTOR_REST_TOKEN is missing!");
            if (!s) throw Error("UPSTASH_VECTOR_REST_URL is missing!");
            (s.startsWith(" ") || s.endsWith(" ") || /\r|\n/.test(s)) &&
              console.warn(
                "The vector url contains whitespace or newline, which can cause errors!",
              ),
              (t.startsWith(" ") || t.endsWith(" ") || /\r|\n/.test(t)) &&
                console.warn(
                  "The vector token contains whitespace or newline, which can cause errors!",
                ),
              super(
                new r({
                  baseUrl: s,
                  retry: e?.retry,
                  headers: {
                    authorization: `Bearer ${t}`,
                    ...(!process.env.UPSTASH_DISABLE_TELEMETRY &&
                    (e?.enableTelemetry ?? !0)
                      ? {
                          "Upstash-Telemetry-Sdk": "upstash-vector-js@v1.2.1",
                          "Upstash-Telemetry-Platform": process.env.VERCEL
                            ? "vercel"
                            : process.env.AWS_REGION
                              ? "aws"
                              : "unknown",
                          "Upstash-Telemetry-Runtime":
                            "object" == typeof process &&
                            "object" == typeof process.versions &&
                            process.versions.bun
                              ? `bun@${process.versions.bun}`
                              : "string" == typeof EdgeRuntime
                                ? "edge-light"
                                : `node@${process.version}`,
                        }
                      : {}),
                  },
                  cache: e?.cache === !1 ? void 0 : e?.cache || "no-store",
                  signal: e?.signal,
                }),
              );
          }
          static fromEnv(t, s) {
            let i =
                t?.UPSTASH_VECTOR_REST_URL ||
                process?.env.UPSTASH_VECTOR_REST_URL,
              r =
                t?.UPSTASH_VECTOR_REST_TOKEN ||
                process?.env.UPSTASH_VECTOR_REST_TOKEN;
            if (!i)
              throw Error(
                "Unable to find environment variable: `UPSTASH_VECTOR_REST_URL`",
              );
            if (!r)
              throw Error(
                "Unable to find environment variable: `UPSTASH_VECTOR_REST_TOKEN`",
              );
            return new e({ ...s, url: i, token: r });
          }
        };
    },
  });
//# sourceMappingURL=8305.js.map
