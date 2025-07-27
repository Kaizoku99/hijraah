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
    (e._sentryDebugIds[r] = "f84d4272-660f-4d88-aca8-038f3c12605e"),
    (e._sentryDebugIdIdentifier =
      "sentry-dbid-f84d4272-660f-4d88-aca8-038f3c12605e"));
} catch (e) {}
("use strict");
(() => {
  var e = {};
  (e.id = 2977),
    (e.ids = [2977]),
    (e.modules = {
      3295: (e) => {
        e.exports = require("next/dist/server/app-render/after-task-async-storage.external.js");
      },
      5269: (e, r, t) => {
        t.r(r),
          t.d(r, {
            patchFetch: () => j,
            routeModule: () => _,
            serverHooks: () => U,
            workAsyncStorage: () => D,
            workUnitAsyncStorage: () => T,
          });
        var a = {};
        t.r(a),
          t.d(a, {
            DELETE: () => S,
            GET: () => v,
            HEAD: () => C,
            OPTIONS: () => R,
            PATCH: () => P,
            POST: () => k,
            PUT: () => A,
          });
        var s = t(94168),
          o = t(51293),
          n = t(64588),
          i = t(63033),
          d = t(68593),
          c = t(14795),
          l = t(90866),
          u = t(62799),
          p = t(69959),
          w = t(42476);
        let m = new (t(57826).Ay)({ apiKey: process.env.OPENAI_API_KEY });
        async function g(e) {
          try {
            let r = await m.embeddings.create({
              model: "text-embedding-3-small",
              input: e.trim(),
              encoding_format: "float",
            });
            if (!r.data || 0 === r.data.length)
              throw Error("No embedding data returned");
            return r.data[0].embedding;
          } catch (e) {
            throw (
              (console.error("Error generating embedding:", e),
              Error(`Failed to generate embedding: ${e}`))
            );
          }
        }
        let x = new l.default({ apiKey: process.env.FIRECRAWL_API_KEY });
        class h {
          static async startCrawl(e) {
            try {
              let [r] = await u.db
                .select()
                .from(p.webIndexes)
                .where((0, w.eq)(p.webIndexes.id, e))
                .limit(1);
              if (!r) throw Error("Web index not found");
              let t = r.crawlConfig || {},
                a = await x.crawlUrl(r.url, {
                  maxPages: t.maxPages || 100,
                  includeHtml: !1,
                  includeMarkdown: !0,
                  includeMetadata: !0,
                  excludePaths: t.excludePatterns || [],
                  includePaths: t.includePatterns || [],
                  respectRobotsTxt: !1 !== t.respectRobotsTxt,
                  delay: t.delay || 1e3,
                  extractorOptions: {
                    mode: "llm-extraction",
                    extractionPrompt:
                      "Extract the main content and metadata from this page, focusing on text content that would be useful for search and question-answering.",
                  },
                });
              if (!a.success) throw Error(`Firecrawl job failed: ${a.error}`);
              let s = a.id || a.jobId;
              return (
                await u.db
                  .update(p.crawlJobs)
                  .set({
                    firecrawlJobId: s,
                    status: "processing",
                    startedAt: new Date(),
                  })
                  .where((0, w.eq)(p.crawlJobs.webIndexId, e)),
                { jobId: s }
              );
            } catch (e) {
              throw (console.error("Error starting crawl:", e), e);
            }
          }
          static async checkCrawlStatus(e) {
            try {
              let r = await x.checkCrawlStatus(e);
              if (!r.success) throw Error(`Failed to check status: ${r.error}`);
              let t = r.status,
                a = "completed" === t,
                s = "failed" === t;
              return {
                status: s ? "failed" : a ? "completed" : "processing",
                pagesProcessed: r.current || 0,
                totalPages: r.total,
                data: a ? r.data : void 0,
                errorMessage: s ? r.error : void 0,
              };
            } catch (e) {
              return (
                console.error("Error checking crawl status:", e),
                {
                  status: "failed",
                  errorMessage:
                    e instanceof Error ? e.message : "Unknown error",
                  pagesProcessed: 0,
                }
              );
            }
          }
          static async processCrawlResults(e, r) {
            try {
              let [t] = await u.db
                .select()
                .from(p.webIndexes)
                .where((0, w.eq)(p.webIndexes.id, e))
                .limit(1);
              if (!t) throw Error("Web index not found");
              for (let a of r) {
                if (!a.markdown || !a.metadata?.title) continue;
                let [r] = await u.db
                  .insert(p.documents)
                  .values({
                    userId: t.userId,
                    webIndexId: e,
                    filename:
                      a.metadata.title ||
                      new URL(a.metadata.sourceURL || a.url).pathname,
                    filePath: a.metadata.sourceURL || a.url,
                    fileType: "text/html",
                    fileSize: a.markdown.length,
                    title: a.metadata.title || "Untitled",
                    content: a.markdown,
                    status: "processing",
                    metadata: {
                      url: a.metadata.sourceURL || a.url,
                      description: a.metadata.description,
                      keywords: a.metadata.keywords,
                      ogTitle: a.metadata.ogTitle,
                      ogDescription: a.metadata.ogDescription,
                      statusCode: a.metadata.statusCode,
                      crawledAt: new Date().toISOString(),
                    },
                  })
                  .returning();
                await this.createDocumentEmbeddings(r.id, a.markdown),
                  await u.db
                    .update(p.documents)
                    .set({ status: "complete" })
                    .where((0, w.eq)(p.documents.id, r.id));
              }
              await u.db
                .update(p.webIndexes)
                .set({
                  pagesCrawled: r.length,
                  totalPages: r.length,
                  lastCrawledAt: new Date(),
                  updatedAt: new Date(),
                })
                .where((0, w.eq)(p.webIndexes.id, e));
            } catch (e) {
              throw (console.error("Error processing crawl results:", e), e);
            }
          }
          static async createDocumentEmbeddings(e, r) {
            try {
              let t = this.splitIntoChunks(r, 1e3, 200);
              for (let r = 0; r < t.length; r++) {
                let a = t[r],
                  s = await g(a);
                await u.db
                  .insert(p.documentChunks)
                  .values({
                    documentId: e,
                    chunkIndex: r,
                    textContent: a,
                    embedding: s,
                    tokenCount: Math.ceil(a.length / 4),
                  });
              }
            } catch (e) {
              throw (
                (console.error("Error creating document embeddings:", e), e)
              );
            }
          }
          static splitIntoChunks(e, r = 1e3, t = 200) {
            let a = [],
              s = 0;
            for (; s < e.length; ) {
              let o = Math.min(s + r, e.length),
                n = e.slice(s, o);
              if ((a.push(n), o === e.length)) break;
              s += r - t;
            }
            return a;
          }
          static async monitorActiveCrawls() {
            try {
              for (let e of await u.db
                .select({
                  id: p.crawlJobs.id,
                  webIndexId: p.crawlJobs.webIndexId,
                  firecrawlJobId: p.crawlJobs.firecrawlJobId,
                })
                .from(p.crawlJobs)
                .where((0, w.eq)(p.crawlJobs.status, "processing")))
                if (e.firecrawlJobId)
                  try {
                    let r = await this.checkCrawlStatus(e.firecrawlJobId);
                    await u.db
                      .update(p.crawlJobs)
                      .set({
                        status: r.status,
                        pagesProcessed: r.pagesProcessed,
                        errorMessage: r.errorMessage,
                        completedAt:
                          "completed" === r.status || "failed" === r.status
                            ? new Date()
                            : void 0,
                        metadata: {
                          ...e,
                          lastStatusCheck: new Date().toISOString(),
                          totalPages: r.totalPages,
                        },
                      })
                      .where((0, w.eq)(p.crawlJobs.id, e.id)),
                      "completed" === r.status &&
                        r.data &&
                        (await this.processCrawlResults(e.webIndexId, r.data));
                  } catch (r) {
                    console.error(`Error monitoring crawl ${e.id}:`, r),
                      await u.db
                        .update(p.crawlJobs)
                        .set({
                          status: "failed",
                          errorMessage:
                            r instanceof Error
                              ? r.message
                              : "Monitoring failed",
                          completedAt: new Date(),
                        })
                        .where((0, w.eq)(p.crawlJobs.id, e.id));
                  }
            } catch (e) {
              console.error("Error monitoring active crawls:", e);
            }
          }
        }
        var f = t(60442);
        async function b(e) {
          try {
            let r = e.headers.get("authorization"),
              t = process.env.CRON_SECRET || process.env.ADMIN_API_KEY;
            if (!r || !t)
              return d.NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 },
              );
            if (r.replace("Bearer ", "") !== t)
              return d.NextResponse.json(
                { error: "Invalid API key" },
                { status: 401 },
              );
            return (
              await h.monitorActiveCrawls(),
              d.NextResponse.json({
                success: !0,
                message: "Crawl monitoring completed",
                timestamp: new Date().toISOString(),
              })
            );
          } catch (e) {
            return (
              console.error("Error in crawl monitoring:", e),
              d.NextResponse.json(
                {
                  error: "Monitoring failed",
                  details: e instanceof Error ? e.message : "Unknown error",
                },
                { status: 500 },
              )
            );
          }
        }
        async function q(e) {
          try {
            let e = await (0, c.j2)();
            if (!e?.user?.id)
              return d.NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 },
              );
            return (
              await h.monitorActiveCrawls(),
              d.NextResponse.json({
                success: !0,
                message: "Manual crawl monitoring completed",
                triggeredBy: e.user.id,
                timestamp: new Date().toISOString(),
              })
            );
          } catch (e) {
            return (
              console.error("Error in manual crawl monitoring:", e),
              d.NextResponse.json(
                {
                  error: "Manual monitoring failed",
                  details: e instanceof Error ? e.message : "Unknown error",
                },
                { status: 500 },
              )
            );
          }
        }
        let y = { ...i },
          E =
            "workUnitAsyncStorage" in y
              ? y.workUnitAsyncStorage
              : "requestAsyncStorage" in y
                ? y.requestAsyncStorage
                : void 0;
        function I(e, r) {
          return "phase-production-build" === process.env.NEXT_PHASE ||
            "function" != typeof e
            ? e
            : new Proxy(e, {
                apply: (e, t, a) => {
                  let s;
                  try {
                    let e = E?.getStore();
                    s = e?.headers;
                  } catch (e) {}
                  return f
                    .wrapRouteHandlerWithSentry(e, {
                      method: r,
                      parameterizedRoute: "/api/admin/monitor-crawls",
                      headers: s,
                    })
                    .apply(t, a);
                },
              });
        }
        let v = I(q, "GET"),
          k = I(b, "POST"),
          A = I(void 0, "PUT"),
          P = I(void 0, "PATCH"),
          S = I(void 0, "DELETE"),
          C = I(void 0, "HEAD"),
          R = I(void 0, "OPTIONS"),
          _ = new s.AppRouteRouteModule({
            definition: {
              kind: o.RouteKind.APP_ROUTE,
              page: "/api/admin/monitor-crawls/route",
              pathname: "/api/admin/monitor-crawls",
              filename: "route",
              bundlePath: "app/api/admin/monitor-crawls/route",
            },
            resolvedPagePath:
              "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\api\\admin\\monitor-crawls\\route.ts",
            nextConfigOutput: "",
            userland: a,
          }),
          { workAsyncStorage: D, workUnitAsyncStorage: T, serverHooks: U } = _;
        function j() {
          return (0, n.patchFetch)({
            workAsyncStorage: D,
            workUnitAsyncStorage: T,
          });
        }
      },
      8086: (e) => {
        e.exports = require("module");
      },
      10846: (e) => {
        e.exports = require("next/dist/compiled/next-server/app-page.runtime.prod.js");
      },
      11997: (e) => {
        e.exports = require("punycode");
      },
      12412: (e) => {
        e.exports = require("assert");
      },
      19121: (e) => {
        e.exports = require("next/dist/server/app-render/action-async-storage.external.js");
      },
      19771: (e) => {
        e.exports = require("process");
      },
      21820: (e) => {
        e.exports = require("os");
      },
      27910: (e) => {
        e.exports = require("stream");
      },
      28354: (e) => {
        e.exports = require("util");
      },
      29021: (e) => {
        e.exports = require("fs");
      },
      29294: (e) => {
        e.exports = require("next/dist/server/app-render/work-async-storage.external.js");
      },
      31421: (e) => {
        e.exports = require("node:child_process");
      },
      33873: (e) => {
        e.exports = require("path");
      },
      34631: (e) => {
        e.exports = require("tls");
      },
      36686: (e) => {
        e.exports = require("diagnostics_channel");
      },
      37067: (e) => {
        e.exports = require("node:http");
      },
      37830: (e) => {
        e.exports = require("node:stream/web");
      },
      38522: (e) => {
        e.exports = require("node:zlib");
      },
      41692: (e) => {
        e.exports = require("node:tls");
      },
      44708: (e) => {
        e.exports = require("node:https");
      },
      44870: (e) => {
        e.exports = require("next/dist/compiled/next-server/app-route.runtime.prod.js");
      },
      48161: (e) => {
        e.exports = require("node:os");
      },
      53053: (e) => {
        e.exports = require("node:diagnostics_channel");
      },
      55511: (e) => {
        e.exports = require("crypto");
      },
      55591: (e) => {
        e.exports = require("https");
      },
      57075: (e) => {
        e.exports = require("node:stream");
      },
      57975: (e) => {
        e.exports = require("node:util");
      },
      62799: (e, r, t) => {
        t.d(r, { db: () => d });
        var a = t(61371),
          s = t(78814),
          o = t(69959);
        let n = process.env.DATABASE_URL;
        if (!n) throw Error("DATABASE_URL environment variable is required");
        let i = (0, s.A)(n, { max: 10, idle_timeout: 20, connect_timeout: 10 }),
          d = (0, a.f)(i, { schema: o, logger: !1 });
      },
      63033: (e) => {
        e.exports = require("next/dist/server/app-render/work-unit-async-storage.external.js");
      },
      73024: (e) => {
        e.exports = require("node:fs");
      },
      73566: (e) => {
        e.exports = require("worker_threads");
      },
      74075: (e) => {
        e.exports = require("zlib");
      },
      74998: (e) => {
        e.exports = require("perf_hooks");
      },
      75919: (e) => {
        e.exports = require("node:worker_threads");
      },
      76760: (e) => {
        e.exports = require("node:path");
      },
      77030: (e) => {
        e.exports = require("node:net");
      },
      79428: (e) => {
        e.exports = require("buffer");
      },
      79551: (e) => {
        e.exports = require("url");
      },
      79646: (e) => {
        e.exports = require("child_process");
      },
      80481: (e) => {
        e.exports = require("node:readline");
      },
      81630: (e) => {
        e.exports = require("http");
      },
      83997: (e) => {
        e.exports = require("tty");
      },
      84297: (e) => {
        e.exports = require("async_hooks");
      },
      86592: (e) => {
        e.exports = require("node:inspector");
      },
      91645: (e) => {
        e.exports = require("net");
      },
      94735: (e) => {
        e.exports = require("events");
      },
    });
  var r = require("../../../../webpack-runtime.js");
  r.C(e);
  var t = (e) => r((r.s = e)),
    a = r.X(
      0,
      [
        827, 6518, 2872, 7713, 5149, 7719, 8119, 5058, 5400, 131, 8342, 2028,
        7826, 1070, 978, 5431, 866, 1371, 4232, 9632, 9959,
      ],
      () => t(5269),
    );
  module.exports = a;
})();
//# sourceMappingURL=route.js.map
