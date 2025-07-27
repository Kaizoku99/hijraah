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
    (e._sentryDebugIds[t] = "072ea4ca-8a1b-4c26-a8fb-418fed5121f5"),
    (e._sentryDebugIdIdentifier =
      "sentry-dbid-072ea4ca-8a1b-4c26-a8fb-418fed5121f5"));
} catch (e) {}
(exports.id = 4486),
  (exports.ids = [4486]),
  (exports.modules = {
    3954: (e, t, r) => {
      "use strict";
      e.exports = r(31756).vendored.contexts.HeadManagerContext;
    },
    8502: (e, t, r) => {
      "use strict";
      r.d(t, {
        B: () => h,
        I: () => C,
        O: () => l,
        S: () => X,
        U: () => s,
        a: () => d,
        b: () => u,
        c: () => z,
        d: () => H,
        e: () => c,
        f: () => U,
        g: () => $,
        i: () => y,
        m: () => f,
        n: () => V,
        o: () => W,
        r: () => j,
        s: () => I,
        t: () => k,
        u: () => M,
        z: () => R,
      });
      var n = r(84205),
        a = r(54502),
        i = Object.prototype.hasOwnProperty;
      let u = new WeakMap(),
        o = () => {},
        s = o(),
        l = Object,
        c = (e) => e === s,
        d = (e) => "function" == typeof e,
        f = (e, t) => ({ ...e, ...t }),
        h = (e) => d(e.then),
        p = {},
        b = {},
        g = "undefined",
        y = !1,
        v = typeof document != g,
        _ = !1,
        m = () => y && typeof window.requestAnimationFrame != g,
        R = (e, t) => {
          let r = u.get(e);
          return [
            () => (!c(t) && e.get(t)) || p,
            (n) => {
              if (!c(t)) {
                let a = e.get(t);
                t in b || (b[t] = a), r[5](t, f(a, n), a || p);
              }
            },
            r[6],
            () => (!c(t) && t in b ? b[t] : (!c(t) && e.get(t)) || p),
          ];
        },
        E = !0,
        [w, O] =
          y && window.addEventListener
            ? [
                window.addEventListener.bind(window),
                window.removeEventListener.bind(window),
              ]
            : [o, o],
        S = {
          initFocus: (e) => (
            v && document.addEventListener("visibilitychange", e),
            w("focus", e),
            () => {
              v && document.removeEventListener("visibilitychange", e),
                O("focus", e);
            }
          ),
          initReconnect: (e) => {
            let t = () => {
                (E = !0), e();
              },
              r = () => {
                E = !1;
              };
            return (
              w("online", t),
              w("offline", r),
              () => {
                O("online", t), O("offline", r);
              }
            );
          },
        },
        C = !n.useId,
        j = !y || _,
        k = (e) => (m() ? window.requestAnimationFrame(e) : setTimeout(e, 1)),
        M = j ? n.useEffect : n.useLayoutEffect,
        T = "undefined" != typeof navigator && navigator.connection,
        x =
          !j &&
          T &&
          (["slow-2g", "2g"].includes(T.effectiveType) || T.saveData),
        P = new WeakMap(),
        D = (e, t) => l.prototype.toString.call(e) === `[object ${t}]`,
        L = 0,
        A = (e) => {
          let t,
            r,
            n = typeof e,
            a = D(e, "Date"),
            i = D(e, "RegExp"),
            u = D(e, "Object");
          if (l(e) !== e || a || i)
            t = a
              ? e.toJSON()
              : "symbol" == n
                ? e.toString()
                : "string" == n
                  ? JSON.stringify(e)
                  : "" + e;
          else {
            if ((t = P.get(e))) return t;
            if (((t = ++L + "~"), P.set(e, t), Array.isArray(e))) {
              for (r = 0, t = "@"; r < e.length; r++) t += A(e[r]) + ",";
              P.set(e, t);
            }
            if (u) {
              t = "#";
              let n = l.keys(e).sort();
              for (; !c((r = n.pop())); )
                c(e[r]) || (t += r + ":" + A(e[r]) + ",");
              P.set(e, t);
            }
          }
          return t;
        },
        I = (e) => {
          if (d(e))
            try {
              e = e();
            } catch (t) {
              e = "";
            }
          let t = e;
          return [
            (e =
              "string" == typeof e
                ? e
                : (Array.isArray(e) ? e.length : e)
                  ? A(e)
                  : ""),
            t,
          ];
        },
        F = 0,
        W = () => ++F;
      async function V(...e) {
        let [t, r, n, i] = e,
          o = f(
            { populateCache: !0, throwOnError: !0 },
            "boolean" == typeof i ? { revalidate: i } : i || {},
          ),
          l = o.populateCache,
          p = o.rollbackOnError,
          b = o.optimisticData,
          g = (e) => ("function" == typeof p ? p(e) : !1 !== p),
          y = o.throwOnError;
        if (d(r)) {
          let e = [];
          for (let n of t.keys())
            !/^\$(inf|sub)\$/.test(n) && r(t.get(n)._k) && e.push(n);
          return Promise.all(e.map(v));
        }
        return v(r);
        async function v(r) {
          let i,
            [f] = I(r);
          if (!f) return;
          let [p, v] = R(t, f),
            [_, m, E, w] = u.get(t),
            O = () => {
              let e = _[f];
              return (d(o.revalidate)
                ? o.revalidate(p().data, r)
                : !1 !== o.revalidate) && (delete E[f], delete w[f], e && e[0])
                ? e[0](a.q2).then(() => p().data)
                : p().data;
            };
          if (e.length < 3) return O();
          let S = n,
            C = W();
          m[f] = [C, 0];
          let j = !c(b),
            k = p(),
            M = k.data,
            T = k._c,
            x = c(T) ? M : T;
          if ((j && v({ data: (b = d(b) ? b(x, M) : b), _c: x }), d(S)))
            try {
              S = S(x);
            } catch (e) {
              i = e;
            }
          if (S && h(S)) {
            if (
              ((S = await S.catch((e) => {
                i = e;
              })),
              C !== m[f][0])
            ) {
              if (i) throw i;
              return S;
            }
            i && j && g(i) && ((l = !0), v({ data: x, _c: s }));
          }
          if (
            (l &&
              !i &&
              (d(l)
                ? v({ data: l(S, x), error: s, _c: s })
                : v({ data: S, error: s, _c: s })),
            (m[f][1] = W()),
            Promise.resolve(O()).then(() => {
              v({ _c: s });
            }),
            i)
          ) {
            if (y) throw i;
            return;
          }
          return S;
        }
      }
      let q = (e, t) => {
          for (let r in e) e[r][0] && e[r][0](t);
        },
        N = (e, t) => {
          if (!u.has(e)) {
            let r = f(S, t),
              n = Object.create(null),
              i = V.bind(s, e),
              l = o,
              c = Object.create(null),
              d = (e, t) => {
                let r = c[e] || [];
                return (c[e] = r), r.push(t), () => r.splice(r.indexOf(t), 1);
              },
              h = (t, r, n) => {
                e.set(t, r);
                let a = c[t];
                if (a) for (let e of a) e(r, n);
              },
              p = () => {
                if (
                  !u.has(e) &&
                  (u.set(e, [
                    n,
                    Object.create(null),
                    Object.create(null),
                    Object.create(null),
                    i,
                    h,
                    d,
                  ]),
                  !j)
                ) {
                  let t = r.initFocus(setTimeout.bind(s, q.bind(s, n, a.CC))),
                    i = r.initReconnect(setTimeout.bind(s, q.bind(s, n, a.jB)));
                  l = () => {
                    t && t(), i && i(), u.delete(e);
                  };
                }
              };
            return p(), [e, i, p, l];
          }
          return [e, u.get(e)[4]];
        },
        [z, B] = N(new Map()),
        H = f(
          {
            onLoadingSlow: o,
            onSuccess: o,
            onError: o,
            onErrorRetry: (e, t, r, n, a) => {
              let i = r.errorRetryCount,
                u = a.retryCount,
                o =
                  ~~((Math.random() + 0.5) * (1 << (u < 8 ? u : 8))) *
                  r.errorRetryInterval;
              (c(i) || !(u > i)) && setTimeout(n, o, a);
            },
            onDiscarded: o,
            revalidateOnFocus: !0,
            revalidateOnReconnect: !0,
            revalidateIfStale: !0,
            shouldRetryOnError: !0,
            errorRetryInterval: x ? 1e4 : 5e3,
            focusThrottleInterval: 5e3,
            dedupingInterval: 2e3,
            loadingTimeout: x ? 5e3 : 3e3,
            compare: function e(t, r) {
              var n, a;
              if (t === r) return !0;
              if (t && r && (n = t.constructor) === r.constructor) {
                if (n === Date) return t.getTime() === r.getTime();
                if (n === RegExp) return t.toString() === r.toString();
                if (n === Array) {
                  if ((a = t.length) === r.length)
                    for (; a-- && e(t[a], r[a]); );
                  return -1 === a;
                }
                if (!n || "object" == typeof t) {
                  for (n in ((a = 0), t))
                    if (
                      (i.call(t, n) && ++a && !i.call(r, n)) ||
                      !(n in r) ||
                      !e(t[n], r[n])
                    )
                      return !1;
                  return Object.keys(r).length === a;
                }
              }
              return t != t && r != r;
            },
            isPaused: () => !1,
            cache: z,
            mutate: B,
            fallback: {},
          },
          {
            isOnline: () => E,
            isVisible: () => {
              let e = v && document.visibilityState;
              return c(e) || "hidden" !== e;
            },
          },
        ),
        U = (e, t) => {
          let r = f(e, t);
          if (t) {
            let { use: n, fallback: a } = e,
              { use: i, fallback: u } = t;
            n && i && (r.use = n.concat(i)), a && u && (r.fallback = f(a, u));
          }
          return r;
        },
        X = (0, n.createContext)({}),
        $ = (e) => {
          let { value: t } = e,
            r = (0, n.useContext)(X),
            a = d(t),
            i = (0, n.useMemo)(() => (a ? t(r) : t), [a, r, t]),
            u = (0, n.useMemo)(() => (a ? i : U(r, i)), [a, r, i]),
            o = i && i.provider,
            l = (0, n.useRef)(s);
          o && !l.current && (l.current = N(o(u.cache || z), i));
          let c = l.current;
          return (
            c && ((u.cache = c[0]), (u.mutate = c[1])),
            M(() => {
              if (c) return c[2] && c[2](), c[3];
            }, []),
            (0, n.createElement)(X.Provider, f(e, { value: u }))
          );
        };
    },
    11316: (e, t, r) => {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 }),
        Object.defineProperty(t, "notFound", {
          enumerable: !0,
          get: function () {
            return a;
          },
        });
      let n = "" + r(17581).HTTP_ERROR_FALLBACK_ERROR_CODE + ";404";
      function a() {
        let e = Object.defineProperty(Error(n), "__NEXT_ERROR_CODE", {
          value: "E394",
          enumerable: !1,
          configurable: !0,
        });
        throw ((e.digest = n), e);
      }
      ("function" == typeof t.default ||
        ("object" == typeof t.default && null !== t.default)) &&
        void 0 === t.default.__esModule &&
        (Object.defineProperty(t.default, "__esModule", { value: !0 }),
        Object.assign(t.default, t),
        (e.exports = t.default));
    },
    14749: (e, t, r) => {
      "use strict";
      function n() {
        throw Object.defineProperty(
          Error(
            "`forbidden()` is experimental and only allowed to be enabled when `experimental.authInterrupts` is enabled.",
          ),
          "__NEXT_ERROR_CODE",
          { value: "E488", enumerable: !1, configurable: !0 },
        );
      }
      Object.defineProperty(t, "__esModule", { value: !0 }),
        Object.defineProperty(t, "forbidden", {
          enumerable: !0,
          get: function () {
            return n;
          },
        }),
        r(17581).HTTP_ERROR_FALLBACK_ERROR_CODE,
        ("function" == typeof t.default ||
          ("object" == typeof t.default && null !== t.default)) &&
          void 0 === t.default.__esModule &&
          (Object.defineProperty(t.default, "__esModule", { value: !0 }),
          Object.assign(t.default, t),
          (e.exports = t.default));
    },
    15324: (e, t, r) => {
      "use strict";
      r.a(e, async (e, n) => {
        try {
          r.d(t, { Y_: () => C, sQ: () => j });
          var a,
            i,
            u,
            o,
            s,
            l,
            c,
            d,
            f,
            h,
            p = r(84205),
            b = r(85488),
            g = r(53418),
            y = r(17407),
            v = e([b]);
          b = (v.then ? (await v)() : v)[0];
          var _ = (e, t, r) => {
              if (!t.has(e)) throw TypeError("Cannot " + r);
            },
            m = (e, t, r) => (
              _(e, t, "read from private field"), r ? r.call(e) : t.get(e)
            ),
            R = (e, t, r) => {
              if (t.has(e))
                throw TypeError(
                  "Cannot add the same private member more than once",
                );
              t instanceof WeakSet ? t.add(e) : t.set(e, r);
            },
            E = (e, t, r, n) => (
              _(e, t, "write to private field"),
              n ? n.call(e, r) : t.set(e, r),
              r
            );
          function w(e, t) {
            return null != t ? g(e, t) : e;
          }
          var O = class {
            constructor(e = []) {
              R(this, a, void 0),
                R(this, i, "ready"),
                R(this, u, void 0),
                R(this, o, new Set()),
                R(this, s, new Set()),
                R(this, l, new Set()),
                (this.pushMessage = (e) => {
                  E(this, a, m(this, a).concat(e)), m(this, c).call(this);
                }),
                (this.popMessage = () => {
                  E(this, a, m(this, a).slice(0, -1)), m(this, c).call(this);
                }),
                (this.replaceMessage = (e, t) => {
                  E(this, a, [
                    ...m(this, a).slice(0, e),
                    this.snapshot(t),
                    ...m(this, a).slice(e + 1),
                  ]),
                    m(this, c).call(this);
                }),
                (this.snapshot = (e) => structuredClone(e)),
                (this["~registerMessagesCallback"] = (e, t) => {
                  let r = t ? w(e, t) : e;
                  return (
                    m(this, o).add(r),
                    () => {
                      m(this, o).delete(r);
                    }
                  );
                }),
                (this["~registerStatusCallback"] = (e) => (
                  m(this, s).add(e),
                  () => {
                    m(this, s).delete(e);
                  }
                )),
                (this["~registerErrorCallback"] = (e) => (
                  m(this, l).add(e),
                  () => {
                    m(this, l).delete(e);
                  }
                )),
                R(this, c, () => {
                  m(this, o).forEach((e) => e());
                }),
                R(this, d, () => {
                  m(this, s).forEach((e) => e());
                }),
                R(this, f, () => {
                  m(this, l).forEach((e) => e());
                }),
                E(this, a, e);
            }
            get status() {
              return m(this, i);
            }
            set status(e) {
              E(this, i, e), m(this, d).call(this);
            }
            get error() {
              return m(this, u);
            }
            set error(e) {
              E(this, u, e), m(this, f).call(this);
            }
            get messages() {
              return m(this, a);
            }
            set messages(e) {
              E(this, a, [...e]), m(this, c).call(this);
            }
          };
          (a = new WeakMap()),
            (i = new WeakMap()),
            (u = new WeakMap()),
            (o = new WeakMap()),
            (s = new WeakMap()),
            (l = new WeakMap()),
            (c = new WeakMap()),
            (d = new WeakMap()),
            (f = new WeakMap());
          var S = class extends b.AbstractChat {
            constructor({ messages: e, ...t }) {
              let r = new O(e);
              super({ ...t, state: r }),
                R(this, h, void 0),
                (this["~registerMessagesCallback"] = (e, t) =>
                  m(this, h)["~registerMessagesCallback"](e, t)),
                (this["~registerStatusCallback"] = (e) =>
                  m(this, h)["~registerStatusCallback"](e)),
                (this["~registerErrorCallback"] = (e) =>
                  m(this, h)["~registerErrorCallback"](e)),
                E(this, h, r);
            }
          };
          function C({ experimental_throttle: e, resume: t = !1, ...r } = {}) {
            let n = (0, p.useRef)("chat" in r ? r.chat : new S(r)),
              a = (0, p.useCallback)(
                (t) => n.current["~registerMessagesCallback"](t, e),
                [e],
              ),
              i = (0, p.useSyncExternalStore)(
                a,
                () => n.current.messages,
                () => n.current.messages,
              ),
              u = (0, p.useSyncExternalStore)(
                n.current["~registerStatusCallback"],
                () => n.current.status,
                () => n.current.status,
              ),
              o = (0, p.useSyncExternalStore)(
                n.current["~registerErrorCallback"],
                () => n.current.error,
                () => n.current.error,
              ),
              s = (0, p.useCallback)(
                (e) => {
                  "function" == typeof e && (e = e(i)),
                    (n.current.messages = e);
                },
                [i, n],
              );
            return (
              (0, p.useEffect)(() => {
                t && n.current.resumeStream();
              }, [t, n]),
              {
                id: n.current.id,
                messages: i,
                setMessages: s,
                sendMessage: n.current.sendMessage,
                regenerate: n.current.regenerate,
                stop: n.current.stop,
                error: o,
                resumeStream: n.current.resumeStream,
                status: u,
                addToolResult: n.current.addToolResult,
              }
            );
          }
          function j({
            api: e = "/api/completion",
            id: t,
            initialCompletion: r = "",
            initialInput: n = "",
            credentials: a,
            headers: i,
            body: u,
            streamProtocol: o = "data",
            fetch: s,
            onFinish: l,
            onError: c,
            experimental_throttle: d,
          } = {}) {
            let f = (0, p.useId)(),
              h = t || f,
              { data: g, mutate: v } = (0, y.Ay)([e, h], null, {
                fallbackData: r,
              }),
              { data: _ = !1, mutate: m } = (0, y.Ay)([h, "loading"], null),
              [R, E] = (0, p.useState)(void 0),
              [O, S] = (0, p.useState)(null),
              C = (0, p.useRef)({ credentials: a, headers: i, body: u });
            (0, p.useEffect)(() => {
              C.current = { credentials: a, headers: i, body: u };
            }, [a, i, u]);
            let k = (0, p.useCallback)(
                async (t, r) =>
                  (0, b.callCompletionApi)({
                    api: e,
                    prompt: t,
                    credentials: C.current.credentials,
                    headers: {
                      ...C.current.headers,
                      ...(null == r ? void 0 : r.headers),
                    },
                    body: {
                      ...C.current.body,
                      ...(null == r ? void 0 : r.body),
                    },
                    streamProtocol: o,
                    fetch: s,
                    setCompletion: w((e) => v(e, !1), d),
                    setLoading: m,
                    setError: E,
                    setAbortController: S,
                    onFinish: l,
                    onError: c,
                  }),
                [v, m, e, C, S, l, c, E, o, s, d],
              ),
              M = (0, p.useCallback)(() => {
                O && (O.abort(), S(null));
              }, [O]),
              T = (0, p.useCallback)(
                (e) => {
                  v(e, !1);
                },
                [v],
              ),
              x = (0, p.useCallback)(async (e, t) => k(e, t), [k]),
              [P, D] = (0, p.useState)(n),
              L = (0, p.useCallback)(
                (e) => {
                  var t;
                  return (
                    null == (t = null == e ? void 0 : e.preventDefault) ||
                      t.call(e),
                    P ? x(P) : void 0
                  );
                },
                [P, x],
              ),
              A = (0, p.useCallback)(
                (e) => {
                  D(e.target.value);
                },
                [D],
              );
            return {
              completion: g,
              complete: x,
              error: R,
              setCompletion: T,
              stop: M,
              input: P,
              setInput: D,
              handleInputChange: A,
              handleSubmit: L,
              isLoading: _,
            };
          }
          h = new WeakMap();
          n();
        } catch (e) {
          n(e);
        }
      });
    },
    16235: (e, t, r) => {
      "use strict";
      r.d(t, { Ht: () => h, aw: () => f, iX: () => l, qm: () => d });
      var n = r(8502),
        a = r(77536),
        i = r(84205);
      let u = n.i && window.__SWR_DEVTOOLS_USE__,
        o = u ? window.__SWR_DEVTOOLS_USE__ : [],
        s = (e) =>
          (0, n.a)(e[1])
            ? [e[0], e[1], e[2] || {}]
            : [e[0], null, (null === e[1] ? e[2] : e[1]) || {}],
        l = () => (0, n.m)(n.d, (0, i.useContext)(n.S)),
        c = o.concat((e) => (t, r, i) => {
          let u =
            r &&
            ((...e) => {
              let [i] = (0, n.s)(t),
                [, , , u] = n.b.get(n.c);
              if (i.startsWith(a.q)) return r(...e);
              let o = u[i];
              return (0, n.e)(o) ? r(...e) : (delete u[i], o);
            });
          return e(t, u, i);
        }),
        d = (e) =>
          function (...t) {
            let r = l(),
              [a, i, u] = s(t),
              o = (0, n.f)(r, u),
              d = e,
              { use: f } = o,
              h = (f || []).concat(c);
            for (let e = h.length; e--; ) d = h[e](d);
            return d(a, i || o.fetcher || null, o);
          },
        f = (e, t, r) => {
          let n = t[e] || (t[e] = []);
          return (
            n.push(r),
            () => {
              let e = n.indexOf(r);
              e >= 0 && ((n[e] = n[n.length - 1]), n.pop());
            }
          );
        },
        h =
          (e, t) =>
          (...r) => {
            let [n, a, i] = s(r),
              u = (i.use || []).concat(t);
            return e(n, a, { ...i, use: u });
          };
      u && (window.__SWR_DEVTOOLS_REACT__ = i);
    },
    16943: (e, t, r) => {
      "use strict";
      var n = r(84205),
        a =
          "function" == typeof Object.is
            ? Object.is
            : function (e, t) {
                return (
                  (e === t && (0 !== e || 1 / e == 1 / t)) || (e != e && t != t)
                );
              },
        i = n.useState,
        u = n.useEffect,
        o = n.useLayoutEffect,
        s = n.useDebugValue;
      function l(e) {
        var t = e.getSnapshot;
        e = e.value;
        try {
          var r = t();
          return !a(e, r);
        } catch (e) {
          return !0;
        }
      }
      var c =
        "undefined" == typeof window ||
        void 0 === window.document ||
        void 0 === window.document.createElement
          ? function (e, t) {
              return t();
            }
          : function (e, t) {
              var r = t(),
                n = i({ inst: { value: r, getSnapshot: t } }),
                a = n[0].inst,
                c = n[1];
              return (
                o(
                  function () {
                    (a.value = r), (a.getSnapshot = t), l(a) && c({ inst: a });
                  },
                  [e, r, t],
                ),
                u(
                  function () {
                    return (
                      l(a) && c({ inst: a }),
                      e(function () {
                        l(a) && c({ inst: a });
                      })
                    );
                  },
                  [e],
                ),
                s(r),
                r
              );
            };
      t.useSyncExternalStore =
        void 0 !== n.useSyncExternalStore ? n.useSyncExternalStore : c;
    },
    17407: (e, t, r) => {
      "use strict";
      r.d(t, { Ay: () => f });
      var n = r(84205),
        a = r(74994),
        i = r(8502),
        u = r(54502),
        o = r(16235);
      let s = () => {},
        l = s();
      new WeakMap();
      let c =
          n.use ||
          ((e) => {
            switch (e.status) {
              case "pending":
                throw e;
              case "fulfilled":
                return e.value;
              case "rejected":
                throw e.reason;
              default:
                throw (
                  ((e.status = "pending"),
                  e.then(
                    (t) => {
                      (e.status = "fulfilled"), (e.value = t);
                    },
                    (t) => {
                      (e.status = "rejected"), (e.reason = t);
                    },
                  ),
                  e)
                );
            }
          }),
        d = { dedupe: !0 };
      i.O.defineProperty(i.g, "defaultValue", { value: i.d });
      let f = (0, o.qm)((e, t, r) => {
        let {
            cache: s,
            compare: l,
            suspense: f,
            fallbackData: h,
            revalidateOnMount: p,
            revalidateIfStale: b,
            refreshInterval: g,
            refreshWhenHidden: y,
            refreshWhenOffline: v,
            keepPreviousData: _,
          } = r,
          [m, R, E, w] = i.b.get(s),
          [O, S] = (0, i.s)(e),
          C = (0, n.useRef)(!1),
          j = (0, n.useRef)(!1),
          k = (0, n.useRef)(O),
          M = (0, n.useRef)(t),
          T = (0, n.useRef)(r),
          x = () => T.current,
          P = () => x().isVisible() && x().isOnline(),
          [D, L, A, I] = (0, i.z)(s, O),
          F = (0, n.useRef)({}).current,
          W = (0, i.e)(h) ? ((0, i.e)(r.fallback) ? i.U : r.fallback[O]) : h,
          V = (e, t) => {
            for (let r in F)
              if ("data" === r) {
                if (!l(e[r], t[r]) && (!(0, i.e)(e[r]) || !l(K, t[r])))
                  return !1;
              } else if (t[r] !== e[r]) return !1;
            return !0;
          },
          q = (0, n.useMemo)(() => {
            let e =
                !!O &&
                !!t &&
                ((0, i.e)(p) ? !x().isPaused() && !f && !1 !== b : p),
              r = (t) => {
                let r = (0, i.m)(t);
                return (delete r._k, e)
                  ? { isValidating: !0, isLoading: !0, ...r }
                  : r;
              },
              n = D(),
              a = I(),
              u = r(n),
              o = n === a ? u : r(a),
              s = u;
            return [
              () => {
                let e = r(D());
                return V(e, s)
                  ? ((s.data = e.data),
                    (s.isLoading = e.isLoading),
                    (s.isValidating = e.isValidating),
                    (s.error = e.error),
                    s)
                  : ((s = e), e);
              },
              () => o,
            ];
          }, [s, O]),
          N = (0, a.useSyncExternalStore)(
            (0, n.useCallback)(
              (e) =>
                A(O, (t, r) => {
                  V(r, t) || e();
                }),
              [s, O],
            ),
            q[0],
            q[1],
          ),
          z = !C.current,
          B = m[O] && m[O].length > 0,
          H = N.data,
          U = (0, i.e)(H) ? (W && (0, i.B)(W) ? c(W) : W) : H,
          X = N.error,
          $ = (0, n.useRef)(U),
          K = _ ? ((0, i.e)(H) ? ((0, i.e)($.current) ? U : $.current) : H) : U,
          J =
            (!B || !!(0, i.e)(X)) &&
            (z && !(0, i.e)(p)
              ? p
              : !x().isPaused() && (f ? !(0, i.e)(U) && b : (0, i.e)(U) || b)),
          Q = !!(O && t && z && J),
          Y = (0, i.e)(N.isValidating) ? Q : N.isValidating,
          Z = (0, i.e)(N.isLoading) ? Q : N.isLoading,
          G = (0, n.useCallback)(
            async (e) => {
              let t,
                n,
                a = M.current;
              if (!O || !a || j.current || x().isPaused()) return !1;
              let o = !0,
                s = e || {},
                c = !E[O] || !s.dedupe,
                d = () =>
                  i.I
                    ? !j.current && O === k.current && C.current
                    : O === k.current,
                f = { isValidating: !1, isLoading: !1 },
                h = () => {
                  L(f);
                },
                p = () => {
                  let e = E[O];
                  e && e[1] === n && delete E[O];
                },
                b = { isValidating: !0 };
              (0, i.e)(D().data) && (b.isLoading = !0);
              try {
                if (
                  (c &&
                    (L(b),
                    r.loadingTimeout &&
                      (0, i.e)(D().data) &&
                      setTimeout(() => {
                        o && d() && x().onLoadingSlow(O, r);
                      }, r.loadingTimeout),
                    (E[O] = [a(S), (0, i.o)()])),
                  ([t, n] = E[O]),
                  (t = await t),
                  c && setTimeout(p, r.dedupingInterval),
                  !E[O] || E[O][1] !== n)
                )
                  return c && d() && x().onDiscarded(O), !1;
                f.error = i.U;
                let e = R[O];
                if (!(0, i.e)(e) && (n <= e[0] || n <= e[1] || 0 === e[1]))
                  return h(), c && d() && x().onDiscarded(O), !1;
                let u = D().data;
                (f.data = l(u, t) ? u : t), c && d() && x().onSuccess(t, O, r);
              } catch (r) {
                p();
                let e = x(),
                  { shouldRetryOnError: t } = e;
                !e.isPaused() &&
                  ((f.error = r),
                  c &&
                    d() &&
                    (e.onError(r, O, e),
                    (!0 === t || ((0, i.a)(t) && t(r))) &&
                      (!x().revalidateOnFocus ||
                        !x().revalidateOnReconnect ||
                        P()) &&
                      e.onErrorRetry(
                        r,
                        O,
                        e,
                        (e) => {
                          let t = m[O];
                          t && t[0] && t[0](u.I0, e);
                        },
                        { retryCount: (s.retryCount || 0) + 1, dedupe: !0 },
                      )));
              }
              return (o = !1), h(), !0;
            },
            [O, s],
          ),
          ee = (0, n.useCallback)((...e) => (0, i.n)(s, k.current, ...e), []);
        if (
          ((0, i.u)(() => {
            (M.current = t), (T.current = r), (0, i.e)(H) || ($.current = H);
          }),
          (0, i.u)(() => {
            if (!O) return;
            let e = G.bind(i.U, d),
              t = 0;
            x().revalidateOnFocus &&
              (t = Date.now() + x().focusThrottleInterval);
            let r = (0, o.aw)(O, m, (r, n = {}) => {
              if (r == u.CC) {
                let r = Date.now();
                x().revalidateOnFocus &&
                  r > t &&
                  P() &&
                  ((t = r + x().focusThrottleInterval), e());
              } else if (r == u.jB) x().revalidateOnReconnect && P() && e();
              else if (r == u.q2) return G();
              else if (r == u.I0) return G(n);
            });
            return (
              (j.current = !1),
              (k.current = O),
              (C.current = !0),
              L({ _k: S }),
              J && ((0, i.e)(U) || i.r ? e() : (0, i.t)(e)),
              () => {
                (j.current = !0), r();
              }
            );
          }, [O]),
          (0, i.u)(() => {
            let e;
            function t() {
              let t = (0, i.a)(g) ? g(D().data) : g;
              t && -1 !== e && (e = setTimeout(r, t));
            }
            function r() {
              !D().error && (y || x().isVisible()) && (v || x().isOnline())
                ? G(d).then(t)
                : t();
            }
            return (
              t(),
              () => {
                e && (clearTimeout(e), (e = -1));
              }
            );
          }, [g, y, v, O]),
          (0, n.useDebugValue)(K),
          f && (0, i.e)(U) && O)
        ) {
          if (!i.I && i.r)
            throw Error(
              "Fallback data is required when using Suspense in SSR.",
            );
          (M.current = t), (T.current = r), (j.current = !1);
          let e = w[O];
          if (((0, i.e)(e) || c(ee(e)), (0, i.e)(X))) {
            let e = G(d);
            (0, i.e)(K) || ((e.status = "fulfilled"), (e.value = !0)), c(e);
          } else throw X;
        }
        return {
          mutate: ee,
          get data() {
            return (F.data = !0), K;
          },
          get error() {
            return (F.error = !0), X;
          },
          get isValidating() {
            return (F.isValidating = !0), Y;
          },
          get isLoading() {
            return (F.isLoading = !0), Z;
          },
        };
      });
    },
    23399: (e, t, r) => {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 }),
        Object.defineProperty(t, "unstable_rethrow", {
          enumerable: !0,
          get: function () {
            return function e(t) {
              if (
                (0, u.isNextRouterError)(t) ||
                (0, i.isBailoutToCSRError)(t) ||
                (0, s.isDynamicServerError)(t) ||
                (0, o.isDynamicPostpone)(t) ||
                (0, a.isPostpone)(t) ||
                (0, n.isHangingPromiseRejectionError)(t)
              )
                throw t;
              t instanceof Error && "cause" in t && e(t.cause);
            };
          },
        });
      let n = r(6223),
        a = r(96124),
        i = r(58937),
        u = r(91613),
        o = r(62938),
        s = r(98800);
      ("function" == typeof t.default ||
        ("object" == typeof t.default && null !== t.default)) &&
        void 0 === t.default.__esModule &&
        (Object.defineProperty(t.default, "__esModule", { value: !0 }),
        Object.assign(t.default, t),
        (e.exports = t.default));
    },
    29073: (e, t, r) => {
      "use strict";
      var n = r(90645);
      r.o(n, "notFound") &&
        r.d(t, {
          notFound: function () {
            return n.notFound;
          },
        }),
        r.o(n, "permanentRedirect") &&
          r.d(t, {
            permanentRedirect: function () {
              return n.permanentRedirect;
            },
          }),
        r.o(n, "redirect") &&
          r.d(t, {
            redirect: function () {
              return n.redirect;
            },
          });
    },
    42414: (e, t, r) => {
      "use strict";
      r.d(t, { B: () => s });
      var n,
        a = r(84205),
        i = r(66130),
        u =
          (n || (n = r.t(a, 2)))[" useId ".trim().toString()] || (() => void 0),
        o = 0;
      function s(e) {
        let [t, r] = a.useState(u());
        return (
          (0, i.N)(() => {
            e || r((e) => e ?? String(o++));
          }, [e]),
          e || (t ? `radix-${t}` : "")
        );
      }
    },
    42600: (e, t, r) => {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 }),
        Object.defineProperty(t, "unstable_rethrow", {
          enumerable: !0,
          get: function () {
            return n;
          },
        });
      let n = r(23399).unstable_rethrow;
      ("function" == typeof t.default ||
        ("object" == typeof t.default && null !== t.default)) &&
        void 0 === t.default.__esModule &&
        (Object.defineProperty(t.default, "__esModule", { value: !0 }),
        Object.assign(t.default, t),
        (e.exports = t.default));
    },
    44803: (e, t, r) => {
      "use strict";
      r.d(t, { A: () => n });
      let n = (0, r(95255).A)("Search", [
        ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }],
        ["path", { d: "m21 21-4.3-4.3", key: "1qie3q" }],
      ]);
    },
    52480: (e, t, r) => {
      "use strict";
      function n() {
        throw Object.defineProperty(
          Error(
            "`unauthorized()` is experimental and only allowed to be used when `experimental.authInterrupts` is enabled.",
          ),
          "__NEXT_ERROR_CODE",
          { value: "E411", enumerable: !1, configurable: !0 },
        );
      }
      Object.defineProperty(t, "__esModule", { value: !0 }),
        Object.defineProperty(t, "unauthorized", {
          enumerable: !0,
          get: function () {
            return n;
          },
        }),
        r(17581).HTTP_ERROR_FALLBACK_ERROR_CODE,
        ("function" == typeof t.default ||
          ("object" == typeof t.default && null !== t.default)) &&
          void 0 === t.default.__esModule &&
          (Object.defineProperty(t.default, "__esModule", { value: !0 }),
          Object.assign(t.default, t),
          (e.exports = t.default));
    },
    53418: (e) => {
      e.exports = function (e, t) {
        let r;
        if ("function" != typeof e)
          throw TypeError(
            `Expected the first argument to be a \`function\`, got \`${typeof e}\`.`,
          );
        let n = 0;
        return function (...a) {
          clearTimeout(r);
          let i = Date.now(),
            u = t - (i - n);
          u <= 0
            ? ((n = i), e.apply(this, a))
            : (r = setTimeout(() => {
                (n = Date.now()), e.apply(this, a);
              }, u));
        };
      };
    },
    54502: (e, t, r) => {
      "use strict";
      r.d(t, { CC: () => n, I0: () => u, jB: () => a, q2: () => i });
      let n = 0,
        a = 1,
        i = 2,
        u = 3;
    },
    65278: (e, t, r) => {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 }),
        !(function (e, t) {
          for (var r in t)
            Object.defineProperty(e, r, { enumerable: !0, get: t[r] });
        })(t, {
          getRedirectError: function () {
            return u;
          },
          getRedirectStatusCodeFromError: function () {
            return d;
          },
          getRedirectTypeFromError: function () {
            return c;
          },
          getURLFromRedirectError: function () {
            return l;
          },
          permanentRedirect: function () {
            return s;
          },
          redirect: function () {
            return o;
          },
        });
      let n = r(20835),
        a = r(21293),
        i = r(19121).actionAsyncStorage;
      function u(e, t, r) {
        void 0 === r && (r = n.RedirectStatusCode.TemporaryRedirect);
        let i = Object.defineProperty(
          Error(a.REDIRECT_ERROR_CODE),
          "__NEXT_ERROR_CODE",
          { value: "E394", enumerable: !1, configurable: !0 },
        );
        return (
          (i.digest =
            a.REDIRECT_ERROR_CODE + ";" + t + ";" + e + ";" + r + ";"),
          i
        );
      }
      function o(e, t) {
        var r;
        throw (
          (null != t ||
            (t = (null == i || null == (r = i.getStore()) ? void 0 : r.isAction)
              ? a.RedirectType.push
              : a.RedirectType.replace),
          u(e, t, n.RedirectStatusCode.TemporaryRedirect))
        );
      }
      function s(e, t) {
        throw (
          (void 0 === t && (t = a.RedirectType.replace),
          u(e, t, n.RedirectStatusCode.PermanentRedirect))
        );
      }
      function l(e) {
        return (0, a.isRedirectError)(e)
          ? e.digest.split(";").slice(2, -2).join(";")
          : null;
      }
      function c(e) {
        if (!(0, a.isRedirectError)(e))
          throw Object.defineProperty(
            Error("Not a redirect error"),
            "__NEXT_ERROR_CODE",
            { value: "E260", enumerable: !1, configurable: !0 },
          );
        return e.digest.split(";", 2)[1];
      }
      function d(e) {
        if (!(0, a.isRedirectError)(e))
          throw Object.defineProperty(
            Error("Not a redirect error"),
            "__NEXT_ERROR_CODE",
            { value: "E260", enumerable: !1, configurable: !0 },
          );
        return Number(e.digest.split(";").at(-2));
      }
      ("function" == typeof t.default ||
        ("object" == typeof t.default && null !== t.default)) &&
        void 0 === t.default.__esModule &&
        (Object.defineProperty(t.default, "__esModule", { value: !0 }),
        Object.assign(t.default, t),
        (e.exports = t.default));
    },
    74994: (e, t, r) => {
      "use strict";
      e.exports = r(16943);
    },
    77536: (e, t, r) => {
      "use strict";
      r.d(t, { q: () => n });
      let n = "$inf$";
    },
    90645: (e, t, r) => {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 }),
        !(function (e, t) {
          for (var r in t)
            Object.defineProperty(e, r, { enumerable: !0, get: t[r] });
        })(t, {
          ReadonlyURLSearchParams: function () {
            return c;
          },
          RedirectType: function () {
            return a.RedirectType;
          },
          forbidden: function () {
            return u.forbidden;
          },
          notFound: function () {
            return i.notFound;
          },
          permanentRedirect: function () {
            return n.permanentRedirect;
          },
          redirect: function () {
            return n.redirect;
          },
          unauthorized: function () {
            return o.unauthorized;
          },
          unstable_rethrow: function () {
            return s.unstable_rethrow;
          },
        });
      let n = r(65278),
        a = r(21293),
        i = r(11316),
        u = r(14749),
        o = r(52480),
        s = r(42600);
      class l extends Error {
        constructor() {
          super(
            "Method unavailable on `ReadonlyURLSearchParams`. Read more: https://nextjs.org/docs/app/api-reference/functions/use-search-params#updating-searchparams",
          );
        }
      }
      class c extends URLSearchParams {
        append() {
          throw new l();
        }
        delete() {
          throw new l();
        }
        set() {
          throw new l();
        }
        sort() {
          throw new l();
        }
      }
      ("function" == typeof t.default ||
        ("object" == typeof t.default && null !== t.default)) &&
        void 0 === t.default.__esModule &&
        (Object.defineProperty(t.default, "__esModule", { value: !0 }),
        Object.assign(t.default, t),
        (e.exports = t.default));
    },
    91557: (e, t, r) => {
      "use strict";
      r.d(t, { X: () => i });
      var n = r(84205),
        a = r(66130);
      function i(e) {
        let [t, r] = n.useState(void 0);
        return (
          (0, a.N)(() => {
            if (e) {
              r({ width: e.offsetWidth, height: e.offsetHeight });
              let t = new ResizeObserver((t) => {
                let n, a;
                if (!Array.isArray(t) || !t.length) return;
                let i = t[0];
                if ("borderBoxSize" in i) {
                  let e = i.borderBoxSize,
                    t = Array.isArray(e) ? e[0] : e;
                  (n = t.inlineSize), (a = t.blockSize);
                } else (n = e.offsetWidth), (a = e.offsetHeight);
                r({ width: n, height: a });
              });
              return t.observe(e, { box: "border-box" }), () => t.unobserve(e);
            }
            r(void 0);
          }, [e]),
          t
        );
      }
    },
    99793: (e, t, r) => {
      "use strict";
      r.d(t, { A: () => n });
      let n = (0, r(95255).A)("FileText", [
        [
          "path",
          {
            d: "M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z",
            key: "1rqfz7",
          },
        ],
        ["path", { d: "M14 2v4a2 2 0 0 0 2 2h4", key: "tnqrlb" }],
        ["path", { d: "M10 9H8", key: "b1mrlr" }],
        ["path", { d: "M16 13H8", key: "t4e002" }],
        ["path", { d: "M16 17H8", key: "z1uh3a" }],
      ]);
    },
  });
//# sourceMappingURL=4486.js.map
