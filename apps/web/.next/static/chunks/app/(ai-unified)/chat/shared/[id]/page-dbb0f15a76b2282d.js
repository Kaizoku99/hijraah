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
    (e._sentryDebugIds[s] = "c91adaf3-96bc-4c49-b0a1-7358e01329fe"),
    (e._sentryDebugIdIdentifier =
      "sentry-dbid-c91adaf3-96bc-4c49-b0a1-7358e01329fe"));
} catch (e) {}
(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [5920],
  {
    51942: (e, s, a) => {
      Promise.resolve().then(a.bind(a, 92960));
    },
    92960: (e, s, a) => {
      "use strict";
      a.r(s), a.d(s, { default: () => i });
      var t = a(30602),
        r = a(41960),
        l = a(85218),
        c = a(88542),
        d = a(33415),
        n = a(14985);
      function i() {
        let e = (0, r.useParams)().id,
          [s, a] = (0, l.useState)(!0),
          [i, o] = (0, l.useState)([]),
          [f, h] = (0, l.useState)("gpt-4o"),
          [u, m] = (0, l.useState)(null),
          x = (0, n.Iw)();
        return ((0, l.useEffect)(() => {
          !(async function () {
            if (e)
              try {
                a(!0);
                let { data: s, error: t } = await x
                  .from("chat_sessions")
                  .select("*")
                  .eq("id", e)
                  .eq("visibility", "public")
                  .single();
                if (t) throw Error("Shared chat not found");
                s.model && h(s.model);
                let { data: r, error: l } = await x
                  .from("chat_messages")
                  .select("*")
                  .eq("chat_id", e)
                  .order("created_at", { ascending: !0 });
                if (l) throw Error("Failed to load messages");
                let c = r.map((e) => ({
                  id: e.id,
                  role: e.role,
                  content: e.content,
                  createdAt: e.created_at,
                }));
                o(c);
              } catch (e) {
                console.error("Error loading shared chat:", e), m(e.message);
              } finally {
                a(!1);
              }
          })();
        }, [e, x]),
        u)
          ? (0, t.jsx)("div", {
              className: "flex h-screen items-center justify-center",
              children: (0, t.jsxs)("div", {
                className: "text-center",
                children: [
                  (0, t.jsx)("h2", {
                    className: "text-2xl font-bold",
                    children: "Error",
                  }),
                  (0, t.jsx)("p", {
                    className: "text-muted-foreground",
                    children: u,
                  }),
                ],
              }),
            })
          : s
            ? (0, t.jsxs)("div", {
                className: "flex h-screen flex-col",
                children: [
                  (0, t.jsxs)("div", {
                    className:
                      "flex h-14 items-center justify-between border-b px-4",
                    children: [
                      (0, t.jsx)(c.E, { className: "h-6 w-48" }),
                      (0, t.jsx)(c.E, { className: "h-8 w-32" }),
                    ],
                  }),
                  (0, t.jsxs)("div", {
                    className: "flex-1 p-4 space-y-6",
                    children: [
                      (0, t.jsx)(c.E, { className: "h-16 w-2/3" }),
                      (0, t.jsx)(c.E, { className: "h-16 w-2/3 ml-auto" }),
                      (0, t.jsx)(c.E, { className: "h-16 w-2/3" }),
                    ],
                  }),
                  (0, t.jsx)("div", {
                    className: "border-t p-4",
                    children: (0, t.jsx)(c.E, { className: "h-10 w-full" }),
                  }),
                ],
              })
            : (0, t.jsx)("div", {
                className: "flex h-screen flex-col",
                children: (0, t.jsx)(d.UnifiedChatContainer, {
                  id: e,
                  isReadonly: !0,
                }),
              });
      }
    },
  },
  (e) => {
    var s = (s) => e((e.s = s));
    e.O(0, [6593, 4223, 3209, 7358], () => s(51942)), (_N_E = e.O());
  },
]);
