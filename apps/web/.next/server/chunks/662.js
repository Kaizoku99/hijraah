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
    (e._sentryDebugIds[t] = "02d186b8-113d-4202-93b4-5d607d47163a"),
    (e._sentryDebugIdIdentifier =
      "sentry-dbid-02d186b8-113d-4202-93b4-5d607d47163a"));
} catch (e) {}
(exports.id = 662),
  (exports.ids = [662]),
  (exports.modules = {
    6934: () => {},
    16573: (e, t, r) => {
      "use strict";
      r.d(t, { r: () => p });
      var n = r(33747),
        s = r.n(n),
        a = r(77719);
      function i(e = "anon") {
        let t = "http://localhost:54321";
        if (!t)
          throw Error(
            "Supabase URL is missing. Set NEXT_PUBLIC_SUPABASE_URL or SUPABASE_URL.",
          );
        let r =
          "service" === e
            ? process.env.SUPABASE_SERVICE_KEY ||
              process.env.SUPABASE_SERVICE_ROLE_KEY
            : process.env.SUPABASE_ANON_KEY ||
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0";
        if (!r)
          throw Error(
            `Supabase ${e} key is missing. Check environment variables.`,
          );
        return (0, a.createClient)(t, r, {
          auth: { autoRefreshToken: !1, persistSession: !1 },
        });
      }
      class o {
        constructor(e) {
          (this.supabase = i("service")), (this.openai = e);
        }
        async getTopInterests(e, t = 5) {
          let { data: r, error: n } = await this.supabase
            .from("user_query_history")
            .select("query_text")
            .eq("user_id", e)
            .order("created_at", { ascending: !1 })
            .limit(50);
          if (n || !r) return [];
          let s = r.map((e) => e.query_text).join("\n"),
            a = await this.openai.chat.completions.create({
              model: "gpt-4o-mini",
              messages: [
                {
                  role: "system",
                  content:
                    "Analyze the user's past queries and extract the top immigration-related entities (countries, visa types, programs). Return JSON array of {entity, score}. Score 1-5 importance.",
                },
                { role: "user", content: s.slice(0, 4e3) },
              ],
              response_format: { type: "json_object" },
            });
          try {
            return JSON.parse(a.choices[0].message.content ?? "[]");
          } catch {
            return [];
          }
        }
      }
      class c {
        async getUserWeights(e) {
          let { data: t, error: r } = await this.supabase
            .from("user_query_history")
            .select("feedback_text, feedback_score")
            .eq("user_id", e)
            .gt("feedback_score", 3);
          if (r || !t) return [];
          let n = {};
          return (
            t.forEach((e) => {
              (e.feedback_text?.split(/\W+/) || []).forEach((e) => {
                let t = e.toLowerCase();
                t.length < 4 || (n[t] = (n[t] || 0) + 1);
              });
            }),
            Object.entries(n)
              .map(([e, t]) => ({ keyword: e, weight: Math.min(t, 5) }))
              .sort((e, t) => t.weight - e.weight)
          );
        }
        constructor() {
          this.supabase = i("service");
        }
      }
      class u {
        constructor(e) {
          (this.supabase = i("service")), (this.openai = e);
        }
        async retrieve(e, t = 5) {
          let r = [];
          try {
            r = (
              await this.openai.embeddings.create({
                model: "text-embedding-3-small",
                input: e,
              })
            ).data[0].embedding;
          } catch (t) {
            if (
              !(
                t?.code === "model_not_found" ||
                /model .* does not exist/i.test(t?.message ?? "")
              )
            )
              return console.error("Embedding generation failed", t), [];
            console.warn(
              "text-embedding-3-small unavailable, retrying with text-embedding-3-large",
            ),
              (r = (
                await this.openai.embeddings.create({
                  model: "text-embedding-3-large",
                  input: e,
                })
              ).data[0].embedding);
          }
          let { data: n, error: s } = await this.supabase.rpc(
            "match_image_embeddings",
            { p_query_embedding: r, p_match_count: t },
          );
          return s
            ? (console.error("Image search error", s.message), [])
            : (n || []).map((e) => ({
                url: e.image_url,
                metadata: e.metadata || {},
                score: e.similarity,
              }));
        }
      }
      var l = r(38507),
        d = r(73346),
        h = r(55511),
        m = r.n(h);
      class p {
        constructor(e, t) {
          (this.supabase = e),
            (this.openai = t),
            (this.queryCache = new (s())({ stdTTL: 600 })),
            (this.vectorCache = new l.jK({
              url: process.env.UPSTASH_VECTOR_URL,
              token: process.env.UPSTASH_VECTOR_TOKEN,
            })),
            (this.redis = new d.Q({
              url: process.env.UPSTASH_REDIS_URL,
              token: process.env.UPSTASH_REDIS_TOKEN,
            }));
        }
        async storeDocument(e) {
          let { error: t } = await this.supabase
            .from("rag_documents")
            .upsert(
              {
                id: e.documentId,
                source_url: e.sourceUrl,
                raw_text: e.rawText,
                status: "processed",
              },
              { onConflict: "id" },
            );
          if (t) throw Error(`Error storing document metadata: ${t.message}`);
          let r = e.chunks.map((t) => ({
            id: `${e.documentId}_${t.metadata.chunkIndex}`,
            document_id: e.documentId,
            content: t.content,
            embedding: t.embedding,
            chunk_index: t.metadata.chunkIndex,
            metadata: t.metadata,
          }));
          for (let e = 0; e < r.length; e += 100) {
            let t = r.slice(e, e + 100),
              { error: n } = await this.supabase
                .from("document_chunks_enhanced")
                .insert(t);
            if (n) throw Error(`Error storing document chunks: ${n.message}`);
          }
        }
        async getUserProfile(e) {
          let { data: t, error: r } = await this.supabase
            .from("profiles")
            .select(
              "id, country_of_residence, country_of_interest, country_of_citizenship, immigration_goals",
            )
            .eq("id", e)
            .single();
          return r
            ? ("PGRST116" === r.code ||
                console.error(`Error fetching profile for userId ${e}:`, r),
              null)
            : t
              ? {
                  id: t.id,
                  countryOfResidence: t.country_of_residence,
                  countryOfInterest: t.country_of_interest,
                  countryOfCitizenship: t.country_of_citizenship,
                  immigrationGoals: t.immigration_goals || [],
                }
              : null;
        }
        async understandQuery(e, t) {
          let r = `understood_query_${t?.id || "anonymous"}_${e}`,
            n = this.queryCache.get(r);
          if (n) return n;
          let s = t
              ? `
      Here is the user's profile for context:
      - Current Country of Residence: ${t.countryOfResidence || "N/A"}
      - Country of Citizenship: ${t.countryOfCitizenship || "N/A"}
      - Country of Interest for Immigration: ${t.countryOfInterest || "N/A"}
      - Stated Immigration Goals: ${t.immigrationGoals?.join(", ") || "N/A"}
      
      Personalize the queries based on this context. For example, if the user asks about "visa requirements", assume they are asking for themselves.`
              : "The user is anonymous. Generate a generic query.",
            a = `
      Analyze the following user query for an immigration assistant bot. 
      ${s}

      User Query: "${e}"

      1.  **Embedding Query**: Rephrase the user's query to be a clear, concise question or statement that captures the core semantic meaning, incorporating the user's context. This will be used to find semantically similar document chunks.
      2.  **Full-Text Query**: Extract the most important keywords and entities from the user's query and profile. Combine them using OR operators for a broad full-text search. Focus on nouns, proper nouns, and key immigration terms.

      Return the result as a JSON object with two keys: "embedding_query" and "full_text_query".
    `;
          try {
            let t = await this.openai.chat.completions.create({
                model: "gpt-4o",
                messages: [
                  {
                    role: "system",
                    content:
                      "You are a query optimization expert for retrieval systems specializing in immigration.",
                  },
                  { role: "user", content: a },
                ],
                response_format: { type: "json_object" },
              }),
              n = t.choices[0]?.message?.content;
            if (!n) throw Error("No content returned from OpenAI.");
            let s = JSON.parse(n),
              i = {
                embedding_query: s.embedding_query || e,
                full_text_query: s.full_text_query || e.split(" ").join(" | "),
              };
            return this.queryCache.set(r, i), i;
          } catch (t) {
            return (
              console.warn(
                "Error understanding query, falling back to basic search:",
                t,
              ),
              { embedding_query: e, full_text_query: e.split(" ").join(" | ") }
            );
          }
        }
        async extractEntitiesFromQuery(e) {
          try {
            let t = await this.openai.chat.completions.create({
                model: "gpt-4o",
                messages: [
                  {
                    role: "system",
                    content:
                      "You are an expert at extracting key entities (like countries, visa types, organizations) from user queries about immigration.",
                  },
                  {
                    role: "user",
                    content: `Extract all named entities from the following query and classify them. Query: "${e}"

Respond with a JSON object containing a single key "entities", which is an array of objects, where each object has "name" and "type".
Example: {"entities": [{"name": "Canada", "type": "Country"}, {"name": "Express Entry", "type": "Visa/Program"}]}`,
                  },
                ],
                response_format: { type: "json_object" },
              }),
              r = t.choices[0]?.message?.content;
            if (!r) return [];
            return JSON.parse(r).entities || [];
          } catch (e) {
            return (
              console.error("Error extracting entities from query:", e), []
            );
          }
        }
        async searchKnowledgeGraph(e) {
          if (0 === e.length) return { entities: [], relationships: [] };
          let t = e.map((e) => e.name);
          try {
            let { data: r, error: n } = await this.supabase.rpc(
              "get_related_edges",
              { p_entity_names: t },
            );
            if (n)
              return (
                console.error("Error searching knowledge graph:", n),
                { entities: e, relationships: [] }
              );
            let s = (r || []).map((e) => ({
              source_entity_name: e.source_entity_name ?? "",
              target_entity_name: e.target_entity_name ?? "",
              type: e.relationship_type,
            }));
            return { entities: e, relationships: s };
          } catch (t) {
            return (
              console.error("Unexpected KG search error", t),
              { entities: e, relationships: [] }
            );
          }
        }
        async getCachedRetrieval(e) {
          let { data: t, error: r } = await this.supabase
            .from("rag_query_cache")
            .select("retrieved_chunks, kg_entities")
            .eq("query_hash", e)
            .lte("expires_at", new Date().toISOString())
            .maybeSingle();
          if (r) return console.warn("Cache lookup error:", r.message), null;
          if (!t) return null;
          try {
            let e = JSON.parse(t.retrieved_chunks),
              r = JSON.parse(t.kg_entities);
            return { chunks: e, kgContext: r };
          } catch {
            return null;
          }
        }
        hashQuery(e, t) {
          let r = JSON.stringify({ query: e, ...t });
          return m().createHash("sha256").update(r).digest("hex");
        }
        async cacheRetrieval(e, t) {
          try {
            await this.supabase
              .from("rag_query_cache")
              .upsert({
                query_hash: e,
                query_text: "",
                retrieved_chunks: JSON.stringify(t.chunks),
                kg_entities: JSON.stringify(t.kgContext),
                expires_at: new Date(Date.now() + 36e5).toISOString(),
              }),
              await this.redis.setex(`hybrid:${e}`, 3600, JSON.stringify(t));
          } catch (e) {
            console.warn("Cache write error", e);
          }
        }
        async search(e, t = {}) {
          Date.now();
          let r = this.hashQuery(e, t);
          try {
            let n = `hybrid:${r}`,
              s = await this.redis.get(n);
            if (s) return JSON.parse(s);
            let a = await this.getCachedRetrieval(r);
            if (a) return await this.redis.setex(n, 3600, JSON.stringify(a)), a;
            let { limit: i = 10, threshold: o = 0.7, userId: c } = t,
              u = null;
            c && (u = await this.getUserProfile(c));
            let { embedding_query: l } = await this.understandQuery(e, u),
              d = (
                await this.openai.embeddings.create({
                  model: "text-embedding-3-small",
                  input: l,
                })
              ).data[0].embedding;
            try {
              let e = c
                  ? this.vectorCache.namespace(`user_${c}`)
                  : this.vectorCache,
                t = await e.query({ vector: d, topK: 3, includeMetadata: !0 });
              if (t.length > 0 && t[0].score > 0.95) {
                let e = t[0].metadata;
                if (e?.result) return e.result;
              }
            } catch (e) {
              console.warn("Vector cache query failed:", e);
            }
            let h = await this._searchWithoutCache(e, t);
            await this.cacheRetrieval(r, h);
            let m = c
              ? this.vectorCache.namespace(`user_${c}`)
              : this.vectorCache;
            return (
              await m.upsert({
                id: r,
                vector: d,
                metadata: { query: e, result: h, cachedAt: Date.now() },
              }),
              h
            );
          } catch (e) {
            throw (console.error("Enhanced hybrid retrieval failed:", e), e);
          }
        }
        async _searchWithoutCache(e, t = {}) {
          let { limit: r = 10, threshold: n = 0.7, userId: s } = t,
            a = null;
          s && (a = await this.getUserProfile(s));
          let { embedding_query: i, full_text_query: o } =
              await this.understandQuery(e, a),
            c = (
              await this.openai.embeddings.create({
                model: "text-embedding-3-small",
                input: i,
              })
            ).data[0].embedding,
            { data: l, error: d } = await this.supabase.rpc(
              "search_rag_hybrid",
              {
                p_query_embedding: c,
                p_query_text: o,
                p_match_count: r,
                p_similarity_threshold: n,
              },
            );
          if (d) throw Error(`Search error: ${d.message}`);
          let h = (l || []).map((e) => ({
              content: e.content,
              embedding: [],
              metadata: {
                sourceUrl: e.source_url,
                documentId: e.document_id,
                chunkIndex: e.chunk_index,
              },
            })),
            m = await this.extractEntitiesFromQuery(e),
            p = await this.searchKnowledgeGraph(m),
            y = new u(this.openai),
            g = await y.retrieve(e, 5),
            f = this.personalizeChunks(h, a);
          return {
            chunks: await this.rerankResults(f, e),
            kgContext: p,
            images: g,
            userContext: a,
          };
        }
        async rerankResults(e, t) {
          if (e.length <= 3) return e;
          let r = e
              .map((e, t) => `Excerpt ${t + 1}: "${e.content.slice(0, 300)}"`)
              .join("\n\n"),
            n = await this.openai.chat.completions.create({
              model: "gpt-4o-mini",
              messages: [
                {
                  role: "system",
                  content:
                    "You are a reranking model. Given a user query and a list of document excerpts, rank the excerpts from most to least relevant. Respond with a JSON array of integers representing the new order (1-based indices).",
                },
                {
                  role: "user",
                  content: `Query: "${t}"

${r}

Return JSON array now.`,
                },
              ],
              response_format: { type: "json_object" },
            }),
            s = [];
          try {
            let e = n.choices[0]?.message?.content || "";
            s = JSON.parse(e);
          } catch {
            return e;
          }
          let a = [];
          return (
            s.forEach((t) => {
              let r = e[t - 1];
              r && a.push(r);
            }),
            e.forEach((e) => {
              a.includes(e) || a.push(e);
            }),
            a
          );
        }
        personalizeChunks(e, t) {
          if (!t) return e;
          let r = t.countryOfInterest?.toLowerCase();
          if (!r) return e;
          let n = {};
          t.id &&
            new o(this.openai).getTopInterests(t.id).then((e) => {
              e.forEach((e) => {
                n[e.entity.toLowerCase()] = e.score;
              });
            });
          let s = {};
          return (
            t?.id &&
              new c().getUserWeights(t.id).then((e) => {
                e.forEach((e) => {
                  s[e.keyword] = e.weight;
                });
              }),
            e.sort((e, t) => {
              let a = +!!this.matchCountry(e, r),
                i = +!!this.matchCountry(t, r),
                o = this.histBoost(e, n),
                c = this.histBoost(t, n),
                u = this.histBoost(e, s);
              return i + c + this.histBoost(t, s) - (a + o + u);
            })
          );
        }
        matchCountry(e, t) {
          return (
            e.content.toLowerCase().includes(t) ||
            e.metadata.sourceUrl?.toLowerCase().includes(t)
          );
        }
        histBoost(e, t) {
          for (let r in t) if (e.content.toLowerCase().includes(r)) return t[r];
          return 0;
        }
      }
    },
    43886: () => {},
    99660: (e, t, r) => {
      "use strict";
      r.a(e, async (e, n) => {
        try {
          r.d(t, { J: () => o });
          var s = r(85488),
            a = r(84170),
            i = e([s]);
          s = (i.then ? (await i)() : i)[0];
          class o {
            constructor(e) {
              this.llm = (0, a.r)({ apiKey: e });
            }
            async generate(e, t, r) {
              let n = this.buildContext(t, r),
                a = this.createSystemPrompt(n),
                i = new s.StreamData();
              return (
                i.append(JSON.parse(JSON.stringify({ retrievedContext: t }))),
                (
                  await (0, s.streamText)({
                    model: this.llm("gpt-4o"),
                    messages: [
                      { role: "system", content: a },
                      { role: "user", content: e },
                    ],
                    onFinish: async (e) => {
                      let r = await this.validateResponse(e.text, n),
                        s = this.addCitations(r, t),
                        a = "stop" === e.finishReason ? 0.9 : 0.5;
                      i.append(
                        JSON.parse(
                          JSON.stringify({
                            text: r,
                            sources: s,
                            confidence: a,
                          }),
                        ),
                      ),
                        i.close();
                    },
                  })
                ).toDataStreamResponse()
              );
            }
            buildContext(e, t) {
              let r = e.chunks
                  .map(
                    (e, t) => `Source [${t + 1}] (${e.metadata.sourceUrl}):
${e.content}`,
                  )
                  .join("\n\n---\n\n"),
                n = `
Knowledge Graph Context:
Entities: ${e.kgContext.entities.length > 0 ? e.kgContext.entities.map((e) => `${e.name} (${e.type})`).join(", ") : "None"}
Relationships: ${e.kgContext.relationships.length > 0 ? e.kgContext.relationships.map((e) => `${e.source_entity_name} -> ${e.type} -> ${e.target_entity_name}`).join(", ") : "None"}
    `,
                s = "User Profile: Not provided.";
              t &&
                (s = `
User Profile:
- Country of Residence: ${t.countryOfResidence || "Not specified"}
- Country of Interest: ${t.countryOfInterest || "Not specified"}
- Immigration Goals: ${(t.immigrationGoals || []).join(", ") || "Not specified"}
    `);
              let a = `${r}

${n}

${s}`,
                i = this.getTemporalContext();
              return { formattedContext: a, temporalContext: i };
            }
            getTemporalContext() {
              return new Date().toISOString();
            }
            createSystemPrompt(e) {
              return `You are a specialized AI assistant for Hijraah, an immigration services platform. Your role is to provide accurate, context-aware, and personalized immigration advice.

    **Instructions:**
    1.  **Primary Source:** Base your answers strictly on the provided "Source" and "Knowledge Graph Context". Do not use outside knowledge.
    2.  **Citation:** When you use information from a source, cite it by number (e.g., [1], [2]).
    3.  **Personalization:** Use the "User Profile" to tailor your response to the user's specific situation.
    4.  **Temporal Awareness:** Consider the "Current Date" provided as ${e.temporalContext} for any time-sensitive information.
    5.  **No Information:** If the context does not contain an answer, explicitly state that you cannot answer based on the provided information. Do not invent details.
    6.  **Persona:** Maintain a professional, empathetic, and encouraging tone.

    **Provided Context:**
    ${e.formattedContext}
    `;
            }
            async validateResponse(e, t) {
              return e && 0 !== e.trim().length
                ? e
                : "I am sorry, but I could not generate a response based on the provided information.";
            }
            addCitations(e, t) {
              let r,
                n = new Set(),
                s = /\[(\d+)\]/g;
              for (; null !== (r = s.exec(e)); ) n.add(parseInt(r[1], 10));
              return 0 === n.size
                ? t.chunks
                : Array.from(n)
                    .sort((e, t) => e - t)
                    .map((e) => t.chunks[e - 1])
                    .filter(Boolean);
            }
          }
          n();
        } catch (e) {
          n(e);
        }
      });
    },
  });
//# sourceMappingURL=662.js.map
