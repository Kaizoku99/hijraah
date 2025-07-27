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
    (e._sentryDebugIds[t] = "a85ecc30-c6f5-4a5f-a545-892d6384815d"),
    (e._sentryDebugIdIdentifier =
      "sentry-dbid-a85ecc30-c6f5-4a5f-a545-892d6384815d"));
} catch (e) {}
("use strict");
(exports.id = 4170),
  (exports.ids = [4170]),
  (exports.modules = {
    84170: (e, t, o) => {
      o.d(t, { N: () => W, r: () => K });
      var n = o(14256),
        s = o(68098),
        l = o(58342);
      function i(e) {
        var t, o;
        return null !=
          (o =
            null == (t = null == e ? void 0 : e.content)
              ? void 0
              : t.map(({ token: e, logprob: t, top_logprobs: o }) => ({
                  token: e,
                  logprob: t,
                  topLogprobs: o
                    ? o.map(({ token: e, logprob: t }) => ({
                        token: e,
                        logprob: t,
                      }))
                    : [],
                })))
          ? o
          : void 0;
      }
      function a(e) {
        switch (e) {
          case "stop":
            return "stop";
          case "length":
            return "length";
          case "content_filter":
            return "content-filter";
          case "function_call":
          case "tool_calls":
            return "tool-calls";
          default:
            return "unknown";
        }
      }
      var r = l.Ik({
          error: l.Ik({
            message: l.Yj(),
            type: l.Yj().nullish(),
            param: l.bz().nullish(),
            code: l.KC([l.Yj(), l.ai()]).nullish(),
          }),
        }),
        u = (0, n.sl)({
          errorSchema: r,
          errorToMessage: (e) => e.error.message,
        });
      function p({ id: e, model: t, created: o }) {
        return {
          id: null != e ? e : void 0,
          modelId: null != t ? t : void 0,
          timestamp: null != o ? new Date(1e3 * o) : void 0,
        };
      }
      var d = class {
          constructor(e, t, o) {
            (this.specificationVersion = "v1"),
              (this.modelId = e),
              (this.settings = t),
              (this.config = o);
          }
          get supportsStructuredOutputs() {
            var e;
            return null != (e = this.settings.structuredOutputs)
              ? e
              : g(this.modelId);
          }
          get defaultObjectGenerationMode() {
            return this.modelId.startsWith("gpt-4o-audio-preview")
              ? "tool"
              : this.supportsStructuredOutputs
                ? "json"
                : "tool";
          }
          get provider() {
            return this.config.provider;
          }
          get supportsImageUrls() {
            return !this.settings.downloadImages;
          }
          getArgs({
            mode: e,
            prompt: t,
            maxTokens: o,
            temperature: l,
            topP: i,
            topK: a,
            frequencyPenalty: r,
            presencePenalty: u,
            stopSequences: p,
            responseFormat: d,
            seed: c,
            providerMetadata: m,
          }) {
            var h, y, _, v, k, b, w, I, j, x, Y;
            let C = e.type,
              T = [];
            null != a &&
              T.push({ type: "unsupported-setting", setting: "topK" }),
              (null == d ? void 0 : d.type) !== "json" ||
                null == d.schema ||
                this.supportsStructuredOutputs ||
                T.push({
                  type: "unsupported-setting",
                  setting: "responseFormat",
                  details:
                    "JSON response format schema is only supported with structuredOutputs",
                });
            let S = this.settings.useLegacyFunctionCalling;
            if (S && !0 === this.settings.parallelToolCalls)
              throw new s.b8({
                functionality:
                  "useLegacyFunctionCalling with parallelToolCalls",
              });
            if (S && this.supportsStructuredOutputs)
              throw new s.b8({
                functionality:
                  "structuredOutputs with useLegacyFunctionCalling",
              });
            let { messages: O, warnings: M } = (function ({
              prompt: e,
              useLegacyFunctionCalling: t = !1,
              systemMessageMode: o = "system",
            }) {
              let l = [],
                i = [];
              for (let { role: a, content: r } of e)
                switch (a) {
                  case "system":
                    switch (o) {
                      case "system":
                        l.push({ role: "system", content: r });
                        break;
                      case "developer":
                        l.push({ role: "developer", content: r });
                        break;
                      case "remove":
                        i.push({
                          type: "other",
                          message: "system messages are removed for this model",
                        });
                        break;
                      default:
                        throw Error(`Unsupported system message mode: ${o}`);
                    }
                    break;
                  case "user":
                    if (1 === r.length && "text" === r[0].type) {
                      l.push({ role: "user", content: r[0].text });
                      break;
                    }
                    l.push({
                      role: "user",
                      content: r.map((e, t) => {
                        var o, l, i, a;
                        switch (e.type) {
                          case "text":
                            return { type: "text", text: e.text };
                          case "image":
                            return {
                              type: "image_url",
                              image_url: {
                                url:
                                  e.image instanceof URL
                                    ? e.image.toString()
                                    : `data:${null != (o = e.mimeType) ? o : "image/jpeg"};base64,${(0, n.n_)(e.image)}`,
                                detail:
                                  null ==
                                  (i =
                                    null == (l = e.providerMetadata)
                                      ? void 0
                                      : l.openai)
                                    ? void 0
                                    : i.imageDetail,
                              },
                            };
                          case "file":
                            if (e.data instanceof URL)
                              throw new s.b8({
                                functionality:
                                  "'File content parts with URL data' functionality not supported.",
                              });
                            switch (e.mimeType) {
                              case "audio/wav":
                                return {
                                  type: "input_audio",
                                  input_audio: { data: e.data, format: "wav" },
                                };
                              case "audio/mp3":
                              case "audio/mpeg":
                                return {
                                  type: "input_audio",
                                  input_audio: { data: e.data, format: "mp3" },
                                };
                              case "application/pdf":
                                return {
                                  type: "file",
                                  file: {
                                    filename:
                                      null != (a = e.filename)
                                        ? a
                                        : `part-${t}.pdf`,
                                    file_data: `data:application/pdf;base64,${e.data}`,
                                  },
                                };
                              default:
                                throw new s.b8({
                                  functionality: `File content part type ${e.mimeType} in user messages`,
                                });
                            }
                        }
                      }),
                    });
                    break;
                  case "assistant": {
                    let e = "",
                      o = [];
                    for (let t of r)
                      switch (t.type) {
                        case "text":
                          e += t.text;
                          break;
                        case "tool-call":
                          o.push({
                            id: t.toolCallId,
                            type: "function",
                            function: {
                              name: t.toolName,
                              arguments: JSON.stringify(t.args),
                            },
                          });
                      }
                    if (t) {
                      if (o.length > 1)
                        throw new s.b8({
                          functionality:
                            "useLegacyFunctionCalling with multiple tool calls in one message",
                        });
                      l.push({
                        role: "assistant",
                        content: e,
                        function_call: o.length > 0 ? o[0].function : void 0,
                      });
                    } else
                      l.push({
                        role: "assistant",
                        content: e,
                        tool_calls: o.length > 0 ? o : void 0,
                      });
                    break;
                  }
                  case "tool":
                    for (let e of r)
                      t
                        ? l.push({
                            role: "function",
                            name: e.toolName,
                            content: JSON.stringify(e.result),
                          })
                        : l.push({
                            role: "tool",
                            tool_call_id: e.toolCallId,
                            content: JSON.stringify(e.result),
                          });
                    break;
                  default:
                    throw Error(`Unsupported role: ${a}`);
                }
              return { messages: l, warnings: i };
            })({
              prompt: t,
              useLegacyFunctionCalling: S,
              systemMessageMode: g((j = this.modelId))
                ? null !=
                  (Y = null == (x = f[j]) ? void 0 : x.systemMessageMode)
                  ? Y
                  : "developer"
                : "system",
            });
            T.push(...M);
            let $ = {
              model: this.modelId,
              logit_bias: this.settings.logitBias,
              logprobs:
                !0 === this.settings.logprobs ||
                "number" == typeof this.settings.logprobs ||
                void 0,
              top_logprobs:
                "number" == typeof this.settings.logprobs
                  ? this.settings.logprobs
                  : "boolean" == typeof this.settings.logprobs &&
                      this.settings.logprobs
                    ? 0
                    : void 0,
              user: this.settings.user,
              parallel_tool_calls: this.settings.parallelToolCalls,
              max_tokens: o,
              temperature: l,
              top_p: i,
              frequency_penalty: r,
              presence_penalty: u,
              response_format:
                (null == d ? void 0 : d.type) === "json"
                  ? this.supportsStructuredOutputs && null != d.schema
                    ? {
                        type: "json_schema",
                        json_schema: {
                          schema: d.schema,
                          strict: !0,
                          name: null != (h = d.name) ? h : "response",
                          description: d.description,
                        },
                      }
                    : { type: "json_object" }
                  : void 0,
              stop: p,
              seed: c,
              max_completion_tokens:
                null == (y = null == m ? void 0 : m.openai)
                  ? void 0
                  : y.maxCompletionTokens,
              store:
                null == (_ = null == m ? void 0 : m.openai) ? void 0 : _.store,
              metadata:
                null == (v = null == m ? void 0 : m.openai)
                  ? void 0
                  : v.metadata,
              prediction:
                null == (k = null == m ? void 0 : m.openai)
                  ? void 0
                  : k.prediction,
              reasoning_effort:
                null !=
                (w =
                  null == (b = null == m ? void 0 : m.openai)
                    ? void 0
                    : b.reasoningEffort)
                  ? w
                  : this.settings.reasoningEffort,
              messages: O,
            };
            switch (
              (g(this.modelId)
                ? (null != $.temperature &&
                    (($.temperature = void 0),
                    T.push({
                      type: "unsupported-setting",
                      setting: "temperature",
                      details:
                        "temperature is not supported for reasoning models",
                    })),
                  null != $.top_p &&
                    (($.top_p = void 0),
                    T.push({
                      type: "unsupported-setting",
                      setting: "topP",
                      details: "topP is not supported for reasoning models",
                    })),
                  null != $.frequency_penalty &&
                    (($.frequency_penalty = void 0),
                    T.push({
                      type: "unsupported-setting",
                      setting: "frequencyPenalty",
                      details:
                        "frequencyPenalty is not supported for reasoning models",
                    })),
                  null != $.presence_penalty &&
                    (($.presence_penalty = void 0),
                    T.push({
                      type: "unsupported-setting",
                      setting: "presencePenalty",
                      details:
                        "presencePenalty is not supported for reasoning models",
                    })),
                  null != $.logit_bias &&
                    (($.logit_bias = void 0),
                    T.push({
                      type: "other",
                      message:
                        "logitBias is not supported for reasoning models",
                    })),
                  null != $.logprobs &&
                    (($.logprobs = void 0),
                    T.push({
                      type: "other",
                      message: "logprobs is not supported for reasoning models",
                    })),
                  null != $.top_logprobs &&
                    (($.top_logprobs = void 0),
                    T.push({
                      type: "other",
                      message:
                        "topLogprobs is not supported for reasoning models",
                    })),
                  null != $.max_tokens &&
                    (null == $.max_completion_tokens &&
                      ($.max_completion_tokens = $.max_tokens),
                    ($.max_tokens = void 0)))
                : (this.modelId.startsWith("gpt-4o-search-preview") ||
                    this.modelId.startsWith("gpt-4o-mini-search-preview")) &&
                  null != $.temperature &&
                  (($.temperature = void 0),
                  T.push({
                    type: "unsupported-setting",
                    setting: "temperature",
                    details:
                      "temperature is not supported for the search preview models and has been removed.",
                  })),
              C)
            ) {
              case "regular": {
                let {
                  tools: t,
                  tool_choice: o,
                  functions: n,
                  function_call: l,
                  toolWarnings: i,
                } = (function ({
                  mode: e,
                  useLegacyFunctionCalling: t = !1,
                  structuredOutputs: o,
                }) {
                  var n;
                  let l = (null == (n = e.tools) ? void 0 : n.length)
                      ? e.tools
                      : void 0,
                    i = [];
                  if (null == l)
                    return {
                      tools: void 0,
                      tool_choice: void 0,
                      toolWarnings: i,
                    };
                  let a = e.toolChoice;
                  if (t) {
                    let e = [];
                    for (let t of l)
                      "provider-defined" === t.type
                        ? i.push({ type: "unsupported-tool", tool: t })
                        : e.push({
                            name: t.name,
                            description: t.description,
                            parameters: t.parameters,
                          });
                    if (null == a)
                      return {
                        functions: e,
                        function_call: void 0,
                        toolWarnings: i,
                      };
                    switch (a.type) {
                      case "auto":
                      case "none":
                      case void 0:
                        return {
                          functions: e,
                          function_call: void 0,
                          toolWarnings: i,
                        };
                      case "required":
                        throw new s.b8({
                          functionality:
                            "useLegacyFunctionCalling and toolChoice: required",
                        });
                      default:
                        return {
                          functions: e,
                          function_call: { name: a.toolName },
                          toolWarnings: i,
                        };
                    }
                  }
                  let r = [];
                  for (let e of l)
                    "provider-defined" === e.type
                      ? i.push({ type: "unsupported-tool", tool: e })
                      : r.push({
                          type: "function",
                          function: {
                            name: e.name,
                            description: e.description,
                            parameters: e.parameters,
                            strict: !!o || void 0,
                          },
                        });
                  if (null == a)
                    return { tools: r, tool_choice: void 0, toolWarnings: i };
                  let u = a.type;
                  switch (u) {
                    case "auto":
                    case "none":
                    case "required":
                      return { tools: r, tool_choice: u, toolWarnings: i };
                    case "tool":
                      return {
                        tools: r,
                        tool_choice: {
                          type: "function",
                          function: { name: a.toolName },
                        },
                        toolWarnings: i,
                      };
                    default:
                      throw new s.b8({
                        functionality: `Unsupported tool choice type: ${u}`,
                      });
                  }
                })({
                  mode: e,
                  useLegacyFunctionCalling: S,
                  structuredOutputs: this.supportsStructuredOutputs,
                });
                return {
                  args: {
                    ...$,
                    tools: t,
                    tool_choice: o,
                    functions: n,
                    function_call: l,
                  },
                  warnings: [...T, ...i],
                };
              }
              case "object-json":
                return {
                  args: {
                    ...$,
                    response_format:
                      this.supportsStructuredOutputs && null != e.schema
                        ? {
                            type: "json_schema",
                            json_schema: {
                              schema: e.schema,
                              strict: !0,
                              name: null != (I = e.name) ? I : "response",
                              description: e.description,
                            },
                          }
                        : { type: "json_object" },
                  },
                  warnings: T,
                };
              case "object-tool":
                return {
                  args: S
                    ? {
                        ...$,
                        function_call: { name: e.tool.name },
                        functions: [
                          {
                            name: e.tool.name,
                            description: e.tool.description,
                            parameters: e.tool.parameters,
                          },
                        ],
                      }
                    : {
                        ...$,
                        tool_choice: {
                          type: "function",
                          function: { name: e.tool.name },
                        },
                        tools: [
                          {
                            type: "function",
                            function: {
                              name: e.tool.name,
                              description: e.tool.description,
                              parameters: e.tool.parameters,
                              strict:
                                !!this.supportsStructuredOutputs || void 0,
                            },
                          },
                        ],
                      },
                  warnings: T,
                };
              default:
                throw Error(`Unsupported type: ${C}`);
            }
          }
          async doGenerate(e) {
            var t, o, s, l, r, d, c, h;
            let { args: g, warnings: f } = this.getArgs(e),
              {
                responseHeaders: y,
                value: _,
                rawValue: v,
              } = await (0, n.GU)({
                url: this.config.url({
                  path: "/chat/completions",
                  modelId: this.modelId,
                }),
                headers: (0, n.m2)(this.config.headers(), e.headers),
                body: g,
                failedResponseHandler: u,
                successfulResponseHandler: (0, n.cV)(m),
                abortSignal: e.abortSignal,
                fetch: this.config.fetch,
              }),
              { messages: k, ...b } = g,
              w = _.choices[0],
              I = null == (t = _.usage) ? void 0 : t.completion_tokens_details,
              j = null == (o = _.usage) ? void 0 : o.prompt_tokens_details,
              x = { openai: {} };
            return (
              (null == I ? void 0 : I.reasoning_tokens) != null &&
                (x.openai.reasoningTokens =
                  null == I ? void 0 : I.reasoning_tokens),
              (null == I ? void 0 : I.accepted_prediction_tokens) != null &&
                (x.openai.acceptedPredictionTokens =
                  null == I ? void 0 : I.accepted_prediction_tokens),
              (null == I ? void 0 : I.rejected_prediction_tokens) != null &&
                (x.openai.rejectedPredictionTokens =
                  null == I ? void 0 : I.rejected_prediction_tokens),
              (null == j ? void 0 : j.cached_tokens) != null &&
                (x.openai.cachedPromptTokens =
                  null == j ? void 0 : j.cached_tokens),
              {
                text: null != (s = w.message.content) ? s : void 0,
                toolCalls:
                  this.settings.useLegacyFunctionCalling &&
                  w.message.function_call
                    ? [
                        {
                          toolCallType: "function",
                          toolCallId: (0, n.$C)(),
                          toolName: w.message.function_call.name,
                          args: w.message.function_call.arguments,
                        },
                      ]
                    : null == (l = w.message.tool_calls)
                      ? void 0
                      : l.map((e) => {
                          var t;
                          return {
                            toolCallType: "function",
                            toolCallId: null != (t = e.id) ? t : (0, n.$C)(),
                            toolName: e.function.name,
                            args: e.function.arguments,
                          };
                        }),
                finishReason: a(w.finish_reason),
                usage: {
                  promptTokens:
                    null !=
                    (d = null == (r = _.usage) ? void 0 : r.prompt_tokens)
                      ? d
                      : NaN,
                  completionTokens:
                    null !=
                    (h = null == (c = _.usage) ? void 0 : c.completion_tokens)
                      ? h
                      : NaN,
                },
                rawCall: { rawPrompt: k, rawSettings: b },
                rawResponse: { headers: y, body: v },
                request: { body: JSON.stringify(g) },
                response: p(_),
                warnings: f,
                logprobs: i(w.logprobs),
                providerMetadata: x,
              }
            );
          }
          async doStream(e) {
            let t;
            if (this.settings.simulateStreaming) {
              let t = await this.doGenerate(e);
              return {
                stream: new ReadableStream({
                  start(e) {
                    if (
                      (e.enqueue({ type: "response-metadata", ...t.response }),
                      t.text &&
                        e.enqueue({ type: "text-delta", textDelta: t.text }),
                      t.toolCalls)
                    )
                      for (let o of t.toolCalls)
                        e.enqueue({
                          type: "tool-call-delta",
                          toolCallType: "function",
                          toolCallId: o.toolCallId,
                          toolName: o.toolName,
                          argsTextDelta: o.args,
                        }),
                          e.enqueue({ type: "tool-call", ...o });
                    e.enqueue({
                      type: "finish",
                      finishReason: t.finishReason,
                      usage: t.usage,
                      logprobs: t.logprobs,
                      providerMetadata: t.providerMetadata,
                    }),
                      e.close();
                  },
                }),
                rawCall: t.rawCall,
                rawResponse: t.rawResponse,
                warnings: t.warnings,
              };
            }
            let { args: o, warnings: l } = this.getArgs(e),
              r = {
                ...o,
                stream: !0,
                stream_options:
                  "strict" === this.config.compatibility
                    ? { include_usage: !0 }
                    : void 0,
              },
              { responseHeaders: d, value: c } = await (0, n.GU)({
                url: this.config.url({
                  path: "/chat/completions",
                  modelId: this.modelId,
                }),
                headers: (0, n.m2)(this.config.headers(), e.headers),
                body: r,
                failedResponseHandler: u,
                successfulResponseHandler: (0, n.Ds)(h),
                abortSignal: e.abortSignal,
                fetch: this.config.fetch,
              }),
              { messages: m, ...g } = o,
              f = [],
              y = "unknown",
              _ = { promptTokens: void 0, completionTokens: void 0 },
              v = !0,
              { useLegacyFunctionCalling: k } = this.settings,
              b = { openai: {} };
            return {
              stream: c.pipeThrough(
                new TransformStream({
                  transform(e, o) {
                    var l, r, u, d, c, m, h, g, w, I, j, x;
                    if (!e.success) {
                      (y = "error"),
                        o.enqueue({ type: "error", error: e.error });
                      return;
                    }
                    let Y = e.value;
                    if ("error" in Y) {
                      (y = "error"),
                        o.enqueue({ type: "error", error: Y.error });
                      return;
                    }
                    if (
                      (v &&
                        ((v = !1),
                        o.enqueue({ type: "response-metadata", ...p(Y) })),
                      null != Y.usage)
                    ) {
                      let {
                        prompt_tokens: e,
                        completion_tokens: t,
                        prompt_tokens_details: o,
                        completion_tokens_details: n,
                      } = Y.usage;
                      (_ = {
                        promptTokens: null != e ? e : void 0,
                        completionTokens: null != t ? t : void 0,
                      }),
                        (null == n ? void 0 : n.reasoning_tokens) != null &&
                          (b.openai.reasoningTokens =
                            null == n ? void 0 : n.reasoning_tokens),
                        (null == n ? void 0 : n.accepted_prediction_tokens) !=
                          null &&
                          (b.openai.acceptedPredictionTokens =
                            null == n ? void 0 : n.accepted_prediction_tokens),
                        (null == n ? void 0 : n.rejected_prediction_tokens) !=
                          null &&
                          (b.openai.rejectedPredictionTokens =
                            null == n ? void 0 : n.rejected_prediction_tokens),
                        (null == o ? void 0 : o.cached_tokens) != null &&
                          (b.openai.cachedPromptTokens =
                            null == o ? void 0 : o.cached_tokens);
                    }
                    let C = Y.choices[0];
                    if (
                      ((null == C ? void 0 : C.finish_reason) != null &&
                        (y = a(C.finish_reason)),
                      (null == C ? void 0 : C.delta) == null)
                    )
                      return;
                    let T = C.delta;
                    null != T.content &&
                      o.enqueue({ type: "text-delta", textDelta: T.content });
                    let S = i(null == C ? void 0 : C.logprobs);
                    (null == S ? void 0 : S.length) &&
                      (void 0 === t && (t = []), t.push(...S));
                    let O =
                      k && null != T.function_call
                        ? [
                            {
                              type: "function",
                              id: (0, n.$C)(),
                              function: T.function_call,
                              index: 0,
                            },
                          ]
                        : T.tool_calls;
                    if (null != O)
                      for (let e of O) {
                        let t = e.index;
                        if (null == f[t]) {
                          if ("function" !== e.type)
                            throw new s.xn({
                              data: e,
                              message: "Expected 'function' type.",
                            });
                          if (null == e.id)
                            throw new s.xn({
                              data: e,
                              message: "Expected 'id' to be a string.",
                            });
                          if (
                            (null == (l = e.function) ? void 0 : l.name) == null
                          )
                            throw new s.xn({
                              data: e,
                              message:
                                "Expected 'function.name' to be a string.",
                            });
                          f[t] = {
                            id: e.id,
                            type: "function",
                            function: {
                              name: e.function.name,
                              arguments:
                                null != (r = e.function.arguments) ? r : "",
                            },
                            hasFinished: !1,
                          };
                          let i = f[t];
                          (null == (u = i.function) ? void 0 : u.name) !=
                            null &&
                            (null == (d = i.function) ? void 0 : d.arguments) !=
                              null &&
                            (i.function.arguments.length > 0 &&
                              o.enqueue({
                                type: "tool-call-delta",
                                toolCallType: "function",
                                toolCallId: i.id,
                                toolName: i.function.name,
                                argsTextDelta: i.function.arguments,
                              }),
                            (0, n.v0)(i.function.arguments) &&
                              (o.enqueue({
                                type: "tool-call",
                                toolCallType: "function",
                                toolCallId:
                                  null != (c = i.id) ? c : (0, n.$C)(),
                                toolName: i.function.name,
                                args: i.function.arguments,
                              }),
                              (i.hasFinished = !0)));
                          continue;
                        }
                        let i = f[t];
                        !i.hasFinished &&
                          ((null == (m = e.function) ? void 0 : m.arguments) !=
                            null &&
                            (i.function.arguments +=
                              null !=
                              (g =
                                null == (h = e.function) ? void 0 : h.arguments)
                                ? g
                                : ""),
                          o.enqueue({
                            type: "tool-call-delta",
                            toolCallType: "function",
                            toolCallId: i.id,
                            toolName: i.function.name,
                            argsTextDelta:
                              null != (w = e.function.arguments) ? w : "",
                          }),
                          (null == (I = i.function) ? void 0 : I.name) !=
                            null &&
                            (null == (j = i.function) ? void 0 : j.arguments) !=
                              null &&
                            (0, n.v0)(i.function.arguments) &&
                            (o.enqueue({
                              type: "tool-call",
                              toolCallType: "function",
                              toolCallId: null != (x = i.id) ? x : (0, n.$C)(),
                              toolName: i.function.name,
                              args: i.function.arguments,
                            }),
                            (i.hasFinished = !0)));
                      }
                  },
                  flush(e) {
                    var o, n;
                    e.enqueue({
                      type: "finish",
                      finishReason: y,
                      logprobs: t,
                      usage: {
                        promptTokens: null != (o = _.promptTokens) ? o : NaN,
                        completionTokens:
                          null != (n = _.completionTokens) ? n : NaN,
                      },
                      ...(null != b ? { providerMetadata: b } : {}),
                    });
                  },
                }),
              ),
              rawCall: { rawPrompt: m, rawSettings: g },
              rawResponse: { headers: d },
              request: { body: JSON.stringify(r) },
              warnings: l,
            };
          }
        },
        c = l
          .Ik({
            prompt_tokens: l.ai().nullish(),
            completion_tokens: l.ai().nullish(),
            prompt_tokens_details: l
              .Ik({ cached_tokens: l.ai().nullish() })
              .nullish(),
            completion_tokens_details: l
              .Ik({
                reasoning_tokens: l.ai().nullish(),
                accepted_prediction_tokens: l.ai().nullish(),
                rejected_prediction_tokens: l.ai().nullish(),
              })
              .nullish(),
          })
          .nullish(),
        m = l.Ik({
          id: l.Yj().nullish(),
          created: l.ai().nullish(),
          model: l.Yj().nullish(),
          choices: l.YO(
            l.Ik({
              message: l.Ik({
                role: l.eu("assistant").nullish(),
                content: l.Yj().nullish(),
                function_call: l
                  .Ik({ arguments: l.Yj(), name: l.Yj() })
                  .nullish(),
                tool_calls: l
                  .YO(
                    l.Ik({
                      id: l.Yj().nullish(),
                      type: l.eu("function"),
                      function: l.Ik({ name: l.Yj(), arguments: l.Yj() }),
                    }),
                  )
                  .nullish(),
              }),
              index: l.ai(),
              logprobs: l
                .Ik({
                  content: l
                    .YO(
                      l.Ik({
                        token: l.Yj(),
                        logprob: l.ai(),
                        top_logprobs: l.YO(
                          l.Ik({ token: l.Yj(), logprob: l.ai() }),
                        ),
                      }),
                    )
                    .nullable(),
                })
                .nullish(),
              finish_reason: l.Yj().nullish(),
            }),
          ),
          usage: c,
        }),
        h = l.KC([
          l.Ik({
            id: l.Yj().nullish(),
            created: l.ai().nullish(),
            model: l.Yj().nullish(),
            choices: l.YO(
              l.Ik({
                delta: l
                  .Ik({
                    role: l.k5(["assistant"]).nullish(),
                    content: l.Yj().nullish(),
                    function_call: l
                      .Ik({
                        name: l.Yj().optional(),
                        arguments: l.Yj().optional(),
                      })
                      .nullish(),
                    tool_calls: l
                      .YO(
                        l.Ik({
                          index: l.ai(),
                          id: l.Yj().nullish(),
                          type: l.eu("function").nullish(),
                          function: l.Ik({
                            name: l.Yj().nullish(),
                            arguments: l.Yj().nullish(),
                          }),
                        }),
                      )
                      .nullish(),
                  })
                  .nullish(),
                logprobs: l
                  .Ik({
                    content: l
                      .YO(
                        l.Ik({
                          token: l.Yj(),
                          logprob: l.ai(),
                          top_logprobs: l.YO(
                            l.Ik({ token: l.Yj(), logprob: l.ai() }),
                          ),
                        }),
                      )
                      .nullable(),
                  })
                  .nullish(),
                finish_reason: l.Yj().nullish(),
                index: l.ai(),
              }),
            ),
            usage: c,
          }),
          r,
        ]);
      function g(e) {
        return e.startsWith("o");
      }
      var f = {
        "o1-mini": { systemMessageMode: "remove" },
        "o1-mini-2024-09-12": { systemMessageMode: "remove" },
        "o1-preview": { systemMessageMode: "remove" },
        "o1-preview-2024-09-12": { systemMessageMode: "remove" },
        o3: { systemMessageMode: "developer" },
        "o3-2025-04-16": { systemMessageMode: "developer" },
        "o3-mini": { systemMessageMode: "developer" },
        "o3-mini-2025-01-31": { systemMessageMode: "developer" },
        "o4-mini": { systemMessageMode: "developer" },
        "o4-mini-2025-04-16": { systemMessageMode: "developer" },
      };
      function y(e) {
        return null == e
          ? void 0
          : e.tokens.map((t, o) => ({
              token: t,
              logprob: e.token_logprobs[o],
              topLogprobs: e.top_logprobs
                ? Object.entries(e.top_logprobs[o]).map(([e, t]) => ({
                    token: e,
                    logprob: t,
                  }))
                : [],
            }));
      }
      var _ = class {
          constructor(e, t, o) {
            (this.specificationVersion = "v1"),
              (this.defaultObjectGenerationMode = void 0),
              (this.modelId = e),
              (this.settings = t),
              (this.config = o);
          }
          get provider() {
            return this.config.provider;
          }
          getArgs({
            mode: e,
            inputFormat: t,
            prompt: o,
            maxTokens: n,
            temperature: l,
            topP: i,
            topK: a,
            frequencyPenalty: r,
            presencePenalty: u,
            stopSequences: p,
            responseFormat: d,
            seed: c,
          }) {
            var m;
            let h = e.type,
              g = [];
            null != a &&
              g.push({ type: "unsupported-setting", setting: "topK" }),
              null != d &&
                "text" !== d.type &&
                g.push({
                  type: "unsupported-setting",
                  setting: "responseFormat",
                  details: "JSON response format is not supported.",
                });
            let { prompt: f, stopSequences: y } = (function ({
                prompt: e,
                inputFormat: t,
                user: o = "user",
                assistant: n = "assistant",
              }) {
                if (
                  "prompt" === t &&
                  1 === e.length &&
                  "user" === e[0].role &&
                  1 === e[0].content.length &&
                  "text" === e[0].content[0].type
                )
                  return { prompt: e[0].content[0].text };
                let l = "";
                for (let { role: t, content: i } of ("system" === e[0].role &&
                  ((l += `${e[0].content}

`),
                  (e = e.slice(1))),
                e))
                  switch (t) {
                    case "system":
                      throw new s.M3({
                        message:
                          "Unexpected system message in prompt: ${content}",
                        prompt: e,
                      });
                    case "user": {
                      let e = i
                        .map((e) => {
                          switch (e.type) {
                            case "text":
                              return e.text;
                            case "image":
                              throw new s.b8({ functionality: "images" });
                          }
                        })
                        .join("");
                      l += `${o}:
${e}

`;
                      break;
                    }
                    case "assistant": {
                      let e = i
                        .map((e) => {
                          switch (e.type) {
                            case "text":
                              return e.text;
                            case "tool-call":
                              throw new s.b8({
                                functionality: "tool-call messages",
                              });
                          }
                        })
                        .join("");
                      l += `${n}:
${e}

`;
                      break;
                    }
                    case "tool":
                      throw new s.b8({ functionality: "tool messages" });
                    default:
                      throw Error(`Unsupported role: ${t}`);
                  }
                return {
                  prompt: (l += `${n}:
`),
                  stopSequences: [
                    `
${o}:`,
                  ],
                };
              })({ prompt: o, inputFormat: t }),
              _ = [...(null != y ? y : []), ...(null != p ? p : [])],
              v = {
                model: this.modelId,
                echo: this.settings.echo,
                logit_bias: this.settings.logitBias,
                logprobs:
                  "number" == typeof this.settings.logprobs
                    ? this.settings.logprobs
                    : "boolean" == typeof this.settings.logprobs &&
                        this.settings.logprobs
                      ? 0
                      : void 0,
                suffix: this.settings.suffix,
                user: this.settings.user,
                max_tokens: n,
                temperature: l,
                top_p: i,
                frequency_penalty: r,
                presence_penalty: u,
                seed: c,
                prompt: f,
                stop: _.length > 0 ? _ : void 0,
              };
            switch (h) {
              case "regular":
                if (null == (m = e.tools) ? void 0 : m.length)
                  throw new s.b8({ functionality: "tools" });
                if (e.toolChoice)
                  throw new s.b8({ functionality: "toolChoice" });
                return { args: v, warnings: g };
              case "object-json":
                throw new s.b8({ functionality: "object-json mode" });
              case "object-tool":
                throw new s.b8({ functionality: "object-tool mode" });
              default:
                throw Error(`Unsupported type: ${h}`);
            }
          }
          async doGenerate(e) {
            let { args: t, warnings: o } = this.getArgs(e),
              {
                responseHeaders: s,
                value: l,
                rawValue: i,
              } = await (0, n.GU)({
                url: this.config.url({
                  path: "/completions",
                  modelId: this.modelId,
                }),
                headers: (0, n.m2)(this.config.headers(), e.headers),
                body: t,
                failedResponseHandler: u,
                successfulResponseHandler: (0, n.cV)(v),
                abortSignal: e.abortSignal,
                fetch: this.config.fetch,
              }),
              { prompt: r, ...d } = t,
              c = l.choices[0];
            return {
              text: c.text,
              usage: {
                promptTokens: l.usage.prompt_tokens,
                completionTokens: l.usage.completion_tokens,
              },
              finishReason: a(c.finish_reason),
              logprobs: y(c.logprobs),
              rawCall: { rawPrompt: r, rawSettings: d },
              rawResponse: { headers: s, body: i },
              response: p(l),
              warnings: o,
              request: { body: JSON.stringify(t) },
            };
          }
          async doStream(e) {
            let t,
              { args: o, warnings: s } = this.getArgs(e),
              l = {
                ...o,
                stream: !0,
                stream_options:
                  "strict" === this.config.compatibility
                    ? { include_usage: !0 }
                    : void 0,
              },
              { responseHeaders: i, value: r } = await (0, n.GU)({
                url: this.config.url({
                  path: "/completions",
                  modelId: this.modelId,
                }),
                headers: (0, n.m2)(this.config.headers(), e.headers),
                body: l,
                failedResponseHandler: u,
                successfulResponseHandler: (0, n.Ds)(k),
                abortSignal: e.abortSignal,
                fetch: this.config.fetch,
              }),
              { prompt: d, ...c } = o,
              m = "unknown",
              h = { promptTokens: Number.NaN, completionTokens: Number.NaN },
              g = !0;
            return {
              stream: r.pipeThrough(
                new TransformStream({
                  transform(e, o) {
                    if (!e.success) {
                      (m = "error"),
                        o.enqueue({ type: "error", error: e.error });
                      return;
                    }
                    let n = e.value;
                    if ("error" in n) {
                      (m = "error"),
                        o.enqueue({ type: "error", error: n.error });
                      return;
                    }
                    g &&
                      ((g = !1),
                      o.enqueue({ type: "response-metadata", ...p(n) })),
                      null != n.usage &&
                        (h = {
                          promptTokens: n.usage.prompt_tokens,
                          completionTokens: n.usage.completion_tokens,
                        });
                    let s = n.choices[0];
                    (null == s ? void 0 : s.finish_reason) != null &&
                      (m = a(s.finish_reason)),
                      (null == s ? void 0 : s.text) != null &&
                        o.enqueue({ type: "text-delta", textDelta: s.text });
                    let l = y(null == s ? void 0 : s.logprobs);
                    (null == l ? void 0 : l.length) &&
                      (void 0 === t && (t = []), t.push(...l));
                  },
                  flush(e) {
                    e.enqueue({
                      type: "finish",
                      finishReason: m,
                      logprobs: t,
                      usage: h,
                    });
                  },
                }),
              ),
              rawCall: { rawPrompt: d, rawSettings: c },
              rawResponse: { headers: i },
              warnings: s,
              request: { body: JSON.stringify(l) },
            };
          }
        },
        v = l.Ik({
          id: l.Yj().nullish(),
          created: l.ai().nullish(),
          model: l.Yj().nullish(),
          choices: l.YO(
            l.Ik({
              text: l.Yj(),
              finish_reason: l.Yj(),
              logprobs: l
                .Ik({
                  tokens: l.YO(l.Yj()),
                  token_logprobs: l.YO(l.ai()),
                  top_logprobs: l.YO(l.g1(l.Yj(), l.ai())).nullable(),
                })
                .nullish(),
            }),
          ),
          usage: l.Ik({ prompt_tokens: l.ai(), completion_tokens: l.ai() }),
        }),
        k = l.KC([
          l.Ik({
            id: l.Yj().nullish(),
            created: l.ai().nullish(),
            model: l.Yj().nullish(),
            choices: l.YO(
              l.Ik({
                text: l.Yj(),
                finish_reason: l.Yj().nullish(),
                index: l.ai(),
                logprobs: l
                  .Ik({
                    tokens: l.YO(l.Yj()),
                    token_logprobs: l.YO(l.ai()),
                    top_logprobs: l.YO(l.g1(l.Yj(), l.ai())).nullable(),
                  })
                  .nullish(),
              }),
            ),
            usage: l
              .Ik({ prompt_tokens: l.ai(), completion_tokens: l.ai() })
              .nullish(),
          }),
          r,
        ]),
        b = class {
          constructor(e, t, o) {
            (this.specificationVersion = "v1"),
              (this.modelId = e),
              (this.settings = t),
              (this.config = o);
          }
          get provider() {
            return this.config.provider;
          }
          get maxEmbeddingsPerCall() {
            var e;
            return null != (e = this.settings.maxEmbeddingsPerCall) ? e : 2048;
          }
          get supportsParallelCalls() {
            var e;
            return null == (e = this.settings.supportsParallelCalls) || e;
          }
          async doEmbed({ values: e, headers: t, abortSignal: o }) {
            if (e.length > this.maxEmbeddingsPerCall)
              throw new s.Ch({
                provider: this.provider,
                modelId: this.modelId,
                maxEmbeddingsPerCall: this.maxEmbeddingsPerCall,
                values: e,
              });
            let { responseHeaders: l, value: i } = await (0, n.GU)({
              url: this.config.url({
                path: "/embeddings",
                modelId: this.modelId,
              }),
              headers: (0, n.m2)(this.config.headers(), t),
              body: {
                model: this.modelId,
                input: e,
                encoding_format: "float",
                dimensions: this.settings.dimensions,
                user: this.settings.user,
              },
              failedResponseHandler: u,
              successfulResponseHandler: (0, n.cV)(w),
              abortSignal: o,
              fetch: this.config.fetch,
            });
            return {
              embeddings: i.data.map((e) => e.embedding),
              usage: i.usage ? { tokens: i.usage.prompt_tokens } : void 0,
              rawResponse: { headers: l },
            };
          }
        },
        w = l.Ik({
          data: l.YO(l.Ik({ embedding: l.YO(l.ai()) })),
          usage: l.Ik({ prompt_tokens: l.ai() }).nullish(),
        }),
        I = { "dall-e-3": 1, "dall-e-2": 10, "gpt-image-1": 10 },
        j = new Set(["gpt-image-1"]),
        x = class {
          constructor(e, t, o) {
            (this.modelId = e),
              (this.settings = t),
              (this.config = o),
              (this.specificationVersion = "v1");
          }
          get maxImagesPerCall() {
            var e, t;
            return null !=
              (t =
                null != (e = this.settings.maxImagesPerCall)
                  ? e
                  : I[this.modelId])
              ? t
              : 1;
          }
          get provider() {
            return this.config.provider;
          }
          async doGenerate({
            prompt: e,
            n: t,
            size: o,
            aspectRatio: s,
            seed: l,
            providerOptions: i,
            headers: a,
            abortSignal: r,
          }) {
            var p, d, c, m;
            let h = [];
            null != s &&
              h.push({
                type: "unsupported-setting",
                setting: "aspectRatio",
                details:
                  "This model does not support aspect ratio. Use `size` instead.",
              }),
              null != l &&
                h.push({ type: "unsupported-setting", setting: "seed" });
            let g =
                null !=
                (c =
                  null ==
                  (d =
                    null == (p = this.config._internal)
                      ? void 0
                      : p.currentDate)
                    ? void 0
                    : d.call(p))
                  ? c
                  : new Date(),
              { value: f, responseHeaders: y } = await (0, n.GU)({
                url: this.config.url({
                  path: "/images/generations",
                  modelId: this.modelId,
                }),
                headers: (0, n.m2)(this.config.headers(), a),
                body: {
                  model: this.modelId,
                  prompt: e,
                  n: t,
                  size: o,
                  ...(null != (m = i.openai) ? m : {}),
                  ...(!j.has(this.modelId)
                    ? { response_format: "b64_json" }
                    : {}),
                },
                failedResponseHandler: u,
                successfulResponseHandler: (0, n.cV)(Y),
                abortSignal: r,
                fetch: this.config.fetch,
              });
            return {
              images: f.data.map((e) => e.b64_json),
              warnings: h,
              response: { timestamp: g, modelId: this.modelId, headers: y },
            };
          }
        },
        Y = l.Ik({ data: l.YO(l.Ik({ b64_json: l.Yj() })) }),
        C = l.Ik({
          include: l.YO(l.Yj()).nullish(),
          language: l.Yj().nullish(),
          prompt: l.Yj().nullish(),
          temperature: l.ai().min(0).max(1).nullish().default(0),
          timestampGranularities: l
            .YO(l.k5(["word", "segment"]))
            .nullish()
            .default(["segment"]),
        }),
        T = {
          afrikaans: "af",
          arabic: "ar",
          armenian: "hy",
          azerbaijani: "az",
          belarusian: "be",
          bosnian: "bs",
          bulgarian: "bg",
          catalan: "ca",
          chinese: "zh",
          croatian: "hr",
          czech: "cs",
          danish: "da",
          dutch: "nl",
          english: "en",
          estonian: "et",
          finnish: "fi",
          french: "fr",
          galician: "gl",
          german: "de",
          greek: "el",
          hebrew: "he",
          hindi: "hi",
          hungarian: "hu",
          icelandic: "is",
          indonesian: "id",
          italian: "it",
          japanese: "ja",
          kannada: "kn",
          kazakh: "kk",
          korean: "ko",
          latvian: "lv",
          lithuanian: "lt",
          macedonian: "mk",
          malay: "ms",
          marathi: "mr",
          maori: "mi",
          nepali: "ne",
          norwegian: "no",
          persian: "fa",
          polish: "pl",
          portuguese: "pt",
          romanian: "ro",
          russian: "ru",
          serbian: "sr",
          slovak: "sk",
          slovenian: "sl",
          spanish: "es",
          swahili: "sw",
          swedish: "sv",
          tagalog: "tl",
          tamil: "ta",
          thai: "th",
          turkish: "tr",
          ukrainian: "uk",
          urdu: "ur",
          vietnamese: "vi",
          welsh: "cy",
        },
        S = class {
          constructor(e, t) {
            (this.modelId = e),
              (this.config = t),
              (this.specificationVersion = "v1");
          }
          get provider() {
            return this.config.provider;
          }
          getArgs({ audio: e, mediaType: t, providerOptions: o }) {
            var s, l, i, a, r;
            let u = (0, n.xI)({
                provider: "openai",
                providerOptions: o,
                schema: C,
              }),
              p = new FormData(),
              d =
                e instanceof Uint8Array
                  ? new Blob([e])
                  : new Blob([(0, n.Z9)(e)]);
            if (
              (p.append("model", this.modelId),
              p.append("file", new File([d], "audio", { type: t })),
              u)
            ) {
              let e = {
                include: null != (s = u.include) ? s : void 0,
                language: null != (l = u.language) ? l : void 0,
                prompt: null != (i = u.prompt) ? i : void 0,
                temperature: null != (a = u.temperature) ? a : void 0,
                timestamp_granularities:
                  null != (r = u.timestampGranularities) ? r : void 0,
              };
              for (let t in e) {
                let o = e[t];
                void 0 !== o && p.append(t, String(o));
              }
            }
            return { formData: p, warnings: [] };
          }
          async doGenerate(e) {
            var t, o, s, l, i, a;
            let r =
                null !=
                (s =
                  null ==
                  (o =
                    null == (t = this.config._internal)
                      ? void 0
                      : t.currentDate)
                    ? void 0
                    : o.call(t))
                  ? s
                  : new Date(),
              { formData: p, warnings: d } = this.getArgs(e),
              {
                value: c,
                responseHeaders: m,
                rawValue: h,
              } = await (0, n.S)({
                url: this.config.url({
                  path: "/audio/transcriptions",
                  modelId: this.modelId,
                }),
                headers: (0, n.m2)(this.config.headers(), e.headers),
                formData: p,
                failedResponseHandler: u,
                successfulResponseHandler: (0, n.cV)(O),
                abortSignal: e.abortSignal,
                fetch: this.config.fetch,
              }),
              g =
                null != c.language && c.language in T ? T[c.language] : void 0;
            return {
              text: c.text,
              segments:
                null !=
                (i =
                  null == (l = c.words)
                    ? void 0
                    : l.map((e) => ({
                        text: e.word,
                        startSecond: e.start,
                        endSecond: e.end,
                      })))
                  ? i
                  : [],
              language: g,
              durationInSeconds: null != (a = c.duration) ? a : void 0,
              warnings: d,
              response: {
                timestamp: r,
                modelId: this.modelId,
                headers: m,
                body: h,
              },
            };
          }
        },
        O = l.Ik({
          text: l.Yj(),
          language: l.Yj().nullish(),
          duration: l.ai().nullish(),
          words: l
            .YO(l.Ik({ word: l.Yj(), start: l.ai(), end: l.ai() }))
            .nullish(),
        });
      function M({ finishReason: e, hasToolCalls: t }) {
        switch (e) {
          case void 0:
          case null:
            return t ? "tool-calls" : "stop";
          case "max_output_tokens":
            return "length";
          case "content_filter":
            return "content-filter";
          default:
            return t ? "tool-calls" : "unknown";
        }
      }
      var $ = class {
          constructor(e, t) {
            (this.specificationVersion = "v1"),
              (this.defaultObjectGenerationMode = "json"),
              (this.supportsStructuredOutputs = !0),
              (this.modelId = e),
              (this.config = t);
          }
          get provider() {
            return this.config.provider;
          }
          getArgs({
            mode: e,
            maxTokens: t,
            temperature: o,
            stopSequences: l,
            topP: i,
            topK: a,
            presencePenalty: r,
            frequencyPenalty: u,
            seed: p,
            prompt: d,
            providerMetadata: c,
            responseFormat: m,
          }) {
            var h, g, f, y;
            let _ = [],
              v = (y = this.modelId).startsWith("o")
                ? y.startsWith("o1-mini") || y.startsWith("o1-preview")
                  ? {
                      isReasoningModel: !0,
                      systemMessageMode: "remove",
                      requiredAutoTruncation: !1,
                    }
                  : {
                      isReasoningModel: !0,
                      systemMessageMode: "developer",
                      requiredAutoTruncation: !1,
                    }
                : {
                    isReasoningModel: !1,
                    systemMessageMode: "system",
                    requiredAutoTruncation: !1,
                  },
              k = e.type;
            null != a &&
              _.push({ type: "unsupported-setting", setting: "topK" }),
              null != p &&
                _.push({ type: "unsupported-setting", setting: "seed" }),
              null != r &&
                _.push({
                  type: "unsupported-setting",
                  setting: "presencePenalty",
                }),
              null != u &&
                _.push({
                  type: "unsupported-setting",
                  setting: "frequencyPenalty",
                }),
              null != l &&
                _.push({
                  type: "unsupported-setting",
                  setting: "stopSequences",
                });
            let { messages: b, warnings: w } = (function ({
              prompt: e,
              systemMessageMode: t,
            }) {
              let o = [],
                l = [];
              for (let { role: i, content: a } of e)
                switch (i) {
                  case "system":
                    switch (t) {
                      case "system":
                        o.push({ role: "system", content: a });
                        break;
                      case "developer":
                        o.push({ role: "developer", content: a });
                        break;
                      case "remove":
                        l.push({
                          type: "other",
                          message: "system messages are removed for this model",
                        });
                        break;
                      default:
                        throw Error(`Unsupported system message mode: ${t}`);
                    }
                    break;
                  case "user":
                    o.push({
                      role: "user",
                      content: a.map((e, t) => {
                        var o, l, i, a;
                        switch (e.type) {
                          case "text":
                            return { type: "input_text", text: e.text };
                          case "image":
                            return {
                              type: "input_image",
                              image_url:
                                e.image instanceof URL
                                  ? e.image.toString()
                                  : `data:${null != (o = e.mimeType) ? o : "image/jpeg"};base64,${(0, n.n_)(e.image)}`,
                              detail:
                                null ==
                                (i =
                                  null == (l = e.providerMetadata)
                                    ? void 0
                                    : l.openai)
                                  ? void 0
                                  : i.imageDetail,
                            };
                          case "file":
                            if (e.data instanceof URL)
                              throw new s.b8({
                                functionality: "File URLs in user messages",
                              });
                            if ("application/pdf" === e.mimeType)
                              return {
                                type: "input_file",
                                filename:
                                  null != (a = e.filename)
                                    ? a
                                    : `part-${t}.pdf`,
                                file_data: `data:application/pdf;base64,${e.data}`,
                              };
                            throw new s.b8({
                              functionality:
                                "Only PDF files are supported in user messages",
                            });
                        }
                      }),
                    });
                    break;
                  case "assistant":
                    for (let e of a)
                      switch (e.type) {
                        case "text":
                          o.push({
                            role: "assistant",
                            content: [{ type: "output_text", text: e.text }],
                          });
                          break;
                        case "tool-call":
                          o.push({
                            type: "function_call",
                            call_id: e.toolCallId,
                            name: e.toolName,
                            arguments: JSON.stringify(e.args),
                          });
                      }
                    break;
                  case "tool":
                    for (let e of a)
                      o.push({
                        type: "function_call_output",
                        call_id: e.toolCallId,
                        output: JSON.stringify(e.result),
                      });
                    break;
                  default:
                    throw Error(`Unsupported role: ${i}`);
                }
              return { messages: o, warnings: l };
            })({ prompt: d, systemMessageMode: v.systemMessageMode });
            _.push(...w);
            let I = (0, n.xI)({
                provider: "openai",
                providerOptions: c,
                schema: F,
              }),
              j = null == (h = null == I ? void 0 : I.strictSchemas) || h,
              x = {
                model: this.modelId,
                input: b,
                temperature: o,
                top_p: i,
                max_output_tokens: t,
                ...((null == m ? void 0 : m.type) === "json" && {
                  text: {
                    format:
                      null != m.schema
                        ? {
                            type: "json_schema",
                            strict: j,
                            name: null != (g = m.name) ? g : "response",
                            description: m.description,
                            schema: m.schema,
                          }
                        : { type: "json_object" },
                  },
                }),
                metadata: null == I ? void 0 : I.metadata,
                parallel_tool_calls: null == I ? void 0 : I.parallelToolCalls,
                previous_response_id: null == I ? void 0 : I.previousResponseId,
                store: null == I ? void 0 : I.store,
                user: null == I ? void 0 : I.user,
                instructions: null == I ? void 0 : I.instructions,
                ...(v.isReasoningModel &&
                  ((null == I ? void 0 : I.reasoningEffort) != null ||
                    (null == I ? void 0 : I.reasoningSummary) != null) && {
                    reasoning: {
                      ...((null == I ? void 0 : I.reasoningEffort) != null && {
                        effort: I.reasoningEffort,
                      }),
                      ...((null == I ? void 0 : I.reasoningSummary) != null && {
                        summary: I.reasoningSummary,
                      }),
                    },
                  }),
                ...(v.requiredAutoTruncation && { truncation: "auto" }),
              };
            switch (
              (v.isReasoningModel &&
                (null != x.temperature &&
                  ((x.temperature = void 0),
                  _.push({
                    type: "unsupported-setting",
                    setting: "temperature",
                    details:
                      "temperature is not supported for reasoning models",
                  })),
                null != x.top_p &&
                  ((x.top_p = void 0),
                  _.push({
                    type: "unsupported-setting",
                    setting: "topP",
                    details: "topP is not supported for reasoning models",
                  }))),
              k)
            ) {
              case "regular": {
                let {
                  tools: t,
                  tool_choice: o,
                  toolWarnings: n,
                } = (function ({ mode: e, strict: t }) {
                  var o;
                  let n = (null == (o = e.tools) ? void 0 : o.length)
                      ? e.tools
                      : void 0,
                    l = [];
                  if (null == n)
                    return {
                      tools: void 0,
                      tool_choice: void 0,
                      toolWarnings: l,
                    };
                  let i = e.toolChoice,
                    a = [];
                  for (let e of n)
                    switch (e.type) {
                      case "function":
                        a.push({
                          type: "function",
                          name: e.name,
                          description: e.description,
                          parameters: e.parameters,
                          strict: !!t || void 0,
                        });
                        break;
                      case "provider-defined":
                        "openai.web_search_preview" === e.id
                          ? a.push({
                              type: "web_search_preview",
                              search_context_size: e.args.searchContextSize,
                              user_location: e.args.userLocation,
                            })
                          : l.push({ type: "unsupported-tool", tool: e });
                        break;
                      default:
                        l.push({ type: "unsupported-tool", tool: e });
                    }
                  if (null == i)
                    return { tools: a, tool_choice: void 0, toolWarnings: l };
                  let r = i.type;
                  switch (r) {
                    case "auto":
                    case "none":
                    case "required":
                      return { tools: a, tool_choice: r, toolWarnings: l };
                    case "tool":
                      if ("web_search_preview" === i.toolName)
                        return {
                          tools: a,
                          tool_choice: { type: "web_search_preview" },
                          toolWarnings: l,
                        };
                      return {
                        tools: a,
                        tool_choice: { type: "function", name: i.toolName },
                        toolWarnings: l,
                      };
                    default:
                      throw new s.b8({
                        functionality: `Unsupported tool choice type: ${r}`,
                      });
                  }
                })({ mode: e, strict: j });
                return {
                  args: { ...x, tools: t, tool_choice: o },
                  warnings: [..._, ...n],
                };
              }
              case "object-json":
                return {
                  args: {
                    ...x,
                    text: {
                      format:
                        null != e.schema
                          ? {
                              type: "json_schema",
                              strict: j,
                              name: null != (f = e.name) ? f : "response",
                              description: e.description,
                              schema: e.schema,
                            }
                          : { type: "json_object" },
                    },
                  },
                  warnings: _,
                };
              case "object-tool":
                return {
                  args: {
                    ...x,
                    tool_choice: { type: "function", name: e.tool.name },
                    tools: [
                      {
                        type: "function",
                        name: e.tool.name,
                        description: e.tool.description,
                        parameters: e.tool.parameters,
                        strict: j,
                      },
                    ],
                  },
                  warnings: _,
                };
              default:
                throw Error(`Unsupported type: ${k}`);
            }
          }
          async doGenerate(e) {
            var t, o, s, i, a, r, p;
            let { args: d, warnings: c } = this.getArgs(e),
              {
                responseHeaders: m,
                value: h,
                rawValue: g,
              } = await (0, n.GU)({
                url: this.config.url({
                  path: "/responses",
                  modelId: this.modelId,
                }),
                headers: (0, n.m2)(this.config.headers(), e.headers),
                body: d,
                failedResponseHandler: u,
                successfulResponseHandler: (0, n.cV)(
                  l.Ik({
                    id: l.Yj(),
                    created_at: l.ai(),
                    model: l.Yj(),
                    output: l.YO(
                      l.gM("type", [
                        l.Ik({
                          type: l.eu("message"),
                          role: l.eu("assistant"),
                          content: l.YO(
                            l.Ik({
                              type: l.eu("output_text"),
                              text: l.Yj(),
                              annotations: l.YO(
                                l.Ik({
                                  type: l.eu("url_citation"),
                                  start_index: l.ai(),
                                  end_index: l.ai(),
                                  url: l.Yj(),
                                  title: l.Yj(),
                                }),
                              ),
                            }),
                          ),
                        }),
                        l.Ik({
                          type: l.eu("function_call"),
                          call_id: l.Yj(),
                          name: l.Yj(),
                          arguments: l.Yj(),
                        }),
                        l.Ik({ type: l.eu("web_search_call") }),
                        l.Ik({ type: l.eu("computer_call") }),
                        l.Ik({
                          type: l.eu("reasoning"),
                          summary: l.YO(
                            l.Ik({ type: l.eu("summary_text"), text: l.Yj() }),
                          ),
                        }),
                      ]),
                    ),
                    incomplete_details: l.Ik({ reason: l.Yj() }).nullable(),
                    usage: N,
                  }),
                ),
                abortSignal: e.abortSignal,
                fetch: this.config.fetch,
              }),
              f = h.output
                .filter((e) => "message" === e.type)
                .flatMap((e) => e.content)
                .filter((e) => "output_text" === e.type),
              y = h.output
                .filter((e) => "function_call" === e.type)
                .map((e) => ({
                  toolCallType: "function",
                  toolCallId: e.call_id,
                  toolName: e.name,
                  args: e.arguments,
                })),
              _ =
                null !=
                (o =
                  null == (t = h.output.find((e) => "reasoning" === e.type))
                    ? void 0
                    : t.summary)
                  ? o
                  : null;
            return {
              text: f.map((e) => e.text).join("\n"),
              sources: f.flatMap((e) =>
                e.annotations.map((e) => {
                  var t, o, s;
                  return {
                    sourceType: "url",
                    id:
                      null !=
                      (s =
                        null == (o = (t = this.config).generateId)
                          ? void 0
                          : o.call(t))
                        ? s
                        : (0, n.$C)(),
                    url: e.url,
                    title: e.title,
                  };
                }),
              ),
              finishReason: M({
                finishReason:
                  null == (s = h.incomplete_details) ? void 0 : s.reason,
                hasToolCalls: y.length > 0,
              }),
              toolCalls: y.length > 0 ? y : void 0,
              reasoning: _
                ? _.map((e) => ({ type: "text", text: e.text }))
                : void 0,
              usage: {
                promptTokens: h.usage.input_tokens,
                completionTokens: h.usage.output_tokens,
              },
              rawCall: { rawPrompt: void 0, rawSettings: {} },
              rawResponse: { headers: m, body: g },
              request: { body: JSON.stringify(d) },
              response: {
                id: h.id,
                timestamp: new Date(1e3 * h.created_at),
                modelId: h.model,
              },
              providerMetadata: {
                openai: {
                  responseId: h.id,
                  cachedPromptTokens:
                    null !=
                    (a =
                      null == (i = h.usage.input_tokens_details)
                        ? void 0
                        : i.cached_tokens)
                      ? a
                      : null,
                  reasoningTokens:
                    null !=
                    (p =
                      null == (r = h.usage.output_tokens_details)
                        ? void 0
                        : r.reasoning_tokens)
                      ? p
                      : null,
                },
              },
              warnings: c,
            };
          }
          async doStream(e) {
            let { args: t, warnings: o } = this.getArgs(e),
              { responseHeaders: s, value: l } = await (0, n.GU)({
                url: this.config.url({
                  path: "/responses",
                  modelId: this.modelId,
                }),
                headers: (0, n.m2)(this.config.headers(), e.headers),
                body: { ...t, stream: !0 },
                failedResponseHandler: u,
                successfulResponseHandler: (0, n.Ds)(H),
                abortSignal: e.abortSignal,
                fetch: this.config.fetch,
              }),
              i = this,
              a = "unknown",
              r = NaN,
              p = NaN,
              d = null,
              c = null,
              m = null,
              h = {},
              g = !1;
            return {
              stream: l.pipeThrough(
                new TransformStream({
                  transform(e, t) {
                    var o, s, l, u, f, y, _, v, k;
                    if (!e.success) {
                      (a = "error"),
                        t.enqueue({ type: "error", error: e.error });
                      return;
                    }
                    let b = e.value;
                    if ("response.output_item.added" === b.type)
                      "function_call" === b.item.type &&
                        ((h[b.output_index] = {
                          toolName: b.item.name,
                          toolCallId: b.item.call_id,
                        }),
                        t.enqueue({
                          type: "tool-call-delta",
                          toolCallType: "function",
                          toolCallId: b.item.call_id,
                          toolName: b.item.name,
                          argsTextDelta: b.item.arguments,
                        }));
                    else if (
                      "response.function_call_arguments.delta" === b.type
                    ) {
                      let e = h[b.output_index];
                      null != e &&
                        t.enqueue({
                          type: "tool-call-delta",
                          toolCallType: "function",
                          toolCallId: e.toolCallId,
                          toolName: e.toolName,
                          argsTextDelta: b.delta,
                        });
                    } else {
                      "response.created" === b.type
                        ? ((m = b.response.id),
                          t.enqueue({
                            type: "response-metadata",
                            id: b.response.id,
                            timestamp: new Date(1e3 * b.response.created_at),
                            modelId: b.response.model,
                          }))
                        : "response.output_text.delta" === b.type
                          ? t.enqueue({
                              type: "text-delta",
                              textDelta: b.delta,
                            })
                          : "response.reasoning_summary_text.delta" === b.type
                            ? t.enqueue({
                                type: "reasoning",
                                textDelta: b.delta,
                              })
                            : "response.output_item.done" === b.type &&
                                "function_call" === b.item.type
                              ? ((h[b.output_index] = void 0),
                                (g = !0),
                                t.enqueue({
                                  type: "tool-call",
                                  toolCallType: "function",
                                  toolCallId: b.item.call_id,
                                  toolName: b.item.name,
                                  args: b.item.arguments,
                                }))
                              : "response.completed" === (k = b).type ||
                                  "response.incomplete" === k.type
                                ? ((a = M({
                                    finishReason:
                                      null ==
                                      (o = b.response.incomplete_details)
                                        ? void 0
                                        : o.reason,
                                    hasToolCalls: g,
                                  })),
                                  (r = b.response.usage.input_tokens),
                                  (p = b.response.usage.output_tokens),
                                  (d =
                                    null !=
                                    (l =
                                      null ==
                                      (s =
                                        b.response.usage.input_tokens_details)
                                        ? void 0
                                        : s.cached_tokens)
                                      ? l
                                      : d),
                                  (c =
                                    null !=
                                    (f =
                                      null ==
                                      (u =
                                        b.response.usage.output_tokens_details)
                                        ? void 0
                                        : u.reasoning_tokens)
                                      ? f
                                      : c))
                                : "response.output_text.annotation.added" ===
                                    b.type &&
                                  t.enqueue({
                                    type: "source",
                                    source: {
                                      sourceType: "url",
                                      id:
                                        null !=
                                        (v =
                                          null ==
                                          (_ = (y = i.config).generateId)
                                            ? void 0
                                            : _.call(y))
                                          ? v
                                          : (0, n.$C)(),
                                      url: b.annotation.url,
                                      title: b.annotation.title,
                                    },
                                  });
                    }
                  },
                  flush(e) {
                    e.enqueue({
                      type: "finish",
                      finishReason: a,
                      usage: { promptTokens: r, completionTokens: p },
                      ...((null != d || null != c) && {
                        providerMetadata: {
                          openai: {
                            responseId: m,
                            cachedPromptTokens: d,
                            reasoningTokens: c,
                          },
                        },
                      }),
                    });
                  },
                }),
              ),
              rawCall: { rawPrompt: void 0, rawSettings: {} },
              rawResponse: { headers: s },
              request: { body: JSON.stringify(t) },
              warnings: o,
            };
          }
        },
        N = l.Ik({
          input_tokens: l.ai(),
          input_tokens_details: l
            .Ik({ cached_tokens: l.ai().nullish() })
            .nullish(),
          output_tokens: l.ai(),
          output_tokens_details: l
            .Ik({ reasoning_tokens: l.ai().nullish() })
            .nullish(),
        }),
        q = l.Ik({ type: l.eu("response.output_text.delta"), delta: l.Yj() }),
        R = l.Ik({
          type: l.k5(["response.completed", "response.incomplete"]),
          response: l.Ik({
            incomplete_details: l.Ik({ reason: l.Yj() }).nullish(),
            usage: N,
          }),
        }),
        P = l.Ik({
          type: l.eu("response.created"),
          response: l.Ik({ id: l.Yj(), created_at: l.ai(), model: l.Yj() }),
        }),
        U = l.Ik({
          type: l.eu("response.output_item.done"),
          output_index: l.ai(),
          item: l.gM("type", [
            l.Ik({ type: l.eu("message") }),
            l.Ik({
              type: l.eu("function_call"),
              id: l.Yj(),
              call_id: l.Yj(),
              name: l.Yj(),
              arguments: l.Yj(),
              status: l.eu("completed"),
            }),
          ]),
        }),
        D = l.Ik({
          type: l.eu("response.function_call_arguments.delta"),
          item_id: l.Yj(),
          output_index: l.ai(),
          delta: l.Yj(),
        }),
        E = l.Ik({
          type: l.eu("response.output_item.added"),
          output_index: l.ai(),
          item: l.gM("type", [
            l.Ik({ type: l.eu("message") }),
            l.Ik({
              type: l.eu("function_call"),
              id: l.Yj(),
              call_id: l.Yj(),
              name: l.Yj(),
              arguments: l.Yj(),
            }),
          ]),
        }),
        A = l.Ik({
          type: l.eu("response.output_text.annotation.added"),
          annotation: l.Ik({
            type: l.eu("url_citation"),
            url: l.Yj(),
            title: l.Yj(),
          }),
        }),
        G = l.Ik({
          type: l.eu("response.reasoning_summary_text.delta"),
          item_id: l.Yj(),
          output_index: l.ai(),
          summary_index: l.ai(),
          delta: l.Yj(),
        }),
        H = l.KC([
          q,
          R,
          P,
          U,
          D,
          E,
          A,
          G,
          l.Ik({ type: l.Yj() }).passthrough(),
        ]),
        F = l.Ik({
          metadata: l.bz().nullish(),
          parallelToolCalls: l.zM().nullish(),
          previousResponseId: l.Yj().nullish(),
          store: l.zM().nullish(),
          user: l.Yj().nullish(),
          reasoningEffort: l.Yj().nullish(),
          strictSchemas: l.zM().nullish(),
          instructions: l.Yj().nullish(),
          reasoningSummary: l.Yj().nullish(),
        }),
        V = l.Ik({}),
        L = {
          webSearchPreview: function ({
            searchContextSize: e,
            userLocation: t,
          } = {}) {
            return {
              type: "provider-defined",
              id: "openai.web_search_preview",
              args: { searchContextSize: e, userLocation: t },
              parameters: V,
            };
          },
        },
        z = l.Ik({
          instructions: l.Yj().nullish(),
          speed: l.ai().min(0.25).max(4).default(1).nullish(),
        }),
        J = class {
          constructor(e, t) {
            (this.modelId = e),
              (this.config = t),
              (this.specificationVersion = "v1");
          }
          get provider() {
            return this.config.provider;
          }
          getArgs({
            text: e,
            voice: t = "alloy",
            outputFormat: o = "mp3",
            speed: s,
            instructions: l,
            providerOptions: i,
          }) {
            let a = [],
              r = (0, n.xI)({
                provider: "openai",
                providerOptions: i,
                schema: z,
              }),
              u = {
                model: this.modelId,
                input: e,
                voice: t,
                response_format: "mp3",
                speed: s,
                instructions: l,
              };
            if (
              (o &&
                (["mp3", "opus", "aac", "flac", "wav", "pcm"].includes(o)
                  ? (u.response_format = o)
                  : a.push({
                      type: "unsupported-setting",
                      setting: "outputFormat",
                      details: `Unsupported output format: ${o}. Using mp3 instead.`,
                    })),
              r)
            ) {
              let e = {};
              for (let t in e) {
                let o = e[t];
                void 0 !== o && (u[t] = o);
              }
            }
            return { requestBody: u, warnings: a };
          }
          async doGenerate(e) {
            var t, o, s;
            let l =
                null !=
                (s =
                  null ==
                  (o =
                    null == (t = this.config._internal)
                      ? void 0
                      : t.currentDate)
                    ? void 0
                    : o.call(t))
                  ? s
                  : new Date(),
              { requestBody: i, warnings: a } = this.getArgs(e),
              {
                value: r,
                responseHeaders: p,
                rawValue: d,
              } = await (0, n.GU)({
                url: this.config.url({
                  path: "/audio/speech",
                  modelId: this.modelId,
                }),
                headers: (0, n.m2)(this.config.headers(), e.headers),
                body: i,
                failedResponseHandler: u,
                successfulResponseHandler: (0, n.HD)(),
                abortSignal: e.abortSignal,
                fetch: this.config.fetch,
              });
            return {
              audio: r,
              warnings: a,
              request: { body: JSON.stringify(i) },
              response: {
                timestamp: l,
                modelId: this.modelId,
                headers: p,
                body: d,
              },
            };
          }
        };
      function K(e = {}) {
        var t, o, s;
        let l =
            null != (t = (0, n.ae)(e.baseURL))
              ? t
              : "https://api.openai.com/v1",
          i = null != (o = e.compatibility) ? o : "compatible",
          a = null != (s = e.name) ? s : "openai",
          r = () => ({
            Authorization: `Bearer ${(0, n.WL)({ apiKey: e.apiKey, environmentVariableName: "OPENAI_API_KEY", description: "OpenAI" })}`,
            "OpenAI-Organization": e.organization,
            "OpenAI-Project": e.project,
            ...e.headers,
          }),
          u = (t, o = {}) =>
            new d(t, o, {
              provider: `${a}.chat`,
              url: ({ path: e }) => `${l}${e}`,
              headers: r,
              compatibility: i,
              fetch: e.fetch,
            }),
          p = (t, o = {}) =>
            new _(t, o, {
              provider: `${a}.completion`,
              url: ({ path: e }) => `${l}${e}`,
              headers: r,
              compatibility: i,
              fetch: e.fetch,
            }),
          c = (t, o = {}) =>
            new b(t, o, {
              provider: `${a}.embedding`,
              url: ({ path: e }) => `${l}${e}`,
              headers: r,
              fetch: e.fetch,
            }),
          m = (t, o = {}) =>
            new x(t, o, {
              provider: `${a}.image`,
              url: ({ path: e }) => `${l}${e}`,
              headers: r,
              fetch: e.fetch,
            }),
          h = (t) =>
            new S(t, {
              provider: `${a}.transcription`,
              url: ({ path: e }) => `${l}${e}`,
              headers: r,
              fetch: e.fetch,
            }),
          g = (t) =>
            new J(t, {
              provider: `${a}.speech`,
              url: ({ path: e }) => `${l}${e}`,
              headers: r,
              fetch: e.fetch,
            }),
          f = (e, t) => {
            if (new.target)
              throw Error(
                "The OpenAI model function cannot be called with the new keyword.",
              );
            return "gpt-3.5-turbo-instruct" === e ? p(e, t) : u(e, t);
          },
          y = function (e, t) {
            return f(e, t);
          };
        return (
          (y.languageModel = f),
          (y.chat = u),
          (y.completion = p),
          (y.responses = (t) =>
            new $(t, {
              provider: `${a}.responses`,
              url: ({ path: e }) => `${l}${e}`,
              headers: r,
              fetch: e.fetch,
            })),
          (y.embedding = c),
          (y.textEmbedding = c),
          (y.textEmbeddingModel = c),
          (y.image = m),
          (y.imageModel = m),
          (y.transcription = h),
          (y.transcriptionModel = h),
          (y.speech = g),
          (y.speechModel = g),
          (y.tools = L),
          y
        );
      }
      var W = K({ compatibility: "strict" });
    },
  });
//# sourceMappingURL=4170.js.map
