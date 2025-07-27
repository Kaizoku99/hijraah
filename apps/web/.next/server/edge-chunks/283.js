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
    (e._sentryDebugIds[t] = "cd658b4c-3b65-451f-8778-a9cbdc2f8edd"),
    (e._sentryDebugIdIdentifier =
      "sentry-dbid-cd658b4c-3b65-451f-8778-a9cbdc2f8edd"));
} catch (e) {}
(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [283],
  {
    14371: (e, t, r) => {
      "use strict";
      let o;
      r.d(t, { createBrowserClient: () => E, createServerClient: () => A });
      var n = r(85030);
      let i = "0.5.2";
      var s = r(24327);
      function a() {
        return "undefined" != typeof window && void 0 !== window.document;
      }
      let l = { path: "/", sameSite: "lax", httpOnly: !1, maxAge: 3456e4 },
        c = /^(.*)[.](0|[1-9][0-9]*)$/;
      function u(e, t) {
        if (e === t) return !0;
        let r = e.match(c);
        return !!r && r[1] === t;
      }
      function f(e, t, r) {
        let o = r ?? 3180,
          n = encodeURIComponent(t);
        if (n.length <= o) return [{ name: e, value: t }];
        let i = [];
        for (; n.length > 0; ) {
          let e = n.slice(0, o),
            t = e.lastIndexOf("%");
          t > o - 3 && (e = e.slice(0, t));
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
          i.push(r), (n = n.slice(e.length));
        }
        return i.map((t, r) => ({ name: `${e}.${r}`, value: t }));
      }
      async function d(e, t) {
        let r = await t(e);
        if (r) return r;
        let o = [];
        for (let r = 0; ; r++) {
          let n = `${e}.${r}`,
            i = await t(n);
          if (!i) break;
          o.push(i);
        }
        return o.length > 0 ? o.join("") : null;
      }
      let h =
          "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_".split(
            "",
          ),
        p = " 	\n\r=".split(""),
        y = (() => {
          let e = Array(128);
          for (let t = 0; t < e.length; t += 1) e[t] = -1;
          for (let t = 0; t < p.length; t += 1) e[p[t].charCodeAt(0)] = -2;
          for (let t = 0; t < h.length; t += 1) e[h[t].charCodeAt(0)] = t;
          return e;
        })();
      function b(e) {
        let t = [],
          r = 0,
          o = 0;
        if (
          ((function (e, t) {
            for (let r = 0; r < e.length; r += 1) {
              let o = e.charCodeAt(r);
              if (o > 55295 && o <= 56319) {
                let t = ((o - 55296) * 1024) & 65535;
                (o = (((e.charCodeAt(r + 1) - 56320) & 65535) | t) + 65536),
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
              })(o, t);
            }
          })(e, (e) => {
            for (r = (r << 8) | e, o += 8; o >= 6; ) {
              let e = (r >> (o - 6)) & 63;
              t.push(h[e]), (o -= 6);
            }
          }),
          o > 0)
        )
          for (r <<= 6 - o, o = 6; o >= 6; ) {
            let e = (r >> (o - 6)) & 63;
            t.push(h[e]), (o -= 6);
          }
        return t.join("");
      }
      function m(e) {
        let t = [],
          r = (e) => {
            t.push(String.fromCodePoint(e));
          },
          o = { utf8seq: 0, codepoint: 0 },
          n = 0,
          i = 0;
        for (let t = 0; t < e.length; t += 1) {
          let s = y[e.charCodeAt(t)];
          if (s > -1)
            for (n = (n << 6) | s, i += 6; i >= 8; )
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
              })((n >> (i - 8)) & 255, o, r),
                (i -= 8);
          else if (-2 === s) continue;
          else
            throw Error(
              `Invalid Base64-URL character "${e.at(t)}" at position ${t}`,
            );
        }
        return t.join("");
      }
      let g = "base64-";
      function w(e, t) {
        let r,
          o,
          n = e.cookies ?? null,
          i = e.cookieEncoding,
          c = {},
          h = {};
        if (n)
          if ("get" in n) {
            let e = async (e) => {
              let t = e.flatMap((e) => [
                  e,
                  ...Array.from({ length: 5 }).map((t, r) => `${e}.${r}`),
                ]),
                r = [];
              for (let e = 0; e < t.length; e += 1) {
                let o = await n.get(t[e]);
                (o || "string" == typeof o) && r.push({ name: t[e], value: o });
              }
              return r;
            };
            if (((r = async (t) => await e(t)), "set" in n && "remove" in n))
              o = async (e) => {
                for (let t = 0; t < e.length; t += 1) {
                  let { name: r, value: o, options: i } = e[t];
                  o ? await n.set(r, o, i) : await n.remove(r, i);
                }
              };
            else if (t)
              o = async () => {
                console.warn(
                  "@supabase/ssr: createServerClient was configured without set and remove cookie methods, but the client needs to set cookies. This can lead to issues such as random logouts, early session termination or increased token refresh requests. If in NextJS, check your middleware.ts file, route handlers and server actions for correctness. Consider switching to the getAll and setAll cookie methods instead of get, set and remove which are deprecated and can be difficult to use correctly.",
                );
              };
            else
              throw Error(
                "@supabase/ssr: createBrowserClient requires configuring a getAll and setAll cookie method (deprecated: alternatively both get, set and remove can be used)",
              );
          } else if ("getAll" in n)
            if (((r = async () => await n.getAll()), "setAll" in n))
              o = n.setAll;
            else if (t)
              o = async () => {
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
              `@supabase/ssr: ${t ? "createServerClient" : "createBrowserClient"} requires configuring getAll and setAll cookie methods (deprecated: alternatively use get, set and remove).${a() ? " As this is called in a browser runtime, consider removing the cookies option object to use the document.cookie API automatically." : ""}`,
            );
        else if (!t && a()) {
          let e = () => {
            let e = (0, s.q)(document.cookie);
            return Object.keys(e).map((t) => ({ name: t, value: e[t] }));
          };
          (r = () => e()),
            (o = (e) => {
              e.forEach(({ name: e, value: t, options: r }) => {
                document.cookie = (0, s.l)(e, t, r);
              });
            });
        } else if (t)
          throw Error(
            "@supabase/ssr: createServerClient must be initialized with cookie options that specify getAll and setAll functions (deprecated, not recommended: alternatively use get, set and remove)",
          );
        else
          (r = () => []),
            (o = () => {
              throw Error(
                "@supabase/ssr: createBrowserClient in non-browser runtimes (including Next.js pre-rendering mode) was not initialized cookie options that specify getAll and setAll functions (deprecated: alternatively use get, set and remove), but they were needed",
              );
            });
        return t
          ? {
              getAll: r,
              setAll: o,
              setItems: c,
              removedItems: h,
              storage: {
                isServer: !0,
                getItem: async (e) => {
                  if ("string" == typeof c[e]) return c[e];
                  if (h[e]) return null;
                  let t = await r([e]),
                    o = await d(e, async (e) => {
                      let r = t?.find(({ name: t }) => t === e) || null;
                      return r ? r.value : null;
                    });
                  if (!o) return null;
                  let n = o;
                  return (
                    "string" == typeof o &&
                      o.startsWith(g) &&
                      (n = m(o.substring(g.length))),
                    n
                  );
                },
                setItem: async (t, n) => {
                  t.endsWith("-code-verifier") &&
                    (await v(
                      {
                        getAll: r,
                        setAll: o,
                        setItems: { [t]: n },
                        removedItems: {},
                      },
                      {
                        cookieOptions: e?.cookieOptions ?? null,
                        cookieEncoding: i,
                      },
                    )),
                    (c[t] = n),
                    delete h[t];
                },
                removeItem: async (e) => {
                  delete c[e], (h[e] = !0);
                },
              },
            }
          : {
              getAll: r,
              setAll: o,
              setItems: c,
              removedItems: h,
              storage: {
                isServer: !1,
                getItem: async (e) => {
                  let t = await r([e]),
                    o = await d(e, async (e) => {
                      let r = t?.find(({ name: t }) => t === e) || null;
                      return r ? r.value : null;
                    });
                  if (!o) return null;
                  let n = o;
                  return o.startsWith(g) && (n = m(o.substring(g.length))), n;
                },
                setItem: async (t, n) => {
                  let s = await r([t]),
                    a = new Set(
                      (s?.map(({ name: e }) => e) || []).filter((e) => u(e, t)),
                    ),
                    c = n;
                  "base64url" === i && (c = g + b(n));
                  let d = f(t, c);
                  d.forEach(({ name: e }) => {
                    a.delete(e);
                  });
                  let h = { ...l, ...e?.cookieOptions, maxAge: 0 },
                    p = { ...l, ...e?.cookieOptions, maxAge: l.maxAge };
                  delete h.name, delete p.name;
                  let y = [
                    ...[...a].map((e) => ({ name: e, value: "", options: h })),
                    ...d.map(({ name: e, value: t }) => ({
                      name: e,
                      value: t,
                      options: p,
                    })),
                  ];
                  y.length > 0 && (await o(y));
                },
                removeItem: async (t) => {
                  let n = await r([t]),
                    i = (n?.map(({ name: e }) => e) || []).filter((e) =>
                      u(e, t),
                    ),
                    s = { ...l, ...e?.cookieOptions, maxAge: 0 };
                  delete s.name,
                    i.length > 0 &&
                      (await o(
                        i.map((e) => ({ name: e, value: "", options: s })),
                      ));
                },
              },
            };
      }
      async function v(
        { getAll: e, setAll: t, setItems: r, removedItems: o },
        n,
      ) {
        let i = n.cookieEncoding,
          s = n.cookieOptions ?? null,
          a = await e([
            ...(r ? Object.keys(r) : []),
            ...(o ? Object.keys(o) : []),
          ]),
          c = a?.map(({ name: e }) => e) || [],
          d = Object.keys(o).flatMap((e) => c.filter((t) => u(t, e))),
          h = Object.keys(r).flatMap((e) => {
            let t = new Set(c.filter((t) => u(t, e))),
              o = r[e];
            "base64url" === i && (o = g + b(o));
            let n = f(e, o);
            return (
              n.forEach((e) => {
                t.delete(e.name);
              }),
              d.push(...t),
              n
            );
          }),
          p = { ...l, ...s, maxAge: 0 },
          y = { ...l, ...s, maxAge: l.maxAge };
        delete p.name,
          delete y.name,
          await t([
            ...d.map((e) => ({ name: e, value: "", options: p })),
            ...h.map(({ name: e, value: t }) => ({
              name: e,
              value: t,
              options: y,
            })),
          ]);
      }
      function E(e, t, r) {
        let s = r?.isSingleton === !0 || ((!r || !("isSingleton" in r)) && a());
        if (s && o) return o;
        if (!e || !t)
          throw Error(`@supabase/ssr: Your project's URL and API key are required to create a Supabase client!

Check your Supabase project's API settings to find these values

https://supabase.com/dashboard/project/_/settings/api`);
        let { storage: l } = w(
            { ...r, cookieEncoding: r?.cookieEncoding ?? "base64url" },
            !1,
          ),
          c = (0, n.UU)(e, t, {
            ...r,
            global: {
              ...r?.global,
              headers: {
                ...r?.global?.headers,
                "X-Client-Info": `supabase-ssr/${i}`,
              },
            },
            auth: {
              ...r?.auth,
              ...(r?.cookieOptions?.name
                ? { storageKey: r.cookieOptions.name }
                : null),
              flowType: "pkce",
              autoRefreshToken: a(),
              detectSessionInUrl: a(),
              persistSession: !0,
              storage: l,
            },
          });
        return s && (o = c), c;
      }
      function A(e, t, r) {
        if (!e || !t)
          throw Error(`Your project's URL and Key are required to create a Supabase client!

Check your Supabase project's API settings to find these values

https://supabase.com/dashboard/project/_/settings/api`);
        let {
            storage: o,
            getAll: s,
            setAll: a,
            setItems: l,
            removedItems: c,
          } = w({ ...r, cookieEncoding: r?.cookieEncoding ?? "base64url" }, !0),
          u = (0, n.UU)(e, t, {
            ...r,
            global: {
              ...r?.global,
              headers: {
                ...r?.global?.headers,
                "X-Client-Info": `supabase-ssr/${i}`,
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
              storage: o,
            },
          });
        return (
          u.auth.onAuthStateChange(async (e) => {
            (Object.keys(l).length > 0 || Object.keys(c).length > 0) &&
              ("SIGNED_IN" === e ||
                "TOKEN_REFRESHED" === e ||
                "USER_UPDATED" === e ||
                "PASSWORD_RECOVERY" === e ||
                "SIGNED_OUT" === e ||
                "MFA_CHALLENGE_VERIFIED" === e) &&
              (await v(
                { getAll: s, setAll: a, setItems: l, removedItems: c },
                {
                  cookieOptions: r?.cookieOptions ?? null,
                  cookieEncoding: r?.cookieEncoding ?? "base64url",
                },
              ));
          }),
          u
        );
      }
    },
    24327: (e, t) => {
      "use strict";
      (t.q = function (e, t) {
        if ("string" != typeof e)
          throw TypeError("argument str must be a string");
        var r = {},
          n = e.length;
        if (n < 2) return r;
        var i = (t && t.decode) || u,
          s = 0,
          a = 0,
          f = 0;
        do {
          if (-1 === (a = e.indexOf("=", s))) break;
          if (-1 === (f = e.indexOf(";", s))) f = n;
          else if (a > f) {
            s = e.lastIndexOf(";", a - 1) + 1;
            continue;
          }
          var d = l(e, s, a),
            h = c(e, a, d),
            p = e.slice(d, h);
          if (!o.call(r, p)) {
            var y = l(e, a + 1, f),
              b = c(e, f, y);
            34 === e.charCodeAt(y) && 34 === e.charCodeAt(b - 1) && (y++, b--);
            var m = e.slice(y, b);
            r[p] = (function (e, t) {
              try {
                return t(e);
              } catch (t) {
                return e;
              }
            })(m, i);
          }
          s = f + 1;
        } while (s < n);
        return r;
      }),
        (t.l = function (e, t, o) {
          var l = (o && o.encode) || encodeURIComponent;
          if ("function" != typeof l)
            throw TypeError("option encode is invalid");
          if (!n.test(e)) throw TypeError("argument name is invalid");
          var c = l(t);
          if (!i.test(c)) throw TypeError("argument val is invalid");
          var u = e + "=" + c;
          if (!o) return u;
          if (null != o.maxAge) {
            var f = Math.floor(o.maxAge);
            if (!isFinite(f)) throw TypeError("option maxAge is invalid");
            u += "; Max-Age=" + f;
          }
          if (o.domain) {
            if (!s.test(o.domain)) throw TypeError("option domain is invalid");
            u += "; Domain=" + o.domain;
          }
          if (o.path) {
            if (!a.test(o.path)) throw TypeError("option path is invalid");
            u += "; Path=" + o.path;
          }
          if (o.expires) {
            var d,
              h = o.expires;
            if (((d = h), "[object Date]" !== r.call(d) || isNaN(h.valueOf())))
              throw TypeError("option expires is invalid");
            u += "; Expires=" + h.toUTCString();
          }
          if (
            (o.httpOnly && (u += "; HttpOnly"),
            o.secure && (u += "; Secure"),
            o.partitioned && (u += "; Partitioned"),
            o.priority)
          )
            switch (
              "string" == typeof o.priority
                ? o.priority.toLowerCase()
                : o.priority
            ) {
              case "low":
                u += "; Priority=Low";
                break;
              case "medium":
                u += "; Priority=Medium";
                break;
              case "high":
                u += "; Priority=High";
                break;
              default:
                throw TypeError("option priority is invalid");
            }
          if (o.sameSite)
            switch (
              "string" == typeof o.sameSite
                ? o.sameSite.toLowerCase()
                : o.sameSite
            ) {
              case !0:
              case "strict":
                u += "; SameSite=Strict";
                break;
              case "lax":
                u += "; SameSite=Lax";
                break;
              case "none":
                u += "; SameSite=None";
                break;
              default:
                throw TypeError("option sameSite is invalid");
            }
          return u;
        });
      var r = Object.prototype.toString,
        o = Object.prototype.hasOwnProperty,
        n = /^[!#$%&'*+\-.^_`|~0-9A-Za-z]+$/,
        i =
          /^("?)[\u0021\u0023-\u002B\u002D-\u003A\u003C-\u005B\u005D-\u007E]*\1$/,
        s =
          /^([.]?[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)([.][a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)*$/i,
        a = /^[\u0020-\u003A\u003D-\u007E]*$/;
      function l(e, t, r) {
        do {
          var o = e.charCodeAt(t);
          if (32 !== o && 9 !== o) return t;
        } while (++t < r);
        return r;
      }
      function c(e, t, r) {
        for (; t > r; ) {
          var o = e.charCodeAt(--t);
          if (32 !== o && 9 !== o) return t + 1;
        }
        return r;
      }
      function u(e) {
        return -1 !== e.indexOf("%") ? decodeURIComponent(e) : e;
      }
    },
    49977: function (e, t, r) {
      var o;
      !(function (n) {
        "use strict";
        function i(e) {
          var r,
            o = (e && e.Promise) || n.Promise,
            i = (e && e.XMLHttpRequest) || n.XMLHttpRequest;
          return (
            (r = Object.create(n, { fetch: { value: void 0, writable: !0 } })),
            (function (e) {
              var t =
                  (void 0 !== r && r) ||
                  ("undefined" != typeof self && self) ||
                  (void 0 !== t && t),
                n = {
                  searchParams: "URLSearchParams" in t,
                  iterable: "Symbol" in t && "iterator" in Symbol,
                  blob:
                    "FileReader" in t &&
                    "Blob" in t &&
                    (function () {
                      try {
                        return new Blob(), !0;
                      } catch (e) {
                        return !1;
                      }
                    })(),
                  formData: "FormData" in t,
                  arrayBuffer: "ArrayBuffer" in t,
                };
              if (n.arrayBuffer)
                var s = [
                    "[object Int8Array]",
                    "[object Uint8Array]",
                    "[object Uint8ClampedArray]",
                    "[object Int16Array]",
                    "[object Uint16Array]",
                    "[object Int32Array]",
                    "[object Uint32Array]",
                    "[object Float32Array]",
                    "[object Float64Array]",
                  ],
                  a =
                    ArrayBuffer.isView ||
                    function (e) {
                      return (
                        e && s.indexOf(Object.prototype.toString.call(e)) > -1
                      );
                    };
              function l(e) {
                if (
                  ("string" != typeof e && (e = String(e)),
                  /[^a-z0-9\-#$%&'*+.^_`|~!]/i.test(e) || "" === e)
                )
                  throw TypeError("Invalid character in header field name");
                return e.toLowerCase();
              }
              function c(e) {
                return "string" != typeof e && (e = String(e)), e;
              }
              function u(e) {
                var t = {
                  next: function () {
                    var t = e.shift();
                    return { done: void 0 === t, value: t };
                  },
                };
                return (
                  n.iterable &&
                    (t[Symbol.iterator] = function () {
                      return t;
                    }),
                  t
                );
              }
              function f(e) {
                (this.map = {}),
                  e instanceof f
                    ? e.forEach(function (e, t) {
                        this.append(t, e);
                      }, this)
                    : Array.isArray(e)
                      ? e.forEach(function (e) {
                          this.append(e[0], e[1]);
                        }, this)
                      : e &&
                        Object.getOwnPropertyNames(e).forEach(function (t) {
                          this.append(t, e[t]);
                        }, this);
              }
              function d(e) {
                if (e.bodyUsed) return o.reject(TypeError("Already read"));
                e.bodyUsed = !0;
              }
              function h(e) {
                return new o(function (t, r) {
                  (e.onload = function () {
                    t(e.result);
                  }),
                    (e.onerror = function () {
                      r(e.error);
                    });
                });
              }
              function p(e) {
                var t = new FileReader(),
                  r = h(t);
                return t.readAsArrayBuffer(e), r;
              }
              function y(e) {
                if (e.slice) return e.slice(0);
                var t = new Uint8Array(e.byteLength);
                return t.set(new Uint8Array(e)), t.buffer;
              }
              function b() {
                return (
                  (this.bodyUsed = !1),
                  (this._initBody = function (e) {
                    if (
                      ((this.bodyUsed = this.bodyUsed), (this._bodyInit = e), e)
                    )
                      if ("string" == typeof e) this._bodyText = e;
                      else if (n.blob && Blob.prototype.isPrototypeOf(e))
                        this._bodyBlob = e;
                      else if (
                        n.formData &&
                        FormData.prototype.isPrototypeOf(e)
                      )
                        this._bodyFormData = e;
                      else if (
                        n.searchParams &&
                        URLSearchParams.prototype.isPrototypeOf(e)
                      )
                        this._bodyText = e.toString();
                      else {
                        var t;
                        n.arrayBuffer &&
                        n.blob &&
                        (t = e) &&
                        DataView.prototype.isPrototypeOf(t)
                          ? ((this._bodyArrayBuffer = y(e.buffer)),
                            (this._bodyInit = new Blob([
                              this._bodyArrayBuffer,
                            ])))
                          : n.arrayBuffer &&
                              (ArrayBuffer.prototype.isPrototypeOf(e) || a(e))
                            ? (this._bodyArrayBuffer = y(e))
                            : (this._bodyText = e =
                                Object.prototype.toString.call(e));
                      }
                    else this._bodyText = "";
                    !this.headers.get("content-type") &&
                      ("string" == typeof e
                        ? this.headers.set(
                            "content-type",
                            "text/plain;charset=UTF-8",
                          )
                        : this._bodyBlob && this._bodyBlob.type
                          ? this.headers.set(
                              "content-type",
                              this._bodyBlob.type,
                            )
                          : n.searchParams &&
                            URLSearchParams.prototype.isPrototypeOf(e) &&
                            this.headers.set(
                              "content-type",
                              "application/x-www-form-urlencoded;charset=UTF-8",
                            ));
                  }),
                  n.blob &&
                    ((this.blob = function () {
                      var e = d(this);
                      if (e) return e;
                      if (this._bodyBlob) return o.resolve(this._bodyBlob);
                      if (this._bodyArrayBuffer)
                        return o.resolve(new Blob([this._bodyArrayBuffer]));
                      if (!this._bodyFormData)
                        return o.resolve(new Blob([this._bodyText]));
                      throw Error("could not read FormData body as blob");
                    }),
                    (this.arrayBuffer = function () {
                      if (!this._bodyArrayBuffer) return this.blob().then(p);
                      var e = d(this);
                      return (
                        e ||
                        (ArrayBuffer.isView(this._bodyArrayBuffer)
                          ? o.resolve(
                              this._bodyArrayBuffer.buffer.slice(
                                this._bodyArrayBuffer.byteOffset,
                                this._bodyArrayBuffer.byteOffset +
                                  this._bodyArrayBuffer.byteLength,
                              ),
                            )
                          : o.resolve(this._bodyArrayBuffer))
                      );
                    })),
                  (this.text = function () {
                    var e,
                      t,
                      r,
                      n = d(this);
                    if (n) return n;
                    if (this._bodyBlob)
                      return (
                        (e = this._bodyBlob),
                        (r = h((t = new FileReader()))),
                        t.readAsText(e),
                        r
                      );
                    if (this._bodyArrayBuffer)
                      return o.resolve(
                        (function (e) {
                          for (
                            var t = new Uint8Array(e),
                              r = Array(t.length),
                              o = 0;
                            o < t.length;
                            o++
                          )
                            r[o] = String.fromCharCode(t[o]);
                          return r.join("");
                        })(this._bodyArrayBuffer),
                      );
                    if (!this._bodyFormData) return o.resolve(this._bodyText);
                    throw Error("could not read FormData body as text");
                  }),
                  n.formData &&
                    (this.formData = function () {
                      return this.text().then(w);
                    }),
                  (this.json = function () {
                    return this.text().then(JSON.parse);
                  }),
                  this
                );
              }
              (f.prototype.append = function (e, t) {
                (e = l(e)), (t = c(t));
                var r = this.map[e];
                this.map[e] = r ? r + ", " + t : t;
              }),
                (f.prototype.delete = function (e) {
                  delete this.map[l(e)];
                }),
                (f.prototype.get = function (e) {
                  return (e = l(e)), this.has(e) ? this.map[e] : null;
                }),
                (f.prototype.has = function (e) {
                  return this.map.hasOwnProperty(l(e));
                }),
                (f.prototype.set = function (e, t) {
                  this.map[l(e)] = c(t);
                }),
                (f.prototype.forEach = function (e, t) {
                  for (var r in this.map)
                    this.map.hasOwnProperty(r) &&
                      e.call(t, this.map[r], r, this);
                }),
                (f.prototype.keys = function () {
                  var e = [];
                  return (
                    this.forEach(function (t, r) {
                      e.push(r);
                    }),
                    u(e)
                  );
                }),
                (f.prototype.values = function () {
                  var e = [];
                  return (
                    this.forEach(function (t) {
                      e.push(t);
                    }),
                    u(e)
                  );
                }),
                (f.prototype.entries = function () {
                  var e = [];
                  return (
                    this.forEach(function (t, r) {
                      e.push([r, t]);
                    }),
                    u(e)
                  );
                }),
                n.iterable &&
                  (f.prototype[Symbol.iterator] = f.prototype.entries);
              var m = ["DELETE", "GET", "HEAD", "OPTIONS", "POST", "PUT"];
              function g(e, t) {
                if (!(this instanceof g))
                  throw TypeError(
                    'Please use the "new" operator, this DOM object constructor cannot be called as a function.',
                  );
                var r,
                  o,
                  n = (t = t || {}).body;
                if (e instanceof g) {
                  if (e.bodyUsed) throw TypeError("Already read");
                  (this.url = e.url),
                    (this.credentials = e.credentials),
                    t.headers || (this.headers = new f(e.headers)),
                    (this.method = e.method),
                    (this.mode = e.mode),
                    (this.signal = e.signal),
                    n ||
                      null == e._bodyInit ||
                      ((n = e._bodyInit), (e.bodyUsed = !0));
                } else this.url = String(e);
                if (
                  ((this.credentials =
                    t.credentials || this.credentials || "same-origin"),
                  (t.headers || !this.headers) &&
                    (this.headers = new f(t.headers)),
                  (this.method =
                    ((o = (r = t.method || this.method || "GET").toUpperCase()),
                    m.indexOf(o) > -1 ? o : r)),
                  (this.mode = t.mode || this.mode || null),
                  (this.signal = t.signal || this.signal),
                  (this.referrer = null),
                  ("GET" === this.method || "HEAD" === this.method) && n)
                )
                  throw TypeError("Body not allowed for GET or HEAD requests");
                if (
                  (this._initBody(n),
                  ("GET" === this.method || "HEAD" === this.method) &&
                    ("no-store" === t.cache || "no-cache" === t.cache))
                ) {
                  var i = /([?&])_=[^&]*/;
                  i.test(this.url)
                    ? (this.url = this.url.replace(
                        i,
                        "$1_=" + new Date().getTime(),
                      ))
                    : (this.url +=
                        (/\?/.test(this.url) ? "&" : "?") +
                        "_=" +
                        new Date().getTime());
                }
              }
              function w(e) {
                var t = new FormData();
                return (
                  e
                    .trim()
                    .split("&")
                    .forEach(function (e) {
                      if (e) {
                        var r = e.split("="),
                          o = r.shift().replace(/\+/g, " "),
                          n = r.join("=").replace(/\+/g, " ");
                        t.append(decodeURIComponent(o), decodeURIComponent(n));
                      }
                    }),
                  t
                );
              }
              function v(e, t) {
                if (!(this instanceof v))
                  throw TypeError(
                    'Please use the "new" operator, this DOM object constructor cannot be called as a function.',
                  );
                t || (t = {}),
                  (this.type = "default"),
                  (this.status = void 0 === t.status ? 200 : t.status),
                  (this.ok = this.status >= 200 && this.status < 300),
                  (this.statusText = "statusText" in t ? t.statusText : ""),
                  (this.headers = new f(t.headers)),
                  (this.url = t.url || ""),
                  this._initBody(e);
              }
              (g.prototype.clone = function () {
                return new g(this, { body: this._bodyInit });
              }),
                b.call(g.prototype),
                b.call(v.prototype),
                (v.prototype.clone = function () {
                  return new v(this._bodyInit, {
                    status: this.status,
                    statusText: this.statusText,
                    headers: new f(this.headers),
                    url: this.url,
                  });
                }),
                (v.error = function () {
                  var e = new v(null, { status: 0, statusText: "" });
                  return (e.type = "error"), e;
                });
              var E = [301, 302, 303, 307, 308];
              (v.redirect = function (e, t) {
                if (-1 === E.indexOf(t))
                  throw RangeError("Invalid status code");
                return new v(null, { status: t, headers: { location: e } });
              }),
                (e.DOMException = t.DOMException);
              try {
                new e.DOMException();
              } catch (t) {
                (e.DOMException = function (e, t) {
                  (this.message = e), (this.name = t);
                  var r = Error(e);
                  this.stack = r.stack;
                }),
                  (e.DOMException.prototype = Object.create(Error.prototype)),
                  (e.DOMException.prototype.constructor = e.DOMException);
              }
              function A(r, s) {
                return new o(function (o, a) {
                  var l = new g(r, s);
                  if (l.signal && l.signal.aborted)
                    return a(new e.DOMException("Aborted", "AbortError"));
                  var u = new i();
                  function d() {
                    u.abort();
                  }
                  (u.onload = function () {
                    var e,
                      t,
                      r = {
                        status: u.status,
                        statusText: u.statusText,
                        headers:
                          ((e = u.getAllResponseHeaders() || ""),
                          (t = new f()),
                          e
                            .replace(/\r?\n[\t ]+/g, " ")
                            .split("\r")
                            .map(function (e) {
                              return 0 === e.indexOf("\n")
                                ? e.substr(1, e.length)
                                : e;
                            })
                            .forEach(function (e) {
                              var r = e.split(":"),
                                o = r.shift().trim();
                              if (o) {
                                var n = r.join(":").trim();
                                t.append(o, n);
                              }
                            }),
                          t),
                      };
                    r.url =
                      "responseURL" in u
                        ? u.responseURL
                        : r.headers.get("X-Request-URL");
                    var n = "response" in u ? u.response : u.responseText;
                    setTimeout(function () {
                      o(new v(n, r));
                    }, 0);
                  }),
                    (u.onerror = function () {
                      setTimeout(function () {
                        a(TypeError("Network request failed"));
                      }, 0);
                    }),
                    (u.ontimeout = function () {
                      setTimeout(function () {
                        a(TypeError("Network request failed"));
                      }, 0);
                    }),
                    (u.onabort = function () {
                      setTimeout(function () {
                        a(new e.DOMException("Aborted", "AbortError"));
                      }, 0);
                    }),
                    u.open(
                      l.method,
                      (function (e) {
                        try {
                          return "" === e && t.location.href
                            ? t.location.href
                            : e;
                        } catch (t) {
                          return e;
                        }
                      })(l.url),
                      !0,
                    ),
                    "include" === l.credentials
                      ? (u.withCredentials = !0)
                      : "omit" === l.credentials && (u.withCredentials = !1),
                    "responseType" in u &&
                      (n.blob
                        ? (u.responseType = "blob")
                        : n.arrayBuffer &&
                          l.headers.get("Content-Type") &&
                          -1 !==
                            l.headers
                              .get("Content-Type")
                              .indexOf("application/octet-stream") &&
                          (u.responseType = "arraybuffer")),
                    !s || "object" != typeof s.headers || s.headers instanceof f
                      ? l.headers.forEach(function (e, t) {
                          u.setRequestHeader(t, e);
                        })
                      : Object.getOwnPropertyNames(s.headers).forEach(
                          function (e) {
                            u.setRequestHeader(e, c(s.headers[e]));
                          },
                        ),
                    l.signal &&
                      (l.signal.addEventListener("abort", d),
                      (u.onreadystatechange = function () {
                        4 === u.readyState &&
                          l.signal.removeEventListener("abort", d);
                      })),
                    u.send(void 0 === l._bodyInit ? null : l._bodyInit);
                });
              }
              (A.polyfill = !0),
                t.fetch ||
                  ((t.fetch = A),
                  (t.Headers = f),
                  (t.Request = g),
                  (t.Response = v)),
                (e.Headers = f),
                (e.Request = g),
                (e.Response = v),
                (e.fetch = A),
                Object.defineProperty(e, "__esModule", { value: !0 });
            })(t),
            {
              fetch: r.fetch,
              Headers: r.Headers,
              Request: r.Request,
              Response: r.Response,
              DOMException: r.DOMException,
            }
          );
        }
        void 0 ===
          (o = function () {
            return i;
          }.call(t, r, t, e)) || (e.exports = o);
      })(
        "undefined" != typeof globalThis
          ? globalThis
          : "undefined" != typeof self
            ? self
            : void 0 !== r.g
              ? r.g
              : this,
      );
    },
  },
]);
//# sourceMappingURL=283.js.map
