try {
  let t =
      "undefined" != typeof window
        ? window
        : "undefined" != typeof global
          ? global
          : "undefined" != typeof globalThis
            ? globalThis
            : "undefined" != typeof self
              ? self
              : {},
    e = new t.Error().stack;
  e &&
    ((t._sentryDebugIds = t._sentryDebugIds || {}),
    (t._sentryDebugIds[e] = "e1808ed0-58ea-4db9-b193-6c1b94d2d771"),
    (t._sentryDebugIdIdentifier =
      "sentry-dbid-e1808ed0-58ea-4db9-b193-6c1b94d2d771"));
} catch (t) {}
("use strict");
(() => {
  var t = {};
  (t.id = 317),
    (t.ids = [317]),
    (t.modules = {
      660: (t, e, n) => {
        n.a(t, async (t, r) => {
          try {
            n.d(e, { MC: () => a });
            var i = n(20716),
              o = t([i]);
            i = (o.then ? (await o)() : o)[0];
            let a = !!(
              process.env.PLAYWRIGHT_TEST_BASE_URL ||
              process.env.PLAYWRIGHT ||
              process.env.CI_PLAYWRIGHT
            );
            (0, i.p1)(), r();
          } catch (t) {
            r(t);
          }
        });
      },
      2659: (t, e, n) => {
        n.d(e, { Ao: () => a });
        let r = `
Artifacts is a special user interface mode that helps users with writing, editing, and other content creation tasks. When artifact is open, it is on the right side of the screen, while the conversation is on the left side. When creating or updating documents, changes are reflected in real-time on the artifacts and visible to the user.

When asked to write code, always use artifacts. When writing code, specify the language in the backticks, e.g. \`\`\`python\`code here\`\`\`. The default language is Python. Other languages are not yet supported, so let the user know if they request a different language.

DO NOT UPDATE DOCUMENTS IMMEDIATELY AFTER CREATING THEM. WAIT FOR USER FEEDBACK OR REQUEST TO UPDATE IT.

This is a guide for using artifacts tools: \`createDocument\` and \`updateDocument\`, which render content on a artifacts beside the conversation.

**When to use \`createDocument\`:**
- For substantial content (>10 lines) or code
- For content users will likely save/reuse (emails, code, essays, etc.)
- When explicitly requested to create a document
- For when content contains a single code snippet

**When NOT to use \`createDocument\`:**
- For informational/explanatory content
- For conversational responses
- When asked to keep it in chat

**Using \`updateDocument\`:**
- Default to full document rewrites for major changes
- Use targeted updates only for specific, isolated changes
- Follow user instructions for which parts to modify

**When NOT to use \`updateDocument\`:**
- Immediately after creating a document

Do not update document right after creating it. Wait for user feedback or request to update it.
`,
          i =
            "You are a friendly assistant! Keep your responses concise and helpful.",
          o = (t) => `\
About the origin of user's request:
- lat: ${t.latitude}
- lon: ${t.longitude}
- city: ${t.city}
- country: ${t.country}
`,
          a = ({ selectedChatModel: t, requestHints: e }) => {
            let n = o(e);
            return "chat-model-reasoning" === t
              ? `${i}

${n}`
              : `${i}

${n}

${r}`;
          };
      },
      3295: (t) => {
        t.exports = require("next/dist/server/app-render/after-task-async-storage.external.js");
      },
      3422: (t, e, n) => {
        n.a(t, async (t, r) => {
          try {
            n.d(e, { m: () => p });
            var i = n(58184),
              o = n(84170),
              a = n(85488),
              s = n(660),
              u = t([a, s]);
            [a, s] = u.then ? (await u)() : u;
            let c = null,
              l = null,
              d = null,
              f = null;
            if (s.MC) {
              let t = (t) => ({
                id: `mock-${t}`,
                doGenerate: async () => ({ text: `mock response from ${t}` }),
              });
              (c = t("chat")),
                (l = t("reasoning")),
                (d = t("title")),
                (f = t("artifact"));
            }
            let p = s.MC
              ? (0, a.customProvider)({
                  languageModels: {
                    "chat-model-small": c,
                    "chat-model-large": c,
                    "chat-model-reasoning": l,
                    "title-model": d,
                    "artifact-model": f,
                  },
                })
              : (0, a.customProvider)({
                  languageModels: {
                    "chat-model-small": (0, o.N)("gpt-4o-mini"),
                    "chat-model-large": (0, o.N)("gpt-4o"),
                    "chat-model-reasoning": (0, a.wrapLanguageModel)({
                      model: (0, i.P)("accounts/fireworks/models/deepseek-r1"),
                      middleware: (0, a.extractReasoningMiddleware)({
                        tagName: "think",
                      }),
                    }),
                    "title-model": (0, o.N)("gpt-4-turbo"),
                    "artifact-model": (0, o.N)("gpt-4o-mini"),
                  },
                  imageModels: {
                    "small-model": o.N.image("dall-e-2"),
                    "large-model": o.N.image("dall-e-3"),
                  },
                });
            r();
          } catch (t) {
            r(t);
          }
        });
      },
      4387: (t, e, n) => {
        n.d(e, { sx: () => on });
        var r,
          i,
          o,
          a,
          s,
          u,
          c,
          l,
          d,
          f,
          p,
          h,
          m,
          v,
          g,
          y,
          _,
          b,
          w,
          S,
          k,
          x,
          E,
          C,
          T = {
            log: "log",
            debug: "debug",
            info: "info",
            warn: "warn",
            error: "error",
          },
          I = console,
          R = {};
        Object.keys(T).forEach(function (t) {
          R[t] = I[t];
        });
        var A = "Datadog Browser SDK:",
          O = {
            debug: R.debug.bind(I, A),
            log: R.log.bind(I, A),
            info: R.info.bind(I, A),
            warn: R.warn.bind(I, A),
            error: R.error.bind(I, A),
          },
          N = "https://docs.datadoghq.com",
          D = "".concat(N, "/real_user_monitoring/browser/troubleshooting"),
          M = "More details:";
        function P(t, e) {
          return function () {
            for (var n = [], r = 0; r < arguments.length; r++)
              n[r] = arguments[r];
            try {
              return t.apply(void 0, n);
            } catch (t) {
              O.error(e, t);
            }
          };
        }
        var L = function (t, e, n) {
            if (n || 2 == arguments.length)
              for (var r, i = 0, o = e.length; i < o; i++)
                (!r && i in e) ||
                  (r || (r = Array.prototype.slice.call(e, 0, i)),
                  (r[i] = e[i]));
            return t.concat(r || Array.prototype.slice.call(e));
          },
          U = !1;
        function j(t) {
          U = t;
        }
        function V(t) {
          return function () {
            return q(t, this, arguments);
          };
        }
        function q(t, e, n) {
          try {
            return t.apply(e, n);
          } catch (t) {
            if ((z(t), r))
              try {
                r(t);
              } catch (t) {
                z(t);
              }
          }
        }
        function z() {
          for (var t = [], e = 0; e < arguments.length; e++)
            t[e] = arguments[e];
          U && O.error.apply(O, L(["[MONITOR]"], t, !1));
        }
        function B(t, e) {
          return -1 !== t.indexOf(e);
        }
        function F(t) {
          if (Array.from) return Array.from(t);
          var e = [];
          if (t instanceof Set)
            t.forEach(function (t) {
              return e.push(t);
            });
          else for (var n = 0; n < t.length; n++) e.push(t[n]);
          return e;
        }
        function G(t, e) {
          for (var n = 0; n < t.length; n += 1) {
            var r = t[n];
            if (e(r, n)) return r;
          }
        }
        function H(t) {
          return Object.keys(t).map(function (e) {
            return t[e];
          });
        }
        function $(t) {
          return Object.keys(t).map(function (e) {
            return [e, t[e]];
          });
        }
        function Y(t, e) {
          return t.slice(0, e.length) === e;
        }
        function W(t) {
          for (var e = [], n = 1; n < arguments.length; n++)
            e[n - 1] = arguments[n];
          return (
            e.forEach(function (e) {
              for (var n in e)
                Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
            }),
            t
          );
        }
        function K() {
          if ("object" == typeof globalThis) return globalThis;
          Object.defineProperty(Object.prototype, "_dd_temp_", {
            get: function () {
              return this;
            },
            configurable: !0,
          });
          var t = _dd_temp_;
          return (
            delete Object.prototype._dd_temp_,
            "object" != typeof t &&
              (t =
                "object" == typeof self
                  ? self
                  : "object" == typeof window
                    ? window
                    : {}),
            t
          );
        }
        var J = /[^\u0000-\u007F]/;
        function X(t) {
          return J.test(t)
            ? void 0 !== window.TextEncoder
              ? new TextEncoder().encode(t).length
              : new Blob([t]).size
            : t.length;
        }
        function Q(t, e) {
          var n,
            r = K();
          return (
            r.Zone &&
              "function" == typeof r.Zone.__symbol__ &&
              (n = t[r.Zone.__symbol__(e)]),
            n || (n = t[e]),
            n
          );
        }
        function Z(t, e) {
          return Q(K(), "setTimeout")(V(t), e);
        }
        function tt(t) {
          Q(K(), "clearTimeout")(t);
        }
        function te(t, e) {
          return Q(K(), "setInterval")(V(t), e);
        }
        function tn(t) {
          Q(K(), "clearInterval")(t);
        }
        function tr(t, e, n) {
          var r,
            i,
            o = !n || void 0 === n.leading || n.leading,
            a = !n || void 0 === n.trailing || n.trailing,
            s = !1;
          return {
            throttled: function () {
              for (var n = [], u = 0; u < arguments.length; u++)
                n[u] = arguments[u];
              if (s) {
                r = n;
                return;
              }
              o ? t.apply(void 0, n) : (r = n),
                (s = !0),
                (i = Z(function () {
                  a && r && t.apply(void 0, r), (s = !1), (r = void 0);
                }, e));
            },
            cancel: function () {
              tt(i), (s = !1), (r = void 0);
            },
          };
        }
        function ti() {}
        function to(t, e, n) {
          if ("object" != typeof t || null === t) return JSON.stringify(t);
          var r = ta(Object.prototype),
            i = ta(Array.prototype),
            o = ta(Object.getPrototypeOf(t)),
            a = ta(t);
          try {
            return JSON.stringify(t, e, n);
          } catch (t) {
            return "<error: unable to serialize object>";
          } finally {
            r(), i(), o(), a();
          }
        }
        function ta(t) {
          var e = t.toJSON;
          return e
            ? (delete t.toJSON,
              function () {
                t.toJSON = e;
              })
            : ti;
        }
        function ts(t) {
          return W({}, t);
        }
        function tu(t, e) {
          return Object.keys(t).some(function (n) {
            return t[n] === e;
          });
        }
        function tc(t) {
          return 0 === Object.keys(t).length;
        }
        function tl(t) {
          var e = 0,
            n = tr(function (n) {
              (e = X(to(n))), t();
            }, 200),
            r = n.throttled,
            i = n.cancel,
            o = function () {
              i(), (e = 0);
            };
          return {
            updateCustomerData: function (t) {
              tc(t) ? o() : r(t);
            },
            resetCustomerData: o,
            getBytesCount: function () {
              return e;
            },
            stop: function () {
              i();
            },
          };
        }
        function td(t) {
          return null === t ? "null" : Array.isArray(t) ? "array" : typeof t;
        }
        function tf(t, e, n) {
          if (
            (void 0 === n &&
              (n = (function () {
                if ("undefined" != typeof WeakSet) {
                  var t = new WeakSet();
                  return {
                    hasAlreadyBeenSeen: function (e) {
                      var n = t.has(e);
                      return n || t.add(e), n;
                    },
                  };
                }
                var e = [];
                return {
                  hasAlreadyBeenSeen: function (t) {
                    var n = e.indexOf(t) >= 0;
                    return n || e.push(t), n;
                  },
                };
              })()),
            void 0 === e)
          )
            return t;
          if ("object" != typeof e || null === e) return e;
          if (e instanceof Date) return new Date(e.getTime());
          if (e instanceof RegExp) {
            var r =
              e.flags ||
              [
                e.global ? "g" : "",
                e.ignoreCase ? "i" : "",
                e.multiline ? "m" : "",
                e.sticky ? "y" : "",
                e.unicode ? "u" : "",
              ].join("");
            return new RegExp(e.source, r);
          }
          if (!n.hasAlreadyBeenSeen(e)) {
            if (Array.isArray(e)) {
              for (var i = Array.isArray(t) ? t : [], o = 0; o < e.length; ++o)
                i[o] = tf(i[o], e[o], n);
              return i;
            }
            var a = "object" === td(t) ? t : {};
            for (var s in e)
              Object.prototype.hasOwnProperty.call(e, s) &&
                (a[s] = tf(a[s], e[s], n));
            return a;
          }
        }
        function tp(t) {
          return tf(void 0, t);
        }
        function th() {
          for (var t, e = [], n = 0; n < arguments.length; n++)
            e[n] = arguments[n];
          for (var r = 0; r < e.length; r++) {
            var i = e[r];
            null != i && (t = tf(t, i));
          }
          return t;
        }
        function tm(t, e) {
          void 0 === e && (e = 225280);
          var n = ta(Object.prototype),
            r = ta(Array.prototype),
            i = [],
            o = new WeakMap(),
            a = tv(t, "$", void 0, i, o),
            s = JSON.stringify(a),
            u = s ? s.length : 0;
          if (u > e) return void tg(e, "discarded", t);
          for (; i.length > 0 && u < e; ) {
            var c = i.shift(),
              l = 0;
            if (Array.isArray(c.source))
              for (var d = 0; d < c.source.length; d++) {
                var f = tv(c.source[d], c.path, d, i, o);
                if (
                  (void 0 !== f ? (u += JSON.stringify(f).length) : (u += 4),
                  (u += l),
                  (l = 1),
                  u > e)
                ) {
                  tg(e, "truncated", t);
                  break;
                }
                c.target[d] = f;
              }
            else
              for (var d in c.source)
                if (Object.prototype.hasOwnProperty.call(c.source, d)) {
                  var f = tv(c.source[d], c.path, d, i, o);
                  if (
                    (void 0 !== f &&
                      ((u += JSON.stringify(f).length + l + d.length + 3),
                      (l = 1)),
                    u > e)
                  ) {
                    tg(e, "truncated", t);
                    break;
                  }
                  c.target[d] = f;
                }
          }
          return n(), r(), a;
        }
        function tv(t, e, n, r, i) {
          var o,
            a = (function (t) {
              if (t && "function" == typeof t.toJSON)
                try {
                  return t.toJSON();
                } catch (t) {}
              return t;
            })(t);
          if (!a || "object" != typeof a) {
            return "bigint" == typeof (o = a)
              ? "[BigInt] ".concat(o.toString())
              : "function" == typeof o
                ? "[Function] ".concat(o.name || "unknown")
                : "symbol" == typeof o
                  ? "[Symbol] ".concat(o.description || o.toString())
                  : o;
          }
          var s = (function (t) {
            try {
              if (t instanceof Event) return { isTrusted: t.isTrusted };
              var e = Object.prototype.toString
                .call(t)
                .match(/\[object (.*)\]/);
              if (e && e[1]) return "[".concat(e[1], "]");
            } catch (t) {}
            return "[Unserializable]";
          })(a);
          if ("[Object]" !== s && "[Array]" !== s && "[Error]" !== s) return s;
          if (i.has(t)) return "[Reference seen at ".concat(i.get(t), "]");
          var u = void 0 !== n ? "".concat(e, ".").concat(n) : e,
            c = Array.isArray(a) ? [] : {};
          return i.set(t, u), r.push({ source: a, target: c, path: u }), c;
        }
        function tg(t, e, n) {
          O.warn(
            "The data provided has been "
              .concat(e, " as it is over the limit of ")
              .concat(t, " characters:"),
            n,
          );
        }
        var ty = (function () {
          function t(t) {
            (this.onFirstSubscribe = t), (this.observers = []);
          }
          return (
            (t.prototype.subscribe = function (t) {
              var e = this;
              return (
                this.observers.push(t),
                1 === this.observers.length &&
                  this.onFirstSubscribe &&
                  (this.onLastUnsubscribe =
                    this.onFirstSubscribe(this) || void 0),
                {
                  unsubscribe: function () {
                    (e.observers = e.observers.filter(function (e) {
                      return t !== e;
                    })),
                      !e.observers.length &&
                        e.onLastUnsubscribe &&
                        e.onLastUnsubscribe();
                  },
                }
              );
            }),
            (t.prototype.notify = function (t) {
              this.observers.forEach(function (e) {
                return e(t);
              });
            }),
            t
          );
        })();
        function t_() {
          for (var t = [], e = 0; e < arguments.length; e++)
            t[e] = arguments[e];
          return new ty(function (e) {
            var n = t.map(function (t) {
              return t.subscribe(function (t) {
                return e.notify(t);
              });
            });
            return function () {
              return n.forEach(function (t) {
                return t.unsubscribe();
              });
            };
          });
        }
        function tb(t) {
          var e = {},
            n = new ty(),
            r = {
              getContext: function () {
                return tp(e);
              },
              setContext: function (i) {
                "object" === td(i)
                  ? ((e = tm(i)), null == t || t.updateCustomerData(e))
                  : r.clearContext(),
                  n.notify();
              },
              setContextProperty: function (r, i) {
                (e[r] = tm(i)),
                  null == t || t.updateCustomerData(e),
                  n.notify();
              },
              removeContextProperty: function (r) {
                delete e[r], null == t || t.updateCustomerData(e), n.notify();
              },
              clearContext: function () {
                (e = {}), null == t || t.resetCustomerData(), n.notify();
              },
              changeObservable: n,
            };
          return r;
        }
        var tw = { GRANTED: "granted", NOT_GRANTED: "not-granted" };
        function tS(t, e, n, r, i) {
          return tk(t, e, [n], r, i);
        }
        function tk(t, e, n, r, i) {
          var o = void 0 === i ? {} : i,
            a = o.once,
            s = o.capture,
            u = o.passive,
            c = V(function (e) {
              (e.isTrusted || e.__ddIsTrusted || t.allowUntrustedEvents) &&
                (a && p(), r(e));
            }),
            l = u ? { capture: s, passive: u } : s,
            d =
              window.EventTarget && e instanceof EventTarget
                ? window.EventTarget.prototype
                : e,
            f = Q(d, "addEventListener");
          function p() {
            var t = Q(d, "removeEventListener");
            n.forEach(function (n) {
              return t.call(e, n, c, l);
            });
          }
          return (
            n.forEach(function (t) {
              return f.call(e, t, c, l);
            }),
            { stop: p }
          );
        }
        var tx = [];
        function tE(t, e, n, r) {
          var i,
            o,
            a =
              ((i = n),
              (o = r),
              "".concat("_dd_c", "_").concat(i, "_").concat(o));
          function s() {
            var t = localStorage.getItem(a);
            return null !== t ? JSON.parse(t) : {};
          }
          tx.push(
            tS(t, window, "storage", function (t) {
              a === t.key && e.setContext(s());
            }),
          ),
            e.changeObservable.subscribe(function () {
              localStorage.setItem(a, JSON.stringify(e.getContext()));
            }),
            e.setContext(th(s(), e.getContext()));
        }
        function tC() {
          var t = "",
            e = 0;
          return {
            isAsync: !1,
            get isEmpty() {
              return !t;
            },
            write: function (n, r) {
              var i = X(n);
              (e += i), (t += n), r && r(i);
            },
            finish: function (t) {
              t(this.finishSync());
            },
            finishSync: function () {
              var n = {
                output: t,
                outputBytesCount: e,
                rawBytesCount: e,
                pendingData: "",
              };
              return (t = ""), (e = 0), n;
            },
            estimateEncodedBytesCount: function (t) {
              return t.length;
            },
          };
        }
        function tT(t) {
          var e = [],
            n = tL(t, "stack"),
            r = String(t);
          return (
            n && Y(n, r) && (n = n.slice(r.length)),
            n &&
              n.split("\n").forEach(function (t) {
                var n =
                  (function (t) {
                    var e = tA.exec(t);
                    if (e) {
                      var n = e[2] && 0 === e[2].indexOf("native"),
                        r = e[2] && 0 === e[2].indexOf("eval"),
                        i = tO.exec(e[2]);
                      return (
                        r && i && ((e[2] = i[1]), (e[3] = i[2]), (e[4] = i[3])),
                        {
                          args: n ? [e[2]] : [],
                          column: e[4] ? +e[4] : void 0,
                          func: e[1] || "?",
                          line: e[3] ? +e[3] : void 0,
                          url: n ? void 0 : e[2],
                        }
                      );
                    }
                  })(t) ||
                  (function (t) {
                    var e = tN.exec(t);
                    if (e)
                      return {
                        args: [],
                        column: e[3] ? +e[3] : void 0,
                        func: "?",
                        line: e[2] ? +e[2] : void 0,
                        url: e[1],
                      };
                  })(t) ||
                  (function (t) {
                    var e = tD.exec(t);
                    if (e)
                      return {
                        args: [],
                        column: e[4] ? +e[4] : void 0,
                        func: e[1] || "?",
                        line: +e[3],
                        url: e[2],
                      };
                  })(t) ||
                  (function (t) {
                    var e = tM.exec(t);
                    if (e) {
                      var n = e[3] && e[3].indexOf(" > eval") > -1,
                        r = tP.exec(e[3]);
                      return (
                        n &&
                          r &&
                          ((e[3] = r[1]), (e[4] = r[2]), (e[5] = void 0)),
                        {
                          args: e[2] ? e[2].split(",") : [],
                          column: e[5] ? +e[5] : void 0,
                          func: e[1] || "?",
                          line: e[4] ? +e[4] : void 0,
                          url: e[3],
                        }
                      );
                    }
                  })(t);
                n && (!n.func && n.line && (n.func = "?"), e.push(n));
              }),
            { message: tL(t, "message"), name: tL(t, "name"), stack: e }
          );
        }
        var tI =
            "((?:file|https?|blob|chrome-extension|electron|native|eval|webpack|snippet|<anonymous>|\\w+\\.|\\/).*?)",
          tR = "(?::(\\d+))",
          tA = RegExp(
            "^\\s*at (.*?) ?\\("
              .concat(tI)
              .concat(tR, "?")
              .concat(tR, "?\\)?\\s*$"),
            "i",
          ),
          tO = new RegExp("\\((\\S*)".concat(tR).concat(tR, "\\)")),
          tN = RegExp(
            "^\\s*at ?".concat(tI).concat(tR, "?").concat(tR, "??\\s*$"),
            "i",
          ),
          tD =
            /^\s*at (?:((?:\[object object\])?.+) )?\(?((?:file|ms-appx|https?|webpack|blob):.*?):(\d+)(?::(\d+))?\)?\s*$/i,
          tM =
            /^\s*(.*?)(?:\((.*?)\))?(?:^|@)((?:file|https?|blob|chrome|webpack|resource|capacitor|\[native).*?|[^@]*bundle)(?::(\d+))?(?::(\d+))?\s*$/i,
          tP = /(\S+) line (\d+)(?: > eval line \d+)* > eval/i;
        function tL(t, e) {
          if ("object" == typeof t && t && e in t) {
            var n = t[e];
            return "string" == typeof n ? n : void 0;
          }
        }
        var tU =
          /^(?:[Uu]ncaught (?:exception: )?)?(?:((?:Eval|Internal|Range|Reference|Syntax|Type|URI|)Error): )?([\s\S]*)$/;
        function tj() {
          var t,
            e = Error();
          if (!e.stack)
            try {
              throw e;
            } catch (t) {}
          return (
            q(function () {
              var n = tT(e);
              (n.stack = n.stack.slice(2)), (t = tV(n));
            }),
            t
          );
        }
        function tV(t) {
          var e = tq(t);
          return (
            t.stack.forEach(function (t) {
              var n = "?" === t.func ? "<anonymous>" : t.func,
                r =
                  t.args && t.args.length > 0
                    ? "(".concat(t.args.join(", "), ")")
                    : "",
                i = t.line ? ":".concat(t.line) : "",
                o = t.line && t.column ? ":".concat(t.column) : "";
              e += "\n  at "
                .concat(n)
                .concat(r, " @ ")
                .concat(t.url)
                .concat(i)
                .concat(o);
            }),
            e
          );
        }
        function tq(t) {
          return "".concat(t.name || "Error", ": ").concat(t.message);
        }
        var tz = "No stack, consider using an instance of Error";
        function tB(t) {
          var e,
            n,
            r,
            i,
            o,
            a,
            s = t.stackTrace,
            u = t.originalError,
            c = t.handlingStack,
            l = t.startClocks,
            d = t.nonErrorPrefix,
            f = t.source,
            p = t.handling,
            h = tG(u),
            m =
              ((e = s),
              (n = h),
              (r = d),
              (i = u),
              (null == e ? void 0 : e.message) && (null == e ? void 0 : e.name)
                ? e.message
                : n
                  ? "Empty message"
                  : "".concat(r, " ").concat(to(tm(i)))),
            v = ((o = h),
            void 0 !== (a = s) &&
              (o ||
                (a.stack.length > 0 &&
                  (a.stack.length > 1 || void 0 !== a.stack[0].url))))
              ? tV(s)
              : tz,
            g = h ? tH(u, f) : void 0,
            y = s ? s.name : void 0,
            _ = tF(u);
          return {
            startClocks: l,
            source: f,
            handling: p,
            handlingStack: c,
            originalError: u,
            type: y,
            message: m,
            stack: v,
            causes: g,
            fingerprint: _,
          };
        }
        function tF(t) {
          return tG(t) && "dd_fingerprint" in t
            ? String(t.dd_fingerprint)
            : void 0;
        }
        function tG(t) {
          return (
            t instanceof Error ||
            "[object Error]" === Object.prototype.toString.call(t)
          );
        }
        function tH(t, e) {
          for (
            var n = t, r = [];
            tG(null == n ? void 0 : n.cause) && r.length < 10;

          ) {
            var i = tT(n.cause);
            r.push({
              message: n.cause.message,
              source: e,
              type: null == i ? void 0 : i.name,
              stack: i && tV(i),
            }),
              (n = n.cause);
          }
          return r.length ? r : void 0;
        }
        !(function (t) {
          (t.WRITABLE_RESOURCE_GRAPHQL = "writable_resource_graphql"),
            (t.REMOTE_CONFIGURATION = "remote_configuration"),
            (t.LONG_ANIMATION_FRAME = "long_animation_frame"),
            (t.ANONYMOUS_USER_TRACKING = "anonymous_user_tracking"),
            (t.ACTION_NAME_MASKING = "action_name_masking"),
            (t.CONSISTENT_TRACE_SAMPLING = "consistent_trace_sampling"),
            (t.DELAY_VIEWPORT_COLLECTION = "delay_viewport_collection");
        })(i || (i = {}));
        var t$ = new Set();
        function tY(t) {
          return t$.has(t);
        }
        var tW = "datad0g.com",
          tK = "datadoghq.com",
          tJ = ["ddsource", "ddtags"];
        function tX(t) {
          return 0 !== t && 100 * Math.random() <= t;
        }
        function tQ(t, e) {
          return +t.toFixed(e);
        }
        function tZ(t) {
          return "number" == typeof t;
        }
        var t0 = 31536e6;
        function t1(t) {
          var e, n, r;
          return {
            relative: t,
            timeStamp:
              ((e = t),
              (n = t3() - performance.now()) > t9()
                ? Math.round(
                    (function (t, e) {
                      return t + e;
                    })(n, e),
                  )
                : ((r = e), Math.round(t9() + r))),
          };
        }
        function t2(t) {
          return tZ(t) ? tQ(1e6 * t, 0) : t;
        }
        function t3() {
          return new Date().getTime();
        }
        function t5() {
          return t3();
        }
        function t6() {
          return performance.now();
        }
        function t4() {
          return { relative: t6(), timeStamp: t5() };
        }
        function t8() {
          return { relative: 0, timeStamp: t9() };
        }
        function t9() {
          return void 0 === o && (o = performance.timing.navigationStart), o;
        }
        function t7(t, e) {
          var n = window.__ddBrowserSdkExtensionCallback;
          n && n({ type: t, payload: e });
        }
        function et() {
          var t,
            e = window.navigator;
          return {
            status: e.onLine ? "connected" : "not_connected",
            interfaces:
              e.connection && e.connection.type ? [e.connection.type] : void 0,
            effective_type:
              null == (t = e.connection) ? void 0 : t.effectiveType,
          };
        }
        function ee(t, e) {
          var n = t.indexOf(e);
          n >= 0 && t.splice(n, 1);
        }
        function en() {
          var t = [];
          return {
            add: function (e) {
              t.push(e) > 500 && t.splice(0, 1);
            },
            remove: function (e) {
              ee(t, e);
            },
            drain: function (e) {
              t.forEach(function (t) {
                return t(e);
              }),
                (t.length = 0);
            },
          };
        }
        var er = { log: "log", configuration: "configuration", usage: "usage" },
          ei = [
            "https://www.datadoghq-browser-agent.com",
            "https://www.datad0g-browser-agent.com",
            "https://d3uc069fcn7uxw.cloudfront.net",
            "https://d20xtzwzcl0ceb.cloudfront.net",
            "http://localhost",
            "<anonymous>",
          ],
          eo = ["ddog-gov.com"],
          ea = en(),
          es = function (t) {
            ea.add(function () {
              return es(t);
            });
          };
        function eu(t, e) {
          z(T.debug, t, e),
            es(W({ type: er.log, message: t, status: "debug" }, e));
        }
        function ec(t, e) {
          es(
            W(
              { type: er.log, status: "error" },
              (function (t) {
                if (tG(t)) {
                  var e,
                    n = tT(t);
                  return {
                    error: {
                      kind: n.name,
                      stack: tV(
                        (((e = n).stack = e.stack.filter(function (t) {
                          return (
                            !t.url ||
                            ei.some(function (e) {
                              return Y(t.url, e);
                            })
                          );
                        })),
                        e),
                      ),
                    },
                    message: n.message,
                  };
                }
                return {
                  error: { stack: tz },
                  message: "".concat("Uncaught", " ").concat(to(t)),
                };
              })(t),
              e,
            ),
          );
        }
        function el(t) {
          es({ type: er.usage, usage: t });
        }
        function ed(t) {
          var e = W({}, t);
          return (
            ["id", "name", "email"].forEach(function (t) {
              t in e && (e[t] = String(e[t]));
            }),
            e
          );
        }
        function ef(t, e) {
          e.silentMultipleInit ||
            O.error("".concat(t, " is already initialized."));
        }
        function ep(t) {
          return t
            ? (
                parseInt(t, 10) ^
                ((16 * Math.random()) >> (parseInt(t, 10) / 4))
              ).toString(16)
            : ""
                .concat(1e7, "-")
                .concat(1e3, "-")
                .concat(4e3, "-")
                .concat(8e3, "-")
                .concat(1e11)
                .replace(/[018]/g, ep);
        }
        var eh = /([\w-]+)\s*=\s*([^;]+)/g;
        function em(t, e) {
          for (eh.lastIndex = 0; ; ) {
            var n = eh.exec(t);
            if (n) {
              if (n[1] === e) return n[2];
            } else break;
          }
        }
        function ev(t, e, n) {
          void 0 === n && (n = "");
          var r = t.charCodeAt(e - 1),
            i = r >= 55296 && r <= 56319 ? e + 1 : e;
          return t.length <= i ? t : "".concat(t.slice(0, i)).concat(n);
        }
        function eg(t, e, n) {
          var r = t.vitalsByName,
            i = t.vitalsByReference;
          void 0 === n && (n = {});
          var o = {
              name: e,
              startClocks: t4(),
              context: n.context,
              description: n.description,
            },
            a = { __dd_vital_reference: !0 };
          return r.set(e, o), i.set(a, o), a;
        }
        function ey(t, e, n, r) {
          var i,
            o,
            a,
            s,
            u,
            c,
            l = e.vitalsByName,
            d = e.vitalsByReference;
          void 0 === r && (r = {});
          var f = "string" == typeof n ? l.get(n) : d.get(n);
          f &&
            (t(
              ((i = f),
              (o = f.startClocks),
              (a = r),
              (s = t4()),
              {
                name: i.name,
                type: "duration",
                startClocks: o,
                duration: ((c = o.timeStamp), s.timeStamp - c),
                context: th(i.context, a.context),
                description: null != (u = a.description) ? u : i.description,
              }),
            ),
            "string" == typeof n ? l.delete(n) : d.delete(n));
        }
        function e_() {
          var t = K().DatadogEventBridge;
          if (t)
            return {
              getCapabilities: function () {
                var e;
                return JSON.parse(
                  (null == (e = t.getCapabilities) ? void 0 : e.call(t)) ||
                    "[]",
                );
              },
              getPrivacyLevel: function () {
                var e;
                return null == (e = t.getPrivacyLevel) ? void 0 : e.call(t);
              },
              getAllowedWebViewHosts: function () {
                return JSON.parse(t.getAllowedWebViewHosts());
              },
              send: function (e, n, r) {
                t.send(
                  JSON.stringify({
                    eventType: e,
                    event: n,
                    view: r ? { id: r } : void 0,
                  }),
                );
              },
            };
        }
        function eb(t) {
          var e = e_();
          return !!e && B(e.getCapabilities(), t);
        }
        function ew(t) {
          void 0 === t &&
            (t = null == (e = K().location) ? void 0 : e.hostname);
          var e,
            n = e_();
          return (
            !!n &&
            n.getAllowedWebViewHosts().some(function (e) {
              var n, r;
              return (
                t === e ||
                ((n = t), (r = ".".concat(e)), n.slice(-r.length) === r)
              );
            })
          );
        }
        function eS(t, e, n, r) {
          var i = (void 0 === r ? {} : r).computeHandlingStack,
            o = t[e];
          if ("function" != typeof o)
            if (!(e in t && Y(e, "on"))) return { stop: ti };
            else o = ti;
          var a = !1,
            s = function () {
              if (a) return o.apply(this, arguments);
              var t,
                e = F(arguments);
              q(n, null, [
                {
                  target: this,
                  parameters: e,
                  onPostCall: function (e) {
                    t = e;
                  },
                  handlingStack: i ? tj() : void 0,
                },
              ]);
              var r = o.apply(this, e);
              return t && q(t, null, [r]), r;
            };
          return (
            (t[e] = s),
            {
              stop: function () {
                (a = !0), t[e] === s && (t[e] = o);
              },
            }
          );
        }
        function ek(t, e, n) {
          var r = Object.getOwnPropertyDescriptor(t, e);
          if (!r || !r.set || !r.configurable) return { stop: ti };
          var i = function (t, e) {
              Z(function () {
                i !== ti && n(t, e);
              }, 0);
            },
            o = function (t) {
              r.set.call(this, t), i(this, t);
            };
          return (
            Object.defineProperty(t, e, { set: o }),
            {
              stop: function () {
                var n;
                (null == (n = Object.getOwnPropertyDescriptor(t, e))
                  ? void 0
                  : n.set) === o && Object.defineProperty(t, e, r),
                  (i = ti);
              },
            }
          );
        }
        function ex(t) {
          return eE(t, location.href).href;
        }
        function eE(t, e) {
          var n = (function () {
            if (void 0 === a)
              try {
                var t = new eC("http://test/path");
                a = "http://test/path" === t.href;
              } catch (t) {
                a = !1;
              }
            return a ? eC : void 0;
          })();
          if (n)
            try {
              return void 0 !== e ? new n(t, e) : new n(t);
            } catch (n) {
              throw Error(
                "Failed to construct URL: "
                  .concat(String(n), " ")
                  .concat(to({ url: t, base: e })),
              );
            }
          if (void 0 === e && !/:/.test(t))
            throw Error("Invalid URL: '".concat(t, "'"));
          var r = document,
            i = r.createElement("a");
          if (void 0 !== e) {
            var o = (r =
              document.implementation.createHTMLDocument("")).createElement(
              "base",
            );
            (o.href = e), r.head.appendChild(o), r.body.appendChild(i);
          }
          return (i.href = t), i;
        }
        var eC = URL;
        function eT() {
          return (
            s ||
              (s = new ty(function (t) {
                if (window.fetch)
                  return eS(
                    window,
                    "fetch",
                    function (e) {
                      var n, r, i, o, a, s, u, c, l, d, f;
                      return (
                        (n = e),
                        (r = t),
                        (i = n.parameters),
                        (o = n.onPostCall),
                        (a = n.handlingStack),
                        (s = i[0]),
                        void 0 === (c = (u = i[1]) && u.method) &&
                          s instanceof Request &&
                          (c = s.method),
                        (l = void 0 !== c ? String(c).toUpperCase() : "GET"),
                        (d = s instanceof Request ? s.url : ex(String(s))),
                        (f = {
                          state: "start",
                          init: u,
                          input: s,
                          method: l,
                          startClocks: t4(),
                          url: d,
                          handlingStack: a,
                        }),
                        void (r.notify(f),
                        (i[0] = f.input),
                        (i[1] = f.init),
                        o(function (t) {
                          var e = r,
                            n = t,
                            i = f;
                          function o(t) {
                            (i.state = "resolve"), W(i, t), e.notify(i);
                          }
                          n.then(
                            V(function (t) {
                              o({
                                response: t,
                                responseType: t.type,
                                status: t.status,
                                isAborted: !1,
                              });
                            }),
                            V(function (t) {
                              var e, n;
                              o({
                                status: 0,
                                isAborted:
                                  (null ==
                                  (n = null == (e = i.init) ? void 0 : e.signal)
                                    ? void 0
                                    : n.aborted) ||
                                  (t instanceof DOMException &&
                                    t.code === DOMException.ABORT_ERR),
                                error: t,
                              });
                            }),
                          );
                        }))
                      );
                    },
                    { computeHandlingStack: !0 },
                  ).stop;
              })),
            s
          );
        }
        function eI(t, e, n, r) {
          void 0 === n && (n = 0);
          var i = new Date();
          i.setTime(i.getTime() + n);
          var o = "expires=".concat(i.toUTCString()),
            a = r && r.crossSite ? "none" : "strict",
            s = r && r.domain ? ";domain=".concat(r.domain) : "",
            u = r && r.secure ? ";secure" : "",
            c = r && r.partitioned ? ";partitioned" : "";
          document.cookie = ""
            .concat(t, "=")
            .concat(e, ";")
            .concat(o, ";path=/;samesite=")
            .concat(a)
            .concat(s)
            .concat(u)
            .concat(c);
        }
        function eR(t) {
          return em(document.cookie, t);
        }
        function eA(t) {
          return (
            u ||
              (u = (function (t) {
                var e = new Map();
                for (eh.lastIndex = 0; ; ) {
                  var n = eh.exec(t);
                  if (n) e.set(n[1], n[2]);
                  else break;
                }
                return e;
              })(document.cookie)),
            u.get(t)
          );
        }
        function eO() {
          return !!(
            window._DATADOG_SYNTHETICS_INJECTS_RUM ||
            eA("datadog-synthetics-injects-rum")
          );
        }
        function eN() {
          var t, e, n;
          return null != l
            ? l
            : (void 0 === t && (t = window),
              (n = t.navigator.userAgent),
              (l =
                t.chrome || /HeadlessChrome/.test(n)
                  ? 1
                  : (null == (e = t.navigator.vendor)
                        ? void 0
                        : e.indexOf("Apple")) === 0 ||
                      (/safari/i.test(n) && !/chrome|android/i.test(n))
                    ? 2
                    : 3 * !t.document.documentMode));
        }
        var eD = "_dd_s",
          eM = 144e5,
          eP = 9e5,
          eL = { COOKIE: "cookie", LOCAL_STORAGE: "local-storage" },
          eU = /^([a-zA-Z]+)=([a-z0-9-]+)$/;
        function ej(t) {
          var e = { isExpired: "1" };
          return (
            tY(i.ANONYMOUS_USER_TRACKING) &&
              ((null == t ? void 0 : t.anonymousId)
                ? (e.anonymousId = null == t ? void 0 : t.anonymousId)
                : (e.anonymousId = Math.floor(
                    0x20000000000000 * Math.random(),
                  ).toString(36))),
            e
          );
        }
        function eV(t) {
          return !tc(t);
        }
        function eq(t) {
          var e;
          return (
            void 0 !== t.isExpired ||
            !(
              (void 0 === (e = t).created || t3() - Number(e.created) < eM) &&
              (void 0 === e.expire || t3() < Number(e.expire))
            )
          );
        }
        function ez(t) {
          t.expire = String(t3() + eP);
        }
        function eB(t) {
          return $(t)
            .map(function (t) {
              var e = t[0],
                n = t[1];
              return "anonymousId" === e
                ? "aid=".concat(n)
                : "".concat(e, "=").concat(n);
            })
            .join("&");
        }
        function eF(t) {
          var e = {};
          return (
            t &&
              (-1 !== t.indexOf("&") || eU.test(t)) &&
              t.split("&").forEach(function (t) {
                var n = eU.exec(t);
                if (null !== n) {
                  var r = n[1],
                    i = n[2];
                  "aid" === r ? (e.anonymousId = i) : (e[r] = i);
                }
              }),
            e
          );
        }
        function eG(t) {
          var e,
            n,
            r =
              (((n = {}).secure =
                !!(e = t).useSecureSessionCookie ||
                !!e.usePartitionedCrossSiteSessionCookie ||
                !!e.useCrossSiteSessionCookie),
              (n.crossSite =
                !!e.usePartitionedCrossSiteSessionCookie ||
                !!e.useCrossSiteSessionCookie),
              (n.partitioned = !!e.usePartitionedCrossSiteSessionCookie),
              e.trackSessionAcrossSubdomains &&
                (n.domain = (function () {
                  if (void 0 === c) {
                    for (
                      var t = "dd_site_test_".concat(ep()),
                        e = window.location.hostname.split("."),
                        n = e.pop();
                      e.length && !eR(t);

                    )
                      eI(t, "test", 1e3, {
                        domain: (n = "".concat(e.pop(), ".").concat(n)),
                      });
                    eI(t, "", 0, { domain: n }), (c = n);
                  }
                  return c;
                })()),
              n);
          return !(function (t) {
            if (void 0 === document.cookie || null === document.cookie)
              return !1;
            try {
              var e = "dd_cookie_test_".concat(ep()),
                n = "test";
              eI(e, n, 6e4, t);
              var r = eR(e) === n;
              return eI(e, "", 0, t), r;
            } catch (t) {
              return O.error(t), !1;
            }
          })(r)
            ? void 0
            : { type: eL.COOKIE, cookieOptions: r };
        }
        function eH() {
          return eF(eR(eD));
        }
        function e$() {
          try {
            var t = ep(),
              e = "".concat("_dd_test_").concat(t);
            localStorage.setItem(e, t);
            var n = localStorage.getItem(e);
            return (
              localStorage.removeItem(e),
              t === n ? { type: eL.LOCAL_STORAGE } : void 0
            );
          } catch (t) {
            return;
          }
        }
        function eY(t) {
          localStorage.setItem(eD, eB(t));
        }
        function eW() {
          return eF(localStorage.getItem(eD));
        }
        function eK(t) {
          eY(ej(t));
        }
        var eJ = [];
        function eX(t, e, n) {
          void 0 === n && (n = 0);
          var r,
            i,
            o = e.isLockEnabled,
            a = e.persistSession,
            s = e.expireSession,
            u = function (t) {
              return a(W({}, t, { lock: i }));
            },
            c = function () {
              var t = e.retrieveSession(),
                n = t.lock;
              return t.lock && delete t.lock, { session: t, lock: n };
            };
          if ((d || (d = t), t !== d)) return void eJ.push(t);
          if (o && n >= 100) return void eZ(e);
          var l = c();
          if (o && (l.lock || ((i = ep()), u(l.session), (l = c()).lock !== i)))
            return void eQ(t, e, n);
          var f = t.process(l.session);
          if (o && (l = c()).lock !== i) return void eQ(t, e, n);
          if (
            (f && (eq(f) ? s(f) : (ez(f), o ? u(f) : a(f))), o && !(f && eq(f)))
          ) {
            if ((l = c()).lock !== i) return void eQ(t, e, n);
            a(l.session), (f = l.session);
          }
          null == (r = t.after) || r.call(t, f || l.session), eZ(e);
        }
        function eQ(t, e, n) {
          Z(function () {
            eX(t, e, n + 1);
          }, 10);
        }
        function eZ(t) {
          d = void 0;
          var e = eJ.shift();
          e && eX(e, t);
        }
        function e0(t, e, n) {
          var r = (function (t, e) {
            var n = "/api/v2/".concat(e),
              r = t.proxy;
            if ("string" == typeof r) {
              var i = ex(r);
              return function (t) {
                return ""
                  .concat(i, "?ddforward=")
                  .concat(encodeURIComponent("".concat(n, "?").concat(t)));
              };
            }
            if ("function" == typeof r)
              return function (t) {
                return r({ path: n, parameters: t });
              };
            var o = (function (t, e) {
              var n = e.site,
                r = void 0 === n ? tK : n,
                i = e.internalAnalyticsSubdomain;
              if ("logs" === t && e.usePciIntake && r === tK)
                return "pci.browser-intake-datadoghq.com";
              if (i && r === tK) return "".concat(i, ".").concat(tK);
              if ("dd0g-gov.com" === r) return "http-intake.logs.".concat(r);
              var o = r.split("."),
                a = o.pop();
              return "browser-intake-".concat(o.join("-"), ".").concat(a);
            })(e, t);
            return function (t) {
              return "https://".concat(o).concat(n, "?").concat(t);
            };
          })(t, e);
          return {
            build: function (i, o) {
              var a, s, u, c, l, d, f, p, h, m, v;
              return r(
                ((a = t),
                (s = e),
                (u = n),
                (c = i),
                (l = o),
                (d = a.clientToken),
                (f = a.internalAnalyticsSubdomain),
                (p = l.retry),
                (h = l.encoding),
                (m = ["sdk_version:".concat("5.35.1"), "api:".concat(c)].concat(
                  u,
                )),
                p &&
                  m.push(
                    "retry_count:".concat(p.count),
                    "retry_after:".concat(p.lastFailureStatus),
                  ),
                (v = [
                  "ddsource=browser",
                  "ddtags=".concat(encodeURIComponent(m.join(","))),
                  "dd-api-key=".concat(d),
                  "dd-evp-origin-version=".concat(encodeURIComponent("5.35.1")),
                  "dd-evp-origin=browser",
                  "dd-request-id=".concat(ep()),
                ]),
                h && v.push("dd-evp-encoding=".concat(h)),
                "rum" === s && v.push("batch_time=".concat(t5())),
                f && v.reverse(),
                v.join("&")),
              );
            },
            urlPrefix: r(""),
            trackType: e,
          };
        }
        function e1(t, e) {
          var n,
            r = 200 - t.length - 1;
          (e.length > r ||
            ((n = e),
            (function () {
              try {
                return RegExp("[\\p{Ll}]", "u"), !0;
              } catch (t) {
                return !1;
              }
            })() && RegExp("[^\\p{Ll}\\p{Lo}0-9_:./-]", "u").test(n))) &&
            O.warn(
              ""
                .concat(
                  t,
                  " value doesn't meet tag requirements and will be sanitized. ",
                )
                .concat(M, " ")
                .concat(N, "/getting_started/tagging/#defining-tags"),
            );
          var i = e.replace(/,/g, "_");
          return "".concat(t, ":").concat(i);
        }
        var e2 = {
            ALLOW: "allow",
            MASK: "mask",
            MASK_USER_INPUT: "mask-user-input",
          },
          e3 = { ALL: "all", SAMPLED: "sampled" };
        function e5(t, e) {
          return (
            null == t ||
            "string" == typeof t ||
            (O.error("".concat(e, " must be defined as a string")), !1)
          );
        }
        function e6(t, e) {
          return (
            void 0 === t ||
            !!(tZ(t) && t >= 0 && t <= 100) ||
            (O.error(
              "".concat(e, " Sample Rate should be a number between 0 and 100"),
            ),
            !1)
          );
        }
        function e4(t) {
          var e = td(t);
          return "string" === e || "function" === e || t instanceof RegExp;
        }
        function e8(t, e, n) {
          return (
            void 0 === n && (n = !1),
            t.some(function (t) {
              try {
                if ("function" == typeof t) return t(e);
                if (t instanceof RegExp) return t.test(e);
                if ("string" == typeof t) return n ? Y(e, t) : t === e;
              } catch (t) {
                O.error(t);
              }
              return !1;
            })
          );
        }
        function e9() {
          return window.crypto || window.msCrypto;
        }
        function e7(t) {
          return (
            f ||
              (f =
                tY(i.CONSISTENT_TRACE_SAMPLING) &&
                (function () {
                  try {
                    return crypto.getRandomValues(new BigUint64Array(1)), !0;
                  } catch (t) {
                    return !1;
                  }
                })()
                  ? nt
                  : ne),
            f(t)
          );
        }
        function nt(t) {
          var e = crypto.getRandomValues(new BigUint64Array(1))[0];
          return 63 === t && (e >>= BigInt("1")), e;
        }
        function ne(t) {
          var e = e9().getRandomValues(new Uint32Array(2));
          return (
            63 === t && (e[e.length - 1] >>>= 1),
            {
              toString: function (t) {
                void 0 === t && (t = 10);
                var n = e[1],
                  r = e[0],
                  i = "";
                do {
                  var o = (n % t) * 0x100000000 + r;
                  (n = Math.floor(n / t)),
                    (r = Math.floor(o / t)),
                    (i = (o % t).toString(t) + i);
                } while (n || r);
                return i;
              },
            }
          );
        }
        function nn(t) {
          var e = t.toString(16);
          return Array(17 - e.length).join("0") + e;
        }
        function nr(t) {
          0 !== t.status ||
            t.isAborted ||
            ((t.traceId = void 0),
            (t.spanId = void 0),
            (t.traceSampled = void 0));
        }
        function ni(t, e, n, r) {
          if (void 0 !== e9() && n.findTrackedSession()) {
            var i = G(t.allowedTracingUrls, function (t) {
              return e8([t.match], e.url, !0);
            });
            if (i) {
              var o,
                a,
                s,
                u,
                c,
                l = e7(64);
              (e.traceSampled = (function (t, e) {
                if (100 === e) return !0;
                if (0 === e) return !1;
                if ("bigint" != typeof t) return tX(e);
                var n = BigInt("1111111111111111111"),
                  r = BigInt("0x10000000000000000");
                return Number((t * n) % r) <= (e / 100) * Number(r);
              })(l, t.traceSampleRate)),
                (e.traceSampled || t.traceContextInjection === e3.ALL) &&
                  ((e.traceId = l),
                  (e.spanId = e7(63)),
                  r(
                    ((o = e.traceId),
                    (a = e.spanId),
                    (s = e.traceSampled),
                    (u = i.propagatorTypes),
                    (c = {}),
                    u.forEach(function (t) {
                      switch (t) {
                        case "datadog":
                          W(c, {
                            "x-datadog-origin": "rum",
                            "x-datadog-parent-id": a.toString(),
                            "x-datadog-sampling-priority": s ? "1" : "0",
                            "x-datadog-trace-id": o.toString(),
                          });
                          break;
                        case "tracecontext":
                          W(c, {
                            traceparent: "00-0000000000000000"
                              .concat(nn(o), "-")
                              .concat(nn(a), "-0")
                              .concat(s ? "1" : "0"),
                          });
                          break;
                        case "b3":
                          W(c, {
                            b3: ""
                              .concat(nn(o), "-")
                              .concat(nn(a), "-")
                              .concat(s ? "1" : "0"),
                          });
                          break;
                        case "b3multi":
                          W(c, {
                            "X-B3-TraceId": nn(o),
                            "X-B3-SpanId": nn(a),
                            "X-B3-Sampled": s ? "1" : "0",
                          });
                      }
                    }),
                    c),
                  ));
            }
          }
        }
        var no = ["tracecontext", "datadog"];
        function na() {
          O.error("Error fetching the remote configuration.");
        }
        var ns = {
          HIDDEN: "visibility_hidden",
          UNLOADING: "before_unload",
          PAGEHIDE: "page_hide",
          FROZEN: "page_frozen",
        };
        function nu() {
          var t,
            e = window;
          if (
            e.Zone &&
            ((t = Q(e, "MutationObserver")),
            e.MutationObserver && t === e.MutationObserver)
          ) {
            var n = Q(new e.MutationObserver(ti), "originalInstance");
            t = n && n.constructor;
          }
          return t || (t = e.MutationObserver), t;
        }
        var nc = {
          AGENT: "agent",
          CONSOLE: "console",
          CUSTOM: "custom",
          SOURCE: "source",
          REPORT: "report",
        };
        function nl(t, e, n) {
          var r = 0,
            i = !1;
          return {
            isLimitReached: function () {
              if (
                (0 === r &&
                  Z(function () {
                    r = 0;
                  }, 6e4),
                (r += 1) <= e || i)
              )
                return (i = !1), !1;
              if (r === e + 1) {
                i = !0;
                try {
                  n({
                    message: "Reached max number of "
                      .concat(t, "s by minute: ")
                      .concat(e),
                    source: nc.AGENT,
                    startClocks: t4(),
                  });
                } finally {
                  i = !1;
                }
              }
              return !0;
            },
          };
        }
        function nd(t, e, n) {
          for (var r = t, i = e.split("."), o = 0; o < i.length; o += 1) {
            var a = i[o];
            if (!nf(r)) return;
            o !== i.length - 1 ? (r = r[a]) : (r[a] = n);
          }
        }
        function nf(t) {
          return "object" === td(t);
        }
        var np = {
            "view.name": "string",
            "view.url": "string",
            "view.referrer": "string",
          },
          nh = { context: "object" },
          nm = { service: "string", version: "string" },
          nv = (function () {
            function t() {
              this.callbacks = {};
            }
            return (
              (t.prototype.notify = function (t, e) {
                var n = this.callbacks[t];
                n &&
                  n.forEach(function (t) {
                    return t(e);
                  });
              }),
              (t.prototype.subscribe = function (t, e) {
                var n = this;
                return (
                  this.callbacks[t] || (this.callbacks[t] = []),
                  this.callbacks[t].push(e),
                  {
                    unsubscribe: function () {
                      n.callbacks[t] = n.callbacks[t].filter(function (t) {
                        return e !== t;
                      });
                    },
                  }
                );
              }),
              t
            );
          })(),
          ng = 1 / 0;
        function ny(t) {
          var e = t.expireDelay,
            n = t.maxEntries,
            r = [],
            i = te(function () {
              for (
                var t = t6() - e;
                r.length > 0 && r[r.length - 1].endTime < t;

              )
                r.pop();
            }, 6e4);
          return {
            add: function (t, e) {
              var i = {
                value: t,
                startTime: e,
                endTime: ng,
                remove: function () {
                  ee(r, i);
                },
                close: function (t) {
                  i.endTime = t;
                },
              };
              return n && r.length >= n && r.pop(), r.unshift(i), i;
            },
            find: function (t, e) {
              void 0 === t && (t = ng),
                void 0 === e && (e = { returnInactive: !1 });
              for (var n = 0, i = r; n < i.length; n++) {
                var o = i[n];
                if (o.startTime <= t) {
                  if (e.returnInactive || t <= o.endTime) return o.value;
                  break;
                }
              }
            },
            closeActive: function (t) {
              var e = r[0];
              e && e.endTime === ng && e.close(t);
            },
            findAll: function (t, e) {
              void 0 === t && (t = ng), void 0 === e && (e = 0);
              var n = t + e;
              return r
                .filter(function (e) {
                  return e.startTime <= n && t <= e.endTime;
                })
                .map(function (t) {
                  return t.value;
                });
            },
            reset: function () {
              r = [];
            },
            stop: function () {
              tn(i);
            },
          };
        }
        var n_ = new WeakMap();
        function nb(t) {
          var e = t.target,
            n = t.parameters,
            r = n[0],
            i = n[1];
          n_.set(e, {
            state: "open",
            method: String(r).toUpperCase(),
            url: ex(String(i)),
          });
        }
        function nw(t) {
          var e = t.target,
            n = n_.get(e);
          n && (n.isAborted = !0);
        }
        var nS = "initial_document",
          nk = [
            [
              "document",
              function (t) {
                return nS === t;
              },
            ],
            [
              "xhr",
              function (t) {
                return "xmlhttprequest" === t;
              },
            ],
            [
              "fetch",
              function (t) {
                return "fetch" === t;
              },
            ],
            [
              "beacon",
              function (t) {
                return "beacon" === t;
              },
            ],
            [
              "css",
              function (t, e) {
                return /\.css$/i.test(e);
              },
            ],
            [
              "js",
              function (t, e) {
                return /\.js$/i.test(e);
              },
            ],
            [
              "image",
              function (t, e) {
                return (
                  B(["image", "img", "icon"], t) ||
                  null !== /\.(gif|jpg|jpeg|tiff|png|svg|ico)$/i.exec(e)
                );
              },
            ],
            [
              "font",
              function (t, e) {
                return null !== /\.(woff|eot|woff2|ttf)$/i.exec(e);
              },
            ],
            [
              "media",
              function (t, e) {
                return (
                  B(["audio", "video"], t) || null !== /\.(mp3|mp4)$/i.exec(e)
                );
              },
            ],
          ];
        function nx() {
          for (var t = [], e = 0; e < arguments.length; e++)
            t[e] = arguments[e];
          for (var n = 1; n < t.length; n += 1) if (t[n - 1] > t[n]) return !1;
          return !0;
        }
        function nE(t) {
          return t.duration >= 0;
        }
        function nC(t) {
          var e,
            n = nx(
              t.startTime,
              t.fetchStart,
              t.domainLookupStart,
              t.domainLookupEnd,
              t.connectStart,
              t.connectEnd,
              t.requestStart,
              t.responseStart,
              t.responseEnd,
            ),
            r =
              !((e = t).redirectEnd > e.startTime) ||
              nx(t.startTime, t.redirectStart, t.redirectEnd, t.fetchStart);
          return n && r;
        }
        function nT(t, e, n) {
          if (t <= e && e <= n)
            return { duration: t2(n - e), start: t2(e - t) };
        }
        function nI(t) {
          return "" === t.nextHopProtocol ? void 0 : t.nextHopProtocol;
        }
        function nR(t) {
          return "" === t.deliveryType ? "other" : t.deliveryType;
        }
        function nA(t) {
          return (
            t &&
            !tJ.every(function (e) {
              return B(t, e);
            })
          );
        }
        var nO = /data:(.+)?(;base64)?,/g;
        function nN(t) {
          if (t.length <= 24e3);
          else if ("data:" === t.substring(0, 5))
            return (t = t.substring(0, 24e3)), !0;
          return !1;
        }
        function nD(t) {
          return "".concat(t.match(nO)[0], "[...]");
        }
        var nM = 1;
        function nP() {
          var t = nM;
          return (nM += 1), t;
        }
        function nL(t) {
          return tZ(t) && t < 0 ? void 0 : t;
        }
        function nU(t) {
          var e = t.lifeCycle,
            n = t.isChildEvent,
            r = t.onChange,
            i = void 0 === r ? ti : r,
            o = {
              errorCount: 0,
              longTaskCount: 0,
              resourceCount: 0,
              actionCount: 0,
              frustrationCount: 0,
            },
            a = e.subscribe(13, function (t) {
              var e;
              if ("view" !== t.type && "vital" !== t.type && n(t))
                switch (t.type) {
                  case "error":
                    (o.errorCount += 1), i();
                    break;
                  case "action":
                    (o.actionCount += 1),
                      t.action.frustration &&
                        (o.frustrationCount +=
                          t.action.frustration.type.length),
                      i();
                    break;
                  case "long_task":
                    (o.longTaskCount += 1), i();
                    break;
                  case "resource":
                    (null == (e = t._dd) ? void 0 : e.discarded) ||
                      ((o.resourceCount += 1), i());
                }
            });
          return {
            stop: function () {
              a.unsubscribe();
            },
            eventCounts: o,
          };
        }
        function nj(t, e) {
          return new ty(function (n) {
            if (window.PerformanceObserver) {
              var r,
                i,
                o,
                a = function (t) {
                  var e = t.filter(function (t) {
                    var e;
                    return !(
                      (e = t).entryType === m.RESOURCE &&
                      (!nA(e.name) || !nE(e))
                    );
                  });
                  e.length > 0 && n.notify(e);
                },
                s = !0,
                u = new PerformanceObserver(
                  V(function (t) {
                    s
                      ? (i = Z(function () {
                          return a(t.getEntries());
                        }))
                      : a(t.getEntries());
                  }),
                );
              try {
                u.observe(e);
              } catch (t) {
                if (
                  B([m.RESOURCE, m.NAVIGATION, m.LONG_TASK, m.PAINT], e.type)
                ) {
                  e.buffered &&
                    (i = Z(function () {
                      return a(performance.getEntriesByType(e.type));
                    }));
                  try {
                    u.observe({ entryTypes: [e.type] });
                  } catch (t) {
                    return;
                  }
                }
              }
              return (
                (s = !1),
                (r = t),
                !v &&
                  void 0 !== window.performance &&
                  "getEntries" in performance &&
                  "addEventListener" in performance &&
                  (v = tS(
                    r,
                    performance,
                    "resourcetimingbufferfull",
                    function () {
                      performance.clearResourceTimings();
                    },
                  )),
                nV(m.FIRST_INPUT) ||
                  e.type !== m.FIRST_INPUT ||
                  (o = (function (t, e) {
                    var n = t3(),
                      r = !1,
                      i = tk(
                        t,
                        window,
                        [
                          "click",
                          "mousedown",
                          "keydown",
                          "touchstart",
                          "pointerdown",
                        ],
                        function (e) {
                          if (e.cancelable) {
                            var n,
                              r,
                              i = {
                                entryType: "first-input",
                                processingStart: t6(),
                                processingEnd: t6(),
                                startTime: e.timeStamp,
                                duration: 0,
                                name: "",
                                cancelable: !1,
                                target: null,
                                toJSON: function () {
                                  return {};
                                },
                              };
                            "pointerdown" === e.type
                              ? ((n = t),
                                (r = i),
                                tk(
                                  n,
                                  window,
                                  ["pointerup", "pointercancel"],
                                  function (t) {
                                    "pointerup" === t.type && o(r);
                                  },
                                  { once: !0 },
                                ))
                              : o(i);
                          }
                        },
                        { passive: !0, capture: !0 },
                      ).stop;
                    return { stop: i };
                    function o(t) {
                      if (!r) {
                        (r = !0), i();
                        var o = t.processingStart - t.startTime;
                        o >= 0 && o < t3() - n && e(t);
                      }
                    }
                  })(t, function (t) {
                    a([t]);
                  }).stop),
                function () {
                  u.disconnect(), o && o(), tt(i);
                }
              );
            }
          });
        }
        function nV(t) {
          return (
            window.PerformanceObserver &&
            void 0 !== PerformanceObserver.supportedEntryTypes &&
            PerformanceObserver.supportedEntryTypes.includes(t)
          );
        }
        !(function (t) {
          (t.EVENT = "event"),
            (t.FIRST_INPUT = "first-input"),
            (t.LARGEST_CONTENTFUL_PAINT = "largest-contentful-paint"),
            (t.LAYOUT_SHIFT = "layout-shift"),
            (t.LONG_TASK = "longtask"),
            (t.LONG_ANIMATION_FRAME = "long-animation-frame"),
            (t.NAVIGATION = "navigation"),
            (t.PAINT = "paint"),
            (t.RESOURCE = "resource");
        })(m || (m = {}));
        function nq(t, e, n) {
          var r,
            i = !1,
            o = Z(
              V(function () {
                return c({ hadActivity: !1 });
              }),
              100,
            ),
            a =
              void 0 !== n
                ? Z(
                    V(function () {
                      return c({ hadActivity: !0, end: t5() });
                    }),
                    n,
                  )
                : void 0,
            s = t.subscribe(function (t) {
              var e = t.isBusy;
              tt(o), tt(r);
              var n = t5();
              e ||
                (r = Z(
                  V(function () {
                    return c({ hadActivity: !0, end: n });
                  }),
                  100,
                ));
            }),
            u = function () {
              (i = !0), tt(o), tt(r), tt(a), s.unsubscribe();
            };
          function c(t) {
            i || (u(), e(t));
          }
          return { stop: u };
        }
        function nz(t, e, n, r) {
          return new ty(function (i) {
            var o,
              a = [],
              s = 0;
            return (
              a.push(
                e.subscribe(u),
                n.subscribe(u),
                nj(r, { type: m.RESOURCE }).subscribe(function (t) {
                  t.some(function (t) {
                    return !nB(r, t.name);
                  }) && u();
                }),
                t.subscribe(7, function (t) {
                  nB(r, t.url) ||
                    (void 0 === o && (o = t.requestIndex), (s += 1), u());
                }),
                t.subscribe(8, function (t) {
                  nB(r, t.url) ||
                    void 0 === o ||
                    t.requestIndex < o ||
                    ((s -= 1), u());
                }),
              ),
              function () {
                a.forEach(function (t) {
                  return t.unsubscribe();
                });
              }
            );
            function u() {
              i.notify({ isBusy: s > 0 });
            }
          });
        }
        function nB(t, e) {
          return e8(t.excludedActivityUrls, e);
        }
        function nF(t) {
          return window.CSS && window.CSS.escape
            ? window.CSS.escape(t)
            : t.replace(
                /([\0-\x1f\x7f]|^-?\d)|^-$|[^\x80-\uFFFF\w-]/g,
                function (t, e) {
                  return e
                    ? "\0" === t
                      ? "�"
                      : ""
                          .concat(t.slice(0, -1), "\\")
                          .concat(t.charCodeAt(t.length - 1).toString(16), " ")
                    : "\\".concat(t);
                },
              );
        }
        function nG(t, e) {
          return t.matches
            ? t.matches(e)
            : !!t.msMatchesSelector && t.msMatchesSelector(e);
        }
        function nH(t) {
          if (t.parentElement) return t.parentElement;
          for (; t.parentNode; ) {
            if (t.parentNode.nodeType === Node.ELEMENT_NODE)
              return t.parentNode;
            t = t.parentNode;
          }
          return null;
        }
        var n$ = (function () {
          function t(t) {
            var e = this;
            (this.map = new WeakMap()),
              t &&
                t.forEach(function (t) {
                  return e.map.set(t, 1);
                });
          }
          return (
            (t.prototype.add = function (t) {
              return this.map.set(t, 1), this;
            }),
            (t.prototype.delete = function (t) {
              return this.map.delete(t);
            }),
            (t.prototype.has = function (t) {
              return this.map.has(t);
            }),
            t
          );
        })();
        function nY(t) {
          return t.nodeType === Node.TEXT_NODE;
        }
        function nW(t) {
          return t.nodeType === Node.ELEMENT_NODE;
        }
        function nK(t) {
          return nW(t) && !!t.shadowRoot;
        }
        function nJ(t) {
          return (
            !!t.host && t.nodeType === Node.DOCUMENT_FRAGMENT_NODE && nW(t.host)
          );
        }
        function nX(t, e) {
          for (var n = t.firstChild; n; ) e(n), (n = n.nextSibling);
          nK(t) && e(t.shadowRoot);
        }
        function nQ(t) {
          return nJ(t) ? t.host : t.parentNode;
        }
        var nZ = {
            IGNORE: "ignore",
            HIDDEN: "hidden",
            ALLOW: e2.ALLOW,
            MASK: e2.MASK,
            MASK_USER_INPUT: e2.MASK_USER_INPUT,
          },
          n0 = "data-dd-privacy",
          n1 =
            "data:image/gif;base64,R0lGODlhAQABAIAAAMLCwgAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==",
          n2 = {
            INPUT: !0,
            OUTPUT: !0,
            TEXTAREA: !0,
            SELECT: !0,
            OPTION: !0,
            DATALIST: !0,
            OPTGROUP: !0,
          };
        function n3(t, e, n) {
          if (n && n.has(t)) return n.get(t);
          var r = nQ(t),
            i = r ? n3(r, e, n) : e,
            o = n5(n6(t), i);
          return n && n.set(t, o), o;
        }
        function n5(t, e) {
          switch (e) {
            case nZ.HIDDEN:
            case nZ.IGNORE:
              return e;
          }
          switch (t) {
            case nZ.ALLOW:
            case nZ.MASK:
            case nZ.MASK_USER_INPUT:
            case nZ.HIDDEN:
            case nZ.IGNORE:
              return t;
            default:
              return e;
          }
        }
        function n6(t) {
          if (nW(t)) {
            if ("BASE" === t.tagName) return nZ.ALLOW;
            if ("INPUT" === t.tagName) {
              if (
                "password" === t.type ||
                "email" === t.type ||
                "tel" === t.type ||
                "hidden" === t.type
              )
                return nZ.MASK;
              var e = t.getAttribute("autocomplete");
              if (e && (e.startsWith("cc-") || e.endsWith("-password")))
                return nZ.MASK;
            }
            if (nG(t, n7(nZ.HIDDEN))) return nZ.HIDDEN;
            if (nG(t, n7(nZ.MASK))) return nZ.MASK;
            if (nG(t, n7(nZ.MASK_USER_INPUT))) return nZ.MASK_USER_INPUT;
            if (nG(t, n7(nZ.ALLOW))) return nZ.ALLOW;
            if (
              (function (t) {
                if ("SCRIPT" === t.nodeName) return !0;
                if ("LINK" === t.nodeName) {
                  var e = i("rel");
                  return (
                    (/preload|prefetch/i.test(e) && "script" === i("as")) ||
                    "shortcut icon" === e ||
                    "icon" === e
                  );
                }
                if ("META" === t.nodeName) {
                  var n = i("name"),
                    e = i("rel"),
                    r = i("property");
                  return (
                    /^msapplication-tile(image|color)$/.test(n) ||
                    "application-name" === n ||
                    "icon" === e ||
                    "apple-touch-icon" === e ||
                    "shortcut icon" === e ||
                    "keywords" === n ||
                    "description" === n ||
                    /^(og|twitter|fb):/.test(r) ||
                    /^(og|twitter):/.test(n) ||
                    "pinterest" === n ||
                    "robots" === n ||
                    "googlebot" === n ||
                    "bingbot" === n ||
                    t.hasAttribute("http-equiv") ||
                    "author" === n ||
                    "generator" === n ||
                    "framework" === n ||
                    "publisher" === n ||
                    "progid" === n ||
                    /^article:/.test(r) ||
                    /^product:/.test(r) ||
                    "google-site-verification" === n ||
                    "yandex-verification" === n ||
                    "csrf-token" === n ||
                    "p:domain_verify" === n ||
                    "verify-v1" === n ||
                    "verification" === n ||
                    "shopify-checkout-api-token" === n
                  );
                }
                function i(e) {
                  return (t.getAttribute(e) || "").toLowerCase();
                }
                return !1;
              })(t)
            )
              return nZ.IGNORE;
          }
        }
        function n4(t, e) {
          switch (e) {
            case nZ.MASK:
            case nZ.HIDDEN:
            case nZ.IGNORE:
              return !0;
            case nZ.MASK_USER_INPUT:
              return nY(t) ? n8(t.parentNode) : n8(t);
            default:
              return !1;
          }
        }
        function n8(t) {
          if (!t || t.nodeType !== t.ELEMENT_NODE) return !1;
          if ("INPUT" === t.tagName)
            switch (t.type) {
              case "button":
              case "color":
              case "reset":
              case "submit":
                return !1;
            }
          return !!n2[t.tagName];
        }
        function n9(t, e, n) {
          var r,
            i = null == (r = t.parentElement) ? void 0 : r.tagName,
            o = t.textContent || "";
          if (!e || o.trim()) {
            if ("SCRIPT" === i) o = "***";
            else if (n === nZ.HIDDEN) o = "***";
            else if (n4(t, n))
              if ("DATALIST" === i || "SELECT" === i || "OPTGROUP" === i) {
                if (!o.trim()) return;
              } else o = "OPTION" === i ? "***" : o.replace(/\S/g, "x");
            return o;
          }
        }
        function n7(t) {
          return "["
            .concat(n0, '="')
            .concat(t, '"], .')
            .concat("dd-privacy-")
            .concat(t);
        }
        var rt = "data-dd-action-name";
        function re(t, e) {
          if ((void 0 === y && (y = "closest" in HTMLElement.prototype), y))
            n = t.closest("[".concat(e, "]"));
          else
            for (var n, r = t; r; ) {
              if (r.hasAttribute(e)) {
                n = r;
                break;
              }
              r = nH(r);
            }
          if (n) return ra(ro(n.getAttribute(e).trim()));
        }
        var rn = [
            function (t, e, n) {
              if (
                (void 0 === g && (g = "labels" in HTMLInputElement.prototype),
                g)
              ) {
                if ("labels" in t && t.labels && t.labels.length > 0)
                  return ru(t.labels[0], e);
              } else if (t.id) {
                var r =
                  t.ownerDocument &&
                  G(t.ownerDocument.querySelectorAll("label"), function (e) {
                    return e.htmlFor === t.id;
                  });
                return r && ru(r, e, n);
              }
            },
            function (t) {
              if ("INPUT" === t.nodeName) {
                var e = t.getAttribute("type");
                if ("button" === e || "submit" === e || "reset" === e)
                  return { name: t.value, nameSource: "text_content" };
              }
            },
            function (t, e, n) {
              if (
                "BUTTON" === t.nodeName ||
                "LABEL" === t.nodeName ||
                "button" === t.getAttribute("role")
              )
                return ru(t, e, n);
            },
            function (t) {
              return rs(t, "aria-label");
            },
            function (t, e, n) {
              var r = t.getAttribute("aria-labelledby");
              if (r)
                return {
                  name: r
                    .split(/\s+/)
                    .map(function (e) {
                      var n, r;
                      return (
                        (n = t),
                        (r = e),
                        n.ownerDocument
                          ? n.ownerDocument.getElementById(r)
                          : null
                      );
                    })
                    .filter(function (t) {
                      return !!t;
                    })
                    .map(function (t) {
                      return rc(t, e, n);
                    })
                    .join(" "),
                  nameSource: "text_content",
                };
            },
            function (t) {
              return rs(t, "alt");
            },
            function (t) {
              return rs(t, "name");
            },
            function (t) {
              return rs(t, "title");
            },
            function (t) {
              return rs(t, "placeholder");
            },
            function (t, e) {
              if ("options" in t && t.options.length > 0)
                return ru(t.options[0], e);
            },
          ],
          rr = [
            function (t, e, n) {
              return ru(t, e, n);
            },
          ];
        function ri(t, e, n, r) {
          for (
            var i = t, o = 0;
            o <= 10 &&
            i &&
            "BODY" !== i.nodeName &&
            "HTML" !== i.nodeName &&
            "HEAD" !== i.nodeName;

          ) {
            for (var a = 0; a < n.length; a++) {
              var s = (0, n[a])(i, e, r);
              if (s) {
                var u = s.name,
                  c = s.nameSource,
                  l = u && u.trim();
                if (l) return { name: ra(ro(l)), nameSource: c };
              }
            }
            if ("FORM" === i.nodeName) break;
            (i = nH(i)), (o += 1);
          }
        }
        function ro(t) {
          return t.replace(/\s+/g, " ");
        }
        function ra(t) {
          return t.length > 100 ? "".concat(ev(t, 100), " [...]") : t;
        }
        function rs(t, e) {
          return {
            name: t.getAttribute(e) || "",
            nameSource: "standard_attribute",
          };
        }
        function ru(t, e, n) {
          return { name: rc(t, e, n) || "", nameSource: "text_content" };
        }
        function rc(t, e, n) {
          if (!t.isContentEditable) {
            if ("innerText" in t) {
              var r = t.innerText,
                i = function (e) {
                  for (
                    var n = t.querySelectorAll(e), i = 0;
                    i < n.length;
                    i += 1
                  ) {
                    var o = n[i];
                    if ("innerText" in o) {
                      var a = o.innerText;
                      a && a.trim().length > 0 && (r = r.replace(a, ""));
                    }
                  }
                };
              return (
                0 === eN() && i("script, style"),
                i("[".concat(rt, "]")),
                e && i("[".concat(e, "]")),
                n && i("".concat(n7(nZ.HIDDEN), ", ").concat(n7(nZ.MASK))),
                r
              );
            }
            return t.textContent;
          }
        }
        var rl = [
            rt,
            "data-testid",
            "data-test",
            "data-qa",
            "data-cy",
            "data-test-id",
            "data-qa-id",
            "data-testing",
            "data-component",
            "data-element",
            "data-source-file",
          ],
          rd = [
            rm,
            function (t) {
              if (t.id && !rh(t.id)) return "#".concat(nF(t.id));
            },
          ],
          rf = [
            rm,
            function (t) {
              if ("BODY" !== t.tagName)
                for (
                  var e = (function (t) {
                      if (t.classList) return t.classList;
                      var e = (t.getAttribute("class") || "").trim();
                      return e ? e.split(/\s+/) : [];
                    })(t),
                    n = 0;
                  n < e.length;
                  n += 1
                ) {
                  var r = e[n];
                  if (!rh(r))
                    return "".concat(nF(t.tagName), ".").concat(nF(r));
                }
            },
            function (t) {
              return nF(t.tagName);
            },
          ];
        function rp(t, e) {
          var n;
          if (
            "isConnected" in (n = t)
              ? n.isConnected
              : n.ownerDocument.documentElement.contains(n)
          ) {
            for (var r, i = t; i && "HTML" !== i.nodeName; ) {
              var o = rv(i, rd, rg, e, r);
              if (o) return o;
              (r =
                rv(i, rf, ry, e, r) ||
                r_(
                  (function (t) {
                    for (var e = nH(t).firstElementChild, n = 1; e && e !== t; )
                      e.tagName === t.tagName && (n += 1),
                        (e = e.nextElementSibling);
                    return ""
                      .concat(nF(t.tagName), ":nth-of-type(")
                      .concat(n, ")");
                  })(i),
                  r,
                )),
                (i = nH(i));
            }
            return r;
          }
        }
        function rh(t) {
          return /[0-9]/.test(t);
        }
        function rm(t, e) {
          if (e) {
            var n = i(e);
            if (n) return n;
          }
          for (var r = 0; r < rl.length; r++) {
            var n = i(rl[r]);
            if (n) return n;
          }
          function i(e) {
            if (t.hasAttribute(e))
              return ""
                .concat(nF(t.tagName), "[")
                .concat(e, '="')
                .concat(nF(t.getAttribute(e)), '"]');
          }
        }
        function rv(t, e, n, r, i) {
          for (var o = 0; o < e.length; o++) {
            var a = (0, e[o])(t, r);
            if (a && n(t, a, i)) return r_(a, i);
          }
        }
        function rg(t, e, n) {
          return 1 === t.ownerDocument.querySelectorAll(r_(e, n)).length;
        }
        function ry(t, e, n) {
          if (void 0 === n)
            r = function (t) {
              return nG(t, e);
            };
          else {
            var r,
              i = !(function () {
                if (void 0 === _)
                  try {
                    document.querySelector(":scope"), (_ = !0);
                  } catch (t) {
                    _ = !1;
                  }
                return _;
              })()
                ? r_(e, n)
                : r_("".concat(e, ":scope"), n);
            r = function (t) {
              return null !== t.querySelector(i);
            };
          }
          for (var o = nH(t).firstElementChild; o; ) {
            if (o !== t && r(o)) return !1;
            o = o.nextElementSibling;
          }
          return !0;
        }
        function r_(t, e) {
          return e ? "".concat(t, ">").concat(e) : t;
        }
        function rb() {
          var t = window.getSelection();
          return !t || t.isCollapsed;
        }
        function rw(t) {
          return t.target instanceof Element && !1 !== t.isPrimary;
        }
        function rS(t) {
          return (
            !t.hasPageActivity &&
            !t.getUserActivity().input &&
            !t.getUserActivity().scroll &&
            !nG(
              t.event.target,
              'input:not([type="checkbox"]):not([type="radio"]):not([type="button"]):not([type="submit"]):not([type="reset"]):not([type="range"]),textarea,select,[contenteditable],[contenteditable] *,canvas,a[href],a[href] *',
            )
          );
        }
        var rk = new Map();
        function rx(t, e) {
          rk.set(t, e),
            rk.forEach(function (t, e) {
              t6() - e > 1e4 && rk.delete(e);
            });
        }
        var rE = 3e5;
        function rC(t, e) {
          var n = rT(t)
              ? {
                  action: {
                    id: t.id,
                    loading_time: nL(t2(t.duration)),
                    frustration: { type: t.frustrationTypes },
                    error: { count: t.counts.errorCount },
                    long_task: { count: t.counts.longTaskCount },
                    resource: { count: t.counts.resourceCount },
                  },
                  _dd: {
                    action: {
                      target: t.target,
                      position: t.position,
                      name_source: tY(i.ACTION_NAME_MASKING)
                        ? t.nameSource
                        : void 0,
                    },
                  },
                }
              : void 0,
            r = rT(t) ? void 0 : t.context,
            o = th(
              {
                action: { id: ep(), target: { name: t.name }, type: t.type },
                date: t.startClocks.timeStamp,
                type: "action",
                view: {
                  in_foreground: e.wasInPageStateAt(
                    "active",
                    t.startClocks.relative,
                  ),
                },
              },
              n,
            ),
            a = rT(t) ? { events: t.events } : {};
          return (
            !rT(t) && t.handlingStack && (a.handlingStack = t.handlingStack),
            {
              customerContext: r,
              rawRumEvent: o,
              startTime: t.startClocks.relative,
              domainContext: a,
            }
          );
        }
        function rT(t) {
          return "custom" !== t.type;
        }
        var rI = {},
          rR = { intervention: "intervention", cspViolation: "csp_violation" };
        function rA(t) {
          return W(
            { startClocks: t4(), source: nc.REPORT, handling: "unhandled" },
            t,
          );
        }
        function rO(t, e, n, r, i) {
          return n
            ? tV({
                name: t,
                message: e,
                stack: [
                  {
                    func: "?",
                    url: n,
                    line: null != r ? r : void 0,
                    column: null != i ? i : void 0,
                  },
                ],
              })
            : void 0;
        }
        function rN(t, e) {
          if (window.requestIdleCallback && window.cancelIdleCallback) {
            var n,
              r,
              i,
              o = window.requestIdleCallback(V(t), e);
            return function () {
              return window.cancelIdleCallback(o);
            };
          }
          return (
            (n = t),
            (r = t3()),
            (i = Z(function () {
              n({
                didTimeout: !1,
                timeRemaining: function () {
                  return Math.max(0, 50 - (t3() - r));
                },
              });
            }, 0)),
            function () {
              return tt(i);
            }
          );
        }
        var rD = new n$();
        function rM(t) {
          return t.startTime + t.duration;
        }
        function rP(t, e, n) {
          return document.readyState === e || "complete" === document.readyState
            ? (n(), { stop: ti })
            : tS(t, window, "complete" === e ? "load" : "DOMContentLoaded", n, {
                once: !0,
              });
        }
        var rL = 12e4;
        function rU(t, e) {
          var n = e && Number(e);
          if (t && n) return { traceId: t, traceTime: n };
        }
        function rj(t) {
          if (t && t.nodeType === Node.COMMENT_NODE) {
            var e = /^\s*DATADOG;(.*?)\s*$/.exec(t.data);
            if (e) return e[1];
          }
        }
        function rV() {
          if (nV(m.NAVIGATION)) {
            var t = performance.getEntriesByType(m.NAVIGATION)[0];
            if (t) return t;
          }
          var e = (function () {
              var t = {},
                e = performance.timing;
              for (var n in e)
                if (tZ(e[n])) {
                  var r = e[n];
                  t[n] = 0 === r ? 0 : r - t9();
                }
              return t;
            })(),
            n = W(
              {
                entryType: m.NAVIGATION,
                initiatorType: "navigation",
                name: window.location.href,
                startTime: 0,
                duration: e.responseEnd,
                decodedBodySize: 0,
                encodedBodySize: 0,
                transferSize: 0,
                workerStart: 0,
                toJSON: function () {
                  return W({}, n, { toJSON: void 0 });
                },
              },
              e,
            );
          return n;
        }
        function rq(t, e) {
          rP(t, "interactive", function () {
            var t = W(rV().toJSON(), {
              entryType: m.RESOURCE,
              initiatorType: nS,
              traceId: (function (t) {
                var e,
                  n,
                  r,
                  i =
                    ((n = (e = t).querySelector("meta[name=dd-trace-id]")),
                    (r = e.querySelector("meta[name=dd-trace-time]")),
                    rU(n && n.content, r && r.content) ||
                      (function (t) {
                        var e = (function (t) {
                          for (var e = 0; e < t.childNodes.length; e += 1) {
                            var n = rj(t.childNodes[e]);
                            if (n) return n;
                          }
                          if (t.body)
                            for (
                              var e = t.body.childNodes.length - 1;
                              e >= 0;
                              e -= 1
                            ) {
                              var r = t.body.childNodes[e],
                                n = rj(r);
                              if (n) return n;
                              if (!nY(r)) break;
                            }
                        })(t);
                        if (e)
                          return rU(em(e, "trace-id"), em(e, "trace-time"));
                      })(t));
                if (!(!i || i.traceTime <= t3() - rL)) return i.traceId;
              })(document),
              toJSON: function () {
                return W({}, t, { toJSON: void 0 });
              },
            });
            e(t);
          });
        }
        function rz(t, e) {
          var n = t1(t.startTime),
            r = (function (t, e) {
              if (t.traceId)
                return {
                  _dd: {
                    trace_id: t.traceId,
                    span_id: e7(63).toString(),
                    rule_psr: e.rulePsr,
                  },
                };
            })(t, e);
          if (e.trackResources || r) {
            var i,
              o = (function (t) {
                var e,
                  n = t.name;
                if (
                  !(function (t) {
                    try {
                      return !!eE(t);
                    } catch (t) {
                      return !1;
                    }
                  })(n)
                )
                  return (
                    eu('Failed to construct URL for "'.concat(t.name, '"')),
                    "other"
                  );
                for (
                  var r = "/" === (e = eE(n).pathname)[0] ? e : "/".concat(e),
                    i = 0;
                  i < nk.length;
                  i++
                ) {
                  var o = nk[i],
                    a = o[0];
                  if ((0, o[1])(t.initiatorType, r)) return a;
                }
                return "other";
              })(t),
              a = rB(t),
              s = th(
                {
                  date: n.timeStamp,
                  resource: {
                    id: ep(),
                    type: o,
                    url: t.name,
                    status_code: 0 === (i = t.responseStatus) ? void 0 : i,
                    protocol: nI(t),
                    delivery_type: nR(t),
                  },
                  type: "resource",
                  _dd: { discarded: !e.trackResources },
                },
                r,
                a,
              );
            return {
              startTime: n.relative,
              rawRumEvent: s,
              domainContext: { performanceEntry: t },
            };
          }
        }
        function rB(t) {
          var e,
            n,
            r,
            i,
            o = t.renderBlockingStatus;
          return {
            resource: W(
              {
                duration:
                  ((n = (e = t).duration),
                  (r = e.startTime),
                  (i = e.responseEnd),
                  0 === n && r < i ? t2(i - r) : t2(n)),
                render_blocking_status: o,
              },
              (function (t) {
                if (t.startTime < t.responseStart) {
                  var e = t.encodedBodySize,
                    n = t.decodedBodySize;
                  return {
                    size: n,
                    encoded_body_size: e,
                    decoded_body_size: n,
                    transfer_size: t.transferSize,
                  };
                }
                return {
                  size: void 0,
                  encoded_body_size: void 0,
                  decoded_body_size: void 0,
                  transfer_size: void 0,
                };
              })(t),
              (function (t) {
                if (nC(t)) {
                  var e = t.startTime,
                    n = t.fetchStart,
                    r = t.workerStart,
                    i = t.redirectStart,
                    o = t.redirectEnd,
                    a = t.domainLookupStart,
                    s = t.domainLookupEnd,
                    u = t.connectStart,
                    c = t.secureConnectionStart,
                    l = t.connectEnd,
                    d = t.requestStart,
                    f = t.responseStart,
                    p = {
                      download: nT(e, f, t.responseEnd),
                      first_byte: nT(e, d, f),
                    };
                  return (
                    0 < r && r < n && (p.worker = nT(e, r, n)),
                    n < l &&
                      ((p.connect = nT(e, u, l)),
                      u <= c && c <= l && (p.ssl = nT(e, c, l))),
                    n < s && (p.dns = nT(e, a, s)),
                    e < o && (p.redirect = nT(e, i, o)),
                    p
                  );
                }
              })(t),
            ),
          };
        }
        var rF = 6e5,
          rG = 6e5;
        function rH(t, e) {
          var n, r;
          return (
            void 0 === e && (e = window),
            "hidden" === document.visibilityState
              ? (n = 0)
              : ((n = 1 / 0),
                (r = tk(
                  t,
                  e,
                  ["pagehide", "visibilitychange"],
                  function (t) {
                    ("pagehide" === t.type ||
                      "hidden" === document.visibilityState) &&
                      ((n = t.timeStamp), r());
                  },
                  { capture: !0 },
                ).stop)),
            {
              get timeStamp() {
                return n;
              },
              stop: function () {
                null == r || r();
              },
            }
          );
        }
        var r$ = 0,
          rY = 1 / 0,
          rW = 0,
          rK = function () {
            return b ? r$ : window.performance.interactionCount || 0;
          },
          rJ = 6e4;
        function rX() {
          var t,
            e = window.visualViewport;
          return Math.round(
            e
              ? e.pageLeft - e.offsetLeft
              : void 0 !== window.scrollX
                ? window.scrollX
                : window.pageXOffset || 0,
          );
        }
        function rQ() {
          var t,
            e = window.visualViewport;
          return Math.round(
            e
              ? e.pageTop - e.offsetTop
              : void 0 !== window.scrollY
                ? window.scrollY
                : window.pageYOffset || 0,
          );
        }
        function rZ(t) {
          var e;
          return (
            w ||
              ((e = t),
              (w = new ty(function (t) {
                return tS(
                  e,
                  window,
                  "resize",
                  tr(function () {
                    t.notify(r0());
                  }, 200).throttled,
                  { capture: !0, passive: !0 },
                ).stop;
              }))),
            w
          );
        }
        function r0() {
          var t = window.visualViewport;
          return t
            ? {
                width: Number(t.width * t.scale),
                height: Number(t.height * t.scale),
              }
            : {
                width: Number(window.innerWidth || 0),
                height: Number(window.innerHeight || 0),
              };
        }
        var r1 = 3e5,
          r2 = 3e5;
        function r3(t) {
          var e = t.indexOf("?");
          return e < 0 ? t : t.slice(0, e);
        }
        var r5 = [];
        function r6(t) {
          return "2" === t || "1" === t;
        }
        function r4(t) {
          var e = t.encoder,
            n = t.request,
            r = t.flushController,
            i = t.messageBytesLimit,
            o = {},
            a = r.flushObservable.subscribe(function (t) {
              return (function (t) {
                var r,
                  i = H(o).join("\n");
                o = {};
                var a = ((r = t.reason), B(H(ns), r)),
                  s = a ? n.sendOnExit : n.send;
                if (a && e.isAsync) {
                  var u = e.finishSync();
                  u.outputBytesCount && s(r8(u));
                  var c = [u.pendingData, i].filter(Boolean).join("\n");
                  c && s({ data: c, bytesCount: X(c) });
                } else
                  i && e.write(e.isEmpty ? i : "\n".concat(i)),
                    e.finish(function (t) {
                      s(r8(t));
                    });
              })(t);
            });
          function s(t, n) {
            var a,
              s,
              u = to(t),
              c = e.estimateEncodedBytesCount(u);
            if (c >= i)
              return void O.warn(
                "Discarded a message whose size was bigger than the maximum allowed size "
                  .concat(i, "KB. ")
                  .concat(M, " ")
                  .concat(D, "/#technical-limitations"),
              );
            void 0 !== n &&
              void 0 !== o[n] &&
              ((a = o[n]),
              delete o[n],
              (s = e.estimateEncodedBytesCount(a)),
              r.notifyAfterRemoveMessage(s)),
              r.notifyBeforeAddMessage(c),
              void 0 !== n
                ? ((o[n] = u), r.notifyAfterAddMessage())
                : e.write(e.isEmpty ? u : "\n".concat(u), function (t) {
                    r.notifyAfterAddMessage(t - c);
                  });
          }
          return { flushController: r, add: s, upsert: s, stop: a.unsubscribe };
        }
        function r8(t) {
          var e;
          return {
            data:
              "string" == typeof t.output
                ? t.output
                : new Blob([t.output], { type: "text/plain" }),
            bytesCount: t.outputBytesCount,
            encoding: t.encoding,
          };
        }
        var r9 = 3145728;
        function r7(t, e, n, r, i) {
          0 === e.transportStatus &&
          0 === e.queuedPayloads.size() &&
          e.bandwidthMonitor.canHandle(t)
            ? it(t, e, n, {
                onSuccess: function () {
                  return ie(0, e, n, r, i);
                },
                onFailure: function () {
                  e.queuedPayloads.enqueue(t),
                    (function t(e, n, r, i) {
                      2 === e.transportStatus &&
                        Z(function () {
                          it(e.queuedPayloads.first(), e, n, {
                            onSuccess: function () {
                              e.queuedPayloads.dequeue(),
                                (e.currentBackoffTime = 1e3),
                                ie(1, e, n, r, i);
                            },
                            onFailure: function () {
                              (e.currentBackoffTime = Math.min(
                                6e4,
                                2 * e.currentBackoffTime,
                              )),
                                t(e, n, r, i);
                            },
                          });
                        }, e.currentBackoffTime);
                    })(e, n, r, i);
                },
              })
            : e.queuedPayloads.enqueue(t);
        }
        function it(t, e, n, r) {
          var i = r.onSuccess,
            o = r.onFailure;
          e.bandwidthMonitor.add(t),
            n(t, function (n) {
              var r;
              e.bandwidthMonitor.remove(t),
                "opaque" !== (r = n).type &&
                ((0 === r.status && !navigator.onLine) ||
                  408 === r.status ||
                  429 === r.status ||
                  r.status >= 500)
                  ? ((e.transportStatus =
                      e.bandwidthMonitor.ongoingRequestCount > 0 ? 1 : 2),
                    (t.retry = {
                      count: t.retry ? t.retry.count + 1 : 1,
                      lastFailureStatus: n.status,
                    }),
                    o())
                  : ((e.transportStatus = 0), i());
            });
        }
        function ie(t, e, n, r, i) {
          0 === t &&
            e.queuedPayloads.isFull() &&
            !e.queueFullReported &&
            (i({
              message: "Reached max "
                .concat(r, " events size queued for upload: ")
                .concat(r9 / 1048576, "MiB"),
              source: nc.AGENT,
              startClocks: t4(),
            }),
            (e.queueFullReported = !0));
          var o = e.queuedPayloads;
          for (e.queuedPayloads = ir(); o.size() > 0; )
            r7(o.dequeue(), e, n, r, i);
        }
        function ir() {
          var t = [];
          return {
            bytesCount: 0,
            enqueue: function (e) {
              this.isFull() || (t.push(e), (this.bytesCount += e.bytesCount));
            },
            first: function () {
              return t[0];
            },
            dequeue: function () {
              var e = t.shift();
              return e && (this.bytesCount -= e.bytesCount), e;
            },
            size: function () {
              return t.length;
            },
            isFull: function () {
              return this.bytesCount >= r9;
            },
          };
        }
        function ii(t, e, n) {
          var r = {
              transportStatus: 0,
              currentBackoffTime: 1e3,
              bandwidthMonitor: {
                ongoingRequestCount: 0,
                ongoingByteCount: 0,
                canHandle: function (t) {
                  return (
                    0 === this.ongoingRequestCount ||
                    (this.ongoingByteCount + t.bytesCount <= 81920 &&
                      this.ongoingRequestCount < 32)
                  );
                },
                add: function (t) {
                  (this.ongoingRequestCount += 1),
                    (this.ongoingByteCount += t.bytesCount);
                },
                remove: function (t) {
                  (this.ongoingRequestCount -= 1),
                    (this.ongoingByteCount -= t.bytesCount);
                },
              },
              queuedPayloads: ir(),
              queueFullReported: !1,
            },
            i = function (n, r) {
              var i, o, a, s;
              return (
                (i = t),
                (o = e),
                (a = n),
                (s = r),
                void ((function () {
                  try {
                    return (
                      window.Request && "keepalive" in new Request("http://a")
                    );
                  } catch (t) {
                    return !1;
                  }
                })() && a.bytesCount < o
                  ? fetch(i.build("fetch", a), {
                      method: "POST",
                      body: a.data,
                      keepalive: !0,
                      mode: "cors",
                    }).then(
                      V(function (t) {
                        return null == s
                          ? void 0
                          : s({ status: t.status, type: t.type });
                      }),
                      V(function () {
                        ia(i.build("xhr", a), a.data, s);
                      }),
                    )
                  : ia(i.build("xhr", a), a.data, s))
              );
            };
          return {
            send: function (e) {
              r7(e, r, i, t.trackType, n);
            },
            sendOnExit: function (n) {
              !(function (t, e, n) {
                if (navigator.sendBeacon && n.bytesCount < e)
                  try {
                    var r,
                      i = t.build("beacon", n);
                    if (navigator.sendBeacon(i, n.data)) return;
                  } catch (t) {
                    (r = t), io || ((io = !0), ec(r));
                  }
                ia(t.build("xhr", n), n.data);
              })(t, e, n);
            },
          };
        }
        var io = !1;
        function ia(t, e, n) {
          var r = new XMLHttpRequest();
          r.open("POST", t, !0),
            e instanceof Blob && r.setRequestHeader("Content-Type", e.type),
            tS(
              { allowUntrustedEvents: !0 },
              r,
              "loadend",
              function () {
                null == n || n({ status: r.status });
              },
              { once: !0 },
            ),
            r.send(e);
        }
        function is(t) {
          return Object.prototype.hasOwnProperty.call(history, t)
            ? history
            : History.prototype;
        }
        function iu() {
          0 !== S.batchCount && (eu("Customer data measures", S), ip());
        }
        function ic() {
          return { min: 1 / 0, max: 0, sum: 0 };
        }
        function il(t, e) {
          (t.sum += e),
            (t.min = Math.min(t.min, e)),
            (t.max = Math.max(t.max, e));
        }
        function id(t, e) {
          (t.sum += e.sum),
            (t.min = Math.min(t.min, e.min)),
            (t.max = Math.max(t.max, e.max));
        }
        function ip() {
          S = {
            batchCount: 0,
            batchBytesCount: ic(),
            batchMessagesCount: ic(),
            globalContextBytes: ic(),
            userContextBytes: ic(),
            featureFlagBytes: ic(),
          };
        }
        function ih() {
          (x = !1),
            (k = {
              globalContextBytes: ic(),
              userContextBytes: ic(),
              featureFlagBytes: ic(),
            });
        }
        function im() {
          return "hidden" === document.visibilityState
            ? "hidden"
            : document.hasFocus()
              ? "active"
              : "passive";
        }
        function iv(t, e) {
          var n = em(document.cookie, t),
            r = te(function () {
              var r = em(document.cookie, t);
              r !== n && e(r);
            }, 1e3);
          return function () {
            tn(r);
          };
        }
        var ig = "datadog-ci-visibility-test-execution-id";
        function iy(t) {
          var e;
          return (
            E || (E = new Map()),
            E.has(t)
              ? (e = E.get(t))
              : ((e = {
                  records_count: 0,
                  segments_count: 0,
                  segments_total_raw_size: 0,
                }),
                E.set(t, e),
                E.size > 10 &&
                  (function () {
                    if (E)
                      if (E.keys) {
                        var t = E.keys().next().value;
                        t && E.delete(t);
                      } else {
                        var e = !0;
                        E.forEach(function (t, n) {
                          e && (E.delete(n), (e = !1));
                        });
                      }
                  })()),
            e
          );
        }
        var i_ = new WeakMap();
        function ib(t) {
          return i_.has(t);
        }
        function iw(t) {
          return i_.get(t);
        }
        function iS(t, e) {
          var n = t.tagName,
            r = t.value;
          if (n4(t, e)) {
            var i = t.type;
            if (
              "INPUT" === n &&
              ("button" === i || "submit" === i || "reset" === i)
            )
              return r;
            if (!r || "OPTION" === n) return;
            return "***";
          }
          return "OPTION" === n || "SELECT" === n
            ? t.value
            : "INPUT" === n || "TEXTAREA" === n
              ? r
              : void 0;
        }
        var ik = /url\((?:(')([^']*)'|(")([^"]*)"|([^)]*))\)/gm,
          ix = /^[A-Za-z]+:|^\/\//,
          iE = /^data:.*,/i,
          iC = /[^a-z1-6-_]/;
        function iT(t) {
          var e = t.toLowerCase().trim();
          return iC.test(e) ? "div" : e;
        }
        function iI(t, e) {
          return "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='"
            .concat(t, "' height='")
            .concat(e, "' style='background-color:silver'%3E%3C/svg%3E");
        }
        var iR = {
            FullSnapshot: 2,
            IncrementalSnapshot: 3,
            Meta: 4,
            Focus: 6,
            ViewEnd: 7,
            VisualViewport: 8,
            FrustrationRecord: 9,
          },
          iA = {
            Document: 0,
            DocumentType: 1,
            Element: 2,
            Text: 3,
            CDATA: 4,
            DocumentFragment: 11,
          },
          iO = {
            Mutation: 0,
            MouseMove: 1,
            MouseInteraction: 2,
            Scroll: 3,
            ViewportResize: 4,
            Input: 5,
            TouchMove: 6,
            MediaInteraction: 7,
            StyleSheetRule: 8,
          },
          iN = {
            MouseUp: 0,
            MouseDown: 1,
            Click: 2,
            ContextMenu: 3,
            DblClick: 4,
            Focus: 5,
            Blur: 6,
            TouchStart: 7,
            TouchEnd: 9,
          },
          iD = { Play: 0, Pause: 1 };
        function iM(t) {
          if (void 0 !== t && 0 !== t.length)
            return t.map(function (t) {
              return {
                cssRules: Array.from(t.cssRules || t.rules, function (t) {
                  return t.cssText;
                }),
                disabled: t.disabled || void 0,
                media: t.media.length > 0 ? Array.from(t.media) : void 0,
              };
            });
        }
        function iP(t, e, n, r) {
          if (e === nZ.HIDDEN) return null;
          var i = t.getAttribute(n);
          if (
            e === nZ.MASK &&
            n !== n0 &&
            !rl.includes(n) &&
            n !== r.actionNameAttribute
          ) {
            var o = t.tagName;
            switch (n) {
              case "title":
              case "alt":
              case "placeholder":
                return "***";
            }
            if ("IMG" === o && ("src" === n || "srcset" === n)) {
              if (t.naturalWidth > 0)
                return iI(t.naturalWidth, t.naturalHeight);
              var a = t.getBoundingClientRect(),
                s = a.width,
                u = a.height;
              return s > 0 || u > 0 ? iI(s, u) : n1;
            }
            if ("SOURCE" === o && ("src" === n || "srcset" === n)) return n1;
            if (
              ("A" === o && "href" === n) ||
              (i && Y(n, "data-")) ||
              ("IFRAME" === o && "srcdoc" === n)
            )
              return "***";
          }
          return i && "string" == typeof i && nN(i) ? nD(i) : i;
        }
        function iL(t) {
          var e, n, r;
          if (!t) return null;
          try {
            e = t.rules || t.cssRules;
          } catch (t) {}
          return e
            ? ((n = Array.from(e, 2 === eN() ? iU : ij).join("")),
              (r = t.href),
              n.replace(ik, function (t, e, n, i, o, a) {
                var s = n || o || a;
                if (!r || !s || ix.test(s) || iE.test(s)) return t;
                var u = e || i || "";
                return "url("
                  .concat(u)
                  .concat(
                    (function (t, e) {
                      try {
                        return eE(t, e).href;
                      } catch (e) {
                        return t;
                      }
                    })(s, r),
                  )
                  .concat(u, ")");
              }))
            : null;
        }
        function iU(t) {
          return "selectorText" in t && t.selectorText.includes(":")
            ? t.cssText.replace(/(\[[\w-]+[^\\])(:[^\]]+\])/g, "$1\\$2")
            : ij(t);
        }
        function ij(t) {
          return ("styleSheet" in t && iL(t.styleSheet)) || t.cssText;
        }
        function iV(t, e) {
          var n = (function (t, e) {
            switch (t.nodeType) {
              case t.DOCUMENT_NODE:
                return (
                  (n = t),
                  (r = e),
                  {
                    type: iA.Document,
                    childNodes: iz(n, r),
                    adoptedStyleSheets: iM(n.adoptedStyleSheets),
                  }
                );
              case t.DOCUMENT_FRAGMENT_NODE:
                return (
                  (i = t),
                  (o = e),
                  (a = nJ(i)) &&
                    o.serializationContext.shadowRootsController.addShadowRoot(
                      i,
                    ),
                  {
                    type: iA.DocumentFragment,
                    childNodes: iz(i, o),
                    isShadowRoot: a,
                    adoptedStyleSheets: a ? iM(i.adoptedStyleSheets) : void 0,
                  }
                );
              case t.DOCUMENT_TYPE_NODE:
                return (
                  (s = t),
                  {
                    type: iA.DocumentType,
                    name: s.name,
                    publicId: s.publicId,
                    systemId: s.systemId,
                  }
                );
              case t.ELEMENT_NODE:
                return (function (t, e) {
                  var n,
                    r,
                    i = iT(t.tagName),
                    o =
                      "svg" === (n = t).tagName ||
                      n instanceof SVGElement ||
                      void 0,
                    a = n5(n6(t), e.parentNodePrivacyLevel);
                  if (a === nZ.HIDDEN) {
                    var s = t.getBoundingClientRect(),
                      u = s.width,
                      c = s.height;
                    return {
                      type: iA.Element,
                      tagName: i,
                      attributes:
                        (((r = {
                          rr_width: "".concat(u, "px"),
                          rr_height: "".concat(c, "px"),
                        })[n0] = "hidden"),
                        r),
                      childNodes: [],
                      isSVG: o,
                    };
                  }
                  if (a !== nZ.IGNORE) {
                    var l = (function (t, e, n) {
                        if (e === nZ.HIDDEN) return {};
                        for (
                          var r,
                            i,
                            o,
                            a = {},
                            s = iT(t.tagName),
                            u = t.ownerDocument,
                            c = 0;
                          c < t.attributes.length;
                          c += 1
                        ) {
                          var l = t.attributes.item(c).name,
                            d = iP(t, e, l, n.configuration);
                          null !== d && (a[l] = d);
                        }
                        if (
                          t.value &&
                          ("textarea" === s ||
                            "select" === s ||
                            "option" === s ||
                            "input" === s)
                        ) {
                          var f = iS(t, e);
                          void 0 !== f && (a.value = f);
                        }
                        if (
                          ("option" === s &&
                            e === nZ.ALLOW &&
                            t.selected &&
                            (a.selected = t.selected),
                          "link" === s)
                        ) {
                          var p = Array.from(u.styleSheets).find(function (e) {
                              return e.href === t.href;
                            }),
                            h = iL(p);
                          h && p && (a._cssText = h);
                        }
                        if ("style" === s && t.sheet) {
                          var h = iL(t.sheet);
                          h && (a._cssText = h);
                        }
                        "input" === s &&
                          ("radio" === t.type || "checkbox" === t.type) &&
                          (e === nZ.ALLOW
                            ? (a.checked = !!t.checked)
                            : n4(t, e) && delete a.checked),
                          ("audio" === s || "video" === s) &&
                            (a.rr_mediaState = t.paused ? "paused" : "played");
                        var m = n.serializationContext;
                        switch (m.status) {
                          case 0:
                            (i = Math.round(t.scrollTop)),
                              (o = Math.round(t.scrollLeft)),
                              (i || o) &&
                                m.elementsScrollPositions.set(t, {
                                  scrollTop: i,
                                  scrollLeft: o,
                                });
                            break;
                          case 1:
                            m.elementsScrollPositions.has(t) &&
                              ((i = (r = m.elementsScrollPositions.get(t))
                                .scrollTop),
                              (o = r.scrollLeft));
                        }
                        return (
                          o && (a.rr_scrollLeft = o),
                          i && (a.rr_scrollTop = i),
                          a
                        );
                      })(t, a, e),
                      d = [];
                    if ((t.childNodes.length > 0 || nK(t)) && "style" !== i) {
                      var f = void 0;
                      d = iz(
                        t,
                        e.parentNodePrivacyLevel === a &&
                          e.ignoreWhiteSpace === ("head" === i)
                          ? e
                          : W({}, e, {
                              parentNodePrivacyLevel: a,
                              ignoreWhiteSpace: "head" === i,
                            }),
                      );
                    }
                    return {
                      type: iA.Element,
                      tagName: i,
                      attributes: l,
                      childNodes: d,
                      isSVG: o,
                    };
                  }
                })(t, e);
              case t.TEXT_NODE:
                var n,
                  r,
                  i,
                  o,
                  a,
                  s,
                  u = t,
                  c = e,
                  l = n9(u, c.ignoreWhiteSpace || !1, c.parentNodePrivacyLevel);
                if (void 0 !== l) return { type: iA.Text, textContent: l };
                return;
              case t.CDATA_SECTION_NODE:
                return { type: iA.CDATA, textContent: "" };
            }
          })(t, e);
          if (!n) return null;
          var r = iw(t) || iq++;
          return (
            (n.id = r),
            i_.set(t, r),
            e.serializedNodeIds && e.serializedNodeIds.add(r),
            n
          );
        }
        var iq = 1;
        function iz(t, e) {
          var n = [];
          return (
            nX(t, function (t) {
              var r = iV(t, e);
              r && n.push(r);
            }),
            n
          );
        }
        function iB(t) {
          return !!t.changedTouches;
        }
        function iF(t) {
          return !0 === t.composed && nK(t.target)
            ? t.composedPath()[0]
            : t.target;
        }
        var iG = function (t, e) {
            var n = window.visualViewport,
              r = {
                layoutViewportX: t,
                layoutViewportY: e,
                visualViewportX: t,
                visualViewportY: e,
              };
            return (
              n &&
                (Math.abs(n.pageTop - n.offsetTop - window.scrollY) > 25 ||
                Math.abs(n.pageLeft - n.offsetLeft - window.scrollX) > 25
                  ? ((r.layoutViewportX = Math.round(t + n.offsetLeft)),
                    (r.layoutViewportY = Math.round(e + n.offsetTop)))
                  : ((r.visualViewportX = Math.round(t - n.offsetLeft)),
                    (r.visualViewportY = Math.round(e - n.offsetTop)))),
              r
            );
          },
          iH = function (t) {
            return {
              scale: t.scale,
              offsetLeft: t.offsetLeft,
              offsetTop: t.offsetTop,
              pageLeft: t.pageLeft,
              pageTop: t.pageTop,
              height: t.height,
              width: t.width,
            };
          };
        function i$(t, e) {
          return {
            data: W({ source: t }, e),
            type: iR.IncrementalSnapshot,
            timestamp: t5(),
          };
        }
        function iY(t) {
          var e = iB(t) ? t.changedTouches[0] : t,
            n = e.clientX,
            r = e.clientY;
          if (window.visualViewport) {
            var i = iG(n, r),
              o = i.visualViewportX,
              a = i.visualViewportY;
            (n = o), (r = a);
          }
          if (!Number.isFinite(n) || !Number.isFinite(r)) {
            t.isTrusted && eu("mouse/touch event without x/y");
            return;
          }
          return { x: n, y: r };
        }
        var iW =
          (((C = {}).pointerup = iN.MouseUp),
          (C.mousedown = iN.MouseDown),
          (C.click = iN.Click),
          (C.contextmenu = iN.ContextMenu),
          (C.dblclick = iN.DblClick),
          (C.focus = iN.Focus),
          (C.blur = iN.Blur),
          (C.touchstart = iN.TouchStart),
          (C.touchend = iN.TouchEnd),
          C);
        function iK(t, e, n, r) {
          void 0 === r && (r = document);
          var i = tr(function (r) {
              var i = iF(r);
              if (i && n3(i, t.defaultPrivacyLevel) !== nZ.HIDDEN && ib(i)) {
                var o = iw(i),
                  a =
                    i === document
                      ? { scrollTop: rQ(), scrollLeft: rX() }
                      : {
                          scrollTop: Math.round(i.scrollTop),
                          scrollLeft: Math.round(i.scrollLeft),
                        };
                n.set(i, a),
                  e(i$(iO.Scroll, { id: o, x: a.scrollLeft, y: a.scrollTop }));
              }
            }, 100),
            o = i.throttled,
            a = i.cancel,
            s = tS(t, r, "scroll", o, { capture: !0, passive: !0 }).stop;
          return {
            stop: function () {
              s(), a();
            },
          };
        }
        function iJ(t) {
          for (var e = [], n = t; n.parentRule; ) {
            var r = Array.from(n.parentRule.cssRules).indexOf(n);
            e.unshift(r), (n = n.parentRule);
          }
          if (n.parentStyleSheet) {
            var i = Array.from(n.parentStyleSheet.cssRules).indexOf(n);
            return e.unshift(i), e;
          }
        }
        function iX(t, e, n) {
          void 0 === n && (n = document);
          var r,
            i = t.defaultPrivacyLevel,
            o = new WeakMap(),
            a = n !== document,
            s = tk(
              t,
              n,
              a ? ["change"] : ["input", "change"],
              function (t) {
                var e = iF(t);
                (e instanceof HTMLInputElement ||
                  e instanceof HTMLTextAreaElement ||
                  e instanceof HTMLSelectElement) &&
                  c(e);
              },
              { capture: !0, passive: !0 },
            ).stop;
          if (a) r = ti;
          else {
            var u = [
              ek(HTMLInputElement.prototype, "value", c),
              ek(HTMLInputElement.prototype, "checked", c),
              ek(HTMLSelectElement.prototype, "value", c),
              ek(HTMLTextAreaElement.prototype, "value", c),
              ek(HTMLSelectElement.prototype, "selectedIndex", c),
            ];
            r = function () {
              u.forEach(function (t) {
                return t.stop();
              });
            };
          }
          return {
            stop: function () {
              r(), s();
            },
          };
          function c(t) {
            var e,
              n = n3(t, i);
            if (n !== nZ.HIDDEN) {
              var r,
                o = t.type;
              if ("radio" === o || "checkbox" === o) {
                if (n4(t, n)) return;
                e = { isChecked: t.checked };
              } else {
                var a = iS(t, n);
                if (void 0 === a) return;
                e = { text: a };
              }
              l(t, e);
              var s = t.name;
              "radio" === o &&
                s &&
                t.checked &&
                ((r = document.querySelectorAll(
                  'input[type="radio"][name="'.concat(nF(s), '"]'),
                )),
                Array.prototype.forEach.call(r, function (e) {
                  e !== t && l(e, { isChecked: !1 });
                }));
            }
          }
          function l(t, n) {
            if (ib(t)) {
              var r = o.get(t);
              (r && r.text === n.text && r.isChecked === n.isChecked) ||
                (o.set(t, n), e(i$(iO.Input, W({ id: iw(t) }, n))));
            }
          }
        }
        function iQ(t, e, n, r) {
          var i = nu();
          if (!i) return { stop: ti, flush: ti };
          var o = (function (t) {
              var e = ti,
                n = [];
              function r() {
                e(), t(n), (n = []);
              }
              var i = tr(r, 16, { leading: !1 }),
                o = i.throttled,
                a = i.cancel;
              return {
                addMutations: function (t) {
                  0 === n.length && (e = rN(o, { timeout: 100 })),
                    n.push.apply(n, t);
                },
                flush: r,
                stop: function () {
                  e(), a();
                },
              };
            })(function (r) {
              var i, o, s, u, c, l, d, f, p, h, m, v;
              (i = r.concat(a.takeRecords())),
                (o = t),
                (s = e),
                (u = n),
                (c = new Map()),
                i
                  .filter(function (t) {
                    return "childList" === t.type;
                  })
                  .forEach(function (t) {
                    t.removedNodes.forEach(function (t) {
                      !(function t(e, n) {
                        nK(e) && n(e.shadowRoot),
                          nX(e, function (e) {
                            return t(e, n);
                          });
                      })(t, u.removeShadowRoot);
                    });
                  }),
                (f = (d = (function (t, e, n, r) {
                  for (
                    var i = new Set(),
                      o = new Map(),
                      a = function (t) {
                        t.addedNodes.forEach(function (t) {
                          i.add(t);
                        }),
                          t.removedNodes.forEach(function (e) {
                            i.has(e) || o.set(e, t.target), i.delete(e);
                          });
                      },
                      s = 0;
                    s < t.length;
                    s++
                  )
                    a(t[s]);
                  var u = Array.from(i);
                  u.sort(function (t, e) {
                    var n = t.compareDocumentPosition(e);
                    return n & Node.DOCUMENT_POSITION_CONTAINED_BY
                      ? -1
                      : n & Node.DOCUMENT_POSITION_CONTAINS
                        ? 1
                        : n & Node.DOCUMENT_POSITION_FOLLOWING
                          ? 1
                          : n & Node.DOCUMENT_POSITION_PRECEDING
                            ? -1
                            : 0;
                  });
                  for (var c = new Set(), l = [], d = 0; d < u.length; d++) {
                    var f = u[d];
                    if (!g(f)) {
                      var p = n3(f.parentNode, e.defaultPrivacyLevel, r);
                      if (p !== nZ.HIDDEN && p !== nZ.IGNORE) {
                        var h = iV(f, {
                          serializedNodeIds: c,
                          parentNodePrivacyLevel: p,
                          serializationContext: {
                            status: 2,
                            shadowRootsController: n,
                          },
                          configuration: e,
                        });
                        if (h) {
                          var m = nQ(f);
                          l.push({
                            nextId: (function (t) {
                              for (var e = t.nextSibling; e; ) {
                                if (ib(e)) return iw(e);
                                e = e.nextSibling;
                              }
                              return null;
                            })(f),
                            parentId: iw(m),
                            node: h,
                          });
                        }
                      }
                    }
                  }
                  var v = [];
                  return (
                    o.forEach(function (t, e) {
                      ib(e) && v.push({ parentId: iw(t), id: iw(e) });
                    }),
                    { adds: l, removes: v, hasBeenSerialized: g }
                  );
                  function g(t) {
                    return ib(t) && c.has(iw(t));
                  }
                })(
                  (l = i.filter(function (t) {
                    return (
                      t.target.isConnected &&
                      (function (t) {
                        for (var e = t; e; ) {
                          if (!ib(e) && !nJ(e)) return !1;
                          e = nQ(e);
                        }
                        return !0;
                      })(t.target) &&
                      n3(t.target, s.defaultPrivacyLevel, c) !== nZ.HIDDEN
                    );
                  })).filter(function (t) {
                    return "childList" === t.type;
                  }),
                  s,
                  u,
                  c,
                )).adds),
                (p = d.removes),
                (h = d.hasBeenSerialized),
                (m = (function (t, e, n) {
                  for (
                    var r,
                      i = [],
                      o = new Set(),
                      a = t.filter(function (t) {
                        return !o.has(t.target) && (o.add(t.target), !0);
                      }),
                      s = 0;
                    s < a.length;
                    s++
                  ) {
                    var u = a[s];
                    if (u.target.textContent !== u.oldValue) {
                      var c = n3(nQ(u.target), e.defaultPrivacyLevel, n);
                      c !== nZ.HIDDEN &&
                        c !== nZ.IGNORE &&
                        i.push({
                          id: iw(u.target),
                          value: null != (r = n9(u.target, !1, c)) ? r : null,
                        });
                    }
                  }
                  return i;
                })(
                  l.filter(function (t) {
                    return "characterData" === t.type && !h(t.target);
                  }),
                  s,
                  c,
                )),
                (v = (function (t, e, n) {
                  for (
                    var r = [],
                      i = new Map(),
                      o = t.filter(function (t) {
                        var e = i.get(t.target);
                        return (
                          !(e && e.has(t.attributeName)) &&
                          (e
                            ? e.add(t.attributeName)
                            : i.set(t.target, new Set([t.attributeName])),
                          !0)
                        );
                      }),
                      a = new Map(),
                      s = 0;
                    s < o.length;
                    s++
                  ) {
                    var u = o[s];
                    if (u.target.getAttribute(u.attributeName) !== u.oldValue) {
                      var c = n3(u.target, e.defaultPrivacyLevel, n),
                        l = iP(u.target, c, u.attributeName, e),
                        d = void 0;
                      if ("value" === u.attributeName) {
                        var f = iS(u.target, c);
                        if (void 0 === f) continue;
                        d = f;
                      } else d = "string" == typeof l ? l : null;
                      var p = a.get(u.target);
                      p ||
                        ((p = { id: iw(u.target), attributes: {} }),
                        r.push(p),
                        a.set(u.target, p)),
                        (p.attributes[u.attributeName] = d);
                    }
                  }
                  return r;
                })(
                  l.filter(function (t) {
                    return "attributes" === t.type && !h(t.target);
                  }),
                  s,
                  c,
                )),
                (m.length || v.length || p.length || f.length) &&
                  o(
                    i$(iO.Mutation, {
                      adds: f,
                      removes: p,
                      texts: m,
                      attributes: v,
                    }),
                  );
            }),
            a = new i(V(o.addMutations));
          return (
            a.observe(r, {
              attributeOldValue: !0,
              attributes: !0,
              characterData: !0,
              characterDataOldValue: !0,
              childList: !0,
              subtree: !0,
            }),
            {
              stop: function () {
                a.disconnect(), o.stop();
              },
              flush: function () {
                o.flush();
              },
            }
          );
        }
        var iZ = function (t, e, n) {
          var r = new Map(),
            i = {
              addShadowRoot: function (o) {
                if (!r.has(o)) {
                  var a = iQ(e, t, i, o),
                    s = iX(t, e, o),
                    u = iK(t, e, n, o);
                  r.set(o, {
                    flush: function () {
                      return a.flush();
                    },
                    stop: function () {
                      a.stop(), s.stop(), u.stop();
                    },
                  });
                }
              },
              removeShadowRoot: function (t) {
                var e = r.get(t);
                e && (e.stop(), r.delete(t));
              },
              stop: function () {
                r.forEach(function (t) {
                  return (0, t.stop)();
                });
              },
              flush: function () {
                r.forEach(function (t) {
                  return (0, t.flush)();
                });
              },
            };
          return i;
        };
        function i0(t, e, n) {
          var r,
            i = 0,
            o = [],
            a = 0,
            s = [],
            u = tS(t, e, "message", function (t) {
              var e = t.data;
              if ("wrote" === e.type && e.streamId === n) {
                (i += e.additionalBytesCount),
                  o.push(e.result),
                  (r = e.trailer);
                var a = s.shift();
                a && a.id === e.id
                  ? a.writeCallback
                    ? a.writeCallback(e.result.byteLength)
                    : a.finishCallback && a.finishCallback()
                  : (u(), eu("Worker responses received out of order."));
              }
            }).stop;
          function c() {
            var t =
                0 === o.length
                  ? new Uint8Array(0)
                  : (function (t) {
                      for (
                        var e = new Uint8Array(
                            t.reduce(function (t, e) {
                              return t + e.length;
                            }, 0),
                          ),
                          n = 0,
                          r = 0;
                        r < t.length;
                        r++
                      ) {
                        var i = t[r];
                        e.set(i, n), (n += i.length);
                      }
                      return e;
                    })(o.concat(r)),
              e = {
                rawBytesCount: i,
                output: t,
                outputBytesCount: t.byteLength,
                encoding: "deflate",
              };
            return (i = 0), (o = []), e;
          }
          function l() {
            a > 0 && (e.postMessage({ action: "reset", streamId: n }), (a = 0));
          }
          return {
            isAsync: !0,
            get isEmpty() {
              return 0 === a;
            },
            write: function (t, r) {
              e.postMessage({ action: "write", id: a, data: t, streamId: n }),
                s.push({ id: a, writeCallback: r, data: t }),
                (a += 1);
            },
            finish: function (t) {
              l(),
                s.length
                  ? (s.forEach(function (t) {
                      delete t.writeCallback;
                    }),
                    (s[s.length - 1].finishCallback = function () {
                      return t(c());
                    }))
                  : t(c());
            },
            finishSync: function () {
              l();
              var t = s
                .map(function (t) {
                  return (
                    delete t.writeCallback, delete t.finishCallback, t.data
                  );
                })
                .join("");
              return W(c(), { pendingData: t });
            },
            estimateEncodedBytesCount: function (t) {
              return t.length / 8;
            },
            stop: function () {
              u();
            },
          };
        }
        function i1(t) {
          return new Worker(
            t.workerUrl ||
              URL.createObjectURL(
                new Blob([
                  '!function(){"use strict";function t(t){for(var e=t.reduce((function(t,e){return t+e.length}),0),a=new Uint8Array(e),n=0,r=0,i=t;r<i.length;r++){var s=i[r];a.set(s,n),n+=s.length}return a}function e(t){for(var e=t.length;--e>=0;)t[e]=0}var a=256,n=286,r=30,i=15,s=new Uint8Array([0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0]),h=new Uint8Array([0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13]),l=new Uint8Array([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,3,7]),_=new Uint8Array([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]),o=new Array(576);e(o);var d=new Array(60);e(d);var u=new Array(512);e(u);var f=new Array(256);e(f);var c=new Array(29);e(c);var p,g,w,v=new Array(r);function b(t,e,a,n,r){this.static_tree=t,this.extra_bits=e,this.extra_base=a,this.elems=n,this.max_length=r,this.has_stree=t&&t.length}function m(t,e){this.dyn_tree=t,this.max_code=0,this.stat_desc=e}e(v);var y=function(t){return t<256?u[t]:u[256+(t>>>7)]},k=function(t,e){t.pending_buf[t.pending++]=255&e,t.pending_buf[t.pending++]=e>>>8&255},z=function(t,e,a){t.bi_valid>16-a?(t.bi_buf|=e<<t.bi_valid&65535,k(t,t.bi_buf),t.bi_buf=e>>16-t.bi_valid,t.bi_valid+=a-16):(t.bi_buf|=e<<t.bi_valid&65535,t.bi_valid+=a)},x=function(t,e,a){z(t,a[2*e],a[2*e+1])},A=function(t,e){var a=0;do{a|=1&t,t>>>=1,a<<=1}while(--e>0);return a>>>1},U=function(t,e,a){var n,r,s=new Array(16),h=0;for(n=1;n<=i;n++)s[n]=h=h+a[n-1]<<1;for(r=0;r<=e;r++){var l=t[2*r+1];0!==l&&(t[2*r]=A(s[l]++,l))}},I=function(t){var e;for(e=0;e<n;e++)t.dyn_ltree[2*e]=0;for(e=0;e<r;e++)t.dyn_dtree[2*e]=0;for(e=0;e<19;e++)t.bl_tree[2*e]=0;t.dyn_ltree[512]=1,t.opt_len=t.static_len=0,t.last_lit=t.matches=0},B=function(t){t.bi_valid>8?k(t,t.bi_buf):t.bi_valid>0&&(t.pending_buf[t.pending++]=t.bi_buf),t.bi_buf=0,t.bi_valid=0},E=function(t,e,a,n){var r=2*e,i=2*a;return t[r]<t[i]||t[r]===t[i]&&n[e]<=n[a]},S=function(t,e,a){for(var n=t.heap[a],r=a<<1;r<=t.heap_len&&(r<t.heap_len&&E(e,t.heap[r+1],t.heap[r],t.depth)&&r++,!E(e,n,t.heap[r],t.depth));)t.heap[a]=t.heap[r],a=r,r<<=1;t.heap[a]=n},C=function(t,e,n){var r,i,l,_,o=0;if(0!==t.last_lit)do{r=t.pending_buf[t.d_buf+2*o]<<8|t.pending_buf[t.d_buf+2*o+1],i=t.pending_buf[t.l_buf+o],o++,0===r?x(t,i,e):(l=f[i],x(t,l+a+1,e),0!==(_=s[l])&&(i-=c[l],z(t,i,_)),r--,l=y(r),x(t,l,n),0!==(_=h[l])&&(r-=v[l],z(t,r,_)))}while(o<t.last_lit);x(t,256,e)},D=function(t,e){var a,n,r,s=e.dyn_tree,h=e.stat_desc.static_tree,l=e.stat_desc.has_stree,_=e.stat_desc.elems,o=-1;for(t.heap_len=0,t.heap_max=573,a=0;a<_;a++)0!==s[2*a]?(t.heap[++t.heap_len]=o=a,t.depth[a]=0):s[2*a+1]=0;for(;t.heap_len<2;)s[2*(r=t.heap[++t.heap_len]=o<2?++o:0)]=1,t.depth[r]=0,t.opt_len--,l&&(t.static_len-=h[2*r+1]);for(e.max_code=o,a=t.heap_len>>1;a>=1;a--)S(t,s,a);r=_;do{a=t.heap[1],t.heap[1]=t.heap[t.heap_len--],S(t,s,1),n=t.heap[1],t.heap[--t.heap_max]=a,t.heap[--t.heap_max]=n,s[2*r]=s[2*a]+s[2*n],t.depth[r]=(t.depth[a]>=t.depth[n]?t.depth[a]:t.depth[n])+1,s[2*a+1]=s[2*n+1]=r,t.heap[1]=r++,S(t,s,1)}while(t.heap_len>=2);t.heap[--t.heap_max]=t.heap[1],function(t,e){var a,n,r,s,h,l,_=e.dyn_tree,o=e.max_code,d=e.stat_desc.static_tree,u=e.stat_desc.has_stree,f=e.stat_desc.extra_bits,c=e.stat_desc.extra_base,p=e.stat_desc.max_length,g=0;for(s=0;s<=i;s++)t.bl_count[s]=0;for(_[2*t.heap[t.heap_max]+1]=0,a=t.heap_max+1;a<573;a++)(s=_[2*_[2*(n=t.heap[a])+1]+1]+1)>p&&(s=p,g++),_[2*n+1]=s,n>o||(t.bl_count[s]++,h=0,n>=c&&(h=f[n-c]),l=_[2*n],t.opt_len+=l*(s+h),u&&(t.static_len+=l*(d[2*n+1]+h)));if(0!==g){do{for(s=p-1;0===t.bl_count[s];)s--;t.bl_count[s]--,t.bl_count[s+1]+=2,t.bl_count[p]--,g-=2}while(g>0);for(s=p;0!==s;s--)for(n=t.bl_count[s];0!==n;)(r=t.heap[--a])>o||(_[2*r+1]!==s&&(t.opt_len+=(s-_[2*r+1])*_[2*r],_[2*r+1]=s),n--)}}(t,e),U(s,o,t.bl_count)},j=function(t,e,a){var n,r,i=-1,s=e[1],h=0,l=7,_=4;for(0===s&&(l=138,_=3),e[2*(a+1)+1]=65535,n=0;n<=a;n++)r=s,s=e[2*(n+1)+1],++h<l&&r===s||(h<_?t.bl_tree[2*r]+=h:0!==r?(r!==i&&t.bl_tree[2*r]++,t.bl_tree[32]++):h<=10?t.bl_tree[34]++:t.bl_tree[36]++,h=0,i=r,0===s?(l=138,_=3):r===s?(l=6,_=3):(l=7,_=4))},M=function(t,e,a){var n,r,i=-1,s=e[1],h=0,l=7,_=4;for(0===s&&(l=138,_=3),n=0;n<=a;n++)if(r=s,s=e[2*(n+1)+1],!(++h<l&&r===s)){if(h<_)do{x(t,r,t.bl_tree)}while(0!=--h);else 0!==r?(r!==i&&(x(t,r,t.bl_tree),h--),x(t,16,t.bl_tree),z(t,h-3,2)):h<=10?(x(t,17,t.bl_tree),z(t,h-3,3)):(x(t,18,t.bl_tree),z(t,h-11,7));h=0,i=r,0===s?(l=138,_=3):r===s?(l=6,_=3):(l=7,_=4)}},L=!1,T=function(t,e,a,n){z(t,0+(n?1:0),3),function(t,e,a,n){B(t),n&&(k(t,a),k(t,~a)),t.pending_buf.set(t.window.subarray(e,e+a),t.pending),t.pending+=a}(t,e,a,!0)},H=function(t,e,n,r){var i,s,h=0;t.level>0?(2===t.strm.data_type&&(t.strm.data_type=function(t){var e,n=4093624447;for(e=0;e<=31;e++,n>>>=1)if(1&n&&0!==t.dyn_ltree[2*e])return 0;if(0!==t.dyn_ltree[18]||0!==t.dyn_ltree[20]||0!==t.dyn_ltree[26])return 1;for(e=32;e<a;e++)if(0!==t.dyn_ltree[2*e])return 1;return 0}(t)),D(t,t.l_desc),D(t,t.d_desc),h=function(t){var e;for(j(t,t.dyn_ltree,t.l_desc.max_code),j(t,t.dyn_dtree,t.d_desc.max_code),D(t,t.bl_desc),e=18;e>=3&&0===t.bl_tree[2*_[e]+1];e--);return t.opt_len+=3*(e+1)+5+5+4,e}(t),i=t.opt_len+3+7>>>3,(s=t.static_len+3+7>>>3)<=i&&(i=s)):i=s=n+5,n+4<=i&&-1!==e?T(t,e,n,r):4===t.strategy||s===i?(z(t,2+(r?1:0),3),C(t,o,d)):(z(t,4+(r?1:0),3),function(t,e,a,n){var r;for(z(t,e-257,5),z(t,a-1,5),z(t,n-4,4),r=0;r<n;r++)z(t,t.bl_tree[2*_[r]+1],3);M(t,t.dyn_ltree,e-1),M(t,t.dyn_dtree,a-1)}(t,t.l_desc.max_code+1,t.d_desc.max_code+1,h+1),C(t,t.dyn_ltree,t.dyn_dtree)),I(t),r&&B(t)},R={_tr_init:function(t){L||(!function(){var t,e,a,_,m,y=new Array(16);for(a=0,_=0;_<28;_++)for(c[_]=a,t=0;t<1<<s[_];t++)f[a++]=_;for(f[a-1]=_,m=0,_=0;_<16;_++)for(v[_]=m,t=0;t<1<<h[_];t++)u[m++]=_;for(m>>=7;_<r;_++)for(v[_]=m<<7,t=0;t<1<<h[_]-7;t++)u[256+m++]=_;for(e=0;e<=i;e++)y[e]=0;for(t=0;t<=143;)o[2*t+1]=8,t++,y[8]++;for(;t<=255;)o[2*t+1]=9,t++,y[9]++;for(;t<=279;)o[2*t+1]=7,t++,y[7]++;for(;t<=287;)o[2*t+1]=8,t++,y[8]++;for(U(o,287,y),t=0;t<r;t++)d[2*t+1]=5,d[2*t]=A(t,5);p=new b(o,s,257,n,i),g=new b(d,h,0,r,i),w=new b(new Array(0),l,0,19,7)}(),L=!0),t.l_desc=new m(t.dyn_ltree,p),t.d_desc=new m(t.dyn_dtree,g),t.bl_desc=new m(t.bl_tree,w),t.bi_buf=0,t.bi_valid=0,I(t)},_tr_stored_block:T,_tr_flush_block:H,_tr_tally:function(t,e,n){return t.pending_buf[t.d_buf+2*t.last_lit]=e>>>8&255,t.pending_buf[t.d_buf+2*t.last_lit+1]=255&e,t.pending_buf[t.l_buf+t.last_lit]=255&n,t.last_lit++,0===e?t.dyn_ltree[2*n]++:(t.matches++,e--,t.dyn_ltree[2*(f[n]+a+1)]++,t.dyn_dtree[2*y(e)]++),t.last_lit===t.lit_bufsize-1},_tr_align:function(t){z(t,2,3),x(t,256,o),function(t){16===t.bi_valid?(k(t,t.bi_buf),t.bi_buf=0,t.bi_valid=0):t.bi_valid>=8&&(t.pending_buf[t.pending++]=255&t.bi_buf,t.bi_buf>>=8,t.bi_valid-=8)}(t)}},K=function(t,e,a,n){for(var r=65535&t,i=t>>>16&65535,s=0;0!==a;){a-=s=a>2e3?2e3:a;do{i=i+(r=r+e[n++]|0)|0}while(--s);r%=65521,i%=65521}return r|i<<16},N=new Uint32Array(function(){for(var t,e=[],a=0;a<256;a++){t=a;for(var n=0;n<8;n++)t=1&t?3988292384^t>>>1:t>>>1;e[a]=t}return e}()),O=function(t,e,a,n){var r=N,i=n+a;t^=-1;for(var s=n;s<i;s++)t=t>>>8^r[255&(t^e[s])];return~t},q={2:"need dictionary",1:"stream end",0:"","-1":"file error","-2":"stream error","-3":"data error","-4":"insufficient memory","-5":"buffer error","-6":"incompatible version"},F=0,G=2,J=3,P=4,Q=0,V=1,W=-1,X=0,Y=8,Z=R._tr_init,$=R._tr_stored_block,tt=R._tr_flush_block,et=R._tr_tally,at=R._tr_align,nt=F,rt=1,it=J,st=P,ht=5,lt=Q,_t=V,ot=-2,dt=-3,ut=-5,ft=W,ct=1,pt=2,gt=3,wt=4,vt=X,bt=2,mt=Y,yt=258,kt=262,zt=103,xt=113,At=666,Ut=function(t,e){return t.msg=q[e],e},It=function(t){return(t<<1)-(t>4?9:0)},Bt=function(t){for(var e=t.length;--e>=0;)t[e]=0},Et=function(t,e,a){return(e<<t.hash_shift^a)&t.hash_mask},St=function(t){var e=t.state,a=e.pending;a>t.avail_out&&(a=t.avail_out),0!==a&&(t.output.set(e.pending_buf.subarray(e.pending_out,e.pending_out+a),t.next_out),t.next_out+=a,e.pending_out+=a,t.total_out+=a,t.avail_out-=a,e.pending-=a,0===e.pending&&(e.pending_out=0))},Ct=function(t,e){tt(t,t.block_start>=0?t.block_start:-1,t.strstart-t.block_start,e),t.block_start=t.strstart,St(t.strm)},Dt=function(t,e){t.pending_buf[t.pending++]=e},jt=function(t,e){t.pending_buf[t.pending++]=e>>>8&255,t.pending_buf[t.pending++]=255&e},Mt=function(t,e){var a,n,r=t.max_chain_length,i=t.strstart,s=t.prev_length,h=t.nice_match,l=t.strstart>t.w_size-kt?t.strstart-(t.w_size-kt):0,_=t.window,o=t.w_mask,d=t.prev,u=t.strstart+yt,f=_[i+s-1],c=_[i+s];t.prev_length>=t.good_match&&(r>>=2),h>t.lookahead&&(h=t.lookahead);do{if(_[(a=e)+s]===c&&_[a+s-1]===f&&_[a]===_[i]&&_[++a]===_[i+1]){i+=2,a++;do{}while(_[++i]===_[++a]&&_[++i]===_[++a]&&_[++i]===_[++a]&&_[++i]===_[++a]&&_[++i]===_[++a]&&_[++i]===_[++a]&&_[++i]===_[++a]&&_[++i]===_[++a]&&i<u);if(n=yt-(u-i),i=u-yt,n>s){if(t.match_start=e,s=n,n>=h)break;f=_[i+s-1],c=_[i+s]}}}while((e=d[e&o])>l&&0!=--r);return s<=t.lookahead?s:t.lookahead},Lt=function(t){var e,a,n,r,i,s,h,l,_,o,d=t.w_size;do{if(r=t.window_size-t.lookahead-t.strstart,t.strstart>=d+(d-kt)){t.window.set(t.window.subarray(d,d+d),0),t.match_start-=d,t.strstart-=d,t.block_start-=d,e=a=t.hash_size;do{n=t.head[--e],t.head[e]=n>=d?n-d:0}while(--a);e=a=d;do{n=t.prev[--e],t.prev[e]=n>=d?n-d:0}while(--a);r+=d}if(0===t.strm.avail_in)break;if(s=t.strm,h=t.window,l=t.strstart+t.lookahead,_=r,o=void 0,(o=s.avail_in)>_&&(o=_),a=0===o?0:(s.avail_in-=o,h.set(s.input.subarray(s.next_in,s.next_in+o),l),1===s.state.wrap?s.adler=K(s.adler,h,o,l):2===s.state.wrap&&(s.adler=O(s.adler,h,o,l)),s.next_in+=o,s.total_in+=o,o),t.lookahead+=a,t.lookahead+t.insert>=3)for(i=t.strstart-t.insert,t.ins_h=t.window[i],t.ins_h=Et(t,t.ins_h,t.window[i+1]);t.insert&&(t.ins_h=Et(t,t.ins_h,t.window[i+3-1]),t.prev[i&t.w_mask]=t.head[t.ins_h],t.head[t.ins_h]=i,i++,t.insert--,!(t.lookahead+t.insert<3)););}while(t.lookahead<kt&&0!==t.strm.avail_in)},Tt=function(t,e){for(var a,n;;){if(t.lookahead<kt){if(Lt(t),t.lookahead<kt&&e===nt)return 1;if(0===t.lookahead)break}if(a=0,t.lookahead>=3&&(t.ins_h=Et(t,t.ins_h,t.window[t.strstart+3-1]),a=t.prev[t.strstart&t.w_mask]=t.head[t.ins_h],t.head[t.ins_h]=t.strstart),0!==a&&t.strstart-a<=t.w_size-kt&&(t.match_length=Mt(t,a)),t.match_length>=3)if(n=et(t,t.strstart-t.match_start,t.match_length-3),t.lookahead-=t.match_length,t.match_length<=t.max_lazy_match&&t.lookahead>=3){t.match_length--;do{t.strstart++,t.ins_h=Et(t,t.ins_h,t.window[t.strstart+3-1]),a=t.prev[t.strstart&t.w_mask]=t.head[t.ins_h],t.head[t.ins_h]=t.strstart}while(0!=--t.match_length);t.strstart++}else t.strstart+=t.match_length,t.match_length=0,t.ins_h=t.window[t.strstart],t.ins_h=Et(t,t.ins_h,t.window[t.strstart+1]);else n=et(t,0,t.window[t.strstart]),t.lookahead--,t.strstart++;if(n&&(Ct(t,!1),0===t.strm.avail_out))return 1}return t.insert=t.strstart<2?t.strstart:2,e===st?(Ct(t,!0),0===t.strm.avail_out?3:4):t.last_lit&&(Ct(t,!1),0===t.strm.avail_out)?1:2},Ht=function(t,e){for(var a,n,r;;){if(t.lookahead<kt){if(Lt(t),t.lookahead<kt&&e===nt)return 1;if(0===t.lookahead)break}if(a=0,t.lookahead>=3&&(t.ins_h=Et(t,t.ins_h,t.window[t.strstart+3-1]),a=t.prev[t.strstart&t.w_mask]=t.head[t.ins_h],t.head[t.ins_h]=t.strstart),t.prev_length=t.match_length,t.prev_match=t.match_start,t.match_length=2,0!==a&&t.prev_length<t.max_lazy_match&&t.strstart-a<=t.w_size-kt&&(t.match_length=Mt(t,a),t.match_length<=5&&(t.strategy===ct||3===t.match_length&&t.strstart-t.match_start>4096)&&(t.match_length=2)),t.prev_length>=3&&t.match_length<=t.prev_length){r=t.strstart+t.lookahead-3,n=et(t,t.strstart-1-t.prev_match,t.prev_length-3),t.lookahead-=t.prev_length-1,t.prev_length-=2;do{++t.strstart<=r&&(t.ins_h=Et(t,t.ins_h,t.window[t.strstart+3-1]),a=t.prev[t.strstart&t.w_mask]=t.head[t.ins_h],t.head[t.ins_h]=t.strstart)}while(0!=--t.prev_length);if(t.match_available=0,t.match_length=2,t.strstart++,n&&(Ct(t,!1),0===t.strm.avail_out))return 1}else if(t.match_available){if((n=et(t,0,t.window[t.strstart-1]))&&Ct(t,!1),t.strstart++,t.lookahead--,0===t.strm.avail_out)return 1}else t.match_available=1,t.strstart++,t.lookahead--}return t.match_available&&(n=et(t,0,t.window[t.strstart-1]),t.match_available=0),t.insert=t.strstart<2?t.strstart:2,e===st?(Ct(t,!0),0===t.strm.avail_out?3:4):t.last_lit&&(Ct(t,!1),0===t.strm.avail_out)?1:2};function Rt(t,e,a,n,r){this.good_length=t,this.max_lazy=e,this.nice_length=a,this.max_chain=n,this.func=r}var Kt=[new Rt(0,0,0,0,(function(t,e){var a=65535;for(a>t.pending_buf_size-5&&(a=t.pending_buf_size-5);;){if(t.lookahead<=1){if(Lt(t),0===t.lookahead&&e===nt)return 1;if(0===t.lookahead)break}t.strstart+=t.lookahead,t.lookahead=0;var n=t.block_start+a;if((0===t.strstart||t.strstart>=n)&&(t.lookahead=t.strstart-n,t.strstart=n,Ct(t,!1),0===t.strm.avail_out))return 1;if(t.strstart-t.block_start>=t.w_size-kt&&(Ct(t,!1),0===t.strm.avail_out))return 1}return t.insert=0,e===st?(Ct(t,!0),0===t.strm.avail_out?3:4):(t.strstart>t.block_start&&(Ct(t,!1),t.strm.avail_out),1)})),new Rt(4,4,8,4,Tt),new Rt(4,5,16,8,Tt),new Rt(4,6,32,32,Tt),new Rt(4,4,16,16,Ht),new Rt(8,16,32,32,Ht),new Rt(8,16,128,128,Ht),new Rt(8,32,128,256,Ht),new Rt(32,128,258,1024,Ht),new Rt(32,258,258,4096,Ht)];function Nt(){this.strm=null,this.status=0,this.pending_buf=null,this.pending_buf_size=0,this.pending_out=0,this.pending=0,this.wrap=0,this.gzhead=null,this.gzindex=0,this.method=mt,this.last_flush=-1,this.w_size=0,this.w_bits=0,this.w_mask=0,this.window=null,this.window_size=0,this.prev=null,this.head=null,this.ins_h=0,this.hash_size=0,this.hash_bits=0,this.hash_mask=0,this.hash_shift=0,this.block_start=0,this.match_length=0,this.prev_match=0,this.match_available=0,this.strstart=0,this.match_start=0,this.lookahead=0,this.prev_length=0,this.max_chain_length=0,this.max_lazy_match=0,this.level=0,this.strategy=0,this.good_match=0,this.nice_match=0,this.dyn_ltree=new Uint16Array(1146),this.dyn_dtree=new Uint16Array(122),this.bl_tree=new Uint16Array(78),Bt(this.dyn_ltree),Bt(this.dyn_dtree),Bt(this.bl_tree),this.l_desc=null,this.d_desc=null,this.bl_desc=null,this.bl_count=new Uint16Array(16),this.heap=new Uint16Array(573),Bt(this.heap),this.heap_len=0,this.heap_max=0,this.depth=new Uint16Array(573),Bt(this.depth),this.l_buf=0,this.lit_bufsize=0,this.last_lit=0,this.d_buf=0,this.opt_len=0,this.static_len=0,this.matches=0,this.insert=0,this.bi_buf=0,this.bi_valid=0}var Ot=function(t){if(!t||!t.state)return Ut(t,ot);t.total_in=t.total_out=0,t.data_type=bt;var e=t.state;return e.pending=0,e.pending_out=0,e.wrap<0&&(e.wrap=-e.wrap),e.status=e.wrap?42:xt,t.adler=2===e.wrap?0:1,e.last_flush=nt,Z(e),lt},qt=function(t){var e,a=Ot(t);return a===lt&&((e=t.state).window_size=2*e.w_size,Bt(e.head),e.max_lazy_match=Kt[e.level].max_lazy,e.good_match=Kt[e.level].good_length,e.nice_match=Kt[e.level].nice_length,e.max_chain_length=Kt[e.level].max_chain,e.strstart=0,e.block_start=0,e.lookahead=0,e.insert=0,e.match_length=e.prev_length=2,e.match_available=0,e.ins_h=0),a},Ft=function(t,e,a,n,r,i){if(!t)return ot;var s=1;if(e===ft&&(e=6),n<0?(s=0,n=-n):n>15&&(s=2,n-=16),r<1||r>9||a!==mt||n<8||n>15||e<0||e>9||i<0||i>wt)return Ut(t,ot);8===n&&(n=9);var h=new Nt;return t.state=h,h.strm=t,h.wrap=s,h.gzhead=null,h.w_bits=n,h.w_size=1<<h.w_bits,h.w_mask=h.w_size-1,h.hash_bits=r+7,h.hash_size=1<<h.hash_bits,h.hash_mask=h.hash_size-1,h.hash_shift=~~((h.hash_bits+3-1)/3),h.window=new Uint8Array(2*h.w_size),h.head=new Uint16Array(h.hash_size),h.prev=new Uint16Array(h.w_size),h.lit_bufsize=1<<r+6,h.pending_buf_size=4*h.lit_bufsize,h.pending_buf=new Uint8Array(h.pending_buf_size),h.d_buf=1*h.lit_bufsize,h.l_buf=3*h.lit_bufsize,h.level=e,h.strategy=i,h.method=a,qt(t)},Gt={deflateInit:function(t,e){return Ft(t,e,mt,15,8,vt)},deflateInit2:Ft,deflateReset:qt,deflateResetKeep:Ot,deflateSetHeader:function(t,e){return t&&t.state?2!==t.state.wrap?ot:(t.state.gzhead=e,lt):ot},deflate:function(t,e){var a,n;if(!t||!t.state||e>ht||e<0)return t?Ut(t,ot):ot;var r=t.state;if(!t.output||!t.input&&0!==t.avail_in||r.status===At&&e!==st)return Ut(t,0===t.avail_out?ut:ot);r.strm=t;var i=r.last_flush;if(r.last_flush=e,42===r.status)if(2===r.wrap)t.adler=0,Dt(r,31),Dt(r,139),Dt(r,8),r.gzhead?(Dt(r,(r.gzhead.text?1:0)+(r.gzhead.hcrc?2:0)+(r.gzhead.extra?4:0)+(r.gzhead.name?8:0)+(r.gzhead.comment?16:0)),Dt(r,255&r.gzhead.time),Dt(r,r.gzhead.time>>8&255),Dt(r,r.gzhead.time>>16&255),Dt(r,r.gzhead.time>>24&255),Dt(r,9===r.level?2:r.strategy>=pt||r.level<2?4:0),Dt(r,255&r.gzhead.os),r.gzhead.extra&&r.gzhead.extra.length&&(Dt(r,255&r.gzhead.extra.length),Dt(r,r.gzhead.extra.length>>8&255)),r.gzhead.hcrc&&(t.adler=O(t.adler,r.pending_buf,r.pending,0)),r.gzindex=0,r.status=69):(Dt(r,0),Dt(r,0),Dt(r,0),Dt(r,0),Dt(r,0),Dt(r,9===r.level?2:r.strategy>=pt||r.level<2?4:0),Dt(r,3),r.status=xt);else{var s=mt+(r.w_bits-8<<4)<<8;s|=(r.strategy>=pt||r.level<2?0:r.level<6?1:6===r.level?2:3)<<6,0!==r.strstart&&(s|=32),s+=31-s%31,r.status=xt,jt(r,s),0!==r.strstart&&(jt(r,t.adler>>>16),jt(r,65535&t.adler)),t.adler=1}if(69===r.status)if(r.gzhead.extra){for(a=r.pending;r.gzindex<(65535&r.gzhead.extra.length)&&(r.pending!==r.pending_buf_size||(r.gzhead.hcrc&&r.pending>a&&(t.adler=O(t.adler,r.pending_buf,r.pending-a,a)),St(t),a=r.pending,r.pending!==r.pending_buf_size));)Dt(r,255&r.gzhead.extra[r.gzindex]),r.gzindex++;r.gzhead.hcrc&&r.pending>a&&(t.adler=O(t.adler,r.pending_buf,r.pending-a,a)),r.gzindex===r.gzhead.extra.length&&(r.gzindex=0,r.status=73)}else r.status=73;if(73===r.status)if(r.gzhead.name){a=r.pending;do{if(r.pending===r.pending_buf_size&&(r.gzhead.hcrc&&r.pending>a&&(t.adler=O(t.adler,r.pending_buf,r.pending-a,a)),St(t),a=r.pending,r.pending===r.pending_buf_size)){n=1;break}n=r.gzindex<r.gzhead.name.length?255&r.gzhead.name.charCodeAt(r.gzindex++):0,Dt(r,n)}while(0!==n);r.gzhead.hcrc&&r.pending>a&&(t.adler=O(t.adler,r.pending_buf,r.pending-a,a)),0===n&&(r.gzindex=0,r.status=91)}else r.status=91;if(91===r.status)if(r.gzhead.comment){a=r.pending;do{if(r.pending===r.pending_buf_size&&(r.gzhead.hcrc&&r.pending>a&&(t.adler=O(t.adler,r.pending_buf,r.pending-a,a)),St(t),a=r.pending,r.pending===r.pending_buf_size)){n=1;break}n=r.gzindex<r.gzhead.comment.length?255&r.gzhead.comment.charCodeAt(r.gzindex++):0,Dt(r,n)}while(0!==n);r.gzhead.hcrc&&r.pending>a&&(t.adler=O(t.adler,r.pending_buf,r.pending-a,a)),0===n&&(r.status=zt)}else r.status=zt;if(r.status===zt&&(r.gzhead.hcrc?(r.pending+2>r.pending_buf_size&&St(t),r.pending+2<=r.pending_buf_size&&(Dt(r,255&t.adler),Dt(r,t.adler>>8&255),t.adler=0,r.status=xt)):r.status=xt),0!==r.pending){if(St(t),0===t.avail_out)return r.last_flush=-1,lt}else if(0===t.avail_in&&It(e)<=It(i)&&e!==st)return Ut(t,ut);if(r.status===At&&0!==t.avail_in)return Ut(t,ut);if(0!==t.avail_in||0!==r.lookahead||e!==nt&&r.status!==At){var h=r.strategy===pt?function(t,e){for(var a;;){if(0===t.lookahead&&(Lt(t),0===t.lookahead)){if(e===nt)return 1;break}if(t.match_length=0,a=et(t,0,t.window[t.strstart]),t.lookahead--,t.strstart++,a&&(Ct(t,!1),0===t.strm.avail_out))return 1}return t.insert=0,e===st?(Ct(t,!0),0===t.strm.avail_out?3:4):t.last_lit&&(Ct(t,!1),0===t.strm.avail_out)?1:2}(r,e):r.strategy===gt?function(t,e){for(var a,n,r,i,s=t.window;;){if(t.lookahead<=yt){if(Lt(t),t.lookahead<=yt&&e===nt)return 1;if(0===t.lookahead)break}if(t.match_length=0,t.lookahead>=3&&t.strstart>0&&(n=s[r=t.strstart-1])===s[++r]&&n===s[++r]&&n===s[++r]){i=t.strstart+yt;do{}while(n===s[++r]&&n===s[++r]&&n===s[++r]&&n===s[++r]&&n===s[++r]&&n===s[++r]&&n===s[++r]&&n===s[++r]&&r<i);t.match_length=yt-(i-r),t.match_length>t.lookahead&&(t.match_length=t.lookahead)}if(t.match_length>=3?(a=et(t,1,t.match_length-3),t.lookahead-=t.match_length,t.strstart+=t.match_length,t.match_length=0):(a=et(t,0,t.window[t.strstart]),t.lookahead--,t.strstart++),a&&(Ct(t,!1),0===t.strm.avail_out))return 1}return t.insert=0,e===st?(Ct(t,!0),0===t.strm.avail_out?3:4):t.last_lit&&(Ct(t,!1),0===t.strm.avail_out)?1:2}(r,e):Kt[r.level].func(r,e);if(3!==h&&4!==h||(r.status=At),1===h||3===h)return 0===t.avail_out&&(r.last_flush=-1),lt;if(2===h&&(e===rt?at(r):e!==ht&&($(r,0,0,!1),e===it&&(Bt(r.head),0===r.lookahead&&(r.strstart=0,r.block_start=0,r.insert=0))),St(t),0===t.avail_out))return r.last_flush=-1,lt}return e!==st?lt:r.wrap<=0?_t:(2===r.wrap?(Dt(r,255&t.adler),Dt(r,t.adler>>8&255),Dt(r,t.adler>>16&255),Dt(r,t.adler>>24&255),Dt(r,255&t.total_in),Dt(r,t.total_in>>8&255),Dt(r,t.total_in>>16&255),Dt(r,t.total_in>>24&255)):(jt(r,t.adler>>>16),jt(r,65535&t.adler)),St(t),r.wrap>0&&(r.wrap=-r.wrap),0!==r.pending?lt:_t)},deflateEnd:function(t){if(!t||!t.state)return ot;var e=t.state.status;return 42!==e&&69!==e&&73!==e&&91!==e&&e!==zt&&e!==xt&&e!==At?Ut(t,ot):(t.state=null,e===xt?Ut(t,dt):lt)},deflateSetDictionary:function(t,e){var a=e.length;if(!t||!t.state)return ot;var n=t.state,r=n.wrap;if(2===r||1===r&&42!==n.status||n.lookahead)return ot;if(1===r&&(t.adler=K(t.adler,e,a,0)),n.wrap=0,a>=n.w_size){0===r&&(Bt(n.head),n.strstart=0,n.block_start=0,n.insert=0);var i=new Uint8Array(n.w_size);i.set(e.subarray(a-n.w_size,a),0),e=i,a=n.w_size}var s=t.avail_in,h=t.next_in,l=t.input;for(t.avail_in=a,t.next_in=0,t.input=e,Lt(n);n.lookahead>=3;){var _=n.strstart,o=n.lookahead-2;do{n.ins_h=Et(n,n.ins_h,n.window[_+3-1]),n.prev[_&n.w_mask]=n.head[n.ins_h],n.head[n.ins_h]=_,_++}while(--o);n.strstart=_,n.lookahead=2,Lt(n)}return n.strstart+=n.lookahead,n.block_start=n.strstart,n.insert=n.lookahead,n.lookahead=0,n.match_length=n.prev_length=2,n.match_available=0,t.next_in=h,t.input=l,t.avail_in=s,n.wrap=r,lt},deflateInfo:"pako deflate (from Nodeca project)"};for(var Jt=new Uint8Array(256),Pt=0;Pt<256;Pt++)Jt[Pt]=Pt>=252?6:Pt>=248?5:Pt>=240?4:Pt>=224?3:Pt>=192?2:1;Jt[254]=Jt[254]=1;var Qt=function(){this.input=null,this.next_in=0,this.avail_in=0,this.total_in=0,this.output=null,this.next_out=0,this.avail_out=0,this.total_out=0,this.msg="",this.state=null,this.data_type=2,this.adler=0},Vt=Object.prototype.toString,Wt=F,Xt=G,Yt=J,Zt=P,$t=Q,te=V,ee=W,ae=X,ne=Y;function re(){this.options={level:ee,method:ne,chunkSize:16384,windowBits:15,memLevel:8,strategy:ae};var t=this.options;t.raw&&t.windowBits>0?t.windowBits=-t.windowBits:t.gzip&&t.windowBits>0&&t.windowBits<16&&(t.windowBits+=16),this.err=0,this.msg="",this.ended=!1,this.chunks=[],this.strm=new Qt,this.strm.avail_out=0;var e=Gt.deflateInit2(this.strm,t.level,t.method,t.windowBits,t.memLevel,t.strategy);if(e!==$t)throw new Error(q[e]);if(t.header&&Gt.deflateSetHeader(this.strm,t.header),t.dictionary){var a;if(a="[object ArrayBuffer]"===Vt.call(t.dictionary)?new Uint8Array(t.dictionary):t.dictionary,(e=Gt.deflateSetDictionary(this.strm,a))!==$t)throw new Error(q[e]);this._dict_set=!0}}function ie(t,e,a){try{t.postMessage({type:"errored",error:e,streamId:a})}catch(n){t.postMessage({type:"errored",error:String(e),streamId:a})}}function se(t){var e=t.strm.adler;return new Uint8Array([3,0,e>>>24&255,e>>>16&255,e>>>8&255,255&e])}re.prototype.push=function(t,e){var a,n,r=this.strm,i=this.options.chunkSize;if(this.ended)return!1;for(n=e===~~e?e:!0===e?Zt:Wt,"[object ArrayBuffer]"===Vt.call(t)?r.input=new Uint8Array(t):r.input=t,r.next_in=0,r.avail_in=r.input.length;;)if(0===r.avail_out&&(r.output=new Uint8Array(i),r.next_out=0,r.avail_out=i),(n===Xt||n===Yt)&&r.avail_out<=6)this.onData(r.output.subarray(0,r.next_out)),r.avail_out=0;else{if((a=Gt.deflate(r,n))===te)return r.next_out>0&&this.onData(r.output.subarray(0,r.next_out)),a=Gt.deflateEnd(this.strm),this.onEnd(a),this.ended=!0,a===$t;if(0!==r.avail_out){if(n>0&&r.next_out>0)this.onData(r.output.subarray(0,r.next_out)),r.avail_out=0;else if(0===r.avail_in)break}else this.onData(r.output)}return!0},re.prototype.onData=function(t){this.chunks.push(t)},re.prototype.onEnd=function(t){t===$t&&(this.result=function(t){for(var e=0,a=0,n=t.length;a<n;a++)e+=t[a].length;for(var r=new Uint8Array(e),i=0,s=0,h=t.length;i<h;i++){var l=t[i];r.set(l,s),s+=l.length}return r}(this.chunks)),this.chunks=[],this.err=t,this.msg=this.strm.msg},function(e){void 0===e&&(e=self);try{var a=new Map;e.addEventListener("message",(function(n){try{var r=function(e,a){switch(a.action){case"init":return{type:"initialized",version:"5.35.1"};case"write":var n=e.get(a.streamId);n||(n=new re,e.set(a.streamId,n));var r=n.chunks.length,i=function(t){if("function"==typeof TextEncoder&&TextEncoder.prototype.encode)return(new TextEncoder).encode(t);var e,a,n,r,i,s=t.length,h=0;for(r=0;r<s;r++)55296==(64512&(a=t.charCodeAt(r)))&&r+1<s&&56320==(64512&(n=t.charCodeAt(r+1)))&&(a=65536+(a-55296<<10)+(n-56320),r++),h+=a<128?1:a<2048?2:a<65536?3:4;for(e=new Uint8Array(h),i=0,r=0;i<h;r++)55296==(64512&(a=t.charCodeAt(r)))&&r+1<s&&56320==(64512&(n=t.charCodeAt(r+1)))&&(a=65536+(a-55296<<10)+(n-56320),r++),a<128?e[i++]=a:a<2048?(e[i++]=192|a>>>6,e[i++]=128|63&a):a<65536?(e[i++]=224|a>>>12,e[i++]=128|a>>>6&63,e[i++]=128|63&a):(e[i++]=240|a>>>18,e[i++]=128|a>>>12&63,e[i++]=128|a>>>6&63,e[i++]=128|63&a);return e}(a.data);return n.push(i,G),{type:"wrote",id:a.id,streamId:a.streamId,result:t(n.chunks.slice(r)),trailer:se(n),additionalBytesCount:i.length};case"reset":e.delete(a.streamId)}}(a,n.data);r&&e.postMessage(r)}catch(t){ie(e,t,n.data&&"streamId"in n.data?n.data.streamId:void 0)}}))}catch(t){ie(e,t)}}()}();',
                ]),
              ),
          );
        }
        var i2 = { status: 0 };
        function i3(t, e, n, r) {
          switch (
            (void 0 === r && (r = i1),
            0 === i2.status &&
              (function (t, e, n) {
                void 0 === n && (n = i1);
                try {
                  var r = n(t),
                    i = tS(t, r, "error", function (n) {
                      i5(t, e, n);
                    }).stop,
                    o = tS(t, r, "message", function (n) {
                      var r,
                        i = n.data;
                      "errored" === i.type
                        ? i5(t, e, i.error, i.streamId)
                        : "initialized" === i.type &&
                          ((r = i.version),
                          1 === i2.status &&
                            (i2 = {
                              status: 3,
                              worker: i2.worker,
                              stop: i2.stop,
                              version: r,
                            }));
                    }).stop;
                  r.postMessage({ action: "init" }),
                    Z(function () {
                      var t;
                      return (
                        (t = e),
                        void (
                          1 === i2.status &&
                          (O.error(
                            "".concat(
                              t,
                              " failed to start: a timeout occurred while initializing the Worker",
                            ),
                          ),
                          i2.initializationFailureCallbacks.forEach(
                            function (t) {
                              return t();
                            },
                          ),
                          (i2 = { status: 2 }))
                        )
                      );
                    }, 3e4),
                    (i2 = {
                      status: 1,
                      worker: r,
                      stop: function () {
                        i(), o();
                      },
                      initializationFailureCallbacks: [],
                    });
                } catch (n) {
                  i5(t, e, n);
                }
              })(t, e, r),
            i2.status)
          ) {
            case 1:
              return i2.initializationFailureCallbacks.push(n), i2.worker;
            case 3:
              return i2.worker;
          }
        }
        function i5(t, e, n, r) {
          if (1 === i2.status || 0 === i2.status) {
            var i;
            if (
              (O.error(
                "".concat(
                  e,
                  " failed to start: an error occurred while creating the Worker:",
                ),
                n,
              ),
              n instanceof Event ||
                (n instanceof Error &&
                  (B((i = n.message), "Content Security Policy") ||
                    B(i, "requires 'TrustedScriptURL'"))))
            ) {
              var o = void 0;
              (o = t.workerUrl
                ? "Please make sure the Worker URL ".concat(
                    t.workerUrl,
                    " is correct and CSP is correctly configured.",
                  )
                : "Please make sure CSP is correctly configured."),
                O.error(
                  ""
                    .concat(o, " See documentation at ")
                    .concat(
                      N,
                      "/integrations/content_security_policy_logs/#use-csp-with-real-user-monitoring-and-session-replay",
                    ),
                );
            } else ec(n);
            1 === i2.status &&
              i2.initializationFailureCallbacks.forEach(function (t) {
                return t();
              }),
              (i2 = { status: 2 });
          } else
            ec(n, {
              worker_version: 3 === i2.status && i2.version,
              stream_id: r,
            });
        }
        function i6() {
          return (
            "function" == typeof Array.from &&
            "function" == typeof CSSSupportsRule &&
            "function" == typeof URL.createObjectURL &&
            "forEach" in NodeList.prototype
          );
        }
        var i4 = (function (t, e, n) {
          void 0 === n && (n = {});
          var r,
            o,
            a,
            s = (function (t) {
              void 0 === t && (t = 2);
              var e = new Map(),
                n = !1;
              function r(r) {
                if ((void 0 === r && (r = 0), !n && 0 !== t)) {
                  var i,
                    o = 2 === t ? 3072 : 16384,
                    a = r;
                  e.forEach(function (t) {
                    a += t.getBytesCount();
                  }),
                    a > o &&
                      ((i = o),
                      O.warn(
                        "Customer data exceeds the recommended "
                          .concat(i / 1024, "KiB threshold. ")
                          .concat(M, " ")
                          .concat(
                            D,
                            "/#customer-data-exceeds-the-recommended-threshold-warning",
                          ),
                      ),
                      (n = !0));
                }
              }
              return {
                createDetachedTracker: function () {
                  var t = tl(function () {
                    return r(t.getBytesCount());
                  });
                  return t;
                },
                getOrCreateTracker: function (t) {
                  return e.has(t) || e.set(t, tl(r)), e.get(t);
                },
                setCompressionStatus: function (e) {
                  0 === t && ((t = e), r());
                },
                getCompressionStatus: function () {
                  return t;
                },
                stop: function () {
                  e.forEach(function (t) {
                    return t.stop();
                  }),
                    e.clear();
                },
              };
            })(0),
            u = tb(s.getOrCreateTracker(2)),
            c = tb(s.getOrCreateTracker(1)),
            l = {
              tryToInit: function (t) {
                r || (r = t);
              },
              update: function (t) {
                (r = t), o.notify();
              },
              isGranted: function () {
                return r === tw.GRANTED;
              },
              observable: (o = new ty()),
            },
            d = { vitalsByName: new Map(), vitalsByReference: new WeakMap() };
          function f() {
            return {
              context: u.getContext(),
              user: c.getContext(),
              hasReplay: !!e.isRecording() || void 0,
            };
          }
          var p = (function (t, e, n, r, o) {
              var a,
                s,
                u,
                c,
                l = t.ignoreInitIfSyntheticsWillInjectRum,
                d = t.startDeflateWorker,
                f = en(),
                p = n.observable.subscribe(h);
              function h() {
                if (u && c && n.isGranted()) {
                  if ((p.unsubscribe(), c.trackViewsManually)) {
                    if (!a) return;
                    f.remove(a.callback), (t = a.options);
                  }
                  var t,
                    e = o(c, s, t);
                  f.drain(e);
                }
              }
              function m(t) {
                var e,
                  r,
                  i,
                  o,
                  a,
                  l,
                  f,
                  p,
                  m,
                  v = ew();
                if (
                  (v &&
                    (t = W({}, (e = t), {
                      applicationId: "00000000-aaaa-0000-aaaa-000000000000",
                      clientToken: "empty",
                      sessionSampleRate: 100,
                      defaultPrivacyLevel:
                        null != (r = e.defaultPrivacyLevel)
                          ? r
                          : null == (i = e_())
                            ? void 0
                            : i.getPrivacyLevel(),
                    })),
                  (u = t),
                  (f = {
                    session_sample_rate: (a = o = t).sessionSampleRate,
                    telemetry_sample_rate: a.telemetrySampleRate,
                    telemetry_configuration_sample_rate:
                      a.telemetryConfigurationSampleRate,
                    telemetry_usage_sample_rate: a.telemetryUsageSampleRate,
                    use_before_send: !!a.beforeSend,
                    use_cross_site_session_cookie: a.useCrossSiteSessionCookie,
                    use_partitioned_cross_site_session_cookie:
                      a.usePartitionedCrossSiteSessionCookie,
                    use_secure_session_cookie: a.useSecureSessionCookie,
                    use_proxy: !!a.proxy,
                    silent_multiple_init: a.silentMultipleInit,
                    track_session_across_subdomains:
                      a.trackSessionAcrossSubdomains,
                    session_persistence: a.sessionPersistence,
                    allow_fallback_to_local_storage:
                      !!a.allowFallbackToLocalStorage,
                    store_contexts_across_pages: !!a.storeContextsAcrossPages,
                    allow_untrusted_events: !!a.allowUntrustedEvents,
                    tracking_consent: a.trackingConsent,
                  }),
                  (m = W(
                    {
                      session_replay_sample_rate: o.sessionReplaySampleRate,
                      start_session_replay_recording_manually:
                        o.startSessionReplayRecordingManually,
                      trace_sample_rate: o.traceSampleRate,
                      trace_context_injection: o.traceContextInjection,
                      action_name_attribute: o.actionNameAttribute,
                      use_allowed_tracing_urls:
                        Array.isArray(o.allowedTracingUrls) &&
                        o.allowedTracingUrls.length > 0,
                      selected_tracing_propagators:
                        ((p = new Set()),
                        Array.isArray(o.allowedTracingUrls) &&
                          o.allowedTracingUrls.length > 0 &&
                          o.allowedTracingUrls.forEach(function (t) {
                            e4(t)
                              ? no.forEach(function (t) {
                                  return p.add(t);
                                })
                              : "object" === td(t) &&
                                Array.isArray(t.propagatorTypes) &&
                                t.propagatorTypes.forEach(function (t) {
                                  return p.add(t);
                                });
                          }),
                        F(p)),
                      default_privacy_level: o.defaultPrivacyLevel,
                      enable_privacy_for_action_name:
                        o.enablePrivacyForActionName,
                      use_excluded_activity_urls:
                        Array.isArray(o.excludedActivityUrls) &&
                        o.excludedActivityUrls.length > 0,
                      use_worker_url: !!o.workerUrl,
                      compress_intake_requests: o.compressIntakeRequests,
                      track_views_manually: o.trackViewsManually,
                      track_user_interactions: o.trackUserInteractions,
                      track_resources: o.trackResources,
                      track_long_task: o.trackLongTasks,
                      plugins:
                        null == (l = o.plugins)
                          ? void 0
                          : l.map(function (t) {
                              var e;
                              return W(
                                { name: t.name },
                                null == (e = t.getConfigurationTelemetry)
                                  ? void 0
                                  : e.call(t),
                              );
                            }),
                    },
                    f,
                  )),
                  es({ type: er.configuration, configuration: m }),
                  c)
                )
                  return void ef("DD_RUM", t);
                var g = (function (t) {
                  if (!t.applicationId)
                    return void O.error(
                      "Application ID is not configured, no RUM data will be collected.",
                    );
                  if (
                    e6(t.sessionReplaySampleRate, "Session Replay") &&
                    e6(t.traceSampleRate, "Trace")
                  ) {
                    if (
                      void 0 !== t.excludedActivityUrls &&
                      !Array.isArray(t.excludedActivityUrls)
                    )
                      return void O.error(
                        "Excluded Activity Urls should be an array",
                      );
                    var e,
                      n,
                      r,
                      i = (function (t) {
                        if (void 0 === t.allowedTracingUrls) return [];
                        if (!Array.isArray(t.allowedTracingUrls))
                          return void O.error(
                            "Allowed Tracing URLs should be an array",
                          );
                        if (
                          0 !== t.allowedTracingUrls.length &&
                          void 0 === t.service
                        )
                          return void O.error(
                            "Service needs to be configured when tracing is enabled",
                          );
                        var e = [];
                        return (
                          t.allowedTracingUrls.forEach(function (t) {
                            if (e4(t))
                              e.push({ match: t, propagatorTypes: no });
                            else
                              "object" === td(t) &&
                              e4(t.match) &&
                              Array.isArray(t.propagatorTypes)
                                ? e.push(t)
                                : O.warn(
                                    "Allowed Tracing Urls parameters should be a string, RegExp, function, or an object. Ignoring parameter",
                                    t,
                                  );
                          }),
                          e
                        );
                      })(t);
                    if (i) {
                      var o = (function (t) {
                        var e, n, r, i, o, a, s, u, c, l, d, f, p, h, m, v;
                        if (!t || !t.clientToken)
                          return void O.error(
                            "Client Token is not configured, we will not send any data.",
                          );
                        if (
                          (!(a = t.site) ||
                            "string" != typeof a ||
                            /(datadog|ddog|datad0g|dd0g)/.test(a) ||
                            (O.error(
                              "Site should be a valid Datadog site. "
                                .concat(M, " ")
                                .concat(N, "/getting_started/site/."),
                            ),
                            0)) &&
                          e6(t.sessionSampleRate, "Session") &&
                          e6(t.telemetrySampleRate, "Telemetry") &&
                          e6(
                            t.telemetryConfigurationSampleRate,
                            "Telemetry Configuration",
                          ) &&
                          e6(t.telemetryUsageSampleRate, "Telemetry Usage") &&
                          e5(t.version, "Version") &&
                          e5(t.env, "Env") &&
                          e5(t.service, "Service")
                        ) {
                          if (
                            void 0 !== t.trackingConsent &&
                            !tu(tw, t.trackingConsent)
                          )
                            return void O.error(
                              'Tracking Consent should be either "granted" or "not-granted"',
                            );
                          return W(
                            {
                              beforeSend:
                                t.beforeSend &&
                                P(t.beforeSend, "beforeSend threw an error:"),
                              sessionStoreStrategyType: (function (t) {
                                switch (t.sessionPersistence) {
                                  case eL.COOKIE:
                                    return eG(t);
                                  case eL.LOCAL_STORAGE:
                                    return e$();
                                  case void 0:
                                    var e = eG(t);
                                    return (
                                      !e &&
                                        t.allowFallbackToLocalStorage &&
                                        (e = e$()),
                                      e
                                    );
                                  default:
                                    O.error(
                                      "Invalid session persistence '".concat(
                                        String(t.sessionPersistence),
                                        "'",
                                      ),
                                    );
                                }
                              })(t),
                              sessionSampleRate:
                                null != (e = t.sessionSampleRate) ? e : 100,
                              telemetrySampleRate:
                                null != (n = t.telemetrySampleRate) ? n : 20,
                              telemetryConfigurationSampleRate:
                                null != (r = t.telemetryConfigurationSampleRate)
                                  ? r
                                  : 5,
                              telemetryUsageSampleRate:
                                null != (i = t.telemetryUsageSampleRate)
                                  ? i
                                  : 5,
                              service: t.service || void 0,
                              silentMultipleInit: !!t.silentMultipleInit,
                              allowUntrustedEvents: !!t.allowUntrustedEvents,
                              trackingConsent:
                                null != (o = t.trackingConsent)
                                  ? o
                                  : tw.GRANTED,
                              storeContextsAcrossPages:
                                !!t.storeContextsAcrossPages,
                              batchBytesLimit: 16384,
                              eventRateLimiterThreshold: 3e3,
                              maxTelemetryEventsPerPage: 15,
                              flushTimeout: 3e4,
                              batchMessagesLimit: 50,
                              messageBytesLimit: 262144,
                            },
                            ((s = t.site || tK),
                            (u = t.env),
                            (c = t.service),
                            (l = t.version),
                            (d = t.datacenter),
                            (f = []),
                            u && f.push(e1("env", u)),
                            c && f.push(e1("service", c)),
                            l && f.push(e1("version", l)),
                            d && f.push(e1("datacenter", d)),
                            (p = f),
                            (h = {
                              logsEndpointBuilder: e0((m = t), "logs", (v = p)),
                              rumEndpointBuilder: e0(m, "rum", v),
                              sessionReplayEndpointBuilder: e0(m, "replay", v),
                            }),
                            W(
                              {
                                replica: (function (t, e) {
                                  if (t.replica) {
                                    var n = W({}, t, {
                                        site: tK,
                                        clientToken: t.replica.clientToken,
                                      }),
                                      r = {
                                        logsEndpointBuilder: e0(n, "logs", e),
                                        rumEndpointBuilder: e0(n, "rum", e),
                                      };
                                    return W(
                                      {
                                        applicationId: t.replica.applicationId,
                                      },
                                      r,
                                    );
                                  }
                                })(t, p),
                                site: s,
                              },
                              h,
                            )),
                          );
                        }
                      })(t);
                      if (o) {
                        var a = null != (e = t.sessionReplaySampleRate) ? e : 0;
                        return W(
                          {
                            applicationId: t.applicationId,
                            version: t.version || void 0,
                            actionNameAttribute: t.actionNameAttribute,
                            sessionReplaySampleRate: a,
                            startSessionReplayRecordingManually:
                              void 0 !== t.startSessionReplayRecordingManually
                                ? !!t.startSessionReplayRecordingManually
                                : 0 === a,
                            traceSampleRate:
                              null != (n = t.traceSampleRate) ? n : 100,
                            rulePsr: tZ(t.traceSampleRate)
                              ? t.traceSampleRate / 100
                              : void 0,
                            allowedTracingUrls: i,
                            excludedActivityUrls:
                              null != (r = t.excludedActivityUrls) ? r : [],
                            workerUrl: t.workerUrl,
                            compressIntakeRequests: !!t.compressIntakeRequests,
                            trackUserInteractions: !!t.trackUserInteractions,
                            trackViewsManually: !!t.trackViewsManually,
                            trackResources: !!t.trackResources,
                            trackLongTasks: !!t.trackLongTasks,
                            subdomain: t.subdomain,
                            defaultPrivacyLevel: tu(e2, t.defaultPrivacyLevel)
                              ? t.defaultPrivacyLevel
                              : e2.MASK,
                            enablePrivacyForActionName:
                              !!t.enablePrivacyForActionName,
                            customerDataTelemetrySampleRate: 1,
                            traceContextInjection: tu(
                              e3,
                              t.traceContextInjection,
                            )
                              ? t.traceContextInjection
                              : e3.ALL,
                            plugins: t.plugins || [],
                          },
                          o,
                        );
                      }
                    }
                  }
                })(t);
                if (g) {
                  if (!v && !g.sessionStoreStrategyType)
                    return void O.warn(
                      "No storage available for session. We will not send any data.",
                    );
                  if (
                    g.compressIntakeRequests &&
                    !v &&
                    d &&
                    !(s = d(g, "Datadog RUM", ti))
                  )
                    return;
                  (c = g),
                    eT().subscribe(ti),
                    n.tryToInit(g.trackingConsent),
                    h();
                }
              }
              var v = function (t) {
                f.add(function (e) {
                  return e.addDurationVital(t);
                });
              };
              return {
                init: function (t, e) {
                  var n, r, o, a;
                  if (!t) return void O.error("Missing configuration");
                  if (
                    (Array.isArray((n = t.enableExperimentalFeatures)) &&
                      n
                        .filter(function (t) {
                          return tu(i, t);
                        })
                        .forEach(function (t) {
                          t$.add(t);
                        }),
                    (u = t),
                    !(l && eO()))
                  )
                    if (
                      (!(function (t, e, n) {
                        if (t)
                          for (var r = 0; r < t.length; r++) {
                            var i = t[r][e];
                            i && i(n);
                          }
                      })(t.plugins, "onInit", {
                        initConfiguration: t,
                        publicApi: e,
                      }),
                      t.remoteConfigurationId && tY(i.REMOTE_CONFIGURATION))
                    ) {
                      (r = t),
                        (o = function (e) {
                          m(W({}, t, e));
                        }),
                        tS(r, (a = new XMLHttpRequest()), "load", function () {
                          200 === a.status
                            ? o(JSON.parse(a.responseText))
                            : na();
                        }),
                        tS(r, a, "error", function () {
                          na();
                        }),
                        a.open(
                          "GET",
                          ""
                            .concat(
                              "https://d3uc069fcn7uxw.cloudfront.net/configuration",
                              "/",
                            )
                            .concat(
                              encodeURIComponent(r.remoteConfigurationId),
                              ".json",
                            ),
                        ),
                        a.send();
                    } else m(t);
                },
                get initConfiguration() {
                  return u;
                },
                getInternalContext: ti,
                stopSession: ti,
                addTiming: function (t, e) {
                  void 0 === e && (e = t5()),
                    f.add(function (n) {
                      return n.addTiming(t, e);
                    });
                },
                startView: function (t, e) {
                  void 0 === e && (e = t4());
                  var n = function (n) {
                    n.startView(t, e);
                  };
                  f.add(n), a || ((a = { options: t, callback: n }), h());
                },
                setViewName: function (t) {
                  f.add(function (e) {
                    return e.setViewName(t);
                  });
                },
                setViewContext: function (t) {
                  f.add(function (e) {
                    return e.setViewContext(t);
                  });
                },
                setViewContextProperty: function (t, e) {
                  f.add(function (n) {
                    return n.setViewContextProperty(t, e);
                  });
                },
                addAction: function (t, n) {
                  void 0 === n && (n = e()),
                    f.add(function (e) {
                      return e.addAction(t, n);
                    });
                },
                addError: function (t, n) {
                  void 0 === n && (n = e()),
                    f.add(function (e) {
                      return e.addError(t, n);
                    });
                },
                addFeatureFlagEvaluation: function (t, e) {
                  f.add(function (n) {
                    return n.addFeatureFlagEvaluation(t, e);
                  });
                },
                startDurationVital: function (t, e) {
                  return eg(r, t, e);
                },
                stopDurationVital: function (t, e) {
                  ey(v, r, t, e);
                },
                addDurationVital: v,
              };
            })(n, f, l, d, function (r, i, o) {
              r.storeContextsAcrossPages &&
                (tE(r, u, "rum", 2), tE(r, c, "rum", 1)),
                s.setCompressionStatus(i ? 1 : 2);
              var a,
                h,
                m = t(
                  r,
                  e,
                  s,
                  f,
                  o,
                  i && n.createDeflateEncoder
                    ? function (t) {
                        return n.createDeflateEncoder(r, i, t);
                      }
                    : tC,
                  l,
                  d,
                );
              return (
                e.onRumStart(m.lifeCycle, r, m.session, m.viewHistory, i),
                (a = p),
                (h = m),
                (p = W(
                  {
                    init: function (t) {
                      ef("DD_RUM", t);
                    },
                    initConfiguration: a.initConfiguration,
                  },
                  h,
                )),
                m
              );
            }),
            h = V(function (t) {
              var e = "object" == typeof t ? t : { name: t };
              e.context &&
                s.getOrCreateTracker(3).updateCustomerData(e.context),
                p.startView(e),
                el({ feature: "start-view" });
            }),
            m =
              (Object.defineProperty(
                (a = W(
                  {
                    version: "5.35.1",
                    onReady: function (t) {
                      t();
                    },
                  },
                  {
                    init: V(function (t) {
                      p.init(t, m);
                    }),
                    setTrackingConsent: V(function (t) {
                      l.update(t),
                        el({
                          feature: "set-tracking-consent",
                          tracking_consent: t,
                        });
                    }),
                    setViewName: V(function (t) {
                      p.setViewName(t);
                    }),
                    setViewContext: V(function (t) {
                      p.setViewContext(t);
                    }),
                    setViewContextProperty: V(function (t, e) {
                      p.setViewContextProperty(t, e);
                    }),
                    setGlobalContext: V(function (t) {
                      u.setContext(t), el({ feature: "set-global-context" });
                    }),
                    getGlobalContext: V(function () {
                      return u.getContext();
                    }),
                    setGlobalContextProperty: V(function (t, e) {
                      u.setContextProperty(t, e),
                        el({ feature: "set-global-context" });
                    }),
                    removeGlobalContextProperty: V(function (t) {
                      return u.removeContextProperty(t);
                    }),
                    clearGlobalContext: V(function () {
                      return u.clearContext();
                    }),
                    getInternalContext: V(function (t) {
                      return p.getInternalContext(t);
                    }),
                    getInitConfiguration: V(function () {
                      return tp(p.initConfiguration);
                    }),
                    addAction: function (t, e) {
                      var n = tj();
                      q(function () {
                        p.addAction({
                          name: tm(t),
                          context: tm(e),
                          startClocks: t4(),
                          type: "custom",
                          handlingStack: n,
                        }),
                          el({ feature: "add-action" });
                      });
                    },
                    addError: function (t, e) {
                      var n = tj();
                      q(function () {
                        p.addError({
                          error: t,
                          handlingStack: n,
                          context: tm(e),
                          startClocks: t4(),
                        }),
                          el({ feature: "add-error" });
                      });
                    },
                    addTiming: V(function (t, e) {
                      p.addTiming(tm(t), e);
                    }),
                    setUser: V(function (t) {
                      var e;
                      (e = "object" === td(t)) ||
                        O.error("Unsupported user:", t),
                        e && c.setContext(ed(t)),
                        el({ feature: "set-user" });
                    }),
                    getUser: V(function () {
                      return c.getContext();
                    }),
                    setUserProperty: V(function (t, e) {
                      var n,
                        r = ed((((n = {})[t] = e), n))[t];
                      c.setContextProperty(t, r), el({ feature: "set-user" });
                    }),
                    removeUserProperty: V(function (t) {
                      return c.removeContextProperty(t);
                    }),
                    clearUser: V(function () {
                      return c.clearContext();
                    }),
                    startView: h,
                    stopSession: V(function () {
                      p.stopSession(), el({ feature: "stop-session" });
                    }),
                    addFeatureFlagEvaluation: V(function (t, e) {
                      p.addFeatureFlagEvaluation(tm(t), tm(e)),
                        el({ feature: "add-feature-flag-evaluation" });
                    }),
                    getSessionReplayLink: V(function () {
                      return e.getSessionReplayLink();
                    }),
                    startSessionReplayRecording: V(function (t) {
                      e.start(t),
                        el({
                          feature: "start-session-replay-recording",
                          force: t && t.force,
                        });
                    }),
                    stopSessionReplayRecording: V(function () {
                      return e.stop();
                    }),
                    addDurationVital: V(function (t, e) {
                      var n;
                      el({ feature: "add-duration-vital" }),
                        p.addDurationVital({
                          name: tm(t),
                          type: "duration",
                          startClocks: {
                            relative: (n = e.startTime) - t9(),
                            timeStamp: n,
                          },
                          duration: e.duration,
                          context: tm(e && e.context),
                          description: tm(e && e.description),
                        });
                    }),
                    startDurationVital: V(function (t, e) {
                      return (
                        el({ feature: "start-duration-vital" }),
                        p.startDurationVital(tm(t), {
                          context: tm(e && e.context),
                          description: tm(e && e.description),
                        })
                      );
                    }),
                    stopDurationVital: V(function (t, e) {
                      el({ feature: "stop-duration-vital" }),
                        p.stopDurationVital("string" == typeof t ? tm(t) : t, {
                          context: tm(e && e.context),
                          description: tm(e && e.description),
                        });
                    }),
                  },
                )),
                "_setDebug",
                {
                  get: function () {
                    return j;
                  },
                  enumerable: !1,
                },
              ),
              a);
          return m;
        })(
          function (t, e, n, o, a, s, u, c) {
            var l,
              d,
              f,
              v,
              g,
              y,
              _,
              w,
              E,
              C,
              R,
              A,
              N,
              D,
              M,
              P,
              L,
              U,
              j,
              z,
              H,
              Y,
              K = [],
              J = new nv();
            J.subscribe(13, function (t) {
              return t7("rum", t);
            });
            var X = (function (t) {
              var e,
                n,
                i,
                o,
                a,
                s,
                u,
                c,
                l,
                d =
                  ((e = "browser-rum-sdk"),
                  (n = t),
                  (a = new ty()),
                  (s = new Set()),
                  (u = !B(eo, n.site) && tX(n.telemetrySampleRate)),
                  (c =
                    (((i = {})[er.log] = u),
                    (i[er.configuration] =
                      u && tX(n.telemetryConfigurationSampleRate)),
                    (i[er.usage] = u && tX(n.telemetryUsageSampleRate)),
                    i)),
                  (l = {
                    is_local_file: "file:" === window.location.protocol,
                    is_worker: "WorkerGlobalScope" in self,
                  }),
                  (es = function (t) {
                    var r = to(t);
                    if (
                      c[t.type] &&
                      s.size < n.maxTelemetryEventsPerPage &&
                      !s.has(r)
                    ) {
                      var i,
                        u,
                        d,
                        f =
                          ((i = e),
                          (u = t),
                          (d = l),
                          th(
                            {
                              type: "telemetry",
                              date: t5(),
                              service: i,
                              version: "5.35.1",
                              source: "browser",
                              _dd: { format_version: 2 },
                              telemetry: th(u, {
                                runtime_env: d,
                                connectivity: et(),
                                sdk_setup: "npm",
                              }),
                              experimental_features: F(t$),
                            },
                            void 0 !== o ? o() : {},
                          ));
                      a.notify(f), t7("telemetry", f), s.add(r);
                    }
                  }),
                  (r = ec),
                  {
                    setContextProvider: function (t) {
                      o = t;
                    },
                    observable: a,
                    enabled: u,
                  });
              if (ew()) {
                var f = e_();
                d.observable.subscribe(function (t) {
                  return f.send("internal_telemetry", t);
                });
              }
              return d;
            })(t);
            X.setContextProvider(function () {
              var e, n;
              return {
                application: { id: t.applicationId },
                session: {
                  id: null == (e = tf.findTrackedSession()) ? void 0 : e.id,
                },
                view: { id: null == (n = tZ.findView()) ? void 0 : n.id },
                action: { id: en.findActionId() },
              };
            });
            var Q = function (t) {
                J.notify(14, { error: t }),
                  eu("Error reported to customer", {
                    "error.message": t.message,
                  });
              },
              ta =
                ((tv = n.getOrCreateTracker(0)),
                (tg = ny({ expireDelay: eM })),
                J.subscribe(1, function (t) {
                  var e = t.startClocks;
                  tg.add({}, e.relative), tv.resetCustomerData();
                }),
                J.subscribe(6, function (t) {
                  var e = t.endClocks;
                  tg.closeActive(e.relative);
                }),
                {
                  findFeatureFlagEvaluations: function (t) {
                    return tg.find(t);
                  },
                  addFeatureFlagEvaluation: function (t, e) {
                    var n = tg.find();
                    n && ((n[t] = e), tv.updateCustomerData(n));
                  },
                  stop: function () {
                    return tv.stop();
                  },
                }),
              tu = new ty(function (e) {
                var n = tk(
                    t,
                    window,
                    ["visibilitychange", "freeze"],
                    function (t) {
                      "visibilitychange" === t.type &&
                      "hidden" === document.visibilityState
                        ? e.notify({ reason: ns.HIDDEN })
                        : "freeze" === t.type &&
                          e.notify({ reason: ns.FROZEN });
                    },
                    { capture: !0 },
                  ).stop,
                  r = tS(t, window, "beforeunload", function () {
                    e.notify({ reason: ns.UNLOADING });
                  }).stop;
                return function () {
                  n(), r();
                };
              }),
              tl = tu.subscribe(function (t) {
                J.notify(11, t);
              });
            K.push(function () {
              return tl.unsubscribe();
            });
            var tf = ew()
              ? ((tw = {
                  id: "00000000-aaaa-0000-aaaa-000000000000",
                  sessionReplay: +!!eb("records"),
                }),
                {
                  findTrackedSession: function () {
                    return tw;
                  },
                  expire: ti,
                  expireObservable: new ty(),
                  setForcedReplay: ti,
                })
              : ((tx = (function (t, e, n, r) {
                  var o,
                    a,
                    s,
                    u,
                    c,
                    l,
                    d,
                    f = new ty(),
                    p = new ty(),
                    h = (function (t, e, n) {
                      var r,
                        o = new ty(),
                        a = new ty(),
                        s = new ty(),
                        u =
                          t.type === eL.COOKIE
                            ? (function (t) {
                                var e,
                                  n = {
                                    isLockEnabled: 1 === eN(),
                                    persistSession:
                                      ((e = t),
                                      function (t) {
                                        eI(eD, eB(t), eP, e);
                                      }),
                                    retrieveSession: eH,
                                    expireSession: function (e) {
                                      var n;
                                      return (
                                        (n = t),
                                        void eI(
                                          eD,
                                          eB(ej(e)),
                                          tY(i.ANONYMOUS_USER_TRACKING)
                                            ? t0
                                            : eM,
                                          n,
                                        )
                                      );
                                    },
                                  };
                                if (!eA(eD)) {
                                  var r = eA("_dd"),
                                    o = eA("_dd_r"),
                                    a = eA("_dd_l"),
                                    s = {};
                                  r && (s.id = r),
                                    a && /^[01]$/.test(a) && (s.logs = a),
                                    o && /^[012]$/.test(o) && (s.rum = o),
                                    tc(s) || (ez(s), n.persistSession(s));
                                }
                                return n;
                              })(t.cookieOptions)
                            : {
                                isLockEnabled: !1,
                                persistSession: eY,
                                retrieveSession: eW,
                                expireSession: eK,
                              },
                        c = u.expireSession,
                        l = te(function () {
                          eX(
                            {
                              process: function (t) {
                                return eq(t) ? ej(t) : void 0;
                              },
                              after: h,
                            },
                            u,
                          );
                        }, 1e3);
                      m();
                      var d = tr(function () {
                          eX(
                            {
                              process: function (t) {
                                if (!tc(t)) {
                                  var r = h(t);
                                  return (
                                    (function (t) {
                                      if (!tc(t)) {
                                        var r = n(t.rum),
                                          i = r.trackingType,
                                          o = r.isTracked;
                                        (t[e] = i),
                                          delete t.isExpired,
                                          o &&
                                            !t.id &&
                                            ((t.id = ep()),
                                            (t.created = String(t3())));
                                      }
                                    })(r),
                                    r
                                  );
                                }
                              },
                              after: function (t) {
                                tc(t) || v() || ((r = t), o.notify()), (r = t);
                              },
                            },
                            u,
                          );
                        }, 1e3),
                        f = d.throttled,
                        p = d.cancel;
                      function h(t) {
                        var n;
                        return (
                          eq(t) && (t = ej(t)),
                          v() &&
                            (((n = t), r.id !== n.id || r[e] !== n[e])
                              ? ((r = ej(r)), a.notify())
                              : (s.notify({ previousState: r, newState: t }),
                                (r = t))),
                          t
                        );
                      }
                      function m() {
                        eX(
                          {
                            process: function (t) {
                              if (tc(t)) return ej(t);
                            },
                            after: function (t) {
                              r = t;
                            },
                          },
                          u,
                        );
                      }
                      function v() {
                        return void 0 !== r[e];
                      }
                      return {
                        expandOrRenewSession: f,
                        expandSession: function () {
                          eX(
                            {
                              process: function (t) {
                                return v() ? h(t) : void 0;
                              },
                            },
                            u,
                          );
                        },
                        getSession: function () {
                          return r;
                        },
                        renewObservable: o,
                        expireObservable: a,
                        sessionStateUpdateObservable: s,
                        restartSession: m,
                        expire: function () {
                          p(), c(r), h(ej(r));
                        },
                        stop: function () {
                          tn(l);
                        },
                        updateSessionState: function (t) {
                          eX(
                            {
                              process: function (e) {
                                return W({}, e, t);
                              },
                              after: h,
                            },
                            u,
                          );
                        },
                      };
                    })(t.sessionStoreStrategyType, "rum", n);
                  r5.push(function () {
                    return h.stop();
                  });
                  var m = ny({ expireDelay: eM });
                  function v() {
                    return {
                      id: h.getSession().id,
                      trackingType: h.getSession().rum,
                      isReplayForced: !!h.getSession().forcedReplay,
                      anonymousId: h.getSession().anonymousId,
                    };
                  }
                  return (
                    r5.push(function () {
                      return m.stop();
                    }),
                    h.renewObservable.subscribe(function () {
                      m.add(v(), t6()), f.notify();
                    }),
                    h.expireObservable.subscribe(function () {
                      p.notify(), m.closeActive(t6());
                    }),
                    h.expandOrRenewSession(),
                    m.add(v(), t8().relative),
                    r.observable.subscribe(function () {
                      r.isGranted() ? h.expandOrRenewSession() : h.expire();
                    }),
                    (o = tk(
                      t,
                      window,
                      ["click", "touchstart", "keydown", "scroll"],
                      function () {
                        r.isGranted() && h.expandOrRenewSession();
                      },
                      { capture: !0, passive: !0 },
                    ).stop),
                    r5.push(o),
                    (a = t),
                    (s = function () {
                      return h.expandSession();
                    }),
                    (u = function () {
                      "visible" === document.visibilityState && s();
                    }),
                    (c = tS(a, document, "visibilitychange", u).stop),
                    r5.push(c),
                    (l = te(u, 6e4)),
                    r5.push(function () {
                      tn(l);
                    }),
                    (d = tS(
                      t,
                      window,
                      "resume",
                      function () {
                        return h.restartSession();
                      },
                      { capture: !0 },
                    ).stop),
                    r5.push(d),
                    {
                      findSession: function (t, e) {
                        return m.find(t, e);
                      },
                      renewObservable: f,
                      expireObservable: p,
                      sessionStateUpdateObservable:
                        h.sessionStateUpdateObservable,
                      expire: h.expire,
                      updateSessionState: h.updateSessionState,
                    }
                  );
                })(
                  t,
                  "rum",
                  function (e) {
                    var n, r, i, o;
                    return (
                      (n = t),
                      {
                        trackingType: (i =
                          "0" === (o = r = e) || "1" === o || "2" === o
                            ? r
                            : tX(n.sessionSampleRate)
                              ? tX(n.sessionReplaySampleRate)
                                ? "1"
                                : "2"
                              : "0"),
                        isTracked: r6(i),
                      }
                    );
                  },
                  u,
                )).expireObservable.subscribe(function () {
                  J.notify(9);
                }),
                tx.renewObservable.subscribe(function () {
                  J.notify(10);
                }),
                tx.sessionStateUpdateObservable.subscribe(function (t) {
                  var e = t.previousState,
                    n = t.newState;
                  if (!e.forcedReplay && n.forcedReplay) {
                    var r = tx.findSession();
                    r && (r.isReplayForced = !0);
                  }
                }),
                {
                  findTrackedSession: function (t) {
                    var e = tx.findSession(t);
                    if (e && r6(e.trackingType))
                      return {
                        id: e.id,
                        sessionReplay:
                          "1" === e.trackingType ? 1 : 2 * !!e.isReplayForced,
                        anonymousId: e.anonymousId,
                      };
                  },
                  expire: tx.expire,
                  expireObservable: tx.expireObservable,
                  setForcedReplay: function () {
                    return tx.updateSessionState({ forcedReplay: "1" });
                  },
                });
            if (ew())
              (tE = e_()),
                J.subscribe(13, function (t) {
                  tE.send("rum", t);
                });
            else {
              var tv,
                tg,
                tw,
                tx,
                tE,
                tC,
                tI,
                tR,
                tA,
                tO,
                tN =
                  ((tC = X.observable),
                  (tI = tf.expireObservable),
                  (tR = t.replica),
                  (tA = (function (t, e, n, r, i, o, a) {
                    void 0 === a && (a = r4);
                    var s = c(t, e),
                      u = n && c(t, n);
                    function c(t, e) {
                      var n = e.endpoint,
                        s = e.encoder;
                      return a({
                        encoder: s,
                        request: ii(n, t.batchBytesLimit, r),
                        flushController: (function (t) {
                          var e,
                            n = t.messagesLimit,
                            r = t.bytesLimit,
                            i = t.durationLimit,
                            o = t.pageExitObservable,
                            a = t.sessionExpireObservable,
                            s = o.subscribe(function (t) {
                              return f(t.reason);
                            }),
                            u = a.subscribe(function () {
                              return f("session_expire");
                            }),
                            c = new ty(function () {
                              return function () {
                                s.unsubscribe(), u.unsubscribe();
                              };
                            }),
                            l = 0,
                            d = 0;
                          function f(t) {
                            if (0 !== d) {
                              var e = d,
                                n = l;
                              (d = 0),
                                (l = 0),
                                p(),
                                c.notify({
                                  reason: t,
                                  messagesCount: e,
                                  bytesCount: n,
                                });
                            }
                          }
                          function p() {
                            tt(e), (e = void 0);
                          }
                          return {
                            flushObservable: c,
                            get messagesCount() {
                              return d;
                            },
                            notifyBeforeAddMessage: function (t) {
                              l + t >= r && f("bytes_limit"),
                                (d += 1),
                                (l += t),
                                void 0 === e &&
                                  (e = Z(function () {
                                    f("duration_limit");
                                  }, i));
                            },
                            notifyAfterAddMessage: function (t) {
                              void 0 === t && (t = 0),
                                (l += t),
                                d >= n
                                  ? f("messages_limit")
                                  : l >= r && f("bytes_limit");
                            },
                            notifyAfterRemoveMessage: function (t) {
                              (l -= t), 0 == (d -= 1) && p();
                            },
                          };
                        })({
                          messagesLimit: t.batchMessagesLimit,
                          bytesLimit: t.batchBytesLimit,
                          durationLimit: t.flushTimeout,
                          pageExitObservable: i,
                          sessionExpireObservable: o,
                        }),
                        messageBytesLimit: t.messageBytesLimit,
                      });
                    }
                    return {
                      flushObservable: s.flushController.flushObservable,
                      add: function (t, e) {
                        void 0 === e && (e = !0),
                          s.add(t),
                          u &&
                            e &&
                            u.add(
                              n.transformMessage ? n.transformMessage(t) : t,
                            );
                      },
                      upsert: function (t, e) {
                        s.upsert(t, e),
                          u &&
                            u.upsert(
                              n.transformMessage ? n.transformMessage(t) : t,
                              e,
                            );
                      },
                      stop: function () {
                        s.stop(), u && u.stop();
                      },
                    };
                  })(
                    t,
                    { endpoint: t.rumEndpointBuilder, encoder: s(2) },
                    tR && {
                      endpoint: tR.rumEndpointBuilder,
                      transformMessage: function (t) {
                        return th(t, { application: { id: tR.applicationId } });
                      },
                      encoder: s(3),
                    },
                    Q,
                    tu,
                    tI,
                  )),
                  J.subscribe(13, function (t) {
                    "view" === t.type ? tA.upsert(t, t.view.id) : tA.add(t);
                  }),
                  tC.subscribe(function (e) {
                    return tA.add(e, t.site === tW);
                  }),
                  tA);
              K.push(function () {
                return tN.stop();
              }),
                (tO = tN.flushObservable),
                X.enabled &&
                  tX(t.customerDataTelemetrySampleRate) &&
                  (ip(),
                  ih(),
                  J.subscribe(13, function (t) {
                    (x = !0),
                      il(
                        k.globalContextBytes,
                        n.getOrCreateTracker(2).getBytesCount(),
                      ),
                      il(
                        k.userContextBytes,
                        n.getOrCreateTracker(1).getBytesCount(),
                      ),
                      il(
                        k.featureFlagBytes,
                        B(["view", "error"], t.type)
                          ? n.getOrCreateTracker(0).getBytesCount()
                          : 0,
                      );
                  }),
                  tO.subscribe(function (t) {
                    var e = t.bytesCount,
                      n = t.messagesCount;
                    x &&
                      ((S.batchCount += 1),
                      il(S.batchBytesCount, e),
                      il(S.batchMessagesCount, n),
                      id(S.globalContextBytes, k.globalContextBytes),
                      id(S.userContextBytes, k.userContextBytes),
                      id(S.featureFlagBytes, k.featureFlagBytes),
                      ih());
                  }),
                  te(iu, 1e4));
            }
            var tD =
                ((eR = nu()),
                new ty(function (t) {
                  if (eR) {
                    var e = new eR(
                      V(function () {
                        return t.notify();
                      }),
                    );
                    return (
                      e.observe(document, {
                        attributes: !0,
                        characterData: !0,
                        childList: !0,
                        subtree: !0,
                      }),
                      function () {
                        return e.disconnect();
                      }
                    );
                  }
                })),
              tM =
                ((eV = ts((eU = location))),
                new ty(function (e) {
                  var n,
                    r,
                    i,
                    o,
                    a,
                    s = ((n = t),
                    (r = c),
                    (i = eS(is("pushState"), "pushState", function (t) {
                      (0, t.onPostCall)(r);
                    }).stop),
                    (o = eS(is("replaceState"), "replaceState", function (t) {
                      (0, t.onPostCall)(r);
                    }).stop),
                    (a = tS(n, window, "popstate", r).stop),
                    {
                      stop: function () {
                        i(), o(), a();
                      },
                    }).stop,
                    u = tS(t, window, "hashchange", c).stop;
                  function c() {
                    if (eV.href !== eU.href) {
                      var t = ts(eU);
                      e.notify({ newLocation: t, oldLocation: eV }), (eV = t);
                    }
                  }
                  return function () {
                    s(), u();
                  };
                })),
              tP = (function (t, e) {
                void 0 === e && (e = 500);
                var n,
                  r = ny({ expireDelay: eM, maxEntries: 4e3 });
                o(im(), t6());
                var i = tk(
                  t,
                  window,
                  [
                    "pageshow",
                    "focus",
                    "blur",
                    "visibilitychange",
                    "resume",
                    "freeze",
                    "pagehide",
                  ],
                  function (t) {
                    var e;
                    o(
                      "freeze" === (e = t).type
                        ? "frozen"
                        : "pagehide" === e.type
                          ? e.persisted
                            ? "frozen"
                            : "terminated"
                          : im(),
                      t.timeStamp,
                    );
                  },
                  { capture: !0 },
                ).stop;
                function o(t, e) {
                  void 0 === e && (e = t6()),
                    t !== n &&
                      ((n = t),
                      r.closeActive(e),
                      r.add({ state: n, startTime: e }, e));
                }
                var a = {
                  findAll: function (t, n) {
                    var i = r.findAll(t, n);
                    if (0 !== i.length) {
                      for (
                        var o = [],
                          a = Math.max(0, i.length - e),
                          s = i.length - 1;
                        s >= a;
                        s--
                      ) {
                        var u = i[s],
                          c = u.startTime - t;
                        o.push({ state: u.state, start: t2(c) });
                      }
                      return o;
                    }
                  },
                  wasInPageStateAt: function (t, e) {
                    return a.wasInPageStateDuringPeriod(t, e, 0);
                  },
                  wasInPageStateDuringPeriod: function (t, e, n) {
                    return r.findAll(e, n).some(function (e) {
                      return e.state === t;
                    });
                  },
                  addPageState: o,
                  stop: function () {
                    i(), r.stop();
                  },
                };
                return a;
              })(t),
              tL =
                ((eF = new ty()),
                (eG = eS(window, "open", function () {
                  return eF.notify();
                }).stop),
                { observable: eF, stop: eG }),
              tz = tL.observable,
              tK = tL.stop;
            K.push(tK);
            var tJ = (function (t, e, n, r, o, a, s, u, c, l) {
                var d,
                  f,
                  h,
                  m,
                  v,
                  g,
                  y,
                  _,
                  b,
                  w,
                  S,
                  k,
                  x,
                  E,
                  C,
                  T,
                  I,
                  R,
                  A =
                    ((f = ny({ expireDelay: eM })),
                    t.subscribe(1, function (t) {
                      var e;
                      f.add(
                        {
                          service: (e = t).service,
                          version: e.version,
                          context: e.context,
                          id: e.id,
                          name: e.name,
                          startClocks: e.startClocks,
                        },
                        t.startClocks.relative,
                      );
                    }),
                    t.subscribe(6, function (t) {
                      var e = t.endClocks;
                      f.closeActive(e.relative);
                    }),
                    t.subscribe(3, function (t) {
                      var e = f.find(t.startClocks.relative);
                      e && t.name && (e.name = t.name),
                        e && t.context && (e.context = t.context);
                    }),
                    t.subscribe(10, function () {
                      f.reset();
                    }),
                    {
                      findView: function (t) {
                        return f.find(t);
                      },
                      stop: function () {
                        f.stop();
                      },
                    }),
                  N = (function (t, e, n) {
                    var r,
                      i = ny({ expireDelay: eM });
                    t.subscribe(1, function (t) {
                      var e = t.startClocks,
                        o = n.href;
                      i.add(
                        a({ url: o, referrer: r || document.referrer }),
                        e.relative,
                      ),
                        (r = o);
                    }),
                      t.subscribe(6, function (t) {
                        var e = t.endClocks;
                        i.closeActive(e.relative);
                      });
                    var o = e.subscribe(function (t) {
                      var e = t.newLocation,
                        n = i.find();
                      if (n) {
                        var r = t6();
                        i.closeActive(r),
                          i.add(a({ url: e.href, referrer: n.referrer }), r);
                      }
                    });
                    function a(t) {
                      return { url: t.url, referrer: t.referrer };
                    }
                    return {
                      findUrl: function (t) {
                        return i.find(t);
                      },
                      stop: function () {
                        o.unsubscribe(), i.stop();
                      },
                    };
                  })(t, a, n),
                  D =
                    (t.subscribe(0, function (e) {
                      return t.notify(12, rC(e, o));
                    }),
                    (m = { findActionId: ti }),
                    (v = ti),
                    e.trackUserInteractions &&
                      ((m = (h = (function (t, e, n, r) {
                        var i,
                          o,
                          a,
                          s,
                          u,
                          c,
                          l,
                          d,
                          f = ny({ expireDelay: rE }),
                          p = new ty();
                        t.subscribe(10, function () {
                          f.reset();
                        }),
                          t.subscribe(5, v);
                        var h = ((s = (i = {
                          onPointerDown: function (i) {
                            return (function (t, e, n, r, i) {
                              var o = t.enablePrivacyForActionName
                                ? n3(r.target, t.defaultPrivacyLevel)
                                : nZ.ALLOW;
                              if (o !== nZ.HIDDEN) {
                                var a,
                                  s = (function (t, e, n) {
                                    var r,
                                      i,
                                      o,
                                      a,
                                      s = t.target.getBoundingClientRect(),
                                      u = rp(t.target, n.actionNameAttribute);
                                    u && rx(t.timeStamp, u);
                                    var c =
                                      ((r = t.target),
                                      (i = n.enablePrivacyForActionName),
                                      (o = n.actionNameAttribute),
                                      (a = re(r, rt) || (o && re(r, o)))
                                        ? {
                                            name: a,
                                            nameSource: "custom_attribute",
                                          }
                                        : e === nZ.MASK
                                          ? {
                                              name: "Masked Element",
                                              nameSource: "mask_placeholder",
                                            }
                                          : ri(r, o, rn, i) ||
                                            ri(r, o, rr, i) || {
                                              name: "",
                                              nameSource: "blank",
                                            });
                                    return {
                                      type: "click",
                                      target: {
                                        width: Math.round(s.width),
                                        height: Math.round(s.height),
                                        selector: u,
                                      },
                                      position: {
                                        x: Math.round(t.clientX - s.left),
                                        y: Math.round(t.clientY - s.top),
                                      },
                                      name: c.name,
                                      nameSource: c.nameSource,
                                    };
                                  })(r, o, t),
                                  u = !1;
                                return (
                                  (a = function (t) {
                                    u = t.hadActivity;
                                  }),
                                  nq(nz(e, n, i, t), a, 100),
                                  {
                                    clickActionBase: s,
                                    hadActivityOnPointerDown: function () {
                                      return u;
                                    },
                                  }
                                );
                              }
                            })(r, t, e, i, n);
                          },
                          onPointerUp: function (i, o, a) {
                            !(function (t, e, n, r, i, o, a, s, u, c, l) {
                              var d,
                                f,
                                p = (function t(e, n, r, i, o) {
                                  var a,
                                    s = ep(),
                                    u = t4(),
                                    c = n.add(s, u.relative),
                                    l = nU({
                                      lifeCycle: e,
                                      isChildEvent: function (t) {
                                        return (
                                          void 0 !== t.action &&
                                          (Array.isArray(t.action.id)
                                            ? B(t.action.id, s)
                                            : t.action.id === s)
                                        );
                                      },
                                    }),
                                    d = 0,
                                    f = [],
                                    p = new ty();
                                  function h(t) {
                                    0 === d &&
                                      (((d = 1), (a = t))
                                        ? c.close(a - t9())
                                        : c.remove(),
                                      l.stop(),
                                      p.notify());
                                  }
                                  return {
                                    event: o,
                                    stop: h,
                                    stopObservable: p,
                                    get hasError() {
                                      return l.eventCounts.errorCount > 0;
                                    },
                                    get hasPageActivity() {
                                      return void 0 !== a;
                                    },
                                    getUserActivity: r,
                                    addFrustration: function (t) {
                                      f.push(t);
                                    },
                                    startClocks: u,
                                    isStopped: function () {
                                      return 1 === d || 2 === d;
                                    },
                                    clone: function () {
                                      return t(e, n, r, i, o);
                                    },
                                    validate: function (t) {
                                      if ((h(), 1 === d)) {
                                        var n,
                                          r = l.eventCounts,
                                          c = r.resourceCount,
                                          p = r.errorCount,
                                          m = r.longTaskCount,
                                          v = W(
                                            {
                                              type: "click",
                                              duration:
                                                a && ((n = u.timeStamp), a - n),
                                              startClocks: u,
                                              id: s,
                                              frustrationTypes: f,
                                              counts: {
                                                resourceCount: c,
                                                errorCount: p,
                                                longTaskCount: m,
                                              },
                                              events: null != t ? t : [o],
                                              event: o,
                                            },
                                            i,
                                          );
                                        e.notify(0, v), (d = 2);
                                      }
                                    },
                                    discard: function () {
                                      h(), (d = 2);
                                    },
                                  };
                                })(e, i, c, s, u);
                              a(p);
                              var h =
                                null == (f = null == s ? void 0 : s.target)
                                  ? void 0
                                  : f.selector;
                              h && rx(u.timeStamp, h);
                              var m = ((d = function (t) {
                                  t.hadActivity &&
                                  t.end < p.startClocks.timeStamp
                                    ? p.discard()
                                    : t.hadActivity
                                      ? p.stop(t.end)
                                      : l()
                                        ? p.stop(p.startClocks.timeStamp)
                                        : p.stop();
                                }),
                                nq(nz(e, n, r, t), d, 1e4)).stop,
                                v = e.subscribe(5, function (t) {
                                  var e = t.endClocks;
                                  p.stop(e.timeStamp);
                                }),
                                g = o.subscribe(function () {
                                  p.stop();
                                });
                              p.stopObservable.subscribe(function () {
                                v.unsubscribe(), m(), g.unsubscribe();
                              });
                            })(
                              r,
                              t,
                              e,
                              n,
                              f,
                              p,
                              m,
                              i.clickActionBase,
                              o,
                              a,
                              i.hadActivityOnPointerDown,
                            );
                          },
                        }).onPointerDown),
                        (u = i.onPointerUp),
                        (c = { selection: !1, input: !1, scroll: !1 }),
                        (l = [
                          tS(
                            r,
                            window,
                            "pointerdown",
                            function (t) {
                              rw(t) &&
                                ((o = rb()),
                                (c = { selection: !1, input: !1, scroll: !1 }),
                                (a = s(t)));
                            },
                            { capture: !0 },
                          ),
                          tS(
                            r,
                            window,
                            "selectionchange",
                            function () {
                              (o && rb()) || (c.selection = !0);
                            },
                            { capture: !0 },
                          ),
                          tS(
                            r,
                            window,
                            "scroll",
                            function () {
                              c.scroll = !0;
                            },
                            { capture: !0, passive: !0 },
                          ),
                          tS(
                            r,
                            window,
                            "pointerup",
                            function (t) {
                              if (rw(t) && a) {
                                var e = c;
                                u(a, t, function () {
                                  return e;
                                }),
                                  (a = void 0);
                              }
                            },
                            { capture: !0 },
                          ),
                          tS(
                            r,
                            window,
                            "input",
                            function () {
                              c.input = !0;
                            },
                            { capture: !0 },
                          ),
                        ]),
                        {
                          stop: function () {
                            l.forEach(function (t) {
                              return t.stop();
                            });
                          },
                        }).stop;
                        return {
                          stop: function () {
                            v(), p.notify(), h();
                          },
                          actionContexts: {
                            findActionId: function (t) {
                              return f.findAll(t);
                            },
                          },
                        };
                        function m(t) {
                          if (!d || !d.tryAppend(t)) {
                            var e = t.clone();
                            d = (function (t, e) {
                              var n,
                                r = [],
                                i = 0;
                              function o(t) {
                                t.stopObservable.subscribe(a),
                                  r.push(t),
                                  tt(n),
                                  (n = Z(s, 1e3));
                              }
                              function a() {
                                1 === i &&
                                  r.every(function (t) {
                                    return t.isStopped();
                                  }) &&
                                  ((i = 2), e(r));
                              }
                              function s() {
                                tt(n), 0 === i && ((i = 1), a());
                              }
                              return (
                                o(t),
                                {
                                  tryAppend: function (t) {
                                    var e, n, a, u;
                                    return (
                                      0 === i &&
                                      (!(r.length > 0) ||
                                      ((e = r[r.length - 1].event),
                                      (n = t.event),
                                      e.target === n.target &&
                                        100 >=
                                          ((a = e),
                                          (u = n),
                                          Math.sqrt(
                                            Math.pow(a.clientX - u.clientX, 2) +
                                              Math.pow(
                                                a.clientY - u.clientY,
                                                2,
                                              ),
                                          )) &&
                                        e.timeStamp - n.timeStamp <= 1e3)
                                        ? (o(t), !0)
                                        : (s(), !1))
                                    );
                                  },
                                  stop: function () {
                                    s();
                                  },
                                }
                              );
                            })(t, function (t) {
                              var n, r;
                              (function (t, e) {
                                if (
                                  (function (t) {
                                    if (
                                      t.some(function (t) {
                                        return (
                                          t.getUserActivity().selection ||
                                          t.getUserActivity().scroll
                                        );
                                      })
                                    )
                                      return !1;
                                    for (var e = 0; e < t.length - 2; e += 1)
                                      if (
                                        t[e + 3 - 1].event.timeStamp -
                                          t[e].event.timeStamp <=
                                        1e3
                                      )
                                        return !0;
                                    return !1;
                                  })(t)
                                )
                                  return (
                                    e.addFrustration("rage_click"),
                                    t.some(rS) &&
                                      e.addFrustration("dead_click"),
                                    e.hasError &&
                                      e.addFrustration("error_click"),
                                    { isRage: !0 }
                                  );
                                var n = t.some(function (t) {
                                  return t.getUserActivity().selection;
                                });
                                return (
                                  t.forEach(function (t) {
                                    t.hasError &&
                                      t.addFrustration("error_click"),
                                      rS(t) &&
                                        !n &&
                                        t.addFrustration("dead_click");
                                  }),
                                  { isRage: !1 }
                                );
                              })((n = t), (r = e)).isRage
                                ? (n.forEach(function (t) {
                                    return t.discard();
                                  }),
                                  r.stop(t5()),
                                  r.validate(
                                    n.map(function (t) {
                                      return t.event;
                                    }),
                                  ))
                                : (r.discard(),
                                  n.forEach(function (t) {
                                    return t.validate();
                                  }));
                            });
                          }
                        }
                        function v() {
                          d && d.stop();
                        }
                      })(t, s, u, e)).actionContexts),
                      (v = h.stop)),
                    {
                      addAction: function (e, n) {
                        t.notify(12, W({ savedCommonContext: n }, rC(e, o)));
                      },
                      actionContexts: m,
                      stop: v,
                    }),
                  M =
                    (tY(i.DELAY_VIEWPORT_COLLECTION)
                      ? (y = requestAnimationFrame(function () {
                          g = r0();
                        }))
                      : (g = r0()),
                    (_ = rZ(e).subscribe(function (t) {
                      g = t;
                    }).unsubscribe),
                    {
                      get: function () {
                        return g ? { viewport: g } : void 0;
                      },
                      stop: function () {
                        _(), y && cancelAnimationFrame(y);
                      },
                    }),
                  P =
                    (void 0 === b &&
                      ((w = window.cookieStore
                        ? ((d = e),
                          function (t, e) {
                            return tS(
                              d,
                              window.cookieStore,
                              "change",
                              function (n) {
                                var r =
                                  G(n.changed, function (e) {
                                    return e.name === t;
                                  }) ||
                                  G(n.deleted, function (e) {
                                    return e.name === t;
                                  });
                                r && e(r.value);
                              },
                            ).stop;
                          })
                        : iv),
                      (b = new ty(function (t) {
                        return w(ig, function (e) {
                          return t.notify(e);
                        });
                      }))),
                    (k =
                      eA(ig) ||
                      (null == (S = window.Cypress)
                        ? void 0
                        : S.env("traceId"))),
                    (x = b.subscribe(function (t) {
                      k = t;
                    })),
                    {
                      get: function () {
                        if ("string" == typeof k)
                          return { test_execution_id: k };
                      },
                      stop: function () {
                        return x.unsubscribe();
                      },
                    });
                return (
                  (E = D.actionContexts),
                  ((C = {}).view = W({}, nh, np)),
                  (C.error = W(
                    {
                      "error.message": "string",
                      "error.stack": "string",
                      "error.resource.url": "string",
                      "error.fingerprint": "string",
                    },
                    nh,
                    np,
                    nm,
                  )),
                  (C.resource = W(
                    { "resource.url": "string" },
                    tY(i.WRITABLE_RESOURCE_GRAPHQL)
                      ? { "resource.graphql": "object" }
                      : {},
                    nh,
                    np,
                    nm,
                  )),
                  (C.action = W(
                    { "action.target.name": "string" },
                    nh,
                    np,
                    nm,
                  )),
                  (C.long_task = W({}, nh, np)),
                  (C.vital = W({}, nh, np)),
                  (p = C),
                  ((T = {}).error = nl(
                    "error",
                    e.eventRateLimiterThreshold,
                    l,
                  )),
                  (T.action = nl("action", e.eventRateLimiterThreshold, l)),
                  (T.vital = nl("vital", e.eventRateLimiterThreshold, l)),
                  (I = T),
                  (R = (function () {
                    var t,
                      e,
                      n =
                        "string" ==
                        typeof (t =
                          window._DATADOG_SYNTHETICS_PUBLIC_ID ||
                          eA("datadog-synthetics-public-id"))
                          ? t
                          : void 0,
                      r =
                        "string" ==
                        typeof (e =
                          window._DATADOG_SYNTHETICS_RESULT_ID ||
                          eA("datadog-synthetics-result-id"))
                          ? e
                          : void 0;
                    if (n && r)
                      return { test_id: n, result_id: r, injected: eO() };
                  })()),
                  t.subscribe(12, function (n) {
                    var o = n.startTime,
                      a = n.rawRumEvent,
                      s = n.domainContext,
                      u = n.savedCommonContext,
                      l = n.customerContext,
                      d = A.findView(o),
                      f = N.findUrl(o),
                      h = r.findTrackedSession(o);
                    if (h && d && f) {
                      var m,
                        v = u || c(),
                        g = E.findActionId(o),
                        y = th(
                          {
                            _dd: {
                              format_version: 2,
                              drift: Math.round(
                                t3() - ((m = t9()), m + performance.now()),
                              ),
                              configuration: {
                                session_sample_rate: tQ(e.sessionSampleRate, 3),
                                session_replay_sample_rate: tQ(
                                  e.sessionReplaySampleRate,
                                  3,
                                ),
                              },
                              browser_sdk_version: ew() ? "5.35.1" : void 0,
                            },
                            application: { id: e.applicationId },
                            date: t5(),
                            service: d.service || e.service,
                            version: d.version || e.version,
                            source: "browser",
                            session: {
                              id: h.id,
                              type: R
                                ? "synthetics"
                                : P.get()
                                  ? "ci_test"
                                  : "user",
                            },
                            view: {
                              id: d.id,
                              name: d.name,
                              url: f.url,
                              referrer: f.referrer,
                            },
                            action:
                              -1 !==
                                ["error", "resource", "long_task"].indexOf(
                                  a.type,
                                ) && g
                                ? { id: g }
                                : void 0,
                            synthetics: R,
                            ci_test: P.get(),
                            display: M.get(),
                            connectivity: et(),
                          },
                          a,
                        );
                      (y.context = th(v.context, d.context, l)),
                        "has_replay" in y.session ||
                          (y.session.has_replay = v.hasReplay),
                        "view" === y.type &&
                          (y.session.sampled_for_replay =
                            1 === h.sessionReplay),
                        tY(i.ANONYMOUS_USER_TRACKING) &&
                          !v.user.anonymous_id &&
                          (v.user.anonymous_id = h.anonymousId),
                        tc(v.user) || (y.usr = v.user),
                        (function (t, e, n, r) {
                          if (e) {
                            var i,
                              o,
                              a,
                              s,
                              u =
                                ((i = p[t.type]),
                                (a = e((o = tp(t)), n)),
                                $(i).forEach(function (e) {
                                  var n = e[0],
                                    r = e[1],
                                    i = (function (t, e) {
                                      for (
                                        var n = t, r = 0, i = e.split(".");
                                        r < i.length;
                                        r++
                                      ) {
                                        var o,
                                          a,
                                          s = i[r];
                                        if (
                                          ((o = n),
                                          (a = s),
                                          !(
                                            nf(o) &&
                                            Object.prototype.hasOwnProperty.call(
                                              o,
                                              a,
                                            )
                                          ))
                                        )
                                          return;
                                        n = n[s];
                                      }
                                      return n;
                                    })(o, n),
                                    a = td(i);
                                  a === r
                                    ? nd(t, n, tm(i))
                                    : "object" === r &&
                                      ("undefined" === a || "null" === a) &&
                                      nd(t, n, {});
                                }),
                                a);
                            if (!1 === u && "view" !== t.type) return !1;
                            !1 === u &&
                              O.warn(
                                "Can't dismiss view events using beforeSend!",
                              );
                          }
                          return !(null == (s = r[t.type])
                            ? void 0
                            : s.isLimitReached());
                        })(y, e.beforeSend, s, I) &&
                          (tc(y.context) && delete y.context, t.notify(13, y));
                    }
                  }),
                  {
                    viewHistory: A,
                    pageStateHistory: o,
                    urlContexts: N,
                    addAction: D.addAction,
                    actionContexts: D.actionContexts,
                    stop: function () {
                      D.stop(),
                        P.stop(),
                        M.stop(),
                        N.stop(),
                        A.stop(),
                        o.stop();
                    },
                  }
                );
              })(J, t, location, tf, tP, tM, tD, tz, o, Q),
              tZ = tJ.viewHistory,
              ee = tJ.urlContexts,
              en = tJ.actionContexts,
              ei = tJ.addAction,
              el = tJ.stop;
            K.push(el), ea.drain();
            var ed =
                ((e$ = location),
                J.subscribe(4, function (n) {
                  var r,
                    i,
                    o,
                    a,
                    s,
                    u,
                    c,
                    l,
                    d,
                    f,
                    p,
                    h,
                    m,
                    v,
                    g,
                    y,
                    _,
                    b,
                    w,
                    S,
                    k,
                    x,
                    E,
                    C,
                    T;
                  return J.notify(
                    12,
                    ((r = n),
                    (i = t),
                    (o = ta),
                    (a = e),
                    (s = tP),
                    (x = a.getReplayStats(r.id)),
                    (E = o.findFeatureFlagEvaluations(r.startClocks.relative)),
                    (C = s.findAll(r.startClocks.relative, r.duration)),
                    (T = {
                      _dd: {
                        document_version: r.documentVersion,
                        replay_stats: x,
                        page_states: C,
                        configuration: {
                          start_session_replay_recording_manually:
                            i.startSessionReplayRecordingManually,
                        },
                      },
                      date: r.startClocks.timeStamp,
                      type: "view",
                      view: {
                        action: { count: r.eventCounts.actionCount },
                        frustration: { count: r.eventCounts.frustrationCount },
                        cumulative_layout_shift:
                          null ==
                          (u = r.commonViewMetrics.cumulativeLayoutShift)
                            ? void 0
                            : u.value,
                        cumulative_layout_shift_time: t2(
                          null ==
                            (c = r.commonViewMetrics.cumulativeLayoutShift)
                            ? void 0
                            : c.time,
                        ),
                        cumulative_layout_shift_target_selector:
                          null ==
                          (l = r.commonViewMetrics.cumulativeLayoutShift)
                            ? void 0
                            : l.targetSelector,
                        first_byte: t2(
                          null == (d = r.initialViewMetrics.navigationTimings)
                            ? void 0
                            : d.firstByte,
                        ),
                        dom_complete: t2(
                          null == (f = r.initialViewMetrics.navigationTimings)
                            ? void 0
                            : f.domComplete,
                        ),
                        dom_content_loaded: t2(
                          null == (p = r.initialViewMetrics.navigationTimings)
                            ? void 0
                            : p.domContentLoaded,
                        ),
                        dom_interactive: t2(
                          null == (h = r.initialViewMetrics.navigationTimings)
                            ? void 0
                            : h.domInteractive,
                        ),
                        error: { count: r.eventCounts.errorCount },
                        first_contentful_paint: t2(
                          r.initialViewMetrics.firstContentfulPaint,
                        ),
                        first_input_delay: t2(
                          null == (m = r.initialViewMetrics.firstInput)
                            ? void 0
                            : m.delay,
                        ),
                        first_input_time: t2(
                          null == (v = r.initialViewMetrics.firstInput)
                            ? void 0
                            : v.time,
                        ),
                        first_input_target_selector:
                          null == (g = r.initialViewMetrics.firstInput)
                            ? void 0
                            : g.targetSelector,
                        interaction_to_next_paint: t2(
                          null ==
                            (y = r.commonViewMetrics.interactionToNextPaint)
                            ? void 0
                            : y.value,
                        ),
                        interaction_to_next_paint_time: t2(
                          null ==
                            (_ = r.commonViewMetrics.interactionToNextPaint)
                            ? void 0
                            : _.time,
                        ),
                        interaction_to_next_paint_target_selector:
                          null ==
                          (b = r.commonViewMetrics.interactionToNextPaint)
                            ? void 0
                            : b.targetSelector,
                        is_active: r.isActive,
                        name: r.name,
                        largest_contentful_paint: t2(
                          null ==
                            (w = r.initialViewMetrics.largestContentfulPaint)
                            ? void 0
                            : w.value,
                        ),
                        largest_contentful_paint_target_selector:
                          null ==
                          (S = r.initialViewMetrics.largestContentfulPaint)
                            ? void 0
                            : S.targetSelector,
                        load_event: t2(
                          null == (k = r.initialViewMetrics.navigationTimings)
                            ? void 0
                            : k.loadEvent,
                        ),
                        loading_time: nL(t2(r.commonViewMetrics.loadingTime)),
                        loading_type: r.loadingType,
                        long_task: { count: r.eventCounts.longTaskCount },
                        resource: { count: r.eventCounts.resourceCount },
                        time_spent: t2(r.duration),
                      },
                      feature_flags: E && !tc(E) ? E : void 0,
                      display: r.commonViewMetrics.scroll
                        ? {
                            scroll: {
                              max_depth: r.commonViewMetrics.scroll.maxDepth,
                              max_depth_scroll_top:
                                r.commonViewMetrics.scroll.maxDepthScrollTop,
                              max_scroll_height:
                                r.commonViewMetrics.scroll.maxScrollHeight,
                              max_scroll_height_time: t2(
                                r.commonViewMetrics.scroll.maxScrollHeightTime,
                              ),
                            },
                          }
                        : void 0,
                      session: {
                        has_replay: !!x || void 0,
                        is_active: !!r.sessionIsActive && void 0,
                      },
                      privacy: { replay_level: i.defaultPrivacyLevel },
                    }),
                    tc(r.customTimings) ||
                      (T.view.custom_timings = (function (t, e) {
                        for (
                          var n = {}, r = 0, i = Object.keys(t);
                          r < i.length;
                          r++
                        ) {
                          var o = i[r];
                          n[o] = e(t[o]);
                        }
                        return n;
                      })(r.customTimings, t2)),
                    {
                      rawRumEvent: T,
                      startTime: r.startClocks.relative,
                      domainContext: { location: r.location },
                    }),
                  );
                }),
                (function (t, e, n, r, i, o, a, s) {
                  var u,
                    c = new Set(),
                    l = d("initial_load", t8(), s);
                  function d(o, a, s) {
                    var u = (function (t, e, n, r, i, o, a, s) {
                      void 0 === a && (a = t4());
                      var u,
                        c,
                        l,
                        d,
                        f,
                        p,
                        h,
                        v,
                        g,
                        y,
                        _,
                        w,
                        S,
                        k,
                        x,
                        E,
                        C,
                        T,
                        I,
                        R,
                        A,
                        N,
                        D,
                        M,
                        P,
                        L,
                        U,
                        j,
                        q,
                        z,
                        B,
                        F,
                        H,
                        $,
                        Y,
                        W,
                        K,
                        J,
                        X,
                        Q,
                        to,
                        ta,
                        tu,
                        tc,
                        tl,
                        td = ep(),
                        tf = new ty(),
                        tp = {},
                        th = 0,
                        tm = ts(i),
                        tv = tb(),
                        tg = !0;
                      s &&
                        ((ta = s.name),
                        (tu = s.service || void 0),
                        (tc = s.version || void 0),
                        s.context && ((tl = s.context), tv.setContext(tl)));
                      var t_ = {
                        id: td,
                        name: ta,
                        startClocks: a,
                        service: tu,
                        version: tc,
                        context: tl,
                      };
                      t.notify(1, t_), t.notify(2, t_);
                      var tw = tr(tV, 3e3, { leading: !1 }),
                        tx = tw.throttled,
                        tE = tw.cancel,
                        tC =
                          ((v = {}),
                          (y = (g = (function (t, e, n, r, i, o, a) {
                            var s,
                              u = "initial_load" === i,
                              c = !0,
                              l = [],
                              d = rH(r);
                            function f() {
                              if (!c && !u && l.length > 0) {
                                var t = Math.max.apply(Math, l);
                                t < d.timeStamp && a(t);
                              }
                            }
                            var p = ((s = function (t) {
                              if (c) {
                                var e;
                                (c = !1),
                                  t.hadActivity &&
                                    l.push(((e = o.timeStamp), t.end - e)),
                                  f();
                              }
                            }),
                            nq(nz(t, e, n, r), s, void 0)).stop;
                            return {
                              stop: function () {
                                p(), d.stop();
                              },
                              setLoadEvent: function (t) {
                                u && ((u = !1), l.push(t), f());
                              },
                            };
                          })(t, e, n, r, o, (h = a), function (t) {
                            (v.loadingTime = t), tx();
                          })).stop),
                          (_ = g.setLoadEvent),
                          (T = ((w = function (t) {
                            v.scroll = t;
                          }),
                          void 0 === S &&
                            ((u = r),
                            void 0 === c && (c = 1e3),
                            (S = new ty(function (t) {
                              if (window.ResizeObserver) {
                                var e = tr(
                                    function () {
                                      var e, n;
                                      t.notify(
                                        ((e = rQ()),
                                        (n = r0().height),
                                        {
                                          scrollHeight: Math.round(
                                            (
                                              document.scrollingElement ||
                                              document.documentElement
                                            ).scrollHeight,
                                          ),
                                          scrollDepth: Math.round(n + e),
                                          scrollTop: e,
                                        }),
                                      );
                                    },
                                    c,
                                    { leading: !1, trailing: !0 },
                                  ),
                                  n =
                                    document.scrollingElement ||
                                    document.documentElement,
                                  r = new ResizeObserver(V(e.throttled));
                                n && r.observe(n);
                                var i = tS(u, window, "scroll", e.throttled, {
                                  passive: !0,
                                });
                                return function () {
                                  e.cancel(), r.disconnect(), i.stop();
                                };
                              }
                            }))),
                          (k = 0),
                          (x = 0),
                          (E = 0),
                          (C = S.subscribe(function (t) {
                            var e = t.scrollDepth,
                              n = t.scrollTop,
                              r = t.scrollHeight,
                              i = !1;
                            (e > k && ((k = e), (i = !0)), r > x) &&
                              ((x = r), (E = t6() - h.relative), (i = !0));
                            i &&
                              w({
                                maxDepth: Math.min(k, x),
                                maxDepthScrollTop: n,
                                maxScrollHeight: x,
                                maxScrollHeightTime: E,
                              });
                          })),
                          {
                            stop: function () {
                              return C.unsubscribe();
                            },
                          }).stop),
                          (I = (function (t, e, n) {
                            if (!(nV(m.LAYOUT_SHIFT) && "WeakRef" in window))
                              return { stop: ti };
                            var r,
                              i,
                              o,
                              a,
                              s,
                              u,
                              c = 0;
                            n({ value: 0 });
                            var l =
                                ((o = 0),
                                (a = 0),
                                {
                                  update: function (t) {
                                    var e;
                                    return (
                                      void 0 === r ||
                                      t.startTime - i >= 1e3 ||
                                      t.startTime - r >= 5e3
                                        ? ((r = i = t.startTime),
                                          (a = o = t.value),
                                          (e = !0))
                                        : ((o += t.value),
                                          (i = t.startTime),
                                          (e = t.value > a) && (a = t.value)),
                                      { cumulatedValue: o, isMaxValue: e }
                                    );
                                  },
                                }),
                              d = nj(t, {
                                type: m.LAYOUT_SHIFT,
                                buffered: !0,
                              }).subscribe(function (r) {
                                for (var i = 0; i < r.length; i++) {
                                  var o = r[i];
                                  if (!o.hadRecentInput && !(o.startTime < e)) {
                                    var a = l.update(o),
                                      d = a.cumulatedValue;
                                    if (a.isMaxValue) {
                                      var f = (function (t) {
                                        var e;
                                        if (t)
                                          return null ==
                                            (e = G(t, function (t) {
                                              return !!t.node && nW(t.node);
                                            }))
                                            ? void 0
                                            : e.node;
                                      })(o.sources);
                                      (s = f ? new WeakRef(f) : void 0),
                                        (u = o.startTime - e);
                                    }
                                    if (d > c) {
                                      c = d;
                                      var f = null == s ? void 0 : s.deref();
                                      n({
                                        value: tQ(c, 4),
                                        targetSelector:
                                          f && rp(f, t.actionNameAttribute),
                                        time: u,
                                      });
                                    }
                                  }
                                }
                              });
                            return {
                              stop: function () {
                                d.unsubscribe();
                              },
                            };
                          })(r, h.relative, function (t) {
                            (v.cumulativeLayoutShift = t), tx();
                          }).stop),
                          (A = (R = (function (t, e, n) {
                            if (
                              !(
                                nV(m.EVENT) &&
                                window.PerformanceEventTiming &&
                                "interactionId" in
                                  PerformanceEventTiming.prototype
                              )
                            )
                              return {
                                getInteractionToNextPaint: function () {},
                                setViewEnd: ti,
                                stop: ti,
                              };
                            var r,
                              i,
                              o,
                              a,
                              s,
                              u =
                                ((r = n),
                                "interactionCount" in performance ||
                                  b ||
                                  (b = new window.PerformanceObserver(
                                    V(function (t) {
                                      t.getEntries().forEach(function (t) {
                                        t.interactionId &&
                                          ((rY = Math.min(rY, t.interactionId)),
                                          (r$ =
                                            ((rW = Math.max(
                                              rW,
                                              t.interactionId,
                                            )) -
                                              rY) /
                                              7 +
                                            1));
                                      });
                                    }),
                                  )).observe({
                                    type: "event",
                                    buffered: !0,
                                    durationThreshold: 0,
                                  }),
                                (i = "initial_load" === r ? 0 : rK()),
                                (o = { stopped: !1 }),
                                {
                                  getViewInteractionCount: function () {
                                    return o.stopped
                                      ? o.interactionCount
                                      : rK() - i;
                                  },
                                  stopViewInteractionCount: function () {
                                    o = {
                                      stopped: !0,
                                      interactionCount: rK() - i,
                                    };
                                  },
                                }),
                              c = u.getViewInteractionCount,
                              l = u.stopViewInteractionCount,
                              d = 1 / 0,
                              f = (function (t) {
                                var e = [];
                                function n() {
                                  e.sort(function (t, e) {
                                    return e.duration - t.duration;
                                  }).splice(10);
                                }
                                return {
                                  process: function (t) {
                                    var r = e.findIndex(function (e) {
                                        return (
                                          t.interactionId === e.interactionId
                                        );
                                      }),
                                      i = e[e.length - 1];
                                    -1 !== r
                                      ? t.duration > e[r].duration &&
                                        ((e[r] = t), n())
                                      : (e.length < 10 ||
                                          t.duration > i.duration) &&
                                        (e.push(t), n());
                                  },
                                  estimateP98Interaction: function () {
                                    var n = Math.min(
                                      e.length - 1,
                                      Math.floor(t() / 50),
                                    );
                                    return e[n];
                                  },
                                };
                              })(c),
                              p = -1;
                            function h(n) {
                              for (var r, i, o = 0; o < n.length; o++) {
                                var u = n[o];
                                u.interactionId &&
                                  u.startTime >= e &&
                                  u.startTime <= d &&
                                  f.process(u);
                              }
                              var c = f.estimateP98Interaction();
                              c &&
                                c.duration !== p &&
                                ((p = c.duration),
                                (s = c.startTime - e),
                                (r = c.startTime),
                                (i = rk.get(r)),
                                rk.delete(r),
                                !(a = i) &&
                                  c.target &&
                                  nW(c.target) &&
                                  (a = rp(c.target, t.actionNameAttribute)));
                            }
                            var v = nj(t, {
                                type: m.FIRST_INPUT,
                                buffered: !0,
                              }).subscribe(h),
                              g = nj(t, {
                                type: m.EVENT,
                                durationThreshold: 40,
                                buffered: !0,
                              }).subscribe(h);
                            return {
                              getInteractionToNextPaint: function () {
                                return p >= 0
                                  ? {
                                      value: Math.min(p, rJ),
                                      targetSelector: a,
                                      time: s,
                                    }
                                  : c()
                                    ? { value: 0 }
                                    : void 0;
                              },
                              setViewEnd: function (t) {
                                (d = t), l();
                              },
                              stop: function () {
                                g.unsubscribe(), v.unsubscribe();
                              },
                            };
                          })(r, h.relative, o)).stop),
                          (N = R.getInteractionToNextPaint),
                          {
                            stop: function () {
                              y(), I(), T();
                            },
                            stopINPTracking: A,
                            setLoadEvent: _,
                            setViewEnd: R.setViewEnd,
                            getCommonViewMetrics: function () {
                              return (v.interactionToNextPaint = N()), v;
                            },
                          }),
                        tT = tC.setLoadEvent,
                        tI = tC.setViewEnd,
                        tR = tC.stop,
                        tA = tC.stopINPTracking,
                        tO = tC.getCommonViewMetrics,
                        tN =
                          "initial_load" === o
                            ? ((D = {}),
                              (L = ((M = function (t) {
                                tT(t.loadEvent),
                                  (D.navigationTimings = t),
                                  tx();
                              }),
                              void 0 === P && (P = rV),
                              (l = r),
                              (d = function () {
                                var t,
                                  e = P();
                                e.loadEventEnd <= 0 ||
                                  M({
                                    domComplete: (t = e).domComplete,
                                    domContentLoaded:
                                      t.domContentLoadedEventEnd,
                                    domInteractive: t.domInteractive,
                                    loadEvent: t.loadEventEnd,
                                    firstByte:
                                      t.responseStart >= 0 &&
                                      t.responseStart <= t6()
                                        ? t.responseStart
                                        : void 0,
                                  });
                              }),
                              (p = rP(l, "complete", function () {
                                f = Z(function () {
                                  return d();
                                });
                              }).stop),
                              {
                                stop: function () {
                                  p(), tt(f);
                                },
                              }).stop),
                              (U = rH(r)),
                              (q = ((j = function (t) {
                                (D.firstContentfulPaint = t), tx();
                              }),
                              {
                                stop: nj(r, {
                                  type: m.PAINT,
                                  buffered: !0,
                                }).subscribe(function (t) {
                                  var e = G(t, function (t) {
                                    return (
                                      "first-contentful-paint" === t.name &&
                                      t.startTime < U.timeStamp &&
                                      t.startTime < rF
                                    );
                                  });
                                  e && j(e.startTime);
                                }).unsubscribe,
                              }).stop),
                              (W = ((z = window),
                              (B = function (t) {
                                (D.largestContentfulPaint = t), tx();
                              }),
                              (F = 1 / 0),
                              (H = tk(
                                r,
                                z,
                                ["pointerdown", "keydown"],
                                function (t) {
                                  F = t.timeStamp;
                                },
                                { capture: !0, once: !0 },
                              ).stop),
                              ($ = 0),
                              (Y = nj(r, {
                                type: m.LARGEST_CONTENTFUL_PAINT,
                                buffered: !0,
                              }).subscribe(function (t) {
                                var e = (function (t, e) {
                                  for (var n = t.length - 1; n >= 0; n -= 1) {
                                    var r = t[n];
                                    if (e(r, n, t)) return r;
                                  }
                                })(t, function (t) {
                                  return (
                                    t.entryType ===
                                      m.LARGEST_CONTENTFUL_PAINT &&
                                    t.startTime < F &&
                                    t.startTime < U.timeStamp &&
                                    t.startTime < rG &&
                                    t.size > $
                                  );
                                });
                                if (e) {
                                  var n = void 0;
                                  e.element &&
                                    (n = rp(e.element, r.actionNameAttribute)),
                                    B({
                                      value: e.startTime,
                                      targetSelector: n,
                                    }),
                                    ($ = e.size);
                                }
                              })),
                              {
                                stop: function () {
                                  H(), Y.unsubscribe();
                                },
                              }).stop),
                              (X = ((K = function (t) {
                                (D.firstInput = t), tx();
                              }),
                              (J = nj(r, {
                                type: m.FIRST_INPUT,
                                buffered: !0,
                              }).subscribe(function (t) {
                                var e = G(t, function (t) {
                                  return t.startTime < U.timeStamp;
                                });
                                if (e) {
                                  var n,
                                    i =
                                      ((n = e.startTime),
                                      e.processingStart - n),
                                    o = void 0;
                                  e.target &&
                                    nW(e.target) &&
                                    (o = rp(e.target, r.actionNameAttribute)),
                                    K({
                                      delay: i >= 0 ? i : 0,
                                      time: e.startTime,
                                      targetSelector: o,
                                    });
                                }
                              })),
                              {
                                stop: function () {
                                  J.unsubscribe();
                                },
                              }).stop),
                              {
                                stop: function () {
                                  L(), q(), W(), X(), U.stop();
                                },
                                initialViewMetrics: D,
                              })
                            : { stop: ti, initialViewMetrics: {} },
                        tD = tN.stop,
                        tM = tN.initialViewMetrics,
                        tP = {
                          stop: (Q = nU({
                            lifeCycle: t,
                            isChildEvent: function (t) {
                              return t.view.id === td;
                            },
                            onChange: tx,
                          })).stop,
                          eventCounts: Q.eventCounts,
                        },
                        tL = tP.stop,
                        tU = tP.eventCounts,
                        tj = te(tV, r1);
                      function tV() {
                        tE(), (th += 1);
                        var e = void 0 === to ? t5() : to.timeStamp;
                        t.notify(4, {
                          customTimings: tp,
                          documentVersion: th,
                          id: td,
                          name: ta,
                          service: tu,
                          version: tc,
                          context: tv.getContext(),
                          loadingType: o,
                          location: tm,
                          startClocks: a,
                          commonViewMetrics: tO(),
                          initialViewMetrics: tM,
                          duration: e - a.timeStamp,
                          isActive: void 0 === to,
                          sessionIsActive: tg,
                          eventCounts: tU,
                        });
                      }
                      return (
                        tV(),
                        tv.changeObservable.subscribe(function () {
                          t.notify(3, {
                            id: td,
                            name: ta,
                            context: tv.getContext(),
                            startClocks: a,
                          }),
                            tx();
                        }),
                        {
                          get name() {
                            return ta;
                          },
                          service: tu,
                          version: tc,
                          contextManager: tv,
                          stopObservable: tf,
                          end: function (e) {
                            var n,
                              r,
                              i = this;
                            void 0 === e && (e = {}),
                              to ||
                                ((to = null != (n = e.endClocks) ? n : t4()),
                                (tg = null == (r = e.sessionIsActive) || r),
                                t.notify(5, { endClocks: to }),
                                t.notify(6, { endClocks: to }),
                                tn(tj),
                                tI(to.relative),
                                tR(),
                                tV(),
                                Z(function () {
                                  i.stop();
                                }, r2));
                          },
                          stop: function () {
                            tD(), tL(), tA(), tf.notify();
                          },
                          addTiming: function (t, e) {
                            if (!to) {
                              var n,
                                r,
                                i = e < t0 ? e : e - a.timeStamp;
                              (tp[
                                ((r = (n = t).replace(
                                  /[^a-zA-Z0-9-_.@$]/g,
                                  "_",
                                )) !== n &&
                                  O.warn(
                                    "Invalid timing name: "
                                      .concat(n, ", sanitized to: ")
                                      .concat(r),
                                  ),
                                r)
                              ] = i),
                                tx();
                            }
                          },
                          setViewName: function (t) {
                            (ta = t), tV();
                          },
                        }
                      );
                    })(e, n, r, i, t, o, a, s);
                    return (
                      c.add(u),
                      u.stopObservable.subscribe(function () {
                        c.delete(u);
                      }),
                      u
                    );
                  }
                  return (
                    e.subscribe(10, function () {
                      l = d("route_change", void 0, {
                        name: l.name,
                        service: l.service,
                        version: l.version,
                        context: l.contextManager.getContext(),
                      });
                    }),
                    e.subscribe(9, function () {
                      l.end({ sessionIsActive: !1 });
                    }),
                    e.subscribe(11, function (t) {
                      t.reason === ns.UNLOADING && l.end();
                    }),
                    a &&
                      (u = o.subscribe(function (t) {
                        var e, n, r;
                        (e = t.oldLocation),
                          (n = t.newLocation),
                          (e.pathname === n.pathname &&
                            (("" !== (r = n.hash.substring(1)) &&
                              document.getElementById(r)) ||
                              r3(n.hash) === r3(e.hash))) ||
                            (l.end(), (l = d("route_change")));
                      })),
                    {
                      addTiming: function (t, e) {
                        void 0 === e && (e = t5()), l.addTiming(t, e);
                      },
                      startView: function (t, e) {
                        l.end({ endClocks: e }), (l = d("route_change", e, t));
                      },
                      setViewContext: function (t) {
                        l.contextManager.setContext(t);
                      },
                      setViewContextProperty: function (t, e) {
                        l.contextManager.setContextProperty(t, e);
                      },
                      setViewName: function (t) {
                        l.setViewName(t);
                      },
                      stop: function () {
                        u && u.unsubscribe(),
                          l.end(),
                          c.forEach(function (t) {
                            return t.stop();
                          });
                      },
                    }
                  );
                })(e$, J, tD, tz, t, tM, !t.trackViewsManually, a)),
              ef = ed.addTiming,
              eh = ed.startView,
              em = ed.setViewName,
              ek = ed.setViewContext,
              ex = ed.setViewContextProperty,
              eE = ed.stop;
            K.push(eE);
            var eC = (function (t, e, n, r, i) {
              void 0 === r &&
                (r = (function () {
                  var t = [];
                  function e(e) {
                    var r;
                    if (e.didTimeout) {
                      var i = performance.now();
                      r = function () {
                        return 30 - (performance.now() - i);
                      };
                    } else r = e.timeRemaining.bind(e);
                    for (; r() > 0 && t.length; ) t.shift()();
                    t.length && n();
                  }
                  function n() {
                    rN(e, { timeout: 1e3 });
                  }
                  return {
                    push: function (e) {
                      1 === t.push(e) && n();
                    },
                  };
                })()),
                void 0 === i && (i = rq),
                t.subscribe(8, function (t) {
                  a(function () {
                    return (function (t, e, n) {
                      var r = (function (t) {
                          if (
                            performance &&
                            "getEntriesByName" in performance
                          ) {
                            var e = performance.getEntriesByName(
                              t.url,
                              "resource",
                            );
                            if (e.length && "toJSON" in e[0]) {
                              var n = e
                                .filter(function (t) {
                                  return !rD.has(t);
                                })
                                .filter(function (t) {
                                  return nE(t) && nC(t);
                                })
                                .filter(function (e) {
                                  var n, r, i;
                                  return (
                                    (n = e),
                                    (r = t.startClocks.relative),
                                    (i = rM({
                                      startTime: t.startClocks.relative,
                                      duration: t.duration,
                                    })),
                                    n.startTime >= r - 1 && rM(n) <= i + 1
                                  );
                                });
                              if (1 === n.length)
                                return rD.add(n[0]), n[0].toJSON();
                            }
                          }
                        })(t),
                        i = r ? t1(r.startTime) : t.startClocks,
                        o = (function (t, e) {
                          if (t.traceSampled && t.traceId && t.spanId)
                            return {
                              _dd: {
                                span_id: t.spanId.toString(),
                                trace_id: t.traceId.toString(),
                                rule_psr: e.rulePsr,
                              },
                            };
                        })(t, e);
                      if (e.trackResources || o) {
                        var a,
                          s,
                          u,
                          c = "xhr" === t.type ? "xhr" : "fetch",
                          l = r ? rB(r) : void 0,
                          d =
                            ((a = n),
                            (s = i),
                            (u = t.duration),
                            a.wasInPageStateDuringPeriod(
                              "frozen",
                              s.relative,
                              u,
                            )
                              ? void 0
                              : t2(u)),
                          f = th(
                            {
                              date: i.timeStamp,
                              resource: {
                                id: ep(),
                                type: c,
                                duration: d,
                                method: t.method,
                                status_code: t.status,
                                protocol: r && nI(r),
                                url: nN(t.url) ? nD(t.url) : t.url,
                                delivery_type: r && nR(r),
                              },
                              type: "resource",
                              _dd: { discarded: !e.trackResources },
                            },
                            o,
                            l,
                          );
                        return {
                          startTime: i.relative,
                          rawRumEvent: f,
                          domainContext: {
                            performanceEntry: r,
                            xhr: t.xhr,
                            response: t.response,
                            requestInput: t.input,
                            requestInit: t.init,
                            error: t.error,
                            isAborted: t.isAborted,
                            handlingStack: t.handlingStack,
                          },
                        };
                      }
                    })(t, e, n);
                  });
                });
              var o = nj(e, { type: m.RESOURCE, buffered: !0 }).subscribe(
                function (t) {
                  for (
                    var n = function (t) {
                        "xmlhttprequest" !== t.initiatorType &&
                          "fetch" !== t.initiatorType &&
                          a(function () {
                            return rz(t, e);
                          });
                      },
                      r = 0;
                    r < t.length;
                    r++
                  )
                    n(t[r]);
                },
              );
              function a(e) {
                r.push(function () {
                  var n = e();
                  n && t.notify(12, n);
                });
              }
              return (
                i(e, function (t) {
                  a(function () {
                    return rz(t, e);
                  });
                }),
                {
                  stop: function () {
                    o.unsubscribe();
                  },
                }
              );
            })(J, t, tP).stop;
            if ((K.push(eC), tY(i.LONG_ANIMATION_FRAME))) {
              if (t.trackLongTasks) {
                var eR,
                  eU,
                  eV,
                  eF,
                  eG,
                  e$,
                  eJ,
                  eQ = ((eJ = nj(t, {
                    type: m.LONG_ANIMATION_FRAME,
                    buffered: !0,
                  }).subscribe(function (t) {
                    for (var e = 0; e < t.length; e++) {
                      var n = t[e],
                        r = t1(n.startTime),
                        i = {
                          date: r.timeStamp,
                          long_task: {
                            id: ep(),
                            entry_type: "long-animation-frame",
                            duration: t2(n.duration),
                            blocking_duration: t2(n.blockingDuration),
                            first_ui_event_timestamp: t2(
                              n.firstUIEventTimestamp,
                            ),
                            render_start: t2(n.renderStart),
                            style_and_layout_start: t2(n.styleAndLayoutStart),
                            start_time: t2(n.startTime),
                            scripts: n.scripts.map(function (t) {
                              return {
                                duration: t2(t.duration),
                                pause_duration: t2(t.pauseDuration),
                                forced_style_and_layout_duration: t2(
                                  t.forcedStyleAndLayoutDuration,
                                ),
                                start_time: t2(t.startTime),
                                execution_start: t2(t.executionStart),
                                source_url: t.sourceURL,
                                source_function_name: t.sourceFunctionName,
                                source_char_position: t.sourceCharPosition,
                                invoker: t.invoker,
                                invoker_type: t.invokerType,
                                window_attribution: t.windowAttribution,
                              };
                            }),
                          },
                          type: "long_task",
                          _dd: { discarded: !1 },
                        };
                      J.notify(12, {
                        rawRumEvent: i,
                        startTime: r.relative,
                        domainContext: { performanceEntry: n },
                      });
                    }
                  })),
                  {
                    stop: function () {
                      return eJ.unsubscribe();
                    },
                  }).stop;
                K.push(eQ);
              }
            } else
              nj(t, { type: m.LONG_TASK, buffered: !0 }).subscribe(
                function (e) {
                  for (var n = 0; n < e.length; n++) {
                    var r = e[n];
                    if (r.entryType !== m.LONG_TASK || !t.trackLongTasks) break;
                    var i = t1(r.startTime),
                      o = {
                        date: i.timeStamp,
                        long_task: {
                          id: ep(),
                          entry_type: "long-task",
                          duration: t2(r.duration),
                        },
                        type: "long_task",
                        _dd: { discarded: !1 },
                      };
                    J.notify(12, {
                      rawRumEvent: o,
                      startTime: i.relative,
                      domainContext: { performanceEntry: r },
                    });
                  }
                },
              );
            var eZ = ((l = N = new ty()),
            ((d = [T.error].map(function (t) {
              var e;
              return (
                rI[t] ||
                  (rI[t] =
                    ((e = t),
                    new ty(function (t) {
                      var n = I[e];
                      return (
                        (I[e] = function () {
                          for (var r = [], i = 0; i < arguments.length; i++)
                            r[i] = arguments[i];
                          n.apply(console, r);
                          var o = tj();
                          q(function () {
                            t.notify(
                              (function (t, e, n) {
                                var r,
                                  i = t
                                    .map(function (t) {
                                      var e;
                                      return "string" == typeof (e = t)
                                        ? tm(e)
                                        : tG(e)
                                          ? tq(tT(e))
                                          : to(tm(e), void 0, 2);
                                    })
                                    .join(" ");
                                if (e === T.error) {
                                  var o = G(t, tG);
                                  r = {
                                    stack: o ? tV(tT(o)) : void 0,
                                    fingerprint: tF(o),
                                    causes: o ? tH(o, "console") : void 0,
                                    startClocks: t4(),
                                    message: i,
                                    source: nc.CONSOLE,
                                    handling: "handled",
                                    handlingStack: n,
                                  };
                                }
                                return {
                                  api: e,
                                  message: i,
                                  error: r,
                                  handlingStack: n,
                                };
                              })(r, e, o),
                            );
                          });
                        }),
                        function () {
                          I[e] = n;
                        }
                      );
                    }))),
                rI[t]
              );
            })),
            t_.apply(void 0, d)).subscribe(function (t) {
              return l.notify(t.error);
            }),
            ((f = D =
              function (t, e) {
                var n = tB({
                  stackTrace: t,
                  originalError: e,
                  startClocks: t4(),
                  nonErrorPrefix: "Uncaught",
                  source: nc.SOURCE,
                  handling: "unhandled",
                });
                N.notify(n);
              }),
            eS(window, "onerror", function (t) {
              var e,
                n,
                r,
                i,
                o,
                a,
                s = t.parameters,
                u = s[0],
                c = s[1],
                l = s[2],
                d = s[3],
                p = s[4];
              if (tG(p)) a = tT(p);
              else {
                a = {
                  name: ((e = u),
                  "[object String]" === {}.toString.call(e) &&
                    ((r = (n = tU.exec(e))[1]), (i = n[2])),
                  (o = { name: r, message: i })).name,
                  message: o.message,
                  stack: [{ url: c, column: d, line: l }],
                };
              }
              f(a, null != p ? p : u);
            })).stop,
            ((v = D),
            eS(window, "onunhandledrejection", function (t) {
              var e = t.parameters[0].reason || "Empty reason";
              v(tT(e), e);
            })).stop,
            ((L = [rR.cspViolation, rR.intervention]),
            (U = []),
            B(L, rR.cspViolation) &&
              U.push(
                ((g = t),
                new ty(function (t) {
                  return tS(
                    g,
                    document,
                    "securitypolicyviolation",
                    function (e) {
                      var n, r;
                      t.notify(
                        ((n = e),
                        (r = "'"
                          .concat(n.blockedURI, "' blocked by '")
                          .concat(n.effectiveDirective, "' directive")),
                        rA({
                          type: n.effectiveDirective,
                          message: "".concat(rR.cspViolation, ": ").concat(r),
                          originalError: n,
                          csp: { disposition: n.disposition },
                          stack: rO(
                            n.effectiveDirective,
                            n.originalPolicy
                              ? ""
                                  .concat(r, ' of the policy "')
                                  .concat(ev(n.originalPolicy, 100, "..."), '"')
                              : "no policy",
                            n.sourceFile,
                            n.lineNumber,
                            n.columnNumber,
                          ),
                        })),
                      );
                    },
                  ).stop;
                })),
              ),
            (j = L.filter(function (t) {
              return t !== rR.cspViolation;
            })).length &&
              U.push(
                ((y = j),
                new ty(function (t) {
                  if (window.ReportingObserver) {
                    var e = V(function (e, n) {
                        return e.forEach(function (e) {
                          var n, r, i;
                          return t.notify(
                            ((r = (n = e).type),
                            rA({
                              type: (i = n.body).id,
                              message: "".concat(r, ": ").concat(i.message),
                              originalError: n,
                              stack: rO(
                                i.id,
                                i.message,
                                i.sourceFile,
                                i.lineNumber,
                                i.columnNumber,
                              ),
                            })),
                          );
                        });
                      }),
                      n = new window.ReportingObserver(e, {
                        types: y,
                        buffered: !0,
                      });
                    return (
                      n.observe(),
                      function () {
                        n.disconnect();
                      }
                    );
                  }
                })),
              ),
            t_.apply(void 0, U)).subscribe(function (t) {
              return N.notify(t);
            }),
            N.subscribe(function (t) {
              return J.notify(14, { error: t });
            }),
            (_ = J),
            (w = tP),
            (E = ta),
            _.subscribe(14, function (t) {
              var e,
                n,
                r,
                i,
                o,
                a,
                s = t.error,
                u = t.customerContext,
                c = t.savedCommonContext;
              _.notify(
                12,
                W(
                  { customerContext: u, savedCommonContext: c },
                  ((e = s),
                  (n = w),
                  (r = E),
                  (i = {
                    date: e.startClocks.timeStamp,
                    error: {
                      id: ep(),
                      message: e.message,
                      source: e.source,
                      stack: e.stack,
                      handling_stack: e.handlingStack,
                      type: e.type,
                      handling: e.handling,
                      causes: e.causes,
                      source_type: "browser",
                      fingerprint: e.fingerprint,
                      csp: e.csp,
                    },
                    type: "error",
                    view: {
                      in_foreground: n.wasInPageStateAt(
                        "active",
                        e.startClocks.relative,
                      ),
                    },
                  }),
                  (o = r.findFeatureFlagEvaluations(e.startClocks.relative)) &&
                    !tc(o) &&
                    (i.feature_flags = o),
                  (a = {
                    error: e.originalError,
                    handlingStack: e.handlingStack,
                  }),
                  {
                    rawRumEvent: i,
                    startTime: e.startClocks.relative,
                    domainContext: a,
                  }),
                ),
              );
            }),
            {
              addError: function (t, e) {
                var n = t.error,
                  r = t.handlingStack,
                  i = t.startClocks,
                  o = t.context,
                  a = tB({
                    stackTrace: tG(n) ? tT(n) : void 0,
                    originalError: n,
                    handlingStack: r,
                    startClocks: i,
                    nonErrorPrefix: "Provided",
                    source: nc.CUSTOM,
                    handling: "handled",
                  });
                _.notify(14, {
                  customerContext: o,
                  savedCommonContext: e,
                  error: a,
                });
              },
            }).addError;
            (H = {
              clearTracingIfNeeded: nr,
              traceFetch: function (e) {
                return ni(t, e, tf, function (t) {
                  var n;
                  if (
                    e.input instanceof Request &&
                    !(null == (n = e.init) ? void 0 : n.headers)
                  )
                    (e.input = new Request(e.input)),
                      Object.keys(t).forEach(function (n) {
                        e.input.headers.append(n, t[n]);
                      });
                  else {
                    e.init = ts(e.init);
                    var r = [];
                    e.init.headers instanceof Headers
                      ? e.init.headers.forEach(function (t, e) {
                          r.push([e, t]);
                        })
                      : Array.isArray(e.init.headers)
                        ? e.init.headers.forEach(function (t) {
                            r.push(t);
                          })
                        : e.init.headers &&
                          Object.keys(e.init.headers).forEach(function (t) {
                            r.push([t, e.init.headers[t]]);
                          }),
                      (e.init.headers = r.concat($(t)));
                  }
                });
              },
              traceXhr: function (e, n) {
                return ni(t, e, tf, function (t) {
                  Object.keys(t).forEach(function (e) {
                    n.setRequestHeader(e, t[e]);
                  });
                });
              },
            }),
              (function (t, e, n) {
                var r;
                (!h &&
                  ((r = e),
                  (h = new ty(function (t) {
                    var e = eS(XMLHttpRequest.prototype, "open", nb).stop,
                      n = eS(
                        XMLHttpRequest.prototype,
                        "send",
                        function (e) {
                          !(function (t, e, n) {
                            var r = t.target,
                              i = t.handlingStack,
                              o = n_.get(r);
                            if (o) {
                              (o.state = "start"),
                                (o.startClocks = t4()),
                                (o.isAborted = !1),
                                (o.xhr = r),
                                (o.handlingStack = i);
                              var a = !1,
                                s = eS(r, "onreadystatechange", function () {
                                  r.readyState === XMLHttpRequest.DONE && u();
                                }).stop,
                                u = function () {
                                  if ((c(), s(), !a)) {
                                    var t;
                                    (a = !0),
                                      (o.state = "complete"),
                                      (t = o.startClocks.timeStamp),
                                      (o.duration = t5() - t),
                                      (o.status = r.status),
                                      n.notify(ts(o));
                                  }
                                },
                                c = tS(e, r, "loadend", u).stop;
                              n.notify(o);
                            }
                          })(e, r, t);
                        },
                        { computeHandlingStack: !0 },
                      ).stop,
                      i = eS(XMLHttpRequest.prototype, "abort", nw).stop;
                    return function () {
                      e(), n(), i();
                    };
                  }))),
                h).subscribe(function (e) {
                  if (nA(e.url))
                    switch (e.state) {
                      case "start":
                        n.traceXhr(e, e.xhr),
                          (e.requestIndex = nP()),
                          t.notify(7, {
                            requestIndex: e.requestIndex,
                            url: e.url,
                          });
                        break;
                      case "complete":
                        n.clearTracingIfNeeded(e),
                          t.notify(8, {
                            duration: e.duration,
                            method: e.method,
                            requestIndex: e.requestIndex,
                            spanId: e.spanId,
                            startClocks: e.startClocks,
                            status: e.status,
                            traceId: e.traceId,
                            traceSampled: e.traceSampled,
                            type: "xhr",
                            url: e.url,
                            xhr: e.xhr,
                            isAborted: e.isAborted,
                            handlingStack: e.handlingStack,
                          });
                    }
                });
              })(J, t, H),
              (C = J),
              (R = H),
              eT().subscribe(function (t) {
                if (nA(t.url))
                  switch (t.state) {
                    case "start":
                      R.traceFetch(t),
                        (t.requestIndex = nP()),
                        C.notify(7, {
                          requestIndex: t.requestIndex,
                          url: t.url,
                        });
                      break;
                    case "resolve":
                      var e, n, r, i;
                      (e = t),
                        (n = function (e) {
                          R.clearTracingIfNeeded(t),
                            C.notify(8, {
                              duration: e,
                              method: t.method,
                              requestIndex: t.requestIndex,
                              responseType: t.responseType,
                              spanId: t.spanId,
                              startClocks: t.startClocks,
                              status: t.status,
                              traceId: t.traceId,
                              traceSampled: t.traceSampled,
                              type: "fetch",
                              url: t.url,
                              response: t.response,
                              init: t.init,
                              input: t.input,
                              isAborted: t.isAborted,
                              handlingStack: t.handlingStack,
                            });
                        }),
                        (i =
                          e.response &&
                          (function (t) {
                            try {
                              return t.clone();
                            } catch (t) {
                              return;
                            }
                          })(e.response)) && i.body
                          ? (function (t, e, n) {
                              var r = t.getReader(),
                                i = [],
                                o = 0;
                              function a() {
                                if (
                                  (r.cancel().catch(ti), n.collectStreamBody)
                                ) {
                                  if (1 === i.length) s = i[0];
                                  else {
                                    var t,
                                      a,
                                      s = new Uint8Array(o),
                                      u = 0;
                                    i.forEach(function (t) {
                                      s.set(t, u), (u += t.length);
                                    });
                                  }
                                  (t = s.slice(0, n.bytesLimit)),
                                    (a = s.length > n.bytesLimit);
                                }
                                e(void 0, t, a);
                              }
                              !(function t() {
                                r.read().then(
                                  V(function (e) {
                                    if (e.done) return void a();
                                    n.collectStreamBody && i.push(e.value),
                                      (o += e.value.length) > n.bytesLimit
                                        ? a()
                                        : t();
                                  }),
                                  V(function (t) {
                                    return e(t);
                                  }),
                                );
                              })();
                            })(
                              i.body,
                              function () {
                                var t;
                                n(((t = e.startClocks.timeStamp), t5() - t));
                              },
                              {
                                bytesLimit: Number.POSITIVE_INFINITY,
                                collectStreamBody: !1,
                              },
                            )
                          : n(((r = e.startClocks.timeStamp), t5() - r));
                  }
              });
            var e0 = (function (t, e, n) {
                function r(n) {
                  var r, i, o;
                  e.wasInPageStateDuringPeriod(
                    "frozen",
                    n.startClocks.relative,
                    n.duration,
                  ) ||
                    t.notify(
                      12,
                      ((i = !0),
                      (o = {
                        date: (r = n).startClocks.timeStamp,
                        vital: {
                          id: ep(),
                          type: r.type,
                          name: r.name,
                          duration: t2(r.duration),
                          description: r.description,
                        },
                        type: "vital",
                      }),
                      i && (o._dd = { vital: { computed_value: !0 } }),
                      {
                        rawRumEvent: o,
                        startTime: r.startClocks.relative,
                        customerContext: r.context,
                        domainContext: {},
                      }),
                    );
                }
                return {
                  addDurationVital: r,
                  startDurationVital: function (t, e) {
                    return void 0 === e && (e = {}), eg(n, t, e);
                  },
                  stopDurationVital: function (t, e) {
                    void 0 === e && (e = {}), ey(r, n, t, e);
                  },
                };
              })(J, tP, c),
              e1 =
                ((Y = t.applicationId),
                {
                  get: function (t) {
                    var e = tZ.findView(t),
                      n = ee.findUrl(t),
                      r = tf.findTrackedSession(t);
                    if (r && e && n) {
                      var i = en.findActionId(t);
                      return {
                        application_id: Y,
                        session_id: r.id,
                        user_action: i ? { id: i } : void 0,
                        view: {
                          id: e.id,
                          name: e.name,
                          referrer: n.referrer,
                          url: n.url,
                        },
                      };
                    }
                  },
                });
            return {
              addAction: ei,
              addError: eZ,
              addTiming: ef,
              addFeatureFlagEvaluation: ta.addFeatureFlagEvaluation,
              startView: eh,
              setViewContext: ek,
              setViewContextProperty: ex,
              setViewName: em,
              lifeCycle: J,
              viewHistory: tZ,
              session: tf,
              stopSession: function () {
                return tf.expire();
              },
              getInternalContext: e1.get,
              startDurationVital: e0.startDurationVital,
              stopDurationVital: e0.stopDurationVital,
              addDurationVital: e0.addDurationVital,
              stop: function () {
                K.forEach(function (t) {
                  return t();
                });
              },
            };
          },
          (function (t, e) {
            if ((ew() && !eb("records")) || !i6())
              return {
                start: ti,
                stop: ti,
                getReplayStats: function () {},
                onRumStart: ti,
                isRecording: function () {
                  return !1;
                },
                getSessionReplayLink: function () {},
              };
            var n,
              r =
                ((n = 0),
                {
                  strategy: {
                    start: function () {
                      n = 1;
                    },
                    stop: function () {
                      n = 2;
                    },
                    isRecording: function () {
                      return !1;
                    },
                    getSessionReplayLink: ti,
                  },
                  shouldStartImmediately: function (t) {
                    return (
                      1 === n ||
                      (0 === n && !t.startSessionReplayRecordingManually)
                    );
                  },
                }),
              i = r.strategy,
              o = r.shouldStartImmediately;
            return {
              start: function (t) {
                return i.start(t);
              },
              stop: function () {
                return i.stop();
              },
              getSessionReplayLink: function () {
                return i.getSessionReplayLink();
              },
              onRumStart: function (e, n, r, a, s) {
                var u;
                (i = (function (t, e, n, r, i, o) {
                  var a,
                    s = 0;
                  function u(u) {
                    var c,
                      l,
                      d,
                      f,
                      p,
                      h = n.findTrackedSession();
                    if (
                      ((c = h),
                      (l = u),
                      !c || (0 === c.sessionReplay && (!l || !l.force)))
                    ) {
                      s = 1;
                      return;
                    }
                    2 !== (d = s) &&
                      3 !== d &&
                      ((s = 2),
                      rP(t, "interactive", function () {
                        if (2 === s) {
                          var u = o();
                          if (!u) {
                            s = 0;
                            return;
                          }
                          (a = i(e, t, n, r, u).stop), (s = 3);
                        }
                      }),
                      (f = h),
                      (p = u) &&
                        p.force &&
                        0 === f.sessionReplay &&
                        n.setForcedReplay());
                  }
                  function c() {
                    0 !== s && 3 === s && (null == a || a()), (s = 0);
                  }
                  return (
                    e.subscribe(9, function () {
                      (2 === s || 3 === s) && (c(), (s = 1));
                    }),
                    e.subscribe(11, function (t) {
                      t.reason === ns.UNLOADING && c();
                    }),
                    e.subscribe(10, function () {
                      1 === s && u();
                    }),
                    {
                      start: u,
                      stop: c,
                      getSessionReplayLink: function () {
                        var e, i, o, a, u, c, l, d, f, p, h, m, v, g, y, _;
                        return (
                          (e = 0 !== s),
                          (m = i = n.findTrackedSession()),
                          (v = e),
                          (o = i6()
                            ? m
                              ? 0 === m.sessionReplay
                                ? "incorrect-session-plan"
                                : v
                                  ? void 0
                                  : "replay-not-started"
                              : "rum-not-tracked"
                            : "browser-not-supported"),
                          (a = r.findView()),
                          (c = (u = {
                            viewContext: a,
                            errorType: o,
                            session: i,
                          }).session),
                          (l = u.viewContext),
                          (d = u.errorType),
                          (f = c ? c.id : "no-session-id"),
                          (p = []),
                          void 0 !== d && p.push("error-type=".concat(d)),
                          l &&
                            (p.push("seed=".concat(l.id)),
                            p.push("from=".concat(l.startClocks.timeStamp))),
                          (y = (g = t).site),
                          (_ =
                            g.subdomain ||
                            (function (t) {
                              switch (t.site) {
                                case tK:
                                case "datadoghq.eu":
                                  return "app";
                                case tW:
                                  return "dd";
                                default:
                                  return;
                              }
                            })(g)),
                          (h = "https://"
                            .concat(_ ? "".concat(_, ".") : "")
                            .concat(y)),
                          ""
                            .concat(h)
                            .concat("/rum/replay/sessions/".concat(f), "?")
                            .concat(p.join("&"))
                        );
                      },
                      isRecording: function () {
                        return 3 === s;
                      },
                    }
                  );
                })(n, e, r, a, t, function () {
                  return (
                    !u &&
                      (null != s ||
                        (s = i3(
                          n,
                          "Datadog Session Replay",
                          function () {
                            i.stop();
                          },
                          void 0,
                        )),
                      s && (u = i0(n, s, 1))),
                    u
                  );
                })),
                  o(n) && i.start();
              },
              isRecording: function () {
                return 3 === i2.status && i.isRecording();
              },
              getReplayStats: function (t) {
                return 3 === i2.status
                  ? null == E
                    ? void 0
                    : E.get(t)
                  : void 0;
              },
            };
          })(function (t, e, n, r, i, o) {
            var a,
              s = [],
              u =
                o ||
                ii(e.sessionReplayEndpointBuilder, 6e4, function (e) {
                  t.notify(14, { error: e }),
                    eu("Error reported to customer", {
                      "error.message": e.message,
                    });
                });
            if (ew())
              a = ((c = e_()),
              {
                addRecord: function (t) {
                  var e = r.findView();
                  c.send("record", t, e.id);
                },
              }).addRecord;
            else {
              var c,
                l = (function (t, e, n, r) {
                  var i = { status: 0, nextSegmentCreationReason: "init" },
                    o = t.subscribe(2, function () {
                      s("view_change");
                    }).unsubscribe,
                    a = t.subscribe(11, function (t) {
                      s(t.reason);
                    }).unsubscribe;
                  function s(t) {
                    1 === i.status &&
                      (i.segment.flush(function (e, r) {
                        var i,
                          o,
                          a,
                          s,
                          u =
                            ((i = r.output),
                            (o = r.rawBytesCount),
                            (a = new FormData()).append(
                              "segment",
                              new Blob([i], {
                                type: "application/octet-stream",
                              }),
                              "".concat(e.session.id, "-").concat(e.start),
                            ),
                            (s = JSON.stringify(
                              W(
                                {
                                  raw_segment_size: o,
                                  compressed_segment_size: i.byteLength,
                                },
                                e,
                              ),
                            )),
                            a.append(
                              "event",
                              new Blob([s], { type: "application/json" }),
                            ),
                            { data: a, bytesCount: i.byteLength });
                        B(H(ns), t) ? n.sendOnExit(u) : n.send(u);
                      }),
                      tt(i.expirationTimeoutId)),
                      (i =
                        "stop" !== t
                          ? { status: 0, nextSegmentCreationReason: t }
                          : { status: 2 });
                  }
                  return {
                    addRecord: function (t) {
                      if (2 !== i.status) {
                        if (0 === i.status) {
                          var n = e();
                          if (!n) return;
                          i = {
                            status: 1,
                            segment: (function (t) {
                              var e = t.context,
                                n = t.creationReason,
                                r = t.encoder,
                                i = 0,
                                o = e.view.id,
                                a = W(
                                  {
                                    start: 1 / 0,
                                    end: -1 / 0,
                                    creation_reason: n,
                                    records_count: 0,
                                    has_full_snapshot: !1,
                                    index_in_view: iy(o).segments_count,
                                    source: "browser",
                                  },
                                  e,
                                );
                              return (
                                (iy(o).segments_count += 1),
                                {
                                  addRecord: function (t, e) {
                                    (a.start = Math.min(a.start, t.timestamp)),
                                      (a.end = Math.max(a.end, t.timestamp)),
                                      (a.records_count += 1),
                                      a.has_full_snapshot ||
                                        (a.has_full_snapshot =
                                          t.type === iR.FullSnapshot);
                                    var n = r.isEmpty ? '{"records":[' : ",";
                                    r.write(
                                      n + JSON.stringify(t),
                                      function (t) {
                                        e((i += t));
                                      },
                                    );
                                  },
                                  flush: function (t) {
                                    if (r.isEmpty)
                                      throw Error("Empty segment flushed");
                                    r.write(
                                      "],".concat(
                                        JSON.stringify(a).slice(1),
                                        "\n",
                                      ),
                                    ),
                                      r.finish(function (e) {
                                        var n, r;
                                        (n = a.view.id),
                                          (r = e.rawBytesCount),
                                          (iy(n).segments_total_raw_size += r),
                                          t(a, e);
                                      });
                                  },
                                }
                              );
                            })({
                              encoder: r,
                              context: n,
                              creationReason: i.nextSegmentCreationReason,
                            }),
                            expirationTimeoutId: Z(function () {
                              s("segment_duration_limit");
                            }, 5e3),
                          };
                        }
                        i.segment.addRecord(t, function (t) {
                          t > 6e4 && s("segment_bytes_limit");
                        });
                      }
                    },
                    stop: function () {
                      s("stop"), o(), a();
                    },
                  };
                })(
                  t,
                  function () {
                    var t = e.applicationId,
                      i = n,
                      o = r,
                      a = i.findTrackedSession(),
                      s = o.findView();
                    return a && s
                      ? {
                          application: { id: t },
                          session: { id: a.id },
                          view: { id: s.id },
                        }
                      : void 0;
                  },
                  u,
                  i,
                );
              (a = l.addRecord), s.push(l.stop);
            }
            var d = (function (t) {
              var e,
                n,
                r,
                i,
                o,
                a,
                s,
                u,
                c,
                l,
                d,
                f,
                p,
                h,
                m = t.emit,
                v = t.configuration,
                g = t.lifeCycle;
              if (!m) throw Error("emit function is required");
              var y = function (e) {
                  var n;
                  m(e),
                    t7("record", { record: e }),
                    (n = t.viewHistory.findView().id),
                    (iy(n).records_count += 1);
                },
                _ =
                  ((e = new WeakMap()),
                  {
                    set: function (t, n) {
                      (t !== document || document.scrollingElement) &&
                        e.set(
                          t === document ? document.scrollingElement : t,
                          n,
                        );
                    },
                    get: function (t) {
                      return e.get(t);
                    },
                    has: function (t) {
                      return e.has(t);
                    },
                  }),
                b = iZ(v, y, _),
                w = ((n = S),
                (r = function (t) {
                  return t.forEach(function (t) {
                    return y(t);
                  });
                })(
                  (i = function (t, e) {
                    void 0 === t && (t = t5()),
                      void 0 === e &&
                        (e = {
                          status: 0,
                          elementsScrollPositions: _,
                          shadowRootsController: b,
                        });
                    var n = r0(),
                      r = n.width,
                      i = [
                        {
                          data: {
                            height: n.height,
                            href: window.location.href,
                            width: r,
                          },
                          type: iR.Meta,
                          timestamp: t,
                        },
                        {
                          data: { has_focus: document.hasFocus() },
                          type: iR.Focus,
                          timestamp: t,
                        },
                        {
                          data: {
                            node: iV(document, {
                              serializationContext: e,
                              parentNodePrivacyLevel: v.defaultPrivacyLevel,
                              configuration: v,
                            }),
                            initialOffset: { left: rX(), top: rQ() },
                          },
                          type: iR.FullSnapshot,
                          timestamp: t,
                        },
                      ];
                    return (
                      window.visualViewport &&
                        i.push({
                          data: iH(window.visualViewport),
                          type: iR.VisualViewport,
                          timestamp: t,
                        }),
                      i
                    );
                  })(),
                ),
                {
                  stop: g.subscribe(2, function (t) {
                    n(),
                      r(
                        i(t.startClocks.timeStamp, {
                          shadowRootsController: b,
                          status: 1,
                          elementsScrollPositions: _,
                        }),
                      );
                  }).unsubscribe,
                }).stop;
              function S() {
                b.flush(), x.flush();
              }
              var k =
                  ((o = new WeakMap()),
                  (a = 1),
                  {
                    getIdForEvent: function (t) {
                      return o.has(t) || o.set(t, a++), o.get(t);
                    },
                  }),
                x = iQ(y, v, b, document),
                E = [
                  x,
                  ((u = (s = tr(
                    function (t) {
                      var e = iF(t);
                      if (ib(e)) {
                        var n = iY(t);
                        if (!n) return;
                        var r = { id: iw(e), timeOffset: 0, x: n.x, y: n.y };
                        y(
                          i$(iB(t) ? iO.TouchMove : iO.MouseMove, {
                            positions: [r],
                          }),
                        );
                      }
                    },
                    50,
                    { trailing: !1 },
                  )).throttled),
                  (c = s.cancel),
                  (l = tk(v, document, ["mousemove", "touchmove"], u, {
                    capture: !0,
                    passive: !0,
                  }).stop),
                  {
                    stop: function () {
                      l(), c();
                    },
                  }),
                  tk(
                    v,
                    document,
                    Object.keys(iW),
                    function (t) {
                      var e,
                        n = iF(t);
                      if (n3(n, v.defaultPrivacyLevel) !== nZ.HIDDEN && ib(n)) {
                        var r = iw(n),
                          i = iW[t.type];
                        if (i !== iN.Blur && i !== iN.Focus) {
                          var o = iY(t);
                          if (!o) return;
                          e = { id: r, type: i, x: o.x, y: o.y };
                        } else e = { id: r, type: i };
                        y(
                          W(
                            { id: k.getIdForEvent(t) },
                            i$(iO.MouseInteraction, e),
                          ),
                        );
                      }
                    },
                    { capture: !0, passive: !0 },
                  ),
                  iK(v, y, _, document),
                  ((d = rZ(v).subscribe(function (t) {
                    y(i$(iO.ViewportResize, t));
                  })),
                  {
                    stop: function () {
                      d.unsubscribe();
                    },
                  }),
                  iX(v, y),
                  tk(
                    v,
                    document,
                    ["play", "pause"],
                    function (t) {
                      var e = iF(t);
                      e &&
                        n3(e, v.defaultPrivacyLevel) !== nZ.HIDDEN &&
                        ib(e) &&
                        y(
                          i$(iO.MediaInteraction, {
                            id: iw(e),
                            type: "play" === t.type ? iD.Play : iD.Pause,
                          }),
                        );
                    },
                    { capture: !0, passive: !0 },
                  ),
                  (function (t) {
                    function e(t, e) {
                      t && ib(t.ownerNode) && e(iw(t.ownerNode));
                    }
                    var n = [
                      eS(CSSStyleSheet.prototype, "insertRule", function (n) {
                        var r = n.target,
                          i = n.parameters,
                          o = i[0],
                          a = i[1];
                        e(r, function (e) {
                          return t(
                            i$(iO.StyleSheetRule, {
                              id: e,
                              adds: [{ rule: o, index: a }],
                            }),
                          );
                        });
                      }),
                      eS(CSSStyleSheet.prototype, "deleteRule", function (n) {
                        var r = n.target,
                          i = n.parameters[0];
                        e(r, function (e) {
                          return t(
                            i$(iO.StyleSheetRule, {
                              id: e,
                              removes: [{ index: i }],
                            }),
                          );
                        });
                      }),
                    ];
                    function r(r) {
                      n.push(
                        eS(r.prototype, "insertRule", function (n) {
                          var r = n.target,
                            i = n.parameters,
                            o = i[0],
                            a = i[1];
                          e(r.parentStyleSheet, function (e) {
                            var n = iJ(r);
                            n &&
                              (n.push(a || 0),
                              t(
                                i$(iO.StyleSheetRule, {
                                  id: e,
                                  adds: [{ rule: o, index: n }],
                                }),
                              ));
                          });
                        }),
                        eS(r.prototype, "deleteRule", function (n) {
                          var r = n.target,
                            i = n.parameters[0];
                          e(r.parentStyleSheet, function (e) {
                            var n = iJ(r);
                            n &&
                              (n.push(i),
                              t(
                                i$(iO.StyleSheetRule, {
                                  id: e,
                                  removes: [{ index: n }],
                                }),
                              ));
                          });
                        }),
                      );
                    }
                    return (
                      "undefined" != typeof CSSGroupingRule
                        ? r(CSSGroupingRule)
                        : (r(CSSMediaRule), r(CSSSupportsRule)),
                      {
                        stop: function () {
                          n.forEach(function (t) {
                            return t.stop();
                          });
                        },
                      }
                    );
                  })(y),
                  tk(v, window, ["focus", "blur"], function () {
                    y({
                      data: { has_focus: document.hasFocus() },
                      type: iR.Focus,
                      timestamp: t5(),
                    });
                  }),
                  (function (t, e) {
                    var n = window.visualViewport;
                    if (!n) return { stop: ti };
                    var r = tr(
                        function () {
                          e({
                            data: iH(n),
                            type: iR.VisualViewport,
                            timestamp: t5(),
                          });
                        },
                        200,
                        { trailing: !1 },
                      ),
                      i = r.throttled,
                      o = r.cancel,
                      a = tk(t, n, ["resize", "scroll"], i, {
                        capture: !0,
                        passive: !0,
                      }).stop;
                    return {
                      stop: function () {
                        a(), o();
                      },
                    };
                  })(v, y),
                  ((f = g.subscribe(12, function (t) {
                    var e, n;
                    "action" === t.rawRumEvent.type &&
                      "click" === t.rawRumEvent.action.type &&
                      (null ==
                      (n =
                        null == (e = t.rawRumEvent.action.frustration)
                          ? void 0
                          : e.type)
                        ? void 0
                        : n.length) &&
                      "events" in t.domainContext &&
                      t.domainContext.events &&
                      t.domainContext.events.length &&
                      y({
                        timestamp: t.rawRumEvent.date,
                        type: iR.FrustrationRecord,
                        data: {
                          frustrationTypes:
                            t.rawRumEvent.action.frustration.type,
                          recordIds: t.domainContext.events.map(function (t) {
                            return k.getIdForEvent(t);
                          }),
                        },
                      });
                  })),
                  {
                    stop: function () {
                      f.unsubscribe();
                    },
                  }),
                  ((p = function (t) {
                    S(), y(t);
                  }),
                  (h = g.subscribe(5, function () {
                    p({ timestamp: t5(), type: iR.ViewEnd });
                  })),
                  {
                    stop: function () {
                      h.unsubscribe();
                    },
                  }),
                ];
              return {
                stop: function () {
                  b.stop(),
                    E.forEach(function (t) {
                      return t.stop();
                    }),
                    w();
                },
                flushMutations: S,
                shadowRootsController: b,
              };
            })({
              emit: a,
              configuration: e,
              lifeCycle: t,
              viewHistory: r,
            }).stop;
            return (
              s.push(d),
              {
                stop: function () {
                  s.forEach(function (t) {
                    return t();
                  });
                },
              }
            );
          }),
          { startDeflateWorker: i3, createDeflateEncoder: i0 },
        );
        !(function (t, e, n) {
          var r = t[e];
          r &&
            !r.q &&
            r.version &&
            O.warn(
              "SDK is loaded more than once. This is unsupported and might have unexpected behavior.",
            ),
            (t[e] = n),
            r &&
              r.q &&
              r.q.forEach(function (t) {
                return P(t, "onReady callback threw an error:")();
              });
        })(K(), "DD_RUM", i4);
        class i8 {
          async get(t) {
            let e = this.store.get(t);
            return e
              ? e.expires && Date.now() > e.expires
                ? (this.store.delete(t), null)
                : e.value
              : null;
          }
          async set(t, e, n) {
            let r = n ? Date.now() + 1e3 * n : void 0;
            this.store.set(t, { value: e, expires: r });
          }
          async delete(t) {
            this.store.delete(t);
          }
          async clear() {
            this.store.clear();
          }
          constructor() {
            this.store = new Map();
          }
        }
        new i8();
        var i9 = n(26457);
        let i7 = [],
          ot = null;
        async function oe() {
          if ((ot && clearTimeout(ot), 0 === i7.length)) {
            ot = setTimeout(oe, 5e3);
            return;
          }
          let t = i7.splice(0, 50);
          try {
            let e = await (0, i9.AG)();
            await e
              .from("analytics_events")
              .insert(
                t.map((t) => ({
                  event_name: t.name,
                  properties: t.properties,
                  user_id: t.userId,
                  timestamp: t.timestamp || new Date().toISOString(),
                  session_id: t.sessionId,
                })),
              );
          } catch (e) {
            console.error("Failed to process event batch:", e),
              (i7 = [...t, ...i7]);
          }
          ot = setTimeout(oe, 5e3);
        }
        async function on(t) {
          try {
            let e = i4.getInternalContext();
            e &&
              i4.addAction(t.name, {
                ...t.properties,
                timestamp: t.timestamp,
                session_id: t.sessionId,
              }),
              i7.push({
                ...t,
                timestamp: t.timestamp || new Date().toISOString(),
                sessionId: t.sessionId || e?.session_id,
              }),
              i7.length >= 50 && oe();
          } catch (t) {
            console.error("Failed to track event:", t);
          }
        }
      },
      6960: (t) => {
        var e = Object.defineProperty,
          n = Object.getOwnPropertyDescriptor,
          r = Object.getOwnPropertyNames,
          i = Object.prototype.hasOwnProperty,
          o = {};
        ((t, n) => {
          for (var r in n) e(t, r, { get: n[r], enumerable: !0 });
        })(o, {
          CITY_HEADER_NAME: () => a,
          COUNTRY_HEADER_NAME: () => s,
          EMOJI_FLAG_UNICODE_STARTING_POSITION: () => h,
          IP_HEADER_NAME: () => u,
          LATITUDE_HEADER_NAME: () => c,
          LONGITUDE_HEADER_NAME: () => l,
          POSTAL_CODE_HEADER_NAME: () => f,
          REGION_HEADER_NAME: () => d,
          REQUEST_ID_HEADER_NAME: () => p,
          geolocation: () => g,
          ipAddress: () => v,
        }),
          (t.exports = ((t, o, a, s) => {
            if ((o && "object" == typeof o) || "function" == typeof o)
              for (let u of r(o))
                i.call(t, u) ||
                  u === a ||
                  e(t, u, {
                    get: () => o[u],
                    enumerable: !(s = n(o, u)) || s.enumerable,
                  });
            return t;
          })(e({}, "__esModule", { value: !0 }), o));
        let a = "x-vercel-ip-city",
          s = "x-vercel-ip-country",
          u = "x-real-ip",
          c = "x-vercel-ip-latitude",
          l = "x-vercel-ip-longitude",
          d = "x-vercel-ip-country-region",
          f = "x-vercel-ip-postal-code",
          p = "x-vercel-id",
          h = 127397;
        function m(t, e) {
          return t.get(e) ?? void 0;
        }
        function v(t) {
          return m("headers" in t ? t.headers : t, u);
        }
        function g(t) {
          var e;
          return {
            city: (function (t, e) {
              let n = m(t.headers, e);
              return n ? decodeURIComponent(n) : void 0;
            })(t, a),
            country: m(t.headers, s),
            flag: (function (t) {
              let e = RegExp("^[A-Z]{2}$").test(t);
              if (t && e)
                return String.fromCodePoint(
                  ...t.split("").map((t) => h + t.charCodeAt(0)),
                );
            })(m(t.headers, s)),
            countryRegion: m(t.headers, d),
            region: (e = m(t.headers, p)) ? e.split(":")[0] : "dev1",
            latitude: m(t.headers, c),
            longitude: m(t.headers, l),
            postalCode: m(t.headers, f),
          };
        }
      },
      8086: (t) => {
        t.exports = require("module");
      },
      8692: (t, e, n) => {
        var r = Object.defineProperty,
          i = Object.getOwnPropertyDescriptor,
          o = Object.getOwnPropertyNames,
          a = Object.prototype.hasOwnProperty,
          s = {};
        ((t, e) => {
          for (var n in e) r(t, n, { get: e[n], enumerable: !0 });
        })(s, { waitUntil: () => c }),
          (t.exports = ((t, e, n, s) => {
            if ((e && "object" == typeof e) || "function" == typeof e)
              for (let u of o(e))
                a.call(t, u) ||
                  u === n ||
                  r(t, u, {
                    get: () => e[u],
                    enumerable: !(s = i(e, u)) || s.enumerable,
                  });
            return t;
          })(r({}, "__esModule", { value: !0 }), s));
        var u = n(62784);
        let c = (t) => {
          if (null === t || "object" != typeof t || "function" != typeof t.then)
            throw TypeError(
              `waitUntil can only be called with a Promise, got ${typeof t}`,
            );
          return (0, u.getContext)().waitUntil?.(t);
        };
      },
      10846: (t) => {
        t.exports = require("next/dist/compiled/next-server/app-page.runtime.prod.js");
      },
      11997: (t) => {
        t.exports = require("punycode");
      },
      19771: (t) => {
        t.exports = require("process");
      },
      20716: (t, e, n) => {
        n.a(t, async (t, r) => {
          try {
            n.d(e, { cn: () => c, lk: () => l, p1: () => d });
            var i = n(85488),
              o = n(31399),
              a = n(63775),
              s = n(54710),
              u = t([i]);
            function c(...t) {
              return (0, s.QP)((0, a.$)(t));
            }
            function l() {
              return "undefined" != typeof crypto && crypto.randomUUID
                ? crypto.randomUUID()
                : "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
                    /[xy]/g,
                    function (t) {
                      let e = (16 * Math.random()) | 0;
                      return ("x" === t ? e : (3 & e) | 8).toString(16);
                    },
                  );
            }
            function d() {
              var t = (0, i.generateId)(12);
              let e = (0, o.uP)(10);
              return (0, o.Y8)(t, e);
            }
            (i = (u.then ? (await u)() : u)[0]), r();
          } catch (t) {
            r(t);
          }
        });
      },
      20764: (t, e, n) => {
        let r, i;
        n.d(e, { v3: () => b, b9: () => w, Gs: () => C });
        var o = n(61190),
          a = n(13772),
          s = n(33850);
        let u = { INTERNAL: 0 },
          c = { OK: 1, ERROR: 2 };
        process.env.OTEL_SERVICE_NAME,
          process.env.OTEL_SERVICE_VERSION,
          process.env.OTEL_CONSOLE_EXPORTER,
          process.env.OTEL_METRICS_ENABLED,
          parseFloat(process.env.OTEL_SAMPLE_RATE || "1.0");
        let l = !1,
          d = () => ({
            setAttributes: () => {},
            setStatus: () => {},
            recordException: () => {},
            end: () => {},
            spanContext: () => ({ traceId: `mock-trace-${Date.now()}` }),
          }),
          f = () => ({ startSpan: () => d() }),
          p = () => ({
            createCounter: () => ({ add: () => {} }),
            createHistogram: () => ({ record: () => {} }),
          });
        function h() {
          l || (f(), (i = p()), (l = !0));
        }
        function m() {
          return l || h(), i;
        }
        let v = {
          requestCounter: m().createCounter("chat_requests_total", {
            description: "Total number of chat API requests",
          }),
          requestDuration: m().createHistogram("chat_request_duration_ms", {
            description: "Duration of chat API requests in milliseconds",
          }),
          tokenUsage: m().createHistogram("chat_tokens_used", {
            description: "Number of tokens used in chat completions",
          }),
          authCounter: m().createCounter("auth_attempts_total", {
            description: "Total number of authentication attempts",
          }),
          guestSessionCounter: m().createCounter("guest_sessions_total", {
            description: "Total number of guest sessions created",
          }),
          errorCounter: m().createCounter("errors_total", {
            description: "Total number of errors by type",
          }),
        };
        async function g(t, e) {
          let n = d();
          try {
            let t = await e(n);
            return n.setStatus({ code: c.OK }), t;
          } catch (t) {
            throw (
              (n.recordException(t instanceof Error ? t : Error(String(t))),
              n.setStatus({
                code: c.ERROR,
                message: t instanceof Error ? t.message : String(t),
              }),
              t)
            );
          } finally {
            n.end();
          }
        }
        let y = {
          traceAuthAttempt: (t, e, n) =>
            g(
              {
                name: `auth.${t}`,
                kind: u.INTERNAL,
                userId: e,
                isGuest: n,
                attributes: { "auth.method": t },
              },
              async (e) => {
                v.authCounter.add(1, { method: t, is_guest: String(n || !1) }),
                  n && v.guestSessionCounter.add(1);
              },
            ),
        };
        function _() {
          return `${Date.now()}-${Math.random().toString(36).substring(2)}`;
        }
        l || h();
        class b extends Error {
          constructor(t, e = 401, n) {
            super(t),
              (this.statusCode = e),
              (this.name = "AuthenticationError"),
              (this.correlationId = n || _());
          }
        }
        async function w(t) {
          let e = _();
          return g(
            {
              name: "auth.authenticate_request",
              attributes: {
                "auth.correlation_id": e,
                "http.user_agent": t.headers.get("user-agent") || "",
                "http.client_ip":
                  t.headers.get("x-forwarded-for") ||
                  t.headers.get("x-real-ip") ||
                  "",
              },
            },
            async (n) => {
              try {
                let r = t.headers.get("Authorization");
                if (r?.startsWith("Bearer "))
                  return (
                    n.setAttributes({ "auth.method": "bearer_token" }),
                    await S(r, e)
                  );
                let i = await k(t, e);
                if (i) return n.setAttributes({ "auth.method": "cookies" }), i;
                let o = await x(t, e);
                if (o)
                  return n.setAttributes({ "auth.method": "guest_session" }), o;
                throw new b("No valid authentication method found", 401, e);
              } catch (r) {
                if (
                  (s.v.error("Authentication failed", {
                    error: r instanceof Error ? r.message : String(r),
                    correlationId: e,
                    userAgent: t.headers.get("user-agent"),
                    ip:
                      t.headers.get("x-forwarded-for") ||
                      t.headers.get("x-real-ip"),
                    traceId: n.spanContext().traceId,
                  }),
                  r instanceof b)
                )
                  throw r;
                throw new b("Authentication service error", 500, e);
              }
            },
          );
        }
        async function S(t, e) {
          return g(
            {
              name: "auth.bearer_token",
              attributes: { "auth.correlation_id": e },
            },
            async (n) => {
              let r = t.split(" ")[1];
              if (!r) throw new b("Invalid bearer token format", 401, e);
              return g(
                {
                  name: "auth.supabase.get_user",
                  attributes: {
                    "external.service": "supabase",
                    "external.operation": "get_user",
                  },
                },
                async (t) => {
                  let i = (0, o.nH)(),
                    {
                      data: { user: a },
                      error: s,
                    } = await i.auth.getUser(r);
                  if (s || !a) throw new b("Invalid or expired token", 401, e);
                  let u = {
                    ...a,
                    fullName:
                      a.user_metadata?.full_name ||
                      a.email?.split("@")[0] ||
                      "User",
                    avatarUrl: a.user_metadata?.avatar_url || "",
                    role: a.user_metadata?.role || "client",
                    userType: "regular",
                    isGuest: !1,
                  };
                  return (
                    n.setAttributes({
                      "user.id": a.id,
                      "user.role": u.role,
                      "user.is_guest": !1,
                    }),
                    await y.traceAuthAttempt("bearer_token", a.id, !1),
                    {
                      user: u,
                      token: r,
                      isGuest: !1,
                      permissions: E(u),
                      correlationId: e,
                    }
                  );
                },
              );
            },
          );
        }
        async function k(t, e) {
          return g(
            { name: "auth.cookies", attributes: { "auth.correlation_id": e } },
            async (n) => {
              try {
                let r = await (0, o.vD)(t);
                if (!r.isAuthenticated || !r.user) return null;
                return (
                  n.setAttributes({
                    "user.id": r.user.id,
                    "user.role": r.user.role,
                    "user.is_guest": r.isGuest,
                  }),
                  await y.traceAuthAttempt("cookies", r.user.id, r.isGuest),
                  {
                    user: r.user,
                    isGuest: r.isGuest,
                    permissions: r.permissions,
                    correlationId: e,
                  }
                );
              } catch (t) {
                return (
                  s.v.warn("Cookie authentication failed", {
                    error: t,
                    correlationId: e,
                    traceId: n.spanContext().traceId,
                  }),
                  null
                );
              }
            },
          );
        }
        async function x(t, e) {
          return g(
            {
              name: "auth.guest_session",
              attributes: { "auth.correlation_id": e },
            },
            async (n) => {
              try {
                let r = (0, a.wo)({ get: (e) => t.cookies.get(e) });
                if (!r) return null;
                return (
                  n.setAttributes({
                    "user.id": r.id,
                    "user.is_guest": !0,
                    "user.session_id": r.guestSessionId || "",
                  }),
                  await y.traceAuthAttempt("guest_session", r.id, !0),
                  { user: r, isGuest: !0, permissions: E(r), correlationId: e }
                );
              } catch (t) {
                return (
                  s.v.warn("Guest authentication failed", {
                    error: t,
                    correlationId: e,
                    traceId: n.spanContext().traceId,
                  }),
                  null
                );
              }
            },
          );
        }
        function E(t) {
          if (t.isGuest)
            return [
              "chat:create",
              "chat:read:own",
              "artifacts:create",
              "artifacts:read:own",
              "session:temporary",
            ];
          switch (t.role) {
            case "admin":
              return [
                "chat:read:all",
                "chat:update:all",
                "chat:delete:all",
                "artifacts:read:all",
                "artifacts:update:all",
                "artifacts:delete:all",
                "users:read:all",
                "users:update:all",
                "system:admin",
              ];
            case "moderator":
              return [
                "chat:read:all",
                "chat:moderate",
                "artifacts:read:all",
                "artifacts:moderate",
                "users:read",
                "reports:create",
              ];
            default:
              return [
                "chat:create",
                "chat:read",
                "chat:update:own",
                "chat:delete:own",
                "artifacts:create",
                "artifacts:read",
                "artifacts:update:own",
                "artifacts:delete:own",
                "profile:read:own",
                "profile:update:own",
              ];
          }
        }
        function C(t) {
          return new Response(
            JSON.stringify({
              error: t.message,
              code: t.statusCode,
              correlationId: t.correlationId,
              timestamp: new Date().toISOString(),
            }),
            {
              status: t.statusCode,
              headers: {
                "Content-Type": "application/json",
                "X-Correlation-ID": t.correlationId,
              },
            },
          );
        }
      },
      21783: (t, e, n) => {
        n.d(e, { A: () => i });
        let r =
            /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$/i,
          i = function (t) {
            return "string" == typeof t && r.test(t);
          };
      },
      21820: (t) => {
        t.exports = require("os");
      },
      21982: (t, e, n) => {
        var r = Object.defineProperty,
          i = Object.getOwnPropertyDescriptor,
          o = Object.getOwnPropertyNames,
          a = Object.prototype.hasOwnProperty,
          s = {};
        ((t, e) => {
          for (var n in e) r(t, n, { get: e[n], enumerable: !0 });
        })(s, {
          geolocation: () => u.geolocation,
          getCache: () => f.getCache,
          getEnv: () => c.getEnv,
          ipAddress: () => u.ipAddress,
          next: () => d.next,
          rewrite: () => d.rewrite,
          waitUntil: () => l.waitUntil,
        }),
          (t.exports = ((t, e, n, s) => {
            if ((e && "object" == typeof e) || "function" == typeof e)
              for (let u of o(e))
                a.call(t, u) ||
                  u === n ||
                  r(t, u, {
                    get: () => e[u],
                    enumerable: !(s = i(e, u)) || s.enumerable,
                  });
            return t;
          })(r({}, "__esModule", { value: !0 }), s));
        var u = n(6960),
          c = n(42156),
          l = n(8692),
          d = n(62168),
          f = n(42303);
      },
      27910: (t) => {
        t.exports = require("stream");
      },
      28354: (t) => {
        t.exports = require("util");
      },
      29021: (t) => {
        t.exports = require("fs");
      },
      29294: (t) => {
        t.exports = require("next/dist/server/app-render/work-async-storage.external.js");
      },
      31421: (t) => {
        t.exports = require("node:child_process");
      },
      32940: (t, e, n) => {
        n.d(e, { n: () => u });
        var r = n(38277);
        let i = n(73346).Q.fromEnv(),
          o = {
            ocr: {
              standard: { requests: 50, window: "1 d", tokens: 3 },
              premium: { requests: 500, window: "1 d", tokens: 2 },
              enterprise: { requests: 5e3, window: "1 d", tokens: 1 },
            },
            documentQA: {
              standard: { requests: 20, window: "1 d", tokens: 5 },
              premium: { requests: 200, window: "1 d", tokens: 3 },
              enterprise: { requests: 2e3, window: "1 d", tokens: 2 },
            },
            batchProcessing: {
              standard: { requests: 5, window: "1 d", tokens: 10 },
              premium: { requests: 50, window: "1 d", tokens: 5 },
              enterprise: { requests: 500, window: "1 d", tokens: 3 },
            },
            api: {
              standard: { requests: 100, window: "1 m", tokens: 1 },
              premium: { requests: 500, window: "1 m", tokens: 1 },
              enterprise: { requests: 2e3, window: "1 m", tokens: 1 },
            },
            caseManagement: {
              standard: { requests: 100, window: "1 m", tokens: 1 },
              premium: { requests: 500, window: "1 m", tokens: 1 },
              enterprise: { requests: 2e3, window: "1 m", tokens: 1 },
            },
            documentUpload: {
              standard: { requests: 30, window: "1 m", tokens: 2 },
              premium: { requests: 100, window: "1 m", tokens: 1 },
              enterprise: { requests: 500, window: "1 m", tokens: 1 },
            },
          };
        function a(t, e) {
          let n = o[t][e];
          return new r.Ratelimit({
            redis: i,
            limiter: r.Ratelimit.slidingWindow(n.requests, n.window),
            analytics: !0,
            prefix: `hijraah:ratelimit:${t}:${e}`,
            ephemeralCache: new Map(),
          });
        }
        let s = {
          ocr: {
            standard: a("ocr", "standard"),
            premium: a("ocr", "premium"),
            enterprise: a("ocr", "enterprise"),
          },
          documentQA: {
            standard: a("documentQA", "standard"),
            premium: a("documentQA", "premium"),
            enterprise: a("documentQA", "enterprise"),
          },
          batchProcessing: {
            standard: a("batchProcessing", "standard"),
            premium: a("batchProcessing", "premium"),
            enterprise: a("batchProcessing", "enterprise"),
          },
          api: {
            standard: a("api", "standard"),
            premium: a("api", "premium"),
            enterprise: a("api", "enterprise"),
          },
          caseManagement: {
            standard: a("caseManagement", "standard"),
            premium: a("caseManagement", "premium"),
            enterprise: a("caseManagement", "enterprise"),
          },
          documentUpload: {
            standard: a("documentUpload", "standard"),
            premium: a("documentUpload", "premium"),
            enterprise: a("documentUpload", "enterprise"),
          },
        };
        class u {
          static async isAllowed(t, e, n = "standard") {
            try {
              let r = s[e]?.[n];
              if (!r)
                throw Error(
                  `No rate limiter found for action: ${e}, tier: ${n}`,
                );
              let i = await r.limit(t);
              return {
                success: i.success,
                limit: i.limit,
                remaining: i.remaining,
                reset: new Date(Date.now() + i.reset),
                pending: i.pending,
                reason: i.reason,
              };
            } catch (i) {
              console.error(`Rate limit check failed for ${e}:${n}:${t}`, i);
              let r = o[e]?.[n];
              return {
                success: !0,
                limit: r?.requests ?? 0,
                remaining: r?.requests ?? 0,
                reset: new Date(Date.now() + 6e4),
                reason: "rate_limit_error",
              };
            }
          }
          static async getRemainingLimit(t, e, n = "standard") {
            return (await this.isAllowed(t, e, n)).remaining;
          }
          static async getResetTime(t, e, n = "standard") {
            return (await this.isAllowed(t, e, n)).reset;
          }
          static async checkMultiple(t, e) {
            return Object.fromEntries(
              await Promise.all(
                e.map(async ({ action: e, tier: n }) => {
                  let r = await this.isAllowed(t, e, n);
                  return [`${e}:${n}`, r];
                }),
              ),
            );
          }
          static getRateLimitHeaders(t) {
            return {
              "X-RateLimit-Limit": String(t.limit),
              "X-RateLimit-Remaining": String(t.remaining),
              "X-RateLimit-Reset": String(Math.floor(t.reset.getTime() / 1e3)),
              "X-RateLimit-Success": String(t.success),
            };
          }
        }
      },
      33850: (t, e, n) => {
        n.d(e, { v: () => i });
        class r {
          constructor() {
            (this.logLevel = "info"),
              (this.buffer = []),
              (this.maxBufferSize = 1e3);
            let t = process.env.LOG_LEVEL;
            t &&
              ["debug", "info", "warn", "error"].includes(t) &&
              (this.logLevel = t);
          }
          static getInstance() {
            return r.instance || (r.instance = new r()), r.instance;
          }
          shouldLog(t) {
            let e = { debug: 0, info: 1, warn: 2, error: 3 };
            return e[t] >= e[this.logLevel];
          }
          formatMessage(t) {
            let e = t.context ? ` ${JSON.stringify(t.context)}` : "";
            return `[${t.timestamp}] ${t.level.toUpperCase()}: ${t.message}${e}`;
          }
          addToBuffer(t) {
            this.buffer.push(t),
              this.buffer.length > this.maxBufferSize && this.buffer.shift();
          }
          createLogEntry(t, e, n) {
            return {
              level: t,
              message: e,
              timestamp: new Date().toISOString(),
              context: n,
            };
          }
          debug(t, e) {
            if (this.shouldLog("debug")) {
              let n = this.createLogEntry("debug", t, e);
              this.addToBuffer(n);
            }
          }
          info(t, e) {
            if (this.shouldLog("info")) {
              let n = this.createLogEntry("info", t, e);
              this.addToBuffer(n);
            }
          }
          warn(t, e) {
            if (this.shouldLog("warn")) {
              let n = this.createLogEntry("warn", t, e);
              this.addToBuffer(n), console.warn(this.formatMessage(n));
            }
          }
          error(t, e, n) {
            if (this.shouldLog("error")) {
              let r = e
                  ? {
                      ...n,
                      error: {
                        name: e.name,
                        message: e.message,
                        stack: e.stack,
                      },
                    }
                  : n,
                i = this.createLogEntry("error", t, r);
              this.addToBuffer(i), console.error(this.formatMessage(i));
            }
          }
          getBuffer() {
            return [...this.buffer];
          }
          clearBuffer() {
            this.buffer = [];
          }
          setLogLevel(t) {
            this.logLevel = t;
          }
        }
        let i = r.getInstance();
      },
      33873: (t) => {
        t.exports = require("path");
      },
      34631: (t) => {
        t.exports = require("tls");
      },
      36686: (t) => {
        t.exports = require("diagnostics_channel");
      },
      37067: (t) => {
        t.exports = require("node:http");
      },
      37830: (t) => {
        t.exports = require("node:stream/web");
      },
      38522: (t) => {
        t.exports = require("node:zlib");
      },
      41692: (t) => {
        t.exports = require("node:tls");
      },
      42156: (t) => {
        var e = Object.defineProperty,
          n = Object.getOwnPropertyDescriptor,
          r = Object.getOwnPropertyNames,
          i = Object.prototype.hasOwnProperty,
          o = {};
        ((t, n) => {
          for (var r in n) e(t, r, { get: n[r], enumerable: !0 });
        })(o, { getEnv: () => a }),
          (t.exports = ((t, o, a, s) => {
            if ((o && "object" == typeof o) || "function" == typeof o)
              for (let u of r(o))
                i.call(t, u) ||
                  u === a ||
                  e(t, u, {
                    get: () => o[u],
                    enumerable: !(s = n(o, u)) || s.enumerable,
                  });
            return t;
          })(e({}, "__esModule", { value: !0 }), o));
        let a = (t = process.env) => ({
            VERCEL: s(t, "VERCEL"),
            CI: s(t, "CI"),
            VERCEL_ENV: s(t, "VERCEL_ENV"),
            VERCEL_URL: s(t, "VERCEL_URL"),
            VERCEL_BRANCH_URL: s(t, "VERCEL_BRANCH_URL"),
            VERCEL_PROJECT_PRODUCTION_URL: s(
              t,
              "VERCEL_PROJECT_PRODUCTION_URL",
            ),
            VERCEL_REGION: s(t, "VERCEL_REGION"),
            VERCEL_DEPLOYMENT_ID: s(t, "VERCEL_DEPLOYMENT_ID"),
            VERCEL_SKEW_PROTECTION_ENABLED: s(
              t,
              "VERCEL_SKEW_PROTECTION_ENABLED",
            ),
            VERCEL_AUTOMATION_BYPASS_SECRET: s(
              t,
              "VERCEL_AUTOMATION_BYPASS_SECRET",
            ),
            VERCEL_GIT_PROVIDER: s(t, "VERCEL_GIT_PROVIDER"),
            VERCEL_GIT_REPO_SLUG: s(t, "VERCEL_GIT_REPO_SLUG"),
            VERCEL_GIT_REPO_OWNER: s(t, "VERCEL_GIT_REPO_OWNER"),
            VERCEL_GIT_REPO_ID: s(t, "VERCEL_GIT_REPO_ID"),
            VERCEL_GIT_COMMIT_REF: s(t, "VERCEL_GIT_COMMIT_REF"),
            VERCEL_GIT_COMMIT_SHA: s(t, "VERCEL_GIT_COMMIT_SHA"),
            VERCEL_GIT_COMMIT_MESSAGE: s(t, "VERCEL_GIT_COMMIT_MESSAGE"),
            VERCEL_GIT_COMMIT_AUTHOR_LOGIN: s(
              t,
              "VERCEL_GIT_COMMIT_AUTHOR_LOGIN",
            ),
            VERCEL_GIT_COMMIT_AUTHOR_NAME: s(
              t,
              "VERCEL_GIT_COMMIT_AUTHOR_NAME",
            ),
            VERCEL_GIT_PREVIOUS_SHA: s(t, "VERCEL_GIT_PREVIOUS_SHA"),
            VERCEL_GIT_PULL_REQUEST_ID: s(t, "VERCEL_GIT_PULL_REQUEST_ID"),
          }),
          s = (t, e) => {
            let n = t[e];
            return "" === n ? void 0 : n;
          };
      },
      42303: (t, e, n) => {
        var r = Object.defineProperty,
          i = Object.getOwnPropertyDescriptor,
          o = Object.getOwnPropertyNames,
          a = Object.prototype.hasOwnProperty,
          s = {};
        ((t, e) => {
          for (var n in e) r(t, n, { get: e[n], enumerable: !0 });
        })(s, { getCache: () => f }),
          (t.exports = ((t, e, n, s) => {
            if ((e && "object" == typeof e) || "function" == typeof e)
              for (let u of o(e))
                a.call(t, u) ||
                  u === n ||
                  r(t, u, {
                    get: () => e[u],
                    enumerable: !(s = i(e, u)) || s.enumerable,
                  });
            return t;
          })(r({}, "__esModule", { value: !0 }), s));
        var u = n(62784),
          c = n(79670);
        let l = (t) => {
            let e = 5381;
            for (let n = 0; n < t.length; n++) e = (33 * e) ^ t.charCodeAt(n);
            return (e >>> 0).toString(16);
          },
          d = null,
          f = (t) => {
            let e = () => {
                let t = (0, u.getContext)().cache;
                return (
                  t ||
                  (d ||
                    ((d = new c.InMemoryCache()),
                    console.warn(
                      "Runtime Cache unavailable in this environment. Falling back to in-memory cache.",
                    )),
                  d)
                );
              },
              n = t?.keyHashFunction || l,
              r = (e) => {
                let r = "";
                if (t?.namespace) {
                  let e = t.namespaceSeparator || "$";
                  r = `${t.namespace}${e}`;
                }
                return `${r}${n(e)}`;
              };
            return {
              get: (t, n) => e().get(r(t), n),
              set: (t, n, i) => e().set(r(t), n, i),
              delete: (t) => e().delete(r(t)),
              expireTag: (t) => e().expireTag(t),
            };
          };
      },
      44708: (t) => {
        t.exports = require("node:https");
      },
      44870: (t) => {
        t.exports = require("next/dist/compiled/next-server/app-route.runtime.prod.js");
      },
      48161: (t) => {
        t.exports = require("node:os");
      },
      50398: (t, e, n) => {
        n.a(t, async (t, r) => {
          try {
            n.r(e),
              n.d(e, {
                patchFetch: () => c,
                routeModule: () => l,
                serverHooks: () => p,
                workAsyncStorage: () => d,
                workUnitAsyncStorage: () => f,
              });
            var i = n(94168),
              o = n(51293),
              a = n(64588),
              s = n(61819),
              u = t([s]);
            s = (u.then ? (await u)() : u)[0];
            let l = new i.AppRouteRouteModule({
                definition: {
                  kind: o.RouteKind.APP_ROUTE,
                  page: "/(ai-unified)/api/chat/route",
                  pathname: "/api/chat",
                  filename: "route",
                  bundlePath: "app/(ai-unified)/api/chat/route",
                },
                resolvedPagePath:
                  "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\(ai-unified)\\api\\chat\\route.ts",
                nextConfigOutput: "",
                userland: s,
              }),
              {
                workAsyncStorage: d,
                workUnitAsyncStorage: f,
                serverHooks: p,
              } = l;
            function c() {
              return (0, a.patchFetch)({
                workAsyncStorage: d,
                workUnitAsyncStorage: f,
              });
            }
            r();
          } catch (t) {
            r(t);
          }
        });
      },
      53053: (t) => {
        t.exports = require("node:diagnostics_channel");
      },
      55511: (t) => {
        t.exports = require("crypto");
      },
      55591: (t) => {
        t.exports = require("https");
      },
      57075: (t) => {
        t.exports = require("node:stream");
      },
      57975: (t) => {
        t.exports = require("node:util");
      },
      58184: (t, e, n) => {
        n.d(e, { P: () => x });
        var r = n(68098),
          i = n(14256),
          o = n(58342);
        function a(t) {
          var e, n;
          return null !=
            (n =
              null == (e = null == t ? void 0 : t.providerMetadata)
                ? void 0
                : e.openaiCompatible)
            ? n
            : {};
        }
        function s({ id: t, model: e, created: n }) {
          return {
            id: null != t ? t : void 0,
            modelId: null != e ? e : void 0,
            timestamp: null != n ? new Date(1e3 * n) : void 0,
          };
        }
        function u(t) {
          switch (t) {
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
        var c = {
            errorSchema: o.Ik({
              error: o.Ik({
                message: o.Yj(),
                type: o.Yj().nullish(),
                param: o.bz().nullish(),
                code: o.KC([o.Yj(), o.ai()]).nullish(),
              }),
            }),
            errorToMessage: (t) => t.error.message,
          },
          l = class {
            constructor(t, e, n) {
              var r, o;
              (this.specificationVersion = "v1"),
                (this.modelId = t),
                (this.settings = e),
                (this.config = n);
              let a = null != (r = n.errorStructure) ? r : c;
              (this.chunkSchema = p(a.errorSchema)),
                (this.failedResponseHandler = (0, i.sl)(a)),
                (this.supportsStructuredOutputs =
                  null != (o = n.supportsStructuredOutputs) && o);
            }
            get defaultObjectGenerationMode() {
              return this.config.defaultObjectGenerationMode;
            }
            get provider() {
              return this.config.provider;
            }
            get providerOptionsName() {
              return this.config.provider.split(".")[0].trim();
            }
            getArgs({
              mode: t,
              prompt: e,
              maxTokens: n,
              temperature: o,
              topP: s,
              topK: u,
              frequencyPenalty: c,
              presencePenalty: l,
              providerMetadata: d,
              stopSequences: f,
              responseFormat: p,
              seed: h,
            }) {
              var m, v, g, y, _;
              let b = t.type,
                w = [];
              null != u &&
                w.push({ type: "unsupported-setting", setting: "topK" }),
                (null == p ? void 0 : p.type) !== "json" ||
                  null == p.schema ||
                  this.supportsStructuredOutputs ||
                  w.push({
                    type: "unsupported-setting",
                    setting: "responseFormat",
                    details:
                      "JSON response format schema is only supported with structuredOutputs",
                  });
              let S = {
                model: this.modelId,
                user: this.settings.user,
                max_tokens: n,
                temperature: o,
                top_p: s,
                frequency_penalty: c,
                presence_penalty: l,
                response_format:
                  (null == p ? void 0 : p.type) === "json"
                    ? !0 === this.supportsStructuredOutputs && null != p.schema
                      ? {
                          type: "json_schema",
                          json_schema: {
                            schema: p.schema,
                            name: null != (m = p.name) ? m : "response",
                            description: p.description,
                          },
                        }
                      : { type: "json_object" }
                    : void 0,
                stop: f,
                seed: h,
                ...(null == d ? void 0 : d[this.providerOptionsName]),
                reasoning_effort:
                  null !=
                  (y =
                    null ==
                    (v = null == d ? void 0 : d[this.providerOptionsName])
                      ? void 0
                      : v.reasoningEffort)
                    ? y
                    : null == (g = null == d ? void 0 : d["openai-compatible"])
                      ? void 0
                      : g.reasoningEffort,
                messages: (function (t) {
                  let e = [];
                  for (let { role: n, content: o, ...s } of t) {
                    let t = a({ ...s });
                    switch (n) {
                      case "system":
                        e.push({ role: "system", content: o, ...t });
                        break;
                      case "user":
                        if (1 === o.length && "text" === o[0].type) {
                          e.push({
                            role: "user",
                            content: o[0].text,
                            ...a(o[0]),
                          });
                          break;
                        }
                        e.push({
                          role: "user",
                          content: o.map((t) => {
                            var e;
                            let n = a(t);
                            switch (t.type) {
                              case "text":
                                return { type: "text", text: t.text, ...n };
                              case "image":
                                return {
                                  type: "image_url",
                                  image_url: {
                                    url:
                                      t.image instanceof URL
                                        ? t.image.toString()
                                        : `data:${null != (e = t.mimeType) ? e : "image/jpeg"};base64,${(0, i.n_)(t.image)}`,
                                  },
                                  ...n,
                                };
                              case "file":
                                throw new r.b8({
                                  functionality:
                                    "File content parts in user messages",
                                });
                            }
                          }),
                          ...t,
                        });
                        break;
                      case "assistant": {
                        let n = "",
                          r = [];
                        for (let t of o) {
                          let e = a(t);
                          switch (t.type) {
                            case "text":
                              n += t.text;
                              break;
                            case "tool-call":
                              r.push({
                                id: t.toolCallId,
                                type: "function",
                                function: {
                                  name: t.toolName,
                                  arguments: JSON.stringify(t.args),
                                },
                                ...e,
                              });
                          }
                        }
                        e.push({
                          role: "assistant",
                          content: n,
                          tool_calls: r.length > 0 ? r : void 0,
                          ...t,
                        });
                        break;
                      }
                      case "tool":
                        for (let t of o) {
                          let n = a(t);
                          e.push({
                            role: "tool",
                            tool_call_id: t.toolCallId,
                            content: JSON.stringify(t.result),
                            ...n,
                          });
                        }
                        break;
                      default:
                        throw Error(`Unsupported role: ${n}`);
                    }
                  }
                  return e;
                })(e),
              };
              switch (b) {
                case "regular": {
                  let {
                    tools: e,
                    tool_choice: n,
                    toolWarnings: i,
                  } = (function ({ mode: t, structuredOutputs: e }) {
                    var n;
                    let i = (null == (n = t.tools) ? void 0 : n.length)
                        ? t.tools
                        : void 0,
                      o = [];
                    if (null == i)
                      return {
                        tools: void 0,
                        tool_choice: void 0,
                        toolWarnings: o,
                      };
                    let a = t.toolChoice,
                      s = [];
                    for (let t of i)
                      "provider-defined" === t.type
                        ? o.push({ type: "unsupported-tool", tool: t })
                        : s.push({
                            type: "function",
                            function: {
                              name: t.name,
                              description: t.description,
                              parameters: t.parameters,
                            },
                          });
                    if (null == a)
                      return { tools: s, tool_choice: void 0, toolWarnings: o };
                    let u = a.type;
                    switch (u) {
                      case "auto":
                      case "none":
                      case "required":
                        return { tools: s, tool_choice: u, toolWarnings: o };
                      case "tool":
                        return {
                          tools: s,
                          tool_choice: {
                            type: "function",
                            function: { name: a.toolName },
                          },
                          toolWarnings: o,
                        };
                      default:
                        throw new r.b8({
                          functionality: `Unsupported tool choice type: ${u}`,
                        });
                    }
                  })({
                    mode: t,
                    structuredOutputs: this.supportsStructuredOutputs,
                  });
                  return {
                    args: { ...S, tools: e, tool_choice: n },
                    warnings: [...w, ...i],
                  };
                }
                case "object-json":
                  return {
                    args: {
                      ...S,
                      response_format:
                        !0 === this.supportsStructuredOutputs &&
                        null != t.schema
                          ? {
                              type: "json_schema",
                              json_schema: {
                                schema: t.schema,
                                name: null != (_ = t.name) ? _ : "response",
                                description: t.description,
                              },
                            }
                          : { type: "json_object" },
                    },
                    warnings: w,
                  };
                case "object-tool":
                  return {
                    args: {
                      ...S,
                      tool_choice: {
                        type: "function",
                        function: { name: t.tool.name },
                      },
                      tools: [
                        {
                          type: "function",
                          function: {
                            name: t.tool.name,
                            description: t.tool.description,
                            parameters: t.tool.parameters,
                          },
                        },
                      ],
                    },
                    warnings: w,
                  };
                default:
                  throw Error(`Unsupported type: ${b}`);
              }
            }
            async doGenerate(t) {
              var e, n, r, o, a, c, l, d, p, h, m;
              let { args: v, warnings: g } = this.getArgs({ ...t }),
                y = JSON.stringify(v),
                {
                  responseHeaders: _,
                  value: b,
                  rawValue: w,
                } = await (0, i.GU)({
                  url: this.config.url({
                    path: "/chat/completions",
                    modelId: this.modelId,
                  }),
                  headers: (0, i.m2)(this.config.headers(), t.headers),
                  body: v,
                  failedResponseHandler: this.failedResponseHandler,
                  successfulResponseHandler: (0, i.cV)(f),
                  abortSignal: t.abortSignal,
                  fetch: this.config.fetch,
                }),
                { messages: S, ...k } = v,
                x = b.choices[0],
                E = {
                  [this.providerOptionsName]: {},
                  ...(null ==
                  (n =
                    null == (e = this.config.metadataExtractor)
                      ? void 0
                      : e.extractMetadata)
                    ? void 0
                    : n.call(e, { parsedBody: w })),
                },
                C =
                  null == (r = b.usage) ? void 0 : r.completion_tokens_details,
                T = null == (o = b.usage) ? void 0 : o.prompt_tokens_details;
              return (
                (null == C ? void 0 : C.reasoning_tokens) != null &&
                  (E[this.providerOptionsName].reasoningTokens =
                    null == C ? void 0 : C.reasoning_tokens),
                (null == C ? void 0 : C.accepted_prediction_tokens) != null &&
                  (E[this.providerOptionsName].acceptedPredictionTokens =
                    null == C ? void 0 : C.accepted_prediction_tokens),
                (null == C ? void 0 : C.rejected_prediction_tokens) != null &&
                  (E[this.providerOptionsName].rejectedPredictionTokens =
                    null == C ? void 0 : C.rejected_prediction_tokens),
                (null == T ? void 0 : T.cached_tokens) != null &&
                  (E[this.providerOptionsName].cachedPromptTokens =
                    null == T ? void 0 : T.cached_tokens),
                {
                  text: null != (a = x.message.content) ? a : void 0,
                  reasoning:
                    null != (c = x.message.reasoning_content) ? c : void 0,
                  toolCalls:
                    null == (l = x.message.tool_calls)
                      ? void 0
                      : l.map((t) => {
                          var e;
                          return {
                            toolCallType: "function",
                            toolCallId: null != (e = t.id) ? e : (0, i.$C)(),
                            toolName: t.function.name,
                            args: t.function.arguments,
                          };
                        }),
                  finishReason: u(x.finish_reason),
                  usage: {
                    promptTokens:
                      null !=
                      (p = null == (d = b.usage) ? void 0 : d.prompt_tokens)
                        ? p
                        : NaN,
                    completionTokens:
                      null !=
                      (m = null == (h = b.usage) ? void 0 : h.completion_tokens)
                        ? m
                        : NaN,
                  },
                  providerMetadata: E,
                  rawCall: { rawPrompt: S, rawSettings: k },
                  rawResponse: { headers: _, body: w },
                  response: s(b),
                  warnings: g,
                  request: { body: y },
                }
              );
            }
            async doStream(t) {
              var e;
              if (this.settings.simulateStreaming) {
                let e = await this.doGenerate(t);
                return {
                  stream: new ReadableStream({
                    start(t) {
                      if (
                        (t.enqueue({
                          type: "response-metadata",
                          ...e.response,
                        }),
                        e.reasoning)
                      )
                        if (Array.isArray(e.reasoning))
                          for (let n of e.reasoning)
                            "text" === n.type &&
                              t.enqueue({
                                type: "reasoning",
                                textDelta: n.text,
                              });
                        else
                          t.enqueue({
                            type: "reasoning",
                            textDelta: e.reasoning,
                          });
                      if (
                        (e.text &&
                          t.enqueue({ type: "text-delta", textDelta: e.text }),
                        e.toolCalls)
                      )
                        for (let n of e.toolCalls)
                          t.enqueue({ type: "tool-call", ...n });
                      t.enqueue({
                        type: "finish",
                        finishReason: e.finishReason,
                        usage: e.usage,
                        logprobs: e.logprobs,
                        providerMetadata: e.providerMetadata,
                      }),
                        t.close();
                    },
                  }),
                  rawCall: e.rawCall,
                  rawResponse: e.rawResponse,
                  warnings: e.warnings,
                };
              }
              let { args: n, warnings: o } = this.getArgs({ ...t }),
                a = {
                  ...n,
                  stream: !0,
                  stream_options: this.config.includeUsage
                    ? { include_usage: !0 }
                    : void 0,
                },
                c =
                  null == (e = this.config.metadataExtractor)
                    ? void 0
                    : e.createStreamExtractor(),
                { responseHeaders: l, value: d } = await (0, i.GU)({
                  url: this.config.url({
                    path: "/chat/completions",
                    modelId: this.modelId,
                  }),
                  headers: (0, i.m2)(this.config.headers(), t.headers),
                  body: a,
                  failedResponseHandler: this.failedResponseHandler,
                  successfulResponseHandler: (0, i.Ds)(this.chunkSchema),
                  abortSignal: t.abortSignal,
                  fetch: this.config.fetch,
                }),
                { messages: f, ...p } = n,
                h = [],
                m = "unknown",
                v = {
                  completionTokens: void 0,
                  completionTokensDetails: {
                    reasoningTokens: void 0,
                    acceptedPredictionTokens: void 0,
                    rejectedPredictionTokens: void 0,
                  },
                  promptTokens: void 0,
                  promptTokensDetails: { cachedTokens: void 0 },
                },
                g = !0,
                y = this.providerOptionsName;
              return {
                stream: d.pipeThrough(
                  new TransformStream({
                    transform(t, e) {
                      var n, o, a, l, d, f, p, y, _, b, w, S;
                      if (!t.success) {
                        (m = "error"),
                          e.enqueue({ type: "error", error: t.error });
                        return;
                      }
                      let k = t.value;
                      if (
                        (null == c || c.processChunk(t.rawValue), "error" in k)
                      ) {
                        (m = "error"),
                          e.enqueue({ type: "error", error: k.error.message });
                        return;
                      }
                      if (
                        (g &&
                          ((g = !1),
                          e.enqueue({ type: "response-metadata", ...s(k) })),
                        null != k.usage)
                      ) {
                        let {
                          prompt_tokens: t,
                          completion_tokens: e,
                          prompt_tokens_details: n,
                          completion_tokens_details: r,
                        } = k.usage;
                        (v.promptTokens = null != t ? t : void 0),
                          (v.completionTokens = null != e ? e : void 0),
                          (null == r ? void 0 : r.reasoning_tokens) != null &&
                            (v.completionTokensDetails.reasoningTokens =
                              null == r ? void 0 : r.reasoning_tokens),
                          (null == r ? void 0 : r.accepted_prediction_tokens) !=
                            null &&
                            (v.completionTokensDetails.acceptedPredictionTokens =
                              null == r
                                ? void 0
                                : r.accepted_prediction_tokens),
                          (null == r ? void 0 : r.rejected_prediction_tokens) !=
                            null &&
                            (v.completionTokensDetails.rejectedPredictionTokens =
                              null == r
                                ? void 0
                                : r.rejected_prediction_tokens),
                          (null == n ? void 0 : n.cached_tokens) != null &&
                            (v.promptTokensDetails.cachedTokens =
                              null == n ? void 0 : n.cached_tokens);
                      }
                      let x = k.choices[0];
                      if (
                        ((null == x ? void 0 : x.finish_reason) != null &&
                          (m = u(x.finish_reason)),
                        (null == x ? void 0 : x.delta) == null)
                      )
                        return;
                      let E = x.delta;
                      if (
                        (null != E.reasoning_content &&
                          e.enqueue({
                            type: "reasoning",
                            textDelta: E.reasoning_content,
                          }),
                        null != E.content &&
                          e.enqueue({
                            type: "text-delta",
                            textDelta: E.content,
                          }),
                        null != E.tool_calls)
                      )
                        for (let t of E.tool_calls) {
                          let s = t.index;
                          if (null == h[s]) {
                            if ("function" !== t.type)
                              throw new r.xn({
                                data: t,
                                message: "Expected 'function' type.",
                              });
                            if (null == t.id)
                              throw new r.xn({
                                data: t,
                                message: "Expected 'id' to be a string.",
                              });
                            if (
                              (null == (n = t.function) ? void 0 : n.name) ==
                              null
                            )
                              throw new r.xn({
                                data: t,
                                message:
                                  "Expected 'function.name' to be a string.",
                              });
                            h[s] = {
                              id: t.id,
                              type: "function",
                              function: {
                                name: t.function.name,
                                arguments:
                                  null != (o = t.function.arguments) ? o : "",
                              },
                              hasFinished: !1,
                            };
                            let u = h[s];
                            (null == (a = u.function) ? void 0 : a.name) !=
                              null &&
                              (null == (l = u.function)
                                ? void 0
                                : l.arguments) != null &&
                              (u.function.arguments.length > 0 &&
                                e.enqueue({
                                  type: "tool-call-delta",
                                  toolCallType: "function",
                                  toolCallId: u.id,
                                  toolName: u.function.name,
                                  argsTextDelta: u.function.arguments,
                                }),
                              (0, i.v0)(u.function.arguments) &&
                                (e.enqueue({
                                  type: "tool-call",
                                  toolCallType: "function",
                                  toolCallId:
                                    null != (d = u.id) ? d : (0, i.$C)(),
                                  toolName: u.function.name,
                                  args: u.function.arguments,
                                }),
                                (u.hasFinished = !0)));
                            continue;
                          }
                          let u = h[s];
                          !u.hasFinished &&
                            ((null == (f = t.function)
                              ? void 0
                              : f.arguments) != null &&
                              (u.function.arguments +=
                                null !=
                                (y =
                                  null == (p = t.function)
                                    ? void 0
                                    : p.arguments)
                                  ? y
                                  : ""),
                            e.enqueue({
                              type: "tool-call-delta",
                              toolCallType: "function",
                              toolCallId: u.id,
                              toolName: u.function.name,
                              argsTextDelta:
                                null != (_ = t.function.arguments) ? _ : "",
                            }),
                            (null == (b = u.function) ? void 0 : b.name) !=
                              null &&
                              (null == (w = u.function)
                                ? void 0
                                : w.arguments) != null &&
                              (0, i.v0)(u.function.arguments) &&
                              (e.enqueue({
                                type: "tool-call",
                                toolCallType: "function",
                                toolCallId:
                                  null != (S = u.id) ? S : (0, i.$C)(),
                                toolName: u.function.name,
                                args: u.function.arguments,
                              }),
                              (u.hasFinished = !0)));
                        }
                    },
                    flush(t) {
                      var e, n;
                      let r = {
                        [y]: {},
                        ...(null == c ? void 0 : c.buildMetadata()),
                      };
                      null != v.completionTokensDetails.reasoningTokens &&
                        (r[y].reasoningTokens =
                          v.completionTokensDetails.reasoningTokens),
                        null !=
                          v.completionTokensDetails.acceptedPredictionTokens &&
                          (r[y].acceptedPredictionTokens =
                            v.completionTokensDetails.acceptedPredictionTokens),
                        null !=
                          v.completionTokensDetails.rejectedPredictionTokens &&
                          (r[y].rejectedPredictionTokens =
                            v.completionTokensDetails.rejectedPredictionTokens),
                        null != v.promptTokensDetails.cachedTokens &&
                          (r[y].cachedPromptTokens =
                            v.promptTokensDetails.cachedTokens),
                        t.enqueue({
                          type: "finish",
                          finishReason: m,
                          usage: {
                            promptTokens:
                              null != (e = v.promptTokens) ? e : NaN,
                            completionTokens:
                              null != (n = v.completionTokens) ? n : NaN,
                          },
                          providerMetadata: r,
                        });
                    },
                  }),
                ),
                rawCall: { rawPrompt: f, rawSettings: p },
                rawResponse: { headers: l },
                warnings: o,
                request: { body: JSON.stringify(a) },
              };
            }
          },
          d = o
            .Ik({
              prompt_tokens: o.ai().nullish(),
              completion_tokens: o.ai().nullish(),
              prompt_tokens_details: o
                .Ik({ cached_tokens: o.ai().nullish() })
                .nullish(),
              completion_tokens_details: o
                .Ik({
                  reasoning_tokens: o.ai().nullish(),
                  accepted_prediction_tokens: o.ai().nullish(),
                  rejected_prediction_tokens: o.ai().nullish(),
                })
                .nullish(),
            })
            .nullish(),
          f = o.Ik({
            id: o.Yj().nullish(),
            created: o.ai().nullish(),
            model: o.Yj().nullish(),
            choices: o.YO(
              o.Ik({
                message: o.Ik({
                  role: o.eu("assistant").nullish(),
                  content: o.Yj().nullish(),
                  reasoning_content: o.Yj().nullish(),
                  tool_calls: o
                    .YO(
                      o.Ik({
                        id: o.Yj().nullish(),
                        type: o.eu("function"),
                        function: o.Ik({ name: o.Yj(), arguments: o.Yj() }),
                      }),
                    )
                    .nullish(),
                }),
                finish_reason: o.Yj().nullish(),
              }),
            ),
            usage: d,
          }),
          p = (t) =>
            o.KC([
              o.Ik({
                id: o.Yj().nullish(),
                created: o.ai().nullish(),
                model: o.Yj().nullish(),
                choices: o.YO(
                  o.Ik({
                    delta: o
                      .Ik({
                        role: o.k5(["assistant"]).nullish(),
                        content: o.Yj().nullish(),
                        reasoning_content: o.Yj().nullish(),
                        tool_calls: o
                          .YO(
                            o.Ik({
                              index: o.ai(),
                              id: o.Yj().nullish(),
                              type: o.eu("function").nullish(),
                              function: o.Ik({
                                name: o.Yj().nullish(),
                                arguments: o.Yj().nullish(),
                              }),
                            }),
                          )
                          .nullish(),
                      })
                      .nullish(),
                    finish_reason: o.Yj().nullish(),
                  }),
                ),
                usage: d,
              }),
              t,
            ]),
          h = class {
            constructor(t, e, n) {
              var r;
              (this.specificationVersion = "v1"),
                (this.defaultObjectGenerationMode = void 0),
                (this.modelId = t),
                (this.settings = e),
                (this.config = n);
              let o = null != (r = n.errorStructure) ? r : c;
              (this.chunkSchema = v(o.errorSchema)),
                (this.failedResponseHandler = (0, i.sl)(o));
            }
            get provider() {
              return this.config.provider;
            }
            get providerOptionsName() {
              return this.config.provider.split(".")[0].trim();
            }
            getArgs({
              mode: t,
              inputFormat: e,
              prompt: n,
              maxTokens: i,
              temperature: o,
              topP: a,
              topK: s,
              frequencyPenalty: u,
              presencePenalty: c,
              stopSequences: l,
              responseFormat: d,
              seed: f,
              providerMetadata: p,
            }) {
              var h;
              let m = t.type,
                v = [];
              null != s &&
                v.push({ type: "unsupported-setting", setting: "topK" }),
                null != d &&
                  "text" !== d.type &&
                  v.push({
                    type: "unsupported-setting",
                    setting: "responseFormat",
                    details: "JSON response format is not supported.",
                  });
              let { prompt: g, stopSequences: y } = (function ({
                  prompt: t,
                  inputFormat: e,
                  user: n = "user",
                  assistant: i = "assistant",
                }) {
                  if (
                    "prompt" === e &&
                    1 === t.length &&
                    "user" === t[0].role &&
                    1 === t[0].content.length &&
                    "text" === t[0].content[0].type
                  )
                    return { prompt: t[0].content[0].text };
                  let o = "";
                  for (let { role: e, content: a } of ("system" === t[0].role &&
                    ((o += `${t[0].content}

`),
                    (t = t.slice(1))),
                  t))
                    switch (e) {
                      case "system":
                        throw new r.M3({
                          message:
                            "Unexpected system message in prompt: ${content}",
                          prompt: t,
                        });
                      case "user": {
                        let t = a
                          .map((t) => {
                            switch (t.type) {
                              case "text":
                                return t.text;
                              case "image":
                                throw new r.b8({ functionality: "images" });
                            }
                          })
                          .join("");
                        o += `${n}:
${t}

`;
                        break;
                      }
                      case "assistant": {
                        let t = a
                          .map((t) => {
                            switch (t.type) {
                              case "text":
                                return t.text;
                              case "tool-call":
                                throw new r.b8({
                                  functionality: "tool-call messages",
                                });
                            }
                          })
                          .join("");
                        o += `${i}:
${t}

`;
                        break;
                      }
                      case "tool":
                        throw new r.b8({ functionality: "tool messages" });
                      default:
                        throw Error(`Unsupported role: ${e}`);
                    }
                  return {
                    prompt: (o += `${i}:
`),
                    stopSequences: [
                      `
${n}:`,
                    ],
                  };
                })({ prompt: n, inputFormat: e }),
                _ = [...(null != y ? y : []), ...(null != l ? l : [])],
                b = {
                  model: this.modelId,
                  echo: this.settings.echo,
                  logit_bias: this.settings.logitBias,
                  suffix: this.settings.suffix,
                  user: this.settings.user,
                  max_tokens: i,
                  temperature: o,
                  top_p: a,
                  frequency_penalty: u,
                  presence_penalty: c,
                  seed: f,
                  ...(null == p ? void 0 : p[this.providerOptionsName]),
                  prompt: g,
                  stop: _.length > 0 ? _ : void 0,
                };
              switch (m) {
                case "regular":
                  if (null == (h = t.tools) ? void 0 : h.length)
                    throw new r.b8({ functionality: "tools" });
                  if (t.toolChoice)
                    throw new r.b8({ functionality: "toolChoice" });
                  return { args: b, warnings: v };
                case "object-json":
                  throw new r.b8({ functionality: "object-json mode" });
                case "object-tool":
                  throw new r.b8({ functionality: "object-tool mode" });
                default:
                  throw Error(`Unsupported type: ${m}`);
              }
            }
            async doGenerate(t) {
              var e, n, r, o;
              let { args: a, warnings: c } = this.getArgs(t),
                {
                  responseHeaders: l,
                  value: d,
                  rawValue: f,
                } = await (0, i.GU)({
                  url: this.config.url({
                    path: "/completions",
                    modelId: this.modelId,
                  }),
                  headers: (0, i.m2)(this.config.headers(), t.headers),
                  body: a,
                  failedResponseHandler: this.failedResponseHandler,
                  successfulResponseHandler: (0, i.cV)(m),
                  abortSignal: t.abortSignal,
                  fetch: this.config.fetch,
                }),
                { prompt: p, ...h } = a,
                v = d.choices[0];
              return {
                text: v.text,
                usage: {
                  promptTokens:
                    null !=
                    (n = null == (e = d.usage) ? void 0 : e.prompt_tokens)
                      ? n
                      : NaN,
                  completionTokens:
                    null !=
                    (o = null == (r = d.usage) ? void 0 : r.completion_tokens)
                      ? o
                      : NaN,
                },
                finishReason: u(v.finish_reason),
                rawCall: { rawPrompt: p, rawSettings: h },
                rawResponse: { headers: l, body: f },
                response: s(d),
                warnings: c,
                request: { body: JSON.stringify(a) },
              };
            }
            async doStream(t) {
              let { args: e, warnings: n } = this.getArgs(t),
                r = {
                  ...e,
                  stream: !0,
                  stream_options: this.config.includeUsage
                    ? { include_usage: !0 }
                    : void 0,
                },
                { responseHeaders: o, value: a } = await (0, i.GU)({
                  url: this.config.url({
                    path: "/completions",
                    modelId: this.modelId,
                  }),
                  headers: (0, i.m2)(this.config.headers(), t.headers),
                  body: r,
                  failedResponseHandler: this.failedResponseHandler,
                  successfulResponseHandler: (0, i.Ds)(this.chunkSchema),
                  abortSignal: t.abortSignal,
                  fetch: this.config.fetch,
                }),
                { prompt: c, ...l } = e,
                d = "unknown",
                f = { promptTokens: Number.NaN, completionTokens: Number.NaN },
                p = !0;
              return {
                stream: a.pipeThrough(
                  new TransformStream({
                    transform(t, e) {
                      if (!t.success) {
                        (d = "error"),
                          e.enqueue({ type: "error", error: t.error });
                        return;
                      }
                      let n = t.value;
                      if ("error" in n) {
                        (d = "error"),
                          e.enqueue({ type: "error", error: n.error });
                        return;
                      }
                      p &&
                        ((p = !1),
                        e.enqueue({ type: "response-metadata", ...s(n) })),
                        null != n.usage &&
                          (f = {
                            promptTokens: n.usage.prompt_tokens,
                            completionTokens: n.usage.completion_tokens,
                          });
                      let r = n.choices[0];
                      (null == r ? void 0 : r.finish_reason) != null &&
                        (d = u(r.finish_reason)),
                        (null == r ? void 0 : r.text) != null &&
                          e.enqueue({ type: "text-delta", textDelta: r.text });
                    },
                    flush(t) {
                      t.enqueue({ type: "finish", finishReason: d, usage: f });
                    },
                  }),
                ),
                rawCall: { rawPrompt: c, rawSettings: l },
                rawResponse: { headers: o },
                warnings: n,
                request: { body: JSON.stringify(r) },
              };
            }
          },
          m = o.Ik({
            id: o.Yj().nullish(),
            created: o.ai().nullish(),
            model: o.Yj().nullish(),
            choices: o.YO(o.Ik({ text: o.Yj(), finish_reason: o.Yj() })),
            usage: o
              .Ik({ prompt_tokens: o.ai(), completion_tokens: o.ai() })
              .nullish(),
          }),
          v = (t) =>
            o.KC([
              o.Ik({
                id: o.Yj().nullish(),
                created: o.ai().nullish(),
                model: o.Yj().nullish(),
                choices: o.YO(
                  o.Ik({
                    text: o.Yj(),
                    finish_reason: o.Yj().nullish(),
                    index: o.ai(),
                  }),
                ),
                usage: o
                  .Ik({ prompt_tokens: o.ai(), completion_tokens: o.ai() })
                  .nullish(),
              }),
              t,
            ]),
          g = class {
            constructor(t, e, n) {
              (this.specificationVersion = "v1"),
                (this.modelId = t),
                (this.settings = e),
                (this.config = n);
            }
            get provider() {
              return this.config.provider;
            }
            get maxEmbeddingsPerCall() {
              var t;
              return null != (t = this.config.maxEmbeddingsPerCall) ? t : 2048;
            }
            get supportsParallelCalls() {
              var t;
              return null == (t = this.config.supportsParallelCalls) || t;
            }
            async doEmbed({ values: t, headers: e, abortSignal: n }) {
              var o;
              if (t.length > this.maxEmbeddingsPerCall)
                throw new r.Ch({
                  provider: this.provider,
                  modelId: this.modelId,
                  maxEmbeddingsPerCall: this.maxEmbeddingsPerCall,
                  values: t,
                });
              let { responseHeaders: a, value: s } = await (0, i.GU)({
                url: this.config.url({
                  path: "/embeddings",
                  modelId: this.modelId,
                }),
                headers: (0, i.m2)(this.config.headers(), e),
                body: {
                  model: this.modelId,
                  input: t,
                  encoding_format: "float",
                  dimensions: this.settings.dimensions,
                  user: this.settings.user,
                },
                failedResponseHandler: (0, i.sl)(
                  null != (o = this.config.errorStructure) ? o : c,
                ),
                successfulResponseHandler: (0, i.cV)(y),
                abortSignal: n,
                fetch: this.config.fetch,
              });
              return {
                embeddings: s.data.map((t) => t.embedding),
                usage: s.usage ? { tokens: s.usage.prompt_tokens } : void 0,
                rawResponse: { headers: a },
              };
            }
          },
          y = o.Ik({
            data: o.YO(o.Ik({ embedding: o.YO(o.ai()) })),
            usage: o.Ik({ prompt_tokens: o.ai() }).nullish(),
          }),
          _ = o.Ik({ data: o.YO(o.Ik({ b64_json: o.Yj() })) }),
          b = {
            "accounts/fireworks/models/flux-1-dev-fp8": {
              urlFormat: "workflows",
            },
            "accounts/fireworks/models/flux-1-schnell-fp8": {
              urlFormat: "workflows",
            },
            "accounts/fireworks/models/playground-v2-5-1024px-aesthetic": {
              urlFormat: "image_generation",
              supportsSize: !0,
            },
            "accounts/fireworks/models/japanese-stable-diffusion-xl": {
              urlFormat: "image_generation",
              supportsSize: !0,
            },
            "accounts/fireworks/models/playground-v2-1024px-aesthetic": {
              urlFormat: "image_generation",
              supportsSize: !0,
            },
            "accounts/fireworks/models/stable-diffusion-xl-1024-v1-0": {
              urlFormat: "image_generation",
              supportsSize: !0,
            },
            "accounts/fireworks/models/SSD-1B": {
              urlFormat: "image_generation",
              supportsSize: !0,
            },
          },
          w = class {
            constructor(t, e, n) {
              (this.modelId = t),
                (this.settings = e),
                (this.config = n),
                (this.specificationVersion = "v1");
            }
            get provider() {
              return this.config.provider;
            }
            get maxImagesPerCall() {
              var t;
              return null != (t = this.settings.maxImagesPerCall) ? t : 1;
            }
            async doGenerate({
              prompt: t,
              n: e,
              size: n,
              aspectRatio: r,
              seed: o,
              providerOptions: a,
              headers: s,
              abortSignal: u,
            }) {
              var c, l, d, f, p, h, m;
              let v = [],
                g = b[this.modelId];
              (null == g ? void 0 : g.supportsSize) ||
                null == n ||
                v.push({
                  type: "unsupported-setting",
                  setting: "size",
                  details:
                    "This model does not support the `size` option. Use `aspectRatio` instead.",
                }),
                (null == g ? void 0 : g.supportsSize) &&
                  null != r &&
                  v.push({
                    type: "unsupported-setting",
                    setting: "aspectRatio",
                    details:
                      "This model does not support the `aspectRatio` option.",
                  });
              let y = null == n ? void 0 : n.split("x"),
                _ =
                  null !=
                  (d =
                    null ==
                    (l =
                      null == (c = this.config._internal)
                        ? void 0
                        : c.currentDate)
                      ? void 0
                      : l.call(c))
                    ? d
                    : new Date(),
                { value: w, responseHeaders: S } = await (0, i.GU)({
                  url:
                    ((p = this.config.baseURL),
                    (null == (m = b[(h = this.modelId)])
                      ? void 0
                      : m.urlFormat) === "image_generation"
                      ? `${p}/image_generation/${h}`
                      : `${p}/workflows/${h}/text_to_image`),
                  headers: (0, i.m2)(this.config.headers(), s),
                  body: {
                    prompt: t,
                    aspect_ratio: r,
                    seed: o,
                    samples: e,
                    ...(y && { width: y[0], height: y[1] }),
                    ...(null != (f = a.fireworks) ? f : {}),
                  },
                  failedResponseHandler: (0, i.zt)(),
                  successfulResponseHandler: (0, i.HD)(),
                  abortSignal: u,
                  fetch: this.config.fetch,
                });
              return {
                images: [w],
                warnings: v,
                response: { timestamp: _, modelId: this.modelId, headers: S },
              };
            }
          },
          S = {
            errorSchema: o.Ik({ error: o.Yj() }),
            errorToMessage: (t) => t.error,
          },
          k = "https://api.fireworks.ai/inference/v1",
          x = (function (t = {}) {
            var e;
            let n = (0, i.ae)(null != (e = t.baseURL) ? e : k),
              r = () => ({
                Authorization: `Bearer ${(0, i.WL)({ apiKey: t.apiKey, environmentVariableName: "FIREWORKS_API_KEY", description: "Fireworks API key" })}`,
                ...t.headers,
              }),
              o = (e) => ({
                provider: `fireworks.${e}`,
                url: ({ path: t }) => `${n}${t}`,
                headers: r,
                fetch: t.fetch,
              }),
              a = (t, e = {}) =>
                new l(t, e, {
                  ...o("chat"),
                  errorStructure: S,
                  defaultObjectGenerationMode: "json",
                }),
              s = (t, e = {}) =>
                new w(t, e, { ...o("image"), baseURL: null != n ? n : k }),
              u = (t, e) => a(t, e);
            return (
              (u.completionModel = (t, e = {}) =>
                new h(t, e, { ...o("completion"), errorStructure: S })),
              (u.chatModel = a),
              (u.languageModel = a),
              (u.textEmbeddingModel = (t, e = {}) =>
                new g(t, e, { ...o("embedding"), errorStructure: S })),
              (u.image = s),
              (u.imageModel = s),
              u
            );
          })();
      },
      61819: (t, e, n) => {
        n.a(t, async (t, r) => {
          try {
            n.r(e),
              n.d(e, {
                DELETE: () => tr,
                GET: () => Z,
                HEAD: () => ti,
                OPTIONS: () => to,
                PATCH: () => tn,
                POST: () => tt,
                PUT: () => te,
                maxDuration: () => B,
                runtime: () => F,
              });
            var i = n(63033),
              o = n(21982),
              a = n(85488),
              s = n(68593),
              u = n(92294),
              c = n(58342),
              l = n(79273),
              d = n(21783),
              f = n(68747),
              p = n(33850),
              h = n(4387),
              m = n(86773),
              v = n(21088),
              g = n(32940),
              y = n(2659),
              _ = n(3422),
              b = n(77719),
              w = n(20716),
              S = n(95972),
              k = n(16573),
              x = n(99660),
              E = n(57826),
              C = n(60131),
              T = n.n(C),
              I = n(20764),
              R = n(60442),
              A = t([a, _, w, x]);
            [a, _, w, x] = A.then ? (await A)() : A;
            let { fetch: z } = T()(),
              B = 60,
              F = "nodejs",
              G = (0, a.tool)({
                description: "Get the current weather at a specific location",
                inputSchema: c.Ik({
                  latitude: c.ai().describe("Latitude coordinate"),
                  longitude: c.ai().describe("Longitude coordinate"),
                }),
                outputSchema: c.Ik({
                  current: c.Ik({ temperature_2m: c.ai(), time: c.Yj() }),
                  daily: c.Ik({ sunrise: c.YO(c.Yj()), sunset: c.YO(c.Yj()) }),
                  hourly: c.Ik({ temperature_2m: c.YO(c.ai()) }),
                }),
                onInputStart: ({ toolCallId: t }) => {
                  p.v.info("Weather tool input streaming started", {
                    toolCallId: t,
                  });
                },
                onInputDelta: ({ inputTextDelta: t, toolCallId: e }) => {
                  p.v.debug("Weather tool input delta", {
                    toolCallId: e,
                    delta: t,
                  });
                },
                onInputAvailable: ({ input: t, toolCallId: e }) => {
                  p.v.info("Weather tool input ready", {
                    toolCallId: e,
                    input: t,
                  });
                },
                execute: async ({ latitude: t, longitude: e }) => {
                  let n = await fetch(
                    `https://api.open-meteo.com/v1/forecast?latitude=${t}&longitude=${e}&current=temperature_2m&hourly=temperature_2m&daily=sunrise,sunset&timezone=auto`,
                  );
                  return await n.json();
                },
              }),
              H = (t) =>
                (0, a.tool)({
                  description:
                    "Create a new document with specified content and metadata",
                  inputSchema: c.Ik({
                    title: c.Yj().describe("Document title"),
                    content: c.Yj().describe("Document content"),
                    type: c
                      .k5(["text", "markdown", "code"])
                      .describe("Document type"),
                    tags: c.YO(c.Yj()).optional().describe("Document tags"),
                  }),
                  outputSchema: c.Ik({
                    id: c.Yj(),
                    title: c.Yj(),
                    createdAt: c.Yj(),
                    success: c.zM(),
                  }),
                  onInputStart: ({ toolCallId: e }) => {
                    p.v.info("Document creation tool started", {
                      toolCallId: e,
                      userId: t?.id,
                    });
                  },
                  onInputDelta: ({ inputTextDelta: t, toolCallId: e }) => {
                    p.v.debug("Document creation input delta", {
                      toolCallId: e,
                      delta: t,
                    });
                  },
                  onInputAvailable: ({ input: t, toolCallId: e }) => {
                    p.v.info("Document creation input ready", {
                      toolCallId: e,
                      input: t.title,
                    });
                  },
                  execute: async ({
                    title: t,
                    content: e,
                    type: n,
                    tags: r,
                  }) => ({
                    id: (0, w.lk)(),
                    title: t,
                    createdAt: new Date().toISOString(),
                    success: !0,
                  }),
                }),
              $ = (t) =>
                (0, a.tool)({
                  description: "Update an existing document with new content",
                  inputSchema: c.Ik({
                    documentId: c.Yj().describe("Document ID to update"),
                    content: c.Yj().describe("New document content"),
                    title: c.Yj().optional().describe("New document title"),
                  }),
                  outputSchema: c.Ik({
                    id: c.Yj(),
                    updatedAt: c.Yj(),
                    success: c.zM(),
                  }),
                  onInputStart: ({ toolCallId: e }) => {
                    p.v.info("Document update tool started", {
                      toolCallId: e,
                      userId: t?.id,
                    });
                  },
                  onInputDelta: ({ inputTextDelta: t, toolCallId: e }) => {
                    p.v.debug("Document update input delta", {
                      toolCallId: e,
                      delta: t,
                    });
                  },
                  onInputAvailable: ({ input: t, toolCallId: e }) => {
                    p.v.info("Document update input ready", {
                      toolCallId: e,
                      documentId: t.documentId,
                    });
                  },
                  execute: async ({ documentId: t, content: e, title: n }) => ({
                    id: t,
                    updatedAt: new Date().toISOString(),
                    success: !0,
                  }),
                }),
              Y = ["private", "public", "team"],
              W = c.Ik({
                id: c.Yj().uuid().optional(),
                messages: c.YO(
                  c.Ik({
                    id: c.Yj(),
                    role: c.k5(["user", "assistant", "system"]),
                    content: c.Yj().min(1).max(1e4),
                    createdAt: c.p6().optional(),
                  }),
                ),
                selectedChatModel: c.fc(m.c1),
                visibility: c.k5(Y).optional(),
                description: c.Yj().max(1e3).optional(),
                caseId: c.Yj().uuid().optional(),
                countryCode: c.Yj().length(2).optional(),
              }),
              K = c.Ik({
                title: c.Yj().min(1).max(200).optional(),
                description: c.Yj().max(1e3).optional().nullable(),
                modelType: c.fc(m.c1).optional(),
                caseId: c.Yj().uuid().optional().nullable(),
                visibility: c.k5(Y).optional(),
              }),
              J = null;
            function O() {
              if (!J)
                try {
                  J = (0, u.createResumableStreamContext)({
                    waitUntil: s.after,
                  });
                } catch (t) {
                  t.message.includes("REDIS_URL") ||
                    p.v.error(
                      "Failed to initialize resumable stream context",
                      t,
                    );
                }
              return J;
            }
            function N(t) {
              let e = t.split("/");
              if (e.length > 3 && "api" === e[1] && "chat" === e[2]) {
                let t = e[3];
                return (0, d.A)(t) ? t : null;
              }
              return null;
            }
            function D(t) {
              if ("string" == typeof t.content) return t.content;
              let e = t.parts?.find((t) => "text" === t.type);
              return e?.text;
            }
            async function M(t, e) {
              try {
                let n = (0, b.createClient)(
                    "http://localhost:54321",
                    process.env.SUPABASE_SERVICE_ROLE_KEY,
                  ),
                  r = new E.Ay({
                    apiKey: process.env.OPENAI_API_KEY,
                    fetch: z,
                  }),
                  i = new k.r(n, r),
                  o = new x.J(),
                  a = await i.search(t, { userId: e }),
                  s = o.buildContext(a, a.userContext);
                return o.createSystemPrompt(s);
              } catch (t) {
                return (
                  p.v.error(
                    "RAG context enhancement failed",
                    t instanceof Error ? t : Error(String(t)),
                  ),
                  null
                );
              }
            }
            async function P(t) {
              let e = Date.now(),
                { pathname: n } = new URL(t.url),
                r = N(n);
              try {
                let i;
                try {
                  i = await (0, I.b9)(t);
                } catch (t) {
                  if (t instanceof I.v3) return (0, I.Gs)(t);
                  throw t;
                }
                let { user: s, isGuest: u } = i,
                  c = s.id;
                p.v.info("Chat API request", {
                  userId: c,
                  isGuest: u,
                  pathname: n,
                  userAgent: t.headers.get("user-agent"),
                });
                let l = await g.n.isAllowed(c, "api", "standard");
                if (!l.success)
                  return new Response("Rate limit exceeded", {
                    status: 429,
                    headers: {
                      "X-RateLimit-Reset": l.reset.toString(),
                      "X-RateLimit-Remaining": l.remaining.toString(),
                    },
                  });
                let b = new v.V();
                if (r && n.endsWith("/generate-title")) return await L(r, c, b);
                if ("/api/chat" === n || "/api/chat/" === n) {
                  let n = await t.json(),
                    r = {
                      ...n,
                      id: n.id && (0, d.A)(n.id) ? n.id : (0, f.A)(),
                      messages: n.messages || (n.message ? [n.message] : []),
                      visibility:
                        n.visibility || n.selectedVisibilityType || "private",
                    },
                    {
                      id: i,
                      messages: l,
                      selectedChatModel: v,
                      visibility: g = "private",
                      description: k,
                      caseId: x,
                      countryCode: E,
                    } = W.parse(r),
                    C = i || (0, f.A)(),
                    T = l[l.length - 1],
                    I = D(T) || "",
                    R = await b.getChatById(C);
                  if (R) {
                    if (R.userId !== c)
                      return new Response("Forbidden", { status: 403 });
                  } else {
                    let t = I.substring(0, 100) || "New Chat",
                      e = {
                        id: C,
                        user_id: c,
                        title: t,
                        model: v,
                        visibility: g,
                        case_id: x || null,
                        metadata: {
                          ...(E && { countryCode: E }),
                          ...(k && { description: k }),
                          createdAt: new Date().toISOString(),
                        },
                      },
                      n = await b.create(e);
                    (R = m.ry.fromDatabase(n)),
                      p.v.info("Created new chat", { chatId: C, userId: c });
                  }
                  let A = [...(await b.getMessages(C)).map(S.Gq), T],
                    {
                      longitude: N,
                      latitude: P,
                      city: L,
                      country: U,
                    } = (0, o.geolocation)(t),
                    j = { longitude: N, latitude: P, city: L, country: U },
                    V =
                      R?.systemPrompt ||
                      (0, y.Ao)({ selectedChatModel: v, requestHints: j });
                  try {
                    let t = await M(I, c);
                    t &&
                      (V = `${V}

${t}`);
                  } catch (t) {
                    p.v.warn(
                      "RAG integration failed, continuing without context",
                      { error: t },
                    );
                  }
                  await b.addMessage(C, {
                    id: T.id,
                    role: "user",
                    content: I,
                    metadata: {
                      requestHints: j,
                      timestamp: new Date().toISOString(),
                      userAgent: t.headers.get("User-Agent"),
                    },
                    user_id: c,
                  });
                  let q = (0, a.streamText)({
                      model: _.m.languageModel(v),
                      system: V,
                      messages: (0, a.convertToModelMessages)(A),
                      stopWhen: [
                        (0, a.stepCountIs)(5),
                        (0, a.hasToolCall)("finalizeTask"),
                        ({ steps: t }) => {
                          let e = t[t.length - 1];
                          return e?.text?.includes("TASK_COMPLETE") || !1;
                        },
                      ],
                      tools:
                        v === m.c1.GPT_3_5
                          ? void 0
                          : {
                              getWeather: G,
                              createDocument: H(s),
                              updateDocument: $(s),
                            },
                      onStepFinish: async ({
                        stepType: t,
                        text: n,
                        toolCalls: r,
                        toolResults: i,
                        finishReason: o,
                        usage: a,
                        reasoning: s,
                        sources: u,
                        files: l,
                      }) => {
                        let d = Date.now() - e;
                        p.v.info("AI step finished", {
                          chatId: C,
                          stepType: t,
                          finishReason: o,
                          textLength: n.length,
                          toolCallsCount: r?.length || 0,
                          toolResultsCount: i?.length || 0,
                          tokensUsed: a?.totalTokens || 0,
                          stepTime: d,
                          hasReasoning: !!s,
                          sourcesCount: u?.length || 0,
                          filesCount: l?.length || 0,
                        }),
                          r &&
                            r.length > 0 &&
                            (0, h.sx)({
                              name: "tool_calls_executed",
                              properties: {
                                chatId: C,
                                toolNames: r.map((t) => t.toolName),
                                stepType: t,
                                userId: c,
                              },
                            });
                      },
                      onChunk: async ({ chunk: t }) => {
                        switch (t.type) {
                          case "text":
                            p.v.debug("Text chunk received", {
                              chatId: C,
                              textLength: t.text.length,
                            });
                            break;
                          case "reasoning":
                            p.v.info("Reasoning chunk received", {
                              chatId: C,
                              reasoningLength: t.text.length,
                            });
                            break;
                          case "source":
                            p.v.info("Source chunk received", {
                              chatId: C,
                              sourceType: t.source.sourceType,
                              sourceId: t.source.id,
                            });
                            break;
                          case "tool-call":
                            p.v.info("Tool call chunk received", {
                              chatId: C,
                              toolName: t.toolName,
                              toolCallId: t.toolCallId,
                            });
                            break;
                          case "tool-input-start":
                            p.v.debug("Tool input streaming started", {
                              chatId: C,
                              toolName: t.toolName,
                              toolCallId: t.id,
                            });
                            break;
                          case "tool-input-delta":
                            p.v.debug("Tool input delta received", {
                              chatId: C,
                              toolCallId: t.id,
                              deltaLength: t.delta.length,
                            });
                            break;
                          case "tool-result":
                            p.v.info("Tool result chunk received", {
                              chatId: C,
                              outputSize: JSON.stringify(t.output).length,
                            });
                            break;
                          case "raw":
                            p.v.debug("Raw chunk received", { chatId: C });
                        }
                      },
                      onFinish: async ({
                        text: t,
                        usage: n,
                        response: r,
                        reasoning: i,
                        sources: o,
                        files: a,
                      }) => {
                        let s = Date.now() - e;
                        try {
                          let e = (0, w.lk)();
                          await b.addMessage(C, {
                            id: e,
                            role: "assistant",
                            content: t,
                            metadata: {
                              model: v,
                              modelId: r.modelId,
                              processingTime: s,
                              tokensUsed: n?.totalTokens || 0,
                              promptTokens: n?.promptTokens || 0,
                              completionTokens: n?.completionTokens || 0,
                              timestamp: new Date().toISOString(),
                              hasReasoning: !!i,
                              reasoningLength: i?.length || 0,
                              sourcesCount: o?.length || 0,
                              filesCount: a?.length || 0,
                              responseId: r.id,
                            },
                            user_id: c,
                          }),
                            (0, h.sx)({
                              name: "chat_message_processed",
                              properties: {
                                chatId: C,
                                model: v,
                                modelId: r.modelId,
                                processingTime: s,
                                tokensUsed: n?.totalTokens || 0,
                                promptTokens: n?.promptTokens || 0,
                                completionTokens: n?.completionTokens || 0,
                                hasReasoning: !!i,
                                sourcesCount: o?.length || 0,
                                filesCount: a?.length || 0,
                                userId: c,
                                isGuest: u,
                              },
                            }),
                            p.v.info("Chat message processed", {
                              chatId: C,
                              processingTime: s,
                              tokensUsed: n?.totalTokens || 0,
                              modelId: r.modelId,
                              hasReasoning: !!i,
                              sourcesCount: o?.length || 0,
                            });
                        } catch (t) {
                          p.v.error(
                            "Failed to save assistant message",
                            t instanceof Error ? t : Error(String(t)),
                          );
                        }
                      },
                      onError: ({ error: t }) => {
                        p.v.error("Streaming error", Error(String(t)), {
                          chatId: C,
                        });
                      },
                    }),
                    z = O();
                  if (z)
                    try {
                      let t = (0, w.lk)(),
                        e = await z.resumableStream(t, () =>
                          q.toUIMessageStreamResponse(),
                        );
                      return await b.storeStreamId(C, t), e;
                    } catch (t) {
                      p.v.warn(
                        "Failed to create resumable stream, using regular stream",
                        { error: t },
                      );
                    }
                  let B = {};
                  return (
                    C && (B["X-Chat-Id"] = C),
                    q.toUIMessageStreamResponse({
                      headers: B,
                      messageMetadata: ({ part: t }) =>
                        "start" === t.type
                          ? { model: v, chatId: C, startTime: Date.now() }
                          : "finish-step" === t.type
                            ? {
                                model: t.response.modelId,
                                stepDuration: Date.now() - e,
                                tokensUsed: t.usage.totalTokens,
                              }
                            : "finish" === t.type
                              ? {
                                  totalTokens: t.totalUsage.totalTokens,
                                  totalDuration: Date.now() - e,
                                  chatId: C,
                                }
                              : void 0,
                    })
                  );
                }
                return new Response("Not Found", { status: 404 });
              } catch (t) {
                if ((p.v.error("Chat API error", t), t instanceof l.G))
                  return new Response(
                    JSON.stringify({
                      error: "Validation failed",
                      details: t.errors,
                    }),
                    {
                      status: 400,
                      headers: { "Content-Type": "application/json" },
                    },
                  );
                return new Response(
                  JSON.stringify({ error: "Internal server error" }),
                  {
                    status: 500,
                    headers: { "Content-Type": "application/json" },
                  },
                );
              }
            }
            async function L(t, e, n) {
              try {
                let r = await n.getChatById(t);
                if (!r || r.userId !== e)
                  return new Response("Forbidden", { status: 403 });
                let i = (await n.getMessages(t)).find((t) => "user" === t.role);
                if (!i)
                  return new Response("No user message found", { status: 400 });
                let o = D(i)?.substring(0, 100) || "New Chat";
                return (
                  await n.update(t, { title: o }),
                  Response.json({ success: !0, title: o })
                );
              } catch (t) {
                return (
                  p.v.error(
                    "Failed to generate title",
                    t instanceof Error ? t : Error(String(t)),
                  ),
                  new Response("Failed to generate title", { status: 500 })
                );
              }
            }
            async function U(t) {
              try {
                let e;
                try {
                  e = await (0, I.b9)(t);
                } catch (t) {
                  if (t instanceof I.v3) return (0, I.Gs)(t);
                  throw t;
                }
                let { user: n } = e,
                  r = new v.V(),
                  { pathname: i, searchParams: o } = new URL(t.url),
                  a = N(i),
                  s = o.get("streamId");
                if (s) {
                  let t = O();
                  if (t)
                    try {
                      return await t.resumableStream(
                        s,
                        () => new ReadableStream(),
                      );
                    } catch (t) {
                      return new Response("Stream not found", { status: 404 });
                    }
                  return new Response("Stream context not available", {
                    status: 500,
                  });
                }
                if (a) {
                  let t = await r.getChatById(a);
                  if (!t || t.userId !== n.id)
                    return new Response("Chat not found", { status: 404 });
                  return Response.json({ chat: t.toObject() });
                }
                let u = Math.min(parseInt(o.get("limit") || "50"), 100),
                  c = Math.max(parseInt(o.get("offset") || "0"), 0),
                  l = o.get("caseId") || void 0,
                  d = await r.getByUserId(n.id, {
                    limit: u,
                    offset: c,
                    case_id: l,
                  }),
                  f = d.map((t) => m.ry.fromDatabase(t));
                return Response.json({
                  chats: f.map((t) => t.toObject()),
                  pagination: { limit: u, offset: c, hasMore: d.length === u },
                });
              } catch (t) {
                return (
                  p.v.error(
                    "GET error",
                    t instanceof Error ? t : Error(String(t)),
                  ),
                  new Response("Internal server error", { status: 500 })
                );
              }
            }
            async function j(t) {
              try {
                let e;
                try {
                  e = await (0, I.b9)(t);
                } catch (t) {
                  if (t instanceof I.v3) return (0, I.Gs)(t);
                  throw t;
                }
                let { user: n } = e,
                  { pathname: r } = new URL(t.url),
                  i = N(r);
                if (!i)
                  return new Response("Chat ID required", { status: 400 });
                let o = new v.V(),
                  a = await o.getChatById(i);
                if (!a || a.userId !== n.id)
                  return new Response("Chat not found", { status: 404 });
                let s = await t.json(),
                  u = K.parse(s),
                  c = await o.update(i, {
                    title: u.title,
                    model: u.modelType,
                    visibility: u.visibility,
                    case_id: u.caseId,
                    metadata: {
                      ...a.metadata,
                      ...(void 0 !== u.description && {
                        description: u.description,
                      }),
                      updatedAt: new Date().toISOString(),
                    },
                  });
                return Response.json({ chat: m.ry.fromDatabase(c).toObject() });
              } catch (t) {
                if (
                  (p.v.error(
                    "PATCH error",
                    t instanceof Error ? t : Error(String(t)),
                  ),
                  t instanceof l.G)
                )
                  return new Response(
                    JSON.stringify({
                      error: "Validation failed",
                      details: t.errors,
                    }),
                    {
                      status: 400,
                      headers: { "Content-Type": "application/json" },
                    },
                  );
                return new Response("Internal server error", { status: 500 });
              }
            }
            async function V(t) {
              try {
                let e;
                try {
                  e = await (0, I.b9)(t);
                } catch (t) {
                  if (t instanceof I.v3) return (0, I.Gs)(t);
                  throw t;
                }
                let { user: n } = e,
                  { pathname: r } = new URL(t.url),
                  i = N(r);
                if (!i)
                  return new Response("Chat ID required", { status: 400 });
                let o = new v.V(),
                  a = await o.getChatById(i);
                if (!a || a.userId !== n.id)
                  return new Response("Forbidden", { status: 403 });
                return await o.deleteChat(i), Response.json({ success: !0 });
              } catch (t) {
                return (
                  p.v.error(
                    "DELETE error",
                    t instanceof Error ? t : Error(String(t)),
                  ),
                  new Response("Internal server error", { status: 500 })
                );
              }
            }
            let X = { ...i },
              Q =
                "workUnitAsyncStorage" in X
                  ? X.workUnitAsyncStorage
                  : "requestAsyncStorage" in X
                    ? X.requestAsyncStorage
                    : void 0;
            function q(t, e) {
              return "phase-production-build" === process.env.NEXT_PHASE ||
                "function" != typeof t
                ? t
                : new Proxy(t, {
                    apply: (t, n, r) => {
                      let i;
                      try {
                        let t = Q?.getStore();
                        i = t?.headers;
                      } catch (t) {}
                      return R.wrapRouteHandlerWithSentry(t, {
                        method: e,
                        parameterizedRoute: "/(ai-unified)/api/chat",
                        headers: i,
                      }).apply(n, r);
                    },
                  });
            }
            let Z = q(U, "GET"),
              tt = q(P, "POST"),
              te = q(void 0, "PUT"),
              tn = q(j, "PATCH"),
              tr = q(V, "DELETE"),
              ti = q(void 0, "HEAD"),
              to = q(void 0, "OPTIONS");
            r();
          } catch (t) {
            r(t);
          }
        });
      },
      62168: (t) => {
        var e = Object.defineProperty,
          n = Object.getOwnPropertyDescriptor,
          r = Object.getOwnPropertyNames,
          i = Object.prototype.hasOwnProperty,
          o = {};
        function a(t, e) {
          if (t?.request?.headers) {
            if (!(t.request.headers instanceof Headers))
              throw Error("request.headers must be an instance of Headers");
            let n = [];
            for (let [r, i] of t.request.headers)
              e.set("x-middleware-request-" + r, i), n.push(r);
            e.set("x-middleware-override-headers", n.join(","));
          }
        }
        function s(t, e) {
          let n = new Headers(e?.headers ?? {});
          return (
            n.set("x-middleware-rewrite", String(t)),
            a(e, n),
            new Response(null, { ...e, headers: n })
          );
        }
        function u(t) {
          let e = new Headers(t?.headers ?? {});
          return (
            e.set("x-middleware-next", "1"),
            a(t, e),
            new Response(null, { ...t, headers: e })
          );
        }
        ((t, n) => {
          for (var r in n) e(t, r, { get: n[r], enumerable: !0 });
        })(o, { next: () => u, rewrite: () => s }),
          (t.exports = ((t, o, a, s) => {
            if ((o && "object" == typeof o) || "function" == typeof o)
              for (let u of r(o))
                i.call(t, u) ||
                  u === a ||
                  e(t, u, {
                    get: () => o[u],
                    enumerable: !(s = n(o, u)) || s.enumerable,
                  });
            return t;
          })(e({}, "__esModule", { value: !0 }), o));
      },
      62784: (t) => {
        var e = Object.defineProperty,
          n = Object.getOwnPropertyDescriptor,
          r = Object.getOwnPropertyNames,
          i = Object.prototype.hasOwnProperty,
          o = {};
        ((t, n) => {
          for (var r in n) e(t, r, { get: n[r], enumerable: !0 });
        })(o, { SYMBOL_FOR_REQ_CONTEXT: () => a, getContext: () => s }),
          (t.exports = ((t, o, a, s) => {
            if ((o && "object" == typeof o) || "function" == typeof o)
              for (let u of r(o))
                i.call(t, u) ||
                  u === a ||
                  e(t, u, {
                    get: () => o[u],
                    enumerable: !(s = n(o, u)) || s.enumerable,
                  });
            return t;
          })(e({}, "__esModule", { value: !0 }), o));
        let a = Symbol.for("@vercel/request-context");
        function s() {
          let t = globalThis;
          return t[a]?.get?.() ?? {};
        }
      },
      63033: (t) => {
        t.exports = require("next/dist/server/app-render/work-unit-async-storage.external.js");
      },
      68747: (t, e, n) => {
        n.d(e, { A: () => u });
        var r = n(55511);
        let i = { randomUUID: r.randomUUID },
          o = new Uint8Array(256),
          a = o.length,
          s = [];
        for (let t = 0; t < 256; ++t) s.push((t + 256).toString(16).slice(1));
        let u = function (t, e, n) {
          if (i.randomUUID && !e && !t) return i.randomUUID();
          let u =
            (t = t || {}).random ??
            t.rng?.() ??
            (a > o.length - 16 && ((0, r.randomFillSync)(o), (a = 0)),
            o.slice(a, (a += 16)));
          if (u.length < 16) throw Error("Random bytes length must be >= 16");
          if (((u[6] = (15 & u[6]) | 64), (u[8] = (63 & u[8]) | 128), e)) {
            if ((n = n || 0) < 0 || n + 16 > e.length)
              throw RangeError(
                `UUID byte range ${n}:${n + 15} is out of buffer bounds`,
              );
            for (let t = 0; t < 16; ++t) e[n + t] = u[t];
            return e;
          }
          return (function (t, e = 0) {
            return (
              s[t[e + 0]] +
              s[t[e + 1]] +
              s[t[e + 2]] +
              s[t[e + 3]] +
              "-" +
              s[t[e + 4]] +
              s[t[e + 5]] +
              "-" +
              s[t[e + 6]] +
              s[t[e + 7]] +
              "-" +
              s[t[e + 8]] +
              s[t[e + 9]] +
              "-" +
              s[t[e + 10]] +
              s[t[e + 11]] +
              s[t[e + 12]] +
              s[t[e + 13]] +
              s[t[e + 14]] +
              s[t[e + 15]]
            ).toLowerCase();
          })(u);
        };
      },
      69155: (t, e) => {
        Object.defineProperty(e, "__esModule", { value: !0 });
      },
      70910: (t, e) => {
        Object.defineProperty(e, "__esModule", { value: !0 }),
          (e.createSubscriberAdapter = function (t) {
            return {
              connect: () => t.connect(),
              subscribe: async function (e, n) {
                t.on("message", (t, r) => {
                  e === t && n(r);
                }),
                  await t.subscribe(e);
              },
              unsubscribe: (e) => t.unsubscribe(e),
            };
          }),
          (e.createPublisherAdapter = function (t) {
            return {
              connect: () => t.connect(),
              publish: (e, n) => t.publish(e, n),
              set: (e, n, r) =>
                (null == r ? void 0 : r.EX)
                  ? t.set(e, n, "EX", r.EX)
                  : t.set(e, n),
              get: (e) => t.get(e),
              incr: (e) => t.incr(e),
            };
          });
      },
      73024: (t) => {
        t.exports = require("node:fs");
      },
      73566: (t) => {
        t.exports = require("worker_threads");
      },
      74075: (t) => {
        t.exports = require("zlib");
      },
      74998: (t) => {
        t.exports = require("perf_hooks");
      },
      75919: (t) => {
        t.exports = require("node:worker_threads");
      },
      76760: (t) => {
        t.exports = require("node:path");
      },
      77030: (t) => {
        t.exports = require("node:net");
      },
      77598: (t) => {
        t.exports = require("node:crypto");
      },
      79428: (t) => {
        t.exports = require("buffer");
      },
      79551: (t) => {
        t.exports = require("url");
      },
      79646: (t) => {
        t.exports = require("child_process");
      },
      79670: (t) => {
        var e = Object.defineProperty,
          n = Object.getOwnPropertyDescriptor,
          r = Object.getOwnPropertyNames,
          i = Object.prototype.hasOwnProperty,
          o = {};
        ((t, n) => {
          for (var r in n) e(t, r, { get: n[r], enumerable: !0 });
        })(o, { InMemoryCache: () => a }),
          (t.exports = ((t, o, a, s) => {
            if ((o && "object" == typeof o) || "function" == typeof o)
              for (let u of r(o))
                i.call(t, u) ||
                  u === a ||
                  e(t, u, {
                    get: () => o[u],
                    enumerable: !(s = n(o, u)) || s.enumerable,
                  });
            return t;
          })(e({}, "__esModule", { value: !0 }), o));
        class a {
          constructor() {
            this.cache = {};
          }
          async get(t, e) {
            let n = this.cache[t];
            if (n) {
              if (n.ttl && n.lastModified + 1e3 * n.ttl < Date.now())
                return await this.delete(t), null;
              if (e?.tags) for (let t of e.tags) n.tags.add(t);
              return n.value;
            }
            return null;
          }
          async set(t, e, n) {
            this.cache[t] = {
              value: e,
              lastModified: Date.now(),
              ttl: n?.ttl,
              tags: new Set(n?.tags || []),
            };
          }
          async delete(t) {
            delete this.cache[t];
          }
          async expireTag(t) {
            let e = Array.isArray(t) ? t : [t];
            for (let t in this.cache)
              if (Object.prototype.hasOwnProperty.call(this.cache, t)) {
                let n = this.cache[t];
                e.some((t) => n.tags.has(t)) && delete this.cache[t];
              }
          }
        }
      },
      80481: (t) => {
        t.exports = require("node:readline");
      },
      80898: (t, e, n) => {
        Object.defineProperty(e, "__esModule", { value: !0 }),
          (e.createResumableStreamContextFactory = function (t) {
            return function (e) {
              let n = {
                  keyPrefix: `${e.keyPrefix || "resumable-stream"}:rs`,
                  waitUntil: e.waitUntil,
                  subscriber: e.subscriber,
                  publisher: e.publisher,
                },
                i = [];
              return (
                e.subscriber &&
                  e.subscriber.defineCommand &&
                  (n.subscriber = (0, r.createSubscriberAdapter)(e.subscriber)),
                e.publisher &&
                  e.publisher.defineCommand &&
                  (n.publisher = (0, r.createPublisherAdapter)(e.publisher)),
                n.subscriber ||
                  ((n.subscriber = t.subscriber()),
                  i.push(n.subscriber.connect())),
                n.publisher ||
                  ((n.publisher = t.publisher()),
                  i.push(n.publisher.connect())),
                {
                  resumeExistingStream: async (t, e) =>
                    a(Promise.all(i), n, t, e),
                  createNewResumableStream: async (t, e, r) => {
                    let o = Promise.all(i);
                    return (
                      await o,
                      await n.publisher.set(
                        `${n.keyPrefix}:sentinel:${t}`,
                        "1",
                        { EX: 86400 },
                      ),
                      s(o, n, t, e)
                    );
                  },
                  resumableStream: async (t, e, r) =>
                    u(Promise.all(i), n, t, e, r),
                }
              );
            };
          }),
          (e.resumeStream = c);
        let r = n(70910),
          i = "\n\n\nDONE_SENTINEL_hasdfasudfyge374%$%^$EDSATRTYFtydryrte\n",
          o = "DONE";
        async function a(t, e, n, r) {
          await t;
          let i = await e.publisher.get(`${e.keyPrefix}:sentinel:${n}`);
          if (i) return i === o ? null : c(e, n, r);
        }
        async function s(t, e, n, r) {
          let a;
          await t;
          let s = [],
            u = [];
          e.waitUntil(
            new Promise((t) => {
              a = t;
            }),
          );
          let c = !1;
          return (
            await e.subscriber.subscribe(
              `${e.keyPrefix}:request:${n}`,
              async (t) => {
                let n = JSON.parse(t);
                l("Connected to listener", n.listenerId),
                  u.push(n.listenerId),
                  l("parsedMessage", s.length, n.skipCharacters);
                let r = s.join("").slice(n.skipCharacters || 0);
                l("sending chunks", r.length);
                let o = [];
                o.push(
                  e.publisher.publish(
                    `${e.keyPrefix}:chunk:${n.listenerId}`,
                    r,
                  ),
                ),
                  c &&
                    o.push(
                      e.publisher.publish(
                        `${e.keyPrefix}:chunk:${n.listenerId}`,
                        i,
                      ),
                    ),
                  await Promise.all(o);
              },
            ),
            new ReadableStream({
              start(t) {
                let d = r().getReader();
                !(function r() {
                  d.read().then(async ({ done: d, value: f }) => {
                    if (d) {
                      (c = !0), l("Stream done");
                      try {
                        t.close();
                      } catch (t) {}
                      let r = [];
                      for (let t of (l("setting sentinel to done"),
                      r.push(
                        e.publisher.set(`${e.keyPrefix}:sentinel:${n}`, o, {
                          EX: 86400,
                        }),
                      ),
                      r.push(
                        e.subscriber.unsubscribe(`${e.keyPrefix}:request:${n}`),
                      ),
                      u))
                        l("sending done message to", t),
                          r.push(
                            e.publisher.publish(`${e.keyPrefix}:chunk:${t}`, i),
                          );
                      await Promise.all(r), null == a || a(), l("Cleanup done");
                      return;
                    }
                    s.push(f);
                    try {
                      l("Enqueuing line", f), t.enqueue(f);
                    } catch (t) {}
                    let p = [];
                    for (let t of u)
                      l("sending line to", t),
                        p.push(
                          e.publisher.publish(`${e.keyPrefix}:chunk:${t}`, f),
                        );
                    await Promise.all(p), r();
                  });
                })();
              },
            })
          );
        }
        async function u(t, e, n, r, i) {
          var a, u;
          await t;
          let d = await ((a = e.publisher),
          (u = `${e.keyPrefix}:sentinel:${n}`),
          a.incr(u).catch((t) => {
            if (
              String(t).includes("ERR value is not an integer or out of range")
            )
              return o;
            throw t;
          }));
          return (l("currentListenerCount", d), d === o)
            ? null
            : d > 1
              ? c(e, n, i)
              : s(t, e, n, r);
        }
        async function c(t, e, n) {
          let r = crypto.randomUUID();
          return new Promise((a, s) => {
            let u = new ReadableStream({
              async start(c) {
                try {
                  l("STARTING STREAM", e, r);
                  let s = async () => {
                      await t.subscriber.unsubscribe(
                        `${t.keyPrefix}:chunk:${r}`,
                      );
                    },
                    d = Date.now(),
                    f = setTimeout(async () => {
                      await s(),
                        (await t.publisher.get(
                          `${t.keyPrefix}:sentinel:${e}`,
                        )) === o && a(null),
                        Date.now() - d > 1e3 &&
                          c.error(Error("Timeout waiting for ack"));
                    }, 1e3);
                  await t.subscriber.subscribe(
                    `${t.keyPrefix}:chunk:${r}`,
                    async (t) => {
                      if (
                        (l("Received message", t),
                        clearTimeout(f),
                        a(u),
                        t === i)
                      ) {
                        try {
                          c.close();
                        } catch (t) {
                          console.error(t);
                        }
                        await s();
                        return;
                      }
                      try {
                        c.enqueue(t);
                      } catch (t) {
                        console.error(t), await s();
                      }
                    },
                  ),
                    await t.publisher.publish(
                      `${t.keyPrefix}:request:${e}`,
                      JSON.stringify({ listenerId: r, skipCharacters: n }),
                    );
                } catch (t) {
                  s(t);
                }
              },
            });
          });
        }
        function l(...t) {
          process.env.DEBUG && console.log(...t);
        }
      },
      81630: (t) => {
        t.exports = require("http");
      },
      83997: (t) => {
        t.exports = require("tty");
      },
      84297: (t) => {
        t.exports = require("async_hooks");
      },
      84835: (t) => {
        t.exports = require("redis");
      },
      85488: (t) => {
        t.exports = import("ai");
      },
      85968: (t, e) => {
        Object.defineProperty(e, "__esModule", { value: !0 }),
          (e.getRedisUrl = function () {
            let t = process.env.REDIS_URL || process.env.KV_URL;
            if (!t) throw Error("REDIS_URL environment variable is not set");
            return t;
          });
      },
      86592: (t) => {
        t.exports = require("node:inspector");
      },
      91645: (t) => {
        t.exports = require("net");
      },
      92294: function (t, e, n) {
        var r =
            (this && this.__createBinding) ||
            (Object.create
              ? function (t, e, n, r) {
                  void 0 === r && (r = n);
                  var i = Object.getOwnPropertyDescriptor(e, n);
                  (!i ||
                    ("get" in i
                      ? !e.__esModule
                      : i.writable || i.configurable)) &&
                    (i = {
                      enumerable: !0,
                      get: function () {
                        return e[n];
                      },
                    }),
                    Object.defineProperty(t, r, i);
                }
              : function (t, e, n, r) {
                  void 0 === r && (r = n), (t[r] = e[n]);
                }),
          i =
            (this && this.__exportStar) ||
            function (t, e) {
              for (var n in t)
                "default" === n ||
                  Object.prototype.hasOwnProperty.call(e, n) ||
                  r(e, t, n);
            };
        Object.defineProperty(e, "__esModule", { value: !0 }), i(n(96449), e);
      },
      94735: (t) => {
        t.exports = require("events");
      },
      95972: (t, e, n) => {
        function r(t) {
          let e =
            "object" == typeof t.metadata &&
            null !== t.metadata &&
            "parts" in t.metadata
              ? t.metadata.parts
              : [{ type: "text", content: t.content }];
          return {
            id: t.id,
            role: t.role,
            content: t.content || "",
            createdAt: new Date(t.created_at),
            ...(e && {
              parts: e.map((t) => ({
                type: t.type || "text",
                ...(t.content && { content: t.content }),
                ...(t.text && { text: t.text }),
              })),
            }),
            ...(t.metadata &&
              "experimental_attachments" in t.metadata && {
                experimental_attachments: t.metadata.experimental_attachments,
              }),
          };
        }
        n.d(e, { Gq: () => r });
      },
      96449: function (t, e, n) {
        var r =
            (this && this.__createBinding) ||
            (Object.create
              ? function (t, e, n, r) {
                  void 0 === r && (r = n);
                  var i = Object.getOwnPropertyDescriptor(e, n);
                  (!i ||
                    ("get" in i
                      ? !e.__esModule
                      : i.writable || i.configurable)) &&
                    (i = {
                      enumerable: !0,
                      get: function () {
                        return e[n];
                      },
                    }),
                    Object.defineProperty(t, r, i);
                }
              : function (t, e, n, r) {
                  void 0 === r && (r = n), (t[r] = e[n]);
                }),
          i =
            (this && this.__exportStar) ||
            function (t, e) {
              for (var n in t)
                "default" === n ||
                  Object.prototype.hasOwnProperty.call(e, n) ||
                  r(e, t, n);
            };
        Object.defineProperty(e, "__esModule", { value: !0 }),
          (e.createResumableStreamContext = e.resumeStream = void 0);
        let o = n(85968),
          a = n(84835),
          s = n(80898);
        i(n(69155), e);
        var u = n(80898);
        Object.defineProperty(e, "resumeStream", {
          enumerable: !0,
          get: function () {
            return u.resumeStream;
          },
        }),
          (e.createResumableStreamContext = (0,
          s.createResumableStreamContextFactory)({
            publisher: () => (0, a.createClient)({ url: (0, o.getRedisUrl)() }),
            subscriber: () =>
              (0, a.createClient)({ url: (0, o.getRedisUrl)() }),
          }));
      },
    });
  var e = require("../../../../webpack-runtime.js");
  e.C(t);
  var n = (t) => e((e.s = t)),
    r = e.X(
      0,
      [
        827, 4990, 7719, 8119, 5058, 5400, 131, 8342, 7826, 4256, 978, 3346,
        4170, 8287, 7490, 8305, 8277, 9959, 3751, 662, 1190,
      ],
      () => n(50398),
    );
  module.exports = r;
})();
//# sourceMappingURL=route.js.map
