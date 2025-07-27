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
    (e._sentryDebugIds[t] = "77b1688e-094d-42f2-8e8e-72c66a76dcfd"),
    (e._sentryDebugIdIdentifier =
      "sentry-dbid-77b1688e-094d-42f2-8e8e-72c66a76dcfd"));
} catch (e) {}
(() => {
  var e = {};
  (e.id = 9313),
    (e.ids = [9313]),
    (e.modules = {
      4839: (e, t, r) => {
        "use strict";
        r.d(t, { l: () => o });
        var s = r(24277),
          i = r(14567),
          o = (e, t, r) =>
            (0, s.N)(e, async (s, o) => {
              let a = s;
              if ("header" === e && t instanceof i.bv) {
                let e = Object.fromEntries(
                  Object.keys(t.shape).map((e) => [e.toLowerCase(), e]),
                );
                a = Object.fromEntries(
                  Object.entries(s).map(([t, r]) => [e[t] || t, r]),
                );
              }
              let n = await t.safeParseAsync(a);
              if (r) {
                let t = await r({ data: a, ...n, target: e }, o);
                if (t) {
                  if (t instanceof Response) return t;
                  if ("response" in t) return t.response;
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
        function t(e) {
          var t = Error("Cannot find module '" + e + "'");
          throw ((t.code = "MODULE_NOT_FOUND"), t);
        }
        (t.keys = () => []), (t.resolve = t), (t.id = 8963), (e.exports = t);
      },
      10846: (e) => {
        "use strict";
        e.exports = require("next/dist/compiled/next-server/app-page.runtime.prod.js");
      },
      19771: (e) => {
        "use strict";
        e.exports = require("process");
      },
      21820: (e) => {
        "use strict";
        e.exports = require("os");
      },
      24277: (e, t, r) => {
        "use strict";
        r.d(t, { N: () => u });
        var s = r(62745),
          i = r(54016),
          o = (e, t) =>
            new Response(e, { headers: { "Content-Type": t } }).formData(),
          a = /^application\/([a-z-\.]+\+)?json(;\s*[a-zA-Z0-9\-]+\=([^;]+))*$/,
          n =
            /^multipart\/form-data(;\s?boundary=[a-zA-Z0-9'"()+_,\-./:=?]+)?$/,
          c =
            /^application\/x-www-form-urlencoded(;\s*[a-zA-Z0-9\-]+\=([^;]+))*$/,
          u = (e, t) => async (r, u) => {
            let d = {},
              p = r.req.header("Content-Type");
            switch (e) {
              case "json":
                if (!p || !a.test(p)) break;
                try {
                  d = await r.req.json();
                } catch {
                  throw new i.y(400, {
                    message: "Malformed JSON in request body",
                  });
                }
                break;
              case "form": {
                let e;
                if (!p || !(n.test(p) || c.test(p))) break;
                if (r.req.bodyCache.formData)
                  e = await r.req.bodyCache.formData;
                else
                  try {
                    let t = await r.req.arrayBuffer();
                    (e = await o(t, p)), (r.req.bodyCache.formData = e);
                  } catch (t) {
                    let e = "Malformed FormData request.";
                    throw (
                      ((e +=
                        t instanceof Error ? ` ${t.message}` : ` ${String(t)}`),
                      new i.y(400, { message: e }))
                    );
                  }
                let t = {};
                e.forEach((e, r) => {
                  r.endsWith("[]")
                    ? (t[r] ??= []).push(e)
                    : Array.isArray(t[r])
                      ? t[r].push(e)
                      : r in t
                        ? (t[r] = [t[r], e])
                        : (t[r] = e);
                }),
                  (d = t);
                break;
              }
              case "query":
                d = Object.fromEntries(
                  Object.entries(r.req.queries()).map(([e, t]) =>
                    1 === t.length ? [e, t[0]] : [e, t],
                  ),
                );
                break;
              case "param":
                d = r.req.param();
                break;
              case "header":
                d = r.req.header();
                break;
              case "cookie":
                d = (0, s.Ri)(r);
            }
            let l = await t(d, r);
            if (l instanceof Response) return l;
            r.req.addValidatedData(e, l), await u();
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
      41470: (e, t, r) => {
        "use strict";
        r.a(e, async (e, s) => {
          try {
            r.r(t),
              r.d(t, {
                patchFetch: () => u,
                routeModule: () => d,
                serverHooks: () => f,
                workAsyncStorage: () => p,
                workUnitAsyncStorage: () => l,
              });
            var i = r(94168),
              o = r(51293),
              a = r(64588),
              n = r(84773),
              c = e([n]);
            n = (c.then ? (await c)() : c)[0];
            let d = new i.AppRouteRouteModule({
                definition: {
                  kind: o.RouteKind.APP_ROUTE,
                  page: "/api/documents/classify/route",
                  pathname: "/api/documents/classify",
                  filename: "route",
                  bundlePath: "app/api/documents/classify/route",
                },
                resolvedPagePath:
                  "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\api\\documents\\classify\\route.ts",
                nextConfigOutput: "",
                userland: n,
              }),
              {
                workAsyncStorage: p,
                workUnitAsyncStorage: l,
                serverHooks: f,
              } = d;
            function u() {
              return (0, a.patchFetch)({
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
      53053: (e) => {
        "use strict";
        e.exports = require("node:diagnostics_channel");
      },
      54016: (e, t, r) => {
        "use strict";
        r.d(t, { y: () => s });
        var s = class extends Error {
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
      62745: (e, t, r) => {
        "use strict";
        r.d(t, { Yj: () => f, Ri: () => p, TV: () => l });
        var s = r(79533),
          i = { name: "HMAC", hash: "SHA-256" },
          o = async (e) => {
            let t = "string" == typeof e ? new TextEncoder().encode(e) : e;
            return await crypto.subtle.importKey("raw", t, i, !1, [
              "sign",
              "verify",
            ]);
          },
          a = /^[\w!#$%&'*.^`|~+-]+$/,
          n = /^[ !#-:<-[\]-~]*$/,
          c = (e, t) => {
            if (t && -1 === e.indexOf(t)) return {};
            let r = e.trim().split(";"),
              i = {};
            for (let e of r) {
              let r = (e = e.trim()).indexOf("=");
              if (-1 === r) continue;
              let o = e.substring(0, r).trim();
              if ((t && t !== o) || !a.test(o)) continue;
              let c = e.substring(r + 1).trim();
              if (
                (c.startsWith('"') && c.endsWith('"') && (c = c.slice(1, -1)),
                n.test(c) && ((i[o] = (0, s.Rp)(c)), t))
              )
                break;
            }
            return i;
          },
          u = (e, t, r = {}) => {
            let s = `${e}=${t}`;
            if (e.startsWith("__Secure-") && !r.secure)
              throw Error("__Secure- Cookie must have Secure attributes");
            if (e.startsWith("__Host-")) {
              if (!r.secure)
                throw Error("__Host- Cookie must have Secure attributes");
              if ("/" !== r.path)
                throw Error(
                  '__Host- Cookie must have Path attributes with "/"',
                );
              if (r.domain)
                throw Error("__Host- Cookie must not have Domain attributes");
            }
            if (r && "number" == typeof r.maxAge && r.maxAge >= 0) {
              if (r.maxAge > 3456e4)
                throw Error(
                  "Cookies Max-Age SHOULD NOT be greater than 400 days (34560000 seconds) in duration.",
                );
              s += `; Max-Age=${0 | r.maxAge}`;
            }
            if (
              (r.domain && "host" !== r.prefix && (s += `; Domain=${r.domain}`),
              r.path && (s += `; Path=${r.path}`),
              r.expires)
            ) {
              if (r.expires.getTime() - Date.now() > 3456e7)
                throw Error(
                  "Cookies Expires SHOULD NOT be greater than 400 days (34560000 seconds) in the future.",
                );
              s += `; Expires=${r.expires.toUTCString()}`;
            }
            if (
              (r.httpOnly && (s += "; HttpOnly"),
              r.secure && (s += "; Secure"),
              r.sameSite &&
                (s += `; SameSite=${r.sameSite.charAt(0).toUpperCase() + r.sameSite.slice(1)}`),
              r.priority && (s += `; Priority=${r.priority}`),
              r.partitioned)
            ) {
              if (!r.secure)
                throw Error("Partitioned Cookie must have Secure attributes");
              s += "; Partitioned";
            }
            return s;
          },
          d = (e, t, r) => u(e, (t = encodeURIComponent(t)), r),
          p = (e, t, r) => {
            let s = e.req.raw.headers.get("Cookie");
            if ("string" == typeof t) {
              if (!s) return;
              let e = t;
              return (
                "secure" === r
                  ? (e = "__Secure-" + t)
                  : "host" === r && (e = "__Host-" + t),
                c(s, e)[e]
              );
            }
            return s ? c(s) : {};
          },
          l = (e, t, r, s) => {
            let i;
            (i =
              s?.prefix === "secure"
                ? d("__Secure-" + t, r, { path: "/", ...s, secure: !0 })
                : s?.prefix === "host"
                  ? d("__Host-" + t, r, {
                      ...s,
                      path: "/",
                      secure: !0,
                      domain: void 0,
                    })
                  : d(t, r, { path: "/", ...s })),
              e.header("Set-Cookie", i, { append: !0 });
          },
          f = (e, t, r) => {
            let s = p(e, t, r?.prefix);
            return l(e, t, "", { ...r, maxAge: 0 }), s;
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
      84773: (e, t, r) => {
        "use strict";
        r.a(e, async (e, s) => {
          try {
            r.r(t),
              r.d(t, {
                DELETE: () => O,
                GET: () => k,
                HEAD: () => T,
                OPTIONS: () => P,
                PATCH: () => D,
                POST: () => C,
                PUT: () => S,
              });
            var i = r(63033),
              o = r(13687),
              a = r(4839),
              n = r(85488),
              c = r(43774),
              u = r(29741),
              d = r(29952),
              p = r(58342),
              l = r(60442),
              f = e([n]);
            n = (f.then ? (await f)() : f)[0];
            let m = process.env.API_SECRET_KEY,
              y = process.env.MISTRAL_API_KEY;
            (m && y) ||
              console.error(
                "Missing required environment variables for Classification API",
              );
            let x = p.Ik({
                documentId: p.Yj().uuid().optional(),
                text: p.Yj().min(10),
              }),
              g = [
                "visa_application",
                "residency_permit",
                "passport",
                "work_permit",
                "family_reunion",
                "asylum_application",
                "citizenship",
                "immigration_policy",
                "legal_document",
                "personal_identification",
                "travel_document",
                "financial_statement",
                "educational_credential",
                "other",
              ],
              w = p.Ik({
                primary_category: p.k5(g),
                confidence: p.ai().min(0).max(1),
                secondary_categories: p
                  .YO(
                    p.Ik({
                      category: p.k5(g),
                      confidence: p.ai().min(0).max(1),
                    }),
                  )
                  .optional(),
                document_language: p.Yj().optional(),
                contains_personal_data: p.zM().optional(),
              }),
              _ = new c.$();
            _.use("*", (0, u.W)()),
              _.use("*", async (e, t) => {
                if (e.req.header("Authorization") !== `Bearer ${m}` || !m)
                  return (
                    console.warn(
                      "Unauthorized attempt to access internal Classification API",
                    ),
                    e.json({ error: "Unauthorized" }, 401)
                  );
                await t();
              });
            let q =
              void 0 === process.env.LEGACY_DOC_APIS ||
              "true" === process.env.LEGACY_DOC_APIS.toLowerCase();
            _.use("*", async (e, t) => {
              if (!q)
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
                "This endpoint is deprecated; migrate to DocumentProcessor inline classification",
              ),
                e.header("Access-Control-Expose-Headers", "X-Deprecation"),
                await t();
            });
            let b = y ? (0, o.L)("mistral-large-latest") : null;
            _.post("/", (0, a.l)("json", x), async (e) => {
              if (!b)
                return (
                  console.error(
                    "Classification model not initialized due to missing API key.",
                  ),
                  e.json(
                    { error: "Classification service not configured" },
                    503,
                  )
                );
              let { documentId: t, text: r } = e.req.valid("json");
              try {
                let t = r.slice(0, 15e3),
                  { object: s, usage: i } = await (0, n.generateObject)({
                    model: b,
                    schema: w,
                    schemaName: "DocumentClassification",
                    schemaDescription:
                      "Classification of an immigration-related document.",
                    prompt: `Analyze the following document text and classify it according to the provided schema. Identify the primary category, estimate confidence, list any relevant secondary categories, determine the language, and assess if it contains personal data (like names, addresses, ID numbers). Document Text: 

---
${t}
---
`,
                  });
                return e.json({ classification: s });
              } catch (r) {
                console.error("[Classify API] Error:", r);
                let t =
                  "Internal server error processing classification request";
                return (
                  r instanceof Error && (t = r.message),
                  e.json({ error: t }, 500)
                );
              }
            });
            let v = (0, d.p)(_),
              E = { ...i },
              A =
                "workUnitAsyncStorage" in E
                  ? E.workUnitAsyncStorage
                  : "requestAsyncStorage" in E
                    ? E.requestAsyncStorage
                    : void 0;
            function h(e, t) {
              return "phase-production-build" === process.env.NEXT_PHASE ||
                "function" != typeof e
                ? e
                : new Proxy(e, {
                    apply: (e, r, s) => {
                      let i;
                      try {
                        let e = A?.getStore();
                        i = e?.headers;
                      } catch (e) {}
                      return l
                        .wrapRouteHandlerWithSentry(e, {
                          method: t,
                          parameterizedRoute: "/api/documents/classify",
                          headers: i,
                        })
                        .apply(r, s);
                    },
                  });
            }
            let k = h(void 0, "GET"),
              C = h(v, "POST"),
              S = h(void 0, "PUT"),
              D = h(void 0, "PATCH"),
              O = h(void 0, "DELETE"),
              T = h(void 0, "HEAD"),
              P = h(void 0, "OPTIONS");
            s();
          } catch (e) {
            s(e);
          }
        });
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
        function t(e) {
          var t = Error("Cannot find module '" + e + "'");
          throw ((t.code = "MODULE_NOT_FOUND"), t);
        }
        (t.keys = () => []), (t.resolve = t), (t.id = 96708), (e.exports = t);
      },
    });
  var t = require("../../../../webpack-runtime.js");
  t.C(e);
  var r = (e) => t((t.s = e)),
    s = t.X(0, [827, 8342, 2256, 3774, 4256, 2958], () => r(41470));
  module.exports = s;
})();
//# sourceMappingURL=route.js.map
