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
    (e._sentryDebugIds[t] = "ac4d3abc-3808-4f19-9645-8f0cfe54da9b"),
    (e._sentryDebugIdIdentifier =
      "sentry-dbid-ac4d3abc-3808-4f19-9645-8f0cfe54da9b"));
} catch (e) {}
(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [7322],
  {
    40147: (e, t, n) => {
      Promise.resolve().then(n.bind(n, 63976));
    },
    63976: (e, t, n) => {
      "use strict";
      n.r(t), n.d(t, { default: () => b });
      var r = n(30602),
        a = n(85218),
        i = n(53658),
        s = n(23209),
        o = n(39184),
        c = n(66010),
        l = n(40459);
      void 0 === globalThis.caches &&
        (globalThis.caches = {
          open: () =>
            Promise.resolve({
              match: () => Promise.resolve(null),
              put: () => Promise.resolve(),
              delete: () => Promise.resolve(!1),
            }),
          has: () => Promise.resolve(!1),
          delete: () => Promise.resolve(!1),
        });
      let d = l.env.UPSTASH_REDIS_REST_URL,
        h = l.env.UPSTASH_REDIS_REST_TOKEN,
        u = null,
        y = !1;
      function f() {
        return (
          y ||
            ((u = (function () {
              if (!d || !h)
                return (
                  console.warn(
                    "[Redis Client] Missing Redis URL or Token in environment variables. Redis client will not be initialized.",
                  ),
                  null
                );
              try {
                return new o.Q({
                  url: d,
                  token: h,
                  retry: { retries: 3, backoff: (e) => Math.min(50 * e, 1e3) },
                });
              } catch (e) {
                return (
                  console.error(
                    "[Redis Client] Error during Redis client instantiation:",
                    e,
                  ),
                  null
                );
              }
            })()) ||
              console.warn(
                "Upstash Redis client could not be initialized. Features requiring Redis may not work.",
              ),
            (y = !0)),
          u
        );
      }
      f();
      class g {
        getPrefixedKey(e) {
          return "".concat(this.redisKeyPrefix).concat(e);
        }
        async get(e) {
          if (this.redisClientInternal) {
            let t = this.getPrefixedKey(e);
            try {
              let e = await this.redisClientInternal.get(t);
              if (null != e) return e;
            } catch (e) {
              console.error(
                "CacheManager: Redis get error for key ".concat(t, ":"),
                e,
              );
            }
          }
          return this.lruCache.get(e) || null;
        }
        async set(e, t, n) {
          if (this.redisClientInternal) {
            let r = this.getPrefixedKey(e);
            try {
              await this.redisClientInternal.set(r, t, { ex: n || 3600 });
            } catch (e) {
              console.error(
                "CacheManager: Redis set error for key ".concat(r, ":"),
                e,
              );
            }
          }
          this.lruCache.set(e, t, { ttl: n ? 1e3 * n : void 0 });
        }
        async delete(e) {
          if (this.redisClientInternal) {
            let t = this.getPrefixedKey(e);
            try {
              await this.redisClientInternal.del(t);
            } catch (e) {
              console.error(
                "CacheManager: Redis delete error for key ".concat(t, ":"),
                e,
              );
            }
          }
          this.lruCache.delete(e);
        }
        async clear() {
          if (this.redisClientInternal) {
            let e = 0;
            try {
              do {
                let t = await this.redisClientInternal.scan(e, {
                    match: "".concat(this.redisKeyPrefix, "*"),
                    count: 100,
                  }),
                  n = Number(t[0]),
                  r = t[1];
                r.length > 0 && (await this.redisClientInternal.del(...r)),
                  (e = n);
              } while (0 !== e);
            } catch (e) {
              console.error(
                'CacheManager: Error clearing Redis keys with prefix "'.concat(
                  this.redisKeyPrefix,
                  '":',
                ),
                e,
              );
            }
          }
          this.lruCache.clear();
        }
        constructor(e = {}) {
          (this.redisClientInternal = null),
            (this.redisClientInternal = f()),
            this.redisClientInternal ||
              console.warn(
                "[CacheManager] Redis client is not available. CacheManager will operate in LRU-only mode.",
              ),
            (this.redisKeyPrefix = e.redisKeyPrefix || "cacheManager:"),
            (this.lruCache = new c.q({
              max: e.maxSize || 500,
              ttl: e.ttl || 36e5,
            }));
        }
      }
      let m = new g();
      class p {
        async deepResearch(e, t) {
          try {
            let n = "research:".concat(
                JSON.stringify({ query: e, options: t }),
              ),
              r = await m.get(n);
            if (r) return r;
            let a = (await this.getRelevantContent(e, t))
                .map((e) => e.content)
                .join("\n---\n"),
              i = this.getSystemPrompt(t.depth || "detailed"),
              s = (
                await this.openai.chat.completions.create({
                  model: "gpt-4-turbo-preview",
                  messages: [
                    { role: "system", content: i },
                    {
                      role: "user",
                      content: "Research Query: "
                        .concat(e, "\n\nContext:\n")
                        .concat(a),
                    },
                  ],
                  temperature: 0.3,
                  max_tokens: 3e3,
                })
              ).choices[0].message.content;
            if (!s) throw Error("Failed to generate research");
            return await m.set(n, s, 3600), s;
          } catch (e) {
            throw (console.error("Research error:", e), e);
          }
        }
        getSystemPrompt(e) {
          let t =
            "You are an expert immigration research system. Analyze the provided information and generate a comprehensive research report.\n\nInstructions:\n1. Structure the analysis clearly with sections and subsections\n2. Focus on accuracy and detail\n3. Cite specific requirements and conditions\n4. Include relevant timelines and deadlines\n5. Note any exceptions or special cases\n6. Consider cost implications\n7. Reference official sources when available\n8. Highlight key points and takeaways";
          switch (e) {
            case "basic":
              return "".concat(
                t,
                "\n\nProvide a basic overview focusing on key points and essential information.",
              );
            case "comprehensive":
              return "".concat(
                t,
                "\n\nProvide an exhaustive analysis including:\n- Historical context and policy evolution\n- Comparative analysis with similar policies\n- Statistical data and trends\n- Expert opinions and interpretations\n- Future outlook and potential changes\n- Risk analysis and mitigation strategies\n- Alternative pathways and options\n- Case studies and precedents",
              );
            default:
              return "".concat(
                t,
                "\n\nProvide a detailed analysis balancing depth with clarity.",
              );
          }
        }
        async getRelevantContent(e, t) {
          let { data: n, error: r } = await this.supabase
            .from("documents")
            .select("*")
            .textSearch("content", e)
            .eq("country", t.country || "")
            .eq("category", t.category || "")
            .limit(10);
          if (r) throw r;
          return n || [];
        }
        constructor(e, t) {
          (this.openai = new s.z4({ apiKey: e })), (this.supabase = t);
        }
      }
      var w = n(14985),
        v = n(36839),
        C = n(40459);
      function b() {
        let [e, t] = (0, a.useState)(!1),
          [n, s] = (0, a.useState)(null),
          o = (0, w.Iw)(),
          c = new p(C.env.NEXT_PUBLIC_OPENAI_API_KEY || "", o),
          l = async (e, n) => {
            t(!0);
            try {
              let t = await c.deepResearch(e, n);
              s(t), v.oR.success("Research completed successfully");
            } catch (e) {
              console.error("Research error:", e),
                v.oR.error(
                  e instanceof Error
                    ? e.message
                    : "Failed to complete research",
                ),
                s("Failed to complete research. Please try again.");
            } finally {
              t(!1);
            }
          };
        return (0, r.jsxs)("div", {
          className: "container mx-auto py-8",
          children: [
            (0, r.jsx)("h1", {
              className: "text-3xl font-bold mb-8",
              children: "Deep Immigration Research",
            }),
            (0, r.jsx)(i.c, { onResearch: l, isLoading: e, results: n }),
          ],
        });
      }
    },
  },
  (e) => {
    var t = (t) => e((e.s = t));
    e.O(0, [4223, 3209, 6593, 7358], () => t(40147)), (_N_E = e.O());
  },
]);
