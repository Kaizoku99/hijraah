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
    (e._sentryDebugIds[r] = "0a20ae4d-5f4f-4236-a866-dccf520bdab0"),
    (e._sentryDebugIdIdentifier =
      "sentry-dbid-0a20ae4d-5f4f-4236-a866-dccf520bdab0"));
} catch (e) {}
(() => {
  var e = {};
  (e.id = 9865),
    (e.ids = [9865]),
    (e.modules = {
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
      19771: (e) => {
        "use strict";
        e.exports = require("process");
      },
      21820: (e) => {
        "use strict";
        e.exports = require("os");
      },
      27508: (e, r, t) => {
        "use strict";
        t.a(e, async (e, o) => {
          try {
            t.d(r, { w: () => a });
            var s = t(85488),
              i = t(13687),
              n = e([s]);
            async function a(e, r) {
              let t = (0, i.L)("mistral-large-latest"),
                { text: o, finishReason: n } = await (0, s.generateText)({
                  model: t,
                  messages: [
                    {
                      role: "user",
                      content: [
                        {
                          type: "text",
                          text: "Extract all text content from the following document accurately. Respond only with the extracted text.",
                        },
                        { type: "image", image: e, mimeType: r ?? void 0 },
                      ],
                    },
                  ],
                  temperature: 0,
                });
              return (
                "stop" !== n &&
                  "length" !== n &&
                  console.warn("[OCR] Mistral finished with reason:", n),
                o
              );
            }
            (s = (n.then ? (await n)() : n)[0]), o();
          } catch (e) {
            o(e);
          }
        });
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
      85488: (e) => {
        "use strict";
        e.exports = import("ai");
      },
      85603: (e, r, t) => {
        "use strict";
        t.a(e, async (e, o) => {
          try {
            t.r(r),
              t.d(r, {
                DELETE: () => P,
                GET: () => A,
                HEAD: () => $,
                OPTIONS: () => T,
                PATCH: () => b,
                POST: () => R,
                PUT: () => C,
              });
            var s = t(63033),
              i = t(13687),
              n = t(77719),
              a = t(85488),
              c = t(43774),
              u = t(29741),
              l = t(29952),
              d = t(58342),
              f = t(79273),
              p = t(27508),
              h = t(60442),
              m = e([a, p]);
            [a, p] = m.then ? (await m)() : m;
            let x = "http://localhost:54321",
              w = process.env.SUPABASE_SERVICE_ROLE_KEY || "",
              g = (0, n.createClient)(x, w),
              q = (0, n.createClient)(x, w),
              I = (process.env.API_SECRET_KEY, new c.$());
            I.use("*", (0, u.W)());
            let _ = d.Ik({
              fileId: d.Yj(),
              chatId: d.Yj().optional(),
              userId: d.Yj().optional(),
              fileName: d.Yj(),
              fileType: d.Yj(),
              fileUrl: d.Yj().url().optional(),
              fileContent: d.Yj().optional(),
              filePath: d.Yj().min(1).optional(),
              documentId: d.Yj().uuid().optional(),
            });
            d.Ik({
              text: d.Yj(),
              metadata: d
                .Ik({
                  pageCount: d.ai().optional(),
                  language: d.Yj().optional(),
                  confidence: d.ai().optional(),
                  processTime: d.ai().optional(),
                  rawResponse: d.bz().optional(),
                })
                .optional(),
            }),
              I.post("/", async (e) => {
                try {
                  e.req.header("Authorization");
                  let r = await e.req.json(),
                    t = _.safeParse(r);
                  if (!t.success)
                    return e.json(
                      { error: "Invalid input", details: t.error.errors },
                      400,
                    );
                  let o = t.data,
                    s = o.fileId,
                    { data: i, error: n } = await g
                      .from("document_ocr_results")
                      .select("result")
                      .eq("file_id", s)
                      .maybeSingle();
                  if (
                    (n &&
                      console.error(
                        `[OCR API] Error checking cache for fileId ${s}:`,
                        n,
                      ),
                    i)
                  )
                    return e.json(i.result);
                  let a = null,
                    c = "";
                  if (o.fileContent)
                    (a = Buffer.from(o.fileContent, "base64")),
                      (c = "provided base64 content");
                  else if (o.fileUrl) {
                    c = `URL: ${o.fileUrl}`;
                    try {
                      let e = await fetch(o.fileUrl);
                      if (!e.ok)
                        throw Error(
                          `Failed to fetch from URL: ${e.statusText}`,
                        );
                      let r = await e.arrayBuffer();
                      a = Buffer.from(r);
                    } catch (r) {
                      return (
                        console.error(
                          `[OCR API] Error fetching file from URL ${o.fileUrl} for fileId ${s}:`,
                          r,
                        ),
                        e.json(
                          {
                            error: `Failed to fetch file from provided URL: ${r.message}`,
                          },
                          500,
                        )
                      );
                    }
                  } else {
                    if (!o.filePath)
                      return (
                        console.error(
                          `[OCR API] No file content, URL, or path provided for fileId: ${s}`,
                        ),
                        e.json(
                          { error: "No file content, URL, or path provided" },
                          400,
                        )
                      );
                    c = `storage path: ${o.filePath}`;
                    let r = o.chatId ? "chat-attachments" : "documents",
                      t = o.chatId ? `${o.chatId}/${s}` : o.filePath,
                      i = "documents" === r ? q : g,
                      { data: n, error: u } = await i.storage
                        .from(r)
                        .download(t);
                    if (u)
                      return (
                        console.error(
                          `[OCR API] Error downloading file ${t} from bucket ${r} for fileId ${s}:`,
                          u,
                        ),
                        e.json(
                          {
                            error: `Failed to download document from storage (${r}): ${u.message}`,
                          },
                          500,
                        )
                      );
                    if (!n)
                      return (
                        console.error(
                          `[OCR API] No file data found for path ${t} in bucket ${r}, fileId ${s}.`,
                        ),
                        e.json({ error: "Document not found in storage" }, 404)
                      );
                    a = Buffer.from(await n.arrayBuffer());
                  }
                  if (!a)
                    return (
                      console.error(
                        `[OCR API] Failed to obtain file buffer for fileId: ${s} from ${c}`,
                      ),
                      e.json({ error: "Failed to obtain file buffer" }, 500)
                    );
                  try {
                    let r = Date.now(),
                      t = await (0, p.w)(a, o.fileType),
                      i = Date.now() - r,
                      n = {
                        text: t,
                        metadata: {
                          language: void 0,
                          confidence: void 0,
                          processTime: i,
                        },
                      },
                      { error: c } = await g
                        .from("document_ocr_results")
                        .upsert(
                          {
                            file_id: s,
                            chat_id: o.chatId,
                            user_id: o.userId,
                            file_name: o.fileName,
                            file_type: o.fileType,
                            result: n,
                            created_at: new Date().toISOString(),
                          },
                          { onConflict: "file_id" },
                        );
                    return (
                      c &&
                        console.error(
                          `[OCR API] Error caching OCR result for fileId ${s}:`,
                          c,
                        ),
                      e.json(n)
                    );
                  } catch (r) {
                    return (
                      console.error(
                        `[OCR API] Vercel AI SDK/Mistral error for fileId ${s}:`,
                        r,
                      ),
                      e.json(
                        {
                          error:
                            r instanceof Error
                              ? r.message
                              : "Failed to process document with AI OCR",
                        },
                        500,
                      )
                    );
                  }
                } catch (r) {
                  if (
                    (console.error("[OCR API] General error:", r),
                    r instanceof f.G)
                  )
                    return e.json(
                      {
                        error: "Invalid request body format",
                        details: r.errors,
                      },
                      400,
                    );
                  return e.json(
                    {
                      error:
                        r instanceof Error
                          ? r.message
                          : "Internal server error",
                    },
                    500,
                  );
                }
              }),
              I.post("/question", async (e) => {
                try {
                  let {
                    fileId: r,
                    question: t,
                    chatId: o,
                    userId: s,
                  } = await e.req.json();
                  if (!r || !t)
                    return e.json({ error: "Missing fileId or question" }, 400);
                  let { data: n, error: c } = await g
                    .from("document_ocr_results")
                    .select("result")
                    .eq("file_id", r)
                    .maybeSingle();
                  if (c || !n || !n.result?.text)
                    return (
                      console.error(
                        `[OCR Q&A] Error fetching cached OCR result for fileId ${r}:`,
                        c || "Not Found",
                      ),
                      e.json(
                        {
                          error: "Failed to fetch or parse OCR result for Q&A",
                        },
                        404,
                      )
                    );
                  try {
                    Date.now();
                    let {
                      text: c,
                      usage: u,
                      finishReason: l,
                    } = await (0, a.generateText)({
                      model: (0, i.L)("mistral-large-latest"),
                      messages: [
                        {
                          role: "system",
                          content:
                            "You are a helpful document analysis assistant. Answer questions based *only* on the provided document content accurately and concisely. If the answer is not in the text, say so.",
                        },
                        {
                          role: "user",
                          content: `Document content:

${n.result.text}

---

Question: ${t}`,
                        },
                      ],
                    });
                    Date.now();
                    let d =
                        c ||
                        "Unable to answer this question based on the provided text.",
                      { error: f } = await g
                        .from("document_qa_history")
                        .insert({
                          file_id: r,
                          chat_id: o,
                          user_id: s,
                          question: t,
                          answer: d,
                          created_at: new Date().toISOString(),
                        });
                    return (
                      f &&
                        console.error(
                          `[OCR Q&A] Error saving Q&A history for fileId ${r}:`,
                          f,
                        ),
                      e.json({ answer: d })
                    );
                  } catch (t) {
                    return (
                      console.error(
                        `[OCR Q&A] Vercel AI SDK/Mistral chat error for fileId ${r}:`,
                        t,
                      ),
                      e.json(
                        {
                          error:
                            t.message ||
                            "Failed to process question with Mistral AI",
                        },
                        500,
                      )
                    );
                  }
                } catch (r) {
                  return (
                    console.error("[OCR Q&A] General error:", r),
                    e.json(
                      {
                        error:
                          r instanceof Error
                            ? r.message
                            : "Internal server error in Q&A",
                      },
                      500,
                    )
                  );
                }
              }),
              I.get("/:fileId/history", async (e) => {
                try {
                  let r = e.req.param("fileId"),
                    { data: t, error: o } = await g
                      .from("document_qa_history")
                      .select("question, answer, created_at")
                      .eq("file_id", r)
                      .order("created_at", { ascending: !1 });
                  if (o)
                    return (
                      console.error(
                        `[OCR History] Error fetching history for fileId ${r}:`,
                        o,
                      ),
                      e.json({ error: "Failed to fetch question history" }, 500)
                    );
                  return e.json(t || []);
                } catch (r) {
                  return (
                    console.error("[OCR History] General error:", r),
                    e.json(
                      {
                        error:
                          r instanceof Error
                            ? r.message
                            : "Internal server error fetching history",
                      },
                      500,
                    )
                  );
                }
              });
            let v = (0, l.p)(I),
              E = (0, l.p)(I),
              O = { ...s },
              j =
                "workUnitAsyncStorage" in O
                  ? O.workUnitAsyncStorage
                  : "requestAsyncStorage" in O
                    ? O.requestAsyncStorage
                    : void 0;
            function y(e, r) {
              return "phase-production-build" === process.env.NEXT_PHASE ||
                "function" != typeof e
                ? e
                : new Proxy(e, {
                    apply: (e, t, o) => {
                      let s;
                      try {
                        let e = j?.getStore();
                        s = e?.headers;
                      } catch (e) {}
                      return h
                        .wrapRouteHandlerWithSentry(e, {
                          method: r,
                          parameterizedRoute: "/api/documents/ocr",
                          headers: s,
                        })
                        .apply(t, o);
                    },
                  });
            }
            let A = y(v, "GET"),
              R = y(E, "POST"),
              C = y(void 0, "PUT"),
              b = y(void 0, "PATCH"),
              P = y(void 0, "DELETE"),
              $ = y(void 0, "HEAD"),
              T = y(void 0, "OPTIONS");
            o();
          } catch (e) {
            o(e);
          }
        });
      },
      86592: (e) => {
        "use strict";
        e.exports = require("node:inspector");
      },
      90078: (e, r, t) => {
        "use strict";
        t.a(e, async (e, o) => {
          try {
            t.r(r),
              t.d(r, {
                patchFetch: () => u,
                routeModule: () => l,
                serverHooks: () => p,
                workAsyncStorage: () => d,
                workUnitAsyncStorage: () => f,
              });
            var s = t(94168),
              i = t(51293),
              n = t(64588),
              a = t(85603),
              c = e([a]);
            a = (c.then ? (await c)() : c)[0];
            let l = new s.AppRouteRouteModule({
                definition: {
                  kind: i.RouteKind.APP_ROUTE,
                  page: "/api/documents/ocr/route",
                  pathname: "/api/documents/ocr",
                  filename: "route",
                  bundlePath: "app/api/documents/ocr/route",
                },
                resolvedPagePath:
                  "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\api\\documents\\ocr\\route.ts",
                nextConfigOutput: "",
                userland: a,
              }),
              {
                workAsyncStorage: d,
                workUnitAsyncStorage: f,
                serverHooks: p,
              } = l;
            function u() {
              return (0, n.patchFetch)({
                workAsyncStorage: d,
                workUnitAsyncStorage: f,
              });
            }
            o();
          } catch (e) {
            o(e);
          }
        });
      },
      91645: (e) => {
        "use strict";
        e.exports = require("net");
      },
      94168: (e, r, t) => {
        "use strict";
        e.exports = t(44870);
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
  var r = require("../../../../webpack-runtime.js");
  r.C(e);
  var t = (e) => r((r.s = e)),
    o = r.X(0, [827, 7719, 8342, 3774, 4256, 2958], () => t(90078));
  module.exports = o;
})();
//# sourceMappingURL=route.js.map
