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
    (e._sentryDebugIds[t] = "3cd50f4c-d2a5-4a83-ba48-6e26b1fd38a9"),
    (e._sentryDebugIdIdentifier =
      "sentry-dbid-3cd50f4c-d2a5-4a83-ba48-6e26b1fd38a9"));
} catch (e) {}
("use strict");
(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [984],
  {
    1231: (e, t, s) => {
      let r, n, a, i, o, l, c, u, d, h;
      s.d(t, { z4: () => rE, Ay: () => rC });
      let p = "RFC3986",
        f = {
          RFC1738: (e) => String(e).replace(/%20/g, "+"),
          RFC3986: (e) => String(e),
        },
        m = (Object.prototype.hasOwnProperty, Array.isArray),
        g = (() => {
          let e = [];
          for (let t = 0; t < 256; ++t)
            e.push("%" + ((t < 16 ? "0" : "") + t.toString(16)).toUpperCase());
          return e;
        })();
      function y(e, t) {
        if (m(e)) {
          let s = [];
          for (let r = 0; r < e.length; r += 1) s.push(t(e[r]));
          return s;
        }
        return t(e);
      }
      let _ = Object.prototype.hasOwnProperty,
        v = {
          brackets: (e) => String(e) + "[]",
          comma: "comma",
          indices: (e, t) => String(e) + "[" + t + "]",
          repeat: (e) => String(e),
        },
        w = Array.isArray,
        b = Array.prototype.push,
        x = function (e, t) {
          b.apply(e, w(t) ? t : [t]);
        },
        k = Date.prototype.toISOString,
        A = {
          addQueryPrefix: !1,
          allowDots: !1,
          allowEmptyArrays: !1,
          arrayFormat: "indices",
          charset: "utf-8",
          charsetSentinel: !1,
          delimiter: "&",
          encode: !0,
          encodeDotInKeys: !1,
          encoder: (e, t, s, r, n) => {
            if (0 === e.length) return e;
            let a = e;
            if (
              ("symbol" == typeof e
                ? (a = Symbol.prototype.toString.call(e))
                : "string" != typeof e && (a = String(e)),
              "iso-8859-1" === s)
            )
              return escape(a).replace(/%u[0-9a-f]{4}/gi, function (e) {
                return "%26%23" + parseInt(e.slice(2), 16) + "%3B";
              });
            let i = "";
            for (let e = 0; e < a.length; e += 1024) {
              let t = a.length >= 1024 ? a.slice(e, e + 1024) : a,
                s = [];
              for (let e = 0; e < t.length; ++e) {
                let r = t.charCodeAt(e);
                if (
                  45 === r ||
                  46 === r ||
                  95 === r ||
                  126 === r ||
                  (r >= 48 && r <= 57) ||
                  (r >= 65 && r <= 90) ||
                  (r >= 97 && r <= 122) ||
                  ("RFC1738" === n && (40 === r || 41 === r))
                ) {
                  s[s.length] = t.charAt(e);
                  continue;
                }
                if (r < 128) {
                  s[s.length] = g[r];
                  continue;
                }
                if (r < 2048) {
                  s[s.length] = g[192 | (r >> 6)] + g[128 | (63 & r)];
                  continue;
                }
                if (r < 55296 || r >= 57344) {
                  s[s.length] =
                    g[224 | (r >> 12)] +
                    g[128 | ((r >> 6) & 63)] +
                    g[128 | (63 & r)];
                  continue;
                }
                (e += 1),
                  (r = 65536 + (((1023 & r) << 10) | (1023 & t.charCodeAt(e)))),
                  (s[s.length] =
                    g[240 | (r >> 18)] +
                    g[128 | ((r >> 12) & 63)] +
                    g[128 | ((r >> 6) & 63)] +
                    g[128 | (63 & r)]);
              }
              i += s.join("");
            }
            return i;
          },
          encodeValuesOnly: !1,
          format: p,
          formatter: f[p],
          indices: !1,
          serializeDate: (e) => k.call(e),
          skipNulls: !1,
          strictNullHandling: !1,
        },
        O = {},
        S = "4.104.0",
        R = !1;
      class E {
        constructor(e) {
          this.body = e;
        }
        get [Symbol.toStringTag]() {
          return "MultipartBody";
        }
      }
      let C = () => {
        n ||
          (function (e, t = { auto: !1 }) {
            if (R)
              throw Error(
                `you must \`import 'openai/shims/${e.kind}'\` before importing anything else from openai`,
              );
            if (n)
              throw Error(
                `can't \`import 'openai/shims/${e.kind}'\` after \`import 'openai/shims/${n}'\``,
              );
            (R = t.auto),
              (n = e.kind),
              (a = e.fetch),
              e.Request,
              e.Response,
              e.Headers,
              (i = e.FormData),
              e.Blob,
              (o = e.File),
              (l = e.ReadableStream),
              (c = e.getMultipartRequestOptions),
              (u = e.getDefaultAgent),
              (d = e.fileFromPath),
              (h = e.isFsReadStream);
          })(
            (function ({ manuallyImported: e } = {}) {
              let t,
                s,
                r,
                n,
                a = e
                  ? "You may need to use polyfills"
                  : `Add one of these imports before your first \`import … from 'openai'\`:
- \`import 'openai/shims/node'\` (if you're running on Node)
- \`import 'openai/shims/web'\` (otherwise)
`;
              try {
                (t = fetch), (s = Request), (r = Response), (n = Headers);
              } catch (e) {
                throw Error(
                  `this environment is missing the following Web Fetch API type: ${e.message}. ${a}`,
                );
              }
              return {
                kind: "web",
                fetch: t,
                Request: s,
                Response: r,
                Headers: n,
                FormData:
                  "undefined" != typeof FormData
                    ? FormData
                    : class {
                        constructor() {
                          throw Error(
                            `file uploads aren't supported in this environment yet as 'FormData' is undefined. ${a}`,
                          );
                        }
                      },
                Blob:
                  "undefined" != typeof Blob
                    ? Blob
                    : class {
                        constructor() {
                          throw Error(
                            `file uploads aren't supported in this environment yet as 'Blob' is undefined. ${a}`,
                          );
                        }
                      },
                File:
                  "undefined" != typeof File
                    ? File
                    : class {
                        constructor() {
                          throw Error(
                            `file uploads aren't supported in this environment yet as 'File' is undefined. ${a}`,
                          );
                        }
                      },
                ReadableStream:
                  "undefined" != typeof ReadableStream
                    ? ReadableStream
                    : class {
                        constructor() {
                          throw Error(
                            `streaming isn't supported in this environment yet as 'ReadableStream' is undefined. ${a}`,
                          );
                        }
                      },
                getMultipartRequestOptions: async (e, t) => ({
                  ...t,
                  body: new E(e),
                }),
                getDefaultAgent: (e) => void 0,
                fileFromPath: () => {
                  throw Error(
                    "The `fileFromPath` function is only supported in Node. See the README for more details: https://www.github.com/openai/openai-node#file-uploads",
                  );
                },
                isFsReadStream: (e) => !1,
              };
            })(),
            { auto: !0 },
          );
      };
      C();
      class $ extends Error {}
      class P extends $ {
        constructor(e, t, s, r) {
          super(`${P.makeMessage(e, t, s)}`),
            (this.status = e),
            (this.headers = r),
            (this.request_id = r?.["x-request-id"]),
            (this.error = t),
            (this.code = t?.code),
            (this.param = t?.param),
            (this.type = t?.type);
        }
        static makeMessage(e, t, s) {
          let r = t?.message
            ? "string" == typeof t.message
              ? t.message
              : JSON.stringify(t.message)
            : t
              ? JSON.stringify(t)
              : s;
          return e && r
            ? `${e} ${r}`
            : e
              ? `${e} status code (no body)`
              : r || "(no status code or body)";
        }
        static generate(e, t, s, r) {
          if (!e || !r) return new T({ message: s, cause: tL(t) });
          let n = t?.error;
          return 400 === e
            ? new N(e, n, s, r)
            : 401 === e
              ? new L(e, n, s, r)
              : 403 === e
                ? new M(e, n, s, r)
                : 404 === e
                  ? new F(e, n, s, r)
                  : 409 === e
                    ? new D(e, n, s, r)
                    : 422 === e
                      ? new Z(e, n, s, r)
                      : 429 === e
                        ? new B(e, n, s, r)
                        : e >= 500
                          ? new q(e, n, s, r)
                          : new P(e, n, s, r);
        }
      }
      class I extends P {
        constructor({ message: e } = {}) {
          super(void 0, void 0, e || "Request was aborted.", void 0);
        }
      }
      class T extends P {
        constructor({ message: e, cause: t }) {
          super(void 0, void 0, e || "Connection error.", void 0),
            t && (this.cause = t);
        }
      }
      class j extends T {
        constructor({ message: e } = {}) {
          super({ message: e ?? "Request timed out." });
        }
      }
      class N extends P {}
      class L extends P {}
      class M extends P {}
      class F extends P {}
      class D extends P {}
      class Z extends P {}
      class B extends P {}
      class q extends P {}
      class U extends $ {
        constructor() {
          super(
            "Could not parse response content as the length limit was reached",
          );
        }
      }
      class H extends $ {
        constructor() {
          super(
            "Could not parse response content as the request was rejected by the content filter",
          );
        }
      }
      var W,
        z,
        V,
        J,
        K,
        X,
        G,
        Y,
        Q,
        ee,
        et,
        es,
        er,
        en,
        ea,
        ei,
        eo,
        el,
        ec,
        eu,
        ed,
        eh,
        ep,
        ef,
        em,
        eg,
        ey,
        e_,
        ev,
        ew,
        eb,
        ex,
        ek,
        eA,
        eO,
        eS,
        eR,
        eE,
        eC,
        e$,
        eP,
        eI,
        eT,
        ej,
        eN,
        eL,
        eM,
        eF,
        eD,
        eZ,
        eB,
        eq,
        eU,
        eH,
        eW,
        ez,
        eV,
        eJ,
        eK,
        eX,
        eG,
        eY,
        eQ,
        e0,
        e1,
        e2 = s(25356).Buffer,
        e4 = function (e, t, s, r, n) {
          if ("m" === r) throw TypeError("Private method is not writable");
          if ("a" === r && !n)
            throw TypeError("Private accessor was defined without a setter");
          if ("function" == typeof t ? e !== t || !n : !t.has(e))
            throw TypeError(
              "Cannot write private member to an object whose class did not declare it",
            );
          return "a" === r ? n.call(e, s) : n ? (n.value = s) : t.set(e, s), s;
        },
        e9 = function (e, t, s, r) {
          if ("a" === s && !r)
            throw TypeError("Private accessor was defined without a getter");
          if ("function" == typeof t ? e !== t || !r : !t.has(e))
            throw TypeError(
              "Cannot read private member from an object whose class did not declare it",
            );
          return "m" === s ? r : "a" === s ? r.call(e) : r ? r.value : t.get(e);
        };
      class e3 {
        constructor() {
          W.set(this, void 0),
            (this.buffer = new Uint8Array()),
            e4(this, W, null, "f");
        }
        decode(e) {
          let t;
          if (null == e) return [];
          let s =
              e instanceof ArrayBuffer
                ? new Uint8Array(e)
                : "string" == typeof e
                  ? new TextEncoder().encode(e)
                  : e,
            r = new Uint8Array(this.buffer.length + s.length);
          r.set(this.buffer), r.set(s, this.buffer.length), (this.buffer = r);
          let n = [];
          for (
            ;
            null !=
            (t = (function (e, t) {
              for (let s = t ?? 0; s < e.length; s++) {
                if (10 === e[s])
                  return { preceding: s, index: s + 1, carriage: !1 };
                if (13 === e[s])
                  return { preceding: s, index: s + 1, carriage: !0 };
              }
              return null;
            })(this.buffer, e9(this, W, "f")));

          ) {
            if (t.carriage && null == e9(this, W, "f")) {
              e4(this, W, t.index, "f");
              continue;
            }
            if (
              null != e9(this, W, "f") &&
              (t.index !== e9(this, W, "f") + 1 || t.carriage)
            ) {
              n.push(
                this.decodeText(this.buffer.slice(0, e9(this, W, "f") - 1)),
              ),
                (this.buffer = this.buffer.slice(e9(this, W, "f"))),
                e4(this, W, null, "f");
              continue;
            }
            let e = null !== e9(this, W, "f") ? t.preceding - 1 : t.preceding,
              s = this.decodeText(this.buffer.slice(0, e));
            n.push(s),
              (this.buffer = this.buffer.slice(t.index)),
              e4(this, W, null, "f");
          }
          return n;
        }
        decodeText(e) {
          if (null == e) return "";
          if ("string" == typeof e) return e;
          if (void 0 !== e2) {
            if (e instanceof e2) return e.toString();
            if (e instanceof Uint8Array) return e2.from(e).toString();
            throw new $(
              `Unexpected: received non-Uint8Array (${e.constructor.name}) stream chunk in an environment with a global "Buffer" defined, which this library assumes to be Node. Please report this error.`,
            );
          }
          if ("undefined" != typeof TextDecoder) {
            if (e instanceof Uint8Array || e instanceof ArrayBuffer)
              return (
                this.textDecoder ??
                  (this.textDecoder = new TextDecoder("utf8")),
                this.textDecoder.decode(e)
              );
            throw new $(
              `Unexpected: received non-Uint8Array/ArrayBuffer (${e.constructor.name}) in a web platform. Please report this error.`,
            );
          }
          throw new $(
            "Unexpected: neither Buffer nor TextDecoder are available as globals. Please report this error.",
          );
        }
        flush() {
          return this.buffer.length ? this.decode("\n") : [];
        }
      }
      function e5(e) {
        if (e[Symbol.asyncIterator]) return e;
        let t = e.getReader();
        return {
          async next() {
            try {
              let e = await t.read();
              return e?.done && t.releaseLock(), e;
            } catch (e) {
              throw (t.releaseLock(), e);
            }
          },
          async return() {
            let e = t.cancel();
            return t.releaseLock(), await e, { done: !0, value: void 0 };
          },
          [Symbol.asyncIterator]() {
            return this;
          },
        };
      }
      (W = new WeakMap()),
        (e3.NEWLINE_CHARS = new Set(["\n", "\r"])),
        (e3.NEWLINE_REGEXP = /\r\n|[\n\r]/g);
      class e6 {
        constructor(e, t) {
          (this.iterator = e), (this.controller = t);
        }
        static fromSSEResponse(e, t) {
          let s = !1;
          async function* r() {
            if (s)
              throw Error(
                "Cannot iterate over a consumed stream, use `.tee()` to split the stream.",
              );
            s = !0;
            let r = !1;
            try {
              for await (let s of e8(e, t))
                if (!r) {
                  if (s.data.startsWith("[DONE]")) {
                    r = !0;
                    continue;
                  }
                  if (
                    null === s.event ||
                    s.event.startsWith("response.") ||
                    s.event.startsWith("transcript.")
                  ) {
                    let t;
                    try {
                      t = JSON.parse(s.data);
                    } catch (e) {
                      throw (
                        (console.error(
                          "Could not parse message into JSON:",
                          s.data,
                        ),
                        console.error("From chunk:", s.raw),
                        e)
                      );
                    }
                    if (t && t.error)
                      throw new P(void 0, t.error, void 0, tA(e.headers));
                    yield t;
                  } else {
                    let e;
                    try {
                      e = JSON.parse(s.data);
                    } catch (e) {
                      throw (
                        (console.error(
                          "Could not parse message into JSON:",
                          s.data,
                        ),
                        console.error("From chunk:", s.raw),
                        e)
                      );
                    }
                    if ("error" == s.event)
                      throw new P(void 0, e.error, e.message, void 0);
                    yield { event: s.event, data: e };
                  }
                }
              r = !0;
            } catch (e) {
              if (e instanceof Error && "AbortError" === e.name) return;
              throw e;
            } finally {
              r || t.abort();
            }
          }
          return new e6(r, t);
        }
        static fromReadableStream(e, t) {
          let s = !1;
          async function* r() {
            let t = new e3();
            for await (let s of e5(e)) for (let e of t.decode(s)) yield e;
            for (let e of t.flush()) yield e;
          }
          return new e6(async function* () {
            if (s)
              throw Error(
                "Cannot iterate over a consumed stream, use `.tee()` to split the stream.",
              );
            s = !0;
            let e = !1;
            try {
              for await (let t of r()) !e && t && (yield JSON.parse(t));
              e = !0;
            } catch (e) {
              if (e instanceof Error && "AbortError" === e.name) return;
              throw e;
            } finally {
              e || t.abort();
            }
          }, t);
        }
        [Symbol.asyncIterator]() {
          return this.iterator();
        }
        tee() {
          let e = [],
            t = [],
            s = this.iterator(),
            r = (r) => ({
              next: () => {
                if (0 === r.length) {
                  let r = s.next();
                  e.push(r), t.push(r);
                }
                return r.shift();
              },
            });
          return [
            new e6(() => r(e), this.controller),
            new e6(() => r(t), this.controller),
          ];
        }
        toReadableStream() {
          let e,
            t = this,
            s = new TextEncoder();
          return new l({
            async start() {
              e = t[Symbol.asyncIterator]();
            },
            async pull(t) {
              try {
                let { value: r, done: n } = await e.next();
                if (n) return t.close();
                let a = s.encode(JSON.stringify(r) + "\n");
                t.enqueue(a);
              } catch (e) {
                t.error(e);
              }
            },
            async cancel() {
              await e.return?.();
            },
          });
        }
      }
      async function* e8(e, t) {
        if (!e.body)
          throw (
            (t.abort(),
            new $("Attempted to iterate over a response with no body"))
          );
        let s = new te(),
          r = new e3();
        for await (let t of e7(e5(e.body)))
          for (let e of r.decode(t)) {
            let t = s.decode(e);
            t && (yield t);
          }
        for (let e of r.flush()) {
          let t = s.decode(e);
          t && (yield t);
        }
      }
      async function* e7(e) {
        let t = new Uint8Array();
        for await (let s of e) {
          let e;
          if (null == s) continue;
          let r =
              s instanceof ArrayBuffer
                ? new Uint8Array(s)
                : "string" == typeof s
                  ? new TextEncoder().encode(s)
                  : s,
            n = new Uint8Array(t.length + r.length);
          for (
            n.set(t), n.set(r, t.length), t = n;
            -1 !==
            (e = (function (e) {
              for (let t = 0; t < e.length - 1; t++) {
                if (
                  (10 === e[t] && 10 === e[t + 1]) ||
                  (13 === e[t] && 13 === e[t + 1])
                )
                  return t + 2;
                if (
                  13 === e[t] &&
                  10 === e[t + 1] &&
                  t + 3 < e.length &&
                  13 === e[t + 2] &&
                  10 === e[t + 3]
                )
                  return t + 4;
              }
              return -1;
            })(t));

          )
            yield t.slice(0, e), (t = t.slice(e));
        }
        t.length > 0 && (yield t);
      }
      class te {
        constructor() {
          (this.event = null), (this.data = []), (this.chunks = []);
        }
        decode(e) {
          if ((e.endsWith("\r") && (e = e.substring(0, e.length - 1)), !e)) {
            if (!this.event && !this.data.length) return null;
            let e = {
              event: this.event,
              data: this.data.join("\n"),
              raw: this.chunks,
            };
            return (this.event = null), (this.data = []), (this.chunks = []), e;
          }
          if ((this.chunks.push(e), e.startsWith(":"))) return null;
          let [t, s, r] = (function (e, t) {
            let s = e.indexOf(":");
            return -1 !== s
              ? [e.substring(0, s), t, e.substring(s + t.length)]
              : [e, "", ""];
          })(e, ":");
          return (
            r.startsWith(" ") && (r = r.substring(1)),
            "event" === t
              ? (this.event = r)
              : "data" === t && this.data.push(r),
            null
          );
        }
      }
      var tt = s(25356).Buffer;
      let ts = (e) =>
          null != e &&
          "object" == typeof e &&
          "string" == typeof e.url &&
          "function" == typeof e.blob,
        tr = (e) =>
          null != e &&
          "object" == typeof e &&
          "string" == typeof e.name &&
          "number" == typeof e.lastModified &&
          tn(e),
        tn = (e) =>
          null != e &&
          "object" == typeof e &&
          "number" == typeof e.size &&
          "string" == typeof e.type &&
          "function" == typeof e.text &&
          "function" == typeof e.slice &&
          "function" == typeof e.arrayBuffer,
        ta = (e) => tr(e) || ts(e) || h(e);
      async function ti(e, t, s) {
        var r;
        if (tr((e = await e))) return e;
        if (ts(e)) {
          let r = await e.blob();
          t ||
            (t =
              new URL(e.url).pathname.split(/[\\/]/).pop() ?? "unknown_file");
          let n = tn(r) ? [await r.arrayBuffer()] : [r];
          return new o(n, t, s);
        }
        let n = await to(e);
        if (
          (t ||
            (t =
              (tl((r = e).name) ||
                tl(r.filename) ||
                tl(r.path)?.split(/[\\/]/).pop()) ??
              "unknown_file"),
          !s?.type)
        ) {
          let e = n[0]?.type;
          "string" == typeof e && (s = { ...s, type: e });
        }
        return new o(n, t, s);
      }
      async function to(e) {
        let t = [];
        if (
          "string" == typeof e ||
          ArrayBuffer.isView(e) ||
          e instanceof ArrayBuffer
        )
          t.push(e);
        else if (tn(e)) t.push(await e.arrayBuffer());
        else if (tc(e)) for await (let s of e) t.push(s);
        else
          throw Error(
            `Unexpected data type: ${typeof e}; constructor: ${e?.constructor?.name}; props: ${(function (
              e,
            ) {
              let t = Object.getOwnPropertyNames(e);
              return `[${t.map((e) => `"${e}"`).join(", ")}]`;
            })(e)}`,
          );
        return t;
      }
      let tl = (e) =>
          "string" == typeof e
            ? e
            : void 0 !== tt && e instanceof tt
              ? String(e)
              : void 0,
        tc = (e) =>
          null != e &&
          "object" == typeof e &&
          "function" == typeof e[Symbol.asyncIterator],
        tu = (e) =>
          e &&
          "object" == typeof e &&
          e.body &&
          "MultipartBody" === e[Symbol.toStringTag],
        td = async (e) => {
          let t = await th(e.body);
          return c(t, e);
        },
        th = async (e) => {
          let t = new i();
          return (
            await Promise.all(
              Object.entries(e || {}).map(([e, s]) => tf(t, e, s)),
            ),
            t
          );
        },
        tp = (e) => {
          if (ta(e)) return !0;
          if (Array.isArray(e)) return e.some(tp);
          if (e && "object" == typeof e) {
            for (let t in e) if (tp(e[t])) return !0;
          }
          return !1;
        },
        tf = async (e, t, s) => {
          if (void 0 !== s) {
            if (null == s)
              throw TypeError(
                `Received null for "${t}"; to pass null in FormData, you must use the string 'null'`,
              );
            if (
              "string" == typeof s ||
              "number" == typeof s ||
              "boolean" == typeof s
            )
              e.append(t, String(s));
            else if (ta(s)) {
              let r = await ti(s);
              e.append(t, r);
            } else if (Array.isArray(s))
              await Promise.all(s.map((s) => tf(e, t + "[]", s)));
            else if ("object" == typeof s)
              await Promise.all(
                Object.entries(s).map(([s, r]) => tf(e, `${t}[${s}]`, r)),
              );
            else
              throw TypeError(
                `Invalid value given to form, expected a string, number, boolean, object, Array, File or Blob but got ${s} instead`,
              );
          }
        };
      var tm = s(25356).Buffer,
        tg = function (e, t, s, r, n) {
          if ("m" === r) throw TypeError("Private method is not writable");
          if ("a" === r && !n)
            throw TypeError("Private accessor was defined without a setter");
          if ("function" == typeof t ? e !== t || !n : !t.has(e))
            throw TypeError(
              "Cannot write private member to an object whose class did not declare it",
            );
          return "a" === r ? n.call(e, s) : n ? (n.value = s) : t.set(e, s), s;
        },
        ty = function (e, t, s, r) {
          if ("a" === s && !r)
            throw TypeError("Private accessor was defined without a getter");
          if ("function" == typeof t ? e !== t || !r : !t.has(e))
            throw TypeError(
              "Cannot read private member from an object whose class did not declare it",
            );
          return "m" === s ? r : "a" === s ? r.call(e) : r ? r.value : t.get(e);
        };
      async function t_(e) {
        let { response: t } = e;
        if (e.options.stream)
          return (tq("response", t.status, t.url, t.headers, t.body),
          e.options.__streamClass)
            ? e.options.__streamClass.fromSSEResponse(t, e.controller)
            : e6.fromSSEResponse(t, e.controller);
        if (204 === t.status) return null;
        if (e.options.__binaryResponse) return t;
        let s = t.headers.get("content-type"),
          r = s?.split(";")[0]?.trim();
        if (r?.includes("application/json") || r?.endsWith("+json")) {
          let e = await t.json();
          return tq("response", t.status, t.url, t.headers, e), tv(e, t);
        }
        let n = await t.text();
        return tq("response", t.status, t.url, t.headers, n), n;
      }
      function tv(e, t) {
        return !e || "object" != typeof e || Array.isArray(e)
          ? e
          : Object.defineProperty(e, "_request_id", {
              value: t.headers.get("x-request-id"),
              enumerable: !1,
            });
      }
      C();
      class tw extends Promise {
        constructor(e, t = t_) {
          super((e) => {
            e(null);
          }),
            (this.responsePromise = e),
            (this.parseResponse = t);
        }
        _thenUnwrap(e) {
          return new tw(this.responsePromise, async (t) =>
            tv(e(await this.parseResponse(t), t), t.response),
          );
        }
        asResponse() {
          return this.responsePromise.then((e) => e.response);
        }
        async withResponse() {
          let [e, t] = await Promise.all([this.parse(), this.asResponse()]);
          return {
            data: e,
            response: t,
            request_id: t.headers.get("x-request-id"),
          };
        }
        parse() {
          return (
            this.parsedPromise ||
              (this.parsedPromise = this.responsePromise.then(
                this.parseResponse,
              )),
            this.parsedPromise
          );
        }
        then(e, t) {
          return this.parse().then(e, t);
        }
        catch(e) {
          return this.parse().catch(e);
        }
        finally(e) {
          return this.parse().finally(e);
        }
      }
      class tb {
        constructor({
          baseURL: e,
          maxRetries: t = 2,
          timeout: s = 6e5,
          httpAgent: r,
          fetch: n,
        }) {
          (this.baseURL = e),
            (this.maxRetries = tN("maxRetries", t)),
            (this.timeout = tN("timeout", s)),
            (this.httpAgent = r),
            (this.fetch = n ?? a);
        }
        authHeaders(e) {
          return {};
        }
        defaultHeaders(e) {
          return {
            Accept: "application/json",
            "Content-Type": "application/json",
            "User-Agent": this.getUserAgent(),
            ...t$(),
            ...this.authHeaders(e),
          };
        }
        validateHeaders(e, t) {}
        defaultIdempotencyKey() {
          return `stainless-node-retry-${tU()}`;
        }
        get(e, t) {
          return this.methodRequest("get", e, t);
        }
        post(e, t) {
          return this.methodRequest("post", e, t);
        }
        patch(e, t) {
          return this.methodRequest("patch", e, t);
        }
        put(e, t) {
          return this.methodRequest("put", e, t);
        }
        delete(e, t) {
          return this.methodRequest("delete", e, t);
        }
        methodRequest(e, t, s) {
          return this.request(
            Promise.resolve(s).then(async (s) => {
              let r =
                s && tn(s?.body)
                  ? new DataView(await s.body.arrayBuffer())
                  : s?.body instanceof DataView
                    ? s.body
                    : s?.body instanceof ArrayBuffer
                      ? new DataView(s.body)
                      : s && ArrayBuffer.isView(s?.body)
                        ? new DataView(s.body.buffer)
                        : s?.body;
              return { method: e, path: t, ...s, body: r };
            }),
          );
        }
        getAPIList(e, t, s) {
          return this.requestAPIList(t, { method: "get", path: e, ...s });
        }
        calculateContentLength(e) {
          if ("string" == typeof e) {
            if (void 0 !== tm) return tm.byteLength(e, "utf8").toString();
            if ("undefined" != typeof TextEncoder)
              return new TextEncoder().encode(e).length.toString();
          } else if (ArrayBuffer.isView(e)) return e.byteLength.toString();
          return null;
        }
        buildRequest(e, { retryCount: t = 0 } = {}) {
          let s = { ...e },
            { method: r, path: n, query: a, headers: i = {} } = s,
            o =
              ArrayBuffer.isView(s.body) ||
              (s.__binaryRequest && "string" == typeof s.body)
                ? s.body
                : tu(s.body)
                  ? s.body.body
                  : s.body
                    ? JSON.stringify(s.body, null, 2)
                    : null,
            l = this.calculateContentLength(o),
            c = this.buildURL(n, a);
          "timeout" in s && tN("timeout", s.timeout),
            (s.timeout = s.timeout ?? this.timeout);
          let d = s.httpAgent ?? this.httpAgent ?? u(c),
            h = s.timeout + 1e3;
          "number" == typeof d?.options?.timeout &&
            h > (d.options.timeout ?? 0) &&
            (d.options.timeout = h),
            this.idempotencyHeader &&
              "get" !== r &&
              (e.idempotencyKey ||
                (e.idempotencyKey = this.defaultIdempotencyKey()),
              (i[this.idempotencyHeader] = e.idempotencyKey));
          let p = this.buildHeaders({
            options: s,
            headers: i,
            contentLength: l,
            retryCount: t,
          });
          return {
            req: {
              method: r,
              ...(o && { body: o }),
              headers: p,
              ...(d && { agent: d }),
              signal: s.signal ?? null,
            },
            url: c,
            timeout: s.timeout,
          };
        }
        buildHeaders({
          options: e,
          headers: t,
          contentLength: s,
          retryCount: r,
        }) {
          let a = {};
          s && (a["content-length"] = s);
          let i = this.defaultHeaders(e);
          return (
            tZ(a, i),
            tZ(a, t),
            tu(e.body) && "node" !== n && delete a["content-type"],
            void 0 === tz(i, "x-stainless-retry-count") &&
              void 0 === tz(t, "x-stainless-retry-count") &&
              (a["x-stainless-retry-count"] = String(r)),
            void 0 === tz(i, "x-stainless-timeout") &&
              void 0 === tz(t, "x-stainless-timeout") &&
              e.timeout &&
              (a["x-stainless-timeout"] = String(Math.trunc(e.timeout / 1e3))),
            this.validateHeaders(a, t),
            a
          );
        }
        async prepareOptions(e) {}
        async prepareRequest(e, { url: t, options: s }) {}
        parseHeaders(e) {
          return e
            ? Symbol.iterator in e
              ? Object.fromEntries(Array.from(e).map((e) => [...e]))
              : { ...e }
            : {};
        }
        makeStatusError(e, t, s, r) {
          return P.generate(e, t, s, r);
        }
        request(e, t = null) {
          return new tw(this.makeRequest(e, t));
        }
        async makeRequest(e, t) {
          let s = await e,
            r = s.maxRetries ?? this.maxRetries;
          null == t && (t = r), await this.prepareOptions(s);
          let {
            req: n,
            url: a,
            timeout: i,
          } = this.buildRequest(s, { retryCount: r - t });
          if (
            (await this.prepareRequest(n, { url: a, options: s }),
            tq("request", a, s, n.headers),
            s.signal?.aborted)
          )
            throw new I();
          let o = new AbortController(),
            l = await this.fetchWithTimeout(a, n, i, o).catch(tL);
          if (l instanceof Error) {
            if (s.signal?.aborted) throw new I();
            if (t) return this.retryRequest(s, t);
            if ("AbortError" === l.name) throw new j();
            throw new T({ cause: l });
          }
          let c = tA(l.headers);
          if (!l.ok) {
            if (t && this.shouldRetry(l)) {
              let e = `retrying, ${t} attempts remaining`;
              return (
                tq(`response (error; ${e})`, l.status, a, c),
                this.retryRequest(s, t, c)
              );
            }
            let e = await l.text().catch((e) => tL(e).message),
              r = tP(e),
              n = r ? void 0 : e,
              i = t
                ? "(error; no more retries left)"
                : "(error; not retryable)";
            throw (
              (tq(`response (error; ${i})`, l.status, a, c, n),
              this.makeStatusError(l.status, r, n, c))
            );
          }
          return { response: l, options: s, controller: o };
        }
        requestAPIList(e, t) {
          return new tk(this, this.makeRequest(t, null), e);
        }
        buildURL(e, t) {
          let s = new URL(
              tT(e)
                ? e
                : this.baseURL +
                  (this.baseURL.endsWith("/") && e.startsWith("/")
                    ? e.slice(1)
                    : e),
            ),
            r = this.defaultQuery();
          return (
            tF(r) || (t = { ...r, ...t }),
            "object" == typeof t &&
              t &&
              !Array.isArray(t) &&
              (s.search = this.stringifyQuery(t)),
            s.toString()
          );
        }
        stringifyQuery(e) {
          return Object.entries(e)
            .filter(([e, t]) => void 0 !== t)
            .map(([e, t]) => {
              if (
                "string" == typeof t ||
                "number" == typeof t ||
                "boolean" == typeof t
              )
                return `${encodeURIComponent(e)}=${encodeURIComponent(t)}`;
              if (null === t) return `${encodeURIComponent(e)}=`;
              throw new $(
                `Cannot stringify type ${typeof t}; Expected string, number, boolean, or null. If you need to pass nested query parameters, you can manually encode them, e.g. { query: { 'foo[key1]': value1, 'foo[key2]': value2 } }, and please open a GitHub issue requesting better support for your use case.`,
              );
            })
            .join("&");
        }
        async fetchWithTimeout(e, t, s, r) {
          let { signal: n, ...a } = t || {};
          n && n.addEventListener("abort", () => r.abort());
          let i = setTimeout(() => r.abort(), s),
            o = { signal: r.signal, ...a };
          return (
            o.method && (o.method = o.method.toUpperCase()),
            this.fetch.call(void 0, e, o).finally(() => {
              clearTimeout(i);
            })
          );
        }
        shouldRetry(e) {
          let t = e.headers.get("x-should-retry");
          return (
            "true" === t ||
            ("false" !== t &&
              (408 === e.status ||
                409 === e.status ||
                429 === e.status ||
                !!(e.status >= 500)))
          );
        }
        async retryRequest(e, t, s) {
          let r,
            n = s?.["retry-after-ms"];
          if (n) {
            let e = parseFloat(n);
            Number.isNaN(e) || (r = e);
          }
          let a = s?.["retry-after"];
          if (a && !r) {
            let e = parseFloat(a);
            r = Number.isNaN(e) ? Date.parse(a) - Date.now() : 1e3 * e;
          }
          if (!(r && 0 <= r && r < 6e4)) {
            let s = e.maxRetries ?? this.maxRetries;
            r = this.calculateDefaultRetryTimeoutMillis(t, s);
          }
          return await tj(r), this.makeRequest(e, t - 1);
        }
        calculateDefaultRetryTimeoutMillis(e, t) {
          return (
            Math.min(0.5 * Math.pow(2, t - e), 8) *
            (1 - 0.25 * Math.random()) *
            1e3
          );
        }
        getUserAgent() {
          return `${this.constructor.name}/JS ${S}`;
        }
      }
      class tx {
        constructor(e, t, s, r) {
          z.set(this, void 0),
            tg(this, z, e, "f"),
            (this.options = r),
            (this.response = t),
            (this.body = s);
        }
        hasNextPage() {
          return (
            !!this.getPaginatedItems().length && null != this.nextPageInfo()
          );
        }
        async getNextPage() {
          let e = this.nextPageInfo();
          if (!e)
            throw new $(
              "No next page expected; please check `.hasNextPage()` before calling `.getNextPage()`.",
            );
          let t = { ...this.options };
          if ("params" in e && "object" == typeof t.query)
            t.query = { ...t.query, ...e.params };
          else if ("url" in e) {
            for (let [s, r] of [
              ...Object.entries(t.query || {}),
              ...e.url.searchParams.entries(),
            ])
              e.url.searchParams.set(s, r);
            (t.query = void 0), (t.path = e.url.toString());
          }
          return await ty(this, z, "f").requestAPIList(this.constructor, t);
        }
        async *iterPages() {
          let e = this;
          for (yield e; e.hasNextPage(); ) (e = await e.getNextPage()), yield e;
        }
        async *[((z = new WeakMap()), Symbol.asyncIterator)]() {
          for await (let e of this.iterPages())
            for (let t of e.getPaginatedItems()) yield t;
        }
      }
      class tk extends tw {
        constructor(e, t, s) {
          super(t, async (t) => new s(e, t.response, await t_(t), t.options));
        }
        async *[Symbol.asyncIterator]() {
          for await (let e of await this) yield e;
        }
      }
      let tA = (e) =>
          new Proxy(Object.fromEntries(e.entries()), {
            get(e, t) {
              let s = t.toString();
              return e[s.toLowerCase()] || e[s];
            },
          }),
        tO = {
          method: !0,
          path: !0,
          query: !0,
          body: !0,
          headers: !0,
          maxRetries: !0,
          stream: !0,
          timeout: !0,
          httpAgent: !0,
          signal: !0,
          idempotencyKey: !0,
          __metadata: !0,
          __binaryRequest: !0,
          __binaryResponse: !0,
          __streamClass: !0,
        },
        tS = (e) =>
          "object" == typeof e &&
          null !== e &&
          !tF(e) &&
          Object.keys(e).every((e) => tD(tO, e)),
        tR = () =>
          "undefined" != typeof Deno && null != Deno.build
            ? {
                "X-Stainless-Lang": "js",
                "X-Stainless-Package-Version": S,
                "X-Stainless-OS": tC(Deno.build.os),
                "X-Stainless-Arch": tE(Deno.build.arch),
                "X-Stainless-Runtime": "deno",
                "X-Stainless-Runtime-Version":
                  "string" == typeof Deno.version
                    ? Deno.version
                    : (Deno.version?.deno ?? "unknown"),
              }
            : {
                "X-Stainless-Lang": "js",
                "X-Stainless-Package-Version": S,
                "X-Stainless-OS": "Unknown",
                "X-Stainless-Arch": "other:edge-runtime",
                "X-Stainless-Runtime": "edge",
                "X-Stainless-Runtime-Version": process.version,
              },
        tE = (e) =>
          "x32" === e
            ? "x32"
            : "x86_64" === e || "x64" === e
              ? "x64"
              : "arm" === e
                ? "arm"
                : "aarch64" === e || "arm64" === e
                  ? "arm64"
                  : e
                    ? `other:${e}`
                    : "unknown",
        tC = (e) =>
          (e = e.toLowerCase()).includes("ios")
            ? "iOS"
            : "android" === e
              ? "Android"
              : "darwin" === e
                ? "MacOS"
                : "win32" === e
                  ? "Windows"
                  : "freebsd" === e
                    ? "FreeBSD"
                    : "openbsd" === e
                      ? "OpenBSD"
                      : "linux" === e
                        ? "Linux"
                        : e
                          ? `Other:${e}`
                          : "Unknown",
        t$ = () => r ?? (r = tR()),
        tP = (e) => {
          try {
            return JSON.parse(e);
          } catch (e) {
            return;
          }
        },
        tI = /^[a-z][a-z0-9+.-]*:/i,
        tT = (e) => tI.test(e),
        tj = (e) => new Promise((t) => setTimeout(t, e)),
        tN = (e, t) => {
          if ("number" != typeof t || !Number.isInteger(t))
            throw new $(`${e} must be an integer`);
          if (t < 0) throw new $(`${e} must be a positive integer`);
          return t;
        },
        tL = (e) => {
          if (e instanceof Error) return e;
          if ("object" == typeof e && null !== e)
            try {
              return Error(JSON.stringify(e));
            } catch {}
          return Error(e);
        },
        tM = (e) =>
          "undefined" != typeof process
            ? (process.env?.[e]?.trim() ?? void 0)
            : "undefined" != typeof Deno
              ? Deno.env?.get?.(e)?.trim()
              : void 0;
      function tF(e) {
        if (!e) return !0;
        for (let t in e) return !1;
        return !0;
      }
      function tD(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t);
      }
      function tZ(e, t) {
        for (let s in t) {
          if (!tD(t, s)) continue;
          let r = s.toLowerCase();
          if (!r) continue;
          let n = t[s];
          null === n ? delete e[r] : void 0 !== n && (e[r] = n);
        }
      }
      let tB = new Set(["authorization", "api-key"]);
      function tq(e, ...t) {
        "undefined" != typeof process &&
          process?.env?.DEBUG === "true" &&
          console.log(
            `OpenAI:DEBUG:${e}`,
            ...t.map((e) => {
              if (!e) return e;
              if (e.headers) {
                let t = { ...e, headers: { ...e.headers } };
                for (let s in e.headers)
                  tB.has(s.toLowerCase()) && (t.headers[s] = "REDACTED");
                return t;
              }
              let t = null;
              for (let s in e)
                tB.has(s.toLowerCase()) &&
                  (t ?? (t = { ...e }), (t[s] = "REDACTED"));
              return t ?? e;
            }),
          );
      }
      let tU = () =>
          "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (e) => {
            let t = (16 * Math.random()) | 0;
            return ("x" === e ? t : (3 & t) | 8).toString(16);
          }),
        tH = () =>
          "undefined" != typeof window &&
          void 0 !== window.document &&
          "undefined" != typeof navigator,
        tW = (e) => "function" == typeof e?.get,
        tz = (e, t) => {
          let s = t.toLowerCase();
          if (tW(e)) {
            let r =
              t[0]?.toUpperCase() +
              t
                .substring(1)
                .replace(/([^\w])(\w)/g, (e, t, s) => t + s.toUpperCase());
            for (let n of [t, s, t.toUpperCase(), r]) {
              let t = e.get(n);
              if (t) return t;
            }
          }
          for (let [r, n] of Object.entries(e))
            if (r.toLowerCase() === s) {
              if (Array.isArray(n)) {
                if (n.length <= 1) return n[0];
                return (
                  console.warn(
                    `Received ${n.length} entries for the ${t} header, using the first entry.`,
                  ),
                  n[0]
                );
              }
              return n;
            }
        },
        tV = (e) => {
          if (void 0 !== tm) {
            let t = tm.from(e, "base64");
            return Array.from(
              new Float32Array(
                t.buffer,
                t.byteOffset,
                t.length / Float32Array.BYTES_PER_ELEMENT,
              ),
            );
          }
          {
            let t = atob(e),
              s = t.length,
              r = new Uint8Array(s);
            for (let e = 0; e < s; e++) r[e] = t.charCodeAt(e);
            return Array.from(new Float32Array(r.buffer));
          }
        };
      function tJ(e) {
        return null != e && "object" == typeof e && !Array.isArray(e);
      }
      class tK {
        constructor(e) {
          this._client = e;
        }
      }
      class tX extends tK {
        create(e, t) {
          return this._client.post("/completions", {
            body: e,
            ...t,
            stream: e.stream ?? !1,
          });
        }
      }
      class tG extends tK {
        list(e, t = {}, s) {
          return tS(t)
            ? this.list(e, {}, t)
            : this._client.getAPIList(`/chat/completions/${e}/messages`, t2, {
                query: t,
                ...s,
              });
        }
      }
      class tY extends tx {
        constructor(e, t, s, r) {
          super(e, t, s, r),
            (this.data = s.data || []),
            (this.object = s.object);
        }
        getPaginatedItems() {
          return this.data ?? [];
        }
        nextPageParams() {
          return null;
        }
        nextPageInfo() {
          return null;
        }
      }
      class tQ extends tx {
        constructor(e, t, s, r) {
          super(e, t, s, r),
            (this.data = s.data || []),
            (this.has_more = s.has_more || !1);
        }
        getPaginatedItems() {
          return this.data ?? [];
        }
        hasNextPage() {
          return !1 !== this.has_more && super.hasNextPage();
        }
        nextPageParams() {
          let e = this.nextPageInfo();
          if (!e) return null;
          if ("params" in e) return e.params;
          let t = Object.fromEntries(e.url.searchParams);
          return Object.keys(t).length ? t : null;
        }
        nextPageInfo() {
          let e = this.getPaginatedItems();
          if (!e.length) return null;
          let t = e[e.length - 1]?.id;
          return t ? { params: { after: t } } : null;
        }
      }
      class t0 extends tK {
        constructor() {
          super(...arguments), (this.messages = new tG(this._client));
        }
        create(e, t) {
          return this._client.post("/chat/completions", {
            body: e,
            ...t,
            stream: e.stream ?? !1,
          });
        }
        retrieve(e, t) {
          return this._client.get(`/chat/completions/${e}`, t);
        }
        update(e, t, s) {
          return this._client.post(`/chat/completions/${e}`, { body: t, ...s });
        }
        list(e = {}, t) {
          return tS(e)
            ? this.list({}, e)
            : this._client.getAPIList("/chat/completions", t1, {
                query: e,
                ...t,
              });
        }
        del(e, t) {
          return this._client.delete(`/chat/completions/${e}`, t);
        }
      }
      class t1 extends tQ {}
      class t2 extends tQ {}
      (t0.ChatCompletionsPage = t1), (t0.Messages = tG);
      class t4 extends tK {
        constructor() {
          super(...arguments), (this.completions = new t0(this._client));
        }
      }
      (t4.Completions = t0), (t4.ChatCompletionsPage = t1);
      class t9 extends tK {
        create(e, t) {
          let s = !!e.encoding_format,
            r = s ? e.encoding_format : "base64";
          s &&
            tq("Request", "User defined encoding_format:", e.encoding_format);
          let n = this._client.post("/embeddings", {
            body: { ...e, encoding_format: r },
            ...t,
          });
          return s
            ? n
            : (tq("response", "Decoding base64 embeddings to float32 array"),
              n._thenUnwrap(
                (e) => (
                  e &&
                    e.data &&
                    e.data.forEach((e) => {
                      let t = e.embedding;
                      e.embedding = tV(t);
                    }),
                  e
                ),
              ));
        }
      }
      class t3 extends tK {
        create(e, t) {
          return this._client.post("/files", td({ body: e, ...t }));
        }
        retrieve(e, t) {
          return this._client.get(`/files/${e}`, t);
        }
        list(e = {}, t) {
          return tS(e)
            ? this.list({}, e)
            : this._client.getAPIList("/files", t5, { query: e, ...t });
        }
        del(e, t) {
          return this._client.delete(`/files/${e}`, t);
        }
        content(e, t) {
          return this._client.get(`/files/${e}/content`, {
            ...t,
            headers: { Accept: "application/binary", ...t?.headers },
            __binaryResponse: !0,
          });
        }
        retrieveContent(e, t) {
          return this._client.get(`/files/${e}/content`, t);
        }
        async waitForProcessing(
          e,
          { pollInterval: t = 5e3, maxWait: s = 18e5 } = {},
        ) {
          let r = new Set(["processed", "error", "deleted"]),
            n = Date.now(),
            a = await this.retrieve(e);
          for (; !a.status || !r.has(a.status); )
            if ((await tj(t), (a = await this.retrieve(e)), Date.now() - n > s))
              throw new j({
                message: `Giving up on waiting for file ${e} to finish processing after ${s} milliseconds.`,
              });
          return a;
        }
      }
      class t5 extends tQ {}
      t3.FileObjectsPage = t5;
      class t6 extends tK {
        createVariation(e, t) {
          return this._client.post("/images/variations", td({ body: e, ...t }));
        }
        edit(e, t) {
          return this._client.post("/images/edits", td({ body: e, ...t }));
        }
        generate(e, t) {
          return this._client.post("/images/generations", { body: e, ...t });
        }
      }
      class t8 extends tK {
        create(e, t) {
          return this._client.post("/audio/speech", {
            body: e,
            ...t,
            headers: { Accept: "application/octet-stream", ...t?.headers },
            __binaryResponse: !0,
          });
        }
      }
      class t7 extends tK {
        create(e, t) {
          return this._client.post(
            "/audio/transcriptions",
            td({
              body: e,
              ...t,
              stream: e.stream ?? !1,
              __metadata: { model: e.model },
            }),
          );
        }
      }
      class se extends tK {
        create(e, t) {
          return this._client.post(
            "/audio/translations",
            td({ body: e, ...t, __metadata: { model: e.model } }),
          );
        }
      }
      class st extends tK {
        constructor() {
          super(...arguments),
            (this.transcriptions = new t7(this._client)),
            (this.translations = new se(this._client)),
            (this.speech = new t8(this._client));
        }
      }
      (st.Transcriptions = t7), (st.Translations = se), (st.Speech = t8);
      class ss extends tK {
        create(e, t) {
          return this._client.post("/moderations", { body: e, ...t });
        }
      }
      class sr extends tK {
        retrieve(e, t) {
          return this._client.get(`/models/${e}`, t);
        }
        list(e) {
          return this._client.getAPIList("/models", sn, e);
        }
        del(e, t) {
          return this._client.delete(`/models/${e}`, t);
        }
      }
      class sn extends tY {}
      sr.ModelsPage = sn;
      class sa extends tK {}
      class si extends tK {
        run(e, t) {
          return this._client.post("/fine_tuning/alpha/graders/run", {
            body: e,
            ...t,
          });
        }
        validate(e, t) {
          return this._client.post("/fine_tuning/alpha/graders/validate", {
            body: e,
            ...t,
          });
        }
      }
      class so extends tK {
        constructor() {
          super(...arguments), (this.graders = new si(this._client));
        }
      }
      so.Graders = si;
      class sl extends tK {
        create(e, t, s) {
          return this._client.getAPIList(
            `/fine_tuning/checkpoints/${e}/permissions`,
            sc,
            { body: t, method: "post", ...s },
          );
        }
        retrieve(e, t = {}, s) {
          return tS(t)
            ? this.retrieve(e, {}, t)
            : this._client.get(`/fine_tuning/checkpoints/${e}/permissions`, {
                query: t,
                ...s,
              });
        }
        del(e, t, s) {
          return this._client.delete(
            `/fine_tuning/checkpoints/${e}/permissions/${t}`,
            s,
          );
        }
      }
      class sc extends tY {}
      sl.PermissionCreateResponsesPage = sc;
      class su extends tK {
        constructor() {
          super(...arguments), (this.permissions = new sl(this._client));
        }
      }
      (su.Permissions = sl), (su.PermissionCreateResponsesPage = sc);
      class sd extends tK {
        list(e, t = {}, s) {
          return tS(t)
            ? this.list(e, {}, t)
            : this._client.getAPIList(
                `/fine_tuning/jobs/${e}/checkpoints`,
                sh,
                { query: t, ...s },
              );
        }
      }
      class sh extends tQ {}
      sd.FineTuningJobCheckpointsPage = sh;
      class sp extends tK {
        constructor() {
          super(...arguments), (this.checkpoints = new sd(this._client));
        }
        create(e, t) {
          return this._client.post("/fine_tuning/jobs", { body: e, ...t });
        }
        retrieve(e, t) {
          return this._client.get(`/fine_tuning/jobs/${e}`, t);
        }
        list(e = {}, t) {
          return tS(e)
            ? this.list({}, e)
            : this._client.getAPIList("/fine_tuning/jobs", sf, {
                query: e,
                ...t,
              });
        }
        cancel(e, t) {
          return this._client.post(`/fine_tuning/jobs/${e}/cancel`, t);
        }
        listEvents(e, t = {}, s) {
          return tS(t)
            ? this.listEvents(e, {}, t)
            : this._client.getAPIList(`/fine_tuning/jobs/${e}/events`, sm, {
                query: t,
                ...s,
              });
        }
        pause(e, t) {
          return this._client.post(`/fine_tuning/jobs/${e}/pause`, t);
        }
        resume(e, t) {
          return this._client.post(`/fine_tuning/jobs/${e}/resume`, t);
        }
      }
      class sf extends tQ {}
      class sm extends tQ {}
      (sp.FineTuningJobsPage = sf),
        (sp.FineTuningJobEventsPage = sm),
        (sp.Checkpoints = sd),
        (sp.FineTuningJobCheckpointsPage = sh);
      class sg extends tK {
        constructor() {
          super(...arguments),
            (this.methods = new sa(this._client)),
            (this.jobs = new sp(this._client)),
            (this.checkpoints = new su(this._client)),
            (this.alpha = new so(this._client));
        }
      }
      (sg.Methods = sa),
        (sg.Jobs = sp),
        (sg.FineTuningJobsPage = sf),
        (sg.FineTuningJobEventsPage = sm),
        (sg.Checkpoints = su),
        (sg.Alpha = so);
      class sy extends tK {}
      class s_ extends tK {
        constructor() {
          super(...arguments), (this.graderModels = new sy(this._client));
        }
      }
      s_.GraderModels = sy;
      let sv = async (e) => {
        let t = await Promise.allSettled(e),
          s = t.filter((e) => "rejected" === e.status);
        if (s.length) {
          for (let e of s) console.error(e.reason);
          throw Error(`${s.length} promise(s) failed - see the above errors`);
        }
        let r = [];
        for (let e of t) "fulfilled" === e.status && r.push(e.value);
        return r;
      };
      class sw extends tK {
        create(e, t, s) {
          return this._client.post(`/vector_stores/${e}/files`, {
            body: t,
            ...s,
            headers: { "OpenAI-Beta": "assistants=v2", ...s?.headers },
          });
        }
        retrieve(e, t, s) {
          return this._client.get(`/vector_stores/${e}/files/${t}`, {
            ...s,
            headers: { "OpenAI-Beta": "assistants=v2", ...s?.headers },
          });
        }
        update(e, t, s, r) {
          return this._client.post(`/vector_stores/${e}/files/${t}`, {
            body: s,
            ...r,
            headers: { "OpenAI-Beta": "assistants=v2", ...r?.headers },
          });
        }
        list(e, t = {}, s) {
          return tS(t)
            ? this.list(e, {}, t)
            : this._client.getAPIList(`/vector_stores/${e}/files`, sb, {
                query: t,
                ...s,
                headers: { "OpenAI-Beta": "assistants=v2", ...s?.headers },
              });
        }
        del(e, t, s) {
          return this._client.delete(`/vector_stores/${e}/files/${t}`, {
            ...s,
            headers: { "OpenAI-Beta": "assistants=v2", ...s?.headers },
          });
        }
        async createAndPoll(e, t, s) {
          let r = await this.create(e, t, s);
          return await this.poll(e, r.id, s);
        }
        async poll(e, t, s) {
          let r = { ...s?.headers, "X-Stainless-Poll-Helper": "true" };
          for (
            s?.pollIntervalMs &&
            (r["X-Stainless-Custom-Poll-Interval"] =
              s.pollIntervalMs.toString());
            ;

          ) {
            let n = await this.retrieve(e, t, {
                ...s,
                headers: r,
              }).withResponse(),
              a = n.data;
            switch (a.status) {
              case "in_progress":
                let i = 5e3;
                if (s?.pollIntervalMs) i = s.pollIntervalMs;
                else {
                  let e = n.response.headers.get("openai-poll-after-ms");
                  if (e) {
                    let t = parseInt(e);
                    isNaN(t) || (i = t);
                  }
                }
                await tj(i);
                break;
              case "failed":
              case "completed":
                return a;
            }
          }
        }
        async upload(e, t, s) {
          let r = await this._client.files.create(
            { file: t, purpose: "assistants" },
            s,
          );
          return this.create(e, { file_id: r.id }, s);
        }
        async uploadAndPoll(e, t, s) {
          let r = await this.upload(e, t, s);
          return await this.poll(e, r.id, s);
        }
        content(e, t, s) {
          return this._client.getAPIList(
            `/vector_stores/${e}/files/${t}/content`,
            sx,
            {
              ...s,
              headers: { "OpenAI-Beta": "assistants=v2", ...s?.headers },
            },
          );
        }
      }
      class sb extends tQ {}
      class sx extends tY {}
      (sw.VectorStoreFilesPage = sb), (sw.FileContentResponsesPage = sx);
      class sk extends tK {
        create(e, t, s) {
          return this._client.post(`/vector_stores/${e}/file_batches`, {
            body: t,
            ...s,
            headers: { "OpenAI-Beta": "assistants=v2", ...s?.headers },
          });
        }
        retrieve(e, t, s) {
          return this._client.get(`/vector_stores/${e}/file_batches/${t}`, {
            ...s,
            headers: { "OpenAI-Beta": "assistants=v2", ...s?.headers },
          });
        }
        cancel(e, t, s) {
          return this._client.post(
            `/vector_stores/${e}/file_batches/${t}/cancel`,
            {
              ...s,
              headers: { "OpenAI-Beta": "assistants=v2", ...s?.headers },
            },
          );
        }
        async createAndPoll(e, t, s) {
          let r = await this.create(e, t);
          return await this.poll(e, r.id, s);
        }
        listFiles(e, t, s = {}, r) {
          return tS(s)
            ? this.listFiles(e, t, {}, s)
            : this._client.getAPIList(
                `/vector_stores/${e}/file_batches/${t}/files`,
                sb,
                {
                  query: s,
                  ...r,
                  headers: { "OpenAI-Beta": "assistants=v2", ...r?.headers },
                },
              );
        }
        async poll(e, t, s) {
          let r = { ...s?.headers, "X-Stainless-Poll-Helper": "true" };
          for (
            s?.pollIntervalMs &&
            (r["X-Stainless-Custom-Poll-Interval"] =
              s.pollIntervalMs.toString());
            ;

          ) {
            let { data: n, response: a } = await this.retrieve(e, t, {
              ...s,
              headers: r,
            }).withResponse();
            switch (n.status) {
              case "in_progress":
                let i = 5e3;
                if (s?.pollIntervalMs) i = s.pollIntervalMs;
                else {
                  let e = a.headers.get("openai-poll-after-ms");
                  if (e) {
                    let t = parseInt(e);
                    isNaN(t) || (i = t);
                  }
                }
                await tj(i);
                break;
              case "failed":
              case "cancelled":
              case "completed":
                return n;
            }
          }
        }
        async uploadAndPoll(e, { files: t, fileIds: s = [] }, r) {
          if (null == t || 0 == t.length)
            throw Error(
              "No `files` provided to process. If you've already uploaded files you should use `.createAndPoll()` instead",
            );
          let n = Math.min(r?.maxConcurrency ?? 5, t.length),
            a = this._client,
            i = t.values(),
            o = [...s];
          async function l(e) {
            for (let t of e) {
              let e = await a.files.create(
                { file: t, purpose: "assistants" },
                r,
              );
              o.push(e.id);
            }
          }
          let c = Array(n).fill(i).map(l);
          return await sv(c), await this.createAndPoll(e, { file_ids: o });
        }
      }
      class sA extends tK {
        constructor() {
          super(...arguments),
            (this.files = new sw(this._client)),
            (this.fileBatches = new sk(this._client));
        }
        create(e, t) {
          return this._client.post("/vector_stores", {
            body: e,
            ...t,
            headers: { "OpenAI-Beta": "assistants=v2", ...t?.headers },
          });
        }
        retrieve(e, t) {
          return this._client.get(`/vector_stores/${e}`, {
            ...t,
            headers: { "OpenAI-Beta": "assistants=v2", ...t?.headers },
          });
        }
        update(e, t, s) {
          return this._client.post(`/vector_stores/${e}`, {
            body: t,
            ...s,
            headers: { "OpenAI-Beta": "assistants=v2", ...s?.headers },
          });
        }
        list(e = {}, t) {
          return tS(e)
            ? this.list({}, e)
            : this._client.getAPIList("/vector_stores", sO, {
                query: e,
                ...t,
                headers: { "OpenAI-Beta": "assistants=v2", ...t?.headers },
              });
        }
        del(e, t) {
          return this._client.delete(`/vector_stores/${e}`, {
            ...t,
            headers: { "OpenAI-Beta": "assistants=v2", ...t?.headers },
          });
        }
        search(e, t, s) {
          return this._client.getAPIList(`/vector_stores/${e}/search`, sS, {
            body: t,
            method: "post",
            ...s,
            headers: { "OpenAI-Beta": "assistants=v2", ...s?.headers },
          });
        }
      }
      class sO extends tQ {}
      class sS extends tY {}
      (sA.VectorStoresPage = sO),
        (sA.VectorStoreSearchResponsesPage = sS),
        (sA.Files = sw),
        (sA.VectorStoreFilesPage = sb),
        (sA.FileContentResponsesPage = sx),
        (sA.FileBatches = sk);
      class sR extends tK {
        create(e, t) {
          return this._client.post("/assistants", {
            body: e,
            ...t,
            headers: { "OpenAI-Beta": "assistants=v2", ...t?.headers },
          });
        }
        retrieve(e, t) {
          return this._client.get(`/assistants/${e}`, {
            ...t,
            headers: { "OpenAI-Beta": "assistants=v2", ...t?.headers },
          });
        }
        update(e, t, s) {
          return this._client.post(`/assistants/${e}`, {
            body: t,
            ...s,
            headers: { "OpenAI-Beta": "assistants=v2", ...s?.headers },
          });
        }
        list(e = {}, t) {
          return tS(e)
            ? this.list({}, e)
            : this._client.getAPIList("/assistants", sE, {
                query: e,
                ...t,
                headers: { "OpenAI-Beta": "assistants=v2", ...t?.headers },
              });
        }
        del(e, t) {
          return this._client.delete(`/assistants/${e}`, {
            ...t,
            headers: { "OpenAI-Beta": "assistants=v2", ...t?.headers },
          });
        }
      }
      class sE extends tQ {}
      function sC(e) {
        return "function" == typeof e.parse;
      }
      sR.AssistantsPage = sE;
      let s$ = (e) => e?.role === "assistant",
        sP = (e) => e?.role === "function",
        sI = (e) => e?.role === "tool";
      var sT = function (e, t, s, r, n) {
          if ("m" === r) throw TypeError("Private method is not writable");
          if ("a" === r && !n)
            throw TypeError("Private accessor was defined without a setter");
          if ("function" == typeof t ? e !== t || !n : !t.has(e))
            throw TypeError(
              "Cannot write private member to an object whose class did not declare it",
            );
          return "a" === r ? n.call(e, s) : n ? (n.value = s) : t.set(e, s), s;
        },
        sj = function (e, t, s, r) {
          if ("a" === s && !r)
            throw TypeError("Private accessor was defined without a getter");
          if ("function" == typeof t ? e !== t || !r : !t.has(e))
            throw TypeError(
              "Cannot read private member from an object whose class did not declare it",
            );
          return "m" === s ? r : "a" === s ? r.call(e) : r ? r.value : t.get(e);
        };
      class sN {
        constructor() {
          V.add(this),
            (this.controller = new AbortController()),
            J.set(this, void 0),
            K.set(this, () => {}),
            X.set(this, () => {}),
            G.set(this, void 0),
            Y.set(this, () => {}),
            Q.set(this, () => {}),
            ee.set(this, {}),
            et.set(this, !1),
            es.set(this, !1),
            er.set(this, !1),
            en.set(this, !1),
            sT(
              this,
              J,
              new Promise((e, t) => {
                sT(this, K, e, "f"), sT(this, X, t, "f");
              }),
              "f",
            ),
            sT(
              this,
              G,
              new Promise((e, t) => {
                sT(this, Y, e, "f"), sT(this, Q, t, "f");
              }),
              "f",
            ),
            sj(this, J, "f").catch(() => {}),
            sj(this, G, "f").catch(() => {});
        }
        _run(e) {
          setTimeout(() => {
            e().then(
              () => {
                this._emitFinal(), this._emit("end");
              },
              sj(this, V, "m", ea).bind(this),
            );
          }, 0);
        }
        _connected() {
          this.ended || (sj(this, K, "f").call(this), this._emit("connect"));
        }
        get ended() {
          return sj(this, et, "f");
        }
        get errored() {
          return sj(this, es, "f");
        }
        get aborted() {
          return sj(this, er, "f");
        }
        abort() {
          this.controller.abort();
        }
        on(e, t) {
          return (
            (sj(this, ee, "f")[e] || (sj(this, ee, "f")[e] = [])).push({
              listener: t,
            }),
            this
          );
        }
        off(e, t) {
          let s = sj(this, ee, "f")[e];
          if (!s) return this;
          let r = s.findIndex((e) => e.listener === t);
          return r >= 0 && s.splice(r, 1), this;
        }
        once(e, t) {
          return (
            (sj(this, ee, "f")[e] || (sj(this, ee, "f")[e] = [])).push({
              listener: t,
              once: !0,
            }),
            this
          );
        }
        emitted(e) {
          return new Promise((t, s) => {
            sT(this, en, !0, "f"),
              "error" !== e && this.once("error", s),
              this.once(e, t);
          });
        }
        async done() {
          sT(this, en, !0, "f"), await sj(this, G, "f");
        }
        _emit(e, ...t) {
          if (sj(this, et, "f")) return;
          "end" === e && (sT(this, et, !0, "f"), sj(this, Y, "f").call(this));
          let s = sj(this, ee, "f")[e];
          if (
            (s &&
              ((sj(this, ee, "f")[e] = s.filter((e) => !e.once)),
              s.forEach(({ listener: e }) => e(...t))),
            "abort" === e)
          ) {
            let e = t[0];
            sj(this, en, "f") || s?.length || Promise.reject(e),
              sj(this, X, "f").call(this, e),
              sj(this, Q, "f").call(this, e),
              this._emit("end");
            return;
          }
          if ("error" === e) {
            let e = t[0];
            sj(this, en, "f") || s?.length || Promise.reject(e),
              sj(this, X, "f").call(this, e),
              sj(this, Q, "f").call(this, e),
              this._emit("end");
          }
        }
        _emitFinal() {}
      }
      function sL(e) {
        return e?.$brand === "auto-parseable-response-format";
      }
      function sM(e) {
        return e?.$brand === "auto-parseable-tool";
      }
      function sF(e, t) {
        let s = e.choices.map((e) => {
          var s, r;
          if ("length" === e.finish_reason) throw new U();
          if ("content_filter" === e.finish_reason) throw new H();
          return {
            ...e,
            message: {
              ...e.message,
              ...(e.message.tool_calls
                ? {
                    tool_calls:
                      e.message.tool_calls?.map((e) =>
                        (function (e, t) {
                          let s = e.tools?.find(
                            (e) => e.function?.name === t.function.name,
                          );
                          return {
                            ...t,
                            function: {
                              ...t.function,
                              parsed_arguments: sM(s)
                                ? s.$parseRaw(t.function.arguments)
                                : s?.function.strict
                                  ? JSON.parse(t.function.arguments)
                                  : null,
                            },
                          };
                        })(t, e),
                      ) ?? void 0,
                  }
                : void 0),
              parsed:
                e.message.content && !e.message.refusal
                  ? ((s = t),
                    (r = e.message.content),
                    s.response_format?.type !== "json_schema"
                      ? null
                      : s.response_format?.type === "json_schema"
                        ? "$parseRaw" in s.response_format
                          ? s.response_format.$parseRaw(r)
                          : JSON.parse(r)
                        : null)
                  : null,
            },
          };
        });
        return { ...e, choices: s };
      }
      function sD(e) {
        return (
          !!sL(e.response_format) ||
          (e.tools?.some(
            (e) => sM(e) || ("function" === e.type && !0 === e.function.strict),
          ) ??
            !1)
        );
      }
      (J = new WeakMap()),
        (K = new WeakMap()),
        (X = new WeakMap()),
        (G = new WeakMap()),
        (Y = new WeakMap()),
        (Q = new WeakMap()),
        (ee = new WeakMap()),
        (et = new WeakMap()),
        (es = new WeakMap()),
        (er = new WeakMap()),
        (en = new WeakMap()),
        (V = new WeakSet()),
        (ea = function (e) {
          if (
            (sT(this, es, !0, "f"),
            e instanceof Error && "AbortError" === e.name && (e = new I()),
            e instanceof I)
          )
            return sT(this, er, !0, "f"), this._emit("abort", e);
          if (e instanceof $) return this._emit("error", e);
          if (e instanceof Error) {
            let t = new $(e.message);
            return (t.cause = e), this._emit("error", t);
          }
          return this._emit("error", new $(String(e)));
        });
      var sZ = function (e, t, s, r) {
        if ("a" === s && !r)
          throw TypeError("Private accessor was defined without a getter");
        if ("function" == typeof t ? e !== t || !r : !t.has(e))
          throw TypeError(
            "Cannot read private member from an object whose class did not declare it",
          );
        return "m" === s ? r : "a" === s ? r.call(e) : r ? r.value : t.get(e);
      };
      class sB extends sN {
        constructor() {
          super(...arguments),
            ei.add(this),
            (this._chatCompletions = []),
            (this.messages = []);
        }
        _addChatCompletion(e) {
          this._chatCompletions.push(e), this._emit("chatCompletion", e);
          let t = e.choices[0]?.message;
          return t && this._addMessage(t), e;
        }
        _addMessage(e, t = !0) {
          if (
            ("content" in e || (e.content = null), this.messages.push(e), t)
          ) {
            if ((this._emit("message", e), (sP(e) || sI(e)) && e.content))
              this._emit("functionCallResult", e.content);
            else if (s$(e) && e.function_call)
              this._emit("functionCall", e.function_call);
            else if (s$(e) && e.tool_calls)
              for (let t of e.tool_calls)
                "function" === t.type && this._emit("functionCall", t.function);
          }
        }
        async finalChatCompletion() {
          await this.done();
          let e = this._chatCompletions[this._chatCompletions.length - 1];
          if (!e)
            throw new $("stream ended without producing a ChatCompletion");
          return e;
        }
        async finalContent() {
          return await this.done(), sZ(this, ei, "m", eo).call(this);
        }
        async finalMessage() {
          return await this.done(), sZ(this, ei, "m", el).call(this);
        }
        async finalFunctionCall() {
          return await this.done(), sZ(this, ei, "m", ec).call(this);
        }
        async finalFunctionCallResult() {
          return await this.done(), sZ(this, ei, "m", eu).call(this);
        }
        async totalUsage() {
          return await this.done(), sZ(this, ei, "m", ed).call(this);
        }
        allChatCompletions() {
          return [...this._chatCompletions];
        }
        _emitFinal() {
          let e = this._chatCompletions[this._chatCompletions.length - 1];
          e && this._emit("finalChatCompletion", e);
          let t = sZ(this, ei, "m", el).call(this);
          t && this._emit("finalMessage", t);
          let s = sZ(this, ei, "m", eo).call(this);
          s && this._emit("finalContent", s);
          let r = sZ(this, ei, "m", ec).call(this);
          r && this._emit("finalFunctionCall", r);
          let n = sZ(this, ei, "m", eu).call(this);
          null != n && this._emit("finalFunctionCallResult", n),
            this._chatCompletions.some((e) => e.usage) &&
              this._emit("totalUsage", sZ(this, ei, "m", ed).call(this));
        }
        async _createChatCompletion(e, t, s) {
          let r = s?.signal;
          r &&
            (r.aborted && this.controller.abort(),
            r.addEventListener("abort", () => this.controller.abort())),
            sZ(this, ei, "m", eh).call(this, t);
          let n = await e.chat.completions.create(
            { ...t, stream: !1 },
            { ...s, signal: this.controller.signal },
          );
          return this._connected(), this._addChatCompletion(sF(n, t));
        }
        async _runChatCompletion(e, t, s) {
          for (let e of t.messages) this._addMessage(e, !1);
          return await this._createChatCompletion(e, t, s);
        }
        async _runFunctions(e, t, s) {
          let r = "function",
            { function_call: n = "auto", stream: a, ...i } = t,
            o = "string" != typeof n && n?.name,
            { maxChatCompletions: l = 10 } = s || {},
            c = {};
          for (let e of t.functions) c[e.name || e.function.name] = e;
          let u = t.functions.map((e) => ({
            name: e.name || e.function.name,
            parameters: e.parameters,
            description: e.description,
          }));
          for (let e of t.messages) this._addMessage(e, !1);
          for (let t = 0; t < l; ++t) {
            let t,
              a = await this._createChatCompletion(
                e,
                {
                  ...i,
                  function_call: n,
                  functions: u,
                  messages: [...this.messages],
                },
                s,
              ),
              l = a.choices[0]?.message;
            if (!l) throw new $("missing message in ChatCompletion response");
            if (!l.function_call) return;
            let { name: d, arguments: h } = l.function_call,
              p = c[d];
            if (p) {
              if (o && o !== d) {
                let e = `Invalid function_call: ${JSON.stringify(d)}. ${JSON.stringify(o)} requested. Please try again`;
                this._addMessage({ role: r, name: d, content: e });
                continue;
              }
            } else {
              let e = `Invalid function_call: ${JSON.stringify(d)}. Available options are: ${u.map((e) => JSON.stringify(e.name)).join(", ")}. Please try again`;
              this._addMessage({ role: r, name: d, content: e });
              continue;
            }
            try {
              t = sC(p) ? await p.parse(h) : h;
            } catch (e) {
              this._addMessage({
                role: r,
                name: d,
                content: e instanceof Error ? e.message : String(e),
              });
              continue;
            }
            let f = await p.function(t, this),
              m = sZ(this, ei, "m", ep).call(this, f);
            if ((this._addMessage({ role: r, name: d, content: m }), o)) return;
          }
        }
        async _runTools(e, t, s) {
          let r = "tool",
            { tool_choice: n = "auto", stream: a, ...i } = t,
            o = "string" != typeof n && n?.function?.name,
            { maxChatCompletions: l = 10 } = s || {},
            c = t.tools.map((e) => {
              if (sM(e)) {
                if (!e.$callback)
                  throw new $(
                    "Tool given to `.runTools()` that does not have an associated function",
                  );
                return {
                  type: "function",
                  function: {
                    function: e.$callback,
                    name: e.function.name,
                    description: e.function.description || "",
                    parameters: e.function.parameters,
                    parse: e.$parseRaw,
                    strict: !0,
                  },
                };
              }
              return e;
            }),
            u = {};
          for (let e of c)
            "function" === e.type &&
              (u[e.function.name || e.function.function.name] = e.function);
          let d =
            "tools" in t
              ? c.map((e) =>
                  "function" === e.type
                    ? {
                        type: "function",
                        function: {
                          name: e.function.name || e.function.function.name,
                          parameters: e.function.parameters,
                          description: e.function.description,
                          strict: e.function.strict,
                        },
                      }
                    : e,
                )
              : void 0;
          for (let e of t.messages) this._addMessage(e, !1);
          for (let t = 0; t < l; ++t) {
            let t = await this._createChatCompletion(
                e,
                {
                  ...i,
                  tool_choice: n,
                  tools: d,
                  messages: [...this.messages],
                },
                s,
              ),
              a = t.choices[0]?.message;
            if (!a) throw new $("missing message in ChatCompletion response");
            if (!a.tool_calls?.length) break;
            for (let e of a.tool_calls) {
              let t;
              if ("function" !== e.type) continue;
              let s = e.id,
                { name: n, arguments: a } = e.function,
                i = u[n];
              if (i) {
                if (o && o !== n) {
                  let e = `Invalid tool_call: ${JSON.stringify(n)}. ${JSON.stringify(o)} requested. Please try again`;
                  this._addMessage({ role: r, tool_call_id: s, content: e });
                  continue;
                }
              } else {
                let e = `Invalid tool_call: ${JSON.stringify(n)}. Available options are: ${Object.keys(
                  u,
                )
                  .map((e) => JSON.stringify(e))
                  .join(", ")}. Please try again`;
                this._addMessage({ role: r, tool_call_id: s, content: e });
                continue;
              }
              try {
                t = sC(i) ? await i.parse(a) : a;
              } catch (t) {
                let e = t instanceof Error ? t.message : String(t);
                this._addMessage({ role: r, tool_call_id: s, content: e });
                continue;
              }
              let l = await i.function(t, this),
                c = sZ(this, ei, "m", ep).call(this, l);
              if (
                (this._addMessage({ role: r, tool_call_id: s, content: c }), o)
              )
                return;
            }
          }
        }
      }
      (ei = new WeakSet()),
        (eo = function () {
          return sZ(this, ei, "m", el).call(this).content ?? null;
        }),
        (el = function () {
          let e = this.messages.length;
          for (; e-- > 0; ) {
            let t = this.messages[e];
            if (s$(t)) {
              let { function_call: e, ...s } = t,
                r = {
                  ...s,
                  content: t.content ?? null,
                  refusal: t.refusal ?? null,
                };
              return e && (r.function_call = e), r;
            }
          }
          throw new $(
            "stream ended without producing a ChatCompletionMessage with role=assistant",
          );
        }),
        (ec = function () {
          for (let e = this.messages.length - 1; e >= 0; e--) {
            let t = this.messages[e];
            if (s$(t) && t?.function_call) return t.function_call;
            if (s$(t) && t?.tool_calls?.length)
              return t.tool_calls.at(-1)?.function;
          }
        }),
        (eu = function () {
          for (let e = this.messages.length - 1; e >= 0; e--) {
            let t = this.messages[e];
            if (
              (sP(t) && null != t.content) ||
              (sI(t) &&
                null != t.content &&
                "string" == typeof t.content &&
                this.messages.some(
                  (e) =>
                    "assistant" === e.role &&
                    e.tool_calls?.some(
                      (e) => "function" === e.type && e.id === t.tool_call_id,
                    ),
                ))
            )
              return t.content;
          }
        }),
        (ed = function () {
          let e = { completion_tokens: 0, prompt_tokens: 0, total_tokens: 0 };
          for (let { usage: t } of this._chatCompletions)
            t &&
              ((e.completion_tokens += t.completion_tokens),
              (e.prompt_tokens += t.prompt_tokens),
              (e.total_tokens += t.total_tokens));
          return e;
        }),
        (eh = function (e) {
          if (null != e.n && e.n > 1)
            throw new $(
              "ChatCompletion convenience helpers only support n=1 at this time. To use n>1, please use chat.completions.create() directly.",
            );
        }),
        (ep = function (e) {
          return "string" == typeof e
            ? e
            : void 0 === e
              ? "undefined"
              : JSON.stringify(e);
        });
      class sq extends sB {
        static runFunctions(e, t, s) {
          let r = new sq(),
            n = {
              ...s,
              headers: {
                ...s?.headers,
                "X-Stainless-Helper-Method": "runFunctions",
              },
            };
          return r._run(() => r._runFunctions(e, t, n)), r;
        }
        static runTools(e, t, s) {
          let r = new sq(),
            n = {
              ...s,
              headers: {
                ...s?.headers,
                "X-Stainless-Helper-Method": "runTools",
              },
            };
          return r._run(() => r._runTools(e, t, n)), r;
        }
        _addMessage(e, t = !0) {
          super._addMessage(e, t),
            s$(e) && e.content && this._emit("content", e.content);
        }
      }
      let sU = {
        STR: 1,
        NUM: 2,
        ARR: 4,
        OBJ: 8,
        NULL: 16,
        BOOL: 32,
        NAN: 64,
        INFINITY: 128,
        MINUS_INFINITY: 256,
        ALL: 511,
      };
      class sH extends Error {}
      class sW extends Error {}
      let sz = (e, t) => {
          let s = e.length,
            r = 0,
            n = (e) => {
              throw new sH(`${e} at position ${r}`);
            },
            a = (e) => {
              throw new sW(`${e} at position ${r}`);
            },
            i = () =>
              (d(), r >= s && n("Unexpected end of input"), '"' === e[r])
                ? o()
                : "{" === e[r]
                  ? l()
                  : "[" === e[r]
                    ? c()
                    : "null" === e.substring(r, r + 4) ||
                        (sU.NULL & t &&
                          s - r < 4 &&
                          "null".startsWith(e.substring(r)))
                      ? ((r += 4), null)
                      : "true" === e.substring(r, r + 4) ||
                          (sU.BOOL & t &&
                            s - r < 4 &&
                            "true".startsWith(e.substring(r)))
                        ? ((r += 4), !0)
                        : "false" === e.substring(r, r + 5) ||
                            (sU.BOOL & t &&
                              s - r < 5 &&
                              "false".startsWith(e.substring(r)))
                          ? ((r += 5), !1)
                          : "Infinity" === e.substring(r, r + 8) ||
                              (sU.INFINITY & t &&
                                s - r < 8 &&
                                "Infinity".startsWith(e.substring(r)))
                            ? ((r += 8), 1 / 0)
                            : "-Infinity" === e.substring(r, r + 9) ||
                                (sU.MINUS_INFINITY & t &&
                                  1 < s - r &&
                                  s - r < 9 &&
                                  "-Infinity".startsWith(e.substring(r)))
                              ? ((r += 9), -1 / 0)
                              : "NaN" === e.substring(r, r + 3) ||
                                  (sU.NAN & t &&
                                    s - r < 3 &&
                                    "NaN".startsWith(e.substring(r)))
                                ? ((r += 3), NaN)
                                : u(),
            o = () => {
              let i = r,
                o = !1;
              for (r++; r < s && ('"' !== e[r] || (o && "\\" === e[r - 1])); )
                (o = "\\" === e[r] && !o), r++;
              if ('"' == e.charAt(r))
                try {
                  return JSON.parse(e.substring(i, ++r - Number(o)));
                } catch (e) {
                  a(String(e));
                }
              else if (sU.STR & t)
                try {
                  return JSON.parse(e.substring(i, r - Number(o)) + '"');
                } catch (t) {
                  return JSON.parse(e.substring(i, e.lastIndexOf("\\")) + '"');
                }
              n("Unterminated string literal");
            },
            l = () => {
              r++, d();
              let a = {};
              try {
                for (; "}" !== e[r]; ) {
                  if ((d(), r >= s && sU.OBJ & t)) return a;
                  let n = o();
                  d(), r++;
                  try {
                    let e = i();
                    Object.defineProperty(a, n, {
                      value: e,
                      writable: !0,
                      enumerable: !0,
                      configurable: !0,
                    });
                  } catch (e) {
                    if (sU.OBJ & t) return a;
                    throw e;
                  }
                  d(), "," === e[r] && r++;
                }
              } catch (e) {
                if (sU.OBJ & t) return a;
                n("Expected '}' at end of object");
              }
              return r++, a;
            },
            c = () => {
              r++;
              let s = [];
              try {
                for (; "]" !== e[r]; ) s.push(i()), d(), "," === e[r] && r++;
              } catch (e) {
                if (sU.ARR & t) return s;
                n("Expected ']' at end of array");
              }
              return r++, s;
            },
            u = () => {
              if (0 === r) {
                "-" === e && sU.NUM & t && n("Not sure what '-' is");
                try {
                  return JSON.parse(e);
                } catch (s) {
                  if (sU.NUM & t)
                    try {
                      if ("." === e[e.length - 1])
                        return JSON.parse(e.substring(0, e.lastIndexOf(".")));
                      return JSON.parse(e.substring(0, e.lastIndexOf("e")));
                    } catch (e) {}
                  a(String(s));
                }
              }
              let i = r;
              for ("-" === e[r] && r++; e[r] && !",]}".includes(e[r]); ) r++;
              r != s || sU.NUM & t || n("Unterminated number literal");
              try {
                return JSON.parse(e.substring(i, r));
              } catch (s) {
                "-" === e.substring(i, r) &&
                  sU.NUM & t &&
                  n("Not sure what '-' is");
                try {
                  return JSON.parse(e.substring(i, e.lastIndexOf("e")));
                } catch (e) {
                  a(String(e));
                }
              }
            },
            d = () => {
              for (; r < s && " \n\r	".includes(e[r]); ) r++;
            };
          return i();
        },
        sV = (e) =>
          (function (e, t = sU.ALL) {
            if ("string" != typeof e)
              throw TypeError(`expecting str, got ${typeof e}`);
            if (!e.trim()) throw Error(`${e} is empty`);
            return sz(e.trim(), t);
          })(e, sU.ALL ^ sU.NUM);
      var sJ = function (e, t, s, r, n) {
          if ("m" === r) throw TypeError("Private method is not writable");
          if ("a" === r && !n)
            throw TypeError("Private accessor was defined without a setter");
          if ("function" == typeof t ? e !== t || !n : !t.has(e))
            throw TypeError(
              "Cannot write private member to an object whose class did not declare it",
            );
          return "a" === r ? n.call(e, s) : n ? (n.value = s) : t.set(e, s), s;
        },
        sK = function (e, t, s, r) {
          if ("a" === s && !r)
            throw TypeError("Private accessor was defined without a getter");
          if ("function" == typeof t ? e !== t || !r : !t.has(e))
            throw TypeError(
              "Cannot read private member from an object whose class did not declare it",
            );
          return "m" === s ? r : "a" === s ? r.call(e) : r ? r.value : t.get(e);
        };
      class sX extends sB {
        constructor(e) {
          super(),
            ef.add(this),
            em.set(this, void 0),
            eg.set(this, void 0),
            ey.set(this, void 0),
            sJ(this, em, e, "f"),
            sJ(this, eg, [], "f");
        }
        get currentChatCompletionSnapshot() {
          return sK(this, ey, "f");
        }
        static fromReadableStream(e) {
          let t = new sX(null);
          return t._run(() => t._fromReadableStream(e)), t;
        }
        static createChatCompletion(e, t, s) {
          let r = new sX(t);
          return (
            r._run(() =>
              r._runChatCompletion(
                e,
                { ...t, stream: !0 },
                {
                  ...s,
                  headers: {
                    ...s?.headers,
                    "X-Stainless-Helper-Method": "stream",
                  },
                },
              ),
            ),
            r
          );
        }
        async _createChatCompletion(e, t, s) {
          super._createChatCompletion;
          let r = s?.signal;
          r &&
            (r.aborted && this.controller.abort(),
            r.addEventListener("abort", () => this.controller.abort())),
            sK(this, ef, "m", e_).call(this);
          let n = await e.chat.completions.create(
            { ...t, stream: !0 },
            { ...s, signal: this.controller.signal },
          );
          for await (let e of (this._connected(), n))
            sK(this, ef, "m", ew).call(this, e);
          if (n.controller.signal?.aborted) throw new I();
          return this._addChatCompletion(sK(this, ef, "m", ek).call(this));
        }
        async _fromReadableStream(e, t) {
          let s,
            r = t?.signal;
          r &&
            (r.aborted && this.controller.abort(),
            r.addEventListener("abort", () => this.controller.abort())),
            sK(this, ef, "m", e_).call(this),
            this._connected();
          let n = e6.fromReadableStream(e, this.controller);
          for await (let e of n)
            s &&
              s !== e.id &&
              this._addChatCompletion(sK(this, ef, "m", ek).call(this)),
              sK(this, ef, "m", ew).call(this, e),
              (s = e.id);
          if (n.controller.signal?.aborted) throw new I();
          return this._addChatCompletion(sK(this, ef, "m", ek).call(this));
        }
        [((em = new WeakMap()),
        (eg = new WeakMap()),
        (ey = new WeakMap()),
        (ef = new WeakSet()),
        (e_ = function () {
          this.ended || sJ(this, ey, void 0, "f");
        }),
        (ev = function (e) {
          let t = sK(this, eg, "f")[e.index];
          return (
            t ||
              ((t = {
                content_done: !1,
                refusal_done: !1,
                logprobs_content_done: !1,
                logprobs_refusal_done: !1,
                done_tool_calls: new Set(),
                current_tool_call_index: null,
              }),
              (sK(this, eg, "f")[e.index] = t)),
            t
          );
        }),
        (ew = function (e) {
          if (this.ended) return;
          let t = sK(this, ef, "m", eO).call(this, e);
          for (let s of (this._emit("chunk", e, t), e.choices)) {
            let e = t.choices[s.index];
            null != s.delta.content &&
              e.message?.role === "assistant" &&
              e.message?.content &&
              (this._emit("content", s.delta.content, e.message.content),
              this._emit("content.delta", {
                delta: s.delta.content,
                snapshot: e.message.content,
                parsed: e.message.parsed,
              })),
              null != s.delta.refusal &&
                e.message?.role === "assistant" &&
                e.message?.refusal &&
                this._emit("refusal.delta", {
                  delta: s.delta.refusal,
                  snapshot: e.message.refusal,
                }),
              s.logprobs?.content != null &&
                e.message?.role === "assistant" &&
                this._emit("logprobs.content.delta", {
                  content: s.logprobs?.content,
                  snapshot: e.logprobs?.content ?? [],
                }),
              s.logprobs?.refusal != null &&
                e.message?.role === "assistant" &&
                this._emit("logprobs.refusal.delta", {
                  refusal: s.logprobs?.refusal,
                  snapshot: e.logprobs?.refusal ?? [],
                });
            let r = sK(this, ef, "m", ev).call(this, e);
            for (let t of (e.finish_reason &&
              (sK(this, ef, "m", ex).call(this, e),
              null != r.current_tool_call_index &&
                sK(this, ef, "m", eb).call(this, e, r.current_tool_call_index)),
            s.delta.tool_calls ?? []))
              r.current_tool_call_index !== t.index &&
                (sK(this, ef, "m", ex).call(this, e),
                null != r.current_tool_call_index &&
                  sK(this, ef, "m", eb).call(
                    this,
                    e,
                    r.current_tool_call_index,
                  )),
                (r.current_tool_call_index = t.index);
            for (let t of s.delta.tool_calls ?? []) {
              let s = e.message.tool_calls?.[t.index];
              s?.type &&
                (s?.type === "function"
                  ? this._emit("tool_calls.function.arguments.delta", {
                      name: s.function?.name,
                      index: t.index,
                      arguments: s.function.arguments,
                      parsed_arguments: s.function.parsed_arguments,
                      arguments_delta: t.function?.arguments ?? "",
                    })
                  : s?.type);
            }
          }
        }),
        (eb = function (e, t) {
          if (sK(this, ef, "m", ev).call(this, e).done_tool_calls.has(t))
            return;
          let s = e.message.tool_calls?.[t];
          if (!s) throw Error("no tool call snapshot");
          if (!s.type) throw Error("tool call snapshot missing `type`");
          if ("function" === s.type) {
            let e = sK(this, em, "f")?.tools?.find(
              (e) =>
                "function" === e.type && e.function.name === s.function.name,
            );
            this._emit("tool_calls.function.arguments.done", {
              name: s.function.name,
              index: t,
              arguments: s.function.arguments,
              parsed_arguments: sM(e)
                ? e.$parseRaw(s.function.arguments)
                : e?.function.strict
                  ? JSON.parse(s.function.arguments)
                  : null,
            });
          } else s.type;
        }),
        (ex = function (e) {
          let t = sK(this, ef, "m", ev).call(this, e);
          if (e.message.content && !t.content_done) {
            t.content_done = !0;
            let s = sK(this, ef, "m", eA).call(this);
            this._emit("content.done", {
              content: e.message.content,
              parsed: s ? s.$parseRaw(e.message.content) : null,
            });
          }
          e.message.refusal &&
            !t.refusal_done &&
            ((t.refusal_done = !0),
            this._emit("refusal.done", { refusal: e.message.refusal })),
            e.logprobs?.content &&
              !t.logprobs_content_done &&
              ((t.logprobs_content_done = !0),
              this._emit("logprobs.content.done", {
                content: e.logprobs.content,
              })),
            e.logprobs?.refusal &&
              !t.logprobs_refusal_done &&
              ((t.logprobs_refusal_done = !0),
              this._emit("logprobs.refusal.done", {
                refusal: e.logprobs.refusal,
              }));
        }),
        (ek = function () {
          if (this.ended)
            throw new $("stream has ended, this shouldn't happen");
          let e = sK(this, ey, "f");
          if (!e) throw new $("request ended without sending any chunks");
          return (
            sJ(this, ey, void 0, "f"),
            sJ(this, eg, [], "f"),
            (function (e, t) {
              var s;
              let {
                id: r,
                choices: n,
                created: a,
                model: i,
                system_fingerprint: o,
                ...l
              } = e;
              return (
                (s = {
                  ...l,
                  id: r,
                  choices: n.map(
                    ({
                      message: t,
                      finish_reason: s,
                      index: r,
                      logprobs: n,
                      ...a
                    }) => {
                      if (!s)
                        throw new $(`missing finish_reason for choice ${r}`);
                      let {
                          content: i = null,
                          function_call: o,
                          tool_calls: l,
                          ...c
                        } = t,
                        u = t.role;
                      if (!u) throw new $(`missing role for choice ${r}`);
                      if (o) {
                        let { arguments: e, name: l } = o;
                        if (null == e)
                          throw new $(
                            `missing function_call.arguments for choice ${r}`,
                          );
                        if (!l)
                          throw new $(
                            `missing function_call.name for choice ${r}`,
                          );
                        return {
                          ...a,
                          message: {
                            content: i,
                            function_call: { arguments: e, name: l },
                            role: u,
                            refusal: t.refusal ?? null,
                          },
                          finish_reason: s,
                          index: r,
                          logprobs: n,
                        };
                      }
                      return l
                        ? {
                            ...a,
                            index: r,
                            finish_reason: s,
                            logprobs: n,
                            message: {
                              ...c,
                              role: u,
                              content: i,
                              refusal: t.refusal ?? null,
                              tool_calls: l.map((t, s) => {
                                let { function: n, type: a, id: i, ...o } = t,
                                  { arguments: l, name: c, ...u } = n || {};
                                if (null == i)
                                  throw new $(`missing choices[${r}].tool_calls[${s}].id
${sG(e)}`);
                                if (null == a)
                                  throw new $(`missing choices[${r}].tool_calls[${s}].type
${sG(e)}`);
                                if (null == c)
                                  throw new $(`missing choices[${r}].tool_calls[${s}].function.name
${sG(e)}`);
                                if (null == l)
                                  throw new $(`missing choices[${r}].tool_calls[${s}].function.arguments
${sG(e)}`);
                                return {
                                  ...o,
                                  id: i,
                                  type: a,
                                  function: { ...u, name: c, arguments: l },
                                };
                              }),
                            },
                          }
                        : {
                            ...a,
                            message: {
                              ...c,
                              content: i,
                              role: u,
                              refusal: t.refusal ?? null,
                            },
                            finish_reason: s,
                            index: r,
                            logprobs: n,
                          };
                    },
                  ),
                  created: a,
                  model: i,
                  object: "chat.completion",
                  ...(o ? { system_fingerprint: o } : {}),
                }),
                t && sD(t)
                  ? sF(s, t)
                  : {
                      ...s,
                      choices: s.choices.map((e) => ({
                        ...e,
                        message: {
                          ...e.message,
                          parsed: null,
                          ...(e.message.tool_calls
                            ? { tool_calls: e.message.tool_calls }
                            : void 0),
                        },
                      })),
                    }
              );
            })(e, sK(this, em, "f"))
          );
        }),
        (eA = function () {
          let e = sK(this, em, "f")?.response_format;
          return sL(e) ? e : null;
        }),
        (eO = function (e) {
          var t, s, r, n;
          let a = sK(this, ey, "f"),
            { choices: i, ...o } = e;
          for (let {
            delta: i,
            finish_reason: l,
            index: c,
            logprobs: u = null,
            ...d
          } of (a
            ? Object.assign(a, o)
            : (a = sJ(this, ey, { ...o, choices: [] }, "f")),
          e.choices)) {
            let e = a.choices[c];
            if (
              (e ||
                (e = a.choices[c] =
                  {
                    finish_reason: l,
                    index: c,
                    message: {},
                    logprobs: u,
                    ...d,
                  }),
              u)
            )
              if (e.logprobs) {
                let { content: r, refusal: n, ...a } = u;
                Object.assign(e.logprobs, a),
                  r &&
                    ((t = e.logprobs).content ?? (t.content = []),
                    e.logprobs.content.push(...r)),
                  n &&
                    ((s = e.logprobs).refusal ?? (s.refusal = []),
                    e.logprobs.refusal.push(...n));
              } else e.logprobs = Object.assign({}, u);
            if (
              l &&
              ((e.finish_reason = l),
              sK(this, em, "f") && sD(sK(this, em, "f")))
            ) {
              if ("length" === l) throw new U();
              if ("content_filter" === l) throw new H();
            }
            if ((Object.assign(e, d), !i)) continue;
            let {
              content: o,
              refusal: h,
              function_call: p,
              role: f,
              tool_calls: m,
              ...g
            } = i;
            if (
              (Object.assign(e.message, g),
              h && (e.message.refusal = (e.message.refusal || "") + h),
              f && (e.message.role = f),
              p &&
                (e.message.function_call
                  ? (p.name && (e.message.function_call.name = p.name),
                    p.arguments &&
                      ((r = e.message.function_call).arguments ??
                        (r.arguments = ""),
                      (e.message.function_call.arguments += p.arguments)))
                  : (e.message.function_call = p)),
              o &&
                ((e.message.content = (e.message.content || "") + o),
                !e.message.refusal &&
                  sK(this, ef, "m", eA).call(this) &&
                  (e.message.parsed = sV(e.message.content))),
              m)
            )
              for (let { index: t, id: s, type: r, function: a, ...i } of (e
                .message.tool_calls || (e.message.tool_calls = []),
              m)) {
                let o = (n = e.message.tool_calls)[t] ?? (n[t] = {});
                Object.assign(o, i),
                  s && (o.id = s),
                  r && (o.type = r),
                  a &&
                    (o.function ??
                      (o.function = { name: a.name ?? "", arguments: "" })),
                  a?.name && (o.function.name = a.name),
                  a?.arguments &&
                    ((o.function.arguments += a.arguments),
                    (function (e, t) {
                      if (!e) return !1;
                      let s = e.tools?.find(
                        (e) => e.function?.name === t.function.name,
                      );
                      return sM(s) || s?.function.strict || !1;
                    })(sK(this, em, "f"), o) &&
                      (o.function.parsed_arguments = sV(o.function.arguments)));
              }
          }
          return a;
        }),
        Symbol.asyncIterator)]() {
          let e = [],
            t = [],
            s = !1;
          return (
            this.on("chunk", (s) => {
              let r = t.shift();
              r ? r.resolve(s) : e.push(s);
            }),
            this.on("end", () => {
              for (let e of ((s = !0), t)) e.resolve(void 0);
              t.length = 0;
            }),
            this.on("abort", (e) => {
              for (let r of ((s = !0), t)) r.reject(e);
              t.length = 0;
            }),
            this.on("error", (e) => {
              for (let r of ((s = !0), t)) r.reject(e);
              t.length = 0;
            }),
            {
              next: async () =>
                e.length
                  ? { value: e.shift(), done: !1 }
                  : s
                    ? { value: void 0, done: !0 }
                    : new Promise((e, s) =>
                        t.push({ resolve: e, reject: s }),
                      ).then((e) =>
                        e
                          ? { value: e, done: !1 }
                          : { value: void 0, done: !0 },
                      ),
              return: async () => (this.abort(), { value: void 0, done: !0 }),
            }
          );
        }
        toReadableStream() {
          return new e6(
            this[Symbol.asyncIterator].bind(this),
            this.controller,
          ).toReadableStream();
        }
      }
      function sG(e) {
        return JSON.stringify(e);
      }
      class sY extends sX {
        static fromReadableStream(e) {
          let t = new sY(null);
          return t._run(() => t._fromReadableStream(e)), t;
        }
        static runFunctions(e, t, s) {
          let r = new sY(null),
            n = {
              ...s,
              headers: {
                ...s?.headers,
                "X-Stainless-Helper-Method": "runFunctions",
              },
            };
          return r._run(() => r._runFunctions(e, t, n)), r;
        }
        static runTools(e, t, s) {
          let r = new sY(t),
            n = {
              ...s,
              headers: {
                ...s?.headers,
                "X-Stainless-Helper-Method": "runTools",
              },
            };
          return r._run(() => r._runTools(e, t, n)), r;
        }
      }
      class sQ extends tK {
        parse(e, t) {
          for (let t of e.tools ?? []) {
            if ("function" !== t.type)
              throw new $(
                `Currently only \`function\` tool types support auto-parsing; Received \`${t.type}\``,
              );
            if (!0 !== t.function.strict)
              throw new $(
                `The \`${t.function.name}\` tool is not marked with \`strict: true\`. Only strict function tools can be auto-parsed`,
              );
          }
          return this._client.chat.completions
            .create(e, {
              ...t,
              headers: {
                ...t?.headers,
                "X-Stainless-Helper-Method": "beta.chat.completions.parse",
              },
            })
            ._thenUnwrap((t) => sF(t, e));
        }
        runFunctions(e, t) {
          return e.stream
            ? sY.runFunctions(this._client, e, t)
            : sq.runFunctions(this._client, e, t);
        }
        runTools(e, t) {
          return e.stream
            ? sY.runTools(this._client, e, t)
            : sq.runTools(this._client, e, t);
        }
        stream(e, t) {
          return sX.createChatCompletion(this._client, e, t);
        }
      }
      class s0 extends tK {
        constructor() {
          super(...arguments), (this.completions = new sQ(this._client));
        }
      }
      (s0 || (s0 = {})).Completions = sQ;
      class s1 extends tK {
        create(e, t) {
          return this._client.post("/realtime/sessions", {
            body: e,
            ...t,
            headers: { "OpenAI-Beta": "assistants=v2", ...t?.headers },
          });
        }
      }
      class s2 extends tK {
        create(e, t) {
          return this._client.post("/realtime/transcription_sessions", {
            body: e,
            ...t,
            headers: { "OpenAI-Beta": "assistants=v2", ...t?.headers },
          });
        }
      }
      class s4 extends tK {
        constructor() {
          super(...arguments),
            (this.sessions = new s1(this._client)),
            (this.transcriptionSessions = new s2(this._client));
        }
      }
      (s4.Sessions = s1), (s4.TranscriptionSessions = s2);
      var s9 = function (e, t, s, r) {
          if ("a" === s && !r)
            throw TypeError("Private accessor was defined without a getter");
          if ("function" == typeof t ? e !== t || !r : !t.has(e))
            throw TypeError(
              "Cannot read private member from an object whose class did not declare it",
            );
          return "m" === s ? r : "a" === s ? r.call(e) : r ? r.value : t.get(e);
        },
        s3 = function (e, t, s, r, n) {
          if ("m" === r) throw TypeError("Private method is not writable");
          if ("a" === r && !n)
            throw TypeError("Private accessor was defined without a setter");
          if ("function" == typeof t ? e !== t || !n : !t.has(e))
            throw TypeError(
              "Cannot write private member to an object whose class did not declare it",
            );
          return "a" === r ? n.call(e, s) : n ? (n.value = s) : t.set(e, s), s;
        };
      class s5 extends sN {
        constructor() {
          super(...arguments),
            eS.add(this),
            eR.set(this, []),
            eE.set(this, {}),
            eC.set(this, {}),
            e$.set(this, void 0),
            eP.set(this, void 0),
            eI.set(this, void 0),
            eT.set(this, void 0),
            ej.set(this, void 0),
            eN.set(this, void 0),
            eL.set(this, void 0),
            eM.set(this, void 0),
            eF.set(this, void 0);
        }
        [((eR = new WeakMap()),
        (eE = new WeakMap()),
        (eC = new WeakMap()),
        (e$ = new WeakMap()),
        (eP = new WeakMap()),
        (eI = new WeakMap()),
        (eT = new WeakMap()),
        (ej = new WeakMap()),
        (eN = new WeakMap()),
        (eL = new WeakMap()),
        (eM = new WeakMap()),
        (eF = new WeakMap()),
        (eS = new WeakSet()),
        Symbol.asyncIterator)]() {
          let e = [],
            t = [],
            s = !1;
          return (
            this.on("event", (s) => {
              let r = t.shift();
              r ? r.resolve(s) : e.push(s);
            }),
            this.on("end", () => {
              for (let e of ((s = !0), t)) e.resolve(void 0);
              t.length = 0;
            }),
            this.on("abort", (e) => {
              for (let r of ((s = !0), t)) r.reject(e);
              t.length = 0;
            }),
            this.on("error", (e) => {
              for (let r of ((s = !0), t)) r.reject(e);
              t.length = 0;
            }),
            {
              next: async () =>
                e.length
                  ? { value: e.shift(), done: !1 }
                  : s
                    ? { value: void 0, done: !0 }
                    : new Promise((e, s) =>
                        t.push({ resolve: e, reject: s }),
                      ).then((e) =>
                        e
                          ? { value: e, done: !1 }
                          : { value: void 0, done: !0 },
                      ),
              return: async () => (this.abort(), { value: void 0, done: !0 }),
            }
          );
        }
        static fromReadableStream(e) {
          let t = new s5();
          return t._run(() => t._fromReadableStream(e)), t;
        }
        async _fromReadableStream(e, t) {
          let s = t?.signal;
          s &&
            (s.aborted && this.controller.abort(),
            s.addEventListener("abort", () => this.controller.abort())),
            this._connected();
          let r = e6.fromReadableStream(e, this.controller);
          for await (let e of r) s9(this, eS, "m", eD).call(this, e);
          if (r.controller.signal?.aborted) throw new I();
          return this._addRun(s9(this, eS, "m", eZ).call(this));
        }
        toReadableStream() {
          return new e6(
            this[Symbol.asyncIterator].bind(this),
            this.controller,
          ).toReadableStream();
        }
        static createToolAssistantStream(e, t, s, r, n) {
          let a = new s5();
          return (
            a._run(() =>
              a._runToolAssistantStream(e, t, s, r, {
                ...n,
                headers: {
                  ...n?.headers,
                  "X-Stainless-Helper-Method": "stream",
                },
              }),
            ),
            a
          );
        }
        async _createToolAssistantStream(e, t, s, r, n) {
          let a = n?.signal;
          a &&
            (a.aborted && this.controller.abort(),
            a.addEventListener("abort", () => this.controller.abort()));
          let i = { ...r, stream: !0 },
            o = await e.submitToolOutputs(t, s, i, {
              ...n,
              signal: this.controller.signal,
            });
          for await (let e of (this._connected(), o))
            s9(this, eS, "m", eD).call(this, e);
          if (o.controller.signal?.aborted) throw new I();
          return this._addRun(s9(this, eS, "m", eZ).call(this));
        }
        static createThreadAssistantStream(e, t, s) {
          let r = new s5();
          return (
            r._run(() =>
              r._threadAssistantStream(e, t, {
                ...s,
                headers: {
                  ...s?.headers,
                  "X-Stainless-Helper-Method": "stream",
                },
              }),
            ),
            r
          );
        }
        static createAssistantStream(e, t, s, r) {
          let n = new s5();
          return (
            n._run(() =>
              n._runAssistantStream(e, t, s, {
                ...r,
                headers: {
                  ...r?.headers,
                  "X-Stainless-Helper-Method": "stream",
                },
              }),
            ),
            n
          );
        }
        currentEvent() {
          return s9(this, eL, "f");
        }
        currentRun() {
          return s9(this, eM, "f");
        }
        currentMessageSnapshot() {
          return s9(this, e$, "f");
        }
        currentRunStepSnapshot() {
          return s9(this, eF, "f");
        }
        async finalRunSteps() {
          return await this.done(), Object.values(s9(this, eE, "f"));
        }
        async finalMessages() {
          return await this.done(), Object.values(s9(this, eC, "f"));
        }
        async finalRun() {
          if ((await this.done(), !s9(this, eP, "f")))
            throw Error("Final run was not received.");
          return s9(this, eP, "f");
        }
        async _createThreadAssistantStream(e, t, s) {
          let r = s?.signal;
          r &&
            (r.aborted && this.controller.abort(),
            r.addEventListener("abort", () => this.controller.abort()));
          let n = { ...t, stream: !0 },
            a = await e.createAndRun(n, {
              ...s,
              signal: this.controller.signal,
            });
          for await (let e of (this._connected(), a))
            s9(this, eS, "m", eD).call(this, e);
          if (a.controller.signal?.aborted) throw new I();
          return this._addRun(s9(this, eS, "m", eZ).call(this));
        }
        async _createAssistantStream(e, t, s, r) {
          let n = r?.signal;
          n &&
            (n.aborted && this.controller.abort(),
            n.addEventListener("abort", () => this.controller.abort()));
          let a = { ...s, stream: !0 },
            i = await e.create(t, a, { ...r, signal: this.controller.signal });
          for await (let e of (this._connected(), i))
            s9(this, eS, "m", eD).call(this, e);
          if (i.controller.signal?.aborted) throw new I();
          return this._addRun(s9(this, eS, "m", eZ).call(this));
        }
        static accumulateDelta(e, t) {
          for (let [s, r] of Object.entries(t)) {
            if (!e.hasOwnProperty(s)) {
              e[s] = r;
              continue;
            }
            let t = e[s];
            if (null == t || "index" === s || "type" === s) {
              e[s] = r;
              continue;
            }
            if ("string" == typeof t && "string" == typeof r) t += r;
            else if ("number" == typeof t && "number" == typeof r) t += r;
            else if (tJ(t) && tJ(r)) t = this.accumulateDelta(t, r);
            else if (Array.isArray(t) && Array.isArray(r)) {
              if (
                t.every((e) => "string" == typeof e || "number" == typeof e)
              ) {
                t.push(...r);
                continue;
              }
              for (let e of r) {
                if (!tJ(e))
                  throw Error(
                    `Expected array delta entry to be an object but got: ${e}`,
                  );
                let s = e.index;
                if (null == s)
                  throw (
                    (console.error(e),
                    Error(
                      "Expected array delta entry to have an `index` property",
                    ))
                  );
                if ("number" != typeof s)
                  throw Error(
                    `Expected array delta entry \`index\` property to be a number but got ${s}`,
                  );
                let r = t[s];
                null == r ? t.push(e) : (t[s] = this.accumulateDelta(r, e));
              }
              continue;
            } else
              throw Error(
                `Unhandled record type: ${s}, deltaValue: ${r}, accValue: ${t}`,
              );
            e[s] = t;
          }
          return e;
        }
        _addRun(e) {
          return e;
        }
        async _threadAssistantStream(e, t, s) {
          return await this._createThreadAssistantStream(t, e, s);
        }
        async _runAssistantStream(e, t, s, r) {
          return await this._createAssistantStream(t, e, s, r);
        }
        async _runToolAssistantStream(e, t, s, r, n) {
          return await this._createToolAssistantStream(s, e, t, r, n);
        }
      }
      (eD = function (e) {
        if (!this.ended)
          switch (
            (s3(this, eL, e, "f"), s9(this, eS, "m", eU).call(this, e), e.event)
          ) {
            case "thread.created":
              break;
            case "thread.run.created":
            case "thread.run.queued":
            case "thread.run.in_progress":
            case "thread.run.requires_action":
            case "thread.run.completed":
            case "thread.run.incomplete":
            case "thread.run.failed":
            case "thread.run.cancelling":
            case "thread.run.cancelled":
            case "thread.run.expired":
              s9(this, eS, "m", eV).call(this, e);
              break;
            case "thread.run.step.created":
            case "thread.run.step.in_progress":
            case "thread.run.step.delta":
            case "thread.run.step.completed":
            case "thread.run.step.failed":
            case "thread.run.step.cancelled":
            case "thread.run.step.expired":
              s9(this, eS, "m", eq).call(this, e);
              break;
            case "thread.message.created":
            case "thread.message.in_progress":
            case "thread.message.delta":
            case "thread.message.completed":
            case "thread.message.incomplete":
              s9(this, eS, "m", eB).call(this, e);
              break;
            case "error":
              throw Error(
                "Encountered an error event in event processing - errors should be processed earlier",
              );
          }
      }),
        (eZ = function () {
          if (this.ended)
            throw new $("stream has ended, this shouldn't happen");
          if (!s9(this, eP, "f"))
            throw Error("Final run has not been received");
          return s9(this, eP, "f");
        }),
        (eB = function (e) {
          let [t, s] = s9(this, eS, "m", eW).call(this, e, s9(this, e$, "f"));
          for (let e of (s3(this, e$, t, "f"),
          (s9(this, eC, "f")[t.id] = t),
          s)) {
            let s = t.content[e.index];
            s?.type == "text" && this._emit("textCreated", s.text);
          }
          switch (e.event) {
            case "thread.message.created":
              this._emit("messageCreated", e.data);
              break;
            case "thread.message.in_progress":
              break;
            case "thread.message.delta":
              if (
                (this._emit("messageDelta", e.data.delta, t),
                e.data.delta.content)
              )
                for (let s of e.data.delta.content) {
                  if ("text" == s.type && s.text) {
                    let e = s.text,
                      r = t.content[s.index];
                    if (r && "text" == r.type)
                      this._emit("textDelta", e, r.text);
                    else
                      throw Error(
                        "The snapshot associated with this text delta is not text or missing",
                      );
                  }
                  if (s.index != s9(this, eI, "f")) {
                    if (s9(this, eT, "f"))
                      switch (s9(this, eT, "f").type) {
                        case "text":
                          this._emit(
                            "textDone",
                            s9(this, eT, "f").text,
                            s9(this, e$, "f"),
                          );
                          break;
                        case "image_file":
                          this._emit(
                            "imageFileDone",
                            s9(this, eT, "f").image_file,
                            s9(this, e$, "f"),
                          );
                      }
                    s3(this, eI, s.index, "f");
                  }
                  s3(this, eT, t.content[s.index], "f");
                }
              break;
            case "thread.message.completed":
            case "thread.message.incomplete":
              if (void 0 !== s9(this, eI, "f")) {
                let t = e.data.content[s9(this, eI, "f")];
                if (t)
                  switch (t.type) {
                    case "image_file":
                      this._emit(
                        "imageFileDone",
                        t.image_file,
                        s9(this, e$, "f"),
                      );
                      break;
                    case "text":
                      this._emit("textDone", t.text, s9(this, e$, "f"));
                  }
              }
              s9(this, e$, "f") && this._emit("messageDone", e.data),
                s3(this, e$, void 0, "f");
          }
        }),
        (eq = function (e) {
          let t = s9(this, eS, "m", eH).call(this, e);
          switch ((s3(this, eF, t, "f"), e.event)) {
            case "thread.run.step.created":
              this._emit("runStepCreated", e.data);
              break;
            case "thread.run.step.delta":
              let s = e.data.delta;
              if (
                s.step_details &&
                "tool_calls" == s.step_details.type &&
                s.step_details.tool_calls &&
                "tool_calls" == t.step_details.type
              )
                for (let e of s.step_details.tool_calls)
                  e.index == s9(this, ej, "f")
                    ? this._emit(
                        "toolCallDelta",
                        e,
                        t.step_details.tool_calls[e.index],
                      )
                    : (s9(this, eN, "f") &&
                        this._emit("toolCallDone", s9(this, eN, "f")),
                      s3(this, ej, e.index, "f"),
                      s3(this, eN, t.step_details.tool_calls[e.index], "f"),
                      s9(this, eN, "f") &&
                        this._emit("toolCallCreated", s9(this, eN, "f")));
              this._emit("runStepDelta", e.data.delta, t);
              break;
            case "thread.run.step.completed":
            case "thread.run.step.failed":
            case "thread.run.step.cancelled":
            case "thread.run.step.expired":
              s3(this, eF, void 0, "f"),
                "tool_calls" == e.data.step_details.type &&
                  s9(this, eN, "f") &&
                  (this._emit("toolCallDone", s9(this, eN, "f")),
                  s3(this, eN, void 0, "f")),
                this._emit("runStepDone", e.data, t);
          }
        }),
        (eU = function (e) {
          s9(this, eR, "f").push(e), this._emit("event", e);
        }),
        (eH = function (e) {
          switch (e.event) {
            case "thread.run.step.created":
              return (s9(this, eE, "f")[e.data.id] = e.data), e.data;
            case "thread.run.step.delta":
              let t = s9(this, eE, "f")[e.data.id];
              if (!t)
                throw Error(
                  "Received a RunStepDelta before creation of a snapshot",
                );
              let s = e.data;
              if (s.delta) {
                let r = s5.accumulateDelta(t, s.delta);
                s9(this, eE, "f")[e.data.id] = r;
              }
              return s9(this, eE, "f")[e.data.id];
            case "thread.run.step.completed":
            case "thread.run.step.failed":
            case "thread.run.step.cancelled":
            case "thread.run.step.expired":
            case "thread.run.step.in_progress":
              s9(this, eE, "f")[e.data.id] = e.data;
          }
          if (s9(this, eE, "f")[e.data.id]) return s9(this, eE, "f")[e.data.id];
          throw Error("No snapshot available");
        }),
        (eW = function (e, t) {
          let s = [];
          switch (e.event) {
            case "thread.message.created":
              return [e.data, s];
            case "thread.message.delta":
              if (!t)
                throw Error(
                  "Received a delta with no existing snapshot (there should be one from message creation)",
                );
              let r = e.data;
              if (r.delta.content)
                for (let e of r.delta.content)
                  if (e.index in t.content) {
                    let s = t.content[e.index];
                    t.content[e.index] = s9(this, eS, "m", ez).call(this, e, s);
                  } else (t.content[e.index] = e), s.push(e);
              return [t, s];
            case "thread.message.in_progress":
            case "thread.message.completed":
            case "thread.message.incomplete":
              if (t) return [t, s];
              throw Error(
                "Received thread message event with no existing snapshot",
              );
          }
          throw Error("Tried to accumulate a non-message event");
        }),
        (ez = function (e, t) {
          return s5.accumulateDelta(t, e);
        }),
        (eV = function (e) {
          switch ((s3(this, eM, e.data, "f"), e.event)) {
            case "thread.run.created":
            case "thread.run.queued":
            case "thread.run.in_progress":
              break;
            case "thread.run.requires_action":
            case "thread.run.cancelled":
            case "thread.run.failed":
            case "thread.run.completed":
            case "thread.run.expired":
              s3(this, eP, e.data, "f"),
                s9(this, eN, "f") &&
                  (this._emit("toolCallDone", s9(this, eN, "f")),
                  s3(this, eN, void 0, "f"));
          }
        });
      class s6 extends tK {
        create(e, t, s) {
          return this._client.post(`/threads/${e}/messages`, {
            body: t,
            ...s,
            headers: { "OpenAI-Beta": "assistants=v2", ...s?.headers },
          });
        }
        retrieve(e, t, s) {
          return this._client.get(`/threads/${e}/messages/${t}`, {
            ...s,
            headers: { "OpenAI-Beta": "assistants=v2", ...s?.headers },
          });
        }
        update(e, t, s, r) {
          return this._client.post(`/threads/${e}/messages/${t}`, {
            body: s,
            ...r,
            headers: { "OpenAI-Beta": "assistants=v2", ...r?.headers },
          });
        }
        list(e, t = {}, s) {
          return tS(t)
            ? this.list(e, {}, t)
            : this._client.getAPIList(`/threads/${e}/messages`, s8, {
                query: t,
                ...s,
                headers: { "OpenAI-Beta": "assistants=v2", ...s?.headers },
              });
        }
        del(e, t, s) {
          return this._client.delete(`/threads/${e}/messages/${t}`, {
            ...s,
            headers: { "OpenAI-Beta": "assistants=v2", ...s?.headers },
          });
        }
      }
      class s8 extends tQ {}
      s6.MessagesPage = s8;
      class s7 extends tK {
        retrieve(e, t, s, r = {}, n) {
          return tS(r)
            ? this.retrieve(e, t, s, {}, r)
            : this._client.get(`/threads/${e}/runs/${t}/steps/${s}`, {
                query: r,
                ...n,
                headers: { "OpenAI-Beta": "assistants=v2", ...n?.headers },
              });
        }
        list(e, t, s = {}, r) {
          return tS(s)
            ? this.list(e, t, {}, s)
            : this._client.getAPIList(`/threads/${e}/runs/${t}/steps`, re, {
                query: s,
                ...r,
                headers: { "OpenAI-Beta": "assistants=v2", ...r?.headers },
              });
        }
      }
      class re extends tQ {}
      s7.RunStepsPage = re;
      class rt extends tK {
        constructor() {
          super(...arguments), (this.steps = new s7(this._client));
        }
        create(e, t, s) {
          let { include: r, ...n } = t;
          return this._client.post(`/threads/${e}/runs`, {
            query: { include: r },
            body: n,
            ...s,
            headers: { "OpenAI-Beta": "assistants=v2", ...s?.headers },
            stream: t.stream ?? !1,
          });
        }
        retrieve(e, t, s) {
          return this._client.get(`/threads/${e}/runs/${t}`, {
            ...s,
            headers: { "OpenAI-Beta": "assistants=v2", ...s?.headers },
          });
        }
        update(e, t, s, r) {
          return this._client.post(`/threads/${e}/runs/${t}`, {
            body: s,
            ...r,
            headers: { "OpenAI-Beta": "assistants=v2", ...r?.headers },
          });
        }
        list(e, t = {}, s) {
          return tS(t)
            ? this.list(e, {}, t)
            : this._client.getAPIList(`/threads/${e}/runs`, rs, {
                query: t,
                ...s,
                headers: { "OpenAI-Beta": "assistants=v2", ...s?.headers },
              });
        }
        cancel(e, t, s) {
          return this._client.post(`/threads/${e}/runs/${t}/cancel`, {
            ...s,
            headers: { "OpenAI-Beta": "assistants=v2", ...s?.headers },
          });
        }
        async createAndPoll(e, t, s) {
          let r = await this.create(e, t, s);
          return await this.poll(e, r.id, s);
        }
        createAndStream(e, t, s) {
          return s5.createAssistantStream(
            e,
            this._client.beta.threads.runs,
            t,
            s,
          );
        }
        async poll(e, t, s) {
          let r = { ...s?.headers, "X-Stainless-Poll-Helper": "true" };
          for (
            s?.pollIntervalMs &&
            (r["X-Stainless-Custom-Poll-Interval"] =
              s.pollIntervalMs.toString());
            ;

          ) {
            let { data: n, response: a } = await this.retrieve(e, t, {
              ...s,
              headers: { ...s?.headers, ...r },
            }).withResponse();
            switch (n.status) {
              case "queued":
              case "in_progress":
              case "cancelling":
                let i = 5e3;
                if (s?.pollIntervalMs) i = s.pollIntervalMs;
                else {
                  let e = a.headers.get("openai-poll-after-ms");
                  if (e) {
                    let t = parseInt(e);
                    isNaN(t) || (i = t);
                  }
                }
                await tj(i);
                break;
              case "requires_action":
              case "incomplete":
              case "cancelled":
              case "completed":
              case "failed":
              case "expired":
                return n;
            }
          }
        }
        stream(e, t, s) {
          return s5.createAssistantStream(
            e,
            this._client.beta.threads.runs,
            t,
            s,
          );
        }
        submitToolOutputs(e, t, s, r) {
          return this._client.post(
            `/threads/${e}/runs/${t}/submit_tool_outputs`,
            {
              body: s,
              ...r,
              headers: { "OpenAI-Beta": "assistants=v2", ...r?.headers },
              stream: s.stream ?? !1,
            },
          );
        }
        async submitToolOutputsAndPoll(e, t, s, r) {
          let n = await this.submitToolOutputs(e, t, s, r);
          return await this.poll(e, n.id, r);
        }
        submitToolOutputsStream(e, t, s, r) {
          return s5.createToolAssistantStream(
            e,
            t,
            this._client.beta.threads.runs,
            s,
            r,
          );
        }
      }
      class rs extends tQ {}
      (rt.RunsPage = rs), (rt.Steps = s7), (rt.RunStepsPage = re);
      class rr extends tK {
        constructor() {
          super(...arguments),
            (this.runs = new rt(this._client)),
            (this.messages = new s6(this._client));
        }
        create(e = {}, t) {
          return tS(e)
            ? this.create({}, e)
            : this._client.post("/threads", {
                body: e,
                ...t,
                headers: { "OpenAI-Beta": "assistants=v2", ...t?.headers },
              });
        }
        retrieve(e, t) {
          return this._client.get(`/threads/${e}`, {
            ...t,
            headers: { "OpenAI-Beta": "assistants=v2", ...t?.headers },
          });
        }
        update(e, t, s) {
          return this._client.post(`/threads/${e}`, {
            body: t,
            ...s,
            headers: { "OpenAI-Beta": "assistants=v2", ...s?.headers },
          });
        }
        del(e, t) {
          return this._client.delete(`/threads/${e}`, {
            ...t,
            headers: { "OpenAI-Beta": "assistants=v2", ...t?.headers },
          });
        }
        createAndRun(e, t) {
          return this._client.post("/threads/runs", {
            body: e,
            ...t,
            headers: { "OpenAI-Beta": "assistants=v2", ...t?.headers },
            stream: e.stream ?? !1,
          });
        }
        async createAndRunPoll(e, t) {
          let s = await this.createAndRun(e, t);
          return await this.runs.poll(s.thread_id, s.id, t);
        }
        createAndRunStream(e, t) {
          return s5.createThreadAssistantStream(
            e,
            this._client.beta.threads,
            t,
          );
        }
      }
      (rr.Runs = rt),
        (rr.RunsPage = rs),
        (rr.Messages = s6),
        (rr.MessagesPage = s8);
      class rn extends tK {
        constructor() {
          super(...arguments),
            (this.realtime = new s4(this._client)),
            (this.chat = new s0(this._client)),
            (this.assistants = new sR(this._client)),
            (this.threads = new rr(this._client));
        }
      }
      (rn.Realtime = s4),
        (rn.Assistants = sR),
        (rn.AssistantsPage = sE),
        (rn.Threads = rr);
      class ra extends tK {
        create(e, t) {
          return this._client.post("/batches", { body: e, ...t });
        }
        retrieve(e, t) {
          return this._client.get(`/batches/${e}`, t);
        }
        list(e = {}, t) {
          return tS(e)
            ? this.list({}, e)
            : this._client.getAPIList("/batches", ri, { query: e, ...t });
        }
        cancel(e, t) {
          return this._client.post(`/batches/${e}/cancel`, t);
        }
      }
      class ri extends tQ {}
      ra.BatchesPage = ri;
      class ro extends tK {
        create(e, t, s) {
          return this._client.post(
            `/uploads/${e}/parts`,
            td({ body: t, ...s }),
          );
        }
      }
      class rl extends tK {
        constructor() {
          super(...arguments), (this.parts = new ro(this._client));
        }
        create(e, t) {
          return this._client.post("/uploads", { body: e, ...t });
        }
        cancel(e, t) {
          return this._client.post(`/uploads/${e}/cancel`, t);
        }
        complete(e, t, s) {
          return this._client.post(`/uploads/${e}/complete`, { body: t, ...s });
        }
      }
      function rc(e, t) {
        let s = e.output.map((e) => {
            if ("function_call" === e.type)
              return {
                ...e,
                parsed_arguments: (function (e, t) {
                  let s = (function (e, t) {
                    return e.find((e) => "function" === e.type && e.name === t);
                  })(e.tools ?? [], t.name);
                  return {
                    ...t,
                    ...t,
                    parsed_arguments: (function (e) {
                      return e?.$brand === "auto-parseable-tool";
                    })(s)
                      ? s.$parseRaw(t.arguments)
                      : s?.strict
                        ? JSON.parse(t.arguments)
                        : null,
                  };
                })(t, e),
              };
            if ("message" === e.type) {
              let s = e.content.map((e) => {
                var s, r;
                return "output_text" === e.type
                  ? {
                      ...e,
                      parsed:
                        ((s = t),
                        (r = e.text),
                        s.text?.format?.type !== "json_schema"
                          ? null
                          : "$parseRaw" in s.text?.format
                            ? (s.text?.format).$parseRaw(r)
                            : JSON.parse(r)),
                    }
                  : e;
              });
              return { ...e, content: s };
            }
            return e;
          }),
          r = Object.assign({}, e, { output: s });
        return (
          Object.getOwnPropertyDescriptor(e, "output_text") || ru(r),
          Object.defineProperty(r, "output_parsed", {
            enumerable: !0,
            get() {
              for (let e of r.output)
                if ("message" === e.type) {
                  for (let t of e.content)
                    if ("output_text" === t.type && null !== t.parsed)
                      return t.parsed;
                }
              return null;
            },
          }),
          r
        );
      }
      rl.Parts = ro;
      function ru(e) {
        let t = [];
        for (let s of e.output)
          if ("message" === s.type)
            for (let e of s.content) "output_text" === e.type && t.push(e.text);
        e.output_text = t.join("");
      }
      class rd extends tK {
        list(e, t = {}, s) {
          return tS(t)
            ? this.list(e, {}, t)
            : this._client.getAPIList(`/responses/${e}/input_items`, rg, {
                query: t,
                ...s,
              });
        }
      }
      var rh = function (e, t, s, r, n) {
          if ("m" === r) throw TypeError("Private method is not writable");
          if ("a" === r && !n)
            throw TypeError("Private accessor was defined without a setter");
          if ("function" == typeof t ? e !== t || !n : !t.has(e))
            throw TypeError(
              "Cannot write private member to an object whose class did not declare it",
            );
          return "a" === r ? n.call(e, s) : n ? (n.value = s) : t.set(e, s), s;
        },
        rp = function (e, t, s, r) {
          if ("a" === s && !r)
            throw TypeError("Private accessor was defined without a getter");
          if ("function" == typeof t ? e !== t || !r : !t.has(e))
            throw TypeError(
              "Cannot read private member from an object whose class did not declare it",
            );
          return "m" === s ? r : "a" === s ? r.call(e) : r ? r.value : t.get(e);
        };
      class rf extends sN {
        constructor(e) {
          super(),
            eJ.add(this),
            eK.set(this, void 0),
            eX.set(this, void 0),
            eG.set(this, void 0),
            rh(this, eK, e, "f");
        }
        static createResponse(e, t, s) {
          let r = new rf(t);
          return (
            r._run(() =>
              r._createOrRetrieveResponse(e, t, {
                ...s,
                headers: {
                  ...s?.headers,
                  "X-Stainless-Helper-Method": "stream",
                },
              }),
            ),
            r
          );
        }
        async _createOrRetrieveResponse(e, t, s) {
          let r,
            n = s?.signal;
          n &&
            (n.aborted && this.controller.abort(),
            n.addEventListener("abort", () => this.controller.abort())),
            rp(this, eJ, "m", eY).call(this);
          let a = null;
          for await (let n of ("response_id" in t
            ? ((r = await e.responses.retrieve(
                t.response_id,
                { stream: !0 },
                { ...s, signal: this.controller.signal, stream: !0 },
              )),
              (a = t.starting_after ?? null))
            : (r = await e.responses.create(
                { ...t, stream: !0 },
                { ...s, signal: this.controller.signal },
              )),
          this._connected(),
          r))
            rp(this, eJ, "m", eQ).call(this, n, a);
          if (r.controller.signal?.aborted) throw new I();
          return rp(this, eJ, "m", e0).call(this);
        }
        [((eK = new WeakMap()),
        (eX = new WeakMap()),
        (eG = new WeakMap()),
        (eJ = new WeakSet()),
        (eY = function () {
          this.ended || rh(this, eX, void 0, "f");
        }),
        (eQ = function (e, t) {
          if (this.ended) return;
          let s = (e, s) => {
              (null == t || s.sequence_number > t) && this._emit(e, s);
            },
            r = rp(this, eJ, "m", e1).call(this, e);
          switch ((s("event", e), e.type)) {
            case "response.output_text.delta": {
              let t = r.output[e.output_index];
              if (!t) throw new $(`missing output at index ${e.output_index}`);
              if ("message" === t.type) {
                let r = t.content[e.content_index];
                if (!r)
                  throw new $(`missing content at index ${e.content_index}`);
                if ("output_text" !== r.type)
                  throw new $(
                    `expected content to be 'output_text', got ${r.type}`,
                  );
                s("response.output_text.delta", { ...e, snapshot: r.text });
              }
              break;
            }
            case "response.function_call_arguments.delta": {
              let t = r.output[e.output_index];
              if (!t) throw new $(`missing output at index ${e.output_index}`);
              "function_call" === t.type &&
                s("response.function_call_arguments.delta", {
                  ...e,
                  snapshot: t.arguments,
                });
              break;
            }
            default:
              s(e.type, e);
          }
        }),
        (e0 = function () {
          if (this.ended)
            throw new $("stream has ended, this shouldn't happen");
          let e = rp(this, eX, "f");
          if (!e) throw new $("request ended without sending any events");
          rh(this, eX, void 0, "f");
          let t = (function (e, t) {
            var s;
            return t && ((s = t), sL(s.text?.format))
              ? rc(e, t)
              : {
                  ...e,
                  output_parsed: null,
                  output: e.output.map((e) =>
                    "function_call" === e.type
                      ? { ...e, parsed_arguments: null }
                      : "message" === e.type
                        ? {
                            ...e,
                            content: e.content.map((e) => ({
                              ...e,
                              parsed: null,
                            })),
                          }
                        : e,
                  ),
                };
          })(e, rp(this, eK, "f"));
          return rh(this, eG, t, "f"), t;
        }),
        (e1 = function (e) {
          let t = rp(this, eX, "f");
          if (!t) {
            if ("response.created" !== e.type)
              throw new $(
                `When snapshot hasn't been set yet, expected 'response.created' event, got ${e.type}`,
              );
            return rh(this, eX, e.response, "f");
          }
          switch (e.type) {
            case "response.output_item.added":
              t.output.push(e.item);
              break;
            case "response.content_part.added": {
              let s = t.output[e.output_index];
              if (!s) throw new $(`missing output at index ${e.output_index}`);
              "message" === s.type && s.content.push(e.part);
              break;
            }
            case "response.output_text.delta": {
              let s = t.output[e.output_index];
              if (!s) throw new $(`missing output at index ${e.output_index}`);
              if ("message" === s.type) {
                let t = s.content[e.content_index];
                if (!t)
                  throw new $(`missing content at index ${e.content_index}`);
                if ("output_text" !== t.type)
                  throw new $(
                    `expected content to be 'output_text', got ${t.type}`,
                  );
                t.text += e.delta;
              }
              break;
            }
            case "response.function_call_arguments.delta": {
              let s = t.output[e.output_index];
              if (!s) throw new $(`missing output at index ${e.output_index}`);
              "function_call" === s.type && (s.arguments += e.delta);
              break;
            }
            case "response.completed":
              rh(this, eX, e.response, "f");
          }
          return t;
        }),
        Symbol.asyncIterator)]() {
          let e = [],
            t = [],
            s = !1;
          return (
            this.on("event", (s) => {
              let r = t.shift();
              r ? r.resolve(s) : e.push(s);
            }),
            this.on("end", () => {
              for (let e of ((s = !0), t)) e.resolve(void 0);
              t.length = 0;
            }),
            this.on("abort", (e) => {
              for (let r of ((s = !0), t)) r.reject(e);
              t.length = 0;
            }),
            this.on("error", (e) => {
              for (let r of ((s = !0), t)) r.reject(e);
              t.length = 0;
            }),
            {
              next: async () =>
                e.length
                  ? { value: e.shift(), done: !1 }
                  : s
                    ? { value: void 0, done: !0 }
                    : new Promise((e, s) =>
                        t.push({ resolve: e, reject: s }),
                      ).then((e) =>
                        e
                          ? { value: e, done: !1 }
                          : { value: void 0, done: !0 },
                      ),
              return: async () => (this.abort(), { value: void 0, done: !0 }),
            }
          );
        }
        async finalResponse() {
          await this.done();
          let e = rp(this, eG, "f");
          if (!e)
            throw new $("stream ended without producing a ChatCompletion");
          return e;
        }
      }
      class rm extends tK {
        constructor() {
          super(...arguments), (this.inputItems = new rd(this._client));
        }
        create(e, t) {
          return this._client
            .post("/responses", { body: e, ...t, stream: e.stream ?? !1 })
            ._thenUnwrap(
              (e) => ("object" in e && "response" === e.object && ru(e), e),
            );
        }
        retrieve(e, t = {}, s) {
          return this._client.get(`/responses/${e}`, {
            query: t,
            ...s,
            stream: t?.stream ?? !1,
          });
        }
        del(e, t) {
          return this._client.delete(`/responses/${e}`, {
            ...t,
            headers: { Accept: "*/*", ...t?.headers },
          });
        }
        parse(e, t) {
          return this._client.responses
            .create(e, t)
            ._thenUnwrap((t) => rc(t, e));
        }
        stream(e, t) {
          return rf.createResponse(this._client, e, t);
        }
        cancel(e, t) {
          return this._client.post(`/responses/${e}/cancel`, {
            ...t,
            headers: { Accept: "*/*", ...t?.headers },
          });
        }
      }
      class rg extends tQ {}
      rm.InputItems = rd;
      class ry extends tK {
        retrieve(e, t, s, r) {
          return this._client.get(`/evals/${e}/runs/${t}/output_items/${s}`, r);
        }
        list(e, t, s = {}, r) {
          return tS(s)
            ? this.list(e, t, {}, s)
            : this._client.getAPIList(
                `/evals/${e}/runs/${t}/output_items`,
                r_,
                { query: s, ...r },
              );
        }
      }
      class r_ extends tQ {}
      ry.OutputItemListResponsesPage = r_;
      class rv extends tK {
        constructor() {
          super(...arguments), (this.outputItems = new ry(this._client));
        }
        create(e, t, s) {
          return this._client.post(`/evals/${e}/runs`, { body: t, ...s });
        }
        retrieve(e, t, s) {
          return this._client.get(`/evals/${e}/runs/${t}`, s);
        }
        list(e, t = {}, s) {
          return tS(t)
            ? this.list(e, {}, t)
            : this._client.getAPIList(`/evals/${e}/runs`, rw, {
                query: t,
                ...s,
              });
        }
        del(e, t, s) {
          return this._client.delete(`/evals/${e}/runs/${t}`, s);
        }
        cancel(e, t, s) {
          return this._client.post(`/evals/${e}/runs/${t}`, s);
        }
      }
      class rw extends tQ {}
      (rv.RunListResponsesPage = rw),
        (rv.OutputItems = ry),
        (rv.OutputItemListResponsesPage = r_);
      class rb extends tK {
        constructor() {
          super(...arguments), (this.runs = new rv(this._client));
        }
        create(e, t) {
          return this._client.post("/evals", { body: e, ...t });
        }
        retrieve(e, t) {
          return this._client.get(`/evals/${e}`, t);
        }
        update(e, t, s) {
          return this._client.post(`/evals/${e}`, { body: t, ...s });
        }
        list(e = {}, t) {
          return tS(e)
            ? this.list({}, e)
            : this._client.getAPIList("/evals", rx, { query: e, ...t });
        }
        del(e, t) {
          return this._client.delete(`/evals/${e}`, t);
        }
      }
      class rx extends tQ {}
      (rb.EvalListResponsesPage = rx),
        (rb.Runs = rv),
        (rb.RunListResponsesPage = rw);
      class rk extends tK {
        retrieve(e, t, s) {
          return this._client.get(`/containers/${e}/files/${t}/content`, {
            ...s,
            headers: { Accept: "application/binary", ...s?.headers },
            __binaryResponse: !0,
          });
        }
      }
      class rA extends tK {
        constructor() {
          super(...arguments), (this.content = new rk(this._client));
        }
        create(e, t, s) {
          return this._client.post(
            `/containers/${e}/files`,
            td({ body: t, ...s }),
          );
        }
        retrieve(e, t, s) {
          return this._client.get(`/containers/${e}/files/${t}`, s);
        }
        list(e, t = {}, s) {
          return tS(t)
            ? this.list(e, {}, t)
            : this._client.getAPIList(`/containers/${e}/files`, rO, {
                query: t,
                ...s,
              });
        }
        del(e, t, s) {
          return this._client.delete(`/containers/${e}/files/${t}`, {
            ...s,
            headers: { Accept: "*/*", ...s?.headers },
          });
        }
      }
      class rO extends tQ {}
      (rA.FileListResponsesPage = rO), (rA.Content = rk);
      class rS extends tK {
        constructor() {
          super(...arguments), (this.files = new rA(this._client));
        }
        create(e, t) {
          return this._client.post("/containers", { body: e, ...t });
        }
        retrieve(e, t) {
          return this._client.get(`/containers/${e}`, t);
        }
        list(e = {}, t) {
          return tS(e)
            ? this.list({}, e)
            : this._client.getAPIList("/containers", rR, { query: e, ...t });
        }
        del(e, t) {
          return this._client.delete(`/containers/${e}`, {
            ...t,
            headers: { Accept: "*/*", ...t?.headers },
          });
        }
      }
      class rR extends tQ {}
      (rS.ContainerListResponsesPage = rR),
        (rS.Files = rA),
        (rS.FileListResponsesPage = rO);
      class rE extends tb {
        constructor({
          baseURL: e = tM("OPENAI_BASE_URL"),
          apiKey: t = tM("OPENAI_API_KEY"),
          organization: s = tM("OPENAI_ORG_ID") ?? null,
          project: r = tM("OPENAI_PROJECT_ID") ?? null,
          ...n
        } = {}) {
          if (void 0 === t)
            throw new $(
              "The OPENAI_API_KEY environment variable is missing or empty; either provide it, or instantiate the OpenAI client with an apiKey option, like new OpenAI({ apiKey: 'My API Key' }).",
            );
          let a = {
            apiKey: t,
            organization: s,
            project: r,
            ...n,
            baseURL: e || "https://api.openai.com/v1",
          };
          if (!a.dangerouslyAllowBrowser && tH())
            throw new $(
              "It looks like you're running in a browser-like environment.\n\nThis is disabled by default, as it risks exposing your secret API credentials to attackers.\nIf you understand the risks and have appropriate mitigations in place,\nyou can set the `dangerouslyAllowBrowser` option to `true`, e.g.,\n\nnew OpenAI({ apiKey, dangerouslyAllowBrowser: true });\n\nhttps://help.openai.com/en/articles/5112595-best-practices-for-api-key-safety\n",
            );
          super({
            baseURL: a.baseURL,
            timeout: a.timeout ?? 6e5,
            httpAgent: a.httpAgent,
            maxRetries: a.maxRetries,
            fetch: a.fetch,
          }),
            (this.completions = new tX(this)),
            (this.chat = new t4(this)),
            (this.embeddings = new t9(this)),
            (this.files = new t3(this)),
            (this.images = new t6(this)),
            (this.audio = new st(this)),
            (this.moderations = new ss(this)),
            (this.models = new sr(this)),
            (this.fineTuning = new sg(this)),
            (this.graders = new s_(this)),
            (this.vectorStores = new sA(this)),
            (this.beta = new rn(this)),
            (this.batches = new ra(this)),
            (this.uploads = new rl(this)),
            (this.responses = new rm(this)),
            (this.evals = new rb(this)),
            (this.containers = new rS(this)),
            (this._options = a),
            (this.apiKey = t),
            (this.organization = s),
            (this.project = r);
        }
        defaultQuery() {
          return this._options.defaultQuery;
        }
        defaultHeaders(e) {
          return {
            ...super.defaultHeaders(e),
            "OpenAI-Organization": this.organization,
            "OpenAI-Project": this.project,
            ...this._options.defaultHeaders,
          };
        }
        authHeaders(e) {
          return { Authorization: `Bearer ${this.apiKey}` };
        }
        stringifyQuery(e) {
          return (function (e, t = {}) {
            let s,
              r,
              n = e,
              a = (function (e = A) {
                let t;
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
                let s = e.charset || A.charset;
                if (
                  void 0 !== e.charset &&
                  "utf-8" !== e.charset &&
                  "iso-8859-1" !== e.charset
                )
                  throw TypeError(
                    "The charset option must be either utf-8, iso-8859-1, or undefined",
                  );
                let r = p;
                if (void 0 !== e.format) {
                  if (!_.call(f, e.format))
                    throw TypeError("Unknown format option provided.");
                  r = e.format;
                }
                let n = f[r],
                  a = A.filter;
                if (
                  (("function" == typeof e.filter || w(e.filter)) &&
                    (a = e.filter),
                  (t =
                    e.arrayFormat && e.arrayFormat in v
                      ? e.arrayFormat
                      : "indices" in e
                        ? e.indices
                          ? "indices"
                          : "repeat"
                        : A.arrayFormat),
                  "commaRoundTrip" in e && "boolean" != typeof e.commaRoundTrip)
                )
                  throw TypeError(
                    "`commaRoundTrip` must be a boolean, or absent",
                  );
                let i =
                  void 0 === e.allowDots
                    ? !0 == !!e.encodeDotInKeys || A.allowDots
                    : !!e.allowDots;
                return {
                  addQueryPrefix:
                    "boolean" == typeof e.addQueryPrefix
                      ? e.addQueryPrefix
                      : A.addQueryPrefix,
                  allowDots: i,
                  allowEmptyArrays:
                    "boolean" == typeof e.allowEmptyArrays
                      ? !!e.allowEmptyArrays
                      : A.allowEmptyArrays,
                  arrayFormat: t,
                  charset: s,
                  charsetSentinel:
                    "boolean" == typeof e.charsetSentinel
                      ? e.charsetSentinel
                      : A.charsetSentinel,
                  commaRoundTrip: !!e.commaRoundTrip,
                  delimiter: void 0 === e.delimiter ? A.delimiter : e.delimiter,
                  encode: "boolean" == typeof e.encode ? e.encode : A.encode,
                  encodeDotInKeys:
                    "boolean" == typeof e.encodeDotInKeys
                      ? e.encodeDotInKeys
                      : A.encodeDotInKeys,
                  encoder:
                    "function" == typeof e.encoder ? e.encoder : A.encoder,
                  encodeValuesOnly:
                    "boolean" == typeof e.encodeValuesOnly
                      ? e.encodeValuesOnly
                      : A.encodeValuesOnly,
                  filter: a,
                  format: r,
                  formatter: n,
                  serializeDate:
                    "function" == typeof e.serializeDate
                      ? e.serializeDate
                      : A.serializeDate,
                  skipNulls:
                    "boolean" == typeof e.skipNulls ? e.skipNulls : A.skipNulls,
                  sort: "function" == typeof e.sort ? e.sort : null,
                  strictNullHandling:
                    "boolean" == typeof e.strictNullHandling
                      ? e.strictNullHandling
                      : A.strictNullHandling,
                };
              })(t);
            "function" == typeof a.filter
              ? (n = (0, a.filter)("", n))
              : w(a.filter) && (s = a.filter);
            let i = [];
            if ("object" != typeof n || null === n) return "";
            let o = v[a.arrayFormat],
              l = "comma" === o && a.commaRoundTrip;
            s || (s = Object.keys(n)), a.sort && s.sort(a.sort);
            let c = new WeakMap();
            for (let e = 0; e < s.length; ++e) {
              let t = s[e];
              (a.skipNulls && null === n[t]) ||
                x(
                  i,
                  (function e(
                    t,
                    s,
                    r,
                    n,
                    a,
                    i,
                    o,
                    l,
                    c,
                    u,
                    d,
                    h,
                    p,
                    f,
                    m,
                    g,
                    _,
                    v,
                  ) {
                    var b, k;
                    let S,
                      R = t,
                      E = v,
                      C = 0,
                      $ = !1;
                    for (; void 0 !== (E = E.get(O)) && !$; ) {
                      let e = E.get(t);
                      if (((C += 1), void 0 !== e))
                        if (e === C) throw RangeError("Cyclic object value");
                        else $ = !0;
                      void 0 === E.get(O) && (C = 0);
                    }
                    if (
                      ("function" == typeof u
                        ? (R = u(s, R))
                        : R instanceof Date
                          ? (R = p?.(R))
                          : "comma" === r &&
                            w(R) &&
                            (R = y(R, function (e) {
                              return e instanceof Date ? p?.(e) : e;
                            })),
                      null === R)
                    ) {
                      if (i) return c && !g ? c(s, A.encoder, _, "key", f) : s;
                      R = "";
                    }
                    if (
                      "string" == typeof (b = R) ||
                      "number" == typeof b ||
                      "boolean" == typeof b ||
                      "symbol" == typeof b ||
                      "bigint" == typeof b ||
                      ((k = R) &&
                        "object" == typeof k &&
                        k.constructor &&
                        k.constructor.isBuffer &&
                        k.constructor.isBuffer(k))
                    ) {
                      if (c) {
                        let e = g ? s : c(s, A.encoder, _, "key", f);
                        return [
                          m?.(e) + "=" + m?.(c(R, A.encoder, _, "value", f)),
                        ];
                      }
                      return [m?.(s) + "=" + m?.(String(R))];
                    }
                    let P = [];
                    if (void 0 === R) return P;
                    if ("comma" === r && w(R))
                      g && c && (R = y(R, c)),
                        (S = [
                          {
                            value: R.length > 0 ? R.join(",") || null : void 0,
                          },
                        ]);
                    else if (w(u)) S = u;
                    else {
                      let e = Object.keys(R);
                      S = d ? e.sort(d) : e;
                    }
                    let I = l ? String(s).replace(/\./g, "%2E") : String(s),
                      T = n && w(R) && 1 === R.length ? I + "[]" : I;
                    if (a && w(R) && 0 === R.length) return T + "[]";
                    for (let s = 0; s < S.length; ++s) {
                      let y = S[s],
                        b =
                          "object" == typeof y && void 0 !== y.value
                            ? y.value
                            : R[y];
                      if (o && null === b) continue;
                      let k = h && l ? y.replace(/\./g, "%2E") : y,
                        A = w(R)
                          ? "function" == typeof r
                            ? r(T, k)
                            : T
                          : T + (h ? "." + k : "[" + k + "]");
                      v.set(t, C);
                      let E = new WeakMap();
                      E.set(O, v),
                        x(
                          P,
                          e(
                            b,
                            A,
                            r,
                            n,
                            a,
                            i,
                            o,
                            l,
                            "comma" === r && g && w(R) ? null : c,
                            u,
                            d,
                            h,
                            p,
                            f,
                            m,
                            g,
                            _,
                            E,
                          ),
                        );
                    }
                    return P;
                  })(
                    n[t],
                    t,
                    o,
                    l,
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
                    c,
                  ),
                );
            }
            let u = i.join(a.delimiter),
              d = !0 === a.addQueryPrefix ? "?" : "";
            return (
              a.charsetSentinel &&
                ("iso-8859-1" === a.charset
                  ? (d += "utf8=%26%2310003%3B&")
                  : (d += "utf8=%E2%9C%93&")),
              u.length > 0 ? d + u : ""
            );
          })(e, { arrayFormat: "brackets" });
        }
      }
      (rE.OpenAI = rE),
        (rE.DEFAULT_TIMEOUT = 6e5),
        (rE.OpenAIError = $),
        (rE.APIError = P),
        (rE.APIConnectionError = T),
        (rE.APIConnectionTimeoutError = j),
        (rE.APIUserAbortError = I),
        (rE.NotFoundError = F),
        (rE.ConflictError = D),
        (rE.RateLimitError = B),
        (rE.BadRequestError = N),
        (rE.AuthenticationError = L),
        (rE.InternalServerError = q),
        (rE.PermissionDeniedError = M),
        (rE.UnprocessableEntityError = Z),
        (rE.toFile = ti),
        (rE.fileFromPath = d),
        (rE.Completions = tX),
        (rE.Chat = t4),
        (rE.ChatCompletionsPage = t1),
        (rE.Embeddings = t9),
        (rE.Files = t3),
        (rE.FileObjectsPage = t5),
        (rE.Images = t6),
        (rE.Audio = st),
        (rE.Moderations = ss),
        (rE.Models = sr),
        (rE.ModelsPage = sn),
        (rE.FineTuning = sg),
        (rE.Graders = s_),
        (rE.VectorStores = sA),
        (rE.VectorStoresPage = sO),
        (rE.VectorStoreSearchResponsesPage = sS),
        (rE.Beta = rn),
        (rE.Batches = ra),
        (rE.BatchesPage = ri),
        (rE.Uploads = rl),
        (rE.Responses = rm),
        (rE.Evals = rb),
        (rE.EvalListResponsesPage = rx),
        (rE.Containers = rS),
        (rE.ContainerListResponsesPage = rR);
      let rC = rE;
    },
    37225: (e, t, s) => {
      s.d(t, { p: () => r });
      var r = (e) => (t) => e.fetch(t);
    },
    49070: (e, t, s) => {
      s.d(t, { $: () => B });
      var r = (e, t, s) => (r, n) => {
          let a = -1;
          return i(0);
          async function i(o) {
            let l, c;
            if (o <= a) throw Error("next() called multiple times");
            a = o;
            let u = !1;
            if (
              (e[o]
                ? ((c = e[o][0][0]), (r.req.routeIndex = o))
                : (c = (o === e.length && n) || void 0),
              c)
            )
              try {
                l = await c(r, () => i(o + 1));
              } catch (e) {
                if (e instanceof Error && t)
                  (r.error = e), (l = await t(e, r)), (u = !0);
                else throw e;
              }
            else !1 === r.finalized && s && (l = await s(r));
            return l && (!1 === r.finalized || u) && (r.res = l), r;
          }
        },
        n = Symbol(),
        a = async (e, t = Object.create(null)) => {
          let { all: s = !1, dot: r = !1 } = t,
            n = (e instanceof d ? e.raw.headers : e.headers).get(
              "Content-Type",
            );
          return n?.startsWith("multipart/form-data") ||
            n?.startsWith("application/x-www-form-urlencoded")
            ? i(e, { all: s, dot: r })
            : {};
        };
      async function i(e, t) {
        let s = await e.formData();
        return s
          ? (function (e, t) {
              let s = Object.create(null);
              return (
                e.forEach((e, r) => {
                  t.all || r.endsWith("[]") ? o(s, r, e) : (s[r] = e);
                }),
                t.dot &&
                  Object.entries(s).forEach(([e, t]) => {
                    e.includes(".") && (l(s, e, t), delete s[e]);
                  }),
                s
              );
            })(s, t)
          : {};
      }
      var o = (e, t, s) => {
          void 0 !== e[t]
            ? Array.isArray(e[t])
              ? e[t].push(s)
              : (e[t] = [e[t], s])
            : t.endsWith("[]")
              ? (e[t] = [s])
              : (e[t] = s);
        },
        l = (e, t, s) => {
          let r = e,
            n = t.split(".");
          n.forEach((e, t) => {
            t === n.length - 1
              ? (r[e] = s)
              : ((!r[e] ||
                  "object" != typeof r[e] ||
                  Array.isArray(r[e]) ||
                  r[e] instanceof File) &&
                  (r[e] = Object.create(null)),
                (r = r[e]));
          });
        },
        c = s(78362),
        u = (e) => (0, c.SA)(e, c.Rp),
        d = class {
          raw;
          #e;
          #t;
          routeIndex = 0;
          path;
          bodyCache = {};
          constructor(e, t = "/", s = [[]]) {
            (this.raw = e), (this.path = t), (this.#t = s), (this.#e = {});
          }
          param(e) {
            return e ? this.#s(e) : this.#r();
          }
          #s(e) {
            let t = this.#t[0][this.routeIndex][1][e],
              s = this.#n(t);
            return s ? (/\%/.test(s) ? u(s) : s) : void 0;
          }
          #r() {
            let e = {};
            for (let t of Object.keys(this.#t[0][this.routeIndex][1])) {
              let s = this.#n(this.#t[0][this.routeIndex][1][t]);
              s && "string" == typeof s && (e[t] = /\%/.test(s) ? u(s) : s);
            }
            return e;
          }
          #n(e) {
            return this.#t[1] ? this.#t[1][e] : e;
          }
          query(e) {
            return (0, c.qn)(this.url, e);
          }
          queries(e) {
            return (0, c.vA)(this.url, e);
          }
          header(e) {
            if (e) return this.raw.headers.get(e) ?? void 0;
            let t = {};
            return (
              this.raw.headers.forEach((e, s) => {
                t[s] = e;
              }),
              t
            );
          }
          async parseBody(e) {
            return (this.bodyCache.parsedBody ??= await a(this, e));
          }
          #a = (e) => {
            let { bodyCache: t, raw: s } = this,
              r = t[e];
            if (r) return r;
            let n = Object.keys(t)[0];
            return n
              ? t[n].then(
                  (t) => (
                    "json" === n && (t = JSON.stringify(t)),
                    new Response(t)[e]()
                  ),
                )
              : (t[e] = s[e]());
          };
          json() {
            return this.#a("json");
          }
          text() {
            return this.#a("text");
          }
          arrayBuffer() {
            return this.#a("arrayBuffer");
          }
          blob() {
            return this.#a("blob");
          }
          formData() {
            return this.#a("formData");
          }
          addValidatedData(e, t) {
            this.#e[e] = t;
          }
          valid(e) {
            return this.#e[e];
          }
          get url() {
            return this.raw.url;
          }
          get method() {
            return this.raw.method;
          }
          get [n]() {
            return this.#t;
          }
          get matchedRoutes() {
            return this.#t[0].map(([[, e]]) => e);
          }
          get routePath() {
            return this.#t[0].map(([[, e]]) => e)[this.routeIndex].path;
          }
        },
        h = { Stringify: 1 },
        p = (e, t) => {
          let s = new String(e);
          return (s.isEscaped = !0), (s.callbacks = t), s;
        },
        f = /[&<>'"]/,
        m = async (e, t, s, r, n) => {
          "object" == typeof e &&
            !(e instanceof String) &&
            (e instanceof Promise || (e = e.toString()),
            e instanceof Promise && (e = await e));
          let a = e.callbacks;
          if (!a?.length) return Promise.resolve(e);
          n ? (n[0] += e) : (n = [e]);
          let i = Promise.all(
            a.map((e) => e({ phase: t, buffer: n, context: r })),
          ).then((e) =>
            Promise.all(e.filter(Boolean).map((e) => m(e, t, !1, r, n))).then(
              () => n[0],
            ),
          );
          return s ? p(await i, a) : i;
        },
        g = (e, t) => ({ "Content-Type": e, ...t }),
        y = class {
          #i;
          #o;
          env = {};
          #l;
          finalized = !1;
          error;
          #c;
          #u;
          #d;
          #h;
          #p;
          #f;
          #m;
          #t;
          #g;
          constructor(e, t) {
            (this.#i = e),
              t &&
                ((this.#u = t.executionCtx),
                (this.env = t.env),
                (this.#f = t.notFoundHandler),
                (this.#g = t.path),
                (this.#t = t.matchResult));
          }
          get req() {
            return (this.#o ??= new d(this.#i, this.#g, this.#t)), this.#o;
          }
          get event() {
            if (this.#u && "respondWith" in this.#u) return this.#u;
            throw Error("This context has no FetchEvent");
          }
          get executionCtx() {
            if (this.#u) return this.#u;
            throw Error("This context has no ExecutionContext");
          }
          get res() {
            return (this.#d ||= new Response(null, {
              headers: (this.#m ??= new Headers()),
            }));
          }
          set res(e) {
            if (this.#d && e) {
              for (let [t, s] of ((e = new Response(e.body, e)),
              this.#d.headers.entries()))
                if ("content-type" !== t)
                  if ("set-cookie" === t) {
                    let t = this.#d.headers.getSetCookie();
                    for (let s of (e.headers.delete("set-cookie"), t))
                      e.headers.append("set-cookie", s);
                  } else e.headers.set(t, s);
            }
            (this.#d = e), (this.finalized = !0);
          }
          render = (...e) => ((this.#p ??= (e) => this.html(e)), this.#p(...e));
          setLayout = (e) => (this.#h = e);
          getLayout = () => this.#h;
          setRenderer = (e) => {
            this.#p = e;
          };
          header = (e, t, s) => {
            this.finalized && (this.#d = new Response(this.#d.body, this.#d));
            let r = this.#d ? this.#d.headers : (this.#m ??= new Headers());
            void 0 === t
              ? r.delete(e)
              : s?.append
                ? r.append(e, t)
                : r.set(e, t);
          };
          status = (e) => {
            this.#c = e;
          };
          set = (e, t) => {
            (this.#l ??= new Map()), this.#l.set(e, t);
          };
          get = (e) => (this.#l ? this.#l.get(e) : void 0);
          get var() {
            return this.#l ? Object.fromEntries(this.#l) : {};
          }
          #y(e, t, s) {
            let r = this.#d
              ? new Headers(this.#d.headers)
              : (this.#m ?? new Headers());
            if ("object" == typeof t && "headers" in t)
              for (let [e, s] of t.headers instanceof Headers
                ? t.headers
                : new Headers(t.headers))
                "set-cookie" === e.toLowerCase() ? r.append(e, s) : r.set(e, s);
            if (s)
              for (let [e, t] of Object.entries(s))
                if ("string" == typeof t) r.set(e, t);
                else for (let s of (r.delete(e), t)) r.append(e, s);
            return new Response(e, {
              status: "number" == typeof t ? t : (t?.status ?? this.#c),
              headers: r,
            });
          }
          newResponse = (...e) => this.#y(...e);
          body = (e, t, s) => this.#y(e, t, s);
          text = (e, t, s) =>
            this.#m || this.#c || t || s || this.finalized
              ? this.#y(e, t, g("text/plain; charset=UTF-8", s))
              : new Response(e);
          json = (e, t, s) =>
            this.#y(JSON.stringify(e), t, g("application/json", s));
          html = (e, t, s) => {
            let r = (e) => this.#y(e, t, g("text/html; charset=UTF-8", s));
            return "object" == typeof e
              ? m(e, h.Stringify, !1, {}).then(r)
              : r(e);
          };
          redirect = (e, t) => (
            this.header("Location", String(e)), this.newResponse(null, t ?? 302)
          );
          notFound = () => ((this.#f ??= () => new Response()), this.#f(this));
        },
        _ = ["get", "post", "put", "delete", "options", "patch"],
        v = "Can not add a route since the matcher is already built.",
        w = class extends Error {},
        b = (e) => e.text("404 Not Found", 404),
        x = (e, t) => {
          if ("getResponse" in e) {
            let s = e.getResponse();
            return t.newResponse(s.body, s);
          }
          return console.error(e), t.text("Internal Server Error", 500);
        },
        k = class {
          get;
          post;
          put;
          delete;
          options;
          patch;
          all;
          on;
          use;
          router;
          getPath;
          _basePath = "/";
          #g = "/";
          routes = [];
          constructor(e = {}) {
            [..._, "all"].forEach((e) => {
              this[e] = (t, ...s) => (
                "string" == typeof t ? (this.#g = t) : this.#_(e, this.#g, t),
                s.forEach((t) => {
                  this.#_(e, this.#g, t);
                }),
                this
              );
            }),
              (this.on = (e, t, ...s) => {
                for (let r of [t].flat())
                  for (let t of ((this.#g = r), [e].flat()))
                    s.map((e) => {
                      this.#_(t.toUpperCase(), this.#g, e);
                    });
                return this;
              }),
              (this.use = (e, ...t) => (
                "string" == typeof e
                  ? (this.#g = e)
                  : ((this.#g = "*"), t.unshift(e)),
                t.forEach((e) => {
                  this.#_("ALL", this.#g, e);
                }),
                this
              ));
            let { strict: t, ...s } = e;
            Object.assign(this, s),
              (this.getPath = (t ?? !0) ? (e.getPath ?? c.Yn) : c.md);
          }
          #v() {
            let e = new k({ router: this.router, getPath: this.getPath });
            return (
              (e.errorHandler = this.errorHandler),
              (e.#f = this.#f),
              (e.routes = this.routes),
              e
            );
          }
          #f = b;
          errorHandler = x;
          route(e, t) {
            let s = this.basePath(e);
            return (
              t.routes.map((e) => {
                let n;
                t.errorHandler === x
                  ? (n = e.handler)
                  : ((n = async (s, n) =>
                      (await r([], t.errorHandler)(s, () => e.handler(s, n)))
                        .res).__COMPOSED_HANDLER = e.handler),
                  s.#_(e.method, e.path, n);
              }),
              this
            );
          }
          basePath(e) {
            let t = this.#v();
            return (t._basePath = (0, c.uc)(this._basePath, e)), t;
          }
          onError = (e) => ((this.errorHandler = e), this);
          notFound = (e) => ((this.#f = e), this);
          mount(e, t, s) {
            let r, n;
            s &&
              ("function" == typeof s
                ? (n = s)
                : ((n = s.optionHandler),
                  (r = !1 === s.replaceRequest ? (e) => e : s.replaceRequest)));
            let a = n
              ? (e) => {
                  let t = n(e);
                  return Array.isArray(t) ? t : [t];
                }
              : (e) => {
                  let t;
                  try {
                    t = e.executionCtx;
                  } catch {}
                  return [e.env, t];
                };
            r ||= (() => {
              let t = (0, c.uc)(this._basePath, e),
                s = "/" === t ? 0 : t.length;
              return (e) => {
                let t = new URL(e.url);
                return (
                  (t.pathname = t.pathname.slice(s) || "/"), new Request(t, e)
                );
              };
            })();
            let i = async (e, s) => {
              let n = await t(r(e.req.raw), ...a(e));
              if (n) return n;
              await s();
            };
            return this.#_("ALL", (0, c.uc)(e, "*"), i), this;
          }
          #_(e, t, s) {
            (e = e.toUpperCase()), (t = (0, c.uc)(this._basePath, t));
            let r = {
              basePath: this._basePath,
              path: t,
              method: e,
              handler: s,
            };
            this.router.add(e, t, [s, r]), this.routes.push(r);
          }
          #w(e, t) {
            if (e instanceof Error) return this.errorHandler(e, t);
            throw e;
          }
          #b(e, t, s, n) {
            if ("HEAD" === n)
              return (async () =>
                new Response(null, await this.#b(e, t, s, "GET")))();
            let a = this.getPath(e, { env: s }),
              i = this.router.match(n, a),
              o = new y(e, {
                path: a,
                matchResult: i,
                env: s,
                executionCtx: t,
                notFoundHandler: this.#f,
              });
            if (1 === i[0].length) {
              let e;
              try {
                e = i[0][0][0][0](o, async () => {
                  o.res = await this.#f(o);
                });
              } catch (e) {
                return this.#w(e, o);
              }
              return e instanceof Promise
                ? e
                    .then((e) => e || (o.finalized ? o.res : this.#f(o)))
                    .catch((e) => this.#w(e, o))
                : (e ?? this.#f(o));
            }
            let l = r(i[0], this.errorHandler, this.#f);
            return (async () => {
              try {
                let e = await l(o);
                if (!e.finalized)
                  throw Error(
                    "Context is not finalized. Did you forget to return a Response object or `await next()`?",
                  );
                return e.res;
              } catch (e) {
                return this.#w(e, o);
              }
            })();
          }
          fetch = (e, ...t) => this.#b(e, t[1], t[0], e.method);
          request = (e, t, s, r) =>
            e instanceof Request
              ? this.fetch(t ? new Request(e, t) : e, s, r)
              : ((e = e.toString()),
                this.fetch(
                  new Request(
                    /^https?:\/\//.test(e)
                      ? e
                      : `http://localhost${(0, c.uc)("/", e)}`,
                    t,
                  ),
                  s,
                  r,
                ));
          fire = () => {
            addEventListener("fetch", (e) => {
              e.respondWith(this.#b(e.request, e, void 0, e.request.method));
            });
          };
        },
        A = "[^/]+",
        O = "(?:|/.*)",
        S = Symbol(),
        R = new Set(".\\+*[^]$()");
      function E(e, t) {
        return 1 === e.length
          ? 1 === t.length
            ? e < t
              ? -1
              : 1
            : -1
          : 1 === t.length || ".*" === e || e === O
            ? 1
            : ".*" === t || t === O
              ? -1
              : e === A
                ? 1
                : t === A
                  ? -1
                  : e.length === t.length
                    ? e < t
                      ? -1
                      : 1
                    : t.length - e.length;
      }
      var C = class {
          #x;
          #k;
          #A = Object.create(null);
          insert(e, t, s, r, n) {
            let a;
            if (0 === e.length) {
              if (void 0 !== this.#x) throw S;
              if (n) return;
              this.#x = t;
              return;
            }
            let [i, ...o] = e,
              l =
                "*" === i
                  ? 0 === o.length
                    ? ["", "", ".*"]
                    : ["", "", A]
                  : "/*" === i
                    ? ["", "", O]
                    : i.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);
            if (l) {
              let e = l[1],
                t = l[2] || A;
              if (
                e &&
                l[2] &&
                ((t = t.replace(/^\((?!\?:)(?=[^)]+\)$)/, "(?:")),
                /\((?!\?:)/.test(t))
              )
                throw S;
              if (!(a = this.#A[t])) {
                if (Object.keys(this.#A).some((e) => ".*" !== e && e !== O))
                  throw S;
                if (n) return;
                (a = this.#A[t] = new C()), "" !== e && (a.#k = r.varIndex++);
              }
              n || "" === e || s.push([e, a.#k]);
            } else if (!(a = this.#A[i])) {
              if (
                Object.keys(this.#A).some(
                  (e) => e.length > 1 && ".*" !== e && e !== O,
                )
              )
                throw S;
              if (n) return;
              a = this.#A[i] = new C();
            }
            a.insert(o, t, s, r, n);
          }
          buildRegExpStr() {
            let e = Object.keys(this.#A)
              .sort(E)
              .map((e) => {
                let t = this.#A[e];
                return (
                  ("number" == typeof t.#k
                    ? `(${e})@${t.#k}`
                    : R.has(e)
                      ? `\\${e}`
                      : e) + t.buildRegExpStr()
                );
              });
            return ("number" == typeof this.#x && e.unshift(`#${this.#x}`),
            0 === e.length)
              ? ""
              : 1 === e.length
                ? e[0]
                : "(?:" + e.join("|") + ")";
          }
        },
        $ = class {
          #O = { varIndex: 0 };
          #S = new C();
          insert(e, t, s) {
            let r = [],
              n = [];
            for (let t = 0; ; ) {
              let s = !1;
              if (
                ((e = e.replace(/\{[^}]+\}/g, (e) => {
                  let r = `@\\${t}`;
                  return (n[t] = [r, e]), t++, (s = !0), r;
                })),
                !s)
              )
                break;
            }
            let a = e.match(/(?::[^\/]+)|(?:\/\*$)|./g) || [];
            for (let e = n.length - 1; e >= 0; e--) {
              let [t] = n[e];
              for (let s = a.length - 1; s >= 0; s--)
                if (-1 !== a[s].indexOf(t)) {
                  a[s] = a[s].replace(t, n[e][1]);
                  break;
                }
            }
            return this.#S.insert(a, t, r, this.#O, s), r;
          }
          buildRegExp() {
            let e = this.#S.buildRegExpStr();
            if ("" === e) return [/^$/, [], []];
            let t = 0,
              s = [],
              r = [];
            return (
              (e = e.replace(/#(\d+)|@(\d+)|\.\*\$/g, (e, n, a) =>
                void 0 !== n
                  ? ((s[++t] = Number(n)), "$()")
                  : (void 0 !== a && (r[Number(a)] = ++t), ""),
              )),
              [RegExp(`^${e}`), s, r]
            );
          }
        },
        P = [],
        I = [/^$/, [], Object.create(null)],
        T = Object.create(null);
      function j(e) {
        return (T[e] ??= new RegExp(
          "*" === e
            ? ""
            : `^${e.replace(/\/\*$|([.\\+*[^\]$()])/g, (e, t) => (t ? `\\${t}` : "(?:|/.*)"))}$`,
        ));
      }
      function N(e, t) {
        if (e) {
          for (let s of Object.keys(e).sort((e, t) => t.length - e.length))
            if (j(s).test(t)) return [...e[s]];
        }
      }
      var L = class {
          name = "RegExpRouter";
          #R;
          #E;
          constructor() {
            (this.#R = { ALL: Object.create(null) }),
              (this.#E = { ALL: Object.create(null) });
          }
          add(e, t, s) {
            let r = this.#R,
              n = this.#E;
            if (!r || !n) throw Error(v);
            r[e] ||
              [r, n].forEach((t) => {
                (t[e] = Object.create(null)),
                  Object.keys(t.ALL).forEach((s) => {
                    t[e][s] = [...t.ALL[s]];
                  });
              }),
              "/*" === t && (t = "*");
            let a = (t.match(/\/:/g) || []).length;
            if (/\*$/.test(t)) {
              let i = j(t);
              "ALL" === e
                ? Object.keys(r).forEach((e) => {
                    r[e][t] ||= N(r[e], t) || N(r.ALL, t) || [];
                  })
                : (r[e][t] ||= N(r[e], t) || N(r.ALL, t) || []),
                Object.keys(r).forEach((t) => {
                  ("ALL" === e || e === t) &&
                    Object.keys(r[t]).forEach((e) => {
                      i.test(e) && r[t][e].push([s, a]);
                    });
                }),
                Object.keys(n).forEach((t) => {
                  ("ALL" === e || e === t) &&
                    Object.keys(n[t]).forEach(
                      (e) => i.test(e) && n[t][e].push([s, a]),
                    );
                });
              return;
            }
            let i = (0, c.wU)(t) || [t];
            for (let t = 0, o = i.length; t < o; t++) {
              let l = i[t];
              Object.keys(n).forEach((i) => {
                ("ALL" === e || e === i) &&
                  ((n[i][l] ||= [...(N(r[i], l) || N(r.ALL, l) || [])]),
                  n[i][l].push([s, a - o + t + 1]));
              });
            }
          }
          match(e, t) {
            T = Object.create(null);
            let s = this.#C();
            return (
              (this.match = (e, t) => {
                let r = s[e] || s.ALL,
                  n = r[2][t];
                if (n) return n;
                let a = t.match(r[0]);
                if (!a) return [[], P];
                let i = a.indexOf("", 1);
                return [r[1][i], a];
              }),
              this.match(e, t)
            );
          }
          #C() {
            let e = Object.create(null);
            return (
              Object.keys(this.#E)
                .concat(Object.keys(this.#R))
                .forEach((t) => {
                  e[t] ||= this.#$(t);
                }),
              (this.#R = this.#E = void 0),
              e
            );
          }
          #$(e) {
            let t = [],
              s = "ALL" === e;
            return ([this.#R, this.#E].forEach((r) => {
              let n = r[e] ? Object.keys(r[e]).map((t) => [t, r[e][t]]) : [];
              0 !== n.length
                ? ((s ||= !0), t.push(...n))
                : "ALL" !== e &&
                  t.push(...Object.keys(r.ALL).map((e) => [e, r.ALL[e]]));
            }),
            s)
              ? (function (e) {
                  let t = new $(),
                    s = [];
                  if (0 === e.length) return I;
                  let r = e
                      .map((e) => [!/\*|\/:/.test(e[0]), ...e])
                      .sort(([e, t], [s, r]) =>
                        e ? 1 : s ? -1 : t.length - r.length,
                      ),
                    n = Object.create(null);
                  for (let e = 0, a = -1, i = r.length; e < i; e++) {
                    let i,
                      [o, l, c] = r[e];
                    o
                      ? (n[l] = [c.map(([e]) => [e, Object.create(null)]), P])
                      : a++;
                    try {
                      i = t.insert(l, a, o);
                    } catch (e) {
                      throw e === S ? new w(l) : e;
                    }
                    o ||
                      (s[a] = c.map(([e, t]) => {
                        let s = Object.create(null);
                        for (t -= 1; t >= 0; t--) {
                          let [e, r] = i[t];
                          s[e] = r;
                        }
                        return [e, s];
                      }));
                  }
                  let [a, i, o] = t.buildRegExp();
                  for (let e = 0, t = s.length; e < t; e++)
                    for (let t = 0, r = s[e].length; t < r; t++) {
                      let r = s[e][t]?.[1];
                      if (!r) continue;
                      let n = Object.keys(r);
                      for (let e = 0, t = n.length; e < t; e++)
                        r[n[e]] = o[r[n[e]]];
                    }
                  let l = [];
                  for (let e in i) l[e] = s[i[e]];
                  return [a, l, n];
                })(t)
              : null;
          }
        },
        M = class {
          name = "SmartRouter";
          #P = [];
          #E = [];
          constructor(e) {
            this.#P = e.routers;
          }
          add(e, t, s) {
            if (!this.#E) throw Error(v);
            this.#E.push([e, t, s]);
          }
          match(e, t) {
            let s;
            if (!this.#E) throw Error("Fatal error");
            let r = this.#P,
              n = this.#E,
              a = r.length,
              i = 0;
            for (; i < a; i++) {
              let a = r[i];
              try {
                for (let e = 0, t = n.length; e < t; e++) a.add(...n[e]);
                s = a.match(e, t);
              } catch (e) {
                if (e instanceof w) continue;
                throw e;
              }
              (this.match = a.match.bind(a)),
                (this.#P = [a]),
                (this.#E = void 0);
              break;
            }
            if (i === a) throw Error("Fatal error");
            return (this.name = `SmartRouter + ${this.activeRouter.name}`), s;
          }
          get activeRouter() {
            if (this.#E || 1 !== this.#P.length)
              throw Error("No active router has been determined yet.");
            return this.#P[0];
          }
        },
        F = Object.create(null),
        D = class {
          #I;
          #A;
          #T;
          #j = 0;
          #N = F;
          constructor(e, t, s) {
            if (
              ((this.#A = s || Object.create(null)), (this.#I = []), e && t)
            ) {
              let s = Object.create(null);
              (s[e] = { handler: t, possibleKeys: [], score: 0 }),
                (this.#I = [s]);
            }
            this.#T = [];
          }
          insert(e, t, s) {
            this.#j = ++this.#j;
            let r = this,
              n = (0, c.WE)(t),
              a = [];
            for (let e = 0, t = n.length; e < t; e++) {
              let t = n[e],
                s = n[e + 1],
                i = (0, c.jA)(t, s),
                o = Array.isArray(i) ? i[0] : t;
              if (o in r.#A) {
                (r = r.#A[o]), i && a.push(i[1]);
                continue;
              }
              (r.#A[o] = new D()),
                i && (r.#T.push(i), a.push(i[1])),
                (r = r.#A[o]);
            }
            return (
              r.#I.push({
                [e]: {
                  handler: s,
                  possibleKeys: a.filter((e, t, s) => s.indexOf(e) === t),
                  score: this.#j,
                },
              }),
              r
            );
          }
          #L(e, t, s, r) {
            let n = [];
            for (let a = 0, i = e.#I.length; a < i; a++) {
              let i = e.#I[a],
                o = i[t] || i.ALL,
                l = {};
              if (
                void 0 !== o &&
                ((o.params = Object.create(null)),
                n.push(o),
                s !== F || (r && r !== F))
              )
                for (let e = 0, t = o.possibleKeys.length; e < t; e++) {
                  let t = o.possibleKeys[e],
                    n = l[o.score];
                  (o.params[t] = r?.[t] && !n ? r[t] : (s[t] ?? r?.[t])),
                    (l[o.score] = !0);
                }
            }
            return n;
          }
          search(e, t) {
            let s = [];
            this.#N = F;
            let r = [this],
              n = (0, c.Uf)(t),
              a = [];
            for (let t = 0, i = n.length; t < i; t++) {
              let o = n[t],
                l = t === i - 1,
                c = [];
              for (let i = 0, u = r.length; i < u; i++) {
                let u = r[i],
                  d = u.#A[o];
                d &&
                  ((d.#N = u.#N),
                  l
                    ? (d.#A["*"] && s.push(...this.#L(d.#A["*"], e, u.#N)),
                      s.push(...this.#L(d, e, u.#N)))
                    : c.push(d));
                for (let r = 0, i = u.#T.length; r < i; r++) {
                  let i = u.#T[r],
                    d = u.#N === F ? {} : { ...u.#N };
                  if ("*" === i) {
                    let t = u.#A["*"];
                    t &&
                      (s.push(...this.#L(t, e, u.#N)), (t.#N = d), c.push(t));
                    continue;
                  }
                  if (!o) continue;
                  let [h, p, f] = i,
                    m = u.#A[h],
                    g = n.slice(t).join("/");
                  if (f instanceof RegExp) {
                    let t = f.exec(g);
                    if (t) {
                      if (
                        ((d[p] = t[0]),
                        s.push(...this.#L(m, e, u.#N, d)),
                        Object.keys(m.#A).length)
                      ) {
                        m.#N = d;
                        let e = t[0].match(/\//)?.length ?? 0;
                        (a[e] ||= []).push(m);
                      }
                      continue;
                    }
                  }
                  (!0 === f || f.test(o)) &&
                    ((d[p] = o),
                    l
                      ? (s.push(...this.#L(m, e, d, u.#N)),
                        m.#A["*"] && s.push(...this.#L(m.#A["*"], e, d, u.#N)))
                      : ((m.#N = d), c.push(m)));
                }
              }
              r = c.concat(a.shift() ?? []);
            }
            return (
              s.length > 1 && s.sort((e, t) => e.score - t.score),
              [s.map(({ handler: e, params: t }) => [e, t])]
            );
          }
        },
        Z = class {
          name = "TrieRouter";
          #M;
          constructor() {
            this.#M = new D();
          }
          add(e, t, s) {
            let r = (0, c.wU)(t);
            if (r) {
              for (let t = 0, n = r.length; t < n; t++)
                this.#M.insert(e, r[t], s);
              return;
            }
            this.#M.insert(e, t, s);
          }
          match(e, t) {
            return this.#M.search(e, t);
          }
        },
        B = class extends k {
          constructor(e = {}) {
            super(e),
              (this.router =
                e.router ?? new M({ routers: [new L(), new Z()] }));
          }
        };
    },
    78362: (e, t, s) => {
      s.d(t, {
        Rp: () => v,
        SA: () => c,
        Uf: () => r,
        WE: () => n,
        Yn: () => d,
        jA: () => l,
        md: () => h,
        qn: () => y,
        uc: () => p,
        vA: () => _,
        wU: () => f,
      });
      var r = (e) => {
          let t = e.split("/");
          return "" === t[0] && t.shift(), t;
        },
        n = (e) => {
          let { groups: t, path: s } = a(e);
          return i(r(s), t);
        },
        a = (e) => {
          let t = [];
          return (
            (e = e.replace(/\{[^}]+\}/g, (e, s) => {
              let r = `@${s}`;
              return t.push([r, e]), r;
            })),
            { groups: t, path: e }
          );
        },
        i = (e, t) => {
          for (let s = t.length - 1; s >= 0; s--) {
            let [r] = t[s];
            for (let n = e.length - 1; n >= 0; n--)
              if (e[n].includes(r)) {
                e[n] = e[n].replace(r, t[s][1]);
                break;
              }
          }
          return e;
        },
        o = {},
        l = (e, t) => {
          if ("*" === e) return "*";
          let s = e.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);
          if (s) {
            let r = `${e}#${t}`;
            return (
              o[r] ||
                (s[2]
                  ? (o[r] =
                      t && ":" !== t[0] && "*" !== t[0]
                        ? [r, s[1], RegExp(`^${s[2]}(?=/${t})`)]
                        : [e, s[1], RegExp(`^${s[2]}$`)])
                  : (o[r] = [e, s[1], !0])),
              o[r]
            );
          }
          return null;
        },
        c = (e, t) => {
          try {
            return t(e);
          } catch {
            return e.replace(/(?:%[0-9A-Fa-f]{2})+/g, (e) => {
              try {
                return t(e);
              } catch {
                return e;
              }
            });
          }
        },
        u = (e) => c(e, decodeURI),
        d = (e) => {
          let t = e.url,
            s = t.indexOf("/", 58 === t.charCodeAt(9) ? 13 : 8),
            r = s;
          for (; r < t.length; r++) {
            let e = t.charCodeAt(r);
            if (37 === e) {
              let e = t.indexOf("?", r),
                n = t.slice(s, -1 === e ? void 0 : e);
              return u(n.includes("%25") ? n.replace(/%25/g, "%2525") : n);
            }
            if (63 === e) break;
          }
          return t.slice(s, r);
        },
        h = (e) => {
          let t = d(e);
          return t.length > 1 && "/" === t.at(-1) ? t.slice(0, -1) : t;
        },
        p = (e, t, ...s) => (
          s.length && (t = p(t, ...s)),
          `${e?.[0] === "/" ? "" : "/"}${e}${"/" === t ? "" : `${e?.at(-1) === "/" ? "" : "/"}${t?.[0] === "/" ? t.slice(1) : t}`}`
        ),
        f = (e) => {
          if (63 !== e.charCodeAt(e.length - 1) || !e.includes(":"))
            return null;
          let t = e.split("/"),
            s = [],
            r = "";
          return (
            t.forEach((e) => {
              if ("" === e || /\:/.test(e)) {
                if (/\:/.test(e))
                  if (/\?/.test(e)) {
                    0 === s.length && "" === r ? s.push("/") : s.push(r);
                    let t = e.replace("?", "");
                    (r += "/" + t), s.push(r);
                  } else r += "/" + e;
              } else r += "/" + e;
            }),
            s.filter((e, t, s) => s.indexOf(e) === t)
          );
        },
        m = (e) =>
          /[%+]/.test(e)
            ? (-1 !== e.indexOf("+") && (e = e.replace(/\+/g, " ")),
              -1 !== e.indexOf("%") ? c(e, v) : e)
            : e,
        g = (e, t, s) => {
          let r;
          if (!s && t && !/[%+]/.test(t)) {
            let s = e.indexOf(`?${t}`, 8);
            for (-1 === s && (s = e.indexOf(`&${t}`, 8)); -1 !== s; ) {
              let r = e.charCodeAt(s + t.length + 1);
              if (61 === r) {
                let r = s + t.length + 2,
                  n = e.indexOf("&", r);
                return m(e.slice(r, -1 === n ? void 0 : n));
              }
              if (38 == r || isNaN(r)) return "";
              s = e.indexOf(`&${t}`, s + 1);
            }
            if (!(r = /[%+]/.test(e))) return;
          }
          let n = {};
          r ??= /[%+]/.test(e);
          let a = e.indexOf("?", 8);
          for (; -1 !== a; ) {
            let t,
              i = e.indexOf("&", a + 1),
              o = e.indexOf("=", a);
            o > i && -1 !== i && (o = -1);
            let l = e.slice(a + 1, -1 === o ? (-1 === i ? void 0 : i) : o);
            r && (l = m(l)),
              (a = i),
              "" !== l &&
                (-1 === o
                  ? (t = "")
                  : ((t = e.slice(o + 1, -1 === i ? void 0 : i)),
                    r && (t = m(t))),
                s
                  ? ((n[l] && Array.isArray(n[l])) || (n[l] = []), n[l].push(t))
                  : (n[l] ??= t));
          }
          return t ? n[t] : n;
        },
        y = g,
        _ = (e, t) => g(e, t, !0),
        v = decodeURIComponent;
    },
    80456: (e, t, s) => {
      let r;
      s.d(t, { l: () => eB });
      var n,
        a,
        i,
        o,
        l = s(78362),
        c = { name: "HMAC", hash: "SHA-256" },
        u = async (e) => {
          let t = "string" == typeof e ? new TextEncoder().encode(e) : e;
          return await crypto.subtle.importKey("raw", t, c, !1, [
            "sign",
            "verify",
          ]);
        },
        d = /^[\w!#$%&'*.^`|~+-]+$/,
        h = /^[ !#-:<-[\]-~]*$/,
        p = (e, t) => {
          if (t && -1 === e.indexOf(t)) return {};
          let s = e.trim().split(";"),
            r = {};
          for (let e of s) {
            let s = (e = e.trim()).indexOf("=");
            if (-1 === s) continue;
            let n = e.substring(0, s).trim();
            if ((t && t !== n) || !d.test(n)) continue;
            let a = e.substring(s + 1).trim();
            if (
              (a.startsWith('"') && a.endsWith('"') && (a = a.slice(1, -1)),
              h.test(a) && ((r[n] = (0, l.Rp)(a)), t))
            )
              break;
          }
          return r;
        },
        f = (e, t, s) => {
          let r = e.req.raw.headers.get("Cookie");
          if ("string" == typeof t) {
            if (!r) return;
            let e = t;
            return (
              "secure" === s
                ? (e = "__Secure-" + t)
                : "host" === s && (e = "__Host-" + t),
              p(r, e)[e]
            );
          }
          return r ? p(r) : {};
        },
        m = class extends Error {
          res;
          status;
          constructor(e = 500, t) {
            super(t?.message, { cause: t?.cause }),
              (this.res = t?.res),
              (this.status = e);
          }
          getResponse() {
            return this.res
              ? new Response(this.res.body, {
                  status: this.status,
                  headers: this.res.headers,
                })
              : new Response(this.message, { status: this.status });
          }
        },
        g = (e, t) =>
          new Response(e, { headers: { "Content-Type": t } }).formData(),
        y = /^application\/([a-z-\.]+\+)?json(;\s*[a-zA-Z0-9\-]+\=([^;]+))*$/,
        _ = /^multipart\/form-data(;\s?boundary=[a-zA-Z0-9'"()+_,\-./:=?]+)?$/,
        v =
          /^application\/x-www-form-urlencoded(;\s*[a-zA-Z0-9\-]+\=([^;]+))*$/,
        w = (e, t) => async (s, r) => {
          let n = {},
            a = s.req.header("Content-Type");
          switch (e) {
            case "json":
              if (!a || !y.test(a)) break;
              try {
                n = await s.req.json();
              } catch {
                throw new m(400, { message: "Malformed JSON in request body" });
              }
              break;
            case "form": {
              let e;
              if (!a || !(_.test(a) || v.test(a))) break;
              if (s.req.bodyCache.formData) e = await s.req.bodyCache.formData;
              else
                try {
                  let t = await s.req.arrayBuffer();
                  (e = await g(t, a)), (s.req.bodyCache.formData = e);
                } catch (t) {
                  let e = "Malformed FormData request.";
                  throw new m(400, {
                    message: (e +=
                      t instanceof Error ? ` ${t.message}` : ` ${String(t)}`),
                  });
                }
              let t = {};
              e.forEach((e, s) => {
                s.endsWith("[]")
                  ? (t[s] ??= []).push(e)
                  : Array.isArray(t[s])
                    ? t[s].push(e)
                    : s in t
                      ? (t[s] = [t[s], e])
                      : (t[s] = e);
              }),
                (n = t);
              break;
            }
            case "query":
              n = Object.fromEntries(
                Object.entries(s.req.queries()).map(([e, t]) =>
                  1 === t.length ? [e, t[0]] : [e, t],
                ),
              );
              break;
            case "param":
              n = s.req.param();
              break;
            case "header":
              n = s.req.header();
              break;
            case "cookie":
              n = f(s);
          }
          let i = await t(n, s);
          if (i instanceof Response) return i;
          s.req.addValidatedData(e, i), await r();
        };
      !(function (e) {
        (e.assertEqual = (e) => {}),
          (e.assertIs = function (e) {}),
          (e.assertNever = function (e) {
            throw Error();
          }),
          (e.arrayToEnum = (e) => {
            let t = {};
            for (let s of e) t[s] = s;
            return t;
          }),
          (e.getValidEnumValues = (t) => {
            let s = e.objectKeys(t).filter((e) => "number" != typeof t[t[e]]),
              r = {};
            for (let e of s) r[e] = t[e];
            return e.objectValues(r);
          }),
          (e.objectValues = (t) =>
            e.objectKeys(t).map(function (e) {
              return t[e];
            })),
          (e.objectKeys =
            "function" == typeof Object.keys
              ? (e) => Object.keys(e)
              : (e) => {
                  let t = [];
                  for (let s in e)
                    Object.prototype.hasOwnProperty.call(e, s) && t.push(s);
                  return t;
                }),
          (e.find = (e, t) => {
            for (let s of e) if (t(s)) return s;
          }),
          (e.isInteger =
            "function" == typeof Number.isInteger
              ? (e) => Number.isInteger(e)
              : (e) =>
                  "number" == typeof e &&
                  Number.isFinite(e) &&
                  Math.floor(e) === e),
          (e.joinValues = function (e, t = " | ") {
            return e.map((e) => ("string" == typeof e ? `'${e}'` : e)).join(t);
          }),
          (e.jsonStringifyReplacer = (e, t) =>
            "bigint" == typeof t ? t.toString() : t);
      })(n || (n = {})),
        ((a || (a = {})).mergeShapes = (e, t) => ({ ...e, ...t }));
      let b = n.arrayToEnum([
          "string",
          "nan",
          "number",
          "integer",
          "float",
          "boolean",
          "date",
          "bigint",
          "symbol",
          "function",
          "undefined",
          "null",
          "array",
          "object",
          "unknown",
          "promise",
          "void",
          "never",
          "map",
          "set",
        ]),
        x = (e) => {
          switch (typeof e) {
            case "undefined":
              return b.undefined;
            case "string":
              return b.string;
            case "number":
              return Number.isNaN(e) ? b.nan : b.number;
            case "boolean":
              return b.boolean;
            case "function":
              return b.function;
            case "bigint":
              return b.bigint;
            case "symbol":
              return b.symbol;
            case "object":
              if (Array.isArray(e)) return b.array;
              if (null === e) return b.null;
              if (
                e.then &&
                "function" == typeof e.then &&
                e.catch &&
                "function" == typeof e.catch
              )
                return b.promise;
              if ("undefined" != typeof Map && e instanceof Map) return b.map;
              if ("undefined" != typeof Set && e instanceof Set) return b.set;
              if ("undefined" != typeof Date && e instanceof Date)
                return b.date;
              return b.object;
            default:
              return b.unknown;
          }
        },
        k = n.arrayToEnum([
          "invalid_type",
          "invalid_literal",
          "custom",
          "invalid_union",
          "invalid_union_discriminator",
          "invalid_enum_value",
          "unrecognized_keys",
          "invalid_arguments",
          "invalid_return_type",
          "invalid_date",
          "invalid_string",
          "too_small",
          "too_big",
          "invalid_intersection_types",
          "not_multiple_of",
          "not_finite",
        ]);
      class A extends Error {
        get errors() {
          return this.issues;
        }
        constructor(e) {
          super(),
            (this.issues = []),
            (this.addIssue = (e) => {
              this.issues = [...this.issues, e];
            }),
            (this.addIssues = (e = []) => {
              this.issues = [...this.issues, ...e];
            });
          let t = new.target.prototype;
          Object.setPrototypeOf
            ? Object.setPrototypeOf(this, t)
            : (this.__proto__ = t),
            (this.name = "ZodError"),
            (this.issues = e);
        }
        format(e) {
          let t =
              e ||
              function (e) {
                return e.message;
              },
            s = { _errors: [] },
            r = (e) => {
              for (let n of e.issues)
                if ("invalid_union" === n.code) n.unionErrors.map(r);
                else if ("invalid_return_type" === n.code) r(n.returnTypeError);
                else if ("invalid_arguments" === n.code) r(n.argumentsError);
                else if (0 === n.path.length) s._errors.push(t(n));
                else {
                  let e = s,
                    r = 0;
                  for (; r < n.path.length; ) {
                    let s = n.path[r];
                    r === n.path.length - 1
                      ? ((e[s] = e[s] || { _errors: [] }),
                        e[s]._errors.push(t(n)))
                      : (e[s] = e[s] || { _errors: [] }),
                      (e = e[s]),
                      r++;
                  }
                }
            };
          return r(this), s;
        }
        static assert(e) {
          if (!(e instanceof A)) throw Error(`Not a ZodError: ${e}`);
        }
        toString() {
          return this.message;
        }
        get message() {
          return JSON.stringify(this.issues, n.jsonStringifyReplacer, 2);
        }
        get isEmpty() {
          return 0 === this.issues.length;
        }
        flatten(e = (e) => e.message) {
          let t = {},
            s = [];
          for (let r of this.issues)
            r.path.length > 0
              ? ((t[r.path[0]] = t[r.path[0]] || []), t[r.path[0]].push(e(r)))
              : s.push(e(r));
          return { formErrors: s, fieldErrors: t };
        }
        get formErrors() {
          return this.flatten();
        }
      }
      A.create = (e) => new A(e);
      let O = (e, t) => {
          let s;
          switch (e.code) {
            case k.invalid_type:
              s =
                e.received === b.undefined
                  ? "Required"
                  : `Expected ${e.expected}, received ${e.received}`;
              break;
            case k.invalid_literal:
              s = `Invalid literal value, expected ${JSON.stringify(e.expected, n.jsonStringifyReplacer)}`;
              break;
            case k.unrecognized_keys:
              s = `Unrecognized key(s) in object: ${n.joinValues(e.keys, ", ")}`;
              break;
            case k.invalid_union:
              s = "Invalid input";
              break;
            case k.invalid_union_discriminator:
              s = `Invalid discriminator value. Expected ${n.joinValues(e.options)}`;
              break;
            case k.invalid_enum_value:
              s = `Invalid enum value. Expected ${n.joinValues(e.options)}, received '${e.received}'`;
              break;
            case k.invalid_arguments:
              s = "Invalid function arguments";
              break;
            case k.invalid_return_type:
              s = "Invalid function return type";
              break;
            case k.invalid_date:
              s = "Invalid date";
              break;
            case k.invalid_string:
              "object" == typeof e.validation
                ? "includes" in e.validation
                  ? ((s = `Invalid input: must include "${e.validation.includes}"`),
                    "number" == typeof e.validation.position &&
                      (s = `${s} at one or more positions greater than or equal to ${e.validation.position}`))
                  : "startsWith" in e.validation
                    ? (s = `Invalid input: must start with "${e.validation.startsWith}"`)
                    : "endsWith" in e.validation
                      ? (s = `Invalid input: must end with "${e.validation.endsWith}"`)
                      : n.assertNever(e.validation)
                : (s =
                    "regex" !== e.validation
                      ? `Invalid ${e.validation}`
                      : "Invalid");
              break;
            case k.too_small:
              s =
                "array" === e.type
                  ? `Array must contain ${e.exact ? "exactly" : e.inclusive ? "at least" : "more than"} ${e.minimum} element(s)`
                  : "string" === e.type
                    ? `String must contain ${e.exact ? "exactly" : e.inclusive ? "at least" : "over"} ${e.minimum} character(s)`
                    : "number" === e.type
                      ? `Number must be ${e.exact ? "exactly equal to " : e.inclusive ? "greater than or equal to " : "greater than "}${e.minimum}`
                      : "date" === e.type
                        ? `Date must be ${e.exact ? "exactly equal to " : e.inclusive ? "greater than or equal to " : "greater than "}${new Date(Number(e.minimum))}`
                        : "Invalid input";
              break;
            case k.too_big:
              s =
                "array" === e.type
                  ? `Array must contain ${e.exact ? "exactly" : e.inclusive ? "at most" : "less than"} ${e.maximum} element(s)`
                  : "string" === e.type
                    ? `String must contain ${e.exact ? "exactly" : e.inclusive ? "at most" : "under"} ${e.maximum} character(s)`
                    : "number" === e.type
                      ? `Number must be ${e.exact ? "exactly" : e.inclusive ? "less than or equal to" : "less than"} ${e.maximum}`
                      : "bigint" === e.type
                        ? `BigInt must be ${e.exact ? "exactly" : e.inclusive ? "less than or equal to" : "less than"} ${e.maximum}`
                        : "date" === e.type
                          ? `Date must be ${e.exact ? "exactly" : e.inclusive ? "smaller than or equal to" : "smaller than"} ${new Date(Number(e.maximum))}`
                          : "Invalid input";
              break;
            case k.custom:
              s = "Invalid input";
              break;
            case k.invalid_intersection_types:
              s = "Intersection results could not be merged";
              break;
            case k.not_multiple_of:
              s = `Number must be a multiple of ${e.multipleOf}`;
              break;
            case k.not_finite:
              s = "Number must be finite";
              break;
            default:
              (s = t.defaultError), n.assertNever(e);
          }
          return { message: s };
        },
        S = (e) => {
          let { data: t, path: s, errorMaps: r, issueData: n } = e,
            a = [...s, ...(n.path || [])],
            i = { ...n, path: a };
          if (void 0 !== n.message)
            return { ...n, path: a, message: n.message };
          let o = "";
          for (let e of r
            .filter((e) => !!e)
            .slice()
            .reverse())
            o = e(i, { data: t, defaultError: o }).message;
          return { ...n, path: a, message: o };
        };
      function R(e, t) {
        let s = S({
          issueData: t,
          data: e.data,
          path: e.path,
          errorMaps: [
            e.common.contextualErrorMap,
            e.schemaErrorMap,
            O,
            O == O ? void 0 : O,
          ].filter((e) => !!e),
        });
        e.common.issues.push(s);
      }
      class E {
        constructor() {
          this.value = "valid";
        }
        dirty() {
          "valid" === this.value && (this.value = "dirty");
        }
        abort() {
          "aborted" !== this.value && (this.value = "aborted");
        }
        static mergeArray(e, t) {
          let s = [];
          for (let r of t) {
            if ("aborted" === r.status) return C;
            "dirty" === r.status && e.dirty(), s.push(r.value);
          }
          return { status: e.value, value: s };
        }
        static async mergeObjectAsync(e, t) {
          let s = [];
          for (let e of t) {
            let t = await e.key,
              r = await e.value;
            s.push({ key: t, value: r });
          }
          return E.mergeObjectSync(e, s);
        }
        static mergeObjectSync(e, t) {
          let s = {};
          for (let r of t) {
            let { key: t, value: n } = r;
            if ("aborted" === t.status || "aborted" === n.status) return C;
            "dirty" === t.status && e.dirty(),
              "dirty" === n.status && e.dirty(),
              "__proto__" !== t.value &&
                (void 0 !== n.value || r.alwaysSet) &&
                (s[t.value] = n.value);
          }
          return { status: e.value, value: s };
        }
      }
      let C = Object.freeze({ status: "aborted" }),
        $ = (e) => ({ status: "dirty", value: e }),
        P = (e) => ({ status: "valid", value: e }),
        I = (e) => "aborted" === e.status,
        T = (e) => "dirty" === e.status,
        j = (e) => "valid" === e.status,
        N = (e) => "undefined" != typeof Promise && e instanceof Promise;
      !(function (e) {
        (e.errToObj = (e) => ("string" == typeof e ? { message: e } : e || {})),
          (e.toString = (e) => ("string" == typeof e ? e : e?.message));
      })(i || (i = {}));
      class L {
        constructor(e, t, s, r) {
          (this._cachedPath = []),
            (this.parent = e),
            (this.data = t),
            (this._path = s),
            (this._key = r);
        }
        get path() {
          return (
            this._cachedPath.length ||
              (Array.isArray(this._key)
                ? this._cachedPath.push(...this._path, ...this._key)
                : this._cachedPath.push(...this._path, this._key)),
            this._cachedPath
          );
        }
      }
      let M = (e, t) => {
        if (j(t)) return { success: !0, data: t.value };
        if (!e.common.issues.length)
          throw Error("Validation failed but no issues detected.");
        return {
          success: !1,
          get error() {
            if (this._error) return this._error;
            let t = new A(e.common.issues);
            return (this._error = t), this._error;
          },
        };
      };
      function F(e) {
        if (!e) return {};
        let {
          errorMap: t,
          invalid_type_error: s,
          required_error: r,
          description: n,
        } = e;
        if (t && (s || r))
          throw Error(
            'Can\'t use "invalid_type_error" or "required_error" in conjunction with custom error map.',
          );
        return t
          ? { errorMap: t, description: n }
          : {
              errorMap: (t, n) => {
                let { message: a } = e;
                return "invalid_enum_value" === t.code
                  ? { message: a ?? n.defaultError }
                  : void 0 === n.data
                    ? { message: a ?? r ?? n.defaultError }
                    : "invalid_type" !== t.code
                      ? { message: n.defaultError }
                      : { message: a ?? s ?? n.defaultError };
              },
              description: n,
            };
      }
      class D {
        get description() {
          return this._def.description;
        }
        _getType(e) {
          return x(e.data);
        }
        _getOrReturnCtx(e, t) {
          return (
            t || {
              common: e.parent.common,
              data: e.data,
              parsedType: x(e.data),
              schemaErrorMap: this._def.errorMap,
              path: e.path,
              parent: e.parent,
            }
          );
        }
        _processInputParams(e) {
          return {
            status: new E(),
            ctx: {
              common: e.parent.common,
              data: e.data,
              parsedType: x(e.data),
              schemaErrorMap: this._def.errorMap,
              path: e.path,
              parent: e.parent,
            },
          };
        }
        _parseSync(e) {
          let t = this._parse(e);
          if (N(t)) throw Error("Synchronous parse encountered promise.");
          return t;
        }
        _parseAsync(e) {
          return Promise.resolve(this._parse(e));
        }
        parse(e, t) {
          let s = this.safeParse(e, t);
          if (s.success) return s.data;
          throw s.error;
        }
        safeParse(e, t) {
          let s = {
              common: {
                issues: [],
                async: t?.async ?? !1,
                contextualErrorMap: t?.errorMap,
              },
              path: t?.path || [],
              schemaErrorMap: this._def.errorMap,
              parent: null,
              data: e,
              parsedType: x(e),
            },
            r = this._parseSync({ data: e, path: s.path, parent: s });
          return M(s, r);
        }
        "~validate"(e) {
          let t = {
            common: { issues: [], async: !!this["~standard"].async },
            path: [],
            schemaErrorMap: this._def.errorMap,
            parent: null,
            data: e,
            parsedType: x(e),
          };
          if (!this["~standard"].async)
            try {
              let s = this._parseSync({ data: e, path: [], parent: t });
              return j(s) ? { value: s.value } : { issues: t.common.issues };
            } catch (e) {
              e?.message?.toLowerCase()?.includes("encountered") &&
                (this["~standard"].async = !0),
                (t.common = { issues: [], async: !0 });
            }
          return this._parseAsync({ data: e, path: [], parent: t }).then((e) =>
            j(e) ? { value: e.value } : { issues: t.common.issues },
          );
        }
        async parseAsync(e, t) {
          let s = await this.safeParseAsync(e, t);
          if (s.success) return s.data;
          throw s.error;
        }
        async safeParseAsync(e, t) {
          let s = {
              common: {
                issues: [],
                contextualErrorMap: t?.errorMap,
                async: !0,
              },
              path: t?.path || [],
              schemaErrorMap: this._def.errorMap,
              parent: null,
              data: e,
              parsedType: x(e),
            },
            r = this._parse({ data: e, path: s.path, parent: s });
          return M(s, await (N(r) ? r : Promise.resolve(r)));
        }
        refine(e, t) {
          let s = (e) =>
            "string" == typeof t || void 0 === t
              ? { message: t }
              : "function" == typeof t
                ? t(e)
                : t;
          return this._refinement((t, r) => {
            let n = e(t),
              a = () => r.addIssue({ code: k.custom, ...s(t) });
            return "undefined" != typeof Promise && n instanceof Promise
              ? n.then((e) => !!e || (a(), !1))
              : !!n || (a(), !1);
          });
        }
        refinement(e, t) {
          return this._refinement(
            (s, r) =>
              !!e(s) || (r.addIssue("function" == typeof t ? t(s, r) : t), !1),
          );
        }
        _refinement(e) {
          return new eI({
            schema: this,
            typeName: o.ZodEffects,
            effect: { type: "refinement", refinement: e },
          });
        }
        superRefine(e) {
          return this._refinement(e);
        }
        constructor(e) {
          (this.spa = this.safeParseAsync),
            (this._def = e),
            (this.parse = this.parse.bind(this)),
            (this.safeParse = this.safeParse.bind(this)),
            (this.parseAsync = this.parseAsync.bind(this)),
            (this.safeParseAsync = this.safeParseAsync.bind(this)),
            (this.spa = this.spa.bind(this)),
            (this.refine = this.refine.bind(this)),
            (this.refinement = this.refinement.bind(this)),
            (this.superRefine = this.superRefine.bind(this)),
            (this.optional = this.optional.bind(this)),
            (this.nullable = this.nullable.bind(this)),
            (this.nullish = this.nullish.bind(this)),
            (this.array = this.array.bind(this)),
            (this.promise = this.promise.bind(this)),
            (this.or = this.or.bind(this)),
            (this.and = this.and.bind(this)),
            (this.transform = this.transform.bind(this)),
            (this.brand = this.brand.bind(this)),
            (this.default = this.default.bind(this)),
            (this.catch = this.catch.bind(this)),
            (this.describe = this.describe.bind(this)),
            (this.pipe = this.pipe.bind(this)),
            (this.readonly = this.readonly.bind(this)),
            (this.isNullable = this.isNullable.bind(this)),
            (this.isOptional = this.isOptional.bind(this)),
            (this["~standard"] = {
              version: 1,
              vendor: "zod",
              validate: (e) => this["~validate"](e),
            });
        }
        optional() {
          return eT.create(this, this._def);
        }
        nullable() {
          return ej.create(this, this._def);
        }
        nullish() {
          return this.nullable().optional();
        }
        array() {
          return em.create(this);
        }
        promise() {
          return eP.create(this, this._def);
        }
        or(e) {
          return ey.create([this, e], this._def);
        }
        and(e) {
          return ew.create(this, e, this._def);
        }
        transform(e) {
          return new eI({
            ...F(this._def),
            schema: this,
            typeName: o.ZodEffects,
            effect: { type: "transform", transform: e },
          });
        }
        default(e) {
          return new eN({
            ...F(this._def),
            innerType: this,
            defaultValue: "function" == typeof e ? e : () => e,
            typeName: o.ZodDefault,
          });
        }
        brand() {
          return new eF({
            typeName: o.ZodBranded,
            type: this,
            ...F(this._def),
          });
        }
        catch(e) {
          return new eL({
            ...F(this._def),
            innerType: this,
            catchValue: "function" == typeof e ? e : () => e,
            typeName: o.ZodCatch,
          });
        }
        describe(e) {
          return new this.constructor({ ...this._def, description: e });
        }
        pipe(e) {
          return eD.create(this, e);
        }
        readonly() {
          return eZ.create(this);
        }
        isOptional() {
          return this.safeParse(void 0).success;
        }
        isNullable() {
          return this.safeParse(null).success;
        }
      }
      let Z = /^c[^\s-]{8,}$/i,
        B = /^[0-9a-z]+$/,
        q = /^[0-9A-HJKMNP-TV-Z]{26}$/i,
        U =
          /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/i,
        H = /^[a-z0-9_-]{21}$/i,
        W = /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]*$/,
        z =
          /^[-+]?P(?!$)(?:(?:[-+]?\d+Y)|(?:[-+]?\d+[.,]\d+Y$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:(?:[-+]?\d+W)|(?:[-+]?\d+[.,]\d+W$))?(?:(?:[-+]?\d+D)|(?:[-+]?\d+[.,]\d+D$))?(?:T(?=[\d+-])(?:(?:[-+]?\d+H)|(?:[-+]?\d+[.,]\d+H$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:[-+]?\d+(?:[.,]\d+)?S)?)??$/,
        V =
          /^(?!\.)(?!.*\.\.)([A-Z0-9_'+\-\.]*)[A-Z0-9_+-]@([A-Z0-9][A-Z0-9\-]*\.)+[A-Z]{2,}$/i,
        J =
          /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/,
        K =
          /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/(3[0-2]|[12]?[0-9])$/,
        X =
          /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))$/,
        G =
          /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/,
        Y = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/,
        Q =
          /^([0-9a-zA-Z-_]{4})*(([0-9a-zA-Z-_]{2}(==)?)|([0-9a-zA-Z-_]{3}(=)?))?$/,
        ee =
          "((\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-((0[13578]|1[02])-(0[1-9]|[12]\\d|3[01])|(0[469]|11)-(0[1-9]|[12]\\d|30)|(02)-(0[1-9]|1\\d|2[0-8])))",
        et = RegExp(`^${ee}$`);
      function es(e) {
        let t = "[0-5]\\d";
        e.precision
          ? (t = `${t}\\.\\d{${e.precision}}`)
          : null == e.precision && (t = `${t}(\\.\\d+)?`);
        let s = e.precision ? "+" : "?";
        return `([01]\\d|2[0-3]):[0-5]\\d(:${t})${s}`;
      }
      class er extends D {
        _parse(e) {
          var t, s, a, i;
          let o;
          if (
            (this._def.coerce && (e.data = String(e.data)),
            this._getType(e) !== b.string)
          ) {
            let t = this._getOrReturnCtx(e);
            return (
              R(t, {
                code: k.invalid_type,
                expected: b.string,
                received: t.parsedType,
              }),
              C
            );
          }
          let l = new E();
          for (let c of this._def.checks)
            if ("min" === c.kind)
              e.data.length < c.value &&
                (R((o = this._getOrReturnCtx(e, o)), {
                  code: k.too_small,
                  minimum: c.value,
                  type: "string",
                  inclusive: !0,
                  exact: !1,
                  message: c.message,
                }),
                l.dirty());
            else if ("max" === c.kind)
              e.data.length > c.value &&
                (R((o = this._getOrReturnCtx(e, o)), {
                  code: k.too_big,
                  maximum: c.value,
                  type: "string",
                  inclusive: !0,
                  exact: !1,
                  message: c.message,
                }),
                l.dirty());
            else if ("length" === c.kind) {
              let t = e.data.length > c.value,
                s = e.data.length < c.value;
              (t || s) &&
                ((o = this._getOrReturnCtx(e, o)),
                t
                  ? R(o, {
                      code: k.too_big,
                      maximum: c.value,
                      type: "string",
                      inclusive: !0,
                      exact: !0,
                      message: c.message,
                    })
                  : s &&
                    R(o, {
                      code: k.too_small,
                      minimum: c.value,
                      type: "string",
                      inclusive: !0,
                      exact: !0,
                      message: c.message,
                    }),
                l.dirty());
            } else if ("email" === c.kind)
              V.test(e.data) ||
                (R((o = this._getOrReturnCtx(e, o)), {
                  validation: "email",
                  code: k.invalid_string,
                  message: c.message,
                }),
                l.dirty());
            else if ("emoji" === c.kind)
              r ||
                (r = RegExp(
                  "^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$",
                  "u",
                )),
                r.test(e.data) ||
                  (R((o = this._getOrReturnCtx(e, o)), {
                    validation: "emoji",
                    code: k.invalid_string,
                    message: c.message,
                  }),
                  l.dirty());
            else if ("uuid" === c.kind)
              U.test(e.data) ||
                (R((o = this._getOrReturnCtx(e, o)), {
                  validation: "uuid",
                  code: k.invalid_string,
                  message: c.message,
                }),
                l.dirty());
            else if ("nanoid" === c.kind)
              H.test(e.data) ||
                (R((o = this._getOrReturnCtx(e, o)), {
                  validation: "nanoid",
                  code: k.invalid_string,
                  message: c.message,
                }),
                l.dirty());
            else if ("cuid" === c.kind)
              Z.test(e.data) ||
                (R((o = this._getOrReturnCtx(e, o)), {
                  validation: "cuid",
                  code: k.invalid_string,
                  message: c.message,
                }),
                l.dirty());
            else if ("cuid2" === c.kind)
              B.test(e.data) ||
                (R((o = this._getOrReturnCtx(e, o)), {
                  validation: "cuid2",
                  code: k.invalid_string,
                  message: c.message,
                }),
                l.dirty());
            else if ("ulid" === c.kind)
              q.test(e.data) ||
                (R((o = this._getOrReturnCtx(e, o)), {
                  validation: "ulid",
                  code: k.invalid_string,
                  message: c.message,
                }),
                l.dirty());
            else if ("url" === c.kind)
              try {
                new URL(e.data);
              } catch {
                R((o = this._getOrReturnCtx(e, o)), {
                  validation: "url",
                  code: k.invalid_string,
                  message: c.message,
                }),
                  l.dirty();
              }
            else
              "regex" === c.kind
                ? ((c.regex.lastIndex = 0),
                  c.regex.test(e.data) ||
                    (R((o = this._getOrReturnCtx(e, o)), {
                      validation: "regex",
                      code: k.invalid_string,
                      message: c.message,
                    }),
                    l.dirty()))
                : "trim" === c.kind
                  ? (e.data = e.data.trim())
                  : "includes" === c.kind
                    ? e.data.includes(c.value, c.position) ||
                      (R((o = this._getOrReturnCtx(e, o)), {
                        code: k.invalid_string,
                        validation: { includes: c.value, position: c.position },
                        message: c.message,
                      }),
                      l.dirty())
                    : "toLowerCase" === c.kind
                      ? (e.data = e.data.toLowerCase())
                      : "toUpperCase" === c.kind
                        ? (e.data = e.data.toUpperCase())
                        : "startsWith" === c.kind
                          ? e.data.startsWith(c.value) ||
                            (R((o = this._getOrReturnCtx(e, o)), {
                              code: k.invalid_string,
                              validation: { startsWith: c.value },
                              message: c.message,
                            }),
                            l.dirty())
                          : "endsWith" === c.kind
                            ? e.data.endsWith(c.value) ||
                              (R((o = this._getOrReturnCtx(e, o)), {
                                code: k.invalid_string,
                                validation: { endsWith: c.value },
                                message: c.message,
                              }),
                              l.dirty())
                            : "datetime" === c.kind
                              ? (function (e) {
                                  let t = `${ee}T${es(e)}`,
                                    s = [];
                                  return (
                                    s.push(e.local ? "Z?" : "Z"),
                                    e.offset && s.push("([+-]\\d{2}:?\\d{2})"),
                                    (t = `${t}(${s.join("|")})`),
                                    RegExp(`^${t}$`)
                                  );
                                })(c).test(e.data) ||
                                (R((o = this._getOrReturnCtx(e, o)), {
                                  code: k.invalid_string,
                                  validation: "datetime",
                                  message: c.message,
                                }),
                                l.dirty())
                              : "date" === c.kind
                                ? et.test(e.data) ||
                                  (R((o = this._getOrReturnCtx(e, o)), {
                                    code: k.invalid_string,
                                    validation: "date",
                                    message: c.message,
                                  }),
                                  l.dirty())
                                : "time" === c.kind
                                  ? RegExp(`^${es(c)}$`).test(e.data) ||
                                    (R((o = this._getOrReturnCtx(e, o)), {
                                      code: k.invalid_string,
                                      validation: "time",
                                      message: c.message,
                                    }),
                                    l.dirty())
                                  : "duration" === c.kind
                                    ? z.test(e.data) ||
                                      (R((o = this._getOrReturnCtx(e, o)), {
                                        validation: "duration",
                                        code: k.invalid_string,
                                        message: c.message,
                                      }),
                                      l.dirty())
                                    : "ip" === c.kind
                                      ? ((t = e.data),
                                        !(
                                          (("v4" === (s = c.version) || !s) &&
                                            J.test(t)) ||
                                          (("v6" === s || !s) && X.test(t))
                                        ) &&
                                          1 &&
                                          (R((o = this._getOrReturnCtx(e, o)), {
                                            validation: "ip",
                                            code: k.invalid_string,
                                            message: c.message,
                                          }),
                                          l.dirty()))
                                      : "jwt" === c.kind
                                        ? !(function (e, t) {
                                            if (!W.test(e)) return !1;
                                            try {
                                              let [s] = e.split("."),
                                                r = s
                                                  .replace(/-/g, "+")
                                                  .replace(/_/g, "/")
                                                  .padEnd(
                                                    s.length +
                                                      ((4 - (s.length % 4)) %
                                                        4),
                                                    "=",
                                                  ),
                                                n = JSON.parse(atob(r));
                                              if (
                                                "object" != typeof n ||
                                                null === n ||
                                                ("typ" in n &&
                                                  n?.typ !== "JWT") ||
                                                !n.alg ||
                                                (t && n.alg !== t)
                                              )
                                                return !1;
                                              return !0;
                                            } catch {
                                              return !1;
                                            }
                                          })(e.data, c.alg) &&
                                          (R((o = this._getOrReturnCtx(e, o)), {
                                            validation: "jwt",
                                            code: k.invalid_string,
                                            message: c.message,
                                          }),
                                          l.dirty())
                                        : "cidr" === c.kind
                                          ? ((a = e.data),
                                            !(
                                              (("v4" === (i = c.version) ||
                                                !i) &&
                                                K.test(a)) ||
                                              (("v6" === i || !i) && G.test(a))
                                            ) &&
                                              1 &&
                                              (R(
                                                (o = this._getOrReturnCtx(
                                                  e,
                                                  o,
                                                )),
                                                {
                                                  validation: "cidr",
                                                  code: k.invalid_string,
                                                  message: c.message,
                                                },
                                              ),
                                              l.dirty()))
                                          : "base64" === c.kind
                                            ? Y.test(e.data) ||
                                              (R(
                                                (o = this._getOrReturnCtx(
                                                  e,
                                                  o,
                                                )),
                                                {
                                                  validation: "base64",
                                                  code: k.invalid_string,
                                                  message: c.message,
                                                },
                                              ),
                                              l.dirty())
                                            : "base64url" === c.kind
                                              ? Q.test(e.data) ||
                                                (R(
                                                  (o = this._getOrReturnCtx(
                                                    e,
                                                    o,
                                                  )),
                                                  {
                                                    validation: "base64url",
                                                    code: k.invalid_string,
                                                    message: c.message,
                                                  },
                                                ),
                                                l.dirty())
                                              : n.assertNever(c);
          return { status: l.value, value: e.data };
        }
        _regex(e, t, s) {
          return this.refinement((t) => e.test(t), {
            validation: t,
            code: k.invalid_string,
            ...i.errToObj(s),
          });
        }
        _addCheck(e) {
          return new er({ ...this._def, checks: [...this._def.checks, e] });
        }
        email(e) {
          return this._addCheck({ kind: "email", ...i.errToObj(e) });
        }
        url(e) {
          return this._addCheck({ kind: "url", ...i.errToObj(e) });
        }
        emoji(e) {
          return this._addCheck({ kind: "emoji", ...i.errToObj(e) });
        }
        uuid(e) {
          return this._addCheck({ kind: "uuid", ...i.errToObj(e) });
        }
        nanoid(e) {
          return this._addCheck({ kind: "nanoid", ...i.errToObj(e) });
        }
        cuid(e) {
          return this._addCheck({ kind: "cuid", ...i.errToObj(e) });
        }
        cuid2(e) {
          return this._addCheck({ kind: "cuid2", ...i.errToObj(e) });
        }
        ulid(e) {
          return this._addCheck({ kind: "ulid", ...i.errToObj(e) });
        }
        base64(e) {
          return this._addCheck({ kind: "base64", ...i.errToObj(e) });
        }
        base64url(e) {
          return this._addCheck({ kind: "base64url", ...i.errToObj(e) });
        }
        jwt(e) {
          return this._addCheck({ kind: "jwt", ...i.errToObj(e) });
        }
        ip(e) {
          return this._addCheck({ kind: "ip", ...i.errToObj(e) });
        }
        cidr(e) {
          return this._addCheck({ kind: "cidr", ...i.errToObj(e) });
        }
        datetime(e) {
          return "string" == typeof e
            ? this._addCheck({
                kind: "datetime",
                precision: null,
                offset: !1,
                local: !1,
                message: e,
              })
            : this._addCheck({
                kind: "datetime",
                precision: void 0 === e?.precision ? null : e?.precision,
                offset: e?.offset ?? !1,
                local: e?.local ?? !1,
                ...i.errToObj(e?.message),
              });
        }
        date(e) {
          return this._addCheck({ kind: "date", message: e });
        }
        time(e) {
          return "string" == typeof e
            ? this._addCheck({ kind: "time", precision: null, message: e })
            : this._addCheck({
                kind: "time",
                precision: void 0 === e?.precision ? null : e?.precision,
                ...i.errToObj(e?.message),
              });
        }
        duration(e) {
          return this._addCheck({ kind: "duration", ...i.errToObj(e) });
        }
        regex(e, t) {
          return this._addCheck({ kind: "regex", regex: e, ...i.errToObj(t) });
        }
        includes(e, t) {
          return this._addCheck({
            kind: "includes",
            value: e,
            position: t?.position,
            ...i.errToObj(t?.message),
          });
        }
        startsWith(e, t) {
          return this._addCheck({
            kind: "startsWith",
            value: e,
            ...i.errToObj(t),
          });
        }
        endsWith(e, t) {
          return this._addCheck({
            kind: "endsWith",
            value: e,
            ...i.errToObj(t),
          });
        }
        min(e, t) {
          return this._addCheck({ kind: "min", value: e, ...i.errToObj(t) });
        }
        max(e, t) {
          return this._addCheck({ kind: "max", value: e, ...i.errToObj(t) });
        }
        length(e, t) {
          return this._addCheck({ kind: "length", value: e, ...i.errToObj(t) });
        }
        nonempty(e) {
          return this.min(1, i.errToObj(e));
        }
        trim() {
          return new er({
            ...this._def,
            checks: [...this._def.checks, { kind: "trim" }],
          });
        }
        toLowerCase() {
          return new er({
            ...this._def,
            checks: [...this._def.checks, { kind: "toLowerCase" }],
          });
        }
        toUpperCase() {
          return new er({
            ...this._def,
            checks: [...this._def.checks, { kind: "toUpperCase" }],
          });
        }
        get isDatetime() {
          return !!this._def.checks.find((e) => "datetime" === e.kind);
        }
        get isDate() {
          return !!this._def.checks.find((e) => "date" === e.kind);
        }
        get isTime() {
          return !!this._def.checks.find((e) => "time" === e.kind);
        }
        get isDuration() {
          return !!this._def.checks.find((e) => "duration" === e.kind);
        }
        get isEmail() {
          return !!this._def.checks.find((e) => "email" === e.kind);
        }
        get isURL() {
          return !!this._def.checks.find((e) => "url" === e.kind);
        }
        get isEmoji() {
          return !!this._def.checks.find((e) => "emoji" === e.kind);
        }
        get isUUID() {
          return !!this._def.checks.find((e) => "uuid" === e.kind);
        }
        get isNANOID() {
          return !!this._def.checks.find((e) => "nanoid" === e.kind);
        }
        get isCUID() {
          return !!this._def.checks.find((e) => "cuid" === e.kind);
        }
        get isCUID2() {
          return !!this._def.checks.find((e) => "cuid2" === e.kind);
        }
        get isULID() {
          return !!this._def.checks.find((e) => "ulid" === e.kind);
        }
        get isIP() {
          return !!this._def.checks.find((e) => "ip" === e.kind);
        }
        get isCIDR() {
          return !!this._def.checks.find((e) => "cidr" === e.kind);
        }
        get isBase64() {
          return !!this._def.checks.find((e) => "base64" === e.kind);
        }
        get isBase64url() {
          return !!this._def.checks.find((e) => "base64url" === e.kind);
        }
        get minLength() {
          let e = null;
          for (let t of this._def.checks)
            "min" === t.kind && (null === e || t.value > e) && (e = t.value);
          return e;
        }
        get maxLength() {
          let e = null;
          for (let t of this._def.checks)
            "max" === t.kind && (null === e || t.value < e) && (e = t.value);
          return e;
        }
      }
      er.create = (e) =>
        new er({
          checks: [],
          typeName: o.ZodString,
          coerce: e?.coerce ?? !1,
          ...F(e),
        });
      class en extends D {
        constructor() {
          super(...arguments),
            (this.min = this.gte),
            (this.max = this.lte),
            (this.step = this.multipleOf);
        }
        _parse(e) {
          let t;
          if (
            (this._def.coerce && (e.data = Number(e.data)),
            this._getType(e) !== b.number)
          ) {
            let t = this._getOrReturnCtx(e);
            return (
              R(t, {
                code: k.invalid_type,
                expected: b.number,
                received: t.parsedType,
              }),
              C
            );
          }
          let s = new E();
          for (let r of this._def.checks)
            "int" === r.kind
              ? n.isInteger(e.data) ||
                (R((t = this._getOrReturnCtx(e, t)), {
                  code: k.invalid_type,
                  expected: "integer",
                  received: "float",
                  message: r.message,
                }),
                s.dirty())
              : "min" === r.kind
                ? (r.inclusive ? e.data < r.value : e.data <= r.value) &&
                  (R((t = this._getOrReturnCtx(e, t)), {
                    code: k.too_small,
                    minimum: r.value,
                    type: "number",
                    inclusive: r.inclusive,
                    exact: !1,
                    message: r.message,
                  }),
                  s.dirty())
                : "max" === r.kind
                  ? (r.inclusive ? e.data > r.value : e.data >= r.value) &&
                    (R((t = this._getOrReturnCtx(e, t)), {
                      code: k.too_big,
                      maximum: r.value,
                      type: "number",
                      inclusive: r.inclusive,
                      exact: !1,
                      message: r.message,
                    }),
                    s.dirty())
                  : "multipleOf" === r.kind
                    ? 0 !==
                        (function (e, t) {
                          let s = (e.toString().split(".")[1] || "").length,
                            r = (t.toString().split(".")[1] || "").length,
                            n = s > r ? s : r;
                          return (
                            (Number.parseInt(e.toFixed(n).replace(".", "")) %
                              Number.parseInt(t.toFixed(n).replace(".", ""))) /
                            10 ** n
                          );
                        })(e.data, r.value) &&
                      (R((t = this._getOrReturnCtx(e, t)), {
                        code: k.not_multiple_of,
                        multipleOf: r.value,
                        message: r.message,
                      }),
                      s.dirty())
                    : "finite" === r.kind
                      ? Number.isFinite(e.data) ||
                        (R((t = this._getOrReturnCtx(e, t)), {
                          code: k.not_finite,
                          message: r.message,
                        }),
                        s.dirty())
                      : n.assertNever(r);
          return { status: s.value, value: e.data };
        }
        gte(e, t) {
          return this.setLimit("min", e, !0, i.toString(t));
        }
        gt(e, t) {
          return this.setLimit("min", e, !1, i.toString(t));
        }
        lte(e, t) {
          return this.setLimit("max", e, !0, i.toString(t));
        }
        lt(e, t) {
          return this.setLimit("max", e, !1, i.toString(t));
        }
        setLimit(e, t, s, r) {
          return new en({
            ...this._def,
            checks: [
              ...this._def.checks,
              { kind: e, value: t, inclusive: s, message: i.toString(r) },
            ],
          });
        }
        _addCheck(e) {
          return new en({ ...this._def, checks: [...this._def.checks, e] });
        }
        int(e) {
          return this._addCheck({ kind: "int", message: i.toString(e) });
        }
        positive(e) {
          return this._addCheck({
            kind: "min",
            value: 0,
            inclusive: !1,
            message: i.toString(e),
          });
        }
        negative(e) {
          return this._addCheck({
            kind: "max",
            value: 0,
            inclusive: !1,
            message: i.toString(e),
          });
        }
        nonpositive(e) {
          return this._addCheck({
            kind: "max",
            value: 0,
            inclusive: !0,
            message: i.toString(e),
          });
        }
        nonnegative(e) {
          return this._addCheck({
            kind: "min",
            value: 0,
            inclusive: !0,
            message: i.toString(e),
          });
        }
        multipleOf(e, t) {
          return this._addCheck({
            kind: "multipleOf",
            value: e,
            message: i.toString(t),
          });
        }
        finite(e) {
          return this._addCheck({ kind: "finite", message: i.toString(e) });
        }
        safe(e) {
          return this._addCheck({
            kind: "min",
            inclusive: !0,
            value: Number.MIN_SAFE_INTEGER,
            message: i.toString(e),
          })._addCheck({
            kind: "max",
            inclusive: !0,
            value: Number.MAX_SAFE_INTEGER,
            message: i.toString(e),
          });
        }
        get minValue() {
          let e = null;
          for (let t of this._def.checks)
            "min" === t.kind && (null === e || t.value > e) && (e = t.value);
          return e;
        }
        get maxValue() {
          let e = null;
          for (let t of this._def.checks)
            "max" === t.kind && (null === e || t.value < e) && (e = t.value);
          return e;
        }
        get isInt() {
          return !!this._def.checks.find(
            (e) =>
              "int" === e.kind ||
              ("multipleOf" === e.kind && n.isInteger(e.value)),
          );
        }
        get isFinite() {
          let e = null,
            t = null;
          for (let s of this._def.checks)
            if (
              "finite" === s.kind ||
              "int" === s.kind ||
              "multipleOf" === s.kind
            )
              return !0;
            else
              "min" === s.kind
                ? (null === t || s.value > t) && (t = s.value)
                : "max" === s.kind &&
                  (null === e || s.value < e) &&
                  (e = s.value);
          return Number.isFinite(t) && Number.isFinite(e);
        }
      }
      en.create = (e) =>
        new en({
          checks: [],
          typeName: o.ZodNumber,
          coerce: e?.coerce || !1,
          ...F(e),
        });
      class ea extends D {
        constructor() {
          super(...arguments), (this.min = this.gte), (this.max = this.lte);
        }
        _parse(e) {
          let t;
          if (this._def.coerce)
            try {
              e.data = BigInt(e.data);
            } catch {
              return this._getInvalidInput(e);
            }
          if (this._getType(e) !== b.bigint) return this._getInvalidInput(e);
          let s = new E();
          for (let r of this._def.checks)
            "min" === r.kind
              ? (r.inclusive ? e.data < r.value : e.data <= r.value) &&
                (R((t = this._getOrReturnCtx(e, t)), {
                  code: k.too_small,
                  type: "bigint",
                  minimum: r.value,
                  inclusive: r.inclusive,
                  message: r.message,
                }),
                s.dirty())
              : "max" === r.kind
                ? (r.inclusive ? e.data > r.value : e.data >= r.value) &&
                  (R((t = this._getOrReturnCtx(e, t)), {
                    code: k.too_big,
                    type: "bigint",
                    maximum: r.value,
                    inclusive: r.inclusive,
                    message: r.message,
                  }),
                  s.dirty())
                : "multipleOf" === r.kind
                  ? e.data % r.value !== BigInt(0) &&
                    (R((t = this._getOrReturnCtx(e, t)), {
                      code: k.not_multiple_of,
                      multipleOf: r.value,
                      message: r.message,
                    }),
                    s.dirty())
                  : n.assertNever(r);
          return { status: s.value, value: e.data };
        }
        _getInvalidInput(e) {
          let t = this._getOrReturnCtx(e);
          return (
            R(t, {
              code: k.invalid_type,
              expected: b.bigint,
              received: t.parsedType,
            }),
            C
          );
        }
        gte(e, t) {
          return this.setLimit("min", e, !0, i.toString(t));
        }
        gt(e, t) {
          return this.setLimit("min", e, !1, i.toString(t));
        }
        lte(e, t) {
          return this.setLimit("max", e, !0, i.toString(t));
        }
        lt(e, t) {
          return this.setLimit("max", e, !1, i.toString(t));
        }
        setLimit(e, t, s, r) {
          return new ea({
            ...this._def,
            checks: [
              ...this._def.checks,
              { kind: e, value: t, inclusive: s, message: i.toString(r) },
            ],
          });
        }
        _addCheck(e) {
          return new ea({ ...this._def, checks: [...this._def.checks, e] });
        }
        positive(e) {
          return this._addCheck({
            kind: "min",
            value: BigInt(0),
            inclusive: !1,
            message: i.toString(e),
          });
        }
        negative(e) {
          return this._addCheck({
            kind: "max",
            value: BigInt(0),
            inclusive: !1,
            message: i.toString(e),
          });
        }
        nonpositive(e) {
          return this._addCheck({
            kind: "max",
            value: BigInt(0),
            inclusive: !0,
            message: i.toString(e),
          });
        }
        nonnegative(e) {
          return this._addCheck({
            kind: "min",
            value: BigInt(0),
            inclusive: !0,
            message: i.toString(e),
          });
        }
        multipleOf(e, t) {
          return this._addCheck({
            kind: "multipleOf",
            value: e,
            message: i.toString(t),
          });
        }
        get minValue() {
          let e = null;
          for (let t of this._def.checks)
            "min" === t.kind && (null === e || t.value > e) && (e = t.value);
          return e;
        }
        get maxValue() {
          let e = null;
          for (let t of this._def.checks)
            "max" === t.kind && (null === e || t.value < e) && (e = t.value);
          return e;
        }
      }
      ea.create = (e) =>
        new ea({
          checks: [],
          typeName: o.ZodBigInt,
          coerce: e?.coerce ?? !1,
          ...F(e),
        });
      class ei extends D {
        _parse(e) {
          if (
            (this._def.coerce && (e.data = !!e.data),
            this._getType(e) !== b.boolean)
          ) {
            let t = this._getOrReturnCtx(e);
            return (
              R(t, {
                code: k.invalid_type,
                expected: b.boolean,
                received: t.parsedType,
              }),
              C
            );
          }
          return P(e.data);
        }
      }
      ei.create = (e) =>
        new ei({ typeName: o.ZodBoolean, coerce: e?.coerce || !1, ...F(e) });
      class eo extends D {
        _parse(e) {
          let t;
          if (
            (this._def.coerce && (e.data = new Date(e.data)),
            this._getType(e) !== b.date)
          ) {
            let t = this._getOrReturnCtx(e);
            return (
              R(t, {
                code: k.invalid_type,
                expected: b.date,
                received: t.parsedType,
              }),
              C
            );
          }
          if (Number.isNaN(e.data.getTime()))
            return R(this._getOrReturnCtx(e), { code: k.invalid_date }), C;
          let s = new E();
          for (let r of this._def.checks)
            "min" === r.kind
              ? e.data.getTime() < r.value &&
                (R((t = this._getOrReturnCtx(e, t)), {
                  code: k.too_small,
                  message: r.message,
                  inclusive: !0,
                  exact: !1,
                  minimum: r.value,
                  type: "date",
                }),
                s.dirty())
              : "max" === r.kind
                ? e.data.getTime() > r.value &&
                  (R((t = this._getOrReturnCtx(e, t)), {
                    code: k.too_big,
                    message: r.message,
                    inclusive: !0,
                    exact: !1,
                    maximum: r.value,
                    type: "date",
                  }),
                  s.dirty())
                : n.assertNever(r);
          return { status: s.value, value: new Date(e.data.getTime()) };
        }
        _addCheck(e) {
          return new eo({ ...this._def, checks: [...this._def.checks, e] });
        }
        min(e, t) {
          return this._addCheck({
            kind: "min",
            value: e.getTime(),
            message: i.toString(t),
          });
        }
        max(e, t) {
          return this._addCheck({
            kind: "max",
            value: e.getTime(),
            message: i.toString(t),
          });
        }
        get minDate() {
          let e = null;
          for (let t of this._def.checks)
            "min" === t.kind && (null === e || t.value > e) && (e = t.value);
          return null != e ? new Date(e) : null;
        }
        get maxDate() {
          let e = null;
          for (let t of this._def.checks)
            "max" === t.kind && (null === e || t.value < e) && (e = t.value);
          return null != e ? new Date(e) : null;
        }
      }
      eo.create = (e) =>
        new eo({
          checks: [],
          coerce: e?.coerce || !1,
          typeName: o.ZodDate,
          ...F(e),
        });
      class el extends D {
        _parse(e) {
          if (this._getType(e) !== b.symbol) {
            let t = this._getOrReturnCtx(e);
            return (
              R(t, {
                code: k.invalid_type,
                expected: b.symbol,
                received: t.parsedType,
              }),
              C
            );
          }
          return P(e.data);
        }
      }
      el.create = (e) => new el({ typeName: o.ZodSymbol, ...F(e) });
      class ec extends D {
        _parse(e) {
          if (this._getType(e) !== b.undefined) {
            let t = this._getOrReturnCtx(e);
            return (
              R(t, {
                code: k.invalid_type,
                expected: b.undefined,
                received: t.parsedType,
              }),
              C
            );
          }
          return P(e.data);
        }
      }
      ec.create = (e) => new ec({ typeName: o.ZodUndefined, ...F(e) });
      class eu extends D {
        _parse(e) {
          if (this._getType(e) !== b.null) {
            let t = this._getOrReturnCtx(e);
            return (
              R(t, {
                code: k.invalid_type,
                expected: b.null,
                received: t.parsedType,
              }),
              C
            );
          }
          return P(e.data);
        }
      }
      eu.create = (e) => new eu({ typeName: o.ZodNull, ...F(e) });
      class ed extends D {
        constructor() {
          super(...arguments), (this._any = !0);
        }
        _parse(e) {
          return P(e.data);
        }
      }
      ed.create = (e) => new ed({ typeName: o.ZodAny, ...F(e) });
      class eh extends D {
        constructor() {
          super(...arguments), (this._unknown = !0);
        }
        _parse(e) {
          return P(e.data);
        }
      }
      eh.create = (e) => new eh({ typeName: o.ZodUnknown, ...F(e) });
      class ep extends D {
        _parse(e) {
          let t = this._getOrReturnCtx(e);
          return (
            R(t, {
              code: k.invalid_type,
              expected: b.never,
              received: t.parsedType,
            }),
            C
          );
        }
      }
      ep.create = (e) => new ep({ typeName: o.ZodNever, ...F(e) });
      class ef extends D {
        _parse(e) {
          if (this._getType(e) !== b.undefined) {
            let t = this._getOrReturnCtx(e);
            return (
              R(t, {
                code: k.invalid_type,
                expected: b.void,
                received: t.parsedType,
              }),
              C
            );
          }
          return P(e.data);
        }
      }
      ef.create = (e) => new ef({ typeName: o.ZodVoid, ...F(e) });
      class em extends D {
        _parse(e) {
          let { ctx: t, status: s } = this._processInputParams(e),
            r = this._def;
          if (t.parsedType !== b.array)
            return (
              R(t, {
                code: k.invalid_type,
                expected: b.array,
                received: t.parsedType,
              }),
              C
            );
          if (null !== r.exactLength) {
            let e = t.data.length > r.exactLength.value,
              n = t.data.length < r.exactLength.value;
            (e || n) &&
              (R(t, {
                code: e ? k.too_big : k.too_small,
                minimum: n ? r.exactLength.value : void 0,
                maximum: e ? r.exactLength.value : void 0,
                type: "array",
                inclusive: !0,
                exact: !0,
                message: r.exactLength.message,
              }),
              s.dirty());
          }
          if (
            (null !== r.minLength &&
              t.data.length < r.minLength.value &&
              (R(t, {
                code: k.too_small,
                minimum: r.minLength.value,
                type: "array",
                inclusive: !0,
                exact: !1,
                message: r.minLength.message,
              }),
              s.dirty()),
            null !== r.maxLength &&
              t.data.length > r.maxLength.value &&
              (R(t, {
                code: k.too_big,
                maximum: r.maxLength.value,
                type: "array",
                inclusive: !0,
                exact: !1,
                message: r.maxLength.message,
              }),
              s.dirty()),
            t.common.async)
          )
            return Promise.all(
              [...t.data].map((e, s) =>
                r.type._parseAsync(new L(t, e, t.path, s)),
              ),
            ).then((e) => E.mergeArray(s, e));
          let n = [...t.data].map((e, s) =>
            r.type._parseSync(new L(t, e, t.path, s)),
          );
          return E.mergeArray(s, n);
        }
        get element() {
          return this._def.type;
        }
        min(e, t) {
          return new em({
            ...this._def,
            minLength: { value: e, message: i.toString(t) },
          });
        }
        max(e, t) {
          return new em({
            ...this._def,
            maxLength: { value: e, message: i.toString(t) },
          });
        }
        length(e, t) {
          return new em({
            ...this._def,
            exactLength: { value: e, message: i.toString(t) },
          });
        }
        nonempty(e) {
          return this.min(1, e);
        }
      }
      em.create = (e, t) =>
        new em({
          type: e,
          minLength: null,
          maxLength: null,
          exactLength: null,
          typeName: o.ZodArray,
          ...F(t),
        });
      class eg extends D {
        constructor() {
          super(...arguments),
            (this._cached = null),
            (this.nonstrict = this.passthrough),
            (this.augment = this.extend);
        }
        _getCached() {
          if (null !== this._cached) return this._cached;
          let e = this._def.shape(),
            t = n.objectKeys(e);
          return (this._cached = { shape: e, keys: t }), this._cached;
        }
        _parse(e) {
          if (this._getType(e) !== b.object) {
            let t = this._getOrReturnCtx(e);
            return (
              R(t, {
                code: k.invalid_type,
                expected: b.object,
                received: t.parsedType,
              }),
              C
            );
          }
          let { status: t, ctx: s } = this._processInputParams(e),
            { shape: r, keys: n } = this._getCached(),
            a = [];
          if (
            !(
              this._def.catchall instanceof ep &&
              "strip" === this._def.unknownKeys
            )
          )
            for (let e in s.data) n.includes(e) || a.push(e);
          let i = [];
          for (let e of n) {
            let t = r[e],
              n = s.data[e];
            i.push({
              key: { status: "valid", value: e },
              value: t._parse(new L(s, n, s.path, e)),
              alwaysSet: e in s.data,
            });
          }
          if (this._def.catchall instanceof ep) {
            let e = this._def.unknownKeys;
            if ("passthrough" === e)
              for (let e of a)
                i.push({
                  key: { status: "valid", value: e },
                  value: { status: "valid", value: s.data[e] },
                });
            else if ("strict" === e)
              a.length > 0 &&
                (R(s, { code: k.unrecognized_keys, keys: a }), t.dirty());
            else if ("strip" === e);
            else
              throw Error(
                "Internal ZodObject error: invalid unknownKeys value.",
              );
          } else {
            let e = this._def.catchall;
            for (let t of a) {
              let r = s.data[t];
              i.push({
                key: { status: "valid", value: t },
                value: e._parse(new L(s, r, s.path, t)),
                alwaysSet: t in s.data,
              });
            }
          }
          return s.common.async
            ? Promise.resolve()
                .then(async () => {
                  let e = [];
                  for (let t of i) {
                    let s = await t.key,
                      r = await t.value;
                    e.push({ key: s, value: r, alwaysSet: t.alwaysSet });
                  }
                  return e;
                })
                .then((e) => E.mergeObjectSync(t, e))
            : E.mergeObjectSync(t, i);
        }
        get shape() {
          return this._def.shape();
        }
        strict(e) {
          return (
            i.errToObj,
            new eg({
              ...this._def,
              unknownKeys: "strict",
              ...(void 0 !== e
                ? {
                    errorMap: (t, s) => {
                      let r =
                        this._def.errorMap?.(t, s).message ?? s.defaultError;
                      return "unrecognized_keys" === t.code
                        ? { message: i.errToObj(e).message ?? r }
                        : { message: r };
                    },
                  }
                : {}),
            })
          );
        }
        strip() {
          return new eg({ ...this._def, unknownKeys: "strip" });
        }
        passthrough() {
          return new eg({ ...this._def, unknownKeys: "passthrough" });
        }
        extend(e) {
          return new eg({
            ...this._def,
            shape: () => ({ ...this._def.shape(), ...e }),
          });
        }
        merge(e) {
          return new eg({
            unknownKeys: e._def.unknownKeys,
            catchall: e._def.catchall,
            shape: () => ({ ...this._def.shape(), ...e._def.shape() }),
            typeName: o.ZodObject,
          });
        }
        setKey(e, t) {
          return this.augment({ [e]: t });
        }
        catchall(e) {
          return new eg({ ...this._def, catchall: e });
        }
        pick(e) {
          let t = {};
          for (let s of n.objectKeys(e))
            e[s] && this.shape[s] && (t[s] = this.shape[s]);
          return new eg({ ...this._def, shape: () => t });
        }
        omit(e) {
          let t = {};
          for (let s of n.objectKeys(this.shape))
            e[s] || (t[s] = this.shape[s]);
          return new eg({ ...this._def, shape: () => t });
        }
        deepPartial() {
          return (function e(t) {
            if (t instanceof eg) {
              let s = {};
              for (let r in t.shape) {
                let n = t.shape[r];
                s[r] = eT.create(e(n));
              }
              return new eg({ ...t._def, shape: () => s });
            }
            if (t instanceof em)
              return new em({ ...t._def, type: e(t.element) });
            if (t instanceof eT) return eT.create(e(t.unwrap()));
            if (t instanceof ej) return ej.create(e(t.unwrap()));
            if (t instanceof eb) return eb.create(t.items.map((t) => e(t)));
            else return t;
          })(this);
        }
        partial(e) {
          let t = {};
          for (let s of n.objectKeys(this.shape)) {
            let r = this.shape[s];
            e && !e[s] ? (t[s] = r) : (t[s] = r.optional());
          }
          return new eg({ ...this._def, shape: () => t });
        }
        required(e) {
          let t = {};
          for (let s of n.objectKeys(this.shape))
            if (e && !e[s]) t[s] = this.shape[s];
            else {
              let e = this.shape[s];
              for (; e instanceof eT; ) e = e._def.innerType;
              t[s] = e;
            }
          return new eg({ ...this._def, shape: () => t });
        }
        keyof() {
          return eE(n.objectKeys(this.shape));
        }
      }
      (eg.create = (e, t) =>
        new eg({
          shape: () => e,
          unknownKeys: "strip",
          catchall: ep.create(),
          typeName: o.ZodObject,
          ...F(t),
        })),
        (eg.strictCreate = (e, t) =>
          new eg({
            shape: () => e,
            unknownKeys: "strict",
            catchall: ep.create(),
            typeName: o.ZodObject,
            ...F(t),
          })),
        (eg.lazycreate = (e, t) =>
          new eg({
            shape: e,
            unknownKeys: "strip",
            catchall: ep.create(),
            typeName: o.ZodObject,
            ...F(t),
          }));
      class ey extends D {
        _parse(e) {
          let { ctx: t } = this._processInputParams(e),
            s = this._def.options;
          if (t.common.async)
            return Promise.all(
              s.map(async (e) => {
                let s = {
                  ...t,
                  common: { ...t.common, issues: [] },
                  parent: null,
                };
                return {
                  result: await e._parseAsync({
                    data: t.data,
                    path: t.path,
                    parent: s,
                  }),
                  ctx: s,
                };
              }),
            ).then(function (e) {
              for (let t of e) if ("valid" === t.result.status) return t.result;
              for (let s of e)
                if ("dirty" === s.result.status)
                  return t.common.issues.push(...s.ctx.common.issues), s.result;
              let s = e.map((e) => new A(e.ctx.common.issues));
              return R(t, { code: k.invalid_union, unionErrors: s }), C;
            });
          {
            let e,
              r = [];
            for (let n of s) {
              let s = {
                  ...t,
                  common: { ...t.common, issues: [] },
                  parent: null,
                },
                a = n._parseSync({ data: t.data, path: t.path, parent: s });
              if ("valid" === a.status) return a;
              "dirty" !== a.status || e || (e = { result: a, ctx: s }),
                s.common.issues.length && r.push(s.common.issues);
            }
            if (e)
              return t.common.issues.push(...e.ctx.common.issues), e.result;
            let n = r.map((e) => new A(e));
            return R(t, { code: k.invalid_union, unionErrors: n }), C;
          }
        }
        get options() {
          return this._def.options;
        }
      }
      ey.create = (e, t) =>
        new ey({ options: e, typeName: o.ZodUnion, ...F(t) });
      let e_ = (e) => {
        if (e instanceof eS) return e_(e.schema);
        if (e instanceof eI) return e_(e.innerType());
        if (e instanceof eR) return [e.value];
        if (e instanceof eC) return e.options;
        if (e instanceof e$) return n.objectValues(e.enum);
        else if (e instanceof eN) return e_(e._def.innerType);
        else if (e instanceof ec) return [void 0];
        else if (e instanceof eu) return [null];
        else if (e instanceof eT) return [void 0, ...e_(e.unwrap())];
        else if (e instanceof ej) return [null, ...e_(e.unwrap())];
        else if (e instanceof eF) return e_(e.unwrap());
        else if (e instanceof eZ) return e_(e.unwrap());
        else if (e instanceof eL) return e_(e._def.innerType);
        else return [];
      };
      class ev extends D {
        _parse(e) {
          let { ctx: t } = this._processInputParams(e);
          if (t.parsedType !== b.object)
            return (
              R(t, {
                code: k.invalid_type,
                expected: b.object,
                received: t.parsedType,
              }),
              C
            );
          let s = this.discriminator,
            r = t.data[s],
            n = this.optionsMap.get(r);
          return n
            ? t.common.async
              ? n._parseAsync({ data: t.data, path: t.path, parent: t })
              : n._parseSync({ data: t.data, path: t.path, parent: t })
            : (R(t, {
                code: k.invalid_union_discriminator,
                options: Array.from(this.optionsMap.keys()),
                path: [s],
              }),
              C);
        }
        get discriminator() {
          return this._def.discriminator;
        }
        get options() {
          return this._def.options;
        }
        get optionsMap() {
          return this._def.optionsMap;
        }
        static create(e, t, s) {
          let r = new Map();
          for (let s of t) {
            let t = e_(s.shape[e]);
            if (!t.length)
              throw Error(
                `A discriminator value for key \`${e}\` could not be extracted from all schema options`,
              );
            for (let n of t) {
              if (r.has(n))
                throw Error(
                  `Discriminator property ${String(e)} has duplicate value ${String(n)}`,
                );
              r.set(n, s);
            }
          }
          return new ev({
            typeName: o.ZodDiscriminatedUnion,
            discriminator: e,
            options: t,
            optionsMap: r,
            ...F(s),
          });
        }
      }
      class ew extends D {
        _parse(e) {
          let { status: t, ctx: s } = this._processInputParams(e),
            r = (e, r) => {
              if (I(e) || I(r)) return C;
              let a = (function e(t, s) {
                let r = x(t),
                  a = x(s);
                if (t === s) return { valid: !0, data: t };
                if (r === b.object && a === b.object) {
                  let r = n.objectKeys(s),
                    a = n.objectKeys(t).filter((e) => -1 !== r.indexOf(e)),
                    i = { ...t, ...s };
                  for (let r of a) {
                    let n = e(t[r], s[r]);
                    if (!n.valid) return { valid: !1 };
                    i[r] = n.data;
                  }
                  return { valid: !0, data: i };
                }
                if (r === b.array && a === b.array) {
                  if (t.length !== s.length) return { valid: !1 };
                  let r = [];
                  for (let n = 0; n < t.length; n++) {
                    let a = e(t[n], s[n]);
                    if (!a.valid) return { valid: !1 };
                    r.push(a.data);
                  }
                  return { valid: !0, data: r };
                }
                if (r === b.date && a === b.date && +t == +s)
                  return { valid: !0, data: t };
                return { valid: !1 };
              })(e.value, r.value);
              return a.valid
                ? ((T(e) || T(r)) && t.dirty(),
                  { status: t.value, value: a.data })
                : (R(s, { code: k.invalid_intersection_types }), C);
            };
          return s.common.async
            ? Promise.all([
                this._def.left._parseAsync({
                  data: s.data,
                  path: s.path,
                  parent: s,
                }),
                this._def.right._parseAsync({
                  data: s.data,
                  path: s.path,
                  parent: s,
                }),
              ]).then(([e, t]) => r(e, t))
            : r(
                this._def.left._parseSync({
                  data: s.data,
                  path: s.path,
                  parent: s,
                }),
                this._def.right._parseSync({
                  data: s.data,
                  path: s.path,
                  parent: s,
                }),
              );
        }
      }
      ew.create = (e, t, s) =>
        new ew({ left: e, right: t, typeName: o.ZodIntersection, ...F(s) });
      class eb extends D {
        _parse(e) {
          let { status: t, ctx: s } = this._processInputParams(e);
          if (s.parsedType !== b.array)
            return (
              R(s, {
                code: k.invalid_type,
                expected: b.array,
                received: s.parsedType,
              }),
              C
            );
          if (s.data.length < this._def.items.length)
            return (
              R(s, {
                code: k.too_small,
                minimum: this._def.items.length,
                inclusive: !0,
                exact: !1,
                type: "array",
              }),
              C
            );
          !this._def.rest &&
            s.data.length > this._def.items.length &&
            (R(s, {
              code: k.too_big,
              maximum: this._def.items.length,
              inclusive: !0,
              exact: !1,
              type: "array",
            }),
            t.dirty());
          let r = [...s.data]
            .map((e, t) => {
              let r = this._def.items[t] || this._def.rest;
              return r ? r._parse(new L(s, e, s.path, t)) : null;
            })
            .filter((e) => !!e);
          return s.common.async
            ? Promise.all(r).then((e) => E.mergeArray(t, e))
            : E.mergeArray(t, r);
        }
        get items() {
          return this._def.items;
        }
        rest(e) {
          return new eb({ ...this._def, rest: e });
        }
      }
      eb.create = (e, t) => {
        if (!Array.isArray(e))
          throw Error("You must pass an array of schemas to z.tuple([ ... ])");
        return new eb({ items: e, typeName: o.ZodTuple, rest: null, ...F(t) });
      };
      class ex extends D {
        get keySchema() {
          return this._def.keyType;
        }
        get valueSchema() {
          return this._def.valueType;
        }
        _parse(e) {
          let { status: t, ctx: s } = this._processInputParams(e);
          if (s.parsedType !== b.object)
            return (
              R(s, {
                code: k.invalid_type,
                expected: b.object,
                received: s.parsedType,
              }),
              C
            );
          let r = [],
            n = this._def.keyType,
            a = this._def.valueType;
          for (let e in s.data)
            r.push({
              key: n._parse(new L(s, e, s.path, e)),
              value: a._parse(new L(s, s.data[e], s.path, e)),
              alwaysSet: e in s.data,
            });
          return s.common.async
            ? E.mergeObjectAsync(t, r)
            : E.mergeObjectSync(t, r);
        }
        get element() {
          return this._def.valueType;
        }
        static create(e, t, s) {
          return new ex(
            t instanceof D
              ? { keyType: e, valueType: t, typeName: o.ZodRecord, ...F(s) }
              : {
                  keyType: er.create(),
                  valueType: e,
                  typeName: o.ZodRecord,
                  ...F(t),
                },
          );
        }
      }
      class ek extends D {
        get keySchema() {
          return this._def.keyType;
        }
        get valueSchema() {
          return this._def.valueType;
        }
        _parse(e) {
          let { status: t, ctx: s } = this._processInputParams(e);
          if (s.parsedType !== b.map)
            return (
              R(s, {
                code: k.invalid_type,
                expected: b.map,
                received: s.parsedType,
              }),
              C
            );
          let r = this._def.keyType,
            n = this._def.valueType,
            a = [...s.data.entries()].map(([e, t], a) => ({
              key: r._parse(new L(s, e, s.path, [a, "key"])),
              value: n._parse(new L(s, t, s.path, [a, "value"])),
            }));
          if (s.common.async) {
            let e = new Map();
            return Promise.resolve().then(async () => {
              for (let s of a) {
                let r = await s.key,
                  n = await s.value;
                if ("aborted" === r.status || "aborted" === n.status) return C;
                ("dirty" === r.status || "dirty" === n.status) && t.dirty(),
                  e.set(r.value, n.value);
              }
              return { status: t.value, value: e };
            });
          }
          {
            let e = new Map();
            for (let s of a) {
              let r = s.key,
                n = s.value;
              if ("aborted" === r.status || "aborted" === n.status) return C;
              ("dirty" === r.status || "dirty" === n.status) && t.dirty(),
                e.set(r.value, n.value);
            }
            return { status: t.value, value: e };
          }
        }
      }
      ek.create = (e, t, s) =>
        new ek({ valueType: t, keyType: e, typeName: o.ZodMap, ...F(s) });
      class eA extends D {
        _parse(e) {
          let { status: t, ctx: s } = this._processInputParams(e);
          if (s.parsedType !== b.set)
            return (
              R(s, {
                code: k.invalid_type,
                expected: b.set,
                received: s.parsedType,
              }),
              C
            );
          let r = this._def;
          null !== r.minSize &&
            s.data.size < r.minSize.value &&
            (R(s, {
              code: k.too_small,
              minimum: r.minSize.value,
              type: "set",
              inclusive: !0,
              exact: !1,
              message: r.minSize.message,
            }),
            t.dirty()),
            null !== r.maxSize &&
              s.data.size > r.maxSize.value &&
              (R(s, {
                code: k.too_big,
                maximum: r.maxSize.value,
                type: "set",
                inclusive: !0,
                exact: !1,
                message: r.maxSize.message,
              }),
              t.dirty());
          let n = this._def.valueType;
          function a(e) {
            let s = new Set();
            for (let r of e) {
              if ("aborted" === r.status) return C;
              "dirty" === r.status && t.dirty(), s.add(r.value);
            }
            return { status: t.value, value: s };
          }
          let i = [...s.data.values()].map((e, t) =>
            n._parse(new L(s, e, s.path, t)),
          );
          return s.common.async ? Promise.all(i).then((e) => a(e)) : a(i);
        }
        min(e, t) {
          return new eA({
            ...this._def,
            minSize: { value: e, message: i.toString(t) },
          });
        }
        max(e, t) {
          return new eA({
            ...this._def,
            maxSize: { value: e, message: i.toString(t) },
          });
        }
        size(e, t) {
          return this.min(e, t).max(e, t);
        }
        nonempty(e) {
          return this.min(1, e);
        }
      }
      eA.create = (e, t) =>
        new eA({
          valueType: e,
          minSize: null,
          maxSize: null,
          typeName: o.ZodSet,
          ...F(t),
        });
      class eO extends D {
        constructor() {
          super(...arguments), (this.validate = this.implement);
        }
        _parse(e) {
          let { ctx: t } = this._processInputParams(e);
          if (t.parsedType !== b.function)
            return (
              R(t, {
                code: k.invalid_type,
                expected: b.function,
                received: t.parsedType,
              }),
              C
            );
          function s(e, s) {
            return S({
              data: e,
              path: t.path,
              errorMaps: [
                t.common.contextualErrorMap,
                t.schemaErrorMap,
                O,
                O,
              ].filter((e) => !!e),
              issueData: { code: k.invalid_arguments, argumentsError: s },
            });
          }
          function r(e, s) {
            return S({
              data: e,
              path: t.path,
              errorMaps: [
                t.common.contextualErrorMap,
                t.schemaErrorMap,
                O,
                O,
              ].filter((e) => !!e),
              issueData: { code: k.invalid_return_type, returnTypeError: s },
            });
          }
          let n = { errorMap: t.common.contextualErrorMap },
            a = t.data;
          if (this._def.returns instanceof eP) {
            let e = this;
            return P(async function (...t) {
              let i = new A([]),
                o = await e._def.args.parseAsync(t, n).catch((e) => {
                  throw (i.addIssue(s(t, e)), i);
                }),
                l = await Reflect.apply(a, this, o);
              return await e._def.returns._def.type
                .parseAsync(l, n)
                .catch((e) => {
                  throw (i.addIssue(r(l, e)), i);
                });
            });
          }
          {
            let e = this;
            return P(function (...t) {
              let i = e._def.args.safeParse(t, n);
              if (!i.success) throw new A([s(t, i.error)]);
              let o = Reflect.apply(a, this, i.data),
                l = e._def.returns.safeParse(o, n);
              if (!l.success) throw new A([r(o, l.error)]);
              return l.data;
            });
          }
        }
        parameters() {
          return this._def.args;
        }
        returnType() {
          return this._def.returns;
        }
        args(...e) {
          return new eO({ ...this._def, args: eb.create(e).rest(eh.create()) });
        }
        returns(e) {
          return new eO({ ...this._def, returns: e });
        }
        implement(e) {
          return this.parse(e);
        }
        strictImplement(e) {
          return this.parse(e);
        }
        static create(e, t, s) {
          return new eO({
            args: e || eb.create([]).rest(eh.create()),
            returns: t || eh.create(),
            typeName: o.ZodFunction,
            ...F(s),
          });
        }
      }
      class eS extends D {
        get schema() {
          return this._def.getter();
        }
        _parse(e) {
          let { ctx: t } = this._processInputParams(e);
          return this._def
            .getter()
            ._parse({ data: t.data, path: t.path, parent: t });
        }
      }
      eS.create = (e, t) => new eS({ getter: e, typeName: o.ZodLazy, ...F(t) });
      class eR extends D {
        _parse(e) {
          if (e.data !== this._def.value) {
            let t = this._getOrReturnCtx(e);
            return (
              R(t, {
                received: t.data,
                code: k.invalid_literal,
                expected: this._def.value,
              }),
              C
            );
          }
          return { status: "valid", value: e.data };
        }
        get value() {
          return this._def.value;
        }
      }
      function eE(e, t) {
        return new eC({ values: e, typeName: o.ZodEnum, ...F(t) });
      }
      eR.create = (e, t) =>
        new eR({ value: e, typeName: o.ZodLiteral, ...F(t) });
      class eC extends D {
        _parse(e) {
          if ("string" != typeof e.data) {
            let t = this._getOrReturnCtx(e),
              s = this._def.values;
            return (
              R(t, {
                expected: n.joinValues(s),
                received: t.parsedType,
                code: k.invalid_type,
              }),
              C
            );
          }
          if (
            (this._cache || (this._cache = new Set(this._def.values)),
            !this._cache.has(e.data))
          ) {
            let t = this._getOrReturnCtx(e),
              s = this._def.values;
            return (
              R(t, {
                received: t.data,
                code: k.invalid_enum_value,
                options: s,
              }),
              C
            );
          }
          return P(e.data);
        }
        get options() {
          return this._def.values;
        }
        get enum() {
          let e = {};
          for (let t of this._def.values) e[t] = t;
          return e;
        }
        get Values() {
          let e = {};
          for (let t of this._def.values) e[t] = t;
          return e;
        }
        get Enum() {
          let e = {};
          for (let t of this._def.values) e[t] = t;
          return e;
        }
        extract(e, t = this._def) {
          return eC.create(e, { ...this._def, ...t });
        }
        exclude(e, t = this._def) {
          return eC.create(
            this.options.filter((t) => !e.includes(t)),
            { ...this._def, ...t },
          );
        }
      }
      eC.create = eE;
      class e$ extends D {
        _parse(e) {
          let t = n.getValidEnumValues(this._def.values),
            s = this._getOrReturnCtx(e);
          if (s.parsedType !== b.string && s.parsedType !== b.number) {
            let e = n.objectValues(t);
            return (
              R(s, {
                expected: n.joinValues(e),
                received: s.parsedType,
                code: k.invalid_type,
              }),
              C
            );
          }
          if (
            (this._cache ||
              (this._cache = new Set(n.getValidEnumValues(this._def.values))),
            !this._cache.has(e.data))
          ) {
            let e = n.objectValues(t);
            return (
              R(s, {
                received: s.data,
                code: k.invalid_enum_value,
                options: e,
              }),
              C
            );
          }
          return P(e.data);
        }
        get enum() {
          return this._def.values;
        }
      }
      e$.create = (e, t) =>
        new e$({ values: e, typeName: o.ZodNativeEnum, ...F(t) });
      class eP extends D {
        unwrap() {
          return this._def.type;
        }
        _parse(e) {
          let { ctx: t } = this._processInputParams(e);
          return t.parsedType !== b.promise && !1 === t.common.async
            ? (R(t, {
                code: k.invalid_type,
                expected: b.promise,
                received: t.parsedType,
              }),
              C)
            : P(
                (t.parsedType === b.promise
                  ? t.data
                  : Promise.resolve(t.data)
                ).then((e) =>
                  this._def.type.parseAsync(e, {
                    path: t.path,
                    errorMap: t.common.contextualErrorMap,
                  }),
                ),
              );
        }
      }
      eP.create = (e, t) =>
        new eP({ type: e, typeName: o.ZodPromise, ...F(t) });
      class eI extends D {
        innerType() {
          return this._def.schema;
        }
        sourceType() {
          return this._def.schema._def.typeName === o.ZodEffects
            ? this._def.schema.sourceType()
            : this._def.schema;
        }
        _parse(e) {
          let { status: t, ctx: s } = this._processInputParams(e),
            r = this._def.effect || null,
            a = {
              addIssue: (e) => {
                R(s, e), e.fatal ? t.abort() : t.dirty();
              },
              get path() {
                return s.path;
              },
            };
          if (((a.addIssue = a.addIssue.bind(a)), "preprocess" === r.type)) {
            let e = r.transform(s.data, a);
            if (s.common.async)
              return Promise.resolve(e).then(async (e) => {
                if ("aborted" === t.value) return C;
                let r = await this._def.schema._parseAsync({
                  data: e,
                  path: s.path,
                  parent: s,
                });
                return "aborted" === r.status
                  ? C
                  : "dirty" === r.status || "dirty" === t.value
                    ? $(r.value)
                    : r;
              });
            {
              if ("aborted" === t.value) return C;
              let r = this._def.schema._parseSync({
                data: e,
                path: s.path,
                parent: s,
              });
              return "aborted" === r.status
                ? C
                : "dirty" === r.status || "dirty" === t.value
                  ? $(r.value)
                  : r;
            }
          }
          if ("refinement" === r.type) {
            let e = (e) => {
              let t = r.refinement(e, a);
              if (s.common.async) return Promise.resolve(t);
              if (t instanceof Promise)
                throw Error(
                  "Async refinement encountered during synchronous parse operation. Use .parseAsync instead.",
                );
              return e;
            };
            if (!1 !== s.common.async)
              return this._def.schema
                ._parseAsync({ data: s.data, path: s.path, parent: s })
                .then((s) =>
                  "aborted" === s.status
                    ? C
                    : ("dirty" === s.status && t.dirty(),
                      e(s.value).then(() => ({
                        status: t.value,
                        value: s.value,
                      }))),
                );
            {
              let r = this._def.schema._parseSync({
                data: s.data,
                path: s.path,
                parent: s,
              });
              return "aborted" === r.status
                ? C
                : ("dirty" === r.status && t.dirty(),
                  e(r.value),
                  { status: t.value, value: r.value });
            }
          }
          if ("transform" === r.type)
            if (!1 !== s.common.async)
              return this._def.schema
                ._parseAsync({ data: s.data, path: s.path, parent: s })
                .then((e) =>
                  j(e)
                    ? Promise.resolve(r.transform(e.value, a)).then((e) => ({
                        status: t.value,
                        value: e,
                      }))
                    : C,
                );
            else {
              let e = this._def.schema._parseSync({
                data: s.data,
                path: s.path,
                parent: s,
              });
              if (!j(e)) return C;
              let n = r.transform(e.value, a);
              if (n instanceof Promise)
                throw Error(
                  "Asynchronous transform encountered during synchronous parse operation. Use .parseAsync instead.",
                );
              return { status: t.value, value: n };
            }
          n.assertNever(r);
        }
      }
      (eI.create = (e, t, s) =>
        new eI({ schema: e, typeName: o.ZodEffects, effect: t, ...F(s) })),
        (eI.createWithPreprocess = (e, t, s) =>
          new eI({
            schema: t,
            effect: { type: "preprocess", transform: e },
            typeName: o.ZodEffects,
            ...F(s),
          }));
      class eT extends D {
        _parse(e) {
          return this._getType(e) === b.undefined
            ? P(void 0)
            : this._def.innerType._parse(e);
        }
        unwrap() {
          return this._def.innerType;
        }
      }
      eT.create = (e, t) =>
        new eT({ innerType: e, typeName: o.ZodOptional, ...F(t) });
      class ej extends D {
        _parse(e) {
          return this._getType(e) === b.null
            ? P(null)
            : this._def.innerType._parse(e);
        }
        unwrap() {
          return this._def.innerType;
        }
      }
      ej.create = (e, t) =>
        new ej({ innerType: e, typeName: o.ZodNullable, ...F(t) });
      class eN extends D {
        _parse(e) {
          let { ctx: t } = this._processInputParams(e),
            s = t.data;
          return (
            t.parsedType === b.undefined && (s = this._def.defaultValue()),
            this._def.innerType._parse({ data: s, path: t.path, parent: t })
          );
        }
        removeDefault() {
          return this._def.innerType;
        }
      }
      eN.create = (e, t) =>
        new eN({
          innerType: e,
          typeName: o.ZodDefault,
          defaultValue:
            "function" == typeof t.default ? t.default : () => t.default,
          ...F(t),
        });
      class eL extends D {
        _parse(e) {
          let { ctx: t } = this._processInputParams(e),
            s = { ...t, common: { ...t.common, issues: [] } },
            r = this._def.innerType._parse({
              data: s.data,
              path: s.path,
              parent: { ...s },
            });
          return N(r)
            ? r.then((e) => ({
                status: "valid",
                value:
                  "valid" === e.status
                    ? e.value
                    : this._def.catchValue({
                        get error() {
                          return new A(s.common.issues);
                        },
                        input: s.data,
                      }),
              }))
            : {
                status: "valid",
                value:
                  "valid" === r.status
                    ? r.value
                    : this._def.catchValue({
                        get error() {
                          return new A(s.common.issues);
                        },
                        input: s.data,
                      }),
              };
        }
        removeCatch() {
          return this._def.innerType;
        }
      }
      eL.create = (e, t) =>
        new eL({
          innerType: e,
          typeName: o.ZodCatch,
          catchValue: "function" == typeof t.catch ? t.catch : () => t.catch,
          ...F(t),
        });
      class eM extends D {
        _parse(e) {
          if (this._getType(e) !== b.nan) {
            let t = this._getOrReturnCtx(e);
            return (
              R(t, {
                code: k.invalid_type,
                expected: b.nan,
                received: t.parsedType,
              }),
              C
            );
          }
          return { status: "valid", value: e.data };
        }
      }
      (eM.create = (e) => new eM({ typeName: o.ZodNaN, ...F(e) })),
        Symbol("zod_brand");
      class eF extends D {
        _parse(e) {
          let { ctx: t } = this._processInputParams(e),
            s = t.data;
          return this._def.type._parse({ data: s, path: t.path, parent: t });
        }
        unwrap() {
          return this._def.type;
        }
      }
      class eD extends D {
        _parse(e) {
          let { status: t, ctx: s } = this._processInputParams(e);
          if (s.common.async)
            return (async () => {
              let e = await this._def.in._parseAsync({
                data: s.data,
                path: s.path,
                parent: s,
              });
              return "aborted" === e.status
                ? C
                : "dirty" === e.status
                  ? (t.dirty(), $(e.value))
                  : this._def.out._parseAsync({
                      data: e.value,
                      path: s.path,
                      parent: s,
                    });
            })();
          {
            let e = this._def.in._parseSync({
              data: s.data,
              path: s.path,
              parent: s,
            });
            return "aborted" === e.status
              ? C
              : "dirty" === e.status
                ? (t.dirty(), { status: "dirty", value: e.value })
                : this._def.out._parseSync({
                    data: e.value,
                    path: s.path,
                    parent: s,
                  });
          }
        }
        static create(e, t) {
          return new eD({ in: e, out: t, typeName: o.ZodPipeline });
        }
      }
      class eZ extends D {
        _parse(e) {
          let t = this._def.innerType._parse(e),
            s = (e) => (j(e) && (e.value = Object.freeze(e.value)), e);
          return N(t) ? t.then((e) => s(e)) : s(t);
        }
        unwrap() {
          return this._def.innerType;
        }
      }
      (eZ.create = (e, t) =>
        new eZ({ innerType: e, typeName: o.ZodReadonly, ...F(t) })),
        eg.lazycreate,
        (function (e) {
          (e.ZodString = "ZodString"),
            (e.ZodNumber = "ZodNumber"),
            (e.ZodNaN = "ZodNaN"),
            (e.ZodBigInt = "ZodBigInt"),
            (e.ZodBoolean = "ZodBoolean"),
            (e.ZodDate = "ZodDate"),
            (e.ZodSymbol = "ZodSymbol"),
            (e.ZodUndefined = "ZodUndefined"),
            (e.ZodNull = "ZodNull"),
            (e.ZodAny = "ZodAny"),
            (e.ZodUnknown = "ZodUnknown"),
            (e.ZodNever = "ZodNever"),
            (e.ZodVoid = "ZodVoid"),
            (e.ZodArray = "ZodArray"),
            (e.ZodObject = "ZodObject"),
            (e.ZodUnion = "ZodUnion"),
            (e.ZodDiscriminatedUnion = "ZodDiscriminatedUnion"),
            (e.ZodIntersection = "ZodIntersection"),
            (e.ZodTuple = "ZodTuple"),
            (e.ZodRecord = "ZodRecord"),
            (e.ZodMap = "ZodMap"),
            (e.ZodSet = "ZodSet"),
            (e.ZodFunction = "ZodFunction"),
            (e.ZodLazy = "ZodLazy"),
            (e.ZodLiteral = "ZodLiteral"),
            (e.ZodEnum = "ZodEnum"),
            (e.ZodEffects = "ZodEffects"),
            (e.ZodNativeEnum = "ZodNativeEnum"),
            (e.ZodOptional = "ZodOptional"),
            (e.ZodNullable = "ZodNullable"),
            (e.ZodDefault = "ZodDefault"),
            (e.ZodCatch = "ZodCatch"),
            (e.ZodPromise = "ZodPromise"),
            (e.ZodBranded = "ZodBranded"),
            (e.ZodPipeline = "ZodPipeline"),
            (e.ZodReadonly = "ZodReadonly");
        })(o || (o = {})),
        er.create,
        en.create,
        eM.create,
        ea.create,
        ei.create,
        eo.create,
        el.create,
        ec.create,
        eu.create,
        ed.create,
        eh.create,
        ep.create,
        ef.create,
        em.create,
        eg.create,
        eg.strictCreate,
        ey.create,
        ev.create,
        ew.create,
        eb.create,
        ex.create,
        ek.create,
        eA.create,
        eO.create,
        eS.create,
        eR.create,
        eC.create,
        e$.create,
        eP.create,
        eI.create,
        eT.create,
        ej.create,
        eI.createWithPreprocess,
        eD.create;
      var eB = (e, t, s) =>
        w(e, async (r, n) => {
          let a = r;
          if ("header" === e && t instanceof eg) {
            let e = Object.fromEntries(
              Object.keys(t.shape).map((e) => [e.toLowerCase(), e]),
            );
            a = Object.fromEntries(
              Object.entries(r).map(([t, s]) => [e[t] || t, s]),
            );
          }
          let i = await t.safeParseAsync(a);
          if (s) {
            let t = await s({ data: a, ...i, target: e }, n);
            if (t) {
              if (t instanceof Response) return t;
              if ("response" in t) return t.response;
            }
          }
          return i.success ? i.data : n.json(i, 400);
        });
    },
    97754: (e, t, s) => {
      s.d(t, { W: () => r });
      var r = (e) => {
        let t = {
            origin: "*",
            allowMethods: ["GET", "HEAD", "PUT", "POST", "DELETE", "PATCH"],
            allowHeaders: [],
            exposeHeaders: [],
            ...e,
          },
          s = ((e) => {
            if ("string" == typeof e)
              if ("*" === e) return () => e;
              else return (t) => (e === t ? t : null);
            return "function" == typeof e
              ? e
              : (t) => (e.includes(t) ? t : null);
          })(t.origin),
          r = ((e) =>
            "function" == typeof e ? e : Array.isArray(e) ? () => e : () => [])(
            t.allowMethods,
          );
        return async function (e, n) {
          function a(t, s) {
            e.res.headers.set(t, s);
          }
          let i = s(e.req.header("origin") || "", e);
          if ((i && a("Access-Control-Allow-Origin", i), "*" !== t.origin)) {
            let t = e.req.header("Vary");
            a("Vary", t || "Origin");
          }
          if (
            (t.credentials && a("Access-Control-Allow-Credentials", "true"),
            t.exposeHeaders?.length &&
              a("Access-Control-Expose-Headers", t.exposeHeaders.join(",")),
            "OPTIONS" === e.req.method)
          ) {
            null != t.maxAge &&
              a("Access-Control-Max-Age", t.maxAge.toString());
            let s = r(e.req.header("origin") || "", e);
            s.length && a("Access-Control-Allow-Methods", s.join(","));
            let n = t.allowHeaders;
            if (!n?.length) {
              let t = e.req.header("Access-Control-Request-Headers");
              t && (n = t.split(/\s*,\s*/));
            }
            return (
              n?.length &&
                (a("Access-Control-Allow-Headers", n.join(",")),
                e.res.headers.append("Vary", "Access-Control-Request-Headers")),
              e.res.headers.delete("Content-Length"),
              e.res.headers.delete("Content-Type"),
              new Response(null, {
                headers: e.res.headers,
                status: 204,
                statusText: "No Content",
              })
            );
          }
          await n();
        };
      };
    },
  },
]);
//# sourceMappingURL=984.js.map
