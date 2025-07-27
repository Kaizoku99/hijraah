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
    (e._sentryDebugIds[r] = "f7668cf4-c90d-4a92-82e4-c71d9f8913f9"),
    (e._sentryDebugIdIdentifier =
      "sentry-dbid-f7668cf4-c90d-4a92-82e4-c71d9f8913f9"));
} catch (e) {}
(() => {
  var e = {};
  (e.id = 6202),
    (e.ids = [6202]),
    (e.modules = {
      4839: (e, r, t) => {
        "use strict";
        t.d(r, { l: () => o });
        var s = t(24277),
          i = t(14567),
          o = (e, r, t) =>
            (0, s.N)(e, async (s, o) => {
              let a = s;
              if ("header" === e && r instanceof i.bv) {
                let e = Object.fromEntries(
                  Object.keys(r.shape).map((e) => [e.toLowerCase(), e]),
                );
                a = Object.fromEntries(
                  Object.entries(s).map(([r, t]) => [e[r] || r, t]),
                );
              }
              let n = await r.safeParseAsync(a);
              if (t) {
                let r = await t({ data: a, ...n, target: e }, o);
                if (r) {
                  if (r instanceof Response) return r;
                  if ("response" in r) return r.response;
                }
              }
              return n.success ? n.data : o.json(n, 400);
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
      11997: (e) => {
        "use strict";
        e.exports = require("punycode");
      },
      12412: (e) => {
        "use strict";
        e.exports = require("assert");
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
        t.d(r, { N: () => c });
        var s = t(62745),
          i = t(54016),
          o = (e, r) =>
            new Response(e, { headers: { "Content-Type": r } }).formData(),
          a = /^application\/([a-z-\.]+\+)?json(;\s*[a-zA-Z0-9\-]+\=([^;]+))*$/,
          n =
            /^multipart\/form-data(;\s?boundary=[a-zA-Z0-9'"()+_,\-./:=?]+)?$/,
          u =
            /^application\/x-www-form-urlencoded(;\s*[a-zA-Z0-9\-]+\=([^;]+))*$/,
          c = (e, r) => async (t, c) => {
            let d = {},
              l = t.req.header("Content-Type");
            switch (e) {
              case "json":
                if (!l || !a.test(l)) break;
                try {
                  d = await t.req.json();
                } catch {
                  throw new i.y(400, {
                    message: "Malformed JSON in request body",
                  });
                }
                break;
              case "form": {
                let e;
                if (!l || !(n.test(l) || u.test(l))) break;
                if (t.req.bodyCache.formData)
                  e = await t.req.bodyCache.formData;
                else
                  try {
                    let r = await t.req.arrayBuffer();
                    (e = await o(r, l)), (t.req.bodyCache.formData = e);
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
                  (d = r);
                break;
              }
              case "query":
                d = Object.fromEntries(
                  Object.entries(t.req.queries()).map(([e, r]) =>
                    1 === r.length ? [e, r[0]] : [e, r],
                  ),
                );
                break;
              case "param":
                d = t.req.param();
                break;
              case "header":
                d = t.req.header();
                break;
              case "cookie":
                d = (0, s.Ri)(t);
            }
            let p = await r(d, t);
            if (p instanceof Response) return p;
            t.req.addValidatedData(e, p), await c();
          };
      },
      27910: (e) => {
        "use strict";
        e.exports = require("stream");
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
      29741: (e, r, t) => {
        "use strict";
        t.d(r, { W: () => s });
        var s = (e) => {
          let r = {
              origin: "*",
              allowMethods: ["GET", "HEAD", "PUT", "POST", "DELETE", "PATCH"],
              allowHeaders: [],
              exposeHeaders: [],
              ...e,
            },
            t = ((e) => {
              if ("string" == typeof e)
                if ("*" === e) return () => e;
                else return (r) => (e === r ? r : null);
              return "function" == typeof e
                ? e
                : (r) => (e.includes(r) ? r : null);
            })(r.origin),
            s = ((e) =>
              "function" == typeof e
                ? e
                : Array.isArray(e)
                  ? () => e
                  : () => [])(r.allowMethods);
          return async function (e, i) {
            function o(r, t) {
              e.res.headers.set(r, t);
            }
            let a = t(e.req.header("origin") || "", e);
            if ((a && o("Access-Control-Allow-Origin", a), "*" !== r.origin)) {
              let r = e.req.header("Vary");
              o("Vary", r || "Origin");
            }
            if (
              (r.credentials && o("Access-Control-Allow-Credentials", "true"),
              r.exposeHeaders?.length &&
                o("Access-Control-Expose-Headers", r.exposeHeaders.join(",")),
              "OPTIONS" === e.req.method)
            ) {
              null != r.maxAge &&
                o("Access-Control-Max-Age", r.maxAge.toString());
              let t = s(e.req.header("origin") || "", e);
              t.length && o("Access-Control-Allow-Methods", t.join(","));
              let i = r.allowHeaders;
              if (!i?.length) {
                let r = e.req.header("Access-Control-Request-Headers");
                r && (i = r.split(/\s*,\s*/));
              }
              return (
                i?.length &&
                  (o("Access-Control-Allow-Headers", i.join(",")),
                  e.res.headers.append(
                    "Vary",
                    "Access-Control-Request-Headers",
                  )),
                e.res.headers.delete("Content-Length"),
                e.res.headers.delete("Content-Type"),
                new Response(null, {
                  headers: e.res.headers,
                  status: 204,
                  statusText: "No Content",
                })
              );
            }
            await i();
          };
        };
      },
      29952: (e, r, t) => {
        "use strict";
        t.d(r, { p: () => s });
        var s = (e) => (r) => e.fetch(r);
      },
      31421: (e) => {
        "use strict";
        e.exports = require("node:child_process");
      },
      33873: (e) => {
        "use strict";
        e.exports = require("path");
      },
      34631: (e) => {
        "use strict";
        e.exports = require("tls");
      },
      36686: (e) => {
        "use strict";
        e.exports = require("diagnostics_channel");
      },
      37067: (e) => {
        "use strict";
        e.exports = require("node:http");
      },
      37830: (e) => {
        "use strict";
        e.exports = require("node:stream/web");
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
      48737: (e, r, t) => {
        "use strict";
        t.r(r),
          t.d(r, {
            patchFetch: () => U,
            routeModule: () => H,
            serverHooks: () => I,
            workAsyncStorage: () => R,
            workUnitAsyncStorage: () => D,
          });
        var s = {};
        t.r(s),
          t.d(s, {
            DELETE: () => T,
            GET: () => k,
            HEAD: () => P,
            OPTIONS: () => j,
            PATCH: () => S,
            POST: () => C,
            PUT: () => O,
          });
        var i = t(94168),
          o = t(51293),
          a = t(64588),
          n = t(63033),
          u = t(4839),
          c = t(77719),
          d = t(43774),
          l = t(29741),
          p = t(29952),
          h = t(58342),
          f = t(79273);
        let m = new (t(57826).Ay)({ apiKey: process.env.OPENAI_API_KEY });
        async function y(e) {
          try {
            let r = e.replace(/\n/g, " ").trim();
            return (
              await m.embeddings.create({
                model: "text-embedding-3-small",
                input: r,
                dimensions: 1536,
              })
            ).data[0].embedding;
          } catch (e) {
            throw (
              (console.error("Error generating embedding:", e),
              Error("Failed to generate text embedding"))
            );
          }
        }
        var x = t(60442);
        let w = new d.$().basePath("/api/search");
        w.use("*", (0, l.W)());
        let g = (0, c.createClient)(
            "http://localhost:54321",
            process.env.SUPABASE_SERVICE_ROLE_KEY,
          ),
          q = h.Ik({
            query: h.Yj().min(1, "Query parameter is required"),
            limit: h.au.number().int().positive().optional().default(5),
            threshold: h.au.number().min(0).max(1).optional().default(0.7),
            visibility: h.Yj().optional(),
          }),
          b = h.Ik({
            query: h.Yj().min(1, "Query cannot be empty"),
            maxResults: h.au.number().int().positive().optional().default(5),
          });
        w.get("/internal", (0, u.l)("query", q), async (e) => {
          let {
            query: r,
            limit: t,
            threshold: s,
            visibility: i,
          } = e.req.valid("query");
          try {
            let o = await y(r),
              { data: a, error: n } = await g.rpc("match_artifacts", {
                query_embedding: o,
                match_threshold: s,
                match_count: t,
                filter_visibility: i,
              });
            if (n)
              return (
                console.error("Error performing semantic search:", n),
                e.json(
                  { error: "Error during semantic search", details: n.message },
                  500,
                )
              );
            return e.json({ query: r, results: a || [] });
          } catch (r) {
            return (
              console.error("Error in internal search API:", r),
              e.json(
                { error: "Internal server error", details: r.message },
                500,
              )
            );
          }
        }),
          w.get("/web", (0, u.l)("query", b), async (e) => {
            let { query: r, maxResults: s } = e.req.valid("query");
            try {
              if (!process.env.FIRECRAWL_API_KEY)
                return (
                  console.warn(
                    "Firecrawl API key not configured. Returning fallback web search result.",
                  ),
                  e.json({
                    success: !0,
                    query: r,
                    data: [
                      {
                        url: "https://example.com/fallback",
                        title: "Fallback Result (Firecrawl not configured)",
                        snippet: `This is a fallback result because Firecrawl is not configured. Your query was: "${r}"`,
                      },
                    ],
                  })
                );
              try {
                let i = new (
                    await Promise.all([t.e(5431), t.e(866)]).then(
                      t.bind(t, 90866),
                    )
                  ).default({ apiKey: process.env.FIRECRAWL_API_KEY }),
                  o = await i.search(r);
                if (!o || !o.success || !Array.isArray(o.data))
                  return (
                    console.error(
                      "Firecrawl search failed or returned unexpected format:",
                      o?.error,
                    ),
                    e.json(
                      {
                        error: "Web search failed",
                        details:
                          o?.error ||
                          "Unknown Firecrawl error or invalid format",
                      },
                      502,
                    )
                  );
                let a = o.data
                  .slice(0, s)
                  .map((e) => ({
                    url: e.url,
                    title: e.title,
                    snippet:
                      e.snippet ||
                      e.markdown?.substring(0, 200) ||
                      e.content?.substring(0, 200) ||
                      "",
                  }));
                return e.json({ success: !0, query: r, data: a });
              } catch (r) {
                return (
                  console.error("Failed to import or use Firecrawl:", r),
                  e.json(
                    {
                      success: !1,
                      error: "Web search service unavailable",
                      details: r.message,
                    },
                    503,
                  )
                );
              }
            } catch (s) {
              console.error("Web search API error:", s);
              let r = s instanceof f.G ? 400 : 500,
                t =
                  s instanceof f.G
                    ? "Invalid query parameters"
                    : "Internal server error";
              return e.json(
                {
                  success: !1,
                  error: t,
                  details:
                    s instanceof Error
                      ? s.message
                      : "An unknown error occurred",
                },
                { status: r },
              );
            }
          });
        let A = (0, p.p)(w),
          E = { ...n },
          v =
            "workUnitAsyncStorage" in E
              ? E.workUnitAsyncStorage
              : "requestAsyncStorage" in E
                ? E.requestAsyncStorage
                : void 0;
        function _(e, r) {
          return "phase-production-build" === process.env.NEXT_PHASE ||
            "function" != typeof e
            ? e
            : new Proxy(e, {
                apply: (e, t, s) => {
                  let i;
                  try {
                    let e = v?.getStore();
                    i = e?.headers;
                  } catch (e) {}
                  return x
                    .wrapRouteHandlerWithSentry(e, {
                      method: r,
                      parameterizedRoute: "/api/search",
                      headers: i,
                    })
                    .apply(t, s);
                },
              });
        }
        let k = _(A, "GET"),
          C = _(void 0, "POST"),
          O = _(void 0, "PUT"),
          S = _(void 0, "PATCH"),
          T = _(void 0, "DELETE"),
          P = _(void 0, "HEAD"),
          j = _(void 0, "OPTIONS"),
          H = new i.AppRouteRouteModule({
            definition: {
              kind: o.RouteKind.APP_ROUTE,
              page: "/api/search/route",
              pathname: "/api/search",
              filename: "route",
              bundlePath: "app/api/search/route",
            },
            resolvedPagePath:
              "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\api\\search\\route.ts",
            nextConfigOutput: "",
            userland: s,
          }),
          { workAsyncStorage: R, workUnitAsyncStorage: D, serverHooks: I } = H;
        function U() {
          return (0, a.patchFetch)({
            workAsyncStorage: R,
            workUnitAsyncStorage: D,
          });
        }
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
      62745: (e, r, t) => {
        "use strict";
        t.d(r, { Yj: () => h, Ri: () => l, TV: () => p });
        var s = t(79533),
          i = { name: "HMAC", hash: "SHA-256" },
          o = async (e) => {
            let r = "string" == typeof e ? new TextEncoder().encode(e) : e;
            return await crypto.subtle.importKey("raw", r, i, !1, [
              "sign",
              "verify",
            ]);
          },
          a = /^[\w!#$%&'*.^`|~+-]+$/,
          n = /^[ !#-:<-[\]-~]*$/,
          u = (e, r) => {
            if (r && -1 === e.indexOf(r)) return {};
            let t = e.trim().split(";"),
              i = {};
            for (let e of t) {
              let t = (e = e.trim()).indexOf("=");
              if (-1 === t) continue;
              let o = e.substring(0, t).trim();
              if ((r && r !== o) || !a.test(o)) continue;
              let u = e.substring(t + 1).trim();
              if (
                (u.startsWith('"') && u.endsWith('"') && (u = u.slice(1, -1)),
                n.test(u) && ((i[o] = (0, s.Rp)(u)), r))
              )
                break;
            }
            return i;
          },
          c = (e, r, t = {}) => {
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
          d = (e, r, t) => c(e, (r = encodeURIComponent(r)), t),
          l = (e, r, t) => {
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
          p = (e, r, t, s) => {
            let i;
            (i =
              s?.prefix === "secure"
                ? d("__Secure-" + r, t, { path: "/", ...s, secure: !0 })
                : s?.prefix === "host"
                  ? d("__Host-" + r, t, {
                      ...s,
                      path: "/",
                      secure: !0,
                      domain: void 0,
                    })
                  : d(r, t, { path: "/", ...s })),
              e.header("Set-Cookie", i, { append: !0 });
          },
          h = (e, r, t) => {
            let s = l(e, r, t?.prefix);
            return p(e, r, "", { ...t, maxAge: 0 }), s;
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
      74075: (e) => {
        "use strict";
        e.exports = require("zlib");
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
      81630: (e) => {
        "use strict";
        e.exports = require("http");
      },
      83997: (e) => {
        "use strict";
        e.exports = require("tty");
      },
      84297: (e) => {
        "use strict";
        e.exports = require("async_hooks");
      },
      86592: (e) => {
        "use strict";
        e.exports = require("node:inspector");
      },
      91645: (e) => {
        "use strict";
        e.exports = require("net");
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
      97108: (e) => {
        function r(e) {
          var r = Error("Cannot find module '" + e + "'");
          throw ((r.code = "MODULE_NOT_FOUND"), r);
        }
        (r.keys = () => []), (r.resolve = r), (r.id = 97108), (e.exports = r);
      },
    });
  var r = require("../../../webpack-runtime.js");
  r.C(e);
  var t = (e) => r((r.s = e)),
    s = r.X(0, [827, 7719, 8342, 2256, 3774, 7826], () => t(48737));
  module.exports = s;
})();
//# sourceMappingURL=route.js.map
