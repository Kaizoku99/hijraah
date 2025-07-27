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
    (e._sentryDebugIds[t] = "b63e2e50-3a16-435a-934a-66cad36222a4"),
    (e._sentryDebugIdIdentifier =
      "sentry-dbid-b63e2e50-3a16-435a-934a-66cad36222a4"));
} catch (e) {}
("use strict");
(exports.id = 4508),
  (exports.ids = [4508]),
  (exports.modules = {
    11316: (e, t, r) => {
      Object.defineProperty(t, "__esModule", { value: !0 }),
        Object.defineProperty(t, "notFound", {
          enumerable: !0,
          get: function () {
            return o;
          },
        });
      let n = "" + r(17581).HTTP_ERROR_FALLBACK_ERROR_CODE + ";404";
      function o() {
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
    15422: (e, t, r) => {
      r.a(e, async (e, n) => {
        try {
          r.d(t, { VN: () => l });
          var o = r(77719),
            u = r(85488),
            a = r(84170),
            i = e([u]);
          u = (i.then ? (await i)() : i)[0];
          let c = (0, o.createClient)(
            "http://localhost:54321",
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0",
          );
          async function d({ id: e, title: t, userId: r, messages: n }) {
            try {
              let { error: o } = await c
                .from("Chat")
                .upsert({
                  id: e,
                  title: t,
                  userId: r,
                  createdAt: new Date().toISOString(),
                });
              if (o) throw o;
              let u = n.map((t, n) => ({
                  id: `${e}-msg-${n}`,
                  session_id: e,
                  role: t.role,
                  content: t.content,
                  user_id: r,
                  created_at: new Date().toISOString(),
                })),
                { error: a } = await c.from("chat_messages").upsert(u);
              if (a) throw a;
              for (let [t, o] of n.entries())
                if (o.attachments?.length) {
                  let n = o.attachments.map((n, o) => ({
                      id: `${e}-msg-${t}-att-${o}`,
                      message_id: `${e}-msg-${t}`,
                      chat_id: e,
                      user_id: r,
                      file_name: n.name,
                      file_path: n.url,
                      file_type: n.contentType,
                      file_size: 0,
                      created_at: new Date().toISOString(),
                    })),
                    { error: u } = await c.from("chat_attachments").insert(n);
                  if (u) throw u;
                }
              return { success: !0 };
            } catch (e) {
              return (
                console.error("Failed to save chat:", e),
                { success: !1, error: e }
              );
            }
          }
          async function l(e) {
            let { data: t, error: r } = await c
              .from("Chat")
              .select("id, title, createdAt")
              .eq("userId", e)
              .order("createdAt", { ascending: !1 });
            if (r) throw r;
            return t;
          }
          n();
        } catch (e) {
          n(e);
        }
      });
    },
    23399: (e, t, r) => {
      Object.defineProperty(t, "__esModule", { value: !0 }),
        Object.defineProperty(t, "unstable_rethrow", {
          enumerable: !0,
          get: function () {
            return function e(t) {
              if (
                (0, a.isNextRouterError)(t) ||
                (0, u.isBailoutToCSRError)(t) ||
                (0, d.isDynamicServerError)(t) ||
                (0, i.isDynamicPostpone)(t) ||
                (0, o.isPostpone)(t) ||
                (0, n.isHangingPromiseRejectionError)(t)
              )
                throw t;
              t instanceof Error && "cause" in t && e(t.cause);
            };
          },
        });
      let n = r(6223),
        o = r(96124),
        u = r(58937),
        a = r(91613),
        i = r(62938),
        d = r(98800);
      ("function" == typeof t.default ||
        ("object" == typeof t.default && null !== t.default)) &&
        void 0 === t.default.__esModule &&
        (Object.defineProperty(t.default, "__esModule", { value: !0 }),
        Object.assign(t.default, t),
        (e.exports = t.default));
    },
    29073: (e, t, r) => {
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
    42600: (e, t, r) => {
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
    52480: (e, t, r) => {
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
    65278: (e, t, r) => {
      Object.defineProperty(t, "__esModule", { value: !0 }),
        !(function (e, t) {
          for (var r in t)
            Object.defineProperty(e, r, { enumerable: !0, get: t[r] });
        })(t, {
          getRedirectError: function () {
            return a;
          },
          getRedirectStatusCodeFromError: function () {
            return f;
          },
          getRedirectTypeFromError: function () {
            return c;
          },
          getURLFromRedirectError: function () {
            return l;
          },
          permanentRedirect: function () {
            return d;
          },
          redirect: function () {
            return i;
          },
        });
      let n = r(20835),
        o = r(21293),
        u = r(19121).actionAsyncStorage;
      function a(e, t, r) {
        void 0 === r && (r = n.RedirectStatusCode.TemporaryRedirect);
        let u = Object.defineProperty(
          Error(o.REDIRECT_ERROR_CODE),
          "__NEXT_ERROR_CODE",
          { value: "E394", enumerable: !1, configurable: !0 },
        );
        return (
          (u.digest =
            o.REDIRECT_ERROR_CODE + ";" + t + ";" + e + ";" + r + ";"),
          u
        );
      }
      function i(e, t) {
        var r;
        throw (
          (null != t ||
            (t = (null == u || null == (r = u.getStore()) ? void 0 : r.isAction)
              ? o.RedirectType.push
              : o.RedirectType.replace),
          a(e, t, n.RedirectStatusCode.TemporaryRedirect))
        );
      }
      function d(e, t) {
        throw (
          (void 0 === t && (t = o.RedirectType.replace),
          a(e, t, n.RedirectStatusCode.PermanentRedirect))
        );
      }
      function l(e) {
        return (0, o.isRedirectError)(e)
          ? e.digest.split(";").slice(2, -2).join(";")
          : null;
      }
      function c(e) {
        if (!(0, o.isRedirectError)(e))
          throw Object.defineProperty(
            Error("Not a redirect error"),
            "__NEXT_ERROR_CODE",
            { value: "E260", enumerable: !1, configurable: !0 },
          );
        return e.digest.split(";", 2)[1];
      }
      function f(e) {
        if (!(0, o.isRedirectError)(e))
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
    90645: (e, t, r) => {
      Object.defineProperty(t, "__esModule", { value: !0 }),
        !(function (e, t) {
          for (var r in t)
            Object.defineProperty(e, r, { enumerable: !0, get: t[r] });
        })(t, {
          ReadonlyURLSearchParams: function () {
            return c;
          },
          RedirectType: function () {
            return o.RedirectType;
          },
          forbidden: function () {
            return a.forbidden;
          },
          notFound: function () {
            return u.notFound;
          },
          permanentRedirect: function () {
            return n.permanentRedirect;
          },
          redirect: function () {
            return n.redirect;
          },
          unauthorized: function () {
            return i.unauthorized;
          },
          unstable_rethrow: function () {
            return d.unstable_rethrow;
          },
        });
      let n = r(65278),
        o = r(21293),
        u = r(11316),
        a = r(14749),
        i = r(52480),
        d = r(42600);
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
  });
//# sourceMappingURL=4508.js.map
