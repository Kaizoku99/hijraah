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
    (e._sentryDebugIds[t] = "7c8ba572-94a0-40b9-8f08-c7da2a263ecc"),
    (e._sentryDebugIdIdentifier =
      "sentry-dbid-7c8ba572-94a0-40b9-8f08-c7da2a263ecc"));
} catch (e) {}
(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [2588],
  {
    5416: (e, t, s) => {
      "use strict";
      s.r(t), s.d(t, { default: () => m });
      var a = s(30602),
        i = s(2960),
        d = s(30230),
        r = s(85218),
        c = s(15883),
        n = s(84418),
        l = s(77413),
        o = s(79430),
        h = s(86697);
      let u = (e) => (0, d.GP)(new Date(e), "PPp");
      function m() {
        let [e, t] = (0, r.useState)([]),
          [s, d] = (0, r.useState)([]),
          [m, x] = (0, r.useState)(!0),
          { user: f } = (0, n.useAuth)(),
          p = (0, i.createBrowserClient)(
            "http://localhost:54321",
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0",
          );
        return (
          (0, r.useEffect)(() => {
            (null == f ? void 0 : f.id) && e();
            async function e() {
              try {
                let { data: e, error: s } = await p
                  .from("chat_messages")
                  .select("*")
                  .eq("user_id", f.id)
                  .order("created_at", { ascending: !1 });
                if (s) throw s;
                let { data: a, error: i } = await p
                  .from("documents")
                  .select("*")
                  .eq("user_id", f.id)
                  .order("created_at", { ascending: !1 });
                if (i) throw i;
                t(
                  (e || []).map((e) => ({
                    id: e.id,
                    type: "chat",
                    title: "Chat Session",
                    description: e.content,
                    created_at: e.created_at,
                  })),
                ),
                  d(
                    (a || []).map((e) => ({
                      id: e.id,
                      type: "document",
                      title: e.name,
                      description: ""
                        .concat(e.file_type.toUpperCase(), " - ")
                        .concat((e.file_size / 1024 / 1024).toFixed(2), "MB"),
                      created_at: e.created_at,
                    })),
                  );
              } catch (e) {
                console.error("Error loading history:", e);
              } finally {
                x(!1);
              }
            }
          }, [f, p]),
          (0, a.jsx)(c.O, {
            children: (0, a.jsxs)("div", {
              className: "flex flex-col gap-8",
              children: [
                (0, a.jsxs)("div", {
                  children: [
                    (0, a.jsx)("h1", {
                      className: "text-3xl font-bold",
                      children: "History",
                    }),
                    (0, a.jsx)("p", {
                      className: "text-muted-foreground",
                      children: "View your chat and document history",
                    }),
                  ],
                }),
                (0, a.jsxs)(l.Zp, {
                  children: [
                    (0, a.jsxs)(l.aR, {
                      children: [
                        (0, a.jsx)(l.ZB, { children: "Activity History" }),
                        (0, a.jsx)(l.BT, {
                          children: "Your recent chats and document activities",
                        }),
                      ],
                    }),
                    (0, a.jsx)(l.Wu, {
                      children: (0, a.jsxs)(h.Tabs, {
                        defaultValue: "chats",
                        children: [
                          (0, a.jsxs)(h.TabsList, {
                            children: [
                              (0, a.jsx)(h.TabsTrigger, {
                                value: "chats",
                                children: "Chat History",
                              }),
                              (0, a.jsx)(h.TabsTrigger, {
                                value: "documents",
                                children: "Document History",
                              }),
                            ],
                          }),
                          (0, a.jsx)(h.TabsContent, {
                            value: "chats",
                            children: (0, a.jsx)(o.F, {
                              className: "h-[500px]",
                              children: (0, a.jsx)("div", {
                                className: "space-y-4",
                                children: e.map((e) =>
                                  (0, a.jsxs)(
                                    "div",
                                    {
                                      className: "rounded-lg border p-4",
                                      children: [
                                        (0, a.jsxs)("div", {
                                          className:
                                            "flex items-center justify-between",
                                          children: [
                                            (0, a.jsx)("h3", {
                                              className: "font-medium",
                                              children: e.title,
                                            }),
                                            (0, a.jsx)("span", {
                                              className:
                                                "text-sm text-muted-foreground",
                                              children: u(e.created_at),
                                            }),
                                          ],
                                        }),
                                        (0, a.jsx)("p", {
                                          className:
                                            "mt-2 text-sm text-muted-foreground",
                                          children: e.description,
                                        }),
                                      ],
                                    },
                                    e.id,
                                  ),
                                ),
                              }),
                            }),
                          }),
                          (0, a.jsx)(h.TabsContent, {
                            value: "documents",
                            children: (0, a.jsx)(o.F, {
                              className: "h-[500px]",
                              children: (0, a.jsx)("div", {
                                className: "space-y-4",
                                children: s.map((e) =>
                                  (0, a.jsxs)(
                                    "div",
                                    {
                                      className: "rounded-lg border p-4",
                                      children: [
                                        (0, a.jsxs)("div", {
                                          className:
                                            "flex items-center justify-between",
                                          children: [
                                            (0, a.jsx)("h3", {
                                              className: "font-medium",
                                              children: e.title,
                                            }),
                                            (0, a.jsx)("span", {
                                              className:
                                                "text-sm text-muted-foreground",
                                              children: u(e.created_at),
                                            }),
                                          ],
                                        }),
                                        (0, a.jsx)("p", {
                                          className:
                                            "mt-2 text-sm text-muted-foreground",
                                          children: e.description,
                                        }),
                                      ],
                                    },
                                    e.id,
                                  ),
                                ),
                              }),
                            }),
                          }),
                        ],
                      }),
                    }),
                  ],
                }),
              ],
            }),
          })
        );
      }
    },
    59970: (e, t, s) => {
      Promise.resolve().then(s.bind(s, 5416));
    },
  },
  (e) => {
    var t = (t) => e((e.s = t));
    e.O(0, [6593, 4223, 3209, 7358], () => t(59970)), (_N_E = e.O());
  },
]);
