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
    (t._sentryDebugIds[e] = "9b643d2a-9087-4f57-b3bb-bcdc310aee49"),
    (t._sentryDebugIdIdentifier =
      "sentry-dbid-9b643d2a-9087-4f57-b3bb-bcdc310aee49"));
} catch (t) {}
(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [183],
  {
    3292: (t, e, n) => {
      "use strict";
      let r,
        i,
        o,
        s,
        a = "9.30.0",
        u = globalThis;
      function c() {
        return l(u), u;
      }
      function l(t) {
        let e = (t.__SENTRY__ = t.__SENTRY__ || {});
        return (e.version = e.version || a), (e[a] = e[a] || {});
      }
      function p(t, e, n = u) {
        let r = (n.__SENTRY__ = n.__SENTRY__ || {}),
          i = (r[a] = r[a] || {});
        return i[t] || (i[t] = e());
      }
      let f = Object.prototype.toString;
      function d(t) {
        switch (f.call(t)) {
          case "[object Error]":
          case "[object Exception]":
          case "[object DOMException]":
          case "[object WebAssembly.Exception]":
            return !0;
          default:
            return E(t, Error);
        }
      }
      function h(t, e) {
        return f.call(t) === `[object ${e}]`;
      }
      function _(t) {
        return h(t, "String");
      }
      function g(t) {
        return (
          "object" == typeof t &&
          null !== t &&
          "__sentry_template_string__" in t &&
          "__sentry_template_values__" in t
        );
      }
      function m(t) {
        return (
          null === t || g(t) || ("object" != typeof t && "function" != typeof t)
        );
      }
      function y(t) {
        return h(t, "Object");
      }
      function v(t) {
        return !!(t?.then && "function" == typeof t.then);
      }
      function E(t, e) {
        try {
          return t instanceof e;
        } catch (t) {
          return !1;
        }
      }
      function S(t) {
        return !!(
          "object" == typeof t &&
          null !== t &&
          (t.__isVue || t._isVue)
        );
      }
      function T(t) {
        return "undefined" != typeof Request && E(t, Request);
      }
      let b = ["debug", "info", "warn", "error", "log", "assert", "trace"],
        O = {};
      function R(t) {
        if (!("console" in u)) return t();
        let e = u.console,
          n = {},
          r = Object.keys(O);
        r.forEach((t) => {
          let r = O[t];
          (n[t] = e[t]), (e[t] = r);
        });
        try {
          return t();
        } finally {
          r.forEach((t) => {
            e[t] = n[t];
          });
        }
      }
      let L = p("logger", function () {
        let t = !1,
          e = {
            enable: () => {
              t = !0;
            },
            disable: () => {
              t = !1;
            },
            isEnabled: () => t,
          };
        return (
          b.forEach((t) => {
            e[t] = () => void 0;
          }),
          e
        );
      });
      function P(t, e = 0) {
        return "string" != typeof t || 0 === e || t.length <= e
          ? t
          : `${t.slice(0, e)}...`;
      }
      function A(t, e = [], n = !1) {
        return e.some((e) =>
          (function (t, e, n = !1) {
            return (
              !!_(t) &&
              (h(e, "RegExp")
                ? e.test(t)
                : !!_(e) && (n ? t === e : t.includes(e)))
            );
          })(t, e, n),
        );
      }
      function I(t, e, n) {
        if (!(e in t)) return;
        let r = t[e];
        if ("function" != typeof r) return;
        let i = n(r);
        "function" == typeof i &&
          (function (t, e) {
            try {
              let n = e.prototype || {};
              (t.prototype = e.prototype = n), C(t, "__sentry_original__", e);
            } catch (t) {}
          })(i, r);
        try {
          t[e] = i;
        } catch {}
      }
      function C(t, e, n) {
        try {
          Object.defineProperty(t, e, {
            value: n,
            writable: !0,
            configurable: !0,
          });
        } catch (t) {}
      }
      function w(t) {
        if (d(t))
          return { message: t.message, name: t.name, stack: t.stack, ...N(t) };
        if (!("undefined" != typeof Event && E(t, Event))) return t;
        {
          let e = {
            type: t.type,
            target: x(t.target),
            currentTarget: x(t.currentTarget),
            ...N(t),
          };
          return (
            "undefined" != typeof CustomEvent &&
              E(t, CustomEvent) &&
              (e.detail = t.detail),
            e
          );
        }
      }
      function x(t) {
        try {
          return "undefined" != typeof Element && E(t, Element)
            ? (function (t, e = {}) {
                if (!t) return "<unknown>";
                try {
                  let n,
                    r = t,
                    i = [],
                    o = 0,
                    s = 0,
                    a = Array.isArray(e) ? e : e.keyAttrs,
                    c = (!Array.isArray(e) && e.maxStringLength) || 80;
                  for (
                    ;
                    r &&
                    o++ < 5 &&
                    ((n = (function (t, e) {
                      let n = [];
                      if (!t?.tagName) return "";
                      if (
                        u.HTMLElement &&
                        t instanceof HTMLElement &&
                        t.dataset
                      ) {
                        if (t.dataset.sentryComponent)
                          return t.dataset.sentryComponent;
                        if (t.dataset.sentryElement)
                          return t.dataset.sentryElement;
                      }
                      n.push(t.tagName.toLowerCase());
                      let r = e?.length
                        ? e
                            .filter((e) => t.getAttribute(e))
                            .map((e) => [e, t.getAttribute(e)])
                        : null;
                      if (r?.length)
                        r.forEach((t) => {
                          n.push(`[${t[0]}="${t[1]}"]`);
                        });
                      else {
                        t.id && n.push(`#${t.id}`);
                        let e = t.className;
                        if (e && _(e))
                          for (let t of e.split(/\s+/)) n.push(`.${t}`);
                      }
                      for (let e of [
                        "aria-label",
                        "type",
                        "name",
                        "title",
                        "alt",
                      ]) {
                        let r = t.getAttribute(e);
                        r && n.push(`[${e}="${r}"]`);
                      }
                      return n.join("");
                    })(r, a)),
                    "html" !== n &&
                      (!(o > 1) || !(s + 3 * i.length + n.length >= c)));

                  )
                    i.push(n), (s += n.length), (r = r.parentNode);
                  return i.reverse().join(" > ");
                } catch (t) {
                  return "<unknown>";
                }
              })(t)
            : Object.prototype.toString.call(t);
        } catch (t) {
          return "<unknown>";
        }
      }
      function N(t) {
        if ("object" != typeof t || null === t) return {};
        {
          let e = {};
          for (let n in t)
            Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
          return e;
        }
      }
      function M(t = u.crypto || u.msCrypto) {
        let e = () => 16 * Math.random();
        try {
          if (t?.randomUUID) return t.randomUUID().replace(/-/g, "");
          t?.getRandomValues &&
            (e = () => {
              let e = new Uint8Array(1);
              return t.getRandomValues(e), e[0];
            });
        } catch (t) {}
        return "10000000100040008000100000000000".replace(/[018]/g, (t) =>
          (t ^ ((15 & e()) >> (t / 4))).toString(16),
        );
      }
      function k(t) {
        return t.exception?.values?.[0];
      }
      function D(t, e) {
        let n = k(t);
        if (!n) return;
        let r = n.mechanism;
        if (
          ((n.mechanism = { type: "generic", handled: !0, ...r, ...e }),
          e && "data" in e)
        ) {
          let t = { ...r?.data, ...e.data };
          n.mechanism.data = t;
        }
      }
      function U(t) {
        if (
          (function (t) {
            try {
              return t.__sentry_captured__;
            } catch {}
          })(t)
        )
          return !0;
        try {
          C(t, "__sentry_captured__", !0);
        } catch (t) {}
        return !1;
      }
      function j() {
        return Date.now() / 1e3;
      }
      let B = (function () {
        let { performance: t } = u;
        if (!t?.now) return j;
        let e = Date.now() - t.now(),
          n = void 0 == t.timeOrigin ? e : t.timeOrigin;
        return () => (n + t.now()) / 1e3;
      })();
      function $(t, e = {}) {
        if (
          (e.user &&
            (!t.ipAddress &&
              e.user.ip_address &&
              (t.ipAddress = e.user.ip_address),
            t.did ||
              e.did ||
              (t.did = e.user.id || e.user.email || e.user.username)),
          (t.timestamp = e.timestamp || B()),
          e.abnormal_mechanism && (t.abnormal_mechanism = e.abnormal_mechanism),
          e.ignoreDuration && (t.ignoreDuration = e.ignoreDuration),
          e.sid && (t.sid = 32 === e.sid.length ? e.sid : M()),
          void 0 !== e.init && (t.init = e.init),
          !t.did && e.did && (t.did = `${e.did}`),
          "number" == typeof e.started && (t.started = e.started),
          t.ignoreDuration)
        )
          t.duration = void 0;
        else if ("number" == typeof e.duration) t.duration = e.duration;
        else {
          let e = t.timestamp - t.started;
          t.duration = e >= 0 ? e : 0;
        }
        e.release && (t.release = e.release),
          e.environment && (t.environment = e.environment),
          !t.ipAddress && e.ipAddress && (t.ipAddress = e.ipAddress),
          !t.userAgent && e.userAgent && (t.userAgent = e.userAgent),
          "number" == typeof e.errors && (t.errors = e.errors),
          e.status && (t.status = e.status);
      }
      function F(t, e, n = 2) {
        if (!e || "object" != typeof e || n <= 0) return e;
        if (t && 0 === Object.keys(e).length) return t;
        let r = { ...t };
        for (let t in e)
          Object.prototype.hasOwnProperty.call(e, t) &&
            (r[t] = F(r[t], e[t], n - 1));
        return r;
      }
      let G = "_sentrySpan";
      function V(t, e) {
        e ? C(t, G, e) : delete t[G];
      }
      function X() {
        return M().substring(16);
      }
      class H {
        constructor() {
          (this._notifyingListeners = !1),
            (this._scopeListeners = []),
            (this._eventProcessors = []),
            (this._breadcrumbs = []),
            (this._attachments = []),
            (this._user = {}),
            (this._tags = {}),
            (this._extra = {}),
            (this._contexts = {}),
            (this._sdkProcessingMetadata = {}),
            (this._propagationContext = {
              traceId: M(),
              sampleRand: Math.random(),
            });
        }
        clone() {
          let t = new H();
          return (
            (t._breadcrumbs = [...this._breadcrumbs]),
            (t._tags = { ...this._tags }),
            (t._extra = { ...this._extra }),
            (t._contexts = { ...this._contexts }),
            this._contexts.flags &&
              (t._contexts.flags = {
                values: [...this._contexts.flags.values],
              }),
            (t._user = this._user),
            (t._level = this._level),
            (t._session = this._session),
            (t._transactionName = this._transactionName),
            (t._fingerprint = this._fingerprint),
            (t._eventProcessors = [...this._eventProcessors]),
            (t._attachments = [...this._attachments]),
            (t._sdkProcessingMetadata = { ...this._sdkProcessingMetadata }),
            (t._propagationContext = { ...this._propagationContext }),
            (t._client = this._client),
            (t._lastEventId = this._lastEventId),
            V(t, this[G]),
            t
          );
        }
        setClient(t) {
          this._client = t;
        }
        setLastEventId(t) {
          this._lastEventId = t;
        }
        getClient() {
          return this._client;
        }
        lastEventId() {
          return this._lastEventId;
        }
        addScopeListener(t) {
          this._scopeListeners.push(t);
        }
        addEventProcessor(t) {
          return this._eventProcessors.push(t), this;
        }
        setUser(t) {
          return (
            (this._user = t || {
              email: void 0,
              id: void 0,
              ip_address: void 0,
              username: void 0,
            }),
            this._session && $(this._session, { user: t }),
            this._notifyScopeListeners(),
            this
          );
        }
        getUser() {
          return this._user;
        }
        setTags(t) {
          return (
            (this._tags = { ...this._tags, ...t }),
            this._notifyScopeListeners(),
            this
          );
        }
        setTag(t, e) {
          return (
            (this._tags = { ...this._tags, [t]: e }),
            this._notifyScopeListeners(),
            this
          );
        }
        setExtras(t) {
          return (
            (this._extra = { ...this._extra, ...t }),
            this._notifyScopeListeners(),
            this
          );
        }
        setExtra(t, e) {
          return (
            (this._extra = { ...this._extra, [t]: e }),
            this._notifyScopeListeners(),
            this
          );
        }
        setFingerprint(t) {
          return (this._fingerprint = t), this._notifyScopeListeners(), this;
        }
        setLevel(t) {
          return (this._level = t), this._notifyScopeListeners(), this;
        }
        setTransactionName(t) {
          return (
            (this._transactionName = t), this._notifyScopeListeners(), this
          );
        }
        setContext(t, e) {
          return (
            null === e ? delete this._contexts[t] : (this._contexts[t] = e),
            this._notifyScopeListeners(),
            this
          );
        }
        setSession(t) {
          return (
            t ? (this._session = t) : delete this._session,
            this._notifyScopeListeners(),
            this
          );
        }
        getSession() {
          return this._session;
        }
        update(t) {
          if (!t) return this;
          let e = "function" == typeof t ? t(this) : t,
            {
              tags: n,
              extra: r,
              user: i,
              contexts: o,
              level: s,
              fingerprint: a = [],
              propagationContext: u,
            } = (e instanceof H ? e.getScopeData() : y(e) ? t : void 0) || {};
          return (
            (this._tags = { ...this._tags, ...n }),
            (this._extra = { ...this._extra, ...r }),
            (this._contexts = { ...this._contexts, ...o }),
            i && Object.keys(i).length && (this._user = i),
            s && (this._level = s),
            a.length && (this._fingerprint = a),
            u && (this._propagationContext = u),
            this
          );
        }
        clear() {
          return (
            (this._breadcrumbs = []),
            (this._tags = {}),
            (this._extra = {}),
            (this._user = {}),
            (this._contexts = {}),
            (this._level = void 0),
            (this._transactionName = void 0),
            (this._fingerprint = void 0),
            (this._session = void 0),
            V(this, void 0),
            (this._attachments = []),
            this.setPropagationContext({
              traceId: M(),
              sampleRand: Math.random(),
            }),
            this._notifyScopeListeners(),
            this
          );
        }
        addBreadcrumb(t, e) {
          let n = "number" == typeof e ? e : 100;
          if (n <= 0) return this;
          let r = {
            timestamp: j(),
            ...t,
            message: t.message ? P(t.message, 2048) : t.message,
          };
          return (
            this._breadcrumbs.push(r),
            this._breadcrumbs.length > n &&
              ((this._breadcrumbs = this._breadcrumbs.slice(-n)),
              this._client?.recordDroppedEvent("buffer_overflow", "log_item")),
            this._notifyScopeListeners(),
            this
          );
        }
        getLastBreadcrumb() {
          return this._breadcrumbs[this._breadcrumbs.length - 1];
        }
        clearBreadcrumbs() {
          return (this._breadcrumbs = []), this._notifyScopeListeners(), this;
        }
        addAttachment(t) {
          return this._attachments.push(t), this;
        }
        clearAttachments() {
          return (this._attachments = []), this;
        }
        getScopeData() {
          return {
            breadcrumbs: this._breadcrumbs,
            attachments: this._attachments,
            contexts: this._contexts,
            tags: this._tags,
            extra: this._extra,
            user: this._user,
            level: this._level,
            fingerprint: this._fingerprint || [],
            eventProcessors: this._eventProcessors,
            propagationContext: this._propagationContext,
            sdkProcessingMetadata: this._sdkProcessingMetadata,
            transactionName: this._transactionName,
            span: this[G],
          };
        }
        setSDKProcessingMetadata(t) {
          return (
            (this._sdkProcessingMetadata = F(
              this._sdkProcessingMetadata,
              t,
              2,
            )),
            this
          );
        }
        setPropagationContext(t) {
          return (this._propagationContext = t), this;
        }
        getPropagationContext() {
          return this._propagationContext;
        }
        captureException(t, e) {
          let n = e?.event_id || M();
          if (!this._client)
            return (
              L.warn(
                "No client configured on scope - will not capture exception!",
              ),
              n
            );
          let r = Error("Sentry syntheticException");
          return (
            this._client.captureException(
              t,
              {
                originalException: t,
                syntheticException: r,
                ...e,
                event_id: n,
              },
              this,
            ),
            n
          );
        }
        captureMessage(t, e, n) {
          let r = n?.event_id || M();
          if (!this._client)
            return (
              L.warn(
                "No client configured on scope - will not capture message!",
              ),
              r
            );
          let i = Error(t);
          return (
            this._client.captureMessage(
              t,
              e,
              {
                originalException: t,
                syntheticException: i,
                ...n,
                event_id: r,
              },
              this,
            ),
            r
          );
        }
        captureEvent(t, e) {
          let n = e?.event_id || M();
          return (
            this._client
              ? this._client.captureEvent(t, { ...e, event_id: n }, this)
              : L.warn(
                  "No client configured on scope - will not capture event!",
                ),
            n
          );
        }
        _notifyScopeListeners() {
          this._notifyingListeners ||
            ((this._notifyingListeners = !0),
            this._scopeListeners.forEach((t) => {
              t(this);
            }),
            (this._notifyingListeners = !1));
        }
      }
      function z() {
        return p("defaultCurrentScope", () => new H());
      }
      function Y() {
        return p("defaultIsolationScope", () => new H());
      }
      class W {
        constructor(t, e) {
          let n, r;
          (n = t || new H()),
            (r = e || new H()),
            (this._stack = [{ scope: n }]),
            (this._isolationScope = r);
        }
        withScope(t) {
          let e,
            n = this._pushScope();
          try {
            e = t(n);
          } catch (t) {
            throw (this._popScope(), t);
          }
          return v(e)
            ? e.then(
                (t) => (this._popScope(), t),
                (t) => {
                  throw (this._popScope(), t);
                },
              )
            : (this._popScope(), e);
        }
        getClient() {
          return this.getStackTop().client;
        }
        getScope() {
          return this.getStackTop().scope;
        }
        getIsolationScope() {
          return this._isolationScope;
        }
        getStackTop() {
          return this._stack[this._stack.length - 1];
        }
        _pushScope() {
          let t = this.getScope().clone();
          return this._stack.push({ client: this.getClient(), scope: t }), t;
        }
        _popScope() {
          return !(this._stack.length <= 1) && !!this._stack.pop();
        }
      }
      function K() {
        let t = l(c());
        return (t.stack = t.stack || new W(z(), Y()));
      }
      function q(t) {
        return K().withScope(t);
      }
      function J(t, e) {
        let n = K();
        return n.withScope(() => ((n.getStackTop().scope = t), e(t)));
      }
      function Z(t) {
        return K().withScope(() => t(K().getIsolationScope()));
      }
      function Q(t) {
        let e = l(t);
        return e.acs
          ? e.acs
          : {
              withIsolationScope: Z,
              withScope: q,
              withSetScope: J,
              withSetIsolationScope: (t, e) => Z(e),
              getCurrentScope: () => K().getScope(),
              getIsolationScope: () => K().getIsolationScope(),
            };
      }
      function tt() {
        return Q(c()).getCurrentScope();
      }
      function te() {
        return Q(c()).getIsolationScope();
      }
      function tn() {
        return p("globalScope", () => new H());
      }
      function tr(...t) {
        let e = Q(c());
        if (2 === t.length) {
          let [n, r] = t;
          return n ? e.withSetScope(n, r) : e.withScope(r);
        }
        return e.withScope(t[0]);
      }
      function ti() {
        return tt().getClient();
      }
      function to(t) {
        let {
            traceId: e,
            parentSpanId: n,
            propagationSpanId: r,
          } = t.getPropagationContext(),
          i = { trace_id: e, span_id: r || X() };
        return n && (i.parent_span_id = n), i;
      }
      let ts = "sentry.source",
        ta = "sentry.sample_rate",
        tu = "sentry.op",
        tc = "sentry.origin",
        tl = "sentry.custom_span_name",
        tp = "sentry.profile_id",
        tf = "sentry.exclusive_time";
      function td(t) {
        if (t < 400 && t >= 100) return { code: 1 };
        if (t >= 400 && t < 500)
          switch (t) {
            case 401:
              return { code: 2, message: "unauthenticated" };
            case 403:
              return { code: 2, message: "permission_denied" };
            case 404:
              return { code: 2, message: "not_found" };
            case 409:
              return { code: 2, message: "already_exists" };
            case 413:
              return { code: 2, message: "failed_precondition" };
            case 429:
              return { code: 2, message: "resource_exhausted" };
            case 499:
              return { code: 2, message: "cancelled" };
            default:
              return { code: 2, message: "invalid_argument" };
          }
        if (t >= 500 && t < 600)
          switch (t) {
            case 501:
              return { code: 2, message: "unimplemented" };
            case 503:
              return { code: 2, message: "unavailable" };
            case 504:
              return { code: 2, message: "deadline_exceeded" };
            default:
              return { code: 2, message: "internal_error" };
          }
        return { code: 2, message: "unknown_error" };
      }
      let th = "_sentryScope",
        t_ = "_sentryIsolationScope";
      function tg(t, e, n) {
        t && (C(t, t_, n), C(t, th, e));
      }
      function tm(t) {
        return { scope: t[th], isolationScope: t[t_] };
      }
      function ty(t) {
        if ("boolean" == typeof t) return Number(t);
        let e = "string" == typeof t ? parseFloat(t) : t;
        if (!("number" != typeof e || isNaN(e)) && !(e < 0) && !(e > 1))
          return e;
      }
      let tv = "sentry-",
        tE = /^sentry-/;
      function tS(t) {
        let e = tb(t);
        if (!e) return;
        let n = Object.entries(e).reduce(
          (t, [e, n]) => (e.match(tE) && (t[e.slice(tv.length)] = n), t),
          {},
        );
        return Object.keys(n).length > 0 ? n : void 0;
      }
      function tT(t) {
        if (t) {
          var e = Object.entries(t).reduce(
            (t, [e, n]) => (n && (t[`${tv}${e}`] = n), t),
            {},
          );
          return 0 !== Object.keys(e).length
            ? Object.entries(e).reduce((t, [e, n], r) => {
                let i = `${encodeURIComponent(e)}=${encodeURIComponent(n)}`,
                  o = 0 === r ? i : `${t},${i}`;
                return o.length > 8192 ? t : o;
              }, "")
            : void 0;
        }
      }
      function tb(t) {
        if (t && (_(t) || Array.isArray(t)))
          return Array.isArray(t)
            ? t.reduce(
                (t, e) => (
                  Object.entries(tO(e)).forEach(([e, n]) => {
                    t[e] = n;
                  }),
                  t
                ),
                {},
              )
            : tO(t);
      }
      function tO(t) {
        return t
          .split(",")
          .map((t) =>
            t.split("=").map((t) => {
              try {
                return decodeURIComponent(t.trim());
              } catch {
                return;
              }
            }),
          )
          .reduce((t, [e, n]) => (e && n && (t[e] = n), t), {});
      }
      let tR = RegExp(
        "^[ \\t]*([0-9a-f]{32})?-?([0-9a-f]{16})?-?([01])?[ \\t]*$",
      );
      function tL(t = M(), e = X(), n) {
        let r = "";
        return void 0 !== n && (r = n ? "-1" : "-0"), `${t}-${e}${r}`;
      }
      let tP = !1;
      function tA(t) {
        let { spanId: e, traceId: n, isRemote: r } = t.spanContext(),
          i = r ? e : tx(t).parent_span_id,
          o = tm(t).scope;
        return {
          parent_span_id: i,
          span_id: r ? o?.getPropagationContext().propagationSpanId || X() : e,
          trace_id: n,
        };
      }
      function tI(t) {
        return t && t.length > 0
          ? t.map(
              ({
                context: { spanId: t, traceId: e, traceFlags: n, ...r },
                attributes: i,
              }) => ({
                span_id: t,
                trace_id: e,
                sampled: 1 === n,
                attributes: i,
                ...r,
              }),
            )
          : void 0;
      }
      function tC(t) {
        return "number" == typeof t
          ? tw(t)
          : Array.isArray(t)
            ? t[0] + t[1] / 1e9
            : t instanceof Date
              ? tw(t.getTime())
              : B();
      }
      function tw(t) {
        return t > 0x2540be3ff ? t / 1e3 : t;
      }
      function tx(t) {
        var e;
        if ("function" == typeof t.getSpanJSON) return t.getSpanJSON();
        let { spanId: n, traceId: r } = t.spanContext();
        if (
          (e = t).attributes &&
          e.startTime &&
          e.name &&
          e.endTime &&
          e.status
        ) {
          let {
            attributes: e,
            startTime: i,
            name: o,
            endTime: s,
            status: a,
            links: u,
          } = t;
          return {
            span_id: n,
            trace_id: r,
            data: e,
            description: o,
            parent_span_id:
              "parentSpanId" in t
                ? t.parentSpanId
                : "parentSpanContext" in t
                  ? t.parentSpanContext?.spanId
                  : void 0,
            start_timestamp: tC(i),
            timestamp: tC(s) || void 0,
            status: tM(a),
            op: e[tu],
            origin: e[tc],
            links: tI(u),
          };
        }
        return { span_id: n, trace_id: r, start_timestamp: 0, data: {} };
      }
      function tN(t) {
        let { traceFlags: e } = t.spanContext();
        return 1 === e;
      }
      function tM(t) {
        if (t && 0 !== t.code)
          return 1 === t.code ? "ok" : t.message || "unknown_error";
      }
      let tk = "_sentryChildSpans",
        tD = "_sentryRootSpan";
      function tU(t, e) {
        let n = t[tD] || t;
        C(e, tD, n), t[tk] ? t[tk].add(e) : C(t, tk, new Set([e]));
      }
      function tj(t) {
        return t[tD] || t;
      }
      function tB() {
        let t = Q(c());
        return t.getActiveSpan ? t.getActiveSpan() : tt()[G];
      }
      function t$() {
        tP ||
          (R(() => {
            console.warn(
              "[Sentry] Returning null from `beforeSendSpan` is disallowed. To drop certain spans, configure the respective integrations directly.",
            );
          }),
          (tP = !0));
      }
      let tF = /\(error: (.*)\)/,
        tG = /captureMessage|captureException/;
      function tV(...t) {
        let e = t.sort((t, e) => t[0] - e[0]).map((t) => t[1]);
        return (t, n = 0, r = 0) => {
          let i = [],
            o = t.split("\n");
          for (let t = n; t < o.length; t++) {
            let n = o[t];
            if (n.length > 1024) continue;
            let s = tF.test(n) ? n.replace(tF, "$1") : n;
            if (!s.match(/\S*Error: /)) {
              for (let t of e) {
                let e = t(s);
                if (e) {
                  i.push(e);
                  break;
                }
              }
              if (i.length >= 50 + r) break;
            }
          }
          var s = i.slice(r);
          if (!s.length) return [];
          let a = Array.from(s);
          return (
            /sentryWrapped/.test(tX(a).function || "") && a.pop(),
            a.reverse(),
            tG.test(tX(a).function || "") &&
              (a.pop(), tG.test(tX(a).function || "") && a.pop()),
            a
              .slice(0, 50)
              .map((t) => ({
                ...t,
                filename: t.filename || tX(a).filename,
                function: t.function || "?",
              }))
          );
        };
      }
      function tX(t) {
        return t[t.length - 1] || {};
      }
      let tH = "<anonymous>";
      function tz(t) {
        let e = t.exception;
        if (e) {
          let t = [];
          try {
            return (
              e.values.forEach((e) => {
                e.stacktrace.frames && t.push(...e.stacktrace.frames);
              }),
              t
            );
          } catch (t) {}
        }
      }
      let tY = {},
        tW = {};
      function tK(t, e) {
        (tY[t] = tY[t] || []), tY[t].push(e);
      }
      function tq(t, e) {
        if (!tW[t]) {
          tW[t] = !0;
          try {
            e();
          } catch (t) {}
        }
      }
      function tJ(t, e) {
        let n = t && tY[t];
        if (n)
          for (let t of n)
            try {
              t(e);
            } catch (t) {}
      }
      let tZ = null;
      function tQ() {
        (tZ = u.onerror),
          (u.onerror = function (t, e, n, r, i) {
            return (
              tJ("error", { column: r, error: i, line: n, msg: t, url: e }),
              !!tZ && tZ.apply(this, arguments)
            );
          }),
          (u.onerror.__SENTRY_INSTRUMENTED__ = !0);
      }
      let t0 = null;
      function t1() {
        (t0 = u.onunhandledrejection),
          (u.onunhandledrejection = function (t) {
            return (
              tJ("unhandledrejection", t), !t0 || t0.apply(this, arguments)
            );
          }),
          (u.onunhandledrejection.__SENTRY_INSTRUMENTED__ = !0);
      }
      let t2 = !1;
      function t4() {
        if (!t2) {
          t2 = !0;
          let t = "error";
          tK(t, t3), tq(t, tQ);
          let e = "unhandledrejection";
          tK(e, t3), tq(e, t1);
        }
      }
      function t3() {
        let t = tB(),
          e = t && tj(t);
        e && e.setStatus({ code: 2, message: "internal_error" });
      }
      function t5(t, e, n = [e], r = "npm") {
        let i = t._metadata || {};
        i.sdk ||
          (i.sdk = {
            name: `sentry.javascript.${e}`,
            packages: n.map((t) => ({ name: `${r}:@sentry/${t}`, version: a })),
            version: a,
          }),
          (t._metadata = i);
      }
      function t9(t) {
        return "isRelative" in t;
      }
      t3.tag = "sentry_tracingErrorCallback";
      function t8(t) {
        if (!t) return {};
        let e = t.match(
          /^(([^:/?#]+):)?(\/\/([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?$/,
        );
        if (!e) return {};
        let n = e[6] || "",
          r = e[8] || "";
        return {
          host: e[4],
          path: e[5],
          protocol: e[2],
          search: n,
          hash: r,
          relative: e[5] + n + r,
        };
      }
      function t6(t) {
        return t.split(/[?#]/, 1)[0];
      }
      function t7(t) {
        let { protocol: e, host: n, path: r } = t,
          i =
            n
              ?.replace(/^.*@/, "[filtered]:[filtered]@")
              .replace(/(:80)$/, "")
              .replace(/(:443)$/, "") || "";
        return `${e ? `${e}://` : ""}${i}${r}`;
      }
      let et = /^o(\d+)\./,
        ee = /^(?:(\w+):)\/\/(?:(\w+)(?::(\w+)?)?@)([\w.-]+)(?::(\d+))?\/(.+)/;
      function en(t, e = !1) {
        let {
          host: n,
          path: r,
          pass: i,
          port: o,
          projectId: s,
          protocol: a,
          publicKey: u,
        } = t;
        return `${a}://${u}${e && i ? `:${i}` : ""}@${n}${o ? `:${o}` : ""}/${r ? `${r}/` : r}${s}`;
      }
      function er(t) {
        return {
          protocol: t.protocol,
          publicKey: t.publicKey || "",
          pass: t.pass || "",
          host: t.host,
          port: t.port || "",
          path: t.path || "",
          projectId: t.projectId,
        };
      }
      function ei(t, e = 100, n = Infinity) {
        try {
          return (function t(
            e,
            n,
            r = Infinity,
            i = Infinity,
            o = (function () {
              let t = new WeakSet();
              return [
                function (e) {
                  return !!t.has(e) || (t.add(e), !1);
                },
                function (e) {
                  t.delete(e);
                },
              ];
            })(),
          ) {
            let [s, a] = o;
            if (
              null == n ||
              ["boolean", "string"].includes(typeof n) ||
              ("number" == typeof n && Number.isFinite(n))
            )
              return n;
            let u = (function (t, e) {
              try {
                if ("domain" === t && e && "object" == typeof e && e._events)
                  return "[Domain]";
                if ("domainEmitter" === t) return "[DomainEmitter]";
                if ("undefined" != typeof global && e === global)
                  return "[Global]";
                if ("undefined" != typeof window && e === window)
                  return "[Window]";
                if ("undefined" != typeof document && e === document)
                  return "[Document]";
                if (S(e)) return "[VueViewModel]";
                if (
                  y(e) &&
                  "nativeEvent" in e &&
                  "preventDefault" in e &&
                  "stopPropagation" in e
                )
                  return "[SyntheticEvent]";
                if ("number" == typeof e && !Number.isFinite(e))
                  return `[${e}]`;
                if ("function" == typeof e)
                  return `[Function: ${(function (t) {
                    try {
                      if (!t || "function" != typeof t) return tH;
                      return t.name || tH;
                    } catch (t) {
                      return tH;
                    }
                  })(e)}]`;
                if ("symbol" == typeof e) return `[${String(e)}]`;
                if ("bigint" == typeof e) return `[BigInt: ${String(e)}]`;
                let n = (function (t) {
                  let e = Object.getPrototypeOf(t);
                  return e?.constructor ? e.constructor.name : "null prototype";
                })(e);
                if (/^HTML(\w*)Element$/.test(n)) return `[HTMLElement: ${n}]`;
                return `[object ${n}]`;
              } catch (t) {
                return `**non-serializable** (${t})`;
              }
            })(e, n);
            if (!u.startsWith("[object ")) return u;
            if (n.__sentry_skip_normalization__) return n;
            let c =
              "number" == typeof n.__sentry_override_normalization_depth__
                ? n.__sentry_override_normalization_depth__
                : r;
            if (0 === c) return u.replace("object ", "");
            if (s(n)) return "[Circular ~]";
            if (n && "function" == typeof n.toJSON)
              try {
                let e = n.toJSON();
                return t("", e, c - 1, i, o);
              } catch (t) {}
            let l = Array.isArray(n) ? [] : {},
              p = 0,
              f = w(n);
            for (let e in f) {
              if (!Object.prototype.hasOwnProperty.call(f, e)) continue;
              if (p >= i) {
                l[e] = "[MaxProperties ~]";
                break;
              }
              let n = f[e];
              (l[e] = t(e, n, c - 1, i, o)), p++;
            }
            return a(n), l;
          })("", t, e, n);
        } catch (t) {
          return { ERROR: `**non-serializable** (${t})` };
        }
      }
      function eo(t, e = []) {
        return [t, e];
      }
      function es(t, e) {
        for (let n of t[1]) {
          let t = n[0].type;
          if (e(n, t)) return !0;
        }
        return !1;
      }
      function ea(t) {
        let e = l(u);
        return e.encodePolyfill
          ? e.encodePolyfill(t)
          : new TextEncoder().encode(t);
      }
      let eu = {
        session: "session",
        sessions: "session",
        attachment: "attachment",
        transaction: "transaction",
        event: "error",
        client_report: "internal",
        user_report: "default",
        profile: "profile",
        profile_chunk: "profile",
        replay_event: "replay",
        replay_recording: "replay",
        check_in: "monitor",
        feedback: "feedback",
        span: "span",
        raw_security: "security",
        log: "log_item",
      };
      function ec(t) {
        if (!t?.sdk) return;
        let { name: e, version: n } = t.sdk;
        return { name: e, version: n };
      }
      let el = "production";
      function ep(t) {
        if ("boolean" == typeof __SENTRY_TRACING__ && !__SENTRY_TRACING__)
          return !1;
        let e = t || ti()?.getOptions();
        return !!e && (null != e.tracesSampleRate || !!e.tracesSampler);
      }
      let ef = "_frozenDsc";
      function ed(t, e) {
        let n,
          r = e.getOptions(),
          { publicKey: i, host: o } = e.getDsn() || {};
        r.orgId
          ? (n = String(r.orgId))
          : o &&
            (n = (function (t) {
              let e = t.match(et);
              return e?.[1];
            })(o));
        let s = {
          environment: r.environment || el,
          release: r.release,
          public_key: i,
          trace_id: t,
          org_id: n,
        };
        return e.emit("createDsc", s), s;
      }
      function eh(t, e) {
        let n = e.getPropagationContext();
        return n.dsc || ed(n.traceId, t);
      }
      function e_(t) {
        let e = ti();
        if (!e) return {};
        let n = tj(t),
          r = tx(n),
          i = r.data,
          o = n.spanContext().traceState,
          s =
            o?.get("sentry.sample_rate") ??
            i[ta] ??
            i["sentry.previous_trace_sample_rate"];
        function a(t) {
          return (
            ("number" == typeof s || "string" == typeof s) &&
              (t.sample_rate = `${s}`),
            t
          );
        }
        let u = n[ef];
        if (u) return a(u);
        let c = o?.get("sentry.dsc"),
          l = c && tS(c);
        if (l) return a(l);
        let p = ed(t.spanContext().traceId, e),
          f = i[ts],
          d = r.description;
        return (
          "url" !== f && d && (p.transaction = d),
          ep() &&
            ((p.sampled = String(tN(n))),
            (p.sample_rand =
              o?.get("sentry.sample_rand") ??
              tm(n).scope?.getPropagationContext().sampleRand.toString())),
          a(p),
          e.emit("createDsc", p, n),
          p
        );
      }
      let eg = [];
      function em(t, e) {
        for (let n of e) n?.afterAllSetup && n.afterAllSetup(t);
      }
      function ey(t, e, n) {
        if (!n[e.name]) {
          if (
            ((n[e.name] = e),
            -1 === eg.indexOf(e.name) &&
              "function" == typeof e.setupOnce &&
              (e.setupOnce(), eg.push(e.name)),
            e.setup && "function" == typeof e.setup && e.setup(t),
            "function" == typeof e.preprocessEvent)
          ) {
            let n = e.preprocessEvent.bind(e);
            t.on("preprocessEvent", (e, r) => n(e, r, t));
          }
          if ("function" == typeof e.processEvent) {
            let n = e.processEvent.bind(e),
              r = Object.assign((e, r) => n(e, r, t), { id: e.name });
            t.addEventProcessor(r);
          }
        }
      }
      function ev(t) {
        return new eS((e) => {
          e(t);
        });
      }
      function eE(t) {
        return new eS((e, n) => {
          n(t);
        });
      }
      !(function (t) {
        (t[(t.PENDING = 0)] = "PENDING"),
          (t[(t.RESOLVED = 1)] = "RESOLVED"),
          (t[(t.REJECTED = 2)] = "REJECTED");
      })(nb || (nb = {}));
      class eS {
        constructor(t) {
          (this._state = nb.PENDING),
            (this._handlers = []),
            this._runExecutor(t);
        }
        then(t, e) {
          return new eS((n, r) => {
            this._handlers.push([
              !1,
              (e) => {
                if (t)
                  try {
                    n(t(e));
                  } catch (t) {
                    r(t);
                  }
                else n(e);
              },
              (t) => {
                if (e)
                  try {
                    n(e(t));
                  } catch (t) {
                    r(t);
                  }
                else r(t);
              },
            ]),
              this._executeHandlers();
          });
        }
        catch(t) {
          return this.then((t) => t, t);
        }
        finally(t) {
          return new eS((e, n) => {
            let r, i;
            return this.then(
              (e) => {
                (i = !1), (r = e), t && t();
              },
              (e) => {
                (i = !0), (r = e), t && t();
              },
            ).then(() => {
              if (i) return void n(r);
              e(r);
            });
          });
        }
        _executeHandlers() {
          if (this._state === nb.PENDING) return;
          let t = this._handlers.slice();
          (this._handlers = []),
            t.forEach((t) => {
              t[0] ||
                (this._state === nb.RESOLVED && t[1](this._value),
                this._state === nb.REJECTED && t[2](this._value),
                (t[0] = !0));
            });
        }
        _runExecutor(t) {
          let e = (t, e) => {
              if (this._state === nb.PENDING) {
                if (v(e)) return void e.then(n, r);
                (this._state = t), (this._value = e), this._executeHandlers();
              }
            },
            n = (t) => {
              e(nb.RESOLVED, t);
            },
            r = (t) => {
              e(nb.REJECTED, t);
            };
          try {
            t(n, r);
          } catch (t) {
            r(t);
          }
        }
      }
      function eT(t, e) {
        let {
          extra: n,
          tags: r,
          user: i,
          contexts: o,
          level: s,
          sdkProcessingMetadata: a,
          breadcrumbs: u,
          fingerprint: c,
          eventProcessors: l,
          attachments: p,
          propagationContext: f,
          transactionName: d,
          span: h,
        } = e;
        eb(t, "extra", n),
          eb(t, "tags", r),
          eb(t, "user", i),
          eb(t, "contexts", o),
          (t.sdkProcessingMetadata = F(t.sdkProcessingMetadata, a, 2)),
          s && (t.level = s),
          d && (t.transactionName = d),
          h && (t.span = h),
          u.length && (t.breadcrumbs = [...t.breadcrumbs, ...u]),
          c.length && (t.fingerprint = [...t.fingerprint, ...c]),
          l.length && (t.eventProcessors = [...t.eventProcessors, ...l]),
          p.length && (t.attachments = [...t.attachments, ...p]),
          (t.propagationContext = { ...t.propagationContext, ...f });
      }
      function eb(t, e, n) {
        t[e] = F(t[e], n, 1);
      }
      let eO = Symbol.for("SentryInternalError"),
        eR = Symbol.for("SentryDoNotSendEventError");
      function eL(t) {
        return { message: t, [eO]: !0 };
      }
      function eP(t) {
        return { message: t, [eR]: !0 };
      }
      class eA {
        constructor(t) {
          if (
            ((this._options = t),
            (this._integrations = {}),
            (this._numProcessing = 0),
            (this._outcomes = {}),
            (this._hooks = {}),
            (this._eventProcessors = []),
            t.dsn &&
              (this._dsn = (function (t) {
                var e;
                let n =
                  "string" == typeof t
                    ? (function (t) {
                        let e = ee.exec(t);
                        if (!e)
                          return void R(() => {
                            console.error(`Invalid Sentry Dsn: ${t}`);
                          });
                        let [n, r, i = "", o = "", s = "", a = ""] = e.slice(1),
                          u = "",
                          c = a,
                          l = c.split("/");
                        if (
                          (l.length > 1 &&
                            ((u = l.slice(0, -1).join("/")), (c = l.pop())),
                          c)
                        ) {
                          let t = c.match(/^\d+/);
                          t && (c = t[0]);
                        }
                        return er({
                          host: o,
                          pass: i,
                          path: u,
                          projectId: c,
                          port: s,
                          protocol: n,
                          publicKey: r,
                        });
                      })(t)
                    : er(t);
                if (n && ((e = 0), 1)) return n;
              })(t.dsn)),
            this._dsn)
          ) {
            let e = (function (t, e, n) {
              return (
                e ||
                `${(function (t) {
                  let e = t.protocol ? `${t.protocol}:` : "",
                    n = t.port ? `:${t.port}` : "";
                  return `${e}//${t.host}${n}${t.path ? `/${t.path}` : ""}/api/`;
                })(t)}${t.projectId}/envelope/?${(function (t, e) {
                  let n = { sentry_version: "7" };
                  return (
                    t.publicKey && (n.sentry_key = t.publicKey),
                    e && (n.sentry_client = `${e.name}/${e.version}`),
                    new URLSearchParams(n).toString()
                  );
                })(t, n)}`
              );
            })(this._dsn, t.tunnel, t._metadata ? t._metadata.sdk : void 0);
            this._transport = t.transport({
              tunnel: this._options.tunnel,
              recordDroppedEvent: this.recordDroppedEvent.bind(this),
              ...t.transportOptions,
              url: e,
            });
          }
        }
        captureException(t, e, n) {
          let r = M();
          if (U(t)) return r;
          let i = { event_id: r, ...e };
          return (
            this._process(
              this.eventFromException(t, i).then((t) =>
                this._captureEvent(t, i, n),
              ),
            ),
            i.event_id
          );
        }
        captureMessage(t, e, n, r) {
          let i = { event_id: M(), ...n },
            o = g(t) ? t : String(t),
            s = m(t)
              ? this.eventFromMessage(o, e, i)
              : this.eventFromException(t, i);
          return (
            this._process(s.then((t) => this._captureEvent(t, i, r))),
            i.event_id
          );
        }
        captureEvent(t, e, n) {
          let r = M();
          if (e?.originalException && U(e.originalException)) return r;
          let i = { event_id: r, ...e },
            o = t.sdkProcessingMetadata || {},
            s = o.capturedSpanScope,
            a = o.capturedSpanIsolationScope;
          return this._process(this._captureEvent(t, i, s || n, a)), i.event_id;
        }
        captureSession(t) {
          this.sendSession(t), $(t, { init: !1 });
        }
        getDsn() {
          return this._dsn;
        }
        getOptions() {
          return this._options;
        }
        getSdkMetadata() {
          return this._options._metadata;
        }
        getTransport() {
          return this._transport;
        }
        flush(t) {
          let e = this._transport;
          return e
            ? (this.emit("flush"),
              this._isClientDoneProcessing(t).then((n) =>
                e.flush(t).then((t) => n && t),
              ))
            : ev(!0);
        }
        close(t) {
          return this.flush(t).then(
            (t) => ((this.getOptions().enabled = !1), this.emit("close"), t),
          );
        }
        getEventProcessors() {
          return this._eventProcessors;
        }
        addEventProcessor(t) {
          this._eventProcessors.push(t);
        }
        init() {
          (this._isEnabled() ||
            this._options.integrations.some(({ name: t }) =>
              t.startsWith("Spotlight"),
            )) &&
            this._setupIntegrations();
        }
        getIntegrationByName(t) {
          return this._integrations[t];
        }
        addIntegration(t) {
          let e = this._integrations[t.name];
          ey(this, t, this._integrations), e || em(this, [t]);
        }
        sendEvent(t, e = {}) {
          this.emit("beforeSendEvent", t, e);
          let n = (function (t, e, n, r) {
            var i;
            let o = ec(n),
              s = t.type && "replay_event" !== t.type ? t.type : "event";
            (i = n?.sdk) &&
              ((t.sdk = t.sdk || {}),
              (t.sdk.name = t.sdk.name || i.name),
              (t.sdk.version = t.sdk.version || i.version),
              (t.sdk.integrations = [
                ...(t.sdk.integrations || []),
                ...(i.integrations || []),
              ]),
              (t.sdk.packages = [
                ...(t.sdk.packages || []),
                ...(i.packages || []),
              ]));
            let a = (function (t, e, n, r) {
              let i = t.sdkProcessingMetadata?.dynamicSamplingContext;
              return {
                event_id: t.event_id,
                sent_at: new Date().toISOString(),
                ...(e && { sdk: e }),
                ...(!!n && r && { dsn: en(r) }),
                ...(i && { trace: i }),
              };
            })(t, o, r, e);
            return delete t.sdkProcessingMetadata, eo(a, [[{ type: s }, t]]);
          })(t, this._dsn, this._options._metadata, this._options.tunnel);
          for (let t of e.attachments || [])
            n = (function (t, e) {
              let [n, r] = t;
              return [n, [...r, e]];
            })(
              n,
              (function (t) {
                let e = "string" == typeof t.data ? ea(t.data) : t.data;
                return [
                  {
                    type: "attachment",
                    length: e.length,
                    filename: t.filename,
                    content_type: t.contentType,
                    attachment_type: t.attachmentType,
                  },
                  e,
                ];
              })(t),
            );
          let r = this.sendEnvelope(n);
          r && r.then((e) => this.emit("afterSendEvent", t, e), null);
        }
        sendSession(t) {
          let { release: e, environment: n = el } = this._options;
          if ("aggregates" in t) {
            let r = t.attrs || {};
            if (!r.release && !e) return;
            (r.release = r.release || e),
              (r.environment = r.environment || n),
              (t.attrs = r);
          } else {
            if (!t.release && !e) return;
            (t.release = t.release || e), (t.environment = t.environment || n);
          }
          this.emit("beforeSendSession", t);
          let r = (function (t, e, n, r) {
            let i = ec(n);
            return eo(
              {
                sent_at: new Date().toISOString(),
                ...(i && { sdk: i }),
                ...(!!r && e && { dsn: en(e) }),
              },
              [
                "aggregates" in t
                  ? [{ type: "sessions" }, t]
                  : [{ type: "session" }, t.toJSON()],
              ],
            );
          })(t, this._dsn, this._options._metadata, this._options.tunnel);
          this.sendEnvelope(r);
        }
        recordDroppedEvent(t, e, n = 1) {
          if (this._options.sendClientReports) {
            let r = `${t}:${e}`;
            this._outcomes[r] = (this._outcomes[r] || 0) + n;
          }
        }
        on(t, e) {
          let n = (this._hooks[t] = this._hooks[t] || []);
          return (
            n.push(e),
            () => {
              let t = n.indexOf(e);
              t > -1 && n.splice(t, 1);
            }
          );
        }
        emit(t, ...e) {
          let n = this._hooks[t];
          n && n.forEach((t) => t(...e));
        }
        sendEnvelope(t) {
          return (this.emit("beforeEnvelope", t),
          this._isEnabled() && this._transport)
            ? this._transport.send(t).then(null, (t) => t)
            : ev({});
        }
        _setupIntegrations() {
          let { integrations: t } = this._options;
          (this._integrations = (function (t, e) {
            let n = {};
            return (
              e.forEach((e) => {
                e && ey(t, e, n);
              }),
              n
            );
          })(this, t)),
            em(this, t);
        }
        _updateSessionFromEvent(t, e) {
          let n = "fatal" === e.level,
            r = !1,
            i = e.exception?.values;
          if (i)
            for (let t of ((r = !0), i)) {
              let e = t.mechanism;
              if (e?.handled === !1) {
                n = !0;
                break;
              }
            }
          let o = "ok" === t.status;
          ((o && 0 === t.errors) || (o && n)) &&
            ($(t, {
              ...(n && { status: "crashed" }),
              errors: t.errors || Number(r || n),
            }),
            this.captureSession(t));
        }
        _isClientDoneProcessing(t) {
          return new eS((e) => {
            let n = 0,
              r = setInterval(() => {
                0 == this._numProcessing
                  ? (clearInterval(r), e(!0))
                  : ((n += 1), t && n >= t && (clearInterval(r), e(!1)));
              }, 1);
          });
        }
        _isEnabled() {
          return !1 !== this.getOptions().enabled && void 0 !== this._transport;
        }
        _prepareEvent(t, e, n, s) {
          let a = this.getOptions(),
            c = Object.keys(this._integrations);
          return (
            !e.integrations && c?.length && (e.integrations = c),
            this.emit("preprocessEvent", t, e),
            t.type || s.setLastEventId(t.event_id || e.event_id),
            (function (t, e, n, s, a, c) {
              var l, p, f, d, h, _;
              let { normalizeDepth: g = 3, normalizeMaxBreadth: m = 1e3 } = t,
                y = {
                  ...e,
                  event_id: e.event_id || n.event_id || M(),
                  timestamp: e.timestamp || j(),
                },
                E = n.integrations || t.integrations.map((t) => t.name);
              (function (t, e) {
                let {
                  environment: n,
                  release: r,
                  dist: i,
                  maxValueLength: o = 250,
                } = e;
                (t.environment = t.environment || n || el),
                  !t.release && r && (t.release = r),
                  !t.dist && i && (t.dist = i);
                let s = t.request;
                s?.url && (s.url = P(s.url, o));
              })(y, t),
                (l = y),
                (p = E).length > 0 &&
                  ((l.sdk = l.sdk || {}),
                  (l.sdk.integrations = [...(l.sdk.integrations || []), ...p])),
                a && a.emit("applyFrameMetadata", e),
                void 0 === e.type &&
                  (function (t, e) {
                    let n = (function (t) {
                      let e = u._sentryDebugIds;
                      if (!e) return {};
                      let n = Object.keys(e);
                      return o && n.length === i
                        ? o
                        : ((i = n.length),
                          (o = n.reduce((n, i) => {
                            r || (r = {});
                            let o = r[i];
                            if (o) n[o[0]] = o[1];
                            else {
                              let o = t(i);
                              for (let t = o.length - 1; t >= 0; t--) {
                                let s = o[t],
                                  a = s?.filename,
                                  u = e[i];
                                if (a && u) {
                                  (n[a] = u), (r[i] = [a, u]);
                                  break;
                                }
                              }
                            }
                            return n;
                          }, {})));
                    })(e);
                    t.exception?.values?.forEach((t) => {
                      t.stacktrace?.frames?.forEach((t) => {
                        t.filename && (t.debug_id = n[t.filename]);
                      });
                    });
                  })(y, t.stackParser);
              let S = (function (t, e) {
                if (!e) return t;
                let n = t ? t.clone() : new H();
                return n.update(e), n;
              })(s, n.captureContext);
              n.mechanism && D(y, n.mechanism);
              let T = a ? a.getEventProcessors() : [],
                b = tn().getScopeData();
              c && eT(b, c.getScopeData()), S && eT(b, S.getScopeData());
              let O = [...(n.attachments || []), ...b.attachments];
              O.length && (n.attachments = O);
              let {
                fingerprint: R,
                span: L,
                breadcrumbs: A,
                sdkProcessingMetadata: I,
              } = b;
              return (
                (function (t, e) {
                  let {
                    extra: n,
                    tags: r,
                    user: i,
                    contexts: o,
                    level: s,
                    transactionName: a,
                  } = e;
                  Object.keys(n).length && (t.extra = { ...n, ...t.extra }),
                    Object.keys(r).length && (t.tags = { ...r, ...t.tags }),
                    Object.keys(i).length && (t.user = { ...i, ...t.user }),
                    Object.keys(o).length &&
                      (t.contexts = { ...o, ...t.contexts }),
                    s && (t.level = s),
                    a && "transaction" !== t.type && (t.transaction = a);
                })(y, b),
                L &&
                  (function (t, e) {
                    (t.contexts = { trace: tA(e), ...t.contexts }),
                      (t.sdkProcessingMetadata = {
                        dynamicSamplingContext: e_(e),
                        ...t.sdkProcessingMetadata,
                      });
                    let n = tx(tj(e)).description;
                    n &&
                      !t.transaction &&
                      "transaction" === t.type &&
                      (t.transaction = n);
                  })(y, L),
                (f = y),
                (d = R),
                (f.fingerprint = f.fingerprint
                  ? Array.isArray(f.fingerprint)
                    ? f.fingerprint
                    : [f.fingerprint]
                  : []),
                d && (f.fingerprint = f.fingerprint.concat(d)),
                f.fingerprint.length || delete f.fingerprint,
                (function (t, e) {
                  let n = [...(t.breadcrumbs || []), ...e];
                  t.breadcrumbs = n.length ? n : void 0;
                })(y, A),
                (h = y),
                (_ = I),
                (h.sdkProcessingMetadata = {
                  ...h.sdkProcessingMetadata,
                  ..._,
                }),
                (function t(e, n, r, i = 0) {
                  return new eS((o, s) => {
                    let a = e[i];
                    if (null === n || "function" != typeof a) o(n);
                    else {
                      let u = a({ ...n }, r);
                      v(u)
                        ? u.then((n) => t(e, n, r, i + 1).then(o)).then(null, s)
                        : t(e, u, r, i + 1)
                            .then(o)
                            .then(null, s);
                    }
                  });
                })([...T, ...b.eventProcessors], y, n).then((t) =>
                  (t &&
                    (function (t) {
                      let e = {};
                      if (
                        (t.exception?.values?.forEach((t) => {
                          t.stacktrace?.frames?.forEach((t) => {
                            t.debug_id &&
                              (t.abs_path
                                ? (e[t.abs_path] = t.debug_id)
                                : t.filename && (e[t.filename] = t.debug_id),
                              delete t.debug_id);
                          });
                        }),
                        0 === Object.keys(e).length)
                      )
                        return;
                      (t.debug_meta = t.debug_meta || {}),
                        (t.debug_meta.images = t.debug_meta.images || []);
                      let n = t.debug_meta.images;
                      Object.entries(e).forEach(([t, e]) => {
                        n.push({
                          type: "sourcemap",
                          code_file: t,
                          debug_id: e,
                        });
                      });
                    })(t),
                  "number" == typeof g && g > 0)
                    ? (function (t, e, n) {
                        if (!t) return null;
                        let r = {
                          ...t,
                          ...(t.breadcrumbs && {
                            breadcrumbs: t.breadcrumbs.map((t) => ({
                              ...t,
                              ...(t.data && { data: ei(t.data, e, n) }),
                            })),
                          }),
                          ...(t.user && { user: ei(t.user, e, n) }),
                          ...(t.contexts && { contexts: ei(t.contexts, e, n) }),
                          ...(t.extra && { extra: ei(t.extra, e, n) }),
                        };
                        return (
                          t.contexts?.trace &&
                            r.contexts &&
                            ((r.contexts.trace = t.contexts.trace),
                            t.contexts.trace.data &&
                              (r.contexts.trace.data = ei(
                                t.contexts.trace.data,
                                e,
                                n,
                              ))),
                          t.spans &&
                            (r.spans = t.spans.map((t) => ({
                              ...t,
                              ...(t.data && { data: ei(t.data, e, n) }),
                            }))),
                          t.contexts?.flags &&
                            r.contexts &&
                            (r.contexts.flags = ei(t.contexts.flags, 3, n)),
                          r
                        );
                      })(t, g, m)
                    : t,
                )
              );
            })(a, t, e, n, this, s).then(
              (t) => (
                null === t ||
                  (this.emit("postprocessEvent", t, e),
                  (t.contexts = { trace: to(n), ...t.contexts }),
                  (t.sdkProcessingMetadata = {
                    dynamicSamplingContext: eh(this, n),
                    ...t.sdkProcessingMetadata,
                  })),
                t
              ),
            )
          );
        }
        _captureEvent(t, e = {}, n = tt(), r = te()) {
          return this._processEvent(t, e, n, r).then(
            (t) => t.event_id,
            (t) => {},
          );
        }
        _processEvent(t, e, n, r) {
          let i = this.getOptions(),
            { sampleRate: o } = i,
            s = eC(t),
            a = eI(t),
            u = t.type || "error",
            c = `before send for type \`${u}\``,
            l = void 0 === o ? void 0 : ty(o);
          if (a && "number" == typeof l && Math.random() > l)
            return (
              this.recordDroppedEvent("sample_rate", "error"),
              eE(
                eP(
                  `Discarding event because it's not included in the random sample (sampling rate = ${o})`,
                ),
              )
            );
          let p = "replay_event" === u ? "replay" : u;
          return this._prepareEvent(t, e, n, r)
            .then((t) => {
              if (null === t)
                throw (
                  (this.recordDroppedEvent("event_processor", p),
                  eP(
                    "An event processor returned `null`, will not send event.",
                  ))
                );
              return e.data && !0 === e.data.__sentry__
                ? t
                : (function (t, e) {
                    let n = `${e} must return \`null\` or a valid event.`;
                    if (v(t))
                      return t.then(
                        (t) => {
                          if (!y(t) && null !== t) throw eL(n);
                          return t;
                        },
                        (t) => {
                          throw eL(`${e} rejected with ${t}`);
                        },
                      );
                    if (!y(t) && null !== t) throw eL(n);
                    return t;
                  })(
                    (function (t, e, n, r) {
                      let {
                          beforeSend: i,
                          beforeSendTransaction: o,
                          beforeSendSpan: s,
                        } = e,
                        a = n;
                      if (eI(a) && i) return i(a, r);
                      if (eC(a)) {
                        if (s) {
                          let t = s(
                            (function (t) {
                              let {
                                trace_id: e,
                                parent_span_id: n,
                                span_id: r,
                                status: i,
                                origin: o,
                                data: s,
                                op: a,
                              } = t.contexts?.trace ?? {};
                              return {
                                data: s ?? {},
                                description: t.transaction,
                                op: a,
                                parent_span_id: n,
                                span_id: r ?? "",
                                start_timestamp: t.start_timestamp ?? 0,
                                status: i,
                                timestamp: t.timestamp,
                                trace_id: e ?? "",
                                origin: o,
                                profile_id: s?.[tp],
                                exclusive_time: s?.[tf],
                                measurements: t.measurements,
                                is_segment: !0,
                              };
                            })(a),
                          );
                          if (t)
                            a = F(n, {
                              type: "transaction",
                              timestamp: t.timestamp,
                              start_timestamp: t.start_timestamp,
                              transaction: t.description,
                              contexts: {
                                trace: {
                                  trace_id: t.trace_id,
                                  span_id: t.span_id,
                                  parent_span_id: t.parent_span_id,
                                  op: t.op,
                                  status: t.status,
                                  origin: t.origin,
                                  data: {
                                    ...t.data,
                                    ...(t.profile_id && { [tp]: t.profile_id }),
                                    ...(t.exclusive_time && {
                                      [tf]: t.exclusive_time,
                                    }),
                                  },
                                },
                              },
                              measurements: t.measurements,
                            });
                          else t$();
                          if (a.spans) {
                            let t = [];
                            for (let e of a.spans) {
                              let n = s(e);
                              n ? t.push(n) : (t$(), t.push(e));
                            }
                            a.spans = t;
                          }
                        }
                        if (o) {
                          if (a.spans) {
                            let t = a.spans.length;
                            a.sdkProcessingMetadata = {
                              ...n.sdkProcessingMetadata,
                              spanCountBeforeProcessing: t,
                            };
                          }
                          return o(a, r);
                        }
                      }
                      return a;
                    })(0, i, t, e),
                    c,
                  );
            })
            .then((i) => {
              if (null === i) {
                if ((this.recordDroppedEvent("before_send", p), s)) {
                  let e = 1 + (t.spans || []).length;
                  this.recordDroppedEvent("before_send", "span", e);
                }
                throw eP(`${c} returned \`null\`, will not send event.`);
              }
              let o = n.getSession() || r.getSession();
              if ((a && o && this._updateSessionFromEvent(o, i), s)) {
                let t =
                  (i.sdkProcessingMetadata?.spanCountBeforeProcessing || 0) -
                  (i.spans ? i.spans.length : 0);
                t > 0 && this.recordDroppedEvent("before_send", "span", t);
              }
              let u = i.transaction_info;
              return (
                s &&
                  u &&
                  i.transaction !== t.transaction &&
                  (i.transaction_info = { ...u, source: "custom" }),
                this.sendEvent(i, e),
                i
              );
            })
            .then(null, (t) => {
              var e, n;
              if (
                ((e = t) && "object" == typeof e && eR in e) ||
                ((n = t) && "object" == typeof n && eO in n)
              )
                throw t;
              throw (
                (this.captureException(t, {
                  data: { __sentry__: !0 },
                  originalException: t,
                }),
                eL(`Event processing pipeline threw an error, original event will not be sent. Details have been sent as a new event.
Reason: ${t}`))
              );
            });
        }
        _process(t) {
          this._numProcessing++,
            t.then(
              (t) => (this._numProcessing--, t),
              (t) => (this._numProcessing--, t),
            );
        }
        _clearOutcomes() {
          let t = this._outcomes;
          return (
            (this._outcomes = {}),
            Object.entries(t).map(([t, e]) => {
              let [n, r] = t.split(":");
              return { reason: n, category: r, quantity: e };
            })
          );
        }
        _flushOutcomes() {
          var t;
          let e = this._clearOutcomes();
          if (0 === e.length || !this._dsn) return;
          let n = eo(
            (t = this._options.tunnel && en(this._dsn)) ? { dsn: t } : {},
            [
              [
                { type: "client_report" },
                { timestamp: j(), discarded_events: e },
              ],
            ],
          );
          this.sendEnvelope(n);
        }
      }
      function eI(t) {
        return void 0 === t.type;
      }
      function eC(t) {
        return "transaction" === t.type;
      }
      function ew(t, e) {
        return e
          ? tr(e, () => {
              let n = tB(),
                r = n ? tA(n) : to(e);
              return [n ? e_(n) : eh(t, e), r];
            })
          : [void 0, void 0];
      }
      let ex = { trace: 1, debug: 5, info: 9, warn: 13, error: 17, fatal: 21 };
      function eN(t, e, n, r = !0) {
        n && (!t[e] || r) && (t[e] = n);
      }
      u._sentryClientToLogBufferMap = new WeakMap();
      function eM(t, e) {
        let n = e ?? ek(t) ?? [];
        if (0 === n.length) return;
        let r = t.getOptions(),
          i = (function (t, e, n, r) {
            let i = {};
            return (
              e?.sdk && (i.sdk = { name: e.sdk.name, version: e.sdk.version }),
              n && r && (i.dsn = en(r)),
              eo(i, [
                [
                  {
                    type: "log",
                    item_count: t.length,
                    content_type: "application/vnd.sentry.items.log+json",
                  },
                  { items: t },
                ],
              ])
            );
          })(n, r._metadata, r.tunnel, t.getDsn());
        u._sentryClientToLogBufferMap?.set(t, []),
          t.emit("flushLogs"),
          t.sendEnvelope(i);
      }
      function ek(t) {
        return u._sentryClientToLogBufferMap?.get(t);
      }
      function eD(t, e) {
        return t(e.stack || "", 1);
      }
      function eU(t, e) {
        let n = { type: e.name || e.constructor.name, value: e.message },
          r = eD(t, e);
        return r.length && (n.stacktrace = { frames: r }), n;
      }
      class ej extends eA {
        constructor(t) {
          if (
            (t4(),
            super(t),
            (this._logWeight = 0),
            this._options._experiments?.enableLogs)
          ) {
            let t = this;
            t.on("flushLogs", () => {
              (t._logWeight = 0), clearTimeout(t._logFlushIdleTimeout);
            }),
              t.on("afterCaptureLog", (e) => {
                (t._logWeight += (function (t) {
                  let e = 0;
                  return (
                    t.message && (e += 2 * t.message.length),
                    t.attributes &&
                      Object.values(t.attributes).forEach((t) => {
                        Array.isArray(t)
                          ? (e += t.length * e$(t[0]))
                          : m(t)
                            ? (e += e$(t))
                            : (e += 100);
                      }),
                    e
                  );
                })(e)),
                  t._logWeight >= 8e5
                    ? eM(t)
                    : (t._logFlushIdleTimeout = setTimeout(() => {
                        eM(t);
                      }, 5e3));
              }),
              t.on("flush", () => {
                eM(t);
              });
          }
        }
        eventFromException(t, e) {
          let n = (function (t, e, n, r) {
            let i = (r?.data && r.data.mechanism) || {
                handled: !0,
                type: "generic",
              },
              [o, s] = (function (t, e, n, r) {
                if (d(n)) return [n, void 0];
                if (((e.synthetic = !0), y(n))) {
                  let e = {
                      __serialized__: (function t(e, n = 3, r = 102400) {
                        let i = ei(e, n);
                        return ~-encodeURI(JSON.stringify(i)).split(/%..|./)
                          .length > r
                          ? t(e, n - 1, r)
                          : i;
                      })(n, t?.getOptions().normalizeDepth),
                    },
                    i = (function (t) {
                      for (let e in t)
                        if (Object.prototype.hasOwnProperty.call(t, e)) {
                          let n = t[e];
                          if (n instanceof Error) return n;
                        }
                    })(n);
                  if (i) return [i, e];
                  let o = (function (t) {
                      if ("name" in t && "string" == typeof t.name) {
                        let e = `'${t.name}' captured as exception`;
                        return (
                          "message" in t &&
                            "string" == typeof t.message &&
                            (e += ` with message '${t.message}'`),
                          e
                        );
                      }
                      if ("message" in t && "string" == typeof t.message)
                        return t.message;
                      let e = (function (t, e = 40) {
                        let n = Object.keys(w(t));
                        n.sort();
                        let r = n[0];
                        if (!r) return "[object has no keys]";
                        if (r.length >= e) return P(r, e);
                        for (let t = n.length; t > 0; t--) {
                          let r = n.slice(0, t).join(", ");
                          if (!(r.length > e)) {
                            if (t === n.length) return r;
                            return P(r, e);
                          }
                        }
                        return "";
                      })(t);
                      if (h(t, "ErrorEvent"))
                        return `Event \`ErrorEvent\` captured as exception with message \`${t.message}\``;
                      let n = (function (t) {
                        try {
                          let e = Object.getPrototypeOf(t);
                          return e ? e.constructor.name : void 0;
                        } catch (t) {}
                      })(t);
                      return `${n && "Object" !== n ? `'${n}'` : "Object"} captured as exception with keys: ${e}`;
                    })(n),
                    s = r?.syntheticException || Error(o);
                  return (s.message = o), [s, e];
                }
                let i = r?.syntheticException || Error(n);
                return (i.message = `${n}`), [i, void 0];
              })(t, i, n, r),
              a = { exception: { values: [eU(e, o)] } };
            return (
              s && (a.extra = s),
              !(function (t, e, n) {
                let r = (t.exception = t.exception || {}),
                  i = (r.values = r.values || []),
                  o = (i[0] = i[0] || {});
                o.value || (o.value = e || ""),
                  o.type || (o.type = n || "Error");
              })(a, void 0, void 0),
              D(a, i),
              { ...a, event_id: r?.event_id }
            );
          })(this, this._options.stackParser, t, e);
          return (n.level = "error"), ev(n);
        }
        eventFromMessage(t, e = "info", n) {
          return ev(
            (function (t, e, n = "info", r, i) {
              let o = { event_id: r?.event_id, level: n };
              if (i && r?.syntheticException) {
                let n = eD(t, r.syntheticException);
                n.length &&
                  ((o.exception = {
                    values: [{ value: e, stacktrace: { frames: n } }],
                  }),
                  D(o, { synthetic: !0 }));
              }
              if (g(e)) {
                let {
                  __sentry_template_string__: t,
                  __sentry_template_values__: n,
                } = e;
                return (o.logentry = { message: t, params: n }), o;
              }
              return (o.message = e), o;
            })(
              this._options.stackParser,
              t,
              e,
              n,
              this._options.attachStacktrace,
            ),
          );
        }
        captureException(t, e, n) {
          return eB(e), super.captureException(t, e, n);
        }
        captureEvent(t, e, n) {
          return (
            !t.type &&
              t.exception?.values &&
              t.exception.values.length > 0 &&
              eB(e),
            super.captureEvent(t, e, n)
          );
        }
        captureCheckIn(t, e, n) {
          let r = "checkInId" in t && t.checkInId ? t.checkInId : M();
          if (!this._isEnabled()) return r;
          let { release: i, environment: o, tunnel: s } = this.getOptions(),
            a = {
              check_in_id: r,
              monitor_slug: t.monitorSlug,
              status: t.status,
              release: i,
              environment: o,
            };
          "duration" in t && (a.duration = t.duration),
            e &&
              (a.monitor_config = {
                schedule: e.schedule,
                checkin_margin: e.checkinMargin,
                max_runtime: e.maxRuntime,
                timezone: e.timezone,
                failure_issue_threshold: e.failureIssueThreshold,
                recovery_threshold: e.recoveryThreshold,
              });
          let [u, c] = ew(this, n);
          c && (a.contexts = { trace: c });
          let l = (function (t, e, n, r, i) {
            let o = { sent_at: new Date().toISOString() };
            return (
              n?.sdk && (o.sdk = { name: n.sdk.name, version: n.sdk.version }),
              r && i && (o.dsn = en(i)),
              e && (o.trace = e),
              eo(o, [[{ type: "check_in" }, t]])
            );
          })(a, u, this.getSdkMetadata(), s, this.getDsn());
          return this.sendEnvelope(l), r;
        }
        _prepareEvent(t, e, n, r) {
          return (
            this._options.platform &&
              (t.platform = t.platform || this._options.platform),
            this._options.runtime &&
              (t.contexts = {
                ...t.contexts,
                runtime: t.contexts?.runtime || this._options.runtime,
              }),
            this._options.serverName &&
              (t.server_name = t.server_name || this._options.serverName),
            super._prepareEvent(t, e, n, r)
          );
        }
      }
      function eB(t) {
        let e = te().getScopeData().sdkProcessingMetadata.requestSession;
        if (e) {
          let n = t?.mechanism?.handled ?? !0;
          n && "crashed" !== e.status
            ? (e.status = "errored")
            : n || (e.status = "crashed");
        }
      }
      function e$(t) {
        return "string" == typeof t
          ? 2 * t.length
          : "number" == typeof t
            ? 8
            : 4 * ("boolean" == typeof t);
      }
      class eF {
        constructor(t) {
          (this._maxSize = t), (this._cache = new Map());
        }
        get size() {
          return this._cache.size;
        }
        get(t) {
          let e = this._cache.get(t);
          if (void 0 !== e)
            return this._cache.delete(t), this._cache.set(t, e), e;
        }
        set(t, e) {
          this._cache.size >= this._maxSize &&
            this._cache.delete(this._cache.keys().next().value),
            this._cache.set(t, e);
        }
        remove(t) {
          let e = this._cache.get(t);
          return e && this._cache.delete(t), e;
        }
        clear() {
          this._cache.clear();
        }
        keys() {
          return Array.from(this._cache.keys());
        }
        values() {
          let t = [];
          return this._cache.forEach((e) => t.push(e)), t;
        }
      }
      function eG(t, e, n = () => {}) {
        var r, i, o;
        let s;
        try {
          s = t();
        } catch (t) {
          throw (e(t), n(), t);
        }
        return (
          (r = s),
          (i = e),
          (o = n),
          v(r)
            ? r.then(
                (t) => (o(), t),
                (t) => {
                  throw (i(t), o(), t);
                },
              )
            : (o(), r)
        );
      }
      function eV(t) {
        if (!t || 0 === t.length) return;
        let e = {};
        return (
          t.forEach((t) => {
            let n = t.attributes || {},
              r = n["sentry.measurement_unit"],
              i = n["sentry.measurement_value"];
            "string" == typeof r &&
              "number" == typeof i &&
              (e[t.name] = { value: i, unit: r });
          }),
          e
        );
      }
      async function eX(t) {
        let e = ti();
        return e ? e.flush(t) : Promise.resolve(!1);
      }
      function eH(t) {}
      function ez(t) {}
      function eY(t, e, n) {
        let r, i;
        if (!ep(t)) return [!1];
        "function" == typeof t.tracesSampler
          ? ((r = t.tracesSampler({
              ...e,
              inheritOrSampleWith: (t) =>
                "number" == typeof e.parentSampleRate
                  ? e.parentSampleRate
                  : "boolean" == typeof e.parentSampled
                    ? Number(e.parentSampled)
                    : t,
            })),
            (i = !0))
          : void 0 !== e.parentSampled
            ? (r = e.parentSampled)
            : void 0 !== t.tracesSampleRate &&
              ((r = t.tracesSampleRate), (i = !0));
        let o = ty(r);
        if (void 0 === o) return [!1];
        if (!o) return [!1, o, i];
        let s = n < o;
        return [s, o, i];
      }
      async function eW(t, e) {
        if (t?.body) {
          let n = t.body,
            r = n.getReader(),
            i = setTimeout(() => {
              n.cancel().then(null, () => {});
            }, 9e4),
            o = !0;
          for (; o; ) {
            let t;
            try {
              t = setTimeout(() => {
                n.cancel().then(null, () => {});
              }, 5e3);
              let { done: i } = await r.read();
              clearTimeout(t), i && (e(), (o = !1));
            } catch (t) {
              o = !1;
            } finally {
              clearTimeout(t);
            }
          }
          clearTimeout(i), r.releaseLock(), n.cancel().then(null, () => {});
        }
      }
      function eK(t, e) {
        return !!t && "object" == typeof t && !!t[e];
      }
      function eq(t) {
        return "string" == typeof t
          ? t
          : t
            ? eK(t, "url")
              ? t.url
              : t.toString
                ? t.toString()
                : ""
            : "";
      }
      function eJ(t) {
        return "/" === t[t.length - 1] ? t.slice(0, -1) : t;
      }
      class eZ {
        constructor(t = {}) {
          (this._traceId = t.traceId || M()), (this._spanId = t.spanId || X());
        }
        spanContext() {
          return {
            spanId: this._spanId,
            traceId: this._traceId,
            traceFlags: 0,
          };
        }
        end(t) {}
        setAttribute(t, e) {
          return this;
        }
        setAttributes(t) {
          return this;
        }
        setStatus(t) {
          return this;
        }
        updateName(t) {
          return this;
        }
        isRecording() {
          return !1;
        }
        addEvent(t, e, n) {
          return this;
        }
        addLink(t) {
          return this;
        }
        addLinks(t) {
          return this;
        }
        recordException(t, e) {}
      }
      class eQ {
        constructor(t = {}) {
          (this._traceId = t.traceId || M()),
            (this._spanId = t.spanId || X()),
            (this._startTime = t.startTimestamp || B()),
            (this._links = t.links),
            (this._attributes = {}),
            this.setAttributes({ [tc]: "manual", [tu]: t.op, ...t.attributes }),
            (this._name = t.name),
            t.parentSpanId && (this._parentSpanId = t.parentSpanId),
            "sampled" in t && (this._sampled = t.sampled),
            t.endTimestamp && (this._endTime = t.endTimestamp),
            (this._events = []),
            (this._isStandaloneSpan = t.isStandalone),
            this._endTime && this._onSpanEnded();
        }
        addLink(t) {
          return this._links ? this._links.push(t) : (this._links = [t]), this;
        }
        addLinks(t) {
          return this._links ? this._links.push(...t) : (this._links = t), this;
        }
        recordException(t, e) {}
        spanContext() {
          let { _spanId: t, _traceId: e, _sampled: n } = this;
          return { spanId: t, traceId: e, traceFlags: +!!n };
        }
        setAttribute(t, e) {
          return (
            void 0 === e
              ? delete this._attributes[t]
              : (this._attributes[t] = e),
            this
          );
        }
        setAttributes(t) {
          return (
            Object.keys(t).forEach((e) => this.setAttribute(e, t[e])), this
          );
        }
        updateStartTime(t) {
          this._startTime = tC(t);
        }
        setStatus(t) {
          return (this._status = t), this;
        }
        updateName(t) {
          return (this._name = t), this.setAttribute(ts, "custom"), this;
        }
        end(t) {
          this._endTime ||
            ((this._endTime = tC(t)), ez(this), this._onSpanEnded());
        }
        getSpanJSON() {
          return {
            data: this._attributes,
            description: this._name,
            op: this._attributes[tu],
            parent_span_id: this._parentSpanId,
            span_id: this._spanId,
            start_timestamp: this._startTime,
            status: tM(this._status),
            timestamp: this._endTime,
            trace_id: this._traceId,
            origin: this._attributes[tc],
            profile_id: this._attributes[tp],
            exclusive_time: this._attributes[tf],
            measurements: eV(this._events),
            is_segment: (this._isStandaloneSpan && tj(this) === this) || void 0,
            segment_id: this._isStandaloneSpan
              ? tj(this).spanContext().spanId
              : void 0,
            links: tI(this._links),
          };
        }
        isRecording() {
          return !this._endTime && !!this._sampled;
        }
        addEvent(t, e, n) {
          let r = e0(e) ? e : n || B(),
            i = e0(e) ? {} : e || {},
            o = { name: t, time: tC(r), attributes: i };
          return this._events.push(o), this;
        }
        isStandaloneSpan() {
          return !!this._isStandaloneSpan;
        }
        _onSpanEnded() {
          let t = ti();
          if (
            (t && t.emit("spanEnd", this),
            !(this._isStandaloneSpan || this === tj(this)))
          )
            return;
          if (this._isStandaloneSpan)
            return void (this._sampled
              ? (function (t) {
                  let e = ti();
                  if (!e) return;
                  let n = t[1];
                  if (!n || 0 === n.length)
                    return e.recordDroppedEvent("before_send", "span");
                  e.sendEnvelope(t);
                })(
                  (function (t, e) {
                    let n = e_(t[0]),
                      r = e?.getDsn(),
                      i = e?.getOptions().tunnel,
                      o = {
                        sent_at: new Date().toISOString(),
                        ...(!!n.trace_id && !!n.public_key && { trace: n }),
                        ...(!!i && r && { dsn: en(r) }),
                      },
                      s = e?.getOptions().beforeSendSpan,
                      a = s
                        ? (t) => {
                            let e = tx(t),
                              n = s(e);
                            return n || (t$(), e);
                          }
                        : tx,
                      u = [];
                    for (let e of t) {
                      let t = a(e);
                      t && u.push([{ type: "span" }, t]);
                    }
                    return eo(o, u);
                  })([this], t),
                )
              : t && t.recordDroppedEvent("sample_rate", "span"));
          let e = this._convertSpanToTransaction();
          e && (tm(this).scope || tt()).captureEvent(e);
        }
        _convertSpanToTransaction() {
          if (!e1(tx(this))) return;
          this._name || (this._name = "<unlabeled transaction>");
          let { scope: t, isolationScope: e } = tm(this),
            n = t?.getScopeData().sdkProcessingMetadata?.normalizedRequest;
          if (!0 !== this._sampled) return;
          let r = (function (t) {
              let e = new Set();
              return (
                !(function t(n) {
                  if (!e.has(n) && tN(n))
                    for (let r of (e.add(n), n[tk] ? Array.from(n[tk]) : []))
                      t(r);
                })(t),
                Array.from(e)
              );
            })(this)
              .filter((t) => {
                var e;
                return (
                  t !== this && !((e = t) instanceof eQ && e.isStandaloneSpan())
                );
              })
              .map((t) => tx(t))
              .filter(e1),
            i = this._attributes[ts];
          delete this._attributes[tl],
            r.forEach((t) => {
              delete t.data[tl];
            });
          let o = {
              contexts: {
                trace: (function (t) {
                  let { spanId: e, traceId: n } = t.spanContext(),
                    {
                      data: r,
                      op: i,
                      parent_span_id: o,
                      status: s,
                      origin: a,
                      links: u,
                    } = tx(t);
                  return {
                    parent_span_id: o,
                    span_id: e,
                    trace_id: n,
                    data: r,
                    op: i,
                    status: s,
                    origin: a,
                    links: u,
                  };
                })(this),
              },
              spans:
                r.length > 1e3
                  ? r
                      .sort((t, e) => t.start_timestamp - e.start_timestamp)
                      .slice(0, 1e3)
                  : r,
              start_timestamp: this._startTime,
              timestamp: this._endTime,
              transaction: this._name,
              type: "transaction",
              sdkProcessingMetadata: {
                capturedSpanScope: t,
                capturedSpanIsolationScope: e,
                dynamicSamplingContext: e_(this),
              },
              request: n,
              ...(i && { transaction_info: { source: i } }),
            },
            s = eV(this._events);
          return s && Object.keys(s).length && (o.measurements = s), o;
        }
      }
      function e0(t) {
        return (
          (t && "number" == typeof t) || t instanceof Date || Array.isArray(t)
        );
      }
      function e1(t) {
        return (
          !!t.start_timestamp && !!t.timestamp && !!t.span_id && !!t.trace_id
        );
      }
      let e2 = "__SENTRY_SUPPRESS_TRACING__";
      function e4(t, e) {
        let n = (function () {
          return Q(c());
        })();
        return n.withActiveSpan
          ? n.withActiveSpan(t, e)
          : tr((n) => (V(n, t || void 0), e(n)));
      }
      function e3() {
        return Q(c());
      }
      function e5(t, e, n) {
        let r = ti(),
          i = r?.getOptions() || {},
          { name: o = "" } = t,
          s = {
            spanAttributes: { ...t.attributes },
            spanName: o,
            parentSampled: n,
          };
        r?.emit("beforeSampling", s, { decision: !1 });
        let a = s.parentSampled ?? n,
          u = s.spanAttributes,
          c = e.getPropagationContext(),
          [l, p, f] = e.getScopeData().sdkProcessingMetadata[e2]
            ? [!1]
            : eY(
                i,
                {
                  name: o,
                  parentSampled: a,
                  attributes: u,
                  parentSampleRate: ty(c.dsc?.sample_rate),
                },
                c.sampleRand,
              ),
          d = new eQ({
            ...t,
            attributes: {
              [ts]: "custom",
              [ta]: void 0 !== p && f ? p : void 0,
              ...u,
            },
            sampled: l,
          });
        return (
          !l && r && r.recordDroppedEvent("sample_rate", "transaction"),
          r && r.emit("spanStart", d),
          d
        );
      }
      function e9(t) {
        return t.split(",").some((t) => t.trim().startsWith(tv));
      }
      function e8(t, e) {
        let n = ti(),
          r = te();
        if (!n) return;
        let { beforeBreadcrumb: i = null, maxBreadcrumbs: o = 100 } =
          n.getOptions();
        if (o <= 0) return;
        let s = { timestamp: j(), ...t },
          a = i ? R(() => i(s, e)) : s;
        null !== a &&
          (n.emit && n.emit("beforeAddBreadcrumb", a, e),
          r.addBreadcrumb(a, o));
      }
      let e6 = Symbol.for("SentryBufferFullError");
      function e7(t) {
        return parseInt(t || "", 10) || void 0;
      }
      let nt = () => {
        let t;
        return {
          name: "Dedupe",
          processEvent(e) {
            if (e.type) return e;
            try {
              var n, r;
              if (
                ((n = e),
                (r = t) &&
                  ((function (t, e) {
                    let n = t.message,
                      r = e.message;
                    return (
                      (!!n || !!r) &&
                      (!n || !!r) &&
                      (!!n || !r) &&
                      n === r &&
                      !!nn(t, e) &&
                      !!ne(t, e) &&
                      !0
                    );
                  })(n, r) ||
                    (function (t, e) {
                      let n = nr(e),
                        r = nr(t);
                      return (
                        !!n &&
                        !!r &&
                        n.type === r.type &&
                        n.value === r.value &&
                        !!nn(t, e) &&
                        !!ne(t, e)
                      );
                    })(n, r)))
              )
                return null;
            } catch (t) {}
            return (t = e);
          },
        };
      };
      function ne(t, e) {
        let n = tz(t),
          r = tz(e);
        if (!n && !r) return !0;
        if ((n && !r) || (!n && r) || r.length !== n.length) return !1;
        for (let t = 0; t < r.length; t++) {
          let e = r[t],
            i = n[t];
          if (
            e.filename !== i.filename ||
            e.lineno !== i.lineno ||
            e.colno !== i.colno ||
            e.function !== i.function
          )
            return !1;
        }
        return !0;
      }
      function nn(t, e) {
        let n = t.fingerprint,
          r = e.fingerprint;
        if (!n && !r) return !0;
        if ((n && !r) || (!n && r)) return !1;
        try {
          return n.join("") === r.join("");
        } catch (t) {
          return !1;
        }
      }
      function nr(t) {
        return t.exception?.values && t.exception.values[0];
      }
      let ni = [
          /^Script error\.?$/,
          /^Javascript error: Script error\.? on line 0$/,
          /^ResizeObserver loop completed with undelivered notifications.$/,
          /^Cannot redefine property: googletag$/,
          /^Can't find variable: gmo$/,
          /^undefined is not an object \(evaluating 'a\.[A-Z]'\)$/,
          'can\'t redefine non-configurable property "solana"',
          "vv().getRestrictions is not a function. (In 'vv().getRestrictions(1,a)', 'vv().getRestrictions' is undefined)",
          "Can't find variable: _AutofillCallbackHandler",
          /^Non-Error promise rejection captured with value: Object Not Found Matching Id:\d+, MethodName:simulateEvent, ParamCount:\d+$/,
          /^Java exception was raised during method invocation$/,
        ],
        no = (t = {}) => {
          let e;
          return {
            name: "EventFilters",
            setup(n) {
              e = na(t, n.getOptions());
            },
            processEvent: (n, r, i) => (
              e || (e = na(t, i.getOptions())),
              !(function (t, e) {
                if (t.type) {
                  if (
                    "transaction" === t.type &&
                    (function (t, e) {
                      if (!e?.length) return !1;
                      let n = t.transaction;
                      return !!n && A(n, e);
                    })(t, e.ignoreTransactions)
                  )
                    return !0;
                } else {
                  var n, r, i;
                  if (
                    ((n = t),
                    (r = e.ignoreErrors),
                    r?.length &&
                      (function (t) {
                        let e = [];
                        t.message && e.push(t.message);
                        try {
                          let n =
                            t.exception.values[t.exception.values.length - 1];
                          n?.value &&
                            (e.push(n.value),
                            n.type && e.push(`${n.type}: ${n.value}`));
                        } catch (t) {}
                        return e;
                      })(n).some((t) => A(t, r)))
                  )
                    return !0;
                  if (
                    ((i = t),
                    (i.exception?.values?.length &&
                      !i.message &&
                      !i.exception.values.some(
                        (t) =>
                          t.stacktrace ||
                          (t.type && "Error" !== t.type) ||
                          t.value,
                      )) ||
                      (function (t, e) {
                        if (!e?.length) return !1;
                        let n = nu(t);
                        return !!n && A(n, e);
                      })(t, e.denyUrls) ||
                      !(function (t, e) {
                        if (!e?.length) return !0;
                        let n = nu(t);
                        return !n || A(n, e);
                      })(t, e.allowUrls))
                  )
                    return !0;
                }
                return !1;
              })(n, e)
                ? n
                : null
            ),
          };
        },
        ns = (t = {}) => ({ ...no(t), name: "InboundFilters" });
      function na(t = {}, e = {}) {
        return {
          allowUrls: [...(t.allowUrls || []), ...(e.allowUrls || [])],
          denyUrls: [...(t.denyUrls || []), ...(e.denyUrls || [])],
          ignoreErrors: [
            ...(t.ignoreErrors || []),
            ...(e.ignoreErrors || []),
            ...(t.disableErrorDefaults ? [] : ni),
          ],
          ignoreTransactions: [
            ...(t.ignoreTransactions || []),
            ...(e.ignoreTransactions || []),
          ],
        };
      }
      function nu(t) {
        try {
          let e = [...(t.exception?.values ?? [])]
              .reverse()
              .find(
                (t) =>
                  t.mechanism?.parent_id === void 0 &&
                  t.stacktrace?.frames?.length,
              ),
            n = e?.stacktrace?.frames;
          return n
            ? (function (t = []) {
                for (let e = t.length - 1; e >= 0; e--) {
                  let n = t[e];
                  if (
                    n &&
                    "<anonymous>" !== n.filename &&
                    "[native code]" !== n.filename
                  )
                    return n.filename || null;
                }
                return null;
              })(n)
            : null;
        } catch (t) {
          return null;
        }
      }
      let nc = new WeakMap(),
        nl = () => ({
          name: "FunctionToString",
          setupOnce() {
            s = Function.prototype.toString;
            try {
              Function.prototype.toString = function (...t) {
                let e = this.__sentry_original__,
                  n = nc.has(ti()) && void 0 !== e ? e : this;
                return s.apply(n, t);
              };
            } catch {}
          },
          setup(t) {
            nc.set(t, !0);
          },
        });
      function np(t, e) {
        (t.mechanism = t.mechanism || { type: "generic", handled: !0 }),
          (t.mechanism = {
            ...t.mechanism,
            ...("AggregateError" === t.type && { is_exception_group: !0 }),
            exception_id: e,
          });
      }
      function nf(t, e, n, r) {
        (t.mechanism = t.mechanism || { type: "generic", handled: !0 }),
          (t.mechanism = {
            ...t.mechanism,
            type: "chained",
            source: e,
            exception_id: n,
            parent_id: r,
          });
      }
      let nd = (t = {}) => {
        let e = t.limit || 5,
          n = t.key || "cause";
        return {
          name: "LinkedErrors",
          preprocessEvent(t, r, i) {
            !(function (t, e, n, r, i, o) {
              if (!i.exception?.values || !o || !E(o.originalException, Error))
                return;
              let s =
                i.exception.values.length > 0
                  ? i.exception.values[i.exception.values.length - 1]
                  : void 0;
              s &&
                (i.exception.values = (function t(e, n, r, i, o, s, a, u) {
                  if (s.length >= r + 1) return s;
                  let c = [...s];
                  if (E(i[o], Error)) {
                    np(a, u);
                    let s = e(n, i[o]),
                      l = c.length;
                    nf(s, o, l, u), (c = t(e, n, r, i[o], o, [s, ...c], s, l));
                  }
                  return (
                    Array.isArray(i.errors) &&
                      i.errors.forEach((i, s) => {
                        if (E(i, Error)) {
                          np(a, u);
                          let l = e(n, i),
                            p = c.length;
                          nf(l, `errors[${s}]`, p, u),
                            (c = t(e, n, r, i, o, [l, ...c], l, p));
                        }
                      }),
                    c
                  );
                })(t, e, r, o.originalException, n, i.exception.values, s, 0));
            })(eU, i.getOptions().stackParser, n, e, t, r);
          },
        };
      };
      function nh() {
        "console" in u &&
          b.forEach(function (t) {
            t in u.console &&
              I(u.console, t, function (e) {
                return (
                  (O[t] = e),
                  function (...e) {
                    tJ("console", { args: e, level: t });
                    let n = O[t];
                    n?.apply(u.console, e);
                  }
                );
              });
          });
      }
      let n_ = (t = {}) => {
        let e = new Set(t.levels || b);
        return {
          name: "Console",
          setup(t) {
            let n = "console";
            tK(n, ({ args: n, level: r }) => {
              ti() === t &&
                e.has(r) &&
                (function (t, e) {
                  let n = {
                    category: "console",
                    data: { arguments: e, logger: "console" },
                    level:
                      "warn" === t
                        ? "warning"
                        : [
                              "fatal",
                              "error",
                              "warning",
                              "log",
                              "info",
                              "debug",
                            ].includes(t)
                          ? t
                          : "log",
                    message: ng(e),
                  };
                  if ("assert" === t)
                    if (!1 !== e[0]) return;
                    else {
                      let t = e.slice(1);
                      (n.message =
                        t.length > 0
                          ? `Assertion failed: ${ng(t)}`
                          : "Assertion failed"),
                        (n.data.arguments = t);
                    }
                  e8(n, { input: e, level: t });
                })(r, n);
            }),
              tq(n, nh);
          },
        };
      };
      function ng(t) {
        return "util" in u && "function" == typeof u.util.format
          ? u.util.format(...t)
          : (function (t, e) {
              if (!Array.isArray(t)) return "";
              let n = [];
              for (let e = 0; e < t.length; e++) {
                let r = t[e];
                try {
                  S(r) ? n.push("[VueViewModel]") : n.push(String(r));
                } catch (t) {
                  n.push("[value cannot be serialized]");
                }
              }
              return n.join(" ");
            })(t, 0);
      }
      let nm = [
          "X-Client-IP",
          "X-Forwarded-For",
          "Fly-Client-IP",
          "CF-Connecting-IP",
          "Fastly-Client-Ip",
          "True-Client-Ip",
          "X-Real-IP",
          "X-Cluster-Client-IP",
          "X-Forwarded",
          "Forwarded-For",
          "Forwarded",
          "X-Vercel-Forwarded-For",
        ],
        ny = { cookies: !0, data: !0, headers: !0, query_string: !0, url: !0 },
        nv = (t = {}) => {
          let e = { ...ny, ...t.include };
          return {
            name: "RequestData",
            processEvent(t, n, r) {
              let { sdkProcessingMetadata: i = {} } = t,
                { normalizedRequest: o, ipAddress: s } = i,
                a = { ...e, ip: e.ip ?? r.getOptions().sendDefaultPii };
              return (
                o &&
                  (function (t, e, n, r) {
                    if (
                      ((t.request = {
                        ...t.request,
                        ...(function (t, e) {
                          let n = {},
                            r = { ...t.headers };
                          return (
                            e.headers &&
                              ((n.headers = r),
                              e.cookies || delete r.cookie,
                              e.ip ||
                                nm.forEach((t) => {
                                  delete r[t];
                                })),
                            (n.method = t.method),
                            e.url && (n.url = t.url),
                            e.cookies &&
                              (n.cookies =
                                t.cookies ||
                                (r?.cookie
                                  ? (function (t) {
                                      let e = {},
                                        n = 0;
                                      for (; n < t.length; ) {
                                        let r = t.indexOf("=", n);
                                        if (-1 === r) break;
                                        let i = t.indexOf(";", n);
                                        if (-1 === i) i = t.length;
                                        else if (i < r) {
                                          n = t.lastIndexOf(";", r - 1) + 1;
                                          continue;
                                        }
                                        let o = t.slice(n, r).trim();
                                        if (void 0 === e[o]) {
                                          let n = t.slice(r + 1, i).trim();
                                          34 === n.charCodeAt(0) &&
                                            (n = n.slice(1, -1));
                                          try {
                                            e[o] =
                                              -1 !== n.indexOf("%")
                                                ? decodeURIComponent(n)
                                                : n;
                                          } catch (t) {
                                            e[o] = n;
                                          }
                                        }
                                        n = i + 1;
                                      }
                                      return e;
                                    })(r.cookie)
                                  : void 0) ||
                                {}),
                            e.query_string && (n.query_string = t.query_string),
                            e.data && (n.data = t.data),
                            n
                          );
                        })(e, r),
                      }),
                      r.ip)
                    ) {
                      var i;
                      let r =
                        (e.headers &&
                          ((i = e.headers),
                          nm
                            .map((t) => {
                              let e = i[t],
                                n = Array.isArray(e) ? e.join(";") : e;
                              return "Forwarded" === t
                                ? (function (t) {
                                    if (!t) return null;
                                    for (let e of t.split(";"))
                                      if (e.startsWith("for="))
                                        return e.slice(4);
                                    return null;
                                  })(n)
                                : n?.split(",").map((t) => t.trim());
                            })
                            .reduce((t, e) => (e ? t.concat(e) : t), [])
                            .find((t) => {
                              var e;
                              return (
                                null !== t &&
                                ((e = t),
                                /(?:^(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}$)|(?:^(?:(?:[a-fA-F\d]{1,4}:){7}(?:[a-fA-F\d]{1,4}|:)|(?:[a-fA-F\d]{1,4}:){6}(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}|:[a-fA-F\d]{1,4}|:)|(?:[a-fA-F\d]{1,4}:){5}(?::(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}|(?::[a-fA-F\d]{1,4}){1,2}|:)|(?:[a-fA-F\d]{1,4}:){4}(?:(?::[a-fA-F\d]{1,4}){0,1}:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}|(?::[a-fA-F\d]{1,4}){1,3}|:)|(?:[a-fA-F\d]{1,4}:){3}(?:(?::[a-fA-F\d]{1,4}){0,2}:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}|(?::[a-fA-F\d]{1,4}){1,4}|:)|(?:[a-fA-F\d]{1,4}:){2}(?:(?::[a-fA-F\d]{1,4}){0,3}:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}|(?::[a-fA-F\d]{1,4}){1,5}|:)|(?:[a-fA-F\d]{1,4}:){1}(?:(?::[a-fA-F\d]{1,4}){0,4}:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}|(?::[a-fA-F\d]{1,4}){1,6}|:)|(?::(?:(?::[a-fA-F\d]{1,4}){0,5}:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}|(?::[a-fA-F\d]{1,4}){1,7}|:)))(?:%[0-9a-zA-Z]{1,})?$)/.test(
                                  e,
                                ))
                              );
                            }) || null)) ||
                        n.ipAddress;
                      r && (t.user = { ...t.user, ip_address: r });
                    }
                  })(t, o, { ipAddress: s }, a),
                t
              );
            },
          };
        };
      function nE(t) {
        return Symbol.for(t);
      }
      var nS,
        nT,
        nb,
        nO,
        nR,
        nL,
        nP,
        nA,
        nI,
        nC,
        nw,
        nx,
        nN,
        nM = new (function t(e) {
          var n = this;
          (n._currentContext = e ? new Map(e) : new Map()),
            (n.getValue = function (t) {
              return n._currentContext.get(t);
            }),
            (n.setValue = function (e, r) {
              var i = new t(n._currentContext);
              return i._currentContext.set(e, r), i;
            }),
            (n.deleteValue = function (e) {
              var r = new t(n._currentContext);
              return r._currentContext.delete(e), r;
            });
        })(),
        nk = function (t, e) {
          var n = "function" == typeof Symbol && t[Symbol.iterator];
          if (!n) return t;
          var r,
            i,
            o = n.call(t),
            s = [];
          try {
            for (; (void 0 === e || e-- > 0) && !(r = o.next()).done; )
              s.push(r.value);
          } catch (t) {
            i = { error: t };
          } finally {
            try {
              r && !r.done && (n = o.return) && n.call(o);
            } finally {
              if (i) throw i.error;
            }
          }
          return s;
        },
        nD = function (t, e, n) {
          if (n || 2 == arguments.length)
            for (var r, i = 0, o = e.length; i < o; i++)
              (!r && i in e) ||
                (r || (r = Array.prototype.slice.call(e, 0, i)), (r[i] = e[i]));
          return t.concat(r || Array.prototype.slice.call(e));
        },
        nU = (function () {
          function t() {}
          return (
            (t.prototype.active = function () {
              return nM;
            }),
            (t.prototype.with = function (t, e, n) {
              for (var r = [], i = 3; i < arguments.length; i++)
                r[i - 3] = arguments[i];
              return e.call.apply(e, nD([n], nk(r), !1));
            }),
            (t.prototype.bind = function (t, e) {
              return e;
            }),
            (t.prototype.enable = function () {
              return this;
            }),
            (t.prototype.disable = function () {
              return this;
            }),
            t
          );
        })(),
        nj =
          "object" == typeof globalThis
            ? globalThis
            : "object" == typeof self
              ? self
              : "object" == typeof window
                ? window
                : "object" == typeof n.g
                  ? n.g
                  : {},
        nB = "1.9.0",
        n$ = /^(\d+)\.(\d+)\.(\d+)(-(.+))?$/,
        nF = (function (t) {
          var e = new Set([t]),
            n = new Set(),
            r = t.match(n$);
          if (!r)
            return function () {
              return !1;
            };
          var i = {
            major: +r[1],
            minor: +r[2],
            patch: +r[3],
            prerelease: r[4],
          };
          if (null != i.prerelease)
            return function (e) {
              return e === t;
            };
          function o(t) {
            return n.add(t), !1;
          }
          return function (t) {
            if (e.has(t)) return !0;
            if (n.has(t)) return !1;
            var r = t.match(n$);
            if (!r) return o(t);
            var s = {
              major: +r[1],
              minor: +r[2],
              patch: +r[3],
              prerelease: r[4],
            };
            if (null != s.prerelease || i.major !== s.major) return o(t);
            if (0 === i.major)
              return i.minor === s.minor && i.patch <= s.patch
                ? (e.add(t), !0)
                : o(t);
            return i.minor <= s.minor ? (e.add(t), !0) : o(t);
          };
        })(nB),
        nG = Symbol.for("opentelemetry.js.api." + nB.split(".")[0]);
      function nV(t, e, n, r) {
        void 0 === r && (r = !1);
        var i,
          o = (nj[nG] = null != (i = nj[nG]) ? i : { version: nB });
        if (!r && o[t]) {
          var s = Error(
            "@opentelemetry/api: Attempted duplicate registration of API: " + t,
          );
          return n.error(s.stack || s.message), !1;
        }
        if (o.version !== nB) {
          var s = Error(
            "@opentelemetry/api: Registration of version v" +
              o.version +
              " for " +
              t +
              " does not match previously registered API v" +
              nB,
          );
          return n.error(s.stack || s.message), !1;
        }
        return (
          (o[t] = e),
          n.debug(
            "@opentelemetry/api: Registered a global for " +
              t +
              " v" +
              nB +
              ".",
          ),
          !0
        );
      }
      function nX(t) {
        var e,
          n,
          r = null == (e = nj[nG]) ? void 0 : e.version;
        if (r && nF(r)) return null == (n = nj[nG]) ? void 0 : n[t];
      }
      function nH(t, e) {
        e.debug(
          "@opentelemetry/api: Unregistering a global for " +
            t +
            " v" +
            nB +
            ".",
        );
        var n = nj[nG];
        n && delete n[t];
      }
      var nz = function (t, e) {
          var n = "function" == typeof Symbol && t[Symbol.iterator];
          if (!n) return t;
          var r,
            i,
            o = n.call(t),
            s = [];
          try {
            for (; (void 0 === e || e-- > 0) && !(r = o.next()).done; )
              s.push(r.value);
          } catch (t) {
            i = { error: t };
          } finally {
            try {
              r && !r.done && (n = o.return) && n.call(o);
            } finally {
              if (i) throw i.error;
            }
          }
          return s;
        },
        nY = function (t, e, n) {
          if (n || 2 == arguments.length)
            for (var r, i = 0, o = e.length; i < o; i++)
              (!r && i in e) ||
                (r || (r = Array.prototype.slice.call(e, 0, i)), (r[i] = e[i]));
          return t.concat(r || Array.prototype.slice.call(e));
        },
        nW = (function () {
          function t(t) {
            this._namespace = t.namespace || "DiagComponentLogger";
          }
          return (
            (t.prototype.debug = function () {
              for (var t = [], e = 0; e < arguments.length; e++)
                t[e] = arguments[e];
              return nK("debug", this._namespace, t);
            }),
            (t.prototype.error = function () {
              for (var t = [], e = 0; e < arguments.length; e++)
                t[e] = arguments[e];
              return nK("error", this._namespace, t);
            }),
            (t.prototype.info = function () {
              for (var t = [], e = 0; e < arguments.length; e++)
                t[e] = arguments[e];
              return nK("info", this._namespace, t);
            }),
            (t.prototype.warn = function () {
              for (var t = [], e = 0; e < arguments.length; e++)
                t[e] = arguments[e];
              return nK("warn", this._namespace, t);
            }),
            (t.prototype.verbose = function () {
              for (var t = [], e = 0; e < arguments.length; e++)
                t[e] = arguments[e];
              return nK("verbose", this._namespace, t);
            }),
            t
          );
        })();
      function nK(t, e, n) {
        var r = nX("diag");
        if (r) return n.unshift(e), r[t].apply(r, nY([], nz(n), !1));
      }
      !(function (t) {
        (t[(t.NONE = 0)] = "NONE"),
          (t[(t.ERROR = 30)] = "ERROR"),
          (t[(t.WARN = 50)] = "WARN"),
          (t[(t.INFO = 60)] = "INFO"),
          (t[(t.DEBUG = 70)] = "DEBUG"),
          (t[(t.VERBOSE = 80)] = "VERBOSE"),
          (t[(t.ALL = 9999)] = "ALL");
      })(nO || (nO = {}));
      var nq = function (t, e) {
          var n = "function" == typeof Symbol && t[Symbol.iterator];
          if (!n) return t;
          var r,
            i,
            o = n.call(t),
            s = [];
          try {
            for (; (void 0 === e || e-- > 0) && !(r = o.next()).done; )
              s.push(r.value);
          } catch (t) {
            i = { error: t };
          } finally {
            try {
              r && !r.done && (n = o.return) && n.call(o);
            } finally {
              if (i) throw i.error;
            }
          }
          return s;
        },
        nJ = function (t, e, n) {
          if (n || 2 == arguments.length)
            for (var r, i = 0, o = e.length; i < o; i++)
              (!r && i in e) ||
                (r || (r = Array.prototype.slice.call(e, 0, i)), (r[i] = e[i]));
          return t.concat(r || Array.prototype.slice.call(e));
        },
        nZ = (function () {
          function t() {
            function t(t) {
              return function () {
                for (var e = [], n = 0; n < arguments.length; n++)
                  e[n] = arguments[n];
                var r = nX("diag");
                if (r) return r[t].apply(r, nJ([], nq(e), !1));
              };
            }
            var e = this;
            (e.setLogger = function (t, n) {
              if ((void 0 === n && (n = { logLevel: nO.INFO }), t === e)) {
                var r,
                  i,
                  o,
                  s = Error(
                    "Cannot use diag as the logger for itself. Please use a DiagLogger implementation like ConsoleDiagLogger or a custom implementation",
                  );
                return e.error(null != (r = s.stack) ? r : s.message), !1;
              }
              "number" == typeof n && (n = { logLevel: n });
              var a = nX("diag"),
                u = (function (t, e) {
                  function n(n, r) {
                    var i = e[n];
                    return "function" == typeof i && t >= r
                      ? i.bind(e)
                      : function () {};
                  }
                  return (
                    t < nO.NONE ? (t = nO.NONE) : t > nO.ALL && (t = nO.ALL),
                    (e = e || {}),
                    {
                      error: n("error", nO.ERROR),
                      warn: n("warn", nO.WARN),
                      info: n("info", nO.INFO),
                      debug: n("debug", nO.DEBUG),
                      verbose: n("verbose", nO.VERBOSE),
                    }
                  );
                })(null != (i = n.logLevel) ? i : nO.INFO, t);
              if (a && !n.suppressOverrideMessage) {
                var c =
                  null != (o = Error().stack)
                    ? o
                    : "<failed to generate stacktrace>";
                a.warn("Current logger will be overwritten from " + c),
                  u.warn(
                    "Current logger will overwrite one already registered from " +
                      c,
                  );
              }
              return nV("diag", u, e, !0);
            }),
              (e.disable = function () {
                nH("diag", e);
              }),
              (e.createComponentLogger = function (t) {
                return new nW(t);
              }),
              (e.verbose = t("verbose")),
              (e.debug = t("debug")),
              (e.info = t("info")),
              (e.warn = t("warn")),
              (e.error = t("error"));
          }
          return (
            (t.instance = function () {
              return (
                this._instance || (this._instance = new t()), this._instance
              );
            }),
            t
          );
        })(),
        nQ = function (t, e) {
          var n = "function" == typeof Symbol && t[Symbol.iterator];
          if (!n) return t;
          var r,
            i,
            o = n.call(t),
            s = [];
          try {
            for (; (void 0 === e || e-- > 0) && !(r = o.next()).done; )
              s.push(r.value);
          } catch (t) {
            i = { error: t };
          } finally {
            try {
              r && !r.done && (n = o.return) && n.call(o);
            } finally {
              if (i) throw i.error;
            }
          }
          return s;
        },
        n0 = function (t, e, n) {
          if (n || 2 == arguments.length)
            for (var r, i = 0, o = e.length; i < o; i++)
              (!r && i in e) ||
                (r || (r = Array.prototype.slice.call(e, 0, i)), (r[i] = e[i]));
          return t.concat(r || Array.prototype.slice.call(e));
        },
        n1 = "context",
        n2 = new nU(),
        n4 = (function () {
          function t() {}
          return (
            (t.getInstance = function () {
              return (
                this._instance || (this._instance = new t()), this._instance
              );
            }),
            (t.prototype.setGlobalContextManager = function (t) {
              return nV(n1, t, nZ.instance());
            }),
            (t.prototype.active = function () {
              return this._getContextManager().active();
            }),
            (t.prototype.with = function (t, e, n) {
              for (var r, i = [], o = 3; o < arguments.length; o++)
                i[o - 3] = arguments[o];
              return (r = this._getContextManager()).with.apply(
                r,
                n0([t, e, n], nQ(i), !1),
              );
            }),
            (t.prototype.bind = function (t, e) {
              return this._getContextManager().bind(t, e);
            }),
            (t.prototype._getContextManager = function () {
              return nX(n1) || n2;
            }),
            (t.prototype.disable = function () {
              this._getContextManager().disable(), nH(n1, nZ.instance());
            }),
            t
          );
        })(),
        n3 = n4.getInstance();
      !(function (t) {
        (t[(t.NONE = 0)] = "NONE"), (t[(t.SAMPLED = 1)] = "SAMPLED");
      })(nR || (nR = {}));
      var n5 = "0000000000000000",
        n9 = "00000000000000000000000000000000",
        n8 = { traceId: n9, spanId: n5, traceFlags: nR.NONE },
        n6 = (function () {
          function t(t) {
            void 0 === t && (t = n8), (this._spanContext = t);
          }
          return (
            (t.prototype.spanContext = function () {
              return this._spanContext;
            }),
            (t.prototype.setAttribute = function (t, e) {
              return this;
            }),
            (t.prototype.setAttributes = function (t) {
              return this;
            }),
            (t.prototype.addEvent = function (t, e) {
              return this;
            }),
            (t.prototype.addLink = function (t) {
              return this;
            }),
            (t.prototype.addLinks = function (t) {
              return this;
            }),
            (t.prototype.setStatus = function (t) {
              return this;
            }),
            (t.prototype.updateName = function (t) {
              return this;
            }),
            (t.prototype.end = function (t) {}),
            (t.prototype.isRecording = function () {
              return !1;
            }),
            (t.prototype.recordException = function (t, e) {}),
            t
          );
        })(),
        n7 = nE("OpenTelemetry Context Key SPAN");
      function rt(t) {
        return t.getValue(n7) || void 0;
      }
      function re() {
        return rt(n4.getInstance().active());
      }
      function rn(t, e) {
        return t.setValue(n7, e);
      }
      function rr(t) {
        return t.deleteValue(n7);
      }
      function ri(t, e) {
        return rn(t, new n6(e));
      }
      function ro(t) {
        var e;
        return null == (e = rt(t)) ? void 0 : e.spanContext();
      }
      var rs = /^([0-9a-f]{32})$/i,
        ra = /^[0-9a-f]{16}$/i;
      function ru(t) {
        return rs.test(t) && t !== n9;
      }
      function rc(t) {
        var e;
        return ru(t.traceId) && ((e = t.spanId), ra.test(e) && e !== n5);
      }
      function rl(t) {
        return new n6(t);
      }
      var rp = n4.getInstance(),
        rf = (function () {
          function t() {}
          return (
            (t.prototype.startSpan = function (t, e, n) {
              if (
                (void 0 === n && (n = rp.active()), null == e ? void 0 : e.root)
              )
                return new n6();
              var r,
                i = n && ro(n);
              return "object" == typeof (r = i) &&
                "string" == typeof r.spanId &&
                "string" == typeof r.traceId &&
                "number" == typeof r.traceFlags &&
                rc(i)
                ? new n6(i)
                : new n6();
            }),
            (t.prototype.startActiveSpan = function (t, e, n, r) {
              if (!(arguments.length < 2)) {
                2 == arguments.length
                  ? (s = e)
                  : 3 == arguments.length
                    ? ((i = e), (s = n))
                    : ((i = e), (o = n), (s = r));
                var i,
                  o,
                  s,
                  a = null != o ? o : rp.active(),
                  u = this.startSpan(t, i, a),
                  c = rn(a, u);
                return rp.with(c, s, void 0, u);
              }
            }),
            t
          );
        })(),
        rd = new rf(),
        rh = (function () {
          function t(t, e, n, r) {
            (this._provider = t),
              (this.name = e),
              (this.version = n),
              (this.options = r);
          }
          return (
            (t.prototype.startSpan = function (t, e, n) {
              return this._getTracer().startSpan(t, e, n);
            }),
            (t.prototype.startActiveSpan = function (t, e, n, r) {
              var i = this._getTracer();
              return Reflect.apply(i.startActiveSpan, i, arguments);
            }),
            (t.prototype._getTracer = function () {
              if (this._delegate) return this._delegate;
              var t = this._provider.getDelegateTracer(
                this.name,
                this.version,
                this.options,
              );
              return t ? ((this._delegate = t), this._delegate) : rd;
            }),
            t
          );
        })(),
        r_ = new ((function () {
          function t() {}
          return (
            (t.prototype.getTracer = function (t, e, n) {
              return new rf();
            }),
            t
          );
        })())(),
        rg = (function () {
          function t() {}
          return (
            (t.prototype.getTracer = function (t, e, n) {
              var r;
              return null != (r = this.getDelegateTracer(t, e, n))
                ? r
                : new rh(this, t, e, n);
            }),
            (t.prototype.getDelegate = function () {
              var t;
              return null != (t = this._delegate) ? t : r_;
            }),
            (t.prototype.setDelegate = function (t) {
              this._delegate = t;
            }),
            (t.prototype.getDelegateTracer = function (t, e, n) {
              var r;
              return null == (r = this._delegate)
                ? void 0
                : r.getTracer(t, e, n);
            }),
            t
          );
        })(),
        rm = "trace",
        ry = (function () {
          function t() {
            (this._proxyTracerProvider = new rg()),
              (this.wrapSpanContext = rl),
              (this.isSpanContextValid = rc),
              (this.deleteSpan = rr),
              (this.getSpan = rt),
              (this.getActiveSpan = re),
              (this.getSpanContext = ro),
              (this.setSpan = rn),
              (this.setSpanContext = ri);
          }
          return (
            (t.getInstance = function () {
              return (
                this._instance || (this._instance = new t()), this._instance
              );
            }),
            (t.prototype.setGlobalTracerProvider = function (t) {
              var e = nV(rm, this._proxyTracerProvider, nZ.instance());
              return e && this._proxyTracerProvider.setDelegate(t), e;
            }),
            (t.prototype.getTracerProvider = function () {
              return nX(rm) || this._proxyTracerProvider;
            }),
            (t.prototype.getTracer = function (t, e) {
              return this.getTracerProvider().getTracer(t, e);
            }),
            (t.prototype.disable = function () {
              nH(rm, nZ.instance()), (this._proxyTracerProvider = new rg());
            }),
            t
          );
        })().getInstance(),
        rv = nZ.instance();
      !(function (t) {
        (t[(t.INTERNAL = 0)] = "INTERNAL"),
          (t[(t.SERVER = 1)] = "SERVER"),
          (t[(t.CLIENT = 2)] = "CLIENT"),
          (t[(t.PRODUCER = 3)] = "PRODUCER"),
          (t[(t.CONSUMER = 4)] = "CONSUMER");
      })(nL || (nL = {})),
        (function (t) {
          (t[(t.NOT_RECORD = 0)] = "NOT_RECORD"),
            (t[(t.RECORD = 1)] = "RECORD"),
            (t[(t.RECORD_AND_SAMPLED = 2)] = "RECORD_AND_SAMPLED");
        })(nP || (nP = {}));
      var rE = function (t, e) {
          var n = "function" == typeof Symbol && t[Symbol.iterator];
          if (!n) return t;
          var r,
            i,
            o = n.call(t),
            s = [];
          try {
            for (; (void 0 === e || e-- > 0) && !(r = o.next()).done; )
              s.push(r.value);
          } catch (t) {
            i = { error: t };
          } finally {
            try {
              r && !r.done && (n = o.return) && n.call(o);
            } finally {
              if (i) throw i.error;
            }
          }
          return s;
        },
        rS = function (t) {
          var e = "function" == typeof Symbol && Symbol.iterator,
            n = e && t[e],
            r = 0;
          if (n) return n.call(t);
          if (t && "number" == typeof t.length)
            return {
              next: function () {
                return (
                  t && r >= t.length && (t = void 0),
                  { value: t && t[r++], done: !t }
                );
              },
            };
          throw TypeError(
            e ? "Object is not iterable." : "Symbol.iterator is not defined.",
          );
        },
        rT = (function () {
          function t(t) {
            this._entries = t ? new Map(t) : new Map();
          }
          return (
            (t.prototype.getEntry = function (t) {
              var e = this._entries.get(t);
              if (e) return Object.assign({}, e);
            }),
            (t.prototype.getAllEntries = function () {
              return Array.from(this._entries.entries()).map(function (t) {
                var e = rE(t, 2);
                return [e[0], e[1]];
              });
            }),
            (t.prototype.setEntry = function (e, n) {
              var r = new t(this._entries);
              return r._entries.set(e, n), r;
            }),
            (t.prototype.removeEntry = function (e) {
              var n = new t(this._entries);
              return n._entries.delete(e), n;
            }),
            (t.prototype.removeEntries = function () {
              for (var e, n, r = [], i = 0; i < arguments.length; i++)
                r[i] = arguments[i];
              var o = new t(this._entries);
              try {
                for (var s = rS(r), a = s.next(); !a.done; a = s.next()) {
                  var u = a.value;
                  o._entries.delete(u);
                }
              } catch (t) {
                e = { error: t };
              } finally {
                try {
                  a && !a.done && (n = s.return) && n.call(s);
                } finally {
                  if (e) throw e.error;
                }
              }
              return o;
            }),
            (t.prototype.clear = function () {
              return new t();
            }),
            t
          );
        })(),
        rb = Symbol("BaggageEntryMetadata"),
        rO = nZ.instance();
      function rR(t) {
        return void 0 === t && (t = {}), new rT(new Map(Object.entries(t)));
      }
      var rL = (function () {
          function t() {}
          return (
            (t.prototype.inject = function (t, e) {}),
            (t.prototype.extract = function (t, e) {
              return t;
            }),
            (t.prototype.fields = function () {
              return [];
            }),
            t
          );
        })(),
        rP = {
          get: function (t, e) {
            if (null != t) return t[e];
          },
          keys: function (t) {
            return null == t ? [] : Object.keys(t);
          },
        },
        rA = {
          set: function (t, e, n) {
            null != t && (t[e] = n);
          },
        },
        rI = nE("OpenTelemetry Baggage Key");
      function rC(t) {
        return t.getValue(rI) || void 0;
      }
      function rw() {
        return rC(n4.getInstance().active());
      }
      function rx(t, e) {
        return t.setValue(rI, e);
      }
      function rN(t) {
        return t.deleteValue(rI);
      }
      var rM = "propagation",
        rk = new rL(),
        rD = (function () {
          function t() {
            (this.createBaggage = rR),
              (this.getBaggage = rC),
              (this.getActiveBaggage = rw),
              (this.setBaggage = rx),
              (this.deleteBaggage = rN);
          }
          return (
            (t.getInstance = function () {
              return (
                this._instance || (this._instance = new t()), this._instance
              );
            }),
            (t.prototype.setGlobalPropagator = function (t) {
              return nV(rM, t, nZ.instance());
            }),
            (t.prototype.inject = function (t, e, n) {
              return (
                void 0 === n && (n = rA),
                this._getGlobalPropagator().inject(t, e, n)
              );
            }),
            (t.prototype.extract = function (t, e, n) {
              return (
                void 0 === n && (n = rP),
                this._getGlobalPropagator().extract(t, e, n)
              );
            }),
            (t.prototype.fields = function () {
              return this._getGlobalPropagator().fields();
            }),
            (t.prototype.disable = function () {
              nH(rM, nZ.instance());
            }),
            (t.prototype._getGlobalPropagator = function () {
              return nX(rM) || rk;
            }),
            t
          );
        })().getInstance();
      !(function (t) {
        (t[(t.UNSET = 0)] = "UNSET"),
          (t[(t.OK = 1)] = "OK"),
          (t[(t.ERROR = 2)] = "ERROR");
      })(nA || (nA = {}));
      var rU = n(25356).Buffer;
      void 0 === globalThis.performance &&
        (globalThis.performance = { timeOrigin: 0, now: () => Date.now() });
      class rj extends ej {
        constructor(t) {
          t5(t, "vercel-edge"),
            (t._metadata = t._metadata || {}),
            super({
              ...t,
              platform: "javascript",
              runtime: { name: "vercel-edge" },
              serverName: t.serverName || process.env.SENTRY_NAME,
            });
        }
        async flush(t) {
          let e = this.traceProvider,
            n = e?.activeSpanProcessor;
          return (
            n && (await n.forceFlush()),
            this.getOptions().sendClientReports && this._flushOutcomes(),
            super.flush(t)
          );
        }
      }
      var rB = "telemetry.sdk.name",
        r$ = "telemetry.sdk.language",
        rF = "telemetry.sdk.version",
        rG = nE("OpenTelemetry SDK Context Key SUPPRESS_TRACING");
      function rV(t) {
        return t.setValue(rG, !0);
      }
      function rX(t) {
        return !0 === t.getValue(rG);
      }
      var rH = "baggage",
        rz =
          (globalThis && globalThis.__read) ||
          function (t, e) {
            var n = "function" == typeof Symbol && t[Symbol.iterator];
            if (!n) return t;
            var r,
              i,
              o = n.call(t),
              s = [];
            try {
              for (; (void 0 === e || e-- > 0) && !(r = o.next()).done; )
                s.push(r.value);
            } catch (t) {
              i = { error: t };
            } finally {
              try {
                r && !r.done && (n = o.return) && n.call(o);
              } finally {
                if (i) throw i.error;
              }
            }
            return s;
          },
        rY = (function () {
          function t() {}
          return (
            (t.prototype.inject = function (t, e, n) {
              var r = rD.getBaggage(t);
              if (!(!r || rX(t))) {
                var i = r
                  .getAllEntries()
                  .map(function (t) {
                    var e = rz(t, 2),
                      n = e[0],
                      r = e[1],
                      i =
                        encodeURIComponent(n) +
                        "=" +
                        encodeURIComponent(r.value);
                    return (
                      void 0 !== r.metadata &&
                        (i += ";" + r.metadata.toString()),
                      i
                    );
                  })
                  .filter(function (t) {
                    return t.length <= 4096;
                  })
                  .slice(0, 180)
                  .reduce(function (t, e) {
                    var n = "" + t + ("" !== t ? "," : "") + e;
                    return n.length > 8192 ? t : n;
                  }, "");
                i.length > 0 && n.set(e, rH, i);
              }
            }),
            (t.prototype.extract = function (t, e, n) {
              var r = n.get(e, rH),
                i = Array.isArray(r) ? r.join(",") : r;
              if (!i) return t;
              var o = {};
              return 0 === i.length ||
                (i.split(",").forEach(function (t) {
                  var e = (function (t) {
                    var e,
                      n = t.split(";");
                    if (!(n.length <= 0)) {
                      var r = n.shift();
                      if (r) {
                        var i = r.indexOf("=");
                        if (!(i <= 0)) {
                          var o,
                            s = decodeURIComponent(r.substring(0, i).trim()),
                            a = decodeURIComponent(r.substring(i + 1).trim());
                          return (
                            n.length > 0 &&
                              ("string" != typeof (o = n.join(";")) &&
                                (rO.error(
                                  "Cannot create baggage metadata from unknown type: " +
                                    typeof o,
                                ),
                                (o = "")),
                              (e = {
                                __TYPE__: rb,
                                toString: function () {
                                  return o;
                                },
                              })),
                            { key: s, value: a, metadata: e }
                          );
                        }
                      }
                    }
                  })(t);
                  if (e) {
                    var n = { value: e.value };
                    e.metadata && (n.metadata = e.metadata), (o[e.key] = n);
                  }
                }),
                0 === Object.entries(o).length)
                ? t
                : rD.setBaggage(t, rD.createBaggage(o));
            }),
            (t.prototype.fields = function () {
              return [rH];
            }),
            t
          );
        })(),
        rW =
          (globalThis && globalThis.__values) ||
          function (t) {
            var e = "function" == typeof Symbol && Symbol.iterator,
              n = e && t[e],
              r = 0;
            if (n) return n.call(t);
            if (t && "number" == typeof t.length)
              return {
                next: function () {
                  return (
                    t && r >= t.length && (t = void 0),
                    { value: t && t[r++], done: !t }
                  );
                },
              };
            throw TypeError(
              e ? "Object is not iterable." : "Symbol.iterator is not defined.",
            );
          },
        rK =
          (globalThis && globalThis.__read) ||
          function (t, e) {
            var n = "function" == typeof Symbol && t[Symbol.iterator];
            if (!n) return t;
            var r,
              i,
              o = n.call(t),
              s = [];
            try {
              for (; (void 0 === e || e-- > 0) && !(r = o.next()).done; )
                s.push(r.value);
            } catch (t) {
              i = { error: t };
            } finally {
              try {
                r && !r.done && (n = o.return) && n.call(o);
              } finally {
                if (i) throw i.error;
              }
            }
            return s;
          };
      function rq(t) {
        var e,
          n,
          r = {};
        if ("object" != typeof t || null == t) return r;
        try {
          for (
            var i = rW(Object.entries(t)), o = i.next();
            !o.done;
            o = i.next()
          ) {
            var s,
              a = rK(o.value, 2),
              u = a[0],
              c = a[1];
            if (((s = u), "string" != typeof s || !(s.length > 0))) {
              rv.warn("Invalid attribute key: " + u);
              continue;
            }
            if (!rJ(c)) {
              rv.warn("Invalid attribute value set for key: " + u);
              continue;
            }
            Array.isArray(c) ? (r[u] = c.slice()) : (r[u] = c);
          }
        } catch (t) {
          e = { error: t };
        } finally {
          try {
            o && !o.done && (n = i.return) && n.call(i);
          } finally {
            if (e) throw e.error;
          }
        }
        return r;
      }
      function rJ(t) {
        return (
          null == t ||
          (Array.isArray(t)
            ? (function (t) {
                try {
                  for (
                    var e, n, r, i = rW(t), o = i.next();
                    !o.done;
                    o = i.next()
                  ) {
                    var s = o.value;
                    if (null != s) {
                      if (!r) {
                        if (rZ(s)) {
                          r = typeof s;
                          continue;
                        }
                        return !1;
                      }
                      if (typeof s !== r) return !1;
                    }
                  }
                } catch (t) {
                  e = { error: t };
                } finally {
                  try {
                    o && !o.done && (n = i.return) && n.call(i);
                  } finally {
                    if (e) throw e.error;
                  }
                }
                return !0;
              })(t)
            : rZ(t))
        );
      }
      function rZ(t) {
        switch (typeof t) {
          case "number":
          case "boolean":
          case "string":
            return !0;
        }
        return !1;
      }
      var rQ = function (t) {
        var e;
        rv.error(
          "string" == typeof (e = t)
            ? e
            : JSON.stringify(
                (function (t) {
                  for (var e = {}, n = t; null !== n; )
                    Object.getOwnPropertyNames(n).forEach(function (t) {
                      if (!e[t]) {
                        var r = n[t];
                        r && (e[t] = String(r));
                      }
                    }),
                      (n = Object.getPrototypeOf(n));
                  return e;
                })(e),
              ),
        );
      };
      function r0(t) {
        try {
          rQ(t);
        } catch (t) {}
      }
      !(function (t) {
        (t.AlwaysOff = "always_off"),
          (t.AlwaysOn = "always_on"),
          (t.ParentBasedAlwaysOff = "parentbased_always_off"),
          (t.ParentBasedAlwaysOn = "parentbased_always_on"),
          (t.ParentBasedTraceIdRatio = "parentbased_traceidratio"),
          (t.TraceIdRatio = "traceidratio");
      })(nI || (nI = {}));
      var r1 = ["OTEL_SDK_DISABLED"],
        r2 = [
          "OTEL_BSP_EXPORT_TIMEOUT",
          "OTEL_BSP_MAX_EXPORT_BATCH_SIZE",
          "OTEL_BSP_MAX_QUEUE_SIZE",
          "OTEL_BSP_SCHEDULE_DELAY",
          "OTEL_BLRP_EXPORT_TIMEOUT",
          "OTEL_BLRP_MAX_EXPORT_BATCH_SIZE",
          "OTEL_BLRP_MAX_QUEUE_SIZE",
          "OTEL_BLRP_SCHEDULE_DELAY",
          "OTEL_ATTRIBUTE_VALUE_LENGTH_LIMIT",
          "OTEL_ATTRIBUTE_COUNT_LIMIT",
          "OTEL_SPAN_ATTRIBUTE_VALUE_LENGTH_LIMIT",
          "OTEL_SPAN_ATTRIBUTE_COUNT_LIMIT",
          "OTEL_LOGRECORD_ATTRIBUTE_VALUE_LENGTH_LIMIT",
          "OTEL_LOGRECORD_ATTRIBUTE_COUNT_LIMIT",
          "OTEL_SPAN_EVENT_COUNT_LIMIT",
          "OTEL_SPAN_LINK_COUNT_LIMIT",
          "OTEL_SPAN_ATTRIBUTE_PER_EVENT_COUNT_LIMIT",
          "OTEL_SPAN_ATTRIBUTE_PER_LINK_COUNT_LIMIT",
          "OTEL_EXPORTER_OTLP_TIMEOUT",
          "OTEL_EXPORTER_OTLP_TRACES_TIMEOUT",
          "OTEL_EXPORTER_OTLP_METRICS_TIMEOUT",
          "OTEL_EXPORTER_OTLP_LOGS_TIMEOUT",
          "OTEL_EXPORTER_JAEGER_AGENT_PORT",
        ],
        r4 = [
          "OTEL_NO_PATCH_MODULES",
          "OTEL_PROPAGATORS",
          "OTEL_SEMCONV_STABILITY_OPT_IN",
        ],
        r3 = 1 / 0,
        r5 = {
          OTEL_SDK_DISABLED: !1,
          CONTAINER_NAME: "",
          ECS_CONTAINER_METADATA_URI_V4: "",
          ECS_CONTAINER_METADATA_URI: "",
          HOSTNAME: "",
          KUBERNETES_SERVICE_HOST: "",
          NAMESPACE: "",
          OTEL_BSP_EXPORT_TIMEOUT: 3e4,
          OTEL_BSP_MAX_EXPORT_BATCH_SIZE: 512,
          OTEL_BSP_MAX_QUEUE_SIZE: 2048,
          OTEL_BSP_SCHEDULE_DELAY: 5e3,
          OTEL_BLRP_EXPORT_TIMEOUT: 3e4,
          OTEL_BLRP_MAX_EXPORT_BATCH_SIZE: 512,
          OTEL_BLRP_MAX_QUEUE_SIZE: 2048,
          OTEL_BLRP_SCHEDULE_DELAY: 5e3,
          OTEL_EXPORTER_JAEGER_AGENT_HOST: "",
          OTEL_EXPORTER_JAEGER_AGENT_PORT: 6832,
          OTEL_EXPORTER_JAEGER_ENDPOINT: "",
          OTEL_EXPORTER_JAEGER_PASSWORD: "",
          OTEL_EXPORTER_JAEGER_USER: "",
          OTEL_EXPORTER_OTLP_ENDPOINT: "",
          OTEL_EXPORTER_OTLP_TRACES_ENDPOINT: "",
          OTEL_EXPORTER_OTLP_METRICS_ENDPOINT: "",
          OTEL_EXPORTER_OTLP_LOGS_ENDPOINT: "",
          OTEL_EXPORTER_OTLP_HEADERS: "",
          OTEL_EXPORTER_OTLP_TRACES_HEADERS: "",
          OTEL_EXPORTER_OTLP_METRICS_HEADERS: "",
          OTEL_EXPORTER_OTLP_LOGS_HEADERS: "",
          OTEL_EXPORTER_OTLP_TIMEOUT: 1e4,
          OTEL_EXPORTER_OTLP_TRACES_TIMEOUT: 1e4,
          OTEL_EXPORTER_OTLP_METRICS_TIMEOUT: 1e4,
          OTEL_EXPORTER_OTLP_LOGS_TIMEOUT: 1e4,
          OTEL_EXPORTER_ZIPKIN_ENDPOINT: "http://localhost:9411/api/v2/spans",
          OTEL_LOG_LEVEL: nO.INFO,
          OTEL_NO_PATCH_MODULES: [],
          OTEL_PROPAGATORS: ["tracecontext", "baggage"],
          OTEL_RESOURCE_ATTRIBUTES: "",
          OTEL_SERVICE_NAME: "",
          OTEL_ATTRIBUTE_VALUE_LENGTH_LIMIT: r3,
          OTEL_ATTRIBUTE_COUNT_LIMIT: 128,
          OTEL_SPAN_ATTRIBUTE_VALUE_LENGTH_LIMIT: r3,
          OTEL_SPAN_ATTRIBUTE_COUNT_LIMIT: 128,
          OTEL_LOGRECORD_ATTRIBUTE_VALUE_LENGTH_LIMIT: r3,
          OTEL_LOGRECORD_ATTRIBUTE_COUNT_LIMIT: 128,
          OTEL_SPAN_EVENT_COUNT_LIMIT: 128,
          OTEL_SPAN_LINK_COUNT_LIMIT: 128,
          OTEL_SPAN_ATTRIBUTE_PER_EVENT_COUNT_LIMIT: 128,
          OTEL_SPAN_ATTRIBUTE_PER_LINK_COUNT_LIMIT: 128,
          OTEL_TRACES_EXPORTER: "",
          OTEL_TRACES_SAMPLER: nI.ParentBasedAlwaysOn,
          OTEL_TRACES_SAMPLER_ARG: "",
          OTEL_LOGS_EXPORTER: "",
          OTEL_EXPORTER_OTLP_INSECURE: "",
          OTEL_EXPORTER_OTLP_TRACES_INSECURE: "",
          OTEL_EXPORTER_OTLP_METRICS_INSECURE: "",
          OTEL_EXPORTER_OTLP_LOGS_INSECURE: "",
          OTEL_EXPORTER_OTLP_CERTIFICATE: "",
          OTEL_EXPORTER_OTLP_TRACES_CERTIFICATE: "",
          OTEL_EXPORTER_OTLP_METRICS_CERTIFICATE: "",
          OTEL_EXPORTER_OTLP_LOGS_CERTIFICATE: "",
          OTEL_EXPORTER_OTLP_COMPRESSION: "",
          OTEL_EXPORTER_OTLP_TRACES_COMPRESSION: "",
          OTEL_EXPORTER_OTLP_METRICS_COMPRESSION: "",
          OTEL_EXPORTER_OTLP_LOGS_COMPRESSION: "",
          OTEL_EXPORTER_OTLP_CLIENT_KEY: "",
          OTEL_EXPORTER_OTLP_TRACES_CLIENT_KEY: "",
          OTEL_EXPORTER_OTLP_METRICS_CLIENT_KEY: "",
          OTEL_EXPORTER_OTLP_LOGS_CLIENT_KEY: "",
          OTEL_EXPORTER_OTLP_CLIENT_CERTIFICATE: "",
          OTEL_EXPORTER_OTLP_TRACES_CLIENT_CERTIFICATE: "",
          OTEL_EXPORTER_OTLP_METRICS_CLIENT_CERTIFICATE: "",
          OTEL_EXPORTER_OTLP_LOGS_CLIENT_CERTIFICATE: "",
          OTEL_EXPORTER_OTLP_PROTOCOL: "http/protobuf",
          OTEL_EXPORTER_OTLP_TRACES_PROTOCOL: "http/protobuf",
          OTEL_EXPORTER_OTLP_METRICS_PROTOCOL: "http/protobuf",
          OTEL_EXPORTER_OTLP_LOGS_PROTOCOL: "http/protobuf",
          OTEL_EXPORTER_OTLP_METRICS_TEMPORALITY_PREFERENCE: "cumulative",
          OTEL_SEMCONV_STABILITY_OPT_IN: [],
        },
        r9 = {
          ALL: nO.ALL,
          VERBOSE: nO.VERBOSE,
          DEBUG: nO.DEBUG,
          INFO: nO.INFO,
          WARN: nO.WARN,
          ERROR: nO.ERROR,
          NONE: nO.NONE,
        };
      function r8(t) {
        var e = {};
        for (var n in r5)
          if ("OTEL_LOG_LEVEL" === n)
            !(function (t, e, n) {
              var r = n[t];
              if ("string" == typeof r) {
                var i = r9[r.toUpperCase()];
                null != i && (e[t] = i);
              }
            })(n, e, t);
          else if (r1.indexOf(n) > -1) {
            if (void 0 !== t[n]) {
              var r = String(t[n]);
              e[n] = "true" === r.toLowerCase();
            }
          } else if (r2.indexOf(n) > -1)
            !(function (t, e, n, r, i) {
              if (
                (void 0 === r && (r = -1 / 0),
                void 0 === i && (i = 1 / 0),
                void 0 !== n[t])
              ) {
                var o = Number(n[t]);
                isNaN(o) ||
                  (o < r ? (e[t] = r) : o > i ? (e[t] = i) : (e[t] = o));
              }
            })(n, e, t);
          else if (r4.indexOf(n) > -1)
            !(function (t, e, n, r) {
              void 0 === r && (r = ",");
              var i = n[t];
              "string" == typeof i &&
                (e[t] = i.split(r).map(function (t) {
                  return t.trim();
                }));
            })(n, e, t);
          else {
            var i = t[n];
            null != i && (e[n] = String(i));
          }
        return e;
      }
      function r6() {
        return Object.assign({}, r5, r8(process.env));
      }
      var r7 = { timeOrigin: 0, now: () => Date.now() },
        it =
          (((nC = {})["telemetry.sdk.name"] = "opentelemetry"),
          (nC["process.runtime.name"] = "node"),
          (nC["telemetry.sdk.language"] = "nodejs"),
          (nC["telemetry.sdk.version"] = "1.30.1"),
          nC);
      function ie(t) {
        return [Math.trunc(t / 1e3), Math.round((t % 1e3) * 1e6)];
      }
      function ir() {
        return r7.timeOrigin;
      }
      function ii(t) {
        return (
          Array.isArray(t) &&
          2 === t.length &&
          "number" == typeof t[0] &&
          "number" == typeof t[1]
        );
      }
      function io(t) {
        return ii(t) || "number" == typeof t || t instanceof Date;
      }
      function is(t, e) {
        var n = [t[0] + e[0], t[1] + e[1]];
        return n[1] >= 1e9 && ((n[1] -= 1e9), (n[0] += 1)), n;
      }
      !(function (t) {
        (t[(t.SUCCESS = 0)] = "SUCCESS"), (t[(t.FAILED = 1)] = "FAILED");
      })(nw || (nw = {}));
      var ia =
          (globalThis && globalThis.__values) ||
          function (t) {
            var e = "function" == typeof Symbol && Symbol.iterator,
              n = e && t[e],
              r = 0;
            if (n) return n.call(t);
            if (t && "number" == typeof t.length)
              return {
                next: function () {
                  return (
                    t && r >= t.length && (t = void 0),
                    { value: t && t[r++], done: !t }
                  );
                },
              };
            throw TypeError(
              e ? "Object is not iterable." : "Symbol.iterator is not defined.",
            );
          },
        iu = (function () {
          function t(t) {
            var e;
            void 0 === t && (t = {}),
              (this._propagators = null != (e = t.propagators) ? e : []),
              (this._fields = Array.from(
                new Set(
                  this._propagators
                    .map(function (t) {
                      return "function" == typeof t.fields ? t.fields() : [];
                    })
                    .reduce(function (t, e) {
                      return t.concat(e);
                    }, []),
                ),
              ));
          }
          return (
            (t.prototype.inject = function (t, e, n) {
              var r, i;
              try {
                for (
                  var o = ia(this._propagators), s = o.next();
                  !s.done;
                  s = o.next()
                ) {
                  var a = s.value;
                  try {
                    a.inject(t, e, n);
                  } catch (t) {
                    rv.warn(
                      "Failed to inject with " +
                        a.constructor.name +
                        ". Err: " +
                        t.message,
                    );
                  }
                }
              } catch (t) {
                r = { error: t };
              } finally {
                try {
                  s && !s.done && (i = o.return) && i.call(o);
                } finally {
                  if (r) throw r.error;
                }
              }
            }),
            (t.prototype.extract = function (t, e, n) {
              return this._propagators.reduce(function (t, r) {
                try {
                  return r.extract(t, e, n);
                } catch (t) {
                  rv.warn(
                    "Failed to extract with " +
                      r.constructor.name +
                      ". Err: " +
                      t.message,
                  );
                }
                return t;
              }, t);
            }),
            (t.prototype.fields = function () {
              return this._fields.slice();
            }),
            t
          );
        })(),
        ic = "[_0-9a-z-*/]",
        il = RegExp(
          "^(?:[a-z]" +
            ic +
            "{0,255}|" +
            ("[a-z0-9]" + ic + "{0,240}@[a-z]") +
            ic +
            "{0,13})$",
        ),
        ip = /^[ -~]{0,255}[!-~]$/,
        id = /,|=/,
        ih = (function () {
          function t(t) {
            (this._internalState = new Map()), t && this._parse(t);
          }
          return (
            (t.prototype.set = function (t, e) {
              var n = this._clone();
              return (
                n._internalState.has(t) && n._internalState.delete(t),
                n._internalState.set(t, e),
                n
              );
            }),
            (t.prototype.unset = function (t) {
              var e = this._clone();
              return e._internalState.delete(t), e;
            }),
            (t.prototype.get = function (t) {
              return this._internalState.get(t);
            }),
            (t.prototype.serialize = function () {
              var t = this;
              return this._keys()
                .reduce(function (e, n) {
                  return e.push(n + "=" + t.get(n)), e;
                }, [])
                .join(",");
            }),
            (t.prototype._parse = function (t) {
              !(t.length > 512) &&
                ((this._internalState = t
                  .split(",")
                  .reverse()
                  .reduce(function (t, e) {
                    var n = e.trim(),
                      r = n.indexOf("=");
                    if (-1 !== r) {
                      var i = n.slice(0, r),
                        o = n.slice(r + 1, e.length);
                      il.test(i) && ip.test(o) && !id.test(o) && t.set(i, o);
                    }
                    return t;
                  }, new Map())),
                this._internalState.size > 32 &&
                  (this._internalState = new Map(
                    Array.from(this._internalState.entries())
                      .reverse()
                      .slice(0, 32),
                  )));
            }),
            (t.prototype._keys = function () {
              return Array.from(this._internalState.keys()).reverse();
            }),
            (t.prototype._clone = function () {
              var e = new t();
              return (e._internalState = new Map(this._internalState)), e;
            }),
            t
          );
        })(),
        i_ = "traceparent",
        ig = "tracestate",
        im = RegExp(
          "^\\s?((?!ff)[\\da-f]{2})-((?![0]{32})[\\da-f]{32})-((?![0]{16})[\\da-f]{16})-([\\da-f]{2})(-.*)?\\s?$",
        ),
        iy = (function () {
          function t() {}
          return (
            (t.prototype.inject = function (t, e, n) {
              var r = ry.getSpanContext(t);
              if (!(!r || rX(t)) && rc(r)) {
                var i =
                  "00-" +
                  r.traceId +
                  "-" +
                  r.spanId +
                  "-0" +
                  Number(r.traceFlags || nR.NONE).toString(16);
                n.set(e, i_, i),
                  r.traceState && n.set(e, ig, r.traceState.serialize());
              }
            }),
            (t.prototype.extract = function (t, e, n) {
              var r,
                i = n.get(e, i_);
              if (!i) return t;
              var o = Array.isArray(i) ? i[0] : i;
              if ("string" != typeof o) return t;
              var s =
                (r = im.exec(o)) && ("00" !== r[1] || !r[5])
                  ? {
                      traceId: r[2],
                      spanId: r[3],
                      traceFlags: parseInt(r[4], 16),
                    }
                  : null;
              if (!s) return t;
              s.isRemote = !0;
              var a = n.get(e, ig);
              if (a) {
                var u = Array.isArray(a) ? a.join(",") : a;
                s.traceState = new ih("string" == typeof u ? u : void 0);
              }
              return ry.setSpanContext(t, s);
            }),
            (t.prototype.fields = function () {
              return [i_, ig];
            }),
            t
          );
        })(),
        iv = Function.prototype.toString,
        iE = iv.call(Object),
        iS =
          ((nS = Object.getPrototypeOf),
          (nT = Object),
          function (t) {
            return nS(nT(t));
          }),
        iT = Object.prototype,
        ib = iT.hasOwnProperty,
        iO = Symbol ? Symbol.toStringTag : void 0,
        iR = iT.toString;
      function iL(t) {
        if (
          null == (e = t) ||
          "object" != typeof e ||
          "[object Object]" !==
            (null == (n = t)
              ? void 0 === n
                ? "[object Undefined]"
                : "[object Null]"
              : iO && iO in Object(n)
                ? (function (t) {
                    var e = ib.call(t, iO),
                      n = t[iO],
                      r = !1;
                    try {
                      (t[iO] = void 0), (r = !0);
                    } catch (t) {}
                    var i = iR.call(t);
                    return r && (e ? (t[iO] = n) : delete t[iO]), i;
                  })(n)
                : ((r = n), iR.call(r)))
        )
          return !1;
        var e,
          n,
          r,
          i = iS(t);
        if (null === i) return !0;
        var o = ib.call(i, "constructor") && i.constructor;
        return "function" == typeof o && o instanceof o && iv.call(o) === iE;
      }
      function iP(t) {
        return iI(t) ? t.slice() : t;
      }
      function iA(t, e, n) {
        for (var r = n.get(t[e]) || [], i = 0, o = r.length; i < o; i++) {
          var s = r[i];
          if (s.key === e && s.obj === t) return !0;
        }
        return !1;
      }
      function iI(t) {
        return Array.isArray(t);
      }
      function iC(t) {
        return "function" == typeof t;
      }
      function iw(t) {
        return !ix(t) && !iI(t) && !iC(t) && "object" == typeof t;
      }
      function ix(t) {
        return (
          "string" == typeof t ||
          "number" == typeof t ||
          "boolean" == typeof t ||
          void 0 === t ||
          t instanceof Date ||
          t instanceof RegExp ||
          null === t
        );
      }
      var iN = (function () {
          function t() {
            var t = this;
            this._promise = new Promise(function (e, n) {
              (t._resolve = e), (t._reject = n);
            });
          }
          return (
            Object.defineProperty(t.prototype, "promise", {
              get: function () {
                return this._promise;
              },
              enumerable: !1,
              configurable: !0,
            }),
            (t.prototype.resolve = function (t) {
              this._resolve(t);
            }),
            (t.prototype.reject = function (t) {
              this._reject(t);
            }),
            t
          );
        })(),
        iM =
          (globalThis && globalThis.__read) ||
          function (t, e) {
            var n = "function" == typeof Symbol && t[Symbol.iterator];
            if (!n) return t;
            var r,
              i,
              o = n.call(t),
              s = [];
            try {
              for (; (void 0 === e || e-- > 0) && !(r = o.next()).done; )
                s.push(r.value);
            } catch (t) {
              i = { error: t };
            } finally {
              try {
                r && !r.done && (n = o.return) && n.call(o);
              } finally {
                if (i) throw i.error;
              }
            }
            return s;
          },
        ik =
          (globalThis && globalThis.__spreadArray) ||
          function (t, e, n) {
            if (n || 2 == arguments.length)
              for (var r, i = 0, o = e.length; i < o; i++)
                (!r && i in e) ||
                  (r || (r = Array.prototype.slice.call(e, 0, i)),
                  (r[i] = e[i]));
            return t.concat(r || Array.prototype.slice.call(e));
          },
        iD = (function () {
          function t(t, e) {
            (this._callback = t),
              (this._that = e),
              (this._isCalled = !1),
              (this._deferred = new iN());
          }
          return (
            Object.defineProperty(t.prototype, "isCalled", {
              get: function () {
                return this._isCalled;
              },
              enumerable: !1,
              configurable: !0,
            }),
            Object.defineProperty(t.prototype, "promise", {
              get: function () {
                return this._deferred.promise;
              },
              enumerable: !1,
              configurable: !0,
            }),
            (t.prototype.call = function () {
              for (var t, e = this, n = [], r = 0; r < arguments.length; r++)
                n[r] = arguments[r];
              if (!this._isCalled) {
                this._isCalled = !0;
                try {
                  Promise.resolve(
                    (t = this._callback).call.apply(
                      t,
                      ik([this._that], iM(n), !1),
                    ),
                  ).then(
                    function (t) {
                      return e._deferred.resolve(t);
                    },
                    function (t) {
                      return e._deferred.reject(t);
                    },
                  );
                } catch (t) {
                  this._deferred.reject(t);
                }
              }
              return this._deferred.promise;
            }),
            t
          );
        })(),
        iU =
          (globalThis && globalThis.__assign) ||
          function () {
            return (iU =
              Object.assign ||
              function (t) {
                for (var e, n = 1, r = arguments.length; n < r; n++)
                  for (var i in (e = arguments[n]))
                    Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i]);
                return t;
              }).apply(this, arguments);
          },
        ij =
          (globalThis && globalThis.__awaiter) ||
          function (t, e, n, r) {
            return new (n || (n = Promise))(function (i, o) {
              function s(t) {
                try {
                  u(r.next(t));
                } catch (t) {
                  o(t);
                }
              }
              function a(t) {
                try {
                  u(r.throw(t));
                } catch (t) {
                  o(t);
                }
              }
              function u(t) {
                var e;
                t.done
                  ? i(t.value)
                  : ((e = t.value) instanceof n
                      ? e
                      : new n(function (t) {
                          t(e);
                        })
                    ).then(s, a);
              }
              u((r = r.apply(t, e || [])).next());
            });
          },
        iB =
          (globalThis && globalThis.__generator) ||
          function (t, e) {
            var n,
              r,
              i,
              o,
              s = {
                label: 0,
                sent: function () {
                  if (1 & i[0]) throw i[1];
                  return i[1];
                },
                trys: [],
                ops: [],
              };
            return (
              (o = { next: a(0), throw: a(1), return: a(2) }),
              "function" == typeof Symbol &&
                (o[Symbol.iterator] = function () {
                  return this;
                }),
              o
            );
            function a(o) {
              return function (a) {
                var u = [o, a];
                if (n) throw TypeError("Generator is already executing.");
                for (; s; )
                  try {
                    if (
                      ((n = 1),
                      r &&
                        (i =
                          2 & u[0]
                            ? r.return
                            : u[0]
                              ? r.throw || ((i = r.return) && i.call(r), 0)
                              : r.next) &&
                        !(i = i.call(r, u[1])).done)
                    )
                      return i;
                    switch (((r = 0), i && (u = [2 & u[0], i.value]), u[0])) {
                      case 0:
                      case 1:
                        i = u;
                        break;
                      case 4:
                        return s.label++, { value: u[1], done: !1 };
                      case 5:
                        s.label++, (r = u[1]), (u = [0]);
                        continue;
                      case 7:
                        (u = s.ops.pop()), s.trys.pop();
                        continue;
                      default:
                        if (
                          !(i = (i = s.trys).length > 0 && i[i.length - 1]) &&
                          (6 === u[0] || 2 === u[0])
                        ) {
                          s = 0;
                          continue;
                        }
                        if (
                          3 === u[0] &&
                          (!i || (u[1] > i[0] && u[1] < i[3]))
                        ) {
                          s.label = u[1];
                          break;
                        }
                        if (6 === u[0] && s.label < i[1]) {
                          (s.label = i[1]), (i = u);
                          break;
                        }
                        if (i && s.label < i[2]) {
                          (s.label = i[2]), s.ops.push(u);
                          break;
                        }
                        i[2] && s.ops.pop(), s.trys.pop();
                        continue;
                    }
                    u = e.call(t, s);
                  } catch (t) {
                    (u = [6, t]), (r = 0);
                  } finally {
                    n = i = 0;
                  }
                if (5 & u[0]) throw u[1];
                return { value: u[0] ? u[1] : void 0, done: !0 };
              };
            }
          },
        i$ =
          (globalThis && globalThis.__read) ||
          function (t, e) {
            var n = "function" == typeof Symbol && t[Symbol.iterator];
            if (!n) return t;
            var r,
              i,
              o = n.call(t),
              s = [];
            try {
              for (; (void 0 === e || e-- > 0) && !(r = o.next()).done; )
                s.push(r.value);
            } catch (t) {
              i = { error: t };
            } finally {
              try {
                r && !r.done && (n = o.return) && n.call(o);
              } finally {
                if (i) throw i.error;
              }
            }
            return s;
          },
        iF = (function () {
          function t(t, e) {
            var n,
              r = this;
            (this._attributes = t),
              (this.asyncAttributesPending = null != e),
              (this._syncAttributes = null != (n = this._attributes) ? n : {}),
              (this._asyncAttributesPromise =
                null == e
                  ? void 0
                  : e.then(
                      function (t) {
                        return (
                          (r._attributes = Object.assign({}, r._attributes, t)),
                          (r.asyncAttributesPending = !1),
                          t
                        );
                      },
                      function (t) {
                        return (
                          rv.debug(
                            "a resource's async attributes promise rejected: %s",
                            t,
                          ),
                          (r.asyncAttributesPending = !1),
                          {}
                        );
                      },
                    ));
          }
          return (
            (t.empty = function () {
              return t.EMPTY;
            }),
            (t.default = function () {
              var e;
              return new t(
                (((e = {})["service.name"] = "unknown_service:"),
                (e[r$] = it[r$]),
                (e[rB] = it[rB]),
                (e[rF] = it[rF]),
                e),
              );
            }),
            Object.defineProperty(t.prototype, "attributes", {
              get: function () {
                var t;
                return (
                  this.asyncAttributesPending &&
                    rv.error(
                      "Accessing resource attributes before async attributes settled",
                    ),
                  null != (t = this._attributes) ? t : {}
                );
              },
              enumerable: !1,
              configurable: !0,
            }),
            (t.prototype.waitForAsyncAttributes = function () {
              return ij(this, void 0, void 0, function () {
                return iB(this, function (t) {
                  switch (t.label) {
                    case 0:
                      if (!this.asyncAttributesPending) return [3, 2];
                      return [4, this._asyncAttributesPromise];
                    case 1:
                      t.sent(), (t.label = 2);
                    case 2:
                      return [2];
                  }
                });
              });
            }),
            (t.prototype.merge = function (e) {
              var n,
                r = this;
              if (!e) return this;
              var i = iU(
                iU({}, this._syncAttributes),
                null != (n = e._syncAttributes) ? n : e.attributes,
              );
              return this._asyncAttributesPromise || e._asyncAttributesPromise
                ? new t(
                    i,
                    Promise.all([
                      this._asyncAttributesPromise,
                      e._asyncAttributesPromise,
                    ]).then(function (t) {
                      var n,
                        i = i$(t, 2),
                        o = i[0],
                        s = i[1];
                      return iU(
                        iU(
                          iU(iU({}, r._syncAttributes), o),
                          null != (n = e._syncAttributes) ? n : e.attributes,
                        ),
                        s,
                      );
                    }),
                  )
                : new t(i);
            }),
            (t.EMPTY = new t({})),
            t
          );
        })(),
        iG = "exception.type",
        iV = "exception.message",
        iX =
          (globalThis && globalThis.__assign) ||
          function () {
            return (iX =
              Object.assign ||
              function (t) {
                for (var e, n = 1, r = arguments.length; n < r; n++)
                  for (var i in (e = arguments[n]))
                    Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i]);
                return t;
              }).apply(this, arguments);
          },
        iH =
          (globalThis && globalThis.__values) ||
          function (t) {
            var e = "function" == typeof Symbol && Symbol.iterator,
              n = e && t[e],
              r = 0;
            if (n) return n.call(t);
            if (t && "number" == typeof t.length)
              return {
                next: function () {
                  return (
                    t && r >= t.length && (t = void 0),
                    { value: t && t[r++], done: !t }
                  );
                },
              };
            throw TypeError(
              e ? "Object is not iterable." : "Symbol.iterator is not defined.",
            );
          },
        iz =
          (globalThis && globalThis.__read) ||
          function (t, e) {
            var n = "function" == typeof Symbol && t[Symbol.iterator];
            if (!n) return t;
            var r,
              i,
              o = n.call(t),
              s = [];
            try {
              for (; (void 0 === e || e-- > 0) && !(r = o.next()).done; )
                s.push(r.value);
            } catch (t) {
              i = { error: t };
            } finally {
              try {
                r && !r.done && (n = o.return) && n.call(o);
              } finally {
                if (i) throw i.error;
              }
            }
            return s;
          },
        iY =
          (globalThis && globalThis.__spreadArray) ||
          function (t, e, n) {
            if (n || 2 == arguments.length)
              for (var r, i = 0, o = e.length; i < o; i++)
                (!r && i in e) ||
                  (r || (r = Array.prototype.slice.call(e, 0, i)),
                  (r[i] = e[i]));
            return t.concat(r || Array.prototype.slice.call(e));
          },
        iW = (function () {
          function t(t, e, n, r, i, o, s, a, u, c) {
            void 0 === s && (s = []),
              (this.attributes = {}),
              (this.links = []),
              (this.events = []),
              (this._droppedAttributesCount = 0),
              (this._droppedEventsCount = 0),
              (this._droppedLinksCount = 0),
              (this.status = { code: nA.UNSET }),
              (this.endTime = [0, 0]),
              (this._ended = !1),
              (this._duration = [-1, -1]),
              (this.name = n),
              (this._spanContext = r),
              (this.parentSpanId = o),
              (this.kind = i),
              (this.links = s);
            var l = Date.now();
            (this._performanceStartTime = r7.now()),
              (this._performanceOffset =
                l - (this._performanceStartTime + ir())),
              (this._startTimeProvided = null != a),
              (this.startTime = this._getTime(null != a ? a : l)),
              (this.resource = t.resource),
              (this.instrumentationLibrary = t.instrumentationLibrary),
              (this._spanLimits = t.getSpanLimits()),
              (this._attributeValueLengthLimit =
                this._spanLimits.attributeValueLengthLimit || 0),
              null != c && this.setAttributes(c),
              (this._spanProcessor = t.getActiveSpanProcessor()),
              this._spanProcessor.onStart(this, e);
          }
          return (
            (t.prototype.spanContext = function () {
              return this._spanContext;
            }),
            (t.prototype.setAttribute = function (t, e) {
              return (
                null == e ||
                  this._isSpanEnded() ||
                  (0 === t.length
                    ? rv.warn("Invalid attribute key: " + t)
                    : rJ(e)
                      ? Object.keys(this.attributes).length >=
                          this._spanLimits.attributeCountLimit &&
                        !Object.prototype.hasOwnProperty.call(
                          this.attributes,
                          t,
                        )
                        ? this._droppedAttributesCount++
                        : (this.attributes[t] = this._truncateToSize(e))
                      : rv.warn("Invalid attribute value set for key: " + t)),
                this
              );
            }),
            (t.prototype.setAttributes = function (t) {
              var e, n;
              try {
                for (
                  var r = iH(Object.entries(t)), i = r.next();
                  !i.done;
                  i = r.next()
                ) {
                  var o = iz(i.value, 2),
                    s = o[0],
                    a = o[1];
                  this.setAttribute(s, a);
                }
              } catch (t) {
                e = { error: t };
              } finally {
                try {
                  i && !i.done && (n = r.return) && n.call(r);
                } finally {
                  if (e) throw e.error;
                }
              }
              return this;
            }),
            (t.prototype.addEvent = function (t, e, n) {
              if (this._isSpanEnded()) return this;
              if (0 === this._spanLimits.eventCountLimit)
                return (
                  rv.warn("No events allowed."),
                  this._droppedEventsCount++,
                  this
                );
              this.events.length >= this._spanLimits.eventCountLimit &&
                (0 === this._droppedEventsCount &&
                  rv.debug("Dropping extra events."),
                this.events.shift(),
                this._droppedEventsCount++),
                io(e) && (io(n) || (n = e), (e = void 0));
              var r = rq(e);
              return (
                this.events.push({
                  name: t,
                  attributes: r,
                  time: this._getTime(n),
                  droppedAttributesCount: 0,
                }),
                this
              );
            }),
            (t.prototype.addLink = function (t) {
              return this.links.push(t), this;
            }),
            (t.prototype.addLinks = function (t) {
              var e;
              return (e = this.links).push.apply(e, iY([], iz(t), !1)), this;
            }),
            (t.prototype.setStatus = function (t) {
              return (
                this._isSpanEnded() ||
                  ((this.status = iX({}, t)),
                  null != this.status.message &&
                    "string" != typeof t.message &&
                    (rv.warn(
                      "Dropping invalid status.message of type '" +
                        typeof t.message +
                        "', expected 'string'",
                    ),
                    delete this.status.message)),
                this
              );
            }),
            (t.prototype.updateName = function (t) {
              return this._isSpanEnded() || (this.name = t), this;
            }),
            (t.prototype.end = function (t) {
              var e, n, r, i;
              if (this._isSpanEnded())
                return void rv.error(
                  this.name +
                    " " +
                    this._spanContext.traceId +
                    "-" +
                    this._spanContext.spanId +
                    " - You can only call end() on a span once.",
                );
              (this._ended = !0),
                (this.endTime = this._getTime(t)),
                (this._duration =
                  ((e = this.startTime),
                  (r = (n = this.endTime)[0] - e[0]),
                  (i = n[1] - e[1]) < 0 && ((r -= 1), (i += 1e9)),
                  [r, i])),
                this._duration[0] < 0 &&
                  (rv.warn(
                    "Inconsistent start and end time, startTime > endTime. Setting span duration to 0ms.",
                    this.startTime,
                    this.endTime,
                  ),
                  (this.endTime = this.startTime.slice()),
                  (this._duration = [0, 0])),
                this._droppedEventsCount > 0 &&
                  rv.warn(
                    "Dropped " +
                      this._droppedEventsCount +
                      " events because eventCountLimit reached",
                  ),
                this._spanProcessor.onEnd(this);
            }),
            (t.prototype._getTime = function (t) {
              if ("number" == typeof t && t <= r7.now()) {
                var e;
                return (
                  (e = t + this._performanceOffset),
                  is(ie(ir()), ie("number" == typeof e ? e : r7.now()))
                );
              }
              if ("number" == typeof t) return ie(t);
              if (t instanceof Date) return ie(t.getTime());
              if (ii(t)) return t;
              if (this._startTimeProvided) return ie(Date.now());
              var n = r7.now() - this._performanceStartTime;
              return is(this.startTime, ie(n));
            }),
            (t.prototype.isRecording = function () {
              return !1 === this._ended;
            }),
            (t.prototype.recordException = function (t, e) {
              var n = {};
              "string" == typeof t
                ? (n[iV] = t)
                : t &&
                  (t.code
                    ? (n[iG] = t.code.toString())
                    : t.name && (n[iG] = t.name),
                  t.message && (n[iV] = t.message),
                  t.stack && (n["exception.stacktrace"] = t.stack)),
                n[iG] || n[iV]
                  ? this.addEvent("exception", n, e)
                  : rv.warn("Failed to record an exception " + t);
            }),
            Object.defineProperty(t.prototype, "duration", {
              get: function () {
                return this._duration;
              },
              enumerable: !1,
              configurable: !0,
            }),
            Object.defineProperty(t.prototype, "ended", {
              get: function () {
                return this._ended;
              },
              enumerable: !1,
              configurable: !0,
            }),
            Object.defineProperty(t.prototype, "droppedAttributesCount", {
              get: function () {
                return this._droppedAttributesCount;
              },
              enumerable: !1,
              configurable: !0,
            }),
            Object.defineProperty(t.prototype, "droppedEventsCount", {
              get: function () {
                return this._droppedEventsCount;
              },
              enumerable: !1,
              configurable: !0,
            }),
            Object.defineProperty(t.prototype, "droppedLinksCount", {
              get: function () {
                return this._droppedLinksCount;
              },
              enumerable: !1,
              configurable: !0,
            }),
            (t.prototype._isSpanEnded = function () {
              return (
                this._ended &&
                  rv.warn(
                    "Can not execute the operation on ended Span {traceId: " +
                      this._spanContext.traceId +
                      ", spanId: " +
                      this._spanContext.spanId +
                      "}",
                  ),
                this._ended
              );
            }),
            (t.prototype._truncateToLimitUtil = function (t, e) {
              return t.length <= e ? t : t.substring(0, e);
            }),
            (t.prototype._truncateToSize = function (t) {
              var e = this,
                n = this._attributeValueLengthLimit;
              return n <= 0
                ? (rv.warn("Attribute value limit must be positive, got " + n),
                  t)
                : "string" == typeof t
                  ? this._truncateToLimitUtil(t, n)
                  : Array.isArray(t)
                    ? t.map(function (t) {
                        return "string" == typeof t
                          ? e._truncateToLimitUtil(t, n)
                          : t;
                      })
                    : t;
            }),
            t
          );
        })();
      !(function (t) {
        (t[(t.NOT_RECORD = 0)] = "NOT_RECORD"),
          (t[(t.RECORD = 1)] = "RECORD"),
          (t[(t.RECORD_AND_SAMPLED = 2)] = "RECORD_AND_SAMPLED");
      })(nx || (nx = {}));
      var iK = (function () {
          function t() {}
          return (
            (t.prototype.shouldSample = function () {
              return { decision: nx.NOT_RECORD };
            }),
            (t.prototype.toString = function () {
              return "AlwaysOffSampler";
            }),
            t
          );
        })(),
        iq = (function () {
          function t() {}
          return (
            (t.prototype.shouldSample = function () {
              return { decision: nx.RECORD_AND_SAMPLED };
            }),
            (t.prototype.toString = function () {
              return "AlwaysOnSampler";
            }),
            t
          );
        })(),
        iJ = (function () {
          function t(t) {
            var e, n, r, i;
            (this._root = t.root),
              this._root ||
                (r0(
                  Error(
                    "ParentBasedSampler must have a root sampler configured",
                  ),
                ),
                (this._root = new iq())),
              (this._remoteParentSampled =
                null != (e = t.remoteParentSampled) ? e : new iq()),
              (this._remoteParentNotSampled =
                null != (n = t.remoteParentNotSampled) ? n : new iK()),
              (this._localParentSampled =
                null != (r = t.localParentSampled) ? r : new iq()),
              (this._localParentNotSampled =
                null != (i = t.localParentNotSampled) ? i : new iK());
          }
          return (
            (t.prototype.shouldSample = function (t, e, n, r, i, o) {
              var s = ry.getSpanContext(t);
              return s && rc(s)
                ? s.isRemote
                  ? s.traceFlags & nR.SAMPLED
                    ? this._remoteParentSampled.shouldSample(t, e, n, r, i, o)
                    : this._remoteParentNotSampled.shouldSample(
                        t,
                        e,
                        n,
                        r,
                        i,
                        o,
                      )
                  : s.traceFlags & nR.SAMPLED
                    ? this._localParentSampled.shouldSample(t, e, n, r, i, o)
                    : this._localParentNotSampled.shouldSample(t, e, n, r, i, o)
                : this._root.shouldSample(t, e, n, r, i, o);
            }),
            (t.prototype.toString = function () {
              return (
                "ParentBased{root=" +
                this._root.toString() +
                ", remoteParentSampled=" +
                this._remoteParentSampled.toString() +
                ", remoteParentNotSampled=" +
                this._remoteParentNotSampled.toString() +
                ", localParentSampled=" +
                this._localParentSampled.toString() +
                ", localParentNotSampled=" +
                this._localParentNotSampled.toString() +
                "}"
              );
            }),
            t
          );
        })(),
        iZ = (function () {
          function t(t) {
            void 0 === t && (t = 0),
              (this._ratio = t),
              (this._ratio = this._normalize(t)),
              (this._upperBound = Math.floor(0xffffffff * this._ratio));
          }
          return (
            (t.prototype.shouldSample = function (t, e) {
              return {
                decision:
                  ru(e) && this._accumulate(e) < this._upperBound
                    ? nx.RECORD_AND_SAMPLED
                    : nx.NOT_RECORD,
              };
            }),
            (t.prototype.toString = function () {
              return "TraceIdRatioBased{" + this._ratio + "}";
            }),
            (t.prototype._normalize = function (t) {
              return "number" != typeof t || isNaN(t)
                ? 0
                : t >= 1
                  ? 1
                  : t <= 0
                    ? 0
                    : t;
            }),
            (t.prototype._accumulate = function (t) {
              for (var e = 0, n = 0; n < t.length / 8; n++) {
                var r = 8 * n;
                e = (e ^ parseInt(t.slice(r, r + 8), 16)) >>> 0;
              }
              return e;
            }),
            t
          );
        })(),
        iQ = nI.AlwaysOn;
      function i0() {
        var t = r6();
        return {
          sampler: i1(t),
          forceFlushTimeoutMillis: 3e4,
          generalLimits: {
            attributeValueLengthLimit: t.OTEL_ATTRIBUTE_VALUE_LENGTH_LIMIT,
            attributeCountLimit: t.OTEL_ATTRIBUTE_COUNT_LIMIT,
          },
          spanLimits: {
            attributeValueLengthLimit: t.OTEL_SPAN_ATTRIBUTE_VALUE_LENGTH_LIMIT,
            attributeCountLimit: t.OTEL_SPAN_ATTRIBUTE_COUNT_LIMIT,
            linkCountLimit: t.OTEL_SPAN_LINK_COUNT_LIMIT,
            eventCountLimit: t.OTEL_SPAN_EVENT_COUNT_LIMIT,
            attributePerEventCountLimit:
              t.OTEL_SPAN_ATTRIBUTE_PER_EVENT_COUNT_LIMIT,
            attributePerLinkCountLimit:
              t.OTEL_SPAN_ATTRIBUTE_PER_LINK_COUNT_LIMIT,
          },
          mergeResourceWithDefaults: !0,
        };
      }
      function i1(t) {
        switch ((void 0 === t && (t = r6()), t.OTEL_TRACES_SAMPLER)) {
          case nI.AlwaysOn:
            return new iq();
          case nI.AlwaysOff:
            return new iK();
          case nI.ParentBasedAlwaysOn:
            return new iJ({ root: new iq() });
          case nI.ParentBasedAlwaysOff:
            return new iJ({ root: new iK() });
          case nI.TraceIdRatio:
            return new iZ(i2(t));
          case nI.ParentBasedTraceIdRatio:
            return new iJ({ root: new iZ(i2(t)) });
          default:
            return (
              rv.error(
                'OTEL_TRACES_SAMPLER value "' +
                  t.OTEL_TRACES_SAMPLER +
                  " invalid, defaulting to " +
                  iQ +
                  '".',
              ),
              new iq()
            );
        }
      }
      function i2(t) {
        if (
          void 0 === t.OTEL_TRACES_SAMPLER_ARG ||
          "" === t.OTEL_TRACES_SAMPLER_ARG
        )
          return (
            rv.error("OTEL_TRACES_SAMPLER_ARG is blank, defaulting to 1."), 1
          );
        var e = Number(t.OTEL_TRACES_SAMPLER_ARG);
        return isNaN(e)
          ? (rv.error(
              "OTEL_TRACES_SAMPLER_ARG=" +
                t.OTEL_TRACES_SAMPLER_ARG +
                " was given, but it is invalid, defaulting to 1.",
            ),
            1)
          : e < 0 || e > 1
            ? (rv.error(
                "OTEL_TRACES_SAMPLER_ARG=" +
                  t.OTEL_TRACES_SAMPLER_ARG +
                  " was given, but it is out of range ([0..1]), defaulting to 1.",
              ),
              1)
            : e;
      }
      var i4 = (function () {
          function t(t, e) {
            (this._exporter = t),
              (this._isExporting = !1),
              (this._finishedSpans = []),
              (this._droppedSpansCount = 0);
            var n = r6();
            (this._maxExportBatchSize =
              "number" == typeof (null == e ? void 0 : e.maxExportBatchSize)
                ? e.maxExportBatchSize
                : n.OTEL_BSP_MAX_EXPORT_BATCH_SIZE),
              (this._maxQueueSize =
                "number" == typeof (null == e ? void 0 : e.maxQueueSize)
                  ? e.maxQueueSize
                  : n.OTEL_BSP_MAX_QUEUE_SIZE),
              (this._scheduledDelayMillis =
                "number" == typeof (null == e ? void 0 : e.scheduledDelayMillis)
                  ? e.scheduledDelayMillis
                  : n.OTEL_BSP_SCHEDULE_DELAY),
              (this._exportTimeoutMillis =
                "number" == typeof (null == e ? void 0 : e.exportTimeoutMillis)
                  ? e.exportTimeoutMillis
                  : n.OTEL_BSP_EXPORT_TIMEOUT),
              (this._shutdownOnce = new iD(this._shutdown, this)),
              this._maxExportBatchSize > this._maxQueueSize &&
                (rv.warn(
                  "BatchSpanProcessor: maxExportBatchSize must be smaller or equal to maxQueueSize, setting maxExportBatchSize to match maxQueueSize",
                ),
                (this._maxExportBatchSize = this._maxQueueSize));
          }
          return (
            (t.prototype.forceFlush = function () {
              return this._shutdownOnce.isCalled
                ? this._shutdownOnce.promise
                : this._flushAll();
            }),
            (t.prototype.onStart = function (t, e) {}),
            (t.prototype.onEnd = function (t) {
              this._shutdownOnce.isCalled ||
                ((t.spanContext().traceFlags & nR.SAMPLED) != 0 &&
                  this._addToBuffer(t));
            }),
            (t.prototype.shutdown = function () {
              return this._shutdownOnce.call();
            }),
            (t.prototype._shutdown = function () {
              var t = this;
              return Promise.resolve()
                .then(function () {
                  return t.onShutdown();
                })
                .then(function () {
                  return t._flushAll();
                })
                .then(function () {
                  return t._exporter.shutdown();
                });
            }),
            (t.prototype._addToBuffer = function (t) {
              if (this._finishedSpans.length >= this._maxQueueSize) {
                0 === this._droppedSpansCount &&
                  rv.debug("maxQueueSize reached, dropping spans"),
                  this._droppedSpansCount++;
                return;
              }
              this._droppedSpansCount > 0 &&
                (rv.warn(
                  "Dropped " +
                    this._droppedSpansCount +
                    " spans because maxQueueSize reached",
                ),
                (this._droppedSpansCount = 0)),
                this._finishedSpans.push(t),
                this._maybeStartTimer();
            }),
            (t.prototype._flushAll = function () {
              var t = this;
              return new Promise(function (e, n) {
                for (
                  var r = [],
                    i = Math.ceil(
                      t._finishedSpans.length / t._maxExportBatchSize,
                    ),
                    o = 0;
                  o < i;
                  o++
                )
                  r.push(t._flushOneBatch());
                Promise.all(r)
                  .then(function () {
                    e();
                  })
                  .catch(n);
              });
            }),
            (t.prototype._flushOneBatch = function () {
              var t = this;
              return (this._clearTimer(), 0 === this._finishedSpans.length)
                ? Promise.resolve()
                : new Promise(function (e, n) {
                    var r = setTimeout(function () {
                      n(Error("Timeout"));
                    }, t._exportTimeoutMillis);
                    n3.with(rV(n3.active()), function () {
                      t._finishedSpans.length <= t._maxExportBatchSize
                        ? ((i = t._finishedSpans), (t._finishedSpans = []))
                        : (i = t._finishedSpans.splice(
                            0,
                            t._maxExportBatchSize,
                          ));
                      for (
                        var i,
                          o = function () {
                            return t._exporter.export(i, function (t) {
                              var i;
                              clearTimeout(r),
                                t.code === nw.SUCCESS
                                  ? e()
                                  : n(
                                      null != (i = t.error)
                                        ? i
                                        : Error(
                                            "BatchSpanProcessor: span export failed",
                                          ),
                                    );
                            });
                          },
                          s = null,
                          a = 0,
                          u = i.length;
                        a < u;
                        a++
                      ) {
                        var c = i[a];
                        c.resource.asyncAttributesPending &&
                          c.resource.waitForAsyncAttributes &&
                          (null != s || (s = []),
                          s.push(c.resource.waitForAsyncAttributes()));
                      }
                      null === s
                        ? o()
                        : Promise.all(s).then(o, function (t) {
                            r0(t), n(t);
                          });
                    });
                  });
            }),
            (t.prototype._maybeStartTimer = function () {
              var t = this;
              if (!this._isExporting) {
                var e = function () {
                  (t._isExporting = !0),
                    t
                      ._flushOneBatch()
                      .finally(function () {
                        (t._isExporting = !1),
                          t._finishedSpans.length > 0 &&
                            (t._clearTimer(), t._maybeStartTimer());
                      })
                      .catch(function (e) {
                        (t._isExporting = !1), r0(e);
                      });
                };
                if (this._finishedSpans.length >= this._maxExportBatchSize)
                  return e();
                void 0 === this._timer &&
                  ((this._timer = setTimeout(function () {
                    return e();
                  }, this._scheduledDelayMillis)),
                  this._timer.unref());
              }
            }),
            (t.prototype._clearTimer = function () {
              void 0 !== this._timer &&
                (clearTimeout(this._timer), (this._timer = void 0));
            }),
            t
          );
        })(),
        i3 =
          (globalThis && globalThis.__extends) ||
          (function () {
            var t = function (e, n) {
              return (t =
                Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array &&
                  function (t, e) {
                    t.__proto__ = e;
                  }) ||
                function (t, e) {
                  for (var n in e)
                    Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
                })(e, n);
            };
            return function (e, n) {
              if ("function" != typeof n && null !== n)
                throw TypeError(
                  "Class extends value " +
                    String(n) +
                    " is not a constructor or null",
                );
              function r() {
                this.constructor = e;
              }
              t(e, n),
                (e.prototype =
                  null === n
                    ? Object.create(n)
                    : ((r.prototype = n.prototype), new r()));
            };
          })(),
        i5 = (function (t) {
          function e() {
            return (null !== t && t.apply(this, arguments)) || this;
          }
          return i3(e, t), (e.prototype.onShutdown = function () {}), e;
        })(i4),
        i9 = function () {
          (this.generateTraceId = i6(16)), (this.generateSpanId = i6(8));
        },
        i8 = rU.allocUnsafe(16);
      function i6(t) {
        return function () {
          for (var e = 0; e < t / 4; e++)
            i8.writeUInt32BE((0x100000000 * Math.random()) >>> 0, 4 * e);
          for (var e = 0; e < t; e++)
            if (i8[e] > 0) break;
            else e === t - 1 && (i8[t - 1] = 1);
          return i8.toString("hex", 0, t);
        };
      }
      var i7 = (function () {
          function t(t, e, n) {
            this._tracerProvider = n;
            var r,
              i,
              o,
              s =
                ((r = { sampler: i1() }),
                ((o = Object.assign({}, (i = i0()), r, e)).generalLimits =
                  Object.assign({}, i.generalLimits, e.generalLimits || {})),
                (o.spanLimits = Object.assign(
                  {},
                  i.spanLimits,
                  e.spanLimits || {},
                )),
                o);
            (this._sampler = s.sampler),
              (this._generalLimits = s.generalLimits),
              (this._spanLimits = s.spanLimits),
              (this._idGenerator = e.idGenerator || new i9()),
              (this.resource = n.resource),
              (this.instrumentationLibrary = t);
          }
          return (
            (t.prototype.startSpan = function (t, e, n) {
              void 0 === e && (e = {}),
                void 0 === n && (n = n3.active()),
                e.root && (n = ry.deleteSpan(n));
              var r,
                i,
                o,
                s,
                a,
                u,
                c = ry.getSpan(n);
              if (rX(n)) {
                rv.debug("Instrumentation suppressed, returning Noop Span");
                var l = ry.wrapSpanContext(n8);
                return l;
              }
              var p = null == c ? void 0 : c.spanContext(),
                f = this._idGenerator.generateSpanId();
              p && ry.isSpanContextValid(p)
                ? ((s = p.traceId), (a = p.traceState), (u = p.spanId))
                : (s = this._idGenerator.generateTraceId());
              var d = null != (r = e.kind) ? r : nL.INTERNAL,
                h = (null != (i = e.links) ? i : []).map(function (t) {
                  return { context: t.context, attributes: rq(t.attributes) };
                }),
                _ = rq(e.attributes),
                g = this._sampler.shouldSample(n, s, t, d, _, h);
              a = null != (o = g.traceState) ? o : a;
              var m = {
                traceId: s,
                spanId: f,
                traceFlags:
                  g.decision === nP.RECORD_AND_SAMPLED ? nR.SAMPLED : nR.NONE,
                traceState: a,
              };
              if (g.decision === nP.NOT_RECORD) {
                rv.debug(
                  "Recording is off, propagating context in a non-recording span",
                );
                var l = ry.wrapSpanContext(m);
                return l;
              }
              var y = rq(Object.assign(_, g.attributes));
              return new iW(this, n, t, m, d, u, h, e.startTime, void 0, y);
            }),
            (t.prototype.startActiveSpan = function (t, e, n, r) {
              if (!(arguments.length < 2)) {
                2 == arguments.length
                  ? (s = e)
                  : 3 == arguments.length
                    ? ((i = e), (s = n))
                    : ((i = e), (o = n), (s = r));
                var i,
                  o,
                  s,
                  a = null != o ? o : n3.active(),
                  u = this.startSpan(t, i, a),
                  c = ry.setSpan(a, u);
                return n3.with(c, s, void 0, u);
              }
            }),
            (t.prototype.getGeneralLimits = function () {
              return this._generalLimits;
            }),
            (t.prototype.getSpanLimits = function () {
              return this._spanLimits;
            }),
            (t.prototype.getActiveSpanProcessor = function () {
              return this._tracerProvider.getActiveSpanProcessor();
            }),
            t
          );
        })(),
        ot =
          (globalThis && globalThis.__values) ||
          function (t) {
            var e = "function" == typeof Symbol && Symbol.iterator,
              n = e && t[e],
              r = 0;
            if (n) return n.call(t);
            if (t && "number" == typeof t.length)
              return {
                next: function () {
                  return (
                    t && r >= t.length && (t = void 0),
                    { value: t && t[r++], done: !t }
                  );
                },
              };
            throw TypeError(
              e ? "Object is not iterable." : "Symbol.iterator is not defined.",
            );
          },
        oe = (function () {
          function t(t) {
            this._spanProcessors = t;
          }
          return (
            (t.prototype.forceFlush = function () {
              var t,
                e,
                n = [];
              try {
                for (
                  var r = ot(this._spanProcessors), i = r.next();
                  !i.done;
                  i = r.next()
                ) {
                  var o = i.value;
                  n.push(o.forceFlush());
                }
              } catch (e) {
                t = { error: e };
              } finally {
                try {
                  i && !i.done && (e = r.return) && e.call(r);
                } finally {
                  if (t) throw t.error;
                }
              }
              return new Promise(function (t) {
                Promise.all(n)
                  .then(function () {
                    t();
                  })
                  .catch(function (e) {
                    r0(e || Error("MultiSpanProcessor: forceFlush failed")),
                      t();
                  });
              });
            }),
            (t.prototype.onStart = function (t, e) {
              var n, r;
              try {
                for (
                  var i = ot(this._spanProcessors), o = i.next();
                  !o.done;
                  o = i.next()
                )
                  o.value.onStart(t, e);
              } catch (t) {
                n = { error: t };
              } finally {
                try {
                  o && !o.done && (r = i.return) && r.call(i);
                } finally {
                  if (n) throw n.error;
                }
              }
            }),
            (t.prototype.onEnd = function (t) {
              var e, n;
              try {
                for (
                  var r = ot(this._spanProcessors), i = r.next();
                  !i.done;
                  i = r.next()
                )
                  i.value.onEnd(t);
              } catch (t) {
                e = { error: t };
              } finally {
                try {
                  i && !i.done && (n = r.return) && n.call(r);
                } finally {
                  if (e) throw e.error;
                }
              }
            }),
            (t.prototype.shutdown = function () {
              var t,
                e,
                n = [];
              try {
                for (
                  var r = ot(this._spanProcessors), i = r.next();
                  !i.done;
                  i = r.next()
                ) {
                  var o = i.value;
                  n.push(o.shutdown());
                }
              } catch (e) {
                t = { error: e };
              } finally {
                try {
                  i && !i.done && (e = r.return) && e.call(r);
                } finally {
                  if (t) throw t.error;
                }
              }
              return new Promise(function (t, e) {
                Promise.all(n).then(function () {
                  t();
                }, e);
              });
            }),
            t
          );
        })(),
        on = (function () {
          function t() {}
          return (
            (t.prototype.onStart = function (t, e) {}),
            (t.prototype.onEnd = function (t) {}),
            (t.prototype.shutdown = function () {
              return Promise.resolve();
            }),
            (t.prototype.forceFlush = function () {
              return Promise.resolve();
            }),
            t
          );
        })(),
        or =
          (globalThis && globalThis.__read) ||
          function (t, e) {
            var n = "function" == typeof Symbol && t[Symbol.iterator];
            if (!n) return t;
            var r,
              i,
              o = n.call(t),
              s = [];
            try {
              for (; (void 0 === e || e-- > 0) && !(r = o.next()).done; )
                s.push(r.value);
            } catch (t) {
              i = { error: t };
            } finally {
              try {
                r && !r.done && (n = o.return) && n.call(o);
              } finally {
                if (i) throw i.error;
              }
            }
            return s;
          },
        oi =
          (globalThis && globalThis.__spreadArray) ||
          function (t, e, n) {
            if (n || 2 == arguments.length)
              for (var r, i = 0, o = e.length; i < o; i++)
                (!r && i in e) ||
                  (r || (r = Array.prototype.slice.call(e, 0, i)),
                  (r[i] = e[i]));
            return t.concat(r || Array.prototype.slice.call(e));
          };
      !(function (t) {
        (t[(t.resolved = 0)] = "resolved"),
          (t[(t.timeout = 1)] = "timeout"),
          (t[(t.error = 2)] = "error"),
          (t[(t.unresolved = 3)] = "unresolved");
      })(nN || (nN = {}));
      var oo = (function () {
        function t(t) {
          void 0 === t && (t = {}),
            (this._registeredSpanProcessors = []),
            (this._tracers = new Map());
          var e,
            n,
            r,
            i,
            o,
            s,
            a,
            u,
            c,
            l,
            p,
            f,
            d,
            h,
            _,
            g,
            m,
            y = (function () {
              for (var t = [], e = 0; e < arguments.length; e++)
                t[e] = arguments[e];
              for (var n = t.shift(), r = new WeakMap(); t.length > 0; )
                n = (function t(e, n, r, i) {
                  if ((void 0 === r && (r = 0), !(r > 20))) {
                    if ((r++, ix(e) || ix(n) || iC(n))) a = iP(n);
                    else if (iI(e)) {
                      if (((a = e.slice()), iI(n)))
                        for (var o, s, a, u = 0, c = n.length; u < c; u++)
                          a.push(iP(n[u]));
                      else if (iw(n))
                        for (
                          var l = Object.keys(n), u = 0, c = l.length;
                          u < c;
                          u++
                        ) {
                          var p = l[u];
                          a[p] = iP(n[p]);
                        }
                    } else if (iw(e))
                      if (iw(n)) {
                        if (((o = e), (s = n), !(iL(o) && iL(s)))) return n;
                        a = Object.assign({}, e);
                        for (
                          var l = Object.keys(n), u = 0, c = l.length;
                          u < c;
                          u++
                        ) {
                          var p = l[u],
                            f = n[p];
                          if (ix(f)) void 0 === f ? delete a[p] : (a[p] = f);
                          else {
                            var d = a[p];
                            if (iA(e, p, i) || iA(n, p, i)) delete a[p];
                            else {
                              if (iw(d) && iw(f)) {
                                var h = i.get(d) || [],
                                  _ = i.get(f) || [];
                                h.push({ obj: e, key: p }),
                                  _.push({ obj: n, key: p }),
                                  i.set(d, h),
                                  i.set(f, _);
                              }
                              a[p] = t(a[p], f, r, i);
                            }
                          }
                        }
                      } else a = n;
                    return a;
                  }
                })(n, t.shift(), 0, r);
              return n;
            })(
              {},
              i0(),
              ((h = Object.assign({}, (e = t).spanLimits)),
              (_ = r8(process.env)),
              (h.attributeCountLimit =
                null !=
                (a =
                  null !=
                  (s =
                    null !=
                    (o =
                      null !=
                      (r =
                        null == (n = e.spanLimits)
                          ? void 0
                          : n.attributeCountLimit)
                        ? r
                        : null == (i = e.generalLimits)
                          ? void 0
                          : i.attributeCountLimit)
                      ? o
                      : _.OTEL_SPAN_ATTRIBUTE_COUNT_LIMIT)
                    ? s
                    : _.OTEL_ATTRIBUTE_COUNT_LIMIT)
                  ? a
                  : 128),
              (h.attributeValueLengthLimit =
                null !=
                (d =
                  null !=
                  (f =
                    null !=
                    (p =
                      null !=
                      (c =
                        null == (u = e.spanLimits)
                          ? void 0
                          : u.attributeValueLengthLimit)
                        ? c
                        : null == (l = e.generalLimits)
                          ? void 0
                          : l.attributeValueLengthLimit)
                      ? p
                      : _.OTEL_SPAN_ATTRIBUTE_VALUE_LENGTH_LIMIT)
                    ? f
                    : _.OTEL_ATTRIBUTE_VALUE_LENGTH_LIMIT)
                  ? d
                  : r3),
              Object.assign({}, e, { spanLimits: h })),
            );
          if (
            ((this.resource = null != (g = y.resource) ? g : iF.empty()),
            y.mergeResourceWithDefaults &&
              (this.resource = iF.default().merge(this.resource)),
            (this._config = Object.assign({}, y, { resource: this.resource })),
            null == (m = t.spanProcessors) ? void 0 : m.length)
          )
            (this._registeredSpanProcessors = oi([], or(t.spanProcessors), !1)),
              (this.activeSpanProcessor = new oe(
                this._registeredSpanProcessors,
              ));
          else {
            var v = this._buildExporterFromEnv();
            if (void 0 !== v) {
              var E = new i5(v);
              this.activeSpanProcessor = E;
            } else this.activeSpanProcessor = new on();
          }
        }
        return (
          (t.prototype.getTracer = function (t, e, n) {
            var r =
              t +
              "@" +
              (e || "") +
              ":" +
              ((null == n ? void 0 : n.schemaUrl) || "");
            return (
              this._tracers.has(r) ||
                this._tracers.set(
                  r,
                  new i7(
                    {
                      name: t,
                      version: e,
                      schemaUrl: null == n ? void 0 : n.schemaUrl,
                    },
                    this._config,
                    this,
                  ),
                ),
              this._tracers.get(r)
            );
          }),
          (t.prototype.addSpanProcessor = function (t) {
            0 === this._registeredSpanProcessors.length &&
              this.activeSpanProcessor.shutdown().catch(function (t) {
                return rv.error(
                  "Error while trying to shutdown current span processor",
                  t,
                );
              }),
              this._registeredSpanProcessors.push(t),
              (this.activeSpanProcessor = new oe(
                this._registeredSpanProcessors,
              ));
          }),
          (t.prototype.getActiveSpanProcessor = function () {
            return this.activeSpanProcessor;
          }),
          (t.prototype.register = function (t) {
            void 0 === t && (t = {}),
              ry.setGlobalTracerProvider(this),
              void 0 === t.propagator &&
                (t.propagator = this._buildPropagatorFromEnv()),
              t.contextManager && n3.setGlobalContextManager(t.contextManager),
              t.propagator && rD.setGlobalPropagator(t.propagator);
          }),
          (t.prototype.forceFlush = function () {
            var t = this._config.forceFlushTimeoutMillis,
              e = this._registeredSpanProcessors.map(function (e) {
                return new Promise(function (n) {
                  var r,
                    i = setTimeout(function () {
                      n(
                        Error(
                          "Span processor did not completed within timeout period of " +
                            t +
                            " ms",
                        ),
                      ),
                        (r = nN.timeout);
                    }, t);
                  e.forceFlush()
                    .then(function () {
                      clearTimeout(i), r !== nN.timeout && n((r = nN.resolved));
                    })
                    .catch(function (t) {
                      clearTimeout(i), (r = nN.error), n(t);
                    });
                });
              });
            return new Promise(function (t, n) {
              Promise.all(e)
                .then(function (e) {
                  var r = e.filter(function (t) {
                    return t !== nN.resolved;
                  });
                  r.length > 0 ? n(r) : t();
                })
                .catch(function (t) {
                  return n([t]);
                });
            });
          }),
          (t.prototype.shutdown = function () {
            return this.activeSpanProcessor.shutdown();
          }),
          (t.prototype._getPropagator = function (t) {
            var e;
            return null == (e = this.constructor._registeredPropagators.get(t))
              ? void 0
              : e();
          }),
          (t.prototype._getSpanExporter = function (t) {
            var e;
            return null == (e = this.constructor._registeredExporters.get(t))
              ? void 0
              : e();
          }),
          (t.prototype._buildPropagatorFromEnv = function () {
            var t = this,
              e = Array.from(new Set(r6().OTEL_PROPAGATORS)),
              n = e
                .map(function (e) {
                  var n = t._getPropagator(e);
                  return (
                    n ||
                      rv.warn(
                        'Propagator "' +
                          e +
                          '" requested through environment variable is unavailable.',
                      ),
                    n
                  );
                })
                .reduce(function (t, e) {
                  return e && t.push(e), t;
                }, []);
            return 0 === n.length
              ? void 0
              : 1 === e.length
                ? n[0]
                : new iu({ propagators: n });
          }),
          (t.prototype._buildExporterFromEnv = function () {
            var t = r6().OTEL_TRACES_EXPORTER;
            if ("none" !== t && "" !== t) {
              var e = this._getSpanExporter(t);
              return (
                e ||
                  rv.error(
                    'Exporter "' +
                      t +
                      '" requested through environment variable is unavailable.',
                  ),
                e
              );
            }
          }),
          (t._registeredPropagators = new Map([
            [
              "tracecontext",
              function () {
                return new iy();
              },
            ],
            [
              "baggage",
              function () {
                return new rY();
              },
            ],
          ])),
          (t._registeredExporters = new Map()),
          t
        );
      })();
      let os = "http.method",
        oa = "http.url",
        ou = "http.status_code",
        oc = "http.request.method",
        ol = "http.response.status_code",
        op = "url.full",
        of = "sentry.parentIsRemote";
      function od(t) {
        return "parentSpanId" in t
          ? t.parentSpanId
          : "parentSpanContext" in t
            ? t.parentSpanContext?.spanId
            : void 0;
      }
      function oh(t) {
        return !!t.attributes && "object" == typeof t.attributes;
      }
      let o_ = "sentry-trace",
        og = "baggage",
        om = "sentry.dsc",
        oy = "sentry.sampled_not_recording",
        ov = "sentry.url",
        oE = nE("sentry_scopes"),
        oS = nE("sentry_fork_isolation_scope"),
        oT = nE("sentry_fork_set_scope"),
        ob = nE("sentry_fork_set_isolation_scope"),
        oO = "_scopeContext";
      function oR(t) {
        return t.getValue(oE);
      }
      function oL(t, e) {
        return t.setValue(oE, e);
      }
      function oP(t) {
        let { traceFlags: e, traceState: n } = t,
          r = !!n && "1" === n.get(oy);
        if (e === nR.SAMPLED) return !0;
        if (r) return !1;
        let i = n ? n.get(om) : void 0,
          o = i ? tS(i) : void 0;
        return o?.sampled === "true" || (o?.sampled !== "false" && void 0);
      }
      function oA(t, e, n) {
        let r = e[oc] || e[os];
        if (r)
          return (function ({ name: t, kind: e, attributes: n }, r) {
            let i = ["http"];
            switch (e) {
              case nL.CLIENT:
                i.push("client");
                break;
              case nL.SERVER:
                i.push("server");
            }
            n["sentry.http.prefetch"] && i.push("prefetch");
            let {
              urlPath: o,
              url: s,
              query: a,
              fragment: u,
              hasRoute: c,
            } = (function (t, e) {
              let n = t["http.target"],
                r = t[oa] || t[op],
                i = t["http.route"],
                o = "string" == typeof r ? t8(r) : void 0,
                s = o ? t7(o) : void 0,
                a = o?.search || void 0,
                u = o?.hash || void 0;
              return "string" == typeof i
                ? { urlPath: i, url: s, query: a, fragment: u, hasRoute: !0 }
                : e === nL.SERVER && "string" == typeof n
                  ? {
                      urlPath: t6(n),
                      url: s,
                      query: a,
                      fragment: u,
                      hasRoute: !1,
                    }
                  : o
                    ? {
                        urlPath: s,
                        url: s,
                        query: a,
                        fragment: u,
                        hasRoute: !1,
                      }
                    : "string" == typeof n
                      ? {
                          urlPath: t6(n),
                          url: s,
                          query: a,
                          fragment: u,
                          hasRoute: !1,
                        }
                      : {
                          urlPath: void 0,
                          url: s,
                          query: a,
                          fragment: u,
                          hasRoute: !1,
                        };
            })(n, e);
            if (!o) return { ...oC(t, n), op: i.join(".") };
            let l = n["sentry.graphql.operation"],
              p = `${r} ${o}`,
              f = l
                ? `${p} (${(function (t) {
                    if (Array.isArray(t)) {
                      let e = t.slice().sort();
                      return e.length <= 5
                        ? e.join(", ")
                        : `${e.slice(0, 5).join(", ")}, +${e.length - 5}`;
                    }
                    return `${t}`;
                  })(l)})`
                : p,
              d = {};
            s && (d.url = s),
              a && (d["http.query"] = a),
              u && (d["http.fragment"] = u);
            let h = e === nL.CLIENT || e === nL.SERVER,
              _ = n[tc] || "manual",
              g = !`${_}`.startsWith("auto"),
              m = "custom" === n[ts],
              y = n[tl],
              { description: v, source: E } =
                m || null != y || (!h && g)
                  ? oC(t, n)
                  : {
                      description: f,
                      source: c || "/" === o ? "route" : "url",
                    };
            return { op: i.join("."), description: v, source: E, data: d };
          })({ attributes: e, name: t, kind: n }, r);
        let i = e["db.system"],
          o = "string" == typeof e[tu] && e[tu].startsWith("cache.");
        if (i && !o)
          return (function ({ attributes: t, name: e }) {
            let n = t[tl];
            if ("string" == typeof n)
              return { op: "db", description: n, source: t[ts] || "custom" };
            if ("custom" === t[ts])
              return { op: "db", description: e, source: "custom" };
            let r = t["db.statement"];
            return {
              op: "db",
              description: r ? r.toString() : e,
              source: "task",
            };
          })({ attributes: e, name: t });
        let s = "custom" === e[ts] ? "custom" : "route";
        if (e["rpc.service"]) return { ...oC(t, e, "route"), op: "rpc" };
        if (e["messaging.system"]) return { ...oC(t, e, s), op: "message" };
        let a = e["faas.trigger"];
        return a
          ? { ...oC(t, e, s), op: a.toString() }
          : { op: void 0, description: t, source: "custom" };
      }
      function oI(t) {
        let e = oh(t) ? t.attributes : {};
        return oA(
          t.name ? t.name : "<unknown>",
          e,
          "number" == typeof t.kind ? t.kind : nL.INTERNAL,
        );
      }
      function oC(t, e, n = "custom") {
        let r = e[ts] || n,
          i = e[tl];
        return i && "string" == typeof i
          ? { description: i, source: r }
          : { description: t, source: r };
      }
      function ow() {
        return ry.getActiveSpan();
      }
      function ox({ dsc: t, sampled: e }) {
        let n = t ? tT(t) : void 0,
          r = new ih(),
          i = n ? r.set(om, n) : r;
        return !1 === e ? i.set(oy, "1") : i;
      }
      let oN = new Set();
      function oM(t) {
        oN.add(t);
      }
      class ok extends rY {
        constructor() {
          super(),
            oM("SentryPropagator"),
            (this._urlMatchesTargetsMap = new eF(100));
        }
        inject(t, e, n) {
          if (rX(t)) return;
          let r = ry.getSpan(t);
          if (
            !(function (t, e, n) {
              if ("string" != typeof t || !e) return !0;
              let r = n?.get(t);
              if (void 0 !== r) return r;
              let i = A(t, e);
              return n?.set(t, i), i;
            })(
              r &&
                (function (t) {
                  let e = tx(t).data,
                    n = e[oa] || e[op];
                  if ("string" == typeof n) return n;
                  let r = t.spanContext().traceState?.get(ov);
                  if (r) return r;
                })(r),
              ti()?.getOptions()?.tracePropagationTargets,
              this._urlMatchesTargetsMap,
            )
          )
            return;
          let i = (function (t) {
              try {
                let e = t[og];
                return Array.isArray(e) ? e.join(",") : e;
              } catch {
                return;
              }
            })(e),
            o = rD.getBaggage(t) || rD.createBaggage({}),
            {
              dynamicSamplingContext: s,
              traceId: a,
              spanId: u,
              sampled: c,
            } = oD(t);
          if (i) {
            let t = tb(i);
            t &&
              Object.entries(t).forEach(([t, e]) => {
                o = o.setEntry(t, { value: e });
              });
          }
          s &&
            (o = Object.entries(s).reduce(
              (t, [e, n]) => (n ? t.setEntry(`${tv}${e}`, { value: n }) : t),
              o,
            )),
            a && a !== n9 && n.set(e, o_, tL(a, u, c)),
            super.inject(rD.setBaggage(t, o), e, n);
        }
        extract(t, e, n) {
          let r = n.get(e, o_),
            i = n.get(e, og);
          return oj(
            oU(t, {
              sentryTrace: r ? (Array.isArray(r) ? r[0] : r) : void 0,
              baggage: i,
            }),
          );
        }
        fields() {
          return [o_, og];
        }
      }
      function oD(t) {
        let e = ry.getSpan(t);
        if (e?.spanContext().isRemote) {
          let t = e.spanContext();
          return {
            dynamicSamplingContext: e_(e),
            traceId: t.traceId,
            spanId: void 0,
            sampled: oP(t),
          };
        }
        if (e) {
          let t = e.spanContext();
          return {
            dynamicSamplingContext: e_(e),
            traceId: t.traceId,
            spanId: t.spanId,
            sampled: oP(t),
          };
        }
        let n = oR(t)?.scope || tt(),
          r = ti(),
          i = n.getPropagationContext();
        return {
          dynamicSamplingContext: r ? eh(r, n) : void 0,
          traceId: i.traceId,
          spanId: i.propagationSpanId,
          sampled: i.sampled,
        };
      }
      function oU(t, { sentryTrace: e, baggage: n }) {
        let {
          traceId: r,
          parentSpanId: i,
          sampled: o,
          dsc: s,
        } = (function (t, e) {
          let n = (function (t) {
              let e;
              if (!t) return;
              let n = t.match(tR);
              if (n)
                return (
                  "1" === n[3] ? (e = !0) : "0" === n[3] && (e = !1),
                  { traceId: n[1], parentSampled: e, parentSpanId: n[2] }
                );
            })(t),
            r = tS(e);
          if (!n?.traceId) return { traceId: M(), sampleRand: Math.random() };
          let i = (function (t, e) {
            let n = ty(e?.sample_rand);
            if (void 0 !== n) return n;
            let r = ty(e?.sample_rate);
            return r && t?.parentSampled !== void 0
              ? t.parentSampled
                ? Math.random() * r
                : r + Math.random() * (1 - r)
              : Math.random();
          })(n, r);
          r && (r.sample_rand = i.toString());
          let { traceId: o, parentSpanId: s, parentSampled: a } = n;
          return {
            traceId: o,
            parentSpanId: s,
            sampled: a,
            dsc: r || {},
            sampleRand: i,
          };
        })(e, n);
        if (!i) return t;
        let a = (function ({ spanId: t, traceId: e, sampled: n, dsc: r }) {
          let i = ox({ dsc: r, sampled: n });
          return {
            traceId: e,
            spanId: t,
            isRemote: !0,
            traceFlags: n ? nR.SAMPLED : nR.NONE,
            traceState: i,
          };
        })({ traceId: r, spanId: i, sampled: o, dsc: s });
        return ry.setSpanContext(t, a);
      }
      function oj(t) {
        let e = oR(t);
        return oL(t, {
          scope: e ? e.scope : tt().clone(),
          isolationScope: e ? e.isolationScope : te(),
        });
      }
      function oB(t, e) {
        let n = oV(),
          { name: r, parentSpan: i } = t;
        return oY(i)(() => {
          let i = oH(t.scope, t.forceTransaction),
            o = t.onlyIfParent && !ry.getSpan(i) ? rV(i) : i,
            s = oX(t);
          return n.startActiveSpan(r, s, o, (t) =>
            eG(
              () => e(t),
              () => {
                void 0 === tx(t).status && t.setStatus({ code: nA.ERROR });
              },
              () => t.end(),
            ),
          );
        });
      }
      function o$(t, e) {
        let n = oV(),
          { name: r, parentSpan: i } = t;
        return oY(i)(() => {
          let i = oH(t.scope, t.forceTransaction),
            o = t.onlyIfParent && !ry.getSpan(i) ? rV(i) : i,
            s = oX(t);
          return n.startActiveSpan(r, s, o, (t) =>
            eG(
              () => e(t, () => t.end()),
              () => {
                void 0 === tx(t).status && t.setStatus({ code: nA.ERROR });
              },
            ),
          );
        });
      }
      function oF(t) {
        let e = oV(),
          { name: n, parentSpan: r } = t;
        return oY(r)(() => {
          let r = oH(t.scope, t.forceTransaction),
            i = t.onlyIfParent && !ry.getSpan(r) ? rV(r) : r,
            o = oX(t);
          return e.startSpan(n, o, i);
        });
      }
      function oG(t, e) {
        let n = t ? ry.setSpan(n3.active(), t) : ry.deleteSpan(n3.active());
        return n3.with(n, () => e(tt()));
      }
      function oV() {
        let t = ti();
        return t?.tracer || ry.getTracer("@sentry/opentelemetry", a);
      }
      function oX(t) {
        var e;
        let { startTime: n, attributes: r, kind: i, op: o, links: s } = t,
          a = "number" == typeof n ? ((e = n) < 0x2540be3ff ? 1e3 * e : e) : n;
        return {
          attributes: o ? { [tu]: o, ...r } : r,
          kind: i,
          links: s,
          startTime: a,
        };
      }
      function oH(t, e) {
        let n = (function (t) {
            if (t) {
              let e = t[oO];
              if (e) return e;
            }
            return n3.active();
          })(t),
          r = ry.getSpan(n);
        if (!r || !e) return n;
        let i = ry.deleteSpan(n),
          { spanId: o, traceId: s } = r.spanContext(),
          a = oP(r.spanContext()),
          u = ox({ dsc: e_(tj(r)), sampled: a }),
          c = {
            traceId: s,
            spanId: o,
            isRemote: !0,
            traceFlags: a ? nR.SAMPLED : nR.NONE,
            traceState: u,
          };
        return ry.setSpanContext(i, c);
      }
      function oz(t, e) {
        let n = oj(oU(n3.active(), t));
        return n3.with(n, e);
      }
      function oY(t) {
        return void 0 !== t ? (e) => oG(t, e) : (t) => t();
      }
      function oW(t) {
        let e = rV(n3.active());
        return n3.with(e, t);
      }
      function oK({ span: t } = {}) {
        let e = n3.active();
        if (t) {
          let { scope: n } = tm(t);
          e = (n && n[oO]) || ry.setSpan(n3.active(), t);
        }
        let {
          traceId: n,
          spanId: r,
          sampled: i,
          dynamicSamplingContext: o,
        } = oD(e);
        return { "sentry-trace": tL(n, r, i), baggage: tT(o) };
      }
      function oq(t) {
        return !0 === t.attributes[of] ? void 0 : od(t);
      }
      function oJ(t, e) {
        let n = t.get(e.id);
        return n?.span
          ? n
          : n && !n.span
            ? ((n.span = e.span), (n.parentNode = e.parentNode), n)
            : (t.set(e.id, e), e);
      }
      let oZ = {
          1: "cancelled",
          2: "unknown_error",
          3: "invalid_argument",
          4: "deadline_exceeded",
          5: "not_found",
          6: "already_exists",
          7: "permission_denied",
          8: "resource_exhausted",
          9: "failed_precondition",
          10: "aborted",
          11: "out_of_range",
          12: "unimplemented",
          13: "internal_error",
          14: "unavailable",
          15: "data_loss",
          16: "unauthenticated",
        },
        oQ = (t) => Object.values(oZ).includes(t);
      function o0(t) {
        let e = oh(t) ? t.attributes : {},
          n = t.status ? t.status : void 0;
        if (n) {
          if (n.code === nA.OK) return { code: 1 };
          else if (n.code === nA.ERROR) {
            if (void 0 === n.message) {
              let t = o1(e);
              if (t) return t;
            }
            return n.message && oQ(n.message)
              ? { code: 2, message: n.message }
              : { code: 2, message: "unknown_error" };
          }
        }
        let r = o1(e);
        return (
          r ||
          (n?.code === nA.UNSET
            ? { code: 1 }
            : { code: 2, message: "unknown_error" })
        );
      }
      function o1(t) {
        let e = t[ol] || t[ou],
          n = t["rpc.grpc.status_code"],
          r =
            "number" == typeof e
              ? e
              : "string" == typeof e
                ? parseInt(e)
                : void 0;
        return "number" == typeof r
          ? td(r)
          : "string" == typeof n
            ? { code: 2, message: oZ[n] || "unknown_error" }
            : void 0;
      }
      class o2 {
        constructor(t) {
          (this._finishedSpanBucketSize = t?.timeout || 300),
            (this._finishedSpanBuckets = Array(
              this._finishedSpanBucketSize,
            ).fill(void 0)),
            (this._lastCleanupTimestampInS = Math.floor(Date.now() / 1e3)),
            (this._spansToBucketEntry = new WeakMap()),
            (this._sentSpans = new Map());
        }
        isSpanAlreadySent(t) {
          let e = this._sentSpans.get(t);
          if (e)
            if (!(Date.now() >= e)) return !0;
            else this._sentSpans.delete(t);
          return !1;
        }
        flushSentSpanCache() {
          let t = Date.now();
          for (let [e, n] of this._sentSpans.entries())
            n <= t && this._sentSpans.delete(e);
        }
        nodeIsCompletedRootNode(t) {
          return (
            !!t.span &&
            (!t.parentNode || this.isSpanAlreadySent(t.parentNode.id))
          );
        }
        getCompletedRootNodes(t) {
          return t.filter((t) => this.nodeIsCompletedRootNode(t));
        }
        export(t) {
          let e = Math.floor(Date.now() / 1e3);
          if (this._lastCleanupTimestampInS !== e) {
            let t = 0;
            this._finishedSpanBuckets.forEach((n, r) => {
              n &&
                n.timestampInS <= e - this._finishedSpanBucketSize &&
                ((t += n.spans.size), (this._finishedSpanBuckets[r] = void 0));
            }),
              (this._lastCleanupTimestampInS = e);
          }
          let n = e % this._finishedSpanBucketSize,
            r = this._finishedSpanBuckets[n] || {
              timestampInS: e,
              spans: new Set(),
            };
          (this._finishedSpanBuckets[n] = r),
            r.spans.add(t),
            this._spansToBucketEntry.set(t, r);
          let i = oq(t);
          (!i || this.isSpanAlreadySent(i)) &&
            (this._clearTimeout(),
            (this._flushTimeout = setTimeout(() => {
              this.flush();
            }, 1)));
        }
        flush() {
          this._clearTimeout();
          let t = this._finishedSpanBuckets.flatMap((t) =>
            t ? Array.from(t.spans) : [],
          );
          this.flushSentSpanCache();
          let e = this._maybeSend(t),
            n = e.size;
          t.length;
          let r = Date.now() + 3e5;
          for (let t of e) {
            this._sentSpans.set(t.spanContext().spanId, r);
            let e = this._spansToBucketEntry.get(t);
            e && e.spans.delete(t);
          }
        }
        clear() {
          (this._finishedSpanBuckets = this._finishedSpanBuckets.fill(void 0)),
            this._clearTimeout();
        }
        _clearTimeout() {
          this._flushTimeout &&
            (clearTimeout(this._flushTimeout), (this._flushTimeout = void 0));
        }
        _maybeSend(t) {
          let e = (function (t) {
              let e = new Map();
              for (let n of t)
                !(function (t, e) {
                  let n = e.spanContext().spanId,
                    r = oq(e);
                  if (!r) return oJ(t, { id: n, span: e, children: [] });
                  let i = (function (t, e) {
                      let n = t.get(e);
                      return n || oJ(t, { id: e, children: [] });
                    })(t, r),
                    o = oJ(t, { id: n, span: e, parentNode: i, children: [] });
                  i.children.push(o);
                })(e, n);
              return Array.from(e, function ([t, e]) {
                return e;
              });
            })(t),
            n = new Set();
          for (let t of this.getCompletedRootNodes(e)) {
            let e = t.span;
            n.add(e);
            let r = (function (t) {
                let {
                    op: e,
                    description: n,
                    data: r,
                    origin: i = "manual",
                    source: o,
                  } = o4(t),
                  s = tm(t),
                  a = t.attributes[ta],
                  u = {
                    [ts]: o,
                    [ta]: a,
                    [tu]: e,
                    [tc]: i,
                    ...r,
                    ...o3(t.attributes),
                  },
                  { links: c } = t,
                  { traceId: l, spanId: p } = t.spanContext(),
                  f = {
                    parent_span_id: od(t),
                    span_id: p,
                    trace_id: l,
                    data: u,
                    origin: i,
                    op: e,
                    status: tM(o0(t)),
                    links: tI(c),
                  },
                  d = u[ol];
                return {
                  contexts: {
                    trace: f,
                    otel: { resource: t.resource.attributes },
                    ...("number" == typeof d
                      ? { response: { status_code: d } }
                      : void 0),
                  },
                  spans: [],
                  start_timestamp: tC(t.startTime),
                  timestamp: tC(t.endTime),
                  transaction: n,
                  type: "transaction",
                  sdkProcessingMetadata: {
                    capturedSpanScope: s.scope,
                    capturedSpanIsolationScope: s.isolationScope,
                    sampleRate: a,
                    dynamicSamplingContext: e_(t),
                  },
                  ...(o && { transaction_info: { source: o } }),
                };
              })(e),
              i = r.spans || [];
            for (let e of t.children)
              !(function t(e, n, r) {
                let i = e.span;
                if ((i && r.add(i), !i))
                  return void e.children.forEach((e) => {
                    t(e, n, r);
                  });
                let o = i.spanContext().spanId,
                  s = i.spanContext().traceId,
                  a = od(i),
                  { attributes: u, startTime: c, endTime: l, links: p } = i,
                  {
                    op: f,
                    description: d,
                    data: h,
                    origin: _ = "manual",
                  } = o4(i),
                  g = { [tc]: _, [tu]: f, ...o3(u), ...h },
                  m = o0(i),
                  y = {
                    span_id: o,
                    trace_id: s,
                    data: g,
                    description: d,
                    parent_span_id: a,
                    start_timestamp: tC(c),
                    timestamp: tC(l) || void 0,
                    status: tM(m),
                    op: f,
                    origin: _,
                    measurements: eV(i.events),
                    links: tI(p),
                  };
                n.push(y),
                  e.children.forEach((e) => {
                    t(e, n, r);
                  });
              })(e, i, n);
            r.spans =
              i.length > 1e3
                ? i
                    .sort((t, e) => t.start_timestamp - e.start_timestamp)
                    .slice(0, 1e3)
                : i;
            let o = eV(e.events);
            o && (r.measurements = o), tt().captureEvent(r, void 0);
          }
          return n;
        }
      }
      function o4(t) {
        let {
            op: e,
            source: n,
            origin: r,
          } = (function (t) {
            let e = t.attributes,
              n = e[tc];
            return { origin: n, op: e[tu], source: e[ts] };
          })(t),
          { op: i, description: o, source: s, data: a } = oI(t);
        return {
          op: e || i,
          description: o,
          source: n || s,
          origin: r,
          data: {
            ...a,
            ...(function (t) {
              let e = t.attributes,
                n = {};
              t.kind !== nL.INTERNAL && (n["otel.kind"] = nL[t.kind]);
              let r = e[ou];
              r && (n[ol] = r);
              let i = (function (t) {
                if (!oh(t)) return {};
                let e = t.attributes[op] || t.attributes[oa],
                  n = {
                    url: e,
                    "http.method": t.attributes[oc] || t.attributes[os],
                  };
                !n["http.method"] && n.url && (n["http.method"] = "GET");
                try {
                  if ("string" == typeof e) {
                    let t = t8(e);
                    (n.url = t7(t)),
                      t.search && (n["http.query"] = t.search),
                      t.hash && (n["http.fragment"] = t.hash);
                  }
                } catch {}
                return n;
              })(t);
              return (
                i.url && (n.url = i.url),
                i["http.query"] && (n["http.query"] = i["http.query"].slice(1)),
                i["http.fragment"] &&
                  (n["http.fragment"] = i["http.fragment"].slice(1)),
                n
              );
            })(t),
          },
        };
      }
      function o3(t) {
        let e = { ...t };
        return delete e[ta], delete e[of], delete e[tl], e;
      }
      class o5 {
        constructor(t) {
          oM("SentrySpanProcessor"), (this._exporter = new o2(t));
        }
        async forceFlush() {
          this._exporter.flush();
        }
        async shutdown() {
          this._exporter.clear();
        }
        onStart(t, e) {
          let n = ry.getSpan(e),
            r = oR(e);
          n && !n.spanContext().isRemote && tU(n, t),
            n?.spanContext().isRemote && t.setAttribute(of, !0),
            e === nM && (r = { scope: z(), isolationScope: Y() }),
            r && tg(t, r.scope, r.isolationScope),
            eH(t);
          let i = ti();
          i?.emit("spanStart", t);
        }
        onEnd(t) {
          ez(t);
          let e = ti();
          e?.emit("spanEnd", t), this._exporter.export(t);
        }
      }
      class o9 {
        constructor(t) {
          (this._client = t), oM("SentrySampler");
        }
        shouldSample(t, e, n, r, i, o) {
          let s = this._client.getOptions(),
            a = (function (t) {
              let e = ry.getSpan(t);
              return e && rc(e.spanContext()) ? e : void 0;
            })(t),
            u = a?.spanContext();
          if (!ep(s))
            return o8({ decision: void 0, context: t, spanAttributes: i });
          let c = i[os] || i[oc];
          if (r === nL.CLIENT && c && (!a || u?.isRemote))
            return o8({ decision: void 0, context: t, spanAttributes: i });
          let l = a
            ? (function (t, e, n) {
                let r = t.spanContext();
                if (rc(r) && r.traceId === e)
                  return r.isRemote ? oP(t.spanContext()) : oP(r);
              })(a, e, 0)
            : void 0;
          if (!(!a || u?.isRemote))
            return o8({
              decision: l ? nx.RECORD_AND_SAMPLED : nx.NOT_RECORD,
              context: t,
              spanAttributes: i,
            });
          let { description: p, data: f, op: d } = oA(n, i, r),
            h = { ...f, ...i };
          d && (h[tu] = d);
          let _ = { decision: !0 };
          if (
            (this._client.emit(
              "beforeSampling",
              {
                spanAttributes: h,
                spanName: p,
                parentSampled: l,
                parentContext: u,
              },
              _,
            ),
            !_.decision)
          )
            return o8({ decision: void 0, context: t, spanAttributes: i });
          let { isolationScope: g } = oR(t) ?? {},
            m = u?.traceState ? u.traceState.get(om) : void 0,
            y = m ? tS(m) : void 0,
            v = ty(y?.sample_rand) ?? Math.random(),
            [E, S, T] = eY(
              s,
              {
                name: p,
                attributes: h,
                normalizedRequest:
                  g?.getScopeData().sdkProcessingMetadata.normalizedRequest,
                parentSampled: l,
                parentSampleRate: ty(y?.sample_rate),
              },
              v,
            ),
            b = `${c}`.toUpperCase();
          return "OPTIONS" === b || "HEAD" === b
            ? o8({
                decision: nx.NOT_RECORD,
                context: t,
                spanAttributes: i,
                sampleRand: v,
                downstreamTraceSampleRate: 0,
              })
            : (E ||
                void 0 !== l ||
                this._client.recordDroppedEvent("sample_rate", "transaction"),
              {
                ...o8({
                  decision: E ? nx.RECORD_AND_SAMPLED : nx.NOT_RECORD,
                  context: t,
                  spanAttributes: i,
                  sampleRand: v,
                  downstreamTraceSampleRate: T ? S : void 0,
                }),
                attributes: { [ta]: T ? S : void 0 },
              });
        }
        toString() {
          return "SentrySampler";
        }
      }
      function o8({
        decision: t,
        context: e,
        spanAttributes: n,
        sampleRand: r,
        downstreamTraceSampleRate: i,
      }) {
        let o = (function (t, e) {
          let n = ry.getSpan(t),
            r = n?.spanContext(),
            i = r?.traceState || new ih(),
            o = e[oa] || e[op];
          return o && "string" == typeof o && (i = i.set(ov, o)), i;
        })(e, n);
        return (void 0 !== i && (o = o.set("sentry.sample_rate", `${i}`)),
        void 0 !== r && (o = o.set("sentry.sample_rand", `${r}`)),
        void 0 == t)
          ? { decision: nx.NOT_RECORD, traceState: o }
          : t === nx.NOT_RECORD
            ? { decision: t, traceState: o.set(oy, "1") }
            : { decision: t, traceState: o };
      }
      let o6 = new WeakMap(),
        o7 = (t = {}) => {
          let e = void 0 === t.breadcrumbs || t.breadcrumbs,
            n = t.shouldCreateSpanForRequest,
            r = new eF(100),
            i = new eF(100),
            o = {};
          function s(t) {
            let e = ti();
            if (!e) return !1;
            let n = e.getOptions();
            if (void 0 === n.tracePropagationTargets) return !0;
            let r = i.get(t);
            if (void 0 !== r) return r;
            let o = A(t, n.tracePropagationTargets);
            return i.set(t, o), o;
          }
          function a(t) {
            if (void 0 === n) return !0;
            let e = r.get(t);
            if (void 0 !== e) return e;
            let i = n(t);
            return r.set(t, i), i;
          }
          return {
            name: "WinterCGFetch",
            setupOnce() {
              !(function (t, e) {
                let n = "fetch";
                tK(n, t),
                  tq(n, () =>
                    (function (t, e = !1) {
                      I(u, "fetch", function (e) {
                        return function (...n) {
                          let r = Error(),
                            { method: i, url: o } = (function (t) {
                              if (0 === t.length)
                                return { method: "GET", url: "" };
                              if (2 === t.length) {
                                let [e, n] = t;
                                return {
                                  url: eq(e),
                                  method: eK(n, "method")
                                    ? String(n.method).toUpperCase()
                                    : "GET",
                                };
                              }
                              let e = t[0];
                              return {
                                url: eq(e),
                                method: eK(e, "method")
                                  ? String(e.method).toUpperCase()
                                  : "GET",
                              };
                            })(n),
                            s = {
                              args: n,
                              fetchData: { method: i, url: o },
                              startTimestamp: 1e3 * B(),
                              virtualError: r,
                              headers: (function (t) {
                                let [e, n] = t;
                                try {
                                  if (
                                    "object" == typeof n &&
                                    null !== n &&
                                    "headers" in n &&
                                    n.headers
                                  )
                                    return new Headers(n.headers);
                                  if (T(e)) return new Headers(e.headers);
                                } catch {}
                              })(n),
                            };
                          return (
                            t || tJ("fetch", { ...s }),
                            e.apply(u, n).then(
                              async (e) => (
                                t
                                  ? t(e)
                                  : tJ("fetch", {
                                      ...s,
                                      endTimestamp: 1e3 * B(),
                                      response: e,
                                    }),
                                e
                              ),
                              (t) => {
                                if (
                                  (tJ("fetch", {
                                    ...s,
                                    endTimestamp: 1e3 * B(),
                                    error: t,
                                  }),
                                  d(t) &&
                                    void 0 === t.stack &&
                                    ((t.stack = r.stack),
                                    C(t, "framesToPop", 1)),
                                  t instanceof TypeError &&
                                    ("Failed to fetch" === t.message ||
                                      "Load failed" === t.message ||
                                      "NetworkError when attempting to fetch resource." ===
                                        t.message))
                                )
                                  try {
                                    let e = new URL(s.fetchData.url);
                                    t.message = `${t.message} (${e.host})`;
                                  } catch {}
                                throw t;
                              },
                            )
                          );
                        };
                      });
                    })(void 0, void 0),
                  );
              })((t) => {
                let n = ti();
                n &&
                  o6.get(n) &&
                  !(function (t, e) {
                    var n, r, i, o;
                    let s = e?.getDsn(),
                      a = e?.getOptions().tunnel;
                    return (
                      (n = t),
                      (!!(r = s) && n.includes(r.host)) ||
                        ((i = t), !!(o = a) && eJ(i) === eJ(o))
                    );
                  })(t.fetchData.url, n) &&
                  (!(function (t, e, n, r, i = "auto.http.browser") {
                    if (!t.fetchData) return;
                    let { method: o, url: s } = t.fetchData,
                      a = ep() && e(s);
                    if (t.endTimestamp && a) {
                      let e = t.fetchData.__span;
                      if (!e) return;
                      let n = r[e];
                      n &&
                        ((function (t, e) {
                          if (e.response) {
                            var n = e.response.status;
                            t.setAttribute("http.response.status_code", n);
                            let r = td(n);
                            "unknown_error" !== r.message && t.setStatus(r);
                            let i =
                              e.response?.headers &&
                              e.response.headers.get("content-length");
                            if (i) {
                              let e = parseInt(i);
                              e > 0 &&
                                t.setAttribute(
                                  "http.response_content_length",
                                  e,
                                );
                            }
                          } else
                            e.error &&
                              t.setStatus({
                                code: 2,
                                message: "internal_error",
                              });
                          t.end();
                        })(n, t),
                        delete r[e]);
                      return;
                    }
                    let u = !!tB(),
                      l =
                        a && u
                          ? (function (t) {
                              let e = Q(c());
                              if (e.startInactiveSpan)
                                return e.startInactiveSpan(t);
                              let n = (function (t) {
                                  let e = {
                                    isStandalone: (t.experimental || {})
                                      .standalone,
                                    ...t,
                                  };
                                  if (t.startTime) {
                                    let n = { ...e };
                                    return (
                                      (n.startTimestamp = tC(t.startTime)),
                                      delete n.startTime,
                                      n
                                    );
                                  }
                                  return e;
                                })(t),
                                { forceTransaction: r, parentSpan: i } = t;
                              return (
                                t.scope
                                  ? (e) => tr(t.scope, e)
                                  : void 0 !== i
                                    ? (t) => e4(i, t)
                                    : (t) => t()
                              )(() => {
                                let e = tt(),
                                  i = (function (t) {
                                    let e = t[G];
                                    if (!e) return;
                                    let n = ti();
                                    return (n ? n.getOptions() : {})
                                      .parentSpanIsAlwaysRootSpan
                                      ? tj(e)
                                      : e;
                                  })(e);
                                return t.onlyIfParent && !i
                                  ? new eZ()
                                  : (function ({
                                      parentSpan: t,
                                      spanArguments: e,
                                      forceTransaction: n,
                                      scope: r,
                                    }) {
                                      var i, o;
                                      let s;
                                      if (!ep()) {
                                        let r = new eZ();
                                        if (n || !t) {
                                          let t = {
                                            sampled: "false",
                                            sample_rate: "0",
                                            transaction: e.name,
                                            ...e_(r),
                                          };
                                          C(r, ef, t);
                                        }
                                        return r;
                                      }
                                      let a = te();
                                      if (t && !n)
                                        (s = (function (t, e, n) {
                                          let { spanId: r, traceId: i } =
                                              t.spanContext(),
                                            o =
                                              !e.getScopeData()
                                                .sdkProcessingMetadata[e2] &&
                                              tN(t),
                                            s = o
                                              ? new eQ({
                                                  ...n,
                                                  parentSpanId: r,
                                                  traceId: i,
                                                  sampled: o,
                                                })
                                              : new eZ({ traceId: i });
                                          tU(t, s);
                                          let a = ti();
                                          return (
                                            a &&
                                              (a.emit("spanStart", s),
                                              n.endTimestamp &&
                                                a.emit("spanEnd", s)),
                                            s
                                          );
                                        })(t, r, e)),
                                          tU(t, s);
                                      else if (t) {
                                        let n = e_(t),
                                          { traceId: i, spanId: o } =
                                            t.spanContext(),
                                          a = tN(t);
                                        C(
                                          (s = e5(
                                            {
                                              traceId: i,
                                              parentSpanId: o,
                                              ...e,
                                            },
                                            r,
                                            a,
                                          )),
                                          ef,
                                          n,
                                        );
                                      } else {
                                        let {
                                          traceId: t,
                                          dsc: n,
                                          parentSpanId: i,
                                          sampled: o,
                                        } = {
                                          ...a.getPropagationContext(),
                                          ...r.getPropagationContext(),
                                        };
                                        (s = e5(
                                          { traceId: t, parentSpanId: i, ...e },
                                          r,
                                          o,
                                        )),
                                          n && C(s, ef, n);
                                      }
                                      return eH(s), tg(s, r, a), s;
                                    })({
                                      parentSpan: i,
                                      spanArguments: n,
                                      forceTransaction: r,
                                      scope: e,
                                    });
                              });
                            })(
                              (function (t, e, n) {
                                let r = (function (t, e) {
                                  let n =
                                      0 >= t.indexOf("://") &&
                                      0 !== t.indexOf("//"),
                                    r =
                                      void 0 ?? (n ? "thismessage:/" : void 0);
                                  try {
                                    if (
                                      "canParse" in URL &&
                                      !URL.canParse(t, r)
                                    )
                                      return;
                                    let e = new URL(t, r);
                                    if (n)
                                      return {
                                        isRelative: n,
                                        pathname: e.pathname,
                                        search: e.search,
                                        hash: e.hash,
                                      };
                                    return e;
                                  } catch {}
                                })(t);
                                return {
                                  name: r
                                    ? `${e} ${(function (t) {
                                        if (t9(t)) return t.pathname;
                                        let e = new URL(t);
                                        return (
                                          (e.search = ""),
                                          (e.hash = ""),
                                          ["80", "443"].includes(e.port) &&
                                            (e.port = ""),
                                          e.password &&
                                            (e.password = "%filtered%"),
                                          e.username &&
                                            (e.username = "%filtered%"),
                                          e.toString()
                                        );
                                      })(r)}`
                                    : e,
                                  attributes: (function (t, e, n, r) {
                                    let i = {
                                      url: t,
                                      type: "fetch",
                                      "http.method": n,
                                      [tc]: r,
                                      [tu]: "http.client",
                                    };
                                    return (
                                      e &&
                                        (t9(e) ||
                                          ((i["http.url"] = e.href),
                                          (i["server.address"] = e.host)),
                                        e.search &&
                                          (i["http.query"] = e.search),
                                        e.hash &&
                                          (i["http.fragment"] = e.hash)),
                                      i
                                    );
                                  })(t, r, e, n),
                                };
                              })(s, o, i),
                            )
                          : new eZ();
                    if (
                      ((t.fetchData.__span = l.spanContext().spanId),
                      (r[l.spanContext().spanId] = l),
                      n(t.fetchData.url))
                    ) {
                      let e = t.args[0],
                        n = t.args[1] || {},
                        r = (function (t, e, n) {
                          var r;
                          let i = (function (t = {}) {
                              let e = ti();
                              if (
                                !(function () {
                                  let t = ti();
                                  return (
                                    t?.getOptions().enabled !== !1 &&
                                    !!t?.getTransport()
                                  );
                                })() ||
                                !e
                              )
                                return {};
                              let n = Q(c());
                              if (n.getTraceData) return n.getTraceData(t);
                              let r = tt(),
                                i = t.span || tB(),
                                o = i
                                  ? (function (t) {
                                      let { traceId: e, spanId: n } =
                                        t.spanContext();
                                      return tL(e, n, tN(t));
                                    })(i)
                                  : (function (t) {
                                      let {
                                        traceId: e,
                                        sampled: n,
                                        propagationSpanId: r,
                                      } = t.getPropagationContext();
                                      return tL(e, r, n);
                                    })(r),
                                s = tT(i ? e_(i) : eh(e, r));
                              return tR.test(o)
                                ? { "sentry-trace": o, baggage: s }
                                : (L.warn(
                                    "Invalid sentry-trace data. Cannot generate trace data",
                                  ),
                                  {});
                            })({ span: n }),
                            o = i["sentry-trace"],
                            s = i.baggage;
                          if (!o) return;
                          let a = e.headers || (T(t) ? t.headers : void 0);
                          if (!a) return { ...i };
                          if (
                            ((r = a),
                            "undefined" != typeof Headers && E(r, Headers))
                          ) {
                            let t = new Headers(a);
                            if (
                              (t.get("sentry-trace") ||
                                t.set("sentry-trace", o),
                              s)
                            ) {
                              let e = t.get("baggage");
                              e
                                ? e9(e) || t.set("baggage", `${e},${s}`)
                                : t.set("baggage", s);
                            }
                            return t;
                          }
                          if (Array.isArray(a)) {
                            let t = [...a];
                            a.find((t) => "sentry-trace" === t[0]) ||
                              t.push(["sentry-trace", o]);
                            let e = a.find(
                              (t) => "baggage" === t[0] && e9(t[1]),
                            );
                            return s && !e && t.push(["baggage", s]), t;
                          }
                          {
                            let t =
                                "sentry-trace" in a
                                  ? a["sentry-trace"]
                                  : void 0,
                              e = "baggage" in a ? a.baggage : void 0,
                              n = e ? (Array.isArray(e) ? [...e] : [e]) : [],
                              r =
                                e &&
                                (Array.isArray(e)
                                  ? e.find((t) => e9(t))
                                  : e9(e));
                            return (
                              s && !r && n.push(s),
                              {
                                ...a,
                                "sentry-trace": t ?? o,
                                baggage: n.length > 0 ? n.join(",") : void 0,
                              }
                            );
                          }
                        })(e, n, ep() && u ? l : void 0);
                      r && ((t.args[1] = n), (n.headers = r));
                    }
                    let p = ti();
                    if (p) {
                      let e = {
                        input: t.args,
                        response: t.response,
                        startTimestamp: t.startTimestamp,
                        endTimestamp: t.endTimestamp,
                      };
                      p.emit("beforeOutgoingRequestSpan", l, e);
                    }
                  })(t, a, s, o, "auto.http.wintercg_fetch"),
                  e &&
                    (function (t) {
                      let { startTimestamp: e, endTimestamp: n } = t;
                      if (!n) return;
                      let r = {
                        method: t.fetchData.method,
                        url: t.fetchData.url,
                      };
                      if (t.error)
                        e8(
                          {
                            category: "fetch",
                            data: r,
                            level: "error",
                            type: "http",
                          },
                          {
                            data: t.error,
                            input: t.args,
                            startTimestamp: e,
                            endTimestamp: n,
                          },
                        );
                      else {
                        let i = t.response;
                        (r.request_body_size = t.fetchData.request_body_size),
                          (r.response_body_size =
                            t.fetchData.response_body_size),
                          (r.status_code = i?.status);
                        let o = {
                            input: t.args,
                            response: i,
                            startTimestamp: e,
                            endTimestamp: n,
                          },
                          s = (function (t) {
                            if (void 0 !== t)
                              return t >= 400 && t < 500
                                ? "warning"
                                : t >= 500
                                  ? "error"
                                  : void 0;
                          })(r.status_code);
                        e8(
                          {
                            category: "fetch",
                            data: r,
                            type: "http",
                            level: s,
                          },
                          o,
                        );
                      }
                    })(t));
              });
            },
            setup(t) {
              o6.set(t, !0);
            },
          };
        };
      class st {
        constructor(t = 30) {
          (this.$ = []), (this._taskProducers = []), (this._bufferSize = t);
        }
        add(t) {
          return this._taskProducers.length >= this._bufferSize
            ? Promise.reject(e6)
            : (this._taskProducers.push(t), Promise.resolve({}));
        }
        drain(t) {
          let e = [...this._taskProducers];
          return (
            (this._taskProducers = []),
            new Promise((n) => {
              let r = setTimeout(() => {
                t && t > 0 && n(!1);
              }, t);
              Promise.all(e.map((t) => t().then(null, () => {}))).then(() => {
                clearTimeout(r), n(!0);
              });
            })
          );
        }
      }
      function se(t) {
        return (function (
          t,
          e,
          n = (function (t) {
            let e = [];
            function n(t) {
              return e.splice(e.indexOf(t), 1)[0] || Promise.resolve(void 0);
            }
            return {
              $: e,
              add: function (r) {
                if (!(void 0 === t || e.length < t)) return eE(e6);
                let i = r();
                return (
                  -1 === e.indexOf(i) && e.push(i),
                  i
                    .then(() => n(i))
                    .then(null, () => n(i).then(null, () => {})),
                  i
                );
              },
              drain: function (t) {
                return new eS((n, r) => {
                  let i = e.length;
                  if (!i) return n(!0);
                  let o = setTimeout(() => {
                    t && t > 0 && n(!1);
                  }, t);
                  e.forEach((t) => {
                    ev(t).then(() => {
                      --i || (clearTimeout(o), n(!0));
                    }, r);
                  });
                });
              },
            };
          })(t.bufferSize || 64),
        ) {
          let r = {};
          return {
            send: function (i) {
              let o = [];
              if (
                (es(i, (e, n) => {
                  let i = eu[n];
                  !(function (t, e, n = Date.now()) {
                    return (t[e] || t.all || 0) > n;
                  })(r, i)
                    ? o.push(e)
                    : t.recordDroppedEvent("ratelimit_backoff", i);
                }),
                0 === o.length)
              )
                return ev({});
              let s = eo(i[0], o),
                a = (e) => {
                  es(s, (n, r) => {
                    t.recordDroppedEvent(e, eu[r]);
                  });
                };
              return n
                .add(() =>
                  e({
                    body: (function (t) {
                      let [e, n] = t,
                        r = JSON.stringify(e);
                      function i(t) {
                        "string" == typeof r
                          ? (r = "string" == typeof t ? r + t : [ea(r), t])
                          : r.push("string" == typeof t ? ea(t) : t);
                      }
                      for (let t of n) {
                        let [e, n] = t;
                        if (
                          (i(`
${JSON.stringify(e)}
`),
                          "string" == typeof n || n instanceof Uint8Array)
                        )
                          i(n);
                        else {
                          let t;
                          try {
                            t = JSON.stringify(n);
                          } catch (e) {
                            t = JSON.stringify(ei(n));
                          }
                          i(t);
                        }
                      }
                      return "string" == typeof r
                        ? r
                        : (function (t) {
                            let e = new Uint8Array(
                                t.reduce((t, e) => t + e.length, 0),
                              ),
                              n = 0;
                            for (let r of t) e.set(r, n), (n += r.length);
                            return e;
                          })(r);
                    })(s),
                  }).then(
                    (t) => (
                      void 0 !== t.statusCode &&
                        (t.statusCode < 200 || t.statusCode),
                      (r = (function (
                        t,
                        { statusCode: e, headers: n },
                        r = Date.now(),
                      ) {
                        let i = { ...t },
                          o = n?.["x-sentry-rate-limits"],
                          s = n?.["retry-after"];
                        if (o)
                          for (let t of o.trim().split(",")) {
                            let [e, n, , , o] = t.split(":", 5),
                              s = parseInt(e, 10),
                              a = (isNaN(s) ? 60 : s) * 1e3;
                            if (n)
                              for (let t of n.split(";"))
                                "metric_bucket" === t
                                  ? (!o || o.split(";").includes("custom")) &&
                                    (i[t] = r + a)
                                  : (i[t] = r + a);
                            else i.all = r + a;
                          }
                        else
                          s
                            ? (i.all =
                                r +
                                (function (t, e = Date.now()) {
                                  let n = parseInt(`${t}`, 10);
                                  if (!isNaN(n)) return 1e3 * n;
                                  let r = Date.parse(`${t}`);
                                  return isNaN(r) ? 6e4 : r - e;
                                })(s, r))
                            : 429 === e && (i.all = r + 6e4);
                        return i;
                      })(r, t)),
                      t
                    ),
                    (t) => {
                      throw (a("network_error"), t);
                    },
                  ),
                )
                .then(
                  (t) => t,
                  (t) => {
                    if (t === e6) return a("queue_overflow"), ev({});
                    throw t;
                  },
                );
            },
            flush: (t) => n.drain(t),
          };
        })(
          t,
          function (e) {
            let n = {
              body: e.body,
              method: "POST",
              headers: t.headers,
              ...t.fetchOptions,
            };
            var r = () =>
              fetch(t.url, n).then((t) => ({
                statusCode: t.status,
                headers: {
                  "x-sentry-rate-limits": t.headers.get("X-Sentry-Rate-Limits"),
                  "retry-after": t.headers.get("Retry-After"),
                },
              }));
            let i = Q(c());
            return i.suppressTracing
              ? i.suppressTracing(r)
              : tr((t) => {
                  t.setSDKProcessingMetadata({ [e2]: !0 });
                  let e = r();
                  return t.setSDKProcessingMetadata({ [e2]: void 0 }), e;
                });
          },
          new st(t.bufferSize),
        );
      }
      let sn = [
        "addListener",
        "on",
        "once",
        "prependListener",
        "prependOnceListener",
      ];
      class sr {
        constructor() {
          sr.prototype.__init.call(this), sr.prototype.__init2.call(this);
        }
        bind(t, e) {
          return "object" == typeof e && null !== e && "on" in e
            ? this._bindEventEmitter(t, e)
            : "function" == typeof e
              ? this._bindFunction(t, e)
              : e;
        }
        _bindFunction(t, e) {
          let n = this,
            r = function (...r) {
              return n.with(t, () => e.apply(this, r));
            };
          return (
            Object.defineProperty(r, "length", {
              enumerable: !1,
              configurable: !0,
              writable: !1,
              value: e.length,
            }),
            r
          );
        }
        _bindEventEmitter(t, e) {
          return (
            void 0 !== this._getPatchMap(e) ||
              (this._createPatchMap(e),
              sn.forEach((n) => {
                void 0 !== e[n] && (e[n] = this._patchAddListener(e, e[n], t));
              }),
              "function" == typeof e.removeListener &&
                (e.removeListener = this._patchRemoveListener(
                  e,
                  e.removeListener,
                )),
              "function" == typeof e.off &&
                (e.off = this._patchRemoveListener(e, e.off)),
              "function" == typeof e.removeAllListeners &&
                (e.removeAllListeners = this._patchRemoveAllListeners(
                  e,
                  e.removeAllListeners,
                ))),
            e
          );
        }
        _patchRemoveListener(t, e) {
          let n = this;
          return function (r, i) {
            let o = n._getPatchMap(t)?.[r];
            if (void 0 === o) return e.call(this, r, i);
            let s = o.get(i);
            return e.call(this, r, s || i);
          };
        }
        _patchRemoveAllListeners(t, e) {
          let n = this;
          return function (r) {
            let i = n._getPatchMap(t);
            return (
              void 0 !== i &&
                (0 == arguments.length
                  ? n._createPatchMap(t)
                  : void 0 !== i[r] && delete i[r]),
              e.apply(this, arguments)
            );
          };
        }
        _patchAddListener(t, e, n) {
          let r = this;
          return function (i, o) {
            if (r._wrapped) return e.call(this, i, o);
            let s = r._getPatchMap(t);
            void 0 === s && (s = r._createPatchMap(t));
            let a = s[i];
            void 0 === a && ((a = new WeakMap()), (s[i] = a));
            let u = r.bind(n, o);
            a.set(o, u), (r._wrapped = !0);
            try {
              return e.call(this, i, u);
            } finally {
              r._wrapped = !1;
            }
          };
        }
        _createPatchMap(t) {
          let e = Object.create(null);
          return (t[this._kOtListeners] = e), e;
        }
        _getPatchMap(t) {
          return t[this._kOtListeners];
        }
        __init() {
          this._kOtListeners = Symbol("OtListeners");
        }
        __init2() {
          this._wrapped = !1;
        }
      }
      class si extends sr {
        constructor() {
          super();
          let t = u.AsyncLocalStorage;
          t
            ? (this._asyncLocalStorage = new t())
            : (this._asyncLocalStorage = {
                getStore() {},
                run(t, e, ...n) {
                  return e.apply(this, n);
                },
                disable() {},
              });
        }
        active() {
          return this._asyncLocalStorage.getStore() ?? nM;
        }
        with(t, e, n, ...r) {
          let i = null == n ? e : e.bind(n);
          return this._asyncLocalStorage.run(t, i, ...r);
        }
        enable() {
          return this;
        }
        disable() {
          return this._asyncLocalStorage.disable(), this;
        }
      }
      let so = tV([
        90,
        (function (t) {
          let e = /^\s*[-]{4,}$/,
            n = /at (?:async )?(?:(.+?)\s+\()?(?:(.+):(\d+):(\d+)?|([^)]+))\)?/;
          return (r) => {
            let i = r.match(n);
            if (i) {
              let e, n, r, o, s;
              if (i[1]) {
                let t = (r = i[1]).lastIndexOf(".");
                if (("." === r[t - 1] && t--, t > 0)) {
                  (e = r.slice(0, t)), (n = r.slice(t + 1));
                  let i = e.indexOf(".Module");
                  i > 0 && ((r = r.slice(i + 1)), (e = e.slice(0, i)));
                }
                o = void 0;
              }
              n && ((o = e), (s = n)),
                "<anonymous>" === n && ((s = void 0), (r = void 0)),
                void 0 === r && ((s = s || "?"), (r = o ? `${o}.${s}` : s));
              let a = i[2]?.startsWith("file://") ? i[2].slice(7) : i[2],
                u = "native" === i[5];
              return (
                a?.match(/\/[A-Z]:/) && (a = a.slice(1)),
                a || !i[5] || u || (a = i[5]),
                {
                  filename: a ? decodeURI(a) : void 0,
                  module: t ? t(a) : void 0,
                  function: r,
                  lineno: e7(i[3]),
                  colno: e7(i[4]),
                  in_app: (function (t, e = !1) {
                    return (
                      !(
                        e ||
                        (t &&
                          !t.startsWith("/") &&
                          !t.match(/^[A-Z]:/) &&
                          !t.startsWith(".") &&
                          !t.match(/^[a-zA-Z]([a-zA-Z0-9.\-+])*:\/\//))
                      ) &&
                      void 0 !== t &&
                      !t.includes("node_modules/")
                    );
                  })(a || "", u),
                }
              );
            }
            if (r.match(e)) return { filename: r };
          };
        })(void 0),
      ]);
      function ss(t) {
        return [
          nt(),
          ns(),
          nl(),
          nd(),
          o7(),
          n_(),
          ...(t.sendDefaultPii ? [nv()] : []),
        ];
      }
      Symbol.toStringTag, n(46753);
      let sa = {
        client: "client",
        server: "server",
        edgeServer: "edge-server",
      };
      async function su() {
        try {
          await eX(2e3);
        } catch (t) {}
      }
      sa.client, sa.server, sa.edgeServer, Symbol("polyfills");
      let sc =
        /^(\S+:\\|\/?)([\s\S]*?)((?:\.{1,2}|[^/\\]+?|)(\.[^./\\]*|))(?:[/\\]*)$/;
      function sl(...t) {
        let e = "",
          n = !1;
        for (let r = t.length - 1; r >= -1 && !n; r--) {
          let i = r >= 0 ? t[r] : "/";
          i && ((e = `${i}/${e}`), (n = "/" === i.charAt(0)));
        }
        return (
          (e = (function (t, e) {
            let n = 0;
            for (let e = t.length - 1; e >= 0; e--) {
              let r = t[e];
              "." === r
                ? t.splice(e, 1)
                : ".." === r
                  ? (t.splice(e, 1), n++)
                  : n && (t.splice(e, 1), n--);
            }
            if (e) for (; n--; ) t.unshift("..");
            return t;
          })(
            e.split("/").filter((t) => !!t),
            !n,
          ).join("/")),
          (n ? "/" : "") + e || "."
        );
      }
      function sp(t) {
        let e = 0;
        for (; e < t.length && "" === t[e]; e++);
        let n = t.length - 1;
        for (; n >= 0 && "" === t[n]; n--);
        return e > n ? [] : t.slice(e, n - e + 1);
      }
      let sf = (t = {}) => {
          let e = t.root,
            n = t.prefix || "app:///",
            r = "window" in u && !!u.window,
            i =
              t.iteratee ||
              (function ({ isBrowser: t, root: e, prefix: n }) {
                return (r) => {
                  if (!r.filename) return r;
                  let i =
                      /^[a-zA-Z]:\\/.test(r.filename) ||
                      (r.filename.includes("\\") && !r.filename.includes("/")),
                    o = /^\//.test(r.filename);
                  if (t) {
                    if (e) {
                      let t = r.filename;
                      0 === t.indexOf(e) && (r.filename = t.replace(e, n));
                    }
                  } else if (i || o) {
                    let t = i
                        ? r.filename
                            .replace(/^[a-zA-Z]:/, "")
                            .replace(/\\/g, "/")
                        : r.filename,
                      o = e
                        ? (function (t, e) {
                            (t = sl(t).slice(1)), (e = sl(e).slice(1));
                            let n = sp(t.split("/")),
                              r = sp(e.split("/")),
                              i = Math.min(n.length, r.length),
                              o = i;
                            for (let t = 0; t < i; t++)
                              if (n[t] !== r[t]) {
                                o = t;
                                break;
                              }
                            let s = [];
                            for (let t = o; t < n.length; t++) s.push("..");
                            return (s = s.concat(r.slice(o))).join("/");
                          })(e, t)
                        : (function (t) {
                            let e =
                                t.length > 1024
                                  ? `<truncated>${t.slice(-1024)}`
                                  : t,
                              n = sc.exec(e);
                            return n ? n.slice(1) : [];
                          })(t)[2] || "";
                    r.filename = `${n}${o}`;
                  }
                  return r;
                };
              })({ isBrowser: r, root: e, prefix: n });
          return {
            name: "RewriteFrames",
            processEvent(t) {
              let e = t;
              return (
                t.exception &&
                  Array.isArray(t.exception.values) &&
                  (e = (function (t) {
                    try {
                      return {
                        ...t,
                        exception: {
                          ...t.exception,
                          values: t.exception.values.map((t) => {
                            var e;
                            return {
                              ...t,
                              ...(t.stacktrace && {
                                stacktrace: {
                                  ...(e = t.stacktrace),
                                  frames:
                                    e?.frames && e.frames.map((t) => i(t)),
                                },
                              }),
                            };
                          }),
                        },
                      };
                    } catch (e) {
                      return t;
                    }
                  })(e)),
                e
              );
            },
          };
        },
        sd = ({ distDirName: t }) => {
          let e = t.replace(/(\/|\\)$/, ""),
            n = RegExp(
              `.*${e.replace(/[|\\{}()[\]^$+*?.]/g, "\\$&").replace(/-/g, "\\x2d")}`,
            );
          return {
            ...sf({
              iteratee: (t) => (
                (t.filename = t.filename?.replace(n, "app:///_next")), t
              ),
            }),
            name: "DistDirRewriteFrames",
          };
        };
      !(function (t = {}) {
        if ((t4(), "phase-production-build" === process.env.NEXT_PHASE)) return;
        let e = ss(t),
          n = ".next";
        n && e.push(sd({ distDirName: n }));
        let r = {
          defaultIntegrations: e,
          release: "d92a5e8d8d7c20e1f785b33fde2c15257fdb31d2",
          ...t,
        };
        t5(r, "nextjs", ["nextjs", "vercel-edge"]);
        let i = (function (t = {}) {
          var e, n;
          function r() {
            let t = oR(n3.active());
            return t || { scope: z(), isolationScope: Y() };
          }
          function i() {
            return r().scope;
          }
          function o() {
            return r().isolationScope;
          }
          if (
            ((e = {
              withScope: function (t) {
                let e = n3.active();
                return n3.with(e, () => t(i()));
              },
              withSetScope: function (t, e) {
                let n = t[oO] || n3.active();
                return n3.with(n.setValue(oT, t), () => e(t));
              },
              withSetIsolationScope: function (t, e) {
                let n = n3.active();
                return n3.with(n.setValue(ob, t), () => e(o()));
              },
              withIsolationScope: function (t) {
                let e = n3.active();
                return n3.with(e.setValue(oS, !0), () => t(o()));
              },
              getCurrentScope: i,
              getIsolationScope: o,
              startSpan: oB,
              startSpanManual: o$,
              startInactiveSpan: oF,
              getActiveSpan: ow,
              suppressTracing: oW,
              getTraceData: oK,
              continueTrace: oz,
              withActiveSpan: oG,
            }),
            (l(c()).acs = e),
            tt().update(t.initialScope),
            void 0 === t.defaultIntegrations && (t.defaultIntegrations = ss(t)),
            void 0 === t.dsn &&
              process.env.SENTRY_DSN &&
              (t.dsn = process.env.SENTRY_DSN),
            void 0 === t.tracesSampleRate &&
              process.env.SENTRY_TRACES_SAMPLE_RATE)
          ) {
            let e = parseFloat(process.env.SENTRY_TRACES_SAMPLE_RATE);
            isFinite(e) && (t.tracesSampleRate = e);
          }
          if (void 0 === t.release) {
            let e = (function (t) {
              if (process.env.SENTRY_RELEASE) return process.env.SENTRY_RELEASE;
              if (u.SENTRY_RELEASE?.id) return u.SENTRY_RELEASE.id;
              let e =
                  process.env.GITHUB_SHA ||
                  process.env.CI_MERGE_REQUEST_SOURCE_BRANCH_SHA ||
                  process.env.CI_BUILD_REF ||
                  process.env.CI_COMMIT_SHA ||
                  process.env.BITBUCKET_COMMIT,
                n =
                  process.env.APPVEYOR_PULL_REQUEST_HEAD_COMMIT ||
                  process.env.APPVEYOR_REPO_COMMIT ||
                  process.env.CODEBUILD_RESOLVED_SOURCE_VERSION ||
                  process.env.AWS_COMMIT_ID ||
                  process.env.BUILD_SOURCEVERSION ||
                  process.env.GIT_CLONE_COMMIT_HASH ||
                  process.env.BUDDY_EXECUTION_REVISION ||
                  process.env.BUILDKITE_COMMIT ||
                  process.env.CIRCLE_SHA1 ||
                  process.env.CIRRUS_CHANGE_IN_REPO ||
                  process.env.CF_REVISION ||
                  process.env.CM_COMMIT ||
                  process.env.CF_PAGES_COMMIT_SHA ||
                  process.env.DRONE_COMMIT_SHA ||
                  process.env.FC_GIT_COMMIT_SHA ||
                  process.env.HEROKU_TEST_RUN_COMMIT_VERSION ||
                  process.env.HEROKU_SLUG_COMMIT ||
                  process.env.RAILWAY_GIT_COMMIT_SHA ||
                  process.env.RENDER_GIT_COMMIT ||
                  process.env.SEMAPHORE_GIT_SHA ||
                  process.env.TRAVIS_PULL_REQUEST_SHA ||
                  process.env.VERCEL_GIT_COMMIT_SHA ||
                  process.env.VERCEL_GITHUB_COMMIT_SHA ||
                  process.env.VERCEL_GITLAB_COMMIT_SHA ||
                  process.env.VERCEL_BITBUCKET_COMMIT_SHA ||
                  process.env.ZEIT_GITHUB_COMMIT_SHA ||
                  process.env.ZEIT_GITLAB_COMMIT_SHA ||
                  process.env.ZEIT_BITBUCKET_COMMIT_SHA,
                r =
                  process.env.CI_COMMIT_ID ||
                  process.env.SOURCE_COMMIT ||
                  process.env.SOURCE_VERSION ||
                  process.env.GIT_COMMIT ||
                  process.env.COMMIT_REF ||
                  process.env.BUILD_VCS_NUMBER ||
                  process.env.CI_COMMIT_SHA;
              return e || n || r || void 0;
            })();
            void 0 !== e && (t.release = e);
          }
          t.environment =
            t.environment ||
            process.env.SENTRY_ENVIRONMENT ||
            (function (t) {
              let e = process.env.VERCEL_ENV;
              return e ? `vercel-${e}` : void 0;
            })() ||
            "production";
          let s = new rj({
            ...t,
            stackParser: Array.isArray((n = t.stackParser || so))
              ? tV(...n)
              : n,
            integrations: (function (t) {
              let e,
                n = t.defaultIntegrations || [],
                r = t.integrations;
              if (
                (n.forEach((t) => {
                  t.isDefaultInstance = !0;
                }),
                Array.isArray(r))
              )
                e = [...n, ...r];
              else if ("function" == typeof r) {
                let t = r(n);
                e = Array.isArray(t) ? t : [t];
              } else e = n;
              let i = {};
              return (
                e.forEach((t) => {
                  let { name: e } = t,
                    n = i[e];
                  (n && !n.isDefaultInstance && t.isDefaultInstance) ||
                    (i[e] = t);
                }),
                Object.values(i)
              );
            })(t),
            transport: t.transport || se,
          });
          return (
            tt().setClient(s),
            s.init(),
            t.skipOpenTelemetrySetup ||
              (function (t) {
                t.getOptions().debug &&
                  (function () {
                    let t = new Proxy(L, {
                      get: (t, e, n) =>
                        Reflect.get(t, "verbose" === e ? "debug" : e, n),
                    });
                    rv.disable(), rv.setLogger(t, nO.DEBUG);
                  })();
                let e = new oo({
                    sampler: new o9(t),
                    resource: new iF({
                      "service.name": "edge",
                      "service.namespace": "sentry",
                      "service.version": a,
                    }),
                    forceFlushTimeoutMillis: 500,
                    spanProcessors: [
                      new o5({ timeout: t.getOptions().maxSpanWaitDuration }),
                    ],
                  }),
                  n = (function (t) {
                    class e extends t {
                      constructor(...t) {
                        super(...t), oM("SentryContextManager");
                      }
                      with(t, e, n, ...r) {
                        let i = oR(t),
                          o = i?.scope || tt(),
                          s = i?.isolationScope || te(),
                          a = !0 === t.getValue(oS),
                          u = t.getValue(oT),
                          c = t.getValue(ob),
                          l = u || o.clone(),
                          p = oL(t, {
                            scope: l,
                            isolationScope: c || (a ? s.clone() : s),
                          })
                            .deleteValue(oS)
                            .deleteValue(oT)
                            .deleteValue(ob);
                        return C(l, oO, p), super.with(p, e, n, ...r);
                      }
                    }
                    return e;
                  })(si);
                ry.setGlobalTracerProvider(e),
                  rD.setGlobalPropagator(new ok()),
                  n3.setGlobalContextManager(new n()),
                  (t.traceProvider = e);
              })(s),
            s.on("createDsc", (t, e) => {
              if (!e) return;
              let n = tx(e).data[ts],
                { description: r } = e.name ? oI(e) : { description: void 0 };
              if (("url" !== n && r && (t.transaction = r), ep())) {
                let n = oP(e.spanContext());
                t.sampled = void 0 == n ? void 0 : String(n);
              }
            }),
            s.on("preprocessEvent", (t) => {
              let e = ow();
              if (e && "transaction" !== t.type)
                return (
                  (t.contexts = { trace: tA(e), ...t.contexts }),
                  (t.sdkProcessingMetadata = {
                    dynamicSamplingContext: e_(tj(e)),
                    ...t.sdkProcessingMetadata,
                  }),
                  t
                );
            }),
            s
          );
        })(r);
        i?.on("spanStart", (t) => {
          let e = tx(t).data;
          e?.["next.span_type"] !== void 0 && t.setAttribute(tc, "auto"),
            e?.["next.span_type"] === "Middleware.execute" &&
              (t.setAttribute(tu, "http.server.middleware"),
              t.setAttribute(ts, "url"));
        }),
          i?.on("preprocessEvent", (t) => {
            "transaction" === t.type &&
              t.contexts?.trace?.data?.["next.span_type"] ===
                "Middleware.execute" &&
              t.contexts?.trace?.data?.["next.span_name"] &&
              t.transaction &&
              (t.transaction = t6(t.contexts.trace.data["next.span_name"]));
          }),
          i?.on("spanEnd", (t) => {
            t === tj(t) &&
              (function (t) {
                let e = u[Symbol.for("@vercel/request-context")],
                  n = e?.get && e.get() ? e.get() : {};
                n?.waitUntil && n.waitUntil(t);
              })(su());
          });
      })({ dsn: process.env.SENTRY_DSN, tracesSampleRate: 1, debug: !1 });
    },
    25356: (t) => {
      "use strict";
      t.exports = require("node:buffer");
    },
    41874: (t, e, n) => {
      "use strict";
      async function r() {
        await Promise.resolve().then(n.bind(n, 3292));
      }
      n.r(e),
        n.d(e, { register: () => r }),
        (globalThis._sentryRewritesTunnelPath = "/monitoring"),
        (globalThis.SENTRY_RELEASE = {
          id: "d92a5e8d8d7c20e1f785b33fde2c15257fdb31d2",
        }),
        (globalThis._sentryBasePath = void 0),
        (globalThis._sentryRewriteFramesDistDir = ".next");
    },
    46753: (t) => {
      "use strict";
      t.exports = [
        "chrome 64",
        "edge 79",
        "firefox 67",
        "opera 51",
        "safari 12",
      ];
    },
  },
  (t) => {
    var e = t((t.s = 41874));
    (_ENTRIES =
      "undefined" == typeof _ENTRIES
        ? {}
        : _ENTRIES).middleware_instrumentation = e;
  },
]);
//# sourceMappingURL=edge-instrumentation.js.map
