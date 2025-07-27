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
    s = new e.Error().stack;
  s &&
    ((e._sentryDebugIds = e._sentryDebugIds || {}),
    (e._sentryDebugIds[s] = "319ef5c9-4193-496c-acaf-d4c453712336"),
    (e._sentryDebugIdIdentifier =
      "sentry-dbid-319ef5c9-4193-496c-acaf-d4c453712336"));
} catch (e) {}
(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [6783],
  {
    67890: (e, s, a) => {
      Promise.resolve().then(a.bind(a, 79271));
    },
    79271: (e, s, a) => {
      "use strict";
      a.r(s), a.d(s, { default: () => b });
      var l = a(30602),
        c = a(41960),
        r = a(73974),
        t = a(85218),
        n = a(36839),
        d = a(5271),
        i = a(77413),
        o = a(4401),
        h = a(60070),
        u = a(61159),
        m = a(21382),
        x = a(42854),
        f = a(13868),
        p = a(30311);
      let j = async () => (
          await new Promise((e) => setTimeout(e, 500)),
          {
            appName: "Hijraah",
            defaultLocale: f.q,
            theme: "system",
            enable2fa: !1,
          }
        ),
        y = async (e) =>
          (await new Promise((e) => setTimeout(e, 1e3)), Math.random() > 0.1)
            ? { success: !0 }
            : { success: !1, error: "Simulated network error" };
      function b() {
        let e = (0, c.useParams)().locale || "en",
          { isAdmin: s, isLoading: a } = (0, x.h)(),
          b = (0, r.useTranslations)("adminSettings"),
          g = (0, f.V8)(e),
          [v, N] = (0, t.useState)({}),
          [w, S] = (0, t.useState)(!0),
          [L, C] = (0, t.useState)(!1);
        (0, t.useEffect)(() => {
          let e = async () => {
            S(!0);
            try {
              let e = await j();
              N(e);
            } catch (e) {
              console.error("Failed to load settings:", e),
                n.oR.error("Could not load settings.");
            } finally {
              S(!1);
            }
          };
          s && e();
        }, [s]),
          (0, t.useEffect)(() => {
            a || s || (0, c.redirect)("/".concat(e, "/dashboard"));
          }, [s, a, e]);
        let k = (e, s) => {
            N((a) => ({ ...a, [e]: s }));
          },
          _ = async () => {
            C(!0);
            try {
              let e = await y(v);
              e.success
                ? n.oR.success(b("saveSuccess"))
                : n.oR.error(
                    "".concat(b("saveError"), " ").concat(e.error || ""),
                  );
            } catch (e) {
              n.oR.error(b("saveError")),
                console.error("Save settings error:", e);
            } finally {
              C(!1);
            }
          };
        return a || (s && w)
          ? (0, l.jsx)("div", { className: "p-4", children: "Loading..." })
          : s
            ? (0, l.jsxs)("div", {
                className: (0, p.cn)(
                  "p-4 md:p-6 lg:p-8 space-y-6",
                  g ? "rtl" : "ltr",
                ),
                dir: g ? "rtl" : "ltr",
                children: [
                  (0, l.jsxs)("div", {
                    className: "mb-6",
                    children: [
                      (0, l.jsx)("h1", {
                        className: "text-2xl md:text-3xl font-bold",
                        children: b("pageTitle"),
                      }),
                      (0, l.jsx)("p", {
                        className: "text-muted-foreground",
                        children: b("description"),
                      }),
                    ],
                  }),
                  (0, l.jsxs)(i.Zp, {
                    children: [
                      (0, l.jsx)(i.aR, {
                        children: (0, l.jsx)(i.ZB, {
                          children: b("generalSection"),
                        }),
                      }),
                      (0, l.jsxs)(i.Wu, {
                        className: "space-y-4",
                        children: [
                          (0, l.jsxs)("div", {
                            className: "space-y-2",
                            children: [
                              (0, l.jsx)(h.J, {
                                htmlFor: "appName",
                                children: b("appNameLabel"),
                              }),
                              (0, l.jsx)(o.p, {
                                id: "appName",
                                value: v.appName || "",
                                onChange: (e) => k("appName", e.target.value),
                              }),
                            ],
                          }),
                          (0, l.jsxs)("div", {
                            className: "space-y-2",
                            children: [
                              (0, l.jsx)(h.J, {
                                htmlFor: "defaultLocale",
                                children: b("defaultLocaleLabel"),
                              }),
                              (0, l.jsxs)(u.l6, {
                                value: v.defaultLocale || "",
                                onValueChange: (e) => k("defaultLocale", e),
                                children: [
                                  (0, l.jsx)(u.bq, {
                                    id: "defaultLocale",
                                    children: (0, l.jsx)(u.yv, {
                                      placeholder: "Select default language",
                                    }),
                                  }),
                                  (0, l.jsx)(u.gC, {
                                    children: f.IB.map((e) =>
                                      (0, l.jsx)(
                                        u.eb,
                                        { value: e, children: e.toUpperCase() },
                                        e,
                                      ),
                                    ),
                                  }),
                                ],
                              }),
                            ],
                          }),
                        ],
                      }),
                    ],
                  }),
                  (0, l.jsxs)(i.Zp, {
                    children: [
                      (0, l.jsx)(i.aR, {
                        children: (0, l.jsx)(i.ZB, {
                          children: b("appearanceSection"),
                        }),
                      }),
                      (0, l.jsx)(i.Wu, {
                        className: "space-y-4",
                        children: (0, l.jsxs)("div", {
                          className: "space-y-2",
                          children: [
                            (0, l.jsx)(h.J, {
                              htmlFor: "theme",
                              children: b("themeLabel"),
                            }),
                            (0, l.jsxs)(u.l6, {
                              value: v.theme || "system",
                              onValueChange: (e) => k("theme", e),
                              children: [
                                (0, l.jsx)(u.bq, {
                                  id: "theme",
                                  children: (0, l.jsx)(u.yv, {
                                    placeholder: "Select theme",
                                  }),
                                }),
                                (0, l.jsxs)(u.gC, {
                                  children: [
                                    (0, l.jsx)(u.eb, {
                                      value: "system",
                                      children: b("themeSystem"),
                                    }),
                                    (0, l.jsx)(u.eb, {
                                      value: "light",
                                      children: b("themeLight"),
                                    }),
                                    (0, l.jsx)(u.eb, {
                                      value: "dark",
                                      children: b("themeDark"),
                                    }),
                                  ],
                                }),
                              ],
                            }),
                          ],
                        }),
                      }),
                    ],
                  }),
                  (0, l.jsxs)(i.Zp, {
                    children: [
                      (0, l.jsx)(i.aR, {
                        children: (0, l.jsx)(i.ZB, {
                          children: b("securitySection"),
                        }),
                      }),
                      (0, l.jsx)(i.Wu, {
                        children: (0, l.jsxs)("div", {
                          className:
                            "flex items-center justify-between space-x-2",
                          children: [
                            (0, l.jsx)(h.J, {
                              htmlFor: "enable2fa",
                              className: "flex flex-col space-y-1",
                              children: (0, l.jsx)("span", {
                                children: b("enable2faLabel"),
                              }),
                            }),
                            (0, l.jsx)(m.d, {
                              id: "enable2fa",
                              checked: v.enable2fa || !1,
                              onCheckedChange: (e) => k("enable2fa", e),
                            }),
                          ],
                        }),
                      }),
                    ],
                  }),
                  (0, l.jsx)("div", {
                    className: "flex justify-end",
                    children: (0, l.jsx)(d.$, {
                      onClick: _,
                      disabled: L,
                      children: L ? "Saving..." : b("saveButton"),
                    }),
                  }),
                ],
              })
            : null;
      }
    },
  },
  (e) => {
    var s = (s) => e((e.s = s));
    e.O(0, [6593, 4223, 3209, 7358], () => s(67890)), (_N_E = e.O());
  },
]);
