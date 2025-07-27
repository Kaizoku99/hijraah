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
    (e._sentryDebugIds[s] = "bc5ee1d7-3153-49f2-8663-9a834eddc0ab"),
    (e._sentryDebugIdIdentifier =
      "sentry-dbid-bc5ee1d7-3153-49f2-8663-9a834eddc0ab"));
} catch (e) {}
(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [5657],
  {
    31333: (e, s, a) => {
      "use strict";
      a.r(s), a.d(s, { default: () => j });
      var t = a(30602),
        i = a(68454),
        r = a(13575),
        c = a(76208),
        d = a(97687),
        l = a.n(d),
        n = a(41960),
        h = a(85218),
        o = a(5271),
        u = a(77413),
        x = a(88542),
        m = a(47482),
        f = a(84418);
      function j() {
        let e = (0, n.useRouter)(),
          { user: s } = (0, f.useAuth)(),
          { toast: a } = (0, m.d)(),
          [d, j] = (0, h.useState)([]),
          [v, g] = (0, h.useState)(!0);
        (0, h.useEffect)(() => {
          !(async function () {
            if (s)
              try {
                g(!0);
                let e = await fetch("/api/chat/archived");
                if (!e.ok) throw Error("Failed to fetch archived chats");
                let s = await e.json();
                j(s);
              } catch (e) {
                console.error("Error loading archived chats:", e),
                  a({
                    title: "Error",
                    description: e.message || "Failed to load archived chats",
                    variant: "destructive",
                  });
              } finally {
                g(!1);
              }
          })();
        }, [s, a]);
        let y = async (e) => {
          try {
            if (
              !(
                await fetch("/api/chat/".concat(e, "/unarchive"), {
                  method: "PUT",
                })
              ).ok
            )
              throw Error("Failed to unarchive chat");
            j(d.filter((s) => s.id !== e)),
              a({
                title: "Chat unarchived",
                description: "The chat has been restored to your history",
              });
          } catch (e) {
            console.error("Error unarchiving chat:", e),
              a({
                title: "Error",
                description: e.message || "Failed to unarchive chat",
                variant: "destructive",
              });
          }
        };
        return s
          ? (0, t.jsxs)("div", {
              className: "container mx-auto py-8",
              children: [
                (0, t.jsxs)("div", {
                  className: "flex items-center justify-between mb-6",
                  children: [
                    (0, t.jsx)("h1", {
                      className: "text-2xl font-bold",
                      children: "Archived Chats",
                    }),
                    (0, t.jsxs)(o.$, {
                      variant: "outline",
                      onClick: () => e.push("/ai-chat/history"),
                      children: [
                        (0, t.jsx)(r.A, { className: "mr-2 h-4 w-4" }),
                        "Back to History",
                      ],
                    }),
                  ],
                }),
                v
                  ? (0, t.jsx)("div", {
                      className: "grid gap-4 md:grid-cols-2 lg:grid-cols-3",
                      children: [1, 2, 3].map((e) =>
                        (0, t.jsxs)(
                          u.Zp,
                          {
                            children: [
                              (0, t.jsx)(u.aR, {
                                children: (0, t.jsx)(x.E, {
                                  className: "h-6 w-3/4",
                                }),
                              }),
                              (0, t.jsx)(u.Wu, {
                                children: (0, t.jsx)(x.E, {
                                  className: "h-4 w-full",
                                }),
                              }),
                              (0, t.jsx)(u.wL, {
                                children: (0, t.jsx)(x.E, {
                                  className: "h-9 w-full",
                                }),
                              }),
                            ],
                          },
                          e,
                        ),
                      ),
                    })
                  : 0 === d.length
                    ? (0, t.jsxs)("div", {
                        className: "text-center py-12",
                        children: [
                          (0, t.jsx)(c.A, {
                            className:
                              "mx-auto h-12 w-12 text-muted-foreground",
                          }),
                          (0, t.jsx)("h2", {
                            className: "mt-4 text-lg font-semibold",
                            children: "No archived chats",
                          }),
                          (0, t.jsx)("p", {
                            className: "text-muted-foreground mt-2",
                            children:
                              "When you archive chats, they will appear here",
                          }),
                          (0, t.jsxs)(o.$, {
                            className: "mt-4",
                            variant: "outline",
                            onClick: () => e.push("/ai-chat/history"),
                            children: [
                              (0, t.jsx)(r.A, { className: "mr-2 h-4 w-4" }),
                              "Back to History",
                            ],
                          }),
                        ],
                      })
                    : (0, t.jsx)("div", {
                        className: "grid gap-4 md:grid-cols-2 lg:grid-cols-3",
                        children: d.map((e) =>
                          (0, t.jsxs)(
                            u.Zp,
                            {
                              children: [
                                (0, t.jsxs)(u.aR, {
                                  children: [
                                    (0, t.jsx)(u.ZB, {
                                      className: "truncate",
                                      children:
                                        e.title ||
                                        "Chat (".concat(
                                          e.id.substring(0, 6),
                                          "...)",
                                        ),
                                    }),
                                    (0, t.jsxs)("p", {
                                      className:
                                        "text-sm text-muted-foreground",
                                      children: [
                                        "Archived ",
                                        (0, i.m)(new Date(e.updated_at), {
                                          addSuffix: !0,
                                        }),
                                      ],
                                    }),
                                  ],
                                }),
                                (0, t.jsxs)(u.wL, {
                                  className: "flex justify-between",
                                  children: [
                                    (0, t.jsx)(o.$, {
                                      variant: "outline",
                                      asChild: !0,
                                      children: (0, t.jsx)(l(), {
                                        href: "/ai-chat/".concat(e.id),
                                        children: "View",
                                      }),
                                    }),
                                    (0, t.jsxs)(o.$, {
                                      variant: "secondary",
                                      onClick: () => y(e.id),
                                      children: [
                                        (0, t.jsx)(c.A, {
                                          className: "mr-2 h-4 w-4",
                                        }),
                                        "Unarchive",
                                      ],
                                    }),
                                  ],
                                }),
                              ],
                            },
                            e.id,
                          ),
                        ),
                      }),
              ],
            })
          : (0, t.jsx)("div", {
              className: "container mx-auto py-8",
              children: (0, t.jsxs)("div", {
                className: "text-center",
                children: [
                  (0, t.jsx)("h1", {
                    className: "text-2xl font-bold",
                    children: "Archived Chats",
                  }),
                  (0, t.jsx)("p", {
                    className: "text-muted-foreground mt-2",
                    children: "Please sign in to view your archived chats",
                  }),
                ],
              }),
            });
      }
    },
    36438: (e, s, a) => {
      Promise.resolve().then(a.bind(a, 31333));
    },
  },
  (e) => {
    var s = (s) => e((e.s = s));
    e.O(0, [6593, 4223, 3209, 7358], () => s(36438)), (_N_E = e.O());
  },
]);
