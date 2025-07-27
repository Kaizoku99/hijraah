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
    (e._sentryDebugIds[t] = "0875bd08-852a-4b33-8a05-c156a0ad4dd4"),
    (e._sentryDebugIdIdentifier =
      "sentry-dbid-0875bd08-852a-4b33-8a05-c156a0ad4dd4"));
} catch (e) {}
("use strict");
(exports.id = 3346),
  (exports.ids = [3346]),
  (exports.modules = {
    27758: (e, t, s) => {
      s.d(t, { aK: () => i });
      var n = s(77598);
      let i = n.webcrypto?.subtle || {};
    },
    73346: (e, t, s) => {
      s.d(t, { Q: () => sR });
      var n = s(27758),
        i = Object.defineProperty;
      ((e, t) => {
        for (var s in t) i(e, s, { get: t[s], enumerable: !0 });
      })({}, { UpstashError: () => r, UrlError: () => c });
      var r = class extends Error {
          constructor(e) {
            super(e), (this.name = "UpstashError");
          }
        },
        c = class extends Error {
          constructor(e) {
            super(
              `Upstash Redis client was passed an invalid URL. You should pass a URL starting with https. Received: "${e}". `,
            ),
              (this.name = "UrlError");
          }
        };
      function o(e) {
        try {
          return (function e(t) {
            let s = Array.isArray(t)
              ? t.map((t) => {
                  try {
                    return e(t);
                  } catch {
                    return t;
                  }
                })
              : JSON.parse(t);
            return "number" == typeof s && s.toString() !== t ? t : s;
          })(e);
        } catch {
          return e;
        }
      }
      function h(e) {
        return [e[0], ...o(e.slice(1))];
      }
      function a(e) {
        let [t, s] = e,
          n = [];
        for (let e = 0; e < s.length; e += 2)
          n.push({ key: s[e], type: s[e + 1] });
        return [t, n];
      }
      var p = class {
        baseUrl;
        headers;
        options;
        readYourWrites;
        upstashSyncToken = "";
        hasCredentials;
        retry;
        constructor(e) {
          if (
            ((this.options = {
              backend: e.options?.backend,
              agent: e.agent,
              responseEncoding: e.responseEncoding ?? "base64",
              cache: e.cache,
              signal: e.signal,
              keepAlive: e.keepAlive ?? !0,
            }),
            (this.upstashSyncToken = ""),
            (this.readYourWrites = e.readYourWrites ?? !0),
            (this.baseUrl = (e.baseUrl || "").replace(/\/$/, "")),
            this.baseUrl && !/^https?:\/\/[^\s#$./?].\S*$/.test(this.baseUrl))
          )
            throw new c(this.baseUrl);
          (this.headers = { "Content-Type": "application/json", ...e.headers }),
            (this.hasCredentials = !!(
              this.baseUrl && this.headers.authorization.split(" ")[1]
            )),
            "base64" === this.options.responseEncoding &&
              (this.headers["Upstash-Encoding"] = "base64"),
            (this.retry =
              "boolean" != typeof e.retry || e.retry
                ? {
                    attempts: e.retry?.retries ?? 5,
                    backoff: e.retry?.backoff ?? ((e) => 50 * Math.exp(e)),
                  }
                : { attempts: 1, backoff: () => 0 });
        }
        mergeTelemetry(e) {
          (this.headers = d(
            this.headers,
            "Upstash-Telemetry-Runtime",
            e.runtime,
          )),
            (this.headers = d(
              this.headers,
              "Upstash-Telemetry-Platform",
              e.platform,
            )),
            (this.headers = d(this.headers, "Upstash-Telemetry-Sdk", e.sdk));
        }
        async request(e) {
          let t = (function (...e) {
              let t = {};
              for (let s of e)
                if (s)
                  for (let [e, n] of Object.entries(s)) null != n && (t[e] = n);
              return t;
            })(this.headers, e.headers ?? {}),
            s = [this.baseUrl, ...(e.path ?? [])].join("/"),
            n = "text/event-stream" === t.Accept,
            i = {
              cache: this.options.cache,
              method: "POST",
              headers: t,
              body: JSON.stringify(e.body),
              keepalive: this.options.keepAlive,
              agent: this.options.agent,
              signal: e.signal ?? this.options.signal,
              backend: this.options.backend,
            };
          if (
            (this.hasCredentials ||
              console.warn(
                "[Upstash Redis] Redis client was initialized without url or token. Failed to execute command.",
              ),
            this.readYourWrites)
          ) {
            let e = this.upstashSyncToken;
            this.headers["upstash-sync-token"] = e;
          }
          let c = null,
            o = null;
          for (let e = 0; e <= this.retry.attempts; e++)
            try {
              c = await fetch(s, i);
              break;
            } catch (t) {
              if (this.options.signal?.aborted) {
                c = new Response(
                  new Blob([
                    JSON.stringify({
                      result: this.options.signal.reason ?? "Aborted",
                    }),
                  ]),
                  {
                    status: 200,
                    statusText: this.options.signal.reason ?? "Aborted",
                  },
                );
                break;
              }
              (o = t),
                e < this.retry.attempts &&
                  (await new Promise((t) =>
                    setTimeout(t, this.retry.backoff(e)),
                  ));
            }
          if (!c) throw o ?? Error("Exhausted all retries");
          if (!c.ok) {
            let t = await c.json();
            throw new r(`${t.error}, command was: ${JSON.stringify(e.body)}`);
          }
          if (this.readYourWrites) {
            let e = c.headers;
            this.upstashSyncToken = e.get("upstash-sync-token") ?? "";
          }
          if (n && e && e.onMessage && c.body) {
            let t = c.body.getReader(),
              s = new TextDecoder();
            return (
              (async () => {
                try {
                  for (;;) {
                    let { value: n, done: i } = await t.read();
                    if (i) break;
                    for (let t of s.decode(n).split("\n"))
                      if (t.startsWith("data: ")) {
                        let s = t.slice(6);
                        e.onMessage?.(s);
                      }
                  }
                } catch (e) {
                  (e instanceof Error && "AbortError" === e.name) ||
                    console.error("Stream reading error:", e);
                } finally {
                  try {
                    await t.cancel();
                  } catch {}
                }
              })(),
              { result: 1 }
            );
          }
          let h = await c.json();
          if (this.readYourWrites) {
            let e = c.headers;
            this.upstashSyncToken = e.get("upstash-sync-token") ?? "";
          }
          return "base64" === this.options.responseEncoding
            ? Array.isArray(h)
              ? h.map(({ result: e, error: t }) => ({ result: u(e), error: t }))
              : { result: u(h.result), error: h.error }
            : h;
        }
      };
      function l(e) {
        let t = "";
        try {
          let s = atob(e),
            n = s.length,
            i = new Uint8Array(n);
          for (let e = 0; e < n; e++) i[e] = s.charCodeAt(e);
          t = new TextDecoder().decode(i);
        } catch {
          t = e;
        }
        return t;
      }
      function u(e) {
        let t;
        switch (typeof e) {
          case "undefined":
            return e;
          case "number":
            t = e;
            break;
          case "object":
            t = Array.isArray(e)
              ? e.map((e) =>
                  "string" == typeof e
                    ? l(e)
                    : Array.isArray(e)
                      ? e.map((e) => u(e))
                      : e,
                )
              : null;
            break;
          case "string":
            t = "OK" === e ? "OK" : l(e);
        }
        return t;
      }
      function d(e, t, s) {
        return s && (e[t] = e[t] ? [e[t], s].join(",") : s), e;
      }
      var m = (e) => {
          switch (typeof e) {
            case "string":
            case "number":
            case "boolean":
              return e;
            default:
              return JSON.stringify(e);
          }
        },
        x = class {
          command;
          serialize;
          deserialize;
          headers;
          path;
          onMessage;
          isStreaming;
          signal;
          constructor(e, t) {
            if (
              ((this.serialize = m),
              (this.deserialize =
                t?.automaticDeserialization === void 0 ||
                t.automaticDeserialization
                  ? (t?.deserialize ?? o)
                  : (e) => e),
              (this.command = e.map((e) => this.serialize(e))),
              (this.headers = t?.headers),
              (this.path = t?.path),
              (this.onMessage = t?.streamOptions?.onMessage),
              (this.isStreaming = t?.streamOptions?.isStreaming ?? !1),
              (this.signal = t?.streamOptions?.signal),
              t?.latencyLogging)
            ) {
              let e = this.exec.bind(this);
              this.exec = async (t) => {
                let s = performance.now(),
                  n = await e(t),
                  i = (performance.now() - s).toFixed(2);
                return (
                  console.log(
                    `Latency for \x1b[38;2;19;185;39m${this.command[0].toString().toUpperCase()}\x1b[0m: \x1b[38;2;0;255;255m${i} ms\x1b[0m`,
                  ),
                  n
                );
              };
            }
          }
          async exec(e) {
            let { result: t, error: s } = await e.request({
              body: this.command,
              path: this.path,
              upstashSyncToken: e.upstashSyncToken,
              headers: this.headers,
              onMessage: this.onMessage,
              isStreaming: this.isStreaming,
              signal: this.signal,
            });
            if (s) throw new r(s);
            if (void 0 === t)
              throw TypeError("Request did not return a result");
            return this.deserialize(t);
          }
        },
        w = class extends x {
          constructor(e, t) {
            let s = ["hrandfield", e[0]];
            "number" == typeof e[1] && s.push(e[1]),
              e[2] && s.push("WITHVALUES"),
              super(s, {
                deserialize: e[2]
                  ? (e) =>
                      (function (e) {
                        if (0 === e.length) return null;
                        let t = {};
                        for (let s = 0; s < e.length; s += 2) {
                          let n = e[s],
                            i = e[s + 1];
                          try {
                            t[n] = JSON.parse(i);
                          } catch {
                            t[n] = i;
                          }
                        }
                        return t;
                      })(e)
                  : t?.deserialize,
                ...t,
              });
          }
        },
        y = class extends x {
          constructor(e, t) {
            super(["append", ...e], t);
          }
        },
        g = class extends x {
          constructor([e, t, s], n) {
            let i = ["bitcount", e];
            "number" == typeof t && i.push(t),
              "number" == typeof s && i.push(s),
              super(i, n);
          }
        },
        O = class {
          constructor(e, t, s, n = (e) => e.exec(this.client)) {
            (this.client = t),
              (this.opts = s),
              (this.execOperation = n),
              (this.command = ["bitfield", ...e]);
          }
          command;
          chain(...e) {
            return this.command.push(...e), this;
          }
          get(...e) {
            return this.chain("get", ...e);
          }
          set(...e) {
            return this.chain("set", ...e);
          }
          incrby(...e) {
            return this.chain("incrby", ...e);
          }
          overflow(e) {
            return this.chain("overflow", e);
          }
          exec() {
            let e = new x(this.command, this.opts);
            return this.execOperation(e);
          }
        },
        b = class extends x {
          constructor(e, t) {
            super(["bitop", ...e], t);
          }
        },
        f = class extends x {
          constructor(e, t) {
            super(["bitpos", ...e], t);
          }
        },
        E = class extends x {
          constructor([e, t, s], n) {
            super(["COPY", e, t, ...(s?.replace ? ["REPLACE"] : [])], {
              ...n,
              deserialize: (e) => (e > 0 ? "COPIED" : "NOT_COPIED"),
            });
          }
        },
        S = class extends x {
          constructor(e) {
            super(["dbsize"], e);
          }
        },
        A = class extends x {
          constructor(e, t) {
            super(["decr", ...e], t);
          }
        },
        T = class extends x {
          constructor(e, t) {
            super(["decrby", ...e], t);
          }
        },
        R = class extends x {
          constructor(e, t) {
            super(["del", ...e], t);
          }
        },
        v = class extends x {
          constructor(e, t) {
            super(["echo", ...e], t);
          }
        },
        N = class extends x {
          constructor([e, t, s], n) {
            super(["eval_ro", e, t.length, ...t, ...(s ?? [])], n);
          }
        },
        k = class extends x {
          constructor([e, t, s], n) {
            super(["eval", e, t.length, ...t, ...(s ?? [])], n);
          }
        },
        z = class extends x {
          constructor([e, t, s], n) {
            super(["evalsha_ro", e, t.length, ...t, ...(s ?? [])], n);
          }
        },
        I = class extends x {
          constructor([e, t, s], n) {
            super(["evalsha", e, t.length, ...t, ...(s ?? [])], n);
          }
        },
        U = class extends x {
          constructor(e, t) {
            super(
              e.map((e) => ("string" == typeof e ? e : String(e))),
              t,
            );
          }
        },
        C = class extends x {
          constructor(e, t) {
            super(["exists", ...e], t);
          }
        },
        P = class extends x {
          constructor(e, t) {
            super(["expire", ...e.filter(Boolean)], t);
          }
        },
        L = class extends x {
          constructor(e, t) {
            super(["expireat", ...e], t);
          }
        },
        M = class extends x {
          constructor(e, t) {
            let s = ["flushall"];
            e && e.length > 0 && e[0].async && s.push("async"), super(s, t);
          }
        },
        D = class extends x {
          constructor([e], t) {
            let s = ["flushdb"];
            e?.async && s.push("async"), super(s, t);
          }
        },
        J = class extends x {
          constructor([e, t, ...s], n) {
            let i = ["geoadd", e];
            "nx" in t && t.nx
              ? i.push("nx")
              : "xx" in t && t.xx && i.push("xx"),
              "ch" in t && t.ch && i.push("ch"),
              "latitude" in t &&
                t.latitude &&
                i.push(t.longitude, t.latitude, t.member),
              i.push(
                ...s.flatMap(({ latitude: e, longitude: t, member: s }) => [
                  t,
                  e,
                  s,
                ]),
              ),
              super(i, n);
          }
        },
        F = class extends x {
          constructor([e, t, s, n = "M"], i) {
            super(["GEODIST", e, t, s, n], i);
          }
        },
        Y = class extends x {
          constructor(e, t) {
            let [s] = e;
            super(
              ["GEOHASH", s, ...(Array.isArray(e[1]) ? e[1] : e.slice(1))],
              t,
            );
          }
        },
        _ = class extends x {
          constructor(e, t) {
            let [s] = e;
            super(["GEOPOS", s, ...(Array.isArray(e[1]) ? e[1] : e.slice(1))], {
              deserialize: (e) =>
                (function (e) {
                  let t = [];
                  for (let s of e)
                    s?.[0] &&
                      s?.[1] &&
                      t.push({
                        lng: Number.parseFloat(s[0]),
                        lat: Number.parseFloat(s[1]),
                      });
                  return t;
                })(e),
              ...t,
            });
          }
        },
        j = class extends x {
          constructor([e, t, s, n, i], r) {
            let c = ["GEOSEARCH", e];
            ("FROMMEMBER" === t.type || "frommember" === t.type) &&
              c.push(t.type, t.member),
              ("FROMLONLAT" === t.type || "fromlonlat" === t.type) &&
                c.push(t.type, t.coordinate.lon, t.coordinate.lat),
              ("BYRADIUS" === s.type || "byradius" === s.type) &&
                c.push(s.type, s.radius, s.radiusType),
              ("BYBOX" === s.type || "bybox" === s.type) &&
                c.push(s.type, s.rect.width, s.rect.height, s.rectType),
              c.push(n),
              i?.count &&
                c.push("COUNT", i.count.limit, ...(i.count.any ? ["ANY"] : [])),
              super(
                [
                  ...c,
                  ...(i?.withCoord ? ["WITHCOORD"] : []),
                  ...(i?.withDist ? ["WITHDIST"] : []),
                  ...(i?.withHash ? ["WITHHASH"] : []),
                ],
                {
                  deserialize: (e) =>
                    i?.withCoord || i?.withDist || i?.withHash
                      ? e.map((e) => {
                          let t = 1,
                            s = {};
                          try {
                            s.member = JSON.parse(e[0]);
                          } catch {
                            s.member = e[0];
                          }
                          return (
                            i.withDist && (s.dist = Number.parseFloat(e[t++])),
                            i.withHash && (s.hash = e[t++].toString()),
                            i.withCoord &&
                              (s.coord = {
                                long: Number.parseFloat(e[t][0]),
                                lat: Number.parseFloat(e[t][1]),
                              }),
                            s
                          );
                        })
                      : e.map((e) => {
                          try {
                            return { member: JSON.parse(e) };
                          } catch {
                            return { member: e };
                          }
                        }),
                  ...r,
                },
              );
          }
        },
        $ = class extends x {
          constructor([e, t, s, n, i, r], c) {
            let o = ["GEOSEARCHSTORE", e, t];
            ("FROMMEMBER" === s.type || "frommember" === s.type) &&
              o.push(s.type, s.member),
              ("FROMLONLAT" === s.type || "fromlonlat" === s.type) &&
                o.push(s.type, s.coordinate.lon, s.coordinate.lat),
              ("BYRADIUS" === n.type || "byradius" === n.type) &&
                o.push(n.type, n.radius, n.radiusType),
              ("BYBOX" === n.type || "bybox" === n.type) &&
                o.push(n.type, n.rect.width, n.rect.height, n.rectType),
              o.push(i),
              r?.count &&
                o.push("COUNT", r.count.limit, ...(r.count.any ? ["ANY"] : [])),
              super([...o, ...(r?.storeDist ? ["STOREDIST"] : [])], c);
          }
        },
        W = class extends x {
          constructor(e, t) {
            super(["get", ...e], t);
          }
        },
        X = class extends x {
          constructor(e, t) {
            super(["getbit", ...e], t);
          }
        },
        G = class extends x {
          constructor(e, t) {
            super(["getdel", ...e], t);
          }
        },
        H = class extends x {
          constructor([e, t], s) {
            let n = ["getex", e];
            t &&
              ("ex" in t && "number" == typeof t.ex
                ? n.push("ex", t.ex)
                : "px" in t && "number" == typeof t.px
                  ? n.push("px", t.px)
                  : "exat" in t && "number" == typeof t.exat
                    ? n.push("exat", t.exat)
                    : "pxat" in t && "number" == typeof t.pxat
                      ? n.push("pxat", t.pxat)
                      : "persist" in t && t.persist && n.push("persist")),
              super(n, s);
          }
        },
        K = class extends x {
          constructor(e, t) {
            super(["getrange", ...e], t);
          }
        },
        B = class extends x {
          constructor(e, t) {
            super(["getset", ...e], t);
          }
        },
        q = class extends x {
          constructor(e, t) {
            super(["hdel", ...e], t);
          }
        },
        V = class extends x {
          constructor(e, t) {
            super(["hexists", ...e], t);
          }
        },
        Q = class extends x {
          constructor(e, t) {
            let [s, n, i, r] = e,
              c = Array.isArray(n) ? n : [n];
            super(
              ["hexpire", s, i, ...(r ? [r] : []), "FIELDS", c.length, ...c],
              t,
            );
          }
        },
        Z = class extends x {
          constructor(e, t) {
            let [s, n, i, r] = e,
              c = Array.isArray(n) ? n : [n];
            super(
              ["hexpireat", s, i, ...(r ? [r] : []), "FIELDS", c.length, ...c],
              t,
            );
          }
        },
        ee = class extends x {
          constructor(e, t) {
            let [s, n] = e,
              i = Array.isArray(n) ? n : [n];
            super(["hexpiretime", s, "FIELDS", i.length, ...i], t);
          }
        },
        et = class extends x {
          constructor(e, t) {
            let [s, n] = e,
              i = Array.isArray(n) ? n : [n];
            super(["hpersist", s, "FIELDS", i.length, ...i], t);
          }
        },
        es = class extends x {
          constructor(e, t) {
            let [s, n, i, r] = e,
              c = Array.isArray(n) ? n : [n];
            super(
              ["hpexpire", s, i, ...(r ? [r] : []), "FIELDS", c.length, ...c],
              t,
            );
          }
        },
        en = class extends x {
          constructor(e, t) {
            let [s, n, i, r] = e,
              c = Array.isArray(n) ? n : [n];
            super(
              ["hpexpireat", s, i, ...(r ? [r] : []), "FIELDS", c.length, ...c],
              t,
            );
          }
        },
        ei = class extends x {
          constructor(e, t) {
            let [s, n] = e,
              i = Array.isArray(n) ? n : [n];
            super(["hpexpiretime", s, "FIELDS", i.length, ...i], t);
          }
        },
        er = class extends x {
          constructor(e, t) {
            let [s, n] = e,
              i = Array.isArray(n) ? n : [n];
            super(["hpttl", s, "FIELDS", i.length, ...i], t);
          }
        },
        ec = class extends x {
          constructor(e, t) {
            super(["hget", ...e], t);
          }
        },
        eo = class extends x {
          constructor(e, t) {
            super(["hgetall", ...e], {
              deserialize: (e) =>
                (function (e) {
                  if (0 === e.length) return null;
                  let t = {};
                  for (let s = 0; s < e.length; s += 2) {
                    let n = e[s],
                      i = e[s + 1];
                    try {
                      let e =
                        !Number.isNaN(Number(i)) &&
                        !Number.isSafeInteger(Number(i));
                      t[n] = e ? i : JSON.parse(i);
                    } catch {
                      t[n] = i;
                    }
                  }
                  return t;
                })(e),
              ...t,
            });
          }
        },
        eh = class extends x {
          constructor(e, t) {
            super(["hincrby", ...e], t);
          }
        },
        ea = class extends x {
          constructor(e, t) {
            super(["hincrbyfloat", ...e], t);
          }
        },
        ep = class extends x {
          constructor([e], t) {
            super(["hkeys", e], t);
          }
        },
        el = class extends x {
          constructor(e, t) {
            super(["hlen", ...e], t);
          }
        },
        eu = class extends x {
          constructor([e, ...t], s) {
            super(["hmget", e, ...t], {
              deserialize: (e) =>
                (function (e, t) {
                  if (t.every((e) => null === e)) return null;
                  let s = {};
                  for (let [n, i] of e.entries())
                    try {
                      s[i] = JSON.parse(t[n]);
                    } catch {
                      s[i] = t[n];
                    }
                  return s;
                })(t, e),
              ...s,
            });
          }
        },
        ed = class extends x {
          constructor([e, t], s) {
            super(
              ["hmset", e, ...Object.entries(t).flatMap(([e, t]) => [e, t])],
              s,
            );
          }
        },
        em = class extends x {
          constructor([e, t, s], n) {
            let i = ["hscan", e, t];
            s?.match && i.push("match", s.match),
              "number" == typeof s?.count && i.push("count", s.count),
              super(i, { deserialize: h, ...n });
          }
        },
        ex = class extends x {
          constructor([e, t], s) {
            super(
              ["hset", e, ...Object.entries(t).flatMap(([e, t]) => [e, t])],
              s,
            );
          }
        },
        ew = class extends x {
          constructor(e, t) {
            super(["hsetnx", ...e], t);
          }
        },
        ey = class extends x {
          constructor(e, t) {
            super(["hstrlen", ...e], t);
          }
        },
        eg = class extends x {
          constructor(e, t) {
            let [s, n] = e,
              i = Array.isArray(n) ? n : [n];
            super(["httl", s, "FIELDS", i.length, ...i], t);
          }
        },
        eO = class extends x {
          constructor(e, t) {
            super(["hvals", ...e], t);
          }
        },
        eb = class extends x {
          constructor(e, t) {
            super(["incr", ...e], t);
          }
        },
        ef = class extends x {
          constructor(e, t) {
            super(["incrby", ...e], t);
          }
        },
        eE = class extends x {
          constructor(e, t) {
            super(["incrbyfloat", ...e], t);
          }
        },
        eS = class extends x {
          constructor(e, t) {
            super(["JSON.ARRAPPEND", ...e], t);
          }
        },
        eA = class extends x {
          constructor(e, t) {
            super(["JSON.ARRINDEX", ...e], t);
          }
        },
        eT = class extends x {
          constructor(e, t) {
            super(["JSON.ARRINSERT", ...e], t);
          }
        },
        eR = class extends x {
          constructor(e, t) {
            super(["JSON.ARRLEN", e[0], e[1] ?? "$"], t);
          }
        },
        ev = class extends x {
          constructor(e, t) {
            super(["JSON.ARRPOP", ...e], t);
          }
        },
        eN = class extends x {
          constructor(e, t) {
            let s = e[1] ?? "$";
            super(["JSON.ARRTRIM", e[0], s, e[2] ?? 0, e[3] ?? 0], t);
          }
        },
        ek = class extends x {
          constructor(e, t) {
            super(["JSON.CLEAR", ...e], t);
          }
        },
        ez = class extends x {
          constructor(e, t) {
            super(["JSON.DEL", ...e], t);
          }
        },
        eI = class extends x {
          constructor(e, t) {
            super(["JSON.FORGET", ...e], t);
          }
        },
        eU = class extends x {
          constructor(e, t) {
            let s = ["JSON.GET"];
            "string" == typeof e[1]
              ? s.push(...e)
              : (s.push(e[0]),
                e[1] &&
                  (e[1].indent && s.push("INDENT", e[1].indent),
                  e[1].newline && s.push("NEWLINE", e[1].newline),
                  e[1].space && s.push("SPACE", e[1].space)),
                s.push(...e.slice(2))),
              super(s, t);
          }
        },
        eC = class extends x {
          constructor(e, t) {
            super(["JSON.MERGE", ...e], t);
          }
        },
        eP = class extends x {
          constructor(e, t) {
            super(["JSON.MGET", ...e[0], e[1]], t);
          }
        },
        eL = class extends x {
          constructor(e, t) {
            let s = ["JSON.MSET"];
            for (let t of e) s.push(t.key, t.path, t.value);
            super(s, t);
          }
        },
        eM = class extends x {
          constructor(e, t) {
            super(["JSON.NUMINCRBY", ...e], t);
          }
        },
        eD = class extends x {
          constructor(e, t) {
            super(["JSON.NUMMULTBY", ...e], t);
          }
        },
        eJ = class extends x {
          constructor(e, t) {
            super(["JSON.OBJKEYS", ...e], t);
          }
        },
        eF = class extends x {
          constructor(e, t) {
            super(["JSON.OBJLEN", ...e], t);
          }
        },
        eY = class extends x {
          constructor(e, t) {
            super(["JSON.RESP", ...e], t);
          }
        },
        e_ = class extends x {
          constructor(e, t) {
            let s = ["JSON.SET", e[0], e[1], e[2]];
            e[3] && (e[3].nx ? s.push("NX") : e[3].xx && s.push("XX")),
              super(s, t);
          }
        },
        ej = class extends x {
          constructor(e, t) {
            super(["JSON.STRAPPEND", ...e], t);
          }
        },
        e$ = class extends x {
          constructor(e, t) {
            super(["JSON.STRLEN", ...e], t);
          }
        },
        eW = class extends x {
          constructor(e, t) {
            super(["JSON.TOGGLE", ...e], t);
          }
        },
        eX = class extends x {
          constructor(e, t) {
            super(["JSON.TYPE", ...e], t);
          }
        },
        eG = class extends x {
          constructor(e, t) {
            super(["keys", ...e], t);
          }
        },
        eH = class extends x {
          constructor(e, t) {
            super(["lindex", ...e], t);
          }
        },
        eK = class extends x {
          constructor(e, t) {
            super(["linsert", ...e], t);
          }
        },
        eB = class extends x {
          constructor(e, t) {
            super(["llen", ...e], t);
          }
        },
        eq = class extends x {
          constructor(e, t) {
            super(["lmove", ...e], t);
          }
        },
        eV = class extends x {
          constructor(e, t) {
            let [s, n, i, r] = e;
            super(["LMPOP", s, ...n, i, ...(r ? ["COUNT", r] : [])], t);
          }
        },
        eQ = class extends x {
          constructor(e, t) {
            super(["lpop", ...e], t);
          }
        },
        eZ = class extends x {
          constructor(e, t) {
            let s = ["lpos", e[0], e[1]];
            "number" == typeof e[2]?.rank && s.push("rank", e[2].rank),
              "number" == typeof e[2]?.count && s.push("count", e[2].count),
              "number" == typeof e[2]?.maxLen && s.push("maxLen", e[2].maxLen),
              super(s, t);
          }
        },
        e1 = class extends x {
          constructor(e, t) {
            super(["lpush", ...e], t);
          }
        },
        e0 = class extends x {
          constructor(e, t) {
            super(["lpushx", ...e], t);
          }
        },
        e2 = class extends x {
          constructor(e, t) {
            super(["lrange", ...e], t);
          }
        },
        e5 = class extends x {
          constructor(e, t) {
            super(["lrem", ...e], t);
          }
        },
        e3 = class extends x {
          constructor(e, t) {
            super(["lset", ...e], t);
          }
        },
        e8 = class extends x {
          constructor(e, t) {
            super(["ltrim", ...e], t);
          }
        },
        e4 = class extends x {
          constructor(e, t) {
            super(["mget", ...(Array.isArray(e[0]) ? e[0] : e)], t);
          }
        },
        e6 = class extends x {
          constructor([e], t) {
            super(
              ["mset", ...Object.entries(e).flatMap(([e, t]) => [e, t])],
              t,
            );
          }
        },
        e7 = class extends x {
          constructor([e], t) {
            super(["msetnx", ...Object.entries(e).flat()], t);
          }
        },
        e9 = class extends x {
          constructor(e, t) {
            super(["persist", ...e], t);
          }
        },
        te = class extends x {
          constructor(e, t) {
            super(["pexpire", ...e], t);
          }
        },
        tt = class extends x {
          constructor(e, t) {
            super(["pexpireat", ...e], t);
          }
        },
        ts = class extends x {
          constructor(e, t) {
            super(["pfadd", ...e], t);
          }
        },
        tn = class extends x {
          constructor(e, t) {
            super(["pfcount", ...e], t);
          }
        },
        ti = class extends x {
          constructor(e, t) {
            super(["pfmerge", ...e], t);
          }
        },
        tr = class extends x {
          constructor(e, t) {
            let s = ["ping"];
            e?.[0] !== void 0 && s.push(e[0]), super(s, t);
          }
        },
        tc = class extends x {
          constructor(e, t) {
            super(["psetex", ...e], t);
          }
        },
        to = class extends x {
          constructor(e, t) {
            super(["pttl", ...e], t);
          }
        },
        th = class extends x {
          constructor(e, t) {
            super(["publish", ...e], t);
          }
        },
        ta = class extends x {
          constructor(e) {
            super(["randomkey"], e);
          }
        },
        tp = class extends x {
          constructor(e, t) {
            super(["rename", ...e], t);
          }
        },
        tl = class extends x {
          constructor(e, t) {
            super(["renamenx", ...e], t);
          }
        },
        tu = class extends x {
          constructor(e, t) {
            super(["rpop", ...e], t);
          }
        },
        td = class extends x {
          constructor(e, t) {
            super(["rpush", ...e], t);
          }
        },
        tm = class extends x {
          constructor(e, t) {
            super(["rpushx", ...e], t);
          }
        },
        tx = class extends x {
          constructor(e, t) {
            super(["sadd", ...e], t);
          }
        },
        tw = class extends x {
          constructor([e, t], s) {
            let n = ["scan", e];
            t?.match && n.push("match", t.match),
              "number" == typeof t?.count && n.push("count", t.count),
              t && "withType" in t && !0 === t.withType
                ? n.push("withtype")
                : t &&
                  "type" in t &&
                  t.type &&
                  t.type.length > 0 &&
                  n.push("type", t.type),
              super(n, { deserialize: t?.withType ? a : h, ...s });
          }
        },
        ty = class extends x {
          constructor(e, t) {
            super(["scard", ...e], t);
          }
        },
        tg = class extends x {
          constructor(e, t) {
            super(["script", "exists", ...e], { deserialize: (e) => e, ...t });
          }
        },
        tO = class extends x {
          constructor([e], t) {
            let s = ["script", "flush"];
            e?.sync ? s.push("sync") : e?.async && s.push("async"), super(s, t);
          }
        },
        tb = class extends x {
          constructor(e, t) {
            super(["script", "load", ...e], t);
          }
        },
        tf = class extends x {
          constructor(e, t) {
            super(["sdiff", ...e], t);
          }
        },
        tE = class extends x {
          constructor(e, t) {
            super(["sdiffstore", ...e], t);
          }
        },
        tS = class extends x {
          constructor([e, t, s], n) {
            let i = ["set", e, t];
            s &&
              ("nx" in s && s.nx
                ? i.push("nx")
                : "xx" in s && s.xx && i.push("xx"),
              "get" in s && s.get && i.push("get"),
              "ex" in s && "number" == typeof s.ex
                ? i.push("ex", s.ex)
                : "px" in s && "number" == typeof s.px
                  ? i.push("px", s.px)
                  : "exat" in s && "number" == typeof s.exat
                    ? i.push("exat", s.exat)
                    : "pxat" in s && "number" == typeof s.pxat
                      ? i.push("pxat", s.pxat)
                      : "keepTtl" in s && s.keepTtl && i.push("keepTtl")),
              super(i, n);
          }
        },
        tA = class extends x {
          constructor(e, t) {
            super(["setbit", ...e], t);
          }
        },
        tT = class extends x {
          constructor(e, t) {
            super(["setex", ...e], t);
          }
        },
        tR = class extends x {
          constructor(e, t) {
            super(["setnx", ...e], t);
          }
        },
        tv = class extends x {
          constructor(e, t) {
            super(["setrange", ...e], t);
          }
        },
        tN = class extends x {
          constructor(e, t) {
            super(["sinter", ...e], t);
          }
        },
        tk = class extends x {
          constructor(e, t) {
            super(["sinterstore", ...e], t);
          }
        },
        tz = class extends x {
          constructor(e, t) {
            super(["sismember", ...e], t);
          }
        },
        tI = class extends x {
          constructor(e, t) {
            super(["smembers", ...e], t);
          }
        },
        tU = class extends x {
          constructor(e, t) {
            super(["smismember", e[0], ...e[1]], t);
          }
        },
        tC = class extends x {
          constructor(e, t) {
            super(["smove", ...e], t);
          }
        },
        tP = class extends x {
          constructor([e, t], s) {
            let n = ["spop", e];
            "number" == typeof t && n.push(t), super(n, s);
          }
        },
        tL = class extends x {
          constructor([e, t], s) {
            let n = ["srandmember", e];
            "number" == typeof t && n.push(t), super(n, s);
          }
        },
        tM = class extends x {
          constructor(e, t) {
            super(["srem", ...e], t);
          }
        },
        tD = class extends x {
          constructor([e, t, s], n) {
            let i = ["sscan", e, t];
            s?.match && i.push("match", s.match),
              "number" == typeof s?.count && i.push("count", s.count),
              super(i, { deserialize: h, ...n });
          }
        },
        tJ = class extends x {
          constructor(e, t) {
            super(["strlen", ...e], t);
          }
        },
        tF = class extends x {
          constructor(e, t) {
            super(["sunion", ...e], t);
          }
        },
        tY = class extends x {
          constructor(e, t) {
            super(["sunionstore", ...e], t);
          }
        },
        t_ = class extends x {
          constructor(e) {
            super(["time"], e);
          }
        },
        tj = class extends x {
          constructor(e, t) {
            super(["touch", ...e], t);
          }
        },
        t$ = class extends x {
          constructor(e, t) {
            super(["ttl", ...e], t);
          }
        },
        tW = class extends x {
          constructor(e, t) {
            super(["type", ...e], t);
          }
        },
        tX = class extends x {
          constructor(e, t) {
            super(["unlink", ...e], t);
          }
        },
        tG = class extends x {
          constructor([e, t, s], n) {
            super(["XACK", e, t, ...(Array.isArray(s) ? [...s] : [s])], n);
          }
        },
        tH = class extends x {
          constructor([e, t, s, n], i) {
            let r = ["XADD", e];
            for (let [e, i] of (n &&
              (n.nomkStream && r.push("NOMKSTREAM"),
              n.trim &&
                (r.push(n.trim.type, n.trim.comparison, n.trim.threshold),
                void 0 !== n.trim.limit && r.push("LIMIT", n.trim.limit))),
            r.push(t),
            Object.entries(s)))
              r.push(e, i);
            super(r, i);
          }
        },
        tK = class extends x {
          constructor([e, t, s, n, i, r], c) {
            let o = [];
            r?.count && o.push("COUNT", r.count),
              r?.justId && o.push("JUSTID"),
              super(["XAUTOCLAIM", e, t, s, n, i, ...o], c);
          }
        },
        tB = class extends x {
          constructor([e, t, s, n, i, r], c) {
            let o = Array.isArray(i) ? [...i] : [i],
              h = [];
            r?.idleMS && h.push("IDLE", r.idleMS),
              r?.idleMS && h.push("TIME", r.timeMS),
              r?.retryCount && h.push("RETRYCOUNT", r.retryCount),
              r?.force && h.push("FORCE"),
              r?.justId && h.push("JUSTID"),
              r?.lastId && h.push("LASTID", r.lastId),
              super(["XCLAIM", e, t, s, n, ...o, ...h], c);
          }
        },
        tq = class extends x {
          constructor([e, t], s) {
            super(["XDEL", e, ...(Array.isArray(t) ? [...t] : [t])], s);
          }
        },
        tV = class extends x {
          constructor([e, t], s) {
            let n = ["XGROUP"];
            switch (t.type) {
              case "CREATE":
                n.push("CREATE", e, t.group, t.id),
                  t.options &&
                    (t.options.MKSTREAM && n.push("MKSTREAM"),
                    void 0 !== t.options.ENTRIESREAD &&
                      n.push("ENTRIESREAD", t.options.ENTRIESREAD.toString()));
                break;
              case "CREATECONSUMER":
                n.push("CREATECONSUMER", e, t.group, t.consumer);
                break;
              case "DELCONSUMER":
                n.push("DELCONSUMER", e, t.group, t.consumer);
                break;
              case "DESTROY":
                n.push("DESTROY", e, t.group);
                break;
              case "SETID":
                n.push("SETID", e, t.group, t.id),
                  t.options?.ENTRIESREAD !== void 0 &&
                    n.push("ENTRIESREAD", t.options.ENTRIESREAD.toString());
                break;
              default:
                throw Error("Invalid XGROUP");
            }
            super(n, s);
          }
        },
        tQ = class extends x {
          constructor([e, t], s) {
            let n = [];
            "CONSUMERS" === t.type
              ? n.push("CONSUMERS", e, t.group)
              : n.push("GROUPS", e),
              super(["XINFO", ...n], s);
          }
        },
        tZ = class extends x {
          constructor(e, t) {
            super(["XLEN", ...e], t);
          }
        },
        t1 = class extends x {
          constructor([e, t, s, n, i, r], c) {
            super(
              [
                "XPENDING",
                e,
                t,
                ...(r?.idleTime ? ["IDLE", r.idleTime] : []),
                s,
                n,
                i,
                ...(r?.consumer === void 0
                  ? []
                  : Array.isArray(r.consumer)
                    ? [...r.consumer]
                    : [r.consumer]),
              ],
              c,
            );
          }
        },
        t0 = class extends x {
          constructor([e, t, s, n], i) {
            let r = ["XRANGE", e, t, s];
            "number" == typeof n && r.push("COUNT", n),
              super(r, {
                deserialize: (e) =>
                  (function (e) {
                    let t = {};
                    for (let s of e)
                      for (let e = 0; e < s.length; e += 2) {
                        let n = s[e],
                          i = s[e + 1];
                        n in t || (t[n] = {});
                        for (let e = 0; e < i.length; e += 2) {
                          let s = i[e],
                            r = i[e + 1];
                          try {
                            t[n][s] = JSON.parse(r);
                          } catch {
                            t[n][s] = r;
                          }
                        }
                      }
                    return t;
                  })(e),
                ...i,
              });
          }
        },
        t2 = class extends x {
          constructor([e, t, s], n) {
            if (Array.isArray(e) && Array.isArray(t) && e.length !== t.length)
              throw Error(
                "ERR Unbalanced XREAD list of streams: for each stream key an ID or '$' must be specified",
              );
            let i = [];
            "number" == typeof s?.count && i.push("COUNT", s.count),
              "number" == typeof s?.blockMS && i.push("BLOCK", s.blockMS),
              i.push(
                "STREAMS",
                ...(Array.isArray(e) ? [...e] : [e]),
                ...(Array.isArray(t) ? [...t] : [t]),
              ),
              super(["XREAD", ...i], n);
          }
        },
        t5 = class extends x {
          constructor([e, t, s, n, i], r) {
            if (Array.isArray(s) && Array.isArray(n) && s.length !== n.length)
              throw Error(
                "ERR Unbalanced XREADGROUP list of streams: for each stream key an ID or '$' must be specified",
              );
            let c = [];
            "number" == typeof i?.count && c.push("COUNT", i.count),
              "number" == typeof i?.blockMS && c.push("BLOCK", i.blockMS),
              "boolean" == typeof i?.NOACK && i.NOACK && c.push("NOACK"),
              c.push(
                "STREAMS",
                ...(Array.isArray(s) ? [...s] : [s]),
                ...(Array.isArray(n) ? [...n] : [n]),
              ),
              super(["XREADGROUP", "GROUP", e, t, ...c], r);
          }
        },
        t3 = class extends x {
          constructor([e, t, s, n], i) {
            let r = ["XREVRANGE", e, t, s];
            "number" == typeof n && r.push("COUNT", n),
              super(r, {
                deserialize: (e) =>
                  (function (e) {
                    let t = {};
                    for (let s of e)
                      for (let e = 0; e < s.length; e += 2) {
                        let n = s[e],
                          i = s[e + 1];
                        n in t || (t[n] = {});
                        for (let e = 0; e < i.length; e += 2) {
                          let s = i[e],
                            r = i[e + 1];
                          try {
                            t[n][s] = JSON.parse(r);
                          } catch {
                            t[n][s] = r;
                          }
                        }
                      }
                    return t;
                  })(e),
                ...i,
              });
          }
        },
        t8 = class extends x {
          constructor([e, t], s) {
            let { limit: n, strategy: i, threshold: r, exactness: c = "~" } = t;
            super(["XTRIM", e, i, c, r, ...(n ? ["LIMIT", n] : [])], s);
          }
        },
        t4 = class extends x {
          constructor([e, t, ...s], n) {
            let i = ["zadd", e];
            "nx" in t && t.nx
              ? i.push("nx")
              : "xx" in t && t.xx && i.push("xx"),
              "ch" in t && t.ch && i.push("ch"),
              "incr" in t && t.incr && i.push("incr"),
              "lt" in t && t.lt
                ? i.push("lt")
                : "gt" in t && t.gt && i.push("gt"),
              "score" in t && "member" in t && i.push(t.score, t.member),
              i.push(...s.flatMap(({ score: e, member: t }) => [e, t])),
              super(i, n);
          }
        },
        t6 = class extends x {
          constructor(e, t) {
            super(["zcard", ...e], t);
          }
        },
        t7 = class extends x {
          constructor(e, t) {
            super(["zcount", ...e], t);
          }
        },
        t9 = class extends x {
          constructor(e, t) {
            super(["zincrby", ...e], t);
          }
        },
        se = class extends x {
          constructor([e, t, s, n], i) {
            let r = ["zinterstore", e, t];
            Array.isArray(s) ? r.push(...s) : r.push(s),
              n &&
                ("weights" in n && n.weights
                  ? r.push("weights", ...n.weights)
                  : "weight" in n &&
                    "number" == typeof n.weight &&
                    r.push("weights", n.weight),
                "aggregate" in n && r.push("aggregate", n.aggregate)),
              super(r, i);
          }
        },
        st = class extends x {
          constructor(e, t) {
            super(["zlexcount", ...e], t);
          }
        },
        ss = class extends x {
          constructor([e, t], s) {
            let n = ["zpopmax", e];
            "number" == typeof t && n.push(t), super(n, s);
          }
        },
        sn = class extends x {
          constructor([e, t], s) {
            let n = ["zpopmin", e];
            "number" == typeof t && n.push(t), super(n, s);
          }
        },
        si = class extends x {
          constructor([e, t, s, n], i) {
            let r = ["zrange", e, t, s];
            n?.byScore && r.push("byscore"),
              n?.byLex && r.push("bylex"),
              n?.rev && r.push("rev"),
              n?.count !== void 0 &&
                void 0 !== n.offset &&
                r.push("limit", n.offset, n.count),
              n?.withScores && r.push("withscores"),
              super(r, i);
          }
        },
        sr = class extends x {
          constructor(e, t) {
            super(["zrank", ...e], t);
          }
        },
        sc = class extends x {
          constructor(e, t) {
            super(["zrem", ...e], t);
          }
        },
        so = class extends x {
          constructor(e, t) {
            super(["zremrangebylex", ...e], t);
          }
        },
        sh = class extends x {
          constructor(e, t) {
            super(["zremrangebyrank", ...e], t);
          }
        },
        sa = class extends x {
          constructor(e, t) {
            super(["zremrangebyscore", ...e], t);
          }
        },
        sp = class extends x {
          constructor(e, t) {
            super(["zrevrank", ...e], t);
          }
        },
        sl = class extends x {
          constructor([e, t, s], n) {
            let i = ["zscan", e, t];
            s?.match && i.push("match", s.match),
              "number" == typeof s?.count && i.push("count", s.count),
              super(i, { deserialize: h, ...n });
          }
        },
        su = class extends x {
          constructor(e, t) {
            super(["zscore", ...e], t);
          }
        },
        sd = class extends x {
          constructor([e, t, s], n) {
            let i = ["zunion", e];
            Array.isArray(t) ? i.push(...t) : i.push(t),
              s &&
                ("weights" in s && s.weights
                  ? i.push("weights", ...s.weights)
                  : "weight" in s &&
                    "number" == typeof s.weight &&
                    i.push("weights", s.weight),
                "aggregate" in s && i.push("aggregate", s.aggregate),
                s.withScores && i.push("withscores")),
              super(i, n);
          }
        },
        sm = class extends x {
          constructor([e, t, s, n], i) {
            let r = ["zunionstore", e, t];
            Array.isArray(s) ? r.push(...s) : r.push(s),
              n &&
                ("weights" in n && n.weights
                  ? r.push("weights", ...n.weights)
                  : "weight" in n &&
                    "number" == typeof n.weight &&
                    r.push("weights", n.weight),
                "aggregate" in n && r.push("aggregate", n.aggregate)),
              super(r, i);
          }
        },
        sx = class extends x {
          constructor(e, t) {
            super(["zdiffstore", ...e], t);
          }
        },
        sw = class extends x {
          constructor(e, t) {
            let [s, n] = e;
            super(["zmscore", s, ...n], t);
          }
        },
        sy = class {
          client;
          commands;
          commandOptions;
          multiExec;
          constructor(e) {
            if (
              ((this.client = e.client),
              (this.commands = []),
              (this.commandOptions = e.commandOptions),
              (this.multiExec = e.multiExec ?? !1),
              this.commandOptions?.latencyLogging)
            ) {
              let e = this.exec.bind(this);
              this.exec = async (t) => {
                let s = performance.now(),
                  n = await (t ? e(t) : e()),
                  i = (performance.now() - s).toFixed(2);
                return (
                  console.log(
                    `Latency for \x1b[38;2;19;185;39m${this.multiExec ? ["MULTI-EXEC"] : ["PIPELINE"].toString().toUpperCase()}\x1b[0m: \x1b[38;2;0;255;255m${i} ms\x1b[0m`,
                  ),
                  n
                );
              };
            }
          }
          exec = async (e) => {
            if (0 === this.commands.length) throw Error("Pipeline is empty");
            let t = this.multiExec ? ["multi-exec"] : ["pipeline"],
              s = await this.client.request({
                path: t,
                body: Object.values(this.commands).map((e) => e.command),
              });
            return e?.keepErrors
              ? s.map(({ error: e, result: t }, s) => ({
                  error: e,
                  result: this.commands[s].deserialize(t),
                }))
              : s.map(({ error: e, result: t }, s) => {
                  if (e)
                    throw new r(
                      `Command ${s + 1} [ ${this.commands[s].command[0]} ] failed: ${e}`,
                    );
                  return this.commands[s].deserialize(t);
                });
          };
          length() {
            return this.commands.length;
          }
          chain(e) {
            return this.commands.push(e), this;
          }
          append = (...e) => this.chain(new y(e, this.commandOptions));
          bitcount = (...e) => this.chain(new g(e, this.commandOptions));
          bitfield = (...e) =>
            new O(e, this.client, this.commandOptions, this.chain.bind(this));
          bitop = (e, t, s, ...n) =>
            this.chain(new b([e, t, s, ...n], this.commandOptions));
          bitpos = (...e) => this.chain(new f(e, this.commandOptions));
          copy = (...e) => this.chain(new E(e, this.commandOptions));
          zdiffstore = (...e) => this.chain(new sx(e, this.commandOptions));
          dbsize = () => this.chain(new S(this.commandOptions));
          decr = (...e) => this.chain(new A(e, this.commandOptions));
          decrby = (...e) => this.chain(new T(e, this.commandOptions));
          del = (...e) => this.chain(new R(e, this.commandOptions));
          echo = (...e) => this.chain(new v(e, this.commandOptions));
          evalRo = (...e) => this.chain(new N(e, this.commandOptions));
          eval = (...e) => this.chain(new k(e, this.commandOptions));
          evalshaRo = (...e) => this.chain(new z(e, this.commandOptions));
          evalsha = (...e) => this.chain(new I(e, this.commandOptions));
          exists = (...e) => this.chain(new C(e, this.commandOptions));
          expire = (...e) => this.chain(new P(e, this.commandOptions));
          expireat = (...e) => this.chain(new L(e, this.commandOptions));
          flushall = (e) => this.chain(new M(e, this.commandOptions));
          flushdb = (...e) => this.chain(new D(e, this.commandOptions));
          geoadd = (...e) => this.chain(new J(e, this.commandOptions));
          geodist = (...e) => this.chain(new F(e, this.commandOptions));
          geopos = (...e) => this.chain(new _(e, this.commandOptions));
          geohash = (...e) => this.chain(new Y(e, this.commandOptions));
          geosearch = (...e) => this.chain(new j(e, this.commandOptions));
          geosearchstore = (...e) => this.chain(new $(e, this.commandOptions));
          get = (...e) => this.chain(new W(e, this.commandOptions));
          getbit = (...e) => this.chain(new X(e, this.commandOptions));
          getdel = (...e) => this.chain(new G(e, this.commandOptions));
          getex = (...e) => this.chain(new H(e, this.commandOptions));
          getrange = (...e) => this.chain(new K(e, this.commandOptions));
          getset = (e, t) => this.chain(new B([e, t], this.commandOptions));
          hdel = (...e) => this.chain(new q(e, this.commandOptions));
          hexists = (...e) => this.chain(new V(e, this.commandOptions));
          hexpire = (...e) => this.chain(new Q(e, this.commandOptions));
          hexpireat = (...e) => this.chain(new Z(e, this.commandOptions));
          hexpiretime = (...e) => this.chain(new ee(e, this.commandOptions));
          httl = (...e) => this.chain(new eg(e, this.commandOptions));
          hpexpire = (...e) => this.chain(new es(e, this.commandOptions));
          hpexpireat = (...e) => this.chain(new en(e, this.commandOptions));
          hpexpiretime = (...e) => this.chain(new ei(e, this.commandOptions));
          hpttl = (...e) => this.chain(new er(e, this.commandOptions));
          hpersist = (...e) => this.chain(new et(e, this.commandOptions));
          hget = (...e) => this.chain(new ec(e, this.commandOptions));
          hgetall = (...e) => this.chain(new eo(e, this.commandOptions));
          hincrby = (...e) => this.chain(new eh(e, this.commandOptions));
          hincrbyfloat = (...e) => this.chain(new ea(e, this.commandOptions));
          hkeys = (...e) => this.chain(new ep(e, this.commandOptions));
          hlen = (...e) => this.chain(new el(e, this.commandOptions));
          hmget = (...e) => this.chain(new eu(e, this.commandOptions));
          hmset = (e, t) => this.chain(new ed([e, t], this.commandOptions));
          hrandfield = (e, t, s) =>
            this.chain(new w([e, t, s], this.commandOptions));
          hscan = (...e) => this.chain(new em(e, this.commandOptions));
          hset = (e, t) => this.chain(new ex([e, t], this.commandOptions));
          hsetnx = (e, t, s) =>
            this.chain(new ew([e, t, s], this.commandOptions));
          hstrlen = (...e) => this.chain(new ey(e, this.commandOptions));
          hvals = (...e) => this.chain(new eO(e, this.commandOptions));
          incr = (...e) => this.chain(new eb(e, this.commandOptions));
          incrby = (...e) => this.chain(new ef(e, this.commandOptions));
          incrbyfloat = (...e) => this.chain(new eE(e, this.commandOptions));
          keys = (...e) => this.chain(new eG(e, this.commandOptions));
          lindex = (...e) => this.chain(new eH(e, this.commandOptions));
          linsert = (e, t, s, n) =>
            this.chain(new eK([e, t, s, n], this.commandOptions));
          llen = (...e) => this.chain(new eB(e, this.commandOptions));
          lmove = (...e) => this.chain(new eq(e, this.commandOptions));
          lpop = (...e) => this.chain(new eQ(e, this.commandOptions));
          lmpop = (...e) => this.chain(new eV(e, this.commandOptions));
          lpos = (...e) => this.chain(new eZ(e, this.commandOptions));
          lpush = (e, ...t) =>
            this.chain(new e1([e, ...t], this.commandOptions));
          lpushx = (e, ...t) =>
            this.chain(new e0([e, ...t], this.commandOptions));
          lrange = (...e) => this.chain(new e2(e, this.commandOptions));
          lrem = (e, t, s) =>
            this.chain(new e5([e, t, s], this.commandOptions));
          lset = (e, t, s) =>
            this.chain(new e3([e, t, s], this.commandOptions));
          ltrim = (...e) => this.chain(new e8(e, this.commandOptions));
          mget = (...e) => this.chain(new e4(e, this.commandOptions));
          mset = (e) => this.chain(new e6([e], this.commandOptions));
          msetnx = (e) => this.chain(new e7([e], this.commandOptions));
          persist = (...e) => this.chain(new e9(e, this.commandOptions));
          pexpire = (...e) => this.chain(new te(e, this.commandOptions));
          pexpireat = (...e) => this.chain(new tt(e, this.commandOptions));
          pfadd = (...e) => this.chain(new ts(e, this.commandOptions));
          pfcount = (...e) => this.chain(new tn(e, this.commandOptions));
          pfmerge = (...e) => this.chain(new ti(e, this.commandOptions));
          ping = (e) => this.chain(new tr(e, this.commandOptions));
          psetex = (e, t, s) =>
            this.chain(new tc([e, t, s], this.commandOptions));
          pttl = (...e) => this.chain(new to(e, this.commandOptions));
          publish = (...e) => this.chain(new th(e, this.commandOptions));
          randomkey = () => this.chain(new ta(this.commandOptions));
          rename = (...e) => this.chain(new tp(e, this.commandOptions));
          renamenx = (...e) => this.chain(new tl(e, this.commandOptions));
          rpop = (...e) => this.chain(new tu(e, this.commandOptions));
          rpush = (e, ...t) =>
            this.chain(new td([e, ...t], this.commandOptions));
          rpushx = (e, ...t) =>
            this.chain(new tm([e, ...t], this.commandOptions));
          sadd = (e, t, ...s) =>
            this.chain(new tx([e, t, ...s], this.commandOptions));
          scan = (...e) => this.chain(new tw(e, this.commandOptions));
          scard = (...e) => this.chain(new ty(e, this.commandOptions));
          scriptExists = (...e) => this.chain(new tg(e, this.commandOptions));
          scriptFlush = (...e) => this.chain(new tO(e, this.commandOptions));
          scriptLoad = (...e) => this.chain(new tb(e, this.commandOptions));
          sdiff = (...e) => this.chain(new tf(e, this.commandOptions));
          sdiffstore = (...e) => this.chain(new tE(e, this.commandOptions));
          set = (e, t, s) => this.chain(new tS([e, t, s], this.commandOptions));
          setbit = (...e) => this.chain(new tA(e, this.commandOptions));
          setex = (e, t, s) =>
            this.chain(new tT([e, t, s], this.commandOptions));
          setnx = (e, t) => this.chain(new tR([e, t], this.commandOptions));
          setrange = (...e) => this.chain(new tv(e, this.commandOptions));
          sinter = (...e) => this.chain(new tN(e, this.commandOptions));
          sinterstore = (...e) => this.chain(new tk(e, this.commandOptions));
          sismember = (e, t) => this.chain(new tz([e, t], this.commandOptions));
          smembers = (...e) => this.chain(new tI(e, this.commandOptions));
          smismember = (e, t) =>
            this.chain(new tU([e, t], this.commandOptions));
          smove = (e, t, s) =>
            this.chain(new tC([e, t, s], this.commandOptions));
          spop = (...e) => this.chain(new tP(e, this.commandOptions));
          srandmember = (...e) => this.chain(new tL(e, this.commandOptions));
          srem = (e, ...t) =>
            this.chain(new tM([e, ...t], this.commandOptions));
          sscan = (...e) => this.chain(new tD(e, this.commandOptions));
          strlen = (...e) => this.chain(new tJ(e, this.commandOptions));
          sunion = (...e) => this.chain(new tF(e, this.commandOptions));
          sunionstore = (...e) => this.chain(new tY(e, this.commandOptions));
          time = () => this.chain(new t_(this.commandOptions));
          touch = (...e) => this.chain(new tj(e, this.commandOptions));
          ttl = (...e) => this.chain(new t$(e, this.commandOptions));
          type = (...e) => this.chain(new tW(e, this.commandOptions));
          unlink = (...e) => this.chain(new tX(e, this.commandOptions));
          zadd = (...e) => (
            "score" in e[1],
            this.chain(new t4([e[0], e[1], ...e.slice(2)], this.commandOptions))
          );
          xadd = (...e) => this.chain(new tH(e, this.commandOptions));
          xack = (...e) => this.chain(new tG(e, this.commandOptions));
          xdel = (...e) => this.chain(new tq(e, this.commandOptions));
          xgroup = (...e) => this.chain(new tV(e, this.commandOptions));
          xread = (...e) => this.chain(new t2(e, this.commandOptions));
          xreadgroup = (...e) => this.chain(new t5(e, this.commandOptions));
          xinfo = (...e) => this.chain(new tQ(e, this.commandOptions));
          xlen = (...e) => this.chain(new tZ(e, this.commandOptions));
          xpending = (...e) => this.chain(new t1(e, this.commandOptions));
          xclaim = (...e) => this.chain(new tB(e, this.commandOptions));
          xautoclaim = (...e) => this.chain(new tK(e, this.commandOptions));
          xtrim = (...e) => this.chain(new t8(e, this.commandOptions));
          xrange = (...e) => this.chain(new t0(e, this.commandOptions));
          xrevrange = (...e) => this.chain(new t3(e, this.commandOptions));
          zcard = (...e) => this.chain(new t6(e, this.commandOptions));
          zcount = (...e) => this.chain(new t7(e, this.commandOptions));
          zincrby = (e, t, s) =>
            this.chain(new t9([e, t, s], this.commandOptions));
          zinterstore = (...e) => this.chain(new se(e, this.commandOptions));
          zlexcount = (...e) => this.chain(new st(e, this.commandOptions));
          zmscore = (...e) => this.chain(new sw(e, this.commandOptions));
          zpopmax = (...e) => this.chain(new ss(e, this.commandOptions));
          zpopmin = (...e) => this.chain(new sn(e, this.commandOptions));
          zrange = (...e) => this.chain(new si(e, this.commandOptions));
          zrank = (e, t) => this.chain(new sr([e, t], this.commandOptions));
          zrem = (e, ...t) =>
            this.chain(new sc([e, ...t], this.commandOptions));
          zremrangebylex = (...e) => this.chain(new so(e, this.commandOptions));
          zremrangebyrank = (...e) =>
            this.chain(new sh(e, this.commandOptions));
          zremrangebyscore = (...e) =>
            this.chain(new sa(e, this.commandOptions));
          zrevrank = (e, t) => this.chain(new sp([e, t], this.commandOptions));
          zscan = (...e) => this.chain(new sl(e, this.commandOptions));
          zscore = (e, t) => this.chain(new su([e, t], this.commandOptions));
          zunionstore = (...e) => this.chain(new sm(e, this.commandOptions));
          zunion = (...e) => this.chain(new sd(e, this.commandOptions));
          get json() {
            return {
              arrappend: (...e) => this.chain(new eS(e, this.commandOptions)),
              arrindex: (...e) => this.chain(new eA(e, this.commandOptions)),
              arrinsert: (...e) => this.chain(new eT(e, this.commandOptions)),
              arrlen: (...e) => this.chain(new eR(e, this.commandOptions)),
              arrpop: (...e) => this.chain(new ev(e, this.commandOptions)),
              arrtrim: (...e) => this.chain(new eN(e, this.commandOptions)),
              clear: (...e) => this.chain(new ek(e, this.commandOptions)),
              del: (...e) => this.chain(new ez(e, this.commandOptions)),
              forget: (...e) => this.chain(new eI(e, this.commandOptions)),
              get: (...e) => this.chain(new eU(e, this.commandOptions)),
              merge: (...e) => this.chain(new eC(e, this.commandOptions)),
              mget: (...e) => this.chain(new eP(e, this.commandOptions)),
              mset: (...e) => this.chain(new eL(e, this.commandOptions)),
              numincrby: (...e) => this.chain(new eM(e, this.commandOptions)),
              nummultby: (...e) => this.chain(new eD(e, this.commandOptions)),
              objkeys: (...e) => this.chain(new eJ(e, this.commandOptions)),
              objlen: (...e) => this.chain(new eF(e, this.commandOptions)),
              resp: (...e) => this.chain(new eY(e, this.commandOptions)),
              set: (...e) => this.chain(new e_(e, this.commandOptions)),
              strappend: (...e) => this.chain(new ej(e, this.commandOptions)),
              strlen: (...e) => this.chain(new e$(e, this.commandOptions)),
              toggle: (...e) => this.chain(new eW(e, this.commandOptions)),
              type: (...e) => this.chain(new eX(e, this.commandOptions)),
            };
          }
        },
        sg = new Set([
          "scan",
          "keys",
          "flushdb",
          "flushall",
          "dbsize",
          "hscan",
          "hgetall",
          "hkeys",
          "lrange",
          "sscan",
          "smembers",
          "xrange",
          "xrevrange",
          "zscan",
          "zrange",
        ]),
        sO = class {
          pipelinePromises = new WeakMap();
          activePipeline = null;
          indexInCurrentPipeline = 0;
          redis;
          pipeline;
          pipelineCounter = 0;
          constructor(e) {
            (this.redis = e), (this.pipeline = e.pipeline());
          }
          async withAutoPipeline(e) {
            let t = this.activePipeline ?? this.redis.pipeline();
            this.activePipeline ||
              ((this.activePipeline = t), (this.indexInCurrentPipeline = 0));
            let s = this.indexInCurrentPipeline++;
            e(t);
            let n = this.deferExecution().then(() => {
                if (!this.pipelinePromises.has(t)) {
                  let e = t.exec({ keepErrors: !0 });
                  (this.pipelineCounter += 1),
                    this.pipelinePromises.set(t, e),
                    (this.activePipeline = null);
                }
                return this.pipelinePromises.get(t);
              }),
              i = (await n)[s];
            if (i.error) throw new r(`Command failed: ${i.error}`);
            return i.result;
          }
          async deferExecution() {
            await Promise.resolve(), await Promise.resolve();
          }
        },
        sb = class extends x {
          constructor(e, t) {
            super([], {
              ...t,
              headers: {
                Accept: "text/event-stream",
                "Cache-Control": "no-cache",
                Connection: "keep-alive",
              },
              path: ["psubscribe", ...e],
              streamOptions: {
                isStreaming: !0,
                onMessage: t?.streamOptions?.onMessage,
                signal: t?.streamOptions?.signal,
              },
            });
          }
        },
        sf = class extends EventTarget {
          subscriptions;
          client;
          listeners;
          constructor(e, t, s = !1) {
            for (let n of (super(),
            (this.client = e),
            (this.subscriptions = new Map()),
            (this.listeners = new Map()),
            t))
              s ? this.subscribeToPattern(n) : this.subscribeToChannel(n);
          }
          subscribeToChannel(e) {
            let t = new AbortController(),
              s = new sE([e], {
                streamOptions: {
                  signal: t.signal,
                  onMessage: (e) => this.handleMessage(e, !1),
                },
              });
            s.exec(this.client).catch((e) => {
              "AbortError" !== e.name && this.dispatchToListeners("error", e);
            }),
              this.subscriptions.set(e, {
                command: s,
                controller: t,
                isPattern: !1,
              });
          }
          subscribeToPattern(e) {
            let t = new AbortController(),
              s = new sb([e], {
                streamOptions: {
                  signal: t.signal,
                  onMessage: (e) => this.handleMessage(e, !0),
                },
              });
            s.exec(this.client).catch((e) => {
              "AbortError" !== e.name && this.dispatchToListeners("error", e);
            }),
              this.subscriptions.set(e, {
                command: s,
                controller: t,
                isPattern: !0,
              });
          }
          handleMessage(e, t) {
            let s = e.replace(/^data:\s*/, ""),
              n = s.indexOf(","),
              i = s.indexOf(",", n + 1),
              r = t ? s.indexOf(",", i + 1) : -1;
            if (-1 !== n && -1 !== i) {
              let e = s.slice(0, n);
              if (t && "pmessage" === e && -1 !== r) {
                let e = s.slice(n + 1, i),
                  t = s.slice(i + 1, r),
                  c = s.slice(r + 1);
                try {
                  let s = JSON.parse(c);
                  this.dispatchToListeners("pmessage", {
                    pattern: e,
                    channel: t,
                    message: s,
                  }),
                    this.dispatchToListeners(`pmessage:${e}`, {
                      pattern: e,
                      channel: t,
                      message: s,
                    });
                } catch (e) {
                  this.dispatchToListeners(
                    "error",
                    Error(`Failed to parse message: ${e}`),
                  );
                }
              } else {
                let t = s.slice(n + 1, i),
                  r = s.slice(i + 1);
                try {
                  if (
                    "subscribe" === e ||
                    "psubscribe" === e ||
                    "unsubscribe" === e ||
                    "punsubscribe" === e
                  ) {
                    let t = Number.parseInt(r);
                    this.dispatchToListeners(e, t);
                  } else {
                    let s = JSON.parse(r);
                    this.dispatchToListeners(e, { channel: t, message: s }),
                      this.dispatchToListeners(`${e}:${t}`, {
                        channel: t,
                        message: s,
                      });
                  }
                } catch (e) {
                  this.dispatchToListeners(
                    "error",
                    Error(`Failed to parse message: ${e}`),
                  );
                }
              }
            }
          }
          dispatchToListeners(e, t) {
            let s = this.listeners.get(e);
            if (s) for (let e of s) e(t);
          }
          on(e, t) {
            this.listeners.has(e) || this.listeners.set(e, new Set()),
              this.listeners.get(e)?.add(t);
          }
          removeAllListeners() {
            this.listeners.clear();
          }
          async unsubscribe(e) {
            if (e)
              for (let t of e) {
                let e = this.subscriptions.get(t);
                if (e) {
                  try {
                    e.controller.abort();
                  } catch {}
                  this.subscriptions.delete(t);
                }
              }
            else {
              for (let e of this.subscriptions.values())
                try {
                  e.controller.abort();
                } catch {}
              this.subscriptions.clear(), this.removeAllListeners();
            }
          }
          getSubscribedChannels() {
            return [...this.subscriptions.keys()];
          }
        },
        sE = class extends x {
          constructor(e, t) {
            super([], {
              ...t,
              headers: {
                Accept: "text/event-stream",
                "Cache-Control": "no-cache",
                Connection: "keep-alive",
              },
              path: ["subscribe", ...e],
              streamOptions: {
                isStreaming: !0,
                onMessage: t?.streamOptions?.onMessage,
                signal: t?.streamOptions?.signal,
              },
            });
          }
        },
        sS = class {
          script;
          sha1;
          redis;
          constructor(e, t) {
            (this.redis = e), (this.script = t), (this.sha1 = ""), this.init(t);
          }
          async init(e) {
            this.sha1 || (this.sha1 = await this.digest(e));
          }
          async eval(e, t) {
            return (
              await this.init(this.script),
              await this.redis.eval(this.script, e, t)
            );
          }
          async evalsha(e, t) {
            return (
              await this.init(this.script),
              await this.redis.evalsha(this.sha1, e, t)
            );
          }
          async exec(e, t) {
            return (
              await this.init(this.script),
              await this.redis.evalsha(this.sha1, e, t).catch(async (s) => {
                if (
                  s instanceof Error &&
                  s.message.toLowerCase().includes("noscript")
                )
                  return await this.redis.eval(this.script, e, t);
                throw s;
              })
            );
          }
          async digest(e) {
            let t = new TextEncoder().encode(e);
            return [...new Uint8Array(await n.aK.digest("SHA-1", t))]
              .map((e) => e.toString(16).padStart(2, "0"))
              .join("");
          }
        },
        sA = class {
          script;
          sha1;
          redis;
          constructor(e, t) {
            (this.redis = e), (this.sha1 = ""), (this.script = t), this.init(t);
          }
          async init(e) {
            this.sha1 || (this.sha1 = await this.digest(e));
          }
          async evalRo(e, t) {
            return (
              await this.init(this.script),
              await this.redis.evalRo(this.script, e, t)
            );
          }
          async evalshaRo(e, t) {
            return (
              await this.init(this.script),
              await this.redis.evalshaRo(this.sha1, e, t)
            );
          }
          async exec(e, t) {
            return (
              await this.init(this.script),
              await this.redis.evalshaRo(this.sha1, e, t).catch(async (s) => {
                if (
                  s instanceof Error &&
                  s.message.toLowerCase().includes("noscript")
                )
                  return await this.redis.evalRo(this.script, e, t);
                throw s;
              })
            );
          }
          async digest(e) {
            let t = new TextEncoder().encode(e);
            return [...new Uint8Array(await n.aK.digest("SHA-1", t))]
              .map((e) => e.toString(16).padStart(2, "0"))
              .join("");
          }
        },
        sT = class {
          client;
          opts;
          enableTelemetry;
          enableAutoPipelining;
          constructor(e, t) {
            (this.client = e),
              (this.opts = t),
              (this.enableTelemetry = t?.enableTelemetry ?? !0),
              t?.readYourWrites === !1 && (this.client.readYourWrites = !1),
              (this.enableAutoPipelining = t?.enableAutoPipelining ?? !0);
          }
          get readYourWritesSyncToken() {
            return this.client.upstashSyncToken;
          }
          set readYourWritesSyncToken(e) {
            this.client.upstashSyncToken = e;
          }
          get json() {
            return {
              arrappend: (...e) => new eS(e, this.opts).exec(this.client),
              arrindex: (...e) => new eA(e, this.opts).exec(this.client),
              arrinsert: (...e) => new eT(e, this.opts).exec(this.client),
              arrlen: (...e) => new eR(e, this.opts).exec(this.client),
              arrpop: (...e) => new ev(e, this.opts).exec(this.client),
              arrtrim: (...e) => new eN(e, this.opts).exec(this.client),
              clear: (...e) => new ek(e, this.opts).exec(this.client),
              del: (...e) => new ez(e, this.opts).exec(this.client),
              forget: (...e) => new eI(e, this.opts).exec(this.client),
              get: (...e) => new eU(e, this.opts).exec(this.client),
              merge: (...e) => new eC(e, this.opts).exec(this.client),
              mget: (...e) => new eP(e, this.opts).exec(this.client),
              mset: (...e) => new eL(e, this.opts).exec(this.client),
              numincrby: (...e) => new eM(e, this.opts).exec(this.client),
              nummultby: (...e) => new eD(e, this.opts).exec(this.client),
              objkeys: (...e) => new eJ(e, this.opts).exec(this.client),
              objlen: (...e) => new eF(e, this.opts).exec(this.client),
              resp: (...e) => new eY(e, this.opts).exec(this.client),
              set: (...e) => new e_(e, this.opts).exec(this.client),
              strappend: (...e) => new ej(e, this.opts).exec(this.client),
              strlen: (...e) => new e$(e, this.opts).exec(this.client),
              toggle: (...e) => new eW(e, this.opts).exec(this.client),
              type: (...e) => new eX(e, this.opts).exec(this.client),
            };
          }
          use = (e) => {
            let t = this.client.request.bind(this.client);
            this.client.request = (s) => e(s, t);
          };
          addTelemetry = (e) => {
            if (this.enableTelemetry)
              try {
                this.client.mergeTelemetry(e);
              } catch {}
          };
          createScript(e, t) {
            return t?.readonly ? new sA(this, e) : new sS(this, e);
          }
          pipeline = () =>
            new sy({
              client: this.client,
              commandOptions: this.opts,
              multiExec: !1,
            });
          autoPipeline = () =>
            (function e(t, s) {
              return (
                t.autoPipelineExecutor || (t.autoPipelineExecutor = new sO(t)),
                new Proxy(t, {
                  get: (t, n) => {
                    if ("pipelineCounter" === n)
                      return t.autoPipelineExecutor.pipelineCounter;
                    if ("json" === n) return e(t, !0);
                    let i = n in t && !(n in t.autoPipelineExecutor.pipeline),
                      r = sg.has(n);
                    return i || r
                      ? t[n]
                      : (
                            s
                              ? "function" ==
                                typeof t.autoPipelineExecutor.pipeline.json[n]
                              : "function" ==
                                typeof t.autoPipelineExecutor.pipeline[n]
                          )
                        ? (...e) =>
                            t.autoPipelineExecutor.withAutoPipeline((t) => {
                              s ? t.json[n](...e) : t[n](...e);
                            })
                        : t.autoPipelineExecutor.pipeline[n];
                  },
                })
              );
            })(this);
          multi = () =>
            new sy({
              client: this.client,
              commandOptions: this.opts,
              multiExec: !0,
            });
          bitfield = (...e) => new O(e, this.client, this.opts);
          append = (...e) => new y(e, this.opts).exec(this.client);
          bitcount = (...e) => new g(e, this.opts).exec(this.client);
          bitop = (e, t, s, ...n) =>
            new b([e, t, s, ...n], this.opts).exec(this.client);
          bitpos = (...e) => new f(e, this.opts).exec(this.client);
          copy = (...e) => new E(e, this.opts).exec(this.client);
          dbsize = () => new S(this.opts).exec(this.client);
          decr = (...e) => new A(e, this.opts).exec(this.client);
          decrby = (...e) => new T(e, this.opts).exec(this.client);
          del = (...e) => new R(e, this.opts).exec(this.client);
          echo = (...e) => new v(e, this.opts).exec(this.client);
          evalRo = (...e) => new N(e, this.opts).exec(this.client);
          eval = (...e) => new k(e, this.opts).exec(this.client);
          evalshaRo = (...e) => new z(e, this.opts).exec(this.client);
          evalsha = (...e) => new I(e, this.opts).exec(this.client);
          exec = (e) => new U(e, this.opts).exec(this.client);
          exists = (...e) => new C(e, this.opts).exec(this.client);
          expire = (...e) => new P(e, this.opts).exec(this.client);
          expireat = (...e) => new L(e, this.opts).exec(this.client);
          flushall = (e) => new M(e, this.opts).exec(this.client);
          flushdb = (...e) => new D(e, this.opts).exec(this.client);
          geoadd = (...e) => new J(e, this.opts).exec(this.client);
          geopos = (...e) => new _(e, this.opts).exec(this.client);
          geodist = (...e) => new F(e, this.opts).exec(this.client);
          geohash = (...e) => new Y(e, this.opts).exec(this.client);
          geosearch = (...e) => new j(e, this.opts).exec(this.client);
          geosearchstore = (...e) => new $(e, this.opts).exec(this.client);
          get = (...e) => new W(e, this.opts).exec(this.client);
          getbit = (...e) => new X(e, this.opts).exec(this.client);
          getdel = (...e) => new G(e, this.opts).exec(this.client);
          getex = (...e) => new H(e, this.opts).exec(this.client);
          getrange = (...e) => new K(e, this.opts).exec(this.client);
          getset = (e, t) => new B([e, t], this.opts).exec(this.client);
          hdel = (...e) => new q(e, this.opts).exec(this.client);
          hexists = (...e) => new V(e, this.opts).exec(this.client);
          hexpire = (...e) => new Q(e, this.opts).exec(this.client);
          hexpireat = (...e) => new Z(e, this.opts).exec(this.client);
          hexpiretime = (...e) => new ee(e, this.opts).exec(this.client);
          httl = (...e) => new eg(e, this.opts).exec(this.client);
          hpexpire = (...e) => new es(e, this.opts).exec(this.client);
          hpexpireat = (...e) => new en(e, this.opts).exec(this.client);
          hpexpiretime = (...e) => new ei(e, this.opts).exec(this.client);
          hpttl = (...e) => new er(e, this.opts).exec(this.client);
          hpersist = (...e) => new et(e, this.opts).exec(this.client);
          hget = (...e) => new ec(e, this.opts).exec(this.client);
          hgetall = (...e) => new eo(e, this.opts).exec(this.client);
          hincrby = (...e) => new eh(e, this.opts).exec(this.client);
          hincrbyfloat = (...e) => new ea(e, this.opts).exec(this.client);
          hkeys = (...e) => new ep(e, this.opts).exec(this.client);
          hlen = (...e) => new el(e, this.opts).exec(this.client);
          hmget = (...e) => new eu(e, this.opts).exec(this.client);
          hmset = (e, t) => new ed([e, t], this.opts).exec(this.client);
          hrandfield = (e, t, s) =>
            new w([e, t, s], this.opts).exec(this.client);
          hscan = (...e) => new em(e, this.opts).exec(this.client);
          hset = (e, t) => new ex([e, t], this.opts).exec(this.client);
          hsetnx = (e, t, s) => new ew([e, t, s], this.opts).exec(this.client);
          hstrlen = (...e) => new ey(e, this.opts).exec(this.client);
          hvals = (...e) => new eO(e, this.opts).exec(this.client);
          incr = (...e) => new eb(e, this.opts).exec(this.client);
          incrby = (...e) => new ef(e, this.opts).exec(this.client);
          incrbyfloat = (...e) => new eE(e, this.opts).exec(this.client);
          keys = (...e) => new eG(e, this.opts).exec(this.client);
          lindex = (...e) => new eH(e, this.opts).exec(this.client);
          linsert = (e, t, s, n) =>
            new eK([e, t, s, n], this.opts).exec(this.client);
          llen = (...e) => new eB(e, this.opts).exec(this.client);
          lmove = (...e) => new eq(e, this.opts).exec(this.client);
          lpop = (...e) => new eQ(e, this.opts).exec(this.client);
          lmpop = (...e) => new eV(e, this.opts).exec(this.client);
          lpos = (...e) => new eZ(e, this.opts).exec(this.client);
          lpush = (e, ...t) => new e1([e, ...t], this.opts).exec(this.client);
          lpushx = (e, ...t) => new e0([e, ...t], this.opts).exec(this.client);
          lrange = (...e) => new e2(e, this.opts).exec(this.client);
          lrem = (e, t, s) => new e5([e, t, s], this.opts).exec(this.client);
          lset = (e, t, s) => new e3([e, t, s], this.opts).exec(this.client);
          ltrim = (...e) => new e8(e, this.opts).exec(this.client);
          mget = (...e) => new e4(e, this.opts).exec(this.client);
          mset = (e) => new e6([e], this.opts).exec(this.client);
          msetnx = (e) => new e7([e], this.opts).exec(this.client);
          persist = (...e) => new e9(e, this.opts).exec(this.client);
          pexpire = (...e) => new te(e, this.opts).exec(this.client);
          pexpireat = (...e) => new tt(e, this.opts).exec(this.client);
          pfadd = (...e) => new ts(e, this.opts).exec(this.client);
          pfcount = (...e) => new tn(e, this.opts).exec(this.client);
          pfmerge = (...e) => new ti(e, this.opts).exec(this.client);
          ping = (e) => new tr(e, this.opts).exec(this.client);
          psetex = (e, t, s) => new tc([e, t, s], this.opts).exec(this.client);
          psubscribe = (e) => {
            let t = Array.isArray(e) ? e : [e];
            return new sf(this.client, t, !0);
          };
          pttl = (...e) => new to(e, this.opts).exec(this.client);
          publish = (...e) => new th(e, this.opts).exec(this.client);
          randomkey = () => new ta().exec(this.client);
          rename = (...e) => new tp(e, this.opts).exec(this.client);
          renamenx = (...e) => new tl(e, this.opts).exec(this.client);
          rpop = (...e) => new tu(e, this.opts).exec(this.client);
          rpush = (e, ...t) => new td([e, ...t], this.opts).exec(this.client);
          rpushx = (e, ...t) => new tm([e, ...t], this.opts).exec(this.client);
          sadd = (e, t, ...s) =>
            new tx([e, t, ...s], this.opts).exec(this.client);
          scan(e, t) {
            return new tw([e, t], this.opts).exec(this.client);
          }
          scard = (...e) => new ty(e, this.opts).exec(this.client);
          scriptExists = (...e) => new tg(e, this.opts).exec(this.client);
          scriptFlush = (...e) => new tO(e, this.opts).exec(this.client);
          scriptLoad = (...e) => new tb(e, this.opts).exec(this.client);
          sdiff = (...e) => new tf(e, this.opts).exec(this.client);
          sdiffstore = (...e) => new tE(e, this.opts).exec(this.client);
          set = (e, t, s) => new tS([e, t, s], this.opts).exec(this.client);
          setbit = (...e) => new tA(e, this.opts).exec(this.client);
          setex = (e, t, s) => new tT([e, t, s], this.opts).exec(this.client);
          setnx = (e, t) => new tR([e, t], this.opts).exec(this.client);
          setrange = (...e) => new tv(e, this.opts).exec(this.client);
          sinter = (...e) => new tN(e, this.opts).exec(this.client);
          sinterstore = (...e) => new tk(e, this.opts).exec(this.client);
          sismember = (e, t) => new tz([e, t], this.opts).exec(this.client);
          smismember = (e, t) => new tU([e, t], this.opts).exec(this.client);
          smembers = (...e) => new tI(e, this.opts).exec(this.client);
          smove = (e, t, s) => new tC([e, t, s], this.opts).exec(this.client);
          spop = (...e) => new tP(e, this.opts).exec(this.client);
          srandmember = (...e) => new tL(e, this.opts).exec(this.client);
          srem = (e, ...t) => new tM([e, ...t], this.opts).exec(this.client);
          sscan = (...e) => new tD(e, this.opts).exec(this.client);
          strlen = (...e) => new tJ(e, this.opts).exec(this.client);
          subscribe = (e) => {
            let t = Array.isArray(e) ? e : [e];
            return new sf(this.client, t);
          };
          sunion = (...e) => new tF(e, this.opts).exec(this.client);
          sunionstore = (...e) => new tY(e, this.opts).exec(this.client);
          time = () => new t_().exec(this.client);
          touch = (...e) => new tj(e, this.opts).exec(this.client);
          ttl = (...e) => new t$(e, this.opts).exec(this.client);
          type = (...e) => new tW(e, this.opts).exec(this.client);
          unlink = (...e) => new tX(e, this.opts).exec(this.client);
          xadd = (...e) => new tH(e, this.opts).exec(this.client);
          xack = (...e) => new tG(e, this.opts).exec(this.client);
          xdel = (...e) => new tq(e, this.opts).exec(this.client);
          xgroup = (...e) => new tV(e, this.opts).exec(this.client);
          xread = (...e) => new t2(e, this.opts).exec(this.client);
          xreadgroup = (...e) => new t5(e, this.opts).exec(this.client);
          xinfo = (...e) => new tQ(e, this.opts).exec(this.client);
          xlen = (...e) => new tZ(e, this.opts).exec(this.client);
          xpending = (...e) => new t1(e, this.opts).exec(this.client);
          xclaim = (...e) => new tB(e, this.opts).exec(this.client);
          xautoclaim = (...e) => new tK(e, this.opts).exec(this.client);
          xtrim = (...e) => new t8(e, this.opts).exec(this.client);
          xrange = (...e) => new t0(e, this.opts).exec(this.client);
          xrevrange = (...e) => new t3(e, this.opts).exec(this.client);
          zadd = (...e) => (
            "score" in e[1],
            new t4([e[0], e[1], ...e.slice(2)], this.opts).exec(this.client)
          );
          zcard = (...e) => new t6(e, this.opts).exec(this.client);
          zcount = (...e) => new t7(e, this.opts).exec(this.client);
          zdiffstore = (...e) => new sx(e, this.opts).exec(this.client);
          zincrby = (e, t, s) => new t9([e, t, s], this.opts).exec(this.client);
          zinterstore = (...e) => new se(e, this.opts).exec(this.client);
          zlexcount = (...e) => new st(e, this.opts).exec(this.client);
          zmscore = (...e) => new sw(e, this.opts).exec(this.client);
          zpopmax = (...e) => new ss(e, this.opts).exec(this.client);
          zpopmin = (...e) => new sn(e, this.opts).exec(this.client);
          zrange = (...e) => new si(e, this.opts).exec(this.client);
          zrank = (e, t) => new sr([e, t], this.opts).exec(this.client);
          zrem = (e, ...t) => new sc([e, ...t], this.opts).exec(this.client);
          zremrangebylex = (...e) => new so(e, this.opts).exec(this.client);
          zremrangebyrank = (...e) => new sh(e, this.opts).exec(this.client);
          zremrangebyscore = (...e) => new sa(e, this.opts).exec(this.client);
          zrevrank = (e, t) => new sp([e, t], this.opts).exec(this.client);
          zscan = (...e) => new sl(e, this.opts).exec(this.client);
          zscore = (e, t) => new su([e, t], this.opts).exec(this.client);
          zunion = (...e) => new sd(e, this.opts).exec(this.client);
          zunionstore = (...e) => new sm(e, this.opts).exec(this.client);
        };
      "undefined" == typeof atob &&
        (global.atob = (e) => Buffer.from(e, "base64").toString("utf8"));
      var sR = class e extends sT {
        constructor(e) {
          if ("request" in e) return void super(e);
          if (
            (e.url
              ? (e.url.startsWith(" ") ||
                  e.url.endsWith(" ") ||
                  /\r|\n/.test(e.url)) &&
                console.warn(
                  "[Upstash Redis] The redis url contains whitespace or newline, which can cause errors!",
                )
              : console.warn(
                  "[Upstash Redis] The 'url' property is missing or undefined in your Redis config.",
                ),
            e.token
              ? (e.token.startsWith(" ") ||
                  e.token.endsWith(" ") ||
                  /\r|\n/.test(e.token)) &&
                console.warn(
                  "[Upstash Redis] The redis token contains whitespace or newline, which can cause errors!",
                )
              : console.warn(
                  "[Upstash Redis] The 'token' property is missing or undefined in your Redis config.",
                ),
            super(
              new p({
                baseUrl: e.url,
                retry: e.retry,
                headers: { authorization: `Bearer ${e.token}` },
                agent: e.agent,
                responseEncoding: e.responseEncoding,
                cache: e.cache ?? "no-store",
                signal: e.signal,
                keepAlive: e.keepAlive,
                readYourWrites: e.readYourWrites,
              }),
              {
                automaticDeserialization: e.automaticDeserialization,
                enableTelemetry: !process.env.UPSTASH_DISABLE_TELEMETRY,
                latencyLogging: e.latencyLogging,
                enableAutoPipelining: e.enableAutoPipelining,
              },
            ),
            this.addTelemetry({
              runtime:
                "string" == typeof EdgeRuntime
                  ? "edge-light"
                  : `node@${process.version}`,
              platform: process.env.VERCEL
                ? "vercel"
                : process.env.AWS_REGION
                  ? "aws"
                  : "unknown",
              sdk: "@upstash/redis@v1.35.0",
            }),
            this.enableAutoPipelining)
          )
            return this.autoPipeline();
        }
        static fromEnv(t) {
          if (void 0 === process.env)
            throw TypeError(
              '[Upstash Redis] Unable to get environment variables, `process.env` is undefined. If you are deploying to cloudflare, please import from "@upstash/redis/cloudflare" instead',
            );
          let s =
            process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
          s ||
            console.warn(
              "[Upstash Redis] Unable to find environment variable: `UPSTASH_REDIS_REST_URL`",
            );
          let n =
            process.env.UPSTASH_REDIS_REST_TOKEN ||
            process.env.KV_REST_API_TOKEN;
          return (
            n ||
              console.warn(
                "[Upstash Redis] Unable to find environment variable: `UPSTASH_REDIS_REST_TOKEN`",
              ),
            new e({ ...t, url: s, token: n })
          );
        }
      };
    },
  });
//# sourceMappingURL=3346.js.map
