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
    (e._sentryDebugIds[t] = "3f863f9b-88ca-4e63-921b-950aab0b61e5"),
    (e._sentryDebugIdIdentifier =
      "sentry-dbid-3f863f9b-88ca-4e63-921b-950aab0b61e5"));
} catch (e) {}
("use strict");
(exports.id = 2958),
  (exports.ids = [2958]),
  (exports.modules = {
    13687: (e, t, n) => {
      n.d(t, { L: () => y });
      var o = n(14256),
        s = n(58342),
        l = n(68098);
      function r(e) {
        switch (e) {
          case "stop":
            return "stop";
          case "length":
          case "model_length":
            return "length";
          case "tool_calls":
            return "tool-calls";
          default:
            return "unknown";
        }
      }
      var a = s.Ik({
          object: s.eu("error"),
          message: s.Yj(),
          type: s.Yj(),
          param: s.Yj().nullable(),
          code: s.Yj().nullable(),
        }),
        i = (0, o.sl)({ errorSchema: a, errorToMessage: (e) => e.message });
      function u({ id: e, model: t, created: n }) {
        return {
          id: null != e ? e : void 0,
          modelId: null != t ? t : void 0,
          timestamp: null != n ? new Date(1e3 * n) : void 0,
        };
      }
      var d = class {
        constructor(e, t, n) {
          (this.specificationVersion = "v1"),
            (this.defaultObjectGenerationMode = "json"),
            (this.supportsImageUrls = !1),
            (this.modelId = e),
            (this.settings = t),
            (this.config = n);
        }
        get provider() {
          return this.config.provider;
        }
        supportsUrl(e) {
          return "https:" === e.protocol;
        }
        getArgs({
          mode: e,
          prompt: t,
          maxTokens: n,
          temperature: s,
          topP: r,
          topK: a,
          frequencyPenalty: i,
          presencePenalty: u,
          stopSequences: d,
          responseFormat: c,
          seed: p,
          providerMetadata: h,
        }) {
          var g, m;
          let f = e.type,
            y = [];
          null != a && y.push({ type: "unsupported-setting", setting: "topK" }),
            null != i &&
              y.push({
                type: "unsupported-setting",
                setting: "frequencyPenalty",
              }),
            null != u &&
              y.push({
                type: "unsupported-setting",
                setting: "presencePenalty",
              }),
            null != d &&
              y.push({ type: "unsupported-setting", setting: "stopSequences" }),
            null != c &&
              "json" === c.type &&
              null != c.schema &&
              y.push({
                type: "unsupported-setting",
                setting: "responseFormat",
                details: "JSON response format schema is not supported",
              });
          let b = {
            model: this.modelId,
            safe_prompt: this.settings.safePrompt,
            max_tokens: n,
            temperature: s,
            top_p: r,
            random_seed: p,
            response_format:
              (null == c ? void 0 : c.type) === "json"
                ? { type: "json_object" }
                : void 0,
            document_image_limit:
              null == (g = null == h ? void 0 : h.mistral)
                ? void 0
                : g.documentImageLimit,
            document_page_limit:
              null == (m = null == h ? void 0 : h.mistral)
                ? void 0
                : m.documentPageLimit,
            messages: (function (e) {
              let t = [];
              for (let n = 0; n < e.length; n++) {
                let { role: s, content: r } = e[n],
                  a = n === e.length - 1;
                switch (s) {
                  case "system":
                    t.push({ role: "system", content: r });
                    break;
                  case "user":
                    t.push({
                      role: "user",
                      content: r.map((e) => {
                        var t;
                        switch (e.type) {
                          case "text":
                            return { type: "text", text: e.text };
                          case "image":
                            return {
                              type: "image_url",
                              image_url:
                                e.image instanceof URL
                                  ? e.image.toString()
                                  : `data:${null != (t = e.mimeType) ? t : "image/jpeg"};base64,${(0, o.n_)(e.image)}`,
                            };
                          case "file":
                            if (!(e.data instanceof URL))
                              throw new l.b8({
                                functionality:
                                  "File content parts in user messages",
                              });
                            if ("application/pdf" === e.mimeType)
                              return {
                                type: "document_url",
                                document_url: e.data.toString(),
                              };
                            throw new l.b8({
                              functionality:
                                "Only PDF files are supported in user messages",
                            });
                        }
                      }),
                    });
                    break;
                  case "assistant": {
                    let e = "",
                      n = [];
                    for (let t of r)
                      switch (t.type) {
                        case "text":
                          e += t.text;
                          break;
                        case "tool-call":
                          n.push({
                            id: t.toolCallId,
                            type: "function",
                            function: {
                              name: t.toolName,
                              arguments: JSON.stringify(t.args),
                            },
                          });
                      }
                    t.push({
                      role: "assistant",
                      content: e,
                      prefix: !!a || void 0,
                      tool_calls: n.length > 0 ? n : void 0,
                    });
                    break;
                  }
                  case "tool":
                    for (let e of r)
                      t.push({
                        role: "tool",
                        name: e.toolName,
                        content: JSON.stringify(e.result),
                        tool_call_id: e.toolCallId,
                      });
                    break;
                  default:
                    throw Error(`Unsupported role: ${s}`);
                }
              }
              return t;
            })(t),
          };
          switch (f) {
            case "regular": {
              let {
                tools: t,
                tool_choice: n,
                toolWarnings: o,
              } = (function (e) {
                var t;
                let n = (null == (t = e.tools) ? void 0 : t.length)
                    ? e.tools
                    : void 0,
                  o = [];
                if (null == n)
                  return {
                    tools: void 0,
                    tool_choice: void 0,
                    toolWarnings: o,
                  };
                let s = [];
                for (let e of n)
                  "provider-defined" === e.type
                    ? o.push({ type: "unsupported-tool", tool: e })
                    : s.push({
                        type: "function",
                        function: {
                          name: e.name,
                          description: e.description,
                          parameters: e.parameters,
                        },
                      });
                let r = e.toolChoice;
                if (null == r)
                  return { tools: s, tool_choice: void 0, toolWarnings: o };
                let a = r.type;
                switch (a) {
                  case "auto":
                  case "none":
                    return { tools: s, tool_choice: a, toolWarnings: o };
                  case "required":
                    return { tools: s, tool_choice: "any", toolWarnings: o };
                  case "tool":
                    return {
                      tools: s.filter((e) => e.function.name === r.toolName),
                      tool_choice: "any",
                      toolWarnings: o,
                    };
                  default:
                    throw new l.b8({
                      functionality: `Unsupported tool choice type: ${a}`,
                    });
                }
              })(e);
              return {
                args: { ...b, tools: t, tool_choice: n },
                warnings: [...y, ...o],
              };
            }
            case "object-json":
              return {
                args: { ...b, response_format: { type: "json_object" } },
                warnings: y,
              };
            case "object-tool":
              return {
                args: {
                  ...b,
                  tool_choice: "any",
                  tools: [{ type: "function", function: e.tool }],
                },
                warnings: y,
              };
            default:
              throw Error(`Unsupported type: ${f}`);
          }
        }
        async doGenerate(e) {
          var t;
          let { args: n, warnings: s } = this.getArgs(e),
            {
              responseHeaders: l,
              value: a,
              rawValue: d,
            } = await (0, o.GU)({
              url: `${this.config.baseURL}/chat/completions`,
              headers: (0, o.m2)(this.config.headers(), e.headers),
              body: n,
              failedResponseHandler: i,
              successfulResponseHandler: (0, o.cV)(h),
              abortSignal: e.abortSignal,
              fetch: this.config.fetch,
            }),
            { messages: p, ...g } = n,
            m = a.choices[0],
            f = c(m.message.content),
            y = p[p.length - 1];
          return (
            "assistant" === y.role &&
              (null == f ? void 0 : f.startsWith(y.content)) &&
              (f = f.slice(y.content.length)),
            {
              text: f,
              toolCalls:
                null == (t = m.message.tool_calls)
                  ? void 0
                  : t.map((e) => ({
                      toolCallType: "function",
                      toolCallId: e.id,
                      toolName: e.function.name,
                      args: e.function.arguments,
                    })),
              finishReason: r(m.finish_reason),
              usage: {
                promptTokens: a.usage.prompt_tokens,
                completionTokens: a.usage.completion_tokens,
              },
              rawCall: { rawPrompt: p, rawSettings: g },
              rawResponse: { headers: l, body: d },
              request: { body: JSON.stringify(n) },
              response: u(a),
              warnings: s,
            }
          );
        }
        async doStream(e) {
          let { args: t, warnings: n } = this.getArgs(e),
            s = { ...t, stream: !0 },
            { responseHeaders: l, value: a } = await (0, o.GU)({
              url: `${this.config.baseURL}/chat/completions`,
              headers: (0, o.m2)(this.config.headers(), e.headers),
              body: s,
              failedResponseHandler: i,
              successfulResponseHandler: (0, o.Ds)(g),
              abortSignal: e.abortSignal,
              fetch: this.config.fetch,
            }),
            { messages: d, ...p } = t,
            h = "unknown",
            m = { promptTokens: Number.NaN, completionTokens: Number.NaN },
            f = 0,
            y = !1;
          return {
            stream: a.pipeThrough(
              new TransformStream({
                transform(e, t) {
                  if (!e.success)
                    return void t.enqueue({ type: "error", error: e.error });
                  f++;
                  let n = e.value;
                  1 === f && t.enqueue({ type: "response-metadata", ...u(n) }),
                    null != n.usage &&
                      (m = {
                        promptTokens: n.usage.prompt_tokens,
                        completionTokens: n.usage.completion_tokens,
                      });
                  let o = n.choices[0];
                  if (
                    ((null == o ? void 0 : o.finish_reason) != null &&
                      (h = r(o.finish_reason)),
                    (null == o ? void 0 : o.delta) == null)
                  )
                    return;
                  let s = o.delta,
                    l = c(s.content);
                  if (f <= 2) {
                    let e = d[d.length - 1];
                    if ("assistant" === e.role && l === e.content.trimEnd()) {
                      l.length < e.content.length && (y = !0);
                      return;
                    }
                  }
                  if (
                    (null != l &&
                      (t.enqueue({
                        type: "text-delta",
                        textDelta: y ? l.trimStart() : l,
                      }),
                      (y = !1)),
                    null != s.tool_calls)
                  )
                    for (let e of s.tool_calls)
                      t.enqueue({
                        type: "tool-call-delta",
                        toolCallType: "function",
                        toolCallId: e.id,
                        toolName: e.function.name,
                        argsTextDelta: e.function.arguments,
                      }),
                        t.enqueue({
                          type: "tool-call",
                          toolCallType: "function",
                          toolCallId: e.id,
                          toolName: e.function.name,
                          args: e.function.arguments,
                        });
                },
                flush(e) {
                  e.enqueue({ type: "finish", finishReason: h, usage: m });
                },
              }),
            ),
            rawCall: { rawPrompt: d, rawSettings: p },
            rawResponse: { headers: l },
            request: { body: JSON.stringify(s) },
            warnings: n,
          };
        }
      };
      function c(e) {
        if ("string" == typeof e) return e;
        if (null == e) return;
        let t = [];
        for (let n of e) {
          let { type: e } = n;
          switch (e) {
            case "text":
              t.push(n.text);
              break;
            case "image_url":
            case "reference":
              break;
            default:
              throw Error(`Unsupported type: ${e}`);
          }
        }
        return t.length ? t.join("") : void 0;
      }
      var p = s
          .KC([
            s.Yj(),
            s.YO(
              s.gM("type", [
                s.Ik({ type: s.eu("text"), text: s.Yj() }),
                s.Ik({
                  type: s.eu("image_url"),
                  image_url: s.KC([
                    s.Yj(),
                    s.Ik({ url: s.Yj(), detail: s.Yj().nullable() }),
                  ]),
                }),
                s.Ik({ type: s.eu("reference"), reference_ids: s.YO(s.ai()) }),
              ]),
            ),
          ])
          .nullish(),
        h = s.Ik({
          id: s.Yj().nullish(),
          created: s.ai().nullish(),
          model: s.Yj().nullish(),
          choices: s.YO(
            s.Ik({
              message: s.Ik({
                role: s.eu("assistant"),
                content: p,
                tool_calls: s
                  .YO(
                    s.Ik({
                      id: s.Yj(),
                      function: s.Ik({ name: s.Yj(), arguments: s.Yj() }),
                    }),
                  )
                  .nullish(),
              }),
              index: s.ai(),
              finish_reason: s.Yj().nullish(),
            }),
          ),
          object: s.eu("chat.completion"),
          usage: s.Ik({ prompt_tokens: s.ai(), completion_tokens: s.ai() }),
        }),
        g = s.Ik({
          id: s.Yj().nullish(),
          created: s.ai().nullish(),
          model: s.Yj().nullish(),
          choices: s.YO(
            s.Ik({
              delta: s.Ik({
                role: s.k5(["assistant"]).optional(),
                content: p,
                tool_calls: s
                  .YO(
                    s.Ik({
                      id: s.Yj(),
                      function: s.Ik({ name: s.Yj(), arguments: s.Yj() }),
                    }),
                  )
                  .nullish(),
              }),
              finish_reason: s.Yj().nullish(),
              index: s.ai(),
            }),
          ),
          usage: s
            .Ik({ prompt_tokens: s.ai(), completion_tokens: s.ai() })
            .nullish(),
        }),
        m = class {
          constructor(e, t, n) {
            (this.specificationVersion = "v1"),
              (this.modelId = e),
              (this.settings = t),
              (this.config = n);
          }
          get provider() {
            return this.config.provider;
          }
          get maxEmbeddingsPerCall() {
            var e;
            return null != (e = this.settings.maxEmbeddingsPerCall) ? e : 32;
          }
          get supportsParallelCalls() {
            var e;
            return null != (e = this.settings.supportsParallelCalls) && e;
          }
          async doEmbed({ values: e, abortSignal: t, headers: n }) {
            if (e.length > this.maxEmbeddingsPerCall)
              throw new l.Ch({
                provider: this.provider,
                modelId: this.modelId,
                maxEmbeddingsPerCall: this.maxEmbeddingsPerCall,
                values: e,
              });
            let { responseHeaders: s, value: r } = await (0, o.GU)({
              url: `${this.config.baseURL}/embeddings`,
              headers: (0, o.m2)(this.config.headers(), n),
              body: { model: this.modelId, input: e, encoding_format: "float" },
              failedResponseHandler: i,
              successfulResponseHandler: (0, o.cV)(f),
              abortSignal: t,
              fetch: this.config.fetch,
            });
            return {
              embeddings: r.data.map((e) => e.embedding),
              usage: r.usage ? { tokens: r.usage.prompt_tokens } : void 0,
              rawResponse: { headers: s },
            };
          }
        },
        f = s.Ik({
          data: s.YO(s.Ik({ embedding: s.YO(s.ai()) })),
          usage: s.Ik({ prompt_tokens: s.ai() }).nullish(),
        }),
        y = (function (e = {}) {
          var t;
          let n =
              null != (t = (0, o.ae)(e.baseURL))
                ? t
                : "https://api.mistral.ai/v1",
            s = () => ({
              Authorization: `Bearer ${(0, o.WL)({ apiKey: e.apiKey, environmentVariableName: "MISTRAL_API_KEY", description: "Mistral" })}`,
              ...e.headers,
            }),
            l = (t, o = {}) =>
              new d(t, o, {
                provider: "mistral.chat",
                baseURL: n,
                headers: s,
                fetch: e.fetch,
              }),
            r = (t, o = {}) =>
              new m(t, o, {
                provider: "mistral.embedding",
                baseURL: n,
                headers: s,
                fetch: e.fetch,
              }),
            a = function (e, t) {
              if (new.target)
                throw Error(
                  "The Mistral model function cannot be called with the new keyword.",
                );
              return l(e, t);
            };
          return (
            (a.languageModel = l),
            (a.chat = l),
            (a.embedding = r),
            (a.textEmbedding = r),
            (a.textEmbeddingModel = r),
            a
          );
        })();
    },
    29741: (e, t, n) => {
      n.d(t, { W: () => o });
      var o = (e) => {
        let t = {
            origin: "*",
            allowMethods: ["GET", "HEAD", "PUT", "POST", "DELETE", "PATCH"],
            allowHeaders: [],
            exposeHeaders: [],
            ...e,
          },
          n = ((e) => {
            if ("string" == typeof e)
              if ("*" === e) return () => e;
              else return (t) => (e === t ? t : null);
            return "function" == typeof e
              ? e
              : (t) => (e.includes(t) ? t : null);
          })(t.origin),
          o = ((e) =>
            "function" == typeof e ? e : Array.isArray(e) ? () => e : () => [])(
            t.allowMethods,
          );
        return async function (e, s) {
          function l(t, n) {
            e.res.headers.set(t, n);
          }
          let r = n(e.req.header("origin") || "", e);
          if ((r && l("Access-Control-Allow-Origin", r), "*" !== t.origin)) {
            let t = e.req.header("Vary");
            l("Vary", t || "Origin");
          }
          if (
            (t.credentials && l("Access-Control-Allow-Credentials", "true"),
            t.exposeHeaders?.length &&
              l("Access-Control-Expose-Headers", t.exposeHeaders.join(",")),
            "OPTIONS" === e.req.method)
          ) {
            null != t.maxAge &&
              l("Access-Control-Max-Age", t.maxAge.toString());
            let n = o(e.req.header("origin") || "", e);
            n.length && l("Access-Control-Allow-Methods", n.join(","));
            let s = t.allowHeaders;
            if (!s?.length) {
              let t = e.req.header("Access-Control-Request-Headers");
              t && (s = t.split(/\s*,\s*/));
            }
            return (
              s?.length &&
                (l("Access-Control-Allow-Headers", s.join(",")),
                e.res.headers.append("Vary", "Access-Control-Request-Headers")),
              e.res.headers.delete("Content-Length"),
              e.res.headers.delete("Content-Type"),
              new Response(null, {
                headers: e.res.headers,
                status: 204,
                statusText: "No Content",
              })
            );
          }
          await s();
        };
      };
    },
    29952: (e, t, n) => {
      n.d(t, { p: () => o });
      var o = (e) => (t) => e.fetch(t);
    },
  });
//# sourceMappingURL=2958.js.map
