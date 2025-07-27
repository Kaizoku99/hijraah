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
    (e._sentryDebugIds[r] = "63c2594e-67bd-42b4-a6a7-1c05b06fc8be"),
    (e._sentryDebugIdIdentifier =
      "sentry-dbid-63c2594e-67bd-42b4-a6a7-1c05b06fc8be"));
} catch (e) {}
(() => {
  var e = {};
  (e.id = 3311),
    (e.ids = [3311]),
    (e.modules = {
      3801: (e) => {
        class r {
          constructor(e) {
            (this.value = e), (this.next = void 0);
          }
        }
        class t {
          constructor() {
            this.clear();
          }
          enqueue(e) {
            let t = new r(e);
            this._head ? (this._tail.next = t) : (this._head = t),
              (this._tail = t),
              this._size++;
          }
          dequeue() {
            let e = this._head;
            if (e) return (this._head = this._head.next), this._size--, e.value;
          }
          clear() {
            (this._head = void 0), (this._tail = void 0), (this._size = 0);
          }
          get size() {
            return this._size;
          }
          *[Symbol.iterator]() {
            let e = this._head;
            for (; e; ) yield e.value, (e = e.next);
          }
        }
        e.exports = t;
      },
      4839: (e, r, t) => {
        "use strict";
        t.d(r, { l: () => o });
        var s = t(24277),
          a = t(14567),
          o = (e, r, t) =>
            (0, s.N)(e, async (s, o) => {
              let n = s;
              if ("header" === e && r instanceof a.bv) {
                let e = Object.fromEntries(
                  Object.keys(r.shape).map((e) => [e.toLowerCase(), e]),
                );
                n = Object.fromEntries(
                  Object.entries(s).map(([r, t]) => [e[r] || r, t]),
                );
              }
              let i = await r.safeParseAsync(n);
              if (t) {
                let r = await t({ data: n, ...i, target: e }, o);
                if (r) {
                  if (r instanceof Response) return r;
                  if ("response" in r) return r.response;
                }
              }
              return i.success ? i.data : o.json(i, 400);
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
      19129: (e, r, t) => {
        "use strict";
        let s = t(3801);
        e.exports = (e) => {
          if (!((Number.isInteger(e) || e === 1 / 0) && e > 0))
            throw TypeError(
              "Expected `concurrency` to be a number from 1 and up",
            );
          let r = new s(),
            t = 0,
            a = () => {
              t--, r.size > 0 && r.dequeue()();
            },
            o = async (e, r, ...s) => {
              t++;
              let o = (async () => e(...s))();
              r(o);
              try {
                await o;
              } catch {}
              a();
            },
            n = (s, a, ...n) => {
              r.enqueue(o.bind(null, s, a, ...n)),
                (async () => {
                  await Promise.resolve(), t < e && r.size > 0 && r.dequeue()();
                })();
            },
            i = (e, ...r) =>
              new Promise((t) => {
                n(e, t, ...r);
              });
          return (
            Object.defineProperties(i, {
              activeCount: { get: () => t },
              pendingCount: { get: () => r.size },
              clearQueue: {
                value: () => {
                  r.clear();
                },
              },
            }),
            i
          );
        };
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
        t.d(r, { N: () => u });
        var s = t(62745),
          a = t(54016),
          o = (e, r) =>
            new Response(e, { headers: { "Content-Type": r } }).formData(),
          n = /^application\/([a-z-\.]+\+)?json(;\s*[a-zA-Z0-9\-]+\=([^;]+))*$/,
          i =
            /^multipart\/form-data(;\s?boundary=[a-zA-Z0-9'"()+_,\-./:=?]+)?$/,
          c =
            /^application\/x-www-form-urlencoded(;\s*[a-zA-Z0-9\-]+\=([^;]+))*$/,
          u = (e, r) => async (t, u) => {
            let l = {},
              d = t.req.header("Content-Type");
            switch (e) {
              case "json":
                if (!d || !n.test(d)) break;
                try {
                  l = await t.req.json();
                } catch {
                  throw new a.y(400, {
                    message: "Malformed JSON in request body",
                  });
                }
                break;
              case "form": {
                let e;
                if (!d || !(i.test(d) || c.test(d))) break;
                if (t.req.bodyCache.formData)
                  e = await t.req.bodyCache.formData;
                else
                  try {
                    let r = await t.req.arrayBuffer();
                    (e = await o(r, d)), (t.req.bodyCache.formData = e);
                  } catch (r) {
                    let e = "Malformed FormData request.";
                    throw (
                      ((e +=
                        r instanceof Error ? ` ${r.message}` : ` ${String(r)}`),
                      new a.y(400, { message: e }))
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
                  (l = r);
                break;
              }
              case "query":
                l = Object.fromEntries(
                  Object.entries(t.req.queries()).map(([e, r]) =>
                    1 === r.length ? [e, r[0]] : [e, r],
                  ),
                );
                break;
              case "param":
                l = t.req.param();
                break;
              case "header":
                l = t.req.header();
                break;
              case "cookie":
                l = (0, s.Ri)(t);
            }
            let p = await r(l, t);
            if (p instanceof Response) return p;
            t.req.addValidatedData(e, p), await u();
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
      28391: (e, r, t) => {
        "use strict";
        t.r(r),
          t.d(r, {
            patchFetch: () => e$,
            routeModule: () => eI,
            serverHooks: () => eO,
            workAsyncStorage: () => eT,
            workUnitAsyncStorage: () => eC,
          });
        var s = {};
        t.r(s),
          t.d(s, {
            DELETE: () => eq,
            GET: () => eE,
            HEAD: () => eA,
            OPTIONS: () => ej,
            PATCH: () => ev,
            POST: () => ek,
            PUT: () => eb,
            runtime: () => ew,
          });
        var a = t(94168),
          o = t(51293),
          n = t(64588),
          i = t(63033),
          c = t(4839),
          u = t(77719),
          l = t(43774),
          d = t(29741),
          p = t(29952),
          g = t(19129),
          m = t.n(g),
          h = t(58342),
          f = t(57826);
        let y = new f.Ay({ apiKey: process.env.OPENAI_API_KEY }),
          w = {
            documentType: "other",
            sourceType: "other",
            extractedAt: new Date().toISOString(),
          };
        async function _(e, r) {
          try {
            let t = r ? S(r) : "other",
              s = `You are an immigration data extraction specialist. Extract structured data from the given text.
    Focus on identifying key information about immigration processes, visa requirements, fees, processing times, eligibility criteria, etc.
    Format your response as a valid JSON object with the following structure:
    {
      "documentType": string, // 'policy', 'guide', 'form', 'article', 'news', 'forum', 'other'
      "visaTypes": string[],
      "countries": string[],
      "fees": string[],
      "processingTimes": string[],
      "requirements": string[],
      "eligibilityCriteria": string[],
      "documentationNeeded": string[],
      "validFrom": string, // ISO date format if available
      "validUntil": string, // ISO date format if available
      "applicationDeadlines": string[],
      "sourceType": "${t}",
      "credibilityScore": number, // 0-100 based on source reliability and content quality
      "keyPoints": string[],
      "warnings": string[],
      "tips": string[]
    }
    
    If a field cannot be determined or is not mentioned, omit it from the response.
    For dates, convert any mentioned dates to ISO format when possible.
    Be objective and extract only factual information.`,
              a =
                (
                  await y.chat.completions.create({
                    model: "gpt-3.5-turbo-16k",
                    messages: [
                      { role: "system", content: s },
                      { role: "user", content: e },
                    ],
                    temperature: 0.3,
                    max_tokens: 1e3,
                    response_format: { type: "json_object" },
                  })
                ).choices[0].message.content || "{}",
              o = JSON.parse(a);
            return {
              ...w,
              ...o,
              sourceType: t,
              extractedAt: new Date().toISOString(),
            };
          } catch (e) {
            return (
              console.error("Error extracting immigration data:", e),
              {
                ...w,
                sourceType: r ? S(r) : "other",
                warnings: ["Error extracting structured data from content"],
              }
            );
          }
        }
        function S(e) {
          let r = e.toLowerCase();
          return r.includes(".gov") ||
            r.includes(".gc.ca") ||
            r.includes(".gouv.") ||
            r.includes("government") ||
            (r.includes("immigration") &&
              (r.includes(".ca") ||
                r.includes(".us") ||
                r.includes(".uk") ||
                r.includes(".au")))
            ? "government"
            : r.includes("law") ||
                r.includes("legal") ||
                r.includes("attorney") ||
                r.includes("solicitor") ||
                r.includes("advocate")
              ? "legal"
              : r.includes("news") ||
                  r.includes("times") ||
                  r.includes("post") ||
                  r.includes("herald") ||
                  r.includes("guardian") ||
                  r.includes("bbc") ||
                  r.includes("cnn") ||
                  r.includes("reuters")
                ? "news"
                : r.includes("forum") ||
                    r.includes("community") ||
                    r.includes("discuss") ||
                    r.includes("reddit.com")
                  ? "forum"
                  : r.includes("blog") ||
                      r.includes("wordpress") ||
                      r.includes("medium.com")
                    ? "blog"
                    : "other";
        }
        let x = new f.Ay({ apiKey: process.env.OPENAI_API_KEY });
        async function E(e, r = {}) {
          let {
              maxTokens: t = 300,
              temperature: s = 0.3,
              category: a = "immigration",
            } = r,
            o = `You are an expert immigration specialist. Summarize the following ${a}-related content. 
  Focus on key facts, requirements, deadlines, and policy information. 
  Be factual, accurate, and concise.`;
          return (
            (
              await x.chat.completions.create({
                model: "gpt-3.5-turbo",
                messages: [
                  { role: "system", content: o },
                  {
                    role: "user",
                    content: `Please summarize the following content:

${e}`,
                  },
                ],
                max_tokens: t,
                temperature: s,
              })
            ).choices[0].message.content || ""
          );
        }
        async function k(e, r = {}) {
          let {
              maxTokens: t = 300,
              temperature: s = 0.3,
              category: a = "immigration",
            } = r,
            o = (function (e, r) {
              let t = [],
                s = 0;
              for (; s < e.length; ) {
                let a = s + 4e3;
                if (a < e.length) {
                  let t = e.lastIndexOf("\n\n", a);
                  if (t > s && t > s + r / 2) a = t;
                  else {
                    let t = e.lastIndexOf(". ", a);
                    t > s && t > s + r / 2 && (a = t + 1);
                  }
                } else a = e.length;
                t.push(e.substring(s, a).trim()), (s = a);
              }
              return t;
            })(e, 4e3),
            n = (
              await Promise.all(
                o.map(
                  async (e) =>
                    (
                      await x.chat.completions.create({
                        model: "gpt-3.5-turbo",
                        messages: [
                          {
                            role: "system",
                            content: `You are an expert immigration specialist. Extract key information from this ${a}-related content.`,
                          },
                          {
                            role: "user",
                            content: `Extract the key information from this content:

${e}`,
                          },
                        ],
                        max_tokens: 300,
                        temperature: s,
                      })
                    ).choices[0].message.content || "",
                ),
              )
            ).join("\n\n");
          return (
            (
              await x.chat.completions.create({
                model: "gpt-3.5-turbo",
                messages: [
                  {
                    role: "system",
                    content: `You are an expert immigration specialist. Create a cohesive summary from these extracted points about ${a}.`,
                  },
                  {
                    role: "user",
                    content: `Create a cohesive summary from these extracted points:

${n}`,
                  },
                ],
                max_tokens: t,
                temperature: s,
              })
            ).choices[0].message.content || ""
          );
        }
        async function b(e, r = {}) {
          let { method: t = "auto" } = r,
            s = Math.ceil(e.length / 4);
          if ("auto" === t)
            if (s < 2500) return E(e, r);
            else return k(e, r);
          return "map-reduce" === t ? k(e, r) : E(e, r);
        }
        async function v(e) {
          return {
            success: !0,
            data: {
              content: `Stubbed content for ${e} - Firecrawl integration temporarily disabled during migration`,
              metadata: {
                url: e,
                title: "Stubbed Title",
                timestamp: new Date().toISOString(),
              },
            },
          };
        }
        var q = t(79428),
          A = t(55511),
          j = t.n(A);
        let I = require("@aws-sdk/client-s3");
        class T {
          constructor(e, r = "https://api.firecrawl.dev") {
            if (((this.apiKey = e), !this.apiKey))
              throw Error("Firecrawl API key is required.");
            this.baseUrl = r;
          }
          async scrapeUrl(e, r) {
            try {
              let r = await fetch(`${this.baseUrl}/v0/scrape`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${this.apiKey}`,
                },
                body: JSON.stringify({
                  url: e,
                  pageOptions: {
                    formats: ["markdown", "html", "changeTracking"],
                    changeTrackingOptions: { modes: ["git-diff"] },
                  },
                }),
              });
              if (!r.ok) {
                let t = await r.json().catch(() => ({ message: r.statusText }));
                return {
                  url: e,
                  success: !1,
                  error: `Failed to scrape ${e}: ${r.status} ${t?.message || "Unknown error"}`,
                  metadata: {},
                };
              }
              let t = await r.json();
              return {
                url: e,
                success: t.success,
                markdown: t.data?.markdown,
                html: t.data?.html,
                metadata: t.data?.metadata || {},
                changeTracking: t.data?.changeTracking,
                error: t.success ? void 0 : t.error,
              };
            } catch (r) {
              return (
                console.error(`Error in Firecrawl scrapeUrl for ${e}:`, r),
                {
                  url: e,
                  success: !1,
                  error: r.message || "Client-side fetch error",
                  metadata: {},
                }
              );
            }
          }
        }
        let C = h.Ik({
          name: h.Yj(),
          baseUrl: h.Yj().url(),
          paths: h.YO(h.Yj()),
          language: h.Yj(),
          rateLimit: h.ai().int().positive(),
          selectors: h.Ik({
            content: h.Yj(),
            title: h.Yj(),
            lastUpdated: h.Yj().optional(),
            listItem: h.Yj().optional(),
            nextPage: h.Yj().optional(),
          }),
          source_type: h.Yj(),
          country_code: h.Yj().optional(),
          is_active: h.zM(),
          trackChanges: h.zM().optional().default(!1),
          pageOptions: h
            .Ik({
              formats: h.YO(h.Yj()).optional(),
              changeTrackingOptions: h
                .Ik({
                  modes: h.YO(h.k5(["git-diff", "json"])).optional(),
                  schema: h.g1(h.bz()).optional(),
                })
                .optional(),
            })
            .optional(),
        });
        class O {
          constructor(e, r, t, s, a, o, n, i) {
            (this.firecrawl = new T(e)),
              (this.supabaseAdmin = (0, u.createClient)(r, t, {
                auth: { persistSession: !1 },
              })),
              (this.r2Client = new I.S3Client({
                region: "auto",
                endpoint: s,
                credentials: { accessKeyId: o, secretAccessKey: n },
              })),
              (this.r2BucketName = i);
          }
          async uploadToR2(e, r) {
            let t = new I.PutObjectCommand({
              Bucket: this.r2BucketName,
              Key: e,
              Body: q.Buffer.from(r, "utf-8"),
              ContentType: "text/markdown; charset=utf-8",
            });
            try {
              return await this.r2Client.send(t), e;
            } catch (r) {
              throw (
                (console.error(`Failed to upload ${e} to R2:`, r),
                Error(`Failed to upload to R2: ${r.message}`))
              );
            }
          }
          async getActiveScrapeConfigs() {
            let { data: e, error: r } = await this.supabaseAdmin
              .from("scrape_configurations")
              .select("*")
              .eq("is_active", !0);
            if (r)
              throw (
                (console.error("Error fetching scrape configurations:", r),
                Error(`Failed to fetch scrape configs: ${r.message}`))
              );
            return e.map((e) =>
              C.parse({
                ...e,
                selectors:
                  "string" == typeof e.selectors
                    ? JSON.parse(e.selectors)
                    : e.selectors,
              }),
            );
          }
          async getScrapeConfigById(e) {
            let { data: r, error: t } = await this.supabaseAdmin
              .from("scrape_configurations")
              .select("*")
              .eq("id", e)
              .single();
            if (t) {
              if ("PGRST116" === t.code)
                return (
                  console.warn(`No scrape configuration found with ID: ${e}`),
                  null
                );
              throw (
                (console.error(
                  `Error fetching scrape configuration ${e}: Code ${t.code}`,
                  t.message,
                  t.details,
                ),
                Error(`Failed to fetch scrape config ${e}: ${t.message}`))
              );
            }
            if (!r)
              return (
                console.warn(
                  `No data returned for scrape configuration ID: ${e}, though no specific error was thrown.`,
                ),
                null
              );
            try {
              return C.parse({
                ...r,
                selectors:
                  "string" == typeof r.selectors
                    ? JSON.parse(r.selectors)
                    : r.selectors,
              });
            } catch (t) {
              let r = t instanceof Error ? t.message : String(t);
              throw (
                (console.error(
                  `Validation error for scrape configuration ${e}:`,
                  r,
                ),
                Error(`Invalid scrape configuration data for ${e}: ${r}`))
              );
            }
          }
          async processScrapeConfig(e) {
            let r = e.paths.map((r) => `${e.baseUrl}${r}`),
              t = 0;
            for (let s of r) {
              try {
                let r = await this.firecrawl.scrapeUrl(s, e);
                if (r.success && r.markdown) {
                  let a = r.markdown,
                    o = (0, A.createHash)("sha256").update(a).digest("hex"),
                    { data: n } = await this.supabaseAdmin
                      .from("scraped_sources")
                      .select("content_hash")
                      .eq("url", s)
                      .single();
                  if (n && n.content_hash === o) {
                    await this.supabaseAdmin
                      .from("scraped_sources")
                      .update({ last_scraped_at: new Date().toISOString() })
                      .eq("url", s),
                      t++;
                    continue;
                  }
                  let i = new URL(s),
                    c = `${i.hostname}${i.pathname.replace(/\//g, "_") || "_index"}.md`;
                  await this.uploadToR2(c, a);
                  let { error: u } = await this.supabaseAdmin
                    .from("scraped_sources")
                    .upsert(
                      {
                        url: s,
                        title: r.metadata.title || e.name,
                        source_type: e.source_type,
                        country_code: e.country_code,
                        r2_object_key: c,
                        autorag_indexed: !1,
                        last_scraped_at: new Date().toISOString(),
                        content_hash: o,
                        metadata: r.metadata,
                      },
                      { onConflict: "url" },
                    );
                  u
                    ? console.error(`Failed to upsert metadata for ${s}:`, u)
                    : t++;
                } else
                  console.error(
                    `Failed to scrape ${s}: ${r.error || "No markdown content"}`,
                  );
              } catch (r) {
                console.error(
                  `Error processing URL ${s} for config ${e.name}:`,
                  r,
                );
              }
              await new Promise((r) => setTimeout(r, e.rateLimit || 1e3));
            }
          }
          async runAllActiveScrapers() {
            for (let e of await this.getActiveScrapeConfigs())
              await this.processScrapeConfig(e);
          }
          async trackWebsiteChanges(e, r) {
            let t = {
              name: "change-tracking",
              baseUrl: new URL(e).origin,
              paths: [new URL(e).pathname],
              language: "en",
              rateLimit: 1e3,
              selectors: { content: "body", title: "title" },
              source_type: "website",
              is_active: !0,
              trackChanges: !0,
              pageOptions: {
                formats: ["markdown", "html", "changeTracking"],
                changeTrackingOptions: {
                  modes: r?.modes || ["git-diff"],
                  schema: r?.jsonSchema,
                },
              },
            };
            try {
              let r = await this.firecrawl.scrapeUrl(e, t);
              if (!r.success)
                throw (
                  (console.error(
                    `Failed to track changes for ${e}: ${r.error}`,
                  ),
                  Error(r.error || "Failed to track website changes"))
                );
              if (!r.changeTracking)
                return {
                  url: e,
                  success: !0,
                  changeTracking: {
                    previousScrapeAt: null,
                    changeStatus: "new",
                    visibility: "visible",
                  },
                  content: r.markdown || r.html,
                  metadata: r.metadata,
                };
              return {
                url: e,
                success: !0,
                changeTracking: r.changeTracking,
                content: r.markdown || r.html,
                metadata: r.metadata,
              };
            } catch (r) {
              throw (
                (console.error(
                  `Error tracking changes for ${e}:`,
                  r instanceof Error ? r.message : "Unknown error",
                ),
                r)
              );
            }
          }
          async trackChangesForAllActiveConfigs() {
            let e = await this.getActiveScrapeConfigs(),
              r = {};
            for (let t of e) {
              if (!0 !== t.trackChanges) continue;
              let e = {};
              for (let r of t.paths) {
                let s = `${t.baseUrl}${r}`;
                try {
                  let t = await this.trackWebsiteChanges(s);
                  e[r] = {
                    success: !0,
                    changeStatus: t.changeTracking?.changeStatus || "unknown",
                    previousScrapeAt: t.changeTracking?.previousScrapeAt,
                  };
                } catch (a) {
                  let t = a instanceof Error ? a.message : "Unknown error";
                  console.error(`Failed to track changes for ${s}:`, t),
                    (e[r] = { success: !1, error: t });
                }
                await new Promise((e) => setTimeout(e, t.rateLimit || 1e3));
              }
              r[t.name] = e;
            }
            return r;
          }
        }
        let $ = process.env.SUPABASE_SERVICE_ROLE_KEY,
          P = (0, u.createClient)("http://localhost:54321", $);
        async function U() {
          let { data: e, error: r } = await P.from("scraping_sources")
            .select("*")
            .order("name");
          if (r)
            throw (console.error("Error fetching scraping sources:", r), r);
          return e;
        }
        async function D(e) {
          let { data: r, error: t } = await P.from("scraping_sources")
            .select("*")
            .eq("id", e)
            .single();
          if (t) {
            if ("PGRST116" === t.code) return null;
            throw (
              (console.error("Error fetching scraping source by ID:", t), t)
            );
          }
          return r;
        }
        async function F(e) {
          let { data: r, error: t } = await P.from("scraping_sources")
            .insert(e)
            .select()
            .single();
          if (t) throw (console.error("Error creating scraping source:", t), t);
          return r;
        }
        async function R(e, r) {
          let { created_at: t, updated_at: s, trust_score: a, ...o } = r,
            { data: n, error: i } = await P.from("scraping_sources")
              .update(o)
              .eq("id", e)
              .select()
              .single();
          if (i) throw (console.error("Error updating scraping source:", i), i);
          return n;
        }
        async function Y(e) {
          let { error: r } = await P.from("scraping_sources")
            .delete()
            .eq("id", e);
          if (r) throw (console.error("Error deleting scraping source:", r), r);
        }
        async function N(e, r, t, s) {
          let { data: a, error: o } = await P.from("source_validations")
            .insert({ source_id: e, validator_id: t, score: r, notes: s })
            .select()
            .single();
          if (o) throw (console.error("Error adding source validation:", o), o);
          return a;
        }
        async function z(e, r, t, s, a) {
          let o,
            n,
            i = !1;
          if (t && "success" === r) {
            o = j().createHash("md5").update(t).digest("hex");
            let { data: r } = await P.from("scrape_history")
              .select("content_hash")
              .eq("source_id", e)
              .eq("status", "success")
              .order("scraped_at", { ascending: !1 })
              .limit(1);
            r && r.length > 0 && r[0].content_hash
              ? (i = r[0].content_hash !== o) &&
                (n = "Content has changed since last scrape")
              : ((i = !0), (n = "Initial scrape"));
          }
          await P.from("scraping_sources")
            .update({ last_scraped: new Date().toISOString() })
            .eq("id", e);
          let { data: c, error: u } = await P.from("scrape_history")
            .insert({
              source_id: e,
              artifact_id: s,
              status: r,
              error_message: a,
              content_hash: o,
              has_changes: i,
              change_summary: n,
            })
            .select()
            .single();
          if (u) throw (console.error("Error recording scrape history:", u), u);
          return c;
        }
        async function M() {
          let { data: e, error: r } = await P.from("scraping_sources")
            .select("*")
            .eq("is_active", !0)
            .or("last_scraped.is.null,last_scraped.lt.now() - scrape_frequency")
            .order("trust_score", { ascending: !1 });
          if (r)
            throw (
              (console.error("Error fetching sources due for scraping:", r), r)
            );
          return e;
        }
        var H = t(60442);
        let L = h.k5(["government", "legal", "news", "blog", "forum", "other"]),
          K = (0, u.createClient)(
            "http://localhost:54321",
            process.env.SUPABASE_SERVICE_ROLE_KEY || "",
            { auth: { persistSession: !1 } },
          ),
          B = process.env.SCRAPING_API_KEY || "your-secure-api-key",
          W = h
            .Ik({
              waitForNetworkIdle: h.zM().optional(),
              extractLinks: h.zM().optional(),
              mobile: h.zM().optional(),
              waitForSelectors: h.YO(h.Yj()).optional(),
              extractSelectors: h.g1(h.Yj()).optional(),
              timeout: h.ai().optional(),
            })
            .optional(),
          G = h.Ik({
            url: h.Yj().url(),
            options: W,
            userId: h.Yj().optional(),
            generateSummary: h.zM().optional(),
            extractData: h.zM().optional(),
          }),
          V = h.Ik({
            urls: h.YO(h.Yj().url()),
            options: W,
            userId: h.Yj().optional(),
            generateSummary: h.zM().optional(),
            extractData: h.zM().optional(),
          }),
          J = h.Ik({ sourceIds: h.YO(h.Yj()).optional() }),
          Z = h.Ik({
            name: h.Yj(),
            url: h.Yj().url(),
            category: L,
            scrape_frequency: h.Yj(),
          }),
          X = Z.partial(),
          Q = h.Ik({
            url: h.Yj().url(),
            modes: h
              .YO(h.k5(["git-diff", "json"]))
              .optional()
              .default(["git-diff"]),
            jsonSchema: h.g1(h.bz()).optional(),
          }),
          ee = h.Ik({
            score: h.ai().min(0).max(100),
            notes: h.Yj().optional(),
          });
        h.Ik({ configId: h.Yj() });
        let er = process.env.FIRECRAWL_API_KEY,
          et = "http://localhost:54321",
          es = process.env.SUPABASE_SERVICE_ROLE_KEY,
          ea = process.env.R2_ENDPOINT,
          eo = process.env.R2_ACCOUNT_ID,
          en = process.env.R2_ACCESS_KEY_ID,
          ei = process.env.R2_SECRET_ACCESS_KEY,
          ec = process.env.R2_BUCKET_NAME,
          eu = null;
        er && et && es && ea && eo && en && ei && ec
          ? (eu = new O(er, et, es, ea, eo, en, ei, ec))
          : console.error(
              "[Scraping API] Failed to initialize ScraperService: Missing one or more environment variables for Firecrawl, Supabase, or R2.",
            );
        let el = new l.$().basePath("/api/scraping");
        el.use("*", (0, d.W)());
        let ed = async (e, r) => {
          let t,
            s = "anonymous",
            a = null,
            o = e.req.header("Authorization"),
            n = e.req.query("apiKey");
          if (
            "/schedule" === e.req.path &&
            ((o && o === `Bearer ${B}`) || (n && n === B))
          ) {
            (s = "apiKey"),
              e.set("authType", s),
              e.set("session", null),
              e.set("userId", void 0),
              await r();
            return;
          }
          if (o && o.startsWith("Bearer ")) {
            let e = o.split(" ")[1];
            if (e)
              try {
                let {
                  data: { user: r },
                  error: o,
                } = await K.auth.getUser(e);
                o
                  ? console.warn(
                      "[Auth Middleware] Supabase token validation error:",
                      o.message,
                    )
                  : r && ((s = "session"), (a = r), (t = r.id));
              } catch (e) {
                console.error(
                  "[Auth Middleware] Exception during Supabase token validation:",
                  e,
                );
              }
            else
              console.warn(
                "[Auth Middleware] Bearer token malformed or empty.",
              );
          }
          e.set("authType", s), e.set("session", a), e.set("userId", t);
          let i = e.req.path,
            c = e.req.method;
          if (
            (i.startsWith("/admin") || ("/schedule" === i && "POST" === c)) &&
            "session" !== s
          )
            return (
              console.warn(
                `[Auth Middleware] Unauthorized attempt to access ${c} ${i}`,
              ),
              e.json({ error: "Unauthorized: User session required" }, 401)
            );
          await r();
        };
        el.use("*", ed),
          el.post("/", (0, c.l)("json", G), async (e) => {
            let r = e.req.valid("json"),
              t = e.get("userId");
            try {
              let s = await v(r.url, r.options || {}),
                a = {
                  url: r.url,
                  title: s?.title || `Content from ${r.url}`,
                  content: s?.content,
                  status: 200,
                  contentType: "text/html",
                };
              if (r.generateSummary && a.content)
                try {
                  a.summary = await b(a.content, { maxTokens: 500 });
                } catch (e) {
                  console.error("Summary failed:", e),
                    (a.summaryError = e.message);
                }
              if (r.extractData && a.content)
                try {
                  a.immigrationData = await _(a.content, r.url);
                } catch (e) {
                  console.error("Extraction failed:", e),
                    (a.extractionError = e.message);
                }
              if (t)
                try {
                  let { error: e } = await K.from("scraper_results").insert({
                    url: r.url,
                    user_id: t,
                  });
                  if (e) throw e;
                  a.saved = !0;
                } catch (e) {
                  console.error("Failed to save scrape result:", e),
                    (a.saveError = e.message);
                }
              try {
                await K.from("scrape_queries").insert({
                  url: r.url,
                  user_id: t,
                });
              } catch (e) {
                console.error("Failed to log scrape query:", e);
              }
              return e.json(a);
            } catch (t) {
              return (
                console.error(`[Scraping API] Error scraping URL ${r.url}:`, t),
                e.json(
                  { error: "Failed to scrape URL", details: t.message },
                  500,
                )
              );
            }
          }),
          el.post("/bulk", (0, c.l)("json", V), async (e) => {
            let r = e.req.valid("json"),
              t = e.get("userId"),
              s = [],
              a = m()(5),
              o = r.urls.map((e) =>
                a(async () => {
                  let s = { url: e, success: !1 };
                  try {
                    let a = await v(e, r.options || {});
                    if (
                      ((s.title = a?.title || `Content from ${e}`),
                      (s.content = a?.content),
                      r.generateSummary && s.content)
                    )
                      try {
                        s.summary = await b(s.content);
                      } catch (e) {
                        s.summaryError = e.message;
                      }
                    if (r.extractData && s.content)
                      try {
                        s.immigrationData = await _(s.content, e);
                      } catch (e) {
                        s.extractionError = e.message;
                      }
                    if (t)
                      try {
                        await K.from("scraper_results").insert({
                          url: e,
                          user_id: t,
                        });
                      } catch (r) {
                        (s.saveError = r.message),
                          console.error(
                            `[Scraping API] Failed to save scrape result for ${e}:`,
                            r,
                          );
                      }
                    try {
                      await K.from("scrape_queries").insert({
                        url: e,
                        user_id: t,
                      });
                    } catch (r) {
                      console.error(
                        `[Scraping API] Failed to log bulk scrape query for ${e}:`,
                        r,
                      );
                    }
                    s.success = !0;
                  } catch (r) {
                    console.error(
                      `[Scraping API] Error scraping bulk URL ${e}:`,
                      r,
                    ),
                      (s.error = r.message);
                  }
                  return s;
                }),
              ),
              n = await Promise.all(o);
            return s.push(...n), e.json({ results: s });
          }),
          el.post(
            "/country/:configId",
            (0, c.l)("param", h.Ik({ configId: h.Yj() })),
            async (e) => {
              let { configId: r } = e.req.valid("param");
              if ((e.get("userId"), !eu))
                return (
                  console.error(
                    "[Scraping API] /country/:configId - ScraperService not initialized.",
                  ),
                  e.json(
                    {
                      error:
                        "ScraperService not available due to missing configuration.",
                    },
                    503,
                  )
                );
              let t = e.get("session");
              if (
                t?.app_metadata?.claims?.app_role !== "admin" &&
                t?.user_metadata?.role !== "admin"
              )
                return e.json(
                  {
                    error:
                      "Forbidden: Admin access required to trigger country scrape.",
                  },
                  403,
                );
              try {
                let t = await eu.getScrapeConfigById(r);
                if (!t)
                  return (
                    console.warn(
                      `[Scraping API] /country/:configId - Configuration ${r} not found.`,
                    ),
                    e.json(
                      { error: `Configuration with ID ${r} not found.` },
                      404,
                    )
                  );
                return (
                  eu
                    .processScrapeConfig(t)
                    .then(() => {})
                    .catch((e) => {
                      console.error(
                        `[Scraping API] Background error processing scrape config ${r}:`,
                        e,
                      );
                    }),
                  e.json({
                    message: `Scraping process for configuration ${r} (${t.name}) initiated in background.`,
                  })
                );
              } catch (t) {
                return (
                  console.error(
                    `[Scraping API] Error initiating /country/${r} scrape:`,
                    t,
                  ),
                  e.json(
                    {
                      error: "Failed to initiate country scrape process",
                      details: t.message,
                    },
                    500,
                  )
                );
              }
            },
          ),
          el.post("/track-changes", (0, c.l)("json", Q), async (e) => {
            let { url: r, modes: t, jsonSchema: s } = e.req.valid("json");
            try {
              let a = {
                pageOptions: {
                  formats: ["markdown", "changeTracking"],
                  changeTrackingOptions: { modes: t },
                },
              };
              s &&
                t.includes("json") &&
                (a.pageOptions.changeTrackingOptions ||
                  (a.pageOptions.changeTrackingOptions = {}),
                (a.pageOptions.changeTrackingOptions.schema = s));
              let o = await v(r, a);
              if (!o || !o.changeTracking)
                return e.json(
                  {
                    success: !1,
                    error:
                      "Change tracking data not available. This might be the first time the URL has been scraped.",
                  },
                  404,
                );
              return e.json({
                success: !0,
                url: r,
                changeTracking: o.changeTracking,
                timestamp: new Date().toISOString(),
              });
            } catch (t) {
              return (
                console.error(
                  `[Scraping API] Error tracking changes for ${r}:`,
                  t,
                ),
                e.json(
                  {
                    success: !1,
                    error: "Failed to track changes",
                    details: t.message,
                  },
                  500,
                )
              );
            }
          }),
          el.post(
            "/extract",
            async (e) => (
              console.warn(
                "[Scraping API] /extract endpoint is deprecated. Use POST / and POST /track-changes.",
              ),
              e.json(
                {
                  message:
                    "Endpoint deprecated. Use POST / and POST /track-changes.",
                },
                410,
              )
            ),
          ),
          el.get("/schedule", async (e) => {
            if ("apiKey" !== e.get("authType"))
              return e.json({ error: "Unauthorized: API Key required" }, 401);
            try {
              let r = await eg();
              return e.json(r);
            } catch (r) {
              return (
                console.error("[Scraping API] Error during GET /schedule:", r),
                e.json({ error: "Error performing scheduled scraping" }, 500)
              );
            }
          }),
          el.post("/schedule", (0, c.l)("json", J), async (e) => {
            let { sourceIds: r } = e.req.valid("json");
            try {
              let t = await eg(r);
              return e.json(t);
            } catch (r) {
              return (
                console.error("[Scraping API] Error during POST /schedule:", r),
                e.json({ error: "Error performing manual scraping" }, 500)
              );
            }
          });
        let ep = new l.$();
        async function eg(e) {
          let r = [],
            t = null;
          try {
            if (e && e.length > 0) {
              let t = e.map((e) => D(e));
              r = (await Promise.all(t)).filter((e) => null !== e);
            } else r = await M();
          } catch (e) {
            console.error("[Scheduler] Error fetching sources:", e),
              (t = e.message);
          }
          let s = {
            totalFetched: r.length,
            processed: 0,
            successful: 0,
            failed: 0,
            fetchError: t,
            details: [],
          };
          if (t && 0 === r.length)
            return {
              message: "Scheduled scraping could not fetch sources.",
              results: s,
            };
          if (0 === r.length && !t)
            return {
              message:
                "No sources due for scraping or found for the given IDs.",
              results: s,
            };
          for (let e of r) {
            if (!e || !e.id || !e.url) {
              console.warn("[Scheduler] Skipping invalid source object:", e),
                s.details.push({
                  sourceId: e?.id || "unknown",
                  sourceName: e?.name,
                  url: e?.url || "unknown",
                  status: "skipped",
                  message: "Invalid source data provided.",
                });
              continue;
            }
            s.processed++;
            let r = {
              sourceId: e.id,
              sourceName: e.name,
              url: e.url,
              status: "failure",
            };
            try {
              let t = await v(e.url, {});
              if (t && t.content) {
                r.message = "Scraped successfully.";
                try {
                  r.summary = await b(t.content, { maxTokens: 200 });
                } catch (t) {
                  console.warn(
                    `[Scheduler] Summarization failed for ${e.url}:`,
                    t.message,
                  ),
                    (r.summary = "Summarization failed: " + t.message);
                }
                try {
                  r.extractedData = await _(t.content, e.url);
                } catch (t) {
                  console.warn(
                    `[Scheduler] Extraction failed for ${e.url}:`,
                    t.message,
                  ),
                    (r.extractedData = {
                      error: "Extraction failed: " + t.message,
                    });
                }
                let a = r.summary || t.title || "Scraped content available";
                await z(e.id, "success", a),
                  (r.status = "success"),
                  s.successful++;
              } else {
                let a = t
                  ? "No content returned from scrape."
                  : "Scraping did not return data.";
                console.warn(`[Scheduler] ${a} ${e.url}`),
                  (r.message = a),
                  (r.error = a),
                  await z(e.id, "error", void 0, void 0, a),
                  s.failed++;
              }
            } catch (t) {
              console.error(
                `[Scheduler] Error scraping ${e.url} (ID: ${e.id}):`,
                t,
              ),
                (r.error = t.message),
                (r.message = "Scraping process threw an exception."),
                await z(e.id, "error", void 0, void 0, t.message),
                s.failed++;
            }
            s.details.push(r), await new Promise((e) => setTimeout(e, 1e3));
          }
          return {
            message: `Scheduled scraping finished. Processed ${s.processed} of ${s.totalFetched} sources. Success: ${s.successful}, Failures: ${s.failed}.`,
            results: s,
          };
        }
        ep.use("*", async (e, r) => {
          let t = e.get("authType"),
            s = e.get("session"),
            a = e.get("userId"),
            o =
              s?.app_metadata?.claims?.app_role === "admin" ||
              s?.user_metadata?.role === "admin";
          if ("session" !== t || !a || !o)
            return (
              console.warn(
                `[AdminApp Middleware] Unauthorized access attempt. AuthType: ${t}, UserId: ${a}, IsAdmin: ${o}`,
              ),
              e.json({ error: "Forbidden: Admin access required" }, 403)
            );
          await r();
        }),
          ep.get("/sources", async (e) => {
            try {
              let r = await U();
              return e.json(r);
            } catch (r) {
              return (
                console.error("Admin GET Sources Error:", r),
                e.json({ error: "Failed to get sources" }, 500)
              );
            }
          }),
          ep.post("/sources", (0, c.l)("json", Z), async (e) => {
            let r = e.req.valid("json"),
              t = e.get("userId");
            if (!t)
              return e.json({ error: "User ID not found in session" }, 400);
            try {
              let s = await F({ ...r, created_by: t });
              return e.json(s, 201);
            } catch (r) {
              return (
                console.error("Admin POST Source Error:", r),
                e.json({ error: "Failed to create source" }, 500)
              );
            }
          }),
          ep.get("/sources/:id", async (e) => {
            let r = e.req.param("id");
            try {
              let t = await D(r);
              if (!t) return e.json({ error: "Source not found" }, 404);
              return e.json(t);
            } catch (r) {
              return (
                console.error("Admin GET Source/:id Error:", r),
                e.json({ error: "Failed to get source" }, 500)
              );
            }
          }),
          ep.put("/sources/:id", (0, c.l)("json", X), async (e) => {
            let r = e.req.param("id"),
              t = e.req.valid("json");
            try {
              let s = await R(r, t);
              if (!s) return e.json({ error: "Source not found" }, 404);
              return e.json(s);
            } catch (r) {
              return (
                console.error("Admin PUT Source/:id Error:", r),
                e.json({ error: "Failed to update source" }, 500)
              );
            }
          }),
          ep.delete("/sources/:id", async (e) => {
            let r = e.req.param("id");
            try {
              return await Y(r), e.json({ success: !0 });
            } catch (r) {
              if (
                (console.error("Admin DELETE Source/:id Error:", r),
                r.message?.includes("not found"))
              )
                return e.json({ error: "Source not found" }, 404);
              return e.json({ error: "Failed to delete source" }, 500);
            }
          }),
          ep.post("/sources/:id/validate", (0, c.l)("json", ee), async (e) => {
            let r = e.req.param("id"),
              { score: t, notes: s } = e.req.valid("json"),
              a = e.get("userId"),
              o = e.get("session"),
              n =
                o?.app_metadata?.claims?.app_role === "admin" ||
                o?.user_metadata?.role === "admin";
            if (!a || !n)
              return (
                console.warn(
                  `[Admin Validate] Unauthorized attempt by user: ${a}, session:`,
                  o,
                ),
                e.json({ error: "Forbidden: Admin access required" }, 403)
              );
            try {
              if (!(await D(r)))
                return e.json({ error: "Source not found" }, 404);
              return await N(r, t, a, s), e.json({ success: !0 });
            } catch (t) {
              return (
                console.error(
                  `[Scraping Admin] Error validating source ${r}:`,
                  t,
                ),
                e.json(
                  { error: "Failed to add validation", details: t.message },
                  500,
                )
              );
            }
          }),
          ep.get("/logs", async (e) => {
            let r = parseInt(e.req.query("page") || "1", 10),
              t = (r - 1) * 20;
            try {
              let {
                data: s,
                count: a,
                error: o,
              } = await K.from("scraping_logs")
                .select("*", { count: "exact" })
                .order("triggered_at", { ascending: !1 })
                .range(t, t + 20 - 1);
              if (o) throw o;
              let n = Math.max(1, Math.ceil((a || 0) / 20));
              return e.json({ logs: s, page: r, totalPages: n, totalCount: a });
            } catch (r) {
              return (
                console.error("Admin GET Logs Error:", r),
                e.json({ error: "Failed to get logs" }, 500)
              );
            }
          }),
          ep.get("/history", async (e) => {
            let r = parseInt(e.req.query("page") || "1", 10),
              t = e.req.query("sourceId"),
              s = (r - 1) * 20;
            try {
              let a = K.from("scrape_history").select(
                "*, scraping_sources:source_id (name, url)",
                { count: "exact" },
              );
              t && (a = a.eq("source_id", t));
              let {
                data: o,
                count: n,
                error: i,
              } = await a
                .order("scraped_at", { ascending: !1 })
                .range(s, s + 20 - 1);
              if (i) throw i;
              let c = Math.max(1, Math.ceil((n || 0) / 20));
              return e.json({
                history: o,
                page: r,
                totalPages: c,
                totalCount: n,
              });
            } catch (r) {
              return (
                console.error("Admin GET History Error:", r),
                e.json({ error: "Failed to get history" }, 500)
              );
            }
          }),
          el.route("/admin", ep);
        let em = (0, p.p)(el),
          eh = (0, p.p)(el),
          ef = (0, p.p)(el),
          ey = (0, p.p)(el),
          ew = "nodejs",
          e_ = { ...i },
          eS =
            "workUnitAsyncStorage" in e_
              ? e_.workUnitAsyncStorage
              : "requestAsyncStorage" in e_
                ? e_.requestAsyncStorage
                : void 0;
        function ex(e, r) {
          return "phase-production-build" === process.env.NEXT_PHASE ||
            "function" != typeof e
            ? e
            : new Proxy(e, {
                apply: (e, t, s) => {
                  let a;
                  try {
                    let e = eS?.getStore();
                    a = e?.headers;
                  } catch (e) {}
                  return H.wrapRouteHandlerWithSentry(e, {
                    method: r,
                    parameterizedRoute: "/api/scraping",
                    headers: a,
                  }).apply(t, s);
                },
              });
        }
        let eE = ex(em, "GET"),
          ek = ex(eh, "POST"),
          eb = ex(ef, "PUT"),
          ev = ex(void 0, "PATCH"),
          eq = ex(ey, "DELETE"),
          eA = ex(void 0, "HEAD"),
          ej = ex(void 0, "OPTIONS"),
          eI = new a.AppRouteRouteModule({
            definition: {
              kind: o.RouteKind.APP_ROUTE,
              page: "/api/scraping/route",
              pathname: "/api/scraping",
              filename: "route",
              bundlePath: "app/api/scraping/route",
            },
            resolvedPagePath:
              "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\api\\scraping\\route.ts",
            nextConfigOutput: "",
            userland: s,
          }),
          {
            workAsyncStorage: eT,
            workUnitAsyncStorage: eC,
            serverHooks: eO,
          } = eI;
        function e$() {
          return (0, n.patchFetch)({
            workAsyncStorage: eT,
            workUnitAsyncStorage: eC,
          });
        }
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
          return async function (e, a) {
            function o(r, t) {
              e.res.headers.set(r, t);
            }
            let n = t(e.req.header("origin") || "", e);
            if ((n && o("Access-Control-Allow-Origin", n), "*" !== r.origin)) {
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
              let a = r.allowHeaders;
              if (!a?.length) {
                let r = e.req.header("Access-Control-Request-Headers");
                r && (a = r.split(/\s*,\s*/));
              }
              return (
                a?.length &&
                  (o("Access-Control-Allow-Headers", a.join(",")),
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
            await a();
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
        t.d(r, { Yj: () => g, Ri: () => d, TV: () => p });
        var s = t(79533),
          a = { name: "HMAC", hash: "SHA-256" },
          o = async (e) => {
            let r = "string" == typeof e ? new TextEncoder().encode(e) : e;
            return await crypto.subtle.importKey("raw", r, a, !1, [
              "sign",
              "verify",
            ]);
          },
          n = /^[\w!#$%&'*.^`|~+-]+$/,
          i = /^[ !#-:<-[\]-~]*$/,
          c = (e, r) => {
            if (r && -1 === e.indexOf(r)) return {};
            let t = e.trim().split(";"),
              a = {};
            for (let e of t) {
              let t = (e = e.trim()).indexOf("=");
              if (-1 === t) continue;
              let o = e.substring(0, t).trim();
              if ((r && r !== o) || !n.test(o)) continue;
              let c = e.substring(t + 1).trim();
              if (
                (c.startsWith('"') && c.endsWith('"') && (c = c.slice(1, -1)),
                i.test(c) && ((a[o] = (0, s.Rp)(c)), r))
              )
                break;
            }
            return a;
          },
          u = (e, r, t = {}) => {
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
          l = (e, r, t) => u(e, (r = encodeURIComponent(r)), t),
          d = (e, r, t) => {
            let s = e.req.raw.headers.get("Cookie");
            if ("string" == typeof r) {
              if (!s) return;
              let e = r;
              return (
                "secure" === t
                  ? (e = "__Secure-" + r)
                  : "host" === t && (e = "__Host-" + r),
                c(s, e)[e]
              );
            }
            return s ? c(s) : {};
          },
          p = (e, r, t, s) => {
            let a;
            (a =
              s?.prefix === "secure"
                ? l("__Secure-" + r, t, { path: "/", ...s, secure: !0 })
                : s?.prefix === "host"
                  ? l("__Host-" + r, t, {
                      ...s,
                      path: "/",
                      secure: !0,
                      domain: void 0,
                    })
                  : l(r, t, { path: "/", ...s })),
              e.header("Set-Cookie", a, { append: !0 });
          },
          g = (e, r, t) => {
            let s = d(e, r, t?.prefix);
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
    s = r.X(0, [827, 7719, 8342, 2256, 3774, 7826], () => t(28391));
  module.exports = s;
})();
//# sourceMappingURL=route.js.map
