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
    (e._sentryDebugIds[t] = "f30643b3-4b27-42a4-9abe-4747c8a770d9"),
    (e._sentryDebugIdIdentifier =
      "sentry-dbid-f30643b3-4b27-42a4-9abe-4747c8a770d9"));
} catch (e) {}
("use strict");
(exports.id = 7399),
  (exports.ids = [7399]),
  (exports.modules = {
    87399: (e, t, r) => {
      r.d(t, { SignJWT: () => e_, errors: () => a, jwtVerify: () => em });
      var a = {};
      r.r(a),
        r.d(a, {
          JOSEAlgNotAllowed: () => f,
          JOSEError: () => y,
          JOSENotSupported: () => m,
          JWEDecryptionFailed: () => w,
          JWEInvalid: () => b,
          JWKInvalid: () => _,
          JWKSInvalid: () => g,
          JWKSMultipleMatchingKeys: () => v,
          JWKSNoMatchingKey: () => T,
          JWKSTimeout: () => I,
          JWSInvalid: () => S,
          JWSSignatureVerificationFailed: () => R,
          JWTClaimValidationFailed: () => h,
          JWTExpired: () => u,
          JWTInvalid: () => E,
        });
      var o = r(4573);
      let i = new TextEncoder(),
        s = new TextDecoder();
      function n(...e) {
        let t = new Uint8Array(e.reduce((e, { length: t }) => e + t, 0)),
          r = 0;
        for (let a of e) t.set(a, r), (r += a.length);
        return t;
      }
      let c = (e) => o.Buffer.from(e).toString("base64url"),
        d = (e) =>
          new Uint8Array(
            o.Buffer.from(
              (function (e) {
                let t = e;
                return t instanceof Uint8Array && (t = s.decode(t)), t;
              })(e),
              "base64url",
            ),
          );
      var l = r(77598),
        p = r(57975);
      class y extends Error {
        static code = "ERR_JOSE_GENERIC";
        code = "ERR_JOSE_GENERIC";
        constructor(e, t) {
          super(e, t),
            (this.name = this.constructor.name),
            Error.captureStackTrace?.(this, this.constructor);
        }
      }
      class h extends y {
        static code = "ERR_JWT_CLAIM_VALIDATION_FAILED";
        code = "ERR_JWT_CLAIM_VALIDATION_FAILED";
        claim;
        reason;
        payload;
        constructor(e, t, r = "unspecified", a = "unspecified") {
          super(e, { cause: { claim: r, reason: a, payload: t } }),
            (this.claim = r),
            (this.reason = a),
            (this.payload = t);
        }
      }
      class u extends y {
        static code = "ERR_JWT_EXPIRED";
        code = "ERR_JWT_EXPIRED";
        claim;
        reason;
        payload;
        constructor(e, t, r = "unspecified", a = "unspecified") {
          super(e, { cause: { claim: r, reason: a, payload: t } }),
            (this.claim = r),
            (this.reason = a),
            (this.payload = t);
        }
      }
      class f extends y {
        static code = "ERR_JOSE_ALG_NOT_ALLOWED";
        code = "ERR_JOSE_ALG_NOT_ALLOWED";
      }
      class m extends y {
        static code = "ERR_JOSE_NOT_SUPPORTED";
        code = "ERR_JOSE_NOT_SUPPORTED";
      }
      class w extends y {
        static code = "ERR_JWE_DECRYPTION_FAILED";
        code = "ERR_JWE_DECRYPTION_FAILED";
        constructor(e = "decryption operation failed", t) {
          super(e, t);
        }
      }
      class b extends y {
        static code = "ERR_JWE_INVALID";
        code = "ERR_JWE_INVALID";
      }
      class S extends y {
        static code = "ERR_JWS_INVALID";
        code = "ERR_JWS_INVALID";
      }
      class E extends y {
        static code = "ERR_JWT_INVALID";
        code = "ERR_JWT_INVALID";
      }
      class _ extends y {
        static code = "ERR_JWK_INVALID";
        code = "ERR_JWK_INVALID";
      }
      class g extends y {
        static code = "ERR_JWKS_INVALID";
        code = "ERR_JWKS_INVALID";
      }
      class T extends y {
        static code = "ERR_JWKS_NO_MATCHING_KEY";
        code = "ERR_JWKS_NO_MATCHING_KEY";
        constructor(e = "no applicable key found in the JSON Web Key Set", t) {
          super(e, t);
        }
      }
      class v extends y {
        [Symbol.asyncIterator];
        static code = "ERR_JWKS_MULTIPLE_MATCHING_KEYS";
        code = "ERR_JWKS_MULTIPLE_MATCHING_KEYS";
        constructor(
          e = "multiple matching keys found in the JSON Web Key Set",
          t,
        ) {
          super(e, t);
        }
      }
      class I extends y {
        static code = "ERR_JWKS_TIMEOUT";
        code = "ERR_JWKS_TIMEOUT";
        constructor(e = "request timed out", t) {
          super(e, t);
        }
      }
      class R extends y {
        static code = "ERR_JWS_SIGNATURE_VERIFICATION_FAILED";
        code = "ERR_JWS_SIGNATURE_VERIFICATION_FAILED";
        constructor(e = "signature verification failed", t) {
          super(e, t);
        }
      }
      function k(e) {
        switch (e) {
          case "PS256":
          case "RS256":
          case "ES256":
          case "ES256K":
            return "sha256";
          case "PS384":
          case "RS384":
          case "ES384":
            return "sha384";
          case "PS512":
          case "RS512":
          case "ES512":
            return "sha512";
          case "Ed25519":
          case "EdDSA":
            return;
          default:
            throw new m(
              `alg ${e} is not supported either by JOSE or your javascript runtime`,
            );
        }
      }
      let A = l.webcrypto,
        J = (e) => p.types.isCryptoKey(e),
        W = (e) => p.types.isKeyObject(e);
      function K(e, t, ...r) {
        if ((r = r.filter(Boolean)).length > 2) {
          let t = r.pop();
          e += `one of type ${r.join(", ")}, or ${t}.`;
        } else
          2 === r.length
            ? (e += `one of type ${r[0]} or ${r[1]}.`)
            : (e += `of type ${r[0]}.`);
        return (
          null == t
            ? (e += ` Received ${t}`)
            : "function" == typeof t && t.name
              ? (e += ` Received function ${t.name}`)
              : "object" == typeof t &&
                null != t &&
                t.constructor?.name &&
                (e += ` Received an instance of ${t.constructor.name}`),
          e
        );
      }
      let H = (e, ...t) => K("Key must be ", e, ...t);
      function P(e, t, ...r) {
        return K(`Key for the ${e} algorithm must be `, t, ...r);
      }
      let O = (e) => W(e) || J(e),
        N = ["KeyObject"];
      function D(e) {
        if (
          "object" != typeof e ||
          null === e ||
          "[object Object]" !== Object.prototype.toString.call(e)
        )
          return !1;
        if (null === Object.getPrototypeOf(e)) return !0;
        let t = e;
        for (; null !== Object.getPrototypeOf(t); )
          t = Object.getPrototypeOf(t);
        return Object.getPrototypeOf(e) === t;
      }
      function $(e) {
        return D(e) && "string" == typeof e.kty;
      }
      (globalThis.CryptoKey || A?.CryptoKey) && N.push("CryptoKey"),
        new WeakMap();
      let x = (e) => {
          switch (e) {
            case "prime256v1":
              return "P-256";
            case "secp384r1":
              return "P-384";
            case "secp521r1":
              return "P-521";
            case "secp256k1":
              return "secp256k1";
            default:
              throw new m("Unsupported key curve for this operation");
          }
        },
        C = (e, t) => {
          let r;
          if (J(e)) r = l.KeyObject.from(e);
          else if (W(e)) r = e;
          else if ($(e)) return e.crv;
          else throw TypeError(H(e, ...N));
          if ("secret" === r.type)
            throw TypeError(
              'only "private" or "public" type keys can be used for this operation',
            );
          switch (r.asymmetricKeyType) {
            case "ed25519":
            case "ed448":
              return `Ed${r.asymmetricKeyType.slice(2)}`;
            case "x25519":
            case "x448":
              return `X${r.asymmetricKeyType.slice(1)}`;
            case "ec": {
              let e = r.asymmetricKeyDetails.namedCurve;
              if (t) return e;
              return x(e);
            }
            default:
              throw TypeError("Invalid asymmetric key type for this operation");
          }
        },
        L = (e, t) => {
          let r;
          try {
            r =
              e instanceof l.KeyObject
                ? e.asymmetricKeyDetails?.modulusLength
                : Buffer.from(e.n, "base64url").byteLength << 3;
          } catch {}
          if ("number" != typeof r || r < 2048)
            throw TypeError(
              `${t} requires key modulusLength to be 2048 bits or larger`,
            );
        },
        j = new Map([
          ["ES256", "P-256"],
          ["ES256K", "secp256k1"],
          ["ES384", "P-384"],
          ["ES512", "P-521"],
        ]);
      function U(e, t) {
        let r, a, o, i;
        if (t instanceof l.KeyObject)
          (r = t.asymmetricKeyType), (a = t.asymmetricKeyDetails);
        else
          switch (((o = !0), t.kty)) {
            case "RSA":
              r = "rsa";
              break;
            case "EC":
              r = "ec";
              break;
            case "OKP":
              if ("Ed25519" === t.crv) {
                r = "ed25519";
                break;
              }
              if ("Ed448" === t.crv) {
                r = "ed448";
                break;
              }
              throw TypeError(
                "Invalid key for this operation, its crv must be Ed25519 or Ed448",
              );
            default:
              throw TypeError(
                "Invalid key for this operation, its kty must be RSA, OKP, or EC",
              );
          }
        switch (e) {
          case "Ed25519":
            if ("ed25519" !== r)
              throw TypeError(
                "Invalid key for this operation, its asymmetricKeyType must be ed25519",
              );
            break;
          case "EdDSA":
            if (!["ed25519", "ed448"].includes(r))
              throw TypeError(
                "Invalid key for this operation, its asymmetricKeyType must be ed25519 or ed448",
              );
            break;
          case "RS256":
          case "RS384":
          case "RS512":
            if ("rsa" !== r)
              throw TypeError(
                "Invalid key for this operation, its asymmetricKeyType must be rsa",
              );
            L(t, e);
            break;
          case "PS256":
          case "PS384":
          case "PS512":
            if ("rsa-pss" === r) {
              let { hashAlgorithm: t, mgf1HashAlgorithm: r, saltLength: o } = a,
                i = parseInt(e.slice(-3), 10);
              if (void 0 !== t && (t !== `sha${i}` || r !== t))
                throw TypeError(
                  `Invalid key for this operation, its RSA-PSS parameters do not meet the requirements of "alg" ${e}`,
                );
              if (void 0 !== o && o > i >> 3)
                throw TypeError(
                  `Invalid key for this operation, its RSA-PSS parameter saltLength does not meet the requirements of "alg" ${e}`,
                );
            } else if ("rsa" !== r)
              throw TypeError(
                "Invalid key for this operation, its asymmetricKeyType must be rsa or rsa-pss",
              );
            L(t, e),
              (i = {
                padding: l.constants.RSA_PKCS1_PSS_PADDING,
                saltLength: l.constants.RSA_PSS_SALTLEN_DIGEST,
              });
            break;
          case "ES256":
          case "ES256K":
          case "ES384":
          case "ES512": {
            if ("ec" !== r)
              throw TypeError(
                "Invalid key for this operation, its asymmetricKeyType must be ec",
              );
            let a = C(t),
              o = j.get(e);
            if (a !== o)
              throw TypeError(
                `Invalid key curve for the algorithm, its curve must be ${o}, got ${a}`,
              );
            i = { dsaEncoding: "ieee-p1363" };
            break;
          }
          default:
            throw new m(
              `alg ${e} is not supported either by JOSE or your javascript runtime`,
            );
        }
        return o ? { format: "jwk", key: t, ...i } : i ? { ...i, key: t } : t;
      }
      function M(e, t = "algorithm.name") {
        return TypeError(
          `CryptoKey does not support this operation, its ${t} must be ${e}`,
        );
      }
      function V(e, t) {
        return e.name === t;
      }
      function F(e) {
        return parseInt(e.name.slice(4), 10);
      }
      function G(e, t, r) {
        if (t instanceof Uint8Array) {
          if (!e.startsWith("HS")) throw TypeError(H(t, ...N));
          return (0, l.createSecretKey)(t);
        }
        if (t instanceof l.KeyObject) return t;
        if (J(t))
          return (
            !(function (e, t, ...r) {
              switch (t) {
                case "HS256":
                case "HS384":
                case "HS512": {
                  if (!V(e.algorithm, "HMAC")) throw M("HMAC");
                  let r = parseInt(t.slice(2), 10);
                  if (F(e.algorithm.hash) !== r)
                    throw M(`SHA-${r}`, "algorithm.hash");
                  break;
                }
                case "RS256":
                case "RS384":
                case "RS512": {
                  if (!V(e.algorithm, "RSASSA-PKCS1-v1_5"))
                    throw M("RSASSA-PKCS1-v1_5");
                  let r = parseInt(t.slice(2), 10);
                  if (F(e.algorithm.hash) !== r)
                    throw M(`SHA-${r}`, "algorithm.hash");
                  break;
                }
                case "PS256":
                case "PS384":
                case "PS512": {
                  if (!V(e.algorithm, "RSA-PSS")) throw M("RSA-PSS");
                  let r = parseInt(t.slice(2), 10);
                  if (F(e.algorithm.hash) !== r)
                    throw M(`SHA-${r}`, "algorithm.hash");
                  break;
                }
                case "EdDSA":
                  if (
                    "Ed25519" !== e.algorithm.name &&
                    "Ed448" !== e.algorithm.name
                  )
                    throw M("Ed25519 or Ed448");
                  break;
                case "Ed25519":
                  if (!V(e.algorithm, "Ed25519")) throw M("Ed25519");
                  break;
                case "ES256":
                case "ES384":
                case "ES512": {
                  if (!V(e.algorithm, "ECDSA")) throw M("ECDSA");
                  let r = (function (e) {
                    switch (e) {
                      case "ES256":
                        return "P-256";
                      case "ES384":
                        return "P-384";
                      case "ES512":
                        return "P-521";
                      default:
                        throw Error("unreachable");
                    }
                  })(t);
                  if (e.algorithm.namedCurve !== r)
                    throw M(r, "algorithm.namedCurve");
                  break;
                }
                default:
                  throw TypeError("CryptoKey does not support this operation");
              }
              var a = e,
                o = r;
              if (o.length && !o.some((e) => a.usages.includes(e))) {
                let e =
                  "CryptoKey does not support this operation, its usages must include ";
                if (o.length > 2) {
                  let t = o.pop();
                  e += `one of ${o.join(", ")}, or ${t}.`;
                } else
                  2 === o.length
                    ? (e += `one of ${o[0]} or ${o[1]}.`)
                    : (e += `${o[0]}.`);
                throw TypeError(e);
              }
            })(t, e, r),
            l.KeyObject.from(t)
          );
        if ($(t))
          return e.startsWith("HS")
            ? (0, l.createSecretKey)(Buffer.from(t.k, "base64url"))
            : t;
        throw TypeError(H(t, ...N, "Uint8Array", "JSON Web Key"));
      }
      let B = (0, p.promisify)(l.sign),
        q = async (e, t, r) => {
          let a = G(e, t, "sign");
          if (e.startsWith("HS")) {
            let t = l.createHmac(
              (function (e) {
                switch (e) {
                  case "HS256":
                    return "sha256";
                  case "HS384":
                    return "sha384";
                  case "HS512":
                    return "sha512";
                  default:
                    throw new m(
                      `alg ${e} is not supported either by JOSE or your javascript runtime`,
                    );
                }
              })(e),
              a,
            );
            return t.update(r), t.digest();
          }
          return B(k(e), r, U(e, a));
        },
        Y = (0, p.promisify)(l.verify),
        X = async (e, t, r, a) => {
          let o = G(e, t, "verify");
          if (e.startsWith("HS")) {
            let t = await q(e, o, a);
            try {
              return l.timingSafeEqual(r, t);
            } catch {
              return !1;
            }
          }
          let i = k(e),
            s = U(e, o);
          try {
            return await Y(i, a, s, r);
          } catch {
            return !1;
          }
        },
        z = (...e) => {
          let t,
            r = e.filter(Boolean);
          if (0 === r.length || 1 === r.length) return !0;
          for (let e of r) {
            let r = Object.keys(e);
            if (!t || 0 === t.size) {
              t = new Set(r);
              continue;
            }
            for (let e of r) {
              if (t.has(e)) return !1;
              t.add(e);
            }
          }
          return !0;
        },
        Q = (e) => e?.[Symbol.toStringTag],
        Z = (e, t, r) => {
          if (void 0 !== t.use && "sig" !== t.use)
            throw TypeError(
              "Invalid key for this operation, when present its use must be sig",
            );
          if (void 0 !== t.key_ops && t.key_ops.includes?.(r) !== !0)
            throw TypeError(
              `Invalid key for this operation, when present its key_ops must include ${r}`,
            );
          if (void 0 !== t.alg && t.alg !== e)
            throw TypeError(
              `Invalid key for this operation, when present its alg must be ${e}`,
            );
          return !0;
        },
        ee = (e, t, r, a) => {
          if (!(t instanceof Uint8Array)) {
            if (a && $(t)) {
              if (
                (function (e) {
                  return $(e) && "oct" === e.kty && "string" == typeof e.k;
                })(t) &&
                Z(e, t, r)
              )
                return;
              throw TypeError(
                'JSON Web Key for symmetric algorithms must have JWK "kty" (Key Type) equal to "oct" and the JWK "k" (Key Value) present',
              );
            }
            if (!O(t))
              throw TypeError(
                P(e, t, ...N, "Uint8Array", a ? "JSON Web Key" : null),
              );
            if ("secret" !== t.type)
              throw TypeError(
                `${Q(t)} instances for symmetric algorithms must be of type "secret"`,
              );
          }
        },
        et = (e, t, r, a) => {
          if (a && $(t))
            switch (r) {
              case "sign":
                if (
                  (function (e) {
                    return "oct" !== e.kty && "string" == typeof e.d;
                  })(t) &&
                  Z(e, t, r)
                )
                  return;
                throw TypeError(
                  "JSON Web Key for this operation be a private JWK",
                );
              case "verify":
                if (
                  (function (e) {
                    return "oct" !== e.kty && void 0 === e.d;
                  })(t) &&
                  Z(e, t, r)
                )
                  return;
                throw TypeError(
                  "JSON Web Key for this operation be a public JWK",
                );
            }
          if (!O(t)) throw TypeError(P(e, t, ...N, a ? "JSON Web Key" : null));
          if ("secret" === t.type)
            throw TypeError(
              `${Q(t)} instances for asymmetric algorithms must not be of type "secret"`,
            );
          if ("sign" === r && "public" === t.type)
            throw TypeError(
              `${Q(t)} instances for asymmetric algorithm signing must be of type "private"`,
            );
          if ("decrypt" === r && "public" === t.type)
            throw TypeError(
              `${Q(t)} instances for asymmetric algorithm decryption must be of type "private"`,
            );
          if (t.algorithm && "verify" === r && "private" === t.type)
            throw TypeError(
              `${Q(t)} instances for asymmetric algorithm verifying must be of type "public"`,
            );
          if (t.algorithm && "encrypt" === r && "private" === t.type)
            throw TypeError(
              `${Q(t)} instances for asymmetric algorithm encryption must be of type "public"`,
            );
        };
      function er(e, t, r, a) {
        t.startsWith("HS") ||
        "dir" === t ||
        t.startsWith("PBES2") ||
        /^A\d{3}(?:GCM)?KW$/.test(t)
          ? ee(t, r, a, e)
          : et(t, r, a, e);
      }
      er.bind(void 0, !1);
      let ea = er.bind(void 0, !0),
        eo = function (e, t, r, a, o) {
          let i;
          if (void 0 !== o.crit && a?.crit === void 0)
            throw new e(
              '"crit" (Critical) Header Parameter MUST be integrity protected',
            );
          if (!a || void 0 === a.crit) return new Set();
          if (
            !Array.isArray(a.crit) ||
            0 === a.crit.length ||
            a.crit.some((e) => "string" != typeof e || 0 === e.length)
          )
            throw new e(
              '"crit" (Critical) Header Parameter MUST be an array of non-empty strings when present',
            );
          for (let s of ((i =
            void 0 !== r ? new Map([...Object.entries(r), ...t.entries()]) : t),
          a.crit)) {
            if (!i.has(s))
              throw new m(
                `Extension Header Parameter "${s}" is not recognized`,
              );
            if (void 0 === o[s])
              throw new e(`Extension Header Parameter "${s}" is missing`);
            if (i.get(s) && void 0 === a[s])
              throw new e(
                `Extension Header Parameter "${s}" MUST be integrity protected`,
              );
          }
          return new Set(a.crit);
        },
        ei = (e, t) => {
          if (
            void 0 !== t &&
            (!Array.isArray(t) || t.some((e) => "string" != typeof e))
          )
            throw TypeError(`"${e}" option must be an array of strings`);
          if (t) return new Set(t);
        },
        es = (e) =>
          e.d
            ? (0, l.createPrivateKey)({ format: "jwk", key: e })
            : (0, l.createPublicKey)({ format: "jwk", key: e });
      async function en(e, t) {
        if (!D(e)) throw TypeError("JWK must be an object");
        switch (((t ||= e.alg), e.kty)) {
          case "oct":
            if ("string" != typeof e.k || !e.k)
              throw TypeError('missing "k" (Key Value) Parameter value');
            return d(e.k);
          case "RSA":
            if ("oth" in e && void 0 !== e.oth)
              throw new m(
                'RSA JWK "oth" (Other Primes Info) Parameter value is not supported',
              );
          case "EC":
          case "OKP":
            return es({ ...e, alg: t });
          default:
            throw new m('Unsupported "kty" (Key Type) Parameter value');
        }
      }
      async function ec(e, t, r) {
        let a, o;
        if (!D(e)) throw new S("Flattened JWS must be an object");
        if (void 0 === e.protected && void 0 === e.header)
          throw new S(
            'Flattened JWS must have either of the "protected" or "header" members',
          );
        if (void 0 !== e.protected && "string" != typeof e.protected)
          throw new S("JWS Protected Header incorrect type");
        if (void 0 === e.payload) throw new S("JWS Payload missing");
        if ("string" != typeof e.signature)
          throw new S("JWS Signature missing or incorrect type");
        if (void 0 !== e.header && !D(e.header))
          throw new S("JWS Unprotected Header incorrect type");
        let c = {};
        if (e.protected)
          try {
            let t = d(e.protected);
            c = JSON.parse(s.decode(t));
          } catch {
            throw new S("JWS Protected Header is invalid");
          }
        if (!z(c, e.header))
          throw new S(
            "JWS Protected and JWS Unprotected Header Parameter names must be disjoint",
          );
        let l = { ...c, ...e.header },
          p = eo(S, new Map([["b64", !0]]), r?.crit, c, l),
          y = !0;
        if (p.has("b64") && "boolean" != typeof (y = c.b64))
          throw new S(
            'The "b64" (base64url-encode payload) Header Parameter must be a boolean',
          );
        let { alg: h } = l;
        if ("string" != typeof h || !h)
          throw new S(
            'JWS "alg" (Algorithm) Header Parameter missing or invalid',
          );
        let u = r && ei("algorithms", r.algorithms);
        if (u && !u.has(h))
          throw new f('"alg" (Algorithm) Header Parameter value not allowed');
        if (y) {
          if ("string" != typeof e.payload)
            throw new S("JWS Payload must be a string");
        } else if (
          "string" != typeof e.payload &&
          !(e.payload instanceof Uint8Array)
        )
          throw new S("JWS Payload must be a string or an Uint8Array instance");
        let m = !1;
        "function" == typeof t
          ? ((t = await t(c, e)),
            (m = !0),
            ea(h, t, "verify"),
            $(t) && (t = await en(t, h)))
          : ea(h, t, "verify");
        let w = n(
          i.encode(e.protected ?? ""),
          i.encode("."),
          "string" == typeof e.payload ? i.encode(e.payload) : e.payload,
        );
        try {
          a = d(e.signature);
        } catch {
          throw new S("Failed to base64url decode the signature");
        }
        if (!(await X(h, t, a, w))) throw new R();
        if (y)
          try {
            o = d(e.payload);
          } catch {
            throw new S("Failed to base64url decode the payload");
          }
        else o = "string" == typeof e.payload ? i.encode(e.payload) : e.payload;
        let b = { payload: o };
        return (void 0 !== e.protected && (b.protectedHeader = c),
        void 0 !== e.header && (b.unprotectedHeader = e.header),
        m)
          ? { ...b, key: t }
          : b;
      }
      async function ed(e, t, r) {
        if (
          (e instanceof Uint8Array && (e = s.decode(e)), "string" != typeof e)
        )
          throw new S("Compact JWS must be a string or Uint8Array");
        let { 0: a, 1: o, 2: i, length: n } = e.split(".");
        if (3 !== n) throw new S("Invalid Compact JWS");
        let c = await ec({ payload: o, protected: a, signature: i }, t, r),
          d = { payload: c.payload, protectedHeader: c.protectedHeader };
        return "function" == typeof t ? { ...d, key: c.key } : d;
      }
      let el = (e) => Math.floor(e.getTime() / 1e3),
        ep =
          /^(\+|\-)? ?(\d+|\d+\.\d+) ?(seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)(?: (ago|from now))?$/i,
        ey = (e) => {
          let t,
            r = ep.exec(e);
          if (!r || (r[4] && r[1]))
            throw TypeError("Invalid time period format");
          let a = parseFloat(r[2]);
          switch (r[3].toLowerCase()) {
            case "sec":
            case "secs":
            case "second":
            case "seconds":
            case "s":
              t = Math.round(a);
              break;
            case "minute":
            case "minutes":
            case "min":
            case "mins":
            case "m":
              t = Math.round(60 * a);
              break;
            case "hour":
            case "hours":
            case "hr":
            case "hrs":
            case "h":
              t = Math.round(3600 * a);
              break;
            case "day":
            case "days":
            case "d":
              t = Math.round(86400 * a);
              break;
            case "week":
            case "weeks":
            case "w":
              t = Math.round(604800 * a);
              break;
            default:
              t = Math.round(0x1e187e0 * a);
          }
          return "-" === r[1] || "ago" === r[4] ? -t : t;
        },
        eh = (e) => e.toLowerCase().replace(/^application\//, ""),
        eu = (e, t) =>
          "string" == typeof e
            ? t.includes(e)
            : !!Array.isArray(e) && t.some(Set.prototype.has.bind(new Set(e))),
        ef = (e, t, r = {}) => {
          let a, o;
          try {
            a = JSON.parse(s.decode(t));
          } catch {}
          if (!D(a))
            throw new E("JWT Claims Set must be a top-level JSON object");
          let { typ: i } = r;
          if (i && ("string" != typeof e.typ || eh(e.typ) !== eh(i)))
            throw new h(
              'unexpected "typ" JWT header value',
              a,
              "typ",
              "check_failed",
            );
          let {
              requiredClaims: n = [],
              issuer: c,
              subject: d,
              audience: l,
              maxTokenAge: p,
            } = r,
            y = [...n];
          for (let e of (void 0 !== p && y.push("iat"),
          void 0 !== l && y.push("aud"),
          void 0 !== d && y.push("sub"),
          void 0 !== c && y.push("iss"),
          new Set(y.reverse())))
            if (!(e in a))
              throw new h(`missing required "${e}" claim`, a, e, "missing");
          if (c && !(Array.isArray(c) ? c : [c]).includes(a.iss))
            throw new h(
              'unexpected "iss" claim value',
              a,
              "iss",
              "check_failed",
            );
          if (d && a.sub !== d)
            throw new h(
              'unexpected "sub" claim value',
              a,
              "sub",
              "check_failed",
            );
          if (l && !eu(a.aud, "string" == typeof l ? [l] : l))
            throw new h(
              'unexpected "aud" claim value',
              a,
              "aud",
              "check_failed",
            );
          switch (typeof r.clockTolerance) {
            case "string":
              o = ey(r.clockTolerance);
              break;
            case "number":
              o = r.clockTolerance;
              break;
            case "undefined":
              o = 0;
              break;
            default:
              throw TypeError("Invalid clockTolerance option type");
          }
          let { currentDate: f } = r,
            m = el(f || new Date());
          if ((void 0 !== a.iat || p) && "number" != typeof a.iat)
            throw new h('"iat" claim must be a number', a, "iat", "invalid");
          if (void 0 !== a.nbf) {
            if ("number" != typeof a.nbf)
              throw new h('"nbf" claim must be a number', a, "nbf", "invalid");
            if (a.nbf > m + o)
              throw new h(
                '"nbf" claim timestamp check failed',
                a,
                "nbf",
                "check_failed",
              );
          }
          if (void 0 !== a.exp) {
            if ("number" != typeof a.exp)
              throw new h('"exp" claim must be a number', a, "exp", "invalid");
            if (a.exp <= m - o)
              throw new u(
                '"exp" claim timestamp check failed',
                a,
                "exp",
                "check_failed",
              );
          }
          if (p) {
            let e = m - a.iat;
            if (e - o > ("number" == typeof p ? p : ey(p)))
              throw new u(
                '"iat" claim timestamp check failed (too far in the past)',
                a,
                "iat",
                "check_failed",
              );
            if (e < 0 - o)
              throw new h(
                '"iat" claim timestamp check failed (it should be in the past)',
                a,
                "iat",
                "check_failed",
              );
          }
          return a;
        };
      async function em(e, t, r) {
        let a = await ed(e, t, r);
        if (
          a.protectedHeader.crit?.includes("b64") &&
          !1 === a.protectedHeader.b64
        )
          throw new E("JWTs MUST NOT use unencoded payload");
        let o = {
          payload: ef(a.protectedHeader, a.payload, r),
          protectedHeader: a.protectedHeader,
        };
        return "function" == typeof t ? { ...o, key: a.key } : o;
      }
      class ew {
        _payload;
        _protectedHeader;
        _unprotectedHeader;
        constructor(e) {
          if (!(e instanceof Uint8Array))
            throw TypeError("payload must be an instance of Uint8Array");
          this._payload = e;
        }
        setProtectedHeader(e) {
          if (this._protectedHeader)
            throw TypeError("setProtectedHeader can only be called once");
          return (this._protectedHeader = e), this;
        }
        setUnprotectedHeader(e) {
          if (this._unprotectedHeader)
            throw TypeError("setUnprotectedHeader can only be called once");
          return (this._unprotectedHeader = e), this;
        }
        async sign(e, t) {
          let r;
          if (!this._protectedHeader && !this._unprotectedHeader)
            throw new S(
              "either setProtectedHeader or setUnprotectedHeader must be called before #sign()",
            );
          if (!z(this._protectedHeader, this._unprotectedHeader))
            throw new S(
              "JWS Protected and JWS Unprotected Header Parameter names must be disjoint",
            );
          let a = { ...this._protectedHeader, ...this._unprotectedHeader },
            o = eo(
              S,
              new Map([["b64", !0]]),
              t?.crit,
              this._protectedHeader,
              a,
            ),
            d = !0;
          if (
            o.has("b64") &&
            "boolean" != typeof (d = this._protectedHeader.b64)
          )
            throw new S(
              'The "b64" (base64url-encode payload) Header Parameter must be a boolean',
            );
          let { alg: l } = a;
          if ("string" != typeof l || !l)
            throw new S(
              'JWS "alg" (Algorithm) Header Parameter missing or invalid',
            );
          ea(l, e, "sign");
          let p = this._payload;
          d && (p = i.encode(c(p)));
          let y = n(
              (r = this._protectedHeader
                ? i.encode(c(JSON.stringify(this._protectedHeader)))
                : i.encode("")),
              i.encode("."),
              p,
            ),
            h = { signature: c(await q(l, e, y)), payload: "" };
          return (
            d && (h.payload = s.decode(p)),
            this._unprotectedHeader && (h.header = this._unprotectedHeader),
            this._protectedHeader && (h.protected = s.decode(r)),
            h
          );
        }
      }
      class eb {
        _flattened;
        constructor(e) {
          this._flattened = new ew(e);
        }
        setProtectedHeader(e) {
          return this._flattened.setProtectedHeader(e), this;
        }
        async sign(e, t) {
          let r = await this._flattened.sign(e, t);
          if (void 0 === r.payload)
            throw TypeError(
              "use the flattened module for creating JWS with b64: false",
            );
          return `${r.protected}.${r.payload}.${r.signature}`;
        }
      }
      function eS(e, t) {
        if (!Number.isFinite(t)) throw TypeError(`Invalid ${e} input`);
        return t;
      }
      class eE {
        _payload;
        constructor(e = {}) {
          if (!D(e)) throw TypeError("JWT Claims Set MUST be an object");
          this._payload = e;
        }
        setIssuer(e) {
          return (this._payload = { ...this._payload, iss: e }), this;
        }
        setSubject(e) {
          return (this._payload = { ...this._payload, sub: e }), this;
        }
        setAudience(e) {
          return (this._payload = { ...this._payload, aud: e }), this;
        }
        setJti(e) {
          return (this._payload = { ...this._payload, jti: e }), this;
        }
        setNotBefore(e) {
          return (
            "number" == typeof e
              ? (this._payload = {
                  ...this._payload,
                  nbf: eS("setNotBefore", e),
                })
              : e instanceof Date
                ? (this._payload = {
                    ...this._payload,
                    nbf: eS("setNotBefore", el(e)),
                  })
                : (this._payload = {
                    ...this._payload,
                    nbf: el(new Date()) + ey(e),
                  }),
            this
          );
        }
        setExpirationTime(e) {
          return (
            "number" == typeof e
              ? (this._payload = {
                  ...this._payload,
                  exp: eS("setExpirationTime", e),
                })
              : e instanceof Date
                ? (this._payload = {
                    ...this._payload,
                    exp: eS("setExpirationTime", el(e)),
                  })
                : (this._payload = {
                    ...this._payload,
                    exp: el(new Date()) + ey(e),
                  }),
            this
          );
        }
        setIssuedAt(e) {
          return (
            void 0 === e
              ? (this._payload = { ...this._payload, iat: el(new Date()) })
              : e instanceof Date
                ? (this._payload = {
                    ...this._payload,
                    iat: eS("setIssuedAt", el(e)),
                  })
                : "string" == typeof e
                  ? (this._payload = {
                      ...this._payload,
                      iat: eS("setIssuedAt", el(new Date()) + ey(e)),
                    })
                  : (this._payload = {
                      ...this._payload,
                      iat: eS("setIssuedAt", e),
                    }),
            this
          );
        }
      }
      class e_ extends eE {
        _protectedHeader;
        setProtectedHeader(e) {
          return (this._protectedHeader = e), this;
        }
        async sign(e, t) {
          let r = new eb(i.encode(JSON.stringify(this._payload)));
          if (
            (r.setProtectedHeader(this._protectedHeader),
            Array.isArray(this._protectedHeader?.crit) &&
              this._protectedHeader.crit.includes("b64") &&
              !1 === this._protectedHeader.b64)
          )
            throw new E("JWTs MUST NOT use unencoded payload");
          return r.sign(e, t);
        }
      }
    },
  });
//# sourceMappingURL=7399.js.map
