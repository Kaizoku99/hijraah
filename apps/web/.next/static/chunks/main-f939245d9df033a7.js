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
    (e._sentryDebugIds[t] = "77997bed-7358-4b29-aa55-639bf6ca2950"),
    (e._sentryDebugIdIdentifier =
      "sentry-dbid-77997bed-7358-4b29-aa55-639bf6ca2950"));
} catch (e) {}
(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [8792],
  {
    20015: (e, t, r) => {
      "use strict";
      r.r(t), r.d(t, { onRouterTransitionStart: () => s });
      var n = r(51280),
        o = r(16548),
        i = r(80528),
        u = r(29143);
      n.Ts({
        dsn: u.env.SENTRY_DSN,
        integrations: [o.w()],
        tracesSampleRate: 1,
        replaysSessionSampleRate: 0.1,
        replaysOnErrorSampleRate: 1,
        debug: !1,
      });
      let s = i.Nc;
    },
    29143: (e) => {
      var t,
        r,
        n,
        o = (e.exports = {});
      function i() {
        throw Error("setTimeout has not been defined");
      }
      function u() {
        throw Error("clearTimeout has not been defined");
      }
      try {
        t = "function" == typeof setTimeout ? setTimeout : i;
      } catch (e) {
        t = i;
      }
      try {
        r = "function" == typeof clearTimeout ? clearTimeout : u;
      } catch (e) {
        r = u;
      }
      function s(e) {
        if (t === setTimeout) return setTimeout(e, 0);
        if ((t === i || !t) && setTimeout)
          return (t = setTimeout), setTimeout(e, 0);
        try {
          return t(e, 0);
        } catch (r) {
          try {
            return t.call(null, e, 0);
          } catch (r) {
            return t.call(this, e, 0);
          }
        }
      }
      var a = [],
        c = !1,
        l = -1;
      function f() {
        c &&
          n &&
          ((c = !1), n.length ? (a = n.concat(a)) : (l = -1), a.length && d());
      }
      function d() {
        if (!c) {
          var e = s(f);
          c = !0;
          for (var t = a.length; t; ) {
            for (n = a, a = []; ++l < t; ) n && n[l].run();
            (l = -1), (t = a.length);
          }
          (n = null),
            (c = !1),
            (function (e) {
              if (r === clearTimeout) return clearTimeout(e);
              if ((r === u || !r) && clearTimeout)
                return (r = clearTimeout), clearTimeout(e);
              try {
                r(e);
              } catch (t) {
                try {
                  return r.call(null, e);
                } catch (t) {
                  return r.call(this, e);
                }
              }
            })(e);
        }
      }
      function h(e, t) {
        (this.fun = e), (this.array = t);
      }
      function p() {}
      (o.nextTick = function (e) {
        var t = Array(arguments.length - 1);
        if (arguments.length > 1)
          for (var r = 1; r < arguments.length; r++) t[r - 1] = arguments[r];
        a.push(new h(e, t)), 1 !== a.length || c || s(d);
      }),
        (h.prototype.run = function () {
          this.fun.apply(null, this.array);
        }),
        (o.title = "browser"),
        (o.browser = !0),
        (o.env = {}),
        (o.argv = []),
        (o.version = ""),
        (o.versions = {}),
        (o.on = p),
        (o.addListener = p),
        (o.once = p),
        (o.off = p),
        (o.removeListener = p),
        (o.removeAllListeners = p),
        (o.emit = p),
        (o.prependListener = p),
        (o.prependOnceListener = p),
        (o.listeners = function (e) {
          return [];
        }),
        (o.binding = function (e) {
          throw Error("process.binding is not supported");
        }),
        (o.cwd = function () {
          return "/";
        }),
        (o.chdir = function (e) {
          throw Error("process.chdir is not supported");
        }),
        (o.umask = function () {
          return 0;
        });
    },
  },
  (e) => {
    var t = (t) => e((e.s = t));
    e.O(0, [6593, 3209], () => t(14898)), (_N_E = e.O());
  },
]);
