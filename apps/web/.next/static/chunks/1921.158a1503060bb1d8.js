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
    (e._sentryDebugIds[t] = "7b1f84f9-b33d-4b53-8e0c-283c54379a77"),
    (e._sentryDebugIdIdentifier =
      "sentry-dbid-7b1f84f9-b33d-4b53-8e0c-283c54379a77"));
} catch (e) {}
("use strict");
(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [1921],
  {
    41921: (e, t, s) => {
      s.r(t), s.d(t, { FeatureTour: () => y });
      var l = s(30602),
        i = s(86386),
        n = s(95524),
        r = s(72745),
        a = s(4194),
        o = s(17957),
        c = s(36350),
        d = s(58797),
        u = s(87758),
        f = s(85218),
        m = s(73439),
        h = s(10190),
        p = s(5271),
        b = s(20731);
      let x = () => h.Zj.find((e) => "feature-tour" === e.id),
        y = () => {
          let {
              onboarding: e,
              completeStep: t,
              skipOnboarding: s,
            } = (0, b.z)(),
            [h, y] = (0, f.useState)(0),
            [g, v] = (0, f.useState)(null),
            j = (0, f.useRef)(null),
            N = x(),
            w = null == N ? void 0 : N.tourStops,
            k =
              e.isActive &&
              "feature-tour" === e.currentStep &&
              !e.hideForSession &&
              !e.isCompleted,
            z = w ? w[h] : void 0,
            {
              refs: S,
              floatingStyles: E,
              placement: _,
              middlewareData: R,
            } = (0, i.we)({
              placement: (null == z ? void 0 : z.placement) || "bottom",
              open: k && !!g,
              middleware: [
                (0, n.cY)(10),
                (0, n.UU)(),
                (0, n.BN)({ padding: 8 }),
                (0, n.UE)({ element: j }),
              ],
              whileElementsMounted: (e, t, s) =>
                (0, r.ll)(e, t, s, {
                  ancestorScroll: !0,
                  ancestorResize: !0,
                  elementResize: !0,
                }),
            });
          if (
            ((0, f.useEffect)(() => {
              if (!k || !z) return void v(null);
              let e = document.querySelector(z.target);
              return (
                v(e),
                e &&
                  ((e.style.outline = "2px solid var(--primary)"),
                  (e.style.outlineOffset = "2px"),
                  (e.style.borderRadius = "4px"),
                  e.scrollIntoView({
                    behavior: "smooth",
                    block: "center",
                    inline: "nearest",
                  })),
                () => {
                  e &&
                    ((e.style.outline = ""),
                    (e.style.outlineOffset = ""),
                    (e.style.borderRadius = "")),
                    null == w ||
                      w.forEach((e) => {
                        let t = document.querySelector(e.target);
                        t &&
                          ((t.style.outline = ""),
                          (t.style.outlineOffset = ""),
                          (t.style.borderRadius = ""));
                      });
                }
              );
            }, [k, z, w]),
            (0, f.useEffect)(() => {
              S.setReference(g);
            }, [g, S]),
            !k || !z || !g)
          )
            return null;
          let { x: C, y: I } = R.arrow || {},
            A =
              { top: "bottom", right: "left", bottom: "top", left: "right" }[
                _.split("-")[0]
              ] || "bottom";
          return (0, m.createPortal)(
            (0, l.jsx)(a.N, {
              children:
                k &&
                (0, l.jsxs)(o.P.div, {
                  ref: S.setFloating,
                  style: E,
                  initial: { opacity: 0, scale: 0.9 },
                  animate: { opacity: 1, scale: 1 },
                  exit: { opacity: 0, scale: 0.9 },
                  transition: { duration: 0.2 },
                  className:
                    "bg-card border shadow-lg rounded-lg p-4 w-[320px] z-[9999]",
                  children: [
                    (0, l.jsx)("svg", {
                      ref: j,
                      width: "16",
                      height: "8",
                      viewBox: "0 0 16 8",
                      style: {
                        position: "absolute",
                        left: null != C ? "".concat(C, "px") : "",
                        top: null != I ? "".concat(I, "px") : "",
                        [A]: "-8px",
                      },
                      className: "fill-current text-card block",
                      children: (0, l.jsx)("path", { d: "M0 8 L8 0 L16 8 Z" }),
                    }),
                    (0, l.jsx)("div", {
                      className: "absolute right-2 top-2",
                      children: (0, l.jsx)(p.$, {
                        variant: "ghost",
                        size: "icon",
                        className: "h-6 w-6",
                        onClick: () => {
                          s();
                        },
                        "aria-label": "Skip Tour",
                        children: (0, l.jsx)(c.A, { size: 16 }),
                      }),
                    }),
                    (0, l.jsxs)("div", {
                      className: "mb-4 pr-6",
                      children: [
                        " ",
                        (0, l.jsx)("h3", {
                          className: "font-semibold text-lg",
                          children: z.title,
                        }),
                        (0, l.jsx)("p", {
                          className: "text-sm text-muted-foreground mt-1",
                          children: z.content,
                        }),
                      ],
                    }),
                    (0, l.jsxs)("div", {
                      className: "flex items-center justify-between mt-4",
                      children: [
                        (0, l.jsx)("div", {
                          className: "flex items-center space-x-2",
                          children:
                            w &&
                            Array.from({ length: w.length }).map((e, t) =>
                              (0, l.jsx)(
                                "div",
                                {
                                  className:
                                    "h-1.5 w-1.5 rounded-full transition-colors duration-200 ".concat(
                                      t === h ? "bg-primary" : "bg-muted",
                                    ),
                                },
                                t,
                              ),
                            ),
                        }),
                        (0, l.jsxs)("div", {
                          className: "flex items-center space-x-2",
                          children: [
                            (0, l.jsxs)(p.$, {
                              variant: "outline",
                              size: "sm",
                              onClick: () => {
                                h > 0 && y(h - 1);
                              },
                              disabled: 0 === h,
                              className: "h-8",
                              children: [
                                (0, l.jsx)(d.A, {
                                  size: 16,
                                  className: "mr-1",
                                }),
                                "Previous",
                              ],
                            }),
                            (0, l.jsxs)(p.$, {
                              variant: "default",
                              size: "sm",
                              onClick: () => {
                                w && h < w.length - 1
                                  ? y(h + 1)
                                  : t("feature-tour");
                              },
                              className: "h-8",
                              children: [
                                w && h === w.length - 1 ? "Finish" : "Next",
                                w &&
                                  h < w.length - 1 &&
                                  (0, l.jsx)(u.A, {
                                    size: 16,
                                    className: "ml-1",
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
            document.body,
          );
        };
    },
  },
]);
