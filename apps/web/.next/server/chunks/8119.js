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
    (e._sentryDebugIds[t] = "af5a412b-911e-4e8f-9e4d-b5559c865624"),
    (e._sentryDebugIdIdentifier =
      "sentry-dbid-af5a412b-911e-4e8f-9e4d-b5559c865624"));
} catch (e) {}
("use strict");
(exports.id = 8119),
  (exports.ids = [8119]),
  (exports.modules = {
    61578: (e, t) => {
      (t.q = function (e, t) {
        if ("string" != typeof e)
          throw TypeError("argument str must be a string");
        var r = {},
          n = e.length;
        if (n < 2) return r;
        var i = (t && t.decode) || u,
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
          if (!o.call(r, h)) {
            var g = l(e, s + 1, d),
              m = c(e, d, g);
            34 === e.charCodeAt(g) && 34 === e.charCodeAt(m - 1) && (g++, m--);
            var y = e.slice(g, m);
            r[h] = (function (e, t) {
              try {
                return t(e);
              } catch (t) {
                return e;
              }
            })(y, i);
          }
          a = d + 1;
        } while (a < n);
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
            var d = Math.floor(o.maxAge);
            if (!isFinite(d)) throw TypeError("option maxAge is invalid");
            u += "; Max-Age=" + d;
          }
          if (o.domain) {
            if (!a.test(o.domain)) throw TypeError("option domain is invalid");
            u += "; Domain=" + o.domain;
          }
          if (o.path) {
            if (!s.test(o.path)) throw TypeError("option path is invalid");
            u += "; Path=" + o.path;
          }
          if (o.expires) {
            var f,
              p = o.expires;
            if (((f = p), "[object Date]" !== r.call(f) || isNaN(p.valueOf())))
              throw TypeError("option expires is invalid");
            u += "; Expires=" + p.toUTCString();
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
        a =
          /^([.]?[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)([.][a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)*$/i,
        s = /^[\u0020-\u003A\u003D-\u007E]*$/;
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
    68119: (e, t, r) => {
      let o;
      r.d(t, { createBrowserClient: () => k, createServerClient: () => A });
      var n = r(77719);
      let i = "0.5.2";
      var a = r(61578);
      function s() {
        return "undefined" != typeof window && void 0 !== window.document;
      }
      let l = { path: "/", sameSite: "lax", httpOnly: !1, maxAge: 3456e4 },
        c = /^(.*)[.](0|[1-9][0-9]*)$/;
      function u(e, t) {
        if (e === t) return !0;
        let r = e.match(c);
        return !!r && r[1] === t;
      }
      function d(e, t, r) {
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
      async function f(e, t) {
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
      let p =
          "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_".split(
            "",
          ),
        h = " 	\n\r=".split(""),
        g = (() => {
          let e = Array(128);
          for (let t = 0; t < e.length; t += 1) e[t] = -1;
          for (let t = 0; t < h.length; t += 1) e[h[t].charCodeAt(0)] = -2;
          for (let t = 0; t < p.length; t += 1) e[p[t].charCodeAt(0)] = t;
          return e;
        })();
      function m(e) {
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
              t.push(p[e]), (o -= 6);
            }
          }),
          o > 0)
        )
          for (r <<= 6 - o, o = 6; o >= 6; ) {
            let e = (r >> (o - 6)) & 63;
            t.push(p[e]), (o -= 6);
          }
        return t.join("");
      }
      function y(e) {
        let t = [],
          r = (e) => {
            t.push(String.fromCodePoint(e));
          },
          o = { utf8seq: 0, codepoint: 0 },
          n = 0,
          i = 0;
        for (let t = 0; t < e.length; t += 1) {
          let a = g[e.charCodeAt(t)];
          if (a > -1)
            for (n = (n << 6) | a, i += 6; i >= 8; )
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
          else if (-2 === a) continue;
          else
            throw Error(
              `Invalid Base64-URL character "${e.at(t)}" at position ${t}`,
            );
        }
        return t.join("");
      }
      let w = "base64-";
      function b(e, t) {
        let r,
          o,
          n = e.cookies ?? null,
          i = e.cookieEncoding,
          c = {},
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
              `@supabase/ssr: ${t ? "createServerClient" : "createBrowserClient"} requires configuring getAll and setAll cookie methods (deprecated: alternatively use get, set and remove).${s() ? " As this is called in a browser runtime, consider removing the cookies option object to use the document.cookie API automatically." : ""}`,
            );
        else if (!t && s()) {
          let e = () => {
            let e = (0, a.q)(document.cookie);
            return Object.keys(e).map((t) => ({ name: t, value: e[t] }));
          };
          (r = () => e()),
            (o = (e) => {
              e.forEach(({ name: e, value: t, options: r }) => {
                document.cookie = (0, a.l)(e, t, r);
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
              removedItems: p,
              storage: {
                isServer: !0,
                getItem: async (e) => {
                  if ("string" == typeof c[e]) return c[e];
                  if (p[e]) return null;
                  let t = await r([e]),
                    o = await f(e, async (e) => {
                      let r = t?.find(({ name: t }) => t === e) || null;
                      return r ? r.value : null;
                    });
                  if (!o) return null;
                  let n = o;
                  return (
                    "string" == typeof o &&
                      o.startsWith(w) &&
                      (n = y(o.substring(w.length))),
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
                    delete p[t];
                },
                removeItem: async (e) => {
                  delete c[e], (p[e] = !0);
                },
              },
            }
          : {
              getAll: r,
              setAll: o,
              setItems: c,
              removedItems: p,
              storage: {
                isServer: !1,
                getItem: async (e) => {
                  let t = await r([e]),
                    o = await f(e, async (e) => {
                      let r = t?.find(({ name: t }) => t === e) || null;
                      return r ? r.value : null;
                    });
                  if (!o) return null;
                  let n = o;
                  return o.startsWith(w) && (n = y(o.substring(w.length))), n;
                },
                setItem: async (t, n) => {
                  let a = await r([t]),
                    s = new Set(
                      (a?.map(({ name: e }) => e) || []).filter((e) => u(e, t)),
                    ),
                    c = n;
                  "base64url" === i && (c = w + m(n));
                  let f = d(t, c);
                  f.forEach(({ name: e }) => {
                    s.delete(e);
                  });
                  let p = { ...l, ...e?.cookieOptions, maxAge: 0 },
                    h = { ...l, ...e?.cookieOptions, maxAge: l.maxAge };
                  delete p.name, delete h.name;
                  let g = [
                    ...[...s].map((e) => ({ name: e, value: "", options: p })),
                    ...f.map(({ name: e, value: t }) => ({
                      name: e,
                      value: t,
                      options: h,
                    })),
                  ];
                  g.length > 0 && (await o(g));
                },
                removeItem: async (t) => {
                  let n = await r([t]),
                    i = (n?.map(({ name: e }) => e) || []).filter((e) =>
                      u(e, t),
                    ),
                    a = { ...l, ...e?.cookieOptions, maxAge: 0 };
                  delete a.name,
                    i.length > 0 &&
                      (await o(
                        i.map((e) => ({ name: e, value: "", options: a })),
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
          a = n.cookieOptions ?? null,
          s = await e([
            ...(r ? Object.keys(r) : []),
            ...(o ? Object.keys(o) : []),
          ]),
          c = s?.map(({ name: e }) => e) || [],
          f = Object.keys(o).flatMap((e) => c.filter((t) => u(t, e))),
          p = Object.keys(r).flatMap((e) => {
            let t = new Set(c.filter((t) => u(t, e))),
              o = r[e];
            "base64url" === i && (o = w + m(o));
            let n = d(e, o);
            return (
              n.forEach((e) => {
                t.delete(e.name);
              }),
              f.push(...t),
              n
            );
          }),
          h = { ...l, ...a, maxAge: 0 },
          g = { ...l, ...a, maxAge: l.maxAge };
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
      function k(e, t, r) {
        let a = r?.isSingleton === !0 || ((!r || !("isSingleton" in r)) && s());
        if (a && o) return o;
        if (!e || !t)
          throw Error(`@supabase/ssr: Your project's URL and API key are required to create a Supabase client!

Check your Supabase project's API settings to find these values

https://supabase.com/dashboard/project/_/settings/api`);
        let { storage: l } = b(
            { ...r, cookieEncoding: r?.cookieEncoding ?? "base64url" },
            !1,
          ),
          c = (0, n.createClient)(e, t, {
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
              autoRefreshToken: s(),
              detectSessionInUrl: s(),
              persistSession: !0,
              storage: l,
            },
          });
        return a && (o = c), c;
      }
      function A(e, t, r) {
        if (!e || !t)
          throw Error(`Your project's URL and Key are required to create a Supabase client!

Check your Supabase project's API settings to find these values

https://supabase.com/dashboard/project/_/settings/api`);
        let {
            storage: o,
            getAll: a,
            setAll: s,
            setItems: l,
            removedItems: c,
          } = b({ ...r, cookieEncoding: r?.cookieEncoding ?? "base64url" }, !0),
          u = (0, n.createClient)(e, t, {
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
                { getAll: a, setAll: s, setItems: l, removedItems: c },
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
  });
//# sourceMappingURL=8119.js.map
