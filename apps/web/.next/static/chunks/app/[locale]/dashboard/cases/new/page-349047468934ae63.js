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
    (e._sentryDebugIds[s] = "4040322b-6ab8-4dd5-bfd5-276dbc49a1ab"),
    (e._sentryDebugIdIdentifier =
      "sentry-dbid-4040322b-6ab8-4dd5-bfd5-276dbc49a1ab"));
} catch (e) {}
(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [6857],
  {
    19281: (e, s, r) => {
      "use strict";
      r.r(s), r.d(s, { default: () => f });
      var a = r(30602),
        n = r(41960),
        t = r(73974),
        d = r(36839),
        c = r(77413),
        o = r(41511),
        l = r(39896),
        i = r(13868),
        u = r(30311);
      let b = async (e) =>
        (await new Promise((e) => setTimeout(e, 1e3)), Math.random() > 0.1)
          ? { success: !0 }
          : {
              success: !1,
              error: "Failed to create case due to a simulated network error.",
            };
      function f() {
        let e = (0, t.useTranslations)("newCaseForm"),
          s = (0, n.useRouter)(),
          r = (0, l.p)(),
          f = (0, i.V8)(r),
          h = async (e) => {
            let a = { ...e, status: "pending" },
              n = await b(a);
            n.success
              ? (d.oR.success("Case created successfully!"),
                s.push("/".concat(r, "/dashboard/cases")))
              : d.oR.error(
                  "Error creating case: ".concat(n.error || "Unknown error"),
                );
          };
        return (0, a.jsx)("div", {
          className: (0, u.cn)(
            "p-4 md:p-6 lg:p-8 max-w-2xl mx-auto",
            f ? "rtl" : "ltr",
          ),
          dir: f ? "rtl" : "ltr",
          children: (0, a.jsxs)(c.Zp, {
            children: [
              (0, a.jsx)(c.aR, {
                children: (0, a.jsx)(c.ZB, { children: e("title") }),
              }),
              (0, a.jsx)(c.Wu, {
                children: (0, a.jsx)(o.Y, {
                  onSubmit: h,
                  onCancel: () => {
                    s.push("/".concat(r, "/dashboard/cases"));
                  },
                }),
              }),
            ],
          }),
        });
      }
    },
    55399: (e, s, r) => {
      Promise.resolve().then(r.bind(r, 19281));
    },
  },
  (e) => {
    var s = (s) => e((e.s = s));
    e.O(0, [6593, 4223, 3209, 7358], () => s(55399)), (_N_E = e.O());
  },
]);
