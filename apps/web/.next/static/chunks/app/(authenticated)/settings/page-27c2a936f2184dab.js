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
    (e._sentryDebugIds[s] = "ddb0288a-d1ce-466b-b301-d660689ae9d2"),
    (e._sentryDebugIdIdentifier =
      "sentry-dbid-ddb0288a-d1ce-466b-b301-d660689ae9d2"));
} catch (e) {}
(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [1905],
  {
    4431: (e, s, a) => {
      "use strict";
      a.r(s), a.d(s, { default: () => f });
      var t = a(30602),
        i = a(41960),
        l = a(85218),
        r = a(47482),
        n = a(84418),
        d = a(14985),
        c = a(11148),
        o = a(5271);
      async function u(e) {
        let s = (0, d.AG)(),
          a = e.name.split(".").pop(),
          t = "".concat(Math.random(), ".").concat(a),
          { data: i, error: l } = await s.storage.from("avatars").upload(t, e);
        if (l) throw l;
        let {
          data: { publicUrl: r },
        } = s.storage.from("avatars").getPublicUrl(i.path);
        return r;
      }
      let m = (e) => {
        let { currentAvatarUrl: s, onUploadComplete: a } = e,
          [i, n] = (0, l.useState)(!1),
          { toast: d } = (0, r.d)(),
          m = async (e) => {
            var s;
            let t = null == (s = e.target.files) ? void 0 : s[0];
            if (t)
              try {
                n(!0);
                let e = await u(t);
                await a(e),
                  d({
                    title: "Success",
                    description: "Avatar updated successfully",
                  });
              } catch (e) {
                d({
                  variant: "destructive",
                  title: "Error",
                  description: "Failed to upload avatar",
                });
              } finally {
                n(!1);
              }
          };
        return (0, t.jsxs)("div", {
          className: "flex items-center gap-4",
          children: [
            (0, t.jsx)(c.eu, {
              className: "h-16 w-16",
              children: (0, t.jsx)("img", { src: s, alt: "Avatar" }),
            }),
            (0, t.jsxs)("div", {
              children: [
                (0, t.jsx)("input", {
                  type: "file",
                  accept: "image/*",
                  className: "hidden",
                  id: "avatar-upload",
                  onChange: m,
                  disabled: i,
                }),
                (0, t.jsx)(o.$, {
                  variant: "outline",
                  onClick: () => {
                    var e;
                    return null ==
                      (e = document.getElementById("avatar-upload"))
                      ? void 0
                      : e.click();
                  },
                  disabled: i,
                  children: i ? "Uploading..." : "Change Avatar",
                }),
              ],
            }),
          ],
        });
      };
      var h = a(77413),
        x = a(21382),
        p = a(86697);
      function f() {
        var e, s;
        let [a, c] = (0, l.useState)(!1),
          { user: u } = (0, n.useAuth)(),
          { toast: f } = (0, r.d)(),
          j = (0, d.Iw)(),
          [v, g] = (0, l.useState)(
            (null == u || null == (e = u.user_metadata)
              ? void 0
              : e.full_name) || "",
          ),
          y = (0, i.useSearchParams)().get("tab"),
          [N, b] = (0, l.useState)({
            emailNotifications: !0,
            documentReminders: !0,
            applicationUpdates: !0,
            twoFactorAuth: !1,
            theme: "system",
            language: "en",
          }),
          w = async (e) => {
            try {
              if (!(null == u ? void 0 : u.id))
                throw Error("User not authenticated");
              let { error: s } = await j
                .from("profiles")
                .update({ avatar_url: e })
                .eq("id", u.id);
              if (s) throw s;
            } catch (e) {
              f({
                variant: "destructive",
                title: "Error",
                description: "Failed to update profile",
              });
            }
          },
          C = async (e, s) => {
            b((a) => ({ ...a, [e]: s }));
            try {
              if (!(null == u ? void 0 : u.id))
                throw Error("User not authenticated");
              let { error: a } = await j
                .from("profiles")
                .update({ ["settings_".concat(e)]: s })
                .eq("id", u.id);
              if (a) throw a;
              f({
                title: "Success",
                description: "Settings updated successfully",
              });
            } catch (e) {
              f({
                variant: "destructive",
                title: "Error",
                description: "Failed to update settings",
              });
            }
          },
          S = async () => {
            try {
              if ((c(!0), !u)) throw Error("No user");
              let { error: e } = await j.auth.updateUser({
                data: { full_name: v },
              });
              if (e) throw e;
              let { error: s } = await j
                .from("profiles")
                .update({ full_name: v })
                .eq("id", u.id);
              if (s) throw s;
              f({
                title: "Success",
                description: "Profile updated successfully",
              });
            } catch (e) {
              console.error("Profile update error:", e),
                f({
                  variant: "destructive",
                  title: "Error",
                  description: "Failed to update profile",
                });
            } finally {
              c(!1);
            }
          };
        return (0, t.jsx)("div", {
          className: "container max-w-4xl py-8",
          children: (0, t.jsxs)(p.Tabs, {
            defaultValue: y || "general",
            className: "space-y-4",
            children: [
              (0, t.jsxs)(p.TabsList, {
                children: [
                  (0, t.jsx)(p.TabsTrigger, {
                    value: "general",
                    children: "General",
                  }),
                  (0, t.jsx)(p.TabsTrigger, {
                    value: "notifications",
                    children: "Notifications",
                  }),
                  (0, t.jsx)(p.TabsTrigger, {
                    value: "security",
                    children: "Security",
                  }),
                ],
              }),
              (0, t.jsx)(p.TabsContent, {
                value: "general",
                children: (0, t.jsxs)(h.Zp, {
                  children: [
                    (0, t.jsxs)(h.aR, {
                      children: [
                        (0, t.jsx)(h.ZB, { children: "General Settings" }),
                        (0, t.jsx)(h.BT, {
                          children: "Manage your profile and preferences",
                        }),
                      ],
                    }),
                    (0, t.jsxs)(h.Wu, {
                      className: "space-y-6",
                      children: [
                        (0, t.jsxs)("div", {
                          className: "space-y-4",
                          children: [
                            (0, t.jsx)("h3", {
                              className: "text-lg font-medium",
                              children: "Profile Information",
                            }),
                            (0, t.jsxs)("div", {
                              className: "space-y-2",
                              children: [
                                (0, t.jsx)("label", {
                                  className: "text-sm font-medium",
                                  children: "Full Name",
                                }),
                                (0, t.jsxs)("div", {
                                  className: "flex gap-2",
                                  children: [
                                    (0, t.jsx)("input", {
                                      type: "text",
                                      value: v,
                                      onChange: (e) => g(e.target.value),
                                      className:
                                        "flex-1 rounded-md border px-3 py-2",
                                      placeholder: "Enter your full name",
                                    }),
                                    (0, t.jsx)(o.$, {
                                      onClick: S,
                                      disabled: a,
                                      children: a ? "Updating..." : "Update",
                                    }),
                                  ],
                                }),
                              ],
                            }),
                          ],
                        }),
                        (0, t.jsxs)("div", {
                          className: "space-y-4",
                          children: [
                            (0, t.jsx)("h3", {
                              className: "text-lg font-medium",
                              children: "Profile Picture",
                            }),
                            (0, t.jsx)(m, {
                              currentAvatarUrl:
                                null == u || null == (s = u.user_metadata)
                                  ? void 0
                                  : s.avatar_url,
                              onUploadComplete: w,
                            }),
                          ],
                        }),
                        (0, t.jsxs)("div", {
                          className: "space-y-4",
                          children: [
                            (0, t.jsx)("h3", {
                              className: "text-lg font-medium",
                              children: "Preferences",
                            }),
                            (0, t.jsxs)("div", {
                              className: "space-y-4",
                              children: [
                                (0, t.jsxs)("div", {
                                  className:
                                    "flex items-center justify-between",
                                  children: [
                                    (0, t.jsxs)("div", {
                                      className: "space-y-0.5",
                                      children: [
                                        (0, t.jsx)("label", {
                                          className: "text-sm font-medium",
                                          children: "Theme",
                                        }),
                                        (0, t.jsx)("p", {
                                          className:
                                            "text-sm text-muted-foreground",
                                          children:
                                            "Choose your preferred theme",
                                        }),
                                      ],
                                    }),
                                    (0, t.jsxs)("select", {
                                      value: N.theme,
                                      onChange: (e) =>
                                        C("theme", e.target.value),
                                      className: "w-[200px] rounded-md border",
                                      children: [
                                        (0, t.jsx)("option", {
                                          value: "light",
                                          children: "Light",
                                        }),
                                        (0, t.jsx)("option", {
                                          value: "dark",
                                          children: "Dark",
                                        }),
                                        (0, t.jsx)("option", {
                                          value: "system",
                                          children: "System",
                                        }),
                                      ],
                                    }),
                                  ],
                                }),
                                (0, t.jsxs)("div", {
                                  className:
                                    "flex items-center justify-between",
                                  children: [
                                    (0, t.jsxs)("div", {
                                      className: "space-y-0.5",
                                      children: [
                                        (0, t.jsx)("label", {
                                          className: "text-sm font-medium",
                                          children: "Language",
                                        }),
                                        (0, t.jsx)("p", {
                                          className:
                                            "text-sm text-muted-foreground",
                                          children:
                                            "Select your preferred language",
                                        }),
                                      ],
                                    }),
                                    (0, t.jsxs)("select", {
                                      value: N.language,
                                      onChange: (e) =>
                                        C("language", e.target.value),
                                      className: "w-[200px] rounded-md border",
                                      children: [
                                        (0, t.jsx)("option", {
                                          value: "en",
                                          children: "English",
                                        }),
                                        (0, t.jsx)("option", {
                                          value: "es",
                                          children: "Spanish",
                                        }),
                                        (0, t.jsx)("option", {
                                          value: "fr",
                                          children: "French",
                                        }),
                                      ],
                                    }),
                                  ],
                                }),
                              ],
                            }),
                          ],
                        }),
                      ],
                    }),
                  ],
                }),
              }),
              (0, t.jsx)(p.TabsContent, {
                value: "notifications",
                children: (0, t.jsxs)(h.Zp, {
                  children: [
                    (0, t.jsxs)(h.aR, {
                      children: [
                        (0, t.jsx)(h.ZB, { children: "Notification Settings" }),
                        (0, t.jsx)(h.BT, {
                          children: "Manage how you receive notifications",
                        }),
                      ],
                    }),
                    (0, t.jsxs)(h.Wu, {
                      className: "space-y-4",
                      children: [
                        (0, t.jsxs)("div", {
                          className: "flex items-center justify-between",
                          children: [
                            (0, t.jsxs)("div", {
                              className: "space-y-0.5",
                              children: [
                                (0, t.jsx)("label", {
                                  className: "text-sm font-medium",
                                  children: "Email Notifications",
                                }),
                                (0, t.jsx)("p", {
                                  className: "text-sm text-muted-foreground",
                                  children:
                                    "Receive updates about your application",
                                }),
                              ],
                            }),
                            (0, t.jsx)(x.d, {
                              checked: N.emailNotifications,
                              onCheckedChange: (e) =>
                                C("emailNotifications", e),
                            }),
                          ],
                        }),
                        (0, t.jsxs)("div", {
                          className: "flex items-center justify-between",
                          children: [
                            (0, t.jsxs)("div", {
                              className: "space-y-0.5",
                              children: [
                                (0, t.jsx)("label", {
                                  className: "text-sm font-medium",
                                  children: "Document Reminders",
                                }),
                                (0, t.jsx)("p", {
                                  className: "text-sm text-muted-foreground",
                                  children:
                                    "Get reminded about document deadlines",
                                }),
                              ],
                            }),
                            (0, t.jsx)(x.d, {
                              checked: N.documentReminders,
                              onCheckedChange: (e) => C("documentReminders", e),
                            }),
                          ],
                        }),
                        (0, t.jsxs)("div", {
                          className: "flex items-center justify-between",
                          children: [
                            (0, t.jsxs)("div", {
                              className: "space-y-0.5",
                              children: [
                                (0, t.jsx)("label", {
                                  className: "text-sm font-medium",
                                  children: "Application Updates",
                                }),
                                (0, t.jsx)("p", {
                                  className: "text-sm text-muted-foreground",
                                  children:
                                    "Receive status updates about your application",
                                }),
                              ],
                            }),
                            (0, t.jsx)(x.d, {
                              checked: N.applicationUpdates,
                              onCheckedChange: (e) =>
                                C("applicationUpdates", e),
                            }),
                          ],
                        }),
                      ],
                    }),
                  ],
                }),
              }),
              (0, t.jsx)(p.TabsContent, {
                value: "security",
                children: (0, t.jsxs)(h.Zp, {
                  children: [
                    (0, t.jsxs)(h.aR, {
                      children: [
                        (0, t.jsx)(h.ZB, { children: "Security Settings" }),
                        (0, t.jsx)(h.BT, {
                          children: "Manage your account security",
                        }),
                      ],
                    }),
                    (0, t.jsxs)(h.Wu, {
                      className: "space-y-4",
                      children: [
                        (0, t.jsxs)("div", {
                          className: "flex items-center justify-between",
                          children: [
                            (0, t.jsxs)("div", {
                              className: "space-y-0.5",
                              children: [
                                (0, t.jsx)("label", {
                                  className: "text-sm font-medium",
                                  children: "Two-Factor Authentication",
                                }),
                                (0, t.jsx)("p", {
                                  className: "text-sm text-muted-foreground",
                                  children:
                                    "Add an extra layer of security to your account",
                                }),
                              ],
                            }),
                            (0, t.jsx)(x.d, {
                              checked: N.twoFactorAuth,
                              onCheckedChange: (e) => C("twoFactorAuth", e),
                            }),
                          ],
                        }),
                        (0, t.jsxs)("div", {
                          className: "space-y-4",
                          children: [
                            (0, t.jsx)("h3", {
                              className: "text-lg font-medium",
                              children: "Password",
                            }),
                            (0, t.jsx)(o.$, {
                              variant: "outline",
                              children: "Change Password",
                            }),
                          ],
                        }),
                        (0, t.jsxs)("div", {
                          className: "space-y-4",
                          children: [
                            (0, t.jsx)("h3", {
                              className: "text-lg font-medium",
                              children: "Sessions",
                            }),
                            (0, t.jsx)(o.$, {
                              variant: "destructive",
                              children: "Sign Out All Devices",
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
        });
      }
    },
    99833: (e, s, a) => {
      Promise.resolve().then(a.bind(a, 4431));
    },
  },
  (e) => {
    var s = (s) => e((e.s = s));
    e.O(0, [6593, 4223, 3209, 7358], () => s(99833)), (_N_E = e.O());
  },
]);
