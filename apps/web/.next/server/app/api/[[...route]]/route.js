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
    (e._sentryDebugIds[t] = "d7977085-0d96-410f-aaa0-7fa87b006206"),
    (e._sentryDebugIdIdentifier =
      "sentry-dbid-d7977085-0d96-410f-aaa0-7fa87b006206"));
} catch (e) {}
(() => {
  var e = {};
  (e.id = 543),
    (e.ids = [543]),
    (e.modules = {
      1978: (e, t, r) => {
        "use strict";
        r.d(t, { i: () => ea });
        var n = r(62745),
          a = (e) =>
            e
              ? e
                  .split(",")
                  .map((e, t) => ({ value: e, index: t }))
                  .map(s)
                  .filter((e) => !!e)
                  .sort(u)
                  .map(({ type: e, params: t, q: r }) => ({
                    type: e,
                    params: t,
                    q: r,
                  }))
              : [],
          i = /;(?=(?:(?:[^"]*"){2})*[^"]*$)/,
          s = ({ value: e, index: t }) => {
            let r = e
                .trim()
                .split(i)
                .map((e) => e.trim()),
              n = r[0];
            if (!n) return null;
            let a = o(r.slice(1)),
              s = c(a.q);
            return { type: n, params: a, q: s, index: t };
          },
          o = (e) =>
            e.reduce((e, t) => {
              let [r, n] = t.split("=").map((e) => e.trim());
              return r && n && (e[r] = n), e;
            }, {}),
          c = (e) => {
            if (void 0 === e || "" === e) return 1;
            if ("NaN" === e) return 0;
            let t = Number(e);
            return t === 1 / 0
              ? 1
              : t === -1 / 0
                ? 0
                : Number.isNaN(t) || t < 0 || t > 1
                  ? 1
                  : t;
          },
          u = (e, t) => {
            let r = t.q - e.q;
            return 0 !== r ? r : e.index - t.index;
          },
          l = {
            order: ["querystring", "cookie", "header"],
            lookupQueryString: "lang",
            lookupCookie: "language",
            lookupFromHeaderKey: "accept-language",
            lookupFromPathIndex: 0,
            caches: ["cookie"],
            ignoreCase: !0,
            fallbackLanguage: "en",
            supportedLanguages: ["en"],
            cookieOptions: {
              sameSite: "Strict",
              secure: !0,
              maxAge: 31536e3,
              httpOnly: !0,
            },
            debug: !1,
          },
          d = (e, t) => {
            if (e)
              try {
                let r = e.trim();
                t.convertDetectedLanguage && (r = t.convertDetectedLanguage(r));
                let n = t.ignoreCase ? r.toLowerCase() : r,
                  a = t.supportedLanguages.map((e) =>
                    t.ignoreCase ? e.toLowerCase() : e,
                  ),
                  i = a.find((e) => e === n);
                return i ? t.supportedLanguages[a.indexOf(i)] : void 0;
              } catch {
                return;
              }
          },
          h = {
            querystring: (e, t) => {
              try {
                let r = e.req.query(t.lookupQueryString);
                return d(r, t);
              } catch {
                return;
              }
            },
            cookie: (e, t) => {
              try {
                let r = (0, n.Ri)(e, t.lookupCookie);
                return d(r, t);
              } catch {
                return;
              }
            },
            header: function (e, t) {
              try {
                let r = e.req.header(t.lookupFromHeaderKey);
                if (!r) return;
                for (let { lang: e } of a(r).map(({ type: e, q: t }) => ({
                  lang: e,
                  q: t,
                }))) {
                  let r = d(e, t);
                  if (r) return r;
                }
                return;
              } catch {
                return;
              }
            },
            path: function (e, t) {
              try {
                let r = e.req.path.split("/").filter(Boolean)[
                  t.lookupFromPathIndex
                ];
                return d(r, t);
              } catch {
                return;
              }
            },
          },
          f = (e, t) => {
            let r;
            for (let n of t.order) {
              let a = h[n];
              if (a)
                try {
                  if ((r = a(e, t))) {
                    t.debug && console.log(`Language detected from ${n}: ${r}`);
                    break;
                  }
                } catch (e) {
                  t.debug && console.error(`Error in ${n} detector:`, e);
                  continue;
                }
            }
            let a = r || t.fallbackLanguage;
            return (
              r &&
                t.caches &&
                (function (e, t, r) {
                  if (Array.isArray(r.caches) && r.caches.includes("cookie"))
                    try {
                      (0, n.TV)(e, r.lookupCookie, t, r.cookieOptions);
                    } catch (e) {
                      r.debug && console.error("Failed to cache language:", e);
                    }
                })(e, a, t),
              a
            );
          },
          m = (e) => {
            let t = {
              ...l,
              ...e,
              cookieOptions: { ...l.cookieOptions, ...e.cookieOptions },
            };
            return (
              !(function (e) {
                if (!e.supportedLanguages.includes(e.fallbackLanguage))
                  throw Error(
                    "Fallback language must be included in supported languages",
                  );
                if (e.lookupFromPathIndex < 0)
                  throw Error("Path index must be non-negative");
                if (!e.order.every((e) => Object.keys(h).includes(e)))
                  throw Error("Invalid detector type in order array");
              })(t),
              async function (e, r) {
                try {
                  let r = f(e, t);
                  e.set("language", r);
                } catch (r) {
                  t.debug && console.error("Language detection failed:", r),
                    e.set("language", t.fallbackLanguage);
                }
                await r();
              }
            );
          },
          p = r(28964);
        function g() {
          return (g = Object.assign
            ? Object.assign.bind()
            : function (e) {
                for (var t = 1; t < arguments.length; t++) {
                  var r = arguments[t];
                  for (var n in r)
                    ({}).hasOwnProperty.call(r, n) && (e[n] = r[n]);
                }
                return e;
              }).apply(null, arguments);
        }
        var y = r(84147),
          w = r.n(y);
        function b(e, t) {
          var r;
          return (
            ("never" !== t.mode &&
              (null == (r = t.prefixes) ? void 0 : r[e])) ||
            "/" + e
          );
        }
        function v(e) {
          return e.includes("[[...");
        }
        function E(e) {
          return e.includes("[...");
        }
        function _(e) {
          return e.includes("[");
        }
        function S(e) {
          return "function" == typeof e.then;
        }
        var T = r(11084),
          A = r(29073),
          I = r(67700),
          C = r(15058);
        let P = "X-NEXT-INTL-LOCALE",
          R = (0, y.cache)(function () {
            return { locale: void 0 };
          });
        function N() {
          return R().locale;
        }
        let O = (0, y.cache)(async function () {
            let e = (0, C.b3)();
            return S(e) ? await e : e;
          }),
          H = (0, y.cache)(async function () {
            let e;
            try {
              e = (await O()).get(P) || void 0;
            } catch (e) {
              if (e instanceof Error && "DYNAMIC_SERVER_USAGE" === e.digest) {
                let t = Error(
                  "Usage of next-intl APIs in Server Components currently opts into dynamic rendering. This limitation will eventually be lifted, but as a stopgap solution, you can use the `setRequestLocale` API to enable static rendering, see https://next-intl.dev/docs/getting-started/app-router/with-i18n-routing#static-rendering",
                  { cause: e },
                );
                throw ((t.digest = e.digest), t);
              }
              throw e;
            }
            return e;
          });
        async function D() {
          return N() || (await H());
        }
        let B = (0, y.cache)(function () {
            let e;
            try {
              e = (0, C.b3)().get(P);
            } catch (e) {
              throw e instanceof Error && "DYNAMIC_SERVER_USAGE" === e.digest
                ? Error(
                    "Usage of next-intl APIs in Server Components currently opts into dynamic rendering. This limitation will eventually be lifted, but as a stopgap solution, you can use the `setRequestLocale` API to enable static rendering, see https://next-intl.dev/docs/getting-started/app-router/with-i18n-routing#static-rendering",
                    { cause: e },
                  )
                : e;
            }
            return (
              e ||
                (console.error(
                  "\nUnable to find `next-intl` locale because the middleware didn't run on this request. See https://next-intl.dev/docs/routing/middleware#unable-to-find-locale. The `notFound()` function will be called as a result.\n",
                ),
                (0, A.notFound)()),
              e
            );
          }),
          q = (e) => {
            "MISSING_MESSAGE" === e.code ||
              console.error("Translation error:", e);
          },
          M = ({ namespace: e, key: t, error: r }) => {
            let n =
              t.charAt(0).toUpperCase() + t.slice(1).replace(/([A-Z])/g, " $1");
            return e ? `${n}` : n;
          },
          j = async () => {
            let e,
              t = ((await (0, C.b3)()).get("x-current-path") || "")
                .split("/")
                .filter(Boolean)[0],
              n = p.IB.includes(t) ? t : p.q;
            try {
              switch (n) {
                case "en":
                  e = (await r.e(8517).then(r.t.bind(r, 28517, 19))).default;
                  break;
                case "ar":
                  e = (await r.e(9221).then(r.t.bind(r, 39221, 19))).default;
                  break;
                case "es":
                  e = (await r.e(4026).then(r.t.bind(r, 34026, 19))).default;
                  break;
                case "fr":
                  e = (await r.e(3586).then(r.t.bind(r, 53586, 19))).default;
                  break;
                default:
                  console.warn(
                    `Unexpected resolvedLocale: ${n}, loading default ${p.q} messages.`,
                  ),
                    (e = (await r(98728)(`./${p.q}.json`)).default);
              }
            } catch (t) {
              console.error(
                `Failed to load translations for ${n}, falling back to default. Error:`,
                t,
              );
              try {
                e = (await r(98728)(`./${p.q}.json`)).default;
              } catch (t) {
                console.error(
                  `Failed to load default locale messages for ${p.q}:`,
                  t,
                ),
                  (e = {
                    common: {
                      loading: "Loading...",
                      error: "An error occurred",
                    },
                  });
              }
            }
            let a = (0, p.XG)(n);
            return {
              locale: n,
              messages: e,
              timeZone: "UTC",
              now: new Date(),
              onError: q,
              getMessageFallback: M,
              formats: {
                dateTime: {
                  short: { day: "2-digit", month: "2-digit", year: "numeric" },
                  medium: { day: "numeric", month: "short", year: "numeric" },
                  long: { day: "numeric", month: "long", year: "numeric" },
                  full: {
                    weekday: "long",
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  },
                  time: {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: "en" === a.htmlLang,
                  },
                },
                number: {
                  precise: {
                    maximumFractionDigits: 2,
                    minimumFractionDigits: 2,
                  },
                  compact: { notation: "compact" },
                  percent: { style: "percent", maximumFractionDigits: 2 },
                  currency: { style: "currency", currency: "USD" },
                },
                list: {
                  enumeration: { style: "long", type: "conjunction" },
                  or: { style: "long", type: "disjunction" },
                },
                relative: {
                  days: { style: "long" },
                  quarters: { style: "long" },
                  months: { style: "long" },
                  years: { style: "long" },
                },
              },
            };
          },
          x = !1,
          L = !1,
          k = (0, y.cache)(function () {
            return new Date();
          }),
          U = (0, y.cache)(function () {
            return Intl.DateTimeFormat().resolvedOptions().timeZone;
          }),
          F = (0, y.cache)(async function (e, t) {
            if ("function" != typeof e)
              throw Error(
                "Invalid i18n request configuration detected.\n\nPlease verify that:\n1. In case you've specified a custom location in your Next.js config, make sure that the path is correct.\n2. You have a default export in your i18n request configuration file.\n\nSee also: https://next-intl.dev/docs/usage/configuration#i18n-request\n",
              );
            let r = {
                get locale() {
                  return (
                    L ||
                      (console.warn(
                        "\nThe `locale` parameter in `getRequestConfig` is deprecated, please switch to `await requestLocale`. See https://next-intl.dev/blog/next-intl-3-22#await-request-locale\n",
                      ),
                      (L = !0)),
                    t || N() || B()
                  );
                },
                get requestLocale() {
                  return t ? Promise.resolve(t) : D();
                },
              },
              n = e(r);
            S(n) && (n = await n);
            let a = n.locale;
            return (
              a ||
                (x ||
                  (console.error(
                    "\nA `locale` is expected to be returned from `getRequestConfig`, but none was returned. This will be an error in the next major version of next-intl.\n\nSee: https://next-intl.dev/blog/next-intl-3-22#await-request-locale\n",
                  ),
                  (x = !0)),
                (a = await r.requestLocale) ||
                  (console.error(
                    "\nUnable to find `next-intl` locale because the middleware didn't run on this request and no `locale` was returned in `getRequestConfig`. See https://next-intl.dev/docs/routing/middleware#unable-to-find-locale. The `notFound()` function will be called as a result.\n",
                  ),
                  (0, A.notFound)())),
              {
                ...n,
                locale: a,
                now: n.now || k(),
                timeZone: n.timeZone || U(),
              }
            );
          }),
          G = (0, y.cache)(I.CB),
          $ = (0, y.cache)(I.gZ),
          Y = (0, y.cache)(async function (e) {
            let t = await F(j, e);
            return { ...(0, I.TD)(t), _formatters: G($()) };
          }),
          V = (0, y.cache)(async function () {
            return Promise.resolve((await Y()).locale);
          });
        async function z(e) {
          let { locale: t, localePrefix: r, ...n } = e,
            a = t || (await V()),
            i = b(a, r);
          return w().createElement(
            T.default,
            g({ locale: a, localePrefixMode: r.mode, prefix: i }, n),
          );
        }
        function X(e) {
          return function (t) {
            let r,
              n = b(t.locale, t.localePrefix),
              a =
                "never" !== t.localePrefix.mode &&
                (function (e) {
                  return (
                    ("object" == typeof e
                      ? null == e.host && null == e.hostname
                      : !/^[a-z]+:/i.test(e)) &&
                    !(function (e) {
                      let t = "object" == typeof e ? e.pathname : e;
                      return null != t && !t.startsWith("/");
                    })(e)
                  );
                })(t.pathname)
                  ? ((i = n),
                    (s = t.pathname),
                    (r = i),
                    /^\/(\?.*)?$/.test(s) && (s = s.slice(1)),
                    (r += s))
                  : t.pathname;
            for (
              var i,
                s,
                o = arguments.length,
                c = Array(o > 1 ? o - 1 : 0),
                u = 1;
              u < o;
              u++
            )
              c[u - 1] = arguments[u];
            return e(a, ...c);
          };
        }
        let K = X(A.redirect),
          W = X(A.permanentRedirect);
        function Z(e) {
          return function (t) {
            let r = N() || B();
            for (
              var n = arguments.length, a = Array(n > 1 ? n - 1 : 0), i = 1;
              i < n;
              i++
            )
              a[i - 1] = arguments[i];
            return e({ ...t, locale: r }, ...a);
          };
        }
        let Q = Z(K),
          J = Z(W),
          {
            Link: ee,
            redirect: et,
            usePathname: er,
            useRouter: en,
          } = (function (e) {
            var t, r;
            let n =
                "object" == typeof (t = null == e ? void 0 : e.localePrefix)
                  ? t
                  : { mode: t || "always" },
              a = !(
                null != (r = null == e ? void 0 : e.localeCookie) && !r
              ) && {
                name: "NEXT_LOCALE",
                maxAge: 31536e3,
                sameSite: "lax",
                ...("object" == typeof r && r),
              };
            function i(e) {
              return () => {
                throw Error(
                  "`".concat(
                    e,
                    "` is not supported in Server Components. You can use this hook if you convert the component to a Client Component.",
                  ),
                );
              };
            }
            return {
              Link: function (e) {
                return w().createElement(
                  z,
                  g({ localeCookie: a, localePrefix: n }, e),
                );
              },
              redirect: function (e) {
                for (
                  var t = arguments.length, r = Array(t > 1 ? t - 1 : 0), a = 1;
                  a < t;
                  a++
                )
                  r[a - 1] = arguments[a];
                return Q({ pathname: e, localePrefix: n }, ...r);
              },
              permanentRedirect: function (e) {
                for (
                  var t = arguments.length, r = Array(t > 1 ? t - 1 : 0), a = 1;
                  a < t;
                  a++
                )
                  r[a - 1] = arguments[a];
                return J({ pathname: e, localePrefix: n }, ...r);
              },
              usePathname: i("usePathname"),
              useRouter: i("useRouter"),
            };
          })({ locales: p.IB });
        function ea(e = {}) {
          let t = m({
            ...{
              order: ["querystring", "cookie", "header", "path"],
              lookupQueryString: "lang",
              lookupCookie: "NEXT_LOCALE",
              lookupFromPathIndex: 0,
              lookupFromHeaderKey: "accept-language",
              ignoreCase: !0,
              supportedLanguages: [...p.IB],
              fallbackLanguage: p.q,
              caches: !1,
              cookieOptions: {
                sameSite: "Lax",
                secure: !0,
                maxAge: 31536e3,
                httpOnly: !0,
              },
            },
            ...e,
          });
          return async (e, r) => {
            await t(e, r);
            let n = e.get("language");
            e.set("locale", n), e.header("Content-Language", n);
          };
        }
        r(8914);
      },
      3295: (e) => {
        "use strict";
        e.exports = require("next/dist/server/app-render/after-task-async-storage.external.js");
      },
      5289: (e, t, r) => {
        "use strict";
        r.d(t, { T: () => n });
        var n = (e) => {
          let t = e?.query ?? "pretty";
          return async function (r, n) {
            let a = r.req.query(t) || "" === r.req.query(t);
            if (
              (await n(),
              a &&
                r.res.headers
                  .get("Content-Type")
                  ?.startsWith("application/json"))
            ) {
              let t = await r.res.json();
              r.res = new Response(
                JSON.stringify(t, null, e?.space ?? 2),
                r.res,
              );
            }
          };
        };
      },
      6743: (e, t, r) => {
        "use strict";
        r.d(t, { u: () => s });
        var n = r(77719),
          a = r(54016),
          i = r(58342);
        function s(e) {
          let t = i.Ik({ email: i.Yj().email(), password: i.Yj().min(6) }),
            r = i.Ik({
              email: i.Yj().email(),
              password: i.Yj().min(6),
              firstName: i.Yj().min(2).optional(),
              lastName: i.Yj().min(2).optional(),
            }),
            s = i.Ik({ email: i.Yj().email() }),
            o = () =>
              (0, n.createClient)(
                "http://localhost:54321",
                process.env.SUPABASE_SERVICE_ROLE_KEY || "",
              );
          return (
            e.post("/auth/login", async (e) => {
              try {
                let r = await e.req.json(),
                  n = t.safeParse(r);
                if (!n.success)
                  throw new a.y(400, { message: "Invalid login credentials" });
                let { email: i, password: s } = n.data,
                  c = o(),
                  { data: u, error: l } = await c.auth.signInWithPassword({
                    email: i,
                    password: s,
                  });
                if (l) throw l;
                return e.json({
                  success: !0,
                  session: u.session,
                  user: u.user,
                });
              } catch (e) {
                if ((console.error("Login error:", e), e instanceof a.y))
                  throw e;
                throw new a.y(401, { message: e.message || "Login failed" });
              }
            }),
            e.post("/auth/register", async (e) => {
              try {
                let t = await e.req.json(),
                  n = r.safeParse(t);
                if (!n.success)
                  throw new a.y(400, { message: "Invalid registration data" });
                let {
                    email: i,
                    password: s,
                    firstName: c,
                    lastName: u,
                  } = n.data,
                  l = o(),
                  { data: d, error: h } = await l.auth.signUp({
                    email: i,
                    password: s,
                  });
                if (h) throw h;
                if (d.user && (c || u)) {
                  let { error: e } = await l
                    .from("profiles")
                    .upsert({
                      id: d.user.id,
                      first_name: c,
                      last_name: u,
                      updated_at: new Date().toISOString(),
                    });
                  if (e) throw e;
                }
                return e.json({
                  success: !0,
                  message: "Registration successful",
                  user: d.user,
                });
              } catch (e) {
                if ((console.error("Registration error:", e), e instanceof a.y))
                  throw e;
                throw new a.y(400, {
                  message: e.message || "Registration failed",
                });
              }
            }),
            e.post("/auth/logout", async (e) => {
              try {
                let t = o(),
                  r = e.req.header("Authorization");
                return (
                  r?.startsWith("Bearer ") &&
                    (r.split(" ")[1],
                    await t.auth.signOut({ scope: "global" })),
                  e.json({ success: !0, message: "Logged out successfully" })
                );
              } catch (t) {
                return (
                  console.error("Logout error:", t),
                  e.json({ success: !0, message: "Logged out successfully" })
                );
              }
            }),
            e.post("/auth/reset-password", async (e) => {
              try {
                let t = await e.req.json(),
                  r = s.safeParse(t);
                if (!r.success)
                  throw new a.y(400, { message: "Invalid email" });
                let { email: n } = r.data,
                  i = o(),
                  { error: c } = await i.auth.resetPasswordForEmail(n, {
                    redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/reset-password`,
                  });
                if (c) throw c;
                return e.json({
                  success: !0,
                  message: "Password reset email sent",
                });
              } catch (t) {
                return (
                  console.error("Password reset error:", t),
                  e.json({
                    success: !0,
                    message:
                      "If the email exists, a password reset link has been sent",
                  })
                );
              }
            }),
            e
          );
        }
      },
      8086: (e) => {
        "use strict";
        e.exports = require("module");
      },
      8914: (e, t, r) => {
        "use strict";
        r.r(t),
          r.d(t, {
            useGlobalTranslate: () => s,
            useI18n: () => a,
            useTranslate: () => i,
          });
        var n = r(26394);
        let a = (0, n.registerClientReference)(
            function () {
              throw Error(
                "Attempted to call useI18n() from the server but useI18n is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
              );
            },
            "E:\\downloads\\Hijraah\\apps\\web\\src\\i18n\\hooks.ts",
            "useI18n",
          ),
          i = (0, n.registerClientReference)(
            function () {
              throw Error(
                "Attempted to call useTranslate() from the server but useTranslate is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
              );
            },
            "E:\\downloads\\Hijraah\\apps\\web\\src\\i18n\\hooks.ts",
            "useTranslate",
          ),
          s = (0, n.registerClientReference)(
            function () {
              throw Error(
                "Attempted to call useGlobalTranslate() from the server but useGlobalTranslate is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
              );
            },
            "E:\\downloads\\Hijraah\\apps\\web\\src\\i18n\\hooks.ts",
            "useGlobalTranslate",
          );
      },
      10846: (e) => {
        "use strict";
        e.exports = require("next/dist/compiled/next-server/app-page.runtime.prod.js");
      },
      11084: (e, t, r) => {
        "use strict";
        r.d(t, { default: () => n });
        let n = (0, r(26394).registerClientReference)(
          function () {
            throw Error(
              "Attempted to call the default export of \"E:\\\\downloads\\\\Hijraah\\\\node_modules\\\\.pnpm\\\\next-intl@3.26.5_next@15.3._7e4e666345518ee87977d0efacc37596\\\\node_modules\\\\next-intl\\\\dist\\\\esm\\\\navigation\\\\shared\\\\LegacyBaseLink.js\" from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\node_modules\\.pnpm\\next-intl@3.26.5_next@15.3._7e4e666345518ee87977d0efacc37596\\node_modules\\next-intl\\dist\\esm\\navigation\\shared\\LegacyBaseLink.js",
          "default",
        );
      },
      11595: (e, t, r) => {
        "use strict";
        r.d(t, { ZQ: () => f, vt: () => o });
        var n = r(38277),
          a = r(73346),
          i = r(26457);
        let s = a.Q.fromEnv();
        var o = (function (e) {
          return (
            (e.API = "api"),
            (e.SCRAPING = "scraping"),
            (e.VECTOR = "vector"),
            (e.RESEARCH = "research"),
            e
          );
        })({});
        let c = {
            ocr: {
              free: { requests: 50, window: 86400, tokens: 3 },
              pro: { requests: 500, window: 86400, tokens: 2 },
              enterprise: { requests: 5e3, window: 86400, tokens: 1 },
            },
            documentQA: {
              free: { requests: 20, window: 86400, tokens: 5 },
              pro: { requests: 200, window: 86400, tokens: 3 },
              enterprise: { requests: 2e3, window: 86400, tokens: 2 },
            },
            batchProcessing: {
              free: { requests: 5, window: 86400, tokens: 10 },
              pro: { requests: 50, window: 86400, tokens: 5 },
              enterprise: { requests: 500, window: 86400, tokens: 3 },
            },
            api: {
              free: { requests: 100, window: 60, tokens: 1 },
              pro: { requests: 500, window: 60, tokens: 1 },
              enterprise: { requests: 2e3, window: 60, tokens: 1 },
            },
            caseManagement: {
              free: { requests: 100, window: 60, tokens: 1 },
              pro: { requests: 500, window: 60, tokens: 1 },
              enterprise: { requests: 2e3, window: 60, tokens: 1 },
            },
            documentUpload: {
              free: { requests: 30, window: 60, tokens: 2 },
              pro: { requests: 100, window: 60, tokens: 1 },
              enterprise: { requests: 500, window: 60, tokens: 1 },
            },
          },
          u = {};
        for (let e in c) {
          u[e] = {};
          let t = c[e];
          if (t)
            for (let r in t)
              u[e][r] = (function (e, t) {
                let r = c[e];
                if (!r) return null;
                let a = r[t];
                return a
                  ? new n.Ratelimit({
                      redis: s,
                      limiter: n.Ratelimit.slidingWindow(
                        a.requests,
                        `${a.window} s`,
                      ),
                      analytics: !0,
                      prefix: `ratelimit:action:${e}:${t}`,
                    })
                  : null;
              })(e, r);
        }
        let l = {
            free: {
              api: { requests: 1e3, window: "1 h" },
              scraping: { requests: 100, window: "1 h" },
              vector: { requests: 100, window: "1 h" },
              research: { requests: 50, window: "1 h" },
            },
            pro: {
              api: { requests: 1e4, window: "1 h" },
              scraping: { requests: 1e3, window: "1 h" },
              vector: { requests: 1e3, window: "1 h" },
              research: { requests: 500, window: "1 h" },
            },
            enterprise: {
              api: { requests: 1e5, window: "1 h" },
              scraping: { requests: 1e4, window: "1 h" },
              vector: { requests: 1e4, window: "1 h" },
              research: { requests: 5e3, window: "1 h" },
            },
          },
          d = new Map();
        async function h(e, t) {
          try {
            let { data: r, error: n } = await e
              .from("subscriptions")
              .select("tier")
              .eq("user_id", t)
              .maybeSingle();
            if (n) throw n;
            if (!r || !r.tier) return "free";
            switch (r.tier.toLowerCase()) {
              case "pro":
              case "premium":
                return "pro";
              case "enterprise":
              case "business":
                return "enterprise";
              default:
                return "free";
            }
          } catch (e) {
            return (
              console.error(`Error getting user tier for ${t}:`, e), "free"
            );
          }
        }
        function f(e) {
          let { resourceType: t, errorMessage: r } = e;
          return async (e, a) => {
            let o = null,
              c = "anonymous",
              u = "free";
            try {
              if ((o = e.get("user")) && o.id) {
                c = o.id;
                try {
                  u = await h(i.ND, c);
                } catch (e) {
                  console.error("Error getting user tier:", e);
                }
              } else
                c =
                  e.req.header("x-forwarded-for") ||
                  e.req.header("x-real-ip") ||
                  "anonymous";
              let f = (function (e, t) {
                  let r = `${e}:${t}`;
                  if (d.has(r)) return d.get(r);
                  let { requests: a, window: i } = l[e][t],
                    o = new n.Ratelimit({
                      redis: s,
                      limiter: n.Ratelimit.slidingWindow(a, i),
                      prefix: `ratelimit:${e}:${t}`,
                      analytics: !0,
                    });
                  return d.set(r, o), o;
                })(u, t),
                m = await f.limit(c);
              if (
                (e.header("X-RateLimit-Limit", String(m.limit)),
                e.header("X-RateLimit-Remaining", String(m.remaining)),
                e.header(
                  "X-RateLimit-Reset",
                  String(Math.floor(m.reset / 1e3)),
                ),
                e.header("X-RateLimit-Tier", u),
                e.header("X-RateLimit-Resource", t),
                !m.success)
              )
                return e.json(
                  {
                    success: !1,
                    error: "Rate limit exceeded",
                    message:
                      r ||
                      `You have exceeded your ${t} request limit for your ${u} subscription.`,
                    details: {
                      tier: u,
                      resourceType: t,
                      limit: m.limit,
                      remaining: m.remaining,
                      reset: new Date(m.reset).toISOString(),
                    },
                  },
                  429,
                );
              await a(), m.pending && (await m.pending);
            } catch (e) {
              console.error(`Rate limiting error (Resource: ${t}):`, e),
                await a();
            }
          };
        }
      },
      11997: (e) => {
        "use strict";
        e.exports = require("punycode");
      },
      13597: (e, t, r) => {
        "use strict";
        r.d(t, {
          C6: () => a,
          Cl: () => i,
          Tt: () => s,
          fX: () => c,
          sH: () => o,
        });
        var n = function (e, t) {
          return (n =
            Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array &&
              function (e, t) {
                e.__proto__ = t;
              }) ||
            function (e, t) {
              for (var r in t)
                Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r]);
            })(e, t);
        };
        function a(e, t) {
          if ("function" != typeof t && null !== t)
            throw TypeError(
              "Class extends value " +
                String(t) +
                " is not a constructor or null",
            );
          function r() {
            this.constructor = e;
          }
          n(e, t),
            (e.prototype =
              null === t
                ? Object.create(t)
                : ((r.prototype = t.prototype), new r()));
        }
        var i = function () {
          return (i =
            Object.assign ||
            function (e) {
              for (var t, r = 1, n = arguments.length; r < n; r++)
                for (var a in (t = arguments[r]))
                  Object.prototype.hasOwnProperty.call(t, a) && (e[a] = t[a]);
              return e;
            }).apply(this, arguments);
        };
        function s(e, t) {
          var r = {};
          for (var n in e)
            Object.prototype.hasOwnProperty.call(e, n) &&
              0 > t.indexOf(n) &&
              (r[n] = e[n]);
          if (null != e && "function" == typeof Object.getOwnPropertySymbols)
            for (
              var a = 0, n = Object.getOwnPropertySymbols(e);
              a < n.length;
              a++
            )
              0 > t.indexOf(n[a]) &&
                Object.prototype.propertyIsEnumerable.call(e, n[a]) &&
                (r[n[a]] = e[n[a]]);
          return r;
        }
        function o(e, t, r, n) {
          return new (r || (r = Promise))(function (a, i) {
            function s(e) {
              try {
                c(n.next(e));
              } catch (e) {
                i(e);
              }
            }
            function o(e) {
              try {
                c(n.throw(e));
              } catch (e) {
                i(e);
              }
            }
            function c(e) {
              var t;
              e.done
                ? a(e.value)
                : ((t = e.value) instanceof r
                    ? t
                    : new r(function (e) {
                        e(t);
                      })
                  ).then(s, o);
            }
            c((n = n.apply(e, t || [])).next());
          });
        }
        Object.create;
        function c(e, t, r) {
          if (r || 2 == arguments.length)
            for (var n, a = 0, i = t.length; a < i; a++)
              (!n && a in t) ||
                (n || (n = Array.prototype.slice.call(t, 0, a)), (n[a] = t[a]));
          return e.concat(n || Array.prototype.slice.call(t));
        }
        Object.create, "function" == typeof SuppressedError && SuppressedError;
      },
      15934: (e, t, r) => {
        "use strict";
        r.d(t, { M: () => i });
        var n = r(28839);
        r(23897);
        var a = r(26457);
        async function i(e) {
          if (!e) return !1;
          try {
            let t = (0, a.nH)(),
              { data: r, error: n } = await t
                .from("admin_users")
                .select("is_admin")
                .eq("user_id", e)
                .maybeSingle();
            if (n)
              return (
                console.error(
                  `Error checking admin_users table for user ${e}:`,
                  n.message,
                ),
                !1
              );
            return !!r?.is_admin;
          } catch (t) {
            return (
              console.error(
                `Exception during admin status check for user ${e}:`,
                t.message,
              ),
              !1
            );
          }
        }
        (0, r(73557).D)([i]),
          (0, n.A)(i, "4055c9f9dce3c849928e65e87017b3609674121d00", null);
      },
      17030: (e, t, r) => {
        "use strict";
        r.r(t),
          r.d(t, {
            ErrorCode: () => c,
            FormatError: () => et,
            IntlMessageFormat: () => ec,
            InvalidValueError: () => er,
            InvalidValueTypeError: () => en,
            MissingValueError: () => ea,
            PART_TYPE: () => u,
            default: () => eu,
            formatToParts: () => es,
            isFormatXMLElementFn: () => ei,
          });
        var n,
          a,
          i,
          s,
          o,
          c,
          u,
          l = r(66715),
          d = r(20016);
        function h(e) {
          return e.type === a.literal;
        }
        function f(e) {
          return e.type === a.number;
        }
        function m(e) {
          return e.type === a.date;
        }
        function p(e) {
          return e.type === a.time;
        }
        function g(e) {
          return e.type === a.select;
        }
        function y(e) {
          return e.type === a.plural;
        }
        function w(e) {
          return e.type === a.tag;
        }
        function b(e) {
          return !!(e && "object" == typeof e && e.type === i.number);
        }
        function v(e) {
          return !!(e && "object" == typeof e && e.type === i.dateTime);
        }
        !(function (e) {
          (e[(e.EXPECT_ARGUMENT_CLOSING_BRACE = 1)] =
            "EXPECT_ARGUMENT_CLOSING_BRACE"),
            (e[(e.EMPTY_ARGUMENT = 2)] = "EMPTY_ARGUMENT"),
            (e[(e.MALFORMED_ARGUMENT = 3)] = "MALFORMED_ARGUMENT"),
            (e[(e.EXPECT_ARGUMENT_TYPE = 4)] = "EXPECT_ARGUMENT_TYPE"),
            (e[(e.INVALID_ARGUMENT_TYPE = 5)] = "INVALID_ARGUMENT_TYPE"),
            (e[(e.EXPECT_ARGUMENT_STYLE = 6)] = "EXPECT_ARGUMENT_STYLE"),
            (e[(e.INVALID_NUMBER_SKELETON = 7)] = "INVALID_NUMBER_SKELETON"),
            (e[(e.INVALID_DATE_TIME_SKELETON = 8)] =
              "INVALID_DATE_TIME_SKELETON"),
            (e[(e.EXPECT_NUMBER_SKELETON = 9)] = "EXPECT_NUMBER_SKELETON"),
            (e[(e.EXPECT_DATE_TIME_SKELETON = 10)] =
              "EXPECT_DATE_TIME_SKELETON"),
            (e[(e.UNCLOSED_QUOTE_IN_ARGUMENT_STYLE = 11)] =
              "UNCLOSED_QUOTE_IN_ARGUMENT_STYLE"),
            (e[(e.EXPECT_SELECT_ARGUMENT_OPTIONS = 12)] =
              "EXPECT_SELECT_ARGUMENT_OPTIONS"),
            (e[(e.EXPECT_PLURAL_ARGUMENT_OFFSET_VALUE = 13)] =
              "EXPECT_PLURAL_ARGUMENT_OFFSET_VALUE"),
            (e[(e.INVALID_PLURAL_ARGUMENT_OFFSET_VALUE = 14)] =
              "INVALID_PLURAL_ARGUMENT_OFFSET_VALUE"),
            (e[(e.EXPECT_SELECT_ARGUMENT_SELECTOR = 15)] =
              "EXPECT_SELECT_ARGUMENT_SELECTOR"),
            (e[(e.EXPECT_PLURAL_ARGUMENT_SELECTOR = 16)] =
              "EXPECT_PLURAL_ARGUMENT_SELECTOR"),
            (e[(e.EXPECT_SELECT_ARGUMENT_SELECTOR_FRAGMENT = 17)] =
              "EXPECT_SELECT_ARGUMENT_SELECTOR_FRAGMENT"),
            (e[(e.EXPECT_PLURAL_ARGUMENT_SELECTOR_FRAGMENT = 18)] =
              "EXPECT_PLURAL_ARGUMENT_SELECTOR_FRAGMENT"),
            (e[(e.INVALID_PLURAL_ARGUMENT_SELECTOR = 19)] =
              "INVALID_PLURAL_ARGUMENT_SELECTOR"),
            (e[(e.DUPLICATE_PLURAL_ARGUMENT_SELECTOR = 20)] =
              "DUPLICATE_PLURAL_ARGUMENT_SELECTOR"),
            (e[(e.DUPLICATE_SELECT_ARGUMENT_SELECTOR = 21)] =
              "DUPLICATE_SELECT_ARGUMENT_SELECTOR"),
            (e[(e.MISSING_OTHER_CLAUSE = 22)] = "MISSING_OTHER_CLAUSE"),
            (e[(e.INVALID_TAG = 23)] = "INVALID_TAG"),
            (e[(e.INVALID_TAG_NAME = 25)] = "INVALID_TAG_NAME"),
            (e[(e.UNMATCHED_CLOSING_TAG = 26)] = "UNMATCHED_CLOSING_TAG"),
            (e[(e.UNCLOSED_TAG = 27)] = "UNCLOSED_TAG");
        })(n || (n = {})),
          (function (e) {
            (e[(e.literal = 0)] = "literal"),
              (e[(e.argument = 1)] = "argument"),
              (e[(e.number = 2)] = "number"),
              (e[(e.date = 3)] = "date"),
              (e[(e.time = 4)] = "time"),
              (e[(e.select = 5)] = "select"),
              (e[(e.plural = 6)] = "plural"),
              (e[(e.pound = 7)] = "pound"),
              (e[(e.tag = 8)] = "tag");
          })(a || (a = {})),
          (function (e) {
            (e[(e.number = 0)] = "number"), (e[(e.dateTime = 1)] = "dateTime");
          })(i || (i = {}));
        var E = /[ \xA0\u1680\u2000-\u200A\u202F\u205F\u3000]/,
          _ =
            /(?:[Eec]{1,6}|G{1,5}|[Qq]{1,5}|(?:[yYur]+|U{1,5})|[ML]{1,5}|d{1,2}|D{1,3}|F{1}|[abB]{1,5}|[hkHK]{1,2}|w{1,2}|W{1}|m{1,2}|s{1,2}|[zZOvVxX]{1,4})(?=([^']*'[^']*')*[^']*$)/g,
          S = /[\t-\r \x85\u200E\u200F\u2028\u2029]/i,
          T = /^\.(?:(0+)(\*)?|(#+)|(0+)(#+))$/g,
          A = /^(@+)?(\+|#+)?[rs]?$/g,
          I = /(\*)(0+)|(#+)(0+)|(0+)/g,
          C = /^(0+)$/;
        function P(e) {
          var t = {};
          return (
            "r" === e[e.length - 1]
              ? (t.roundingPriority = "morePrecision")
              : "s" === e[e.length - 1] &&
                (t.roundingPriority = "lessPrecision"),
            e.replace(A, function (e, r, n) {
              return (
                "string" != typeof n
                  ? ((t.minimumSignificantDigits = r.length),
                    (t.maximumSignificantDigits = r.length))
                  : "+" === n
                    ? (t.minimumSignificantDigits = r.length)
                    : "#" === r[0]
                      ? (t.maximumSignificantDigits = r.length)
                      : ((t.minimumSignificantDigits = r.length),
                        (t.maximumSignificantDigits =
                          r.length + ("string" == typeof n ? n.length : 0))),
                ""
              );
            }),
            t
          );
        }
        function R(e) {
          switch (e) {
            case "sign-auto":
              return { signDisplay: "auto" };
            case "sign-accounting":
            case "()":
              return { currencySign: "accounting" };
            case "sign-always":
            case "+!":
              return { signDisplay: "always" };
            case "sign-accounting-always":
            case "()!":
              return { signDisplay: "always", currencySign: "accounting" };
            case "sign-except-zero":
            case "+?":
              return { signDisplay: "exceptZero" };
            case "sign-accounting-except-zero":
            case "()?":
              return { signDisplay: "exceptZero", currencySign: "accounting" };
            case "sign-never":
            case "+_":
              return { signDisplay: "never" };
          }
        }
        function N(e) {
          var t = R(e);
          return t || {};
        }
        var O = {
            "001": ["H", "h"],
            419: ["h", "H", "hB", "hb"],
            AC: ["H", "h", "hb", "hB"],
            AD: ["H", "hB"],
            AE: ["h", "hB", "hb", "H"],
            AF: ["H", "hb", "hB", "h"],
            AG: ["h", "hb", "H", "hB"],
            AI: ["H", "h", "hb", "hB"],
            AL: ["h", "H", "hB"],
            AM: ["H", "hB"],
            AO: ["H", "hB"],
            AR: ["h", "H", "hB", "hb"],
            AS: ["h", "H"],
            AT: ["H", "hB"],
            AU: ["h", "hb", "H", "hB"],
            AW: ["H", "hB"],
            AX: ["H"],
            AZ: ["H", "hB", "h"],
            BA: ["H", "hB", "h"],
            BB: ["h", "hb", "H", "hB"],
            BD: ["h", "hB", "H"],
            BE: ["H", "hB"],
            BF: ["H", "hB"],
            BG: ["H", "hB", "h"],
            BH: ["h", "hB", "hb", "H"],
            BI: ["H", "h"],
            BJ: ["H", "hB"],
            BL: ["H", "hB"],
            BM: ["h", "hb", "H", "hB"],
            BN: ["hb", "hB", "h", "H"],
            BO: ["h", "H", "hB", "hb"],
            BQ: ["H"],
            BR: ["H", "hB"],
            BS: ["h", "hb", "H", "hB"],
            BT: ["h", "H"],
            BW: ["H", "h", "hb", "hB"],
            BY: ["H", "h"],
            BZ: ["H", "h", "hb", "hB"],
            CA: ["h", "hb", "H", "hB"],
            CC: ["H", "h", "hb", "hB"],
            CD: ["hB", "H"],
            CF: ["H", "h", "hB"],
            CG: ["H", "hB"],
            CH: ["H", "hB", "h"],
            CI: ["H", "hB"],
            CK: ["H", "h", "hb", "hB"],
            CL: ["h", "H", "hB", "hb"],
            CM: ["H", "h", "hB"],
            CN: ["H", "hB", "hb", "h"],
            CO: ["h", "H", "hB", "hb"],
            CP: ["H"],
            CR: ["h", "H", "hB", "hb"],
            CU: ["h", "H", "hB", "hb"],
            CV: ["H", "hB"],
            CW: ["H", "hB"],
            CX: ["H", "h", "hb", "hB"],
            CY: ["h", "H", "hb", "hB"],
            CZ: ["H"],
            DE: ["H", "hB"],
            DG: ["H", "h", "hb", "hB"],
            DJ: ["h", "H"],
            DK: ["H"],
            DM: ["h", "hb", "H", "hB"],
            DO: ["h", "H", "hB", "hb"],
            DZ: ["h", "hB", "hb", "H"],
            EA: ["H", "h", "hB", "hb"],
            EC: ["h", "H", "hB", "hb"],
            EE: ["H", "hB"],
            EG: ["h", "hB", "hb", "H"],
            EH: ["h", "hB", "hb", "H"],
            ER: ["h", "H"],
            ES: ["H", "hB", "h", "hb"],
            ET: ["hB", "hb", "h", "H"],
            FI: ["H"],
            FJ: ["h", "hb", "H", "hB"],
            FK: ["H", "h", "hb", "hB"],
            FM: ["h", "hb", "H", "hB"],
            FO: ["H", "h"],
            FR: ["H", "hB"],
            GA: ["H", "hB"],
            GB: ["H", "h", "hb", "hB"],
            GD: ["h", "hb", "H", "hB"],
            GE: ["H", "hB", "h"],
            GF: ["H", "hB"],
            GG: ["H", "h", "hb", "hB"],
            GH: ["h", "H"],
            GI: ["H", "h", "hb", "hB"],
            GL: ["H", "h"],
            GM: ["h", "hb", "H", "hB"],
            GN: ["H", "hB"],
            GP: ["H", "hB"],
            GQ: ["H", "hB", "h", "hb"],
            GR: ["h", "H", "hb", "hB"],
            GT: ["h", "H", "hB", "hb"],
            GU: ["h", "hb", "H", "hB"],
            GW: ["H", "hB"],
            GY: ["h", "hb", "H", "hB"],
            HK: ["h", "hB", "hb", "H"],
            HN: ["h", "H", "hB", "hb"],
            HR: ["H", "hB"],
            HU: ["H", "h"],
            IC: ["H", "h", "hB", "hb"],
            ID: ["H"],
            IE: ["H", "h", "hb", "hB"],
            IL: ["H", "hB"],
            IM: ["H", "h", "hb", "hB"],
            IN: ["h", "H"],
            IO: ["H", "h", "hb", "hB"],
            IQ: ["h", "hB", "hb", "H"],
            IR: ["hB", "H"],
            IS: ["H"],
            IT: ["H", "hB"],
            JE: ["H", "h", "hb", "hB"],
            JM: ["h", "hb", "H", "hB"],
            JO: ["h", "hB", "hb", "H"],
            JP: ["H", "K", "h"],
            KE: ["hB", "hb", "H", "h"],
            KG: ["H", "h", "hB", "hb"],
            KH: ["hB", "h", "H", "hb"],
            KI: ["h", "hb", "H", "hB"],
            KM: ["H", "h", "hB", "hb"],
            KN: ["h", "hb", "H", "hB"],
            KP: ["h", "H", "hB", "hb"],
            KR: ["h", "H", "hB", "hb"],
            KW: ["h", "hB", "hb", "H"],
            KY: ["h", "hb", "H", "hB"],
            KZ: ["H", "hB"],
            LA: ["H", "hb", "hB", "h"],
            LB: ["h", "hB", "hb", "H"],
            LC: ["h", "hb", "H", "hB"],
            LI: ["H", "hB", "h"],
            LK: ["H", "h", "hB", "hb"],
            LR: ["h", "hb", "H", "hB"],
            LS: ["h", "H"],
            LT: ["H", "h", "hb", "hB"],
            LU: ["H", "h", "hB"],
            LV: ["H", "hB", "hb", "h"],
            LY: ["h", "hB", "hb", "H"],
            MA: ["H", "h", "hB", "hb"],
            MC: ["H", "hB"],
            MD: ["H", "hB"],
            ME: ["H", "hB", "h"],
            MF: ["H", "hB"],
            MG: ["H", "h"],
            MH: ["h", "hb", "H", "hB"],
            MK: ["H", "h", "hb", "hB"],
            ML: ["H"],
            MM: ["hB", "hb", "H", "h"],
            MN: ["H", "h", "hb", "hB"],
            MO: ["h", "hB", "hb", "H"],
            MP: ["h", "hb", "H", "hB"],
            MQ: ["H", "hB"],
            MR: ["h", "hB", "hb", "H"],
            MS: ["H", "h", "hb", "hB"],
            MT: ["H", "h"],
            MU: ["H", "h"],
            MV: ["H", "h"],
            MW: ["h", "hb", "H", "hB"],
            MX: ["h", "H", "hB", "hb"],
            MY: ["hb", "hB", "h", "H"],
            MZ: ["H", "hB"],
            NA: ["h", "H", "hB", "hb"],
            NC: ["H", "hB"],
            NE: ["H"],
            NF: ["H", "h", "hb", "hB"],
            NG: ["H", "h", "hb", "hB"],
            NI: ["h", "H", "hB", "hb"],
            NL: ["H", "hB"],
            NO: ["H", "h"],
            NP: ["H", "h", "hB"],
            NR: ["H", "h", "hb", "hB"],
            NU: ["H", "h", "hb", "hB"],
            NZ: ["h", "hb", "H", "hB"],
            OM: ["h", "hB", "hb", "H"],
            PA: ["h", "H", "hB", "hb"],
            PE: ["h", "H", "hB", "hb"],
            PF: ["H", "h", "hB"],
            PG: ["h", "H"],
            PH: ["h", "hB", "hb", "H"],
            PK: ["h", "hB", "H"],
            PL: ["H", "h"],
            PM: ["H", "hB"],
            PN: ["H", "h", "hb", "hB"],
            PR: ["h", "H", "hB", "hb"],
            PS: ["h", "hB", "hb", "H"],
            PT: ["H", "hB"],
            PW: ["h", "H"],
            PY: ["h", "H", "hB", "hb"],
            QA: ["h", "hB", "hb", "H"],
            RE: ["H", "hB"],
            RO: ["H", "hB"],
            RS: ["H", "hB", "h"],
            RU: ["H"],
            RW: ["H", "h"],
            SA: ["h", "hB", "hb", "H"],
            SB: ["h", "hb", "H", "hB"],
            SC: ["H", "h", "hB"],
            SD: ["h", "hB", "hb", "H"],
            SE: ["H"],
            SG: ["h", "hb", "H", "hB"],
            SH: ["H", "h", "hb", "hB"],
            SI: ["H", "hB"],
            SJ: ["H"],
            SK: ["H"],
            SL: ["h", "hb", "H", "hB"],
            SM: ["H", "h", "hB"],
            SN: ["H", "h", "hB"],
            SO: ["h", "H"],
            SR: ["H", "hB"],
            SS: ["h", "hb", "H", "hB"],
            ST: ["H", "hB"],
            SV: ["h", "H", "hB", "hb"],
            SX: ["H", "h", "hb", "hB"],
            SY: ["h", "hB", "hb", "H"],
            SZ: ["h", "hb", "H", "hB"],
            TA: ["H", "h", "hb", "hB"],
            TC: ["h", "hb", "H", "hB"],
            TD: ["h", "H", "hB"],
            TF: ["H", "h", "hB"],
            TG: ["H", "hB"],
            TH: ["H", "h"],
            TJ: ["H", "h"],
            TL: ["H", "hB", "hb", "h"],
            TM: ["H", "h"],
            TN: ["h", "hB", "hb", "H"],
            TO: ["h", "H"],
            TR: ["H", "hB"],
            TT: ["h", "hb", "H", "hB"],
            TW: ["hB", "hb", "h", "H"],
            TZ: ["hB", "hb", "H", "h"],
            UA: ["H", "hB", "h"],
            UG: ["hB", "hb", "H", "h"],
            UM: ["h", "hb", "H", "hB"],
            US: ["h", "hb", "H", "hB"],
            UY: ["h", "H", "hB", "hb"],
            UZ: ["H", "hB", "h"],
            VA: ["H", "h", "hB"],
            VC: ["h", "hb", "H", "hB"],
            VE: ["h", "H", "hB", "hb"],
            VG: ["h", "hb", "H", "hB"],
            VI: ["h", "hb", "H", "hB"],
            VN: ["H", "h"],
            VU: ["h", "H"],
            WF: ["H", "hB"],
            WS: ["h", "H"],
            XK: ["H", "hB", "h"],
            YE: ["h", "hB", "hb", "H"],
            YT: ["H", "hB"],
            ZA: ["H", "h", "hb", "hB"],
            ZM: ["h", "hb", "H", "hB"],
            ZW: ["H", "h"],
            "af-ZA": ["H", "h", "hB", "hb"],
            "ar-001": ["h", "hB", "hb", "H"],
            "ca-ES": ["H", "h", "hB"],
            "en-001": ["h", "hb", "H", "hB"],
            "en-HK": ["h", "hb", "H", "hB"],
            "en-IL": ["H", "h", "hb", "hB"],
            "en-MY": ["h", "hb", "H", "hB"],
            "es-BR": ["H", "h", "hB", "hb"],
            "es-ES": ["H", "h", "hB", "hb"],
            "es-GQ": ["H", "h", "hB", "hb"],
            "fr-CA": ["H", "h", "hB"],
            "gl-ES": ["H", "h", "hB"],
            "gu-IN": ["hB", "hb", "h", "H"],
            "hi-IN": ["hB", "h", "H"],
            "it-CH": ["H", "h", "hB"],
            "it-IT": ["H", "h", "hB"],
            "kn-IN": ["hB", "h", "H"],
            "ml-IN": ["hB", "h", "H"],
            "mr-IN": ["hB", "hb", "h", "H"],
            "pa-IN": ["hB", "hb", "h", "H"],
            "ta-IN": ["hB", "h", "hb", "H"],
            "te-IN": ["hB", "h", "H"],
            "zu-ZA": ["H", "hB", "hb", "h"],
          },
          H = new RegExp("^".concat(E.source, "*")),
          D = new RegExp("".concat(E.source, "*$"));
        function B(e, t) {
          return { start: e, end: t };
        }
        var q = !!String.prototype.startsWith && "_a".startsWith("a", 1),
          M = !!String.fromCodePoint,
          j = !!Object.fromEntries,
          x = !!String.prototype.codePointAt,
          L = !!String.prototype.trimStart,
          k = !!String.prototype.trimEnd,
          U = Number.isSafeInteger
            ? Number.isSafeInteger
            : function (e) {
                return (
                  "number" == typeof e &&
                  isFinite(e) &&
                  Math.floor(e) === e &&
                  0x1fffffffffffff >= Math.abs(e)
                );
              },
          F = !0;
        try {
          F =
            (null ==
            (s = K("([^\\p{White_Space}\\p{Pattern_Syntax}]*)", "yu").exec("a"))
              ? void 0
              : s[0]) === "a";
        } catch (e) {
          F = !1;
        }
        var G = q
            ? function (e, t, r) {
                return e.startsWith(t, r);
              }
            : function (e, t, r) {
                return e.slice(r, r + t.length) === t;
              },
          $ = M
            ? String.fromCodePoint
            : function () {
                for (var e, t = [], r = 0; r < arguments.length; r++)
                  t[r] = arguments[r];
                for (var n = "", a = t.length, i = 0; a > i; ) {
                  if ((e = t[i++]) > 1114111)
                    throw RangeError(e + " is not a valid code point");
                  n +=
                    e < 65536
                      ? String.fromCharCode(e)
                      : String.fromCharCode(
                          ((e -= 65536) >> 10) + 55296,
                          (e % 1024) + 56320,
                        );
                }
                return n;
              },
          Y = j
            ? Object.fromEntries
            : function (e) {
                for (var t = {}, r = 0; r < e.length; r++) {
                  var n = e[r],
                    a = n[0],
                    i = n[1];
                  t[a] = i;
                }
                return t;
              },
          V = x
            ? function (e, t) {
                return e.codePointAt(t);
              }
            : function (e, t) {
                var r,
                  n = e.length;
                if (!(t < 0) && !(t >= n)) {
                  var a = e.charCodeAt(t);
                  return a < 55296 ||
                    a > 56319 ||
                    t + 1 === n ||
                    (r = e.charCodeAt(t + 1)) < 56320 ||
                    r > 57343
                    ? a
                    : ((a - 55296) << 10) + (r - 56320) + 65536;
                }
              },
          z = L
            ? function (e) {
                return e.trimStart();
              }
            : function (e) {
                return e.replace(H, "");
              },
          X = k
            ? function (e) {
                return e.trimEnd();
              }
            : function (e) {
                return e.replace(D, "");
              };
        function K(e, t) {
          return new RegExp(e, t);
        }
        if (F) {
          var W = K("([^\\p{White_Space}\\p{Pattern_Syntax}]*)", "yu");
          o = function (e, t) {
            var r;
            return (W.lastIndex = t), null != (r = W.exec(e)[1]) ? r : "";
          };
        } else
          o = function (e, t) {
            for (var r = []; ; ) {
              var n,
                a = V(e, t);
              if (
                void 0 === a ||
                J(a) ||
                ((n = a) >= 33 && n <= 35) ||
                36 === n ||
                (n >= 37 && n <= 39) ||
                40 === n ||
                41 === n ||
                42 === n ||
                43 === n ||
                44 === n ||
                45 === n ||
                (n >= 46 && n <= 47) ||
                (n >= 58 && n <= 59) ||
                (n >= 60 && n <= 62) ||
                (n >= 63 && n <= 64) ||
                91 === n ||
                92 === n ||
                93 === n ||
                94 === n ||
                96 === n ||
                123 === n ||
                124 === n ||
                125 === n ||
                126 === n ||
                161 === n ||
                (n >= 162 && n <= 165) ||
                166 === n ||
                167 === n ||
                169 === n ||
                171 === n ||
                172 === n ||
                174 === n ||
                176 === n ||
                177 === n ||
                182 === n ||
                187 === n ||
                191 === n ||
                215 === n ||
                247 === n ||
                (n >= 8208 && n <= 8213) ||
                (n >= 8214 && n <= 8215) ||
                8216 === n ||
                8217 === n ||
                8218 === n ||
                (n >= 8219 && n <= 8220) ||
                8221 === n ||
                8222 === n ||
                8223 === n ||
                (n >= 8224 && n <= 8231) ||
                (n >= 8240 && n <= 8248) ||
                8249 === n ||
                8250 === n ||
                (n >= 8251 && n <= 8254) ||
                (n >= 8257 && n <= 8259) ||
                8260 === n ||
                8261 === n ||
                8262 === n ||
                (n >= 8263 && n <= 8273) ||
                8274 === n ||
                8275 === n ||
                (n >= 8277 && n <= 8286) ||
                (n >= 8592 && n <= 8596) ||
                (n >= 8597 && n <= 8601) ||
                (n >= 8602 && n <= 8603) ||
                (n >= 8604 && n <= 8607) ||
                8608 === n ||
                (n >= 8609 && n <= 8610) ||
                8611 === n ||
                (n >= 8612 && n <= 8613) ||
                8614 === n ||
                (n >= 8615 && n <= 8621) ||
                8622 === n ||
                (n >= 8623 && n <= 8653) ||
                (n >= 8654 && n <= 8655) ||
                (n >= 8656 && n <= 8657) ||
                8658 === n ||
                8659 === n ||
                8660 === n ||
                (n >= 8661 && n <= 8691) ||
                (n >= 8692 && n <= 8959) ||
                (n >= 8960 && n <= 8967) ||
                8968 === n ||
                8969 === n ||
                8970 === n ||
                8971 === n ||
                (n >= 8972 && n <= 8991) ||
                (n >= 8992 && n <= 8993) ||
                (n >= 8994 && n <= 9e3) ||
                9001 === n ||
                9002 === n ||
                (n >= 9003 && n <= 9083) ||
                9084 === n ||
                (n >= 9085 && n <= 9114) ||
                (n >= 9115 && n <= 9139) ||
                (n >= 9140 && n <= 9179) ||
                (n >= 9180 && n <= 9185) ||
                (n >= 9186 && n <= 9254) ||
                (n >= 9255 && n <= 9279) ||
                (n >= 9280 && n <= 9290) ||
                (n >= 9291 && n <= 9311) ||
                (n >= 9472 && n <= 9654) ||
                9655 === n ||
                (n >= 9656 && n <= 9664) ||
                9665 === n ||
                (n >= 9666 && n <= 9719) ||
                (n >= 9720 && n <= 9727) ||
                (n >= 9728 && n <= 9838) ||
                9839 === n ||
                (n >= 9840 && n <= 10087) ||
                10088 === n ||
                10089 === n ||
                10090 === n ||
                10091 === n ||
                10092 === n ||
                10093 === n ||
                10094 === n ||
                10095 === n ||
                10096 === n ||
                10097 === n ||
                10098 === n ||
                10099 === n ||
                10100 === n ||
                10101 === n ||
                (n >= 10132 && n <= 10175) ||
                (n >= 10176 && n <= 10180) ||
                10181 === n ||
                10182 === n ||
                (n >= 10183 && n <= 10213) ||
                10214 === n ||
                10215 === n ||
                10216 === n ||
                10217 === n ||
                10218 === n ||
                10219 === n ||
                10220 === n ||
                10221 === n ||
                10222 === n ||
                10223 === n ||
                (n >= 10224 && n <= 10239) ||
                (n >= 10240 && n <= 10495) ||
                (n >= 10496 && n <= 10626) ||
                10627 === n ||
                10628 === n ||
                10629 === n ||
                10630 === n ||
                10631 === n ||
                10632 === n ||
                10633 === n ||
                10634 === n ||
                10635 === n ||
                10636 === n ||
                10637 === n ||
                10638 === n ||
                10639 === n ||
                10640 === n ||
                10641 === n ||
                10642 === n ||
                10643 === n ||
                10644 === n ||
                10645 === n ||
                10646 === n ||
                10647 === n ||
                10648 === n ||
                (n >= 10649 && n <= 10711) ||
                10712 === n ||
                10713 === n ||
                10714 === n ||
                10715 === n ||
                (n >= 10716 && n <= 10747) ||
                10748 === n ||
                10749 === n ||
                (n >= 10750 && n <= 11007) ||
                (n >= 11008 && n <= 11055) ||
                (n >= 11056 && n <= 11076) ||
                (n >= 11077 && n <= 11078) ||
                (n >= 11079 && n <= 11084) ||
                (n >= 11085 && n <= 11123) ||
                (n >= 11124 && n <= 11125) ||
                (n >= 11126 && n <= 11157) ||
                11158 === n ||
                (n >= 11159 && n <= 11263) ||
                (n >= 11776 && n <= 11777) ||
                11778 === n ||
                11779 === n ||
                11780 === n ||
                11781 === n ||
                (n >= 11782 && n <= 11784) ||
                11785 === n ||
                11786 === n ||
                11787 === n ||
                11788 === n ||
                11789 === n ||
                (n >= 11790 && n <= 11798) ||
                11799 === n ||
                (n >= 11800 && n <= 11801) ||
                11802 === n ||
                11803 === n ||
                11804 === n ||
                11805 === n ||
                (n >= 11806 && n <= 11807) ||
                11808 === n ||
                11809 === n ||
                11810 === n ||
                11811 === n ||
                11812 === n ||
                11813 === n ||
                11814 === n ||
                11815 === n ||
                11816 === n ||
                11817 === n ||
                (n >= 11818 && n <= 11822) ||
                11823 === n ||
                (n >= 11824 && n <= 11833) ||
                (n >= 11834 && n <= 11835) ||
                (n >= 11836 && n <= 11839) ||
                11840 === n ||
                11841 === n ||
                11842 === n ||
                (n >= 11843 && n <= 11855) ||
                (n >= 11856 && n <= 11857) ||
                11858 === n ||
                (n >= 11859 && n <= 11903) ||
                (n >= 12289 && n <= 12291) ||
                12296 === n ||
                12297 === n ||
                12298 === n ||
                12299 === n ||
                12300 === n ||
                12301 === n ||
                12302 === n ||
                12303 === n ||
                12304 === n ||
                12305 === n ||
                (n >= 12306 && n <= 12307) ||
                12308 === n ||
                12309 === n ||
                12310 === n ||
                12311 === n ||
                12312 === n ||
                12313 === n ||
                12314 === n ||
                12315 === n ||
                12316 === n ||
                12317 === n ||
                (n >= 12318 && n <= 12319) ||
                12320 === n ||
                12336 === n ||
                64830 === n ||
                64831 === n ||
                (n >= 65093 && n <= 65094)
              )
                break;
              r.push(a), (t += a >= 65536 ? 2 : 1);
            }
            return $.apply(void 0, r);
          };
        var Z = (function () {
          function e(e, t) {
            void 0 === t && (t = {}),
              (this.message = e),
              (this.position = { offset: 0, line: 1, column: 1 }),
              (this.ignoreTag = !!t.ignoreTag),
              (this.locale = t.locale),
              (this.requiresOtherClause = !!t.requiresOtherClause),
              (this.shouldParseSkeletons = !!t.shouldParseSkeletons);
          }
          return (
            (e.prototype.parse = function () {
              if (0 !== this.offset())
                throw Error("parser can only be used once");
              return this.parseMessage(0, "", !1);
            }),
            (e.prototype.parseMessage = function (e, t, r) {
              for (var i = []; !this.isEOF(); ) {
                var s = this.char();
                if (123 === s) {
                  var o = this.parseArgument(e, r);
                  if (o.err) return o;
                  i.push(o.val);
                } else if (125 === s && e > 0) break;
                else if (
                  35 === s &&
                  ("plural" === t || "selectordinal" === t)
                ) {
                  var c = this.clonePosition();
                  this.bump(),
                    i.push({
                      type: a.pound,
                      location: B(c, this.clonePosition()),
                    });
                } else if (60 !== s || this.ignoreTag || 47 !== this.peek())
                  if (60 === s && !this.ignoreTag && Q(this.peek() || 0)) {
                    var o = this.parseTag(e, t);
                    if (o.err) return o;
                    i.push(o.val);
                  } else {
                    var o = this.parseLiteral(e, t);
                    if (o.err) return o;
                    i.push(o.val);
                  }
                else if (!r)
                  return this.error(
                    n.UNMATCHED_CLOSING_TAG,
                    B(this.clonePosition(), this.clonePosition()),
                  );
                else break;
              }
              return { val: i, err: null };
            }),
            (e.prototype.parseTag = function (e, t) {
              var r = this.clonePosition();
              this.bump();
              var i = this.parseTagName();
              if ((this.bumpSpace(), this.bumpIf("/>")))
                return {
                  val: {
                    type: a.literal,
                    value: "<".concat(i, "/>"),
                    location: B(r, this.clonePosition()),
                  },
                  err: null,
                };
              if (!this.bumpIf(">"))
                return this.error(n.INVALID_TAG, B(r, this.clonePosition()));
              var s = this.parseMessage(e + 1, t, !0);
              if (s.err) return s;
              var o = s.val,
                c = this.clonePosition();
              if (!this.bumpIf("</"))
                return this.error(n.UNCLOSED_TAG, B(r, this.clonePosition()));
              if (this.isEOF() || !Q(this.char()))
                return this.error(n.INVALID_TAG, B(c, this.clonePosition()));
              var u = this.clonePosition();
              return i !== this.parseTagName()
                ? this.error(
                    n.UNMATCHED_CLOSING_TAG,
                    B(u, this.clonePosition()),
                  )
                : (this.bumpSpace(), this.bumpIf(">"))
                  ? {
                      val: {
                        type: a.tag,
                        value: i,
                        children: o,
                        location: B(r, this.clonePosition()),
                      },
                      err: null,
                    }
                  : this.error(n.INVALID_TAG, B(c, this.clonePosition()));
            }),
            (e.prototype.parseTagName = function () {
              var e,
                t = this.offset();
              for (
                this.bump();
                !this.isEOF() &&
                (45 === (e = this.char()) ||
                  46 === e ||
                  (e >= 48 && e <= 57) ||
                  95 === e ||
                  (e >= 97 && e <= 122) ||
                  (e >= 65 && e <= 90) ||
                  183 == e ||
                  (e >= 192 && e <= 214) ||
                  (e >= 216 && e <= 246) ||
                  (e >= 248 && e <= 893) ||
                  (e >= 895 && e <= 8191) ||
                  (e >= 8204 && e <= 8205) ||
                  (e >= 8255 && e <= 8256) ||
                  (e >= 8304 && e <= 8591) ||
                  (e >= 11264 && e <= 12271) ||
                  (e >= 12289 && e <= 55295) ||
                  (e >= 63744 && e <= 64975) ||
                  (e >= 65008 && e <= 65533) ||
                  (e >= 65536 && e <= 983039));

              )
                this.bump();
              return this.message.slice(t, this.offset());
            }),
            (e.prototype.parseLiteral = function (e, t) {
              for (var r = this.clonePosition(), n = ""; ; ) {
                var i = this.tryParseQuote(t);
                if (i) {
                  n += i;
                  continue;
                }
                var s = this.tryParseUnquoted(e, t);
                if (s) {
                  n += s;
                  continue;
                }
                var o = this.tryParseLeftAngleBracket();
                if (o) {
                  n += o;
                  continue;
                }
                break;
              }
              var c = B(r, this.clonePosition());
              return {
                val: { type: a.literal, value: n, location: c },
                err: null,
              };
            }),
            (e.prototype.tryParseLeftAngleBracket = function () {
              var e;
              return this.isEOF() ||
                60 !== this.char() ||
                (!this.ignoreTag && (Q((e = this.peek() || 0)) || 47 === e))
                ? null
                : (this.bump(), "<");
            }),
            (e.prototype.tryParseQuote = function (e) {
              if (this.isEOF() || 39 !== this.char()) return null;
              switch (this.peek()) {
                case 39:
                  return this.bump(), this.bump(), "'";
                case 123:
                case 60:
                case 62:
                case 125:
                  break;
                case 35:
                  if ("plural" === e || "selectordinal" === e) break;
                  return null;
                default:
                  return null;
              }
              this.bump();
              var t = [this.char()];
              for (this.bump(); !this.isEOF(); ) {
                var r = this.char();
                if (39 === r)
                  if (39 === this.peek()) t.push(39), this.bump();
                  else {
                    this.bump();
                    break;
                  }
                else t.push(r);
                this.bump();
              }
              return $.apply(void 0, t);
            }),
            (e.prototype.tryParseUnquoted = function (e, t) {
              if (this.isEOF()) return null;
              var r = this.char();
              return 60 === r ||
                123 === r ||
                (35 === r && ("plural" === t || "selectordinal" === t)) ||
                (125 === r && e > 0)
                ? null
                : (this.bump(), $(r));
            }),
            (e.prototype.parseArgument = function (e, t) {
              var r = this.clonePosition();
              if ((this.bump(), this.bumpSpace(), this.isEOF()))
                return this.error(
                  n.EXPECT_ARGUMENT_CLOSING_BRACE,
                  B(r, this.clonePosition()),
                );
              if (125 === this.char())
                return (
                  this.bump(),
                  this.error(n.EMPTY_ARGUMENT, B(r, this.clonePosition()))
                );
              var i = this.parseIdentifierIfPossible().value;
              if (!i)
                return this.error(
                  n.MALFORMED_ARGUMENT,
                  B(r, this.clonePosition()),
                );
              if ((this.bumpSpace(), this.isEOF()))
                return this.error(
                  n.EXPECT_ARGUMENT_CLOSING_BRACE,
                  B(r, this.clonePosition()),
                );
              switch (this.char()) {
                case 125:
                  return (
                    this.bump(),
                    {
                      val: {
                        type: a.argument,
                        value: i,
                        location: B(r, this.clonePosition()),
                      },
                      err: null,
                    }
                  );
                case 44:
                  if ((this.bump(), this.bumpSpace(), this.isEOF()))
                    return this.error(
                      n.EXPECT_ARGUMENT_CLOSING_BRACE,
                      B(r, this.clonePosition()),
                    );
                  return this.parseArgumentOptions(e, t, i, r);
                default:
                  return this.error(
                    n.MALFORMED_ARGUMENT,
                    B(r, this.clonePosition()),
                  );
              }
            }),
            (e.prototype.parseIdentifierIfPossible = function () {
              var e = this.clonePosition(),
                t = this.offset(),
                r = o(this.message, t),
                n = t + r.length;
              return (
                this.bumpTo(n),
                { value: r, location: B(e, this.clonePosition()) }
              );
            }),
            (e.prototype.parseArgumentOptions = function (e, t, r, s) {
              var o,
                c = this.clonePosition(),
                u = this.parseIdentifierIfPossible().value,
                d = this.clonePosition();
              switch (u) {
                case "":
                  return this.error(n.EXPECT_ARGUMENT_TYPE, B(c, d));
                case "number":
                case "date":
                case "time":
                  this.bumpSpace();
                  var h = null;
                  if (this.bumpIf(",")) {
                    this.bumpSpace();
                    var f = this.clonePosition(),
                      m = this.parseSimpleArgStyleIfPossible();
                    if (m.err) return m;
                    var p = X(m.val);
                    if (0 === p.length)
                      return this.error(
                        n.EXPECT_ARGUMENT_STYLE,
                        B(this.clonePosition(), this.clonePosition()),
                      );
                    h = { style: p, styleLocation: B(f, this.clonePosition()) };
                  }
                  var g = this.tryParseArgumentClose(s);
                  if (g.err) return g;
                  var y = B(s, this.clonePosition());
                  if (h && G(null == h ? void 0 : h.style, "::", 0)) {
                    var w = z(h.style.slice(2));
                    if ("number" === u) {
                      var m = this.parseNumberSkeletonFromString(
                        w,
                        h.styleLocation,
                      );
                      if (m.err) return m;
                      return {
                        val: {
                          type: a.number,
                          value: r,
                          location: y,
                          style: m.val,
                        },
                        err: null,
                      };
                    }
                    if (0 === w.length)
                      return this.error(n.EXPECT_DATE_TIME_SKELETON, y);
                    var b,
                      v = w;
                    this.locale &&
                      (v = (function (e, t) {
                        for (var r = "", n = 0; n < e.length; n++) {
                          var a = e.charAt(n);
                          if ("j" === a) {
                            for (
                              var i = 0;
                              n + 1 < e.length && e.charAt(n + 1) === a;

                            )
                              i++, n++;
                            var s = 1 + (1 & i),
                              o = i < 2 ? 1 : 3 + (i >> 1),
                              c = (function (e) {
                                var t,
                                  r = e.hourCycle;
                                if (
                                  (void 0 === r &&
                                    e.hourCycles &&
                                    e.hourCycles.length &&
                                    (r = e.hourCycles[0]),
                                  r)
                                )
                                  switch (r) {
                                    case "h24":
                                      return "k";
                                    case "h23":
                                      return "H";
                                    case "h12":
                                      return "h";
                                    case "h11":
                                      return "K";
                                    default:
                                      throw Error("Invalid hourCycle");
                                  }
                                var n = e.language;
                                return (
                                  "root" !== n && (t = e.maximize().region),
                                  (O[t || ""] ||
                                    O[n || ""] ||
                                    O["".concat(n, "-001")] ||
                                    O["001"])[0]
                                );
                              })(t);
                            for (("H" == c || "k" == c) && (o = 0); o-- > 0; )
                              r += "a";
                            for (; s-- > 0; ) r = c + r;
                          } else "J" === a ? (r += "H") : (r += a);
                        }
                        return r;
                      })(w, this.locale));
                    var p = {
                      type: i.dateTime,
                      pattern: v,
                      location: h.styleLocation,
                      parsedOptions: this.shouldParseSkeletons
                        ? ((b = {}),
                          v.replace(_, function (e) {
                            var t = e.length;
                            switch (e[0]) {
                              case "G":
                                b.era =
                                  4 === t
                                    ? "long"
                                    : 5 === t
                                      ? "narrow"
                                      : "short";
                                break;
                              case "y":
                                b.year = 2 === t ? "2-digit" : "numeric";
                                break;
                              case "Y":
                              case "u":
                              case "U":
                              case "r":
                                throw RangeError(
                                  "`Y/u/U/r` (year) patterns are not supported, use `y` instead",
                                );
                              case "q":
                              case "Q":
                                throw RangeError(
                                  "`q/Q` (quarter) patterns are not supported",
                                );
                              case "M":
                              case "L":
                                b.month = [
                                  "numeric",
                                  "2-digit",
                                  "short",
                                  "long",
                                  "narrow",
                                ][t - 1];
                                break;
                              case "w":
                              case "W":
                                throw RangeError(
                                  "`w/W` (week) patterns are not supported",
                                );
                              case "d":
                                b.day = ["numeric", "2-digit"][t - 1];
                                break;
                              case "D":
                              case "F":
                              case "g":
                                throw RangeError(
                                  "`D/F/g` (day) patterns are not supported, use `d` instead",
                                );
                              case "E":
                                b.weekday =
                                  4 === t
                                    ? "long"
                                    : 5 === t
                                      ? "narrow"
                                      : "short";
                                break;
                              case "e":
                                if (t < 4)
                                  throw RangeError(
                                    "`e..eee` (weekday) patterns are not supported",
                                  );
                                b.weekday = [
                                  "short",
                                  "long",
                                  "narrow",
                                  "short",
                                ][t - 4];
                                break;
                              case "c":
                                if (t < 4)
                                  throw RangeError(
                                    "`c..ccc` (weekday) patterns are not supported",
                                  );
                                b.weekday = [
                                  "short",
                                  "long",
                                  "narrow",
                                  "short",
                                ][t - 4];
                                break;
                              case "a":
                                b.hour12 = !0;
                                break;
                              case "b":
                              case "B":
                                throw RangeError(
                                  "`b/B` (period) patterns are not supported, use `a` instead",
                                );
                              case "h":
                                (b.hourCycle = "h12"),
                                  (b.hour = ["numeric", "2-digit"][t - 1]);
                                break;
                              case "H":
                                (b.hourCycle = "h23"),
                                  (b.hour = ["numeric", "2-digit"][t - 1]);
                                break;
                              case "K":
                                (b.hourCycle = "h11"),
                                  (b.hour = ["numeric", "2-digit"][t - 1]);
                                break;
                              case "k":
                                (b.hourCycle = "h24"),
                                  (b.hour = ["numeric", "2-digit"][t - 1]);
                                break;
                              case "j":
                              case "J":
                              case "C":
                                throw RangeError(
                                  "`j/J/C` (hour) patterns are not supported, use `h/H/K/k` instead",
                                );
                              case "m":
                                b.minute = ["numeric", "2-digit"][t - 1];
                                break;
                              case "s":
                                b.second = ["numeric", "2-digit"][t - 1];
                                break;
                              case "S":
                              case "A":
                                throw RangeError(
                                  "`S/A` (second) patterns are not supported, use `s` instead",
                                );
                              case "z":
                                b.timeZoneName = t < 4 ? "short" : "long";
                                break;
                              case "Z":
                              case "O":
                              case "v":
                              case "V":
                              case "X":
                              case "x":
                                throw RangeError(
                                  "`Z/O/v/V/X/x` (timeZone) patterns are not supported, use `z` instead",
                                );
                            }
                            return "";
                          }),
                          b)
                        : {},
                    };
                    return {
                      val: {
                        type: "date" === u ? a.date : a.time,
                        value: r,
                        location: y,
                        style: p,
                      },
                      err: null,
                    };
                  }
                  return {
                    val: {
                      type:
                        "number" === u
                          ? a.number
                          : "date" === u
                            ? a.date
                            : a.time,
                      value: r,
                      location: y,
                      style:
                        null != (o = null == h ? void 0 : h.style) ? o : null,
                    },
                    err: null,
                  };
                case "plural":
                case "selectordinal":
                case "select":
                  var E = this.clonePosition();
                  if ((this.bumpSpace(), !this.bumpIf(",")))
                    return this.error(
                      n.EXPECT_SELECT_ARGUMENT_OPTIONS,
                      B(E, (0, l.__assign)({}, E)),
                    );
                  this.bumpSpace();
                  var S = this.parseIdentifierIfPossible(),
                    T = 0;
                  if ("select" !== u && "offset" === S.value) {
                    if (!this.bumpIf(":"))
                      return this.error(
                        n.EXPECT_PLURAL_ARGUMENT_OFFSET_VALUE,
                        B(this.clonePosition(), this.clonePosition()),
                      );
                    this.bumpSpace();
                    var m = this.tryParseDecimalInteger(
                      n.EXPECT_PLURAL_ARGUMENT_OFFSET_VALUE,
                      n.INVALID_PLURAL_ARGUMENT_OFFSET_VALUE,
                    );
                    if (m.err) return m;
                    this.bumpSpace(),
                      (S = this.parseIdentifierIfPossible()),
                      (T = m.val);
                  }
                  var A = this.tryParsePluralOrSelectOptions(e, u, t, S);
                  if (A.err) return A;
                  var g = this.tryParseArgumentClose(s);
                  if (g.err) return g;
                  var I = B(s, this.clonePosition());
                  if ("select" === u)
                    return {
                      val: {
                        type: a.select,
                        value: r,
                        options: Y(A.val),
                        location: I,
                      },
                      err: null,
                    };
                  return {
                    val: {
                      type: a.plural,
                      value: r,
                      options: Y(A.val),
                      offset: T,
                      pluralType: "plural" === u ? "cardinal" : "ordinal",
                      location: I,
                    },
                    err: null,
                  };
                default:
                  return this.error(n.INVALID_ARGUMENT_TYPE, B(c, d));
              }
            }),
            (e.prototype.tryParseArgumentClose = function (e) {
              return this.isEOF() || 125 !== this.char()
                ? this.error(
                    n.EXPECT_ARGUMENT_CLOSING_BRACE,
                    B(e, this.clonePosition()),
                  )
                : (this.bump(), { val: !0, err: null });
            }),
            (e.prototype.parseSimpleArgStyleIfPossible = function () {
              for (var e = 0, t = this.clonePosition(); !this.isEOF(); )
                switch (this.char()) {
                  case 39:
                    this.bump();
                    var r = this.clonePosition();
                    if (!this.bumpUntil("'"))
                      return this.error(
                        n.UNCLOSED_QUOTE_IN_ARGUMENT_STYLE,
                        B(r, this.clonePosition()),
                      );
                    this.bump();
                    break;
                  case 123:
                    (e += 1), this.bump();
                    break;
                  case 125:
                    if (!(e > 0))
                      return {
                        val: this.message.slice(t.offset, this.offset()),
                        err: null,
                      };
                    e -= 1;
                    break;
                  default:
                    this.bump();
                }
              return {
                val: this.message.slice(t.offset, this.offset()),
                err: null,
              };
            }),
            (e.prototype.parseNumberSkeletonFromString = function (e, t) {
              var r = [];
              try {
                r = (function (e) {
                  if (0 === e.length)
                    throw Error("Number skeleton cannot be empty");
                  for (
                    var t = e.split(S).filter(function (e) {
                        return e.length > 0;
                      }),
                      r = [],
                      n = 0;
                    n < t.length;
                    n++
                  ) {
                    var a = t[n].split("/");
                    if (0 === a.length) throw Error("Invalid number skeleton");
                    for (var i = a[0], s = a.slice(1), o = 0; o < s.length; o++)
                      if (0 === s[o].length)
                        throw Error("Invalid number skeleton");
                    r.push({ stem: i, options: s });
                  }
                  return r;
                })(e);
              } catch (e) {
                return this.error(n.INVALID_NUMBER_SKELETON, t);
              }
              return {
                val: {
                  type: i.number,
                  tokens: r,
                  location: t,
                  parsedOptions: this.shouldParseSkeletons
                    ? (function (e) {
                        for (var t = {}, r = 0; r < e.length; r++) {
                          var n = e[r];
                          switch (n.stem) {
                            case "percent":
                            case "%":
                              t.style = "percent";
                              continue;
                            case "%x100":
                              (t.style = "percent"), (t.scale = 100);
                              continue;
                            case "currency":
                              (t.style = "currency"),
                                (t.currency = n.options[0]);
                              continue;
                            case "group-off":
                            case ",_":
                              t.useGrouping = !1;
                              continue;
                            case "precision-integer":
                            case ".":
                              t.maximumFractionDigits = 0;
                              continue;
                            case "measure-unit":
                            case "unit":
                              (t.style = "unit"),
                                (t.unit = n.options[0].replace(/^(.*?)-/, ""));
                              continue;
                            case "compact-short":
                            case "K":
                              (t.notation = "compact"),
                                (t.compactDisplay = "short");
                              continue;
                            case "compact-long":
                            case "KK":
                              (t.notation = "compact"),
                                (t.compactDisplay = "long");
                              continue;
                            case "scientific":
                              t = (0, l.__assign)(
                                (0, l.__assign)((0, l.__assign)({}, t), {
                                  notation: "scientific",
                                }),
                                n.options.reduce(function (e, t) {
                                  return (0, l.__assign)(
                                    (0, l.__assign)({}, e),
                                    N(t),
                                  );
                                }, {}),
                              );
                              continue;
                            case "engineering":
                              t = (0, l.__assign)(
                                (0, l.__assign)((0, l.__assign)({}, t), {
                                  notation: "engineering",
                                }),
                                n.options.reduce(function (e, t) {
                                  return (0, l.__assign)(
                                    (0, l.__assign)({}, e),
                                    N(t),
                                  );
                                }, {}),
                              );
                              continue;
                            case "notation-simple":
                              t.notation = "standard";
                              continue;
                            case "unit-width-narrow":
                              (t.currencyDisplay = "narrowSymbol"),
                                (t.unitDisplay = "narrow");
                              continue;
                            case "unit-width-short":
                              (t.currencyDisplay = "code"),
                                (t.unitDisplay = "short");
                              continue;
                            case "unit-width-full-name":
                              (t.currencyDisplay = "name"),
                                (t.unitDisplay = "long");
                              continue;
                            case "unit-width-iso-code":
                              t.currencyDisplay = "symbol";
                              continue;
                            case "scale":
                              t.scale = parseFloat(n.options[0]);
                              continue;
                            case "rounding-mode-floor":
                              t.roundingMode = "floor";
                              continue;
                            case "rounding-mode-ceiling":
                              t.roundingMode = "ceil";
                              continue;
                            case "rounding-mode-down":
                              t.roundingMode = "trunc";
                              continue;
                            case "rounding-mode-up":
                              t.roundingMode = "expand";
                              continue;
                            case "rounding-mode-half-even":
                              t.roundingMode = "halfEven";
                              continue;
                            case "rounding-mode-half-down":
                              t.roundingMode = "halfTrunc";
                              continue;
                            case "rounding-mode-half-up":
                              t.roundingMode = "halfExpand";
                              continue;
                            case "integer-width":
                              if (n.options.length > 1)
                                throw RangeError(
                                  "integer-width stems only accept a single optional option",
                                );
                              n.options[0].replace(
                                I,
                                function (e, r, n, a, i, s) {
                                  if (r) t.minimumIntegerDigits = n.length;
                                  else if (a && i)
                                    throw Error(
                                      "We currently do not support maximum integer digits",
                                    );
                                  else if (s)
                                    throw Error(
                                      "We currently do not support exact integer digits",
                                    );
                                  return "";
                                },
                              );
                              continue;
                          }
                          if (C.test(n.stem)) {
                            t.minimumIntegerDigits = n.stem.length;
                            continue;
                          }
                          if (T.test(n.stem)) {
                            if (n.options.length > 1)
                              throw RangeError(
                                "Fraction-precision stems only accept a single optional option",
                              );
                            n.stem.replace(T, function (e, r, n, a, i, s) {
                              return (
                                "*" === n
                                  ? (t.minimumFractionDigits = r.length)
                                  : a && "#" === a[0]
                                    ? (t.maximumFractionDigits = a.length)
                                    : i && s
                                      ? ((t.minimumFractionDigits = i.length),
                                        (t.maximumFractionDigits =
                                          i.length + s.length))
                                      : ((t.minimumFractionDigits = r.length),
                                        (t.maximumFractionDigits = r.length)),
                                ""
                              );
                            });
                            var a = n.options[0];
                            "w" === a
                              ? (t = (0, l.__assign)((0, l.__assign)({}, t), {
                                  trailingZeroDisplay: "stripIfInteger",
                                }))
                              : a &&
                                (t = (0, l.__assign)(
                                  (0, l.__assign)({}, t),
                                  P(a),
                                ));
                            continue;
                          }
                          if (A.test(n.stem)) {
                            t = (0, l.__assign)(
                              (0, l.__assign)({}, t),
                              P(n.stem),
                            );
                            continue;
                          }
                          var i = R(n.stem);
                          i && (t = (0, l.__assign)((0, l.__assign)({}, t), i));
                          var s = (function (e) {
                            var t;
                            if (
                              ("E" === e[0] && "E" === e[1]
                                ? ((t = { notation: "engineering" }),
                                  (e = e.slice(2)))
                                : "E" === e[0] &&
                                  ((t = { notation: "scientific" }),
                                  (e = e.slice(1))),
                              t)
                            ) {
                              var r = e.slice(0, 2);
                              if (
                                ("+!" === r
                                  ? ((t.signDisplay = "always"),
                                    (e = e.slice(2)))
                                  : "+?" === r &&
                                    ((t.signDisplay = "exceptZero"),
                                    (e = e.slice(2))),
                                !C.test(e))
                              )
                                throw Error(
                                  "Malformed concise eng/scientific notation",
                                );
                              t.minimumIntegerDigits = e.length;
                            }
                            return t;
                          })(n.stem);
                          s && (t = (0, l.__assign)((0, l.__assign)({}, t), s));
                        }
                        return t;
                      })(r)
                    : {},
                },
                err: null,
              };
            }),
            (e.prototype.tryParsePluralOrSelectOptions = function (e, t, r, a) {
              for (
                var i,
                  s = !1,
                  o = [],
                  c = new Set(),
                  u = a.value,
                  l = a.location;
                ;

              ) {
                if (0 === u.length) {
                  var d = this.clonePosition();
                  if ("select" !== t && this.bumpIf("=")) {
                    var h = this.tryParseDecimalInteger(
                      n.EXPECT_PLURAL_ARGUMENT_SELECTOR,
                      n.INVALID_PLURAL_ARGUMENT_SELECTOR,
                    );
                    if (h.err) return h;
                    (l = B(d, this.clonePosition())),
                      (u = this.message.slice(d.offset, this.offset()));
                  } else break;
                }
                if (c.has(u))
                  return this.error(
                    "select" === t
                      ? n.DUPLICATE_SELECT_ARGUMENT_SELECTOR
                      : n.DUPLICATE_PLURAL_ARGUMENT_SELECTOR,
                    l,
                  );
                "other" === u && (s = !0), this.bumpSpace();
                var f = this.clonePosition();
                if (!this.bumpIf("{"))
                  return this.error(
                    "select" === t
                      ? n.EXPECT_SELECT_ARGUMENT_SELECTOR_FRAGMENT
                      : n.EXPECT_PLURAL_ARGUMENT_SELECTOR_FRAGMENT,
                    B(this.clonePosition(), this.clonePosition()),
                  );
                var m = this.parseMessage(e + 1, t, r);
                if (m.err) return m;
                var p = this.tryParseArgumentClose(f);
                if (p.err) return p;
                o.push([
                  u,
                  { value: m.val, location: B(f, this.clonePosition()) },
                ]),
                  c.add(u),
                  this.bumpSpace(),
                  (u = (i = this.parseIdentifierIfPossible()).value),
                  (l = i.location);
              }
              return 0 === o.length
                ? this.error(
                    "select" === t
                      ? n.EXPECT_SELECT_ARGUMENT_SELECTOR
                      : n.EXPECT_PLURAL_ARGUMENT_SELECTOR,
                    B(this.clonePosition(), this.clonePosition()),
                  )
                : this.requiresOtherClause && !s
                  ? this.error(
                      n.MISSING_OTHER_CLAUSE,
                      B(this.clonePosition(), this.clonePosition()),
                    )
                  : { val: o, err: null };
            }),
            (e.prototype.tryParseDecimalInteger = function (e, t) {
              var r = 1,
                n = this.clonePosition();
              this.bumpIf("+") || (this.bumpIf("-") && (r = -1));
              for (var a = !1, i = 0; !this.isEOF(); ) {
                var s = this.char();
                if (s >= 48 && s <= 57)
                  (a = !0), (i = 10 * i + (s - 48)), this.bump();
                else break;
              }
              var o = B(n, this.clonePosition());
              return a
                ? U((i *= r))
                  ? { val: i, err: null }
                  : this.error(t, o)
                : this.error(e, o);
            }),
            (e.prototype.offset = function () {
              return this.position.offset;
            }),
            (e.prototype.isEOF = function () {
              return this.offset() === this.message.length;
            }),
            (e.prototype.clonePosition = function () {
              return {
                offset: this.position.offset,
                line: this.position.line,
                column: this.position.column,
              };
            }),
            (e.prototype.char = function () {
              var e = this.position.offset;
              if (e >= this.message.length) throw Error("out of bound");
              var t = V(this.message, e);
              if (void 0 === t)
                throw Error(
                  "Offset ".concat(
                    e,
                    " is at invalid UTF-16 code unit boundary",
                  ),
                );
              return t;
            }),
            (e.prototype.error = function (e, t) {
              return {
                val: null,
                err: { kind: e, message: this.message, location: t },
              };
            }),
            (e.prototype.bump = function () {
              if (!this.isEOF()) {
                var e = this.char();
                10 === e
                  ? ((this.position.line += 1),
                    (this.position.column = 1),
                    (this.position.offset += 1))
                  : ((this.position.column += 1),
                    (this.position.offset += e < 65536 ? 1 : 2));
              }
            }),
            (e.prototype.bumpIf = function (e) {
              if (G(this.message, e, this.offset())) {
                for (var t = 0; t < e.length; t++) this.bump();
                return !0;
              }
              return !1;
            }),
            (e.prototype.bumpUntil = function (e) {
              var t = this.offset(),
                r = this.message.indexOf(e, t);
              return r >= 0
                ? (this.bumpTo(r), !0)
                : (this.bumpTo(this.message.length), !1);
            }),
            (e.prototype.bumpTo = function (e) {
              if (this.offset() > e)
                throw Error(
                  "targetOffset "
                    .concat(
                      e,
                      " must be greater than or equal to the current offset ",
                    )
                    .concat(this.offset()),
                );
              for (e = Math.min(e, this.message.length); ; ) {
                var t = this.offset();
                if (t === e) break;
                if (t > e)
                  throw Error(
                    "targetOffset ".concat(
                      e,
                      " is at invalid UTF-16 code unit boundary",
                    ),
                  );
                if ((this.bump(), this.isEOF())) break;
              }
            }),
            (e.prototype.bumpSpace = function () {
              for (; !this.isEOF() && J(this.char()); ) this.bump();
            }),
            (e.prototype.peek = function () {
              if (this.isEOF()) return null;
              var e = this.char(),
                t = this.offset(),
                r = this.message.charCodeAt(t + (e >= 65536 ? 2 : 1));
              return null != r ? r : null;
            }),
            e
          );
        })();
        function Q(e) {
          return (e >= 97 && e <= 122) || (e >= 65 && e <= 90);
        }
        function J(e) {
          return (
            (e >= 9 && e <= 13) ||
            32 === e ||
            133 === e ||
            (e >= 8206 && e <= 8207) ||
            8232 === e ||
            8233 === e
          );
        }
        function ee(e, t) {
          void 0 === t && (t = {});
          var r = new Z(
            e,
            (t = (0, l.__assign)(
              { shouldParseSkeletons: !0, requiresOtherClause: !0 },
              t,
            )),
          ).parse();
          if (r.err) {
            var a = SyntaxError(n[r.err.kind]);
            throw (
              ((a.location = r.err.location),
              (a.originalMessage = r.err.message),
              a)
            );
          }
          return (
            (null == t ? void 0 : t.captureLocation) ||
              (function e(t) {
                t.forEach(function (t) {
                  if ((delete t.location, g(t) || y(t)))
                    for (var r in t.options)
                      delete t.options[r].location, e(t.options[r].value);
                  else
                    (f(t) && b(t.style)) || ((m(t) || p(t)) && v(t.style))
                      ? delete t.style.location
                      : w(t) && e(t.children);
                });
              })(r.val),
            r.val
          );
        }
        !(function (e) {
          (e.MISSING_VALUE = "MISSING_VALUE"),
            (e.INVALID_VALUE = "INVALID_VALUE"),
            (e.MISSING_INTL_API = "MISSING_INTL_API");
        })(c || (c = {}));
        var et = (function (e) {
            function t(t, r, n) {
              var a = e.call(this, t) || this;
              return (a.code = r), (a.originalMessage = n), a;
            }
            return (
              (0, l.__extends)(t, e),
              (t.prototype.toString = function () {
                return "[formatjs Error: "
                  .concat(this.code, "] ")
                  .concat(this.message);
              }),
              t
            );
          })(Error),
          er = (function (e) {
            function t(t, r, n, a) {
              return (
                e.call(
                  this,
                  'Invalid values for "'
                    .concat(t, '": "')
                    .concat(r, '". Options are "')
                    .concat(Object.keys(n).join('", "'), '"'),
                  c.INVALID_VALUE,
                  a,
                ) || this
              );
            }
            return (0, l.__extends)(t, e), t;
          })(et),
          en = (function (e) {
            function t(t, r, n) {
              return (
                e.call(
                  this,
                  'Value for "'.concat(t, '" must be of type ').concat(r),
                  c.INVALID_VALUE,
                  n,
                ) || this
              );
            }
            return (0, l.__extends)(t, e), t;
          })(et),
          ea = (function (e) {
            function t(t, r) {
              return (
                e.call(
                  this,
                  'The intl string context variable "'
                    .concat(t, '" was not provided to the string "')
                    .concat(r, '"'),
                  c.MISSING_VALUE,
                  r,
                ) || this
              );
            }
            return (0, l.__extends)(t, e), t;
          })(et);
        function ei(e) {
          return "function" == typeof e;
        }
        function es(e, t, r, n, i, s, o) {
          if (1 === e.length && h(e[0]))
            return [{ type: u.literal, value: e[0].value }];
          for (var l = [], d = 0; d < e.length; d++) {
            var E = e[d];
            if (h(E)) {
              l.push({ type: u.literal, value: E.value });
              continue;
            }
            if (E.type === a.pound) {
              "number" == typeof s &&
                l.push({
                  type: u.literal,
                  value: r.getNumberFormat(t).format(s),
                });
              continue;
            }
            var _ = E.value;
            if (!(i && _ in i)) throw new ea(_, o);
            var S = i[_];
            if (E.type === a.argument) {
              (S && "string" != typeof S && "number" != typeof S) ||
                (S =
                  "string" == typeof S || "number" == typeof S
                    ? String(S)
                    : ""),
                l.push({
                  type: "string" == typeof S ? u.literal : u.object,
                  value: S,
                });
              continue;
            }
            if (m(E)) {
              var T =
                "string" == typeof E.style
                  ? n.date[E.style]
                  : v(E.style)
                    ? E.style.parsedOptions
                    : void 0;
              l.push({
                type: u.literal,
                value: r.getDateTimeFormat(t, T).format(S),
              });
              continue;
            }
            if (p(E)) {
              var T =
                "string" == typeof E.style
                  ? n.time[E.style]
                  : v(E.style)
                    ? E.style.parsedOptions
                    : n.time.medium;
              l.push({
                type: u.literal,
                value: r.getDateTimeFormat(t, T).format(S),
              });
              continue;
            }
            if (f(E)) {
              var T =
                "string" == typeof E.style
                  ? n.number[E.style]
                  : b(E.style)
                    ? E.style.parsedOptions
                    : void 0;
              T && T.scale && (S *= T.scale || 1),
                l.push({
                  type: u.literal,
                  value: r.getNumberFormat(t, T).format(S),
                });
              continue;
            }
            if (w(E)) {
              var A = E.children,
                I = E.value,
                C = i[I];
              if (!ei(C)) throw new en(I, "function", o);
              var P = C(
                es(A, t, r, n, i, s).map(function (e) {
                  return e.value;
                }),
              );
              Array.isArray(P) || (P = [P]),
                l.push.apply(
                  l,
                  P.map(function (e) {
                    return {
                      type: "string" == typeof e ? u.literal : u.object,
                      value: e,
                    };
                  }),
                );
            }
            if (g(E)) {
              var R = E.options[S] || E.options.other;
              if (!R) throw new er(E.value, S, Object.keys(E.options), o);
              l.push.apply(l, es(R.value, t, r, n, i));
              continue;
            }
            if (y(E)) {
              var R = E.options["=".concat(S)];
              if (!R) {
                if (!Intl.PluralRules)
                  throw new et(
                    'Intl.PluralRules is not available in this environment.\nTry polyfilling it using "@formatjs/intl-pluralrules"\n',
                    c.MISSING_INTL_API,
                    o,
                  );
                var N = r
                  .getPluralRules(t, { type: E.pluralType })
                  .select(S - (E.offset || 0));
                R = E.options[N] || E.options.other;
              }
              if (!R) throw new er(E.value, S, Object.keys(E.options), o);
              l.push.apply(l, es(R.value, t, r, n, i, S - (E.offset || 0)));
              continue;
            }
          }
          return l.length < 2
            ? l
            : l.reduce(function (e, t) {
                var r = e[e.length - 1];
                return (
                  r && r.type === u.literal && t.type === u.literal
                    ? (r.value += t.value)
                    : e.push(t),
                  e
                );
              }, []);
        }
        function eo(e) {
          return {
            create: function () {
              return {
                get: function (t) {
                  return e[t];
                },
                set: function (t, r) {
                  e[t] = r;
                },
              };
            },
          };
        }
        !(function (e) {
          (e[(e.literal = 0)] = "literal"), (e[(e.object = 1)] = "object");
        })(u || (u = {}));
        var ec = (function () {
          function e(t, r, n, a) {
            void 0 === r && (r = e.defaultLocale);
            var i,
              s,
              o = this;
            if (
              ((this.formatterCache = {
                number: {},
                dateTime: {},
                pluralRules: {},
              }),
              (this.format = function (e) {
                var t = o.formatToParts(e);
                if (1 === t.length) return t[0].value;
                var r = t.reduce(function (e, t) {
                  return (
                    e.length &&
                    t.type === u.literal &&
                    "string" == typeof e[e.length - 1]
                      ? (e[e.length - 1] += t.value)
                      : e.push(t.value),
                    e
                  );
                }, []);
                return r.length <= 1 ? r[0] || "" : r;
              }),
              (this.formatToParts = function (e) {
                return es(
                  o.ast,
                  o.locales,
                  o.formatters,
                  o.formats,
                  e,
                  void 0,
                  o.message,
                );
              }),
              (this.resolvedOptions = function () {
                var e;
                return {
                  locale:
                    (null == (e = o.resolvedLocale) ? void 0 : e.toString()) ||
                    Intl.NumberFormat.supportedLocalesOf(o.locales)[0],
                };
              }),
              (this.getAst = function () {
                return o.ast;
              }),
              (this.locales = r),
              (this.resolvedLocale = e.resolveLocale(r)),
              "string" == typeof t)
            ) {
              if (((this.message = t), !e.__parse))
                throw TypeError(
                  "IntlMessageFormat.__parse must be set to process `message` of type `string`",
                );
              var c = a || {},
                h = (c.formatters, (0, l.__rest)(c, ["formatters"]));
              this.ast = e.__parse(
                t,
                (0, l.__assign)((0, l.__assign)({}, h), {
                  locale: this.resolvedLocale,
                }),
              );
            } else this.ast = t;
            if (!Array.isArray(this.ast))
              throw TypeError("A message must be provided as a String or AST.");
            (this.formats =
              ((i = e.formats),
              n
                ? Object.keys(i).reduce(
                    function (e, t) {
                      var r, a;
                      return (
                        (e[t] =
                          ((r = i[t]),
                          (a = n[t])
                            ? (0, l.__assign)(
                                (0, l.__assign)(
                                  (0, l.__assign)({}, r || {}),
                                  a || {},
                                ),
                                Object.keys(r).reduce(function (e, t) {
                                  return (
                                    (e[t] = (0, l.__assign)(
                                      (0, l.__assign)({}, r[t]),
                                      a[t] || {},
                                    )),
                                    e
                                  );
                                }, {}),
                              )
                            : r)),
                        e
                      );
                    },
                    (0, l.__assign)({}, i),
                  )
                : i)),
              (this.formatters =
                (a && a.formatters) ||
                (void 0 === (s = this.formatterCache) &&
                  (s = { number: {}, dateTime: {}, pluralRules: {} }),
                {
                  getNumberFormat: (0, d.memoize)(
                    function () {
                      for (var e, t = [], r = 0; r < arguments.length; r++)
                        t[r] = arguments[r];
                      return new ((e = Intl.NumberFormat).bind.apply(
                        e,
                        (0, l.__spreadArray)([void 0], t, !1),
                      ))();
                    },
                    { cache: eo(s.number), strategy: d.strategies.variadic },
                  ),
                  getDateTimeFormat: (0, d.memoize)(
                    function () {
                      for (var e, t = [], r = 0; r < arguments.length; r++)
                        t[r] = arguments[r];
                      return new ((e = Intl.DateTimeFormat).bind.apply(
                        e,
                        (0, l.__spreadArray)([void 0], t, !1),
                      ))();
                    },
                    { cache: eo(s.dateTime), strategy: d.strategies.variadic },
                  ),
                  getPluralRules: (0, d.memoize)(
                    function () {
                      for (var e, t = [], r = 0; r < arguments.length; r++)
                        t[r] = arguments[r];
                      return new ((e = Intl.PluralRules).bind.apply(
                        e,
                        (0, l.__spreadArray)([void 0], t, !1),
                      ))();
                    },
                    {
                      cache: eo(s.pluralRules),
                      strategy: d.strategies.variadic,
                    },
                  ),
                }));
          }
          return (
            Object.defineProperty(e, "defaultLocale", {
              get: function () {
                return (
                  e.memoizedDefaultLocale ||
                    (e.memoizedDefaultLocale =
                      new Intl.NumberFormat().resolvedOptions().locale),
                  e.memoizedDefaultLocale
                );
              },
              enumerable: !1,
              configurable: !0,
            }),
            (e.memoizedDefaultLocale = null),
            (e.resolveLocale = function (e) {
              if (void 0 !== Intl.Locale) {
                var t = Intl.NumberFormat.supportedLocalesOf(e);
                return new Intl.Locale(
                  t.length > 0 ? t[0] : "string" == typeof e ? e : e[0],
                );
              }
            }),
            (e.__parse = ee),
            (e.formats = {
              number: {
                integer: { maximumFractionDigits: 0 },
                currency: { style: "currency" },
                percent: { style: "percent" },
              },
              date: {
                short: { month: "numeric", day: "numeric", year: "2-digit" },
                medium: { month: "short", day: "numeric", year: "numeric" },
                long: { month: "long", day: "numeric", year: "numeric" },
                full: {
                  weekday: "long",
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                },
              },
              time: {
                short: { hour: "numeric", minute: "numeric" },
                medium: {
                  hour: "numeric",
                  minute: "numeric",
                  second: "numeric",
                },
                long: {
                  hour: "numeric",
                  minute: "numeric",
                  second: "numeric",
                  timeZoneName: "short",
                },
                full: {
                  hour: "numeric",
                  minute: "numeric",
                  second: "numeric",
                  timeZoneName: "short",
                },
              },
            }),
            e
          );
        })();
        let eu = ec;
      },
      18131: (e, t, r) => {
        "use strict";
        r.d(t, { default: () => n });
        let n = (0, r(26394).registerClientReference)(
          function () {
            throw Error(
              "Attempted to call the default export of \"E:\\\\downloads\\\\Hijraah\\\\node_modules\\\\.pnpm\\\\next-intl@3.26.5_next@15.3._7e4e666345518ee87977d0efacc37596\\\\node_modules\\\\next-intl\\\\dist\\\\esm\\\\navigation\\\\shared\\\\BaseLink.js\" from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\node_modules\\.pnpm\\next-intl@3.26.5_next@15.3._7e4e666345518ee87977d0efacc37596\\node_modules\\next-intl\\dist\\esm\\navigation\\shared\\BaseLink.js",
          "default",
        );
      },
      19121: (e) => {
        "use strict";
        e.exports = require("next/dist/server/app-render/action-async-storage.external.js");
      },
      19771: (e) => {
        "use strict";
        e.exports = require("process");
      },
      20016: (e, t, r) => {
        "use strict";
        function n(e, t) {
          var r = t && t.cache ? t.cache : c,
            n = t && t.serializer ? t.serializer : s;
          return (
            t && t.strategy
              ? t.strategy
              : function (e, t) {
                  var r,
                    n,
                    s = 1 === e.length ? a : i;
                  return (
                    (r = t.cache.create()),
                    (n = t.serializer),
                    s.bind(this, e, r, n)
                  );
                }
          )(e, { cache: r, serializer: n });
        }
        function a(e, t, r, n) {
          var a =
              null == n || "number" == typeof n || "boolean" == typeof n
                ? n
                : r(n),
            i = t.get(a);
          return void 0 === i && ((i = e.call(this, n)), t.set(a, i)), i;
        }
        function i(e, t, r) {
          var n = Array.prototype.slice.call(arguments, 3),
            a = r(n),
            i = t.get(a);
          return void 0 === i && ((i = e.apply(this, n)), t.set(a, i)), i;
        }
        r.r(t), r.d(t, { memoize: () => n, strategies: () => u });
        var s = function () {
            return JSON.stringify(arguments);
          },
          o = (function () {
            function e() {
              this.cache = Object.create(null);
            }
            return (
              (e.prototype.get = function (e) {
                return this.cache[e];
              }),
              (e.prototype.set = function (e, t) {
                this.cache[e] = t;
              }),
              e
            );
          })(),
          c = {
            create: function () {
              return new o();
            },
          },
          u = {
            variadic: function (e, t) {
              var r, n;
              return (
                (r = t.cache.create()),
                (n = t.serializer),
                i.bind(this, e, r, n)
              );
            },
            monadic: function (e, t) {
              var r, n;
              return (
                (r = t.cache.create()),
                (n = t.serializer),
                a.bind(this, e, r, n)
              );
            },
          };
      },
      21750: (e, t, r) => {
        "use strict";
        r.d(t, { D: () => o });
        var n = r(4839),
          a = r(54016),
          i = r(58342),
          s = r(26457);
        function o(e) {
          let t = i.Ik({
              userId: i.Yj().uuid(),
              role: i.k5(["user", "admin", "moderator"]).optional(),
              isActive: i.zM().optional(),
              subscriptionTier: i
                .k5(["free", "basic", "premium", "enterprise"])
                .optional(),
            }),
            r = i.Ik({
              userIds: i.YO(i.Yj().uuid()).min(1),
              action: i.k5(["activate", "deactivate", "delete"]),
            });
          return (
            e.get("/admin/users", async (e) => {
              let t = Number(e.req.query("page") || "1"),
                r = Number(e.req.query("limit") || "50"),
                n = (t - 1) * r;
              try {
                let a = (0, s.r)(),
                  {
                    data: i,
                    error: o,
                    count: c,
                  } = await a
                    .from("users")
                    .select("*, profiles(*)", { count: "exact" })
                    .range(n, n + r - 1);
                if (o) throw o;
                return e.json({
                  success: !0,
                  users: i,
                  pagination: {
                    total: c || 0,
                    page: t,
                    limit: r,
                    totalPages: c ? Math.ceil(c / r) : 0,
                  },
                });
              } catch (e) {
                throw (
                  (console.error("Admin users fetch error:", e),
                  new a.y(500, { message: "Failed to fetch users" }))
                );
              }
            }),
            e.get("/admin/users/:id", async (e) => {
              let t = e.req.param("id");
              try {
                let r = (0, s.r)(),
                  { data: n, error: i } = await r
                    .from("users")
                    .select("*, profiles(*)")
                    .eq("id", t)
                    .single();
                if (i?.code === "PGRST116" || !n)
                  throw new a.y(404, { message: "User not found" });
                if (i) throw i;
                return e.json({ success: !0, user: n });
              } catch (e) {
                if (
                  (console.error(`Admin user fetch error (ID: ${t}):`, e),
                  e instanceof a.y)
                )
                  throw e;
                throw new a.y(500, { message: "Failed to fetch user" });
              }
            }),
            e.patch(
              "/admin/users/:id",
              (0, n.l)(
                "json",
                i
                  .Ik({
                    name: i.Yj().min(2).optional(),
                    email: i.Yj().email().optional(),
                  })
                  .refine((e) => Object.keys(e).length > 0, {
                    message: "At least one field must be provided",
                  }),
              ),
              async (e) => {
                let t = e.req.param("id"),
                  r = e.req.valid("json");
                try {
                  let n = (0, s.r)(),
                    { error: i } = await n
                      .from("users")
                      .select("id")
                      .eq("id", t)
                      .single();
                  if (i) throw new a.y(404, { message: "User not found" });
                  if (r.email) {
                    let { data: e, error: i } = await n
                      .from("users")
                      .select("id")
                      .eq("email", r.email)
                      .neq("id", t)
                      .maybeSingle();
                    if (i) throw i;
                    if (e)
                      throw new a.y(409, {
                        message: "Email already in use by another user",
                      });
                  }
                  let { data: o, error: c } = await n
                    .from("users")
                    .update({ ...r, updated_at: new Date().toISOString() })
                    .eq("id", t)
                    .select("*, profiles(*)")
                    .single();
                  if (c) throw c;
                  return e.json({ success: !0, user: o });
                } catch (e) {
                  if (
                    (console.error(`Admin user update error (ID: ${t}):`, e),
                    e instanceof a.y)
                  )
                    throw e;
                  throw new a.y(500, { message: "Failed to update user" });
                }
              },
            ),
            e.delete("/admin/users/:id", async (e) => {
              let t = e.req.param("id");
              try {
                let r = (0, s.r)(),
                  { error: n } = await r
                    .from("users")
                    .select("id")
                    .eq("id", t)
                    .single();
                if (n) throw new a.y(404, { message: "User not found" });
                let { error: i } = await r.from("users").delete().eq("id", t);
                if (i) throw i;
                return e.body(null, 204);
              } catch (e) {
                if (
                  (console.error(`Admin user delete error (ID: ${t}):`, e),
                  e instanceof a.y)
                )
                  throw e;
                throw new a.y(500, { message: "Failed to delete user" });
              }
            }),
            e.patch("/admin/users", (0, n.l)("json", t), async (e) => {
              let {
                userId: t,
                role: r,
                isActive: n,
                subscriptionTier: i,
              } = e.req.valid("json");
              try {
                let a = (0, s.r)();
                if (r) {
                  let { error: e } = await a
                    .from("user_roles")
                    .upsert({
                      user_id: t,
                      role: r,
                      updated_at: new Date().toISOString(),
                    });
                  if (e) throw e;
                }
                if (void 0 !== n) {
                  let { error: e } = await a
                    .from("users")
                    .update({
                      is_active: n,
                      updated_at: new Date().toISOString(),
                    })
                    .eq("id", t);
                  if (e) throw e;
                }
                if (i) {
                  let { error: e } = await a
                    .from("subscriptions")
                    .upsert({
                      user_id: t,
                      tier: i,
                      updated_at: new Date().toISOString(),
                    });
                  if (e) throw e;
                }
                return e.json({
                  success: !0,
                  message: "User updated successfully",
                });
              } catch (e) {
                throw (
                  (console.error("Admin user update error:", e),
                  new a.y(500, { message: "Failed to update user" }))
                );
              }
            }),
            e.post("/admin/users/bulk", (0, n.l)("json", r), async (e) => {
              let { userIds: t, action: r } = e.req.valid("json");
              try {
                let n = (0, s.r)();
                if ("activate" === r || "deactivate" === r) {
                  let { error: e } = await n
                    .from("users")
                    .update({
                      is_active: "activate" === r,
                      updated_at: new Date().toISOString(),
                    })
                    .in("id", t);
                  if (e) throw e;
                } else if ("delete" === r) {
                  let { error: e } = await n
                    .from("users")
                    .update({
                      deleted_at: new Date().toISOString(),
                      is_active: !1,
                    })
                    .in("id", t);
                  if (e) throw e;
                }
                return e.json({
                  success: !0,
                  message: `Bulk action '${r}' completed successfully`,
                  affected: t.length,
                });
              } catch (e) {
                throw (
                  (console.error("Admin bulk action error:", e),
                  new a.y(500, { message: "Failed to perform bulk action" }))
                );
              }
            }),
            e.get("/admin/stats", async (e) => {
              try {
                let t = (0, s.r)(),
                  { count: r, error: n } = await t
                    .from("users")
                    .select("*", { count: "exact", head: !0 }),
                  { count: a, error: i } = await t
                    .from("documents")
                    .select("*", { count: "exact", head: !0 }),
                  { count: o, error: c } = await t
                    .from("subscriptions")
                    .select("*", { count: "exact", head: !0 })
                    .eq("status", "active");
                if (n || i || c) throw n || i || c;
                return e.json({
                  success: !0,
                  stats: {
                    users: r || 0,
                    documents: a || 0,
                    activeSubscriptions: o || 0,
                  },
                });
              } catch (e) {
                throw (
                  (console.error("Admin stats error:", e),
                  new a.y(500, { message: "Failed to fetch admin stats" }))
                );
              }
            }),
            e
          );
        }
      },
      21820: (e) => {
        "use strict";
        e.exports = require("os");
      },
      23146: (e, t, r) => {
        "use strict";
        r.d(t, { N9: () => a }), r(27613);
        var n = () => {
            try {
              return performance.now();
            } catch {}
            return Date.now();
          },
          a = (e) => {
            let t = {
              total: !0,
              enabled: !0,
              totalDescription: "Total Response Time",
              autoEnd: !0,
              crossOrigin: !1,
              ...e,
            };
            return async function (e, r) {
              let n = [],
                a = new Map();
              if (e.get("metric")) return await r();
              if (
                (e.set("metric", { headers: n, timers: a }),
                t.total && s(e, "total", t.totalDescription),
                await r(),
                t.total && o(e, "total"),
                t.autoEnd && a.forEach((t, r) => o(e, r)),
                "function" == typeof t.enabled ? t.enabled(e) : t.enabled)
              ) {
                e.res.headers.append("Server-Timing", n.join(","));
                let r =
                  "function" == typeof t.crossOrigin
                    ? t.crossOrigin(e)
                    : t.crossOrigin;
                r &&
                  e.res.headers.append(
                    "Timing-Allow-Origin",
                    "string" == typeof r ? r : "*",
                  );
              }
            };
          },
          i = (e, t, r, n, a) => {
            let i = e.get("metric");
            if (!i)
              return void console.warn(
                "Metrics not initialized! Please add the `timing()` middleware to this route!",
              );
            if ("number" == typeof r) {
              let e = r.toFixed(a || 1),
                s = n ? `${t};dur=${e};desc="${n}"` : `${t};dur=${e}`;
              i.headers.push(s);
            } else {
              let e = r ? `${t};desc="${r}"` : `${t}`;
              i.headers.push(e);
            }
          },
          s = (e, t, r) => {
            let a = e.get("metric");
            if (!a)
              return void console.warn(
                "Metrics not initialized! Please add the `timing()` middleware to this route!",
              );
            a.timers.set(t, { description: r, start: n() });
          },
          o = (e, t, r) => {
            let a = e.get("metric");
            if (!a)
              return void console.warn(
                "Metrics not initialized! Please add the `timing()` middleware to this route!",
              );
            let s = a.timers.get(t);
            if (!s) return void console.warn(`Timer "${t}" does not exist!`);
            let { description: o, start: c } = s;
            i(e, t, n() - c, o, r), a.timers.delete(t);
          };
      },
      23897: (e, t, r) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          !(function (e, t) {
            for (var r in t)
              Object.defineProperty(e, r, { enumerable: !0, get: t[r] });
          })(t, {
            decryptActionBoundArgs: function () {
              return p;
            },
            encryptActionBoundArgs: function () {
              return m;
            },
          }),
          r(95589);
        let n = r(26394),
          a = r(34112),
          i = r(92902),
          s = r(55421),
          o = r(63033),
          c = r(62938),
          u = (function (e) {
            return e && e.__esModule ? e : { default: e };
          })(r(84147)),
          l = new TextEncoder(),
          d = new TextDecoder();
        async function h(e, t) {
          let r = await (0, s.getActionEncryptionKey)();
          if (void 0 === r)
            throw Object.defineProperty(
              Error(
                "Missing encryption key for Server Action. This is a bug in Next.js",
              ),
              "__NEXT_ERROR_CODE",
              { value: "E65", enumerable: !1, configurable: !0 },
            );
          let n = atob(t),
            a = n.slice(0, 16),
            i = n.slice(16),
            o = d.decode(
              await (0, s.decrypt)(
                r,
                (0, s.stringToUint8Array)(a),
                (0, s.stringToUint8Array)(i),
              ),
            );
          if (!o.startsWith(e))
            throw Object.defineProperty(
              Error("Invalid Server Action payload: failed to decrypt."),
              "__NEXT_ERROR_CODE",
              { value: "E191", enumerable: !1, configurable: !0 },
            );
          return o.slice(e.length);
        }
        async function f(e, t) {
          let r = await (0, s.getActionEncryptionKey)();
          if (void 0 === r)
            throw Object.defineProperty(
              Error(
                "Missing encryption key for Server Action. This is a bug in Next.js",
              ),
              "__NEXT_ERROR_CODE",
              { value: "E65", enumerable: !1, configurable: !0 },
            );
          let n = new Uint8Array(16);
          o.workUnitAsyncStorage.exit(() => crypto.getRandomValues(n));
          let a = (0, s.arrayBufferToString)(n.buffer),
            i = await (0, s.encrypt)(r, n, l.encode(e + t));
          return btoa(a + (0, s.arrayBufferToString)(i));
        }
        let m = u.default.cache(async function e(t, ...r) {
          let { clientModules: a } = (0, s.getClientReferenceManifestForRsc)(),
            u = Error();
          Error.captureStackTrace(u, e);
          let l = !1,
            d = o.workUnitAsyncStorage.getStore(),
            h =
              (null == d ? void 0 : d.type) === "prerender"
                ? (0, c.createHangingInputAbortSignal)(d)
                : void 0,
            m = await (0, i.streamToString)(
              (0, n.renderToReadableStream)(r, a, {
                signal: h,
                onError(e) {
                  (null == h || !h.aborted) &&
                    (l ||
                      ((l = !0),
                      (u.message =
                        e instanceof Error ? e.message : String(e))));
                },
              }),
              h,
            );
          if (l) throw u;
          if (!d) return f(t, m);
          let p = (0, o.getPrerenderResumeDataCache)(d),
            g = (0, o.getRenderResumeDataCache)(d),
            y = t + m,
            w =
              (null == p ? void 0 : p.encryptedBoundArgs.get(y)) ??
              (null == g ? void 0 : g.encryptedBoundArgs.get(y));
          if (w) return w;
          let b = "prerender" === d.type ? d.cacheSignal : void 0;
          null == b || b.beginRead();
          let v = await f(t, m);
          return (
            null == b || b.endRead(),
            null == p || p.encryptedBoundArgs.set(y, v),
            v
          );
        });
        async function p(e, t) {
          let r,
            n = await t,
            i = o.workUnitAsyncStorage.getStore();
          if (i) {
            let t = "prerender" === i.type ? i.cacheSignal : void 0,
              a = (0, o.getPrerenderResumeDataCache)(i),
              s = (0, o.getRenderResumeDataCache)(i);
            (r =
              (null == a ? void 0 : a.decryptedBoundArgs.get(n)) ??
              (null == s ? void 0 : s.decryptedBoundArgs.get(n))) ||
              (null == t || t.beginRead(),
              (r = await h(e, n)),
              null == t || t.endRead(),
              null == a || a.decryptedBoundArgs.set(n, r));
          } else r = await h(e, n);
          let { edgeRscModuleMapping: c, rscModuleMapping: u } = (0,
          s.getClientReferenceManifestForRsc)();
          return await (0, a.createFromReadableStream)(
            new ReadableStream({
              start(e) {
                e.enqueue(l.encode(r)),
                  (null == i ? void 0 : i.type) === "prerender"
                    ? i.renderSignal.aborted
                      ? e.close()
                      : i.renderSignal.addEventListener(
                          "abort",
                          () => e.close(),
                          { once: !0 },
                        )
                    : e.close();
              },
            }),
            {
              serverConsumerManifest: {
                moduleLoading: null,
                moduleMap: u,
                serverModuleMap: (0, s.getServerModuleMap)(),
              },
            },
          );
        }
      },
      24287: (e, t, r) => {
        Promise.resolve().then(r.bind(r, 8914)),
          Promise.resolve().then(r.bind(r, 18131)),
          Promise.resolve().then(r.bind(r, 11084));
      },
      27910: (e) => {
        "use strict";
        e.exports = require("stream");
      },
      28354: (e) => {
        "use strict";
        e.exports = require("util");
      },
      28839: (e, t, r) => {
        "use strict";
        Object.defineProperty(t, "A", {
          enumerable: !0,
          get: function () {
            return n.registerServerReference;
          },
        });
        let n = r(26394);
      },
      28964: (e, t, r) => {
        "use strict";
        r.d(t, { IB: () => n, Wk: () => o, XG: () => s, q: () => a });
        let n = ["en", "ar", "es", "fr"],
          a = "en",
          i = {
            en: {
              nativeName: "English",
              englishName: "English",
              direction: "ltr",
              dateFormat: "MM/DD/YYYY",
              flag: "\uD83C\uDDFA\uD83C\uDDF8",
              htmlLang: "en",
              calendar: "gregory",
              number: { decimal: ".", thousands: "," },
            },
            ar: {
              nativeName: "العربية",
              englishName: "Arabic",
              direction: "rtl",
              dateFormat: "DD/MM/YYYY",
              flag: "\uD83C\uDDF8\uD83C\uDDE6",
              htmlLang: "ar",
              calendar: "islamic",
              fontClass: "font-arabic",
              number: { decimal: "٫", thousands: "٬" },
            },
            fr: {
              nativeName: "Fran\xe7ais",
              englishName: "French",
              direction: "ltr",
              dateFormat: "DD/MM/YYYY",
              flag: "\uD83C\uDDEB\uD83C\uDDF7",
              htmlLang: "fr",
              calendar: "gregory",
              number: { decimal: ",", thousands: " " },
            },
            es: {
              nativeName: "Espa\xf1ol",
              englishName: "Spanish",
              direction: "ltr",
              dateFormat: "DD/MM/YYYY",
              flag: "\uD83C\uDDEA\uD83C\uDDF8",
              htmlLang: "es",
              calendar: "gregory",
              number: { decimal: ",", thousands: "." },
            },
          };
        function s(e) {
          return i[e] || i[a];
        }
        function o(e) {
          return s(e).fontClass;
        }
      },
      29021: (e) => {
        "use strict";
        e.exports = require("fs");
      },
      29294: (e) => {
        "use strict";
        e.exports = require("next/dist/server/app-render/work-async-storage.external.js");
      },
      29741: (e, t, r) => {
        "use strict";
        r.d(t, { W: () => n });
        var n = (e) => {
          let t = {
              origin: "*",
              allowMethods: ["GET", "HEAD", "PUT", "POST", "DELETE", "PATCH"],
              allowHeaders: [],
              exposeHeaders: [],
              ...e,
            },
            r = ((e) => {
              if ("string" == typeof e)
                if ("*" === e) return () => e;
                else return (t) => (e === t ? t : null);
              return "function" == typeof e
                ? e
                : (t) => (e.includes(t) ? t : null);
            })(t.origin),
            n = ((e) =>
              "function" == typeof e
                ? e
                : Array.isArray(e)
                  ? () => e
                  : () => [])(t.allowMethods);
          return async function (e, a) {
            function i(t, r) {
              e.res.headers.set(t, r);
            }
            let s = r(e.req.header("origin") || "", e);
            if ((s && i("Access-Control-Allow-Origin", s), "*" !== t.origin)) {
              let t = e.req.header("Vary");
              i("Vary", t || "Origin");
            }
            if (
              (t.credentials && i("Access-Control-Allow-Credentials", "true"),
              t.exposeHeaders?.length &&
                i("Access-Control-Expose-Headers", t.exposeHeaders.join(",")),
              "OPTIONS" === e.req.method)
            ) {
              null != t.maxAge &&
                i("Access-Control-Max-Age", t.maxAge.toString());
              let r = n(e.req.header("origin") || "", e);
              r.length && i("Access-Control-Allow-Methods", r.join(","));
              let a = t.allowHeaders;
              if (!a?.length) {
                let t = e.req.header("Access-Control-Request-Headers");
                t && (a = t.split(/\s*,\s*/));
              }
              return (
                a?.length &&
                  (i("Access-Control-Allow-Headers", a.join(",")),
                  e.res.headers.append(
                    "Vary",
                    "Access-Control-Request-Headers",
                  )),
                e.res.headers.delete("Content-Length"),
                e.res.headers.delete("Content-Type"),
                new Response(null, {
                  headers: e.res.headers,
                  status: 204,
                  statusText: "No Content",
                })
              );
            }
            await a();
          };
        };
      },
      29952: (e, t, r) => {
        "use strict";
        r.d(t, { p: () => n });
        var n = (e) => (t) => e.fetch(t);
      },
      31366: (e, t, r) => {
        "use strict";
        r.d(t, { P: () => a });
        var n = [200],
          a = (e) => {
            if (!globalThis.caches)
              return (
                console.log(
                  "Cache Middleware is not enabled because caches is not defined.",
                ),
                async (e, t) => await t()
              );
            void 0 === e.wait && (e.wait = !1);
            let t = e.cacheControl?.split(",").map((e) => e.toLowerCase()),
              r = Array.isArray(e.vary)
                ? e.vary
                : e.vary?.split(",").map((e) => e.trim());
            if (e.vary?.includes("*"))
              throw Error(
                'Middleware vary configuration cannot include "*", as it disallows effective caching.',
              );
            let a = new Set(e.cacheableStatusCodes ?? n),
              i = (e) => {
                if (t) {
                  let r =
                    e.res.headers
                      .get("Cache-Control")
                      ?.split(",")
                      .map((e) => e.trim().split("=", 1)[0]) ?? [];
                  for (let n of t) {
                    let [t, a] = n.trim().split("=", 2);
                    (t = t.toLowerCase()),
                      r.includes(t) ||
                        e.header("Cache-Control", `${t}${a ? `=${a}` : ""}`, {
                          append: !0,
                        });
                  }
                }
                if (r) {
                  let t = Array.from(
                    new Set(
                      [
                        ...(e.res.headers
                          .get("Vary")
                          ?.split(",")
                          .map((e) => e.trim()) ?? []),
                        ...r,
                      ].map((e) => e.toLowerCase()),
                    ),
                  ).sort();
                  t.includes("*")
                    ? e.header("Vary", "*")
                    : e.header("Vary", t.join(", "));
                }
              };
            return async function (t, r) {
              let n = t.req.url;
              e.keyGenerator && (n = await e.keyGenerator(t));
              let s =
                  "function" == typeof e.cacheName
                    ? await e.cacheName(t)
                    : e.cacheName,
                o = await caches.open(s),
                c = await o.match(n);
              if (c) return new Response(c.body, c);
              if ((await r(), !a.has(t.res.status))) return;
              i(t);
              let u = t.res.clone();
              e.wait
                ? await o.put(n, u)
                : t.executionCtx.waitUntil(o.put(n, u));
            };
          };
      },
      31421: (e) => {
        "use strict";
        e.exports = require("node:child_process");
      },
      31661: (e, t, r) => {
        "use strict";
        r.d(t, { T: () => d });
        var n = r(43774),
          a = r(54016),
          i = r(58342),
          s = r(79273);
        let o = i.Ik({
            page: i.au.number().int().min(1).optional().default(1),
            limit: i.au.number().int().min(1).max(100).optional().default(10),
            search: i.Yj().optional(),
          }),
          c = i.Ik({
            name: i
              .Yj()
              .min(2, { message: "Name must be at least 2 characters long" }),
            email: i.Yj().email({ message: "Invalid email address" }),
          }),
          u = i
            .Ik({
              name: i
                .Yj()
                .min(2, { message: "Name must be at least 2 characters long" })
                .optional(),
              email: i
                .Yj()
                .email({ message: "Invalid email address" })
                .optional(),
            })
            .refine((e) => Object.keys(e).length > 0, {
              message:
                "At least one field (name or email) must be provided for update",
            }),
          l = (e, t, r) => {
            console.error(`Error: ${t}:`, e);
            let n = t,
              i = 500;
            if (e?.code === "PGRST116" || e?.message?.includes("PGRST116"))
              (n = "Resource not found"), (i = 404);
            else if (e?.code === "23505" || e?.message?.includes("23505"))
              (n = "Resource already exists or conflicts with existing data"),
                (i = 409);
            else if (e instanceof s.G)
              throw new a.y(400, { message: "Invalid input", cause: e.errors });
            throw new a.y(i, { message: n });
          },
          d = (e) => {
            let t = new n.$();
            return (
              t.use("*", async (e, t) => {
                if (!e.get("user"))
                  throw new a.y(401, { message: "Unauthorized" });
                await t();
              }),
              t.get("/", async (e) => {
                try {
                  let t = o.safeParse(e.req.query());
                  if (!t.success)
                    throw new a.y(400, {
                      message: "Invalid query parameters",
                      cause: t.error.errors,
                    });
                  let { page: r, limit: n, search: i } = t.data,
                    s = (r - 1) * n,
                    c = e
                      .get("db")
                      .from("users")
                      .select("id, name, email, created_at", {
                        count: "exact",
                      });
                  i && (c = c.ilike("name", `%${i}%`));
                  let {
                    data: u,
                    count: l,
                    error: d,
                  } = await c
                    .range(s, s + n - 1)
                    .order("created_at", { ascending: !1 });
                  if (d) throw d;
                  let h = {
                    data: u || [],
                    pagination: {
                      total: l || 0,
                      page: r,
                      limit: n,
                      hasMore: (l || 0) > s + (u?.length || 0),
                    },
                  };
                  return e.json({ data: h });
                } catch (t) {
                  return l(t, "Error fetching users", e);
                }
              }),
              t.post("/", async (e) => {
                try {
                  let t = await e.req.json(),
                    r = c.safeParse(t);
                  if (!r.success)
                    throw new a.y(400, {
                      message: "Invalid request body",
                      cause: r.error.errors,
                    });
                  let { name: n, email: i } = r.data,
                    s = e.get("db"),
                    { data: o, error: u } = await s
                      .from("users")
                      .select("id")
                      .eq("email", i)
                      .maybeSingle();
                  if (
                    (u &&
                      "PGRST116" !== u.code &&
                      console.error("Error checking for existing user:", u),
                    o)
                  )
                    return l({ code: "23505" }, "User already exists", e);
                  let { data: d, error: h } = await s
                    .from("users")
                    .insert({ name: n, email: i })
                    .select("id, name, email, created_at")
                    .single();
                  if (h) throw h;
                  if (!d)
                    throw Error("User data was not returned after insert.");
                  return e.json({ data: d }, 201);
                } catch (t) {
                  return l(t, "Error creating user", e);
                }
              }),
              t.get("/:id", async (e) => {
                try {
                  let t = e.req.param("id");
                  if (!t)
                    throw new a.y(400, { message: "User ID is required" });
                  let r = e.get("db"),
                    { data: n, error: i } = await r
                      .from("users")
                      .select("id, name, email, created_at")
                      .eq("id", t)
                      .single();
                  if (i) throw i;
                  return e.json({ data: n });
                } catch (t) {
                  return l(t, "Error fetching user", e);
                }
              }),
              t.patch("/:id", async (e) => {
                try {
                  let t = e.req.param("id");
                  if (!t)
                    throw new a.y(400, { message: "User ID is required" });
                  let r = await e.req.json(),
                    n = u.safeParse(r);
                  if (!n.success)
                    throw new a.y(400, {
                      message: "Invalid request body",
                      cause: n.error.errors,
                    });
                  let i = n.data,
                    s = e.get("db"),
                    { data: o, error: c } = await s
                      .from("users")
                      .update(i)
                      .eq("id", t)
                      .select("id, name, email, created_at")
                      .single();
                  if (c) throw c;
                  if (!o)
                    throw Error("User data was not returned after update.");
                  return e.json({ data: o });
                } catch (t) {
                  return l(t, "Error updating user", e);
                }
              }),
              t.delete("/:id", async (e) => {
                try {
                  let t = e.req.param("id");
                  if (!t)
                    throw new a.y(400, { message: "User ID is required" });
                  let r = e.get("db"),
                    { data: n, error: i } = await r
                      .from("users")
                      .select("id")
                      .eq("id", t)
                      .maybeSingle();
                  if (i && "PGRST116" !== i.code) throw i;
                  if (!n) throw new a.y(404, { message: "User not found" });
                  let { error: s } = await r.from("users").delete().eq("id", t);
                  if (s) throw s;
                  return e.json({ message: "User deleted successfully" }, 200);
                } catch (t) {
                  return l(t, "Error deleting user", e);
                }
              }),
              t
            );
          };
      },
      33873: (e) => {
        "use strict";
        e.exports = require("path");
      },
      34067: (e, t, r) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          !(function (e, t) {
            for (var r in t)
              Object.defineProperty(e, r, { enumerable: !0, get: t[r] });
          })(t, {
            normalizeAppPath: function () {
              return i;
            },
            normalizeRscURL: function () {
              return s;
            },
          });
        let n = r(49106),
          a = r(49760);
        function i(e) {
          return (0, n.ensureLeadingSlash)(
            e
              .split("/")
              .reduce(
                (e, t, r, n) =>
                  !t ||
                  (0, a.isGroupSegment)(t) ||
                  "@" === t[0] ||
                  (("page" === t || "route" === t) && r === n.length - 1)
                    ? e
                    : e + "/" + t,
                "",
              ),
          );
        }
        function s(e) {
          return e.replace(/\.rsc($|\?)/, "$1");
        }
      },
      34283: (e, t, r) => {
        "use strict";
        r.d(t, { W: () => c });
        var n = r(4839),
          a = r(31366),
          i = r(54016),
          s = r(58342),
          o = r(26457);
        function c(e) {
          let t = s.Ik({ country: s.Yj().min(2).max(100) }),
            r = s.Ik({
              countries: s.YO(s.Yj().min(2).max(100)).min(2).max(5),
              category: s
                .k5([
                  "visa",
                  "citizenship",
                  "residence",
                  "business",
                  "tax",
                  "education",
                  "healthcare",
                ])
                .optional(),
            });
          return (
            e.get(
              "/immigration/country",
              (0, n.l)("query", t),
              (0, a.P)({
                cacheName: "immigration-country",
                cacheControl: "public, max-age=86400",
              }),
              async (e) => {
                let { country: t } = e.req.valid("query");
                try {
                  let r = (0, o.r)(),
                    { data: n, error: a } = await r
                      .from("immigration_data")
                      .select("*")
                      .eq("country", t)
                      .single();
                  if (a) throw a;
                  return e.json({ success: !0, data: n });
                } catch (e) {
                  throw (
                    (console.error("Immigration data fetch error:", e),
                    new i.y(500, {
                      message: "Failed to fetch immigration data",
                    }))
                  );
                }
              },
            ),
            e.post(
              "/immigration/compare",
              (0, n.l)("json", r),
              (0, a.P)({
                cacheName: "immigration-compare",
                cacheControl: "public, max-age=86400",
              }),
              async (e) => {
                let { countries: t, category: r } = e.req.valid("json");
                try {
                  let n = (0, o.r)(),
                    { data: a, error: i } = await n
                      .from("immigration_data")
                      .select("*")
                      .in("country", t);
                  if (i) throw i;
                  let s = a;
                  return (
                    r && (s = a.filter((e) => e.category === r)),
                    e.json({ success: !0, data: s })
                  );
                } catch (e) {
                  throw (
                    (console.error("Immigration comparison error:", e),
                    new i.y(500, {
                      message: "Failed to compare immigration data",
                    }))
                  );
                }
              },
            ),
            e.get(
              "/immigration/countries",
              (0, a.P)({
                cacheName: "immigration-countries",
                cacheControl: "public, max-age=86400",
              }),
              async (e) => {
                try {
                  let t = (0, o.r)(),
                    { data: r, error: n } = await t
                      .from("immigration_data")
                      .select("country")
                      .order("country");
                  if (n) throw n;
                  let a = [...new Set(r.map((e) => e.country))];
                  return e.json({ success: !0, countries: a });
                } catch (e) {
                  throw (
                    (console.error("Countries fetch error:", e),
                    new i.y(500, { message: "Failed to fetch countries" }))
                  );
                }
              },
            ),
            e
          );
        }
      },
      34631: (e) => {
        "use strict";
        e.exports = require("tls");
      },
      35063: (e, t, r) => {
        Promise.resolve().then(r.bind(r, 70724)),
          Promise.resolve().then(r.bind(r, 59889)),
          Promise.resolve().then(r.bind(r, 78167));
      },
      35621: (e, t, r) => {
        "use strict";
        r.d(t, { wJ: () => a });
        var n = r(60442);
        function a(e = {}) {
          return async (t, r) => {
            try {
              n.addBreadcrumb({
                type: "http",
                category: "http",
                data: {
                  url: t.req.url,
                  method: t.req.method,
                  path: t.req.path,
                },
                level: "info",
              });
              let e =
                t.get("requestId") ||
                (function () {
                  return (
                    Date.now().toString(36) +
                    Math.random().toString(36).substring(2, 12)
                  );
                })();
              t.set("requestId", e);
              let a = t.get("user");
              a
                ? n.setUser({
                    id: a.id,
                    email: a.email,
                    ip_address:
                      t.req.header("x-forwarded-for") ||
                      t.req.header("x-real-ip") ||
                      "unknown",
                  })
                : n.setUser({
                    id: "anonymous",
                    ip_address:
                      t.req.header("x-forwarded-for") ||
                      t.req.header("x-real-ip") ||
                      "unknown",
                  }),
                n.setContext(
                  "request",
                  (function (e) {
                    let t = {};
                    return (
                      e.req.raw.headers.forEach((e, r) => {
                        t[r] = e;
                      }),
                      {
                        url: e.req.url,
                        method: e.req.method,
                        path: e.req.path,
                        headers: t,
                        query_params: e.req.query(),
                      }
                    );
                  })(t),
                ),
                await r();
            } catch (s) {
              let r = {
                message: s.message || "Unknown error",
                path: t.req.path,
                method: t.req.method,
                timestamp: new Date().toISOString(),
                statusCode: s.status || 500,
                userId: t.get("user")?.id,
                details: s.details,
                requestId: t.get("requestId"),
                component: e.component || "api",
              };
              (function (e) {
                {
                  let t = {
                      ...e,
                      timestamp: e.timestamp,
                      userAgent: e.details?.userAgent,
                    },
                    r = Error(e.message);
                  e.stack && (r.stack = e.stack),
                    e.component && n.setTag("component", e.component),
                    e.tags &&
                      Object.entries(e.tags).forEach(([e, t]) => {
                        n.setTag(e, t);
                      }),
                    n.captureException(r, { extra: t }),
                    console.error("\uD83D\uDD34 API Error:", JSON.stringify(e));
                }
              })(r);
              let a = {
                success: !1,
                error: "Internal Server Error",
                ...{},
                requestId: r.requestId,
              };
              t.header("X-Request-ID", r.requestId || "unknown");
              let i = r.statusCode;
              return t.json(a, i);
            }
          };
        }
      },
      36246: (e, t, r) => {
        "use strict";
        r.a(e, async (e, n) => {
          try {
            r.r(t),
              r.d(t, {
                patchFetch: () => u,
                routeModule: () => l,
                serverHooks: () => f,
                workAsyncStorage: () => d,
                workUnitAsyncStorage: () => h,
              });
            var a = r(94168),
              i = r(51293),
              s = r(64588),
              o = r(76367),
              c = e([o]);
            o = (c.then ? (await c)() : c)[0];
            let l = new a.AppRouteRouteModule({
                definition: {
                  kind: i.RouteKind.APP_ROUTE,
                  page: "/api/[[...route]]/route",
                  pathname: "/api/[[...route]]",
                  filename: "route",
                  bundlePath: "app/api/[[...route]]/route",
                },
                resolvedPagePath:
                  "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\api\\[[...route]]\\route.ts",
                nextConfigOutput: "",
                userland: o,
              }),
              {
                workAsyncStorage: d,
                workUnitAsyncStorage: h,
                serverHooks: f,
              } = l;
            function u() {
              return (0, s.patchFetch)({
                workAsyncStorage: d,
                workUnitAsyncStorage: h,
              });
            }
            n();
          } catch (e) {
            n(e);
          }
        });
      },
      36686: (e) => {
        "use strict";
        e.exports = require("diagnostics_channel");
      },
      37067: (e) => {
        "use strict";
        e.exports = require("node:http");
      },
      37226: (e, t, r) => {
        "use strict";
        r.d(t, { A: () => o });
        var n = r(89882),
          a = r(58007);
        let i = "locale",
          s = !1;
        function o() {
          let e,
            t = (0, n.useParams)();
          try {
            e = (0, a.useLocale)();
          } catch (r) {
            if ("string" != typeof (null == t ? void 0 : t[i])) throw r;
            s ||
              (console.warn(
                "Deprecation warning: `useLocale` has returned a default from `useParams().locale` since no `NextIntlClientProvider` ancestor was found for the calling component. This behavior will be removed in the next major version. Please ensure all Client Components that use `next-intl` are wrapped in a `NextIntlClientProvider`.",
              ),
              (s = !0)),
              (e = t[i]);
          }
          return e;
        }
      },
      38522: (e) => {
        "use strict";
        e.exports = require("node:zlib");
      },
      39512: (e, t, r) => {
        "use strict";
        async function n() {
          let { navigator: e } = globalThis;
          return !(void 0 !== e && "Cloudflare-Workers" === e.userAgent
            ? await (async () => {
                try {
                  return (
                    "NO_COLOR" in
                    ((await r(48714)("cloudflare:workers")).env ?? {})
                  );
                } catch {
                  return !1;
                }
              })()
            : !(function () {
                let { process: e, Deno: t } = globalThis;
                return !("boolean" == typeof t?.noColor
                  ? t.noColor
                  : void 0 !== e && "NO_COLOR" in e?.env);
              })());
        }
        r.d(t, { v: () => c });
        var a = (e) => {
            let [t, r] = [",", "."];
            return e
              .map((e) => e.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1" + t))
              .join(r);
          },
          i = (e) => {
            let t = Date.now() - e;
            return a([t < 1e3 ? t + "ms" : Math.round(t / 1e3) + "s"]);
          },
          s = async (e) => {
            if (await n())
              switch ((e / 100) | 0) {
                case 5:
                  return `\x1b[31m${e}\x1b[0m`;
                case 4:
                  return `\x1b[33m${e}\x1b[0m`;
                case 3:
                  return `\x1b[36m${e}\x1b[0m`;
                case 2:
                  return `\x1b[32m${e}\x1b[0m`;
              }
            return `${e}`;
          };
        async function o(e, t, r, n, a = 0, i) {
          e(
            "<--" === t
              ? `${t} ${r} ${n}`
              : `${t} ${r} ${n} ${await s(a)} ${i}`,
          );
        }
        var c = (e = console.log) =>
          async function (t, r) {
            let { method: n, url: a } = t.req,
              s = a.slice(a.indexOf("/", 8));
            await o(e, "<--", n, s);
            let c = Date.now();
            await r(), await o(e, "--\x3e", n, s, t.res.status, i(c));
          };
      },
      39750: (e, t, r) => {
        "use strict";
        r.d(t, { MU: () => f, wc: () => h });
        var n = r(73346),
          a = r(56838);
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
        let i = process.env.UPSTASH_REDIS_REST_URL,
          s = process.env.UPSTASH_REDIS_REST_TOKEN,
          o = {
            HITS: "cache:stats:hits",
            MISSES: "cache:stats:misses",
            KEYS: "cache:stats:keys",
          },
          c = null,
          u = !1;
        function l() {
          return (
            u ||
              ((c = (function () {
                if (!i || !s)
                  return (
                    console.warn(
                      "[Redis Client] Missing Redis URL or Token in environment variables. Redis client will not be initialized.",
                    ),
                    null
                  );
                try {
                  return new n.Q({
                    url: i,
                    token: s,
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
              (u = !0)),
            c
          );
        }
        let d = l(),
          h = {
            async get(e) {
              if (!d)
                return (
                  console.warn(
                    "[translationCache.get] Redis client not available.",
                  ),
                  null
                );
              try {
                let t = await d.get(`i18n:${e}`);
                return t ? JSON.parse(t) : null;
              } catch (e) {
                return console.error("Translation cache get error:", e), null;
              }
            },
            async set(e, t, r = 3600) {
              if (!d)
                return void console.warn(
                  "[translationCache.set] Redis client not available.",
                );
              try {
                await d.setex(`i18n:${e}`, r, JSON.stringify(t));
              } catch (e) {
                console.error("Translation cache set error:", e);
              }
            },
            async invalidate(e) {
              if (!d)
                return void console.warn(
                  "[translationCache.invalidate] Redis client not available.",
                );
              try {
                await d.del(`i18n:${e}`);
              } catch (e) {
                console.error("Translation cache invalidate error:", e);
              }
            },
            async invalidateAll() {
              if (!d)
                return void console.warn(
                  "[translationCache.invalidateAll] Redis client not available.",
                );
              try {
                let e = await d.keys("i18n:*");
                e.length > 0 && (await d.del(...e));
              } catch (e) {
                console.error("Translation cache invalidate all error:", e);
              }
            },
          };
        function f(e = {}) {
          return async (t, r) => {
            if (!d)
              return (
                console.warn(
                  "[redisApiCacheMiddleware] Redis client not available. Skipping cache.",
                ),
                r()
              );
            if ("GET" !== t.req.method) return r();
            t.req.header("Cache-Control");
            let n = (
              e.key ||
              function (e) {
                let t = new URL(e.req.url),
                  r = e.get("user"),
                  n = r?.id || "anonymous",
                  a = t.pathname + t.search;
                return `cache:${n}:${a}`;
              }
            )(t);
            try {
              let r = await d.get(n);
              if (r) {
                await d.incr(o.HITS),
                  t.header("X-Cache", "HIT"),
                  t.header("X-Cache-Key", n);
                let a = e.ttl ? e.ttl.toString() : "300";
                return (
                  t.header("Cache-Control", `public, max-age=${a}`),
                  t.json(JSON.parse(r))
                );
              }
              await d.incr(o.MISSES);
            } catch (e) {
              console.error("Redis cache read error:", e);
            }
            if (
              (t.header("X-Cache", "MISS"),
              t.header("X-Cache-Key", n),
              await r(),
              t.res && t.res.status >= 200 && t.res.status < 300)
            )
              try {
                let r = await t.res.clone().json(),
                  a = e.ttl || 300;
                await d.set(n, JSON.stringify(r), { ex: a }),
                  await d.sadd(o.KEYS, n),
                  t.header("Cache-Control", `public, max-age=${a}`);
              } catch (e) {
                console.error("Redis cache write error:", e);
              }
          };
        }
        class m {
          constructor(e = {}) {
            (this.redisClientInternal = null),
              (this.redisClientInternal = l()),
              this.redisClientInternal ||
                console.warn(
                  "[CacheManager] Redis client is not available. CacheManager will operate in LRU-only mode.",
                ),
              (this.redisKeyPrefix = e.redisKeyPrefix || "cacheManager:"),
              (this.lruCache = new a.q({
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
              let n = this.getPrefixedKey(e);
              try {
                await this.redisClientInternal.set(n, t, { ex: r || 3600 });
              } catch (e) {
                console.error(`CacheManager: Redis set error for key ${n}:`, e);
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
                    n = t[1];
                  n.length > 0 && (await this.redisClientInternal.del(...n)),
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
        new m();
      },
      41692: (e) => {
        "use strict";
        e.exports = require("node:tls");
      },
      44708: (e) => {
        "use strict";
        e.exports = require("node:https");
      },
      44870: (e) => {
        "use strict";
        e.exports = require("next/dist/compiled/next-server/app-route.runtime.prod.js");
      },
      48161: (e) => {
        "use strict";
        e.exports = require("node:os");
      },
      48693: (e, t, r) => {
        "use strict";
        r.d(t, { q: () => y });
        var n = r(4839),
          a = r(43774),
          i = r(58342),
          s = r(11595),
          o = r(62817),
          c = r(26457);
        class u {
          constructor(e) {
            (this.id = e.id),
              (this.name = e.name),
              (this.description = e.description),
              (this.type = e.type),
              (this.status = e.status),
              (this.ownerId = e.ownerId),
              (this.versions = e.versions || []),
              (this.access = e.access || []),
              (this.caseIds = e.caseIds || []),
              (this.expiryDate = e.expiryDate || null),
              (this.issuedBy = e.issuedBy || null),
              (this.issuedDate = e.issuedDate || null),
              (this.documentNumber = e.documentNumber || null),
              (this.tags = e.tags || []),
              (this.metadata = e.metadata || {}),
              (this.createdAt = e.createdAt || new Date()),
              (this.updatedAt = e.updatedAt || new Date());
          }
          hasAccess(e, t) {
            if (this.ownerId === e) return !0;
            let r = this.access.find(
              (t) =>
                t.userId === e && (!t.expiresAt || t.expiresAt > new Date()),
            );
            return (
              !!r &&
              ("admin" === r.permission ||
                "view" === t ||
                ("edit" === t
                  ? ["edit", "admin"].includes(r.permission)
                  : "delete" === t &&
                    ["delete", "admin"].includes(r.permission)))
            );
          }
          addVersion(e) {
            let t = { ...e, documentId: this.id };
            return this.versions.push(t), (this.updatedAt = new Date()), this;
          }
          getLatestVersion() {
            return 0 === this.versions.length
              ? null
              : [...this.versions].sort(
                  (e, t) => t.createdAt.getTime() - e.createdAt.getTime(),
                )[0];
          }
          grantAccess(e) {
            let t = this.access.findIndex((t) => t.userId === e.userId),
              r = { ...e, documentId: this.id };
            return (
              t >= 0 ? (this.access[t] = r) : this.access.push(r),
              (this.updatedAt = new Date()),
              this
            );
          }
          revokeAccess(e) {
            return (
              (this.access = this.access.filter((t) => t.userId !== e)),
              (this.updatedAt = new Date()),
              this
            );
          }
          addToCase(e) {
            return (
              this.caseIds.includes(e) ||
                (this.caseIds.push(e), (this.updatedAt = new Date())),
              this
            );
          }
          removeFromCase(e) {
            return (
              (this.caseIds = this.caseIds.filter((t) => t !== e)),
              (this.updatedAt = new Date()),
              this
            );
          }
          updateMetadata(e) {
            return (
              (this.metadata = { ...this.metadata, ...e }),
              (this.updatedAt = new Date()),
              this
            );
          }
          changeStatus(e, t) {
            return (
              (this.status = e),
              (this.updatedAt = new Date()),
              (this.metadata.statusHistory = this.metadata.statusHistory || []),
              this.metadata.statusHistory.push({
                from: this.status,
                to: e,
                changedBy: t,
                changedAt: new Date(),
              }),
              this
            );
          }
          update(e) {
            return (
              void 0 !== e.name && (this.name = e.name),
              void 0 !== e.description && (this.description = e.description),
              void 0 !== e.type && (this.type = e.type),
              void 0 !== e.expiryDate && (this.expiryDate = e.expiryDate),
              void 0 !== e.issuedBy && (this.issuedBy = e.issuedBy),
              void 0 !== e.issuedDate && (this.issuedDate = e.issuedDate),
              void 0 !== e.documentNumber &&
                (this.documentNumber = e.documentNumber),
              void 0 !== e.tags && (this.tags = e.tags),
              (this.updatedAt = new Date()),
              this
            );
          }
          toObject() {
            return {
              id: this.id,
              name: this.name,
              description: this.description,
              type: this.type,
              status: this.status,
              ownerId: this.ownerId,
              versions: this.versions,
              access: this.access,
              caseIds: this.caseIds,
              expiryDate: this.expiryDate,
              issuedBy: this.issuedBy,
              issuedDate: this.issuedDate,
              documentNumber: this.documentNumber,
              tags: this.tags,
              metadata: this.metadata,
              createdAt: this.createdAt,
              updatedAt: this.updatedAt,
              latestVersion: this.getLatestVersion(),
            };
          }
          static fromDatabase(e) {
            let t = (e) => (e ? (e instanceof Date ? e : new Date(e)) : null),
              r = Array.isArray(e.versions)
                ? e.versions.map((e) => ({
                    ...e,
                    createdAt: t(e.createdAt) || new Date(),
                  }))
                : [],
              n = Array.isArray(e.access)
                ? e.access.map((e) => ({
                    ...e,
                    grantedAt: t(e.grantedAt) || new Date(),
                    expiresAt: t(e.expiresAt),
                  }))
                : [];
            return new u({
              id: e.id,
              name: e.name,
              description: e.description,
              type: e.type,
              status: e.status,
              ownerId: e.owner_id || e.ownerId,
              versions: r,
              access: n,
              caseIds: e.case_ids || e.caseIds || [],
              expiryDate: t(e.expiry_date || e.expiryDate),
              issuedBy: e.issued_by || e.issuedBy,
              issuedDate: t(e.issued_date || e.issuedDate),
              documentNumber: e.document_number || e.documentNumber,
              tags: e.tags || [],
              metadata: e.metadata || {},
              createdAt: t(e.created_at || e.createdAt) || new Date(),
              updatedAt: t(e.updated_at || e.updatedAt) || new Date(),
            });
          }
        }
        var l = r(63258),
          d = r(90992);
        class h {
          constructor() {
            this.caseService = new l.U();
          }
          async getCaseById(e, t) {
            if (t && !(await d.H7.userHasAccess(e, t)))
              throw Error("Access denied");
            let r = await d.H7.getById(e);
            return r ? d.H7.toDomainEntity(r) : null;
          }
          async getCasesByUser(e, t) {
            return (await d.H7.getByUserId(e, t)).map((e) =>
              d.H7.toDomainEntity(e),
            );
          }
          async createCase(e) {
            let t = this.caseService.generateCaseNumber(e.caseType),
              r = {
                id: crypto.randomUUID(),
                eventType: "case_created",
                title: "Case created",
                description: `Case was created by ${e.createdBy}`,
                createdBy: e.createdBy,
                timestamp: new Date(),
                metadata: { caseType: e.caseType },
              },
              n = {
                userId: e.createdBy,
                role: "owner",
                assignedAt: new Date(),
                assignedBy: "system",
              },
              a = await d.H7.create({
                case_number: t,
                title: e.title,
                description: e.description || null,
                status: o.VV.DRAFT,
                case_type: e.caseType,
                client_id: e.clientId,
                timeline: [r],
                assignments: [n],
                priority: e.priority || "medium",
                due_date: e.dueDate ? new Date(e.dueDate).toISOString() : null,
                tags: e.tags || [],
                metadata: e.metadata || {},
              });
            return d.H7.toDomainEntity(a);
          }
          async updateCase(e, t, r) {
            let n = await this.getCaseById(e, t);
            if (!n) throw Error("Case not found");
            let a = n.getUserRole(t);
            if (!this.caseService.canPerformAction(a, "edit"))
              throw Error("Permission denied: User cannot edit this case");
            let i = n.update(r, t),
              s = await d.H7.update(e, {
                title: i.title,
                description: i.description,
                priority: i.priority,
                due_date: i.dueDate?.toISOString() || null,
                tags: i.tags,
                metadata: i.metadata,
                timeline: i.timeline.map((e) => ({
                  ...e,
                  timestamp: e.timestamp.toISOString(),
                })),
              });
            return d.H7.toDomainEntity(s);
          }
          async changeStatus(e, t, r, n) {
            let a = await this.getCaseById(e, t);
            if (!a) throw Error("Case not found");
            let i = a.getUserRole(t);
            if (!this.caseService.canPerformAction(i, "change_status"))
              throw Error(
                "Permission denied: User cannot change the status of this case",
              );
            if (!this.caseService.isValidStatusTransition(a.status, r))
              throw Error(`Invalid status transition from ${a.status} to ${r}`);
            let s = a.changeStatus(r, t, n),
              o = await d.H7.update(e, {
                status: r,
                timeline: s.timeline.map((e) => ({
                  ...e,
                  timestamp: e.timestamp.toISOString(),
                })),
              });
            return d.H7.toDomainEntity(o);
          }
          async assignUser(e, t, r, n) {
            let a = await this.getCaseById(e, n);
            if (!a) throw Error("Case not found");
            let i = a.getUserRole(n);
            if (!this.caseService.canPerformAction(i, "assign"))
              throw Error(
                "Permission denied: User cannot assign others to this case",
              );
            return (
              a.assignUser(t, r, n),
              await d.H7.assignUser(e, t, r),
              this.getCaseById(e)
            );
          }
          async removeAssignment(e, t, r, n) {
            let a = await this.getCaseById(e, r);
            if (!a) throw Error("Case not found");
            let i = a.getUserRole(r);
            if (!this.caseService.canPerformAction(i, "assign"))
              throw Error(
                "Permission denied: User cannot remove assignments from this case",
              );
            let s = a.removeAssignment(t, r, n);
            return (
              await d.H7.removeAssignment(e, t),
              await d.H7.updateTimeline(
                e,
                s.timeline.map((e) => ({
                  ...e,
                  timestamp: e.timestamp.toISOString(),
                })),
              ),
              this.getCaseById(e)
            );
          }
          async addDocument(e, t, r) {
            let [n, a] = await Promise.all([
              this.getCaseById(e, r),
              d.cX.getById(t),
            ]);
            if (!n) throw Error("Case not found");
            if (!a) throw Error("Document not found");
            let i = n.getUserRole(r);
            if (!this.caseService.canPerformAction(i, "add_document"))
              throw Error(
                "Permission denied: User cannot add documents to this case",
              );
            let s = this.caseService.createDocumentEvent(t, a.name, r),
              o = n.addTimelineEvent(s);
            return (
              await d.H7.addDocument(e, t),
              await d.H7.updateTimeline(
                e,
                o.timeline.map((e) => ({
                  ...e,
                  timestamp: e.timestamp.toISOString(),
                })),
              ),
              this.getCaseById(e)
            );
          }
          async getCaseWithDetails(e, t) {
            if (t && !(await d.H7.userHasAccess(e, t)))
              throw Error("Access denied");
            let r = await d.H7.getWithDetails(e);
            if (!r) throw Error("Case not found");
            return {
              case: d.H7.toDomainEntity(r.case),
              documents: r.documents.map((e) => u.fromDatabase(e)),
              messages: r.messages,
            };
          }
          async calculateCompletionPercentage(e) {
            let t = await d.H7.getWithDetails(e);
            if (!t) throw Error("Case not found");
            let r = d.H7.toDomainEntity(t.case),
              n = t.documents.map((e) => e.name);
            return this.caseService.calculateCompletionPercentage(r, n);
          }
          getRequiredDocuments(e) {
            return this.caseService.getRequiredDocuments(e);
          }
          estimateProcessingTime(e) {
            return this.caseService.estimateProcessingTime(e);
          }
        }
        let f = i.Ik({
            title: i.Yj().min(3).max(100),
            description: i.Yj().max(2e3).optional(),
            caseType: i.fc(o.X3),
            clientId: i.Yj().uuid(),
            priority: i.k5(["low", "medium", "high", "urgent"]).optional(),
            dueDate: i.Yj().datetime().optional().nullable(),
            tags: i.YO(i.Yj()).optional(),
            metadata: i.g1(i.bz()).optional(),
          }),
          m = i.Ik({
            title: i.Yj().min(3).max(100).optional(),
            description: i.Yj().max(2e3).optional().nullable(),
            priority: i.k5(["low", "medium", "high", "urgent"]).optional(),
            dueDate: i.Yj().datetime().optional().nullable(),
            tags: i.YO(i.Yj()).optional(),
            metadata: i.g1(i.bz()).optional(),
          }),
          p = i.Ik({ status: i.fc(o.VV), reason: i.Yj().max(500).optional() }),
          g = i.Ik({
            userId: i.Yj().uuid(),
            role: i.k5(["owner", "collaborator", "reviewer", "client"]),
          });
        function y(e) {
          let t = new h(),
            r = new a.$(),
            i = (0, s.ZQ)("caseManagement", () => c.ND),
            u = (0, s.ZQ)("documentUpload", () => c.ND);
          r.use("/*", i),
            r.use("/:id/documents/:documentId", u),
            r.get("/", async (e) => {
              let r = e.get("user");
              if (!r) return e.json({ error: "Unauthorized" }, 401);
              let {
                includeAssigned: n,
                status: a,
                limit: i,
                offset: s,
              } = e.req.query();
              try {
                let o = await t.getCasesByUser(r.id, {
                  includeAssigned: "true" === n,
                  status: a ? a.split(",") : void 0,
                  limit: i ? parseInt(i) : void 0,
                  offset: s ? parseInt(s) : void 0,
                });
                return e.json({ success: !0, data: o });
              } catch (t) {
                return (
                  console.error("Error fetching cases:", t),
                  e.json({ error: "Failed to fetch cases" }, 500)
                );
              }
            }),
            r.get("/:id", async (e) => {
              let r = e.get("user");
              if (!r) return e.json({ error: "Unauthorized" }, 401);
              let n = e.req.param("id");
              try {
                let a = await t.getCaseById(n, r.id);
                if (!a) return e.json({ error: "Case not found" }, 404);
                return e.json({ success: !0, data: a });
              } catch (t) {
                if ("Access denied" === t.message)
                  return e.json({ error: "Access denied" }, 403);
                return (
                  console.error("Error fetching case:", t),
                  e.json({ error: "Failed to fetch case" }, 500)
                );
              }
            }),
            r.get("/:id/details", async (e) => {
              let r = e.get("user");
              if (!r) return e.json({ error: "Unauthorized" }, 401);
              let n = e.req.param("id");
              try {
                let a = await t.getCaseWithDetails(n, r.id);
                return e.json({ success: !0, data: a });
              } catch (t) {
                if ("Access denied" === t.message)
                  return e.json({ error: "Access denied" }, 403);
                if ("Case not found" === t.message)
                  return e.json({ error: "Case not found" }, 404);
                return (
                  console.error("Error fetching case details:", t),
                  e.json({ error: "Failed to fetch case details" }, 500)
                );
              }
            }),
            r.post("/", (0, n.l)("json", f), async (e) => {
              let r = e.get("user");
              if (!r) return e.json({ error: "Unauthorized" }, 401);
              let n = await e.req.json();
              try {
                let a = null;
                n.dueDate && (a = new Date(n.dueDate));
                let i = await t.createCase({
                  ...n,
                  createdBy: r.id,
                  dueDate: a,
                });
                return e.json({ success: !0, data: i }, 201);
              } catch (t) {
                return (
                  console.error("Error creating case:", t),
                  e.json({ error: "Failed to create case" }, 500)
                );
              }
            }),
            r.patch("/:id", (0, n.l)("json", m), async (e) => {
              let r = e.get("user");
              if (!r) return e.json({ error: "Unauthorized" }, 401);
              let n = e.req.param("id"),
                a = await e.req.json();
              try {
                let i;
                void 0 !== a.dueDate &&
                  (i = a.dueDate ? new Date(a.dueDate) : null);
                let s = await t.updateCase(n, r.id, { ...a, dueDate: i });
                return e.json({ success: !0, data: s });
              } catch (t) {
                if (t.message.includes("Permission denied"))
                  return e.json({ error: t.message }, 403);
                if ("Case not found" === t.message)
                  return e.json({ error: "Case not found" }, 404);
                return (
                  console.error("Error updating case:", t),
                  e.json({ error: "Failed to update case" }, 500)
                );
              }
            }),
            r.patch("/:id/status", (0, n.l)("json", p), async (e) => {
              let r = e.get("user");
              if (!r) return e.json({ error: "Unauthorized" }, 401);
              let n = e.req.param("id"),
                { status: a, reason: i } = await e.req.json();
              try {
                let s = await t.changeStatus(n, r.id, a, i);
                return e.json({ success: !0, data: s });
              } catch (t) {
                if (t.message.includes("Permission denied"))
                  return e.json({ error: t.message }, 403);
                if ("Case not found" === t.message)
                  return e.json({ error: "Case not found" }, 404);
                if (t.message.includes("Invalid status transition"))
                  return e.json({ error: t.message }, 400);
                return (
                  console.error("Error changing case status:", t),
                  e.json({ error: "Failed to change case status" }, 500)
                );
              }
            }),
            r.post("/:id/assign", (0, n.l)("json", g), async (e) => {
              let r = e.get("user");
              if (!r) return e.json({ error: "Unauthorized" }, 401);
              let n = e.req.param("id"),
                { userId: a, role: i } = await e.req.json();
              try {
                let s = await t.assignUser(n, a, i, r.id);
                return e.json({ success: !0, data: s });
              } catch (t) {
                if (t.message.includes("Permission denied"))
                  return e.json({ error: t.message }, 403);
                if ("Case not found" === t.message)
                  return e.json({ error: "Case not found" }, 404);
                return (
                  console.error("Error assigning user to case:", t),
                  e.json({ error: "Failed to assign user to case" }, 500)
                );
              }
            }),
            r.delete("/:id/assign/:userId", async (e) => {
              let r = e.get("user");
              if (!r) return e.json({ error: "Unauthorized" }, 401);
              let n = e.req.param("id"),
                a = e.req.param("userId"),
                i = e.req.query("reason");
              try {
                let s = await t.removeAssignment(n, a, r.id, i);
                return e.json({ success: !0, data: s });
              } catch (t) {
                if (t.message.includes("Permission denied"))
                  return e.json({ error: t.message }, 403);
                if ("Case not found" === t.message)
                  return e.json({ error: "Case not found" }, 404);
                return (
                  console.error("Error removing user from case:", t),
                  e.json({ error: "Failed to remove user from case" }, 500)
                );
              }
            }),
            r.post("/:id/documents/:documentId", async (e) => {
              let r = e.get("user");
              if (!r) return e.json({ error: "Unauthorized" }, 401);
              let n = e.req.param("id"),
                a = e.req.param("documentId");
              try {
                let i = await t.addDocument(n, a, r.id);
                return e.json({ success: !0, data: i });
              } catch (t) {
                if (t.message.includes("Permission denied"))
                  return e.json({ error: t.message }, 403);
                if (
                  "Case not found" === t.message ||
                  "Document not found" === t.message
                )
                  return e.json({ error: t.message }, 404);
                return (
                  console.error("Error adding document to case:", t),
                  e.json({ error: "Failed to add document to case" }, 500)
                );
              }
            }),
            r.get("/:id/completion", async (e) => {
              let r = e.get("user");
              if (!r) return e.json({ error: "Unauthorized" }, 401);
              let n = e.req.param("id");
              try {
                if (!(await t.getCaseById(n, r.id)))
                  return e.json({ error: "Case not found" }, 404);
                let a = await t.calculateCompletionPercentage(n);
                return e.json({
                  success: !0,
                  data: { completionPercentage: a },
                });
              } catch (t) {
                if ("Access denied" === t.message)
                  return e.json({ error: "Access denied" }, 403);
                if ("Case not found" === t.message)
                  return e.json({ error: "Case not found" }, 404);
                return (
                  console.error("Error calculating case completion:", t),
                  e.json({ error: "Failed to calculate case completion" }, 500)
                );
              }
            }),
            r.get("/types/:caseType/required-documents", async (e) => {
              if (!e.get("user")) return e.json({ error: "Unauthorized" }, 401);
              let r = e.req.param("caseType");
              try {
                if (!Object.values(o.X3).includes(r))
                  return e.json({ error: "Invalid case type" }, 400);
                let n = t.getRequiredDocuments(r);
                return e.json({ success: !0, data: { requiredDocuments: n } });
              } catch (t) {
                return (
                  console.error("Error getting required documents:", t),
                  e.json({ error: "Failed to get required documents" }, 500)
                );
              }
            }),
            r.get("/types/:caseType/processing-time", async (e) => {
              if (!e.get("user")) return e.json({ error: "Unauthorized" }, 401);
              let r = e.req.param("caseType");
              try {
                if (!Object.values(o.X3).includes(r))
                  return e.json({ error: "Invalid case type" }, 400);
                let n = t.estimateProcessingTime(r);
                return e.json({ success: !0, data: n });
              } catch (t) {
                return (
                  console.error("Error estimating processing time:", t),
                  e.json({ error: "Failed to estimate processing time" }, 500)
                );
              }
            }),
            e.route("/cases", r);
        }
      },
      48714: (e) => {
        function t(e) {
          return Promise.resolve().then(() => {
            var t = Error("Cannot find module '" + e + "'");
            throw ((t.code = "MODULE_NOT_FOUND"), t);
          });
        }
        (t.keys = () => []), (t.resolve = t), (t.id = 48714), (e.exports = t);
      },
      49106: (e, t) => {
        "use strict";
        function r(e) {
          return e.startsWith("/") ? e : "/" + e;
        }
        Object.defineProperty(t, "__esModule", { value: !0 }),
          Object.defineProperty(t, "ensureLeadingSlash", {
            enumerable: !0,
            get: function () {
              return r;
            },
          });
      },
      53053: (e) => {
        "use strict";
        e.exports = require("node:diagnostics_channel");
      },
      55421: (e, t, r) => {
        "use strict";
        let n;
        Object.defineProperty(t, "__esModule", { value: !0 }),
          !(function (e, t) {
            for (var r in t)
              Object.defineProperty(e, r, { enumerable: !0, get: t[r] });
          })(t, {
            arrayBufferToString: function () {
              return o;
            },
            decrypt: function () {
              return l;
            },
            encrypt: function () {
              return u;
            },
            getActionEncryptionKey: function () {
              return p;
            },
            getClientReferenceManifestForRsc: function () {
              return m;
            },
            getServerModuleMap: function () {
              return f;
            },
            setReferenceManifestsSingleton: function () {
              return h;
            },
            stringToUint8Array: function () {
              return c;
            },
          });
        let a = r(66954),
          i = r(34067),
          s = r(29294);
        function o(e) {
          let t = new Uint8Array(e),
            r = t.byteLength;
          if (r < 65535) return String.fromCharCode.apply(null, t);
          let n = "";
          for (let e = 0; e < r; e++) n += String.fromCharCode(t[e]);
          return n;
        }
        function c(e) {
          let t = e.length,
            r = new Uint8Array(t);
          for (let n = 0; n < t; n++) r[n] = e.charCodeAt(n);
          return r;
        }
        function u(e, t, r) {
          return crypto.subtle.encrypt({ name: "AES-GCM", iv: t }, e, r);
        }
        function l(e, t, r) {
          return crypto.subtle.decrypt({ name: "AES-GCM", iv: t }, e, r);
        }
        let d = Symbol.for("next.server.action-manifests");
        function h({
          page: e,
          clientReferenceManifest: t,
          serverActionsManifest: r,
          serverModuleMap: n,
        }) {
          var a;
          let s =
            null == (a = globalThis[d])
              ? void 0
              : a.clientReferenceManifestsPerPage;
          globalThis[d] = {
            clientReferenceManifestsPerPage: {
              ...s,
              [(0, i.normalizeAppPath)(e)]: t,
            },
            serverActionsManifest: r,
            serverModuleMap: n,
          };
        }
        function f() {
          let e = globalThis[d];
          if (!e)
            throw Object.defineProperty(
              new a.InvariantError("Missing manifest for Server Actions."),
              "__NEXT_ERROR_CODE",
              { value: "E606", enumerable: !1, configurable: !0 },
            );
          return e.serverModuleMap;
        }
        function m() {
          let e = globalThis[d];
          if (!e)
            throw Object.defineProperty(
              new a.InvariantError("Missing manifest for Server Actions."),
              "__NEXT_ERROR_CODE",
              { value: "E606", enumerable: !1, configurable: !0 },
            );
          let { clientReferenceManifestsPerPage: t } = e,
            r = s.workAsyncStorage.getStore();
          if (!r) {
            var n = t;
            let e = Object.values(n),
              r = {
                clientModules: {},
                edgeRscModuleMapping: {},
                rscModuleMapping: {},
              };
            for (let t of e)
              (r.clientModules = { ...r.clientModules, ...t.clientModules }),
                (r.edgeRscModuleMapping = {
                  ...r.edgeRscModuleMapping,
                  ...t.edgeRscModuleMapping,
                }),
                (r.rscModuleMapping = {
                  ...r.rscModuleMapping,
                  ...t.rscModuleMapping,
                });
            return r;
          }
          let i = t[r.route];
          if (!i)
            throw Object.defineProperty(
              new a.InvariantError(
                `Missing Client Reference Manifest for ${r.route}.`,
              ),
              "__NEXT_ERROR_CODE",
              { value: "E570", enumerable: !1, configurable: !0 },
            );
          return i;
        }
        async function p() {
          if (n) return n;
          let e = globalThis[d];
          if (!e)
            throw Object.defineProperty(
              new a.InvariantError("Missing manifest for Server Actions."),
              "__NEXT_ERROR_CODE",
              { value: "E606", enumerable: !1, configurable: !0 },
            );
          let t =
            process.env.NEXT_SERVER_ACTIONS_ENCRYPTION_KEY ||
            e.serverActionsManifest.encryptionKey;
          if (void 0 === t)
            throw Object.defineProperty(
              new a.InvariantError("Missing encryption key for Server Actions"),
              "__NEXT_ERROR_CODE",
              { value: "E571", enumerable: !1, configurable: !0 },
            );
          return (n = await crypto.subtle.importKey(
            "raw",
            c(atob(t)),
            "AES-GCM",
            !0,
            ["encrypt", "decrypt"],
          ));
        }
      },
      55511: (e) => {
        "use strict";
        e.exports = require("crypto");
      },
      55591: (e) => {
        "use strict";
        e.exports = require("https");
      },
      57075: (e) => {
        "use strict";
        e.exports = require("node:stream");
      },
      57975: (e) => {
        "use strict";
        e.exports = require("node:util");
      },
      58702: (e, t, r) => {
        "use strict";
        r.d(t, {
          IB: () => n,
          V8: () => o,
          XG: () => s,
          o0: () => i,
          q: () => a,
        });
        let n = ["en", "ar", "es", "fr"],
          a = "en",
          i = {
            en: {
              nativeName: "English",
              englishName: "English",
              direction: "ltr",
              dateFormat: "MM/DD/YYYY",
              flag: "\uD83C\uDDFA\uD83C\uDDF8",
              htmlLang: "en",
              calendar: "gregory",
              number: { decimal: ".", thousands: "," },
            },
            ar: {
              nativeName: "العربية",
              englishName: "Arabic",
              direction: "rtl",
              dateFormat: "DD/MM/YYYY",
              flag: "\uD83C\uDDF8\uD83C\uDDE6",
              htmlLang: "ar",
              calendar: "islamic",
              fontClass: "font-arabic",
              number: { decimal: "٫", thousands: "٬" },
            },
            fr: {
              nativeName: "Fran\xe7ais",
              englishName: "French",
              direction: "ltr",
              dateFormat: "DD/MM/YYYY",
              flag: "\uD83C\uDDEB\uD83C\uDDF7",
              htmlLang: "fr",
              calendar: "gregory",
              number: { decimal: ",", thousands: " " },
            },
            es: {
              nativeName: "Espa\xf1ol",
              englishName: "Spanish",
              direction: "ltr",
              dateFormat: "DD/MM/YYYY",
              flag: "\uD83C\uDDEA\uD83C\uDDF8",
              htmlLang: "es",
              calendar: "gregory",
              number: { decimal: ",", thousands: "." },
            },
          };
        function s(e) {
          return i[e] || i[a];
        }
        function o(e) {
          return "rtl" === s(e).direction;
        }
      },
      59889: (e, t, r) => {
        "use strict";
        r.d(t, { default: () => l });
        var n = r(75145),
          a = r(31655),
          i = r.n(a),
          s = r(89882),
          o = r(84205),
          c = r.n(o),
          u = r(37226),
          l = (0, o.forwardRef)(function (e, t) {
            let {
                defaultLocale: r,
                href: a,
                locale: l,
                localeCookie: d,
                onClick: h,
                prefetch: f,
                unprefixed: m,
                ...p
              } = e,
              g = (0, u.A)(),
              y = null != l && l !== g,
              w = l || g,
              b = (function () {
                let [e, t] = (0, o.useState)();
                return (
                  (0, o.useEffect)(() => {
                    t(window.location.host);
                  }, []),
                  e
                );
              })(),
              v =
                b &&
                m &&
                (m.domains[b] === w ||
                  (!Object.keys(m.domains).includes(b) && g === r && !l))
                  ? m.pathname
                  : a,
              E = (0, s.usePathname)();
            return (
              y &&
                (f &&
                  console.error(
                    "The `prefetch` prop is currently not supported when using the `locale` prop on `Link` to switch the locale.`",
                  ),
                (f = !1)),
              c().createElement(
                i(),
                (0, n._)(
                  {
                    ref: t,
                    href: v,
                    hrefLang: y ? l : void 0,
                    onClick: function (e) {
                      (function (e, t, r, n) {
                        if (!e || n === r || null == n || !t) return;
                        let a = (function (e) {
                            let t =
                              arguments.length > 1 && void 0 !== arguments[1]
                                ? arguments[1]
                                : window.location.pathname;
                            return "/" === e ? t : t.replace(e, "");
                          })(t),
                          { name: i, ...s } = e;
                        s.path || (s.path = "" !== a ? a : "/");
                        let o = "".concat(i, "=").concat(n, ";");
                        for (let [e, t] of Object.entries(s))
                          (o += "".concat("maxAge" === e ? "max-age" : e)),
                            "boolean" != typeof t && (o += "=" + t),
                            (o += ";");
                        document.cookie = o;
                      })(d, E, g, l),
                        h && h(e);
                    },
                    prefetch: f,
                  },
                  p,
                ),
              )
            );
          });
      },
      59912: (e, t, r) => {
        "use strict";
        var n = r(20016);
        function a() {
          for (var e = arguments.length, t = Array(e), r = 0; r < e; r++)
            t[r] = arguments[r];
          return t.filter(Boolean).join(".");
        }
        function i(e) {
          return a(e.namespace, e.key);
        }
        function s(e) {
          console.error(e);
        }
        function o(e, t) {
          return n.memoize(e, {
            cache: {
              create: () => ({
                get: (e) => t[e],
                set(e, r) {
                  t[e] = r;
                },
              }),
            },
            strategy: n.strategies.variadic,
          });
        }
        function c(e, t) {
          return o(function () {
            for (var t = arguments.length, r = Array(t), n = 0; n < t; n++)
              r[n] = arguments[n];
            return new e(...r);
          }, t);
        }
        (t.createCache = function () {
          return {
            dateTime: {},
            number: {},
            message: {},
            relativeTime: {},
            pluralRules: {},
            list: {},
            displayNames: {},
          };
        }),
          (t.createIntlFormatters = function (e) {
            return {
              getDateTimeFormat: c(Intl.DateTimeFormat, e.dateTime),
              getNumberFormat: c(Intl.NumberFormat, e.number),
              getPluralRules: c(Intl.PluralRules, e.pluralRules),
              getRelativeTimeFormat: c(Intl.RelativeTimeFormat, e.relativeTime),
              getListFormat: c(Intl.ListFormat, e.list),
              getDisplayNames: c(Intl.DisplayNames, e.displayNames),
            };
          }),
          (t.defaultGetMessageFallback = i),
          (t.defaultOnError = s),
          (t.initializeConfig = function (e) {
            let { getMessageFallback: t, messages: r, onError: n, ...a } = e;
            return {
              ...a,
              messages: r,
              onError: n || s,
              getMessageFallback: t || i,
            };
          }),
          (t.joinPath = a),
          (t.memoFn = o);
      },
      61432: (e, t, r) => {
        "use strict";
        r.d(t, { t: () => s });
        var n = r(54016),
          a = r(58342),
          i = r(26457);
        function s(e) {
          let t = a.Ik({
            firstName: a.Yj().min(2).max(50).optional(),
            lastName: a.Yj().min(2).max(50).optional(),
            bio: a.Yj().max(500).optional(),
            avatarUrl: a.Yj().url().optional(),
            timezone: a.Yj().optional(),
            language: a.Yj().optional(),
            countryOfResidence: a.Yj().optional(),
            countryOfInterest: a.Yj().optional(),
          });
          return (
            e.get("/protected/profile", async (e) => {
              let t = e.get("user");
              if (!t)
                throw new n.y(401, { message: "Unauthorized: User not found" });
              try {
                let r = (0, i.r)(),
                  { data: n, error: a } = await r
                    .from("profiles")
                    .select("*")
                    .eq("id", t.id)
                    .single();
                if (a) throw a;
                return e.json({ success: !0, profile: n });
              } catch (e) {
                throw (
                  (console.error("Profile fetch error:", e),
                  new n.y(500, { message: "Failed to fetch profile" }))
                );
              }
            }),
            e.patch("/protected/profile", async (e) => {
              let r = e.get("user");
              if (!r)
                throw new n.y(401, { message: "Unauthorized: User not found" });
              let a = await e.req.json();
              try {
                let s = t.safeParse(a);
                if (!s.success)
                  throw new n.y(400, { message: "Invalid profile data" });
                let o = s.data,
                  c = (0, i.r)(),
                  { error: u } = await c
                    .from("profiles")
                    .update({
                      ...(void 0 !== o.firstName && {
                        first_name: o.firstName,
                      }),
                      ...(void 0 !== o.lastName && { last_name: o.lastName }),
                      ...(void 0 !== o.bio && { bio: o.bio }),
                      ...(void 0 !== o.avatarUrl && {
                        avatar_url: o.avatarUrl,
                      }),
                      ...(void 0 !== o.timezone && { timezone: o.timezone }),
                      ...(void 0 !== o.language && { language: o.language }),
                      ...(void 0 !== o.countryOfResidence && {
                        country_of_residence: o.countryOfResidence,
                      }),
                      ...(void 0 !== o.countryOfInterest && {
                        country_of_interest: o.countryOfInterest,
                      }),
                      updated_at: new Date().toISOString(),
                    })
                    .eq("id", r.id);
                if (u) throw u;
                return e.json({
                  success: !0,
                  message: "Profile updated successfully",
                });
              } catch (e) {
                if (
                  (console.error("Profile update error:", e), e instanceof n.y)
                )
                  throw e;
                throw new n.y(500, { message: "Failed to update profile" });
              }
            }),
            e.get("/protected/profile/stats", async (e) => {
              let t = e.get("user");
              if (!t)
                throw new n.y(401, { message: "Unauthorized: User not found" });
              try {
                let r = (0, i.r)(),
                  { count: n, error: a } = await r
                    .from("documents")
                    .select("*", { count: "exact", head: !0 })
                    .eq("user_id", t.id),
                  { count: s, error: o } = await r
                    .from("applications")
                    .select("*", { count: "exact", head: !0 })
                    .eq("user_id", t.id);
                if (a || o) throw a || o;
                return e.json({
                  success: !0,
                  stats: { documentsCount: n || 0, applicationsCount: s || 0 },
                });
              } catch (e) {
                throw (
                  (console.error("Stats fetch error:", e),
                  new n.y(500, { message: "Failed to fetch user stats" }))
                );
              }
            }),
            e
          );
        }
      },
      63033: (e) => {
        "use strict";
        e.exports = require("next/dist/server/app-render/work-unit-async-storage.external.js");
      },
      66715: (e, t, r) => {
        "use strict";
        r.r(t),
          r.d(t, {
            __addDisposableResource: () => q,
            __assign: () => i,
            __asyncDelegator: () => A,
            __asyncGenerator: () => T,
            __asyncValues: () => I,
            __await: () => S,
            __awaiter: () => m,
            __classPrivateFieldGet: () => H,
            __classPrivateFieldIn: () => B,
            __classPrivateFieldSet: () => D,
            __createBinding: () => g,
            __decorate: () => o,
            __disposeResources: () => j,
            __esDecorate: () => u,
            __exportStar: () => y,
            __extends: () => a,
            __generator: () => p,
            __importDefault: () => O,
            __importStar: () => N,
            __makeTemplateObject: () => C,
            __metadata: () => f,
            __param: () => c,
            __propKey: () => d,
            __read: () => b,
            __rest: () => s,
            __rewriteRelativeImportExtension: () => x,
            __runInitializers: () => l,
            __setFunctionName: () => h,
            __spread: () => v,
            __spreadArray: () => _,
            __spreadArrays: () => E,
            __values: () => w,
            default: () => L,
          });
        var n = function (e, t) {
          return (n =
            Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array &&
              function (e, t) {
                e.__proto__ = t;
              }) ||
            function (e, t) {
              for (var r in t)
                Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r]);
            })(e, t);
        };
        function a(e, t) {
          if ("function" != typeof t && null !== t)
            throw TypeError(
              "Class extends value " +
                String(t) +
                " is not a constructor or null",
            );
          function r() {
            this.constructor = e;
          }
          n(e, t),
            (e.prototype =
              null === t
                ? Object.create(t)
                : ((r.prototype = t.prototype), new r()));
        }
        var i = function () {
          return (i =
            Object.assign ||
            function (e) {
              for (var t, r = 1, n = arguments.length; r < n; r++)
                for (var a in (t = arguments[r]))
                  Object.prototype.hasOwnProperty.call(t, a) && (e[a] = t[a]);
              return e;
            }).apply(this, arguments);
        };
        function s(e, t) {
          var r = {};
          for (var n in e)
            Object.prototype.hasOwnProperty.call(e, n) &&
              0 > t.indexOf(n) &&
              (r[n] = e[n]);
          if (null != e && "function" == typeof Object.getOwnPropertySymbols)
            for (
              var a = 0, n = Object.getOwnPropertySymbols(e);
              a < n.length;
              a++
            )
              0 > t.indexOf(n[a]) &&
                Object.prototype.propertyIsEnumerable.call(e, n[a]) &&
                (r[n[a]] = e[n[a]]);
          return r;
        }
        function o(e, t, r, n) {
          var a,
            i = arguments.length,
            s =
              i < 3
                ? t
                : null === n
                  ? (n = Object.getOwnPropertyDescriptor(t, r))
                  : n;
          if (
            "object" == typeof Reflect &&
            "function" == typeof Reflect.decorate
          )
            s = Reflect.decorate(e, t, r, n);
          else
            for (var o = e.length - 1; o >= 0; o--)
              (a = e[o]) &&
                (s = (i < 3 ? a(s) : i > 3 ? a(t, r, s) : a(t, r)) || s);
          return i > 3 && s && Object.defineProperty(t, r, s), s;
        }
        function c(e, t) {
          return function (r, n) {
            t(r, n, e);
          };
        }
        function u(e, t, r, n, a, i) {
          function s(e) {
            if (void 0 !== e && "function" != typeof e)
              throw TypeError("Function expected");
            return e;
          }
          for (
            var o,
              c = n.kind,
              u = "getter" === c ? "get" : "setter" === c ? "set" : "value",
              l = !t && e ? (n.static ? e : e.prototype) : null,
              d = t || (l ? Object.getOwnPropertyDescriptor(l, n.name) : {}),
              h = !1,
              f = r.length - 1;
            f >= 0;
            f--
          ) {
            var m = {};
            for (var p in n) m[p] = "access" === p ? {} : n[p];
            for (var p in n.access) m.access[p] = n.access[p];
            m.addInitializer = function (e) {
              if (h)
                throw TypeError(
                  "Cannot add initializers after decoration has completed",
                );
              i.push(s(e || null));
            };
            var g = (0, r[f])(
              "accessor" === c ? { get: d.get, set: d.set } : d[u],
              m,
            );
            if ("accessor" === c) {
              if (void 0 === g) continue;
              if (null === g || "object" != typeof g)
                throw TypeError("Object expected");
              (o = s(g.get)) && (d.get = o),
                (o = s(g.set)) && (d.set = o),
                (o = s(g.init)) && a.unshift(o);
            } else (o = s(g)) && ("field" === c ? a.unshift(o) : (d[u] = o));
          }
          l && Object.defineProperty(l, n.name, d), (h = !0);
        }
        function l(e, t, r) {
          for (var n = arguments.length > 2, a = 0; a < t.length; a++)
            r = n ? t[a].call(e, r) : t[a].call(e);
          return n ? r : void 0;
        }
        function d(e) {
          return "symbol" == typeof e ? e : "".concat(e);
        }
        function h(e, t, r) {
          return (
            "symbol" == typeof t &&
              (t = t.description ? "[".concat(t.description, "]") : ""),
            Object.defineProperty(e, "name", {
              configurable: !0,
              value: r ? "".concat(r, " ", t) : t,
            })
          );
        }
        function f(e, t) {
          if (
            "object" == typeof Reflect &&
            "function" == typeof Reflect.metadata
          )
            return Reflect.metadata(e, t);
        }
        function m(e, t, r, n) {
          return new (r || (r = Promise))(function (a, i) {
            function s(e) {
              try {
                c(n.next(e));
              } catch (e) {
                i(e);
              }
            }
            function o(e) {
              try {
                c(n.throw(e));
              } catch (e) {
                i(e);
              }
            }
            function c(e) {
              var t;
              e.done
                ? a(e.value)
                : ((t = e.value) instanceof r
                    ? t
                    : new r(function (e) {
                        e(t);
                      })
                  ).then(s, o);
            }
            c((n = n.apply(e, t || [])).next());
          });
        }
        function p(e, t) {
          var r,
            n,
            a,
            i = {
              label: 0,
              sent: function () {
                if (1 & a[0]) throw a[1];
                return a[1];
              },
              trys: [],
              ops: [],
            },
            s = Object.create(
              ("function" == typeof Iterator ? Iterator : Object).prototype,
            );
          return (
            (s.next = o(0)),
            (s.throw = o(1)),
            (s.return = o(2)),
            "function" == typeof Symbol &&
              (s[Symbol.iterator] = function () {
                return this;
              }),
            s
          );
          function o(o) {
            return function (c) {
              var u = [o, c];
              if (r) throw TypeError("Generator is already executing.");
              for (; s && ((s = 0), u[0] && (i = 0)), i; )
                try {
                  if (
                    ((r = 1),
                    n &&
                      (a =
                        2 & u[0]
                          ? n.return
                          : u[0]
                            ? n.throw || ((a = n.return) && a.call(n), 0)
                            : n.next) &&
                      !(a = a.call(n, u[1])).done)
                  )
                    return a;
                  switch (((n = 0), a && (u = [2 & u[0], a.value]), u[0])) {
                    case 0:
                    case 1:
                      a = u;
                      break;
                    case 4:
                      return i.label++, { value: u[1], done: !1 };
                    case 5:
                      i.label++, (n = u[1]), (u = [0]);
                      continue;
                    case 7:
                      (u = i.ops.pop()), i.trys.pop();
                      continue;
                    default:
                      if (
                        !(a = (a = i.trys).length > 0 && a[a.length - 1]) &&
                        (6 === u[0] || 2 === u[0])
                      ) {
                        i = 0;
                        continue;
                      }
                      if (3 === u[0] && (!a || (u[1] > a[0] && u[1] < a[3]))) {
                        i.label = u[1];
                        break;
                      }
                      if (6 === u[0] && i.label < a[1]) {
                        (i.label = a[1]), (a = u);
                        break;
                      }
                      if (a && i.label < a[2]) {
                        (i.label = a[2]), i.ops.push(u);
                        break;
                      }
                      a[2] && i.ops.pop(), i.trys.pop();
                      continue;
                  }
                  u = t.call(e, i);
                } catch (e) {
                  (u = [6, e]), (n = 0);
                } finally {
                  r = a = 0;
                }
              if (5 & u[0]) throw u[1];
              return { value: u[0] ? u[1] : void 0, done: !0 };
            };
          }
        }
        var g = Object.create
          ? function (e, t, r, n) {
              void 0 === n && (n = r);
              var a = Object.getOwnPropertyDescriptor(t, r);
              (!a ||
                ("get" in a ? !t.__esModule : a.writable || a.configurable)) &&
                (a = {
                  enumerable: !0,
                  get: function () {
                    return t[r];
                  },
                }),
                Object.defineProperty(e, n, a);
            }
          : function (e, t, r, n) {
              void 0 === n && (n = r), (e[n] = t[r]);
            };
        function y(e, t) {
          for (var r in e)
            "default" === r ||
              Object.prototype.hasOwnProperty.call(t, r) ||
              g(t, e, r);
        }
        function w(e) {
          var t = "function" == typeof Symbol && Symbol.iterator,
            r = t && e[t],
            n = 0;
          if (r) return r.call(e);
          if (e && "number" == typeof e.length)
            return {
              next: function () {
                return (
                  e && n >= e.length && (e = void 0),
                  { value: e && e[n++], done: !e }
                );
              },
            };
          throw TypeError(
            t ? "Object is not iterable." : "Symbol.iterator is not defined.",
          );
        }
        function b(e, t) {
          var r = "function" == typeof Symbol && e[Symbol.iterator];
          if (!r) return e;
          var n,
            a,
            i = r.call(e),
            s = [];
          try {
            for (; (void 0 === t || t-- > 0) && !(n = i.next()).done; )
              s.push(n.value);
          } catch (e) {
            a = { error: e };
          } finally {
            try {
              n && !n.done && (r = i.return) && r.call(i);
            } finally {
              if (a) throw a.error;
            }
          }
          return s;
        }
        function v() {
          for (var e = [], t = 0; t < arguments.length; t++)
            e = e.concat(b(arguments[t]));
          return e;
        }
        function E() {
          for (var e = 0, t = 0, r = arguments.length; t < r; t++)
            e += arguments[t].length;
          for (var n = Array(e), a = 0, t = 0; t < r; t++)
            for (var i = arguments[t], s = 0, o = i.length; s < o; s++, a++)
              n[a] = i[s];
          return n;
        }
        function _(e, t, r) {
          if (r || 2 == arguments.length)
            for (var n, a = 0, i = t.length; a < i; a++)
              (!n && a in t) ||
                (n || (n = Array.prototype.slice.call(t, 0, a)), (n[a] = t[a]));
          return e.concat(n || Array.prototype.slice.call(t));
        }
        function S(e) {
          return this instanceof S ? ((this.v = e), this) : new S(e);
        }
        function T(e, t, r) {
          if (!Symbol.asyncIterator)
            throw TypeError("Symbol.asyncIterator is not defined.");
          var n,
            a = r.apply(e, t || []),
            i = [];
          return (
            (n = Object.create(
              ("function" == typeof AsyncIterator ? AsyncIterator : Object)
                .prototype,
            )),
            s("next"),
            s("throw"),
            s("return", function (e) {
              return function (t) {
                return Promise.resolve(t).then(e, u);
              };
            }),
            (n[Symbol.asyncIterator] = function () {
              return this;
            }),
            n
          );
          function s(e, t) {
            a[e] &&
              ((n[e] = function (t) {
                return new Promise(function (r, n) {
                  i.push([e, t, r, n]) > 1 || o(e, t);
                });
              }),
              t && (n[e] = t(n[e])));
          }
          function o(e, t) {
            try {
              var r;
              (r = a[e](t)).value instanceof S
                ? Promise.resolve(r.value.v).then(c, u)
                : l(i[0][2], r);
            } catch (e) {
              l(i[0][3], e);
            }
          }
          function c(e) {
            o("next", e);
          }
          function u(e) {
            o("throw", e);
          }
          function l(e, t) {
            e(t), i.shift(), i.length && o(i[0][0], i[0][1]);
          }
        }
        function A(e) {
          var t, r;
          return (
            (t = {}),
            n("next"),
            n("throw", function (e) {
              throw e;
            }),
            n("return"),
            (t[Symbol.iterator] = function () {
              return this;
            }),
            t
          );
          function n(n, a) {
            t[n] = e[n]
              ? function (t) {
                  return (r = !r)
                    ? { value: S(e[n](t)), done: !1 }
                    : a
                      ? a(t)
                      : t;
                }
              : a;
          }
        }
        function I(e) {
          if (!Symbol.asyncIterator)
            throw TypeError("Symbol.asyncIterator is not defined.");
          var t,
            r = e[Symbol.asyncIterator];
          return r
            ? r.call(e)
            : ((e = w(e)),
              (t = {}),
              n("next"),
              n("throw"),
              n("return"),
              (t[Symbol.asyncIterator] = function () {
                return this;
              }),
              t);
          function n(r) {
            t[r] =
              e[r] &&
              function (t) {
                return new Promise(function (n, a) {
                  var i, s, o;
                  (i = n),
                    (s = a),
                    (o = (t = e[r](t)).done),
                    Promise.resolve(t.value).then(function (e) {
                      i({ value: e, done: o });
                    }, s);
                });
              };
          }
        }
        function C(e, t) {
          return (
            Object.defineProperty
              ? Object.defineProperty(e, "raw", { value: t })
              : (e.raw = t),
            e
          );
        }
        var P = Object.create
            ? function (e, t) {
                Object.defineProperty(e, "default", {
                  enumerable: !0,
                  value: t,
                });
              }
            : function (e, t) {
                e.default = t;
              },
          R = function (e) {
            return (R =
              Object.getOwnPropertyNames ||
              function (e) {
                var t = [];
                for (var r in e)
                  Object.prototype.hasOwnProperty.call(e, r) &&
                    (t[t.length] = r);
                return t;
              })(e);
          };
        function N(e) {
          if (e && e.__esModule) return e;
          var t = {};
          if (null != e)
            for (var r = R(e), n = 0; n < r.length; n++)
              "default" !== r[n] && g(t, e, r[n]);
          return P(t, e), t;
        }
        function O(e) {
          return e && e.__esModule ? e : { default: e };
        }
        function H(e, t, r, n) {
          if ("a" === r && !n)
            throw TypeError("Private accessor was defined without a getter");
          if ("function" == typeof t ? e !== t || !n : !t.has(e))
            throw TypeError(
              "Cannot read private member from an object whose class did not declare it",
            );
          return "m" === r ? n : "a" === r ? n.call(e) : n ? n.value : t.get(e);
        }
        function D(e, t, r, n, a) {
          if ("m" === n) throw TypeError("Private method is not writable");
          if ("a" === n && !a)
            throw TypeError("Private accessor was defined without a setter");
          if ("function" == typeof t ? e !== t || !a : !t.has(e))
            throw TypeError(
              "Cannot write private member to an object whose class did not declare it",
            );
          return "a" === n ? a.call(e, r) : a ? (a.value = r) : t.set(e, r), r;
        }
        function B(e, t) {
          if (null === t || ("object" != typeof t && "function" != typeof t))
            throw TypeError("Cannot use 'in' operator on non-object");
          return "function" == typeof e ? t === e : e.has(t);
        }
        function q(e, t, r) {
          if (null != t) {
            var n, a;
            if ("object" != typeof t && "function" != typeof t)
              throw TypeError("Object expected.");
            if (r) {
              if (!Symbol.asyncDispose)
                throw TypeError("Symbol.asyncDispose is not defined.");
              n = t[Symbol.asyncDispose];
            }
            if (void 0 === n) {
              if (!Symbol.dispose)
                throw TypeError("Symbol.dispose is not defined.");
              (n = t[Symbol.dispose]), r && (a = n);
            }
            if ("function" != typeof n)
              throw TypeError("Object not disposable.");
            a &&
              (n = function () {
                try {
                  a.call(this);
                } catch (e) {
                  return Promise.reject(e);
                }
              }),
              e.stack.push({ value: t, dispose: n, async: r });
          } else r && e.stack.push({ async: !0 });
          return t;
        }
        var M =
          "function" == typeof SuppressedError
            ? SuppressedError
            : function (e, t, r) {
                var n = Error(r);
                return (
                  (n.name = "SuppressedError"),
                  (n.error = e),
                  (n.suppressed = t),
                  n
                );
              };
        function j(e) {
          function t(t) {
            (e.error = e.hasError
              ? new M(t, e.error, "An error was suppressed during disposal.")
              : t),
              (e.hasError = !0);
          }
          var r,
            n = 0;
          return (function a() {
            for (; (r = e.stack.pop()); )
              try {
                if (!r.async && 1 === n)
                  return (n = 0), e.stack.push(r), Promise.resolve().then(a);
                if (r.dispose) {
                  var i = r.dispose.call(r.value);
                  if (r.async)
                    return (
                      (n |= 2),
                      Promise.resolve(i).then(a, function (e) {
                        return t(e), a();
                      })
                    );
                } else n |= 1;
              } catch (e) {
                t(e);
              }
            if (1 === n)
              return e.hasError ? Promise.reject(e.error) : Promise.resolve();
            if (e.hasError) throw e.error;
          })();
        }
        function x(e, t) {
          return "string" == typeof e && /^\.\.?\//.test(e)
            ? e.replace(
                /\.(tsx)$|((?:\.d)?)((?:\.[^./]+?)?)\.([cm]?)ts$/i,
                function (e, r, n, a, i) {
                  return r
                    ? t
                      ? ".jsx"
                      : ".js"
                    : !n || (a && i)
                      ? n + a + "." + i.toLowerCase() + "js"
                      : e;
                },
              )
            : e;
        }
        let L = {
          __extends: a,
          __assign: i,
          __rest: s,
          __decorate: o,
          __param: c,
          __esDecorate: u,
          __runInitializers: l,
          __propKey: d,
          __setFunctionName: h,
          __metadata: f,
          __awaiter: m,
          __generator: p,
          __createBinding: g,
          __exportStar: y,
          __values: w,
          __read: b,
          __spread: v,
          __spreadArrays: E,
          __spreadArray: _,
          __await: S,
          __asyncGenerator: T,
          __asyncDelegator: A,
          __asyncValues: I,
          __makeTemplateObject: C,
          __importStar: N,
          __importDefault: O,
          __classPrivateFieldGet: H,
          __classPrivateFieldSet: D,
          __classPrivateFieldIn: B,
          __addDisposableResource: q,
          __disposeResources: j,
          __rewriteRelativeImportExtension: x,
        };
      },
      67700: (e, t, r) => {
        "use strict";
        var n = r(77118),
          a = r(59912);
        r(17030),
          r(84147),
          r(20016),
          n.IntlError,
          n.IntlErrorCode,
          n.createFormatter,
          (t.gZ = a.createCache),
          (t.CB = a.createIntlFormatters),
          (t.TD = a.initializeConfig);
      },
      70724: (e, t, r) => {
        "use strict";
        r.r(t),
          r.d(t, {
            useGlobalTranslate: () => o,
            useI18n: () => i,
            useTranslate: () => s,
          });
        var n = r(95124),
          a = r(58702);
        function i() {
          let e = (0, n.useLocale)(),
            t = (0, n.useTranslations)(),
            r = (0, n.useFormatter)(),
            i = (0, n.useTimeZone)(),
            s = (0, n.useNow)(),
            o = (0, a.XG)(e),
            c = o.direction;
          return {
            t,
            format: r,
            locale: e,
            timeZone: i,
            now: s,
            config: o,
            direction: c,
            isRtl: "rtl" === c,
            formatDate: (e, t) => r.dateTime(e, t),
            formatRelativeTime: (e) => r.relativeTime(e),
            formatCurrency: (e, t = "USD") =>
              r.number(e, { style: "currency", currency: t }),
            formatNumber: (e, t) => r.number(e, t),
          };
        }
        function s(e) {
          return (0, n.useTranslations)(e);
        }
        function o() {
          return (0, n.useTranslations)();
        }
      },
      73024: (e) => {
        "use strict";
        e.exports = require("node:fs");
      },
      73446: (e, t, r) => {
        "use strict";
        r.r(t),
          r.d(t, { "4055c9f9dce3c849928e65e87017b3609674121d00": () => n.M });
        var n = r(15934);
      },
      73557: (e, t) => {
        "use strict";
        function r(e) {
          for (let t = 0; t < e.length; t++) {
            let r = e[t];
            if ("function" != typeof r)
              throw Object.defineProperty(
                Error(`A "use server" file can only export async functions, found ${typeof r}.
Read more: https://nextjs.org/docs/messages/invalid-use-server-value`),
                "__NEXT_ERROR_CODE",
                { value: "E352", enumerable: !1, configurable: !0 },
              );
          }
        }
        Object.defineProperty(t, "D", {
          enumerable: !0,
          get: function () {
            return r;
          },
        });
      },
      73566: (e) => {
        "use strict";
        e.exports = require("worker_threads");
      },
      74075: (e) => {
        "use strict";
        e.exports = require("zlib");
      },
      74998: (e) => {
        "use strict";
        e.exports = require("perf_hooks");
      },
      75145: (e, t, r) => {
        "use strict";
        function n() {
          return (n = Object.assign
            ? Object.assign.bind()
            : function (e) {
                for (var t = 1; t < arguments.length; t++) {
                  var r = arguments[t];
                  for (var n in r)
                    ({}).hasOwnProperty.call(r, n) && (e[n] = r[n]);
                }
                return e;
              }).apply(null, arguments);
        }
        r.d(t, { _: () => n });
      },
      75919: (e) => {
        "use strict";
        e.exports = require("node:worker_threads");
      },
      76367: (e, t, r) => {
        "use strict";
        r.a(e, async (e, n) => {
          try {
            r.r(t),
              r.d(t, {
                DELETE: () => Z,
                GET: () => z,
                HEAD: () => Q,
                OPTIONS: () => J,
                PATCH: () => W,
                POST: () => X,
                PUT: () => K,
              });
            var a = r(63033),
              i = r(43774),
              s = r(29741),
              o = r(54016),
              c = r(39512),
              u = r(5289),
              l = r(23146),
              d = r(29952),
              h = r(1978),
              f = r(39750),
              m = r(11595),
              p = r(21750),
              g = r(6743),
              y = r(48693),
              w = r(97143),
              b = r(34283),
              v = r(61432),
              E = r(95548),
              _ = r(31661),
              S = r(99186),
              T = r(90992),
              A = r(15934),
              I = r(26457),
              C = r(15422),
              P = r(35621),
              R = r(60442),
              N = e([C]);
            C = (N.then ? (await N)() : N)[0];
            let H = new i.$();
            H.get("/ping", (e) =>
              e.json({
                message: "pong from /api/ping",
                timestamp: new Date().toISOString(),
              }),
            );
            let D = new S.m(),
              B = process.env.OPENAI_API_KEY || "";
            B || console.warn("OPENAI_API_KEY is not set!");
            let q = new C.ChatApplicationService(T.rj, D, B);
            H.use("*", (0, P.wJ)({ component: "api" })),
              H.use("*", (0, c.v)()),
              H.use("*", (0, l.N9)()),
              H.use("*", (0, u.T)()),
              H.use(
                "*",
                (0, s.W)({
                  origin: process.env.NEXT_PUBLIC_APP_URL || "*",
                  allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
                  allowHeaders: ["Content-Type", "Authorization"],
                  exposeHeaders: ["Content-Length", "X-Request-Id"],
                  maxAge: 600,
                  credentials: !0,
                }),
              ),
              H.use("*", (0, h.i)({})),
              H.use("*", async (e, t) => {
                e.set("chatService", q), await t();
              }),
              H.use("*", async (e, t) => {
                try {
                  let t = (0, I.ln)(e.req.raw);
                  e.set("db", t);
                } catch (e) {
                  console.error(
                    "Failed to create Supabase client for context:",
                    e,
                  );
                }
                await t();
              }),
              H.use("*", (0, f.MU)({ ttl: 300, varyByAuth: !0 })),
              H.onError((e, t) =>
                (console.error(`[${t.req.method}] ${t.req.url}:`, e),
                e instanceof o.y)
                  ? t.json(
                      {
                        success: !1,
                        error: { message: e.message, status: e.status },
                      },
                      e.status,
                    )
                  : t.json(
                      {
                        success: !1,
                        error: {
                          message: "Internal Server Error",
                          status: 500,
                        },
                      },
                      500,
                    ),
              ),
              H.get("/", (e) =>
                e.json({
                  success: !0,
                  status: "ok",
                  timestamp: new Date().toISOString(),
                  version: process.env.NEXT_PUBLIC_APP_VERSION || "1.0.0",
                }),
              );
            let M = async (e, t) => {
                try {
                  let r = e.req.header("Authorization");
                  if (!r?.startsWith("Bearer "))
                    throw (
                      (e.set("user", null),
                      new o.y(401, {
                        message: "Unauthorized: Missing Bearer token",
                      }))
                    );
                  let n = r.split(" ")[1],
                    a = (0, I.nH)(),
                    {
                      data: { user: i },
                      error: s,
                    } = await a.auth.getUser(n);
                  if (s || !i)
                    throw (
                      (e.set("user", null),
                      console.error("[HONO AUTH] Supabase auth error:", s),
                      new o.y(401, { message: "Invalid token" }))
                    );
                  e.set("user", i), await t();
                } catch (t) {
                  if ((e.set("user", null), t instanceof o.y)) throw t;
                  throw (
                    (console.error(
                      "[HONO AUTH] Unhandled auth middleware error:",
                      t,
                    ),
                    new o.y(401, { message: "Authentication failed" }))
                  );
                }
              },
              j = async (e, t) => {
                try {
                  let r = e.get("user");
                  if (!r || !r.id)
                    throw new o.y(401, {
                      message:
                        "Authentication required, user not found or ID missing",
                    });
                  if (!(await (0, A.M)(r.id)))
                    throw new o.y(403, {
                      message: "Forbidden: Admin access required",
                    });
                  await t();
                } catch (r) {
                  if (r instanceof o.y) throw r;
                  console.error("Admin middleware error:", r);
                  let t = e.get("user")?.id || "unknown_user";
                  throw (
                    (console.error(`Admin middleware error for user: ${t}`, r),
                    new o.y(500, {
                      message:
                        "Admin access verification failed due to an internal error",
                    }))
                  );
                }
              };
            H.use(
              "/documents/*",
              (0, m.ZQ)({
                resourceType: m.vt.API,
                errorMessage:
                  "You have exceeded your documents API request limit.",
              }),
            ),
              H.use(
                "/scrape/*",
                (0, m.ZQ)({
                  resourceType: m.vt.SCRAPING,
                  errorMessage:
                    "You have exceeded your web scraping request limit.",
                }),
              ),
              H.use(
                "/vectors/*",
                (0, m.ZQ)({
                  resourceType: m.vt.VECTOR,
                  errorMessage:
                    "You have exceeded your vector operations request limit.",
                }),
              ),
              H.use(
                "/research/*",
                (0, m.ZQ)({
                  resourceType: m.vt.RESEARCH,
                  errorMessage:
                    "You have exceeded your research and AI request limit.",
                }),
              ),
              H.use(
                "/chat/*",
                (0, m.ZQ)({
                  resourceType: m.vt.RESEARCH,
                  errorMessage:
                    "You have exceeded your chat API request limit.",
                }),
              ),
              H.use("/auth/*", M),
              H.use("/documents/*", M),
              H.use("/profile/*", M),
              H.use("/immigration/*", M),
              H.use("/cases/*", M),
              H.use("/chat/*", M),
              H.use("/subscription/*", M),
              H.use("/admin/*", M, j),
              (0, p.D)(H),
              (0, g.u)(H),
              (0, y.q)(H),
              (0, w.T)(H),
              (0, b.W)(H),
              (0, v.t)(H),
              (0, E.D)(H);
            let x = (0, _.T)(H);
            H.route("/users", x);
            let L = (0, d.p)(H),
              k = (0, d.p)(H),
              U = (0, d.p)(H),
              F = (0, d.p)(H),
              G = (0, d.p)(H),
              $ = (0, d.p)(H),
              Y = { ...a },
              V =
                "workUnitAsyncStorage" in Y
                  ? Y.workUnitAsyncStorage
                  : "requestAsyncStorage" in Y
                    ? Y.requestAsyncStorage
                    : void 0;
            function O(e, t) {
              return "phase-production-build" === process.env.NEXT_PHASE ||
                "function" != typeof e
                ? e
                : new Proxy(e, {
                    apply: (e, r, n) => {
                      let a;
                      try {
                        let e = V?.getStore();
                        a = e?.headers;
                      } catch (e) {}
                      return R.wrapRouteHandlerWithSentry(e, {
                        method: t,
                        parameterizedRoute: "/api/[[...route]]",
                        headers: a,
                      }).apply(r, n);
                    },
                  });
            }
            let z = O(L, "GET"),
              X = O(k, "POST"),
              K = O(U, "PUT"),
              W = O(G, "PATCH"),
              Z = O(F, "DELETE"),
              Q = O(void 0, "HEAD"),
              J = O($, "OPTIONS");
            n();
          } catch (e) {
            n(e);
          }
        });
      },
      76760: (e) => {
        "use strict";
        e.exports = require("node:path");
      },
      77030: (e) => {
        "use strict";
        e.exports = require("node:net");
      },
      77118: (e, t, r) => {
        "use strict";
        var n = r(17030),
          a = r(84147),
          i = r(59912),
          s = (function (e) {
            return e && e.__esModule ? e : { default: e };
          })(n);
        function o(e, t, r) {
          var n;
          return (
            (t =
              "symbol" ==
              typeof (n = (function (e, t) {
                if ("object" != typeof e || !e) return e;
                var r = e[Symbol.toPrimitive];
                if (void 0 !== r) {
                  var n = r.call(e, t || "default");
                  if ("object" != typeof n) return n;
                  throw TypeError(
                    "@@toPrimitive must return a primitive value.",
                  );
                }
                return ("string" === t ? String : Number)(e);
              })(t, "string"))
                ? n
                : n + "") in e
              ? Object.defineProperty(e, t, {
                  value: r,
                  enumerable: !0,
                  configurable: !0,
                  writable: !0,
                })
              : (e[t] = r),
            e
          );
        }
        let c = (function (e) {
          return (
            (e.MISSING_MESSAGE = "MISSING_MESSAGE"),
            (e.MISSING_FORMAT = "MISSING_FORMAT"),
            (e.ENVIRONMENT_FALLBACK = "ENVIRONMENT_FALLBACK"),
            (e.INSUFFICIENT_PATH = "INSUFFICIENT_PATH"),
            (e.INVALID_MESSAGE = "INVALID_MESSAGE"),
            (e.INVALID_KEY = "INVALID_KEY"),
            (e.FORMATTING_ERROR = "FORMATTING_ERROR"),
            e
          );
        })({});
        class u extends Error {
          constructor(e, t) {
            let r = e;
            t && (r += ": " + t),
              super(r),
              o(this, "code", void 0),
              o(this, "originalMessage", void 0),
              (this.code = e),
              t && (this.originalMessage = t);
          }
        }
        function l(e, t) {
          return e
            ? Object.keys(e).reduce(
                (r, n) => ((r[n] = { timeZone: t, ...e[n] }), r),
                {},
              )
            : e;
        }
        function d(e, t, r, n) {
          let a = i.joinPath(n, r);
          if (!t) throw Error(a);
          let s = t;
          return (
            r.split(".").forEach((t) => {
              let r = s[t];
              if (null == t || null == r) throw Error(a + " (".concat(e, ")"));
              s = r;
            }),
            s
          );
        }
        let h = (365 / 12) * 86400,
          f = {
            second: 1,
            seconds: 1,
            minute: 60,
            minutes: 60,
            hour: 3600,
            hours: 3600,
            day: 86400,
            days: 86400,
            week: 604800,
            weeks: 604800,
            month: (365 / 12) * 86400,
            months: (365 / 12) * 86400,
            quarter: (365 / 12) * 259200,
            quarters: (365 / 12) * 259200,
            year: 31536e3,
            years: 31536e3,
          };
        (t.IntlError = u),
          (t.IntlErrorCode = c),
          (t.createBaseTranslator = function (e) {
            let t = (function (e, t, r) {
              let n =
                arguments.length > 3 && void 0 !== arguments[3]
                  ? arguments[3]
                  : i.defaultOnError;
              try {
                if (!t) throw Error(void 0);
                let n = r ? d(e, t, r) : t;
                if (!n) throw Error(r);
                return n;
              } catch (t) {
                let e = new u(c.MISSING_MESSAGE, t.message);
                return n(e), e;
              }
            })(e.locale, e.messages, e.namespace, e.onError);
            return (function (e) {
              let {
                  cache: t,
                  defaultTranslationValues: r,
                  formats: n,
                  formatters: o,
                  getMessageFallback: h = i.defaultGetMessageFallback,
                  locale: f,
                  messagesOrError: m,
                  namespace: p,
                  onError: g,
                  timeZone: y,
                } = e,
                w = m instanceof u;
              function b(e, t, r) {
                let n = new u(t, r);
                return g(n), h({ error: n, key: e, namespace: p });
              }
              function v(e, u, g) {
                let v, E;
                if (w) return h({ error: m, key: e, namespace: p });
                try {
                  v = d(f, m, e, p);
                } catch (t) {
                  return b(e, c.MISSING_MESSAGE, t.message);
                }
                if ("object" == typeof v) {
                  let t;
                  return b(
                    e,
                    Array.isArray(v) ? c.INVALID_MESSAGE : c.INSUFFICIENT_PATH,
                    t,
                  );
                }
                let _ = (function (e, t) {
                  if (t) return;
                  let r = e.replace(/'([{}])/gi, "$1");
                  return /<|{/.test(r) ? void 0 : r;
                })(v, u);
                if (_) return _;
                o.getMessageFormat ||
                  (o.getMessageFormat = i.memoFn(function () {
                    return new s.default(
                      arguments.length <= 0 ? void 0 : arguments[0],
                      arguments.length <= 1 ? void 0 : arguments[1],
                      arguments.length <= 2 ? void 0 : arguments[2],
                      {
                        formatters: o,
                        ...(arguments.length <= 3 ? void 0 : arguments[3]),
                      },
                    );
                  }, t.message));
                try {
                  E = o.getMessageFormat(
                    v,
                    f,
                    (function (e, t) {
                      let r = t ? { ...e, dateTime: l(e.dateTime, t) } : e,
                        n = s.default.formats.date,
                        a = t ? l(n, t) : n,
                        i = s.default.formats.time,
                        o = t ? l(i, t) : i;
                      return {
                        ...r,
                        date: { ...a, ...r.dateTime },
                        time: { ...o, ...r.dateTime },
                      };
                    })({ ...n, ...g }, y),
                    {
                      formatters: {
                        ...o,
                        getDateTimeFormat: (e, t) =>
                          o.getDateTimeFormat(e, { timeZone: y, ...t }),
                      },
                    },
                  );
                } catch (t) {
                  return b(e, c.INVALID_MESSAGE, t.message);
                }
                try {
                  let e = E.format(
                    (function (e) {
                      if (0 === Object.keys(e).length) return;
                      let t = {};
                      return (
                        Object.keys(e).forEach((r) => {
                          let n,
                            i = 0,
                            s = e[r];
                          (n =
                            "function" == typeof s
                              ? (e) => {
                                  let t = s(e);
                                  return a.isValidElement(t)
                                    ? a.cloneElement(t, { key: r + i++ })
                                    : t;
                                }
                              : s),
                            (t[r] = n);
                        }),
                        t
                      );
                    })({ ...r, ...u }),
                  );
                  if (null == e) throw Error(void 0);
                  return a.isValidElement(e) ||
                    Array.isArray(e) ||
                    "string" == typeof e
                    ? e
                    : String(e);
                } catch (t) {
                  return b(e, c.FORMATTING_ERROR, t.message);
                }
              }
              function E(e, t, r) {
                let n = v(e, t, r);
                return "string" != typeof n
                  ? b(e, c.INVALID_MESSAGE, void 0)
                  : n;
              }
              return (
                (E.rich = v),
                (E.markup = (e, t, r) => {
                  let n = v(e, t, r);
                  if ("string" != typeof n) {
                    let t = new u(c.FORMATTING_ERROR, void 0);
                    return g(t), h({ error: t, key: e, namespace: p });
                  }
                  return n;
                }),
                (E.raw = (e) => {
                  if (w) return h({ error: m, key: e, namespace: p });
                  try {
                    return d(f, m, e, p);
                  } catch (t) {
                    return b(e, c.MISSING_MESSAGE, t.message);
                  }
                }),
                (E.has = (e) => {
                  if (w) return !1;
                  try {
                    return d(f, m, e, p), !0;
                  } catch (e) {
                    return !1;
                  }
                }),
                E
              );
            })({ ...e, messagesOrError: t });
          }),
          (t.createFormatter = function (e) {
            let {
              _cache: t = i.createCache(),
              _formatters: r = i.createIntlFormatters(t),
              formats: n,
              locale: a,
              now: s,
              onError: o = i.defaultOnError,
              timeZone: l,
            } = e;
            function d(e) {
              var t;
              return (
                (null != (t = e) && t.timeZone) ||
                  (l
                    ? (e = { ...e, timeZone: l })
                    : o(new u(c.ENVIRONMENT_FALLBACK, void 0))),
                e
              );
            }
            function m(e, t, r, n) {
              let a;
              try {
                a = (function (e, t) {
                  let r;
                  if ("string" == typeof t) {
                    if (!(r = null == e ? void 0 : e[t])) {
                      let e = new u(c.MISSING_FORMAT, void 0);
                      throw (o(e), e);
                    }
                  } else r = t;
                  return r;
                })(t, e);
              } catch (e) {
                return n();
              }
              try {
                return r(a);
              } catch (e) {
                return o(new u(c.FORMATTING_ERROR, e.message)), n();
              }
            }
            function p(e, t) {
              return m(
                t,
                null == n ? void 0 : n.dateTime,
                (t) => ((t = d(t)), r.getDateTimeFormat(a, t).format(e)),
                () => String(e),
              );
            }
            function g() {
              return (
                s || (o(new u(c.ENVIRONMENT_FALLBACK, void 0)), new Date())
              );
            }
            return {
              dateTime: p,
              number: function (e, t) {
                return m(
                  t,
                  null == n ? void 0 : n.number,
                  (t) => r.getNumberFormat(a, t).format(e),
                  () => String(e),
                );
              },
              relativeTime: function (e, t) {
                try {
                  var n;
                  let i,
                    s,
                    o = {};
                  t instanceof Date || "number" == typeof t
                    ? (i = new Date(t))
                    : t &&
                      ((i = null != t.now ? new Date(t.now) : g()),
                      (s = t.unit),
                      (o.style = t.style),
                      (o.numberingSystem = t.numberingSystem)),
                    i || (i = g());
                  let c = (new Date(e).getTime() - i.getTime()) / 1e3;
                  s ||
                    (s = (function (e) {
                      let t = Math.abs(e);
                      return t < 60
                        ? "second"
                        : t < 3600
                          ? "minute"
                          : t < 86400
                            ? "hour"
                            : t < 604800
                              ? "day"
                              : t < h
                                ? "week"
                                : t < 31536e3
                                  ? "month"
                                  : "year";
                    })(c)),
                    (o.numeric = "second" === s ? "auto" : "always");
                  let u = ((n = s), Math.round(c / f[n]));
                  return r.getRelativeTimeFormat(a, o).format(u, s);
                } catch (t) {
                  return o(new u(c.FORMATTING_ERROR, t.message)), String(e);
                }
              },
              list: function (e, t) {
                let i = [],
                  s = new Map(),
                  o = 0;
                for (let t of e) {
                  let e;
                  "object" == typeof t
                    ? ((e = String(o)), s.set(e, t))
                    : (e = String(t)),
                    i.push(e),
                    o++;
                }
                return m(
                  t,
                  null == n ? void 0 : n.list,
                  (e) => {
                    let t = r
                      .getListFormat(a, e)
                      .formatToParts(i)
                      .map((e) =>
                        "literal" === e.type
                          ? e.value
                          : s.get(e.value) || e.value,
                      );
                    return s.size > 0 ? t : t.join("");
                  },
                  () => String(e),
                );
              },
              dateTimeRange: function (e, t, i) {
                return m(
                  i,
                  null == n ? void 0 : n.dateTime,
                  (n) => (
                    (n = d(n)), r.getDateTimeFormat(a, n).formatRange(e, t)
                  ),
                  () => [p(e), p(t)].join(" – "),
                );
              },
            };
          }),
          (t.resolveNamespace = function (e, t) {
            return e === t ? void 0 : e.slice((t + ".").length);
          });
      },
      77598: (e) => {
        "use strict";
        e.exports = require("node:crypto");
      },
      78167: (e, t, r) => {
        "use strict";
        r.d(t, { default: () => f });
        var n = r(75145),
          a = r(89882),
          i = r(84205),
          s = r.n(i),
          o = r(37226);
        function c(e, t) {
          let r = e;
          return /^\/(\?.*)?$/.test(t) && (t = t.slice(1)), (r += t);
        }
        function u(e) {
          return e.includes("[[...");
        }
        function l(e) {
          return e.includes("[...");
        }
        function d(e) {
          return e.includes("[");
        }
        var h = r(59889);
        let f = (0, i.forwardRef)(function (e, t) {
          let {
            href: r,
            locale: u,
            localeCookie: l,
            localePrefixMode: d,
            prefix: f,
            ...m
          } = e;
          (0, a.usePathname)();
          let p = u !== (0, o.A)(),
            [g, y] = (0, i.useState)(() => {
              var e, t;
              let n;
              return (function (e) {
                return (
                  ("object" == typeof e
                    ? null == e.host && null == e.hostname
                    : !/^[a-z]+:/i.test(e)) &&
                  !(function (e) {
                    let t = "object" == typeof e ? e.pathname : e;
                    return null != t && !t.startsWith("/");
                  })(e)
                );
              })(r) &&
                ("never" !== d || p)
                ? ((e = r),
                  (t = f),
                  "string" == typeof e
                    ? (n = c(t, e))
                    : ((n = { ...e }),
                      e.pathname && (n.pathname = c(t, e.pathname))),
                  n)
                : r;
            });
          return s().createElement(
            h.default,
            (0, n._)({ ref: t, href: g, locale: u, localeCookie: l }, m),
          );
        });
        f.displayName = "ClientLink";
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
      80481: (e) => {
        "use strict";
        e.exports = require("node:readline");
      },
      81630: (e) => {
        "use strict";
        e.exports = require("http");
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
      90992: (e, t, r) => {
        "use strict";
        r.d(t, { H7: () => h, cX: () => d, rj: () => g });
        var n = r(48149),
          a = r(88421),
          i = r(87323);
        class s extends a.g {
          constructor() {
            super("cases");
          }
          async getByUserId(e, t = {}) {
            let r = (await this.getClient()).from(this.tableName).select("*");
            (r = t.includeAssigned
              ? r.or(`client_id.eq.${e},assignments->contain->${e}`)
              : r.eq("client_id", e)),
              t.status && t.status.length > 0 && (r = r.in("status", t.status)),
              (r = (r = r.range(
                t.offset || 0,
                (t.offset || 0) + (t.limit || 10) - 1,
              )).order("updated_at", { ascending: !1 }));
            let { data: n, error: a } = await r;
            if (a) throw a;
            return n;
          }
          async getWithDetails(e) {
            let t = await this.getClient(),
              { data: r, error: n } = await t
                .from(this.tableName)
                .select("*")
                .eq("id", e)
                .single();
            if (n) {
              if ("PGRST116" === n.code) return null;
              throw n;
            }
            let { data: a, error: i } = await t
              .from("documents")
              .select("*")
              .eq("case_id", e)
              .order("created_at", { ascending: !1 });
            if (i) throw i;
            let { data: s, error: o } = await t
              .from("case_messages")
              .select("*")
              .eq("case_id", e)
              .order("created_at", { ascending: !1 });
            if (o) throw o;
            return { case: r, documents: a || [], messages: s || [] };
          }
          async addDocument(e, t) {
            let r = await this.getClient(),
              { error: n } = await r
                .from("documents")
                .update({ case_id: e })
                .eq("id", t);
            if (n) throw n;
          }
          async removeDocument(e) {
            let t = await this.getClient(),
              { error: r } = await t
                .from("documents")
                .update({ case_id: null })
                .eq("id", e);
            if (r) throw r;
          }
          async addMessage(e) {
            let t = await this.getClient(),
              { data: r, error: n } = await t
                .from("case_messages")
                .insert({
                  ...e,
                  is_system_message: e.is_system_message || !1,
                  created_at: new Date().toISOString(),
                })
                .select()
                .single();
            if (n) throw n;
            return r;
          }
          async updateTimeline(e, t) {
            let r = await this.getClient(),
              { error: n } = await r
                .from(this.tableName)
                .update({ timeline: t })
                .eq("id", e);
            if (n) throw n;
          }
          async assignUser(e, t, r) {
            let n = await this.getClient(),
              { data: a, error: i } = await n
                .from(this.tableName)
                .select("assignments")
                .eq("id", e)
                .single();
            if (i) throw i;
            let s = a.assignments || [];
            if (s.findIndex((e) => e.userId === t && e.role === r) >= 0) return;
            let o = [
                ...s.filter((e) => e.userId !== t),
                {
                  userId: t,
                  role: r,
                  assignedAt: new Date().toISOString(),
                  assignedBy: "system",
                },
              ],
              { error: c } = await n
                .from(this.tableName)
                .update({ assignments: o })
                .eq("id", e);
            if (c) throw c;
          }
          async removeAssignment(e, t) {
            let r = await this.getClient(),
              { data: n, error: a } = await r
                .from(this.tableName)
                .select("assignments")
                .eq("id", e)
                .single();
            if (a) throw a;
            let i = n.assignments || [],
              s = i.filter((e) => e.userId !== t);
            if (s.length === i.length) return;
            let { error: o } = await r
              .from(this.tableName)
              .update({ assignments: s })
              .eq("id", e);
            if (o) throw o;
          }
          async userHasAccess(e, t, r) {
            let n = await this.getClient(),
              { data: a, error: i } = await n
                .from(this.tableName)
                .select("client_id, assignments")
                .eq("id", e)
                .single();
            if (i) {
              if ("PGRST116" === i.code) return !1;
              throw i;
            }
            if (a.client_id === t) return !r || r.includes("client");
            let s = (a.assignments || []).find((e) => e.userId === t);
            return !!s && (!r || !!r.includes(s.role));
          }
          async getByStatus(e, t = {}) {
            let r = (await this.getClient()).from(this.tableName).select("*");
            r = (r = (r = Array.isArray(e)
              ? r.in("status", e)
              : r.eq("status", e)).range(
              t.offset || 0,
              (t.offset || 0) + (t.limit || 10) - 1,
            )).order("updated_at", { ascending: !1 });
            let { data: n, error: a } = await r;
            if (a) throw a;
            return n;
          }
          toDomainEntity(e) {
            return e;
          }
          toCaseDomain(e) {
            return i.M.toCaseDomain(e);
          }
          fromCaseDomain(e) {
            return i.M.fromCaseDomain(e);
          }
        }
        var o = r(21088);
        class c {
          constructor(e = {}) {
            (this.supabase = null),
              (this.tableName = "documents"),
              (this.options = e);
          }
          async getClient() {
            return (
              null === this.supabase && (this.supabase = (0, n.nH)()),
              this.supabase
            );
          }
          async getAll(e = {}) {
            let t = await this.getClient(),
              { data: r, error: n } = await t
                .from(this.tableName)
                .select("*")
                .range(e.offset || 0, (e.offset || 0) + (e.limit || 100) - 1);
            if (n) throw n;
            return r || [];
          }
          async getById(e) {
            let t = await this.getClient(),
              { data: r, error: n } = await t
                .from(this.tableName)
                .select("*")
                .eq("id", e)
                .single();
            if (n) {
              if ("PGRST116" === n.code) return null;
              throw n;
            }
            return r;
          }
          async create(e) {
            let t = await this.getClient(),
              { data: r, error: n } = await t
                .from(this.tableName)
                .insert(e)
                .select()
                .single();
            if (n) throw n;
            return r;
          }
          async update(e, t) {
            let r = await this.getClient(),
              { data: n, error: a } = await r
                .from(this.tableName)
                .update(t)
                .eq("id", e)
                .select()
                .single();
            if (a) throw a;
            return n;
          }
          async delete(e) {
            let t = await this.getClient(),
              { error: r } = await t.from(this.tableName).delete().eq("id", e);
            if (r) throw r;
            return !0;
          }
          async executeSql(e, t) {
            let r = await this.getClient();
            try {
              let { data: n, error: a } = await r.rpc("execute_sql", {
                query: e,
                params: t || [],
              });
              if (a) throw a;
              return n || [];
            } catch (e) {
              return console.error("Error executing SQL:", e), [];
            }
          }
          async getByUserId(e, t) {
            let r = (await this.getClient())
              .from(this.tableName)
              .select("*")
              .or(`user_id.eq.${e},access->:userId->permission.not.is.null`);
            if (
              (t?.type && t.type.length > 0 && (r = r.in("file_type", t.type)),
              t?.status &&
                t.status.length > 0 &&
                (r = r.in("status", t.status)),
              t?.shared === !1 && (r = r.eq("user_id", e)),
              t?.shared === !0 && (r = r.neq("user_id", e)),
              t?.searchQuery && (r = r.or(`filename.ilike.%${t.searchQuery}%`)),
              t?.orderBy)
            ) {
              let [e, n] = t.orderBy.split(":");
              r = r.order(
                {
                  createdAt: "created_at",
                  updatedAt: "updated_at",
                  userId: "user_id",
                  fileName: "filename",
                  filePath: "file_path",
                  fileSize: "file_size",
                  fileType: "file_type",
                }[e] || e,
                { ascending: "desc" !== n },
              );
            } else r = r.order("updated_at", { ascending: !1 });
            t?.limit && (r = r.limit(t.limit)),
              t?.offset &&
                (r = r.range(t.offset, t.offset + (t.limit || 10) - 1));
            let { data: n, error: a } = await r;
            if (a)
              throw (
                (console.error("Error fetching documents by user ID:", a),
                Error(`Failed to fetch documents: ${a.message}`))
              );
            return n || [];
          }
          async getWithDetails(e) {
            let t = await this.getClient(),
              { data: r, error: n } = await t
                .from(this.tableName)
                .select("*")
                .eq("id", e)
                .single();
            if (n || !r)
              return console.error("Error fetching document:", n), null;
            let a = [];
            try {
              let t = `
        SELECT * FROM document_versions 
        WHERE document_id = $1
        ORDER BY created_at DESC
      `;
              a = await this.executeSql(t, [e]);
            } catch (e) {
              console.error("Error fetching document versions:", e);
            }
            let i = [];
            try {
              let t = `
        SELECT * FROM document_access
        WHERE document_id = $1
      `;
              i = await this.executeSql(t, [e]);
            } catch (e) {
              console.error("Error fetching document access records:", e);
            }
            return { document: r, versions: a, access: i };
          }
          async addVersion(e, t) {
            let r = await this.getClient();
            try {
              let n = `
        INSERT INTO document_versions (
          document_id, version, file_path, file_size, 
          file_type, created_by, created_at, metadata
        ) VALUES (
          $1, $2, $3, $4, $5, $6, $7, $8
        )
        RETURNING *
      `,
                a = new Date().toISOString(),
                i = await this.executeSql(n, [
                  e,
                  t.version,
                  t.filePath,
                  t.fileSize,
                  t.fileType,
                  t.createdBy,
                  a,
                  JSON.stringify(t.metadata || {}),
                ]);
              return (
                await r
                  .from(this.tableName)
                  .update({ updated_at: a })
                  .eq("id", e),
                i[0] || { document_id: e }
              );
            } catch (t) {
              return (
                console.error("Error adding document version:", t),
                await r
                  .from(this.tableName)
                  .update({ updated_at: new Date().toISOString() })
                  .eq("id", e),
                { document_id: e }
              );
            }
          }
          async grantAccess(e, t) {
            let r = await this.getClient();
            try {
              let n = `
        SELECT id FROM document_access
        WHERE document_id = $1 AND user_id = $2
      `,
                a = await this.executeSql(n, [e, t.userId]),
                i = null,
                s = new Date().toISOString();
              if (a.length > 0) {
                let e = `
          UPDATE document_access
          SET 
            permission = $3,
            granted_by = $4,
            granted_at = $5,
            expires_at = $6
          WHERE id = $7
          RETURNING *
        `,
                  r = await this.executeSql(e, [
                    t.permission,
                    t.grantedBy,
                    s,
                    t.expiresAt ? t.expiresAt.toISOString() : null,
                    a[0].id,
                  ]);
                r.length > 0 && (i = r[0]);
              } else {
                let r = `
          INSERT INTO document_access (
            document_id, user_id, permission, 
            granted_by, granted_at, expires_at
          ) VALUES (
            $1, $2, $3, $4, $5, $6
          )
          RETURNING *
        `,
                  n = await this.executeSql(r, [
                    e,
                    t.userId,
                    t.permission,
                    t.grantedBy,
                    s,
                    t.expiresAt ? t.expiresAt.toISOString() : null,
                  ]);
                n.length > 0 && (i = n[0]);
              }
              return (
                await r
                  .from(this.tableName)
                  .update({ updated_at: s })
                  .eq("id", e),
                i || {
                  document_id: e,
                  user_id: t.userId,
                  permission: t.permission,
                }
              );
            } catch (n) {
              return (
                console.error("Error granting document access:", n),
                await r
                  .from(this.tableName)
                  .update({ updated_at: new Date().toISOString() })
                  .eq("id", e),
                { document_id: e, user_id: t.userId, permission: t.permission }
              );
            }
          }
          async revokeAccess(e, t) {
            let r = await this.getClient();
            try {
              let r = `
        DELETE FROM document_access
        WHERE document_id = $1 AND user_id = $2
      `;
              await this.executeSql(r, [e, t]);
            } catch (e) {
              console.error("Error revoking document access:", e);
            }
            await r
              .from(this.tableName)
              .update({ updated_at: new Date().toISOString() })
              .eq("id", e);
          }
          async addToCase(e, t) {
            let r = await this.getClient(),
              { data: n, error: a } = await r
                .from(this.tableName)
                .select("metadata")
                .eq("id", e)
                .single();
            if (a)
              throw (
                (console.error("Error fetching document metadata:", a),
                Error(`Failed to fetch document metadata: ${a.message}`))
              );
            let i = n.metadata || {},
              s = i.case_ids || [];
            if (!s.includes(t)) {
              s.push(t);
              let n = { ...i, case_ids: s },
                { error: a } = await r
                  .from(this.tableName)
                  .update({ metadata: n, updated_at: new Date().toISOString() })
                  .eq("id", e);
              if (a)
                throw (
                  (console.error("Error adding document to case:", a),
                  Error(`Failed to add document to case: ${a.message}`))
                );
              try {
                let r = `
          INSERT INTO case_documents (
            case_id, document_id, added_at
          ) VALUES (
            $1, $2, $3
          )
        `;
                await this.executeSql(r, [t, e, new Date().toISOString()]);
              } catch (e) {
                console.error("Error updating case_documents:", e);
              }
            }
          }
          async removeFromCase(e, t) {
            let r = await this.getClient(),
              { data: n, error: a } = await r
                .from(this.tableName)
                .select("metadata")
                .eq("id", e)
                .single();
            if (a)
              throw (
                (console.error("Error fetching document metadata:", a),
                Error(`Failed to fetch document metadata: ${a.message}`))
              );
            let i = n.metadata || {},
              s = i.case_ids || [],
              o = s.filter((e) => e !== t);
            if (s.length !== o.length) {
              let n = { ...i, case_ids: o },
                { error: a } = await r
                  .from(this.tableName)
                  .update({ metadata: n, updated_at: new Date().toISOString() })
                  .eq("id", e);
              if (a)
                throw (
                  (console.error("Error removing document from case:", a),
                  Error(`Failed to remove document from case: ${a.message}`))
                );
              try {
                let r = `
          DELETE FROM case_documents
          WHERE case_id = $1 AND document_id = $2
        `;
                await this.executeSql(r, [t, e]);
              } catch (e) {
                console.error("Error updating case_documents:", e);
              }
            }
          }
          async userHasAccess(e, t, r = "view") {
            let n = await this.getClient(),
              { data: a, error: i } = await n
                .from(this.tableName)
                .select("user_id")
                .eq("id", e)
                .single();
            if (i)
              return console.error("Error checking document ownership:", i), !1;
            if (a.user_id === t) return !0;
            try {
              let n = `
        SELECT permission, expires_at
        FROM document_access
        WHERE document_id = $1 AND user_id = $2
      `,
                a = await this.executeSql(n, [e, t]);
              if (!a || 0 === a.length) return !1;
              let i = new Date();
              return a.some(
                (e) =>
                  !(e.expires_at && new Date(e.expires_at) < i) &&
                  ("admin" === e.permission ||
                    "view" === r ||
                    ("edit" === r
                      ? ["edit", "admin"].includes(e.permission)
                      : "delete" === r &&
                        ["delete", "admin"].includes(e.permission))),
              );
            } catch (e) {
              return console.error("Error checking document access:", e), !1;
            }
          }
          toDomainEntity(e) {
            return {
              id: e.id,
              title: e.filename,
              content: e.file_path,
              url: e.file_path,
              country: e.metadata?.country || "",
              category: e.file_type || "",
              lastUpdated: e.updated_at || void 0,
              metadata: e.metadata || {},
              createdAt: e.created_at || new Date().toISOString(),
              updatedAt: e.updated_at || new Date().toISOString(),
            };
          }
          async findByContentHash(e) {
            let t = await this.getClient();
            try {
              let r = `
        SELECT document_id
        FROM document_versions
        WHERE metadata->>'contentHash' = $1
      `,
                n = await this.executeSql(r, [e]);
              if (!n || 0 === n.length) return [];
              let a = n.map((e) => e.document_id),
                { data: i, error: s } = await t
                  .from(this.tableName)
                  .select("*")
                  .in("id", a);
              if (s)
                throw (
                  (console.error("Error fetching documents by IDs:", s),
                  Error(`Failed to fetch documents by IDs: ${s.message}`))
                );
              return i || [];
            } catch (e) {
              return (
                console.error("Error finding documents by content hash:", e), []
              );
            }
          }
        }
        class u extends a.g {
          constructor() {
            super("profiles");
          }
          toDomainEntity(e) {
            return e;
          }
          toUserProfileDomain(e) {
            return i.M.toUserProfileDomain(e);
          }
          fromUserProfileDomain(e) {
            return i.M.fromUserProfileDomain(e);
          }
          async getByUserId(e) {
            let t = await this.getClient(),
              { data: r, error: n } = await t
                .from(this.tableName)
                .select("*")
                .eq("user_id", e)
                .single();
            if (n) {
              if ("PGRST116" === n.code) return null;
              throw n;
            }
            return r;
          }
          async upsert(e) {
            let t = await this.getClient(),
              { data: r, error: n } = await t
                .from(this.tableName)
                .upsert(e)
                .select()
                .single();
            if (n) throw n;
            return r;
          }
          async getPreferences(e) {
            let t = await this.getClient(),
              { data: r, error: n } = await t
                .from("user_preferences")
                .select("*")
                .eq("user_id", e)
                .single();
            if (n) {
              if ("PGRST116" === n.code) return null;
              throw n;
            }
            return r;
          }
          async updateTheme(e, t) {
            let r = await this.getClient(),
              { data: n, error: a } = await r
                .from("user_preferences")
                .update({ theme: t })
                .eq("user_id", e)
                .select()
                .single();
            if (a) throw a;
            return n;
          }
          async updateLanguage(e, t) {
            let r = await this.getClient(),
              { data: n, error: a } = await r
                .from(this.tableName)
                .update({ language: t })
                .eq("user_id", e)
                .select()
                .single();
            if (a) throw a;
            return n;
          }
          async updateNotificationSettings(e, t) {
            let r = await this.getClient(),
              { data: n, error: a } = await r
                .from("user_preferences")
                .update({ notifications_enabled: t.emailNotifications })
                .eq("user_id", e)
                .select()
                .single();
            if (a) throw a;
            return n;
          }
          async updatePreferences(e, t) {
            let r = await this.getClient(),
              { data: n, error: a } = await r
                .from("user_preferences")
                .update(t)
                .eq("user_id", e)
                .select()
                .single();
            if (a) throw a;
            return n;
          }
          async updateAvatar(e, t) {
            let r = await this.getClient(),
              { data: n, error: a } = await r
                .from(this.tableName)
                .update({ avatar_url: t })
                .eq("user_id", e)
                .select()
                .single();
            if (a) throw a;
            return n;
          }
        }
        let l = new u(),
          d = new c(),
          h = new s(),
          f = new o.V(),
          m = { userProfile: l, document: d, case: h, chat: f };
        class p {
          constructor(e) {
            (this.documentRepository = null),
              (this.chatRepository = null),
              (this.supabase = e);
          }
          getUserProfileRepository() {
            return l;
          }
          getDocumentRepository() {
            return (
              this.documentRepository || (this.documentRepository = new c()),
              this.documentRepository
            );
          }
          getCaseRepository() {
            return h;
          }
          registerRepository(e, t) {
            m[e] = t;
          }
          getRepository(e) {
            let t = m[e];
            if (!t) throw Error(`Repository "${e}" not found`);
            return t;
          }
          getChatRepository() {
            return f;
          }
        }
        let g = new p((0, n.nH)());
      },
      91645: (e) => {
        "use strict";
        e.exports = require("net");
      },
      94735: (e) => {
        "use strict";
        e.exports = require("events");
      },
      95548: (e, t, r) => {
        "use strict";
        r.d(t, { D: () => c });
        var n = r(4839),
          a = r(43774),
          i = r(58342),
          s = r(26457),
          o = (function (e) {
            return (
              (e.FREE = "free"),
              (e.BASIC = "basic"),
              (e.PROFESSIONAL = "professional"),
              (e.ENTERPRISE = "enterprise"),
              e
            );
          })(o || {});
        function c(e) {
          let t = new a.$(),
            r = i.Ik({ plan: i.fc(o) }),
            c = i.Ik({
              plan: i.fc(o).refine((e) => "free" !== e),
              successUrl: i.Yj().url().optional(),
              cancelUrl: i.Yj().url().optional(),
            });
          t.get("/current", async (e) => {
            let t = e.get("user");
            if (!t) return e.json({ error: "Unauthorized" }, 401);
            let r = t.app_metadata || {},
              n = r.subscription_tier || "free",
              a = r.subscription_expires
                ? new Date(r.subscription_expires)
                : null,
              i = r.subscription_created || null,
              s = !a || a > new Date();
            return e.json({
              success: !0,
              data: {
                plan: n,
                isActive: s,
                subscriptionExpires: a?.toISOString() ?? null,
                createdAt: i,
              },
            });
          }),
            t.put("/plan", (0, n.l)("json", r), async (e) => {
              let t = e.get("user");
              if (!t) return e.json({ error: "Unauthorized" }, 401);
              let { plan: r } = e.req.valid("json");
              if ("free" !== r)
                return e.json({ error: "Upgrades require checkout" }, 400);
              try {
                let { error: n } = await s.ND.auth.admin.updateUserById(t.id, {
                  app_metadata: {
                    ...t.app_metadata,
                    subscription_tier: r,
                    subscription_expires: null,
                    subscription_updated: new Date().toISOString(),
                  },
                });
                if (n) throw n;
                return e.json({ success: !0, data: { plan: r } });
              } catch (t) {
                return (
                  console.error("Error updating subscription plan:", t),
                  e.json({ error: t.message || "Failed to update plan" }, 500)
                );
              }
            }),
            t.post("/checkout", (0, n.l)("json", c), async (e) => {
              let t = e.get("user");
              if (!t) return e.json({ error: "Unauthorized" }, 401);
              let {
                plan: r,
                successUrl: n,
                cancelUrl: a,
              } = e.req.valid("json");
              try {
                let n =
                    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
                  a = Date.now().toString(36),
                  i = `${n}/mock-checkout?id=${a}&plan=${r}&user=${t.id}`;
                return e.json({
                  success: !0,
                  data: { checkoutUrl: i, plan: r },
                });
              } catch (t) {
                return (
                  console.error("Error creating checkout session:", t),
                  e.json(
                    { error: t.message || "Failed to create checkout" },
                    500,
                  )
                );
              }
            }),
            t.get("/plans", async (e) =>
              e.json({
                success: !0,
                data: {
                  plans: [
                    {
                      id: "free",
                      name: "Free",
                      price: 0,
                      features: ["Basic API Access"],
                    },
                    {
                      id: "basic",
                      name: "Basic",
                      price: 19,
                      features: ["Increased Limits"],
                    },
                    {
                      id: "professional",
                      name: "Professional",
                      price: 49,
                      features: ["Higher Limits", "Team Features"],
                    },
                    {
                      id: "enterprise",
                      name: "Enterprise",
                      price: null,
                      features: ["Custom Limits", "Support"],
                    },
                  ],
                },
              }),
            ),
            t.post("/webhook", async (e) => {
              try {
                let t = await e.req.text();
                e.req.header("Stripe-Signature");
                let r = JSON.parse(t);
                if ("checkout.session.completed" === r.type) {
                  let e = r.data.object,
                    t = e.client_reference_id,
                    n = e.metadata?.plan,
                    a = e.customer,
                    i = e.subscription;
                  (t && n && a && i) ||
                    console.error(
                      "Webhook missing data for checkout completion",
                      { userId: t, plan: n, customerId: a, subscriptionId: i },
                    );
                }
                return e.json({ received: !0 });
              } catch (t) {
                return (
                  console.error("Webhook processing error:", t),
                  e.json({ error: "Webhook processing failed" }, 400)
                );
              }
            }),
            e.route("/subscription", t);
        }
      },
      97143: (e, t, r) => {
        "use strict";
        r.d(t, { T: () => o });
        var n = r(31366),
          a = r(54016),
          i = r(58342),
          s = r(26457);
        function o(e) {
          let t = i.Ik({
            title: i.Yj().min(3).max(100),
            type: i.k5([
              "passport",
              "visa",
              "birth_certificate",
              "marriage_certificate",
              "identification",
              "other",
            ]),
            expiryDate: i.Yj().optional(),
            countryOfIssue: i.Yj().optional(),
            description: i.Yj().optional(),
            fileKey: i.Yj().optional(),
            fileType: i.Yj().optional(),
            fileSize: i.ai().optional(),
            metadata: i.g1(i.bz()).optional(),
          });
          return (
            e.post("/protected/documents", async (e) => {
              let r = e.get("user");
              if (!r)
                throw new a.y(401, { message: "Unauthorized: User not found" });
              try {
                let n = await e.req.json(),
                  i = t.safeParse(n);
                if (!i.success)
                  throw (
                    (console.error("Validation error:", i.error.format()),
                    new a.y(400, { message: "Invalid document data" }))
                  );
                let o = (0, s.r)(),
                  { data: c, error: u } = await o
                    .from("documents")
                    .insert({
                      user_id: r.id,
                      title: i.data.title,
                      type: i.data.type,
                      expiry_date: i.data.expiryDate,
                      country_of_issue: i.data.countryOfIssue,
                      description: i.data.description,
                      file_key: i.data.fileKey,
                      file_type: i.data.fileType,
                      file_size: i.data.fileSize,
                      metadata: i.data.metadata,
                      created_at: new Date().toISOString(),
                    })
                    .select()
                    .single();
                if (u) throw u;
                return e.json({ success: !0, document: c });
              } catch (e) {
                if (
                  (console.error("Document creation error:", e),
                  e instanceof a.y)
                )
                  throw e;
                throw new a.y(500, { message: "Failed to create document" });
              }
            }),
            e.get(
              "/protected/documents",
              (0, n.P)({
                cacheName: "user-documents",
                cacheControl: "private, max-age=60",
              }),
              async (e) => {
                let t = e.get("user");
                if (!t)
                  throw new a.y(401, {
                    message: "Unauthorized: User not found",
                  });
                let r = Number(e.req.query("page") || "1"),
                  n = Number(e.req.query("limit") || "20"),
                  i = (r - 1) * n,
                  o = e.req.query("type");
                try {
                  let a = (0, s.r)()
                    .from("documents")
                    .select("*", { count: "exact" })
                    .eq("user_id", t.id);
                  o && (a = a.eq("type", o)), (a = a.range(i, i + n - 1));
                  let { data: c, error: u, count: l } = await a;
                  if (u) throw u;
                  return e.json({
                    success: !0,
                    documents: c || [],
                    pagination: {
                      total: l || 0,
                      page: r,
                      limit: n,
                      totalPages: l ? Math.ceil(l / n) : 0,
                    },
                  });
                } catch (e) {
                  throw (
                    (console.error("Documents fetch error:", e),
                    new a.y(500, { message: "Failed to fetch documents" }))
                  );
                }
              },
            ),
            e.get("/protected/documents/:id", async (e) => {
              let t = e.get("user");
              if (!t)
                throw new a.y(401, { message: "Unauthorized: User not found" });
              let r = e.req.param("id");
              try {
                let n = (0, s.r)(),
                  { data: i, error: o } = await n
                    .from("documents")
                    .select("*")
                    .eq("id", r)
                    .eq("user_id", t.id)
                    .single();
                if (o) {
                  if ("PGRST116" === o.code)
                    throw new a.y(404, { message: "Document not found" });
                  throw o;
                }
                return e.json({ success: !0, document: i });
              } catch (e) {
                if (
                  (console.error("Document fetch error:", e), e instanceof a.y)
                )
                  throw e;
                throw new a.y(500, { message: "Failed to fetch document" });
              }
            }),
            e.patch("/protected/documents/:id", async (e) => {
              let r = e.get("user");
              if (!r)
                throw new a.y(401, { message: "Unauthorized: User not found" });
              let n = e.req.param("id");
              try {
                let i = await e.req.json(),
                  o = t.partial().safeParse(i);
                if (!o.success)
                  throw (
                    (console.error("Validation error:", o.error.format()),
                    new a.y(400, { message: "Invalid document data" }))
                  );
                let c = (0, s.r)(),
                  { data: u, error: l } = await c
                    .from("documents")
                    .select("id")
                    .eq("id", n)
                    .eq("user_id", r.id)
                    .single();
                if (l || !u)
                  throw new a.y(404, {
                    message: "Document not found or access denied",
                  });
                let d = { updated_at: new Date().toISOString() };
                void 0 !== o.data.title && (d.title = o.data.title),
                  void 0 !== o.data.type && (d.type = o.data.type),
                  void 0 !== o.data.expiryDate &&
                    (d.expiry_date = o.data.expiryDate),
                  void 0 !== o.data.countryOfIssue &&
                    (d.country_of_issue = o.data.countryOfIssue),
                  void 0 !== o.data.description &&
                    (d.description = o.data.description),
                  void 0 !== o.data.fileKey && (d.file_key = o.data.fileKey),
                  void 0 !== o.data.fileType && (d.file_type = o.data.fileType),
                  void 0 !== o.data.fileSize && (d.file_size = o.data.fileSize),
                  void 0 !== o.data.metadata && (d.metadata = o.data.metadata);
                let { error: h } = await c
                  .from("documents")
                  .update(d)
                  .eq("id", n)
                  .eq("user_id", r.id);
                if (h) throw h;
                return e.json({
                  success: !0,
                  message: "Document updated successfully",
                });
              } catch (e) {
                if (
                  (console.error("Document update error:", e), e instanceof a.y)
                )
                  throw e;
                throw new a.y(500, { message: "Failed to update document" });
              }
            }),
            e.delete("/protected/documents/:id", async (e) => {
              let t = e.get("user");
              if (!t)
                throw new a.y(401, { message: "Unauthorized: User not found" });
              let r = e.req.param("id");
              try {
                let n = (0, s.r)(),
                  { data: i, error: o } = await n
                    .from("documents")
                    .select("id, file_key")
                    .eq("id", r)
                    .eq("user_id", t.id)
                    .single();
                if (o || !i)
                  throw new a.y(404, {
                    message: "Document not found or access denied",
                  });
                if (i.file_key) {
                  let { error: e } = await n.storage
                    .from("documents")
                    .remove([i.file_key]);
                  e && console.error("Error deleting file from storage:", e);
                }
                let { error: c } = await n
                  .from("documents")
                  .delete()
                  .eq("id", r)
                  .eq("user_id", t.id);
                if (c) throw c;
                return e.json({
                  success: !0,
                  message: "Document deleted successfully",
                });
              } catch (e) {
                if (
                  (console.error("Document deletion error:", e),
                  e instanceof a.y)
                )
                  throw e;
                throw new a.y(500, { message: "Failed to delete document" });
              }
            }),
            e
          );
        }
      },
      98728: (e, t, r) => {
        var n = {
          "./ar.json": [39221, 9221],
          "./en.json": [28517, 8517],
          "./es.json": [34026, 4026],
          "./fr.json": [53586, 3586],
        };
        function a(e) {
          if (!r.o(n, e))
            return Promise.resolve().then(() => {
              var t = Error("Cannot find module '" + e + "'");
              throw ((t.code = "MODULE_NOT_FOUND"), t);
            });
          var t = n[e],
            a = t[0];
          return r.e(t[1]).then(() => r.t(a, 19));
        }
        (a.keys = () => Object.keys(n)), (a.id = 98728), (e.exports = a);
      },
      99186: (e, t, r) => {
        "use strict";
        r.d(t, { m: () => a });
        var n = r(86773);
        class a {
          validateChat(e) {
            let t = [];
            return (
              (e.title && 0 !== e.title.trim().length) ||
                t.push("Chat title is required"),
              (e.userId && 0 !== e.userId.trim().length) ||
                t.push("User ID is required"),
              (e.modelType && Object.values(n.c1).includes(e.modelType)) ||
                t.push("Valid model type is required"),
              { valid: 0 === t.length, errors: t }
            );
          }
          generateImmigrationSystemPrompt(e) {
            let t = `You are an AI assistant specialized in immigration matters. 
Your goal is to provide accurate, helpful information about immigration processes, requirements, and regulations.
Always clarify that you're providing general guidance and not legal advice.
When you don't know something specific, acknowledge it and suggest reliable sources for more information.`;
            return e
              ? `${t}
      
Since the user is interested in immigration to ${this.getCountryName(e)}, focus your knowledge on this country's immigration procedures, visa types, residency requirements, citizenship processes, and related information.`
              : t;
          }
          getCountryName(e) {
            return (
              {
                US: "the United States",
                CA: "Canada",
                UK: "the United Kingdom",
                AU: "Australia",
                NZ: "New Zealand",
                DE: "Germany",
                FR: "France",
                ES: "Spain",
                IT: "Italy",
                JP: "Japan",
                SG: "Singapore",
                AE: "the United Arab Emirates",
              }[e] || e
            );
          }
          validateChatMessage(e) {
            let t = [];
            return (
              (e.id && 0 !== e.id.trim().length) ||
                t.push("Message ID is required"),
              ["user", "assistant", "system"].includes(e.role) ||
                t.push("Invalid message role"),
              (e.content && 0 !== e.content.trim().length) ||
                t.push("Message content is required"),
              { valid: 0 === t.length, errors: t }
            );
          }
          estimateTokens(e) {
            return Math.ceil(e.length / 4);
          }
          exceedsTokenLimit(e) {
            let t = this.getModelTokenLimit(e.modelType);
            return (
              e.messages.reduce(
                (e, t) => e + this.estimateTokens(t.content),
                0,
              ) > t
            );
          }
          getModelTokenLimit(e) {
            return (
              {
                [n.c1.GPT_3_5]: 16385,
                [n.c1.GPT_4]: 8192,
                [n.c1.GPT_4_VISION]: 128e3,
                [n.c1.CLAUDE_3_HAIKU]: 2e5,
                [n.c1.CLAUDE_3_SONNET]: 2e5,
                [n.c1.CLAUDE_3_OPUS]: 2e5,
              }[e] || 8e3
            );
          }
          truncateChatHistory(e, t = 1e3) {
            let r = this.getModelTokenLimit(e.modelType) - t;
            if (e.messages.length <= 2) return e;
            let a = [...e.messages].sort(
                (e, t) => t.createdAt.getTime() - e.createdAt.getTime(),
              ),
              i = 0,
              s = [];
            for (let e of (a
              .filter((e) => "system" === e.role)
              .forEach((e) => {
                (i += this.estimateTokens(e.content)), s.push(e);
              }),
            a)) {
              if ("system" === e.role) continue;
              let t = this.estimateTokens(e.content);
              if (i + t <= r) (i += t), s.push(e);
              else break;
            }
            return (
              s.sort((e, t) => e.createdAt.getTime() - t.createdAt.getTime()),
              new n.ry({ ...e, messages: s })
            );
          }
          generateChatTitle(e) {
            let t = e.substring(0, 50).trim();
            return 50 === t.length && (t += "..."), t || "New Immigration Chat";
          }
        }
      },
    });
  var t = require("../../../webpack-runtime.js");
  t.C(e);
  var r = (e) => t((t.s = e)),
    n = t.X(
      0,
      [
        827, 6518, 2033, 1655, 7719, 5124, 8119, 5058, 131, 8342, 2256, 3774,
        4256, 3346, 4170, 8287, 6838, 8277, 3751, 7482, 4508,
      ],
      () => r(36246),
    );
  module.exports = n;
})();
//# sourceMappingURL=route.js.map
