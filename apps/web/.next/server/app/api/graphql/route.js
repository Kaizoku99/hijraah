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
    (e._sentryDebugIds[t] = "141bc546-131f-481b-9e73-f23a2d09f1b3"),
    (e._sentryDebugIdIdentifier =
      "sentry-dbid-141bc546-131f-481b-9e73-f23a2d09f1b3"));
} catch (e) {}
(() => {
  var e = {};
  (e.id = 8021),
    (e.ids = [8021]),
    (e.modules = {
      2832: (e, t, r) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.fetchNodeHttp = function e(t) {
            return new Promise((r, h) => {
              try {
                let d,
                  p,
                  y = (function (e) {
                    if (e.startsWith("http:")) return n.request;
                    if (e.startsWith("https:")) return i.request;
                    throw Error(
                      `Unsupported protocol: ${e.split(":")[0] || e}`,
                    );
                  })(t.parsedUrl?.protocol || t.url),
                  m = (t.headersSerializer || f.getHeadersObj)(t.headers);
                if (
                  (null == m["accept-encoding"] &&
                    (m["accept-encoding"] = "gzip, deflate, br"),
                  (d =
                    null === t._signal
                      ? void 0
                      : t._signal
                        ? t._signal
                        : t.signal),
                  (p = y(t.parsedUrl ? t.parsedUrl : t.url, {
                    method: t.method,
                    headers: m,
                    signal: d,
                    agent: t.agent,
                  })).once("error", h),
                  p.once("response", (i) => {
                    let s;
                    switch (i.headers["content-encoding"]) {
                      case "x-gzip":
                      case "gzip":
                        s = (0, o.createGunzip)();
                        break;
                      case "x-deflate":
                      case "deflate":
                        s = (0, o.createInflate)();
                        break;
                      case "x-deflate-raw":
                      case "deflate-raw":
                        s = (0, o.createInflateRaw)();
                        break;
                      case "br":
                        s = (0, o.createBrotliDecompress)();
                    }
                    if (
                      i.headers.location &&
                      (0, f.shouldRedirect)(i.statusCode)
                    ) {
                      if ("error" === t.redirect) {
                        let e = Error("Redirects are not allowed");
                        h(e), i.resume();
                        return;
                      }
                      if ("follow" === t.redirect) {
                        let n = new c.PonyfillURL(
                            i.headers.location,
                            t.parsedUrl || t.url,
                          ),
                          s = e(new l.PonyfillRequest(n, t));
                        r(s.then((e) => ((e.redirected = !0), e))), i.resume();
                        return;
                      }
                    }
                    null != s &&
                      (s = (0, f.wrapIncomingMessageWithPassthrough)({
                        incomingMessage: i,
                        passThrough: s,
                        signal: d,
                        onError: h,
                      }));
                    let a = i.statusCode || 200,
                      p = i.statusMessage || n.STATUS_CODES[a];
                    null == p && (p = "");
                    let y = new u.PonyfillResponse(s || i, {
                      status: a,
                      statusText: p,
                      headers: i.headers,
                      url: t.url,
                      signal: d,
                    });
                    r(y);
                  }),
                  null != t._buffer)
                )
                  (0, a.handleMaybePromise)(
                    () => (0, f.safeWrite)(t._buffer, p, d),
                    () => (0, f.endStream)(p),
                    h,
                  );
                else {
                  let e =
                    null != t.body
                      ? (0, f.isNodeReadable)(t.body)
                        ? t.body
                        : s.Readable.from(t.body)
                      : null;
                  e ? e.pipe(p) : (0, f.endStream)(p);
                }
              } catch (e) {
                h(e);
              }
            });
          });
        let n = r(37067),
          i = r(44708),
          s = r(57075),
          o = r(38522),
          a = r(80780),
          l = r(31141),
          u = r(97609),
          c = r(94849),
          f = r(13753);
      },
      4330: (e) => {
        e.exports = function () {
          return !!(
            globalThis.Deno ||
            globalThis.Bun ||
            Object.keys(globalThis).some((e) => e.startsWith("__NEXT"))
          );
        };
      },
      4573: (e) => {
        "use strict";
        e.exports = require("node:buffer");
      },
      4628: (e, t, r) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.PonyfillDisposableStack = void 0);
        let n = r(22856),
          i = r(39439),
          s = r(86651),
          o = globalThis.SuppressedError || n.PonyfillSuppressedError;
        class a {
          callbacks = [];
          get disposed() {
            return 0 === this.callbacks.length;
          }
          use(e) {
            return (
              (0, s.isSyncDisposable)(e) &&
                this.callbacks.push(() => e[i.DisposableSymbols.dispose]()),
              e
            );
          }
          adopt(e, t) {
            return t && this.callbacks.push(() => t(e)), e;
          }
          defer(e) {
            e && this.callbacks.push(e);
          }
          move() {
            let e = new a();
            return (e.callbacks = this.callbacks), (this.callbacks = []), e;
          }
          dispose() {
            return this[i.DisposableSymbols.dispose]();
          }
          _error;
          _iterateCallbacks() {
            let e = this.callbacks.pop();
            if (e) {
              try {
                e();
              } catch (e) {
                this._error = this._error ? new o(e, this._error) : e;
              }
              return this._iterateCallbacks();
            }
          }
          [i.DisposableSymbols.dispose]() {
            if ((this._iterateCallbacks(), this._error)) {
              let e = this._error;
              throw ((this._error = void 0), e);
            }
          }
          [Symbol.toStringTag] = "DisposableStack";
        }
        t.PonyfillDisposableStack = a;
      },
      6934: () => {},
      8086: (e) => {
        "use strict";
        e.exports = require("module");
      },
      8331: (e) => {
        "use strict";
        e.exports = function (e, t, r) {
          if (!e || void 0 === e[t] || null === e[t]) return r;
          if ("number" != typeof e[t] || isNaN(e[t]))
            throw TypeError("Limit " + t + " is not a valid number");
          return e[t];
        };
      },
      8462: (e, t, r) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.PonyfillHeaders = void 0),
          (t.isHeadersLike = s);
        let n = r(57975),
          i = r(94591);
        function s(e) {
          return e?.get && e?.forEach;
        }
        class o {
          headersInit;
          _map;
          objectNormalizedKeysOfHeadersInit = [];
          objectOriginalKeysOfHeadersInit = [];
          _setCookies;
          constructor(e) {
            this.headersInit = e;
          }
          _get(e) {
            let t = e.toLowerCase();
            if ("set-cookie" === t && this._setCookies?.length)
              return this._setCookies.join(", ");
            if (this._map) return this._map.get(t) || null;
            if (null == this.headersInit) return null;
            if (Array.isArray(this.headersInit)) {
              let e = this.headersInit.filter(([e]) => e.toLowerCase() === t);
              return 0 === e.length
                ? null
                : 1 === e.length
                  ? e[0][1]
                  : e.map(([, e]) => e).join(", ");
            }
            {
              if (s(this.headersInit)) return this.headersInit.get(t);
              let r = this.headersInit[e] || this.headersInit[t];
              if (null != r) return r;
              this.objectNormalizedKeysOfHeadersInit.length ||
                Object.keys(this.headersInit).forEach((e) => {
                  this.objectOriginalKeysOfHeadersInit.push(e),
                    this.objectNormalizedKeysOfHeadersInit.push(
                      e.toLowerCase(),
                    );
                });
              let n = this.objectNormalizedKeysOfHeadersInit.indexOf(t);
              if (-1 === n) return null;
              let i = this.objectOriginalKeysOfHeadersInit[n];
              return this.headersInit[i];
            }
          }
          getMap() {
            if (!this._map)
              if (((this._setCookies ||= []), null != this.headersInit))
                if (Array.isArray(this.headersInit))
                  for (let [e, t] of ((this._map = new Map()),
                  this.headersInit)) {
                    let r = e.toLowerCase();
                    if ("set-cookie" === r) {
                      this._setCookies.push(t);
                      continue;
                    }
                    this._map.set(r, t);
                  }
                else if (s(this.headersInit))
                  (this._map = new Map()),
                    this.headersInit.forEach((e, t) => {
                      if ("set-cookie" === t) {
                        (this._setCookies ||= []), this._setCookies.push(e);
                        return;
                      }
                      this._map.set(t, e);
                    });
                else
                  for (let e in ((this._map = new Map()), this.headersInit)) {
                    let t = this.headersInit[e];
                    if (null != t) {
                      let r = e.toLowerCase();
                      if ("set-cookie" === r) {
                        (this._setCookies ||= []), this._setCookies.push(t);
                        continue;
                      }
                      this._map.set(r, t);
                    }
                  }
              else this._map = new Map();
            return this._map;
          }
          append(e, t) {
            let r = e.toLowerCase();
            if ("set-cookie" === r) {
              (this._setCookies ||= []), this._setCookies.push(t);
              return;
            }
            let n = this.getMap().get(r),
              i = n ? `${n}, ${t}` : t;
            this.getMap().set(r, i);
          }
          get(e) {
            let t = this._get(e);
            return null == t ? null : t.toString();
          }
          has(e) {
            return "set-cookie" === e.toLowerCase()
              ? !!this._setCookies?.length
              : !!this._get(e);
          }
          set(e, t) {
            let r = e.toLowerCase();
            if ("set-cookie" === r) {
              this._setCookies = [t];
              return;
            }
            if (!this._map && null != this.headersInit)
              if (!Array.isArray(this.headersInit))
                return s(this.headersInit)
                  ? void this.headersInit.set(r, t)
                  : void (this.headersInit[r] = t);
              else {
                let e = this.headersInit.find(([e]) => e.toLowerCase() === r);
                e ? (e[1] = t) : this.headersInit.push([r, t]);
                return;
              }
            this.getMap().set(r, t);
          }
          delete(e) {
            let t = e.toLowerCase();
            if ("set-cookie" === t) {
              this._setCookies = [];
              return;
            }
            this.getMap().delete(t);
          }
          forEach(e) {
            if (
              (this._setCookies?.forEach((t) => {
                e(t, "set-cookie", this);
              }),
              !this._map)
            ) {
              if (this.headersInit) {
                if (Array.isArray(this.headersInit))
                  return void this.headersInit.forEach(([t, r]) => {
                    e(r, t, this);
                  });
                if (s(this.headersInit))
                  return void this.headersInit.forEach(e);
                Object.entries(this.headersInit).forEach(([t, r]) => {
                  null != r && e(r, t, this);
                });
              }
              return;
            }
            this.getMap().forEach((t, r) => {
              e(t, r, this);
            });
          }
          *_keys() {
            if (
              (this._setCookies?.length && (yield "set-cookie"),
              !this._map && this.headersInit)
            )
              return Array.isArray(this.headersInit)
                ? void (yield* this.headersInit
                    .map(([e]) => e)
                    [Symbol.iterator]())
                : s(this.headersInit)
                  ? void (yield* this.headersInit.keys())
                  : void (yield* Object.keys(this.headersInit)[
                      Symbol.iterator
                    ]());
            yield* this.getMap().keys();
          }
          keys() {
            return new i.PonyfillIteratorObject(
              this._keys(),
              "HeadersIterator",
            );
          }
          *_values() {
            if (
              (this._setCookies?.length && (yield* this._setCookies),
              !this._map && this.headersInit)
            )
              return Array.isArray(this.headersInit)
                ? void (yield* this.headersInit
                    .map(([, e]) => e)
                    [Symbol.iterator]())
                : s(this.headersInit)
                  ? void (yield* this.headersInit.values())
                  : void (yield* Object.values(this.headersInit)[
                      Symbol.iterator
                    ]());
            yield* this.getMap().values();
          }
          values() {
            return new i.PonyfillIteratorObject(
              this._values(),
              "HeadersIterator",
            );
          }
          *_entries() {
            if (
              (this._setCookies?.length &&
                (yield* this._setCookies.map((e) => ["set-cookie", e])),
              !this._map && this.headersInit)
            )
              return Array.isArray(this.headersInit)
                ? void (yield* this.headersInit)
                : s(this.headersInit)
                  ? void (yield* this.headersInit.entries())
                  : void (yield* Object.entries(this.headersInit));
            yield* this.getMap().entries();
          }
          entries() {
            return new i.PonyfillIteratorObject(
              this._entries(),
              "HeadersIterator",
            );
          }
          getSetCookie() {
            return this._setCookies || this.getMap(), this._setCookies;
          }
          [Symbol.iterator]() {
            return this.entries();
          }
          [Symbol.for("nodejs.util.inspect.custom")]() {
            let e = {};
            return (
              this.forEach((t, r) => {
                "set-cookie" === r
                  ? (e["set-cookie"] = this._setCookies || [])
                  : (e[r] = t?.includes(",")
                      ? t.split(",").map((e) => e.trim())
                      : t);
              }),
              `Headers ${(0, n.inspect)(e)}`
            );
          }
        }
        t.PonyfillHeaders = o;
      },
      8963: (e) => {
        function t(e) {
          var t = Error("Cannot find module '" + e + "'");
          throw ((t.code = "MODULE_NOT_FOUND"), t);
        }
        (t.keys = () => []), (t.resolve = t), (t.id = 8963), (e.exports = t);
      },
      9229: (e, t, r) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.PonyfillTextEncoderStream = t.PonyfillTextDecoderStream = void 0);
        let n = r(83901),
          i = r(32296);
        class s extends i.PonyfillTransformStream {
          textDecoder;
          constructor(e, t) {
            super({
              transform: (e, t) =>
                t.enqueue(this.textDecoder.decode(e, { stream: !0 })),
            }),
              (this.textDecoder = new n.PonyfillTextDecoder(e, t));
          }
          get encoding() {
            return this.textDecoder.encoding;
          }
          get fatal() {
            return this.textDecoder.fatal;
          }
          get ignoreBOM() {
            return this.textDecoder.ignoreBOM;
          }
        }
        t.PonyfillTextDecoderStream = s;
        class o extends i.PonyfillTransformStream {
          textEncoder;
          constructor(e) {
            super({
              transform: (e, t) => t.enqueue(this.textEncoder.encode(e)),
            }),
              (this.textEncoder = new n.PonyfillTextEncoder(e));
          }
          get encoding() {
            return this.textEncoder.encoding;
          }
          encode(e) {
            return this.textEncoder.encode(e);
          }
        }
        t.PonyfillTextEncoderStream = o;
      },
      10534: (e, t, r) => {
        "use strict";
        let { EventEmitter: n } = r(78474),
          { inherits: i } = r(57975);
        function s(e) {
          if (
            ("string" == typeof e && (e = Buffer.from(e)), !Buffer.isBuffer(e))
          )
            throw TypeError("The needle has to be a String or a Buffer.");
          let t = e.length,
            r = t - 1;
          if (0 === t)
            throw Error("The needle cannot be an empty String/Buffer.");
          if (t > 256)
            throw Error("The needle cannot have a length bigger than 256.");
          (this.maxMatches = 1 / 0),
            (this.matches = 0),
            (this._occ = new Uint8Array(256).fill(t)),
            (this._lookbehind_size = 0),
            (this._needle = e),
            (this._bufpos = 0),
            (this._lookbehind = Buffer.alloc(r));
          for (var n = 0; n < r; ++n) this._occ[e[n]] = r - n;
        }
        i(s, n),
          (s.prototype.reset = function () {
            (this._lookbehind_size = 0), (this.matches = 0), (this._bufpos = 0);
          }),
          (s.prototype.push = function (e, t) {
            let r;
            Buffer.isBuffer(e) || (e = Buffer.from(e, "binary"));
            let n = e.length;
            for (
              this._bufpos = t || 0;
              r !== n && this.matches < this.maxMatches;

            )
              r = this._sbmh_feed(e);
            return r;
          }),
          (s.prototype._sbmh_feed = function (e) {
            let t,
              r = e.length,
              n = this._needle,
              i = n.length,
              s = i - 1,
              o = n[s],
              a = -this._lookbehind_size;
            if (a < 0) {
              for (; a < 0 && a <= r - i; ) {
                if ((t = e[a + s]) === o && this._sbmh_memcmp(e, a, s))
                  return (
                    (this._lookbehind_size = 0),
                    ++this.matches,
                    this.emit("info", !0),
                    (this._bufpos = a + i)
                  );
                a += this._occ[t];
              }
              for (; a < 0 && !this._sbmh_memcmp(e, a, r - a); ) ++a;
              if (a >= 0)
                this.emit(
                  "info",
                  !1,
                  this._lookbehind,
                  0,
                  this._lookbehind_size,
                ),
                  (this._lookbehind_size = 0);
              else {
                let t = this._lookbehind_size + a;
                return (
                  t > 0 && this.emit("info", !1, this._lookbehind, 0, t),
                  (this._lookbehind_size -= t),
                  this._lookbehind.copy(
                    this._lookbehind,
                    0,
                    t,
                    this._lookbehind_size,
                  ),
                  e.copy(this._lookbehind, this._lookbehind_size),
                  (this._lookbehind_size += r),
                  (this._bufpos = r),
                  r
                );
              }
            }
            if (-1 !== (a = e.indexOf(n, a + this._bufpos)))
              return (
                ++this.matches,
                0 === a
                  ? this.emit("info", !0)
                  : this.emit("info", !0, e, this._bufpos, a),
                (this._bufpos = a + i)
              );
            for (
              (a = r - s) < 0 && (a = 0);
              a !== r &&
              (e[a] !== n[0] ||
                0 !==
                  Buffer.compare(e.subarray(a + 1, r), n.subarray(1, r - a)));

            )
              ++a;
            return (
              a !== r &&
                (e.copy(this._lookbehind, 0, a, r),
                (this._lookbehind_size = r - a)),
              0 !== a && this.emit("info", !1, e, this._bufpos, a),
              (this._bufpos = r),
              r
            );
          }),
          (s.prototype._sbmh_lookup_char = function (e, t) {
            return t < 0 ? this._lookbehind[this._lookbehind_size + t] : e[t];
          }),
          (s.prototype._sbmh_memcmp = function (e, t, r) {
            for (var n = 0; n < r; ++n)
              if (this._sbmh_lookup_char(e, t + n) !== this._needle[n])
                return !1;
            return !0;
          }),
          (e.exports = s);
      },
      10846: (e) => {
        "use strict";
        e.exports = require("next/dist/compiled/next-server/app-page.runtime.prod.js");
      },
      11326: (e, t, r) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.PonyfillAsyncDisposableStack = void 0);
        let n = r(80780),
          i = r(22856),
          s = r(39439),
          o = r(86651),
          a = globalThis.SuppressedError || i.PonyfillSuppressedError;
        class l {
          callbacks = [];
          get disposed() {
            return 0 === this.callbacks.length;
          }
          use(e) {
            return (
              (0, o.isAsyncDisposable)(e)
                ? this.callbacks.push(() =>
                    e[s.DisposableSymbols.asyncDispose](),
                  )
                : (0, o.isSyncDisposable)(e) &&
                  this.callbacks.push(() => e[s.DisposableSymbols.dispose]()),
              e
            );
          }
          adopt(e, t) {
            return t && this.callbacks.push(() => t(e)), e;
          }
          defer(e) {
            e && this.callbacks.push(e);
          }
          move() {
            let e = new l();
            return (e.callbacks = this.callbacks), (this.callbacks = []), e;
          }
          disposeAsync() {
            return this[s.DisposableSymbols.asyncDispose]();
          }
          _error;
          _iterateCallbacks() {
            let e = this.callbacks.pop();
            if (e)
              return (0, n.handleMaybePromise)(
                e,
                () => this._iterateCallbacks(),
                (e) => (
                  (this._error = this._error ? new a(e, this._error) : e),
                  this._iterateCallbacks()
                ),
              );
          }
          [s.DisposableSymbols.asyncDispose]() {
            let e = this._iterateCallbacks();
            if (e?.then)
              return e.then(() => {
                if (this._error) {
                  let e = this._error;
                  throw ((this._error = void 0), e);
                }
              });
            if (this._error) {
              let e = this._error;
              throw ((this._error = void 0), e);
            }
          }
          [Symbol.toStringTag] = "AsyncDisposableStack";
        }
        t.PonyfillAsyncDisposableStack = l;
      },
      11522: (e, t, r) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.SuppressedError =
            t.AsyncDisposableStack =
            t.DisposableStack =
              void 0);
        let n = r(66715),
          i = r(11326),
          s = r(4628),
          o = r(22856);
        (t.DisposableStack =
          globalThis.DisposableStack || s.PonyfillDisposableStack),
          (t.AsyncDisposableStack =
            globalThis.AsyncDisposableStack || i.PonyfillAsyncDisposableStack),
          (t.SuppressedError =
            globalThis.SuppressedError || o.PonyfillSuppressedError),
          n.__exportStar(r(39439), t);
      },
      11997: (e) => {
        "use strict";
        e.exports = require("punycode");
      },
      13753: (e, t, r) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.fakePromise = void 0),
          (t.getHeadersObj = function (e) {
            return null != e && o(e)
              ? !e.headersInit || e._map || o(e.headersInit)
                ? Object.fromEntries(e.entries())
                : e.headersInit
              : e;
          }),
          (t.defaultHeadersSerializer = function (e, t) {
            let r = [];
            return (
              e.forEach((e, n) => {
                t && "content-length" === n && t(e), r.push(`${n}: ${e}`);
              }),
              r
            );
          }),
          (t.isArrayBufferView = function (e) {
            return (
              null != e &&
              null != e.buffer &&
              null != e.byteLength &&
              null != e.byteOffset
            );
          }),
          (t.isNodeReadable = function (e) {
            return null != e && null != e.pipe;
          }),
          (t.isIterable = function (e) {
            return e?.[Symbol.iterator] != null;
          }),
          (t.shouldRedirect = function (e) {
            return (
              301 === e || 302 === e || 303 === e || 307 === e || 308 === e
            );
          }),
          (t.wrapIncomingMessageWithPassthrough = function ({
            incomingMessage: e,
            signal: t,
            passThrough: r = new i.PassThrough(),
            onError: n = (e) => {
              r.destroy(e);
            },
          }) {
            return (
              (0, s.pipeline)(e, r, { signal: t, end: !0 })
                .then(() => {
                  e.destroyed || e.resume();
                })
                .catch(n),
              r
            );
          }),
          (t.endStream = function (e) {
            return e.end(null, null, null);
          }),
          (t.safeWrite = function (e, t, r) {
            if (!t.write(e)) return (0, n.once)(t, "drain", { signal: r });
          });
        let n = r(78474),
          i = r(57075),
          s = r(46466);
        function o(e) {
          return e?.forEach != null;
        }
        var a = r(80780);
        Object.defineProperty(t, "fakePromise", {
          enumerable: !0,
          get: function () {
            return a.fakePromise;
          },
        });
      },
      16068: (e, t, r) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.PonyfillFormData = void 0),
          (t.getStreamFromFormData = function (e, t = "---") {
            let r,
              i,
              o = !1,
              a = !1;
            function l(e) {
              let { done: s, value: o } = r.next();
              if (s)
                return (
                  e.enqueue(
                    n.Buffer.from(`\r
--${t}--\r
`),
                  ),
                  e.close()
                );
              if (
                (a &&
                  e.enqueue(
                    n.Buffer.from(`\r
--${t}\r
`),
                  ),
                o)
              ) {
                let [t, r] = o;
                if ("string" == typeof r)
                  e.enqueue(
                    n.Buffer.from(`Content-Disposition: form-data; name="${t}"\r
\r
`),
                  ),
                    e.enqueue(n.Buffer.from(r));
                else {
                  let s = "";
                  r.name && (s = `; filename="${r.name}"`),
                    e.enqueue(
                      n.Buffer
                        .from(`Content-Disposition: form-data; name="${t}"${s}\r
`),
                    ),
                    e.enqueue(
                      n.Buffer
                        .from(`Content-Type: ${r.type || "application/octet-stream"}\r
\r
`),
                    ),
                    (i = r.stream()[Symbol.asyncIterator]());
                }
                a = !0;
              }
            }
            return new s.PonyfillReadableStream({
              start: () => {
                r = e.entries();
              },
              pull: (e) =>
                o
                  ? i
                    ? i
                        .next()
                        .then(({ done: t, value: r }) =>
                          (t && (i = void 0), r) ? e.enqueue(r) : l(e),
                        )
                    : l(e)
                  : ((o = !0),
                    e.enqueue(
                      n.Buffer.from(`--${t}\r
`),
                    )),
              cancel: (e) => {
                r?.return?.(e), i?.return?.(e);
              },
            });
          });
        let n = r(4573),
          i = r(94591),
          s = r(60626);
        class o {
          map = new Map();
          append(e, t, r) {
            let n = this.map.get(e);
            n || ((n = []), this.map.set(e, n));
            let i = l(t) ? a(e, t, r) : t;
            n.push(i);
          }
          delete(e) {
            this.map.delete(e);
          }
          get(e) {
            let t = this.map.get(e);
            return t ? t[0] : null;
          }
          getAll(e) {
            return this.map.get(e) || [];
          }
          has(e) {
            return this.map.has(e);
          }
          set(e, t, r) {
            let n = l(t) ? a(e, t, r) : t;
            this.map.set(e, [n]);
          }
          [Symbol.iterator]() {
            return this._entries();
          }
          *_entries() {
            for (let [e, t] of this.map) for (let r of t) yield [e, r];
          }
          entries() {
            return new i.PonyfillIteratorObject(
              this._entries(),
              "FormDataIterator",
            );
          }
          _keys() {
            return this.map.keys();
          }
          keys() {
            return new i.PonyfillIteratorObject(
              this._keys(),
              "FormDataIterator",
            );
          }
          *_values() {
            for (let e of this.map.values()) for (let t of e) yield t;
          }
          values() {
            return new i.PonyfillIteratorObject(
              this._values(),
              "FormDataIterator",
            );
          }
          forEach(e) {
            for (let [t, r] of this) e(r, t, this);
          }
        }
        function a(e, t, r) {
          return (
            Object.defineProperty(t, "name", {
              configurable: !0,
              enumerable: !0,
              value: r || t.name || e,
            }),
            t
          );
        }
        function l(e) {
          return e?.arrayBuffer != null;
        }
        t.PonyfillFormData = o;
      },
      18855: (e, t) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.PonyfillURLSearchParams = void 0),
          (t.PonyfillURLSearchParams = globalThis.URLSearchParams);
      },
      19771: (e) => {
        "use strict";
        e.exports = require("process");
      },
      21820: (e) => {
        "use strict";
        e.exports = require("os");
      },
      22856: (e, t) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.PonyfillSuppressedError = void 0);
        class r extends Error {
          error;
          suppressed;
          constructor(e, t, r) {
            super(r),
              (this.error = e),
              (this.suppressed = t),
              (this.name = "SuppressedError"),
              Error.captureStackTrace(this, this.constructor);
          }
        }
        t.PonyfillSuppressedError = r;
      },
      26523: (e, t, r) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.PonyfillFile = void 0);
        let n = r(53701);
        class i extends n.PonyfillBlob {
          name;
          lastModified;
          constructor(e, t, r) {
            super(e, r),
              (this.name = t),
              (this.lastModified = r?.lastModified || Date.now());
          }
          webkitRelativePath = "";
        }
        t.PonyfillFile = i;
      },
      27910: (e) => {
        "use strict";
        e.exports = require("stream");
      },
      28354: (e) => {
        "use strict";
        e.exports = require("util");
      },
      28529: (e, t, r) => {
        "use strict";
        let n = r(52158),
          i = r(40605),
          s = r(8331),
          o = /^charset$/i;
        function a(e, t) {
          let r,
            i = t.limits,
            a = t.parsedConType;
          (this.boy = e),
            (this.fieldSizeLimit = s(i, "fieldSize", 1048576)),
            (this.fieldNameSizeLimit = s(i, "fieldNameSize", 100)),
            (this.fieldsLimit = s(i, "fields", 1 / 0));
          for (var l = 0, u = a.length; l < u; ++l)
            if (Array.isArray(a[l]) && o.test(a[l][0])) {
              r = a[l][1].toLowerCase();
              break;
            }
          void 0 === r && (r = t.defCharset || "utf8"),
            (this.decoder = new n()),
            (this.charset = r),
            (this._fields = 0),
            (this._state = "key"),
            (this._checkingBytes = !0),
            (this._bytesKey = 0),
            (this._bytesVal = 0),
            (this._key = ""),
            (this._val = ""),
            (this._keyTrunc = !1),
            (this._valTrunc = !1),
            (this._hitLimit = !1);
        }
        (a.detect = /^application\/x-www-form-urlencoded/i),
          (a.prototype.write = function (e, t) {
            let r, n, s;
            if (this._fields === this.fieldsLimit)
              return (
                this.boy.hitFieldsLimit ||
                  ((this.boy.hitFieldsLimit = !0),
                  this.boy.emit("fieldsLimit")),
                t()
              );
            let o = 0,
              a = e.length;
            for (; o < a; )
              if ("key" === this._state) {
                for (r = n = void 0, s = o; s < a; ++s) {
                  if ((!this._checkingBytes && ++o, 61 === e[s])) {
                    r = s;
                    break;
                  }
                  if (38 === e[s]) {
                    n = s;
                    break;
                  }
                  if (
                    this._checkingBytes &&
                    this._bytesKey === this.fieldNameSizeLimit
                  ) {
                    this._hitLimit = !0;
                    break;
                  }
                  this._checkingBytes && ++this._bytesKey;
                }
                if (void 0 !== r)
                  r > o &&
                    (this._key += this.decoder.write(
                      e.toString("binary", o, r),
                    )),
                    (this._state = "val"),
                    (this._hitLimit = !1),
                    (this._checkingBytes = !0),
                    (this._val = ""),
                    (this._bytesVal = 0),
                    (this._valTrunc = !1),
                    this.decoder.reset(),
                    (o = r + 1);
                else if (void 0 !== n) {
                  let r;
                  ++this._fields;
                  let s = this._keyTrunc;
                  if (
                    ((r =
                      n > o
                        ? (this._key += this.decoder.write(
                            e.toString("binary", o, n),
                          ))
                        : this._key),
                    (this._hitLimit = !1),
                    (this._checkingBytes = !0),
                    (this._key = ""),
                    (this._bytesKey = 0),
                    (this._keyTrunc = !1),
                    this.decoder.reset(),
                    r.length &&
                      this.boy.emit(
                        "field",
                        i(r, "binary", this.charset),
                        "",
                        s,
                        !1,
                      ),
                    (o = n + 1),
                    this._fields === this.fieldsLimit)
                  )
                    return t();
                } else
                  this._hitLimit
                    ? (s > o &&
                        (this._key += this.decoder.write(
                          e.toString("binary", o, s),
                        )),
                      (o = s),
                      (this._bytesKey = this._key.length) ===
                        this.fieldNameSizeLimit &&
                        ((this._checkingBytes = !1), (this._keyTrunc = !0)))
                    : (o < a &&
                        (this._key += this.decoder.write(
                          e.toString("binary", o),
                        )),
                      (o = a));
              } else {
                for (n = void 0, s = o; s < a; ++s) {
                  if ((!this._checkingBytes && ++o, 38 === e[s])) {
                    n = s;
                    break;
                  }
                  if (
                    this._checkingBytes &&
                    this._bytesVal === this.fieldSizeLimit
                  ) {
                    this._hitLimit = !0;
                    break;
                  }
                  this._checkingBytes && ++this._bytesVal;
                }
                if (void 0 !== n) {
                  if (
                    (++this._fields,
                    n > o &&
                      (this._val += this.decoder.write(
                        e.toString("binary", o, n),
                      )),
                    this.boy.emit(
                      "field",
                      i(this._key, "binary", this.charset),
                      i(this._val, "binary", this.charset),
                      this._keyTrunc,
                      this._valTrunc,
                    ),
                    (this._state = "key"),
                    (this._hitLimit = !1),
                    (this._checkingBytes = !0),
                    (this._key = ""),
                    (this._bytesKey = 0),
                    (this._keyTrunc = !1),
                    this.decoder.reset(),
                    (o = n + 1),
                    this._fields === this.fieldsLimit)
                  )
                    return t();
                } else
                  this._hitLimit
                    ? (s > o &&
                        (this._val += this.decoder.write(
                          e.toString("binary", o, s),
                        )),
                      (o = s),
                      (("" === this._val && 0 === this.fieldSizeLimit) ||
                        (this._bytesVal = this._val.length) ===
                          this.fieldSizeLimit) &&
                        ((this._checkingBytes = !1), (this._valTrunc = !0)))
                    : (o < a &&
                        (this._val += this.decoder.write(
                          e.toString("binary", o),
                        )),
                      (o = a));
              }
            t();
          }),
          (a.prototype.end = function () {
            this.boy._done ||
              ("key" === this._state && this._key.length > 0
                ? this.boy.emit(
                    "field",
                    i(this._key, "binary", this.charset),
                    "",
                    this._keyTrunc,
                    !1,
                  )
                : "val" === this._state &&
                  this.boy.emit(
                    "field",
                    i(this._key, "binary", this.charset),
                    i(this._val, "binary", this.charset),
                    this._keyTrunc,
                    this._valTrunc,
                  ),
              (this.boy._done = !0),
              this.boy.emit("finish"));
          }),
          (e.exports = a);
      },
      29021: (e) => {
        "use strict";
        e.exports = require("fs");
      },
      29294: (e) => {
        "use strict";
        e.exports = require("next/dist/server/app-render/work-async-storage.external.js");
      },
      29638: (e, t, r) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.fetchCurl = function (e) {
            let t,
              r,
              l,
              {
                Curl: u,
                CurlFeature: c,
                CurlPause: f,
                CurlProgressFunc: h,
              } = globalThis.libcurl,
              d = new u();
            if (
              (d.enable(c.NoDataParsing),
              d.setOpt("URL", e.url),
              "0" === process.env.NODE_TLS_REJECT_UNAUTHORIZED &&
                d.setOpt("SSL_VERIFYPEER", !1),
              process.env.NODE_EXTRA_CA_CERTS
                ? d.setOpt("CAINFO", process.env.NODE_EXTRA_CA_CERTS)
                : d.setOpt("CAINFO_BLOB", i.rootCertificates.join("\n")),
              d.enable(c.StreamResponse),
              (t =
                null === e._signal ? void 0 : e._signal ? e._signal : e.signal),
              d.setStreamProgressCallback(function () {
                return t?.aborted ? (process.env.DEBUG ? h.Continue : 1) : 0;
              }),
              "String" === e.bodyType)
            )
              d.setOpt("POSTFIELDS", e.bodyInit);
            else {
              let t =
                null != e.body
                  ? (0, a.isNodeReadable)(e.body)
                    ? e.body
                    : n.Readable.from(e.body)
                  : null;
              t && (d.setOpt("UPLOAD", !0), d.setUploadStream(t));
            }
            process.env.DEBUG && d.setOpt("VERBOSE", !0),
              d.setOpt("TRANSFER_ENCODING", !1),
              d.setOpt("HTTP_TRANSFER_DECODING", !0),
              d.setOpt("FOLLOWLOCATION", "follow" === e.redirect),
              d.setOpt("MAXREDIRS", 20),
              d.setOpt("ACCEPT_ENCODING", ""),
              d.setOpt("CUSTOMREQUEST", e.method);
            let p = (e.headersSerializer || a.defaultHeadersSerializer)(
              e.headers,
              (e) => {
                r = Number(e);
              },
            );
            null != r && d.setOpt("INFILESIZE", r),
              d.setOpt("HTTPHEADER", p),
              d.enable(c.NoHeaderParsing);
            let y = (0, s.createDeferredPromise)();
            function m() {
              if (d.isOpen)
                try {
                  d.pause(f.Recv);
                } catch (e) {
                  y.reject(e);
                }
            }
            return (
              t?.addEventListener("abort", m, { once: !0 }),
              d.once("end", function () {
                try {
                  d.close();
                } catch (e) {
                  y.reject(e);
                }
                t?.removeEventListener("abort", m);
              }),
              d.once("error", function (e) {
                !l || l.closed || l.destroyed
                  ? ("Operation was aborted by an application callback" ===
                      e.message && (e.message = "The operation was aborted."),
                    y.reject(e))
                  : l.destroy(e);
                try {
                  d.close();
                } catch (e) {
                  y.reject(e);
                }
              }),
              d.once("stream", function (r, n, i) {
                let s = (0, a.wrapIncomingMessageWithPassthrough)({
                    incomingMessage: r,
                    signal: t,
                    onError: y.reject,
                  }),
                  c = i
                    .toString("utf8")
                    .split(/\r?\n|\r/g)
                    .filter(
                      (t) =>
                        !(!t || t.startsWith("HTTP/")) &&
                        ("error" === e.redirect &&
                          t.toLowerCase().includes("location") &&
                          (0, a.shouldRedirect)(n) &&
                          (r.destroyed || r.resume(),
                          s.destroy(),
                          y.reject(Error("redirect is not allowed"))),
                        !0),
                    )
                    .map((e) => e.split(/:\s(.+)/).slice(0, 2)),
                  f = new o.PonyfillResponse(s, {
                    status: n,
                    headers: c,
                    url: d.getInfo(u.info.REDIRECT_URL)?.toString() || e.url,
                    redirected: Number(d.getInfo(u.info.REDIRECT_COUNT)) > 0,
                  });
                y.resolve(f), (l = s);
              }),
              setImmediate(() => {
                d.perform();
              }),
              y.promise
            );
          });
        let n = r(57075),
          i = r(41692),
          s = r(80780),
          o = r(97609),
          a = r(13753);
      },
      31141: (e, t, r) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.PonyfillRequest = void 0);
        let n = r(37067),
          i = r(44708),
          s = r(85786),
          o = r(8462),
          a = r(94849);
        class l extends s.PonyfillBody {
          constructor(e, t) {
            let r,
              s,
              a,
              l = null;
            if ("string" == typeof e) r = e;
            else
              e?.href != null
                ? (s = e)
                : "Request" === e[Symbol.toStringTag] &&
                  (e._parsedUrl
                    ? (s = e._parsedUrl)
                    : (r = e._url ? e._url : e.url),
                  (l = e.body),
                  (a = e));
            if (
              (null != t && ((l = t.body || null), (a = t)),
              super(l, a),
              (this._url = r),
              (this._parsedUrl = s),
              (this.cache = a?.cache || "default"),
              (this.credentials = a?.credentials || "same-origin"),
              (this.headers =
                a?.headers && (0, o.isHeadersLike)(a.headers)
                  ? a.headers
                  : new o.PonyfillHeaders(a?.headers)),
              (this.integrity = a?.integrity || ""),
              (this.keepalive = a?.keepalive != null && a?.keepalive),
              (this.method = a?.method?.toUpperCase() || "GET"),
              (this.mode = a?.mode || "cors"),
              (this.redirect = a?.redirect || "follow"),
              (this.referrer = a?.referrer || "about:client"),
              (this.referrerPolicy = a?.referrerPolicy || "no-referrer"),
              (this.headersSerializer = a?.headersSerializer),
              (this.duplex = a?.duplex || "half"),
              (this.destination = "document"),
              (this.priority = "auto"),
              "GET" !== this.method &&
                "HEAD" !== this.method &&
                this.handleContentLengthHeader(!0),
              a?.agent != null)
            ) {
              let e = s?.protocol || r || this.url;
              !1 === a.agent
                ? (this.agent = !1)
                : e.startsWith("http:") && a.agent instanceof n.Agent
                  ? (this.agent = a.agent)
                  : e.startsWith("https:") &&
                    a.agent instanceof i.Agent &&
                    (this.agent = a.agent);
            }
          }
          headersSerializer;
          cache;
          credentials;
          destination;
          headers;
          integrity;
          keepalive;
          method;
          mode;
          priority;
          redirect;
          referrer;
          referrerPolicy;
          _url;
          get signal() {
            return (
              (this._signal ||= new AbortController().signal), this._signal
            );
          }
          get url() {
            if (null == this._url)
              if (this._parsedUrl) this._url = this._parsedUrl.toString();
              else throw TypeError("Invalid URL");
            return this._url;
          }
          _parsedUrl;
          get parsedUrl() {
            if (null == this._parsedUrl)
              if (null != this._url)
                this._parsedUrl = new a.PonyfillURL(
                  this._url,
                  "http://localhost",
                );
              else throw TypeError("Invalid URL");
            return this._parsedUrl;
          }
          duplex;
          agent;
          clone() {
            return this;
          }
          [Symbol.toStringTag] = "Request";
        }
        t.PonyfillRequest = l;
      },
      31351: (e, t, r) => {
        "use strict";
        let n = r(57075).Writable,
          { inherits: i } = r(57975),
          s = r(74652),
          o = r(37510),
          a = r(28529),
          l = r(91627);
        function u(e) {
          if (!(this instanceof u)) return new u(e);
          if ("object" != typeof e)
            throw TypeError("Busboy expected an options-Object.");
          if ("object" != typeof e.headers)
            throw TypeError(
              "Busboy expected an options-Object with headers-attribute.",
            );
          if ("string" != typeof e.headers["content-type"])
            throw TypeError("Missing Content-Type-header.");
          let { headers: t, ...r } = e;
          (this.opts = { autoDestroy: !1, ...r }),
            n.call(this, this.opts),
            (this._done = !1),
            (this._parser = this.getParserByHeaders(t)),
            (this._finished = !1);
        }
        i(u, n),
          (u.prototype.emit = function (e) {
            if ("finish" === e) {
              if (!this._done) return void this._parser?.end();
              if (this._finished) return;
              this._finished = !0;
            }
            n.prototype.emit.apply(this, arguments);
          }),
          (u.prototype.getParserByHeaders = function (e) {
            let t = l(e["content-type"]),
              r = {
                defCharset: this.opts.defCharset,
                fileHwm: this.opts.fileHwm,
                headers: e,
                highWaterMark: this.opts.highWaterMark,
                isPartAFile: this.opts.isPartAFile,
                limits: this.opts.limits,
                parsedConType: t,
                preservePath: this.opts.preservePath,
              };
            if (o.detect.test(t[0])) return new o(this, r);
            if (a.detect.test(t[0])) return new a(this, r);
            throw Error("Unsupported Content-Type.");
          }),
          (u.prototype._write = function (e, t, r) {
            this._parser.write(e, r);
          }),
          (e.exports = u),
          (e.exports.default = u),
          (e.exports.Busboy = u),
          (e.exports.Dicer = s);
      },
      31421: (e) => {
        "use strict";
        e.exports = require("node:child_process");
      },
      32296: (e, t, r) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.PonyfillTransformStream = void 0);
        let n = r(57075),
          i = r(60626),
          s = r(13753),
          o = r(60102);
        class a {
          transform;
          writable;
          readable;
          constructor(e) {
            if (e instanceof n.Transform) this.transform = e;
            else if (e) {
              let t = {
                  enqueue(e) {
                    r.push(e);
                  },
                  error(e) {
                    r.destroy(e);
                  },
                  terminate() {
                    (0, s.endStream)(r);
                  },
                  get desiredSize() {
                    return r.writableLength;
                  },
                },
                r = new n.Transform({
                  read() {},
                  write(r, n, i) {
                    try {
                      let n = e.transform?.(r, t);
                      n instanceof Promise
                        ? n.then(
                            () => {
                              i();
                            },
                            (e) => {
                              i(e);
                            },
                          )
                        : i();
                    } catch (e) {
                      i(e);
                    }
                  },
                  final(r) {
                    try {
                      let n = e.flush?.(t);
                      n instanceof Promise
                        ? n.then(
                            () => {
                              r();
                            },
                            (e) => {
                              r(e);
                            },
                          )
                        : r();
                    } catch (e) {
                      r(e);
                    }
                  },
                });
              this.transform = r;
            } else this.transform = new n.Transform();
            (this.writable = new o.PonyfillWritableStream(this.transform)),
              (this.readable = new i.PonyfillReadableStream(this.transform));
          }
        }
        t.PonyfillTransformStream = a;
      },
      33426: (e, t, r) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.PonyfillCompressionStream = void 0);
        let n = r(38522),
          i = r(32296);
        class s extends i.PonyfillTransformStream {
          static supportedFormats = globalThis.process?.version?.startsWith(
            "v2",
          )
            ? ["gzip", "deflate", "br"]
            : ["gzip", "deflate", "deflate-raw", "br"];
          constructor(e) {
            switch (e) {
              case "x-gzip":
              case "gzip":
                super((0, n.createGzip)());
                break;
              case "x-deflate":
              case "deflate":
                super((0, n.createDeflate)());
                break;
              case "deflate-raw":
                super((0, n.createDeflateRaw)());
                break;
              case "br":
                super((0, n.createBrotliCompress)());
                break;
              default:
                throw Error(`Unsupported compression format: ${e}`);
            }
          }
        }
        t.PonyfillCompressionStream = s;
      },
      33873: (e) => {
        "use strict";
        e.exports = require("path");
      },
      34631: (e) => {
        "use strict";
        e.exports = require("tls");
      },
      34870: (e, t, r) => {
        let { URLPattern: n } = r(76078);
        (e.exports = { URLPattern: n }),
          globalThis.URLPattern || (globalThis.URLPattern = n);
      },
      36686: (e) => {
        "use strict";
        e.exports = require("diagnostics_channel");
      },
      37067: (e) => {
        "use strict";
        e.exports = require("node:http");
      },
      37510: (e, t, r) => {
        "use strict";
        let { Readable: n } = r(57075),
          { inherits: i } = r(57975),
          s = r(74652),
          o = r(91627),
          a = r(40605),
          l = r(95702),
          u = r(8331),
          c = /^boundary$/i,
          f = /^form-data$/i,
          h = /^charset$/i,
          d = /^filename$/i,
          p = /^name$/i;
        function y(e, t) {
          let r,
            n,
            i,
            y,
            g,
            _ = this,
            v = t.limits,
            T =
              t.isPartAFile ||
              ((e, t, r) => "application/octet-stream" === t || void 0 !== r),
            E = t.parsedConType || [],
            x = t.defCharset || "utf8",
            w = t.preservePath,
            S = { highWaterMark: t.fileHwm };
          for (r = 0, n = E.length; r < n; ++r)
            if (Array.isArray(E[r]) && c.test(E[r][0])) {
              i = E[r][1];
              break;
            }
          function P() {
            0 === j && F && !e._done && ((F = !1), _.end());
          }
          if ("string" != typeof i)
            throw Error("Multipart: Boundary not found");
          let O = u(v, "fieldSize", 1048576),
            I = u(v, "fileSize", 1 / 0),
            k = u(v, "files", 1 / 0),
            C = u(v, "fields", 1 / 0),
            R = u(v, "parts", 1 / 0),
            A = u(v, "headerPairs", 2e3),
            N = u(v, "headerSize", 81920),
            D = 0,
            L = 0,
            j = 0,
            F = !1;
          (this._needDrain = !1),
            (this._pause = !1),
            (this._cb = void 0),
            (this._nparts = 0),
            (this._boy = e);
          let B = {
            boundary: i,
            maxHeaderPairs: A,
            maxHeaderSize: N,
            partHwm: S.highWaterMark,
            highWaterMark: t.highWaterMark,
          };
          (this.parser = new s(B)),
            this.parser
              .on("drain", function () {
                if (((_._needDrain = !1), _._cb && !_._pause)) {
                  let e = _._cb;
                  (_._cb = void 0), e();
                }
              })
              .on("part", function t(i) {
                if (++_._nparts > R)
                  return (
                    _.parser.removeListener("part", t),
                    _.parser.on("part", m),
                    (e.hitPartsLimit = !0),
                    e.emit("partsLimit"),
                    m(i)
                  );
                if (g) {
                  let e = g;
                  e.emit("end"), e.removeAllListeners("end");
                }
                i.on("header", function (t) {
                  let s,
                    u,
                    c,
                    v,
                    E,
                    R,
                    A,
                    N,
                    F = 0;
                  if (t["content-type"] && (c = o(t["content-type"][0]))[0]) {
                    for (
                      r = 0, s = c[0].toLowerCase(), n = c.length;
                      r < n;
                      ++r
                    )
                      if (h.test(c[r][0])) {
                        v = c[r][1].toLowerCase();
                        break;
                      }
                  }
                  if (
                    (void 0 === s && (s = "text/plain"),
                    void 0 === v && (v = x),
                    !t["content-disposition"] ||
                      ((c = o(t["content-disposition"][0])), !f.test(c[0])))
                  )
                    return m(i);
                  for (r = 0, n = c.length; r < n; ++r)
                    p.test(c[r][0])
                      ? (u = c[r][1])
                      : d.test(c[r][0]) && ((R = c[r][1]), w || (R = l(R)));
                  if (
                    ((E = t["content-transfer-encoding"]
                      ? t["content-transfer-encoding"][0].toLowerCase()
                      : "7bit"),
                    T(u, s, R))
                  ) {
                    if (D === k)
                      return (
                        e.hitFilesLimit ||
                          ((e.hitFilesLimit = !0), e.emit("filesLimit")),
                        m(i)
                      );
                    if ((++D, 0 === e.listenerCount("file")))
                      return void _.parser._ignore();
                    ++j;
                    let t = new b(S);
                    (y = t),
                      t.on("end", function () {
                        if (
                          (--j, (_._pause = !1), P(), _._cb && !_._needDrain)
                        ) {
                          let e = _._cb;
                          (_._cb = void 0), e();
                        }
                      }),
                      (t._read = function (e) {
                        if (
                          _._pause &&
                          ((_._pause = !1), _._cb && !_._needDrain)
                        ) {
                          let e = _._cb;
                          (_._cb = void 0), e();
                        }
                      }),
                      e.emit("file", u, t, R, E, s),
                      (A = function (e) {
                        if ((F += e.length) > I) {
                          let r = I - F + e.length;
                          r > 0 && t.push(e.slice(0, r)),
                            (t.truncated = !0),
                            (t.bytesRead = I),
                            i.removeAllListeners("data"),
                            t.emit("limit");
                          return;
                        }
                        t.push(e) || (_._pause = !0), (t.bytesRead = F);
                      }),
                      (N = function () {
                        (y = void 0), t.push(null);
                      });
                  } else {
                    if (L === C)
                      return (
                        e.hitFieldsLimit ||
                          ((e.hitFieldsLimit = !0), e.emit("fieldsLimit")),
                        m(i)
                      );
                    ++L, ++j;
                    let t = "",
                      r = !1;
                    (g = i),
                      (A = function (e) {
                        if ((F += e.length) > O) {
                          let n = O - (F - e.length);
                          (t += e.toString("binary", 0, n)),
                            (r = !0),
                            i.removeAllListeners("data");
                        } else t += e.toString("binary");
                      }),
                      (N = function () {
                        (g = void 0),
                          t.length && (t = a(t, "binary", v)),
                          e.emit("field", u, t, !1, r, E, s),
                          --j,
                          P();
                      });
                  }
                  (i._readableState.sync = !1), i.on("data", A), i.on("end", N);
                }).on("error", function (e) {
                  y && y.emit("error", e);
                });
              })
              .on("error", function (t) {
                e.emit("error", t);
              })
              .on("finish", function () {
                (F = !0), P();
              });
        }
        function m(e) {
          e.resume();
        }
        function b(e) {
          n.call(this, e), (this.bytesRead = 0), (this.truncated = !1);
        }
        (y.detect = /^multipart\/form-data/i),
          (y.prototype.write = function (e, t) {
            let r = this.parser.write(e);
            r && !this._pause ? t() : ((this._needDrain = !r), (this._cb = t));
          }),
          (y.prototype.end = function () {
            let e = this;
            e.parser.writable
              ? e.parser.end()
              : e._boy._done ||
                process.nextTick(function () {
                  (e._boy._done = !0), e._boy.emit("finish");
                });
          }),
          i(b, n),
          (b.prototype._read = function (e) {}),
          (e.exports = y);
      },
      38522: (e) => {
        "use strict";
        e.exports = require("node:zlib");
      },
      39439: (e, t) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.DisposableSymbols = void 0),
          (t.patchSymbols = function () {
            (Symbol.dispose ||= Symbol.for("dispose")),
              (Symbol.asyncDispose ||= Symbol.for("asyncDispose"));
          }),
          (t.DisposableSymbols = {
            get dispose() {
              return Symbol.dispose || Symbol.for("dispose");
            },
            get asyncDispose() {
              return Symbol.asyncDispose || Symbol.for("asyncDispose");
            },
          });
      },
      40605: function (e) {
        "use strict";
        let t = new TextDecoder("utf-8"),
          r = new Map([
            ["utf-8", t],
            ["utf8", t],
          ]),
          n = {
            utf8: (e, t) =>
              0 === e.length
                ? ""
                : ("string" == typeof e && (e = Buffer.from(e, t)),
                  e.utf8Slice(0, e.length)),
            latin1: (e, t) =>
              0 === e.length
                ? ""
                : "string" == typeof e
                  ? e
                  : e.latin1Slice(0, e.length),
            utf16le: (e, t) =>
              0 === e.length
                ? ""
                : ("string" == typeof e && (e = Buffer.from(e, t)),
                  e.ucs2Slice(0, e.length)),
            base64: (e, t) =>
              0 === e.length
                ? ""
                : ("string" == typeof e && (e = Buffer.from(e, t)),
                  e.base64Slice(0, e.length)),
            other: (e, t) => {
              if (0 === e.length) return "";
              if (
                ("string" == typeof e && (e = Buffer.from(e, t)),
                r.has(this.toString()))
              )
                try {
                  return r.get(this).decode(e);
                } catch {}
              return "string" == typeof e ? e : e.toString();
            },
          };
        e.exports = function (e, t, r) {
          return e
            ? (function (e) {
                let t;
                for (;;)
                  switch (e) {
                    case "utf-8":
                    case "utf8":
                      return n.utf8;
                    case "latin1":
                    case "ascii":
                    case "us-ascii":
                    case "iso-8859-1":
                    case "iso8859-1":
                    case "iso88591":
                    case "iso_8859-1":
                    case "windows-1252":
                    case "iso_8859-1:1987":
                    case "cp1252":
                    case "x-cp1252":
                      return n.latin1;
                    case "utf16le":
                    case "utf-16le":
                    case "ucs2":
                    case "ucs-2":
                      return n.utf16le;
                    case "base64":
                      return n.base64;
                    default:
                      if (void 0 === t) {
                        (t = !0), (e = e.toLowerCase());
                        continue;
                      }
                      return n.other.bind(e);
                  }
              })(r)(e, t)
            : e;
        };
      },
      41692: (e) => {
        "use strict";
        e.exports = require("node:tls");
      },
      43886: () => {},
      44032: (e, t, r) => {
        let n,
          i = r(4330);
        e.exports = function (e = {}) {
          let t = {};
          return ((t.URLPattern = globalThis.URLPattern),
          t.URLPattern || (t.URLPattern = r(34870).URLPattern),
          e.skipPonyfill || i())
            ? {
                fetch: globalThis.fetch,
                Headers: globalThis.Headers,
                Request: globalThis.Request,
                Response: globalThis.Response,
                FormData: globalThis.FormData,
                ReadableStream: globalThis.ReadableStream,
                WritableStream: globalThis.WritableStream,
                TransformStream: globalThis.TransformStream,
                CompressionStream: globalThis.CompressionStream,
                DecompressionStream: globalThis.DecompressionStream,
                TextDecoderStream: globalThis.TextDecoderStream,
                TextEncoderStream: globalThis.TextEncoderStream,
                Blob: globalThis.Blob,
                File: globalThis.File,
                crypto: globalThis.crypto,
                btoa: globalThis.btoa,
                TextEncoder: globalThis.TextEncoder,
                TextDecoder: globalThis.TextDecoder,
                URLPattern: t.URLPattern,
                URL: globalThis.URL,
                URLSearchParams: globalThis.URLSearchParams,
              }
            : ((n ||= r(85528)),
              (t.fetch = n.fetch),
              (t.Request = n.Request),
              (t.Response = n.Response),
              (t.Headers = n.Headers),
              (t.FormData = n.FormData),
              (t.ReadableStream = n.ReadableStream),
              (t.URL = n.URL),
              (t.URLSearchParams = n.URLSearchParams),
              (t.WritableStream = n.WritableStream),
              (t.TransformStream = n.TransformStream),
              (t.CompressionStream = n.CompressionStream),
              (t.DecompressionStream = n.DecompressionStream),
              (t.TextDecoderStream = n.TextDecoderStream),
              (t.TextEncoderStream = n.TextEncoderStream),
              (t.Blob = n.Blob),
              (t.File = n.File),
              (t.crypto = globalThis.crypto),
              (t.btoa = n.btoa),
              (t.TextEncoder = n.TextEncoder),
              (t.TextDecoder = n.TextDecoder),
              e.formDataLimits &&
                ((t.Body = class extends n.Body {
                  constructor(t, r) {
                    super(t, { formDataLimits: e.formDataLimits, ...r });
                  }
                }),
                (t.Request = class extends n.Request {
                  constructor(t, r) {
                    super(t, { formDataLimits: e.formDataLimits, ...r });
                  }
                }),
                (t.Response = class extends n.Response {
                  constructor(t, r) {
                    super(t, { formDataLimits: e.formDataLimits, ...r });
                  }
                })),
              t.crypto || (t.crypto = r(55511).webcrypto),
              t);
        };
      },
      44708: (e) => {
        "use strict";
        e.exports = require("node:https");
      },
      44870: (e) => {
        "use strict";
        e.exports = require("next/dist/compiled/next-server/app-route.runtime.prod.js");
      },
      46466: (e) => {
        "use strict";
        e.exports = require("node:stream/promises");
      },
      48161: (e) => {
        "use strict";
        e.exports = require("node:os");
      },
      52158: (e) => {
        "use strict";
        let t = /\+/g,
          r = [
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1,
            1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
          ];
        function n() {
          this.buffer = void 0;
        }
        (n.prototype.write = function (e) {
          e = e.replace(t, " ");
          let n = "",
            i = 0,
            s = 0,
            o = e.length;
          for (; i < o; ++i)
            void 0 !== this.buffer
              ? r[e.charCodeAt(i)]
                ? ((this.buffer += e[i]),
                  ++s,
                  2 === this.buffer.length &&
                    ((n += String.fromCharCode(parseInt(this.buffer, 16))),
                    (this.buffer = void 0)))
                : ((n += "%" + this.buffer), (this.buffer = void 0), --i)
              : "%" === e[i] &&
                (i > s && ((n += e.substring(s, i)), (s = i)),
                (this.buffer = ""),
                ++s);
          return s < o && void 0 === this.buffer && (n += e.substring(s)), n;
        }),
          (n.prototype.reset = function () {
            this.buffer = void 0;
          }),
          (e.exports = n);
      },
      53053: (e) => {
        "use strict";
        e.exports = require("node:diagnostics_channel");
      },
      53701: (e, t, r) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.PonyfillBlob = void 0),
          (t.hasBufferMethod = a),
          (t.hasArrayBufferMethod = l),
          (t.hasBytesMethod = u),
          (t.hasTextMethod = c),
          (t.hasSizeProperty = f),
          (t.hasStreamMethod = h),
          (t.hasBlobSignature = d),
          (t.isArrayBuffer = p);
        let n = r(4573),
          i = r(60626),
          s = r(13753);
        function o(e) {
          return "string" == typeof e
            ? n.Buffer.from(e)
            : n.Buffer.isBuffer(e)
              ? e
              : (0, s.isArrayBufferView)(e)
                ? n.Buffer.from(e.buffer, e.byteOffset, e.byteLength)
                : n.Buffer.from(e);
        }
        function a(e) {
          return null != e && null != e.buffer && "function" == typeof e.buffer;
        }
        function l(e) {
          return (
            null != e &&
            null != e.arrayBuffer &&
            "function" == typeof e.arrayBuffer
          );
        }
        function u(e) {
          return null != e && null != e.bytes && "function" == typeof e.bytes;
        }
        function c(e) {
          return null != e && null != e.text && "function" == typeof e.text;
        }
        function f(e) {
          return null != e && "number" == typeof e.size;
        }
        function h(e) {
          return null != e && null != e.stream && "function" == typeof e.stream;
        }
        function d(e) {
          return null != e && "Blob" === e[Symbol.toStringTag];
        }
        function p(e) {
          return null != e && null != e.byteLength && null != e.slice;
        }
        class y {
          blobParts;
          type;
          encoding;
          _size = null;
          constructor(e = [], t) {
            if (
              ((this.blobParts = e),
              (this.type = t?.type || "application/octet-stream"),
              (this.encoding = t?.encoding || "utf8"),
              (this._size = t?.size || null),
              1 === e.length && d(e[0]))
            )
              return e[0];
          }
          _buffer = null;
          buffer() {
            if (this._buffer) return (0, s.fakePromise)(this._buffer);
            if (1 === this.blobParts.length) {
              let e = this.blobParts[0];
              return a(e)
                ? e.buffer().then((e) => ((this._buffer = e), this._buffer))
                : u(e)
                  ? e
                      .bytes()
                      .then(
                        (e) => (
                          (this._buffer = n.Buffer.from(e)), this._buffer
                        ),
                      )
                  : l(e)
                    ? e
                        .arrayBuffer()
                        .then(
                          (t) => (
                            (this._buffer = n.Buffer.from(t, void 0, e.size)),
                            this._buffer
                          ),
                        )
                    : ((this._buffer = o(e)), (0, s.fakePromise)(this._buffer));
            }
            let e = [],
              t = this.blobParts.map((r, i) =>
                a(r)
                  ? void e.push(
                      r.buffer().then((e) => {
                        t[i] = e;
                      }),
                    )
                  : l(r)
                    ? void e.push(
                        r.arrayBuffer().then((e) => {
                          t[i] = n.Buffer.from(e, void 0, r.size);
                        }),
                      )
                    : u(r)
                      ? void e.push(
                          r.bytes().then((e) => {
                            t[i] = n.Buffer.from(e);
                          }),
                        )
                      : o(r),
              );
            return e.length > 0
              ? Promise.all(e).then(() =>
                  n.Buffer.concat(t, this._size || void 0),
                )
              : (0, s.fakePromise)(n.Buffer.concat(t, this._size || void 0));
          }
          arrayBuffer() {
            if (this._buffer) return (0, s.fakePromise)(this._buffer);
            if (1 === this.blobParts.length) {
              if (p(this.blobParts[0]))
                return (0, s.fakePromise)(this.blobParts[0]);
              if (l(this.blobParts[0])) return this.blobParts[0].arrayBuffer();
            }
            return this.buffer();
          }
          bytes() {
            if (this._buffer) return (0, s.fakePromise)(this._buffer);
            if (1 === this.blobParts.length) {
              if (n.Buffer.isBuffer(this.blobParts[0]))
                return (
                  (this._buffer = this.blobParts[0]),
                  (0, s.fakePromise)(this.blobParts[0])
                );
              if (this.blobParts[0] instanceof Uint8Array)
                return (
                  (this._buffer = n.Buffer.from(this.blobParts[0])),
                  (0, s.fakePromise)(this.blobParts[0])
                );
              if (u(this.blobParts[0])) return this.blobParts[0].bytes();
              if (a(this.blobParts[0])) return this.blobParts[0].buffer();
            }
            return this.buffer();
          }
          _text = null;
          text() {
            if (this._text) return (0, s.fakePromise)(this._text);
            if (1 === this.blobParts.length) {
              let e = this.blobParts[0];
              if ("string" == typeof e)
                return (this._text = e), (0, s.fakePromise)(this._text);
              if (c(e))
                return e.text().then((e) => ((this._text = e), this._text));
              let t = o(e);
              return (
                (this._text = t.toString(this.encoding)),
                (0, s.fakePromise)(this._text)
              );
            }
            return this.buffer().then(
              (e) => ((this._text = e.toString(this.encoding)), this._text),
            );
          }
          _json = null;
          json() {
            return this._json
              ? (0, s.fakePromise)(this._json)
              : this.text().then(
                  (e) => ((this._json = JSON.parse(e)), this._json),
                );
          }
          _formData = null;
          formData() {
            if (this._formData) return (0, s.fakePromise)(this._formData);
            throw Error("Not implemented");
          }
          get size() {
            if (null == this._size)
              for (let e of ((this._size = 0), this.blobParts))
                "string" == typeof e
                  ? (this._size += n.Buffer.byteLength(e))
                  : f(e)
                    ? (this._size += e.size)
                    : (0, s.isArrayBufferView)(e) &&
                      (this._size += e.byteLength);
            return this._size;
          }
          stream() {
            let e;
            if (1 === this.blobParts.length) {
              let e = this.blobParts[0];
              if (h(e)) return e.stream();
              let t = o(e);
              return new i.PonyfillReadableStream({
                start: (e) => {
                  e.enqueue(t), e.close();
                },
              });
            }
            return new i.PonyfillReadableStream(
              null != this._buffer
                ? {
                    start: (e) => {
                      e.enqueue(this._buffer), e.close();
                    },
                  }
                : {
                    start: (t) => {
                      if (0 === this.blobParts.length) return void t.close();
                      e = this.blobParts[Symbol.iterator]();
                    },
                    pull: (t) => {
                      let { value: r, done: i } = e.next();
                      if (i) return void t.close();
                      if (r) {
                        if (a(r))
                          return r.buffer().then((e) => {
                            t.enqueue(e);
                          });
                        if (u(r))
                          return r.bytes().then((e) => {
                            let r = n.Buffer.from(e);
                            t.enqueue(r);
                          });
                        if (l(r))
                          return r.arrayBuffer().then((e) => {
                            let i = n.Buffer.from(e, void 0, r.size);
                            t.enqueue(i);
                          });
                        let e = o(r);
                        t.enqueue(e);
                      }
                    },
                  },
            );
          }
          slice() {
            throw Error("Not implemented");
          }
        }
        t.PonyfillBlob = y;
      },
      55511: (e) => {
        "use strict";
        e.exports = require("crypto");
      },
      55591: (e) => {
        "use strict";
        e.exports = require("https");
      },
      57075: (e) => {
        "use strict";
        e.exports = require("node:stream");
      },
      57975: (e) => {
        "use strict";
        e.exports = require("node:util");
      },
      59570: () => {},
      60102: (e, t, r) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.PonyfillWritableStream = void 0);
        let n = r(78474),
          i = r(57075),
          s = r(80780),
          o = r(13753);
        class a {
          writable;
          constructor(e) {
            if (e instanceof i.Writable) this.writable = e;
            else if (e) {
              let t = new i.Writable({
                write(t, r, i) {
                  try {
                    let r = e.write?.(t, n);
                    r instanceof Promise
                      ? r.then(
                          () => {
                            i();
                          },
                          (e) => {
                            i(e);
                          },
                        )
                      : i();
                  } catch (e) {
                    i(e);
                  }
                },
                final(t) {
                  let r = e.close?.();
                  r instanceof Promise
                    ? r.then(
                        () => {
                          t();
                        },
                        (e) => {
                          t(e);
                        },
                      )
                    : t();
                },
              });
              this.writable = t;
              let r = new AbortController(),
                n = {
                  signal: r.signal,
                  error(e) {
                    t.destroy(e);
                  },
                };
              t.once("error", (e) => r.abort(e)),
                t.once("close", () => r.abort());
            } else this.writable = new i.Writable();
          }
          getWriter() {
            let e = this.writable;
            return {
              get closed() {
                return (0, n.once)(e, "close");
              },
              get desiredSize() {
                return e.writableLength;
              },
              get ready() {
                return (0, n.once)(e, "drain");
              },
              releaseLock() {},
              write(t) {
                let r = (0, o.fakePromise)();
                return null == t ? r : r.then(() => (0, o.safeWrite)(t, e));
              },
              close: () =>
                !e.errored && e.closed
                  ? (0, o.fakePromise)()
                  : e.errored
                    ? (0, s.fakeRejectPromise)(e.errored)
                    : (0, o.fakePromise)().then(() => (0, o.endStream)(e)),
              abort: (t) => (e.destroy(t), (0, n.once)(e, "close")),
            };
          }
          close() {
            return !this.writable.errored && this.writable.closed
              ? (0, o.fakePromise)()
              : this.writable.errored
                ? (0, s.fakeRejectPromise)(this.writable.errored)
                : (0, o.fakePromise)().then(() =>
                    (0, o.endStream)(this.writable),
                  );
          }
          abort(e) {
            return (
              this.writable.destroy(e), (0, n.once)(this.writable, "close")
            );
          }
          locked = !1;
        }
        t.PonyfillWritableStream = a;
      },
      60626: (e, t, r) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.PonyfillReadableStream = void 0);
        let n = r(4573),
          i = r(78474),
          s = r(57075),
          o = r(46466),
          a = r(80780),
          l = r(13753);
        function u(e, t) {
          let r = [],
            i = !1,
            s = !1;
          return {
            desiredSize: e,
            enqueue(e) {
              let i = "string" == typeof e ? n.Buffer.from(e) : e;
              s ? t.push(i) : r.push(i);
            },
            close() {
              r.length > 0 && this._flush(), t.push(null), (i = !0);
            },
            error(e) {
              r.length > 0 && this._flush(), t.destroy(e);
            },
            get _closed() {
              return i;
            },
            _flush() {
              if (((s = !0), r.length > 0)) {
                let e = r.length > 1 ? n.Buffer.concat(r) : r[0];
                t.push(e), (r = []);
              }
            },
          };
        }
        function c(e) {
          return e?.getReader != null;
        }
        class f {
          readable;
          constructor(e) {
            if (e instanceof f && null != e.readable)
              this.readable = e.readable;
            else if (e?.read != null) this.readable = e;
            else if (c(e)) this.readable = s.Readable.fromWeb(e);
            else {
              let t = !1,
                r = !1,
                n = (r) => {
                  if (!t) {
                    let n = u(r, this.readable);
                    return (
                      (t = !0),
                      (0, a.handleMaybePromise)(
                        () => e?.start?.(n),
                        () => (n._flush(), !n._closed),
                      )
                    );
                  }
                  return !0;
                },
                i = (t) =>
                  (0, a.handleMaybePromise)(
                    () => n(t),
                    (n) => {
                      if (!n) return;
                      let i = u(t, this.readable);
                      return (0, a.handleMaybePromise)(
                        () => e?.pull?.(i),
                        () => {
                          i._flush(), (r = !1);
                        },
                      );
                    },
                  );
              this.readable = new s.Readable({
                read(e) {
                  if (!r) return (r = !0), i(e);
                },
                destroy(t, r) {
                  if (e?.cancel)
                    try {
                      let n = e.cancel(t);
                      if (n?.then)
                        return n.then(
                          () => {
                            r(null);
                          },
                          (e) => {
                            r(e);
                          },
                        );
                    } catch (e) {
                      r(e);
                      return;
                    }
                  r(null);
                },
              });
            }
          }
          cancel(e) {
            return (
              this.readable.destroy(e), (0, i.once)(this.readable, "close")
            );
          }
          locked = !1;
          getReader(e) {
            let t = this.readable[Symbol.asyncIterator]();
            this.locked = !0;
            let r = this.readable;
            return {
              read: () => t.next(),
              releaseLock: () => {
                if (t.return) {
                  let e = t.return();
                  if (e.then)
                    return void e.then(() => {
                      this.locked = !1;
                    });
                }
                this.locked = !1;
              },
              cancel: (e) => {
                if (t.return) {
                  let r = t.return(e);
                  if (r.then)
                    return r.then(() => {
                      this.locked = !1;
                    });
                }
                return (this.locked = !1), (0, l.fakePromise)();
              },
              get closed() {
                return Promise.race([
                  (0, i.once)(r, "end"),
                  (0, i.once)(r, "error").then((e) => Promise.reject(e)),
                ]);
              },
            };
          }
          [Symbol.asyncIterator]() {
            let e = this.readable[Symbol.asyncIterator]();
            return {
              [Symbol.asyncIterator]() {
                return this;
              },
              next: () => e.next(),
              return: () => (
                this.readable.destroyed || this.readable.destroy(),
                e.return?.() || (0, l.fakePromise)({ done: !0, value: void 0 })
              ),
              throw: (t) => (
                this.readable.destroyed || this.readable.destroy(t),
                e.throw?.(t) || (0, l.fakePromise)({ done: !0, value: void 0 })
              ),
            };
          }
          tee() {
            throw Error("Not implemented");
          }
          async pipeToWriter(e) {
            try {
              for await (let t of this) await e.write(t);
              await e.close();
            } catch (t) {
              await e.abort(t);
            }
          }
          pipeTo(e) {
            var t;
            if (((t = e), t?.writable != null))
              return (0, o.pipeline)(this.readable, e.writable, { end: !0 });
            {
              let t = e.getWriter();
              return this.pipeToWriter(t);
            }
          }
          pipeThrough({ writable: e, readable: t }) {
            var r;
            return (
              this.pipeTo(e).catch((e) => {
                this.readable.destroy(e);
              }),
              (r = t),
              r?.readable != null &&
                (t.readable.once("error", (e) => this.readable.destroy(e)),
                t.readable.once("finish", () => this.readable.push(null)),
                t.readable.once("close", () => this.readable.push(null))),
              t
            );
          }
          static [Symbol.hasInstance](e) {
            return c(e);
          }
          static from(e) {
            return new f(s.Readable.from(e));
          }
          [Symbol.toStringTag] = "ReadableStream";
        }
        t.PonyfillReadableStream = f;
      },
      63033: (e) => {
        "use strict";
        e.exports = require("next/dist/server/app-render/work-unit-async-storage.external.js");
      },
      66715: (e, t, r) => {
        "use strict";
        r.r(t),
          r.d(t, {
            __addDisposableResource: () => L,
            __assign: () => s,
            __asyncDelegator: () => S,
            __asyncGenerator: () => w,
            __asyncValues: () => P,
            __await: () => x,
            __awaiter: () => p,
            __classPrivateFieldGet: () => A,
            __classPrivateFieldIn: () => D,
            __classPrivateFieldSet: () => N,
            __createBinding: () => m,
            __decorate: () => a,
            __disposeResources: () => F,
            __esDecorate: () => u,
            __exportStar: () => b,
            __extends: () => i,
            __generator: () => y,
            __importDefault: () => R,
            __importStar: () => C,
            __makeTemplateObject: () => O,
            __metadata: () => d,
            __param: () => l,
            __propKey: () => f,
            __read: () => _,
            __rest: () => o,
            __rewriteRelativeImportExtension: () => B,
            __runInitializers: () => c,
            __setFunctionName: () => h,
            __spread: () => v,
            __spreadArray: () => E,
            __spreadArrays: () => T,
            __values: () => g,
            default: () => U,
          });
        var n = function (e, t) {
          return (n =
            Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array &&
              function (e, t) {
                e.__proto__ = t;
              }) ||
            function (e, t) {
              for (var r in t)
                Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r]);
            })(e, t);
        };
        function i(e, t) {
          if ("function" != typeof t && null !== t)
            throw TypeError(
              "Class extends value " +
                String(t) +
                " is not a constructor or null",
            );
          function r() {
            this.constructor = e;
          }
          n(e, t),
            (e.prototype =
              null === t
                ? Object.create(t)
                : ((r.prototype = t.prototype), new r()));
        }
        var s = function () {
          return (s =
            Object.assign ||
            function (e) {
              for (var t, r = 1, n = arguments.length; r < n; r++)
                for (var i in (t = arguments[r]))
                  Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
              return e;
            }).apply(this, arguments);
        };
        function o(e, t) {
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
        }
        function a(e, t, r, n) {
          var i,
            s = arguments.length,
            o =
              s < 3
                ? t
                : null === n
                  ? (n = Object.getOwnPropertyDescriptor(t, r))
                  : n;
          if (
            "object" == typeof Reflect &&
            "function" == typeof Reflect.decorate
          )
            o = Reflect.decorate(e, t, r, n);
          else
            for (var a = e.length - 1; a >= 0; a--)
              (i = e[a]) &&
                (o = (s < 3 ? i(o) : s > 3 ? i(t, r, o) : i(t, r)) || o);
          return s > 3 && o && Object.defineProperty(t, r, o), o;
        }
        function l(e, t) {
          return function (r, n) {
            t(r, n, e);
          };
        }
        function u(e, t, r, n, i, s) {
          function o(e) {
            if (void 0 !== e && "function" != typeof e)
              throw TypeError("Function expected");
            return e;
          }
          for (
            var a,
              l = n.kind,
              u = "getter" === l ? "get" : "setter" === l ? "set" : "value",
              c = !t && e ? (n.static ? e : e.prototype) : null,
              f = t || (c ? Object.getOwnPropertyDescriptor(c, n.name) : {}),
              h = !1,
              d = r.length - 1;
            d >= 0;
            d--
          ) {
            var p = {};
            for (var y in n) p[y] = "access" === y ? {} : n[y];
            for (var y in n.access) p.access[y] = n.access[y];
            p.addInitializer = function (e) {
              if (h)
                throw TypeError(
                  "Cannot add initializers after decoration has completed",
                );
              s.push(o(e || null));
            };
            var m = (0, r[d])(
              "accessor" === l ? { get: f.get, set: f.set } : f[u],
              p,
            );
            if ("accessor" === l) {
              if (void 0 === m) continue;
              if (null === m || "object" != typeof m)
                throw TypeError("Object expected");
              (a = o(m.get)) && (f.get = a),
                (a = o(m.set)) && (f.set = a),
                (a = o(m.init)) && i.unshift(a);
            } else (a = o(m)) && ("field" === l ? i.unshift(a) : (f[u] = a));
          }
          c && Object.defineProperty(c, n.name, f), (h = !0);
        }
        function c(e, t, r) {
          for (var n = arguments.length > 2, i = 0; i < t.length; i++)
            r = n ? t[i].call(e, r) : t[i].call(e);
          return n ? r : void 0;
        }
        function f(e) {
          return "symbol" == typeof e ? e : "".concat(e);
        }
        function h(e, t, r) {
          return (
            "symbol" == typeof t &&
              (t = t.description ? "[".concat(t.description, "]") : ""),
            Object.defineProperty(e, "name", {
              configurable: !0,
              value: r ? "".concat(r, " ", t) : t,
            })
          );
        }
        function d(e, t) {
          if (
            "object" == typeof Reflect &&
            "function" == typeof Reflect.metadata
          )
            return Reflect.metadata(e, t);
        }
        function p(e, t, r, n) {
          return new (r || (r = Promise))(function (i, s) {
            function o(e) {
              try {
                l(n.next(e));
              } catch (e) {
                s(e);
              }
            }
            function a(e) {
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
                  ).then(o, a);
            }
            l((n = n.apply(e, t || [])).next());
          });
        }
        function y(e, t) {
          var r,
            n,
            i,
            s = {
              label: 0,
              sent: function () {
                if (1 & i[0]) throw i[1];
                return i[1];
              },
              trys: [],
              ops: [],
            },
            o = Object.create(
              ("function" == typeof Iterator ? Iterator : Object).prototype,
            );
          return (
            (o.next = a(0)),
            (o.throw = a(1)),
            (o.return = a(2)),
            "function" == typeof Symbol &&
              (o[Symbol.iterator] = function () {
                return this;
              }),
            o
          );
          function a(a) {
            return function (l) {
              var u = [a, l];
              if (r) throw TypeError("Generator is already executing.");
              for (; o && ((o = 0), u[0] && (s = 0)), s; )
                try {
                  if (
                    ((r = 1),
                    n &&
                      (i =
                        2 & u[0]
                          ? n.return
                          : u[0]
                            ? n.throw || ((i = n.return) && i.call(n), 0)
                            : n.next) &&
                      !(i = i.call(n, u[1])).done)
                  )
                    return i;
                  switch (((n = 0), i && (u = [2 & u[0], i.value]), u[0])) {
                    case 0:
                    case 1:
                      i = u;
                      break;
                    case 4:
                      return s.label++, { value: u[1], done: !1 };
                    case 5:
                      s.label++, (n = u[1]), (u = [0]);
                      continue;
                    case 7:
                      (u = s.ops.pop()), s.trys.pop();
                      continue;
                    default:
                      if (
                        !(i = (i = s.trys).length > 0 && i[i.length - 1]) &&
                        (6 === u[0] || 2 === u[0])
                      ) {
                        s = 0;
                        continue;
                      }
                      if (3 === u[0] && (!i || (u[1] > i[0] && u[1] < i[3]))) {
                        s.label = u[1];
                        break;
                      }
                      if (6 === u[0] && s.label < i[1]) {
                        (s.label = i[1]), (i = u);
                        break;
                      }
                      if (i && s.label < i[2]) {
                        (s.label = i[2]), s.ops.push(u);
                        break;
                      }
                      i[2] && s.ops.pop(), s.trys.pop();
                      continue;
                  }
                  u = t.call(e, s);
                } catch (e) {
                  (u = [6, e]), (n = 0);
                } finally {
                  r = i = 0;
                }
              if (5 & u[0]) throw u[1];
              return { value: u[0] ? u[1] : void 0, done: !0 };
            };
          }
        }
        var m = Object.create
          ? function (e, t, r, n) {
              void 0 === n && (n = r);
              var i = Object.getOwnPropertyDescriptor(t, r);
              (!i ||
                ("get" in i ? !t.__esModule : i.writable || i.configurable)) &&
                (i = {
                  enumerable: !0,
                  get: function () {
                    return t[r];
                  },
                }),
                Object.defineProperty(e, n, i);
            }
          : function (e, t, r, n) {
              void 0 === n && (n = r), (e[n] = t[r]);
            };
        function b(e, t) {
          for (var r in e)
            "default" === r ||
              Object.prototype.hasOwnProperty.call(t, r) ||
              m(t, e, r);
        }
        function g(e) {
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
        }
        function _(e, t) {
          var r = "function" == typeof Symbol && e[Symbol.iterator];
          if (!r) return e;
          var n,
            i,
            s = r.call(e),
            o = [];
          try {
            for (; (void 0 === t || t-- > 0) && !(n = s.next()).done; )
              o.push(n.value);
          } catch (e) {
            i = { error: e };
          } finally {
            try {
              n && !n.done && (r = s.return) && r.call(s);
            } finally {
              if (i) throw i.error;
            }
          }
          return o;
        }
        function v() {
          for (var e = [], t = 0; t < arguments.length; t++)
            e = e.concat(_(arguments[t]));
          return e;
        }
        function T() {
          for (var e = 0, t = 0, r = arguments.length; t < r; t++)
            e += arguments[t].length;
          for (var n = Array(e), i = 0, t = 0; t < r; t++)
            for (var s = arguments[t], o = 0, a = s.length; o < a; o++, i++)
              n[i] = s[o];
          return n;
        }
        function E(e, t, r) {
          if (r || 2 == arguments.length)
            for (var n, i = 0, s = t.length; i < s; i++)
              (!n && i in t) ||
                (n || (n = Array.prototype.slice.call(t, 0, i)), (n[i] = t[i]));
          return e.concat(n || Array.prototype.slice.call(t));
        }
        function x(e) {
          return this instanceof x ? ((this.v = e), this) : new x(e);
        }
        function w(e, t, r) {
          if (!Symbol.asyncIterator)
            throw TypeError("Symbol.asyncIterator is not defined.");
          var n,
            i = r.apply(e, t || []),
            s = [];
          return (
            (n = Object.create(
              ("function" == typeof AsyncIterator ? AsyncIterator : Object)
                .prototype,
            )),
            o("next"),
            o("throw"),
            o("return", function (e) {
              return function (t) {
                return Promise.resolve(t).then(e, u);
              };
            }),
            (n[Symbol.asyncIterator] = function () {
              return this;
            }),
            n
          );
          function o(e, t) {
            i[e] &&
              ((n[e] = function (t) {
                return new Promise(function (r, n) {
                  s.push([e, t, r, n]) > 1 || a(e, t);
                });
              }),
              t && (n[e] = t(n[e])));
          }
          function a(e, t) {
            try {
              var r;
              (r = i[e](t)).value instanceof x
                ? Promise.resolve(r.value.v).then(l, u)
                : c(s[0][2], r);
            } catch (e) {
              c(s[0][3], e);
            }
          }
          function l(e) {
            a("next", e);
          }
          function u(e) {
            a("throw", e);
          }
          function c(e, t) {
            e(t), s.shift(), s.length && a(s[0][0], s[0][1]);
          }
        }
        function S(e) {
          var t, r;
          return (
            (t = {}),
            n("next"),
            n("throw", function (e) {
              throw e;
            }),
            n("return"),
            (t[Symbol.iterator] = function () {
              return this;
            }),
            t
          );
          function n(n, i) {
            t[n] = e[n]
              ? function (t) {
                  return (r = !r)
                    ? { value: x(e[n](t)), done: !1 }
                    : i
                      ? i(t)
                      : t;
                }
              : i;
          }
        }
        function P(e) {
          if (!Symbol.asyncIterator)
            throw TypeError("Symbol.asyncIterator is not defined.");
          var t,
            r = e[Symbol.asyncIterator];
          return r
            ? r.call(e)
            : ((e = g(e)),
              (t = {}),
              n("next"),
              n("throw"),
              n("return"),
              (t[Symbol.asyncIterator] = function () {
                return this;
              }),
              t);
          function n(r) {
            t[r] =
              e[r] &&
              function (t) {
                return new Promise(function (n, i) {
                  var s, o, a;
                  (s = n),
                    (o = i),
                    (a = (t = e[r](t)).done),
                    Promise.resolve(t.value).then(function (e) {
                      s({ value: e, done: a });
                    }, o);
                });
              };
          }
        }
        function O(e, t) {
          return (
            Object.defineProperty
              ? Object.defineProperty(e, "raw", { value: t })
              : (e.raw = t),
            e
          );
        }
        var I = Object.create
            ? function (e, t) {
                Object.defineProperty(e, "default", {
                  enumerable: !0,
                  value: t,
                });
              }
            : function (e, t) {
                e.default = t;
              },
          k = function (e) {
            return (k =
              Object.getOwnPropertyNames ||
              function (e) {
                var t = [];
                for (var r in e)
                  Object.prototype.hasOwnProperty.call(e, r) &&
                    (t[t.length] = r);
                return t;
              })(e);
          };
        function C(e) {
          if (e && e.__esModule) return e;
          var t = {};
          if (null != e)
            for (var r = k(e), n = 0; n < r.length; n++)
              "default" !== r[n] && m(t, e, r[n]);
          return I(t, e), t;
        }
        function R(e) {
          return e && e.__esModule ? e : { default: e };
        }
        function A(e, t, r, n) {
          if ("a" === r && !n)
            throw TypeError("Private accessor was defined without a getter");
          if ("function" == typeof t ? e !== t || !n : !t.has(e))
            throw TypeError(
              "Cannot read private member from an object whose class did not declare it",
            );
          return "m" === r ? n : "a" === r ? n.call(e) : n ? n.value : t.get(e);
        }
        function N(e, t, r, n, i) {
          if ("m" === n) throw TypeError("Private method is not writable");
          if ("a" === n && !i)
            throw TypeError("Private accessor was defined without a setter");
          if ("function" == typeof t ? e !== t || !i : !t.has(e))
            throw TypeError(
              "Cannot write private member to an object whose class did not declare it",
            );
          return "a" === n ? i.call(e, r) : i ? (i.value = r) : t.set(e, r), r;
        }
        function D(e, t) {
          if (null === t || ("object" != typeof t && "function" != typeof t))
            throw TypeError("Cannot use 'in' operator on non-object");
          return "function" == typeof e ? t === e : e.has(t);
        }
        function L(e, t, r) {
          if (null != t) {
            var n, i;
            if ("object" != typeof t && "function" != typeof t)
              throw TypeError("Object expected.");
            if (r) {
              if (!Symbol.asyncDispose)
                throw TypeError("Symbol.asyncDispose is not defined.");
              n = t[Symbol.asyncDispose];
            }
            if (void 0 === n) {
              if (!Symbol.dispose)
                throw TypeError("Symbol.dispose is not defined.");
              (n = t[Symbol.dispose]), r && (i = n);
            }
            if ("function" != typeof n)
              throw TypeError("Object not disposable.");
            i &&
              (n = function () {
                try {
                  i.call(this);
                } catch (e) {
                  return Promise.reject(e);
                }
              }),
              e.stack.push({ value: t, dispose: n, async: r });
          } else r && e.stack.push({ async: !0 });
          return t;
        }
        var j =
          "function" == typeof SuppressedError
            ? SuppressedError
            : function (e, t, r) {
                var n = Error(r);
                return (
                  (n.name = "SuppressedError"),
                  (n.error = e),
                  (n.suppressed = t),
                  n
                );
              };
        function F(e) {
          function t(t) {
            (e.error = e.hasError
              ? new j(t, e.error, "An error was suppressed during disposal.")
              : t),
              (e.hasError = !0);
          }
          var r,
            n = 0;
          return (function i() {
            for (; (r = e.stack.pop()); )
              try {
                if (!r.async && 1 === n)
                  return (n = 0), e.stack.push(r), Promise.resolve().then(i);
                if (r.dispose) {
                  var s = r.dispose.call(r.value);
                  if (r.async)
                    return (
                      (n |= 2),
                      Promise.resolve(s).then(i, function (e) {
                        return t(e), i();
                      })
                    );
                } else n |= 1;
              } catch (e) {
                t(e);
              }
            if (1 === n)
              return e.hasError ? Promise.reject(e.error) : Promise.resolve();
            if (e.hasError) throw e.error;
          })();
        }
        function B(e, t) {
          return "string" == typeof e && /^\.\.?\//.test(e)
            ? e.replace(
                /\.(tsx)$|((?:\.d)?)((?:\.[^./]+?)?)\.([cm]?)ts$/i,
                function (e, r, n, i, s) {
                  return r
                    ? t
                      ? ".jsx"
                      : ".js"
                    : !n || (i && s)
                      ? n + i + "." + s.toLowerCase() + "js"
                      : e;
                },
              )
            : e;
        }
        let U = {
          __extends: i,
          __assign: s,
          __rest: o,
          __decorate: a,
          __param: l,
          __esDecorate: u,
          __runInitializers: c,
          __propKey: f,
          __setFunctionName: h,
          __metadata: d,
          __awaiter: p,
          __generator: y,
          __createBinding: m,
          __exportStar: b,
          __values: g,
          __read: _,
          __spread: v,
          __spreadArrays: T,
          __spreadArray: E,
          __await: x,
          __asyncGenerator: w,
          __asyncDelegator: S,
          __asyncValues: P,
          __makeTemplateObject: O,
          __importStar: C,
          __importDefault: R,
          __classPrivateFieldGet: A,
          __classPrivateFieldSet: N,
          __classPrivateFieldIn: D,
          __addDisposableResource: L,
          __disposeResources: F,
          __rewriteRelativeImportExtension: B,
        };
      },
      66865: (e, t, r) => {
        "use strict";
        let n = r(78474).EventEmitter,
          i = r(57975).inherits,
          s = r(8331),
          o = r(10534),
          a = Buffer.from("\r\n\r\n"),
          l = /\r\n/g,
          u = /^([^:]+):[ \t]?([\x00-\xFF]+)?$/;
        function c(e) {
          n.call(this), (e = e || {});
          let t = this;
          (this.nread = 0),
            (this.maxed = !1),
            (this.npairs = 0),
            (this.maxHeaderPairs = s(e, "maxHeaderPairs", 2e3)),
            (this.maxHeaderSize = s(e, "maxHeaderSize", 81920)),
            (this.buffer = ""),
            (this.header = {}),
            (this.finished = !1),
            (this.ss = new o(a)),
            this.ss.on("info", function (e, r, n, i) {
              r &&
                !t.maxed &&
                (t.nread + i - n >= t.maxHeaderSize
                  ? ((i = t.maxHeaderSize - t.nread + n),
                    (t.nread = t.maxHeaderSize),
                    (t.maxed = !0))
                  : (t.nread += i - n),
                (t.buffer += r.toString("binary", n, i))),
                e && t._finish();
            });
        }
        i(c, n),
          (c.prototype.push = function (e) {
            let t = this.ss.push(e);
            if (this.finished) return t;
          }),
          (c.prototype.reset = function () {
            (this.finished = !1),
              (this.buffer = ""),
              (this.header = {}),
              this.ss.reset();
          }),
          (c.prototype._finish = function () {
            this.buffer && this._parseHeader(),
              (this.ss.matches = this.ss.maxMatches);
            let e = this.header;
            (this.header = {}),
              (this.buffer = ""),
              (this.finished = !0),
              (this.nread = this.npairs = 0),
              (this.maxed = !1),
              this.emit("header", e);
          }),
          (c.prototype._parseHeader = function () {
            let e, t;
            if (this.npairs === this.maxHeaderPairs) return;
            let r = this.buffer.split(l),
              n = r.length;
            for (var i = 0; i < n; ++i) {
              if (0 === r[i].length) continue;
              if (("	" === r[i][0] || " " === r[i][0]) && t) {
                this.header[t][this.header[t].length - 1] += r[i];
                continue;
              }
              let n = r[i].indexOf(":");
              if (-1 === n || 0 === n) return;
              if (
                ((t = (e = u.exec(r[i]))[1].toLowerCase()),
                (this.header[t] = this.header[t] || []),
                this.header[t].push(e[2] || ""),
                ++this.npairs === this.maxHeaderPairs)
              )
                break;
            }
          }),
          (e.exports = c);
      },
      66909: (e, t, r) => {
        let n = r(44032),
          i = r(4330),
          s = n();
        if (!i())
          try {
            globalThis.libcurl = globalThis.libcurl || r(88084)("node-libcurl");
          } catch (e) {}
        (e.exports.fetch = s.fetch),
          (e.exports.Headers = s.Headers),
          (e.exports.Request = s.Request),
          (e.exports.Response = s.Response),
          (e.exports.FormData = s.FormData),
          (e.exports.ReadableStream = s.ReadableStream),
          (e.exports.WritableStream = s.WritableStream),
          (e.exports.TransformStream = s.TransformStream),
          (e.exports.CompressionStream = s.CompressionStream),
          (e.exports.DecompressionStream = s.DecompressionStream),
          (e.exports.TextDecoderStream = s.TextDecoderStream),
          (e.exports.TextEncoderStream = s.TextEncoderStream),
          (e.exports.Blob = s.Blob),
          (e.exports.File = s.File),
          (e.exports.crypto = s.crypto),
          (e.exports.btoa = s.btoa),
          (e.exports.TextEncoder = s.TextEncoder),
          (e.exports.TextDecoder = s.TextDecoder),
          (e.exports.URLPattern = s.URLPattern),
          (e.exports.URL = s.URL),
          (e.exports.URLSearchParams = s.URLSearchParams),
          (t.createFetch = n);
      },
      70263: (e, t, r) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.PonyfillDecompressionStream = void 0);
        let n = r(38522),
          i = r(32296);
        class s extends i.PonyfillTransformStream {
          static supportedFormats = globalThis.process?.version?.startsWith(
            "v2",
          )
            ? ["gzip", "deflate", "br"]
            : ["gzip", "deflate", "deflate-raw", "br"];
          constructor(e) {
            switch (e) {
              case "x-gzip":
              case "gzip":
                super((0, n.createGunzip)());
                break;
              case "x-deflate":
              case "deflate":
                super((0, n.createInflate)());
                break;
              case "deflate-raw":
                super((0, n.createInflateRaw)());
                break;
              case "br":
                super((0, n.createBrotliDecompress)());
                break;
              default:
                throw TypeError(`Unsupported compression format: '${e}'`);
            }
          }
        }
        t.PonyfillDecompressionStream = s;
      },
      71772: (e, t, r) => {
        "use strict";
        let n;
        r.r(t),
          r.d(t, {
            patchFetch: () => na,
            routeModule: () => nn,
            serverHooks: () => no,
            workAsyncStorage: () => ni,
            workUnitAsyncStorage: () => ns,
          });
        var i,
          s,
          o = {};
        r.r(o),
          r.d(o, {
            DELETE: () => ne,
            GET: () => r7,
            HEAD: () => nt,
            OPTIONS: () => nr,
            PATCH: () => r9,
            POST: () => r8,
            PUT: () => r6,
          });
        var a = r(94168),
          l = r(51293),
          u = r(64588),
          c = r(63033),
          f = r(29021),
          h = r(33873),
          d = r(77719);
        let p = require("graphql"),
          y = {};
        function m(e, t, r, n) {
          let i = (function (e) {
            let t = (function (e) {
              let t = e.loc;
              if (!t) return;
              let r = [],
                n = t.startToken.prev;
              for (
                ;
                null != n &&
                n.kind === p.TokenKind.COMMENT &&
                null != n.next &&
                null != n.prev &&
                n.line + 1 === n.next.line &&
                n.line !== n.prev.line;

              ) {
                let e = String(n.value);
                r.push(e), (n = n.prev);
              }
              return r.length > 0 ? r.reverse().join("\n") : void 0;
            })(e);
            if (void 0 !== t)
              return (function (e) {
                let t = e.split(/\r\n|[\n\r]/g),
                  r = (function (e) {
                    let t = null;
                    for (let r = 1; r < e.length; r++) {
                      let n = e[r],
                        i = S(n);
                      if (
                        i !== n.length &&
                        (null === t || i < t) &&
                        0 === (t = i)
                      )
                        break;
                    }
                    return null === t ? 0 : t;
                  })(t);
                if (0 !== r)
                  for (let e = 1; e < t.length; e++) t[e] = t[e].slice(r);
                for (; t.length > 0 && P(t[0]); ) t.shift();
                for (; t.length > 0 && P(t[t.length - 1]); ) t.pop();
                return t.join("\n");
              })(`
${t}`);
          })(e);
          if ("string" != typeof i || 0 === i.length) return;
          let s = [t];
          r && (s.push(r), n && s.push(n));
          let o = s.join(".");
          y[o] || (y[o] = []), y[o].push(i);
        }
        function b(e) {
          return "\n# " + e.replace(/\n/g, "\n# ");
        }
        function g(e, t) {
          return e ? e.filter((e) => e).join(t || "") : "";
        }
        function _(e) {
          return e?.some((e) => e.includes("\n")) ?? !1;
        }
        function v(e) {
          return e && `  ${e.replace(/\n/g, "\n  ")}`;
        }
        function T(e) {
          return e && 0 !== e.length
            ? `{
${v(g(e, "\n"))}
}`
            : "";
        }
        function E(e, t, r) {
          return t ? e + t + (r || "") : "";
        }
        let x = {
            Name: { leave: (e) => e.value },
            Variable: { leave: (e) => "$" + e.name },
            Document: { leave: (e) => g(e.definitions, "\n\n") },
            OperationDefinition: {
              leave: (e) => {
                let t = E("(", g(e.variableDefinitions, ", "), ")");
                return (
                  g([e.operation, g([e.name, t]), g(e.directives, " ")], " ") +
                  " " +
                  e.selectionSet
                );
              },
            },
            VariableDefinition: {
              leave: ({
                variable: e,
                type: t,
                defaultValue: r,
                directives: n,
              }) => e + ": " + t + E(" = ", r) + E(" ", g(n, " ")),
            },
            SelectionSet: { leave: ({ selections: e }) => T(e) },
            Field: {
              leave({
                alias: e,
                name: t,
                arguments: r,
                directives: n,
                selectionSet: i,
              }) {
                let s = E("", e, ": ") + t,
                  o = s + E("(", g(r, ", "), ")");
                return (
                  o.length > 80 && (o = s + E("(\n", v(g(r, "\n")), "\n)")),
                  g([o, g(n, " "), i], " ")
                );
              },
            },
            Argument: { leave: ({ name: e, value: t }) => e + ": " + t },
            FragmentSpread: {
              leave: ({ name: e, directives: t }) =>
                "..." + e + E(" ", g(t, " ")),
            },
            InlineFragment: {
              leave: ({ typeCondition: e, directives: t, selectionSet: r }) =>
                g(["...", E("on ", e), g(t, " "), r], " "),
            },
            FragmentDefinition: {
              leave: ({
                name: e,
                typeCondition: t,
                variableDefinitions: r,
                directives: n,
                selectionSet: i,
              }) =>
                `fragment ${e}${E("(", g(r, ", "), ")")} on ${t} ${E("", g(n, " "), " ")}` +
                i,
            },
            IntValue: { leave: ({ value: e }) => e },
            FloatValue: { leave: ({ value: e }) => e },
            StringValue: {
              leave: ({ value: e, block: t }) =>
                t
                  ? (function (e, t = !1) {
                      let r = e.replace(/\\/g, "\\\\").replace(/"""/g, '\\"""');
                      return (" " === e[0] || "	" === e[0]) &&
                        -1 === e.indexOf("\n")
                        ? `"""${r.replace(/"$/, '"\n')}"""`
                        : `"""
${t ? r : v(r)}
"""`;
                    })(e)
                  : JSON.stringify(e),
            },
            BooleanValue: { leave: ({ value: e }) => (e ? "true" : "false") },
            NullValue: { leave: () => "null" },
            EnumValue: { leave: ({ value: e }) => e },
            ListValue: { leave: ({ values: e }) => "[" + g(e, ", ") + "]" },
            ObjectValue: { leave: ({ fields: e }) => "{" + g(e, ", ") + "}" },
            ObjectField: { leave: ({ name: e, value: t }) => e + ": " + t },
            Directive: {
              leave: ({ name: e, arguments: t }) =>
                "@" + e + E("(", g(t, ", "), ")"),
            },
            NamedType: { leave: ({ name: e }) => e },
            ListType: { leave: ({ type: e }) => "[" + e + "]" },
            NonNullType: { leave: ({ type: e }) => e + "!" },
            SchemaDefinition: {
              leave: ({ directives: e, operationTypes: t }) =>
                g(["schema", g(e, " "), T(t)], " "),
            },
            OperationTypeDefinition: {
              leave: ({ operation: e, type: t }) => e + ": " + t,
            },
            ScalarTypeDefinition: {
              leave: ({ name: e, directives: t }) =>
                g(["scalar", e, g(t, " ")], " "),
            },
            ObjectTypeDefinition: {
              leave: ({ name: e, interfaces: t, directives: r, fields: n }) =>
                g(
                  ["type", e, E("implements ", g(t, " & ")), g(r, " "), T(n)],
                  " ",
                ),
            },
            FieldDefinition: {
              leave: ({ name: e, arguments: t, type: r, directives: n }) =>
                e +
                (_(t)
                  ? E("(\n", v(g(t, "\n")), "\n)")
                  : E("(", g(t, ", "), ")")) +
                ": " +
                r +
                E(" ", g(n, " ")),
            },
            InputValueDefinition: {
              leave: ({ name: e, type: t, defaultValue: r, directives: n }) =>
                g([e + ": " + t, E("= ", r), g(n, " ")], " "),
            },
            InterfaceTypeDefinition: {
              leave: ({ name: e, interfaces: t, directives: r, fields: n }) =>
                g(
                  [
                    "interface",
                    e,
                    E("implements ", g(t, " & ")),
                    g(r, " "),
                    T(n),
                  ],
                  " ",
                ),
            },
            UnionTypeDefinition: {
              leave: ({ name: e, directives: t, types: r }) =>
                g(["union", e, g(t, " "), E("= ", g(r, " | "))], " "),
            },
            EnumTypeDefinition: {
              leave: ({ name: e, directives: t, values: r }) =>
                g(["enum", e, g(t, " "), T(r)], " "),
            },
            EnumValueDefinition: {
              leave: ({ name: e, directives: t }) => g([e, g(t, " ")], " "),
            },
            InputObjectTypeDefinition: {
              leave: ({ name: e, directives: t, fields: r }) =>
                g(["input", e, g(t, " "), T(r)], " "),
            },
            DirectiveDefinition: {
              leave: ({ name: e, arguments: t, repeatable: r, locations: n }) =>
                "directive @" +
                e +
                (_(t)
                  ? E("(\n", v(g(t, "\n")), "\n)")
                  : E("(", g(t, ", "), ")")) +
                (r ? " repeatable" : "") +
                " on " +
                g(n, " | "),
            },
            SchemaExtension: {
              leave: ({ directives: e, operationTypes: t }) =>
                g(["extend schema", g(e, " "), T(t)], " "),
            },
            ScalarTypeExtension: {
              leave: ({ name: e, directives: t }) =>
                g(["extend scalar", e, g(t, " ")], " "),
            },
            ObjectTypeExtension: {
              leave: ({ name: e, interfaces: t, directives: r, fields: n }) =>
                g(
                  [
                    "extend type",
                    e,
                    E("implements ", g(t, " & ")),
                    g(r, " "),
                    T(n),
                  ],
                  " ",
                ),
            },
            InterfaceTypeExtension: {
              leave: ({ name: e, interfaces: t, directives: r, fields: n }) =>
                g(
                  [
                    "extend interface",
                    e,
                    E("implements ", g(t, " & ")),
                    g(r, " "),
                    T(n),
                  ],
                  " ",
                ),
            },
            UnionTypeExtension: {
              leave: ({ name: e, directives: t, types: r }) =>
                g(["extend union", e, g(t, " "), E("= ", g(r, " | "))], " "),
            },
            EnumTypeExtension: {
              leave: ({ name: e, directives: t, values: r }) =>
                g(["extend enum", e, g(t, " "), T(r)], " "),
            },
            InputObjectTypeExtension: {
              leave: ({ name: e, directives: t, fields: r }) =>
                g(["extend input", e, g(t, " "), T(r)], " "),
            },
          },
          w = Object.keys(x).reduce((e, t) => {
            var r;
            return {
              ...e,
              [t]: {
                leave:
                  ((r = x[t].leave),
                  (e, t, n, i, s) => {
                    let o = [],
                      a = i.reduce(
                        (e, t) => (
                          ["fields", "arguments", "values"].includes(t) &&
                            e.name &&
                            o.push(e.name.value),
                          e[t]
                        ),
                        s[0],
                      ),
                      l = [...o, a?.name?.value].filter(Boolean).join("."),
                      u = [];
                    return (
                      e.kind.includes("Definition") && y[l] && u.push(...y[l]),
                      g([...u.map(b), e.description, r(e, t, n, i, s)], "\n")
                    );
                  }),
              },
            };
          }, {});
        function S(e) {
          let t = 0;
          for (; t < e.length && (" " === e[t] || "	" === e[t]); ) t++;
          return t;
        }
        function P(e) {
          return S(e) === e.length;
        }
        function O(e) {
          return I(e, []);
        }
        function I(e, t) {
          switch (typeof e) {
            case "string":
              return JSON.stringify(e);
            case "function":
              return e.name ? `[function ${e.name}]` : "[function]";
            case "object":
              return (function (e, t) {
                if (null === e) return "null";
                if (e instanceof Error)
                  return "AggregateError" === e.name
                    ? k(e) + "\n" + C(e.errors, t)
                    : k(e);
                if (t.includes(e)) return "[Circular]";
                let r = [...t, e];
                if ("function" == typeof e.toJSON) {
                  let t = e.toJSON();
                  if (t !== e) return "string" == typeof t ? t : I(t, r);
                } else if (Array.isArray(e)) return C(e, r);
                var n = e,
                  i = r;
                let s = Object.entries(n);
                return 0 === s.length
                  ? "{}"
                  : i.length > 3
                    ? "[" +
                      (function (e) {
                        let t = Object.prototype.toString
                          .call(e)
                          .replace(/^\[object /, "")
                          .replace(/]$/, "");
                        if (
                          "Object" === t &&
                          "function" == typeof e.constructor
                        ) {
                          let t = e.constructor.name;
                          if ("string" == typeof t && "" !== t) return t;
                        }
                        return t;
                      })(n) +
                      "]"
                    : "{ " +
                      s.map(([e, t]) => e + ": " + I(t, i)).join(", ") +
                      " }";
              })(e, t);
            default:
              return String(e);
          }
        }
        function k(e) {
          return (e.name = "GraphQLError"), e.toString();
        }
        function C(e, t) {
          if (0 === e.length) return "[]";
          if (t.length > 3) return "[Array]";
          let r = e.length,
            n = [];
          for (let i = 0; i < r; ++i) n.push(I(e[i], t));
          return "[" + n.join(", ") + "]";
        }
        function R(e) {
          if ((0, p.isNonNullType)(e)) {
            let t = R(e.ofType);
            if (t.kind === p.Kind.NON_NULL_TYPE)
              throw Error(
                `Invalid type node ${O(e)}. Inner type of non-null type cannot be a non-null type.`,
              );
            return { kind: p.Kind.NON_NULL_TYPE, type: t };
          }
          return (0, p.isListType)(e)
            ? { kind: p.Kind.LIST_TYPE, type: R(e.ofType) }
            : {
                kind: p.Kind.NAMED_TYPE,
                name: { kind: p.Kind.NAME, value: e.name },
              };
        }
        function A(e) {
          if (null === e) return { kind: p.Kind.NULL };
          if (void 0 === e) return null;
          if (Array.isArray(e)) {
            let t = [];
            for (let r of e) {
              let e = A(r);
              null != e && t.push(e);
            }
            return { kind: p.Kind.LIST, values: t };
          }
          if ("object" == typeof e) {
            if (e?.toJSON) return A(e.toJSON());
            let t = [];
            for (let r in e) {
              let n = A(e[r]);
              n &&
                t.push({
                  kind: p.Kind.OBJECT_FIELD,
                  name: { kind: p.Kind.NAME, value: r },
                  value: n,
                });
            }
            return { kind: p.Kind.OBJECT, fields: t };
          }
          if ("boolean" == typeof e) return { kind: p.Kind.BOOLEAN, value: e };
          if ("bigint" == typeof e)
            return { kind: p.Kind.INT, value: String(e) };
          if ("number" == typeof e && isFinite(e)) {
            let t = String(e);
            return N.test(t)
              ? { kind: p.Kind.INT, value: t }
              : { kind: p.Kind.FLOAT, value: t };
          }
          if ("string" == typeof e) return { kind: p.Kind.STRING, value: e };
          throw TypeError(`Cannot convert value to AST: ${e}.`);
        }
        let N = /^-?(?:0|[1-9][0-9]*)$/,
          D = Symbol.for("@whatwg-node/promise-helpers/FakePromise");
        function L(e) {
          return e?.then != null;
        }
        function j(e, t, r, n) {
          let i = F().then(e).then(t, r);
          return n && (i = i.finally(n)), G(i);
        }
        function F(e) {
          var t;
          return e && (t = e) && t.then && t.catch && t.finally
            ? e
            : L(e)
              ? {
                  then: (t, r) => F(e.then(t, r)),
                  catch: (t) => F(e.then((e) => e, t)),
                  finally: (t) => {
                    var r, n;
                    return F(
                      t
                        ? ((r = e),
                          (n = t),
                          "finally" in r
                            ? r.finally(n)
                            : r.then(
                                (e) => {
                                  let t = n();
                                  return L(t) ? t.then(() => e) : e;
                                },
                                (e) => {
                                  let t = n();
                                  if (L(t))
                                    return t.then(() => {
                                      throw e;
                                    });
                                  throw e;
                                },
                              ))
                        : e,
                    );
                  },
                  [Symbol.toStringTag]: "Promise",
                }
              : {
                  then(t) {
                    if (t)
                      try {
                        return F(t(e));
                      } catch (e) {
                        return M(e);
                      }
                    return this;
                  },
                  catch() {
                    return this;
                  },
                  finally(t) {
                    if (t)
                      try {
                        return F(t()).then(
                          () => e,
                          () => e,
                        );
                      } catch (e) {
                        return M(e);
                      }
                    return this;
                  },
                  [Symbol.toStringTag]: "Promise",
                  __fakePromiseValue: e,
                  [D]: "resolved",
                };
        }
        function B() {
          let e, t;
          return Promise.withResolvers
            ? Promise.withResolvers()
            : {
                promise: new Promise(function (r, n) {
                  (e = r), (t = n);
                }),
                get resolve() {
                  return e;
                },
                get reject() {
                  return t;
                },
              };
        }
        function U(e, t, r) {
          if (e?.length === 0) return;
          let n = e[Symbol.iterator](),
            i = 0;
          return (function e() {
            let { done: s, value: o } = n.next();
            if (s) return;
            let a = !1;
            function l() {
              a = !0;
            }
            return j(
              function () {
                return t(o, l, i++);
              },
              function (t) {
                if ((t && r?.push(t), !a)) return e();
              },
            );
          })();
        }
        function M(e) {
          return {
            then(t, r) {
              if (r)
                try {
                  return F(r(e));
                } catch (e) {
                  return M(e);
                }
              return this;
            },
            catch(t) {
              if (t)
                try {
                  return F(t(e));
                } catch (e) {
                  return M(e);
                }
              return this;
            },
            finally(e) {
              if (e)
                try {
                  e();
                } catch (e) {
                  return M(e);
                }
              return this;
            },
            __fakeRejectError: e,
            [Symbol.toStringTag]: "Promise",
            [D]: "rejected",
          };
        }
        function q(e, t, r, n) {
          let i, s, o, a;
          if (
            (Symbol.asyncIterator in e && (e = e[Symbol.asyncIterator]()), n)
          ) {
            let e;
            o = (t) =>
              (e ||= j(
                n,
                () => t,
                () => t,
              ));
          }
          function l(e) {
            return e.done
              ? o
                ? o(e)
                : e
              : j(
                  () => e.value,
                  (e) => j(() => t(e), $, s),
                );
          }
          if (
            ("function" == typeof e.return &&
              ((i = e.return),
              (s = (t) => {
                let r = () => {
                  throw t;
                };
                return i.call(e).then(r, r);
              })),
            r)
          ) {
            let e;
            a = (t) =>
              (e ||= j(
                () => t,
                (e) => j(() => r(e), $, s),
              ));
          }
          return {
            next: () => e.next().then(l, a),
            return() {
              let t = i ? i.call(e).then(l, a) : F({ value: void 0, done: !0 });
              return o ? t.then(o) : t;
            },
            throw: (t) =>
              "function" == typeof e.throw
                ? e.throw(t).then(l, a)
                : s
                  ? s(t)
                  : M(t),
            [Symbol.asyncIterator]() {
              return this;
            },
          };
        }
        function $(e) {
          return { value: e, done: !1 };
        }
        function G(e) {
          if (e?.[D] === "resolved") return e.__fakePromiseValue;
          if (e?.[D] === "rejected") throw e.__fakeRejectError;
          return e;
        }
        function H(e) {
          return null != e && "object" == typeof e && Symbol.iterator in e;
        }
        function K(e) {
          return "object" == typeof e && null !== e;
        }
        function V(e, t) {
          return Object.prototype.hasOwnProperty.call(e, t);
        }
        function Q(e, t) {
          if ((0, p.isNonNullType)(t)) {
            let r = Q(e, t.ofType);
            return r?.kind === p.Kind.NULL ? null : r;
          }
          if (null === e) return { kind: p.Kind.NULL };
          if (void 0 === e) return null;
          if ((0, p.isListType)(t)) {
            let r = t.ofType;
            if (H(e)) {
              let t = [];
              for (let n of e) {
                let e = Q(n, r);
                null != e && t.push(e);
              }
              return { kind: p.Kind.LIST, values: t };
            }
            return Q(e, r);
          }
          if ((0, p.isInputObjectType)(t)) {
            if (!K(e)) return null;
            let r = [];
            for (let n of Object.values(t.getFields())) {
              let t = Q(e[n.name], n.type);
              t &&
                r.push({
                  kind: p.Kind.OBJECT_FIELD,
                  name: { kind: p.Kind.NAME, value: n.name },
                  value: t,
                });
            }
            return { kind: p.Kind.OBJECT, fields: r };
          }
          if ((0, p.isLeafType)(t)) {
            let r = t.serialize(e);
            return null == r
              ? null
              : (0, p.isEnumType)(t)
                ? { kind: p.Kind.ENUM, value: r }
                : "ID" === t.name && "string" == typeof r && W.test(r)
                  ? { kind: p.Kind.INT, value: r }
                  : A(r);
          }
          console.assert(!1, "Unexpected input type: " + O(t));
        }
        let W = /^-?(?:0|[1-9][0-9]*)$/;
        function z(e) {
          return e.astNode?.description
            ? { ...e.astNode.description, block: !0 }
            : e.description
              ? { kind: p.Kind.STRING, value: e.description, block: !0 }
              : void 0;
        }
        let Y = [
          "message",
          "locations",
          "path",
          "nodes",
          "source",
          "positions",
          "originalError",
          "name",
          "stack",
          "extensions",
        ];
        function J(e, t) {
          var r;
          return (t?.originalError &&
            !(t.originalError instanceof Error) &&
            null != (r = t.originalError) &&
            "object" == typeof r &&
            Object.keys(r).every((e) => Y.includes(e)) &&
            (t.originalError = J(t.originalError.message, t.originalError)),
          p.versionInfo.major >= 17)
            ? new p.GraphQLError(e, t)
            : new p.GraphQLError(
                e,
                t?.nodes,
                t?.source,
                t?.positions,
                t?.path,
                t?.originalError,
                t?.extensions,
              );
        }
        function X(e, t, r = {}) {
          let n = {},
            i = (t.arguments ?? []).reduce(
              (e, t) => ({ ...e, [t.name.value]: t }),
              {},
            );
          for (let { name: s, type: o, defaultValue: a } of e.args) {
            let e = i[s];
            if (!e) {
              if (void 0 !== a) n[s] = a;
              else if ((0, p.isNonNullType)(o))
                throw J(
                  `Argument "${s}" of required type "${O(o)}" was not provided.`,
                  { nodes: [t] },
                );
              continue;
            }
            let l = e.value,
              u = l.kind === p.Kind.NULL;
            if (l.kind === p.Kind.VARIABLE) {
              let e = l.name.value;
              if (null == r || !V(r, e)) {
                if (void 0 !== a) n[s] = a;
                else if ((0, p.isNonNullType)(o))
                  throw J(
                    `Argument "${s}" of required type "${O(o)}" was provided the variable "$${e}" which was not provided a runtime value.`,
                    { nodes: [l] },
                  );
                continue;
              }
              u = null == r[e];
            }
            if (u && (0, p.isNonNullType)(o))
              throw J(
                `Argument "${s}" of non-null type "${O(o)}" must not be null.`,
                { nodes: [l] },
              );
            let c = (0, p.valueFromAST)(l, o, r);
            if (void 0 === c)
              throw J(`Argument "${s}" has invalid value ${(0, p.print)(l)}.`, {
                nodes: [l],
              });
            n[s] = c;
          }
          return n;
        }
        function Z(e) {
          let t = new WeakMap();
          return function (r) {
            let n = t.get(r);
            if (void 0 === n) {
              let n = e(r);
              return t.set(r, n), n;
            }
            return n;
          };
        }
        function ee(e, t = ["directives"]) {
          return Object.entries(
            (function (e, t, r = ["directives"]) {
              let n = {};
              if (e.extensions) {
                let t = e.extensions;
                for (let e of r) t = t?.[e];
                if (null != t)
                  for (let e in t) {
                    let r = t[e];
                    if (Array.isArray(r))
                      for (let t of r) {
                        let r = n[e];
                        r || ((r = []), (n[e] = r)), r.push(t);
                      }
                    else {
                      let t = n[e];
                      t || ((t = []), (n[e] = t)), t.push(r);
                    }
                  }
              }
              let i = Z((e) => JSON.stringify(e)),
                s = [];
              for (let r of (e.astNode && s.push(e.astNode),
              e.extensionASTNodes && s.push(...e.extensionASTNodes),
              s))
                if (r.directives?.length)
                  for (let e of r.directives) {
                    let r = e.name.value,
                      o = n[r];
                    o || ((o = []), (n[r] = o));
                    let a = t?.getDirective(r),
                      l = {};
                    if ((a && (l = X(a, e)), e.arguments))
                      for (let t of e.arguments) {
                        let e = t.name.value;
                        if (null == l[e]) {
                          let r = a?.args.find((t) => t.name === e);
                          r && (l[e] = (0, p.valueFromAST)(t.value, r.type));
                        }
                        null == l[e] &&
                          (l[e] = (0, p.valueFromASTUntyped)(t.value));
                      }
                    if (s.length > 0 && o.length > 0) {
                      let e = i(l);
                      if (o.some((t) => i(t) === e)) continue;
                    }
                    o.push(l);
                  }
              return n;
            })(e, void 0, t),
          )
            .map(([e, t]) => t?.map((t) => ({ name: e, args: t })))
            .flat(1 / 0)
            .filter(Boolean);
        }
        let et = (e) => (Array.isArray(e) ? e : e ? [e] : []);
        function er(e) {
          let t;
          return (
            "alias" in e && (t = e.alias?.value),
            null == t && "name" in e && (t = e.name?.value),
            null == t && (t = e.kind),
            t
          );
        }
        function en(e, t, r) {
          let n = er(e),
            i = er(t);
          return "function" == typeof r
            ? r(n, i)
            : String(n) < String(i)
              ? -1
              : +(String(n) > String(i));
        }
        function ei(e) {
          return null != e;
        }
        Z(function (e) {
          return new Set([...es(e)].map((e) => e.name));
        });
        let es = Z(function (e) {
            return new Set(eo(e).values());
          }),
          eo = Z(function (e) {
            let t = new Map(),
              r = e.getQueryType();
            r && t.set("query", r);
            let n = e.getMutationType();
            n && t.set("mutation", n);
            let i = e.getSubscriptionType();
            return i && t.set("subscription", i), t;
          });
        function ea(e, t, r) {
          let n,
            i = [],
            s = ee(e, r);
          null != s && (n = ef(t, s));
          let o = null,
            a = null;
          (null != n &&
            ((i = n.filter(
              (e) =>
                "deprecated" !== e.name.value && "specifiedBy" !== e.name.value,
            )),
            null != e.deprecationReason &&
              (o = n.filter((e) => "deprecated" === e.name.value)?.[0]),
            (null != e.specifiedByUrl || null != e.specifiedByURL) &&
              (a = n.filter((e) => "specifiedBy" === e.name.value)?.[0])),
          null != e.deprecationReason &&
            null == o &&
            (o = ec(
              "deprecated",
              { reason: e.deprecationReason },
              p.GraphQLDeprecatedDirective,
            )),
          null != e.specifiedByUrl ||
            (null != e.specifiedByURL && null == a)) &&
            (a = ec("specifiedBy", {
              url: e.specifiedByUrl || e.specifiedByURL,
            }));
          return null != o && i.push(o), null != a && i.push(a), i;
        }
        function el(e, t, r) {
          return {
            kind: p.Kind.INPUT_VALUE_DEFINITION,
            description: z(e),
            name: { kind: p.Kind.NAME, value: e.name },
            type: R(e.type),
            defaultValue:
              void 0 !== e.defaultValue
                ? (Q(e.defaultValue, e.type) ?? void 0)
                : void 0,
            directives: ea(e, t, r),
          };
        }
        function eu(e, t, r) {
          return {
            kind: p.Kind.FIELD_DEFINITION,
            description: z(e),
            name: { kind: p.Kind.NAME, value: e.name },
            arguments: e.args.map((e) => el(e, t, r)),
            type: R(e.type),
            directives: ea(e, t, r),
          };
        }
        function ec(e, t, r) {
          let n = [];
          for (let e in t) {
            let i,
              s = t[e];
            if (null != r) {
              let t = r.args.find((t) => t.name === e);
              t && (i = Q(s, t.type));
            }
            null == i && (i = A(s)),
              null != i &&
                n.push({
                  kind: p.Kind.ARGUMENT,
                  name: { kind: p.Kind.NAME, value: e },
                  value: i,
                });
          }
          return {
            kind: p.Kind.DIRECTIVE,
            name: { kind: p.Kind.NAME, value: e },
            arguments: n,
          };
        }
        function ef(e, t) {
          let r = [];
          for (let { name: n, args: i } of t) {
            let t = e?.getDirective(n);
            r.push(ec(n, i, t));
          }
          return r;
        }
        function eh(e, t) {
          return !!t?.[e.name.value]?.repeatable;
        }
        function ed(e, t) {
          return t.some(({ value: t }) => t === e.value);
        }
        function ep(e, t) {
          let r = [...t];
          for (let t of e) {
            let e = r.findIndex((e) => e.name.value === t.name.value);
            if (e > -1) {
              let n = r[e];
              if ("ListValue" === n.value.kind) {
                let e = n.value.values,
                  r = t.value.values;
                n.value.values = em(e, r, (e, t) => {
                  let r = e.value;
                  return !r || !t.some((e) => e.value === r);
                });
              } else n.value = t.value;
            } else r.push(t);
          }
          return r;
        }
        function ey(e = [], t = [], r, n) {
          let i = r && r.reverseDirectives,
            s = [...(i ? e : t)]
              .map((e, t, r) => {
                let i = r.findIndex((t) => t.name.value === e.name.value);
                if (i !== t && !eh(e, n)) {
                  let t = r[i];
                  return (e.arguments = ep(e.arguments, t.arguments)), null;
                }
                return e;
              })
              .filter(ei);
          for (let r of i ? t : e)
            if (
              (function (e, t) {
                return !!e.find((e) => e.name.value === t.name.value);
              })(s, r) &&
              !eh(r, n)
            ) {
              let e = s.findIndex((e) => e.name.value === r.name.value),
                t = s[e];
              s[e].arguments = ep(r.arguments || [], t.arguments || []);
            } else s.push(r);
          return s;
        }
        function em(e, t, r) {
          return e.concat(t.filter((t) => r(t, e)));
        }
        function eb(e) {
          let t = e;
          for (; t.kind === p.Kind.LIST_TYPE || "NonNullType" === t.kind; )
            t = t.type;
          return t;
        }
        function eg(e) {
          return e.kind !== p.Kind.NAMED_TYPE;
        }
        function e_(e) {
          return e.kind === p.Kind.LIST_TYPE;
        }
        function ev(e) {
          return e.kind === p.Kind.NON_NULL_TYPE;
        }
        function eT(e) {
          return e_(e)
            ? `[${eT(e.type)}]`
            : ev(e)
              ? `${eT(e.type)}!`
              : e.name.value;
        }
        function eE(e, t) {
          return null == e && null == t
            ? i.A_EQUALS_B
            : null == e
              ? i.A_SMALLER_THAN_B
              : null == t
                ? i.A_GREATER_THAN_B
                : e < t
                  ? i.A_SMALLER_THAN_B
                  : e > t
                    ? i.A_GREATER_THAN_B
                    : i.A_EQUALS_B;
        }
        function ex(e, t, r, n, i) {
          let s = [];
          if ((null != r && s.push(...r), null != t))
            for (let r of t) {
              let [t, o] = (function (e, t) {
                let r = e.findIndex((e) => e.name.value === t.name.value);
                return [r > -1 ? e[r] : null, r];
              })(s, r);
              if (t && !n?.ignoreFieldConflicts) {
                let a =
                  (n?.onFieldTypeConflict &&
                    n.onFieldTypeConflict(t, r, e, n?.throwOnConflict)) ||
                  (function (e, t, r, n = !1) {
                    let i = eT(t.type),
                      s = eT(r.type);
                    if (i !== s) {
                      let o = eb(t.type),
                        a = eb(r.type);
                      if (o.name.value !== a.name.value)
                        throw Error(
                          `Field "${r.name.value}" already defined with a different type. Declared as "${o.name.value}", but you tried to override with "${a.name.value}"`,
                        );
                      if (
                        !(function e(t, r, n = !1) {
                          return eg(t) || eg(r)
                            ? ev(r)
                              ? e(ev(t) ? t.type : t, r.type)
                              : ev(t)
                                ? e(r, t, n)
                                : !!e_(t) &&
                                  ((e_(r) && e(t.type, r.type)) ||
                                    (ev(r) && e(t, r.type)))
                            : t.toString() === r.toString();
                        })(t.type, r.type, !n)
                      )
                        throw Error(
                          `Field '${e.name.value}.${t.name.value}' changed type from '${i}' to '${s}'`,
                        );
                    }
                    return ev(r.type) && !ev(t.type) && (t.type = r.type), t;
                  })(e, t, r, n?.throwOnConflict);
                (a.arguments = (function (e, t, r) {
                  let n = (function (e, t) {
                    return e.reduce((e, r) => {
                      let n = e.findIndex((e) => e.name.value === r.name.value);
                      return -1 === n
                        ? e.concat([r])
                        : (t?.reverseArguments || (e[n] = r), e);
                    }, []);
                  })([...t, ...e].filter(ei), r);
                  return r && r.sort && n.sort(en), n;
                })(r.arguments || [], t.arguments || [], n)),
                  (a.directives = ey(r.directives, t.directives, n, i)),
                  (a.description = r.description || t.description),
                  (s[o] = a);
              } else s.push(r);
            }
          if ((n && n.sort && s.sort(en), n && n.exclusions)) {
            let t = n.exclusions;
            return s.filter(
              (r) => !t.includes(`${e.name.value}.${r.name.value}`),
            );
          }
          return s;
        }
        function ew(e = [], t = [], r = {}) {
          let n = [
            ...t,
            ...e.filter((e) => !t.find((t) => t.name.value === e.name.value)),
          ];
          return r && r.sort && n.sort(en), n;
        }
        !(function (e) {
          (e[(e.A_SMALLER_THAN_B = -1)] = "A_SMALLER_THAN_B"),
            (e[(e.A_EQUALS_B = 0)] = "A_EQUALS_B"),
            (e[(e.A_GREATER_THAN_B = 1)] = "A_GREATER_THAN_B");
        })(i || (i = {}));
        let eS = {
            query: "Query",
            mutation: "Mutation",
            subscription: "Subscription",
          },
          eP = "SCHEMA_DEF_SYMBOL";
        function eO(e, t, r = {}) {
          var n, i, s, o, a;
          for (let l of e)
            if ("name" in l) {
              let e = l.name?.value;
              if (
                (t?.commentDescriptions &&
                  (function (e) {
                    let t = e.name?.value;
                    if (null != t)
                      switch ((m(e, t), e.kind)) {
                        case "EnumTypeDefinition":
                          if (e.values)
                            for (let r of e.values) m(r, t, r.name.value);
                          break;
                        case "ObjectTypeDefinition":
                        case "InputObjectTypeDefinition":
                        case "InterfaceTypeDefinition":
                          if (e.fields) {
                            for (let r of e.fields)
                              if (
                                (m(r, t, r.name.value),
                                "FieldDefinition" === r.kind && r.arguments)
                              )
                                for (let e of r.arguments)
                                  m(e, t, r.name.value, e.name.value);
                          }
                      }
                  })(l),
                null == e)
              )
                continue;
              if (
                t?.exclusions?.includes(e + ".*") ||
                t?.exclusions?.includes(e)
              )
                delete r[e];
              else
                switch (l.kind) {
                  case p.Kind.OBJECT_TYPE_DEFINITION:
                  case p.Kind.OBJECT_TYPE_EXTENSION:
                    r[e] = (function (e, t, r, n) {
                      if (t)
                        try {
                          return {
                            name: e.name,
                            description: e.description || t.description,
                            kind:
                              r?.convertExtensions ||
                              "ObjectTypeDefinition" === e.kind ||
                              "ObjectTypeDefinition" === t.kind
                                ? "ObjectTypeDefinition"
                                : "ObjectTypeExtension",
                            loc: e.loc,
                            fields: ex(e, e.fields, t.fields, r, n),
                            directives: ey(e.directives, t.directives, r, n),
                            interfaces: ew(e.interfaces, t.interfaces, r),
                          };
                        } catch (t) {
                          throw Error(
                            `Unable to merge GraphQL type "${e.name.value}": ${t.message}`,
                          );
                        }
                      return r?.convertExtensions
                        ? { ...e, kind: p.Kind.OBJECT_TYPE_DEFINITION }
                        : e;
                    })(l, r[e], t, r);
                    break;
                  case p.Kind.ENUM_TYPE_DEFINITION:
                  case p.Kind.ENUM_TYPE_EXTENSION:
                    r[e] =
                      ((n = r[e]),
                      n
                        ? {
                            name: l.name,
                            description: l.description || n.description,
                            kind:
                              t?.convertExtensions ||
                              "EnumTypeDefinition" === l.kind ||
                              "EnumTypeDefinition" === n.kind
                                ? "EnumTypeDefinition"
                                : "EnumTypeExtension",
                            loc: l.loc,
                            directives: ey(l.directives, n.directives, t, r),
                            values: (function (e, t, r, n) {
                              if (r?.consistentEnumMerge) {
                                let r = [];
                                e && r.push(...e), (e = t), (t = r);
                              }
                              let i = new Map();
                              if (e) for (let t of e) i.set(t.name.value, t);
                              if (t)
                                for (let e of t) {
                                  let t = e.name.value;
                                  if (i.has(t)) {
                                    let r = i.get(t);
                                    (r.description =
                                      e.description || r.description),
                                      (r.directives = ey(
                                        e.directives,
                                        r.directives,
                                        void 0,
                                      ));
                                  } else i.set(t, e);
                                }
                              let s = [...i.values()];
                              return r && r.sort && s.sort(en), s;
                            })(l.values, n.values, t),
                          }
                        : t?.convertExtensions
                          ? { ...l, kind: p.Kind.ENUM_TYPE_DEFINITION }
                          : l);
                    break;
                  case p.Kind.UNION_TYPE_DEFINITION:
                  case p.Kind.UNION_TYPE_EXTENSION:
                    r[e] =
                      ((i = r[e]),
                      i
                        ? {
                            name: l.name,
                            description: l.description || i.description,
                            directives: ey(l.directives, i.directives, t, r),
                            kind:
                              t?.convertExtensions ||
                              "UnionTypeDefinition" === l.kind ||
                              "UnionTypeDefinition" === i.kind
                                ? p.Kind.UNION_TYPE_DEFINITION
                                : p.Kind.UNION_TYPE_EXTENSION,
                            loc: l.loc,
                            types: ew(l.types, i.types, t),
                          }
                        : t?.convertExtensions
                          ? { ...l, kind: p.Kind.UNION_TYPE_DEFINITION }
                          : l);
                    break;
                  case p.Kind.SCALAR_TYPE_DEFINITION:
                  case p.Kind.SCALAR_TYPE_EXTENSION:
                    r[e] =
                      ((s = r[e]),
                      s
                        ? {
                            name: l.name,
                            description: l.description || s.description,
                            kind:
                              t?.convertExtensions ||
                              "ScalarTypeDefinition" === l.kind ||
                              "ScalarTypeDefinition" === s.kind
                                ? "ScalarTypeDefinition"
                                : "ScalarTypeExtension",
                            loc: l.loc,
                            directives: ey(l.directives, s.directives, t, r),
                          }
                        : t?.convertExtensions
                          ? { ...l, kind: p.Kind.SCALAR_TYPE_DEFINITION }
                          : l);
                    break;
                  case p.Kind.INPUT_OBJECT_TYPE_DEFINITION:
                  case p.Kind.INPUT_OBJECT_TYPE_EXTENSION:
                    r[e] = (function (e, t, r, n) {
                      if (t)
                        try {
                          return {
                            name: e.name,
                            description: e.description || t.description,
                            kind:
                              r?.convertExtensions ||
                              "InputObjectTypeDefinition" === e.kind ||
                              "InputObjectTypeDefinition" === t.kind
                                ? "InputObjectTypeDefinition"
                                : "InputObjectTypeExtension",
                            loc: e.loc,
                            fields: ex(e, e.fields, t.fields, r),
                            directives: ey(e.directives, t.directives, r, n),
                          };
                        } catch (t) {
                          throw Error(
                            `Unable to merge GraphQL input type "${e.name.value}": ${t.message}`,
                          );
                        }
                      return r?.convertExtensions
                        ? { ...e, kind: p.Kind.INPUT_OBJECT_TYPE_DEFINITION }
                        : e;
                    })(l, r[e], t, r);
                    break;
                  case p.Kind.INTERFACE_TYPE_DEFINITION:
                  case p.Kind.INTERFACE_TYPE_EXTENSION:
                    r[e] = (function (e, t, r, n) {
                      if (t)
                        try {
                          return {
                            name: e.name,
                            description: e.description || t.description,
                            kind:
                              r?.convertExtensions ||
                              "InterfaceTypeDefinition" === e.kind ||
                              "InterfaceTypeDefinition" === t.kind
                                ? "InterfaceTypeDefinition"
                                : "InterfaceTypeExtension",
                            loc: e.loc,
                            fields: ex(e, e.fields, t.fields, r, n),
                            directives: ey(e.directives, t.directives, r, n),
                            interfaces: e.interfaces
                              ? ew(e.interfaces, t.interfaces, r)
                              : void 0,
                          };
                        } catch (t) {
                          throw Error(
                            `Unable to merge GraphQL interface "${e.name.value}": ${t.message}`,
                          );
                        }
                      return r?.convertExtensions
                        ? { ...e, kind: p.Kind.INTERFACE_TYPE_DEFINITION }
                        : e;
                    })(l, r[e], t, r);
                    break;
                  case p.Kind.DIRECTIVE_DEFINITION:
                    r[e] &&
                      e in {} &&
                      !(
                        null != (o = r[e]) &&
                        "object" == typeof o &&
                        "kind" in o &&
                        "string" == typeof o.kind
                      ) &&
                      (r[e] = void 0),
                      (r[e] = (function (e, t) {
                        return t
                          ? {
                              ...e,
                              arguments: em(
                                t.arguments || [],
                                e.arguments || [],
                                (e, t) =>
                                  !ed(
                                    e.name,
                                    t.map((e) => e.name),
                                  ),
                              ),
                              locations: [
                                ...t.locations,
                                ...e.locations.filter(
                                  (e) => !ed(e, t.locations),
                                ),
                              ],
                            }
                          : e;
                      })(l, r[e]));
                }
            } else {
              (l.kind === p.Kind.SCHEMA_DEFINITION ||
                l.kind === p.Kind.SCHEMA_EXTENSION) &&
                (r[eP] =
                  ((a = r[eP]),
                  a
                    ? {
                        kind:
                          l.kind === p.Kind.SCHEMA_DEFINITION ||
                          a.kind === p.Kind.SCHEMA_DEFINITION
                            ? p.Kind.SCHEMA_DEFINITION
                            : p.Kind.SCHEMA_EXTENSION,
                        description: l.description || a.description,
                        directives: ey(l.directives, a.directives, t, void 0),
                        operationTypes: (function (e = [], t = []) {
                          let r = [];
                          for (let n in eS) {
                            let i =
                              e.find((e) => e.operation === n) ||
                              t.find((e) => e.operation === n);
                            i && r.push(i);
                          }
                          return r;
                        })(l.operationTypes, a.operationTypes),
                      }
                    : t?.convertExtensions
                      ? { ...l, kind: p.Kind.SCHEMA_DEFINITION }
                      : l));
            }
          return r;
        }
        function eI(e, t) {
          let r;
          y = {};
          let n = {
            kind: p.Kind.DOCUMENT,
            definitions: (function (e, t) {
              y = {};
              let { allDirectives: r, allNodes: n } = (function e(
                  t,
                  r,
                  n = [],
                  i = [],
                  s = new Set(),
                ) {
                  if (t && !s.has(t))
                    if ((s.add(t), "function" == typeof t)) e(t(), r, n, i, s);
                    else if (Array.isArray(t))
                      for (let o of t) e(o, r, n, i, s);
                    else if ((0, p.isSchema)(t))
                      e(
                        (function (e, t = {}) {
                          let r = t.pathToDirectivesInExtensions,
                            n = e.getTypeMap(),
                            i = (function (e, t) {
                              let r = new Map([
                                  ["query", void 0],
                                  ["mutation", void 0],
                                  ["subscription", void 0],
                                ]),
                                n = [];
                              if (
                                (null != e.astNode && n.push(e.astNode),
                                null != e.extensionASTNodes)
                              )
                                for (let t of e.extensionASTNodes) n.push(t);
                              for (let e of n)
                                if (e.operationTypes)
                                  for (let t of e.operationTypes)
                                    r.set(t.operation, t);
                              let i = eo(e);
                              for (let [e, t] of r) {
                                let n = i.get(e);
                                if (null != n) {
                                  let i = R(n);
                                  null != t
                                    ? (t.type = i)
                                    : r.set(e, {
                                        kind: p.Kind.OPERATION_TYPE_DEFINITION,
                                        operation: e,
                                        type: i,
                                      });
                                }
                              }
                              let s = [...r.values()].filter(ei),
                                o = ea(e, e, t);
                              if (!s.length && !o.length) return null;
                              let a = {
                                  kind:
                                    null != s
                                      ? p.Kind.SCHEMA_DEFINITION
                                      : p.Kind.SCHEMA_EXTENSION,
                                  operationTypes: s,
                                  directives: o,
                                },
                                l = z(e);
                              return l && (a.description = l), a;
                            })(e, r),
                            s = null != i ? [i] : [];
                          for (let t of e.getDirectives())
                            (0, p.isSpecifiedDirective)(t) ||
                              s.push(
                                (function (e, t, r) {
                                  return {
                                    kind: p.Kind.DIRECTIVE_DEFINITION,
                                    description: z(e),
                                    name: { kind: p.Kind.NAME, value: e.name },
                                    arguments: e.args?.map((e) => el(e, t, r)),
                                    repeatable: e.isRepeatable,
                                    locations:
                                      e.locations?.map((e) => ({
                                        kind: p.Kind.NAME,
                                        value: e,
                                      })) || [],
                                  };
                                })(t, e, r),
                              );
                          for (let t in n) {
                            let i = n[t],
                              u = (0, p.isSpecifiedScalarType)(i),
                              c = (0, p.isIntrospectionType)(i);
                            if (!u && !c)
                              if ((0, p.isObjectType)(i))
                                s.push(
                                  (function (e, t, r) {
                                    return {
                                      kind: p.Kind.OBJECT_TYPE_DEFINITION,
                                      description: z(e),
                                      name: {
                                        kind: p.Kind.NAME,
                                        value: e.name,
                                      },
                                      fields: Object.values(e.getFields()).map(
                                        (e) => eu(e, t, r),
                                      ),
                                      interfaces: Object.values(
                                        e.getInterfaces(),
                                      ).map((e) => R(e)),
                                      directives: ea(e, t, r),
                                    };
                                  })(i, e, r),
                                );
                              else if ((0, p.isInterfaceType)(i))
                                s.push(
                                  (function (e, t, r) {
                                    let n = {
                                      kind: p.Kind.INTERFACE_TYPE_DEFINITION,
                                      description: z(e),
                                      name: {
                                        kind: p.Kind.NAME,
                                        value: e.name,
                                      },
                                      fields: Object.values(e.getFields()).map(
                                        (e) => eu(e, t, r),
                                      ),
                                      directives: ea(e, t, r),
                                    };
                                    return (
                                      "getInterfaces" in e &&
                                        (n.interfaces = Object.values(
                                          e.getInterfaces(),
                                        ).map((e) => R(e))),
                                      n
                                    );
                                  })(i, e, r),
                                );
                              else if ((0, p.isUnionType)(i)) {
                                var o, a, l;
                                s.push(
                                  ((o = i),
                                  (a = e),
                                  (l = r),
                                  {
                                    kind: p.Kind.UNION_TYPE_DEFINITION,
                                    description: z(o),
                                    name: { kind: p.Kind.NAME, value: o.name },
                                    directives: ea(o, a, l),
                                    types: o.getTypes().map((e) => R(e)),
                                  }),
                                );
                              } else if ((0, p.isInputObjectType)(i))
                                s.push(
                                  (function (e, t, r) {
                                    return {
                                      kind: p.Kind.INPUT_OBJECT_TYPE_DEFINITION,
                                      description: z(e),
                                      name: {
                                        kind: p.Kind.NAME,
                                        value: e.name,
                                      },
                                      fields: Object.values(e.getFields()).map(
                                        (e) => {
                                          var n, i, s;
                                          return (
                                            (n = e),
                                            (i = t),
                                            (s = r),
                                            {
                                              kind: p.Kind
                                                .INPUT_VALUE_DEFINITION,
                                              description: z(n),
                                              name: {
                                                kind: p.Kind.NAME,
                                                value: n.name,
                                              },
                                              type: R(n.type),
                                              directives: ea(n, i, s),
                                              defaultValue:
                                                Q(n.defaultValue, n.type) ??
                                                void 0,
                                            }
                                          );
                                        },
                                      ),
                                      directives: ea(e, t, r),
                                    };
                                  })(i, e, r),
                                );
                              else if ((0, p.isEnumType)(i))
                                s.push(
                                  (function (e, t, r) {
                                    return {
                                      kind: p.Kind.ENUM_TYPE_DEFINITION,
                                      description: z(e),
                                      name: {
                                        kind: p.Kind.NAME,
                                        value: e.name,
                                      },
                                      values: Object.values(e.getValues()).map(
                                        (e) => {
                                          var n, i, s;
                                          return (
                                            (n = e),
                                            (i = t),
                                            (s = r),
                                            {
                                              kind: p.Kind
                                                .ENUM_VALUE_DEFINITION,
                                              description: z(n),
                                              name: {
                                                kind: p.Kind.NAME,
                                                value: n.name,
                                              },
                                              directives: ea(n, i, s),
                                            }
                                          );
                                        },
                                      ),
                                      directives: ea(e, t, r),
                                    };
                                  })(i, e, r),
                                );
                              else if ((0, p.isScalarType)(i))
                                s.push(
                                  (function (e, t, r) {
                                    let n = ef(t, ee(e, r)),
                                      i = e.specifiedByUrl || e.specifiedByURL;
                                    return (
                                      i &&
                                        !n.some(
                                          (e) => "specifiedBy" === e.name.value,
                                        ) &&
                                        n.push(ec("specifiedBy", { url: i })),
                                      {
                                        kind: p.Kind.SCALAR_TYPE_DEFINITION,
                                        description: z(e),
                                        name: {
                                          kind: p.Kind.NAME,
                                          value: e.name,
                                        },
                                        directives: n,
                                      }
                                    );
                                  })(i, e, r),
                                );
                              else throw Error(`Unknown type ${i}.`);
                          }
                          return { kind: p.Kind.DOCUMENT, definitions: s };
                        })(t, r).definitions,
                        r,
                        n,
                        i,
                        s,
                      );
                    else if ("string" == typeof t || t instanceof p.Source)
                      e((0, p.parse)(t, r).definitions, r, n, i, s);
                    else if ("object" == typeof t && (0, p.isDefinitionNode)(t))
                      t.kind === p.Kind.DIRECTIVE_DEFINITION
                        ? n.push(t)
                        : i.push(t);
                    else if (
                      t &&
                      "object" == typeof t &&
                      "kind" in t &&
                      t.kind === p.Kind.DOCUMENT
                    )
                      e(t.definitions, r, n, i, s);
                    else
                      throw Error(
                        `typeDefs must contain only strings, documents, schemas, or functions, got ${typeof t}`,
                      );
                  return { allDirectives: n, allNodes: i };
                })(e, t),
                i = eO(r, t),
                s = eO(n, t, i);
              if (t?.useSchemaDefinition) {
                let e = s[eP] || {
                    kind: p.Kind.SCHEMA_DEFINITION,
                    operationTypes: [],
                  },
                  t = e.operationTypes;
                for (let e in eS)
                  if (!t.find((t) => t.operation === e)) {
                    let r = s[eS[e]];
                    null != r &&
                      null != r.name &&
                      t.push({
                        kind: p.Kind.OPERATION_TYPE_DEFINITION,
                        type: { kind: p.Kind.NAMED_TYPE, name: r.name },
                        operation: e,
                      });
                  }
                e?.operationTypes?.length != null &&
                  e.operationTypes.length > 0 &&
                  (s[eP] = e);
              }
              t?.forceSchemaDefinition &&
                !s[eP]?.operationTypes?.length &&
                (s[eP] = {
                  kind: p.Kind.SCHEMA_DEFINITION,
                  operationTypes: [
                    {
                      kind: p.Kind.OPERATION_TYPE_DEFINITION,
                      operation: "query",
                      type: {
                        kind: p.Kind.NAMED_TYPE,
                        name: { kind: p.Kind.NAME, value: "Query" },
                      },
                    },
                  ],
                });
              let o = Object.values(s);
              if (t?.sort) {
                let e = "function" == typeof t.sort ? t.sort : eE;
                o.sort((t, r) => e(t.name?.value, r.name?.value));
              }
              return o;
            })(e, {
              useSchemaDefinition: !0,
              forceSchemaDefinition: !1,
              throwOnConflict: !1,
              commentDescriptions: !1,
              ...t,
            }),
          };
          if (t?.commentDescriptions) r = (0, p.visit)(n, w);
          else r = n;
          return (y = {}), r;
        }
        function ek(e, t = !1, r = !1, n = !1) {
          let i,
            s,
            o,
            a = !0,
            l = e.every((e) => {
              if (Array.isArray(e)) {
                if (void 0 === i) return (i = e.length), !0;
                else if (i === e.length) return !0;
              } else a = !1;
              return !1;
            });
          if (n && l)
            return Array(i)
              .fill(null)
              .map((i, s) =>
                ek(
                  e.map((e) => e[s]),
                  t,
                  r,
                  n,
                ),
              );
          if (a) return e.flat(1);
          for (let i of (t &&
            ((o = e.find((e) => eC(e))),
            null == s && (s = {}),
            o &&
              Object.setPrototypeOf(
                s,
                Object.create(Object.getPrototypeOf(o)),
              )),
          e))
            if (eC(i)) {
              if (o) {
                let e = Object.getPrototypeOf(s),
                  t = Object.getPrototypeOf(i);
                if (t)
                  for (let r of Object.getOwnPropertyNames(t)) {
                    let n = Object.getOwnPropertyDescriptor(t, r);
                    ei(n) && Object.defineProperty(e, r, n);
                  }
              }
              for (let e in i)
                null == s && (s = {}),
                  e in s ? (s[e] = ek([s[e], i[e]], t, r, n)) : (s[e] = i[e]);
            } else
              s =
                Array.isArray(i) && Array.isArray(s) ? ek([s, i], t, r, n) : i;
          return s;
        }
        function eC(e) {
          return e && "object" == typeof e && !Array.isArray(e);
        }
        function eR(e, t) {
          if (e && t && t !== e.extensions) {
            if (!e.extensions) {
              e.extensions = t;
              return;
            }
            e.extensions = ek([e.extensions, t], !1, !0);
          }
        }
        function eA(e, t) {
          let r = e.getTypeMap();
          for (let e in r) {
            let n = r[e];
            if (!(0, p.getNamedType)(n).name.startsWith("__")) {
              if ((0, p.isObjectType)(n)) {
                let e = n.getFields();
                for (let r in e)
                  for (let n of e[r].args)
                    n.defaultValue = t(n.type, n.defaultValue);
              } else if ((0, p.isInputObjectType)(n)) {
                let e = n.getFields();
                for (let r in e) {
                  let n = e[r];
                  n.defaultValue = t(n.type, n.defaultValue);
                }
              }
            }
          }
        }
        function eN(e, t, r = null, n = null) {
          if (null == t) return t;
          let i = (0, p.getNullableType)(e);
          if ((0, p.isLeafType)(i)) return null != r ? r(i, t) : t;
          if ((0, p.isListType)(i))
            return et(t).map((e) => eN(i.ofType, e, r, n));
          if ((0, p.isInputObjectType)(i)) {
            let e = i.getFields(),
              s = {};
            for (let i in t) {
              let o = e[i];
              null != o && (s[i] = eN(o.type, t[i], r, n));
            }
            return null != n ? n(i, s) : s;
          }
        }
        function eD(e, t) {
          return eN(e, t, (e, t) => {
            try {
              return e.serialize(t);
            } catch {
              return t;
            }
          });
        }
        function eL(e, t) {
          return eN(e, t, (e, t) => {
            try {
              return e.parseValue(t);
            } catch {
              return t;
            }
          });
        }
        function ej(e, t) {
          let r = e.getTypeMap();
          for (let e in r) {
            let n = r[e];
            if (
              !(0, p.getNamedType)(n).name.startsWith("__") &&
              (0, p.isObjectType)(n)
            ) {
              let r = n.getFields();
              for (let n in r) t(r[n], e, n);
            }
          }
        }
        function eF(e, t) {
          if (t) {
            let r = e[t.name];
            if ((0, p.isObjectType)(r)) return r;
          }
        }
        function eB(e, t = {}) {
          let r = eG(
              e$(
                eU(
                  eM(
                    (function (e, t, r) {
                      let n = (function (e) {
                        let t = e[s.ENUM_VALUE];
                        return null != t ? t : null;
                      })(r);
                      return n
                        ? eU(
                            e,
                            t,
                            {
                              [s.ENUM_TYPE]: (e) => {
                                let r = e.toConfig(),
                                  i = r.values,
                                  s = {};
                                for (let r in i) {
                                  let o = i[r],
                                    a = n(o, e.name, t, r);
                                  if (void 0 === a) s[r] = o;
                                  else if (Array.isArray(a)) {
                                    let [e, t] = a;
                                    s[e] = void 0 === t ? o : t;
                                  } else null !== a && (s[r] = a);
                                }
                                return eH(
                                  new p.GraphQLEnumType({ ...r, values: s }),
                                );
                              },
                            },
                            (e) => (0, p.isEnumType)(e),
                          )
                        : e;
                    })(
                      eU(eM(e.getTypeMap(), e, eD), e, t, (e) =>
                        (0, p.isLeafType)(e),
                      ),
                      e,
                      t,
                    ),
                    e,
                    eL,
                  ),
                  e,
                  t,
                  (e) => !(0, p.isLeafType)(e),
                ),
                e,
                t,
              ),
              e,
              t,
            ),
            { typeMap: n, directives: i } = (function (e, t) {
              let r = Object.create(null);
              for (let t in e) r[t] = e[t];
              let n = Object.create(null);
              for (let e in r) {
                let t = r[e];
                if (null == t || e.startsWith("__")) continue;
                let i = t.name;
                if (!i.startsWith("__")) {
                  if (null != n[i]) {
                    console.warn(
                      `Duplicate schema type name ${i} found; keeping the existing one found in the schema`,
                    );
                    continue;
                  }
                  n[i] = t;
                }
              }
              for (let e in n) n[e] = s(n[e]);
              return {
                typeMap: n,
                directives: t.map((e) =>
                  (function (e) {
                    if ((0, p.isSpecifiedDirective)(e)) return e;
                    let t = e.toConfig();
                    return (t.args = i(t.args)), new p.GraphQLDirective(t);
                  })(e),
                ),
              };
              function i(e) {
                let t = {};
                for (let r in e) {
                  let n = e[r],
                    i = l(n.type);
                  null != i && ((n.type = i), (t[r] = n));
                }
                return t;
              }
              function s(e) {
                if ((0, p.isObjectType)(e)) {
                  let t = e.toConfig(),
                    r = {
                      ...t,
                      fields: () => o(t.fields),
                      interfaces: () => a(t.interfaces),
                    };
                  return new p.GraphQLObjectType(r);
                }
                if ((0, p.isInterfaceType)(e)) {
                  let t = e.toConfig(),
                    r = { ...t, fields: () => o(t.fields) };
                  return (
                    "interfaces" in r && (r.interfaces = () => a(t.interfaces)),
                    new p.GraphQLInterfaceType(r)
                  );
                }
                if ((0, p.isUnionType)(e)) {
                  let t = e.toConfig(),
                    r = { ...t, types: () => a(t.types) };
                  return new p.GraphQLUnionType(r);
                }
                if ((0, p.isInputObjectType)(e)) {
                  let t = e.toConfig(),
                    r = {
                      ...t,
                      fields: () =>
                        (function (e) {
                          let t = {};
                          for (let r in e) {
                            let n = e[r],
                              i = l(n.type);
                            null != i && ((n.type = i), (t[r] = n));
                          }
                          return t;
                        })(t.fields),
                    };
                  return new p.GraphQLInputObjectType(r);
                }
                if ((0, p.isEnumType)(e)) {
                  let t = e.toConfig();
                  return new p.GraphQLEnumType(t);
                } else if ((0, p.isScalarType)(e)) {
                  if ((0, p.isSpecifiedScalarType)(e)) return e;
                  let t = e.toConfig();
                  return new p.GraphQLScalarType(t);
                }
                throw Error(`Unexpected schema type: ${e}`);
              }
              function o(e) {
                let t = {};
                for (let r in e) {
                  let n = e[r],
                    s = l(n.type);
                  null != s &&
                    n.args &&
                    ((n.type = s), (n.args = i(n.args)), (t[r] = n));
                }
                return t;
              }
              function a(e) {
                let t = [];
                for (let r of e) {
                  let e = l(r);
                  null != e && t.push(e);
                }
                return t;
              }
              function l(e) {
                if ((0, p.isListType)(e)) {
                  let t = l(e.ofType);
                  return null != t ? new p.GraphQLList(t) : null;
                }
                if ((0, p.isNonNullType)(e)) {
                  let t = l(e.ofType);
                  return null != t ? new p.GraphQLNonNull(t) : null;
                }
                if ((0, p.isNamedType)(e)) {
                  let t = r[e.name];
                  return (
                    void 0 === t &&
                      (n[
                        (t = !(function (e) {
                          if ("getFields" in e) {
                            let t = e.getFields();
                            for (let e in t) return "_fake" === t[e].name;
                          }
                          return !1;
                        })(e)
                          ? s(e)
                          : (function (e) {
                              switch (e.name) {
                                case p.GraphQLInt.name:
                                  return p.GraphQLInt;
                                case p.GraphQLFloat.name:
                                  return p.GraphQLFloat;
                                case p.GraphQLString.name:
                                  return p.GraphQLString;
                                case p.GraphQLBoolean.name:
                                  return p.GraphQLBoolean;
                                case p.GraphQLID.name:
                                  return p.GraphQLID;
                                default:
                                  return e;
                              }
                            })(e)).name
                      ] = r[e.name] =
                        t),
                    null != t ? n[t.name] : null
                  );
                }
                return null;
              }
            })(
              r,
              (function (e, t, r) {
                let n = (function (e) {
                  let t = e[s.DIRECTIVE];
                  return null != t ? t : null;
                })(r);
                if (null == n) return e.slice();
                let i = [];
                for (let r of e) {
                  let e = n(r, t);
                  void 0 === e ? i.push(r) : null !== e && i.push(e);
                }
                return i;
              })(e.getDirectives(), e, t),
            );
          return new p.GraphQLSchema({
            ...e.toConfig(),
            query: eF(n, eF(r, e.getQueryType())),
            mutation: eF(n, eF(r, e.getMutationType())),
            subscription: eF(n, eF(r, e.getSubscriptionType())),
            types: Object.values(n),
            directives: i,
          });
        }
        function eU(e, t, r, n = () => !0) {
          let i = {};
          for (let o in e)
            if (!o.startsWith("__")) {
              let a = e[o];
              if (null == a || !n(a)) {
                i[o] = a;
                continue;
              }
              let l = (function (e, t, r) {
                let n,
                  i = [
                    ...(function (e, t) {
                      let r = e.getType(t),
                        n = [s.TYPE];
                      return (
                        (0, p.isObjectType)(r)
                          ? (n.push(s.COMPOSITE_TYPE, s.OBJECT_TYPE),
                            t === e.getQueryType()?.name
                              ? n.push(s.ROOT_OBJECT, s.QUERY)
                              : t === e.getMutationType()?.name
                                ? n.push(s.ROOT_OBJECT, s.MUTATION)
                                : t === e.getSubscriptionType()?.name &&
                                  n.push(s.ROOT_OBJECT, s.SUBSCRIPTION))
                          : (0, p.isInputObjectType)(r)
                            ? n.push(s.INPUT_OBJECT_TYPE)
                            : (0, p.isInterfaceType)(r)
                              ? n.push(
                                  s.COMPOSITE_TYPE,
                                  s.ABSTRACT_TYPE,
                                  s.INTERFACE_TYPE,
                                )
                              : (0, p.isUnionType)(r)
                                ? n.push(
                                    s.COMPOSITE_TYPE,
                                    s.ABSTRACT_TYPE,
                                    s.UNION_TYPE,
                                  )
                                : (0, p.isEnumType)(r)
                                  ? n.push(s.ENUM_TYPE)
                                  : (0, p.isScalarType)(r) &&
                                    n.push(s.SCALAR_TYPE),
                        n
                      );
                    })(e, r),
                  ];
                for (; !n && i.length > 0; ) n = t[i.pop()];
                return null != n ? n : null;
              })(t, r, o);
              if (null == l) {
                i[o] = a;
                continue;
              }
              let u = l(a, t);
              if (void 0 === u) {
                i[o] = a;
                continue;
              }
              i[o] = u;
            }
          return i;
        }
        function eM(e, t, r) {
          let n = eG(e, t, {
            [s.ARGUMENT]: (t) => {
              if (void 0 === t.defaultValue) return t;
              let n = eq(e, t.type);
              if (null != n)
                return { ...t, defaultValue: r(n, t.defaultValue) };
            },
          });
          return e$(n, t, {
            [s.INPUT_OBJECT_FIELD]: (e) => {
              if (void 0 === e.defaultValue) return e;
              let t = eq(n, e.type);
              if (null != t)
                return { ...e, defaultValue: r(t, e.defaultValue) };
            },
          });
        }
        function eq(e, t) {
          if ((0, p.isListType)(t)) {
            let r = eq(e, t.ofType);
            return null != r ? new p.GraphQLList(r) : null;
          }
          if ((0, p.isNonNullType)(t)) {
            let r = eq(e, t.ofType);
            return null != r ? new p.GraphQLNonNull(r) : null;
          }
          if ((0, p.isNamedType)(t)) {
            let r = e[t.name];
            return null != r ? r : null;
          }
          return null;
        }
        function e$(e, t, r) {
          let n = {};
          for (let i in e)
            if (!i.startsWith("__")) {
              let o = e[i];
              if (
                !(0, p.isObjectType)(o) &&
                !(0, p.isInterfaceType)(o) &&
                !(0, p.isInputObjectType)(o)
              ) {
                n[i] = o;
                continue;
              }
              let a = (function (e, t, r) {
                let n,
                  i = [
                    ...(function (e, t) {
                      let r = e.getType(t),
                        n = [s.FIELD];
                      return (
                        (0, p.isObjectType)(r)
                          ? (n.push(s.COMPOSITE_FIELD, s.OBJECT_FIELD),
                            t === e.getQueryType()?.name
                              ? n.push(s.ROOT_FIELD, s.QUERY_ROOT_FIELD)
                              : t === e.getMutationType()?.name
                                ? n.push(s.ROOT_FIELD, s.MUTATION_ROOT_FIELD)
                                : t === e.getSubscriptionType()?.name &&
                                  n.push(
                                    s.ROOT_FIELD,
                                    s.SUBSCRIPTION_ROOT_FIELD,
                                  ))
                          : (0, p.isInterfaceType)(r)
                            ? n.push(s.COMPOSITE_FIELD, s.INTERFACE_FIELD)
                            : (0, p.isInputObjectType)(r) &&
                              n.push(s.INPUT_OBJECT_FIELD),
                        n
                      );
                    })(e, r),
                  ];
                for (; !n && i.length > 0; ) n = t[i.pop()];
                return n ?? null;
              })(t, r, i);
              if (null == a) {
                n[i] = o;
                continue;
              }
              let l = o.toConfig(),
                u = l.fields,
                c = {};
              for (let e in u) {
                let r = u[e],
                  n = a(r, e, i, t);
                if (void 0 === n) c[e] = r;
                else if (Array.isArray(n)) {
                  let [e, t] = n;
                  null != t.astNode &&
                    (t.astNode = {
                      ...t.astNode,
                      name: { ...t.astNode.name, value: e },
                    }),
                    (c[e] = void 0 === t ? r : t);
                } else null !== n && (c[e] = n);
              }
              (0, p.isObjectType)(o)
                ? (n[i] = eH(new p.GraphQLObjectType({ ...l, fields: c })))
                : (0, p.isInterfaceType)(o)
                  ? (n[i] = eH(new p.GraphQLInterfaceType({ ...l, fields: c })))
                  : (n[i] = eH(
                      new p.GraphQLInputObjectType({ ...l, fields: c }),
                    ));
            }
          return n;
        }
        function eG(e, t, r) {
          let n = {};
          for (let i in e)
            if (!i.startsWith("__")) {
              let o = e[i];
              if (!(0, p.isObjectType)(o) && !(0, p.isInterfaceType)(o)) {
                n[i] = o;
                continue;
              }
              let a = (function (e) {
                let t = e[s.ARGUMENT];
                return null != t ? t : null;
              })(r);
              if (null == a) {
                n[i] = o;
                continue;
              }
              let l = o.toConfig(),
                u = l.fields,
                c = {};
              for (let e in u) {
                let r = u[e],
                  n = r.args;
                if (null == n) {
                  c[e] = r;
                  continue;
                }
                let s = Object.keys(n);
                if (!s.length) {
                  c[e] = r;
                  continue;
                }
                let o = {};
                for (let r of s) {
                  let s = n[r],
                    l = a(s, e, i, t);
                  if (void 0 === l) o[r] = s;
                  else if (Array.isArray(l)) {
                    let [e, t] = l;
                    o[e] = t;
                  } else null !== l && (o[r] = l);
                }
                c[e] = { ...r, args: o };
              }
              (0, p.isObjectType)(o)
                ? (n[i] = new p.GraphQLObjectType({ ...l, fields: c }))
                : (0, p.isInterfaceType)(o)
                  ? (n[i] = new p.GraphQLInterfaceType({ ...l, fields: c }))
                  : (n[i] = new p.GraphQLInputObjectType({ ...l, fields: c }));
            }
          return n;
        }
        function eH(e) {
          if ((0, p.isObjectType)(e)) {
            let t = e.toConfig();
            if (null != t.astNode) {
              let e = [];
              for (let r in t.fields) {
                let n = t.fields[r];
                null != n.astNode && e.push(n.astNode);
              }
              t.astNode = {
                ...t.astNode,
                kind: p.Kind.OBJECT_TYPE_DEFINITION,
                fields: e,
              };
            }
            return (
              null != t.extensionASTNodes &&
                (t.extensionASTNodes = t.extensionASTNodes.map((e) => ({
                  ...e,
                  kind: p.Kind.OBJECT_TYPE_EXTENSION,
                  fields: void 0,
                }))),
              new p.GraphQLObjectType(t)
            );
          }
          if ((0, p.isInterfaceType)(e)) {
            let t = e.toConfig();
            if (null != t.astNode) {
              let e = [];
              for (let r in t.fields) {
                let n = t.fields[r];
                null != n.astNode && e.push(n.astNode);
              }
              t.astNode = {
                ...t.astNode,
                kind: p.Kind.INTERFACE_TYPE_DEFINITION,
                fields: e,
              };
            }
            return (
              null != t.extensionASTNodes &&
                (t.extensionASTNodes = t.extensionASTNodes.map((e) => ({
                  ...e,
                  kind: p.Kind.INTERFACE_TYPE_EXTENSION,
                  fields: void 0,
                }))),
              new p.GraphQLInterfaceType(t)
            );
          }
          if ((0, p.isInputObjectType)(e)) {
            let t = e.toConfig();
            if (null != t.astNode) {
              let e = [];
              for (let r in t.fields) {
                let n = t.fields[r];
                null != n.astNode && e.push(n.astNode);
              }
              t.astNode = {
                ...t.astNode,
                kind: p.Kind.INPUT_OBJECT_TYPE_DEFINITION,
                fields: e,
              };
            }
            return (
              null != t.extensionASTNodes &&
                (t.extensionASTNodes = t.extensionASTNodes.map((e) => ({
                  ...e,
                  kind: p.Kind.INPUT_OBJECT_TYPE_EXTENSION,
                  fields: void 0,
                }))),
              new p.GraphQLInputObjectType(t)
            );
          }
          {
            if (!(0, p.isEnumType)(e)) return e;
            let t = e.toConfig();
            if (null != t.astNode) {
              let e = [];
              for (let r in t.values) {
                let n = t.values[r];
                null != n.astNode && e.push(n.astNode);
              }
              t.astNode = { ...t.astNode, values: e };
            }
            return (
              null != t.extensionASTNodes &&
                (t.extensionASTNodes = t.extensionASTNodes.map((e) => ({
                  ...e,
                  values: void 0,
                }))),
              new p.GraphQLEnumType(t)
            );
          }
        }
        function eK(e, t) {
          for (let r in t) e[r] = t[r];
        }
        function eV(e, t, r, n, i) {
          if (!r.resolve) {
            let r = `Resolver missing for "${n}.${i}".
To disable this validator, use:
  resolverValidationOptions: {
    ${e}: 'ignore'
  }`;
            if ("error" === t) throw Error(r);
            "warn" === t && console.warn(r);
            return;
          }
          if ("function" != typeof r.resolve)
            throw Error(`Resolver "${n}.${i}" must be a function`);
        }
        !(function (e) {
          (e.TYPE = "MapperKind.TYPE"),
            (e.SCALAR_TYPE = "MapperKind.SCALAR_TYPE"),
            (e.ENUM_TYPE = "MapperKind.ENUM_TYPE"),
            (e.COMPOSITE_TYPE = "MapperKind.COMPOSITE_TYPE"),
            (e.OBJECT_TYPE = "MapperKind.OBJECT_TYPE"),
            (e.INPUT_OBJECT_TYPE = "MapperKind.INPUT_OBJECT_TYPE"),
            (e.ABSTRACT_TYPE = "MapperKind.ABSTRACT_TYPE"),
            (e.UNION_TYPE = "MapperKind.UNION_TYPE"),
            (e.INTERFACE_TYPE = "MapperKind.INTERFACE_TYPE"),
            (e.ROOT_OBJECT = "MapperKind.ROOT_OBJECT"),
            (e.QUERY = "MapperKind.QUERY"),
            (e.MUTATION = "MapperKind.MUTATION"),
            (e.SUBSCRIPTION = "MapperKind.SUBSCRIPTION"),
            (e.DIRECTIVE = "MapperKind.DIRECTIVE"),
            (e.FIELD = "MapperKind.FIELD"),
            (e.COMPOSITE_FIELD = "MapperKind.COMPOSITE_FIELD"),
            (e.OBJECT_FIELD = "MapperKind.OBJECT_FIELD"),
            (e.ROOT_FIELD = "MapperKind.ROOT_FIELD"),
            (e.QUERY_ROOT_FIELD = "MapperKind.QUERY_ROOT_FIELD"),
            (e.MUTATION_ROOT_FIELD = "MapperKind.MUTATION_ROOT_FIELD"),
            (e.SUBSCRIPTION_ROOT_FIELD = "MapperKind.SUBSCRIPTION_ROOT_FIELD"),
            (e.INTERFACE_FIELD = "MapperKind.INTERFACE_FIELD"),
            (e.INPUT_OBJECT_FIELD = "MapperKind.INPUT_OBJECT_FIELD"),
            (e.ARGUMENT = "MapperKind.ARGUMENT"),
            (e.ENUM_VALUE = "MapperKind.ENUM_VALUE");
        })(s || (s = {}));
        let eQ = (e) => ({
            onExecute: ({ setExecuteFn: t }) => {
              e.execute && t(e.execute);
            },
            onParse: ({ setParseFn: t }) => {
              e.parse && t(e.parse);
            },
            onValidate: ({ setValidationFn: t, addValidationRule: r }) => {
              e.validate && t(e.validate), e.specifiedRules?.map(r);
            },
            onSubscribe: ({ setSubscribeFn: t }) => {
              e.subscribe && t(e.subscribe);
            },
          }),
          eW = (e) => ({
            onContextBuilding: ({ context: t, extendContext: r }) =>
              j(
                () => e(t),
                (e) => r(e),
              ),
          });
        Symbol("ENVELOP_IS_INTROSPECTION");
        let ez =
            (e) =>
            (...t) =>
              e(
                (function (e) {
                  return 1 === e.length
                    ? e[0]
                    : {
                        schema: e[0],
                        document: e[1],
                        rootValue: e[2],
                        contextValue: e[3],
                        variableValues: e[4],
                        operationName: e[5],
                        fieldResolver: e[6],
                        subscribeFieldResolver: e[7],
                      };
                })(t),
              ),
          eY =
            (e) =>
            (...t) =>
              e(
                (function (e) {
                  return 1 === e.length
                    ? e[0]
                    : {
                        schema: e[0],
                        document: e[1],
                        rootValue: e[2],
                        contextValue: e[3],
                        variableValues: e[4],
                        operationName: e[5],
                        fieldResolver: e[6],
                        typeResolver: e[7],
                      };
                })(t),
              );
        function eJ(e) {
          return (
            "object" == typeof e &&
            null != e &&
            "function" == typeof e[Symbol.asyncIterator]
          );
        }
        function eX(e, t) {
          if (eJ(e.result)) return { onNext: t };
          t({ args: e.args, result: e.result, setResult: e.setResult });
        }
        function eZ(e, t) {
          let r = e[Symbol.asyncIterator](),
            n = !1,
            i = {
              [Symbol.asyncIterator]: () => i,
              next: () =>
                r
                  .next()
                  .then((e) => (e.done && !1 === n && ((n = !0), t()), e)),
              return() {
                let e = r.return?.();
                return (
                  !1 === n && ((n = !0), t()),
                  e || F({ done: !0, value: void 0 })
                );
              },
              throw(e) {
                let t = r.throw?.();
                if (t) return t;
                throw e;
              },
            };
          return i;
        }
        let e0 =
            ((n = globalThis.process?.env?.NODE_ENV === "development"),
            (e, t) =>
              !(function e(t) {
                return (
                  t instanceof Error &&
                  "GraphQLError" === t.name &&
                  (null == t.originalError || e(t.originalError))
                );
              })(e)
                ? (function (e, t, r) {
                    let n = Error(e);
                    if (((n.name = "GraphQLError"), r)) {
                      let e =
                        t instanceof Error
                          ? { message: t.message, stack: t.stack }
                          : { message: String(t) };
                      Object.defineProperty(n, "extensions", { get: () => e });
                    }
                    return (
                      Object.defineProperty(n, "toJSON", {
                        value: () => ({
                          message: n.message,
                          extensions: n.extensions,
                        }),
                      }),
                      n
                    );
                  })(t, e, n)
                : e),
          e1 =
            (e, t) =>
            ({ result: r, setResult: n }) => {
              null != r.errors &&
                n({ ...r, errors: r.errors.map((r) => e(r, t)) });
            };
        function e3(e, t) {
          let r = { ...t, ...e };
          for (let n of Object.keys(r))
            n in e && n in t && (r[n] = (r, i) => e[n](r, () => t[n](r, i)));
          return r;
        }
        (globalThis._sentryRewritesTunnelPath = "/monitoring"),
          (globalThis.SENTRY_RELEASE = {
            id: "d92a5e8d8d7c20e1f785b33fde2c15257fdb31d2",
          }),
          (globalThis._sentryBasePath = void 0),
          (globalThis._sentryRewriteFramesDistDir = ".next");
        let e4 = (e) => ({
            fn: (t, r) =>
              t
                ? (...n) => {
                    let i;
                    return (
                      t(e, () => {
                        i = r(...n);
                      }),
                      i
                    );
                  }
                : r,
            asyncFn: (t, r) =>
              t
                ? (...n) => {
                    let i;
                    return j(
                      () =>
                        t(e, () =>
                          L((i = r(...n))) ? i.then(() => void 0) : void 0,
                        ),
                      () => i,
                    );
                  }
                : r,
          }),
          e2 = new WeakMap();
        function e5(e) {
          throw Error(
            `No \`${e}\` function found! Register it using "useEngine" plugin.`,
          );
        }
        function e7(e) {
          return null != e;
        }
        class e8 extends Map {
          get [Symbol.toStringTag]() {
            return "AccumulatorMap";
          }
          add(e, t) {
            let r = this.get(e);
            void 0 === r ? this.set(e, [t]) : r.push(t);
          }
        }
        let e6 = new p.GraphQLDirective({
            name: "defer",
            description:
              "Directs the executor to defer this fragment when the `if` argument is true or undefined.",
            locations: [
              p.DirectiveLocation.FRAGMENT_SPREAD,
              p.DirectiveLocation.INLINE_FRAGMENT,
            ],
            args: {
              if: {
                type: new p.GraphQLNonNull(p.GraphQLBoolean),
                description: "Deferred when true or undefined.",
                defaultValue: !0,
              },
              label: { type: p.GraphQLString, description: "Unique name" },
            },
          }),
          e9 = new p.GraphQLDirective({
            name: "stream",
            description:
              "Directs the executor to stream plural fields when the `if` argument is true or undefined.",
            locations: [p.DirectiveLocation.FIELD],
            args: {
              if: {
                type: new p.GraphQLNonNull(p.GraphQLBoolean),
                description: "Stream when true or undefined.",
                defaultValue: !0,
              },
              label: { type: p.GraphQLString, description: "Unique name" },
              initialCount: {
                defaultValue: 0,
                type: p.GraphQLInt,
                description: "Number of items to return immediately",
              },
            },
          });
        function te(e, t, r, n, i, s, o, a) {
          for (let u of i.selections)
            switch (u.kind) {
              case p.Kind.FIELD:
                var l;
                if (!tr(r, u)) continue;
                s.add((l = u).alias ? l.alias.value : l.name.value, u);
                break;
              case p.Kind.INLINE_FRAGMENT: {
                if (!tr(r, u) || !tn(e, u, n)) continue;
                let i = ti(r, u);
                if (i) {
                  let s = new e8();
                  te(e, t, r, n, u.selectionSet, s, o, a),
                    o.push({ label: i.label, fields: s });
                } else te(e, t, r, n, u.selectionSet, s, o, a);
                break;
              }
              case p.Kind.FRAGMENT_SPREAD: {
                let i = u.name.value;
                if (!tr(r, u)) continue;
                let l = ti(r, u);
                if (a.has(i) && !l) continue;
                let c = t[i];
                if (!c || !tn(e, c, n)) continue;
                if ((l || a.add(i), l)) {
                  let i = new e8();
                  te(e, t, r, n, c.selectionSet, i, o, a),
                    o.push({ label: l.label, fields: i });
                } else te(e, t, r, n, c.selectionSet, s, o, a);
              }
            }
        }
        function tt(e, t, r, n, i) {
          let s = new e8(),
            o = [];
          return te(e, t, r, n, i, s, o, new Set()), { fields: s, patches: o };
        }
        function tr(e, t) {
          let r = (0, p.getDirectiveValues)(p.GraphQLSkipDirective, t, e);
          if (r?.if === !0) return !1;
          let n = (0, p.getDirectiveValues)(p.GraphQLIncludeDirective, t, e);
          return n?.if !== !1;
        }
        function tn(e, t, r) {
          let n = t.typeCondition;
          if (!n) return !0;
          let i = (0, p.typeFromAST)(e, n);
          return (
            i === r ||
            (!!(0, p.isAbstractType)(i) && e.getPossibleTypes(i).includes(r))
          );
        }
        function ti(e, t) {
          let r = (0, p.getDirectiveValues)(e6, t, e);
          if (r && !1 !== r.if)
            return { label: "string" == typeof r.label ? r.label : void 0 };
        }
        let ts = (function (e) {
          let t = new WeakMap();
          return function (r, n, i, s, o) {
            let a = t.get(r);
            if (!a) {
              (a = new WeakMap()), t.set(r, a);
              let l = new WeakMap();
              a.set(n, l);
              let u = new WeakMap();
              l.set(i, u);
              let c = new WeakMap();
              u.set(s, c);
              let f = e(r, n, i, s, o);
              return c.set(o, f), f;
            }
            let l = a.get(n);
            if (!l) {
              (l = new WeakMap()), a.set(n, l);
              let t = new WeakMap();
              l.set(i, t);
              let u = new WeakMap();
              t.set(s, u);
              let c = e(r, n, i, s, o);
              return u.set(o, c), c;
            }
            let u = l.get(i);
            if (!u) {
              (u = new WeakMap()), l.set(i, u);
              let t = new WeakMap();
              u.set(s, t);
              let a = e(r, n, i, s, o);
              return t.set(o, a), a;
            }
            let c = u.get(s);
            if (!c) {
              (c = new WeakMap()), u.set(s, c);
              let t = e(r, n, i, s, o);
              return c.set(o, t), t;
            }
            let f = c.get(o);
            if (void 0 === f) {
              let t = e(r, n, i, s, o);
              return c.set(o, t), t;
            }
            return f;
          };
        })(function (e, t, r, n, i) {
          let s = new e8(),
            o = new Set(),
            a = [];
          for (let l of i)
            l.selectionSet && te(e, t, r, n, l.selectionSet, s, a, o);
          return { fields: s, patches: a };
        });
        function to(e, t, r) {
          return { prev: e, key: t, typename: r };
        }
        function ta(e) {
          let t = [],
            r = e;
          for (; r; ) t.push(r.key), (r = r.prev);
          return t.reverse();
        }
        function tl(e) {
          return e?.[Symbol.asyncIterator] != null;
        }
        let tu = {
          get dispose() {
            return Symbol.dispose || Symbol.for("dispose");
          },
          get asyncDispose() {
            return Symbol.asyncDispose || Symbol.for("asyncDispose");
          },
        };
        function tc(e) {
          if (e instanceof Error) return e;
          if (
            "object" == typeof e &&
            null != e &&
            "message" in e &&
            "string" == typeof e.message
          ) {
            let t;
            "cause" in e && (t = { cause: e.cause });
            let r = Error(e.message, t);
            return (
              "stack" in e && "string" == typeof e.stack && (r.stack = e.stack),
              "name" in e && "string" == typeof e.name && (r.name = e.name),
              r
            );
          }
          return Error(String(e));
        }
        function tf(e, t) {
          if (!e)
            throw Error(null != t ? t : "Unexpected invariant triggered.");
        }
        function th(e, t, r) {
          t?.throwIfAborted();
          let n = Object.create(null),
            i = [];
          for (let t in e) {
            let r = j(
              () => e[t],
              (e) => {
                n[t] = e;
              },
            );
            L(r) && i.push(r);
          }
          if (!i.length) return n;
          let s = 1 === i.length ? i[0] : Promise.all(i);
          return r ? Promise.race([r, s]).then(() => n) : s.then(() => n);
        }
        let td = (function (e) {
          let t = new WeakMap();
          return function (r, n, i) {
            let s = t.get(r);
            if (!s) {
              (s = new WeakMap()), t.set(r, s);
              let o = new WeakMap();
              s.set(n, o);
              let a = e(r, n, i);
              return o.set(i, a), a;
            }
            let o = s.get(n);
            if (!o) {
              (o = new WeakMap()), s.set(n, o);
              let t = e(r, n, i);
              return o.set(i, t), t;
            }
            let a = o.get(i);
            if (void 0 === a) {
              let t = e(r, n, i);
              return o.set(i, t), t;
            }
            return a;
          };
        })((e, t, r) => ts(e.schema, e.fragments, e.variableValues, t, r));
        function tp(e) {
          return (
            e.signal?.throwIfAborted(),
            j(
              () =>
                (function (e) {
                  var t, r, n, i;
                  let s,
                    {
                      operation: o,
                      schema: a,
                      fragments: l,
                      variableValues: u,
                      rootValue: c,
                    } = e,
                    f = (function (e, t, r) {
                      let n = eo(e).get(t);
                      if (null == n)
                        throw J(
                          `Schema is not configured to execute ${t} operation.`,
                          { nodes: r },
                        );
                      return n;
                    })(a, o.operation, [o]);
                  null == f &&
                    J(
                      `Schema is not configured to execute ${o.operation} operation.`,
                      { nodes: o },
                    );
                  let { fields: h, patches: d } = tt(
                      a,
                      l,
                      u,
                      f,
                      o.selectionSet,
                    ),
                    p = void 0;
                  for (let a of ((s =
                    "mutation" === o.operation
                      ? ((t = e),
                        (r = f),
                        (n = c),
                        (i = p),
                        (function (e, t, r) {
                          let n = r;
                          for (let r of e)
                            n = j(
                              () => n,
                              (e) => t(e, r),
                            );
                          return n;
                        })(
                          h,
                          (e, [s, o]) => {
                            let a = to(i, s, r.name);
                            return (
                              t.signal?.throwIfAborted(),
                              j(
                                () => t_(t, r, n, o, a),
                                (t) => (void 0 === t || (e[s] = t), e),
                              )
                            );
                          },
                          Object.create(null),
                        ))
                      : tg(e, f, c, p, h)),
                  d)) {
                    let { label: t, fields: r } = a;
                    tF(e, f, c, r, t, p);
                  }
                  return s;
                })(e),
              (t) => {
                let r = ty(t, e.errors);
                return e.subsequentPayloads.size > 0
                  ? {
                      initialResult: { ...r, hasNext: !0 },
                      subsequentResults: (function (e) {
                        let t = !1;
                        async function r() {
                          if (t) return { value: void 0, done: !0 };
                          let n = Array.from(e.subsequentPayloads).map(
                            (e) => e.promise,
                          );
                          if (
                            (e.signalPromise
                              ? await Promise.race([e.signalPromise, ...n])
                              : await Promise.race(n),
                            t)
                          )
                            return { value: void 0, done: !0 };
                          let i = (function (e) {
                              let t = [];
                              for (let r of e.subsequentPayloads) {
                                let n = {};
                                if (r.isCompleted) {
                                  if ((e.subsequentPayloads.delete(r), tG(r))) {
                                    let e = r.items;
                                    if (r.isCompletedIterator) continue;
                                    n.items = e;
                                  } else n.data = r.data ?? null;
                                  (n.path = r.path),
                                    r.label && (n.label = r.label),
                                    r.errors.length > 0 &&
                                      (n.errors = r.errors),
                                    t.push(n);
                                }
                              }
                              return t;
                            })(e),
                            s = e.subsequentPayloads.size > 0;
                          return !i.length && s
                            ? r()
                            : (s || (t = !0),
                              {
                                value: i.length
                                  ? { incremental: i, hasNext: s }
                                  : { hasNext: s },
                                done: !1,
                              });
                        }
                        function n() {
                          let t = [];
                          return (
                            e.subsequentPayloads.forEach((e) => {
                              tG(e) &&
                                e.iterator?.return &&
                                t.push(e.iterator.return());
                            }),
                            Promise.all(t)
                          );
                        }
                        return {
                          [Symbol.asyncIterator]() {
                            return this;
                          },
                          next: r,
                          return: async () => (
                            await n(), (t = !0), { value: void 0, done: !0 }
                          ),
                          async throw(e) {
                            throw (await n(), (t = !0), e);
                          },
                          async [tu.asyncDispose]() {
                            await n(), (t = !0);
                          },
                        };
                      })(e),
                    }
                  : r;
              },
              (t) => (
                e.signal?.throwIfAborted(),
                t.errors ? e.errors.push(...t.errors) : e.errors.push(t),
                ty(null, e.errors)
              ),
            )
          );
        }
        function ty(e, t) {
          return 0 === t.length ? { data: e } : { errors: t, data: e };
        }
        let tm = Z(function (e) {
          let t = Object.create(null);
          for (let r of e.definitions)
            r.kind === p.Kind.FRAGMENT_DEFINITION && (t[r.name.value] = r);
          return t;
        });
        function tb(e) {
          let t,
            r,
            n,
            {
              schema: i,
              document: s,
              rootValue: o,
              contextValue: a,
              variableValues: l,
              operationName: u,
              fieldResolver: c,
              typeResolver: f,
              subscribeFieldResolver: h,
              signal: d,
            } = e;
          d?.throwIfAborted(), (0, p.assertValidSchema)(i);
          let y = tm(s);
          for (let e of s.definitions)
            if (e.kind === p.Kind.OPERATION_DEFINITION)
              if (null == u) {
                if (void 0 !== t)
                  return [
                    J(
                      "Must provide operation name if query contains multiple operations.",
                      { extensions: { code: "OPERATION_RESOLUTION_FAILURE" } },
                    ),
                  ];
                t = e;
              } else e.name?.value === u && (t = e);
          if (null == t)
            return null != u
              ? [
                  J(`Unknown operation named "${u}".`, {
                    extensions: { code: "OPERATION_RESOLUTION_FAILURE" },
                  }),
                ]
              : [
                  J("Must provide an operation.", {
                    extensions: { code: "OPERATION_RESOLUTION_FAILURE" },
                  }),
                ];
          let m = (function (e, t, r, n) {
            let i = [],
              s = n?.maxErrors;
            try {
              let n = (function (e, t, r, n) {
                let i = {};
                for (let s of t) {
                  let t = s.variable.name.value,
                    o = (0, p.typeFromAST)(e, s.type);
                  if (!(0, p.isInputType)(o)) {
                    let e = (0, p.print)(s.type);
                    n(
                      J(
                        `Variable "$${t}" expected value of type "${e}" which cannot be used as an input type.`,
                        { nodes: s.type },
                      ),
                    );
                    continue;
                  }
                  if (!V(r, t)) {
                    if (s.defaultValue)
                      i[t] = (0, p.valueFromAST)(s.defaultValue, o);
                    else if ((0, p.isNonNullType)(o)) {
                      let e = O(o);
                      n(
                        J(
                          `Variable "$${t}" of required type "${e}" was not provided.`,
                          { nodes: s },
                        ),
                      );
                    }
                    continue;
                  }
                  let a = r[t];
                  if (null === a && (0, p.isNonNullType)(o)) {
                    let e = O(o);
                    n(
                      J(
                        `Variable "$${t}" of non-null type "${e}" must not be null.`,
                        { nodes: s },
                      ),
                    );
                    continue;
                  }
                  i[t] = (0, p.coerceInputValue)(a, o, (e, r, i) => {
                    let o = `Variable "$${t}" got invalid value ` + O(r);
                    e.length > 0 &&
                      (o += ` at "${t}${e.map((e) => ("number" == typeof e ? "[" + e.toString() + "]" : "." + e)).join("")}"`),
                      n(
                        J(o + "; " + i.message, { nodes: s, originalError: i }),
                      );
                  });
                }
                return i;
              })(e, t, r, (e) => {
                if (null != s && i.length >= s)
                  throw J(
                    "Too many errors processing variables, error limit reached. Execution aborted.",
                  );
                i.push(e);
              });
              if (0 === i.length) return { coerced: n };
            } catch (e) {
              i.push(e);
            }
            return { errors: i };
          })(i, t.variableDefinitions ?? [], l ?? {}, { maxErrors: 50 });
          if (m.errors) return m.errors;
          if ((d?.throwIfAborted(), d)) {
            let e = new Set(),
              t = B();
            n = t.promise;
            let i = () => {
              t.reject(d.reason), d.removeEventListener("abort", i);
            };
            d.addEventListener("abort", i, { once: !0 }),
              n.catch(() => {
                for (let t of e) t();
                e.clear();
              }),
              (r = (t) => {
                e.add(t);
              });
          }
          return {
            schema: i,
            fragments: y,
            rootValue: o,
            contextValue: a,
            operation: t,
            variableValues: m.coerced,
            fieldResolver: c ?? tR,
            typeResolver: f ?? tC,
            subscribeFieldResolver: h ?? tR,
            subsequentPayloads: new Set(),
            errors: [],
            signal: d,
            onSignalAbort: r,
            signalPromise: n,
          };
        }
        function tg(e, t, r, n, i, s) {
          let o = Object.create(null),
            a = !1;
          try {
            for (let [l, u] of i) {
              e.signal?.throwIfAborted();
              let i = to(n, l, t.name),
                c = t_(e, t, r, u, i, s);
              void 0 !== c && ((o[l] = c), L(c) && (a = !0));
            }
          } catch (t) {
            if (t !== e.signal?.reason && a)
              return j(
                () => th(o, e.signal),
                () => {
                  throw t;
                },
                () => {
                  throw t;
                },
              );
            throw t;
          }
          return a ? th(o, e.signal, e.signalPromise) : o;
        }
        function t_(e, t, r, n, i, s) {
          let o = s?.errors ?? e.errors,
            a = tH(e.schema, t, n[0]);
          if (!a) return;
          let l = a.type,
            u = a.resolve ?? e.fieldResolver,
            c = tv(e, a, n, t, i);
          try {
            let t;
            e.signal?.throwIfAborted();
            let f = X(a, n[0], e.variableValues),
              h = e.contextValue,
              d = u(r, f, h, c);
            if (
              ((t = L(d)
                ? d.then((t) => tE(e, l, n, c, i, t, s))
                : tE(e, l, n, c, i, d, s)),
              L(t))
            )
              return t.then(void 0, (t) => {
                if (t instanceof AggregateError) {
                  let r;
                  for (let a of t.errors) {
                    a = tc(a);
                    let t = (0, p.locatedError)(a, n, ta(i));
                    (r = tT(t, l, o)), tM(e, i, s);
                  }
                  return r;
                }
                t = tc(t);
                let r = (0, p.locatedError)(t, n, ta(i)),
                  a = tT(r, l, o);
                return tM(e, i, s), a;
              });
            return t;
          } catch (a) {
            if (a instanceof AggregateError) {
              let t;
              for (let r of a.errors)
                (r = tc(r)),
                  (t = tT((0, p.locatedError)(r, n, ta(i)), l, o)),
                  tM(e, i, s);
              return t;
            }
            let t = tc(a),
              r = tT((0, p.locatedError)(t, n, ta(i)), l, o);
            return tM(e, i, s), r;
          }
        }
        function tv(e, t, r, n, i) {
          return {
            fieldName: t.name,
            fieldNodes: r,
            returnType: t.type,
            parentType: n,
            path: i,
            schema: e.schema,
            fragments: e.fragments,
            rootValue: e.rootValue,
            operation: e.operation,
            variableValues: e.variableValues,
            signal: e.signal,
          };
        }
        function tT(e, t, r) {
          if ((0, p.isNonNullType)(t) || e.extensions?.CRITICAL_ERROR) throw e;
          return r.push(e), null;
        }
        function tE(e, t, r, n, i, s, o) {
          if (s instanceof Error) throw s;
          if ((0, p.isNonNullType)(t)) {
            let a = tE(e, t.ofType, r, n, i, s, o);
            if (null === a)
              throw Error(
                `Cannot return null for non-nullable field ${n.parentType.name}.${n.fieldName}.`,
              );
            return a;
          }
          return null == s
            ? null
            : (0, p.isListType)(t)
              ? (function (e, t, r, n, i, s, o) {
                  let a = t.ofType,
                    l = o?.errors ?? e.errors;
                  if (tl(s))
                    return tw(e, a, r, n, i, s[Symbol.asyncIterator](), o);
                  if (!H(s))
                    throw J(
                      `Expected Iterable, but did not find one for field "${n.parentType.name}.${n.fieldName}".`,
                    );
                  let u = tx(e, r, i),
                    c = !1,
                    f = o,
                    h = [],
                    d = 0;
                  for (let t of s) {
                    let s = to(i, d, void 0);
                    if (
                      u &&
                      "number" == typeof u.initialCount &&
                      d >= u.initialCount
                    ) {
                      (f = (function (e, t, r, n, i, s, o, a, l) {
                        let u,
                          c,
                          f = new t$({
                            label: a,
                            path: t,
                            parentContext: l,
                            exeContext: n,
                          });
                        try {
                          try {
                            (u = L(r)
                              ? r.then((e) => tE(n, o, i, s, t, e, f))
                              : tE(n, o, i, s, t, r, f)),
                              L(u) &&
                                (u = u.then(void 0, (e) => {
                                  e = tc(e);
                                  let r = (0, p.locatedError)(e, i, ta(t)),
                                    s = tT(r, o, f.errors);
                                  return tM(n, t, f), s;
                                }));
                          } catch (s) {
                            let e = tc(s),
                              r = (0, p.locatedError)(e, i, ta(t));
                            (u = tT(r, o, f.errors)), tM(n, t, f);
                          }
                        } catch (t) {
                          return (
                            f.errors.push(t), tM(n, e, f), f.addItems(null), f
                          );
                        }
                        return (
                          (c = L(u)
                            ? u.then(
                                (e) => [e],
                                (t) => (f.errors.push(t), tM(n, e, f), null),
                              )
                            : [u]),
                          f.addItems(c),
                          f
                        );
                      })(i, s, t, e, r, n, a, u.label, f)),
                        d++;
                      continue;
                    }
                    tS(t, h, l, e, a, r, n, s, o) && (c = !0), d++;
                  }
                  return c ? Promise.all(h) : h;
                })(e, t, r, n, i, s, o)
              : (0, p.isLeafType)(t)
                ? (function (e, t) {
                    let r;
                    try {
                      r = e.serialize(t);
                    } catch (e) {
                      if (e instanceof p.GraphQLError) throw Error(e.message);
                      throw e;
                    }
                    if (null == r)
                      throw Error(
                        `Expected \`${O(e)}.serialize(${O(t)})\` to return non-nullable value, returned: ${O(r)}`,
                      );
                    return r;
                  })(t, s)
                : (0, p.isAbstractType)(t)
                  ? (function (e, t, r, n, i, s, o) {
                      let a = (t.resolveType ?? e.typeResolver)(
                        s,
                        e.contextValue,
                        n,
                        t,
                      );
                      return L(a)
                        ? a.then((a) =>
                            tO(e, tP(a, e, t, r, n, s), r, n, i, s, o),
                          )
                        : tO(e, tP(a, e, t, r, n, s), r, n, i, s, o);
                    })(e, t, r, n, i, s, o)
                  : (0, p.isObjectType)(t)
                    ? tO(e, t, r, n, i, s, o)
                    : void console.assert(
                        !1,
                        "Cannot complete value of unexpected output type: " +
                          O(t),
                      );
        }
        function tx(e, t, r) {
          if ("number" == typeof r.key) return;
          let n = (0, p.getDirectiveValues)(e9, t[0], e.variableValues);
          if (n && !1 !== n.if)
            return (
              tf(
                "number" == typeof n.initialCount,
                "initialCount must be a number",
              ),
              tf(
                n.initialCount >= 0,
                "initialCount must be a positive integer",
              ),
              {
                initialCount: n.initialCount,
                label: "string" == typeof n.label ? n.label : void 0,
              }
            );
        }
        async function tw(e, t, r, n, i, s, o) {
          e.signal?.throwIfAborted(),
            s.return &&
              e.onSignalAbort?.(() => {
                s.return?.();
              });
          let a = o?.errors ?? e.errors,
            l = tx(e, r, i),
            u = !1,
            c = [],
            f = 0;
          for (;;) {
            let h;
            if (l && "number" == typeof l.initialCount && f >= l.initialCount) {
              tU(f, s, e, r, n, t, i, l.label, o);
              break;
            }
            let d = to(i, f, void 0);
            try {
              if ((h = await s.next()).done) break;
            } catch (i) {
              let e = tc(i),
                n = (0, p.locatedError)(e, r, ta(d));
              c.push(tT(n, t, a));
              break;
            }
            tS(h.value, c, a, e, t, r, n, d, o) && (u = !0), (f += 1);
          }
          return u ? Promise.all(c) : c;
        }
        function tS(e, t, r, n, i, s, o, a, l) {
          try {
            let u;
            if (
              ((u = L(e)
                ? e.then((e) => tE(n, i, s, o, a, e, l))
                : tE(n, i, s, o, a, e, l)),
              L(u))
            )
              return (
                t.push(
                  u.then(void 0, (e) => {
                    e = tc(e);
                    let t = (0, p.locatedError)(e, s, ta(a)),
                      o = tT(t, i, r);
                    return tM(n, a, l), o;
                  }),
                ),
                !0
              );
            t.push(u);
          } catch (u) {
            let e = tc(u),
              o = tT((0, p.locatedError)(e, s, ta(a)), i, r);
            tM(n, a, l), t.push(o);
          }
          return !1;
        }
        function tP(e, t, r, n, i, s) {
          if (null == e)
            throw J(
              `Abstract type "${r.name}" must resolve to an Object type at runtime for field "${i.parentType.name}.${i.fieldName}". Either the "${r.name}" type should provide a "resolveType" function or each possible type should provide an "isTypeOf" function.`,
              { nodes: n },
            );
          if ((0, p.isObjectType)(e)) {
            if (p.versionInfo.major >= 16)
              throw J(
                "Support for returning GraphQLObjectType from resolveType was removed in graphql-js@16.0.0 please return type name instead.",
              );
            e = e.name;
          }
          if ("string" != typeof e)
            throw J(
              `Abstract type "${r.name}" must resolve to an Object type at runtime for field "${i.parentType.name}.${i.fieldName}" with value ${O(s)}, received "${O(e)}".`,
            );
          let o = t.schema.getType(e);
          if (null == o)
            throw J(
              `Abstract type "${r.name}" was resolved to a type "${e}" that does not exist inside the schema.`,
              { nodes: n },
            );
          if (!(0, p.isObjectType)(o))
            throw J(
              `Abstract type "${r.name}" was resolved to a non-object type "${e}".`,
              { nodes: n },
            );
          if (!t.schema.isSubType(r, o))
            throw J(
              `Runtime Object type "${o.name}" is not a possible type for "${r.name}".`,
              { nodes: n },
            );
          return o;
        }
        function tO(e, t, r, n, i, s, o) {
          if (t.isTypeOf) {
            let a = t.isTypeOf(s, e.contextValue, n);
            if (L(a))
              return a.then((n) => {
                if (!n) throw tI(t, s, r);
                return tk(e, t, r, i, s, o);
              });
            if (!a) throw tI(t, s, r);
          }
          return tk(e, t, r, i, s, o);
        }
        function tI(e, t, r) {
          return J(`Expected value of type "${e.name}" but got: ${O(t)}.`, {
            nodes: r,
          });
        }
        function tk(e, t, r, n, i, s) {
          let { fields: o, patches: a } = td(e, t, r),
            l = tg(e, t, i, n, o, s);
          for (let r of a) {
            let { label: o, fields: a } = r;
            tF(e, t, i, a, o, n, s);
          }
          return l;
        }
        let tC = function (e, t, r, n) {
            if (K(e) && "string" == typeof e.__typename) return e.__typename;
            let i = r.schema.getPossibleTypes(n),
              s = [];
            for (let n = 0; n < i.length; n++) {
              let o = i[n];
              if (o.isTypeOf) {
                let i = o.isTypeOf(e, t, r);
                if (L(i)) s[n] = i;
                else if (i) return o.name;
              }
            }
            if (s.length)
              return Promise.all(s).then((e) => {
                for (let t = 0; t < e.length; t++) if (e[t]) return i[t].name;
              });
          },
          tR = function (e, t, r, n) {
            if (K(e) || "function" == typeof e) {
              let i = e[n.fieldName];
              return "function" == typeof i ? e[n.fieldName](t, r, n) : i;
            }
          };
        function tA(e) {
          let t = e.subsequentResults,
            r = !1,
            n = !1;
          return {
            [Symbol.asyncIterator]() {
              return this;
            },
            next: () =>
              n
                ? F({ value: void 0, done: n })
                : r
                  ? t.next()
                  : ((r = !0), F({ value: e.initialResult, done: n })),
            return: () => ((n = !0), t.return()),
            throw: (e) => ((n = !0), t.throw(e)),
            [tu.asyncDispose]: () => ((n = !0), t?.[tu.asyncDispose]?.()),
          };
        }
        async function* tN(e) {
          "initialResult" in e ? yield* tA(e) : yield e;
        }
        function tD(e, t) {
          return tl(t)
            ? (function (e) {
                let t,
                  r,
                  n = e[Symbol.asyncIterator](),
                  i = !1;
                async function s() {
                  if (i) return { value: void 0, done: !0 };
                  try {
                    if (!t) {
                      let e;
                      if (r) return await r, await s();
                      r = new Promise((t) => {
                        e = t;
                      });
                      let o = await n.next();
                      if (o.done) return (i = !0), await s();
                      return (
                        (t = o.value[Symbol.asyncIterator]()),
                        (r = void 0),
                        e(),
                        await s()
                      );
                    }
                    let e = t,
                      o = await t.next();
                    if (!o.done) return o;
                    return t === e && (t = void 0), await s();
                  } catch (e) {
                    throw ((i = !0), e);
                  }
                }
                return {
                  next: s,
                  return: async () => (
                    (i = !0),
                    await Promise.all([t?.return?.(), n.return?.()]),
                    { value: void 0, done: !0 }
                  ),
                  async throw(e) {
                    throw (
                      ((i = !0),
                      await Promise.all([t?.throw?.(e), n.throw?.(e)]),
                      e)
                    );
                  },
                  [Symbol.asyncIterator]() {
                    return this;
                  },
                  async [tu.asyncDispose]() {
                    (i = !0),
                      await Promise.all([
                        t?.[tu.asyncDispose]?.(),
                        n?.[tu.asyncDispose]?.(),
                      ]);
                  },
                };
              })(
                q(
                  t,
                  (t) =>
                    j(
                      () =>
                        tp({
                          ...e,
                          rootValue: t,
                          subsequentPayloads: new Set(),
                          errors: [],
                        }),
                      tN,
                    ),
                  (t) => {
                    if (t instanceof AggregateError)
                      throw AggregateError(
                        t.errors.map((t) => tL(t, e.operation)),
                        t.message,
                      );
                    throw tL(t, e.operation);
                  },
                ),
              )
            : t;
        }
        function tL(e, t) {
          return J(e.message, { originalError: e, nodes: [t] });
        }
        function tj(e, t, r) {
          if ((t?.throwIfAborted(), e instanceof Error)) throw e;
          if (!tl(e))
            throw J(
              `Subscription field must return Async Iterable. Received: ${O(e)}.`,
            );
          return r
            ? {
                [Symbol.asyncIterator]() {
                  let t = e[Symbol.asyncIterator]();
                  return (
                    t.return &&
                      r?.(() => {
                        t.return?.();
                      }),
                    t
                  );
                },
              }
            : e;
        }
        function tF(e, t, r, n, i, s, o) {
          let a,
            l = new tq({ label: i, path: s, parentContext: o, exeContext: e });
          try {
            (a = tg(e, t, r, s, n, l)),
              L(a) && (a = a.then(null, (e) => (l.errors.push(e), null)));
          } catch (e) {
            l.errors.push(e), (a = null);
          }
          l.addData(a);
        }
        async function tB(e, t, r, n, i, s, o) {
          let a, l;
          try {
            let { value: t, done: r } = await e.next();
            if (r)
              return s.setIsCompletedIterator(), { done: r, value: void 0 };
            a = t;
          } catch (t) {
            let e = tc(t);
            return {
              done: !0,
              value: tT((0, p.locatedError)(e, r, ta(o)), i, s.errors),
            };
          }
          try {
            return (
              (l = tE(t, i, r, n, o, a, s)),
              L(l) &&
                (l = l.then(void 0, (e) => {
                  let n = (0, p.locatedError)(e, r, ta(o)),
                    a = tT(n, i, s.errors);
                  return tM(t, o, s), a;
                })),
              { done: !1, value: l }
            );
          } catch (n) {
            let e = tT((0, p.locatedError)(n, r, ta(o)), i, s.errors);
            return tM(t, o, s), { done: !1, value: e };
          }
        }
        async function tU(e, t, r, n, i, s, o, a, l) {
          let u = e,
            c = l ?? void 0;
          for (;;) {
            let e,
              l,
              f = to(o, u, void 0),
              h = new t$({
                label: a,
                path: f,
                parentContext: c,
                iterator: t,
                exeContext: r,
              });
            try {
              e = await tB(t, r, n, i, s, h, f);
            } catch (e) {
              h.errors.push(e),
                tM(r, o, h),
                h.addItems(null),
                t?.return && t.return().catch(() => {});
              return;
            }
            let { done: d, value: p } = e;
            if (
              ((l = L(p)
                ? p.then(
                    (e) => [e],
                    (e) => (h.errors.push(e), tM(r, o, h), null),
                  )
                : [p]),
              h.addItems(l),
              d)
            )
              break;
            (c = h), u++;
          }
        }
        function tM(e, t, r) {
          let n = ta(t);
          e.subsequentPayloads.forEach((t) => {
            if (t !== r) {
              for (let e = 0; e < n.length; e++) if (t.path[e] !== n[e]) return;
              tG(t) &&
                t.iterator?.return &&
                t.iterator.return().catch(() => {}),
                e.subsequentPayloads.delete(t);
            }
          });
        }
        class tq {
          type;
          errors;
          label;
          path;
          promise;
          data;
          parentContext;
          isCompleted;
          _exeContext;
          _resolve;
          constructor(e) {
            (this.type = "defer"),
              (this.label = e.label),
              (this.path = ta(e.path)),
              (this.parentContext = e.parentContext),
              (this.errors = []),
              (this._exeContext = e.exeContext),
              this._exeContext.subsequentPayloads.add(this),
              (this.isCompleted = !1),
              (this.data = null),
              (this.promise = new Promise((e) => {
                this._resolve = (t) => {
                  e(t);
                };
              }).then((e) => {
                (this.data = e), (this.isCompleted = !0);
              }));
          }
          addData(e) {
            let t = this.parentContext?.promise;
            if (t) return void this._resolve?.(t.then(() => e));
            this._resolve?.(e);
          }
        }
        class t$ {
          type;
          errors;
          label;
          path;
          items;
          promise;
          parentContext;
          iterator;
          isCompletedIterator;
          isCompleted;
          _exeContext;
          _resolve;
          constructor(e) {
            (this.type = "stream"),
              (this.items = null),
              (this.label = e.label),
              (this.path = ta(e.path)),
              (this.parentContext = e.parentContext),
              (this.iterator = e.iterator),
              (this.errors = []),
              (this._exeContext = e.exeContext),
              this._exeContext.subsequentPayloads.add(this),
              (this.isCompleted = !1),
              (this.items = null),
              (this.promise = new Promise((e) => {
                this._resolve = (t) => {
                  e(t);
                };
              }).then((e) => {
                (this.items = e), (this.isCompleted = !0);
              }));
          }
          addItems(e) {
            let t = this.parentContext?.promise;
            if (t) return void this._resolve?.(t.then(() => e));
            this._resolve?.(e);
          }
          setIsCompletedIterator() {
            this.isCompletedIterator = !0;
          }
        }
        function tG(e) {
          return "stream" === e.type;
        }
        function tH(e, t, r) {
          let n = r.name.value;
          return n === p.SchemaMetaFieldDef.name && e.getQueryType() === t
            ? p.SchemaMetaFieldDef
            : n === p.TypeMetaFieldDef.name && e.getQueryType() === t
              ? p.TypeMetaFieldDef
              : n === p.TypeNameMetaFieldDef.name
                ? p.TypeNameMetaFieldDef
                : t.getFields()[n];
        }
        function tK(e) {
          let t = (0, p.getOperationAST)(e.document, e.operationName);
          if (null == t) throw Error("Must provide an operation.");
          if ("subscription" === t.operation) {
            let t = tb(e);
            if (!("schema" in t)) {
              for (let e of t) {
                let t = (e.extensions ||= {});
                ((t.http ||= {}).status = 400),
                  (e.extensions.code = "BAD_USER_INPUT");
              }
              return { errors: t };
            }
            let r = (function (e) {
              try {
                let t = (function (e) {
                  let {
                      schema: t,
                      fragments: r,
                      operation: n,
                      variableValues: i,
                      rootValue: s,
                    } = e,
                    o = t.getSubscriptionType();
                  if (null == o)
                    throw J(
                      "Schema is not configured to execute subscription operation.",
                      { nodes: n },
                    );
                  let { fields: a } = tt(t, r, i, o, n.selectionSet),
                    [l, u] = [...a.entries()][0],
                    c = u[0].name.value,
                    f = tH(t, o, u[0]);
                  if (!f)
                    throw J(`The subscription field "${c}" is not defined.`, {
                      nodes: u,
                    });
                  let h = to(void 0, l, o.name),
                    d = tv(e, f, u, o, h);
                  try {
                    let t = X(f, u[0], i),
                      r = e.contextValue,
                      n = (f.subscribe ?? e.subscribeFieldResolver)(s, t, r, d);
                    if (L(n))
                      return n
                        .then((t) => tj(t, e.signal, e.onSignalAbort))
                        .then(void 0, (e) => {
                          throw (0, p.locatedError)(e, u, ta(h));
                        });
                    return tj(n, e.signal, e.onSignalAbort);
                  } catch (e) {
                    throw (0, p.locatedError)(e, u, ta(h));
                  }
                })(e);
                if (L(t)) return t.then(void 0, (e) => ({ errors: [e] }));
                return t;
              } catch (e) {
                return { errors: [e] };
              }
            })(t);
            return L(r) ? r.then((e) => tD(t, e)) : tD(t, r);
          }
          return j(
            () =>
              (function (e) {
                let t = tb(e);
                return "schema" in t
                  ? tp(t)
                  : {
                      errors: t.map(
                        (e) => (
                          Object.defineProperty(e, "extensions", {
                            value: {
                              ...e.extensions,
                              http: {
                                ...(e.extensions?.http || {}),
                                status: 400,
                              },
                            },
                          }),
                          e
                        ),
                      ),
                    };
              })(e),
            (e) => (e?.initialResult ? tA(e) : e),
          );
        }
        Z(function (e) {
          return function (t) {
            return tK({
              schema: e,
              document: t.document,
              variableValues: t.variables,
              operationName: t.operationName,
              rootValue: t.rootValue,
              contextValue: t.context,
              signal: t.signal || t.info?.signal,
            });
          };
        });
        let tV = {
            red: "\x1b[31m",
            yellow: "\x1b[33m",
            magenta: "\x1b[35m",
            cyan: "\x1b[36m",
            reset: "\x1b[0m",
          },
          tQ = tV.yellow + "WARN" + tV.reset,
          tW = tV.cyan + "INFO" + tV.reset,
          tz = tV.red + "ERR" + tV.reset,
          tY = tV.magenta + "DEBUG" + tV.reset,
          tJ = { debug: 0, info: 1, warn: 2, error: 3, silent: 4 },
          tX = () => {},
          tZ =
            (e) =>
            (...t) =>
              console.log(e, ...t),
          t0 = console.debug ? (...e) => console.debug(tY, ...e) : tZ(tY),
          t1 = console.info ? (...e) => console.info(tW, ...e) : tZ(tW),
          t3 = console.warn ? (...e) => console.warn(tQ, ...e) : tZ(tQ),
          t4 = console.error ? (...e) => console.error(tz, ...e) : tZ(tz),
          t2 = (
            e = globalThis.process?.env.DEBUG === "1" ? "debug" : "info",
          ) => {
            let t = tJ[e];
            return {
              debug: t > tJ.debug ? tX : t0,
              info: t > tJ.info ? tX : t1,
              warn: t > tJ.warn ? tX : t3,
              error: t > tJ.error ? tX : t4,
            };
          };
        var t5 = r(66909),
          t7 = r.t(t5, 2);
        class t8 extends Error {
          error;
          suppressed;
          constructor(e, t, r) {
            super(r),
              (this.error = e),
              (this.suppressed = t),
              (this.name = "SuppressedError"),
              Error.captureStackTrace(this, this.constructor);
          }
        }
        function t6(e) {
          return e?.[tu.dispose] != null;
        }
        let t9 = globalThis.SuppressedError || t8;
        class re {
          callbacks = [];
          get disposed() {
            return 0 === this.callbacks.length;
          }
          use(e) {
            return (
              e?.[tu.asyncDispose] != null
                ? this.callbacks.push(() => e[tu.asyncDispose]())
                : t6(e) && this.callbacks.push(() => e[tu.dispose]()),
              e
            );
          }
          adopt(e, t) {
            return t && this.callbacks.push(() => t(e)), e;
          }
          defer(e) {
            e && this.callbacks.push(e);
          }
          move() {
            let e = new re();
            return (e.callbacks = this.callbacks), (this.callbacks = []), e;
          }
          disposeAsync() {
            return this[tu.asyncDispose]();
          }
          _error;
          _iterateCallbacks() {
            let e = this.callbacks.pop();
            if (e)
              return j(
                e,
                () => this._iterateCallbacks(),
                (e) => (
                  (this._error = this._error ? new t9(e, this._error) : e),
                  this._iterateCallbacks()
                ),
              );
          }
          [tu.asyncDispose]() {
            let e = this._iterateCallbacks();
            if (e?.then)
              return e.then(() => {
                if (this._error) {
                  let e = this._error;
                  throw ((this._error = void 0), e);
                }
              });
            if (this._error) {
              let e = this._error;
              throw ((this._error = void 0), e);
            }
          }
          [Symbol.toStringTag] = "AsyncDisposableStack";
        }
        let rt = globalThis.SuppressedError || t8;
        class rr {
          callbacks = [];
          get disposed() {
            return 0 === this.callbacks.length;
          }
          use(e) {
            return t6(e) && this.callbacks.push(() => e[tu.dispose]()), e;
          }
          adopt(e, t) {
            return t && this.callbacks.push(() => t(e)), e;
          }
          defer(e) {
            e && this.callbacks.push(e);
          }
          move() {
            let e = new rr();
            return (e.callbacks = this.callbacks), (this.callbacks = []), e;
          }
          dispose() {
            return this[tu.dispose]();
          }
          _error;
          _iterateCallbacks() {
            let e = this.callbacks.pop();
            if (e) {
              try {
                e();
              } catch (e) {
                this._error = this._error ? new rt(e, this._error) : e;
              }
              return this._iterateCallbacks();
            }
          }
          [tu.dispose]() {
            if ((this._iterateCallbacks(), this._error)) {
              let e = this._error;
              throw ((this._error = void 0), e);
            }
          }
          [Symbol.toStringTag] = "DisposableStack";
        }
        globalThis.DisposableStack;
        let rn = globalThis.AsyncDisposableStack || re;
        function ri(e) {
          return (
            null != e &&
            "object" == typeof e &&
            "function" == typeof e[Symbol.asyncIterator]
          );
        }
        function rs(e, t, r, n) {
          let i = e.raw || e.req || e,
            s = (function (e) {
              let t = (function (e) {
                  if (e.headers?.[":authority"])
                    return e.headers?.[":authority"];
                  if (e.headers?.host) return e.headers?.host;
                  let t = (function (e) {
                    if (e.socket?.localPort) return e.socket?.localPort;
                    let t = e.headers?.[":authority"] || e.headers?.host,
                      r = t?.split(":")?.[1];
                    return r || 80;
                  })(e);
                  if (e.hostname) return e.hostname + ":" + t;
                  let r = e.socket?.localAddress;
                  return !r || r?.includes("::") || r?.includes("ffff")
                    ? "localhost"
                    : `${r}:${t}`;
                })(e),
                r = e.protocol || (e.socket?.encrypted ? "https" : "http"),
                n = e.originalUrl || e.url || "/graphql";
              return `${r}://${t}${n}`;
            })(i);
          if (e.query) {
            let r = new t.URL(s);
            for (let t in e.query) r.searchParams.set(t, e.query[t]);
            s = r.toString();
          }
          let o = e.headers;
          if (e.headers?.[":method"])
            for (let t in ((o = {}), e.headers))
              t.startsWith(":") || (o[t] = e.headers[t]);
          let a = n ? rg() : new AbortController();
          if (r?.once) {
            let e = () => {
              a.signal.aborted ||
                (Object.defineProperty(i, "aborted", { value: !0 }),
                a.abort(r.errored ?? void 0));
            };
            r.once("error", e),
              r.once("close", e),
              r.once("finish", () => {
                r.removeListener("close", e);
              });
          }
          if ("GET" === e.method || "HEAD" === e.method)
            return new t.Request(s, {
              method: e.method,
              headers: o,
              signal: a.signal,
            });
          let l = e.body;
          if (null != l && Object.keys(l).length > 0) {
            if (
              (function (e) {
                let t = e[Symbol.toStringTag];
                return !!(
                  "string" == typeof e ||
                  "Uint8Array" === t ||
                  "Blob" === t ||
                  "FormData" === t ||
                  "URLSearchParams" === t ||
                  ri(e)
                );
              })(l)
            )
              return new t.Request(s, {
                method: e.method || "GET",
                headers: o,
                body: l,
                signal: a.signal,
              });
            let r = new t.Request(s, {
              method: e.method || "GET",
              headers: o,
              signal: a.signal,
            });
            return (
              r.headers.get("content-type")?.includes("json") ||
                r.headers.set(
                  "content-type",
                  "application/json; charset=utf-8",
                ),
              new Proxy(r, {
                get: (e, t, r) => {
                  switch (t) {
                    case "json":
                      return () => F(l);
                    case "text":
                      return () => F(JSON.stringify(l));
                    default:
                      if (globalThis.Bun) return Reflect.get(e, t);
                      return Reflect.get(e, t, r);
                  }
                },
              })
            );
          }
          return new t.Request(s, {
            method: e.method,
            headers: o,
            signal: a.signal,
            body: i,
            duplex: "half",
          });
        }
        function ro(e) {
          return null != e.read;
        }
        function ra(e) {
          return (
            null != e &&
            null != e.setHeader &&
            null != e.end &&
            null != e.once &&
            null != e.write
          );
        }
        function rl(e) {
          e.end(null, null, null);
        }
        function ru(e, t) {
          if (!t.write(e)) return new Promise((e) => t.once("drain", e));
        }
        function rc(...e) {
          let [t, ...r] = e.filter((e) => null != e && "object" == typeof e);
          return (
            r.forEach((e) => {
              let r = Object.getOwnPropertyNames(e).reduce(
                (t, r) => (
                  Object.getOwnPropertyDescriptor(e, r) &&
                    (t[r] = Object.getOwnPropertyDescriptor(e, r)),
                  t
                ),
                {},
              );
              Object.getOwnPropertySymbols(e).forEach((t) => {
                let n = Object.getOwnPropertyDescriptor(e, t);
                n?.enumerable && (r[t] = n);
              }),
                Object.defineProperties(t, r);
            }),
            t
          );
        }
        function rf(e, t) {
          return new t(e.stack || e.message || e.toString(), {
            status: e.status || 500,
          });
        }
        function rh(e, t) {
          return null == e
            ? null == t
              ? {}
              : { waitUntil: t }
            : rc(Object.create(e), { waitUntil: t }, e);
        }
        function rd(e, t) {
          if (t?.aborted) throw t.reason;
          if (L(e) && t) {
            let n = B();
            function r() {
              n.reject(t.reason);
            }
            return (
              t.addEventListener("abort", r, { once: !0 }),
              e
                .then(function (e) {
                  n.resolve(e);
                })
                .catch(function (e) {
                  n.reject(e);
                })
                .finally(() => {
                  t.removeEventListener("abort", r);
                }),
              n.promise
            );
          }
          return e;
        }
        globalThis.SuppressedError, new WeakMap(), new WeakMap();
        let rp = ["SIGINT", "exit", "SIGTERM"],
          ry = new Set(),
          rm = !1;
        class rb extends EventTarget {
          aborted = !1;
          _onabort = null;
          _reason;
          constructor() {
            super();
            let e = globalThis.process?.getBuiltinModule?.("node:events");
            e?.kMaxEventTargetListeners &&
              (this[e.kMaxEventTargetListeners] = 0);
          }
          throwIfAborted() {
            if (this._nativeCtrl?.signal?.throwIfAborted)
              return this._nativeCtrl.signal.throwIfAborted();
            if (this.aborted) throw this._reason;
          }
          _nativeCtrl;
          ensureNativeCtrl() {
            if (!this._nativeCtrl) {
              let e = this.aborted;
              (this._nativeCtrl = new AbortController()),
                e && this._nativeCtrl.abort(this._reason);
            }
            return this._nativeCtrl;
          }
          abort(e) {
            if (this._nativeCtrl?.abort) return this._nativeCtrl?.abort(e);
            (this._reason =
              e ||
              new DOMException("This operation was aborted", "AbortError")),
              (this.aborted = !0),
              this.dispatchEvent(new Event("abort"));
          }
          get signal() {
            return this._nativeCtrl?.signal ? this._nativeCtrl.signal : this;
          }
          get reason() {
            return this._nativeCtrl?.signal
              ? this._nativeCtrl.signal.reason
              : this._reason;
          }
          get onabort() {
            return this._onabort, this._onabort;
          }
          set onabort(e) {
            if (this._nativeCtrl?.signal) {
              this._nativeCtrl.signal.onabort = e;
              return;
            }
            this._onabort && this.removeEventListener("abort", this._onabort),
              (this._onabort = e),
              e && this.addEventListener("abort", e);
          }
        }
        function rg() {
          return globalThis.Bun || globalThis.Deno
            ? new AbortController()
            : new Proxy(new rb(), {
                get(e, t, r) {
                  if (t.toString().includes("kDependantSignals")) {
                    let r = e.ensureNativeCtrl();
                    return Reflect.get(r.signal, t, r.signal);
                  }
                  return Reflect.get(e, t, r);
                },
                set(e, t, r, n) {
                  if (t.toString().includes("kDependantSignals")) {
                    let n = e.ensureNativeCtrl();
                    return Reflect.set(n.signal, t, r, n.signal);
                  }
                  return Reflect.set(e, t, r, n);
                },
                getPrototypeOf: () => AbortSignal.prototype,
              });
        }
        let r_ = {};
        function rv(e) {
          return e instanceof p.GraphQLError;
        }
        function rT(e) {
          return (
            e instanceof p.GraphQLError &&
            (null == e.originalError || rT(e.originalError))
          );
        }
        function rE(e) {
          return (
            "object" == typeof e &&
            e?.constructor?.name === "DOMException" &&
            ("AbortError" === e.name || "TimeoutError" === e.name)
          );
        }
        function rx(e, t, r) {
          let n = new Set();
          if (null != e && "object" == typeof e && "errors" in e)
            for (let i of e.errors) for (let e of rx(i, t, r)) n.add(e);
          else if (rE(e)) r.debug("Request aborted");
          else if (t) {
            let i = t.maskError(e, t.errorMessage, t.isDev);
            i !== e && r.error(e),
              n.add(rv(i) ? i : J(i.message, { originalError: i }));
          } else
            rv(e)
              ? n.add(e)
              : e instanceof Error
                ? n.add(J(e.message, { originalError: e }))
                : "string" == typeof e
                  ? n.add(
                      J(e, {
                        extensions: {
                          code: "INTERNAL_SERVER_ERROR",
                          unexpected: !0,
                        },
                      }),
                    )
                  : null != e && "function" == typeof e.toString
                    ? n.add(
                        J(e.toString(), {
                          extensions: {
                            code: "INTERNAL_SERVER_ERROR",
                            unexpected: !0,
                          },
                        }),
                      )
                    : (r.error(e),
                      n.add(
                        J("Unexpected error.", {
                          extensions: { http: { unexpected: !0 } },
                        }),
                      ));
          return Array.from(n);
        }
        function rw(e, t = {}, r = !1) {
          let n,
            i = !1;
          if (
            ("extensions" in e &&
              e.extensions?.http &&
              (e.extensions.http.headers &&
                Object.assign(t, e.extensions.http.headers),
              e.extensions.http.status && (n = e.extensions.http.status)),
            "errors" in e && e.errors?.length)
          )
            for (let s of e.errors)
              if (s.extensions?.http) {
                if (
                  (s.extensions.http.headers &&
                    Object.assign(t, s.extensions.http.headers),
                  r && s.extensions.http.spec)
                )
                  continue;
                s.extensions.http.status &&
                  (!n || s.extensions.http.status > n) &&
                  (n = s.extensions.http.status);
              } else (!rT(s) || s.extensions?.unexpected) && (i = !0);
          else n ||= 200;
          return (
            n || (n = !i || "data" in e ? 200 : 500), { status: n, headers: t }
          );
        }
        function rS(e) {
          let t = e.get("operationName") || void 0,
            r = e.get("query") || void 0,
            n = e.get("variables") || void 0,
            i = e.get("extensions") || void 0;
          return {
            operationName: t,
            query: r,
            variables: n ? JSON.parse(n) : void 0,
            extensions: i ? JSON.parse(i) : void 0,
          };
        }
        function rP(e) {
          return rS(new t5.URLSearchParams(e));
        }
        function rO(e, t) {
          let r = e.headers.get("content-type");
          return (
            (r = r?.split(",")[0] || null) === t || !!r?.startsWith(`${t};`)
          );
        }
        function rI(e) {
          return "GET" === e.method;
        }
        function rk(e) {
          let t = e.url.substring(e.url.indexOf("?") + 1);
          return rS(new t5.URLSearchParams(t));
        }
        function rC(e) {
          return (
            "POST" === e.method && rO(e, "application/x-www-form-urlencoded")
          );
        }
        function rR(e) {
          return e.text().then(rP);
        }
        function rA(e) {
          return "POST" === e.method && rO(e, "application/graphql");
        }
        function rN(e) {
          return e.text().then((e) => ({ query: e }));
        }
        function rD(e) {
          return (
            "POST" === e.method &&
            (rO(e, "application/json") || rO(e, "application/graphql+json"))
          );
        }
        function rL(e) {
          return j(
            () => e.json(),
            (e) => {
              if (null == e)
                throw J(
                  `POST body is expected to be object but received ${e}`,
                  {
                    extensions: { http: { status: 400 }, code: "BAD_REQUEST" },
                  },
                );
              let t = typeof e;
              if ("object" !== t)
                throw J(
                  `POST body is expected to be object but received ${t}`,
                  {
                    extensions: { http: { status: 400 }, code: "BAD_REQUEST" },
                  },
                );
              return e;
            },
            (e) => {
              if (e instanceof p.GraphQLError) throw e;
              let t = { http: { spec: !0, status: 400 }, code: "BAD_REQUEST" };
              throw (
                (e instanceof Error &&
                  (t.originalError = { name: e.name, message: e.message }),
                J("POST body sent invalid JSON.", { extensions: t }))
              );
            },
          );
        }
        function rj(e) {
          return "POST" === e.method && rO(e, "multipart/form-data");
        }
        function rF(e) {
          return j(
            () => e.formData(),
            (e) => {
              let t,
                r = e.get("operations");
              if (!r) throw J('Missing multipart form field "operations"');
              if ("string" != typeof r)
                throw J('Multipart form field "operations" must be a string');
              try {
                t = JSON.parse(r);
              } catch {
                throw J(
                  'Multipart form field "operations" must be a valid JSON string',
                );
              }
              let n = e.get("map");
              if (null != n) {
                let r;
                if ("string" != typeof n)
                  throw J('Multipart form field "map" must be a string');
                try {
                  r = JSON.parse(n);
                } catch {
                  throw J(
                    'Multipart form field "map" must be a valid JSON string',
                  );
                }
                for (let n in r) {
                  let i = e.get(n);
                  for (let e of r[n])
                    !(function (e, t, r) {
                      t.split && (t = t.split("."));
                      for (
                        var n, i, s = 0, o = t.length, a = e;
                        s < o &&
                        "__proto__" != (i = "" + t[s++]) &&
                        "constructor" !== i &&
                        "prototype" !== i;

                      )
                        a = a[i] =
                          s === o
                            ? r
                            : typeof (n = a[i]) == typeof t
                              ? n
                              : 0 * t[s] != 0 || ~("" + t[s]).indexOf(".")
                                ? {}
                                : [];
                    })(t, e, i);
                }
              }
              return t;
            },
            (e) => {
              if (
                e instanceof Error &&
                e.message.startsWith("File size limit exceeded: ")
              )
                throw J(e.message, { extensions: { http: { status: 413 } } });
              throw e;
            },
          );
        }
        let rB = new Set(["query", "variables", "operationName", "extensions"]);
        function rU(e) {
          return null === e ? "null" : Array.isArray(e) ? "array" : typeof e;
        }
        let rM = (e) =>
          '<!doctype html><html lang=en><head><meta charset=utf-8><title>__TITLE__</title><link rel=icon href=https://raw.githubusercontent.com/graphql-hive/graphql-yoga/main/website/public/favicon.ico><link crossorigin rel=stylesheet href=https://unpkg.com/@graphql-yoga/graphiql@4.3.5/dist/graphiql.css></head><body id=body class=no-focus-outline><noscript>You need to enable JavaScript to run this app.</noscript><div id=root></div><script type=module>import{renderYogaGraphiQL}from"https://unpkg.com/@graphql-yoga/graphiql@4.3.5/dist/yoga-graphiql.es.js";renderYogaGraphiQL(root,__OPTS__)<\/script></body></html>'
            .replace("__TITLE__", e?.title || "Yoga GraphiQL")
            .replace("__OPTS__", JSON.stringify(e ?? {}));
        var rq = r(56838);
        function r$({ max: e = 1024, ttl: t = 36e5 } = {}) {
          return new rq.q({ max: e, ttl: t });
        }
        let rG = () => !0;
        function rH(e) {
          let t = e.match || rG;
          return {
            onRequestParse({ request: r, setRequestParser: n }) {
              t(r) && n(e.parse);
            },
          };
        }
        function rK(e) {
          if (Array.isArray(e))
            return `[${e
              .map((e) => {
                let t = rV(e);
                return (e.stringify || JSON.stringify)(t);
              })
              .join(",")}]`;
          let t = rV(e);
          return (e.stringify || JSON.stringify)(t);
        }
        function rV(e) {
          if (e.errors?.length || e.extensions?.http) {
            let t = { ...e };
            if (
              ((t.errors &&= t.errors.map(function e(t) {
                if (rv(t)) {
                  let {
                    http: r,
                    unexpected: n,
                    ...i
                  } = ("toJSON" in t && "function" == typeof t.toJSON
                    ? t.toJSON()
                    : Object(t)
                  ).extensions || {};
                  return J(t.message, {
                    nodes: t.nodes,
                    source: t.source,
                    positions: t.positions,
                    path: t.path,
                    originalError: e(t.originalError || void 0),
                    extensions: Object.keys(i).length ? i : void 0,
                  });
                }
                return t;
              })),
              t.extensions)
            ) {
              let { http: r, ...n } = e.extensions;
              t.extensions = Object.keys(n).length ? n : void 0;
            }
            return t;
          }
          return e;
        }
        let rQ = {
            mediaTypes: ["multipart/mixed"],
            asyncIterables: !0,
            processResult: function (e, t) {
              let r,
                n = rw(e, {
                  Connection: "keep-alive",
                  "Content-Type": 'multipart/mixed; boundary="-"',
                  "Transfer-Encoding": "chunked",
                }),
                i = new t.TextEncoder(),
                s = new t.ReadableStream({
                  start(t) {
                    if (eJ(e)) r = e[Symbol.asyncIterator]();
                    else {
                      let t = !1;
                      r = {
                        next: () =>
                          t
                            ? F({ done: !0, value: null })
                            : ((t = !0), F({ done: !1, value: e })),
                      };
                    }
                    t.enqueue(i.encode("\r\n")), t.enqueue(i.encode("---"));
                  },
                  pull: (e) =>
                    j(
                      () => r.next(),
                      ({ done: t, value: r }) => {
                        if (null != r) {
                          e.enqueue(i.encode("\r\n")),
                            e.enqueue(
                              i.encode(
                                "Content-Type: application/json; charset=utf-8",
                              ),
                            ),
                            e.enqueue(i.encode("\r\n"));
                          let t = rK(r),
                            n = i.encode(t);
                          e.enqueue(
                            i.encode("Content-Length: " + n.byteLength),
                          ),
                            e.enqueue(i.encode("\r\n")),
                            e.enqueue(i.encode("\r\n")),
                            e.enqueue(n),
                            e.enqueue(i.encode("\r\n")),
                            e.enqueue(i.encode("---"));
                        }
                        t && (e.enqueue(i.encode("--\r\n")), e.close());
                      },
                      (t) => {
                        e.error(t);
                      },
                    ),
                  cancel(e) {
                    if (r.return)
                      return j(
                        () => r.return?.(e),
                        () => {},
                      );
                  },
                });
              return new t.Response(s, n);
            },
          },
          rW = {
            mediaTypes: [
              "application/graphql-response+json",
              "application/json",
            ],
            asyncIterables: !1,
            processResult: function (e, t, r) {
              var n;
              if (tl(e))
                return new t.Response(null, {
                  status: 406,
                  statusText: "Not Acceptable",
                  headers: {
                    accept:
                      "application/json; charset=utf-8, application/graphql-response+json; charset=utf-8",
                  },
                });
              let i = rw(
                  e,
                  { "Content-Type": r + "; charset=utf-8" },
                  "application/json" === r &&
                    !Array.isArray(e) &&
                    Array.isArray((n = e.errors)) &&
                    n.length > 0 &&
                    n.some(rv) &&
                    e.errors.some(
                      (e) =>
                        !e.extensions?.originalError ||
                        rv(e.extensions.originalError),
                    ),
                ),
                s = rK(e);
              return new t.Response(s, i);
            },
          },
          rz = (e) => {
            if (null == e) return {};
            if ((0, p.isSchema)(e))
              return {
                onPluginInit({ setSchema: t }) {
                  t(e);
                },
              };
            if ("then" in e) {
              let t;
              return {
                onRequestParse: () => ({
                  onRequestParseDone() {
                    if (!t)
                      return j(
                        () => e,
                        (e) => {
                          t = e;
                        },
                      );
                  },
                }),
                onEnveloped({ setSchema: e }) {
                  if (!t)
                    throw Error(
                      "You provide a promise of a schema but it hasn't been resolved yet. Make sure you use this plugin with GraphQL Yoga.",
                    );
                  e(t);
                },
              };
            }
            let t = new WeakMap();
            return {
              onRequestParse: ({ request: r, serverContext: n }) => ({
                onRequestParseDone: () =>
                  j(
                    () => e({ ...n, request: r }),
                    (e) => {
                      t.set(r, e);
                    },
                  ),
              }),
              onEnveloped({ setSchema: e, context: r }) {
                if (r?.request == null)
                  throw Error(
                    "Request object is not available in the context. Make sure you use this plugin with GraphQL Yoga.",
                  );
                let n = t.get(r.request);
                if (null == n)
                  throw Error(
                    "No schema found for this request. Make sure you use this plugin with GraphQL Yoga.",
                  );
                e(n);
              },
            };
          },
          rY = function (e) {
            return new e.fetchAPI.Response(
              '<!doctype html><html lang=en><head><meta charset=utf-8><title>Welcome to GraphQL Yoga</title><link rel=icon href=https://raw.githubusercontent.com/graphql-hive/graphql-yoga/main/website/public/favicon.ico><style>body,html{padding:0;margin:0;height:100%;font-family:Inter,-apple-system,BlinkMacSystemFont,\'Segoe UI\',Roboto,Oxygen,Ubuntu,Cantarell,\'Fira Sans\',\'Droid Sans\',\'Helvetica Neue\',sans-serif;color:#fff;background-color:#000}main>section.hero{display:flex;height:90vh;justify-content:center;align-items:center;flex-direction:column}.logo{display:flex;align-items:center}.buttons{margin-top:24px}h1{font-size:80px}h2{color:#888;max-width:50%;margin-top:0;text-align:center}a{color:#fff;text-decoration:none;margin-left:10px;margin-right:10px;font-weight:700;transition:color .3s ease;padding:4px;overflow:visible}a.graphiql:hover{color:rgba(255,0,255,.7)}a.docs:hover{color:rgba(28,200,238,.7)}a.tutorial:hover{color:rgba(125,85,245,.7)}svg{margin-right:24px}.not-what-your-looking-for{margin-top:5vh}.not-what-your-looking-for>*{margin-left:auto;margin-right:auto}.not-what-your-looking-for>p{text-align:center}.not-what-your-looking-for>h2{color:#464646}.not-what-your-looking-for>p{max-width:600px;line-height:1.3em}.not-what-your-looking-for>pre{max-width:300px}</style></head><body id=body><main><section class=hero><div class=logo><div><svg xmlns=http://www.w3.org/2000/svg viewBox="-0.41 0.445 472.812 499.811" height=150><defs><linearGradient id=paint0_linear_1677_11483 x1=16 y1=14 x2=87.2132 y2=44.5982 gradientUnits=userSpaceOnUse gradientTransform="matrix(8.139854, 0, 0, 8.139854, -130.346407, -113.25101)"><stop stop-color=#7433FF /><stop offset=1 stop-color=#FFA3FD /></linearGradient><linearGradient id=paint1_linear_1677_11483 x1=16 y1=14 x2=87.2132 y2=44.5982 gradientUnits=userSpaceOnUse gradientTransform="matrix(8.139854, 0, 0, 8.139854, -130.346407, -113.25101)"><stop stop-color=#7433FF /><stop offset=1 stop-color=#FFA3FD /></linearGradient><linearGradient id=paint2_linear_1677_11483 x1=16 y1=14 x2=87.2132 y2=44.5982 gradientUnits=userSpaceOnUse gradientTransform="matrix(8.139854, 0, 0, 8.139854, -130.346407, -113.25101)"><stop stop-color=#7433FF /><stop offset=1 stop-color=#FFA3FD /></linearGradient><linearGradient id=paint3_linear_1677_11483 x1=16 y1=14 x2=87.2132 y2=44.5982 gradientUnits=userSpaceOnUse><stop stop-color=#7433FF /><stop offset=1 stop-color=#FFA3FD /></linearGradient><linearGradient id=paint4_linear_1677_11483 x1=16 y1=14 x2=87.2132 y2=44.5982 gradientUnits=userSpaceOnUse><stop stop-color=#7433FF /><stop offset=1 stop-color=#FFA3FD /></linearGradient><linearGradient id=paint5_linear_1677_11483 x1=16 y1=14 x2=87.2132 y2=44.5982 gradientUnits=userSpaceOnUse><stop stop-color=#7433FF /><stop offset=1 stop-color=#FFA3FD /></linearGradient><filter id=filter0_f_1677_11483 x=23 y=-25 width=100 height=100 filterUnits=userSpaceOnUse color-interpolation-filters=sRGB><feFlood flood-opacity=0 result=BackgroundImageFix /><feBlend mode=normal in=SourceGraphic in2=BackgroundImageFix result=shape /><feGaussianBlur stdDeviation=12 result=effect1_foregroundBlur_1677_11483 /></filter><filter id=filter1_f_1677_11483 x=-24 y=19 width=100 height=100 filterUnits=userSpaceOnUse color-interpolation-filters=sRGB><feFlood flood-opacity=0 result=BackgroundImageFix /><feBlend mode=normal in=SourceGraphic in2=BackgroundImageFix result=shape /><feGaussianBlur stdDeviation=12 result=effect1_foregroundBlur_1677_11483 /></filter><linearGradient id=paint6_linear_1677_11483 x1=30 y1=28 x2=66.1645 y2=44.4363 gradientUnits=userSpaceOnUse gradientTransform="matrix(8.139854, 0, 0, 8.139854, -130.346407, -113.25101)"><stop stop-color=#7433FF /><stop offset=1 stop-color=#FFA3FD /></linearGradient><filter id=filter2_f_1677_11483 x=-12 y=-44 width=100 height=100 filterUnits=userSpaceOnUse color-interpolation-filters=sRGB><feFlood flood-opacity=0 result=BackgroundImageFix /><feBlend mode=normal in=SourceGraphic in2=BackgroundImageFix result=shape /><feGaussianBlur stdDeviation=12 result=effect1_foregroundBlur_1677_11483 /></filter><filter id=filter3_f_1677_11483 x=13 y=19 width=100 height=100 filterUnits=userSpaceOnUse color-interpolation-filters=sRGB><feFlood flood-opacity=0 result=BackgroundImageFix /><feBlend mode=normal in=SourceGraphic in2=BackgroundImageFix result=shape /><feGaussianBlur stdDeviation=12 result=effect1_foregroundBlur_1677_11483 /></filter></defs><mask id=mask0_1677_11483 style=mask-type:alpha maskUnits=userSpaceOnUse x=16 y=14 width=58 height=62><path d="M21 25.3501C21.7279 25.3501 22.4195 25.5056 23.0433 25.7853L42.1439 14.8C43.0439 14.3 44.1439 14 45.1439 14C46.2439 14 47.2439 14.3 48.1439 14.8L64.5439 24.3C63.3439 25.1 62.4439 26.3 61.8439 27.7L45.9438 18.5C45.6439 18.3 45.344 18.3 45.0441 18.3C44.7441 18.3 44.4439 18.4 44.1439 18.5L25.8225 29.0251C25.9382 29.4471 26 29.8914 26 30.3501C26 33.1115 23.7614 35.3501 21 35.3501C18.2386 35.3501 16 33.1115 16 30.3501C16 27.5887 18.2386 25.3501 21 25.3501Z" fill=url(#paint3_linear_1677_11483) /><path d="M67.2438 35.0329C65.3487 34.3219 64 32.4934 64 30.35C64 27.5886 66.2386 25.35 69 25.35C71.7614 25.35 74 27.5886 74 30.35C74 32.1825 73.0142 33.7848 71.5439 34.6554V55.2C71.5439 57.4 70.3439 59.4 68.5439 60.5L52.1439 69.9C52.1439 68.4 51.6438 66.9 50.7438 65.8L66.3439 56.8C66.9439 56.5 67.2438 55.9 67.2438 55.2V35.0329Z" fill=url(#paint4_linear_1677_11483) /><path d="M49.8439 69.1055C49.9458 69.5034 50 69.9204 50 70.3501C50 73.1115 47.7614 75.3501 45 75.3501C42.5102 75.3501 40.4454 73.5302 40.0633 71.1481L21.8439 60.6C19.9439 59.5 18.8439 57.5 18.8439 55.3V36.8C19.5439 37 20.3439 37.2 21.0439 37.2C21.7439 37.2 22.4439 37.1 23.0439 36.9V55.3C23.0439 56 23.4438 56.6 23.9438 56.9L41.3263 66.9583C42.2398 65.9694 43.5476 65.3501 45 65.3501C47.3291 65.3501 49.2862 66.9426 49.8419 69.0981L49.8436 69.0997L49.8439 69.1055Z" fill=url(#paint5_linear_1677_11483) /></mask><mask id=mask1_1677_11483 style=mask-type:alpha maskUnits=userSpaceOnUse x=30 y=28 width=30 height=30><path fill-rule=evenodd clip-rule=evenodd d="M49.3945 32.3945C49.3945 34.7088 47.5796 38.5469 45 38.5469C42.4271 38.5469 40.6055 34.7112 40.6055 32.3945C40.6055 29.9714 42.5769 28 45 28C47.4231 28 49.3945 29.9714 49.3945 32.3945ZM35.332 49.0433V48.2148C35.332 42.8117 37.8535 41.0004 39.8796 39.545L39.8801 39.5447C40.3928 39.1767 40.8604 38.8404 41.2488 38.4742C42.3293 39.6642 43.626 40.3047 45 40.3047C46.3752 40.3047 47.6725 39.6642 48.7529 38.4754C49.1408 38.841 49.6078 39.1773 50.1199 39.5447L50.1204 39.545C52.1465 41.0004 54.668 42.8117 54.668 48.2148V49.0433L53.8406 49.092C49.9848 49.3185 46.8646 46.9002 45 43.5777C43.1159 46.935 39.9847 49.318 36.1594 49.092L35.332 49.0433ZM58.1463 51.0747L58.1463 51.0746C57.0179 50.891 50.0128 49.7507 45.0007 55.693C40.0116 49.7553 33.1965 50.8592 31.9095 51.0677L31.9095 51.0677C31.7906 51.087 31.7189 51.0986 31.7002 51.0963C31.7005 51.0969 31.7011 51.1045 31.7023 51.1187C31.726 51.4003 31.9682 54.2745 34.0566 56.2422L30 58H60L55.8956 56.2422C57.8537 54.4764 58.1396 52.2685 58.2508 51.4092V51.4091C58.2697 51.2628 58.2836 51.1556 58.2998 51.0963C58.2881 51.0977 58.2356 51.0892 58.1463 51.0747ZM40.4836 50.104C42.3956 49.3212 43.6746 48.1737 45 46.61C46.332 48.1841 47.6159 49.3259 49.5164 50.104C49.5356 50.1425 49.5557 50.1805 49.5756 50.2182C49.5793 50.2253 49.583 50.2323 49.5867 50.2393C48.0911 50.8127 46.4264 51.825 45.0047 53.1444C43.5906 51.8221 41.9673 50.8196 40.4256 50.2153C40.4455 50.1784 40.4648 50.1415 40.4836 50.104Z" fill=black /></mask><path d="M 40.59 93.095 C 46.517 93.095 52.14 94.365 57.22 96.635 L 212.7 7.22 C 220.025 3.149 228.978 0.706 237.12 0.706 C 246.073 0.706 254.213 3.149 261.54 7.22 L 395.032 84.547 C 385.264 91.059 377.939 100.827 373.055 112.224 L 243.631 37.338 C 241.19 35.71 238.747 35.71 236.305 35.71 C 233.863 35.71 231.42 36.523 228.978 37.338 L 79.84 123.009 C 80.786 126.443 81.29 130.058 81.29 133.793 C 81.29 156.269 63.065 174.493 40.59 174.493 C 18.116 174.493 -0.109 156.269 -0.109 133.793 C -0.109 111.32 18.116 93.095 40.59 93.095 Z" fill=url(#paint0_linear_1677_11483) /><path d="M 417.01 171.913 C 401.585 166.126 390.603 151.238 390.603 133.793 C 390.603 111.32 408.83 93.095 431.303 93.095 C 453.777 93.095 472.001 111.32 472.001 133.793 C 472.001 148.706 463.976 161.755 452.011 168.835 L 452.011 336.07 C 452.011 353.977 442.243 370.258 427.591 379.21 L 294.098 455.726 C 294.098 443.516 290.029 431.306 282.703 422.353 L 409.683 349.093 C 414.568 346.651 417.01 341.767 417.01 336.07 L 417.01 171.913 Z" fill=url(#paint1_linear_1677_11483) /><path d="M 275.376 449.253 C 276.206 452.495 276.646 455.889 276.646 459.389 C 276.646 481.863 258.422 500.087 235.947 500.087 C 215.679 500.087 198.87 485.272 195.761 465.883 L 47.46 380.025 C 31.995 371.071 23.041 354.792 23.041 336.884 L 23.041 186.296 C 28.738 187.923 35.25 189.553 40.948 189.553 C 46.646 189.553 52.345 188.738 57.228 187.111 L 57.228 336.884 C 57.228 342.582 60.485 347.465 64.554 349.908 L 206.042 431.777 C 213.481 423.728 224.127 418.689 235.947 418.689 C 254.905 418.689 270.833 431.656 275.36 449.196 L 275.376 449.214 L 275.376 449.253 Z" fill=url(#paint2_linear_1677_11483) /><g mask=url(#mask0_1677_11483) transform="matrix(8.139854, 0, 0, 8.139854, -130.346375, -113.251038)"><g filter=url(#filter0_f_1677_11483)><circle cx=73 cy=25 r=26 fill=#ED2E7E /></g><g filter=url(#filter1_f_1677_11483)><circle cx=26 cy=69 r=26 fill=#1CC8EE /></g></g><path fill-rule=evenodd clip-rule=evenodd d="M 271.713 150.431 C 271.713 169.275 256.948 200.517 235.947 200.517 C 215.003 200.517 200.172 169.292 200.172 150.431 C 200.172 130.708 216.225 114.666 235.947 114.666 C 255.67 114.666 271.713 130.708 271.713 150.431 Z M 157.251 285.952 L 157.251 279.212 C 157.251 235.233 177.771 220.485 194.27 208.641 C 198.447 205.644 202.247 202.901 205.414 199.923 C 214.204 209.608 224.763 214.826 235.947 214.826 C 247.138 214.826 257.697 209.608 266.496 199.931 C 269.653 202.911 273.456 205.644 277.622 208.641 C 294.114 220.485 314.642 235.233 314.642 279.212 L 314.642 285.952 L 307.912 286.351 C 276.525 288.191 251.128 268.509 235.947 241.468 C 220.611 268.795 195.126 288.191 163.981 286.351 L 157.251 285.952 Z M 342.953 302.492 C 333.771 300.994 276.751 291.715 235.955 340.082 C 195.345 291.749 139.865 300.734 129.389 302.436 C 128.428 302.59 127.841 302.688 127.687 302.665 C 127.687 302.673 127.695 302.729 127.702 302.85 C 127.897 305.138 129.867 328.532 146.872 344.55 L 113.849 358.862 L 358.044 358.862 L 324.639 344.55 C 340.576 330.177 342.905 312.202 343.807 305.212 C 343.962 304.022 344.077 303.153 344.206 302.665 C 344.108 302.68 343.686 302.606 342.953 302.492 Z M 199.188 294.59 C 214.751 288.215 225.161 278.879 235.947 266.15 C 246.788 278.96 257.241 288.255 272.707 294.59 C 272.869 294.898 273.031 295.207 273.196 295.518 C 273.219 295.574 273.252 295.631 273.285 295.688 C 261.107 300.361 247.555 308.598 235.989 319.334 C 224.477 308.573 211.258 300.417 198.715 295.493 C 198.87 295.191 199.033 294.891 199.188 294.59 Z" fill=url(#paint6_linear_1677_11483) /><g mask=url(#mask1_1677_11483) transform="matrix(8.139854, 0, 0, 8.139854, -130.346375, -113.251038)"><g filter=url(#filter2_f_1677_11483)><circle cx=38 cy=6 r=26 fill=#ED2E7E /></g><g filter=url(#filter3_f_1677_11483)><circle cx=63 cy=69 r=26 fill=#1CC8EE /></g></g></svg></div><h1>GraphQL Yoga</h1><p>Version: 5.13.5</p></div><h2>The batteries-included cross-platform GraphQL Server.</h2><div class=buttons><a href=https://www.the-guild.dev/graphql/yoga-server/docs class=docs>Read the Docs</a> <a href=https://www.the-guild.dev/graphql/yoga-server/tutorial/basic class=tutorial>Start the Tutorial </a><a href=__GRAPHIQL_LINK__ class=graphiql>Visit GraphiQL</a></div></section><section class=not-what-your-looking-for><h2>Not the page you are looking for? \uD83D\uDC40</h2><p>This page is shown be default whenever a 404 is hit.<br>You can disable this by behavior via the <code>landingPage</code> option.</p><pre>\n          <code>\nimport { createYoga } from \'graphql-yoga\';\n\nconst yoga = createYoga({\n  landingPage: false\n})\n          </code>\n        </pre><p>If you expected this page to be the GraphQL route, you need to configure Yoga. Currently, the GraphQL route is configured to be on <code>__GRAPHIQL_LINK__</code>.</p><pre>\n          <code>\nimport { createYoga } from \'graphql-yoga\';\n\nconst yoga = createYoga({\n  graphqlEndpoint: \'__REQUEST_PATH__\',\n})\n          </code>\n        </pre></section></main></body></html>'
                .replace(/__GRAPHIQL_LINK__/g, e.graphqlEndpoint)
                .replace(/__REQUEST_PATH__/g, e.url.pathname),
              {
                status: 200,
                statusText: "OK",
                headers: { "Content-Type": "text/html" },
              },
            );
          };
        function rJ({
          request: e,
          result: t,
          fetchAPI: r,
          onResultProcessHooks: n,
          serverContext: i,
        }) {
          let s,
            o = [],
            a = "*/*";
          return j(
            () =>
              U(n, (r) =>
                r({
                  request: e,
                  acceptableMediaTypes: o,
                  result: t,
                  setResult(e) {
                    t = e;
                  },
                  resultProcessor: s,
                  setResultProcessor(e, t) {
                    (s = e), (a = t);
                  },
                  serverContext: i,
                }),
              ),
            () =>
              s
                ? s(t, r, a)
                : new r.Response(null, {
                    status: 406,
                    statusText: "Not Acceptable",
                    headers: { accept: o.join("; charset=utf-8, ") },
                  }),
          );
        }
        function rX(e) {
          return rv(e)
            ? e.toJSON()
            : e instanceof Error
              ? { message: e.message, stack: e.stack, cause: e.cause }
              : e;
        }
        let rZ = (
          e,
          t,
          r = globalThis.process?.env?.NODE_ENV === "development",
        ) => {
          if (rT(e)) return e;
          let n = { code: "INTERNAL_SERVER_ERROR", unexpected: !0 },
            i = { extensions: n };
          return (
            rv(e)
              ? ((i.nodes = e.nodes),
                (i.source = e.source),
                (i.positions = e.positions),
                (i.path = e.path),
                r && e.originalError && (n.originalError = rX(e.originalError)),
                e.extensions?.http && (n.http = e.extensions.http))
              : r && (n.originalError = rX(e)),
            J(t, i)
          );
        };
        class r0 {
          getEnveloped;
          logger;
          graphqlEndpoint;
          fetchAPI;
          plugins;
          instrumentation;
          onRequestParseHooks;
          onParamsHooks;
          onExecutionResultHooks;
          onResultProcessHooks;
          maskedErrorsOpts;
          id;
          version = "5.13.5";
          constructor(e) {
            if (
              ((this.id = e?.id ?? "yoga"),
              (this.fetchAPI = { ...t7 }),
              e?.fetchAPI)
            )
              for (let t in e.fetchAPI)
                e.fetchAPI[t] && (this.fetchAPI[t] = e.fetchAPI[t]);
            let t = e?.logging == null || e.logging;
            this.logger =
              "boolean" == typeof t
                ? !0 === t
                  ? t2()
                  : t2("silent")
                : "string" == typeof t
                  ? t2(t)
                  : t;
            let r =
                ("object" == typeof e?.maskedErrors &&
                  e.maskedErrors.maskError) ||
                rZ,
              n = new WeakSet();
            this.maskedErrorsOpts =
              e?.maskedErrors === !1
                ? null
                : {
                    errorMessage: "Unexpected error.",
                    ...("object" == typeof e?.maskedErrors
                      ? e.maskedErrors
                      : {}),
                    maskError: (e, t) => {
                      if (n.has(e)) return e;
                      let i = r(e, t, this.maskedErrorsOpts?.isDev);
                      return i !== e && this.logger.error(e), n.add(i), i;
                    },
                  };
            let i =
                null == this.maskedErrorsOpts ? null : this.maskedErrorsOpts,
              s = 0;
            e?.batching &&
              (s =
                "boolean" == typeof e.batching ? 10 : (e.batching.limit ?? 10)),
              (this.graphqlEndpoint = e?.graphqlEndpoint || "/graphql");
            let o = this.graphqlEndpoint;
            for (let t of ((this.plugins = [
              eQ({
                parse: p.parse,
                validate: p.validate,
                execute: tK,
                subscribe: tK,
                specifiedRules: p.specifiedRules,
              }),
              !!e?.schema && rz(e.schema),
              e?.context != null &&
                eW((t) =>
                  e?.context
                    ? "function" == typeof e.context
                      ? e.context(t)
                      : e.context
                    : {},
                ),
              (function ({
                id: e = Date.now().toString(),
                logger: t = console,
                endpoint: r = "/health",
              } = {}) {
                return {
                  onRequest({ endResponse: n, fetchAPI: i, request: s }) {
                    s.url.endsWith(r) &&
                      (t.debug("Responding Health Check"),
                      n(
                        new i.Response(null, {
                          status: 200,
                          headers: { "x-yoga-id": e },
                        }),
                      ));
                  },
                };
              })({
                id: this.id,
                logger: this.logger,
                endpoint: e?.healthCheckEndpoint,
              }),
              e?.cors !== !1 &&
                (function (e) {
                  let t = () => ({});
                  if (null != e)
                    if ("function" == typeof e) t = e;
                    else if ("object" == typeof e) {
                      let r = { ...e };
                      t = () => r;
                    } else !1 === e && (t = () => !1);
                  return {
                    onRequest({ request: e, fetchAPI: t, endResponse: r }) {
                      "OPTIONS" === e.method.toUpperCase() &&
                        r(
                          new t.Response(null, {
                            status: 204,
                            headers: { "Content-Length": "0" },
                          }),
                        );
                    },
                    onResponse: ({
                      request: e,
                      serverContext: r,
                      response: n,
                    }) =>
                      j(
                        () => {
                          var n;
                          return (
                            (n = t),
                            j(
                              () => n(e, r),
                              (t) =>
                                (function (e, t) {
                                  let r = e.headers.get("origin");
                                  if (!1 === t || null == r) return null;
                                  let n = {};
                                  if (
                                    (null == t.origin ||
                                    0 === t.origin.length ||
                                    t.origin.includes("*")
                                      ? ((n["Access-Control-Allow-Origin"] = r),
                                        (n.Vary = "Origin"))
                                      : "string" == typeof t.origin
                                        ? (n["Access-Control-Allow-Origin"] =
                                            t.origin)
                                        : Array.isArray(t.origin) &&
                                          (1 === t.origin.length
                                            ? (n[
                                                "Access-Control-Allow-Origin"
                                              ] = t.origin[0])
                                            : t.origin.includes(r)
                                              ? ((n[
                                                  "Access-Control-Allow-Origin"
                                                ] = r),
                                                (n.Vary = "Origin"))
                                              : (n[
                                                  "Access-Control-Allow-Origin"
                                                ] = "null")),
                                    t.methods?.length)
                                  )
                                    n["Access-Control-Allow-Methods"] =
                                      t.methods.join(", ");
                                  else {
                                    let t = e.headers.get(
                                      "access-control-request-method",
                                    );
                                    t &&
                                      (n["Access-Control-Allow-Methods"] = t);
                                  }
                                  if (t.allowedHeaders?.length)
                                    n["Access-Control-Allow-Headers"] =
                                      t.allowedHeaders.join(", ");
                                  else {
                                    let t = e.headers.get(
                                      "access-control-request-headers",
                                    );
                                    t &&
                                      ((n["Access-Control-Allow-Headers"] = t),
                                      n.Vary
                                        ? (n.Vary +=
                                            ", Access-Control-Request-Headers")
                                        : (n.Vary =
                                            "Access-Control-Request-Headers"));
                                  }
                                  return (
                                    null != t.credentials
                                      ? !0 === t.credentials &&
                                        (n["Access-Control-Allow-Credentials"] =
                                          "true")
                                      : "*" !==
                                          n["Access-Control-Allow-Origin"] &&
                                        (n["Access-Control-Allow-Credentials"] =
                                          "true"),
                                    t.exposedHeaders &&
                                      (n["Access-Control-Expose-Headers"] =
                                        t.exposedHeaders.join(", ")),
                                    t.maxAge &&
                                      (n["Access-Control-Max-Age"] =
                                        t.maxAge.toString()),
                                    n
                                  );
                                })(e, t),
                            )
                          );
                        },
                        (e) => {
                          if (null != e)
                            for (let t in e) n.headers.set(t, e[t]);
                        },
                      ),
                  };
                })(e?.cors),
              e?.graphiql !== !1 &&
                (function (e) {
                  let t,
                    r,
                    n = e.logger ?? console;
                  t =
                    "function" == typeof e?.options
                      ? e?.options
                      : "object" == typeof e?.options
                        ? () => e?.options
                        : e?.options === !1
                          ? () => !1
                          : () => ({});
                  let i = e?.render ?? rM,
                    s = ({ URLPattern: t }) =>
                      (r ||= new t({ pathname: e.graphqlEndpoint }));
                  return {
                    onRequest({
                      request: r,
                      serverContext: o,
                      fetchAPI: a,
                      endResponse: l,
                      url: u,
                    }) {
                      if (
                        (function ({ headers: e, method: t }) {
                          return (
                            "GET" === t &&
                            !!e?.get("accept")?.includes("text/html")
                          );
                        })(r) &&
                        (r.url.endsWith(e.graphqlEndpoint) ||
                          r.url.endsWith(`${e.graphqlEndpoint}/`) ||
                          u.pathname === e.graphqlEndpoint ||
                          u.pathname === `${e.graphqlEndpoint}/` ||
                          s(a).test(u))
                      )
                        return (
                          n.debug("Rendering GraphiQL"),
                          j(
                            () => t(r, o),
                            (e) => {
                              if (e)
                                return j(
                                  () => i({ ...(!0 === e ? {} : e) }),
                                  (e) => {
                                    l(
                                      new a.Response(e, {
                                        headers: {
                                          "Content-Type": "text/html",
                                        },
                                        status: 200,
                                      }),
                                    );
                                  },
                                );
                            },
                          )
                        );
                    },
                  };
                })({
                  graphqlEndpoint: o,
                  options: e?.graphiql,
                  render: e?.renderGraphiQL,
                  logger: this.logger,
                }),
              rH({ match: rI, parse: rk }),
              rH({ match: rD, parse: rL }),
              e?.multipart !== !1 && rH({ match: rj, parse: rF }),
              rH({ match: rA, parse: rN }),
              rH({ match: rC, parse: rR }),
              (function () {
                let e = new WeakMap(),
                  t = {
                    mediaTypes: ["text/event-stream"],
                    asyncIterables: !0,
                    processResult: function (e, t) {
                      let r,
                        n,
                        i = 12e3;
                      globalThis.process?.env?.NODE_ENV === "test" && (i = 300);
                      let s = rw(
                          e,
                          {
                            "Content-Type": "text/event-stream",
                            Connection: "keep-alive",
                            "Cache-Control": "no-cache",
                            "Content-Encoding": "none",
                          },
                          !0,
                        ),
                        o = new t.TextEncoder(),
                        a = new t.ReadableStream({
                          start(t) {
                            if (
                              (t.enqueue(o.encode(":\n\n")),
                              (n = setInterval(() => {
                                if (!t.desiredSize)
                                  return void clearInterval(n);
                                t.enqueue(o.encode(":\n\n"));
                              }, i)),
                              eJ(e))
                            )
                              r = e[Symbol.asyncIterator]();
                            else {
                              let t = !1;
                              r = {
                                next: () =>
                                  t
                                    ? F({ done: !0, value: null })
                                    : ((t = !0), F({ done: !1, value: e })),
                              };
                            }
                          },
                          pull: (e) =>
                            j(
                              () => r.next(),
                              (t) => {
                                if (null != t.value) {
                                  e.enqueue(
                                    o.encode(`event: next
`),
                                  );
                                  let r = rK(t.value);
                                  e.enqueue(
                                    o.encode(`data: ${r}

`),
                                  );
                                }
                                t.done &&
                                  (e.enqueue(
                                    o.encode(`event: complete
`),
                                  ),
                                  e.enqueue(
                                    o.encode(`data:

`),
                                  ),
                                  clearInterval(n),
                                  e.close());
                              },
                              (t) => {
                                e.error(t);
                              },
                            ),
                          cancel(e) {
                            if ((clearInterval(n), r.return))
                              return j(
                                () => r.return?.(e),
                                () => {},
                              );
                          },
                        });
                      return new t.Response(a, s);
                    },
                  },
                  r = [t, rQ, rW],
                  n = [t, rW];
                return {
                  onSubscribe({ args: { contextValue: t } }) {
                    t.request && e.set(t.request, !0);
                  },
                  onResultProcess({
                    request: t,
                    result: i,
                    acceptableMediaTypes: s,
                    setResultProcessor: o,
                  }) {
                    let a = e.get(t),
                      l = (function (e) {
                        let t = (e.headers.get("accept") || "*/*")
                            .replace(/\s/g, "")
                            .toLowerCase()
                            .split(","),
                          r = [];
                        for (let e of t) {
                          let [t, ...n] = e.split(";");
                          void 0 !== t &&
                            "charset=utf-8" ===
                              (n?.find((e) => e.includes("charset=")) ||
                                "charset=utf-8") &&
                            r.push(t);
                        }
                        return r.reverse();
                      })(t),
                      u = eJ(i);
                    for (let e of a ? n : r)
                      for (let t of l)
                        if (!u || e.asyncIterables)
                          for (let r of e.mediaTypes)
                            s.push(r),
                              (function (e, t) {
                                let [r, n] = e.split("/"),
                                  [i, s] = t.split("/");
                                return (
                                  ("*" === i || i === r) &&
                                  ("*" === s || s === n)
                                );
                              })(r, t) && o(e.processResult, r);
                  },
                };
              })(),
              ...(e?.plugins ?? []),
              {
                onPluginInit({ addPlugin: t }) {
                  var r, n;
                  e?.parserAndValidationCache !== !1 &&
                    t(
                      (function ({
                        documentCache: e = r$(),
                        errorCache: t = r$(),
                        validationCache: r = !0,
                      }) {
                        let n = r$();
                        return {
                          onParse({ params: r, setParsedDocument: n }) {
                            let i = r.source.toString(),
                              s = e.get(i);
                            if (s) return void n(s);
                            let o = t.get(i);
                            if (o) throw o;
                            return ({ result: r }) => {
                              null != r &&
                                (r instanceof Error
                                  ? t.set(i, r)
                                  : e.set(i, r));
                            };
                          },
                          onValidate({
                            params: { schema: e, documentAST: t, rules: i },
                            setResult: s,
                          }) {
                            if (null != e && !1 !== r) {
                              let r = i?.map((e) => e.name).join(",") || "",
                                o = n.get(r);
                              o || ((o = new WeakMap()), n.set(r, o));
                              let a = o.get(e);
                              a || ((a = new WeakMap()), o.set(e, a));
                              let l = a.get(t);
                              return l
                                ? void s(l)
                                : ({ result: e }) => {
                                    null != e && a?.set(t, e);
                                  };
                            }
                          },
                        };
                      })(
                        e?.parserAndValidationCache &&
                          e?.parserAndValidationCache !== !0
                          ? e?.parserAndValidationCache
                          : {},
                      ),
                    ),
                    t(
                      ((r = s),
                      {
                        onRequestParse: () => ({
                          onRequestParseDone({ requestParserResult: e }) {
                            if (Array.isArray(e)) {
                              if (!r)
                                throw J("Batching is not supported.", {
                                  extensions: {
                                    http: { status: 400 },
                                    code: "BAD_REQUEST",
                                  },
                                });
                              if (e.length > r)
                                throw J(
                                  `Batching is limited to ${r} operations per request.`,
                                  {
                                    extensions: {
                                      http: { status: 413 },
                                      code: "BAD_REQUEST",
                                    },
                                  },
                                );
                            }
                          },
                        }),
                      }),
                    ),
                    t(
                      ((n = e?.extraParamNames),
                      {
                        onParams({ params: e }) {
                          !(function (e, t) {
                            if ("object" !== rU(e))
                              throw J(
                                `Expected params to be an object but given ${rU(e)}.`,
                                {
                                  extensions: {
                                    http: {
                                      status: 400,
                                      headers: { Allow: "GET, POST" },
                                    },
                                    code: "BAD_REQUEST",
                                  },
                                },
                              );
                            if (null == e || "object" != typeof e)
                              throw J('Invalid "params" in the request body', {
                                extensions: {
                                  http: { spec: !0, status: 400 },
                                  code: "BAD_REQUEST",
                                },
                              });
                            for (let r in e)
                              if (null != e[r] && !rB.has(r)) {
                                if (t?.includes(r)) continue;
                                throw J(
                                  `Unexpected parameter "${r}" in the request body.`,
                                  {
                                    extensions: {
                                      http: { status: 400 },
                                      code: "BAD_REQUEST",
                                    },
                                  },
                                );
                              }
                            if (null == e.query)
                              throw J("Must provide query string.", {
                                extensions: {
                                  http: {
                                    spec: !0,
                                    status: 400,
                                    headers: { Allow: "GET, POST" },
                                  },
                                  code: "BAD_REQUEST",
                                },
                              });
                            let r = rU(e.query);
                            if ("string" !== r)
                              throw J(
                                `Expected "query" param to be a string, but given ${r}.`,
                                {
                                  extensions: {
                                    http: {
                                      status: 400,
                                      headers: { Allow: "GET, POST" },
                                    },
                                    code: "BAD_REQUEST",
                                  },
                                },
                              );
                            let n = rU(e.variables);
                            if (!["object", "null", "undefined"].includes(n))
                              throw J(
                                `Expected "variables" param to be empty or an object, but given ${n}.`,
                                {
                                  extensions: {
                                    http: {
                                      status: 400,
                                      headers: { Allow: "GET, POST" },
                                    },
                                    code: "BAD_REQUEST",
                                  },
                                },
                              );
                            let i = rU(e.extensions);
                            if (!["object", "null", "undefined"].includes(i))
                              throw J(
                                `Expected "extensions" param to be empty or an object, but given ${i}.`,
                                {
                                  extensions: {
                                    http: {
                                      status: 400,
                                      headers: { Allow: "GET, POST" },
                                    },
                                    code: "BAD_REQUEST",
                                  },
                                },
                              );
                          })(e, n);
                        },
                      }),
                    ),
                    t(
                      (function (e) {
                        let t;
                        function r({ URLPattern: r }) {
                          return (t ||= new r({ pathname: e.graphqlEndpoint }));
                        }
                        let n = e.landingPageRenderer || rY;
                        return {
                          onRequest({
                            request: t,
                            fetchAPI: i,
                            endResponse: s,
                            url: o,
                          }) {
                            if (
                              !t.url.endsWith(e.graphqlEndpoint) &&
                              !t.url.endsWith(`${e.graphqlEndpoint}/`) &&
                              o.pathname !== e.graphqlEndpoint &&
                              o.pathname !== `${e.graphqlEndpoint}/` &&
                              !r(i).test(o)
                            ) {
                              if (
                                !0 === e.showLandingPage &&
                                "GET" === t.method &&
                                t.headers?.get("accept")?.includes("text/html")
                              ) {
                                let a = n({
                                  request: t,
                                  fetchAPI: i,
                                  url: o,
                                  graphqlEndpoint: e.graphqlEndpoint,
                                  get urlPattern() {
                                    return r(i);
                                  },
                                });
                                return L(a) ? a.then(s) : void s(a);
                              }
                              s(
                                new i.Response("", {
                                  status: 404,
                                  statusText: "Not Found",
                                }),
                              );
                            }
                          },
                        };
                      })({
                        graphqlEndpoint: o,
                        showLandingPage: !!(e?.landingPage ?? !0),
                        landingPageRenderer:
                          "function" == typeof e?.landingPage
                            ? e.landingPage
                            : void 0,
                      }),
                    ),
                    t({
                      onRequestParse({ request: e }) {
                        var t;
                        if ("GET" !== (t = e.method) && "POST" !== t)
                          throw J(
                            "GraphQL only supports GET and POST requests.",
                            {
                              extensions: {
                                http: {
                                  status: 405,
                                  headers: { Allow: "GET, POST" },
                                },
                                code: "BAD_REQUEST",
                              },
                            },
                          );
                      },
                    }),
                    t({
                      onParse:
                        () =>
                        ({
                          result: e,
                          context: {
                            request: t,
                            params: { operationName: r } = {},
                          },
                        }) => {
                          if (t)
                            if (e instanceof Error) {
                              if (e instanceof p.GraphQLError) {
                                let t = (e.extensions ||= {});
                                t.code ||= "GRAPHQL_PARSE_FAILED";
                                let r = (t.http ||= {});
                                (r.spec ||= !0), (r.status ||= 400);
                              }
                            } else {
                              var n = t.method;
                              let i = e
                                ? ((0, p.getOperationAST)(e, r) ?? void 0)
                                : void 0;
                              if (!i)
                                throw J(
                                  "Could not determine what operation to execute.",
                                  {
                                    extensions: {
                                      code: "OPERATION_RESOLUTION_FAILURE",
                                      http: { status: 400 },
                                    },
                                  },
                                );
                              if ("mutation" === i.operation && "GET" === n)
                                throw J(
                                  "Can only perform a mutation operation from a POST request.",
                                  {
                                    extensions: {
                                      http: {
                                        status: 405,
                                        headers: { Allow: "POST" },
                                      },
                                      code: "BAD_REQUEST",
                                    },
                                  },
                                );
                            }
                        },
                    }),
                    i &&
                      (t({
                        onSubscribe: () => ({
                          onSubscribeError({ error: e }) {
                            if (rE(e)) throw e;
                          },
                        }),
                      }),
                      t(
                        (function (e) {
                          let t = e?.maskError ?? e0,
                            r = e?.errorMessage || "Unexpected error.",
                            n = e1(t, r);
                          return {
                            onPluginInit(e) {
                              e.registerContextErrorHandler(
                                ({ error: e, setError: n }) => {
                                  n(t(e, r));
                                },
                              );
                            },
                            onExecute: () => ({
                              onExecuteDone: (e) => eX(e, n),
                            }),
                            onSubscribe: () => ({
                              onSubscribeResult: (e) => eX(e, n),
                              onSubscribeError({ error: e, setError: n }) {
                                n(t(e, r));
                              },
                            }),
                          };
                        })(i),
                      )),
                    t({
                      onValidate:
                        () =>
                        ({ valid: e, result: t }) => {
                          if (!e)
                            for (let e of t)
                              (e.extensions ||= {}),
                                (e.extensions.code ||=
                                  "GRAPHQL_VALIDATION_FAILED"),
                                (e.extensions.http ||= {}),
                                (e.extensions.http.spec =
                                  null == e.extensions.http.spec ||
                                  e.extensions.http.spec),
                                (e.extensions.http.status ||= 400);
                        },
                    });
                },
              },
            ]),
            (this.getEnveloped = (function (e) {
              let t = e.plugins.filter(e7),
                r = (function ({ plugins: e }) {
                  let t,
                    r = null,
                    n = !1,
                    i = () => e5("parse"),
                    s = () => e5("validate"),
                    o = () => e5("execute"),
                    a = () => e5("subscribe"),
                    l = (t, i = -1) => {
                      if (r !== t && ((r = t), n))
                        for (let [t, n] of e.entries())
                          t !== i &&
                            n.onSchemaChange &&
                            n.onSchemaChange({
                              schema: r,
                              replaceSchema: (e) => {
                                l(e, t);
                              },
                            });
                    },
                    u = [];
                  for (let t = 0; t < e.length; t++) {
                    let r = e[t],
                      n = [];
                    r.onPluginInit?.({
                      plugins: e,
                      addPlugin: (e) => {
                        n.push(e);
                      },
                      setSchema: (e) => l(e, t),
                      registerContextErrorHandler: (e) => u.push(e),
                    }),
                      n.length && e.splice(t + 1, 0, ...n);
                  }
                  let c = {
                    init: [],
                    parse: [],
                    validate: [],
                    subscribe: [],
                    execute: [],
                    context: [],
                  };
                  for (let {
                    onContextBuilding: r,
                    onExecute: n,
                    onParse: i,
                    onSubscribe: s,
                    onValidate: o,
                    onEnveloped: a,
                    instrumentation: l,
                  } of e)
                    a && c.init.push(a),
                      r && c.context.push(r),
                      n && c.execute.push(n),
                      i && c.parse.push(i),
                      s && c.subscribe.push(s),
                      o && c.validate.push(o),
                      l && (t = t ? e3(t, l) : l);
                  let f = c.parse.length
                      ? (e) => (t, r) => {
                          let n = null,
                            s = i,
                            o = [];
                          for (let i of c.parse) {
                            let a = i({
                              context: e,
                              extendContext: (t) => {
                                Object.assign(e, t);
                              },
                              params: { source: t, options: r },
                              parseFn: s,
                              setParseFn: (e) => {
                                s = e;
                              },
                              setParsedDocument: (e) => {
                                n = e;
                              },
                            });
                            a && o.push(a);
                          }
                          if (null === n)
                            try {
                              n = s(t, r);
                            } catch (e) {
                              n = e;
                            }
                          for (let t of o)
                            t({
                              context: e,
                              extendContext: (t) => {
                                Object.assign(e, t);
                              },
                              replaceParseResult: (e) => {
                                n = e;
                              },
                              result: n,
                            });
                          if (null === n)
                            throw Error("Failed to parse document.");
                          if (n instanceof Error) throw n;
                          return e2.set(n, t.toString()), n;
                        }
                      : () => i,
                    h = c.validate.length
                      ? (e) => (t, r, n, i, o) => {
                          let a = n ? [...n] : void 0,
                            l = s,
                            u = null,
                            f = [];
                          for (let n of c.validate) {
                            let s = n({
                              context: e,
                              extendContext: (t) => {
                                Object.assign(e, t);
                              },
                              params: {
                                schema: t,
                                documentAST: r,
                                rules: a,
                                typeInfo: i,
                                options: o,
                              },
                              validateFn: l,
                              addValidationRule: (e) => {
                                a || (a = []), a.push(e);
                              },
                              setValidationFn: (e) => {
                                l = e;
                              },
                              setResult: (e) => {
                                u = e;
                              },
                            });
                            s && f.push(s);
                          }
                          if ((u || (u = l(t, r, a, i, o)), !u)) return;
                          let h = 0 === u.length;
                          for (let t of f)
                            t({
                              valid: h,
                              result: u,
                              context: e,
                              extendContext: (t) => {
                                Object.assign(e, t);
                              },
                              setResult: (e) => {
                                u = e;
                              },
                            });
                          return u;
                        }
                      : () => s,
                    d = c.context.length
                      ? (e) => (t) => {
                          let r = [];
                          t && Object.assign(e, t);
                          let n = !1;
                          return j(
                            () =>
                              U(
                                c.context,
                                (t, r) =>
                                  t({
                                    context: e,
                                    extendContext: (t) => {
                                      Object.assign(e, t);
                                    },
                                    breakContextBuilding: () => {
                                      (n = !0), r();
                                    },
                                  }),
                                r,
                              ),
                            () =>
                              n
                                ? e
                                : j(
                                    () =>
                                      U(r, (t) =>
                                        t({
                                          context: e,
                                          extendContext(t) {
                                            Object.assign(e, t);
                                          },
                                        }),
                                      ),
                                    () => e,
                                  ),
                            (t) => {
                              let r = t;
                              for (let t of u)
                                t({
                                  context: e,
                                  error: r,
                                  setError: (e) => {
                                    r = e;
                                  },
                                });
                              throw r;
                            },
                          );
                        }
                      : (e) => (t) => (t && Object.assign(e, t), e),
                    p = c.subscribe.length
                      ? ez((e) => {
                          let t,
                            r = a,
                            n = [],
                            i = e.contextValue || {};
                          return j(
                            () =>
                              U(
                                c.subscribe,
                                (n, s) =>
                                  n({
                                    subscribeFn: r,
                                    setSubscribeFn: (e) => {
                                      r = e;
                                    },
                                    context: i,
                                    extendContext: (e) => {
                                      Object.assign(i, e);
                                    },
                                    args: e,
                                    setResultAndStopExecution: (e) => {
                                      (t = e), s();
                                    },
                                  }),
                                n,
                              ),
                            () => {
                              let i = [],
                                s = [];
                              for (let {
                                onSubscribeResult: e,
                                onSubscribeError: t,
                              } of n)
                                e && i.push(e), t && s.push(t);
                              return j(
                                () => t || r(e),
                                (t) => {
                                  let r = [],
                                    n = [];
                                  for (let s of i) {
                                    let i = s({
                                      args: e,
                                      result: t,
                                      setResult: (e) => {
                                        t = e;
                                      },
                                    });
                                    i &&
                                      (i.onNext && r.push(i.onNext),
                                      i.onEnd && n.push(i.onEnd));
                                  }
                                  return (
                                    r.length &&
                                      eJ(t) &&
                                      (t = q(t, (t) =>
                                        j(
                                          () =>
                                            U(r, (r) =>
                                              r({
                                                args: e,
                                                result: t,
                                                setResult: (e) => (t = e),
                                              }),
                                            ),
                                          () => t,
                                        ),
                                      )),
                                    n.length &&
                                      eJ(t) &&
                                      (t = eZ(t, () => {
                                        for (let e of n) e();
                                      })),
                                    s.length &&
                                      eJ(t) &&
                                      (t = (function (e, t) {
                                        let r = e[Symbol.asyncIterator](),
                                          n = {
                                            [Symbol.asyncIterator]: () => n,
                                            next: () =>
                                              r
                                                .next()
                                                .catch(
                                                  (e) => (
                                                    t(e),
                                                    { done: !0, value: void 0 }
                                                  ),
                                                ),
                                            return: () =>
                                              r.return?.() ||
                                              F({ done: !0, value: void 0 }),
                                            throw(e) {
                                              let t = r.throw?.();
                                              if (t) return t;
                                              throw e;
                                            },
                                          };
                                        return n;
                                      })(t, (e) => {
                                        let t = e;
                                        for (let e of s)
                                          e({
                                            error: t,
                                            setError: (e) => {
                                              t = e;
                                            },
                                          });
                                        throw t;
                                      })),
                                    t
                                  );
                                },
                              );
                            },
                          );
                        })
                      : ez(a),
                    y = c.execute.length
                      ? eY((e) => {
                          let t,
                            r = o,
                            n = [],
                            i = [],
                            s = e.contextValue || {};
                          return j(
                            () =>
                              U(
                                c.execute,
                                (n, i) =>
                                  n({
                                    executeFn: r,
                                    setExecuteFn: (e) => {
                                      r = e;
                                    },
                                    setResultAndStopExecution: (e) => {
                                      (t = e), i();
                                    },
                                    context: s,
                                    extendContext: (e) => {
                                      if ("object" == typeof e)
                                        Object.assign(s, e);
                                      else
                                        throw Error(
                                          `Invalid context extension provided! Expected "object", got: "${JSON.stringify(e)}" (${typeof e})`,
                                        );
                                    },
                                    args: e,
                                  }),
                                n,
                              ),
                            () =>
                              j(
                                () => t || r({ ...e, contextValue: s }),
                                (t) =>
                                  j(
                                    () =>
                                      U(
                                        n,
                                        (r) =>
                                          r.onExecuteDone?.({
                                            args: e,
                                            result: t,
                                            setResult: (e) => {
                                              t = e;
                                            },
                                          }),
                                        i,
                                      ),
                                    () => {
                                      let r = [],
                                        n = [];
                                      for (let { onNext: e, onEnd: t } of i)
                                        e && r.push(e), t && n.push(t);
                                      return (
                                        r.length &&
                                          eJ(t) &&
                                          (t = q(t, (t) =>
                                            j(
                                              () =>
                                                U(r, (r) =>
                                                  r({
                                                    args: e,
                                                    result: t,
                                                    setResult: (e) => {
                                                      t = e;
                                                    },
                                                  }),
                                                ),
                                              () => t,
                                            ),
                                          )),
                                        n.length &&
                                          eJ(t) &&
                                          (t = eZ(t, () => {
                                            for (let e of n) e();
                                          })),
                                        t
                                      );
                                    },
                                  ),
                              ),
                          );
                        })
                      : eY(o);
                  if (((n = !0), r))
                    for (let [t, n] of e.entries())
                      n.onSchemaChange?.({
                        schema: r,
                        replaceSchema: (e) => l(e, t),
                      });
                  return {
                    getCurrentSchema: () => r,
                    init: (e) => {
                      for (let [t, r] of c.init.entries())
                        r({
                          context: e,
                          extendContext: (t) => {
                            e && Object.assign(e, t);
                          },
                          setSchema: (e) => l(e, t),
                        });
                    },
                    parse: f,
                    validate: h,
                    execute: y,
                    subscribe: p,
                    contextFactory: d,
                    instrumentation: t,
                  };
                })({ plugins: t }),
                n = r.instrumentation,
                i = (e = {}) => {
                  let t = e4({ context: e });
                  return (
                    t.fn(n?.init, r.init)(e),
                    {
                      parse: t.fn(n?.parse, r.parse(e)),
                      validate: t.fn(n?.validate, r.validate(e)),
                      contextFactory: t.fn(n?.context, r.contextFactory(e)),
                      execute: t.asyncFn(n?.execute, r.execute),
                      subscribe: t.asyncFn(n?.subscribe, r.subscribe),
                      schema: r.getCurrentSchema(),
                    }
                  );
                };
              return (i._plugins = t), i;
            })({ plugins: this.plugins })),
            (this.plugins = this.getEnveloped._plugins),
            (this.onRequestParseHooks = []),
            (this.onParamsHooks = []),
            (this.onExecutionResultHooks = []),
            (this.onResultProcessHooks = []),
            this.plugins))
              t &&
                (t.onYogaInit && t.onYogaInit({ yoga: this }),
                t.onRequestParse &&
                  this.onRequestParseHooks.push(t.onRequestParse),
                t.onParams && this.onParamsHooks.push(t.onParams),
                t.onExecutionResult &&
                  this.onExecutionResultHooks.push(t.onExecutionResult),
                t.onResultProcess &&
                  this.onResultProcessHooks.push(t.onResultProcess),
                t.instrumentation &&
                  (this.instrumentation = this.instrumentation
                    ? e3(this.instrumentation, t.instrumentation)
                    : t.instrumentation));
          }
          handleParams = ({ request: e, context: t, params: r }) => {
            let n = t.request === e ? { params: r } : { request: e, params: r };
            Object.assign(t, n);
            let i = this.getEnveloped(t);
            return (
              this.logger.debug("Processing GraphQL Parameters"),
              j(
                () =>
                  j(
                    () =>
                      (function ({ params: e, enveloped: t }) {
                        let r = t.parse(e.query),
                          n = t.validate(t.schema, r);
                        return n.length > 0
                          ? { errors: n }
                          : j(
                              () => t.contextFactory(),
                              (n) => {
                                let i = {
                                    schema: t.schema,
                                    document: r,
                                    contextValue: n,
                                    variableValues: e.variables,
                                    operationName: e.operationName,
                                  },
                                  s = (0, p.getOperationAST)(
                                    r,
                                    e.operationName,
                                  );
                                return (
                                  s?.operation === "subscription"
                                    ? t.subscribe
                                    : t.execute
                                )(i);
                              },
                            );
                      })({ params: r, enveloped: i }),
                    (e) => (
                      this.logger.debug("Processing GraphQL Parameters done."),
                      e
                    ),
                    (e) => ({
                      errors: rx(e, this.maskedErrorsOpts, this.logger),
                    }),
                  ),
                (e) => (
                  eJ(e) &&
                    (e = q(
                      e,
                      (e) => e,
                      (e) => {
                        if ("AbortError" === e.name)
                          throw (this.logger.debug("Request aborted"), e);
                        return {
                          errors: rx(e, this.maskedErrorsOpts, this.logger),
                        };
                      },
                    )),
                  e
                ),
              )
            );
          };
          getResultForParams = ({ params: e, request: t }, r) => {
            let n,
              i = this.handleParams;
            return j(
              () =>
                U(this.onParamsHooks, (s) =>
                  s({
                    params: e,
                    request: t,
                    setParams(t) {
                      e = t;
                    },
                    paramsHandler: i,
                    setParamsHandler(e) {
                      i = e;
                    },
                    setResult(e) {
                      n = e;
                    },
                    fetchAPI: this.fetchAPI,
                    context: r,
                  }),
                ),
              () =>
                j(
                  () => n || i({ request: t, params: e, context: r }),
                  (e) =>
                    j(
                      () =>
                        U(this.onExecutionResultHooks, (n) =>
                          n({
                            result: e,
                            setResult(t) {
                              e = t;
                            },
                            request: t,
                            context: r,
                          }),
                        ),
                      () => e,
                    ),
                ),
            );
          };
          parseRequest = (e, t) => {
            let r,
              n = new Proxy(
                {},
                {
                  get: (t, r, i) =>
                    Reflect.get(
                      (n = new this.fetchAPI.URL(e.url, "http://localhost")),
                      r,
                      n,
                    ),
                },
              ),
              i = [];
            return j(
              () =>
                U(
                  this.onRequestParseHooks,
                  (i) =>
                    j(
                      () =>
                        i({
                          request: e,
                          url: n,
                          requestParser: r,
                          serverContext: t,
                          setRequestParser(e) {
                            r = e;
                          },
                        }),
                      (e) => e?.onRequestParseDone,
                    ),
                  i,
                ),
              () =>
                (this.logger.debug(
                  "Parsing request to extract GraphQL parameters",
                ),
                r)
                  ? j(
                      () => r(e),
                      (e) =>
                        j(
                          () =>
                            U(i, (t) =>
                              t({
                                requestParserResult: e,
                                setRequestParserResult(t) {
                                  e = t;
                                },
                              }),
                            ),
                          () => ({ requestParserResult: e }),
                        ),
                    )
                  : {
                      response: new this.fetchAPI.Response(null, {
                        status: 415,
                        statusText: "Unsupported Media Type",
                      }),
                    },
            );
          };
          handle = (e, t) => {
            let r = this.instrumentation && e4({ request: e }),
              n = this.instrumentation?.requestParse
                ? r.asyncFn(
                    this.instrumentation?.requestParse,
                    this.parseRequest,
                  )
                : this.parseRequest;
            return G(
              F()
                .then(() => n(e, t))
                .then(({ response: n, requestParserResult: i }) => {
                  if (n) return n;
                  let s = this.instrumentation?.operation
                    ? (e, t) =>
                        e4({ context: t, request: e.request }).asyncFn(
                          this.instrumentation?.operation,
                          this.getResultForParams,
                        )(e, t)
                    : this.getResultForParams;
                  return j(
                    () =>
                      Array.isArray(i)
                        ? Promise.all(
                            i.map((r) =>
                              s({ params: r, request: e }, Object.create(t)),
                            ),
                          )
                        : s({ params: i, request: e }, t),
                    (n) =>
                      (this.instrumentation?.resultProcess
                        ? r.asyncFn(this.instrumentation.resultProcess, rJ)
                        : rJ)({
                        request: e,
                        result: n,
                        fetchAPI: this.fetchAPI,
                        onResultProcessHooks: this.onResultProcessHooks,
                        serverContext: t,
                      }),
                  );
                })
                .catch((r) =>
                  rJ({
                    request: e,
                    result: {
                      errors: rx(r, this.maskedErrorsOpts, this.logger),
                    },
                    fetchAPI: this.fetchAPI,
                    onResultProcessHooks: this.onResultProcessHooks,
                    serverContext: t,
                  }),
                ),
            );
          };
        }
        var r1 = r(60442);
        let { handleRequest: r3 } = (function (e) {
            let t = new r0(e);
            return (function (e, t) {
              let r,
                n,
                i = t?.__useSingleWriteHead == null || t.__useSingleWriteHead,
                s = { ...t7, ...t?.fetchAPI },
                o =
                  t?.__useCustomAbortCtrl == null
                    ? s.Request !== globalThis.Request
                    : t.__useCustomAbortCtrl,
                a = "function" == typeof e ? e : e.handle,
                l = [],
                u = [],
                c = new Set();
              function f() {
                return (
                  n ||
                    ((n = new rn()),
                    t?.disposeOnProcessTerminate &&
                      (function (e) {
                        if (globalThis.process) {
                          if (!rm)
                            for (let e of ((rm = !0), rp))
                              globalThis.process.once(e, function () {
                                return Promise.allSettled(
                                  [...ry].map(
                                    (e) => !e.disposed && e.disposeAsync(),
                                  ),
                                );
                              });
                          ry.has(e) ||
                            (ry.add(e),
                            e.defer(() => {
                              ry.delete(e);
                            }));
                        }
                      })(n),
                    n.defer(() => {
                      if (c.size > 0)
                        return Promise.allSettled(c).then(
                          () => {
                            c.clear();
                          },
                          () => {
                            c.clear();
                          },
                        );
                    })),
                  n
                );
              }
              function h(e) {
                L(e) &&
                  (f(),
                  c.add(e),
                  e.then(
                    () => {
                      c.delete(e);
                    },
                    (t) => {
                      console.error(
                        `Unexpected error while waiting: ${t.message || t}`,
                      ),
                        c.delete(e);
                    },
                  ));
              }
              if (t?.plugins != null)
                for (let e of t.plugins) {
                  e.instrumentation &&
                    (r = r ? e3(r, e.instrumentation) : e.instrumentation),
                    e.onRequest && l.push(e.onRequest),
                    e.onResponse && u.push(e.onResponse);
                  let t = e[tu.dispose];
                  t && f().defer(t);
                  let n = e[tu.asyncDispose];
                  n && f().defer(n), e.onDispose && f().defer(e.onDispose);
                }
              let d =
                l.length > 0 || u.length > 0
                  ? function (e, t) {
                      let r,
                        n = a;
                      if (0 === l.length) return c();
                      let i =
                        e.parsedUrl ||
                        new Proxy(r_, {
                          get: (t, r, n) =>
                            Reflect.get(
                              (i = new s.URL(e.url, "http://localhost")),
                              r,
                              i,
                            ),
                        });
                      function o(r) {
                        return 0 === u.length
                          ? r
                          : j(
                              () =>
                                U(u, (n) =>
                                  n({
                                    request: e,
                                    response: r,
                                    serverContext: t,
                                    setResponse(e) {
                                      r = e;
                                    },
                                    fetchAPI: s,
                                  }),
                                ),
                              () => r,
                            );
                      }
                      function c() {
                        return r ? o(r) : j(() => n(e, t), o);
                      }
                      return j(
                        () =>
                          U(l, (o, a) =>
                            o({
                              request: e,
                              setRequest(t) {
                                e = t;
                              },
                              serverContext: t,
                              fetchAPI: s,
                              url: i,
                              requestHandler: n,
                              setRequestHandler(e) {
                                n = e;
                              },
                              endResponse(e) {
                                (r = e), e && a();
                              },
                            }),
                          ),
                        c,
                      );
                    }
                  : a;
              if (r?.request) {
                let e = d;
                d = (t, n) => e4({ request: t }).asyncFn(r.request, e)(t, n);
              }
              function p(e, t, ...r) {
                let n = t.raw || t,
                  i = r.length > 1 ? rc(...r) : r[0] || {};
                i.waitUntil || (i.waitUntil = h);
                let a = rs(e, s, n, o);
                return d(a, i);
              }
              function y(e, t, ...r) {
                let n = { req: e, res: t, waitUntil: h };
                return G(
                  F()
                    .then(() => p(e, t, n, ...r))
                    .catch((e) => rf(e, s.Response))
                    .then((r) =>
                      (function (e, t, r, n) {
                        if (t.closed || t.destroyed || t.writableEnded) return;
                        if (!e) {
                          (t.statusCode = 404), rl(t);
                          return;
                        }
                        if (
                          n &&
                          e.headers?.headersInit &&
                          !Array.isArray(e.headers.headersInit) &&
                          !e.headers.headersInit.get &&
                          !e.headers._map &&
                          !e.headers._setCookies?.length
                        )
                          t.writeHead(
                            e.status,
                            e.statusText,
                            e.headers.headersInit,
                          );
                        else {
                          if (t.setHeaders) t.setHeaders(e.headers);
                          else {
                            let r = !1;
                            e.headers.forEach((n, i) => {
                              if ("set-cookie" === i) {
                                if (r) return;
                                r = !0;
                                let n = e.headers.getSetCookie?.();
                                if (n) return void t.setHeader("set-cookie", n);
                              }
                              t.setHeader(i, n);
                            });
                          }
                          t.writeHead(e.status, e.statusText);
                        }
                        if ("String" === e.bodyType)
                          return j(
                            () => ru(e.bodyInit, t),
                            () => rl(t),
                          );
                        let i = e._buffer;
                        if (i)
                          return j(
                            () => ru(i, t),
                            () => rl(t),
                          );
                        let s = e.body;
                        if (null == s) return void rl(t);
                        if ("Uint8Array" === s[Symbol.toStringTag])
                          return j(
                            () => ru(s, t),
                            () => rl(t),
                          );
                        if (
                          (r?.socket?.setTimeout?.(0),
                          r?.socket?.setNoDelay?.(!0),
                          r?.socket?.setKeepAlive?.(!0),
                          ro(s))
                        ) {
                          t.once("close", () => {
                            s.destroy();
                          }),
                            s.pipe(t, { end: !0 });
                          return;
                        }
                        if (null != s && null != s.getReader) {
                          var o = r,
                            a = t,
                            l = s;
                          let e = l.getReader();
                          return (
                            o?.once?.("error", (t) => {
                              e.cancel(t);
                            }),
                            (function t() {
                              return e
                                .read()
                                .then(({ done: e, value: r }) =>
                                  e ? rl(a) : j(() => ru(r, a), t),
                                );
                            })()
                          );
                        }
                        if (ri(s)) {
                          let e = !1,
                            r = () => {
                              e = !0;
                            };
                          t.once("error", r),
                            t.once("close", r),
                            t.once("finish", () => {
                              t.removeListener("close", r),
                                t.removeListener("error", r);
                            });
                          let n = s[Symbol.asyncIterator](),
                            i = () =>
                              n.next().then(({ done: r, value: n }) => {
                                if (!e && !r)
                                  return j(
                                    () => ru(n, t),
                                    () => (e ? rl(t) : i()),
                                  );
                              });
                          return i();
                        }
                      })(r, t, e, i),
                    )
                    .catch((e) =>
                      console.error(
                        `Unexpected error while handling request: ${e.message || e}`,
                      ),
                    ),
                );
              }
              function m(e, t, ...r) {
                let n = { res: e, req: t, waitUntil: h },
                  i = r.filter((e) => null != e).length > 0 ? rc(n, ...r) : n,
                  a = o ? rg() : new AbortController(),
                  l = e.end.bind(e),
                  u = !1;
                (e.end = function (e) {
                  return (u = !0), l(e);
                }),
                  e.onAborted.bind(e)(function () {
                    a.abort();
                  }),
                  (e.onAborted = function (e) {
                    a.signal.addEventListener("abort", e, { once: !0 });
                  });
                let c = (function ({
                  req: e,
                  res: t,
                  fetchAPI: r,
                  controller: n,
                }) {
                  let i,
                    s,
                    o,
                    a = e.getMethod(),
                    l = [],
                    u = [
                      (e) => {
                        l.push(e);
                      },
                    ],
                    c = (e) => {
                      for (let t of u) t(e);
                    },
                    f = !1,
                    h = [
                      () => {
                        f = !0;
                      },
                    ],
                    d = () => {
                      for (let e of h) e();
                    };
                  if (
                    (t.onData(function (e, t) {
                      c(Buffer.from(Buffer.from(e, 0, e.byteLength))), t && d();
                    }),
                    "get" !== a && "head" !== a)
                  ) {
                    let e;
                    (i = "half"),
                      n.signal.addEventListener(
                        "abort",
                        () => {
                          d();
                        },
                        { once: !0 },
                      ),
                      (s = () => (
                        e ||
                          (e = new r.ReadableStream({
                            start(e) {
                              for (let t of l) e.enqueue(t);
                              if (f) return void e.close();
                              u.push((t) => {
                                e.enqueue(t);
                              }),
                                h.push(() => {
                                  if (n.signal.reason)
                                    return void e.error(n.signal.reason);
                                  e.desiredSize && e.close();
                                });
                            },
                          })),
                        e
                      ));
                  }
                  let p = new r.Headers();
                  e.forEach((e, t) => {
                    p.append(e, t);
                  });
                  let y = `http://localhost${e.getUrl()}`,
                    m = e.getQuery();
                  function b() {
                    return s ? (f ? _() : s()) : null;
                  }
                  m && (y += `?${m}`);
                  let g = new r.Request(y, {
                    method: a,
                    headers: p,
                    get body() {
                      return b();
                    },
                    signal: n.signal,
                    duplex: i,
                  });
                  function _() {
                    return (
                      o || (o = 1 === l.length ? l[0] : Buffer.concat(l)), o
                    );
                  }
                  function v() {
                    return f
                      ? F(_())
                      : new Promise((e, t) => {
                          try {
                            h.push(() => {
                              e(_());
                            });
                          } catch (e) {
                            t(e);
                          }
                        });
                  }
                  return (
                    Object.defineProperties(g, {
                      body: {
                        get: () => b(),
                        configurable: !0,
                        enumerable: !0,
                      },
                      json: {
                        value: () =>
                          v()
                            .then((e) => e.toString("utf8"))
                            .then((e) => JSON.parse(e)),
                        configurable: !0,
                        enumerable: !0,
                      },
                      text: {
                        value: () => v().then((e) => e.toString("utf8")),
                        configurable: !0,
                        enumerable: !0,
                      },
                      arrayBuffer: {
                        value: () => v(),
                        configurable: !0,
                        enumerable: !0,
                      },
                    }),
                    g
                  );
                })({ req: t, res: e, fetchAPI: s, controller: a });
                return j(
                  () =>
                    j(
                      () => d(c, i),
                      (e) => e,
                      (e) => rf(e, s.Response),
                    ),
                  (t) => {
                    if (!a.signal.aborted && !u)
                      return j(
                        () =>
                          (function (e, t, r, n) {
                            if (!t) {
                              e.writeStatus("404 Not Found"), e.end();
                              return;
                            }
                            let i = t._buffer;
                            if (
                              !r.signal.aborted &&
                              (e.cork(() => {
                                for (let [r, n] of (e.writeStatus(
                                  `${t.status} ${t.statusText}`,
                                ),
                                t.headers))
                                  if ("content-length" !== r) {
                                    if ("set-cookie" === r) {
                                      let n = t.headers.getSetCookie?.();
                                      if (n) {
                                        for (let t of n) e.writeHeader(r, t);
                                        continue;
                                      }
                                    }
                                    e.writeHeader(r, n);
                                  }
                                i ? e.end(i) : t.body || e.end();
                              }),
                              !i && t.body)
                            )
                              return (
                                r.signal.addEventListener(
                                  "abort",
                                  () => {
                                    t.body?.locked ||
                                      t.body?.cancel(r.signal.reason);
                                  },
                                  { once: !0 },
                                ),
                                t.body
                                  .pipeTo(
                                    new n.WritableStream({
                                      write(t) {
                                        e.cork(() => {
                                          e.write(t);
                                        });
                                      },
                                      close() {
                                        e.cork(() => {
                                          e.end();
                                        });
                                      },
                                    }),
                                    { signal: r.signal },
                                  )
                                  .catch((e) => {
                                    if (!r.signal.aborted) throw e;
                                  })
                              );
                          })(e, t, a, s),
                        (e) => e,
                        (e) => {
                          console.error(
                            `Unexpected error while handling request: ${e.message || e}`,
                          );
                        },
                      );
                  },
                );
              }
              function b(e, ...t) {
                if (!e.respondWith || !e.request)
                  throw TypeError(`Expected FetchEvent, got ${e}`);
                let r = t.filter((e) => null != e),
                  n = r.length > 0 ? rc({}, e, ...r) : rh(e),
                  i = d(e.request, n);
                e.respondWith(i);
              }
              function g(e, ...t) {
                let r = t.filter((e) => null != e),
                  n =
                    r.length > 1
                      ? rc({}, ...r)
                      : rh(
                          r[0],
                          null == r[0] || null == r[0].waitUntil ? h : void 0,
                        );
                return d(e, n);
              }
              let _ = (e, ...t) => {
                  if ("string" == typeof e || "href" in e) {
                    let [r, ...n] = t;
                    if (
                      null != r &&
                      "object" == typeof r &&
                      ("body" in r ||
                        "cache" in r ||
                        "credentials" in r ||
                        "headers" in r ||
                        "integrity" in r ||
                        "keepalive" in r ||
                        "method" in r ||
                        "mode" in r ||
                        "redirect" in r ||
                        "referrer" in r ||
                        "referrerPolicy" in r ||
                        "signal" in r ||
                        "window" in r)
                    ) {
                      let t = g(new s.Request(e, r), ...n),
                        i = r.signal;
                      return i ? rd(t, i) : t;
                    }
                    return g(new s.Request(e), ...t);
                  }
                  return rd(g(e, ...t), e.signal);
                },
                v = (e, ...t) => {
                  let [r, ...n] = t;
                  if (ro(e)) {
                    if (!ra(r))
                      throw TypeError(`Expected ServerResponse, got ${r}`);
                    return y(e, r, ...n);
                  }
                  if (e.onData) return m(e, r, ...n);
                  if (ra(r))
                    throw TypeError("Got Node response without Node request");
                  if (
                    (function (e) {
                      try {
                        return !!e?.request;
                      } catch {
                        return !1;
                      }
                    })(e)
                  )
                    return null != e &&
                      null != e.request &&
                      null != e.respondWith
                      ? b(e, ...t)
                      : g(e.request, e, ...t);
                  return _(e, ...t);
                },
                T = {
                  handleRequest: g,
                  fetch: _,
                  handleNodeRequest: function (e, ...t) {
                    let r = t.length > 1 ? rc(...t) : t[0] || {};
                    r.waitUntil || (r.waitUntil = h);
                    let n = rs(e, s, void 0, o);
                    return d(n, r);
                  },
                  handleNodeRequestAndResponse: p,
                  requestListener: y,
                  handleEvent: b,
                  handleUWS: m,
                  handle: v,
                  get disposableStack() {
                    return f();
                  },
                  [tu.asyncDispose]: () =>
                    n && !n.disposed ? n.disposeAsync() : F(),
                  dispose: () => (n && !n.disposed ? n.disposeAsync() : F()),
                  waitUntil: h,
                },
                E = new Proxy(v, {
                  has: (t, r) => r in T || r in v || (e && r in e),
                  get: (t, r) => {
                    if (
                      globalThis.Deno ||
                      r === Symbol.asyncDispose ||
                      r === Symbol.dispose
                    ) {
                      let e = Reflect.get(T, r, T);
                      if (e) return e;
                    }
                    let n = T[r];
                    if (n) return n.bind ? n.bind(T) : n;
                    let i = v[r];
                    if (i) return i.bind ? i.bind(v) : i;
                    if (e) {
                      let t = e[r];
                      if (t)
                        return t.bind
                          ? function (...t) {
                              let n = e[r](...t);
                              return n === e ? E : n;
                            }
                          : t;
                    }
                  },
                  apply: (e, t, r) => v(...r),
                });
              return E;
            })(t, {
              fetchAPI: t.fetchAPI,
              plugins: t.plugins,
              disposeOnProcessTerminate: e.disposeOnProcessTerminate,
            });
          })({
            schema: (function ({
              typeDefs: e,
              resolvers: t = {},
              resolverValidationOptions: r = {},
              inheritResolversFromInterfaces: n = !1,
              updateResolversInPlace: i = !1,
              schemaExtensions: o,
              defaultFieldResolver: a,
              ...l
            }) {
              let u;
              if ("object" != typeof r)
                throw Error(
                  "Expected `resolverValidationOptions` to be an object",
                );
              if (!e) throw Error("Must provide typeDefs");
              if ((0, p.isSchema)(e)) u = e;
              else if (l?.commentDescriptions) {
                let t = eI(e, { ...l, commentDescriptions: !0 });
                u = (0, p.buildSchema)(t, l);
              } else {
                let t = eI(e, l);
                u = (0, p.buildASTSchema)(t, l);
              }
              if (
                ((u = (function ({
                  schema: e,
                  resolvers: t,
                  defaultFieldResolver: r,
                  resolverValidationOptions: n = {},
                  inheritResolversFromInterfaces: i = !1,
                  updateResolversInPlace: o = !1,
                }) {
                  var a, l, u;
                  let {
                      requireResolversToMatchSchema: c = "error",
                      requireResolversForResolveType: f,
                    } = n,
                    h = i
                      ? (function (e, t) {
                          let r = {},
                            n = e.getTypeMap();
                          for (let e in n) {
                            let i = n[e];
                            if ("getInterfaces" in i) {
                              for (let n of ((r[e] = {}), i.getInterfaces()))
                                if (t[n.name])
                                  for (let i in t[n.name])
                                    ("__isTypeOf" !== i &&
                                      i.startsWith("__")) ||
                                      (r[e][i] = t[n.name][i]);
                              let n = t[e];
                              r[e] = { ...r[e], ...n };
                            } else {
                              let n = t[e];
                              null != n && (r[e] = n);
                            }
                          }
                          return r;
                        })(e, t)
                      : t;
                  for (let t in h) {
                    let r = h[t];
                    if ("object" != typeof r)
                      throw Error(
                        `"${t}" defined in resolvers, but has invalid value "${r}". The resolver's value must be of type object.`,
                      );
                    let n = e.getType(t);
                    if (null == n) {
                      let e = `"${t}" defined in resolvers, but not in schema`;
                      if (c && "error" !== c) {
                        "warn" === c && console.warn(e);
                        continue;
                      }
                      throw Error(e);
                    }
                    if ((0, p.isSpecifiedScalarType)(n))
                      for (let e in r)
                        e.startsWith("__")
                          ? (n[e.substring(2)] = r[e])
                          : (n[e] = r[e]);
                    else if ((0, p.isEnumType)(n)) {
                      let e = n.getValues();
                      for (let t in r)
                        if (
                          !t.startsWith("__") &&
                          !e.some((e) => e.name === t) &&
                          c &&
                          "ignore" !== c
                        ) {
                          let e = `${n.name}.${t} was defined in resolvers, but not present within ${n.name}`;
                          if ("error" === c) throw Error(e);
                          console.warn(e);
                        }
                    } else if ((0, p.isUnionType)(n)) {
                      for (let e in r)
                        if (!e.startsWith("__") && c && "ignore" !== c) {
                          let t = `${n.name}.${e} was defined in resolvers, but ${n.name} is not an object or interface type`;
                          if ("error" === c) throw Error(t);
                          console.warn(t);
                        }
                    } else if (
                      (0, p.isObjectType)(n) ||
                      (0, p.isInterfaceType)(n)
                    ) {
                      for (let e in r)
                        if (!e.startsWith("__"))
                          if (null == n.getFields()[e]) {
                            if (c && "ignore" !== c) {
                              let r = `${t}.${e} defined in resolvers, but not in schema`;
                              if ("error" === c) throw Error(r);
                              console.error(r);
                            }
                          } else {
                            let n = r[e];
                            if ("function" != typeof n && "object" != typeof n)
                              throw Error(
                                `Resolver ${t}.${e} must be object or function`,
                              );
                          }
                    }
                  }
                  return (
                    (e = o
                      ? (function (e, t, r) {
                          let n = e.getTypeMap();
                          for (let r in t) {
                            let i = e.getType(r),
                              s = t[r];
                            if ((0, p.isScalarType)(i))
                              for (let e in s)
                                e.startsWith("__")
                                  ? (i[e.substring(2)] = s[e])
                                  : "astNode" === e && null != i.astNode
                                    ? (i.astNode = {
                                        ...i.astNode,
                                        description:
                                          s?.astNode?.description ??
                                          i.astNode.description,
                                        directives: (
                                          i.astNode.directives ?? []
                                        ).concat(s?.astNode?.directives ?? []),
                                      })
                                    : "extensionASTNodes" === e &&
                                        null != i.extensionASTNodes
                                      ? (i.extensionASTNodes =
                                          i.extensionASTNodes.concat(
                                            s?.extensionASTNodes ?? [],
                                          ))
                                      : "extensions" === e &&
                                          null != i.extensions &&
                                          null != s.extensions
                                        ? (i.extensions = Object.assign(
                                            Object.create(null),
                                            i.extensions,
                                            s.extensions,
                                          ))
                                        : (i[e] = s[e]);
                            else if ((0, p.isEnumType)(i)) {
                              let e = i.toConfig(),
                                t = e.values;
                              for (let r in s)
                                r.startsWith("__")
                                  ? (e[r.substring(2)] = s[r])
                                  : "astNode" === r && null != e.astNode
                                    ? (e.astNode = {
                                        ...e.astNode,
                                        description:
                                          s?.astNode?.description ??
                                          e.astNode.description,
                                        directives: (
                                          e.astNode.directives ?? []
                                        ).concat(s?.astNode?.directives ?? []),
                                      })
                                    : "extensionASTNodes" === r &&
                                        null != e.extensionASTNodes
                                      ? (e.extensionASTNodes =
                                          e.extensionASTNodes.concat(
                                            s?.extensionASTNodes ?? [],
                                          ))
                                      : "extensions" === r &&
                                          null != i.extensions &&
                                          null != s.extensions
                                        ? (i.extensions = Object.assign(
                                            Object.create(null),
                                            i.extensions,
                                            s.extensions,
                                          ))
                                        : t[r] && (t[r].value = s[r]);
                              n[r] = new p.GraphQLEnumType(e);
                            } else if ((0, p.isUnionType)(i))
                              for (let e in s)
                                e.startsWith("__") &&
                                  (i[e.substring(2)] = s[e]);
                            else if (
                              (0, p.isObjectType)(i) ||
                              (0, p.isInterfaceType)(i)
                            )
                              for (let e in s) {
                                if (e.startsWith("__")) {
                                  i[e.substring(2)] = s[e];
                                  continue;
                                }
                                let t = i.getFields()[e];
                                if (null != t) {
                                  let r = s[e];
                                  "function" == typeof r
                                    ? (t.resolve = r.bind(s))
                                    : eK(t, r);
                                }
                              }
                          }
                          return (
                            eA(e, eD),
                            (function (e, t) {
                              let r = Object.create(null);
                              for (let t in e) {
                                let n = e[t];
                                if (null == n || t.startsWith("__")) continue;
                                let i = n.name;
                                if (!i.startsWith("__")) {
                                  if (null != r[i]) {
                                    console.warn(
                                      `Duplicate schema type name ${i} found; keeping the existing one found in the schema`,
                                    );
                                    continue;
                                  }
                                  r[i] = n;
                                }
                              }
                              for (let t in r) {
                                let n = r[t];
                                e[t] = n;
                              }
                              for (let e of t)
                                e.args = e.args.filter(
                                  (e) => (
                                    (e.type = s(e.type)), null !== e.type
                                  ),
                                );
                              for (let t in e) {
                                let o = e[t];
                                !t.startsWith("__") &&
                                  t in r &&
                                  null != o &&
                                  (function (e) {
                                    if ((0, p.isObjectType)(e)) {
                                      n(e), i(e);
                                      return;
                                    }
                                    if ((0, p.isInterfaceType)(e)) {
                                      n(e), "getInterfaces" in e && i(e);
                                      return;
                                    }
                                    if ((0, p.isUnionType)(e)) {
                                      var t = e;
                                      let r = t.getTypes();
                                      r.push(
                                        ...r
                                          .splice(0)
                                          .map((e) => s(e))
                                          .filter(Boolean),
                                      );
                                      return;
                                    }
                                    if ((0, p.isInputObjectType)(e)) {
                                      var r = e;
                                      let t = r.getFields();
                                      for (let [e, r] of Object.entries(t))
                                        (r.type = s(r.type)),
                                          null === r.type && delete t[e];
                                      return;
                                    }
                                    if (!(0, p.isLeafType)(e))
                                      throw Error(
                                        `Unexpected schema type: ${e}`,
                                      );
                                  })(o);
                              }
                              for (let t in e)
                                t.startsWith("__") || t in r || delete e[t];
                              function n(e) {
                                let t = e.getFields();
                                for (let [e, r] of Object.entries(t))
                                  r.args
                                    .map(
                                      (e) => (
                                        (e.type = s(e.type)),
                                        null === e.type ? null : e
                                      ),
                                    )
                                    .filter(Boolean),
                                    (r.type = s(r.type)),
                                    null === r.type && delete t[e];
                              }
                              function i(e) {
                                if ("getInterfaces" in e) {
                                  let t = e.getInterfaces();
                                  t.push(
                                    ...t
                                      .splice(0)
                                      .map((e) => s(e))
                                      .filter(Boolean),
                                  );
                                }
                              }
                              function s(t) {
                                if ((0, p.isListType)(t)) {
                                  let e = s(t.ofType);
                                  return null != e
                                    ? new p.GraphQLList(e)
                                    : null;
                                }
                                if ((0, p.isNonNullType)(t)) {
                                  let e = s(t.ofType);
                                  return null != e
                                    ? new p.GraphQLNonNull(e)
                                    : null;
                                }
                                if ((0, p.isNamedType)(t)) {
                                  let r = e[t.name];
                                  if (r && t !== r) return r;
                                }
                                return t;
                              }
                            })(e.getTypeMap(), e.getDirectives()),
                            eA(e, eL),
                            null != r &&
                              ej(e, (e) => {
                                e.resolve || (e.resolve = r);
                              }),
                            e
                          );
                        })(e, h, r)
                      : ((a = e),
                        (l = h),
                        (u = r),
                        (a = eB(a, {
                          [s.SCALAR_TYPE]: (e) => {
                            let t = e.toConfig(),
                              r = l[e.name];
                            if (!(0, p.isSpecifiedScalarType)(e) && null != r) {
                              for (let n in r)
                                n.startsWith("__")
                                  ? (t[n.substring(2)] = r[n])
                                  : "astNode" === n && null != t.astNode
                                    ? (t.astNode = {
                                        ...t.astNode,
                                        description:
                                          r?.astNode?.description ??
                                          t.astNode.description,
                                        directives: (
                                          t.astNode.directives ?? []
                                        ).concat(r?.astNode?.directives ?? []),
                                      })
                                    : "extensionASTNodes" === n &&
                                        null != t.extensionASTNodes
                                      ? (t.extensionASTNodes =
                                          t.extensionASTNodes.concat(
                                            r?.extensionASTNodes ?? [],
                                          ))
                                      : "extensions" === n &&
                                          null != t.extensions &&
                                          null != r.extensions
                                        ? (t.extensions = Object.assign(
                                            Object.create(null),
                                            e.extensions,
                                            r.extensions,
                                          ))
                                        : (t[n] = r[n]);
                              return new p.GraphQLScalarType(t);
                            }
                          },
                          [s.ENUM_TYPE]: (e) => {
                            let t = l[e.name],
                              r = e.toConfig(),
                              n = r.values;
                            if (null != t) {
                              for (let i in t)
                                i.startsWith("__")
                                  ? (r[i.substring(2)] = t[i])
                                  : "astNode" === i && null != r.astNode
                                    ? (r.astNode = {
                                        ...r.astNode,
                                        description:
                                          t?.astNode?.description ??
                                          r.astNode.description,
                                        directives: (
                                          r.astNode.directives ?? []
                                        ).concat(t?.astNode?.directives ?? []),
                                      })
                                    : "extensionASTNodes" === i &&
                                        null != r.extensionASTNodes
                                      ? (r.extensionASTNodes =
                                          r.extensionASTNodes.concat(
                                            t?.extensionASTNodes ?? [],
                                          ))
                                      : "extensions" === i &&
                                          null != r.extensions &&
                                          null != t.extensions
                                        ? (r.extensions = Object.assign(
                                            Object.create(null),
                                            e.extensions,
                                            t.extensions,
                                          ))
                                        : n[i] && (n[i].value = t[i]);
                              return new p.GraphQLEnumType(r);
                            }
                          },
                          [s.UNION_TYPE]: (e) => {
                            let t = l[e.name];
                            if (null != t) {
                              let r = e.toConfig();
                              return (
                                t.__resolveType &&
                                  (r.resolveType = t.__resolveType),
                                new p.GraphQLUnionType(r)
                              );
                            }
                          },
                          [s.OBJECT_TYPE]: (e) => {
                            let t = l[e.name];
                            if (null != t) {
                              let r = e.toConfig();
                              return (
                                t.__isTypeOf && (r.isTypeOf = t.__isTypeOf),
                                new p.GraphQLObjectType(r)
                              );
                            }
                          },
                          [s.INTERFACE_TYPE]: (e) => {
                            let t = l[e.name];
                            if (null != t) {
                              let r = e.toConfig();
                              return (
                                t.__resolveType &&
                                  (r.resolveType = t.__resolveType),
                                new p.GraphQLInterfaceType(r)
                              );
                            }
                          },
                          [s.COMPOSITE_FIELD]: (e, t, r) => {
                            let n = l[r];
                            if (null != n) {
                              let r = n[t];
                              if (null != r) {
                                let t = { ...e };
                                return (
                                  "function" == typeof r
                                    ? (t.resolve = r.bind(n))
                                    : eK(t, r),
                                  t
                                );
                              }
                            }
                          },
                        })),
                        null != u &&
                          (a = eB(a, {
                            [s.OBJECT_FIELD]: (e) => ({
                              ...e,
                              resolve: null != e.resolve ? e.resolve : u,
                            }),
                          })),
                        a)),
                    f &&
                      "ignore" !== f &&
                      eB(e, {
                        [s.ABSTRACT_TYPE]: (e) => {
                          if (!e.resolveType) {
                            let t = `Type "${e.name}" is missing a "__resolveType" resolver. Pass 'ignore' into "resolverValidationOptions.requireResolversForResolveType" to disable this error.`;
                            if ("error" === f) throw Error(t);
                            "warn" === f && console.warn(t);
                          }
                        },
                      }),
                    e
                  );
                })({
                  schema: u,
                  resolvers: (function e(t, r) {
                    if (!t || (Array.isArray(t) && 0 === t.length)) return {};
                    if (!Array.isArray(t)) return t;
                    if (1 === t.length) return t[0] || {};
                    let n = [];
                    for (let r of t)
                      Array.isArray(r) && (r = e(r)),
                        "object" == typeof r && r && n.push(r);
                    let i = ek(n, !0);
                    if (r?.exclusions)
                      for (let e of r.exclusions) {
                        let [t, r] = e.split(".");
                        !(
                          ["__proto__", "constructor", "prototype"].includes(
                            t,
                          ) ||
                          ["__proto__", "constructor", "prototype"].includes(r)
                        ) &&
                          (r && "*" !== r
                            ? i[t] && delete i[t][r]
                            : delete i[t]);
                      }
                    return i;
                  })(t),
                  resolverValidationOptions: r,
                  inheritResolversFromInterfaces: n,
                  updateResolversInPlace: i,
                  defaultFieldResolver: a,
                })),
                Object.keys(r).length > 0 &&
                  (function (e, t = {}) {
                    let {
                      requireResolversForArgs: r,
                      requireResolversForNonScalar: n,
                      requireResolversForAllFields: i,
                    } = t;
                    if (i && (r || n))
                      throw TypeError(
                        "requireResolversForAllFields takes precedence over the more specific assertions. Please configure either requireResolversForAllFields or requireResolversForArgs / requireResolversForNonScalar, but not a combination of them.",
                      );
                    ej(e, (e, t, s) => {
                      i && eV("requireResolversForAllFields", i, e, t, s),
                        r &&
                          e.args.length > 0 &&
                          eV("requireResolversForArgs", r, e, t, s),
                        "ignore" === n ||
                          (0, p.isScalarType)((0, p.getNamedType)(e.type)) ||
                          eV("requireResolversForNonScalar", n, e, t, s);
                    });
                  })(u, r),
                o)
              )
                for (let e of et(o)) {
                  var c = u,
                    f = e;
                  for (let [e, t] of (eR(c, f.schemaExtensions),
                  Object.entries(f.types || {}))) {
                    let r = c.getType(e);
                    if (r) {
                      if (
                        (eR(r, t.extensions),
                        "object" === t.type || "interface" === t.type)
                      )
                        for (let [e, n] of Object.entries(t.fields)) {
                          let t = r.getFields()[e];
                          if (t)
                            for (let [e, r] of (eR(t, n.extensions),
                            Object.entries(n.arguments)))
                              eR(
                                t.args.find((t) => t.name === e),
                                r,
                              );
                        }
                      else if ("input" === t.type)
                        for (let [e, n] of Object.entries(t.fields))
                          eR(r.getFields()[e], n.extensions);
                      else if ("enum" === t.type)
                        for (let [e, n] of Object.entries(t.values))
                          eR(r.getValue(e), n);
                    }
                  }
                }
              return u;
            })({
              typeDefs: (0, f.readFileSync)(
                (0, h.join)(process.cwd(), "graphql/schema/schema.graphql"),
                "utf-8",
              ),
              resolvers: {
                Query: { hello: () => "Hello from GraphQL API!" },
                Mutation: { echo: (e, { text: t }) => t },
              },
            }),
            graphqlEndpoint: "/api/graphql",
            fetchAPI: { Request, Response },
            context: async ({ request: e }) => {
              let t,
                r = null;
              try {
                let n;
                t = (0, d.createClient)(
                  "http://localhost:54321",
                  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0",
                );
                let i = e.headers.get("Authorization");
                if ((i?.startsWith("Bearer ") && (n = i.split(" ")[1]), n)) {
                  let { data: e, error: i } = await t.auth.getUser(n);
                  i
                    ? console.error(
                        "Auth user error (JWT) in GraphQL context:",
                        i,
                      )
                    : (r = e.user);
                }
                return {
                  user: r,
                  supabase: t,
                  request: e,
                  params: Promise.resolve({}),
                };
              } catch (r) {
                return (
                  console.error("Context creation error:", r),
                  {
                    user: null,
                    supabase: t,
                    request: e,
                    params: Promise.resolve({}),
                  }
                );
              }
            },
            maskedErrors: {
              maskError: (e, t) => (
                console.error("GraphQL Error:", {
                  message: e.message,
                  path: e.path,
                  stack: e.stack,
                }),
                Error(t)
              ),
            },
          }),
          r4 = { ...c },
          r2 =
            "workUnitAsyncStorage" in r4
              ? r4.workUnitAsyncStorage
              : "requestAsyncStorage" in r4
                ? r4.requestAsyncStorage
                : void 0;
        function r5(e, t) {
          return "phase-production-build" === process.env.NEXT_PHASE ||
            "function" != typeof e
            ? e
            : new Proxy(e, {
                apply: (e, r, n) => {
                  let i;
                  try {
                    let e = r2?.getStore();
                    i = e?.headers;
                  } catch (e) {}
                  return r1
                    .wrapRouteHandlerWithSentry(e, {
                      method: t,
                      parameterizedRoute: "/api/graphql",
                      headers: i,
                    })
                    .apply(r, n);
                },
              });
        }
        let r7 = r5(r3, "GET"),
          r8 = r5(r3, "POST"),
          r6 = r5(void 0, "PUT"),
          r9 = r5(void 0, "PATCH"),
          ne = r5(void 0, "DELETE"),
          nt = r5(void 0, "HEAD"),
          nr = r5(void 0, "OPTIONS"),
          nn = new a.AppRouteRouteModule({
            definition: {
              kind: l.RouteKind.APP_ROUTE,
              page: "/api/graphql/route",
              pathname: "/api/graphql",
              filename: "route",
              bundlePath: "app/api/graphql/route",
            },
            resolvedPagePath:
              "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\api\\graphql\\route.ts",
            nextConfigOutput: "",
            userland: o,
          }),
          {
            workAsyncStorage: ni,
            workUnitAsyncStorage: ns,
            serverHooks: no,
          } = nn;
        function na() {
          return (0, u.patchFetch)({
            workAsyncStorage: ni,
            workUnitAsyncStorage: ns,
          });
        }
      },
      73024: (e) => {
        "use strict";
        e.exports = require("node:fs");
      },
      73136: (e) => {
        "use strict";
        e.exports = require("node:url");
      },
      73566: (e) => {
        "use strict";
        e.exports = require("worker_threads");
      },
      73872: (e, t, r) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.fetchPonyfill = function e(t, r) {
            if ("string" == typeof t || (null != t && null != t.href))
              return e(new l.PonyfillRequest(t, r));
            if (t.url.startsWith("data:")) {
              let e = (function (e) {
                let [t = "text/plain", ...r] = e.substring(5).split(","),
                  i = decodeURIComponent(r.join(","));
                if (t.endsWith(h)) {
                  let e = n.Buffer.from(i, "base64url"),
                    r = t.slice(0, -h.length);
                  return new u.PonyfillResponse(e, {
                    status: 200,
                    statusText: "OK",
                    headers: { "content-type": r },
                  });
                }
                return new u.PonyfillResponse(i, {
                  status: 200,
                  statusText: "OK",
                  headers: { "content-type": t },
                });
              })(t.url);
              return (0, f.fakePromise)(e);
            }
            if (t.url.startsWith("file:")) return d(t.url);
            if (t.url.startsWith("blob:")) {
              let e = (function (e) {
                let t = c.PonyfillURL.getBlobFromURL(e);
                if (!t) throw TypeError("Invalid Blob URL");
                return new u.PonyfillResponse(t, {
                  status: 200,
                  headers: {
                    "content-type": t.type,
                    "content-length": t.size.toString(),
                  },
                });
              })(t.url);
              return (0, f.fakePromise)(e);
            }
            return globalThis.libcurl && !t.agent
              ? (0, o.fetchCurl)(t)
              : (0, a.fetchNodeHttp)(t);
          });
        let n = r(4573),
          i = r(73024),
          s = r(73136),
          o = r(29638),
          a = r(2832),
          l = r(31141),
          u = r(97609),
          c = r(94849),
          f = r(13753),
          h = ";base64";
        async function d(e) {
          let t = (0, s.fileURLToPath)(e);
          try {
            await i.promises.access(t, i.promises.constants.R_OK);
            let e = await i.promises.stat(t, { bigint: !0 }),
              r = (0, i.createReadStream)(t);
            return new u.PonyfillResponse(r, {
              status: 200,
              statusText: "OK",
              headers: {
                "content-type": "application/octet-stream",
                "last-modified": e.mtime.toUTCString(),
              },
            });
          } catch (e) {
            if ("ENOENT" === e.code)
              return new u.PonyfillResponse(null, {
                status: 404,
                statusText: "Not Found",
              });
            if ("EACCES" === e.code)
              return new u.PonyfillResponse(null, {
                status: 403,
                statusText: "Forbidden",
              });
            throw e;
          }
        }
      },
      74075: (e) => {
        "use strict";
        e.exports = require("zlib");
      },
      74652: (e, t, r) => {
        "use strict";
        let n = r(57075).Writable,
          i = r(57975).inherits,
          s = r(10534),
          o = r(88374),
          a = r(66865),
          l = Buffer.from("-"),
          u = Buffer.from("\r\n"),
          c = function () {};
        function f(e) {
          if (!(this instanceof f)) return new f(e);
          if (
            (n.call(this, e),
            !e || (!e.headerFirst && "string" != typeof e.boundary))
          )
            throw TypeError("Boundary required");
          "string" == typeof e.boundary
            ? this.setBoundary(e.boundary)
            : (this._bparser = void 0),
            (this._headerFirst = e.headerFirst),
            (this._dashes = 0),
            (this._parts = 0),
            (this._finished = !1),
            (this._realFinish = !1),
            (this._isPreamble = !0),
            (this._justMatched = !1),
            (this._firstWrite = !0),
            (this._inHeader = !0),
            (this._part = void 0),
            (this._cb = void 0),
            (this._ignoreData = !1),
            (this._partOpts = { highWaterMark: e.partHwm }),
            (this._pause = !1);
          let t = this;
          (this._hparser = new a(e)),
            this._hparser.on("header", function (e) {
              (t._inHeader = !1), t._part.emit("header", e);
            });
        }
        i(f, n),
          (f.prototype.emit = function (e) {
            if ("finish" !== e || this._realFinish)
              n.prototype.emit.apply(this, arguments);
            else if (!this._finished) {
              let e = this;
              process.nextTick(function () {
                if (
                  (e.emit("error", Error("Unexpected end of multipart data")),
                  e._part && !e._ignoreData)
                ) {
                  let t = e._isPreamble ? "Preamble" : "Part";
                  e._part.emit(
                    "error",
                    Error(
                      t +
                        " terminated early due to unexpected end of multipart data",
                    ),
                  ),
                    e._part.push(null),
                    process.nextTick(function () {
                      (e._realFinish = !0),
                        e.emit("finish"),
                        (e._realFinish = !1);
                    });
                  return;
                }
                (e._realFinish = !0), e.emit("finish"), (e._realFinish = !1);
              });
            }
          }),
          (f.prototype._write = function (e, t, r) {
            if (!this._hparser && !this._bparser) return r();
            if (this._headerFirst && this._isPreamble) {
              this._part ||
                ((this._part = new o(this._partOpts)),
                0 !== this.listenerCount("preamble")
                  ? this.emit("preamble", this._part)
                  : this._ignore());
              let t = this._hparser.push(e);
              if (this._inHeader || void 0 === t || !(t < e.length)) return r();
              e = e.slice(t);
            }
            this._firstWrite &&
              (this._bparser.push(u), (this._firstWrite = !1)),
              this._bparser.push(e),
              this._pause ? (this._cb = r) : r();
          }),
          (f.prototype.reset = function () {
            (this._part = void 0),
              (this._bparser = void 0),
              (this._hparser = void 0);
          }),
          (f.prototype.setBoundary = function (e) {
            let t = this;
            (this._bparser = new s("\r\n--" + e)),
              this._bparser.on("info", function (e, r, n, i) {
                t._oninfo(e, r, n, i);
              });
          }),
          (f.prototype._ignore = function () {
            this._part &&
              !this._ignoreData &&
              ((this._ignoreData = !0),
              this._part.on("error", c),
              this._part.resume());
          }),
          (f.prototype._oninfo = function (e, t, r, n) {
            let i,
              s,
              a = this,
              u = 0,
              c = !0;
            if (!this._part && this._justMatched && t) {
              for (; this._dashes < 2 && r + u < n; )
                if (45 === t[r + u]) ++u, ++this._dashes;
                else {
                  this._dashes && (i = l), (this._dashes = 0);
                  break;
                }
              if (
                (2 === this._dashes &&
                  (r + u < n &&
                    0 !== this.listenerCount("trailer") &&
                    this.emit("trailer", t.slice(r + u, n)),
                  this.reset(),
                  (this._finished = !0),
                  0 === a._parts &&
                    ((a._realFinish = !0),
                    a.emit("finish"),
                    (a._realFinish = !1))),
                this._dashes)
              )
                return;
            }
            this._justMatched && (this._justMatched = !1),
              !this._part &&
                ((this._part = new o(this._partOpts)),
                (this._part._read = function (e) {
                  a._unpause();
                }),
                this._isPreamble && 0 !== this.listenerCount("preamble")
                  ? this.emit("preamble", this._part)
                  : !0 !== this._isPreamble && 0 !== this.listenerCount("part")
                    ? this.emit("part", this._part)
                    : this._ignore(),
                this._isPreamble || (this._inHeader = !0)),
              t &&
                r < n &&
                !this._ignoreData &&
                (this._isPreamble || !this._inHeader
                  ? (i && this._part.push(i),
                    this._part.push(t.slice(r, n)) || (this._pause = !0))
                  : !this._isPreamble &&
                    this._inHeader &&
                    (i && this._hparser.push(i),
                    (s = this._hparser.push(t.slice(r, n))),
                    !this._inHeader &&
                      void 0 !== s &&
                      s < n &&
                      this._oninfo(!1, t, r + s, n))),
              e &&
                (this._hparser.reset(),
                this._isPreamble
                  ? (this._isPreamble = !1)
                  : r !== n &&
                    (++this._parts,
                    this._part.on("end", function () {
                      0 == --a._parts &&
                        (a._finished
                          ? ((a._realFinish = !0),
                            a.emit("finish"),
                            (a._realFinish = !1))
                          : a._unpause());
                    })),
                this._part.push(null),
                (this._part = void 0),
                (this._ignoreData = !1),
                (this._justMatched = !0),
                (this._dashes = 0));
          }),
          (f.prototype._unpause = function () {
            if (this._pause && ((this._pause = !1), this._cb)) {
              let e = this._cb;
              (this._cb = void 0), e();
            }
          }),
          (e.exports = f);
      },
      74998: (e) => {
        "use strict";
        e.exports = require("perf_hooks");
      },
      75919: (e) => {
        "use strict";
        e.exports = require("node:worker_threads");
      },
      76078: (e) => {
        "use strict";
        var t = Object.defineProperty,
          r = Object.getOwnPropertyDescriptor,
          n = Object.getOwnPropertyNames,
          i = Object.prototype.hasOwnProperty,
          s = (e, r) => t(e, "name", { value: r, configurable: !0 }),
          o = {};
        ((e, r) => {
          for (var n in r) t(e, n, { get: r[n], enumerable: !0 });
        })(o, { URLPattern: () => ee }),
          (e.exports = ((e, s, o, a) => {
            if ((s && "object" == typeof s) || "function" == typeof s)
              for (let l of n(s))
                i.call(e, l) ||
                  l === o ||
                  t(e, l, {
                    get: () => s[l],
                    enumerable: !(a = r(s, l)) || a.enumerable,
                  });
            return e;
          })(t({}, "__esModule", { value: !0 }), o));
        var a = class {
          type = 3;
          name = "";
          prefix = "";
          value = "";
          suffix = "";
          modifier = 3;
          constructor(e, t, r, n, i, s) {
            (this.type = e),
              (this.name = t),
              (this.prefix = r),
              (this.value = n),
              (this.suffix = i),
              (this.modifier = s);
          }
          hasCustomName() {
            return "" !== this.name && "number" != typeof this.name;
          }
        };
        s(a, "Part");
        var l = /[$_\p{ID_Start}]/u,
          u = /[$_\u200C\u200D\p{ID_Continue}]/u;
        function c(e, t) {
          return (t ? /^[\x00-\xFF]*$/ : /^[\x00-\x7F]*$/).test(e);
        }
        function f(e, t = !1) {
          let r = [],
            n = 0;
          for (; n < e.length; ) {
            let i = e[n],
              o = s(function (i) {
                if (!t) throw TypeError(i);
                r.push({ type: "INVALID_CHAR", index: n, value: e[n++] });
              }, "ErrorOrInvalid");
            if ("*" === i) {
              r.push({ type: "ASTERISK", index: n, value: e[n++] });
              continue;
            }
            if ("+" === i || "?" === i) {
              r.push({ type: "OTHER_MODIFIER", index: n, value: e[n++] });
              continue;
            }
            if ("\\" === i) {
              r.push({ type: "ESCAPED_CHAR", index: n++, value: e[n++] });
              continue;
            }
            if ("{" === i) {
              r.push({ type: "OPEN", index: n, value: e[n++] });
              continue;
            }
            if ("}" === i) {
              r.push({ type: "CLOSE", index: n, value: e[n++] });
              continue;
            }
            if (":" === i) {
              let t = "",
                i = n + 1;
              for (; i < e.length; ) {
                let r = e.substr(i, 1);
                if ((i === n + 1 && l.test(r)) || (i !== n + 1 && u.test(r))) {
                  t += e[i++];
                  continue;
                }
                break;
              }
              if (!t) {
                o(`Missing parameter name at ${n}`);
                continue;
              }
              r.push({ type: "NAME", index: n, value: t }), (n = i);
              continue;
            }
            if ("(" === i) {
              let t = 1,
                i = "",
                s = n + 1,
                a = !1;
              if ("?" === e[s]) {
                o(`Pattern cannot start with "?" at ${s}`);
                continue;
              }
              for (; s < e.length; ) {
                if (!c(e[s], !1)) {
                  o(`Invalid character '${e[s]}' at ${s}.`), (a = !0);
                  break;
                }
                if ("\\" === e[s]) {
                  i += e[s++] + e[s++];
                  continue;
                }
                if (")" === e[s]) {
                  if (0 == --t) {
                    s++;
                    break;
                  }
                } else if ("(" === e[s] && (t++, "?" !== e[s + 1])) {
                  o(`Capturing groups are not allowed at ${s}`), (a = !0);
                  break;
                }
                i += e[s++];
              }
              if (a) continue;
              if (t) {
                o(`Unbalanced pattern at ${n}`);
                continue;
              }
              if (!i) {
                o(`Missing pattern at ${n}`);
                continue;
              }
              r.push({ type: "REGEX", index: n, value: i }), (n = s);
              continue;
            }
            r.push({ type: "CHAR", index: n, value: e[n++] });
          }
          return r.push({ type: "END", index: n, value: "" }), r;
        }
        function h(e, t = {}) {
          let r = f(e);
          (t.delimiter ??= "/#?"), (t.prefixes ??= "./");
          let n = `[^${d(t.delimiter)}]+?`,
            i = [],
            o = 0,
            l = 0,
            u = new Set(),
            c = s((e) => {
              if (l < r.length && r[l].type === e) return r[l++].value;
            }, "tryConsume"),
            p = s(
              () => c("OTHER_MODIFIER") ?? c("ASTERISK"),
              "tryConsumeModifier",
            ),
            y = s((e) => {
              let t = c(e);
              if (void 0 !== t) return t;
              let { type: n, index: i } = r[l];
              throw TypeError(`Unexpected ${n} at ${i}, expected ${e}`);
            }, "mustConsume"),
            m = s(() => {
              let e = "",
                t;
              for (; (t = c("CHAR") ?? c("ESCAPED_CHAR")); ) e += t;
              return e;
            }, "consumeText"),
            b = s((e) => e, "DefaultEncodePart"),
            g = t.encodePart || b,
            _ = "",
            v = s((e) => {
              _ += e;
            }, "appendToPendingFixedValue"),
            T = s(() => {
              _.length && (i.push(new a(3, "", "", g(_), "", 3)), (_ = ""));
            }, "maybeAddPartFromPendingFixedValue"),
            E = s((e, t, r, s, l) => {
              let c,
                f,
                h = 3;
              switch (l) {
                case "?":
                  h = 1;
                  break;
                case "*":
                  h = 0;
                  break;
                case "+":
                  h = 2;
              }
              if (!t && !r && 3 === h) return void v(e);
              if ((T(), !t && !r)) {
                if (!e) return;
                i.push(new a(3, "", "", g(e), "", h));
                return;
              }
              let d = 2;
              if (
                ((c = r ? ("*" === r ? ".*" : r) : n) === n
                  ? ((d = 1), (c = ""))
                  : ".*" === c && ((d = 0), (c = "")),
                t ? (f = t) : r && (f = o++),
                u.has(f))
              )
                throw TypeError(`Duplicate name '${f}'.`);
              u.add(f), i.push(new a(d, f, g(e), c, g(s), h));
            }, "addPart");
          for (; l < r.length; ) {
            let e = c("CHAR"),
              r = c("NAME"),
              n = c("REGEX");
            if ((r || n || (n = c("ASTERISK")), r || n)) {
              let i = e ?? "";
              -1 === t.prefixes.indexOf(i) && (v(i), (i = "")),
                T(),
                E(i, r, n, "", p());
              continue;
            }
            let i = e ?? c("ESCAPED_CHAR");
            if (i) {
              v(i);
              continue;
            }
            if (c("OPEN")) {
              let e = m(),
                t = c("NAME"),
                r = c("REGEX");
              t || r || (r = c("ASTERISK"));
              let n = m();
              y("CLOSE"), E(e, t, r, n, p());
              continue;
            }
            T(), y("END");
          }
          return i;
        }
        function d(e) {
          return e.replace(/([.+*?^${}()[\]|/\\])/g, "\\$1");
        }
        function p(e) {
          return e && e.ignoreCase ? "ui" : "u";
        }
        function y(e, t, r) {
          return b(h(e, r), t, r);
        }
        function m(e) {
          switch (e) {
            case 0:
              return "*";
            case 1:
              return "?";
            case 2:
              return "+";
            case 3:
              return "";
          }
        }
        function b(e, t, r = {}) {
          (r.delimiter ??= "/#?"),
            (r.prefixes ??= "./"),
            (r.sensitive ??= !1),
            (r.strict ??= !1),
            (r.end ??= !0),
            (r.start ??= !0),
            (r.endsWith = "");
          let n = r.start ? "^" : "";
          for (let i of e) {
            if (3 === i.type) {
              3 === i.modifier
                ? (n += d(i.value))
                : (n += `(?:${d(i.value)})${m(i.modifier)}`);
              continue;
            }
            t && t.push(i.name);
            let e = `[^${d(r.delimiter)}]+?`,
              s = i.value;
            if (
              (1 === i.type ? (s = e) : 0 === i.type && (s = ".*"),
              !i.prefix.length && !i.suffix.length)
            ) {
              3 === i.modifier || 1 === i.modifier
                ? (n += `(${s})${m(i.modifier)}`)
                : (n += `((?:${s})${m(i.modifier)})`);
              continue;
            }
            if (3 === i.modifier || 1 === i.modifier) {
              (n += `(?:${d(i.prefix)}(${s})${d(i.suffix)})`),
                (n += m(i.modifier));
              continue;
            }
            (n += `(?:${d(i.prefix)}`),
              (n += `((?:${s})(?:`),
              (n += d(i.suffix)),
              (n += d(i.prefix)),
              (n += `(?:${s}))*)${d(i.suffix)})`),
              0 === i.modifier && (n += "?");
          }
          let i = `[${d(r.endsWith)}]|$`,
            s = `[${d(r.delimiter)}]`;
          if (r.end)
            return (
              r.strict || (n += `${s}?`),
              r.endsWith.length ? (n += `(?=${i})`) : (n += "$"),
              new RegExp(n, p(r))
            );
          r.strict || (n += `(?:${s}(?=${i}))?`);
          let o = !1;
          if (e.length) {
            let t = e[e.length - 1];
            3 === t.type &&
              3 === t.modifier &&
              (o = r.delimiter.indexOf(t) > -1);
          }
          return o || (n += `(?=${s}|${i})`), new RegExp(n, p(r));
        }
        s(c, "isASCII"),
          s(f, "lexer"),
          s(h, "parse"),
          s(d, "escapeString"),
          s(p, "flags"),
          s(y, "stringToRegexp"),
          s(m, "modifierToString"),
          s(b, "partsToRegexp");
        var g = { delimiter: "", prefixes: "", sensitive: !0, strict: !0 },
          _ = { delimiter: ".", prefixes: "", sensitive: !0, strict: !0 },
          v = { delimiter: "/", prefixes: "/", sensitive: !0, strict: !0 };
        function T(e, t) {
          return (
            !!e.length &&
            ("/" === e[0] ||
              (!!t &&
                !(e.length < 2) &&
                ("\\" == e[0] || "{" == e[0]) &&
                "/" == e[1]))
          );
        }
        function E(e, t) {
          return e.startsWith(t) ? e.substring(t.length, e.length) : e;
        }
        function x(e, t) {
          return e.endsWith(t) ? e.substr(0, e.length - t.length) : e;
        }
        function w(e) {
          return (
            !!e &&
            !(e.length < 2) &&
            ("[" === e[0] || (("\\" === e[0] || "{" === e[0]) && "[" === e[1]))
          );
        }
        s(T, "isAbsolutePathname"),
          s(E, "maybeStripPrefix"),
          s(x, "maybeStripSuffix"),
          s(w, "treatAsIPv6Hostname");
        var S = ["ftp", "file", "http", "https", "ws", "wss"];
        function P(e) {
          if (!e) return !0;
          for (let t of S) if (e.test(t)) return !0;
          return !1;
        }
        function O(e, t) {
          if (((e = E(e, "#")), t || "" === e)) return e;
          let r = new URL("https://example.com");
          return (r.hash = e), r.hash ? r.hash.substring(1, r.hash.length) : "";
        }
        function I(e, t) {
          if (((e = E(e, "?")), t || "" === e)) return e;
          let r = new URL("https://example.com");
          return (
            (r.search = e),
            r.search ? r.search.substring(1, r.search.length) : ""
          );
        }
        function k(e, t) {
          return t || "" === e ? e : w(e) ? M(e) : U(e);
        }
        function C(e, t) {
          if (t || "" === e) return e;
          let r = new URL("https://example.com");
          return (r.password = e), r.password;
        }
        function R(e, t) {
          if (t || "" === e) return e;
          let r = new URL("https://example.com");
          return (r.username = e), r.username;
        }
        function A(e, t, r) {
          if (r || "" === e) return e;
          if (t && !S.includes(t)) return new URL(`${t}:${e}`).pathname;
          let n = "/" == e[0];
          return (
            (e = new URL(n ? e : "/-" + e, "https://example.com").pathname),
            n || (e = e.substring(2, e.length)),
            e
          );
        }
        function N(e, t, r) {
          return L(t) === e && (e = ""), r || "" === e ? e : q(e);
        }
        function D(e, t) {
          return (e = x(e, ":")), t || "" === e ? e : j(e);
        }
        function L(e) {
          switch (e) {
            case "ws":
            case "http":
              return "80";
            case "wws":
            case "https":
              return "443";
            case "ftp":
              return "21";
            default:
              return "";
          }
        }
        function j(e) {
          if ("" === e) return e;
          if (/^[-+.A-Za-z0-9]*$/.test(e)) return e.toLowerCase();
          throw TypeError(`Invalid protocol '${e}'.`);
        }
        function F(e) {
          if ("" === e) return e;
          let t = new URL("https://example.com");
          return (t.username = e), t.username;
        }
        function B(e) {
          if ("" === e) return e;
          let t = new URL("https://example.com");
          return (t.password = e), t.password;
        }
        function U(e) {
          if ("" === e) return e;
          if (/[\t\n\r #%/:<>?@[\]^\\|]/g.test(e))
            throw TypeError(`Invalid hostname '${e}'`);
          let t = new URL("https://example.com");
          return (t.hostname = e), t.hostname;
        }
        function M(e) {
          if ("" === e) return e;
          if (/[^0-9a-fA-F[\]:]/g.test(e))
            throw TypeError(`Invalid IPv6 hostname '${e}'`);
          return e.toLowerCase();
        }
        function q(e) {
          if ("" === e || (/^[0-9]*$/.test(e) && 65535 >= parseInt(e)))
            return e;
          throw TypeError(`Invalid port '${e}'.`);
        }
        function $(e) {
          if ("" === e) return e;
          let t = new URL("https://example.com");
          return (
            (t.pathname = "/" !== e[0] ? "/-" + e : e),
            "/" !== e[0]
              ? t.pathname.substring(2, t.pathname.length)
              : t.pathname
          );
        }
        function G(e) {
          return "" === e ? e : new URL(`data:${e}`).pathname;
        }
        function H(e) {
          if ("" === e) return e;
          let t = new URL("https://example.com");
          return (t.search = e), t.search.substring(1, t.search.length);
        }
        function K(e) {
          if ("" === e) return e;
          let t = new URL("https://example.com");
          return (t.hash = e), t.hash.substring(1, t.hash.length);
        }
        s(P, "isSpecialScheme"),
          s(O, "canonicalizeHash"),
          s(I, "canonicalizeSearch"),
          s(k, "canonicalizeHostname"),
          s(C, "canonicalizePassword"),
          s(R, "canonicalizeUsername"),
          s(A, "canonicalizePathname"),
          s(N, "canonicalizePort"),
          s(D, "canonicalizeProtocol"),
          s(L, "defaultPortForProtocol"),
          s(j, "protocolEncodeCallback"),
          s(F, "usernameEncodeCallback"),
          s(B, "passwordEncodeCallback"),
          s(U, "hostnameEncodeCallback"),
          s(M, "ipv6HostnameEncodeCallback"),
          s(q, "portEncodeCallback"),
          s($, "standardURLPathnameEncodeCallback"),
          s(G, "pathURLPathnameEncodeCallback"),
          s(H, "searchEncodeCallback"),
          s(K, "hashEncodeCallback");
        var V = class {
          #e;
          #t = [];
          #r = {};
          #n = 0;
          #i = 1;
          #s = 0;
          #o = 0;
          #a = 0;
          #l = 0;
          #u = !1;
          constructor(e) {
            this.#e = e;
          }
          get result() {
            return this.#r;
          }
          parse() {
            for (
              this.#t = f(this.#e, !0);
              this.#n < this.#t.length;
              this.#n += this.#i
            ) {
              if (((this.#i = 1), "END" === this.#t[this.#n].type)) {
                if (0 === this.#o) {
                  this.#c(),
                    this.#f()
                      ? this.#h(9, 1)
                      : this.#d()
                        ? this.#h(8, 1)
                        : this.#h(7, 0);
                  continue;
                }
                if (2 === this.#o) {
                  this.#p(5);
                  continue;
                }
                this.#h(10, 0);
                break;
              }
              if (this.#a > 0)
                if (!this.#y()) continue;
                else this.#a -= 1;
              if (this.#m()) {
                this.#a += 1;
                continue;
              }
              switch (this.#o) {
                case 0:
                  this.#b() && this.#p(1);
                  break;
                case 1:
                  if (this.#b()) {
                    this.#g();
                    let e = 7,
                      t = 1;
                    this.#_() ? ((e = 2), (t = 3)) : this.#u && (e = 2),
                      this.#h(e, t);
                  }
                  break;
                case 2:
                  this.#v()
                    ? this.#p(3)
                    : (this.#T() || this.#d() || this.#f()) && this.#p(5);
                  break;
                case 3:
                  this.#E() ? this.#h(4, 1) : this.#v() && this.#h(5, 1);
                  break;
                case 4:
                  this.#v() && this.#h(5, 1);
                  break;
                case 5:
                  this.#x() ? (this.#l += 1) : this.#w() && (this.#l -= 1),
                    this.#S() && !this.#l
                      ? this.#h(6, 1)
                      : this.#T()
                        ? this.#h(7, 0)
                        : this.#d()
                          ? this.#h(8, 1)
                          : this.#f() && this.#h(9, 1);
                  break;
                case 6:
                  this.#T()
                    ? this.#h(7, 0)
                    : this.#d()
                      ? this.#h(8, 1)
                      : this.#f() && this.#h(9, 1);
                  break;
                case 7:
                  this.#d() ? this.#h(8, 1) : this.#f() && this.#h(9, 1);
                  break;
                case 8:
                  this.#f() && this.#h(9, 1);
              }
            }
            void 0 !== this.#r.hostname &&
              void 0 === this.#r.port &&
              (this.#r.port = "");
          }
          #h(e, t) {
            switch (this.#o) {
              case 0:
              case 2:
                break;
              case 1:
                this.#r.protocol = this.#P();
                break;
              case 3:
                this.#r.username = this.#P();
                break;
              case 4:
                this.#r.password = this.#P();
                break;
              case 5:
                this.#r.hostname = this.#P();
                break;
              case 6:
                this.#r.port = this.#P();
                break;
              case 7:
                this.#r.pathname = this.#P();
                break;
              case 8:
                this.#r.search = this.#P();
                break;
              case 9:
                this.#r.hash = this.#P();
            }
            0 !== this.#o &&
              10 !== e &&
              ([1, 2, 3, 4].includes(this.#o) &&
                [6, 7, 8, 9].includes(e) &&
                (this.#r.hostname ??= ""),
              [1, 2, 3, 4, 5, 6].includes(this.#o) &&
                [8, 9].includes(e) &&
                (this.#r.pathname ??= this.#u ? "/" : ""),
              [1, 2, 3, 4, 5, 6, 7].includes(this.#o) &&
                9 === e &&
                (this.#r.search ??= "")),
              this.#O(e, t);
          }
          #O(e, t) {
            (this.#o = e),
              (this.#s = this.#n + t),
              (this.#n += t),
              (this.#i = 0);
          }
          #c() {
            (this.#n = this.#s), (this.#i = 0);
          }
          #p(e) {
            this.#c(), (this.#o = e);
          }
          #I(e) {
            return (
              e < 0 && (e = this.#t.length - e),
              e < this.#t.length ? this.#t[e] : this.#t[this.#t.length - 1]
            );
          }
          #k(e, t) {
            let r = this.#I(e);
            return (
              r.value === t &&
              ("CHAR" === r.type ||
                "ESCAPED_CHAR" === r.type ||
                "INVALID_CHAR" === r.type)
            );
          }
          #b() {
            return this.#k(this.#n, ":");
          }
          #_() {
            return this.#k(this.#n + 1, "/") && this.#k(this.#n + 2, "/");
          }
          #v() {
            return this.#k(this.#n, "@");
          }
          #E() {
            return this.#k(this.#n, ":");
          }
          #S() {
            return this.#k(this.#n, ":");
          }
          #T() {
            return this.#k(this.#n, "/");
          }
          #d() {
            if (this.#k(this.#n, "?")) return !0;
            if ("?" !== this.#t[this.#n].value) return !1;
            let e = this.#I(this.#n - 1);
            return (
              "NAME" !== e.type &&
              "REGEX" !== e.type &&
              "CLOSE" !== e.type &&
              "ASTERISK" !== e.type
            );
          }
          #f() {
            return this.#k(this.#n, "#");
          }
          #m() {
            return "OPEN" == this.#t[this.#n].type;
          }
          #y() {
            return "CLOSE" == this.#t[this.#n].type;
          }
          #x() {
            return this.#k(this.#n, "[");
          }
          #w() {
            return this.#k(this.#n, "]");
          }
          #P() {
            let e = this.#t[this.#n],
              t = this.#I(this.#s).index;
            return this.#e.substring(t, e.index);
          }
          #g() {
            let e = {};
            Object.assign(e, g), (e.encodePart = j);
            let t = y(this.#P(), void 0, e);
            this.#u = P(t);
          }
        };
        s(V, "Parser");
        var Q = [
          "protocol",
          "username",
          "password",
          "hostname",
          "port",
          "pathname",
          "search",
          "hash",
        ];
        function W(e, t) {
          if ("string" != typeof e)
            throw TypeError("parameter 1 is not of type 'string'.");
          let r = new URL(e, t);
          return {
            protocol: r.protocol.substring(0, r.protocol.length - 1),
            username: r.username,
            password: r.password,
            hostname: r.hostname,
            port: r.port,
            pathname: r.pathname,
            search:
              "" !== r.search ? r.search.substring(1, r.search.length) : void 0,
            hash: "" !== r.hash ? r.hash.substring(1, r.hash.length) : void 0,
          };
        }
        function z(e, t) {
          return t ? J(e) : e;
        }
        function Y(e, t, r) {
          let n;
          if ("string" == typeof t.baseURL)
            try {
              (n = new URL(t.baseURL)),
                void 0 === t.protocol &&
                  (e.protocol = z(
                    n.protocol.substring(0, n.protocol.length - 1),
                    r,
                  )),
                r ||
                  void 0 !== t.protocol ||
                  void 0 !== t.hostname ||
                  void 0 !== t.port ||
                  void 0 !== t.username ||
                  (e.username = z(n.username, r)),
                r ||
                  void 0 !== t.protocol ||
                  void 0 !== t.hostname ||
                  void 0 !== t.port ||
                  void 0 !== t.username ||
                  void 0 !== t.password ||
                  (e.password = z(n.password, r)),
                void 0 === t.protocol &&
                  void 0 === t.hostname &&
                  (e.hostname = z(n.hostname, r)),
                void 0 === t.protocol &&
                  void 0 === t.hostname &&
                  void 0 === t.port &&
                  (e.port = z(n.port, r)),
                void 0 === t.protocol &&
                  void 0 === t.hostname &&
                  void 0 === t.port &&
                  void 0 === t.pathname &&
                  (e.pathname = z(n.pathname, r)),
                void 0 === t.protocol &&
                  void 0 === t.hostname &&
                  void 0 === t.port &&
                  void 0 === t.pathname &&
                  void 0 === t.search &&
                  (e.search = z(n.search.substring(1, n.search.length), r)),
                void 0 === t.protocol &&
                  void 0 === t.hostname &&
                  void 0 === t.port &&
                  void 0 === t.pathname &&
                  void 0 === t.search &&
                  void 0 === t.hash &&
                  (e.hash = z(n.hash.substring(1, n.hash.length), r));
            } catch {
              throw TypeError(`invalid baseURL '${t.baseURL}'.`);
            }
          if (
            ("string" == typeof t.protocol && (e.protocol = D(t.protocol, r)),
            "string" == typeof t.username && (e.username = R(t.username, r)),
            "string" == typeof t.password && (e.password = C(t.password, r)),
            "string" == typeof t.hostname && (e.hostname = k(t.hostname, r)),
            "string" == typeof t.port && (e.port = N(t.port, e.protocol, r)),
            "string" == typeof t.pathname)
          ) {
            if (((e.pathname = t.pathname), n && !T(e.pathname, r))) {
              let t = n.pathname.lastIndexOf("/");
              t >= 0 &&
                (e.pathname =
                  z(n.pathname.substring(0, t + 1), r) + e.pathname);
            }
            e.pathname = A(e.pathname, e.protocol, r);
          }
          return (
            "string" == typeof t.search && (e.search = I(t.search, r)),
            "string" == typeof t.hash && (e.hash = O(t.hash, r)),
            e
          );
        }
        function J(e) {
          return e.replace(/([+*?:{}()\\])/g, "\\$1");
        }
        function X(e) {
          return e.replace(/([.+*?^${}()[\]|/\\])/g, "\\$1");
        }
        function Z(e, t) {
          (t.delimiter ??= "/#?"),
            (t.prefixes ??= "./"),
            (t.sensitive ??= !1),
            (t.strict ??= !1),
            (t.end ??= !0),
            (t.start ??= !0),
            (t.endsWith = "");
          let r = `[^${X(t.delimiter)}]+?`,
            n = /[$_\u200C\u200D\p{ID_Continue}]/u,
            i = "";
          for (let s = 0; s < e.length; ++s) {
            let o = e[s];
            if (3 === o.type) {
              if (3 === o.modifier) {
                i += J(o.value);
                continue;
              }
              i += `{${J(o.value)}}${m(o.modifier)}`;
              continue;
            }
            let a = o.hasCustomName(),
              l =
                !!o.suffix.length ||
                (!!o.prefix.length &&
                  (1 !== o.prefix.length || !t.prefixes.includes(o.prefix))),
              u = s > 0 ? e[s - 1] : null,
              c = s < e.length - 1 ? e[s + 1] : null;
            if (
              !l &&
              a &&
              1 === o.type &&
              3 === o.modifier &&
              c &&
              !c.prefix.length &&
              !c.suffix.length
            )
              if (3 === c.type) {
                let e = c.value.length > 0 ? c.value[0] : "";
                l = n.test(e);
              } else l = !c.hasCustomName();
            if (!l && !o.prefix.length && u && 3 === u.type) {
              let e = u.value[u.value.length - 1];
              l = t.prefixes.includes(e);
            }
            l && (i += "{"),
              (i += J(o.prefix)),
              a && (i += `:${o.name}`),
              2 === o.type
                ? (i += `(${o.value})`)
                : 1 === o.type
                  ? a || (i += `(${r})`)
                  : 0 === o.type &&
                    (a ||
                    (u &&
                      3 !== u.type &&
                      3 === u.modifier &&
                      !l &&
                      "" === o.prefix)
                      ? (i += "(.*)")
                      : (i += "*")),
              1 === o.type &&
                a &&
                o.suffix.length &&
                n.test(o.suffix[0]) &&
                (i += "\\"),
              (i += J(o.suffix)),
              l && (i += "}"),
              3 !== o.modifier && (i += m(o.modifier));
          }
          return i;
        }
        s(W, "extractValues"),
          s(z, "processBaseURLString"),
          s(Y, "applyInit"),
          s(J, "escapePatternString"),
          s(X, "escapeRegexpString"),
          s(Z, "partsToPattern");
        var ee = class {
          #e;
          #t = {};
          #r = {};
          #n = {};
          #i = {};
          #s = !1;
          constructor(e = {}, t, r) {
            try {
              let n, i;
              if (
                ("string" == typeof t ? (n = t) : (r = t), "string" == typeof e)
              ) {
                let t = new V(e);
                if (
                  (t.parse(),
                  (e = t.result),
                  void 0 === n && "string" != typeof e.protocol)
                )
                  throw TypeError(
                    "A base URL must be provided for a relative constructor string.",
                  );
                e.baseURL = n;
              } else {
                if (!e || "object" != typeof e)
                  throw TypeError(
                    "parameter 1 is not of type 'string' and cannot convert to dictionary.",
                  );
                if (n) throw TypeError("parameter 1 is not of type 'string'.");
              }
              typeof r > "u" && (r = { ignoreCase: !1 });
              let s = { ignoreCase: !0 === r.ignoreCase };
              for (i of ((this.#e = Y(
                {
                  pathname: "*",
                  protocol: "*",
                  username: "*",
                  password: "*",
                  hostname: "*",
                  port: "*",
                  search: "*",
                  hash: "*",
                },
                e,
                !0,
              )),
              L(this.#e.protocol) === this.#e.port && (this.#e.port = ""),
              Q)) {
                if (!(i in this.#e)) continue;
                let e = {},
                  t = this.#e[i];
                switch (((this.#r[i] = []), i)) {
                  case "protocol":
                    Object.assign(e, g), (e.encodePart = j);
                    break;
                  case "username":
                    Object.assign(e, g), (e.encodePart = F);
                    break;
                  case "password":
                    Object.assign(e, g), (e.encodePart = B);
                    break;
                  case "hostname":
                    Object.assign(e, _),
                      w(t) ? (e.encodePart = M) : (e.encodePart = U);
                    break;
                  case "port":
                    Object.assign(e, g), (e.encodePart = q);
                    break;
                  case "pathname":
                    P(this.#t.protocol)
                      ? (Object.assign(e, v, s), (e.encodePart = $))
                      : (Object.assign(e, g, s), (e.encodePart = G));
                    break;
                  case "search":
                    Object.assign(e, g, s), (e.encodePart = H);
                    break;
                  case "hash":
                    Object.assign(e, g, s), (e.encodePart = K);
                }
                try {
                  (this.#i[i] = h(t, e)),
                    (this.#t[i] = b(this.#i[i], this.#r[i], e)),
                    (this.#n[i] = Z(this.#i[i], e)),
                    (this.#s = this.#s || this.#i[i].some((e) => 2 === e.type));
                } catch {
                  throw TypeError(`invalid ${i} pattern '${this.#e[i]}'.`);
                }
              }
            } catch (e) {
              throw TypeError(`Failed to construct 'URLPattern': ${e.message}`);
            }
          }
          get [Symbol.toStringTag]() {
            return "URLPattern";
          }
          test(e = {}, t) {
            let r,
              n = {
                pathname: "",
                protocol: "",
                username: "",
                password: "",
                hostname: "",
                port: "",
                search: "",
                hash: "",
              };
            if ("string" != typeof e && t)
              throw TypeError("parameter 1 is not of type 'string'.");
            if (typeof e > "u") return !1;
            try {
              n = "object" == typeof e ? Y(n, e, !1) : Y(n, W(e, t), !1);
            } catch {
              return !1;
            }
            for (r of Q) if (!this.#t[r].exec(n[r])) return !1;
            return !0;
          }
          exec(e = {}, t) {
            let r,
              n = {
                pathname: "",
                protocol: "",
                username: "",
                password: "",
                hostname: "",
                port: "",
                search: "",
                hash: "",
              };
            if ("string" != typeof e && t)
              throw TypeError("parameter 1 is not of type 'string'.");
            if (typeof e > "u") return;
            try {
              n = "object" == typeof e ? Y(n, e, !1) : Y(n, W(e, t), !1);
            } catch {
              return null;
            }
            let i = {};
            for (r of (t ? (i.inputs = [e, t]) : (i.inputs = [e]), Q)) {
              let e = this.#t[r].exec(n[r]);
              if (!e) return null;
              let t = {};
              for (let [n, i] of this.#r[r].entries())
                if ("string" == typeof i || "number" == typeof i) {
                  let r = e[n + 1];
                  t[i] = r;
                }
              i[r] = { input: n[r] ?? "", groups: t };
            }
            return i;
          }
          static compareComponent(e, t, r) {
            let n = s((e, t) => {
                for (let r of [
                  "type",
                  "modifier",
                  "prefix",
                  "value",
                  "suffix",
                ]) {
                  if (e[r] < t[r]) return -1;
                  if (e[r] !== t[r]) return 1;
                }
                return 0;
              }, "comparePart"),
              i = new a(3, "", "", "", "", 3),
              o = new a(0, "", "", "", "", 3),
              l = s((e, t) => {
                let r = 0;
                for (; r < Math.min(e.length, t.length); ++r) {
                  let i = n(e[r], t[r]);
                  if (i) return i;
                }
                return e.length === t.length ? 0 : n(e[r] ?? i, t[r] ?? i);
              }, "comparePartList");
            return t.#n[e] || r.#n[e]
              ? t.#n[e] && !r.#n[e]
                ? l(t.#i[e], [o])
                : l(!t.#n[e] && r.#n[e] ? [o] : t.#i[e], r.#i[e])
              : 0;
          }
          get protocol() {
            return this.#n.protocol;
          }
          get username() {
            return this.#n.username;
          }
          get password() {
            return this.#n.password;
          }
          get hostname() {
            return this.#n.hostname;
          }
          get port() {
            return this.#n.port;
          }
          get pathname() {
            return this.#n.pathname;
          }
          get search() {
            return this.#n.search;
          }
          get hash() {
            return this.#n.hash;
          }
          get hasRegExpGroups() {
            return this.#s;
          }
        };
        s(ee, "URLPattern");
      },
      76760: (e) => {
        "use strict";
        e.exports = require("node:path");
      },
      77030: (e) => {
        "use strict";
        e.exports = require("node:net");
      },
      77598: (e) => {
        "use strict";
        e.exports = require("node:crypto");
      },
      78474: (e) => {
        "use strict";
        e.exports = require("node:events");
      },
      79428: (e) => {
        "use strict";
        e.exports = require("buffer");
      },
      79551: (e) => {
        "use strict";
        e.exports = require("url");
      },
      79646: (e) => {
        "use strict";
        e.exports = require("child_process");
      },
      80481: (e) => {
        "use strict";
        e.exports = require("node:readline");
      },
      80780: (e, t) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.isPromise = n),
          (t.isActualPromise = i),
          (t.handleMaybePromise = s),
          (t.fakePromise = o),
          (t.createDeferredPromise = function () {
            let e, t;
            return Promise.withResolvers
              ? Promise.withResolvers()
              : {
                  promise: new Promise(function (r, n) {
                    (e = r), (t = n);
                  }),
                  get resolve() {
                    return e;
                  },
                  get reject() {
                    return t;
                  },
                };
          }),
          (t.iterateAsync = a),
          (t.iterateAsyncVoid = a),
          (t.fakeRejectPromise = l),
          (t.mapMaybePromise = function (e, t, r) {
            return s(() => e, t, r);
          }),
          (t.mapAsyncIterator = function (e, t, r, n) {
            let i, a, c, f;
            if (
              (Symbol.asyncIterator in e && (e = e[Symbol.asyncIterator]()), n)
            ) {
              let e;
              c = (t) =>
                (e ||= s(
                  n,
                  () => t,
                  () => t,
                ));
            }
            function h(e) {
              return e.done
                ? c
                  ? c(e)
                  : e
                : s(
                    () => e.value,
                    (e) => s(() => t(e), u, a),
                  );
            }
            if (
              ("function" == typeof e.return &&
                ((i = e.return),
                (a = (t) => {
                  let r = () => {
                    throw t;
                  };
                  return i.call(e).then(r, r);
                })),
              r)
            ) {
              let e;
              f = (t) =>
                (e ||= s(
                  () => t,
                  (e) => s(() => r(e), u, a),
                ));
            }
            return {
              next: () => e.next().then(h, f),
              return() {
                let t = i
                  ? i.call(e).then(h, f)
                  : o({ value: void 0, done: !0 });
                return c ? t.then(c) : t;
              },
              throw: (t) =>
                "function" == typeof e.throw
                  ? e.throw(t).then(h, f)
                  : a
                    ? a(t)
                    : l(t),
              [Symbol.asyncIterator]() {
                return this;
              },
            };
          }),
          (t.promiseLikeFinally = c),
          (t.unfakePromise = f);
        let r = Symbol.for("@whatwg-node/promise-helpers/FakePromise");
        function n(e) {
          return e?.then != null;
        }
        function i(e) {
          return e && e.then && e.catch && e.finally;
        }
        function s(e, t, r, n) {
          let i = o().then(e).then(t, r);
          return n && (i = i.finally(n)), f(i);
        }
        function o(e) {
          return e && i(e)
            ? e
            : n(e)
              ? {
                  then: (t, r) => o(e.then(t, r)),
                  catch: (t) => o(e.then((e) => e, t)),
                  finally: (t) => o(t ? c(e, t) : e),
                  [Symbol.toStringTag]: "Promise",
                }
              : {
                  then(t) {
                    if (t)
                      try {
                        return o(t(e));
                      } catch (e) {
                        return l(e);
                      }
                    return this;
                  },
                  catch() {
                    return this;
                  },
                  finally(t) {
                    if (t)
                      try {
                        return o(t()).then(
                          () => e,
                          () => e,
                        );
                      } catch (e) {
                        return l(e);
                      }
                    return this;
                  },
                  [Symbol.toStringTag]: "Promise",
                  __fakePromiseValue: e,
                  [r]: "resolved",
                };
        }
        function a(e, t, r) {
          if (e?.length === 0) return;
          let n = e[Symbol.iterator](),
            i = 0;
          return (function e() {
            let { done: o, value: a } = n.next();
            if (o) return;
            let l = !1;
            function u() {
              l = !0;
            }
            return s(
              function () {
                return t(a, u, i++);
              },
              function (t) {
                if ((t && r?.push(t), !l)) return e();
              },
            );
          })();
        }
        function l(e) {
          return {
            then(t, r) {
              if (r)
                try {
                  return o(r(e));
                } catch (e) {
                  return l(e);
                }
              return this;
            },
            catch(t) {
              if (t)
                try {
                  return o(t(e));
                } catch (e) {
                  return l(e);
                }
              return this;
            },
            finally(e) {
              if (e)
                try {
                  e();
                } catch (e) {
                  return l(e);
                }
              return this;
            },
            __fakeRejectError: e,
            [Symbol.toStringTag]: "Promise",
            [r]: "rejected",
          };
        }
        function u(e) {
          return { value: e, done: !1 };
        }
        function c(e, t) {
          return "finally" in e
            ? e.finally(t)
            : e.then(
                (e) => {
                  let r = t();
                  return n(r) ? r.then(() => e) : e;
                },
                (e) => {
                  let r = t();
                  if (n(r))
                    return r.then(() => {
                      throw e;
                    });
                  throw e;
                },
              );
        }
        function f(e) {
          if (e?.[r] === "resolved") return e.__fakePromiseValue;
          if (e?.[r] === "rejected") throw e.__fakeRejectError;
          return e;
        }
      },
      81630: (e) => {
        "use strict";
        e.exports = require("http");
      },
      83901: (e, t, r) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.PonyfillTextDecoder = t.PonyfillTextEncoder = void 0),
          (t.PonyfillBtoa = function (e) {
            return n.Buffer.from(e, "binary").toString("base64");
          });
        let n = r(4573),
          i = r(13753);
        class s {
          encoding;
          constructor(e = "utf-8") {
            this.encoding = e;
          }
          encode(e) {
            return n.Buffer.from(e, this.encoding);
          }
          encodeInto(e, t) {
            let r = this.encode(e).copy(t);
            return { read: r, written: r };
          }
        }
        t.PonyfillTextEncoder = s;
        class o {
          encoding;
          fatal = !1;
          ignoreBOM = !1;
          constructor(e = "utf-8", t) {
            (this.encoding = e),
              t &&
                ((this.fatal = t.fatal || !1),
                (this.ignoreBOM = t.ignoreBOM || !1));
          }
          decode(e) {
            return n.Buffer.isBuffer(e)
              ? e.toString(this.encoding)
              : (0, i.isArrayBufferView)(e)
                ? n.Buffer.from(e.buffer, e.byteOffset, e.byteLength).toString(
                    this.encoding,
                  )
                : n.Buffer.from(e).toString(this.encoding);
          }
        }
        t.PonyfillTextDecoder = o;
      },
      83997: (e) => {
        "use strict";
        e.exports = require("tty");
      },
      84297: (e) => {
        "use strict";
        e.exports = require("async_hooks");
      },
      85528: (e, t, r) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.TextEncoderStream =
            t.TextDecoderStream =
            t.IteratorObject =
            t.DecompressionStream =
            t.CompressionStream =
            t.TransformStream =
            t.WritableStream =
            t.URLSearchParams =
            t.URL =
            t.btoa =
            t.TextDecoder =
            t.TextEncoder =
            t.Blob =
            t.FormData =
            t.File =
            t.ReadableStream =
            t.Response =
            t.Request =
            t.Body =
            t.Headers =
            t.fetch =
              void 0);
        var n = r(73872);
        Object.defineProperty(t, "fetch", {
          enumerable: !0,
          get: function () {
            return n.fetchPonyfill;
          },
        });
        var i = r(8462);
        Object.defineProperty(t, "Headers", {
          enumerable: !0,
          get: function () {
            return i.PonyfillHeaders;
          },
        });
        var s = r(85786);
        Object.defineProperty(t, "Body", {
          enumerable: !0,
          get: function () {
            return s.PonyfillBody;
          },
        });
        var o = r(31141);
        Object.defineProperty(t, "Request", {
          enumerable: !0,
          get: function () {
            return o.PonyfillRequest;
          },
        });
        var a = r(97609);
        Object.defineProperty(t, "Response", {
          enumerable: !0,
          get: function () {
            return a.PonyfillResponse;
          },
        });
        var l = r(60626);
        Object.defineProperty(t, "ReadableStream", {
          enumerable: !0,
          get: function () {
            return l.PonyfillReadableStream;
          },
        });
        var u = r(26523);
        Object.defineProperty(t, "File", {
          enumerable: !0,
          get: function () {
            return u.PonyfillFile;
          },
        });
        var c = r(16068);
        Object.defineProperty(t, "FormData", {
          enumerable: !0,
          get: function () {
            return c.PonyfillFormData;
          },
        });
        var f = r(53701);
        Object.defineProperty(t, "Blob", {
          enumerable: !0,
          get: function () {
            return f.PonyfillBlob;
          },
        });
        var h = r(83901);
        Object.defineProperty(t, "TextEncoder", {
          enumerable: !0,
          get: function () {
            return h.PonyfillTextEncoder;
          },
        }),
          Object.defineProperty(t, "TextDecoder", {
            enumerable: !0,
            get: function () {
              return h.PonyfillTextDecoder;
            },
          }),
          Object.defineProperty(t, "btoa", {
            enumerable: !0,
            get: function () {
              return h.PonyfillBtoa;
            },
          });
        var d = r(94849);
        Object.defineProperty(t, "URL", {
          enumerable: !0,
          get: function () {
            return d.PonyfillURL;
          },
        });
        var p = r(18855);
        Object.defineProperty(t, "URLSearchParams", {
          enumerable: !0,
          get: function () {
            return p.PonyfillURLSearchParams;
          },
        });
        var y = r(60102);
        Object.defineProperty(t, "WritableStream", {
          enumerable: !0,
          get: function () {
            return y.PonyfillWritableStream;
          },
        });
        var m = r(32296);
        Object.defineProperty(t, "TransformStream", {
          enumerable: !0,
          get: function () {
            return m.PonyfillTransformStream;
          },
        });
        var b = r(33426);
        Object.defineProperty(t, "CompressionStream", {
          enumerable: !0,
          get: function () {
            return b.PonyfillCompressionStream;
          },
        });
        var g = r(70263);
        Object.defineProperty(t, "DecompressionStream", {
          enumerable: !0,
          get: function () {
            return g.PonyfillDecompressionStream;
          },
        });
        var _ = r(94591);
        Object.defineProperty(t, "IteratorObject", {
          enumerable: !0,
          get: function () {
            return _.PonyfillIteratorObject;
          },
        });
        var v = r(9229);
        Object.defineProperty(t, "TextDecoderStream", {
          enumerable: !0,
          get: function () {
            return v.PonyfillTextDecoderStream;
          },
        }),
          Object.defineProperty(t, "TextEncoderStream", {
            enumerable: !0,
            get: function () {
              return v.PonyfillTextEncoderStream;
            },
          });
      },
      85786: (e, t, r) => {
        "use strict";
        var n;
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.PonyfillBody = void 0);
        let i = r(4573),
          s = r(37067),
          o = r(57075),
          a = r(31351),
          l = r(80780),
          u = r(53701),
          c = r(26523),
          f = r(16068),
          h = r(60626),
          d = r(13753);
        !(function (e) {
          (e.ReadableStream = "ReadableStream"),
            (e.Blob = "Blob"),
            (e.FormData = "FormData"),
            (e.String = "String"),
            (e.Readable = "Readable"),
            (e.Buffer = "Buffer"),
            (e.AsyncIterable = "AsyncIterable");
        })(n || (n = {}));
        class p {
          bodyInit;
          options;
          bodyUsed = !1;
          contentType = null;
          contentLength = null;
          _signal = null;
          constructor(e, t = {}) {
            (this.bodyInit = e),
              (this.options = t),
              (this._signal = t.signal || null);
            let {
              bodyFactory: r,
              contentType: a,
              contentLength: l,
              bodyType: u,
              buffer: c,
            } = (function (e, t) {
              var r, a, l, u;
              if (null == e)
                return {
                  bodyFactory: () => null,
                  contentType: null,
                  contentLength: null,
                };
              if ("string" == typeof e) {
                let t = i.Buffer.byteLength(e);
                return {
                  bodyType: n.String,
                  contentType: "text/plain;charset=UTF-8",
                  contentLength: t,
                  bodyFactory() {
                    let t = o.Readable.from(i.Buffer.from(e, "utf-8"));
                    return new h.PonyfillReadableStream(t);
                  },
                };
              }
              if (i.Buffer.isBuffer(e))
                return {
                  bodyType: n.Buffer,
                  contentType: null,
                  contentLength: e.length,
                  buffer: e,
                  bodyFactory() {
                    let t = o.Readable.from(e);
                    return new h.PonyfillReadableStream(t);
                  },
                };
              if ((0, d.isArrayBufferView)(e)) {
                let t = i.Buffer.from(e.buffer, e.byteOffset, e.byteLength);
                return {
                  bodyType: n.Buffer,
                  contentLength: e.byteLength,
                  contentType: null,
                  buffer: t,
                  bodyFactory() {
                    let e = o.Readable.from(t);
                    return new h.PonyfillReadableStream(e);
                  },
                };
              }
              if (e instanceof h.PonyfillReadableStream && null != e.readable)
                return {
                  bodyType: n.ReadableStream,
                  bodyFactory: () => e,
                  contentType: null,
                  contentLength: null,
                };
              if (((r = e), r?.stream != null && "function" == typeof r.stream))
                return {
                  bodyType: n.Blob,
                  contentType: e.type,
                  contentLength: e.size,
                  bodyFactory: () => e.stream(),
                };
              if (e instanceof ArrayBuffer) {
                let t = e.byteLength,
                  r = i.Buffer.from(e, void 0, e.byteLength);
                return {
                  bodyType: n.Buffer,
                  contentType: null,
                  contentLength: t,
                  buffer: r,
                  bodyFactory() {
                    let e = o.Readable.from(r);
                    return new h.PonyfillReadableStream(e);
                  },
                };
              }
              if (e instanceof s.IncomingMessage) {
                let r = (0, d.wrapIncomingMessageWithPassthrough)({
                  incomingMessage: e,
                  signal: t,
                });
                return {
                  bodyType: n.Readable,
                  contentType: null,
                  contentLength: null,
                  bodyFactory: () => new h.PonyfillReadableStream(r),
                };
              }
              if (e instanceof o.Readable)
                return {
                  bodyType: n.Readable,
                  contentType: null,
                  contentLength: null,
                  bodyFactory: () => new h.PonyfillReadableStream(e),
                };
              if (((a = e), a?.sort != null))
                return {
                  bodyType: n.String,
                  contentType:
                    "application/x-www-form-urlencoded;charset=UTF-8",
                  contentLength: null,
                  bodyFactory: () =>
                    new h.PonyfillReadableStream(o.Readable.from(e.toString())),
                };
              if (((l = e), l?.forEach != null)) {
                let t = Math.random().toString(36).substr(2),
                  r = `multipart/form-data; boundary=${t}`;
                return {
                  bodyType: n.FormData,
                  contentType: r,
                  contentLength: null,
                  bodyFactory: () => (0, f.getStreamFromFormData)(e, t),
                };
              }
              if (((u = e), u?.getReader != null))
                return {
                  contentType: null,
                  contentLength: null,
                  bodyFactory: () => new h.PonyfillReadableStream(e),
                };
              if (e[Symbol.iterator] || e[Symbol.asyncIterator])
                return {
                  contentType: null,
                  contentLength: null,
                  bodyType: n.AsyncIterable,
                  bodyFactory() {
                    let t = o.Readable.from(e);
                    return new h.PonyfillReadableStream(t);
                  },
                };
              throw Error("Unknown body type");
            })(e, t?.signal);
            (this._bodyFactory = r),
              (this.contentType = a),
              (this.contentLength = l),
              (this.bodyType = u),
              (this._buffer = c);
          }
          bodyType;
          _bodyFactory = () => null;
          _generatedBody = null;
          _buffer;
          generateBody() {
            if (
              (this._generatedBody?.readable?.destroyed &&
                this._buffer &&
                (this._generatedBody.readable = o.Readable.from(this._buffer)),
              this._generatedBody)
            )
              return this._generatedBody;
            let e = this._bodyFactory();
            return (this._generatedBody = e), e;
          }
          handleContentLengthHeader(e = !1) {
            let t = this.headers.get("content-type");
            t
              ? (this.contentType = t)
              : this.contentType &&
                this.headers.set("content-type", this.contentType);
            let r = this.headers.get("content-length");
            e &&
              null == this.bodyInit &&
              !r &&
              ((this.contentLength = 0),
              this.headers.set("content-length", "0")),
              r
                ? (this.contentLength = parseInt(r, 10))
                : this.contentLength &&
                  this.headers.set(
                    "content-length",
                    this.contentLength.toString(),
                  );
          }
          get body() {
            let e = this.generateBody();
            if (null != e) {
              let t = e.readable;
              return new Proxy(e.readable, {
                get(r, n) {
                  if (n in e) {
                    let t = e[n];
                    return "function" == typeof t ? t.bind(e) : t;
                  }
                  if (n in t) {
                    let e = t[n];
                    return "function" == typeof e ? e.bind(t) : e;
                  }
                },
              });
            }
            return null;
          }
          _chunks = null;
          _doCollectChunksFromReadableJob() {
            if (this.bodyType === n.AsyncIterable) {
              if (Array.fromAsync)
                return (0, l.handleMaybePromise)(
                  () => Array.fromAsync(this.bodyInit),
                  (e) => ((this._chunks = e), this._chunks),
                );
              let e = this.bodyInit[Symbol.asyncIterator](),
                t = [],
                r = () =>
                  (0, l.handleMaybePromise)(
                    () => e.next(),
                    ({ value: e, done: n }) =>
                      (e && t.push(e), n)
                        ? ((this._chunks = t), this._chunks)
                        : r(),
                  );
              return r();
            }
            let e = this.generateBody();
            return e
              ? e.readable
                  .toArray()
                  .then((e) => ((this._chunks = e), this._chunks))
              : ((this._chunks = []), (0, d.fakePromise)(this._chunks));
          }
          _collectChunksFromReadable() {
            return this._chunks
              ? (0, d.fakePromise)(this._chunks)
              : ((this._chunks ||= this._doCollectChunksFromReadableJob()),
                this._chunks);
          }
          _blob = null;
          blob() {
            return this._blob
              ? (0, d.fakePromise)(this._blob)
              : (this.bodyType === n.String &&
                    ((this._text = this.bodyInit),
                    (this._blob = new u.PonyfillBlob([this._text], {
                      type: this.contentType || "text/plain;charset=UTF-8",
                      size: this.contentLength,
                    }))),
                  this.bodyType === n.Blob)
                ? ((this._blob = this.bodyInit), (0, d.fakePromise)(this._blob))
                : this._buffer
                  ? ((this._blob = new u.PonyfillBlob([this._buffer], {
                      type: this.contentType || "",
                      size: this.contentLength,
                    })),
                    (0, d.fakePromise)(this._blob))
                  : (0, d.fakePromise)(
                      (0, l.handleMaybePromise)(
                        () => this._collectChunksFromReadable(),
                        (e) => (
                          (this._blob = new u.PonyfillBlob(e, {
                            type: this.contentType || "",
                            size: this.contentLength,
                          })),
                          this._blob
                        ),
                      ),
                    );
          }
          _formData = null;
          formData(e) {
            if (this._formData) return (0, d.fakePromise)(this._formData);
            if (this.bodyType === n.FormData)
              return (
                (this._formData = this.bodyInit),
                (0, d.fakePromise)(this._formData)
              );
            if (
              ((this._formData = new f.PonyfillFormData()),
              null == this.generateBody())
            )
              return (0, d.fakePromise)(this._formData);
            let t = { ...this.options.formDataLimits, ...e?.formDataLimits };
            return new Promise((e, r) => {
              let n = this.body?.readable;
              if (!n) return r(Error("No stream available"));
              let i = null,
                s = new a.Busboy({
                  headers: {
                    "content-length":
                      "number" == typeof this.contentLength
                        ? this.contentLength.toString()
                        : this.contentLength || "",
                    "content-type": this.contentType || "",
                  },
                  limits: t,
                  defCharset: "utf-8",
                });
              this._signal && (0, o.addAbortSignal)(this._signal, s);
              let l = !1,
                u = (t) => {
                  l ||
                    ((l = !0),
                    n.unpipe(s),
                    s.destroy(),
                    i && (i.destroy(), (i = null)),
                    t ? r(t) : e(this._formData));
                };
              n.on("error", u),
                s.on("field", (e, r, n, i) =>
                  n
                    ? u(
                        Error(
                          `Field name size exceeded: ${t?.fieldNameSize} bytes`,
                        ),
                      )
                    : i
                      ? u(
                          Error(
                            `Field value size exceeded: ${t?.fieldSize} bytes`,
                          ),
                        )
                      : void this._formData.set(e, r),
                ),
                s.on("file", (e, r, n, s, o) => {
                  i = r;
                  let a = [];
                  r.on("data", (e) => {
                    a.push(e);
                  }),
                    r.on("error", u),
                    r.on("limit", () => {
                      u(
                        Error(`File size limit exceeded: ${t?.fileSize} bytes`),
                      );
                    }),
                    r.on("close", () => {
                      r.truncated &&
                        u(
                          Error(
                            `File size limit exceeded: ${t?.fileSize} bytes`,
                          ),
                        ),
                        (i = null);
                      let s = new c.PonyfillFile(a, n, { type: o });
                      this._formData.set(e, s);
                    });
                }),
                s.on("fieldsLimit", () => {
                  u(Error(`Fields limit exceeded: ${t?.fields}`));
                }),
                s.on("filesLimit", () => {
                  u(Error(`Files limit exceeded: ${t?.files}`));
                }),
                s.on("partsLimit", () => {
                  u(Error(`Parts limit exceeded: ${t?.parts}`));
                }),
                s.on("end", u),
                s.on("finish", u),
                s.on("close", u),
                s.on("error", u),
                n.pipe(s);
            });
          }
          buffer() {
            if (this._buffer) return (0, d.fakePromise)(this._buffer);
            if (this._text)
              return (
                (this._buffer = i.Buffer.from(this._text, "utf-8")),
                (0, d.fakePromise)(this._buffer)
              );
            if (this.bodyType === n.String)
              return this.text().then(
                (e) => (
                  (this._text = e),
                  (this._buffer = i.Buffer.from(e, "utf-8")),
                  this._buffer
                ),
              );
            if (this.bodyType === n.Blob) {
              if ((0, u.hasBufferMethod)(this.bodyInit))
                return this.bodyInit
                  .buffer()
                  .then((e) => ((this._buffer = e), this._buffer));
              if ((0, u.hasBytesMethod)(this.bodyInit))
                return this.bodyInit
                  .bytes()
                  .then(
                    (e) => ((this._buffer = i.Buffer.from(e)), this._buffer),
                  );
              if ((0, u.hasArrayBufferMethod)(this.bodyInit))
                return this.bodyInit
                  .arrayBuffer()
                  .then(
                    (e) => (
                      (this._buffer = i.Buffer.from(e, void 0, e.byteLength)),
                      this._buffer
                    ),
                  );
            }
            return (0, d.fakePromise)(
              (0, l.handleMaybePromise)(
                () => this._collectChunksFromReadable(),
                (e) => (
                  1 === e.length
                    ? (this._buffer = e[0])
                    : (this._buffer = i.Buffer.concat(e)),
                  this._buffer
                ),
              ),
            );
          }
          bytes() {
            return this.buffer();
          }
          arrayBuffer() {
            return this.buffer();
          }
          _json = null;
          json() {
            return this._json
              ? (0, d.fakePromise)(this._json)
              : this.text().then((e) => {
                  try {
                    this._json = JSON.parse(e);
                  } catch (t) {
                    throw (
                      (t instanceof SyntaxError &&
                        (t.message += `, "${e}" is not valid JSON`),
                      t)
                    );
                  }
                  return this._json;
                });
          }
          _text = null;
          text() {
            return this._text
              ? (0, d.fakePromise)(this._text)
              : this.bodyType === n.String
                ? ((this._text = this.bodyInit), (0, d.fakePromise)(this._text))
                : this.buffer().then(
                    (e) => ((this._text = e.toString("utf-8")), this._text),
                  );
          }
        }
        t.PonyfillBody = p;
      },
      86592: (e) => {
        "use strict";
        e.exports = require("node:inspector");
      },
      86651: (e, t, r) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.isSyncDisposable = function (e) {
            return e?.[n.DisposableSymbols.dispose] != null;
          }),
          (t.isAsyncDisposable = function (e) {
            return e?.[n.DisposableSymbols.asyncDispose] != null;
          });
        let n = r(39439);
      },
      88084: (e) => {
        function t(e) {
          var t = Error("Cannot find module '" + e + "'");
          throw ((t.code = "MODULE_NOT_FOUND"), t);
        }
        (t.keys = () => []), (t.resolve = t), (t.id = 88084), (e.exports = t);
      },
      88374: (e, t, r) => {
        "use strict";
        let n = r(57975).inherits,
          i = r(57075).Readable;
        function s(e) {
          i.call(this, e);
        }
        n(s, i), (s.prototype._read = function (e) {}), (e.exports = s);
      },
      91627: (e, t, r) => {
        "use strict";
        let n = r(40605),
          i = /%[a-fA-F0-9][a-fA-F0-9]/g,
          s = {
            "%00": "\0",
            "%01": "\x01",
            "%02": "\x02",
            "%03": "\x03",
            "%04": "\x04",
            "%05": "\x05",
            "%06": "\x06",
            "%07": "\x07",
            "%08": "\b",
            "%09": "	",
            "%0a": "\n",
            "%0A": "\n",
            "%0b": "\v",
            "%0B": "\v",
            "%0c": "\f",
            "%0C": "\f",
            "%0d": "\r",
            "%0D": "\r",
            "%0e": "\x0e",
            "%0E": "\x0e",
            "%0f": "\x0f",
            "%0F": "\x0f",
            "%10": "\x10",
            "%11": "\x11",
            "%12": "\x12",
            "%13": "\x13",
            "%14": "\x14",
            "%15": "\x15",
            "%16": "\x16",
            "%17": "\x17",
            "%18": "\x18",
            "%19": "\x19",
            "%1a": "\x1a",
            "%1A": "\x1a",
            "%1b": "\x1b",
            "%1B": "\x1b",
            "%1c": "\x1c",
            "%1C": "\x1c",
            "%1d": "\x1d",
            "%1D": "\x1d",
            "%1e": "\x1e",
            "%1E": "\x1e",
            "%1f": "\x1f",
            "%1F": "\x1f",
            "%20": " ",
            "%21": "!",
            "%22": '"',
            "%23": "#",
            "%24": "$",
            "%25": "%",
            "%26": "&",
            "%27": "'",
            "%28": "(",
            "%29": ")",
            "%2a": "*",
            "%2A": "*",
            "%2b": "+",
            "%2B": "+",
            "%2c": ",",
            "%2C": ",",
            "%2d": "-",
            "%2D": "-",
            "%2e": ".",
            "%2E": ".",
            "%2f": "/",
            "%2F": "/",
            "%30": "0",
            "%31": "1",
            "%32": "2",
            "%33": "3",
            "%34": "4",
            "%35": "5",
            "%36": "6",
            "%37": "7",
            "%38": "8",
            "%39": "9",
            "%3a": ":",
            "%3A": ":",
            "%3b": ";",
            "%3B": ";",
            "%3c": "<",
            "%3C": "<",
            "%3d": "=",
            "%3D": "=",
            "%3e": ">",
            "%3E": ">",
            "%3f": "?",
            "%3F": "?",
            "%40": "@",
            "%41": "A",
            "%42": "B",
            "%43": "C",
            "%44": "D",
            "%45": "E",
            "%46": "F",
            "%47": "G",
            "%48": "H",
            "%49": "I",
            "%4a": "J",
            "%4A": "J",
            "%4b": "K",
            "%4B": "K",
            "%4c": "L",
            "%4C": "L",
            "%4d": "M",
            "%4D": "M",
            "%4e": "N",
            "%4E": "N",
            "%4f": "O",
            "%4F": "O",
            "%50": "P",
            "%51": "Q",
            "%52": "R",
            "%53": "S",
            "%54": "T",
            "%55": "U",
            "%56": "V",
            "%57": "W",
            "%58": "X",
            "%59": "Y",
            "%5a": "Z",
            "%5A": "Z",
            "%5b": "[",
            "%5B": "[",
            "%5c": "\\",
            "%5C": "\\",
            "%5d": "]",
            "%5D": "]",
            "%5e": "^",
            "%5E": "^",
            "%5f": "_",
            "%5F": "_",
            "%60": "`",
            "%61": "a",
            "%62": "b",
            "%63": "c",
            "%64": "d",
            "%65": "e",
            "%66": "f",
            "%67": "g",
            "%68": "h",
            "%69": "i",
            "%6a": "j",
            "%6A": "j",
            "%6b": "k",
            "%6B": "k",
            "%6c": "l",
            "%6C": "l",
            "%6d": "m",
            "%6D": "m",
            "%6e": "n",
            "%6E": "n",
            "%6f": "o",
            "%6F": "o",
            "%70": "p",
            "%71": "q",
            "%72": "r",
            "%73": "s",
            "%74": "t",
            "%75": "u",
            "%76": "v",
            "%77": "w",
            "%78": "x",
            "%79": "y",
            "%7a": "z",
            "%7A": "z",
            "%7b": "{",
            "%7B": "{",
            "%7c": "|",
            "%7C": "|",
            "%7d": "}",
            "%7D": "}",
            "%7e": "~",
            "%7E": "~",
            "%7f": "",
            "%7F": "",
            "%80": "\x80",
            "%81": "\x81",
            "%82": "\x82",
            "%83": "\x83",
            "%84": "\x84",
            "%85": "\x85",
            "%86": "\x86",
            "%87": "\x87",
            "%88": "\x88",
            "%89": "\x89",
            "%8a": "\x8a",
            "%8A": "\x8a",
            "%8b": "\x8b",
            "%8B": "\x8b",
            "%8c": "\x8c",
            "%8C": "\x8c",
            "%8d": "\x8d",
            "%8D": "\x8d",
            "%8e": "\x8e",
            "%8E": "\x8e",
            "%8f": "\x8f",
            "%8F": "\x8f",
            "%90": "\x90",
            "%91": "\x91",
            "%92": "\x92",
            "%93": "\x93",
            "%94": "\x94",
            "%95": "\x95",
            "%96": "\x96",
            "%97": "\x97",
            "%98": "\x98",
            "%99": "\x99",
            "%9a": "\x9a",
            "%9A": "\x9a",
            "%9b": "\x9b",
            "%9B": "\x9b",
            "%9c": "\x9c",
            "%9C": "\x9c",
            "%9d": "\x9d",
            "%9D": "\x9d",
            "%9e": "\x9e",
            "%9E": "\x9e",
            "%9f": "\x9f",
            "%9F": "\x9f",
            "%a0": "\xa0",
            "%A0": "\xa0",
            "%a1": "\xa1",
            "%A1": "\xa1",
            "%a2": "\xa2",
            "%A2": "\xa2",
            "%a3": "\xa3",
            "%A3": "\xa3",
            "%a4": "\xa4",
            "%A4": "\xa4",
            "%a5": "\xa5",
            "%A5": "\xa5",
            "%a6": "\xa6",
            "%A6": "\xa6",
            "%a7": "\xa7",
            "%A7": "\xa7",
            "%a8": "\xa8",
            "%A8": "\xa8",
            "%a9": "\xa9",
            "%A9": "\xa9",
            "%aa": "\xaa",
            "%Aa": "\xaa",
            "%aA": "\xaa",
            "%AA": "\xaa",
            "%ab": "\xab",
            "%Ab": "\xab",
            "%aB": "\xab",
            "%AB": "\xab",
            "%ac": "\xac",
            "%Ac": "\xac",
            "%aC": "\xac",
            "%AC": "\xac",
            "%ad": "\xad",
            "%Ad": "\xad",
            "%aD": "\xad",
            "%AD": "\xad",
            "%ae": "\xae",
            "%Ae": "\xae",
            "%aE": "\xae",
            "%AE": "\xae",
            "%af": "\xaf",
            "%Af": "\xaf",
            "%aF": "\xaf",
            "%AF": "\xaf",
            "%b0": "\xb0",
            "%B0": "\xb0",
            "%b1": "\xb1",
            "%B1": "\xb1",
            "%b2": "\xb2",
            "%B2": "\xb2",
            "%b3": "\xb3",
            "%B3": "\xb3",
            "%b4": "\xb4",
            "%B4": "\xb4",
            "%b5": "\xb5",
            "%B5": "\xb5",
            "%b6": "\xb6",
            "%B6": "\xb6",
            "%b7": "\xb7",
            "%B7": "\xb7",
            "%b8": "\xb8",
            "%B8": "\xb8",
            "%b9": "\xb9",
            "%B9": "\xb9",
            "%ba": "\xba",
            "%Ba": "\xba",
            "%bA": "\xba",
            "%BA": "\xba",
            "%bb": "\xbb",
            "%Bb": "\xbb",
            "%bB": "\xbb",
            "%BB": "\xbb",
            "%bc": "\xbc",
            "%Bc": "\xbc",
            "%bC": "\xbc",
            "%BC": "\xbc",
            "%bd": "\xbd",
            "%Bd": "\xbd",
            "%bD": "\xbd",
            "%BD": "\xbd",
            "%be": "\xbe",
            "%Be": "\xbe",
            "%bE": "\xbe",
            "%BE": "\xbe",
            "%bf": "\xbf",
            "%Bf": "\xbf",
            "%bF": "\xbf",
            "%BF": "\xbf",
            "%c0": "\xc0",
            "%C0": "\xc0",
            "%c1": "\xc1",
            "%C1": "\xc1",
            "%c2": "\xc2",
            "%C2": "\xc2",
            "%c3": "\xc3",
            "%C3": "\xc3",
            "%c4": "\xc4",
            "%C4": "\xc4",
            "%c5": "\xc5",
            "%C5": "\xc5",
            "%c6": "\xc6",
            "%C6": "\xc6",
            "%c7": "\xc7",
            "%C7": "\xc7",
            "%c8": "\xc8",
            "%C8": "\xc8",
            "%c9": "\xc9",
            "%C9": "\xc9",
            "%ca": "\xca",
            "%Ca": "\xca",
            "%cA": "\xca",
            "%CA": "\xca",
            "%cb": "\xcb",
            "%Cb": "\xcb",
            "%cB": "\xcb",
            "%CB": "\xcb",
            "%cc": "\xcc",
            "%Cc": "\xcc",
            "%cC": "\xcc",
            "%CC": "\xcc",
            "%cd": "\xcd",
            "%Cd": "\xcd",
            "%cD": "\xcd",
            "%CD": "\xcd",
            "%ce": "\xce",
            "%Ce": "\xce",
            "%cE": "\xce",
            "%CE": "\xce",
            "%cf": "\xcf",
            "%Cf": "\xcf",
            "%cF": "\xcf",
            "%CF": "\xcf",
            "%d0": "\xd0",
            "%D0": "\xd0",
            "%d1": "\xd1",
            "%D1": "\xd1",
            "%d2": "\xd2",
            "%D2": "\xd2",
            "%d3": "\xd3",
            "%D3": "\xd3",
            "%d4": "\xd4",
            "%D4": "\xd4",
            "%d5": "\xd5",
            "%D5": "\xd5",
            "%d6": "\xd6",
            "%D6": "\xd6",
            "%d7": "\xd7",
            "%D7": "\xd7",
            "%d8": "\xd8",
            "%D8": "\xd8",
            "%d9": "\xd9",
            "%D9": "\xd9",
            "%da": "\xda",
            "%Da": "\xda",
            "%dA": "\xda",
            "%DA": "\xda",
            "%db": "\xdb",
            "%Db": "\xdb",
            "%dB": "\xdb",
            "%DB": "\xdb",
            "%dc": "\xdc",
            "%Dc": "\xdc",
            "%dC": "\xdc",
            "%DC": "\xdc",
            "%dd": "\xdd",
            "%Dd": "\xdd",
            "%dD": "\xdd",
            "%DD": "\xdd",
            "%de": "\xde",
            "%De": "\xde",
            "%dE": "\xde",
            "%DE": "\xde",
            "%df": "\xdf",
            "%Df": "\xdf",
            "%dF": "\xdf",
            "%DF": "\xdf",
            "%e0": "\xe0",
            "%E0": "\xe0",
            "%e1": "\xe1",
            "%E1": "\xe1",
            "%e2": "\xe2",
            "%E2": "\xe2",
            "%e3": "\xe3",
            "%E3": "\xe3",
            "%e4": "\xe4",
            "%E4": "\xe4",
            "%e5": "\xe5",
            "%E5": "\xe5",
            "%e6": "\xe6",
            "%E6": "\xe6",
            "%e7": "\xe7",
            "%E7": "\xe7",
            "%e8": "\xe8",
            "%E8": "\xe8",
            "%e9": "\xe9",
            "%E9": "\xe9",
            "%ea": "\xea",
            "%Ea": "\xea",
            "%eA": "\xea",
            "%EA": "\xea",
            "%eb": "\xeb",
            "%Eb": "\xeb",
            "%eB": "\xeb",
            "%EB": "\xeb",
            "%ec": "\xec",
            "%Ec": "\xec",
            "%eC": "\xec",
            "%EC": "\xec",
            "%ed": "\xed",
            "%Ed": "\xed",
            "%eD": "\xed",
            "%ED": "\xed",
            "%ee": "\xee",
            "%Ee": "\xee",
            "%eE": "\xee",
            "%EE": "\xee",
            "%ef": "\xef",
            "%Ef": "\xef",
            "%eF": "\xef",
            "%EF": "\xef",
            "%f0": "\xf0",
            "%F0": "\xf0",
            "%f1": "\xf1",
            "%F1": "\xf1",
            "%f2": "\xf2",
            "%F2": "\xf2",
            "%f3": "\xf3",
            "%F3": "\xf3",
            "%f4": "\xf4",
            "%F4": "\xf4",
            "%f5": "\xf5",
            "%F5": "\xf5",
            "%f6": "\xf6",
            "%F6": "\xf6",
            "%f7": "\xf7",
            "%F7": "\xf7",
            "%f8": "\xf8",
            "%F8": "\xf8",
            "%f9": "\xf9",
            "%F9": "\xf9",
            "%fa": "\xfa",
            "%Fa": "\xfa",
            "%fA": "\xfa",
            "%FA": "\xfa",
            "%fb": "\xfb",
            "%Fb": "\xfb",
            "%fB": "\xfb",
            "%FB": "\xfb",
            "%fc": "\xfc",
            "%Fc": "\xfc",
            "%fC": "\xfc",
            "%FC": "\xfc",
            "%fd": "\xfd",
            "%Fd": "\xfd",
            "%fD": "\xfd",
            "%FD": "\xfd",
            "%fe": "\xfe",
            "%Fe": "\xfe",
            "%fE": "\xfe",
            "%FE": "\xfe",
            "%ff": "\xff",
            "%Ff": "\xff",
            "%fF": "\xff",
            "%FF": "\xff",
          };
        function o(e) {
          return s[e];
        }
        e.exports = function (e) {
          let t = [],
            r = 0,
            s = "",
            a = !1,
            l = !1,
            u = 0,
            c = "",
            f = e.length;
          for (var h = 0; h < f; ++h) {
            let f = e[h];
            if ("\\" === f && a)
              if (l) l = !1;
              else {
                l = !0;
                continue;
              }
            else if ('"' === f)
              if (l) l = !1;
              else {
                a ? ((a = !1), (r = 0)) : (a = !0);
                continue;
              }
            else {
              if (
                (l && a && (c += "\\"),
                (l = !1),
                (2 === r || 3 === r) && "'" === f)
              ) {
                2 === r ? ((r = 3), (s = c.substring(1))) : (r = 1), (c = "");
                continue;
              }
              if (0 === r && ("*" === f || "=" === f) && t.length) {
                (r = "*" === f ? 2 : 1), (t[u] = [c, void 0]), (c = "");
                continue;
              }
              if (a || ";" !== f) {
                if (!a && (" " === f || "	" === f)) continue;
              } else {
                (r = 0),
                  s
                    ? (c.length && (c = n(c.replace(i, o), "binary", s)),
                      (s = ""))
                    : c.length && (c = n(c, "binary", "utf8")),
                  void 0 === t[u] ? (t[u] = c) : (t[u][1] = c),
                  (c = ""),
                  ++u;
                continue;
              }
            }
            c += f;
          }
          return (
            s && c.length
              ? (c = n(c.replace(i, o), "binary", s))
              : c && (c = n(c, "binary", "utf8")),
            void 0 === t[u] ? c && (t[u] = c) : (t[u][1] = c),
            t
          );
        };
      },
      91645: (e) => {
        "use strict";
        e.exports = require("net");
      },
      94168: (e, t, r) => {
        "use strict";
        e.exports = r(44870);
      },
      94591: (e, t, r) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.PonyfillIteratorObject = void 0);
        let n = r(57975),
          i = r(11522),
          s = r(13753);
        class o {
          iterableIterator;
          [Symbol.toStringTag] = "IteratorObject";
          constructor(e, t) {
            (this.iterableIterator = e), (this[Symbol.toStringTag] = t);
          }
          *map(e) {
            let t = 0;
            for (let r of this.iterableIterator) yield e(r, t++);
          }
          *filter(e) {
            let t = 0;
            for (let r of this.iterableIterator) e(r, t++) && (yield r);
          }
          reduce(e, t) {
            let r = 0,
              n = t;
            for (let t of this.iterableIterator) n = e(n, t, r++);
            return n;
          }
          forEach(e) {
            let t = 0;
            for (let r of this.iterableIterator) e(r, t++);
          }
          *take(e) {
            let t = 0;
            for (let r of this.iterableIterator) {
              if (t >= e) break;
              yield r, t++;
            }
          }
          *drop(e) {
            let t = 0;
            for (let r of this.iterableIterator) t >= e && (yield r), t++;
          }
          *flatMap(e) {
            let t = 0;
            for (let r of this.iterableIterator) {
              let n = e(r, t++);
              if ((0, s.isIterable)(n)) for (let e of n) yield e;
              else for (let e of { [Symbol.iterator]: () => n }) yield e;
            }
          }
          some(e) {
            let t = 0;
            for (let r of this.iterableIterator) if (e(r, t++)) return !0;
            return !1;
          }
          every(e) {
            let t = 0;
            for (let r of this.iterableIterator) if (!e(r, t++)) return !1;
            return !0;
          }
          find(e) {
            let t = 0;
            for (let r of this.iterableIterator) if (e(r, t++)) return r;
          }
          toArray() {
            return Array.from(this.iterableIterator);
          }
          [i.DisposableSymbols.dispose]() {
            this.iterableIterator.return?.();
          }
          next(...[e]) {
            return this.iterableIterator.next(e);
          }
          [Symbol.iterator]() {
            return this;
          }
          [Symbol.for("nodejs.util.inspect.custom")]() {
            let e = {};
            return (
              this.forEach((t, r) => {
                let i = (0, n.inspect)(t);
                e[r] = i.includes(",") ? i.split(",").map((e) => e.trim()) : i;
              }),
              `${this[Symbol.toStringTag]} ${(0, n.inspect)(e)}`
            );
          }
        }
        t.PonyfillIteratorObject = o;
      },
      94735: (e) => {
        "use strict";
        e.exports = require("events");
      },
      94849: (e, t, r) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.PonyfillURL = void 0);
        let n = r(66715).__importDefault(r(4573)),
          i = r(77598),
          s = globalThis.URL;
        class o extends s {
          static blobRegistry = new Map();
          static createObjectURL(e) {
            let t = `blob:whatwgnode:${(0, i.randomUUID)()}`;
            return this.blobRegistry.set(t, e), t;
          }
          static revokeObjectURL(e) {
            this.blobRegistry.has(e)
              ? this.blobRegistry.delete(e)
              : s.revokeObjectURL(e);
          }
          static getBlobFromURL(e) {
            return this.blobRegistry.get(e) || n.default?.resolveObjectURL?.(e);
          }
        }
        t.PonyfillURL = o;
      },
      95702: (e) => {
        "use strict";
        e.exports = function (e) {
          if ("string" != typeof e) return "";
          for (var t = e.length - 1; t >= 0; --t)
            switch (e.charCodeAt(t)) {
              case 47:
              case 92:
                return ".." === (e = e.slice(t + 1)) || "." === e ? "" : e;
            }
          return ".." === e || "." === e ? "" : e;
        };
      },
      96708: (e) => {
        function t(e) {
          var t = Error("Cannot find module '" + e + "'");
          throw ((t.code = "MODULE_NOT_FOUND"), t);
        }
        (t.keys = () => []), (t.resolve = t), (t.id = 96708), (e.exports = t);
      },
      97108: (e) => {
        function t(e) {
          var t = Error("Cannot find module '" + e + "'");
          throw ((t.code = "MODULE_NOT_FOUND"), t);
        }
        (t.keys = () => []), (t.resolve = t), (t.id = 97108), (e.exports = t);
      },
      97609: (e, t, r) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.PonyfillResponse = void 0);
        let n = r(37067),
          i = r(85786),
          s = r(8462),
          o = "application/json; charset=utf-8";
        class a extends i.PonyfillBody {
          headers;
          constructor(e, t) {
            super(e || null, t),
              (this.headers =
                t?.headers && (0, s.isHeadersLike)(t.headers)
                  ? t.headers
                  : new s.PonyfillHeaders(t?.headers)),
              (this.status = t?.status || 200),
              (this.statusText =
                t?.statusText || n.STATUS_CODES[this.status] || "OK"),
              (this.url = t?.url || ""),
              (this.redirected = t?.redirected || !1),
              (this.type = t?.type || "default"),
              this.handleContentLengthHeader();
          }
          get ok() {
            return this.status >= 200 && this.status < 300;
          }
          status;
          statusText;
          url;
          redirected;
          type;
          clone() {
            return this;
          }
          static error() {
            return new a(null, {
              status: 500,
              statusText: "Internal Server Error",
            });
          }
          static redirect(e, t = 302) {
            if (t < 300 || t > 399) throw RangeError("Invalid status code");
            return new a(null, { headers: { location: e }, status: t });
          }
          static json(e, t) {
            let r = JSON.stringify(e);
            if (t)
              if (t.headers)
                if ((0, s.isHeadersLike)(t.headers))
                  t.headers.has("content-type") ||
                    t.headers.set("content-type", o),
                    t.headers.has("content-length") ||
                      t.headers.set(
                        "content-length",
                        Buffer.byteLength(r).toString(),
                      );
                else if (Array.isArray(t.headers)) {
                  let e = !1,
                    n = !1;
                  for (let [r] of t.headers) {
                    if (n && e) break;
                    e || "content-type" !== r.toLowerCase()
                      ? n || "content-length" !== r.toLowerCase() || (n = !0)
                      : (e = !0);
                  }
                  e || t.headers.push(["content-type", o]),
                    n ||
                      t.headers.push([
                        "content-length",
                        Buffer.byteLength(r).toString(),
                      ]);
                } else
                  "object" == typeof t.headers &&
                    (t.headers?.["content-type"] == null &&
                      (t.headers["content-type"] = o),
                    t.headers?.["content-length"] == null &&
                      (t.headers["content-length"] =
                        Buffer.byteLength(r).toString()));
              else
                t.headers = {
                  "content-type": o,
                  "content-length": Buffer.byteLength(r).toString(),
                };
            else
              t = {
                headers: {
                  "content-type": o,
                  "content-length": Buffer.byteLength(r).toString(),
                },
              };
            return new a(r, t);
          }
          [Symbol.toStringTag] = "Response";
        }
        t.PonyfillResponse = a;
      },
    });
  var t = require("../../../webpack-runtime.js");
  t.C(e);
  var r = (e) => t((t.s = e)),
    n = t.X(0, [827, 7719, 6838], () => r(71772));
  module.exports = n;
})();
//# sourceMappingURL=route.js.map
