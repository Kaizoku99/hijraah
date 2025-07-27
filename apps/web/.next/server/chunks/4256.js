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
    r = new e.Error().stack;
  r &&
    ((e._sentryDebugIds = e._sentryDebugIds || {}),
    (e._sentryDebugIds[r] = "56ae8cd8-9217-48e1-90e5-a0d8630de056"),
    (e._sentryDebugIdIdentifier =
      "sentry-dbid-56ae8cd8-9217-48e1-90e5-a0d8630de056"));
} catch (e) {}
("use strict");
(exports.id = 4256),
  (exports.ids = [4256]),
  (exports.modules = {
    14256: (e, r, t) => {
      t.d(r, {
        m2: () => o,
        Z9: () => _,
        n_: () => k,
        HD: () => $,
        Ds: () => E,
        sl: () => I,
        cV: () => x,
        zt: () => S,
        $C: () => u,
        v0: () => p,
        WL: () => c,
        xI: () => y,
        S: () => g,
        GU: () => v,
        hd: () => w,
        ae: () => O,
      });
      var s = t(68098);
      let a =
        (e, r = 21) =>
        (t = r) => {
          let s = "",
            a = 0 | t;
          for (; a--; ) s += e[(Math.random() * e.length) | 0];
          return s;
        };
      var n = t(54220);
      function o(...e) {
        return e.reduce((e, r) => ({ ...e, ...(null != r ? r : {}) }), {});
      }
      function i(e) {
        let r = {};
        return (
          e.headers.forEach((e, t) => {
            r[t] = e;
          }),
          r
        );
      }
      var u = (({
        prefix: e,
        size: r = 16,
        alphabet:
          t = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
        separator: n = "-",
      } = {}) => {
        let o = a(t, r);
        if (null == e) return o;
        if (t.includes(n))
          throw new s.Di({
            argument: "separator",
            message: `The separator "${n}" must not be part of the alphabet "${t}".`,
          });
        return (r) => `${e}${n}${o(r)}`;
      })();
      function l(e) {
        return (
          e instanceof Error &&
          ("AbortError" === e.name || "TimeoutError" === e.name)
        );
      }
      function c({
        apiKey: e,
        environmentVariableName: r,
        apiKeyParameterName: t = "apiKey",
        description: a,
      }) {
        if ("string" == typeof e) return e;
        if (null != e)
          throw new s.Kq({ message: `${a} API key must be a string.` });
        if ("undefined" == typeof process)
          throw new s.Kq({
            message: `${a} API key is missing. Pass it using the '${t}' parameter. Environment variables is not supported in this environment.`,
          });
        if (null == (e = process.env[r]))
          throw new s.Kq({
            message: `${a} API key is missing. Pass it using the '${t}' parameter or the ${r} environment variable.`,
          });
        if ("string" != typeof e)
          throw new s.Kq({
            message: `${a} API key must be a string. The value of the ${r} environment variable is not a string.`,
          });
        return e;
      }
      var f = Symbol.for("vercel.ai.validator");
      function d({ value: e, schema: r }) {
        var t;
        let a =
          "object" == typeof r &&
          null !== r &&
          f in r &&
          !0 === r[f] &&
          "validate" in r
            ? r
            : ((t = r),
              {
                [f]: !0,
                validate: (e) => {
                  let r = t.safeParse(e);
                  return r.success
                    ? { success: !0, value: r.data }
                    : { success: !1, error: r.error };
                },
              });
        try {
          if (null == a.validate) return { success: !0, value: e };
          let r = a.validate(e);
          if (r.success) return r;
          return {
            success: !1,
            error: s.iM.wrap({ value: e, cause: r.error }),
          };
        } catch (r) {
          return { success: !1, error: s.iM.wrap({ value: e, cause: r }) };
        }
      }
      function h({ text: e, schema: r }) {
        try {
          let t = n.parse(e);
          if (null == r) return { success: !0, value: t, rawValue: t };
          let s = d({ value: t, schema: r });
          return s.success ? { ...s, rawValue: t } : s;
        } catch (r) {
          return {
            success: !1,
            error: s.u6.isInstance(r) ? r : new s.u6({ text: e, cause: r }),
          };
        }
      }
      function p(e) {
        try {
          return n.parse(e), !0;
        } catch (e) {
          return !1;
        }
      }
      function y({ provider: e, providerOptions: r, schema: t }) {
        if ((null == r ? void 0 : r[e]) == null) return;
        let a = d({ value: r[e], schema: t });
        if (!a.success)
          throw new s.Di({
            argument: "providerOptions",
            message: `invalid ${e} provider options`,
            cause: a.error,
          });
        return a.value;
      }
      var m = () => globalThis.fetch,
        v = async ({
          url: e,
          headers: r,
          body: t,
          failedResponseHandler: s,
          successfulResponseHandler: a,
          abortSignal: n,
          fetch: o,
        }) =>
          b({
            url: e,
            headers: { "Content-Type": "application/json", ...r },
            body: { content: JSON.stringify(t), values: t },
            failedResponseHandler: s,
            successfulResponseHandler: a,
            abortSignal: n,
            fetch: o,
          }),
        g = async ({
          url: e,
          headers: r,
          formData: t,
          failedResponseHandler: s,
          successfulResponseHandler: a,
          abortSignal: n,
          fetch: o,
        }) =>
          b({
            url: e,
            headers: r,
            body: { content: t, values: Object.fromEntries(t.entries()) },
            failedResponseHandler: s,
            successfulResponseHandler: a,
            abortSignal: n,
            fetch: o,
          }),
        b = async ({
          url: e,
          headers: r = {},
          body: t,
          successfulResponseHandler: a,
          failedResponseHandler: n,
          abortSignal: o,
          fetch: u = m(),
        }) => {
          try {
            var c;
            let f = await u(e, {
                method: "POST",
                headers:
                  ((c = r),
                  Object.fromEntries(
                    Object.entries(c).filter(([e, r]) => null != r),
                  )),
                body: t.content,
                signal: o,
              }),
              d = i(f);
            if (!f.ok) {
              let r;
              try {
                r = await n({
                  response: f,
                  url: e,
                  requestBodyValues: t.values,
                });
              } catch (r) {
                if (l(r) || s.hL.isInstance(r)) throw r;
                throw new s.hL({
                  message: "Failed to process error response",
                  cause: r,
                  statusCode: f.status,
                  url: e,
                  responseHeaders: d,
                  requestBodyValues: t.values,
                });
              }
              throw r.value;
            }
            try {
              return await a({
                response: f,
                url: e,
                requestBodyValues: t.values,
              });
            } catch (r) {
              if (r instanceof Error && (l(r) || s.hL.isInstance(r))) throw r;
              throw new s.hL({
                message: "Failed to process successful response",
                cause: r,
                statusCode: f.status,
                url: e,
                responseHeaders: d,
                requestBodyValues: t.values,
              });
            }
          } catch (r) {
            if (l(r)) throw r;
            if (r instanceof TypeError && "fetch failed" === r.message) {
              let a = r.cause;
              if (null != a)
                throw new s.hL({
                  message: `Cannot connect to API: ${a.message}`,
                  cause: a,
                  url: e,
                  requestBodyValues: t.values,
                  isRetryable: !0,
                });
            }
            throw r;
          }
        };
      async function w(e) {
        return "function" == typeof e && (e = e()), Promise.resolve(e);
      }
      var I =
          ({ errorSchema: e, errorToMessage: r, isRetryable: t }) =>
          async ({ response: a, url: o, requestBodyValues: u }) => {
            let l = await a.text(),
              c = i(a);
            if ("" === l.trim())
              return {
                responseHeaders: c,
                value: new s.hL({
                  message: a.statusText,
                  url: o,
                  requestBodyValues: u,
                  statusCode: a.status,
                  responseHeaders: c,
                  responseBody: l,
                  isRetryable: null == t ? void 0 : t(a),
                }),
              };
            try {
              let i = (function ({ text: e, schema: r }) {
                try {
                  let t = n.parse(e);
                  if (null == r) return t;
                  return (function ({ value: e, schema: r }) {
                    let t = d({ value: e, schema: r });
                    if (!t.success)
                      throw s.iM.wrap({ value: e, cause: t.error });
                    return t.value;
                  })({ value: t, schema: r });
                } catch (r) {
                  if (s.u6.isInstance(r) || s.iM.isInstance(r)) throw r;
                  throw new s.u6({ text: e, cause: r });
                }
              })({ text: l, schema: e });
              return {
                responseHeaders: c,
                value: new s.hL({
                  message: r(i),
                  url: o,
                  requestBodyValues: u,
                  statusCode: a.status,
                  responseHeaders: c,
                  responseBody: l,
                  data: i,
                  isRetryable: null == t ? void 0 : t(a, i),
                }),
              };
            } catch (e) {
              return {
                responseHeaders: c,
                value: new s.hL({
                  message: a.statusText,
                  url: o,
                  requestBodyValues: u,
                  statusCode: a.status,
                  responseHeaders: c,
                  responseBody: l,
                  isRetryable: null == t ? void 0 : t(a),
                }),
              };
            }
          },
        E =
          (e) =>
          async ({ response: r }) => {
            let t = i(r);
            if (null == r.body) throw new s.Tt({});
            return {
              responseHeaders: t,
              value: r.body
                .pipeThrough(new TextDecoderStream())
                .pipeThrough(
                  (function () {
                    let e,
                      r,
                      t,
                      s = "",
                      a = [];
                    function n(e, r) {
                      if ("" === e) return void o(r);
                      if (e.startsWith(":")) return;
                      let t = e.indexOf(":");
                      if (-1 === t) return void i(e, "");
                      let s = e.slice(0, t),
                        a = t + 1;
                      i(
                        s,
                        a < e.length && " " === e[a]
                          ? e.slice(a + 1)
                          : e.slice(a),
                      );
                    }
                    function o(s) {
                      a.length > 0 &&
                        (s.enqueue({
                          event: e,
                          data: a.join("\n"),
                          id: r,
                          retry: t,
                        }),
                        (a = []),
                        (e = void 0),
                        (t = void 0));
                    }
                    function i(s, n) {
                      switch (s) {
                        case "event":
                          e = n;
                          break;
                        case "data":
                          a.push(n);
                          break;
                        case "id":
                          r = n;
                          break;
                        case "retry":
                          let o = parseInt(n, 10);
                          isNaN(o) || (t = o);
                      }
                    }
                    return new TransformStream({
                      transform(e, r) {
                        let { lines: t, incompleteLine: a } = (function (e, r) {
                          let t = [],
                            s = e;
                          for (let e = 0; e < r.length; ) {
                            let a = r[e++];
                            "\n" === a
                              ? (t.push(s), (s = ""))
                              : "\r" === a
                                ? (t.push(s), (s = ""), "\n" === r[e] && e++)
                                : (s += a);
                          }
                          return { lines: t, incompleteLine: s };
                        })(s, e);
                        s = a;
                        for (let e = 0; e < t.length; e++) n(t[e], r);
                      },
                      flush(e) {
                        n(s, e), o(e);
                      },
                    });
                  })(),
                )
                .pipeThrough(
                  new TransformStream({
                    transform({ data: r }, t) {
                      "[DONE]" !== r && t.enqueue(h({ text: r, schema: e }));
                    },
                  }),
                ),
            };
          },
        x =
          (e) =>
          async ({ response: r, url: t, requestBodyValues: a }) => {
            let n = await r.text(),
              o = h({ text: n, schema: e }),
              u = i(r);
            if (!o.success)
              throw new s.hL({
                message: "Invalid JSON response",
                cause: o.error,
                statusCode: r.status,
                responseHeaders: u,
                responseBody: n,
                url: t,
                requestBodyValues: a,
              });
            return { responseHeaders: u, value: o.value, rawValue: o.rawValue };
          },
        $ =
          () =>
          async ({ response: e, url: r, requestBodyValues: t }) => {
            let a = i(e);
            if (!e.body)
              throw new s.hL({
                message: "Response body is empty",
                url: r,
                requestBodyValues: t,
                statusCode: e.status,
                responseHeaders: a,
                responseBody: void 0,
              });
            try {
              let r = await e.arrayBuffer();
              return { responseHeaders: a, value: new Uint8Array(r) };
            } catch (n) {
              throw new s.hL({
                message: "Failed to read response as array buffer",
                url: r,
                requestBodyValues: t,
                statusCode: e.status,
                responseHeaders: a,
                responseBody: void 0,
                cause: n,
              });
            }
          },
        S =
          () =>
          async ({ response: e, url: r, requestBodyValues: t }) => {
            let a = i(e),
              n = await e.text();
            return {
              responseHeaders: a,
              value: new s.hL({
                message: e.statusText,
                url: r,
                requestBodyValues: t,
                statusCode: e.status,
                responseHeaders: a,
                responseBody: n,
              }),
            };
          },
        { btoa: T, atob: A } = globalThis;
      function _(e) {
        let r = A(e.replace(/-/g, "+").replace(/_/g, "/"));
        return Uint8Array.from(r, (e) => e.codePointAt(0));
      }
      function k(e) {
        let r = "";
        for (let t = 0; t < e.length; t++) r += String.fromCodePoint(e[t]);
        return T(r);
      }
      function O(e) {
        return null == e ? void 0 : e.replace(/\/$/, "");
      }
    },
    54220: (e) => {
      let r = "undefined" != typeof Buffer,
        t =
          /"(?:_|\\u005[Ff])(?:_|\\u005[Ff])(?:p|\\u0070)(?:r|\\u0072)(?:o|\\u006[Ff])(?:t|\\u0074)(?:o|\\u006[Ff])(?:_|\\u005[Ff])(?:_|\\u005[Ff])"\s*:/,
        s =
          /"(?:c|\\u0063)(?:o|\\u006[Ff])(?:n|\\u006[Ee])(?:s|\\u0073)(?:t|\\u0074)(?:r|\\u0072)(?:u|\\u0075)(?:c|\\u0063)(?:t|\\u0074)(?:o|\\u006[Ff])(?:r|\\u0072)"\s*:/;
      function a(e, a, o) {
        null == o &&
          null !== a &&
          "object" == typeof a &&
          ((o = a), (a = void 0)),
          r && Buffer.isBuffer(e) && (e = e.toString()),
          e && 65279 === e.charCodeAt(0) && (e = e.slice(1));
        let i = JSON.parse(e, a);
        if (null === i || "object" != typeof i) return i;
        let u = (o && o.protoAction) || "error",
          l = (o && o.constructorAction) || "error";
        if ("ignore" === u && "ignore" === l) return i;
        if ("ignore" !== u && "ignore" !== l) {
          if (!1 === t.test(e) && !1 === s.test(e)) return i;
        } else if ("ignore" !== u && "ignore" === l) {
          if (!1 === t.test(e)) return i;
        } else if (!1 === s.test(e)) return i;
        return n(i, {
          protoAction: u,
          constructorAction: l,
          safe: o && o.safe,
        });
      }
      function n(
        e,
        {
          protoAction: r = "error",
          constructorAction: t = "error",
          safe: s,
        } = {},
      ) {
        let a = [e];
        for (; a.length; ) {
          let e = a;
          for (let n of ((a = []), e)) {
            if (
              "ignore" !== r &&
              Object.prototype.hasOwnProperty.call(n, "__proto__")
            ) {
              if (!0 === s) return null;
              if ("error" === r)
                throw SyntaxError(
                  "Object contains forbidden prototype property",
                );
              delete n.__proto__;
            }
            if (
              "ignore" !== t &&
              Object.prototype.hasOwnProperty.call(n, "constructor") &&
              Object.prototype.hasOwnProperty.call(n.constructor, "prototype")
            ) {
              if (!0 === s) return null;
              if ("error" === t)
                throw SyntaxError(
                  "Object contains forbidden prototype property",
                );
              delete n.constructor;
            }
            for (let e in n) {
              let r = n[e];
              r && "object" == typeof r && a.push(r);
            }
          }
        }
        return e;
      }
      function o(e, r, t) {
        let s = Error.stackTraceLimit;
        Error.stackTraceLimit = 0;
        try {
          return a(e, r, t);
        } finally {
          Error.stackTraceLimit = s;
        }
      }
      (e.exports = o),
        (e.exports.default = o),
        (e.exports.parse = o),
        (e.exports.safeParse = function (e, r) {
          let t = Error.stackTraceLimit;
          Error.stackTraceLimit = 0;
          try {
            return a(e, r, { safe: !0 });
          } catch (e) {
            return null;
          } finally {
            Error.stackTraceLimit = t;
          }
        }),
        (e.exports.scan = n);
    },
    68098: (e, r, t) => {
      t.d(r, {
        Ch: () => es,
        Di: () => L,
        Kq: () => G,
        M3: () => j,
        Tt: () => T,
        b8: () => ed,
        eM: () => Y,
        hL: () => E,
        iM: () => eu,
        u6: () => R,
        xn: () => q,
      });
      var s,
        a,
        n,
        o,
        i,
        u,
        l,
        c,
        f,
        d,
        h,
        p,
        y = "vercel.ai.error",
        m = Symbol.for(y),
        v = class e extends Error {
          constructor({ name: e, message: r, cause: t }) {
            super(r), (this[s] = !0), (this.name = e), (this.cause = t);
          }
          static isInstance(r) {
            return e.hasMarker(r, y);
          }
          static hasMarker(e, r) {
            let t = Symbol.for(r);
            return (
              null != e &&
              "object" == typeof e &&
              t in e &&
              "boolean" == typeof e[t] &&
              !0 === e[t]
            );
          }
        };
      s = m;
      var g = v,
        b = "AI_APICallError",
        w = `vercel.ai.error.${b}`,
        I = Symbol.for(w),
        E = class extends g {
          constructor({
            message: e,
            url: r,
            requestBodyValues: t,
            statusCode: s,
            responseHeaders: n,
            responseBody: o,
            cause: i,
            isRetryable: u = null != s &&
              (408 === s || 409 === s || 429 === s || s >= 500),
            data: l,
          }) {
            super({ name: b, message: e, cause: i }),
              (this[a] = !0),
              (this.url = r),
              (this.requestBodyValues = t),
              (this.statusCode = s),
              (this.responseHeaders = n),
              (this.responseBody = o),
              (this.isRetryable = u),
              (this.data = l);
          }
          static isInstance(e) {
            return g.hasMarker(e, w);
          }
        };
      a = I;
      var x = "AI_EmptyResponseBodyError",
        $ = `vercel.ai.error.${x}`,
        S = Symbol.for($),
        T = class extends g {
          constructor({ message: e = "Empty response body" } = {}) {
            super({ name: x, message: e }), (this[n] = !0);
          }
          static isInstance(e) {
            return g.hasMarker(e, $);
          }
        };
      function A(e) {
        return null == e
          ? "unknown error"
          : "string" == typeof e
            ? e
            : e instanceof Error
              ? e.message
              : JSON.stringify(e);
      }
      n = S;
      var _ = "AI_InvalidArgumentError",
        k = `vercel.ai.error.${_}`,
        O = Symbol.for(k),
        L = class extends g {
          constructor({ message: e, cause: r, argument: t }) {
            super({ name: _, message: e, cause: r }),
              (this[o] = !0),
              (this.argument = t);
          }
          static isInstance(e) {
            return g.hasMarker(e, k);
          }
        };
      o = O;
      var M = "AI_InvalidPromptError",
        P = `vercel.ai.error.${M}`,
        C = Symbol.for(P),
        j = class extends g {
          constructor({ prompt: e, message: r, cause: t }) {
            super({ name: M, message: `Invalid prompt: ${r}`, cause: t }),
              (this[i] = !0),
              (this.prompt = e);
          }
          static isInstance(e) {
            return g.hasMarker(e, P);
          }
        };
      i = C;
      var B = "AI_InvalidResponseDataError",
        N = `vercel.ai.error.${B}`,
        V = Symbol.for(N),
        q = class extends g {
          constructor({
            data: e,
            message: r = `Invalid response data: ${JSON.stringify(e)}.`,
          }) {
            super({ name: B, message: r }), (this[u] = !0), (this.data = e);
          }
          static isInstance(e) {
            return g.hasMarker(e, N);
          }
        };
      u = V;
      var F = "AI_JSONParseError",
        D = `vercel.ai.error.${F}`,
        J = Symbol.for(D),
        R = class extends g {
          constructor({ text: e, cause: r }) {
            super({
              name: F,
              message: `JSON parsing failed: Text: ${e}.
Error message: ${A(r)}`,
              cause: r,
            }),
              (this[l] = !0),
              (this.text = e);
          }
          static isInstance(e) {
            return g.hasMarker(e, D);
          }
        };
      l = J;
      var K = "AI_LoadAPIKeyError",
        U = `vercel.ai.error.${K}`,
        z = Symbol.for(U),
        G = class extends g {
          constructor({ message: e }) {
            super({ name: K, message: e }), (this[c] = !0);
          }
          static isInstance(e) {
            return g.hasMarker(e, U);
          }
        };
      c = z;
      var H = Symbol.for("vercel.ai.error.AI_LoadSettingError"),
        W = Symbol.for("vercel.ai.error.AI_NoContentGeneratedError"),
        Z = "AI_NoSuchModelError",
        Q = `vercel.ai.error.${Z}`,
        X = Symbol.for(Q),
        Y = class extends g {
          constructor({
            errorName: e = Z,
            modelId: r,
            modelType: t,
            message: s = `No such ${t}: ${r}`,
          }) {
            super({ name: e, message: s }),
              (this[f] = !0),
              (this.modelId = r),
              (this.modelType = t);
          }
          static isInstance(e) {
            return g.hasMarker(e, Q);
          }
        };
      f = X;
      var ee = "AI_TooManyEmbeddingValuesForCallError",
        er = `vercel.ai.error.${ee}`,
        et = Symbol.for(er),
        es = class extends g {
          constructor(e) {
            super({
              name: ee,
              message: `Too many values for a single embedding call. The ${e.provider} model "${e.modelId}" can only embed up to ${e.maxEmbeddingsPerCall} values per call, but ${e.values.length} values were provided.`,
            }),
              (this[d] = !0),
              (this.provider = e.provider),
              (this.modelId = e.modelId),
              (this.maxEmbeddingsPerCall = e.maxEmbeddingsPerCall),
              (this.values = e.values);
          }
          static isInstance(e) {
            return g.hasMarker(e, er);
          }
        };
      d = et;
      var ea = "AI_TypeValidationError",
        en = `vercel.ai.error.${ea}`,
        eo = Symbol.for(en),
        ei = class e extends g {
          constructor({ value: e, cause: r }) {
            super({
              name: ea,
              message: `Type validation failed: Value: ${JSON.stringify(e)}.
Error message: ${A(r)}`,
              cause: r,
            }),
              (this[h] = !0),
              (this.value = e);
          }
          static isInstance(e) {
            return g.hasMarker(e, en);
          }
          static wrap({ value: r, cause: t }) {
            return e.isInstance(t) && t.value === r
              ? t
              : new e({ value: r, cause: t });
          }
        };
      h = eo;
      var eu = ei,
        el = "AI_UnsupportedFunctionalityError",
        ec = `vercel.ai.error.${el}`,
        ef = Symbol.for(ec),
        ed = class extends g {
          constructor({
            functionality: e,
            message: r = `'${e}' functionality not supported.`,
          }) {
            super({ name: el, message: r }),
              (this[p] = !0),
              (this.functionality = e);
          }
          static isInstance(e) {
            return g.hasMarker(e, ec);
          }
        };
      function eh(e) {
        return (
          null === e ||
          "string" == typeof e ||
          "number" == typeof e ||
          "boolean" == typeof e ||
          (Array.isArray(e)
            ? e.every(eh)
            : "object" == typeof e &&
              Object.entries(e).every(
                ([e, r]) => "string" == typeof e && eh(r),
              ))
        );
      }
      p = ef;
    },
  });
//# sourceMappingURL=4256.js.map
