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
    (e._sentryDebugIds[s] = "9f08f69f-4561-4d15-bcdb-e5e84f871a90"),
    (e._sentryDebugIdIdentifier =
      "sentry-dbid-9f08f69f-4561-4d15-bcdb-e5e84f871a90"));
} catch (e) {}
(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [7943],
  {
    20700: (e, s, t) => {
      Promise.resolve().then(t.bind(t, 70605));
    },
    70605: (e, s, t) => {
      "use strict";
      t.r(s), t.d(s, { default: () => f });
      var n = t(30602),
        l = t(41960),
        i = t(85218),
        a = t(85251),
        r = (function (e) {
          return (
            (e.GPT_3_5 = "gpt-3.5-turbo"),
            (e.GPT_4 = "gpt-4"),
            (e.GPT_4_VISION = "gpt-4-vision-preview"),
            (e.CLAUDE_3_SONNET = "claude-3-sonnet"),
            (e.CLAUDE_3_OPUS = "claude-3-opus"),
            (e.CLAUDE_3_HAIKU = "claude-3-haiku"),
            e
          );
        })({}),
        c = t(84418),
        d = t(88542);
      function f() {
        let e = (0, l.useRouter)(),
          s = (0, c.useUser)(),
          { createChat: t, isLoading: f } = (0, a.Y)(),
          o = null == s;
        return ((0, i.useEffect)(() => {
          let n = async () => {
            if (s)
              try {
                let s = await t({
                  title: "New Chat",
                  modelType: r.GPT_4,
                  initialMessage: "Hello, I need help with immigration.",
                });
                s && e.push("/ai-unified/chat/".concat(s.id));
              } catch (e) {
                console.error("Error creating new chat:", e);
              }
          };
          s && !f && n();
        }, [s, e, t, f]),
        o || f)
          ? (0, n.jsxs)("div", {
              className:
                "flex flex-col items-center justify-center min-h-[60vh] p-4",
              children: [
                (0, n.jsx)(d.E, { className: "h-8 w-64 mb-4" }),
                (0, n.jsx)(d.E, { className: "h-32 w-full max-w-2xl mb-4" }),
                (0, n.jsx)(d.E, { className: "h-32 w-full max-w-2xl" }),
              ],
            })
          : s
            ? (0, n.jsx)("div", {
                className: "flex items-center justify-center min-h-[60vh]",
                children: (0, n.jsxs)("div", {
                  className: "flex flex-col items-center",
                  children: [
                    (0, n.jsx)("h1", {
                      className: "text-2xl font-bold mb-4",
                      children: "Creating your new chat...",
                    }),
                    (0, n.jsx)("p", {
                      className: "text-muted-foreground",
                      children: "Please wait while we set things up.",
                    }),
                  ],
                }),
              })
            : (0, n.jsxs)("div", {
                className:
                  "flex flex-col items-center justify-center min-h-[60vh] p-4",
                children: [
                  (0, n.jsx)("h1", {
                    className: "text-2xl font-bold mb-4",
                    children: "Sign in required",
                  }),
                  (0, n.jsx)("p", {
                    className: "text-muted-foreground mb-4",
                    children: "You need to be signed in to create a new chat.",
                  }),
                ],
              });
      }
    },
  },
  (e) => {
    var s = (s) => e((e.s = s));
    e.O(0, [6593, 4223, 3209, 7358], () => s(20700)), (_N_E = e.O());
  },
]);
