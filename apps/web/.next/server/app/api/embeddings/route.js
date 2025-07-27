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
    (e._sentryDebugIds[r] = "e76f70c8-17fd-4ccb-b401-051e4644d999"),
    (e._sentryDebugIdIdentifier =
      "sentry-dbid-e76f70c8-17fd-4ccb-b401-051e4644d999"));
} catch (e) {}
(() => {
  var e = {};
  (e.id = 8856),
    (e.ids = [8856]),
    (e.modules = {
      4839: (e, r, t) => {
        "use strict";
        t.d(r, { l: () => o });
        var s = t(24277),
          i = t(14567),
          o = (e, r, t) =>
            (0, s.N)(e, async (s, o) => {
              let n = s;
              if ("header" === e && r instanceof i.bv) {
                let e = Object.fromEntries(
                  Object.keys(r.shape).map((e) => [e.toLowerCase(), e]),
                );
                n = Object.fromEntries(
                  Object.entries(s).map(([r, t]) => [e[r] || r, t]),
                );
              }
              let a = await r.safeParseAsync(n);
              if (t) {
                let r = await t({ data: n, ...a, target: e }, o);
                if (r) {
                  if (r instanceof Response) return r;
                  if ("response" in r) return r.response;
                }
              }
              return a.success ? a.data : o.json(a, 400);
            });
      },
      6934: () => {},
      8086: (e) => {
        "use strict";
        e.exports = require("module");
      },
      8963: (e) => {
        function r(e) {
          var r = Error("Cannot find module '" + e + "'");
          throw ((r.code = "MODULE_NOT_FOUND"), r);
        }
        (r.keys = () => []), (r.resolve = r), (r.id = 8963), (e.exports = r);
      },
      10846: (e) => {
        "use strict";
        e.exports = require("next/dist/compiled/next-server/app-page.runtime.prod.js");
      },
      16513: (e, r, t) => {
        "use strict";
        t.d(r, { u: () => i });
        let s = ["\n\n", "\n", ". ", "? ", "! ", " ", ""];
        function i(e, r) {
          let t = r?.chunkSize ?? 1e3,
            i = r?.chunkOverlap ?? 100,
            o = r?.separators ?? s;
          if (t <= i)
            throw Error("Chunk size must be greater than chunk overlap.");
          let n = [],
            a = 0,
            u = o[0],
            d = e.split(u);
          for (;;) {
            let r = !1;
            for (let e of d)
              if (e.length > t) {
                r = !0;
                break;
              }
            if (!r) break;
            if (++a >= o.length) {
              u = "";
              break;
            }
            (u = o[a]), (d = e.split(u));
          }
          let c = "";
          for (let e = 0; e < d.length; e++) {
            let r = d[e],
              s = e < d.length - 1 ? u : "";
            if (c.length + r.length + s.length > t) {
              c.length > 0 && n.push(c.trim());
              let e = Math.max(0, c.length - i);
              c = (c.substring(e) + r + s).trim();
            } else c += r + s;
          }
          return (
            c.length > 0 && n.push(c.trim()), n.filter((e) => e.length > 0)
          );
        }
      },
      19771: (e) => {
        "use strict";
        e.exports = require("process");
      },
      21820: (e) => {
        "use strict";
        e.exports = require("os");
      },
      24277: (e, r, t) => {
        "use strict";
        t.d(r, { N: () => d });
        var s = t(62745),
          i = t(54016),
          o = (e, r) =>
            new Response(e, { headers: { "Content-Type": r } }).formData(),
          n = /^application\/([a-z-\.]+\+)?json(;\s*[a-zA-Z0-9\-]+\=([^;]+))*$/,
          a =
            /^multipart\/form-data(;\s?boundary=[a-zA-Z0-9'"()+_,\-./:=?]+)?$/,
          u =
            /^application\/x-www-form-urlencoded(;\s*[a-zA-Z0-9\-]+\=([^;]+))*$/,
          d = (e, r) => async (t, d) => {
            let c = {},
              p = t.req.header("Content-Type");
            switch (e) {
              case "json":
                if (!p || !n.test(p)) break;
                try {
                  c = await t.req.json();
                } catch {
                  throw new i.y(400, {
                    message: "Malformed JSON in request body",
                  });
                }
                break;
              case "form": {
                let e;
                if (!p || !(a.test(p) || u.test(p))) break;
                if (t.req.bodyCache.formData)
                  e = await t.req.bodyCache.formData;
                else
                  try {
                    let r = await t.req.arrayBuffer();
                    (e = await o(r, p)), (t.req.bodyCache.formData = e);
                  } catch (r) {
                    let e = "Malformed FormData request.";
                    throw (
                      ((e +=
                        r instanceof Error ? ` ${r.message}` : ` ${String(r)}`),
                      new i.y(400, { message: e }))
                    );
                  }
                let r = {};
                e.forEach((e, t) => {
                  t.endsWith("[]")
                    ? (r[t] ??= []).push(e)
                    : Array.isArray(r[t])
                      ? r[t].push(e)
                      : t in r
                        ? (r[t] = [r[t], e])
                        : (r[t] = e);
                }),
                  (c = r);
                break;
              }
              case "query":
                c = Object.fromEntries(
                  Object.entries(t.req.queries()).map(([e, r]) =>
                    1 === r.length ? [e, r[0]] : [e, r],
                  ),
                );
                break;
              case "param":
                c = t.req.param();
                break;
              case "header":
                c = t.req.header();
                break;
              case "cookie":
                c = (0, s.Ri)(t);
            }
            let l = await r(c, t);
            if (l instanceof Response) return l;
            t.req.addValidatedData(e, l), await d();
          };
      },
      28354: (e) => {
        "use strict";
        e.exports = require("util");
      },
      29021: (e) => {
        "use strict";
        e.exports = require("fs");
      },
      29294: (e) => {
        "use strict";
        e.exports = require("next/dist/server/app-render/work-async-storage.external.js");
      },
      31421: (e) => {
        "use strict";
        e.exports = require("node:child_process");
      },
      33873: (e) => {
        "use strict";
        e.exports = require("path");
      },
      36686: (e) => {
        "use strict";
        e.exports = require("diagnostics_channel");
      },
      37067: (e) => {
        "use strict";
        e.exports = require("node:http");
      },
      38522: (e) => {
        "use strict";
        e.exports = require("node:zlib");
      },
      41692: (e) => {
        "use strict";
        e.exports = require("node:tls");
      },
      43886: () => {},
      44708: (e) => {
        "use strict";
        e.exports = require("node:https");
      },
      44870: (e) => {
        "use strict";
        e.exports = require("next/dist/compiled/next-server/app-route.runtime.prod.js");
      },
      48161: (e) => {
        "use strict";
        e.exports = require("node:os");
      },
      52748: (e, r, t) => {
        "use strict";
        t.a(e, async (e, s) => {
          try {
            t.r(r),
              t.d(r, {
                patchFetch: () => d,
                routeModule: () => c,
                serverHooks: () => h,
                workAsyncStorage: () => p,
                workUnitAsyncStorage: () => l,
              });
            var i = t(94168),
              o = t(51293),
              n = t(64588),
              a = t(60798),
              u = e([a]);
            a = (u.then ? (await u)() : u)[0];
            let c = new i.AppRouteRouteModule({
                definition: {
                  kind: o.RouteKind.APP_ROUTE,
                  page: "/api/embeddings/route",
                  pathname: "/api/embeddings",
                  filename: "route",
                  bundlePath: "app/api/embeddings/route",
                },
                resolvedPagePath:
                  "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\api\\embeddings\\route.ts",
                nextConfigOutput: "",
                userland: a,
              }),
              {
                workAsyncStorage: p,
                workUnitAsyncStorage: l,
                serverHooks: h,
              } = c;
            function d() {
              return (0, n.patchFetch)({
                workAsyncStorage: p,
                workUnitAsyncStorage: l,
              });
            }
            s();
          } catch (e) {
            s(e);
          }
        });
      },
      53053: (e) => {
        "use strict";
        e.exports = require("node:diagnostics_channel");
      },
      54016: (e, r, t) => {
        "use strict";
        t.d(r, { y: () => s });
        var s = class extends Error {
          res;
          status;
          constructor(e = 500, r) {
            super(r?.message, { cause: r?.cause }),
              (this.res = r?.res),
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
        };
      },
      55511: (e) => {
        "use strict";
        e.exports = require("crypto");
      },
      57075: (e) => {
        "use strict";
        e.exports = require("node:stream");
      },
      57975: (e) => {
        "use strict";
        e.exports = require("node:util");
      },
      60798: (e, r, t) => {
        "use strict";
        t.a(e, async (e, s) => {
          try {
            t.r(r),
              t.d(r, {
                DELETE: () => P,
                GET: () => A,
                HEAD: () => T,
                OPTIONS: () => D,
                PATCH: () => O,
                POST: () => S,
                PUT: () => C,
                runtime: () => v,
              });
            var i = t(63033),
              o = t(13687),
              n = t(4839),
              a = t(85488),
              u = t(43774),
              d = t(29741),
              c = t(29952),
              p = t(58342),
              l = t(16513),
              h = t(60442),
              f = e([a]);
            a = (f.then ? (await f)() : f)[0];
            let g = process.env.API_SECRET_KEY,
              b = process.env.MISTRAL_API_KEY;
            (g && b) ||
              console.error(
                "Missing required environment variables for Embedding API",
              );
            let x = new u.$().basePath("/api/embeddings");
            x.use("*", (0, d.W)()),
              x.use("*", async (e, r) => {
                if (e.req.header("Authorization") !== `Bearer ${g}` || !g)
                  return (
                    console.warn(
                      "Unauthorized attempt to access internal Embedding API",
                    ),
                    e.json({ error: "Unauthorized" }, 401)
                  );
                await r();
              });
            let y =
              void 0 === process.env.LEGACY_DOC_APIS ||
              "true" === process.env.LEGACY_DOC_APIS.toLowerCase();
            x.use("*", async (e, r) => {
              if (!y)
                return (
                  e.header(
                    "X-Deprecation",
                    "This endpoint is deprecated and disabled",
                  ),
                  e.header("Access-Control-Expose-Headers", "X-Deprecation"),
                  e.json({ error: "Endpoint deprecated" }, 410)
                );
              e.header(
                "X-Deprecation",
                "This endpoint is deprecated; migrate to DocumentProcessor inline embedding generation",
              ),
                e.header("Access-Control-Expose-Headers", "X-Deprecation"),
                await r();
            });
            let w = p.Ik({
                text: p.Yj().min(1, "Text cannot be empty"),
                documentId: p.Yj().uuid().optional(),
                isQuery: p.zM().optional().default(!1),
              }),
              q = b ? o.L.embedding("mistral-embed") : null;
            x.post("/", (0, n.l)("json", w), async (e) => {
              if (!q)
                return (
                  console.error(
                    "Embedding model not initialized due to missing API key.",
                  ),
                  e.json({ error: "Embedding service not configured" }, 503)
                );
              let { documentId: r, text: t, isQuery: s } = e.req.valid("json");
              try {
                if (s) {
                  let { embedding: r, usage: s } = await (0, a.embed)({
                    model: q,
                    value: t,
                  });
                  return e.json({ embedding: r });
                }
                {
                  let s = (0, l.u)(t, {});
                  if (0 === s.length)
                    return (
                      console.warn(
                        `[Embed API] No text chunks generated for documentId: ${r ?? "N/A"}.`,
                      ),
                      e.json({ chunks: [] })
                    );
                  let { embeddings: i, usage: o } = await (0, a.embedMany)({
                      model: q,
                      values: s,
                    }),
                    n = s.map((e, r) => ({
                      index: r,
                      text: e,
                      embedding: i[r],
                    }));
                  return e.json({ chunks: n });
                }
              } catch (t) {
                console.error("[Embed API] Error:", t);
                let r = "Internal server error processing embedding request";
                return (
                  t instanceof Error && (r = t.message),
                  e.json({ error: r }, 500)
                );
              }
            });
            let E = (0, c.p)(x),
              v = "nodejs",
              k = { ...i },
              _ =
                "workUnitAsyncStorage" in k
                  ? k.workUnitAsyncStorage
                  : "requestAsyncStorage" in k
                    ? k.requestAsyncStorage
                    : void 0;
            function m(e, r) {
              return "phase-production-build" === process.env.NEXT_PHASE ||
                "function" != typeof e
                ? e
                : new Proxy(e, {
                    apply: (e, t, s) => {
                      let i;
                      try {
                        let e = _?.getStore();
                        i = e?.headers;
                      } catch (e) {}
                      return h
                        .wrapRouteHandlerWithSentry(e, {
                          method: r,
                          parameterizedRoute: "/api/embeddings",
                          headers: i,
                        })
                        .apply(t, s);
                    },
                  });
            }
            let A = m(void 0, "GET"),
              S = m(E, "POST"),
              C = m(void 0, "PUT"),
              O = m(void 0, "PATCH"),
              P = m(void 0, "DELETE"),
              T = m(void 0, "HEAD"),
              D = m(void 0, "OPTIONS");
            s();
          } catch (e) {
            s(e);
          }
        });
      },
      62745: (e, r, t) => {
        "use strict";
        t.d(r, { Yj: () => h, Ri: () => p, TV: () => l });
        var s = t(79533),
          i = { name: "HMAC", hash: "SHA-256" },
          o = async (e) => {
            let r = "string" == typeof e ? new TextEncoder().encode(e) : e;
            return await crypto.subtle.importKey("raw", r, i, !1, [
              "sign",
              "verify",
            ]);
          },
          n = /^[\w!#$%&'*.^`|~+-]+$/,
          a = /^[ !#-:<-[\]-~]*$/,
          u = (e, r) => {
            if (r && -1 === e.indexOf(r)) return {};
            let t = e.trim().split(";"),
              i = {};
            for (let e of t) {
              let t = (e = e.trim()).indexOf("=");
              if (-1 === t) continue;
              let o = e.substring(0, t).trim();
              if ((r && r !== o) || !n.test(o)) continue;
              let u = e.substring(t + 1).trim();
              if (
                (u.startsWith('"') && u.endsWith('"') && (u = u.slice(1, -1)),
                a.test(u) && ((i[o] = (0, s.Rp)(u)), r))
              )
                break;
            }
            return i;
          },
          d = (e, r, t = {}) => {
            let s = `${e}=${r}`;
            if (e.startsWith("__Secure-") && !t.secure)
              throw Error("__Secure- Cookie must have Secure attributes");
            if (e.startsWith("__Host-")) {
              if (!t.secure)
                throw Error("__Host- Cookie must have Secure attributes");
              if ("/" !== t.path)
                throw Error(
                  '__Host- Cookie must have Path attributes with "/"',
                );
              if (t.domain)
                throw Error("__Host- Cookie must not have Domain attributes");
            }
            if (t && "number" == typeof t.maxAge && t.maxAge >= 0) {
              if (t.maxAge > 3456e4)
                throw Error(
                  "Cookies Max-Age SHOULD NOT be greater than 400 days (34560000 seconds) in duration.",
                );
              s += `; Max-Age=${0 | t.maxAge}`;
            }
            if (
              (t.domain && "host" !== t.prefix && (s += `; Domain=${t.domain}`),
              t.path && (s += `; Path=${t.path}`),
              t.expires)
            ) {
              if (t.expires.getTime() - Date.now() > 3456e7)
                throw Error(
                  "Cookies Expires SHOULD NOT be greater than 400 days (34560000 seconds) in the future.",
                );
              s += `; Expires=${t.expires.toUTCString()}`;
            }
            if (
              (t.httpOnly && (s += "; HttpOnly"),
              t.secure && (s += "; Secure"),
              t.sameSite &&
                (s += `; SameSite=${t.sameSite.charAt(0).toUpperCase() + t.sameSite.slice(1)}`),
              t.priority && (s += `; Priority=${t.priority}`),
              t.partitioned)
            ) {
              if (!t.secure)
                throw Error("Partitioned Cookie must have Secure attributes");
              s += "; Partitioned";
            }
            return s;
          },
          c = (e, r, t) => d(e, (r = encodeURIComponent(r)), t),
          p = (e, r, t) => {
            let s = e.req.raw.headers.get("Cookie");
            if ("string" == typeof r) {
              if (!s) return;
              let e = r;
              return (
                "secure" === t
                  ? (e = "__Secure-" + r)
                  : "host" === t && (e = "__Host-" + r),
                u(s, e)[e]
              );
            }
            return s ? u(s) : {};
          },
          l = (e, r, t, s) => {
            let i;
            (i =
              s?.prefix === "secure"
                ? c("__Secure-" + r, t, { path: "/", ...s, secure: !0 })
                : s?.prefix === "host"
                  ? c("__Host-" + r, t, {
                      ...s,
                      path: "/",
                      secure: !0,
                      domain: void 0,
                    })
                  : c(r, t, { path: "/", ...s })),
              e.header("Set-Cookie", i, { append: !0 });
          },
          h = (e, r, t) => {
            let s = p(e, r, t?.prefix);
            return l(e, r, "", { ...t, maxAge: 0 }), s;
          };
      },
      63033: (e) => {
        "use strict";
        e.exports = require("next/dist/server/app-render/work-unit-async-storage.external.js");
      },
      73024: (e) => {
        "use strict";
        e.exports = require("node:fs");
      },
      73566: (e) => {
        "use strict";
        e.exports = require("worker_threads");
      },
      74998: (e) => {
        "use strict";
        e.exports = require("perf_hooks");
      },
      75919: (e) => {
        "use strict";
        e.exports = require("node:worker_threads");
      },
      76760: (e) => {
        "use strict";
        e.exports = require("node:path");
      },
      77030: (e) => {
        "use strict";
        e.exports = require("node:net");
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
      83997: (e) => {
        "use strict";
        e.exports = require("tty");
      },
      84297: (e) => {
        "use strict";
        e.exports = require("async_hooks");
      },
      85488: (e) => {
        "use strict";
        e.exports = import("ai");
      },
      86592: (e) => {
        "use strict";
        e.exports = require("node:inspector");
      },
      94735: (e) => {
        "use strict";
        e.exports = require("events");
      },
      96708: (e) => {
        function r(e) {
          var r = Error("Cannot find module '" + e + "'");
          throw ((r.code = "MODULE_NOT_FOUND"), r);
        }
        (r.keys = () => []), (r.resolve = r), (r.id = 96708), (e.exports = r);
      },
    });
  var r = require("../../../webpack-runtime.js");
  r.C(e);
  var t = (e) => r((r.s = e)),
    s = r.X(0, [827, 8342, 2256, 3774, 4256, 2958], () => t(52748));
  module.exports = s;
})();
//# sourceMappingURL=route.js.map
