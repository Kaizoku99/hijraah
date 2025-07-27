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
    (e._sentryDebugIds[t] = "6c5e6e19-391e-418b-bdc6-e3796bc54694"),
    (e._sentryDebugIdIdentifier =
      "sentry-dbid-6c5e6e19-391e-418b-bdc6-e3796bc54694"));
} catch (e) {}
("use strict");
(exports.id = 7713),
  (exports.ids = [7713]),
  (exports.modules = {
    69292: (e, t) => {
      (t.q = function (e, t) {
        if ("string" != typeof e)
          throw TypeError("argument str must be a string");
        var r = {},
          n = e.length;
        if (n < 2) return r;
        var o = (t && t.decode) || u,
          a = 0,
          s = 0,
          d = 0;
        do {
          if (-1 === (s = e.indexOf("=", a))) break;
          if (-1 === (d = e.indexOf(";", a))) d = n;
          else if (s > d) {
            a = e.lastIndexOf(";", s - 1) + 1;
            continue;
          }
          var f = l(e, a, s),
            p = c(e, s, f),
            h = e.slice(f, p);
          if (!i.call(r, h)) {
            var m = l(e, s + 1, d),
              g = c(e, d, m);
            34 === e.charCodeAt(m) && 34 === e.charCodeAt(g - 1) && (m++, g--);
            var y = e.slice(m, g);
            r[h] = (function (e, t) {
              try {
                return t(e);
              } catch (t) {
                return e;
              }
            })(y, o);
          }
          a = d + 1;
        } while (a < n);
        return r;
      }),
        (t.l = function (e, t, i) {
          var l = (i && i.encode) || encodeURIComponent;
          if ("function" != typeof l)
            throw TypeError("option encode is invalid");
          if (!n.test(e)) throw TypeError("argument name is invalid");
          var c = l(t);
          if (!o.test(c)) throw TypeError("argument val is invalid");
          var u = e + "=" + c;
          if (!i) return u;
          if (null != i.maxAge) {
            var d = Math.floor(i.maxAge);
            if (!isFinite(d)) throw TypeError("option maxAge is invalid");
            u += "; Max-Age=" + d;
          }
          if (i.domain) {
            if (!a.test(i.domain)) throw TypeError("option domain is invalid");
            u += "; Domain=" + i.domain;
          }
          if (i.path) {
            if (!s.test(i.path)) throw TypeError("option path is invalid");
            u += "; Path=" + i.path;
          }
          if (i.expires) {
            var f,
              p = i.expires;
            if (((f = p), "[object Date]" !== r.call(f) || isNaN(p.valueOf())))
              throw TypeError("option expires is invalid");
            u += "; Expires=" + p.toUTCString();
          }
          if (
            (i.httpOnly && (u += "; HttpOnly"),
            i.secure && (u += "; Secure"),
            i.partitioned && (u += "; Partitioned"),
            i.priority)
          )
            switch (
              "string" == typeof i.priority
                ? i.priority.toLowerCase()
                : i.priority
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
          if (i.sameSite)
            switch (
              "string" == typeof i.sameSite
                ? i.sameSite.toLowerCase()
                : i.sameSite
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
        i = Object.prototype.hasOwnProperty,
        n = /^[!#$%&'*+\-.^_`|~0-9A-Za-z]+$/,
        o =
          /^("?)[\u0021\u0023-\u002B\u002D-\u003A\u003C-\u005B\u005D-\u007E]*\1$/,
        a =
          /^([.]?[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)([.][a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)*$/i,
        s = /^[\u0020-\u003A\u003D-\u007E]*$/;
      function l(e, t, r) {
        do {
          var i = e.charCodeAt(t);
          if (32 !== i && 9 !== i) return t;
        } while (++t < r);
        return r;
      }
      function c(e, t, r) {
        for (; t > r; ) {
          var i = e.charCodeAt(--t);
          if (32 !== i && 9 !== i) return t + 1;
        }
        return r;
      }
      function u(e) {
        return -1 !== e.indexOf("%") ? decodeURIComponent(e) : e;
      }
    },
    97713: (e, t, r) => {
      let i;
      r.d(t, { createBrowserClient: () => b });
      var n = r(12872),
        o = r(69292);
      function a() {
        return "undefined" != typeof window && void 0 !== window.document;
      }
      let s = { path: "/", sameSite: "lax", httpOnly: !1, maxAge: 3456e4 },
        l = /^(.*)[.](0|[1-9][0-9]*)$/;
      function c(e, t) {
        if (e === t) return !0;
        let r = e.match(l);
        return !!r && r[1] === t;
      }
      function u(e, t, r) {
        let i = r ?? 3180,
          n = encodeURIComponent(t);
        if (n.length <= i) return [{ name: e, value: t }];
        let o = [];
        for (; n.length > 0; ) {
          let e = n.slice(0, i),
            t = e.lastIndexOf("%");
          t > i - 3 && (e = e.slice(0, t));
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
          o.push(r), (n = n.slice(e.length));
        }
        return o.map((t, r) => ({ name: `${e}.${r}`, value: t }));
      }
      async function d(e, t) {
        let r = await t(e);
        if (r) return r;
        let i = [];
        for (let r = 0; ; r++) {
          let n = `${e}.${r}`,
            o = await t(n);
          if (!o) break;
          i.push(o);
        }
        return i.length > 0 ? i.join("") : null;
      }
      let f =
          "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_".split(
            "",
          ),
        p = " 	\n\r=".split(""),
        h = (() => {
          let e = Array(128);
          for (let t = 0; t < e.length; t += 1) e[t] = -1;
          for (let t = 0; t < p.length; t += 1) e[p[t].charCodeAt(0)] = -2;
          for (let t = 0; t < f.length; t += 1) e[f[t].charCodeAt(0)] = t;
          return e;
        })();
      function m(e) {
        let t = [],
          r = 0,
          i = 0;
        if (
          ((function (e, t) {
            for (let r = 0; r < e.length; r += 1) {
              let i = e.charCodeAt(r);
              if (i > 55295 && i <= 56319) {
                let t = ((i - 55296) * 1024) & 65535;
                (i = (((e.charCodeAt(r + 1) - 56320) & 65535) | t) + 65536),
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
              })(i, t);
            }
          })(e, (e) => {
            for (r = (r << 8) | e, i += 8; i >= 6; ) {
              let e = (r >> (i - 6)) & 63;
              t.push(f[e]), (i -= 6);
            }
          }),
          i > 0)
        )
          for (r <<= 6 - i, i = 6; i >= 6; ) {
            let e = (r >> (i - 6)) & 63;
            t.push(f[e]), (i -= 6);
          }
        return t.join("");
      }
      function g(e) {
        let t = [],
          r = (e) => {
            t.push(String.fromCodePoint(e));
          },
          i = { utf8seq: 0, codepoint: 0 },
          n = 0,
          o = 0;
        for (let t = 0; t < e.length; t += 1) {
          let a = h[e.charCodeAt(t)];
          if (a > -1)
            for (n = (n << 6) | a, o += 6; o >= 8; )
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
              })((n >> (o - 8)) & 255, i, r),
                (o -= 8);
          else if (-2 === a) continue;
          else
            throw Error(
              `Invalid Base64-URL character "${e.at(t)}" at position ${t}`,
            );
        }
        return t.join("");
      }
      let y = "base64-";
      async function w(
        { getAll: e, setAll: t, setItems: r, removedItems: i },
        n,
      ) {
        let o = n.cookieEncoding,
          a = n.cookieOptions ?? null,
          l = await e([
            ...(r ? Object.keys(r) : []),
            ...(i ? Object.keys(i) : []),
          ]),
          d = l?.map(({ name: e }) => e) || [],
          f = Object.keys(i).flatMap((e) => d.filter((t) => c(t, e))),
          p = Object.keys(r).flatMap((e) => {
            let t = new Set(d.filter((t) => c(t, e))),
              i = r[e];
            "base64url" === o && (i = y + m(i));
            let n = u(e, i);
            return (
              n.forEach((e) => {
                t.delete(e.name);
              }),
              f.push(...t),
              n
            );
          }),
          h = { ...s, ...a, maxAge: 0 },
          g = { ...s, ...a, maxAge: s.maxAge };
        delete h.name,
          delete g.name,
          await t([
            ...f.map((e) => ({ name: e, value: "", options: h })),
            ...p.map(({ name: e, value: t }) => ({
              name: e,
              value: t,
              options: g,
            })),
          ]);
      }
      function b(e, t, r) {
        let l = r?.isSingleton === !0 || ((!r || !("isSingleton" in r)) && a());
        if (l && i) return i;
        if (!e || !t)
          throw Error(`@supabase/ssr: Your project's URL and API key are required to create a Supabase client!

Check your Supabase project's API settings to find these values

https://supabase.com/dashboard/project/_/settings/api`);
        let { storage: f } = (function (e, t) {
            let r,
              i,
              n = e.cookies ?? null,
              l = e.cookieEncoding,
              f = {},
              p = {};
            if (n)
              if ("get" in n) {
                let e = async (e) => {
                  let t = e.flatMap((e) => [
                      e,
                      ...Array.from({ length: 5 }).map((t, r) => `${e}.${r}`),
                    ]),
                    r = [];
                  for (let e = 0; e < t.length; e += 1) {
                    let i = await n.get(t[e]);
                    (i || "string" == typeof i) &&
                      r.push({ name: t[e], value: i });
                  }
                  return r;
                };
                if (
                  ((r = async (t) => await e(t)), "set" in n && "remove" in n)
                )
                  i = async (e) => {
                    for (let t = 0; t < e.length; t += 1) {
                      let { name: r, value: i, options: o } = e[t];
                      i ? await n.set(r, i, o) : await n.remove(r, o);
                    }
                  };
                else if (t)
                  i = async () => {
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
                  i = n.setAll;
                else if (t)
                  i = async () => {
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
                let e = (0, o.q)(document.cookie);
                return Object.keys(e).map((t) => ({ name: t, value: e[t] }));
              };
              (r = () => e()),
                (i = (e) => {
                  e.forEach(({ name: e, value: t, options: r }) => {
                    document.cookie = (0, o.l)(e, t, r);
                  });
                });
            } else if (t)
              throw Error(
                "@supabase/ssr: createServerClient must be initialized with cookie options that specify getAll and setAll functions (deprecated, not recommended: alternatively use get, set and remove)",
              );
            else
              (r = () => []),
                (i = () => {
                  throw Error(
                    "@supabase/ssr: createBrowserClient in non-browser runtimes (including Next.js pre-rendering mode) was not initialized cookie options that specify getAll and setAll functions (deprecated: alternatively use get, set and remove), but they were needed",
                  );
                });
            return t
              ? {
                  getAll: r,
                  setAll: i,
                  setItems: f,
                  removedItems: p,
                  storage: {
                    isServer: !0,
                    getItem: async (e) => {
                      if ("string" == typeof f[e]) return f[e];
                      if (p[e]) return null;
                      let t = await r([e]),
                        i = await d(e, async (e) => {
                          let r = t?.find(({ name: t }) => t === e) || null;
                          return r ? r.value : null;
                        });
                      if (!i) return null;
                      let n = i;
                      return (
                        "string" == typeof i &&
                          i.startsWith(y) &&
                          (n = g(i.substring(y.length))),
                        n
                      );
                    },
                    setItem: async (t, n) => {
                      t.endsWith("-code-verifier") &&
                        (await w(
                          {
                            getAll: r,
                            setAll: i,
                            setItems: { [t]: n },
                            removedItems: {},
                          },
                          {
                            cookieOptions: e?.cookieOptions ?? null,
                            cookieEncoding: l,
                          },
                        )),
                        (f[t] = n),
                        delete p[t];
                    },
                    removeItem: async (e) => {
                      delete f[e], (p[e] = !0);
                    },
                  },
                }
              : {
                  getAll: r,
                  setAll: i,
                  setItems: f,
                  removedItems: p,
                  storage: {
                    isServer: !1,
                    getItem: async (e) => {
                      let t = await r([e]),
                        i = await d(e, async (e) => {
                          let r = t?.find(({ name: t }) => t === e) || null;
                          return r ? r.value : null;
                        });
                      if (!i) return null;
                      let n = i;
                      return (
                        i.startsWith(y) && (n = g(i.substring(y.length))), n
                      );
                    },
                    setItem: async (t, n) => {
                      let o = await r([t]),
                        a = new Set(
                          (o?.map(({ name: e }) => e) || []).filter((e) =>
                            c(e, t),
                          ),
                        ),
                        d = n;
                      "base64url" === l && (d = y + m(n));
                      let f = u(t, d);
                      f.forEach(({ name: e }) => {
                        a.delete(e);
                      });
                      let p = { ...s, ...e?.cookieOptions, maxAge: 0 },
                        h = { ...s, ...e?.cookieOptions, maxAge: s.maxAge };
                      delete p.name, delete h.name;
                      let g = [
                        ...[...a].map((e) => ({
                          name: e,
                          value: "",
                          options: p,
                        })),
                        ...f.map(({ name: e, value: t }) => ({
                          name: e,
                          value: t,
                          options: h,
                        })),
                      ];
                      g.length > 0 && (await i(g));
                    },
                    removeItem: async (t) => {
                      let n = await r([t]),
                        o = (n?.map(({ name: e }) => e) || []).filter((e) =>
                          c(e, t),
                        ),
                        a = { ...s, ...e?.cookieOptions, maxAge: 0 };
                      delete a.name,
                        o.length > 0 &&
                          (await i(
                            o.map((e) => ({ name: e, value: "", options: a })),
                          ));
                    },
                  },
                };
          })({ ...r, cookieEncoding: r?.cookieEncoding ?? "base64url" }, !1),
          p = (0, n.createClient)(e, t, {
            ...r,
            global: {
              ...r?.global,
              headers: {
                ...r?.global?.headers,
                "X-Client-Info": "supabase-ssr/0.5.2",
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
              storage: f,
            },
          });
        return l && (i = p), p;
      }
    },
  });
//# sourceMappingURL=7713.js.map
