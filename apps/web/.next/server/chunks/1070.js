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
    (e._sentryDebugIds[t] = "c5a21531-f603-471c-b451-ace775d1cf4f"),
    (e._sentryDebugIdIdentifier =
      "sentry-dbid-c5a21531-f603-471c-b451-ace775d1cf4f"));
} catch (e) {}
("use strict");
(exports.id = 1070),
  (exports.ids = [1070]),
  (exports.modules = {
    11316: (e, t, r) => {
      Object.defineProperty(t, "__esModule", { value: !0 }),
        Object.defineProperty(t, "notFound", {
          enumerable: !0,
          get: function () {
            return a;
          },
        });
      let n = "" + r(17581).HTTP_ERROR_FALLBACK_ERROR_CODE + ";404";
      function a() {
        let e = Object.defineProperty(Error(n), "__NEXT_ERROR_CODE", {
          value: "E394",
          enumerable: !1,
          configurable: !0,
        });
        throw ((e.digest = n), e);
      }
      ("function" == typeof t.default ||
        ("object" == typeof t.default && null !== t.default)) &&
        void 0 === t.default.__esModule &&
        (Object.defineProperty(t.default, "__esModule", { value: !0 }),
        Object.assign(t.default, t),
        (e.exports = t.default));
    },
    14749: (e, t, r) => {
      function n() {
        throw Object.defineProperty(
          Error(
            "`forbidden()` is experimental and only allowed to be enabled when `experimental.authInterrupts` is enabled.",
          ),
          "__NEXT_ERROR_CODE",
          { value: "E488", enumerable: !1, configurable: !0 },
        );
      }
      Object.defineProperty(t, "__esModule", { value: !0 }),
        Object.defineProperty(t, "forbidden", {
          enumerable: !0,
          get: function () {
            return n;
          },
        }),
        r(17581).HTTP_ERROR_FALLBACK_ERROR_CODE,
        ("function" == typeof t.default ||
          ("object" == typeof t.default && null !== t.default)) &&
          void 0 === t.default.__esModule &&
          (Object.defineProperty(t.default, "__esModule", { value: !0 }),
          Object.assign(t.default, t),
          (e.exports = t.default));
    },
    23399: (e, t, r) => {
      Object.defineProperty(t, "__esModule", { value: !0 }),
        Object.defineProperty(t, "unstable_rethrow", {
          enumerable: !0,
          get: function () {
            return function e(t) {
              if (
                (0, o.isNextRouterError)(t) ||
                (0, s.isBailoutToCSRError)(t) ||
                (0, l.isDynamicServerError)(t) ||
                (0, i.isDynamicPostpone)(t) ||
                (0, a.isPostpone)(t) ||
                (0, n.isHangingPromiseRejectionError)(t)
              )
                throw t;
              t instanceof Error && "cause" in t && e(t.cause);
            };
          },
        });
      let n = r(6223),
        a = r(96124),
        s = r(58937),
        o = r(91613),
        i = r(62938),
        l = r(98800);
      ("function" == typeof t.default ||
        ("object" == typeof t.default && null !== t.default)) &&
        void 0 === t.default.__esModule &&
        (Object.defineProperty(t.default, "__esModule", { value: !0 }),
        Object.assign(t.default, t),
        (e.exports = t.default));
    },
    29073: (e, t, r) => {
      var n = r(90645);
      r.o(n, "notFound") &&
        r.d(t, {
          notFound: function () {
            return n.notFound;
          },
        }),
        r.o(n, "permanentRedirect") &&
          r.d(t, {
            permanentRedirect: function () {
              return n.permanentRedirect;
            },
          }),
        r.o(n, "redirect") &&
          r.d(t, {
            redirect: function () {
              return n.redirect;
            },
          });
    },
    42600: (e, t, r) => {
      Object.defineProperty(t, "__esModule", { value: !0 }),
        Object.defineProperty(t, "unstable_rethrow", {
          enumerable: !0,
          get: function () {
            return n;
          },
        });
      let n = r(23399).unstable_rethrow;
      ("function" == typeof t.default ||
        ("object" == typeof t.default && null !== t.default)) &&
        void 0 === t.default.__esModule &&
        (Object.defineProperty(t.default, "__esModule", { value: !0 }),
        Object.assign(t.default, t),
        (e.exports = t.default));
    },
    52480: (e, t, r) => {
      function n() {
        throw Object.defineProperty(
          Error(
            "`unauthorized()` is experimental and only allowed to be used when `experimental.authInterrupts` is enabled.",
          ),
          "__NEXT_ERROR_CODE",
          { value: "E411", enumerable: !1, configurable: !0 },
        );
      }
      Object.defineProperty(t, "__esModule", { value: !0 }),
        Object.defineProperty(t, "unauthorized", {
          enumerable: !0,
          get: function () {
            return n;
          },
        }),
        r(17581).HTTP_ERROR_FALLBACK_ERROR_CODE,
        ("function" == typeof t.default ||
          ("object" == typeof t.default && null !== t.default)) &&
          void 0 === t.default.__esModule &&
          (Object.defineProperty(t.default, "__esModule", { value: !0 }),
          Object.assign(t.default, t),
          (e.exports = t.default));
    },
    65278: (e, t, r) => {
      Object.defineProperty(t, "__esModule", { value: !0 }),
        !(function (e, t) {
          for (var r in t)
            Object.defineProperty(e, r, { enumerable: !0, get: t[r] });
        })(t, {
          getRedirectError: function () {
            return o;
          },
          getRedirectStatusCodeFromError: function () {
            return f;
          },
          getRedirectTypeFromError: function () {
            return c;
          },
          getURLFromRedirectError: function () {
            return u;
          },
          permanentRedirect: function () {
            return l;
          },
          redirect: function () {
            return i;
          },
        });
      let n = r(20835),
        a = r(21293),
        s = r(19121).actionAsyncStorage;
      function o(e, t, r) {
        void 0 === r && (r = n.RedirectStatusCode.TemporaryRedirect);
        let s = Object.defineProperty(
          Error(a.REDIRECT_ERROR_CODE),
          "__NEXT_ERROR_CODE",
          { value: "E394", enumerable: !1, configurable: !0 },
        );
        return (
          (s.digest =
            a.REDIRECT_ERROR_CODE + ";" + t + ";" + e + ";" + r + ";"),
          s
        );
      }
      function i(e, t) {
        var r;
        throw (
          (null != t ||
            (t = (null == s || null == (r = s.getStore()) ? void 0 : r.isAction)
              ? a.RedirectType.push
              : a.RedirectType.replace),
          o(e, t, n.RedirectStatusCode.TemporaryRedirect))
        );
      }
      function l(e, t) {
        throw (
          (void 0 === t && (t = a.RedirectType.replace),
          o(e, t, n.RedirectStatusCode.PermanentRedirect))
        );
      }
      function u(e) {
        return (0, a.isRedirectError)(e)
          ? e.digest.split(";").slice(2, -2).join(";")
          : null;
      }
      function c(e) {
        if (!(0, a.isRedirectError)(e))
          throw Object.defineProperty(
            Error("Not a redirect error"),
            "__NEXT_ERROR_CODE",
            { value: "E260", enumerable: !1, configurable: !0 },
          );
        return e.digest.split(";", 2)[1];
      }
      function f(e) {
        if (!(0, a.isRedirectError)(e))
          throw Object.defineProperty(
            Error("Not a redirect error"),
            "__NEXT_ERROR_CODE",
            { value: "E260", enumerable: !1, configurable: !0 },
          );
        return Number(e.digest.split(";").at(-2));
      }
      ("function" == typeof t.default ||
        ("object" == typeof t.default && null !== t.default)) &&
        void 0 === t.default.__esModule &&
        (Object.defineProperty(t.default, "__esModule", { value: !0 }),
        Object.assign(t.default, t),
        (e.exports = t.default));
    },
    78814: (e, t, r) => {
      r.d(t, { A: () => ew });
      var n = r(21820),
        a = r(29021);
      let s = new Map(),
        o = new Map(),
        i = Symbol("OriginError"),
        l = {};
      class u extends Promise {
        constructor(e, t, r, n, a = {}) {
          let o, l;
          super((e, t) => {
            (o = e), (l = t);
          }),
            (this.tagged = Array.isArray(e.raw)),
            (this.strings = e),
            (this.args = t),
            (this.handler = r),
            (this.canceller = n),
            (this.options = a),
            (this.state = null),
            (this.statement = null),
            (this.resolve = (e) => ((this.active = !1), o(e))),
            (this.reject = (e) => ((this.active = !1), l(e))),
            (this.active = !1),
            (this.cancelled = null),
            (this.executed = !1),
            (this.signature = ""),
            (this[i] = this.handler.debug
              ? Error()
              : this.tagged &&
                (function (e) {
                  if (s.has(e)) return s.get(e);
                  let t = Error.stackTraceLimit;
                  return (
                    (Error.stackTraceLimit = 4),
                    s.set(e, Error()),
                    (Error.stackTraceLimit = t),
                    s.get(e)
                  );
                })(this.strings));
        }
        get origin() {
          return (
            (this.handler.debug
              ? this[i].stack
              : this.tagged && o.has(this.strings)
                ? o.get(this.strings)
                : o.set(this.strings, this[i].stack).get(this.strings)) || ""
          );
        }
        static get [Symbol.species]() {
          return Promise;
        }
        cancel() {
          return (
            this.canceller && (this.canceller(this), (this.canceller = null))
          );
        }
        simple() {
          return (this.options.simple = !0), (this.options.prepare = !1), this;
        }
        async readable() {
          return this.simple(), (this.streaming = !0), this;
        }
        async writable() {
          return this.simple(), (this.streaming = !0), this;
        }
        cursor(e = 1, t) {
          let r;
          return ((this.options.simple = !1),
          "function" == typeof e && ((t = e), (e = 1)),
          (this.cursorRows = e),
          "function" == typeof t)
            ? ((this.cursorFn = t), this)
            : {
                [Symbol.asyncIterator]: () => ({
                  next: () => {
                    if (this.executed && !this.active) return { done: !0 };
                    r && r();
                    let e = new Promise((e, t) => {
                      (this.cursorFn = (t) => (
                        e({ value: t, done: !1 }), new Promise((e) => (r = e))
                      )),
                        (this.resolve = () => (
                          (this.active = !1), e({ done: !0 })
                        )),
                        (this.reject = (e) => ((this.active = !1), t(e)));
                    });
                    return this.execute(), e;
                  },
                  return: () => (r && r(l), { done: !0 }),
                }),
              };
        }
        describe() {
          return (
            (this.options.simple = !1),
            (this.onlyDescribe = this.options.prepare = !0),
            this
          );
        }
        stream() {
          throw Error(".stream has been renamed to .forEach");
        }
        forEach(e) {
          return (this.forEachFn = e), this.handle(), this;
        }
        raw() {
          return (this.isRaw = !0), this;
        }
        values() {
          return (this.isRaw = "values"), this;
        }
        async handle() {
          !this.executed &&
            (this.executed = !0) &&
            (await 1) &&
            this.handler(this);
        }
        execute() {
          return this.handle(), this;
        }
        then() {
          return this.handle(), super.then.apply(this, arguments);
        }
        catch() {
          return this.handle(), super.catch.apply(this, arguments);
        }
        finally() {
          return this.handle(), super.finally.apply(this, arguments);
        }
      }
      class c extends Error {
        constructor(e) {
          super(e.message),
            (this.name = this.constructor.name),
            Object.assign(this, e);
        }
      }
      let f = {
        connection: function e(t, r, n) {
          let { host: a, port: s } = n || r,
            o = Object.assign(
              Error("write " + t + " " + (r.path || a + ":" + s)),
              { code: t, errno: t, address: r.path || a },
              r.path ? {} : { port: s },
            );
          return Error.captureStackTrace(o, e), o;
        },
        postgres: function e(t) {
          let r = new c(t);
          return Error.captureStackTrace(r, e), r;
        },
        generic: function e(t, r) {
          let n = Object.assign(Error(t + ": " + r), { code: t });
          return Error.captureStackTrace(n, e), n;
        },
        notSupported: function e(t) {
          let r = Object.assign(Error(t + " (B) is not supported"), {
            code: "MESSAGE_NOT_SUPPORTED",
            name: t,
          });
          return Error.captureStackTrace(r, e), r;
        },
      };
      class d {
        then() {
          P();
        }
        catch() {
          P();
        }
        finally() {
          P();
        }
      }
      class p extends d {
        constructor(e) {
          super(), (this.value = I(e));
        }
      }
      class m extends d {
        constructor(e, t, r) {
          super(), (this.value = e), (this.type = t), (this.array = r);
        }
      }
      class h extends d {
        constructor(e, t) {
          super(), (this.first = e), (this.rest = t);
        }
        build(e, t, r, n) {
          let a = R.map(([t, r]) => ({ fn: r, i: e.search(t) }))
            .sort((e, t) => e.i - t.i)
            .pop();
          return -1 === a.i
            ? x(this.first, n)
            : a.fn(this.first, this.rest, t, r, n);
        }
      }
      function y(e, t, r, n) {
        let a = e instanceof m ? e.value : e;
        if (
          void 0 === a &&
          (e instanceof m
            ? (e.value = n.transform.undefined)
            : (a = e = n.transform.undefined),
          void 0 === a)
        )
          throw f.generic(
            "UNDEFINED_VALUE",
            "Undefined values are not allowed",
          );
        return (
          "$" +
          r.push(
            e instanceof m
              ? (t.push(e.value),
                e.array
                  ? e.array[e.type || B(e.value)] ||
                    e.type ||
                    (function e(t) {
                      return Array.isArray(t)
                        ? e(t[0])
                        : 1009 * ("string" == typeof t);
                    })(e.value)
                  : e.type)
              : (t.push(e), B(e)),
          )
        );
      }
      let g = T({
        string: { to: 25, from: null, serialize: (e) => "" + e },
        number: {
          to: 0,
          from: [21, 23, 26, 700, 701],
          serialize: (e) => "" + e,
          parse: (e) => +e,
        },
        json: {
          to: 114,
          from: [114, 3802],
          serialize: (e) => JSON.stringify(e),
          parse: (e) => JSON.parse(e),
        },
        boolean: {
          to: 16,
          from: 16,
          serialize: (e) => (!0 === e ? "t" : "f"),
          parse: (e) => "t" === e,
        },
        date: {
          to: 1184,
          from: [1082, 1114, 1184],
          serialize: (e) => (e instanceof Date ? e : new Date(e)).toISOString(),
          parse: (e) => new Date(e),
        },
        bytea: {
          to: 17,
          from: 17,
          serialize: (e) => "\\x" + Buffer.from(e).toString("hex"),
          parse: (e) => Buffer.from(e.slice(2), "hex"),
        },
      });
      function b(e, t, r, n, a, s) {
        for (let o = 1; o < e.strings.length; o++)
          (t += _(t, r, n, a, s) + e.strings[o]), (r = e.args[o]);
        return t;
      }
      function _(e, t, r, n, a) {
        return t instanceof h
          ? t.build(e, r, n, a)
          : t instanceof u
            ? w(t, r, n, a)
            : t instanceof p
              ? t.value
              : t && t[0] instanceof u
                ? t.reduce((e, t) => e + " " + w(t, r, n, a), "")
                : y(t, r, n, a);
      }
      function w(e, t, r, n) {
        return (e.fragment = !0), b(e, e.strings[0], e.args[0], t, r, n);
      }
      function E(e, t, r, n, a) {
        return e
          .map(
            (e) =>
              "(" + n.map((n) => _("values", e[n], t, r, a)).join(",") + ")",
          )
          .join(",");
      }
      function v(e, t, r, n, a) {
        let s = Array.isArray(e[0]),
          o = t.length ? t.flat() : Object.keys(s ? e[0] : e);
        return E(s ? e : [e], r, n, o, a);
      }
      function O(e, t, r, n, a) {
        let s;
        return ("string" == typeof e && (e = [e].concat(t)), Array.isArray(e))
          ? x(e, a)
          : (t.length ? t.flat() : Object.keys(e))
              .map(
                (t) =>
                  ((s = e[t]) instanceof u
                    ? w(s, r, n, a)
                    : s instanceof p
                      ? s.value
                      : y(s, r, n, a)) +
                  " as " +
                  I(a.transform.column.to ? a.transform.column.to(t) : t),
              )
              .join(",");
      }
      let R = Object.entries({
        values: v,
        in: (...e) => {
          let t = v(...e);
          return "()" === t ? "(null)" : t;
        },
        select: O,
        as: O,
        returning: O,
        "\\(": O,
        update: (e, t, r, n, a) =>
          (t.length ? t.flat() : Object.keys(e)).map(
            (t) =>
              I(a.transform.column.to ? a.transform.column.to(t) : t) +
              "=" +
              _("values", e[t], r, n, a),
          ),
        insert(e, t, r, n, a) {
          let s = t.length
            ? t.flat()
            : Object.keys(Array.isArray(e) ? e[0] : e);
          return (
            "(" +
            x(s, a) +
            ")values" +
            E(Array.isArray(e) ? e : [e], r, n, s, a)
          );
        },
      }).map(([e, t]) => [
        RegExp("((?:^|[\\s(])" + e + "(?:$|[\\s(]))(?![\\s\\S]*\\1)", "i"),
        t,
      ]);
      function P() {
        throw f.generic(
          "NOT_TAGGED_CALL",
          "Query not called as a tagged template literal",
        );
      }
      let S = g.serializers,
        A = g.parsers,
        j = function (e) {
          let t = T(e || {});
          return {
            serializers: Object.assign({}, S, t.serializers),
            parsers: Object.assign({}, A, t.parsers),
          };
        };
      function T(e) {
        return Object.keys(e).reduce(
          (t, r) => (
            e[r].from &&
              [].concat(e[r].from).forEach((n) => (t.parsers[n] = e[r].parse)),
            e[r].serialize &&
              ((t.serializers[e[r].to] = e[r].serialize),
              e[r].from &&
                []
                  .concat(e[r].from)
                  .forEach((n) => (t.serializers[n] = e[r].serialize))),
            t
          ),
          { parsers: {}, serializers: {} },
        );
      }
      function x(e, { transform: { column: t } }) {
        return e.map((e) => I(t.to ? t.to(e) : e)).join(",");
      }
      let I = function (e) {
          return '"' + e.replace(/"/g, '""').replace(/\./g, '"."') + '"';
        },
        B = function e(t) {
          return t instanceof m
            ? t.type
            : t instanceof Date
              ? 1184
              : t instanceof Uint8Array
                ? 17
                : !0 === t || !1 === t
                  ? 16
                  : "bigint" == typeof t
                    ? 20
                    : Array.isArray(t)
                      ? e(t[0])
                      : 0;
        },
        N = /\\/g,
        C = /"/g,
        U = function e(t, r, n, a) {
          if (!1 === Array.isArray(t)) return t;
          if (!t.length) return "{}";
          let s = t[0],
            o = 1020 === a ? ";" : ",";
          return Array.isArray(s) && !s.type
            ? "{" + t.map((t) => e(t, r, n, a)).join(o) + "}"
            : "{" +
                t
                  .map((e) => {
                    if (void 0 === e && void 0 === (e = n.transform.undefined))
                      throw f.generic(
                        "UNDEFINED_VALUE",
                        "Undefined values are not allowed",
                      );
                    return null === e
                      ? "null"
                      : '"' +
                          (r ? r(e.type ? e.value : e) : "" + e)
                            .replace(N, "\\\\")
                            .replace(C, '\\"') +
                          '"';
                  })
                  .join(o) +
                "}";
        },
        D = { i: 0, char: null, str: "", quoted: !1, last: 0 },
        M = (e) => {
          let t = e[0];
          for (let r = 1; r < e.length; r++)
            t += "_" === e[r] ? e[++r].toUpperCase() : e[r];
          return t;
        },
        k = (e) => {
          let t = e[0].toUpperCase();
          for (let r = 1; r < e.length; r++)
            t += "_" === e[r] ? e[++r].toUpperCase() : e[r];
          return t;
        },
        L = (e) => e.replace(/_/g, "-"),
        F = (e) => e.replace(/([A-Z])/g, "_$1").toLowerCase(),
        z = (e) =>
          (e.slice(0, 1) + e.slice(1).replace(/([A-Z])/g, "_$1")).toLowerCase(),
        $ = (e) => e.replace(/-/g, "_");
      function q(e) {
        return function t(r, n) {
          return "object" == typeof r &&
            null !== r &&
            (114 === n.type || 3802 === n.type)
            ? Array.isArray(r)
              ? r.map((e) => t(e, n))
              : Object.entries(r).reduce(
                  (r, [a, s]) => Object.assign(r, { [e(a)]: t(s, n) }),
                  {},
                )
            : r;
        };
      }
      (M.column = { from: M }),
        (M.value = { from: q(M) }),
        (F.column = { to: F });
      let G = { ...M };
      (G.column.to = F),
        (k.column = { from: k }),
        (k.value = { from: q(k) }),
        (z.column = { to: z });
      let H = { ...k };
      (H.column.to = z),
        (L.column = { from: L }),
        (L.value = { from: q(L) }),
        ($.column = { to: $ });
      let X = { ...L };
      X.column.to = $;
      var K = r(91645),
        Q = r(34631),
        Y = r(55511),
        V = r(27910),
        W = r(74998);
      class J extends Array {
        constructor() {
          super(),
            Object.defineProperties(this, {
              count: { value: null, writable: !0 },
              state: { value: null, writable: !0 },
              command: { value: null, writable: !0 },
              columns: { value: null, writable: !0 },
              statement: { value: null, writable: !0 },
            });
        }
        static get [Symbol.species]() {
          return Array;
        }
      }
      let Z = function (e = []) {
          let t = e.slice(),
            r = 0;
          return {
            get length() {
              return t.length - r;
            },
            remove: (e) => {
              let r = t.indexOf(e);
              return -1 === r ? null : (t.splice(r, 1), e);
            },
            push: (e) => (t.push(e), e),
            shift: () => {
              let e = t[r++];
              return (
                r === t.length ? ((r = 0), (t = [])) : (t[r - 1] = void 0), e
              );
            },
          };
        },
        ee = Buffer.allocUnsafe(256),
        et = Object.assign(
          function () {
            return (et.i = 0), et;
          },
          "BCcDdEFfHPpQSX".split("").reduce((e, t) => {
            let r = t.charCodeAt(0);
            return (e[t] = () => ((ee[0] = r), (et.i = 5), et)), e;
          }, {}),
          {
            N: "\0",
            i: 0,
            inc: (e) => ((et.i += e), et),
            str(e) {
              let t = Buffer.byteLength(e);
              return er(t), (et.i += ee.write(e, et.i, t, "utf8")), et;
            },
            i16: (e) => (er(2), ee.writeUInt16BE(e, et.i), (et.i += 2), et),
            i32: (e, t) => (
              t || 0 === t
                ? ee.writeUInt32BE(e, t)
                : (er(4), ee.writeUInt32BE(e, et.i), (et.i += 4)),
              et
            ),
            z: (e) => (er(e), ee.fill(0, et.i, et.i + e), (et.i += e), et),
            raw: (e) => (
              (ee = Buffer.concat([ee.subarray(0, et.i), e])),
              (et.i = ee.length),
              et
            ),
            end(e = 1) {
              ee.writeUInt32BE(et.i - e, e);
              let t = ee.subarray(0, et.i);
              return (et.i = 0), (ee = Buffer.allocUnsafe(256)), t;
            },
          },
        );
      function er(e) {
        if (ee.length - et.i < e) {
          let t = ee,
            r = t.length;
          (ee = Buffer.allocUnsafe(r + (r >> 1) + e)), t.copy(ee);
        }
      }
      let en = function e(
          t,
          r = {},
          { onopen: n = ec, onend: a = ec, onclose: s = ec } = {},
        ) {
          let {
              ssl: o,
              max: i,
              user: c,
              host: d,
              port: p,
              database: m,
              parsers: h,
              transform: g,
              onnotice: _,
              onnotify: w,
              onparameter: E,
              max_pipeline: v,
              keep_alive: O,
              backoff: R,
              target_session_attrs: P,
            } = t,
            S = Z(),
            A = ea++,
            j = { pid: null, secret: null },
            T = ey(eX, t.idle_timeout),
            x = ey(eX, t.max_lifetime),
            I = ey(function () {
              eG(f.connection("CONNECT_TIMEOUT", t, B)), B.destroy();
            }, t.connect_timeout),
            B = null,
            N,
            C = new J(),
            M = Buffer.alloc(0),
            k = t.fetch_types,
            L = {},
            F = {},
            z = Math.random().toString(36).slice(2),
            $ = 1,
            q = 0,
            G = 0,
            H = 0,
            X = 0,
            ee = 0,
            er = 0,
            en = 0,
            ed = null,
            eg = null,
            eb = !1,
            e_ = null,
            ew = null,
            eE = null,
            ev = null,
            eO = null,
            eR = null,
            eP = null,
            eS = null,
            eA = null,
            ej = null,
            eT = {
              queue: r.closed,
              idleTimer: T,
              connect(e) {
                (eE = e), ez();
              },
              terminate: eK,
              execute: eB,
              cancel: eI,
              end: eX,
              count: 0,
              id: A,
            };
          return r.closed && r.closed.push(eT), eT;
          async function ex() {
            let e;
            try {
              e = t.socket
                ? await Promise.resolve(t.socket(t))
                : new K.Socket();
            } catch (e) {
              eq(e);
              return;
            }
            return e.on("error", eq), e.on("close", eQ), e.on("drain", ek), e;
          }
          async function eI({ pid: e, secret: t }, r, n) {
            try {
              (N = et().i32(16).i32(0x4d2162e).i32(e).i32(t).end(16)),
                await eF(),
                B.once("error", n),
                B.once("close", r);
            } catch (e) {
              n(e);
            }
          }
          function eB(e) {
            if (eb) return eH(e, f.connection("CONNECTION_DESTROYED", t));
            if (!e.cancelled)
              try {
                return (
                  (e.state = j),
                  eA ? S.push(e) : ((eA = e).active = !0),
                  (function (e) {
                    let r = [],
                      n = [],
                      a = b(e, e.strings[0], e.args[0], r, n, t);
                    e.tagged || e.args.forEach((e) => y(e, r, n, t)),
                      (e.prepare =
                        t.prepare &&
                        (!("prepare" in e.options) || e.options.prepare)),
                      (e.string = a),
                      (e.signature = e.prepare && n + a),
                      e.onlyDescribe && delete F[e.signature],
                      (e.parameters = e.parameters || r),
                      (e.prepared = e.prepare && e.signature in F),
                      (e.describeFirst =
                        e.onlyDescribe || (r.length && !e.prepared)),
                      (e.statement = e.prepared
                        ? F[e.signature]
                        : {
                            string: a,
                            types: n,
                            name: e.prepare ? z + $++ : "",
                          }),
                      "function" == typeof t.debug && t.debug(A, a, r, n);
                  })(e),
                  eU(
                    (function (e) {
                      var t;
                      if (e.parameters.length >= 65534)
                        throw f.generic(
                          "MAX_PARAMETERS_EXCEEDED",
                          "Max number of parameters (65534) exceeded",
                        );
                      return e.options.simple
                        ? et()
                            .Q()
                            .str(e.statement.string + et.N)
                            .end()
                        : e.describeFirst
                          ? Buffer.concat([eN(e), eo])
                          : e.prepare
                            ? e.prepared
                              ? eC(e)
                              : Buffer.concat([eN(e), eC(e)])
                            : ((t = e),
                              Buffer.concat([
                                e4(
                                  t.statement.string,
                                  t.parameters,
                                  t.statement.types,
                                ),
                                eu,
                                eC(t),
                              ]));
                    })(e),
                  ) &&
                    !e.describeFirst &&
                    !e.cursorFn &&
                    S.length < v &&
                    (!e.options.onexecute || e.options.onexecute(eT))
                );
              } catch (e) {
                return 0 === S.length && eU(es), eG(e), !0;
              }
          }
          function eN(e) {
            return Buffer.concat([
              e4(
                e.statement.string,
                e.parameters,
                e.statement.types,
                e.statement.name,
              ),
              (function (e, t = "") {
                return et()
                  .D()
                  .str("S")
                  .str(t + et.N)
                  .end();
              })("S", e.statement.name),
            ]);
          }
          function eC(e) {
            return Buffer.concat([
              (function (e, r, n = "", a = "") {
                let s, o;
                return (
                  et()
                    .B()
                    .str(a + et.N)
                    .str(n + et.N)
                    .i16(0)
                    .i16(e.length),
                  e.forEach((n, a) => {
                    if (null === n) return et.i32(0xffffffff);
                    (o = r[a]),
                      (e[a] = n =
                        o in t.serializers ? t.serializers[o](n) : "" + n),
                      (s = et.i),
                      et
                        .inc(4)
                        .str(n)
                        .i32(et.i - s - 4, s);
                  }),
                  et.i16(0),
                  et.end()
                );
              })(
                e.parameters,
                e.statement.types,
                e.statement.name,
                e.cursorName,
              ),
              e.cursorFn ? e6("", e.cursorRows) : el,
            ]);
          }
          function eU(e, t) {
            return ((eR = eR ? Buffer.concat([eR, e]) : Buffer.from(e)),
            t || eR.length >= 1024)
              ? eD(t)
              : (null === eg && (eg = setImmediate(eD)), !0);
          }
          function eD(e) {
            let t = B.write(eR, e);
            return null !== eg && clearImmediate(eg), (eR = eg = null), t;
          }
          async function eM() {
            if (
              (eU(ei),
              !(await new Promise((e) =>
                B.once("data", (t) => e(83 === t[0])),
              )) && "prefer" === o)
            )
              return e$();
            B.removeAllListeners(),
              (B = Q.connect({
                socket: B,
                servername: K.isIP(B.host) ? void 0 : B.host,
                ...("require" === o || "allow" === o || "prefer" === o
                  ? { rejectUnauthorized: !1 }
                  : "verify-full" === o
                    ? {}
                    : "object" == typeof o
                      ? o
                      : {}),
              })).on("secureConnect", e$),
              B.on("error", eq),
              B.on("close", eQ),
              B.on("drain", ek);
          }
          function ek() {
            eA || n(eT);
          }
          function eL(r) {
            if (!e_ || (e_.push(r), !((G -= r.length) > 0)))
              for (
                M = e_
                  ? Buffer.concat(e_, ee - G)
                  : 0 === M.length
                    ? r
                    : Buffer.concat([M, r], M.length + r.length);
                M.length > 4;

              ) {
                if ((ee = M.readUInt32BE(1)) >= M.length) {
                  (G = ee - M.length), (e_ = [M]);
                  break;
                }
                try {
                  !(function (r, a = r[0]) {
                    (68 === a
                      ? function (e) {
                          let t,
                            r,
                            n,
                            a = 7,
                            s = eA.isRaw
                              ? Array(eA.statement.columns.length)
                              : {};
                          for (let o = 0; o < eA.statement.columns.length; o++)
                            (r = eA.statement.columns[o]),
                              (t = e.readInt32BE(a)),
                              (a += 4),
                              (n =
                                -1 === t
                                  ? null
                                  : !0 === eA.isRaw
                                    ? e.subarray(a, (a += t))
                                    : void 0 === r.parser
                                      ? e.toString("utf8", a, (a += t))
                                      : !0 === r.parser.array
                                        ? r.parser(
                                            e.toString("utf8", a + 1, (a += t)),
                                          )
                                        : r.parser(
                                            e.toString("utf8", a, (a += t)),
                                          )),
                              eA.isRaw
                                ? (s[o] =
                                    !0 === eA.isRaw
                                      ? n
                                      : g.value.from
                                        ? g.value.from(n, r)
                                        : n)
                                : (s[r.name] = g.value.from
                                    ? g.value.from(n, r)
                                    : n);
                          eA.forEachFn
                            ? eA.forEachFn(g.row.from ? g.row.from(s) : s, C)
                            : (C[en++] = g.row.from ? g.row.from(s) : s);
                        }
                      : 100 === a
                        ? function (e) {
                            eO && (eO.push(e.subarray(5)) || B.pause());
                          }
                        : 65 === a
                          ? function (e) {
                              if (!w) return;
                              let t = 9;
                              for (; 0 !== e[t++]; );
                              w(
                                e.toString("utf8", 9, t - 1),
                                e.toString("utf8", t, e.length - 1),
                              );
                            }
                          : 83 === a
                            ? function (e) {
                                let [r, n] = e
                                  .toString("utf8", 5, e.length - 1)
                                  .split(et.N);
                                (L[r] = n),
                                  t.parameters[r] !== n &&
                                    ((t.parameters[r] = n), E && E(r, n));
                              }
                            : 90 === a
                              ? function (r) {
                                  if (
                                    (eA &&
                                      eA.options.simple &&
                                      eA.resolve(ew || C),
                                    (eA = ew = null),
                                    (C = new J()),
                                    I.cancel(),
                                    eE)
                                  ) {
                                    if (P)
                                      if (
                                        L.in_hot_standby &&
                                        L.default_transaction_read_only
                                      ) {
                                        var a, s;
                                        if (
                                          ((a = P),
                                          (s = L),
                                          ("read-write" === a &&
                                            "on" ===
                                              s.default_transaction_read_only) ||
                                            ("read-only" === a &&
                                              "off" ===
                                                s.default_transaction_read_only) ||
                                            ("primary" === a &&
                                              "on" === s.in_hot_standby) ||
                                            ("standby" === a &&
                                              "off" === s.in_hot_standby) ||
                                            ("prefer-standby" === a &&
                                              "off" === s.in_hot_standby &&
                                              t.host[X]))
                                        )
                                          return eK();
                                      } else {
                                        let e = new u(
                                          [
                                            `
      show transaction_read_only;
      select pg_catalog.pg_is_in_recovery()
    `,
                                          ],
                                          [],
                                          eB,
                                          null,
                                          { simple: !0 },
                                        );
                                        (e.resolve = ([[e], [t]]) => {
                                          (L.default_transaction_read_only =
                                            e.transaction_read_only),
                                            (L.in_hot_standby =
                                              t.pg_is_in_recovery
                                                ? "on"
                                                : "off");
                                        }),
                                          e.execute();
                                        return;
                                      }
                                    return k
                                      ? (eE.reserve && (eE = null), e2())
                                      : (eE && !eE.reserve && eB(eE),
                                        (t.shared.retries = X = 0),
                                        void (eE = null));
                                  }
                                  for (
                                    ;
                                    S.length &&
                                    (eA = S.shift()) &&
                                    ((eA.active = !0), eA.cancelled);

                                  )
                                    e(t).cancel(
                                      eA.state,
                                      eA.cancelled.resolve,
                                      eA.cancelled.reject,
                                    );
                                  eA ||
                                    (eT.reserved
                                      ? eT.reserved.release || 73 !== r[5]
                                        ? eT.reserved()
                                        : ev
                                          ? eK()
                                          : ((eT.reserved = null), n(eT))
                                      : ev
                                        ? eK()
                                        : n(eT));
                                }
                              : 67 === a
                                ? function (e) {
                                    en = 0;
                                    for (let t = e.length - 1; t > 0; t--)
                                      if (
                                        (32 === e[t] &&
                                          e[t + 1] < 58 &&
                                          null === C.count &&
                                          (C.count = +e.toString(
                                            "utf8",
                                            t + 1,
                                            e.length - 1,
                                          )),
                                        e[t - 1] >= 65)
                                      ) {
                                        (C.command = e.toString("utf8", 5, t)),
                                          (C.state = j);
                                        break;
                                      }
                                    return (ej && (ej(), (ej = null)),
                                    "BEGIN" !== C.command ||
                                      1 === i ||
                                      eT.reserved)
                                      ? eA.options.simple
                                        ? eY()
                                        : void (eA.cursorFn &&
                                            (C.count && eA.cursorFn(C), eU(es)),
                                          eA.resolve(C))
                                      : eG(
                                          f.generic(
                                            "UNSAFE_TRANSACTION",
                                            "Only use sql.begin, sql.reserved or max: 1",
                                          ),
                                        );
                                  }
                                : 50 === a
                                  ? eY
                                  : 49 === a
                                    ? function () {
                                        eA.parsing = !1;
                                      }
                                    : 116 === a
                                      ? function (e) {
                                          let t = e.readUInt16BE(5);
                                          for (let r = 0; r < t; ++r)
                                            eA.statement.types[r] ||
                                              (eA.statement.types[r] =
                                                e.readUInt32BE(7 + 4 * r));
                                          eA.prepare &&
                                            (F[eA.signature] = eA.statement),
                                            eA.describeFirst &&
                                              !eA.onlyDescribe &&
                                              (eU(eC(eA)),
                                              (eA.describeFirst = !1));
                                        }
                                      : 84 === a
                                        ? function (e) {
                                            let t;
                                            C.command &&
                                              ((ew = ew || [C]).push(
                                                (C = new J()),
                                              ),
                                              (C.count = null),
                                              (eA.statement.columns = null));
                                            let r = e.readUInt16BE(5),
                                              n = 7;
                                            eA.statement.columns = Array(r);
                                            for (let a = 0; a < r; ++a) {
                                              for (t = n; 0 !== e[n++]; );
                                              let r = e.readUInt32BE(n),
                                                s = e.readUInt16BE(n + 4),
                                                o = e.readUInt32BE(n + 6);
                                              (eA.statement.columns[a] = {
                                                name: g.column.from
                                                  ? g.column.from(
                                                      e.toString(
                                                        "utf8",
                                                        t,
                                                        n - 1,
                                                      ),
                                                    )
                                                  : e.toString(
                                                      "utf8",
                                                      t,
                                                      n - 1,
                                                    ),
                                                parser: h[o],
                                                table: r,
                                                number: s,
                                                type: o,
                                              }),
                                                (n += 18);
                                            }
                                            if (
                                              ((C.statement = eA.statement),
                                              eA.onlyDescribe)
                                            )
                                              return (
                                                eA.resolve(eA.statement), eU(es)
                                              );
                                          }
                                        : 82 === a
                                          ? eV
                                          : 110 === a
                                            ? function () {
                                                if (
                                                  ((C.statement = eA.statement),
                                                  (C.statement.columns = []),
                                                  eA.onlyDescribe)
                                                )
                                                  return (
                                                    eA.resolve(eA.statement),
                                                    eU(es)
                                                  );
                                              }
                                            : 75 === a
                                              ? function (e) {
                                                  (j.pid = e.readUInt32BE(5)),
                                                    (j.secret =
                                                      e.readUInt32BE(9));
                                                }
                                              : 69 === a
                                                ? function (e) {
                                                    var t, r;
                                                    eA &&
                                                      (eA.cursorFn ||
                                                        eA.describeFirst) &&
                                                      eU(es);
                                                    let n = f.postgres(ep(e));
                                                    eA && eA.retried
                                                      ? eG(eA.retried)
                                                      : eA &&
                                                          eA.prepared &&
                                                          ef.has(n.routine)
                                                        ? ((t = eA),
                                                          (r = n),
                                                          delete F[t.signature],
                                                          (t.retried = r),
                                                          eB(t))
                                                        : eG(n);
                                                  }
                                                : 115 === a
                                                  ? e3
                                                  : 51 === a
                                                    ? function () {
                                                        C.count &&
                                                          eA.cursorFn(C),
                                                          eA.resolve(C);
                                                      }
                                                    : 71 === a
                                                      ? function () {
                                                          (eO = new V.Writable({
                                                            autoDestroy: !0,
                                                            write(e, t, r) {
                                                              B.write(
                                                                et()
                                                                  .d()
                                                                  .raw(e)
                                                                  .end(),
                                                                r,
                                                              );
                                                            },
                                                            destroy(e, t) {
                                                              t(e),
                                                                B.write(
                                                                  et()
                                                                    .f()
                                                                    .str(
                                                                      e + et.N,
                                                                    )
                                                                    .end(),
                                                                ),
                                                                (eO = null);
                                                            },
                                                            final(e) {
                                                              B.write(
                                                                et().c().end(),
                                                              ),
                                                                (ej = e);
                                                            },
                                                          })),
                                                            eA.resolve(eO);
                                                        }
                                                      : 78 === a
                                                        ? function (e) {
                                                            _
                                                              ? _(ep(e))
                                                              : console.log(
                                                                  ep(e),
                                                                );
                                                          }
                                                        : 72 === a
                                                          ? function () {
                                                              (eO =
                                                                new V.Readable({
                                                                  read() {
                                                                    B.resume();
                                                                  },
                                                                })),
                                                                eA.resolve(eO);
                                                            }
                                                          : 99 === a
                                                            ? function () {
                                                                eO &&
                                                                  eO.push(null),
                                                                  (eO = null);
                                                              }
                                                            : 73 === a
                                                              ? function () {}
                                                              : 86 === a
                                                                ? function () {
                                                                    eG(
                                                                      f.notSupported(
                                                                        "FunctionCallResponse",
                                                                      ),
                                                                    );
                                                                  }
                                                                : 118 === a
                                                                  ? function () {
                                                                      eG(
                                                                        f.notSupported(
                                                                          "NegotiateProtocolVersion",
                                                                        ),
                                                                      );
                                                                    }
                                                                  : 87 === a
                                                                    ? function () {
                                                                        (eO =
                                                                          new V.Duplex(
                                                                            {
                                                                              autoDestroy:
                                                                                !0,
                                                                              read() {
                                                                                B.resume();
                                                                              },
                                                                              write(
                                                                                e,
                                                                                t,
                                                                                r,
                                                                              ) {
                                                                                B.write(
                                                                                  et()
                                                                                    .d()
                                                                                    .raw(
                                                                                      e,
                                                                                    )
                                                                                    .end(),
                                                                                  r,
                                                                                );
                                                                              },
                                                                              destroy(
                                                                                e,
                                                                                t,
                                                                              ) {
                                                                                t(
                                                                                  e,
                                                                                ),
                                                                                  B.write(
                                                                                    et()
                                                                                      .f()
                                                                                      .str(
                                                                                        e +
                                                                                          et.N,
                                                                                      )
                                                                                      .end(),
                                                                                  ),
                                                                                  (eO =
                                                                                    null);
                                                                              },
                                                                              final(
                                                                                e,
                                                                              ) {
                                                                                B.write(
                                                                                  et()
                                                                                    .c()
                                                                                    .end(),
                                                                                ),
                                                                                  (ej =
                                                                                    e);
                                                                              },
                                                                            },
                                                                          )),
                                                                          eA.resolve(
                                                                            eO,
                                                                          );
                                                                      }
                                                                    : function (
                                                                        e,
                                                                      ) {
                                                                        console.error(
                                                                          "Postgres.js : Unknown Message:",
                                                                          e[0],
                                                                        );
                                                                      })(r);
                  })(M.subarray(0, ee + 1));
                } catch (e) {
                  eA && (eA.cursorFn || eA.describeFirst) && eU(es), eG(e);
                }
                (M = M.subarray(ee + 1)), (G = 0), (e_ = null);
              }
          }
          async function eF() {
            if (((eb = !1), (L = {}), B || (B = await ex()), B)) {
              if ((I.start(), t.socket)) return o ? eM() : e$();
              if ((B.on("connect", o ? eM : e$), t.path))
                return B.connect(t.path);
              (B.ssl = o),
                B.connect(p[H], d[H]),
                (B.host = d[H]),
                (B.port = p[H]),
                (H = (H + 1) % p.length);
            }
          }
          function ez() {
            setTimeout(eF, q ? q + er - W.performance.now() : 0);
          }
          function e$() {
            try {
              (F = {}),
                (k = t.fetch_types),
                (z = Math.random().toString(36).slice(2)),
                ($ = 1),
                x.start(),
                B.on("data", eL),
                O && B.setKeepAlive && B.setKeepAlive(!0, 1e3 * O);
              let e =
                N ||
                et()
                  .inc(4)
                  .i16(3)
                  .z(2)
                  .str(
                    Object.entries(
                      Object.assign(
                        { user: c, database: m, client_encoding: "UTF8" },
                        t.connection,
                      ),
                    )
                      .filter(([, e]) => e)
                      .map(([e, t]) => e + et.N + t)
                      .join(et.N),
                  )
                  .z(2)
                  .end(0);
              eU(e);
            } catch (e) {
              eq(e);
            }
          }
          function eq(e) {
            if (eT.queue !== r.connecting || !t.host[X + 1])
              for (eG(e); S.length; ) eH(S.shift(), e);
          }
          function eG(e) {
            eO && (eO.destroy(e), (eO = null)),
              eA && eH(eA, e),
              eE && (eH(eE, e), (eE = null));
          }
          function eH(e, r) {
            if (e.reserve) return e.reject(r);
            (r && "object" == typeof r) || (r = Error(r)),
              "query" in r ||
                "parameters" in r ||
                Object.defineProperties(r, {
                  stack: {
                    value: r.stack + e.origin.replace(/.*\n/, "\n"),
                    enumerable: t.debug,
                  },
                  query: { value: e.string, enumerable: t.debug },
                  parameters: { value: e.parameters, enumerable: t.debug },
                  args: { value: e.args, enumerable: t.debug },
                  types: {
                    value: e.statement && e.statement.types,
                    enumerable: t.debug,
                  },
                }),
              e.reject(r);
          }
          function eX() {
            return (
              ev ||
              (eT.reserved || a(eT),
              eT.reserved || eE || eA || 0 !== S.length
                ? (ev = new Promise((e) => (eP = e)))
                : (eK(),
                  new Promise((e) =>
                    B && "closed" !== B.readyState ? B.once("close", e) : e(),
                  )))
            );
          }
          function eK() {
            (eb = !0),
              (eO || eA || eE || S.length) &&
                eq(f.connection("CONNECTION_DESTROYED", t)),
              clearImmediate(eg),
              B &&
                (B.removeListener("data", eL),
                B.removeListener("connect", e$),
                "open" === B.readyState && B.end(et().X().end())),
              eP && (eP(), (ev = eP = null));
          }
          async function eQ(e) {
            if (
              ((M = Buffer.alloc(0)),
              (G = 0),
              (e_ = null),
              clearImmediate(eg),
              B.removeListener("data", eL),
              B.removeListener("connect", e$),
              T.cancel(),
              x.cancel(),
              I.cancel(),
              B.removeAllListeners(),
              (B = null),
              eE)
            )
              return ez();
            !e &&
              (eA || S.length) &&
              eq(f.connection("CONNECTION_CLOSED", t, B)),
              (q = W.performance.now()),
              e && t.shared.retries++,
              (er = ("function" == typeof R ? R(t.shared.retries) : R) * 1e3),
              s(eT, f.connection("CONNECTION_CLOSED", t, B));
          }
          function eY() {
            C.statement || (C.statement = eA.statement),
              (C.columns = eA.statement.columns);
          }
          async function eV(e, t = e.readUInt32BE(5)) {
            (3 === t
              ? eW
              : 5 === t
                ? eJ
                : 10 === t
                  ? eZ
                  : 11 === t
                    ? e0
                    : 12 === t
                      ? function (e) {
                          e.toString("utf8", 9).split(et.N, 1)[0].slice(2) !==
                            ed &&
                            (eG(
                              f.generic(
                                "SASL_SIGNATURE_MISMATCH",
                                "The server did not return the correct signature",
                              ),
                            ),
                            B.destroy());
                        }
                      : 0 !== t
                        ? function (e, t) {
                            console.error("Postgres.js : Unknown Auth:", t);
                          }
                        : ec)(e, t);
          }
          async function eW() {
            let e = await e1();
            eU(et().p().str(e).z(1).end());
          }
          async function eJ(e) {
            let t =
              "md5" +
              (await em(
                Buffer.concat([
                  Buffer.from(await em((await e1()) + c)),
                  e.subarray(9),
                ]),
              ));
            eU(et().p().str(t).z(1).end());
          }
          async function eZ() {
            (eS = (await Y.randomBytes(18)).toString("base64")),
              et()
                .p()
                .str("SCRAM-SHA-256" + et.N);
            let e = et.i;
            eU(
              et
                .inc(4)
                .str("n,,n=*,r=" + eS)
                .i32(et.i - e - 4, e)
                .end(),
            );
          }
          async function e0(e) {
            var t;
            let r = e
                .toString("utf8", 9)
                .split(",")
                .reduce((e, t) => ((e[t[0]] = t.slice(2)), e), {}),
              n = await Y.pbkdf2Sync(
                await e1(),
                Buffer.from(r.s, "base64"),
                parseInt(r.i),
                32,
                "sha256",
              ),
              a = await eh(n, "Client Key"),
              s =
                "n=*,r=" +
                eS +
                ",r=" +
                r.r +
                ",s=" +
                r.s +
                ",i=" +
                r.i +
                ",c=biws,r=" +
                r.r;
            ed = (await eh(await eh(n, "Server Key"), s)).toString("base64");
            let o =
              "c=biws,r=" +
              r.r +
              ",p=" +
              (function (e, t) {
                let r = Math.max(e.length, t.length),
                  n = Buffer.allocUnsafe(r);
                for (let a = 0; a < r; a++) n[a] = e[a] ^ t[a];
                return n;
              })(
                a,
                Buffer.from(
                  await eh(
                    await ((t = a), Y.createHash("sha256").update(t).digest()),
                    s,
                  ),
                ),
              ).toString("base64");
            eU(et().p().str(o).end());
          }
          function e1() {
            return Promise.resolve(
              "function" == typeof t.pass ? t.pass() : t.pass,
            );
          }
          async function e2() {
            (k = !1),
              (
                await new u(
                  [
                    `
      select b.oid, b.typarray
      from pg_catalog.pg_type a
      left join pg_catalog.pg_type b on b.oid = a.typelem
      where a.typcategory = 'A'
      group by b.oid, b.typarray
      order by b.oid
    `,
                  ],
                  [],
                  eB,
                )
              ).forEach(({ oid: e, typarray: r }) =>
                (function (e, r) {
                  if (t.parsers[r] && t.serializers[r]) return;
                  let n = t.parsers[e];
                  (t.shared.typeArrayMap[e] = r),
                    (t.parsers[r] = (e) => (
                      (D.i = D.last = 0),
                      (function e(t, r, n, a) {
                        let s = [],
                          o = 1020 === a ? ";" : ",";
                        for (; t.i < r.length; t.i++) {
                          if (((t.char = r[t.i]), t.quoted))
                            "\\" === t.char
                              ? (t.str += r[++t.i])
                              : '"' === t.char
                                ? (s.push(n ? n(t.str) : t.str),
                                  (t.str = ""),
                                  (t.quoted = '"' === r[t.i + 1]),
                                  (t.last = t.i + 2))
                                : (t.str += t.char);
                          else if ('"' === t.char) t.quoted = !0;
                          else if ("{" === t.char)
                            (t.last = ++t.i), s.push(e(t, r, n, a));
                          else if ("}" === t.char) {
                            (t.quoted = !1),
                              t.last < t.i &&
                                s.push(
                                  n
                                    ? n(r.slice(t.last, t.i))
                                    : r.slice(t.last, t.i),
                                ),
                              (t.last = t.i + 1);
                            break;
                          } else
                            t.char === o &&
                              "}" !== t.p &&
                              '"' !== t.p &&
                              (s.push(
                                n
                                  ? n(r.slice(t.last, t.i))
                                  : r.slice(t.last, t.i),
                              ),
                              (t.last = t.i + 1));
                          t.p = t.char;
                        }
                        return (
                          t.last < t.i &&
                            s.push(
                              n
                                ? n(r.slice(t.last, t.i + 1))
                                : r.slice(t.last, t.i + 1),
                            ),
                          s
                        );
                      })(D, e, n, r)
                    )),
                    (t.parsers[r].array = !0),
                    (t.serializers[r] = (n) => U(n, t.serializers[e], t, r));
                })(e, r),
              );
          }
          async function e3() {
            try {
              let e = await Promise.resolve(eA.cursorFn(C));
              (en = 0),
                e === l
                  ? eU(
                      (function (e = "") {
                        return Buffer.concat([
                          et()
                            .C()
                            .str("P")
                            .str(e + et.N)
                            .end(),
                          et().S().end(),
                        ]);
                      })(eA.portal),
                    )
                  : ((C = new J()), eU(e6("", eA.cursorRows)));
            } catch (e) {
              eU(es), eA.reject(e);
            }
          }
          function e4(e, t, r, n = "") {
            return (
              et()
                .P()
                .str(n + et.N)
                .str(e + et.N)
                .i16(t.length),
              t.forEach((e, t) => et.i32(r[t] || 0)),
              et.end()
            );
          }
          function e6(e = "", t = 0) {
            return Buffer.concat([
              et()
                .E()
                .str(e + et.N)
                .i32(t)
                .end(),
              eo,
            ]);
          }
        },
        ea = 1,
        es = et().S().end(),
        eo = et().H().end(),
        ei = et().i32(8).i32(0x4d2162f).end(8),
        el = Buffer.concat([et().E().str(et.N).i32(0).end(), es]),
        eu = et().D().str("S").str(et.N).end(),
        ec = () => {},
        ef = new Set([
          "FetchPreparedStatement",
          "RevalidateCachedQuery",
          "transformAssignedExpr",
        ]),
        ed = {
          83: "severity_local",
          86: "severity",
          67: "code",
          77: "message",
          68: "detail",
          72: "hint",
          80: "position",
          112: "internal_position",
          113: "internal_query",
          87: "where",
          115: "schema_name",
          116: "table_name",
          99: "column_name",
          100: "data type_name",
          110: "constraint_name",
          70: "file",
          76: "line",
          82: "routine",
        };
      function ep(e) {
        let t = {},
          r = 5;
        for (let n = 5; n < e.length - 1; n++)
          0 === e[n] &&
            ((t[ed[e[r]]] = e.toString("utf8", r + 1, n)), (r = n + 1));
        return t;
      }
      function em(e) {
        return Y.createHash("md5").update(e).digest("hex");
      }
      function eh(e, t) {
        return Y.createHmac("sha256", e).update(t).digest();
      }
      function ey(e, t) {
        let r;
        if (!(t = "function" == typeof t ? t() : t))
          return { cancel: ec, start: ec };
        return {
          cancel() {
            r && (clearTimeout(r), (r = null));
          },
          start() {
            r && clearTimeout(r), (r = setTimeout(n, 1e3 * t, arguments));
          },
        };
        function n(t) {
          e.apply(null, t), (r = null);
        }
      }
      let eg = () => {};
      function eb(e, t, r, n) {
        let a,
          s,
          o,
          i = n.raw ? Array(t.length) : {};
        for (let l = 0; l < t.length; l++)
          (a = e[r++]),
            (s = t[l]),
            (o =
              110 === a
                ? null
                : 117 === a
                  ? void 0
                  : void 0 === s.parser
                    ? e.toString("utf8", r + 4, (r += 4 + e.readUInt32BE(r)))
                    : !0 === s.parser.array
                      ? s.parser(
                          e.toString(
                            "utf8",
                            r + 5,
                            (r += 4 + e.readUInt32BE(r)),
                          ),
                        )
                      : s.parser(
                          e.toString(
                            "utf8",
                            r + 4,
                            (r += 4 + e.readUInt32BE(r)),
                          ),
                        )),
            n.raw
              ? (i[l] =
                  !0 === n.raw ? o : n.value.from ? n.value.from(o, s) : o)
              : (i[s.name] = n.value.from ? n.value.from(o, s) : o);
        return { i: r, row: n.row.from ? n.row.from(i) : i };
      }
      function e_(e, t, r = 393216) {
        return new Promise(async (n, a) => {
          await e
            .begin(async (e) => {
              let a;
              t || ([{ oid: t }] = await e`select lo_creat(-1) as oid`);
              let [{ fd: s }] = await e`select lo_open(${t}, ${r}) as fd`,
                o = {
                  writable: l,
                  readable: i,
                  close: () => e`select lo_close(${s})`.then(a),
                  tell: () => e`select lo_tell64(${s})`,
                  read: (t) => e`select loread(${s}, ${t}) as data`,
                  write: (t) => e`select lowrite(${s}, ${t})`,
                  truncate: (t) => e`select lo_truncate64(${s}, ${t})`,
                  seek: (t, r = 0) => e`select lo_lseek64(${s}, ${t}, ${r})`,
                  size: () => e`
          select
            lo_lseek64(${s}, location, 0) as position,
            seek.size
          from (
            select
              lo_lseek64($1, 0, 2) as size,
              tell.location
            from (select lo_tell64($1) as location) tell
          ) seek
        `,
                };
              return n(o), new Promise(async (e) => (a = e));
              async function i({
                highWaterMark: e = 16384,
                start: t = 0,
                end: r = 1 / 0,
              } = {}) {
                let n = r - t;
                return (
                  t && (await o.seek(t)),
                  new V.Readable({
                    highWaterMark: e,
                    async read(e) {
                      let t = e > n ? e - n : e;
                      n -= e;
                      let [{ data: r }] = await o.read(t);
                      this.push(r), r.length < e && this.push(null);
                    },
                  })
                );
              }
              async function l({
                highWaterMark: e = 16384,
                start: t = 0,
              } = {}) {
                return (
                  t && (await o.seek(t)),
                  new V.Writable({
                    highWaterMark: e,
                    write(e, t, r) {
                      o.write(e).then(() => r(), r);
                    },
                  })
                );
              }
            })
            .catch(a);
        });
      }
      Object.assign(eE, {
        PostgresError: c,
        toPascal: k,
        pascal: H,
        toCamel: M,
        camel: G,
        toKebab: L,
        kebab: X,
        fromPascal: z,
        fromCamel: F,
        fromKebab: $,
        BigInt: {
          to: 20,
          from: [20],
          parse: (e) => BigInt(e),
          serialize: (e) => e.toString(),
        },
      });
      let ew = eE;
      function eE(e, t) {
        let r = (function (e, t) {
            var r;
            if (e && e.shared) return e;
            let a = process.env,
              s = (e && "string" != typeof e ? e : t) || {},
              { url: o, multihost: i } = (function (e) {
                if (!e || "string" != typeof e)
                  return { url: { searchParams: new Map() } };
                let t = e;
                t = decodeURIComponent(
                  (t = t.slice(t.indexOf("://") + 3).split(/[?/]/)[0]).slice(
                    t.indexOf("@") + 1,
                  ),
                );
                let r = new URL(e.replace(t, t.split(",")[0]));
                return {
                  url: {
                    username: decodeURIComponent(r.username),
                    password: decodeURIComponent(r.password),
                    host: r.host,
                    hostname: r.hostname,
                    port: r.port,
                    pathname: r.pathname,
                    searchParams: r.searchParams,
                  },
                  multihost: t.indexOf(",") > -1 && t,
                };
              })(e),
              l = [...o.searchParams].reduce(
                (e, [t, r]) => ((e[t] = r), e),
                {},
              ),
              u =
                s.hostname ||
                s.host ||
                i ||
                o.hostname ||
                a.PGHOST ||
                "localhost",
              c = s.port || o.port || a.PGPORT || 5432,
              f =
                s.user ||
                s.username ||
                o.username ||
                a.PGUSERNAME ||
                a.PGUSER ||
                (function () {
                  try {
                    return n.userInfo().username;
                  } catch (e) {
                    return (
                      process.env.USERNAME ||
                      process.env.USER ||
                      process.env.LOGNAME
                    );
                  }
                })();
            s.no_prepare && (s.prepare = !1),
              l.sslmode && ((l.ssl = l.sslmode), delete l.sslmode),
              "timeout" in s &&
                (console.log(
                  "The timeout option is deprecated, use idle_timeout instead",
                ),
                (s.idle_timeout = s.timeout)),
              "system" === l.sslrootcert && (l.ssl = "verify-full");
            let d = [
                "idle_timeout",
                "connect_timeout",
                "max_lifetime",
                "max_pipeline",
                "backoff",
                "keep_alive",
              ],
              p = {
                max: 10,
                ssl: !1,
                idle_timeout: null,
                connect_timeout: 30,
                max_lifetime: eO,
                max_pipeline: 100,
                backoff: ev,
                keep_alive: 60,
                prepare: !0,
                debug: !1,
                fetch_types: !0,
                publications: "alltables",
                target_session_attrs: null,
              };
            return {
              host: Array.isArray(u)
                ? u
                : u.split(",").map((e) => e.split(":")[0]),
              port: Array.isArray(c)
                ? c
                : u.split(",").map((e) => parseInt(e.split(":")[1] || c)),
              path: s.path || (u.indexOf("/") > -1 && u + "/.s.PGSQL." + c),
              database:
                s.database ||
                s.db ||
                (o.pathname || "").slice(1) ||
                a.PGDATABASE ||
                f,
              user: f,
              pass: s.pass || s.password || o.password || a.PGPASSWORD || "",
              ...Object.entries(p).reduce((e, [t, r]) => {
                let n =
                  t in s
                    ? s[t]
                    : t in l
                      ? "disable" !== l[t] && "false" !== l[t] && l[t]
                      : a["PG" + t.toUpperCase()] || r;
                return (
                  (e[t] = "string" == typeof n && d.includes(t) ? +n : n), e
                );
              }, {}),
              connection: {
                application_name: a.PGAPPNAME || "postgres.js",
                ...s.connection,
                ...Object.entries(l).reduce(
                  (e, [t, r]) => (t in p || (e[t] = r), e),
                  {},
                ),
              },
              types: s.types || {},
              target_session_attrs: (function (e, t, r) {
                let n =
                  e.target_session_attrs ||
                  t.searchParams.get("target_session_attrs") ||
                  r.PGTARGETSESSIONATTRS;
                if (
                  !n ||
                  [
                    "read-write",
                    "read-only",
                    "primary",
                    "standby",
                    "prefer-standby",
                  ].includes(n)
                )
                  return n;
                throw Error("target_session_attrs " + n + " is not supported");
              })(s, o, a),
              onnotice: s.onnotice,
              onnotify: s.onnotify,
              onclose: s.onclose,
              onparameter: s.onparameter,
              socket: s.socket,
              transform: {
                undefined: (r = s.transform || { undefined: void 0 }).undefined,
                column: {
                  from:
                    "function" == typeof r.column
                      ? r.column
                      : r.column && r.column.from,
                  to: r.column && r.column.to,
                },
                value: {
                  from:
                    "function" == typeof r.value
                      ? r.value
                      : r.value && r.value.from,
                  to: r.value && r.value.to,
                },
                row: {
                  from:
                    "function" == typeof r.row ? r.row : r.row && r.row.from,
                  to: r.row && r.row.to,
                },
              },
              parameters: {},
              shared: { retries: 0, typeArrayMap: {} },
              ...j(s.types),
            };
          })(e, t),
          s =
            r.no_subscribe ||
            (function (e, t) {
              let r = new Map(),
                n = "postgresjs_" + Math.random().toString(36).slice(2),
                a = {},
                s,
                o,
                i = !1,
                l = (f.sql = e({
                  ...t,
                  transform: { column: {}, value: {}, row: {} },
                  max: 1,
                  fetch_types: !1,
                  idle_timeout: null,
                  max_lifetime: null,
                  connection: { ...t.connection, replication: "database" },
                  onclose: async function () {
                    i ||
                      ((o = null),
                      (a.pid = a.secret = void 0),
                      d(await p(l, n, t.publications)),
                      r.forEach((e) => e.forEach(({ onsubscribe: e }) => e())));
                  },
                  no_subscribe: !0,
                })),
                u = l.end,
                c = l.close;
              return (
                (l.end = async () => (
                  (i = !0),
                  o &&
                    (await new Promise((e) => (o.once("close", e), o.end()))),
                  u()
                )),
                (l.close = async () => (
                  o &&
                    (await new Promise((e) => (o.once("close", e), o.end()))),
                  c()
                )),
                f
              );
              async function f(e, i, u = eg, c = eg) {
                (e = (function (e) {
                  let t =
                    e.match(
                      /^(\*|insert|update|delete)?:?([^.]+?\.?[^=]+)?=?(.+)?/i,
                    ) || [];
                  if (!t) throw Error("Malformed subscribe pattern: " + e);
                  let [, r, n, a] = t;
                  return (
                    (r || "*") +
                    (n
                      ? ":" + (-1 === n.indexOf(".") ? "public." + n : n)
                      : "") +
                    (a ? "=" + a : "")
                  );
                })(e)),
                  s || (s = p(l, n, t.publications));
                let m = { fn: i, onsubscribe: u },
                  h = r.has(e)
                    ? r.get(e).add(m)
                    : r.set(e, new Set([m])).get(e),
                  y = () => {
                    h.delete(m), 0 === h.size && r.delete(e);
                  };
                return s.then(
                  (e) => (
                    d(e),
                    u(),
                    o && o.on("error", c),
                    { unsubscribe: y, state: a, sql: l }
                  ),
                );
              }
              function d(e) {
                (o = e.stream),
                  (a.pid = e.state.pid),
                  (a.secret = e.state.secret);
              }
              async function p(e, r, n) {
                if (!n) throw Error("Missing publication names");
                let a = await e.unsafe(
                    `CREATE_REPLICATION_SLOT ${r} TEMPORARY LOGICAL pgoutput NOEXPORT_SNAPSHOT`,
                  ),
                  [s] = a,
                  o = await e
                    .unsafe(
                      `START_REPLICATION SLOT ${r} LOGICAL ${s.consistent_point} (proto_version '1', publication_names '${n}')`,
                    )
                    .writable(),
                  i = {
                    lsn: Buffer.concat(
                      s.consistent_point
                        .split("/")
                        .map((e) =>
                          Buffer.from(("00000000" + e).slice(-8), "hex"),
                        ),
                    ),
                  };
                return (
                  o.on("data", function (r) {
                    var n, a, s, u, c;
                    119 === r[0]
                      ? ((n = r.subarray(25)),
                        (a = i),
                        (s = e.options.parsers),
                        (u = l),
                        (c = t.transform),
                        Object.entries({
                          R: (e) => {
                            let t = 1,
                              r = (a[e.readUInt32BE(t)] = {
                                schema:
                                  e.toString(
                                    "utf8",
                                    (t += 4),
                                    (t = e.indexOf(0, t)),
                                  ) || "pg_catalog",
                                table: e.toString(
                                  "utf8",
                                  t + 1,
                                  (t = e.indexOf(0, t + 1)),
                                ),
                                columns: Array(e.readUInt16BE((t += 2))),
                                keys: [],
                              });
                            t += 2;
                            let n = 0,
                              o;
                            for (; t < e.length; )
                              (o = r.columns[n++] =
                                {
                                  key: e[t++],
                                  name: c.column.from
                                    ? c.column.from(
                                        e.toString(
                                          "utf8",
                                          t,
                                          (t = e.indexOf(0, t)),
                                        ),
                                      )
                                    : e.toString(
                                        "utf8",
                                        t,
                                        (t = e.indexOf(0, t)),
                                      ),
                                  type: e.readUInt32BE((t += 1)),
                                  parser: s[e.readUInt32BE(t)],
                                  atttypmod: e.readUInt32BE((t += 4)),
                                }).key && r.keys.push(o),
                                (t += 4);
                          },
                          Y: () => {},
                          O: () => {},
                          B: (e) => {
                            var t;
                            (t = e.readBigInt64BE(9)),
                              (a.date = new Date(
                                Date.UTC(2e3, 0, 1) + Number(t / BigInt(1e3)),
                              )),
                              (a.lsn = e.subarray(1, 9));
                          },
                          I: (e) => {
                            let t = 1,
                              r = a[e.readUInt32BE(t)],
                              { row: n } = eb(e, r.columns, (t += 7), c);
                            u(n, { command: "insert", relation: r });
                          },
                          D: (e) => {
                            let t = 1,
                              r = a[e.readUInt32BE(t)],
                              n = 75 === e[(t += 4)];
                            u(
                              n || 79 === e[t]
                                ? eb(e, r.columns, (t += 3), c).row
                                : null,
                              { command: "delete", relation: r, key: n },
                            );
                          },
                          U: (e) => {
                            let t = 1,
                              r = a[e.readUInt32BE(t)],
                              n = 75 === e[(t += 4)],
                              s =
                                n || 79 === e[t]
                                  ? eb(e, r.columns, (t += 3), c)
                                  : null;
                            s && (t = s.i);
                            let { row: o } = eb(e, r.columns, t + 3, c);
                            u(o, {
                              command: "update",
                              relation: r,
                              key: n,
                              old: s && s.row,
                            });
                          },
                          T: () => {},
                          C: () => {},
                        })
                          .reduce(
                            (e, [t, r]) => ((e[t.charCodeAt(0)] = r), e),
                            {},
                          )
                          [n[0]](n))
                      : 107 === r[0] &&
                        r[17] &&
                        ((i.lsn = r.subarray(1, 9)),
                        (function () {
                          let e = Buffer.alloc(34);
                          (e[0] = 114),
                            e.fill(i.lsn, 1),
                            e.writeBigInt64BE(
                              BigInt(Date.now() - Date.UTC(2e3, 0, 1)) *
                                BigInt(1e3),
                              25,
                            ),
                            o.write(e);
                        })());
                  }),
                  o.on("error", function (e) {
                    console.error(
                      "Unexpected error during logical streaming - reconnecting",
                      e,
                    );
                  }),
                  o.on("close", e.close),
                  { stream: o, state: a.state }
                );
                function l(e, t) {
                  let r = t.relation.schema + "." + t.relation.table;
                  m("*", e, t),
                    m("*:" + r, e, t),
                    t.relation.keys.length &&
                      m(
                        "*:" + r + "=" + t.relation.keys.map((t) => e[t.name]),
                        e,
                        t,
                      ),
                    m(t.command, e, t),
                    m(t.command + ":" + r, e, t),
                    t.relation.keys.length &&
                      m(
                        t.command +
                          ":" +
                          r +
                          "=" +
                          t.relation.keys.map((t) => e[t.name]),
                        e,
                        t,
                      );
                }
              }
              function m(e, t, n) {
                r.has(e) && r.get(e).forEach(({ fn: r }) => r(t, n, e));
              }
            })(eE, { ...r }),
          o = !1,
          i = Z(),
          d = Z(),
          y = Z(),
          g = Z(),
          b = Z(),
          _ = Z(),
          w = Z(),
          E = Z(),
          v = {
            connecting: d,
            reserved: y,
            closed: g,
            ended: b,
            open: _,
            busy: w,
            full: E,
          },
          O = [...Array(r.max)].map(() =>
            en(r, v, { onopen: z, onend: F, onclose: $ }),
          ),
          R = P(function (e) {
            return o
              ? e.reject(f.connection("CONNECTION_ENDED", r, r))
              : _.length
                ? C(_.shift(), e)
                : g.length
                  ? L(g.shift(), e)
                  : void (w.length ? C(w.shift(), e) : i.push(e));
          });
        return (
          Object.assign(R, {
            get parameters() {
              return r.parameters;
            },
            largeObject: e_.bind(null, R),
            subscribe: s,
            CLOSE: l,
            END: l,
            PostgresError: c,
            options: r,
            reserve: T,
            listen: S,
            begin: x,
            close: M,
            end: D,
          }),
          R
        );
        function P(e) {
          return (
            (e.debug = r.debug),
            Object.entries(r.types).reduce(
              (e, [t, r]) => ((e[t] = (e) => new m(e, r.to)), e),
              t,
            ),
            Object.assign(n, {
              types: t,
              typed: t,
              unsafe: function (t, r = [], n = {}) {
                return (
                  2 != arguments.length ||
                    Array.isArray(r) ||
                    ((n = r), (r = [])),
                  new u([t], r, e, U, {
                    prepare: !1,
                    ...n,
                    simple: "simple" in n ? n.simple : 0 === r.length,
                  })
                );
              },
              notify: A,
              array: function e(t, n) {
                return Array.isArray(t)
                  ? new m(
                      t,
                      n || (t.length ? B(t) || 25 : 0),
                      r.shared.typeArrayMap,
                    )
                  : e(Array.from(arguments));
              },
              json: N,
              file: function (t, r = [], n = {}) {
                return (
                  2 != arguments.length ||
                    Array.isArray(r) ||
                    ((n = r), (r = [])),
                  new u(
                    [],
                    r,
                    (r) => {
                      a.readFile(t, "utf8", (t, n) => {
                        if (t) return r.reject(t);
                        (r.strings = [n]), e(r);
                      });
                    },
                    U,
                    { ...n, simple: "simple" in n ? n.simple : 0 === r.length },
                  )
                );
              },
            }),
            n
          );
          function t(e, t) {
            return new m(e, t);
          }
          function n(t, ...a) {
            return t && Array.isArray(t.raw)
              ? new u(t, a, e, U)
              : "string" != typeof t || a.length
                ? new h(t, a)
                : new p(r.transform.column.to ? r.transform.column.to(t) : t);
          }
        }
        async function S(e, t, n) {
          let a = { fn: t, onlisten: n },
            s =
              S.sql ||
              (S.sql = eE({
                ...r,
                max: 1,
                idle_timeout: null,
                max_lifetime: null,
                fetch_types: !1,
                onclose() {
                  Object.entries(S.channels).forEach(
                    ([e, { listeners: t }]) => {
                      delete S.channels[e],
                        Promise.all(
                          t.map((t) => S(e, t.fn, t.onlisten).catch(() => {})),
                        );
                    },
                  );
                },
                onnotify(e, t) {
                  e in S.channels &&
                    S.channels[e].listeners.forEach((e) => e.fn(t));
                },
              })),
            o = S.channels || (S.channels = {});
          if (e in o) {
            o[e].listeners.push(a);
            let t = await o[e].result;
            return a.onlisten && a.onlisten(), { state: t.state, unlisten: l };
          }
          o[e] = {
            result: s`listen ${s.unsafe('"' + e.replace(/"/g, '""') + '"')}`,
            listeners: [a],
          };
          let i = await o[e].result;
          return a.onlisten && a.onlisten(), { state: i.state, unlisten: l };
          async function l() {
            if (
              e in o != !1 &&
              ((o[e].listeners = o[e].listeners.filter((e) => e !== a)),
              !o[e].listeners.length)
            )
              return (
                delete o[e],
                s`unlisten ${s.unsafe('"' + e.replace(/"/g, '""') + '"')}`
              );
          }
        }
        async function A(e, t) {
          return await R`select pg_notify(${e}, ${"" + t})`;
        }
        async function T() {
          let e = Z(),
            t = _.length
              ? _.shift()
              : await new Promise((e, t) => {
                  let r = { reserve: e, reject: t };
                  i.push(r), g.length && L(g.shift(), r);
                });
          I(t, y),
            (t.reserved = () => (e.length ? t.execute(e.shift()) : I(t, y))),
            (t.reserved.release = !0);
          let r = P(function (r) {
            t.queue === E ? e.push(r) : t.execute(r) || I(t, E);
          });
          return (
            (r.release = () => {
              (t.reserved = null), z(t);
            }),
            r
          );
        }
        async function x(e, t) {
          t || ((t = e), (e = ""));
          let r = Z(),
            n = 0,
            a,
            s = null;
          try {
            return (
              await R.unsafe("begin " + e.replace(/[^a-z ]/gi, ""), [], {
                onexecute: function (e) {
                  (a = e),
                    I(e, y),
                    (e.reserved = () =>
                      r.length ? e.execute(r.shift()) : I(e, y));
                },
              }).execute(),
              await Promise.race([
                o(a, t),
                new Promise((e, t) => (a.onclose = t)),
              ])
            );
          } catch (e) {
            throw e;
          }
          async function o(e, t, a) {
            let i,
              l,
              u = P(function (t) {
                t.catch((e) => i || (i = e)),
                  e.queue === E ? r.push(t) : e.execute(t) || I(e, E);
              });
            (u.savepoint = function t(r, a) {
              return r && Array.isArray(r.raw)
                ? t((e) => e.apply(e, arguments))
                : (1 == arguments.length && ((a = r), (r = null)),
                  o(e, a, "s" + n++ + (r ? "_" + r : "")));
            }),
              (u.prepare = (e) => (s = e.replace(/[^a-z0-9$-_. ]/gi))),
              a && (await u`savepoint ${u(a)}`);
            try {
              if (
                ((l = await new Promise((e, r) => {
                  let n = t(u);
                  Promise.resolve(Array.isArray(n) ? Promise.all(n) : n).then(
                    e,
                    r,
                  );
                })),
                i)
              )
                throw i;
            } catch (e) {
              throw (
                (await (a ? u`rollback to ${u(a)}` : u`rollback`),
                (e instanceof c && "25P02" === e.code && i) || e)
              );
            }
            return (
              a ||
                (s
                  ? await u`prepare transaction '${u.unsafe(s)}'`
                  : await u`commit`),
              l
            );
          }
        }
        function I(e, t) {
          return (
            e.queue.remove(e),
            t.push(e),
            (e.queue = t),
            t === _ ? e.idleTimer.start() : e.idleTimer.cancel(),
            e
          );
        }
        function N(e) {
          return new m(e, 3802);
        }
        function C(e, t) {
          return e.execute(t) ? I(e, w) : I(e, E);
        }
        function U(e) {
          return new Promise((t, n) => {
            e.state
              ? e.active
                ? en(r).cancel(e.state, t, n)
                : (e.cancelled = { resolve: t, reject: n })
              : (i.remove(e),
                (e.cancelled = !0),
                e.reject(
                  f.generic("57014", "canceling statement due to user request"),
                ),
                t());
          });
        }
        async function D({ timeout: e = null } = {}) {
          let t;
          return (
            o ||
            (await 1,
            (o = Promise.race([
              new Promise((r) => null !== e && (t = setTimeout(k, 1e3 * e, r))),
              Promise.all(
                O.map((e) => e.end()).concat(
                  S.sql ? S.sql.end({ timeout: 0 }) : [],
                  s.sql ? s.sql.end({ timeout: 0 }) : [],
                ),
              ),
            ]).then(() => clearTimeout(t))))
          );
        }
        async function M() {
          await Promise.all(O.map((e) => e.end()));
        }
        async function k(e) {
          for (await Promise.all(O.map((e) => e.terminate())); i.length; )
            i.shift().reject(f.connection("CONNECTION_DESTROYED", r));
          e();
        }
        function L(e, t) {
          return I(e, d), e.connect(t), e;
        }
        function F(e) {
          I(e, b);
        }
        function z(e) {
          if (0 === i.length) return I(e, _);
          let t = Math.ceil(i.length / (d.length + 1)),
            r = !0;
          for (; r && i.length && t-- > 0; ) {
            let t = i.shift();
            if (t.reserve) return t.reserve(e);
            r = e.execute(t);
          }
          r ? I(e, w) : I(e, E);
        }
        function $(e, t) {
          I(e, g),
            (e.reserved = null),
            e.onclose && (e.onclose(t), (e.onclose = null)),
            r.onclose && r.onclose(e.id),
            i.length && L(e, i.shift());
        }
      }
      function ev(e) {
        return (0.5 + Math.random() / 2) * Math.min(3 ** e / 100, 20);
      }
      function eO() {
        return 60 * (30 + 30 * Math.random());
      }
    },
    90645: (e, t, r) => {
      Object.defineProperty(t, "__esModule", { value: !0 }),
        !(function (e, t) {
          for (var r in t)
            Object.defineProperty(e, r, { enumerable: !0, get: t[r] });
        })(t, {
          ReadonlyURLSearchParams: function () {
            return c;
          },
          RedirectType: function () {
            return a.RedirectType;
          },
          forbidden: function () {
            return o.forbidden;
          },
          notFound: function () {
            return s.notFound;
          },
          permanentRedirect: function () {
            return n.permanentRedirect;
          },
          redirect: function () {
            return n.redirect;
          },
          unauthorized: function () {
            return i.unauthorized;
          },
          unstable_rethrow: function () {
            return l.unstable_rethrow;
          },
        });
      let n = r(65278),
        a = r(21293),
        s = r(11316),
        o = r(14749),
        i = r(52480),
        l = r(42600);
      class u extends Error {
        constructor() {
          super(
            "Method unavailable on `ReadonlyURLSearchParams`. Read more: https://nextjs.org/docs/app/api-reference/functions/use-search-params#updating-searchparams",
          );
        }
      }
      class c extends URLSearchParams {
        append() {
          throw new u();
        }
        delete() {
          throw new u();
        }
        set() {
          throw new u();
        }
        sort() {
          throw new u();
        }
      }
      ("function" == typeof t.default ||
        ("object" == typeof t.default && null !== t.default)) &&
        void 0 === t.default.__esModule &&
        (Object.defineProperty(t.default, "__esModule", { value: !0 }),
        Object.assign(t.default, t),
        (e.exports = t.default));
    },
  });
//# sourceMappingURL=1070.js.map
