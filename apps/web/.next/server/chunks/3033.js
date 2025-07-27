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
    (e._sentryDebugIds[t] = "e7e09626-0d73-4dae-a8c0-8d4cd4572b62"),
    (e._sentryDebugIdIdentifier =
      "sentry-dbid-e7e09626-0d73-4dae-a8c0-8d4cd4572b62"));
} catch (e) {}
(exports.id = 3033),
  (exports.ids = [3033]),
  (exports.modules = {
    73033: (e, t, r) => {
      "use strict";
      r.d(t, { fileFromPath: () => p });
      var i,
        o,
        s = r(29021),
        a = r(33873),
        n = r(86934),
        d = r(39610);
      let l = (e) =>
          Object.prototype.toString.call(e).slice(8, -1).toLowerCase(),
        c = function (e) {
          if ("object" !== l(e)) return !1;
          let t = Object.getPrototypeOf(e);
          return (
            null == t ||
            (t.constructor && t.constructor.toString()) === Object.toString()
          );
        };
      r(83526);
      var f = function (e, t, r, i, o) {
          if ("m" === i) throw TypeError("Private method is not writable");
          if ("a" === i && !o)
            throw TypeError("Private accessor was defined without a setter");
          if ("function" == typeof t ? e !== t || !o : !t.has(e))
            throw TypeError(
              "Cannot write private member to an object whose class did not declare it",
            );
          return "a" === i ? o.call(e, r) : o ? (o.value = r) : t.set(e, r), r;
        },
        h = function (e, t, r, i) {
          if ("a" === r && !i)
            throw TypeError("Private accessor was defined without a getter");
          if ("function" == typeof t ? e !== t || !i : !t.has(e))
            throw TypeError(
              "Cannot read private member from an object whose class did not declare it",
            );
          return "m" === r ? i : "a" === r ? i.call(e) : i ? i.value : t.get(e);
        };
      class u {
        constructor(e) {
          i.set(this, void 0),
            o.set(this, void 0),
            f(this, i, e.path, "f"),
            f(this, o, e.start || 0, "f"),
            (this.name = (0, a.basename)(h(this, i, "f"))),
            (this.size = e.size),
            (this.lastModified = e.lastModified);
        }
        slice(e, t) {
          return new u({
            path: h(this, i, "f"),
            lastModified: this.lastModified,
            size: t - e,
            start: e,
          });
        }
        async *stream() {
          let { mtimeMs: e } = await s.promises.stat(h(this, i, "f"));
          if (e > this.lastModified)
            throw new n(
              "The requested file could not be read, typically due to permission problems that have occurred after a reference to a file was acquired.",
              "NotReadableError",
            );
          this.size &&
            (yield* (0, s.createReadStream)(h(this, i, "f"), {
              start: h(this, o, "f"),
              end: h(this, o, "f") + this.size - 1,
            }));
        }
        get [((i = new WeakMap()), (o = new WeakMap()), Symbol.toStringTag)]() {
          return "File";
        }
      }
      async function p(e, t, r) {
        let i = await s.promises.stat(e);
        return (function (e, { mtimeMs: t, size: r }, i, o = {}) {
          let s;
          c(i) ? ([o, s] = [i, void 0]) : (s = i);
          let a = new u({ path: e, size: r, lastModified: t });
          return (
            s || (s = a.name),
            new d.Z([a], s, { ...o, lastModified: a.lastModified })
          );
        })(e, i, t, r);
      }
    },
    86934: (e, t, r) => {
      if (!globalThis.DOMException)
        try {
          let { MessageChannel: e } = r(73566),
            t = new e().port1,
            i = new ArrayBuffer();
          t.postMessage(i, [i, i]);
        } catch (e) {
          "DOMException" === e.constructor.name &&
            (globalThis.DOMException = e.constructor);
        }
      e.exports = globalThis.DOMException;
    },
  });
//# sourceMappingURL=3033.js.map
