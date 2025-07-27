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
    (e._sentryDebugIds[s] = "56c5289c-544c-4e42-ab5c-ba080f1a0a60"),
    (e._sentryDebugIdIdentifier =
      "sentry-dbid-56c5289c-544c-4e42-ab5c-ba080f1a0a60"));
} catch (e) {}
(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [8646],
  {
    32902: (e, s, a) => {
      Promise.resolve().then(a.bind(a, 62892));
    },
    62892: (e, s, a) => {
      "use strict";
      a.r(s), a.d(s, { default: () => f });
      var t = a(30602),
        r = a(85218),
        i = a(36839),
        n = a(5271),
        l = a(79430),
        c = a(61159),
        o = a(56753);
      let d = ["visa", "study", "work", "immigrate", "citizenship"];
      function h(e) {
        let { onCompare: s, isLoading: a, comparison: i } = e,
          [h, u] = (0, r.useState)([]),
          [m, p] = (0, r.useState)("visa"),
          [f, x] = (0, r.useState)(null),
          y = (e) => {
            u((s) => (s.includes(e) ? s.filter((s) => s !== e) : [...s, e]));
          },
          b = async () => {
            if (h.length < 2)
              return void alert(
                "Please select at least 2 countries to compare",
              );
            try {
              await s(h, m);
            } catch (e) {
              x(e);
            }
          };
        return (0, t.jsxs)("div", {
          className: "space-y-6",
          children: [
            (0, t.jsxs)("div", {
              className: "flex flex-col space-y-4",
              children: [
                (0, t.jsx)("h2", {
                  className: "text-xl font-semibold",
                  children: "Select Countries to Compare",
                }),
                (0, t.jsx)("div", {
                  className: "flex flex-wrap gap-2",
                  children: [].map((e) =>
                    (0, t.jsx)(
                      n.$,
                      {
                        variant: h.includes(e) ? "secondary" : "outline",
                        onClick: () => y(e),
                        className: "capitalize",
                        children: e,
                      },
                      e,
                    ),
                  ),
                }),
              ],
            }),
            (0, t.jsxs)("div", {
              className: "flex flex-col space-y-4",
              children: [
                (0, t.jsx)("h2", {
                  className: "text-xl font-semibold",
                  children: "Select Category",
                }),
                (0, t.jsxs)(c.l6, {
                  value: m,
                  onValueChange: p,
                  children: [
                    (0, t.jsx)(c.bq, {
                      children: (0, t.jsx)(c.yv, {
                        placeholder: "Select category",
                      }),
                    }),
                    (0, t.jsx)(c.gC, {
                      children: d.map((e) =>
                        (0, t.jsx)(
                          c.eb,
                          {
                            value: e,
                            children: e.charAt(0).toUpperCase() + e.slice(1),
                          },
                          e,
                        ),
                      ),
                    }),
                  ],
                }),
              ],
            }),
            (0, t.jsx)(n.$, {
              onClick: b,
              disabled: h.length < 2 || a,
              className: "w-full",
              children: a ? "Comparing..." : "Compare Selected Countries",
            }),
            i &&
              (0, t.jsxs)(t.Fragment, {
                children: [
                  (0, t.jsx)(o.Separator, {}),
                  (0, t.jsxs)("div", {
                    className: "rounded-lg border p-4",
                    children: [
                      (0, t.jsx)("h2", {
                        className: "text-xl font-semibold mb-4",
                        children: "Comparison Results",
                      }),
                      (0, t.jsx)(l.F, {
                        className: "h-[400px]",
                        children: (0, t.jsx)("div", {
                          className: "prose dark:prose-invert max-w-none",
                          children: i,
                        }),
                      }),
                    ],
                  }),
                ],
              }),
          ],
        });
      }
      var u = a(14985);
      class m {
        async getAuthHeader() {
          let {
            data: { session: e },
            error: s,
          } = await this.supabase.auth.getSession();
          if (s || !e) throw Error("Not authenticated");
          return {
            Authorization: "Bearer ".concat(e.access_token),
            "Content-Type": "application/json",
          };
        }
        async fetchWithAuth(e) {
          let s =
              arguments.length > 1 && void 0 !== arguments[1]
                ? arguments[1]
                : {},
            a = await this.getAuthHeader(),
            t = await fetch("".concat(this.baseUrl).concat(e), {
              ...s,
              headers: { ...a, ...s.headers },
            });
          if (!t.ok)
            throw Error(
              (await t.json().catch(() => ({}))).message ||
                "API request failed",
            );
          return t.json();
        }
        async processQuery(e, s) {
          return this.fetchWithAuth("/ai/chat", {
            method: "POST",
            body: JSON.stringify({ query: e, filters: s }),
          });
        }
        async compareCountries(e, s) {
          return this.fetchWithAuth("/ai/compare", {
            method: "POST",
            body: JSON.stringify({ countries: e, category: s }),
          });
        }
        constructor(e = {}) {
          (this.supabase = (0, u.AG)()), (this.baseUrl = e.baseUrl || "/api");
        }
      }
      let p = new m();
      function f() {
        let [e, s] = (0, r.useState)(!1),
          [a, n] = (0, r.useState)(null),
          l = async (e, a) => {
            s(!0);
            try {
              let { data: s } = await p.compareCountries(e, a);
              n(s), i.oR.success("Comparison generated successfully");
            } catch (e) {
              console.error("Comparison error:", e),
                i.oR.error(
                  e instanceof Error
                    ? e.message
                    : "Failed to compare countries",
                ),
                n("Failed to compare countries. Please try again.");
            } finally {
              s(!1);
            }
          };
        return (0, t.jsxs)("div", {
          className: "container mx-auto py-8",
          children: [
            (0, t.jsx)("h1", {
              className: "text-3xl font-bold mb-8",
              children: "Compare Immigration Requirements",
            }),
            (0, t.jsx)(h, { onCompare: l, isLoading: e, comparison: a }),
          ],
        });
      }
    },
  },
  (e) => {
    var s = (s) => e((e.s = s));
    e.O(0, [4223, 6593, 3209, 7358], () => s(32902)), (_N_E = e.O());
  },
]);
