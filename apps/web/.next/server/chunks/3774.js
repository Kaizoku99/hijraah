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
    (e._sentryDebugIds[t] = "e5db4e07-b974-4a09-85c0-3dd5f7a4ee17"),
    (e._sentryDebugIdIdentifier =
      "sentry-dbid-e5db4e07-b974-4a09-85c0-3dd5f7a4ee17"));
} catch (e) {}
("use strict");
(exports.id = 3774),
  (exports.ids = [3774]),
  (exports.modules = {
    16789: (e, t, r) => {
      r.d(t, { $: () => $ });
      var s = (e, t, r) => (s, n) => {
          let i = -1;
          return a(0);
          async function a(h) {
            let o, l;
            if (h <= i) throw Error("next() called multiple times");
            i = h;
            let d = !1;
            if (
              (e[h]
                ? ((l = e[h][0][0]), (s.req.routeIndex = h))
                : (l = (h === e.length && n) || void 0),
              l)
            )
              try {
                o = await l(s, () => a(h + 1));
              } catch (e) {
                if (e instanceof Error && t)
                  (s.error = e), (o = await t(e, s)), (d = !0);
                else throw e;
              }
            else !1 === s.finalized && r && (o = await r(s));
            return o && (!1 === s.finalized || d) && (s.res = o), s;
          }
        },
        n = r(27613),
        i = ["get", "post", "put", "delete", "options", "patch"],
        a = "Can not add a route since the matcher is already built.",
        h = class extends Error {},
        o = r(79533),
        l = (e) => e.text("404 Not Found", 404),
        d = (e, t) => {
          if ("getResponse" in e) {
            let r = e.getResponse();
            return t.newResponse(r.body, r);
          }
          return console.error(e), t.text("Internal Server Error", 500);
        },
        u = class {
          get;
          post;
          put;
          delete;
          options;
          patch;
          all;
          on;
          use;
          router;
          getPath;
          _basePath = "/";
          #e = "/";
          routes = [];
          constructor(e = {}) {
            [...i, "all"].forEach((e) => {
              this[e] = (t, ...r) => (
                "string" == typeof t ? (this.#e = t) : this.#t(e, this.#e, t),
                r.forEach((t) => {
                  this.#t(e, this.#e, t);
                }),
                this
              );
            }),
              (this.on = (e, t, ...r) => {
                for (let s of [t].flat())
                  for (let t of ((this.#e = s), [e].flat()))
                    r.map((e) => {
                      this.#t(t.toUpperCase(), this.#e, e);
                    });
                return this;
              }),
              (this.use = (e, ...t) => (
                "string" == typeof e
                  ? (this.#e = e)
                  : ((this.#e = "*"), t.unshift(e)),
                t.forEach((e) => {
                  this.#t("ALL", this.#e, e);
                }),
                this
              ));
            let { strict: t, ...r } = e;
            Object.assign(this, r),
              (this.getPath = (t ?? !0) ? (e.getPath ?? o.Yn) : o.md);
          }
          #r() {
            let e = new u({ router: this.router, getPath: this.getPath });
            return (
              (e.errorHandler = this.errorHandler),
              (e.#s = this.#s),
              (e.routes = this.routes),
              e
            );
          }
          #s = l;
          errorHandler = d;
          route(e, t) {
            let r = this.basePath(e);
            return (
              t.routes.map((e) => {
                let n;
                t.errorHandler === d
                  ? (n = e.handler)
                  : ((n = async (r, n) =>
                      (await s([], t.errorHandler)(r, () => e.handler(r, n)))
                        .res).__COMPOSED_HANDLER = e.handler),
                  r.#t(e.method, e.path, n);
              }),
              this
            );
          }
          basePath(e) {
            let t = this.#r();
            return (t._basePath = (0, o.uc)(this._basePath, e)), t;
          }
          onError = (e) => ((this.errorHandler = e), this);
          notFound = (e) => ((this.#s = e), this);
          mount(e, t, r) {
            let s, n;
            r &&
              ("function" == typeof r
                ? (n = r)
                : ((n = r.optionHandler),
                  (s = !1 === r.replaceRequest ? (e) => e : r.replaceRequest)));
            let i = n
              ? (e) => {
                  let t = n(e);
                  return Array.isArray(t) ? t : [t];
                }
              : (e) => {
                  let t;
                  try {
                    t = e.executionCtx;
                  } catch {}
                  return [e.env, t];
                };
            s ||= (() => {
              let t = (0, o.uc)(this._basePath, e),
                r = "/" === t ? 0 : t.length;
              return (e) => {
                let t = new URL(e.url);
                return (
                  (t.pathname = t.pathname.slice(r) || "/"), new Request(t, e)
                );
              };
            })();
            let a = async (e, r) => {
              let n = await t(s(e.req.raw), ...i(e));
              if (n) return n;
              await r();
            };
            return this.#t("ALL", (0, o.uc)(e, "*"), a), this;
          }
          #t(e, t, r) {
            (e = e.toUpperCase()), (t = (0, o.uc)(this._basePath, t));
            let s = {
              basePath: this._basePath,
              path: t,
              method: e,
              handler: r,
            };
            this.router.add(e, t, [r, s]), this.routes.push(s);
          }
          #n(e, t) {
            if (e instanceof Error) return this.errorHandler(e, t);
            throw e;
          }
          #i(e, t, r, i) {
            if ("HEAD" === i)
              return (async () =>
                new Response(null, await this.#i(e, t, r, "GET")))();
            let a = this.getPath(e, { env: r }),
              h = this.router.match(i, a),
              o = new n.o(e, {
                path: a,
                matchResult: h,
                env: r,
                executionCtx: t,
                notFoundHandler: this.#s,
              });
            if (1 === h[0].length) {
              let e;
              try {
                e = h[0][0][0][0](o, async () => {
                  o.res = await this.#s(o);
                });
              } catch (e) {
                return this.#n(e, o);
              }
              return e instanceof Promise
                ? e
                    .then((e) => e || (o.finalized ? o.res : this.#s(o)))
                    .catch((e) => this.#n(e, o))
                : (e ?? this.#s(o));
            }
            let l = s(h[0], this.errorHandler, this.#s);
            return (async () => {
              try {
                let e = await l(o);
                if (!e.finalized)
                  throw Error(
                    "Context is not finalized. Did you forget to return a Response object or `await next()`?",
                  );
                return e.res;
              } catch (e) {
                return this.#n(e, o);
              }
            })();
          }
          fetch = (e, ...t) => this.#i(e, t[1], t[0], e.method);
          request = (e, t, r, s) =>
            e instanceof Request
              ? this.fetch(t ? new Request(e, t) : e, r, s)
              : ((e = e.toString()),
                this.fetch(
                  new Request(
                    /^https?:\/\//.test(e)
                      ? e
                      : `http://localhost${(0, o.uc)("/", e)}`,
                    t,
                  ),
                  r,
                  s,
                ));
          fire = () => {
            addEventListener("fetch", (e) => {
              e.respondWith(this.#i(e.request, e, void 0, e.request.method));
            });
          };
        },
        c = "[^/]+",
        f = "(?:|/.*)",
        p = Symbol(),
        g = new Set(".\\+*[^]$()");
      function m(e, t) {
        return 1 === e.length
          ? 1 === t.length
            ? e < t
              ? -1
              : 1
            : -1
          : 1 === t.length || ".*" === e || e === f
            ? 1
            : ".*" === t || t === f
              ? -1
              : e === c
                ? 1
                : t === c
                  ? -1
                  : e.length === t.length
                    ? e < t
                      ? -1
                      : 1
                    : t.length - e.length;
      }
      var b = class {
          #a;
          #h;
          #o = Object.create(null);
          insert(e, t, r, s, n) {
            let i;
            if (0 === e.length) {
              if (void 0 !== this.#a) throw p;
              if (n) return;
              this.#a = t;
              return;
            }
            let [a, ...h] = e,
              o =
                "*" === a
                  ? 0 === h.length
                    ? ["", "", ".*"]
                    : ["", "", c]
                  : "/*" === a
                    ? ["", "", f]
                    : a.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);
            if (o) {
              let e = o[1],
                t = o[2] || c;
              if (
                e &&
                o[2] &&
                ((t = t.replace(/^\((?!\?:)(?=[^)]+\)$)/, "(?:")),
                /\((?!\?:)/.test(t))
              )
                throw p;
              if (!(i = this.#o[t])) {
                if (Object.keys(this.#o).some((e) => ".*" !== e && e !== f))
                  throw p;
                if (n) return;
                (i = this.#o[t] = new b()), "" !== e && (i.#h = s.varIndex++);
              }
              n || "" === e || r.push([e, i.#h]);
            } else if (!(i = this.#o[a])) {
              if (
                Object.keys(this.#o).some(
                  (e) => e.length > 1 && ".*" !== e && e !== f,
                )
              )
                throw p;
              if (n) return;
              i = this.#o[a] = new b();
            }
            i.insert(h, t, r, s, n);
          }
          buildRegExpStr() {
            let e = Object.keys(this.#o)
              .sort(m)
              .map((e) => {
                let t = this.#o[e];
                return (
                  ("number" == typeof t.#h
                    ? `(${e})@${t.#h}`
                    : g.has(e)
                      ? `\\${e}`
                      : e) + t.buildRegExpStr()
                );
              });
            return ("number" == typeof this.#a && e.unshift(`#${this.#a}`),
            0 === e.length)
              ? ""
              : 1 === e.length
                ? e[0]
                : "(?:" + e.join("|") + ")";
          }
        },
        y = class {
          #l = { varIndex: 0 };
          #d = new b();
          insert(e, t, r) {
            let s = [],
              n = [];
            for (let t = 0; ; ) {
              let r = !1;
              if (
                ((e = e.replace(/\{[^}]+\}/g, (e) => {
                  let s = `@\\${t}`;
                  return (n[t] = [s, e]), t++, (r = !0), s;
                })),
                !r)
              )
                break;
            }
            let i = e.match(/(?::[^\/]+)|(?:\/\*$)|./g) || [];
            for (let e = n.length - 1; e >= 0; e--) {
              let [t] = n[e];
              for (let r = i.length - 1; r >= 0; r--)
                if (-1 !== i[r].indexOf(t)) {
                  i[r] = i[r].replace(t, n[e][1]);
                  break;
                }
            }
            return this.#d.insert(i, t, s, this.#l, r), s;
          }
          buildRegExp() {
            let e = this.#d.buildRegExpStr();
            if ("" === e) return [/^$/, [], []];
            let t = 0,
              r = [],
              s = [];
            return (
              (e = e.replace(/#(\d+)|@(\d+)|\.\*\$/g, (e, n, i) =>
                void 0 !== n
                  ? ((r[++t] = Number(n)), "$()")
                  : (void 0 !== i && (s[Number(i)] = ++t), ""),
              )),
              [RegExp(`^${e}`), r, s]
            );
          }
        },
        w = [],
        x = [/^$/, [], Object.create(null)],
        R = Object.create(null);
      function O(e) {
        return (R[e] ??= new RegExp(
          "*" === e
            ? ""
            : `^${e.replace(/\/\*$|([.\\+*[^\]$()])/g, (e, t) => (t ? `\\${t}` : "(?:|/.*)"))}$`,
        ));
      }
      function E(e, t) {
        if (e) {
          for (let r of Object.keys(e).sort((e, t) => t.length - e.length))
            if (O(r).test(t)) return [...e[r]];
        }
      }
      var v = class {
          name = "RegExpRouter";
          #u;
          #c;
          constructor() {
            (this.#u = { ALL: Object.create(null) }),
              (this.#c = { ALL: Object.create(null) });
          }
          add(e, t, r) {
            let s = this.#u,
              n = this.#c;
            if (!s || !n) throw Error(a);
            s[e] ||
              [s, n].forEach((t) => {
                (t[e] = Object.create(null)),
                  Object.keys(t.ALL).forEach((r) => {
                    t[e][r] = [...t.ALL[r]];
                  });
              }),
              "/*" === t && (t = "*");
            let i = (t.match(/\/:/g) || []).length;
            if (/\*$/.test(t)) {
              let a = O(t);
              "ALL" === e
                ? Object.keys(s).forEach((e) => {
                    s[e][t] ||= E(s[e], t) || E(s.ALL, t) || [];
                  })
                : (s[e][t] ||= E(s[e], t) || E(s.ALL, t) || []),
                Object.keys(s).forEach((t) => {
                  ("ALL" === e || e === t) &&
                    Object.keys(s[t]).forEach((e) => {
                      a.test(e) && s[t][e].push([r, i]);
                    });
                }),
                Object.keys(n).forEach((t) => {
                  ("ALL" === e || e === t) &&
                    Object.keys(n[t]).forEach(
                      (e) => a.test(e) && n[t][e].push([r, i]),
                    );
                });
              return;
            }
            let h = (0, o.wU)(t) || [t];
            for (let t = 0, a = h.length; t < a; t++) {
              let o = h[t];
              Object.keys(n).forEach((h) => {
                ("ALL" === e || e === h) &&
                  ((n[h][o] ||= [...(E(s[h], o) || E(s.ALL, o) || [])]),
                  n[h][o].push([r, i - a + t + 1]));
              });
            }
          }
          match(e, t) {
            R = Object.create(null);
            let r = this.#f();
            return (
              (this.match = (e, t) => {
                let s = r[e] || r.ALL,
                  n = s[2][t];
                if (n) return n;
                let i = t.match(s[0]);
                if (!i) return [[], w];
                let a = i.indexOf("", 1);
                return [s[1][a], i];
              }),
              this.match(e, t)
            );
          }
          #f() {
            let e = Object.create(null);
            return (
              Object.keys(this.#c)
                .concat(Object.keys(this.#u))
                .forEach((t) => {
                  e[t] ||= this.#p(t);
                }),
              (this.#u = this.#c = void 0),
              e
            );
          }
          #p(e) {
            let t = [],
              r = "ALL" === e;
            return ([this.#u, this.#c].forEach((s) => {
              let n = s[e] ? Object.keys(s[e]).map((t) => [t, s[e][t]]) : [];
              0 !== n.length
                ? ((r ||= !0), t.push(...n))
                : "ALL" !== e &&
                  t.push(...Object.keys(s.ALL).map((e) => [e, s.ALL[e]]));
            }),
            r)
              ? (function (e) {
                  let t = new y(),
                    r = [];
                  if (0 === e.length) return x;
                  let s = e
                      .map((e) => [!/\*|\/:/.test(e[0]), ...e])
                      .sort(([e, t], [r, s]) =>
                        e ? 1 : r ? -1 : t.length - s.length,
                      ),
                    n = Object.create(null);
                  for (let e = 0, i = -1, a = s.length; e < a; e++) {
                    let a,
                      [o, l, d] = s[e];
                    o
                      ? (n[l] = [d.map(([e]) => [e, Object.create(null)]), w])
                      : i++;
                    try {
                      a = t.insert(l, i, o);
                    } catch (e) {
                      throw e === p ? new h(l) : e;
                    }
                    o ||
                      (r[i] = d.map(([e, t]) => {
                        let r = Object.create(null);
                        for (t -= 1; t >= 0; t--) {
                          let [e, s] = a[t];
                          r[e] = s;
                        }
                        return [e, r];
                      }));
                  }
                  let [i, a, o] = t.buildRegExp();
                  for (let e = 0, t = r.length; e < t; e++)
                    for (let t = 0, s = r[e].length; t < s; t++) {
                      let s = r[e][t]?.[1];
                      if (!s) continue;
                      let n = Object.keys(s);
                      for (let e = 0, t = n.length; e < t; e++)
                        s[n[e]] = o[s[n[e]]];
                    }
                  let l = [];
                  for (let e in a) l[e] = r[a[e]];
                  return [i, l, n];
                })(t)
              : null;
          }
        },
        j = class {
          name = "SmartRouter";
          #g = [];
          #c = [];
          constructor(e) {
            this.#g = e.routers;
          }
          add(e, t, r) {
            if (!this.#c) throw Error(a);
            this.#c.push([e, t, r]);
          }
          match(e, t) {
            let r;
            if (!this.#c) throw Error("Fatal error");
            let s = this.#g,
              n = this.#c,
              i = s.length,
              a = 0;
            for (; a < i; a++) {
              let i = s[a];
              try {
                for (let e = 0, t = n.length; e < t; e++) i.add(...n[e]);
                r = i.match(e, t);
              } catch (e) {
                if (e instanceof h) continue;
                throw e;
              }
              (this.match = i.match.bind(i)),
                (this.#g = [i]),
                (this.#c = void 0);
              break;
            }
            if (a === i) throw Error("Fatal error");
            return (this.name = `SmartRouter + ${this.activeRouter.name}`), r;
          }
          get activeRouter() {
            if (this.#c || 1 !== this.#g.length)
              throw Error("No active router has been determined yet.");
            return this.#g[0];
          }
        },
        A = Object.create(null),
        L = class {
          #m;
          #o;
          #b;
          #y = 0;
          #w = A;
          constructor(e, t, r) {
            if (
              ((this.#o = r || Object.create(null)), (this.#m = []), e && t)
            ) {
              let r = Object.create(null);
              (r[e] = { handler: t, possibleKeys: [], score: 0 }),
                (this.#m = [r]);
            }
            this.#b = [];
          }
          insert(e, t, r) {
            this.#y = ++this.#y;
            let s = this,
              n = (0, o.WE)(t),
              i = [];
            for (let e = 0, t = n.length; e < t; e++) {
              let t = n[e],
                r = n[e + 1],
                a = (0, o.jA)(t, r),
                h = Array.isArray(a) ? a[0] : t;
              if (h in s.#o) {
                (s = s.#o[h]), a && i.push(a[1]);
                continue;
              }
              (s.#o[h] = new L()),
                a && (s.#b.push(a), i.push(a[1])),
                (s = s.#o[h]);
            }
            return (
              s.#m.push({
                [e]: {
                  handler: r,
                  possibleKeys: i.filter((e, t, r) => r.indexOf(e) === t),
                  score: this.#y,
                },
              }),
              s
            );
          }
          #x(e, t, r, s) {
            let n = [];
            for (let i = 0, a = e.#m.length; i < a; i++) {
              let a = e.#m[i],
                h = a[t] || a.ALL,
                o = {};
              if (
                void 0 !== h &&
                ((h.params = Object.create(null)),
                n.push(h),
                r !== A || (s && s !== A))
              )
                for (let e = 0, t = h.possibleKeys.length; e < t; e++) {
                  let t = h.possibleKeys[e],
                    n = o[h.score];
                  (h.params[t] = s?.[t] && !n ? s[t] : (r[t] ?? s?.[t])),
                    (o[h.score] = !0);
                }
            }
            return n;
          }
          search(e, t) {
            let r = [];
            this.#w = A;
            let s = [this],
              n = (0, o.Uf)(t),
              i = [];
            for (let t = 0, a = n.length; t < a; t++) {
              let h = n[t],
                o = t === a - 1,
                l = [];
              for (let a = 0, d = s.length; a < d; a++) {
                let d = s[a],
                  u = d.#o[h];
                u &&
                  ((u.#w = d.#w),
                  o
                    ? (u.#o["*"] && r.push(...this.#x(u.#o["*"], e, d.#w)),
                      r.push(...this.#x(u, e, d.#w)))
                    : l.push(u));
                for (let s = 0, a = d.#b.length; s < a; s++) {
                  let a = d.#b[s],
                    u = d.#w === A ? {} : { ...d.#w };
                  if ("*" === a) {
                    let t = d.#o["*"];
                    t &&
                      (r.push(...this.#x(t, e, d.#w)), (t.#w = u), l.push(t));
                    continue;
                  }
                  if (!h) continue;
                  let [c, f, p] = a,
                    g = d.#o[c],
                    m = n.slice(t).join("/");
                  if (p instanceof RegExp) {
                    let t = p.exec(m);
                    if (t) {
                      if (
                        ((u[f] = t[0]),
                        r.push(...this.#x(g, e, d.#w, u)),
                        Object.keys(g.#o).length)
                      ) {
                        g.#w = u;
                        let e = t[0].match(/\//)?.length ?? 0;
                        (i[e] ||= []).push(g);
                      }
                      continue;
                    }
                  }
                  (!0 === p || p.test(h)) &&
                    ((u[f] = h),
                    o
                      ? (r.push(...this.#x(g, e, u, d.#w)),
                        g.#o["*"] && r.push(...this.#x(g.#o["*"], e, u, d.#w)))
                      : ((g.#w = u), l.push(g)));
                }
              }
              s = l.concat(i.shift() ?? []);
            }
            return (
              r.length > 1 && r.sort((e, t) => e.score - t.score),
              [r.map(({ handler: e, params: t }) => [e, t])]
            );
          }
        },
        H = class {
          name = "TrieRouter";
          #R;
          constructor() {
            this.#R = new L();
          }
          add(e, t, r) {
            let s = (0, o.wU)(t);
            if (s) {
              for (let t = 0, n = s.length; t < n; t++)
                this.#R.insert(e, s[t], r);
              return;
            }
            this.#R.insert(e, t, r);
          }
          match(e, t) {
            return this.#R.search(e, t);
          }
        },
        $ = class extends u {
          constructor(e = {}) {
            super(e),
              (this.router =
                e.router ?? new j({ routers: [new v(), new H()] }));
          }
        };
    },
    27613: (e, t, r) => {
      r.d(t, { o: () => m });
      var s = Symbol(),
        n = async (e, t = Object.create(null)) => {
          let { all: r = !1, dot: s = !1 } = t,
            n = (e instanceof d ? e.raw.headers : e.headers).get(
              "Content-Type",
            );
          return n?.startsWith("multipart/form-data") ||
            n?.startsWith("application/x-www-form-urlencoded")
            ? i(e, { all: r, dot: s })
            : {};
        };
      async function i(e, t) {
        let r = await e.formData();
        return r
          ? (function (e, t) {
              let r = Object.create(null);
              return (
                e.forEach((e, s) => {
                  t.all || s.endsWith("[]") ? a(r, s, e) : (r[s] = e);
                }),
                t.dot &&
                  Object.entries(r).forEach(([e, t]) => {
                    e.includes(".") && (h(r, e, t), delete r[e]);
                  }),
                r
              );
            })(r, t)
          : {};
      }
      var a = (e, t, r) => {
          void 0 !== e[t]
            ? Array.isArray(e[t])
              ? e[t].push(r)
              : (e[t] = [e[t], r])
            : t.endsWith("[]")
              ? (e[t] = [r])
              : (e[t] = r);
        },
        h = (e, t, r) => {
          let s = e,
            n = t.split(".");
          n.forEach((e, t) => {
            t === n.length - 1
              ? (s[e] = r)
              : ((!s[e] ||
                  "object" != typeof s[e] ||
                  Array.isArray(s[e]) ||
                  s[e] instanceof File) &&
                  (s[e] = Object.create(null)),
                (s = s[e]));
          });
        },
        o = r(79533),
        l = (e) => (0, o.SA)(e, o.Rp),
        d = class {
          raw;
          #O;
          #E;
          routeIndex = 0;
          path;
          bodyCache = {};
          constructor(e, t = "/", r = [[]]) {
            (this.raw = e), (this.path = t), (this.#E = r), (this.#O = {});
          }
          param(e) {
            return e ? this.#v(e) : this.#j();
          }
          #v(e) {
            let t = this.#E[0][this.routeIndex][1][e],
              r = this.#A(t);
            return r ? (/\%/.test(r) ? l(r) : r) : void 0;
          }
          #j() {
            let e = {};
            for (let t of Object.keys(this.#E[0][this.routeIndex][1])) {
              let r = this.#A(this.#E[0][this.routeIndex][1][t]);
              r && "string" == typeof r && (e[t] = /\%/.test(r) ? l(r) : r);
            }
            return e;
          }
          #A(e) {
            return this.#E[1] ? this.#E[1][e] : e;
          }
          query(e) {
            return (0, o.qn)(this.url, e);
          }
          queries(e) {
            return (0, o.vA)(this.url, e);
          }
          header(e) {
            if (e) return this.raw.headers.get(e) ?? void 0;
            let t = {};
            return (
              this.raw.headers.forEach((e, r) => {
                t[r] = e;
              }),
              t
            );
          }
          async parseBody(e) {
            return (this.bodyCache.parsedBody ??= await n(this, e));
          }
          #L = (e) => {
            let { bodyCache: t, raw: r } = this,
              s = t[e];
            if (s) return s;
            let n = Object.keys(t)[0];
            return n
              ? t[n].then(
                  (t) => (
                    "json" === n && (t = JSON.stringify(t)),
                    new Response(t)[e]()
                  ),
                )
              : (t[e] = r[e]());
          };
          json() {
            return this.#L("json");
          }
          text() {
            return this.#L("text");
          }
          arrayBuffer() {
            return this.#L("arrayBuffer");
          }
          blob() {
            return this.#L("blob");
          }
          formData() {
            return this.#L("formData");
          }
          addValidatedData(e, t) {
            this.#O[e] = t;
          }
          valid(e) {
            return this.#O[e];
          }
          get url() {
            return this.raw.url;
          }
          get method() {
            return this.raw.method;
          }
          get [s]() {
            return this.#E;
          }
          get matchedRoutes() {
            return this.#E[0].map(([[, e]]) => e);
          }
          get routePath() {
            return this.#E[0].map(([[, e]]) => e)[this.routeIndex].path;
          }
        },
        u = { Stringify: 1 },
        c = (e, t) => {
          let r = new String(e);
          return (r.isEscaped = !0), (r.callbacks = t), r;
        },
        f = /[&<>'"]/,
        p = async (e, t, r, s, n) => {
          "object" == typeof e &&
            !(e instanceof String) &&
            (e instanceof Promise || (e = e.toString()),
            e instanceof Promise && (e = await e));
          let i = e.callbacks;
          if (!i?.length) return Promise.resolve(e);
          n ? (n[0] += e) : (n = [e]);
          let a = Promise.all(
            i.map((e) => e({ phase: t, buffer: n, context: s })),
          ).then((e) =>
            Promise.all(e.filter(Boolean).map((e) => p(e, t, !1, s, n))).then(
              () => n[0],
            ),
          );
          return r ? c(await a, i) : a;
        },
        g = (e, t) => ({ "Content-Type": e, ...t }),
        m = class {
          #H;
          #$;
          env = {};
          #k;
          finalized = !1;
          error;
          #P;
          #S;
          #C;
          #F;
          #q;
          #s;
          #I;
          #E;
          #e;
          constructor(e, t) {
            (this.#H = e),
              t &&
                ((this.#S = t.executionCtx),
                (this.env = t.env),
                (this.#s = t.notFoundHandler),
                (this.#e = t.path),
                (this.#E = t.matchResult));
          }
          get req() {
            return (this.#$ ??= new d(this.#H, this.#e, this.#E)), this.#$;
          }
          get event() {
            if (this.#S && "respondWith" in this.#S) return this.#S;
            throw Error("This context has no FetchEvent");
          }
          get executionCtx() {
            if (this.#S) return this.#S;
            throw Error("This context has no ExecutionContext");
          }
          get res() {
            return (this.#C ||= new Response(null, {
              headers: (this.#I ??= new Headers()),
            }));
          }
          set res(e) {
            if (this.#C && e) {
              for (let [t, r] of ((e = new Response(e.body, e)),
              this.#C.headers.entries()))
                if ("content-type" !== t)
                  if ("set-cookie" === t) {
                    let t = this.#C.headers.getSetCookie();
                    for (let r of (e.headers.delete("set-cookie"), t))
                      e.headers.append("set-cookie", r);
                  } else e.headers.set(t, r);
            }
            (this.#C = e), (this.finalized = !0);
          }
          render = (...e) => ((this.#q ??= (e) => this.html(e)), this.#q(...e));
          setLayout = (e) => (this.#F = e);
          getLayout = () => this.#F;
          setRenderer = (e) => {
            this.#q = e;
          };
          header = (e, t, r) => {
            this.finalized && (this.#C = new Response(this.#C.body, this.#C));
            let s = this.#C ? this.#C.headers : (this.#I ??= new Headers());
            void 0 === t
              ? s.delete(e)
              : r?.append
                ? s.append(e, t)
                : s.set(e, t);
          };
          status = (e) => {
            this.#P = e;
          };
          set = (e, t) => {
            (this.#k ??= new Map()), this.#k.set(e, t);
          };
          get = (e) => (this.#k ? this.#k.get(e) : void 0);
          get var() {
            return this.#k ? Object.fromEntries(this.#k) : {};
          }
          #D(e, t, r) {
            let s = this.#C
              ? new Headers(this.#C.headers)
              : (this.#I ?? new Headers());
            if ("object" == typeof t && "headers" in t)
              for (let [e, r] of t.headers instanceof Headers
                ? t.headers
                : new Headers(t.headers))
                "set-cookie" === e.toLowerCase() ? s.append(e, r) : s.set(e, r);
            if (r)
              for (let [e, t] of Object.entries(r))
                if ("string" == typeof t) s.set(e, t);
                else for (let r of (s.delete(e), t)) s.append(e, r);
            return new Response(e, {
              status: "number" == typeof t ? t : (t?.status ?? this.#P),
              headers: s,
            });
          }
          newResponse = (...e) => this.#D(...e);
          body = (e, t, r) => this.#D(e, t, r);
          text = (e, t, r) =>
            this.#I || this.#P || t || r || this.finalized
              ? this.#D(e, t, g("text/plain; charset=UTF-8", r))
              : new Response(e);
          json = (e, t, r) =>
            this.#D(JSON.stringify(e), t, g("application/json", r));
          html = (e, t, r) => {
            let s = (e) => this.#D(e, t, g("text/html; charset=UTF-8", r));
            return "object" == typeof e
              ? p(e, u.Stringify, !1, {}).then(s)
              : s(e);
          };
          redirect = (e, t) => (
            this.header("Location", String(e)), this.newResponse(null, t ?? 302)
          );
          notFound = () => ((this.#s ??= () => new Response()), this.#s(this));
        };
    },
    43774: (e, t, r) => {
      r.d(t, { $: () => s.$ });
      var s = r(16789);
    },
    79533: (e, t, r) => {
      r.d(t, {
        Rp: () => w,
        SA: () => l,
        Uf: () => s,
        WE: () => n,
        Yn: () => u,
        jA: () => o,
        md: () => c,
        qn: () => b,
        uc: () => f,
        vA: () => y,
        wU: () => p,
      });
      var s = (e) => {
          let t = e.split("/");
          return "" === t[0] && t.shift(), t;
        },
        n = (e) => {
          let { groups: t, path: r } = i(e);
          return a(s(r), t);
        },
        i = (e) => {
          let t = [];
          return (
            (e = e.replace(/\{[^}]+\}/g, (e, r) => {
              let s = `@${r}`;
              return t.push([s, e]), s;
            })),
            { groups: t, path: e }
          );
        },
        a = (e, t) => {
          for (let r = t.length - 1; r >= 0; r--) {
            let [s] = t[r];
            for (let n = e.length - 1; n >= 0; n--)
              if (e[n].includes(s)) {
                e[n] = e[n].replace(s, t[r][1]);
                break;
              }
          }
          return e;
        },
        h = {},
        o = (e, t) => {
          if ("*" === e) return "*";
          let r = e.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);
          if (r) {
            let s = `${e}#${t}`;
            return (
              h[s] ||
                (r[2]
                  ? (h[s] =
                      t && ":" !== t[0] && "*" !== t[0]
                        ? [s, r[1], RegExp(`^${r[2]}(?=/${t})`)]
                        : [e, r[1], RegExp(`^${r[2]}$`)])
                  : (h[s] = [e, r[1], !0])),
              h[s]
            );
          }
          return null;
        },
        l = (e, t) => {
          try {
            return t(e);
          } catch {
            return e.replace(/(?:%[0-9A-Fa-f]{2})+/g, (e) => {
              try {
                return t(e);
              } catch {
                return e;
              }
            });
          }
        },
        d = (e) => l(e, decodeURI),
        u = (e) => {
          let t = e.url,
            r = t.indexOf("/", 58 === t.charCodeAt(9) ? 13 : 8),
            s = r;
          for (; s < t.length; s++) {
            let e = t.charCodeAt(s);
            if (37 === e) {
              let e = t.indexOf("?", s),
                n = t.slice(r, -1 === e ? void 0 : e);
              return d(n.includes("%25") ? n.replace(/%25/g, "%2525") : n);
            }
            if (63 === e) break;
          }
          return t.slice(r, s);
        },
        c = (e) => {
          let t = u(e);
          return t.length > 1 && "/" === t.at(-1) ? t.slice(0, -1) : t;
        },
        f = (e, t, ...r) => (
          r.length && (t = f(t, ...r)),
          `${e?.[0] === "/" ? "" : "/"}${e}${"/" === t ? "" : `${e?.at(-1) === "/" ? "" : "/"}${t?.[0] === "/" ? t.slice(1) : t}`}`
        ),
        p = (e) => {
          if (63 !== e.charCodeAt(e.length - 1) || !e.includes(":"))
            return null;
          let t = e.split("/"),
            r = [],
            s = "";
          return (
            t.forEach((e) => {
              if ("" === e || /\:/.test(e)) {
                if (/\:/.test(e))
                  if (/\?/.test(e)) {
                    0 === r.length && "" === s ? r.push("/") : r.push(s);
                    let t = e.replace("?", "");
                    (s += "/" + t), r.push(s);
                  } else s += "/" + e;
              } else s += "/" + e;
            }),
            r.filter((e, t, r) => r.indexOf(e) === t)
          );
        },
        g = (e) =>
          /[%+]/.test(e)
            ? (-1 !== e.indexOf("+") && (e = e.replace(/\+/g, " ")),
              -1 !== e.indexOf("%") ? l(e, w) : e)
            : e,
        m = (e, t, r) => {
          let s;
          if (!r && t && !/[%+]/.test(t)) {
            let r = e.indexOf(`?${t}`, 8);
            for (-1 === r && (r = e.indexOf(`&${t}`, 8)); -1 !== r; ) {
              let s = e.charCodeAt(r + t.length + 1);
              if (61 === s) {
                let s = r + t.length + 2,
                  n = e.indexOf("&", s);
                return g(e.slice(s, -1 === n ? void 0 : n));
              }
              if (38 == s || isNaN(s)) return "";
              r = e.indexOf(`&${t}`, r + 1);
            }
            if (!(s = /[%+]/.test(e))) return;
          }
          let n = {};
          s ??= /[%+]/.test(e);
          let i = e.indexOf("?", 8);
          for (; -1 !== i; ) {
            let t,
              a = e.indexOf("&", i + 1),
              h = e.indexOf("=", i);
            h > a && -1 !== a && (h = -1);
            let o = e.slice(i + 1, -1 === h ? (-1 === a ? void 0 : a) : h);
            s && (o = g(o)),
              (i = a),
              "" !== o &&
                (-1 === h
                  ? (t = "")
                  : ((t = e.slice(h + 1, -1 === a ? void 0 : a)),
                    s && (t = g(t))),
                r
                  ? ((n[o] && Array.isArray(n[o])) || (n[o] = []), n[o].push(t))
                  : (n[o] ??= t));
          }
          return t ? n[t] : n;
        },
        b = m,
        y = (e, t) => m(e, t, !0),
        w = decodeURIComponent;
    },
  });
//# sourceMappingURL=3774.js.map
