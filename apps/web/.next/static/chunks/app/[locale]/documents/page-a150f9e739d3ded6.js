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
    (e._sentryDebugIds[t] = "660f1e06-148b-47c8-97e2-7daef3fc9e71"),
    (e._sentryDebugIdIdentifier =
      "sentry-dbid-660f1e06-148b-47c8-97e2-7daef3fc9e71"));
} catch (e) {}
(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [440],
  {
    73416: (e, t, s) => {
      "use strict";
      s.r(t), s.d(t, { default: () => m });
      var a = s(30602),
        i = s(94021),
        d = s(73974),
        n = s(85218),
        r = s(5271),
        o = s(21565),
        l = s(98266),
        c = s(39896),
        u = s(13868),
        f = s(34970),
        p = s(30311);
      let _ = async () => (
        await new Promise((e) => setTimeout(e, 1e3)),
        [
          {
            id: "doc1",
            name: "Passport Scan",
            status: "ready",
            created_at: new Date().toISOString(),
            file_type: "pdf",
            file_size: 512e3,
            description: "Scan of main passport page.",
            user_id: "mock-user-1",
            case_id: "1",
            file_path: "/mock/passport.pdf",
            metadata: null,
            updated_at: new Date().toISOString(),
            category_id: "cat-id-1",
            session_id: null,
          },
          {
            id: "doc2",
            name: "Application Form",
            status: "processing",
            created_at: new Date().toISOString(),
            file_type: "pdf",
            file_size: 1228800,
            description: "Completed IMM 1294 form.",
            user_id: "mock-user-1",
            case_id: "1",
            file_path: "/mock/app_form.pdf",
            metadata: null,
            updated_at: new Date().toISOString(),
            category_id: "cat-id-2",
            session_id: null,
          },
          {
            id: "doc3",
            name: "Proof of Funds",
            status: "error",
            created_at: new Date().toISOString(),
            file_type: "jpg",
            file_size: 819200,
            description: "Bank statement.",
            user_id: "mock-user-2",
            case_id: "2",
            file_path: "/mock/funds.jpg",
            metadata: { error_message: "Invalid file format" },
            updated_at: new Date().toISOString(),
            category_id: "cat-id-3",
            session_id: null,
          },
          {
            id: "doc4",
            name: "Utility Bill",
            status: "verified",
            created_at: new Date().toISOString(),
            file_type: "png",
            file_size: 307200,
            description: "Proof of address.",
            user_id: "mock-user-1",
            case_id: null,
            file_path: "/mock/utility.png",
            metadata: null,
            updated_at: new Date().toISOString(),
            category_id: "cat-id-4",
            session_id: null,
          },
        ]
      );
      function m() {
        let e = (0, d.useTranslations)("documents"),
          t = (0, c.p)(),
          s = (0, u.V8)(t),
          [m, g] = (0, n.useState)(!0),
          [y, h] = (0, n.useState)([]);
        (0, n.useEffect)(() => {
          (async () => {
            g(!0);
            try {
              let e = await _();
              h(e);
            } catch (e) {
              console.error("Failed to fetch documents:", e);
            } finally {
              g(!1);
            }
          })();
        }, []);
        let w = async () => {
          g(!0);
          try {
            let e = await _();
            h(e);
          } catch (e) {
            console.error("Failed to refresh documents:", e);
          } finally {
            g(!1);
          }
        };
        return (0, a.jsxs)("div", {
          className: (0, p.cn)("p-4 md:p-6 lg:p-8", s ? "rtl" : "ltr"),
          dir: s ? "rtl" : "ltr",
          children: [
            (0, a.jsxs)("div", {
              className: "flex items-center justify-between mb-6",
              children: [
                (0, a.jsxs)("div", {
                  children: [
                    (0, a.jsx)("h1", {
                      className: "text-2xl md:text-3xl font-bold",
                      children: e("pageTitle"),
                    }),
                    (0, a.jsx)("p", {
                      className: "text-muted-foreground",
                      children: e("description"),
                    }),
                  ],
                }),
                (0, a.jsx)(r.$, {
                  asChild: !0,
                  children: (0, a.jsxs)(f.N_, {
                    href: "/documents/upload",
                    children: [
                      (0, a.jsx)(i.A, {
                        className: (0, p.cn)("h-4 w-4", s ? "ml-2" : "mr-2"),
                      }),
                      e("uploadButton"),
                    ],
                  }),
                }),
              ],
            }),
            m
              ? (0, a.jsx)(o.O, { section: "documents" })
              : (0, a.jsx)(l.P, { documents: y, onDocumentUpdated: w }),
          ],
        });
      }
    },
    94664: (e, t, s) => {
      Promise.resolve().then(s.bind(s, 73416));
    },
  },
  (e) => {
    var t = (t) => e((e.s = t));
    e.O(0, [6593, 4223, 3209, 7358], () => t(94664)), (_N_E = e.O());
  },
]);
