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
    r = new e.Error().stack;
  r &&
    ((e._sentryDebugIds = e._sentryDebugIds || {}),
    (e._sentryDebugIds[r] = "c8594b43-efaf-4354-b97e-f91e7eff37ae"),
    (e._sentryDebugIdIdentifier =
      "sentry-dbid-c8594b43-efaf-4354-b97e-f91e7eff37ae"));
} catch (e) {}
(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [3968],
  {
    15919: (e, r, s) => {
      Promise.resolve().then(s.bind(s, 87831));
    },
    87831: (e, r, s) => {
      "use strict";
      s.r(r), s.d(r, { default: () => h });
      var o = s(30602),
        t = s(41960),
        n = s(73974),
        d = s(36839),
        u = s(77413),
        a = s(37136),
        l = s(39896),
        c = s(13868),
        i = s(84418),
        f = s(30311);
      let p = async (e, r) =>
        (await new Promise((e) => setTimeout(e, 1500)), Math.random() > 0.1)
          ? { success: !0 }
          : {
              success: !1,
              error:
                "Failed to upload document due to a simulated network error.",
            };
      function h() {
        let e = (0, n.useTranslations)("uploadDocumentForm"),
          r = (0, t.useRouter)(),
          s = (0, l.p)(),
          h = (0, c.V8)(s),
          { user: m, isLoading: b } = (0, i.useAuth)(),
          y = async (e) => {
            if (!e.file)
              return void d.oR.error("Please select a file to upload.");
            if (!m) return void d.oR.error("User not authenticated.");
            let o = { ...e, user_id: m.id };
            try {
              let t = await p(o, e.file);
              t.success
                ? (d.oR.success("Document uploaded successfully!"),
                  r.push("/".concat(s, "/documents")))
                : d.oR.error(
                    "Error uploading document: ".concat(
                      t.error || "Unknown error",
                    ),
                  );
            } catch (e) {
              console.error("Upload error:", e),
                d.oR.error("An unexpected error occurred during upload.");
            }
          };
        return b
          ? (0, o.jsx)("div", { className: "p-4", children: "Loading user..." })
          : m
            ? (0, o.jsx)("div", {
                className: (0, f.cn)(
                  "p-4 md:p-6 lg:p-8 max-w-2xl mx-auto",
                  h ? "rtl" : "ltr",
                ),
                dir: h ? "rtl" : "ltr",
                children: (0, o.jsxs)(u.Zp, {
                  children: [
                    (0, o.jsx)(u.aR, {
                      children: (0, o.jsx)(u.ZB, { children: e("title") }),
                    }),
                    (0, o.jsx)(u.Wu, {
                      children: (0, o.jsx)(a.P, {
                        userId: m.id,
                        onSubmit: y,
                        onCancel: () => {
                          r.push("/".concat(s, "/documents"));
                        },
                      }),
                    }),
                  ],
                }),
              })
            : (0, o.jsx)("div", {
                className: "p-4 text-red-600",
                children: "Authentication required to upload documents.",
              });
      }
    },
  },
  (e) => {
    var r = (r) => e((e.s = r));
    e.O(0, [6593, 4223, 3209, 7358], () => r(15919)), (_N_E = e.O());
  },
]);
