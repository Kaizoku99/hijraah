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
    (e._sentryDebugIds[t] = "10c75798-5a20-44cf-8831-82f304589c06"),
    (e._sentryDebugIdIdentifier =
      "sentry-dbid-10c75798-5a20-44cf-8831-82f304589c06"));
} catch (e) {}
(() => {
  var e = {};
  (e.id = 7322),
    (e.ids = [7322]),
    (e.modules = {
      3295: (e) => {
        "use strict";
        e.exports = require("next/dist/server/app-render/after-task-async-storage.external.js");
      },
      4908: (e, t, r) => {
        "use strict";
        r.d(t, { T: () => s });
        let s = (e) => "function" == typeof e;
      },
      5073: (e, t, r) => {
        "use strict";
        let s = r(73668);
        (e.exports = s),
          (e.exports.HttpAgent = s),
          (e.exports.HttpsAgent = r(56458)),
          (e.exports.constants = r(74072));
      },
      8086: (e) => {
        "use strict";
        e.exports = require("module");
      },
      8257: (e, t, r) => {
        "use strict";
        let s;
        r.r(t),
          r.d(t, {
            default: () => p,
            generateImageMetadata: () => u,
            generateMetadata: () => h,
            generateViewport: () => d,
          });
        var n = r(63033),
          i = r(26394),
          o = r(60442),
          a = (0, i.registerClientReference)(
            function () {
              throw Error(
                "Attempted to call the default export of \"E:\\\\downloads\\\\Hijraah\\\\apps\\\\web\\\\src\\\\app\\\\research\\\\page.tsx\" from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
              );
            },
            "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\research\\page.tsx",
            "default",
          );
        let l = { ...n },
          c =
            "workUnitAsyncStorage" in l
              ? l.workUnitAsyncStorage
              : "requestAsyncStorage" in l
                ? l.requestAsyncStorage
                : void 0;
        s =
          "function" == typeof a
            ? new Proxy(a, {
                apply: (e, t, r) => {
                  let s, n, i;
                  try {
                    let e = c?.getStore();
                    (s = e?.headers.get("sentry-trace") ?? void 0),
                      (n = e?.headers.get("baggage") ?? void 0),
                      (i = e?.headers);
                  } catch (e) {}
                  return o
                    .wrapServerComponentWithSentry(e, {
                      componentRoute: "/research",
                      componentType: "Page",
                      sentryTraceHeader: s,
                      baggageHeader: n,
                      headers: i,
                    })
                    .apply(t, r);
                },
              })
            : a;
        let h = void 0,
          u = void 0,
          d = void 0,
          p = s;
      },
      10846: (e) => {
        "use strict";
        e.exports = require("next/dist/compiled/next-server/app-page.runtime.prod.js");
      },
      11997: (e) => {
        "use strict";
        e.exports = require("punycode");
      },
      15668: (e) => {
        function t(e) {
          var t = Error("Cannot find module '" + e + "'");
          throw ((t.code = "MODULE_NOT_FOUND"), t);
        }
        (t.keys = () => []), (t.resolve = t), (t.id = 15668), (e.exports = t);
      },
      19121: (e) => {
        "use strict";
        e.exports = require("next/dist/server/app-render/action-async-storage.external.js");
      },
      19771: (e) => {
        "use strict";
        e.exports = require("process");
      },
      21820: (e) => {
        "use strict";
        e.exports = require("os");
      },
      25601: (e, t, r) => {
        "use strict";
        var s = r(28354),
          n = r(31471);
        e.exports = function (e) {
          if ("number" == typeof e) return e;
          var t = n(e);
          return (
            void 0 === t &&
              console.warn(
                Error(s.format("humanize-ms(%j) result undefined", e)).stack,
              ),
            t
          );
        };
      },
      27910: (e) => {
        "use strict";
        e.exports = require("stream");
      },
      28216: (e, t) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 });
        let r = new WeakMap(),
          s = new WeakMap();
        function n(e) {
          let t = r.get(e);
          return (
            console.assert(
              null != t,
              "'this' is expected an Event object, but got",
              e,
            ),
            t
          );
        }
        function i(e) {
          if (null != e.passiveListener) {
            "undefined" != typeof console &&
              "function" == typeof console.error &&
              console.error(
                "Unable to preventDefault inside passive event listener invocation.",
                e.passiveListener,
              );
            return;
          }
          e.event.cancelable &&
            ((e.canceled = !0),
            "function" == typeof e.event.preventDefault &&
              e.event.preventDefault());
        }
        function o(e, t) {
          r.set(this, {
            eventTarget: e,
            event: t,
            eventPhase: 2,
            currentTarget: e,
            canceled: !1,
            stopped: !1,
            immediateStopped: !1,
            passiveListener: null,
            timeStamp: t.timeStamp || Date.now(),
          }),
            Object.defineProperty(this, "isTrusted", {
              value: !1,
              enumerable: !0,
            });
          let s = Object.keys(t);
          for (let e = 0; e < s.length; ++e) {
            let t = s[e];
            t in this || Object.defineProperty(this, t, a(t));
          }
        }
        function a(e) {
          return {
            get() {
              return n(this).event[e];
            },
            set(t) {
              n(this).event[e] = t;
            },
            configurable: !0,
            enumerable: !0,
          };
        }
        function l(e, t) {
          n(e).passiveListener = t;
        }
        (o.prototype = {
          get type() {
            return n(this).event.type;
          },
          get target() {
            return n(this).eventTarget;
          },
          get currentTarget() {
            return n(this).currentTarget;
          },
          composedPath() {
            let e = n(this).currentTarget;
            return null == e ? [] : [e];
          },
          get NONE() {
            return 0;
          },
          get CAPTURING_PHASE() {
            return 1;
          },
          get AT_TARGET() {
            return 2;
          },
          get BUBBLING_PHASE() {
            return 3;
          },
          get eventPhase() {
            return n(this).eventPhase;
          },
          stopPropagation() {
            let e = n(this);
            (e.stopped = !0),
              "function" == typeof e.event.stopPropagation &&
                e.event.stopPropagation();
          },
          stopImmediatePropagation() {
            let e = n(this);
            (e.stopped = !0),
              (e.immediateStopped = !0),
              "function" == typeof e.event.stopImmediatePropagation &&
                e.event.stopImmediatePropagation();
          },
          get bubbles() {
            return !!n(this).event.bubbles;
          },
          get cancelable() {
            return !!n(this).event.cancelable;
          },
          preventDefault() {
            i(n(this));
          },
          get defaultPrevented() {
            return n(this).canceled;
          },
          get composed() {
            return !!n(this).event.composed;
          },
          get timeStamp() {
            return n(this).timeStamp;
          },
          get srcElement() {
            return n(this).eventTarget;
          },
          get cancelBubble() {
            return n(this).stopped;
          },
          set cancelBubble(value) {
            if (!value) return;
            let e = n(this);
            (e.stopped = !0),
              "boolean" == typeof e.event.cancelBubble &&
                (e.event.cancelBubble = !0);
          },
          get returnValue() {
            return !n(this).canceled;
          },
          set returnValue(value) {
            value || i(n(this));
          },
          initEvent() {},
        }),
          Object.defineProperty(o.prototype, "constructor", {
            value: o,
            configurable: !0,
            writable: !0,
          }),
          "undefined" != typeof window &&
            void 0 !== window.Event &&
            (Object.setPrototypeOf(o.prototype, window.Event.prototype),
            s.set(window.Event.prototype, o));
        let c = new WeakMap();
        function h(e) {
          return null !== e && "object" == typeof e;
        }
        function u(e) {
          let t = c.get(e);
          if (null == t)
            throw TypeError(
              "'this' is expected an EventTarget object, but got another value.",
            );
          return t;
        }
        function d(e, t) {
          Object.defineProperty(e, `on${t}`, {
            get() {
              let e = u(this).get(t);
              for (; null != e; ) {
                if (3 === e.listenerType) return e.listener;
                e = e.next;
              }
              return null;
            },
            set(e) {
              "function" == typeof e || h(e) || (e = null);
              let r = u(this),
                s = null,
                n = r.get(t);
              for (; null != n; )
                3 === n.listenerType
                  ? null !== s
                    ? (s.next = n.next)
                    : null !== n.next
                      ? r.set(t, n.next)
                      : r.delete(t)
                  : (s = n),
                  (n = n.next);
              if (null !== e) {
                let n = {
                  listener: e,
                  listenerType: 3,
                  passive: !1,
                  once: !1,
                  next: null,
                };
                null === s ? r.set(t, n) : (s.next = n);
              }
            },
            configurable: !0,
            enumerable: !0,
          });
        }
        function p(e) {
          function t() {
            f.call(this);
          }
          t.prototype = Object.create(f.prototype, {
            constructor: { value: t, configurable: !0, writable: !0 },
          });
          for (let r = 0; r < e.length; ++r) d(t.prototype, e[r]);
          return t;
        }
        function f() {
          if (this instanceof f) return void c.set(this, new Map());
          if (1 == arguments.length && Array.isArray(arguments[0]))
            return p(arguments[0]);
          if (arguments.length > 0) {
            let e = Array(arguments.length);
            for (let t = 0; t < arguments.length; ++t) e[t] = arguments[t];
            return p(e);
          }
          throw TypeError("Cannot call a class as a function");
        }
        (f.prototype = {
          addEventListener(e, t, r) {
            if (null == t) return;
            if ("function" != typeof t && !h(t))
              throw TypeError("'listener' should be a function or an object.");
            let s = u(this),
              n = h(r),
              i = (n ? r.capture : r) ? 1 : 2,
              o = {
                listener: t,
                listenerType: i,
                passive: n && !!r.passive,
                once: n && !!r.once,
                next: null,
              },
              a = s.get(e);
            if (void 0 === a) return void s.set(e, o);
            let l = null;
            for (; null != a; ) {
              if (a.listener === t && a.listenerType === i) return;
              (l = a), (a = a.next);
            }
            l.next = o;
          },
          removeEventListener(e, t, r) {
            if (null == t) return;
            let s = u(this),
              n = (h(r) ? r.capture : r) ? 1 : 2,
              i = null,
              o = s.get(e);
            for (; null != o; ) {
              if (o.listener === t && o.listenerType === n)
                return void (null !== i
                  ? (i.next = o.next)
                  : null !== o.next
                    ? s.set(e, o.next)
                    : s.delete(e));
              (i = o), (o = o.next);
            }
          },
          dispatchEvent(e) {
            if (null == e || "string" != typeof e.type)
              throw TypeError('"event.type" should be a string.');
            let t = u(this),
              r = e.type,
              i = t.get(r);
            if (null == i) return !0;
            let c = new ((function e(t) {
                if (null == t || t === Object.prototype) return o;
                let r = s.get(t);
                return (
                  null == r &&
                    ((r = (function (e, t) {
                      let r = Object.keys(t);
                      if (0 === r.length) return e;
                      function s(t, r) {
                        e.call(this, t, r);
                      }
                      s.prototype = Object.create(e.prototype, {
                        constructor: {
                          value: s,
                          configurable: !0,
                          writable: !0,
                        },
                      });
                      for (let i = 0; i < r.length; ++i) {
                        let o = r[i];
                        if (!(o in e.prototype)) {
                          let e =
                            "function" ==
                            typeof Object.getOwnPropertyDescriptor(t, o).value;
                          Object.defineProperty(
                            s.prototype,
                            o,
                            e
                              ? (function (e) {
                                  return {
                                    value() {
                                      let t = n(this).event;
                                      return t[e].apply(t, arguments);
                                    },
                                    configurable: !0,
                                    enumerable: !0,
                                  };
                                })(o)
                              : a(o),
                          );
                        }
                      }
                      return s;
                    })(e(Object.getPrototypeOf(t)), t)),
                    s.set(t, r)),
                  r
                );
              })(Object.getPrototypeOf(e)))(this, e),
              h = null;
            for (; null != i; ) {
              if (
                (i.once
                  ? null !== h
                    ? (h.next = i.next)
                    : null !== i.next
                      ? t.set(r, i.next)
                      : t.delete(r)
                  : (h = i),
                l(c, i.passive ? i.listener : null),
                "function" == typeof i.listener)
              )
                try {
                  i.listener.call(this, c);
                } catch (e) {
                  "undefined" != typeof console &&
                    "function" == typeof console.error &&
                    console.error(e);
                }
              else
                3 !== i.listenerType &&
                  "function" == typeof i.listener.handleEvent &&
                  i.listener.handleEvent(c);
              if (n(c).immediateStopped) break;
              i = i.next;
            }
            return (
              l(c, null),
              (n(c).eventPhase = 0),
              (n(c).currentTarget = null),
              !c.defaultPrevented
            );
          },
        }),
          Object.defineProperty(f.prototype, "constructor", {
            value: f,
            configurable: !0,
            writable: !0,
          }),
          "undefined" != typeof window &&
            void 0 !== window.EventTarget &&
            Object.setPrototypeOf(f.prototype, window.EventTarget.prototype),
          (t.defineEventAttribute = d),
          (t.EventTarget = f),
          (t.default = f),
          (e.exports = f),
          (e.exports.EventTarget = e.exports.default = f),
          (e.exports.defineEventAttribute = d);
      },
      28354: (e) => {
        "use strict";
        e.exports = require("util");
      },
      28777: (e, t, r) => {
        "use strict";
        function s(e, t, { checkForDefaultPrevented: r = !0 } = {}) {
          return function (s) {
            if ((e?.(s), !1 === r || !s.defaultPrevented)) return t?.(s);
          };
        }
        r.d(t, { m: () => s });
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
      32367: (e, t, r) => {
        "use strict";
        let s;
        r.d(t, { AG: () => y, Iw: () => m, UU: () => g });
        var n = r(97713),
          i = r(15149),
          o = r.n(i),
          a = r(84205);
        let { fetch: l } = o()(),
          c = "http://localhost:54321",
          h =
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0",
          u = process.env.SUPABASE_SERVICE_ROLE_KEY,
          d = h ? { apikey: h } : void 0;
        function p() {
          if (!c || !h)
            throw (
              (console.error(
                "Missing environment variables NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY",
              ),
              Error("Supabase URL or Anon Key is missing."))
            );
        }
        {
          let e = globalThis;
          e.__USING_PONYFETCH__ ||
            ((e.fetch = l), (e.__USING_PONYFETCH__ = !0));
        }
        function f() {
          return (p(), s)
            ? s
            : (s = (0, n.createBrowserClient)(c, h, {
                global: { headers: d },
              }));
        }
        function m() {
          return (0, a.useMemo)(f, []);
        }
        function g() {
          return (
            p(), (0, n.createBrowserClient)(c, h, { global: { headers: d } })
          );
        }
        let y = f;
        f();
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
      37830: (e) => {
        "use strict";
        e.exports = require("node:stream/web");
      },
      38522: (e) => {
        "use strict";
        e.exports = require("node:zlib");
      },
      39610: (e, t, r) => {
        "use strict";
        r.d(t, { Z: () => l });
        var s,
          n,
          i = r(79897),
          o = function (e, t, r, s, n) {
            if ("m" === s) throw TypeError("Private method is not writable");
            if ("a" === s && !n)
              throw TypeError("Private accessor was defined without a setter");
            if ("function" == typeof t ? e !== t || !n : !t.has(e))
              throw TypeError(
                "Cannot write private member to an object whose class did not declare it",
              );
            return (
              "a" === s ? n.call(e, r) : n ? (n.value = r) : t.set(e, r), r
            );
          },
          a = function (e, t, r, s) {
            if ("a" === r && !s)
              throw TypeError("Private accessor was defined without a getter");
            if ("function" == typeof t ? e !== t || !s : !t.has(e))
              throw TypeError(
                "Cannot read private member from an object whose class did not declare it",
              );
            return "m" === r
              ? s
              : "a" === r
                ? s.call(e)
                : s
                  ? s.value
                  : t.get(e);
          };
        class l extends i.Y {
          constructor(e, t, r = {}) {
            if (
              (super(e, r),
              s.set(this, void 0),
              n.set(this, 0),
              arguments.length < 2)
            )
              throw TypeError(
                `Failed to construct 'File': 2 arguments required, but only ${arguments.length} present.`,
              );
            o(this, s, String(t), "f");
            let i =
              void 0 === r.lastModified ? Date.now() : Number(r.lastModified);
            Number.isNaN(i) || o(this, n, i, "f");
          }
          static [((s = new WeakMap()),
          (n = new WeakMap()),
          Symbol.hasInstance)](e) {
            return (
              e instanceof i.Y &&
              "File" === e[Symbol.toStringTag] &&
              "string" == typeof e.name
            );
          }
          get name() {
            return a(this, s, "f");
          }
          get lastModified() {
            return a(this, n, "f");
          }
          get webkitRelativePath() {
            return "";
          }
          get [Symbol.toStringTag]() {
            return "File";
          }
        }
      },
      40179: (e, t, r) => {
        "use strict";
        r.a(e, async (e, s) => {
          try {
            r.r(t), r.d(t, { default: () => u });
            var n = r(61268),
              i = r(84205),
              o = r(51624),
              a = r(71300),
              l = r(32367),
              c = r(98654),
              h = e([o]);
            function u() {
              let [e, t] = (0, i.useState)(!1),
                [r, s] = (0, i.useState)(null),
                h = (0, l.Iw)(),
                u = new a.g(process.env.NEXT_PUBLIC_OPENAI_API_KEY || "", h),
                d = async (e, r) => {
                  t(!0);
                  try {
                    let t = await u.deepResearch(e, r);
                    s(t), c.oR.success("Research completed successfully");
                  } catch (e) {
                    console.error("Research error:", e),
                      c.oR.error(
                        e instanceof Error
                          ? e.message
                          : "Failed to complete research",
                      ),
                      s("Failed to complete research. Please try again.");
                  } finally {
                    t(!1);
                  }
                };
              return (0, n.jsxs)("div", {
                className: "container mx-auto py-8",
                children: [
                  (0, n.jsx)("h1", {
                    className: "text-3xl font-bold mb-8",
                    children: "Deep Immigration Research",
                  }),
                  (0, n.jsx)(o.c, { onResearch: d, isLoading: e, results: r }),
                ],
              });
            }
            (o = (h.then ? (await h)() : h)[0]), s();
          } catch (e) {
            s(e);
          }
        });
      },
      41692: (e) => {
        "use strict";
        e.exports = require("node:tls");
      },
      44708: (e) => {
        "use strict";
        e.exports = require("node:https");
      },
      48161: (e) => {
        "use strict";
        e.exports = require("node:os");
      },
      53053: (e) => {
        "use strict";
        e.exports = require("node:diagnostics_channel");
      },
      53477: (e, t, r) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 });
        var s = r(28216);
        class AbortSignal extends s.EventTarget {
          constructor() {
            throw (
              (super(), TypeError("AbortSignal cannot be constructed directly"))
            );
          }
          get aborted() {
            let e = n.get(this);
            if ("boolean" != typeof e)
              throw TypeError(
                `Expected 'this' to be an 'AbortSignal' object, but got ${this === null ? "null" : typeof this}`,
              );
            return e;
          }
        }
        s.defineEventAttribute(AbortSignal.prototype, "abort");
        let n = new WeakMap();
        Object.defineProperties(AbortSignal.prototype, {
          aborted: { enumerable: !0 },
        }),
          "function" == typeof Symbol &&
            "symbol" == typeof Symbol.toStringTag &&
            Object.defineProperty(AbortSignal.prototype, Symbol.toStringTag, {
              configurable: !0,
              value: "AbortSignal",
            });
        class i {
          constructor() {
            o.set(
              this,
              (function () {
                let e = Object.create(AbortSignal.prototype);
                return s.EventTarget.call(e), n.set(e, !1), e;
              })(),
            );
          }
          get signal() {
            return a(this);
          }
          abort() {
            var e;
            (e = a(this)),
              !1 === n.get(e) &&
                (n.set(e, !0), e.dispatchEvent({ type: "abort" }));
          }
        }
        let o = new WeakMap();
        function a(e) {
          let t = o.get(e);
          if (null == t)
            throw TypeError(
              `Expected 'this' to be an 'AbortController' object, but got ${null === e ? "null" : typeof e}`,
            );
          return t;
        }
        Object.defineProperties(i.prototype, {
          signal: { enumerable: !0 },
          abort: { enumerable: !0 },
        }),
          "function" == typeof Symbol &&
            "symbol" == typeof Symbol.toStringTag &&
            Object.defineProperty(i.prototype, Symbol.toStringTag, {
              configurable: !0,
              value: "AbortController",
            }),
          (t.AbortController = i),
          (t.AbortSignal = AbortSignal),
          (t.default = i),
          (e.exports = i),
          (e.exports.AbortController = e.exports.default = i),
          (e.exports.AbortSignal = AbortSignal);
      },
      55511: (e) => {
        "use strict";
        e.exports = require("crypto");
      },
      55591: (e) => {
        "use strict";
        e.exports = require("https");
      },
      56458: (e, t, r) => {
        "use strict";
        let s = r(55591).Agent,
          n = r(73668),
          { INIT_SOCKET: i, CREATE_HTTPS_CONNECTION: o } = r(74072);
        class a extends n {
          constructor(e) {
            super(e),
              (this.defaultPort = 443),
              (this.protocol = "https:"),
              (this.maxCachedSessions = this.options.maxCachedSessions),
              void 0 === this.maxCachedSessions &&
                (this.maxCachedSessions = 100),
              (this._sessionCache = { map: {}, list: [] });
          }
          createConnection(e, t) {
            let r = this[o](e, t);
            return this[i](r, e), r;
          }
        }
        (a.prototype[o] = s.prototype.createConnection),
          ["getName", "_getSession", "_cacheSession", "_evictSession"].forEach(
            function (e) {
              "function" == typeof s.prototype[e] &&
                (a.prototype[e] = s.prototype[e]);
            },
          ),
          (e.exports = a);
      },
      57075: (e) => {
        "use strict";
        e.exports = require("node:stream");
      },
      57975: (e) => {
        "use strict";
        e.exports = require("node:util");
      },
      58132: (e, t, r) => {
        "use strict";
        r.r(t),
          r.d(t, {
            GlobalError: () => i.default,
            __next_app__: () => h,
            pages: () => c,
            routeModule: () => u,
            tree: () => l,
          });
        var s = r(11610),
          n = r(51293),
          i = r(59059),
          o = r(17770),
          a = {};
        for (let e in o)
          0 >
            [
              "default",
              "tree",
              "pages",
              "GlobalError",
              "__next_app__",
              "routeModule",
            ].indexOf(e) && (a[e] = () => o[e]);
        r.d(t, a);
        let l = {
            children: [
              "",
              {
                children: [
                  "research",
                  {
                    children: [
                      "__PAGE__",
                      {},
                      {
                        page: [
                          () => Promise.resolve().then(r.bind(r, 8257)),
                          "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\research\\page.tsx",
                        ],
                      },
                    ],
                  },
                  {},
                ],
              },
              {
                layout: [
                  () => Promise.resolve().then(r.bind(r, 22630)),
                  "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\layout.tsx",
                ],
                error: [
                  () => Promise.resolve().then(r.bind(r, 94745)),
                  "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\error.tsx",
                ],
                "global-error": [
                  () => Promise.resolve().then(r.bind(r, 59059)),
                  "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\global-error.tsx",
                ],
                "not-found": [
                  () => Promise.resolve().then(r.bind(r, 53974)),
                  "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\not-found.tsx",
                ],
                forbidden: [
                  () => Promise.resolve().then(r.t.bind(r, 57382, 23)),
                  "next/dist/client/components/forbidden-error",
                ],
                unauthorized: [
                  () => Promise.resolve().then(r.t.bind(r, 87039, 23)),
                  "next/dist/client/components/unauthorized-error",
                ],
              },
            ],
          }.children,
          c = [
            "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\research\\page.tsx",
          ],
          h = { require: r, loadChunk: () => Promise.resolve() },
          u = new s.AppPageRouteModule({
            definition: {
              kind: n.RouteKind.APP_PAGE,
              page: "/research/page",
              pathname: "/research",
              bundlePath: "",
              filename: "",
              appPaths: [],
            },
            userland: { loaderTree: l },
          });
      },
      59570: () => {},
      63033: (e) => {
        "use strict";
        e.exports = require("next/dist/server/app-render/work-unit-async-storage.external.js");
      },
      63941: (e, t, r) => {
        Promise.resolve().then(r.bind(r, 40179));
      },
      70021: (e, t, r) => {
        Promise.resolve().then(r.bind(r, 8257));
      },
      71300: (e, t, r) => {
        "use strict";
        let s, n, i, o, a, l, c, h, u, d, p;
        r.d(t, { g: () => lR });
        let f = "RFC3986",
          m = {
            RFC1738: (e) => String(e).replace(/%20/g, "+"),
            RFC3986: (e) => String(e),
          },
          g = (Object.prototype.hasOwnProperty, Array.isArray),
          y = (() => {
            let e = [];
            for (let t = 0; t < 256; ++t)
              e.push(
                "%" + ((t < 16 ? "0" : "") + t.toString(16)).toUpperCase(),
              );
            return e;
          })();
        function b(e, t) {
          if (g(e)) {
            let r = [];
            for (let s = 0; s < e.length; s += 1) r.push(t(e[s]));
            return r;
          }
          return t(e);
        }
        let w = Object.prototype.hasOwnProperty,
          _ = {
            brackets: (e) => String(e) + "[]",
            comma: "comma",
            indices: (e, t) => String(e) + "[" + t + "]",
            repeat: (e) => String(e),
          },
          v = Array.isArray,
          x = Array.prototype.push,
          S = function (e, t) {
            x.apply(e, v(t) ? t : [t]);
          },
          T = Date.prototype.toISOString,
          E = {
            addQueryPrefix: !1,
            allowDots: !1,
            allowEmptyArrays: !1,
            arrayFormat: "indices",
            charset: "utf-8",
            charsetSentinel: !1,
            delimiter: "&",
            encode: !0,
            encodeDotInKeys: !1,
            encoder: (e, t, r, s, n) => {
              if (0 === e.length) return e;
              let i = e;
              if (
                ("symbol" == typeof e
                  ? (i = Symbol.prototype.toString.call(e))
                  : "string" != typeof e && (i = String(e)),
                "iso-8859-1" === r)
              )
                return escape(i).replace(/%u[0-9a-f]{4}/gi, function (e) {
                  return "%26%23" + parseInt(e.slice(2), 16) + "%3B";
                });
              let o = "";
              for (let e = 0; e < i.length; e += 1024) {
                let t = i.length >= 1024 ? i.slice(e, e + 1024) : i,
                  r = [];
                for (let e = 0; e < t.length; ++e) {
                  let s = t.charCodeAt(e);
                  if (
                    45 === s ||
                    46 === s ||
                    95 === s ||
                    126 === s ||
                    (s >= 48 && s <= 57) ||
                    (s >= 65 && s <= 90) ||
                    (s >= 97 && s <= 122) ||
                    ("RFC1738" === n && (40 === s || 41 === s))
                  ) {
                    r[r.length] = t.charAt(e);
                    continue;
                  }
                  if (s < 128) {
                    r[r.length] = y[s];
                    continue;
                  }
                  if (s < 2048) {
                    r[r.length] = y[192 | (s >> 6)] + y[128 | (63 & s)];
                    continue;
                  }
                  if (s < 55296 || s >= 57344) {
                    r[r.length] =
                      y[224 | (s >> 12)] +
                      y[128 | ((s >> 6) & 63)] +
                      y[128 | (63 & s)];
                    continue;
                  }
                  (e += 1),
                    (s =
                      65536 + (((1023 & s) << 10) | (1023 & t.charCodeAt(e)))),
                    (r[r.length] =
                      y[240 | (s >> 18)] +
                      y[128 | ((s >> 12) & 63)] +
                      y[128 | ((s >> 6) & 63)] +
                      y[128 | (63 & s)]);
                }
                o += r.join("");
              }
              return o;
            },
            encodeValuesOnly: !1,
            format: f,
            formatter: m[f],
            indices: !1,
            serializeDate: (e) => T.call(e),
            skipNulls: !1,
            strictNullHandling: !1,
          },
          O = {},
          A = "4.104.0",
          R = !1;
        var k,
          C,
          P,
          L,
          I,
          $,
          j,
          z,
          M,
          q,
          N,
          F,
          B,
          D,
          W,
          U,
          H,
          J,
          X,
          V,
          K,
          Y,
          G,
          Q,
          Z,
          ee,
          et,
          er,
          es,
          en,
          ei,
          eo,
          ea,
          el,
          ec,
          eh,
          eu,
          ed,
          ep,
          ef,
          em,
          eg,
          ey,
          eb,
          ew,
          e_,
          ev,
          ex,
          eS,
          eT,
          eE,
          eO,
          eA,
          eR,
          ek,
          eC,
          eP,
          eL,
          eI,
          e$,
          ej,
          ez,
          eM,
          eq,
          eN,
          eF,
          eB,
          eD,
          eW,
          eU,
          eH,
          eJ,
          eX,
          eV,
          eK,
          eY,
          eG,
          eQ,
          eZ = r(27910),
          e0 = r(81630),
          e1 = r(79551),
          e2 = r(12502),
          e3 = r(55591),
          e8 = r(74075);
        let e5 = eZ.Readable,
          e4 = Symbol("buffer"),
          e6 = Symbol("type");
        class e7 {
          constructor() {
            this[e6] = "";
            let e = arguments[0],
              t = arguments[1],
              r = [];
            if (e) {
              let t = Number(e.length);
              for (let s = 0; s < t; s++) {
                let t,
                  n = e[s];
                (t =
                  n instanceof Buffer
                    ? n
                    : ArrayBuffer.isView(n)
                      ? Buffer.from(n.buffer, n.byteOffset, n.byteLength)
                      : n instanceof ArrayBuffer
                        ? Buffer.from(n)
                        : n instanceof e7
                          ? n[e4]
                          : Buffer.from("string" == typeof n ? n : String(n)))
                  .length,
                  r.push(t);
              }
            }
            this[e4] = Buffer.concat(r);
            let s = t && void 0 !== t.type && String(t.type).toLowerCase();
            s && !/[^\u0020-\u007E]/.test(s) && (this[e6] = s);
          }
          get size() {
            return this[e4].length;
          }
          get type() {
            return this[e6];
          }
          text() {
            return Promise.resolve(this[e4].toString());
          }
          arrayBuffer() {
            let e = this[e4];
            return Promise.resolve(
              e.buffer.slice(e.byteOffset, e.byteOffset + e.byteLength),
            );
          }
          stream() {
            let e = new e5();
            return (
              (e._read = function () {}), e.push(this[e4]), e.push(null), e
            );
          }
          toString() {
            return "[object Blob]";
          }
          slice() {
            let e,
              t,
              r = this.size,
              s = arguments[0],
              n = arguments[1];
            e = void 0 === s ? 0 : s < 0 ? Math.max(r + s, 0) : Math.min(s, r);
            let i = Math.max(
                (void 0 === n
                  ? r
                  : n < 0
                    ? Math.max(r + n, 0)
                    : Math.min(n, r)) - e,
                0,
              ),
              o = this[e4].slice(e, e + i),
              a = new e7([], { type: arguments[2] });
            return (a[e4] = o), a;
          }
        }
        function e9(e, t, r) {
          Error.call(this, e),
            (this.message = e),
            (this.type = t),
            r && (this.code = this.errno = r.code),
            Error.captureStackTrace(this, this.constructor);
        }
        Object.defineProperties(e7.prototype, {
          size: { enumerable: !0 },
          type: { enumerable: !0 },
          slice: { enumerable: !0 },
        }),
          Object.defineProperty(e7.prototype, Symbol.toStringTag, {
            value: "Blob",
            writable: !1,
            enumerable: !1,
            configurable: !0,
          }),
          (e9.prototype = Object.create(Error.prototype)),
          (e9.prototype.constructor = e9),
          (e9.prototype.name = "FetchError");
        try {
          s = require("encoding").convert;
        } catch (e) {}
        let te = Symbol("Body internals"),
          tt = eZ.PassThrough;
        function tr(e) {
          var t = this,
            r =
              arguments.length > 1 && void 0 !== arguments[1]
                ? arguments[1]
                : {},
            s = r.size,
            n = r.timeout;
          null == e
            ? (e = null)
            : tn(e)
              ? (e = Buffer.from(e.toString()))
              : ti(e) ||
                Buffer.isBuffer(e) ||
                ("[object ArrayBuffer]" === Object.prototype.toString.call(e)
                  ? (e = Buffer.from(e))
                  : ArrayBuffer.isView(e)
                    ? (e = Buffer.from(e.buffer, e.byteOffset, e.byteLength))
                    : e instanceof eZ || (e = Buffer.from(String(e)))),
            (this[te] = { body: e, disturbed: !1, error: null }),
            (this.size = void 0 === s ? 0 : s),
            (this.timeout = void 0 === n ? 0 : n),
            e instanceof eZ &&
              e.on("error", function (e) {
                let r =
                  "AbortError" === e.name
                    ? e
                    : new e9(
                        `Invalid response body while trying to fetch ${t.url}: ${e.message}`,
                        "system",
                        e,
                      );
                t[te].error = r;
              });
        }
        function ts() {
          var e = this;
          if (this[te].disturbed)
            return tr.Promise.reject(
              TypeError(`body used already for: ${this.url}`),
            );
          if (((this[te].disturbed = !0), this[te].error))
            return tr.Promise.reject(this[te].error);
          let t = this.body;
          if (null === t) return tr.Promise.resolve(Buffer.alloc(0));
          if ((ti(t) && (t = t.stream()), Buffer.isBuffer(t)))
            return tr.Promise.resolve(t);
          if (!(t instanceof eZ)) return tr.Promise.resolve(Buffer.alloc(0));
          let r = [],
            s = 0,
            n = !1;
          return new tr.Promise(function (i, o) {
            let a;
            e.timeout &&
              (a = setTimeout(function () {
                (n = !0),
                  o(
                    new e9(
                      `Response timeout while trying to fetch ${e.url} (over ${e.timeout}ms)`,
                      "body-timeout",
                    ),
                  );
              }, e.timeout)),
              t.on("error", function (t) {
                "AbortError" === t.name
                  ? ((n = !0), o(t))
                  : o(
                      new e9(
                        `Invalid response body while trying to fetch ${e.url}: ${t.message}`,
                        "system",
                        t,
                      ),
                    );
              }),
              t.on("data", function (t) {
                if (!n && null !== t) {
                  if (e.size && s + t.length > e.size) {
                    (n = !0),
                      o(
                        new e9(
                          `content size at ${e.url} over limit: ${e.size}`,
                          "max-size",
                        ),
                      );
                    return;
                  }
                  (s += t.length), r.push(t);
                }
              }),
              t.on("end", function () {
                if (!n) {
                  clearTimeout(a);
                  try {
                    i(Buffer.concat(r, s));
                  } catch (t) {
                    o(
                      new e9(
                        `Could not create Buffer from response body for ${e.url}: ${t.message}`,
                        "system",
                        t,
                      ),
                    );
                  }
                }
              });
          });
        }
        function tn(e) {
          return (
            "object" == typeof e &&
            "function" == typeof e.append &&
            "function" == typeof e.delete &&
            "function" == typeof e.get &&
            "function" == typeof e.getAll &&
            "function" == typeof e.has &&
            "function" == typeof e.set &&
            ("URLSearchParams" === e.constructor.name ||
              "[object URLSearchParams]" ===
                Object.prototype.toString.call(e) ||
              "function" == typeof e.sort)
          );
        }
        function ti(e) {
          return (
            "object" == typeof e &&
            "function" == typeof e.arrayBuffer &&
            "string" == typeof e.type &&
            "function" == typeof e.stream &&
            "function" == typeof e.constructor &&
            "string" == typeof e.constructor.name &&
            /^(Blob|File)$/.test(e.constructor.name) &&
            /^(Blob|File)$/.test(e[Symbol.toStringTag])
          );
        }
        function to(e) {
          let t,
            r,
            s = e.body;
          if (e.bodyUsed) throw Error("cannot clone body after it is used");
          return (
            s instanceof eZ &&
              "function" != typeof s.getBoundary &&
              ((t = new tt()),
              (r = new tt()),
              s.pipe(t),
              s.pipe(r),
              (e[te].body = t),
              (s = r)),
            s
          );
        }
        function ta(e) {
          if (null === e) return null;
          if ("string" == typeof e) return "text/plain;charset=UTF-8";
          if (tn(e)) return "application/x-www-form-urlencoded;charset=UTF-8";
          if (ti(e)) return e.type || null;
          if (Buffer.isBuffer(e)) return null;
          else if ("[object ArrayBuffer]" === Object.prototype.toString.call(e))
            return null;
          else if (ArrayBuffer.isView(e)) return null;
          else if ("function" == typeof e.getBoundary)
            return `multipart/form-data;boundary=${e.getBoundary()}`;
          else if (e instanceof eZ) return null;
          else return "text/plain;charset=UTF-8";
        }
        function tl(e) {
          let t = e.body;
          return null === t
            ? 0
            : ti(t)
              ? t.size
              : Buffer.isBuffer(t)
                ? t.length
                : t && "function" == typeof t.getLengthSync
                  ? (t._lengthRetrievers && 0 == t._lengthRetrievers.length) ||
                    (t.hasKnownLength && t.hasKnownLength())
                    ? t.getLengthSync()
                    : null
                  : null;
        }
        (tr.prototype = {
          get body() {
            return this[te].body;
          },
          get bodyUsed() {
            return this[te].disturbed;
          },
          arrayBuffer() {
            return ts.call(this).then(function (e) {
              return e.buffer.slice(e.byteOffset, e.byteOffset + e.byteLength);
            });
          },
          blob() {
            let e = (this.headers && this.headers.get("content-type")) || "";
            return ts.call(this).then(function (t) {
              return Object.assign(new e7([], { type: e.toLowerCase() }), {
                [e4]: t,
              });
            });
          },
          json() {
            var e = this;
            return ts.call(this).then(function (t) {
              try {
                return JSON.parse(t.toString());
              } catch (t) {
                return tr.Promise.reject(
                  new e9(
                    `invalid json response body at ${e.url} reason: ${t.message}`,
                    "invalid-json",
                  ),
                );
              }
            });
          },
          text() {
            return ts.call(this).then(function (e) {
              return e.toString();
            });
          },
          buffer() {
            return ts.call(this);
          },
          textConverted() {
            var e = this;
            return ts.call(this).then(function (t) {
              return (function (e, t) {
                let r, n;
                if ("function" != typeof s)
                  throw Error(
                    "The package `encoding` must be installed to use the textConverted() function",
                  );
                let i = t.get("content-type"),
                  o = "utf-8";
                return (
                  i && (r = /charset=([^;]*)/i.exec(i)),
                  (n = e.slice(0, 1024).toString()),
                  !r && n && (r = /<meta.+?charset=(['"])(.+?)\1/i.exec(n)),
                  !r &&
                    n &&
                    (!(r =
                      /<meta[\s]+?http-equiv=(['"])content-type\1[\s]+?content=(['"])(.+?)\2/i.exec(
                        n,
                      )) &&
                      (r =
                        /<meta[\s]+?content=(['"])(.+?)\1[\s]+?http-equiv=(['"])content-type\3/i.exec(
                          n,
                        )) &&
                      r.pop(),
                    r && (r = /charset=(.*)/i.exec(r.pop()))),
                  !r && n && (r = /<\?xml.+?encoding=(['"])(.+?)\1/i.exec(n)),
                  r &&
                    ("gb2312" === (o = r.pop()) || "gbk" === o) &&
                    (o = "gb18030"),
                  s(e, "UTF-8", o).toString()
                );
              })(t, e.headers);
            });
          },
        }),
          Object.defineProperties(tr.prototype, {
            body: { enumerable: !0 },
            bodyUsed: { enumerable: !0 },
            arrayBuffer: { enumerable: !0 },
            blob: { enumerable: !0 },
            json: { enumerable: !0 },
            text: { enumerable: !0 },
          }),
          (tr.mixIn = function (e) {
            for (let t of Object.getOwnPropertyNames(tr.prototype))
              if (!(t in e)) {
                let r = Object.getOwnPropertyDescriptor(tr.prototype, t);
                Object.defineProperty(e, t, r);
              }
          }),
          (tr.Promise = global.Promise);
        let tc = /[^\^_`a-zA-Z\-0-9!#$%&'*+.|~]/,
          th = /[^\t\x20-\x7e\x80-\xff]/;
        function tu(e) {
          if (((e = `${e}`), tc.test(e) || "" === e))
            throw TypeError(`${e} is not a legal HTTP header name`);
        }
        function td(e) {
          if (((e = `${e}`), th.test(e)))
            throw TypeError(`${e} is not a legal HTTP header value`);
        }
        function tp(e, t) {
          for (let r in ((t = t.toLowerCase()), e))
            if (r.toLowerCase() === t) return r;
        }
        let tf = Symbol("map");
        class tm {
          constructor() {
            let e =
              arguments.length > 0 && void 0 !== arguments[0]
                ? arguments[0]
                : void 0;
            if (((this[tf] = Object.create(null)), e instanceof tm)) {
              let t = e.raw();
              for (let e of Object.keys(t))
                for (let r of t[e]) this.append(e, r);
              return;
            }
            if (null == e);
            else if ("object" == typeof e) {
              let t = e[Symbol.iterator];
              if (null != t) {
                if ("function" != typeof t)
                  throw TypeError("Header pairs must be iterable");
                let r = [];
                for (let t of e) {
                  if (
                    "object" != typeof t ||
                    "function" != typeof t[Symbol.iterator]
                  )
                    throw TypeError("Each header pair must be iterable");
                  r.push(Array.from(t));
                }
                for (let e of r) {
                  if (2 !== e.length)
                    throw TypeError(
                      "Each header pair must be a name/value tuple",
                    );
                  this.append(e[0], e[1]);
                }
              } else
                for (let t of Object.keys(e)) {
                  let r = e[t];
                  this.append(t, r);
                }
            } else throw TypeError("Provided initializer must be an object");
          }
          get(e) {
            tu((e = `${e}`));
            let t = tp(this[tf], e);
            return void 0 === t ? null : this[tf][t].join(", ");
          }
          forEach(e) {
            let t =
                arguments.length > 1 && void 0 !== arguments[1]
                  ? arguments[1]
                  : void 0,
              r = tg(this),
              s = 0;
            for (; s < r.length; ) {
              var n = r[s];
              let i = n[0],
                o = n[1];
              e.call(t, o, i, this), (r = tg(this)), s++;
            }
          }
          set(e, t) {
            (e = `${e}`), (t = `${t}`), tu(e), td(t);
            let r = tp(this[tf], e);
            this[tf][void 0 !== r ? r : e] = [t];
          }
          append(e, t) {
            (e = `${e}`), (t = `${t}`), tu(e), td(t);
            let r = tp(this[tf], e);
            void 0 !== r ? this[tf][r].push(t) : (this[tf][e] = [t]);
          }
          has(e) {
            return tu((e = `${e}`)), void 0 !== tp(this[tf], e);
          }
          delete(e) {
            tu((e = `${e}`));
            let t = tp(this[tf], e);
            void 0 !== t && delete this[tf][t];
          }
          raw() {
            return this[tf];
          }
          keys() {
            return tb(this, "key");
          }
          values() {
            return tb(this, "value");
          }
          [Symbol.iterator]() {
            return tb(this, "key+value");
          }
        }
        function tg(e) {
          let t =
            arguments.length > 1 && void 0 !== arguments[1]
              ? arguments[1]
              : "key+value";
          return Object.keys(e[tf])
            .sort()
            .map(
              "key" === t
                ? function (e) {
                    return e.toLowerCase();
                  }
                : "value" === t
                  ? function (t) {
                      return e[tf][t].join(", ");
                    }
                  : function (t) {
                      return [t.toLowerCase(), e[tf][t].join(", ")];
                    },
            );
        }
        (tm.prototype.entries = tm.prototype[Symbol.iterator]),
          Object.defineProperty(tm.prototype, Symbol.toStringTag, {
            value: "Headers",
            writable: !1,
            enumerable: !1,
            configurable: !0,
          }),
          Object.defineProperties(tm.prototype, {
            get: { enumerable: !0 },
            forEach: { enumerable: !0 },
            set: { enumerable: !0 },
            append: { enumerable: !0 },
            has: { enumerable: !0 },
            delete: { enumerable: !0 },
            keys: { enumerable: !0 },
            values: { enumerable: !0 },
            entries: { enumerable: !0 },
          });
        let ty = Symbol("internal");
        function tb(e, t) {
          let r = Object.create(tw);
          return (r[ty] = { target: e, kind: t, index: 0 }), r;
        }
        let tw = Object.setPrototypeOf(
          {
            next() {
              if (!this || Object.getPrototypeOf(this) !== tw)
                throw TypeError("Value of `this` is not a HeadersIterator");
              var e = this[ty];
              let t = e.target,
                r = e.kind,
                s = e.index,
                n = tg(t, r);
              return s >= n.length
                ? { value: void 0, done: !0 }
                : ((this[ty].index = s + 1), { value: n[s], done: !1 });
            },
          },
          Object.getPrototypeOf(Object.getPrototypeOf([][Symbol.iterator]())),
        );
        Object.defineProperty(tw, Symbol.toStringTag, {
          value: "HeadersIterator",
          writable: !1,
          enumerable: !1,
          configurable: !0,
        });
        let t_ = Symbol("Response internals"),
          tv = e0.STATUS_CODES;
        class tx {
          constructor() {
            let e =
                arguments.length > 0 && void 0 !== arguments[0]
                  ? arguments[0]
                  : null,
              t =
                arguments.length > 1 && void 0 !== arguments[1]
                  ? arguments[1]
                  : {};
            tr.call(this, e, t);
            let r = t.status || 200,
              s = new tm(t.headers);
            if (null != e && !s.has("Content-Type")) {
              let t = ta(e);
              t && s.append("Content-Type", t);
            }
            this[t_] = {
              url: t.url,
              status: r,
              statusText: t.statusText || tv[r],
              headers: s,
              counter: t.counter,
            };
          }
          get url() {
            return this[t_].url || "";
          }
          get status() {
            return this[t_].status;
          }
          get ok() {
            return this[t_].status >= 200 && this[t_].status < 300;
          }
          get redirected() {
            return this[t_].counter > 0;
          }
          get statusText() {
            return this[t_].statusText;
          }
          get headers() {
            return this[t_].headers;
          }
          clone() {
            return new tx(to(this), {
              url: this.url,
              status: this.status,
              statusText: this.statusText,
              headers: this.headers,
              ok: this.ok,
              redirected: this.redirected,
            });
          }
        }
        tr.mixIn(tx.prototype),
          Object.defineProperties(tx.prototype, {
            url: { enumerable: !0 },
            status: { enumerable: !0 },
            ok: { enumerable: !0 },
            redirected: { enumerable: !0 },
            statusText: { enumerable: !0 },
            headers: { enumerable: !0 },
            clone: { enumerable: !0 },
          }),
          Object.defineProperty(tx.prototype, Symbol.toStringTag, {
            value: "Response",
            writable: !1,
            enumerable: !1,
            configurable: !0,
          });
        let tS = Symbol("Request internals"),
          tT = e1.URL || e2.URL,
          tE = e1.parse,
          tO = e1.format;
        function tA(e) {
          return (
            /^[a-zA-Z][a-zA-Z\d+\-.]*:/.exec(e) && (e = new tT(e).toString()),
            tE(e)
          );
        }
        let tR = "destroy" in eZ.Readable.prototype;
        function tk(e) {
          return "object" == typeof e && "object" == typeof e[tS];
        }
        class tC {
          constructor(e) {
            let t,
              r =
                arguments.length > 1 && void 0 !== arguments[1]
                  ? arguments[1]
                  : {};
            tk(e)
              ? (t = tA(e.url))
              : ((t = e && e.href ? tA(e.href) : tA(`${e}`)), (e = {}));
            let s = r.method || e.method || "GET";
            if (
              ((s = s.toUpperCase()),
              (null != r.body || (tk(e) && null !== e.body)) &&
                ("GET" === s || "HEAD" === s))
            )
              throw TypeError("Request with GET/HEAD method cannot have body");
            let n =
              null != r.body ? r.body : tk(e) && null !== e.body ? to(e) : null;
            tr.call(this, n, {
              timeout: r.timeout || e.timeout || 0,
              size: r.size || e.size || 0,
            });
            let i = new tm(r.headers || e.headers || {});
            if (null != n && !i.has("Content-Type")) {
              let e = ta(n);
              e && i.append("Content-Type", e);
            }
            let o = tk(e) ? e.signal : null;
            if (
              ("signal" in r && (o = r.signal),
              null != o &&
                !(function (e) {
                  let t = e && "object" == typeof e && Object.getPrototypeOf(e);
                  return !!(t && "AbortSignal" === t.constructor.name);
                })(o))
            )
              throw TypeError(
                "Expected signal to be an instanceof AbortSignal",
              );
            (this[tS] = {
              method: s,
              redirect: r.redirect || e.redirect || "follow",
              headers: i,
              parsedURL: t,
              signal: o,
            }),
              (this.follow =
                void 0 !== r.follow
                  ? r.follow
                  : void 0 !== e.follow
                    ? e.follow
                    : 20),
              (this.compress =
                void 0 !== r.compress
                  ? r.compress
                  : void 0 === e.compress || e.compress),
              (this.counter = r.counter || e.counter || 0),
              (this.agent = r.agent || e.agent);
          }
          get method() {
            return this[tS].method;
          }
          get url() {
            return tO(this[tS].parsedURL);
          }
          get headers() {
            return this[tS].headers;
          }
          get redirect() {
            return this[tS].redirect;
          }
          get signal() {
            return this[tS].signal;
          }
          clone() {
            return new tC(this);
          }
        }
        function tP(e) {
          Error.call(this, e),
            (this.type = "aborted"),
            (this.message = e),
            Error.captureStackTrace(this, this.constructor);
        }
        tr.mixIn(tC.prototype),
          Object.defineProperty(tC.prototype, Symbol.toStringTag, {
            value: "Request",
            writable: !1,
            enumerable: !1,
            configurable: !0,
          }),
          Object.defineProperties(tC.prototype, {
            method: { enumerable: !0 },
            url: { enumerable: !0 },
            headers: { enumerable: !0 },
            redirect: { enumerable: !0 },
            clone: { enumerable: !0 },
            signal: { enumerable: !0 },
          }),
          (tP.prototype = Object.create(Error.prototype)),
          (tP.prototype.constructor = tP),
          (tP.prototype.name = "AbortError");
        let tL = e1.URL || e2.URL,
          tI = eZ.PassThrough,
          t$ = function (e, t) {
            let r = new tL(t).hostname,
              s = new tL(e).hostname;
            return (
              r === s || ("." === r[r.length - s.length - 1] && r.endsWith(s))
            );
          };
        function tj(e, t) {
          if (!tj.Promise)
            throw Error(
              "native promise missing, set fetch.Promise to your favorite alternative",
            );
          return (
            (tr.Promise = tj.Promise),
            new tj.Promise(function (r, s) {
              var n, i;
              let o,
                a,
                l = new tC(e, t),
                c = (function (e) {
                  let t = e[tS].parsedURL,
                    r = new tm(e[tS].headers);
                  if (
                    (r.has("Accept") || r.set("Accept", "*/*"),
                    !t.protocol || !t.hostname)
                  )
                    throw TypeError("Only absolute URLs are supported");
                  if (!/^https?:$/.test(t.protocol))
                    throw TypeError("Only HTTP(S) protocols are supported");
                  if (e.signal && e.body instanceof eZ.Readable && !tR)
                    throw Error(
                      "Cancellation of streamed requests with AbortSignal is not supported in node < 8",
                    );
                  let s = null;
                  if (
                    (null == e.body &&
                      /^(POST|PUT)$/i.test(e.method) &&
                      (s = "0"),
                    null != e.body)
                  ) {
                    let t = tl(e);
                    "number" == typeof t && (s = String(t));
                  }
                  s && r.set("Content-Length", s),
                    r.has("User-Agent") ||
                      r.set(
                        "User-Agent",
                        "node-fetch/1.0 (+https://github.com/bitinn/node-fetch)",
                      ),
                    e.compress &&
                      !r.has("Accept-Encoding") &&
                      r.set("Accept-Encoding", "gzip,deflate");
                  let n = e.agent;
                  return (
                    "function" == typeof n && (n = n(t)),
                    Object.assign({}, t, {
                      method: e.method,
                      headers: (function (e) {
                        let t = Object.assign({ __proto__: null }, e[tf]),
                          r = tp(e[tf], "Host");
                        return void 0 !== r && (t[r] = t[r][0]), t;
                      })(r),
                      agent: n,
                    })
                  );
                })(l),
                h = ("https:" === c.protocol ? e3 : e0).request,
                u = l.signal,
                d = null,
                p = function () {
                  let e = new tP("The user aborted a request.");
                  s(e),
                    l.body && l.body instanceof eZ.Readable && tz(l.body, e),
                    d && d.body && d.body.emit("error", e);
                };
              if (u && u.aborted) return void p();
              let f = function () {
                  p(), g();
                },
                m = h(c);
              function g() {
                m.abort(),
                  u && u.removeEventListener("abort", f),
                  clearTimeout(o);
              }
              u && u.addEventListener("abort", f),
                l.timeout &&
                  m.once("socket", function (e) {
                    o = setTimeout(function () {
                      s(
                        new e9(
                          `network timeout at: ${l.url}`,
                          "request-timeout",
                        ),
                      ),
                        g();
                    }, l.timeout);
                  }),
                m.on("error", function (e) {
                  s(
                    new e9(
                      `request to ${l.url} failed, reason: ${e.message}`,
                      "system",
                      e,
                    ),
                  ),
                    d && d.body && tz(d.body, e),
                    g();
                }),
                (n = m),
                (i = function (e) {
                  (!u || !u.aborted) && d && d.body && tz(d.body, e);
                }),
                n.on("socket", function (e) {
                  a = e;
                }),
                n.on("response", function (e) {
                  let t = e.headers;
                  "chunked" !== t["transfer-encoding"] ||
                    t["content-length"] ||
                    e.once("close", function (e) {
                      if (a && a.listenerCount("data") > 0 && !e) {
                        let e = Error("Premature close");
                        (e.code = "ERR_STREAM_PREMATURE_CLOSE"), i(e);
                      }
                    });
                }),
                14 > parseInt(process.version.substring(1)) &&
                  m.on("socket", function (e) {
                    e.addListener("close", function (t) {
                      let r = e.listenerCount("data") > 0;
                      if (d && r && !t && !(u && u.aborted)) {
                        let e = Error("Premature close");
                        (e.code = "ERR_STREAM_PREMATURE_CLOSE"),
                          d.body.emit("error", e);
                      }
                    });
                  }),
                m.on("response", function (e) {
                  clearTimeout(o);
                  let t = (function (e) {
                    let t = new tm();
                    for (let r of Object.keys(e))
                      if (!tc.test(r))
                        if (Array.isArray(e[r]))
                          for (let s of e[r])
                            th.test(s) ||
                              (void 0 === t[tf][r]
                                ? (t[tf][r] = [s])
                                : t[tf][r].push(s));
                        else th.test(e[r]) || (t[tf][r] = [e[r]]);
                    return t;
                  })(e.headers);
                  if (tj.isRedirect(e.statusCode)) {
                    let i = t.get("Location"),
                      o = null;
                    try {
                      o = null === i ? null : new tL(i, l.url).toString();
                    } catch (e) {
                      if ("manual" !== l.redirect) {
                        s(
                          new e9(
                            `uri requested responds with an invalid redirect URL: ${i}`,
                            "invalid-redirect",
                          ),
                        ),
                          g();
                        return;
                      }
                    }
                    switch (l.redirect) {
                      case "error":
                        s(
                          new e9(
                            `uri requested responds with a redirect, redirect mode is set to error: ${l.url}`,
                            "no-redirect",
                          ),
                        ),
                          g();
                        return;
                      case "manual":
                        if (null !== o)
                          try {
                            t.set("Location", o);
                          } catch (e) {
                            s(e);
                          }
                        break;
                      case "follow":
                        var n;
                        if (null === o) break;
                        if (l.counter >= l.follow) {
                          s(
                            new e9(
                              `maximum redirect reached at: ${l.url}`,
                              "max-redirect",
                            ),
                          ),
                            g();
                          return;
                        }
                        let a = {
                          headers: new tm(l.headers),
                          follow: l.follow,
                          counter: l.counter + 1,
                          agent: l.agent,
                          compress: l.compress,
                          method: l.method,
                          body: l.body,
                          signal: l.signal,
                          timeout: l.timeout,
                          size: l.size,
                        };
                        if (
                          !t$(l.url, o) ||
                          ((n = l.url),
                          new tL(o).protocol !== new tL(n).protocol)
                        )
                          for (let e of [
                            "authorization",
                            "www-authenticate",
                            "cookie",
                            "cookie2",
                          ])
                            a.headers.delete(e);
                        if (303 !== e.statusCode && l.body && null === tl(l)) {
                          s(
                            new e9(
                              "Cannot follow redirect with body being a readable stream",
                              "unsupported-redirect",
                            ),
                          ),
                            g();
                          return;
                        }
                        (303 === e.statusCode ||
                          ((301 === e.statusCode || 302 === e.statusCode) &&
                            "POST" === l.method)) &&
                          ((a.method = "GET"),
                          (a.body = void 0),
                          a.headers.delete("content-length")),
                          r(tj(new tC(o, a))),
                          g();
                        return;
                    }
                  }
                  e.once("end", function () {
                    u && u.removeEventListener("abort", f);
                  });
                  let i = e.pipe(new tI()),
                    a = {
                      url: l.url,
                      status: e.statusCode,
                      statusText: e.statusMessage,
                      headers: t,
                      size: l.size,
                      timeout: l.timeout,
                      counter: l.counter,
                    },
                    c = t.get("Content-Encoding");
                  if (
                    !l.compress ||
                    "HEAD" === l.method ||
                    null === c ||
                    204 === e.statusCode ||
                    304 === e.statusCode
                  )
                    return void r((d = new tx(i, a)));
                  let h = {
                    flush: e8.Z_SYNC_FLUSH,
                    finishFlush: e8.Z_SYNC_FLUSH,
                  };
                  if ("gzip" == c || "x-gzip" == c)
                    return void r(
                      (d = new tx((i = i.pipe(e8.createGunzip(h))), a)),
                    );
                  if ("deflate" == c || "x-deflate" == c) {
                    let t = e.pipe(new tI());
                    t.once("data", function (e) {
                      r(
                        (d = new tx(
                          (i =
                            (15 & e[0]) == 8
                              ? i.pipe(e8.createInflate())
                              : i.pipe(e8.createInflateRaw())),
                          a,
                        )),
                      );
                    }),
                      t.on("end", function () {
                        d || r((d = new tx(i, a)));
                      });
                    return;
                  }
                  if (
                    "br" == c &&
                    "function" == typeof e8.createBrotliDecompress
                  )
                    return void r(
                      (d = new tx(
                        (i = i.pipe(e8.createBrotliDecompress())),
                        a,
                      )),
                    );
                  r((d = new tx(i, a)));
                });
              let y = l.body;
              null === y
                ? m.end()
                : ti(y)
                  ? y.stream().pipe(m)
                  : Buffer.isBuffer(y)
                    ? (m.write(y), m.end())
                    : y.pipe(m);
            })
          );
        }
        function tz(e, t) {
          e.destroy ? e.destroy(t) : (e.emit("error", t), e.end());
        }
        (tj.isRedirect = function (e) {
          return 301 === e || 302 === e || 303 === e || 307 === e || 308 === e;
        }),
          (tj.Promise = global.Promise);
        var tM = r(28354),
          tq = r(39610),
          tN = r(83526),
          tF = r(79897);
        let tB = (e) => e instanceof tF.Y;
        var tD = r(4908);
        let tW = (0, tM.deprecate)(
          () => {},
          'Constructor "entries" argument is not spec-compliant and will be removed in next major release.',
        );
        var tU = function (e, t, r, s) {
          if ("a" === r && !s)
            throw TypeError("Private accessor was defined without a getter");
          if ("function" == typeof t ? e !== t || !s : !t.has(e))
            throw TypeError(
              "Cannot read private member from an object whose class did not declare it",
            );
          return "m" === r ? s : "a" === r ? s.call(e) : s ? s.value : t.get(e);
        };
        class tH {
          constructor(e) {
            k.add(this),
              C.set(this, new Map()),
              e &&
                (tW(),
                e.forEach(({ name: e, value: t, fileName: r }) =>
                  this.append(e, t, r),
                ));
          }
          static [((C = new WeakMap()),
          (k = new WeakSet()),
          Symbol.hasInstance)](e) {
            return !!(
              e &&
              (0, tD.T)(e.constructor) &&
              "FormData" === e[Symbol.toStringTag] &&
              (0, tD.T)(e.append) &&
              (0, tD.T)(e.set) &&
              (0, tD.T)(e.get) &&
              (0, tD.T)(e.getAll) &&
              (0, tD.T)(e.has) &&
              (0, tD.T)(e.delete) &&
              (0, tD.T)(e.entries) &&
              (0, tD.T)(e.values) &&
              (0, tD.T)(e.keys) &&
              (0, tD.T)(e[Symbol.iterator]) &&
              (0, tD.T)(e.forEach)
            );
          }
          append(e, t, r) {
            tU(this, k, "m", P).call(this, {
              name: e,
              fileName: r,
              append: !0,
              rawValue: t,
              argsLength: arguments.length,
            });
          }
          set(e, t, r) {
            tU(this, k, "m", P).call(this, {
              name: e,
              fileName: r,
              append: !1,
              rawValue: t,
              argsLength: arguments.length,
            });
          }
          get(e) {
            let t = tU(this, C, "f").get(String(e));
            return t ? t[0] : null;
          }
          getAll(e) {
            let t = tU(this, C, "f").get(String(e));
            return t ? t.slice() : [];
          }
          has(e) {
            return tU(this, C, "f").has(String(e));
          }
          delete(e) {
            tU(this, C, "f").delete(String(e));
          }
          *keys() {
            for (let e of tU(this, C, "f").keys()) yield e;
          }
          *entries() {
            for (let e of this.keys())
              for (let t of this.getAll(e)) yield [e, t];
          }
          *values() {
            for (let [, e] of this) yield e;
          }
          [((P = function ({
            name: e,
            rawValue: t,
            append: r,
            fileName: s,
            argsLength: n,
          }) {
            let i,
              o = r ? "append" : "set";
            if (n < 2)
              throw TypeError(
                `Failed to execute '${o}' on 'FormData': 2 arguments required, but only ${n} present.`,
              );
            if (((e = String(e)), (0, tN.f)(t)))
              i =
                void 0 === s
                  ? t
                  : new tq.Z([t], s, {
                      type: t.type,
                      lastModified: t.lastModified,
                    });
            else if (tB(t))
              i = new tq.Z([t], void 0 === s ? "blob" : s, { type: t.type });
            else if (s)
              throw TypeError(
                `Failed to execute '${o}' on 'FormData': parameter 2 is not of type 'Blob'.`,
              );
            else i = String(t);
            let a = tU(this, C, "f").get(e);
            if (!a || !r) return void tU(this, C, "f").set(e, [i]);
            a.push(i);
          }),
          Symbol.iterator)]() {
            return this.entries();
          }
          forEach(e, t) {
            for (let [r, s] of this) e.call(t, s, r, this);
          }
          get [Symbol.toStringTag]() {
            return "FormData";
          }
          [tM.inspect.custom]() {
            return this[Symbol.toStringTag];
          }
        }
        var tJ = r(5073),
          tX = r(53477),
          tV = r(73024);
        let tK = "abcdefghijklmnopqrstuvwxyz0123456789",
          tY = function () {
            let e = 16,
              t = "";
            for (; e--; ) t += tK[(Math.random() * tK.length) << 0];
            return t;
          },
          tG = (e) =>
            Object.prototype.toString.call(e).slice(8, -1).toLowerCase(),
          tQ = function (e) {
            if ("object" !== tG(e)) return !1;
            let t = Object.getPrototypeOf(e);
            return (
              null == t ||
              (t.constructor && t.constructor.toString()) === Object.toString()
            );
          },
          tZ = (e) =>
            String(e).replace(/\r|\n/g, (e, t, r) =>
              ("\r" === e && "\n" !== r[t + 1]) ||
              ("\n" === e && "\r" !== r[t - 1])
                ? "\r\n"
                : e,
            ),
          t0 = (e) =>
            String(e)
              .replace(/\r/g, "%0D")
              .replace(/\n/g, "%0A")
              .replace(/"/g, "%22"),
          t1 = (e) => "function" == typeof e,
          t2 = (e) =>
            !!(
              e &&
              "object" == typeof e &&
              t1(e.constructor) &&
              "File" === e[Symbol.toStringTag] &&
              t1(e.stream) &&
              null != e.name &&
              null != e.size &&
              null != e.lastModified
            ),
          t3 = (e) =>
            !!(
              e &&
              t1(e.constructor) &&
              "FormData" === e[Symbol.toStringTag] &&
              t1(e.append) &&
              t1(e.getAll) &&
              t1(e.entries) &&
              t1(e[Symbol.iterator])
            );
        var t8 = function (e, t, r, s, n) {
            if ("m" === s) throw TypeError("Private method is not writable");
            if ("a" === s && !n)
              throw TypeError("Private accessor was defined without a setter");
            if ("function" == typeof t ? e !== t || !n : !t.has(e))
              throw TypeError(
                "Cannot write private member to an object whose class did not declare it",
              );
            return (
              "a" === s ? n.call(e, r) : n ? (n.value = r) : t.set(e, r), r
            );
          },
          t5 = function (e, t, r, s) {
            if ("a" === r && !s)
              throw TypeError("Private accessor was defined without a getter");
            if ("function" == typeof t ? e !== t || !s : !t.has(e))
              throw TypeError(
                "Cannot read private member from an object whose class did not declare it",
              );
            return "m" === r
              ? s
              : "a" === r
                ? s.call(e)
                : s
                  ? s.value
                  : t.get(e);
          };
        let t4 = { enableAdditionalHeaders: !1 };
        class t6 {
          constructor(e, t, r) {
            let s;
            if (
              (L.add(this),
              I.set(this, "\r\n"),
              $.set(this, void 0),
              j.set(this, void 0),
              z.set(this, "-".repeat(2)),
              M.set(this, new TextEncoder()),
              q.set(this, void 0),
              N.set(this, void 0),
              F.set(this, void 0),
              !t3(e))
            )
              throw TypeError(
                "Expected first argument to be a FormData instance.",
              );
            if (
              (tQ(t) ? (r = t) : (s = t), s || (s = tY()), "string" != typeof s)
            )
              throw TypeError("Expected boundary argument to be a string.");
            if (r && !tQ(r))
              throw TypeError("Expected options argument to be an object.");
            t8(this, N, e, "f"),
              t8(this, F, { ...t4, ...r }, "f"),
              t8(this, $, t5(this, M, "f").encode(t5(this, I, "f")), "f"),
              t8(this, j, t5(this, $, "f").byteLength, "f"),
              (this.boundary = `form-data-boundary-${s}`),
              (this.contentType = `multipart/form-data; boundary=${this.boundary}`),
              t8(
                this,
                q,
                t5(this, M, "f").encode(
                  `${t5(this, z, "f")}${this.boundary}${t5(this, z, "f")}${t5(this, I, "f").repeat(2)}`,
                ),
                "f",
              ),
              (this.contentLength = String(this.getContentLength())),
              (this.headers = Object.freeze({
                "Content-Type": this.contentType,
                "Content-Length": this.contentLength,
              })),
              Object.defineProperties(this, {
                boundary: { writable: !1, configurable: !1 },
                contentType: { writable: !1, configurable: !1 },
                contentLength: { writable: !1, configurable: !1 },
                headers: { writable: !1, configurable: !1 },
              });
          }
          getContentLength() {
            let e = 0;
            for (let [t, r] of t5(this, N, "f")) {
              let s = t2(r) ? r : t5(this, M, "f").encode(tZ(r));
              (e += t5(this, L, "m", B).call(this, t, s).byteLength),
                (e += t2(s) ? s.size : s.byteLength),
                (e += t5(this, j, "f"));
            }
            return e + t5(this, q, "f").byteLength;
          }
          *values() {
            for (let [e, t] of t5(this, N, "f").entries()) {
              let r = t2(t) ? t : t5(this, M, "f").encode(tZ(t));
              yield t5(this, L, "m", B).call(this, e, r),
                yield r,
                yield t5(this, $, "f");
            }
            yield t5(this, q, "f");
          }
          async *encode() {
            for (let e of this.values()) t2(e) ? yield* e.stream() : yield e;
          }
          [((I = new WeakMap()),
          ($ = new WeakMap()),
          (j = new WeakMap()),
          (z = new WeakMap()),
          (M = new WeakMap()),
          (q = new WeakMap()),
          (N = new WeakMap()),
          (F = new WeakMap()),
          (L = new WeakSet()),
          (B = function (e, t) {
            let r = "";
            return (
              (r += `${t5(this, z, "f")}${this.boundary}${t5(this, I, "f")}Content-Disposition: form-data; name="${t0(e)}"`),
              t2(t) &&
                (r += `; filename="${t0(t.name)}"${t5(this, I, "f")}Content-Type: ${t.type || "application/octet-stream"}`),
              !0 === t5(this, F, "f").enableAdditionalHeaders &&
                (r += `${t5(this, I, "f")}Content-Length: ${t2(t) ? t.size : t.byteLength}`),
              t5(this, M, "f").encode(`${r}${t5(this, I, "f").repeat(2)}`)
            );
          }),
          Symbol.iterator)]() {
            return this.values();
          }
          [Symbol.asyncIterator]() {
            return this.encode();
          }
        }
        var t7 = r(57075);
        class t9 {
          constructor(e) {
            this.body = e;
          }
          get [Symbol.toStringTag]() {
            return "MultipartBody";
          }
        }
        var re = r(37830);
        let rt = !1;
        async function rr(e, ...t) {
          let { fileFromPath: s } = await r.e(3033).then(r.bind(r, 73033));
          return (
            rt ||
              (console.warn(
                `fileFromPath is deprecated; use fs.createReadStream(${JSON.stringify(e)}) instead`,
              ),
              (rt = !0)),
            await s(e, ...t)
          );
        }
        let rs = new tJ({ keepAlive: !0, timeout: 3e5 }),
          rn = new tJ.HttpsAgent({ keepAlive: !0, timeout: 3e5 });
        async function ri(e, t) {
          let r = new t6(e),
            s = new t9(t7.Readable.from(r)),
            n = {
              ...t.headers,
              ...r.headers,
              "Content-Length": r.contentLength,
            };
          return { ...t, body: s, headers: n };
        }
        let ro = () => {
          i ||
            (function (e, t = { auto: !1 }) {
              if (R)
                throw Error(
                  `you must \`import 'openai/shims/${e.kind}'\` before importing anything else from openai`,
                );
              if (i)
                throw Error(
                  `can't \`import 'openai/shims/${e.kind}'\` after \`import 'openai/shims/${i}'\``,
                );
              (R = t.auto),
                (i = e.kind),
                (o = e.fetch),
                e.Request,
                e.Response,
                e.Headers,
                (a = e.FormData),
                e.Blob,
                (l = e.File),
                (c = e.ReadableStream),
                (h = e.getMultipartRequestOptions),
                (u = e.getDefaultAgent),
                (d = e.fileFromPath),
                (p = e.isFsReadStream);
            })(
              ("undefined" == typeof AbortController &&
                (globalThis.AbortController = tX.AbortController),
              {
                kind: "node",
                fetch: tj,
                Request: tC,
                Response: tx,
                Headers: tm,
                FormData: tH,
                Blob: tF.Y,
                File: tq.Z,
                ReadableStream: re.ReadableStream,
                getMultipartRequestOptions: ri,
                getDefaultAgent: (e) => (e.startsWith("https") ? rn : rs),
                fileFromPath: rr,
                isFsReadStream: (e) => e instanceof tV.ReadStream,
              }),
              { auto: !0 },
            );
        };
        ro();
        class ra extends Error {}
        class rl extends ra {
          constructor(e, t, r, s) {
            super(`${rl.makeMessage(e, t, r)}`),
              (this.status = e),
              (this.headers = s),
              (this.request_id = s?.["x-request-id"]),
              (this.error = t),
              (this.code = t?.code),
              (this.param = t?.param),
              (this.type = t?.type);
          }
          static makeMessage(e, t, r) {
            let s = t?.message
              ? "string" == typeof t.message
                ? t.message
                : JSON.stringify(t.message)
              : t
                ? JSON.stringify(t)
                : r;
            return e && s
              ? `${e} ${s}`
              : e
                ? `${e} status code (no body)`
                : s || "(no status code or body)";
          }
          static generate(e, t, r, s) {
            if (!e || !s) return new rh({ message: r, cause: r9(t) });
            let n = t?.error;
            return 400 === e
              ? new rd(e, n, r, s)
              : 401 === e
                ? new rp(e, n, r, s)
                : 403 === e
                  ? new rf(e, n, r, s)
                  : 404 === e
                    ? new rm(e, n, r, s)
                    : 409 === e
                      ? new rg(e, n, r, s)
                      : 422 === e
                        ? new ry(e, n, r, s)
                        : 429 === e
                          ? new rb(e, n, r, s)
                          : e >= 500
                            ? new rw(e, n, r, s)
                            : new rl(e, n, r, s);
          }
        }
        class rc extends rl {
          constructor({ message: e } = {}) {
            super(void 0, void 0, e || "Request was aborted.", void 0);
          }
        }
        class rh extends rl {
          constructor({ message: e, cause: t }) {
            super(void 0, void 0, e || "Connection error.", void 0),
              t && (this.cause = t);
          }
        }
        class ru extends rh {
          constructor({ message: e } = {}) {
            super({ message: e ?? "Request timed out." });
          }
        }
        class rd extends rl {}
        class rp extends rl {}
        class rf extends rl {}
        class rm extends rl {}
        class rg extends rl {}
        class ry extends rl {}
        class rb extends rl {}
        class rw extends rl {}
        class r_ extends ra {
          constructor() {
            super(
              "Could not parse response content as the length limit was reached",
            );
          }
        }
        class rv extends ra {
          constructor() {
            super(
              "Could not parse response content as the request was rejected by the content filter",
            );
          }
        }
        var rx = function (e, t, r, s, n) {
            if ("m" === s) throw TypeError("Private method is not writable");
            if ("a" === s && !n)
              throw TypeError("Private accessor was defined without a setter");
            if ("function" == typeof t ? e !== t || !n : !t.has(e))
              throw TypeError(
                "Cannot write private member to an object whose class did not declare it",
              );
            return (
              "a" === s ? n.call(e, r) : n ? (n.value = r) : t.set(e, r), r
            );
          },
          rS = function (e, t, r, s) {
            if ("a" === r && !s)
              throw TypeError("Private accessor was defined without a getter");
            if ("function" == typeof t ? e !== t || !s : !t.has(e))
              throw TypeError(
                "Cannot read private member from an object whose class did not declare it",
              );
            return "m" === r
              ? s
              : "a" === r
                ? s.call(e)
                : s
                  ? s.value
                  : t.get(e);
          };
        class rT {
          constructor() {
            D.set(this, void 0),
              (this.buffer = new Uint8Array()),
              rx(this, D, null, "f");
          }
          decode(e) {
            let t;
            if (null == e) return [];
            let r =
                e instanceof ArrayBuffer
                  ? new Uint8Array(e)
                  : "string" == typeof e
                    ? new TextEncoder().encode(e)
                    : e,
              s = new Uint8Array(this.buffer.length + r.length);
            s.set(this.buffer), s.set(r, this.buffer.length), (this.buffer = s);
            let n = [];
            for (
              ;
              null !=
              (t = (function (e, t) {
                for (let r = t ?? 0; r < e.length; r++) {
                  if (10 === e[r])
                    return { preceding: r, index: r + 1, carriage: !1 };
                  if (13 === e[r])
                    return { preceding: r, index: r + 1, carriage: !0 };
                }
                return null;
              })(this.buffer, rS(this, D, "f")));

            ) {
              if (t.carriage && null == rS(this, D, "f")) {
                rx(this, D, t.index, "f");
                continue;
              }
              if (
                null != rS(this, D, "f") &&
                (t.index !== rS(this, D, "f") + 1 || t.carriage)
              ) {
                n.push(
                  this.decodeText(this.buffer.slice(0, rS(this, D, "f") - 1)),
                ),
                  (this.buffer = this.buffer.slice(rS(this, D, "f"))),
                  rx(this, D, null, "f");
                continue;
              }
              let e = null !== rS(this, D, "f") ? t.preceding - 1 : t.preceding,
                r = this.decodeText(this.buffer.slice(0, e));
              n.push(r),
                (this.buffer = this.buffer.slice(t.index)),
                rx(this, D, null, "f");
            }
            return n;
          }
          decodeText(e) {
            if (null == e) return "";
            if ("string" == typeof e) return e;
            if ("undefined" != typeof Buffer) {
              if (e instanceof Buffer) return e.toString();
              if (e instanceof Uint8Array) return Buffer.from(e).toString();
              throw new ra(
                `Unexpected: received non-Uint8Array (${e.constructor.name}) stream chunk in an environment with a global "Buffer" defined, which this library assumes to be Node. Please report this error.`,
              );
            }
            if ("undefined" != typeof TextDecoder) {
              if (e instanceof Uint8Array || e instanceof ArrayBuffer)
                return (
                  this.textDecoder ??
                    (this.textDecoder = new TextDecoder("utf8")),
                  this.textDecoder.decode(e)
                );
              throw new ra(
                `Unexpected: received non-Uint8Array/ArrayBuffer (${e.constructor.name}) in a web platform. Please report this error.`,
              );
            }
            throw new ra(
              "Unexpected: neither Buffer nor TextDecoder are available as globals. Please report this error.",
            );
          }
          flush() {
            return this.buffer.length ? this.decode("\n") : [];
          }
        }
        function rE(e) {
          if (e[Symbol.asyncIterator]) return e;
          let t = e.getReader();
          return {
            async next() {
              try {
                let e = await t.read();
                return e?.done && t.releaseLock(), e;
              } catch (e) {
                throw (t.releaseLock(), e);
              }
            },
            async return() {
              let e = t.cancel();
              return t.releaseLock(), await e, { done: !0, value: void 0 };
            },
            [Symbol.asyncIterator]() {
              return this;
            },
          };
        }
        (D = new WeakMap()),
          (rT.NEWLINE_CHARS = new Set(["\n", "\r"])),
          (rT.NEWLINE_REGEXP = /\r\n|[\n\r]/g);
        class rO {
          constructor(e, t) {
            (this.iterator = e), (this.controller = t);
          }
          static fromSSEResponse(e, t) {
            let r = !1;
            async function* s() {
              if (r)
                throw Error(
                  "Cannot iterate over a consumed stream, use `.tee()` to split the stream.",
                );
              r = !0;
              let s = !1;
              try {
                for await (let r of rA(e, t))
                  if (!s) {
                    if (r.data.startsWith("[DONE]")) {
                      s = !0;
                      continue;
                    }
                    if (
                      null === r.event ||
                      r.event.startsWith("response.") ||
                      r.event.startsWith("transcript.")
                    ) {
                      let t;
                      try {
                        t = JSON.parse(r.data);
                      } catch (e) {
                        throw (
                          (console.error(
                            "Could not parse message into JSON:",
                            r.data,
                          ),
                          console.error("From chunk:", r.raw),
                          e)
                        );
                      }
                      if (t && t.error)
                        throw new rl(void 0, t.error, void 0, rG(e.headers));
                      yield t;
                    } else {
                      let e;
                      try {
                        e = JSON.parse(r.data);
                      } catch (e) {
                        throw (
                          (console.error(
                            "Could not parse message into JSON:",
                            r.data,
                          ),
                          console.error("From chunk:", r.raw),
                          e)
                        );
                      }
                      if ("error" == r.event)
                        throw new rl(void 0, e.error, e.message, void 0);
                      yield { event: r.event, data: e };
                    }
                  }
                s = !0;
              } catch (e) {
                if (e instanceof Error && "AbortError" === e.name) return;
                throw e;
              } finally {
                s || t.abort();
              }
            }
            return new rO(s, t);
          }
          static fromReadableStream(e, t) {
            let r = !1;
            async function* s() {
              let t = new rT();
              for await (let r of rE(e)) for (let e of t.decode(r)) yield e;
              for (let e of t.flush()) yield e;
            }
            return new rO(async function* () {
              if (r)
                throw Error(
                  "Cannot iterate over a consumed stream, use `.tee()` to split the stream.",
                );
              r = !0;
              let e = !1;
              try {
                for await (let t of s()) !e && t && (yield JSON.parse(t));
                e = !0;
              } catch (e) {
                if (e instanceof Error && "AbortError" === e.name) return;
                throw e;
              } finally {
                e || t.abort();
              }
            }, t);
          }
          [Symbol.asyncIterator]() {
            return this.iterator();
          }
          tee() {
            let e = [],
              t = [],
              r = this.iterator(),
              s = (s) => ({
                next: () => {
                  if (0 === s.length) {
                    let s = r.next();
                    e.push(s), t.push(s);
                  }
                  return s.shift();
                },
              });
            return [
              new rO(() => s(e), this.controller),
              new rO(() => s(t), this.controller),
            ];
          }
          toReadableStream() {
            let e,
              t = this,
              r = new TextEncoder();
            return new c({
              async start() {
                e = t[Symbol.asyncIterator]();
              },
              async pull(t) {
                try {
                  let { value: s, done: n } = await e.next();
                  if (n) return t.close();
                  let i = r.encode(JSON.stringify(s) + "\n");
                  t.enqueue(i);
                } catch (e) {
                  t.error(e);
                }
              },
              async cancel() {
                await e.return?.();
              },
            });
          }
        }
        async function* rA(e, t) {
          if (!e.body)
            throw (
              (t.abort(),
              new ra("Attempted to iterate over a response with no body"))
            );
          let r = new rk(),
            s = new rT();
          for await (let t of rR(rE(e.body)))
            for (let e of s.decode(t)) {
              let t = r.decode(e);
              t && (yield t);
            }
          for (let e of s.flush()) {
            let t = r.decode(e);
            t && (yield t);
          }
        }
        async function* rR(e) {
          let t = new Uint8Array();
          for await (let r of e) {
            let e;
            if (null == r) continue;
            let s =
                r instanceof ArrayBuffer
                  ? new Uint8Array(r)
                  : "string" == typeof r
                    ? new TextEncoder().encode(r)
                    : r,
              n = new Uint8Array(t.length + s.length);
            for (
              n.set(t), n.set(s, t.length), t = n;
              -1 !==
              (e = (function (e) {
                for (let t = 0; t < e.length - 1; t++) {
                  if (
                    (10 === e[t] && 10 === e[t + 1]) ||
                    (13 === e[t] && 13 === e[t + 1])
                  )
                    return t + 2;
                  if (
                    13 === e[t] &&
                    10 === e[t + 1] &&
                    t + 3 < e.length &&
                    13 === e[t + 2] &&
                    10 === e[t + 3]
                  )
                    return t + 4;
                }
                return -1;
              })(t));

            )
              yield t.slice(0, e), (t = t.slice(e));
          }
          t.length > 0 && (yield t);
        }
        class rk {
          constructor() {
            (this.event = null), (this.data = []), (this.chunks = []);
          }
          decode(e) {
            if ((e.endsWith("\r") && (e = e.substring(0, e.length - 1)), !e)) {
              if (!this.event && !this.data.length) return null;
              let e = {
                event: this.event,
                data: this.data.join("\n"),
                raw: this.chunks,
              };
              return (
                (this.event = null), (this.data = []), (this.chunks = []), e
              );
            }
            if ((this.chunks.push(e), e.startsWith(":"))) return null;
            let [t, r, s] = (function (e, t) {
              let r = e.indexOf(":");
              return -1 !== r
                ? [e.substring(0, r), t, e.substring(r + t.length)]
                : [e, "", ""];
            })(e, ":");
            return (
              s.startsWith(" ") && (s = s.substring(1)),
              "event" === t
                ? (this.event = s)
                : "data" === t && this.data.push(s),
              null
            );
          }
        }
        let rC = (e) =>
            null != e &&
            "object" == typeof e &&
            "string" == typeof e.url &&
            "function" == typeof e.blob,
          rP = (e) =>
            null != e &&
            "object" == typeof e &&
            "string" == typeof e.name &&
            "number" == typeof e.lastModified &&
            rL(e),
          rL = (e) =>
            null != e &&
            "object" == typeof e &&
            "number" == typeof e.size &&
            "string" == typeof e.type &&
            "function" == typeof e.text &&
            "function" == typeof e.slice &&
            "function" == typeof e.arrayBuffer,
          rI = (e) => rP(e) || rC(e) || p(e);
        async function r$(e, t, r) {
          var s;
          if (rP((e = await e))) return e;
          if (rC(e)) {
            let s = await e.blob();
            t ||
              (t =
                new URL(e.url).pathname.split(/[\\/]/).pop() ?? "unknown_file");
            let n = rL(s) ? [await s.arrayBuffer()] : [s];
            return new l(n, t, r);
          }
          let n = await rj(e);
          if (
            (t ||
              (t =
                (rz((s = e).name) ||
                  rz(s.filename) ||
                  rz(s.path)?.split(/[\\/]/).pop()) ??
                "unknown_file"),
            !r?.type)
          ) {
            let e = n[0]?.type;
            "string" == typeof e && (r = { ...r, type: e });
          }
          return new l(n, t, r);
        }
        async function rj(e) {
          let t = [];
          if (
            "string" == typeof e ||
            ArrayBuffer.isView(e) ||
            e instanceof ArrayBuffer
          )
            t.push(e);
          else if (rL(e)) t.push(await e.arrayBuffer());
          else if (rM(e)) for await (let r of e) t.push(r);
          else
            throw Error(
              `Unexpected data type: ${typeof e}; constructor: ${e?.constructor?.name}; props: ${(function (
                e,
              ) {
                let t = Object.getOwnPropertyNames(e);
                return `[${t.map((e) => `"${e}"`).join(", ")}]`;
              })(e)}`,
            );
          return t;
        }
        let rz = (e) =>
            "string" == typeof e
              ? e
              : "undefined" != typeof Buffer && e instanceof Buffer
                ? String(e)
                : void 0,
          rM = (e) =>
            null != e &&
            "object" == typeof e &&
            "function" == typeof e[Symbol.asyncIterator],
          rq = (e) =>
            e &&
            "object" == typeof e &&
            e.body &&
            "MultipartBody" === e[Symbol.toStringTag],
          rN = async (e) => {
            let t = await rF(e.body);
            return h(t, e);
          },
          rF = async (e) => {
            let t = new a();
            return (
              await Promise.all(
                Object.entries(e || {}).map(([e, r]) => rD(t, e, r)),
              ),
              t
            );
          },
          rB = (e) => {
            if (rI(e)) return !0;
            if (Array.isArray(e)) return e.some(rB);
            if (e && "object" == typeof e) {
              for (let t in e) if (rB(e[t])) return !0;
            }
            return !1;
          },
          rD = async (e, t, r) => {
            if (void 0 !== r) {
              if (null == r)
                throw TypeError(
                  `Received null for "${t}"; to pass null in FormData, you must use the string 'null'`,
                );
              if (
                "string" == typeof r ||
                "number" == typeof r ||
                "boolean" == typeof r
              )
                e.append(t, String(r));
              else if (rI(r)) {
                let s = await r$(r);
                e.append(t, s);
              } else if (Array.isArray(r))
                await Promise.all(r.map((r) => rD(e, t + "[]", r)));
              else if ("object" == typeof r)
                await Promise.all(
                  Object.entries(r).map(([r, s]) => rD(e, `${t}[${r}]`, s)),
                );
              else
                throw TypeError(
                  `Invalid value given to form, expected a string, number, boolean, object, Array, File or Blob but got ${r} instead`,
                );
            }
          };
        var rW = function (e, t, r, s, n) {
            if ("m" === s) throw TypeError("Private method is not writable");
            if ("a" === s && !n)
              throw TypeError("Private accessor was defined without a setter");
            if ("function" == typeof t ? e !== t || !n : !t.has(e))
              throw TypeError(
                "Cannot write private member to an object whose class did not declare it",
              );
            return (
              "a" === s ? n.call(e, r) : n ? (n.value = r) : t.set(e, r), r
            );
          },
          rU = function (e, t, r, s) {
            if ("a" === r && !s)
              throw TypeError("Private accessor was defined without a getter");
            if ("function" == typeof t ? e !== t || !s : !t.has(e))
              throw TypeError(
                "Cannot read private member from an object whose class did not declare it",
              );
            return "m" === r
              ? s
              : "a" === r
                ? s.call(e)
                : s
                  ? s.value
                  : t.get(e);
          };
        async function rH(e) {
          let { response: t } = e;
          if (e.options.stream)
            return (si("response", t.status, t.url, t.headers, t.body),
            e.options.__streamClass)
              ? e.options.__streamClass.fromSSEResponse(t, e.controller)
              : rO.fromSSEResponse(t, e.controller);
          if (204 === t.status) return null;
          if (e.options.__binaryResponse) return t;
          let r = t.headers.get("content-type"),
            s = r?.split(";")[0]?.trim();
          if (s?.includes("application/json") || s?.endsWith("+json")) {
            let e = await t.json();
            return si("response", t.status, t.url, t.headers, e), rJ(e, t);
          }
          let n = await t.text();
          return si("response", t.status, t.url, t.headers, n), n;
        }
        function rJ(e, t) {
          return !e || "object" != typeof e || Array.isArray(e)
            ? e
            : Object.defineProperty(e, "_request_id", {
                value: t.headers.get("x-request-id"),
                enumerable: !1,
              });
        }
        ro();
        class rX extends Promise {
          constructor(e, t = rH) {
            super((e) => {
              e(null);
            }),
              (this.responsePromise = e),
              (this.parseResponse = t);
          }
          _thenUnwrap(e) {
            return new rX(this.responsePromise, async (t) =>
              rJ(e(await this.parseResponse(t), t), t.response),
            );
          }
          asResponse() {
            return this.responsePromise.then((e) => e.response);
          }
          async withResponse() {
            let [e, t] = await Promise.all([this.parse(), this.asResponse()]);
            return {
              data: e,
              response: t,
              request_id: t.headers.get("x-request-id"),
            };
          }
          parse() {
            return (
              this.parsedPromise ||
                (this.parsedPromise = this.responsePromise.then(
                  this.parseResponse,
                )),
              this.parsedPromise
            );
          }
          then(e, t) {
            return this.parse().then(e, t);
          }
          catch(e) {
            return this.parse().catch(e);
          }
          finally(e) {
            return this.parse().finally(e);
          }
        }
        class rV {
          constructor({
            baseURL: e,
            maxRetries: t = 2,
            timeout: r = 6e5,
            httpAgent: s,
            fetch: n,
          }) {
            (this.baseURL = e),
              (this.maxRetries = r7("maxRetries", t)),
              (this.timeout = r7("timeout", r)),
              (this.httpAgent = s),
              (this.fetch = n ?? o);
          }
          authHeaders(e) {
            return {};
          }
          defaultHeaders(e) {
            return {
              Accept: "application/json",
              "Content-Type": "application/json",
              "User-Agent": this.getUserAgent(),
              ...r3(),
              ...this.authHeaders(e),
            };
          }
          validateHeaders(e, t) {}
          defaultIdempotencyKey() {
            return `stainless-node-retry-${so()}`;
          }
          get(e, t) {
            return this.methodRequest("get", e, t);
          }
          post(e, t) {
            return this.methodRequest("post", e, t);
          }
          patch(e, t) {
            return this.methodRequest("patch", e, t);
          }
          put(e, t) {
            return this.methodRequest("put", e, t);
          }
          delete(e, t) {
            return this.methodRequest("delete", e, t);
          }
          methodRequest(e, t, r) {
            return this.request(
              Promise.resolve(r).then(async (r) => {
                let s =
                  r && rL(r?.body)
                    ? new DataView(await r.body.arrayBuffer())
                    : r?.body instanceof DataView
                      ? r.body
                      : r?.body instanceof ArrayBuffer
                        ? new DataView(r.body)
                        : r && ArrayBuffer.isView(r?.body)
                          ? new DataView(r.body.buffer)
                          : r?.body;
                return { method: e, path: t, ...r, body: s };
              }),
            );
          }
          getAPIList(e, t, r) {
            return this.requestAPIList(t, { method: "get", path: e, ...r });
          }
          calculateContentLength(e) {
            if ("string" == typeof e) {
              if ("undefined" != typeof Buffer)
                return Buffer.byteLength(e, "utf8").toString();
              if ("undefined" != typeof TextEncoder)
                return new TextEncoder().encode(e).length.toString();
            } else if (ArrayBuffer.isView(e)) return e.byteLength.toString();
            return null;
          }
          buildRequest(e, { retryCount: t = 0 } = {}) {
            let r = { ...e },
              { method: s, path: n, query: i, headers: o = {} } = r,
              a =
                ArrayBuffer.isView(r.body) ||
                (r.__binaryRequest && "string" == typeof r.body)
                  ? r.body
                  : rq(r.body)
                    ? r.body.body
                    : r.body
                      ? JSON.stringify(r.body, null, 2)
                      : null,
              l = this.calculateContentLength(a),
              c = this.buildURL(n, i);
            "timeout" in r && r7("timeout", r.timeout),
              (r.timeout = r.timeout ?? this.timeout);
            let h = r.httpAgent ?? this.httpAgent ?? u(c),
              d = r.timeout + 1e3;
            "number" == typeof h?.options?.timeout &&
              d > (h.options.timeout ?? 0) &&
              (h.options.timeout = d),
              this.idempotencyHeader &&
                "get" !== s &&
                (e.idempotencyKey ||
                  (e.idempotencyKey = this.defaultIdempotencyKey()),
                (o[this.idempotencyHeader] = e.idempotencyKey));
            let p = this.buildHeaders({
              options: r,
              headers: o,
              contentLength: l,
              retryCount: t,
            });
            return {
              req: {
                method: s,
                ...(a && { body: a }),
                headers: p,
                ...(h && { agent: h }),
                signal: r.signal ?? null,
              },
              url: c,
              timeout: r.timeout,
            };
          }
          buildHeaders({
            options: e,
            headers: t,
            contentLength: r,
            retryCount: s,
          }) {
            let n = {};
            r && (n["content-length"] = r);
            let o = this.defaultHeaders(e);
            return (
              ss(n, o),
              ss(n, t),
              rq(e.body) && "node" !== i && delete n["content-type"],
              void 0 === sc(o, "x-stainless-retry-count") &&
                void 0 === sc(t, "x-stainless-retry-count") &&
                (n["x-stainless-retry-count"] = String(s)),
              void 0 === sc(o, "x-stainless-timeout") &&
                void 0 === sc(t, "x-stainless-timeout") &&
                e.timeout &&
                (n["x-stainless-timeout"] = String(
                  Math.trunc(e.timeout / 1e3),
                )),
              this.validateHeaders(n, t),
              n
            );
          }
          async prepareOptions(e) {}
          async prepareRequest(e, { url: t, options: r }) {}
          parseHeaders(e) {
            return e
              ? Symbol.iterator in e
                ? Object.fromEntries(Array.from(e).map((e) => [...e]))
                : { ...e }
              : {};
          }
          makeStatusError(e, t, r, s) {
            return rl.generate(e, t, r, s);
          }
          request(e, t = null) {
            return new rX(this.makeRequest(e, t));
          }
          async makeRequest(e, t) {
            let r = await e,
              s = r.maxRetries ?? this.maxRetries;
            null == t && (t = s), await this.prepareOptions(r);
            let {
              req: n,
              url: i,
              timeout: o,
            } = this.buildRequest(r, { retryCount: s - t });
            if (
              (await this.prepareRequest(n, { url: i, options: r }),
              si("request", i, r, n.headers),
              r.signal?.aborted)
            )
              throw new rc();
            let a = new AbortController(),
              l = await this.fetchWithTimeout(i, n, o, a).catch(r9);
            if (l instanceof Error) {
              if (r.signal?.aborted) throw new rc();
              if (t) return this.retryRequest(r, t);
              if ("AbortError" === l.name) throw new ru();
              throw new rh({ cause: l });
            }
            let c = rG(l.headers);
            if (!l.ok) {
              if (t && this.shouldRetry(l)) {
                let e = `retrying, ${t} attempts remaining`;
                return (
                  si(`response (error; ${e})`, l.status, i, c),
                  this.retryRequest(r, t, c)
                );
              }
              let e = await l.text().catch((e) => r9(e).message),
                s = r8(e),
                n = s ? void 0 : e,
                o = t
                  ? "(error; no more retries left)"
                  : "(error; not retryable)";
              throw (
                (si(`response (error; ${o})`, l.status, i, c, n),
                this.makeStatusError(l.status, s, n, c))
              );
            }
            return { response: l, options: r, controller: a };
          }
          requestAPIList(e, t) {
            return new rY(this, this.makeRequest(t, null), e);
          }
          buildURL(e, t) {
            let r = new URL(
                r4(e)
                  ? e
                  : this.baseURL +
                    (this.baseURL.endsWith("/") && e.startsWith("/")
                      ? e.slice(1)
                      : e),
              ),
              s = this.defaultQuery();
            return (
              st(s) || (t = { ...s, ...t }),
              "object" == typeof t &&
                t &&
                !Array.isArray(t) &&
                (r.search = this.stringifyQuery(t)),
              r.toString()
            );
          }
          stringifyQuery(e) {
            return Object.entries(e)
              .filter(([e, t]) => void 0 !== t)
              .map(([e, t]) => {
                if (
                  "string" == typeof t ||
                  "number" == typeof t ||
                  "boolean" == typeof t
                )
                  return `${encodeURIComponent(e)}=${encodeURIComponent(t)}`;
                if (null === t) return `${encodeURIComponent(e)}=`;
                throw new ra(
                  `Cannot stringify type ${typeof t}; Expected string, number, boolean, or null. If you need to pass nested query parameters, you can manually encode them, e.g. { query: { 'foo[key1]': value1, 'foo[key2]': value2 } }, and please open a GitHub issue requesting better support for your use case.`,
                );
              })
              .join("&");
          }
          async fetchWithTimeout(e, t, r, s) {
            let { signal: n, ...i } = t || {};
            n && n.addEventListener("abort", () => s.abort());
            let o = setTimeout(() => s.abort(), r),
              a = { signal: s.signal, ...i };
            return (
              a.method && (a.method = a.method.toUpperCase()),
              this.fetch.call(void 0, e, a).finally(() => {
                clearTimeout(o);
              })
            );
          }
          shouldRetry(e) {
            let t = e.headers.get("x-should-retry");
            return (
              "true" === t ||
              ("false" !== t &&
                (408 === e.status ||
                  409 === e.status ||
                  429 === e.status ||
                  !!(e.status >= 500)))
            );
          }
          async retryRequest(e, t, r) {
            let s,
              n = r?.["retry-after-ms"];
            if (n) {
              let e = parseFloat(n);
              Number.isNaN(e) || (s = e);
            }
            let i = r?.["retry-after"];
            if (i && !s) {
              let e = parseFloat(i);
              s = Number.isNaN(e) ? Date.parse(i) - Date.now() : 1e3 * e;
            }
            if (!(s && 0 <= s && s < 6e4)) {
              let r = e.maxRetries ?? this.maxRetries;
              s = this.calculateDefaultRetryTimeoutMillis(t, r);
            }
            return await r6(s), this.makeRequest(e, t - 1);
          }
          calculateDefaultRetryTimeoutMillis(e, t) {
            return (
              Math.min(0.5 * Math.pow(2, t - e), 8) *
              (1 - 0.25 * Math.random()) *
              1e3
            );
          }
          getUserAgent() {
            return `${this.constructor.name}/JS ${A}`;
          }
        }
        class rK {
          constructor(e, t, r, s) {
            W.set(this, void 0),
              rW(this, W, e, "f"),
              (this.options = s),
              (this.response = t),
              (this.body = r);
          }
          hasNextPage() {
            return (
              !!this.getPaginatedItems().length && null != this.nextPageInfo()
            );
          }
          async getNextPage() {
            let e = this.nextPageInfo();
            if (!e)
              throw new ra(
                "No next page expected; please check `.hasNextPage()` before calling `.getNextPage()`.",
              );
            let t = { ...this.options };
            if ("params" in e && "object" == typeof t.query)
              t.query = { ...t.query, ...e.params };
            else if ("url" in e) {
              for (let [r, s] of [
                ...Object.entries(t.query || {}),
                ...e.url.searchParams.entries(),
              ])
                e.url.searchParams.set(r, s);
              (t.query = void 0), (t.path = e.url.toString());
            }
            return await rU(this, W, "f").requestAPIList(this.constructor, t);
          }
          async *iterPages() {
            let e = this;
            for (yield e; e.hasNextPage(); )
              (e = await e.getNextPage()), yield e;
          }
          async *[((W = new WeakMap()), Symbol.asyncIterator)]() {
            for await (let e of this.iterPages())
              for (let t of e.getPaginatedItems()) yield t;
          }
        }
        class rY extends rX {
          constructor(e, t, r) {
            super(t, async (t) => new r(e, t.response, await rH(t), t.options));
          }
          async *[Symbol.asyncIterator]() {
            for await (let e of await this) yield e;
          }
        }
        let rG = (e) =>
            new Proxy(Object.fromEntries(e.entries()), {
              get(e, t) {
                let r = t.toString();
                return e[r.toLowerCase()] || e[r];
              },
            }),
          rQ = {
            method: !0,
            path: !0,
            query: !0,
            body: !0,
            headers: !0,
            maxRetries: !0,
            stream: !0,
            timeout: !0,
            httpAgent: !0,
            signal: !0,
            idempotencyKey: !0,
            __metadata: !0,
            __binaryRequest: !0,
            __binaryResponse: !0,
            __streamClass: !0,
          },
          rZ = (e) =>
            "object" == typeof e &&
            null !== e &&
            !st(e) &&
            Object.keys(e).every((e) => sr(rQ, e)),
          r0 = () => {
            if ("undefined" != typeof Deno && null != Deno.build)
              return {
                "X-Stainless-Lang": "js",
                "X-Stainless-Package-Version": A,
                "X-Stainless-OS": r2(Deno.build.os),
                "X-Stainless-Arch": r1(Deno.build.arch),
                "X-Stainless-Runtime": "deno",
                "X-Stainless-Runtime-Version":
                  "string" == typeof Deno.version
                    ? Deno.version
                    : (Deno.version?.deno ?? "unknown"),
              };
            if ("undefined" != typeof EdgeRuntime)
              return {
                "X-Stainless-Lang": "js",
                "X-Stainless-Package-Version": A,
                "X-Stainless-OS": "Unknown",
                "X-Stainless-Arch": `other:${EdgeRuntime}`,
                "X-Stainless-Runtime": "edge",
                "X-Stainless-Runtime-Version": process.version,
              };
            if (
              "[object process]" ===
              Object.prototype.toString.call(
                "undefined" != typeof process ? process : 0,
              )
            )
              return {
                "X-Stainless-Lang": "js",
                "X-Stainless-Package-Version": A,
                "X-Stainless-OS": r2(process.platform),
                "X-Stainless-Arch": r1(process.arch),
                "X-Stainless-Runtime": "node",
                "X-Stainless-Runtime-Version": process.version,
              };
            let e = (function () {
              if ("undefined" == typeof navigator || !navigator) return null;
              for (let { key: e, pattern: t } of [
                {
                  key: "edge",
                  pattern: /Edge(?:\W+(\d+)\.(\d+)(?:\.(\d+))?)?/,
                },
                { key: "ie", pattern: /MSIE(?:\W+(\d+)\.(\d+)(?:\.(\d+))?)?/ },
                {
                  key: "ie",
                  pattern: /Trident(?:.*rv\:(\d+)\.(\d+)(?:\.(\d+))?)?/,
                },
                {
                  key: "chrome",
                  pattern: /Chrome(?:\W+(\d+)\.(\d+)(?:\.(\d+))?)?/,
                },
                {
                  key: "firefox",
                  pattern: /Firefox(?:\W+(\d+)\.(\d+)(?:\.(\d+))?)?/,
                },
                {
                  key: "safari",
                  pattern:
                    /(?:Version\W+(\d+)\.(\d+)(?:\.(\d+))?)?(?:\W+Mobile\S*)?\W+Safari/,
                },
              ]) {
                let r = t.exec(navigator.userAgent);
                if (r) {
                  let t = r[1] || 0,
                    s = r[2] || 0,
                    n = r[3] || 0;
                  return { browser: e, version: `${t}.${s}.${n}` };
                }
              }
              return null;
            })();
            return e
              ? {
                  "X-Stainless-Lang": "js",
                  "X-Stainless-Package-Version": A,
                  "X-Stainless-OS": "Unknown",
                  "X-Stainless-Arch": "unknown",
                  "X-Stainless-Runtime": `browser:${e.browser}`,
                  "X-Stainless-Runtime-Version": e.version,
                }
              : {
                  "X-Stainless-Lang": "js",
                  "X-Stainless-Package-Version": A,
                  "X-Stainless-OS": "Unknown",
                  "X-Stainless-Arch": "unknown",
                  "X-Stainless-Runtime": "unknown",
                  "X-Stainless-Runtime-Version": "unknown",
                };
          },
          r1 = (e) =>
            "x32" === e
              ? "x32"
              : "x86_64" === e || "x64" === e
                ? "x64"
                : "arm" === e
                  ? "arm"
                  : "aarch64" === e || "arm64" === e
                    ? "arm64"
                    : e
                      ? `other:${e}`
                      : "unknown",
          r2 = (e) =>
            (e = e.toLowerCase()).includes("ios")
              ? "iOS"
              : "android" === e
                ? "Android"
                : "darwin" === e
                  ? "MacOS"
                  : "win32" === e
                    ? "Windows"
                    : "freebsd" === e
                      ? "FreeBSD"
                      : "openbsd" === e
                        ? "OpenBSD"
                        : "linux" === e
                          ? "Linux"
                          : e
                            ? `Other:${e}`
                            : "Unknown",
          r3 = () => n ?? (n = r0()),
          r8 = (e) => {
            try {
              return JSON.parse(e);
            } catch (e) {
              return;
            }
          },
          r5 = /^[a-z][a-z0-9+.-]*:/i,
          r4 = (e) => r5.test(e),
          r6 = (e) => new Promise((t) => setTimeout(t, e)),
          r7 = (e, t) => {
            if ("number" != typeof t || !Number.isInteger(t))
              throw new ra(`${e} must be an integer`);
            if (t < 0) throw new ra(`${e} must be a positive integer`);
            return t;
          },
          r9 = (e) => {
            if (e instanceof Error) return e;
            if ("object" == typeof e && null !== e)
              try {
                return Error(JSON.stringify(e));
              } catch {}
            return Error(e);
          },
          se = (e) =>
            "undefined" != typeof process
              ? (process.env?.[e]?.trim() ?? void 0)
              : "undefined" != typeof Deno
                ? Deno.env?.get?.(e)?.trim()
                : void 0;
        function st(e) {
          if (!e) return !0;
          for (let t in e) return !1;
          return !0;
        }
        function sr(e, t) {
          return Object.prototype.hasOwnProperty.call(e, t);
        }
        function ss(e, t) {
          for (let r in t) {
            if (!sr(t, r)) continue;
            let s = r.toLowerCase();
            if (!s) continue;
            let n = t[r];
            null === n ? delete e[s] : void 0 !== n && (e[s] = n);
          }
        }
        let sn = new Set(["authorization", "api-key"]);
        function si(e, ...t) {
          "undefined" != typeof process &&
            process?.env?.DEBUG === "true" &&
            console.log(
              `OpenAI:DEBUG:${e}`,
              ...t.map((e) => {
                if (!e) return e;
                if (e.headers) {
                  let t = { ...e, headers: { ...e.headers } };
                  for (let r in e.headers)
                    sn.has(r.toLowerCase()) && (t.headers[r] = "REDACTED");
                  return t;
                }
                let t = null;
                for (let r in e)
                  sn.has(r.toLowerCase()) &&
                    (t ?? (t = { ...e }), (t[r] = "REDACTED"));
                return t ?? e;
              }),
            );
        }
        let so = () =>
            "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (e) => {
              let t = (16 * Math.random()) | 0;
              return ("x" === e ? t : (3 & t) | 8).toString(16);
            }),
          sa = () =>
            "undefined" != typeof window &&
            void 0 !== window.document &&
            "undefined" != typeof navigator,
          sl = (e) => "function" == typeof e?.get,
          sc = (e, t) => {
            let r = t.toLowerCase();
            if (sl(e)) {
              let s =
                t[0]?.toUpperCase() +
                t
                  .substring(1)
                  .replace(/([^\w])(\w)/g, (e, t, r) => t + r.toUpperCase());
              for (let n of [t, r, t.toUpperCase(), s]) {
                let t = e.get(n);
                if (t) return t;
              }
            }
            for (let [s, n] of Object.entries(e))
              if (s.toLowerCase() === r) {
                if (Array.isArray(n)) {
                  if (n.length <= 1) return n[0];
                  return (
                    console.warn(
                      `Received ${n.length} entries for the ${t} header, using the first entry.`,
                    ),
                    n[0]
                  );
                }
                return n;
              }
          },
          sh = (e) => {
            if ("undefined" != typeof Buffer) {
              let t = Buffer.from(e, "base64");
              return Array.from(
                new Float32Array(
                  t.buffer,
                  t.byteOffset,
                  t.length / Float32Array.BYTES_PER_ELEMENT,
                ),
              );
            }
            {
              let t = atob(e),
                r = t.length,
                s = new Uint8Array(r);
              for (let e = 0; e < r; e++) s[e] = t.charCodeAt(e);
              return Array.from(new Float32Array(s.buffer));
            }
          };
        function su(e) {
          return null != e && "object" == typeof e && !Array.isArray(e);
        }
        class sd {
          constructor(e) {
            this._client = e;
          }
        }
        class sp extends sd {
          create(e, t) {
            return this._client.post("/completions", {
              body: e,
              ...t,
              stream: e.stream ?? !1,
            });
          }
        }
        class sf extends sd {
          list(e, t = {}, r) {
            return rZ(t)
              ? this.list(e, {}, t)
              : this._client.getAPIList(`/chat/completions/${e}/messages`, sw, {
                  query: t,
                  ...r,
                });
          }
        }
        class sm extends rK {
          constructor(e, t, r, s) {
            super(e, t, r, s),
              (this.data = r.data || []),
              (this.object = r.object);
          }
          getPaginatedItems() {
            return this.data ?? [];
          }
          nextPageParams() {
            return null;
          }
          nextPageInfo() {
            return null;
          }
        }
        class sg extends rK {
          constructor(e, t, r, s) {
            super(e, t, r, s),
              (this.data = r.data || []),
              (this.has_more = r.has_more || !1);
          }
          getPaginatedItems() {
            return this.data ?? [];
          }
          hasNextPage() {
            return !1 !== this.has_more && super.hasNextPage();
          }
          nextPageParams() {
            let e = this.nextPageInfo();
            if (!e) return null;
            if ("params" in e) return e.params;
            let t = Object.fromEntries(e.url.searchParams);
            return Object.keys(t).length ? t : null;
          }
          nextPageInfo() {
            let e = this.getPaginatedItems();
            if (!e.length) return null;
            let t = e[e.length - 1]?.id;
            return t ? { params: { after: t } } : null;
          }
        }
        class sy extends sd {
          constructor() {
            super(...arguments), (this.messages = new sf(this._client));
          }
          create(e, t) {
            return this._client.post("/chat/completions", {
              body: e,
              ...t,
              stream: e.stream ?? !1,
            });
          }
          retrieve(e, t) {
            return this._client.get(`/chat/completions/${e}`, t);
          }
          update(e, t, r) {
            return this._client.post(`/chat/completions/${e}`, {
              body: t,
              ...r,
            });
          }
          list(e = {}, t) {
            return rZ(e)
              ? this.list({}, e)
              : this._client.getAPIList("/chat/completions", sb, {
                  query: e,
                  ...t,
                });
          }
          del(e, t) {
            return this._client.delete(`/chat/completions/${e}`, t);
          }
        }
        class sb extends sg {}
        class sw extends sg {}
        (sy.ChatCompletionsPage = sb), (sy.Messages = sf);
        class s_ extends sd {
          constructor() {
            super(...arguments), (this.completions = new sy(this._client));
          }
        }
        (s_.Completions = sy), (s_.ChatCompletionsPage = sb);
        class sv extends sd {
          create(e, t) {
            let r = !!e.encoding_format,
              s = r ? e.encoding_format : "base64";
            r &&
              si("Request", "User defined encoding_format:", e.encoding_format);
            let n = this._client.post("/embeddings", {
              body: { ...e, encoding_format: s },
              ...t,
            });
            return r
              ? n
              : (si("response", "Decoding base64 embeddings to float32 array"),
                n._thenUnwrap(
                  (e) => (
                    e &&
                      e.data &&
                      e.data.forEach((e) => {
                        let t = e.embedding;
                        e.embedding = sh(t);
                      }),
                    e
                  ),
                ));
          }
        }
        class sx extends sd {
          create(e, t) {
            return this._client.post("/files", rN({ body: e, ...t }));
          }
          retrieve(e, t) {
            return this._client.get(`/files/${e}`, t);
          }
          list(e = {}, t) {
            return rZ(e)
              ? this.list({}, e)
              : this._client.getAPIList("/files", sS, { query: e, ...t });
          }
          del(e, t) {
            return this._client.delete(`/files/${e}`, t);
          }
          content(e, t) {
            return this._client.get(`/files/${e}/content`, {
              ...t,
              headers: { Accept: "application/binary", ...t?.headers },
              __binaryResponse: !0,
            });
          }
          retrieveContent(e, t) {
            return this._client.get(`/files/${e}/content`, t);
          }
          async waitForProcessing(
            e,
            { pollInterval: t = 5e3, maxWait: r = 18e5 } = {},
          ) {
            let s = new Set(["processed", "error", "deleted"]),
              n = Date.now(),
              i = await this.retrieve(e);
            for (; !i.status || !s.has(i.status); )
              if (
                (await r6(t), (i = await this.retrieve(e)), Date.now() - n > r)
              )
                throw new ru({
                  message: `Giving up on waiting for file ${e} to finish processing after ${r} milliseconds.`,
                });
            return i;
          }
        }
        class sS extends sg {}
        sx.FileObjectsPage = sS;
        class sT extends sd {
          createVariation(e, t) {
            return this._client.post(
              "/images/variations",
              rN({ body: e, ...t }),
            );
          }
          edit(e, t) {
            return this._client.post("/images/edits", rN({ body: e, ...t }));
          }
          generate(e, t) {
            return this._client.post("/images/generations", { body: e, ...t });
          }
        }
        class sE extends sd {
          create(e, t) {
            return this._client.post("/audio/speech", {
              body: e,
              ...t,
              headers: { Accept: "application/octet-stream", ...t?.headers },
              __binaryResponse: !0,
            });
          }
        }
        class sO extends sd {
          create(e, t) {
            return this._client.post(
              "/audio/transcriptions",
              rN({
                body: e,
                ...t,
                stream: e.stream ?? !1,
                __metadata: { model: e.model },
              }),
            );
          }
        }
        class sA extends sd {
          create(e, t) {
            return this._client.post(
              "/audio/translations",
              rN({ body: e, ...t, __metadata: { model: e.model } }),
            );
          }
        }
        class sR extends sd {
          constructor() {
            super(...arguments),
              (this.transcriptions = new sO(this._client)),
              (this.translations = new sA(this._client)),
              (this.speech = new sE(this._client));
          }
        }
        (sR.Transcriptions = sO), (sR.Translations = sA), (sR.Speech = sE);
        class sk extends sd {
          create(e, t) {
            return this._client.post("/moderations", { body: e, ...t });
          }
        }
        class sC extends sd {
          retrieve(e, t) {
            return this._client.get(`/models/${e}`, t);
          }
          list(e) {
            return this._client.getAPIList("/models", sP, e);
          }
          del(e, t) {
            return this._client.delete(`/models/${e}`, t);
          }
        }
        class sP extends sm {}
        sC.ModelsPage = sP;
        class sL extends sd {}
        class sI extends sd {
          run(e, t) {
            return this._client.post("/fine_tuning/alpha/graders/run", {
              body: e,
              ...t,
            });
          }
          validate(e, t) {
            return this._client.post("/fine_tuning/alpha/graders/validate", {
              body: e,
              ...t,
            });
          }
        }
        class s$ extends sd {
          constructor() {
            super(...arguments), (this.graders = new sI(this._client));
          }
        }
        s$.Graders = sI;
        class sj extends sd {
          create(e, t, r) {
            return this._client.getAPIList(
              `/fine_tuning/checkpoints/${e}/permissions`,
              sz,
              { body: t, method: "post", ...r },
            );
          }
          retrieve(e, t = {}, r) {
            return rZ(t)
              ? this.retrieve(e, {}, t)
              : this._client.get(`/fine_tuning/checkpoints/${e}/permissions`, {
                  query: t,
                  ...r,
                });
          }
          del(e, t, r) {
            return this._client.delete(
              `/fine_tuning/checkpoints/${e}/permissions/${t}`,
              r,
            );
          }
        }
        class sz extends sm {}
        sj.PermissionCreateResponsesPage = sz;
        class sM extends sd {
          constructor() {
            super(...arguments), (this.permissions = new sj(this._client));
          }
        }
        (sM.Permissions = sj), (sM.PermissionCreateResponsesPage = sz);
        class sq extends sd {
          list(e, t = {}, r) {
            return rZ(t)
              ? this.list(e, {}, t)
              : this._client.getAPIList(
                  `/fine_tuning/jobs/${e}/checkpoints`,
                  sN,
                  { query: t, ...r },
                );
          }
        }
        class sN extends sg {}
        sq.FineTuningJobCheckpointsPage = sN;
        class sF extends sd {
          constructor() {
            super(...arguments), (this.checkpoints = new sq(this._client));
          }
          create(e, t) {
            return this._client.post("/fine_tuning/jobs", { body: e, ...t });
          }
          retrieve(e, t) {
            return this._client.get(`/fine_tuning/jobs/${e}`, t);
          }
          list(e = {}, t) {
            return rZ(e)
              ? this.list({}, e)
              : this._client.getAPIList("/fine_tuning/jobs", sB, {
                  query: e,
                  ...t,
                });
          }
          cancel(e, t) {
            return this._client.post(`/fine_tuning/jobs/${e}/cancel`, t);
          }
          listEvents(e, t = {}, r) {
            return rZ(t)
              ? this.listEvents(e, {}, t)
              : this._client.getAPIList(`/fine_tuning/jobs/${e}/events`, sD, {
                  query: t,
                  ...r,
                });
          }
          pause(e, t) {
            return this._client.post(`/fine_tuning/jobs/${e}/pause`, t);
          }
          resume(e, t) {
            return this._client.post(`/fine_tuning/jobs/${e}/resume`, t);
          }
        }
        class sB extends sg {}
        class sD extends sg {}
        (sF.FineTuningJobsPage = sB),
          (sF.FineTuningJobEventsPage = sD),
          (sF.Checkpoints = sq),
          (sF.FineTuningJobCheckpointsPage = sN);
        class sW extends sd {
          constructor() {
            super(...arguments),
              (this.methods = new sL(this._client)),
              (this.jobs = new sF(this._client)),
              (this.checkpoints = new sM(this._client)),
              (this.alpha = new s$(this._client));
          }
        }
        (sW.Methods = sL),
          (sW.Jobs = sF),
          (sW.FineTuningJobsPage = sB),
          (sW.FineTuningJobEventsPage = sD),
          (sW.Checkpoints = sM),
          (sW.Alpha = s$);
        class sU extends sd {}
        class sH extends sd {
          constructor() {
            super(...arguments), (this.graderModels = new sU(this._client));
          }
        }
        sH.GraderModels = sU;
        let sJ = async (e) => {
          let t = await Promise.allSettled(e),
            r = t.filter((e) => "rejected" === e.status);
          if (r.length) {
            for (let e of r) console.error(e.reason);
            throw Error(`${r.length} promise(s) failed - see the above errors`);
          }
          let s = [];
          for (let e of t) "fulfilled" === e.status && s.push(e.value);
          return s;
        };
        class sX extends sd {
          create(e, t, r) {
            return this._client.post(`/vector_stores/${e}/files`, {
              body: t,
              ...r,
              headers: { "OpenAI-Beta": "assistants=v2", ...r?.headers },
            });
          }
          retrieve(e, t, r) {
            return this._client.get(`/vector_stores/${e}/files/${t}`, {
              ...r,
              headers: { "OpenAI-Beta": "assistants=v2", ...r?.headers },
            });
          }
          update(e, t, r, s) {
            return this._client.post(`/vector_stores/${e}/files/${t}`, {
              body: r,
              ...s,
              headers: { "OpenAI-Beta": "assistants=v2", ...s?.headers },
            });
          }
          list(e, t = {}, r) {
            return rZ(t)
              ? this.list(e, {}, t)
              : this._client.getAPIList(`/vector_stores/${e}/files`, sV, {
                  query: t,
                  ...r,
                  headers: { "OpenAI-Beta": "assistants=v2", ...r?.headers },
                });
          }
          del(e, t, r) {
            return this._client.delete(`/vector_stores/${e}/files/${t}`, {
              ...r,
              headers: { "OpenAI-Beta": "assistants=v2", ...r?.headers },
            });
          }
          async createAndPoll(e, t, r) {
            let s = await this.create(e, t, r);
            return await this.poll(e, s.id, r);
          }
          async poll(e, t, r) {
            let s = { ...r?.headers, "X-Stainless-Poll-Helper": "true" };
            for (
              r?.pollIntervalMs &&
              (s["X-Stainless-Custom-Poll-Interval"] =
                r.pollIntervalMs.toString());
              ;

            ) {
              let n = await this.retrieve(e, t, {
                  ...r,
                  headers: s,
                }).withResponse(),
                i = n.data;
              switch (i.status) {
                case "in_progress":
                  let o = 5e3;
                  if (r?.pollIntervalMs) o = r.pollIntervalMs;
                  else {
                    let e = n.response.headers.get("openai-poll-after-ms");
                    if (e) {
                      let t = parseInt(e);
                      isNaN(t) || (o = t);
                    }
                  }
                  await r6(o);
                  break;
                case "failed":
                case "completed":
                  return i;
              }
            }
          }
          async upload(e, t, r) {
            let s = await this._client.files.create(
              { file: t, purpose: "assistants" },
              r,
            );
            return this.create(e, { file_id: s.id }, r);
          }
          async uploadAndPoll(e, t, r) {
            let s = await this.upload(e, t, r);
            return await this.poll(e, s.id, r);
          }
          content(e, t, r) {
            return this._client.getAPIList(
              `/vector_stores/${e}/files/${t}/content`,
              sK,
              {
                ...r,
                headers: { "OpenAI-Beta": "assistants=v2", ...r?.headers },
              },
            );
          }
        }
        class sV extends sg {}
        class sK extends sm {}
        (sX.VectorStoreFilesPage = sV), (sX.FileContentResponsesPage = sK);
        class sY extends sd {
          create(e, t, r) {
            return this._client.post(`/vector_stores/${e}/file_batches`, {
              body: t,
              ...r,
              headers: { "OpenAI-Beta": "assistants=v2", ...r?.headers },
            });
          }
          retrieve(e, t, r) {
            return this._client.get(`/vector_stores/${e}/file_batches/${t}`, {
              ...r,
              headers: { "OpenAI-Beta": "assistants=v2", ...r?.headers },
            });
          }
          cancel(e, t, r) {
            return this._client.post(
              `/vector_stores/${e}/file_batches/${t}/cancel`,
              {
                ...r,
                headers: { "OpenAI-Beta": "assistants=v2", ...r?.headers },
              },
            );
          }
          async createAndPoll(e, t, r) {
            let s = await this.create(e, t);
            return await this.poll(e, s.id, r);
          }
          listFiles(e, t, r = {}, s) {
            return rZ(r)
              ? this.listFiles(e, t, {}, r)
              : this._client.getAPIList(
                  `/vector_stores/${e}/file_batches/${t}/files`,
                  sV,
                  {
                    query: r,
                    ...s,
                    headers: { "OpenAI-Beta": "assistants=v2", ...s?.headers },
                  },
                );
          }
          async poll(e, t, r) {
            let s = { ...r?.headers, "X-Stainless-Poll-Helper": "true" };
            for (
              r?.pollIntervalMs &&
              (s["X-Stainless-Custom-Poll-Interval"] =
                r.pollIntervalMs.toString());
              ;

            ) {
              let { data: n, response: i } = await this.retrieve(e, t, {
                ...r,
                headers: s,
              }).withResponse();
              switch (n.status) {
                case "in_progress":
                  let o = 5e3;
                  if (r?.pollIntervalMs) o = r.pollIntervalMs;
                  else {
                    let e = i.headers.get("openai-poll-after-ms");
                    if (e) {
                      let t = parseInt(e);
                      isNaN(t) || (o = t);
                    }
                  }
                  await r6(o);
                  break;
                case "failed":
                case "cancelled":
                case "completed":
                  return n;
              }
            }
          }
          async uploadAndPoll(e, { files: t, fileIds: r = [] }, s) {
            if (null == t || 0 == t.length)
              throw Error(
                "No `files` provided to process. If you've already uploaded files you should use `.createAndPoll()` instead",
              );
            let n = Math.min(s?.maxConcurrency ?? 5, t.length),
              i = this._client,
              o = t.values(),
              a = [...r];
            async function l(e) {
              for (let t of e) {
                let e = await i.files.create(
                  { file: t, purpose: "assistants" },
                  s,
                );
                a.push(e.id);
              }
            }
            let c = Array(n).fill(o).map(l);
            return await sJ(c), await this.createAndPoll(e, { file_ids: a });
          }
        }
        class sG extends sd {
          constructor() {
            super(...arguments),
              (this.files = new sX(this._client)),
              (this.fileBatches = new sY(this._client));
          }
          create(e, t) {
            return this._client.post("/vector_stores", {
              body: e,
              ...t,
              headers: { "OpenAI-Beta": "assistants=v2", ...t?.headers },
            });
          }
          retrieve(e, t) {
            return this._client.get(`/vector_stores/${e}`, {
              ...t,
              headers: { "OpenAI-Beta": "assistants=v2", ...t?.headers },
            });
          }
          update(e, t, r) {
            return this._client.post(`/vector_stores/${e}`, {
              body: t,
              ...r,
              headers: { "OpenAI-Beta": "assistants=v2", ...r?.headers },
            });
          }
          list(e = {}, t) {
            return rZ(e)
              ? this.list({}, e)
              : this._client.getAPIList("/vector_stores", sQ, {
                  query: e,
                  ...t,
                  headers: { "OpenAI-Beta": "assistants=v2", ...t?.headers },
                });
          }
          del(e, t) {
            return this._client.delete(`/vector_stores/${e}`, {
              ...t,
              headers: { "OpenAI-Beta": "assistants=v2", ...t?.headers },
            });
          }
          search(e, t, r) {
            return this._client.getAPIList(`/vector_stores/${e}/search`, sZ, {
              body: t,
              method: "post",
              ...r,
              headers: { "OpenAI-Beta": "assistants=v2", ...r?.headers },
            });
          }
        }
        class sQ extends sg {}
        class sZ extends sm {}
        (sG.VectorStoresPage = sQ),
          (sG.VectorStoreSearchResponsesPage = sZ),
          (sG.Files = sX),
          (sG.VectorStoreFilesPage = sV),
          (sG.FileContentResponsesPage = sK),
          (sG.FileBatches = sY);
        class s0 extends sd {
          create(e, t) {
            return this._client.post("/assistants", {
              body: e,
              ...t,
              headers: { "OpenAI-Beta": "assistants=v2", ...t?.headers },
            });
          }
          retrieve(e, t) {
            return this._client.get(`/assistants/${e}`, {
              ...t,
              headers: { "OpenAI-Beta": "assistants=v2", ...t?.headers },
            });
          }
          update(e, t, r) {
            return this._client.post(`/assistants/${e}`, {
              body: t,
              ...r,
              headers: { "OpenAI-Beta": "assistants=v2", ...r?.headers },
            });
          }
          list(e = {}, t) {
            return rZ(e)
              ? this.list({}, e)
              : this._client.getAPIList("/assistants", s1, {
                  query: e,
                  ...t,
                  headers: { "OpenAI-Beta": "assistants=v2", ...t?.headers },
                });
          }
          del(e, t) {
            return this._client.delete(`/assistants/${e}`, {
              ...t,
              headers: { "OpenAI-Beta": "assistants=v2", ...t?.headers },
            });
          }
        }
        class s1 extends sg {}
        function s2(e) {
          return "function" == typeof e.parse;
        }
        s0.AssistantsPage = s1;
        let s3 = (e) => e?.role === "assistant",
          s8 = (e) => e?.role === "function",
          s5 = (e) => e?.role === "tool";
        var s4 = function (e, t, r, s, n) {
            if ("m" === s) throw TypeError("Private method is not writable");
            if ("a" === s && !n)
              throw TypeError("Private accessor was defined without a setter");
            if ("function" == typeof t ? e !== t || !n : !t.has(e))
              throw TypeError(
                "Cannot write private member to an object whose class did not declare it",
              );
            return (
              "a" === s ? n.call(e, r) : n ? (n.value = r) : t.set(e, r), r
            );
          },
          s6 = function (e, t, r, s) {
            if ("a" === r && !s)
              throw TypeError("Private accessor was defined without a getter");
            if ("function" == typeof t ? e !== t || !s : !t.has(e))
              throw TypeError(
                "Cannot read private member from an object whose class did not declare it",
              );
            return "m" === r
              ? s
              : "a" === r
                ? s.call(e)
                : s
                  ? s.value
                  : t.get(e);
          };
        class s7 {
          constructor() {
            U.add(this),
              (this.controller = new AbortController()),
              H.set(this, void 0),
              J.set(this, () => {}),
              X.set(this, () => {}),
              V.set(this, void 0),
              K.set(this, () => {}),
              Y.set(this, () => {}),
              G.set(this, {}),
              Q.set(this, !1),
              Z.set(this, !1),
              ee.set(this, !1),
              et.set(this, !1),
              s4(
                this,
                H,
                new Promise((e, t) => {
                  s4(this, J, e, "f"), s4(this, X, t, "f");
                }),
                "f",
              ),
              s4(
                this,
                V,
                new Promise((e, t) => {
                  s4(this, K, e, "f"), s4(this, Y, t, "f");
                }),
                "f",
              ),
              s6(this, H, "f").catch(() => {}),
              s6(this, V, "f").catch(() => {});
          }
          _run(e) {
            setTimeout(() => {
              e().then(
                () => {
                  this._emitFinal(), this._emit("end");
                },
                s6(this, U, "m", er).bind(this),
              );
            }, 0);
          }
          _connected() {
            this.ended || (s6(this, J, "f").call(this), this._emit("connect"));
          }
          get ended() {
            return s6(this, Q, "f");
          }
          get errored() {
            return s6(this, Z, "f");
          }
          get aborted() {
            return s6(this, ee, "f");
          }
          abort() {
            this.controller.abort();
          }
          on(e, t) {
            return (
              (s6(this, G, "f")[e] || (s6(this, G, "f")[e] = [])).push({
                listener: t,
              }),
              this
            );
          }
          off(e, t) {
            let r = s6(this, G, "f")[e];
            if (!r) return this;
            let s = r.findIndex((e) => e.listener === t);
            return s >= 0 && r.splice(s, 1), this;
          }
          once(e, t) {
            return (
              (s6(this, G, "f")[e] || (s6(this, G, "f")[e] = [])).push({
                listener: t,
                once: !0,
              }),
              this
            );
          }
          emitted(e) {
            return new Promise((t, r) => {
              s4(this, et, !0, "f"),
                "error" !== e && this.once("error", r),
                this.once(e, t);
            });
          }
          async done() {
            s4(this, et, !0, "f"), await s6(this, V, "f");
          }
          _emit(e, ...t) {
            if (s6(this, Q, "f")) return;
            "end" === e && (s4(this, Q, !0, "f"), s6(this, K, "f").call(this));
            let r = s6(this, G, "f")[e];
            if (
              (r &&
                ((s6(this, G, "f")[e] = r.filter((e) => !e.once)),
                r.forEach(({ listener: e }) => e(...t))),
              "abort" === e)
            ) {
              let e = t[0];
              s6(this, et, "f") || r?.length || Promise.reject(e),
                s6(this, X, "f").call(this, e),
                s6(this, Y, "f").call(this, e),
                this._emit("end");
              return;
            }
            if ("error" === e) {
              let e = t[0];
              s6(this, et, "f") || r?.length || Promise.reject(e),
                s6(this, X, "f").call(this, e),
                s6(this, Y, "f").call(this, e),
                this._emit("end");
            }
          }
          _emitFinal() {}
        }
        function s9(e) {
          return e?.$brand === "auto-parseable-response-format";
        }
        function ne(e) {
          return e?.$brand === "auto-parseable-tool";
        }
        function nt(e, t) {
          let r = e.choices.map((e) => {
            var r, s;
            if ("length" === e.finish_reason) throw new r_();
            if ("content_filter" === e.finish_reason) throw new rv();
            return {
              ...e,
              message: {
                ...e.message,
                ...(e.message.tool_calls
                  ? {
                      tool_calls:
                        e.message.tool_calls?.map((e) =>
                          (function (e, t) {
                            let r = e.tools?.find(
                              (e) => e.function?.name === t.function.name,
                            );
                            return {
                              ...t,
                              function: {
                                ...t.function,
                                parsed_arguments: ne(r)
                                  ? r.$parseRaw(t.function.arguments)
                                  : r?.function.strict
                                    ? JSON.parse(t.function.arguments)
                                    : null,
                              },
                            };
                          })(t, e),
                        ) ?? void 0,
                    }
                  : void 0),
                parsed:
                  e.message.content && !e.message.refusal
                    ? ((r = t),
                      (s = e.message.content),
                      r.response_format?.type !== "json_schema"
                        ? null
                        : r.response_format?.type === "json_schema"
                          ? "$parseRaw" in r.response_format
                            ? r.response_format.$parseRaw(s)
                            : JSON.parse(s)
                          : null)
                    : null,
              },
            };
          });
          return { ...e, choices: r };
        }
        function nr(e) {
          return (
            !!s9(e.response_format) ||
            (e.tools?.some(
              (e) =>
                ne(e) || ("function" === e.type && !0 === e.function.strict),
            ) ??
              !1)
          );
        }
        (H = new WeakMap()),
          (J = new WeakMap()),
          (X = new WeakMap()),
          (V = new WeakMap()),
          (K = new WeakMap()),
          (Y = new WeakMap()),
          (G = new WeakMap()),
          (Q = new WeakMap()),
          (Z = new WeakMap()),
          (ee = new WeakMap()),
          (et = new WeakMap()),
          (U = new WeakSet()),
          (er = function (e) {
            if (
              (s4(this, Z, !0, "f"),
              e instanceof Error && "AbortError" === e.name && (e = new rc()),
              e instanceof rc)
            )
              return s4(this, ee, !0, "f"), this._emit("abort", e);
            if (e instanceof ra) return this._emit("error", e);
            if (e instanceof Error) {
              let t = new ra(e.message);
              return (t.cause = e), this._emit("error", t);
            }
            return this._emit("error", new ra(String(e)));
          });
        var ns = function (e, t, r, s) {
          if ("a" === r && !s)
            throw TypeError("Private accessor was defined without a getter");
          if ("function" == typeof t ? e !== t || !s : !t.has(e))
            throw TypeError(
              "Cannot read private member from an object whose class did not declare it",
            );
          return "m" === r ? s : "a" === r ? s.call(e) : s ? s.value : t.get(e);
        };
        class nn extends s7 {
          constructor() {
            super(...arguments),
              es.add(this),
              (this._chatCompletions = []),
              (this.messages = []);
          }
          _addChatCompletion(e) {
            this._chatCompletions.push(e), this._emit("chatCompletion", e);
            let t = e.choices[0]?.message;
            return t && this._addMessage(t), e;
          }
          _addMessage(e, t = !0) {
            if (
              ("content" in e || (e.content = null), this.messages.push(e), t)
            ) {
              if ((this._emit("message", e), (s8(e) || s5(e)) && e.content))
                this._emit("functionCallResult", e.content);
              else if (s3(e) && e.function_call)
                this._emit("functionCall", e.function_call);
              else if (s3(e) && e.tool_calls)
                for (let t of e.tool_calls)
                  "function" === t.type &&
                    this._emit("functionCall", t.function);
            }
          }
          async finalChatCompletion() {
            await this.done();
            let e = this._chatCompletions[this._chatCompletions.length - 1];
            if (!e)
              throw new ra("stream ended without producing a ChatCompletion");
            return e;
          }
          async finalContent() {
            return await this.done(), ns(this, es, "m", en).call(this);
          }
          async finalMessage() {
            return await this.done(), ns(this, es, "m", ei).call(this);
          }
          async finalFunctionCall() {
            return await this.done(), ns(this, es, "m", eo).call(this);
          }
          async finalFunctionCallResult() {
            return await this.done(), ns(this, es, "m", ea).call(this);
          }
          async totalUsage() {
            return await this.done(), ns(this, es, "m", el).call(this);
          }
          allChatCompletions() {
            return [...this._chatCompletions];
          }
          _emitFinal() {
            let e = this._chatCompletions[this._chatCompletions.length - 1];
            e && this._emit("finalChatCompletion", e);
            let t = ns(this, es, "m", ei).call(this);
            t && this._emit("finalMessage", t);
            let r = ns(this, es, "m", en).call(this);
            r && this._emit("finalContent", r);
            let s = ns(this, es, "m", eo).call(this);
            s && this._emit("finalFunctionCall", s);
            let n = ns(this, es, "m", ea).call(this);
            null != n && this._emit("finalFunctionCallResult", n),
              this._chatCompletions.some((e) => e.usage) &&
                this._emit("totalUsage", ns(this, es, "m", el).call(this));
          }
          async _createChatCompletion(e, t, r) {
            let s = r?.signal;
            s &&
              (s.aborted && this.controller.abort(),
              s.addEventListener("abort", () => this.controller.abort())),
              ns(this, es, "m", ec).call(this, t);
            let n = await e.chat.completions.create(
              { ...t, stream: !1 },
              { ...r, signal: this.controller.signal },
            );
            return this._connected(), this._addChatCompletion(nt(n, t));
          }
          async _runChatCompletion(e, t, r) {
            for (let e of t.messages) this._addMessage(e, !1);
            return await this._createChatCompletion(e, t, r);
          }
          async _runFunctions(e, t, r) {
            let s = "function",
              { function_call: n = "auto", stream: i, ...o } = t,
              a = "string" != typeof n && n?.name,
              { maxChatCompletions: l = 10 } = r || {},
              c = {};
            for (let e of t.functions) c[e.name || e.function.name] = e;
            let h = t.functions.map((e) => ({
              name: e.name || e.function.name,
              parameters: e.parameters,
              description: e.description,
            }));
            for (let e of t.messages) this._addMessage(e, !1);
            for (let t = 0; t < l; ++t) {
              let t,
                i = await this._createChatCompletion(
                  e,
                  {
                    ...o,
                    function_call: n,
                    functions: h,
                    messages: [...this.messages],
                  },
                  r,
                ),
                l = i.choices[0]?.message;
              if (!l)
                throw new ra("missing message in ChatCompletion response");
              if (!l.function_call) return;
              let { name: u, arguments: d } = l.function_call,
                p = c[u];
              if (p) {
                if (a && a !== u) {
                  let e = `Invalid function_call: ${JSON.stringify(u)}. ${JSON.stringify(a)} requested. Please try again`;
                  this._addMessage({ role: s, name: u, content: e });
                  continue;
                }
              } else {
                let e = `Invalid function_call: ${JSON.stringify(u)}. Available options are: ${h.map((e) => JSON.stringify(e.name)).join(", ")}. Please try again`;
                this._addMessage({ role: s, name: u, content: e });
                continue;
              }
              try {
                t = s2(p) ? await p.parse(d) : d;
              } catch (e) {
                this._addMessage({
                  role: s,
                  name: u,
                  content: e instanceof Error ? e.message : String(e),
                });
                continue;
              }
              let f = await p.function(t, this),
                m = ns(this, es, "m", eh).call(this, f);
              if ((this._addMessage({ role: s, name: u, content: m }), a))
                return;
            }
          }
          async _runTools(e, t, r) {
            let s = "tool",
              { tool_choice: n = "auto", stream: i, ...o } = t,
              a = "string" != typeof n && n?.function?.name,
              { maxChatCompletions: l = 10 } = r || {},
              c = t.tools.map((e) => {
                if (ne(e)) {
                  if (!e.$callback)
                    throw new ra(
                      "Tool given to `.runTools()` that does not have an associated function",
                    );
                  return {
                    type: "function",
                    function: {
                      function: e.$callback,
                      name: e.function.name,
                      description: e.function.description || "",
                      parameters: e.function.parameters,
                      parse: e.$parseRaw,
                      strict: !0,
                    },
                  };
                }
                return e;
              }),
              h = {};
            for (let e of c)
              "function" === e.type &&
                (h[e.function.name || e.function.function.name] = e.function);
            let u =
              "tools" in t
                ? c.map((e) =>
                    "function" === e.type
                      ? {
                          type: "function",
                          function: {
                            name: e.function.name || e.function.function.name,
                            parameters: e.function.parameters,
                            description: e.function.description,
                            strict: e.function.strict,
                          },
                        }
                      : e,
                  )
                : void 0;
            for (let e of t.messages) this._addMessage(e, !1);
            for (let t = 0; t < l; ++t) {
              let t = await this._createChatCompletion(
                  e,
                  {
                    ...o,
                    tool_choice: n,
                    tools: u,
                    messages: [...this.messages],
                  },
                  r,
                ),
                i = t.choices[0]?.message;
              if (!i)
                throw new ra("missing message in ChatCompletion response");
              if (!i.tool_calls?.length) break;
              for (let e of i.tool_calls) {
                let t;
                if ("function" !== e.type) continue;
                let r = e.id,
                  { name: n, arguments: i } = e.function,
                  o = h[n];
                if (o) {
                  if (a && a !== n) {
                    let e = `Invalid tool_call: ${JSON.stringify(n)}. ${JSON.stringify(a)} requested. Please try again`;
                    this._addMessage({ role: s, tool_call_id: r, content: e });
                    continue;
                  }
                } else {
                  let e = `Invalid tool_call: ${JSON.stringify(n)}. Available options are: ${Object.keys(
                    h,
                  )
                    .map((e) => JSON.stringify(e))
                    .join(", ")}. Please try again`;
                  this._addMessage({ role: s, tool_call_id: r, content: e });
                  continue;
                }
                try {
                  t = s2(o) ? await o.parse(i) : i;
                } catch (t) {
                  let e = t instanceof Error ? t.message : String(t);
                  this._addMessage({ role: s, tool_call_id: r, content: e });
                  continue;
                }
                let l = await o.function(t, this),
                  c = ns(this, es, "m", eh).call(this, l);
                if (
                  (this._addMessage({ role: s, tool_call_id: r, content: c }),
                  a)
                )
                  return;
              }
            }
          }
        }
        (es = new WeakSet()),
          (en = function () {
            return ns(this, es, "m", ei).call(this).content ?? null;
          }),
          (ei = function () {
            let e = this.messages.length;
            for (; e-- > 0; ) {
              let t = this.messages[e];
              if (s3(t)) {
                let { function_call: e, ...r } = t,
                  s = {
                    ...r,
                    content: t.content ?? null,
                    refusal: t.refusal ?? null,
                  };
                return e && (s.function_call = e), s;
              }
            }
            throw new ra(
              "stream ended without producing a ChatCompletionMessage with role=assistant",
            );
          }),
          (eo = function () {
            for (let e = this.messages.length - 1; e >= 0; e--) {
              let t = this.messages[e];
              if (s3(t) && t?.function_call) return t.function_call;
              if (s3(t) && t?.tool_calls?.length)
                return t.tool_calls.at(-1)?.function;
            }
          }),
          (ea = function () {
            for (let e = this.messages.length - 1; e >= 0; e--) {
              let t = this.messages[e];
              if (
                (s8(t) && null != t.content) ||
                (s5(t) &&
                  null != t.content &&
                  "string" == typeof t.content &&
                  this.messages.some(
                    (e) =>
                      "assistant" === e.role &&
                      e.tool_calls?.some(
                        (e) => "function" === e.type && e.id === t.tool_call_id,
                      ),
                  ))
              )
                return t.content;
            }
          }),
          (el = function () {
            let e = { completion_tokens: 0, prompt_tokens: 0, total_tokens: 0 };
            for (let { usage: t } of this._chatCompletions)
              t &&
                ((e.completion_tokens += t.completion_tokens),
                (e.prompt_tokens += t.prompt_tokens),
                (e.total_tokens += t.total_tokens));
            return e;
          }),
          (ec = function (e) {
            if (null != e.n && e.n > 1)
              throw new ra(
                "ChatCompletion convenience helpers only support n=1 at this time. To use n>1, please use chat.completions.create() directly.",
              );
          }),
          (eh = function (e) {
            return "string" == typeof e
              ? e
              : void 0 === e
                ? "undefined"
                : JSON.stringify(e);
          });
        class ni extends nn {
          static runFunctions(e, t, r) {
            let s = new ni(),
              n = {
                ...r,
                headers: {
                  ...r?.headers,
                  "X-Stainless-Helper-Method": "runFunctions",
                },
              };
            return s._run(() => s._runFunctions(e, t, n)), s;
          }
          static runTools(e, t, r) {
            let s = new ni(),
              n = {
                ...r,
                headers: {
                  ...r?.headers,
                  "X-Stainless-Helper-Method": "runTools",
                },
              };
            return s._run(() => s._runTools(e, t, n)), s;
          }
          _addMessage(e, t = !0) {
            super._addMessage(e, t),
              s3(e) && e.content && this._emit("content", e.content);
          }
        }
        let no = {
          STR: 1,
          NUM: 2,
          ARR: 4,
          OBJ: 8,
          NULL: 16,
          BOOL: 32,
          NAN: 64,
          INFINITY: 128,
          MINUS_INFINITY: 256,
          ALL: 511,
        };
        class na extends Error {}
        class nl extends Error {}
        let nc = (e, t) => {
            let r = e.length,
              s = 0,
              n = (e) => {
                throw new na(`${e} at position ${s}`);
              },
              i = (e) => {
                throw new nl(`${e} at position ${s}`);
              },
              o = () =>
                (u(), s >= r && n("Unexpected end of input"), '"' === e[s])
                  ? a()
                  : "{" === e[s]
                    ? l()
                    : "[" === e[s]
                      ? c()
                      : "null" === e.substring(s, s + 4) ||
                          (no.NULL & t &&
                            r - s < 4 &&
                            "null".startsWith(e.substring(s)))
                        ? ((s += 4), null)
                        : "true" === e.substring(s, s + 4) ||
                            (no.BOOL & t &&
                              r - s < 4 &&
                              "true".startsWith(e.substring(s)))
                          ? ((s += 4), !0)
                          : "false" === e.substring(s, s + 5) ||
                              (no.BOOL & t &&
                                r - s < 5 &&
                                "false".startsWith(e.substring(s)))
                            ? ((s += 5), !1)
                            : "Infinity" === e.substring(s, s + 8) ||
                                (no.INFINITY & t &&
                                  r - s < 8 &&
                                  "Infinity".startsWith(e.substring(s)))
                              ? ((s += 8), 1 / 0)
                              : "-Infinity" === e.substring(s, s + 9) ||
                                  (no.MINUS_INFINITY & t &&
                                    1 < r - s &&
                                    r - s < 9 &&
                                    "-Infinity".startsWith(e.substring(s)))
                                ? ((s += 9), -1 / 0)
                                : "NaN" === e.substring(s, s + 3) ||
                                    (no.NAN & t &&
                                      r - s < 3 &&
                                      "NaN".startsWith(e.substring(s)))
                                  ? ((s += 3), NaN)
                                  : h(),
              a = () => {
                let o = s,
                  a = !1;
                for (s++; s < r && ('"' !== e[s] || (a && "\\" === e[s - 1])); )
                  (a = "\\" === e[s] && !a), s++;
                if ('"' == e.charAt(s))
                  try {
                    return JSON.parse(e.substring(o, ++s - Number(a)));
                  } catch (e) {
                    i(String(e));
                  }
                else if (no.STR & t)
                  try {
                    return JSON.parse(e.substring(o, s - Number(a)) + '"');
                  } catch (t) {
                    return JSON.parse(
                      e.substring(o, e.lastIndexOf("\\")) + '"',
                    );
                  }
                n("Unterminated string literal");
              },
              l = () => {
                s++, u();
                let i = {};
                try {
                  for (; "}" !== e[s]; ) {
                    if ((u(), s >= r && no.OBJ & t)) return i;
                    let n = a();
                    u(), s++;
                    try {
                      let e = o();
                      Object.defineProperty(i, n, {
                        value: e,
                        writable: !0,
                        enumerable: !0,
                        configurable: !0,
                      });
                    } catch (e) {
                      if (no.OBJ & t) return i;
                      throw e;
                    }
                    u(), "," === e[s] && s++;
                  }
                } catch (e) {
                  if (no.OBJ & t) return i;
                  n("Expected '}' at end of object");
                }
                return s++, i;
              },
              c = () => {
                s++;
                let r = [];
                try {
                  for (; "]" !== e[s]; ) r.push(o()), u(), "," === e[s] && s++;
                } catch (e) {
                  if (no.ARR & t) return r;
                  n("Expected ']' at end of array");
                }
                return s++, r;
              },
              h = () => {
                if (0 === s) {
                  "-" === e && no.NUM & t && n("Not sure what '-' is");
                  try {
                    return JSON.parse(e);
                  } catch (r) {
                    if (no.NUM & t)
                      try {
                        if ("." === e[e.length - 1])
                          return JSON.parse(e.substring(0, e.lastIndexOf(".")));
                        return JSON.parse(e.substring(0, e.lastIndexOf("e")));
                      } catch (e) {}
                    i(String(r));
                  }
                }
                let o = s;
                for ("-" === e[s] && s++; e[s] && !",]}".includes(e[s]); ) s++;
                s != r || no.NUM & t || n("Unterminated number literal");
                try {
                  return JSON.parse(e.substring(o, s));
                } catch (r) {
                  "-" === e.substring(o, s) &&
                    no.NUM & t &&
                    n("Not sure what '-' is");
                  try {
                    return JSON.parse(e.substring(o, e.lastIndexOf("e")));
                  } catch (e) {
                    i(String(e));
                  }
                }
              },
              u = () => {
                for (; s < r && " \n\r	".includes(e[s]); ) s++;
              };
            return o();
          },
          nh = (e) =>
            (function (e, t = no.ALL) {
              if ("string" != typeof e)
                throw TypeError(`expecting str, got ${typeof e}`);
              if (!e.trim()) throw Error(`${e} is empty`);
              return nc(e.trim(), t);
            })(e, no.ALL ^ no.NUM);
        var nu = function (e, t, r, s, n) {
            if ("m" === s) throw TypeError("Private method is not writable");
            if ("a" === s && !n)
              throw TypeError("Private accessor was defined without a setter");
            if ("function" == typeof t ? e !== t || !n : !t.has(e))
              throw TypeError(
                "Cannot write private member to an object whose class did not declare it",
              );
            return (
              "a" === s ? n.call(e, r) : n ? (n.value = r) : t.set(e, r), r
            );
          },
          nd = function (e, t, r, s) {
            if ("a" === r && !s)
              throw TypeError("Private accessor was defined without a getter");
            if ("function" == typeof t ? e !== t || !s : !t.has(e))
              throw TypeError(
                "Cannot read private member from an object whose class did not declare it",
              );
            return "m" === r
              ? s
              : "a" === r
                ? s.call(e)
                : s
                  ? s.value
                  : t.get(e);
          };
        class np extends nn {
          constructor(e) {
            super(),
              eu.add(this),
              ed.set(this, void 0),
              ep.set(this, void 0),
              ef.set(this, void 0),
              nu(this, ed, e, "f"),
              nu(this, ep, [], "f");
          }
          get currentChatCompletionSnapshot() {
            return nd(this, ef, "f");
          }
          static fromReadableStream(e) {
            let t = new np(null);
            return t._run(() => t._fromReadableStream(e)), t;
          }
          static createChatCompletion(e, t, r) {
            let s = new np(t);
            return (
              s._run(() =>
                s._runChatCompletion(
                  e,
                  { ...t, stream: !0 },
                  {
                    ...r,
                    headers: {
                      ...r?.headers,
                      "X-Stainless-Helper-Method": "stream",
                    },
                  },
                ),
              ),
              s
            );
          }
          async _createChatCompletion(e, t, r) {
            super._createChatCompletion;
            let s = r?.signal;
            s &&
              (s.aborted && this.controller.abort(),
              s.addEventListener("abort", () => this.controller.abort())),
              nd(this, eu, "m", em).call(this);
            let n = await e.chat.completions.create(
              { ...t, stream: !0 },
              { ...r, signal: this.controller.signal },
            );
            for await (let e of (this._connected(), n))
              nd(this, eu, "m", ey).call(this, e);
            if (n.controller.signal?.aborted) throw new rc();
            return this._addChatCompletion(nd(this, eu, "m", e_).call(this));
          }
          async _fromReadableStream(e, t) {
            let r,
              s = t?.signal;
            s &&
              (s.aborted && this.controller.abort(),
              s.addEventListener("abort", () => this.controller.abort())),
              nd(this, eu, "m", em).call(this),
              this._connected();
            let n = rO.fromReadableStream(e, this.controller);
            for await (let e of n)
              r &&
                r !== e.id &&
                this._addChatCompletion(nd(this, eu, "m", e_).call(this)),
                nd(this, eu, "m", ey).call(this, e),
                (r = e.id);
            if (n.controller.signal?.aborted) throw new rc();
            return this._addChatCompletion(nd(this, eu, "m", e_).call(this));
          }
          [((ed = new WeakMap()),
          (ep = new WeakMap()),
          (ef = new WeakMap()),
          (eu = new WeakSet()),
          (em = function () {
            this.ended || nu(this, ef, void 0, "f");
          }),
          (eg = function (e) {
            let t = nd(this, ep, "f")[e.index];
            return (
              t ||
                ((t = {
                  content_done: !1,
                  refusal_done: !1,
                  logprobs_content_done: !1,
                  logprobs_refusal_done: !1,
                  done_tool_calls: new Set(),
                  current_tool_call_index: null,
                }),
                (nd(this, ep, "f")[e.index] = t)),
              t
            );
          }),
          (ey = function (e) {
            if (this.ended) return;
            let t = nd(this, eu, "m", ex).call(this, e);
            for (let r of (this._emit("chunk", e, t), e.choices)) {
              let e = t.choices[r.index];
              null != r.delta.content &&
                e.message?.role === "assistant" &&
                e.message?.content &&
                (this._emit("content", r.delta.content, e.message.content),
                this._emit("content.delta", {
                  delta: r.delta.content,
                  snapshot: e.message.content,
                  parsed: e.message.parsed,
                })),
                null != r.delta.refusal &&
                  e.message?.role === "assistant" &&
                  e.message?.refusal &&
                  this._emit("refusal.delta", {
                    delta: r.delta.refusal,
                    snapshot: e.message.refusal,
                  }),
                r.logprobs?.content != null &&
                  e.message?.role === "assistant" &&
                  this._emit("logprobs.content.delta", {
                    content: r.logprobs?.content,
                    snapshot: e.logprobs?.content ?? [],
                  }),
                r.logprobs?.refusal != null &&
                  e.message?.role === "assistant" &&
                  this._emit("logprobs.refusal.delta", {
                    refusal: r.logprobs?.refusal,
                    snapshot: e.logprobs?.refusal ?? [],
                  });
              let s = nd(this, eu, "m", eg).call(this, e);
              for (let t of (e.finish_reason &&
                (nd(this, eu, "m", ew).call(this, e),
                null != s.current_tool_call_index &&
                  nd(this, eu, "m", eb).call(
                    this,
                    e,
                    s.current_tool_call_index,
                  )),
              r.delta.tool_calls ?? []))
                s.current_tool_call_index !== t.index &&
                  (nd(this, eu, "m", ew).call(this, e),
                  null != s.current_tool_call_index &&
                    nd(this, eu, "m", eb).call(
                      this,
                      e,
                      s.current_tool_call_index,
                    )),
                  (s.current_tool_call_index = t.index);
              for (let t of r.delta.tool_calls ?? []) {
                let r = e.message.tool_calls?.[t.index];
                r?.type &&
                  (r?.type === "function"
                    ? this._emit("tool_calls.function.arguments.delta", {
                        name: r.function?.name,
                        index: t.index,
                        arguments: r.function.arguments,
                        parsed_arguments: r.function.parsed_arguments,
                        arguments_delta: t.function?.arguments ?? "",
                      })
                    : r?.type);
              }
            }
          }),
          (eb = function (e, t) {
            if (nd(this, eu, "m", eg).call(this, e).done_tool_calls.has(t))
              return;
            let r = e.message.tool_calls?.[t];
            if (!r) throw Error("no tool call snapshot");
            if (!r.type) throw Error("tool call snapshot missing `type`");
            if ("function" === r.type) {
              let e = nd(this, ed, "f")?.tools?.find(
                (e) =>
                  "function" === e.type && e.function.name === r.function.name,
              );
              this._emit("tool_calls.function.arguments.done", {
                name: r.function.name,
                index: t,
                arguments: r.function.arguments,
                parsed_arguments: ne(e)
                  ? e.$parseRaw(r.function.arguments)
                  : e?.function.strict
                    ? JSON.parse(r.function.arguments)
                    : null,
              });
            } else r.type;
          }),
          (ew = function (e) {
            let t = nd(this, eu, "m", eg).call(this, e);
            if (e.message.content && !t.content_done) {
              t.content_done = !0;
              let r = nd(this, eu, "m", ev).call(this);
              this._emit("content.done", {
                content: e.message.content,
                parsed: r ? r.$parseRaw(e.message.content) : null,
              });
            }
            e.message.refusal &&
              !t.refusal_done &&
              ((t.refusal_done = !0),
              this._emit("refusal.done", { refusal: e.message.refusal })),
              e.logprobs?.content &&
                !t.logprobs_content_done &&
                ((t.logprobs_content_done = !0),
                this._emit("logprobs.content.done", {
                  content: e.logprobs.content,
                })),
              e.logprobs?.refusal &&
                !t.logprobs_refusal_done &&
                ((t.logprobs_refusal_done = !0),
                this._emit("logprobs.refusal.done", {
                  refusal: e.logprobs.refusal,
                }));
          }),
          (e_ = function () {
            if (this.ended)
              throw new ra("stream has ended, this shouldn't happen");
            let e = nd(this, ef, "f");
            if (!e) throw new ra("request ended without sending any chunks");
            return (
              nu(this, ef, void 0, "f"),
              nu(this, ep, [], "f"),
              (function (e, t) {
                var r;
                let {
                  id: s,
                  choices: n,
                  created: i,
                  model: o,
                  system_fingerprint: a,
                  ...l
                } = e;
                return (
                  (r = {
                    ...l,
                    id: s,
                    choices: n.map(
                      ({
                        message: t,
                        finish_reason: r,
                        index: s,
                        logprobs: n,
                        ...i
                      }) => {
                        if (!r)
                          throw new ra(`missing finish_reason for choice ${s}`);
                        let {
                            content: o = null,
                            function_call: a,
                            tool_calls: l,
                            ...c
                          } = t,
                          h = t.role;
                        if (!h) throw new ra(`missing role for choice ${s}`);
                        if (a) {
                          let { arguments: e, name: l } = a;
                          if (null == e)
                            throw new ra(
                              `missing function_call.arguments for choice ${s}`,
                            );
                          if (!l)
                            throw new ra(
                              `missing function_call.name for choice ${s}`,
                            );
                          return {
                            ...i,
                            message: {
                              content: o,
                              function_call: { arguments: e, name: l },
                              role: h,
                              refusal: t.refusal ?? null,
                            },
                            finish_reason: r,
                            index: s,
                            logprobs: n,
                          };
                        }
                        return l
                          ? {
                              ...i,
                              index: s,
                              finish_reason: r,
                              logprobs: n,
                              message: {
                                ...c,
                                role: h,
                                content: o,
                                refusal: t.refusal ?? null,
                                tool_calls: l.map((t, r) => {
                                  let { function: n, type: i, id: o, ...a } = t,
                                    { arguments: l, name: c, ...h } = n || {};
                                  if (null == o)
                                    throw new ra(`missing choices[${s}].tool_calls[${r}].id
${nf(e)}`);
                                  if (null == i)
                                    throw new ra(`missing choices[${s}].tool_calls[${r}].type
${nf(e)}`);
                                  if (null == c)
                                    throw new ra(`missing choices[${s}].tool_calls[${r}].function.name
${nf(e)}`);
                                  if (null == l)
                                    throw new ra(`missing choices[${s}].tool_calls[${r}].function.arguments
${nf(e)}`);
                                  return {
                                    ...a,
                                    id: o,
                                    type: i,
                                    function: { ...h, name: c, arguments: l },
                                  };
                                }),
                              },
                            }
                          : {
                              ...i,
                              message: {
                                ...c,
                                content: o,
                                role: h,
                                refusal: t.refusal ?? null,
                              },
                              finish_reason: r,
                              index: s,
                              logprobs: n,
                            };
                      },
                    ),
                    created: i,
                    model: o,
                    object: "chat.completion",
                    ...(a ? { system_fingerprint: a } : {}),
                  }),
                  t && nr(t)
                    ? nt(r, t)
                    : {
                        ...r,
                        choices: r.choices.map((e) => ({
                          ...e,
                          message: {
                            ...e.message,
                            parsed: null,
                            ...(e.message.tool_calls
                              ? { tool_calls: e.message.tool_calls }
                              : void 0),
                          },
                        })),
                      }
                );
              })(e, nd(this, ed, "f"))
            );
          }),
          (ev = function () {
            let e = nd(this, ed, "f")?.response_format;
            return s9(e) ? e : null;
          }),
          (ex = function (e) {
            var t, r, s, n;
            let i = nd(this, ef, "f"),
              { choices: o, ...a } = e;
            for (let {
              delta: o,
              finish_reason: l,
              index: c,
              logprobs: h = null,
              ...u
            } of (i
              ? Object.assign(i, a)
              : (i = nu(this, ef, { ...a, choices: [] }, "f")),
            e.choices)) {
              let e = i.choices[c];
              if (
                (e ||
                  (e = i.choices[c] =
                    {
                      finish_reason: l,
                      index: c,
                      message: {},
                      logprobs: h,
                      ...u,
                    }),
                h)
              )
                if (e.logprobs) {
                  let { content: s, refusal: n, ...i } = h;
                  Object.assign(e.logprobs, i),
                    s &&
                      ((t = e.logprobs).content ?? (t.content = []),
                      e.logprobs.content.push(...s)),
                    n &&
                      ((r = e.logprobs).refusal ?? (r.refusal = []),
                      e.logprobs.refusal.push(...n));
                } else e.logprobs = Object.assign({}, h);
              if (
                l &&
                ((e.finish_reason = l),
                nd(this, ed, "f") && nr(nd(this, ed, "f")))
              ) {
                if ("length" === l) throw new r_();
                if ("content_filter" === l) throw new rv();
              }
              if ((Object.assign(e, u), !o)) continue;
              let {
                content: a,
                refusal: d,
                function_call: p,
                role: f,
                tool_calls: m,
                ...g
              } = o;
              if (
                (Object.assign(e.message, g),
                d && (e.message.refusal = (e.message.refusal || "") + d),
                f && (e.message.role = f),
                p &&
                  (e.message.function_call
                    ? (p.name && (e.message.function_call.name = p.name),
                      p.arguments &&
                        ((s = e.message.function_call).arguments ??
                          (s.arguments = ""),
                        (e.message.function_call.arguments += p.arguments)))
                    : (e.message.function_call = p)),
                a &&
                  ((e.message.content = (e.message.content || "") + a),
                  !e.message.refusal &&
                    nd(this, eu, "m", ev).call(this) &&
                    (e.message.parsed = nh(e.message.content))),
                m)
              )
                for (let { index: t, id: r, type: s, function: i, ...o } of (e
                  .message.tool_calls || (e.message.tool_calls = []),
                m)) {
                  let a = (n = e.message.tool_calls)[t] ?? (n[t] = {});
                  Object.assign(a, o),
                    r && (a.id = r),
                    s && (a.type = s),
                    i &&
                      (a.function ??
                        (a.function = { name: i.name ?? "", arguments: "" })),
                    i?.name && (a.function.name = i.name),
                    i?.arguments &&
                      ((a.function.arguments += i.arguments),
                      (function (e, t) {
                        if (!e) return !1;
                        let r = e.tools?.find(
                          (e) => e.function?.name === t.function.name,
                        );
                        return ne(r) || r?.function.strict || !1;
                      })(nd(this, ed, "f"), a) &&
                        (a.function.parsed_arguments = nh(
                          a.function.arguments,
                        )));
                }
            }
            return i;
          }),
          Symbol.asyncIterator)]() {
            let e = [],
              t = [],
              r = !1;
            return (
              this.on("chunk", (r) => {
                let s = t.shift();
                s ? s.resolve(r) : e.push(r);
              }),
              this.on("end", () => {
                for (let e of ((r = !0), t)) e.resolve(void 0);
                t.length = 0;
              }),
              this.on("abort", (e) => {
                for (let s of ((r = !0), t)) s.reject(e);
                t.length = 0;
              }),
              this.on("error", (e) => {
                for (let s of ((r = !0), t)) s.reject(e);
                t.length = 0;
              }),
              {
                next: async () =>
                  e.length
                    ? { value: e.shift(), done: !1 }
                    : r
                      ? { value: void 0, done: !0 }
                      : new Promise((e, r) =>
                          t.push({ resolve: e, reject: r }),
                        ).then((e) =>
                          e
                            ? { value: e, done: !1 }
                            : { value: void 0, done: !0 },
                        ),
                return: async () => (this.abort(), { value: void 0, done: !0 }),
              }
            );
          }
          toReadableStream() {
            return new rO(
              this[Symbol.asyncIterator].bind(this),
              this.controller,
            ).toReadableStream();
          }
        }
        function nf(e) {
          return JSON.stringify(e);
        }
        class nm extends np {
          static fromReadableStream(e) {
            let t = new nm(null);
            return t._run(() => t._fromReadableStream(e)), t;
          }
          static runFunctions(e, t, r) {
            let s = new nm(null),
              n = {
                ...r,
                headers: {
                  ...r?.headers,
                  "X-Stainless-Helper-Method": "runFunctions",
                },
              };
            return s._run(() => s._runFunctions(e, t, n)), s;
          }
          static runTools(e, t, r) {
            let s = new nm(t),
              n = {
                ...r,
                headers: {
                  ...r?.headers,
                  "X-Stainless-Helper-Method": "runTools",
                },
              };
            return s._run(() => s._runTools(e, t, n)), s;
          }
        }
        class ng extends sd {
          parse(e, t) {
            for (let t of e.tools ?? []) {
              if ("function" !== t.type)
                throw new ra(
                  `Currently only \`function\` tool types support auto-parsing; Received \`${t.type}\``,
                );
              if (!0 !== t.function.strict)
                throw new ra(
                  `The \`${t.function.name}\` tool is not marked with \`strict: true\`. Only strict function tools can be auto-parsed`,
                );
            }
            return this._client.chat.completions
              .create(e, {
                ...t,
                headers: {
                  ...t?.headers,
                  "X-Stainless-Helper-Method": "beta.chat.completions.parse",
                },
              })
              ._thenUnwrap((t) => nt(t, e));
          }
          runFunctions(e, t) {
            return e.stream
              ? nm.runFunctions(this._client, e, t)
              : ni.runFunctions(this._client, e, t);
          }
          runTools(e, t) {
            return e.stream
              ? nm.runTools(this._client, e, t)
              : ni.runTools(this._client, e, t);
          }
          stream(e, t) {
            return np.createChatCompletion(this._client, e, t);
          }
        }
        class ny extends sd {
          constructor() {
            super(...arguments), (this.completions = new ng(this._client));
          }
        }
        (ny || (ny = {})).Completions = ng;
        class nb extends sd {
          create(e, t) {
            return this._client.post("/realtime/sessions", {
              body: e,
              ...t,
              headers: { "OpenAI-Beta": "assistants=v2", ...t?.headers },
            });
          }
        }
        class nw extends sd {
          create(e, t) {
            return this._client.post("/realtime/transcription_sessions", {
              body: e,
              ...t,
              headers: { "OpenAI-Beta": "assistants=v2", ...t?.headers },
            });
          }
        }
        class n_ extends sd {
          constructor() {
            super(...arguments),
              (this.sessions = new nb(this._client)),
              (this.transcriptionSessions = new nw(this._client));
          }
        }
        (n_.Sessions = nb), (n_.TranscriptionSessions = nw);
        var nv = function (e, t, r, s) {
            if ("a" === r && !s)
              throw TypeError("Private accessor was defined without a getter");
            if ("function" == typeof t ? e !== t || !s : !t.has(e))
              throw TypeError(
                "Cannot read private member from an object whose class did not declare it",
              );
            return "m" === r
              ? s
              : "a" === r
                ? s.call(e)
                : s
                  ? s.value
                  : t.get(e);
          },
          nx = function (e, t, r, s, n) {
            if ("m" === s) throw TypeError("Private method is not writable");
            if ("a" === s && !n)
              throw TypeError("Private accessor was defined without a setter");
            if ("function" == typeof t ? e !== t || !n : !t.has(e))
              throw TypeError(
                "Cannot write private member to an object whose class did not declare it",
              );
            return (
              "a" === s ? n.call(e, r) : n ? (n.value = r) : t.set(e, r), r
            );
          };
        class nS extends s7 {
          constructor() {
            super(...arguments),
              eS.add(this),
              eT.set(this, []),
              eE.set(this, {}),
              eO.set(this, {}),
              eA.set(this, void 0),
              eR.set(this, void 0),
              ek.set(this, void 0),
              eC.set(this, void 0),
              eP.set(this, void 0),
              eL.set(this, void 0),
              eI.set(this, void 0),
              e$.set(this, void 0),
              ej.set(this, void 0);
          }
          [((eT = new WeakMap()),
          (eE = new WeakMap()),
          (eO = new WeakMap()),
          (eA = new WeakMap()),
          (eR = new WeakMap()),
          (ek = new WeakMap()),
          (eC = new WeakMap()),
          (eP = new WeakMap()),
          (eL = new WeakMap()),
          (eI = new WeakMap()),
          (e$ = new WeakMap()),
          (ej = new WeakMap()),
          (eS = new WeakSet()),
          Symbol.asyncIterator)]() {
            let e = [],
              t = [],
              r = !1;
            return (
              this.on("event", (r) => {
                let s = t.shift();
                s ? s.resolve(r) : e.push(r);
              }),
              this.on("end", () => {
                for (let e of ((r = !0), t)) e.resolve(void 0);
                t.length = 0;
              }),
              this.on("abort", (e) => {
                for (let s of ((r = !0), t)) s.reject(e);
                t.length = 0;
              }),
              this.on("error", (e) => {
                for (let s of ((r = !0), t)) s.reject(e);
                t.length = 0;
              }),
              {
                next: async () =>
                  e.length
                    ? { value: e.shift(), done: !1 }
                    : r
                      ? { value: void 0, done: !0 }
                      : new Promise((e, r) =>
                          t.push({ resolve: e, reject: r }),
                        ).then((e) =>
                          e
                            ? { value: e, done: !1 }
                            : { value: void 0, done: !0 },
                        ),
                return: async () => (this.abort(), { value: void 0, done: !0 }),
              }
            );
          }
          static fromReadableStream(e) {
            let t = new nS();
            return t._run(() => t._fromReadableStream(e)), t;
          }
          async _fromReadableStream(e, t) {
            let r = t?.signal;
            r &&
              (r.aborted && this.controller.abort(),
              r.addEventListener("abort", () => this.controller.abort())),
              this._connected();
            let s = rO.fromReadableStream(e, this.controller);
            for await (let e of s) nv(this, eS, "m", ez).call(this, e);
            if (s.controller.signal?.aborted) throw new rc();
            return this._addRun(nv(this, eS, "m", eM).call(this));
          }
          toReadableStream() {
            return new rO(
              this[Symbol.asyncIterator].bind(this),
              this.controller,
            ).toReadableStream();
          }
          static createToolAssistantStream(e, t, r, s, n) {
            let i = new nS();
            return (
              i._run(() =>
                i._runToolAssistantStream(e, t, r, s, {
                  ...n,
                  headers: {
                    ...n?.headers,
                    "X-Stainless-Helper-Method": "stream",
                  },
                }),
              ),
              i
            );
          }
          async _createToolAssistantStream(e, t, r, s, n) {
            let i = n?.signal;
            i &&
              (i.aborted && this.controller.abort(),
              i.addEventListener("abort", () => this.controller.abort()));
            let o = { ...s, stream: !0 },
              a = await e.submitToolOutputs(t, r, o, {
                ...n,
                signal: this.controller.signal,
              });
            for await (let e of (this._connected(), a))
              nv(this, eS, "m", ez).call(this, e);
            if (a.controller.signal?.aborted) throw new rc();
            return this._addRun(nv(this, eS, "m", eM).call(this));
          }
          static createThreadAssistantStream(e, t, r) {
            let s = new nS();
            return (
              s._run(() =>
                s._threadAssistantStream(e, t, {
                  ...r,
                  headers: {
                    ...r?.headers,
                    "X-Stainless-Helper-Method": "stream",
                  },
                }),
              ),
              s
            );
          }
          static createAssistantStream(e, t, r, s) {
            let n = new nS();
            return (
              n._run(() =>
                n._runAssistantStream(e, t, r, {
                  ...s,
                  headers: {
                    ...s?.headers,
                    "X-Stainless-Helper-Method": "stream",
                  },
                }),
              ),
              n
            );
          }
          currentEvent() {
            return nv(this, eI, "f");
          }
          currentRun() {
            return nv(this, e$, "f");
          }
          currentMessageSnapshot() {
            return nv(this, eA, "f");
          }
          currentRunStepSnapshot() {
            return nv(this, ej, "f");
          }
          async finalRunSteps() {
            return await this.done(), Object.values(nv(this, eE, "f"));
          }
          async finalMessages() {
            return await this.done(), Object.values(nv(this, eO, "f"));
          }
          async finalRun() {
            if ((await this.done(), !nv(this, eR, "f")))
              throw Error("Final run was not received.");
            return nv(this, eR, "f");
          }
          async _createThreadAssistantStream(e, t, r) {
            let s = r?.signal;
            s &&
              (s.aborted && this.controller.abort(),
              s.addEventListener("abort", () => this.controller.abort()));
            let n = { ...t, stream: !0 },
              i = await e.createAndRun(n, {
                ...r,
                signal: this.controller.signal,
              });
            for await (let e of (this._connected(), i))
              nv(this, eS, "m", ez).call(this, e);
            if (i.controller.signal?.aborted) throw new rc();
            return this._addRun(nv(this, eS, "m", eM).call(this));
          }
          async _createAssistantStream(e, t, r, s) {
            let n = s?.signal;
            n &&
              (n.aborted && this.controller.abort(),
              n.addEventListener("abort", () => this.controller.abort()));
            let i = { ...r, stream: !0 },
              o = await e.create(t, i, {
                ...s,
                signal: this.controller.signal,
              });
            for await (let e of (this._connected(), o))
              nv(this, eS, "m", ez).call(this, e);
            if (o.controller.signal?.aborted) throw new rc();
            return this._addRun(nv(this, eS, "m", eM).call(this));
          }
          static accumulateDelta(e, t) {
            for (let [r, s] of Object.entries(t)) {
              if (!e.hasOwnProperty(r)) {
                e[r] = s;
                continue;
              }
              let t = e[r];
              if (null == t || "index" === r || "type" === r) {
                e[r] = s;
                continue;
              }
              if ("string" == typeof t && "string" == typeof s) t += s;
              else if ("number" == typeof t && "number" == typeof s) t += s;
              else if (su(t) && su(s)) t = this.accumulateDelta(t, s);
              else if (Array.isArray(t) && Array.isArray(s)) {
                if (
                  t.every((e) => "string" == typeof e || "number" == typeof e)
                ) {
                  t.push(...s);
                  continue;
                }
                for (let e of s) {
                  if (!su(e))
                    throw Error(
                      `Expected array delta entry to be an object but got: ${e}`,
                    );
                  let r = e.index;
                  if (null == r)
                    throw (
                      (console.error(e),
                      Error(
                        "Expected array delta entry to have an `index` property",
                      ))
                    );
                  if ("number" != typeof r)
                    throw Error(
                      `Expected array delta entry \`index\` property to be a number but got ${r}`,
                    );
                  let s = t[r];
                  null == s ? t.push(e) : (t[r] = this.accumulateDelta(s, e));
                }
                continue;
              } else
                throw Error(
                  `Unhandled record type: ${r}, deltaValue: ${s}, accValue: ${t}`,
                );
              e[r] = t;
            }
            return e;
          }
          _addRun(e) {
            return e;
          }
          async _threadAssistantStream(e, t, r) {
            return await this._createThreadAssistantStream(t, e, r);
          }
          async _runAssistantStream(e, t, r, s) {
            return await this._createAssistantStream(t, e, r, s);
          }
          async _runToolAssistantStream(e, t, r, s, n) {
            return await this._createToolAssistantStream(r, e, t, s, n);
          }
        }
        (ez = function (e) {
          if (!this.ended)
            switch (
              (nx(this, eI, e, "f"),
              nv(this, eS, "m", eF).call(this, e),
              e.event)
            ) {
              case "thread.created":
                break;
              case "thread.run.created":
              case "thread.run.queued":
              case "thread.run.in_progress":
              case "thread.run.requires_action":
              case "thread.run.completed":
              case "thread.run.incomplete":
              case "thread.run.failed":
              case "thread.run.cancelling":
              case "thread.run.cancelled":
              case "thread.run.expired":
                nv(this, eS, "m", eU).call(this, e);
                break;
              case "thread.run.step.created":
              case "thread.run.step.in_progress":
              case "thread.run.step.delta":
              case "thread.run.step.completed":
              case "thread.run.step.failed":
              case "thread.run.step.cancelled":
              case "thread.run.step.expired":
                nv(this, eS, "m", eN).call(this, e);
                break;
              case "thread.message.created":
              case "thread.message.in_progress":
              case "thread.message.delta":
              case "thread.message.completed":
              case "thread.message.incomplete":
                nv(this, eS, "m", eq).call(this, e);
                break;
              case "error":
                throw Error(
                  "Encountered an error event in event processing - errors should be processed earlier",
                );
            }
        }),
          (eM = function () {
            if (this.ended)
              throw new ra("stream has ended, this shouldn't happen");
            if (!nv(this, eR, "f"))
              throw Error("Final run has not been received");
            return nv(this, eR, "f");
          }),
          (eq = function (e) {
            let [t, r] = nv(this, eS, "m", eD).call(this, e, nv(this, eA, "f"));
            for (let e of (nx(this, eA, t, "f"),
            (nv(this, eO, "f")[t.id] = t),
            r)) {
              let r = t.content[e.index];
              r?.type == "text" && this._emit("textCreated", r.text);
            }
            switch (e.event) {
              case "thread.message.created":
                this._emit("messageCreated", e.data);
                break;
              case "thread.message.in_progress":
                break;
              case "thread.message.delta":
                if (
                  (this._emit("messageDelta", e.data.delta, t),
                  e.data.delta.content)
                )
                  for (let r of e.data.delta.content) {
                    if ("text" == r.type && r.text) {
                      let e = r.text,
                        s = t.content[r.index];
                      if (s && "text" == s.type)
                        this._emit("textDelta", e, s.text);
                      else
                        throw Error(
                          "The snapshot associated with this text delta is not text or missing",
                        );
                    }
                    if (r.index != nv(this, ek, "f")) {
                      if (nv(this, eC, "f"))
                        switch (nv(this, eC, "f").type) {
                          case "text":
                            this._emit(
                              "textDone",
                              nv(this, eC, "f").text,
                              nv(this, eA, "f"),
                            );
                            break;
                          case "image_file":
                            this._emit(
                              "imageFileDone",
                              nv(this, eC, "f").image_file,
                              nv(this, eA, "f"),
                            );
                        }
                      nx(this, ek, r.index, "f");
                    }
                    nx(this, eC, t.content[r.index], "f");
                  }
                break;
              case "thread.message.completed":
              case "thread.message.incomplete":
                if (void 0 !== nv(this, ek, "f")) {
                  let t = e.data.content[nv(this, ek, "f")];
                  if (t)
                    switch (t.type) {
                      case "image_file":
                        this._emit(
                          "imageFileDone",
                          t.image_file,
                          nv(this, eA, "f"),
                        );
                        break;
                      case "text":
                        this._emit("textDone", t.text, nv(this, eA, "f"));
                    }
                }
                nv(this, eA, "f") && this._emit("messageDone", e.data),
                  nx(this, eA, void 0, "f");
            }
          }),
          (eN = function (e) {
            let t = nv(this, eS, "m", eB).call(this, e);
            switch ((nx(this, ej, t, "f"), e.event)) {
              case "thread.run.step.created":
                this._emit("runStepCreated", e.data);
                break;
              case "thread.run.step.delta":
                let r = e.data.delta;
                if (
                  r.step_details &&
                  "tool_calls" == r.step_details.type &&
                  r.step_details.tool_calls &&
                  "tool_calls" == t.step_details.type
                )
                  for (let e of r.step_details.tool_calls)
                    e.index == nv(this, eP, "f")
                      ? this._emit(
                          "toolCallDelta",
                          e,
                          t.step_details.tool_calls[e.index],
                        )
                      : (nv(this, eL, "f") &&
                          this._emit("toolCallDone", nv(this, eL, "f")),
                        nx(this, eP, e.index, "f"),
                        nx(this, eL, t.step_details.tool_calls[e.index], "f"),
                        nv(this, eL, "f") &&
                          this._emit("toolCallCreated", nv(this, eL, "f")));
                this._emit("runStepDelta", e.data.delta, t);
                break;
              case "thread.run.step.completed":
              case "thread.run.step.failed":
              case "thread.run.step.cancelled":
              case "thread.run.step.expired":
                nx(this, ej, void 0, "f"),
                  "tool_calls" == e.data.step_details.type &&
                    nv(this, eL, "f") &&
                    (this._emit("toolCallDone", nv(this, eL, "f")),
                    nx(this, eL, void 0, "f")),
                  this._emit("runStepDone", e.data, t);
            }
          }),
          (eF = function (e) {
            nv(this, eT, "f").push(e), this._emit("event", e);
          }),
          (eB = function (e) {
            switch (e.event) {
              case "thread.run.step.created":
                return (nv(this, eE, "f")[e.data.id] = e.data), e.data;
              case "thread.run.step.delta":
                let t = nv(this, eE, "f")[e.data.id];
                if (!t)
                  throw Error(
                    "Received a RunStepDelta before creation of a snapshot",
                  );
                let r = e.data;
                if (r.delta) {
                  let s = nS.accumulateDelta(t, r.delta);
                  nv(this, eE, "f")[e.data.id] = s;
                }
                return nv(this, eE, "f")[e.data.id];
              case "thread.run.step.completed":
              case "thread.run.step.failed":
              case "thread.run.step.cancelled":
              case "thread.run.step.expired":
              case "thread.run.step.in_progress":
                nv(this, eE, "f")[e.data.id] = e.data;
            }
            if (nv(this, eE, "f")[e.data.id])
              return nv(this, eE, "f")[e.data.id];
            throw Error("No snapshot available");
          }),
          (eD = function (e, t) {
            let r = [];
            switch (e.event) {
              case "thread.message.created":
                return [e.data, r];
              case "thread.message.delta":
                if (!t)
                  throw Error(
                    "Received a delta with no existing snapshot (there should be one from message creation)",
                  );
                let s = e.data;
                if (s.delta.content)
                  for (let e of s.delta.content)
                    if (e.index in t.content) {
                      let r = t.content[e.index];
                      t.content[e.index] = nv(this, eS, "m", eW).call(
                        this,
                        e,
                        r,
                      );
                    } else (t.content[e.index] = e), r.push(e);
                return [t, r];
              case "thread.message.in_progress":
              case "thread.message.completed":
              case "thread.message.incomplete":
                if (t) return [t, r];
                throw Error(
                  "Received thread message event with no existing snapshot",
                );
            }
            throw Error("Tried to accumulate a non-message event");
          }),
          (eW = function (e, t) {
            return nS.accumulateDelta(t, e);
          }),
          (eU = function (e) {
            switch ((nx(this, e$, e.data, "f"), e.event)) {
              case "thread.run.created":
              case "thread.run.queued":
              case "thread.run.in_progress":
                break;
              case "thread.run.requires_action":
              case "thread.run.cancelled":
              case "thread.run.failed":
              case "thread.run.completed":
              case "thread.run.expired":
                nx(this, eR, e.data, "f"),
                  nv(this, eL, "f") &&
                    (this._emit("toolCallDone", nv(this, eL, "f")),
                    nx(this, eL, void 0, "f"));
            }
          });
        class nT extends sd {
          create(e, t, r) {
            return this._client.post(`/threads/${e}/messages`, {
              body: t,
              ...r,
              headers: { "OpenAI-Beta": "assistants=v2", ...r?.headers },
            });
          }
          retrieve(e, t, r) {
            return this._client.get(`/threads/${e}/messages/${t}`, {
              ...r,
              headers: { "OpenAI-Beta": "assistants=v2", ...r?.headers },
            });
          }
          update(e, t, r, s) {
            return this._client.post(`/threads/${e}/messages/${t}`, {
              body: r,
              ...s,
              headers: { "OpenAI-Beta": "assistants=v2", ...s?.headers },
            });
          }
          list(e, t = {}, r) {
            return rZ(t)
              ? this.list(e, {}, t)
              : this._client.getAPIList(`/threads/${e}/messages`, nE, {
                  query: t,
                  ...r,
                  headers: { "OpenAI-Beta": "assistants=v2", ...r?.headers },
                });
          }
          del(e, t, r) {
            return this._client.delete(`/threads/${e}/messages/${t}`, {
              ...r,
              headers: { "OpenAI-Beta": "assistants=v2", ...r?.headers },
            });
          }
        }
        class nE extends sg {}
        nT.MessagesPage = nE;
        class nO extends sd {
          retrieve(e, t, r, s = {}, n) {
            return rZ(s)
              ? this.retrieve(e, t, r, {}, s)
              : this._client.get(`/threads/${e}/runs/${t}/steps/${r}`, {
                  query: s,
                  ...n,
                  headers: { "OpenAI-Beta": "assistants=v2", ...n?.headers },
                });
          }
          list(e, t, r = {}, s) {
            return rZ(r)
              ? this.list(e, t, {}, r)
              : this._client.getAPIList(`/threads/${e}/runs/${t}/steps`, nA, {
                  query: r,
                  ...s,
                  headers: { "OpenAI-Beta": "assistants=v2", ...s?.headers },
                });
          }
        }
        class nA extends sg {}
        nO.RunStepsPage = nA;
        class nR extends sd {
          constructor() {
            super(...arguments), (this.steps = new nO(this._client));
          }
          create(e, t, r) {
            let { include: s, ...n } = t;
            return this._client.post(`/threads/${e}/runs`, {
              query: { include: s },
              body: n,
              ...r,
              headers: { "OpenAI-Beta": "assistants=v2", ...r?.headers },
              stream: t.stream ?? !1,
            });
          }
          retrieve(e, t, r) {
            return this._client.get(`/threads/${e}/runs/${t}`, {
              ...r,
              headers: { "OpenAI-Beta": "assistants=v2", ...r?.headers },
            });
          }
          update(e, t, r, s) {
            return this._client.post(`/threads/${e}/runs/${t}`, {
              body: r,
              ...s,
              headers: { "OpenAI-Beta": "assistants=v2", ...s?.headers },
            });
          }
          list(e, t = {}, r) {
            return rZ(t)
              ? this.list(e, {}, t)
              : this._client.getAPIList(`/threads/${e}/runs`, nk, {
                  query: t,
                  ...r,
                  headers: { "OpenAI-Beta": "assistants=v2", ...r?.headers },
                });
          }
          cancel(e, t, r) {
            return this._client.post(`/threads/${e}/runs/${t}/cancel`, {
              ...r,
              headers: { "OpenAI-Beta": "assistants=v2", ...r?.headers },
            });
          }
          async createAndPoll(e, t, r) {
            let s = await this.create(e, t, r);
            return await this.poll(e, s.id, r);
          }
          createAndStream(e, t, r) {
            return nS.createAssistantStream(
              e,
              this._client.beta.threads.runs,
              t,
              r,
            );
          }
          async poll(e, t, r) {
            let s = { ...r?.headers, "X-Stainless-Poll-Helper": "true" };
            for (
              r?.pollIntervalMs &&
              (s["X-Stainless-Custom-Poll-Interval"] =
                r.pollIntervalMs.toString());
              ;

            ) {
              let { data: n, response: i } = await this.retrieve(e, t, {
                ...r,
                headers: { ...r?.headers, ...s },
              }).withResponse();
              switch (n.status) {
                case "queued":
                case "in_progress":
                case "cancelling":
                  let o = 5e3;
                  if (r?.pollIntervalMs) o = r.pollIntervalMs;
                  else {
                    let e = i.headers.get("openai-poll-after-ms");
                    if (e) {
                      let t = parseInt(e);
                      isNaN(t) || (o = t);
                    }
                  }
                  await r6(o);
                  break;
                case "requires_action":
                case "incomplete":
                case "cancelled":
                case "completed":
                case "failed":
                case "expired":
                  return n;
              }
            }
          }
          stream(e, t, r) {
            return nS.createAssistantStream(
              e,
              this._client.beta.threads.runs,
              t,
              r,
            );
          }
          submitToolOutputs(e, t, r, s) {
            return this._client.post(
              `/threads/${e}/runs/${t}/submit_tool_outputs`,
              {
                body: r,
                ...s,
                headers: { "OpenAI-Beta": "assistants=v2", ...s?.headers },
                stream: r.stream ?? !1,
              },
            );
          }
          async submitToolOutputsAndPoll(e, t, r, s) {
            let n = await this.submitToolOutputs(e, t, r, s);
            return await this.poll(e, n.id, s);
          }
          submitToolOutputsStream(e, t, r, s) {
            return nS.createToolAssistantStream(
              e,
              t,
              this._client.beta.threads.runs,
              r,
              s,
            );
          }
        }
        class nk extends sg {}
        (nR.RunsPage = nk), (nR.Steps = nO), (nR.RunStepsPage = nA);
        class nC extends sd {
          constructor() {
            super(...arguments),
              (this.runs = new nR(this._client)),
              (this.messages = new nT(this._client));
          }
          create(e = {}, t) {
            return rZ(e)
              ? this.create({}, e)
              : this._client.post("/threads", {
                  body: e,
                  ...t,
                  headers: { "OpenAI-Beta": "assistants=v2", ...t?.headers },
                });
          }
          retrieve(e, t) {
            return this._client.get(`/threads/${e}`, {
              ...t,
              headers: { "OpenAI-Beta": "assistants=v2", ...t?.headers },
            });
          }
          update(e, t, r) {
            return this._client.post(`/threads/${e}`, {
              body: t,
              ...r,
              headers: { "OpenAI-Beta": "assistants=v2", ...r?.headers },
            });
          }
          del(e, t) {
            return this._client.delete(`/threads/${e}`, {
              ...t,
              headers: { "OpenAI-Beta": "assistants=v2", ...t?.headers },
            });
          }
          createAndRun(e, t) {
            return this._client.post("/threads/runs", {
              body: e,
              ...t,
              headers: { "OpenAI-Beta": "assistants=v2", ...t?.headers },
              stream: e.stream ?? !1,
            });
          }
          async createAndRunPoll(e, t) {
            let r = await this.createAndRun(e, t);
            return await this.runs.poll(r.thread_id, r.id, t);
          }
          createAndRunStream(e, t) {
            return nS.createThreadAssistantStream(
              e,
              this._client.beta.threads,
              t,
            );
          }
        }
        (nC.Runs = nR),
          (nC.RunsPage = nk),
          (nC.Messages = nT),
          (nC.MessagesPage = nE);
        class nP extends sd {
          constructor() {
            super(...arguments),
              (this.realtime = new n_(this._client)),
              (this.chat = new ny(this._client)),
              (this.assistants = new s0(this._client)),
              (this.threads = new nC(this._client));
          }
        }
        (nP.Realtime = n_),
          (nP.Assistants = s0),
          (nP.AssistantsPage = s1),
          (nP.Threads = nC);
        class nL extends sd {
          create(e, t) {
            return this._client.post("/batches", { body: e, ...t });
          }
          retrieve(e, t) {
            return this._client.get(`/batches/${e}`, t);
          }
          list(e = {}, t) {
            return rZ(e)
              ? this.list({}, e)
              : this._client.getAPIList("/batches", nI, { query: e, ...t });
          }
          cancel(e, t) {
            return this._client.post(`/batches/${e}/cancel`, t);
          }
        }
        class nI extends sg {}
        nL.BatchesPage = nI;
        class n$ extends sd {
          create(e, t, r) {
            return this._client.post(
              `/uploads/${e}/parts`,
              rN({ body: t, ...r }),
            );
          }
        }
        class nj extends sd {
          constructor() {
            super(...arguments), (this.parts = new n$(this._client));
          }
          create(e, t) {
            return this._client.post("/uploads", { body: e, ...t });
          }
          cancel(e, t) {
            return this._client.post(`/uploads/${e}/cancel`, t);
          }
          complete(e, t, r) {
            return this._client.post(`/uploads/${e}/complete`, {
              body: t,
              ...r,
            });
          }
        }
        function nz(e, t) {
          let r = e.output.map((e) => {
              if ("function_call" === e.type)
                return {
                  ...e,
                  parsed_arguments: (function (e, t) {
                    let r = (function (e, t) {
                      return e.find(
                        (e) => "function" === e.type && e.name === t,
                      );
                    })(e.tools ?? [], t.name);
                    return {
                      ...t,
                      ...t,
                      parsed_arguments: (function (e) {
                        return e?.$brand === "auto-parseable-tool";
                      })(r)
                        ? r.$parseRaw(t.arguments)
                        : r?.strict
                          ? JSON.parse(t.arguments)
                          : null,
                    };
                  })(t, e),
                };
              if ("message" === e.type) {
                let r = e.content.map((e) => {
                  var r, s;
                  return "output_text" === e.type
                    ? {
                        ...e,
                        parsed:
                          ((r = t),
                          (s = e.text),
                          r.text?.format?.type !== "json_schema"
                            ? null
                            : "$parseRaw" in r.text?.format
                              ? (r.text?.format).$parseRaw(s)
                              : JSON.parse(s)),
                      }
                    : e;
                });
                return { ...e, content: r };
              }
              return e;
            }),
            s = Object.assign({}, e, { output: r });
          return (
            Object.getOwnPropertyDescriptor(e, "output_text") || nM(s),
            Object.defineProperty(s, "output_parsed", {
              enumerable: !0,
              get() {
                for (let e of s.output)
                  if ("message" === e.type) {
                    for (let t of e.content)
                      if ("output_text" === t.type && null !== t.parsed)
                        return t.parsed;
                  }
                return null;
              },
            }),
            s
          );
        }
        nj.Parts = n$;
        function nM(e) {
          let t = [];
          for (let r of e.output)
            if ("message" === r.type)
              for (let e of r.content)
                "output_text" === e.type && t.push(e.text);
          e.output_text = t.join("");
        }
        class nq extends sd {
          list(e, t = {}, r) {
            return rZ(t)
              ? this.list(e, {}, t)
              : this._client.getAPIList(`/responses/${e}/input_items`, nW, {
                  query: t,
                  ...r,
                });
          }
        }
        var nN = function (e, t, r, s, n) {
            if ("m" === s) throw TypeError("Private method is not writable");
            if ("a" === s && !n)
              throw TypeError("Private accessor was defined without a setter");
            if ("function" == typeof t ? e !== t || !n : !t.has(e))
              throw TypeError(
                "Cannot write private member to an object whose class did not declare it",
              );
            return (
              "a" === s ? n.call(e, r) : n ? (n.value = r) : t.set(e, r), r
            );
          },
          nF = function (e, t, r, s) {
            if ("a" === r && !s)
              throw TypeError("Private accessor was defined without a getter");
            if ("function" == typeof t ? e !== t || !s : !t.has(e))
              throw TypeError(
                "Cannot read private member from an object whose class did not declare it",
              );
            return "m" === r
              ? s
              : "a" === r
                ? s.call(e)
                : s
                  ? s.value
                  : t.get(e);
          };
        class nB extends s7 {
          constructor(e) {
            super(),
              eH.add(this),
              eJ.set(this, void 0),
              eX.set(this, void 0),
              eV.set(this, void 0),
              nN(this, eJ, e, "f");
          }
          static createResponse(e, t, r) {
            let s = new nB(t);
            return (
              s._run(() =>
                s._createOrRetrieveResponse(e, t, {
                  ...r,
                  headers: {
                    ...r?.headers,
                    "X-Stainless-Helper-Method": "stream",
                  },
                }),
              ),
              s
            );
          }
          async _createOrRetrieveResponse(e, t, r) {
            let s,
              n = r?.signal;
            n &&
              (n.aborted && this.controller.abort(),
              n.addEventListener("abort", () => this.controller.abort())),
              nF(this, eH, "m", eK).call(this);
            let i = null;
            for await (let n of ("response_id" in t
              ? ((s = await e.responses.retrieve(
                  t.response_id,
                  { stream: !0 },
                  { ...r, signal: this.controller.signal, stream: !0 },
                )),
                (i = t.starting_after ?? null))
              : (s = await e.responses.create(
                  { ...t, stream: !0 },
                  { ...r, signal: this.controller.signal },
                )),
            this._connected(),
            s))
              nF(this, eH, "m", eY).call(this, n, i);
            if (s.controller.signal?.aborted) throw new rc();
            return nF(this, eH, "m", eG).call(this);
          }
          [((eJ = new WeakMap()),
          (eX = new WeakMap()),
          (eV = new WeakMap()),
          (eH = new WeakSet()),
          (eK = function () {
            this.ended || nN(this, eX, void 0, "f");
          }),
          (eY = function (e, t) {
            if (this.ended) return;
            let r = (e, r) => {
                (null == t || r.sequence_number > t) && this._emit(e, r);
              },
              s = nF(this, eH, "m", eQ).call(this, e);
            switch ((r("event", e), e.type)) {
              case "response.output_text.delta": {
                let t = s.output[e.output_index];
                if (!t)
                  throw new ra(`missing output at index ${e.output_index}`);
                if ("message" === t.type) {
                  let s = t.content[e.content_index];
                  if (!s)
                    throw new ra(`missing content at index ${e.content_index}`);
                  if ("output_text" !== s.type)
                    throw new ra(
                      `expected content to be 'output_text', got ${s.type}`,
                    );
                  r("response.output_text.delta", { ...e, snapshot: s.text });
                }
                break;
              }
              case "response.function_call_arguments.delta": {
                let t = s.output[e.output_index];
                if (!t)
                  throw new ra(`missing output at index ${e.output_index}`);
                "function_call" === t.type &&
                  r("response.function_call_arguments.delta", {
                    ...e,
                    snapshot: t.arguments,
                  });
                break;
              }
              default:
                r(e.type, e);
            }
          }),
          (eG = function () {
            if (this.ended)
              throw new ra("stream has ended, this shouldn't happen");
            let e = nF(this, eX, "f");
            if (!e) throw new ra("request ended without sending any events");
            nN(this, eX, void 0, "f");
            let t = (function (e, t) {
              var r;
              return t && ((r = t), s9(r.text?.format))
                ? nz(e, t)
                : {
                    ...e,
                    output_parsed: null,
                    output: e.output.map((e) =>
                      "function_call" === e.type
                        ? { ...e, parsed_arguments: null }
                        : "message" === e.type
                          ? {
                              ...e,
                              content: e.content.map((e) => ({
                                ...e,
                                parsed: null,
                              })),
                            }
                          : e,
                    ),
                  };
            })(e, nF(this, eJ, "f"));
            return nN(this, eV, t, "f"), t;
          }),
          (eQ = function (e) {
            let t = nF(this, eX, "f");
            if (!t) {
              if ("response.created" !== e.type)
                throw new ra(
                  `When snapshot hasn't been set yet, expected 'response.created' event, got ${e.type}`,
                );
              return nN(this, eX, e.response, "f");
            }
            switch (e.type) {
              case "response.output_item.added":
                t.output.push(e.item);
                break;
              case "response.content_part.added": {
                let r = t.output[e.output_index];
                if (!r)
                  throw new ra(`missing output at index ${e.output_index}`);
                "message" === r.type && r.content.push(e.part);
                break;
              }
              case "response.output_text.delta": {
                let r = t.output[e.output_index];
                if (!r)
                  throw new ra(`missing output at index ${e.output_index}`);
                if ("message" === r.type) {
                  let t = r.content[e.content_index];
                  if (!t)
                    throw new ra(`missing content at index ${e.content_index}`);
                  if ("output_text" !== t.type)
                    throw new ra(
                      `expected content to be 'output_text', got ${t.type}`,
                    );
                  t.text += e.delta;
                }
                break;
              }
              case "response.function_call_arguments.delta": {
                let r = t.output[e.output_index];
                if (!r)
                  throw new ra(`missing output at index ${e.output_index}`);
                "function_call" === r.type && (r.arguments += e.delta);
                break;
              }
              case "response.completed":
                nN(this, eX, e.response, "f");
            }
            return t;
          }),
          Symbol.asyncIterator)]() {
            let e = [],
              t = [],
              r = !1;
            return (
              this.on("event", (r) => {
                let s = t.shift();
                s ? s.resolve(r) : e.push(r);
              }),
              this.on("end", () => {
                for (let e of ((r = !0), t)) e.resolve(void 0);
                t.length = 0;
              }),
              this.on("abort", (e) => {
                for (let s of ((r = !0), t)) s.reject(e);
                t.length = 0;
              }),
              this.on("error", (e) => {
                for (let s of ((r = !0), t)) s.reject(e);
                t.length = 0;
              }),
              {
                next: async () =>
                  e.length
                    ? { value: e.shift(), done: !1 }
                    : r
                      ? { value: void 0, done: !0 }
                      : new Promise((e, r) =>
                          t.push({ resolve: e, reject: r }),
                        ).then((e) =>
                          e
                            ? { value: e, done: !1 }
                            : { value: void 0, done: !0 },
                        ),
                return: async () => (this.abort(), { value: void 0, done: !0 }),
              }
            );
          }
          async finalResponse() {
            await this.done();
            let e = nF(this, eV, "f");
            if (!e)
              throw new ra("stream ended without producing a ChatCompletion");
            return e;
          }
        }
        class nD extends sd {
          constructor() {
            super(...arguments), (this.inputItems = new nq(this._client));
          }
          create(e, t) {
            return this._client
              .post("/responses", { body: e, ...t, stream: e.stream ?? !1 })
              ._thenUnwrap(
                (e) => ("object" in e && "response" === e.object && nM(e), e),
              );
          }
          retrieve(e, t = {}, r) {
            return this._client.get(`/responses/${e}`, {
              query: t,
              ...r,
              stream: t?.stream ?? !1,
            });
          }
          del(e, t) {
            return this._client.delete(`/responses/${e}`, {
              ...t,
              headers: { Accept: "*/*", ...t?.headers },
            });
          }
          parse(e, t) {
            return this._client.responses
              .create(e, t)
              ._thenUnwrap((t) => nz(t, e));
          }
          stream(e, t) {
            return nB.createResponse(this._client, e, t);
          }
          cancel(e, t) {
            return this._client.post(`/responses/${e}/cancel`, {
              ...t,
              headers: { Accept: "*/*", ...t?.headers },
            });
          }
        }
        class nW extends sg {}
        nD.InputItems = nq;
        class nU extends sd {
          retrieve(e, t, r, s) {
            return this._client.get(
              `/evals/${e}/runs/${t}/output_items/${r}`,
              s,
            );
          }
          list(e, t, r = {}, s) {
            return rZ(r)
              ? this.list(e, t, {}, r)
              : this._client.getAPIList(
                  `/evals/${e}/runs/${t}/output_items`,
                  nH,
                  { query: r, ...s },
                );
          }
        }
        class nH extends sg {}
        nU.OutputItemListResponsesPage = nH;
        class nJ extends sd {
          constructor() {
            super(...arguments), (this.outputItems = new nU(this._client));
          }
          create(e, t, r) {
            return this._client.post(`/evals/${e}/runs`, { body: t, ...r });
          }
          retrieve(e, t, r) {
            return this._client.get(`/evals/${e}/runs/${t}`, r);
          }
          list(e, t = {}, r) {
            return rZ(t)
              ? this.list(e, {}, t)
              : this._client.getAPIList(`/evals/${e}/runs`, nX, {
                  query: t,
                  ...r,
                });
          }
          del(e, t, r) {
            return this._client.delete(`/evals/${e}/runs/${t}`, r);
          }
          cancel(e, t, r) {
            return this._client.post(`/evals/${e}/runs/${t}`, r);
          }
        }
        class nX extends sg {}
        (nJ.RunListResponsesPage = nX),
          (nJ.OutputItems = nU),
          (nJ.OutputItemListResponsesPage = nH);
        class nV extends sd {
          constructor() {
            super(...arguments), (this.runs = new nJ(this._client));
          }
          create(e, t) {
            return this._client.post("/evals", { body: e, ...t });
          }
          retrieve(e, t) {
            return this._client.get(`/evals/${e}`, t);
          }
          update(e, t, r) {
            return this._client.post(`/evals/${e}`, { body: t, ...r });
          }
          list(e = {}, t) {
            return rZ(e)
              ? this.list({}, e)
              : this._client.getAPIList("/evals", nK, { query: e, ...t });
          }
          del(e, t) {
            return this._client.delete(`/evals/${e}`, t);
          }
        }
        class nK extends sg {}
        (nV.EvalListResponsesPage = nK),
          (nV.Runs = nJ),
          (nV.RunListResponsesPage = nX);
        class nY extends sd {
          retrieve(e, t, r) {
            return this._client.get(`/containers/${e}/files/${t}/content`, {
              ...r,
              headers: { Accept: "application/binary", ...r?.headers },
              __binaryResponse: !0,
            });
          }
        }
        class nG extends sd {
          constructor() {
            super(...arguments), (this.content = new nY(this._client));
          }
          create(e, t, r) {
            return this._client.post(
              `/containers/${e}/files`,
              rN({ body: t, ...r }),
            );
          }
          retrieve(e, t, r) {
            return this._client.get(`/containers/${e}/files/${t}`, r);
          }
          list(e, t = {}, r) {
            return rZ(t)
              ? this.list(e, {}, t)
              : this._client.getAPIList(`/containers/${e}/files`, nQ, {
                  query: t,
                  ...r,
                });
          }
          del(e, t, r) {
            return this._client.delete(`/containers/${e}/files/${t}`, {
              ...r,
              headers: { Accept: "*/*", ...r?.headers },
            });
          }
        }
        class nQ extends sg {}
        (nG.FileListResponsesPage = nQ), (nG.Content = nY);
        class nZ extends sd {
          constructor() {
            super(...arguments), (this.files = new nG(this._client));
          }
          create(e, t) {
            return this._client.post("/containers", { body: e, ...t });
          }
          retrieve(e, t) {
            return this._client.get(`/containers/${e}`, t);
          }
          list(e = {}, t) {
            return rZ(e)
              ? this.list({}, e)
              : this._client.getAPIList("/containers", n0, { query: e, ...t });
          }
          del(e, t) {
            return this._client.delete(`/containers/${e}`, {
              ...t,
              headers: { Accept: "*/*", ...t?.headers },
            });
          }
        }
        class n0 extends sg {}
        (nZ.ContainerListResponsesPage = n0),
          (nZ.Files = nG),
          (nZ.FileListResponsesPage = nQ);
        class n1 extends rV {
          constructor({
            baseURL: e = se("OPENAI_BASE_URL"),
            apiKey: t = se("OPENAI_API_KEY"),
            organization: r = se("OPENAI_ORG_ID") ?? null,
            project: s = se("OPENAI_PROJECT_ID") ?? null,
            ...n
          } = {}) {
            if (void 0 === t)
              throw new ra(
                "The OPENAI_API_KEY environment variable is missing or empty; either provide it, or instantiate the OpenAI client with an apiKey option, like new OpenAI({ apiKey: 'My API Key' }).",
              );
            let i = {
              apiKey: t,
              organization: r,
              project: s,
              ...n,
              baseURL: e || "https://api.openai.com/v1",
            };
            if (!i.dangerouslyAllowBrowser && sa())
              throw new ra(
                "It looks like you're running in a browser-like environment.\n\nThis is disabled by default, as it risks exposing your secret API credentials to attackers.\nIf you understand the risks and have appropriate mitigations in place,\nyou can set the `dangerouslyAllowBrowser` option to `true`, e.g.,\n\nnew OpenAI({ apiKey, dangerouslyAllowBrowser: true });\n\nhttps://help.openai.com/en/articles/5112595-best-practices-for-api-key-safety\n",
              );
            super({
              baseURL: i.baseURL,
              timeout: i.timeout ?? 6e5,
              httpAgent: i.httpAgent,
              maxRetries: i.maxRetries,
              fetch: i.fetch,
            }),
              (this.completions = new sp(this)),
              (this.chat = new s_(this)),
              (this.embeddings = new sv(this)),
              (this.files = new sx(this)),
              (this.images = new sT(this)),
              (this.audio = new sR(this)),
              (this.moderations = new sk(this)),
              (this.models = new sC(this)),
              (this.fineTuning = new sW(this)),
              (this.graders = new sH(this)),
              (this.vectorStores = new sG(this)),
              (this.beta = new nP(this)),
              (this.batches = new nL(this)),
              (this.uploads = new nj(this)),
              (this.responses = new nD(this)),
              (this.evals = new nV(this)),
              (this.containers = new nZ(this)),
              (this._options = i),
              (this.apiKey = t),
              (this.organization = r),
              (this.project = s);
          }
          defaultQuery() {
            return this._options.defaultQuery;
          }
          defaultHeaders(e) {
            return {
              ...super.defaultHeaders(e),
              "OpenAI-Organization": this.organization,
              "OpenAI-Project": this.project,
              ...this._options.defaultHeaders,
            };
          }
          authHeaders(e) {
            return { Authorization: `Bearer ${this.apiKey}` };
          }
          stringifyQuery(e) {
            return (function (e, t = {}) {
              let r,
                s,
                n = e,
                i = (function (e = E) {
                  let t;
                  if (
                    void 0 !== e.allowEmptyArrays &&
                    "boolean" != typeof e.allowEmptyArrays
                  )
                    throw TypeError(
                      "`allowEmptyArrays` option can only be `true` or `false`, when provided",
                    );
                  if (
                    void 0 !== e.encodeDotInKeys &&
                    "boolean" != typeof e.encodeDotInKeys
                  )
                    throw TypeError(
                      "`encodeDotInKeys` option can only be `true` or `false`, when provided",
                    );
                  if (
                    null !== e.encoder &&
                    void 0 !== e.encoder &&
                    "function" != typeof e.encoder
                  )
                    throw TypeError("Encoder has to be a function.");
                  let r = e.charset || E.charset;
                  if (
                    void 0 !== e.charset &&
                    "utf-8" !== e.charset &&
                    "iso-8859-1" !== e.charset
                  )
                    throw TypeError(
                      "The charset option must be either utf-8, iso-8859-1, or undefined",
                    );
                  let s = f;
                  if (void 0 !== e.format) {
                    if (!w.call(m, e.format))
                      throw TypeError("Unknown format option provided.");
                    s = e.format;
                  }
                  let n = m[s],
                    i = E.filter;
                  if (
                    (("function" == typeof e.filter || v(e.filter)) &&
                      (i = e.filter),
                    (t =
                      e.arrayFormat && e.arrayFormat in _
                        ? e.arrayFormat
                        : "indices" in e
                          ? e.indices
                            ? "indices"
                            : "repeat"
                          : E.arrayFormat),
                    "commaRoundTrip" in e &&
                      "boolean" != typeof e.commaRoundTrip)
                  )
                    throw TypeError(
                      "`commaRoundTrip` must be a boolean, or absent",
                    );
                  let o =
                    void 0 === e.allowDots
                      ? !0 == !!e.encodeDotInKeys || E.allowDots
                      : !!e.allowDots;
                  return {
                    addQueryPrefix:
                      "boolean" == typeof e.addQueryPrefix
                        ? e.addQueryPrefix
                        : E.addQueryPrefix,
                    allowDots: o,
                    allowEmptyArrays:
                      "boolean" == typeof e.allowEmptyArrays
                        ? !!e.allowEmptyArrays
                        : E.allowEmptyArrays,
                    arrayFormat: t,
                    charset: r,
                    charsetSentinel:
                      "boolean" == typeof e.charsetSentinel
                        ? e.charsetSentinel
                        : E.charsetSentinel,
                    commaRoundTrip: !!e.commaRoundTrip,
                    delimiter:
                      void 0 === e.delimiter ? E.delimiter : e.delimiter,
                    encode: "boolean" == typeof e.encode ? e.encode : E.encode,
                    encodeDotInKeys:
                      "boolean" == typeof e.encodeDotInKeys
                        ? e.encodeDotInKeys
                        : E.encodeDotInKeys,
                    encoder:
                      "function" == typeof e.encoder ? e.encoder : E.encoder,
                    encodeValuesOnly:
                      "boolean" == typeof e.encodeValuesOnly
                        ? e.encodeValuesOnly
                        : E.encodeValuesOnly,
                    filter: i,
                    format: s,
                    formatter: n,
                    serializeDate:
                      "function" == typeof e.serializeDate
                        ? e.serializeDate
                        : E.serializeDate,
                    skipNulls:
                      "boolean" == typeof e.skipNulls
                        ? e.skipNulls
                        : E.skipNulls,
                    sort: "function" == typeof e.sort ? e.sort : null,
                    strictNullHandling:
                      "boolean" == typeof e.strictNullHandling
                        ? e.strictNullHandling
                        : E.strictNullHandling,
                  };
                })(t);
              "function" == typeof i.filter
                ? (n = (0, i.filter)("", n))
                : v(i.filter) && (r = i.filter);
              let o = [];
              if ("object" != typeof n || null === n) return "";
              let a = _[i.arrayFormat],
                l = "comma" === a && i.commaRoundTrip;
              r || (r = Object.keys(n)), i.sort && r.sort(i.sort);
              let c = new WeakMap();
              for (let e = 0; e < r.length; ++e) {
                let t = r[e];
                (i.skipNulls && null === n[t]) ||
                  S(
                    o,
                    (function e(
                      t,
                      r,
                      s,
                      n,
                      i,
                      o,
                      a,
                      l,
                      c,
                      h,
                      u,
                      d,
                      p,
                      f,
                      m,
                      g,
                      y,
                      w,
                    ) {
                      var _, x;
                      let T,
                        A = t,
                        R = w,
                        k = 0,
                        C = !1;
                      for (; void 0 !== (R = R.get(O)) && !C; ) {
                        let e = R.get(t);
                        if (((k += 1), void 0 !== e))
                          if (e === k) throw RangeError("Cyclic object value");
                          else C = !0;
                        void 0 === R.get(O) && (k = 0);
                      }
                      if (
                        ("function" == typeof h
                          ? (A = h(r, A))
                          : A instanceof Date
                            ? (A = p?.(A))
                            : "comma" === s &&
                              v(A) &&
                              (A = b(A, function (e) {
                                return e instanceof Date ? p?.(e) : e;
                              })),
                        null === A)
                      ) {
                        if (o)
                          return c && !g ? c(r, E.encoder, y, "key", f) : r;
                        A = "";
                      }
                      if (
                        "string" == typeof (_ = A) ||
                        "number" == typeof _ ||
                        "boolean" == typeof _ ||
                        "symbol" == typeof _ ||
                        "bigint" == typeof _ ||
                        ((x = A) &&
                          "object" == typeof x &&
                          x.constructor &&
                          x.constructor.isBuffer &&
                          x.constructor.isBuffer(x))
                      ) {
                        if (c) {
                          let e = g ? r : c(r, E.encoder, y, "key", f);
                          return [
                            m?.(e) + "=" + m?.(c(A, E.encoder, y, "value", f)),
                          ];
                        }
                        return [m?.(r) + "=" + m?.(String(A))];
                      }
                      let P = [];
                      if (void 0 === A) return P;
                      if ("comma" === s && v(A))
                        g && c && (A = b(A, c)),
                          (T = [
                            {
                              value:
                                A.length > 0 ? A.join(",") || null : void 0,
                            },
                          ]);
                      else if (v(h)) T = h;
                      else {
                        let e = Object.keys(A);
                        T = u ? e.sort(u) : e;
                      }
                      let L = l ? String(r).replace(/\./g, "%2E") : String(r),
                        I = n && v(A) && 1 === A.length ? L + "[]" : L;
                      if (i && v(A) && 0 === A.length) return I + "[]";
                      for (let r = 0; r < T.length; ++r) {
                        let b = T[r],
                          _ =
                            "object" == typeof b && void 0 !== b.value
                              ? b.value
                              : A[b];
                        if (a && null === _) continue;
                        let x = d && l ? b.replace(/\./g, "%2E") : b,
                          E = v(A)
                            ? "function" == typeof s
                              ? s(I, x)
                              : I
                            : I + (d ? "." + x : "[" + x + "]");
                        w.set(t, k);
                        let R = new WeakMap();
                        R.set(O, w),
                          S(
                            P,
                            e(
                              _,
                              E,
                              s,
                              n,
                              i,
                              o,
                              a,
                              l,
                              "comma" === s && g && v(A) ? null : c,
                              h,
                              u,
                              d,
                              p,
                              f,
                              m,
                              g,
                              y,
                              R,
                            ),
                          );
                      }
                      return P;
                    })(
                      n[t],
                      t,
                      a,
                      l,
                      i.allowEmptyArrays,
                      i.strictNullHandling,
                      i.skipNulls,
                      i.encodeDotInKeys,
                      i.encode ? i.encoder : null,
                      i.filter,
                      i.sort,
                      i.allowDots,
                      i.serializeDate,
                      i.format,
                      i.formatter,
                      i.encodeValuesOnly,
                      i.charset,
                      c,
                    ),
                  );
              }
              let h = o.join(i.delimiter),
                u = !0 === i.addQueryPrefix ? "?" : "";
              return (
                i.charsetSentinel &&
                  ("iso-8859-1" === i.charset
                    ? (u += "utf8=%26%2310003%3B&")
                    : (u += "utf8=%E2%9C%93&")),
                h.length > 0 ? u + h : ""
              );
            })(e, { arrayFormat: "brackets" });
          }
        }
        (n1.OpenAI = n1),
          (n1.DEFAULT_TIMEOUT = 6e5),
          (n1.OpenAIError = ra),
          (n1.APIError = rl),
          (n1.APIConnectionError = rh),
          (n1.APIConnectionTimeoutError = ru),
          (n1.APIUserAbortError = rc),
          (n1.NotFoundError = rm),
          (n1.ConflictError = rg),
          (n1.RateLimitError = rb),
          (n1.BadRequestError = rd),
          (n1.AuthenticationError = rp),
          (n1.InternalServerError = rw),
          (n1.PermissionDeniedError = rf),
          (n1.UnprocessableEntityError = ry),
          (n1.toFile = r$),
          (n1.fileFromPath = d),
          (n1.Completions = sp),
          (n1.Chat = s_),
          (n1.ChatCompletionsPage = sb),
          (n1.Embeddings = sv),
          (n1.Files = sx),
          (n1.FileObjectsPage = sS),
          (n1.Images = sT),
          (n1.Audio = sR),
          (n1.Moderations = sk),
          (n1.Models = sC),
          (n1.ModelsPage = sP),
          (n1.FineTuning = sW),
          (n1.Graders = sH),
          (n1.VectorStores = sG),
          (n1.VectorStoresPage = sQ),
          (n1.VectorStoreSearchResponsesPage = sZ),
          (n1.Beta = nP),
          (n1.Batches = nL),
          (n1.BatchesPage = nI),
          (n1.Uploads = nj),
          (n1.Responses = nD),
          (n1.Evals = nV),
          (n1.EvalListResponsesPage = nK),
          (n1.Containers = nZ),
          (n1.ContainerListResponsesPage = n0);
        var n2 = r(77598);
        let n3 = n2.webcrypto?.subtle || {};
        var n8 = Object.defineProperty;
        ((e, t) => {
          for (var r in t) n8(e, r, { get: t[r], enumerable: !0 });
        })({}, { UpstashError: () => n5, UrlError: () => n4 });
        var n5 = class extends Error {
            constructor(e) {
              super(e), (this.name = "UpstashError");
            }
          },
          n4 = class extends Error {
            constructor(e) {
              super(
                `Upstash Redis client was passed an invalid URL. You should pass a URL starting with https. Received: "${e}". `,
              ),
                (this.name = "UrlError");
            }
          };
        function n6(e) {
          try {
            return (function e(t) {
              let r = Array.isArray(t)
                ? t.map((t) => {
                    try {
                      return e(t);
                    } catch {
                      return t;
                    }
                  })
                : JSON.parse(t);
              return "number" == typeof r && r.toString() !== t ? t : r;
            })(e);
          } catch {
            return e;
          }
        }
        function n7(e) {
          return [e[0], ...n6(e.slice(1))];
        }
        function n9(e) {
          let [t, r] = e,
            s = [];
          for (let e = 0; e < r.length; e += 2)
            s.push({ key: r[e], type: r[e + 1] });
          return [t, s];
        }
        var ie = class {
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
              throw new n4(this.baseUrl);
            (this.headers = {
              "Content-Type": "application/json",
              ...e.headers,
            }),
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
            (this.headers = is(
              this.headers,
              "Upstash-Telemetry-Runtime",
              e.runtime,
            )),
              (this.headers = is(
                this.headers,
                "Upstash-Telemetry-Platform",
                e.platform,
              )),
              (this.headers = is(this.headers, "Upstash-Telemetry-Sdk", e.sdk));
          }
          async request(e) {
            let t = (function (...e) {
                let t = {};
                for (let r of e)
                  if (r)
                    for (let [e, s] of Object.entries(r))
                      null != s && (t[e] = s);
                return t;
              })(this.headers, e.headers ?? {}),
              r = [this.baseUrl, ...(e.path ?? [])].join("/"),
              s = "text/event-stream" === t.Accept,
              n = {
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
            let i = null,
              o = null;
            for (let e = 0; e <= this.retry.attempts; e++)
              try {
                i = await fetch(r, n);
                break;
              } catch (t) {
                if (this.options.signal?.aborted) {
                  i = new Response(
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
            if (!i) throw o ?? Error("Exhausted all retries");
            if (!i.ok) {
              let t = await i.json();
              throw new n5(
                `${t.error}, command was: ${JSON.stringify(e.body)}`,
              );
            }
            if (this.readYourWrites) {
              let e = i.headers;
              this.upstashSyncToken = e.get("upstash-sync-token") ?? "";
            }
            if (s && e && e.onMessage && i.body) {
              let t = i.body.getReader(),
                r = new TextDecoder();
              return (
                (async () => {
                  try {
                    for (;;) {
                      let { value: s, done: n } = await t.read();
                      if (n) break;
                      for (let t of r.decode(s).split("\n"))
                        if (t.startsWith("data: ")) {
                          let r = t.slice(6);
                          e.onMessage?.(r);
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
            let a = await i.json();
            if (this.readYourWrites) {
              let e = i.headers;
              this.upstashSyncToken = e.get("upstash-sync-token") ?? "";
            }
            return "base64" === this.options.responseEncoding
              ? Array.isArray(a)
                ? a.map(({ result: e, error: t }) => ({
                    result: ir(e),
                    error: t,
                  }))
                : { result: ir(a.result), error: a.error }
              : a;
          }
        };
        function it(e) {
          let t = "";
          try {
            let r = atob(e),
              s = r.length,
              n = new Uint8Array(s);
            for (let e = 0; e < s; e++) n[e] = r.charCodeAt(e);
            t = new TextDecoder().decode(n);
          } catch {
            t = e;
          }
          return t;
        }
        function ir(e) {
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
                      ? it(e)
                      : Array.isArray(e)
                        ? e.map((e) => ir(e))
                        : e,
                  )
                : null;
              break;
            case "string":
              t = "OK" === e ? "OK" : it(e);
          }
          return t;
        }
        function is(e, t, r) {
          return r && (e[t] = e[t] ? [e[t], r].join(",") : r), e;
        }
        var ii = (e) => {
            switch (typeof e) {
              case "string":
              case "number":
              case "boolean":
                return e;
              default:
                return JSON.stringify(e);
            }
          },
          io = class {
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
                ((this.serialize = ii),
                (this.deserialize =
                  t?.automaticDeserialization === void 0 ||
                  t.automaticDeserialization
                    ? (t?.deserialize ?? n6)
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
                  let r = performance.now(),
                    s = await e(t),
                    n = (performance.now() - r).toFixed(2);
                  return (
                    console.log(
                      `Latency for \x1b[38;2;19;185;39m${this.command[0].toString().toUpperCase()}\x1b[0m: \x1b[38;2;0;255;255m${n} ms\x1b[0m`,
                    ),
                    s
                  );
                };
              }
            }
            async exec(e) {
              let { result: t, error: r } = await e.request({
                body: this.command,
                path: this.path,
                upstashSyncToken: e.upstashSyncToken,
                headers: this.headers,
                onMessage: this.onMessage,
                isStreaming: this.isStreaming,
                signal: this.signal,
              });
              if (r) throw new n5(r);
              if (void 0 === t)
                throw TypeError("Request did not return a result");
              return this.deserialize(t);
            }
          },
          ia = class extends io {
            constructor(e, t) {
              let r = ["hrandfield", e[0]];
              "number" == typeof e[1] && r.push(e[1]),
                e[2] && r.push("WITHVALUES"),
                super(r, {
                  deserialize: e[2]
                    ? (e) =>
                        (function (e) {
                          if (0 === e.length) return null;
                          let t = {};
                          for (let r = 0; r < e.length; r += 2) {
                            let s = e[r],
                              n = e[r + 1];
                            try {
                              t[s] = JSON.parse(n);
                            } catch {
                              t[s] = n;
                            }
                          }
                          return t;
                        })(e)
                    : t?.deserialize,
                  ...t,
                });
            }
          },
          il = class extends io {
            constructor(e, t) {
              super(["append", ...e], t);
            }
          },
          ic = class extends io {
            constructor([e, t, r], s) {
              let n = ["bitcount", e];
              "number" == typeof t && n.push(t),
                "number" == typeof r && n.push(r),
                super(n, s);
            }
          },
          ih = class {
            constructor(e, t, r, s = (e) => e.exec(this.client)) {
              (this.client = t),
                (this.opts = r),
                (this.execOperation = s),
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
              let e = new io(this.command, this.opts);
              return this.execOperation(e);
            }
          },
          iu = class extends io {
            constructor(e, t) {
              super(["bitop", ...e], t);
            }
          },
          id = class extends io {
            constructor(e, t) {
              super(["bitpos", ...e], t);
            }
          },
          ip = class extends io {
            constructor([e, t, r], s) {
              super(["COPY", e, t, ...(r?.replace ? ["REPLACE"] : [])], {
                ...s,
                deserialize: (e) => (e > 0 ? "COPIED" : "NOT_COPIED"),
              });
            }
          },
          im = class extends io {
            constructor(e) {
              super(["dbsize"], e);
            }
          },
          ig = class extends io {
            constructor(e, t) {
              super(["decr", ...e], t);
            }
          },
          iy = class extends io {
            constructor(e, t) {
              super(["decrby", ...e], t);
            }
          },
          ib = class extends io {
            constructor(e, t) {
              super(["del", ...e], t);
            }
          },
          iw = class extends io {
            constructor(e, t) {
              super(["echo", ...e], t);
            }
          },
          i_ = class extends io {
            constructor([e, t, r], s) {
              super(["eval_ro", e, t.length, ...t, ...(r ?? [])], s);
            }
          },
          iv = class extends io {
            constructor([e, t, r], s) {
              super(["eval", e, t.length, ...t, ...(r ?? [])], s);
            }
          },
          ix = class extends io {
            constructor([e, t, r], s) {
              super(["evalsha_ro", e, t.length, ...t, ...(r ?? [])], s);
            }
          },
          iS = class extends io {
            constructor([e, t, r], s) {
              super(["evalsha", e, t.length, ...t, ...(r ?? [])], s);
            }
          },
          iT = class extends io {
            constructor(e, t) {
              super(
                e.map((e) => ("string" == typeof e ? e : String(e))),
                t,
              );
            }
          },
          iE = class extends io {
            constructor(e, t) {
              super(["exists", ...e], t);
            }
          },
          iO = class extends io {
            constructor(e, t) {
              super(["expire", ...e.filter(Boolean)], t);
            }
          },
          iA = class extends io {
            constructor(e, t) {
              super(["expireat", ...e], t);
            }
          },
          iR = class extends io {
            constructor(e, t) {
              let r = ["flushall"];
              e && e.length > 0 && e[0].async && r.push("async"), super(r, t);
            }
          },
          ik = class extends io {
            constructor([e], t) {
              let r = ["flushdb"];
              e?.async && r.push("async"), super(r, t);
            }
          },
          iC = class extends io {
            constructor([e, t, ...r], s) {
              let n = ["geoadd", e];
              "nx" in t && t.nx
                ? n.push("nx")
                : "xx" in t && t.xx && n.push("xx"),
                "ch" in t && t.ch && n.push("ch"),
                "latitude" in t &&
                  t.latitude &&
                  n.push(t.longitude, t.latitude, t.member),
                n.push(
                  ...r.flatMap(({ latitude: e, longitude: t, member: r }) => [
                    t,
                    e,
                    r,
                  ]),
                ),
                super(n, s);
            }
          },
          iP = class extends io {
            constructor([e, t, r, s = "M"], n) {
              super(["GEODIST", e, t, r, s], n);
            }
          },
          iL = class extends io {
            constructor(e, t) {
              let [r] = e;
              super(
                ["GEOHASH", r, ...(Array.isArray(e[1]) ? e[1] : e.slice(1))],
                t,
              );
            }
          },
          iI = class extends io {
            constructor(e, t) {
              let [r] = e;
              super(
                ["GEOPOS", r, ...(Array.isArray(e[1]) ? e[1] : e.slice(1))],
                {
                  deserialize: (e) =>
                    (function (e) {
                      let t = [];
                      for (let r of e)
                        r?.[0] &&
                          r?.[1] &&
                          t.push({
                            lng: Number.parseFloat(r[0]),
                            lat: Number.parseFloat(r[1]),
                          });
                      return t;
                    })(e),
                  ...t,
                },
              );
            }
          },
          i$ = class extends io {
            constructor([e, t, r, s, n], i) {
              let o = ["GEOSEARCH", e];
              ("FROMMEMBER" === t.type || "frommember" === t.type) &&
                o.push(t.type, t.member),
                ("FROMLONLAT" === t.type || "fromlonlat" === t.type) &&
                  o.push(t.type, t.coordinate.lon, t.coordinate.lat),
                ("BYRADIUS" === r.type || "byradius" === r.type) &&
                  o.push(r.type, r.radius, r.radiusType),
                ("BYBOX" === r.type || "bybox" === r.type) &&
                  o.push(r.type, r.rect.width, r.rect.height, r.rectType),
                o.push(s),
                n?.count &&
                  o.push(
                    "COUNT",
                    n.count.limit,
                    ...(n.count.any ? ["ANY"] : []),
                  ),
                super(
                  [
                    ...o,
                    ...(n?.withCoord ? ["WITHCOORD"] : []),
                    ...(n?.withDist ? ["WITHDIST"] : []),
                    ...(n?.withHash ? ["WITHHASH"] : []),
                  ],
                  {
                    deserialize: (e) =>
                      n?.withCoord || n?.withDist || n?.withHash
                        ? e.map((e) => {
                            let t = 1,
                              r = {};
                            try {
                              r.member = JSON.parse(e[0]);
                            } catch {
                              r.member = e[0];
                            }
                            return (
                              n.withDist &&
                                (r.dist = Number.parseFloat(e[t++])),
                              n.withHash && (r.hash = e[t++].toString()),
                              n.withCoord &&
                                (r.coord = {
                                  long: Number.parseFloat(e[t][0]),
                                  lat: Number.parseFloat(e[t][1]),
                                }),
                              r
                            );
                          })
                        : e.map((e) => {
                            try {
                              return { member: JSON.parse(e) };
                            } catch {
                              return { member: e };
                            }
                          }),
                    ...i,
                  },
                );
            }
          },
          ij = class extends io {
            constructor([e, t, r, s, n, i], o) {
              let a = ["GEOSEARCHSTORE", e, t];
              ("FROMMEMBER" === r.type || "frommember" === r.type) &&
                a.push(r.type, r.member),
                ("FROMLONLAT" === r.type || "fromlonlat" === r.type) &&
                  a.push(r.type, r.coordinate.lon, r.coordinate.lat),
                ("BYRADIUS" === s.type || "byradius" === s.type) &&
                  a.push(s.type, s.radius, s.radiusType),
                ("BYBOX" === s.type || "bybox" === s.type) &&
                  a.push(s.type, s.rect.width, s.rect.height, s.rectType),
                a.push(n),
                i?.count &&
                  a.push(
                    "COUNT",
                    i.count.limit,
                    ...(i.count.any ? ["ANY"] : []),
                  ),
                super([...a, ...(i?.storeDist ? ["STOREDIST"] : [])], o);
            }
          },
          iz = class extends io {
            constructor(e, t) {
              super(["get", ...e], t);
            }
          },
          iM = class extends io {
            constructor(e, t) {
              super(["getbit", ...e], t);
            }
          },
          iq = class extends io {
            constructor(e, t) {
              super(["getdel", ...e], t);
            }
          },
          iN = class extends io {
            constructor([e, t], r) {
              let s = ["getex", e];
              t &&
                ("ex" in t && "number" == typeof t.ex
                  ? s.push("ex", t.ex)
                  : "px" in t && "number" == typeof t.px
                    ? s.push("px", t.px)
                    : "exat" in t && "number" == typeof t.exat
                      ? s.push("exat", t.exat)
                      : "pxat" in t && "number" == typeof t.pxat
                        ? s.push("pxat", t.pxat)
                        : "persist" in t && t.persist && s.push("persist")),
                super(s, r);
            }
          },
          iF = class extends io {
            constructor(e, t) {
              super(["getrange", ...e], t);
            }
          },
          iB = class extends io {
            constructor(e, t) {
              super(["getset", ...e], t);
            }
          },
          iD = class extends io {
            constructor(e, t) {
              super(["hdel", ...e], t);
            }
          },
          iW = class extends io {
            constructor(e, t) {
              super(["hexists", ...e], t);
            }
          },
          iU = class extends io {
            constructor(e, t) {
              let [r, s, n, i] = e,
                o = Array.isArray(s) ? s : [s];
              super(
                ["hexpire", r, n, ...(i ? [i] : []), "FIELDS", o.length, ...o],
                t,
              );
            }
          },
          iH = class extends io {
            constructor(e, t) {
              let [r, s, n, i] = e,
                o = Array.isArray(s) ? s : [s];
              super(
                [
                  "hexpireat",
                  r,
                  n,
                  ...(i ? [i] : []),
                  "FIELDS",
                  o.length,
                  ...o,
                ],
                t,
              );
            }
          },
          iJ = class extends io {
            constructor(e, t) {
              let [r, s] = e,
                n = Array.isArray(s) ? s : [s];
              super(["hexpiretime", r, "FIELDS", n.length, ...n], t);
            }
          },
          iX = class extends io {
            constructor(e, t) {
              let [r, s] = e,
                n = Array.isArray(s) ? s : [s];
              super(["hpersist", r, "FIELDS", n.length, ...n], t);
            }
          },
          iV = class extends io {
            constructor(e, t) {
              let [r, s, n, i] = e,
                o = Array.isArray(s) ? s : [s];
              super(
                ["hpexpire", r, n, ...(i ? [i] : []), "FIELDS", o.length, ...o],
                t,
              );
            }
          },
          iK = class extends io {
            constructor(e, t) {
              let [r, s, n, i] = e,
                o = Array.isArray(s) ? s : [s];
              super(
                [
                  "hpexpireat",
                  r,
                  n,
                  ...(i ? [i] : []),
                  "FIELDS",
                  o.length,
                  ...o,
                ],
                t,
              );
            }
          },
          iY = class extends io {
            constructor(e, t) {
              let [r, s] = e,
                n = Array.isArray(s) ? s : [s];
              super(["hpexpiretime", r, "FIELDS", n.length, ...n], t);
            }
          },
          iG = class extends io {
            constructor(e, t) {
              let [r, s] = e,
                n = Array.isArray(s) ? s : [s];
              super(["hpttl", r, "FIELDS", n.length, ...n], t);
            }
          },
          iQ = class extends io {
            constructor(e, t) {
              super(["hget", ...e], t);
            }
          },
          iZ = class extends io {
            constructor(e, t) {
              super(["hgetall", ...e], {
                deserialize: (e) =>
                  (function (e) {
                    if (0 === e.length) return null;
                    let t = {};
                    for (let r = 0; r < e.length; r += 2) {
                      let s = e[r],
                        n = e[r + 1];
                      try {
                        let e =
                          !Number.isNaN(Number(n)) &&
                          !Number.isSafeInteger(Number(n));
                        t[s] = e ? n : JSON.parse(n);
                      } catch {
                        t[s] = n;
                      }
                    }
                    return t;
                  })(e),
                ...t,
              });
            }
          },
          i0 = class extends io {
            constructor(e, t) {
              super(["hincrby", ...e], t);
            }
          },
          i1 = class extends io {
            constructor(e, t) {
              super(["hincrbyfloat", ...e], t);
            }
          },
          i2 = class extends io {
            constructor([e], t) {
              super(["hkeys", e], t);
            }
          },
          i3 = class extends io {
            constructor(e, t) {
              super(["hlen", ...e], t);
            }
          },
          i8 = class extends io {
            constructor([e, ...t], r) {
              super(["hmget", e, ...t], {
                deserialize: (e) =>
                  (function (e, t) {
                    if (t.every((e) => null === e)) return null;
                    let r = {};
                    for (let [s, n] of e.entries())
                      try {
                        r[n] = JSON.parse(t[s]);
                      } catch {
                        r[n] = t[s];
                      }
                    return r;
                  })(t, e),
                ...r,
              });
            }
          },
          i5 = class extends io {
            constructor([e, t], r) {
              super(
                ["hmset", e, ...Object.entries(t).flatMap(([e, t]) => [e, t])],
                r,
              );
            }
          },
          i4 = class extends io {
            constructor([e, t, r], s) {
              let n = ["hscan", e, t];
              r?.match && n.push("match", r.match),
                "number" == typeof r?.count && n.push("count", r.count),
                super(n, { deserialize: n7, ...s });
            }
          },
          i6 = class extends io {
            constructor([e, t], r) {
              super(
                ["hset", e, ...Object.entries(t).flatMap(([e, t]) => [e, t])],
                r,
              );
            }
          },
          i7 = class extends io {
            constructor(e, t) {
              super(["hsetnx", ...e], t);
            }
          },
          i9 = class extends io {
            constructor(e, t) {
              super(["hstrlen", ...e], t);
            }
          },
          oe = class extends io {
            constructor(e, t) {
              let [r, s] = e,
                n = Array.isArray(s) ? s : [s];
              super(["httl", r, "FIELDS", n.length, ...n], t);
            }
          },
          ot = class extends io {
            constructor(e, t) {
              super(["hvals", ...e], t);
            }
          },
          or = class extends io {
            constructor(e, t) {
              super(["incr", ...e], t);
            }
          },
          os = class extends io {
            constructor(e, t) {
              super(["incrby", ...e], t);
            }
          },
          on = class extends io {
            constructor(e, t) {
              super(["incrbyfloat", ...e], t);
            }
          },
          oi = class extends io {
            constructor(e, t) {
              super(["JSON.ARRAPPEND", ...e], t);
            }
          },
          oo = class extends io {
            constructor(e, t) {
              super(["JSON.ARRINDEX", ...e], t);
            }
          },
          oa = class extends io {
            constructor(e, t) {
              super(["JSON.ARRINSERT", ...e], t);
            }
          },
          ol = class extends io {
            constructor(e, t) {
              super(["JSON.ARRLEN", e[0], e[1] ?? "$"], t);
            }
          },
          oc = class extends io {
            constructor(e, t) {
              super(["JSON.ARRPOP", ...e], t);
            }
          },
          oh = class extends io {
            constructor(e, t) {
              let r = e[1] ?? "$";
              super(["JSON.ARRTRIM", e[0], r, e[2] ?? 0, e[3] ?? 0], t);
            }
          },
          ou = class extends io {
            constructor(e, t) {
              super(["JSON.CLEAR", ...e], t);
            }
          },
          od = class extends io {
            constructor(e, t) {
              super(["JSON.DEL", ...e], t);
            }
          },
          op = class extends io {
            constructor(e, t) {
              super(["JSON.FORGET", ...e], t);
            }
          },
          of = class extends io {
            constructor(e, t) {
              let r = ["JSON.GET"];
              "string" == typeof e[1]
                ? r.push(...e)
                : (r.push(e[0]),
                  e[1] &&
                    (e[1].indent && r.push("INDENT", e[1].indent),
                    e[1].newline && r.push("NEWLINE", e[1].newline),
                    e[1].space && r.push("SPACE", e[1].space)),
                  r.push(...e.slice(2))),
                super(r, t);
            }
          },
          om = class extends io {
            constructor(e, t) {
              super(["JSON.MERGE", ...e], t);
            }
          },
          og = class extends io {
            constructor(e, t) {
              super(["JSON.MGET", ...e[0], e[1]], t);
            }
          },
          oy = class extends io {
            constructor(e, t) {
              let r = ["JSON.MSET"];
              for (let t of e) r.push(t.key, t.path, t.value);
              super(r, t);
            }
          },
          ob = class extends io {
            constructor(e, t) {
              super(["JSON.NUMINCRBY", ...e], t);
            }
          },
          ow = class extends io {
            constructor(e, t) {
              super(["JSON.NUMMULTBY", ...e], t);
            }
          },
          o_ = class extends io {
            constructor(e, t) {
              super(["JSON.OBJKEYS", ...e], t);
            }
          },
          ov = class extends io {
            constructor(e, t) {
              super(["JSON.OBJLEN", ...e], t);
            }
          },
          ox = class extends io {
            constructor(e, t) {
              super(["JSON.RESP", ...e], t);
            }
          },
          oS = class extends io {
            constructor(e, t) {
              let r = ["JSON.SET", e[0], e[1], e[2]];
              e[3] && (e[3].nx ? r.push("NX") : e[3].xx && r.push("XX")),
                super(r, t);
            }
          },
          oT = class extends io {
            constructor(e, t) {
              super(["JSON.STRAPPEND", ...e], t);
            }
          },
          oE = class extends io {
            constructor(e, t) {
              super(["JSON.STRLEN", ...e], t);
            }
          },
          oO = class extends io {
            constructor(e, t) {
              super(["JSON.TOGGLE", ...e], t);
            }
          },
          oA = class extends io {
            constructor(e, t) {
              super(["JSON.TYPE", ...e], t);
            }
          },
          oR = class extends io {
            constructor(e, t) {
              super(["keys", ...e], t);
            }
          },
          ok = class extends io {
            constructor(e, t) {
              super(["lindex", ...e], t);
            }
          },
          oC = class extends io {
            constructor(e, t) {
              super(["linsert", ...e], t);
            }
          },
          oP = class extends io {
            constructor(e, t) {
              super(["llen", ...e], t);
            }
          },
          oL = class extends io {
            constructor(e, t) {
              super(["lmove", ...e], t);
            }
          },
          oI = class extends io {
            constructor(e, t) {
              let [r, s, n, i] = e;
              super(["LMPOP", r, ...s, n, ...(i ? ["COUNT", i] : [])], t);
            }
          },
          o$ = class extends io {
            constructor(e, t) {
              super(["lpop", ...e], t);
            }
          },
          oj = class extends io {
            constructor(e, t) {
              let r = ["lpos", e[0], e[1]];
              "number" == typeof e[2]?.rank && r.push("rank", e[2].rank),
                "number" == typeof e[2]?.count && r.push("count", e[2].count),
                "number" == typeof e[2]?.maxLen &&
                  r.push("maxLen", e[2].maxLen),
                super(r, t);
            }
          },
          oz = class extends io {
            constructor(e, t) {
              super(["lpush", ...e], t);
            }
          },
          oM = class extends io {
            constructor(e, t) {
              super(["lpushx", ...e], t);
            }
          },
          oq = class extends io {
            constructor(e, t) {
              super(["lrange", ...e], t);
            }
          },
          oN = class extends io {
            constructor(e, t) {
              super(["lrem", ...e], t);
            }
          },
          oF = class extends io {
            constructor(e, t) {
              super(["lset", ...e], t);
            }
          },
          oB = class extends io {
            constructor(e, t) {
              super(["ltrim", ...e], t);
            }
          },
          oD = class extends io {
            constructor(e, t) {
              super(["mget", ...(Array.isArray(e[0]) ? e[0] : e)], t);
            }
          },
          oW = class extends io {
            constructor([e], t) {
              super(
                ["mset", ...Object.entries(e).flatMap(([e, t]) => [e, t])],
                t,
              );
            }
          },
          oU = class extends io {
            constructor([e], t) {
              super(["msetnx", ...Object.entries(e).flat()], t);
            }
          },
          oH = class extends io {
            constructor(e, t) {
              super(["persist", ...e], t);
            }
          },
          oJ = class extends io {
            constructor(e, t) {
              super(["pexpire", ...e], t);
            }
          },
          oX = class extends io {
            constructor(e, t) {
              super(["pexpireat", ...e], t);
            }
          },
          oV = class extends io {
            constructor(e, t) {
              super(["pfadd", ...e], t);
            }
          },
          oK = class extends io {
            constructor(e, t) {
              super(["pfcount", ...e], t);
            }
          },
          oY = class extends io {
            constructor(e, t) {
              super(["pfmerge", ...e], t);
            }
          },
          oG = class extends io {
            constructor(e, t) {
              let r = ["ping"];
              e?.[0] !== void 0 && r.push(e[0]), super(r, t);
            }
          },
          oQ = class extends io {
            constructor(e, t) {
              super(["psetex", ...e], t);
            }
          },
          oZ = class extends io {
            constructor(e, t) {
              super(["pttl", ...e], t);
            }
          },
          o0 = class extends io {
            constructor(e, t) {
              super(["publish", ...e], t);
            }
          },
          o1 = class extends io {
            constructor(e) {
              super(["randomkey"], e);
            }
          },
          o2 = class extends io {
            constructor(e, t) {
              super(["rename", ...e], t);
            }
          },
          o3 = class extends io {
            constructor(e, t) {
              super(["renamenx", ...e], t);
            }
          },
          o8 = class extends io {
            constructor(e, t) {
              super(["rpop", ...e], t);
            }
          },
          o5 = class extends io {
            constructor(e, t) {
              super(["rpush", ...e], t);
            }
          },
          o4 = class extends io {
            constructor(e, t) {
              super(["rpushx", ...e], t);
            }
          },
          o6 = class extends io {
            constructor(e, t) {
              super(["sadd", ...e], t);
            }
          },
          o7 = class extends io {
            constructor([e, t], r) {
              let s = ["scan", e];
              t?.match && s.push("match", t.match),
                "number" == typeof t?.count && s.push("count", t.count),
                t && "withType" in t && !0 === t.withType
                  ? s.push("withtype")
                  : t &&
                    "type" in t &&
                    t.type &&
                    t.type.length > 0 &&
                    s.push("type", t.type),
                super(s, { deserialize: t?.withType ? n9 : n7, ...r });
            }
          },
          o9 = class extends io {
            constructor(e, t) {
              super(["scard", ...e], t);
            }
          },
          ae = class extends io {
            constructor(e, t) {
              super(["script", "exists", ...e], {
                deserialize: (e) => e,
                ...t,
              });
            }
          },
          at = class extends io {
            constructor([e], t) {
              let r = ["script", "flush"];
              e?.sync ? r.push("sync") : e?.async && r.push("async"),
                super(r, t);
            }
          },
          ar = class extends io {
            constructor(e, t) {
              super(["script", "load", ...e], t);
            }
          },
          as = class extends io {
            constructor(e, t) {
              super(["sdiff", ...e], t);
            }
          },
          an = class extends io {
            constructor(e, t) {
              super(["sdiffstore", ...e], t);
            }
          },
          ai = class extends io {
            constructor([e, t, r], s) {
              let n = ["set", e, t];
              r &&
                ("nx" in r && r.nx
                  ? n.push("nx")
                  : "xx" in r && r.xx && n.push("xx"),
                "get" in r && r.get && n.push("get"),
                "ex" in r && "number" == typeof r.ex
                  ? n.push("ex", r.ex)
                  : "px" in r && "number" == typeof r.px
                    ? n.push("px", r.px)
                    : "exat" in r && "number" == typeof r.exat
                      ? n.push("exat", r.exat)
                      : "pxat" in r && "number" == typeof r.pxat
                        ? n.push("pxat", r.pxat)
                        : "keepTtl" in r && r.keepTtl && n.push("keepTtl")),
                super(n, s);
            }
          },
          ao = class extends io {
            constructor(e, t) {
              super(["setbit", ...e], t);
            }
          },
          aa = class extends io {
            constructor(e, t) {
              super(["setex", ...e], t);
            }
          },
          al = class extends io {
            constructor(e, t) {
              super(["setnx", ...e], t);
            }
          },
          ac = class extends io {
            constructor(e, t) {
              super(["setrange", ...e], t);
            }
          },
          ah = class extends io {
            constructor(e, t) {
              super(["sinter", ...e], t);
            }
          },
          au = class extends io {
            constructor(e, t) {
              super(["sinterstore", ...e], t);
            }
          },
          ad = class extends io {
            constructor(e, t) {
              super(["sismember", ...e], t);
            }
          },
          ap = class extends io {
            constructor(e, t) {
              super(["smembers", ...e], t);
            }
          },
          af = class extends io {
            constructor(e, t) {
              super(["smismember", e[0], ...e[1]], t);
            }
          },
          am = class extends io {
            constructor(e, t) {
              super(["smove", ...e], t);
            }
          },
          ag = class extends io {
            constructor([e, t], r) {
              let s = ["spop", e];
              "number" == typeof t && s.push(t), super(s, r);
            }
          },
          ay = class extends io {
            constructor([e, t], r) {
              let s = ["srandmember", e];
              "number" == typeof t && s.push(t), super(s, r);
            }
          },
          ab = class extends io {
            constructor(e, t) {
              super(["srem", ...e], t);
            }
          },
          aw = class extends io {
            constructor([e, t, r], s) {
              let n = ["sscan", e, t];
              r?.match && n.push("match", r.match),
                "number" == typeof r?.count && n.push("count", r.count),
                super(n, { deserialize: n7, ...s });
            }
          },
          a_ = class extends io {
            constructor(e, t) {
              super(["strlen", ...e], t);
            }
          },
          av = class extends io {
            constructor(e, t) {
              super(["sunion", ...e], t);
            }
          },
          ax = class extends io {
            constructor(e, t) {
              super(["sunionstore", ...e], t);
            }
          },
          aS = class extends io {
            constructor(e) {
              super(["time"], e);
            }
          },
          aT = class extends io {
            constructor(e, t) {
              super(["touch", ...e], t);
            }
          },
          aE = class extends io {
            constructor(e, t) {
              super(["ttl", ...e], t);
            }
          },
          aO = class extends io {
            constructor(e, t) {
              super(["type", ...e], t);
            }
          },
          aA = class extends io {
            constructor(e, t) {
              super(["unlink", ...e], t);
            }
          },
          aR = class extends io {
            constructor([e, t, r], s) {
              super(["XACK", e, t, ...(Array.isArray(r) ? [...r] : [r])], s);
            }
          },
          ak = class extends io {
            constructor([e, t, r, s], n) {
              let i = ["XADD", e];
              for (let [e, n] of (s &&
                (s.nomkStream && i.push("NOMKSTREAM"),
                s.trim &&
                  (i.push(s.trim.type, s.trim.comparison, s.trim.threshold),
                  void 0 !== s.trim.limit && i.push("LIMIT", s.trim.limit))),
              i.push(t),
              Object.entries(r)))
                i.push(e, n);
              super(i, n);
            }
          },
          aC = class extends io {
            constructor([e, t, r, s, n, i], o) {
              let a = [];
              i?.count && a.push("COUNT", i.count),
                i?.justId && a.push("JUSTID"),
                super(["XAUTOCLAIM", e, t, r, s, n, ...a], o);
            }
          },
          aP = class extends io {
            constructor([e, t, r, s, n, i], o) {
              let a = Array.isArray(n) ? [...n] : [n],
                l = [];
              i?.idleMS && l.push("IDLE", i.idleMS),
                i?.idleMS && l.push("TIME", i.timeMS),
                i?.retryCount && l.push("RETRYCOUNT", i.retryCount),
                i?.force && l.push("FORCE"),
                i?.justId && l.push("JUSTID"),
                i?.lastId && l.push("LASTID", i.lastId),
                super(["XCLAIM", e, t, r, s, ...a, ...l], o);
            }
          },
          aL = class extends io {
            constructor([e, t], r) {
              super(["XDEL", e, ...(Array.isArray(t) ? [...t] : [t])], r);
            }
          },
          aI = class extends io {
            constructor([e, t], r) {
              let s = ["XGROUP"];
              switch (t.type) {
                case "CREATE":
                  s.push("CREATE", e, t.group, t.id),
                    t.options &&
                      (t.options.MKSTREAM && s.push("MKSTREAM"),
                      void 0 !== t.options.ENTRIESREAD &&
                        s.push(
                          "ENTRIESREAD",
                          t.options.ENTRIESREAD.toString(),
                        ));
                  break;
                case "CREATECONSUMER":
                  s.push("CREATECONSUMER", e, t.group, t.consumer);
                  break;
                case "DELCONSUMER":
                  s.push("DELCONSUMER", e, t.group, t.consumer);
                  break;
                case "DESTROY":
                  s.push("DESTROY", e, t.group);
                  break;
                case "SETID":
                  s.push("SETID", e, t.group, t.id),
                    t.options?.ENTRIESREAD !== void 0 &&
                      s.push("ENTRIESREAD", t.options.ENTRIESREAD.toString());
                  break;
                default:
                  throw Error("Invalid XGROUP");
              }
              super(s, r);
            }
          },
          a$ = class extends io {
            constructor([e, t], r) {
              let s = [];
              "CONSUMERS" === t.type
                ? s.push("CONSUMERS", e, t.group)
                : s.push("GROUPS", e),
                super(["XINFO", ...s], r);
            }
          },
          aj = class extends io {
            constructor(e, t) {
              super(["XLEN", ...e], t);
            }
          },
          az = class extends io {
            constructor([e, t, r, s, n, i], o) {
              super(
                [
                  "XPENDING",
                  e,
                  t,
                  ...(i?.idleTime ? ["IDLE", i.idleTime] : []),
                  r,
                  s,
                  n,
                  ...(i?.consumer === void 0
                    ? []
                    : Array.isArray(i.consumer)
                      ? [...i.consumer]
                      : [i.consumer]),
                ],
                o,
              );
            }
          },
          aM = class extends io {
            constructor([e, t, r, s], n) {
              let i = ["XRANGE", e, t, r];
              "number" == typeof s && i.push("COUNT", s),
                super(i, {
                  deserialize: (e) =>
                    (function (e) {
                      let t = {};
                      for (let r of e)
                        for (let e = 0; e < r.length; e += 2) {
                          let s = r[e],
                            n = r[e + 1];
                          s in t || (t[s] = {});
                          for (let e = 0; e < n.length; e += 2) {
                            let r = n[e],
                              i = n[e + 1];
                            try {
                              t[s][r] = JSON.parse(i);
                            } catch {
                              t[s][r] = i;
                            }
                          }
                        }
                      return t;
                    })(e),
                  ...n,
                });
            }
          },
          aq = class extends io {
            constructor([e, t, r], s) {
              if (Array.isArray(e) && Array.isArray(t) && e.length !== t.length)
                throw Error(
                  "ERR Unbalanced XREAD list of streams: for each stream key an ID or '$' must be specified",
                );
              let n = [];
              "number" == typeof r?.count && n.push("COUNT", r.count),
                "number" == typeof r?.blockMS && n.push("BLOCK", r.blockMS),
                n.push(
                  "STREAMS",
                  ...(Array.isArray(e) ? [...e] : [e]),
                  ...(Array.isArray(t) ? [...t] : [t]),
                ),
                super(["XREAD", ...n], s);
            }
          },
          aN = class extends io {
            constructor([e, t, r, s, n], i) {
              if (Array.isArray(r) && Array.isArray(s) && r.length !== s.length)
                throw Error(
                  "ERR Unbalanced XREADGROUP list of streams: for each stream key an ID or '$' must be specified",
                );
              let o = [];
              "number" == typeof n?.count && o.push("COUNT", n.count),
                "number" == typeof n?.blockMS && o.push("BLOCK", n.blockMS),
                "boolean" == typeof n?.NOACK && n.NOACK && o.push("NOACK"),
                o.push(
                  "STREAMS",
                  ...(Array.isArray(r) ? [...r] : [r]),
                  ...(Array.isArray(s) ? [...s] : [s]),
                ),
                super(["XREADGROUP", "GROUP", e, t, ...o], i);
            }
          },
          aF = class extends io {
            constructor([e, t, r, s], n) {
              let i = ["XREVRANGE", e, t, r];
              "number" == typeof s && i.push("COUNT", s),
                super(i, {
                  deserialize: (e) =>
                    (function (e) {
                      let t = {};
                      for (let r of e)
                        for (let e = 0; e < r.length; e += 2) {
                          let s = r[e],
                            n = r[e + 1];
                          s in t || (t[s] = {});
                          for (let e = 0; e < n.length; e += 2) {
                            let r = n[e],
                              i = n[e + 1];
                            try {
                              t[s][r] = JSON.parse(i);
                            } catch {
                              t[s][r] = i;
                            }
                          }
                        }
                      return t;
                    })(e),
                  ...n,
                });
            }
          },
          aB = class extends io {
            constructor([e, t], r) {
              let {
                limit: s,
                strategy: n,
                threshold: i,
                exactness: o = "~",
              } = t;
              super(["XTRIM", e, n, o, i, ...(s ? ["LIMIT", s] : [])], r);
            }
          },
          aD = class extends io {
            constructor([e, t, ...r], s) {
              let n = ["zadd", e];
              "nx" in t && t.nx
                ? n.push("nx")
                : "xx" in t && t.xx && n.push("xx"),
                "ch" in t && t.ch && n.push("ch"),
                "incr" in t && t.incr && n.push("incr"),
                "lt" in t && t.lt
                  ? n.push("lt")
                  : "gt" in t && t.gt && n.push("gt"),
                "score" in t && "member" in t && n.push(t.score, t.member),
                n.push(...r.flatMap(({ score: e, member: t }) => [e, t])),
                super(n, s);
            }
          },
          aW = class extends io {
            constructor(e, t) {
              super(["zcard", ...e], t);
            }
          },
          aU = class extends io {
            constructor(e, t) {
              super(["zcount", ...e], t);
            }
          },
          aH = class extends io {
            constructor(e, t) {
              super(["zincrby", ...e], t);
            }
          },
          aJ = class extends io {
            constructor([e, t, r, s], n) {
              let i = ["zinterstore", e, t];
              Array.isArray(r) ? i.push(...r) : i.push(r),
                s &&
                  ("weights" in s && s.weights
                    ? i.push("weights", ...s.weights)
                    : "weight" in s &&
                      "number" == typeof s.weight &&
                      i.push("weights", s.weight),
                  "aggregate" in s && i.push("aggregate", s.aggregate)),
                super(i, n);
            }
          },
          aX = class extends io {
            constructor(e, t) {
              super(["zlexcount", ...e], t);
            }
          },
          aV = class extends io {
            constructor([e, t], r) {
              let s = ["zpopmax", e];
              "number" == typeof t && s.push(t), super(s, r);
            }
          },
          aK = class extends io {
            constructor([e, t], r) {
              let s = ["zpopmin", e];
              "number" == typeof t && s.push(t), super(s, r);
            }
          },
          aY = class extends io {
            constructor([e, t, r, s], n) {
              let i = ["zrange", e, t, r];
              s?.byScore && i.push("byscore"),
                s?.byLex && i.push("bylex"),
                s?.rev && i.push("rev"),
                s?.count !== void 0 &&
                  void 0 !== s.offset &&
                  i.push("limit", s.offset, s.count),
                s?.withScores && i.push("withscores"),
                super(i, n);
            }
          },
          aG = class extends io {
            constructor(e, t) {
              super(["zrank", ...e], t);
            }
          },
          aQ = class extends io {
            constructor(e, t) {
              super(["zrem", ...e], t);
            }
          },
          aZ = class extends io {
            constructor(e, t) {
              super(["zremrangebylex", ...e], t);
            }
          },
          a0 = class extends io {
            constructor(e, t) {
              super(["zremrangebyrank", ...e], t);
            }
          },
          a1 = class extends io {
            constructor(e, t) {
              super(["zremrangebyscore", ...e], t);
            }
          },
          a2 = class extends io {
            constructor(e, t) {
              super(["zrevrank", ...e], t);
            }
          },
          a3 = class extends io {
            constructor([e, t, r], s) {
              let n = ["zscan", e, t];
              r?.match && n.push("match", r.match),
                "number" == typeof r?.count && n.push("count", r.count),
                super(n, { deserialize: n7, ...s });
            }
          },
          a8 = class extends io {
            constructor(e, t) {
              super(["zscore", ...e], t);
            }
          },
          a5 = class extends io {
            constructor([e, t, r], s) {
              let n = ["zunion", e];
              Array.isArray(t) ? n.push(...t) : n.push(t),
                r &&
                  ("weights" in r && r.weights
                    ? n.push("weights", ...r.weights)
                    : "weight" in r &&
                      "number" == typeof r.weight &&
                      n.push("weights", r.weight),
                  "aggregate" in r && n.push("aggregate", r.aggregate),
                  r.withScores && n.push("withscores")),
                super(n, s);
            }
          },
          a4 = class extends io {
            constructor([e, t, r, s], n) {
              let i = ["zunionstore", e, t];
              Array.isArray(r) ? i.push(...r) : i.push(r),
                s &&
                  ("weights" in s && s.weights
                    ? i.push("weights", ...s.weights)
                    : "weight" in s &&
                      "number" == typeof s.weight &&
                      i.push("weights", s.weight),
                  "aggregate" in s && i.push("aggregate", s.aggregate)),
                super(i, n);
            }
          },
          a6 = class extends io {
            constructor(e, t) {
              super(["zdiffstore", ...e], t);
            }
          },
          a7 = class extends io {
            constructor(e, t) {
              let [r, s] = e;
              super(["zmscore", r, ...s], t);
            }
          },
          a9 = class {
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
                  let r = performance.now(),
                    s = await (t ? e(t) : e()),
                    n = (performance.now() - r).toFixed(2);
                  return (
                    console.log(
                      `Latency for \x1b[38;2;19;185;39m${this.multiExec ? ["MULTI-EXEC"] : ["PIPELINE"].toString().toUpperCase()}\x1b[0m: \x1b[38;2;0;255;255m${n} ms\x1b[0m`,
                    ),
                    s
                  );
                };
              }
            }
            exec = async (e) => {
              if (0 === this.commands.length) throw Error("Pipeline is empty");
              let t = this.multiExec ? ["multi-exec"] : ["pipeline"],
                r = await this.client.request({
                  path: t,
                  body: Object.values(this.commands).map((e) => e.command),
                });
              return e?.keepErrors
                ? r.map(({ error: e, result: t }, r) => ({
                    error: e,
                    result: this.commands[r].deserialize(t),
                  }))
                : r.map(({ error: e, result: t }, r) => {
                    if (e)
                      throw new n5(
                        `Command ${r + 1} [ ${this.commands[r].command[0]} ] failed: ${e}`,
                      );
                    return this.commands[r].deserialize(t);
                  });
            };
            length() {
              return this.commands.length;
            }
            chain(e) {
              return this.commands.push(e), this;
            }
            append = (...e) => this.chain(new il(e, this.commandOptions));
            bitcount = (...e) => this.chain(new ic(e, this.commandOptions));
            bitfield = (...e) =>
              new ih(
                e,
                this.client,
                this.commandOptions,
                this.chain.bind(this),
              );
            bitop = (e, t, r, ...s) =>
              this.chain(new iu([e, t, r, ...s], this.commandOptions));
            bitpos = (...e) => this.chain(new id(e, this.commandOptions));
            copy = (...e) => this.chain(new ip(e, this.commandOptions));
            zdiffstore = (...e) => this.chain(new a6(e, this.commandOptions));
            dbsize = () => this.chain(new im(this.commandOptions));
            decr = (...e) => this.chain(new ig(e, this.commandOptions));
            decrby = (...e) => this.chain(new iy(e, this.commandOptions));
            del = (...e) => this.chain(new ib(e, this.commandOptions));
            echo = (...e) => this.chain(new iw(e, this.commandOptions));
            evalRo = (...e) => this.chain(new i_(e, this.commandOptions));
            eval = (...e) => this.chain(new iv(e, this.commandOptions));
            evalshaRo = (...e) => this.chain(new ix(e, this.commandOptions));
            evalsha = (...e) => this.chain(new iS(e, this.commandOptions));
            exists = (...e) => this.chain(new iE(e, this.commandOptions));
            expire = (...e) => this.chain(new iO(e, this.commandOptions));
            expireat = (...e) => this.chain(new iA(e, this.commandOptions));
            flushall = (e) => this.chain(new iR(e, this.commandOptions));
            flushdb = (...e) => this.chain(new ik(e, this.commandOptions));
            geoadd = (...e) => this.chain(new iC(e, this.commandOptions));
            geodist = (...e) => this.chain(new iP(e, this.commandOptions));
            geopos = (...e) => this.chain(new iI(e, this.commandOptions));
            geohash = (...e) => this.chain(new iL(e, this.commandOptions));
            geosearch = (...e) => this.chain(new i$(e, this.commandOptions));
            geosearchstore = (...e) =>
              this.chain(new ij(e, this.commandOptions));
            get = (...e) => this.chain(new iz(e, this.commandOptions));
            getbit = (...e) => this.chain(new iM(e, this.commandOptions));
            getdel = (...e) => this.chain(new iq(e, this.commandOptions));
            getex = (...e) => this.chain(new iN(e, this.commandOptions));
            getrange = (...e) => this.chain(new iF(e, this.commandOptions));
            getset = (e, t) => this.chain(new iB([e, t], this.commandOptions));
            hdel = (...e) => this.chain(new iD(e, this.commandOptions));
            hexists = (...e) => this.chain(new iW(e, this.commandOptions));
            hexpire = (...e) => this.chain(new iU(e, this.commandOptions));
            hexpireat = (...e) => this.chain(new iH(e, this.commandOptions));
            hexpiretime = (...e) => this.chain(new iJ(e, this.commandOptions));
            httl = (...e) => this.chain(new oe(e, this.commandOptions));
            hpexpire = (...e) => this.chain(new iV(e, this.commandOptions));
            hpexpireat = (...e) => this.chain(new iK(e, this.commandOptions));
            hpexpiretime = (...e) => this.chain(new iY(e, this.commandOptions));
            hpttl = (...e) => this.chain(new iG(e, this.commandOptions));
            hpersist = (...e) => this.chain(new iX(e, this.commandOptions));
            hget = (...e) => this.chain(new iQ(e, this.commandOptions));
            hgetall = (...e) => this.chain(new iZ(e, this.commandOptions));
            hincrby = (...e) => this.chain(new i0(e, this.commandOptions));
            hincrbyfloat = (...e) => this.chain(new i1(e, this.commandOptions));
            hkeys = (...e) => this.chain(new i2(e, this.commandOptions));
            hlen = (...e) => this.chain(new i3(e, this.commandOptions));
            hmget = (...e) => this.chain(new i8(e, this.commandOptions));
            hmset = (e, t) => this.chain(new i5([e, t], this.commandOptions));
            hrandfield = (e, t, r) =>
              this.chain(new ia([e, t, r], this.commandOptions));
            hscan = (...e) => this.chain(new i4(e, this.commandOptions));
            hset = (e, t) => this.chain(new i6([e, t], this.commandOptions));
            hsetnx = (e, t, r) =>
              this.chain(new i7([e, t, r], this.commandOptions));
            hstrlen = (...e) => this.chain(new i9(e, this.commandOptions));
            hvals = (...e) => this.chain(new ot(e, this.commandOptions));
            incr = (...e) => this.chain(new or(e, this.commandOptions));
            incrby = (...e) => this.chain(new os(e, this.commandOptions));
            incrbyfloat = (...e) => this.chain(new on(e, this.commandOptions));
            keys = (...e) => this.chain(new oR(e, this.commandOptions));
            lindex = (...e) => this.chain(new ok(e, this.commandOptions));
            linsert = (e, t, r, s) =>
              this.chain(new oC([e, t, r, s], this.commandOptions));
            llen = (...e) => this.chain(new oP(e, this.commandOptions));
            lmove = (...e) => this.chain(new oL(e, this.commandOptions));
            lpop = (...e) => this.chain(new o$(e, this.commandOptions));
            lmpop = (...e) => this.chain(new oI(e, this.commandOptions));
            lpos = (...e) => this.chain(new oj(e, this.commandOptions));
            lpush = (e, ...t) =>
              this.chain(new oz([e, ...t], this.commandOptions));
            lpushx = (e, ...t) =>
              this.chain(new oM([e, ...t], this.commandOptions));
            lrange = (...e) => this.chain(new oq(e, this.commandOptions));
            lrem = (e, t, r) =>
              this.chain(new oN([e, t, r], this.commandOptions));
            lset = (e, t, r) =>
              this.chain(new oF([e, t, r], this.commandOptions));
            ltrim = (...e) => this.chain(new oB(e, this.commandOptions));
            mget = (...e) => this.chain(new oD(e, this.commandOptions));
            mset = (e) => this.chain(new oW([e], this.commandOptions));
            msetnx = (e) => this.chain(new oU([e], this.commandOptions));
            persist = (...e) => this.chain(new oH(e, this.commandOptions));
            pexpire = (...e) => this.chain(new oJ(e, this.commandOptions));
            pexpireat = (...e) => this.chain(new oX(e, this.commandOptions));
            pfadd = (...e) => this.chain(new oV(e, this.commandOptions));
            pfcount = (...e) => this.chain(new oK(e, this.commandOptions));
            pfmerge = (...e) => this.chain(new oY(e, this.commandOptions));
            ping = (e) => this.chain(new oG(e, this.commandOptions));
            psetex = (e, t, r) =>
              this.chain(new oQ([e, t, r], this.commandOptions));
            pttl = (...e) => this.chain(new oZ(e, this.commandOptions));
            publish = (...e) => this.chain(new o0(e, this.commandOptions));
            randomkey = () => this.chain(new o1(this.commandOptions));
            rename = (...e) => this.chain(new o2(e, this.commandOptions));
            renamenx = (...e) => this.chain(new o3(e, this.commandOptions));
            rpop = (...e) => this.chain(new o8(e, this.commandOptions));
            rpush = (e, ...t) =>
              this.chain(new o5([e, ...t], this.commandOptions));
            rpushx = (e, ...t) =>
              this.chain(new o4([e, ...t], this.commandOptions));
            sadd = (e, t, ...r) =>
              this.chain(new o6([e, t, ...r], this.commandOptions));
            scan = (...e) => this.chain(new o7(e, this.commandOptions));
            scard = (...e) => this.chain(new o9(e, this.commandOptions));
            scriptExists = (...e) => this.chain(new ae(e, this.commandOptions));
            scriptFlush = (...e) => this.chain(new at(e, this.commandOptions));
            scriptLoad = (...e) => this.chain(new ar(e, this.commandOptions));
            sdiff = (...e) => this.chain(new as(e, this.commandOptions));
            sdiffstore = (...e) => this.chain(new an(e, this.commandOptions));
            set = (e, t, r) =>
              this.chain(new ai([e, t, r], this.commandOptions));
            setbit = (...e) => this.chain(new ao(e, this.commandOptions));
            setex = (e, t, r) =>
              this.chain(new aa([e, t, r], this.commandOptions));
            setnx = (e, t) => this.chain(new al([e, t], this.commandOptions));
            setrange = (...e) => this.chain(new ac(e, this.commandOptions));
            sinter = (...e) => this.chain(new ah(e, this.commandOptions));
            sinterstore = (...e) => this.chain(new au(e, this.commandOptions));
            sismember = (e, t) =>
              this.chain(new ad([e, t], this.commandOptions));
            smembers = (...e) => this.chain(new ap(e, this.commandOptions));
            smismember = (e, t) =>
              this.chain(new af([e, t], this.commandOptions));
            smove = (e, t, r) =>
              this.chain(new am([e, t, r], this.commandOptions));
            spop = (...e) => this.chain(new ag(e, this.commandOptions));
            srandmember = (...e) => this.chain(new ay(e, this.commandOptions));
            srem = (e, ...t) =>
              this.chain(new ab([e, ...t], this.commandOptions));
            sscan = (...e) => this.chain(new aw(e, this.commandOptions));
            strlen = (...e) => this.chain(new a_(e, this.commandOptions));
            sunion = (...e) => this.chain(new av(e, this.commandOptions));
            sunionstore = (...e) => this.chain(new ax(e, this.commandOptions));
            time = () => this.chain(new aS(this.commandOptions));
            touch = (...e) => this.chain(new aT(e, this.commandOptions));
            ttl = (...e) => this.chain(new aE(e, this.commandOptions));
            type = (...e) => this.chain(new aO(e, this.commandOptions));
            unlink = (...e) => this.chain(new aA(e, this.commandOptions));
            zadd = (...e) => (
              "score" in e[1],
              this.chain(
                new aD([e[0], e[1], ...e.slice(2)], this.commandOptions),
              )
            );
            xadd = (...e) => this.chain(new ak(e, this.commandOptions));
            xack = (...e) => this.chain(new aR(e, this.commandOptions));
            xdel = (...e) => this.chain(new aL(e, this.commandOptions));
            xgroup = (...e) => this.chain(new aI(e, this.commandOptions));
            xread = (...e) => this.chain(new aq(e, this.commandOptions));
            xreadgroup = (...e) => this.chain(new aN(e, this.commandOptions));
            xinfo = (...e) => this.chain(new a$(e, this.commandOptions));
            xlen = (...e) => this.chain(new aj(e, this.commandOptions));
            xpending = (...e) => this.chain(new az(e, this.commandOptions));
            xclaim = (...e) => this.chain(new aP(e, this.commandOptions));
            xautoclaim = (...e) => this.chain(new aC(e, this.commandOptions));
            xtrim = (...e) => this.chain(new aB(e, this.commandOptions));
            xrange = (...e) => this.chain(new aM(e, this.commandOptions));
            xrevrange = (...e) => this.chain(new aF(e, this.commandOptions));
            zcard = (...e) => this.chain(new aW(e, this.commandOptions));
            zcount = (...e) => this.chain(new aU(e, this.commandOptions));
            zincrby = (e, t, r) =>
              this.chain(new aH([e, t, r], this.commandOptions));
            zinterstore = (...e) => this.chain(new aJ(e, this.commandOptions));
            zlexcount = (...e) => this.chain(new aX(e, this.commandOptions));
            zmscore = (...e) => this.chain(new a7(e, this.commandOptions));
            zpopmax = (...e) => this.chain(new aV(e, this.commandOptions));
            zpopmin = (...e) => this.chain(new aK(e, this.commandOptions));
            zrange = (...e) => this.chain(new aY(e, this.commandOptions));
            zrank = (e, t) => this.chain(new aG([e, t], this.commandOptions));
            zrem = (e, ...t) =>
              this.chain(new aQ([e, ...t], this.commandOptions));
            zremrangebylex = (...e) =>
              this.chain(new aZ(e, this.commandOptions));
            zremrangebyrank = (...e) =>
              this.chain(new a0(e, this.commandOptions));
            zremrangebyscore = (...e) =>
              this.chain(new a1(e, this.commandOptions));
            zrevrank = (e, t) =>
              this.chain(new a2([e, t], this.commandOptions));
            zscan = (...e) => this.chain(new a3(e, this.commandOptions));
            zscore = (e, t) => this.chain(new a8([e, t], this.commandOptions));
            zunionstore = (...e) => this.chain(new a4(e, this.commandOptions));
            zunion = (...e) => this.chain(new a5(e, this.commandOptions));
            get json() {
              return {
                arrappend: (...e) => this.chain(new oi(e, this.commandOptions)),
                arrindex: (...e) => this.chain(new oo(e, this.commandOptions)),
                arrinsert: (...e) => this.chain(new oa(e, this.commandOptions)),
                arrlen: (...e) => this.chain(new ol(e, this.commandOptions)),
                arrpop: (...e) => this.chain(new oc(e, this.commandOptions)),
                arrtrim: (...e) => this.chain(new oh(e, this.commandOptions)),
                clear: (...e) => this.chain(new ou(e, this.commandOptions)),
                del: (...e) => this.chain(new od(e, this.commandOptions)),
                forget: (...e) => this.chain(new op(e, this.commandOptions)),
                get: (...e) => this.chain(new of(e, this.commandOptions)),
                merge: (...e) => this.chain(new om(e, this.commandOptions)),
                mget: (...e) => this.chain(new og(e, this.commandOptions)),
                mset: (...e) => this.chain(new oy(e, this.commandOptions)),
                numincrby: (...e) => this.chain(new ob(e, this.commandOptions)),
                nummultby: (...e) => this.chain(new ow(e, this.commandOptions)),
                objkeys: (...e) => this.chain(new o_(e, this.commandOptions)),
                objlen: (...e) => this.chain(new ov(e, this.commandOptions)),
                resp: (...e) => this.chain(new ox(e, this.commandOptions)),
                set: (...e) => this.chain(new oS(e, this.commandOptions)),
                strappend: (...e) => this.chain(new oT(e, this.commandOptions)),
                strlen: (...e) => this.chain(new oE(e, this.commandOptions)),
                toggle: (...e) => this.chain(new oO(e, this.commandOptions)),
                type: (...e) => this.chain(new oA(e, this.commandOptions)),
              };
            }
          },
          le = new Set([
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
          lt = class {
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
              let r = this.indexInCurrentPipeline++;
              e(t);
              let s = this.deferExecution().then(() => {
                  if (!this.pipelinePromises.has(t)) {
                    let e = t.exec({ keepErrors: !0 });
                    (this.pipelineCounter += 1),
                      this.pipelinePromises.set(t, e),
                      (this.activePipeline = null);
                  }
                  return this.pipelinePromises.get(t);
                }),
                n = (await s)[r];
              if (n.error) throw new n5(`Command failed: ${n.error}`);
              return n.result;
            }
            async deferExecution() {
              await Promise.resolve(), await Promise.resolve();
            }
          },
          lr = class extends io {
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
          ls = class extends EventTarget {
            subscriptions;
            client;
            listeners;
            constructor(e, t, r = !1) {
              for (let s of (super(),
              (this.client = e),
              (this.subscriptions = new Map()),
              (this.listeners = new Map()),
              t))
                r ? this.subscribeToPattern(s) : this.subscribeToChannel(s);
            }
            subscribeToChannel(e) {
              let t = new AbortController(),
                r = new ln([e], {
                  streamOptions: {
                    signal: t.signal,
                    onMessage: (e) => this.handleMessage(e, !1),
                  },
                });
              r.exec(this.client).catch((e) => {
                "AbortError" !== e.name && this.dispatchToListeners("error", e);
              }),
                this.subscriptions.set(e, {
                  command: r,
                  controller: t,
                  isPattern: !1,
                });
            }
            subscribeToPattern(e) {
              let t = new AbortController(),
                r = new lr([e], {
                  streamOptions: {
                    signal: t.signal,
                    onMessage: (e) => this.handleMessage(e, !0),
                  },
                });
              r.exec(this.client).catch((e) => {
                "AbortError" !== e.name && this.dispatchToListeners("error", e);
              }),
                this.subscriptions.set(e, {
                  command: r,
                  controller: t,
                  isPattern: !0,
                });
            }
            handleMessage(e, t) {
              let r = e.replace(/^data:\s*/, ""),
                s = r.indexOf(","),
                n = r.indexOf(",", s + 1),
                i = t ? r.indexOf(",", n + 1) : -1;
              if (-1 !== s && -1 !== n) {
                let e = r.slice(0, s);
                if (t && "pmessage" === e && -1 !== i) {
                  let e = r.slice(s + 1, n),
                    t = r.slice(n + 1, i),
                    o = r.slice(i + 1);
                  try {
                    let r = JSON.parse(o);
                    this.dispatchToListeners("pmessage", {
                      pattern: e,
                      channel: t,
                      message: r,
                    }),
                      this.dispatchToListeners(`pmessage:${e}`, {
                        pattern: e,
                        channel: t,
                        message: r,
                      });
                  } catch (e) {
                    this.dispatchToListeners(
                      "error",
                      Error(`Failed to parse message: ${e}`),
                    );
                  }
                } else {
                  let t = r.slice(s + 1, n),
                    i = r.slice(n + 1);
                  try {
                    if (
                      "subscribe" === e ||
                      "psubscribe" === e ||
                      "unsubscribe" === e ||
                      "punsubscribe" === e
                    ) {
                      let t = Number.parseInt(i);
                      this.dispatchToListeners(e, t);
                    } else {
                      let r = JSON.parse(i);
                      this.dispatchToListeners(e, { channel: t, message: r }),
                        this.dispatchToListeners(`${e}:${t}`, {
                          channel: t,
                          message: r,
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
              let r = this.listeners.get(e);
              if (r) for (let e of r) e(t);
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
          ln = class extends io {
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
          li = class {
            script;
            sha1;
            redis;
            constructor(e, t) {
              (this.redis = e),
                (this.script = t),
                (this.sha1 = ""),
                this.init(t);
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
                await this.redis.evalsha(this.sha1, e, t).catch(async (r) => {
                  if (
                    r instanceof Error &&
                    r.message.toLowerCase().includes("noscript")
                  )
                    return await this.redis.eval(this.script, e, t);
                  throw r;
                })
              );
            }
            async digest(e) {
              let t = new TextEncoder().encode(e);
              return [...new Uint8Array(await n3.digest("SHA-1", t))]
                .map((e) => e.toString(16).padStart(2, "0"))
                .join("");
            }
          },
          lo = class {
            script;
            sha1;
            redis;
            constructor(e, t) {
              (this.redis = e),
                (this.sha1 = ""),
                (this.script = t),
                this.init(t);
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
                await this.redis.evalshaRo(this.sha1, e, t).catch(async (r) => {
                  if (
                    r instanceof Error &&
                    r.message.toLowerCase().includes("noscript")
                  )
                    return await this.redis.evalRo(this.script, e, t);
                  throw r;
                })
              );
            }
            async digest(e) {
              let t = new TextEncoder().encode(e);
              return [...new Uint8Array(await n3.digest("SHA-1", t))]
                .map((e) => e.toString(16).padStart(2, "0"))
                .join("");
            }
          },
          la = class {
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
                arrappend: (...e) => new oi(e, this.opts).exec(this.client),
                arrindex: (...e) => new oo(e, this.opts).exec(this.client),
                arrinsert: (...e) => new oa(e, this.opts).exec(this.client),
                arrlen: (...e) => new ol(e, this.opts).exec(this.client),
                arrpop: (...e) => new oc(e, this.opts).exec(this.client),
                arrtrim: (...e) => new oh(e, this.opts).exec(this.client),
                clear: (...e) => new ou(e, this.opts).exec(this.client),
                del: (...e) => new od(e, this.opts).exec(this.client),
                forget: (...e) => new op(e, this.opts).exec(this.client),
                get: (...e) => new of(e, this.opts).exec(this.client),
                merge: (...e) => new om(e, this.opts).exec(this.client),
                mget: (...e) => new og(e, this.opts).exec(this.client),
                mset: (...e) => new oy(e, this.opts).exec(this.client),
                numincrby: (...e) => new ob(e, this.opts).exec(this.client),
                nummultby: (...e) => new ow(e, this.opts).exec(this.client),
                objkeys: (...e) => new o_(e, this.opts).exec(this.client),
                objlen: (...e) => new ov(e, this.opts).exec(this.client),
                resp: (...e) => new ox(e, this.opts).exec(this.client),
                set: (...e) => new oS(e, this.opts).exec(this.client),
                strappend: (...e) => new oT(e, this.opts).exec(this.client),
                strlen: (...e) => new oE(e, this.opts).exec(this.client),
                toggle: (...e) => new oO(e, this.opts).exec(this.client),
                type: (...e) => new oA(e, this.opts).exec(this.client),
              };
            }
            use = (e) => {
              let t = this.client.request.bind(this.client);
              this.client.request = (r) => e(r, t);
            };
            addTelemetry = (e) => {
              if (this.enableTelemetry)
                try {
                  this.client.mergeTelemetry(e);
                } catch {}
            };
            createScript(e, t) {
              return t?.readonly ? new lo(this, e) : new li(this, e);
            }
            pipeline = () =>
              new a9({
                client: this.client,
                commandOptions: this.opts,
                multiExec: !1,
              });
            autoPipeline = () =>
              (function e(t, r) {
                return (
                  t.autoPipelineExecutor ||
                    (t.autoPipelineExecutor = new lt(t)),
                  new Proxy(t, {
                    get: (t, s) => {
                      if ("pipelineCounter" === s)
                        return t.autoPipelineExecutor.pipelineCounter;
                      if ("json" === s) return e(t, !0);
                      let n = s in t && !(s in t.autoPipelineExecutor.pipeline),
                        i = le.has(s);
                      return n || i
                        ? t[s]
                        : (
                              r
                                ? "function" ==
                                  typeof t.autoPipelineExecutor.pipeline.json[s]
                                : "function" ==
                                  typeof t.autoPipelineExecutor.pipeline[s]
                            )
                          ? (...e) =>
                              t.autoPipelineExecutor.withAutoPipeline((t) => {
                                r ? t.json[s](...e) : t[s](...e);
                              })
                          : t.autoPipelineExecutor.pipeline[s];
                    },
                  })
                );
              })(this);
            multi = () =>
              new a9({
                client: this.client,
                commandOptions: this.opts,
                multiExec: !0,
              });
            bitfield = (...e) => new ih(e, this.client, this.opts);
            append = (...e) => new il(e, this.opts).exec(this.client);
            bitcount = (...e) => new ic(e, this.opts).exec(this.client);
            bitop = (e, t, r, ...s) =>
              new iu([e, t, r, ...s], this.opts).exec(this.client);
            bitpos = (...e) => new id(e, this.opts).exec(this.client);
            copy = (...e) => new ip(e, this.opts).exec(this.client);
            dbsize = () => new im(this.opts).exec(this.client);
            decr = (...e) => new ig(e, this.opts).exec(this.client);
            decrby = (...e) => new iy(e, this.opts).exec(this.client);
            del = (...e) => new ib(e, this.opts).exec(this.client);
            echo = (...e) => new iw(e, this.opts).exec(this.client);
            evalRo = (...e) => new i_(e, this.opts).exec(this.client);
            eval = (...e) => new iv(e, this.opts).exec(this.client);
            evalshaRo = (...e) => new ix(e, this.opts).exec(this.client);
            evalsha = (...e) => new iS(e, this.opts).exec(this.client);
            exec = (e) => new iT(e, this.opts).exec(this.client);
            exists = (...e) => new iE(e, this.opts).exec(this.client);
            expire = (...e) => new iO(e, this.opts).exec(this.client);
            expireat = (...e) => new iA(e, this.opts).exec(this.client);
            flushall = (e) => new iR(e, this.opts).exec(this.client);
            flushdb = (...e) => new ik(e, this.opts).exec(this.client);
            geoadd = (...e) => new iC(e, this.opts).exec(this.client);
            geopos = (...e) => new iI(e, this.opts).exec(this.client);
            geodist = (...e) => new iP(e, this.opts).exec(this.client);
            geohash = (...e) => new iL(e, this.opts).exec(this.client);
            geosearch = (...e) => new i$(e, this.opts).exec(this.client);
            geosearchstore = (...e) => new ij(e, this.opts).exec(this.client);
            get = (...e) => new iz(e, this.opts).exec(this.client);
            getbit = (...e) => new iM(e, this.opts).exec(this.client);
            getdel = (...e) => new iq(e, this.opts).exec(this.client);
            getex = (...e) => new iN(e, this.opts).exec(this.client);
            getrange = (...e) => new iF(e, this.opts).exec(this.client);
            getset = (e, t) => new iB([e, t], this.opts).exec(this.client);
            hdel = (...e) => new iD(e, this.opts).exec(this.client);
            hexists = (...e) => new iW(e, this.opts).exec(this.client);
            hexpire = (...e) => new iU(e, this.opts).exec(this.client);
            hexpireat = (...e) => new iH(e, this.opts).exec(this.client);
            hexpiretime = (...e) => new iJ(e, this.opts).exec(this.client);
            httl = (...e) => new oe(e, this.opts).exec(this.client);
            hpexpire = (...e) => new iV(e, this.opts).exec(this.client);
            hpexpireat = (...e) => new iK(e, this.opts).exec(this.client);
            hpexpiretime = (...e) => new iY(e, this.opts).exec(this.client);
            hpttl = (...e) => new iG(e, this.opts).exec(this.client);
            hpersist = (...e) => new iX(e, this.opts).exec(this.client);
            hget = (...e) => new iQ(e, this.opts).exec(this.client);
            hgetall = (...e) => new iZ(e, this.opts).exec(this.client);
            hincrby = (...e) => new i0(e, this.opts).exec(this.client);
            hincrbyfloat = (...e) => new i1(e, this.opts).exec(this.client);
            hkeys = (...e) => new i2(e, this.opts).exec(this.client);
            hlen = (...e) => new i3(e, this.opts).exec(this.client);
            hmget = (...e) => new i8(e, this.opts).exec(this.client);
            hmset = (e, t) => new i5([e, t], this.opts).exec(this.client);
            hrandfield = (e, t, r) =>
              new ia([e, t, r], this.opts).exec(this.client);
            hscan = (...e) => new i4(e, this.opts).exec(this.client);
            hset = (e, t) => new i6([e, t], this.opts).exec(this.client);
            hsetnx = (e, t, r) =>
              new i7([e, t, r], this.opts).exec(this.client);
            hstrlen = (...e) => new i9(e, this.opts).exec(this.client);
            hvals = (...e) => new ot(e, this.opts).exec(this.client);
            incr = (...e) => new or(e, this.opts).exec(this.client);
            incrby = (...e) => new os(e, this.opts).exec(this.client);
            incrbyfloat = (...e) => new on(e, this.opts).exec(this.client);
            keys = (...e) => new oR(e, this.opts).exec(this.client);
            lindex = (...e) => new ok(e, this.opts).exec(this.client);
            linsert = (e, t, r, s) =>
              new oC([e, t, r, s], this.opts).exec(this.client);
            llen = (...e) => new oP(e, this.opts).exec(this.client);
            lmove = (...e) => new oL(e, this.opts).exec(this.client);
            lpop = (...e) => new o$(e, this.opts).exec(this.client);
            lmpop = (...e) => new oI(e, this.opts).exec(this.client);
            lpos = (...e) => new oj(e, this.opts).exec(this.client);
            lpush = (e, ...t) => new oz([e, ...t], this.opts).exec(this.client);
            lpushx = (e, ...t) =>
              new oM([e, ...t], this.opts).exec(this.client);
            lrange = (...e) => new oq(e, this.opts).exec(this.client);
            lrem = (e, t, r) => new oN([e, t, r], this.opts).exec(this.client);
            lset = (e, t, r) => new oF([e, t, r], this.opts).exec(this.client);
            ltrim = (...e) => new oB(e, this.opts).exec(this.client);
            mget = (...e) => new oD(e, this.opts).exec(this.client);
            mset = (e) => new oW([e], this.opts).exec(this.client);
            msetnx = (e) => new oU([e], this.opts).exec(this.client);
            persist = (...e) => new oH(e, this.opts).exec(this.client);
            pexpire = (...e) => new oJ(e, this.opts).exec(this.client);
            pexpireat = (...e) => new oX(e, this.opts).exec(this.client);
            pfadd = (...e) => new oV(e, this.opts).exec(this.client);
            pfcount = (...e) => new oK(e, this.opts).exec(this.client);
            pfmerge = (...e) => new oY(e, this.opts).exec(this.client);
            ping = (e) => new oG(e, this.opts).exec(this.client);
            psetex = (e, t, r) =>
              new oQ([e, t, r], this.opts).exec(this.client);
            psubscribe = (e) => {
              let t = Array.isArray(e) ? e : [e];
              return new ls(this.client, t, !0);
            };
            pttl = (...e) => new oZ(e, this.opts).exec(this.client);
            publish = (...e) => new o0(e, this.opts).exec(this.client);
            randomkey = () => new o1().exec(this.client);
            rename = (...e) => new o2(e, this.opts).exec(this.client);
            renamenx = (...e) => new o3(e, this.opts).exec(this.client);
            rpop = (...e) => new o8(e, this.opts).exec(this.client);
            rpush = (e, ...t) => new o5([e, ...t], this.opts).exec(this.client);
            rpushx = (e, ...t) =>
              new o4([e, ...t], this.opts).exec(this.client);
            sadd = (e, t, ...r) =>
              new o6([e, t, ...r], this.opts).exec(this.client);
            scan(e, t) {
              return new o7([e, t], this.opts).exec(this.client);
            }
            scard = (...e) => new o9(e, this.opts).exec(this.client);
            scriptExists = (...e) => new ae(e, this.opts).exec(this.client);
            scriptFlush = (...e) => new at(e, this.opts).exec(this.client);
            scriptLoad = (...e) => new ar(e, this.opts).exec(this.client);
            sdiff = (...e) => new as(e, this.opts).exec(this.client);
            sdiffstore = (...e) => new an(e, this.opts).exec(this.client);
            set = (e, t, r) => new ai([e, t, r], this.opts).exec(this.client);
            setbit = (...e) => new ao(e, this.opts).exec(this.client);
            setex = (e, t, r) => new aa([e, t, r], this.opts).exec(this.client);
            setnx = (e, t) => new al([e, t], this.opts).exec(this.client);
            setrange = (...e) => new ac(e, this.opts).exec(this.client);
            sinter = (...e) => new ah(e, this.opts).exec(this.client);
            sinterstore = (...e) => new au(e, this.opts).exec(this.client);
            sismember = (e, t) => new ad([e, t], this.opts).exec(this.client);
            smismember = (e, t) => new af([e, t], this.opts).exec(this.client);
            smembers = (...e) => new ap(e, this.opts).exec(this.client);
            smove = (e, t, r) => new am([e, t, r], this.opts).exec(this.client);
            spop = (...e) => new ag(e, this.opts).exec(this.client);
            srandmember = (...e) => new ay(e, this.opts).exec(this.client);
            srem = (e, ...t) => new ab([e, ...t], this.opts).exec(this.client);
            sscan = (...e) => new aw(e, this.opts).exec(this.client);
            strlen = (...e) => new a_(e, this.opts).exec(this.client);
            subscribe = (e) => {
              let t = Array.isArray(e) ? e : [e];
              return new ls(this.client, t);
            };
            sunion = (...e) => new av(e, this.opts).exec(this.client);
            sunionstore = (...e) => new ax(e, this.opts).exec(this.client);
            time = () => new aS().exec(this.client);
            touch = (...e) => new aT(e, this.opts).exec(this.client);
            ttl = (...e) => new aE(e, this.opts).exec(this.client);
            type = (...e) => new aO(e, this.opts).exec(this.client);
            unlink = (...e) => new aA(e, this.opts).exec(this.client);
            xadd = (...e) => new ak(e, this.opts).exec(this.client);
            xack = (...e) => new aR(e, this.opts).exec(this.client);
            xdel = (...e) => new aL(e, this.opts).exec(this.client);
            xgroup = (...e) => new aI(e, this.opts).exec(this.client);
            xread = (...e) => new aq(e, this.opts).exec(this.client);
            xreadgroup = (...e) => new aN(e, this.opts).exec(this.client);
            xinfo = (...e) => new a$(e, this.opts).exec(this.client);
            xlen = (...e) => new aj(e, this.opts).exec(this.client);
            xpending = (...e) => new az(e, this.opts).exec(this.client);
            xclaim = (...e) => new aP(e, this.opts).exec(this.client);
            xautoclaim = (...e) => new aC(e, this.opts).exec(this.client);
            xtrim = (...e) => new aB(e, this.opts).exec(this.client);
            xrange = (...e) => new aM(e, this.opts).exec(this.client);
            xrevrange = (...e) => new aF(e, this.opts).exec(this.client);
            zadd = (...e) => (
              "score" in e[1],
              new aD([e[0], e[1], ...e.slice(2)], this.opts).exec(this.client)
            );
            zcard = (...e) => new aW(e, this.opts).exec(this.client);
            zcount = (...e) => new aU(e, this.opts).exec(this.client);
            zdiffstore = (...e) => new a6(e, this.opts).exec(this.client);
            zincrby = (e, t, r) =>
              new aH([e, t, r], this.opts).exec(this.client);
            zinterstore = (...e) => new aJ(e, this.opts).exec(this.client);
            zlexcount = (...e) => new aX(e, this.opts).exec(this.client);
            zmscore = (...e) => new a7(e, this.opts).exec(this.client);
            zpopmax = (...e) => new aV(e, this.opts).exec(this.client);
            zpopmin = (...e) => new aK(e, this.opts).exec(this.client);
            zrange = (...e) => new aY(e, this.opts).exec(this.client);
            zrank = (e, t) => new aG([e, t], this.opts).exec(this.client);
            zrem = (e, ...t) => new aQ([e, ...t], this.opts).exec(this.client);
            zremrangebylex = (...e) => new aZ(e, this.opts).exec(this.client);
            zremrangebyrank = (...e) => new a0(e, this.opts).exec(this.client);
            zremrangebyscore = (...e) => new a1(e, this.opts).exec(this.client);
            zrevrank = (e, t) => new a2([e, t], this.opts).exec(this.client);
            zscan = (...e) => new a3(e, this.opts).exec(this.client);
            zscore = (e, t) => new a8([e, t], this.opts).exec(this.client);
            zunion = (...e) => new a5(e, this.opts).exec(this.client);
            zunionstore = (...e) => new a4(e, this.opts).exec(this.client);
          };
        "undefined" == typeof atob &&
          (global.atob = (e) => Buffer.from(e, "base64").toString("utf8"));
        var ll = class e extends la {
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
                new ie({
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
            let r =
              process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
            r ||
              console.warn(
                "[Upstash Redis] Unable to find environment variable: `UPSTASH_REDIS_REST_URL`",
              );
            let s =
              process.env.UPSTASH_REDIS_REST_TOKEN ||
              process.env.KV_REST_API_TOKEN;
            return (
              s ||
                console.warn(
                  "[Upstash Redis] Unable to find environment variable: `UPSTASH_REDIS_REST_TOKEN`",
                ),
              new e({ ...t, url: r, token: s })
            );
          }
        };
        let lc =
            "object" == typeof performance &&
            performance &&
            "function" == typeof performance.now
              ? performance
              : Date,
          lh = new Set(),
          lu = "object" == typeof process && process ? process : {},
          ld = (e, t, r, s) => {
            "function" == typeof lu.emitWarning
              ? lu.emitWarning(e, t, r, s)
              : console.error(`[${r}] ${t}: ${e}`);
          },
          lp = globalThis.AbortController,
          lf = globalThis.AbortSignal;
        if (void 0 === lp) {
          (lf = class {
            onabort;
            _onabort = [];
            reason;
            aborted = !1;
            addEventListener(e, t) {
              this._onabort.push(t);
            }
          }),
            (lp = class {
              constructor() {
                t();
              }
              signal = new lf();
              abort(e) {
                if (!this.signal.aborted) {
                  for (let t of ((this.signal.reason = e),
                  (this.signal.aborted = !0),
                  this.signal._onabort))
                    t(e);
                  this.signal.onabort?.(e);
                }
              }
            });
          let e = lu.env?.LRU_CACHE_IGNORE_AC_WARNING !== "1",
            t = () => {
              e &&
                ((e = !1),
                ld(
                  "AbortController is not defined. If using lru-cache in node 14, load an AbortController polyfill from the `node-abort-controller` package. A minimal polyfill is provided for use by LRUCache.fetch(), but it should not be relied upon in other contexts (eg, passing it to other APIs that use AbortController/AbortSignal might have undesirable effects). You may disable this with LRU_CACHE_IGNORE_AC_WARNING=1 in the env.",
                  "NO_ABORT_CONTROLLER",
                  "ENOTSUP",
                  t,
                ));
            };
        }
        let lm = (e) => !lh.has(e);
        Symbol("type");
        let lg = (e) => e && e === Math.floor(e) && e > 0 && isFinite(e),
          ly = (e) =>
            lg(e)
              ? e <= 256
                ? Uint8Array
                : e <= 65536
                  ? Uint16Array
                  : e <= 0x100000000
                    ? Uint32Array
                    : e <= Number.MAX_SAFE_INTEGER
                      ? lb
                      : null
              : null;
        class lb extends Array {
          constructor(e) {
            super(e), this.fill(0);
          }
        }
        class lw {
          heap;
          length;
          static #e = !1;
          static create(e) {
            let t = ly(e);
            if (!t) return [];
            lw.#e = !0;
            let r = new lw(e, t);
            return (lw.#e = !1), r;
          }
          constructor(e, t) {
            if (!lw.#e)
              throw TypeError("instantiate Stack using Stack.create(n)");
            (this.heap = new t(e)), (this.length = 0);
          }
          push(e) {
            this.heap[this.length++] = e;
          }
          pop() {
            return this.heap[--this.length];
          }
        }
        class l_ {
          #t;
          #r;
          #s;
          #n;
          #i;
          #o;
          ttl;
          ttlResolution;
          ttlAutopurge;
          updateAgeOnGet;
          updateAgeOnHas;
          allowStale;
          noDisposeOnSet;
          noUpdateTTL;
          maxEntrySize;
          sizeCalculation;
          noDeleteOnFetchRejection;
          noDeleteOnStaleGet;
          allowStaleOnFetchAbort;
          allowStaleOnFetchRejection;
          ignoreFetchAbort;
          #a;
          #l;
          #c;
          #h;
          #u;
          #d;
          #p;
          #f;
          #m;
          #g;
          #y;
          #b;
          #w;
          #_;
          #v;
          #x;
          #S;
          static unsafeExposeInternals(e) {
            return {
              starts: e.#w,
              ttls: e.#_,
              sizes: e.#b,
              keyMap: e.#c,
              keyList: e.#h,
              valList: e.#u,
              next: e.#d,
              prev: e.#p,
              get head() {
                return e.#f;
              },
              get tail() {
                return e.#m;
              },
              free: e.#g,
              isBackgroundFetch: (t) => e.#T(t),
              backgroundFetch: (t, r, s, n) => e.#E(t, r, s, n),
              moveToTail: (t) => e.#O(t),
              indexes: (t) => e.#A(t),
              rindexes: (t) => e.#R(t),
              isStale: (t) => e.#k(t),
            };
          }
          get max() {
            return this.#t;
          }
          get maxSize() {
            return this.#r;
          }
          get calculatedSize() {
            return this.#l;
          }
          get size() {
            return this.#a;
          }
          get fetchMethod() {
            return this.#i;
          }
          get memoMethod() {
            return this.#o;
          }
          get dispose() {
            return this.#s;
          }
          get disposeAfter() {
            return this.#n;
          }
          constructor(e) {
            let {
              max: t = 0,
              ttl: r,
              ttlResolution: s = 1,
              ttlAutopurge: n,
              updateAgeOnGet: i,
              updateAgeOnHas: o,
              allowStale: a,
              dispose: l,
              disposeAfter: c,
              noDisposeOnSet: h,
              noUpdateTTL: u,
              maxSize: d = 0,
              maxEntrySize: p = 0,
              sizeCalculation: f,
              fetchMethod: m,
              memoMethod: g,
              noDeleteOnFetchRejection: y,
              noDeleteOnStaleGet: b,
              allowStaleOnFetchRejection: w,
              allowStaleOnFetchAbort: _,
              ignoreFetchAbort: v,
            } = e;
            if (0 !== t && !lg(t))
              throw TypeError("max option must be a nonnegative integer");
            let x = t ? ly(t) : Array;
            if (!x) throw Error("invalid max value: " + t);
            if (
              ((this.#t = t),
              (this.#r = d),
              (this.maxEntrySize = p || this.#r),
              (this.sizeCalculation = f),
              this.sizeCalculation)
            ) {
              if (!this.#r && !this.maxEntrySize)
                throw TypeError(
                  "cannot set sizeCalculation without setting maxSize or maxEntrySize",
                );
              if ("function" != typeof this.sizeCalculation)
                throw TypeError("sizeCalculation set to non-function");
            }
            if (void 0 !== g && "function" != typeof g)
              throw TypeError("memoMethod must be a function if defined");
            if (((this.#o = g), void 0 !== m && "function" != typeof m))
              throw TypeError("fetchMethod must be a function if specified");
            if (
              ((this.#i = m),
              (this.#x = !!m),
              (this.#c = new Map()),
              (this.#h = Array(t).fill(void 0)),
              (this.#u = Array(t).fill(void 0)),
              (this.#d = new x(t)),
              (this.#p = new x(t)),
              (this.#f = 0),
              (this.#m = 0),
              (this.#g = lw.create(t)),
              (this.#a = 0),
              (this.#l = 0),
              "function" == typeof l && (this.#s = l),
              "function" == typeof c
                ? ((this.#n = c), (this.#y = []))
                : ((this.#n = void 0), (this.#y = void 0)),
              (this.#v = !!this.#s),
              (this.#S = !!this.#n),
              (this.noDisposeOnSet = !!h),
              (this.noUpdateTTL = !!u),
              (this.noDeleteOnFetchRejection = !!y),
              (this.allowStaleOnFetchRejection = !!w),
              (this.allowStaleOnFetchAbort = !!_),
              (this.ignoreFetchAbort = !!v),
              0 !== this.maxEntrySize)
            ) {
              if (0 !== this.#r && !lg(this.#r))
                throw TypeError(
                  "maxSize must be a positive integer if specified",
                );
              if (!lg(this.maxEntrySize))
                throw TypeError(
                  "maxEntrySize must be a positive integer if specified",
                );
              this.#C();
            }
            if (
              ((this.allowStale = !!a),
              (this.noDeleteOnStaleGet = !!b),
              (this.updateAgeOnGet = !!i),
              (this.updateAgeOnHas = !!o),
              (this.ttlResolution = lg(s) || 0 === s ? s : 1),
              (this.ttlAutopurge = !!n),
              (this.ttl = r || 0),
              this.ttl)
            ) {
              if (!lg(this.ttl))
                throw TypeError("ttl must be a positive integer if specified");
              this.#P();
            }
            if (0 === this.#t && 0 === this.ttl && 0 === this.#r)
              throw TypeError(
                "At least one of max, maxSize, or ttl is required",
              );
            if (!this.ttlAutopurge && !this.#t && !this.#r) {
              let e = "LRU_CACHE_UNBOUNDED";
              lm(e) &&
                (lh.add(e),
                ld(
                  "TTL caching without ttlAutopurge, max, or maxSize can result in unbounded memory consumption.",
                  "UnboundedCacheWarning",
                  e,
                  l_,
                ));
            }
          }
          getRemainingTTL(e) {
            return this.#c.has(e) ? 1 / 0 : 0;
          }
          #P() {
            let e = new lb(this.#t),
              t = new lb(this.#t);
            (this.#_ = e),
              (this.#w = t),
              (this.#L = (r, s, n = lc.now()) => {
                if (
                  ((t[r] = 0 !== s ? n : 0),
                  (e[r] = s),
                  0 !== s && this.ttlAutopurge)
                ) {
                  let e = setTimeout(() => {
                    this.#k(r) && this.#I(this.#h[r], "expire");
                  }, s + 1);
                  e.unref && e.unref();
                }
              }),
              (this.#$ = (r) => {
                t[r] = 0 !== e[r] ? lc.now() : 0;
              }),
              (this.#j = (n, i) => {
                if (e[i]) {
                  let o = e[i],
                    a = t[i];
                  if (!o || !a) return;
                  (n.ttl = o), (n.start = a), (n.now = r || s());
                  let l = n.now - a;
                  n.remainingTTL = o - l;
                }
              });
            let r = 0,
              s = () => {
                let e = lc.now();
                if (this.ttlResolution > 0) {
                  r = e;
                  let t = setTimeout(() => (r = 0), this.ttlResolution);
                  t.unref && t.unref();
                }
                return e;
              };
            (this.getRemainingTTL = (n) => {
              let i = this.#c.get(n);
              if (void 0 === i) return 0;
              let o = e[i],
                a = t[i];
              return o && a ? o - ((r || s()) - a) : 1 / 0;
            }),
              (this.#k = (n) => {
                let i = t[n],
                  o = e[n];
                return !!o && !!i && (r || s()) - i > o;
              });
          }
          #$ = () => {};
          #j = () => {};
          #L = () => {};
          #k = () => !1;
          #C() {
            let e = new lb(this.#t);
            (this.#l = 0),
              (this.#b = e),
              (this.#z = (t) => {
                (this.#l -= e[t]), (e[t] = 0);
              }),
              (this.#M = (e, t, r, s) => {
                if (this.#T(t)) return 0;
                if (!lg(r))
                  if (s) {
                    if ("function" != typeof s)
                      throw TypeError("sizeCalculation must be a function");
                    if (!lg((r = s(t, e))))
                      throw TypeError(
                        "sizeCalculation return invalid (expect positive integer)",
                      );
                  } else
                    throw TypeError(
                      "invalid size value (must be positive integer). When maxSize or maxEntrySize is used, sizeCalculation or size must be set.",
                    );
                return r;
              }),
              (this.#q = (t, r, s) => {
                if (((e[t] = r), this.#r)) {
                  let r = this.#r - e[t];
                  for (; this.#l > r; ) this.#N(!0);
                }
                (this.#l += e[t]),
                  s && ((s.entrySize = r), (s.totalCalculatedSize = this.#l));
              });
          }
          #z = (e) => {};
          #q = (e, t, r) => {};
          #M = (e, t, r, s) => {
            if (r || s)
              throw TypeError(
                "cannot set size without setting maxSize or maxEntrySize on cache",
              );
            return 0;
          };
          *#A({ allowStale: e = this.allowStale } = {}) {
            if (this.#a)
              for (
                let t = this.#m;
                this.#F(t) && ((e || !this.#k(t)) && (yield t), t !== this.#f);

              )
                t = this.#p[t];
          }
          *#R({ allowStale: e = this.allowStale } = {}) {
            if (this.#a)
              for (
                let t = this.#f;
                this.#F(t) && ((e || !this.#k(t)) && (yield t), t !== this.#m);

              )
                t = this.#d[t];
          }
          #F(e) {
            return void 0 !== e && this.#c.get(this.#h[e]) === e;
          }
          *entries() {
            for (let e of this.#A())
              void 0 === this.#u[e] ||
                void 0 === this.#h[e] ||
                this.#T(this.#u[e]) ||
                (yield [this.#h[e], this.#u[e]]);
          }
          *rentries() {
            for (let e of this.#R())
              void 0 === this.#u[e] ||
                void 0 === this.#h[e] ||
                this.#T(this.#u[e]) ||
                (yield [this.#h[e], this.#u[e]]);
          }
          *keys() {
            for (let e of this.#A()) {
              let t = this.#h[e];
              void 0 === t || this.#T(this.#u[e]) || (yield t);
            }
          }
          *rkeys() {
            for (let e of this.#R()) {
              let t = this.#h[e];
              void 0 === t || this.#T(this.#u[e]) || (yield t);
            }
          }
          *values() {
            for (let e of this.#A())
              void 0 === this.#u[e] ||
                this.#T(this.#u[e]) ||
                (yield this.#u[e]);
          }
          *rvalues() {
            for (let e of this.#R())
              void 0 === this.#u[e] ||
                this.#T(this.#u[e]) ||
                (yield this.#u[e]);
          }
          [Symbol.iterator]() {
            return this.entries();
          }
          [Symbol.toStringTag] = "LRUCache";
          find(e, t = {}) {
            for (let r of this.#A()) {
              let s = this.#u[r],
                n = this.#T(s) ? s.__staleWhileFetching : s;
              if (void 0 !== n && e(n, this.#h[r], this))
                return this.get(this.#h[r], t);
            }
          }
          forEach(e, t = this) {
            for (let r of this.#A()) {
              let s = this.#u[r],
                n = this.#T(s) ? s.__staleWhileFetching : s;
              void 0 !== n && e.call(t, n, this.#h[r], this);
            }
          }
          rforEach(e, t = this) {
            for (let r of this.#R()) {
              let s = this.#u[r],
                n = this.#T(s) ? s.__staleWhileFetching : s;
              void 0 !== n && e.call(t, n, this.#h[r], this);
            }
          }
          purgeStale() {
            let e = !1;
            for (let t of this.#R({ allowStale: !0 }))
              this.#k(t) && (this.#I(this.#h[t], "expire"), (e = !0));
            return e;
          }
          info(e) {
            let t = this.#c.get(e);
            if (void 0 === t) return;
            let r = this.#u[t],
              s = this.#T(r) ? r.__staleWhileFetching : r;
            if (void 0 === s) return;
            let n = { value: s };
            if (this.#_ && this.#w) {
              let e = this.#_[t],
                r = this.#w[t];
              e && r && ((n.ttl = e - (lc.now() - r)), (n.start = Date.now()));
            }
            return this.#b && (n.size = this.#b[t]), n;
          }
          dump() {
            let e = [];
            for (let t of this.#A({ allowStale: !0 })) {
              let r = this.#h[t],
                s = this.#u[t],
                n = this.#T(s) ? s.__staleWhileFetching : s;
              if (void 0 === n || void 0 === r) continue;
              let i = { value: n };
              if (this.#_ && this.#w) {
                i.ttl = this.#_[t];
                let e = lc.now() - this.#w[t];
                i.start = Math.floor(Date.now() - e);
              }
              this.#b && (i.size = this.#b[t]), e.unshift([r, i]);
            }
            return e;
          }
          load(e) {
            for (let [t, r] of (this.clear(), e)) {
              if (r.start) {
                let e = Date.now() - r.start;
                r.start = lc.now() - e;
              }
              this.set(t, r.value, r);
            }
          }
          set(e, t, r = {}) {
            if (void 0 === t) return this.delete(e), this;
            let {
                ttl: s = this.ttl,
                start: n,
                noDisposeOnSet: i = this.noDisposeOnSet,
                sizeCalculation: o = this.sizeCalculation,
                status: a,
              } = r,
              { noUpdateTTL: l = this.noUpdateTTL } = r,
              c = this.#M(e, t, r.size || 0, o);
            if (this.maxEntrySize && c > this.maxEntrySize)
              return (
                a && ((a.set = "miss"), (a.maxEntrySizeExceeded = !0)),
                this.#I(e, "set"),
                this
              );
            let h = 0 === this.#a ? void 0 : this.#c.get(e);
            if (void 0 === h)
              (h =
                0 === this.#a
                  ? this.#m
                  : 0 !== this.#g.length
                    ? this.#g.pop()
                    : this.#a === this.#t
                      ? this.#N(!1)
                      : this.#a),
                (this.#h[h] = e),
                (this.#u[h] = t),
                this.#c.set(e, h),
                (this.#d[this.#m] = h),
                (this.#p[h] = this.#m),
                (this.#m = h),
                this.#a++,
                this.#q(h, c, a),
                a && (a.set = "add"),
                (l = !1);
            else {
              this.#O(h);
              let r = this.#u[h];
              if (t !== r) {
                if (this.#x && this.#T(r)) {
                  r.__abortController.abort(Error("replaced"));
                  let { __staleWhileFetching: t } = r;
                  void 0 !== t &&
                    !i &&
                    (this.#v && this.#s?.(t, e, "set"),
                    this.#S && this.#y?.push([t, e, "set"]));
                } else
                  !i &&
                    (this.#v && this.#s?.(r, e, "set"),
                    this.#S && this.#y?.push([r, e, "set"]));
                if ((this.#z(h), this.#q(h, c, a), (this.#u[h] = t), a)) {
                  a.set = "replace";
                  let e = r && this.#T(r) ? r.__staleWhileFetching : r;
                  void 0 !== e && (a.oldValue = e);
                }
              } else a && (a.set = "update");
            }
            if (
              (0 === s || this.#_ || this.#P(),
              this.#_ && (l || this.#L(h, s, n), a && this.#j(a, h)),
              !i && this.#S && this.#y)
            ) {
              let e,
                t = this.#y;
              for (; (e = t?.shift()); ) this.#n?.(...e);
            }
            return this;
          }
          pop() {
            try {
              for (; this.#a; ) {
                let e = this.#u[this.#f];
                if ((this.#N(!0), this.#T(e))) {
                  if (e.__staleWhileFetching) return e.__staleWhileFetching;
                } else if (void 0 !== e) return e;
              }
            } finally {
              if (this.#S && this.#y) {
                let e,
                  t = this.#y;
                for (; (e = t?.shift()); ) this.#n?.(...e);
              }
            }
          }
          #N(e) {
            let t = this.#f,
              r = this.#h[t],
              s = this.#u[t];
            return (
              this.#x && this.#T(s)
                ? s.__abortController.abort(Error("evicted"))
                : (this.#v || this.#S) &&
                  (this.#v && this.#s?.(s, r, "evict"),
                  this.#S && this.#y?.push([s, r, "evict"])),
              this.#z(t),
              e &&
                ((this.#h[t] = void 0), (this.#u[t] = void 0), this.#g.push(t)),
              1 === this.#a
                ? ((this.#f = this.#m = 0), (this.#g.length = 0))
                : (this.#f = this.#d[t]),
              this.#c.delete(r),
              this.#a--,
              t
            );
          }
          has(e, t = {}) {
            let { updateAgeOnHas: r = this.updateAgeOnHas, status: s } = t,
              n = this.#c.get(e);
            if (void 0 !== n) {
              let e = this.#u[n];
              if (this.#T(e) && void 0 === e.__staleWhileFetching) return !1;
              if (!this.#k(n))
                return (
                  r && this.#$(n), s && ((s.has = "hit"), this.#j(s, n)), !0
                );
              s && ((s.has = "stale"), this.#j(s, n));
            } else s && (s.has = "miss");
            return !1;
          }
          peek(e, t = {}) {
            let { allowStale: r = this.allowStale } = t,
              s = this.#c.get(e);
            if (void 0 === s || (!r && this.#k(s))) return;
            let n = this.#u[s];
            return this.#T(n) ? n.__staleWhileFetching : n;
          }
          #E(e, t, r, s) {
            let n = void 0 === t ? void 0 : this.#u[t];
            if (this.#T(n)) return n;
            let i = new lp(),
              { signal: o } = r;
            o?.addEventListener("abort", () => i.abort(o.reason), {
              signal: i.signal,
            });
            let a = { signal: i.signal, options: r, context: s },
              l = (s, n = !1) => {
                let { aborted: o } = i.signal,
                  l = r.ignoreFetchAbort && void 0 !== s;
                return (r.status &&
                  (o && !n
                    ? ((r.status.fetchAborted = !0),
                      (r.status.fetchError = i.signal.reason),
                      l && (r.status.fetchAbortIgnored = !0))
                    : (r.status.fetchResolved = !0)),
                !o || l || n)
                  ? (this.#u[t] === h &&
                      (void 0 === s
                        ? h.__staleWhileFetching
                          ? (this.#u[t] = h.__staleWhileFetching)
                          : this.#I(e, "fetch")
                        : (r.status && (r.status.fetchUpdated = !0),
                          this.set(e, s, a.options))),
                    s)
                  : c(i.signal.reason);
              },
              c = (s) => {
                let { aborted: n } = i.signal,
                  o = n && r.allowStaleOnFetchAbort,
                  a = o || r.allowStaleOnFetchRejection,
                  l = a || r.noDeleteOnFetchRejection;
                if (
                  (this.#u[t] === h &&
                    (l && void 0 !== h.__staleWhileFetching
                      ? o || (this.#u[t] = h.__staleWhileFetching)
                      : this.#I(e, "fetch")),
                  a)
                )
                  return (
                    r.status &&
                      void 0 !== h.__staleWhileFetching &&
                      (r.status.returnedStale = !0),
                    h.__staleWhileFetching
                  );
                if (h.__returned === h) throw s;
              };
            r.status && (r.status.fetchDispatched = !0);
            let h = new Promise((t, s) => {
                let o = this.#i?.(e, n, a);
                o &&
                  o instanceof Promise &&
                  o.then((e) => t(void 0 === e ? void 0 : e), s),
                  i.signal.addEventListener("abort", () => {
                    (!r.ignoreFetchAbort || r.allowStaleOnFetchAbort) &&
                      (t(void 0),
                      r.allowStaleOnFetchAbort && (t = (e) => l(e, !0)));
                  });
              }).then(
                l,
                (e) => (
                  r.status &&
                    ((r.status.fetchRejected = !0), (r.status.fetchError = e)),
                  c(e)
                ),
              ),
              u = Object.assign(h, {
                __abortController: i,
                __staleWhileFetching: n,
                __returned: void 0,
              });
            return (
              void 0 === t
                ? (this.set(e, u, { ...a.options, status: void 0 }),
                  (t = this.#c.get(e)))
                : (this.#u[t] = u),
              u
            );
          }
          #T(e) {
            return (
              !!this.#x &&
              !!e &&
              e instanceof Promise &&
              e.hasOwnProperty("__staleWhileFetching") &&
              e.__abortController instanceof lp
            );
          }
          async fetch(e, t = {}) {
            let {
              allowStale: r = this.allowStale,
              updateAgeOnGet: s = this.updateAgeOnGet,
              noDeleteOnStaleGet: n = this.noDeleteOnStaleGet,
              ttl: i = this.ttl,
              noDisposeOnSet: o = this.noDisposeOnSet,
              size: a = 0,
              sizeCalculation: l = this.sizeCalculation,
              noUpdateTTL: c = this.noUpdateTTL,
              noDeleteOnFetchRejection: h = this.noDeleteOnFetchRejection,
              allowStaleOnFetchRejection: u = this.allowStaleOnFetchRejection,
              ignoreFetchAbort: d = this.ignoreFetchAbort,
              allowStaleOnFetchAbort: p = this.allowStaleOnFetchAbort,
              context: f,
              forceRefresh: m = !1,
              status: g,
              signal: y,
            } = t;
            if (!this.#x)
              return (
                g && (g.fetch = "get"),
                this.get(e, {
                  allowStale: r,
                  updateAgeOnGet: s,
                  noDeleteOnStaleGet: n,
                  status: g,
                })
              );
            let b = {
                allowStale: r,
                updateAgeOnGet: s,
                noDeleteOnStaleGet: n,
                ttl: i,
                noDisposeOnSet: o,
                size: a,
                sizeCalculation: l,
                noUpdateTTL: c,
                noDeleteOnFetchRejection: h,
                allowStaleOnFetchRejection: u,
                allowStaleOnFetchAbort: p,
                ignoreFetchAbort: d,
                status: g,
                signal: y,
              },
              w = this.#c.get(e);
            if (void 0 === w) {
              g && (g.fetch = "miss");
              let t = this.#E(e, w, b, f);
              return (t.__returned = t);
            }
            {
              let t = this.#u[w];
              if (this.#T(t)) {
                let e = r && void 0 !== t.__staleWhileFetching;
                return (
                  g && ((g.fetch = "inflight"), e && (g.returnedStale = !0)),
                  e ? t.__staleWhileFetching : (t.__returned = t)
                );
              }
              let n = this.#k(w);
              if (!m && !n)
                return (
                  g && (g.fetch = "hit"),
                  this.#O(w),
                  s && this.#$(w),
                  g && this.#j(g, w),
                  t
                );
              let i = this.#E(e, w, b, f),
                o = void 0 !== i.__staleWhileFetching && r;
              return (
                g &&
                  ((g.fetch = n ? "stale" : "refresh"),
                  o && n && (g.returnedStale = !0)),
                o ? i.__staleWhileFetching : (i.__returned = i)
              );
            }
          }
          async forceFetch(e, t = {}) {
            let r = await this.fetch(e, t);
            if (void 0 === r) throw Error("fetch() returned undefined");
            return r;
          }
          memo(e, t = {}) {
            let r = this.#o;
            if (!r) throw Error("no memoMethod provided to constructor");
            let { context: s, forceRefresh: n, ...i } = t,
              o = this.get(e, i);
            if (!n && void 0 !== o) return o;
            let a = r(e, o, { options: i, context: s });
            return this.set(e, a, i), a;
          }
          get(e, t = {}) {
            let {
                allowStale: r = this.allowStale,
                updateAgeOnGet: s = this.updateAgeOnGet,
                noDeleteOnStaleGet: n = this.noDeleteOnStaleGet,
                status: i,
              } = t,
              o = this.#c.get(e);
            if (void 0 !== o) {
              let t = this.#u[o],
                a = this.#T(t);
              return (i && this.#j(i, o), this.#k(o))
                ? (i && (i.get = "stale"), a)
                  ? (i &&
                      r &&
                      void 0 !== t.__staleWhileFetching &&
                      (i.returnedStale = !0),
                    r ? t.__staleWhileFetching : void 0)
                  : (n || this.#I(e, "expire"),
                    i && r && (i.returnedStale = !0),
                    r ? t : void 0)
                : (i && (i.get = "hit"), a)
                  ? t.__staleWhileFetching
                  : (this.#O(o), s && this.#$(o), t);
            }
            i && (i.get = "miss");
          }
          #B(e, t) {
            (this.#p[t] = e), (this.#d[e] = t);
          }
          #O(e) {
            e !== this.#m &&
              (e === this.#f
                ? (this.#f = this.#d[e])
                : this.#B(this.#p[e], this.#d[e]),
              this.#B(this.#m, e),
              (this.#m = e));
          }
          delete(e) {
            return this.#I(e, "delete");
          }
          #I(e, t) {
            let r = !1;
            if (0 !== this.#a) {
              let s = this.#c.get(e);
              if (void 0 !== s)
                if (((r = !0), 1 === this.#a)) this.#D(t);
                else {
                  this.#z(s);
                  let r = this.#u[s];
                  if (
                    (this.#T(r)
                      ? r.__abortController.abort(Error("deleted"))
                      : (this.#v || this.#S) &&
                        (this.#v && this.#s?.(r, e, t),
                        this.#S && this.#y?.push([r, e, t])),
                    this.#c.delete(e),
                    (this.#h[s] = void 0),
                    (this.#u[s] = void 0),
                    s === this.#m)
                  )
                    this.#m = this.#p[s];
                  else if (s === this.#f) this.#f = this.#d[s];
                  else {
                    let e = this.#p[s];
                    this.#d[e] = this.#d[s];
                    let t = this.#d[s];
                    this.#p[t] = this.#p[s];
                  }
                  this.#a--, this.#g.push(s);
                }
            }
            if (this.#S && this.#y?.length) {
              let e,
                t = this.#y;
              for (; (e = t?.shift()); ) this.#n?.(...e);
            }
            return r;
          }
          clear() {
            return this.#D("delete");
          }
          #D(e) {
            for (let t of this.#R({ allowStale: !0 })) {
              let r = this.#u[t];
              if (this.#T(r)) r.__abortController.abort(Error("deleted"));
              else {
                let s = this.#h[t];
                this.#v && this.#s?.(r, s, e),
                  this.#S && this.#y?.push([r, s, e]);
              }
            }
            if (
              (this.#c.clear(),
              this.#u.fill(void 0),
              this.#h.fill(void 0),
              this.#_ && this.#w && (this.#_.fill(0), this.#w.fill(0)),
              this.#b && this.#b.fill(0),
              (this.#f = 0),
              (this.#m = 0),
              (this.#g.length = 0),
              (this.#l = 0),
              (this.#a = 0),
              this.#S && this.#y)
            ) {
              let e,
                t = this.#y;
              for (; (e = t?.shift()); ) this.#n?.(...e);
            }
          }
        }
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
        let lv = process.env.UPSTASH_REDIS_REST_URL,
          lx = process.env.UPSTASH_REDIS_REST_TOKEN,
          lS = null,
          lT = !1;
        function lE() {
          return (
            lT ||
              ((lS = (function () {
                if (!lv || !lx)
                  return (
                    console.warn(
                      "[Redis Client] Missing Redis URL or Token in environment variables. Redis client will not be initialized.",
                    ),
                    null
                  );
                try {
                  return new ll({
                    url: lv,
                    token: lx,
                    retry: {
                      retries: 3,
                      backoff: (e) => Math.min(50 * e, 1e3),
                    },
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
              (lT = !0)),
            lS
          );
        }
        lE();
        class lO {
          constructor(e = {}) {
            (this.redisClientInternal = null),
              (this.redisClientInternal = lE()),
              this.redisClientInternal ||
                console.warn(
                  "[CacheManager] Redis client is not available. CacheManager will operate in LRU-only mode.",
                ),
              (this.redisKeyPrefix = e.redisKeyPrefix || "cacheManager:"),
              (this.lruCache = new l_({
                max: e.maxSize || 500,
                ttl: e.ttl || 36e5,
              }));
          }
          getPrefixedKey(e) {
            return `${this.redisKeyPrefix}${e}`;
          }
          async get(e) {
            if (this.redisClientInternal) {
              let t = this.getPrefixedKey(e);
              try {
                let e = await this.redisClientInternal.get(t);
                if (null != e) return e;
              } catch (e) {
                console.error(`CacheManager: Redis get error for key ${t}:`, e);
              }
            }
            return this.lruCache.get(e) || null;
          }
          async set(e, t, r) {
            if (this.redisClientInternal) {
              let s = this.getPrefixedKey(e);
              try {
                await this.redisClientInternal.set(s, t, { ex: r || 3600 });
              } catch (e) {
                console.error(`CacheManager: Redis set error for key ${s}:`, e);
              }
            }
            this.lruCache.set(e, t, { ttl: r ? 1e3 * r : void 0 });
          }
          async delete(e) {
            if (this.redisClientInternal) {
              let t = this.getPrefixedKey(e);
              try {
                await this.redisClientInternal.del(t);
              } catch (e) {
                console.error(
                  `CacheManager: Redis delete error for key ${t}:`,
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
                      match: `${this.redisKeyPrefix}*`,
                      count: 100,
                    }),
                    r = Number(t[0]),
                    s = t[1];
                  s.length > 0 && (await this.redisClientInternal.del(...s)),
                    (e = r);
                } while (0 !== e);
              } catch (e) {
                console.error(
                  `CacheManager: Error clearing Redis keys with prefix "${this.redisKeyPrefix}":`,
                  e,
                );
              }
            }
            this.lruCache.clear();
          }
        }
        let lA = new lO();
        class lR {
          constructor(e, t) {
            (this.openai = new n1({ apiKey: e })), (this.supabase = t);
          }
          async deepResearch(e, t) {
            try {
              let r = `research:${JSON.stringify({ query: e, options: t })}`,
                s = await lA.get(r);
              if (s) return s;
              let n = (await this.getRelevantContent(e, t))
                  .map((e) => e.content)
                  .join("\n---\n"),
                i = this.getSystemPrompt(t.depth || "detailed"),
                o = (
                  await this.openai.chat.completions.create({
                    model: "gpt-4-turbo-preview",
                    messages: [
                      { role: "system", content: i },
                      {
                        role: "user",
                        content: `Research Query: ${e}

Context:
${n}`,
                      },
                    ],
                    temperature: 0.3,
                    max_tokens: 3e3,
                  })
                ).choices[0].message.content;
              if (!o) throw Error("Failed to generate research");
              return await lA.set(r, o, 3600), o;
            } catch (e) {
              throw (console.error("Research error:", e), e);
            }
          }
          getSystemPrompt(e) {
            let t = `You are an expert immigration research system. Analyze the provided information and generate a comprehensive research report.

Instructions:
1. Structure the analysis clearly with sections and subsections
2. Focus on accuracy and detail
3. Cite specific requirements and conditions
4. Include relevant timelines and deadlines
5. Note any exceptions or special cases
6. Consider cost implications
7. Reference official sources when available
8. Highlight key points and takeaways`;
            switch (e) {
              case "basic":
                return `${t}

Provide a basic overview focusing on key points and essential information.`;
              case "comprehensive":
                return `${t}

Provide an exhaustive analysis including:
- Historical context and policy evolution
- Comparative analysis with similar policies
- Statistical data and trends
- Expert opinions and interpretations
- Future outlook and potential changes
- Risk analysis and mitigation strategies
- Alternative pathways and options
- Case studies and precedents`;
              default:
                return `${t}

Provide a detailed analysis balancing depth with clarity.`;
            }
          }
          async getRelevantContent(e, t) {
            let { data: r, error: s } = await this.supabase
              .from("documents")
              .select("*")
              .textSearch("content", e)
              .eq("country", t.country || "")
              .eq("category", t.category || "")
              .limit(10);
            if (s) throw s;
            return r || [];
          }
        }
      },
      73024: (e) => {
        "use strict";
        e.exports = require("node:fs");
      },
      73566: (e) => {
        "use strict";
        e.exports = require("worker_threads");
      },
      73668: (e, t, r) => {
        "use strict";
        let s = r(81630).Agent,
          n = r(25601),
          i = r(28354).debuglog("agentkeepalive"),
          {
            INIT_SOCKET: o,
            CURRENT_ID: a,
            CREATE_ID: l,
            SOCKET_CREATED_TIME: c,
            SOCKET_NAME: h,
            SOCKET_REQUEST_COUNT: u,
            SOCKET_REQUEST_FINISHED_COUNT: d,
          } = r(74072),
          p = 1,
          f = parseInt(process.version.split(".", 1)[0].substring(1));
        function m(e) {
          console.log("[agentkeepalive:deprecated] %s", e);
        }
        f >= 11 && f <= 12 ? (p = 2) : f >= 13 && (p = 3);
        class g extends s {
          constructor(e) {
            ((e = e || {}).keepAlive = !1 !== e.keepAlive),
              void 0 === e.freeSocketTimeout && (e.freeSocketTimeout = 4e3),
              e.keepAliveTimeout &&
                (m(
                  "options.keepAliveTimeout is deprecated, please use options.freeSocketTimeout instead",
                ),
                (e.freeSocketTimeout = e.keepAliveTimeout),
                delete e.keepAliveTimeout),
              e.freeSocketKeepAliveTimeout &&
                (m(
                  "options.freeSocketKeepAliveTimeout is deprecated, please use options.freeSocketTimeout instead",
                ),
                (e.freeSocketTimeout = e.freeSocketKeepAliveTimeout),
                delete e.freeSocketKeepAliveTimeout),
              void 0 === e.timeout &&
                (e.timeout = Math.max(2 * e.freeSocketTimeout, 8e3)),
              (e.timeout = n(e.timeout)),
              (e.freeSocketTimeout = n(e.freeSocketTimeout)),
              (e.socketActiveTTL = e.socketActiveTTL
                ? n(e.socketActiveTTL)
                : 0),
              super(e),
              (this[a] = 0),
              (this.createSocketCount = 0),
              (this.createSocketCountLastCheck = 0),
              (this.createSocketErrorCount = 0),
              (this.createSocketErrorCountLastCheck = 0),
              (this.closeSocketCount = 0),
              (this.closeSocketCountLastCheck = 0),
              (this.errorSocketCount = 0),
              (this.errorSocketCountLastCheck = 0),
              (this.requestCount = 0),
              (this.requestCountLastCheck = 0),
              (this.timeoutSocketCount = 0),
              (this.timeoutSocketCountLastCheck = 0),
              this.on("free", (e) => {
                let t = this.calcSocketTimeout(e);
                t > 0 && e.timeout !== t && e.setTimeout(t);
              });
          }
          get freeSocketKeepAliveTimeout() {
            return (
              m(
                "agent.freeSocketKeepAliveTimeout is deprecated, please use agent.options.freeSocketTimeout instead",
              ),
              this.options.freeSocketTimeout
            );
          }
          get timeout() {
            return (
              m(
                "agent.timeout is deprecated, please use agent.options.timeout instead",
              ),
              this.options.timeout
            );
          }
          get socketActiveTTL() {
            return (
              m(
                "agent.socketActiveTTL is deprecated, please use agent.options.socketActiveTTL instead",
              ),
              this.options.socketActiveTTL
            );
          }
          calcSocketTimeout(e) {
            let t = this.options.freeSocketTimeout,
              r = this.options.socketActiveTTL;
            if (r) {
              let s = r - (Date.now() - e[c]);
              if (s <= 0) return s;
              t && s < t && (t = s);
            }
            if (t)
              return e.freeSocketTimeout || e.freeSocketKeepAliveTimeout || t;
          }
          keepSocketAlive(e) {
            let t = super.keepSocketAlive(e);
            if (!t) return t;
            let r = this.calcSocketTimeout(e);
            return (
              void 0 === r ||
              (r <= 0
                ? (i(
                    "%s(requests: %s, finished: %s) free but need to destroy by TTL, request count %s, diff is %s",
                    e[h],
                    e[u],
                    e[d],
                    r,
                  ),
                  !1)
                : (e.timeout !== r && e.setTimeout(r), !0))
            );
          }
          reuseSocket(...e) {
            super.reuseSocket(...e);
            let t = e[0];
            e[1].reusedSocket = !0;
            let r = this.options.timeout;
            y(t) !== r &&
              (t.setTimeout(r), i("%s reset timeout to %sms", t[h], r)),
              t[u]++,
              i(
                "%s(requests: %s, finished: %s) reuse on addRequest, timeout %sms",
                t[h],
                t[u],
                t[d],
                y(t),
              );
          }
          [l]() {
            let e = this[a]++;
            return this[a] === Number.MAX_SAFE_INTEGER && (this[a] = 0), e;
          }
          [o](e, t) {
            t.timeout && (y(e) || e.setTimeout(t.timeout)),
              this.options.keepAlive && e.setNoDelay(!0),
              this.createSocketCount++,
              this.options.socketActiveTTL && (e[c] = Date.now()),
              (e[h] = `sock[${this[l]()}#${t._agentKey}]`.split(
                "-----BEGIN",
                1,
              )[0]),
              (e[u] = 1),
              (e[d] = 0),
              (function (e, t, r) {
                function s() {
                  if (!t._httpMessage && 1 === t[u]) return;
                  t[d]++,
                    e.requestCount++,
                    i("%s(requests: %s, finished: %s) free", t[h], t[u], t[d]);
                  let s = e.getName(r);
                  t.writable &&
                    e.requests[s] &&
                    e.requests[s].length &&
                    (t[u]++,
                    i(
                      "%s(requests: %s, finished: %s) will be reuse on agent free event",
                      t[h],
                      t[u],
                      t[d],
                    ));
                }
                function n(r) {
                  i(
                    "%s(requests: %s, finished: %s) close, isError: %s",
                    t[h],
                    t[u],
                    t[d],
                    r,
                  ),
                    e.closeSocketCount++;
                }
                function o() {
                  let s = t.listeners("timeout").length,
                    n = y(t),
                    o = t._httpMessage,
                    a = (o && o.listeners("timeout").length) || 0;
                  i(
                    "%s(requests: %s, finished: %s) timeout after %sms, listeners %s, defaultTimeoutListenerCount %s, hasHttpRequest %s, HttpRequest timeoutListenerCount %s",
                    t[h],
                    t[u],
                    t[d],
                    n,
                    s,
                    p,
                    !!o,
                    a,
                  ),
                    i.enabled &&
                      i(
                        "timeout listeners: %s",
                        t
                          .listeners("timeout")
                          .map((e) => e.name)
                          .join(", "),
                      ),
                    e.timeoutSocketCount++;
                  let l = e.getName(r);
                  if (e.freeSockets[l] && -1 !== e.freeSockets[l].indexOf(t))
                    t.destroy(),
                      e.removeSocket(t, r),
                      i("%s is free, destroy quietly", t[h]);
                  else if (0 === a) {
                    let s = Error("Socket timeout");
                    (s.code = "ERR_SOCKET_TIMEOUT"),
                      (s.timeout = n),
                      t.destroy(s),
                      e.removeSocket(t, r),
                      i("%s destroy with timeout error", t[h]);
                  }
                }
                function a(r) {
                  let s = t.listeners("error").length;
                  i(
                    "%s(requests: %s, finished: %s) error: %s, listenerCount: %s",
                    t[h],
                    t[u],
                    t[d],
                    r,
                    s,
                  ),
                    e.errorSocketCount++,
                    1 === s &&
                      (i("%s emit uncaught error event", t[h]),
                      t.removeListener("error", a),
                      t.emit("error", r));
                }
                i("%s create, timeout %sms", t[h], y(t)),
                  t.on("free", s),
                  t.on("close", n),
                  t.on("timeout", o),
                  t.on("error", a),
                  t.on("agentRemove", function e() {
                    i(
                      "%s(requests: %s, finished: %s) agentRemove",
                      t[h],
                      t[u],
                      t[d],
                    ),
                      t.removeListener("close", n),
                      t.removeListener("error", a),
                      t.removeListener("free", s),
                      t.removeListener("timeout", o),
                      t.removeListener("agentRemove", e);
                  });
              })(this, e, t);
          }
          createConnection(e, t) {
            let r = !1,
              s = (s, n) => {
                if (!r) {
                  if (((r = !0), s)) return this.createSocketErrorCount++, t(s);
                  this[o](n, e), t(s, n);
                }
              },
              n = super.createConnection(e, s);
            return n && s(null, n), n;
          }
          get statusChanged() {
            let e =
              this.createSocketCount !== this.createSocketCountLastCheck ||
              this.createSocketErrorCount !==
                this.createSocketErrorCountLastCheck ||
              this.closeSocketCount !== this.closeSocketCountLastCheck ||
              this.errorSocketCount !== this.errorSocketCountLastCheck ||
              this.timeoutSocketCount !== this.timeoutSocketCountLastCheck ||
              this.requestCount !== this.requestCountLastCheck;
            return (
              e &&
                ((this.createSocketCountLastCheck = this.createSocketCount),
                (this.createSocketErrorCountLastCheck =
                  this.createSocketErrorCount),
                (this.closeSocketCountLastCheck = this.closeSocketCount),
                (this.errorSocketCountLastCheck = this.errorSocketCount),
                (this.timeoutSocketCountLastCheck = this.timeoutSocketCount),
                (this.requestCountLastCheck = this.requestCount)),
              e
            );
          }
          getCurrentStatus() {
            return {
              createSocketCount: this.createSocketCount,
              createSocketErrorCount: this.createSocketErrorCount,
              closeSocketCount: this.closeSocketCount,
              errorSocketCount: this.errorSocketCount,
              timeoutSocketCount: this.timeoutSocketCount,
              requestCount: this.requestCount,
              freeSockets: b(this.freeSockets),
              sockets: b(this.sockets),
              requests: b(this.requests),
            };
          }
        }
        function y(e) {
          return e.timeout || e._idleTimeout;
        }
        function b(e) {
          let t = {};
          for (let r in e) t[r] = e[r].length;
          return t;
        }
        e.exports = g;
      },
      74072: (e) => {
        "use strict";
        e.exports = {
          CURRENT_ID: Symbol("agentkeepalive#currentId"),
          CREATE_ID: Symbol("agentkeepalive#createId"),
          INIT_SOCKET: Symbol("agentkeepalive#initSocket"),
          CREATE_HTTPS_CONNECTION: Symbol(
            "agentkeepalive#createHttpsConnection",
          ),
          SOCKET_CREATED_TIME: Symbol("agentkeepalive#socketCreatedTime"),
          SOCKET_NAME: Symbol("agentkeepalive#socketName"),
          SOCKET_REQUEST_COUNT: Symbol("agentkeepalive#socketRequestCount"),
          SOCKET_REQUEST_FINISHED_COUNT: Symbol(
            "agentkeepalive#socketRequestFinishedCount",
          ),
        };
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
      77598: (e) => {
        "use strict";
        e.exports = require("node:crypto");
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
      79897: (e, t, r) => {
        "use strict";
        r.d(t, { Y: () => rn });
        let s =
          "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
            ? Symbol
            : (e) => `Symbol(${e})`;
        function n() {}
        function i(e) {
          return ("object" == typeof e && null !== e) || "function" == typeof e;
        }
        function o(e, t) {
          try {
            Object.defineProperty(e, "name", { value: t, configurable: !0 });
          } catch (e) {}
        }
        let a = Promise,
          l = Promise.prototype.then,
          c = Promise.resolve.bind(a),
          h = Promise.reject.bind(a);
        function u(e) {
          return new a(e);
        }
        function d(e, t, r) {
          return l.call(e, t, r);
        }
        function p(e, t, r) {
          d(d(e, t, r), void 0, n);
        }
        function f(e) {
          d(e, void 0, n);
        }
        let m = (e) => {
          if ("function" == typeof queueMicrotask) m = queueMicrotask;
          else {
            let e = c(void 0);
            m = (t) => d(e, t);
          }
          return m(e);
        };
        function g(e, t, r) {
          if ("function" != typeof e)
            throw TypeError("Argument is not a function");
          return Function.prototype.apply.call(e, t, r);
        }
        function y(e, t, r) {
          try {
            var s;
            return (s = g(e, t, r)), c(s);
          } catch (e) {
            return h(e);
          }
        }
        class b {
          constructor() {
            (this._cursor = 0),
              (this._size = 0),
              (this._front = { _elements: [], _next: void 0 }),
              (this._back = this._front),
              (this._cursor = 0),
              (this._size = 0);
          }
          get length() {
            return this._size;
          }
          push(e) {
            let t = this._back,
              r = t;
            16383 === t._elements.length &&
              (r = { _elements: [], _next: void 0 }),
              t._elements.push(e),
              r !== t && ((this._back = r), (t._next = r)),
              ++this._size;
          }
          shift() {
            let e = this._front,
              t = e,
              r = this._cursor,
              s = r + 1,
              n = e._elements,
              i = n[r];
            return (
              16384 === s && ((t = e._next), (s = 0)),
              --this._size,
              (this._cursor = s),
              e !== t && (this._front = t),
              (n[r] = void 0),
              i
            );
          }
          forEach(e) {
            let t = this._cursor,
              r = this._front,
              s = r._elements;
            for (
              ;
              !(
                (t === s.length && void 0 === r._next) ||
                (t === s.length &&
                  ((s = (r = r._next)._elements), (t = 0), 0 === s.length))
              );

            )
              e(s[t]), ++t;
          }
          peek() {
            let e = this._front,
              t = this._cursor;
            return e._elements[t];
          }
        }
        let w = s("[[AbortSteps]]"),
          _ = s("[[ErrorSteps]]"),
          v = s("[[CancelSteps]]"),
          x = s("[[PullSteps]]"),
          S = s("[[ReleaseSteps]]");
        function T(e, t) {
          var r, s;
          (e._ownerReadableStream = t),
            (t._reader = e),
            "readable" === t._state
              ? R(e)
              : "closed" === t._state
                ? (R(e), C(e))
                : ((r = e), (s = t._storedError), R(r), k(r, s));
        }
        function E(e, t) {
          return tO(e._ownerReadableStream, t);
        }
        function O(e) {
          var t, r;
          let s = e._ownerReadableStream;
          "readable" === s._state
            ? k(
                e,
                TypeError(
                  "Reader was released and can no longer be used to monitor the stream's closedness",
                ),
              )
            : ((t = e),
              (r = TypeError(
                "Reader was released and can no longer be used to monitor the stream's closedness",
              )),
              R(t),
              k(t, r)),
            s._readableStreamController[S](),
            (s._reader = void 0),
            (e._ownerReadableStream = void 0);
        }
        function A(e) {
          return TypeError("Cannot " + e + " a stream using a released reader");
        }
        function R(e) {
          e._closedPromise = u((t, r) => {
            (e._closedPromise_resolve = t), (e._closedPromise_reject = r);
          });
        }
        function k(e, t) {
          void 0 !== e._closedPromise_reject &&
            (f(e._closedPromise),
            e._closedPromise_reject(t),
            (e._closedPromise_resolve = void 0),
            (e._closedPromise_reject = void 0));
        }
        function C(e) {
          void 0 !== e._closedPromise_resolve &&
            (e._closedPromise_resolve(void 0),
            (e._closedPromise_resolve = void 0),
            (e._closedPromise_reject = void 0));
        }
        let P =
            Number.isFinite ||
            function (e) {
              return "number" == typeof e && isFinite(e);
            },
          L =
            Math.trunc ||
            function (e) {
              return e < 0 ? Math.ceil(e) : Math.floor(e);
            };
        function I(e, t) {
          if (void 0 !== e && "object" != typeof e && "function" != typeof e)
            throw TypeError(`${t} is not an object.`);
        }
        function $(e, t) {
          if ("function" != typeof e)
            throw TypeError(`${t} is not a function.`);
        }
        function j(e, t) {
          if (("object" != typeof e || null === e) && "function" != typeof e)
            throw TypeError(`${t} is not an object.`);
        }
        function z(e, t, r) {
          if (void 0 === e)
            throw TypeError(`Parameter ${t} is required in '${r}'.`);
        }
        function M(e, t, r) {
          if (void 0 === e) throw TypeError(`${t} is required in '${r}'.`);
        }
        function q(e) {
          return Number(e);
        }
        function N(e, t) {
          var r, s;
          let n = Number.MAX_SAFE_INTEGER,
            i = Number(e);
          if (!P((i = 0 === (r = i) ? 0 : r)))
            throw TypeError(`${t} is not a finite number`);
          if ((i = 0 === (s = L(i)) ? 0 : s) < 0 || i > n)
            throw TypeError(
              `${t} is outside the accepted range of 0 to ${n}, inclusive`,
            );
          return P(i) && 0 !== i ? i : 0;
        }
        function F(e) {
          if (!i(e) || "function" != typeof e.getReader) return !1;
          try {
            return "boolean" == typeof e.locked;
          } catch (e) {
            return !1;
          }
        }
        function B(e) {
          if (!i(e) || "function" != typeof e.getWriter) return !1;
          try {
            return "boolean" == typeof e.locked;
          } catch (e) {
            return !1;
          }
        }
        function D(e, t) {
          if (!tT(e)) throw TypeError(`${t} is not a ReadableStream.`);
        }
        function W(e, t) {
          e._reader._readRequests.push(t);
        }
        function U(e, t, r) {
          let s = e._reader._readRequests.shift();
          r ? s._closeSteps() : s._chunkSteps(t);
        }
        function H(e) {
          return e._reader._readRequests.length;
        }
        function J(e) {
          let t = e._reader;
          return void 0 !== t && !!V(t);
        }
        class X {
          constructor(e) {
            if (
              (z(e, 1, "ReadableStreamDefaultReader"),
              D(e, "First parameter"),
              tE(e))
            )
              throw TypeError(
                "This stream has already been locked for exclusive reading by another reader",
              );
            T(this, e), (this._readRequests = new b());
          }
          get closed() {
            return V(this) ? this._closedPromise : h(Y("closed"));
          }
          cancel(e) {
            return V(this)
              ? void 0 === this._ownerReadableStream
                ? h(A("cancel"))
                : E(this, e)
              : h(Y("cancel"));
          }
          read() {
            let e, t;
            if (!V(this)) return h(Y("read"));
            if (void 0 === this._ownerReadableStream) return h(A("read from"));
            let r = u((r, s) => {
              (e = r), (t = s);
            });
            return (
              (function (e, t) {
                let r = e._ownerReadableStream;
                (r._disturbed = !0),
                  "closed" === r._state
                    ? t._closeSteps()
                    : "errored" === r._state
                      ? t._errorSteps(r._storedError)
                      : r._readableStreamController[x](t);
              })(this, {
                _chunkSteps: (t) => e({ value: t, done: !1 }),
                _closeSteps: () => e({ value: void 0, done: !0 }),
                _errorSteps: (e) => t(e),
              }),
              r
            );
          }
          releaseLock() {
            if (!V(this)) throw Y("releaseLock");
            void 0 !== this._ownerReadableStream &&
              (O(this), K(this, TypeError("Reader was released")));
          }
        }
        function V(e) {
          return (
            !!i(e) &&
            !!Object.prototype.hasOwnProperty.call(e, "_readRequests") &&
            e instanceof X
          );
        }
        function K(e, t) {
          let r = e._readRequests;
          (e._readRequests = new b()),
            r.forEach((e) => {
              e._errorSteps(t);
            });
        }
        function Y(e) {
          return TypeError(
            `ReadableStreamDefaultReader.prototype.${e} can only be used on a ReadableStreamDefaultReader`,
          );
        }
        Object.defineProperties(X.prototype, {
          cancel: { enumerable: !0 },
          read: { enumerable: !0 },
          releaseLock: { enumerable: !0 },
          closed: { enumerable: !0 },
        }),
          o(X.prototype.cancel, "cancel"),
          o(X.prototype.read, "read"),
          o(X.prototype.releaseLock, "releaseLock"),
          "symbol" == typeof s.toStringTag &&
            Object.defineProperty(X.prototype, s.toStringTag, {
              value: "ReadableStreamDefaultReader",
              configurable: !0,
            });
        class G {
          constructor(e, t) {
            (this._ongoingPromise = void 0),
              (this._isFinished = !1),
              (this._reader = e),
              (this._preventCancel = t);
          }
          next() {
            let e = () => this._nextSteps();
            return (
              (this._ongoingPromise = this._ongoingPromise
                ? d(this._ongoingPromise, e, e)
                : e()),
              this._ongoingPromise
            );
          }
          return(e) {
            let t = () => this._returnSteps(e);
            return this._ongoingPromise ? d(this._ongoingPromise, t, t) : t();
          }
          _nextSteps() {
            if (this._isFinished)
              return Promise.resolve({ value: void 0, done: !0 });
            let e = this._reader;
            return void 0 === e
              ? h(A("iterate"))
              : d(
                  e.read(),
                  (e) => {
                    var t;
                    return (
                      (this._ongoingPromise = void 0),
                      e.done &&
                        ((this._isFinished = !0),
                        null == (t = this._reader) || t.releaseLock(),
                        (this._reader = void 0)),
                      e
                    );
                  },
                  (e) => {
                    var t;
                    throw (
                      ((this._ongoingPromise = void 0),
                      (this._isFinished = !0),
                      null == (t = this._reader) || t.releaseLock(),
                      (this._reader = void 0),
                      e)
                    );
                  },
                );
          }
          _returnSteps(e) {
            if (this._isFinished)
              return Promise.resolve({ value: e, done: !0 });
            this._isFinished = !0;
            let t = this._reader;
            if (void 0 === t) return h(A("finish iterating"));
            if (((this._reader = void 0), !this._preventCancel)) {
              let r = t.cancel(e);
              return (
                t.releaseLock(), d(r, () => ({ value: e, done: !0 }), void 0)
              );
            }
            return t.releaseLock(), c({ value: e, done: !0 });
          }
        }
        let Q = {
          next() {
            return Z(this) ? this._asyncIteratorImpl.next() : h(ee("next"));
          },
          return(e) {
            return Z(this)
              ? this._asyncIteratorImpl.return(e)
              : h(ee("return"));
          },
        };
        function Z(e) {
          if (
            !i(e) ||
            !Object.prototype.hasOwnProperty.call(e, "_asyncIteratorImpl")
          )
            return !1;
          try {
            return e._asyncIteratorImpl instanceof G;
          } catch (e) {
            return !1;
          }
        }
        function ee(e) {
          return TypeError(
            `ReadableStreamAsyncIterator.${e} can only be used on a ReadableSteamAsyncIterator`,
          );
        }
        "symbol" == typeof s.asyncIterator &&
          Object.defineProperty(Q, s.asyncIterator, {
            value() {
              return this;
            },
            writable: !0,
            configurable: !0,
          });
        let et =
          Number.isNaN ||
          function (e) {
            return e != e;
          };
        function er(e, t, r, s, n) {
          new Uint8Array(e).set(new Uint8Array(r, s, n), t);
        }
        function es(e) {
          return new Uint8Array(
            (function (e, t, r) {
              if (e.slice) return e.slice(t, r);
              let s = r - t,
                n = new ArrayBuffer(s);
              return er(n, 0, e, t, s), n;
            })(e.buffer, e.byteOffset, e.byteOffset + e.byteLength),
          );
        }
        function en(e) {
          let t = e._queue.shift();
          return (
            (e._queueTotalSize -= t.size),
            e._queueTotalSize < 0 && (e._queueTotalSize = 0),
            t.value
          );
        }
        function ei(e, t, r) {
          if ("number" != typeof r || et(r) || r < 0 || r === 1 / 0)
            throw RangeError(
              "Size must be a finite, non-NaN, non-negative number.",
            );
          e._queue.push({ value: t, size: r }), (e._queueTotalSize += r);
        }
        function eo(e) {
          (e._queue = new b()), (e._queueTotalSize = 0);
        }
        class ea {
          constructor() {
            throw TypeError("Illegal constructor");
          }
          get view() {
            if (!eh(this)) throw ek("view");
            return this._view;
          }
          respond(e) {
            if (!eh(this)) throw ek("respond");
            if (
              (z(e, 1, "respond"),
              (e = N(e, "First parameter")),
              void 0 === this._associatedReadableByteStreamController)
            )
              throw TypeError("This BYOB request has been invalidated");
            this._view.buffer,
              (function (e, t) {
                let r = e._pendingPullIntos.peek();
                if ("closed" === e._controlledReadableByteStream._state) {
                  if (0 !== t)
                    throw TypeError(
                      "bytesWritten must be 0 when calling respond() on a closed stream",
                    );
                } else {
                  if (0 === t)
                    throw TypeError(
                      "bytesWritten must be greater than 0 when calling respond() on a readable stream",
                    );
                  if (r.bytesFilled + t > r.byteLength)
                    throw RangeError("bytesWritten out of range");
                }
                (r.buffer = r.buffer), eS(e, t);
              })(this._associatedReadableByteStreamController, e);
          }
          respondWithNewView(e) {
            if (!eh(this)) throw ek("respondWithNewView");
            if ((z(e, 1, "respondWithNewView"), !ArrayBuffer.isView(e)))
              throw TypeError("You can only respond with array buffer views");
            if (void 0 === this._associatedReadableByteStreamController)
              throw TypeError("This BYOB request has been invalidated");
            e.buffer,
              (function (e, t) {
                let r = e._pendingPullIntos.peek();
                if ("closed" === e._controlledReadableByteStream._state) {
                  if (0 !== t.byteLength)
                    throw TypeError(
                      "The view's length must be 0 when calling respondWithNewView() on a closed stream",
                    );
                } else if (0 === t.byteLength)
                  throw TypeError(
                    "The view's length must be greater than 0 when calling respondWithNewView() on a readable stream",
                  );
                if (r.byteOffset + r.bytesFilled !== t.byteOffset)
                  throw RangeError(
                    "The region specified by view does not match byobRequest",
                  );
                if (r.bufferByteLength !== t.buffer.byteLength)
                  throw RangeError(
                    "The buffer of view has different capacity than byobRequest",
                  );
                if (r.bytesFilled + t.byteLength > r.byteLength)
                  throw RangeError(
                    "The region specified by view is larger than byobRequest",
                  );
                let s = t.byteLength;
                (r.buffer = t.buffer), eS(e, s);
              })(this._associatedReadableByteStreamController, e);
          }
        }
        Object.defineProperties(ea.prototype, {
          respond: { enumerable: !0 },
          respondWithNewView: { enumerable: !0 },
          view: { enumerable: !0 },
        }),
          o(ea.prototype.respond, "respond"),
          o(ea.prototype.respondWithNewView, "respondWithNewView"),
          "symbol" == typeof s.toStringTag &&
            Object.defineProperty(ea.prototype, s.toStringTag, {
              value: "ReadableStreamBYOBRequest",
              configurable: !0,
            });
        class el {
          constructor() {
            throw TypeError("Illegal constructor");
          }
          get byobRequest() {
            if (!ec(this)) throw eC("byobRequest");
            return (function (e) {
              if (null === e._byobRequest && e._pendingPullIntos.length > 0) {
                let t = e._pendingPullIntos.peek(),
                  r = new Uint8Array(
                    t.buffer,
                    t.byteOffset + t.bytesFilled,
                    t.byteLength - t.bytesFilled,
                  ),
                  s = Object.create(ea.prototype);
                (s._associatedReadableByteStreamController = e),
                  (s._view = r),
                  (e._byobRequest = s);
              }
              return e._byobRequest;
            })(this);
          }
          get desiredSize() {
            if (!ec(this)) throw eC("desiredSize");
            return eR(this);
          }
          close() {
            if (!ec(this)) throw eC("close");
            if (this._closeRequested)
              throw TypeError(
                "The stream has already been closed; do not close it again!",
              );
            let e = this._controlledReadableByteStream._state;
            if ("readable" !== e)
              throw TypeError(
                `The stream (in ${e} state) is not in the readable state and cannot be closed`,
              );
            !(function (e) {
              let t = e._controlledReadableByteStream;
              if (!e._closeRequested && "readable" === t._state) {
                if (e._queueTotalSize > 0) return (e._closeRequested = !0);
                if (
                  e._pendingPullIntos.length > 0 &&
                  e._pendingPullIntos.peek().bytesFilled > 0
                ) {
                  let t = TypeError(
                    "Insufficient bytes to fill elements in the given buffer",
                  );
                  throw (eO(e, t), t);
                }
                eE(e), tA(t);
              }
            })(this);
          }
          enqueue(e) {
            if (!ec(this)) throw eC("enqueue");
            if ((z(e, 1, "enqueue"), !ArrayBuffer.isView(e)))
              throw TypeError("chunk must be an array buffer view");
            if (0 === e.byteLength)
              throw TypeError("chunk must have non-zero byteLength");
            if (0 === e.buffer.byteLength)
              throw TypeError("chunk's buffer must have non-zero byteLength");
            if (this._closeRequested)
              throw TypeError("stream is closed or draining");
            let t = this._controlledReadableByteStream._state;
            if ("readable" !== t)
              throw TypeError(
                `The stream (in ${t} state) is not in the readable state and cannot be enqueued to`,
              );
            !(function (e, t) {
              let r = e._controlledReadableByteStream;
              if (e._closeRequested || "readable" !== r._state) return;
              let s = t.buffer,
                n = t.byteOffset,
                i = t.byteLength;
              if (e._pendingPullIntos.length > 0) {
                let t = e._pendingPullIntos.peek();
                t.buffer,
                  ev(e),
                  (t.buffer = t.buffer),
                  "none" === t.readerType && ey(e, t);
              }
              J(r)
                ? ((function (e) {
                    let t = e._controlledReadableByteStream._reader;
                    for (; t._readRequests.length > 0; ) {
                      if (0 === e._queueTotalSize) return;
                      eA(e, t._readRequests.shift());
                    }
                  })(e),
                  0 === H(r))
                  ? em(e, s, n, i)
                  : (e._pendingPullIntos.length > 0 && eT(e),
                    U(r, new Uint8Array(s, n, i), !1))
                : eI(r)
                  ? (em(e, s, n, i), ex(e))
                  : em(e, s, n, i),
                eu(e);
            })(this, e);
          }
          error(e) {
            if (!ec(this)) throw eC("error");
            eO(this, e);
          }
          [v](e) {
            ed(this), eo(this);
            let t = this._cancelAlgorithm(e);
            return eE(this), t;
          }
          [x](e) {
            let t = this._controlledReadableByteStream;
            if (this._queueTotalSize > 0) return void eA(this, e);
            let r = this._autoAllocateChunkSize;
            if (void 0 !== r) {
              let t;
              try {
                t = new ArrayBuffer(r);
              } catch (t) {
                return void e._errorSteps(t);
              }
              let s = {
                buffer: t,
                bufferByteLength: r,
                byteOffset: 0,
                byteLength: r,
                bytesFilled: 0,
                elementSize: 1,
                viewConstructor: Uint8Array,
                readerType: "default",
              };
              this._pendingPullIntos.push(s);
            }
            W(t, e), eu(this);
          }
          [S]() {
            if (this._pendingPullIntos.length > 0) {
              let e = this._pendingPullIntos.peek();
              (e.readerType = "none"),
                (this._pendingPullIntos = new b()),
                this._pendingPullIntos.push(e);
            }
          }
        }
        function ec(e) {
          return (
            !!i(e) &&
            !!Object.prototype.hasOwnProperty.call(
              e,
              "_controlledReadableByteStream",
            ) &&
            e instanceof el
          );
        }
        function eh(e) {
          return (
            !!i(e) &&
            !!Object.prototype.hasOwnProperty.call(
              e,
              "_associatedReadableByteStreamController",
            ) &&
            e instanceof ea
          );
        }
        function eu(e) {
          if (
            (function (e) {
              let t = e._controlledReadableByteStream;
              return (
                "readable" === t._state &&
                !e._closeRequested &&
                !!e._started &&
                !!((J(t) && H(t) > 0) || (eI(t) && eL(t) > 0) || eR(e) > 0)
              );
            })(e)
          ) {
            if (e._pulling) return void (e._pullAgain = !0);
            (e._pulling = !0),
              p(
                e._pullAlgorithm(),
                () => (
                  (e._pulling = !1),
                  e._pullAgain && ((e._pullAgain = !1), eu(e)),
                  null
                ),
                (t) => (eO(e, t), null),
              );
          }
        }
        function ed(e) {
          ev(e), (e._pendingPullIntos = new b());
        }
        function ep(e, t) {
          let r = !1;
          "closed" === e._state && (r = !0);
          let s = ef(t);
          "default" === t.readerType
            ? U(e, s, r)
            : (function (e, t, r) {
                let s = e._reader._readIntoRequests.shift();
                r ? s._closeSteps(t) : s._chunkSteps(t);
              })(e, s, r);
        }
        function ef(e) {
          let t = e.bytesFilled,
            r = e.elementSize;
          return new e.viewConstructor(e.buffer, e.byteOffset, t / r);
        }
        function em(e, t, r, s) {
          e._queue.push({ buffer: t, byteOffset: r, byteLength: s }),
            (e._queueTotalSize += s);
        }
        function eg(e, t, r, s) {
          let n;
          try {
            n = t.slice(r, r + s);
          } catch (t) {
            throw (eO(e, t), t);
          }
          em(e, n, 0, s);
        }
        function ey(e, t) {
          t.bytesFilled > 0 && eg(e, t.buffer, t.byteOffset, t.bytesFilled),
            eT(e);
        }
        function eb(e, t) {
          let r = t.elementSize,
            s = t.bytesFilled - (t.bytesFilled % r),
            n = Math.min(e._queueTotalSize, t.byteLength - t.bytesFilled),
            i = t.bytesFilled + n,
            o = i - (i % r),
            a = n,
            l = !1;
          o > s && ((a = o - t.bytesFilled), (l = !0));
          let c = e._queue;
          for (; a > 0; ) {
            let r = c.peek(),
              s = Math.min(a, r.byteLength),
              n = t.byteOffset + t.bytesFilled;
            er(t.buffer, n, r.buffer, r.byteOffset, s),
              r.byteLength === s
                ? c.shift()
                : ((r.byteOffset += s), (r.byteLength -= s)),
              (e._queueTotalSize -= s),
              ew(e, s, t),
              (a -= s);
          }
          return l;
        }
        function ew(e, t, r) {
          r.bytesFilled += t;
        }
        function e_(e) {
          0 === e._queueTotalSize && e._closeRequested
            ? (eE(e), tA(e._controlledReadableByteStream))
            : eu(e);
        }
        function ev(e) {
          null !== e._byobRequest &&
            ((e._byobRequest._associatedReadableByteStreamController = void 0),
            (e._byobRequest._view = null),
            (e._byobRequest = null));
        }
        function ex(e) {
          for (; e._pendingPullIntos.length > 0; ) {
            if (0 === e._queueTotalSize) return;
            let t = e._pendingPullIntos.peek();
            eb(e, t) && (eT(e), ep(e._controlledReadableByteStream, t));
          }
        }
        function eS(e, t) {
          let r = e._pendingPullIntos.peek();
          ev(e),
            "closed" === e._controlledReadableByteStream._state
              ? (function (e, t) {
                  "none" === t.readerType && eT(e);
                  let r = e._controlledReadableByteStream;
                  if (eI(r)) for (; eL(r) > 0; ) ep(r, eT(e));
                })(e, r)
              : (function (e, t, r) {
                  if ((ew(0, t, r), "none" === r.readerType))
                    return ey(e, r), ex(e);
                  if (r.bytesFilled < r.elementSize) return;
                  eT(e);
                  let s = r.bytesFilled % r.elementSize;
                  if (s > 0) {
                    let t = r.byteOffset + r.bytesFilled;
                    eg(e, r.buffer, t - s, s);
                  }
                  (r.bytesFilled -= s),
                    ep(e._controlledReadableByteStream, r),
                    ex(e);
                })(e, t, r),
            eu(e);
        }
        function eT(e) {
          return e._pendingPullIntos.shift();
        }
        function eE(e) {
          (e._pullAlgorithm = void 0), (e._cancelAlgorithm = void 0);
        }
        function eO(e, t) {
          let r = e._controlledReadableByteStream;
          "readable" === r._state && (ed(e), eo(e), eE(e), tR(r, t));
        }
        function eA(e, t) {
          let r = e._queue.shift();
          (e._queueTotalSize -= r.byteLength), e_(e);
          let s = new Uint8Array(r.buffer, r.byteOffset, r.byteLength);
          t._chunkSteps(s);
        }
        function eR(e) {
          let t = e._controlledReadableByteStream._state;
          return "errored" === t
            ? null
            : "closed" === t
              ? 0
              : e._strategyHWM - e._queueTotalSize;
        }
        function ek(e) {
          return TypeError(
            `ReadableStreamBYOBRequest.prototype.${e} can only be used on a ReadableStreamBYOBRequest`,
          );
        }
        function eC(e) {
          return TypeError(
            `ReadableByteStreamController.prototype.${e} can only be used on a ReadableByteStreamController`,
          );
        }
        function eP(e, t) {
          e._reader._readIntoRequests.push(t);
        }
        function eL(e) {
          return e._reader._readIntoRequests.length;
        }
        function eI(e) {
          let t = e._reader;
          return void 0 !== t && !!ej(t);
        }
        Object.defineProperties(el.prototype, {
          close: { enumerable: !0 },
          enqueue: { enumerable: !0 },
          error: { enumerable: !0 },
          byobRequest: { enumerable: !0 },
          desiredSize: { enumerable: !0 },
        }),
          o(el.prototype.close, "close"),
          o(el.prototype.enqueue, "enqueue"),
          o(el.prototype.error, "error"),
          "symbol" == typeof s.toStringTag &&
            Object.defineProperty(el.prototype, s.toStringTag, {
              value: "ReadableByteStreamController",
              configurable: !0,
            });
        class e$ {
          constructor(e) {
            if (
              (z(e, 1, "ReadableStreamBYOBReader"),
              D(e, "First parameter"),
              tE(e))
            )
              throw TypeError(
                "This stream has already been locked for exclusive reading by another reader",
              );
            if (!ec(e._readableStreamController))
              throw TypeError(
                "Cannot construct a ReadableStreamBYOBReader for a stream not constructed with a byte source",
              );
            T(this, e), (this._readIntoRequests = new b());
          }
          get closed() {
            return ej(this) ? this._closedPromise : h(eM("closed"));
          }
          cancel(e) {
            return ej(this)
              ? void 0 === this._ownerReadableStream
                ? h(A("cancel"))
                : E(this, e)
              : h(eM("cancel"));
          }
          read(e) {
            let t, r;
            if (!ej(this)) return h(eM("read"));
            if (!ArrayBuffer.isView(e))
              return h(TypeError("view must be an array buffer view"));
            if (0 === e.byteLength)
              return h(TypeError("view must have non-zero byteLength"));
            if (0 === e.buffer.byteLength)
              return h(
                TypeError("view's buffer must have non-zero byteLength"),
              );
            if ((e.buffer, void 0 === this._ownerReadableStream))
              return h(A("read from"));
            let s = u((e, s) => {
              (t = e), (r = s);
            });
            return (
              (function (e, t, r) {
                let s = e._ownerReadableStream;
                (s._disturbed = !0),
                  "errored" === s._state
                    ? r._errorSteps(s._storedError)
                    : (function (e, t, r) {
                        let s = e._controlledReadableByteStream,
                          n = 1;
                        t.constructor !== DataView &&
                          (n = t.constructor.BYTES_PER_ELEMENT);
                        let i = t.constructor,
                          o = t.buffer,
                          a = {
                            buffer: o,
                            bufferByteLength: o.byteLength,
                            byteOffset: t.byteOffset,
                            byteLength: t.byteLength,
                            bytesFilled: 0,
                            elementSize: n,
                            viewConstructor: i,
                            readerType: "byob",
                          };
                        if (e._pendingPullIntos.length > 0)
                          return e._pendingPullIntos.push(a), eP(s, r);
                        if ("closed" !== s._state) {
                          if (e._queueTotalSize > 0) {
                            if (eb(e, a)) {
                              let t = ef(a);
                              return e_(e), r._chunkSteps(t);
                            }
                            if (e._closeRequested) {
                              let t = TypeError(
                                "Insufficient bytes to fill elements in the given buffer",
                              );
                              return eO(e, t), r._errorSteps(t);
                            }
                          }
                          e._pendingPullIntos.push(a), eP(s, r), eu(e);
                        } else {
                          let e = new i(a.buffer, a.byteOffset, 0);
                          r._closeSteps(e);
                        }
                      })(s._readableStreamController, t, r);
              })(this, e, {
                _chunkSteps: (e) => t({ value: e, done: !1 }),
                _closeSteps: (e) => t({ value: e, done: !0 }),
                _errorSteps: (e) => r(e),
              }),
              s
            );
          }
          releaseLock() {
            if (!ej(this)) throw eM("releaseLock");
            void 0 !== this._ownerReadableStream &&
              (O(this), ez(this, TypeError("Reader was released")));
          }
        }
        function ej(e) {
          return (
            !!i(e) &&
            !!Object.prototype.hasOwnProperty.call(e, "_readIntoRequests") &&
            e instanceof e$
          );
        }
        function ez(e, t) {
          let r = e._readIntoRequests;
          (e._readIntoRequests = new b()),
            r.forEach((e) => {
              e._errorSteps(t);
            });
        }
        function eM(e) {
          return TypeError(
            `ReadableStreamBYOBReader.prototype.${e} can only be used on a ReadableStreamBYOBReader`,
          );
        }
        function eq(e, t) {
          let { highWaterMark: r } = e;
          if (void 0 === r) return t;
          if (et(r) || r < 0) throw RangeError("Invalid highWaterMark");
          return r;
        }
        function eN(e) {
          let { size: t } = e;
          return t || (() => 1);
        }
        function eF(e, t) {
          var r;
          I(e, t);
          let s = null == e ? void 0 : e.highWaterMark,
            n = null == e ? void 0 : e.size;
          return {
            highWaterMark: void 0 === s ? void 0 : q(s),
            size:
              void 0 === n
                ? void 0
                : ($((r = n), `${t} has member 'size' that`), (e) => q(r(e))),
          };
        }
        Object.defineProperties(e$.prototype, {
          cancel: { enumerable: !0 },
          read: { enumerable: !0 },
          releaseLock: { enumerable: !0 },
          closed: { enumerable: !0 },
        }),
          o(e$.prototype.cancel, "cancel"),
          o(e$.prototype.read, "read"),
          o(e$.prototype.releaseLock, "releaseLock"),
          "symbol" == typeof s.toStringTag &&
            Object.defineProperty(e$.prototype, s.toStringTag, {
              value: "ReadableStreamBYOBReader",
              configurable: !0,
            });
        let eB = "function" == typeof AbortController;
        class eD {
          constructor(e = {}, t = {}) {
            void 0 === e ? (e = null) : j(e, "First parameter");
            let r = eF(t, "Second parameter"),
              s = (function (e, t) {
                I(e, t);
                let r = null == e ? void 0 : e.abort,
                  s = null == e ? void 0 : e.close,
                  n = null == e ? void 0 : e.start,
                  i = null == e ? void 0 : e.type,
                  o = null == e ? void 0 : e.write;
                return {
                  abort:
                    void 0 === r
                      ? void 0
                      : ($(r, `${t} has member 'abort' that`),
                        (t) => y(r, e, [t])),
                  close:
                    void 0 === s
                      ? void 0
                      : ($(s, `${t} has member 'close' that`),
                        () => y(s, e, [])),
                  start:
                    void 0 === n
                      ? void 0
                      : ($(n, `${t} has member 'start' that`),
                        (t) => g(n, e, [t])),
                  write:
                    void 0 === o
                      ? void 0
                      : ($(o, `${t} has member 'write' that`),
                        (t, r) => y(o, e, [t, r])),
                  type: i,
                };
              })(e, "First parameter");
            if (
              ((this._state = "writable"),
              (this._storedError = void 0),
              (this._writer = void 0),
              (this._writableStreamController = void 0),
              (this._writeRequests = new b()),
              (this._inFlightWriteRequest = void 0),
              (this._closeRequest = void 0),
              (this._inFlightCloseRequest = void 0),
              (this._pendingAbortRequest = void 0),
              (this._backpressure = !1),
              void 0 !== s.type)
            )
              throw RangeError("Invalid type is specified");
            let n = eN(r);
            !(function (e, t, r, s) {
              let n,
                i,
                o,
                a,
                l = Object.create(e3.prototype);
              (n = void 0 !== t.start ? () => t.start(l) : () => {}),
                (i =
                  void 0 !== t.write ? (e) => t.write(e, l) : () => c(void 0)),
                (o = void 0 !== t.close ? () => t.close() : () => c(void 0)),
                (a = void 0 !== t.abort ? (e) => t.abort(e) : () => c(void 0)),
                (l._controlledWritableStream = e),
                (e._writableStreamController = l),
                (l._queue = void 0),
                (l._queueTotalSize = void 0),
                eo(l),
                (l._abortReason = void 0),
                (l._abortController = (function () {
                  if (eB) return new AbortController();
                })()),
                (l._started = !1),
                (l._strategySizeAlgorithm = s),
                (l._strategyHWM = r),
                (l._writeAlgorithm = i),
                (l._closeAlgorithm = o),
                (l._abortAlgorithm = a),
                eQ(e, 0 >= e4(l)),
                p(
                  c(n()),
                  () => ((l._started = !0), e6(l), null),
                  (t) => ((l._started = !0), eX(e, t), null),
                );
            })(this, s, eq(r, 1), n);
          }
          get locked() {
            if (!eW(this)) throw te("locked");
            return eU(this);
          }
          abort(e) {
            return eW(this)
              ? eU(this)
                ? h(
                    TypeError(
                      "Cannot abort a stream that already has a writer",
                    ),
                  )
                : eH(this, e)
              : h(te("abort"));
          }
          close() {
            return eW(this)
              ? eU(this)
                ? h(
                    TypeError(
                      "Cannot close a stream that already has a writer",
                    ),
                  )
                : eY(this)
                  ? h(TypeError("Cannot close an already-closing stream"))
                  : eJ(this)
              : h(te("close"));
          }
          getWriter() {
            if (!eW(this)) throw te("getWriter");
            return new eZ(this);
          }
        }
        function eW(e) {
          return (
            !!i(e) &&
            !!Object.prototype.hasOwnProperty.call(
              e,
              "_writableStreamController",
            ) &&
            e instanceof eD
          );
        }
        function eU(e) {
          return void 0 !== e._writer;
        }
        function eH(e, t) {
          var r;
          if ("closed" === e._state || "errored" === e._state) return c(void 0);
          (e._writableStreamController._abortReason = t),
            null == (r = e._writableStreamController._abortController) ||
              r.abort(t);
          let s = e._state;
          if ("closed" === s || "errored" === s) return c(void 0);
          if (void 0 !== e._pendingAbortRequest)
            return e._pendingAbortRequest._promise;
          let n = !1;
          "erroring" === s && ((n = !0), (t = void 0));
          let i = u((r, s) => {
            e._pendingAbortRequest = {
              _promise: void 0,
              _resolve: r,
              _reject: s,
              _reason: t,
              _wasAlreadyErroring: n,
            };
          });
          return (e._pendingAbortRequest._promise = i), n || eV(e, t), i;
        }
        function eJ(e) {
          var t;
          let r = e._state;
          if ("closed" === r || "errored" === r)
            return h(
              TypeError(
                `The stream (in ${r} state) is not in the writable state and cannot be closed`,
              ),
            );
          let s = u((t, r) => {
              e._closeRequest = { _resolve: t, _reject: r };
            }),
            n = e._writer;
          return (
            void 0 !== n && e._backpressure && "writable" === r && th(n),
            ei((t = e._writableStreamController), e2, 0),
            e6(t),
            s
          );
        }
        function eX(e, t) {
          "writable" !== e._state ? eK(e) : eV(e, t);
        }
        function eV(e, t) {
          let r = e._writableStreamController;
          (e._state = "erroring"), (e._storedError = t);
          let s = e._writer;
          void 0 !== s && e1(s, t),
            void 0 === e._inFlightWriteRequest &&
              void 0 === e._inFlightCloseRequest &&
              r._started &&
              eK(e);
        }
        function eK(e) {
          (e._state = "errored"), e._writableStreamController[_]();
          let t = e._storedError;
          if (
            (e._writeRequests.forEach((e) => {
              e._reject(t);
            }),
            (e._writeRequests = new b()),
            void 0 === e._pendingAbortRequest)
          )
            return void eG(e);
          let r = e._pendingAbortRequest;
          if (((e._pendingAbortRequest = void 0), r._wasAlreadyErroring))
            return r._reject(t), void eG(e);
          p(
            e._writableStreamController[w](r._reason),
            () => (r._resolve(), eG(e), null),
            (t) => (r._reject(t), eG(e), null),
          );
        }
        function eY(e) {
          return (
            void 0 !== e._closeRequest || void 0 !== e._inFlightCloseRequest
          );
        }
        function eG(e) {
          void 0 !== e._closeRequest &&
            (e._closeRequest._reject(e._storedError),
            (e._closeRequest = void 0));
          let t = e._writer;
          void 0 !== t && ti(t, e._storedError);
        }
        function eQ(e, t) {
          let r = e._writer;
          void 0 !== r && t !== e._backpressure && (t ? ta(r) : th(r)),
            (e._backpressure = t);
        }
        Object.defineProperties(eD.prototype, {
          abort: { enumerable: !0 },
          close: { enumerable: !0 },
          getWriter: { enumerable: !0 },
          locked: { enumerable: !0 },
        }),
          o(eD.prototype.abort, "abort"),
          o(eD.prototype.close, "close"),
          o(eD.prototype.getWriter, "getWriter"),
          "symbol" == typeof s.toStringTag &&
            Object.defineProperty(eD.prototype, s.toStringTag, {
              value: "WritableStream",
              configurable: !0,
            });
        class eZ {
          constructor(e) {
            if (
              (z(e, 1, "WritableStreamDefaultWriter"),
              (function (e, t) {
                if (!eW(e)) throw TypeError(`${t} is not a WritableStream.`);
              })(e, "First parameter"),
              eU(e))
            )
              throw TypeError(
                "This stream has already been locked for exclusive writing by another writer",
              );
            (this._ownerWritableStream = e), (e._writer = this);
            let t = e._state;
            if ("writable" === t)
              !eY(e) && e._backpressure
                ? ta(this)
                : (function (e) {
                    ta(e), th(e);
                  })(this),
                tn(this);
            else if ("erroring" === t) tl(this, e._storedError), tn(this);
            else if ("closed" === t)
              (function (e) {
                ta(e), th(e);
              })(this),
                tn(this),
                to(this);
            else {
              let t = e._storedError;
              tl(this, t),
                (function (e, t) {
                  tn(e), ti(e, t);
                })(this, t);
            }
          }
          get closed() {
            return e0(this) ? this._closedPromise : h(tr("closed"));
          }
          get desiredSize() {
            if (!e0(this)) throw tr("desiredSize");
            if (void 0 === this._ownerWritableStream) throw ts("desiredSize");
            let e = this._ownerWritableStream,
              t = e._state;
            return "errored" === t || "erroring" === t
              ? null
              : "closed" === t
                ? 0
                : e4(e._writableStreamController);
          }
          get ready() {
            return e0(this) ? this._readyPromise : h(tr("ready"));
          }
          abort(e) {
            return e0(this)
              ? void 0 === this._ownerWritableStream
                ? h(ts("abort"))
                : eH(this._ownerWritableStream, e)
              : h(tr("abort"));
          }
          close() {
            if (!e0(this)) return h(tr("close"));
            let e = this._ownerWritableStream;
            return void 0 === e
              ? h(ts("close"))
              : eY(e)
                ? h(TypeError("Cannot close an already-closing stream"))
                : eJ(this._ownerWritableStream);
          }
          releaseLock() {
            if (!e0(this)) throw tr("releaseLock");
            void 0 !== this._ownerWritableStream &&
              (function (e) {
                var t, r;
                let s = e._ownerWritableStream,
                  n = TypeError(
                    "Writer was released and can no longer be used to monitor the stream's closedness",
                  );
                e1(e, n),
                  "pending" === e._closedPromiseState
                    ? ti(e, n)
                    : ((t = e), (r = n), tn(t), ti(t, r)),
                  (s._writer = void 0),
                  (e._ownerWritableStream = void 0);
              })(this);
          }
          write(e) {
            return e0(this)
              ? void 0 === this._ownerWritableStream
                ? h(ts("write to"))
                : (function (e, t) {
                    let r = e._ownerWritableStream,
                      s = r._writableStreamController,
                      n = (function (e, t) {
                        try {
                          return e._strategySizeAlgorithm(t);
                        } catch (t) {
                          return e7(e, t), 1;
                        }
                      })(s, t);
                    if (r !== e._ownerWritableStream) return h(ts("write to"));
                    let i = r._state;
                    if ("errored" === i) return h(r._storedError);
                    if (eY(r) || "closed" === i)
                      return h(
                        TypeError(
                          "The stream is closing or closed and cannot be written to",
                        ),
                      );
                    if ("erroring" === i) return h(r._storedError);
                    let o = u((e, t) => {
                      r._writeRequests.push({ _resolve: e, _reject: t });
                    });
                    return (
                      (function (e, t, r) {
                        try {
                          ei(e, t, r);
                        } catch (t) {
                          return void e7(e, t);
                        }
                        let s = e._controlledWritableStream;
                        eY(s) || "writable" !== s._state || eQ(s, 0 >= e4(e)),
                          e6(e);
                      })(s, t, n),
                      o
                    );
                  })(this, e)
              : h(tr("write"));
          }
        }
        function e0(e) {
          return (
            !!i(e) &&
            !!Object.prototype.hasOwnProperty.call(e, "_ownerWritableStream") &&
            e instanceof eZ
          );
        }
        function e1(e, t) {
          "pending" === e._readyPromiseState ? tc(e, t) : tl(e, t);
        }
        Object.defineProperties(eZ.prototype, {
          abort: { enumerable: !0 },
          close: { enumerable: !0 },
          releaseLock: { enumerable: !0 },
          write: { enumerable: !0 },
          closed: { enumerable: !0 },
          desiredSize: { enumerable: !0 },
          ready: { enumerable: !0 },
        }),
          o(eZ.prototype.abort, "abort"),
          o(eZ.prototype.close, "close"),
          o(eZ.prototype.releaseLock, "releaseLock"),
          o(eZ.prototype.write, "write"),
          "symbol" == typeof s.toStringTag &&
            Object.defineProperty(eZ.prototype, s.toStringTag, {
              value: "WritableStreamDefaultWriter",
              configurable: !0,
            });
        let e2 = {};
        class e3 {
          constructor() {
            throw TypeError("Illegal constructor");
          }
          get abortReason() {
            if (!e8(this)) throw tt("abortReason");
            return this._abortReason;
          }
          get signal() {
            if (!e8(this)) throw tt("signal");
            if (void 0 === this._abortController)
              throw TypeError(
                "WritableStreamDefaultController.prototype.signal is not supported",
              );
            return this._abortController.signal;
          }
          error(e) {
            if (!e8(this)) throw tt("error");
            "writable" === this._controlledWritableStream._state && e9(this, e);
          }
          [w](e) {
            let t = this._abortAlgorithm(e);
            return e5(this), t;
          }
          [_]() {
            eo(this);
          }
        }
        function e8(e) {
          return (
            !!i(e) &&
            !!Object.prototype.hasOwnProperty.call(
              e,
              "_controlledWritableStream",
            ) &&
            e instanceof e3
          );
        }
        function e5(e) {
          (e._writeAlgorithm = void 0),
            (e._closeAlgorithm = void 0),
            (e._abortAlgorithm = void 0),
            (e._strategySizeAlgorithm = void 0);
        }
        function e4(e) {
          return e._strategyHWM - e._queueTotalSize;
        }
        function e6(e) {
          let t = e._controlledWritableStream;
          if (!e._started || void 0 !== t._inFlightWriteRequest) return;
          if ("erroring" === t._state) return void eK(t);
          if (0 === e._queue.length) return;
          let r = e._queue.peek().value;
          r === e2
            ? (function (e) {
                let t = e._controlledWritableStream;
                (t._inFlightCloseRequest = t._closeRequest),
                  (t._closeRequest = void 0),
                  en(e);
                let r = e._closeAlgorithm();
                e5(e),
                  p(
                    r,
                    () => (
                      (function (e) {
                        e._inFlightCloseRequest._resolve(void 0),
                          (e._inFlightCloseRequest = void 0),
                          "erroring" === e._state &&
                            ((e._storedError = void 0),
                            void 0 !== e._pendingAbortRequest &&
                              (e._pendingAbortRequest._resolve(),
                              (e._pendingAbortRequest = void 0))),
                          (e._state = "closed");
                        let t = e._writer;
                        void 0 !== t && to(t);
                      })(t),
                      null
                    ),
                    (e) => (
                      t._inFlightCloseRequest._reject(e),
                      (t._inFlightCloseRequest = void 0),
                      void 0 !== t._pendingAbortRequest &&
                        (t._pendingAbortRequest._reject(e),
                        (t._pendingAbortRequest = void 0)),
                      eX(t, e),
                      null
                    ),
                  );
              })(e)
            : (function (e, t) {
                let r = e._controlledWritableStream;
                (r._inFlightWriteRequest = r._writeRequests.shift()),
                  p(
                    e._writeAlgorithm(t),
                    () => {
                      r._inFlightWriteRequest._resolve(void 0),
                        (r._inFlightWriteRequest = void 0);
                      let t = r._state;
                      return (
                        en(e),
                        eY(r) || "writable" !== t || eQ(r, 0 >= e4(e)),
                        e6(e),
                        null
                      );
                    },
                    (t) => (
                      "writable" === r._state && e5(e),
                      r._inFlightWriteRequest._reject(t),
                      (r._inFlightWriteRequest = void 0),
                      eX(r, t),
                      null
                    ),
                  );
              })(e, r);
        }
        function e7(e, t) {
          "writable" === e._controlledWritableStream._state && e9(e, t);
        }
        function e9(e, t) {
          let r = e._controlledWritableStream;
          e5(e), eV(r, t);
        }
        function te(e) {
          return TypeError(
            `WritableStream.prototype.${e} can only be used on a WritableStream`,
          );
        }
        function tt(e) {
          return TypeError(
            `WritableStreamDefaultController.prototype.${e} can only be used on a WritableStreamDefaultController`,
          );
        }
        function tr(e) {
          return TypeError(
            `WritableStreamDefaultWriter.prototype.${e} can only be used on a WritableStreamDefaultWriter`,
          );
        }
        function ts(e) {
          return TypeError("Cannot " + e + " a stream using a released writer");
        }
        function tn(e) {
          e._closedPromise = u((t, r) => {
            (e._closedPromise_resolve = t),
              (e._closedPromise_reject = r),
              (e._closedPromiseState = "pending");
          });
        }
        function ti(e, t) {
          void 0 !== e._closedPromise_reject &&
            (f(e._closedPromise),
            e._closedPromise_reject(t),
            (e._closedPromise_resolve = void 0),
            (e._closedPromise_reject = void 0),
            (e._closedPromiseState = "rejected"));
        }
        function to(e) {
          void 0 !== e._closedPromise_resolve &&
            (e._closedPromise_resolve(void 0),
            (e._closedPromise_resolve = void 0),
            (e._closedPromise_reject = void 0),
            (e._closedPromiseState = "resolved"));
        }
        function ta(e) {
          (e._readyPromise = u((t, r) => {
            (e._readyPromise_resolve = t), (e._readyPromise_reject = r);
          })),
            (e._readyPromiseState = "pending");
        }
        function tl(e, t) {
          ta(e), tc(e, t);
        }
        function tc(e, t) {
          void 0 !== e._readyPromise_reject &&
            (f(e._readyPromise),
            e._readyPromise_reject(t),
            (e._readyPromise_resolve = void 0),
            (e._readyPromise_reject = void 0),
            (e._readyPromiseState = "rejected"));
        }
        function th(e) {
          void 0 !== e._readyPromise_resolve &&
            (e._readyPromise_resolve(void 0),
            (e._readyPromise_resolve = void 0),
            (e._readyPromise_reject = void 0),
            (e._readyPromiseState = "fulfilled"));
        }
        Object.defineProperties(e3.prototype, {
          abortReason: { enumerable: !0 },
          signal: { enumerable: !0 },
          error: { enumerable: !0 },
        }),
          "symbol" == typeof s.toStringTag &&
            Object.defineProperty(e3.prototype, s.toStringTag, {
              value: "WritableStreamDefaultController",
              configurable: !0,
            });
        let tu = "undefined" != typeof DOMException ? DOMException : void 0,
          td = !(function (e) {
            if ("function" != typeof e && "object" != typeof e) return !1;
            try {
              return new e(), !0;
            } catch (e) {
              return !1;
            }
          })(tu)
            ? (function () {
                let e = function (e, t) {
                  (this.message = e || ""),
                    (this.name = t || "Error"),
                    Error.captureStackTrace &&
                      Error.captureStackTrace(this, this.constructor);
                };
                return (
                  (e.prototype = Object.create(Error.prototype)),
                  Object.defineProperty(e.prototype, "constructor", {
                    value: e,
                    writable: !0,
                    configurable: !0,
                  }),
                  e
                );
              })()
            : tu;
        function tp(e, t, r, s, n, i) {
          let o = e.getReader(),
            a = t.getWriter();
          tT(e) && (e._disturbed = !0);
          let l,
            g,
            y,
            b = !1,
            w = !1,
            _ = "readable",
            v = "writable",
            x = !1,
            S = !1,
            T = u((e) => {
              y = e;
            }),
            E = Promise.resolve(void 0);
          return u((O, A) => {
            let R;
            function k() {
              if (b) return;
              let e = u((e, t) => {
                !(function r(s) {
                  s
                    ? e()
                    : d(
                        b
                          ? c(!0)
                          : d(a.ready, () =>
                              d(
                                o.read(),
                                (e) =>
                                  !!e.done || (f((E = a.write(e.value))), !1),
                              ),
                            ),
                        r,
                        t,
                      );
                })(!1);
              });
              f(e);
            }
            function C() {
              return (
                (_ = "closed"),
                r
                  ? $()
                  : I(
                      () => (
                        eW(t) && ((x = eY(t)), (v = t._state)),
                        x || "closed" === v
                          ? c(void 0)
                          : "erroring" === v || "errored" === v
                            ? h(g)
                            : ((x = !0), a.close())
                      ),
                      !1,
                      void 0,
                    ),
                null
              );
            }
            function P(e) {
              return (
                b ||
                  ((_ = "errored"),
                  (l = e),
                  s ? $(!0, e) : I(() => a.abort(e), !0, e)),
                null
              );
            }
            function L(e) {
              return (
                w ||
                  ((v = "errored"),
                  (g = e),
                  n ? $(!0, e) : I(() => o.cancel(e), !0, e)),
                null
              );
            }
            if (
              (void 0 !== i &&
                ((R = () => {
                  let e =
                      void 0 !== i.reason
                        ? i.reason
                        : new td("Aborted", "AbortError"),
                    t = [];
                  s ||
                    t.push(() => ("writable" === v ? a.abort(e) : c(void 0))),
                    n ||
                      t.push(() =>
                        "readable" === _ ? o.cancel(e) : c(void 0),
                      ),
                    I(() => Promise.all(t.map((e) => e())), !0, e);
                }),
                i.aborted ? R() : i.addEventListener("abort", R)),
              tT(e) && ((_ = e._state), (l = e._storedError)),
              eW(t) && ((v = t._state), (g = t._storedError), (x = eY(t))),
              tT(e) && eW(t) && ((S = !0), y()),
              "errored" === _)
            )
              P(l);
            else if ("erroring" === v || "errored" === v) L(g);
            else if ("closed" === _) C();
            else if (x || "closed" === v) {
              let e = TypeError(
                "the destination writable stream closed before all data could be piped to it",
              );
              n ? $(!0, e) : I(() => o.cancel(e), !0, e);
            }
            function I(e, t, r) {
              function s() {
                let e;
                return (
                  "writable" !== v || x
                    ? n()
                    : p(
                        c(
                          (function t() {
                            if (e !== E) return (e = E), d(E, t, t);
                          })(),
                        ),
                        n,
                      ),
                  null
                );
              }
              function n() {
                return (
                  e
                    ? p(
                        e(),
                        () => j(t, r),
                        (e) => j(!0, e),
                      )
                    : j(t, r),
                  null
                );
              }
              b || ((b = !0), S ? s() : p(T, s));
            }
            function $(e, t) {
              I(void 0, e, t);
            }
            function j(e, t) {
              return (
                (w = !0),
                a.releaseLock(),
                o.releaseLock(),
                void 0 !== i && i.removeEventListener("abort", R),
                e ? A(t) : O(void 0),
                null
              );
            }
            b ||
              (p(o.closed, C, P),
              p(
                a.closed,
                function () {
                  return w || (v = "closed"), null;
                },
                L,
              )),
              S
                ? k()
                : m(() => {
                    (S = !0), y(), k();
                  });
          });
        }
        class tf {
          constructor() {
            throw TypeError("Illegal constructor");
          }
          get desiredSize() {
            if (!tm(this)) throw tv("desiredSize");
            return tw(this);
          }
          close() {
            if (!tm(this)) throw tv("close");
            if (!t_(this))
              throw TypeError(
                "The stream is not in a state that permits close",
              );
            !(function (e) {
              if (!t_(e)) return;
              let t = e._controlledReadableStream;
              (e._closeRequested = !0), 0 === e._queue.length && (ty(e), tA(t));
            })(this);
          }
          enqueue(e) {
            if (!tm(this)) throw tv("enqueue");
            if (!t_(this))
              throw TypeError(
                "The stream is not in a state that permits enqueue",
              );
            if (!t_(this)) return;
            let t = this._controlledReadableStream;
            if (tE(t) && H(t) > 0) U(t, e, !1);
            else {
              let t;
              try {
                t = this._strategySizeAlgorithm(e);
              } catch (e) {
                throw (tb(this, e), e);
              }
              try {
                ei(this, e, t);
              } catch (e) {
                throw (tb(this, e), e);
              }
            }
            tg(this);
          }
          error(e) {
            if (!tm(this)) throw tv("error");
            tb(this, e);
          }
          [v](e) {
            eo(this);
            let t = this._cancelAlgorithm(e);
            return ty(this), t;
          }
          [x](e) {
            let t = this._controlledReadableStream;
            if (this._queue.length > 0) {
              let r = en(this);
              this._closeRequested && 0 === this._queue.length
                ? (ty(this), tA(t))
                : tg(this),
                e._chunkSteps(r);
            } else W(t, e), tg(this);
          }
          [S]() {}
        }
        function tm(e) {
          return (
            !!i(e) &&
            !!Object.prototype.hasOwnProperty.call(
              e,
              "_controlledReadableStream",
            ) &&
            e instanceof tf
          );
        }
        function tg(e) {
          if (
            (function (e) {
              let t = e._controlledReadableStream;
              return (
                !!t_(e) && !!e._started && !!((tE(t) && H(t) > 0) || tw(e) > 0)
              );
            })(e)
          ) {
            if (e._pulling) return void (e._pullAgain = !0);
            (e._pulling = !0),
              p(
                e._pullAlgorithm(),
                () => (
                  (e._pulling = !1),
                  e._pullAgain && ((e._pullAgain = !1), tg(e)),
                  null
                ),
                (t) => (tb(e, t), null),
              );
          }
        }
        function ty(e) {
          (e._pullAlgorithm = void 0),
            (e._cancelAlgorithm = void 0),
            (e._strategySizeAlgorithm = void 0);
        }
        function tb(e, t) {
          let r = e._controlledReadableStream;
          "readable" === r._state && (eo(e), ty(e), tR(r, t));
        }
        function tw(e) {
          let t = e._controlledReadableStream._state;
          return "errored" === t
            ? null
            : "closed" === t
              ? 0
              : e._strategyHWM - e._queueTotalSize;
        }
        function t_(e) {
          return (
            !e._closeRequested &&
            "readable" === e._controlledReadableStream._state
          );
        }
        function tv(e) {
          return TypeError(
            `ReadableStreamDefaultController.prototype.${e} can only be used on a ReadableStreamDefaultController`,
          );
        }
        function tx(e, t) {
          I(e, t);
          let r = null == e ? void 0 : e.preventAbort,
            s = null == e ? void 0 : e.preventCancel,
            n = null == e ? void 0 : e.preventClose,
            i = null == e ? void 0 : e.signal;
          return (
            void 0 !== i &&
              (function (e, t) {
                if (
                  !(function (e) {
                    if ("object" != typeof e || null === e) return !1;
                    try {
                      return "boolean" == typeof e.aborted;
                    } catch (e) {
                      return !1;
                    }
                  })(e)
                )
                  throw TypeError(`${t} is not an AbortSignal.`);
              })(i, `${t} has member 'signal' that`),
            {
              preventAbort: !!r,
              preventCancel: !!s,
              preventClose: !!n,
              signal: i,
            }
          );
        }
        Object.defineProperties(tf.prototype, {
          close: { enumerable: !0 },
          enqueue: { enumerable: !0 },
          error: { enumerable: !0 },
          desiredSize: { enumerable: !0 },
        }),
          o(tf.prototype.close, "close"),
          o(tf.prototype.enqueue, "enqueue"),
          o(tf.prototype.error, "error"),
          "symbol" == typeof s.toStringTag &&
            Object.defineProperty(tf.prototype, s.toStringTag, {
              value: "ReadableStreamDefaultController",
              configurable: !0,
            });
        class tS {
          constructor(e = {}, t = {}) {
            void 0 === e ? (e = null) : j(e, "First parameter");
            let r = eF(t, "Second parameter"),
              s = (function (e, t) {
                I(e, t);
                let r = null == e ? void 0 : e.autoAllocateChunkSize,
                  s = null == e ? void 0 : e.cancel,
                  n = null == e ? void 0 : e.pull,
                  i = null == e ? void 0 : e.start,
                  o = null == e ? void 0 : e.type;
                return {
                  autoAllocateChunkSize:
                    void 0 === r
                      ? void 0
                      : N(r, `${t} has member 'autoAllocateChunkSize' that`),
                  cancel:
                    void 0 === s
                      ? void 0
                      : ($(s, `${t} has member 'cancel' that`),
                        (t) => y(s, e, [t])),
                  pull:
                    void 0 === n
                      ? void 0
                      : ($(n, `${t} has member 'pull' that`),
                        (t) => y(n, e, [t])),
                  start:
                    void 0 === i
                      ? void 0
                      : ($(i, `${t} has member 'start' that`),
                        (t) => g(i, e, [t])),
                  type:
                    void 0 === o
                      ? void 0
                      : (function (e, t) {
                          if ("bytes" != (e = `${e}`))
                            throw TypeError(
                              `${t} '${e}' is not a valid enumeration value for ReadableStreamType`,
                            );
                          return e;
                        })(o, `${t} has member 'type' that`),
                };
              })(e, "First parameter");
            if (
              ((this._state = "readable"),
              (this._reader = void 0),
              (this._storedError = void 0),
              (this._disturbed = !1),
              "bytes" === s.type)
            ) {
              if (void 0 !== r.size)
                throw RangeError(
                  "The strategy for a byte stream cannot have a size function",
                );
              !(function (e, t, r) {
                let s,
                  n,
                  i,
                  o = Object.create(el.prototype);
                (s = void 0 !== t.start ? () => t.start(o) : () => {}),
                  (n = void 0 !== t.pull ? () => t.pull(o) : () => c(void 0)),
                  (i =
                    void 0 !== t.cancel ? (e) => t.cancel(e) : () => c(void 0));
                let a = t.autoAllocateChunkSize;
                if (0 === a)
                  throw TypeError(
                    "autoAllocateChunkSize must be greater than 0",
                  );
                (o._controlledReadableByteStream = e),
                  (o._pullAgain = !1),
                  (o._pulling = !1),
                  (o._byobRequest = null),
                  (o._queue = o._queueTotalSize = void 0),
                  eo(o),
                  (o._closeRequested = !1),
                  (o._started = !1),
                  (o._strategyHWM = r),
                  (o._pullAlgorithm = n),
                  (o._cancelAlgorithm = i),
                  (o._autoAllocateChunkSize = a),
                  (o._pendingPullIntos = new b()),
                  (e._readableStreamController = o),
                  p(
                    c(s()),
                    () => ((o._started = !0), eu(o), null),
                    (e) => (eO(o, e), null),
                  );
              })(this, s, eq(r, 0));
            } else {
              let e = eN(r);
              !(function (e, t, r, s) {
                let n,
                  i,
                  o,
                  a = Object.create(tf.prototype);
                (n = void 0 !== t.start ? () => t.start(a) : () => {}),
                  (i = void 0 !== t.pull ? () => t.pull(a) : () => c(void 0)),
                  (o =
                    void 0 !== t.cancel ? (e) => t.cancel(e) : () => c(void 0)),
                  (a._controlledReadableStream = e),
                  (a._queue = void 0),
                  (a._queueTotalSize = void 0),
                  eo(a),
                  (a._started = !1),
                  (a._closeRequested = !1),
                  (a._pullAgain = !1),
                  (a._pulling = !1),
                  (a._strategySizeAlgorithm = s),
                  (a._strategyHWM = r),
                  (a._pullAlgorithm = i),
                  (a._cancelAlgorithm = o),
                  (e._readableStreamController = a),
                  p(
                    c(n()),
                    () => ((a._started = !0), tg(a), null),
                    (e) => (tb(a, e), null),
                  );
              })(this, s, eq(r, 1), e);
            }
          }
          get locked() {
            if (!tT(this)) throw tk("locked");
            return tE(this);
          }
          cancel(e) {
            return tT(this)
              ? tE(this)
                ? h(
                    TypeError(
                      "Cannot cancel a stream that already has a reader",
                    ),
                  )
                : tO(this, e)
              : h(tk("cancel"));
          }
          getReader(e) {
            if (!tT(this)) throw tk("getReader");
            return void 0 ===
              (function (e, t) {
                I(e, t);
                let r = null == e ? void 0 : e.mode;
                return {
                  mode:
                    void 0 === r
                      ? void 0
                      : (function (e, t) {
                          if ("byob" != (e = `${e}`))
                            throw TypeError(
                              `${t} '${e}' is not a valid enumeration value for ReadableStreamReaderMode`,
                            );
                          return e;
                        })(r, `${t} has member 'mode' that`),
                };
              })(e, "First parameter").mode
              ? new X(this)
              : new e$(this);
          }
          pipeThrough(e, t = {}) {
            if (!F(this)) throw tk("pipeThrough");
            z(e, 1, "pipeThrough");
            let r = (function (e, t) {
                I(e, t);
                let r = null == e ? void 0 : e.readable;
                M(r, "readable", "ReadableWritablePair"),
                  (function (e, t) {
                    if (!F(e)) throw TypeError(`${t} is not a ReadableStream.`);
                  })(r, `${t} has member 'readable' that`);
                let s = null == e ? void 0 : e.writable;
                return (
                  M(s, "writable", "ReadableWritablePair"),
                  (function (e, t) {
                    if (!B(e)) throw TypeError(`${t} is not a WritableStream.`);
                  })(s, `${t} has member 'writable' that`),
                  { readable: r, writable: s }
                );
              })(e, "First parameter"),
              s = tx(t, "Second parameter");
            if (this.locked)
              throw TypeError(
                "ReadableStream.prototype.pipeThrough cannot be used on a locked ReadableStream",
              );
            if (r.writable.locked)
              throw TypeError(
                "ReadableStream.prototype.pipeThrough cannot be used on a locked WritableStream",
              );
            return (
              f(
                tp(
                  this,
                  r.writable,
                  s.preventClose,
                  s.preventAbort,
                  s.preventCancel,
                  s.signal,
                ),
              ),
              r.readable
            );
          }
          pipeTo(e, t = {}) {
            let r;
            if (!F(this)) return h(tk("pipeTo"));
            if (void 0 === e) return h("Parameter 1 is required in 'pipeTo'.");
            if (!B(e))
              return h(
                TypeError(
                  "ReadableStream.prototype.pipeTo's first argument must be a WritableStream",
                ),
              );
            try {
              r = tx(t, "Second parameter");
            } catch (e) {
              return h(e);
            }
            return this.locked
              ? h(
                  TypeError(
                    "ReadableStream.prototype.pipeTo cannot be used on a locked ReadableStream",
                  ),
                )
              : e.locked
                ? h(
                    TypeError(
                      "ReadableStream.prototype.pipeTo cannot be used on a locked WritableStream",
                    ),
                  )
                : tp(
                    this,
                    e,
                    r.preventClose,
                    r.preventAbort,
                    r.preventCancel,
                    r.signal,
                  );
          }
          tee() {
            if (!F(this)) throw tk("tee");
            if (this.locked)
              throw TypeError("Cannot tee a stream that already has a reader");
            return !(function (e) {
              try {
                return e.getReader({ mode: "byob" }).releaseLock(), !0;
              } catch (e) {
                return !1;
              }
            })(this)
              ? (function (e, t) {
                  let r = e.getReader(),
                    s,
                    n,
                    i,
                    o,
                    a,
                    l = !1,
                    h = !1,
                    d = !1,
                    f = !1,
                    m = u((e) => {
                      a = e;
                    });
                  function g() {
                    return (
                      l
                        ? (h = !0)
                        : ((l = !0),
                          p(
                            r.read(),
                            (e) => {
                              if (((h = !1), e.done))
                                return (
                                  d || i.close(),
                                  f || o.close(),
                                  (d && f) || a(void 0),
                                  null
                                );
                              let t = e.value;
                              return (
                                d || i.enqueue(t),
                                f || o.enqueue(t),
                                (l = !1),
                                h && g(),
                                null
                              );
                            },
                            () => ((l = !1), null),
                          )),
                      c(void 0)
                    );
                  }
                  let y = new tS({
                      start(e) {
                        i = e;
                      },
                      pull: g,
                      cancel: function (e) {
                        if (((d = !0), (s = e), f)) {
                          let e = [s, n],
                            t = r.cancel(e);
                          a(t);
                        }
                        return m;
                      },
                    }),
                    b = new tS({
                      start(e) {
                        o = e;
                      },
                      pull: g,
                      cancel: function (e) {
                        if (((f = !0), (n = e), d)) {
                          let e = [s, n],
                            t = r.cancel(e);
                          a(t);
                        }
                        return m;
                      },
                    });
                  return (
                    p(
                      r.closed,
                      void 0,
                      (e) => (
                        i.error(e), o.error(e), (d && f) || a(void 0), null
                      ),
                    ),
                    [y, b]
                  );
                })(this)
              : (function (e) {
                  let t,
                    r,
                    s,
                    n,
                    i,
                    o = e.getReader(),
                    a = !1,
                    l = !1,
                    h = !1,
                    d = !1,
                    f = !1,
                    m = !1,
                    g = u((e) => {
                      i = e;
                    });
                  function y(e) {
                    p(
                      e.closed,
                      void 0,
                      (t) => (
                        e !== o ||
                          (s.error(t), n.error(t), (f && m) || i(void 0)),
                        null
                      ),
                    );
                  }
                  function b() {
                    a && (o.releaseLock(), y((o = e.getReader())), (a = !1)),
                      p(
                        o.read(),
                        (e) => {
                          var t, r;
                          if (((h = !1), (d = !1), e.done))
                            return (
                              f || s.close(),
                              m || n.close(),
                              null == (t = s.byobRequest) || t.respond(0),
                              null == (r = n.byobRequest) || r.respond(0),
                              (f && m) || i(void 0),
                              null
                            );
                          let a = e.value,
                            c = a;
                          if (!f && !m)
                            try {
                              c = es(a);
                            } catch (e) {
                              return (
                                s.error(e), n.error(e), i(o.cancel(e)), null
                              );
                            }
                          return (
                            f || s.enqueue(a),
                            m || n.enqueue(c),
                            (l = !1),
                            h ? _() : d && v(),
                            null
                          );
                        },
                        () => ((l = !1), null),
                      );
                  }
                  function w(t, r) {
                    a ||
                      (o.releaseLock(),
                      y((o = e.getReader({ mode: "byob" }))),
                      (a = !0));
                    let c = r ? n : s,
                      u = r ? s : n;
                    p(
                      o.read(t),
                      (e) => {
                        var t;
                        (h = !1), (d = !1);
                        let s = r ? m : f,
                          n = r ? f : m;
                        if (e.done) {
                          s || c.close(), n || u.close();
                          let r = e.value;
                          return (
                            void 0 !== r &&
                              (s || c.byobRequest.respondWithNewView(r),
                              n || null == (t = u.byobRequest) || t.respond(0)),
                            (s && n) || i(void 0),
                            null
                          );
                        }
                        let a = e.value;
                        if (n) s || c.byobRequest.respondWithNewView(a);
                        else {
                          let e;
                          try {
                            e = es(a);
                          } catch (e) {
                            return c.error(e), u.error(e), i(o.cancel(e)), null;
                          }
                          s || c.byobRequest.respondWithNewView(a),
                            u.enqueue(e);
                        }
                        return (l = !1), h ? _() : d && v(), null;
                      },
                      () => ((l = !1), null),
                    );
                  }
                  function _() {
                    if (l) return (h = !0), c(void 0);
                    l = !0;
                    let e = s.byobRequest;
                    return null === e ? b() : w(e.view, !1), c(void 0);
                  }
                  function v() {
                    if (l) return (d = !0), c(void 0);
                    l = !0;
                    let e = n.byobRequest;
                    return null === e ? b() : w(e.view, !0), c(void 0);
                  }
                  let x = new tS({
                      type: "bytes",
                      start(e) {
                        s = e;
                      },
                      pull: _,
                      cancel: function (e) {
                        if (((f = !0), (t = e), m)) {
                          let e = [t, r],
                            s = o.cancel(e);
                          i(s);
                        }
                        return g;
                      },
                    }),
                    S = new tS({
                      type: "bytes",
                      start(e) {
                        n = e;
                      },
                      pull: v,
                      cancel: function (e) {
                        if (((m = !0), (r = e), f)) {
                          let e = [t, r],
                            s = o.cancel(e);
                          i(s);
                        }
                        return g;
                      },
                    });
                  return y(o), [x, S];
                })(this);
          }
          values(e) {
            if (!F(this)) throw tk("values");
            return (function (e, t) {
              let r = new G(e.getReader(), t),
                s = Object.create(Q);
              return (s._asyncIteratorImpl = r), s;
            })(
              this,
              (I(e, "First parameter"),
              { preventCancel: !!(null == e ? void 0 : e.preventCancel) })
                .preventCancel,
            );
          }
        }
        function tT(e) {
          return (
            !!i(e) &&
            !!Object.prototype.hasOwnProperty.call(
              e,
              "_readableStreamController",
            ) &&
            e instanceof tS
          );
        }
        function tE(e) {
          return void 0 !== e._reader;
        }
        function tO(e, t) {
          if (((e._disturbed = !0), "closed" === e._state)) return c(void 0);
          if ("errored" === e._state) return h(e._storedError);
          tA(e);
          let r = e._reader;
          if (void 0 !== r && ej(r)) {
            let e = r._readIntoRequests;
            (r._readIntoRequests = new b()),
              e.forEach((e) => {
                e._closeSteps(void 0);
              });
          }
          return d(e._readableStreamController[v](t), n, void 0);
        }
        function tA(e) {
          e._state = "closed";
          let t = e._reader;
          if (void 0 !== t && (C(t), V(t))) {
            let e = t._readRequests;
            (t._readRequests = new b()),
              e.forEach((e) => {
                e._closeSteps();
              });
          }
        }
        function tR(e, t) {
          (e._state = "errored"), (e._storedError = t);
          let r = e._reader;
          void 0 !== r && (k(r, t), V(r) ? K(r, t) : ez(r, t));
        }
        function tk(e) {
          return TypeError(
            `ReadableStream.prototype.${e} can only be used on a ReadableStream`,
          );
        }
        function tC(e, t) {
          I(e, t);
          let r = null == e ? void 0 : e.highWaterMark;
          return (
            M(r, "highWaterMark", "QueuingStrategyInit"),
            { highWaterMark: q(r) }
          );
        }
        Object.defineProperties(tS.prototype, {
          cancel: { enumerable: !0 },
          getReader: { enumerable: !0 },
          pipeThrough: { enumerable: !0 },
          pipeTo: { enumerable: !0 },
          tee: { enumerable: !0 },
          values: { enumerable: !0 },
          locked: { enumerable: !0 },
        }),
          o(tS.prototype.cancel, "cancel"),
          o(tS.prototype.getReader, "getReader"),
          o(tS.prototype.pipeThrough, "pipeThrough"),
          o(tS.prototype.pipeTo, "pipeTo"),
          o(tS.prototype.tee, "tee"),
          o(tS.prototype.values, "values"),
          "symbol" == typeof s.toStringTag &&
            Object.defineProperty(tS.prototype, s.toStringTag, {
              value: "ReadableStream",
              configurable: !0,
            }),
          "symbol" == typeof s.asyncIterator &&
            Object.defineProperty(tS.prototype, s.asyncIterator, {
              value: tS.prototype.values,
              writable: !0,
              configurable: !0,
            });
        let tP = (e) => e.byteLength;
        o(tP, "size");
        class tL {
          constructor(e) {
            z(e, 1, "ByteLengthQueuingStrategy"),
              (e = tC(e, "First parameter")),
              (this._byteLengthQueuingStrategyHighWaterMark = e.highWaterMark);
          }
          get highWaterMark() {
            if (!t$(this)) throw tI("highWaterMark");
            return this._byteLengthQueuingStrategyHighWaterMark;
          }
          get size() {
            if (!t$(this)) throw tI("size");
            return tP;
          }
        }
        function tI(e) {
          return TypeError(
            `ByteLengthQueuingStrategy.prototype.${e} can only be used on a ByteLengthQueuingStrategy`,
          );
        }
        function t$(e) {
          return (
            !!i(e) &&
            !!Object.prototype.hasOwnProperty.call(
              e,
              "_byteLengthQueuingStrategyHighWaterMark",
            ) &&
            e instanceof tL
          );
        }
        Object.defineProperties(tL.prototype, {
          highWaterMark: { enumerable: !0 },
          size: { enumerable: !0 },
        }),
          "symbol" == typeof s.toStringTag &&
            Object.defineProperty(tL.prototype, s.toStringTag, {
              value: "ByteLengthQueuingStrategy",
              configurable: !0,
            });
        let tj = () => 1;
        o(tj, "size");
        class tz {
          constructor(e) {
            z(e, 1, "CountQueuingStrategy"),
              (e = tC(e, "First parameter")),
              (this._countQueuingStrategyHighWaterMark = e.highWaterMark);
          }
          get highWaterMark() {
            if (!tq(this)) throw tM("highWaterMark");
            return this._countQueuingStrategyHighWaterMark;
          }
          get size() {
            if (!tq(this)) throw tM("size");
            return tj;
          }
        }
        function tM(e) {
          return TypeError(
            `CountQueuingStrategy.prototype.${e} can only be used on a CountQueuingStrategy`,
          );
        }
        function tq(e) {
          return (
            !!i(e) &&
            !!Object.prototype.hasOwnProperty.call(
              e,
              "_countQueuingStrategyHighWaterMark",
            ) &&
            e instanceof tz
          );
        }
        Object.defineProperties(tz.prototype, {
          highWaterMark: { enumerable: !0 },
          size: { enumerable: !0 },
        }),
          "symbol" == typeof s.toStringTag &&
            Object.defineProperty(tz.prototype, s.toStringTag, {
              value: "CountQueuingStrategy",
              configurable: !0,
            });
        class tN {
          constructor(e = {}, t = {}, r = {}) {
            let s;
            void 0 === e && (e = null);
            let n = eF(t, "Second parameter"),
              i = eF(r, "Third parameter"),
              o = (function (e, t) {
                I(e, t);
                let r = null == e ? void 0 : e.flush,
                  s = null == e ? void 0 : e.readableType,
                  n = null == e ? void 0 : e.start,
                  i = null == e ? void 0 : e.transform,
                  o = null == e ? void 0 : e.writableType;
                return {
                  flush:
                    void 0 === r
                      ? void 0
                      : ($(r, `${t} has member 'flush' that`),
                        (t) => y(r, e, [t])),
                  readableType: s,
                  start:
                    void 0 === n
                      ? void 0
                      : ($(n, `${t} has member 'start' that`),
                        (t) => g(n, e, [t])),
                  transform:
                    void 0 === i
                      ? void 0
                      : ($(i, `${t} has member 'transform' that`),
                        (t, r) => y(i, e, [t, r])),
                  writableType: o,
                };
              })(e, "First parameter");
            if (void 0 !== o.readableType)
              throw RangeError("Invalid readableType specified");
            if (void 0 !== o.writableType)
              throw RangeError("Invalid writableType specified");
            let a = eq(i, 0),
              l = eN(i),
              p = eq(n, 1),
              f = eN(n);
            !(function (e, t, r, s, n, i) {
              var o, a, l;
              function h() {
                return t;
              }
              (e._writableState = "writable"),
                (e._writableStoredError = void 0),
                (e._writableHasInFlightOperation = !1),
                (e._writableStarted = !1),
                (o = function (t) {
                  let r = e._transformStreamController;
                  return e._backpressure
                    ? d(
                        e._backpressureChangePromise,
                        () => {
                          if (
                            "erroring" ===
                            (eW(e._writable)
                              ? e._writable._state
                              : e._writableState)
                          )
                            throw eW(e._writable)
                              ? e._writable._storedError
                              : e._writableStoredError;
                          return tV(r, t);
                        },
                        void 0,
                      )
                    : tV(r, t);
                }),
                (a = function () {
                  var t = e;
                  let r = t._transformStreamController,
                    s = r._flushAlgorithm();
                  return (
                    tJ(r),
                    d(
                      s,
                      () => {
                        if ("errored" === t._readableState)
                          throw t._readableStoredError;
                        tG(t) && tQ(t);
                      },
                      (e) => {
                        throw (tB(t, e), t._readableStoredError);
                      },
                    )
                  );
                }),
                (e._writable = new eD(
                  {
                    start(t) {
                      e._writableController = t;
                      try {
                        let r = t.signal;
                        void 0 !== r &&
                          r.addEventListener("abort", () => {
                            "writable" === e._writableState &&
                              ((e._writableState = "erroring"),
                              r.reason && (e._writableStoredError = r.reason));
                          });
                      } catch (e) {}
                      return d(
                        h(),
                        () => ((e._writableStarted = !0), t8(e), null),
                        (t) => {
                          throw ((e._writableStarted = !0), t1(e, t), t);
                        },
                      );
                    },
                    write: (t) => (
                      (e._writableHasInFlightOperation = !0),
                      d(
                        o(t),
                        () => (
                          (e._writableHasInFlightOperation = !1), t8(e), null
                        ),
                        (t) => {
                          throw (
                            ((e._writableHasInFlightOperation = !1),
                            t1(e, t),
                            t)
                          );
                        },
                      )
                    ),
                    close: () => (
                      (e._writableHasInFlightOperation = !0),
                      d(
                        a(),
                        () => (
                          (e._writableHasInFlightOperation = !1),
                          "erroring" === e._writableState &&
                            (e._writableStoredError = void 0),
                          (e._writableState = "closed"),
                          null
                        ),
                        (t) => {
                          throw (
                            ((e._writableHasInFlightOperation = !1),
                            e._writableState,
                            t1(e, t),
                            t)
                          );
                        },
                      )
                    ),
                    abort: (t) => (
                      (e._writableState = "errored"),
                      (e._writableStoredError = t),
                      (function (t) {
                        return tB(e, t), c(void 0);
                      })(t)
                    ),
                  },
                  { highWaterMark: r, size: s },
                )),
                (e._readableState = "readable"),
                (e._readableStoredError = void 0),
                (e._readableCloseRequested = !1),
                (e._readablePulling = !1),
                (l = function () {
                  return tW(e, !1), e._backpressureChangePromise;
                }),
                (e._readable = new tS(
                  {
                    start: (t) => (
                      (e._readableController = t),
                      h().catch((t) => {
                        tZ(e, t);
                      })
                    ),
                    pull: () => (
                      (e._readablePulling = !0),
                      l().catch((t) => {
                        tZ(e, t);
                      })
                    ),
                    cancel: (t) => (
                      (e._readableState = "closed"),
                      (function (t) {
                        return tD(e, t), c(void 0);
                      })(t)
                    ),
                  },
                  { highWaterMark: n, size: i },
                )),
                (e._backpressure = void 0),
                (e._backpressureChangePromise = void 0),
                (e._backpressureChangePromise_resolve = void 0),
                tW(e, !0),
                (e._transformStreamController = void 0);
            })(
              this,
              u((e) => {
                s = e;
              }),
              p,
              f,
              a,
              l,
            ),
              (function (e, t) {
                let r,
                  s,
                  n = Object.create(tU.prototype);
                (r =
                  void 0 !== t.transform
                    ? (e) => t.transform(e, n)
                    : (e) => {
                        try {
                          var t;
                          return tX(n, e), (t = void 0), c(t);
                        } catch (e) {
                          return h(e);
                        }
                      }),
                  (s = void 0 !== t.flush ? () => t.flush(n) : () => c(void 0)),
                  (n._controlledTransformStream = e),
                  (e._transformStreamController = n),
                  (n._transformAlgorithm = r),
                  (n._flushAlgorithm = s);
              })(this, o),
              void 0 !== o.start
                ? s(o.start(this._transformStreamController))
                : s(void 0);
          }
          get readable() {
            if (!tF(this)) throw tY("readable");
            return this._readable;
          }
          get writable() {
            if (!tF(this)) throw tY("writable");
            return this._writable;
          }
        }
        function tF(e) {
          return (
            !!i(e) &&
            !!Object.prototype.hasOwnProperty.call(
              e,
              "_transformStreamController",
            ) &&
            e instanceof tN
          );
        }
        function tB(e, t) {
          tZ(e, t), tD(e, t);
        }
        function tD(e, t) {
          tJ(e._transformStreamController),
            e._writableController.error(t),
            "writable" === e._writableState && t2(e, t),
            e._backpressure && tW(e, !1);
        }
        function tW(e, t) {
          void 0 !== e._backpressureChangePromise &&
            e._backpressureChangePromise_resolve(),
            (e._backpressureChangePromise = u((t) => {
              e._backpressureChangePromise_resolve = t;
            })),
            (e._backpressure = t);
        }
        Object.defineProperties(tN.prototype, {
          readable: { enumerable: !0 },
          writable: { enumerable: !0 },
        }),
          "symbol" == typeof s.toStringTag &&
            Object.defineProperty(tN.prototype, s.toStringTag, {
              value: "TransformStream",
              configurable: !0,
            });
        class tU {
          constructor() {
            throw TypeError("Illegal constructor");
          }
          get desiredSize() {
            if (!tH(this)) throw tK("desiredSize");
            return t0(this._controlledTransformStream);
          }
          enqueue(e) {
            if (!tH(this)) throw tK("enqueue");
            tX(this, e);
          }
          error(e) {
            if (!tH(this)) throw tK("error");
            tB(this._controlledTransformStream, e);
          }
          terminate() {
            if (!tH(this)) throw tK("terminate");
            let e = this._controlledTransformStream;
            tG(e) && tQ(e), tD(e, TypeError("TransformStream terminated"));
          }
        }
        function tH(e) {
          return (
            !!i(e) &&
            !!Object.prototype.hasOwnProperty.call(
              e,
              "_controlledTransformStream",
            ) &&
            e instanceof tU
          );
        }
        function tJ(e) {
          (e._transformAlgorithm = void 0), (e._flushAlgorithm = void 0);
        }
        function tX(e, t) {
          let r = e._controlledTransformStream;
          if (!tG(r))
            throw TypeError(
              "Readable side is not in a state that permits enqueue",
            );
          try {
            r._readablePulling = !1;
            try {
              r._readableController.enqueue(t);
            } catch (e) {
              throw (tZ(r, e), e);
            }
          } catch (e) {
            throw (tD(r, e), r._readableStoredError);
          }
          !(tG(r) && (r._readablePulling || t0(r) > 0)) !== r._backpressure &&
            tW(r, !0);
        }
        function tV(e, t) {
          return d(e._transformAlgorithm(t), void 0, (t) => {
            throw (tB(e._controlledTransformStream, t), t);
          });
        }
        function tK(e) {
          return TypeError(
            `TransformStreamDefaultController.prototype.${e} can only be used on a TransformStreamDefaultController`,
          );
        }
        function tY(e) {
          return TypeError(
            `TransformStream.prototype.${e} can only be used on a TransformStream`,
          );
        }
        function tG(e) {
          return !e._readableCloseRequested && "readable" === e._readableState;
        }
        function tQ(e) {
          (e._readableState = "closed"),
            (e._readableCloseRequested = !0),
            e._readableController.close();
        }
        function tZ(e, t) {
          "readable" === e._readableState &&
            ((e._readableState = "errored"), (e._readableStoredError = t)),
            e._readableController.error(t);
        }
        function t0(e) {
          return e._readableController.desiredSize;
        }
        function t1(e, t) {
          "writable" !== e._writableState ? t3(e) : t2(e, t);
        }
        function t2(e, t) {
          (e._writableState = "erroring"),
            (e._writableStoredError = t),
            !e._writableHasInFlightOperation && e._writableStarted && t3(e);
        }
        function t3(e) {
          e._writableState = "errored";
        }
        function t8(e) {
          "erroring" === e._writableState && t3(e);
        }
        Object.defineProperties(tU.prototype, {
          enqueue: { enumerable: !0 },
          error: { enumerable: !0 },
          terminate: { enumerable: !0 },
          desiredSize: { enumerable: !0 },
        }),
          o(tU.prototype.enqueue, "enqueue"),
          o(tU.prototype.error, "error"),
          o(tU.prototype.terminate, "terminate"),
          "symbol" == typeof s.toStringTag &&
            Object.defineProperty(tU.prototype, s.toStringTag, {
              value: "TransformStreamDefaultController",
              configurable: !0,
            });
        var t5,
          t4,
          t6,
          t7 = r(4908);
        async function* t9(e) {
          let t = e.byteOffset + e.byteLength,
            r = e.byteOffset;
          for (; r !== t; ) {
            let s = Math.min(t - r, 65536),
              n = e.buffer.slice(r, r + s);
            (r += n.byteLength), yield new Uint8Array(n);
          }
        }
        async function* re(e) {
          let t = 0;
          for (; t !== e.size; ) {
            let r = e.slice(t, Math.min(e.size, t + 65536)),
              s = await r.arrayBuffer();
            (t += s.byteLength), yield new Uint8Array(s);
          }
        }
        async function* rt(e, t = !1) {
          for (let r of e)
            ArrayBuffer.isView(r)
              ? t
                ? yield* t9(r)
                : yield r
              : (0, t7.T)(r.stream)
                ? yield* r.stream()
                : yield* re(r);
        }
        var rr = function (e, t, r, s) {
            if ("a" === r && !s)
              throw TypeError("Private accessor was defined without a getter");
            if ("function" == typeof t ? e !== t || !s : !t.has(e))
              throw TypeError(
                "Cannot read private member from an object whose class did not declare it",
              );
            return "m" === r
              ? s
              : "a" === r
                ? s.call(e)
                : s
                  ? s.value
                  : t.get(e);
          },
          rs = function (e, t, r, s, n) {
            if ("m" === s) throw TypeError("Private method is not writable");
            if ("a" === s && !n)
              throw TypeError("Private accessor was defined without a setter");
            if ("function" == typeof t ? e !== t || !n : !t.has(e))
              throw TypeError(
                "Cannot write private member to an object whose class did not declare it",
              );
            return (
              "a" === s ? n.call(e, r) : n ? (n.value = r) : t.set(e, r), r
            );
          };
        class rn {
          constructor(e = [], t = {}) {
            if (
              (t5.set(this, []),
              t4.set(this, ""),
              t6.set(this, 0),
              null != t || (t = {}),
              "object" != typeof e || null === e)
            )
              throw TypeError(
                "Failed to construct 'Blob': The provided value cannot be converted to a sequence.",
              );
            if (!(0, t7.T)(e[Symbol.iterator]))
              throw TypeError(
                "Failed to construct 'Blob': The object must have a callable @@iterator property.",
              );
            if ("object" != typeof t && !(0, t7.T)(t))
              throw TypeError(
                "Failed to construct 'Blob': parameter 2 cannot convert to dictionary.",
              );
            let r = new TextEncoder();
            for (let t of e) {
              let e;
              (e = ArrayBuffer.isView(t)
                ? new Uint8Array(
                    t.buffer.slice(t.byteOffset, t.byteOffset + t.byteLength),
                  )
                : t instanceof ArrayBuffer
                  ? new Uint8Array(t.slice(0))
                  : t instanceof rn
                    ? t
                    : r.encode(String(t))),
                rs(
                  this,
                  t6,
                  rr(this, t6, "f") +
                    (ArrayBuffer.isView(e) ? e.byteLength : e.size),
                  "f",
                ),
                rr(this, t5, "f").push(e);
            }
            let s = void 0 === t.type ? "" : String(t.type);
            rs(this, t4, /^[\x20-\x7E]*$/.test(s) ? s : "", "f");
          }
          static [((t5 = new WeakMap()),
          (t4 = new WeakMap()),
          (t6 = new WeakMap()),
          Symbol.hasInstance)](e) {
            return !!(
              e &&
              "object" == typeof e &&
              (0, t7.T)(e.constructor) &&
              ((0, t7.T)(e.stream) || (0, t7.T)(e.arrayBuffer)) &&
              /^(Blob|File)$/.test(e[Symbol.toStringTag])
            );
          }
          get type() {
            return rr(this, t4, "f");
          }
          get size() {
            return rr(this, t6, "f");
          }
          slice(e, t, r) {
            return new rn(
              (function* (e, t, r = 0, s) {
                null != s || (s = t);
                let n = r < 0 ? Math.max(t + r, 0) : Math.min(r, t),
                  i = s < 0 ? Math.max(t + s, 0) : Math.min(s, t),
                  o = Math.max(i - n, 0),
                  a = 0;
                for (let t of e) {
                  if (a >= o) break;
                  let e = ArrayBuffer.isView(t) ? t.byteLength : t.size;
                  if (n && e <= n) (n -= e), (i -= e);
                  else {
                    let r;
                    ArrayBuffer.isView(t)
                      ? (a += (r = t.subarray(n, Math.min(e, i))).byteLength)
                      : (a += (r = t.slice(n, Math.min(e, i))).size),
                      (i -= e),
                      (n = 0),
                      yield r;
                  }
                }
              })(rr(this, t5, "f"), this.size, e, t),
              { type: r },
            );
          }
          async text() {
            let e = new TextDecoder(),
              t = "";
            for await (let r of rt(rr(this, t5, "f")))
              t += e.decode(r, { stream: !0 });
            return t + e.decode();
          }
          async arrayBuffer() {
            let e = new Uint8Array(this.size),
              t = 0;
            for await (let r of rt(rr(this, t5, "f")))
              e.set(r, t), (t += r.length);
            return e.buffer;
          }
          stream() {
            let e = rt(rr(this, t5, "f"), !0);
            return new tS({
              async pull(t) {
                let { value: r, done: s } = await e.next();
                if (s) return queueMicrotask(() => t.close());
                t.enqueue(r);
              },
              async cancel() {
                await e.return();
              },
            });
          }
          get [Symbol.toStringTag]() {
            return "Blob";
          }
        }
        Object.defineProperties(rn.prototype, {
          type: { enumerable: !0 },
          size: { enumerable: !0 },
          slice: { enumerable: !0 },
          stream: { enumerable: !0 },
          text: { enumerable: !0 },
          arrayBuffer: { enumerable: !0 },
        });
      },
      80481: (e) => {
        "use strict";
        e.exports = require("node:readline");
      },
      81630: (e) => {
        "use strict";
        e.exports = require("http");
      },
      83526: (e, t, r) => {
        "use strict";
        r.d(t, { f: () => n });
        var s = r(39610);
        let n = (e) => e instanceof s.Z;
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
      86592: (e) => {
        "use strict";
        e.exports = require("node:inspector");
      },
      91645: (e) => {
        "use strict";
        e.exports = require("net");
      },
      94735: (e) => {
        "use strict";
        e.exports = require("events");
      },
    });
  var t = require("../../webpack-runtime.js");
  t.C(e);
  var r = (e) => t((t.s = e)),
    s = t.X(
      0,
      [
        827, 6518, 2033, 4027, 2872, 7713, 5149, 5728, 9729, 3390, 7401, 6867,
        4630, 8543,
      ],
      () => r(58132),
    );
  module.exports = s;
})();
//# sourceMappingURL=page.js.map
