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
    a = new e.Error().stack;
  a &&
    ((e._sentryDebugIds = e._sentryDebugIds || {}),
    (e._sentryDebugIds[a] = "8e15e4f1-6ea5-4015-914d-78e3f47f0d19"),
    (e._sentryDebugIdIdentifier =
      "sentry-dbid-8e15e4f1-6ea5-4015-914d-78e3f47f0d19"));
} catch (e) {}
(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [9945],
  {
    12791: (e, a, s) => {
      Promise.resolve().then(s.bind(s, 40177));
    },
    40177: (e, a, s) => {
      "use strict";
      s.r(a), s.d(a, { default: () => x });
      var r = s(30602),
        l = s(2960),
        i = s(97605),
        t = s(43765),
        d = s(85218),
        n = s(60070),
        o = s(1805),
        c = s(47482),
        u = s(84418),
        m = s(87486),
        h = s(5271),
        p = s(77413),
        f = s(4401),
        w = s(86697),
        v = s(98748);
      function x() {
        var e, a, s;
        let { user: x } = (0, u.useAuth)(),
          { toast: g } = (0, c.d)(),
          j = (0, l.createBrowserClient)(
            "http://localhost:54321",
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0",
          ),
          [b, y] = (0, d.useState)(!1),
          [N, P] = (0, d.useState)(
            null == x || null == (e = x.user_metadata) ? void 0 : e.avatar_url,
          ),
          [_, C] = (0, d.useState)({
            name:
              (null == x || null == (a = x.user_metadata) ? void 0 : a.name) ||
              "",
            email: (null == x ? void 0 : x.email) || "",
            bio:
              (null == x || null == (s = x.user_metadata) ? void 0 : s.bio) ||
              "",
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",
          });
        (0, d.useEffect)(() => {
          (async () => {
            if (x && !N)
              try {
                let { data: e, error: a } = await j
                  .from("profiles")
                  .select("avatar_url")
                  .eq("id", x.id)
                  .single();
                if (a) return void console.error("Error fetching profile:", a);
                (null == e ? void 0 : e.avatar_url) &&
                  (P(e.avatar_url),
                  await j.auth.updateUser({
                    data: { avatar_url: e.avatar_url },
                  }));
              } catch (e) {
                console.error("Error in avatar fetch:", e);
              }
          })();
        }, [x, N, j]);
        let E = (e) => {
            C((a) => ({ ...a, [e.target.id]: e.target.value }));
          },
          I = async (e) => {
            e.preventDefault(), y(!0);
            try {
              let { error: e } = await j.auth.updateUser({
                data: { name: _.name, bio: _.bio },
              });
              if (e) throw e;
              g({
                title: "Success",
                description: "Profile updated successfully",
              });
            } catch (e) {
              g({
                variant: "destructive",
                title: "Error",
                description: "Failed to update profile",
              });
            } finally {
              y(!1);
            }
          },
          T = async (e) => {
            if (
              (e.preventDefault(), y(!0), _.newPassword !== _.confirmPassword)
            ) {
              g({
                variant: "destructive",
                title: "Error",
                description: "New passwords do not match",
              }),
                y(!1);
              return;
            }
            try {
              let { error: e } = await j.auth.updateUser({
                password: _.newPassword,
              });
              if (e) throw e;
              g({
                title: "Success",
                description: "Password updated successfully",
              }),
                C((e) => ({
                  ...e,
                  currentPassword: "",
                  newPassword: "",
                  confirmPassword: "",
                }));
            } catch (e) {
              g({
                variant: "destructive",
                title: "Error",
                description: "Failed to update password",
              });
            } finally {
              y(!1);
            }
          },
          F = async (e) => {
            var a;
            let s = null == (a = e.target.files) ? void 0 : a[0];
            if (s && x)
              try {
                y(!0);
                let e = await (0, m.F4)(j, s, x.id);
                await (0, m.OJ)(j, x.id, e);
                let { error: a } = await j.auth.updateUser({
                  data: { avatar_url: e },
                });
                if (a) throw a;
                P(e),
                  g({
                    title: "Success",
                    description: "Profile picture updated successfully",
                  });
              } catch (e) {
                console.error("Avatar upload error:", e),
                  g({
                    variant: "destructive",
                    title: "Error",
                    description: "Failed to update profile picture",
                  });
              } finally {
                y(!1);
              }
          };
        return (0, r.jsxs)("div", {
          className: "container max-w-4xl py-8",
          children: [
            (0, r.jsx)("h1", {
              className: "text-3xl font-bold mb-6",
              children: "Profile Settings",
            }),
            (0, r.jsxs)(w.Tabs, {
              defaultValue: "general",
              className: "w-full",
              children: [
                (0, r.jsxs)(w.TabsList, {
                  className: "mb-6",
                  children: [
                    (0, r.jsx)(w.TabsTrigger, {
                      value: "general",
                      children: "General",
                    }),
                    (0, r.jsx)(w.TabsTrigger, {
                      value: "security",
                      children: "Security",
                    }),
                  ],
                }),
                (0, r.jsx)(w.TabsContent, {
                  value: "general",
                  children: (0, r.jsx)(p.Zp, {
                    className: "p-6",
                    children: (0, r.jsxs)("form", {
                      onSubmit: I,
                      className: "grid gap-6",
                      children: [
                        (0, r.jsxs)("div", {
                          className: "flex items-center gap-4",
                          children: [
                            (0, r.jsxs)("div", {
                              className: "relative",
                              children: [
                                (0, r.jsx)(v.H, {
                                  user: {
                                    name: _.name,
                                    email: _.email,
                                    avatar: N,
                                  },
                                  size: "lg",
                                  shape: "circle",
                                  className:
                                    "cursor-pointer hover:opacity-80 transition-opacity",
                                }),
                                (0, r.jsx)("label", {
                                  htmlFor: "avatar-upload",
                                  children: (0, r.jsx)(h.$, {
                                    className:
                                      "absolute -bottom-2 -right-2 rounded-full cursor-pointer w-8 h-8 p-0",
                                    variant: "outline",
                                    type: "button",
                                    children: (0, r.jsx)(i.A, {
                                      className: "w-4 h-4",
                                    }),
                                  }),
                                }),
                                (0, r.jsx)("input", {
                                  id: "avatar-upload",
                                  type: "file",
                                  accept: "image/*",
                                  className: "hidden",
                                  onChange: F,
                                  disabled: b,
                                }),
                              ],
                            }),
                            (0, r.jsxs)("div", {
                              children: [
                                (0, r.jsx)("h3", {
                                  className: "font-medium",
                                  children: "Profile Picture",
                                }),
                                (0, r.jsx)("p", {
                                  className: "text-sm text-muted-foreground",
                                  children:
                                    "Click the camera icon to update your photo",
                                }),
                              ],
                            }),
                          ],
                        }),
                        (0, r.jsxs)("div", {
                          className: "grid gap-4",
                          children: [
                            (0, r.jsxs)("div", {
                              className: "grid gap-2",
                              children: [
                                (0, r.jsx)(n.J, {
                                  htmlFor: "name",
                                  children: "Full Name",
                                }),
                                (0, r.jsx)(f.p, {
                                  id: "name",
                                  placeholder: "Enter your full name",
                                  value: _.name,
                                  onChange: E,
                                }),
                              ],
                            }),
                            (0, r.jsxs)("div", {
                              className: "grid gap-2",
                              children: [
                                (0, r.jsx)(n.J, {
                                  htmlFor: "email",
                                  children: "Email",
                                }),
                                (0, r.jsx)(f.p, {
                                  id: "email",
                                  type: "email",
                                  value: _.email,
                                  disabled: !0,
                                }),
                              ],
                            }),
                            (0, r.jsxs)("div", {
                              className: "grid gap-2",
                              children: [
                                (0, r.jsx)(n.J, {
                                  htmlFor: "bio",
                                  children: "Bio",
                                }),
                                (0, r.jsx)(o.T, {
                                  id: "bio",
                                  placeholder: "Tell us a bit about yourself",
                                  className: "min-h-[100px]",
                                  onChange: E,
                                  children: _.bio,
                                }),
                              ],
                            }),
                          ],
                        }),
                        (0, r.jsx)(h.$, {
                          className: "w-full sm:w-auto",
                          disabled: b,
                          children: b ? "Saving..." : "Save Changes",
                        }),
                      ],
                    }),
                  }),
                }),
                (0, r.jsx)(w.TabsContent, {
                  value: "security",
                  children: (0, r.jsx)(p.Zp, {
                    className: "p-6",
                    children: (0, r.jsx)("form", {
                      onSubmit: T,
                      className: "grid gap-6",
                      children: (0, r.jsxs)("div", {
                        className: "flex items-start gap-4",
                        children: [
                          (0, r.jsx)("div", {
                            className:
                              "w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center",
                            children: (0, r.jsx)(t.A, {
                              className: "w-5 h-5 text-primary",
                            }),
                          }),
                          (0, r.jsxs)("div", {
                            className: "flex-1",
                            children: [
                              (0, r.jsx)("h3", {
                                className: "font-medium mb-1",
                                children: "Password",
                              }),
                              (0, r.jsx)("p", {
                                className: "text-sm text-muted-foreground mb-4",
                                children:
                                  "Update your password to keep your account secure",
                              }),
                              (0, r.jsxs)("div", {
                                className: "grid gap-4",
                                children: [
                                  (0, r.jsxs)("div", {
                                    className: "grid gap-2",
                                    children: [
                                      (0, r.jsx)(n.J, {
                                        htmlFor: "currentPassword",
                                        children: "Current Password",
                                      }),
                                      (0, r.jsx)(f.p, {
                                        id: "currentPassword",
                                        type: "password",
                                        placeholder: "Enter current password",
                                        value: _.currentPassword,
                                        onChange: E,
                                      }),
                                    ],
                                  }),
                                  (0, r.jsxs)("div", {
                                    className: "grid gap-2",
                                    children: [
                                      (0, r.jsx)(n.J, {
                                        htmlFor: "newPassword",
                                        children: "New Password",
                                      }),
                                      (0, r.jsx)(f.p, {
                                        id: "newPassword",
                                        type: "password",
                                        placeholder: "Enter new password",
                                        value: _.newPassword,
                                        onChange: E,
                                      }),
                                    ],
                                  }),
                                  (0, r.jsxs)("div", {
                                    className: "grid gap-2",
                                    children: [
                                      (0, r.jsx)(n.J, {
                                        htmlFor: "confirmPassword",
                                        children: "Confirm Password",
                                      }),
                                      (0, r.jsx)(f.p, {
                                        id: "confirmPassword",
                                        type: "password",
                                        placeholder: "Confirm new password",
                                        value: _.confirmPassword,
                                        onChange: E,
                                      }),
                                    ],
                                  }),
                                  (0, r.jsx)(h.$, {
                                    className: "w-full sm:w-auto",
                                    disabled: b,
                                    children: b
                                      ? "Updating..."
                                      : "Update Password",
                                  }),
                                ],
                              }),
                            ],
                          }),
                        ],
                      }),
                    }),
                  }),
                }),
              ],
            }),
          ],
        });
      }
    },
  },
  (e) => {
    var a = (a) => e((e.s = a));
    e.O(0, [4223, 3209, 6593, 7358], () => a(12791)), (_N_E = e.O());
  },
]);
